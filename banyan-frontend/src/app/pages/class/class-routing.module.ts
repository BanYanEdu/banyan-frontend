import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClassHomeComponent } from './class-home/class-home.component';
import { ClassListComponent } from './class/class-list.component';
import { ClassViewComponent } from './class/class-view.component';
import { CourseListComponent } from './course/course-list.component';
import { CourseViewComponent } from './course/course-view.component';
import { RegistrationListComponent } from './registration/registration-list.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: ClassHomeComponent },
    { path: 'class', redirectTo: 'class/list', pathMatch: 'full' },
    { path: 'class/list', component: ClassListComponent },
    { path: 'class/view/:id', component: ClassViewComponent },
    { path: 'course', redirectTo: 'course/list', pathMatch: 'full' },
    { path: 'course/list', component: CourseListComponent },
    { path: 'course/view/:id', component: CourseViewComponent },
    { path: 'registeration', component: RegistrationListComponent },
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClassRoutingModule {
}