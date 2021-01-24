import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import 'rxjs/add/operator/map';

import { HttpClientService } from 'inet-core';
import { Employee } from 'app/model/employee/Employee';
import { EmployeePermissionProfile } from 'app/model/employee/EmployeePermissionProfile';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {
    private url = {
        // Employee & Lecture
        banyan_ems_employee_create: iNet.getPUrl('banyan/ems/employee/create'),
        banyan_ems_employee_update: iNet.getPUrl('banyan/ems/employee/update'),
        banyan_ems_employee_list: iNet.getPUrl('banyan/ems/employee/list'),
        // Employee Permission Profile
        banyan_ems_employee_permission_profile_create: iNet.getPUrl('banyan/ems/employee-permission-profile/create'),
        banyan_ems_employee_permission_profile_update: iNet.getPUrl('banyan/ems/employee-permission-profile/update'),
        banyan_ems_employee_permission_profile_list: iNet.getPUrl('banyan/ems/employee-permission-profile/list'),
    };

    constructor(private http: HttpClientService, ) { }

    // Employee & Lecture
    employeeCreate(item: Employee): Observable<any> { return this.http.postJSON(this.url.banyan_ems_employee_create, item); }
    employeeUpdate(item: Employee): Observable<any> { return this.http.postJSON(this.url.banyan_ems_employee_update, item); }
    employeeList(criteria: any): Observable<any> { return this.http.postJSON(this.url.banyan_ems_employee_list, criteria); }
    // Employee Permission Profilee
    employeePermissionProfileCreate(item: EmployeePermissionProfile): Observable<any> { return this.http.postJSON(this.url.banyan_ems_employee_permission_profile_create, item); }
    employeePermissionProfileUpdate(item: EmployeePermissionProfile): Observable<any> { return this.http.postJSON(this.url.banyan_ems_employee_permission_profile_update, item); }
    employeePermissionProfileList(criteria: any): Observable<any> { return this.http.postJSON(this.url.banyan_ems_employee_permission_profile_list, criteria); }


}