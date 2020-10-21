/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, Input } from '@angular/core';
import { UserProfileService } from "./user-profile.service";
var AvatarDirective = /** @class */ (function () {
    function AvatarDirective(_el) {
        this._el = _el;
        this.usercode = iNet.username;
    }
    /**
     * @return {?}
     */
    AvatarDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this._el.nativeElement.addEventListener('error', this._loadAvatarError.bind(this));
        this._setAvatar();
    };
    /**
     * @return {?}
     */
    AvatarDirective.prototype.ngOnChanges = /**
     * @return {?}
     */
    function () {
        this._setAvatar();
    };
    /**
     * @private
     * @return {?}
     */
    AvatarDirective.prototype._setAvatar = /**
     * @private
     * @return {?}
     */
    function () {
        if (!this.usercode) {
            this._loadAvatarError();
            return;
        }
        this._el.nativeElement.src = iNet.getUrl('system/userprofile/photo') + '?usercode=' + encodeURIComponent(this.usercode);
    };
    /**
     * @private
     * @return {?}
     */
    AvatarDirective.prototype._loadAvatarError = /**
     * @private
     * @return {?}
     */
    function () {
        this._el.nativeElement.src = UserProfileService.DEFAULT_AVATAR_URL;
    };
    AvatarDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'img[userAvatar]'
                },] }
    ];
    /** @nocollapse */
    AvatarDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    AvatarDirective.propDecorators = {
        usercode: [{ type: Input }]
    };
    return AvatarDirective;
}());
export { AvatarDirective };
if (false) {
    /** @type {?} */
    AvatarDirective.prototype.usercode;
    /**
     * @type {?}
     * @private
     */
    AvatarDirective.prototype._el;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZhdGFyLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtY29yZS8iLCJzb3VyY2VzIjpbInNyYy9hdmF0YXIuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQW9CLE1BQU0sZUFBZSxDQUFDO0FBQzlFLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBSTFEO0lBTUkseUJBQW9CLEdBQWU7UUFBZixRQUFHLEdBQUgsR0FBRyxDQUFZO1FBRjFCLGFBQVEsR0FBVyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBRUosQ0FBQzs7OztJQUV2QyxrQ0FBUTs7O0lBQVI7UUFDSSxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ25GLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN0QixDQUFDOzs7O0lBRUQscUNBQVc7OztJQUFYO1FBQ0ksSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3RCLENBQUM7Ozs7O0lBRU8sb0NBQVU7Ozs7SUFBbEI7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNoQixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUN4QixPQUFPO1NBQ1Y7UUFDRCxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQywwQkFBMEIsQ0FBQyxHQUFHLFlBQVksR0FBRyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDNUgsQ0FBQzs7Ozs7SUFFTywwQ0FBZ0I7Ozs7SUFBeEI7UUFDSSxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxHQUFHLEdBQUcsa0JBQWtCLENBQUMsa0JBQWtCLENBQUM7SUFDdkUsQ0FBQzs7Z0JBM0JKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsaUJBQWlCO2lCQUM5Qjs7OztnQkFQa0IsVUFBVTs7OzJCQVN4QixLQUFLOztJQXdCVixzQkFBQztDQUFBLEFBNUJELElBNEJDO1NBekJZLGVBQWU7OztJQUN4QixtQ0FBMEM7Ozs7O0lBRTlCLDhCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtVc2VyUHJvZmlsZVNlcnZpY2V9IGZyb20gXCIuL3VzZXItcHJvZmlsZS5zZXJ2aWNlXCI7XG5cbmRlY2xhcmUgbGV0IGlOZXQ6IGFueTtcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdpbWdbdXNlckF2YXRhcl0nXG59KVxuZXhwb3J0IGNsYXNzIEF2YXRhckRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgICBASW5wdXQoKSB1c2VyY29kZTogc3RyaW5nID0gaU5ldC51c2VybmFtZTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2VsOiBFbGVtZW50UmVmKSB7fVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCB0aGlzLl9sb2FkQXZhdGFyRXJyb3IuYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMuX3NldEF2YXRhcigpO1xuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKCkge1xuICAgICAgICB0aGlzLl9zZXRBdmF0YXIoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9zZXRBdmF0YXIoKSB7XG4gICAgICAgIGlmICghdGhpcy51c2VyY29kZSkge1xuICAgICAgICAgICAgdGhpcy5fbG9hZEF2YXRhckVycm9yKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fZWwubmF0aXZlRWxlbWVudC5zcmMgPSBpTmV0LmdldFVybCgnc3lzdGVtL3VzZXJwcm9maWxlL3Bob3RvJykgKyAnP3VzZXJjb2RlPScgKyBlbmNvZGVVUklDb21wb25lbnQodGhpcy51c2VyY29kZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfbG9hZEF2YXRhckVycm9yKCkge1xuICAgICAgICB0aGlzLl9lbC5uYXRpdmVFbGVtZW50LnNyYyA9IFVzZXJQcm9maWxlU2VydmljZS5ERUZBVUxUX0FWQVRBUl9VUkw7XG4gICAgfVxufVxuIl19