import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClassHomeComponent } from './class-home/class-home.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: ClassHomeComponent },
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClassRoutingModule {
}