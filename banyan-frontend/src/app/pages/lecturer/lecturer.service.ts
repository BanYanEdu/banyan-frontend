import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import 'rxjs/add/operator/map';

import { HttpClientService } from 'inet-core';

@Injectable({
    providedIn: 'root'
})
export class LecturerService {
    private url = {
        // Lead
        banyan_ems_settings_outlet_add: iNet.getPUrl('banyan-ems/settings/outlet/add'),
        banyan_ems_settings_outlet_update: iNet.getPUrl('banyan-ems/settings/outlet/update'),
        banyan_ems_settings_outlet_delete: iNet.getPUrl('banyan-ems/settings/outlet/delete'),
        banyan_ems_settings_outlet_list: iNet.getPUrl('banyan-ems/settings/outlet/list'),
    };

    constructor(private http: HttpClientService, ) { }

    // Lecturer
    lecturerList(criteria: any): Observable<any> { return this.http.postJSON('https://calista-dev.inetcloud.vn/collaboration/vinaco/system/userrole/list.cpx', criteria); }
    
  }