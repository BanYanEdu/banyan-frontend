/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { of, Subject } from "rxjs";
import { ErrorMessage, NotificationService } from "inet-core";
import { EmailTemplateService } from "../email-template.service";
import { TranslateService } from "@ngx-translate/core";
import { EmailTemplate } from "../email-template";
export class EmailTemplateEditComponent {
    /**
     * @param {?} fb
     * @param {?} notification
     * @param {?} translate
     * @param {?} emailTemplateService
     */
    constructor(fb, notification, translate, emailTemplateService) {
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
        data => {
            this.columnsTranslations = data['COMMON.MODULE.EMAIL_TEMPLATE'];
        }));
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.initForm();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.translateSubscription.unsubscribe();
    }
    /**
     * @return {?}
     */
    initForm() {
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
        v => {
            this.onValidate.emit(v);
        }));
        this.emailTemplateForm.valueChanges.subscribe((/**
         * @param {?} v
         * @return {?}
         */
        (v) => {
            this.formChanged.next(this.emailTemplateForm.valid);
        }));
    }
    /**
     * @param {?} emailId
     * @return {?}
     */
    loadById(emailId) {
        if (emailId) {
            this.emailTemplateService.loadById(emailId)
                .switchMap((/**
             * @param {?} data
             * @return {?}
             */
            data => {
                if (data.type !== ErrorMessage.TYPE) {
                    this.setData(Object.assign({}, this.email, data));
                    return this.emailTemplateService.listParams(this.email.application, this.email.srvVariable);
                }
                else {
                    return of(null);
                }
            }))
                .subscribe((/**
             * @param {?} result
             * @return {?}
             */
            result => {
                this.emailParams = result.items || [];
            }));
        }
    }
    /**
     * @return {?}
     */
    toggleProperty() {
        this.visibleProperty = !this.visibleProperty;
        this.onToggleProperty.emit(this.visibleProperty);
        return this.visibleProperty;
    }
    /**
     * @param {?} emailTemplate
     * @return {?}
     */
    setData(emailTemplate) {
        this.email = emailTemplate;
        this.email.templateId = this.email.uuid;
        this.email.inactive = !this.email.inactive; //active
        this.emailTemplateForm.patchValue(emailTemplate);
    }
    /**
     * @return {?}
     */
    clearData() {
        this.emailTemplateForm.reset();
    }
    /**
     * @param {?} placeholderContent
     * @return {?}
     */
    setEditorPlaceholder(placeholderContent) {
        this.editorConfig.placeholder = placeholderContent;
    }
    /**
     * @private
     * @return {?}
     */
    getData() {
        /** @type {?} */
        const data = this.emailTemplateForm.getRawValue();
        data.inactive = !data.inactive; //active
        return data;
    }
    /**
     * @return {?}
     */
    update() {
        if (this.emailTemplateForm.valid && this.email && this.email.uuid) {
            const { UPDATE_SUCCESS, UPDATE_ERROR, EMAIL } = this.columnsTranslations;
            this.emailTemplateService.update(this.getData()).subscribe((/**
             * @param {?} data
             * @return {?}
             */
            data => {
                if (data.type !== ErrorMessage.TYPE) {
                    this.setData(Object.assign({}, this.email, data));
                    this.notification.showMessage(UPDATE_SUCCESS, 'success', EMAIL);
                }
                else {
                    this.notification.showMessage(UPDATE_ERROR, 'error', EMAIL);
                }
                this.onUpdate.emit(data);
            }));
        }
    }
}
EmailTemplateEditComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-email-template-edit',
                template: "<div class=\"row center-body m-0\">\n    <div class=\"row justify-content-center mt-0 mb-0 reponsive-card h-100\" style=\"width: 100%\">\n        <div class=\" card-body-shadow box col-sm-12 p-0\">\n            <div class=\"row ml-0 mr-0 h-100\">\n                <form [formGroup]=\"emailTemplateForm\" class=\"w-100\">\n                    <div class=\" form-group row m-0 w-100\">\n                        <div class=\"pl-0 pr-0 mt-1 mb-0\"\n                             [ngClass]=\"{'col-sm-9':visibleProperty,'col-sm-12':!visibleProperty}\">\n                            <div class=\"col-sm-12 p-0\">\n                                <div class=\"col-sm-12 p-0\">\n                                    <app-ngx-editor [emailParams]=\"emailParams\"\n                                                    [config]=\"editorConfig\" [formControl]=\"emailTemplateForm.controls['emailContent']\"\n                                                    [spellcheck]=\"true\" formControlName=\"emailContent\"></app-ngx-editor>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"col-sm-3 px-0 pl-3 mt-2 mb-0\" [hidden]=\"!visibleProperty\">\n                            <div class=\"form-group row m-0 col-sm-12 mb-2 pl-0\">\n                                <label for=\"emailCode\" class=\"col-sm-4 text-left p-0 col-form-label \">\n                                    {{'COMMON.MODULE.EMAIL_TEMPLATE.EMAIL_CODE'| translate}}<span class=\"required\"> :</span>\n                                </label>\n                                <div class=\"col-sm-12 p-0 pl-1\">\n                                    <input type=\"text\"\n                                           class=\"form-control form-control-sm\"\n                                           name=\"emailCode\" [formControl]=\"emailTemplateForm.controls['emailCode']\"\n                                           [ngClass]=\"{'is-invalid': emailTemplateForm.controls['emailCode'].hasError('required') && emailTemplateForm.controls['emailCode'].touched}\"\n                                           required id=\"emailCode\" value=\"\" readonly>\n                                    <div *ngIf=\"emailTemplateForm.controls['emailCode'].hasError('required') && emailTemplateForm.controls['emailCode'].touched\"\n                                         class=\"text-danger mt-2 text-df\">\n                                        <div>\n                                            <i class=\"fa fa-exclamation-triangle mr-1\"></i>\n                                            {{'COMMON.MODULE.EMAIL_TEMPLATE.EMAIL_CODE_REQUIRED' | translate}}\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n                            <div class=\"col-sm-12 form-group row m-0 mb-2 pl-0\">\n                                <label for=\"emailName\"\n                                       class=\"col-sm-4 text-left p-0 col-form-label \">\n                                    {{'COMMON.MODULE.EMAIL_TEMPLATE.EMAIL_NAME' | translate}}<span class=\"required\"> :</span></label>\n                                <div class=\"col-sm-12 p-0\">\n                                    <input type=\"text\" class=\"form-control form-control-sm \"\n                                           formControlName=\"emailName\" [formControl]=\"emailTemplateForm.controls['emailName']\"\n                                           [ngClass]=\"{'is-invalid': emailTemplateForm.controls['emailName'].hasError('required') && emailTemplateForm.controls['emailName'].touched}\"\n                                           id=\"emailName\" name=\"emailName\" value=\"\" required>\n                                    <div *ngIf=\"emailTemplateForm.controls['emailName'].hasError('required') && emailTemplateForm.controls['emailName'].touched\"\n                                         class=\"text-danger mt-2 text-df\">\n                                        <div>\n                                            <i class=\"fa fa-exclamation-triangle mr-1\"></i>\n                                            {{'COMMON.MODULE.EMAIL_TEMPLATE.EMAIL_NAME_REQUIRED' | translate}}\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n\n                            <div class=\"form-group row m-0 col-sm-12 pl-0 pr-0 mb-2\">\n                                <div class=\"col-sm-12 form-group row m-0 pl-0\">\n                                    <label class=\"col-sm-4 text-left p-0 col-form-label \">\n                                        {{'COMMON.MODULE.EMAIL_TEMPLATE.EMAIL_SUBJECT' | translate}}:</label>\n                                    <div class=\"col-sm-12 p-0\">\n                                    <textarea type=\"text\" rows=\"5\" style=\"resize: none;\"\n                                              class=\"form-control form-control-sm \"\n                                              [formControl]=\"emailTemplateForm.controls['emailSubject']\"\n                                              name=\"emailSubject\" id=\"emailSubject\"></textarea>\n                                    </div>\n                                </div>\n                            </div>\n                            <div class=\"form-group row m-0 col-sm-12 pl-0 pr-0 mb-2\">\n                                <label class=\"control-label col-form-label col-sm-4 pr-0 pl-0 pt-0\">{{'COMMON.MODULE.EMAIL_TEMPLATE.ACTIVE'\n                                    |translate}} : </label>\n                                <div class=\"col-sm-8\">\n                                    <input id=\"inactive\" name=\"inactive\"\n                                           [formControl]=\"emailTemplateForm.controls['inactive']\"\n                                           class=\"switch switch-success\" type=\"checkbox\"/>\n                                    <span class=\"lbl\"></span>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </form>\n            </div>\n        </div>\n    </div>\n</div>\n",
                styles: ["input[type=checkbox].switch{width:55px;height:25px}input[type=checkbox].switch+.lbl{margin:0 4px;min-height:24px}input[type=checkbox].switch+.lbl::before{font-family:'Open Sans';content:\"ON\\a0\\a0\\a0\\a0\\a0\\a0\\a0\\a0\\a0OFF\";color:#999;text-shadow:0 0 0 #999;font-weight:400;font-size:11px;line-height:17px;height:20px;overflow:hidden;border-radius:12px;background-color:#f5f5f5;box-shadow:inset 0 1px 1px 0 rgba(0,0,0,.15);border:1px solid #ccc;text-align:left;padding:0;width:52px;text-indent:-21px;margin-right:0;transition:text-indent .3s;top:auto}input[type=checkbox].switch+.lbl::after{font-family:'Open Sans';content:'III';font-size:12px;font-weight:400;letter-spacing:0;color:#aaa;text-shadow:none;background-color:#fff;border-radius:100%;width:22px;height:22px;line-height:22px;text-align:center;position:absolute;top:-2px;left:-3px;box-shadow:0 1px 1px 1px rgba(0,0,0,.3);transition:left .3s}input[type=checkbox].switch:checked+.lbl::before{text-indent:8px;color:#fff;text-shadow:0 0 0 #fff;background-color:#8ab2c9;border-color:#6a8ca8}input[type=checkbox].switch:checked+.lbl::after{left:34px;background-color:#fff;color:#98a0a5}input[type=checkbox].switch.switch-success+.lbl{position:relative}input[type=checkbox].switch.switch-success+.lbl::before{font-family:FontAwesome;content:\"\\f00d\";text-shadow:0 -1px 0 rgba(0,0,0,.25);box-shadow:none;border-width:0;font-weight:lighter;font-size:16px;border-radius:12px;display:inline-block;background-color:#888;color:#f2f2f2;width:52px;height:22px;line-height:21px;text-indent:32px;transition:background .1s}input[type=checkbox].switch.switch-success+.lbl::after{content:'';text-shadow:0 -1px 0 rgba(0,0,0,.25);position:absolute;top:2px;left:3px;border-radius:12px;box-shadow:0 -1px 0 rgba(0,0,0,.25);width:18px;height:18px;text-align:center;background-color:#f2f2f2;border:4px solid #f2f2f2;transition:left .2s}input[type=checkbox].switch.switch-success:checked+.lbl::before{content:\"\\f00c\";text-indent:6px;color:#fff;border-color:#b7d3e5;background-color:#2abb2a}input[type=checkbox].switch.switch-success:checked+.lbl::after{left:32px;background-color:#fff;border:4px solid #fff;text-shadow:0 -1px 0 rgba(0,200,0,.25)}@media (max-width:700px){:host .reponsive-card{padding:0 30px}}:host .pointer{pointer-events:none}:host .custom-center-span{display:flex;align-items:center}:host .center-body{flex-direction:row;justify-content:center;align-content:start}:host .cursor{cursor:pointer}:host .cursor:hover{color:#f22858}:host .custom-textarea{overflow-y:auto;max-width:100%;min-width:0}:host .custom-textarea::-webkit-scrollbar{width:6px}:host .custom-textarea::-webkit-scrollbar-track{background:#fff}:host .custom-textarea::-webkit-scrollbar-thumb{background:#888;border-radius:3px}:host .custom-textarea::-webkit-scrollbar-thumb:hover{background:#555}:host .list-height{max-height:390px}:host .custom-textarea ul li{background:#f7f7f7}"]
            }] }
];
/** @nocollapse */
EmailTemplateEditComponent.ctorParameters = () => [
    { type: FormBuilder },
    { type: NotificationService },
    { type: TranslateService },
    { type: EmailTemplateService }
];
EmailTemplateEditComponent.propDecorators = {
    visibleProperty: [{ type: Input, args: ['visibleProperty',] }],
    emailId: [{ type: Input }],
    onValidate: [{ type: Output }],
    onUpdate: [{ type: Output }],
    onToggleProperty: [{ type: Output }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1haWwtdGVtcGxhdGUtZWRpdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbmV0LXVpLyIsInNvdXJjZXMiOlsic3JjL2VtYWlsLXRlbXBsYXRlL2VtYWlsLXRlbXBsYXRlLWVkaXQvZW1haWwtdGVtcGxhdGUtZWRpdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxZQUFZLEVBQVksTUFBTSxlQUFlLENBQUM7QUFDeEYsT0FBTyxFQUFDLFdBQVcsRUFBYSxVQUFVLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNsRSxPQUFPLEVBQUMsRUFBRSxFQUFFLE9BQU8sRUFBZSxNQUFNLE1BQU0sQ0FBQztBQUMvQyxPQUFPLEVBQUMsWUFBWSxFQUFFLG1CQUFtQixFQUFDLE1BQU0sV0FBVyxDQUFDO0FBQzVELE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQy9ELE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ3JELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQU1oRCxNQUFNLE9BQU8sMEJBQTBCOzs7Ozs7O0lBa0NuQyxZQUFvQixFQUFlLEVBQ2YsWUFBaUMsRUFDakMsU0FBMkIsRUFDM0Isb0JBQTBDO1FBSDFDLE9BQUUsR0FBRixFQUFFLENBQWE7UUFDZixpQkFBWSxHQUFaLFlBQVksQ0FBcUI7UUFDakMsY0FBUyxHQUFULFNBQVMsQ0FBa0I7UUFDM0IseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQXBDOUQsVUFBSyxHQUFHLElBQUksYUFBYSxFQUFFLENBQUM7UUFFRixvQkFBZSxHQUFZLEtBQUssQ0FBQyxDQUFDLG1DQUFtQztRQUUvRixnQkFBVyxHQUFHLEVBQUUsQ0FBQztRQUNqQixpQkFBWSxHQUFHO1lBQ1gsVUFBVSxFQUFFLElBQUk7WUFDaEIsWUFB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dkIsS0FBSzt5QkFxQkwsTUFBTTt1QkFDTixNQUFNOytCQUNOLE1BQU07Ozs7SUExQlAsMkNBQTRCOztJQUM1Qix1REFBNkI7O0lBQzdCLHFEQUEyRDs7SUFDM0QsNkNBQXlCOztJQUN6QixpREFBaUI7O0lBQ2pCLGtEQWtCRTs7SUFDRixnREFBbUQ7O0lBQ25ELDhDQUE2Qzs7SUFDN0Msc0RBQXlEOzs7OztJQUN6RCxpREFBK0Q7Ozs7O0lBRy9ELDJEQUE0Qzs7Ozs7SUFDNUMseURBQWlDOzs7OztJQUVyQix3Q0FBdUI7Ozs7O0lBQ3ZCLGtEQUF5Qzs7Ozs7SUFDekMsK0NBQW1DOzs7OztJQUNuQywwREFBa0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIE9uRGVzdHJveX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Zvcm1CdWlsZGVyLCBGb3JtR3JvdXAsIFZhbGlkYXRvcnN9IGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xuaW1wb3J0IHtvZiwgU3ViamVjdCwgU3Vic2NyaXB0aW9ufSBmcm9tIFwicnhqc1wiO1xuaW1wb3J0IHtFcnJvck1lc3NhZ2UsIE5vdGlmaWNhdGlvblNlcnZpY2V9IGZyb20gXCJpbmV0LWNvcmVcIjtcbmltcG9ydCB7RW1haWxUZW1wbGF0ZVNlcnZpY2V9IGZyb20gXCIuLi9lbWFpbC10ZW1wbGF0ZS5zZXJ2aWNlXCI7XG5pbXBvcnQge1RyYW5zbGF0ZVNlcnZpY2V9IGZyb20gXCJAbmd4LXRyYW5zbGF0ZS9jb3JlXCI7XG5pbXBvcnQge0VtYWlsVGVtcGxhdGV9IGZyb20gXCIuLi9lbWFpbC10ZW1wbGF0ZVwiO1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhcHAtZW1haWwtdGVtcGxhdGUtZWRpdCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2VtYWlsLXRlbXBsYXRlLWVkaXQuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2VtYWlsLXRlbXBsYXRlLWVkaXQuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIEVtYWlsVGVtcGxhdGVFZGl0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAgIGVtYWlsID0gbmV3IEVtYWlsVGVtcGxhdGUoKTtcbiAgICBlbWFpbFRlbXBsYXRlRm9ybTogRm9ybUdyb3VwO1xuICAgIEBJbnB1dCgndmlzaWJsZVByb3BlcnR5JykgdmlzaWJsZVByb3BlcnR5OiBib29sZWFuID0gZmFsc2U7IC8vRmFsc2UgdG8gaGlkZSB0aGUgUHJvcGVydHkgUGFuZWwuXG4gICAgQElucHV0KCkgZW1haWxJZDogc3RyaW5nO1xuICAgIGVtYWlsUGFyYW1zID0gW107XG4gICAgZWRpdG9yQ29uZmlnID0ge1xuICAgICAgICBcImVkaXRhYmxlXCI6IHRydWUsXG4gICAgICAgIFwic3BlbGxjaGVja1wiOiB0cnVlLFxuICAgICAgICBcImhlaWdodFwiOiBcImNhbGMoMTAwdmggLSAyMDVweClcIixcbiAgICAgICAgXCJtaW5IZWlnaHRcIjogXCIxMDAlXCIsXG4gICAgICAgIFwid2lkdGhcIjogXCIxMDAlXCIsXG4gICAgICAgIFwibWluV2lkdGhcIjogXCIwXCIsXG4gICAgICAgIFwidHJhbnNsYXRlXCI6IFwieWVzXCIsXG4gICAgICAgIFwiZW5hYmxlVG9vbGJhclwiOiB0cnVlLFxuICAgICAgICBcInNob3dUb29sYmFyXCI6IHRydWUsXG4gICAgICAgIFwicGxhY2Vob2xkZXJcIjogXCJcIixcbiAgICAgICAgXCJpbWFnZUVuZFBvaW50XCI6IFwiXCIsXG4gICAgICAgIFwidG9vbGJhclwiOiBbXG4gICAgICAgICAgICBbXCJib2xkXCIsIFwiaXRhbGljXCIsIFwidW5kZXJsaW5lXCIsIFwic3RyaWtlVGhyb3VnaFwiXSxcbiAgICAgICAgICAgIFtcImZvbnROYW1lXCIsIFwiZm9udFNpemVcIiwgXCJjb2xvclwiXSxcbiAgICAgICAgICAgIFtcImp1c3RpZnlMZWZ0XCIsIFwianVzdGlmeUNlbnRlclwiLCBcImp1c3RpZnlSaWdodFwiLCBcImp1c3RpZnlGdWxsXCIsIFwiaW5kZW50XCIsIFwib3V0ZGVudFwiXSxcbiAgICAgICAgICAgIFtcImVtYWlsUGFyYW1cIl1cbiAgICAgICAgXVxuICAgIH07XG4gICAgQE91dHB1dCgpIG9uVmFsaWRhdGUgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG4gICAgQE91dHB1dCgpIG9uVXBkYXRlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gICAgQE91dHB1dCgpIG9uVG9nZ2xlUHJvcGVydHkgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG4gICAgcHJpdmF0ZSBmb3JtQ2hhbmdlZDogU3ViamVjdDxib29sZWFuPiA9IG5ldyBTdWJqZWN0PGJvb2xlYW4+KCk7XG5cblxuICAgIHByaXZhdGUgdHJhbnNsYXRlU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gICAgcHJpdmF0ZSBjb2x1bW5zVHJhbnNsYXRpb25zOiBhbnk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGZiOiBGb3JtQnVpbGRlcixcbiAgICAgICAgICAgICAgICBwcml2YXRlIG5vdGlmaWNhdGlvbjogTm90aWZpY2F0aW9uU2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIHRyYW5zbGF0ZTogVHJhbnNsYXRlU2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIGVtYWlsVGVtcGxhdGVTZXJ2aWNlOiBFbWFpbFRlbXBsYXRlU2VydmljZSkge1xuXG4gICAgICAgIHRoaXMudHJhbnNsYXRlU3Vic2NyaXB0aW9uID0gdHJhbnNsYXRlLmdldChbJ0NPTU1PTi5NT0RVTEUuRU1BSUxfVEVNUExBVEUnXSkuc3Vic2NyaWJlKGRhdGEgPT4ge1xuICAgICAgICAgICAgdGhpcy5jb2x1bW5zVHJhbnNsYXRpb25zID0gZGF0YVsnQ09NTU9OLk1PRFVMRS5FTUFJTF9URU1QTEFURSddO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5pbml0Rm9ybSgpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLnRyYW5zbGF0ZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIGluaXRGb3JtKCkge1xuICAgICAgICB0aGlzLmVtYWlsVGVtcGxhdGVGb3JtID0gdGhpcy5mYi5ncm91cCh7XG4gICAgICAgICAgICB0ZW1wbGF0ZUlkOiBbbnVsbF0sXG4gICAgICAgICAgICBlbWFpbENvZGU6IFtudWxsLCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcbiAgICAgICAgICAgIGVtYWlsTmFtZTogW251bGwsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxuICAgICAgICAgICAgZW1haWxTdWJqZWN0OiBbbnVsbF0sXG4gICAgICAgICAgICBlbWFpbENvbnRlbnQ6IFtudWxsXSxcbiAgICAgICAgICAgIGluYWN0aXZlOiBbbnVsbF1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5mb3JtQ2hhbmdlZC5kZWJvdW5jZVRpbWUoMjUwKS5kaXN0aW5jdFVudGlsQ2hhbmdlZCgpLnN1YnNjcmliZSh2ID0+IHtcbiAgICAgICAgICAgIHRoaXMub25WYWxpZGF0ZS5lbWl0KHYpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5lbWFpbFRlbXBsYXRlRm9ybS52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKCh2OiBFbWFpbFRlbXBsYXRlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmZvcm1DaGFuZ2VkLm5leHQodGhpcy5lbWFpbFRlbXBsYXRlRm9ybS52YWxpZCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGxvYWRCeUlkKGVtYWlsSWQ6IHN0cmluZykge1xuICAgICAgICBpZiAoZW1haWxJZCkge1xuICAgICAgICAgICAgdGhpcy5lbWFpbFRlbXBsYXRlU2VydmljZS5sb2FkQnlJZChlbWFpbElkKVxuICAgICAgICAgICAgICAgIC5zd2l0Y2hNYXAoZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLnR5cGUgIT09IEVycm9yTWVzc2FnZS5UWVBFKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldERhdGEoey4uLnRoaXMuZW1haWwsIC4uLmRhdGF9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmVtYWlsVGVtcGxhdGVTZXJ2aWNlLmxpc3RQYXJhbXModGhpcy5lbWFpbC5hcHBsaWNhdGlvbiwgdGhpcy5lbWFpbC5zcnZWYXJpYWJsZSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2YobnVsbCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUocmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWFpbFBhcmFtcyA9IHJlc3VsdC5pdGVtcyB8fCBbXTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRvZ2dsZVByb3BlcnR5KCk6IGJvb2xlYW4ge1xuICAgICAgICB0aGlzLnZpc2libGVQcm9wZXJ0eSA9ICF0aGlzLnZpc2libGVQcm9wZXJ0eTtcbiAgICAgICAgdGhpcy5vblRvZ2dsZVByb3BlcnR5LmVtaXQodGhpcy52aXNpYmxlUHJvcGVydHkpO1xuICAgICAgICByZXR1cm4gdGhpcy52aXNpYmxlUHJvcGVydHk7XG4gICAgfVxuXG4gICAgc2V0RGF0YShlbWFpbFRlbXBsYXRlOiBFbWFpbFRlbXBsYXRlKSB7XG4gICAgICAgIHRoaXMuZW1haWw9IGVtYWlsVGVtcGxhdGU7XG4gICAgICAgIHRoaXMuZW1haWwudGVtcGxhdGVJZCA9IHRoaXMuZW1haWwudXVpZDtcbiAgICAgICAgdGhpcy5lbWFpbC5pbmFjdGl2ZSA9ICF0aGlzLmVtYWlsLmluYWN0aXZlOy8vYWN0aXZlXG4gICAgICAgIHRoaXMuZW1haWxUZW1wbGF0ZUZvcm0ucGF0Y2hWYWx1ZShlbWFpbFRlbXBsYXRlKTtcbiAgICB9XG5cbiAgICBjbGVhckRhdGEoKXtcbiAgICAgICAgdGhpcy5lbWFpbFRlbXBsYXRlRm9ybS5yZXNldCgpO1xuICAgIH1cblxuICAgIHNldEVkaXRvclBsYWNlaG9sZGVyKHBsYWNlaG9sZGVyQ29udGVudDogc3RyaW5nKXtcbiAgICAgICAgdGhpcy5lZGl0b3JDb25maWcucGxhY2Vob2xkZXIgPSBwbGFjZWhvbGRlckNvbnRlbnQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXREYXRhKCk6IGFueSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLmVtYWlsVGVtcGxhdGVGb3JtLmdldFJhd1ZhbHVlKCk7XG4gICAgICAgIGRhdGEuaW5hY3RpdmUgPSAhZGF0YS5pbmFjdGl2ZTsvL2FjdGl2ZVxuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG5cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIGlmICh0aGlzLmVtYWlsVGVtcGxhdGVGb3JtLnZhbGlkICYmIHRoaXMuZW1haWwgJiYgdGhpcy5lbWFpbC51dWlkKSB7XG4gICAgICAgICAgICBjb25zdCB7VVBEQVRFX1NVQ0NFU1MsIFVQREFURV9FUlJPUiwgRU1BSUx9ID0gdGhpcy5jb2x1bW5zVHJhbnNsYXRpb25zO1xuICAgICAgICAgICAgdGhpcy5lbWFpbFRlbXBsYXRlU2VydmljZS51cGRhdGUodGhpcy5nZXREYXRhKCkpLnN1YnNjcmliZShkYXRhID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS50eXBlICE9PSBFcnJvck1lc3NhZ2UuVFlQRSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldERhdGEoey4uLnRoaXMuZW1haWwsIC4uLmRhdGF9KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb24uc2hvd01lc3NhZ2UoVVBEQVRFX1NVQ0NFU1MsICdzdWNjZXNzJywgRU1BSUwpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uLnNob3dNZXNzYWdlKFVQREFURV9FUlJPUiwgJ2Vycm9yJywgRU1BSUwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLm9uVXBkYXRlLmVtaXQoZGF0YSlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19