import { Component, ElementRef, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { BaseAddDialogComponent } from "app/shared/components/BaseAddDialogComponent"
import { CommonService } from 'app/shared/services/common.service';
import { BaseEditableMdModel } from 'app/shared/models/BaseEditableMdModel';
import { ClassService } from '../class.service';
import { SchoolClass } from 'app/model/class/SchoolClass';
import { FormMode } from 'app/model/common/FormMode';
import { NotificationType } from 'app/shared/models/NotificationType';

@Component({
    selector: 'app-class-add',
    templateUrl: './class-add.component.html'
})
export class ClassAddComponent extends BaseAddDialogComponent<SchoolClass>{
    programId: string = "";
    courseId: string = "";
    outletId: string = "";
    statusValues: any[] = [
        {value: 'E_PLANNING'},
        {value: 'E_RECRUITING'},
        {value: 'E_STARTED'},
        {value: 'E_COMPLETED'},
        {value: 'E_CANCELED'}
    ];

    constructor(
        element: ElementRef,
        private classService: ClassService,
        protected commonService: CommonService
    ) {
        super(element, commonService);
    }
    protected createMainFormGroup(): FormGroup {
        return new FormGroup({
            'code': new FormControl(null, [Validators.required]),
            'name': new FormControl(null, [Validators.required]),
            'outletId': new FormControl(null),
            'outletCode': new FormControl(null),
            'outletName': new FormControl(null),
            'status': new FormControl(null, [Validators.required]),
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

    protected patchInitializedMainForm() {
        if (this.mode == FormMode.E_ADD) {
            this.programId = "SELECTOR";
            this.courseId = "SELECTOR";
            this.outletId = "SELECTOR";
            this.mainForm.controls['status'].setValue(this.statusValues[0].value);
        } else {
            this.programId = this.item.programId;
            this.courseId = this.item.courseId;
            this.outletId = this.item.outletId;
        }
    }

    protected callSearch(input: {code:string}, callbackFn: Function): void{
        this.classService.classList(input).subscribe(data => callbackFn(data));
    }
    protected callAddItem(requestItem: BaseEditableMdModel, callbackFn: Function): void{
        this.classService.classCreate(requestItem).subscribe(data => callbackFn(data));
    }
    protected callUpdateItem(requestItem: BaseEditableMdModel, callbackFn: Function): void{
        // console.log(this.requestItem);
        this.classService.classUpdate(requestItem).subscribe(data => callbackFn(data));
    }

    onChangeOutlet(event) {
        this.mainForm.controls['outletId'].setValue(event[0]);
        this.mainForm.controls['outletCode'].setValue(event[1]);
        this.mainForm.controls['outletName'].setValue(event[2]);
        this.outletId = event[0];
    }

    onChangeProgram(event) {
        console.log("Class - Program changed");
        this.mainForm.controls['programId'].setValue(event[0]);
        this.mainForm.controls['programCode'].setValue(event[1]);
        this.mainForm.controls['programName'].setValue(event[2]);
        this.mainForm.controls['courseId'].setValue("");
        this.mainForm.controls['courseCode'].setValue("");
        this.mainForm.controls['courseName'].setValue("");

        this.programId = event[0];
    }
    onChangeCourse(event) {
        this.mainForm.controls['courseId'].setValue(event[0]);
        this.mainForm.controls['courseCode'].setValue(event[1]);
        this.mainForm.controls['courseName'].setValue(event[2]);

        this.courseId = event[0];
    }

    startSave() {
        if (this.outletId == "SELECTOR") {
            this.showMessage('Chưa chọn chi nhánh.', 'Cảnh báo', NotificationType.ERROR);
            return;
        }
        if (this.programId == "SELECTOR") {
            this.showMessage('Chưa chọn chương trình.', 'Cảnh báo', NotificationType.ERROR);
            return;
        }
        if (this.courseId == "SELECTOR") {
            this.showMessage('Chưa chọn khóa học.', 'Cảnh báo', NotificationType.ERROR);
            return;
        }

        this.onSave();


    }
}