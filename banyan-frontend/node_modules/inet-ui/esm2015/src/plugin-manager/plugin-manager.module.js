/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CloudPluginComponent } from './cloud-plugin.component';
import { PluginManagerService } from './plugin-manager.service';
import { PluginToolbarDirective } from './plugin-toolbar.directive';
import { SafePipeModule } from "../pipes/safe-pipe.module";
import { CoreService, NotificationService } from "inet-core";
export class PluginManagerModule {
    /**
     * @param {?} pluginManagerService
     */
    constructor(pluginManagerService) {
        this.pluginManagerService = pluginManagerService;
        this.pluginManagerService.listen();
    }
}
PluginManagerModule.decorators = [
    { type: NgModule, args: [{
                declarations: [CloudPluginComponent, PluginToolbarDirective],
                imports: [
                    CommonModule,
                    SafePipeModule
                ],
                exports: [CloudPluginComponent, PluginToolbarDirective],
                providers: [PluginManagerService, CoreService, NotificationService]
            },] }
];
/** @nocollapse */
PluginManagerModule.ctorParameters = () => [
    { type: PluginManagerService }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    PluginManagerModule.prototype.pluginManagerService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGx1Z2luLW1hbmFnZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC11aS8iLCJzb3VyY2VzIjpbInNyYy9wbHVnaW4tbWFuYWdlci9wbHVnaW4tbWFuYWdlci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQzlELE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQzlELE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBQ2xFLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUN6RCxPQUFPLEVBQUMsV0FBVyxFQUFFLG1CQUFtQixFQUFDLE1BQU0sV0FBVyxDQUFDO0FBVzNELE1BQU0sT0FBTyxtQkFBbUI7Ozs7SUFDNUIsWUFBb0Isb0JBQTBDO1FBQTFDLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7UUFDMUQsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3ZDLENBQUM7OztZQVpKLFFBQVEsU0FBQztnQkFDTixZQUFZLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSxzQkFBc0IsQ0FBQztnQkFDNUQsT0FBTyxFQUFFO29CQUNMLFlBQVk7b0JBQ1osY0FBYztpQkFDakI7Z0JBQ0QsT0FBTyxFQUFFLENBQUMsb0JBQW9CLEVBQUUsc0JBQXNCLENBQUM7Z0JBQ3ZELFNBQVMsRUFBRSxDQUFDLG9CQUFvQixFQUFFLFdBQVcsRUFBRSxtQkFBbUIsQ0FBQzthQUN0RTs7OztZQWJPLG9CQUFvQjs7Ozs7OztJQWVaLG1EQUFrRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0Nsb3VkUGx1Z2luQ29tcG9uZW50fSBmcm9tICcuL2Nsb3VkLXBsdWdpbi5jb21wb25lbnQnO1xuaW1wb3J0IHtQbHVnaW5NYW5hZ2VyU2VydmljZX0gZnJvbSAnLi9wbHVnaW4tbWFuYWdlci5zZXJ2aWNlJztcbmltcG9ydCB7UGx1Z2luVG9vbGJhckRpcmVjdGl2ZX0gZnJvbSAnLi9wbHVnaW4tdG9vbGJhci5kaXJlY3RpdmUnO1xuaW1wb3J0IHtTYWZlUGlwZU1vZHVsZX0gZnJvbSBcIi4uL3BpcGVzL3NhZmUtcGlwZS5tb2R1bGVcIjtcbmltcG9ydCB7Q29yZVNlcnZpY2UsIE5vdGlmaWNhdGlvblNlcnZpY2V9IGZyb20gXCJpbmV0LWNvcmVcIjtcblxuQE5nTW9kdWxlKHtcbiAgICBkZWNsYXJhdGlvbnM6IFtDbG91ZFBsdWdpbkNvbXBvbmVudCwgUGx1Z2luVG9vbGJhckRpcmVjdGl2ZV0sXG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIFNhZmVQaXBlTW9kdWxlXG4gICAgXSxcbiAgICBleHBvcnRzOiBbQ2xvdWRQbHVnaW5Db21wb25lbnQsIFBsdWdpblRvb2xiYXJEaXJlY3RpdmVdLFxuICAgIHByb3ZpZGVyczogW1BsdWdpbk1hbmFnZXJTZXJ2aWNlLCBDb3JlU2VydmljZSwgTm90aWZpY2F0aW9uU2VydmljZV1cbn0pXG5leHBvcnQgY2xhc3MgUGx1Z2luTWFuYWdlck1vZHVsZSB7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBwbHVnaW5NYW5hZ2VyU2VydmljZTogUGx1Z2luTWFuYWdlclNlcnZpY2UpIHtcbiAgICAgICAgdGhpcy5wbHVnaW5NYW5hZ2VyU2VydmljZS5saXN0ZW4oKTtcbiAgICB9XG59XG4iXX0=