import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import 'rxjs/add/operator/map';

import { HttpClientService } from 'inet-core';
import { Examination } from 'app/model/exam/Examination';
import { Exam } from 'app/model/exam/Exam';

@Injectable({
    providedIn: 'root'
})
export class ExamService {
    private url = {
        // Examination
        banyan_ems_examination_create: iNet.getPUrl('banyan/ems/examination/create'),
        banyan_ems_examination_update: iNet.getPUrl('banyan/ems/examination/update'),
        banyan_ems_examination_list: iNet.getPUrl('banyan/ems/examination/list'),
        // Exam
        banyan_ems_exam_create: iNet.getPUrl('banyan/ems/exam/create'),
        banyan_ems_exam_update: iNet.getPUrl('banyan/ems/exam/update'),
        banyan_ems_exam_list: iNet.getPUrl('banyan/ems/exam/list'),
    };

    constructor(private http: HttpClientService, ) { }

    // Examination
    examinationCreate(item: Examination): Observable<any> { return this.http.postJSON(this.url.banyan_ems_examination_create, item); }
    examinationUpdate(item: Examination): Observable<any> { return this.http.postJSON(this.url.banyan_ems_examination_update, item); }
    examinationList(criteria: any): Observable<any> { return this.http.postJSON(this.url.banyan_ems_examination_list, criteria); }    
    // Exam
    examCreate(item: Exam): Observable<any> { return this.http.postJSON(this.url.banyan_ems_exam_create, item); }
    examUpdate(item: Exam): Observable<any> { return this.http.postJSON(this.url.banyan_ems_exam_update, item); }
    examList(criteria: any): Observable<any> { return this.http.postJSON(this.url.banyan_ems_exam_list, criteria); }    
  }