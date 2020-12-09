import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { GridModule } from "inet-ui";
import { CommonService } from 'app/shared/services/common.service';
import { FocusService } from 'app/shared/services/focus.service';
import { StudentHomeComponent } from './student-home/student-home.component';
import { StudentRoutingModule } from './student-routing.module';
import { LeadListComponent } from './lead/lead-list.component';
import { LeadAddComponent } from './lead/lead-add.component';
import { StudentAddComponent } from './student/student-add.component';
import { StudentListComponent } from './student/student-list.component';
import { CompanyListComponent } from './company/company-list.component';
import { CompanyAddComponent } from './company/company-add.component';
import { StudentViewComponent } from './student/student-view.component';
import { AppCommonModule } from '../common/app-common.module';

@NgModule({
    imports: [
        CommonModule,
        AppCommonModule,
        GridModule,
        ReactiveFormsModule,
        // ColorPickerModule,
        StudentRoutingModule
    ],
    declarations: [
        StudentHomeComponent,
        LeadListComponent,
        LeadAddComponent,
        StudentListComponent,
        StudentAddComponent,
        StudentViewComponent,
        CompanyListComponent,
        CompanyAddComponent

    ],
    providers: [
        CommonService,
        FocusService
    ]
})
export class StudentModule {
}