import { Component, ElementRef, Input, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { CommonService } from 'app/shared/services/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { BaseComponent } from 'app/shared/components/BaseComponent';
import { FormMode } from 'app/model/common/FormMode';
import { Contact } from 'app/model/student/Contact';
import { StudentService } from '../student.service';

@Component({
    selector: 'app-student-view',
    templateUrl: './student-view.component.html'
})
export class StudentViewComponent extends BaseComponent {
    id: string;
    type: string = "E_DEAL";
    refreshedTime: number = 0;
    item: Contact;
    converted: boolean = false;
    mode: FormMode;
    activities: any[] = [];
    modalRef: BsModalRef;
    config = {
        backdrop: false,
        ignoreBackdropClick: true,
        class: 'modal-xl'
    };

    constructor(
        element: ElementRef,
        protected modalService: BsModalService,
        private studentService: StudentService,
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
            this.studentService.studentList({uuid: this.id}).subscribe(data =>
                {
                    // this.item = data.items[0];
                    this.item = {code: "001", name: "Nguyễn Duy Tân"};

                    // console.log(this.item);
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
        this.refreshedTime = this.refreshedTime + 1;
        
    }

}