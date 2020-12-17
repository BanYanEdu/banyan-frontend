import { Component, ElementRef, Input, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { BaseAddDialogComponent } from "app/shared/components/BaseAddDialogComponent"
import { CommonService } from 'app/shared/services/common.service';
import { BaseEditableMdModel } from 'app/shared/models/BaseEditableMdModel';
import { SchoolClass } from 'app/model/class/SchoolClass';
import { FormMode } from 'app/model/common/FormMode';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Contact } from 'app/model/student/Contact';
import { ClassEnrollment } from 'app/model/class/ClassEnrollment';
import { EnrollmentStatuses } from 'app/data/global/EnrollmentStatuses';
import { ClassService } from '../../class.service';
import { NotificationType } from 'app/shared/models/NotificationType';

@Component({
    selector: 'app-class-enroll',
    templateUrl: './class-enroll.component.html'
})
export class ClassEnrollComponent extends BaseAddDialogComponent<ClassEnrollment> {
    contact: Contact;
    class: SchoolClass;
    @Input() inputContact: Contact;
    @Input() inputClass: SchoolClass;
    @Input() owner: string;
    @Input() inputItems: ClassEnrollment[];
    @ViewChild("enrollmentDate") enrollmentDate: ElementRef;
    // @ViewChild('searchClassDialog') searchClassDialog: TemplateRef<any>;
    statuses: any[] = EnrollmentStatuses;
    isAdd: boolean = false;
    hasDebt: boolean = false;
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
            'enrollmentDate': new FormControl(null),
            'remark': new FormControl(null),
            'status': new FormControl(null, [Validators.required]),
            'contactId': new FormControl(null, [Validators.required]),
            'classId': new FormControl(null, [Validators.required]),
            'hasDebt': new FormControl(null),
            'debtAmount': new FormControl(null),
        });
    }

    protected patchInitializedMainForm() {
        // console.log(this.inputItems);
        
        if (this.mode == FormMode.E_ADD) {
            this.isAdd = true;
            this.item = new ClassEnrollment;

            this.mainForm.get('status').setValue(this.statuses[0]);

            if (this.owner == "E_CLASS") {
                this.class = this.inputClass;
                this.fillClassInfo();
            }
            if (this.owner == "E_STUDENT") {
                this.contact = this.inputContact;
                this.fillStudentInfo();
            }
        } else {
            this.mainForm.controls['enrollmentDate'].setValue(new Date(this.item.enrollmentDate));
            this.hasDebt = this.item.hasDebt;
        }
    }
    protected populateAdditionalFormValue() {
        this.requestItem.enrollmentDate = this.mainForm.controls['enrollmentDate'].value.getTime() || null;
        if (!this.hasDebt) {
            this.requestItem.debtAmount = 0;
        }
    }
    protected callSearch(input: { code: string }, callbackFn: Function): void {
        this.classService.enrollmentList(input).subscribe(data => callbackFn(data));
    }
    protected callAddItem(requestItem: BaseEditableMdModel, callbackFn: Function): void {
        this.classService.enrollmentCreate(requestItem).subscribe(data => callbackFn(data));
    }
    protected callUpdateItem(requestItem: BaseEditableMdModel, callbackFn: Function): void {
        console.log(this.requestItem);
        this.classService.enrollmentUpdate(requestItem).subscribe(data => callbackFn(data));
    }

    onChangeHasDebt() {
        this.hasDebt = !this.hasDebt;
    }

    searchStudent(template: TemplateRef<any>) {
        this.config.class = "modal-search";
        this.modalRef = this.modalService.show(template, this.config);
    }
    onStudentSelected(event) {
        this.contact = event[0];
        // Check repeating
        if (this.inputItems.some(e => e.contactId === this.contact.uuid)) {
            this.showMessage("Học viên này đã có trong lớp", "Thông báo", NotificationType.WARNING);
            return;
        }

        this.modalRef.hide();
        this.fillStudentInfo();
        this.enrollmentDate.nativeElement.focus();
    }
    fillStudentInfo() {
        this.item.contactName = this.contact.name;
        this.item.contactCode = this.contact.code;

        this.mainForm.get('contactId').setValue(this.contact.uuid);

        this.requestItem.contactId = this.contact.uuid;
        this.requestItem.contactCode = this.contact.code;
        this.requestItem.contactName = this.contact.name;
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
        this.enrollmentDate.nativeElement.focus();
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