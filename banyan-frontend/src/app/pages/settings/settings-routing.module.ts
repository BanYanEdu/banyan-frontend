import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseListComponent } from './course/course-list/course-list.component';
import { CourseViewComponent } from './course/course-view/course-view.component';
import { FacilityListComponent } from './facility/facility-list/facility-list.component';
import { HolidayListComponent } from './holiday/holiday-list.component';
import { OutletListComponent } from './outlet/outlet-list/outlet-list.component';
import { ProgramListComponent } from './program/program-list/program-list.component';
import { SchedulePatternListComponent } from './schedule-pattern/schedule-pattern-list/schedule-pattern-list.component';
import { SettingsHomeComponent } from './settings-home/settings-home.component';
import { SourceListComponent } from './source/source-list/source-list.component';
import { StudySubjectListComponent } from './study-subject/study-subject-list/study-subject-list.component';
import { SystemConfigViewComponent } from './system-config/system-config-view.component';
import { TestSubjectListComponent } from './test-subject/test-subject-list/test-subject-list.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: SettingsHomeComponent },
    { path: 'outlet/list', component: OutletListComponent },
    { path: 'source/list', component: SourceListComponent },
    { path: 'program/list', component: ProgramListComponent },
    { path: 'course/list', component: CourseListComponent },
    { path: 'course/view/:id', component: CourseViewComponent },
    { path: 'study-subject/list', component: StudySubjectListComponent },
    { path: 'test-subject/list', component: TestSubjectListComponent },
    { path: 'schedule-pattern/list', component: SchedulePatternListComponent },
    { path: 'holiday', component: HolidayListComponent },
    { path: 'facility/list', component: FacilityListComponent },
    { path: 'system-config', component: SystemConfigViewComponent },
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SettingsRoutingModule {
}