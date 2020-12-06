import { OnInit, Input, Output, EventEmitter, ElementRef, ViewChildren, AfterViewInit } from '@angular/core';
import { QueryList } from '@angular/core/src/render3';
import { FormGroup } from '@angular/forms';

import { FormMode } from 'app/model/common/FormMode';
import { BaseDialogComponent } from "app/shared/components/BaseDialogComponent"
import { CommonService } from 'app/shared/services/common.service';
import { BaseEditableModel } from '../models/BaseEditableModel';

export class BaseAddDialogComponent<TModel extends BaseEditableModel> extends BaseDialogComponent implements OnInit {
    @Input() item: TModel;
    @Input() mode: FormMode;
    @Output() valueChange = new EventEmitter();

    constructor(
        element: ElementRef,
        protected commonService: CommonService
    ) {
        super(element, commonService);
    }

    public mainForm: FormGroup;
    public requestItem: TModel = <TModel>{};

    ngOnInit() {
        // Create form group & form control
        this.mainForm = this.createMainFormGroup();

        if (this.mode === FormMode.E_EDIT) {
            if (this.mainForm.get(this.businessIdField)) {
                this.mainForm.get(this.businessIdField).disable();
            }
            this.mainForm.patchValue(this.item)

            this.requestItem = this.item;
        } else {
            this.mainForm.patchValue({
                inactive: false,
                duration: 0,
                sortIndex: 10
            });
        }
        this.patchInitializedMainForm(this.mainForm);
        this.onInit();
    }
    public onInit(): void {

    }

    // Virtual method
    protected patchInitializedMainForm(mainForm: FormGroup) {

    }

    // Virtual method 
    protected createMainFormGroup(): FormGroup {
        return null;
    }
    // Virtual method need to override
    protected callSearch(input: any, callbackFn: Function): void {

    }
    // Virtual method need to override
    protected callAddItem(requestItem: TModel, callbackFn: Function): void {

    }
    // Virtual method need to override
    protected callUpdateItem(requestItem: TModel, callbackFn: Function): void {

    }
    // Virtual method 
    protected populateAdditionalFormValue(): void {

    }
    // Virtual method
    public get isFormValid(): boolean {
        return this.mainForm.valid;
    }
    protected populateFormValue(): void {
        
        Object.assign(this.requestItem, <TModel>this.mainForm.getRawValue());

        this.requestItem.organId = iNet.organId;
        // this.requestItem.createdByCode = iNet.username;
        // this.requestItem.createdByName = iNet.displayName;
        // this.requestItem.createdAt = new Date().getTime();

        this.populateAdditionalFormValue();
    }
    protected get businessIdField() {
        return "code";
    }
    onSave() {
        if (this.mode === FormMode.E_ADD) {
            let businessIdValue = this.mainForm.get(this.businessIdField) && this.mainForm.get(this.businessIdField).value;
            if (businessIdValue) {
                // check unique business id
                // console.log("Check code  ....");
                let criteria = {};
                criteria[this.businessIdField] = businessIdValue;
                this.callSearch(criteria, data => {
                    if (data.total === 0) {  // Code does not exist
                        this.doSave();
                    } else {
                        this.focusTo("#" + this.businessIdField);
                        this.mainForm.get(this.businessIdField).setErrors({ 'existed': true });
                        return;
                    }
                });
            } else {
                // console.log("No check Code ...");
                this.doSave();
            }
        } else {
            this.populateFormValue();
            this.callUpdateItem(this.requestItem, data => this.handlePostResult(data));
        }
    }

    private doSave(): void {
        this.populateFormValue();
        this.callAddItem(this.requestItem, data => this.handlePostResult(data));

    }
    protected handlePostResult(data): void {
        this.showMessage('MESSAGE.DATA_SAVED', 'MESSAGE.NOTIFICATION');
        this.valueChange.emit(data);
        // console.log(data);
    }
}