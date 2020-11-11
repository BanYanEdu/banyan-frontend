import { Component, ElementRef, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { SettingsService } from '../settings.service';
import { BaseAddDialogComponent } from "app/shared/components/BaseAddDialogComponent"
import { CommonService } from 'app/shared/services/common.service';
import { BaseEditableMdModel } from 'app/shared/models/BaseEditableMdModel';
import { Program } from 'app/model/settings/Program';

@Component({
    selector: 'app-program-add',
    templateUrl: './program-add.component.html'
})
export class ProgramAddComponent extends BaseAddDialogComponent<Program>{
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
    protected callSearch(input: {code:string}, callbackFn: Function): void{
        // this.settingsService.listCurrency(input).subscribe(data => callbackFn(data));
    }
    protected callAddItem(requestItem: BaseEditableMdModel, callbackFn: Function): void{
        // var outlet: Outlet = new Outlet();
        // lookupCode = requestItem;
        // lookupCode.category = this.category;
        console.log(requestItem);
        
        // this.settingsService.addCurrency(requestItem).subscribe(data => callbackFn(data));
    }
    protected callUpdateItem(requestItem: BaseEditableMdModel, callbackFn: Function): void{
        // this.settingsService.updateCurrency(requestItem).subscribe(data => callbackFn(data));
    }
}