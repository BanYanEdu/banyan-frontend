import { Component, OnInit, OnDestroy } from '@angular/core';
import { SettingsService } from '../settings.service';
import { BsModalService } from 'ngx-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseListComponent } from 'app/shared/components/BaseListComponent';
import { CommonService } from 'app/shared/services/common.service';
import { DataTableResource } from 'inet-ui';
import { StudySubject } from 'app/model/settings/StudySubject';

@Component({
    selector: 'app-study-subject-list',
    templateUrl: './study-subject-list.component.html'
})
export class StudySubjectListComponent extends BaseListComponent<StudySubject> implements OnInit, OnDestroy {
    
    constructor(
        commonService: CommonService,
        protected settingsService: SettingsService,
        protected modalService: BsModalService,
        protected router: Router,
        protected route: ActivatedRoute
    ) {
        super(commonService, modalService, router);
    }

    ngOnInit() {
        
    }

    protected callDeleteItem(id: string, callbackFn: Function): void {
        // this.settingsService.outletDelete(id).subscribe(res => callbackFn(res));
    }

    protected callCheckItemInUse(id: string, callbackFn: Function): void {
        // this.mdService.checkSourceInUse(id, null).subscribe(inUse => callbackFn(inUse));
    }

    protected callLoadList(callbackFn: Function, errorFn: Function): void {
        var criteria: any;
        var mockedData = {
            items: [
                {code: "SS01", name:"Ngữ pháp + từ vựng âm Hán", sortIndex: 10, inactive: false},
                {code: "SS02", name:"Nghe nói", sortIndex: 20, inactive: false},
                {code: "SS03", name:"Từ vựng Tiếng Hàn", sortIndex:30, inactive: false},
                {code: "SS04", name:"Tiếng Hàn nhập môn", sortIndex:40, inactive: false},
                {code: "SS05", name:"Văn hóa Hàn", sortIndex:50, inactive: true},
            ], 
            total: 5}

        // this.dataResource = new DataTableResource([]);
        this.settingsService.studySubjectList(criteria).subscribe(data => callbackFn(mockedData), error => errorFn(error));
    }

    ngOnDestroy() {

    }

}