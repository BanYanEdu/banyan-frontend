import { Component, ElementRef, Input, OnChanges, OnInit, TemplateRef } from '@angular/core';

import { CommonService } from 'app/shared/services/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { BaseComponent } from 'app/shared/components/BaseComponent';
import { FormMode } from 'app/model/common/FormMode';
import { SchoolClass } from 'app/model/class/SchoolClass';
import { ClassEnrollment } from 'app/model/class/ClassEnrollment';
import { BaseEditableModel } from 'app/shared/models/BaseEditableModel';
import { ClassService } from '../class.service';
import { Contact } from 'app/model/student/Contact';

@Component({
    selector: 'app-class-enrollment',
    templateUrl: './class-enrollment.component.html'
})
export class ClassEnrollmentComponent extends BaseComponent implements OnInit, OnChanges {
    @Input() class: SchoolClass;
    // @Input() id: string;
    @Input() contact: Contact;
    @Input() owner: string;
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
    classEnrollments: ClassEnrollment[];
    selectedItem: ClassEnrollment;

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

    ngOnChanges() {
        this.load();
    }

    load() {
        if (this.owner == "E_CLASS" && this.class) {
            this.classService.enrollmentList({ classId: this.class.uuid }).subscribe(data => {
                this.classEnrollments = data.items;
                this.itemCount = data['total'];
                // this.dataResource = new DataTableResource(this.classEnrollments);
            })
        }
        if (this.owner == "E_STUDENT" && this.contact) {
            this.classService.enrollmentList({ contactId: this.contact.uuid }).subscribe(data => {
                this.classEnrollments = data.items;
                this.itemCount = data['total'];
                // this.dataResource = new DataTableResource(this.classEnrollments);
            })
        }
    }

    onChanged($event) {
        this.modalRef.hide();
        this.load();
        // this.refreshedTime = this.refreshedTime + 1;
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
    onTransfer(template: TemplateRef<any>, item: BaseEditableModel) {
        this.mode = FormMode.E_ADD;
        this.config.class = "modal-medium";
        this.selectedItem = item;
        this.modalRef = this.modalService.show(template, this.config);
    }
    
}