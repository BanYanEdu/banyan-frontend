import { Component, OnInit, OnDestroy } from '@angular/core';
import { SettingsService } from '../settings.service';
import { BsModalService } from 'ngx-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseListComponent } from 'app/shared/components/BaseListComponent';
import { CommonService } from 'app/shared/services/common.service';
import { DataTableResource } from 'inet-ui';
import { TestSubject } from 'app/model/settings/TestSubject';

@Component({
    selector: 'app-test-subject-list',
    templateUrl: './test-subject-list.component.html'
})
export class TestSubjectListComponent extends BaseListComponent<TestSubject> implements OnInit, OnDestroy {
    
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
                {code: "TS01", name:"Nghe", sortIndex: 10, inactive: false},
                {code: "TS02", name:"Nói", sortIndex: 20, inactive: false},
                {code: "TS03", name:"Đọc", sortIndex:30, inactive: false},
                {code: "TS04", name:"Thuyết trình", sortIndex:40, inactive: false},
                {code: "TS05", name:"Từ vựng", sortIndex:50, inactive: true},
            ], 
            total: 5}
        
        // this.dataResource = new DataTableResource([]);
        this.settingsService.testSubjectList(criteria).subscribe(data => callbackFn(mockedData), error => errorFn(error));
    }

    ngOnDestroy() {

    }

}