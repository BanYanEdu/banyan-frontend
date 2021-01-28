import { Component, ElementRef, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { CommonService } from 'app/shared/services/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { BaseComponent } from 'app/shared/components/BaseComponent';
import { FormMode } from 'app/model/common/FormMode';
import { ClassUnit } from 'app/model/class/ClassUnit';
import { ClassService } from '../../class.service';
import { SchoolClass } from 'app/model/class/SchoolClass';
import { ConfirmDialogComponent, DialogAction } from 'inet-ui';

@Component({
    selector: 'app-class-unit-embed-view',
    templateUrl: './class-unit-embed-view.component.html'
})
export class ClassUnitEmbedViewComponent extends BaseComponent {
    @Input() classUnit: ClassUnit;
    @Input() classUnitId: string;
    @Input() class: SchoolClass;
    @Input() classStudySubjects: any[];
    @Input() classLecturers: any[];
    @Output() valueChange = new EventEmitter();
    @ViewChild(ConfirmDialogComponent) confirmDialog: ConfirmDialogComponent;

    // item: ClassUnit;
    assignment: any;
    mode: FormMode = FormMode.E_EDIT;
    date: Date;

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
    ) { super(commonService) }

    ngOnInit() {
        this.load();
    }

    load() {
            this.date = new Date(this.classUnit.date);
            this.assignment = this.classUnit.assignments[0];
    }

    protected createMainFormGroup(): FormGroup {
        return new FormGroup({
            // 'remark': new FormControl(null);
        });
    }

    onEdit(template: TemplateRef<any>) {
        this.mode = FormMode.E_EDIT;
        this.config.class = "modal-xl";
        this.modalRef = this.modalService.show(template, this.config);
    }

    onAdd(template: TemplateRef<any>) {
        this.mode = FormMode.E_ADD;
        this.config.class = "modal-xl";
        this.modalRef = this.modalService.show(template, this.config);
    }

    onChanged($event) {
        this.modalRef.hide();
        this.load();
        this.valueChange.emit();
        // this.refreshedTime = this.refreshedTime + 1;
    }

    getColor(status) {
        switch (status) {
            case 'E_PLANNING':
                return '#FAFBFC';
            case 'E_PLANNED':
                return '#FFF4CC';
            case 'E_RELEASED':
                return '#C9FCD3';
            case 'E_CANCELLED':
                return '#FFDCD8'
        }
    }

    getBorderLine(doubleUnit) {
        if (doubleUnit) return 'double';
        else return '1px solid';

    }

    // onSplit(template: TemplateRef<any>) {
    //     this.mode = FormMode.E_EDIT;
    //     this.config.class = "modal-xl";
    //     this.modalRef = this.modalService.show(template, this.config);
    // }

    onSplit() {
        const modalDeleteActions = [
            new DialogAction('OK', 'btn-default', 'fa fa-check', this.split.bind(this)),
            new DialogAction('CANCEL', 'btn-default', 'fa fa-remove', this.confirmDialog.hide)
        ];

        this.confirmDialog.setActions(modalDeleteActions);
        this.confirmDialog.show();
    }

    split() {
        this.confirmDialog.hide();

        this.classService.unitSplit(this.classUnitId).subscribe(data => {
            this.valueChange.emit();
            // this.load(this.params);
        })
    }
}