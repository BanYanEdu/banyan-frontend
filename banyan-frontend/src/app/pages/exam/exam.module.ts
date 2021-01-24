import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { GridModule } from "inet-ui";
import { CommonService } from 'app/shared/services/common.service';
import { FocusService } from 'app/shared/services/focus.service';
import { AppCommonModule } from '../common/app-common.module';
// import { StudySubjectAssignComponent } from './study-subject-assign/study-subject-assign.component';
import { ExamRoutingModule } from './exam-routing.module';
import { ExaminationListComponent } from './examination/examination-list/examination-list.component';
import { ExaminationViewComponent } from './examination/examination-view/examination-view.component';
import { ExaminationExamListComponent } from './exam/examination-exam-list/examination-exam-list.component';
import { ExamAddComponent } from './exam/exam-add/exam-add.component';

@NgModule({
    imports: [
        CommonModule,
        AppCommonModule,
        GridModule,
        ReactiveFormsModule,
        ExamRoutingModule
    ],
    declarations: [
        ExaminationListComponent,
        ExaminationViewComponent,
        ExaminationExamListComponent,
        ExamAddComponent,
    ],
    providers: [
        CommonService,
        FocusService
    ]
})
export class ExamModule {
}