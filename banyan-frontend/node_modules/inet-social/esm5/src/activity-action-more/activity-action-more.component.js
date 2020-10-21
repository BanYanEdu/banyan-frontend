/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
var ActivityActionMoreComponent = /** @class */ (function () {
    function ActivityActionMoreComponent() {
        this.onEdit = new EventEmitter();
        this.onDelete = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ActivityActionMoreComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (!this.data) {
            return;
        }
        this.isActivity = !this.data.activityID;
        this.hasAction = this.isActivity && this.data._editable;
    };
    ActivityActionMoreComponent.decorators = [
        { type: Component, args: [{
                    selector: '[actionMore]',
                    template: "<div class=\"action-more\">\n  <i class=\"fa fa-ellipsis-h\" dropdownToggle></i>\n  <ul *dropdownMenu class=\"dropdown-menu dropdown-menu-right\" role=\"menu\">\n    <li *ngIf=\"data._editable\" role=\"menuitem\" (click)=\"onEdit.emit($event)\">\n      <a class=\"dropdown-item\">\n        <i class=\"action-more-icon fa fa-edit\"></i>\n        <span> Ch\u1EC9nh s\u1EEDa</span>\n      </a>\n    </li>\n    <li *ngIf=\"data._editable\" role=\"menuitem\" (click)=\"onDelete.emit($event)\">\n      <a class=\"dropdown-item\" style=\"color: #dc3545\">\n        <i class=\"action-more-icon fa fa-trash\"></i>\n        <span> X\u00F3a</span>\n      </a>\n    </li>\n  </ul>\n</div>\n",
                    styles: [".action-more{cursor:pointer;color:#6c757d;position:relative;width:30px;height:30px}.action-more ul{margin-top:-20px;font-size:13px;border:1px solid #eef2f4;box-shadow:0 0 34px 0 rgba(63,66,87,.1)}.action-more>i{width:30px;line-height:30px;text-align:center}.action-more-icon{width:20px}"]
                }] }
    ];
    /** @nocollapse */
    ActivityActionMoreComponent.ctorParameters = function () { return []; };
    ActivityActionMoreComponent.propDecorators = {
        data: [{ type: Input }],
        onEdit: [{ type: Output }],
        onDelete: [{ type: Output }]
    };
    return ActivityActionMoreComponent;
}());
export { ActivityActionMoreComponent };
if (false) {
    /** @type {?} */
    ActivityActionMoreComponent.prototype.data;
    /** @type {?} */
    ActivityActionMoreComponent.prototype.onEdit;
    /** @type {?} */
    ActivityActionMoreComponent.prototype.onDelete;
    /** @type {?} */
    ActivityActionMoreComponent.prototype.hasAction;
    /** @type {?} */
    ActivityActionMoreComponent.prototype.isActivity;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZpdHktYWN0aW9uLW1vcmUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC1zb2NpYWwvIiwic291cmNlcyI6WyJzcmMvYWN0aXZpdHktYWN0aW9uLW1vcmUvYWN0aXZpdHktYWN0aW9uLW1vcmUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBSTdFO0lBYUk7UUFOVSxXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUNqQyxhQUFRLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztJQU03QyxDQUFDOzs7O0lBRUQsOENBQVE7OztJQUFSO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDWixPQUFPO1NBQ1Y7UUFDRCxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDeEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzVELENBQUM7O2dCQXRCSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLGNBQWM7b0JBQ3hCLGtyQkFBb0Q7O2lCQUV2RDs7Ozs7dUJBRUksS0FBSzt5QkFDTCxNQUFNOzJCQUNOLE1BQU07O0lBZVgsa0NBQUM7Q0FBQSxBQXZCRCxJQXVCQztTQWxCWSwyQkFBMkI7OztJQUNwQywyQ0FBOEM7O0lBQzlDLDZDQUEyQzs7SUFDM0MsK0NBQTZDOztJQUU3QyxnREFBbUI7O0lBQ25CLGlEQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE91dHB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1NvY2lhbEFjdGl2aXR5fSBmcm9tICcuLi9tb2RlbC9BY3Rpdml0eSc7XG5pbXBvcnQge1NvY2lhbENvbW1lbnR9IGZyb20gJy4uL21vZGVsL0NvbW1lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ1thY3Rpb25Nb3JlXScsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2FjdGl2aXR5LWFjdGlvbi1tb3JlLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9hY3Rpdml0eS1hY3Rpb24tbW9yZS5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgQWN0aXZpdHlBY3Rpb25Nb3JlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBASW5wdXQoKSBkYXRhOiBTb2NpYWxBY3Rpdml0eSB8IFNvY2lhbENvbW1lbnQ7XG4gICAgQE91dHB1dCgpIG9uRWRpdCA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAgIEBPdXRwdXQoKSBvbkRlbGV0ZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gICAgaGFzQWN0aW9uOiBib29sZWFuO1xuICAgIGlzQWN0aXZpdHk6IGJvb2xlYW47XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRhdGEpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmlzQWN0aXZpdHkgPSAhdGhpcy5kYXRhLmFjdGl2aXR5SUQ7XG4gICAgICAgIHRoaXMuaGFzQWN0aW9uID0gdGhpcy5pc0FjdGl2aXR5ICYmIHRoaXMuZGF0YS5fZWRpdGFibGU7XG4gICAgfVxufVxuIl19