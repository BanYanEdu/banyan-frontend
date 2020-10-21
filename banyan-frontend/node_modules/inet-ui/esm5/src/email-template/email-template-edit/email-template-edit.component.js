/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { of, Subject } from "rxjs";
import { ErrorMessage, NotificationService } from "inet-core";
import { EmailTemplateService } from "../email-template.service";
import { TranslateService } from "@ngx-translate/core";
import { EmailTemplate } from "../email-template";
var EmailTemplateEditComponent = /** @class */ (function () {
    function EmailTemplateEditComponent(fb, notification, translate, emailTemplateService) {
        var _this = this;
        this.fb = fb;
        this.notification = notification;
        this.translate = translate;
        this.emailTemplateService = emailTemplateService;
        this.email = new EmailTemplate();
        this.visibleProperty = false; //False to hide the Property Panel.
        this.emailParams = [];
        this.editorConfig = {
            "editable": true,
            "spellcheck": true,
            "height": "calc(100vh - 205px)",
            "minHeight": "100%",
            "width": "100%",
            "minWidth": "0",
            "translate": "yes",
            "enableToolbar": true,
            "showToolbar": true,
            "placeholder": "",
            "imageEndPoint": "",
            "toolbar": [
                ["bold", "italic", "underline", "strikeThrough"],
                ["fontName", "fontSize", "color"],
                ["justifyLeft", "justifyCenter", "justifyRight", "justifyFull", "indent", "outdent"],
                ["emailParam"]
            ]
        };
        this.onValidate = new EventEmitter();
        this.onUpdate = new EventEmitter();
        this.onToggleProperty = new EventEmitter();
        this.formChanged = new Subject();
        this.translateSubscription = translate.get(['COMMON.MODULE.EMAIL_TEMPLATE']).subscribe((/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            _this.columnsTranslations = data['COMMON.MODULE.EMAIL_TEMPLATE'];
        }));
    }
    /**
     * @return {?}
     */
    EmailTemplateEditComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.initForm();
    };
    /**
     * @return {?}
     */
    EmailTemplateEditComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.translateSubscription.unsubscribe();
    };
    /**
     * @return {?}
     */
    EmailTemplateEditComponent.prototype.initForm = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.emailTemplateForm = this.fb.group({
            templateId: [null],
            emailCode: [null, Validators.required],
            emailName: [null, Validators.required],
            emailSubject: [null],
            emailContent: [null],
            inactive: [null]
        });
        this.formChanged.debounceTime(250).distinctUntilChanged().subscribe((/**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            _this.onValidate.emit(v);
        }));
        this.emailTemplateForm.valueChanges.subscribe((/**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            _this.formChanged.next(_this.emailTemplateForm.valid);
        }));
    };
    /**
     * @param {?} emailId
     * @return {?}
     */
    EmailTemplateEditComponent.prototype.loadById = /**
     * @param {?} emailId
     * @return {?}
     */
    function (emailId) {
        var _this = this;
        if (emailId) {
            this.emailTemplateService.loadById(emailId)
                .switchMap((/**
             * @param {?} data
             * @return {?}
             */
            function (data) {
                if (data.type !== ErrorMessage.TYPE) {
                    _this.setData(tslib_1.__assign({}, _this.email, data));
                    return _this.emailTemplateService.listParams(_this.email.application, _this.email.srvVariable);
                }
                else {
                    return of(null);
                }
            }))
                .subscribe((/**
             * @param {?} result
             * @return {?}
             */
            function (result) {
                _this.emailParams = result.items || [];
            }));
        }
    };
    /**
     * @return {?}
     */
    EmailTemplateEditComponent.prototype.toggleProperty = /**
     * @return {?}
     */
    function () {
        this.visibleProperty = !this.visibleProperty;
        this.onToggleProperty.emit(this.visibleProperty);
        return this.visibleProperty;
    };
    /**
     * @param {?} emailTemplate
     * @return {?}
     */
    EmailTemplateEditComponent.prototype.setData = /**
     * @param {?} emailTemplate
     * @return {?}
     */
    function (emailTemplate) {
        this.email = emailTemplate;
        this.email.templateId = this.email.uuid;
        this.email.inactive = !this.email.inactive; //active
        this.emailTemplateForm.patchValue(emailTemplate);
    };
    /**
     * @return {?}
     */
    EmailTemplateEditComponent.prototype.clearData = /**
     * @return {?}
     */
    function () {
        this.emailTemplateForm.reset();
    };
    /**
     * @param {?} placeholderContent
     * @return {?}
     */
    EmailTemplateEditComponent.prototype.setEditorPlaceholder = /**
     * @param {?} placeholderContent
     * @return {?}
     */
    function (placeholderContent) {
        this.editorConfig.placeholder = placeholderContent;
    };
    /**
     * @private
     * @return {?}
     */
    EmailTemplateEditComponent.prototype.getData = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var data = this.emailTemplateForm.getRawValue();
        data.inactive = !data.inactive; //active
        return data;
    };
    /**
     * @return {?}
     */
    EmailTemplateEditComponent.prototype.update = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.emailTemplateForm.valid && this.email && this.email.uuid) {
            var _a = this.columnsTranslations, UPDATE_SUCCESS_1 = _a.UPDATE_SUCCESS, UPDATE_ERROR_1 = _a.UPDATE_ERROR, EMAIL_1 = _a.EMAIL;
            this.emailTemplateService.update(this.getData()).subscribe((/**
             * @param {?} data
             * @return {?}
             */
            function (data) {
                if (data.type !== ErrorMessage.TYPE) {
                    _this.setData(tslib_1.__assign({}, _this.email, data));
                    _this.notification.showMessage(UPDATE_SUCCESS_1, 'success', EMAIL_1);
                }
                else {
                    _this.notification.showMessage(UPDATE_ERROR_1, 'error', EMAIL_1);
                }
                _this.onUpdate.emit(data);
            }));
        }
    };
    EmailTemplateEditComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-email-template-edit',
                    template: "<div class=\"row center-body m-0\">\n    <div class=\"row justify-content-center mt-0 mb-0 reponsive-card h-100\" style=\"width: 100%\">\n        <div class=\" card-body-shadow box col-sm-12 p-0\">\n            <div class=\"row ml-0 mr-0 h-100\">\n                <form [formGroup]=\"emailTemplateForm\" class=\"w-100\">\n                    <div class=\" form-group row m-0 w-100\">\n                        <div class=\"pl-0 pr-0 mt-1 mb-0\"\n                             [ngClass]=\"{'col-sm-9':visibleProperty,'col-sm-12':!visibleProperty}\">\n                            <div class=\"col-sm-12 p-0\">\n                                <div class=\"col-sm-12 p-0\">\n                                    <app-ngx-editor [emailParams]=\"emailParams\"\n                                                    [config]=\"editorConfig\" [formControl]=\"emailTemplateForm.controls['emailContent']\"\n                                                    [spellcheck]=\"true\" formControlName=\"emailContent\"></app-ngx-editor>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"col-sm-3 px-0 pl-3 mt-2 mb-0\" [hidden]=\"!visibleProperty\">\n                            <div class=\"form-group row m-0 col-sm-12 mb-2 pl-0\">\n                                <label for=\"emailCode\" class=\"col-sm-4 text-left p-0 col-form-label \">\n                                    {{'COMMON.MODULE.EMAIL_TEMPLATE.EMAIL_CODE'| translate}}<span class=\"required\"> :</span>\n                                </label>\n                                <div class=\"col-sm-12 p-0 pl-1\">\n                                    <input type=\"text\"\n                                           class=\"form-control form-control-sm\"\n                                           name=\"emailCode\" [formControl]=\"emailTemplateForm.controls['emailCode']\"\n                                           [ngClass]=\"{'is-invalid': emailTemplateForm.controls['emailCode'].hasError('required') && emailTemplateForm.controls['emailCode'].touched}\"\n                                           required id=\"emailCode\" value=\"\" readonly>\n                                    <div *ngIf=\"emailTemplateForm.controls['emailCode'].hasError('required') && emailTemplateForm.controls['emailCode'].touched\"\n                                         class=\"text-danger mt-2 text-df\">\n                                        <div>\n                                            <i class=\"fa fa-exclamation-triangle mr-1\"></i>\n                                            {{'COMMON.MODULE.EMAIL_TEMPLATE.EMAIL_CODE_REQUIRED' | translate}}\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n                            <div class=\"col-sm-12 form-group row m-0 mb-2 pl-0\">\n                                <label for=\"emailName\"\n                                       class=\"col-sm-4 text-left p-0 col-form-label \">\n                                    {{'COMMON.MODULE.EMAIL_TEMPLATE.EMAIL_NAME' | translate}}<span class=\"required\"> :</span></label>\n                                <div class=\"col-sm-12 p-0\">\n                                    <input type=\"text\" class=\"form-control form-control-sm \"\n                                           formControlName=\"emailName\" [formControl]=\"emailTemplateForm.controls['emailName']\"\n                                           [ngClass]=\"{'is-invalid': emailTemplateForm.controls['emailName'].hasError('required') && emailTemplateForm.controls['emailName'].touched}\"\n                                           id=\"emailName\" name=\"emailName\" value=\"\" required>\n                                    <div *ngIf=\"emailTemplateForm.controls['emailName'].hasError('required') && emailTemplateForm.controls['emailName'].touched\"\n                                         class=\"text-danger mt-2 text-df\">\n                                        <div>\n                                            <i class=\"fa fa-exclamation-triangle mr-1\"></i>\n                                            {{'COMMON.MODULE.EMAIL_TEMPLATE.EMAIL_NAME_REQUIRED' | translate}}\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n\n                            <div class=\"form-group row m-0 col-sm-12 pl-0 pr-0 mb-2\">\n                                <div class=\"col-sm-12 form-group row m-0 pl-0\">\n                                    <label class=\"col-sm-4 text-left p-0 col-form-label \">\n                                        {{'COMMON.MODULE.EMAIL_TEMPLATE.EMAIL_SUBJECT' | translate}}:</label>\n                                    <div class=\"col-sm-12 p-0\">\n                                    <textarea type=\"text\" rows=\"5\" style=\"resize: none;\"\n                                              class=\"form-control form-control-sm \"\n                                              [formControl]=\"emailTemplateForm.controls['emailSubject']\"\n                                              name=\"emailSubject\" id=\"emailSubject\"></textarea>\n                                    </div>\n                                </div>\n                            </div>\n                            <div class=\"form-group row m-0 col-sm-12 pl-0 pr-0 mb-2\">\n                                <label class=\"control-label col-form-label col-sm-4 pr-0 pl-0 pt-0\">{{'COMMON.MODULE.EMAIL_TEMPLATE.ACTIVE'\n                                    |translate}} : </label>\n                                <div class=\"col-sm-8\">\n                                    <input id=\"inactive\" name=\"inactive\"\n                                           [formControl]=\"emailTemplateForm.controls['inactive']\"\n                                           class=\"switch switch-success\" type=\"checkbox\"/>\n                                    <span class=\"lbl\"></span>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </form>\n            </div>\n        </div>\n    </div>\n</div>\n",
                    styles: ["input[type=checkbox].switch{width:55px;height:25px}input[type=checkbox].switch+.lbl{margin:0 4px;min-height:24px}input[type=checkbox].switch+.lbl::before{font-family:'Open Sans';content:\"ON\\a0\\a0\\a0\\a0\\a0\\a0\\a0\\a0\\a0OFF\";color:#999;text-shadow:0 0 0 #999;font-weight:400;font-size:11px;line-height:17px;height:20px;overflow:hidden;border-radius:12px;background-color:#f5f5f5;box-shadow:inset 0 1px 1px 0 rgba(0,0,0,.15);border:1px solid #ccc;text-align:left;padding:0;width:52px;text-indent:-21px;margin-right:0;transition:text-indent .3s;top:auto}input[type=checkbox].switch+.lbl::after{font-family:'Open Sans';content:'III';font-size:12px;font-weight:400;letter-spacing:0;color:#aaa;text-shadow:none;background-color:#fff;border-radius:100%;width:22px;height:22px;line-height:22px;text-align:center;position:absolute;top:-2px;left:-3px;box-shadow:0 1px 1px 1px rgba(0,0,0,.3);transition:left .3s}input[type=checkbox].switch:checked+.lbl::before{text-indent:8px;color:#fff;text-shadow:0 0 0 #fff;background-color:#8ab2c9;border-color:#6a8ca8}input[type=checkbox].switch:checked+.lbl::after{left:34px;background-color:#fff;color:#98a0a5}input[type=checkbox].switch.switch-success+.lbl{position:relative}input[type=checkbox].switch.switch-success+.lbl::before{font-family:FontAwesome;content:\"\\f00d\";text-shadow:0 -1px 0 rgba(0,0,0,.25);box-shadow:none;border-width:0;font-weight:lighter;font-size:16px;border-radius:12px;display:inline-block;background-color:#888;color:#f2f2f2;width:52px;height:22px;line-height:21px;text-indent:32px;transition:background .1s}input[type=checkbox].switch.switch-success+.lbl::after{content:'';text-shadow:0 -1px 0 rgba(0,0,0,.25);position:absolute;top:2px;left:3px;border-radius:12px;box-shadow:0 -1px 0 rgba(0,0,0,.25);width:18px;height:18px;text-align:center;background-color:#f2f2f2;border:4px solid #f2f2f2;transition:left .2s}input[type=checkbox].switch.switch-success:checked+.lbl::before{content:\"\\f00c\";text-indent:6px;color:#fff;border-color:#b7d3e5;background-color:#2abb2a}input[type=checkbox].switch.switch-success:checked+.lbl::after{left:32px;background-color:#fff;border:4px solid #fff;text-shadow:0 -1px 0 rgba(0,200,0,.25)}@media (max-width:700px){:host .reponsive-card{padding:0 30px}}:host .pointer{pointer-events:none}:host .custom-center-span{display:flex;align-items:center}:host .center-body{flex-direction:row;justify-content:center;align-content:start}:host .cursor{cursor:pointer}:host .cursor:hover{color:#f22858}:host .custom-textarea{overflow-y:auto;max-width:100%;min-width:0}:host .custom-textarea::-webkit-scrollbar{width:6px}:host .custom-textarea::-webkit-scrollbar-track{background:#fff}:host .custom-textarea::-webkit-scrollbar-thumb{background:#888;border-radius:3px}:host .custom-textarea::-webkit-scrollbar-thumb:hover{background:#555}:host .list-height{max-height:390px}:host .custom-textarea ul li{background:#f7f7f7}"]
                }] }
    ];
    /** @nocollapse */
    EmailTemplateEditComponent.ctorParameters = function () { return [
        { type: FormBuilder },
        { type: NotificationService },
        { type: TranslateService },
        { type: EmailTemplateService }
    ]; };
    EmailTemplateEditComponent.propDecorators = {
        visibleProperty: [{ type: Input, args: ['visibleProperty',] }],
        emailId: [{ type: Input }],
        onValidate: [{ type: Output }],
        onUpdate: [{ type: Output }],
        onToggleProperty: [{ type: Output }]
    };
    return EmailTemplateEditComponent;
}());
export { EmailTemplateEditComponent };
if (false) {
    /** @type {?} */
    EmailTemplateEditComponent.prototype.email;
    /** @type {?} */
    EmailTemplateEditComponent.prototype.emailTemplateForm;
    /** @type {?} */
    EmailTemplateEditComponent.prototype.visibleProperty;
    /** @type {?} */
    EmailTemplateEditComponent.prototype.emailId;
    /** @type {?} */
    EmailTemplateEditComponent.prototype.emailParams;
    /** @type {?} */
    EmailTemplateEditComponent.prototype.editorConfig;
    /** @type {?} */
    EmailTemplateEditComponent.prototype.onValidate;
    /** @type {?} */
    EmailTemplateEditComponent.prototype.onUpdate;
    /** @type {?} */
    EmailTemplateEditComponent.prototype.onToggleProperty;
    /**
     * @type {?}
     * @private
     */
    EmailTemplateEditComponent.prototype.formChanged;
    /**
     * @type {?}
     * @private
     */
    EmailTemplateEditComponent.prototype.translateSubscription;
    /**
     * @type {?}
     * @private
     */
    EmailTemplateEditComponent.prototype.columnsTranslations;
    /**
     * @type {?}
     * @private
     */
    EmailTemplateEditComponent.prototype.fb;
    /**
     * @type {?}
     * @private
     */
    EmailTemplateEditComponent.prototype.notification;
    /**
     * @type {?}
     * @private
     */
    EmailTemplateEditComponent.prototype.translate;
    /**
     * @type {?}
     * @private
     */
    EmailTemplateEditComponent.prototype.emailTemplateService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1haWwtdGVtcGxhdGUtZWRpdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbmV0LXVpLyIsInNvdXJjZXMiOlsic3JjL2VtYWlsLXRlbXBsYXRlL2VtYWlsLXRlbXBsYXRlLWVkaXQvZW1haWwtdGVtcGxhdGUtZWRpdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUUsWUFBWSxFQUFZLE1BQU0sZUFBZSxDQUFDO0FBQ3hGLE9BQU8sRUFBQyxXQUFXLEVBQWEsVUFBVSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEUsT0FBTyxFQUFDLEVBQUUsRUFBRSxPQUFPLEVBQWUsTUFBTSxNQUFNLENBQUM7QUFDL0MsT0FBTyxFQUFDLFlBQVksRUFBRSxtQkFBbUIsRUFBQyxNQUFNLFdBQVcsQ0FBQztBQUM1RCxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUMvRCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUNyRCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDaEQ7SUF1Q0ksb0NBQW9CLEVBQWUsRUFDZixZQUFpQyxFQUNqQyxTQUEyQixFQUMzQixvQkFBMEM7UUFIOUQsaUJBUUM7UUFSbUIsT0FBRSxHQUFGLEVBQUUsQ0FBYTtRQUNmLGlCQUFZLEdBQVosWUFBWSxDQUFxQjtRQUNqQyxjQUFTLEdBQVQsU0FBUyxDQUFrQjtRQUMzQix5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1FBcEM5RCxVQUFLLEdBQUcsSUFBSSxhQUFhLEVBQUUsQ0FBQztRQUVGLG9CQUFlLEdBQVksS0FBSyxDQUFDLENBQUMsbUNBQW1DO1FBRS9GLGdCQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLGlCQUFZLEdBQUc7WUFDWCxVQUFVLEVBQUUsSUFBSTtZQUNoQixZQUFZLEVBQUUsSUFB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RUcsbUJBQW1CO2dCQUVqQyxnQkFBZ0I7Z0JBRGhCLG9CQUFvQjs7O2tDQVd2QixLQUFLLFNBQUMsaUJBQWlCOzBCQUN2QixLQUFLOzZCQXFCTCxNQUFNOzJCQUNOLE1BQU07bUNBQ04sTUFBTTs7SUFxR1gsaUNBQUM7Q0FBQSxBQXJJRCxJQXFJQztTQWhJWSwwQkFBMEI7OztJQUNuQywyQ0FBNEI7O0lBQzVCLHVEQUE2Qjs7SUFDN0IscURBQTJEOztJQUMzRCw2Q0FBeUI7O0lBQ3pCLGlEQUFpQjs7SUFDakIsa0RBa0JFOztJQUNGLGdEQUFtRDs7SUFDbkQsOENBQTZDOztJQUM3QyxzREFBeUQ7Ozs7O0lBQ3pELGlEQUErRDs7Ozs7SUFHL0QsMkRBQTRDOzs7OztJQUM1Qyx5REFBaUM7Ozs7O0lBRXJCLHdDQUF1Qjs7Ozs7SUFDdkIsa0RBQXlDOzs7OztJQUN6QywrQ0FBbUM7Ozs7O0lBQ25DLDBEQUFrRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgT25EZXN0cm95fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Rm9ybUJ1aWxkZXIsIEZvcm1Hcm91cCwgVmFsaWRhdG9yc30gZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XG5pbXBvcnQge29mLCBTdWJqZWN0LCBTdWJzY3JpcHRpb259IGZyb20gXCJyeGpzXCI7XG5pbXBvcnQge0Vycm9yTWVzc2FnZSwgTm90aWZpY2F0aW9uU2VydmljZX0gZnJvbSBcImluZXQtY29yZVwiO1xuaW1wb3J0IHtFbWFpbFRlbXBsYXRlU2VydmljZX0gZnJvbSBcIi4uL2VtYWlsLXRlbXBsYXRlLnNlcnZpY2VcIjtcbmltcG9ydCB7VHJhbnNsYXRlU2VydmljZX0gZnJvbSBcIkBuZ3gtdHJhbnNsYXRlL2NvcmVcIjtcbmltcG9ydCB7RW1haWxUZW1wbGF0ZX0gZnJvbSBcIi4uL2VtYWlsLXRlbXBsYXRlXCI7XG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2FwcC1lbWFpbC10ZW1wbGF0ZS1lZGl0JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vZW1haWwtdGVtcGxhdGUtZWRpdC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vZW1haWwtdGVtcGxhdGUtZWRpdC5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgRW1haWxUZW1wbGF0ZUVkaXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gICAgZW1haWwgPSBuZXcgRW1haWxUZW1wbGF0ZSgpO1xuICAgIGVtYWlsVGVtcGxhdGVGb3JtOiBGb3JtR3JvdXA7XG4gICAgQElucHV0KCd2aXNpYmxlUHJvcGVydHknKSB2aXNpYmxlUHJvcGVydHk6IGJvb2xlYW4gPSBmYWxzZTsgLy9GYWxzZSB0byBoaWRlIHRoZSBQcm9wZXJ0eSBQYW5lbC5cbiAgICBASW5wdXQoKSBlbWFpbElkOiBzdHJpbmc7XG4gICAgZW1haWxQYXJhbXMgPSBbXTtcbiAgICBlZGl0b3JDb25maWcgPSB7XG4gICAgICAgIFwiZWRpdGFibGVcIjogdHJ1ZSxcbiAgICAgICAgXCJzcGVsbGNoZWNrXCI6IHRydWUsXG4gICAgICAgIFwiaGVpZ2h0XCI6IFwiY2FsYygxMDB2aCAtIDIwNXB4KVwiLFxuICAgICAgICBcIm1pbkhlaWdodFwiOiBcIjEwMCVcIixcbiAgICAgICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICAgICAgXCJtaW5XaWR0aFwiOiBcIjBcIixcbiAgICAgICAgXCJ0cmFuc2xhdGVcIjogXCJ5ZXNcIixcbiAgICAgICAgXCJlbmFibGVUb29sYmFyXCI6IHRydWUsXG4gICAgICAgIFwic2hvd1Rvb2xiYXJcIjogdHJ1ZSxcbiAgICAgICAgXCJwbGFjZWhvbGRlclwiOiBcIlwiLFxuICAgICAgICBcImltYWdlRW5kUG9pbnRcIjogXCJcIixcbiAgICAgICAgXCJ0b29sYmFyXCI6IFtcbiAgICAgICAgICAgIFtcImJvbGRcIiwgXCJpdGFsaWNcIiwgXCJ1bmRlcmxpbmVcIiwgXCJzdHJpa2VUaHJvdWdoXCJdLFxuICAgICAgICAgICAgW1wiZm9udE5hbWVcIiwgXCJmb250U2l6ZVwiLCBcImNvbG9yXCJdLFxuICAgICAgICAgICAgW1wianVzdGlmeUxlZnRcIiwgXCJqdXN0aWZ5Q2VudGVyXCIsIFwianVzdGlmeVJpZ2h0XCIsIFwianVzdGlmeUZ1bGxcIiwgXCJpbmRlbnRcIiwgXCJvdXRkZW50XCJdLFxuICAgICAgICAgICAgW1wiZW1haWxQYXJhbVwiXVxuICAgICAgICBdXG4gICAgfTtcbiAgICBAT3V0cHV0KCkgb25WYWxpZGF0ZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcbiAgICBAT3V0cHV0KCkgb25VcGRhdGUgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgICBAT3V0cHV0KCkgb25Ub2dnbGVQcm9wZXJ0eSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcbiAgICBwcml2YXRlIGZvcm1DaGFuZ2VkOiBTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IFN1YmplY3Q8Ym9vbGVhbj4oKTtcblxuXG4gICAgcHJpdmF0ZSB0cmFuc2xhdGVTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgICBwcml2YXRlIGNvbHVtbnNUcmFuc2xhdGlvbnM6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZmI6IEZvcm1CdWlsZGVyLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgbm90aWZpY2F0aW9uOiBOb3RpZmljYXRpb25TZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgdHJhbnNsYXRlOiBUcmFuc2xhdGVTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgZW1haWxUZW1wbGF0ZVNlcnZpY2U6IEVtYWlsVGVtcGxhdGVTZXJ2aWNlKSB7XG5cbiAgICAgICAgdGhpcy50cmFuc2xhdGVTdWJzY3JpcHRpb24gPSB0cmFuc2xhdGUuZ2V0KFsnQ09NTU9OLk1PRFVMRS5FTUFJTF9URU1QTEFURSddKS5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNvbHVtbnNUcmFuc2xhdGlvbnMgPSBkYXRhWydDT01NT04uTU9EVUxFLkVNQUlMX1RFTVBMQVRFJ107XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmluaXRGb3JtKCk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMudHJhbnNsYXRlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgaW5pdEZvcm0oKSB7XG4gICAgICAgIHRoaXMuZW1haWxUZW1wbGF0ZUZvcm0gPSB0aGlzLmZiLmdyb3VwKHtcbiAgICAgICAgICAgIHRlbXBsYXRlSWQ6IFtudWxsXSxcbiAgICAgICAgICAgIGVtYWlsQ29kZTogW251bGwsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxuICAgICAgICAgICAgZW1haWxOYW1lOiBbbnVsbCwgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXG4gICAgICAgICAgICBlbWFpbFN1YmplY3Q6IFtudWxsXSxcbiAgICAgICAgICAgIGVtYWlsQ29udGVudDogW251bGxdLFxuICAgICAgICAgICAgaW5hY3RpdmU6IFtudWxsXVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmZvcm1DaGFuZ2VkLmRlYm91bmNlVGltZSgyNTApLmRpc3RpbmN0VW50aWxDaGFuZ2VkKCkuc3Vic2NyaWJlKHYgPT4ge1xuICAgICAgICAgICAgdGhpcy5vblZhbGlkYXRlLmVtaXQodik7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmVtYWlsVGVtcGxhdGVGb3JtLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoKHY6IEVtYWlsVGVtcGxhdGUpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZm9ybUNoYW5nZWQubmV4dCh0aGlzLmVtYWlsVGVtcGxhdGVGb3JtLnZhbGlkKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbG9hZEJ5SWQoZW1haWxJZDogc3RyaW5nKSB7XG4gICAgICAgIGlmIChlbWFpbElkKSB7XG4gICAgICAgICAgICB0aGlzLmVtYWlsVGVtcGxhdGVTZXJ2aWNlLmxvYWRCeUlkKGVtYWlsSWQpXG4gICAgICAgICAgICAgICAgLnN3aXRjaE1hcChkYXRhID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEudHlwZSAhPT0gRXJyb3JNZXNzYWdlLlRZUEUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7Li4udGhpcy5lbWFpbCwgLi4uZGF0YX0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZW1haWxUZW1wbGF0ZVNlcnZpY2UubGlzdFBhcmFtcyh0aGlzLmVtYWlsLmFwcGxpY2F0aW9uLCB0aGlzLmVtYWlsLnNydlZhcmlhYmxlKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvZihudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZShyZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVtYWlsUGFyYW1zID0gcmVzdWx0Lml0ZW1zIHx8IFtdO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdG9nZ2xlUHJvcGVydHkoKTogYm9vbGVhbiB7XG4gICAgICAgIHRoaXMudmlzaWJsZVByb3BlcnR5ID0gIXRoaXMudmlzaWJsZVByb3BlcnR5O1xuICAgICAgICB0aGlzLm9uVG9nZ2xlUHJvcGVydHkuZW1pdCh0aGlzLnZpc2libGVQcm9wZXJ0eSk7XG4gICAgICAgIHJldHVybiB0aGlzLnZpc2libGVQcm9wZXJ0eTtcbiAgICB9XG5cbiAgICBzZXREYXRhKGVtYWlsVGVtcGxhdGU6IEVtYWlsVGVtcGxhdGUpIHtcbiAgICAgICAgdGhpcy5lbWFpbD0gZW1haWxUZW1wbGF0ZTtcbiAgICAgICAgdGhpcy5lbWFpbC50ZW1wbGF0ZUlkID0gdGhpcy5lbWFpbC51dWlkO1xuICAgICAgICB0aGlzLmVtYWlsLmluYWN0aXZlID0gIXRoaXMuZW1haWwuaW5hY3RpdmU7Ly9hY3RpdmVcbiAgICAgICAgdGhpcy5lbWFpbFRlbXBsYXRlRm9ybS5wYXRjaFZhbHVlKGVtYWlsVGVtcGxhdGUpO1xuICAgIH1cblxuICAgIGNsZWFyRGF0YSgpe1xuICAgICAgICB0aGlzLmVtYWlsVGVtcGxhdGVGb3JtLnJlc2V0KCk7XG4gICAgfVxuXG4gICAgc2V0RWRpdG9yUGxhY2Vob2xkZXIocGxhY2Vob2xkZXJDb250ZW50OiBzdHJpbmcpe1xuICAgICAgICB0aGlzLmVkaXRvckNvbmZpZy5wbGFjZWhvbGRlciA9IHBsYWNlaG9sZGVyQ29udGVudDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldERhdGEoKTogYW55IHtcbiAgICAgICAgY29uc3QgZGF0YSA9IHRoaXMuZW1haWxUZW1wbGF0ZUZvcm0uZ2V0UmF3VmFsdWUoKTtcbiAgICAgICAgZGF0YS5pbmFjdGl2ZSA9ICFkYXRhLmluYWN0aXZlOy8vYWN0aXZlXG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cblxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuZW1haWxUZW1wbGF0ZUZvcm0udmFsaWQgJiYgdGhpcy5lbWFpbCAmJiB0aGlzLmVtYWlsLnV1aWQpIHtcbiAgICAgICAgICAgIGNvbnN0IHtVUERBVEVfU1VDQ0VTUywgVVBEQVRFX0VSUk9SLCBFTUFJTH0gPSB0aGlzLmNvbHVtbnNUcmFuc2xhdGlvbnM7XG4gICAgICAgICAgICB0aGlzLmVtYWlsVGVtcGxhdGVTZXJ2aWNlLnVwZGF0ZSh0aGlzLmdldERhdGEoKSkuc3Vic2NyaWJlKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChkYXRhLnR5cGUgIT09IEVycm9yTWVzc2FnZS5UWVBFKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7Li4udGhpcy5lbWFpbCwgLi4uZGF0YX0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbi5zaG93TWVzc2FnZShVUERBVEVfU1VDQ0VTUywgJ3N1Y2Nlc3MnLCBFTUFJTCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb24uc2hvd01lc3NhZ2UoVVBEQVRFX0VSUk9SLCAnZXJyb3InLCBFTUFJTCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMub25VcGRhdGUuZW1pdChkYXRhKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=