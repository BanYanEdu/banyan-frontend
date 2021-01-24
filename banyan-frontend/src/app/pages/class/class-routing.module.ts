import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClassAttendanceSummaryComponent } from './class-attendance/class-attendance-summary.component';
import { ClassHomeComponent } from './class-home/class-home.component';
import { ClassListComponent } from './class-list/class-list.component';
import { ClassMultipleScheduleComponent } from './class-schedule/class-multiple-schedule/class-multiple-schedule.component';
import { ClassSingleScheduleComponent } from './class-schedule/class-single-schedule/class-single-schedule.component';
import { ClassViewComponent } from './class-view/class-view.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: ClassHomeComponent },
    { path: 'class', redirectTo: 'class/list', pathMatch: 'full' },
    { path: 'class/list', component: ClassListComponent },
    { path: 'class/view/:id', component: ClassViewComponent },
    { path: 'class/single-schedule/:id', component: ClassSingleScheduleComponent },
    { path: 'class/multiple-schedule', component: ClassMultipleScheduleComponent },
    { path: 'class/attendance-summary/:id', component: ClassAttendanceSummaryComponent },
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClassRoutingModule {
}