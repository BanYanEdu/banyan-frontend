import { Component, ElementRef, Input, OnChanges, OnInit, TemplateRef } from '@angular/core';

import { CommonService } from 'app/shared/services/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { BaseComponent } from 'app/shared/components/BaseComponent';
import { FormMode } from 'app/model/common/FormMode';
import { BaseEditableModel } from 'app/shared/models/BaseEditableModel';
import { Examination } from 'app/model/exam/Examination';
import { ExamService } from '../../exam.service';
import { Exam } from 'app/model/exam/Exam';

@Component({
    selector: 'app-examination-exam-list',
    templateUrl: './examination-exam-list.component.html'
})
export class ExaminationExamListComponent extends BaseComponent implements OnInit, OnChanges {
    @Input() examination: Examination;
    @Input() examinationId: string;
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
    items: Exam[];
    selectedItem: Exam;

    constructor(
        element: ElementRef,
        protected modalService: BsModalService,
        private examService: ExamService,
        protected commonService: CommonService,
        protected route: ActivatedRoute,
        protected router: Router
    ) { super(commonService) }

    ngOnInit() {
        
        this.load();
    }

    ngOnChanges() {
        this.load();
    }

    load() {

        this.examService.examList({ examinationId: this.examinationId }).subscribe(data => {
            this.items = data.items;
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