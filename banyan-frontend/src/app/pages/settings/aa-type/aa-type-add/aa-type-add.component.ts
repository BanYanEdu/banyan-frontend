import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BaseAddDialogComponent } from "app/shared/components/BaseAddDialogComponent"
import { CommonService } from 'app/shared/services/common.service';
import { BaseEditableMdModel } from 'app/shared/models/BaseEditableMdModel';
import { Program } from 'app/model/settings/Program';
import { FormMode } from 'app/model/common/FormMode';
import { SettingsService } from '../../settings.service';

@Component({
    selector: 'app-aa-type-add',
    templateUrl: './aa-type-add.component.html'
})
export class AATypeAddComponent extends BaseAddDialogComponent<Program>{
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
            'symbol': new FormControl(null, [Validators.required]),
            'defaultValue': new FormControl(null, [Validators.required]),
            'forEmployee': new FormControl(null),
            'forContact': new FormControl(null),
            'sortIndex': new FormControl(null, [Validators.required]),
            'remark': new FormControl(null),
            'inactive': new FormControl(null)
        });
    }
    patchInitializedMainForm() {
        if (this.mode == FormMode.E_ADD) {
            this.codeField.nativeElement.focus();
            this.mainForm.get('defaultValue').setValue(1);
        } else {
            this.nameField.nativeElement.focus();
        }
    }
    protected callSearch(input: {code:string}, callbackFn: Function): void{
        this.settingsService.aaTypeList(input).subscribe(data => callbackFn(data));
    }
    protected callAddItem(requestItem: BaseEditableMdModel, callbackFn: Function): void{
        // console.log(requestItem);        
        this.settingsService.aaTypeCreate(requestItem).subscribe(data => callbackFn(data));
    }
    protected callUpdateItem(requestItem: BaseEditableMdModel, callbackFn: Function): void{
        this.settingsService.aaTypeUpdate(requestItem).subscribe(data => callbackFn(data));
    }
}