import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { GridModule } from "inet-ui";
import { CommonService } from 'app/shared/services/common.service';
import { FocusService } from 'app/shared/services/focus.service';
import { StudentHomeComponent } from './student-home/student-home.component';
import { StudentRoutingModule } from './student-routing.module';

@NgModule({
    imports: [
        CommonModule,
        // AppCommonModule,
        GridModule,
        ReactiveFormsModule,
        // ColorPickerModule,
        StudentRoutingModule
    ],
    declarations: [
        StudentHomeComponent,

    ],
    providers: [
        CommonService,
        FocusService
    ]
})
export class StudentModule {
}