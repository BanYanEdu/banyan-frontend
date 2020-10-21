/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, ElementRef } from '@angular/core';
import { AbstractSideNavComponent } from "../abstract-side-nav.component";
import { Router } from "@angular/router";
import { CoreService } from "inet-core";
var AppSideNavComponent = /** @class */ (function (_super) {
    tslib_1.__extends(AppSideNavComponent, _super);
    function AppSideNavComponent(coreService, router, elementRef) {
        var _this = _super.call(this, elementRef) || this;
        _this.coreService = coreService;
        _this.router = router;
        _this.elementRef = elementRef;
        _this.applications = [];
        _this.widgetApps = [];
        _this.systemUrl = 'about:blank';
        _this.SYSTEM_APPS = ['social', 'calendar'];
        _this.listApp();
        return _this;
    }
    /**
     * @return {?}
     */
    AppSideNavComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        window.addEventListener('message', (/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            /** @type {?} */
            var __data = e.data || {};
            /** @type {?} */
            var __eventName = __data['eventName'];
            /** @type {?} */
            var __result = {};
            if (!iNet.isEmpty(__data.result)) {
                if (typeof (__data.result) === 'string') {
                    __result = JSON.parse(__data.result);
                }
                else if (typeof (__data.result) === 'object') {
                    __result = __data.result || {};
                }
                //console.log('[message]', __result);
                switch (__eventName) {
                    case 'open':
                    case 'openApp':
                        _this.openApp(__result['application']);
                        _this.close();
                        break;
                    case 'openUrl':
                        window.location.href = iNet.getSSOUrl(__result['url']);
                        break;
                    case 'loaded':
                        /** @type {?} */
                        var iFrame = document.querySelectorAll("iframe[src=\"" + __result['src'] + "\"]")[0];
                        if (iFrame) {
                            iFrame['height'] = __result['height'];
                            iFrame['valid'] = true;
                        }
                        break;
                }
            }
        }), false);
    };
    /**
     * @return {?}
     */
    AppSideNavComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.close();
        if (this._router) {
            this._router.unsubscribe();
        }
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    AppSideNavComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var _this = this;
        /** @type {?} */
        var currentValue = changes['opened']["currentValue"];
        setTimeout((/**
         * @return {?}
         */
        function () {
            if (currentValue) {
                _this.systemUrl = iNet.getPUrl('common/page/apps') + '?appname=system';
                _this.open();
            }
            else {
                _this.close();
            }
        }), 250);
    };
    /**
     * @private
     * @return {?}
     */
    AppSideNavComponent.prototype.listApp = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.coreService.getSystemApplication().subscribe((/**
         * @param {?} apps
         * @return {?}
         */
        function (apps) {
            _this.applications = apps
                .filter((/**
             * @param {?} app
             * @return {?}
             */
            function (app) { return (app.organId !== 'community' && app.firmContext); }))
                .map((/**
             * @param {?} application
             * @return {?}
             */
            function (application) {
                if (application.homepage.indexOf('http') < 0) {
                    application.homepage = iNet.getPUrl(application.module + "/" + application.homepage);
                    application.icon = _this.coreService.getFileServerPath() + "/images/" + application.module + "/" + application.icon;
                }
                if (!!application.widget) {
                    application.widget = iNet.getPUrl('common/page/apps') + "?appname=" + application.firmContext; //rebuild the widget url
                }
                return application;
            }));
            _this.widgetApps = _this.applications.filter((/**
             * @param {?} app
             * @return {?}
             */
            function (app) { return (!!app.widget); }));
        }));
    };
    /**
     * @param {?} app
     * @return {?}
     */
    AppSideNavComponent.prototype.openApp = /**
     * @param {?} app
     * @return {?}
     */
    function (app) {
        if (this.SYSTEM_APPS.includes(app)) { //system app
            this.router.navigate([app]);
        }
        else {
            /** @type {?} */
            var url = iNet.getSSOUrl(this.getUrlByContext(app));
            if (url) {
                window.location.href = url;
            }
        }
    };
    /**
     * @private
     * @param {?} content
     * @return {?}
     */
    AppSideNavComponent.prototype.getUrlByContext = /**
     * @private
     * @param {?} content
     * @return {?}
     */
    function (content) {
        /** @type {?} */
        var app = this.applications.find((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var webContext = _a.webContext;
            return webContext === content;
        }));
        return app ? app.homepage : null;
    };
    AppSideNavComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-admin-app-side-nav',
                    template: "<div class=\"slide-nav\" [ngClass]=\"{'opened': opened}\">\n    <ul class=\"list-box list-app\" *ngIf=\"opened\">\n        <iframe id=\"system-app-iframe\" [src]=\"systemUrl | safe\" scrolling=\"no\"></iframe>\n        <iframe *ngFor=\"let widgetApp of widgetApps\" [src]=\"widgetApp.widget | safe\" scrolling=\"no\"></iframe>\n    </ul>\n</div>\n",
                    styles: ["\n        iframe {\n            width: 100%;\n            border: none;\n            overflow: hidden;\n        }\n    "]
                }] }
    ];
    /** @nocollapse */
    AppSideNavComponent.ctorParameters = function () { return [
        { type: CoreService },
        { type: Router },
        { type: ElementRef }
    ]; };
    return AppSideNavComponent;
}(AbstractSideNavComponent));
export { AppSideNavComponent };
if (false) {
    /**
     * @type {?}
     * @private
     */
    AppSideNavComponent.prototype._router;
    /** @type {?} */
    AppSideNavComponent.prototype.applications;
    /** @type {?} */
    AppSideNavComponent.prototype.widgetApps;
    /** @type {?} */
    AppSideNavComponent.prototype.systemUrl;
    /** @type {?} */
    AppSideNavComponent.prototype.SYSTEM_APPS;
    /**
     * @type {?}
     * @private
     */
    AppSideNavComponent.prototype.coreService;
    /**
     * @type {?}
     * @private
     */
    AppSideNavComponent.prototype.router;
    /** @type {?} */
    AppSideNavComponent.prototype.elementRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXNpZGUtbmF2LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtdWkvIiwic291cmNlcyI6WyJzcmMvbGF5b3V0L2Jvb3RzdHJhcC9hcHAtc2lkZS1uYXYvYXBwLXNpZGUtbmF2LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQUUsVUFBVSxFQUN4QixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQztBQUd4RSxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDdkMsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLFdBQVcsQ0FBQztBQUl0QztJQVd5QywrQ0FBd0I7SUFRN0QsNkJBQ1ksV0FBd0IsRUFDeEIsTUFBYyxFQUNmLFVBQXNCO1FBSGpDLFlBSUksa0JBQU0sVUFBVSxDQUFDLFNBR3BCO1FBTlcsaUJBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsWUFBTSxHQUFOLE1BQU0sQ0FBUTtRQUNmLGdCQUFVLEdBQVYsVUFBVSxDQUFZO1FBUmpDLGtCQUFZLEdBQTZCLEVBQUUsQ0FBQztRQUM1QyxnQkFBVSxHQUE4QixFQUFFLENBQUM7UUFDM0MsZUFBUyxHQUFXLGFBQWEsQ0FBQztRQUNsQyxpQkFBVyxHQUFHLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBUWpDLEtBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQzs7SUFDbkIsQ0FBQzs7OztJQUVELHNDQUFROzs7SUFBUjtRQUFBLGlCQWdDQztRQS9CRyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsU0FBUzs7OztRQUFFLFVBQUMsQ0FBQzs7Z0JBQzdCLE1BQU0sR0FBRyxDQUFDLENBQUMsSUFBSSxJQUFJLEVBQUU7O2dCQUNyQixXQUFXLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQzs7Z0JBQ2pDLFFBQVEsR0FBRyxFQUFFO1lBQ2pCLElBQUks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LENBQXNCLEVBQUM7UUFDNUUsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUNyQyxDQUFDOztnQkFqSEosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSx3QkFBd0I7b0JBQ2xDLHVXQUE0Qzs2QkFDbkMseUhBTVI7aUJBQ0o7Ozs7Z0JBZE8sV0FBVztnQkFEWCxNQUFNO2dCQUxDLFVBQVU7O0lBNEh6QiwwQkFBQztDQUFBLEFBbEhELENBV3lDLHdCQUF3QixHQXVHaEU7U0F2R1ksbUJBQW1COzs7Ozs7SUFFNUIsc0NBQThCOztJQUM5QiwyQ0FBNEM7O0lBQzVDLHlDQUEyQzs7SUFDM0Msd0NBQWtDOztJQUNsQywwQ0FBcUM7Ozs7O0lBR2pDLDBDQUFnQzs7Ozs7SUFDaEMscUNBQXNCOztJQUN0Qix5Q0FBNkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENvbXBvbmVudCwgRWxlbWVudFJlZiwgT25EZXN0cm95LCBPbkluaXQsIFNpbXBsZUNoYW5nZXNcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Fic3RyYWN0U2lkZU5hdkNvbXBvbmVudH0gZnJvbSBcIi4uL2Fic3RyYWN0LXNpZGUtbmF2LmNvbXBvbmVudFwiO1xuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gXCJyeGpzXCI7XG5pbXBvcnQge1N5c3RlbUFwcGxpY2F0aW9ufSBmcm9tIFwiLi4vLi4vLi4vbW9kZWxcIjtcbmltcG9ydCB7Um91dGVyfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQge0NvcmVTZXJ2aWNlfSBmcm9tIFwiaW5ldC1jb3JlXCI7XG5cbmRlY2xhcmUgbGV0IGlOZXQ6IGFueTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhcHAtYWRtaW4tYXBwLXNpZGUtbmF2JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vYXBwLXNpZGUtbmF2LmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZXM6IFtgXG4gICAgICAgIGlmcmFtZSB7XG4gICAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICAgIGJvcmRlcjogbm9uZTtcbiAgICAgICAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICAgIH1cbiAgICBgXVxufSlcbmV4cG9ydCBjbGFzcyBBcHBTaWRlTmF2Q29tcG9uZW50IGV4dGVuZHMgQWJzdHJhY3RTaWRlTmF2Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAgIC8vcHJpdmF0ZSBsb2FkZWQgPSBmYWxzZTtcbiAgICBwcml2YXRlIF9yb3V0ZXI6IFN1YnNjcmlwdGlvbjtcbiAgICBhcHBsaWNhdGlvbnM6IEFycmF5PFN5c3RlbUFwcGxpY2F0aW9uPiA9IFtdO1xuICAgIHdpZGdldEFwcHMgOiBBcnJheTxTeXN0ZW1BcHBsaWNhdGlvbj4gPSBbXTtcbiAgICBzeXN0ZW1Vcmw6IHN0cmluZyA9ICdhYm91dDpibGFuayc7XG4gICAgU1lTVEVNX0FQUFMgPSBbJ3NvY2lhbCcsICdjYWxlbmRhciddO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgY29yZVNlcnZpY2U6IENvcmVTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxuICAgICAgICBwdWJsaWMgZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICAgICAgICBzdXBlcihlbGVtZW50UmVmKTtcblxuICAgICAgICB0aGlzLmxpc3RBcHAoKTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCAoZSkgPT4ge1xuICAgICAgICAgICAgdmFyIF9fZGF0YSA9IGUuZGF0YSB8fCB7fTtcbiAgICAgICAgICAgIHZhciBfX2V2ZW50TmFtZSA9IF9fZGF0YVsnZXZlbnROYW1lJ107XG4gICAgICAgICAgICB2YXIgX19yZXN1bHQgPSB7fTtcbiAgICAgICAgICAgIGlmICghaU5ldC5pc0VtcHR5KF9fZGF0YS5yZXN1bHQpKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiAoX19kYXRhLnJlc3VsdCkgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIF9fcmVzdWx0ID0gSlNPTi5wYXJzZShfX2RhdGEucmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiAoX19kYXRhLnJlc3VsdCkgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgICAgIF9fcmVzdWx0ID0gX19kYXRhLnJlc3VsdCB8fCB7fTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnW21lc3NhZ2VdJywgX19yZXN1bHQpO1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX19ldmVudE5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnb3Blbic6XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ29wZW5BcHAnOlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGVuQXBwKF9fcmVzdWx0WydhcHBsaWNhdGlvbiddKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdvcGVuVXJsJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gaU5ldC5nZXRTU09VcmwoX19yZXN1bHRbJ3VybCddKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdsb2FkZWQnOlxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaUZyYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgaWZyYW1lW3NyYz1cIiR7X19yZXN1bHRbJ3NyYyddfVwiXWApWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoaUZyYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaUZyYW1lWydoZWlnaHQnXT1fX3Jlc3VsdFsnaGVpZ2h0J107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaUZyYW1lWyd2YWxpZCddID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LCBmYWxzZSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgaWYgKHRoaXMuX3JvdXRlcikge1xuICAgICAgICAgICAgdGhpcy5fcm91dGVyLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9IGNoYW5nZXNbJ29wZW5lZCddW1wiY3VycmVudFZhbHVlXCJdO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50VmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN5c3RlbVVybCA9IGlOZXQuZ2V0UFVybCgnY29tbW9uL3BhZ2UvYXBwcycpICsgJz9hcHBuYW1lPXN5c3RlbSc7XG4gICAgICAgICAgICAgICAgdGhpcy5vcGVuKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgMjUwKVxuICAgIH1cblxuICAgIHByaXZhdGUgbGlzdEFwcCgpe1xuICAgICAgICB0aGlzLmNvcmVTZXJ2aWNlLmdldFN5c3RlbUFwcGxpY2F0aW9uKCkuc3Vic2NyaWJlKChhcHBzOiBBcnJheTxTeXN0ZW1BcHBsaWNhdGlvbj4pID0+IHtcbiAgICAgICAgICAgIHRoaXMuYXBwbGljYXRpb25zID0gYXBwc1xuICAgICAgICAgICAgICAgIC5maWx0ZXIoKGFwcDogU3lzdGVtQXBwbGljYXRpb24pID0+IChhcHAub3JnYW5JZCAhPT0gJ2NvbW11bml0eScgJiYgYXBwLmZpcm1Db250ZXh0KSlcbiAgICAgICAgICAgICAgICAubWFwKChhcHBsaWNhdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoYXBwbGljYXRpb24uaG9tZXBhZ2UuaW5kZXhPZignaHR0cCcpIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXBwbGljYXRpb24uaG9tZXBhZ2UgPSBpTmV0LmdldFBVcmwoYCR7YXBwbGljYXRpb24ubW9kdWxlfS8ke2FwcGxpY2F0aW9uLmhvbWVwYWdlfWApO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXBwbGljYXRpb24uaWNvbiA9IGAke3RoaXMuY29yZVNlcnZpY2UuZ2V0RmlsZVNlcnZlclBhdGgoKX0vaW1hZ2VzLyR7YXBwbGljYXRpb24ubW9kdWxlfS8ke2FwcGxpY2F0aW9uLmljb259YDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZighIWFwcGxpY2F0aW9uLndpZGdldCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXBwbGljYXRpb24ud2lkZ2V0ID0gYCR7aU5ldC5nZXRQVXJsKCdjb21tb24vcGFnZS9hcHBzJyl9P2FwcG5hbWU9JHthcHBsaWNhdGlvbi5maXJtQ29udGV4dH1gOyAvL3JlYnVpbGQgdGhlIHdpZGdldCB1cmxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYXBwbGljYXRpb247XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLndpZGdldEFwcHMgPSB0aGlzLmFwcGxpY2F0aW9ucy5maWx0ZXIoKGFwcDogU3lzdGVtQXBwbGljYXRpb24pID0+ICghIWFwcC53aWRnZXQpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb3BlbkFwcChhcHA6IHN0cmluZykge1xuICAgICAgICBpZiAodGhpcy5TWVNURU1fQVBQUy5pbmNsdWRlcyhhcHApKSB7IC8vc3lzdGVtIGFwcFxuICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW2FwcF0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgdXJsID0gaU5ldC5nZXRTU09VcmwodGhpcy5nZXRVcmxCeUNvbnRleHQoYXBwKSk7XG4gICAgICAgICAgICBpZiAodXJsKSB7XG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSB1cmw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFVybEJ5Q29udGV4dChjb250ZW50OiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgYXBwID0gdGhpcy5hcHBsaWNhdGlvbnMuZmluZCgoe3dlYkNvbnRleHR9KSA9PiB3ZWJDb250ZXh0ID09PSBjb250ZW50KTtcbiAgICAgICAgcmV0dXJuIGFwcCA/IGFwcC5ob21lcGFnZSA6IG51bGw7XG4gICAgfVxufVxuIl19