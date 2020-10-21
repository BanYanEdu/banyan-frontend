/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SocialHomeComponent } from "./home/social-home.component";
import { SocialActivityViewComponent } from "./activity-view/social-activity-view.component";
/** @type {?} */
var routes = [
    {
        path: 'activity/social',
        component: SocialHomeComponent
    },
    {
        path: 'activity/social/activity/:id',
        component: SocialActivityViewComponent
    },
    {
        path: 'activity/social/**',
        redirectTo: 'activity/social',
        pathMatch: 'full'
    },
];
var SocialRoutingModule = /** @class */ (function () {
    function SocialRoutingModule() {
    }
    SocialRoutingModule.decorators = [
        { type: NgModule, args: [{
                    imports: [RouterModule.forChild(routes)],
                    exports: [RouterModule]
                },] }
    ];
    return SocialRoutingModule;
}());
export { SocialRoutingModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29jaWFsLXJvdXRpbmcubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC1zb2NpYWwvIiwic291cmNlcyI6WyJzcmMvcm91dGluZy9zb2NpYWwtcm91dGluZy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFTLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3JELE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBQ2pFLE9BQU8sRUFBQywyQkFBMkIsRUFBQyxNQUFNLGdEQUFnRCxDQUFDOztJQUVyRixNQUFNLEdBQVc7SUFDbkI7UUFDSSxJQUFJLEVBQUUsaUJBQWlCO1FBQ3ZCLFNBQVMsRUFBRSxtQkFBbUI7S0FDakM7SUFDRDtRQUNJLElBQUksRUFBRSw4QkFBOEI7UUFDcEMsU0FBUyxFQUFFLDJCQUEyQjtLQUN6QztJQUNEO1FBQ0ksSUFBSSxFQUFFLG9CQUFvQjtRQUMxQixVQUFVLEVBQUUsaUJBQWlCO1FBQzdCLFNBQVMsRUFBRSxNQUFNO0tBQ3BCO0NBQ0o7QUFFRDtJQUFBO0lBS0EsQ0FBQzs7Z0JBTEEsUUFBUSxTQUFDO29CQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQ3hDLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztpQkFDMUI7O0lBRUQsMEJBQUM7Q0FBQSxBQUxELElBS0M7U0FEWSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Um91dGVzLCBSb3V0ZXJNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQge1NvY2lhbEhvbWVDb21wb25lbnR9IGZyb20gXCIuL2hvbWUvc29jaWFsLWhvbWUuY29tcG9uZW50XCI7XG5pbXBvcnQge1NvY2lhbEFjdGl2aXR5Vmlld0NvbXBvbmVudH0gZnJvbSBcIi4vYWN0aXZpdHktdmlldy9zb2NpYWwtYWN0aXZpdHktdmlldy5jb21wb25lbnRcIjtcblxuY29uc3Qgcm91dGVzOiBSb3V0ZXMgPSBbXG4gICAge1xuICAgICAgICBwYXRoOiAnYWN0aXZpdHkvc29jaWFsJyxcbiAgICAgICAgY29tcG9uZW50OiBTb2NpYWxIb21lQ29tcG9uZW50XG4gICAgfSxcbiAgICB7XG4gICAgICAgIHBhdGg6ICdhY3Rpdml0eS9zb2NpYWwvYWN0aXZpdHkvOmlkJyxcbiAgICAgICAgY29tcG9uZW50OiBTb2NpYWxBY3Rpdml0eVZpZXdDb21wb25lbnRcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcGF0aDogJ2FjdGl2aXR5L3NvY2lhbC8qKicsXG4gICAgICAgIHJlZGlyZWN0VG86ICdhY3Rpdml0eS9zb2NpYWwnLFxuICAgICAgICBwYXRoTWF0Y2g6ICdmdWxsJ1xuICAgIH0sXG5dO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtSb3V0ZXJNb2R1bGUuZm9yQ2hpbGQocm91dGVzKV0sXG4gICAgZXhwb3J0czogW1JvdXRlck1vZHVsZV1cbn0pXG5leHBvcnQgY2xhc3MgU29jaWFsUm91dGluZ01vZHVsZSB7XG59XG4iXX0=