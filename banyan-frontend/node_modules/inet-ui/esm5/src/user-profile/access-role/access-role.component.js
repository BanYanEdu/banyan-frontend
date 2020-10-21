/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component } from '@angular/core';
import { GlobalContactService } from "../global-contact.service";
import { ErrorMessage } from "inet-core";
var AccessRoleComponent = /** @class */ (function () {
    function AccessRoleComponent(glService) {
        this.glService = glService;
        this.arrayRoleUser = [];
    }
    /**
     * @return {?}
     */
    AccessRoleComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.loadAccessRole();
    };
    /**
     * @return {?}
     */
    AccessRoleComponent.prototype.loadAccessRole = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.glService.getAccessRoles().subscribe((/**
         * @param {?} result
         * @return {?}
         */
        function (result) {
            if (result.type !== ErrorMessage.TYPE) {
                _this.arrayRoleUser = result.items;
            }
        }));
    };
    AccessRoleComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-access-role',
                    template: "<data-table [items]=\"arrayRoleUser\"\n            [itemCount]=\"arrayRoleUser.length\"\n            [sortAsc]=\"true\"\n            [limit]=\"9999\"\n            [header]=\"false\"\n            [selectColumn]=\"false\"\n            [multiSelect]=\"false\"\n            (reload)=\"loadAccessRole()\"\n            [expandableRows]=\"false\"\n            [pagination]=\"false\"\n            [pagination_input]=\"true\"\n            [pagination_range]=\"true\"\n            [indexColumnHeader]=\"'#'\"\n            [indexColumn]=\"true\"\n            [selectOnRowClick]=\"true\"\n            [showReloading]=\"false\">\n  <data-table-column\n      [property]=\"'name'\"\n      [header]=\"'COMMON.MODULE.USER_PROFILE.GROUP_NAME' | translate\"\n      [width]=\"200\">\n  </data-table-column>\n  <data-table-column\n      [property]=\"'description'\"\n      [header]=\"'COMMON.MODULE.USER_PROFILE.DESCRIPTION' | translate\">\n  </data-table-column>\n</data-table>"
                }] }
    ];
    /** @nocollapse */
    AccessRoleComponent.ctorParameters = function () { return [
        { type: GlobalContactService }
    ]; };
    return AccessRoleComponent;
}());
export { AccessRoleComponent };
if (false) {
    /** @type {?} */
    AccessRoleComponent.prototype.arrayRoleUser;
    /**
     * @type {?}
     * @private
     */
    AccessRoleComponent.prototype.glService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjZXNzLXJvbGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC11aS8iLCJzb3VyY2VzIjpbInNyYy91c2VyLXByb2ZpbGUvYWNjZXNzLXJvbGUvYWNjZXNzLXJvbGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFTLE1BQU0sZUFBZSxDQUFDO0FBQ2hELE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQy9ELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFFdkM7SUFPSSw2QkFBb0IsU0FBK0I7UUFBL0IsY0FBUyxHQUFULFNBQVMsQ0FBc0I7UUFEbkQsa0JBQWEsR0FBZSxFQUFFLENBQUM7SUFFL0IsQ0FBQzs7OztJQUVELHNDQUFROzs7SUFBUjtRQUNJLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUMxQixDQUFDOzs7O0lBRUQsNENBQWM7OztJQUFkO1FBQUEsaUJBTUM7UUFMRyxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsRUFBRSxDQUFDLFNBQVM7Ozs7UUFBQyxVQUFDLE1BQVc7WUFDbkQsSUFBSSxNQUFNLENBQUMsSUFBSSxLQUFLLFlBQVksQ0FBQyxJQUFJLEVBQUU7Z0JBQ25DLEtBQUksQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQzthQUNyQztRQUNKLENBQUMsRUFBQyxDQUFDO0lBQ1AsQ0FBQzs7Z0JBcEJKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsaUJBQWlCO29CQUMzQix5OEJBQTJDO2lCQUM5Qzs7OztnQkFOTyxvQkFBb0I7O0lBeUI1QiwwQkFBQztDQUFBLEFBdEJELElBc0JDO1NBbEJZLG1CQUFtQjs7O0lBRTVCLDRDQUErQjs7Ozs7SUFDbkIsd0NBQXVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0dsb2JhbENvbnRhY3RTZXJ2aWNlfSBmcm9tIFwiLi4vZ2xvYmFsLWNvbnRhY3Quc2VydmljZVwiO1xuaW1wb3J0IHtFcnJvck1lc3NhZ2V9IGZyb20gXCJpbmV0LWNvcmVcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhcHAtYWNjZXNzLXJvbGUnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9hY2Nlc3Mtcm9sZS5jb21wb25lbnQuaHRtbCdcbn0pXG5leHBvcnQgY2xhc3MgQWNjZXNzUm9sZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBhcnJheVJvbGVVc2VyOiBBcnJheTxhbnk+ID0gW107XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBnbFNlcnZpY2U6IEdsb2JhbENvbnRhY3RTZXJ2aWNlKSB7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMubG9hZEFjY2Vzc1JvbGUoKTtcbiAgICB9XG5cbiAgICBsb2FkQWNjZXNzUm9sZSgpIHtcbiAgICAgICAgdGhpcy5nbFNlcnZpY2UuZ2V0QWNjZXNzUm9sZXMoKS5zdWJzY3JpYmUoKHJlc3VsdDogYW55KSA9PiB7XG4gICAgICAgICAgIGlmIChyZXN1bHQudHlwZSAhPT0gRXJyb3JNZXNzYWdlLlRZUEUpIHtcbiAgICAgICAgICAgICAgIHRoaXMuYXJyYXlSb2xlVXNlciA9IHJlc3VsdC5pdGVtcztcbiAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbn1cbiJdfQ==