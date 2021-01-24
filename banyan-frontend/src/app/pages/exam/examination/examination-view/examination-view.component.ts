import { Component, ElementRef, Input, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { CommonService } from 'app/shared/services/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { BaseComponent } from 'app/shared/components/BaseComponent';
import { FormMode } from 'app/model/common/FormMode';
import { Course } from 'app/model/settings/Course';
import { ExamService } from '../../exam.service';
import { Examination } from 'app/model/exam/Examination';

@Component({
    selector: 'app-examination-view',
    templateUrl: './examination-view.component.html'
})
export class ExaminationViewComponent extends BaseComponent {
    id: string;
    // refreshedTime: number = 0;
    item: Examination;
    mode: FormMode = FormMode.E_EDIT;
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
        private examService: ExamService,
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
            this.examService.examinationList({uuid: this.id}).subscribe(data =>
                {
                    this.item = data.items[0];
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
        this.config.class="modal-medium";
        this.modalRef = this.modalService.show(template, this.config);
    }

    onChanged($event) {
        this.modalRef.hide();
        this.load();
        // this.refreshedTime = this.refreshedTime + 1;
    }
}