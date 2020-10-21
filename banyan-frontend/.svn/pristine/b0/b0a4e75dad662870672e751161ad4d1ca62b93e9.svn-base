import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { SharedService } from '../services/shared.service';
var GroupItemMetaProviderExtension = /** @class */ (function () {
    function GroupItemMetaProviderExtension(sharedService) {
        this.sharedService = sharedService;
    }
    GroupItemMetaProviderExtension.prototype.dispose = function () {
        if (this._addon && this._addon.destroy) {
            this._addon.destroy();
        }
    };
    /** register the group item metadata provider to add expand/collapse group handlers */
    GroupItemMetaProviderExtension.prototype.register = function () {
        if (this.sharedService && this.sharedService.grid) {
            this._addon = this.sharedService.groupItemMetadataProvider || {};
            this.sharedService.grid.registerPlugin(this._addon);
            return this._addon;
        }
        return null;
    };
    GroupItemMetaProviderExtension = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [SharedService])
    ], GroupItemMetaProviderExtension);
    return GroupItemMetaProviderExtension;
}());
export { GroupItemMetaProviderExtension };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvdXBJdGVtTWV0YVByb3ZpZGVyRXh0ZW5zaW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9leHRlbnNpb25zL2dyb3VwSXRlbU1ldGFQcm92aWRlckV4dGVuc2lvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFHM0Q7SUFHRSx3Q0FBb0IsYUFBNEI7UUFBNUIsa0JBQWEsR0FBYixhQUFhLENBQWU7SUFBSSxDQUFDO0lBRXJELGdEQUFPLEdBQVA7UUFDRSxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUU7WUFDdEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUN2QjtJQUNILENBQUM7SUFFRCxzRkFBc0Y7SUFDdEYsaURBQVEsR0FBUjtRQUNFLElBQUksSUFBSSxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRTtZQUNqRCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMseUJBQXlCLElBQUksRUFBRSxDQUFDO1lBQ2pFLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDcEQsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO1NBQ3BCO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBbkJVLDhCQUE4QjtRQUQxQyxVQUFVLEVBQUU7aURBSXdCLGFBQWE7T0FIckMsOEJBQThCLENBb0IxQztJQUFELHFDQUFDO0NBQUEsQUFwQkQsSUFvQkM7U0FwQlksOEJBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBFeHRlbnNpb24gfSBmcm9tICcuLi9tb2RlbHMvaW5kZXgnO1xyXG5pbXBvcnQgeyBTaGFyZWRTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvc2hhcmVkLnNlcnZpY2UnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgR3JvdXBJdGVtTWV0YVByb3ZpZGVyRXh0ZW5zaW9uIGltcGxlbWVudHMgRXh0ZW5zaW9uIHtcclxuICBwcml2YXRlIF9hZGRvbjogYW55O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNoYXJlZFNlcnZpY2U6IFNoYXJlZFNlcnZpY2UpIHsgfVxyXG5cclxuICBkaXNwb3NlKCkge1xyXG4gICAgaWYgKHRoaXMuX2FkZG9uICYmIHRoaXMuX2FkZG9uLmRlc3Ryb3kpIHtcclxuICAgICAgdGhpcy5fYWRkb24uZGVzdHJveSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIHJlZ2lzdGVyIHRoZSBncm91cCBpdGVtIG1ldGFkYXRhIHByb3ZpZGVyIHRvIGFkZCBleHBhbmQvY29sbGFwc2UgZ3JvdXAgaGFuZGxlcnMgKi9cclxuICByZWdpc3RlcigpOiBhbnkge1xyXG4gICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZSAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZCkge1xyXG4gICAgICB0aGlzLl9hZGRvbiA9IHRoaXMuc2hhcmVkU2VydmljZS5ncm91cEl0ZW1NZXRhZGF0YVByb3ZpZGVyIHx8IHt9O1xyXG4gICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZC5yZWdpc3RlclBsdWdpbih0aGlzLl9hZGRvbik7XHJcbiAgICAgIHJldHVybiB0aGlzLl9hZGRvbjtcclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxufVxyXG4iXX0=