import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { BaseAddDialogComponent } from "app/shared/components/BaseAddDialogComponent"
import { CommonService } from 'app/shared/services/common.service';
import { BaseEditableMdModel } from 'app/shared/models/BaseEditableMdModel';
import { FormMode } from 'app/model/common/FormMode';
import { Router } from '@angular/router';
import { NotificationType } from 'app/shared/models/NotificationType';
import { SettingsService } from '../../settings.service';
import { CourseExamination } from 'app/model/settings/CourseExamination';
import { CourseExaminationItem } from 'app/model/settings/CourseExaminationItem';

@Component({
    selector: 'app-course-examination-add',
    templateUrl: './course-examination-add.component.html'
})
export class CourseExaminationAddComponent extends BaseAddDialogComponent<CourseExamination>{
    @Input() courseId: string;
    @Input() item: CourseExamination;
    @ViewChild("name") nameField: ElementRef;
    finalItems: any[] = [];

    constructor(
        element: ElementRef,
        private settingsService: SettingsService,
        protected commonService: CommonService,
        private router: Router
    ) {
        super(element, commonService);
    }
    protected createMainFormGroup(): FormGroup {
        return new FormGroup({
            'name': new FormControl(null, [Validators.required]),
            'sortIndex': new FormControl(null, [Validators.required]),
            'remark': new FormControl(null),
 
        });
    }
    patchInitializedMainForm() {
        // this.item = this.inputItem;
        // console.log(this.item);
        this.nameField.nativeElement.focus();
        if (this.mode == FormMode.E_EDIT) {
            // this.finalItems = this.item.examinationItems;
            for (var i=0;i<this.item.examinationItems.length;i++ ) {
                let x: CourseExaminationItem = {};
                x.examSubjectId = this.item.examinationItems[i].examSubjectId;
                x.examSubjectCode = this.item.examinationItems[i].examSubjectCode;
                x.examSubjectName = this.item.examinationItems[i].examSubjectName;
                x.remark = this.item.examinationItems[i].remark
                // x = this.inputItems[i];
                this.finalItems.push(x);
            }
        }
    }
    populateAdditionalFormValue(){
        this.requestItem.courseId = this.courseId;
        this.requestItem.examinationItemsStr = JSON.stringify(this.finalItems);
    }

    protected callSearch(input: {code:string}, callbackFn: Function): void{
        this.settingsService.courseExaminationList(input).subscribe(data => callbackFn(data));
    }
    protected callAddItem(requestItem: BaseEditableMdModel, callbackFn: Function): void{    
        // this.classService.courseCreate(requestItem).subscribe(data => callbackFn(data));
        this.settingsService.courseExaminationCreate(requestItem).subscribe(data => callbackFn(data));
    }
    protected callUpdateItem(requestItem: BaseEditableMdModel, callbackFn: Function): void{
        // console.log(requestItem);
        this.settingsService.courseExaminationUpdate(requestItem).subscribe(data => callbackFn(data));
    }

    onAddRow() {
        this.finalItems.push(
            {
                examSubjectId: "",
                examSubjectCode: "",
                examSubjectName: "",
                remark: ""
            });
    }
    onDeleteRow(i: number) {
        this.finalItems.splice(i, 1);
    }
    onUp(i: number) {
        let current = this.finalItems[i];
        this.finalItems[i] = this.finalItems[i - 1];
        this.finalItems[i - 1] = current;
    }
    onDown(i: number) {
        let current = this.finalItems[i];
        this.finalItems[i] = this.finalItems[i + 1];
        this.finalItems[i + 1] = current;
    }
    onChangeExamSubject(i: number, params: any) {
        this.finalItems[i].examSubjectId = params[0];
        this.finalItems[i].examSubjectCode = params[1];
        this.finalItems[i].examSubjectName = params[2];
    }
    startSave() {
        // Checking empty data
        for (let i = 0; i < this.finalItems.length; i++) {
            this.finalItems[i].sortIndex = i+1;
            if (this.finalItems[i].examSubjectId == "") {
                this.showMessage('Thông tin nhập chưa đầy đủ.', 'Cảnh báo', NotificationType.ERROR);
                return;
            }
        }

        // Check duplication
        let valuesAlreadySeen = []
        let duplicated = false;
        for (let i = 0; i < this.finalItems.length; i++) {
            let value = this.finalItems[i].examSubjectId;
            if (valuesAlreadySeen.indexOf(value) !== -1) {
                duplicated = true;
                break;
            }
            valuesAlreadySeen.push(value)
        }
        if (duplicated) {
            this.showMessage('Dữ liệu bị trùng.', 'Cảnh báo', NotificationType.WARNING);
            return;
        }

        this.onSave();
    }
}