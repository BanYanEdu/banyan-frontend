import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { SettingsService } from '../../settings.service';
import { BsModalService } from 'ngx-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseListComponent } from 'app/shared/components/BaseListComponent';
import { CommonService } from 'app/shared/services/common.service';
import { Facility } from 'app/model/settings/Facility';
import { FormControl, FormGroup } from '@angular/forms';
import { ActiveStatuses } from 'app/data/global/ActiveStatuses';
import { FormMode } from 'app/model/common/FormMode';

@Component({
    selector: 'app-facility-list',
    templateUrl: './facility-list.component.html'
})
export class FacilityListComponent extends BaseListComponent<Facility> implements OnInit {
    public mainForm: FormGroup;
    @ViewChild("searchValue") erSearchValue: ElementRef;
    activeStatuses: any[] = ActiveStatuses;
    mode: FormMode = FormMode.E_EDIT;
    outletId: string = "E_ALL";
    
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
        this.config.class="modal-medium";

        this.mainForm = new FormGroup({
            'outletId': new FormControl(null),
            'activeStatus': new FormControl(null),
            'searchValue': new FormControl(null),
            'seatCount': new FormControl(null),
        });
        this.erSearchValue.nativeElement.focus();
        this.mainForm.get('activeStatus').setValue(this.activeStatuses[1]);
        this.mainForm.get('searchValue').setValue("");
        this.mainForm.get('seatCount').setValue(0);
    }

    protected callDeleteItem(id: string, callbackFn: Function): void {
        // this.settingsService.outletDelete(id).subscribe(res => callbackFn(res));
    }

    protected callCheckItemInUse(id: string, callbackFn: Function): void {
        // this.mdService.checkSourceInUse(id, null).subscribe(inUse => callbackFn(inUse));
    }

    protected callLoadList(callbackFn: Function, errorFn: Function): void {
        this.params.activeStatus = this.mainForm.get('activeStatus').value;
        let searchValue = this.mainForm.get('searchValue').value;
        searchValue = searchValue.replace(/[*\\]/g, '');
        this.params.searchValue = searchValue; 
        this.mainForm.get('searchValue').setValue(searchValue);
        if (this.outletId != "E_ALL" ) {
            this.params.outletId = this.outletId;
        }
 
        let seatCount = this.mainForm.get('seatCount').value;
        if (seatCount == "") { seatCount = 0}
        this.params.seatCount = seatCount;

        // console.log(this.params);
        
        this.settingsService.facilityList(this.params).subscribe(data => callbackFn(data), error => errorFn(error));
    }
    onChangeOutlet(event) {
        this.outletId = event[0];
        this.onSearch();
    }

    onSearch() {
        this.dataTableRef.firstPage();
    }

}