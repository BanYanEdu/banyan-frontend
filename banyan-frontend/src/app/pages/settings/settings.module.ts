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
import { ExamSubjectListComponent } from './exam-subject/exam-subject-list/exam-subject-list.component';
import { ExamSubjectAddComponent } from './exam-subject/exam-subject-add/exam-subject-add.component';
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
import { CourseListComponent } from './course/course-list/course-list.component';
import { CourseAddComponent } from './course/course-add/course-add.component';
import { CourseViewComponent } from './course/course-view/course-view.component';
import { CourseExaminationListComponent } from './course/course-examination/course-examination-list.component';
import { CourseStudySubjectListComponent } from './course/course-study-subject/course-study-subject-list.component';
import { CourseStudySubjectAssignComponent } from './course/course-study-subject/cssa.component';
import { CourseExaminationAddComponent } from './course/course-examination/course-examination-add.component';
import { AATypeListComponent } from './aa-type/aa-type-list/aa-type-list.component';
import { AATypeAddComponent } from './aa-type/aa-type-add/aa-type-add.component';

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
        AATypeListComponent,
        AATypeAddComponent,
        CourseListComponent,
        CourseAddComponent,
        CourseViewComponent,
        OutletAddComponent,
        OutletListComponent,
        ProgramListComponent,
        ProgramAddComponent,
        SettingsHomeComponent,
        SourceListComponent,
        SourceAddComponent,
        StudySubjectListComponent,
        StudySubjectAddComponent,
        ExamSubjectListComponent,
        ExamSubjectAddComponent,
        SchedulePatternListComponent,
        SchedulePaternAddComponent,
        FacilityListComponent,
        FacilityAddComponent,
        HolidayListComponent,
        HolidayAddComponent,
        SystemConfigViewComponent,
        EmployeeProfileConfigComponent,
        ContactProfileConfigComponent,
        CourseStudySubjectAssignComponent,
        CourseExaminationListComponent,
        CourseExaminationAddComponent,
        CourseStudySubjectListComponent,
    ],
    providers: [
        CommonService,
        FocusService
    ]
})
export class SettingsModule {
}