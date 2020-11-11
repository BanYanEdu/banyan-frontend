import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { GridModule } from "inet-ui";
import { CommonService } from 'app/shared/services/common.service';
import { FocusService } from 'app/shared/services/focus.service';
import { LecturerHomeComponent } from './lecturer-home/lecturer-home.component';
import { LecturerRoutingModule } from './lecturer-routing.module';
import { LecturerListComponent } from './lecturer/lecturer-list.component';
import { LecturerAddComponent } from './lecturer/lecturer-add.component';

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
        LecturerListComponent,
        LecturerAddComponent

    ],
    providers: [
        CommonService,
        FocusService
    ]
})
export class LecturerModule {
}