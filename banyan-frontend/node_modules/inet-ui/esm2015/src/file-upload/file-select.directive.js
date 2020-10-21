/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, EventEmitter, ElementRef, Input, HostListener, Output } from '@angular/core';
import { FileUploader } from './file-uploader.class';
export class FileSelectDirective {
    /**
     * @param {?} element
     */
    constructor(element) {
        this.onFileSelected = new EventEmitter();
        this.element = element;
    }
    /**
     * @return {?}
     */
    getOptions() {
        return this.uploader.options;
    }
    /**
     * @return {?}
     */
    getFilters() {
        return {};
    }
    /**
     * @return {?}
     */
    isEmptyAfterSelection() {
        return !!this.element.nativeElement.attributes.multiple;
    }
    /**
     * @return {?}
     */
    onChange() {
        /** @type {?} */
        let files = this.element.nativeElement.files;
        /** @type {?} */
        let options = this.getOptions();
        /** @type {?} */
        let filters = this.getFilters();
        this.uploader.addToQueue(files, options, filters);
        this.onFileSelected.emit(files);
        if (this.isEmptyAfterSelection()) {
            this.element.nativeElement.value = '';
        }
    }
}
FileSelectDirective.decorators = [
    { type: Directive, args: [{ selector: '[ng2FileSelect]' },] }
];
/** @nocollapse */
FileSelectDirective.ctorParameters = () => [
    { type: ElementRef }
];
FileSelectDirective.propDecorators = {
    uploader: [{ type: Input }],
    onFileSelected: [{ type: Output }],
    onChange: [{ type: HostListener, args: ['change',] }]
};
if (false) {
    /** @type {?} */
    FileSelectDirective.prototype.uploader;
    /** @type {?} */
    FileSelectDirective.prototype.onFileSelected;
    /**
     * @type {?}
     * @protected
     */
    FileSelectDirective.prototype.element;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1zZWxlY3QuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC11aS8iLCJzb3VyY2VzIjpbInNyYy9maWxlLXVwbG9hZC9maWxlLXNlbGVjdC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVqRyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFHckQsTUFBTSxPQUFPLG1CQUFtQjs7OztJQU05QixZQUFtQixPQUFtQjtRQUpyQixtQkFBYyxHQUF5QixJQUFJLFlBQVksRUFBVSxDQUFDO1FBS2pGLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0lBQ3pCLENBQUM7Ozs7SUFFTSxVQUFVO1FBQ2YsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQztJQUMvQixDQUFDOzs7O0lBRU0sVUFBVTtRQUNmLE9BQU8sRUFBRSxDQUFDO0lBQ1osQ0FBQzs7OztJQUVNLHFCQUFxQjtRQUMxQixPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDO0lBQzFELENBQUM7Ozs7SUFHTSxRQUFROztZQUNULEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxLQUFLOztZQUN4QyxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRTs7WUFDM0IsT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUU7UUFFL0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNsRCxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVoQyxJQUFJLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxFQUFFO1lBQ2hDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7U0FDdkM7SUFDSCxDQUFDOzs7WUFuQ0YsU0FBUyxTQUFDLEVBQUUsUUFBUSxFQUFFLGlCQUFpQixFQUFFOzs7O1lBSlIsVUFBVTs7O3VCQU16QyxLQUFLOzZCQUNMLE1BQU07dUJBb0JOLFlBQVksU0FBQyxRQUFROzs7O0lBckJ0Qix1Q0FBdUM7O0lBQ3ZDLDZDQUFtRjs7Ozs7SUFFbkYsc0NBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFdmVudEVtaXR0ZXIsIEVsZW1lbnRSZWYsIElucHV0LCBIb3N0TGlzdGVuZXIsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBGaWxlVXBsb2FkZXIgfSBmcm9tICcuL2ZpbGUtdXBsb2FkZXIuY2xhc3MnO1xuXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbbmcyRmlsZVNlbGVjdF0nIH0pXG5leHBvcnQgY2xhc3MgRmlsZVNlbGVjdERpcmVjdGl2ZSB7XG4gIEBJbnB1dCgpIHB1YmxpYyB1cGxvYWRlcjogRmlsZVVwbG9hZGVyO1xuICBAT3V0cHV0KCkgcHVibGljIG9uRmlsZVNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8RmlsZVtdPiA9IG5ldyBFdmVudEVtaXR0ZXI8RmlsZVtdPigpO1xuXG4gIHByb3RlY3RlZCBlbGVtZW50OiBFbGVtZW50UmVmO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihlbGVtZW50OiBFbGVtZW50UmVmKSB7XG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcbiAgfVxuXG4gIHB1YmxpYyBnZXRPcHRpb25zKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMudXBsb2FkZXIub3B0aW9ucztcbiAgfVxuXG4gIHB1YmxpYyBnZXRGaWx0ZXJzKCk6IGFueSB7XG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgcHVibGljIGlzRW1wdHlBZnRlclNlbGVjdGlvbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISF0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5hdHRyaWJ1dGVzLm11bHRpcGxlO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignY2hhbmdlJylcbiAgcHVibGljIG9uQ2hhbmdlKCk6IGFueSB7XG4gICAgbGV0IGZpbGVzID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZmlsZXM7XG4gICAgbGV0IG9wdGlvbnMgPSB0aGlzLmdldE9wdGlvbnMoKTtcbiAgICBsZXQgZmlsdGVycyA9IHRoaXMuZ2V0RmlsdGVycygpO1xuXG4gICAgdGhpcy51cGxvYWRlci5hZGRUb1F1ZXVlKGZpbGVzLCBvcHRpb25zLCBmaWx0ZXJzKTtcbiAgICB0aGlzLm9uRmlsZVNlbGVjdGVkLmVtaXQoZmlsZXMpO1xuXG4gICAgaWYgKHRoaXMuaXNFbXB0eUFmdGVyU2VsZWN0aW9uKCkpIHtcbiAgICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnZhbHVlID0gJyc7XG4gICAgfVxuICB9XG59XG4iXX0=