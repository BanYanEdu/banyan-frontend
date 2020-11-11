import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import 'rxjs/add/operator/map';

import { HttpClientService } from 'inet-core';
import { Outlet } from 'app/model/settings/Outlet';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {
    private url = {
        // Outlet
        banyan_ems_settings_outlet_add: iNet.getPUrl('banyan-ems/settings/outlet/add'),
        banyan_ems_settings_outlet_update: iNet.getPUrl('banyan-ems/settings/outlet/update'),
        banyan_ems_settings_outlet_delete: iNet.getPUrl('banyan-ems/settings/outlet/delete'),
        banyan_ems_settings_outlet_list: iNet.getPUrl('banyan-ems/settings/outlet/list'),
    };

    constructor(private http: HttpClientService, ) { }

    // Outlet
    outletAdd(item: Outlet): Observable<any> { return this.http.postJSON(this.url.banyan_ems_settings_outlet_add, item); }
    outletUpdate(item: Outlet): Observable<any> { return this.http.postJSON(this.url.banyan_ems_settings_outlet_update, item); }
    outletList(criteria: any): Observable<any> { return this.http.postJSON('https://calista-dev.inetcloud.vn/collaboration/vinaco/system/userrole/list.cpx', criteria); }
    // outletList(criteria: any): Observable<any> { return this.http.postJSON('http://localhost:8080', criteria); } 
    outletDelete(id: string): Observable<any> { return this.http.postJSON(this.url.banyan_ems_settings_outlet_delete, { uuid: id }); }
    // Source
    sourceList(criteria: any): Observable<any> { return this.http.postJSON('https://calista-dev.inetcloud.vn/collaboration/vinaco/system/userrole/list.cpx', criteria); }
    // Program
    programList(criteria: any): Observable<any> { return this.http.postJSON('https://calista-dev.inetcloud.vn/collaboration/vinaco/system/userrole/list.cpx', criteria); }
    // Study Subject
    studySubjectList(criteria: any): Observable<any> { return this.http.postJSON('https://calista-dev.inetcloud.vn/collaboration/vinaco/system/userrole/list.cpx', criteria); }
    // Test Subject
    testSubjectList(criteria: any): Observable<any> { return this.http.postJSON('https://calista-dev.inetcloud.vn/collaboration/vinaco/system/userrole/list.cpx', criteria); }
    // Schedule Pattern
    schedulePatternList(criteria: any): Observable<any> { return this.http.postJSON('https://calista-dev.inetcloud.vn/collaboration/vinaco/system/userrole/list.cpx', criteria); }
    // Room
    roomList(criteria: any): Observable<any> { return this.http.postJSON('https://calista-dev.inetcloud.vn/collaboration/vinaco/system/userrole/list.cpx', criteria); }
    // Holiday
    holidayList(criteria: any): Observable<any> { return this.http.postJSON('https://calista-dev.inetcloud.vn/collaboration/vinaco/system/userrole/list.cpx', criteria); }
    
  }
