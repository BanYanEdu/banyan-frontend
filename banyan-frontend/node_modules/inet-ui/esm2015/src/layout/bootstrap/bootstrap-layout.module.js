/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LayoutComponent } from './layout.component';
import { AdminNavbarComponent } from './navbar/navbar.component';
import { AuthenticateGuard } from "../../common/authenticate.guard";
import { NotifyModule } from "../../notify/notify.module";
import { BootstrapLayoutRoutingModule } from "./bootstrap-layout-routing.module";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { CloudTranslateModule } from "../../translate/cloud-translate.module";
import { ModalModule } from "ngx-bootstrap";
import { CoreModule, HttpClientService, LoadingIndicatorService } from "inet-core";
import { UserProfileModule } from "../../user-profile/user-profile.module";
import { BootstrapUserProfileComponent } from "./user-profile/bootstrap-user-profile.component";
import { InterceptorModule } from "../../interceptor/interceptor.module";
import { OrganizationService } from "../../organization/organization.service";
import { BootstrapCompanyProfileComponent } from "./company-profile/bootstrap-company-profile.component";
import { OrganizationModule } from "../../organization/organization.module";
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from "@angular/router";
import { NotifyMessageService } from "../../common/notify-message.service";
import { MessageSideNavComponent } from "./message-side-nav/message-side-nav.component";
import { AppSideNavComponent } from "./app-side-nav/app-side-nav.component";
import { SocialSideNavComponent } from "./social-side-nav/social-side-nav.component";
import { AbstractSideNavComponent } from "./abstract-side-nav.component";
import { CommonToolbarComponent } from "./common-toolbar/common-toolbar.component";
import { SafePipeModule } from "../../pipes/safe-pipe.module";
import { SharingInformationModule } from "../../sharing-information/sharing-information.module";
export class BootstrapLayoutModule {
    /**
     * @param {?} router
     * @param {?} loadingService
     */
    constructor(router, loadingService) {
        /*
        * True to enable layout for controlling the menu,header,etc....
        * This option should generally be enabled when layout are being used inside the framework.
         */
        iNet.enableLayout = true;
        router.events.subscribe((/**
         * @param {?} event
         * @return {?}
         */
        event => {
            if (event instanceof NavigationStart) {
                loadingService.showLoading();
            }
            if ((event instanceof NavigationError || event instanceof NavigationEnd || event instanceof NavigationCancel)) {
                loadingService.hideLoading();
            }
        }));
    }
}
BootstrapLayoutModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    CoreModule,
                    BootstrapLayoutRoutingModule,
                    HttpClientModule,
                    InterceptorModule,
                    ModalModule.forRoot(),
                    CloudTranslateModule,
                    NotifyModule,
                    UserProfileModule,
                    OrganizationModule,
                    SafePipeModule,
                    SharingInformationModule,
                ],
                declarations: [
                    AdminNavbarComponent,
                    LayoutComponent,
                    BootstrapUserProfileComponent,
                    BootstrapCompanyProfileComponent,
                    MessageSideNavComponent,
                    AppSideNavComponent,
                    SocialSideNavComponent,
                    AbstractSideNavComponent,
                    CommonToolbarComponent
                ],
                exports: [InterceptorModule, CloudTranslateModule, LayoutComponent, AbstractSideNavComponent],
                schemas: [CUSTOM_ELEMENTS_SCHEMA],
                providers: [AuthenticateGuard, OrganizationService, HttpClientService, NotifyMessageService]
            },] }
];
/** @nocollapse */
BootstrapLayoutModule.ctorParameters = () => [
    { type: Router },
    { type: LoadingIndicatorService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9vdHN0cmFwLWxheW91dC5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbmV0LXVpLyIsInNvdXJjZXMiOlsic3JjL2xheW91dC9ib290c3RyYXAvYm9vdHN0cmFwLWxheW91dC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxRQUFRLEVBQUUsc0JBQXNCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDL0QsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQ25ELE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQy9ELE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLGlDQUFpQyxDQUFDO0FBQ2xFLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSw0QkFBNEIsQ0FBQztBQUN4RCxPQUFPLEVBQUMsNEJBQTRCLEVBQUMsTUFBTSxtQ0FBbUMsQ0FBQztBQUMvRSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDdEQsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sd0NBQXdDLENBQUM7QUFDNUUsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEVBQUMsVUFBVSxFQUFFLGlCQUFpQixFQUFFLHVCQUF1QixFQUFDLE1BQU0sV0FBVyxDQUFDO0FBQ2pGLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLHdDQUF3QyxDQUFDO0FBQ3pFLE9BQU8sRUFBQyw2QkFBNkIsRUFBQyxNQUFNLGlEQUFpRCxDQUFDO0FBQzlGLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLHNDQUFzQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLHlDQUF5QyxDQUFDO0FBQzVFLE9BQU8sRUFBQyxnQ0FBZ0MsRUFBQyxNQUFNLHVEQUF1RCxDQUFDO0FBQ3ZHLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLHdDQUF3QyxDQUFDO0FBQzFFLE9BQU8sRUFBQyxnQkFBZ0IsRUFBRSxhQUFhLEVBQUUsZUFBZSxFQUFFLGVBQWUsRUFBRSxNQUFNLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUMxRyxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSxxQ0FBcUMsQ0FBQztBQUN6RSxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSwrQ0FBK0MsQ0FBQztBQUN0RixPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSx1Q0FBdUMsQ0FBQztBQUMxRSxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSw2Q0FBNkMsQ0FBQztBQUNuRixPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSwrQkFBK0IsQ0FBQztBQUN2RSxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSwyQ0FBMkMsQ0FBQztBQUNqRixPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sOEJBQThCLENBQUM7QUFDNUQsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0sc0RBQXNELENBQUM7QUFpQzlGLE1BQU0sT0FBTyxxQkFBcUI7Ozs7O0lBQzlCLFlBQ0ksTUFBYyxFQUNkLGNBQXVDO1FBRXZDOzs7V0FHRztRQUNILElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUzs7OztRQUFDLEtBQUssQ0FBQyxFQUFFO1lBQzVCLElBQUksS0FBSyxZQUFZLGVBQWUsRUFBRTtnQkFDbEMsY0FBYyxDQUFDLFdBQVcsRUFBRSxDQUFDO2FBQ2hDO1lBQ0QsSUFBSSxDQUFDLEtBQUssWUFBWSxlQUFlLElBQUksS0FBSyxZQUFZLGFBQWEsSUFBSSxLQUFLLFlBQVksZ0JBQWdCLENBQUMsRUFBRTtnQkFDM0csY0FBYyxDQUFDLFdBQVcsRUFBRSxDQUFDO2FBQ2hDO1FBQ0wsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7WUFoREosUUFBUSxTQUFDO2dCQUNOLE9BQU8sRUFBRTtvQkFDTCxZQUFZO29CQUNaLFVBQVU7b0JBQ1YsNEJBQTRCO29CQUM1QixnQkFBZ0I7b0JBQ2hCLGlCQUFpQjtvQkFDakIsV0FBVyxDQUFDLE9BQU8sRUFBRTtvQkFDckIsb0JBQW9CO29CQUNwQixZQUFZO29CQUNaLGlCQUFpQjtvQkFDakIsa0JBQWtCO29CQUNsQixjQUFjO29CQUNkLHdCQUF3QjtpQkFDM0I7Z0JBQ0QsWUFBWSxFQUFFO29CQUNWLG9CQUFvQjtvQkFDcEIsZUFBZTtvQkFDZiw2QkFBNkI7b0JBQzdCLGdDQUFnQztvQkFDaEMsdUJBQXVCO29CQUN2QixtQkFBbUI7b0JBQ25CLHNCQUFzQjtvQkFDdEIsd0JBQXdCO29CQUN4QixzQkFBc0I7aUJBQ3pCO2dCQUNELE9BQU8sRUFBRSxDQUFDLGlCQUFpQixFQUFFLG9CQUFvQixFQUFFLGVBQWUsRUFBRSx3QkFBd0IsQ0FBQztnQkFDN0YsT0FBTyxFQUFFLENBQUMsc0JBQXNCLENBQUM7Z0JBQ2pDLFNBQVMsRUFBRSxDQUFDLGlCQUFpQixFQUFFLG1CQUFtQixFQUFFLGlCQUFpQixFQUFFLG9CQUFvQixDQUFDO2FBQy9GOzs7O1lBeEMwRSxNQUFNO1lBUDFDLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGUsIENVU1RPTV9FTEVNRU5UU19TQ0hFTUF9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtMYXlvdXRDb21wb25lbnR9IGZyb20gJy4vbGF5b3V0LmNvbXBvbmVudCc7XG5pbXBvcnQge0FkbWluTmF2YmFyQ29tcG9uZW50fSBmcm9tICcuL25hdmJhci9uYXZiYXIuY29tcG9uZW50JztcbmltcG9ydCB7QXV0aGVudGljYXRlR3VhcmR9IGZyb20gXCIuLi8uLi9jb21tb24vYXV0aGVudGljYXRlLmd1YXJkXCI7XG5pbXBvcnQge05vdGlmeU1vZHVsZX0gZnJvbSBcIi4uLy4uL25vdGlmeS9ub3RpZnkubW9kdWxlXCI7XG5pbXBvcnQge0Jvb3RzdHJhcExheW91dFJvdXRpbmdNb2R1bGV9IGZyb20gXCIuL2Jvb3RzdHJhcC1sYXlvdXQtcm91dGluZy5tb2R1bGVcIjtcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XG5pbXBvcnQge0h0dHBDbGllbnRNb2R1bGV9IGZyb20gXCJAYW5ndWxhci9jb21tb24vaHR0cFwiO1xuaW1wb3J0IHtDbG91ZFRyYW5zbGF0ZU1vZHVsZX0gZnJvbSBcIi4uLy4uL3RyYW5zbGF0ZS9jbG91ZC10cmFuc2xhdGUubW9kdWxlXCI7XG5pbXBvcnQge01vZGFsTW9kdWxlfSBmcm9tIFwibmd4LWJvb3RzdHJhcFwiO1xuaW1wb3J0IHtDb3JlTW9kdWxlLCBIdHRwQ2xpZW50U2VydmljZSwgTG9hZGluZ0luZGljYXRvclNlcnZpY2V9IGZyb20gXCJpbmV0LWNvcmVcIjtcbmltcG9ydCB7VXNlclByb2ZpbGVNb2R1bGV9IGZyb20gXCIuLi8uLi91c2VyLXByb2ZpbGUvdXNlci1wcm9maWxlLm1vZHVsZVwiO1xuaW1wb3J0IHtCb290c3RyYXBVc2VyUHJvZmlsZUNvbXBvbmVudH0gZnJvbSBcIi4vdXNlci1wcm9maWxlL2Jvb3RzdHJhcC11c2VyLXByb2ZpbGUuY29tcG9uZW50XCI7XG5pbXBvcnQge0ludGVyY2VwdG9yTW9kdWxlfSBmcm9tIFwiLi4vLi4vaW50ZXJjZXB0b3IvaW50ZXJjZXB0b3IubW9kdWxlXCI7XG5pbXBvcnQge09yZ2FuaXphdGlvblNlcnZpY2V9IGZyb20gXCIuLi8uLi9vcmdhbml6YXRpb24vb3JnYW5pemF0aW9uLnNlcnZpY2VcIjtcbmltcG9ydCB7Qm9vdHN0cmFwQ29tcGFueVByb2ZpbGVDb21wb25lbnR9IGZyb20gXCIuL2NvbXBhbnktcHJvZmlsZS9ib290c3RyYXAtY29tcGFueS1wcm9maWxlLmNvbXBvbmVudFwiO1xuaW1wb3J0IHtPcmdhbml6YXRpb25Nb2R1bGV9IGZyb20gXCIuLi8uLi9vcmdhbml6YXRpb24vb3JnYW5pemF0aW9uLm1vZHVsZVwiO1xuaW1wb3J0IHtOYXZpZ2F0aW9uQ2FuY2VsLCBOYXZpZ2F0aW9uRW5kLCBOYXZpZ2F0aW9uRXJyb3IsIE5hdmlnYXRpb25TdGFydCwgUm91dGVyfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQge05vdGlmeU1lc3NhZ2VTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vY29tbW9uL25vdGlmeS1tZXNzYWdlLnNlcnZpY2VcIjtcbmltcG9ydCB7TWVzc2FnZVNpZGVOYXZDb21wb25lbnR9IGZyb20gXCIuL21lc3NhZ2Utc2lkZS1uYXYvbWVzc2FnZS1zaWRlLW5hdi5jb21wb25lbnRcIjtcbmltcG9ydCB7QXBwU2lkZU5hdkNvbXBvbmVudH0gZnJvbSBcIi4vYXBwLXNpZGUtbmF2L2FwcC1zaWRlLW5hdi5jb21wb25lbnRcIjtcbmltcG9ydCB7U29jaWFsU2lkZU5hdkNvbXBvbmVudH0gZnJvbSBcIi4vc29jaWFsLXNpZGUtbmF2L3NvY2lhbC1zaWRlLW5hdi5jb21wb25lbnRcIjtcbmltcG9ydCB7QWJzdHJhY3RTaWRlTmF2Q29tcG9uZW50fSBmcm9tIFwiLi9hYnN0cmFjdC1zaWRlLW5hdi5jb21wb25lbnRcIjtcbmltcG9ydCB7Q29tbW9uVG9vbGJhckNvbXBvbmVudH0gZnJvbSBcIi4vY29tbW9uLXRvb2xiYXIvY29tbW9uLXRvb2xiYXIuY29tcG9uZW50XCI7XG5pbXBvcnQge1NhZmVQaXBlTW9kdWxlfSBmcm9tIFwiLi4vLi4vcGlwZXMvc2FmZS1waXBlLm1vZHVsZVwiO1xuaW1wb3J0IHtTaGFyaW5nSW5mb3JtYXRpb25Nb2R1bGV9IGZyb20gXCIuLi8uLi9zaGFyaW5nLWluZm9ybWF0aW9uL3NoYXJpbmctaW5mb3JtYXRpb24ubW9kdWxlXCI7XG5kZWNsYXJlIGxldCBpTmV0OiBhbnk7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIENvcmVNb2R1bGUsXG4gICAgICAgIEJvb3RzdHJhcExheW91dFJvdXRpbmdNb2R1bGUsXG4gICAgICAgIEh0dHBDbGllbnRNb2R1bGUsXG4gICAgICAgIEludGVyY2VwdG9yTW9kdWxlLFxuICAgICAgICBNb2RhbE1vZHVsZS5mb3JSb290KCksXG4gICAgICAgIENsb3VkVHJhbnNsYXRlTW9kdWxlLFxuICAgICAgICBOb3RpZnlNb2R1bGUsXG4gICAgICAgIFVzZXJQcm9maWxlTW9kdWxlLFxuICAgICAgICBPcmdhbml6YXRpb25Nb2R1bGUsXG4gICAgICAgIFNhZmVQaXBlTW9kdWxlLFxuICAgICAgICBTaGFyaW5nSW5mb3JtYXRpb25Nb2R1bGUsXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgQWRtaW5OYXZiYXJDb21wb25lbnQsXG4gICAgICAgIExheW91dENvbXBvbmVudCxcbiAgICAgICAgQm9vdHN0cmFwVXNlclByb2ZpbGVDb21wb25lbnQsXG4gICAgICAgIEJvb3RzdHJhcENvbXBhbnlQcm9maWxlQ29tcG9uZW50LFxuICAgICAgICBNZXNzYWdlU2lkZU5hdkNvbXBvbmVudCxcbiAgICAgICAgQXBwU2lkZU5hdkNvbXBvbmVudCxcbiAgICAgICAgU29jaWFsU2lkZU5hdkNvbXBvbmVudCxcbiAgICAgICAgQWJzdHJhY3RTaWRlTmF2Q29tcG9uZW50LFxuICAgICAgICBDb21tb25Ub29sYmFyQ29tcG9uZW50XG4gICAgXSxcbiAgICBleHBvcnRzOiBbSW50ZXJjZXB0b3JNb2R1bGUsIENsb3VkVHJhbnNsYXRlTW9kdWxlLCBMYXlvdXRDb21wb25lbnQsIEFic3RyYWN0U2lkZU5hdkNvbXBvbmVudF0sXG4gICAgc2NoZW1hczogW0NVU1RPTV9FTEVNRU5UU19TQ0hFTUFdLFxuICAgIHByb3ZpZGVyczogW0F1dGhlbnRpY2F0ZUd1YXJkLCBPcmdhbml6YXRpb25TZXJ2aWNlLCBIdHRwQ2xpZW50U2VydmljZSwgTm90aWZ5TWVzc2FnZVNlcnZpY2VdXG59KVxuZXhwb3J0IGNsYXNzIEJvb3RzdHJhcExheW91dE1vZHVsZSB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHJvdXRlcjogUm91dGVyLFxuICAgICAgICBsb2FkaW5nU2VydmljZTogTG9hZGluZ0luZGljYXRvclNlcnZpY2VcbiAgICApIHtcbiAgICAgICAgLypcbiAgICAgICAgKiBUcnVlIHRvIGVuYWJsZSBsYXlvdXQgZm9yIGNvbnRyb2xsaW5nIHRoZSBtZW51LGhlYWRlcixldGMuLi4uXG4gICAgICAgICogVGhpcyBvcHRpb24gc2hvdWxkIGdlbmVyYWxseSBiZSBlbmFibGVkIHdoZW4gbGF5b3V0IGFyZSBiZWluZyB1c2VkIGluc2lkZSB0aGUgZnJhbWV3b3JrLlxuICAgICAgICAgKi9cbiAgICAgICAgaU5ldC5lbmFibGVMYXlvdXQgPSB0cnVlO1xuICAgICAgICByb3V0ZXIuZXZlbnRzLnN1YnNjcmliZShldmVudCA9PiB7XG4gICAgICAgICAgICBpZiAoZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uU3RhcnQpIHtcbiAgICAgICAgICAgICAgICBsb2FkaW5nU2VydmljZS5zaG93TG9hZGluZygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKChldmVudCBpbnN0YW5jZW9mIE5hdmlnYXRpb25FcnJvciB8fCBldmVudCBpbnN0YW5jZW9mIE5hdmlnYXRpb25FbmQgfHwgZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uQ2FuY2VsKSkge1xuICAgICAgICAgICAgICAgIGxvYWRpbmdTZXJ2aWNlLmhpZGVMb2FkaW5nKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==