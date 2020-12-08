import { Component, ElementRef, Input, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { CommonService } from 'app/shared/services/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { BaseComponent } from 'app/shared/components/BaseComponent';
import { FormMode } from 'app/model/common/FormMode';
import { SchoolClass } from 'app/model/class/SchoolClass';
import { EmployeeService } from '../employee.service';
import { Employee } from 'app/model/employee/Employee';

@Component({
    selector: 'app-employee-view',
    templateUrl: './employee-view.component.html'
})
export class EmployeeViewComponent extends BaseComponent {
    id: string;
    item: Employee;
    mode: FormMode = FormMode.E_EDIT;
    modalRef: BsModalRef;
    config = {
        backdrop: false,
        ignoreBackdropClick: true,
        class: 'modal-xl'
    };

    constructor(
        element: ElementRef,
        protected modalService: BsModalService,
        private employeeService: EmployeeService,
        protected commonService: CommonService,
        protected route: ActivatedRoute,
        protected router: Router
    ) { super(commonService)}

    ngOnInit() {
        this.load();   
    }

    load() {
        this.route.params.subscribe(params => {
            this.id = params['id'];
            this.employeeService.employeeList({uuid: this.id}).subscribe(data =>
                {
                    this.item = data.items[0];
                }
            );
        });
    }

    protected createMainFormGroup(): FormGroup {
        return new FormGroup({
            // 'remark': new FormControl(null);
        });
    }

    onEdit(template: TemplateRef<any>) {
        this.mode = FormMode.E_EDIT;
        this.config.class = "modal-xl";
        this.modalRef = this.modalService.show(template, this.config);
    }

    onChanged($event) {
        this.modalRef.hide();
        this.load();
        // this.refreshedTime = this.refreshedTime + 1;
    }

    onAssign(template: TemplateRef<any>) {
        this.mode = FormMode.E_EDIT;
        this.config.class = "modal-xl";
        this.modalRef = this.modalService.show(template, this.config);
    }
}