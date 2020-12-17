import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { SettingsService } from '../../settings.service';
import { BaseAddDialogComponent } from "app/shared/components/BaseAddDialogComponent"
import { CommonService } from 'app/shared/services/common.service';
import { BaseEditableMdModel } from 'app/shared/models/BaseEditableMdModel';
import { Facility } from 'app/model/settings/Facility';
import { NotificationType } from 'app/shared/models/NotificationType';
import { FormMode } from 'app/model/common/FormMode';

@Component({
    selector: 'app-facility-add',
    templateUrl: './facility-add.component.html'
})
export class FacilityAddComponent extends BaseAddDialogComponent<Facility>{
    @ViewChild("code") codeField: ElementRef;
    @ViewChild("name") nameField: ElementRef;

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
            'inactive': new FormControl(null),
            'facilityNo': new FormControl(null, [Validators.required]),
            'seatCount': new FormControl(null, [Validators.required]),
            'outletId': new FormControl(null, [Validators.required]),
            'outletCode': new FormControl(null),
            'outletName': new FormControl(null),
            
        });
    }
    patchInitializedMainForm() {
        if (this.mode == FormMode.E_ADD) {
            this.codeField.nativeElement.focus();
        } else {
            this.nameField.nativeElement.focus();
        }
    }
    protected callSearch(input: {code:string}, callbackFn: Function): void{
        this.settingsService.facilityList(input).subscribe(data => callbackFn(data));
    }
    protected callAddItem(requestItem: BaseEditableMdModel, callbackFn: Function): void{
        this.settingsService.facilityCreate(requestItem).subscribe(data => callbackFn(data));
    }
    protected callUpdateItem(requestItem: BaseEditableMdModel, callbackFn: Function): void{
        this.settingsService.facilityUpdate(requestItem).subscribe(data => callbackFn(data));
    }

    onChangeOutlet(event) {
        this.mainForm.controls['outletId'].setValue(event[0]);
        this.mainForm.controls['outletCode'].setValue(event[1]);
        this.mainForm.controls['outletName'].setValue(event[2]);
    }

    startSave() {
        if (this.mainForm.controls['outletId'].value == "") {
            this.showMessage('Chưa chọn chi nhánh.', 'Cảnh báo', NotificationType.ERROR);
            return;
        }

        this.onSave();
    }
}