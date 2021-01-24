import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { SettingsService } from '../settings.service';
import { BaseAddDialogComponent } from "app/shared/components/BaseAddDialogComponent"
import { CommonService } from 'app/shared/services/common.service';
import { BaseEditableMdModel } from 'app/shared/models/BaseEditableMdModel';
import { Holiday } from 'app/model/settings/Holiday';
import { FormMode } from 'app/model/common/FormMode';
import { HolidayTypes } from 'app/data/global/HolidayTypes';

@Component({
    selector: 'app-holiday-add',
    templateUrl: './holiday-add.component.html'
})
export class HolidayAddComponent extends BaseAddDialogComponent<Holiday>{
    @Input() year: number;
    @ViewChild("date") dateField: ElementRef;
    types: any[] = HolidayTypes;
    minDate: any;
    maxDate: any;

    constructor(
        element: ElementRef,
        private settingsService: SettingsService,
        protected commonService: CommonService
    ) {
        super(element, commonService);
    }
    protected createMainFormGroup(): FormGroup {
        return new FormGroup({
            'date': new FormControl(null, [Validators.required]),
            'type': new FormControl(null, [Validators.required]),
            'remark': new FormControl(null, [Validators.required]),
            'year': new FormControl(null, [Validators.required]),

        });
    }
    patchInitializedMainForm() {
        this.mainForm.get('type').setValue(this.types[0]);
        this.mainForm.get('year').setValue(this.year);
        if (this.mode === FormMode.E_EDIT) {
            this.mainForm.controls['date'].setValue(new Date(this.item.date));
        }

        this.dateField.nativeElement.focus();

        this.minDate = new Date(this.year, 0, 1);;
        this.maxDate = new Date(this.year, 11, 31);
    }
    populateAdditionalFormValue() {
        let date = new Date(this.mainForm.controls['date'].value.getTime());
        date.setHours(0,0,0,0);

        this.requestItem.date = date.getTime();
        this.requestItem.organId = iNet.organId;
    }

    protected callSearch(input: { code: string }, callbackFn: Function): void {
        this.settingsService.holidayList(input).subscribe(data => callbackFn(data));
    }
    protected callAddItem(requestItem: BaseEditableMdModel, callbackFn: Function): void {
        // console.log(requestItem);

        this.settingsService.holidayCreate(requestItem).subscribe(data => callbackFn(data));
    }
    protected callUpdateItem(requestItem: BaseEditableMdModel, callbackFn: Function): void {
        this.settingsService.holidayUpdate(requestItem).subscribe(data => callbackFn(data));
    }

    startSave() {
        // Check validity of date (within this year)

        // Save
        this.onSave();
    }
}