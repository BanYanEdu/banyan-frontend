import { Component, ElementRef, Input, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { BaseAddDialogComponent } from "app/shared/components/BaseAddDialogComponent"
import { CommonService } from 'app/shared/services/common.service';
import { BaseEditableMdModel } from 'app/shared/models/BaseEditableMdModel';
import { SchoolClass } from 'app/model/class/SchoolClass';
import { FormMode } from 'app/model/common/FormMode';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ClassEnrollment } from 'app/model/class/ClassEnrollment';
import { EnrollmentStatuses } from 'app/data/global/EnrollmentStatuses';
import { ClassService } from '../class.service';
import { NotificationType } from 'app/shared/models/NotificationType';
import { Employee } from 'app/model/employee/Employee';
import { ClassAssignment } from 'app/model/class/ClassAssignment';
import { AssignmentStatuses } from 'app/data/global/AssignmentStatuses';
import { AssignmentRoles } from 'app/data/global/AssignmentRoles';

@Component({
    selector: 'app-class-assign',
    templateUrl: './class-assign.component.html'
})
export class ClassAssignComponent extends BaseAddDialogComponent<ClassAssignment> {
    employee: Employee;
    class: SchoolClass;
    @Input() inputEmployee: Employee;
    @Input() inputClass: SchoolClass;
    @Input() owner: string;
    @Input() inputItems: ClassAssignment[];
    @ViewChild("assignDate") efAssignDate: ElementRef;
    statuses: any[] = AssignmentStatuses;
    roles: any[] = AssignmentRoles;
    isAdd: boolean = false;
    modalRef: BsModalRef;
    config = {
        backdrop: false,
        ignoreBackdropClick: true,
        class: 'modal-xl'
    };

    constructor(
        element: ElementRef,
        private classService: ClassService,
        private modalService: BsModalService,
        protected commonService: CommonService,
        protected router: Router
    ) {
        super(element, commonService);
    }
    protected createMainFormGroup(): FormGroup {
        return new FormGroup({
            'assignDate': new FormControl(null, [Validators.required]),
            'remark': new FormControl(null),
            'status': new FormControl(null, [Validators.required]),
            'role': new FormControl(null, [Validators.required]),
            'employeeId': new FormControl(null, [Validators.required]),
            'classId': new FormControl(null, [Validators.required]),
        });
    }

    protected patchInitializedMainForm() {
        // console.log(this.inputItems);
        
        if (this.mode == FormMode.E_ADD) {
            this.isAdd = true;
            this.item = new ClassEnrollment;

            this.mainForm.get('status').setValue(this.statuses[0]);
            this.mainForm.get('role').setValue(this.roles[0]);

            if (this.owner == "E_CLASS") {
                this.class = this.inputClass;
                this.fillClassInfo();
            }
            if (this.owner == "E_EMPLOYEE") {
                this.employee = this.inputEmployee;
                this.fillEmployeeInfo();
            }
        } else {
            this.mainForm.controls['assignDate'].setValue(new Date(this.item.assignDate));    
        }
    }
    protected populateAdditionalFormValue() {
        this.requestItem.assignDate = this.mainForm.controls['assignDate'].value.getTime() || null;
    }
    protected callSearch(input: { code: string }, callbackFn: Function): void {
        this.classService.assignmentList(input).subscribe(data => callbackFn(data));
    }
    protected callAddItem(requestItem: BaseEditableMdModel, callbackFn: Function): void {
        this.classService.assignmentCreate(requestItem).subscribe(data => callbackFn(data));
    }
    protected callUpdateItem(requestItem: BaseEditableMdModel, callbackFn: Function): void {
        // console.log(this.requestItem);
        this.classService.assignmentUpdate(requestItem).subscribe(data => callbackFn(data));
    }

    searchEmployee(template: TemplateRef<any>) {
        this.config.class = "modal-search";
        this.modalRef = this.modalService.show(template, this.config);
    }
    onEmployeeSelected(event) {
        this.employee = event[0];
        // Check repeating
        if (this.inputItems.some(e => e.employeeId === this.employee.uuid)) {
            this.showMessage("Giảng viên này đã có trong lớp", "Thông báo", NotificationType.WARNING);
            return;
        }

        this.modalRef.hide();
        this.fillEmployeeInfo();
        this.efAssignDate.nativeElement.focus();
    }
    fillEmployeeInfo() {
        this.item.employeeName = this.employee.name;
        this.item.employeeCode = this.employee.code;

        this.mainForm.get('employeeId').setValue(this.employee.uuid);

        this.requestItem.employeeId = this.employee.uuid;
        this.requestItem.employeeCode = this.employee.code;
        this.requestItem.employeeName = this.employee.name;
    }

    searchClass(template: TemplateRef<any>) {
        this.config.class = "modal-search";
        this.modalRef = this.modalService.show(template, this.config);
    }
    onClassSelected(event) {
        this.class = event[0];
        // check repeating
        if (this.inputItems.some(e => e.classId === this.class.uuid)) {
            this.showMessage("Lớp học này đã có nhập học rồi.", "Thông báo", NotificationType.WARNING);
            return;
        }

        this.fillClassInfo();
        this.modalRef.hide();
        this.efAssignDate.nativeElement.focus();
    }
    fillClassInfo() {
        this.item.className = this.class.name;
        this.item.outletName = this.class.outletName;
        this.item.courseName = this.class.courseName;

        this.mainForm.get('classId').setValue(this.class.uuid);

        this.requestItem.outletId = this.class.outletId;
        this.requestItem.outletCode = this.class.outletCode;
        this.requestItem.outletName = this.class.outletName;
        this.requestItem.programId = this.class.programId;
        this.requestItem.programCode = this.class.programCode;
        this.requestItem.programName = this.class.programName;
        this.requestItem.courseId = this.class.courseId;
        this.requestItem.courseCode = this.class.courseCode;
        this.requestItem.courseName = this.class.courseName;
        this.requestItem.classId = this.class.uuid;
        this.requestItem.classCode = this.class.code;
        this.requestItem.className = this.class.name;
    }
}