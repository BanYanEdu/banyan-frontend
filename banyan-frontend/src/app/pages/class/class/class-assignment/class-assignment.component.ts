import { Component, ElementRef, Input, OnChanges, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { CommonService } from 'app/shared/services/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { BaseComponent } from 'app/shared/components/BaseComponent';
import { FormMode } from 'app/model/common/FormMode';
import { SchoolClass } from 'app/model/class/SchoolClass';
import { BaseEditableModel } from 'app/shared/models/BaseEditableModel';
import { ClassService } from '../../class.service';
import { Employee } from 'app/model/employee/Employee';
import { ClassAssignment } from 'app/model/class/ClassAssignment';

@Component({
    selector: 'app-class-assignment',
    templateUrl: './class-assignment.component.html'
})
export class ClassAssignmentComponent extends BaseComponent implements OnInit, OnChanges {
    @Input() class: SchoolClass;
    @Input() employee: Employee;
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
    items: ClassAssignment[];
    selectedItem: ClassAssignment;

    constructor(
        element: ElementRef,
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
        this.load();
    }

    load() {
        if (this.owner == "E_CLASS" && this.class) {
            this.classService.assignmentList({ classId: this.class.uuid }).subscribe(data => {
                this.items = data.items;
                this.itemCount = data['total'];
            })
        }
        if (this.owner == "E_EMPLOYEE" && this.employee) {
            this.classService.assignmentList({ employeeId: this.employee.uuid }).subscribe(data => {
                this.items = data.items;
                this.itemCount = data['total'];
            })
        }
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