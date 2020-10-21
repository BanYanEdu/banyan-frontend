/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, EventEmitter, ElementRef, Input, HostListener, Output } from '@angular/core';
import { FileUploader } from './file-uploader.class';
var FileSelectDirective = /** @class */ (function () {
    function FileSelectDirective(element) {
        this.onFileSelected = new EventEmitter();
        this.element = element;
    }
    /**
     * @return {?}
     */
    FileSelectDirective.prototype.getOptions = /**
     * @return {?}
     */
    function () {
        return this.uploader.options;
    };
    /**
     * @return {?}
     */
    FileSelectDirective.prototype.getFilters = /**
     * @return {?}
     */
    function () {
        return {};
    };
    /**
     * @return {?}
     */
    FileSelectDirective.prototype.isEmptyAfterSelection = /**
     * @return {?}
     */
    function () {
        return !!this.element.nativeElement.attributes.multiple;
    };
    /**
     * @return {?}
     */
    FileSelectDirective.prototype.onChange = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var files = this.element.nativeElement.files;
        /** @type {?} */
        var options = this.getOptions();
        /** @type {?} */
        var filters = this.getFilters();
        this.uploader.addToQueue(files, options, filters);
        this.onFileSelected.emit(files);
        if (this.isEmptyAfterSelection()) {
            this.element.nativeElement.value = '';
        }
    };
    FileSelectDirective.decorators = [
        { type: Directive, args: [{ selector: '[ng2FileSelect]' },] }
    ];
    /** @nocollapse */
    FileSelectDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    FileSelectDirective.propDecorators = {
        uploader: [{ type: Input }],
        onFileSelected: [{ type: Output }],
        onChange: [{ type: HostListener, args: ['change',] }]
    };
    return FileSelectDirective;
}());
export { FileSelectDirective };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1zZWxlY3QuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC11aS8iLCJzb3VyY2VzIjpbInNyYy9maWxlLXVwbG9hZC9maWxlLXNlbGVjdC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVqRyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFckQ7SUFPRSw2QkFBbUIsT0FBbUI7UUFKckIsbUJBQWMsR0FBeUIsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUtqRixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUN6QixDQUFDOzs7O0lBRU0sd0NBQVU7OztJQUFqQjtRQUNFLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUM7SUFDL0IsQ0FBQzs7OztJQUVNLHdDQUFVOzs7SUFBakI7UUFDRSxPQUFPLEVBQUUsQ0FBQztJQUNaLENBQUM7Ozs7SUFFTSxtREFBcUI7OztJQUE1QjtRQUNFLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUM7SUFDMUQsQ0FBQzs7OztJQUdNLHNDQUFROzs7SUFEZjs7WUFFTSxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsS0FBSzs7WUFDeEMsT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUU7O1lBQzNCLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFO1FBRS9CLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDbEQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFaEMsSUFBSSxJQUFJLENBQUMscUJBQXFCLEVBQUUsRUFBRTtZQUNoQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1NBQ3ZDO0lBQ0gsQ0FBQzs7Z0JBbkNGLFNBQVMsU0FBQyxFQUFFLFFBQVEsRUFBRSxpQkFBaUIsRUFBRTs7OztnQkFKUixVQUFVOzs7MkJBTXpDLEtBQUs7aUNBQ0wsTUFBTTsyQkFvQk4sWUFBWSxTQUFDLFFBQVE7O0lBYXhCLDBCQUFDO0NBQUEsQUFwQ0QsSUFvQ0M7U0FuQ1ksbUJBQW1COzs7SUFDOUIsdUNBQXVDOztJQUN2Qyw2Q0FBbUY7Ozs7O0lBRW5GLHNDQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBFbGVtZW50UmVmLCBJbnB1dCwgSG9zdExpc3RlbmVyLCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgRmlsZVVwbG9hZGVyIH0gZnJvbSAnLi9maWxlLXVwbG9hZGVyLmNsYXNzJztcblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW25nMkZpbGVTZWxlY3RdJyB9KVxuZXhwb3J0IGNsYXNzIEZpbGVTZWxlY3REaXJlY3RpdmUge1xuICBASW5wdXQoKSBwdWJsaWMgdXBsb2FkZXI6IEZpbGVVcGxvYWRlcjtcbiAgQE91dHB1dCgpIHB1YmxpYyBvbkZpbGVTZWxlY3RlZDogRXZlbnRFbWl0dGVyPEZpbGVbXT4gPSBuZXcgRXZlbnRFbWl0dGVyPEZpbGVbXT4oKTtcblxuICBwcm90ZWN0ZWQgZWxlbWVudDogRWxlbWVudFJlZjtcblxuICBwdWJsaWMgY29uc3RydWN0b3IoZWxlbWVudDogRWxlbWVudFJlZikge1xuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gIH1cblxuICBwdWJsaWMgZ2V0T3B0aW9ucygpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLnVwbG9hZGVyLm9wdGlvbnM7XG4gIH1cblxuICBwdWJsaWMgZ2V0RmlsdGVycygpOiBhbnkge1xuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIHB1YmxpYyBpc0VtcHR5QWZ0ZXJTZWxlY3Rpb24oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuYXR0cmlidXRlcy5tdWx0aXBsZTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2NoYW5nZScpXG4gIHB1YmxpYyBvbkNoYW5nZSgpOiBhbnkge1xuICAgIGxldCBmaWxlcyA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmZpbGVzO1xuICAgIGxldCBvcHRpb25zID0gdGhpcy5nZXRPcHRpb25zKCk7XG4gICAgbGV0IGZpbHRlcnMgPSB0aGlzLmdldEZpbHRlcnMoKTtcblxuICAgIHRoaXMudXBsb2FkZXIuYWRkVG9RdWV1ZShmaWxlcywgb3B0aW9ucywgZmlsdGVycyk7XG4gICAgdGhpcy5vbkZpbGVTZWxlY3RlZC5lbWl0KGZpbGVzKTtcblxuICAgIGlmICh0aGlzLmlzRW1wdHlBZnRlclNlbGVjdGlvbigpKSB7XG4gICAgICB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC52YWx1ZSA9ICcnO1xuICAgIH1cbiAgfVxufVxuIl19