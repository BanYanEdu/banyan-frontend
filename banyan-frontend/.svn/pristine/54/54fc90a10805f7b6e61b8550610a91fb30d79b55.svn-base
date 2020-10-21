/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { BasePortalHost } from './portal';
/**
 * A PortalHost for attaching portals to an arbitrary DOM element outside of the Angular
 * application context.
 *
 * This is the only part of the portal core that directly touches the DOM.
 */
var /**
 * A PortalHost for attaching portals to an arbitrary DOM element outside of the Angular
 * application context.
 *
 * This is the only part of the portal core that directly touches the DOM.
 */
DomPortalHost = /** @class */ (function (_super) {
    tslib_1.__extends(DomPortalHost, _super);
    function DomPortalHost(_hostDomElement, _componentFactoryResolver, _appRef) {
        var _this = _super.call(this) || this;
        _this._hostDomElement = _hostDomElement;
        _this._componentFactoryResolver = _componentFactoryResolver;
        _this._appRef = _appRef;
        return _this;
    }
    /**
     * Attach the given ComponentPortal to DOM element using the ComponentFactoryResolver.
     * @param portal Portal to be attached
     */
    /**
     * Attach the given ComponentPortal to DOM element using the ComponentFactoryResolver.
     * @template T
     * @param {?} portal Portal to be attached
     * @param {?} newestOnTop
     * @return {?}
     */
    DomPortalHost.prototype.attachComponentPortal = /**
     * Attach the given ComponentPortal to DOM element using the ComponentFactoryResolver.
     * @template T
     * @param {?} portal Portal to be attached
     * @param {?} newestOnTop
     * @return {?}
     */
    function (portal, newestOnTop) {
        var _this = this;
        /** @type {?} */
        var componentFactory = this._componentFactoryResolver.resolveComponentFactory(portal.component);
        /** @type {?} */
        var componentRef;
        // If the portal specifies a ViewContainerRef, we will use that as the attachment point
        // for the component (in terms of Angular's component tree, not rendering).
        // When the ViewContainerRef is missing, we use the factory to create the component directly
        // and then manually attach the ChangeDetector for that component to the application (which
        // happens automatically when using a ViewContainer).
        componentRef = componentFactory.create(portal.injector);
        // When creating a component outside of a ViewContainer, we need to manually register
        // its ChangeDetector with the application. This API is unfortunately not yet published
        // in Angular core. The change detector must also be deregistered when the component
        // is destroyed to prevent memory leaks.
        this._appRef.attachView(componentRef.hostView);
        this.setDisposeFn((/**
         * @return {?}
         */
        function () {
            _this._appRef.detachView(componentRef.hostView);
            componentRef.destroy();
        }));
        // At this point the component has been instantiated, so we move it to the location in the DOM
        // where we want it to be rendered.
        if (newestOnTop) {
            this._hostDomElement.insertBefore(this._getComponentRootNode(componentRef), this._hostDomElement.firstChild);
        }
        else {
            this._hostDomElement.appendChild(this._getComponentRootNode(componentRef));
        }
        return componentRef;
    };
    /** Gets the root HTMLElement for an instantiated component. */
    /**
     * Gets the root HTMLElement for an instantiated component.
     * @private
     * @param {?} componentRef
     * @return {?}
     */
    DomPortalHost.prototype._getComponentRootNode = /**
     * Gets the root HTMLElement for an instantiated component.
     * @private
     * @param {?} componentRef
     * @return {?}
     */
    function (componentRef) {
        return (/** @type {?} */ (((/** @type {?} */ (componentRef.hostView))).rootNodes[0]));
    };
    return DomPortalHost;
}(BasePortalHost));
/**
 * A PortalHost for attaching portals to an arbitrary DOM element outside of the Angular
 * application context.
 *
 * This is the only part of the portal core that directly touches the DOM.
 */
