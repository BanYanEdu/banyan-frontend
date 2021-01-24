import { Component, ElementRef, Input, OnChanges, SimpleChange, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { CommonService } from 'app/shared/services/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { BaseComponent } from 'app/shared/components/BaseComponent';
import { FormMode } from 'app/model/common/FormMode';
import { Employee } from 'app/model/employee/Employee';
import { EmployeeService } from '../../employee.service';
import { EmployeePermissionProfile } from 'app/model/employee/EmployeePermissionProfile';

@Component({
    selector: 'app-employee-permission-profile-view',
    templateUrl: './eppv.component.html'
})
export class EmployeePermissionProfileViewComponent extends BaseComponent implements OnChanges {
    @Input() employeeId: string;
    @Input() employee: Employee;
    item: EmployeePermissionProfile;

    mode: FormMode = FormMode.E_EDIT;
    modalRef: BsModalRef;
    config = {
        backdrop: false,
        ignoreBackdropClick: true,
        class: 'modal-medium'
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
        // this.load();   
    }

    public ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
        // console.log("Course Selector: Something changed ...");

        for (let propName in changes) {
            // let changedProp = changes[propName];
            if (propName == "employee") {
                // console.log(this.courseId);
                this.load();
            }
          }
    }

    load() {
        if (!this.employee) {
            return;
        }
        this.employeeService.employeePermissionProfileList({employeeId: this.employee.uuid}).subscribe(data =>
            {
                this.item = data.items[0];
                if (this.item) {
                    this.mode = FormMode.E_EDIT;
                    // console.log(this.item);
                } else {
                    this.mode = FormMode.E_ADD;
                    // console.log(this.item);
                }
            }
        );
    }

    protected createMainFormGroup(): FormGroup {
        return new FormGroup({
            // 'remark': new FormControl(null);
        });
    }

    onEdit(template: TemplateRef<any>) {
        this.mode = FormMode.E_EDIT;
        this.modalRef = this.modalService.show(template, this.config);
    }
    onAdd(template: TemplateRef<any>) {
        this.mode = FormMode.E_ADD;
        this.modalRef = this.modalService.show(template, this.config);
    }
    onChanged($event) {
        this.modalRef.hide();
        this.load();
        // this.refreshedTime = this.refreshedTime + 1;
    }

}