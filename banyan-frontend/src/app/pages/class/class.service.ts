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
        // Outlet
        banyan_ems_settings_outlet_add: iNet.getPUrl('banyan-ems/settings/outlet/add'),
        banyan_ems_settings_outlet_update: iNet.getPUrl('banyan-ems/settings/outlet/update'),
        banyan_ems_settings_outlet_delete: iNet.getPUrl('banyan-ems/settings/outlet/delete'),
        banyan_ems_settings_outlet_list: iNet.getPUrl('banyan-ems/settings/outlet/list'),
    };

    constructor(private http: HttpClientService, ) { }

    // Class
    outletAdd(item: Outlet): Observable<any> { return this.http.postJSON(this.url.banyan_ems_settings_outlet_add, item); }
    outletUpdate(item: Outlet): Observable<any> { return this.http.postJSON(this.url.banyan_ems_settings_outlet_update, item); }
    outletDelete(id: string): Observable<any> { return this.http.postJSON(this.url.banyan_ems_settings_outlet_delete, { uuid: id }); }
    classList(criteria: any): Observable<any> { return this.http.postJSON('https://calista-dev.inetcloud.vn/collaboration/vinaco/system/userrole/list.cpx', criteria); }
   // Course
    courseList(criteria: any): Observable<any> { return this.http.postJSON('https://calista-dev.inetcloud.vn/collaboration/vinaco/system/userrole/list.cpx', criteria); }
    // Registration
    registrationList(criteria: any): Observable<any> { return this.http.postJSON('https://calista-dev.inetcloud.vn/collaboration/vinaco/system/userrole/list.cpx', criteria); }
    
  }