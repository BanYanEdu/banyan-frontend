import { Component, OnInit, OnDestroy } from '@angular/core';
import { SettingsService } from '../settings.service';
import { BsModalService } from 'ngx-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseListComponent } from 'app/shared/components/BaseListComponent';
import { CommonService } from 'app/shared/services/common.service';
import { Source } from 'app/model/settings/Source';
import { DataTableResource } from 'inet-ui';

@Component({
    selector: 'app-source-list',
    templateUrl: './source-list.component.html'
})
export class SourceListComponent extends BaseListComponent<Source> implements OnInit, OnDestroy {
    
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
                {code: "S01", name:"Facebook", sortIndex: 10, inactive: false},
                {code: "S02", name:"Zalo", sortIndex: 20, inactive: false},
                {code: "S03", name:"Website", sortIndex:30, inactive: false},
                {code: "S04", name:"Giới thiệu", sortIndex:40, inactive: false},
                {code: "S05", name:"Khác", sortIndex:50, inactive: true},
            ], 
            total: 5}
        
        // this.dataResource = new DataTableResource([]);
        this.settingsService.sourceList(criteria).subscribe(data => callbackFn(mockedData), error => errorFn(error));
    }

    ngOnDestroy() {

    }

}