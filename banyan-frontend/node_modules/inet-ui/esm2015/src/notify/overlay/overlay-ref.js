/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Reference to an overlay that has been created with the Overlay service.
 * Used to manipulate or dispose of said overlay.
 */
export class OverlayRef {
    /**
     * @param {?} _portalHost
     */
    constructor(_portalHost) {
        this._portalHost = _portalHost;
    }
    /**
     * @param {?} portal
     * @param {?=} newestOnTop
     * @return {?}
     */
    attach(portal, newestOnTop = true) {
        return this._portalHost.attach(portal, newestOnTop);
    }
    /**
     * Detaches an overlay from a portal.
     * @return {?} Resolves when the overlay has been detached.
     */
    detach() {
        return this._portalHost.detach();
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    OverlayRef.prototype._portalHost;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmxheS1yZWYuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbmV0LXVpLyIsInNvdXJjZXMiOlsic3JjL25vdGlmeS9vdmVybGF5L292ZXJsYXktcmVmLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBT0EsTUFBTSxPQUFPLFVBQVU7Ozs7SUFDckIsWUFBb0IsV0FBMkI7UUFBM0IsZ0JBQVcsR0FBWCxXQUFXLENBQWdCO0lBQUcsQ0FBQzs7Ozs7O0lBRW5ELE1BQU0sQ0FDSixNQUE0QixFQUM1QixjQUF1QixJQUFJO1FBRTNCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQ3RELENBQUM7Ozs7O0lBTUQsTUFBTTtRQUNKLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNuQyxDQUFDO0NBQ0Y7Ozs7OztJQWhCYSxpQ0FBbUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJhc2VQb3J0YWxIb3N0LCBDb21wb25lbnRQb3J0YWwgfSBmcm9tICcuLi9wb3J0YWwvcG9ydGFsJztcblxuLyoqXG4gKiBSZWZlcmVuY2UgdG8gYW4gb3ZlcmxheSB0aGF0IGhhcyBiZWVuIGNyZWF0ZWQgd2l0aCB0aGUgT3ZlcmxheSBzZXJ2aWNlLlxuICogVXNlZCB0byBtYW5pcHVsYXRlIG9yIGRpc3Bvc2Ugb2Ygc2FpZCBvdmVybGF5LlxuICovXG5leHBvcnQgY2xhc3MgT3ZlcmxheVJlZiB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3BvcnRhbEhvc3Q6IEJhc2VQb3J0YWxIb3N0KSB7fVxuXG4gIGF0dGFjaChcbiAgICBwb3J0YWw6IENvbXBvbmVudFBvcnRhbDxhbnk+LFxuICAgIG5ld2VzdE9uVG9wOiBib29sZWFuID0gdHJ1ZSxcbiAgKTogQ29tcG9uZW50UmVmPGFueT4ge1xuICAgIHJldHVybiB0aGlzLl9wb3J0YWxIb3N0LmF0dGFjaChwb3J0YWwsIG5ld2VzdE9uVG9wKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXRhY2hlcyBhbiBvdmVybGF5IGZyb20gYSBwb3J0YWwuXG4gICAqIEByZXR1cm5zIFJlc29sdmVzIHdoZW4gdGhlIG92ZXJsYXkgaGFzIGJlZW4gZGV0YWNoZWQuXG4gICAqL1xuICBkZXRhY2goKSB7XG4gICAgcmV0dXJuIHRoaXMuX3BvcnRhbEhvc3QuZGV0YWNoKCk7XG4gIH1cbn1cbiJdfQ==