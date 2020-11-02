import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { GridModule } from "inet-ui";
import { CommonService } from 'app/shared/services/common.service';
import { FocusService } from 'app/shared/services/focus.service';
import { ClassRoutingModule } from './class-routing.module';
import { ClassHomeComponent } from './class-home/class-home.component';

@NgModule({
    imports: [
        CommonModule,
        // AppCommonModule,
        GridModule,
        ReactiveFormsModule,
        ClassRoutingModule
    ],
    declarations: [
        ClassHomeComponent

    ],
    providers: [
        CommonService,
        FocusService
    ]
})
export class ClassModule {
}