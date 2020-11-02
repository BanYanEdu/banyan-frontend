import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ComingMessageComponent } from './pages/system/coming.message';

const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'coming', component: ComingMessageComponent},
    {path: 'student', loadChildren: './pages/student/student.module#StudentModule'},
    {path: 'class', loadChildren: './pages/class/class.module#ClassModule'},
    {path: 'lecturer', loadChildren: './pages/lecturer/lecturer.module#LecturerModule'},
    {path: 'settings', loadChildren: './pages/settings/settings.module#SettingsModule'},
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
