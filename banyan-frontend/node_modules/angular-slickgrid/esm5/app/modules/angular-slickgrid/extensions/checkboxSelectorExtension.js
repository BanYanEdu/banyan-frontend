import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { ExtensionName } from '../models/index';
import { ExtensionUtility } from './extensionUtility';
import { SharedService } from '../services/shared.service';
var CheckboxSelectorExtension = /** @class */ (function () {
    function CheckboxSelectorExtension(extensionUtility, sharedService) {
        this.extensionUtility = extensionUtility;
        this.sharedService = sharedService;
    }
    CheckboxSelectorExtension.prototype.dispose = function () {
        if (this._addon && this._addon.destroy) {
            this._addon.destroy();
        }
    };
    /**
     * Create the plugin before the Grid creation, else it will behave oddly.
     * Mostly because the column definitions might change after the grid creation
     */
    CheckboxSelectorExtension.prototype.create = function (columnDefinitions, gridOptions) {
        if (Array.isArray(columnDefinitions) && gridOptions) {
            // dynamically import the SlickGrid plugin (addon) with RequireJS
            this.extensionUtility.loadExtensionDynamically(ExtensionName.checkboxSelector);
            if (!this._addon) {
                this._addon = new Slick.CheckboxSelectColumn(gridOptions.checkboxSelector || {});
            }
            var selectionColumn = this._addon.getColumnDefinition();
            if (typeof selectionColumn === 'object') {
                selectionColumn.excludeFromExport = true;
                selectionColumn.excludeFromColumnPicker = true;
                selectionColumn.excludeFromGridMenu = true;
                selectionColumn.excludeFromQuery = true;
                selectionColumn.excludeFromHeaderMenu = true;
                columnDefinitions.unshift(selectionColumn);
            }
            return this._addon;
        }
        return null;
    };
    CheckboxSelectorExtension.prototype.register = function (rowSelectionPlugin) {
        var _this = this;
        if (this.sharedService && this.sharedService.grid && this.sharedService.gridOptions) {
            // the plugin has to be created BEFORE the grid (else it behaves oddly), but we can only watch grid events AFTER the grid is created
            this.sharedService.grid.registerPlugin(this._addon);
            // this also requires the Row Selection Model to be registered as well
            if (!rowSelectionPlugin || !this.sharedService.grid.getSelectionModel()) {
                this.extensionUtility.loadExtensionDynamically(ExtensionName.rowSelection);
                rowSelectionPlugin = new Slick.RowSelectionModel(this.sharedService.gridOptions.rowSelectionOptions || {});
                this.sharedService.grid.setSelectionModel(rowSelectionPlugin);
            }
            // user might want to pre-select some rows
            // the setTimeout is because of timing issue with styling (row selection happen but rows aren't highlighted properly)
            if (this.sharedService.gridOptions.preselectedRows && rowSelectionPlugin && this.sharedService.grid.getSelectionModel()) {
                setTimeout(function () { return _this._addon.selectRows(_this.sharedService.gridOptions.preselectedRows); }, 0);
            }
            return rowSelectionPlugin;
        }
        return null;
    };
    CheckboxSelectorExtension = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [ExtensionUtility, SharedService])
    ], CheckboxSelectorExtension);
    return CheckboxSelectorExtension;
}());
export { CheckboxSelectorExtension };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3hTZWxlY3RvckV4dGVuc2lvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvZXh0ZW5zaW9ucy9jaGVja2JveFNlbGVjdG9yRXh0ZW5zaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBcUIsYUFBYSxFQUFjLE1BQU0saUJBQWlCLENBQUM7QUFDL0UsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDdEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBTTNEO0lBR0UsbUNBQW9CLGdCQUFrQyxFQUFVLGFBQTRCO1FBQXhFLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFBVSxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtJQUFJLENBQUM7SUFFakcsMkNBQU8sR0FBUDtRQUNFLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRTtZQUN0QyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ3ZCO0lBQ0gsQ0FBQztJQUVEOzs7T0FHRztJQUNILDBDQUFNLEdBQU4sVUFBTyxpQkFBMkIsRUFBRSxXQUF1QjtRQUN6RCxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsSUFBSSxXQUFXLEVBQUU7WUFDbkQsaUVBQWlFO1lBQ2pFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyx3QkFBd0IsQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUMvRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDaEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLElBQUksRUFBRSxDQUFDLENBQUM7YUFDbEY7WUFDRCxJQUFNLGVBQWUsR0FBVyxJQUFJLENBQUMsTUFBTSxDQUFDLG1CQUFtQixFQUFFLENBQUM7WUFDbEUsSUFBSSxPQUFPLGVBQWUsS0FBSyxRQUFRLEVBQUU7Z0JBQ3ZDLGVBQWUsQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUM7Z0JBQ3pDLGVBQWUsQ0FBQyx1QkFBdUIsR0FBRyxJQUFJLENBQUM7Z0JBQy9DLGVBQWUsQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUM7Z0JBQzNDLGVBQWUsQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7Z0JBQ3hDLGVBQWUsQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUM7Z0JBQzdDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQzthQUM1QztZQUNELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztTQUNwQjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELDRDQUFRLEdBQVIsVUFBUyxrQkFBd0I7UUFBakMsaUJBcUJDO1FBcEJDLElBQUksSUFBSSxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRTtZQUNuRixvSUFBb0k7WUFDcEksSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUVwRCxzRUFBc0U7WUFDdEUsSUFBSSxDQUFDLGtCQUFrQixJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsRUFBRTtnQkFDdkUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLHdCQUF3QixDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDM0Usa0JBQWtCLEdBQUcsSUFBSSxLQUFLLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsbUJBQW1CLElBQUksRUFBRSxDQUFDLENBQUM7Z0JBQzNHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGtCQUFrQixDQUFDLENBQUM7YUFDL0Q7WUFFRCwwQ0FBMEM7WUFDMUMscUhBQXFIO1lBQ3JILElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsZUFBZSxJQUFJLGtCQUFrQixJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLEVBQUU7Z0JBQ3ZILFVBQVUsQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLEVBQXRFLENBQXNFLEVBQUUsQ0FBQyxDQUFDLENBQUM7YUFDN0Y7WUFFRCxPQUFPLGtCQUFrQixDQUFDO1NBQzNCO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBekRVLHlCQUF5QjtRQURyQyxVQUFVLEVBQUU7aURBSTJCLGdCQUFnQixFQUF5QixhQUFhO09BSGpGLHlCQUF5QixDQTBEckM7SUFBRCxnQ0FBQztDQUFBLEFBMURELElBMERDO1NBMURZLHlCQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29sdW1uLCBFeHRlbnNpb24sIEV4dGVuc2lvbk5hbWUsIEdyaWRPcHRpb24gfSBmcm9tICcuLi9tb2RlbHMvaW5kZXgnO1xyXG5pbXBvcnQgeyBFeHRlbnNpb25VdGlsaXR5IH0gZnJvbSAnLi9leHRlbnNpb25VdGlsaXR5JztcclxuaW1wb3J0IHsgU2hhcmVkU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3NoYXJlZC5zZXJ2aWNlJztcclxuXHJcbi8vIHVzaW5nIGV4dGVybmFsIG5vbi10eXBlZCBqcyBsaWJyYXJpZXNcclxuZGVjbGFyZSB2YXIgU2xpY2s6IGFueTtcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIENoZWNrYm94U2VsZWN0b3JFeHRlbnNpb24gaW1wbGVtZW50cyBFeHRlbnNpb24ge1xyXG4gIHByaXZhdGUgX2FkZG9uOiBhbnk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZXh0ZW5zaW9uVXRpbGl0eTogRXh0ZW5zaW9uVXRpbGl0eSwgcHJpdmF0ZSBzaGFyZWRTZXJ2aWNlOiBTaGFyZWRTZXJ2aWNlKSB7IH1cclxuXHJcbiAgZGlzcG9zZSgpIHtcclxuICAgIGlmICh0aGlzLl9hZGRvbiAmJiB0aGlzLl9hZGRvbi5kZXN0cm95KSB7XHJcbiAgICAgIHRoaXMuX2FkZG9uLmRlc3Ryb3koKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZSB0aGUgcGx1Z2luIGJlZm9yZSB0aGUgR3JpZCBjcmVhdGlvbiwgZWxzZSBpdCB3aWxsIGJlaGF2ZSBvZGRseS5cclxuICAgKiBNb3N0bHkgYmVjYXVzZSB0aGUgY29sdW1uIGRlZmluaXRpb25zIG1pZ2h0IGNoYW5nZSBhZnRlciB0aGUgZ3JpZCBjcmVhdGlvblxyXG4gICAqL1xyXG4gIGNyZWF0ZShjb2x1bW5EZWZpbml0aW9uczogQ29sdW1uW10sIGdyaWRPcHRpb25zOiBHcmlkT3B0aW9uKSB7XHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheShjb2x1bW5EZWZpbml0aW9ucykgJiYgZ3JpZE9wdGlvbnMpIHtcclxuICAgICAgLy8gZHluYW1pY2FsbHkgaW1wb3J0IHRoZSBTbGlja0dyaWQgcGx1Z2luIChhZGRvbikgd2l0aCBSZXF1aXJlSlNcclxuICAgICAgdGhpcy5leHRlbnNpb25VdGlsaXR5LmxvYWRFeHRlbnNpb25EeW5hbWljYWxseShFeHRlbnNpb25OYW1lLmNoZWNrYm94U2VsZWN0b3IpO1xyXG4gICAgICBpZiAoIXRoaXMuX2FkZG9uKSB7XHJcbiAgICAgICAgdGhpcy5fYWRkb24gPSBuZXcgU2xpY2suQ2hlY2tib3hTZWxlY3RDb2x1bW4oZ3JpZE9wdGlvbnMuY2hlY2tib3hTZWxlY3RvciB8fCB7fSk7XHJcbiAgICAgIH1cclxuICAgICAgY29uc3Qgc2VsZWN0aW9uQ29sdW1uOiBDb2x1bW4gPSB0aGlzLl9hZGRvbi5nZXRDb2x1bW5EZWZpbml0aW9uKCk7XHJcbiAgICAgIGlmICh0eXBlb2Ygc2VsZWN0aW9uQ29sdW1uID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgIHNlbGVjdGlvbkNvbHVtbi5leGNsdWRlRnJvbUV4cG9ydCA9IHRydWU7XHJcbiAgICAgICAgc2VsZWN0aW9uQ29sdW1uLmV4Y2x1ZGVGcm9tQ29sdW1uUGlja2VyID0gdHJ1ZTtcclxuICAgICAgICBzZWxlY3Rpb25Db2x1bW4uZXhjbHVkZUZyb21HcmlkTWVudSA9IHRydWU7XHJcbiAgICAgICAgc2VsZWN0aW9uQ29sdW1uLmV4Y2x1ZGVGcm9tUXVlcnkgPSB0cnVlO1xyXG4gICAgICAgIHNlbGVjdGlvbkNvbHVtbi5leGNsdWRlRnJvbUhlYWRlck1lbnUgPSB0cnVlO1xyXG4gICAgICAgIGNvbHVtbkRlZmluaXRpb25zLnVuc2hpZnQoc2VsZWN0aW9uQ29sdW1uKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdGhpcy5fYWRkb247XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIHJlZ2lzdGVyKHJvd1NlbGVjdGlvblBsdWdpbj86IGFueSkge1xyXG4gICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZSAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZCAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMpIHtcclxuICAgICAgLy8gdGhlIHBsdWdpbiBoYXMgdG8gYmUgY3JlYXRlZCBCRUZPUkUgdGhlIGdyaWQgKGVsc2UgaXQgYmVoYXZlcyBvZGRseSksIGJ1dCB3ZSBjYW4gb25seSB3YXRjaCBncmlkIGV2ZW50cyBBRlRFUiB0aGUgZ3JpZCBpcyBjcmVhdGVkXHJcbiAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLnJlZ2lzdGVyUGx1Z2luKHRoaXMuX2FkZG9uKTtcclxuXHJcbiAgICAgIC8vIHRoaXMgYWxzbyByZXF1aXJlcyB0aGUgUm93IFNlbGVjdGlvbiBNb2RlbCB0byBiZSByZWdpc3RlcmVkIGFzIHdlbGxcclxuICAgICAgaWYgKCFyb3dTZWxlY3Rpb25QbHVnaW4gfHwgIXRoaXMuc2hhcmVkU2VydmljZS5ncmlkLmdldFNlbGVjdGlvbk1vZGVsKCkpIHtcclxuICAgICAgICB0aGlzLmV4dGVuc2lvblV0aWxpdHkubG9hZEV4dGVuc2lvbkR5bmFtaWNhbGx5KEV4dGVuc2lvbk5hbWUucm93U2VsZWN0aW9uKTtcclxuICAgICAgICByb3dTZWxlY3Rpb25QbHVnaW4gPSBuZXcgU2xpY2suUm93U2VsZWN0aW9uTW9kZWwodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLnJvd1NlbGVjdGlvbk9wdGlvbnMgfHwge30pO1xyXG4gICAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLnNldFNlbGVjdGlvbk1vZGVsKHJvd1NlbGVjdGlvblBsdWdpbik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIHVzZXIgbWlnaHQgd2FudCB0byBwcmUtc2VsZWN0IHNvbWUgcm93c1xyXG4gICAgICAvLyB0aGUgc2V0VGltZW91dCBpcyBiZWNhdXNlIG9mIHRpbWluZyBpc3N1ZSB3aXRoIHN0eWxpbmcgKHJvdyBzZWxlY3Rpb24gaGFwcGVuIGJ1dCByb3dzIGFyZW4ndCBoaWdobGlnaHRlZCBwcm9wZXJseSlcclxuICAgICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5wcmVzZWxlY3RlZFJvd3MgJiYgcm93U2VsZWN0aW9uUGx1Z2luICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLmdldFNlbGVjdGlvbk1vZGVsKCkpIHtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuX2FkZG9uLnNlbGVjdFJvd3ModGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLnByZXNlbGVjdGVkUm93cyksIDApO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gcm93U2VsZWN0aW9uUGx1Z2luO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG59XHJcbiJdfQ==