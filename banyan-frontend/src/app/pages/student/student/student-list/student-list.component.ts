import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseListComponent } from 'app/shared/components/BaseListComponent';
import { CommonService } from 'app/shared/services/common.service';
import { StudentService } from '../../student.service';
import { Contact } from 'app/model/student/Contact';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormMode } from 'app/model/common/FormMode';
import { ActiveStatuses } from 'app/data/global/ActiveStatuses';
import { DataTable } from 'inet-ui';

@Component({
    selector: 'app-student-list',
    templateUrl: './student-list.component.html'
})
export class StudentListComponent extends BaseListComponent<Contact> implements OnInit, OnDestroy {
    public mainForm: FormGroup;
    @ViewChild("searchValue") erSearchValue: ElementRef;
    activeStatuses: any[] = ActiveStatuses;
    mode: FormMode = FormMode.E_EDIT;
    outletId: string = localStorage.getItem("currentOutletId");
    x: DataTable;

    constructor(
        commonService: CommonService,
        protected studentService: StudentService,
        protected modalService: BsModalService,
        protected router: Router,
        protected route: ActivatedRoute
    ) {
        super(commonService, modalService, router);
    }

    ngOnInit() {
        this.mainForm = new FormGroup({
            'outletId': new FormControl(null),
            'activeStatus': new FormControl(null),
            'searchValue': new FormControl(null)
        });
        this.erSearchValue.nativeElement.focus();
        this.mainForm.get('activeStatus').setValue(this.activeStatuses[1]);
        this.mainForm.get('searchValue').setValue("");
    }

    protected callDeleteItem(id: string, callbackFn: Function): void {
        // this.settingsService.outletDelete(id).subscribe(res => callbackFn(res));
    }

    protected callCheckItemInUse(id: string, callbackFn: Function): void {
        // this.mdService.checkSourceInUse(id, null).subscribe(inUse => callbackFn(inUse));
    }

    protected callLoadList(callbackFn: Function, errorFn: Function): void {
        var criteria: any = this.params;
        criteria.activeStatus = this.mainForm.get('activeStatus').value;
        let searchValue = this.mainForm.get('searchValue').value;
        searchValue = searchValue.replace(/[*\\]/g, '');
        criteria.searchValue = searchValue;
        this.mainForm.get('searchValue').setValue(searchValue);
        if (this.outletId != "E_ALL") {
            criteria.outletId = this.outletId;
        }

        this.studentService.studentList(criteria).subscribe(data => callbackFn(data), error => errorFn(error));
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

    ngOnDestroy() { }
}