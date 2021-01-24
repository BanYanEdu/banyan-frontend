import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import 'rxjs/add/operator/map';

import { HttpClientService } from 'inet-core';
import { Outlet } from 'app/model/settings/Outlet';
import { Program } from 'app/model/settings/Program';
import { Source } from 'app/model/settings/Source';
import { StudySubject } from 'app/model/settings/StudySubject';
import { ExamSubject } from 'app/model/settings/ExamSubject';
import { Facility } from 'app/model/settings/Facility';
import { SchedulePattern } from 'app/model/settings/SchedulePattern';
import { SystemConfig } from 'app/model/settings/SystemConfig';
import { Course } from 'app/model/settings/Course';
import { CourseExamination } from 'app/model/settings/CourseExamination';
import { Holiday } from 'app/model/settings/Holiday';
import { AAType } from 'app/model/settings/AAType';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {
    private url = {
        // Course
        banyan_ems_course_create: iNet.getPUrl('banyan/ems/course/create'),
        banyan_ems_course_update: iNet.getPUrl('banyan/ems/course/update'),
        banyan_ems_course_list: iNet.getPUrl('banyan/ems/course/list'),
        banyan_ems_course_study_subject_update: iNet.getPUrl('banyan/ems/course-study-subject/update'),
        // Course Examination
        banyan_ems_course_examination_list: iNet.getPUrl('banyan/ems/course-examination/list'),
        banyan_ems_course_examination_create: iNet.getPUrl('banyan/ems/course-examination/create'),
        banyan_ems_course_examination_update: iNet.getPUrl('banyan/ems/course-examination/update'),
        banyan_ems_course_examination_delete: iNet.getPUrl('banyan/ems/course-examination/delete'),
        // Program
        banyan_ems_program_create: iNet.getPUrl('banyan/ems/program/create'),
        banyan_ems_program_update: iNet.getPUrl('banyan/ems/program/update'),
        banyan_ems_program_list: iNet.getPUrl('banyan/ems/program/list'),
        // Outlet
        banyan_ems_outlet_create: iNet.getPUrl('banyan/ems/outlet/create'),
        banyan_ems_outlet_update: iNet.getPUrl('banyan/ems/outlet/update'),
        banyan_ems_outlet_list: iNet.getPUrl('banyan/ems/outlet/list'),
        // Source
        banyan_ems_source_create: iNet.getPUrl('banyan/ems/source/create'),
        banyan_ems_source_update: iNet.getPUrl('banyan/ems/source/update'),
        banyan_ems_source_list: iNet.getPUrl('banyan/ems/source/list'),
        // Study Subject
        banyan_ems_study_subject_create: iNet.getPUrl('banyan/ems/study-subject/create'),
        banyan_ems_study_subject_update: iNet.getPUrl('banyan/ems/study-subject/update'),
        banyan_ems_study_subject_list: iNet.getPUrl('banyan/ems/study-subject/list'),
        // Exam Subject
        banyan_ems_exam_subject_create: iNet.getPUrl('banyan/ems/exam-subject/create'),
        banyan_ems_exam_subject_update: iNet.getPUrl('banyan/ems/exam-subject/update'),
        banyan_ems_exam_subject_list: iNet.getPUrl('banyan/ems/exam-subject/list'),
        // Facility
        banyan_ems_facility_create: iNet.getPUrl('banyan/ems/facility/create'),
        banyan_ems_facility_update: iNet.getPUrl('banyan/ems/facility/update'),
        banyan_ems_facility_list: iNet.getPUrl('banyan/ems/facility/list'),
        // Schedule Pattern
        banyan_ems_schedule_pattern_create: iNet.getPUrl('banyan/ems/schedule-pattern/create'),
        banyan_ems_schedule_pattern_update: iNet.getPUrl('banyan/ems/schedule-pattern/update'),
        banyan_ems_schedule_pattern_list: iNet.getPUrl('banyan/ems/schedule-pattern/list'),
        // Holiday
        banyan_ems_holiday_create: iNet.getPUrl('banyan/ems/holiday/create'),
        banyan_ems_holiday_update: iNet.getPUrl('banyan/ems/holiday/update'),
        banyan_ems_holiday_delete: iNet.getPUrl('banyan/ems/holiday/delete'),
        banyan_ems_holiday_list: iNet.getPUrl('banyan/ems/holiday/list'),
        // AA Type
        banyan_ems_aa_type_create: iNet.getPUrl('banyan/ems/aa-type/create'),
        banyan_ems_aa_type_update: iNet.getPUrl('banyan/ems/aa-type/update'),
        banyan_ems_aa_type_list: iNet.getPUrl('banyan/ems/aa-type/list'),
        // System Config
        banyan_ems_system_config_create: iNet.getPUrl('banyan/ems/system-config/create'),
        banyan_ems_system_config_update: iNet.getPUrl('banyan/ems/system-config/update'),
        banyan_ems_system_config_list: iNet.getPUrl('banyan/ems/system-config/list'),
        banyan_ems_employee_profile_config_update: iNet.getPUrl('banyan/ems/system-config/employee-profile-config/update'),
        banyan_ems_contact_profile_config_update: iNet.getPUrl('banyan/ems/system-config/contact-profile-config/update'),
                
    };

    constructor(private http: HttpClientService, ) { }

   // Course
   courseCreate(item: Course): Observable<any> { return this.http.postJSON(this.url.banyan_ems_course_create, item); }
   courseUpdate(item: Course): Observable<any> { return this.http.postJSON(this.url.banyan_ems_course_update, item); }
   courseList(criteria: any): Observable<any> { return this.http.postJSON(this.url.banyan_ems_course_list, criteria); }
   courseStudySubjectUpdate(uuid: string, str: string): Observable<any> { return this.http.postJSON(this.url.banyan_ems_course_study_subject_update, {uuid: uuid, studySubjectsStr: str}); }
   // Course Examination
   courseExaminationCreate(item: CourseExamination): Observable<any> { return this.http.postJSON(this.url.banyan_ems_course_examination_create, item); }
   courseExaminationUpdate(item: CourseExamination): Observable<any> { return this.http.postJSON(this.url.banyan_ems_course_examination_update, item); }
   courseExaminationList(criteria: any): Observable<any> { return this.http.postJSON(this.url.banyan_ems_course_examination_list, criteria); }
   courseExaminationDelete(uuid: string): Observable<any> { return this.http.postJSON(this.url.banyan_ems_course_examination_delete, {uuid: uuid}); }
   // Program
    programCreate(item: Program): Observable<any> { return this.http.postJSON(this.url.banyan_ems_program_create, item); }
    programUpdate(item: Program): Observable<any> { return this.http.postJSON(this.url.banyan_ems_program_update, item); }
    programList(criteria: any): Observable<any> { return this.http.postJSON(this.url.banyan_ems_program_list, criteria); }
    // Outlet
    outletCreate(item: Outlet): Observable<any> { return this.http.postJSON(this.url.banyan_ems_outlet_create, item); }
    outletUpdate(item: Outlet): Observable<any> { return this.http.postJSON(this.url.banyan_ems_outlet_update, item); }
    outletList(criteria: any): Observable<any> { return this.http.postJSON(this.url.banyan_ems_outlet_list, criteria); }
    // Source
    sourceCreate(item: Source): Observable<any> { return this.http.postJSON(this.url.banyan_ems_source_create, item); }
    sourceUpdate(item: Source): Observable<any> { return this.http.postJSON(this.url.banyan_ems_source_update, item); }
    sourceList(criteria: any): Observable<any> { return this.http.postJSON(this.url.banyan_ems_source_list, criteria); }
    // Study Subject
    studySubjectCreate(item: StudySubject): Observable<any> { return this.http.postJSON(this.url.banyan_ems_study_subject_create, item); }
    studySubjectUpdate(item: StudySubject): Observable<any> { return this.http.postJSON(this.url.banyan_ems_study_subject_update, item); }
    studySubjectList(criteria: any): Observable<any> { return this.http.postJSON(this.url.banyan_ems_study_subject_list, criteria); }
    // Exam Subject
    examSubjectCreate(item: ExamSubject): Observable<any> { return this.http.postJSON(this.url.banyan_ems_exam_subject_create, item); }
    examSubjectUpdate(item: ExamSubject): Observable<any> { return this.http.postJSON(this.url.banyan_ems_exam_subject_update, item); }
    examSubjectList(criteria: any): Observable<any> { return this.http.getJSON(this.url.banyan_ems_exam_subject_list, criteria); }
    // Facility
    facilityCreate(item: Facility): Observable<any> { return this.http.postJSON(this.url.banyan_ems_facility_create, item); }
    facilityUpdate(item: Facility): Observable<any> { return this.http.postJSON(this.url.banyan_ems_facility_update, item); }
    facilityList(criteria: any): Observable<any> { return this.http.postJSON(this.url.banyan_ems_facility_list, criteria); } 
    // Schedule Pattern
    schedulePatternCreate(item: SchedulePattern): Observable<any> { return this.http.postJSON(this.url.banyan_ems_schedule_pattern_create, item); }
    schedulePatternUpdate(item: SchedulePattern): Observable<any> { return this.http.postJSON(this.url.banyan_ems_schedule_pattern_update, item); }
    schedulePatternList(criteria: any): Observable<any> { return this.http.postJSON(this.url.banyan_ems_schedule_pattern_list, criteria); }    
    // Holiday
    holidayCreate(item: Holiday): Observable<any> { return this.http.postJSON(this.url.banyan_ems_holiday_create, item); }
    holidayUpdate(item: Holiday): Observable<any> { return this.http.postJSON(this.url.banyan_ems_holiday_update, item); }
    holidayDelete(uuid: string): Observable<any> { return this.http.postJSON(this.url.banyan_ems_holiday_delete, {uuid: uuid}); }
    holidayList(criteria: any): Observable<any> { return this.http.postJSON(this.url.banyan_ems_holiday_list, criteria); }
    // AA Type
    aaTypeCreate(item: AAType): Observable<any> { return this.http.postJSON(this.url.banyan_ems_aa_type_create, item); }
    aaTypeUpdate(item: AAType): Observable<any> { return this.http.postJSON(this.url.banyan_ems_aa_type_update, item); }
    aaTypeList(criteria: any): Observable<any> { return this.http.postJSON(this.url.banyan_ems_aa_type_list, criteria); }    
    // System Config
    systemConfigCreate(item: SystemConfig): Observable<any> { return this.http.postJSON(this.url.banyan_ems_system_config_create, item); }
    systemConfigUpdate(item: SystemConfig): Observable<any> { return this.http.postJSON(this.url.banyan_ems_system_config_update, item); }
    employeeProfileConfigUpdate(item: any): Observable<any> { return this.http.postJSON(this.url.banyan_ems_employee_profile_config_update, item); }
    contactProfileConfigUpdate(item: any): Observable<any> { return this.http.postJSON(this.url.banyan_ems_contact_profile_config_update, item); }
    systemConfigList(criteria: any): Observable<any> { return this.http.postJSON(this.url.banyan_ems_system_config_list, criteria); } 

  }
