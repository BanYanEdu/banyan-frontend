import { Component, OnInit, OnDestroy } from '@angular/core';
import { SettingsService } from '../settings.service';
import { BsModalService } from 'ngx-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseListComponent } from 'app/shared/components/BaseListComponent';
import { CommonService } from 'app/shared/services/common.service';
import { DataTableResource } from 'inet-ui';
import { SchedulePattern } from 'app/model/settings/SchedulePattern';

@Component({
    selector: 'app-schedule-pattern-list',
    templateUrl: './schedule-pattern-list.component.html'
})
// export class OutletListComponent extends BaseListComponent<Outlet> implements OnInit, OnDestroy {
export class SchedulePatternListComponent extends BaseListComponent<SchedulePattern> implements OnInit, OnDestroy {
    
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
                {code: "SP01", name:"T2-T4-T6 19h-21h", sortIndex: 10, inactive: false},
                {code: "SP02", name:"T2-T4-T6 8h30-10h30", sortIndex: 20, inactive: false},
                {code: "SP03", name:"T3-T5-T7 19h-21h", sortIndex:30, inactive: false},
                {code: "SP04", name:"T3-T5-T7 8h30-10h30", sortIndex:40, inactive: false},
                {code: "SP05", name:"T7 & CN 8h30-12h00", sortIndex:50, inactive: true},
            ], 
            total: 5}
        
        // this.dataResource = new DataTableResource([]);
        this.settingsService.schedulePatternList(criteria).subscribe(data => callbackFn(mockedData), error => errorFn(error));
    }

    ngOnDestroy() {

    }

}