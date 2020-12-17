import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseListComponent } from 'app/shared/components/BaseListComponent';
import { CommonService } from 'app/shared/services/common.service';
import { Outlet } from 'app/model/settings/Outlet';
import { EmployeeService } from '../../employee.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormMode } from 'app/model/common/FormMode';
import { ActiveStatuses } from 'app/data/global/ActiveStatuses';
import { ServiceStatuses } from 'app/data/global/ServiceStatuses';

@Component({
    selector: 'app-employee-list',
    templateUrl: './employee-list.component.html'
})
export class EmployeeListComponent extends BaseListComponent<Outlet> implements OnInit {
    public mainForm: FormGroup;
    @ViewChild("searchValue") erSearchValue: ElementRef;
    activeStatuses: any[] = ActiveStatuses;
    serviceStatuses: any[] = ServiceStatuses;
    mode: FormMode = FormMode.E_EDIT;
    outletId = "E_ALL";
    
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
        this.mainForm = new FormGroup({
            'outletId': new FormControl(null),
            'activeStatus': new FormControl(null),
            'serviceStatus': new FormControl(null),
            'searchValue': new FormControl(null)
        });
        this.erSearchValue.nativeElement.focus();
        this.mainForm.get('activeStatus').setValue(this.activeStatuses[1]);
        this.mainForm.get('serviceStatus').setValue(this.serviceStatuses[0]);
        this.mainForm.get('searchValue').setValue("");
    }

    protected callDeleteItem(id: string, callbackFn: Function): void {
        // this.settingsService.outletDelete(id).subscribe(res => callbackFn(res));
    }

    protected callCheckItemInUse(id: string, callbackFn: Function): void {
        // this.mdService.checkSourceInUse(id, null).subscribe(inUse => callbackFn(inUse));
    }

    protected callLoadList(callbackFn: Function, errorFn: Function): void {
        this.params.activeStatus = this.mainForm.get('activeStatus').value;
        this.params.serviceStatus = this.mainForm.get('serviceStatus').value;
        let searchValue = this.mainForm.get('searchValue').value;
        searchValue = searchValue.replace(/[*\\]/g, '');
        this.params.searchValue = searchValue; 
        this.mainForm.get('searchValue').setValue(searchValue);
        if (this.outletId != "E_ALL" ) {
            this.params.outletId = this.outletId;
        }
        
        this.employeeService.employeeList(this.params).subscribe(data => callbackFn(data), error => errorFn(error));
    }

    onSearch() {
        this.dataTableRef.firstPage();
    }

    onChangeOutlet(event) {
        this.outletId = event[0];
        this.onSearch();
    }
}