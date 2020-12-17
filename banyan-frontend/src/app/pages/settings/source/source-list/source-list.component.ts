import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseListComponent } from 'app/shared/components/BaseListComponent';
import { CommonService } from 'app/shared/services/common.service';
import { Source } from 'app/model/settings/Source';
import { FormControl, FormGroup } from '@angular/forms';
import { ActiveStatuses } from 'app/data/global/ActiveStatuses';
import { FormMode } from 'app/model/common/FormMode';
import { SettingsService } from '../../settings.service';

@Component({
    selector: 'app-source-list',
    templateUrl: './source-list.component.html'
})
export class SourceListComponent extends BaseListComponent<Source> implements OnInit {
    public mainForm: FormGroup;
    @ViewChild("searchValue") erSearchValue: ElementRef;
    activeStatuses: any[] = ActiveStatuses;
    mode: FormMode = FormMode.E_EDIT;
    
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
        this.params.activeStatus = this.mainForm.get('activeStatus').value;
        let searchValue = this.mainForm.get('searchValue').value;
        searchValue = searchValue.replace(/[*\\]/g, '');
        this.params.searchValue = searchValue; 
        this.mainForm.get('searchValue').setValue(searchValue);
        
        this.settingsService.sourceList(this.params).subscribe(data => callbackFn(data), error => errorFn(error));
    }
    onSearch() {
        this.dataTableRef.firstPage();
    }

}