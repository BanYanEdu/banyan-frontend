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
import { MatCheckboxModule, MatInputModule, MatSelectModule } from '@angular/material';
import { SourceSelectorComponent } from './source-selector/source-selector.component';
import { StudentSearchComponent } from './student-search/student-search.component';
import { StudentAddComponent } from '../student/student/student-add/student-add.component';
import { ClassSearchComponent } from '../class/class/class-search/class-search.component';
import { ClassTransferComponent } from '../class/class/class-transfer/class-transfer.component';
import { ClassEnrollmentComponent } from '../class/class/class-enrollment/class-enrollment.component';
import { ClassEnrollComponent } from '../class/class/class-enroll/class-enroll.component';



@NgModule({
    imports: [
        // NgxMaskModule.forRoot(),
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
        // TreeviewModule.forRoot(),
        // DropdownTreeviewSelectModule,
        DialogModule,
        RouterModule,
        MatInputModule,
        MatCheckboxModule,
        MatSelectModule
    ],
    declarations: [ 
        MomentPipe,
        // ReversePipe,
        InputCharacterMaskDirective,
        // NumericSeparatorDirective,
        NumericOnlyDirective,
        OutletSelectorComponent,
        ProgramSelectorComponent,
        CourseSelectorComponent,
        StudySubjectSelectorComponent,
        HourSelectorComponent,
        MinuteSelectorComponent,
        SourceSelectorComponent,
        StudentSearchComponent,
        StudentAddComponent,
        ClassSearchComponent,
        ClassTransferComponent,
        ClassEnrollmentComponent,
        ClassEnrollComponent
    ],
    exports: [
        // NgxMaskModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        CoreModule,
        CloudTranslateModule,
        ModalModule,
        RouterModule,
        InterceptorModule,
        PopoverModule,
        TabsModule,
        BsDatepickerModule,
        MatInputModule,
        MatCheckboxModule,
        MatSelectModule,
        MomentPipe,
        // ReversePipe,
        InputCharacterMaskDirective,
        // NumericSeparatorDirective,
        NumericOnlyDirective,
        DialogModule,
        OutletSelectorComponent,
        ProgramSelectorComponent,
        CourseSelectorComponent,
        StudySubjectSelectorComponent,
        HourSelectorComponent,
        MinuteSelectorComponent,
        SourceSelectorComponent,
        StudentSearchComponent,
        StudentAddComponent,
        ClassSearchComponent,
        ClassTransferComponent,
        ClassEnrollmentComponent,
        ClassEnrollComponent

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
