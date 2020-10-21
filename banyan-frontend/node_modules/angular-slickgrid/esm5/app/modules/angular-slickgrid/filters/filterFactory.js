import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { SlickgridConfig } from '../slickgrid-config';
import { TranslateService } from '@ngx-translate/core';
import { CollectionService } from '../services/collection.service';
var FilterFactory = /** @class */ (function () {
    function FilterFactory(config, translate, collectionService) {
        this.config = config;
        this.translate = translate;
        this.collectionService = collectionService;
        this._options = this.config.options;
    }
    // Uses the User model to create a new User
    FilterFactory.prototype.createFilter = function (columnFilter) {
        var filter;
        if (columnFilter && columnFilter.model) {
            filter = typeof columnFilter.model === 'function' ? new columnFilter.model(this.translate, this.collectionService) : columnFilter.model;
        }
        // fallback to the default filter
        if (!filter && this._options.defaultFilter) {
            filter = new this._options.defaultFilter(this.translate, this.collectionService);
        }
        return filter;
    };
    FilterFactory = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [SlickgridConfig, TranslateService, CollectionService])
    ], FilterFactory);
    return FilterFactory;
}());
export { FilterFactory };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyRmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvZmlsdGVycy9maWx0ZXJGYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzNDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUduRTtJQU1FLHVCQUFvQixNQUF1QixFQUFVLFNBQTJCLEVBQVUsaUJBQW9DO1FBQTFHLFdBQU0sR0FBTixNQUFNLENBQWlCO1FBQVUsY0FBUyxHQUFULFNBQVMsQ0FBa0I7UUFBVSxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQzVILElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDdEMsQ0FBQztJQUVELDJDQUEyQztJQUMzQyxvQ0FBWSxHQUFaLFVBQWEsWUFBc0M7UUFDakQsSUFBSSxNQUEwQixDQUFDO1FBRS9CLElBQUksWUFBWSxJQUFJLFlBQVksQ0FBQyxLQUFLLEVBQUU7WUFDdEMsTUFBTSxHQUFHLE9BQU8sWUFBWSxDQUFDLEtBQUssS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksWUFBWSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDO1NBQ3pJO1FBRUQsaUNBQWlDO1FBQ2pDLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUU7WUFDMUMsTUFBTSxHQUFHLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztTQUNsRjtRQUVELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUF4QlUsYUFBYTtRQUR6QixVQUFVLEVBQUU7aURBT2lCLGVBQWUsRUFBcUIsZ0JBQWdCLEVBQTZCLGlCQUFpQjtPQU5uSCxhQUFhLENBeUJ6QjtJQUFELG9CQUFDO0NBQUEsQUF6QkQsSUF5QkM7U0F6QlksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRmlsdGVyIH0gZnJvbSAnLi4vbW9kZWxzL2ZpbHRlci5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBDb2x1bW5GaWx0ZXIgfSBmcm9tICcuLi9tb2RlbHMnO1xyXG5pbXBvcnQgeyBTbGlja2dyaWRDb25maWcgfSBmcm9tICcuLi9zbGlja2dyaWQtY29uZmlnJztcclxuaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xyXG5pbXBvcnQgeyBDb2xsZWN0aW9uU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2NvbGxlY3Rpb24uc2VydmljZSc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBGaWx0ZXJGYWN0b3J5IHtcclxuICAvKipcclxuICAgKiBUaGUgb3B0aW9ucyBmcm9tIHRoZSBTbGlja2dyaWRDb25maWdcclxuICAgKi9cclxuICBwcml2YXRlIF9vcHRpb25zOiBhbnk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29uZmlnOiBTbGlja2dyaWRDb25maWcsIHByaXZhdGUgdHJhbnNsYXRlOiBUcmFuc2xhdGVTZXJ2aWNlLCBwcml2YXRlIGNvbGxlY3Rpb25TZXJ2aWNlOiBDb2xsZWN0aW9uU2VydmljZSkge1xyXG4gICAgdGhpcy5fb3B0aW9ucyA9IHRoaXMuY29uZmlnLm9wdGlvbnM7XHJcbiAgfVxyXG5cclxuICAvLyBVc2VzIHRoZSBVc2VyIG1vZGVsIHRvIGNyZWF0ZSBhIG5ldyBVc2VyXHJcbiAgY3JlYXRlRmlsdGVyKGNvbHVtbkZpbHRlcjogQ29sdW1uRmlsdGVyIHwgdW5kZWZpbmVkKTogRmlsdGVyIHwgdW5kZWZpbmVkIHtcclxuICAgIGxldCBmaWx0ZXI6IEZpbHRlciB8IHVuZGVmaW5lZDtcclxuXHJcbiAgICBpZiAoY29sdW1uRmlsdGVyICYmIGNvbHVtbkZpbHRlci5tb2RlbCkge1xyXG4gICAgICBmaWx0ZXIgPSB0eXBlb2YgY29sdW1uRmlsdGVyLm1vZGVsID09PSAnZnVuY3Rpb24nID8gbmV3IGNvbHVtbkZpbHRlci5tb2RlbCh0aGlzLnRyYW5zbGF0ZSwgdGhpcy5jb2xsZWN0aW9uU2VydmljZSkgOiBjb2x1bW5GaWx0ZXIubW9kZWw7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZmFsbGJhY2sgdG8gdGhlIGRlZmF1bHQgZmlsdGVyXHJcbiAgICBpZiAoIWZpbHRlciAmJiB0aGlzLl9vcHRpb25zLmRlZmF1bHRGaWx0ZXIpIHtcclxuICAgICAgZmlsdGVyID0gbmV3IHRoaXMuX29wdGlvbnMuZGVmYXVsdEZpbHRlcih0aGlzLnRyYW5zbGF0ZSwgdGhpcy5jb2xsZWN0aW9uU2VydmljZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGZpbHRlcjtcclxuICB9XHJcbn1cclxuIl19