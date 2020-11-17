import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { SettingsService } from '../settings.service';
import { BaseAddDialogComponent } from "app/shared/components/BaseAddDialogComponent"
import { CommonService } from 'app/shared/services/common.service';
import { BaseEditableMdModel } from 'app/shared/models/BaseEditableMdModel';
import { TestSubject } from 'app/model/settings/TestSubject';
import { FormMode } from 'app/model/common/FormMode';
import { TestSubjectLevel } from 'app/model/settings/TestSubjectLevel';
import { NotificationType } from 'app/shared/models/NotificationType';

@Component({
    selector: 'app-test-subject-add',
    templateUrl: './test-subject-add.component.html'
})
export class TestSubjectAddComponent extends BaseAddDialogComponent<TestSubject>{
    evaTypes: any[] = [
        {value: 'E_SCORES'},
        {value: 'E_LEVEL'}
    ];
    decimalsValues: any[] = [
        {value: 0},
        {value: 1},
        {value: 2}
    ];
    evaType: string = 'E_SCORES';
    levels: TestSubjectLevel[] = [];

    constructor(
        element: ElementRef,
        private settingsService: SettingsService,
        protected commonService: CommonService
    ) {
        super(element, commonService);
    }

    protected createMainFormGroup(): FormGroup {
        return new FormGroup({
            'code': new FormControl(null, [Validators.required]),
            'name': new FormControl(null, [Validators.required]),
            'sortIndex': new FormControl(null, [Validators.required]),
            'evaluationType': new FormControl(null, [Validators.required]),
            'inactive': new FormControl(null),
            'maxScores': new FormControl(null),
            'decimals': new FormControl(null)
        });
    }

    protected patchInitializedMainForm() {
        if (this.mode === FormMode.E_ADD) {
            this.mainForm.get('decimals').setValue(this.decimalsValues[0].value);
            this.mainForm.get('evaluationType').setValue(this.evaTypes[0].value);
            this.mainForm.get('maxScores').setValue(0);
        } else {
                this.evaType = this.mainForm.get('evaluationType').value;
        }

        if (this.requestItem.evaluationType == "E_LEVEL") {
            this.levels = this.requestItem.levels;
        }
    };

    populateAdditionalFormValue() {
        if (this.evaType == "E_LEVEL") {
            this.requestItem.levelsStr = JSON.stringify(this.levels);
        }
    }

    startSave() {
        let ok = true;
        for (let i = 0; i < this.levels.length; i++) {
           this.levels[i].sortIndex = i;
           if (this.levels[i].description == "" || this.levels[i].code == "") {
                ok = false;
                break;
           }
        }
        if (!ok) {
            this.showMessage('Thông tin nhập chưa đầy đủ', 'Cảnh báo', NotificationType.ERROR);
            return;
        }
        this.onSave();
    }

    protected callSearch(input: {code:string}, callbackFn: Function): void{
        this.settingsService.testSubjectList(input).subscribe(data => callbackFn(data));
    }
    protected callAddItem(requestItem: BaseEditableMdModel, callbackFn: Function): void{
        
        this.settingsService.testSubjectCreate(requestItem).subscribe(data => callbackFn(data));
    }
    protected callUpdateItem(requestItem: BaseEditableMdModel, callbackFn: Function): void{
        console.log(requestItem);

        this.settingsService.testSubjectUpdate(requestItem).subscribe(data => callbackFn(data));
    }

    changeEvaType() {
        this.evaType = this.mainForm.get('evaluationType').value;
        if (this.evaType == "E_LEVEL") {
            if (this.levels.length == 0) {
                this.onAddRow();
            }
        }
    }

    onAddRow() {
        // console.log(i);
        this.levels.push({});
    }
    onDeleteRow(i: number) {
        this.levels.splice(i, 1);
    }
    onUp(i: number) {
        let current = this.levels[i];
        this.levels[i] = this.levels[i - 1];
        this.levels[i - 1] = current;
    }
    onDown(i: number) {
        let current = this.levels[i];
        this.levels[i] = this.levels[i + 1];
        this.levels[i + 1] = current;
    }
}