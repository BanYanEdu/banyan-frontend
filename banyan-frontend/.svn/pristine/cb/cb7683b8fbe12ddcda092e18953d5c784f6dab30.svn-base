/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PluginManagerService } from "./plugin-manager.service";
import { CoreService } from "inet-core";
var CloudPluginComponent = /** @class */ (function () {
    function CloudPluginComponent(coreService, pluginManagerService) {
        this.coreService = coreService;
        this.pluginManagerService = pluginManagerService;
        this.params = {};
        this.autoHeight = false;
        this.load = new EventEmitter();
    }
    /**
     * @return {?}
     */
    CloudPluginComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.pluginManagerService.register(this.pluginId, this);
        if (!iNet.isEmptyObject(this.params)) {
            // const __params = this.pluginManagerService.convertToHttpParams(this.params).toString();
            /** @type {?} */
            var __params = this.pluginManagerService.convertToHttpParams({
                application: this.params['application'],
                secrd: this.params['queryStr']
            }).toString();
            this.url = iNet.urlAppend(this.url, __params);
        }
    };
    /**
     * @return {?}
     */
    CloudPluginComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.pluginManagerService.destroyById(this.pluginId);
        // console.log('[CloudPluginComponent]--ngOnDestroy--', this.pluginId);
    };
    /**
     * @private
     * @return {?}
     */
    CloudPluginComponent.prototype.getContentWindow = /**
     * @private
     * @return {?}
     */
    function () {
        return this.pluginManagerService.getContentWindowById(this.pluginId);
    };
    /**
     * @return {?}
     */
    CloudPluginComponent.prototype.reload = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.getContentWindow().then((/**
         * @param {?} contentWindow
         * @return {?}
         */
        function (contentWindow) {
            if (contentWindow && _this.coreService.getEnvironment().production) {
                contentWindow['location'].reload(true);
            }
        }));
    };
    /**
     * @return {?}
     */
    CloudPluginComponent.prototype.resize = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // console.log('[resize]');
        if (this.autoHeight && this.coreService.getEnvironment().production) {
            this.getContentWindow().then((/**
             * @param {?} contentWindow
             * @return {?}
             */
            function (contentWindow) {
                if (contentWindow) {
                    /** @type {?} */
                    var height = contentWindow['document']['body']['offsetHeight'] || contentWindow['document']['body']['scrollHeight'];
                    if (height) {
                        document.getElementById(_this.pluginId).style.height = height + "px";
                    }
                }
            }));
        }
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    CloudPluginComponent.prototype.onLoad = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        var _this = this;
        if (document.getElementById(this.pluginId)) {
            this.getContentWindow().then((/**
             * @param {?} contentWindow
             * @return {?}
             */
            function (contentWindow) {
                if (contentWindow) {
                    _this.resize();
                    // The plugin has finished loading
                    // console.log('[onLoad]--pluginId', this.pluginId, contentWindow);
                    // this.pluginManagerService.sendMessageTo({pluginId: this.pluginId, eventName: 'loaded'}, contentWindow);
                    setTimeout((/**
                     * @return {?}
                     */
                    function () {
                        _this.pluginManagerService.sendMessageTo({ pluginId: _this.pluginId, eventName: 'loaded' }, contentWindow);
                    }), 100);
                }
            }));
        }
    };
    CloudPluginComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-cloud-plugin',
                    template: "<iframe *ngIf=\"pluginId && url\" id=\"{{pluginId}}\" [src]=\"url | safe\" (load)=\"onLoad($event)\"></iframe>",
                    styles: ["\n        iframe {\n            width: 100%;\n            height: 100%;\n            border: none;\n        }\n    "]
                }] }
    ];
    /** @nocollapse */
    CloudPluginComponent.ctorParameters = function () { return [
        { type: CoreService },
        { type: PluginManagerService }
    ]; };
    CloudPluginComponent.propDecorators = {
        pluginId: [{ type: Input }],
        url: [{ type: Input }],
        params: [{ type: Input }],
        autoHeight: [{ type: Input }],
        load: [{ type: Output }]
    };
    return CloudPluginComponent;
}());
export { CloudPluginComponent };
if (false) {
    /** @type {?} */
    CloudPluginComponent.prototype.pluginId;
    /** @type {?} */
    CloudPluginComponent.prototype.url;
    /** @type {?} */
    CloudPluginComponent.prototype.params;
    /** @type {?} */
    CloudPluginComponent.prototype.autoHeight;
    /** @type {?} */
    CloudPluginComponent.prototype.load;
    /**
     * @type {?}
     * @private
     */
    CloudPluginComponent.prototype.coreService;
    /**
     * @type {?}
     * @private
     */
    CloudPluginComponent.prototype.pluginManagerService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvdWQtcGx1Z2luLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtdWkvIiwic291cmNlcyI6WyJzcmMvcGx1Z2luLW1hbmFnZXIvY2xvdWQtcGx1Z2luLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLFlBQVksRUFBWSxNQUFNLGVBQWUsQ0FBQztBQUN4RixPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUM5RCxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sV0FBVyxDQUFDO0FBR3RDO0lBaUJJLDhCQUFxQixXQUF3QixFQUN4QixvQkFBMEM7UUFEMUMsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQUp0RCxXQUFNLEdBQVEsRUFBRSxDQUFDO1FBQ2pCLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFDbEIsU0FBSSxHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7SUFHMUMsQ0FBQzs7OztJQUNELHVDQUFROzs7SUFBUjtRQUNJLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN4RCxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUU7OztnQkFFNUIsUUFBUSxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxtQkFBbUIsQ0FBQztnQkFDM0QsV0FBVyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDO2dCQUN2QyxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUM7YUFDakMsQ0FBQyxDQUFDLFFBQVEsRUFBRTtZQUNiLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FB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dXRwdXQsIEV2ZW50RW1pdHRlciwgT25EZXN0cm95fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7UGx1Z2luTWFuYWdlclNlcnZpY2V9IGZyb20gXCIuL3BsdWdpbi1tYW5hZ2VyLnNlcnZpY2VcIjtcbmltcG9ydCB7Q29yZVNlcnZpY2V9IGZyb20gXCJpbmV0LWNvcmVcIjtcbmRlY2xhcmUgbGV0IGlOZXQ6IGFueTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhcHAtY2xvdWQtcGx1Z2luJyxcbiAgICBzdHlsZXM6IFtgXG4gICAgICAgIGlmcmFtZSB7XG4gICAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgICAgIGJvcmRlcjogbm9uZTtcbiAgICAgICAgfVxuICAgIGBdLFxuICAgIHRlbXBsYXRlOiBgPGlmcmFtZSAqbmdJZj1cInBsdWdpbklkICYmIHVybFwiIGlkPVwie3twbHVnaW5JZH19XCIgW3NyY109XCJ1cmwgfCBzYWZlXCIgKGxvYWQpPVwib25Mb2FkKCRldmVudClcIj48L2lmcmFtZT5gXG59KVxuZXhwb3J0IGNsYXNzIENsb3VkUGx1Z2luQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAgIEBJbnB1dCgpIHBsdWdpbklkOiBzdHJpbmc7XG4gICAgQElucHV0KCkgdXJsOiBzdHJpbmc7XG4gICAgQElucHV0KCkgcGFyYW1zOiBhbnkgPSB7fTtcbiAgICBASW5wdXQoKSBhdXRvSGVpZ2h0ID0gZmFsc2U7XG4gICAgQE91dHB1dCgpIGxvYWQgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gICAgY29uc3RydWN0b3IoIHByaXZhdGUgY29yZVNlcnZpY2U6IENvcmVTZXJ2aWNlLFxuICAgICAgICAgICAgICAgICBwcml2YXRlIHBsdWdpbk1hbmFnZXJTZXJ2aWNlOiBQbHVnaW5NYW5hZ2VyU2VydmljZSkge1xuICAgIH1cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5wbHVnaW5NYW5hZ2VyU2VydmljZS5yZWdpc3Rlcih0aGlzLnBsdWdpbklkLCB0aGlzKTtcbiAgICAgICAgaWYgKCFpTmV0LmlzRW1wdHlPYmplY3QodGhpcy5wYXJhbXMpKSB7XG4gICAgICAgICAgICAvLyBjb25zdCBfX3BhcmFtcyA9IHRoaXMucGx1Z2luTWFuYWdlclNlcnZpY2UuY29udmVydFRvSHR0cFBhcmFtcyh0aGlzLnBhcmFtcykudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIGNvbnN0IF9fcGFyYW1zID0gdGhpcy5wbHVnaW5NYW5hZ2VyU2VydmljZS5jb252ZXJ0VG9IdHRwUGFyYW1zKHtcbiAgICAgICAgICAgICAgICBhcHBsaWNhdGlvbjogdGhpcy5wYXJhbXNbJ2FwcGxpY2F0aW9uJ10sXG4gICAgICAgICAgICAgICAgc2VjcmQ6IHRoaXMucGFyYW1zWydxdWVyeVN0ciddXG4gICAgICAgICAgICB9KS50b1N0cmluZygpO1xuICAgICAgICAgICAgdGhpcy51cmwgPSBpTmV0LnVybEFwcGVuZCh0aGlzLnVybCAsIF9fcGFyYW1zKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLnBsdWdpbk1hbmFnZXJTZXJ2aWNlLmRlc3Ryb3lCeUlkKHRoaXMucGx1Z2luSWQpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnW0Nsb3VkUGx1Z2luQ29tcG9uZW50XS0tbmdPbkRlc3Ryb3ktLScsIHRoaXMucGx1Z2luSWQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0Q29udGVudFdpbmRvdygpOiBQcm9taXNlPFdpbmRvdyB8IERvY3VtZW50PiB7XG4gICAgICAgIHJldHVybiB0aGlzLnBsdWdpbk1hbmFnZXJTZXJ2aWNlLmdldENvbnRlbnRXaW5kb3dCeUlkKHRoaXMucGx1Z2luSWQpO1xuICAgIH1cblxuICAgIHJlbG9hZCgpIHtcbiAgICAgICAgdGhpcy5nZXRDb250ZW50V2luZG93KCkudGhlbihjb250ZW50V2luZG93ID0+IHtcbiAgICAgICAgICAgIGlmIChjb250ZW50V2luZG93ICYmIHRoaXMuY29yZVNlcnZpY2UuZ2V0RW52aXJvbm1lbnQoKS5wcm9kdWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgY29udGVudFdpbmRvd1snbG9jYXRpb24nXS5yZWxvYWQodHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlc2l6ZSgpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ1tyZXNpemVdJyk7XG4gICAgICAgIGlmICh0aGlzLmF1dG9IZWlnaHQgJiYgdGhpcy5jb3JlU2VydmljZS5nZXRFbnZpcm9ubWVudCgpLnByb2R1Y3Rpb24pIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0Q29udGVudFdpbmRvdygpLnRoZW4oY29udGVudFdpbmRvdyA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGNvbnRlbnRXaW5kb3cpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaGVpZ2h0ID0gY29udGVudFdpbmRvd1snZG9jdW1lbnQnXVsnYm9keSddWydvZmZzZXRIZWlnaHQnXSB8fCBjb250ZW50V2luZG93Wydkb2N1bWVudCddWydib2R5J11bJ3Njcm9sbEhlaWdodCddO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLnBsdWdpbklkKS5zdHlsZS5oZWlnaHQgPSBgJHtoZWlnaHR9cHhgO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkxvYWQoJGV2ZW50KSB7XG4gICAgICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLnBsdWdpbklkKSkge1xuICAgICAgICAgICAgdGhpcy5nZXRDb250ZW50V2luZG93KCkudGhlbihjb250ZW50V2luZG93ID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoY29udGVudFdpbmRvdykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc2l6ZSgpO1xuICAgICAgICAgICAgICAgICAgICAvLyBUaGUgcGx1Z2luIGhhcyBmaW5pc2hlZCBsb2FkaW5nXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdbb25Mb2FkXS0tcGx1Z2luSWQnLCB0aGlzLnBsdWdpbklkLCBjb250ZW50V2luZG93KTtcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5wbHVnaW5NYW5hZ2VyU2VydmljZS5zZW5kTWVzc2FnZVRvKHtwbHVnaW5JZDogdGhpcy5wbHVnaW5JZCwgZXZlbnROYW1lOiAnbG9hZGVkJ30sIGNvbnRlbnRXaW5kb3cpO1xuXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW5NYW5hZ2VyU2VydmljZS5zZW5kTWVzc2FnZVRvKHtwbHVnaW5JZDogdGhpcy5wbHVnaW5JZCwgZXZlbnROYW1lOiAnbG9hZGVkJ30sIGNvbnRlbnRXaW5kb3cpO1xuICAgICAgICAgICAgICAgICAgICB9LCAxMDApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19