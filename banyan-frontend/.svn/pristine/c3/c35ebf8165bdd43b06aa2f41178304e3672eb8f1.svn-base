/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as searchHelper from '../utils/search-helper';
import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { isDefined } from '../utils/value-utils';
export class NgOptionHighlightDirective {
    /**
     * @param {?} elementRef
     * @param {?} renderer
     */
    constructor(elementRef, renderer) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.element = this.elementRef.nativeElement;
    }
    /**
     * @return {?}
     */
    ngOnChanges() {
        if (this._canHighlight) {
            this._highlightLabel();
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.label = this.element.innerHTML;
        if (this._canHighlight) {
            this._highlightLabel();
        }
    }
    /**
     * @private
     * @return {?}
     */
    _highlightLabel() {
        /** @type {?} */
        const label = this.label;
        if (!this.term) {
            this._setInnerHtml(label);
            return;
        }
        /** @type {?} */
        const indexOfTerm = searchHelper.stripSpecialChars(label)
            .toLowerCase()
            .indexOf(searchHelper.stripSpecialChars(this.term).toLowerCase());
        if (indexOfTerm > -1) {
            this._setInnerHtml(label.substring(0, indexOfTerm)
                + `<span class="highlighted">${label.substr(indexOfTerm, this.term.length)}</span>`
                + label.substring(indexOfTerm + this.term.length, label.length));
        }
        else {
            this._setInnerHtml(label);
        }
    }
    /**
     * @private
     * @return {?}
     */
    get _canHighlight() {
        return isDefined(this.term) && isDefined(this.label);
    }
    /**
     * @private
     * @param {?} html
     * @return {?}
     */
    _setInnerHtml(html) {
        this.renderer.setProperty(this.elementRef.nativeElement, 'innerHTML', html);
    }
}
NgOptionHighlightDirective.decorators = [
    { type: Directive, args: [{
                selector: '[ngOptionHighlight]'
            },] }
];
/** @nocollapse */
NgOptionHighlightDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 }
];
NgOptionHighlightDirective.propDecorators = {
    term: [{ type: Input, args: ['ngOptionHighlight',] }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctb3B0aW9uLWhpZ2hsaWdodC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbmV0LXVpLyIsInNvdXJjZXMiOlsic3JjL25nLXNlbGVjdC9kaXJlY3RpdmUvbmctb3B0aW9uLWhpZ2hsaWdodC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sS0FBSyxZQUFZLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUVILFNBQVMsRUFDVCxVQUFVLEVBQ1YsS0FBSyxFQUVMLFNBQVMsRUFDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFLakQsTUFBTSxPQUFPLDBCQUEwQjs7Ozs7SUFPbkMsWUFDWSxVQUFzQixFQUN0QixRQUFtQjtRQURuQixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDM0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQztJQUNqRCxDQUFDOzs7O0lBRUQsV0FBVztRQUNQLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUNwQixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7U0FDMUI7SUFDTCxDQUFDOzs7O0lBRUQsZUFBZTtRQUNYLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUM7UUFDcEMsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3BCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztTQUMxQjtJQUNMLENBQUM7Ozs7O0lBRU8sZUFBZTs7Y0FDYixLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUs7UUFDeEIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDWixJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzFCLE9BQU87U0FDVjs7Y0FFSyxXQUFXLEdBQUcsWUFBWSxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQzthQUNwRCxXQUFXLEVBQUU7YUFDYixPQUFPLENBQUMsWUFBWSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNyRSxJQUFJLFdBQVcsR0FBRyxDQUFDLENBQUMsRUFBRTtZQUNsQixJQUFJLENBQUMsYUFBYSxDQUNkLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLFdBQVcsQ0FBQztrQkFDN0IsNkJBQTZCLEtBQUssQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVM7a0JBQ2pGLEtBQUssQ0FBQyxTQUFTLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1NBQ3hFO2FBQU07WUFDSCxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzdCO0lBQ0wsQ0FBQzs7Ozs7SUFFRCxJQUFZLGFBQWE7UUFDckIsT0FBTyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDekQsQ0FBQzs7Ozs7O0lBRU8sYUFBYSxDQUFDLElBQUk7UUFDdEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2hGLENBQUM7OztZQXZESixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHFCQUFxQjthQUNsQzs7OztZQVRHLFVBQVU7WUFHVixTQUFTOzs7bUJBU1IsS0FBSyxTQUFDLG1CQUFtQjs7OztJQUExQiwwQ0FBeUM7Ozs7O0lBRXpDLDZDQUE2Qjs7Ozs7SUFDN0IsMkNBQXNCOzs7OztJQUdsQixnREFBOEI7Ozs7O0lBQzlCLDhDQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHNlYXJjaEhlbHBlciBmcm9tICcuLi91dGlscy9zZWFyY2gtaGVscGVyJztcbmltcG9ydCB7XG4gICAgQWZ0ZXJWaWV3SW5pdCxcbiAgICBEaXJlY3RpdmUsXG4gICAgRWxlbWVudFJlZixcbiAgICBJbnB1dCxcbiAgICBPbkNoYW5nZXMsXG4gICAgUmVuZGVyZXIyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgaXNEZWZpbmVkIH0gZnJvbSAnLi4vdXRpbHMvdmFsdWUtdXRpbHMnO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1tuZ09wdGlvbkhpZ2hsaWdodF0nXG59KVxuZXhwb3J0IGNsYXNzIE5nT3B0aW9uSGlnaGxpZ2h0RGlyZWN0aXZlIGltcGxlbWVudHMgT25DaGFuZ2VzLCBBZnRlclZpZXdJbml0IHtcblxuICAgIEBJbnB1dCgnbmdPcHRpb25IaWdobGlnaHQnKSB0ZXJtOiBzdHJpbmc7XG5cbiAgICBwcml2YXRlIGVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICAgIHByaXZhdGUgbGFiZWw6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMikge1xuICAgICAgICB0aGlzLmVsZW1lbnQgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcygpIHtcbiAgICAgICAgaWYgKHRoaXMuX2NhbkhpZ2hsaWdodCkge1xuICAgICAgICAgICAgdGhpcy5faGlnaGxpZ2h0TGFiZWwoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgdGhpcy5sYWJlbCA9IHRoaXMuZWxlbWVudC5pbm5lckhUTUw7XG4gICAgICAgIGlmICh0aGlzLl9jYW5IaWdobGlnaHQpIHtcbiAgICAgICAgICAgIHRoaXMuX2hpZ2hsaWdodExhYmVsKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9oaWdobGlnaHRMYWJlbCgpIHtcbiAgICAgICAgY29uc3QgbGFiZWwgPSB0aGlzLmxhYmVsO1xuICAgICAgICBpZiAoIXRoaXMudGVybSkge1xuICAgICAgICAgICAgdGhpcy5fc2V0SW5uZXJIdG1sKGxhYmVsKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGluZGV4T2ZUZXJtID0gc2VhcmNoSGVscGVyLnN0cmlwU3BlY2lhbENoYXJzKGxhYmVsKVxuICAgICAgICAgICAgLnRvTG93ZXJDYXNlKClcbiAgICAgICAgICAgIC5pbmRleE9mKHNlYXJjaEhlbHBlci5zdHJpcFNwZWNpYWxDaGFycyh0aGlzLnRlcm0pLnRvTG93ZXJDYXNlKCkpO1xuICAgICAgICBpZiAoaW5kZXhPZlRlcm0gPiAtMSkge1xuICAgICAgICAgICAgdGhpcy5fc2V0SW5uZXJIdG1sKFxuICAgICAgICAgICAgICAgIGxhYmVsLnN1YnN0cmluZygwLCBpbmRleE9mVGVybSlcbiAgICAgICAgICAgICAgICArIGA8c3BhbiBjbGFzcz1cImhpZ2hsaWdodGVkXCI+JHtsYWJlbC5zdWJzdHIoaW5kZXhPZlRlcm0sIHRoaXMudGVybS5sZW5ndGgpfTwvc3Bhbj5gXG4gICAgICAgICAgICAgICAgKyBsYWJlbC5zdWJzdHJpbmcoaW5kZXhPZlRlcm0gKyB0aGlzLnRlcm0ubGVuZ3RoLCBsYWJlbC5sZW5ndGgpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3NldElubmVySHRtbChsYWJlbCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGdldCBfY2FuSGlnaGxpZ2h0KCkge1xuICAgICAgICByZXR1cm4gaXNEZWZpbmVkKHRoaXMudGVybSkgJiYgaXNEZWZpbmVkKHRoaXMubGFiZWwpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3NldElubmVySHRtbChodG1sKSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdpbm5lckhUTUwnLCBodG1sKTtcbiAgICB9XG59ICAgXG4iXX0=