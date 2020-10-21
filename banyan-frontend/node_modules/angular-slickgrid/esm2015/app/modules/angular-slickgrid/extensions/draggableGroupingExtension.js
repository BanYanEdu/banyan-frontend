import * as tslib_1 from "tslib";
import { SharedService } from '../services/shared.service';
import { ExtensionName } from '../models/index';
import { ExtensionUtility } from './extensionUtility';
import { Injectable } from '@angular/core';
let DraggableGroupingExtension = class DraggableGroupingExtension {
    constructor(extensionUtility, sharedService) {
        this.extensionUtility = extensionUtility;
        this.sharedService = sharedService;
        this._eventHandler = new Slick.EventHandler();
    }
    get eventHandler() {
        return this._eventHandler;
    }
    dispose() {
        // unsubscribe all SlickGrid events
        this._eventHandler.unsubscribeAll();
        if (this._addon && this._addon.destroy) {
            this._addon.destroy();
        }
    }
    /**
     * Attach/Create different plugins before the Grid creation.
     * For example the multi-select have to be added to the column definition before the grid is created to work properly
     */
    create(gridOptions) {
        if (gridOptions) {
            // dynamically import the SlickGrid plugin (addon) with RequireJS
            this.extensionUtility.loadExtensionDynamically(ExtensionName.draggableGrouping);
            if (!this._addon) {
                this._addon = new Slick.DraggableGrouping(gridOptions.draggableGrouping || {});
            }
            return this._addon;
        }
        return null;
    }
    register() {
        if (this.sharedService && this.sharedService.grid && this.sharedService.gridOptions) {
            this.sharedService.grid.registerPlugin(this._addon);
            // Events
            if (this.sharedService.grid && this.sharedService.gridOptions.draggableGrouping) {
                if (this.sharedService.gridOptions.draggableGrouping.onExtensionRegistered) {
                    this.sharedService.gridOptions.draggableGrouping.onExtensionRegistered(this._addon);
                }
                this._eventHandler.subscribe(this._addon.onGroupChanged, (e, args) => {
                    if (this.sharedService.gridOptions.draggableGrouping && typeof this.sharedService.gridOptions.draggableGrouping.onGroupChanged === 'function') {
                        this.sharedService.gridOptions.draggableGrouping.onGroupChanged(e, args);
                    }
                });
            }
            return this._addon;
        }
        return null;
    }
};
DraggableGroupingExtension = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [ExtensionUtility, SharedService])
], DraggableGroupingExtension);
export { DraggableGroupingExtension };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZ2dhYmxlR3JvdXBpbmdFeHRlbnNpb24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL2V4dGVuc2lvbnMvZHJhZ2dhYmxlR3JvdXBpbmdFeHRlbnNpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUMzRCxPQUFPLEVBQWEsYUFBYSxFQUEyQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3BHLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFNM0MsSUFBYSwwQkFBMEIsR0FBdkMsTUFBYSwwQkFBMEI7SUFJckMsWUFBb0IsZ0JBQWtDLEVBQVUsYUFBNEI7UUFBeEUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzFGLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxLQUFLLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDaEQsQ0FBQztJQUVELElBQUksWUFBWTtRQUNkLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQztJQUM1QixDQUFDO0lBRUQsT0FBTztRQUNMLG1DQUFtQztRQUNuQyxJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBRXBDLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRTtZQUN0QyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ3ZCO0lBQ0gsQ0FBQztJQUVEOzs7T0FHRztJQUNILE1BQU0sQ0FBQyxXQUF1QjtRQUM1QixJQUFJLFdBQVcsRUFBRTtZQUNmLGlFQUFpRTtZQUNqRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsd0JBQXdCLENBQUMsYUFBYSxDQUFDLGlCQUFpQixDQUFDLENBQUM7WUFFaEYsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ2hCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxLQUFLLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLGlCQUFpQixJQUFJLEVBQUUsQ0FBQyxDQUFDO2FBQ2hGO1lBQ0QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO1NBQ3BCO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksSUFBSSxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRTtZQUNuRixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRXBELFNBQVM7WUFDVCxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLGlCQUFpQixFQUFFO2dCQUMvRSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLGlCQUFpQixDQUFDLHFCQUFxQixFQUFFO29CQUMxRSxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7aUJBQ3JGO2dCQUNELElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBTSxFQUFFLElBQW1ELEVBQUUsRUFBRTtvQkFDdkgsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsSUFBSSxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLGlCQUFpQixDQUFDLGNBQWMsS0FBSyxVQUFVLEVBQUU7d0JBQzdJLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLGlCQUFpQixDQUFDLGNBQWMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7cUJBQzFFO2dCQUNILENBQUMsQ0FBQyxDQUFDO2FBQ0o7WUFFRCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7U0FDcEI7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7Q0FDRixDQUFBO0FBMURZLDBCQUEwQjtJQUR0QyxVQUFVLEVBQUU7NkNBSzJCLGdCQUFnQixFQUF5QixhQUFhO0dBSmpGLDBCQUEwQixDQTBEdEM7U0ExRFksMEJBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB7IFNoYXJlZFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9zaGFyZWQuc2VydmljZSc7XHJcbmltcG9ydCB7IEV4dGVuc2lvbiwgRXh0ZW5zaW9uTmFtZSwgR3JpZE9wdGlvbiwgR3JvdXBpbmcsIFNsaWNrRXZlbnRIYW5kbGVyIH0gZnJvbSAnLi4vbW9kZWxzL2luZGV4JztcclxuaW1wb3J0IHsgRXh0ZW5zaW9uVXRpbGl0eSB9IGZyb20gJy4vZXh0ZW5zaW9uVXRpbGl0eSc7XHJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbi8vIHVzaW5nIGV4dGVybmFsIG5vbi10eXBlZCBqcyBsaWJyYXJpZXNcclxuZGVjbGFyZSB2YXIgU2xpY2s6IGFueTtcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIERyYWdnYWJsZUdyb3VwaW5nRXh0ZW5zaW9uIGltcGxlbWVudHMgRXh0ZW5zaW9uIHtcclxuICBwcml2YXRlIF9ldmVudEhhbmRsZXI6IFNsaWNrRXZlbnRIYW5kbGVyO1xyXG4gIHByaXZhdGUgX2FkZG9uOiBhbnk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZXh0ZW5zaW9uVXRpbGl0eTogRXh0ZW5zaW9uVXRpbGl0eSwgcHJpdmF0ZSBzaGFyZWRTZXJ2aWNlOiBTaGFyZWRTZXJ2aWNlKSB7XHJcbiAgICB0aGlzLl9ldmVudEhhbmRsZXIgPSBuZXcgU2xpY2suRXZlbnRIYW5kbGVyKCk7XHJcbiAgfVxyXG5cclxuICBnZXQgZXZlbnRIYW5kbGVyKCk6IFNsaWNrRXZlbnRIYW5kbGVyIHtcclxuICAgIHJldHVybiB0aGlzLl9ldmVudEhhbmRsZXI7XHJcbiAgfVxyXG5cclxuICBkaXNwb3NlKCkge1xyXG4gICAgLy8gdW5zdWJzY3JpYmUgYWxsIFNsaWNrR3JpZCBldmVudHNcclxuICAgIHRoaXMuX2V2ZW50SGFuZGxlci51bnN1YnNjcmliZUFsbCgpO1xyXG5cclxuICAgIGlmICh0aGlzLl9hZGRvbiAmJiB0aGlzLl9hZGRvbi5kZXN0cm95KSB7XHJcbiAgICAgIHRoaXMuX2FkZG9uLmRlc3Ryb3koKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEF0dGFjaC9DcmVhdGUgZGlmZmVyZW50IHBsdWdpbnMgYmVmb3JlIHRoZSBHcmlkIGNyZWF0aW9uLlxyXG4gICAqIEZvciBleGFtcGxlIHRoZSBtdWx0aS1zZWxlY3QgaGF2ZSB0byBiZSBhZGRlZCB0byB0aGUgY29sdW1uIGRlZmluaXRpb24gYmVmb3JlIHRoZSBncmlkIGlzIGNyZWF0ZWQgdG8gd29yayBwcm9wZXJseVxyXG4gICAqL1xyXG4gIGNyZWF0ZShncmlkT3B0aW9uczogR3JpZE9wdGlvbikge1xyXG4gICAgaWYgKGdyaWRPcHRpb25zKSB7XHJcbiAgICAgIC8vIGR5bmFtaWNhbGx5IGltcG9ydCB0aGUgU2xpY2tHcmlkIHBsdWdpbiAoYWRkb24pIHdpdGggUmVxdWlyZUpTXHJcbiAgICAgIHRoaXMuZXh0ZW5zaW9uVXRpbGl0eS5sb2FkRXh0ZW5zaW9uRHluYW1pY2FsbHkoRXh0ZW5zaW9uTmFtZS5kcmFnZ2FibGVHcm91cGluZyk7XHJcblxyXG4gICAgICBpZiAoIXRoaXMuX2FkZG9uKSB7XHJcbiAgICAgICAgdGhpcy5fYWRkb24gPSBuZXcgU2xpY2suRHJhZ2dhYmxlR3JvdXBpbmcoZ3JpZE9wdGlvbnMuZHJhZ2dhYmxlR3JvdXBpbmcgfHwge30pO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB0aGlzLl9hZGRvbjtcclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgcmVnaXN0ZXIoKTogYW55IHtcclxuICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zKSB7XHJcbiAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLnJlZ2lzdGVyUGx1Z2luKHRoaXMuX2FkZG9uKTtcclxuXHJcbiAgICAgIC8vIEV2ZW50c1xyXG4gICAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmRyYWdnYWJsZUdyb3VwaW5nKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5kcmFnZ2FibGVHcm91cGluZy5vbkV4dGVuc2lvblJlZ2lzdGVyZWQpIHtcclxuICAgICAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5kcmFnZ2FibGVHcm91cGluZy5vbkV4dGVuc2lvblJlZ2lzdGVyZWQodGhpcy5fYWRkb24pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9ldmVudEhhbmRsZXIuc3Vic2NyaWJlKHRoaXMuX2FkZG9uLm9uR3JvdXBDaGFuZ2VkLCAoZTogYW55LCBhcmdzOiB7IGNhbGxlcj86IHN0cmluZzsgZ3JvdXBDb2x1bW5zOiBHcm91cGluZ1tdIH0pID0+IHtcclxuICAgICAgICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZHJhZ2dhYmxlR3JvdXBpbmcgJiYgdHlwZW9mIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5kcmFnZ2FibGVHcm91cGluZy5vbkdyb3VwQ2hhbmdlZCA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZHJhZ2dhYmxlR3JvdXBpbmcub25Hcm91cENoYW5nZWQoZSwgYXJncyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiB0aGlzLl9hZGRvbjtcclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxufVxyXG4iXX0=