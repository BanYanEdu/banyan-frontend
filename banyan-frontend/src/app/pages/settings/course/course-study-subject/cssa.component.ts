import { Component, ElementRef, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { BaseAddDialogComponent } from "app/shared/components/BaseAddDialogComponent"
import { CommonService } from 'app/shared/services/common.service';
import { BaseEditableMdModel } from 'app/shared/models/BaseEditableMdModel';
import { NotificationType } from 'app/shared/models/NotificationType';
import { CourseStudySubject } from 'app/model/settings/CourseStudySubject';
import { SettingsService } from '../../settings.service';
import { BaseComponent } from 'app/shared/components/BaseComponent';
// import { EventEmitter } from 'keyv';

@Component({
    selector: 'app-course-study-subject-assign',
    templateUrl: './cssa.component.html'
})
export class CourseStudySubjectAssignComponent extends BaseComponent implements OnInit {
    @Input() inputItems: CourseStudySubject[];
    @Input() id: string;
    @Output() valueChange = new EventEmitter();

    mainForm: FormGroup;

    finalItems: CourseStudySubject[] = [];
    totalUnitCount: number = 0;

    constructor(
        element: ElementRef,
        private settingsService: SettingsService,
        protected commonService: CommonService,
    ) {  super(commonService)  }

    ngOnInit() {
        this.mainForm = new FormGroup({
            'nothing': new FormControl(null),
        });
        
        for (var i=0;i<this.inputItems.length;i++ ) {
            let x: CourseStudySubject = {};
            x.studySubjectId = this.inputItems[i].studySubjectId;
            x.unitCount = this.inputItems[i].unitCount;
            x.sortIndex = this.inputItems[i].sortIndex;
            // x = this.inputItems[i];
            this.finalItems.push(x);
        }
        this.updateTotalUnitCount();
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
            if (this.finalItems[i].studySubjectId == "" || this.finalItems[i].unitCount == 0) {
                this.showMessage('Thông tin nhập chưa đầy đủ.', 'Cảnh báo', NotificationType.ERROR);
                return;
            }
        }

        // Check duplication
        let valuesAlreadySeen = []
        let duplicated = false;
        for (let i = 0; i < this.finalItems.length; i++) {
            let value = this.finalItems[i].studySubjectId;
            if (valuesAlreadySeen.indexOf(value) !== -1) {
                duplicated = true;
                break;
            }
            valuesAlreadySeen.push(value)
        }
        if (duplicated) {
            this.showMessage('Dữ liệu bị trùng.', 'Cảnh báo', NotificationType.WARNING);
            return;
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
        // console.log("items:");
        // console.log(this.inputItems);
        // console.log("finalItems:");
        // console.log(this.finalItems);
    }
}