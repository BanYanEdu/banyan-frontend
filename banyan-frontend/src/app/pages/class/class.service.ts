import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import 'rxjs/add/operator/map';

import { HttpClientService } from 'inet-core';
import { Outlet } from 'app/model/settings/Outlet';

@Injectable({
    providedIn: 'root'
})
export class ClassService {
    private url = {
        // Course
        banyan_ems_class_course_create: iNet.getPUrl('crm/ems/course/create'),
        banyan_ems_class_course_update: iNet.getPUrl('crm/ems/course/update'),
        banyan_ems_class_course_list: iNet.getPUrl('crm/ems/course/list'),
        // Class
        banyan_ems_class_class_create: iNet.getPUrl('crm/ems/class/create'),
        banyan_ems_class_class_update: iNet.getPUrl('crm/ems/class/update'),
        banyan_ems_class_class_list: iNet.getPUrl('crm/ems/class/list'),
    };

    constructor(private http: HttpClientService, ) { }

    // Class
    classList(criteria: any): Observable<any> { return this.http.postJSON(this.url.banyan_ems_class_course_list, criteria); }
   // Course
   courseCreate(item: Outlet): Observable<any> { return this.http.postJSON(this.url.banyan_ems_class_course_create, item); }
   courseUpdate(item: Outlet): Observable<any> { return this.http.postJSON(this.url.banyan_ems_class_course_update, item); }
   courseList(criteria: any): Observable<any> { return this.http.postJSON(this.url.banyan_ems_class_course_list, criteria); }
    // Registration
    registrationList(criteria: any): Observable<any> { return this.http.postJSON(this.url.banyan_ems_class_course_list, criteria); }
    
  }