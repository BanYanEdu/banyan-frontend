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
        // this.config.class="modal-medium"; 
    }

    protected callDeleteItem(id: string, callbackFn: Function): void {
        // this.settingsService.outletDelete(id).subscribe(res => callbackFn(res));
    }

    protected callCheckItemInUse(id: string, callbackFn: Function): void {
        // this.mdService.checkSourceInUse(id, null).subscribe(inUse => callbackFn(inUse));
    }

    protected callLoadList(callbackFn: Function, errorFn: Function): void {
        var criteria: any = this.params;
        this.settingsService.schedulePatternList(criteria).subscribe(data => callbackFn(data), error => errorFn(error));
    }

    ngOnDestroy() {

    }

}