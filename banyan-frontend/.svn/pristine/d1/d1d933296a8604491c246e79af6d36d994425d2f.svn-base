/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as searchHelper from '../utils/search-helper';
import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { isDefined } from '../utils/value-utils';
var NgOptionHighlightDirective = /** @class */ (function () {
    function NgOptionHighlightDirective(elementRef, renderer) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.element = this.elementRef.nativeElement;
    }
    /**
     * @return {?}
     */
    NgOptionHighlightDirective.prototype.ngOnChanges = /**
     * @return {?}
     */
    function () {
        if (this._canHighlight) {
            this._highlightLabel();
        }
    };
    /**
     * @return {?}
     */
    NgOptionHighlightDirective.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.label = this.element.innerHTML;
        if (this._canHighlight) {
            this._highlightLabel();
        }
    };
    /**
     * @private
     * @return {?}
     */
    NgOptionHighlightDirective.prototype._highlightLabel = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var label = this.label;
        if (!this.term) {
            this._setInnerHtml(label);
            return;
        }
        /** @type {?} */
        var indexOfTerm = searchHelper.stripSpecialChars(label)
            .toLowerCase()
            .indexOf(searchHelper.stripSpecialChars(this.term).toLowerCase());
        if (indexOfTerm > -1) {
            this._setInnerHtml(label.substring(0, indexOfTerm)
                + ("<span class=\"highlighted\">" + label.substr(indexOfTerm, this.term.length) + "</span>")
                + label.substring(indexOfTerm + this.term.length, label.length));
        }
        else {
            this._setInnerHtml(label);
        }
    };
    Object.defineProperty(NgOptionHighlightDirective.prototype, "_canHighlight", {
        get: /**
         * @private
         * @return {?}
         */
        function () {
            return isDefined(this.term) && isDefined(this.label);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     * @param {?} html
     * @return {?}
     */
    NgOptionHighlightDirective.prototype._setInnerHtml = /**
     * @private
     * @param {?} html
     * @return {?}
     */
    function (html) {
        this.renderer.setProperty(this.elementRef.nativeElement, 'innerHTML', html);
    };
    NgOptionHighlightDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[ngOptionHighlight]'
                },] }
    ];
    /** @nocollapse */
    NgOptionHighlightDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    NgOptionHighlightDirective.propDecorators = {
        term: [{ type: Input, args: ['ngOptionHighlight',] }]
    };
    return NgOptionHighlightDirective;
}());
export { NgOptionHighlightDirective };
if (false) {
    /** @type {?} */
    NgOptionHighlightDirective.prototype.term;
    /**
     * @type {?}
     * @private
     */
    NgOptionHighlightDirective.prototype.element;
    /**
     * @type {?}
     * @private
     */
    NgOptionHighlightDirective.prototype.label;
    /**
     * @type {?}
     * @private
     */
    NgOptionHighlightDirective.prototype.elementRef;
    /**
     * @type {?}
     * @private
     */
    NgOptionHighlightDirective.prototype.renderer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctb3B0aW9uLWhpZ2hsaWdodC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbmV0LXVpLyIsInNvdXJjZXMiOlsic3JjL25nLXNlbGVjdC9kaXJlY3RpdmUvbmctb3B0aW9uLWhpZ2hsaWdodC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sS0FBSyxZQUFZLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUVILFNBQVMsRUFDVCxVQUFVLEVBQ1YsS0FBSyxFQUVMLFNBQVMsRUFDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFakQ7SUFVSSxvQ0FDWSxVQUFzQixFQUN0QixRQUFtQjtRQURuQixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDM0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQztJQUNqRCxDQUFDOzs7O0lBRUQsZ0RBQVc7OztJQUFYO1FBQ0ksSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3BCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztTQUMxQjtJQUNMLENBQUM7Ozs7SUFFRCxvREFBZTs7O0lBQWY7UUFDSSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDO1FBQ3BDLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUNwQixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7U0FDMUI7SUFDTCxDQUFDOzs7OztJQUVPLG9EQUFlOzs7O0lBQXZCOztZQUNVLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSztRQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNaLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDMUIsT0FBTztTQUNWOztZQUVLLFdBQVcsR0FBRyxZQUFZLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDO2FBQ3BELFdBQVcsRUFBRTthQUNiLE9BQU8sQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3JFLElBQUksV0FBVyxHQUFHLENBQUMsQ0FBQyxFQUFFO1lBQ2xCLElBQUksQ0FBQyxhQUFhLENBQ2QsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsV0FBVyxDQUFDO21CQUM3QixpQ0FBNkIsS0FBSyxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBUyxDQUFBO2tCQUNqRixLQUFLLENBQUMsU0FBUyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztTQUN4RTthQUFNO1lBQ0gsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUM3QjtJQUNMLENBQUM7SUFFRCxzQkFBWSxxREFBYTs7Ozs7UUFBekI7WUFDSSxPQUFPLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN6RCxDQUFDOzs7T0FBQTs7Ozs7O0lBRU8sa0RBQWE7Ozs7O0lBQXJCLFVBQXNCLElBQUk7UUFDdEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2hGLENBQUM7O2dCQXZESixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLHFCQUFxQjtpQkFDbEM7Ozs7Z0JBVEcsVUFBVTtnQkFHVixTQUFTOzs7dUJBU1IsS0FBSyxTQUFDLG1CQUFtQjs7SUFtRDlCLGlDQUFDO0NBQUEsQUF4REQsSUF3REM7U0FyRFksMEJBQTBCOzs7SUFFbkMsMENBQXlDOzs7OztJQUV6Qyw2Q0FBNkI7Ozs7O0lBQzdCLDJDQUFzQjs7Ozs7SUFHbEIsZ0RBQThCOzs7OztJQUM5Qiw4Q0FBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBzZWFyY2hIZWxwZXIgZnJvbSAnLi4vdXRpbHMvc2VhcmNoLWhlbHBlcic7XG5pbXBvcnQge1xuICAgIEFmdGVyVmlld0luaXQsXG4gICAgRGlyZWN0aXZlLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgSW5wdXQsXG4gICAgT25DaGFuZ2VzLFxuICAgIFJlbmRlcmVyMlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGlzRGVmaW5lZCB9IGZyb20gJy4uL3V0aWxzL3ZhbHVlLXV0aWxzJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbbmdPcHRpb25IaWdobGlnaHRdJ1xufSlcbmV4cG9ydCBjbGFzcyBOZ09wdGlvbkhpZ2hsaWdodERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgICBASW5wdXQoJ25nT3B0aW9uSGlnaGxpZ2h0JykgdGVybTogc3RyaW5nO1xuXG4gICAgcHJpdmF0ZSBlbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgICBwcml2YXRlIGxhYmVsOiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgfVxuXG4gICAgbmdPbkNoYW5nZXMoKSB7XG4gICAgICAgIGlmICh0aGlzLl9jYW5IaWdobGlnaHQpIHtcbiAgICAgICAgICAgIHRoaXMuX2hpZ2hsaWdodExhYmVsKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIHRoaXMubGFiZWwgPSB0aGlzLmVsZW1lbnQuaW5uZXJIVE1MO1xuICAgICAgICBpZiAodGhpcy5fY2FuSGlnaGxpZ2h0KSB7XG4gICAgICAgICAgICB0aGlzLl9oaWdobGlnaHRMYWJlbCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaGlnaGxpZ2h0TGFiZWwoKSB7XG4gICAgICAgIGNvbnN0IGxhYmVsID0gdGhpcy5sYWJlbDtcbiAgICAgICAgaWYgKCF0aGlzLnRlcm0pIHtcbiAgICAgICAgICAgIHRoaXMuX3NldElubmVySHRtbChsYWJlbCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBpbmRleE9mVGVybSA9IHNlYXJjaEhlbHBlci5zdHJpcFNwZWNpYWxDaGFycyhsYWJlbClcbiAgICAgICAgICAgIC50b0xvd2VyQ2FzZSgpXG4gICAgICAgICAgICAuaW5kZXhPZihzZWFyY2hIZWxwZXIuc3RyaXBTcGVjaWFsQ2hhcnModGhpcy50ZXJtKS50b0xvd2VyQ2FzZSgpKTtcbiAgICAgICAgaWYgKGluZGV4T2ZUZXJtID4gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuX3NldElubmVySHRtbChcbiAgICAgICAgICAgICAgICBsYWJlbC5zdWJzdHJpbmcoMCwgaW5kZXhPZlRlcm0pXG4gICAgICAgICAgICAgICAgKyBgPHNwYW4gY2xhc3M9XCJoaWdobGlnaHRlZFwiPiR7bGFiZWwuc3Vic3RyKGluZGV4T2ZUZXJtLCB0aGlzLnRlcm0ubGVuZ3RoKX08L3NwYW4+YFxuICAgICAgICAgICAgICAgICsgbGFiZWwuc3Vic3RyaW5nKGluZGV4T2ZUZXJtICsgdGhpcy50ZXJtLmxlbmd0aCwgbGFiZWwubGVuZ3RoKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9zZXRJbm5lckh0bWwobGFiZWwpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXQgX2NhbkhpZ2hsaWdodCgpIHtcbiAgICAgICAgcmV0dXJuIGlzRGVmaW5lZCh0aGlzLnRlcm0pICYmIGlzRGVmaW5lZCh0aGlzLmxhYmVsKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9zZXRJbm5lckh0bWwoaHRtbCkge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnaW5uZXJIVE1MJywgaHRtbCk7XG4gICAgfVxufSAgIFxuIl19