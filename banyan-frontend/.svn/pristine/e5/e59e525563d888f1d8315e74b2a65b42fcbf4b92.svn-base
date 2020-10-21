/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FrontViewDirective } from "../front-view.directive";
var FrontViewComponent = /** @class */ (function () {
    function FrontViewComponent() {
        this.onDestroy = new EventEmitter();
    }
    /**
     * @return {?}
     */
    FrontViewComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.viewer.show();
    };
    /**
     * @param {?} viewUrl
     * @return {?}
     */
    FrontViewComponent.prototype.setViewUrl = /**
     * @param {?} viewUrl
     * @return {?}
     */
    function (viewUrl) {
        this.viewUrl = viewUrl;
        this.iframe.nativeElement.src = viewUrl;
    };
    /**
     * @return {?}
     */
    FrontViewComponent.prototype.onHide = /**
     * @return {?}
     */
    function () {
        this.onDestroy.emit();
    };
    FrontViewComponent.decorators = [
        { type: Component, args: [{
                    template: "<div appFrontView #viewer=\"appFrontView\" (onHide)=\"onHide()\" class=\"front-view\">\n  <div class=\"front-view__container\">\n    <div class=\"front-view__side\">\n      <i (click)=\"viewer.hide()\" class=\"fa fa-times front-view__action\" title=\"Close\"></i>\n    </div>\n    <div class=\"front-view__content\">\n      <iframe #iframe class=\"front-view__iframe\"></iframe>\n    </div>\n  </div>\n</div>",
                    styles: [".front-view{position:fixed;top:0;right:0;bottom:0;left:0;z-index:10000;background:rgba(0,0,0,.5);display:none}.front-view__container{position:absolute;background:#fff;top:20px;right:20px;bottom:20px;left:20px;border-radius:4px;border:1px solid rgba(0,0,0,.2);overflow:hidden}.front-view__side{position:absolute;top:0;bottom:0;left:0;width:50px;border-right:1px solid rgba(0,0,0,.2);padding:5px 0}.front-view__action{width:100%;line-height:40px;text-align:center;color:rgba(0,0,0,.5);cursor:pointer}.front-view__action:hover{color:#2067b0}.front-view__content{position:absolute;top:0;right:0;bottom:0;left:50px;overflow:hidden}.front-view__iframe{width:100%;height:100%;border:0}"]
                }] }
    ];
    /** @nocollapse */
    FrontViewComponent.ctorParameters = function () { return []; };
    FrontViewComponent.propDecorators = {
        onDestroy: [{ type: Output }],
        viewer: [{ type: ViewChild, args: ['viewer',] }],
        iframe: [{ type: ViewChild, args: ['iframe',] }]
    };
    return FrontViewComponent;
}());
export { FrontViewComponent };
if (false) {
    /** @type {?} */
    FrontViewComponent.prototype.onDestroy;
    /** @type {?} */
    FrontViewComponent.prototype.viewer;
    /** @type {?} */
    FrontViewComponent.prototype.iframe;
    /** @type {?} */
    FrontViewComponent.prototype.viewUrl;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtdWkvIiwic291cmNlcyI6WyJzcmMvZnJvbnQtdmlldy9jb21wb25lbnQvdmlld2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFnQixTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3BHLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBRTNEO0lBYUU7UUFOVSxjQUFTLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztJQU05QixDQUFDOzs7O0lBRWpCLDRDQUFlOzs7SUFBZjtRQUNFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDckIsQ0FBQzs7Ozs7SUFFRCx1Q0FBVTs7OztJQUFWLFVBQVcsT0FBTztRQUNoQixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxHQUFHLEdBQUcsT0FBTyxDQUFDO0lBQzFDLENBQUM7Ozs7SUFFRCxtQ0FBTTs7O0lBQU47UUFDRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3hCLENBQUM7O2dCQTFCRixTQUFTLFNBQUM7b0JBQ1Qsb2FBQXNDOztpQkFJdkM7Ozs7OzRCQUVFLE1BQU07eUJBQ04sU0FBUyxTQUFDLFFBQVE7eUJBQ2xCLFNBQVMsU0FBQyxRQUFROztJQWtCckIseUJBQUM7Q0FBQSxBQTNCRCxJQTJCQztTQXJCWSxrQkFBa0I7OztJQUM3Qix1Q0FBOEM7O0lBQzlDLG9DQUFnRDs7SUFDaEQsb0NBQXdDOztJQUV4QyxxQ0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0FmdGVyVmlld0luaXQsIENvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBPdXRwdXQsIFZpZXdDaGlsZH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Zyb250Vmlld0RpcmVjdGl2ZX0gZnJvbSBcIi4uL2Zyb250LXZpZXcuZGlyZWN0aXZlXCI7XG5cbkBDb21wb25lbnQoe1xuICB0ZW1wbGF0ZVVybDogJy4vdmlld2VyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbXG4gICAgJy4uLy4uL3Njc3MvZnJvbnQtdmlldy5jc3MnXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgRnJvbnRWaWV3Q29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG4gIEBPdXRwdXQoKSBvbkRlc3Ryb3kgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQFZpZXdDaGlsZCgndmlld2VyJykgdmlld2VyOiBGcm9udFZpZXdEaXJlY3RpdmU7XG4gIEBWaWV3Q2hpbGQoJ2lmcmFtZScpIGlmcmFtZTogRWxlbWVudFJlZjtcblxuICB2aWV3VXJsOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy52aWV3ZXIuc2hvdygpO1xuICB9XG5cbiAgc2V0Vmlld1VybCh2aWV3VXJsKSB7XG4gICAgdGhpcy52aWV3VXJsID0gdmlld1VybDtcbiAgICB0aGlzLmlmcmFtZS5uYXRpdmVFbGVtZW50LnNyYyA9IHZpZXdVcmw7XG4gIH1cblxuICBvbkhpZGUoKSB7XG4gICAgdGhpcy5vbkRlc3Ryb3kuZW1pdCgpO1xuICB9XG59XG4iXX0=