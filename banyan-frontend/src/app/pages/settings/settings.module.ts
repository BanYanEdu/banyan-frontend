import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { GridModule } from "inet-ui";
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsHomeComponent } from './settings-home/settings-home.component';
import { OutletListComponent } from './outlet/outlet-list.component';
import { CommonService } from 'app/shared/services/common.service';
import { FocusService } from 'app/shared/services/focus.service';

@NgModule({
    imports: [
        CommonModule,
        // AppCommonModule,
        GridModule,
        ReactiveFormsModule,
        // ColorPickerModule,
        SettingsRoutingModule
    ],
    declarations: [
        SettingsHomeComponent,
        OutletListComponent

    ],
    providers: [
        CommonService,
        FocusService
    ]
})
export class SettingsModule {
}