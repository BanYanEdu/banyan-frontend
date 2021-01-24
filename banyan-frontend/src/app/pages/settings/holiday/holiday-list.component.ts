import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { SettingsService } from '../settings.service';
import { BsModalService } from 'ngx-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseListComponent } from 'app/shared/components/BaseListComponent';
import { CommonService } from 'app/shared/services/common.service';
import { ConfirmDialogComponent, DataTableResource, DialogAction } from 'inet-ui';
import { Holiday } from 'app/model/settings/Holiday';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-holiday-list',
    templateUrl: './holiday-list.component.html'
})
export class HolidayListComponent extends BaseListComponent<Holiday> implements OnInit, OnDestroy {
    public mainForm: FormGroup;
    years: any[] = [];
    currentYear: number = new Date().getFullYear();
    selectedYear: any;
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
        this.config.class="modal-medium";

        this.currentYear = new Date().getFullYear();
        for (let i=0;i<4;i++) {
            this.years.push(this.currentYear -1 + i);
        }
        this.selectedYear = this.currentYear.toString();
    }

    protected callDeleteItem(id: string, callbackFn: Function): void {
        this.settingsService.holidayDelete(id).subscribe(res => callbackFn(res));
    }

    protected callCheckItemInUse(id: string, callbackFn: Function): void {
        // this.mdService.checkSourceInUse(id, null).subscribe(inUse => callbackFn(inUse));
    }

    protected callLoadList(callbackFn: Function, errorFn: Function): void {
        var criteria: any;
        criteria = {
            year: this.selectedYear
        }
        // this.dataResource = new DataTableResource([]);
        this.settingsService.holidayList(criteria).subscribe(data => callbackFn(data), error => errorFn(error));
    }

    ngOnDestroy() {

    }

    onSearch() {
        this.load(null);
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
        this.settingsService.holidayDelete(this.toDeleteItemId).subscribe(data => {
            this.load(this.params);
        })
    }
}