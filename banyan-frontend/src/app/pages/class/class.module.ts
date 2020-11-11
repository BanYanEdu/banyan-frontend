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

@NgModule({
    imports: [
        CommonModule,
        // AppCommonModule,
        GridModule,
        ReactiveFormsModule,
        ClassRoutingModule
    ],
    declarations: [
        ClassHomeComponent,
        CourseListComponent,
        CourseAddComponent,
        ClassListComponent,
        ClassAddComponent,
        RegistrationListComponent,
        RegistrationAddComponent

    ],
    providers: [
        CommonService,
        FocusService
    ]
})
export class ClassModule {
}