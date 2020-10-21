/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ViewerComponent } from './viewer.component';
import { ErrorPageComponent } from './error-page/error-page.component';
/** @type {?} */
var routes = [
    { path: ':ext/:id', component: ViewerComponent },
    { path: ':id', component: ErrorPageComponent }
];
var ViewerRoutingModule = /** @class */ (function () {
    function ViewerRoutingModule() {
    }
    ViewerRoutingModule.decorators = [
        { type: NgModule, args: [{
                    imports: [RouterModule.forChild(routes)],
                    exports: [RouterModule]
                },] }
    ];
    return ViewerRoutingModule;
}());
export { ViewerRoutingModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld2VyLXJvdXRpbmcubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC11aS8iLCJzb3VyY2VzIjpbInNyYy92aWV3ZXIvdmlld2VyLXJvdXRpbmcubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZDLE9BQU8sRUFBUyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUNyRCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDbkQsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sbUNBQW1DLENBQUM7O0lBRS9ELE1BQU0sR0FBVztJQUNuQixFQUFDLElBQUksRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBQztJQUM5QyxFQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLGtCQUFrQixFQUFDO0NBQy9DO0FBRUQ7SUFBQTtJQUtBLENBQUM7O2dCQUxBLFFBQVEsU0FBQztvQkFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUN4QyxPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7aUJBQzFCOztJQUVELDBCQUFDO0NBQUEsQUFMRCxJQUtDO1NBRFksbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1JvdXRlcywgUm91dGVyTW9kdWxlfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHtWaWV3ZXJDb21wb25lbnR9IGZyb20gJy4vdmlld2VyLmNvbXBvbmVudCc7XG5pbXBvcnQge0Vycm9yUGFnZUNvbXBvbmVudH0gZnJvbSAnLi9lcnJvci1wYWdlL2Vycm9yLXBhZ2UuY29tcG9uZW50JztcblxuY29uc3Qgcm91dGVzOiBSb3V0ZXMgPSBbXG4gICAge3BhdGg6ICc6ZXh0LzppZCcsIGNvbXBvbmVudDogVmlld2VyQ29tcG9uZW50fSxcbiAgICB7cGF0aDogJzppZCcsIGNvbXBvbmVudDogRXJyb3JQYWdlQ29tcG9uZW50fVxuXTtcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbUm91dGVyTW9kdWxlLmZvckNoaWxkKHJvdXRlcyldLFxuICAgIGV4cG9ydHM6IFtSb3V0ZXJNb2R1bGVdXG59KVxuZXhwb3J0IGNsYXNzIFZpZXdlclJvdXRpbmdNb2R1bGUge1xufVxuIl19