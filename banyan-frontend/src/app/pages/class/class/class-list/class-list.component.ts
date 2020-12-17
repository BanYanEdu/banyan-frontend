import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseListComponent } from 'app/shared/components/BaseListComponent';
import { CommonService } from 'app/shared/services/common.service';
import { SchoolClass } from 'app/model/class/SchoolClass';
import { FormControl, FormGroup } from '@angular/forms';
import { FormMode } from 'app/model/common/FormMode';
import { ClassStatuses } from 'app/data/global/ClassStatuses';
import { ServiceStatuses } from 'app/data/global/ServiceStatuses';
import { ClassService } from '../../class.service';

@Component({
    selector: 'app-class-list',
    templateUrl: './class-list.component.html'
})
export class ClassListComponent extends BaseListComponent<SchoolClass> implements OnInit {
    public mainForm: FormGroup;
    @ViewChild("searchValue") erSearchValue: ElementRef;
    mode: FormMode = FormMode.E_EDIT;
    programId: string ="E_ALL";
    outletId: string = "E_ALL";
    classStatuses: any[] = ClassStatuses;
    statuses: any[] =['E_PLANNING','E_RECRUITING', 'E_STARTED'];
    serviceStatuses: any[] = ServiceStatuses;
    
    constructor(
        commonService: CommonService,
        protected classService: ClassService,
        protected modalService: BsModalService,
        protected router: Router,
        protected route: ActivatedRoute
    ) {
        super(commonService, modalService, router);
    }

    ngOnInit() {
        this.config.class="modal-medium";

        this.mainForm = new FormGroup({
            'searchValue': new FormControl(null),
            'statuses': new FormControl(null),
        });
        this.erSearchValue.nativeElement.focus();
        this.mainForm.get('searchValue').setValue("");
        this.mainForm.get('statuses').setValue(this.statuses);
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
        if (this.programId != "E_ALL" ) {
            this.params.programId = this.programId;
        }
        if (this.outletId != "E_ALL" ) {
            this.params.outletId = this.outletId;
        }
        this.statuses = this.mainForm.get('statuses').value;
        this.params.statuses = this.statuses;

        this.classService.classList(this.params).subscribe(data => callbackFn(data), error => errorFn(error));
    }

    onSearch() {
        this.dataTableRef.firstPage();
    }
    onChangeProgram(event) {
        this.programId = event[0];
        this.onSearch();
    }
    onChangeOutlet(event) {
        this.outletId = event[0];
        this.onSearch();
    }
    onChangeStatus() {
        this.onSearch();
    }
    onChangeServiceStatus() {
        this.onSearch();
    }

}
