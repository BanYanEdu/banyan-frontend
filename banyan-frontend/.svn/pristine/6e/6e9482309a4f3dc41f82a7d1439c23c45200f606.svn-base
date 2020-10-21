/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Input, Output, ElementRef, ViewContainerRef, TemplateRef, EventEmitter } from '@angular/core';
export class ListViewDirective {
    /**
     * @param {?} _element
     * @param {?} _vr
     * @param {?} _tr
     */
    constructor(_element, _vr, _tr) {
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
    ngOnInit() {
        //console.log('[ListViewDirective]', this._element);
        // document.addEventListener('keydown', (e) => this.handleKeyPress(e));
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        this._vr.clear();
        /** @type {?} */
        const count = this.listOf.length;
        /** @type {?} */
        const rows = this.listOf.map((/**
         * @param {?} item
         * @param {?} index
         * @return {?}
         */
        (item, index) => {
            /** @type {?} */
            const row = { item, index, count };
            /** @type {?} */
            let view = this._vr.createEmbeddedView(this._tr, row);
            // view.rootNodes[0].addEventListener('click', (event) => this.handleClick(event, index));
            return row;
        }));
        // this.updateItemState();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
    }
}
ListViewDirective.decorators = [
    { type: Directive, args: [{
                selector: '[listOf]',
                exportAs: 'listView'
            },] }
];
/** @nocollapse */
ListViewDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: ViewContainerRef },
    { type: TemplateRef }
];
ListViewDirective.propDecorators = {
    listOf: [{ type: Input }],
    onSelectionChanged: [{ type: Output }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC12aWV3LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtdWkvIiwic291cmNlcyI6WyJzcmMvbGlzdC12aWV3L2xpc3Qtdmlldy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsZ0JBQWdCLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFFbEYsTUFBTSxlQUFlLENBQUM7QUFPdkIsTUFBTSxPQUFPLGlCQUFpQjs7Ozs7O0lBTzVCLFlBQW9CLFFBQW9CLEVBQVcsR0FBcUIsRUFBVSxHQUFxQjtRQUFuRixhQUFRLEdBQVIsUUFBUSxDQUFZO1FBQVcsUUFBRyxHQUFILEdBQUcsQ0FBa0I7UUFBVSxRQUFHLEdBQUgsR0FBRyxDQUFrQjtRQU52RyxrQkFBYSxHQUFHLEVBQUUsQ0FBQztRQUNuQixlQUFVLEdBQUcsQ0FBQyxDQUFDO1FBRU4sV0FBTSxHQUFHLEVBQUUsQ0FBQztRQUNYLHVCQUFrQixHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7SUFFd0QsQ0FBQzs7OztJQUUzRyxRQUFRO1FBQ04sb0RBQW9EO1FBQ3BELHVFQUF1RTtJQUN6RSxDQUFDOzs7OztJQUVELFdBQVcsQ0FBQyxPQUFPO1FBQ2pCLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUM7O2NBRVgsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTTs7Y0FDMUIsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRzs7Ozs7UUFBQyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTs7a0JBQ3JDLEdBQUcsR0FBRyxFQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFDOztnQkFDNUIsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7WUFDckQsMEZBQTBGO1lBQzFGLE9BQU8sR0FBRyxDQUFDO1FBQ2IsQ0FBQyxFQUFDO1FBRUYsMEJBQTBCO0lBQzVCLENBQUM7Ozs7SUFFRCxXQUFXO0lBRVgsQ0FBQzs7O1lBbENGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUcsVUFBVTtnQkFDckIsUUFBUSxFQUFHLFVBQVU7YUFDdEI7Ozs7WUFSMkIsVUFBVTtZQUFFLGdCQUFnQjtZQUFFLFdBQVc7OztxQkFhbEUsS0FBSztpQ0FDTCxNQUFNOzs7O0lBSlAsMENBQW1COztJQUNuQix1Q0FBZTs7SUFFZixtQ0FBcUI7O0lBQ3JCLCtDQUFrRDs7Ozs7SUFFdEMscUNBQTRCOzs7OztJQUFHLGdDQUE2Qjs7Ozs7SUFBRSxnQ0FBNkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBEaXJlY3RpdmUsIElucHV0LCBPdXRwdXQsIEVsZW1lbnRSZWYsIFZpZXdDb250YWluZXJSZWYsIFRlbXBsYXRlUmVmLCBFdmVudEVtaXR0ZXIsXG4gIE9uQ2hhbmdlcywgT25Jbml0LCBPbkRlc3Ryb3lcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yIDogJ1tsaXN0T2ZdJyxcbiAgZXhwb3J0QXMgOiAnbGlzdFZpZXcnXG59KVxuZXhwb3J0IGNsYXNzIExpc3RWaWV3RGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveXtcbiAgc2VsZWN0ZWRJdGVtcyA9IFtdO1xuICBhY3RpdmVJdGVtID0gMDtcblxuICBASW5wdXQoKSBsaXN0T2YgPSBbXTtcbiAgQE91dHB1dCgpIG9uU2VsZWN0aW9uQ2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9lbGVtZW50OiBFbGVtZW50UmVmLCAgcHJpdmF0ZSBfdnI6IFZpZXdDb250YWluZXJSZWYsIHByaXZhdGUgX3RyOiBUZW1wbGF0ZVJlZjxhbnk+KSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIC8vY29uc29sZS5sb2coJ1tMaXN0Vmlld0RpcmVjdGl2ZV0nLCB0aGlzLl9lbGVtZW50KTtcbiAgICAvLyBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGUpID0+IHRoaXMuaGFuZGxlS2V5UHJlc3MoZSkpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlcykge1xuICAgIHRoaXMuX3ZyLmNsZWFyKCk7XG5cbiAgICBjb25zdCBjb3VudCA9IHRoaXMubGlzdE9mLmxlbmd0aDtcbiAgICBjb25zdCByb3dzID0gdGhpcy5saXN0T2YubWFwKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgY29uc3Qgcm93ID0ge2l0ZW0sIGluZGV4LCBjb3VudH07XG4gICAgICBsZXQgdmlldyA9IHRoaXMuX3ZyLmNyZWF0ZUVtYmVkZGVkVmlldyh0aGlzLl90ciwgcm93KTtcbiAgICAgIC8vIHZpZXcucm9vdE5vZGVzWzBdLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB0aGlzLmhhbmRsZUNsaWNrKGV2ZW50LCBpbmRleCkpO1xuICAgICAgcmV0dXJuIHJvdztcbiAgICB9KTtcblxuICAgIC8vIHRoaXMudXBkYXRlSXRlbVN0YXRlKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiBhbnkge1xuXG4gIH1cblxufVxuIl19