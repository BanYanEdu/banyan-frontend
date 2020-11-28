import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import 'rxjs/add/operator/map';

import { HttpClientService } from 'inet-core';
import { Outlet } from 'app/model/settings/Outlet';

@Injectable({
    providedIn: 'root'
})
export class StudentService {
    private url = {
        // Student
        banyan_ems_student_create: iNet.getPUrl('crm/ems/student/create'),
        banyan_ems_student_update: iNet.getPUrl('crm/ems/student/update'),
        // banyan_ems_student_delete: iNet.getPUrl('crm/ems/student/delete'),
        banyan_ems_student_list: iNet.getPUrl('crm/ems/class/list'),
    };

    constructor(private http: HttpClientService, ) { }

    // Lead
    leadList(criteria: any): Observable<any> { return this.http.postJSON('https://calista-dev.inetcloud.vn/collaboration/vinaco/system/userrole/list.cpx', criteria); }
    // Student
    studentList(criteria: any): Observable<any> { return this.http.postJSON(this.url.banyan_ems_student_list, criteria); }
    // Company
    companyList(criteria: any): Observable<any> { return this.http.postJSON('https://calista-dev.inetcloud.vn/collaboration/vinaco/system/userrole/list.cpx', criteria); }
    
  }