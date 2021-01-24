import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { GridModule } from "inet-ui";
import { CommonService } from 'app/shared/services/common.service';
import { FocusService } from 'app/shared/services/focus.service';
import { ClassRoutingModule } from './class-routing.module';
import { ClassHomeComponent } from './class-home/class-home.component';
import { ClassListComponent } from './class-list/class-list.component';
import { ClassAddComponent } from './class-add/class-add.component';
import { AppCommonModule } from '../common/app-common.module';
// import { StudySubjectAssignComponent } from './study-subject-assign/study-subject-assign.component';
import { FacilitySelectorComponent } from '../settings/facility/facility-selector/facility-selector.component';
import { ClassViewComponent } from './class-view/class-view.component';
import { SchedulePatternSelectorComponent } from '../settings/schedule-pattern/schedule-pattern-selector/schedule-pattern-selector.component';
import { ClassStudySubjectListComponent } from './class-study-subject/class-study-subject-list/class-study-subject-list.component';
import { ClassStudySubjectAddComponent } from './class-study-subject/class-study-subject-add/class-study-subject-add.component';
import { ClassAssignmentViewComponent } from './class-assignment/class-assignment-view/class-assignment-view.component';
import { ClassExaminationListComponent } from './class-examination/class-examination-list/class-examination-list.component';
import { ClassUnitListComponent } from './class-unit/class-unit-list/class-unit-list.component';
import { ClassSingleScheduleComponent } from './class-schedule/class-single-schedule/class-single-schedule.component';
import { ClassUnitEmbedViewComponent } from './class-schedule/class-unit-embed-view/class-unit-embed-view.component';
import { ClassUnitAddComponent } from './class-unit/class-unit-add/class-unit-add.component';
import { ClassAttendanceSummaryComponent } from './class-attendance/class-attendance-summary.component';
import { ClassMultipleScheduleComponent } from './class-schedule/class-multiple-schedule/class-multiple-schedule.component';

@NgModule({
    imports: [
        CommonModule,
        AppCommonModule,
        GridModule,
        ReactiveFormsModule,
        ClassRoutingModule,
    ],
    declarations: [
        ClassHomeComponent,
        ClassListComponent,
        ClassAddComponent,
        ClassViewComponent,
        ClassAssignmentViewComponent,
        ClassStudySubjectListComponent,
        ClassStudySubjectAddComponent,
        SchedulePatternSelectorComponent,
        FacilitySelectorComponent,
        ClassExaminationListComponent,
        ClassUnitListComponent,
        ClassSingleScheduleComponent,
        ClassUnitEmbedViewComponent,
        ClassUnitAddComponent,
        ClassAttendanceSummaryComponent,
        ClassMultipleScheduleComponent
        
    ],
    providers: [
        CommonService,
        FocusService
    ]
})
export class ClassModule {
}