/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, Input } from '@angular/core';
import { UserProfileService } from "./user-profile.service";
export class AvatarDirective {
    /**
     * @param {?} _el
     */
    constructor(_el) {
        this._el = _el;
        this.usercode = iNet.username;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._el.nativeElement.addEventListener('error', this._loadAvatarError.bind(this));
        this._setAvatar();
    }
    /**
     * @return {?}
     */
    ngOnChanges() {
        this._setAvatar();
    }
    /**
     * @private
     * @return {?}
     */
    _setAvatar() {
        if (!this.usercode) {
            this._loadAvatarError();
            return;
        }
        this._el.nativeElement.src = iNet.getUrl('system/userprofile/photo') + '?usercode=' + encodeURIComponent(this.usercode);
    }
    /**
     * @private
     * @return {?}
     */
    _loadAvatarError() {
        this._el.nativeElement.src = UserProfileService.DEFAULT_AVATAR_URL;
    }
}
AvatarDirective.decorators = [
    { type: Directive, args: [{
                selector: 'img[userAvatar]'
            },] }
];
/** @nocollapse */
AvatarDirective.ctorParameters = () => [
    { type: ElementRef }
];
AvatarDirective.propDecorators = {
    usercode: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    AvatarDirective.prototype.usercode;
    /**
     * @type {?}
     * @private
     */
    AvatarDirective.prototype._el;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZhdGFyLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtY29yZS8iLCJzb3VyY2VzIjpbInNyYy9hdmF0YXIuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQW9CLE1BQU0sZUFBZSxDQUFDO0FBQzlFLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBTzFELE1BQU0sT0FBTyxlQUFlOzs7O0lBR3hCLFlBQW9CLEdBQWU7UUFBZixRQUFHLEdBQUgsR0FBRyxDQUFZO1FBRjFCLGFBQVEsR0FBVyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBRUosQ0FBQzs7OztJQUV2QyxRQUFRO1FBQ0osSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNuRixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDdEIsQ0FBQzs7OztJQUVELFdBQVc7UUFDUCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDdEIsQ0FBQzs7Ozs7SUFFTyxVQUFVO1FBQ2QsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDaEIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFDeEIsT0FBTztTQUNWO1FBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsMEJBQTBCLENBQUMsR0FBRyxZQUFZLEdBQUcsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzVILENBQUM7Ozs7O0lBRU8sZ0JBQWdCO1FBQ3BCLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLEdBQUcsR0FBRyxrQkFBa0IsQ0FBQyxrQkFBa0IsQ0FBQztJQUN2RSxDQUFDOzs7WUEzQkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxpQkFBaUI7YUFDOUI7Ozs7WUFQa0IsVUFBVTs7O3VCQVN4QixLQUFLOzs7O0lBQU4sbUNBQTBDOzs7OztJQUU5Qiw4QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0RpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5wdXQsIE9uQ2hhbmdlcywgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7VXNlclByb2ZpbGVTZXJ2aWNlfSBmcm9tIFwiLi91c2VyLXByb2ZpbGUuc2VydmljZVwiO1xuXG5kZWNsYXJlIGxldCBpTmV0OiBhbnk7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnaW1nW3VzZXJBdmF0YXJdJ1xufSlcbmV4cG9ydCBjbGFzcyBBdmF0YXJEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gICAgQElucHV0KCkgdXNlcmNvZGU6IHN0cmluZyA9IGlOZXQudXNlcm5hbWU7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9lbDogRWxlbWVudFJlZikge31cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLl9lbC5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgdGhpcy5fbG9hZEF2YXRhckVycm9yLmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLl9zZXRBdmF0YXIoKTtcbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcygpIHtcbiAgICAgICAgdGhpcy5fc2V0QXZhdGFyKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfc2V0QXZhdGFyKCkge1xuICAgICAgICBpZiAoIXRoaXMudXNlcmNvZGUpIHtcbiAgICAgICAgICAgIHRoaXMuX2xvYWRBdmF0YXJFcnJvcigpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQuc3JjID0gaU5ldC5nZXRVcmwoJ3N5c3RlbS91c2VycHJvZmlsZS9waG90bycpICsgJz91c2VyY29kZT0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMudXNlcmNvZGUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2xvYWRBdmF0YXJFcnJvcigpIHtcbiAgICAgICAgdGhpcy5fZWwubmF0aXZlRWxlbWVudC5zcmMgPSBVc2VyUHJvZmlsZVNlcnZpY2UuREVGQVVMVF9BVkFUQVJfVVJMO1xuICAgIH1cbn1cbiJdfQ==