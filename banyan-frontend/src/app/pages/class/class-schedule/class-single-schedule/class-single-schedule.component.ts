import { Component, ElementRef, Input, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { CommonService } from 'app/shared/services/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { BaseComponent } from 'app/shared/components/BaseComponent';
import { FormMode } from 'app/model/common/FormMode';
import { SchoolClass } from 'app/model/class/SchoolClass';
import { ClassService } from '../../class.service';
import { Utils } from 'app/shared/Utils';

@Component({
    selector: 'app-class-single-schedule',
    templateUrl: './class-single-schedule.component.html'
})
export class ClassSingleScheduleComponent extends BaseComponent {
    @Input() schoolClass: SchoolClass;
    @Input() classId: string;
    // id: string;
    // schoolClass: SchoolClass;
    currentFirstDate: any;
    startingDay: number = 1;  // 1: Monday
    days: any[] = [];
    classUnits: any[] = [];
    classStudySubjects: any[] = [];
    classLecturers: any[] = [];

    mode: FormMode = FormMode.E_EDIT;
    modalRef: BsModalRef;
    config = {
        backdrop: false,
        ignoreBackdropClick: true,
        class: 'modal-xl'
    };

    constructor(
        element: ElementRef,
        protected modalService: BsModalService,
        private classService: ClassService,
        protected commonService: CommonService,
        protected route: ActivatedRoute,
        protected router: Router
    ) { super(commonService)}

    ngOnInit() {
        
        this.setCurrentFirstDate(new Date());
        this.generateDateRange();
        this.load();       
    }

    // Load Class
    load() {
        this.loadSchedule();
            // Get Study Subjects
            this.classService.studySubjectList({classId: this.classId}).subscribe(data =>
                {
                    this.classStudySubjects = data.items;
                }
            );
            // Get Lecturers
            this.classService.assignmentList({classId: this.classId}).subscribe(data =>
                {
                    this.classLecturers = data.items;
                }
            );

    }

    // Generate Date Range
    generateDateRange() {
        this.days = [];

        for (let i=0;i<7;i++) {
            let date = Utils.addDays(this.currentFirstDate, i);
            date.setHours(0,0,0,0);
            this.days[i] = {
                date: date,
                dateLong: date.getTime()
            }
        }
    }

    // Load Class Units
    loadSchedule(){
        let params: any = {};
        params.classId = this.classId;
        params.dateFrom = this.days[0].dateLong;
        params.dateTo = this.days[6].dateLong;

        this.classService.unitList(params).subscribe(data =>
            {
                this.classUnits = data.items;
                this.refineDate();
            }
        );
    }

    protected createMainFormGroup(): FormGroup {
        return new FormGroup({
            // 'remark': new FormControl(null);
        });
    }

    onChanged($event) {
        this.loadSchedule();
    }

    onNext() {
        this.currentFirstDate = Utils.addDays(this.currentFirstDate, 7);
        this.generateDateRange();
        this.loadSchedule();
    }
    onPrevious() {
        this.currentFirstDate = Utils.addDays(this.currentFirstDate, -7);
        this.generateDateRange();
        this.loadSchedule();
    }
    onFirst() {
        this.setCurrentFirstDate(new Date(this.schoolClass.actualStartDate));
        this.generateDateRange();
        this.loadSchedule();
    }
    onLast() {
        this.setCurrentFirstDate(new Date(this.schoolClass.actualEndDate));
        this.generateDateRange();
        this.loadSchedule();
    }

    refineDate() {
        for (let i=0; i<this.classUnits.length; i++) {
            let temp = new Date(this.classUnits[i].date);
            temp.setHours(0,0,0,0);
            this.classUnits[i].date = temp.getTime();
            this.classUnits.sort(function(a,b){
                if (a.hourFrom < b.hourFrom) {
                    return -1;
                } else return 1;
                return 0
            });
        }
    }

    setCurrentFirstDate(date: Date) {
        date.setHours(0,0,0,0);
        if (date.getDay() >= this.startingDay) {
            this.currentFirstDate = Utils.addDays(date, this.startingDay - date.getDay());
        } else {
            this.currentFirstDate = Utils.addDays(date, this.startingDay - date.getDay() - 7);
        }
    }

    
}