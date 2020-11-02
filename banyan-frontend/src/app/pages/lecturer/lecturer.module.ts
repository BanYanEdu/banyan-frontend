import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { GridModule } from "inet-ui";
import { CommonService } from 'app/shared/services/common.service';
import { FocusService } from 'app/shared/services/focus.service';
import { LecturerHomeComponent } from './lecturer-home/lecturer-home.component';
import { LecturerRoutingModule } from './lecturer-routing.module';

@NgModule({
    imports: [
        CommonModule,
        // AppCommonModule,
        GridModule,
        ReactiveFormsModule,
        // ColorPickerModule,
        LecturerRoutingModule
    ],
    declarations: [
        LecturerHomeComponent,

    ],
    providers: [
        CommonService,
        FocusService
    ]
})
export class LecturerModule {
}