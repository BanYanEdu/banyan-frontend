import { Component, ElementRef, Input, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { BaseAddDialogComponent } from "app/shared/components/BaseAddDialogComponent"
import { CommonService } from 'app/shared/services/common.service';
import { BaseEditableMdModel } from 'app/shared/models/BaseEditableMdModel';
import { SchoolClass } from 'app/model/class/SchoolClass';
import { FormMode } from 'app/model/common/FormMode';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap';
import { ClassInfo } from 'app/model/class/ClassInfo';
import { Utils } from 'app/shared/Utils';
import { Exam } from 'app/model/exam/Exam';
import { ExamService } from '../../exam.service';
import { ExamStatuses } from 'app/data/global/ExamStatuses';
import { Examination } from 'app/model/exam/Examination';
import { NotificationType } from 'app/shared/models/NotificationType';

@Component({
    selector: 'app-exam-add',
    templateUrl: './exam-add.component.html'
})
export class ExamAddComponent extends BaseAddDialogComponent<Exam> {
    @Input() inputClass: SchoolClass;
    @Input() inputExamination: Examination;
    @Input() classInfo: ClassInfo;
    @Input() owner: string;
    @Input() inputItems: Exam[];
    class: SchoolClass;
    statuses: any[] = ExamStatuses;
    isAdd: boolean = false;
    modalRef: BsModalRef;
    config = {
        backdrop: false,
        ignoreBackdropClick: true,
        class: 'modal-xl'
    };
    examSubjectId: string;
    readonly: boolean = false;          // for Exam Subject Selector

    constructor(
        element: ElementRef,
        private examService: ExamService,
        protected commonService: CommonService,
        protected router: Router
    ) {
        super(element, commonService);
    }
    protected createMainFormGroup(): FormGroup {
        return new FormGroup({
            'examSubjectId': new FormControl(null, [Validators.required]),
            'sortIndex': new FormControl(null, [Validators.required]),
            'examDate': new FormControl(null),
            'remark': new FormControl(null),
            'status': new FormControl(null, [Validators.required]),
        });
    }

    protected patchInitializedMainForm() {
        if (this.mode == FormMode.E_ADD) {
            this.isAdd = true;

            this.mainForm.get('status').setValue(this.statuses[0]);

            if (this.owner == "E_CLASS") {
                this.class = this.inputClass;
                this.fillClassInfo();
            }
            
        } else {
            if (this.item.examDate) {
                this.mainForm.get('examDate').setValue(new Date(this.item.examDate));
            }
            if (this.item.classInfo) {
                this.classInfo = this.item.classInfo;
            }
            this.examSubjectId = this.item.examSubjectId;
            this.readonly = true;
        }

        // this.erName.nativeElement.focus();
    }
    protected populateAdditionalFormValue() {
        if (this.mainForm.controls['examDate'].value) {
            this.requestItem.examDate = this.mainForm.controls['examDate'].value.getTime() || null;
        }
        if (this.inputExamination) {
            this.requestItem.examinationId = this.inputExamination.uuid;
            this.requestItem.examinationName = this.inputExamination.name;        
        }
        
        this.requestItem.classInfoStr = JSON.stringify(this.classInfo);
    }
    protected callSearch(input: { code: string }, callbackFn: Function): void {
        this.examService.examList(input).subscribe(data => callbackFn(data));
    }
    protected callAddItem(requestItem: BaseEditableMdModel, callbackFn: Function): void {
        // console.log(requestItem);
        this.examService.examCreate(requestItem).subscribe(data => callbackFn(data));
    }
    protected callUpdateItem(requestItem: BaseEditableMdModel, callbackFn: Function): void {
        // console.log(this.requestItem);
        this.examService.examUpdate(requestItem).subscribe(data => callbackFn(data));
    }

    onChangeExamSubject(params: any) {
        // Check duplicate
        if (this.mode == FormMode.E_ADD) {
            this.examSubjectId = params[0];
            let duplicated = true;
    
            var indexNum = this.inputItems.findIndex(obj => obj.examSubjectId==this.examSubjectId)
            if (indexNum !== -1) {
                duplicated = true;
            } else {
                duplicated = false;
            }
            if (duplicated) {
                this.showMessage('Dữ liệu bị trùng.', 'Cảnh báo', NotificationType.WARNING);
                this.examSubjectId  = "";
                return;
            }        
        }

        // this.requestItem.examSubjectId = params[0];
        this.requestItem.examSubjectCode = params[1];
        this.requestItem.examSubjectName = params[2];

        this.mainForm.get('examSubjectId').setValue(params[0]);
    }

    fillClassInfo() {
        this.classInfo = Utils.getClassInfoFromClass(this.inputClass);
    }
}