import { Component, ElementRef, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { BaseAddDialogComponent } from "app/shared/components/BaseAddDialogComponent"
import { CommonService } from 'app/shared/services/common.service';
import { BaseEditableMdModel } from 'app/shared/models/BaseEditableMdModel';
import { Employee } from 'app/model/employee/Employee';
import { EmployeeService} from '../employee.service';

@Component({
    selector: 'app-employee-add',
    templateUrl: './employee-add.component.html'
})
export class EmployeeAddComponent extends BaseAddDialogComponent<Employee>{
    constructor(
        element: ElementRef,
        private employeeService: EmployeeService,
        protected commonService: CommonService
    ) {
        super(element, commonService);
    }
    protected createMainFormGroup(): FormGroup {
        return new FormGroup({
            'code': new FormControl(null, [Validators.required]),
            'name': new FormControl(null, [Validators.required]),
            'sortIndex': new FormControl(null, [Validators.required]),
            'inactive': new FormControl(null)
        });
    }
    protected callSearch(input: {code:string}, callbackFn: Function): void{
        this.employeeService.employeeList(input).subscribe(data => callbackFn(data));
    }
    protected callAddItem(requestItem: BaseEditableMdModel, callbackFn: Function): void{
        this.employeeService.employeeCreate(requestItem).subscribe(data => callbackFn(data));
    }
    protected callUpdateItem(requestItem: BaseEditableMdModel, callbackFn: Function): void{
        this.employeeService.employeeUpdate(requestItem).subscribe(data => callbackFn(data));
    }
}