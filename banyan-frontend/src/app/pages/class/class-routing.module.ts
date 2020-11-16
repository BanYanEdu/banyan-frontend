import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClassHomeComponent } from './class-home/class-home.component';
import { ClassListComponent } from './class/class-list.component';
import { CourseListComponent } from './course/course-list.component';
import { RegistrationListComponent } from './registration/registration-list.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: ClassHomeComponent },
    { path: 'class', component: ClassListComponent },
    { path: 'course', component: CourseListComponent },
    { path: 'registeration', component: RegistrationListComponent },
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClassRoutingModule {
}