import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { GridModule } from "inet-ui";
import { CommonService } from 'app/shared/services/common.service';
import { FocusService } from 'app/shared/services/focus.service';
import { AppCommonModule } from '../common/app-common.module';
import { TestingRoutingModule } from './testing-routing.module';
import { D3Component } from './d3/d3.component';

@NgModule({
    imports: [
        CommonModule,
        AppCommonModule,
        GridModule,
        ReactiveFormsModule,
        TestingRoutingModule
    ],
    declarations: [
        D3Component
    ],
    providers: [
        CommonService,
        FocusService
    ]
})
export class TestingModule {
}