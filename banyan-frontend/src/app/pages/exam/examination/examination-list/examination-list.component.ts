import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseListComponent } from 'app/shared/components/BaseListComponent';
import { CommonService } from 'app/shared/services/common.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ExamStatuses } from 'app/data/global/ExamStatuses';
import { FormMode } from 'app/model/common/FormMode';
import { Examination } from 'app/model/exam/Examination';
import { ExamService } from '../../exam.service';

@Component({
    selector: 'app-examination-list',
    templateUrl: './examination-list.component.html'
})
export class ExaminationListComponent extends BaseListComponent<Examination> implements OnInit{
    public mainForm: FormGroup;
    @ViewChild("searchValue") erSearchValue: ElementRef;
    mode: FormMode = FormMode.E_EDIT;
    outletId: string = localStorage.getItem("currentOutletId");
    statuses: any[] =['E_PLANNING','E_IN_PROCESS'];
    examStatuses: any[] = ExamStatuses;
    
    constructor(
        commonService: CommonService,
        protected examService: ExamService,
        protected modalService: BsModalService,
        protected router: Router,
        protected route: ActivatedRoute
    ) {
        super(commonService, modalService, router);
    }

    ngOnInit() {
        this.config.class="modal-medium";

        this.mainForm = new FormGroup({
            'statuses': new FormControl(null),
            'searchValue': new FormControl(null)
        });
        this.erSearchValue.nativeElement.focus();
        this.mainForm.get('statuses').setValue(this.statuses);
        this.mainForm.get('searchValue').setValue("");
    }

    protected callDeleteItem(id: string, callbackFn: Function): void {
        // this.settingsService.outletDelete(id).subscribe(res => callbackFn(res));
    }

    protected callCheckItemInUse(id: string, callbackFn: Function): void {
        // this.mdService.checkSourceInUse(id, null).subscribe(inUse => callbackFn(inUse));
    }

    protected callLoadList(callbackFn: Function, errorFn: Function): void {
        let searchValue = this.mainForm.get('searchValue').value;
        searchValue = searchValue.replace(/[*\\]/g, '');
        this.params.searchValue = searchValue; 
        this.mainForm.get('searchValue').setValue(searchValue);
        if (this.outletId != "E_ALL" ) {
            this.params.outletId = this.outletId;
        }
        this.statuses = this.mainForm.get('statuses').value;
        this.params.statuses = this.statuses;
        
        this.examService.examinationList(this.params).subscribe(data => callbackFn(data), error => errorFn(error));
    }

    onSearch() {
        this.dataTableRef.firstPage();
    }
    onChangeOutlet(event) {
        if (this.outletId != event[0]) {
            this.outletId = event[0];
            this.onSearch();
        }
    }
    onChangeStatus() {
        this.onSearch();
    }
}
