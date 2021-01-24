import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';

import { CommonService } from 'app/shared/services/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { BaseComponent } from 'app/shared/components/BaseComponent';
import { FormMode } from 'app/model/common/FormMode';
import { BaseEditableModel } from 'app/shared/models/BaseEditableModel';
import { CourseStudySubject } from 'app/model/settings/CourseStudySubject';
import { DataTable } from 'inet-ui';

@Component({
    selector: 'app-course-study-subject-list',
    templateUrl: './course-study-subject-list.component.html'
})
export class CourseStudySubjectListComponent extends BaseComponent implements OnInit, OnChanges {
    @Input() inputItems: CourseStudySubject[];
    @Input() courseId: string;
    @Output() valueChange = new EventEmitter();
    items: CourseStudySubject[];
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
    totalUnitCount: number;
    dataTable = DataTable;

    constructor(
        protected modalService: BsModalService,
        protected commonService: CommonService,
        protected route: ActivatedRoute,
        protected router: Router
    ) { super(commonService) }

    ngOnInit() {
    }

    ngOnChanges() {
        // console.log(this.inputItems);
        this.items = this.inputItems;
        this.load();
    }

    load() {
        if (this.items) {
            this.itemCount = this.items.length;
            this.totalUnitCount = this.items.reduce((sum, curr) => sum + Number(curr.unitCount), 0);
        }
    }

    onChanged($event) {
        this.modalRef.hide();
        this.valueChange.emit();
        // this.load();
    }

    onEdit(template: TemplateRef<any>, item: BaseEditableModel) {
        this.mode = FormMode.E_EDIT;
        this.config.class = "modal-xl";
        this.modalRef = this.modalService.show(template, this.config);
    }
}