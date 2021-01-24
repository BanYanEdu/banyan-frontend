import { Component, ElementRef, Input, OnChanges, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { CommonService } from 'app/shared/services/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { BaseComponent } from 'app/shared/components/BaseComponent';
import { FormMode } from 'app/model/common/FormMode';
import { SchoolClass } from 'app/model/class/SchoolClass';
import { BaseEditableModel } from 'app/shared/models/BaseEditableModel';
import { Examination } from 'app/model/exam/Examination';
import { ExamService } from 'app/pages/exam/exam.service';

@Component({
    selector: 'app-class-examination-list',
    templateUrl: './class-examination-list.component.html'
})
export class ClassExaminationListComponent extends BaseComponent implements OnInit, OnChanges {
    @Input() class: SchoolClass;
    @Input() classId: string;
    itemCount = 0;
    pageNumber = 1;
    protected params: any; // to reload data
    mode: FormMode = FormMode.E_EDIT;
    modalRef: BsModalRef;
    config = {
        backdrop: false,
        ignoreBackdropClick: true,
        class: 'modal-xl'
    };
    items: Examination[];
    selectedItem: Examination;

    constructor(
        protected modalService: BsModalService,
        private examService: ExamService,
        protected commonService: CommonService,
        protected route: ActivatedRoute,
        protected router: Router
    ) { super(commonService) }

    ngOnInit() {
        // this.load();
    }

    ngOnChanges() {
        this.load();
    }

    load() {
        this.examService.examinationList({ classId: this.classId }).subscribe(data => {
            this.items = data.items;
            // console.log(this.items);
            this.itemCount = data['total'];
        })
    }

    onChanged($event) {
        this.modalRef.hide();
        this.load();
    }

    onAdd(template: TemplateRef<any>) {
        this.mode = FormMode.E_ADD;
        this.config.class = "modal-medium";
        this.modalRef = this.modalService.show(template, this.config);
    }
    onEdit(template: TemplateRef<any>, item: BaseEditableModel) {
        this.mode = FormMode.E_EDIT;
        this.config.class = "modal-medium";
        this.selectedItem = item;
        this.modalRef = this.modalService.show(template, this.config);
    }
    
}