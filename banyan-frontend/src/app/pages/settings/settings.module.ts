import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { GridModule } from "inet-ui";
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsHomeComponent } from './settings-home/settings-home.component';
import { CommonService } from 'app/shared/services/common.service';
import { FocusService } from 'app/shared/services/focus.service';
import { SourceListComponent } from './source/source-list/source-list.component';
import { SourceAddComponent } from './source/source-add/source-add.component';
import { StudySubjectListComponent } from './study-subject/study-subject-list/study-subject-list.component';
import { StudySubjectAddComponent } from './study-subject/study-subject-add/study-subject-add.component';
import { TestSubjectListComponent } from './test-subject/test-subject-list/test-subject-list.component';
import { TestSubjectAddComponent } from './test-subject/test-subject-add/test-subject-add.component';
import { HolidayListComponent } from './holiday/holiday-list.component';
import { HolidayAddComponent } from './holiday/holiday-add.component';
import { AppCommonModule } from '../common/app-common.module';
import { FacilityListComponent } from './facility/facility-list/facility-list.component';
import { FacilityAddComponent } from './facility/facility-add/facility-add.component';
import { SystemConfigViewComponent } from './system-config/system-config-view.component';
import { EmployeeProfileConfigComponent } from './system-config/employee-profile-config.component';
import { ContactProfileConfigComponent } from './system-config/contact-profile-config.component';
import { OutletAddComponent } from './outlet/outlet-add/outlet-add.component';
import { OutletListComponent } from './outlet/outlet-list/outlet-list.component';
import { ProgramListComponent } from './program/program-list/program-list.component';
import { ProgramAddComponent } from './program/program-add/program-add.component';
import { SchedulePatternListComponent } from './schedule-pattern/schedule-pattern-list/schedule-pattern-list.component';
import { SchedulePaternAddComponent } from './schedule-pattern/schedule-pattern-add/schedule-pattern-add.component';

@NgModule({
    imports: [
        CommonModule,
        AppCommonModule,
        GridModule,
        ReactiveFormsModule,
        // ColorPickerModule,
        SettingsRoutingModule
    ],
    declarations: [
        SettingsHomeComponent,
        OutletAddComponent,
        OutletListComponent,
        SourceListComponent,
        SourceAddComponent,
        ProgramListComponent,
        ProgramAddComponent,
        StudySubjectListComponent,
        StudySubjectAddComponent,
        TestSubjectListComponent,
        TestSubjectAddComponent,
        SchedulePatternListComponent,
        SchedulePaternAddComponent,
        FacilityListComponent,
        FacilityAddComponent,
        HolidayListComponent,
        HolidayAddComponent,
        SystemConfigViewComponent,
        EmployeeProfileConfigComponent,
        ContactProfileConfigComponent
    ],
    providers: [
        CommonService,
        FocusService
    ]
})
export class SettingsModule {
}