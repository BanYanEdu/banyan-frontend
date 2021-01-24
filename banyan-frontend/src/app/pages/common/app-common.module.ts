import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RatingModule } from 'ngx-bootstrap';

import {ComponentLoaderFactory, ModalModule, PositioningService} from 'ngx-bootstrap';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { InputCharacterMaskDirective } from '../../shared/directives/input-character-mask.directive';
// import { NumericSeparatorDirective } from '../../shared/directives/numeric-separator.directive';
import { NumericOnlyDirective } from '../../shared/directives/numeric-only.directive';
import {BsLocaleService} from 'ngx-bootstrap/datepicker';
import {CoreModule} from "inet-core";
import {AuthenticateGuard, CloudTranslateModule, InterceptorModule, GridModule, DialogModule} from 'inet-ui';
import {CustomTranslateLoader} from '../../i18n/custom-translate-loader';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import { MomentPipe } from "../../shared/pipes/moment.pipe";
// import { ReversePipe } from "../../shared/pipes/reverse/reverse.pipe";
import { BsModalService } from 'ngx-bootstrap/modal';
// import { TreeviewModule } from 'ngx-treeview';
// import { DropdownTreeviewSelectModule } from "./dropdownTreeviewSelect/dropdown-treeview-select.module"
import { CommonService } from 'app/shared/services/common.service';
import { FocusService } from 'app/shared/services/focus.service';
// import {NgxMaskModule} from 'ngx-mask';
import { RouterModule } from '@angular/router';
import { OutletSelectorComponent } from './outlet-selector/outlet-selector.component';
import { HourSelectorComponent } from './time-selector/hour-selector.component';
import { MinuteSelectorComponent } from './time-selector/minute-selector.component';
import { ProgramSelectorComponent } from './program-selector/program-selector.component';
import { StudySubjectSelectorComponent } from './study-subject-selector/study-subject-selector.component';
import { CourseSelectorComponent } from './course-selector/course-selector.component';
import { MatDividerModule,
         MatBadgeModule,
         MatCardModule, 
         MatCheckboxModule, 
         MatInputModule, 
         MatSelectModule,
         MatListModule,
         MatChipsModule,
         MatMenuModule,
         MatButtonModule,
         } from '@angular/material';
import { SourceSelectorComponent } from './source-selector/source-selector.component';
import { StudentSearchComponent } from './student-search/student-search.component';
import { StudentAddComponent } from '../student/student/student-add/student-add.component';
import { ClassSearchComponent } from '../class/class-search/class-search.component';
import { ClassTransferComponent } from '../class/class-transfer/class-transfer.component';
import { EmployeeSearchComponent } from '../employee/employee/employee-search/employee-search.component';
import { ExamSubjectSelectorComponent } from '../settings/exam-subject/exam-subject-selector/exam-subject-selector.component';
import { ClassEnrollmentListComponent } from '../class/class-enrollment/class-enrollment-list/class-enrollment-list.component';
import { ClassEnrollmentAddComponent } from '../class/class-enrollment/class-enrollment-add/class-enrollment-add.component';
import { ClassAssignmentListComponent } from '../class/class-assignment/class-assignment-list/class-assignment-list.component';
import { ClassAssignmentAddComponent } from '../class/class-assignment/class-assignment-add/class-assignment-add.component';
import { CommentListComponent } from './comment/comment-list/comment-list.component';
import { CommentAddComponent } from './comment/comment-add/comment-add.component';
import { ExaminationAddComponent } from '../exam/examination/examination-add/examination-add.component';

@NgModule({
    imports: [
        CloudTranslateModule.forRoot({
            loader: CustomTranslateLoader
        }),
        ModalModule.forRoot(),
        ButtonsModule.forRoot(),
        PopoverModule.forRoot(),
        TabsModule.forRoot(),
        BsDatepickerModule.forRoot(),
        RatingModule.forRoot(),
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        GridModule,
        CoreModule,
        DialogModule,
        RouterModule,
        MatBadgeModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatDividerModule,
        MatInputModule,
        MatSelectModule,
        MatListModule,
        MatMenuModule,
        MatChipsModule
    ],
    declarations: [ 
        MomentPipe,
        InputCharacterMaskDirective,
        NumericOnlyDirective,
        OutletSelectorComponent,
        ProgramSelectorComponent,
        ClassSearchComponent,
        ClassTransferComponent,
        ClassEnrollmentListComponent,
        ClassEnrollmentAddComponent,
        ClassAssignmentListComponent,
        ClassAssignmentAddComponent,
        CommentAddComponent,
        CommentListComponent,
        CourseSelectorComponent,
        EmployeeSearchComponent,
        ExamSubjectSelectorComponent,
        ExaminationAddComponent,
        HourSelectorComponent,
        MinuteSelectorComponent,
        SourceSelectorComponent,
        StudySubjectSelectorComponent,
        StudentSearchComponent,
        StudentAddComponent,
        
    ],
    exports: [
        BsDatepickerModule,
        CloudTranslateModule,
        CommonModule,
        CoreModule,
        FormsModule,
        HttpClientModule,
        InterceptorModule,
        MatBadgeModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatDividerModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatSelectModule,
        ModalModule,
        MomentPipe,
        ReactiveFormsModule,
        RouterModule,
        PopoverModule,
        TabsModule,
        InputCharacterMaskDirective,
        NumericOnlyDirective,
        DialogModule,
        ClassSearchComponent,
        ClassTransferComponent,
        ClassEnrollmentListComponent,
        ClassEnrollmentAddComponent,
        ClassAssignmentListComponent,
        ClassAssignmentAddComponent,
        CommentAddComponent,
        CommentListComponent,
        CourseSelectorComponent,
        EmployeeSearchComponent,
        ExamSubjectSelectorComponent,
        ExaminationAddComponent,
        HourSelectorComponent,
        MinuteSelectorComponent,
        OutletSelectorComponent,
        ProgramSelectorComponent,
        StudySubjectSelectorComponent,
        SourceSelectorComponent,
        StudentSearchComponent,
        StudentAddComponent,
        
    ],
    providers: [
        ComponentLoaderFactory,
        AuthenticateGuard,
        PositioningService,
        BsLocaleService,
        BsModalService,
        FocusService,
        CommonService
        // BsModalRef
    ]
})
export class AppCommonModule {
}
