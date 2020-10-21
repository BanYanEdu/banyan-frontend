/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, Input } from '@angular/core';
export class CollapseDirective {
    /**
     * @param {?} _el
     */
    constructor(_el) {
        this._el = _el;
        this.expanded = false;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._element = $(this._el.nativeElement);
        // Click toggle
        if (this.toggleEl) {
            this.toggleEl.addEventListener('click', this.toggle.bind(this));
        }
        this.expanded = !this.expanded;
        this.toggle();
    }
    /**
     * @return {?}
     */
    show() {
        this.expanded = true;
        this._element.collapse('show').parent().addClass('collapse-expanded');
    }
    /**
     * @return {?}
     */
    hide() {
        this.expanded = false;
        this._element.collapse('hide').parent().removeClass('collapse-expanded');
    }
    /**
     * @return {?}
     */
    toggle() {
        if (this.expanded) {
            this.hide();
        }
        else {
            this.show();
        }
    }
}
CollapseDirective.decorators = [
    { type: Directive, args: [{
                selector: '[appCollapse]'
            },] }
];
/** @nocollapse */
CollapseDirective.ctorParameters = () => [
    { type: ElementRef }
];
CollapseDirective.propDecorators = {
    expanded: [{ type: Input }],
    toggleEl: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    CollapseDirective.prototype.expanded;
    /** @type {?} */
    CollapseDirective.prototype.toggleEl;
    /**
     * @type {?}
     * @private
     */
    CollapseDirective.prototype._element;
    /**
     * @type {?}
     * @private
     */
    CollapseDirective.prototype._el;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGFwc2UuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC11aS8iLCJzb3VyY2VzIjpbInNyYy9jb2xsYXBzZS9jb2xsYXBzZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBUyxNQUFNLGVBQWUsQ0FBQztBQU1uRSxNQUFNLE9BQU8saUJBQWlCOzs7O0lBTTVCLFlBQ1UsR0FBZTtRQUFmLFFBQUcsR0FBSCxHQUFHLENBQVk7UUFOaEIsYUFBUSxHQUFZLEtBQUssQ0FBQztJQU8vQixDQUFDOzs7O0lBRUwsUUFBUTtRQUNOLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7UUFFMUMsZUFBZTtRQUNmLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNqQixJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQ2pFO1FBRUQsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDL0IsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBRWhCLENBQUM7Ozs7SUFFRCxJQUFJO1FBQ0YsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFDeEUsQ0FBQzs7OztJQUVELElBQUk7UUFDRixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUN0QixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxXQUFXLENBQUMsbUJBQW1CLENBQUMsQ0FBQztJQUMzRSxDQUFDOzs7O0lBRUQsTUFBTTtRQUNKLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNqQixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDYjthQUFNO1lBQ0wsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ2I7SUFDSCxDQUFDOzs7WUExQ0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxlQUFlO2FBQzFCOzs7O1lBTGtCLFVBQVU7Ozt1QkFPMUIsS0FBSzt1QkFDTCxLQUFLOzs7O0lBRE4scUNBQW1DOztJQUNuQyxxQ0FBK0I7Ozs7O0lBRS9CLHFDQUFpQjs7Ozs7SUFHZixnQ0FBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0RpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5wdXQsIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5kZWNsYXJlIHZhciAkOiBhbnk7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1thcHBDb2xsYXBzZV0nXG59KVxuZXhwb3J0IGNsYXNzIENvbGxhcHNlRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgZXhwYW5kZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgdG9nZ2xlRWw6IEhUTUxFbGVtZW50O1xuXG4gIHByaXZhdGUgX2VsZW1lbnQ7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfZWw6IEVsZW1lbnRSZWZcbiAgKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLl9lbGVtZW50ID0gJCh0aGlzLl9lbC5uYXRpdmVFbGVtZW50KTtcblxuICAgIC8vIENsaWNrIHRvZ2dsZVxuICAgIGlmICh0aGlzLnRvZ2dsZUVsKSB7XG4gICAgICB0aGlzLnRvZ2dsZUVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy50b2dnbGUuYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgdGhpcy5leHBhbmRlZCA9ICF0aGlzLmV4cGFuZGVkO1xuICAgIHRoaXMudG9nZ2xlKCk7XG5cbiAgfVxuXG4gIHNob3coKSB7XG4gICAgdGhpcy5leHBhbmRlZCA9IHRydWU7XG4gICAgdGhpcy5fZWxlbWVudC5jb2xsYXBzZSgnc2hvdycpLnBhcmVudCgpLmFkZENsYXNzKCdjb2xsYXBzZS1leHBhbmRlZCcpO1xuICB9XG5cbiAgaGlkZSgpIHtcbiAgICB0aGlzLmV4cGFuZGVkID0gZmFsc2U7XG4gICAgdGhpcy5fZWxlbWVudC5jb2xsYXBzZSgnaGlkZScpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdjb2xsYXBzZS1leHBhbmRlZCcpO1xuICB9XG5cbiAgdG9nZ2xlKCkge1xuICAgIGlmICh0aGlzLmV4cGFuZGVkKSB7XG4gICAgICB0aGlzLmhpZGUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zaG93KCk7XG4gICAgfVxuICB9XG5cbn1cbiJdfQ==