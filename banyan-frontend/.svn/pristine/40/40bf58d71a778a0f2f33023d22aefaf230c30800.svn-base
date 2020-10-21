/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
var LoadingIndicatorService = /** @class */ (function () {
    function LoadingIndicatorService() {
        // Create a singleton service
        this.elementId = 'loading-indicator';
        return LoadingIndicatorService.instance = LoadingIndicatorService.instance || this;
    }
    /**
     * @param {?} elementId
     * @return {?}
     */
    LoadingIndicatorService.prototype.setElementId = /**
     * @param {?} elementId
     * @return {?}
     */
    function (elementId) {
        this.elementId = elementId;
    };
    /**
     * @return {?}
     */
    LoadingIndicatorService.prototype.getElementId = /**
     * @return {?}
     */
    function () {
        return this.elementId;
    };
    /**
     * Get DOM of loading indicator
     */
    /**
     * Get DOM of loading indicator
     * @private
     * @return {?}
     */
    LoadingIndicatorService.prototype.getIndicator = /**
     * Get DOM of loading indicator
     * @private
     * @return {?}
     */
    function () {
        if (LoadingIndicatorService.loadingIndicator && LoadingIndicatorService.loadingIndicator.container) {
            return LoadingIndicatorService.loadingIndicator;
        }
        // If Loading indicator not exist
        /** @type {?} */
        var container = (/** @type {?} */ (document.getElementById(this.getElementId())));
        /** @type {?} */
        var loadingElement;
        /** @type {?} */
        var message;
        if (container) {
            /** @type {?} */
            var elements = container.getElementsByTagName('span');
            if (elements && elements.length > 0) {
                loadingElement = (/** @type {?} */ (container.getElementsByTagName('span')[0]));
                if (loadingElement && loadingElement.innerText) {
                    message = loadingElement.innerText;
                }
            }
        }
        // cache Loading indicator
        LoadingIndicatorService.loadingIndicator = new LoadingIndicator(container, loadingElement, message);
        return LoadingIndicatorService.loadingIndicator;
    };
    /**
     * @private
     * @return {?}
     */
    LoadingIndicatorService.prototype.getLoadingIndicator = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            setTimeout((/**
             * @return {?}
             */
            function () { return resolve(_this.getIndicator()); }));
        }));
    };
    /**
     * @param {?=} message
     * @return {?}
     */
    LoadingIndicatorService.prototype.showLoading = /**
     * @param {?=} message
     * @return {?}
     */
    function (message) {
        this.getLoadingIndicator().then((/**
         * @param {?} loadingIndicator
         * @return {?}
         */
        function (loadingIndicator) {
            if (loadingIndicator && loadingIndicator.container) {
                if (loadingIndicator.element) {
                    loadingIndicator.element.innerText = message || loadingIndicator.message || loadingIndicator.container.title;
                }
                loadingIndicator.container.style.display = 'block';
            }
        }));
    };
    /**
     * @return {?}
     */
    LoadingIndicatorService.prototype.hideLoading = /**
     * @return {?}
     */
    function () {
        this.getLoadingIndicator().then((/**
         * @param {?} loadingIndicator
         * @return {?}
         */
        function (loadingIndicator) {
            if (loadingIndicator && loadingIndicator.container) {
                loadingIndicator.container.style.display = 'none';
            }
        }));
    };
    /**
     * @return {?}
     */
    LoadingIndicatorService.prototype.complete = /**
     * @return {?}
     */
    function () {
        this.hideLoading();
    };
    /**
     * @return {?}
     */
    LoadingIndicatorService.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.complete();
    };
    LoadingIndicatorService.instance = null; // Create a singleton service
    LoadingIndicatorService.loadingIndicator = null;
    LoadingIndicatorService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    LoadingIndicatorService.ctorParameters = function () { return []; };
    return LoadingIndicatorService;
}());
export { LoadingIndicatorService };
if (false) {
    /** @type {?} */
    LoadingIndicatorService.instance;
    /**
     * @type {?}
     * @private
     */
    LoadingIndicatorService.loadingIndicator;
    /** @type {?} */
    LoadingIndicatorService.prototype.elementId;
}
var LoadingIndicator = /** @class */ (function () {
    function LoadingIndicator(container, el, msg) {
        if (msg === void 0) { msg = ''; }
        this.container = container;
        this.element = el;
        this.message = msg;
    }
    return LoadingIndicator;
}());
export { LoadingIndicator };
if (false) {
    /** @type {?} */
    LoadingIndicator.prototype.container;
    /** @type {?} */
    LoadingIndicator.prototype.element;
    /** @type {?} */
    LoadingIndicator.prototype.message;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGluZy1pbmRpY2F0b3Iuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtY29yZS8iLCJzb3VyY2VzIjpbInNyYy9sb2FkaW5nLWluZGljYXRvci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFZLE1BQU0sZUFBZSxDQUFDO0FBQ3BEO0lBTUk7O1FBSEEsY0FBUyxHQUFZLG1CQUFtQixDQUFDO1FBSXJDLE9BQU8sdUJBQXVCLENBQUMsUUFBUSxHQUFHLHVCQUF1QixDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUM7SUFDdkYsQ0FBQzs7Ozs7SUFDRCw4Q0FBWTs7OztJQUFaLFVBQWEsU0FBaUI7UUFDMUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7SUFDL0IsQ0FBQzs7OztJQUVELDhDQUFZOzs7SUFBWjtRQUNJLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBRUQ7O09BRUc7Ozs7OztJQUNLLDhDQUFZOzs7OztJQUFwQjtRQUNJLElBQUksdUJBQXVCLENBQUMsZ0JBQWdCLElBQUksdUJBQXVCLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFO1lBQ2hHLE9BQU8sdUJBQXVCLENBQUMsZ0JBQWdCLENBQUM7U0FDbkQ7OztZQUVLLFNBQVMsR0FBRyxtQkFBQSxRQUFRLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxFQUFlOztZQUN6RSxjQUEyQjs7WUFDM0IsT0FBZTtRQUNuQixJQUFJLFNBQVMsRUFBRTs7Z0JBQ0wsUUFBUSxHQUFHLFNBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUM7WUFDdkQsSUFBSSxRQUFRLElBQUksUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQ2pDLGNBQWMsR0FBRyxtQkFBQSxTQUFTLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQWUsQ0FBQztnQkFDMUUsSUFBSSxjQUFjLElBQUksY0FBYyxDQUFDLFNBQVMsRUFBRTtvQkFDNUMsT0FBTyxHQUFHLGNBQWMsQ0FBQyxTQUFTLENBQUM7aUJBQ3RDO2FBQ0o7U0FDSjtRQUNELDBCQUEwQjtRQUMxQix1QkFBdUIsQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxjQUFjLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDcEcsT0FBTyx1QkFBdUIsQ0FBQyxnQkFBZ0IsQ0FBQztJQUNwRCxDQUFDOzs7OztJQUVPLHFEQUFtQjs7OztJQUEzQjtRQUFBLGlCQUlDO1FBSEcsT0FBTyxJQUFJLE9BQU87Ozs7O1FBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUMvQixVQUFVOzs7WUFBQyxjQUFNLE9BQUEsT0FBTyxDQUFDLEtBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxFQUE1QixDQUE0QixFQUFDLENBQUM7UUFDbkQsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7OztJQUVELDZDQUFXOzs7O0lBQVgsVUFBWSxPQUFnQjtRQUN4QixJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxJQUFJOzs7O1FBQUMsVUFBQSxnQkFBZ0I7WUFDNUMsSUFBSSxnQkFBZ0IsSUFBSSxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUU7Z0JBQ2hELElBQUksZ0JBQWdCLENBQUMsT0FBTyxFQUFFO29CQUMxQixnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLE9BQU8sSUFBSSxnQkFBZ0IsQ0FBQyxPQUFPLElBQUksZ0JBQWdCLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQztpQkFDaEg7Z0JBQ0QsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO2FBQ3REO1FBQ0wsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7O0lBRUQsNkNBQVc7OztJQUFYO1FBQ0ksSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUMsSUFBSTs7OztRQUFDLFVBQUEsZ0JBQWdCO1lBQzVDLElBQUcsZ0JBQWdCLElBQUksZ0JBQWdCLENBQUMsU0FBUyxFQUFFO2dCQUMvQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7YUFDckQ7UUFDTCxDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7Ozs7SUFFRCwwQ0FBUTs7O0lBQVI7UUFDSSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdkIsQ0FBQzs7OztJQUVELDZDQUFXOzs7SUFBWDtRQUNJLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBdkVNLGdDQUFRLEdBQTRCLElBQUksQ0FBQyxDQUFFLDZCQUE2QjtJQUVoRSx3Q0FBZ0IsR0FBcUIsSUFBSSxDQUFDOztnQkFKNUQsVUFBVTs7OztJQTBFWCw4QkFBQztDQUFBLEFBMUVELElBMEVDO1NBekVZLHVCQUF1Qjs7O0lBQ2hDLGlDQUFnRDs7Ozs7SUFFaEQseUNBQXlEOztJQUR6RCw0Q0FBeUM7O0FBeUU3QztJQUtJLDBCQUFZLFNBQXNCLEVBQUUsRUFBZSxFQUFFLEdBQWdCO1FBQWhCLG9CQUFBLEVBQUEsUUFBZ0I7UUFDakUsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDM0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFDbEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7SUFDdkIsQ0FBQztJQUNMLHVCQUFDO0FBQUQsQ0FBQyxBQVZELElBVUM7Ozs7SUFURyxxQ0FBdUI7O0lBQ3ZCLG1DQUFxQjs7SUFDckIsbUNBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlLCBPbkRlc3Ryb3l9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIExvYWRpbmdJbmRpY2F0b3JTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgICBzdGF0aWMgaW5zdGFuY2U6IExvYWRpbmdJbmRpY2F0b3JTZXJ2aWNlID0gbnVsbDsgIC8vIENyZWF0ZSBhIHNpbmdsZXRvbiBzZXJ2aWNlXG4gICAgZWxlbWVudElkOiBzdHJpbmcgPSAgJ2xvYWRpbmctaW5kaWNhdG9yJztcbiAgICBwcml2YXRlIHN0YXRpYyBsb2FkaW5nSW5kaWNhdG9yOiBMb2FkaW5nSW5kaWNhdG9yID0gbnVsbDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICByZXR1cm4gTG9hZGluZ0luZGljYXRvclNlcnZpY2UuaW5zdGFuY2UgPSBMb2FkaW5nSW5kaWNhdG9yU2VydmljZS5pbnN0YW5jZSB8fCB0aGlzO1xuICAgIH1cbiAgICBzZXRFbGVtZW50SWQoZWxlbWVudElkOiBzdHJpbmcpe1xuICAgICAgICB0aGlzLmVsZW1lbnRJZCA9IGVsZW1lbnRJZDtcbiAgICB9XG5cbiAgICBnZXRFbGVtZW50SWQgKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnRJZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgRE9NIG9mIGxvYWRpbmcgaW5kaWNhdG9yXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRJbmRpY2F0b3IoKTogTG9hZGluZ0luZGljYXRvciB7XG4gICAgICAgIGlmIChMb2FkaW5nSW5kaWNhdG9yU2VydmljZS5sb2FkaW5nSW5kaWNhdG9yICYmIExvYWRpbmdJbmRpY2F0b3JTZXJ2aWNlLmxvYWRpbmdJbmRpY2F0b3IuY29udGFpbmVyKSB7XG4gICAgICAgICAgICByZXR1cm4gTG9hZGluZ0luZGljYXRvclNlcnZpY2UubG9hZGluZ0luZGljYXRvcjtcbiAgICAgICAgfVxuICAgICAgICAvLyBJZiBMb2FkaW5nIGluZGljYXRvciBub3QgZXhpc3RcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5nZXRFbGVtZW50SWQoKSkgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICAgIGxldCBsb2FkaW5nRWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gICAgICAgIGxldCBtZXNzYWdlOiBzdHJpbmc7XG4gICAgICAgIGlmIChjb250YWluZXIpIHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnRzID0gY29udGFpbmVyLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzcGFuJyk7XG4gICAgICAgICAgICBpZiAoZWxlbWVudHMgJiYgZWxlbWVudHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGxvYWRpbmdFbGVtZW50ID0gY29udGFpbmVyLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzcGFuJylbMF0gYXMgSFRNTEVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgaWYgKGxvYWRpbmdFbGVtZW50ICYmIGxvYWRpbmdFbGVtZW50LmlubmVyVGV4dCkge1xuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlID0gbG9hZGluZ0VsZW1lbnQuaW5uZXJUZXh0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBjYWNoZSBMb2FkaW5nIGluZGljYXRvclxuICAgICAgICBMb2FkaW5nSW5kaWNhdG9yU2VydmljZS5sb2FkaW5nSW5kaWNhdG9yID0gbmV3IExvYWRpbmdJbmRpY2F0b3IoY29udGFpbmVyLCBsb2FkaW5nRWxlbWVudCwgbWVzc2FnZSk7XG4gICAgICAgIHJldHVybiBMb2FkaW5nSW5kaWNhdG9yU2VydmljZS5sb2FkaW5nSW5kaWNhdG9yO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0TG9hZGluZ0luZGljYXRvcigpOiBQcm9taXNlPExvYWRpbmdJbmRpY2F0b3I+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gcmVzb2x2ZSh0aGlzLmdldEluZGljYXRvcigpKSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNob3dMb2FkaW5nKG1lc3NhZ2U/OiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5nZXRMb2FkaW5nSW5kaWNhdG9yKCkudGhlbihsb2FkaW5nSW5kaWNhdG9yID0+IHtcbiAgICAgICAgICAgIGlmIChsb2FkaW5nSW5kaWNhdG9yICYmIGxvYWRpbmdJbmRpY2F0b3IuY29udGFpbmVyKSB7XG4gICAgICAgICAgICAgICAgaWYgKGxvYWRpbmdJbmRpY2F0b3IuZWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICBsb2FkaW5nSW5kaWNhdG9yLmVsZW1lbnQuaW5uZXJUZXh0ID0gbWVzc2FnZSB8fCBsb2FkaW5nSW5kaWNhdG9yLm1lc3NhZ2UgfHwgbG9hZGluZ0luZGljYXRvci5jb250YWluZXIudGl0bGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxvYWRpbmdJbmRpY2F0b3IuY29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBoaWRlTG9hZGluZygpIHtcbiAgICAgICAgdGhpcy5nZXRMb2FkaW5nSW5kaWNhdG9yKCkudGhlbihsb2FkaW5nSW5kaWNhdG9yID0+IHtcbiAgICAgICAgICAgIGlmKGxvYWRpbmdJbmRpY2F0b3IgJiYgbG9hZGluZ0luZGljYXRvci5jb250YWluZXIpIHtcbiAgICAgICAgICAgICAgICBsb2FkaW5nSW5kaWNhdG9yLmNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjb21wbGV0ZSgpIHtcbiAgICAgICAgdGhpcy5oaWRlTG9hZGluZygpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLmNvbXBsZXRlKCk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgTG9hZGluZ0luZGljYXRvciB7XG4gICAgY29udGFpbmVyOiBIVE1MRWxlbWVudDtcbiAgICBlbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3Rvcihjb250YWluZXI6IEhUTUxFbGVtZW50LCBlbDogSFRNTEVsZW1lbnQsIG1zZzogc3RyaW5nID0gJycpIHtcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXI7XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IGVsO1xuICAgICAgICB0aGlzLm1lc3NhZ2UgPSBtc2c7XG4gICAgfVxufVxuIl19