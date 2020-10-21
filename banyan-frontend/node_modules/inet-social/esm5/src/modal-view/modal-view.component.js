/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, ViewChild } from '@angular/core';
var SocialModalViewComponent = /** @class */ (function () {
    function SocialModalViewComponent() {
    }
    /**
     * @return {?}
     */
    SocialModalViewComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.$modal = $(this.viewModal.nativeElement);
        this.$modal.on('hidden.bs.modal', (/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            delete _this.activity;
        }));
        $(document.body).append(this.$modal);
    };
    /**
     * @return {?}
     */
    SocialModalViewComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.$modal.remove();
    };
    /**
     * @param {?} activity
     * @return {?}
     */
    SocialModalViewComponent.prototype.viewActivity = /**
     * @param {?} activity
     * @return {?}
     */
    function (activity) {
        var _this = this;
        this.activity = activity;
        setTimeout((/**
         * @return {?}
         */
        function () {
            _this.$modal.modal('show');
        }), 100);
    };
    SocialModalViewComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-social-modal-view',
                    template: "<div #viewModal class=\"modal fade\" tabindex=\"-1\" role=\"dialog\">\n    <div class=\"modal-dialog modal-lg\" role=\"document\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <h5 class=\"modal-title\">Th\u1EA3o lu\u1EADn</h5>\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n                    <span aria-hidden=\"true\">&times;</span>\n                </button>\n            </div>\n            <div class=\"modal-body\">\n                <div *ngIf=\"activity\" socialActivity [activity]=\"activity\"></div>\n            </div>\n        </div>\n    </div>\n</div>\n",
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    SocialModalViewComponent.ctorParameters = function () { return []; };
    SocialModalViewComponent.propDecorators = {
        viewModal: [{ type: ViewChild, args: ['viewModal',] }]
    };
    return SocialModalViewComponent;
}());
export { SocialModalViewComponent };
if (false) {
    /** @type {?} */
    SocialModalViewComponent.prototype.viewModal;
    /** @type {?} */
    SocialModalViewComponent.prototype.activity;
    /** @type {?} */
    SocialModalViewComponent.prototype.$modal;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtdmlldy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbmV0LXNvY2lhbC8iLCJzb3VyY2VzIjpbInNyYy9tb2RhbC12aWV3L21vZGFsLXZpZXcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQWdCLFNBQVMsRUFBRSxVQUFVLEVBQWEsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBSXpGO0lBVUU7SUFBZ0IsQ0FBQzs7OztJQUVqQixrREFBZTs7O0lBQWY7UUFBQSxpQkFRQztRQVBDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLENBQUM7UUFFOUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsaUJBQWlCOzs7O1FBQUUsVUFBQyxDQUFDO1lBQ2xDLE9BQU8sS0FBSSxDQUFDLFFBQVEsQ0FBQztRQUN2QixDQUFDLEVBQUMsQ0FBQztRQUVILENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN2QyxDQUFDOzs7O0lBRUQsOENBQVc7OztJQUFYO1FBQ0UsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUN2QixDQUFDOzs7OztJQUVELCtDQUFZOzs7O0lBQVosVUFBYSxRQUF3QjtRQUFyQyxpQkFLQztRQUpDLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLFVBQVU7OztRQUFDO1lBQ1QsS0FBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDNUIsQ0FBQyxHQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ1YsQ0FBQzs7Z0JBL0JGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsdUJBQXVCO29CQUNqQyxnckJBQTBDOztpQkFFM0M7Ozs7OzRCQUVFLFNBQVMsU0FBQyxXQUFXOztJQTBCeEIsK0JBQUM7Q0FBQSxBQWhDRCxJQWdDQztTQTNCWSx3QkFBd0I7OztJQUNuQyw2Q0FBOEM7O0lBQzlDLDRDQUF5Qjs7SUFDekIsMENBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0FmdGVyVmlld0luaXQsIENvbXBvbmVudCwgRWxlbWVudFJlZiwgT25EZXN0cm95LCBWaWV3Q2hpbGR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtTb2NpYWxBY3Rpdml0eX0gZnJvbSAnLi4vbW9kZWwvQWN0aXZpdHknO1xuZGVjbGFyZSBsZXQgJDogYW55O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhcHAtc29jaWFsLW1vZGFsLXZpZXcnLFxuICB0ZW1wbGF0ZVVybDogJy4vbW9kYWwtdmlldy5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL21vZGFsLXZpZXcuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIFNvY2lhbE1vZGFsVmlld0NvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gIEBWaWV3Q2hpbGQoJ3ZpZXdNb2RhbCcpIHZpZXdNb2RhbDogRWxlbWVudFJlZjtcbiAgYWN0aXZpdHk6IFNvY2lhbEFjdGl2aXR5O1xuICAkbW9kYWw6IGFueTtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLiRtb2RhbCA9ICQodGhpcy52aWV3TW9kYWwubmF0aXZlRWxlbWVudCk7XG5cbiAgICB0aGlzLiRtb2RhbC5vbignaGlkZGVuLmJzLm1vZGFsJywgKGUpID0+IHtcbiAgICAgIGRlbGV0ZSB0aGlzLmFjdGl2aXR5O1xuICAgIH0pO1xuXG4gICAgJChkb2N1bWVudC5ib2R5KS5hcHBlbmQodGhpcy4kbW9kYWwpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy4kbW9kYWwucmVtb3ZlKCk7XG4gIH1cblxuICB2aWV3QWN0aXZpdHkoYWN0aXZpdHk6IFNvY2lhbEFjdGl2aXR5KSB7XG4gICAgdGhpcy5hY3Rpdml0eSA9IGFjdGl2aXR5O1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy4kbW9kYWwubW9kYWwoJ3Nob3cnKTtcbiAgICB9LCAxMDApO1xuICB9XG59XG4iXX0=