import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LecturerHomeComponent } from './lecturer-home/lecturer-home.component';
import { LecturerListComponent } from './lecturer/lecturer-list.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: LecturerHomeComponent },
    { path: 'lecturer', component: LecturerListComponent },
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LecturerRoutingModule {
}