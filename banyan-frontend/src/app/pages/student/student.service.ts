import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import 'rxjs/add/operator/map';

import { HttpClientService } from 'inet-core';
// import { Outlet } from 'app/model/settings/Outlet';
import { Contact } from 'app/model/student/Contact';

@Injectable({
    providedIn: 'root'
})
export class StudentService {
    private url = {
        // Student
        banyan_ems_student_create: iNet.getPUrl('banyan/ems/contact/create'),
        banyan_ems_student_update: iNet.getPUrl('banyan/ems/contact/update'),
        // banyan_ems_student_delete: iNet.getPUrl('banyan/ems/student/delete'),
        banyan_ems_student_list: iNet.getPUrl('banyan/ems/contact/list'),
    };

    constructor(private http: HttpClientService, ) { }

    // Lead
    leadList(criteria: any): Observable<any> { return this.http.postJSON('https://calista-dev.inetcloud.vn/collaboration/vinaco/system/userrole/list.cpx', criteria); }
    // Student
    studentCreate(item: Contact): Observable<any> { return this.http.postJSON(this.url.banyan_ems_student_create, item); }
    studentUpdate(item: Contact): Observable<any> { return this.http.postJSON(this.url.banyan_ems_student_update, item); }
    studentList(criteria: any): Observable<any> { return this.http.postJSON(this.url.banyan_ems_student_list, criteria); }
    // Company
    companyList(criteria: any): Observable<any> { return this.http.postJSON('https://calista-dev.inetcloud.vn/collaboration/vinaco/system/userrole/list.cpx', criteria); }
    
  }