import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import 'rxjs/add/operator/map';

import { HttpClientService } from 'inet-core';
import { Employee } from 'app/model/employee/Employee';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {
    private url = {
        // Employee & Lecture
        banyan_ems_employee_create: iNet.getPUrl('crm/ems/employee/create'),
        banyan_ems_employee_update: iNet.getPUrl('crm/ems/employee/update'),
        banyan_ems_employee_list: iNet.getPUrl('crm/ems/employee/list'),
    };

    constructor(private http: HttpClientService, ) { }

    // Employee & Lecture
    employeeCreate(item: Employee): Observable<any> { return this.http.postJSON(this.url.banyan_ems_employee_create, item); }
    employeeUpdate(item: Employee): Observable<any> { return this.http.postJSON(this.url.banyan_ems_employee_update, item); }
    employeeList(criteria: any): Observable<any> { return this.http.postJSON(this.url.banyan_ems_employee_list, criteria); }
  }