import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import 'rxjs/add/operator/map';

import { HttpClientService } from 'inet-core';
import { Outlet } from 'app/model/settings/Outlet';
import { SchoolClass } from 'app/model/class/SchoolClass';
import { ClassTransfer } from 'app/model/class/ClassTransfer';

@Injectable({
    providedIn: 'root'
})
export class ClassService {
    private url = {
        // Course
        banyan_ems_class_course_create: iNet.getPUrl('crm/ems/course/create'),
        banyan_ems_class_course_update: iNet.getPUrl('crm/ems/course/update'),
        banyan_ems_class_course_study_subject_update: iNet.getPUrl('crm/ems/course-study-subject/update'),
        banyan_ems_class_course_list: iNet.getPUrl('crm/ems/course/list'),
        // Class
        banyan_ems_class_class_create: iNet.getPUrl('crm/ems/class/create'),
        banyan_ems_class_class_update: iNet.getPUrl('crm/ems/class/update'),
        banyan_ems_class_class_study_subject_update: iNet.getPUrl('crm/ems/class-study-subject/update'),
        banyan_ems_class_class_list: iNet.getPUrl('crm/ems/class/list'),
        // Class Enrollment
        banyan_ems_class_class_enrollment_create: iNet.getPUrl('crm/ems/class-enrollment/create'),
        banyan_ems_class_class_enrollment_update: iNet.getPUrl('crm/ems/class-enrollment/update'),
        banyan_ems_class_class_enrollment_list: iNet.getPUrl('crm/ems/class-enrollment/list'),
        banyan_ems_class_class_enrollment_transfer: iNet.getPUrl('crm/ems/class-enrollment/transfer'),
        // Class Assignment
        banyan_ems_class_class_assignment_create: iNet.getPUrl('crm/ems/class-assignment/create'),
        banyan_ems_class_class_assignment_update: iNet.getPUrl('crm/ems/class-assignment/update'),
        banyan_ems_class_class_assignment_list: iNet.getPUrl('crm/ems/class-assignment/list'),
        
    };

    constructor(private http: HttpClientService, ) { }

   // Course
   courseCreate(item: Outlet): Observable<any> { return this.http.postJSON(this.url.banyan_ems_class_course_create, item); }
   courseUpdate(item: Outlet): Observable<any> { return this.http.postJSON(this.url.banyan_ems_class_course_update, item); }
   courseList(criteria: any): Observable<any> { return this.http.postJSON(this.url.banyan_ems_class_course_list, criteria); }
   courseStudySubjectUpdate(uuid: string, str: string): Observable<any> { return this.http.postJSON(this.url.banyan_ems_class_course_study_subject_update, {uuid: uuid, studySubjectsStr: str}); }
   // Class
   classCreate(item: SchoolClass): Observable<any> { return this.http.postJSON(this.url.banyan_ems_class_class_create, item); }
   classUpdate(item: SchoolClass): Observable<any> { return this.http.postJSON(this.url.banyan_ems_class_class_update, item); }
   classList(criteria: any): Observable<any> { return this.http.postJSON(this.url.banyan_ems_class_class_list, criteria); }
   classStudySubjectUpdate(uuid: string, str: string): Observable<any> { return this.http.postJSON(this.url.banyan_ems_class_class_study_subject_update, {uuid: uuid, studySubjectsStr: str}); }
   // Class Enrollment
   enrollmentCreate(item: SchoolClass): Observable<any> { return this.http.postJSON(this.url.banyan_ems_class_class_enrollment_create, item); }
   enrollmentUpdate(item: SchoolClass): Observable<any> { return this.http.postJSON(this.url.banyan_ems_class_class_enrollment_update, item); }
   enrollmentList(criteria: any): Observable<any> { return this.http.postJSON(this.url.banyan_ems_class_class_enrollment_list, criteria); }
   enrollmentTransfer(item: ClassTransfer): Observable<any> { return this.http.postJSON(this.url.banyan_ems_class_class_enrollment_transfer, item); }
   // Class Assignment
   assignmentCreate(item: SchoolClass): Observable<any> { return this.http.postJSON(this.url.banyan_ems_class_class_assignment_create, item); }
   assignmentUpdate(item: SchoolClass): Observable<any> { return this.http.postJSON(this.url.banyan_ems_class_class_assignment_update, item); }
   assignmentList(criteria: any): Observable<any> { return this.http.postJSON(this.url.banyan_ems_class_class_assignment_list, criteria); }
   // Registration
   registrationList(criteria: any): Observable<any> { return this.http.postJSON(this.url.banyan_ems_class_course_list, criteria); }
    
  }