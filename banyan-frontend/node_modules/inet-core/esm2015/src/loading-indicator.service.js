/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
export class LoadingIndicatorService {
    constructor() {
        // Create a singleton service
        this.elementId = 'loading-indicator';
        return LoadingIndicatorService.instance = LoadingIndicatorService.instance || this;
    }
    /**
     * @param {?} elementId
     * @return {?}
     */
    setElementId(elementId) {
        this.elementId = elementId;
    }
    /**
     * @return {?}
     */
    getElementId() {
        return this.elementId;
    }
    /**
     * Get DOM of loading indicator
     * @private
     * @return {?}
     */
    getIndicator() {
        if (LoadingIndicatorService.loadingIndicator && LoadingIndicatorService.loadingIndicator.container) {
            return LoadingIndicatorService.loadingIndicator;
        }
        // If Loading indicator not exist
        /** @type {?} */
        const container = (/** @type {?} */ (document.getElementById(this.getElementId())));
        /** @type {?} */
        let loadingElement;
        /** @type {?} */
        let message;
        if (container) {
            /** @type {?} */
            const elements = container.getElementsByTagName('span');
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
    }
    /**
     * @private
     * @return {?}
     */
    getLoadingIndicator() {
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            setTimeout((/**
             * @return {?}
             */
            () => resolve(this.getIndicator())));
        }));
    }
    /**
     * @param {?=} message
     * @return {?}
     */
    showLoading(message) {
        this.getLoadingIndicator().then((/**
         * @param {?} loadingIndicator
         * @return {?}
         */
        loadingIndicator => {
            if (loadingIndicator && loadingIndicator.container) {
                if (loadingIndicator.element) {
                    loadingIndicator.element.innerText = message || loadingIndicator.message || loadingIndicator.container.title;
                }
                loadingIndicator.container.style.display = 'block';
            }
        }));
    }
    /**
     * @return {?}
     */
    hideLoading() {
        this.getLoadingIndicator().then((/**
         * @param {?} loadingIndicator
         * @return {?}
         */
        loadingIndicator => {
            if (loadingIndicator && loadingIndicator.container) {
                loadingIndicator.container.style.display = 'none';
            }
        }));
    }
    /**
     * @return {?}
     */
    complete() {
        this.hideLoading();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.complete();
    }
}
LoadingIndicatorService.instance = null; // Create a singleton service
LoadingIndicatorService.loadingIndicator = null;
LoadingIndicatorService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
LoadingIndicatorService.ctorParameters = () => [];
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
export class LoadingIndicator {
    /**
     * @param {?} container
     * @param {?} el
     * @param {?=} msg
     */
    constructor(container, el, msg = '') {
        this.container = container;
        this.element = el;
        this.message = msg;
    }
}
if (false) {
    /** @type {?} */
    LoadingIndicator.prototype.container;
    /** @type {?} */
    LoadingIndicator.prototype.element;
    /** @type {?} */
    LoadingIndicator.prototype.message;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGluZy1pbmRpY2F0b3Iuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtY29yZS8iLCJzb3VyY2VzIjpbInNyYy9sb2FkaW5nLWluZGljYXRvci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFZLE1BQU0sZUFBZSxDQUFDO0FBRXBELE1BQU0sT0FBTyx1QkFBdUI7SUFLaEM7O1FBSEEsY0FBUyxHQUFZLG1CQUFtQixDQUFDO1FBSXJDLE9BQU8sdUJBQXVCLENBQUMsUUFBUSxHQUFHLHVCQUF1QixDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUM7SUFDdkYsQ0FBQzs7Ozs7SUFDRCxZQUFZLENBQUMsU0FBaUI7UUFDMUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7SUFDL0IsQ0FBQzs7OztJQUVELFlBQVk7UUFDUixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQzs7Ozs7O0lBS08sWUFBWTtRQUNoQixJQUFJLHVCQUF1QixDQUFDLGdCQUFnQixJQUFJLHVCQUF1QixDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRTtZQUNoRyxPQUFPLHVCQUF1QixDQUFDLGdCQUFnQixDQUFDO1NBQ25EOzs7Y0FFSyxTQUFTLEdBQUcsbUJBQUEsUUFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsRUFBZTs7WUFDekUsY0FBMkI7O1lBQzNCLE9BQWU7UUFDbkIsSUFBSSxTQUFTLEVBQUU7O2tCQUNMLFFBQVEsR0FBRyxTQUFTLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDO1lBQ3ZELElBQUksUUFBUSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUNqQyxjQUFjLEdBQUcsbUJBQUEsU0FBUyxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFlLENBQUM7Z0JBQzFFLElBQUksY0FBYyxJQUFJLGNBQWMsQ0FBQyxTQUFTLEVBQUU7b0JBQzVDLE9BQU8sR0FBRyxjQUFjLENBQUMsU0FBUyxDQUFDO2lCQUN0QzthQUNKO1NBQ0o7UUFDRCwwQkFBMEI7UUFDMUIsdUJBQXVCLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsY0FBYyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3BHLE9BQU8sdUJBQXVCLENBQUMsZ0JBQWdCLENBQUM7SUFDcEQsQ0FBQzs7Ozs7SUFFTyxtQkFBbUI7UUFDdkIsT0FBTyxJQUFJLE9BQU87Ozs7O1FBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDbkMsVUFBVTs7O1lBQUMsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxFQUFDLENBQUM7UUFDbkQsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7OztJQUVELFdBQVcsQ0FBQyxPQUFnQjtRQUN4QixJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxJQUFJOzs7O1FBQUMsZ0JBQWdCLENBQUMsRUFBRTtZQUMvQyxJQUFJLGdCQUFnQixJQUFJLGdCQUFnQixDQUFDLFNBQVMsRUFBRTtnQkFDaEQsSUFBSSxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUU7b0JBQzFCLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsT0FBTyxJQUFJLGdCQUFnQixDQUFDLE9BQU8sSUFBSSxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDO2lCQUNoSDtnQkFDRCxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7YUFDdEQ7UUFDTCxDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7Ozs7SUFFRCxXQUFXO1FBQ1AsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUMsSUFBSTs7OztRQUFDLGdCQUFnQixDQUFDLEVBQUU7WUFDL0MsSUFBRyxnQkFBZ0IsSUFBSSxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUU7Z0JBQy9DLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQzthQUNyRDtRQUNMLENBQUMsRUFBQyxDQUFDO0lBQ1AsQ0FBQzs7OztJQUVELFFBQVE7UUFDSixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdkIsQ0FBQzs7OztJQUVELFdBQVc7UUFDUCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDcEIsQ0FBQzs7QUF2RU0sZ0NBQVEsR0FBNEIsSUFBSSxDQUFDLENBQUUsNkJBQTZCO0FBRWhFLHdDQUFnQixHQUFxQixJQUFJLENBQUM7O1lBSjVELFVBQVU7Ozs7OztJQUVQLGlDQUFnRDs7Ozs7SUFFaEQseUNBQXlEOztJQUR6RCw0Q0FBeUM7O0FBeUU3QyxNQUFNLE9BQU8sZ0JBQWdCOzs7Ozs7SUFLekIsWUFBWSxTQUFzQixFQUFFLEVBQWUsRUFBRSxNQUFjLEVBQUU7UUFDakUsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDM0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFDbEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7SUFDdkIsQ0FBQztDQUNKOzs7SUFURyxxQ0FBdUI7O0lBQ3ZCLG1DQUFxQjs7SUFDckIsbUNBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlLCBPbkRlc3Ryb3l9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIExvYWRpbmdJbmRpY2F0b3JTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgICBzdGF0aWMgaW5zdGFuY2U6IExvYWRpbmdJbmRpY2F0b3JTZXJ2aWNlID0gbnVsbDsgIC8vIENyZWF0ZSBhIHNpbmdsZXRvbiBzZXJ2aWNlXG4gICAgZWxlbWVudElkOiBzdHJpbmcgPSAgJ2xvYWRpbmctaW5kaWNhdG9yJztcbiAgICBwcml2YXRlIHN0YXRpYyBsb2FkaW5nSW5kaWNhdG9yOiBMb2FkaW5nSW5kaWNhdG9yID0gbnVsbDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICByZXR1cm4gTG9hZGluZ0luZGljYXRvclNlcnZpY2UuaW5zdGFuY2UgPSBMb2FkaW5nSW5kaWNhdG9yU2VydmljZS5pbnN0YW5jZSB8fCB0aGlzO1xuICAgIH1cbiAgICBzZXRFbGVtZW50SWQoZWxlbWVudElkOiBzdHJpbmcpe1xuICAgICAgICB0aGlzLmVsZW1lbnRJZCA9IGVsZW1lbnRJZDtcbiAgICB9XG5cbiAgICBnZXRFbGVtZW50SWQgKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnRJZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgRE9NIG9mIGxvYWRpbmcgaW5kaWNhdG9yXG4gICAgICovXG4gICAgcHJpdmF0ZSBnZXRJbmRpY2F0b3IoKTogTG9hZGluZ0luZGljYXRvciB7XG4gICAgICAgIGlmIChMb2FkaW5nSW5kaWNhdG9yU2VydmljZS5sb2FkaW5nSW5kaWNhdG9yICYmIExvYWRpbmdJbmRpY2F0b3JTZXJ2aWNlLmxvYWRpbmdJbmRpY2F0b3IuY29udGFpbmVyKSB7XG4gICAgICAgICAgICByZXR1cm4gTG9hZGluZ0luZGljYXRvclNlcnZpY2UubG9hZGluZ0luZGljYXRvcjtcbiAgICAgICAgfVxuICAgICAgICAvLyBJZiBMb2FkaW5nIGluZGljYXRvciBub3QgZXhpc3RcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5nZXRFbGVtZW50SWQoKSkgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICAgIGxldCBsb2FkaW5nRWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gICAgICAgIGxldCBtZXNzYWdlOiBzdHJpbmc7XG4gICAgICAgIGlmIChjb250YWluZXIpIHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnRzID0gY29udGFpbmVyLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzcGFuJyk7XG4gICAgICAgICAgICBpZiAoZWxlbWVudHMgJiYgZWxlbWVudHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGxvYWRpbmdFbGVtZW50ID0gY29udGFpbmVyLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzcGFuJylbMF0gYXMgSFRNTEVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgaWYgKGxvYWRpbmdFbGVtZW50ICYmIGxvYWRpbmdFbGVtZW50LmlubmVyVGV4dCkge1xuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlID0gbG9hZGluZ0VsZW1lbnQuaW5uZXJUZXh0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBjYWNoZSBMb2FkaW5nIGluZGljYXRvclxuICAgICAgICBMb2FkaW5nSW5kaWNhdG9yU2VydmljZS5sb2FkaW5nSW5kaWNhdG9yID0gbmV3IExvYWRpbmdJbmRpY2F0b3IoY29udGFpbmVyLCBsb2FkaW5nRWxlbWVudCwgbWVzc2FnZSk7XG4gICAgICAgIHJldHVybiBMb2FkaW5nSW5kaWNhdG9yU2VydmljZS5sb2FkaW5nSW5kaWNhdG9yO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0TG9hZGluZ0luZGljYXRvcigpOiBQcm9taXNlPExvYWRpbmdJbmRpY2F0b3I+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gcmVzb2x2ZSh0aGlzLmdldEluZGljYXRvcigpKSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNob3dMb2FkaW5nKG1lc3NhZ2U/OiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5nZXRMb2FkaW5nSW5kaWNhdG9yKCkudGhlbihsb2FkaW5nSW5kaWNhdG9yID0+IHtcbiAgICAgICAgICAgIGlmIChsb2FkaW5nSW5kaWNhdG9yICYmIGxvYWRpbmdJbmRpY2F0b3IuY29udGFpbmVyKSB7XG4gICAgICAgICAgICAgICAgaWYgKGxvYWRpbmdJbmRpY2F0b3IuZWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICBsb2FkaW5nSW5kaWNhdG9yLmVsZW1lbnQuaW5uZXJUZXh0ID0gbWVzc2FnZSB8fCBsb2FkaW5nSW5kaWNhdG9yLm1lc3NhZ2UgfHwgbG9hZGluZ0luZGljYXRvci5jb250YWluZXIudGl0bGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxvYWRpbmdJbmRpY2F0b3IuY29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBoaWRlTG9hZGluZygpIHtcbiAgICAgICAgdGhpcy5nZXRMb2FkaW5nSW5kaWNhdG9yKCkudGhlbihsb2FkaW5nSW5kaWNhdG9yID0+IHtcbiAgICAgICAgICAgIGlmKGxvYWRpbmdJbmRpY2F0b3IgJiYgbG9hZGluZ0luZGljYXRvci5jb250YWluZXIpIHtcbiAgICAgICAgICAgICAgICBsb2FkaW5nSW5kaWNhdG9yLmNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjb21wbGV0ZSgpIHtcbiAgICAgICAgdGhpcy5oaWRlTG9hZGluZygpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLmNvbXBsZXRlKCk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgTG9hZGluZ0luZGljYXRvciB7XG4gICAgY29udGFpbmVyOiBIVE1MRWxlbWVudDtcbiAgICBlbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3Rvcihjb250YWluZXI6IEhUTUxFbGVtZW50LCBlbDogSFRNTEVsZW1lbnQsIG1zZzogc3RyaW5nID0gJycpIHtcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXI7XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IGVsO1xuICAgICAgICB0aGlzLm1lc3NhZ2UgPSBtc2c7XG4gICAgfVxufVxuIl19