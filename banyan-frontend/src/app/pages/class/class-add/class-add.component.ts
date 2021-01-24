import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { BaseAddDialogComponent } from "app/shared/components/BaseAddDialogComponent"
import { CommonService } from 'app/shared/services/common.service';
import { BaseEditableMdModel } from 'app/shared/models/BaseEditableMdModel';
import { SchoolClass } from 'app/model/class/SchoolClass';
import { FormMode } from 'app/model/common/FormMode';
import { NotificationType } from 'app/shared/models/NotificationType';
import { Router } from '@angular/router';
import { ClassStatuses } from 'app/data/global/ClassStatuses';
import { ClassService } from '../class.service';

@Component({
    selector: 'app-class-add',
    templateUrl: './class-add.component.html'
})
export class ClassAddComponent extends BaseAddDialogComponent<SchoolClass>{
    view: boolean = false;
    moveToView: boolean = false;
    programId: string = "";
    courseId: string = "";
    outletId: string = "";
    schedulePatternId: string = "";
    facilityId: string = "";
    statusValues: any[] = ClassStatuses;
    @ViewChild("code") codeField: ElementRef;
    @ViewChild("name") nameField: ElementRef;
    nextChangedProgram: boolean = false;
    nextChangedOutlet: boolean = false;

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
            'outletId': new FormControl(null, [Validators.required]),
            'outletCode': new FormControl(null),
            'outletName': new FormControl(null),
            'status': new FormControl(null, [Validators.required]),
            'programId': new FormControl(null, [Validators.required]),
            'programCode': new FormControl(null),
            'programName': new FormControl(null),
            'courseId': new FormControl(null),
            'courseCode': new FormControl(null),
            'courseName': new FormControl(null),
            'schedulePatternId': new FormControl(null, [Validators.required]),
            'schedulePatternCode': new FormControl(null),
            'schedulePatternName': new FormControl(null),
            'actualStartDate': new FormControl(null, [Validators.required]),
            'actualEndDate': new FormControl(null, [Validators.required]),
            'sessionCount': new FormControl(null, [Validators.required]),
            'minHeadCount': new FormControl(null),
            'maxHeadCount': new FormControl(null),
            'facilityId': new FormControl(null, [Validators.required]),
            'facilityCode': new FormControl(null),
            'facilityName': new FormControl(null),
            'facilityNo': new FormControl(null),
            'remark': new FormControl(null),
        });
    }

    protected patchInitializedMainForm() {
        if (this.mode == FormMode.E_ADD) {
            this.programId = "";
            this.courseId = "";
            this.outletId = "";
            this.schedulePatternId = "";
            this.mainForm.controls['status'].setValue(this.statusValues[0].value);
            this.mainForm.controls['minHeadCount'].setValue(10);
            this.mainForm.controls['maxHeadCount'].setValue(20);
        } else {
            this.programId = this.item.programId;
            this.courseId = this.item.courseId;
            this.outletId = this.item.outletId;
            this.schedulePatternId = this.item.schedulePatternId;
            this.facilityId = this.item.facilityId;
            this.mainForm.controls['actualStartDate'].setValue(new Date(this.item.actualStartDate));
            this.mainForm.controls['actualEndDate'].setValue(new Date(this.item.actualEndDate));
        }

        if (this.mode == FormMode.E_ADD) {
            this.codeField.nativeElement.focus();
            this.view = true;
        } else {
            this.nameField.nativeElement.focus();
            this.view = false;
        }
    }

    protected populateAdditionalFormValue() {
        // let startDate = this.mainForm.controls['actualStartDate'].value;
        let startDate = new Date(this.mainForm.controls['actualStartDate'].value.getTime());
        let endDate = new Date(this.mainForm.controls['actualEndDate'].value.getTime());
        startDate.setHours(0,0,0,0);
        endDate.setHours(0,0,0,0);
        this.requestItem.actualStartDate = startDate.getTime();
        this.requestItem.actualEndDate = endDate.getTime();
        
        // this.requestItem.actualStartDate = this.mainForm.controls['actualStartDate'].value.getTime() || null;
        // this.requestItem.actualEndDate = this.mainForm.controls['actualEndDate'].value.getTime() || null;
    }

    protected callSearch(input: { code: string }, callbackFn: Function): void {
        this.classService.classList(input).subscribe(data => callbackFn(data));
    }
    protected callAddItem(requestItem: BaseEditableMdModel, callbackFn: Function): void {
        // this.classService.classCreate(requestItem).subscribe(data => callbackFn(data));
        this.classService.classCreate(requestItem).subscribe(data => {
            this.showMessage('MESSAGE.DATA_SAVED', 'MESSAGE.NOTIFICATION');
            if (this.moveToView) {
                this.valueChange.emit(data);
                this.router.navigate(['/class/class/view/' + data]);
            } else {
                this.valueChange.emit(data);
            }
        });
        
    }
    protected callUpdateItem(requestItem: BaseEditableMdModel, callbackFn: Function): void {
        // console.log(this.requestItem);
        this.classService.classUpdate(requestItem).subscribe(data => callbackFn(data));
    }

    onChangeOutlet(event) {
        this.mainForm.controls['outletId'].setValue(event[0]);
        this.mainForm.controls['outletCode'].setValue(event[1]);
        this.mainForm.controls['outletName'].setValue(event[2]);
        if (this.nextChangedOutlet) {
            this.mainForm.controls['facilityId'].setValue("");
            this.mainForm.controls['facilityCode'].setValue("");
            this.mainForm.controls['facilityName'].setValue("");
            this.mainForm.controls['facilityNo'].setValue("");
        } else {
            this.nextChangedOutlet = true;
        }

        this.outletId = event[0];
    }

    onChangeProgram(event) {
        // console.log("Class - Program changed");
        this.mainForm.controls['programId'].setValue(event[0]);
        this.mainForm.controls['programCode'].setValue(event[1]);
        this.mainForm.controls['programName'].setValue(event[2]);
        if (!this.nextChangedProgram) {
            this.nextChangedProgram = true;

        } else {
            this.mainForm.controls['courseId'].setValue("");
            this.mainForm.controls['courseCode'].setValue("");
            this.mainForm.controls['courseName'].setValue("");
        }

        this.programId = event[0];
    }
    onChangeCourse(event) {
        // console.log("Class - Course changed");
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

    startSave(mode: string) {
        if (mode == "E_SAVE") {
            this.onSave();
        } else {
            this.moveToView = true;
            this.onSave();
        }
    }
}