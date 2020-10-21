/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { SecurityService } from './security.service';
var RoleAccessDirective = /** @class */ (function () {
    function RoleAccessDirective(templateRef, viewContainer, securityService) {
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
        this.securityService = securityService;
    }
    /**
     * @return {?}
     */
    RoleAccessDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.applyPermission();
    };
    /**
     * @private
     * @return {?}
     */
    RoleAccessDirective.prototype.applyPermission = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.securityService.hasRole(this.roleAccess)) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        }
        else {
            this.viewContainer.clear();
        }
    };
    RoleAccessDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[roleAccess]'
                },] }
    ];
    /** @nocollapse */
    RoleAccessDirective.ctorParameters = function () { return [
        { type: TemplateRef },
        { type: ViewContainerRef },
        { type: SecurityService }
    ]; };
    RoleAccessDirective.propDecorators = {
        roleAccess: [{ type: Input, args: ['roleAccess',] }]
    };
    return RoleAccessDirective;
}());
export { RoleAccessDirective };
if (false) {
    /** @type {?} */
    RoleAccessDirective.prototype.roleAccess;
    /**
     * @type {?}
     * @private
     */
    RoleAccessDirective.prototype.templateRef;
    /**
     * @type {?}
     * @private
     */
    RoleAccessDirective.prototype.viewContainer;
    /**
     * @type {?}
     * @private
     */
    RoleAccessDirective.prototype.securityService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9sZS1hY2Nlc3MuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC1jb3JlLyIsInNvdXJjZXMiOlsic3JjL3JvbGUtYWNjZXNzLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQVUsV0FBVyxFQUFFLGdCQUFnQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3RGLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUVuRDtJQU9FLDZCQUFvQixXQUE2QixFQUM3QixhQUErQixFQUMvQixlQUFnQztRQUZoQyxnQkFBVyxHQUFYLFdBQVcsQ0FBa0I7UUFDN0Isa0JBQWEsR0FBYixhQUFhLENBQWtCO1FBQy9CLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtJQUNwRCxDQUFDOzs7O0lBRUQsc0NBQVE7OztJQUFSO1FBQ0UsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQ3pCLENBQUM7Ozs7O0lBRU8sNkNBQWU7Ozs7SUFBdkI7UUFDRSxJQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBQztZQUMvQyxJQUFJLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUN6RDthQUFNO1lBQ0wsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUM1QjtJQUNILENBQUM7O2dCQXRCRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGNBQWM7aUJBQ3pCOzs7O2dCQUxpQyxXQUFXO2dCQUFFLGdCQUFnQjtnQkFDdkQsZUFBZTs7OzZCQU9wQixLQUFLLFNBQUMsWUFBWTs7SUFrQnJCLDBCQUFDO0NBQUEsQUF2QkQsSUF1QkM7U0FwQlksbUJBQW1COzs7SUFFOUIseUNBQXdDOzs7OztJQUU1QiwwQ0FBcUM7Ozs7O0lBQ3JDLDRDQUF1Qzs7Ozs7SUFDdkMsOENBQXdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEaXJlY3RpdmUsIElucHV0LCBPbkluaXQsIFRlbXBsYXRlUmVmLCBWaWV3Q29udGFpbmVyUmVmfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7U2VjdXJpdHlTZXJ2aWNlfSBmcm9tICcuL3NlY3VyaXR5LnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbcm9sZUFjY2Vzc10nXG59KVxuZXhwb3J0IGNsYXNzIFJvbGVBY2Nlc3NEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dCgncm9sZUFjY2VzcycpIHJvbGVBY2Nlc3M6IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxhbnk+LFxuICAgICAgICAgICAgICBwcml2YXRlIHZpZXdDb250YWluZXI6IFZpZXdDb250YWluZXJSZWYsXG4gICAgICAgICAgICAgIHByaXZhdGUgc2VjdXJpdHlTZXJ2aWNlOiBTZWN1cml0eVNlcnZpY2UpIHtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuYXBwbHlQZXJtaXNzaW9uKCk7XG4gIH1cblxuICBwcml2YXRlIGFwcGx5UGVybWlzc2lvbigpOiB2b2lkIHtcbiAgICBpZih0aGlzLnNlY3VyaXR5U2VydmljZS5oYXNSb2xlKHRoaXMucm9sZUFjY2Vzcykpe1xuICAgICAgdGhpcy52aWV3Q29udGFpbmVyLmNyZWF0ZUVtYmVkZGVkVmlldyh0aGlzLnRlbXBsYXRlUmVmKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy52aWV3Q29udGFpbmVyLmNsZWFyKCk7XG4gICAgfVxuICB9XG59XG4iXX0=