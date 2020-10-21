/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Input, Output, ElementRef, ViewContainerRef, TemplateRef, EventEmitter } from '@angular/core';
var ListViewDirective = /** @class */ (function () {
    function ListViewDirective(_element, _vr, _tr) {
        this._element = _element;
        this._vr = _vr;
        this._tr = _tr;
        this.selectedItems = [];
        this.activeItem = 0;
        this.listOf = [];
        this.onSelectionChanged = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ListViewDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        //console.log('[ListViewDirective]', this._element);
        // document.addEventListener('keydown', (e) => this.handleKeyPress(e));
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    ListViewDirective.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var _this = this;
        this._vr.clear();
        /** @type {?} */
        var count = this.listOf.length;
        /** @type {?} */
        var rows = this.listOf.map((/**
         * @param {?} item
         * @param {?} index
         * @return {?}
         */
        function (item, index) {
            /** @type {?} */
            var row = { item: item, index: index, count: count };
            /** @type {?} */
            var view = _this._vr.createEmbeddedView(_this._tr, row);
            // view.rootNodes[0].addEventListener('click', (event) => this.handleClick(event, index));
            return row;
        }));
        // this.updateItemState();
    };
    /**
     * @return {?}
     */
    ListViewDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
    };
    ListViewDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[listOf]',
                    exportAs: 'listView'
                },] }
    ];
    /** @nocollapse */
    ListViewDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ViewContainerRef },
        { type: TemplateRef }
    ]; };
    ListViewDirective.propDecorators = {
        listOf: [{ type: Input }],
        onSelectionChanged: [{ type: Output }]
    };
    return ListViewDirective;
}());
export { ListViewDirective };
if (false) {
    /** @type {?} */
    ListViewDirective.prototype.selectedItems;
    /** @type {?} */
    ListViewDirective.prototype.activeItem;
    /** @type {?} */
    ListViewDirective.prototype.listOf;
    /** @type {?} */
    ListViewDirective.prototype.onSelectionChanged;
    /**
     * @type {?}
     * @private
     */
    ListViewDirective.prototype._element;
    /**
     * @type {?}
     * @private
     */
    ListViewDirective.prototype._vr;
    /**
     * @type {?}
     * @private
     */
    ListViewDirective.prototype._tr;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC12aWV3LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtdWkvIiwic291cmNlcyI6WyJzcmMvbGlzdC12aWV3L2xpc3Qtdmlldy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsZ0JBQWdCLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFFbEYsTUFBTSxlQUFlLENBQUM7QUFHdkI7SUFXRSwyQkFBb0IsUUFBb0IsRUFBVyxHQUFxQixFQUFVLEdBQXFCO1FBQW5GLGFBQVEsR0FBUixRQUFRLENBQVk7UUFBVyxRQUFHLEdBQUgsR0FBRyxDQUFrQjtRQUFVLFFBQUcsR0FBSCxHQUFHLENBQWtCO1FBTnZHLGtCQUFhLEdBQUcsRUFBRSxDQUFDO1FBQ25CLGVBQVUsR0FBRyxDQUFDLENBQUM7UUFFTixXQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ1gsdUJBQWtCLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUV3RCxDQUFDOzs7O0lBRTNHLG9DQUFROzs7SUFBUjtRQUNFLG9EQUFvRDtRQUNwRCx1RUFBdUU7SUFDekUsQ0FBQzs7Ozs7SUFFRCx1Q0FBVzs7OztJQUFYLFVBQVksT0FBTztRQUFuQixpQkFZQztRQVhDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUM7O1lBRVgsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTTs7WUFDMUIsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRzs7Ozs7UUFBQyxVQUFDLElBQUksRUFBRSxLQUFLOztnQkFDakMsR0FBRyxHQUFHLEVBQUMsSUFBSSxNQUFBLEVBQUUsS0FBSyxPQUFBLEVBQUUsS0FBSyxPQUFBLEVBQUM7O2dCQUM1QixJQUFJLEdBQUcsS0FBSSxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxLQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQztZQUNyRCwwRkFBMEY7WUFDMUYsT0FBTyxHQUFHLENBQUM7UUFDYixDQUFDLEVBQUM7UUFFRiwwQkFBMEI7SUFDNUIsQ0FBQzs7OztJQUVELHVDQUFXOzs7SUFBWDtJQUVBLENBQUM7O2dCQWxDRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFHLFVBQVU7b0JBQ3JCLFFBQVEsRUFBRyxVQUFVO2lCQUN0Qjs7OztnQkFSMkIsVUFBVTtnQkFBRSxnQkFBZ0I7Z0JBQUUsV0FBVzs7O3lCQWFsRSxLQUFLO3FDQUNMLE1BQU07O0lBMkJULHdCQUFDO0NBQUEsQUFwQ0QsSUFvQ0M7U0FoQ1ksaUJBQWlCOzs7SUFDNUIsMENBQW1COztJQUNuQix1Q0FBZTs7SUFFZixtQ0FBcUI7O0lBQ3JCLCtDQUFrRDs7Ozs7SUFFdEMscUNBQTRCOzs7OztJQUFHLGdDQUE2Qjs7Ozs7SUFBRSxnQ0FBNkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBEaXJlY3RpdmUsIElucHV0LCBPdXRwdXQsIEVsZW1lbnRSZWYsIFZpZXdDb250YWluZXJSZWYsIFRlbXBsYXRlUmVmLCBFdmVudEVtaXR0ZXIsXG4gIE9uQ2hhbmdlcywgT25Jbml0LCBPbkRlc3Ryb3lcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yIDogJ1tsaXN0T2ZdJyxcbiAgZXhwb3J0QXMgOiAnbGlzdFZpZXcnXG59KVxuZXhwb3J0IGNsYXNzIExpc3RWaWV3RGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveXtcbiAgc2VsZWN0ZWRJdGVtcyA9IFtdO1xuICBhY3RpdmVJdGVtID0gMDtcblxuICBASW5wdXQoKSBsaXN0T2YgPSBbXTtcbiAgQE91dHB1dCgpIG9uU2VsZWN0aW9uQ2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9lbGVtZW50OiBFbGVtZW50UmVmLCAgcHJpdmF0ZSBfdnI6IFZpZXdDb250YWluZXJSZWYsIHByaXZhdGUgX3RyOiBUZW1wbGF0ZVJlZjxhbnk+KSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIC8vY29uc29sZS5sb2coJ1tMaXN0Vmlld0RpcmVjdGl2ZV0nLCB0aGlzLl9lbGVtZW50KTtcbiAgICAvLyBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGUpID0+IHRoaXMuaGFuZGxlS2V5UHJlc3MoZSkpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlcykge1xuICAgIHRoaXMuX3ZyLmNsZWFyKCk7XG5cbiAgICBjb25zdCBjb3VudCA9IHRoaXMubGlzdE9mLmxlbmd0aDtcbiAgICBjb25zdCByb3dzID0gdGhpcy5saXN0T2YubWFwKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgY29uc3Qgcm93ID0ge2l0ZW0sIGluZGV4LCBjb3VudH07XG4gICAgICBsZXQgdmlldyA9IHRoaXMuX3ZyLmNyZWF0ZUVtYmVkZGVkVmlldyh0aGlzLl90ciwgcm93KTtcbiAgICAgIC8vIHZpZXcucm9vdE5vZGVzWzBdLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB0aGlzLmhhbmRsZUNsaWNrKGV2ZW50LCBpbmRleCkpO1xuICAgICAgcmV0dXJuIHJvdztcbiAgICB9KTtcblxuICAgIC8vIHRoaXMudXBkYXRlSXRlbVN0YXRlKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiBhbnkge1xuXG4gIH1cblxufVxuIl19