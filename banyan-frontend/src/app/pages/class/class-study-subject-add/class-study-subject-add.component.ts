import { Component, ElementRef, Input, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BaseAddDialogComponent } from "app/shared/components/BaseAddDialogComponent"
import { CommonService } from 'app/shared/services/common.service';
import { BaseEditableMdModel } from 'app/shared/models/BaseEditableMdModel';
import { FormMode } from 'app/model/common/FormMode';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ClassService } from '../class.service';
import { ClassStudySubject } from 'app/model/class/ClassStudySubject';

@Component({
    selector: 'app-class-study-subject-add',
    templateUrl: './class-study-subject-add.component.html'
})
export class ClassStudySubjectAddComponent extends BaseAddDialogComponent<ClassStudySubject> {
    @Input() classId: string;
    @Input() inputItems: ClassStudySubject[];
    isAdd: boolean = false;
    readonly: boolean = false;

    constructor(
        element: ElementRef,
        private classService: ClassService,
        protected commonService: CommonService,
        protected router: Router
    ) {
        super(element, commonService);
    }
    protected createMainFormGroup(): FormGroup {
        return new FormGroup({
            'studySubjectId': new FormControl(null, [Validators.required]),
            'sortIndex': new FormControl(null, [Validators.required]),
            'unitCount': new FormControl(null, [Validators.required]),
            'remark': new FormControl(null),
        });
    }

    protected patchInitializedMainForm() {        
        if (this.mode == FormMode.E_ADD) {
            this.isAdd = true;
            this.item = new ClassStudySubject;
            this.readonly = false;

            this.mainForm.get('sortIndex').setValue(10);
        } else {
            this.readonly = true;
            // this.mainForm.controls['assignDate'].setValue(new Date(this.item.assignDate));    
        }
    }
    protected populateAdditionalFormValue() {
        this.requestItem.organId = iNet.organId;
        this.requestItem.classId = this.classId;
        // this.requestItem.assignDate = this.mainForm.controls['assignDate'].value.getTime() || null;
    }
    protected callSearch(input: { code: string }, callbackFn: Function): void {
        this.classService.studySubjectList(input).subscribe(data => callbackFn(data));
    }
    protected callAddItem(requestItem: BaseEditableMdModel, callbackFn: Function): void {
        this.classService.studySubjectCreate(requestItem).subscribe(data => callbackFn(data));
    }
    protected callUpdateItem(requestItem: BaseEditableMdModel, callbackFn: Function): void {
        // console.log(this.requestItem);
        this.classService.studySubjectUpdate(requestItem).subscribe(data => callbackFn(data));
    }

    onChangedStudySubject(event) {
        this.mainForm.get('studySubjectId').setValue(event[0]);
        this.requestItem.studySubjectCode = event[1];
        this.requestItem.studySubjectName = event[2];
        // console.log(event);
    }
}