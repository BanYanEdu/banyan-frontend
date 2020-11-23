import { Component, ElementRef, Input, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { CommonService } from 'app/shared/services/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { BaseComponent } from 'app/shared/components/BaseComponent';
import { FormMode } from 'app/model/common/FormMode';
import { Course } from 'app/model/class/Course';
import { ClassService } from '../class.service';

@Component({
    selector: 'app-course-view',
    templateUrl: './course-view.component.html'
})
export class CourseViewComponent extends BaseComponent {
    id: string;
    // refreshedTime: number = 0;
    item: Course;
    mode: FormMode = FormMode.E_EDIT;
    unitCount: number = 0;
    // activities: any[] = [];
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
        this.load();   
    }

    load() {
        this.route.params.subscribe(params => {
            this.id = params['id'];
            this.classService.courseList({uuid: this.id}).subscribe(data =>
                {
                    this.item = data.items[0];
                    this.unitCount = this.item.studySubjects.reduce((accum: number, item) => accum + item.unitCount, 0) ;
                }
            );
        });
    }

    protected createMainFormGroup(): FormGroup {
        return new FormGroup({
            'remark': new FormControl(null)
        });
    }
    

    onEdit(template: TemplateRef<any>) {
        // this.selectedItem = <TModel>item;
        this.mode = FormMode.E_EDIT;
        this.modalRef = this.modalService.show(template, this.config);
    }

    onChanged($event) {
        this.modalRef.hide();
        this.load();
        // this.refreshedTime = this.refreshedTime + 1;
    }

    onAssign(template: TemplateRef<any>) {
        this.mode = FormMode.E_EDIT;
        this.modalRef = this.modalService.show(template, this.config);
    }


}