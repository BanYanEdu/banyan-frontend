/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, EventEmitter, ElementRef, HostListener, Input, Output } from '@angular/core';
import { FileUploader } from './file-uploader.class';
var FileDropDirective = /** @class */ (function () {
    function FileDropDirective(element) {
        this.fileOver = new EventEmitter();
        this.onFileDrop = new EventEmitter();
        this.element = element;
    }
    /**
     * @return {?}
     */
    FileDropDirective.prototype.getOptions = /**
     * @return {?}
     */
    function () {
        return this.uploader.options;
    };
    /**
     * @return {?}
     */
    FileDropDirective.prototype.getFilters = /**
     * @return {?}
     */
    function () {
        return {};
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FileDropDirective.prototype.onDrop = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var transfer = this._getTransfer(event);
        if (!transfer) {
            return;
        }
        /** @type {?} */
        var options = this.getOptions();
        /** @type {?} */
        var filters = this.getFilters();
        this._preventAndStop(event);
        this.uploader.addToQueue(transfer.files, options, filters);
        this.fileOver.emit(false);
        this.onFileDrop.emit(transfer.files);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FileDropDirective.prototype.onDragOver = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var transfer = this._getTransfer(event);
        if (!this._haveFiles(transfer.types)) {
            return;
        }
        transfer.dropEffect = 'copy';
        this._preventAndStop(event);
        this.fileOver.emit(true);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FileDropDirective.prototype.onDragLeave = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (((/** @type {?} */ (this))).element) {
            if (event.currentTarget === ((/** @type {?} */ (this))).element[0]) {
                return;
            }
        }
        this._preventAndStop(event);
        this.fileOver.emit(false);
    };
    /**
     * @protected
     * @param {?} event
     * @return {?}
     */
    FileDropDirective.prototype._getTransfer = /**
     * @protected
     * @param {?} event
     * @return {?}
     */
    function (event) {
        return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer; // jQuery fix;
    };
    /**
     * @protected
     * @param {?} event
     * @return {?}
     */
    FileDropDirective.prototype._preventAndStop = /**
     * @protected
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.preventDefault();
        event.stopPropagation();
    };
    /**
     * @protected
     * @param {?} types
     * @return {?}
     */
    FileDropDirective.prototype._haveFiles = /**
     * @protected
     * @param {?} types
     * @return {?}
     */
    function (types) {
        if (!types) {
            return false;
        }
        if (types.indexOf) {
            return types.indexOf('Files') !== -1;
        }
        else if (types.contains) {
            return types.contains('Files');
        }
        else {
            return false;
        }
    };
    FileDropDirective.decorators = [
        { type: Directive, args: [{ selector: '[ng2FileDrop]' },] }
    ];
    /** @nocollapse */
    FileDropDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    FileDropDirective.propDecorators = {
        uploader: [{ type: Input }],
        fileOver: [{ type: Output }],
        onFileDrop: [{ type: Output }],
        onDrop: [{ type: HostListener, args: ['drop', ['$event'],] }],
        onDragOver: [{ type: HostListener, args: ['dragover', ['$event'],] }],
        onDragLeave: [{ type: HostListener, args: ['dragleave', ['$event'],] }]
    };
    return FileDropDirective;
}());
export { FileDropDirective };
if (false) {
    /** @type {?} */
    FileDropDirective.prototype.uploader;
    /** @type {?} */
    FileDropDirective.prototype.fileOver;
    /** @type {?} */
    FileDropDirective.prototype.onFileDrop;
    /**
     * @type {?}
     * @protected
     */
    FileDropDirective.prototype.element;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1kcm9wLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtdWkvIiwic291cmNlcyI6WyJzcmMvZmlsZS11cGxvYWQvZmlsZS1kcm9wLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRWpHLE9BQU8sRUFBRSxZQUFZLEVBQXVCLE1BQU0sdUJBQXVCLENBQUM7QUFFMUU7SUFRRSwyQkFBbUIsT0FBbUI7UUFMckIsYUFBUSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2pELGVBQVUsR0FBeUIsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUs3RSxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUN6QixDQUFDOzs7O0lBRU0sc0NBQVU7OztJQUFqQjtRQUNFLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUM7SUFDL0IsQ0FBQzs7OztJQUVNLHNDQUFVOzs7SUFBakI7UUFDRSxPQUFPLEVBQUUsQ0FBQztJQUNaLENBQUM7Ozs7O0lBR00sa0NBQU07Ozs7SUFEYixVQUNjLEtBQVU7O1lBQ2xCLFFBQVEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQztRQUN2QyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2IsT0FBTztTQUNSOztZQUVHLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFOztZQUMzQixPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRTtRQUMvQixJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzVCLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzNELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzFCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN2QyxDQUFDOzs7OztJQUdNLHNDQUFVOzs7O0lBRGpCLFVBQ2tCLEtBQVU7O1lBQ3RCLFFBQVEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQztRQUN2QyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDcEMsT0FBTztTQUNSO1FBRUQsUUFBUSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUM7UUFDN0IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM1QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMzQixDQUFDOzs7OztJQUdNLHVDQUFXOzs7O0lBRGxCLFVBQ21CLEtBQVU7UUFDM0IsSUFBSSxDQUFDLG1CQUFBLElBQUksRUFBTyxDQUFDLENBQUMsT0FBTyxFQUFFO1lBQ3pCLElBQUksS0FBSyxDQUFDLGFBQWEsS0FBSyxDQUFDLG1CQUFBLElBQUksRUFBTyxDQUFDLENBQUMsT0FBTyxDQUFFLENBQUMsQ0FBRSxFQUFFO2dCQUN0RCxPQUFPO2FBQ1I7U0FDRjtRQUVELElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUIsQ0FBQzs7Ozs7O0lBRVMsd0NBQVk7Ozs7O0lBQXRCLFVBQXVCLEtBQVU7UUFDL0IsT0FBTyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxDQUFDLGNBQWM7SUFDbkcsQ0FBQzs7Ozs7O0lBRVMsMkNBQWU7Ozs7O0lBQXpCLFVBQTBCLEtBQVU7UUFDbEMsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3ZCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUMxQixDQUFDOzs7Ozs7SUFFUyxzQ0FBVTs7Ozs7SUFBcEIsVUFBcUIsS0FBVTtRQUM3QixJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1YsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUVELElBQUksS0FBSyxDQUFDLE9BQU8sRUFBRTtZQUNqQixPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FDdEM7YUFBTSxJQUFJLEtBQUssQ0FBQyxRQUFRLEVBQUU7WUFDekIsT0FBTyxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ2hDO2FBQU07WUFDTCxPQUFPLEtBQUssQ0FBQztTQUNkO0lBQ0gsQ0FBQzs7Z0JBaEZGLFNBQVMsU0FBQyxFQUFFLFFBQVEsRUFBRSxlQUFlLEVBQUU7Ozs7Z0JBSk4sVUFBVTs7OzJCQU16QyxLQUFLOzJCQUNMLE1BQU07NkJBQ04sTUFBTTt5QkFnQk4sWUFBWSxTQUFDLE1BQU0sRUFBRSxDQUFFLFFBQVEsQ0FBRTs2QkFlakMsWUFBWSxTQUFDLFVBQVUsRUFBRSxDQUFFLFFBQVEsQ0FBRTs4QkFZckMsWUFBWSxTQUFDLFdBQVcsRUFBRSxDQUFFLFFBQVEsQ0FBRTs7SUFrQ3pDLHdCQUFDO0NBQUEsQUFqRkQsSUFpRkM7U0FoRlksaUJBQWlCOzs7SUFDNUIscUNBQXVDOztJQUN2QyxxQ0FBa0U7O0lBQ2xFLHVDQUErRTs7Ozs7SUFFL0Usb0NBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFdmVudEVtaXR0ZXIsIEVsZW1lbnRSZWYsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBGaWxlVXBsb2FkZXIsIEZpbGVVcGxvYWRlck9wdGlvbnMgfSBmcm9tICcuL2ZpbGUtdXBsb2FkZXIuY2xhc3MnO1xuXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbbmcyRmlsZURyb3BdJyB9KVxuZXhwb3J0IGNsYXNzIEZpbGVEcm9wRGlyZWN0aXZlIHtcbiAgQElucHV0KCkgcHVibGljIHVwbG9hZGVyOiBGaWxlVXBsb2FkZXI7XG4gIEBPdXRwdXQoKSBwdWJsaWMgZmlsZU92ZXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgcHVibGljIG9uRmlsZURyb3A6IEV2ZW50RW1pdHRlcjxGaWxlW10+ID0gbmV3IEV2ZW50RW1pdHRlcjxGaWxlW10+KCk7XG5cbiAgcHJvdGVjdGVkIGVsZW1lbnQ6IEVsZW1lbnRSZWY7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKGVsZW1lbnQ6IEVsZW1lbnRSZWYpIHtcbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICB9XG5cbiAgcHVibGljIGdldE9wdGlvbnMoKTogRmlsZVVwbG9hZGVyT3B0aW9ucyB7XG4gICAgcmV0dXJuIHRoaXMudXBsb2FkZXIub3B0aW9ucztcbiAgfVxuXG4gIHB1YmxpYyBnZXRGaWx0ZXJzKCk6IGFueSB7XG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZHJvcCcsIFsgJyRldmVudCcgXSlcbiAgcHVibGljIG9uRHJvcChldmVudDogYW55KTogdm9pZCB7XG4gICAgbGV0IHRyYW5zZmVyID0gdGhpcy5fZ2V0VHJhbnNmZXIoZXZlbnQpO1xuICAgIGlmICghdHJhbnNmZXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgb3B0aW9ucyA9IHRoaXMuZ2V0T3B0aW9ucygpO1xuICAgIGxldCBmaWx0ZXJzID0gdGhpcy5nZXRGaWx0ZXJzKCk7XG4gICAgdGhpcy5fcHJldmVudEFuZFN0b3AoZXZlbnQpO1xuICAgIHRoaXMudXBsb2FkZXIuYWRkVG9RdWV1ZSh0cmFuc2Zlci5maWxlcywgb3B0aW9ucywgZmlsdGVycyk7XG4gICAgdGhpcy5maWxlT3Zlci5lbWl0KGZhbHNlKTtcbiAgICB0aGlzLm9uRmlsZURyb3AuZW1pdCh0cmFuc2Zlci5maWxlcyk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkcmFnb3ZlcicsIFsgJyRldmVudCcgXSlcbiAgcHVibGljIG9uRHJhZ092ZXIoZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgIGxldCB0cmFuc2ZlciA9IHRoaXMuX2dldFRyYW5zZmVyKGV2ZW50KTtcbiAgICBpZiAoIXRoaXMuX2hhdmVGaWxlcyh0cmFuc2Zlci50eXBlcykpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0cmFuc2Zlci5kcm9wRWZmZWN0ID0gJ2NvcHknO1xuICAgIHRoaXMuX3ByZXZlbnRBbmRTdG9wKGV2ZW50KTtcbiAgICB0aGlzLmZpbGVPdmVyLmVtaXQodHJ1ZSk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkcmFnbGVhdmUnLCBbICckZXZlbnQnIF0pXG4gIHB1YmxpYyBvbkRyYWdMZWF2ZShldmVudDogYW55KTogYW55IHtcbiAgICBpZiAoKHRoaXMgYXMgYW55KS5lbGVtZW50KSB7XG4gICAgICBpZiAoZXZlbnQuY3VycmVudFRhcmdldCA9PT0gKHRoaXMgYXMgYW55KS5lbGVtZW50WyAwIF0pIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuX3ByZXZlbnRBbmRTdG9wKGV2ZW50KTtcbiAgICB0aGlzLmZpbGVPdmVyLmVtaXQoZmFsc2UpO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9nZXRUcmFuc2ZlcihldmVudDogYW55KTogYW55IHtcbiAgICByZXR1cm4gZXZlbnQuZGF0YVRyYW5zZmVyID8gZXZlbnQuZGF0YVRyYW5zZmVyIDogZXZlbnQub3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXI7IC8vIGpRdWVyeSBmaXg7XG4gIH1cblxuICBwcm90ZWN0ZWQgX3ByZXZlbnRBbmRTdG9wKGV2ZW50OiBhbnkpOiBhbnkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX2hhdmVGaWxlcyh0eXBlczogYW55KTogYW55IHtcbiAgICBpZiAoIXR5cGVzKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVzLmluZGV4T2YpIHtcbiAgICAgIHJldHVybiB0eXBlcy5pbmRleE9mKCdGaWxlcycpICE9PSAtMTtcbiAgICB9IGVsc2UgaWYgKHR5cGVzLmNvbnRhaW5zKSB7XG4gICAgICByZXR1cm4gdHlwZXMuY29udGFpbnMoJ0ZpbGVzJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==