import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { GridModule } from "inet-ui";
import { CommonService } from 'app/shared/services/common.service';
import { FocusService } from 'app/shared/services/focus.service';
import { EmployeeHomeComponent } from './employee-home/employee-home.component';
import { EmployeeRoutingModule} from './employee-routing.module';
import { AppCommonModule } from '../common/app-common.module';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { EmployeeViewComponent } from './employee/employee-view/employee-view.component';
import { EmployeeAddComponent } from './employee/employee-add/employee-add.component';
import { EmployeePermissionProfileViewComponent } from './employee/employee-permission-profile-view/eppv.component';
import { EmployeePermissionProfileAddComponent } from './employee/employee-permission-profile-add/eppa.component';

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
        EmployeeViewComponent,
        EmployeeAddComponent,
        EmployeePermissionProfileViewComponent,
        EmployeePermissionProfileAddComponent
    ],
    providers: [
        CommonService,
        FocusService
    ]
})
export class EmployeeModule {
}