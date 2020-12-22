import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { BaseAddDialogComponent } from "app/shared/components/BaseAddDialogComponent"
import { CommonService } from 'app/shared/services/common.service';
import { BaseEditableMdModel } from 'app/shared/models/BaseEditableMdModel';
import { FormMode } from 'app/model/common/FormMode';
import { Router } from '@angular/router';
import { NotificationType } from 'app/shared/models/NotificationType';
import { SettingsService } from '../../settings.service';
import { CourseTest } from 'app/model/settings/CourseTest';
import { Course } from 'app/model/settings/Course';

@Component({
    selector: 'app-course-test-add',
    templateUrl: './course-test-add.component.html'
})
export class CourseTestAddComponent extends BaseAddDialogComponent<CourseTest>{
    @Input() courseId: string;
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
        this.nameField.nativeElement.focus();
        if (this.mode == FormMode.E_EDIT) {
            this.finalItems = this.item.testSubjects;
        }
    }
    populateAdditionalFormValue(){
        this.requestItem.courseId = this.courseId;
        this.requestItem.testSubjectsStr = JSON.stringify(this.finalItems);
    }

    protected callSearch(input: {code:string}, callbackFn: Function): void{
        this.settingsService.courseList(input).subscribe(data => callbackFn(data));
    }
    protected callAddItem(requestItem: BaseEditableMdModel, callbackFn: Function): void{    
        // this.classService.courseCreate(requestItem).subscribe(data => callbackFn(data));
        this.settingsService.courseTestCreate(requestItem).subscribe(data => callbackFn(data));
    }
    protected callUpdateItem(requestItem: BaseEditableMdModel, callbackFn: Function): void{
        this.settingsService.courseTestUpdate(requestItem).subscribe(data => callbackFn(data));
    }

    onAddRow() {
        this.finalItems.push(
            {
                testSubjectId: "",
                testSubjectCode: "",
                testSubjectName: "",
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
    onChangeTestSubject(i: number, params: any) {
        this.finalItems[i].testSubjectId = params[0];
        this.finalItems[i].testSubjectCode = params[1];
        this.finalItems[i].testSubjectName = params[2];
    }
    startSave() {
        // Checking empty data
        for (let i = 0; i < this.finalItems.length; i++) {
            this.finalItems[i].sortIndex = i+1;
            if (this.finalItems[i].testSubjectId == "") {
                this.showMessage('Thông tin nhập chưa đầy đủ.', 'Cảnh báo', NotificationType.ERROR);
                return;
            }
        }

        this.onSave();
    }
}