import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseListComponent } from 'app/shared/components/BaseListComponent';
import { CommonService } from 'app/shared/services/common.service';
import { FormControl, FormGroup } from '@angular/forms';
import { FormMode } from 'app/model/common/FormMode';
import { SettingsService } from '../../settings.service';
import { CourseExamination } from 'app/model/settings/CourseExamination';
import { ConfirmDialogComponent, DialogAction } from 'inet-ui';

@Component({
    selector: 'app-course-examination-list',
    templateUrl: './course-examination-list.component.html'
})
export class CourseExaminationListComponent extends BaseListComponent<CourseExamination> implements OnInit{
    public mainForm: FormGroup;
    mode: FormMode = FormMode.E_EDIT;
    @Input() courseId: string;
    @ViewChild(ConfirmDialogComponent) confirmDialog: ConfirmDialogComponent;
    toDeleteItemId: string;
    
    constructor(
        commonService: CommonService,
        protected settingsService: SettingsService,
        protected modalService: BsModalService,
        protected router: Router,
        protected route: ActivatedRoute
    ) {
        super(commonService, modalService, router);
    }

    ngOnInit() {
        this.config.class="modal-xl";

        this.mainForm = new FormGroup({
            
        });
        // this.erSearchValue.nativeElement.focus();
    }

    protected callDeleteItem(id: string, callbackFn: Function): void {
        this.settingsService.courseExaminationDelete(id).subscribe(res => callbackFn(res));
    }

    protected callCheckItemInUse(id: string, callbackFn: Function): void {
        // this.mdService.checkSourceInUse(id, null).subscribe(inUse => callbackFn(inUse));
    }

    protected callLoadList(callbackFn: Function, errorFn: Function): void {
        this.settingsService.courseExaminationList({courseId: this.courseId}).subscribe(data => callbackFn(data), error => errorFn(error));
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
        this.settingsService.courseExaminationDelete(this.toDeleteItemId).subscribe(data => {
            this.load(this.params);
        })
    }

}
