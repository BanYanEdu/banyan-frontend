import { Component, ElementRef, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { BaseAddDialogComponent } from "app/shared/components/BaseAddDialogComponent"
import { CommonService } from 'app/shared/services/common.service';
import { BaseEditableMdModel } from 'app/shared/models/BaseEditableMdModel';
import { ClassService } from '../class.service';
import { StudySubject } from 'app/model/settings/StudySubject';

@Component({
    selector: 'app-study-subject-assign',
    templateUrl: './study-subject-assign.component.html'
})
export class StudySubjectAssignComponent extends BaseAddDialogComponent<StudySubject>{
    @Input() uuid: string;
    @Input() items: any[];
    @Input() parentObject: string;
    
    finalItems: any[] = [];
    
    constructor(
        element: ElementRef,
        private classService: ClassService,
        protected commonService: CommonService,
    ) {
        super(element, commonService);
    }
    protected createMainFormGroup(): FormGroup {
        return new FormGroup({
            'nothing': new FormControl(null),
 
        });
    }

    protected patchInitializedMainForm(){

    }

    protected callSearch(input: {code:string}, callbackFn: Function): void{
        // this.classService.courseList(input).subscribe(data => callbackFn(data));
    }
    protected callAddItem(requestItem: BaseEditableMdModel, callbackFn: Function): void{    
        // this.classService.courseCreate(requestItem).subscribe(data => callbackFn(data));
        this.classService.courseCreate(requestItem).subscribe(data => {
            this.showMessage('MESSAGE.DATA_SAVED', 'MESSAGE.NOTIFICATION');
        });
    }
    protected callUpdateItem(requestItem: BaseEditableMdModel, callbackFn: Function): void{
        this.classService.courseUpdate(requestItem).subscribe(data => callbackFn(data));
    }

    onAddRow() {
        this.finalItems.push({studySubjectId: "", studySubjectCode: "", studySubjectName: ""});
    }
    onDeleteRow(i: number) {
        this.finalItems.splice(i, 1);
    }
    onUp(i: number) {
        let current = this.finalItems[i];
        this.finalItems[i] = this.finalItems[i - 1];
        this.finalItems[i - 1] = current;
    }
    onDown(i: number) {
        let current = this.finalItems[i];
        this.finalItems[i] = this.finalItems[i + 1];
        this.finalItems[i + 1] = current;
    }

    onChangeStudySubject(i: number, params: any) {
        this.finalItems[i].studySubjectId = params[0];
        this.finalItems[i].studySubjectCode = params[1];
        this.finalItems[i].studySubjectName = params[2];

        console.log(this.finalItems);
    }
}