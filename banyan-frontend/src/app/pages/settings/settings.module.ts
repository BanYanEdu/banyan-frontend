import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { GridModule } from "inet-ui";
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsHomeComponent } from './settings-home/settings-home.component';
import { OutletListComponent } from './outlet/outlet-list.component';
import { CommonService } from 'app/shared/services/common.service';
import { FocusService } from 'app/shared/services/focus.service';
import { OutletAddComponent } from './outlet/outlet-add.component';
import { ProgramListComponent } from './program/program-list.component';
import { ProgramAddComponent } from './program/program-add.component';
import { SourceListComponent } from './source/source-list.component';
import { SourceAddComponent } from './source/source-add.component';
import { StudySubjectListComponent } from './study-subject/study-subject-list.component';
import { StudySubjectAddComponent } from './study-subject/study-subject-add.component';
import { TestSubjectListComponent } from './test-subject/test-subject-list.component';
import { TestSubjectAddComponent } from './test-subject/test-subject-add.component';
import { SchedulePaternAddComponent } from './schedule-pattern/schedule-pattern-add.component';
import { SchedulePatternListComponent } from './schedule-pattern/schedule-pattern-list.component';
import { HolidayListComponent } from './holiday/holiday-list.component';
import { HolidayAddComponent } from './holiday/holiday-add.component';
import { AppCommonModule } from '../common/app-common.module';
import { FacilityListComponent } from './facility/facility-list.component';
import { FacilityAddComponent } from './facility/facility-add.component';

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
        OutletListComponent,
        OutletAddComponent,
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
        HolidayAddComponent

    ],
    providers: [
        CommonService,
        FocusService
    ]
})
export class SettingsModule {
}