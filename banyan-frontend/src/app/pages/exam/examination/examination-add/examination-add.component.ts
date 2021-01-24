import { Component, ElementRef, Input, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { BaseAddDialogComponent } from "app/shared/components/BaseAddDialogComponent"
import { CommonService } from 'app/shared/services/common.service';
import { BaseEditableMdModel } from 'app/shared/models/BaseEditableMdModel';
import { SchoolClass } from 'app/model/class/SchoolClass';
import { FormMode } from 'app/model/common/FormMode';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ClassInfo } from 'app/model/class/ClassInfo';
import { Utils } from 'app/shared/Utils';
import { Examination } from 'app/model/exam/Examination';
import { ExamService } from '../../exam.service';
import { ExamStatuses } from 'app/data/global/ExamStatuses';

@Component({
    selector: 'app-examination-add',
    templateUrl: './examination-add.component.html'
})
export class ExaminationAddComponent extends BaseAddDialogComponent<Examination> {
    @Input() inputClass: SchoolClass;
    @Input() owner: string;
    class: SchoolClass;
    classInfo: ClassInfo = new ClassInfo();
    @ViewChild("name") erName: ElementRef;
    // @ViewChild('searchClassDialog') searchClassDialog: TemplateRef<any>;
    statuses: any[] = ExamStatuses;
    isAdd: boolean = false;
    modalRef: BsModalRef;
    config = {
        backdrop: false,
        ignoreBackdropClick: true,
        class: 'modal-xl'
    };

    constructor(
        element: ElementRef,
        private examService: ExamService,
        private modalService: BsModalService,
        protected commonService: CommonService,
        protected router: Router
    ) {
        super(element, commonService);
    }
    protected createMainFormGroup(): FormGroup {
        return new FormGroup({
            'name': new FormControl(null, [Validators.required]),
            'sortIndex': new FormControl(null, [Validators.required]),
            'startDate': new FormControl(null),
            'endDate': new FormControl(null),
            'remark': new FormControl(null),
            'status': new FormControl(null, [Validators.required]),
        });
    }

    protected patchInitializedMainForm() {
        // console.log(this.inputItems);
        
        if (this.mode == FormMode.E_ADD) {
            this.isAdd = true;

            this.mainForm.get('status').setValue(this.statuses[0]);

            if (this.owner == "E_CLASS") {
                this.class = this.inputClass;
                this.fillClassInfo();
            }
            
        } else {
            if (this.item.startDate) {
                this.mainForm.get('startDate').setValue(new Date(this.item.startDate));
            }
            if (this.item.endDate) {
                this.mainForm.get('endDate').setValue(new Date(this.item.endDate));
            }
            if (this.item.classInfo) {
                this.classInfo = this.item.classInfo;
                // this.fillClassInfo();
            }
        }

        this.erName.nativeElement.focus();
    }
    protected populateAdditionalFormValue() {
        if (this.mainForm.controls['startDate'].value) {
            this.requestItem.startDate = this.mainForm.controls['startDate'].value.getTime() || null;
        }
        if (this.mainForm.controls['endDate'].value) {
            this.requestItem.endDate = this.mainForm.controls['endDate'].value.getTime() || null;
        }
        
        this.requestItem.classInfoStr = JSON.stringify(this.classInfo);
    }
    protected callSearch(input: { code: string }, callbackFn: Function): void {
        this.examService.examinationList(input).subscribe(data => callbackFn(data));
    }
    protected callAddItem(requestItem: BaseEditableMdModel, callbackFn: Function): void {
        console.log(requestItem);
        this.examService.examinationCreate(requestItem).subscribe(data => callbackFn(data));
    }
    protected callUpdateItem(requestItem: BaseEditableMdModel, callbackFn: Function): void {
        console.log(this.requestItem);
        this.examService.examinationUpdate(requestItem).subscribe(data => callbackFn(data));
    }

    fillClassInfo() {
        this.classInfo = Utils.getClassInfoFromClass(this.inputClass);
    }
}