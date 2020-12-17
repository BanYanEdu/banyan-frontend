import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyListComponent } from './company/company-list.component';
import { LeadListComponent } from './lead/lead-list.component';
import { StudentHomeComponent } from './student-home/student-home.component';
import { StudentListComponent } from './student/student-list/student-list.component';
import { StudentViewComponent } from './student/student-view/student-view.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: StudentHomeComponent },
    { path: 'lead/list', component: LeadListComponent },
    { path: 'student', redirectTo: 'student/list', pathMatch: 'full' },
    { path: 'student/list', component: StudentListComponent },
    { path: 'company/list', component: CompanyListComponent },
    { path: 'student/view/:id', component: StudentViewComponent }
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StudentRoutingModule {
}