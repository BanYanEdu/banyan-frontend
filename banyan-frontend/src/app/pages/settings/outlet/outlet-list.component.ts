import { Component, OnInit, OnDestroy } from '@angular/core';
import { SettingsService } from '../settings.service';
import { BsModalService } from 'ngx-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseListComponent } from 'app/shared/components/BaseListComponent';
import { CommonService } from 'app/shared/services/common.service';
import { Outlet } from 'app/model/settings/Outlet';
import { DataTableResource } from 'inet-ui';

@Component({
    selector: 'app-outlet-list',
    templateUrl: './outlet-list.component.html'
})
// export class OutletListComponent extends BaseListComponent<Outlet> implements OnInit, OnDestroy {
export class OutletListComponent extends BaseListComponent<Outlet> implements OnInit, OnDestroy {
    
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
        
        // this.dataResource = new DataTableResource([]);
        this.settingsService.outletList(criteria).subscribe(data => callbackFn(data), error => errorFn(error));
    }

    ngOnDestroy() {

    }

}
