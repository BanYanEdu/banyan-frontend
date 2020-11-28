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

@NgModule({
    imports: [
        CommonModule,
        // AppCommonModule,
        GridModule,
        ReactiveFormsModule,
        EmployeeRoutingModule
        // ColorPickerModule,
    ],
    declarations: [
        EmployeeHomeComponent,
        EmployeeListComponent,
        EmployeeAddComponent
    ],
    providers: [
        CommonService,
        FocusService
    ]
})
export class EmployeeModule {
}