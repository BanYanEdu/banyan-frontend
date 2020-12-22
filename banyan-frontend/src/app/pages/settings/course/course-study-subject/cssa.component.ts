import { Component, ElementRef, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { BaseAddDialogComponent } from "app/shared/components/BaseAddDialogComponent"
import { CommonService } from 'app/shared/services/common.service';
import { BaseEditableMdModel } from 'app/shared/models/BaseEditableMdModel';
import { NotificationType } from 'app/shared/models/NotificationType';
import { CourseStudySubject } from 'app/model/settings/CourseStudySubject';
import { SettingsService } from '../../settings.service';

@Component({
    selector: 'app-course-study-subject-assign',
    templateUrl: './cssa.component.html'
})
export class CourseStudySubjectAssignComponent extends BaseAddDialogComponent<CourseStudySubject>{
    @Input() items: any[];
    @Input() id: string;

    finalItems: any[] = [];
    totalUnitCount: number = 0;

    constructor(
        element: ElementRef,
        private settingsService: SettingsService,
        protected commonService: CommonService,
    ) {
        super(element, commonService);
    }
    protected createMainFormGroup(): FormGroup {
        return new FormGroup({
            'nothing': new FormControl(null),

        });
    }

    protected patchInitializedMainForm() {
        this.finalItems = this.items;
        // console.log(this.finalItems);
        this.updateTotalUnitCount();
    }

    protected callSearch(input: { code: string }, callbackFn: Function): void {
        // this.classService.courseList(input).subscribe(data => callbackFn(data));
    }
    protected callAddItem(requestItem: BaseEditableMdModel, callbackFn: Function): void {
        // this.classService.courseCreate(requestItem).subscribe(data => callbackFn(data));
    }
    protected callUpdateItem(requestItem: BaseEditableMdModel, callbackFn: Function): void {
        // this.classService.courseUpdate(requestItem).subscribe(data => callbackFn(data));
    }

    onAddRow() {
        this.finalItems.push(
            {
                studySubjectId: "",
                studySubjectCode: "",
                studySubjectName: "",
                unitCount: 0,
                remark: ""
            });
    }
    onDeleteRow(i: number) {
        this.finalItems.splice(i, 1);
        this.updateTotalUnitCount();
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
    }

    startSave() {
        // Checking empty data
        if (this.finalItems.length == 0) {
            this.showMessage('Không có dữ liệu.', 'Cảnh báo', NotificationType.ERROR);
            return;
        }

        for (let i = 0; i < this.finalItems.length; i++) {
            this.finalItems[i].sortIndex = i;
            if (this.finalItems[i].studySubjectId == "" || this.finalItems[i].unitCount == "" || this.finalItems[i].unitCount == 0) {
                this.showMessage('Thông tin nhập chưa đầy đủ.', 'Cảnh báo', NotificationType.ERROR);
                return;
            }
        }

        this.customizedSave();
    }

    customizedSave() {
        this.settingsService.courseStudySubjectUpdate(this.id, JSON.stringify(this.finalItems)).subscribe(
            data => {
                this.showMessage('MESSAGE.DATA_SAVED', 'MESSAGE.NOTIFICATION');
                this.valueChange.emit(data);
            }
        );
    }

    updateTotalUnitCount() {
        this.totalUnitCount = this.finalItems.reduce((sum, curr) => sum + Number(curr.unitCount), 0);
    }
    onChangeUnitCount() {
        this.updateTotalUnitCount();
    }

}