export { DomPortalHost };
if (false) {
    /**
     * @type {?}
     * @private
     */
    DomPortalHost.prototype._hostDomElement;
    /**
     * @type {?}
     * @private
     */
    DomPortalHost.prototype._componentFactoryResolver;
    /**
     * @type {?}
     * @private
     */
    DomPortalHost.prototype._appRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tLXBvcnRhbC1ob3N0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC11aS8iLCJzb3VyY2VzIjpbInNyYy9ub3RpZnkvcG9ydGFsL2RvbS1wb3J0YWwtaG9zdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQU1BLE9BQU8sRUFBRSxjQUFjLEVBQW1CLE1BQU0sVUFBVSxDQUFDOzs7Ozs7O0FBUTNEOzs7Ozs7O0lBQW1DLHlDQUFjO0lBQy9DLHVCQUNVLGVBQXdCLEVBQ3hCLHlCQUFtRCxFQUNuRCxPQUF1QjtRQUhqQyxZQUtFLGlCQUFPLFNBQ1I7UUFMUyxxQkFBZSxHQUFmLGVBQWUsQ0FBUztRQUN4QiwrQkFBeUIsR0FBekIseUJBQXlCLENBQTBCO1FBQ25ELGFBQU8sR0FBUCxPQUFPLENBQWdCOztJQUdqQyxDQUFDO0lBRUQ7OztPQUdHOzs7Ozs7OztJQUNILDZDQUFxQjs7Ozs7OztJQUFyQixVQUNFLE1BQTBCLEVBQzFCLFdBQW9CO1FBRnRCLGlCQXlDQzs7WUFyQ08sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLHlCQUF5QixDQUFDLHVCQUF1QixDQUM3RSxNQUFNLENBQUMsU0FBUyxDQUNqQjs7WUFDRyxZQUE2QjtRQUVqQyx1RkFBdUY7UUFDdkYsMkVBQTJFO1FBQzNFLDRGQUE0RjtRQUM1RiwyRkFBMkY7UUFDM0YscURBQXFEO1FBQ3JELFlBQVksR0FBRyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRXhELHFGQUFxRjtRQUNyRix1RkFBdUY7UUFDdkYsb0ZBQW9GO1FBQ3BGLHdDQUF3QztRQUN4QyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFL0MsSUFBSSxDQUFDLFlBQVk7OztRQUFDO1lBQ2hCLEtBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUMvQyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDekIsQ0FBQyxFQUFDLENBQUM7UUFFSCw4RkFBOEY7UUFDOUYsbUNBQW1DO1FBQ25DLElBQUksV0FBVyxFQUFFO1lBQ2YsSUFBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQy9CLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxZQUFZLENBQUMsRUFDeEMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQ2hDLENBQUM7U0FDSDthQUFNO1lBQ0wsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQzlCLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxZQUFZLENBQUMsQ0FDekMsQ0FBQztTQUNIO1FBRUQsT0FBTyxZQUFZLENBQUM7SUFDdEIsQ0FBQztJQUVELCtEQUErRDs7Ozs7OztJQUN2RCw2Q0FBcUI7Ozs7OztJQUE3QixVQUE4QixZQUErQjtRQUMzRCxPQUFPLG1CQUFBLENBQUMsbUJBQUEsWUFBWSxDQUFDLFFBQVEsRUFBd0IsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBZSxDQUFDO0lBQ3JGLENBQUM7SUFDSCxvQkFBQztBQUFELENBQUMsQUE1REQsQ0FBbUMsY0FBYyxHQTREaEQ7Ozs7Ozs7Ozs7Ozs7SUExREcsd0NBQWdDOzs7OztJQUNoQyxrREFBMkQ7Ozs7O0lBQzNELGdDQUErQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFwcGxpY2F0aW9uUmVmLFxuICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gIENvbXBvbmVudFJlZixcbiAgRW1iZWRkZWRWaWV3UmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJhc2VQb3J0YWxIb3N0LCBDb21wb25lbnRQb3J0YWwgfSBmcm9tICcuL3BvcnRhbCc7XG5cbi8qKlxuICogQSBQb3J0YWxIb3N0IGZvciBhdHRhY2hpbmcgcG9ydGFscyB0byBhbiBhcmJpdHJhcnkgRE9NIGVsZW1lbnQgb3V0c2lkZSBvZiB0aGUgQW5ndWxhclxuICogYXBwbGljYXRpb24gY29udGV4dC5cbiAqXG4gKiBUaGlzIGlzIHRoZSBvbmx5IHBhcnQgb2YgdGhlIHBvcnRhbCBjb3JlIHRoYXQgZGlyZWN0bHkgdG91Y2hlcyB0aGUgRE9NLlxuICovXG5leHBvcnQgY2xhc3MgRG9tUG9ydGFsSG9zdCBleHRlbmRzIEJhc2VQb3J0YWxIb3N0IHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfaG9zdERvbUVsZW1lbnQ6IEVsZW1lbnQsXG4gICAgcHJpdmF0ZSBfY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgcHJpdmF0ZSBfYXBwUmVmOiBBcHBsaWNhdGlvblJlZixcbiAgKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggdGhlIGdpdmVuIENvbXBvbmVudFBvcnRhbCB0byBET00gZWxlbWVudCB1c2luZyB0aGUgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLlxuICAgKiBAcGFyYW0gcG9ydGFsIFBvcnRhbCB0byBiZSBhdHRhY2hlZFxuICAgKi9cbiAgYXR0YWNoQ29tcG9uZW50UG9ydGFsPFQ+KFxuICAgIHBvcnRhbDogQ29tcG9uZW50UG9ydGFsPFQ+LFxuICAgIG5ld2VzdE9uVG9wOiBib29sZWFuLFxuICApOiBDb21wb25lbnRSZWY8VD4ge1xuICAgIGNvbnN0IGNvbXBvbmVudEZhY3RvcnkgPSB0aGlzLl9jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoXG4gICAgICBwb3J0YWwuY29tcG9uZW50LFxuICAgICk7XG4gICAgbGV0IGNvbXBvbmVudFJlZjogQ29tcG9uZW50UmVmPFQ+O1xuXG4gICAgLy8gSWYgdGhlIHBvcnRhbCBzcGVjaWZpZXMgYSBWaWV3Q29udGFpbmVyUmVmLCB3ZSB3aWxsIHVzZSB0aGF0IGFzIHRoZSBhdHRhY2htZW50IHBvaW50XG4gICAgLy8gZm9yIHRoZSBjb21wb25lbnQgKGluIHRlcm1zIG9mIEFuZ3VsYXIncyBjb21wb25lbnQgdHJlZSwgbm90IHJlbmRlcmluZykuXG4gICAgLy8gV2hlbiB0aGUgVmlld0NvbnRhaW5lclJlZiBpcyBtaXNzaW5nLCB3ZSB1c2UgdGhlIGZhY3RvcnkgdG8gY3JlYXRlIHRoZSBjb21wb25lbnQgZGlyZWN0bHlcbiAgICAvLyBhbmQgdGhlbiBtYW51YWxseSBhdHRhY2ggdGhlIENoYW5nZURldGVjdG9yIGZvciB0aGF0IGNvbXBvbmVudCB0byB0aGUgYXBwbGljYXRpb24gKHdoaWNoXG4gICAgLy8gaGFwcGVucyBhdXRvbWF0aWNhbGx5IHdoZW4gdXNpbmcgYSBWaWV3Q29udGFpbmVyKS5cbiAgICBjb21wb25lbnRSZWYgPSBjb21wb25lbnRGYWN0b3J5LmNyZWF0ZShwb3J0YWwuaW5qZWN0b3IpO1xuXG4gICAgLy8gV2hlbiBjcmVhdGluZyBhIGNvbXBvbmVudCBvdXRzaWRlIG9mIGEgVmlld0NvbnRhaW5lciwgd2UgbmVlZCB0byBtYW51YWxseSByZWdpc3RlclxuICAgIC8vIGl0cyBDaGFuZ2VEZXRlY3RvciB3aXRoIHRoZSBhcHBsaWNhdGlvbi4gVGhpcyBBUEkgaXMgdW5mb3J0dW5hdGVseSBub3QgeWV0IHB1Ymxpc2hlZFxuICAgIC8vIGluIEFuZ3VsYXIgY29yZS4gVGhlIGNoYW5nZSBkZXRlY3RvciBtdXN0IGFsc28gYmUgZGVyZWdpc3RlcmVkIHdoZW4gdGhlIGNvbXBvbmVudFxuICAgIC8vIGlzIGRlc3Ryb3llZCB0byBwcmV2ZW50IG1lbW9yeSBsZWFrcy5cbiAgICB0aGlzLl9hcHBSZWYuYXR0YWNoVmlldyhjb21wb25lbnRSZWYuaG9zdFZpZXcpO1xuXG4gICAgdGhpcy5zZXREaXNwb3NlRm4oKCkgPT4ge1xuICAgICAgdGhpcy5fYXBwUmVmLmRldGFjaFZpZXcoY29tcG9uZW50UmVmLmhvc3RWaWV3KTtcbiAgICAgIGNvbXBvbmVudFJlZi5kZXN0cm95KCk7XG4gICAgfSk7XG5cbiAgICAvLyBBdCB0aGlzIHBvaW50IHRoZSBjb21wb25lbnQgaGFzIGJlZW4gaW5zdGFudGlhdGVkLCBzbyB3ZSBtb3ZlIGl0IHRvIHRoZSBsb2NhdGlvbiBpbiB0aGUgRE9NXG4gICAgLy8gd2hlcmUgd2Ugd2FudCBpdCB0byBiZSByZW5kZXJlZC5cbiAgICBpZiAobmV3ZXN0T25Ub3ApIHtcbiAgICAgIHRoaXMuX2hvc3REb21FbGVtZW50Lmluc2VydEJlZm9yZShcbiAgICAgICAgdGhpcy5fZ2V0Q29tcG9uZW50Um9vdE5vZGUoY29tcG9uZW50UmVmKSxcbiAgICAgICAgdGhpcy5faG9zdERvbUVsZW1lbnQuZmlyc3RDaGlsZCxcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2hvc3REb21FbGVtZW50LmFwcGVuZENoaWxkKFxuICAgICAgICB0aGlzLl9nZXRDb21wb25lbnRSb290Tm9kZShjb21wb25lbnRSZWYpLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY29tcG9uZW50UmVmO1xuICB9XG5cbiAgLyoqIEdldHMgdGhlIHJvb3QgSFRNTEVsZW1lbnQgZm9yIGFuIGluc3RhbnRpYXRlZCBjb21wb25lbnQuICovXG4gIHByaXZhdGUgX2dldENvbXBvbmVudFJvb3ROb2RlKGNvbXBvbmVudFJlZjogQ29tcG9uZW50UmVmPGFueT4pOiBIVE1MRWxlbWVudCB7XG4gICAgcmV0dXJuIChjb21wb25lbnRSZWYuaG9zdFZpZXcgYXMgRW1iZWRkZWRWaWV3UmVmPGFueT4pLnJvb3ROb2Rlc1swXSBhcyBIVE1MRWxlbWVudDtcbiAgfVxufVxuIl19