import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import 'rxjs/add/operator/map';

import { HttpClientService } from 'inet-core';
import { SchoolClass } from 'app/model/class/SchoolClass';
import { ClassTransfer } from 'app/model/class/ClassTransfer';
import { ClassStudySubject } from 'app/model/class/ClassStudySubject';

@Injectable({
    providedIn: 'root'
})
export class ClassService {
    private url = {
        // Class
        banyan_ems_class_create: iNet.getPUrl('crm/ems/class/create'),
        banyan_ems_class_update: iNet.getPUrl('crm/ems/class/update'),
        banyan_ems_class_list: iNet.getPUrl('crm/ems/class/list'),
        // Class Enrollment
        banyan_ems_class_enrollment_create: iNet.getPUrl('crm/ems/class-enrollment/create'),
        banyan_ems_class_enrollment_update: iNet.getPUrl('crm/ems/class-enrollment/update'),
        banyan_ems_class_enrollment_list: iNet.getPUrl('crm/ems/class-enrollment/list'),
        banyan_ems_class_enrollment_transfer: iNet.getPUrl('crm/ems/class-enrollment/transfer'),
        // Class Assignment
        banyan_ems_class_assignment_create: iNet.getPUrl('crm/ems/class-assignment/create'),
        banyan_ems_class_assignment_update: iNet.getPUrl('crm/ems/class-assignment/update'),
        banyan_ems_class_assignment_list: iNet.getPUrl('crm/ems/class-assignment/list'),
        // Class Study Subject
        banyan_ems_class_study_subject_create: iNet.getPUrl('crm/ems/class-study-subject/create'),
        banyan_ems_class_study_subject_update: iNet.getPUrl('crm/ems/class-study-subject/update'),
        banyan_ems_class_study_subject_list: iNet.getPUrl('crm/ems/class-study-subject/list'),
        banyan_ems_class_study_subject_delete: iNet.getPUrl('crm/ems/class-study-subject/delete'),
        
    };

    constructor(private http: HttpClientService, ) { }

   // Class
   classCreate(item: SchoolClass): Observable<any> { return this.http.postJSON(this.url.banyan_ems_class_create, item); }
   classUpdate(item: SchoolClass): Observable<any> { return this.http.postJSON(this.url.banyan_ems_class_update, item); }
   classList(criteria: any): Observable<any> { return this.http.postJSON(this.url.banyan_ems_class_list, criteria); }
   // Class Enrollment
   enrollmentCreate(item: SchoolClass): Observable<any> { return this.http.postJSON(this.url.banyan_ems_class_enrollment_create, item); }
   enrollmentUpdate(item: SchoolClass): Observable<any> { return this.http.postJSON(this.url.banyan_ems_class_enrollment_update, item); }
   enrollmentList(criteria: any): Observable<any> { return this.http.postJSON(this.url.banyan_ems_class_enrollment_list, criteria); }
   enrollmentTransfer(item: ClassTransfer): Observable<any> { return this.http.postJSON(this.url.banyan_ems_class_enrollment_transfer, item); }
   // Class Assignment
   assignmentCreate(item: SchoolClass): Observable<any> { return this.http.postJSON(this.url.banyan_ems_class_assignment_create, item); }
   assignmentUpdate(item: SchoolClass): Observable<any> { return this.http.postJSON(this.url.banyan_ems_class_assignment_update, item); }
   assignmentList(criteria: any): Observable<any> { return this.http.postJSON(this.url.banyan_ems_class_assignment_list, criteria); }
   // Class Study Subject
   studySubjectCreate(item: ClassStudySubject): Observable<any> { return this.http.postJSON(this.url.banyan_ems_class_study_subject_create, item); }
   studySubjectUpdate(item: ClassStudySubject): Observable<any> { return this.http.postJSON(this.url.banyan_ems_class_study_subject_update, item); }
   studySubjectList(criteria: any): Observable<any> { return this.http.postJSON(this.url.banyan_ems_class_study_subject_list, criteria); }
   studySubjectDelete(id: string): Observable<any> { return this.http.postJSON(this.url.banyan_ems_class_study_subject_delete, {uuid: id}); }
    
  }