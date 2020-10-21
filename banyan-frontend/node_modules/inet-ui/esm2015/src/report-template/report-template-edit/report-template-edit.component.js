/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Location } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { ErrorMessage, NotificationService } from "inet-core";
import { FormBuilder, Validators } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { ReportTemplateService } from "../report-template.service";
export class ReportTemplateEditComponent {
    /**
     * @param {?} location
     * @param {?} fb
     * @param {?} notification
     * @param {?} service
     * @param {?} translate
     * @param {?} route
     */
    constructor(location, fb, notification, service, translate, route) {
        this.location = location;
        this.fb = fb;
        this.notification = notification;
        this.service = service;
        this.translate = translate;
        this.route = route;
        this.validForm = new EventEmitter();
        this.applicationList = [];
        this.typeList = [];
        this.moduleList = [];
        this.versionList = [{ name: 1, description: 'Phiên bản 1' }, { name: 2, description: 'Phiên bản 2' }];
        this.attachments = [];
        this.translateSubscription = this.translate.get(['COMMON.MODULE.REPORT_TEMPLATE']).subscribe((/**
         * @param {?} res
         * @return {?}
         */
        res => {
            this.formTranslations = res['COMMON.MODULE.REPORT_TEMPLATE'];
        }));
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.subRouter = this.route.queryParamMap.subscribe((/**
         * @param {?} params
         * @return {?}
         */
        params => {
            this.applicationParams = params.get('application');
            this.moduleParams = params.get('module');
            this.typeParams = params.get('type');
        }));
        this.initForm();
        this.initData();
        this.loadApplication();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.translateSubscription) {
            this.translateSubscription.unsubscribe();
        }
        if (this.subRouter) {
            this.subRouter.unsubscribe();
        }
    }
    /**
     * @param {?} templateId
     * @return {?}
     */
    loadById(templateId) {
        if (templateId) {
            this.service.view(templateId).subscribe((/**
             * @param {?} data
             * @return {?}
             */
            data => {
                if (data.type !== ErrorMessage.TYPE) {
                    this.templateId = templateId;
                    this.applicationParams = data.application;
                    this.templateFormGroup.patchValue(data);
                    this.fileName = data.name;
                    this.validForm.emit(true);
                }
            }));
        }
    }
    /**
     * @private
     * @return {?}
     */
    initData() {
        this.version.setValue(2);
        this.application.setValue(this.applicationParams);
        this.module.setValue(this.moduleParams);
        this.type.setValue(this.typeParams);
    }
    /**
     * @return {?}
     */
    reset() {
        this.templateFormGroup.reset();
        this.templateId = '';
        this.fileName = '';
        this.initData();
        this.loadApplication();
        this.changeFormValid();
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    changeFile($event) {
        /** @type {?} */
        const files = $event.target.files;
        if (files.length > 0) {
            /** @type {?} */
            const upload = files[0];
            if (upload) {
                this.name.setValue(upload['name']);
                this.fileName = upload['name'];
            }
        }
        else {
        }
        this.changeFormValid();
    }
    /**
     * @return {?}
     */
    clearForm() {
        this.fileName = '';
        if (this.fileUpload.value) {
            this.fileUpload.setValue('');
        }
        this.changeFormValid();
    }
    /**
     * @private
     * @return {?}
     */
    loadApplication() {
        if (!this.appName) {
            this.service.application().subscribe((/**
             * @param {?} data
             * @return {?}
             */
            data => {
                if (data.type !== ErrorMessage.TYPE) {
                    this.applicationList = data.items || [];
                    this.application.setValue(this.applicationParams || this.application.value);
                    this.loadModules(this.applicationParams || this.application.value);
                }
            }));
        }
        else {
            this.applicationParams = this.appName;
            /** @type {?} */
            const app = { id: this.appName, description: this.appDesc || this.appName, name: this.appName };
            this.applicationList = [app];
            this.application.setValue(this.appName);
            this.templateFormGroup.controls['application'].disable();
            this.loadModules(this.appName);
        }
        this.service.organId().subscribe((/**
         * @param {?} data
         * @return {?}
         */
        data => {
            this.organId.setValue(data.organId);
        }));
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    changeApps($event) {
        this.loadModules($event.name);
    }
    /**
     * @private
     * @param {?} $event
     * @return {?}
     */
    loadModules($event) {
        /** @type {?} */
        const __modulesList = [];
        this.service.modules($event).subscribe((/**
         * @param {?} data
         * @return {?}
         */
        data => {
            Object.keys(data).forEach((/**
             * @param {?} key
             * @return {?}
             */
            key => {
                /** @type {?} */
                let item = Object.assign({ type: key }, data[key]);
                __modulesList.push(item);
            }));
            this.moduleList = __modulesList;
            if (this.moduleList.length > 0) {
                this.module.setValue(this.module.value || this.moduleList[0].type);
                this.changeModules($event);
            }
            else {
                this.module.setValue('');
                this.description.setValue('');
                this.clearForm();
            }
        }));
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    changeModules($event) {
        /** @type {?} */
        let __typesList = [];
        /** @type {?} */
        const types = this.moduleList.find((/**
         * @param {?} ele
         * @return {?}
         */
        ele => {
            return ele.type === this.module.value;
        }));
        Object.keys(types).forEach((/**
         * @param {?} ele
         * @return {?}
         */
        ele => {
            __typesList = types[ele];
        }));
        this.typeList = __typesList;
        if (this.typeList.length > 0) {
            this.type.setValue(this.type.value || this.typeList[0].type);
        }
    }
    /**
     * @return {?}
     */
    save() {
        /** @type {?} */
        const formData = new FormData(this.templateFormElementRef.nativeElement);
        formData.append('application', this.application.value);
        formData.append('module', this.module.value);
        formData.append('type', this.type.value);
        formData.append('version', this.version.value);
        formData.append('organId', this.organId.value);
        if (!iNet.isEmpty(this.templateId)) {
            formData.append('uuid', this.uuid.value);
            this.service.update(formData).subscribe((/**
             * @param {?} data
             * @return {?}
             */
            data => {
                if (data.type !== ErrorMessage.TYPE) {
                    this.templateFormGroup.patchValue(data);
                    this.templateId = data.uuid;
                    this.fileName = data.name;
                    this.validForm.emit(true);
                    this.notification.showMessage(this.formTranslations['UPDATE_SUCCESS'], 'success', this.formTranslations['TITLE']);
                }
                else {
                    this.notification.showMessage(this.formTranslations['UPDATE_ERROR'], 'error', this.formTranslations['TITLE']);
                }
            }));
        }
        else {
            this.service.add(formData).subscribe((/**
             * @param {?} data
             * @return {?}
             */
            data => {
                if (data.type !== ErrorMessage.TYPE) {
                    this.templateFormGroup.patchValue(data);
                    this.templateId = data.uuid;
                    this.fileName = data.name;
                    this.validForm.emit(true);
                    this.notification.showMessage(this.formTranslations['ADD_SUCCESS'], 'success', this.formTranslations['TITLE']);
                }
                else {
                    this.notification.showMessage(this.formTranslations['ADD_ERROR'], 'error', this.formTranslations['TITLE']);
                }
            }));
        }
    }
    /**
     * @return {?}
     */
    initForm() {
        this.templateFormGroup = this.fb.group({
            uuid: [],
            application: ['', Validators.required],
            module: ['', Validators.required],
            type: ['', Validators.required],
            name: ['', Validators.required],
            description: ['', Validators.required],
            version: ['', Validators.required],
            organId: [],
            fileUpload: [],
        });
    }
    /**
     * @return {?}
     */
    get uuid() {
        return this.templateFormGroup.get('uuid');
    }
    /**
     * @return {?}
     */
    get application() {
        return this.templateFormGroup.get('application');
    }
    /**
     * @return {?}
     */
    get module() {
        return this.templateFormGroup.get('module');
    }
    /**
     * @return {?}
     */
    get type() {
        return this.templateFormGroup.get('type');
    }
    /**
     * @return {?}
     */
    get name() {
        return this.templateFormGroup.get('name');
    }
    /**
     * @return {?}
     */
    get description() {
        return this.templateFormGroup.get('description');
    }
    /**
     * @return {?}
     */
    get version() {
        return this.templateFormGroup.get('version');
    }
    /**
     * @return {?}
     */
    get organId() {
        return this.templateFormGroup.get('organId');
    }
    /**
     * @return {?}
     */
    get fileUpload() {
        return this.templateFormGroup.get('fileUpload');
    }
    /**
     * @return {?}
     */
    changeFormValid() {
        /** @type {?} */
        let __valid;
        this.fileName === '' ? __valid = true : __valid = false;
        __valid ? this.validForm.emit(false) : this.validForm.emit(this.templateFormGroup.valid);
    }
}
ReportTemplateEditComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-report-template-edit',
                template: "<div id=\"report-template-content\" class=\"row center-body m-0\">\n    <div class=\"row justify-content-center mt-1 mb-0 reponsive-card \" style=\"width: 65%\">\n        <div class=\"card shadow box col-sm-12 mt-4\">\n            <div class=\"row ml-0 mr-0 \">\n                <form #templateForm [formGroup]=\"templateFormGroup\" class=\"w-100\">\n                    <div class=\"form-group row m-0 col-sm-12 mb-3 pl-0 mt-4\">\n                        <div class=\"col-sm-6 row m-0 p-0\">\n                            <label class=\"col-sm-4 text-left p-0 col-form-label \"> {{ 'COMMON.MODULE.REPORT_TEMPLATE.APPLICATION' | translate }} <span\n                                    class=\"required\"> :</span></label>\n                            <div class=\"col-sm-8 p-0\">\n                                <ng-select #application\n                                           class=\"col -sm-12 pl-0 pr-0\"\n                                           required\n                                           [clearable]=\"false\"\n                                           id=\"application\"\n                                           bindLabel=\"description\"\n                                           bindValue=\"name\"\n                                           [items]=\"applicationList\"\n                                           formControlName=\"application\"\n                                           name=\"application\"\n                                           (changeEvent)=\"changeFormValid()\"\n                                           (change)=\"changeApps($event)\"\n                                >\n                                </ng-select>\n                                <!-- validate -->\n                                <div *ngIf=\"application['invalid'] && (application['dirty'] || application['touched'])\"\n                                     class=\"text-danger mt-2 text-df\">\n                                    <div *ngIf=\"application['errors']['required']\">\n                                        <i class=\"fa fa-exclamation-triangle mr-1\"></i>\n                                        {{ 'COMMON.MODULE.REPORT_TEMPLATE.APPLICATION_REQUIRED' | translate }}\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"col-sm-6 row m-0 p-0\">\n                            <label class=\"col-sm-4 text-left  col-form-label \"> {{ 'COMMON.MODULE.REPORT_TEMPLATE.MODULE' | translate }} <span\n                                    class=\"required\"> :</span></label>\n                            <div class=\"col-sm-8 p-0\">\n                                <ng-select\n                                        class=\"col-sm-12 pl-0 pr-0\"\n                                        required\n                                        [clearable]=\"false\"\n                                        id=\"module\"\n                                        [items]=\"moduleList\"\n                                        formControlName=\"module\"\n                                        bindValue=\"type\"\n                                        bindLabel=\"name\"\n                                        name=\"module\"\n                                        (change)=\"changeModules($event)\"\n                                        (changeEvent)=\"changeFormValid()\"\n                                >\n                                </ng-select>\n                                <!-- validate -->\n                                <div *ngIf=\"module.invalid && (module.dirty || module.touched)\"\n                                     class=\"text-danger mt-2 text-df\">\n                                    <div *ngIf=\"module.errors.required\">\n                                        <i class=\"fa fa-exclamation-triangle mr-1\"></i>\n                                        {{ 'COMMON.MODULE.REPORT_TEMPLATE.MODULE_REQUIRED' | translate }}\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n\n                    </div>\n                    <div class=\"form-group row m-0 col-sm-12 mb-3 pl-0\">\n                        <div class=\"col-sm-6 row m-0 p-0\">\n                            <label class=\"col-sm-4 text-left p-0 col-form-label \"> {{ 'COMMON.MODULE.REPORT_TEMPLATE.TYPE' | translate }} <span\n                                    class=\"required\"> :</span></label>\n                            <div class=\"col-sm-8 p-0\">\n                                <ng-select\n                                        class=\"col-sm-12 pl-0 pr-0\"\n                                        required\n                                        [clearable]=\"false\"\n                                        id=\"type\"\n                                        [items]=\"typeList\"\n                                        formControlName=\"type\"\n                                        name=\"type\"\n                                        bindValue=\"type\"\n                                        bindLabel=\"name\"\n                                        (changeEvent)=\"changeFormValid()\">\n                                    <ng-template ng-label-tmp let-item=\"item\">\n                                        {{item['name'] | translate}}\n                                    </ng-template>\n                                    <ng-template ng-option-tmp let-item=\"item\">\n                                        {{item['name'] | translate}}\n                                    </ng-template>\n                                </ng-select>\n                                <!-- validate -->\n                                <div *ngIf=\"type.invalid && (type.dirty || type.touched)\"\n                                     class=\"text-danger mt-2 text-df\">\n                                    <div *ngIf=\"type.errors.required\">\n                                        <i class=\"fa fa-exclamation-triangle mr-1\"></i>\n                                        {{ 'COMMON.MODULE.REPORT_TEMPLATE.TYPE_REQUIRED' | translate }}\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n\n                        <div class=\"col-sm-6 row m-0 p-0\">\n                            <label class=\"col-sm-4 text-left  col-form-label \"> {{ 'COMMON.MODULE.REPORT_TEMPLATE.NAME' | translate }} <span\n                                    class=\"required\"> :</span></label>\n                            <div class=\"col-sm-8 p-0\">\n                                <input type=\"text\"\n                                       class=\"form-control form-control-sm \"\n                                       formControlName=\"name\" readonly\n                                       [ngClass]=\"{'is-invalid': name.errors && name.touched}\"\n                                        (keyup)=\"changeFormValid()\"\n                                       id=\"name\" name=\"name\" value=\"\">\n                                <!-- validate -->\n                                <div *ngIf=\"name.invalid && (name.dirty || name.touched)\"\n                                     class=\"text-danger mt-2 text-df\">\n                                    <div *ngIf=\"name.errors.required\">\n                                        <i class=\"fa fa-exclamation-triangle mr-1\"></i>\n                                        {{ 'COMMON.MODULE.REPORT_TEMPLATE.NAME_REQUIRED' | translate }}\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"form-group row m-0 col-sm-12 mb-3 pl-0\">\n                        <div class=\"col-sm-6 row m-0 p-0\">\n                            <label class=\"col-sm-4 text-left p-0 col-form-label \"> {{ 'COMMON.MODULE.REPORT_TEMPLATE.VERSION' | translate }} <span\n                                    class=\"required\"> :</span></label>\n                            <div class=\"col-sm-8 p-0\">\n                                <ng-select\n                                        class=\"col -sm-12 pl-0 pr-0\"\n                                        required\n                                        [clearable]=\"false\"\n                                        id=\"version\"\n                                        bindLabel=\"description\"\n                                        bindValue=\"name\"\n                                        [items]=\"versionList\"\n                                        formControlName=\"version\"\n                                        name=\"version\"\n                                        (changeEvent)=\"changeFormValid()\"\n                                >\n                                </ng-select>\n                                <!-- validate -->\n                                <div *ngIf=\"version.invalid && (version.dirty || version.touched)\"\n                                     class=\"text-danger mt-2 text-df\">\n                                    <div *ngIf=\"version.errors.required\">\n                                        <i class=\"fa fa-exclamation-triangle mr-1\"></i>\n                                        {{ 'COMMON.MODULE.REPORT_TEMPLATE.VERSION_REQUIRED' | translate }}\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n\n                    <div class=\"col-sm-12 form-group row m-0 mb-3 pl-0\">\n                        <label for=\"description\"\n                               class=\"col-sm-2 text-left p-0 col-form-label \"> {{ 'COMMON.MODULE.REPORT_TEMPLATE.DESCRIPTION' | translate }} <span\n                                class=\"required\"> :</span></label>\n                        <div class=\"col-sm-10 p-0\">\n                  <textarea #descr type=\"text\" (keyup)=\"changeFormValid()\" style=\"resize: none\" rows=\"3\"\n                            class=\"form-control form-control-sm \"\n                            formControlName=\"description\"\n                            [ngClass]=\"{'is-invalid': description.errors && description.touched}\"\n                            id=\"description\" name=\"description\" value=\"\" required></textarea>\n                            <!-- validate -->\n                            <div *ngIf=\"description.invalid && (description.dirty || description.touched)\"\n                                 class=\"text-danger mt-2 text-df\">\n                                <div *ngIf=\"description.errors.required\">\n                                    <i class=\"fa fa-exclamation-triangle mr-1\"></i>\n                                    {{ 'COMMON.MODULE.REPORT_TEMPLATE.DESCRIPTION_REQUIRED' | translate }}\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n\n                    <div class=\"col-sm-12 form-group row m-0 mb-3 pl-0\">\n                        <label class=\"control-label col-form-label col-sm-2 pl-0 \">\n                            {{ 'COMMON.MODULE.REPORT_TEMPLATE.FILE_UPLOAD' | translate }} <span\n                                class=\"required\"> :</span>\n                        </label>\n                        <div class=\"col-sm-10 p-0\">\n                            <label class=\"i-file-input\">\n                                <input #file type=\"file\" (change)=\"changeFile($event);changeFormValid()\" formControlName=\"fileUpload\"\n                                       name=\"fileUpload\"\n                                       class=\"form-control form-control-sm col-xs-12 col-sm-12\">\n                                <span class=\"i-file-container\" [ngClass]=\"{'selected': fileName}\"\n                                      [attr.data-title]=\"'COMMON.MODULE.REPORT_TEMPLATE.CHOOSE' | translate\">\n                                                            <span class=\"i-file-name\"\n                                                                  [attr.data-title]=\"fileName || ('COMMON.MODULE.REPORT_TEMPLATE.NO_FILE' | translate)\">\n                                                                <i class=\"file-icon fa fa-upload\"></i>\n                                                            </span>\n                                                        </span>\n                                <a class=\"remove\" *ngIf=\"fileName\" href=\"javascript:;\" (click)=\"clearForm()\">\n\n                                    <i class=\"fa fa-times\"></i>\n                                </a>\n                            </label>\n                        </div>\n                    </div>\n                </form>\n            </div>\n        </div>\n    </div>\n</div>\n\n",
                styles: [":host #report-template-content{height:calc(100vh - 115px)}@media (max-width:700px){:host .reponsive-card{padding:0 30px}}:host .pointer{pointer-events:none}:host .custom-center-span{display:flex;align-items:center}:host .center-body{flex-direction:row;justify-content:center;align-content:start}:host .shadow{box-shadow:0 .5rem 1rem rgba(0,0,0,.15)!important}"]
            }] }
];
/** @nocollapse */
ReportTemplateEditComponent.ctorParameters = () => [
    { type: Location },
    { type: FormBuilder },
    { type: NotificationService },
    { type: ReportTemplateService },
    { type: TranslateService },
    { type: ActivatedRoute }
];
ReportTemplateEditComponent.propDecorators = {
    templateId: [{ type: Input }],
    validForm: [{ type: Output }],
    appName: [{ type: Input }],
    appDesc: [{ type: Input }],
    templateFormElementRef: [{ type: ViewChild, args: ['templateForm',] }]
};
if (false) {
    /** @type {?} */
    ReportTemplateEditComponent.prototype.templateId;
    /** @type {?} */
    ReportTemplateEditComponent.prototype.validForm;
    /** @type {?} */
    ReportTemplateEditComponent.prototype.appName;
    /** @type {?} */
    ReportTemplateEditComponent.prototype.appDesc;
    /** @type {?} */
    ReportTemplateEditComponent.prototype.applicationList;
    /** @type {?} */
    ReportTemplateEditComponent.prototype.typeList;
    /** @type {?} */
    ReportTemplateEditComponent.prototype.moduleList;
    /** @type {?} */
    ReportTemplateEditComponent.prototype.versionList;
    /** @type {?} */
    ReportTemplateEditComponent.prototype.templateFormGroup;
    /** @type {?} */
    ReportTemplateEditComponent.prototype.attachments;
    /** @type {?} */
    ReportTemplateEditComponent.prototype.fileName;
    /** @type {?} */
    ReportTemplateEditComponent.prototype.applicationParams;
    /** @type {?} */
    ReportTemplateEditComponent.prototype.moduleParams;
    /** @type {?} */
    ReportTemplateEditComponent.prototype.typeParams;
    /**
     * @type {?}
     * @private
     */
    ReportTemplateEditComponent.prototype.subRouter;
    /**
     * @type {?}
     * @private
     */
    ReportTemplateEditComponent.prototype.translateSubscription;
    /**
     * @type {?}
     * @private
     */
    ReportTemplateEditComponent.prototype.formTranslations;
    /** @type {?} */
    ReportTemplateEditComponent.prototype.templateFormElementRef;
    /**
     * @type {?}
     * @private
     */
    ReportTemplateEditComponent.prototype.location;
    /**
     * @type {?}
     * @private
     */
    ReportTemplateEditComponent.prototype.fb;
    /**
     * @type {?}
     * @private
     */
    ReportTemplateEditComponent.prototype.notification;
    /**
     * @type {?}
     * @private
     */
    ReportTemplateEditComponent.prototype.service;
    /**
     * @type {?}
     * @private
     */
    ReportTemplateEditComponent.prototype.translate;
    /**
     * @type {?}
     * @private
     */
    ReportTemplateEditComponent.prototype.route;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwb3J0LXRlbXBsYXRlLWVkaXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC11aS8iLCJzb3VyY2VzIjpbInNyYy9yZXBvcnQtdGVtcGxhdGUvcmVwb3J0LXRlbXBsYXRlLWVkaXQvcmVwb3J0LXRlbXBsYXRlLWVkaXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0gsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osS0FBSyxFQUdMLE1BQU0sRUFDTixTQUFTLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUMsWUFBWSxFQUFFLG1CQUFtQixFQUFDLE1BQU0sV0FBVyxDQUFDO0FBQzVELE9BQU8sRUFBQyxXQUFXLEVBQWEsVUFBVSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEUsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFFckQsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFRakUsTUFBTSxPQUFPLDJCQUEyQjs7Ozs7Ozs7O0lBb0JwQyxZQUFvQixRQUFrQixFQUNsQixFQUFlLEVBQ2YsWUFBaUMsRUFDakMsT0FBOEIsRUFDOUIsU0FBMkIsRUFDM0IsS0FBcUI7UUFMckIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNsQixPQUFFLEdBQUYsRUFBRSxDQUFhO1FBQ2YsaUJBQVksR0FBWixZQUFZLENBQXFCO1FBQ2pDLFlBQU8sR0FBUCxPQUFPLENBQXVCO1FBQzlCLGNBQVMsR0FBVCxTQUFTLENBQWtCO1FBQzNCLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBdkIvQixjQUFTLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztRQUdsRCxvQkFBZSxHQUFHLEVBQUUs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QUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0YsQ0FBQzs7O1lBcFFKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsMEJBQTBCO2dCQUNwQyx1eVpBQW9EOzthQUV2RDs7OztZQWJPLFFBQVE7WUFHUixXQUFXO1lBREcsbUJBQW1CO1lBSWpDLHFCQUFxQjtZQUZyQixnQkFBZ0I7WUFIaEIsY0FBYzs7O3lCQWNqQixLQUFLO3dCQUNMLE1BQU07c0JBQ04sS0FBSztzQkFDTCxLQUFLO3FDQWNMLFNBQVMsU0FBQyxjQUFjOzs7O0lBakJ6QixpREFBNEI7O0lBQzVCLGdEQUFrRDs7SUFDbEQsOENBQXlCOztJQUN6Qiw4Q0FBeUI7O0lBQ3pCLHNEQUFxQjs7SUFDckIsK0NBQWM7O0lBQ2QsaURBQWdCOztJQUNoQixrREFBNkY7O0lBQzdGLHdEQUE2Qjs7SUFDN0Isa0RBQWlCOztJQUNqQiwrQ0FBaUI7O0lBQ2pCLHdEQUEwQjs7SUFDMUIsbURBQXFCOztJQUNyQixpREFBbUI7Ozs7O0lBQ25CLGdEQUFnQzs7Ozs7SUFDaEMsNERBQTRDOzs7OztJQUM1Qyx1REFBOEI7O0lBQzlCLDZEQUE4RDs7Ozs7SUFFbEQsK0NBQTBCOzs7OztJQUMxQix5Q0FBdUI7Ozs7O0lBQ3ZCLG1EQUF5Qzs7Ozs7SUFDekMsOENBQXNDOzs7OztJQUN0QyxnREFBbUM7Ozs7O0lBQ25DLDRDQUE2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQ29tcG9uZW50LFxuICAgIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIElucHV0LFxuICAgIE9uRGVzdHJveSxcbiAgICBPbkluaXQsXG4gICAgT3V0cHV0LFxuICAgIFZpZXdDaGlsZFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TG9jYXRpb259IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcbmltcG9ydCB7QWN0aXZhdGVkUm91dGV9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7RXJyb3JNZXNzYWdlLCBOb3RpZmljYXRpb25TZXJ2aWNlfSBmcm9tIFwiaW5ldC1jb3JlXCI7XG5pbXBvcnQge0Zvcm1CdWlsZGVyLCBGb3JtR3JvdXAsIFZhbGlkYXRvcnN9IGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xuaW1wb3J0IHtUcmFuc2xhdGVTZXJ2aWNlfSBmcm9tIFwiQG5neC10cmFuc2xhdGUvY29yZVwiO1xuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gXCJyeGpzXCI7XG5pbXBvcnQge1JlcG9ydFRlbXBsYXRlU2VydmljZX0gZnJvbSBcIi4uL3JlcG9ydC10ZW1wbGF0ZS5zZXJ2aWNlXCI7XG5kZWNsYXJlIGxldCBpTmV0OiBhbnk7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXBwLXJlcG9ydC10ZW1wbGF0ZS1lZGl0JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vcmVwb3J0LXRlbXBsYXRlLWVkaXQuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3JlcG9ydC10ZW1wbGF0ZS1lZGl0LmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBSZXBvcnRUZW1wbGF0ZUVkaXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gICAgQElucHV0KCkgdGVtcGxhdGVJZDogc3RyaW5nO1xuICAgIEBPdXRwdXQoKSB2YWxpZEZvcm0gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG4gICAgQElucHV0KCkgYXBwTmFtZTogc3RyaW5nO1xuICAgIEBJbnB1dCgpIGFwcERlc2M6IHN0cmluZztcbiAgICBhcHBsaWNhdGlvbkxpc3QgPSBbXTtcbiAgICB0eXBlTGlzdCA9IFtdO1xuICAgIG1vZHVsZUxpc3QgPSBbXTtcbiAgICB2ZXJzaW9uTGlzdCA9IFt7bmFtZTogMSwgZGVzY3JpcHRpb246ICdQaGnDqm4gYuG6o24gMSd9LCB7bmFtZTogMiwgZGVzY3JpcHRpb246ICdQaGnDqm4gYuG6o24gMid9XTtcbiAgICB0ZW1wbGF0ZUZvcm1Hcm91cDogRm9ybUdyb3VwO1xuICAgIGF0dGFjaG1lbnRzID0gW107XG4gICAgZmlsZU5hbWU6IHN0cmluZztcbiAgICBhcHBsaWNhdGlvblBhcmFtczogc3RyaW5nO1xuICAgIG1vZHVsZVBhcmFtczogc3RyaW5nO1xuICAgIHR5cGVQYXJhbXM6IHN0cmluZztcbiAgICBwcml2YXRlIHN1YlJvdXRlcjogU3Vic2NyaXB0aW9uO1xuICAgIHByaXZhdGUgdHJhbnNsYXRlU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gICAgcHJpdmF0ZSBmb3JtVHJhbnNsYXRpb25zOiBhbnk7XG4gICAgQFZpZXdDaGlsZCgndGVtcGxhdGVGb3JtJykgdGVtcGxhdGVGb3JtRWxlbWVudFJlZjogRWxlbWVudFJlZjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgbG9jYXRpb246IExvY2F0aW9uLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgZmI6IEZvcm1CdWlsZGVyLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgbm90aWZpY2F0aW9uOiBOb3RpZmljYXRpb25TZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgc2VydmljZTogUmVwb3J0VGVtcGxhdGVTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgdHJhbnNsYXRlOiBUcmFuc2xhdGVTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlKSB7XG5cbiAgICAgICAgdGhpcy50cmFuc2xhdGVTdWJzY3JpcHRpb24gPSB0aGlzLnRyYW5zbGF0ZS5nZXQoWydDT01NT04uTU9EVUxFLlJFUE9SVF9URU1QTEFURSddKS5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgICAgICAgIHRoaXMuZm9ybVRyYW5zbGF0aW9ucyA9IHJlc1snQ09NTU9OLk1PRFVMRS5SRVBPUlRfVEVNUExBVEUnXTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICB0aGlzLnN1YlJvdXRlciA9IHRoaXMucm91dGUucXVlcnlQYXJhbU1hcC5zdWJzY3JpYmUoXG4gICAgICAgICAgICBwYXJhbXMgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuYXBwbGljYXRpb25QYXJhbXMgPSBwYXJhbXMuZ2V0KCdhcHBsaWNhdGlvbicpO1xuICAgICAgICAgICAgICAgIHRoaXMubW9kdWxlUGFyYW1zID0gcGFyYW1zLmdldCgnbW9kdWxlJyk7XG4gICAgICAgICAgICAgICAgdGhpcy50eXBlUGFyYW1zID0gcGFyYW1zLmdldCgndHlwZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmluaXRGb3JtKCk7XG4gICAgICAgIHRoaXMuaW5pdERhdGEoKTtcbiAgICAgICAgdGhpcy5sb2FkQXBwbGljYXRpb24oKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgaWYodGhpcy50cmFuc2xhdGVTdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMudHJhbnNsYXRlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYodGhpcy5zdWJSb3V0ZXIpe1xuICAgICAgICAgICAgdGhpcy5zdWJSb3V0ZXIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGxvYWRCeUlkKHRlbXBsYXRlSWQ6IHN0cmluZykge1xuICAgICAgICBpZiAodGVtcGxhdGVJZCkge1xuICAgICAgICAgICAgdGhpcy5zZXJ2aWNlLnZpZXcodGVtcGxhdGVJZCkuc3Vic2NyaWJlKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChkYXRhLnR5cGUgIT09IEVycm9yTWVzc2FnZS5UWVBFKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGVtcGxhdGVJZCA9IHRlbXBsYXRlSWQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXBwbGljYXRpb25QYXJhbXMgPSBkYXRhLmFwcGxpY2F0aW9uO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRlbXBsYXRlRm9ybUdyb3VwLnBhdGNoVmFsdWUoZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlsZU5hbWUgPSBkYXRhLm5hbWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmFsaWRGb3JtLmVtaXQodHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXREYXRhKCkge1xuICAgICAgICB0aGlzLnZlcnNpb24uc2V0VmFsdWUoMik7XG4gICAgICAgIHRoaXMuYXBwbGljYXRpb24uc2V0VmFsdWUodGhpcy5hcHBsaWNhdGlvblBhcmFtcyk7XG4gICAgICAgIHRoaXMubW9kdWxlLnNldFZhbHVlKHRoaXMubW9kdWxlUGFyYW1zKTtcbiAgICAgICAgdGhpcy50eXBlLnNldFZhbHVlKHRoaXMudHlwZVBhcmFtcyk7XG5cbiAgICB9XG5cbiAgICByZXNldCgpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZUZvcm1Hcm91cC5yZXNldCgpO1xuICAgICAgICB0aGlzLnRlbXBsYXRlSWQgPSAnJztcbiAgICAgICAgdGhpcy5maWxlTmFtZSA9ICcnO1xuICAgICAgICB0aGlzLmluaXREYXRhKCk7XG4gICAgICAgIHRoaXMubG9hZEFwcGxpY2F0aW9uKCk7XG4gICAgICAgIHRoaXMuY2hhbmdlRm9ybVZhbGlkKCk7XG4gICAgfVxuXG4gICAgY2hhbmdlRmlsZSgkZXZlbnQpIHtcbiAgICAgICAgY29uc3QgZmlsZXMgPSAkZXZlbnQudGFyZ2V0LmZpbGVzO1xuICAgICAgICBpZiAoZmlsZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29uc3QgdXBsb2FkID0gZmlsZXNbMF07XG4gICAgICAgICAgICBpZiAodXBsb2FkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5uYW1lLnNldFZhbHVlKHVwbG9hZFsnbmFtZSddKTtcbiAgICAgICAgICAgICAgICB0aGlzLmZpbGVOYW1lID0gdXBsb2FkWyduYW1lJ107XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jaGFuZ2VGb3JtVmFsaWQoKTtcbiAgICB9XG5cbiAgICBjbGVhckZvcm0oKSB7XG4gICAgICAgIHRoaXMuZmlsZU5hbWUgPSAnJztcbiAgICAgICAgaWYgKHRoaXMuZmlsZVVwbG9hZC52YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5maWxlVXBsb2FkLnNldFZhbHVlKCcnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNoYW5nZUZvcm1WYWxpZCgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgbG9hZEFwcGxpY2F0aW9uKCkge1xuICAgICAgICBpZighdGhpcy5hcHBOYW1lKSB7XG4gICAgICAgICAgICB0aGlzLnNlcnZpY2UuYXBwbGljYXRpb24oKS5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGEudHlwZSAhPT0gRXJyb3JNZXNzYWdlLlRZUEUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcHBsaWNhdGlvbkxpc3QgPSBkYXRhLml0ZW1zIHx8IFtdO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFwcGxpY2F0aW9uLnNldFZhbHVlKHRoaXMuYXBwbGljYXRpb25QYXJhbXMgfHwgdGhpcy5hcHBsaWNhdGlvbi52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZE1vZHVsZXModGhpcy5hcHBsaWNhdGlvblBhcmFtcyB8fCB0aGlzLmFwcGxpY2F0aW9uLnZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYXBwbGljYXRpb25QYXJhbXMgPSB0aGlzLmFwcE5hbWU7XG4gICAgICAgICAgICBjb25zdCBhcHAgPSB7aWQ6IHRoaXMuYXBwTmFtZSwgZGVzY3JpcHRpb246IHRoaXMuYXBwRGVzYyB8fCB0aGlzLmFwcE5hbWUsIG5hbWU6IHRoaXMuYXBwTmFtZX07XG4gICAgICAgICAgICB0aGlzLmFwcGxpY2F0aW9uTGlzdCA9IFthcHBdO1xuICAgICAgICAgICAgdGhpcy5hcHBsaWNhdGlvbi5zZXRWYWx1ZSh0aGlzLmFwcE5hbWUpO1xuICAgICAgICAgICAgdGhpcy50ZW1wbGF0ZUZvcm1Hcm91cC5jb250cm9sc1snYXBwbGljYXRpb24nXS5kaXNhYmxlKCk7XG4gICAgICAgICAgICB0aGlzLmxvYWRNb2R1bGVzKHRoaXMuYXBwTmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXJ2aWNlLm9yZ2FuSWQoKS5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICAgICAgICB0aGlzLm9yZ2FuSWQuc2V0VmFsdWUoZGF0YS5vcmdhbklkKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY2hhbmdlQXBwcygkZXZlbnQpIHtcbiAgICAgICAgdGhpcy5sb2FkTW9kdWxlcygkZXZlbnQubmFtZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBsb2FkTW9kdWxlcygkZXZlbnQpIHtcbiAgICAgICAgY29uc3QgX19tb2R1bGVzTGlzdCA9IFtdO1xuICAgICAgICB0aGlzLnNlcnZpY2UubW9kdWxlcygkZXZlbnQpLnN1YnNjcmliZShkYXRhID0+IHtcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKGRhdGEpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW0gID0gIHsuLi57dHlwZTprZXl9LC4uLmRhdGFba2V5XX07XG4gICAgICAgICAgICAgICAgX19tb2R1bGVzTGlzdC5wdXNoKGl0ZW0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLm1vZHVsZUxpc3QgPSBfX21vZHVsZXNMaXN0O1xuICAgICAgICAgICAgaWYgKHRoaXMubW9kdWxlTGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tb2R1bGUuc2V0VmFsdWUodGhpcy5tb2R1bGUudmFsdWUgfHwgdGhpcy5tb2R1bGVMaXN0WzBdLnR5cGUpO1xuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlTW9kdWxlcygkZXZlbnQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1vZHVsZS5zZXRWYWx1ZSgnJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5kZXNjcmlwdGlvbi5zZXRWYWx1ZSgnJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhckZvcm0oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY2hhbmdlTW9kdWxlcygkZXZlbnQpIHtcbiAgICAgICAgbGV0IF9fdHlwZXNMaXN0ID0gW107XG4gICAgICAgIGNvbnN0IHR5cGVzID0gdGhpcy5tb2R1bGVMaXN0LmZpbmQoZWxlID0+IHtcbiAgICAgICAgICAgIHJldHVybiBlbGUudHlwZSA9PT0gdGhpcy5tb2R1bGUudmFsdWU7XG4gICAgICAgIH0pO1xuICAgICAgICBPYmplY3Qua2V5cyh0eXBlcykuZm9yRWFjaChlbGUgPT4ge1xuICAgICAgICAgICAgX190eXBlc0xpc3QgPSB0eXBlc1tlbGVdO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy50eXBlTGlzdCA9IF9fdHlwZXNMaXN0O1xuICAgICAgICBpZiAodGhpcy50eXBlTGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLnR5cGUuc2V0VmFsdWUodGhpcy50eXBlLnZhbHVlIHx8IHRoaXMudHlwZUxpc3RbMF0udHlwZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzYXZlKCkge1xuICAgICAgICBjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSh0aGlzLnRlbXBsYXRlRm9ybUVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG4gICAgICAgIGZvcm1EYXRhLmFwcGVuZCgnYXBwbGljYXRpb24nLCB0aGlzLmFwcGxpY2F0aW9uLnZhbHVlKTtcbiAgICAgICAgZm9ybURhdGEuYXBwZW5kKCdtb2R1bGUnLCB0aGlzLm1vZHVsZS52YWx1ZSk7XG4gICAgICAgIGZvcm1EYXRhLmFwcGVuZCgndHlwZScsIHRoaXMudHlwZS52YWx1ZSk7XG4gICAgICAgIGZvcm1EYXRhLmFwcGVuZCgndmVyc2lvbicsIHRoaXMudmVyc2lvbi52YWx1ZSk7XG4gICAgICAgIGZvcm1EYXRhLmFwcGVuZCgnb3JnYW5JZCcsIHRoaXMub3JnYW5JZC52YWx1ZSk7XG4gICAgICAgIGlmICghaU5ldC5pc0VtcHR5KHRoaXMudGVtcGxhdGVJZCkpIHtcbiAgICAgICAgICAgIGZvcm1EYXRhLmFwcGVuZCgndXVpZCcsIHRoaXMudXVpZC52YWx1ZSk7XG4gICAgICAgICAgICB0aGlzLnNlcnZpY2UudXBkYXRlKGZvcm1EYXRhKS5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGEudHlwZSAhPT0gRXJyb3JNZXNzYWdlLlRZUEUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50ZW1wbGF0ZUZvcm1Hcm91cC5wYXRjaFZhbHVlKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRlbXBsYXRlSWQgPSBkYXRhLnV1aWQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlsZU5hbWUgPSBkYXRhLm5hbWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmFsaWRGb3JtLmVtaXQodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uLnNob3dNZXNzYWdlKHRoaXMuZm9ybVRyYW5zbGF0aW9uc1snVVBEQVRFX1NVQ0NFU1MnXSwgJ3N1Y2Nlc3MnLCB0aGlzLmZvcm1UcmFuc2xhdGlvbnNbJ1RJVExFJ10pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uLnNob3dNZXNzYWdlKHRoaXMuZm9ybVRyYW5zbGF0aW9uc1snVVBEQVRFX0VSUk9SJ10sICdlcnJvcicsIHRoaXMuZm9ybVRyYW5zbGF0aW9uc1snVElUTEUnXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNlcnZpY2UuYWRkKGZvcm1EYXRhKS5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGEudHlwZSAhPT0gRXJyb3JNZXNzYWdlLlRZUEUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50ZW1wbGF0ZUZvcm1Hcm91cC5wYXRjaFZhbHVlKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRlbXBsYXRlSWQgPSBkYXRhLnV1aWQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlsZU5hbWUgPSBkYXRhLm5hbWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmFsaWRGb3JtLmVtaXQodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uLnNob3dNZXNzYWdlKHRoaXMuZm9ybVRyYW5zbGF0aW9uc1snQUREX1NVQ0NFU1MnXSwgJ3N1Y2Nlc3MnLCB0aGlzLmZvcm1UcmFuc2xhdGlvbnNbJ1RJVExFJ10pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uLnNob3dNZXNzYWdlKHRoaXMuZm9ybVRyYW5zbGF0aW9uc1snQUREX0VSUk9SJ10sICdlcnJvcicsIHRoaXMuZm9ybVRyYW5zbGF0aW9uc1snVElUTEUnXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGluaXRGb3JtKCkge1xuICAgICAgICB0aGlzLnRlbXBsYXRlRm9ybUdyb3VwID0gdGhpcy5mYi5ncm91cCh7XG4gICAgICAgICAgICB1dWlkOiBbXSxcbiAgICAgICAgICAgIGFwcGxpY2F0aW9uOiBbJycsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxuICAgICAgICAgICAgbW9kdWxlOiBbJycsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxuICAgICAgICAgICAgdHlwZTogWycnLCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcbiAgICAgICAgICAgIG5hbWU6IFsnJywgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogWycnLCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcbiAgICAgICAgICAgIHZlcnNpb246IFsnJywgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXG4gICAgICAgICAgICBvcmdhbklkOiBbXSxcbiAgICAgICAgICAgIGZpbGVVcGxvYWQ6IFtdLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXQgdXVpZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGVtcGxhdGVGb3JtR3JvdXAuZ2V0KCd1dWlkJyk7XG4gICAgfVxuXG4gICAgZ2V0IGFwcGxpY2F0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy50ZW1wbGF0ZUZvcm1Hcm91cC5nZXQoJ2FwcGxpY2F0aW9uJyk7XG4gICAgfVxuXG4gICAgZ2V0IG1vZHVsZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGVtcGxhdGVGb3JtR3JvdXAuZ2V0KCdtb2R1bGUnKTtcbiAgICB9XG5cbiAgICBnZXQgdHlwZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGVtcGxhdGVGb3JtR3JvdXAuZ2V0KCd0eXBlJyk7XG4gICAgfVxuXG4gICAgZ2V0IG5hbWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRlbXBsYXRlRm9ybUdyb3VwLmdldCgnbmFtZScpO1xuICAgIH1cblxuICAgIGdldCBkZXNjcmlwdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGVtcGxhdGVGb3JtR3JvdXAuZ2V0KCdkZXNjcmlwdGlvbicpO1xuICAgIH1cblxuICAgIGdldCB2ZXJzaW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy50ZW1wbGF0ZUZvcm1Hcm91cC5nZXQoJ3ZlcnNpb24nKTtcbiAgICB9XG5cbiAgICBnZXQgb3JnYW5JZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGVtcGxhdGVGb3JtR3JvdXAuZ2V0KCdvcmdhbklkJyk7XG4gICAgfVxuXG4gICAgZ2V0IGZpbGVVcGxvYWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRlbXBsYXRlRm9ybUdyb3VwLmdldCgnZmlsZVVwbG9hZCcpO1xuICAgIH1cblxuICAgIGNoYW5nZUZvcm1WYWxpZCgpIHtcbiAgICAgICAgbGV0IF9fdmFsaWQ6IGJvb2xlYW47XG4gICAgICAgIHRoaXMuZmlsZU5hbWUgPT09ICcnID8gX192YWxpZCA9IHRydWUgOiBfX3ZhbGlkID0gZmFsc2U7XG4gICAgICAgIF9fdmFsaWQgPyB0aGlzLnZhbGlkRm9ybS5lbWl0KGZhbHNlKSA6IHRoaXMudmFsaWRGb3JtLmVtaXQodGhpcy50ZW1wbGF0ZUZvcm1Hcm91cC52YWxpZCk7XG4gICAgfVxuXG59XG4iXX0=