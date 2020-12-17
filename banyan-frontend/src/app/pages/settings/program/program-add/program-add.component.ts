import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BaseAddDialogComponent } from "app/shared/components/BaseAddDialogComponent"
import { CommonService } from 'app/shared/services/common.service';
import { BaseEditableMdModel } from 'app/shared/models/BaseEditableMdModel';
import { Program } from 'app/model/settings/Program';
import { FormMode } from 'app/model/common/FormMode';
import { SettingsService } from '../../settings.service';

@Component({
    selector: 'app-program-add',
    templateUrl: './program-add.component.html'
})
export class ProgramAddComponent extends BaseAddDialogComponent<Program>{
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
        this.settingsService.programList(input).subscribe(data => callbackFn(data));
    }
    protected callAddItem(requestItem: BaseEditableMdModel, callbackFn: Function): void{
        // console.log(requestItem);        
        this.settingsService.programCreate(requestItem).subscribe(data => callbackFn(data));
    }
    protected callUpdateItem(requestItem: BaseEditableMdModel, callbackFn: Function): void{
        this.settingsService.programUpdate(requestItem).subscribe(data => callbackFn(data));
    }
}