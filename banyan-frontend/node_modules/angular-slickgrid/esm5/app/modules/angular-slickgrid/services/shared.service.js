var SharedService = /** @class */ (function () {
    function SharedService() {
    }
    Object.defineProperty(SharedService.prototype, "allColumns", {
        // --
        // public
        /** Getter for All Columns  in the grid (hidden/visible) */
        get: function () {
            return this._allColumns;
        },
        /** Setter for All Columns  in the grid (hidden/visible) */
        set: function (allColumns) {
            this._allColumns = allColumns;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SharedService.prototype, "columnDefinitions", {
        /** Getter for the Column Definitions pulled through the Grid Object */
        get: function () {
            return (this._grid && this._grid.getColumns) ? this._grid.getColumns() : [];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SharedService.prototype, "dataView", {
        /** Getter for SlickGrid DataView object */
        get: function () {
            return this._dataView;
        },
        /** Setter for SlickGrid DataView object */
        set: function (dataView) {
            this._dataView = dataView;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SharedService.prototype, "grid", {
        /** Getter for SlickGrid Grid object */
        get: function () {
            return this._grid;
        },
        /** Setter for SlickGrid Grid object */
        set: function (grid) {
            this._grid = grid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SharedService.prototype, "gridOptions", {
        /** Getter for the Grid Options pulled through the Grid Object */
        get: function () {
            return this._gridOptions || this._grid && this._grid.getOptions && this._grid.getOptions() || {};
        },
        /** Setter for the Grid Options pulled through the Grid Object */
        set: function (gridOptions) {
            this._gridOptions = gridOptions;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SharedService.prototype, "groupItemMetadataProvider", {
        /** Getter for the Grid Options */
        get: function () {
            return this._groupItemMetadataProvider;
        },
        /** Setter for the Grid Options */
        set: function (groupItemMetadataProvider) {
            this._groupItemMetadataProvider = groupItemMetadataProvider;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SharedService.prototype, "visibleColumns", {
        /** Getter for the Visible Columns in the grid */
        get: function () {
            return this._visibleColumns;
        },
        /** Setter for the Visible Columns in the grid */
        set: function (visibleColumns) {
            this._visibleColumns = visibleColumns;
        },
        enumerable: true,
        configurable: true
    });
    return SharedService;
}());
export { SharedService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL3NlcnZpY2VzL3NoYXJlZC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBO0lBQUE7SUFzRUEsQ0FBQztJQTFEQyxzQkFBSSxxQ0FBVTtRQUpkLEtBQUs7UUFDTCxTQUFTO1FBRVQsMkRBQTJEO2FBQzNEO1lBQ0UsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQzFCLENBQUM7UUFDRCwyREFBMkQ7YUFDM0QsVUFBZSxVQUFvQjtZQUNqQyxJQUFJLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQztRQUNoQyxDQUFDOzs7T0FKQTtJQU9ELHNCQUFJLDRDQUFpQjtRQURyQix1RUFBdUU7YUFDdkU7WUFDRSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDOUUsQ0FBQzs7O09BQUE7SUFHRCxzQkFBSSxtQ0FBUTtRQURaLDJDQUEyQzthQUMzQztZQUNFLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUN4QixDQUFDO1FBQ0QsMkNBQTJDO2FBQzNDLFVBQWEsUUFBYTtZQUN4QixJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztRQUM1QixDQUFDOzs7T0FKQTtJQU9ELHNCQUFJLCtCQUFJO1FBRFIsdUNBQXVDO2FBQ3ZDO1lBQ0UsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3BCLENBQUM7UUFDRCx1Q0FBdUM7YUFDdkMsVUFBUyxJQUFTO1lBQ2hCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLENBQUM7OztPQUpBO0lBT0Qsc0JBQUksc0NBQVc7UUFEZixpRUFBaUU7YUFDakU7WUFDRSxPQUFPLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxJQUFJLEVBQUUsQ0FBQztRQUNuRyxDQUFDO1FBRUQsaUVBQWlFO2FBQ2pFLFVBQWdCLFdBQXVCO1lBQ3JDLElBQUksQ0FBQyxZQUFZLEdBQUcsV0FBVyxDQUFDO1FBQ2xDLENBQUM7OztPQUxBO0lBUUQsc0JBQUksb0RBQXlCO1FBRDdCLGtDQUFrQzthQUNsQztZQUNFLE9BQU8sSUFBSSxDQUFDLDBCQUEwQixDQUFDO1FBQ3pDLENBQUM7UUFDRCxrQ0FBa0M7YUFDbEMsVUFBOEIseUJBQThCO1lBQzFELElBQUksQ0FBQywwQkFBMEIsR0FBRyx5QkFBeUIsQ0FBQztRQUM5RCxDQUFDOzs7T0FKQTtJQU9ELHNCQUFJLHlDQUFjO1FBRGxCLGlEQUFpRDthQUNqRDtZQUNFLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQztRQUM5QixDQUFDO1FBQ0QsaURBQWlEO2FBQ2pELFVBQW1CLGNBQXdCO1lBQ3pDLElBQUksQ0FBQyxlQUFlLEdBQUcsY0FBYyxDQUFDO1FBQ3hDLENBQUM7OztPQUpBO0lBS0gsb0JBQUM7QUFBRCxDQUFDLEFBdEVELElBc0VDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29sdW1uLCBHcmlkT3B0aW9uIH0gZnJvbSAnLi4vbW9kZWxzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBTaGFyZWRTZXJ2aWNlIHtcclxuICBwcml2YXRlIF9hbGxDb2x1bW5zOiBDb2x1bW5bXTtcclxuICBwcml2YXRlIF9kYXRhVmlldzogYW55O1xyXG4gIHByaXZhdGUgX2dyb3VwSXRlbU1ldGFkYXRhUHJvdmlkZXI6IGFueTtcclxuICBwcml2YXRlIF9ncmlkOiBhbnk7XHJcbiAgcHJpdmF0ZSBfZ3JpZE9wdGlvbnM6IEdyaWRPcHRpb247XHJcbiAgcHJpdmF0ZSBfdmlzaWJsZUNvbHVtbnM6IENvbHVtbltdO1xyXG5cclxuICAvLyAtLVxyXG4gIC8vIHB1YmxpY1xyXG5cclxuICAvKiogR2V0dGVyIGZvciBBbGwgQ29sdW1ucyAgaW4gdGhlIGdyaWQgKGhpZGRlbi92aXNpYmxlKSAqL1xyXG4gIGdldCBhbGxDb2x1bW5zKCk6IENvbHVtbltdIHtcclxuICAgIHJldHVybiB0aGlzLl9hbGxDb2x1bW5zO1xyXG4gIH1cclxuICAvKiogU2V0dGVyIGZvciBBbGwgQ29sdW1ucyAgaW4gdGhlIGdyaWQgKGhpZGRlbi92aXNpYmxlKSAqL1xyXG4gIHNldCBhbGxDb2x1bW5zKGFsbENvbHVtbnM6IENvbHVtbltdKSB7XHJcbiAgICB0aGlzLl9hbGxDb2x1bW5zID0gYWxsQ29sdW1ucztcclxuICB9XHJcblxyXG4gIC8qKiBHZXR0ZXIgZm9yIHRoZSBDb2x1bW4gRGVmaW5pdGlvbnMgcHVsbGVkIHRocm91Z2ggdGhlIEdyaWQgT2JqZWN0ICovXHJcbiAgZ2V0IGNvbHVtbkRlZmluaXRpb25zKCk6IENvbHVtbltdIHtcclxuICAgIHJldHVybiAodGhpcy5fZ3JpZCAmJiB0aGlzLl9ncmlkLmdldENvbHVtbnMpID8gdGhpcy5fZ3JpZC5nZXRDb2x1bW5zKCkgOiBbXTtcclxuICB9XHJcblxyXG4gIC8qKiBHZXR0ZXIgZm9yIFNsaWNrR3JpZCBEYXRhVmlldyBvYmplY3QgKi9cclxuICBnZXQgZGF0YVZpZXcoKTogYW55IHtcclxuICAgIHJldHVybiB0aGlzLl9kYXRhVmlldztcclxuICB9XHJcbiAgLyoqIFNldHRlciBmb3IgU2xpY2tHcmlkIERhdGFWaWV3IG9iamVjdCAqL1xyXG4gIHNldCBkYXRhVmlldyhkYXRhVmlldzogYW55KSB7XHJcbiAgICB0aGlzLl9kYXRhVmlldyA9IGRhdGFWaWV3O1xyXG4gIH1cclxuXHJcbiAgLyoqIEdldHRlciBmb3IgU2xpY2tHcmlkIEdyaWQgb2JqZWN0ICovXHJcbiAgZ2V0IGdyaWQoKTogYW55IHtcclxuICAgIHJldHVybiB0aGlzLl9ncmlkO1xyXG4gIH1cclxuICAvKiogU2V0dGVyIGZvciBTbGlja0dyaWQgR3JpZCBvYmplY3QgKi9cclxuICBzZXQgZ3JpZChncmlkOiBhbnkpIHtcclxuICAgIHRoaXMuX2dyaWQgPSBncmlkO1xyXG4gIH1cclxuXHJcbiAgLyoqIEdldHRlciBmb3IgdGhlIEdyaWQgT3B0aW9ucyBwdWxsZWQgdGhyb3VnaCB0aGUgR3JpZCBPYmplY3QgKi9cclxuICBnZXQgZ3JpZE9wdGlvbnMoKTogR3JpZE9wdGlvbiB7XHJcbiAgICByZXR1cm4gdGhpcy5fZ3JpZE9wdGlvbnMgfHwgdGhpcy5fZ3JpZCAmJiB0aGlzLl9ncmlkLmdldE9wdGlvbnMgJiYgdGhpcy5fZ3JpZC5nZXRPcHRpb25zKCkgfHwge307XHJcbiAgfVxyXG5cclxuICAvKiogU2V0dGVyIGZvciB0aGUgR3JpZCBPcHRpb25zIHB1bGxlZCB0aHJvdWdoIHRoZSBHcmlkIE9iamVjdCAqL1xyXG4gIHNldCBncmlkT3B0aW9ucyhncmlkT3B0aW9uczogR3JpZE9wdGlvbikge1xyXG4gICAgdGhpcy5fZ3JpZE9wdGlvbnMgPSBncmlkT3B0aW9ucztcclxuICB9XHJcblxyXG4gIC8qKiBHZXR0ZXIgZm9yIHRoZSBHcmlkIE9wdGlvbnMgKi9cclxuICBnZXQgZ3JvdXBJdGVtTWV0YWRhdGFQcm92aWRlcigpOiBhbnkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2dyb3VwSXRlbU1ldGFkYXRhUHJvdmlkZXI7XHJcbiAgfVxyXG4gIC8qKiBTZXR0ZXIgZm9yIHRoZSBHcmlkIE9wdGlvbnMgKi9cclxuICBzZXQgZ3JvdXBJdGVtTWV0YWRhdGFQcm92aWRlcihncm91cEl0ZW1NZXRhZGF0YVByb3ZpZGVyOiBhbnkpIHtcclxuICAgIHRoaXMuX2dyb3VwSXRlbU1ldGFkYXRhUHJvdmlkZXIgPSBncm91cEl0ZW1NZXRhZGF0YVByb3ZpZGVyO1xyXG4gIH1cclxuXHJcbiAgLyoqIEdldHRlciBmb3IgdGhlIFZpc2libGUgQ29sdW1ucyBpbiB0aGUgZ3JpZCAqL1xyXG4gIGdldCB2aXNpYmxlQ29sdW1ucygpOiBDb2x1bW5bXSB7XHJcbiAgICByZXR1cm4gdGhpcy5fdmlzaWJsZUNvbHVtbnM7XHJcbiAgfVxyXG4gIC8qKiBTZXR0ZXIgZm9yIHRoZSBWaXNpYmxlIENvbHVtbnMgaW4gdGhlIGdyaWQgKi9cclxuICBzZXQgdmlzaWJsZUNvbHVtbnModmlzaWJsZUNvbHVtbnM6IENvbHVtbltdKSB7XHJcbiAgICB0aGlzLl92aXNpYmxlQ29sdW1ucyA9IHZpc2libGVDb2x1bW5zO1xyXG4gIH1cclxufVxyXG4iXX0=