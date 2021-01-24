import { Component, ElementRef, Input, OnChanges, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { CommonService } from 'app/shared/services/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { BaseComponent } from 'app/shared/components/BaseComponent';
import { FormMode } from 'app/model/common/FormMode';
import { ClassStudySubject } from 'app/model/class/ClassStudySubject';
import { BaseEditableModel } from 'app/shared/models/BaseEditableModel';
import { ClassService } from '../../class.service';
import { ConfirmDialogComponent, DialogAction } from 'inet-ui';
import { SchoolClass } from 'app/model/class/SchoolClass';

@Component({
    selector: 'app-class-study-subject-list',
    templateUrl: './class-study-subject-list.component.html'
})
export class ClassStudySubjectListComponent extends BaseComponent implements OnInit, OnChanges {
    @Input() classId: string;
    @Input() class: SchoolClass;
    @ViewChild(ConfirmDialogComponent) confirmDialog: ConfirmDialogComponent;
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
    items: ClassStudySubject[];
    selectedItem: ClassStudySubject;
    toDeleteItemId: string;
    totalUnitCount: number;

    constructor(
        protected modalService: BsModalService,
        private classService: ClassService,
        protected commonService: CommonService,
        protected route: ActivatedRoute,
        protected router: Router
    ) { super(commonService) }

    ngOnInit() {
        // this.load();
    }

    ngOnChanges() {
        // this.load();
    }

    load() {
        this.classService.studySubjectList({ classId: this.classId }).subscribe(data => {
            this.items = data.items;
            // console.log(this.items);
            this.itemCount = data['total'];
            this.totalUnitCount = this.items.reduce((sum, curr) => sum + Number(curr.unitCount), 0);
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
    onDelete(id: any) {
        this.toDeleteItemId = id;
        const modalDeleteActions = [
            new DialogAction('OK', 'btn-default', 'fa fa-check', this.delete.bind(this)),
            new DialogAction('CANCEL', 'btn-default', 'fa fa-remove', this.confirmDialog.hide)
        ];

        this.confirmDialog.setActions(modalDeleteActions);
        this.confirmDialog.show();
    }

    delete() {
        this.confirmDialog.hide();
        this.classService.studySubjectDelete(this.toDeleteItemId).subscribe(data => {
            this.load();
        })
    }
}