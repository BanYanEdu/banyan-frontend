import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { SettingsService } from '../settings.service';
import { BaseAddDialogComponent } from "app/shared/components/BaseAddDialogComponent"
import { CommonService } from 'app/shared/services/common.service';
import { BaseEditableMdModel } from 'app/shared/models/BaseEditableMdModel';
import { Source } from 'app/model/settings/Source';
import { FormMode } from 'app/model/common/FormMode';

@Component({
    selector: 'app-source-add',
    templateUrl: './source-add.component.html'
})
export class SourceAddComponent extends BaseAddDialogComponent<Source>{
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
        this.settingsService.sourceList(input).subscribe(data => callbackFn(data));
    }
    protected callAddItem(requestItem: BaseEditableMdModel, callbackFn: Function): void{
        // var outlet: Outlet = new Outlet();
        // lookupCode = requestItem;
        
        this.settingsService.sourceCreate(requestItem).subscribe(data => callbackFn(data));
    }
    protected callUpdateItem(requestItem: BaseEditableMdModel, callbackFn: Function): void{
        this.settingsService.sourceUpdate(requestItem).subscribe(data => callbackFn(data));
    }
}