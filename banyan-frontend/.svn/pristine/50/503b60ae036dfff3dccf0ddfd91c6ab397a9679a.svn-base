/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ViewChild } from '@angular/core';
import { ErrorMessage, NotificationService, SecurityService } from 'inet-core';
import { TranslateService } from '@ngx-translate/core';
import { OrganizationService } from "../../../organization/organization.service";
import { OrganizationInformation } from "../../../model/organization-information";
import { Organization } from "../../../model/organization";
import { Address } from "../../../model/address";
import { OrganizationGeneralInformationComponent } from "../../../organization/organization-general-information/organization-general-information.component";
var BootstrapCompanyProfileComponent = /** @class */ (function () {
    function BootstrapCompanyProfileComponent(orgService, notification, securityService, translate) {
        var _this = this;
        this.orgService = orgService;
        this.notification = notification;
        this.securityService = securityService;
        this.translate = translate;
        // organization global
        this.formValid = false;
        this.translateSubscription = translate.get(['COMMON.MODULE.ORGANIZATION']).subscribe((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            _this.orgTranslations = res['COMMON.MODULE.ORGANIZATION'];
        }));
        this.roleAccess = this.securityService.hasRole('admin' || 'sub_admin');
    }
    /**
     * @return {?}
     */
    BootstrapCompanyProfileComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.load();
    };
    /**
     * @return {?}
     */
    BootstrapCompanyProfileComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.translateSubscription) {
            this.translateSubscription.unsubscribe();
        }
    };
    /**
     * @return {?}
     */
    BootstrapCompanyProfileComponent.prototype.load = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.orgService.viewInfo().subscribe((/**
         * @param {?} org
         * @return {?}
         */
        function (org) {
            _this.orgInfo = Object.assign(new OrganizationInformation(), org);
            console.log('orgInFor', _this.orgInfo);
            _this.setData(_this.orgInfo);
        }));
        // this.orgService.firmLoad().subscribe((data: OrganizationInformation) => {
        //     this.orgInfo = Object.assign(new OrganizationInformation(), data);
        // });
    };
    /**
     * @private
     * @param {?} data
     * @return {?}
     */
    BootstrapCompanyProfileComponent.prototype.setData = /**
     * @private
     * @param {?} data
     * @return {?}
     */
    function (data) {
        this.organization = Object.assign(new Organization(), data);
        if (!this.organization.officeAddress) {
            this.organization.officeAddress = new Address();
        }
    };
    /**
     * @return {?}
     */
    BootstrapCompanyProfileComponent.prototype.onUpdate = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.formValid) {
            if (this.orgInfoComponent) {
                /** @type {?} */
                var organization = Object.assign(new Organization(), this.orgInfoComponent.getData());
                delete organization.logo;
                delete organization['email'];
                this.orgService.update(organization).subscribe((/**
                 * @param {?} data
                 * @return {?}
                 */
                function (data) {
                    var _a = _this.orgTranslations, TITLE = _a.TITLE, UPDATE_SUCCESSFUL_MSG = _a.UPDATE_SUCCESSFUL_MSG, UPDATE_ERROR_MSG = _a.UPDATE_ERROR_MSG;
                    if (ErrorMessage.TYPE !== data.type) {
                        _this.setData(data);
                        _this.notification.showMessage(UPDATE_SUCCESSFUL_MSG, 'success', TITLE);
                    }
                    else {
                        _this.notification.showMessage(UPDATE_ERROR_MSG, 'error', TITLE);
                    }
                }));
            }
        }
    };
    // onUpdate($event) {
    /*
    if (this.formValid) {
        const {TITLE, UPDATE_SUCCESSFUL_MSG, UPDATE_ERROR_MSG} = this.orgTranslations;
        this.orgService.update(this.organization).subscribe(
            (data: any) => {
                if (ErrorMessage.TYPE !== data.type) {
                    this.setData(data);
                    this.notification.showMessage(UPDATE_SUCCESSFUL_MSG, 'success', TITLE);
                } else {
                    this.notification.showMessage(UPDATE_ERROR_MSG, 'error', TITLE);
                }
            }
        );
    }
     */
    // }
    // onUpdate($event) {
    /*
            if (this.formValid) {
                const {TITLE, UPDATE_SUCCESSFUL_MSG, UPDATE_ERROR_MSG} = this.orgTranslations;
                this.orgService.update(this.organization).subscribe(
                    (data: any) => {
                        if (ErrorMessage.TYPE !== data.type) {
                            this.setData(data);
                            this.notification.showMessage(UPDATE_SUCCESSFUL_MSG, 'success', TITLE);
                        } else {
                            this.notification.showMessage(UPDATE_ERROR_MSG, 'error', TITLE);
                        }
                    }
                );
            }
             */
    // }
    /**
     * @param {?} $event
     * @return {?}
     */
    BootstrapCompanyProfileComponent.prototype.onChange = 
    // onUpdate($event) {
    /*
            if (this.formValid) {
                const {TITLE, UPDATE_SUCCESSFUL_MSG, UPDATE_ERROR_MSG} = this.orgTranslations;
                this.orgService.update(this.organization).subscribe(
                    (data: any) => {
                        if (ErrorMessage.TYPE !== data.type) {
                            this.setData(data);
                            this.notification.showMessage(UPDATE_SUCCESSFUL_MSG, 'success', TITLE);
                        } else {
                            this.notification.showMessage(UPDATE_ERROR_MSG, 'error', TITLE);
                        }
                    }
                );
            }
             */
    // }
    /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        this.formValid = $event;
    };
    BootstrapCompanyProfileComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-bootstrap-company-profile',
                    template: "<div class=\"default-layout tb-visible\">\n    <app-common-toolbar></app-common-toolbar>\n    <div class=\"cp-content p-0\" style=\"overflow: hidden\">\n        <div class=\"container-fluid p-0\">\n            <div *ngIf=\"roleAccess\" class=\"container-fluid nav-fixed-top cp-toolbar\">\n                <button class=\"btn btn-sm btn-success mr-1\" type=\"button\" [disabled]=\"!formValid\" [title]=\"'ACTION.SAVE' | translate\" data-toggle=\"tooltip\" (click)=\"onUpdate()\">\n                    <i class=\"fa fa-save\" aria-hidden=\"true\"></i>\n                </button>\n        </div>\n            <div class=\"cp-content p-3\">\n                <app-organization-information class=\"w-100\" *ngIf=\"orgInfo && organization\" [orgInfo]=\"orgInfo\" [organization]=\"organization\" [editable]=\"roleAccess\">\n                    <ng-template #tabContent>\n                        <tabset>\n                            <tab id=\"generate-info-tab\">\n                                <ng-template tabHeading>\n                                    <i class=\"fa fa-info-circle\"></i><b> {{'COMMON.MENU.ORGANIZATION_INFORMATION' | translate}}</b>\n                                </ng-template>\n                                <app-organization-general-information [editable]=\"roleAccess\" (onValidate)=\"onChange($event)\" [orgInfo]=\"organization\"></app-organization-general-information>\n                            </tab>\n                        </tabset>\n                    </ng-template>\n                </app-organization-information>\n            </div>\n        </div>\n    </div>\n</div>\n"
                }] }
    ];
    /** @nocollapse */
    BootstrapCompanyProfileComponent.ctorParameters = function () { return [
        { type: OrganizationService },
        { type: NotificationService },
        { type: SecurityService },
        { type: TranslateService }
    ]; };
    BootstrapCompanyProfileComponent.propDecorators = {
        orgInfoComponent: [{ type: ViewChild, args: [OrganizationGeneralInformationComponent,] }]
    };
    return BootstrapCompanyProfileComponent;
}());
export { BootstrapCompanyProfileComponent };
if (false) {
    /** @type {?} */
    BootstrapCompanyProfileComponent.prototype.orgInfo;
    /** @type {?} */
    BootstrapCompanyProfileComponent.prototype.organization;
    /** @type {?} */
    BootstrapCompanyProfileComponent.prototype.formValid;
    /** @type {?} */
    BootstrapCompanyProfileComponent.prototype.roleAccess;
    /**
     * @type {?}
     * @private
     */
    BootstrapCompanyProfileComponent.prototype.orgTranslations;
    /**
     * @type {?}
     * @private
     */
    BootstrapCompanyProfileComponent.prototype.translateSubscription;
    /** @type {?} */
    BootstrapCompanyProfileComponent.prototype.orgInfoComponent;
    /**
     * @type {?}
     * @private
     */
    BootstrapCompanyProfileComponent.prototype.orgService;
    /**
     * @type {?}
     * @private
     */
    BootstrapCompanyProfileComponent.prototype.notification;
    /**
     * @type {?}
     * @private
     */
    BootstrapCompanyProfileComponent.prototype.securityService;
    /**
     * @type {?}
     * @private
     */
    BootstrapCompanyProfileComponent.prototype.translate;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9vdHN0cmFwLWNvbXBhbnktcHJvZmlsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbmV0LXVpLyIsInNvdXJjZXMiOlsic3JjL2xheW91dC9ib290c3RyYXAvY29tcGFueS1wcm9maWxlL2Jvb3RzdHJhcC1jb21wYW55LXByb2ZpbGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFxQixTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdEUsT0FBTyxFQUFDLFlBQVksRUFBRSxtQkFBbUIsRUFBRSxlQUFlLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFFN0UsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDckQsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sNENBQTRDLENBQUM7QUFDL0UsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0seUNBQXlDLENBQUM7QUFDaEYsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBQ3pELE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUMvQyxPQUFPLEVBQUMsdUNBQXVDLEVBQUMsTUFBTSxtR0FBbUcsQ0FBQztBQUUxSjtJQWVJLDBDQUFvQixVQUErQixFQUMvQixZQUFpQyxFQUNqQyxlQUFnQyxFQUNoQyxTQUEyQjtRQUgvQyxpQkFRQztRQVJtQixlQUFVLEdBQVYsVUFBVSxDQUFxQjtRQUMvQixpQkFBWSxHQUFaLFlBQVksQ0FBcUI7UUFDakMsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLGNBQVMsR0FBVCxTQUFTLENBQWtCOztRQVYvQyxjQUFTLEdBQUcsS0FBSyxDQUFDO1FBV2QsSUFBSSxDQUFDLHFCQUFxQixHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLENBQUMsU0FBUzs7OztRQUFDLFVBQUEsR0FBRztZQUNwRixL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Q1AsUUFBUSxFQUFFLCtCQUErQjtvQkFDekMsb2xEQUF5RDtpQkFDNUQ7Ozs7Z0JBVE8sbUJBQW1CO2dCQUhMLG1CQUFtQjtnQkFBRSxlQUFlO2dCQUVsRCxnQkFBZ0I7OzttQ0FvQm5CLFNBQVMsU0FBQyx1Q0FBdUM7O0lBb0Z0RCx1Q0FBQztDQUFBLEFBakdELElBaUdDO1NBN0ZZLGdDQUFnQzs7O0lBRXpDLG1EQUFpQzs7SUFDakMsd0RBQTJCOztJQUMzQixxREFBa0I7O0lBQ2xCLHNEQUFxQjs7Ozs7SUFFckIsMkRBQTZCOzs7OztJQUM3QixpRUFBNEM7O0lBQzVDLDREQUE4Rzs7Ozs7SUFFbEcsc0RBQXVDOzs7OztJQUN2Qyx3REFBeUM7Ozs7O0lBQ3pDLDJEQUF3Qzs7Ozs7SUFDeEMscURBQW1DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIE9uRGVzdHJveSwgT25Jbml0LCBWaWV3Q2hpbGR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtFcnJvck1lc3NhZ2UsIE5vdGlmaWNhdGlvblNlcnZpY2UsIFNlY3VyaXR5U2VydmljZX0gZnJvbSAnaW5ldC1jb3JlJztcbmltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzL1J4JztcbmltcG9ydCB7VHJhbnNsYXRlU2VydmljZX0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5pbXBvcnQge09yZ2FuaXphdGlvblNlcnZpY2V9IGZyb20gXCIuLi8uLi8uLi9vcmdhbml6YXRpb24vb3JnYW5pemF0aW9uLnNlcnZpY2VcIjtcbmltcG9ydCB7T3JnYW5pemF0aW9uSW5mb3JtYXRpb259IGZyb20gXCIuLi8uLi8uLi9tb2RlbC9vcmdhbml6YXRpb24taW5mb3JtYXRpb25cIjtcbmltcG9ydCB7T3JnYW5pemF0aW9ufSBmcm9tIFwiLi4vLi4vLi4vbW9kZWwvb3JnYW5pemF0aW9uXCI7XG5pbXBvcnQge0FkZHJlc3N9IGZyb20gXCIuLi8uLi8uLi9tb2RlbC9hZGRyZXNzXCI7XG5pbXBvcnQge09yZ2FuaXphdGlvbkdlbmVyYWxJbmZvcm1hdGlvbkNvbXBvbmVudH0gZnJvbSBcIi4uLy4uLy4uL29yZ2FuaXphdGlvbi9vcmdhbml6YXRpb24tZ2VuZXJhbC1pbmZvcm1hdGlvbi9vcmdhbml6YXRpb24tZ2VuZXJhbC1pbmZvcm1hdGlvbi5jb21wb25lbnRcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhcHAtYm9vdHN0cmFwLWNvbXBhbnktcHJvZmlsZScsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2Jvb3RzdHJhcC1jb21wYW55LXByb2ZpbGUuY29tcG9uZW50Lmh0bWwnLFxufSlcbmV4cG9ydCBjbGFzcyBCb290c3RyYXBDb21wYW55UHJvZmlsZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICAgIG9yZ0luZm86IE9yZ2FuaXphdGlvbkluZm9ybWF0aW9uOyAvL2Zpcm0gc3lzdGVtXG4gICAgb3JnYW5pemF0aW9uOiBPcmdhbml6YXRpb247IC8vIG9yZ2FuaXphdGlvbiBnbG9iYWxcbiAgICBmb3JtVmFsaWQgPSBmYWxzZTtcbiAgICByb2xlQWNjZXNzIDogYm9vbGVhbjtcblxuICAgIHByaXZhdGUgb3JnVHJhbnNsYXRpb25zOiBhbnk7XG4gICAgcHJpdmF0ZSB0cmFuc2xhdGVTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgICBAVmlld0NoaWxkKE9yZ2FuaXphdGlvbkdlbmVyYWxJbmZvcm1hdGlvbkNvbXBvbmVudCkgb3JnSW5mb0NvbXBvbmVudDogT3JnYW5pemF0aW9uR2VuZXJhbEluZm9ybWF0aW9uQ29tcG9uZW50O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBvcmdTZXJ2aWNlOiBPcmdhbml6YXRpb25TZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgbm90aWZpY2F0aW9uOiBOb3RpZmljYXRpb25TZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgc2VjdXJpdHlTZXJ2aWNlOiBTZWN1cml0eVNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSB0cmFuc2xhdGU6IFRyYW5zbGF0ZVNlcnZpY2UpIHtcbiAgICAgICAgdGhpcy50cmFuc2xhdGVTdWJzY3JpcHRpb24gPSB0cmFuc2xhdGUuZ2V0KFsnQ09NTU9OLk1PRFVMRS5PUkdBTklaQVRJT04nXSkuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICAgICAgICB0aGlzLm9yZ1RyYW5zbGF0aW9ucyA9IHJlc1snQ09NTU9OLk1PRFVMRS5PUkdBTklaQVRJT04nXTtcbiAgICAgICAgfSk7XG4gICAgICAgdGhpcy5yb2xlQWNjZXNzID0gIHRoaXMuc2VjdXJpdHlTZXJ2aWNlLmhhc1JvbGUoJ2FkbWluJyB8fCAnc3ViX2FkbWluJyk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMubG9hZCgpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICBpZiAodGhpcy50cmFuc2xhdGVTdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMudHJhbnNsYXRlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBsb2FkKCkge1xuICAgICAgICB0aGlzLm9yZ1NlcnZpY2Uudmlld0luZm8oKS5zdWJzY3JpYmUoKG9yZzogT3JnYW5pemF0aW9uKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm9yZ0luZm8gPSBPYmplY3QuYXNzaWduKG5ldyBPcmdhbml6YXRpb25JbmZvcm1hdGlvbigpLCBvcmcpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ29yZ0luRm9yJywgdGhpcy5vcmdJbmZvKTtcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh0aGlzLm9yZ0luZm8pO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyB0aGlzLm9yZ1NlcnZpY2UuZmlybUxvYWQoKS5zdWJzY3JpYmUoKGRhdGE6IE9yZ2FuaXphdGlvbkluZm9ybWF0aW9uKSA9PiB7XG4gICAgICAgIC8vICAgICB0aGlzLm9yZ0luZm8gPSBPYmplY3QuYXNzaWduKG5ldyBPcmdhbml6YXRpb25JbmZvcm1hdGlvbigpLCBkYXRhKTtcbiAgICAgICAgLy8gfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXREYXRhKGRhdGE6IGFueSkge1xuICAgICAgICB0aGlzLm9yZ2FuaXphdGlvbiA9IE9iamVjdC5hc3NpZ24obmV3IE9yZ2FuaXphdGlvbigpLCBkYXRhKTtcbiAgICAgICAgaWYgKCF0aGlzLm9yZ2FuaXphdGlvbi5vZmZpY2VBZGRyZXNzKSB7XG4gICAgICAgICAgICB0aGlzLm9yZ2FuaXphdGlvbi5vZmZpY2VBZGRyZXNzID0gbmV3IEFkZHJlc3MoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uVXBkYXRlKCkge1xuICAgICAgICBpZiAodGhpcy5mb3JtVmFsaWQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm9yZ0luZm9Db21wb25lbnQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBvcmdhbml6YXRpb24gPSBPYmplY3QuYXNzaWduKG5ldyBPcmdhbml6YXRpb24oKSwgdGhpcy5vcmdJbmZvQ29tcG9uZW50LmdldERhdGEoKSk7XG4gICAgICAgICAgICAgICAgZGVsZXRlIG9yZ2FuaXphdGlvbi5sb2dvO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBvcmdhbml6YXRpb25bJ2VtYWlsJ107XG4gICAgICAgICAgICAgICAgdGhpcy5vcmdTZXJ2aWNlLnVwZGF0ZShvcmdhbml6YXRpb24pLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgKGRhdGE6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qge1RJVExFLCBVUERBVEVfU1VDQ0VTU0ZVTF9NU0csIFVQREFURV9FUlJPUl9NU0d9ID0gdGhpcy5vcmdUcmFuc2xhdGlvbnM7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoRXJyb3JNZXNzYWdlLlRZUEUgIT09IGRhdGEudHlwZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0YShkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbi5zaG93TWVzc2FnZShVUERBVEVfU1VDQ0VTU0ZVTF9NU0csICdzdWNjZXNzJywgVElUTEUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbi5zaG93TWVzc2FnZShVUERBVEVfRVJST1JfTVNHLCAnZXJyb3InLCBUSVRMRSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gb25VcGRhdGUoJGV2ZW50KSB7XG4gICAgICAgIC8qXG4gICAgICAgIGlmICh0aGlzLmZvcm1WYWxpZCkge1xuICAgICAgICAgICAgY29uc3Qge1RJVExFLCBVUERBVEVfU1VDQ0VTU0ZVTF9NU0csIFVQREFURV9FUlJPUl9NU0d9ID0gdGhpcy5vcmdUcmFuc2xhdGlvbnM7XG4gICAgICAgICAgICB0aGlzLm9yZ1NlcnZpY2UudXBkYXRlKHRoaXMub3JnYW5pemF0aW9uKS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgKGRhdGE6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoRXJyb3JNZXNzYWdlLlRZUEUgIT09IGRhdGEudHlwZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXREYXRhKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb24uc2hvd01lc3NhZ2UoVVBEQVRFX1NVQ0NFU1NGVUxfTVNHLCAnc3VjY2VzcycsIFRJVExFKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uLnNob3dNZXNzYWdlKFVQREFURV9FUlJPUl9NU0csICdlcnJvcicsIFRJVExFKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgICovXG4gICAgLy8gfVxuXG4gICAgb25DaGFuZ2UoJGV2ZW50KSB7XG4gICAgICAgIHRoaXMuZm9ybVZhbGlkID0gJGV2ZW50O1xuICAgIH1cblxufVxuIl19