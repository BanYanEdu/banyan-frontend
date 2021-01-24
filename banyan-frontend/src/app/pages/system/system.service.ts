import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import 'rxjs/add/operator/map';

import { HttpClientService } from 'inet-core';

@Injectable({
    providedIn: 'root'
})
export class SystemService {
    public url = {
        // Firm Logo
        calista_firm_logo_view: iNet.getPUrl("plugin/firmlogo/view"),
        // User Roles
        calista_user_role_list: iNet.getPUrl("system/userrole/list"),
        // Organizations
        calista_organization_list: iNet.getPUrl("plugin/organization/list"),
        // Permission Groups    keyword=
        calista_permision_group_list: iNet.getPUrl("cloud/subfirmrole/group"),
        // Permission Groups Detail    name=Einvoice
        calista_permision_group_load: iNet.getPUrl("cloud/subfirmrole/groupload"),
        // App Functions           application=
        calista_app: iNet.getPUrl("cloud/subfirmrole/variable"),
        
        
    };

    constructor(private http: HttpClientService, ) { }

   // System Data
   getFirmLogo(): Observable<any> { return this.http.postJSON(this.url.calista_firm_logo_view); }
//    courseUpdate(item: Outlet): Observable<any> { return this.http.postJSON(this.url.banyan_ems_class_course_update, item); }
//    courseList(criteria: any): Observable<any> { return this.http.postJSON(this.url.banyan_ems_class_course_list, criteria); }
//    courseStudySubjectUpdate(uuid: string, str: string): Observable<any> { return this.http.postJSON(this.url.banyan_ems_class_course_study_subject_update, {uuid: uuid, studySubjectsStr: str}); }
    
  }