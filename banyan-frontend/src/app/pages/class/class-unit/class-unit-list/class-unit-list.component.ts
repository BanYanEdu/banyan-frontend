import { Component, ElementRef, Input, OnChanges, OnInit, TemplateRef } from '@angular/core';

import { CommonService } from 'app/shared/services/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { BaseComponent } from 'app/shared/components/BaseComponent';
import { FormMode } from 'app/model/common/FormMode';
import { SchoolClass } from 'app/model/class/SchoolClass';
import { BaseEditableModel } from 'app/shared/models/BaseEditableModel';
import { ClassService } from '../../class.service';
import { ClassSession } from 'app/model/class/ClassSession';
import { DataTable } from 'inet-ui';
import { ClassUnit } from 'app/model/class/ClassUnit';

@Component({
    selector: 'app-class-unit-list',
    templateUrl: './class-unit-list.component.html'
})
export class ClassUnitListComponent extends BaseComponent implements OnInit, OnChanges {
    @Input() class: SchoolClass;
    @Input() classId: string;
    itemCount = 0;
    pageNumber = 1;
    pageLimit = 10;
    protected params: any; // to reload data
    mode: FormMode = FormMode.E_EDIT;
    modalRef: BsModalRef;
    config = {
        backdrop: false,
        ignoreBackdropClick: true,
        class: 'modal-xl'
    };
    items: ClassUnit[] = [];
    selectedItem: ClassUnit;
    selectedDate: Date;
    classStudySubjects: any[] = [];
    classLecturers: any[] = [];
    dataTable: DataTable;

    constructor(
        element: ElementRef,
        protected modalService: BsModalService,
        private classService: ClassService,
        protected commonService: CommonService,
        protected route: ActivatedRoute,
        protected router: Router
    ) { super(commonService) }

    ngOnInit() {
        // this.load(this.params);
    }

    ngOnChanges() {
        if (this.params) {
            this.load(this.params);
        }
    }

    load(params: any) {
        this.params = params;
        if (this.params) {
            this.params.classId = this.classId;
        }
        
        this.classService.unitList(this.params).subscribe(data => {
            this.items = data.items;
            this.itemCount = data['total'];
        })

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

    onChanged($event) {
        this.modalRef.hide();
        this.load(this.params);
    }

    onAdd(template: TemplateRef<any>) {
        this.mode = FormMode.E_ADD;
        this.config.class = "modal-xl";
        this.modalRef = this.modalService.show(template, this.config);
    }
    onEdit(template: TemplateRef<any>, item: BaseEditableModel) {
        this.mode = FormMode.E_EDIT;
        this.config.class = "modal-xl";
        this.selectedItem = item;
        this.selectedDate = new Date(this.selectedItem.date);
        this.modalRef = this.modalService.show(template, this.config);
    }
    onGenerate() {
        this.classService.unitGenerate(this.classId).subscribe(data => {
            this.showMessage('MESSAGE.DATA_SAVED', 'MESSAGE.NOTIFICATION');
            this.load(this.params);
        });
        
    }
}