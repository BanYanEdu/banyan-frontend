import { Component, ElementRef, Input, OnChanges, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { CommonService } from 'app/shared/services/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { BaseComponent } from 'app/shared/components/BaseComponent';
import { FormMode } from 'app/model/common/FormMode';
import { ClassStudySubject } from 'app/model/class/ClassStudySubject';
import { BaseEditableModel } from 'app/shared/models/BaseEditableModel';
import { SettingsService } from '../../settings.service';

@Component({
    selector: 'app-course-study-subject-list',
    templateUrl: './course-study-subject-list.component.html'
})
export class CourseStudySubjectListComponent extends BaseComponent implements OnInit, OnChanges {
    @Input() items: ClassStudySubject[];
    @Input() courseId: string;
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

    constructor(
        protected modalService: BsModalService,
        private settingsService: SettingsService,
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
    }

    onChanged($event) {
        this.modalRef.hide();
        this.load();
    }

    onEdit(template: TemplateRef<any>, item: BaseEditableModel) {
        this.mode = FormMode.E_EDIT;
        this.config.class = "modal-xl";
        this.modalRef = this.modalService.show(template, this.config);
    }
}