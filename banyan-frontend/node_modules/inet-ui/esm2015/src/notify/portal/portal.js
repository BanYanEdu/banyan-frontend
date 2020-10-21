/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 * @template T
 */
export function ComponentType() { }
/**
 * A `ComponentPortal` is a portal that instantiates some Component upon attachment.
 * @template T
 */
export class ComponentPortal {
    /**
     * @param {?} component
     * @param {?} injector
     */
    constructor(component, injector) {
        this.component = component;
        this.injector = injector;
    }
    /**
     * Attach this portal to a host.
     * @param {?} host
     * @param {?} newestOnTop
     * @return {?}
     */
    attach(host, newestOnTop) {
        this._attachedHost = host;
        return host.attach(this, newestOnTop);
    }
    /**
     * Detach this portal from its host
     * @return {?}
     */
    detach() {
        /** @type {?} */
        const host = this._attachedHost;
        if (host) {
            this._attachedHost = undefined;
            return host.detach();
        }
    }
    /**
     * Whether this portal is attached to a host.
     * @return {?}
     */
    get isAttached() {
        return this._attachedHost != null;
    }
    /**
     * Sets the PortalHost reference without performing `attach()`. This is used directly by
     * the PortalHost when it is performing an `attach()` or `detach()`.
     * @param {?=} host
     * @return {?}
     */
    setAttachedHost(host) {
        this._attachedHost = host;
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    ComponentPortal.prototype._attachedHost;
    /**
     * The type of the component that will be instantiated for attachment.
     * @type {?}
     */
    ComponentPortal.prototype.component;
    /**
     * [Optional] Where the attached component should live in Angular's *logical* component tree.
     * This is different from where the component *renders*, which is determined by the PortalHost.
     * The origin necessary when the host is outside of the Angular application context.
     * @type {?}
     */
    ComponentPortal.prototype.viewContainerRef;
    /**
     * Injector used for the instantiation of the component.
     * @type {?}
     */
    ComponentPortal.prototype.injector;
}
/**
 * Partial implementation of PortalHost that only deals with attaching a
 * ComponentPortal
 * @abstract
 */
export class BasePortalHost {
    /**
     * @param {?} portal
     * @param {?} newestOnTop
     * @return {?}
     */
    attach(portal, newestOnTop) {
        this._attachedPortal = portal;
        return this.attachComponentPortal(portal, newestOnTop);
    }
    /**
     * @return {?}
     */
    detach() {
        if (this._attachedPortal) {
            this._attachedPortal.setAttachedHost();
        }
        this._attachedPortal = undefined;
        if (this._disposeFn) {
            this._disposeFn();
            this._disposeFn = undefined;
        }
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    setDisposeFn(fn) {
        this._disposeFn = fn;
    }
}
if (false) {
    /**
     * The portal currently attached to the host.
     * @type {?}
     * @private
     */
    BasePortalHost.prototype._attachedPortal;
    /**
     * A function that will permanently dispose this host.
     * @type {?}
     * @private
     */
    BasePortalHost.prototype._disposeFn;
    /**
     * @abstract
     * @template T
     * @param {?} portal
     * @param {?} newestOnTop
     * @return {?}
     */
    BasePortalHost.prototype.attachComponentPortal = function (portal, newestOnTop) { };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9ydGFsLmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC11aS8iLCJzb3VyY2VzIjpbInNyYy9ub3RpZnkvcG9ydGFsL3BvcnRhbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQU1BLG1DQUVDOzs7OztBQU1ELE1BQU0sT0FBTyxlQUFlOzs7OztJQWUxQixZQUFZLFNBQTJCLEVBQUUsUUFBa0I7UUFDekQsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDM0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7SUFDM0IsQ0FBQzs7Ozs7OztJQUdELE1BQU0sQ0FBQyxJQUFvQixFQUFFLFdBQW9CO1FBQy9DLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1FBQzFCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDeEMsQ0FBQzs7Ozs7SUFHRCxNQUFNOztjQUNFLElBQUksR0FBRyxJQUFJLENBQUMsYUFBYTtRQUMvQixJQUFJLElBQUksRUFBRTtZQUNSLElBQUksQ0FBQyxhQUFhLEdBQUcsU0FBUyxDQUFDO1lBQy9CLE9BQU8sSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ3RCO0lBQ0gsQ0FBQzs7Ozs7SUFHRCxJQUFJLFVBQVU7UUFDWixPQUFPLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDO0lBQ3BDLENBQUM7Ozs7Ozs7SUFNRCxlQUFlLENBQUMsSUFBcUI7UUFDbkMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7SUFDNUIsQ0FBQztDQUNGOzs7Ozs7SUE5Q0Msd0NBQXVDOzs7OztJQUV2QyxvQ0FBNEI7Ozs7Ozs7SUFPNUIsMkNBQW1DOzs7OztJQUduQyxtQ0FBbUI7Ozs7Ozs7QUF3Q3JCLE1BQU0sT0FBZ0IsY0FBYzs7Ozs7O0lBT2xDLE1BQU0sQ0FBQyxNQUE0QixFQUFFLFdBQW9CO1FBQ3ZELElBQUksQ0FBQyxlQUFlLEdBQUcsTUFBTSxDQUFDO1FBQzlCLE9BQU8sSUFBSSxDQUFDLHFCQUFxQixDQUFDLE1BQU0sRUFBRSxXQUFXLENBQUMsQ0FBQztJQUN6RCxDQUFDOzs7O0lBSUQsTUFBTTtRQUNKLElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUN4QixJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsRUFBRSxDQUFDO1NBQ3hDO1FBRUQsSUFBSSxDQUFDLGVBQWUsR0FBRyxTQUFTLENBQUM7UUFDakMsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ25CLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUNsQixJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztTQUM3QjtJQUNILENBQUM7Ozs7O0lBRUQsWUFBWSxDQUFDLEVBQWM7UUFDekIsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7SUFDdkIsQ0FBQztDQUNGOzs7Ozs7O0lBM0JDLHlDQUErQzs7Ozs7O0lBRy9DLG9DQUFnQzs7Ozs7Ozs7SUFPaEMsb0ZBQXFHIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50UmVmLFxuICBJbmplY3RvcixcbiAgVmlld0NvbnRhaW5lclJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuZXhwb3J0IGludGVyZmFjZSBDb21wb25lbnRUeXBlPFQ+IHtcbiAgbmV3ICguLi5hcmdzOiBhbnlbXSk6IFQ7XG59XG5cblxuLyoqXG4gKiBBIGBDb21wb25lbnRQb3J0YWxgIGlzIGEgcG9ydGFsIHRoYXQgaW5zdGFudGlhdGVzIHNvbWUgQ29tcG9uZW50IHVwb24gYXR0YWNobWVudC5cbiAqL1xuZXhwb3J0IGNsYXNzIENvbXBvbmVudFBvcnRhbDxUPiB7XG4gIHByaXZhdGUgX2F0dGFjaGVkSG9zdD86IEJhc2VQb3J0YWxIb3N0O1xuICAvKiogVGhlIHR5cGUgb2YgdGhlIGNvbXBvbmVudCB0aGF0IHdpbGwgYmUgaW5zdGFudGlhdGVkIGZvciBhdHRhY2htZW50LiAqL1xuICBjb21wb25lbnQ6IENvbXBvbmVudFR5cGU8VD47XG5cbiAgLyoqXG4gICAqIFtPcHRpb25hbF0gV2hlcmUgdGhlIGF0dGFjaGVkIGNvbXBvbmVudCBzaG91bGQgbGl2ZSBpbiBBbmd1bGFyJ3MgKmxvZ2ljYWwqIGNvbXBvbmVudCB0cmVlLlxuICAgKiBUaGlzIGlzIGRpZmZlcmVudCBmcm9tIHdoZXJlIHRoZSBjb21wb25lbnQgKnJlbmRlcnMqLCB3aGljaCBpcyBkZXRlcm1pbmVkIGJ5IHRoZSBQb3J0YWxIb3N0LlxuICAgKiBUaGUgb3JpZ2luIG5lY2Vzc2FyeSB3aGVuIHRoZSBob3N0IGlzIG91dHNpZGUgb2YgdGhlIEFuZ3VsYXIgYXBwbGljYXRpb24gY29udGV4dC5cbiAgICovXG4gIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWY7XG5cbiAgLyoqIEluamVjdG9yIHVzZWQgZm9yIHRoZSBpbnN0YW50aWF0aW9uIG9mIHRoZSBjb21wb25lbnQuICovXG4gIGluamVjdG9yOiBJbmplY3RvcjtcblxuICBjb25zdHJ1Y3Rvcihjb21wb25lbnQ6IENvbXBvbmVudFR5cGU8VD4sIGluamVjdG9yOiBJbmplY3Rvcikge1xuICAgIHRoaXMuY29tcG9uZW50ID0gY29tcG9uZW50O1xuICAgIHRoaXMuaW5qZWN0b3IgPSBpbmplY3RvcjtcbiAgfVxuXG4gIC8qKiBBdHRhY2ggdGhpcyBwb3J0YWwgdG8gYSBob3N0LiAqL1xuICBhdHRhY2goaG9zdDogQmFzZVBvcnRhbEhvc3QsIG5ld2VzdE9uVG9wOiBib29sZWFuKSB7XG4gICAgdGhpcy5fYXR0YWNoZWRIb3N0ID0gaG9zdDtcbiAgICByZXR1cm4gaG9zdC5hdHRhY2godGhpcywgbmV3ZXN0T25Ub3ApO1xuICB9XG5cbiAgLyoqIERldGFjaCB0aGlzIHBvcnRhbCBmcm9tIGl0cyBob3N0ICovXG4gIGRldGFjaCgpIHtcbiAgICBjb25zdCBob3N0ID0gdGhpcy5fYXR0YWNoZWRIb3N0O1xuICAgIGlmIChob3N0KSB7XG4gICAgICB0aGlzLl9hdHRhY2hlZEhvc3QgPSB1bmRlZmluZWQ7XG4gICAgICByZXR1cm4gaG9zdC5kZXRhY2goKTtcbiAgICB9XG4gIH1cblxuICAvKiogV2hldGhlciB0aGlzIHBvcnRhbCBpcyBhdHRhY2hlZCB0byBhIGhvc3QuICovXG4gIGdldCBpc0F0dGFjaGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9hdHRhY2hlZEhvc3QgIT0gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBQb3J0YWxIb3N0IHJlZmVyZW5jZSB3aXRob3V0IHBlcmZvcm1pbmcgYGF0dGFjaCgpYC4gVGhpcyBpcyB1c2VkIGRpcmVjdGx5IGJ5XG4gICAqIHRoZSBQb3J0YWxIb3N0IHdoZW4gaXQgaXMgcGVyZm9ybWluZyBhbiBgYXR0YWNoKClgIG9yIGBkZXRhY2goKWAuXG4gICAqL1xuICBzZXRBdHRhY2hlZEhvc3QoaG9zdD86IEJhc2VQb3J0YWxIb3N0KSB7XG4gICAgdGhpcy5fYXR0YWNoZWRIb3N0ID0gaG9zdDtcbiAgfVxufVxuXG4vKipcbiAqIFBhcnRpYWwgaW1wbGVtZW50YXRpb24gb2YgUG9ydGFsSG9zdCB0aGF0IG9ubHkgZGVhbHMgd2l0aCBhdHRhY2hpbmcgYVxuICogQ29tcG9uZW50UG9ydGFsXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBCYXNlUG9ydGFsSG9zdCB7XG4gIC8qKiBUaGUgcG9ydGFsIGN1cnJlbnRseSBhdHRhY2hlZCB0byB0aGUgaG9zdC4gKi9cbiAgcHJpdmF0ZSBfYXR0YWNoZWRQb3J0YWw/OiBDb21wb25lbnRQb3J0YWw8YW55PjtcblxuICAvKiogQSBmdW5jdGlvbiB0aGF0IHdpbGwgcGVybWFuZW50bHkgZGlzcG9zZSB0aGlzIGhvc3QuICovXG4gIHByaXZhdGUgX2Rpc3Bvc2VGbj86ICgpID0+IHZvaWQ7XG5cbiAgYXR0YWNoKHBvcnRhbDogQ29tcG9uZW50UG9ydGFsPGFueT4sIG5ld2VzdE9uVG9wOiBib29sZWFuKSB7XG4gICAgdGhpcy5fYXR0YWNoZWRQb3J0YWwgPSBwb3J0YWw7XG4gICAgcmV0dXJuIHRoaXMuYXR0YWNoQ29tcG9uZW50UG9ydGFsKHBvcnRhbCwgbmV3ZXN0T25Ub3ApO1xuICB9XG5cbiAgYWJzdHJhY3QgYXR0YWNoQ29tcG9uZW50UG9ydGFsPFQ+KHBvcnRhbDogQ29tcG9uZW50UG9ydGFsPFQ+LCBuZXdlc3RPblRvcDogYm9vbGVhbik6IENvbXBvbmVudFJlZjxUPjtcblxuICBkZXRhY2goKSB7XG4gICAgaWYgKHRoaXMuX2F0dGFjaGVkUG9ydGFsKSB7XG4gICAgICB0aGlzLl9hdHRhY2hlZFBvcnRhbC5zZXRBdHRhY2hlZEhvc3QoKTtcbiAgICB9XG5cbiAgICB0aGlzLl9hdHRhY2hlZFBvcnRhbCA9IHVuZGVmaW5lZDtcbiAgICBpZiAodGhpcy5fZGlzcG9zZUZuKSB7XG4gICAgICB0aGlzLl9kaXNwb3NlRm4oKTtcbiAgICAgIHRoaXMuX2Rpc3Bvc2VGbiA9IHVuZGVmaW5lZDtcbiAgICB9XG4gIH1cblxuICBzZXREaXNwb3NlRm4oZm46ICgpID0+IHZvaWQpIHtcbiAgICB0aGlzLl9kaXNwb3NlRm4gPSBmbjtcbiAgfVxufVxuIl19