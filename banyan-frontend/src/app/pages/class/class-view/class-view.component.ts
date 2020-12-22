import { Component, ElementRef, Input, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { CommonService } from 'app/shared/services/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { BaseComponent } from 'app/shared/components/BaseComponent';
import { FormMode } from 'app/model/common/FormMode';
import { SchoolClass } from 'app/model/class/SchoolClass';
import { ClassEnrollment } from 'app/model/class/ClassEnrollment';
import { ClassService } from '../class.service';

@Component({
    selector: 'app-class-view',
    templateUrl: './class-view.component.html'
})
export class ClassViewComponent extends BaseComponent {
    id: string;
    item: SchoolClass;
    mode: FormMode = FormMode.E_EDIT;
    unitCount: number = 0;
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
            this.classService.classList({uuid: this.id}).subscribe(data =>
                {
                    this.item = data.items[0];
                    if (this.item.studySubjects) {
                        this.unitCount = this.item.studySubjects.reduce((accum: number, item) => accum + item.unitCount, 0) ;
                        
                    }
                }
            );
        });
    }

    protected createMainFormGroup(): FormGroup {
        return new FormGroup({
            // 'remark': new FormControl(null);
        });
    }

    onEdit(template: TemplateRef<any>) {
        this.mode = FormMode.E_EDIT;
        this.config.class = "modal-medium";
        this.modalRef = this.modalService.show(template, this.config);
    }

    onChanged($event) {
        this.modalRef.hide();
        this.load();
        // this.refreshedTime = this.refreshedTime + 1;
    }

    onAssign(template: TemplateRef<any>) {
        this.mode = FormMode.E_EDIT;
        this.config.class = "modal-xl";
        this.modalRef = this.modalService.show(template, this.config);
    }
}