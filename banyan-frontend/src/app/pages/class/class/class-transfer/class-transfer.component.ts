import { Component, ElementRef, Input, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { BaseAddDialogComponent } from "app/shared/components/BaseAddDialogComponent"
import { CommonService } from 'app/shared/services/common.service';
import { BaseEditableMdModel } from 'app/shared/models/BaseEditableMdModel';
import { SchoolClass } from 'app/model/class/SchoolClass';
import { FormMode } from 'app/model/common/FormMode';
import { NotificationType } from 'app/shared/models/NotificationType';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Contact } from 'app/model/student/Contact';
import { ClassEnrollment } from 'app/model/class/ClassEnrollment';
import { EnrollmentStatuses } from 'app/data/global/EnrollmentStatuses';
import { ClassTransfer } from 'app/model/class/ClassTransfer';
import { ClassService } from '../../class.service';

@Component({
    selector: 'app-class-transfer',
    templateUrl: './class-transfer.component.html'
})
export class ClassTransferComponent extends BaseAddDialogComponent<ClassTransfer>{
    modalRef: BsModalRef;
    config = {
        backdrop: false,
        ignoreBackdropClick: true,
        class: 'modal-xl'
    };
    @Input() inputEnrollment: ClassEnrollment;
    toClass: SchoolClass;

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
            'transferDate': new FormControl(null, [Validators.required]),
            'transferRemark': new FormControl(null),
            'toClassId': new FormControl(null, [Validators.required]),
            
        });
    }

    protected patchInitializedMainForm() {
        
        
    }
    protected populateAdditionalFormValue() {
        this.requestItem.transferDate = this.mainForm.controls['transferDate'].value.getTime() || null;
        this.requestItem.fromEnrollmentId = this.inputEnrollment.uuid;
    }
    protected callSearch(input: { code: string }, callbackFn: Function): void {
        // this.classService.enrollmentList(input).subscribe(data => callbackFn(data));
    }
    protected callAddItem(requestItem: BaseEditableMdModel, callbackFn: Function): void {
        console.log(requestItem);
        this.classService.enrollmentTransfer(requestItem).subscribe(data => callbackFn(data));
    }
    protected callUpdateItem(requestItem: BaseEditableMdModel, callbackFn: Function): void {
        // console.log(this.requestItem);
        // this.classService.enrollmentUpdate(requestItem).subscribe(data => callbackFn(data));
    }

    searchStudent(template: TemplateRef<any>) {
        this.config.class = "modal-search";
        this.modalRef = this.modalService.show(template, this.config);
    }

    searchClass(template: TemplateRef<any>) {
        this.config.class = "modal-search";
        this.modalRef = this.modalService.show(template, this.config);
    }

    onClassSelected (event) {
        // console.log(event);
        this.toClass = event[0];
        this.mainForm.get('toClassId').setValue(this.toClass.uuid);
        this.modalRef.hide();
    }

}