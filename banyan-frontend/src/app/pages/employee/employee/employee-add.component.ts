import { Component, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { BaseAddDialogComponent } from "app/shared/components/BaseAddDialogComponent"
import { CommonService } from 'app/shared/services/common.service';
import { BaseEditableMdModel } from 'app/shared/models/BaseEditableMdModel';
import { Employee } from 'app/model/employee/Employee';
import { EmployeeService } from '../employee.service';
import { SettingsService } from 'app/pages/settings/settings.service';

@Component({
    selector: 'app-employee-add',
    templateUrl: './employee-add.component.html'
})
export class EmployeeAddComponent extends BaseAddDialogComponent<Employee>{
    codeAutoGenerating: boolean = false;

    constructor(
        element: ElementRef,
        private employeeService: EmployeeService,
        private settingsService: SettingsService,
        protected commonService: CommonService
    ) {
        super(element, commonService);
    }

    protected createMainFormGroup(): FormGroup {
        return new FormGroup({
            'code': new FormControl(null, [Validators.required]),
            'name': new FormControl(null, [Validators.required]),
            'phoneNo': new FormControl(null, [Validators.required]),
            'email': new FormControl(null, [Validators.required]),
            'inactive': new FormControl(null)
        });
    }

    patchInitializedMainForm() {
        this.settingsService.systemConfigList({}).subscribe(data => {
            this.codeAutoGenerating = data.items[0].employeeProfileConfig.codeAutoGenerating;
            if (this.codeAutoGenerating) {
                this.mainForm.get('code').setValue("Tạo tự động");
                this.mainForm.get('code').disable();
            }
        }
        );
    }

    populateAdditionalFormValue() {
        this.requestItem.codeAutoGenerating = this.codeAutoGenerating;
    }

    protected callSearch(input: { code: string }, callbackFn: Function): void {
        console.log("check code...");
        // this.employeeService.employeeList(input).subscribe(data => callbackFn(data));

        if (this.codeAutoGenerating == false) {
            this.employeeService.employeeList(input).subscribe(data => callbackFn(data));
        } else {
            this.employeeService.employeeList({code: '!@#$$%^&*()#@!^&$'}).subscribe(data => callbackFn(data));
        }
    }
    protected callAddItem(requestItem: BaseEditableMdModel, callbackFn: Function): void {
        // requestItem.codeAutoGenerating = true;
        console.log(requestItem);
        this.employeeService.employeeCreate(requestItem).subscribe(data => callbackFn(data));
    }
    protected callUpdateItem(requestItem: BaseEditableMdModel, callbackFn: Function): void {
        this.employeeService.employeeUpdate(requestItem).subscribe(data => callbackFn(data));
    }
}