/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Inject, Injectable, Injector, NgZone, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Overlay } from '../overlay/overlay';
import { ComponentPortal } from '../portal/portal';
import { ToastInjector, ToastRef } from './toast-injector';
import { TOAST_CONFIG } from './toast-token';
import { ToastPackage, } from './toastr-config';
/**
 * @record
 * @template C
 */
export function ActiveToast() { }
if (false) {
    /**
     * Your Toast ID. Use this to close it individually
     * @type {?}
     */
    ActiveToast.prototype.toastId;
    /**
     * the message of your toast. Stored to prevent duplicates
     * @type {?}
     */
    ActiveToast.prototype.message;
    /**
     * a reference to the component see portal.ts
     * @type {?}
     */
    ActiveToast.prototype.portal;
    /**
     * a reference to your toast
     * @type {?}
     */
    ActiveToast.prototype.toastRef;
    /**
     * triggered when toast is active
     * @type {?}
     */
    ActiveToast.prototype.onShown;
    /**
     * triggered when toast is destroyed
     * @type {?}
     */
    ActiveToast.prototype.onHidden;
    /**
     * triggered on toast click
     * @type {?}
     */
    ActiveToast.prototype.onTap;
    /**
     * available for your use in custom toast
     * @type {?}
     */
    ActiveToast.prototype.onAction;
}
export class ToastrService {
    /**
     * @param {?} token
     * @param {?} overlay
     * @param {?} _injector
     * @param {?} sanitizer
     * @param {?} ngZone
     */
    constructor(token, overlay, _injector, sanitizer, ngZone) {
        this.overlay = overlay;
        this._injector = _injector;
        this.sanitizer = sanitizer;
        this.ngZone = ngZone;
        this.currentlyActive = 0;
        this.toasts = [];
        this.index = 0;
        /** @type {?} */
        const defaultConfig = new token.defaults;
        this.toastrConfig = Object.assign({}, defaultConfig, token.config);
        this.toastrConfig.iconClasses = Object.assign({}, defaultConfig.iconClasses, token.config.iconClasses);
    }
    /**
     * show toast
     * @param {?=} message
     * @param {?=} title
     * @param {?=} override
     * @param {?=} type
     * @return {?}
     */
    show(message, title, override = {}, type = '') {
        return this._preBuildNotification(type, message, title, this.applyConfig(override));
    }
    /**
     * show successful toast
     * @param {?=} message
     * @param {?=} title
     * @param {?=} override
     * @return {?}
     */
    success(message, title, override = {}) {
        /** @type {?} */
        const type = this.toastrConfig.iconClasses.success || '';
        return this._preBuildNotification(type, message, title, this.applyConfig(override));
    }
    /**
     * show error toast
     * @param {?=} message
     * @param {?=} title
     * @param {?=} override
     * @return {?}
     */
    error(message, title, override = {}) {
        /** @type {?} */
        const type = this.toastrConfig.iconClasses.error || '';
        return this._preBuildNotification(type, message, title, this.applyConfig(override));
    }
    /**
     * show info toast
     * @param {?=} message
     * @param {?=} title
     * @param {?=} override
     * @return {?}
     */
    info(message, title, override = {}) {
        /** @type {?} */
        const type = this.toastrConfig.iconClasses.info || '';
        return this._preBuildNotification(type, message, title, this.applyConfig(override));
    }
    /**
     * show warning toast
     * @param {?=} message
     * @param {?=} title
     * @param {?=} override
     * @return {?}
     */
    warning(message, title, override = {}) {
        /** @type {?} */
        const type = this.toastrConfig.iconClasses.warning || '';
        return this._preBuildNotification(type, message, title, this.applyConfig(override));
    }
    /**
     * Remove all or a single toast by id
     * @param {?=} toastId
     * @return {?}
     */
    clear(toastId) {
        // Call every toastRef manualClose function
        for (const toast of this.toasts) {
            if (toastId !== undefined) {
                if (toast.toastId === toastId) {
                    toast.toastRef.manualClose();
                    return;
                }
            }
            else {
                toast.toastRef.manualClose();
            }
        }
    }
    /**
     * Remove and destroy a single toast by id
     * @param {?} toastId
     * @return {?}
     */
    remove(toastId) {
        /** @type {?} */
        const found = this._findToast(toastId);
        if (!found) {
            return false;
        }
        found.activeToast.toastRef.close();
        this.toasts.splice(found.index, 1);
        this.currentlyActive = this.currentlyActive - 1;
        if (!this.toastrConfig.maxOpened || !this.toasts.length) {
            return false;
        }
        if (this.currentlyActive < this.toastrConfig.maxOpened && this.toasts[this.currentlyActive]) {
            /** @type {?} */
            const p = this.toasts[this.currentlyActive].toastRef;
            if (!p.isInactive()) {
                this.currentlyActive = this.currentlyActive + 1;
                p.activate();
            }
        }
        return true;
    }
    /**
     * Determines if toast message is already shown
     * @param {?} message
     * @return {?}
     */
    isDuplicate(message) {
        for (let i = 0; i < this.toasts.length; i++) {
            if (this.toasts[i].message === message) {
                return true;
            }
        }
        return false;
    }
    /**
     * create a clone of global config and apply individual settings
     * @private
     * @param {?=} override
     * @return {?}
     */
    applyConfig(override = {}) {
        return Object.assign({}, this.toastrConfig, override);
    }
    /**
     * Find toast object by id
     * @private
     * @param {?} toastId
     * @return {?}
     */
    _findToast(toastId) {
        for (let i = 0; i < this.toasts.length; i++) {
            if (this.toasts[i].toastId === toastId) {
                return { index: i, activeToast: this.toasts[i] };
            }
        }
        return null;
    }
    /**
     * Determines the need to run inside angular's zone then builds the toast
     * @private
     * @param {?} toastType
     * @param {?} message
     * @param {?} title
     * @param {?} config
     * @return {?}
     */
    _preBuildNotification(toastType, message, title, config) {
        if (config.onActivateTick) {
            return this.ngZone.run((/**
             * @return {?}
             */
            () => this._buildNotification(toastType, message, title, config)));
        }
        return this._buildNotification(toastType, message, title, config);
    }
    /**
     * Creates and attaches toast data to component
     * returns null if toast is duplicate and preventDuplicates == True
     * @private
     * @param {?} toastType
     * @param {?} message
     * @param {?} title
     * @param {?} config
     * @return {?}
     */
    _buildNotification(toastType, message, title, config) {
        if (!config.toastComponent) {
            throw new Error('toastComponent required');
        }
        // max opened and auto dismiss = true
        if (message && this.toastrConfig.preventDuplicates && this.isDuplicate(message)) {
            return null;
        }
        this.previousToastMessage = message;
        /** @type {?} */
        let keepInactive = false;
        if (this.toastrConfig.maxOpened && this.currentlyActive >= this.toastrConfig.maxOpened) {
            keepInactive = true;
            if (this.toastrConfig.autoDismiss) {
                this.clear(this.toasts[this.toasts.length - 1].toastId);
            }
        }
        /** @type {?} */
        const overlayRef = this.overlay.create(config.positionClass, this.overlayContainer);
        this.index = this.index + 1;
        /** @type {?} */
        let sanitizedMessage = message;
        if (message && config.enableHtml) {
            sanitizedMessage = this.sanitizer.sanitize(SecurityContext.HTML, message);
        }
        /** @type {?} */
        const toastRef = new ToastRef(overlayRef);
        /** @type {?} */
        const toastPackage = new ToastPackage(this.index, config, sanitizedMessage, title, toastType, toastRef);
        /** @type {?} */
        const toastInjector = new ToastInjector(toastPackage, this._injector);
        /** @type {?} */
        const component = new ComponentPortal(config.toastComponent, toastInjector);
        /** @type {?} */
        const portal = overlayRef.attach(component, this.toastrConfig.newestOnTop);
        toastRef.componentInstance = ((/** @type {?} */ (portal)))._component;
        /** @type {?} */
        const ins = {
            toastId: this.index,
            message: message || '',
            toastRef,
            onShown: toastRef.afterActivate(),
            onHidden: toastRef.afterClosed(),
            onTap: toastPackage.onTap(),
            onAction: toastPackage.onAction(),
            portal,
        };
        if (!keepInactive) {
            setTimeout((/**
             * @return {?}
             */
            () => {
                ins.toastRef.activate();
                this.currentlyActive = this.currentlyActive + 1;
            }));
        }
        this.toasts.push(ins);
        return ins;
    }
}
ToastrService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
ToastrService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [TOAST_CONFIG,] }] },
    { type: Overlay },
    { type: Injector },
    { type: DomSanitizer },
    { type: NgZone }
];
if (false) {
    /** @type {?} */
    ToastrService.prototype.toastrConfig;
    /** @type {?} */
    ToastrService.prototype.currentlyActive;
    /** @type {?} */
    ToastrService.prototype.toasts;
    /** @type {?} */
    ToastrService.prototype.overlayContainer;
    /** @type {?} */
    ToastrService.prototype.previousToastMessage;
    /**
     * @type {?}
     * @private
     */
    ToastrService.prototype.index;
    /**
     * @type {?}
     * @private
     */
    ToastrService.prototype.overlay;
    /**
     * @type {?}
     * @private
     */
    ToastrService.prototype._injector;
    /**
     * @type {?}
     * @private
     */
    ToastrService.prototype.sanitizer;
    /**
     * @type {?}
     * @private
     */
    ToastrService.prototype.ngZone;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3RyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbmV0LXVpLyIsInNvdXJjZXMiOlsic3JjL25vdGlmeS90b2FzdHIvdG9hc3RyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFFTCxNQUFNLEVBQ04sVUFBVSxFQUNWLFFBQVEsRUFDUixNQUFNLEVBQ04sZUFBZSxFQUNoQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsWUFBWSxFQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFJbkUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQzNELE9BQU8sRUFBYyxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFekQsT0FBTyxFQUdMLFlBQVksR0FDYixNQUFNLGlCQUFpQixDQUFDOzs7OztBQUd6QixpQ0FpQkM7Ozs7OztJQWZDLDhCQUFnQjs7Ozs7SUFFaEIsOEJBQWdCOzs7OztJQUVoQiw2QkFBd0I7Ozs7O0lBRXhCLCtCQUFzQjs7Ozs7SUFFdEIsOEJBQXlCOzs7OztJQUV6QiwrQkFBMEI7Ozs7O0lBRTFCLDRCQUF1Qjs7Ozs7SUFFdkIsK0JBQTBCOztBQUk1QixNQUFNLE9BQU8sYUFBYTs7Ozs7Ozs7SUFReEIsWUFDd0IsS0FBaUIsRUFDL0IsT0FBZ0IsRUFDaEIsU0FBbUIsRUFDbkIsU0FBdUIsRUFDdkIsTUFBYztRQUhkLFlBQU8sR0FBUCxPQUFPLENBQVM7UUFDaEIsY0FBUyxHQUFULFNBQVMsQ0FBVTtRQUNuQixjQUFTLEdBQVQsU0FBUyxDQUFjO1FBQ3ZCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFYeEIsb0JBQWUsR0FBRyxDQUFDLENBQUM7UUFDcEIsV0FBTSxHQUF1QixFQUFFLENBQUM7UUFH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O0lBQy9CLCtCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudFJlZixcbiAgSW5qZWN0LFxuICBJbmplY3RhYmxlLFxuICBJbmplY3RvcixcbiAgTmdab25lLFxuICBTZWN1cml0eUNvbnRleHRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIsIFNhZmVIdG1sIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgT3ZlcmxheSB9IGZyb20gJy4uL292ZXJsYXkvb3ZlcmxheSc7XG5pbXBvcnQgeyBDb21wb25lbnRQb3J0YWwgfSBmcm9tICcuLi9wb3J0YWwvcG9ydGFsJztcbmltcG9ydCB7IFRvYXN0SW5qZWN0b3IsIFRvYXN0UmVmIH0gZnJvbSAnLi90b2FzdC1pbmplY3Rvcic7XG5pbXBvcnQgeyBUb2FzdFRva2VuLCBUT0FTVF9DT05GSUcgfSBmcm9tICcuL3RvYXN0LXRva2VuJztcbmltcG9ydCB7IFRvYXN0Q29udGFpbmVyRGlyZWN0aXZlIH0gZnJvbSAnLi90b2FzdC5kaXJlY3RpdmUnO1xuaW1wb3J0IHtcbiAgR2xvYmFsQ29uZmlnLFxuICBJbmRpdmlkdWFsQ29uZmlnLFxuICBUb2FzdFBhY2thZ2UsXG59IGZyb20gJy4vdG9hc3RyLWNvbmZpZyc7XG5cblxuZXhwb3J0IGludGVyZmFjZSBBY3RpdmVUb2FzdDxDPiB7XG4gIC8qKiBZb3VyIFRvYXN0IElELiBVc2UgdGhpcyB0byBjbG9zZSBpdCBpbmRpdmlkdWFsbHkgKi9cbiAgdG9hc3RJZDogbnVtYmVyO1xuICAvKiogdGhlIG1lc3NhZ2Ugb2YgeW91ciB0b2FzdC4gU3RvcmVkIHRvIHByZXZlbnQgZHVwbGljYXRlcyAqL1xuICBtZXNzYWdlOiBzdHJpbmc7XG4gIC8qKiBhIHJlZmVyZW5jZSB0byB0aGUgY29tcG9uZW50IHNlZSBwb3J0YWwudHMgKi9cbiAgcG9ydGFsOiBDb21wb25lbnRSZWY8Qz47XG4gIC8qKiBhIHJlZmVyZW5jZSB0byB5b3VyIHRvYXN0ICovXG4gIHRvYXN0UmVmOiBUb2FzdFJlZjxDPjtcbiAgLyoqIHRyaWdnZXJlZCB3aGVuIHRvYXN0IGlzIGFjdGl2ZSAqL1xuICBvblNob3duOiBPYnNlcnZhYmxlPGFueT47XG4gIC8qKiB0cmlnZ2VyZWQgd2hlbiB0b2FzdCBpcyBkZXN0cm95ZWQgKi9cbiAgb25IaWRkZW46IE9ic2VydmFibGU8YW55PjtcbiAgLyoqIHRyaWdnZXJlZCBvbiB0b2FzdCBjbGljayAqL1xuICBvblRhcDogT2JzZXJ2YWJsZTxhbnk+O1xuICAvKiogYXZhaWxhYmxlIGZvciB5b3VyIHVzZSBpbiBjdXN0b20gdG9hc3QgKi9cbiAgb25BY3Rpb246IE9ic2VydmFibGU8YW55Pjtcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFRvYXN0clNlcnZpY2Uge1xuICB0b2FzdHJDb25maWc6IEdsb2JhbENvbmZpZztcbiAgY3VycmVudGx5QWN0aXZlID0gMDtcbiAgdG9hc3RzOiBBY3RpdmVUb2FzdDxhbnk+W10gPSBbXTtcbiAgb3ZlcmxheUNvbnRhaW5lcjogVG9hc3RDb250YWluZXJEaXJlY3RpdmU7XG4gIHByZXZpb3VzVG9hc3RNZXNzYWdlOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gIHByaXZhdGUgaW5kZXggPSAwO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoVE9BU1RfQ09ORklHKSB0b2tlbjogVG9hc3RUb2tlbixcbiAgICBwcml2YXRlIG92ZXJsYXk6IE92ZXJsYXksXG4gICAgcHJpdmF0ZSBfaW5qZWN0b3I6IEluamVjdG9yLFxuICAgIHByaXZhdGUgc2FuaXRpemVyOiBEb21TYW5pdGl6ZXIsXG4gICAgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZVxuICApIHtcbiAgICBjb25zdCBkZWZhdWx0Q29uZmlnID0gbmV3IHRva2VuLmRlZmF1bHRzO1xuICAgIHRoaXMudG9hc3RyQ29uZmlnID0geyAuLi5kZWZhdWx0Q29uZmlnLCAuLi50b2tlbi5jb25maWcgfTtcbiAgICB0aGlzLnRvYXN0ckNvbmZpZy5pY29uQ2xhc3NlcyA9IHtcbiAgICAgIC4uLmRlZmF1bHRDb25maWcuaWNvbkNsYXNzZXMsXG4gICAgICAuLi50b2tlbi5jb25maWcuaWNvbkNsYXNzZXMsXG4gICAgfTtcbiAgfVxuICAvKiogc2hvdyB0b2FzdCAqL1xuICBzaG93KG1lc3NhZ2U/OiBzdHJpbmcsIHRpdGxlPzogc3RyaW5nLCBvdmVycmlkZTogUGFydGlhbDxJbmRpdmlkdWFsQ29uZmlnPiA9IHt9LCB0eXBlID0gJycpIHtcbiAgICByZXR1cm4gdGhpcy5fcHJlQnVpbGROb3RpZmljYXRpb24odHlwZSwgbWVzc2FnZSwgdGl0bGUsIHRoaXMuYXBwbHlDb25maWcob3ZlcnJpZGUpKTtcbiAgfVxuICAvKiogc2hvdyBzdWNjZXNzZnVsIHRvYXN0ICovXG4gIHN1Y2Nlc3MobWVzc2FnZT86IHN0cmluZywgdGl0bGU/OiBzdHJpbmcsIG92ZXJyaWRlOiBQYXJ0aWFsPEluZGl2aWR1YWxDb25maWc+ID0ge30pIHtcbiAgICBjb25zdCB0eXBlID0gdGhpcy50b2FzdHJDb25maWcuaWNvbkNsYXNzZXMuc3VjY2VzcyB8fCAnJztcbiAgICByZXR1cm4gdGhpcy5fcHJlQnVpbGROb3RpZmljYXRpb24odHlwZSwgbWVzc2FnZSwgdGl0bGUsIHRoaXMuYXBwbHlDb25maWcob3ZlcnJpZGUpKTtcbiAgfVxuICAvKiogc2hvdyBlcnJvciB0b2FzdCAqL1xuICBlcnJvcihtZXNzYWdlPzogc3RyaW5nLCB0aXRsZT86IHN0cmluZywgb3ZlcnJpZGU6IFBhcnRpYWw8SW5kaXZpZHVhbENvbmZpZz4gPSB7fSkge1xuICAgIGNvbnN0IHR5cGUgPSB0aGlzLnRvYXN0ckNvbmZpZy5pY29uQ2xhc3Nlcy5lcnJvciB8fCAnJztcbiAgICByZXR1cm4gdGhpcy5fcHJlQnVpbGROb3RpZmljYXRpb24odHlwZSwgbWVzc2FnZSwgdGl0bGUsIHRoaXMuYXBwbHlDb25maWcob3ZlcnJpZGUpKTtcbiAgfVxuICAvKiogc2hvdyBpbmZvIHRvYXN0ICovXG4gIGluZm8obWVzc2FnZT86IHN0cmluZywgdGl0bGU/OiBzdHJpbmcsIG92ZXJyaWRlOiBQYXJ0aWFsPEluZGl2aWR1YWxDb25maWc+ID0ge30pIHtcbiAgICBjb25zdCB0eXBlID0gdGhpcy50b2FzdHJDb25maWcuaWNvbkNsYXNzZXMuaW5mbyB8fCAnJztcbiAgICByZXR1cm4gdGhpcy5fcHJlQnVpbGROb3RpZmljYXRpb24odHlwZSwgbWVzc2FnZSwgdGl0bGUsIHRoaXMuYXBwbHlDb25maWcob3ZlcnJpZGUpKTtcbiAgfVxuICAvKiogc2hvdyB3YXJuaW5nIHRvYXN0ICovXG4gIHdhcm5pbmcobWVzc2FnZT86IHN0cmluZywgdGl0bGU/OiBzdHJpbmcsIG92ZXJyaWRlOiBQYXJ0aWFsPEluZGl2aWR1YWxDb25maWc+ID0ge30pIHtcbiAgICBjb25zdCB0eXBlID0gdGhpcy50b2FzdHJDb25maWcuaWNvbkNsYXNzZXMud2FybmluZyB8fCAnJztcbiAgICByZXR1cm4gdGhpcy5fcHJlQnVpbGROb3RpZmljYXRpb24odHlwZSwgbWVzc2FnZSwgdGl0bGUsIHRoaXMuYXBwbHlDb25maWcob3ZlcnJpZGUpKTtcbiAgfVxuICAvKipcbiAgICogUmVtb3ZlIGFsbCBvciBhIHNpbmdsZSB0b2FzdCBieSBpZFxuICAgKi9cbiAgY2xlYXIodG9hc3RJZD86IG51bWJlcikge1xuICAgIC8vIENhbGwgZXZlcnkgdG9hc3RSZWYgbWFudWFsQ2xvc2UgZnVuY3Rpb25cbiAgICBmb3IgKGNvbnN0IHRvYXN0IG9mIHRoaXMudG9hc3RzKSB7XG4gICAgICBpZiAodG9hc3RJZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmICh0b2FzdC50b2FzdElkID09PSB0b2FzdElkKSB7XG4gICAgICAgICAgdG9hc3QudG9hc3RSZWYubWFudWFsQ2xvc2UoKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRvYXN0LnRvYXN0UmVmLm1hbnVhbENsb3NlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiBSZW1vdmUgYW5kIGRlc3Ryb3kgYSBzaW5nbGUgdG9hc3QgYnkgaWRcbiAgICovXG4gIHJlbW92ZSh0b2FzdElkOiBudW1iZXIpIHtcbiAgICBjb25zdCBmb3VuZCA9IHRoaXMuX2ZpbmRUb2FzdCh0b2FzdElkKTtcbiAgICBpZiAoIWZvdW5kKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGZvdW5kLmFjdGl2ZVRvYXN0LnRvYXN0UmVmLmNsb3NlKCk7XG4gICAgdGhpcy50b2FzdHMuc3BsaWNlKGZvdW5kLmluZGV4LCAxKTtcbiAgICB0aGlzLmN1cnJlbnRseUFjdGl2ZSA9IHRoaXMuY3VycmVudGx5QWN0aXZlIC0gMTtcbiAgICBpZiAoIXRoaXMudG9hc3RyQ29uZmlnLm1heE9wZW5lZCB8fCAhdGhpcy50b2FzdHMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmICh0aGlzLmN1cnJlbnRseUFjdGl2ZSA8IHRoaXMudG9hc3RyQ29uZmlnLm1heE9wZW5lZCAmJiB0aGlzLnRvYXN0c1t0aGlzLmN1cnJlbnRseUFjdGl2ZV0pIHtcbiAgICAgIGNvbnN0IHAgPSB0aGlzLnRvYXN0c1t0aGlzLmN1cnJlbnRseUFjdGl2ZV0udG9hc3RSZWY7XG4gICAgICBpZiAoIXAuaXNJbmFjdGl2ZSgpKSB7XG4gICAgICAgIHRoaXMuY3VycmVudGx5QWN0aXZlID0gdGhpcy5jdXJyZW50bHlBY3RpdmUgKyAxO1xuICAgICAgICBwLmFjdGl2YXRlKCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIERldGVybWluZXMgaWYgdG9hc3QgbWVzc2FnZSBpcyBhbHJlYWR5IHNob3duXG4gICAqL1xuICBpc0R1cGxpY2F0ZShtZXNzYWdlOiBzdHJpbmcpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudG9hc3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAodGhpcy50b2FzdHNbaV0ubWVzc2FnZSA9PT0gbWVzc2FnZSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLyoqIGNyZWF0ZSBhIGNsb25lIG9mIGdsb2JhbCBjb25maWcgYW5kIGFwcGx5IGluZGl2aWR1YWwgc2V0dGluZ3MgKi9cbiAgcHJpdmF0ZSBhcHBseUNvbmZpZyhvdmVycmlkZTogUGFydGlhbDxJbmRpdmlkdWFsQ29uZmlnPiA9IHt9KTogR2xvYmFsQ29uZmlnIHtcbiAgICByZXR1cm4geyAuLi50aGlzLnRvYXN0ckNvbmZpZywgLi4ub3ZlcnJpZGUgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kIHRvYXN0IG9iamVjdCBieSBpZFxuICAgKi9cbiAgcHJpdmF0ZSBfZmluZFRvYXN0KHRvYXN0SWQ6IG51bWJlcik6IHsgaW5kZXg6IG51bWJlciwgYWN0aXZlVG9hc3Q6IEFjdGl2ZVRvYXN0PGFueT4gfSB8IG51bGwge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50b2FzdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICh0aGlzLnRvYXN0c1tpXS50b2FzdElkID09PSB0b2FzdElkKSB7XG4gICAgICAgIHJldHVybiB7IGluZGV4OiBpLCBhY3RpdmVUb2FzdDogdGhpcy50b2FzdHNbaV0gfTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvKipcbiAgICogRGV0ZXJtaW5lcyB0aGUgbmVlZCB0byBydW4gaW5zaWRlIGFuZ3VsYXIncyB6b25lIHRoZW4gYnVpbGRzIHRoZSB0b2FzdFxuICAgKi9cbiAgcHJpdmF0ZSBfcHJlQnVpbGROb3RpZmljYXRpb24oXG4gICAgdG9hc3RUeXBlOiBzdHJpbmcsXG4gICAgbWVzc2FnZTogc3RyaW5nIHwgdW5kZWZpbmVkLFxuICAgIHRpdGxlOiBzdHJpbmcgfCB1bmRlZmluZWQsXG4gICAgY29uZmlnOiBHbG9iYWxDb25maWcsXG4gICk6IEFjdGl2ZVRvYXN0PGFueT4gfCBudWxsIHtcbiAgICBpZiAoY29uZmlnLm9uQWN0aXZhdGVUaWNrKSB7XG4gICAgICByZXR1cm4gdGhpcy5uZ1pvbmUucnVuKCgpID0+IHRoaXMuX2J1aWxkTm90aWZpY2F0aW9uKHRvYXN0VHlwZSwgbWVzc2FnZSwgdGl0bGUsIGNvbmZpZykpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fYnVpbGROb3RpZmljYXRpb24odG9hc3RUeXBlLCBtZXNzYWdlLCB0aXRsZSwgY29uZmlnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuZCBhdHRhY2hlcyB0b2FzdCBkYXRhIHRvIGNvbXBvbmVudFxuICAgKiByZXR1cm5zIG51bGwgaWYgdG9hc3QgaXMgZHVwbGljYXRlIGFuZCBwcmV2ZW50RHVwbGljYXRlcyA9PSBUcnVlXG4gICAqL1xuICBwcml2YXRlIF9idWlsZE5vdGlmaWNhdGlvbihcbiAgICB0b2FzdFR5cGU6IHN0cmluZyxcbiAgICBtZXNzYWdlOiBzdHJpbmcgfCB1bmRlZmluZWQsXG4gICAgdGl0bGU6IHN0cmluZyB8IHVuZGVmaW5lZCxcbiAgICBjb25maWc6IEdsb2JhbENvbmZpZyxcbiAgKTogQWN0aXZlVG9hc3Q8YW55PiB8IG51bGwge1xuICAgIGlmICghY29uZmlnLnRvYXN0Q29tcG9uZW50KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3RvYXN0Q29tcG9uZW50IHJlcXVpcmVkJyk7XG4gICAgfVxuICAgIC8vIG1heCBvcGVuZWQgYW5kIGF1dG8gZGlzbWlzcyA9IHRydWVcbiAgICBpZiAobWVzc2FnZSAmJiB0aGlzLnRvYXN0ckNvbmZpZy5wcmV2ZW50RHVwbGljYXRlcyAmJiB0aGlzLmlzRHVwbGljYXRlKG1lc3NhZ2UpKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgdGhpcy5wcmV2aW91c1RvYXN0TWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgbGV0IGtlZXBJbmFjdGl2ZSA9IGZhbHNlO1xuICAgIGlmICh0aGlzLnRvYXN0ckNvbmZpZy5tYXhPcGVuZWQgJiYgdGhpcy5jdXJyZW50bHlBY3RpdmUgPj0gdGhpcy50b2FzdHJDb25maWcubWF4T3BlbmVkKSB7XG4gICAgICBrZWVwSW5hY3RpdmUgPSB0cnVlO1xuICAgICAgaWYgKHRoaXMudG9hc3RyQ29uZmlnLmF1dG9EaXNtaXNzKSB7XG4gICAgICAgIHRoaXMuY2xlYXIodGhpcy50b2FzdHNbdGhpcy50b2FzdHMubGVuZ3RoIC0gMV0udG9hc3RJZCk7XG4gICAgICB9XG4gICAgfVxuICAgIGNvbnN0IG92ZXJsYXlSZWYgPSB0aGlzLm92ZXJsYXkuY3JlYXRlKGNvbmZpZy5wb3NpdGlvbkNsYXNzLCB0aGlzLm92ZXJsYXlDb250YWluZXIpO1xuICAgIHRoaXMuaW5kZXggPSB0aGlzLmluZGV4ICsgMTtcbiAgICBsZXQgc2FuaXRpemVkTWVzc2FnZTogc3RyaW5nIHwgU2FmZUh0bWwgfCB1bmRlZmluZWQgfCBudWxsID0gbWVzc2FnZTtcbiAgICBpZiAobWVzc2FnZSAmJiBjb25maWcuZW5hYmxlSHRtbCkge1xuICAgICAgc2FuaXRpemVkTWVzc2FnZSA9IHRoaXMuc2FuaXRpemVyLnNhbml0aXplKFNlY3VyaXR5Q29udGV4dC5IVE1MLCBtZXNzYWdlKTtcbiAgICB9XG4gICAgY29uc3QgdG9hc3RSZWYgPSBuZXcgVG9hc3RSZWYob3ZlcmxheVJlZik7XG4gICAgY29uc3QgdG9hc3RQYWNrYWdlID0gbmV3IFRvYXN0UGFja2FnZShcbiAgICAgIHRoaXMuaW5kZXgsXG4gICAgICBjb25maWcsXG4gICAgICBzYW5pdGl6ZWRNZXNzYWdlLFxuICAgICAgdGl0bGUsXG4gICAgICB0b2FzdFR5cGUsXG4gICAgICB0b2FzdFJlZixcbiAgICApO1xuICAgIGNvbnN0IHRvYXN0SW5qZWN0b3IgPSBuZXcgVG9hc3RJbmplY3Rvcih0b2FzdFBhY2thZ2UsIHRoaXMuX2luamVjdG9yKTtcbiAgICBjb25zdCBjb21wb25lbnQgPSBuZXcgQ29tcG9uZW50UG9ydGFsKGNvbmZpZy50b2FzdENvbXBvbmVudCwgdG9hc3RJbmplY3Rvcik7XG4gICAgY29uc3QgcG9ydGFsID0gb3ZlcmxheVJlZi5hdHRhY2goY29tcG9uZW50LCB0aGlzLnRvYXN0ckNvbmZpZy5uZXdlc3RPblRvcCk7XG4gICAgdG9hc3RSZWYuY29tcG9uZW50SW5zdGFuY2UgPSAoPGFueT5wb3J0YWwpLl9jb21wb25lbnQ7XG4gICAgY29uc3QgaW5zOiBBY3RpdmVUb2FzdDxhbnk+ID0ge1xuICAgICAgdG9hc3RJZDogdGhpcy5pbmRleCxcbiAgICAgIG1lc3NhZ2U6IG1lc3NhZ2UgfHwgJycsXG4gICAgICB0b2FzdFJlZixcbiAgICAgIG9uU2hvd246IHRvYXN0UmVmLmFmdGVyQWN0aXZhdGUoKSxcbiAgICAgIG9uSGlkZGVuOiB0b2FzdFJlZi5hZnRlckNsb3NlZCgpLFxuICAgICAgb25UYXA6IHRvYXN0UGFja2FnZS5vblRhcCgpLFxuICAgICAgb25BY3Rpb246IHRvYXN0UGFja2FnZS5vbkFjdGlvbigpLFxuICAgICAgcG9ydGFsLFxuICAgIH07XG5cbiAgICBpZiAoIWtlZXBJbmFjdGl2ZSkge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGlucy50b2FzdFJlZi5hY3RpdmF0ZSgpO1xuICAgICAgICB0aGlzLmN1cnJlbnRseUFjdGl2ZSA9IHRoaXMuY3VycmVudGx5QWN0aXZlICsgMTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMudG9hc3RzLnB1c2goaW5zKTtcbiAgICByZXR1cm4gaW5zO1xuICB9XG59XG4iXX0=