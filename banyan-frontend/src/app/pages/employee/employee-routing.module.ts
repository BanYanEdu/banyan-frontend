import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeHomeComponent } from './employee-home/employee-home.component';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { EmployeeViewComponent } from './employee/employee-view/employee-view.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: EmployeeHomeComponent },
    { path: 'employee', redirectTo: 'employee/list', pathMatch: 'full' },
    { path: 'employee/list', component: EmployeeListComponent },
    { path: 'employee/view/:id', component: EmployeeViewComponent },
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EmployeeRoutingModule {
}