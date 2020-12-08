import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { GridModule } from "inet-ui";
import { CommonService } from 'app/shared/services/common.service';
import { FocusService } from 'app/shared/services/focus.service';
import { EmployeeHomeComponent } from './employee-home/employee-home.component';
import { EmployeeRoutingModule} from './employee-routing.module';
import { EmployeeListComponent } from './employee/employee-list.component';
import { EmployeeAddComponent } from './employee/employee-add.component';
import { AppCommonModule } from '../common/app-common.module';
import { MatInputModule } from '@angular/material';
import { EmployeeViewComponent } from './employee/employee-view.component';

@NgModule({
    imports: [
        CommonModule,
        AppCommonModule,
        GridModule,
        ReactiveFormsModule,
        EmployeeRoutingModule,
        // MatInputModule
        // ColorPickerModule,
    ],
    declarations: [
        EmployeeHomeComponent,
        EmployeeListComponent,
        EmployeeAddComponent,
        EmployeeViewComponent
    ],
    providers: [
        CommonService,
        FocusService
    ]
})
export class EmployeeModule {
}