import { Component, ElementRef, Input, OnChanges, OnInit, TemplateRef } from '@angular/core';

import { CommonService } from 'app/shared/services/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { BaseComponent } from 'app/shared/components/BaseComponent';
import { FormMode } from 'app/model/common/FormMode';
import { SchoolClass } from 'app/model/class/SchoolClass';
import { ClassService } from '../../class.service';

@Component({
    selector: 'app-class-unit-master',
    templateUrl: './class-unit-master.component.html'
})
export class ClassUnitMasterComponent extends BaseComponent implements OnInit, OnChanges {
    id: string;
    class: SchoolClass;
    viewMode: string;

    mode: FormMode = FormMode.E_EDIT;
    modalRef: BsModalRef;
    config = {
        backdrop: false,
        ignoreBackdropClick: true,
        class: 'modal-xl'
    };

    items: any[] = [];
    // classStudySubjects: any[] = [];
    // classLecturers: any[] = [];

    constructor(
        element: ElementRef,
        protected modalService: BsModalService,
        private classService: ClassService,
        protected commonService: CommonService,
        protected route: ActivatedRoute,
        protected router: Router
    ) { super(commonService) }

    ngOnInit() {
        this.viewMode = "E_CALENDAR";

        // 
        this.route.params.subscribe(params => {
            this.id = params['id'];
            // Get Class Data
            this.classService.classList({uuid: this.id}).subscribe(data =>
                {
                    this.class = data.items[0];
                }
            );                
            // Get Study Subjects
            // this.classService.studySubjectList({classId: this.id}).subscribe(data =>
            //     {
            //         this.classStudySubjects = data.items;
            //     }
            // );
            // Get Lecturers
            // this.classService.assignmentList({classId: this.id}).subscribe(data =>
            //     {
            //         this.classLecturers = data.items;
            //     }
            // );
        });
        this.load();
    }

    ngOnChanges() {
        
    }

    load() {        
        this.classService.unitList({classId: this.id}).subscribe(data => {
            this.items = data.items;
        })
    }

    
    onGenerate() {
        this.classService.unitGenerate(this.id).subscribe(data => {
            this.showMessage('MESSAGE.DATA_SAVED', 'MESSAGE.NOTIFICATION');
            this.load();
        });
        
    }

    onTableView(){
        if (this.viewMode != "E_TABLE") {
            this.viewMode = "E_TABLE";
        }
    }
    onCalendarView(){
        if (this.viewMode != "E_CALENDAR") {
            this.viewMode = "E_CALENDAR";
        }
    }
}