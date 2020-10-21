/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
export class SearchInputComponent {
    constructor() {
        this.placeholder = '';
        this.keyword = '';
        this.onSearch = new EventEmitter();
        this.onPressed = new EventEmitter();
        this.onChanged = new EventEmitter();
    }
    /**
     * @return {?}
     */
    search() {
        this.onSearch.emit(this.keyword);
    }
    /**
     * @param {?} e
     * @return {?}
     */
    keyPressed(e) {
        this.onPressed.emit(e);
        if (e.key === 'Enter') {
            this.search();
        }
        this.onChanged.emit(this.keyword);
    }
    /**
     * @return {?}
     */
    clear() {
        this.keyword = '';
        this.onChanged.emit(this.keyword);
    }
}
SearchInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'search-input',
                template: "<div class=\"search-input__container\">\n  <input [(ngModel)]=\"keyword\" (keyup)=\"keyPressed($event)\" [placeholder]=\"placeholder\" class=\"form-control form-control-sm search-input__text\">\n  <i (click)=\"search()\" class=\"fa fa-search search-input__icon\" style=\"left:0\"></i>\n  <i *ngIf=\"keyword.length\" (click)=\"clear()\" class=\"fa fa-times search-input__icon\" style=\"right:0\"></i>\n</div>\n",
                styles: [":host{display:block}.search-input__container{position:relative}.search-input__text{padding-left:30px;padding-right:30px}.search-input__icon{position:absolute;top:0;line-height:30px;width:30px;height:30px;text-align:center;color:#1c9dea;cursor:pointer}.search-input__icon:hover{color:#1c9dea}"]
            }] }
];
SearchInputComponent.propDecorators = {
    placeholder: [{ type: Input }],
    keyword: [{ type: Input }],
    onSearch: [{ type: Output }],
    onPressed: [{ type: Output }],
    onChanged: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    SearchInputComponent.prototype.placeholder;
    /** @type {?} */
    SearchInputComponent.prototype.keyword;
    /** @type {?} */
    SearchInputComponent.prototype.onSearch;
    /** @type {?} */
    SearchInputComponent.prototype.onPressed;
    /** @type {?} */
    SearchInputComponent.prototype.onChanged;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWlucHV0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtY2hhdC8iLCJzb3VyY2VzIjpbInNyYy9jb21wb25lbnQvc2VhcmNoLWlucHV0L3NlYXJjaC1pbnB1dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFPckUsTUFBTSxPQUFPLG9CQUFvQjtJQUxqQztRQU1XLGdCQUFXLEdBQVcsRUFBRSxDQUFDO1FBQ3pCLFlBQU8sR0FBVyxFQUFFLENBQUM7UUFDcEIsYUFBUSxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFDdEMsY0FBUyxHQUFHLElBQUksWUFBWSxFQUFpQixDQUFDO1FBQzlDLGNBQVMsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO0lBa0JuRCxDQUFDOzs7O0lBaEJDLE1BQU07UUFDSixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDbkMsQ0FBQzs7Ozs7SUFFRCxVQUFVLENBQUMsQ0FBZ0I7UUFDekIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLENBQUMsR0FBRyxLQUFLLE9BQU8sRUFBRTtZQUNyQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDZjtRQUNELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNwQyxDQUFDOzs7O0lBRUQsS0FBSztRQUNILElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNwQyxDQUFDOzs7WUEzQkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxjQUFjO2dCQUN4QixxYUFBNEM7O2FBRTdDOzs7MEJBRUUsS0FBSztzQkFDTCxLQUFLO3VCQUNMLE1BQU07d0JBQ04sTUFBTTt3QkFDTixNQUFNOzs7O0lBSlAsMkNBQWtDOztJQUNsQyx1Q0FBOEI7O0lBQzlCLHdDQUFnRDs7SUFDaEQseUNBQXdEOztJQUN4RCx5Q0FBaUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc2VhcmNoLWlucHV0JyxcbiAgdGVtcGxhdGVVcmw6ICcuL3NlYXJjaC1pbnB1dC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3NlYXJjaC1pbnB1dC5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgU2VhcmNoSW5wdXRDb21wb25lbnQge1xuICBASW5wdXQoKSBwbGFjZWhvbGRlcjogc3RyaW5nID0gJyc7XG4gIEBJbnB1dCgpIGtleXdvcmQ6IHN0cmluZyA9ICcnO1xuICBAT3V0cHV0KCkgb25TZWFyY2ggPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcbiAgQE91dHB1dCgpIG9uUHJlc3NlZCA9IG5ldyBFdmVudEVtaXR0ZXI8S2V5Ym9hcmRFdmVudD4oKTtcbiAgQE91dHB1dCgpIG9uQ2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG4gIHNlYXJjaCgpIHtcbiAgICB0aGlzLm9uU2VhcmNoLmVtaXQodGhpcy5rZXl3b3JkKTtcbiAgfVxuXG4gIGtleVByZXNzZWQoZTogS2V5Ym9hcmRFdmVudCkge1xuICAgIHRoaXMub25QcmVzc2VkLmVtaXQoZSk7XG4gICAgaWYgKGUua2V5ID09PSAnRW50ZXInKSB7XG4gICAgICB0aGlzLnNlYXJjaCgpO1xuICAgIH1cbiAgICB0aGlzLm9uQ2hhbmdlZC5lbWl0KHRoaXMua2V5d29yZCk7XG4gIH1cblxuICBjbGVhcigpIHtcbiAgICB0aGlzLmtleXdvcmQgPSAnJztcbiAgICB0aGlzLm9uQ2hhbmdlZC5lbWl0KHRoaXMua2V5d29yZCk7XG4gIH1cbn1cbiJdfQ==