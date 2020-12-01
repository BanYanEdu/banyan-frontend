import { Component, ElementRef, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { SettingsService } from '../settings.service';
import { BaseAddDialogComponent } from "app/shared/components/BaseAddDialogComponent"
import { CommonService } from 'app/shared/services/common.service';
import { BaseEditableMdModel } from 'app/shared/models/BaseEditableMdModel';
import { FormMode } from 'app/model/common/FormMode';
import { ContactProfileConfig } from 'app/model/settings/ContactProfileConfig';

@Component({
    selector: 'app-contact-profile-config',
    templateUrl: './contact-profile-config.component.html'
})
export class ContactProfileConfigComponent extends BaseAddDialogComponent<ContactProfileConfig>{
    auto: boolean = false;
    lengthValues: any[] = [
        {value: 3},
        {value: 4},
        {value: 5},
        {value: 6},
        {value: 7},
        {value: 8},
        {value: 9},
        {value: 10}
    ];
    codeSample: string = "";

    constructor(
        element: ElementRef,
        private settingsService: SettingsService,
        protected commonService: CommonService
    ) {
        super(element, commonService);
        this.mode = FormMode.E_EDIT;
    }
    protected createMainFormGroup(): FormGroup {
        return new FormGroup({
            'codePrefix': new FormControl(null),
            'codeNumberLength': new FormControl(null),
            'codeNextNumber': new FormControl(null),
            'codeAutoGenerating': new FormControl(null)
        });
    }
    protected patchInitializedMainForm(){
        if (this.item.codeAutoGenerating) {
            this.auto = true;
        }

        if (this.item.codeNumberLength == undefined) {
            this.mainForm.get('codeNumberLength').setValue(this.lengthValues[0].value);
            this.mainForm.get('codeNextNumber').setValue(1);
        }

        this.refreshCodeSample();
    }

    protected callSearch(input: {code:string}, callbackFn: Function): void{
        // this.settingsService.studySubjectList(input).subscribe(data => callbackFn(data));
    }
    protected callAddItem(requestItem: BaseEditableMdModel, callbackFn: Function): void{        
        // this.settingsService.studySubjectCreate(requestItem).subscribe(data => callbackFn(data));
    }
    protected callUpdateItem(requestItem: BaseEditableMdModel, callbackFn: Function): void{
        this.settingsService.contactProfileConfigUpdate(requestItem).subscribe(data => callbackFn(data));
    }

    onChangeAuto() {
        this.auto = !this.auto;
        this.refreshCodeSample();
    }

    refreshCodeSample() {
        if (this.auto) {
            this.codeSample = "";
            if (this.mainForm.get('codePrefix').value) {
                this.codeSample = this.mainForm.get('codePrefix').value;
            }
            
            let codeNextNumber = Number(this.mainForm.get('codeNextNumber').value);
            let codeNumberLength = Number(this.mainForm.get('codeNumberLength').value);

            for (var i=0;i<codeNumberLength - codeNextNumber.toString().length;i++) {
                this.codeSample = this.codeSample + '0';
            }
            this.codeSample = this.codeSample + codeNextNumber;
        }    
    }
}