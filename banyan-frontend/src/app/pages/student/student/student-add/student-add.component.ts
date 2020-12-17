import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { BaseAddDialogComponent } from "app/shared/components/BaseAddDialogComponent"
import { CommonService } from 'app/shared/services/common.service';
import { BaseEditableMdModel } from 'app/shared/models/BaseEditableMdModel';
import { StudentService } from '../../student.service';
import { Contact } from 'app/model/student/Contact';
import { SettingsService } from 'app/pages/settings/settings.service';
import { FormMode } from 'app/model/common/FormMode';
import { Router } from '@angular/router';

@Component({
    selector: 'app-student-add',
    templateUrl: './student-add.component.html'
})
export class StudentAddComponent extends BaseAddDialogComponent<Contact>{
    view: boolean = false;
    moveToView: boolean = false;
    codeAutoGenerating: boolean = false;
    @ViewChild("code") codeField: ElementRef;
    @ViewChild("name") nameField: ElementRef;
    genders: any[] = ['E_MALE', 'E_FEMALE', 'E_OTHER'];

    constructor(
        element: ElementRef,
        private studentService: StudentService,
        private settingsService: SettingsService,
        protected commonService: CommonService,
        protected router: Router
    ) {
        super(element, commonService);
    }
    protected createMainFormGroup(): FormGroup {
        return new FormGroup({
            'code': new FormControl(null, [Validators.required]),
            'name': new FormControl(null, [Validators.required]),
            'gender': new FormControl(null, [Validators.required]),
            'dob': new FormControl(null, [Validators.required]),
            'phoneNo': new FormControl(null, [Validators.required]),
            'email': new FormControl(null, [Validators.required]),
            'occupationDesc': new FormControl(null),
            'contactAddressFull': new FormControl(null),
            'permanentAddressFull': new FormControl(null),
            'inactive': new FormControl(null),
            'outletId': new FormControl(null, [Validators.required]),
            'outletCode': new FormControl(null),
            'outletName': new FormControl(null),
            'sourceId': new FormControl(null, [Validators.required]),
            'sourceCode': new FormControl(null),
            'sourceName': new FormControl(null),
        });
    }

    patchInitializedMainForm() {
        this.settingsService.systemConfigList({}).subscribe(data => {
            this.codeAutoGenerating = data.items[0].contactProfileConfig.codeAutoGenerating;
            if (this.codeAutoGenerating) {
                this.mainForm.get('code').disable();
                this.nameField.nativeElement.focus();
            } else {
                if (this.mode == FormMode.E_ADD) {
                    this.codeField.nativeElement.focus();
                } else {
                    this.nameField.nativeElement.focus();
                }
            }
        }
        );

        if (this.mode == FormMode.E_ADD) {
            this.view = true;
        } else {
            this.mainForm.controls['dob'].setValue(new Date(this.item.dob));
            this.view = false;
        }
    }

    populateAdditionalFormValue() {
        this.requestItem.type = "E_PERSON";

        this.requestItem.codeAutoGenerating = this.codeAutoGenerating;
        this.requestItem.dob = this.mainForm.controls['dob'].value.getTime() || null;
        
    }

    protected callSearch(input: {code:string}, callbackFn: Function): void{
        if (this.codeAutoGenerating == false) {
            this.studentService.studentList(input).subscribe(data => callbackFn(data));
        } else {
            this.studentService.studentList({ code: '!@#$$%^&*()#@!^&$' }).subscribe(data => callbackFn(data));
        }
    }
    protected callAddItem(requestItem: BaseEditableMdModel, callbackFn: Function): void{
        // console.log(requestItem);
        
        this.studentService.studentCreate(requestItem).subscribe(data => {
            this.showMessage('MESSAGE.DATA_SAVED', 'MESSAGE.NOTIFICATION');
            if (this.moveToView) {
                this.valueChange.emit(data);
                this.router.navigate(['/student/student/view/' + data]);
            } else {
                this.valueChange.emit([data, this.requestItem.name]);
            }
        });
    }
    protected callUpdateItem(requestItem: BaseEditableMdModel, callbackFn: Function): void{
        this.studentService.studentUpdate(requestItem).subscribe(data => callbackFn(data));
    }

    startSave(mode: string) {
        if (mode == "E_SAVE") {
            this.onSave();
        } else {
            this.moveToView = true;
            this.onSave();
        }
    }

    onChangeOutlet(event) {
        this.mainForm.controls['outletId'].setValue(event[0]);
        this.mainForm.controls['outletCode'].setValue(event[1]);
        this.mainForm.controls['outletName'].setValue(event[2]);
    }
    onChangeSource(event) {
        this.mainForm.controls['sourceId'].setValue(event[0]);
        this.mainForm.controls['sourceCode'].setValue(event[1]);
        this.mainForm.controls['sourceName'].setValue(event[2]);
    }
}