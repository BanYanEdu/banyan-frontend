import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import 'rxjs/add/operator/map';

import { HttpClientService } from 'inet-core';
import { Outlet } from 'app/model/settings/Outlet';
import { Program } from 'app/model/settings/Program';
import { Source } from 'app/model/settings/Source';
import { StudySubject } from 'app/model/settings/StudySubject';
import { TestSubject } from 'app/model/settings/TestSubject';
import { Facility } from 'app/model/settings/Facility';
import { SchedulePattern } from 'app/model/settings/SchedulePattern';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {
    private url = {
        // Program
        banyan_ems_settings_program_create: iNet.getPUrl('crm/ems/program/create'),
        banyan_ems_settings_program_update: iNet.getPUrl('crm/ems/program/update'),
        banyan_ems_settings_program_list: iNet.getPUrl('crm/ems/program/list'),
        // Outlet
        banyan_ems_settings_outlet_create: iNet.getPUrl('crm/ems/outlet/create'),
        banyan_ems_settings_outlet_update: iNet.getPUrl('crm/ems/outlet/update'),
        banyan_ems_settings_outlet_list: iNet.getPUrl('crm/ems/outlet/list'),
        // Source
        banyan_ems_settings_source_create: iNet.getPUrl('crm/ems/source/create'),
        banyan_ems_settings_source_update: iNet.getPUrl('crm/ems/source/update'),
        banyan_ems_settings_source_list: iNet.getPUrl('crm/ems/source/list'),
        // Study Subject
        banyan_ems_settings_study_subject_create: iNet.getPUrl('crm/ems/study-subject/create'),
        banyan_ems_settings_study_subject_update: iNet.getPUrl('crm/ems/study-subject/update'),
        banyan_ems_settings_study_subject_list: iNet.getPUrl('crm/ems/study-subject/list'),
        // Test Subject
        banyan_ems_settings_test_subject_create: iNet.getPUrl('crm/ems/test-subject/create'),
        banyan_ems_settings_test_subject_update: iNet.getPUrl('crm/ems/test-subject/update'),
        banyan_ems_settings_test_subject_list: iNet.getPUrl('crm/ems/test-subject/list'),
        // Facility
        banyan_ems_settings_facility_create: iNet.getPUrl('crm/ems/facility/create'),
        banyan_ems_settings_facility_update: iNet.getPUrl('crm/ems/facility/update'),
        banyan_ems_settings_facility_list: iNet.getPUrl('crm/ems/facility/list'),
        // Schedule Pattern
        banyan_ems_settings_schedule_pattern_create: iNet.getPUrl('crm/ems/schedule-pattern/create'),
        banyan_ems_settings_schedule_pattern_update: iNet.getPUrl('crm/ems/schedule-pattern/update'),
        banyan_ems_settings_schedule_pattern_list: iNet.getPUrl('crm/ems/schedule-pattern/list'),
        
    };

    constructor(private http: HttpClientService, ) { }

    // Program
    programCreate(item: Program): Observable<any> { return this.http.postJSON(this.url.banyan_ems_settings_program_create, item); }
    programUpdate(item: Program): Observable<any> { return this.http.postJSON(this.url.banyan_ems_settings_program_update, item); }
    programList(criteria: any): Observable<any> { return this.http.postJSON(this.url.banyan_ems_settings_program_list, criteria); }
    // Outlet
    outletCreate(item: Outlet): Observable<any> { return this.http.postJSON(this.url.banyan_ems_settings_outlet_create, item); }
    outletUpdate(item: Outlet): Observable<any> { return this.http.postJSON(this.url.banyan_ems_settings_outlet_update, item); }
    outletList(criteria: any): Observable<any> { return this.http.postJSON(this.url.banyan_ems_settings_outlet_list, criteria); }
    // Source
    sourceCreate(item: Source): Observable<any> { return this.http.postJSON(this.url.banyan_ems_settings_source_create, item); }
    sourceUpdate(item: Source): Observable<any> { return this.http.postJSON(this.url.banyan_ems_settings_source_update, item); }
    sourceList(criteria: any): Observable<any> { return this.http.postJSON(this.url.banyan_ems_settings_source_list, criteria); }
    // Study Subject
    studySubjectCreate(item: StudySubject): Observable<any> { return this.http.postJSON(this.url.banyan_ems_settings_study_subject_create, item); }
    studySubjectUpdate(item: StudySubject): Observable<any> { return this.http.postJSON(this.url.banyan_ems_settings_study_subject_update, item); }
    studySubjectList(criteria: any): Observable<any> { return this.http.postJSON(this.url.banyan_ems_settings_study_subject_list, criteria); }
    // Test Subject
    testSubjectCreate(item: TestSubject): Observable<any> { return this.http.postJSON(this.url.banyan_ems_settings_test_subject_create, item); }
    testSubjectUpdate(item: TestSubject): Observable<any> { return this.http.postJSON(this.url.banyan_ems_settings_test_subject_update, item); }
    testSubjectList(criteria: any): Observable<any> { return this.http.postJSON(this.url.banyan_ems_settings_test_subject_list, criteria); }
    // Facility
    facilityCreate(item: Facility): Observable<any> { return this.http.postJSON(this.url.banyan_ems_settings_facility_create, item); }
    facilityUpdate(item: Facility): Observable<any> { return this.http.postJSON(this.url.banyan_ems_settings_facility_update, item); }
    facilityList(criteria: any): Observable<any> { return this.http.postJSON(this.url.banyan_ems_settings_facility_list, criteria); } 
    // Schedule Pattern
    schedulePatternCreate(item: SchedulePattern): Observable<any> { return this.http.postJSON(this.url.banyan_ems_settings_schedule_pattern_create, item); }
    schedulePatternUpdate(item: SchedulePattern): Observable<any> { return this.http.postJSON(this.url.banyan_ems_settings_schedule_pattern_update, item); }
    schedulePatternList(criteria: any): Observable<any> { return this.http.postJSON(this.url.banyan_ems_settings_schedule_pattern_list, criteria); } 

   
    // Holiday
    holidayList(criteria: any): Observable<any> { return this.http.postJSON(this.url.banyan_ems_settings_program_list, criteria); }
    
  }
