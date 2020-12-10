import { Component, ElementRef, Input, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { BaseAddDialogComponent } from "app/shared/components/BaseAddDialogComponent"
import { CommonService } from 'app/shared/services/common.service';
import { BaseEditableMdModel } from 'app/shared/models/BaseEditableMdModel';
import { ClassService } from '../class.service';
import { SchoolClass } from 'app/model/class/SchoolClass';
import { FormMode } from 'app/model/common/FormMode';
import { NotificationType } from 'app/shared/models/NotificationType';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Contact } from 'app/model/student/Contact';
import { ClassEnrollment } from 'app/model/class/ClassEnrollment';

@Component({
    selector: 'app-class-enroll',
    templateUrl: './class-enroll.component.html'
})
export class ClassEnrollComponent extends BaseAddDialogComponent<ClassEnrollment>{
    modalRef: BsModalRef;
    config = {
        backdrop: false,
        ignoreBackdropClick: true,
        class: 'modal-xl'
    };
    contact: Contact;
    class: SchoolClass;
    @Input() inputContact: Contact;
    @Input() inputClass: SchoolClass;
    statuses: any[] = ['E_ENROLLED','E_RESIGNED'];
    
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
        });
    }

    protected patchInitializedMainForm() {
        if (this.inputClass) {
            this.class = this.inputClass;
            this.mainForm.get('classId').setValue(this.class.uuid);
        }
        if (this.mode == FormMode.E_ADD) {
            // console.log(this.statuses[0]);
            this.mainForm.get('status').setValue(this.statuses[0]);
        } else {
            this.mainForm.controls['enrollmentDate'].setValue(new Date(this.item.enrollmentDate));
        }
    }
    protected populateAdditionalFormValue() {
        this.requestItem.enrollmentDate = this.mainForm.controls['enrollmentDate'].value.getTime() || null;
    }
    protected callSearch(input: { code: string }, callbackFn: Function): void {
        this.classService.enrollmentList(input).subscribe(data => callbackFn(data));
    }
    protected callAddItem(requestItem: BaseEditableMdModel, callbackFn: Function): void {
        this.classService.enrollmentCreate(requestItem).subscribe(data => callbackFn(data));   
    }
    protected callUpdateItem(requestItem: BaseEditableMdModel, callbackFn: Function): void {
        // console.log(this.requestItem);
        this.classService.enrollmentUpdate(requestItem).subscribe(data => callbackFn(data));
    }

    searchStudent(template: TemplateRef<any>) {
        this.config.class = "modal-search";
        this.modalRef = this.modalService.show(template, this.config);
    }

    onStudentSelected(event) {
        this.modalRef.hide();
        // this.mainForm.get('contactCode').setValue(event[0].code);
        this.contact = event[0];
        this.mainForm.get('contactId').setValue(this.contact.uuid);
        this.requestItem.contactCode = this.contact.code;
        this.requestItem.contactName = this.contact.name;

        // console.log(event[0]);
    }
}