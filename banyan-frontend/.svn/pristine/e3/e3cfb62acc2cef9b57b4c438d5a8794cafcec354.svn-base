/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Location } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { ErrorMessage, NotificationService } from "inet-core";
import { FormBuilder, Validators } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { ReportTemplateService } from "../report-template.service";
var ReportTemplateEditComponent = /** @class */ (function () {
    function ReportTemplateEditComponent(location, fb, notification, service, translate, route) {
        var _this = this;
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
        function (res) {
            _this.formTranslations = res['COMMON.MODULE.REPORT_TEMPLATE'];
        }));
    }
    /**
     * @return {?}
     */
    ReportTemplateEditComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.subRouter = this.route.queryParamMap.subscribe((/**
         * @param {?} params
         * @return {?}
         */
        function (params) {
            _this.applicationParams = params.get('application');
            _this.moduleParams = params.get('module');
            _this.typeParams = params.get('type');
        }));
        this.initForm();
        this.initData();
        this.loadApplication();
    };
    /**
     * @return {?}
     */
    ReportTemplateEditComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.translateSubscription) {
            this.translateSubscription.unsubscribe();
        }
        if (this.subRouter) {
            this.subRouter.unsubscribe();
        }
    };
    /**
     * @param {?} templateId
     * @return {?}
     */
    ReportTemplateEditComponent.prototype.loadById = /**
     * @param {?} templateId
     * @return {?}
     */
    function (templateId) {
        var _this = this;
        if (templateId) {
            this.service.view(templateId).subscribe((/**
             * @param {?} data
             * @return {?}
             */
            function (data) {
                if (data.type !== ErrorMessage.TYPE) {
                    _this.templateId = templateId;
                    _this.applicationParams = data.application;
                    _this.templateFormGroup.patchValue(data);
                    _this.fileName = data.name;
                    _this.validForm.emit(true);
                }
            }));
        }
    };
    /**
     * @private
     * @return {?}
     */
    ReportTemplateEditComponent.prototype.initData = /**
     * @private
     * @return {?}
     */
    function () {
        this.version.setValue(2);
        this.application.setValue(this.applicationParams);
        this.module.setValue(this.moduleParams);
        this.type.setValue(this.typeParams);
    };
    /**
     * @return {?}
     */
    ReportTemplateEditComponent.prototype.reset = /**
     * @return {?}
     */
    function () {
        this.templateFormGroup.reset();
        this.templateId = '';
        this.fileName = '';
        this.initData();
        this.loadApplication();
        this.changeFormValid();
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    ReportTemplateEditComponent.prototype.changeFile = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        /** @type {?} */
        var files = $event.target.files;
        if (files.length > 0) {
            /** @type {?} */
            var upload = files[0];
            if (upload) {
                this.name.setValue(upload['name']);
                this.fileName = upload['name'];
            }
        }
        else {
        }
        this.changeFormValid();
    };
    /**
     * @return {?}
     */
    ReportTemplateEditComponent.prototype.clearForm = /**
     * @return {?}
     */
    function () {
        this.fileName = '';
        if (this.fileUpload.value) {
            this.fileUpload.setValue('');
        }
        this.changeFormValid();
    };
    /**
     * @private
     * @return {?}
     */
    ReportTemplateEditComponent.prototype.loadApplication = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.appName) {
            this.service.application().subscribe((/**
             * @param {?} data
             * @return {?}
             */
            function (data) {
                if (data.type !== ErrorMessage.TYPE) {
                    _this.applicationList = data.items || [];
                    _this.application.setValue(_this.applicationParams || _this.application.value);
                    _this.loadModules(_this.applicationParams || _this.application.value);
                }
            }));
        }
        else {
            this.applicationParams = this.appName;
            /** @type {?} */
            var app = { id: this.appName, description: this.appDesc || this.appName, name: this.appName };
            this.applicationList = [app];
            this.application.setValue(this.appName);
            this.templateFormGroup.controls['application'].disable();
            this.loadModules(this.appName);
        }
        this.service.organId().subscribe((/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            _this.organId.setValue(data.organId);
        }));
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    ReportTemplateEditComponent.prototype.changeApps = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        this.loadModules($event.name);
    };
    /**
     * @private
     * @param {?} $event
     * @return {?}
     */
    ReportTemplateEditComponent.prototype.loadModules = /**
     * @private
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        var _this = this;
        /** @type {?} */
        var __modulesList = [];
        this.service.modules($event).subscribe((/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            Object.keys(data).forEach((/**
             * @param {?} key
             * @return {?}
             */
            function (key) {
                /** @type {?} */
                var item = tslib_1.__assign({ type: key }, data[key]);
                __modulesList.push(item);
            }));
            _this.moduleList = __modulesList;
            if (_this.moduleList.length > 0) {
                _this.module.setValue(_this.module.value || _this.moduleList[0].type);
                _this.changeModules($event);
            }
            else {
                _this.module.setValue('');
                _this.description.setValue('');
                _this.clearForm();
            }
        }));
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    ReportTemplateEditComponent.prototype.changeModules = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        var _this = this;
        /** @type {?} */
        var __typesList = [];
        /** @type {?} */
        var types = this.moduleList.find((/**
         * @param {?} ele
         * @return {?}
         */
        function (ele) {
            return ele.type === _this.module.value;
        }));
        Object.keys(types).forEach((/**
         * @param {?} ele
         * @return {?}
         */
        function (ele) {
            __typesList = types[ele];
        }));
        this.typeList = __typesList;
        if (this.typeList.length > 0) {
            this.type.setValue(this.type.value || this.typeList[0].type);
        }
    };
    /**
     * @return {?}
     */
    ReportTemplateEditComponent.prototype.save = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var formData = new FormData(this.templateFormElementRef.nativeElement);
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
            function (data) {
                if (data.type !== ErrorMessage.TYPE) {
                    _this.templateFormGroup.patchValue(data);
                    _this.templateId = data.uuid;
                    _this.fileName = data.name;
                    _this.validForm.emit(true);
                    _this.notification.showMessage(_this.formTranslations['UPDATE_SUCCESS'], 'success', _this.formTranslations['TITLE']);
                }
                else {
                    _this.notification.showMessage(_this.formTranslations['UPDATE_ERROR'], 'error', _this.formTranslations['TITLE']);
                }
            }));
        }
        else {
            this.service.add(formData).subscribe((/**
             * @param {?} data
             * @return {?}
             */
            function (data) {
                if (data.type !== ErrorMessage.TYPE) {
                    _this.templateFormGroup.patchValue(data);
                    _this.templateId = data.uuid;
                    _this.fileName = data.name;
                    _this.validForm.emit(true);
                    _this.notification.showMessage(_this.formTranslations['ADD_SUCCESS'], 'success', _this.formTranslations['TITLE']);
                }
                else {
                    _this.notification.showMessage(_this.formTranslations['ADD_ERROR'], 'error', _this.formTranslations['TITLE']);
                }
            }));
        }
    };
    /**
     * @return {?}
     */
    ReportTemplateEditComponent.prototype.initForm = /**
     * @return {?}
     */
    function () {
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
    };
    Object.defineProperty(ReportTemplateEditComponent.prototype, "uuid", {
        get: /**
         * @return {?}
         */
        function () {
            return this.templateFormGroup.get('uuid');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReportTemplateEditComponent.prototype, "application", {
        get: /**
         * @return {?}
         */
        function () {
            return this.templateFormGroup.get('application');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReportTemplateEditComponent.prototype, "module", {
        get: /**
         * @return {?}
         */
        function () {
            return this.templateFormGroup.get('module');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReportTemplateEditComponent.prototype, "type", {
        get: /**
         * @return {?}
         */
        function () {
            return this.templateFormGroup.get('type');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReportTemplateEditComponent.prototype, "name", {
        get: /**
         * @return {?}
         */
        function () {
            return this.templateFormGroup.get('name');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReportTemplateEditComponent.prototype, "description", {
        get: /**
         * @return {?}
         */
        function () {
            return this.templateFormGroup.get('description');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReportTemplateEditComponent.prototype, "version", {
        get: /**
         * @return {?}
         */
        function () {
            return this.templateFormGroup.get('version');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReportTemplateEditComponent.prototype, "organId", {
        get: /**
         * @return {?}
         */
        function () {
            return this.templateFormGroup.get('organId');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReportTemplateEditComponent.prototype, "fileUpload", {
        get: /**
         * @return {?}
         */
        function () {
            return this.templateFormGroup.get('fileUpload');
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ReportTemplateEditComponent.prototype.changeFormValid = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var __valid;
        this.fileName === '' ? __valid = true : __valid = false;
        __valid ? this.validForm.emit(false) : this.validForm.emit(this.templateFormGroup.valid);
    };
    ReportTemplateEditComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-report-template-edit',
                    template: "<div id=\"report-template-content\" class=\"row center-body m-0\">\n    <div class=\"row justify-content-center mt-1 mb-0 reponsive-card \" style=\"width: 65%\">\n        <div class=\"card shadow box col-sm-12 mt-4\">\n            <div class=\"row ml-0 mr-0 \">\n                <form #templateForm [formGroup]=\"templateFormGroup\" class=\"w-100\">\n                    <div class=\"form-group row m-0 col-sm-12 mb-3 pl-0 mt-4\">\n                        <div class=\"col-sm-6 row m-0 p-0\">\n                            <label class=\"col-sm-4 text-left p-0 col-form-label \"> {{ 'COMMON.MODULE.REPORT_TEMPLATE.APPLICATION' | translate }} <span\n                                    class=\"required\"> :</span></label>\n                            <div class=\"col-sm-8 p-0\">\n                                <ng-select #application\n                                           class=\"col -sm-12 pl-0 pr-0\"\n                                           required\n                                           [clearable]=\"false\"\n                                           id=\"application\"\n                                           bindLabel=\"description\"\n                                           bindValue=\"name\"\n                                           [items]=\"applicationList\"\n                                           formControlName=\"application\"\n                                           name=\"application\"\n                                           (changeEvent)=\"changeFormValid()\"\n                                           (change)=\"changeApps($event)\"\n                                >\n                                </ng-select>\n                                <!-- validate -->\n                                <div *ngIf=\"application['invalid'] && (application['dirty'] || application['touched'])\"\n                                     class=\"text-danger mt-2 text-df\">\n                                    <div *ngIf=\"application['errors']['required']\">\n                                        <i class=\"fa fa-exclamation-triangle mr-1\"></i>\n                                        {{ 'COMMON.MODULE.REPORT_TEMPLATE.APPLICATION_REQUIRED' | translate }}\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"col-sm-6 row m-0 p-0\">\n                            <label class=\"col-sm-4 text-left  col-form-label \"> {{ 'COMMON.MODULE.REPORT_TEMPLATE.MODULE' | translate }} <span\n                                    class=\"required\"> :</span></label>\n                            <div class=\"col-sm-8 p-0\">\n                                <ng-select\n                                        class=\"col-sm-12 pl-0 pr-0\"\n                                        required\n                                        [clearable]=\"false\"\n                                        id=\"module\"\n                                        [items]=\"moduleList\"\n                                        formControlName=\"module\"\n                                        bindValue=\"type\"\n                                        bindLabel=\"name\"\n                                        name=\"module\"\n                                        (change)=\"changeModules($event)\"\n                                        (changeEvent)=\"changeFormValid()\"\n                                >\n                                </ng-select>\n                                <!-- validate -->\n                                <div *ngIf=\"module.invalid && (module.dirty || module.touched)\"\n                                     class=\"text-danger mt-2 text-df\">\n                                    <div *ngIf=\"module.errors.required\">\n                                        <i class=\"fa fa-exclamation-triangle mr-1\"></i>\n                                        {{ 'COMMON.MODULE.REPORT_TEMPLATE.MODULE_REQUIRED' | translate }}\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n\n                    </div>\n                    <div class=\"form-group row m-0 col-sm-12 mb-3 pl-0\">\n                        <div class=\"col-sm-6 row m-0 p-0\">\n                            <label class=\"col-sm-4 text-left p-0 col-form-label \"> {{ 'COMMON.MODULE.REPORT_TEMPLATE.TYPE' | translate }} <span\n                                    class=\"required\"> :</span></label>\n                            <div class=\"col-sm-8 p-0\">\n                                <ng-select\n                                        class=\"col-sm-12 pl-0 pr-0\"\n                                        required\n                                        [clearable]=\"false\"\n                                        id=\"type\"\n                                        [items]=\"typeList\"\n                                        formControlName=\"type\"\n                                        name=\"type\"\n                                        bindValue=\"type\"\n                                        bindLabel=\"name\"\n                                        (changeEvent)=\"changeFormValid()\">\n                                    <ng-template ng-label-tmp let-item=\"item\">\n                                        {{item['name'] | translate}}\n                                    </ng-template>\n                                    <ng-template ng-option-tmp let-item=\"item\">\n                                        {{item['name'] | translate}}\n                                    </ng-template>\n                                </ng-select>\n                                <!-- validate -->\n                                <div *ngIf=\"type.invalid && (type.dirty || type.touched)\"\n                                     class=\"text-danger mt-2 text-df\">\n                                    <div *ngIf=\"type.errors.required\">\n                                        <i class=\"fa fa-exclamation-triangle mr-1\"></i>\n                                        {{ 'COMMON.MODULE.REPORT_TEMPLATE.TYPE_REQUIRED' | translate }}\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n\n                        <div class=\"col-sm-6 row m-0 p-0\">\n                            <label class=\"col-sm-4 text-left  col-form-label \"> {{ 'COMMON.MODULE.REPORT_TEMPLATE.NAME' | translate }} <span\n                                    class=\"required\"> :</span></label>\n                            <div class=\"col-sm-8 p-0\">\n                                <input type=\"text\"\n                                       class=\"form-control form-control-sm \"\n                                       formControlName=\"name\" readonly\n                                       [ngClass]=\"{'is-invalid': name.errors && name.touched}\"\n                                        (keyup)=\"changeFormValid()\"\n                                       id=\"name\" name=\"name\" value=\"\">\n                                <!-- validate -->\n                                <div *ngIf=\"name.invalid && (name.dirty || name.touched)\"\n                                     class=\"text-danger mt-2 text-df\">\n                                    <div *ngIf=\"name.errors.required\">\n                                        <i class=\"fa fa-exclamation-triangle mr-1\"></i>\n                                        {{ 'COMMON.MODULE.REPORT_TEMPLATE.NAME_REQUIRED' | translate }}\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"form-group row m-0 col-sm-12 mb-3 pl-0\">\n                        <div class=\"col-sm-6 row m-0 p-0\">\n                            <label class=\"col-sm-4 text-left p-0 col-form-label \"> {{ 'COMMON.MODULE.REPORT_TEMPLATE.VERSION' | translate }} <span\n                                    class=\"required\"> :</span></label>\n                            <div class=\"col-sm-8 p-0\">\n                                <ng-select\n                                        class=\"col -sm-12 pl-0 pr-0\"\n                                        required\n                                        [clearable]=\"false\"\n                                        id=\"version\"\n                                        bindLabel=\"description\"\n                                        bindValue=\"name\"\n                                        [items]=\"versionList\"\n                                        formControlName=\"version\"\n                                        name=\"version\"\n                                        (changeEvent)=\"changeFormValid()\"\n                                >\n                                </ng-select>\n                                <!-- validate -->\n                                <div *ngIf=\"version.invalid && (version.dirty || version.touched)\"\n                                     class=\"text-danger mt-2 text-df\">\n                                    <div *ngIf=\"version.errors.required\">\n                                        <i class=\"fa fa-exclamation-triangle mr-1\"></i>\n                                        {{ 'COMMON.MODULE.REPORT_TEMPLATE.VERSION_REQUIRED' | translate }}\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n\n                    <div class=\"col-sm-12 form-group row m-0 mb-3 pl-0\">\n                        <label for=\"description\"\n                               class=\"col-sm-2 text-left p-0 col-form-label \"> {{ 'COMMON.MODULE.REPORT_TEMPLATE.DESCRIPTION' | translate }} <span\n                                class=\"required\"> :</span></label>\n                        <div class=\"col-sm-10 p-0\">\n                  <textarea #descr type=\"text\" (keyup)=\"changeFormValid()\" style=\"resize: none\" rows=\"3\"\n                            class=\"form-control form-control-sm \"\n                            formControlName=\"description\"\n                            [ngClass]=\"{'is-invalid': description.errors && description.touched}\"\n                            id=\"description\" name=\"description\" value=\"\" required></textarea>\n                            <!-- validate -->\n                            <div *ngIf=\"description.invalid && (description.dirty || description.touched)\"\n                                 class=\"text-danger mt-2 text-df\">\n                                <div *ngIf=\"description.errors.required\">\n                                    <i class=\"fa fa-exclamation-triangle mr-1\"></i>\n                                    {{ 'COMMON.MODULE.REPORT_TEMPLATE.DESCRIPTION_REQUIRED' | translate }}\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n\n                    <div class=\"col-sm-12 form-group row m-0 mb-3 pl-0\">\n                        <label class=\"control-label col-form-label col-sm-2 pl-0 \">\n                            {{ 'COMMON.MODULE.REPORT_TEMPLATE.FILE_UPLOAD' | translate }} <span\n                                class=\"required\"> :</span>\n                        </label>\n                        <div class=\"col-sm-10 p-0\">\n                            <label class=\"i-file-input\">\n                                <input #file type=\"file\" (change)=\"changeFile($event);changeFormValid()\" formControlName=\"fileUpload\"\n                                       name=\"fileUpload\"\n                                       class=\"form-control form-control-sm col-xs-12 col-sm-12\">\n                                <span class=\"i-file-container\" [ngClass]=\"{'selected': fileName}\"\n                                      [attr.data-title]=\"'COMMON.MODULE.REPORT_TEMPLATE.CHOOSE' | translate\">\n                                                            <span class=\"i-file-name\"\n                                                                  [attr.data-title]=\"fileName || ('COMMON.MODULE.REPORT_TEMPLATE.NO_FILE' | translate)\">\n                                                                <i class=\"file-icon fa fa-upload\"></i>\n                                                            </span>\n                                                        </span>\n                                <a class=\"remove\" *ngIf=\"fileName\" href=\"javascript:;\" (click)=\"clearForm()\">\n\n                                    <i class=\"fa fa-times\"></i>\n                                </a>\n                            </label>\n                        </div>\n                    </div>\n                </form>\n            </div>\n        </div>\n    </div>\n</div>\n\n",
                    styles: [":host #report-template-content{height:calc(100vh - 115px)}@media (max-width:700px){:host .reponsive-card{padding:0 30px}}:host .pointer{pointer-events:none}:host .custom-center-span{display:flex;align-items:center}:host .center-body{flex-direction:row;justify-content:center;align-content:start}:host .shadow{box-shadow:0 .5rem 1rem rgba(0,0,0,.15)!important}"]
                }] }
    ];
    /** @nocollapse */
    ReportTemplateEditComponent.ctorParameters = function () { return [
        { type: Location },
        { type: FormBuilder },
        { type: NotificationService },
        { type: ReportTemplateService },
        { type: TranslateService },
        { type: ActivatedRoute }
    ]; };
    ReportTemplateEditComponent.propDecorators = {
        templateId: [{ type: Input }],
        validForm: [{ type: Output }],
        appName: [{ type: Input }],
        appDesc: [{ type: Input }],
        templateFormElementRef: [{ type: ViewChild, args: ['templateForm',] }]
    };
    return ReportTemplateEditComponent;
}());
export { ReportTemplateEditComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwb3J0LXRlbXBsYXRlLWVkaXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC11aS8iLCJzb3VyY2VzIjpbInNyYy9yZXBvcnQtdGVtcGxhdGUvcmVwb3J0LXRlbXBsYXRlLWVkaXQvcmVwb3J0LXRlbXBsYXRlLWVkaXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNILFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLEtBQUssRUFHTCxNQUFNLEVBQ04sU0FBUyxFQUNaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFDLFlBQVksRUFBRSxtQkFBbUIsRUFBQyxNQUFNLFdBQVcsQ0FBQztBQUM1RCxPQUFPLEVBQUMsV0FBVyxFQUFhLFVBQVUsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ2xFLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBRXJELE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBR2pFO0lBeUJJLHFDQUFvQixRQUFrQixFQUNsQixFQUFlLEVBQ2YsWUFBaUMsRUFDakMsT0FBOEIsRUFDOUIsU0FBMkIsRUFDM0IsS0FBcUI7UUFMekMsaUJBVUM7UUFWbUIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNsQixPQUFFLEdBQUYsRUFBRSxDQUFhO1FBQ2YsaUJBQVksR0FBWixZQUFZLENBQXFCO1FBQ2pDLFlBQU8sR0FBUCxPQUFPLENBQXVCO1FBQzlCLGNBQVMsR0FBVCxTQUFTLENBQWtCO1FBQzNCLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBdkIvQixjQUFTLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztRQUdsRCxvQkFBZSxHQUFHLEVBQUUsQ0FBQztRQUNyQixh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Qjs7Ozs7SUFDMUIseUNBQXVCOzs7OztJQUN2QixtREFBeUM7Ozs7O0lBQ3pDLDhDQUFzQzs7Ozs7SUFDdEMsZ0RBQW1DOzs7OztJQUNuQyw0Q0FBNkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENvbXBvbmVudCxcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBJbnB1dCxcbiAgICBPbkRlc3Ryb3ksXG4gICAgT25Jbml0LFxuICAgIE91dHB1dCxcbiAgICBWaWV3Q2hpbGRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0xvY2F0aW9ufSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XG5pbXBvcnQge0FjdGl2YXRlZFJvdXRlfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQge0Vycm9yTWVzc2FnZSwgTm90aWZpY2F0aW9uU2VydmljZX0gZnJvbSBcImluZXQtY29yZVwiO1xuaW1wb3J0IHtGb3JtQnVpbGRlciwgRm9ybUdyb3VwLCBWYWxpZGF0b3JzfSBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcbmltcG9ydCB7VHJhbnNsYXRlU2VydmljZX0gZnJvbSBcIkBuZ3gtdHJhbnNsYXRlL2NvcmVcIjtcbmltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tIFwicnhqc1wiO1xuaW1wb3J0IHtSZXBvcnRUZW1wbGF0ZVNlcnZpY2V9IGZyb20gXCIuLi9yZXBvcnQtdGVtcGxhdGUuc2VydmljZVwiO1xuZGVjbGFyZSBsZXQgaU5ldDogYW55O1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2FwcC1yZXBvcnQtdGVtcGxhdGUtZWRpdCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3JlcG9ydC10ZW1wbGF0ZS1lZGl0LmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9yZXBvcnQtdGVtcGxhdGUtZWRpdC5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUmVwb3J0VGVtcGxhdGVFZGl0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAgIEBJbnB1dCgpIHRlbXBsYXRlSWQ6IHN0cmluZztcbiAgICBAT3V0cHV0KCkgdmFsaWRGb3JtID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuICAgIEBJbnB1dCgpIGFwcE5hbWU6IHN0cmluZztcbiAgICBASW5wdXQoKSBhcHBEZXNjOiBzdHJpbmc7XG4gICAgYXBwbGljYXRpb25MaXN0ID0gW107XG4gICAgdHlwZUxpc3QgPSBbXTtcbiAgICBtb2R1bGVMaXN0ID0gW107XG4gICAgdmVyc2lvbkxpc3QgPSBbe25hbWU6IDEsIGRlc2NyaXB0aW9uOiAnUGhpw6puIGLhuqNuIDEnfSwge25hbWU6IDIsIGRlc2NyaXB0aW9uOiAnUGhpw6puIGLhuqNuIDInfV07XG4gICAgdGVtcGxhdGVGb3JtR3JvdXA6IEZvcm1Hcm91cDtcbiAgICBhdHRhY2htZW50cyA9IFtdO1xuICAgIGZpbGVOYW1lOiBzdHJpbmc7XG4gICAgYXBwbGljYXRpb25QYXJhbXM6IHN0cmluZztcbiAgICBtb2R1bGVQYXJhbXM6IHN0cmluZztcbiAgICB0eXBlUGFyYW1zOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBzdWJSb3V0ZXI6IFN1YnNjcmlwdGlvbjtcbiAgICBwcml2YXRlIHRyYW5zbGF0ZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICAgIHByaXZhdGUgZm9ybVRyYW5zbGF0aW9uczogYW55O1xuICAgIEBWaWV3Q2hpbGQoJ3RlbXBsYXRlRm9ybScpIHRlbXBsYXRlRm9ybUVsZW1lbnRSZWY6IEVsZW1lbnRSZWY7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGxvY2F0aW9uOiBMb2NhdGlvbixcbiAgICAgICAgICAgICAgICBwcml2YXRlIGZiOiBGb3JtQnVpbGRlcixcbiAgICAgICAgICAgICAgICBwcml2YXRlIG5vdGlmaWNhdGlvbjogTm90aWZpY2F0aW9uU2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIHNlcnZpY2U6IFJlcG9ydFRlbXBsYXRlU2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIHRyYW5zbGF0ZTogVHJhbnNsYXRlU2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSkge1xuXG4gICAgICAgIHRoaXMudHJhbnNsYXRlU3Vic2NyaXB0aW9uID0gdGhpcy50cmFuc2xhdGUuZ2V0KFsnQ09NTU9OLk1PRFVMRS5SRVBPUlRfVEVNUExBVEUnXSkuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICAgICAgICB0aGlzLmZvcm1UcmFuc2xhdGlvbnMgPSByZXNbJ0NPTU1PTi5NT0RVTEUuUkVQT1JUX1RFTVBMQVRFJ107XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgdGhpcy5zdWJSb3V0ZXIgPSB0aGlzLnJvdXRlLnF1ZXJ5UGFyYW1NYXAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgcGFyYW1zID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmFwcGxpY2F0aW9uUGFyYW1zID0gcGFyYW1zLmdldCgnYXBwbGljYXRpb24nKTtcbiAgICAgICAgICAgICAgICB0aGlzLm1vZHVsZVBhcmFtcyA9IHBhcmFtcy5nZXQoJ21vZHVsZScpO1xuICAgICAgICAgICAgICAgIHRoaXMudHlwZVBhcmFtcyA9IHBhcmFtcy5nZXQoJ3R5cGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5pbml0Rm9ybSgpO1xuICAgICAgICB0aGlzLmluaXREYXRhKCk7XG4gICAgICAgIHRoaXMubG9hZEFwcGxpY2F0aW9uKCk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIGlmKHRoaXMudHJhbnNsYXRlU3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnRyYW5zbGF0ZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgICAgIGlmKHRoaXMuc3ViUm91dGVyKXtcbiAgICAgICAgICAgIHRoaXMuc3ViUm91dGVyLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBsb2FkQnlJZCh0ZW1wbGF0ZUlkOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHRlbXBsYXRlSWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2VydmljZS52aWV3KHRlbXBsYXRlSWQpLnN1YnNjcmliZShkYXRhID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS50eXBlICE9PSBFcnJvck1lc3NhZ2UuVFlQRSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRlbXBsYXRlSWQgPSB0ZW1wbGF0ZUlkO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFwcGxpY2F0aW9uUGFyYW1zID0gZGF0YS5hcHBsaWNhdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50ZW1wbGF0ZUZvcm1Hcm91cC5wYXRjaFZhbHVlKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbGVOYW1lID0gZGF0YS5uYW1lO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbGlkRm9ybS5lbWl0KHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0RGF0YSgpIHtcbiAgICAgICAgdGhpcy52ZXJzaW9uLnNldFZhbHVlKDIpO1xuICAgICAgICB0aGlzLmFwcGxpY2F0aW9uLnNldFZhbHVlKHRoaXMuYXBwbGljYXRpb25QYXJhbXMpO1xuICAgICAgICB0aGlzLm1vZHVsZS5zZXRWYWx1ZSh0aGlzLm1vZHVsZVBhcmFtcyk7XG4gICAgICAgIHRoaXMudHlwZS5zZXRWYWx1ZSh0aGlzLnR5cGVQYXJhbXMpO1xuXG4gICAgfVxuXG4gICAgcmVzZXQoKSB7XG4gICAgICAgIHRoaXMudGVtcGxhdGVGb3JtR3JvdXAucmVzZXQoKTtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZUlkID0gJyc7XG4gICAgICAgIHRoaXMuZmlsZU5hbWUgPSAnJztcbiAgICAgICAgdGhpcy5pbml0RGF0YSgpO1xuICAgICAgICB0aGlzLmxvYWRBcHBsaWNhdGlvbigpO1xuICAgICAgICB0aGlzLmNoYW5nZUZvcm1WYWxpZCgpO1xuICAgIH1cblxuICAgIGNoYW5nZUZpbGUoJGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IGZpbGVzID0gJGV2ZW50LnRhcmdldC5maWxlcztcbiAgICAgICAgaWYgKGZpbGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGNvbnN0IHVwbG9hZCA9IGZpbGVzWzBdO1xuICAgICAgICAgICAgaWYgKHVwbG9hZCkge1xuICAgICAgICAgICAgICAgIHRoaXMubmFtZS5zZXRWYWx1ZSh1cGxvYWRbJ25hbWUnXSk7XG4gICAgICAgICAgICAgICAgdGhpcy5maWxlTmFtZSA9IHVwbG9hZFsnbmFtZSddO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2hhbmdlRm9ybVZhbGlkKCk7XG4gICAgfVxuXG4gICAgY2xlYXJGb3JtKCkge1xuICAgICAgICB0aGlzLmZpbGVOYW1lID0gJyc7XG4gICAgICAgIGlmICh0aGlzLmZpbGVVcGxvYWQudmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuZmlsZVVwbG9hZC5zZXRWYWx1ZSgnJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jaGFuZ2VGb3JtVmFsaWQoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGxvYWRBcHBsaWNhdGlvbigpIHtcbiAgICAgICAgaWYoIXRoaXMuYXBwTmFtZSkge1xuICAgICAgICAgICAgdGhpcy5zZXJ2aWNlLmFwcGxpY2F0aW9uKCkuc3Vic2NyaWJlKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChkYXRhLnR5cGUgIT09IEVycm9yTWVzc2FnZS5UWVBFKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXBwbGljYXRpb25MaXN0ID0gZGF0YS5pdGVtcyB8fCBbXTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcHBsaWNhdGlvbi5zZXRWYWx1ZSh0aGlzLmFwcGxpY2F0aW9uUGFyYW1zIHx8IHRoaXMuYXBwbGljYXRpb24udmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRNb2R1bGVzKHRoaXMuYXBwbGljYXRpb25QYXJhbXMgfHwgdGhpcy5hcHBsaWNhdGlvbi52YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmFwcGxpY2F0aW9uUGFyYW1zID0gdGhpcy5hcHBOYW1lO1xuICAgICAgICAgICAgY29uc3QgYXBwID0ge2lkOiB0aGlzLmFwcE5hbWUsIGRlc2NyaXB0aW9uOiB0aGlzLmFwcERlc2MgfHwgdGhpcy5hcHBOYW1lLCBuYW1lOiB0aGlzLmFwcE5hbWV9O1xuICAgICAgICAgICAgdGhpcy5hcHBsaWNhdGlvbkxpc3QgPSBbYXBwXTtcbiAgICAgICAgICAgIHRoaXMuYXBwbGljYXRpb24uc2V0VmFsdWUodGhpcy5hcHBOYW1lKTtcbiAgICAgICAgICAgIHRoaXMudGVtcGxhdGVGb3JtR3JvdXAuY29udHJvbHNbJ2FwcGxpY2F0aW9uJ10uZGlzYWJsZSgpO1xuICAgICAgICAgICAgdGhpcy5sb2FkTW9kdWxlcyh0aGlzLmFwcE5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2VydmljZS5vcmdhbklkKCkuc3Vic2NyaWJlKGRhdGEgPT4ge1xuICAgICAgICAgICAgdGhpcy5vcmdhbklkLnNldFZhbHVlKGRhdGEub3JnYW5JZCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNoYW5nZUFwcHMoJGV2ZW50KSB7XG4gICAgICAgIHRoaXMubG9hZE1vZHVsZXMoJGV2ZW50Lm5hbWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgbG9hZE1vZHVsZXMoJGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IF9fbW9kdWxlc0xpc3QgPSBbXTtcbiAgICAgICAgdGhpcy5zZXJ2aWNlLm1vZHVsZXMoJGV2ZW50KS5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICAgICAgICBPYmplY3Qua2V5cyhkYXRhKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBpdGVtICA9ICB7Li4ue3R5cGU6a2V5fSwuLi5kYXRhW2tleV19O1xuICAgICAgICAgICAgICAgIF9fbW9kdWxlc0xpc3QucHVzaChpdGVtKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5tb2R1bGVMaXN0ID0gX19tb2R1bGVzTGlzdDtcbiAgICAgICAgICAgIGlmICh0aGlzLm1vZHVsZUxpc3QubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMubW9kdWxlLnNldFZhbHVlKHRoaXMubW9kdWxlLnZhbHVlIHx8IHRoaXMubW9kdWxlTGlzdFswXS50eXBlKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZU1vZHVsZXMoJGV2ZW50KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tb2R1bGUuc2V0VmFsdWUoJycpO1xuICAgICAgICAgICAgICAgIHRoaXMuZGVzY3JpcHRpb24uc2V0VmFsdWUoJycpO1xuICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJGb3JtKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNoYW5nZU1vZHVsZXMoJGV2ZW50KSB7XG4gICAgICAgIGxldCBfX3R5cGVzTGlzdCA9IFtdO1xuICAgICAgICBjb25zdCB0eXBlcyA9IHRoaXMubW9kdWxlTGlzdC5maW5kKGVsZSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZWxlLnR5cGUgPT09IHRoaXMubW9kdWxlLnZhbHVlO1xuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmtleXModHlwZXMpLmZvckVhY2goZWxlID0+IHtcbiAgICAgICAgICAgIF9fdHlwZXNMaXN0ID0gdHlwZXNbZWxlXTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMudHlwZUxpc3QgPSBfX3R5cGVzTGlzdDtcbiAgICAgICAgaWYgKHRoaXMudHlwZUxpc3QubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy50eXBlLnNldFZhbHVlKHRoaXMudHlwZS52YWx1ZSB8fCB0aGlzLnR5cGVMaXN0WzBdLnR5cGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2F2ZSgpIHtcbiAgICAgICAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEodGhpcy50ZW1wbGF0ZUZvcm1FbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICBmb3JtRGF0YS5hcHBlbmQoJ2FwcGxpY2F0aW9uJywgdGhpcy5hcHBsaWNhdGlvbi52YWx1ZSk7XG4gICAgICAgIGZvcm1EYXRhLmFwcGVuZCgnbW9kdWxlJywgdGhpcy5tb2R1bGUudmFsdWUpO1xuICAgICAgICBmb3JtRGF0YS5hcHBlbmQoJ3R5cGUnLCB0aGlzLnR5cGUudmFsdWUpO1xuICAgICAgICBmb3JtRGF0YS5hcHBlbmQoJ3ZlcnNpb24nLCB0aGlzLnZlcnNpb24udmFsdWUpO1xuICAgICAgICBmb3JtRGF0YS5hcHBlbmQoJ29yZ2FuSWQnLCB0aGlzLm9yZ2FuSWQudmFsdWUpO1xuICAgICAgICBpZiAoIWlOZXQuaXNFbXB0eSh0aGlzLnRlbXBsYXRlSWQpKSB7XG4gICAgICAgICAgICBmb3JtRGF0YS5hcHBlbmQoJ3V1aWQnLCB0aGlzLnV1aWQudmFsdWUpO1xuICAgICAgICAgICAgdGhpcy5zZXJ2aWNlLnVwZGF0ZShmb3JtRGF0YSkuc3Vic2NyaWJlKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChkYXRhLnR5cGUgIT09IEVycm9yTWVzc2FnZS5UWVBFKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGVtcGxhdGVGb3JtR3JvdXAucGF0Y2hWYWx1ZShkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50ZW1wbGF0ZUlkID0gZGF0YS51dWlkO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbGVOYW1lID0gZGF0YS5uYW1lO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbGlkRm9ybS5lbWl0KHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbi5zaG93TWVzc2FnZSh0aGlzLmZvcm1UcmFuc2xhdGlvbnNbJ1VQREFURV9TVUNDRVNTJ10sICdzdWNjZXNzJywgdGhpcy5mb3JtVHJhbnNsYXRpb25zWydUSVRMRSddKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbi5zaG93TWVzc2FnZSh0aGlzLmZvcm1UcmFuc2xhdGlvbnNbJ1VQREFURV9FUlJPUiddLCAnZXJyb3InLCB0aGlzLmZvcm1UcmFuc2xhdGlvbnNbJ1RJVExFJ10pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZXJ2aWNlLmFkZChmb3JtRGF0YSkuc3Vic2NyaWJlKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChkYXRhLnR5cGUgIT09IEVycm9yTWVzc2FnZS5UWVBFKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGVtcGxhdGVGb3JtR3JvdXAucGF0Y2hWYWx1ZShkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50ZW1wbGF0ZUlkID0gZGF0YS51dWlkO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbGVOYW1lID0gZGF0YS5uYW1lO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbGlkRm9ybS5lbWl0KHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbi5zaG93TWVzc2FnZSh0aGlzLmZvcm1UcmFuc2xhdGlvbnNbJ0FERF9TVUNDRVNTJ10sICdzdWNjZXNzJywgdGhpcy5mb3JtVHJhbnNsYXRpb25zWydUSVRMRSddKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbi5zaG93TWVzc2FnZSh0aGlzLmZvcm1UcmFuc2xhdGlvbnNbJ0FERF9FUlJPUiddLCAnZXJyb3InLCB0aGlzLmZvcm1UcmFuc2xhdGlvbnNbJ1RJVExFJ10pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBpbml0Rm9ybSgpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZUZvcm1Hcm91cCA9IHRoaXMuZmIuZ3JvdXAoe1xuICAgICAgICAgICAgdXVpZDogW10sXG4gICAgICAgICAgICBhcHBsaWNhdGlvbjogWycnLCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcbiAgICAgICAgICAgIG1vZHVsZTogWycnLCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcbiAgICAgICAgICAgIHR5cGU6IFsnJywgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXG4gICAgICAgICAgICBuYW1lOiBbJycsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFsnJywgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXG4gICAgICAgICAgICB2ZXJzaW9uOiBbJycsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxuICAgICAgICAgICAgb3JnYW5JZDogW10sXG4gICAgICAgICAgICBmaWxlVXBsb2FkOiBbXSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0IHV1aWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRlbXBsYXRlRm9ybUdyb3VwLmdldCgndXVpZCcpO1xuICAgIH1cblxuICAgIGdldCBhcHBsaWNhdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGVtcGxhdGVGb3JtR3JvdXAuZ2V0KCdhcHBsaWNhdGlvbicpO1xuICAgIH1cblxuICAgIGdldCBtb2R1bGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRlbXBsYXRlRm9ybUdyb3VwLmdldCgnbW9kdWxlJyk7XG4gICAgfVxuXG4gICAgZ2V0IHR5cGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRlbXBsYXRlRm9ybUdyb3VwLmdldCgndHlwZScpO1xuICAgIH1cblxuICAgIGdldCBuYW1lKCkge1xuICAgICAgICByZXR1cm4gdGhpcy50ZW1wbGF0ZUZvcm1Hcm91cC5nZXQoJ25hbWUnKTtcbiAgICB9XG5cbiAgICBnZXQgZGVzY3JpcHRpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRlbXBsYXRlRm9ybUdyb3VwLmdldCgnZGVzY3JpcHRpb24nKTtcbiAgICB9XG5cbiAgICBnZXQgdmVyc2lvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGVtcGxhdGVGb3JtR3JvdXAuZ2V0KCd2ZXJzaW9uJyk7XG4gICAgfVxuXG4gICAgZ2V0IG9yZ2FuSWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRlbXBsYXRlRm9ybUdyb3VwLmdldCgnb3JnYW5JZCcpO1xuICAgIH1cblxuICAgIGdldCBmaWxlVXBsb2FkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy50ZW1wbGF0ZUZvcm1Hcm91cC5nZXQoJ2ZpbGVVcGxvYWQnKTtcbiAgICB9XG5cbiAgICBjaGFuZ2VGb3JtVmFsaWQoKSB7XG4gICAgICAgIGxldCBfX3ZhbGlkOiBib29sZWFuO1xuICAgICAgICB0aGlzLmZpbGVOYW1lID09PSAnJyA/IF9fdmFsaWQgPSB0cnVlIDogX192YWxpZCA9IGZhbHNlO1xuICAgICAgICBfX3ZhbGlkID8gdGhpcy52YWxpZEZvcm0uZW1pdChmYWxzZSkgOiB0aGlzLnZhbGlkRm9ybS5lbWl0KHRoaXMudGVtcGxhdGVGb3JtR3JvdXAudmFsaWQpO1xuICAgIH1cblxufVxuIl19