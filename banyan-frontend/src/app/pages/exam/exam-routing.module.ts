import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExaminationListComponent } from './examination/examination-list/examination-list.component';
import { ExaminationViewComponent } from './examination/examination-view/examination-view.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    // { path: 'home', component: ClassHomeComponent },
    // { path: 'class', redirectTo: 'class/list', pathMatch: 'full' },
    { path: 'examination/list', component: ExaminationListComponent },
    { path: 'examination/view/:id', component: ExaminationViewComponent },
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ExamRoutingModule {
}