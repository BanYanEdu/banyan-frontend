import { Component, ElementRef, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { BaseAddDialogComponent } from "app/shared/components/BaseAddDialogComponent"
import { CommonService } from 'app/shared/services/common.service';
import { BaseEditableMdModel } from 'app/shared/models/BaseEditableMdModel';
import { ClassService } from '../class.service';
import { SchoolClass } from 'app/model/class/SchoolClass';
import { FormMode } from 'app/model/common/FormMode';
import { NotificationType } from 'app/shared/models/NotificationType';
import { BsDatepickerConfig } from 'ngx-bootstrap';

@Component({
    selector: 'app-class-add',
    templateUrl: './class-add.component.html'
})
export class ClassAddComponent extends BaseAddDialogComponent<SchoolClass>{
    programId: string = "";
    courseId: string = "";
    outletId: string = "";
    schedulePatternId: string = "";
    facilityId: string = "";
    statusValues: any[] = [
        {value: 'E_PLANNING'},
        {value: 'E_RECRUITING'},
        {value: 'E_STARTED'},
        {value: 'E_COMPLETED'},
        {value: 'E_CANCELED'}
    ];
    // public datePickerConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();

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
            'schedulePatternName': new FormControl(null),
            'actualStartDate': new FormControl(null, [Validators.required]),
            'actualEndDate': new FormControl(null, [Validators.required]),
            'minHeadCount': new FormControl(null, [Validators.required]),
            'maxHeadCount': new FormControl(null, [Validators.required]),
            'facilityId': new FormControl(null),
            'facilityCode': new FormControl(null),
            'facilityName': new FormControl(null),
            'facilityNo': new FormControl(null),
            'remark': new FormControl(null),
        });
    }

    protected patchInitializedMainForm() {
        if (this.mode == FormMode.E_ADD) {
            this.programId = "SELECTOR";
            this.courseId = "SELECTOR";
            this.outletId = "SELECTOR";
            this.schedulePatternId = "SELECTOR";
            this.mainForm.controls['status'].setValue(this.statusValues[0].value);
        } else {
            this.programId = this.item.programId;
            this.courseId = this.item.courseId;
            this.outletId = this.item.outletId;
            this.schedulePatternId = this.item.schedulePatternId;
            this.facilityId = this.item.facilityId;
            this.mainForm.controls['actualStartDate'].setValue(new Date(this.item.actualStartDate));
            this.mainForm.controls['actualEndDate'].setValue(new Date(this.item.actualEndDate));
        }
    }

    protected populateAdditionalFormValue() {
        this.requestItem.actualStartDate = this.mainForm.controls['actualStartDate'].value.getTime() || null;
        this.requestItem.actualEndDate = this.mainForm.controls['actualEndDate'].value.getTime() || null;
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
        this.mainForm.controls['facilityId'].setValue("");
        this.mainForm.controls['facilityCode'].setValue("");
        this.mainForm.controls['facilityName'].setValue("");
        this.mainForm.controls['facilityNo'].setValue("");
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

    onChangeSchedulePattern(event) {
        this.mainForm.controls['schedulePatternId'].setValue(event[0]);
        this.mainForm.controls['schedulePatternCode'].setValue(event[1]);
        this.mainForm.controls['schedulePatternName'].setValue(event[2]);
        this.schedulePatternId = event[0];
    }

    onChangeFacility(event) {
        this.mainForm.controls['facilityId'].setValue(event[0]);
        this.mainForm.controls['facilityCode'].setValue(event[1]);
        this.mainForm.controls['facilityName'].setValue(event[2]);
        this.mainForm.controls['facilityNo'].setValue(event[3]);

        this.facilityId = event[0];
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
        if (this.schedulePatternId == "SELECTOR") {
            this.showMessage('Chưa chọn lịch học.', 'Cảnh báo', NotificationType.ERROR);
            return;
        }

        this.onSave();


    }
}