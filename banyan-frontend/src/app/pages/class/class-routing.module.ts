import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClassHomeComponent } from './class-home/class-home.component';
import { ClassListComponent } from './class-list/class-list.component';
import { ClassViewComponent } from './class-view/class-view.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: ClassHomeComponent },
    { path: 'class', redirectTo: 'class/list', pathMatch: 'full' },
    { path: 'class/list', component: ClassListComponent },
    { path: 'class/view/:id', component: ClassViewComponent },
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClassRoutingModule {
}