import { Component, ElementRef, Input, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { CommonService } from 'app/shared/services/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { BaseComponent } from 'app/shared/components/BaseComponent';
import { FormMode } from 'app/model/common/FormMode';
import { SchoolClass } from 'app/model/class/SchoolClass';
import { ClassService } from '../class.service';
import { DataTable } from 'inet-ui';

@Component({
    selector: 'app-class-attendance-summary',
    templateUrl: './class-attendance-summary.component.html'
})
export class ClassAttendanceSummaryComponent extends BaseComponent {
    @ViewChild("datagrid") datagrid: DataTable;
    id: string;
    schoolClass: SchoolClass;
    days: any[] = [];
    classUnits: any[] = [];
    students: any[] = [];
    classDays: any[] = [];
    items: any[] = [];
    itemCount = 0;
    pageNumber = 1;
    x: DataTable;

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
        // this.load();
        // this.datagrid.resizeLimit 
        this.datagrid.pagination = false;
    }

    // Load Class
    load() {
        this.route.params.subscribe(params => {
            this.id = params['id'];
            // Get Class Data
            this.classService.classList({uuid: this.id}).subscribe(data =>
                {
                    this.schoolClass = data.items[0];
                }
            );
            // Get Students
            this.classService.enrollmentList({classId: this.id}).subscribe(data =>
                {
                    this.students = data.items;
                    this.items = this.students;
                    this.itemCount = data['total'];
                    
                    // this.itemCount = this.items.length;
                    console.log(this.itemCount);
                }
            );
            // Get ClassUnit
            this.classService.unitList({classId: this.id}).subscribe(data =>
                {
                    this.classUnits = data.items;
                    // console.log(this.classUnits);
                    this.generateDays();
                }
            );
        });
    }

    protected createMainFormGroup(): FormGroup {
        return new FormGroup({
            // 'remark': new FormControl(null);
        });
    }

    onEdit(template: TemplateRef<any>) {
        this.mode = FormMode.E_EDIT;
        this.config.class = "modal-medium";
        this.modalRef = this.modalService.show(template, this.config);
    }

    onChanged($event) {
        this.modalRef.hide();
        this.load();
    }

    generateDays(){
        this.classDays = [];
        var runningDay: number = 0;
        for (let i=0;i<this.classUnits.length;i++) {
            if (runningDay == this.classUnits[i].date) {
            } else {
                runningDay = this.classUnits[i].date;
                let date = new Date(runningDay);
                let day = {
                    dateL: runningDay,
                    date: date,
                    dateD: date.getDate(),
                    weekDay: date.getDay(),
                    month: date.getMonth()+1

                }
                this.classDays.push(day);
  
            }
        }
        // console.log(this.classDays);
    }
}