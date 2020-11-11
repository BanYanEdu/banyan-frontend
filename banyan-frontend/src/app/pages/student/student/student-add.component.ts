import { Component, ElementRef, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { BaseAddDialogComponent } from "app/shared/components/BaseAddDialogComponent"
import { CommonService } from 'app/shared/services/common.service';
import { BaseEditableMdModel } from 'app/shared/models/BaseEditableMdModel';
import { StudentService } from '../student.service';
import { Contact } from 'app/model/student/Contact';

@Component({
    selector: 'app-student-add',
    templateUrl: './student-add.component.html'
})
export class StudentAddComponent extends BaseAddDialogComponent<Contact>{
    constructor(
        element: ElementRef,
        private studentService: StudentService,
        protected commonService: CommonService
    ) {
        super(element, commonService);
    }
    protected createMainFormGroup(): FormGroup {
        return new FormGroup({
            'code': new FormControl(null, [Validators.required]),
            'name': new FormControl(null, [Validators.required]),
            'inactive': new FormControl(null)
        });
    }
    protected callSearch(input: {code:string}, callbackFn: Function): void{
        // this.settingsService.listCurrency(input).subscribe(data => callbackFn(data));
    }
    protected callAddItem(requestItem: BaseEditableMdModel, callbackFn: Function): void{
        // var outlet: Outlet = new Outlet();
        // lookupCode = requestItem;
        // lookupCode.category = this.category;
        console.log(requestItem);
        
        // this.settingsService.addCurrency(requestItem).subscribe(data => callbackFn(data));
    }
    protected callUpdateItem(requestItem: BaseEditableMdModel, callbackFn: Function): void{
        // this.settingsService.updateCurrency(requestItem).subscribe(data => callbackFn(data));
    }
}