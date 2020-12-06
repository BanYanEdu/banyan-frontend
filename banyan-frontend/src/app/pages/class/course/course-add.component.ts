import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { BaseAddDialogComponent } from "app/shared/components/BaseAddDialogComponent"
import { CommonService } from 'app/shared/services/common.service';
import { BaseEditableMdModel } from 'app/shared/models/BaseEditableMdModel';
import { Course } from 'app/model/class/Course';
import { ClassService } from '../class.service';
import { FormMode } from 'app/model/common/FormMode';
import { Router } from '@angular/router';
import { NotificationType } from 'app/shared/models/NotificationType';

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
        private classService: ClassService,
        protected commonService: CommonService,
        private router: Router
    ) {
        super(element, commonService);
    }
    protected createMainFormGroup(): FormGroup {
        if (this.mode == FormMode.E_EDIT) {
            this.view = false;
        } else {
            this.view = true;

        }
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
        } else {
            this.nameField.nativeElement.focus();
        }
    }
    protected callSearch(input: {code:string}, callbackFn: Function): void{
        this.classService.courseList(input).subscribe(data => callbackFn(data));
    }
    protected callAddItem(requestItem: BaseEditableMdModel, callbackFn: Function): void{    
        // this.classService.courseCreate(requestItem).subscribe(data => callbackFn(data));
        this.classService.courseCreate(requestItem).subscribe(data => {
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
        this.classService.courseUpdate(requestItem).subscribe(data => callbackFn(data));
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