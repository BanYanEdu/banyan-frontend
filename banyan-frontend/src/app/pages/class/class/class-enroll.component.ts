import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { BaseAddDialogComponent } from "app/shared/components/BaseAddDialogComponent"
import { CommonService } from 'app/shared/services/common.service';
import { BaseEditableMdModel } from 'app/shared/models/BaseEditableMdModel';
import { ClassService } from '../class.service';
import { SchoolClass } from 'app/model/class/SchoolClass';
import { FormMode } from 'app/model/common/FormMode';
import { NotificationType } from 'app/shared/models/NotificationType';
import { Router } from '@angular/router';

@Component({
    selector: 'app-class-enroll',
    templateUrl: './class-enroll.component.html'
})
export class ClassEnrollComponent extends BaseAddDialogComponent<SchoolClass>{

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
            'code': new FormControl(null, [Validators.required]),
            'name': new FormControl(null, [Validators.required]),
        });
    }

    protected patchInitializedMainForm() {
        
    }

    protected populateAdditionalFormValue() {
    }

    protected callSearch(input: { code: string }, callbackFn: Function): void {
        this.classService.classList(input).subscribe(data => callbackFn(data));
    }
    protected callAddItem(requestItem: BaseEditableMdModel, callbackFn: Function): void {
        // this.classService.classCreate(requestItem).subscribe(data => callbackFn(data));
        
        
    }
    protected callUpdateItem(requestItem: BaseEditableMdModel, callbackFn: Function): void {
        // console.log(this.requestItem);
        this.classService.classUpdate(requestItem).subscribe(data => callbackFn(data));
    }

    onChangeOutlet(event) {
        
    }

    onChangeProgram(event) {
        
    }
    onChangeCourse(event) {
    }

    startSave(mode: string) {
      
    }
}