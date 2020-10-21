/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { AutocompleteListDirective } from "./autocomplete-list.directive";
export class AutocompleteInputDirective {
    /**
     * @param {?} el
     */
    constructor(el) {
        this.el = el;
        this.onBackSpaceRemove = new EventEmitter();
    }
    /**
     * @return {?}
     */
    onFocus() {
        this.autoList.open();
    }
    /**
     * @param {?} e
     * @return {?}
     */
    onInput(e) {
        switch (e.which) {
            case 8:
                if (!e.target.value) {
                    this.onBackSpaceRemove.emit(e);
                }
                break;
        }
        this.autoList.onInput(e);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.hideList = this.hideList.bind(this);
        // Click out hide list
        document.addEventListener('click', this.hideList);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        document.removeEventListener('click', this.hideList);
    }
    /**
     * @private
     * @param {?} e
     * @return {?}
     */
    hideList(e) {
        if (!e.target.isSameNode(this.el.nativeElement)) {
            this.autoList.hide();
        }
    }
}
AutocompleteInputDirective.decorators = [
    { type: Directive, args: [{
                selector: '[appAutocompleteInput]'
            },] }
];
/** @nocollapse */
AutocompleteInputDirective.ctorParameters = () => [
    { type: ElementRef }
];
AutocompleteInputDirective.propDecorators = {
    autoList: [{ type: Input }],
    onBackSpaceRemove: [{ type: Output }],
    onFocus: [{ type: HostListener, args: ['focus',] }],
    onInput: [{ type: HostListener, args: ['keydown', ['$event'],] }]
};
if (false) {
    /** @type {?} */
    AutocompleteInputDirective.prototype.autoList;
    /** @type {?} */
    AutocompleteInputDirective.prototype.onBackSpaceRemove;
    /**
     * @type {?}
     * @protected
     */
    AutocompleteInputDirective.prototype.el;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2NvbXBsZXRlLWlucHV0LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtdWkvIiwic291cmNlcyI6WyJzcmMvYXV0b2NvbXBsZXRlL2F1dG9jb21wbGV0ZS1pbnB1dC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFxQixNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDbEgsT0FBTyxFQUFDLHlCQUF5QixFQUFDLE1BQU0sK0JBQStCLENBQUM7QUFLeEUsTUFBTSxPQUFPLDBCQUEwQjs7OztJQW9CckMsWUFDWSxFQUFjO1FBQWQsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQWxCaEIsc0JBQWlCLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQW1CN0MsQ0FBQzs7OztJQWpCa0IsT0FBTztRQUM1QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3ZCLENBQUM7Ozs7O0lBRW9DLE9BQU8sQ0FBQyxDQUFDO1FBQzVDLFFBQVEsQ0FBQyxDQUFDLEtBQUssRUFBRTtZQUNmLEtBQUssQ0FBQztnQkFDSixJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUU7b0JBQ25CLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ2hDO2dCQUNELE1BQU07U0FDVDtRQUNELElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzNCLENBQUM7Ozs7SUFNRCxRQUFRO1FBQ04sSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QyxzQkFBc0I7UUFDdEIsUUFBUSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDcEQsQ0FBQzs7OztJQUVELFdBQVc7UUFDVCxRQUFRLENBQUMsbUJBQW1CLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN2RCxDQUFDOzs7Ozs7SUFFTyxRQUFRLENBQUMsQ0FBQztRQUNoQixJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsRUFBRTtZQUMvQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3RCO0lBQ0gsQ0FBQzs7O1lBekNGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsd0JBQXdCO2FBQ25DOzs7O1lBTGtCLFVBQVU7Ozt1QkFRMUIsS0FBSztnQ0FDTCxNQUFNO3NCQUVOLFlBQVksU0FBQyxPQUFPO3NCQUlwQixZQUFZLFNBQUMsU0FBUyxFQUFFLENBQUMsUUFBUSxDQUFDOzs7O0lBUG5DLDhDQUE2Qzs7SUFDN0MsdURBQWlEOzs7OztJQWtCL0Msd0NBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQsIE91dHB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0F1dG9jb21wbGV0ZUxpc3REaXJlY3RpdmV9IGZyb20gXCIuL2F1dG9jb21wbGV0ZS1saXN0LmRpcmVjdGl2ZVwiO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbYXBwQXV0b2NvbXBsZXRlSW5wdXRdJ1xufSlcbmV4cG9ydCBjbGFzcyBBdXRvY29tcGxldGVJbnB1dERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICBASW5wdXQoKSBhdXRvTGlzdDogQXV0b2NvbXBsZXRlTGlzdERpcmVjdGl2ZTtcbiAgQE91dHB1dCgpIG9uQmFja1NwYWNlUmVtb3ZlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIEBIb3N0TGlzdGVuZXIoJ2ZvY3VzJykgb25Gb2N1cygpIHtcbiAgICB0aGlzLmF1dG9MaXN0Lm9wZW4oKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24nLCBbJyRldmVudCddKSBvbklucHV0KGUpIHtcbiAgICBzd2l0Y2ggKGUud2hpY2gpIHtcbiAgICAgIGNhc2UgODpcbiAgICAgICAgaWYgKCFlLnRhcmdldC52YWx1ZSkge1xuICAgICAgICAgIHRoaXMub25CYWNrU3BhY2VSZW1vdmUuZW1pdChlKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgdGhpcy5hdXRvTGlzdC5vbklucHV0KGUpO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGVsOiBFbGVtZW50UmVmXG4gICkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5oaWRlTGlzdCA9IHRoaXMuaGlkZUxpc3QuYmluZCh0aGlzKTtcbiAgICAvLyBDbGljayBvdXQgaGlkZSBsaXN0XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhpZGVMaXN0KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oaWRlTGlzdCk7XG4gIH1cblxuICBwcml2YXRlIGhpZGVMaXN0KGUpIHtcbiAgICBpZiAoIWUudGFyZ2V0LmlzU2FtZU5vZGUodGhpcy5lbC5uYXRpdmVFbGVtZW50KSkge1xuICAgICAgdGhpcy5hdXRvTGlzdC5oaWRlKCk7XG4gICAgfVxuICB9XG59XG4iXX0=