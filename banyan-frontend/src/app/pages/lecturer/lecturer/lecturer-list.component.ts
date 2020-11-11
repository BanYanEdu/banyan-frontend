import { Component, OnInit, OnDestroy } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseListComponent } from 'app/shared/components/BaseListComponent';
import { CommonService } from 'app/shared/services/common.service';
import { Outlet } from 'app/model/settings/Outlet';
import { DataTableResource } from 'inet-ui';
import { LecturerService } from '../lecturer.service';

@Component({
    selector: 'app-lecturer-list',
    templateUrl: './lecturer-list.component.html'
})
export class LecturerListComponent extends BaseListComponent<Outlet> implements OnInit, OnDestroy {
    
    constructor(
        commonService: CommonService,
        protected lecturerService: LecturerService,
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
        this.lecturerService.lecturerList(criteria).subscribe(data => callbackFn(data), error => errorFn(error));
    }

    ngOnDestroy() {

    }

}