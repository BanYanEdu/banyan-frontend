import { Component, OnInit, OnDestroy } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseListComponent } from 'app/shared/components/BaseListComponent';
import { CommonService } from 'app/shared/services/common.service';
import { Outlet } from 'app/model/settings/Outlet';
import { EmployeeService } from '../employee.service';

@Component({
    selector: 'app-employee-list',
    templateUrl: './employee-list.component.html'
})
export class EmployeeListComponent extends BaseListComponent<Outlet> implements OnInit, OnDestroy {
    
    constructor(
        commonService: CommonService,
        protected employeeService: EmployeeService,
        protected modalService: BsModalService,
        protected router: Router,
        protected route: ActivatedRoute
    ) {
        super(commonService, modalService, router);
    }

    ngOnInit() {
        this.config.class = "modal-xl";
    }

    protected callDeleteItem(id: string, callbackFn: Function): void {
        // this.settingsService.outletDelete(id).subscribe(res => callbackFn(res));
    }

    protected callCheckItemInUse(id: string, callbackFn: Function): void {
        // this.mdService.checkSourceInUse(id, null).subscribe(inUse => callbackFn(inUse));
    }

    protected callLoadList(callbackFn: Function, errorFn: Function): void {
        var criteria: any = this.params;
        
        this.employeeService.employeeList(criteria).subscribe(data => callbackFn(data), error => errorFn(error));
    }

    ngOnDestroy() {

    }

}