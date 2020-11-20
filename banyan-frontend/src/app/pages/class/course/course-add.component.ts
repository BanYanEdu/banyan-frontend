import { Component, ElementRef, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { BaseAddDialogComponent } from "app/shared/components/BaseAddDialogComponent"
import { CommonService } from 'app/shared/services/common.service';
import { BaseEditableMdModel } from 'app/shared/models/BaseEditableMdModel';
import { Course } from 'app/model/class/Course';
import { ClassService } from '../class.service';
import { FormMode } from 'app/model/common/FormMode';
import { Router } from '@angular/router';

@Component({
    selector: 'app-course-add',
    templateUrl: './course-add.component.html'
})
export class CourseAddComponent extends BaseAddDialogComponent<Course>{
    view: boolean = false;
    moveToView: boolean = false;

    constructor(
        element: ElementRef,
        private classService: ClassService,
        protected commonService: CommonService,
        private router: Router
    ) {
        super(element, commonService);
    }
    protected createMainFormGroup(): FormGroup {
        if (this.mode == FormMode.E_EDIT) {
            this.view = false;
        } else {
            this.view = true;
        }
        return new FormGroup({
            'code': new FormControl(null, [Validators.required]),
            'name': new FormControl(null, [Validators.required]),
            'sortIndex': new FormControl(null, [Validators.required]),
            'inactive': new FormControl(null),
            'checkingRequired': new FormControl(null),
            'curriculum': new FormControl(null),
            'programId': new FormControl(null),
            'programCode': new FormControl(null),
            'programName': new FormControl(null),
 
        });
    }
    protected callSearch(input: {code:string}, callbackFn: Function): void{
        this.classService.courseList(input).subscribe(data => callbackFn(data));
    }
    protected callAddItem(requestItem: BaseEditableMdModel, callbackFn: Function): void{    
        // this.classService.courseCreate(requestItem).subscribe(data => callbackFn(data));
        this.classService.courseCreate(requestItem).subscribe(data => {
            this.showMessage('MESSAGE.DATA_SAVED', 'MESSAGE.NOTIFICATION');
            if (this.moveToView) {
                this.router.navigate(['/class/course/view/' + data]);
            } else {
                this.valueChange.emit(data);
            }
        });
    }
    protected callUpdateItem(requestItem: BaseEditableMdModel, callbackFn: Function): void{
        this.classService.courseUpdate(requestItem).subscribe(data => callbackFn(data));
    }

    onChangeProgram(event) {
        this.mainForm.controls['programId'].setValue(event[0]);
        this.mainForm.controls['programCode'].setValue(event[1]);
        this.mainForm.controls['programName'].setValue(event[2]);
    }

    onSaveAndView() {
        this.moveToView = true;
        this.onSave();
    }
}