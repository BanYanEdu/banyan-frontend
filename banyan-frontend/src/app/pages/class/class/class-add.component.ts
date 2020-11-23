import { Component, ElementRef, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { BaseAddDialogComponent } from "app/shared/components/BaseAddDialogComponent"
import { CommonService } from 'app/shared/services/common.service';
import { BaseEditableMdModel } from 'app/shared/models/BaseEditableMdModel';
import { ClassService } from '../class.service';
import { SchoolClass } from 'app/model/class/SchoolClass';

@Component({
    selector: 'app-class-add',
    templateUrl: './class-add.component.html'
})
export class ClassAddComponent extends BaseAddDialogComponent<SchoolClass>{
    programId: string;
    courseId: string;

    constructor(
        element: ElementRef,
        private classService: ClassService,
        protected commonService: CommonService
    ) {
        super(element, commonService);
    }
    protected createMainFormGroup(): FormGroup {
        if (this.item.programId != "") {
            this.programId = this.item.programId;
        } else {
            this.programId = "";
        }
        if (this.item.courseId != "") {
            this.courseId = this.item.courseId;
        } else {
            this.courseId = "";
        }

        return new FormGroup({
            'code': new FormControl(null, [Validators.required]),
            'name': new FormControl(null, [Validators.required]),
            'outletId': new FormControl(null, [Validators.required]),
            'outletCode': new FormControl(null),
            'outletName': new FormControl(null),
            'status': new FormControl(null),
            'programId': new FormControl(null),
            'programCode': new FormControl(null),
            'programName': new FormControl(null),
            'courseId': new FormControl(null),
            'courseCode': new FormControl(null),
            'courseName': new FormControl(null),
            'schedulePatternId': new FormControl(null),
            'schedulePatternCode': new FormControl(null),
            'schedulePatternName': new FormControl(null)
        });
    }
    protected callSearch(input: {code:string}, callbackFn: Function): void{
        this.classService.classList(input).subscribe(data => callbackFn(data));
    }
    protected callAddItem(requestItem: BaseEditableMdModel, callbackFn: Function): void{
        this.classService.classCreate(requestItem).subscribe(data => callbackFn(data));
    }
    protected callUpdateItem(requestItem: BaseEditableMdModel, callbackFn: Function): void{
        this.classService.classUpdate(requestItem).subscribe(data => callbackFn(data));
    }

    onChangeOutlet(event) {
        this.mainForm.controls['outletId'].setValue(event[0]);
        this.mainForm.controls['outletCode'].setValue(event[1]);
        this.mainForm.controls['outletName'].setValue(event[2]);
    }
    onChangeProgram(event) {
        this.mainForm.controls['programId'].setValue(event[0]);
        this.mainForm.controls['programCode'].setValue(event[1]);
        this.mainForm.controls['programName'].setValue(event[2]);

        this.programId = event[0];
        this.courseId = "";
        
        console.log("CourseId changed ");
        console.log(this.programId);
        console.log(this.courseId);
        
        // this.onChangeCourse(["", "", ""]);
    }
    onChangeCourse(event) {
        this.mainForm.controls['courseId'].setValue(event[0]);
        this.mainForm.controls['courseCode'].setValue(event[1]);
        this.mainForm.controls['courseName'].setValue(event[2]);
    }
}