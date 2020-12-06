import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { GridModule } from "inet-ui";
import { CommonService } from 'app/shared/services/common.service';
import { FocusService } from 'app/shared/services/focus.service';
import { ClassRoutingModule } from './class-routing.module';
import { ClassHomeComponent } from './class-home/class-home.component';
import { CourseListComponent } from './course/course-list.component';
import { CourseAddComponent } from './course/course-add.component';
import { ClassListComponent } from './class/class-list.component';
import { ClassAddComponent } from './class/class-add.component';
import { RegistrationListComponent } from './registration/registration-list.component';
import { RegistrationAddComponent } from './registration/registration-add.component';
import { AppCommonModule } from '../common/app-common.module';
import { CourseViewComponent } from './course/course-view.component';
import { StudySubjectAssignComponent } from './study-subject-assign/study-subject-assign.component';
import { SchedulePatternSelectorComponent } from '../settings/schedule-pattern/schedule-pattern-selector.component';
import { FacilitySelectorComponent } from '../settings/facility/facility-selector.component';
import { ClassViewComponent } from './class/class-view.component';
import { MatSliderModule } from '@angular/material' 

@NgModule({
    imports: [
        CommonModule,
        AppCommonModule,
        GridModule,
        ReactiveFormsModule,
        ClassRoutingModule,
        MatSliderModule,
        
    ],
    declarations: [
        ClassHomeComponent,
        CourseListComponent,
        CourseViewComponent,
        CourseAddComponent,
        ClassListComponent,
        ClassAddComponent,
        ClassViewComponent,
        RegistrationListComponent,
        RegistrationAddComponent,
        StudySubjectAssignComponent,
        SchedulePatternSelectorComponent,
        FacilitySelectorComponent

    ],
    providers: [
        CommonService,
        FocusService
    ]
})
export class ClassModule {
}