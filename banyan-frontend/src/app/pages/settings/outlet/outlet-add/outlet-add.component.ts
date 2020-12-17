import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BaseAddDialogComponent } from "app/shared/components/BaseAddDialogComponent"
import { CommonService } from 'app/shared/services/common.service';
import { BaseEditableMdModel } from 'app/shared/models/BaseEditableMdModel';
import { Outlet } from 'app/model/settings/Outlet';
import { FormMode } from 'app/model/common/FormMode';
import { SettingsService } from '../../settings.service';

@Component({
    selector: 'app-outlet-add',
    templateUrl: './outlet-add.component.html'
})
export class OutletAddComponent extends BaseAddDialogComponent<Outlet>{
    @ViewChild("code") codeField: ElementRef;
    @ViewChild("name") nameField: ElementRef;
    numericNumberReg: string = '^-?[0-9]\\d*(\\.\\d{1,6})?$'

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
            'fullAddress': new FormControl(null),
            'phoneNo': new FormControl(null),
            'email': new FormControl(null, [Validators.email]),
            'workingTimes': new FormControl(null),
            'longitude': new FormControl(null, [Validators.pattern(this.numericNumberReg)]),
            'latitude': new FormControl(null, [Validators.pattern(this.numericNumberReg)]),
            'inactive': new FormControl(null)
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
        this.settingsService.outletList(input).subscribe(data => callbackFn(data));
    }
    protected callAddItem(requestItem: BaseEditableMdModel, callbackFn: Function): void{
        
        this.settingsService.outletCreate(requestItem).subscribe(data => callbackFn(data));
    }
    protected callUpdateItem(requestItem: BaseEditableMdModel, callbackFn: Function): void{
        this.settingsService.outletUpdate(requestItem).subscribe(data => callbackFn(data));
    }
}