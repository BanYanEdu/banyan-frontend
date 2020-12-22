import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { BaseAddDialogComponent } from "app/shared/components/BaseAddDialogComponent"
import { CommonService } from 'app/shared/services/common.service';
import { BaseEditableMdModel } from 'app/shared/models/BaseEditableMdModel';
import { Course } from 'app/model/settings/Course';
import { FormMode } from 'app/model/common/FormMode';
import { Router } from '@angular/router';
import { NotificationType } from 'app/shared/models/NotificationType';
import { ClassService } from '../../../class/class.service';
import { SettingsService } from '../../settings.service';

@Component({
    selector: 'app-course-add',
    templateUrl: './course-add.component.html'
})
export class CourseAddComponent extends BaseAddDialogComponent<Course>{
    view: boolean = false;
    moveToView: boolean = false;
    programId: string;
    @ViewChild("code") codeField: ElementRef;
    @ViewChild("name") nameField: ElementRef;

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
            'code': new FormControl(null, [Validators.required]),
            'name': new FormControl(null, [Validators.required]),
            'sortIndex': new FormControl(null, [Validators.required]),
            'inactive': new FormControl(null),
            'checkingRequired': new FormControl(null),
            'curriculum': new FormControl(null),
            'programId': new FormControl(null, [Validators.required]),
            'programCode': new FormControl(null),
            'programName': new FormControl(null),
 
        });
    }
    patchInitializedMainForm() {
        if (this.mode == FormMode.E_ADD) {
            this.codeField.nativeElement.focus();
            this.view = true;
        } else {
            this.nameField.nativeElement.focus();
            this.view = false;
        }
    }
    protected callSearch(input: {code:string}, callbackFn: Function): void{
        this.settingsService.courseList(input).subscribe(data => callbackFn(data));
    }
    protected callAddItem(requestItem: BaseEditableMdModel, callbackFn: Function): void{    
        // this.classService.courseCreate(requestItem).subscribe(data => callbackFn(data));
        this.settingsService.courseCreate(requestItem).subscribe(data => {
            this.showMessage('MESSAGE.DATA_SAVED', 'MESSAGE.NOTIFICATION');
            if (this.moveToView) {
                this.valueChange.emit(data);
                this.router.navigate(['/class/course/view/' + data]);
            } else {
                this.valueChange.emit(data);
            }
        });
    }
    protected callUpdateItem(requestItem: BaseEditableMdModel, callbackFn: Function): void{
        this.settingsService.courseUpdate(requestItem).subscribe(data => callbackFn(data));
    }

    onChangeProgram(event) {
        this.mainForm.controls['programId'].setValue(event[0]);
        this.mainForm.controls['programCode'].setValue(event[1]);
        this.mainForm.controls['programName'].setValue(event[2]);
    }

    startSave(mode: string) {
        if ( this.mainForm.controls['programId'].value == "") {
            this.showMessage('Chưa chọn chương trình.', 'Cảnh báo', NotificationType.ERROR);
            return;
        }

        if (mode == "E_SAVE") {
            this.onSave();
        } else {
            this.moveToView = true;
            this.onSave();
        }
    }
}