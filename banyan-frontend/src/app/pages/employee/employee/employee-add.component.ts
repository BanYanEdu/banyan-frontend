import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { BaseAddDialogComponent } from "app/shared/components/BaseAddDialogComponent"
import { CommonService } from 'app/shared/services/common.service';
import { BaseEditableMdModel } from 'app/shared/models/BaseEditableMdModel';
import { Employee } from 'app/model/employee/Employee';
import { EmployeeService } from '../employee.service';
import { SettingsService } from 'app/pages/settings/settings.service';
import { FormMode } from 'app/model/common/FormMode';
import { Router } from '@angular/router';

@Component({
    selector: 'app-employee-add',
    templateUrl: './employee-add.component.html'
})
export class EmployeeAddComponent extends BaseAddDialogComponent<Employee>{
    view: boolean = false;
    moveToView: boolean = false;
    codeAutoGenerating: boolean = false;
    @ViewChild("code") codeField: ElementRef;
    @ViewChild("name") nameField: ElementRef;
    genders: any[] = ['E_MALE', 'E_FEMALE', 'E_OTHER'];
    employmentStatuses: any[] = ['E_HIRED', 'E_TERMINATED'];
    workingTypes: any[] = ['E_FULL_TIME', 'E_PART_TIME'];
    eduLevels: any[] = ['E_HIGH_SCHOOL', 'E_COLLEGE', 'E_UNIVERSITY', 'E_MASTER', 'E_PHD']

    constructor(
        element: ElementRef,
        private employeeService: EmployeeService,
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
            'phoneNo': new FormControl(null, [Validators.required]),
            'email': new FormControl(null, [Validators.required, Validators.email]),
            'inactive': new FormControl(null),
            'contactAddressFull': new FormControl(null),
            'dob': new FormControl(null, [Validators.required]),
            'gender': new FormControl(null, [Validators.required]),
            'asForeigner': new FormControl(null),
            'otherName': new FormControl(null),
            'jobTitle': new FormControl(null, [Validators.required]),
            'idCardNo': new FormControl(null),
            'idCardIssueDate': new FormControl(null),
            'idCardIssuePlace': new FormControl(null),
            'outletId': new FormControl(null, [Validators.required]),
            'outletCode': new FormControl(null),
            'outletName': new FormControl(null),
            'orgUnitName': new FormControl(null),
            'employmentStatus': new FormControl(null, [Validators.required]),
            'workingType': new FormControl(null, [Validators.required]),
            'startedDate': new FormControl(null, [Validators.required]),
            'terminatedDate': new FormControl(null),
            'eduLevel': new FormControl(null),
            'hasService': new FormControl(null),
            'yearsOfServiceExperiences': new FormControl(null),
            'serviceQualificationRemark': new FormControl(null),

        });
    }

    patchInitializedMainForm() {
        // console.log(this.item);

        this.settingsService.systemConfigList({}).subscribe(data => {
            this.codeAutoGenerating = data.items[0].employeeProfileConfig.codeAutoGenerating;
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
            this.mainForm.controls['employmentStatus'].setValue(this.employmentStatuses[0]);
            this.mainForm.controls['workingType'].setValue(this.workingTypes[0]);
            this.view = true;
        } else {
            this.mainForm.controls['dob'].setValue(new Date(this.item.dob));
            this.mainForm.controls['startedDate'].setValue(new Date(this.item.startedDate));
            if (this.item.idCardIssueDate != 0) {
                this.mainForm.controls['idCardIssueDate'].setValue(new Date(this.item.idCardIssueDate));
            } else { }
            if (this.item.terminatedDate != 0) {
                this.mainForm.controls['terminatedDate'].setValue(new Date(this.item.terminatedDate));
            }

            this.nameField.nativeElement.focus();
            this.view = false;
        }
    }

    populateAdditionalFormValue() {
        this.requestItem.codeAutoGenerating = this.codeAutoGenerating;
        this.requestItem.dob = this.mainForm.controls['dob'].value.getTime() || null;
        this.requestItem.startedDate = this.mainForm.controls['startedDate'].value.getTime() || null;
        if (this.mainForm.controls['idCardIssueDate'].value) {
            this.requestItem.idCardIssueDate = this.mainForm.controls['idCardIssueDate'].value.getTime() || null;
        }
        if (this.mainForm.controls['terminatedDate'].value) {
            this.requestItem.terminatedDate = this.mainForm.controls['terminatedDate'].value.getTime() || null;
        }
    }

    protected callSearch(input: { code: string }, callbackFn: Function): void {
        if (this.codeAutoGenerating == false) {
            this.employeeService.employeeList(input).subscribe(data => callbackFn(data));
        } else {
            this.employeeService.employeeList({ code: '!@#$$%^&*()#@!^&$' }).subscribe(data => callbackFn(data));
        }
    }
    protected callAddItem(requestItem: BaseEditableMdModel, callbackFn: Function): void {
        // console.log(requestItem);
        
        this.employeeService.employeeCreate(requestItem).subscribe(data => {
            this.showMessage('MESSAGE.DATA_SAVED', 'MESSAGE.NOTIFICATION');
            if (this.moveToView) {
                this.valueChange.emit(data);
                this.router.navigate(['/employee/employee/view/' + data]);
            } else {
                this.valueChange.emit(data);
            }
        });
    }
    protected callUpdateItem(requestItem: BaseEditableMdModel, callbackFn: Function): void {
        // console.log(requestItem);
        this.employeeService.employeeUpdate(requestItem).subscribe(data => callbackFn(data));
    }

    onChangeOutlet(event) {
        this.mainForm.controls['outletId'].setValue(event[0]);
        this.mainForm.controls['outletCode'].setValue(event[1]);
        this.mainForm.controls['outletName'].setValue(event[2]);
    }

    startSave(mode: string) {
        if (mode == "E_SAVE") {
            this.onSave();
        } else {
            this.moveToView = true;
            this.onSave();
        }
    }
}