import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LecturerHomeComponent } from './lecturer-home/lecturer-home.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: LecturerHomeComponent },
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LecturerRoutingModule {
}