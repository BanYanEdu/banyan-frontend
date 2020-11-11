import { Component, OnInit, OnDestroy } from '@angular/core';
import { SettingsService } from '../settings.service';
import { BsModalService } from 'ngx-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseListComponent } from 'app/shared/components/BaseListComponent';
import { CommonService } from 'app/shared/services/common.service';
import { DataTableResource } from 'inet-ui';
import { Program } from 'app/model/settings/Program';

@Component({
    selector: 'app-program-list',
    templateUrl: './program-list.component.html'
})
// export class OutletListComponent extends BaseListComponent<Outlet> implements OnInit, OnDestroy {
export class ProgramListComponent extends BaseListComponent<Program> implements OnInit, OnDestroy {
    
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
                {code: "P01", name:"Tiếng Hàn phổ thông", sortIndex: 10, inactive: false},
                {code: "P02", name:"Biên phiên dịch", sortIndex: 20, inactive: false},
                {code: "P03", name:"Bổ sung", sortIndex:30, inactive: false},
                {code: "P10", name:"Khác", sortIndex:100, inactive: true}
            ], 
            total: 4}
        
        // this.dataResource = new DataTableResource([]);
        this.settingsService.programList(criteria).subscribe(data => callbackFn(mockedData), error => errorFn(error));
    }

    ngOnDestroy() {

    }

}