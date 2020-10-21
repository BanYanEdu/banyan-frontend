/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef } from '@angular/core';
import { AbstractSideNavComponent } from "../abstract-side-nav.component";
import { Router } from "@angular/router";
import { CoreService } from "inet-core";
export class AppSideNavComponent extends AbstractSideNavComponent {
    /**
     * @param {?} coreService
     * @param {?} router
     * @param {?} elementRef
     */
    constructor(coreService, router, elementRef) {
        super(elementRef);
        this.coreService = coreService;
        this.router = router;
        this.elementRef = elementRef;
        this.applications = [];
        this.widgetApps = [];
        this.systemUrl = 'about:blank';
        this.SYSTEM_APPS = ['social', 'calendar'];
        this.listApp();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        window.addEventListener('message', (/**
         * @param {?} e
         * @return {?}
         */
        (e) => {
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
                        this.openApp(__result['application']);
                        this.close();
                        break;
                    case 'openUrl':
                        window.location.href = iNet.getSSOUrl(__result['url']);
                        break;
                    case 'loaded':
                        /** @type {?} */
                        const iFrame = document.querySelectorAll(`iframe[src="${__result['src']}"]`)[0];
                        if (iFrame) {
                            iFrame['height'] = __result['height'];
                            iFrame['valid'] = true;
                        }
                        break;
                }
            }
        }), false);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.close();
        if (this._router) {
            this._router.unsubscribe();
        }
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        /** @type {?} */
        const currentValue = changes['opened']["currentValue"];
        setTimeout((/**
         * @return {?}
         */
        () => {
            if (currentValue) {
                this.systemUrl = iNet.getPUrl('common/page/apps') + '?appname=system';
                this.open();
            }
            else {
                this.close();
            }
        }), 250);
    }
    /**
     * @private
     * @return {?}
     */
    listApp() {
        this.coreService.getSystemApplication().subscribe((/**
         * @param {?} apps
         * @return {?}
         */
        (apps) => {
            this.applications = apps
                .filter((/**
             * @param {?} app
             * @return {?}
             */
            (app) => (app.organId !== 'community' && app.firmContext)))
                .map((/**
             * @param {?} application
             * @return {?}
             */
            (application) => {
                if (application.homepage.indexOf('http') < 0) {
                    application.homepage = iNet.getPUrl(`${application.module}/${application.homepage}`);
                    application.icon = `${this.coreService.getFileServerPath()}/images/${application.module}/${application.icon}`;
                }
                if (!!application.widget) {
                    application.widget = `${iNet.getPUrl('common/page/apps')}?appname=${application.firmContext}`; //rebuild the widget url
                }
                return application;
            }));
            this.widgetApps = this.applications.filter((/**
             * @param {?} app
             * @return {?}
             */
            (app) => (!!app.widget)));
        }));
    }
    /**
     * @param {?} app
     * @return {?}
     */
    openApp(app) {
        if (this.SYSTEM_APPS.includes(app)) { //system app
            this.router.navigate([app]);
        }
        else {
            /** @type {?} */
            const url = iNet.getSSOUrl(this.getUrlByContext(app));
            if (url) {
                window.location.href = url;
            }
        }
    }
    /**
     * @private
     * @param {?} content
     * @return {?}
     */
    getUrlByContext(content) {
        /** @type {?} */
        const app = this.applications.find((/**
         * @param {?} __0
         * @return {?}
         */
        ({ webContext }) => webContext === content));
        return app ? app.homepage : null;
    }
}
AppSideNavComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-admin-app-side-nav',
                template: "<div class=\"slide-nav\" [ngClass]=\"{'opened': opened}\">\n    <ul class=\"list-box list-app\" *ngIf=\"opened\">\n        <iframe id=\"system-app-iframe\" [src]=\"systemUrl | safe\" scrolling=\"no\"></iframe>\n        <iframe *ngFor=\"let widgetApp of widgetApps\" [src]=\"widgetApp.widget | safe\" scrolling=\"no\"></iframe>\n    </ul>\n</div>\n",
                styles: [`
        iframe {
            width: 100%;
            border: none;
            overflow: hidden;
        }
    `]
            }] }
];
/** @nocollapse */
AppSideNavComponent.ctorParameters = () => [
    { type: CoreService },
    { type: Router },
    { type: ElementRef }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXNpZGUtbmF2LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtdWkvIiwic291cmNlcyI6WyJzcmMvbGF5b3V0L2Jvb3RzdHJhcC9hcHAtc2lkZS1uYXYvYXBwLXNpZGUtbmF2LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNILFNBQVMsRUFBRSxVQUFVLEVBQ3hCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLGdDQUFnQyxDQUFDO0FBR3hFLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN2QyxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sV0FBVyxDQUFDO0FBZXRDLE1BQU0sT0FBTyxtQkFBb0IsU0FBUSx3QkFBd0I7Ozs7OztJQVE3RCxZQUNZLFdBQXdCLEVBQ3hCLE1BQWMsRUFDZixVQUFzQjtRQUM3QixLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7UUFIVixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2YsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQVJqQyxpQkFBWSxHQUE2QixFQUFFLENBQUM7UUFDNUMsZUFBVSxHQUE4QixFQUFFLENBQUM7UUFDM0MsY0FBUyxHQUFXLGFBQWEsQ0FBQztRQUNsQyxnQkFBVyxHQUFHLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBUWpDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNuQixDQUFDOzs7O0lBRUQsUUFBUTtRQUNKLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTOzs7O1FBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTs7Z0JBQ2pDLE1BQU0sR0FBRyxDQUFDLENBQUMsSUFBSSxJQUFJLEVBQUU7O2dCQUNyQixXQUFXLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQzs7Z0JBQ2pDLFFBQVEsR0FBRyxFQUFFO1lBQ2pCLElB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QUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUNyQyxDQUFDOzs7WUFqSEosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSx3QkFBd0I7Z0JBQ2xDLHVXQUE0Qzt5QkFDbkM7Ozs7OztLQU1SO2FBQ0o7Ozs7WUFkTyxXQUFXO1lBRFgsTUFBTTtZQUxDLFVBQVU7Ozs7Ozs7SUF1QnJCLHNDQUE4Qjs7SUFDOUIsMkNBQTRDOztJQUM1Qyx5Q0FBMkM7O0lBQzNDLHdDQUFrQzs7SUFDbEMsMENBQXFDOzs7OztJQUdqQywwQ0FBZ0M7Ozs7O0lBQ2hDLHFDQUFzQjs7SUFDdEIseUNBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBDb21wb25lbnQsIEVsZW1lbnRSZWYsIE9uRGVzdHJveSwgT25Jbml0LCBTaW1wbGVDaGFuZ2VzXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtBYnN0cmFjdFNpZGVOYXZDb21wb25lbnR9IGZyb20gXCIuLi9hYnN0cmFjdC1zaWRlLW5hdi5jb21wb25lbnRcIjtcbmltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tIFwicnhqc1wiO1xuaW1wb3J0IHtTeXN0ZW1BcHBsaWNhdGlvbn0gZnJvbSBcIi4uLy4uLy4uL21vZGVsXCI7XG5pbXBvcnQge1JvdXRlcn0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHtDb3JlU2VydmljZX0gZnJvbSBcImluZXQtY29yZVwiO1xuXG5kZWNsYXJlIGxldCBpTmV0OiBhbnk7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXBwLWFkbWluLWFwcC1zaWRlLW5hdicsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2FwcC1zaWRlLW5hdi5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVzOiBbYFxuICAgICAgICBpZnJhbWUge1xuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgICBib3JkZXI6IG5vbmU7XG4gICAgICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgICB9XG4gICAgYF1cbn0pXG5leHBvcnQgY2xhc3MgQXBwU2lkZU5hdkNvbXBvbmVudCBleHRlbmRzIEFic3RyYWN0U2lkZU5hdkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgICAvL3ByaXZhdGUgbG9hZGVkID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBfcm91dGVyOiBTdWJzY3JpcHRpb247XG4gICAgYXBwbGljYXRpb25zOiBBcnJheTxTeXN0ZW1BcHBsaWNhdGlvbj4gPSBbXTtcbiAgICB3aWRnZXRBcHBzIDogQXJyYXk8U3lzdGVtQXBwbGljYXRpb24+ID0gW107XG4gICAgc3lzdGVtVXJsOiBzdHJpbmcgPSAnYWJvdXQ6YmxhbmsnO1xuICAgIFNZU1RFTV9BUFBTID0gWydzb2NpYWwnLCAnY2FsZW5kYXInXTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGNvcmVTZXJ2aWNlOiBDb3JlU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcbiAgICAgICAgcHVibGljIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICAgICAgc3VwZXIoZWxlbWVudFJlZik7XG5cbiAgICAgICAgdGhpcy5saXN0QXBwKCk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgKGUpID0+IHtcbiAgICAgICAgICAgIHZhciBfX2RhdGEgPSBlLmRhdGEgfHwge307XG4gICAgICAgICAgICB2YXIgX19ldmVudE5hbWUgPSBfX2RhdGFbJ2V2ZW50TmFtZSddO1xuICAgICAgICAgICAgdmFyIF9fcmVzdWx0ID0ge307XG4gICAgICAgICAgICBpZiAoIWlOZXQuaXNFbXB0eShfX2RhdGEucmVzdWx0KSkge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgKF9fZGF0YS5yZXN1bHQpID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICBfX3Jlc3VsdCA9IEpTT04ucGFyc2UoX19kYXRhLnJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgKF9fZGF0YS5yZXN1bHQpID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgICAgICBfX3Jlc3VsdCA9IF9fZGF0YS5yZXN1bHQgfHwge307XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ1ttZXNzYWdlXScsIF9fcmVzdWx0KTtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9fZXZlbnROYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ29wZW4nOlxuICAgICAgICAgICAgICAgICAgICBjYXNlICdvcGVuQXBwJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3BlbkFwcChfX3Jlc3VsdFsnYXBwbGljYXRpb24nXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnb3BlblVybCc6XG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGlOZXQuZ2V0U1NPVXJsKF9fcmVzdWx0Wyd1cmwnXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnbG9hZGVkJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGlGcmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYGlmcmFtZVtzcmM9XCIke19fcmVzdWx0WydzcmMnXX1cIl1gKVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGlGcmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlGcmFtZVsnaGVpZ2h0J109X19yZXN1bHRbJ2hlaWdodCddO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlGcmFtZVsndmFsaWQnXSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSwgZmFsc2UpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgIGlmICh0aGlzLl9yb3V0ZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX3JvdXRlci51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgICAgICBjb25zdCBjdXJyZW50VmFsdWUgPSBjaGFuZ2VzWydvcGVuZWQnXVtcImN1cnJlbnRWYWx1ZVwiXTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zeXN0ZW1VcmwgPSBpTmV0LmdldFBVcmwoJ2NvbW1vbi9wYWdlL2FwcHMnKSArICc/YXBwbmFtZT1zeXN0ZW0nO1xuICAgICAgICAgICAgICAgIHRoaXMub3BlbigpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDI1MClcbiAgICB9XG5cbiAgICBwcml2YXRlIGxpc3RBcHAoKXtcbiAgICAgICAgdGhpcy5jb3JlU2VydmljZS5nZXRTeXN0ZW1BcHBsaWNhdGlvbigpLnN1YnNjcmliZSgoYXBwczogQXJyYXk8U3lzdGVtQXBwbGljYXRpb24+KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmFwcGxpY2F0aW9ucyA9IGFwcHNcbiAgICAgICAgICAgICAgICAuZmlsdGVyKChhcHA6IFN5c3RlbUFwcGxpY2F0aW9uKSA9PiAoYXBwLm9yZ2FuSWQgIT09ICdjb21tdW5pdHknICYmIGFwcC5maXJtQ29udGV4dCkpXG4gICAgICAgICAgICAgICAgLm1hcCgoYXBwbGljYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFwcGxpY2F0aW9uLmhvbWVwYWdlLmluZGV4T2YoJ2h0dHAnKSA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFwcGxpY2F0aW9uLmhvbWVwYWdlID0gaU5ldC5nZXRQVXJsKGAke2FwcGxpY2F0aW9uLm1vZHVsZX0vJHthcHBsaWNhdGlvbi5ob21lcGFnZX1gKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFwcGxpY2F0aW9uLmljb24gPSBgJHt0aGlzLmNvcmVTZXJ2aWNlLmdldEZpbGVTZXJ2ZXJQYXRoKCl9L2ltYWdlcy8ke2FwcGxpY2F0aW9uLm1vZHVsZX0vJHthcHBsaWNhdGlvbi5pY29ufWA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYoISFhcHBsaWNhdGlvbi53aWRnZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFwcGxpY2F0aW9uLndpZGdldCA9IGAke2lOZXQuZ2V0UFVybCgnY29tbW9uL3BhZ2UvYXBwcycpfT9hcHBuYW1lPSR7YXBwbGljYXRpb24uZmlybUNvbnRleHR9YDsgLy9yZWJ1aWxkIHRoZSB3aWRnZXQgdXJsXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFwcGxpY2F0aW9uO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy53aWRnZXRBcHBzID0gdGhpcy5hcHBsaWNhdGlvbnMuZmlsdGVyKChhcHA6IFN5c3RlbUFwcGxpY2F0aW9uKSA9PiAoISFhcHAud2lkZ2V0KSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG9wZW5BcHAoYXBwOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHRoaXMuU1lTVEVNX0FQUFMuaW5jbHVkZXMoYXBwKSkgeyAvL3N5c3RlbSBhcHBcbiAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFthcHBdKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHVybCA9IGlOZXQuZ2V0U1NPVXJsKHRoaXMuZ2V0VXJsQnlDb250ZXh0KGFwcCkpO1xuICAgICAgICAgICAgaWYgKHVybCkge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gdXJsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRVcmxCeUNvbnRleHQoY29udGVudDogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IGFwcCA9IHRoaXMuYXBwbGljYXRpb25zLmZpbmQoKHt3ZWJDb250ZXh0fSkgPT4gd2ViQ29udGV4dCA9PT0gY29udGVudCk7XG4gICAgICAgIHJldHVybiBhcHAgPyBhcHAuaG9tZXBhZ2UgOiBudWxsO1xuICAgIH1cbn1cbiJdfQ==