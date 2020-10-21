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
export class BootstrapCompanyProfileComponent {
    /**
     * @param {?} orgService
     * @param {?} notification
     * @param {?} securityService
     * @param {?} translate
     */
    constructor(orgService, notification, securityService, translate) {
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
        res => {
            this.orgTranslations = res['COMMON.MODULE.ORGANIZATION'];
        }));
        this.roleAccess = this.securityService.hasRole('admin' || 'sub_admin');
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.load();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.translateSubscription) {
            this.translateSubscription.unsubscribe();
        }
    }
    /**
     * @return {?}
     */
    load() {
        this.orgService.viewInfo().subscribe((/**
         * @param {?} org
         * @return {?}
         */
        (org) => {
            this.orgInfo = Object.assign(new OrganizationInformation(), org);
            console.log('orgInFor', this.orgInfo);
            this.setData(this.orgInfo);
        }));
        // this.orgService.firmLoad().subscribe((data: OrganizationInformation) => {
        //     this.orgInfo = Object.assign(new OrganizationInformation(), data);
        // });
    }
    /**
     * @private
     * @param {?} data
     * @return {?}
     */
    setData(data) {
        this.organization = Object.assign(new Organization(), data);
        if (!this.organization.officeAddress) {
            this.organization.officeAddress = new Address();
        }
    }
    /**
     * @return {?}
     */
    onUpdate() {
        if (this.formValid) {
            if (this.orgInfoComponent) {
                /** @type {?} */
                const organization = Object.assign(new Organization(), this.orgInfoComponent.getData());
                delete organization.logo;
                delete organization['email'];
                this.orgService.update(organization).subscribe((/**
                 * @param {?} data
                 * @return {?}
                 */
                (data) => {
                    const { TITLE, UPDATE_SUCCESSFUL_MSG, UPDATE_ERROR_MSG } = this.orgTranslations;
                    if (ErrorMessage.TYPE !== data.type) {
                        this.setData(data);
                        this.notification.showMessage(UPDATE_SUCCESSFUL_MSG, 'success', TITLE);
                    }
                    else {
                        this.notification.showMessage(UPDATE_ERROR_MSG, 'error', TITLE);
                    }
                }));
            }
        }
    }
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
    onChange($event) {
        this.formValid = $event;
    }
}
BootstrapCompanyProfileComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-bootstrap-company-profile',
                template: "<div class=\"default-layout tb-visible\">\n    <app-common-toolbar></app-common-toolbar>\n    <div class=\"cp-content p-0\" style=\"overflow: hidden\">\n        <div class=\"container-fluid p-0\">\n            <div *ngIf=\"roleAccess\" class=\"container-fluid nav-fixed-top cp-toolbar\">\n                <button class=\"btn btn-sm btn-success mr-1\" type=\"button\" [disabled]=\"!formValid\" [title]=\"'ACTION.SAVE' | translate\" data-toggle=\"tooltip\" (click)=\"onUpdate()\">\n                    <i class=\"fa fa-save\" aria-hidden=\"true\"></i>\n                </button>\n        </div>\n            <div class=\"cp-content p-3\">\n                <app-organization-information class=\"w-100\" *ngIf=\"orgInfo && organization\" [orgInfo]=\"orgInfo\" [organization]=\"organization\" [editable]=\"roleAccess\">\n                    <ng-template #tabContent>\n                        <tabset>\n                            <tab id=\"generate-info-tab\">\n                                <ng-template tabHeading>\n                                    <i class=\"fa fa-info-circle\"></i><b> {{'COMMON.MENU.ORGANIZATION_INFORMATION' | translate}}</b>\n                                </ng-template>\n                                <app-organization-general-information [editable]=\"roleAccess\" (onValidate)=\"onChange($event)\" [orgInfo]=\"organization\"></app-organization-general-information>\n                            </tab>\n                        </tabset>\n                    </ng-template>\n                </app-organization-information>\n            </div>\n        </div>\n    </div>\n</div>\n"
            }] }
];
/** @nocollapse */
BootstrapCompanyProfileComponent.ctorParameters = () => [
    { type: OrganizationService },
    { type: NotificationService },
    { type: SecurityService },
    { type: TranslateService }
];
BootstrapCompanyProfileComponent.propDecorators = {
    orgInfoComponent: [{ type: ViewChild, args: [OrganizationGeneralInformationComponent,] }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9vdHN0cmFwLWNvbXBhbnktcHJvZmlsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbmV0LXVpLyIsInNvdXJjZXMiOlsic3JjL2xheW91dC9ib290c3RyYXAvY29tcGFueS1wcm9maWxlL2Jvb3RzdHJhcC1jb21wYW55LXByb2ZpbGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFxQixTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdEUsT0FBTyxFQUFDLFlBQVksRUFBRSxtQkFBbUIsRUFBRSxlQUFlLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFFN0UsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDckQsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sNENBQTRDLENBQUM7QUFDL0UsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0seUNBQXlDLENBQUM7QUFDaEYsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBQ3pELE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUMvQyxPQUFPLEVBQUMsdUNBQXVDLEVBQUMsTUFBTSxtR0FBbUcsQ0FBQztBQU0xSixNQUFNLE9BQU8sZ0NBQWdDOzs7Ozs7O0lBV3pDLFlBQW9CLFVBQStCLEVBQy9CLFlBQWlDLEVBQ2pDLGVBQWdDLEVBQ2hDLFNBQTJCO1FBSDNCLGVBQVUsR0FBVixVQUFVLENBQXFCO1FBQy9CLGlCQUFZLEdBQVosWUFBWSxDQUFxQjtRQUNqQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsY0FBUyxHQUFULFNBQVMsQ0FBa0I7O1FBVi9DLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFXZCxJQUFJLENBQUMscUJBQXFCLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLDRCQUE0QixDQUFDLENBQUMsQ0FBQyxTQUFTOzs7O1FBQUMsR0FBRyxD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OytCQW9CbkIsU0FBUyxTQUFDLHVDQUF1Qzs7OztJQVBsRCxtREFBaUM7O0lBQ2pDLHdEQUEyQjs7SUFDM0IscURBQWtCOztJQUNsQixzREFBcUI7Ozs7O0lBRXJCLDJEQUE2Qjs7Ozs7SUFDN0IsaUVBQTRDOztJQUM1Qyw0REFBOEc7Ozs7O0lBRWxHLHNEQUF1Qzs7Ozs7SUFDdkMsd0RBQXlDOzs7OztJQUN6QywyREFBd0M7Ozs7O0lBQ3hDLHFEQUFtQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBPbkRlc3Ryb3ksIE9uSW5pdCwgVmlld0NoaWxkfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RXJyb3JNZXNzYWdlLCBOb3RpZmljYXRpb25TZXJ2aWNlLCBTZWN1cml0eVNlcnZpY2V9IGZyb20gJ2luZXQtY29yZSc7XG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSAncnhqcy9SeCc7XG5pbXBvcnQge1RyYW5zbGF0ZVNlcnZpY2V9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuaW1wb3J0IHtPcmdhbml6YXRpb25TZXJ2aWNlfSBmcm9tIFwiLi4vLi4vLi4vb3JnYW5pemF0aW9uL29yZ2FuaXphdGlvbi5zZXJ2aWNlXCI7XG5pbXBvcnQge09yZ2FuaXphdGlvbkluZm9ybWF0aW9ufSBmcm9tIFwiLi4vLi4vLi4vbW9kZWwvb3JnYW5pemF0aW9uLWluZm9ybWF0aW9uXCI7XG5pbXBvcnQge09yZ2FuaXphdGlvbn0gZnJvbSBcIi4uLy4uLy4uL21vZGVsL29yZ2FuaXphdGlvblwiO1xuaW1wb3J0IHtBZGRyZXNzfSBmcm9tIFwiLi4vLi4vLi4vbW9kZWwvYWRkcmVzc1wiO1xuaW1wb3J0IHtPcmdhbml6YXRpb25HZW5lcmFsSW5mb3JtYXRpb25Db21wb25lbnR9IGZyb20gXCIuLi8uLi8uLi9vcmdhbml6YXRpb24vb3JnYW5pemF0aW9uLWdlbmVyYWwtaW5mb3JtYXRpb24vb3JnYW5pemF0aW9uLWdlbmVyYWwtaW5mb3JtYXRpb24uY29tcG9uZW50XCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXBwLWJvb3RzdHJhcC1jb21wYW55LXByb2ZpbGUnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9ib290c3RyYXAtY29tcGFueS1wcm9maWxlLmNvbXBvbmVudC5odG1sJyxcbn0pXG5leHBvcnQgY2xhc3MgQm9vdHN0cmFwQ29tcGFueVByb2ZpbGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG5cbiAgICBvcmdJbmZvOiBPcmdhbml6YXRpb25JbmZvcm1hdGlvbjsgLy9maXJtIHN5c3RlbVxuICAgIG9yZ2FuaXphdGlvbjogT3JnYW5pemF0aW9uOyAvLyBvcmdhbml6YXRpb24gZ2xvYmFsXG4gICAgZm9ybVZhbGlkID0gZmFsc2U7XG4gICAgcm9sZUFjY2VzcyA6IGJvb2xlYW47XG5cbiAgICBwcml2YXRlIG9yZ1RyYW5zbGF0aW9uczogYW55O1xuICAgIHByaXZhdGUgdHJhbnNsYXRlU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gICAgQFZpZXdDaGlsZChPcmdhbml6YXRpb25HZW5lcmFsSW5mb3JtYXRpb25Db21wb25lbnQpIG9yZ0luZm9Db21wb25lbnQ6IE9yZ2FuaXphdGlvbkdlbmVyYWxJbmZvcm1hdGlvbkNvbXBvbmVudDtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgb3JnU2VydmljZTogT3JnYW5pemF0aW9uU2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIG5vdGlmaWNhdGlvbjogTm90aWZpY2F0aW9uU2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIHNlY3VyaXR5U2VydmljZTogU2VjdXJpdHlTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgdHJhbnNsYXRlOiBUcmFuc2xhdGVTZXJ2aWNlKSB7XG4gICAgICAgIHRoaXMudHJhbnNsYXRlU3Vic2NyaXB0aW9uID0gdHJhbnNsYXRlLmdldChbJ0NPTU1PTi5NT0RVTEUuT1JHQU5JWkFUSU9OJ10pLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgICAgICAgdGhpcy5vcmdUcmFuc2xhdGlvbnMgPSByZXNbJ0NPTU1PTi5NT0RVTEUuT1JHQU5JWkFUSU9OJ107XG4gICAgICAgIH0pO1xuICAgICAgIHRoaXMucm9sZUFjY2VzcyA9ICB0aGlzLnNlY3VyaXR5U2VydmljZS5oYXNSb2xlKCdhZG1pbicgfHwgJ3N1Yl9hZG1pbicpO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmxvYWQoKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMudHJhbnNsYXRlU3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnRyYW5zbGF0ZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbG9hZCgpIHtcbiAgICAgICAgdGhpcy5vcmdTZXJ2aWNlLnZpZXdJbmZvKCkuc3Vic2NyaWJlKChvcmc6IE9yZ2FuaXphdGlvbikgPT4ge1xuICAgICAgICAgICAgdGhpcy5vcmdJbmZvID0gT2JqZWN0LmFzc2lnbihuZXcgT3JnYW5pemF0aW9uSW5mb3JtYXRpb24oKSwgb3JnKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdvcmdJbkZvcicsIHRoaXMub3JnSW5mbyk7XG4gICAgICAgICAgICB0aGlzLnNldERhdGEodGhpcy5vcmdJbmZvKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gdGhpcy5vcmdTZXJ2aWNlLmZpcm1Mb2FkKCkuc3Vic2NyaWJlKChkYXRhOiBPcmdhbml6YXRpb25JbmZvcm1hdGlvbikgPT4ge1xuICAgICAgICAvLyAgICAgdGhpcy5vcmdJbmZvID0gT2JqZWN0LmFzc2lnbihuZXcgT3JnYW5pemF0aW9uSW5mb3JtYXRpb24oKSwgZGF0YSk7XG4gICAgICAgIC8vIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0RGF0YShkYXRhOiBhbnkpIHtcbiAgICAgICAgdGhpcy5vcmdhbml6YXRpb24gPSBPYmplY3QuYXNzaWduKG5ldyBPcmdhbml6YXRpb24oKSwgZGF0YSk7XG4gICAgICAgIGlmICghdGhpcy5vcmdhbml6YXRpb24ub2ZmaWNlQWRkcmVzcykge1xuICAgICAgICAgICAgdGhpcy5vcmdhbml6YXRpb24ub2ZmaWNlQWRkcmVzcyA9IG5ldyBBZGRyZXNzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblVwZGF0ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuZm9ybVZhbGlkKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5vcmdJbmZvQ29tcG9uZW50KSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgb3JnYW5pemF0aW9uID0gT2JqZWN0LmFzc2lnbihuZXcgT3JnYW5pemF0aW9uKCksIHRoaXMub3JnSW5mb0NvbXBvbmVudC5nZXREYXRhKCkpO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBvcmdhbml6YXRpb24ubG9nbztcbiAgICAgICAgICAgICAgICBkZWxldGUgb3JnYW5pemF0aW9uWydlbWFpbCddO1xuICAgICAgICAgICAgICAgIHRoaXMub3JnU2VydmljZS51cGRhdGUob3JnYW5pemF0aW9uKS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgIChkYXRhOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHtUSVRMRSwgVVBEQVRFX1NVQ0NFU1NGVUxfTVNHLCBVUERBVEVfRVJST1JfTVNHfSA9IHRoaXMub3JnVHJhbnNsYXRpb25zO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKEVycm9yTWVzc2FnZS5UWVBFICE9PSBkYXRhLnR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldERhdGEoZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb24uc2hvd01lc3NhZ2UoVVBEQVRFX1NVQ0NFU1NGVUxfTVNHLCAnc3VjY2VzcycsIFRJVExFKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb24uc2hvd01lc3NhZ2UoVVBEQVRFX0VSUk9SX01TRywgJ2Vycm9yJywgVElUTEUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIG9uVXBkYXRlKCRldmVudCkge1xuICAgICAgICAvKlxuICAgICAgICBpZiAodGhpcy5mb3JtVmFsaWQpIHtcbiAgICAgICAgICAgIGNvbnN0IHtUSVRMRSwgVVBEQVRFX1NVQ0NFU1NGVUxfTVNHLCBVUERBVEVfRVJST1JfTVNHfSA9IHRoaXMub3JnVHJhbnNsYXRpb25zO1xuICAgICAgICAgICAgdGhpcy5vcmdTZXJ2aWNlLnVwZGF0ZSh0aGlzLm9yZ2FuaXphdGlvbikuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgIChkYXRhOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKEVycm9yTWVzc2FnZS5UWVBFICE9PSBkYXRhLnR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0YShkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uLnNob3dNZXNzYWdlKFVQREFURV9TVUNDRVNTRlVMX01TRywgJ3N1Y2Nlc3MnLCBUSVRMRSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbi5zaG93TWVzc2FnZShVUERBVEVfRVJST1JfTVNHLCAnZXJyb3InLCBUSVRMRSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgICAqL1xuICAgIC8vIH1cblxuICAgIG9uQ2hhbmdlKCRldmVudCkge1xuICAgICAgICB0aGlzLmZvcm1WYWxpZCA9ICRldmVudDtcbiAgICB9XG5cbn1cbiJdfQ==