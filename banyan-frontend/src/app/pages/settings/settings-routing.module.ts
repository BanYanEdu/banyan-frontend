import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FacilityListComponent } from './facility/facility-list.component';
import { HolidayListComponent } from './holiday/holiday-list.component';
import { OutletListComponent } from './outlet/outlet-list.component';
import { ProgramListComponent } from './program/program-list.component';
import { SchedulePatternListComponent } from './schedule-pattern/schedule-pattern-list.component';
import { SettingsHomeComponent } from './settings-home/settings-home.component';
import { SourceListComponent } from './source/source-list.component';
import { StudySubjectListComponent } from './study-subject/study-subject-list.component';
import { SystemConfigViewComponent } from './system-config/system-config-view.component';
import { TestSubjectListComponent } from './test-subject/test-subject-list.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: SettingsHomeComponent },
    { path: 'outlet', component: OutletListComponent },
    { path: 'source', component: SourceListComponent },
    { path: 'program', component: ProgramListComponent },
    { path: 'study-subject', component: StudySubjectListComponent },
    { path: 'test-subject', component: TestSubjectListComponent },
    { path: 'schedule-pattern', component: SchedulePatternListComponent },
    { path: 'holiday', component: HolidayListComponent },
    { path: 'facility', component: FacilityListComponent },
    { path: 'system-config', component: SystemConfigViewComponent },
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SettingsRoutingModule {
}