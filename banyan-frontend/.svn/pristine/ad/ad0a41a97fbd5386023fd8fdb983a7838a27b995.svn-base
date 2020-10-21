/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotifyService } from "./notify.service";
import { ToastrModule } from "./toastr/toastr.module";
import { NotificationService } from "inet-core";
import { ToastrService } from "./toastr/toastr.service";
import { ToastContainerModule } from "./toastr/toast.directive";
export class NotifyModule {
    /**
     * @param {?} service
     */
    constructor(service) {
        // Override show message function
        NotificationService.prototype.showMessage = (/**
         * @param {?} msg
         * @param {?} type
         * @param {?} title
         * @param {?} config
         * @return {?}
         */
        function (msg, type, title, config) {
            service.showMessage(msg, type, title, config);
        });
    }
}
NotifyModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    ToastrModule.forRoot(),
                    ToastContainerModule
                ],
                declarations: [],
                exports: [ToastrModule, ToastContainerModule],
                providers: [NotifyService, ToastrService]
            },] }
];
/** @nocollapse */
NotifyModule.ctorParameters = () => [
    { type: NotifyService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZ5Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtdWkvIiwic291cmNlcyI6WyJzcmMvbm90aWZ5L25vdGlmeS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUMvQyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDcEQsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sV0FBVyxDQUFDO0FBQzlDLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUN0RCxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQWE5RCxNQUFNLE9BQU8sWUFBWTs7OztJQUNyQixZQUFZLE9BQXNCO1FBQzlCLGlDQUFpQztRQUNqQyxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsV0FBVzs7Ozs7OztRQUFJLFVBQVUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsTUFBTTtZQUMzRSxPQUFPLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ2xELENBQUMsQ0FBQSxDQUFDO0lBQ04sQ0FBQzs7O1lBakJKLFFBQVEsU0FBQztnQkFDTixPQUFPLEVBQUU7b0JBQ0wsWUFBWTtvQkFDWixZQUFZLENBQUMsT0FBTyxFQUFFO29CQUN0QixvQkFBb0I7aUJBQ3ZCO2dCQUVELFlBQVksRUFBRSxFQUFFO2dCQUNoQixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsb0JBQW9CLENBQUM7Z0JBQzdDLFNBQVMsRUFBRSxDQUFDLGFBQWEsRUFBRSxhQUFhLENBQUM7YUFDNUM7Ozs7WUFoQk8sYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge05vdGlmeVNlcnZpY2V9IGZyb20gXCIuL25vdGlmeS5zZXJ2aWNlXCI7XG5pbXBvcnQge1RvYXN0ck1vZHVsZX0gZnJvbSBcIi4vdG9hc3RyL3RvYXN0ci5tb2R1bGVcIjtcbmltcG9ydCB7Tm90aWZpY2F0aW9uU2VydmljZX0gZnJvbSBcImluZXQtY29yZVwiO1xuaW1wb3J0IHtUb2FzdHJTZXJ2aWNlfSBmcm9tIFwiLi90b2FzdHIvdG9hc3RyLnNlcnZpY2VcIjtcbmltcG9ydCB7VG9hc3RDb250YWluZXJNb2R1bGV9IGZyb20gXCIuL3RvYXN0ci90b2FzdC5kaXJlY3RpdmVcIjtcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgVG9hc3RyTW9kdWxlLmZvclJvb3QoKSxcbiAgICAgICAgVG9hc3RDb250YWluZXJNb2R1bGVcbiAgICBdLFxuXG4gICAgZGVjbGFyYXRpb25zOiBbXSxcbiAgICBleHBvcnRzOiBbVG9hc3RyTW9kdWxlLCBUb2FzdENvbnRhaW5lck1vZHVsZV0sXG4gICAgcHJvdmlkZXJzOiBbTm90aWZ5U2VydmljZSwgVG9hc3RyU2VydmljZV1cbn0pXG5leHBvcnQgY2xhc3MgTm90aWZ5TW9kdWxlIHtcbiAgICBjb25zdHJ1Y3RvcihzZXJ2aWNlOiBOb3RpZnlTZXJ2aWNlKSB7XG4gICAgICAgIC8vIE92ZXJyaWRlIHNob3cgbWVzc2FnZSBmdW5jdGlvblxuICAgICAgICBOb3RpZmljYXRpb25TZXJ2aWNlLnByb3RvdHlwZS5zaG93TWVzc2FnZSA9ICBmdW5jdGlvbiAobXNnLCB0eXBlLCB0aXRsZSwgY29uZmlnKSB7XG4gICAgICAgICAgICBzZXJ2aWNlLnNob3dNZXNzYWdlKG1zZywgdHlwZSwgdGl0bGUsIGNvbmZpZyk7XG4gICAgICAgIH07XG4gICAgfVxufSJdfQ==