import * as tslib_1 from "tslib";
import { ExtensionName, GridStateType, } from './../models/index';
import { Subject } from 'rxjs';
var GridStateService = /** @class */ (function () {
    function GridStateService() {
        this._eventHandler = new Slick.EventHandler();
        this._columns = [];
        this._currentColumns = [];
        this.subscriptions = [];
        this.onGridStateChanged = new Subject();
    }
    Object.defineProperty(GridStateService.prototype, "_gridOptions", {
        /** Getter for the Grid Options pulled through the Grid Object */
        get: function () {
            return (this._grid && this._grid.getOptions) ? this._grid.getOptions() : {};
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Initialize the Export Service
     * @param grid
     * @param filterService
     * @param sortService
     * @param dataView
     */
    GridStateService.prototype.init = function (grid, extensionService, filterService, sortService) {
        this._grid = grid;
        this.extensionService = extensionService;
        this.filterService = filterService;
        this.sortService = sortService;
        this.subscribeToAllGridChanges(grid);
    };
    /** Dispose of all the SlickGrid & Angular subscriptions */
    GridStateService.prototype.dispose = function () {
        // unsubscribe all SlickGrid events
        this._eventHandler.unsubscribeAll();
        // also unsubscribe all Angular Subscriptions
        this.subscriptions.forEach(function (subscription) {
            if (subscription && subscription.unsubscribe) {
                subscription.unsubscribe();
            }
        });
        this.subscriptions = [];
        this._currentColumns = [];
        this._columns = [];
    };
    /**
     * Get the current grid state (filters/sorters/pagination)
     * @return grid state
     */
    GridStateService.prototype.getCurrentGridState = function () {
        var gridState = {
            columns: this.getCurrentColumns(),
            filters: this.getCurrentFilters(),
            sorters: this.getCurrentSorters()
        };
        var currentPagination = this.getCurrentPagination();
        if (currentPagination) {
            gridState.pagination = currentPagination;
        }
        return gridState;
    };
    /**
     * Get the Columns (and their state: visibility/position) that are currently applied in the grid
     * @return current columns
     */
    GridStateService.prototype.getColumns = function () {
        return this._columns;
    };
    /**
     * From an array of Grid Column Definitions, get the associated Current Columns
     * @param gridColumns
     */
    GridStateService.prototype.getAssociatedCurrentColumns = function (gridColumns) {
        var currentColumns = [];
        if (gridColumns && Array.isArray(gridColumns)) {
            gridColumns.forEach(function (column, index) {
                if (column && column.id) {
                    currentColumns.push({
                        columnId: column.id,
                        cssClass: column.cssClass || '',
                        headerCssClass: column.headerCssClass || '',
                        width: column.width || 0
                    });
                }
            });
        }
        this._currentColumns = currentColumns;
        return currentColumns;
    };
    /**
     * From an array of Current Columns, get the associated Grid Column Definitions
     * @param grid
     * @param currentColumns
     */
    GridStateService.prototype.getAssociatedGridColumns = function (grid, currentColumns) {
        var columns = [];
        var gridColumns = grid.getColumns();
        if (currentColumns && Array.isArray(currentColumns)) {
            currentColumns.forEach(function (currentColumn, index) {
                var gridColumn = gridColumns.find(function (c) { return c.id === currentColumn.columnId; });
                if (gridColumn && gridColumn.id) {
                    columns.push(tslib_1.__assign({}, gridColumn, { cssClass: currentColumn.cssClass, headerCssClass: currentColumn.headerCssClass, width: currentColumn.width }));
                }
            });
        }
        this._columns = columns;
        return columns;
    };
    /**
     * Get the Columns (and their state: visibility/position) that are currently applied in the grid
     * @return current columns
     */
    GridStateService.prototype.getCurrentColumns = function () {
        var currentColumns = [];
        if (this._currentColumns && Array.isArray(this._currentColumns) && this._currentColumns.length > 0) {
            currentColumns = this._currentColumns;
        }
        else {
            currentColumns = this.getAssociatedCurrentColumns(this._grid.getColumns());
        }
        return currentColumns;
    };
    /**
     * Get the Filters (and their state, columnId, searchTerm(s)) that are currently applied in the grid
     * @return current filters
     */
    GridStateService.prototype.getCurrentFilters = function () {
        if (this._gridOptions && this._gridOptions.backendServiceApi) {
            var backendService = this._gridOptions.backendServiceApi.service;
            if (backendService && backendService.getCurrentFilters) {
                return backendService.getCurrentFilters();
            }
        }
        else if (this.filterService && this.filterService.getCurrentLocalFilters) {
            return this.filterService.getCurrentLocalFilters();
        }
        return null;
    };
    /**
     * Get current Pagination (and it's state, pageNumber, pageSize) that are currently applied in the grid
     * @return current pagination state
     */
    GridStateService.prototype.getCurrentPagination = function () {
        if (this._gridOptions && this._gridOptions.backendServiceApi) {
            var backendService = this._gridOptions.backendServiceApi.service;
            if (backendService && backendService.getCurrentPagination) {
                return backendService.getCurrentPagination();
            }
        }
        else {
            // TODO implement this whenever local pagination gets implemented
        }
        return null;
    };
    /**
     * Get the current Sorters (and their state, columnId, direction) that are currently applied in the grid
     * @return current sorters
     */
    GridStateService.prototype.getCurrentSorters = function () {
        if (this._gridOptions && this._gridOptions.backendServiceApi) {
            var backendService = this._gridOptions.backendServiceApi.service;
            if (backendService && backendService.getCurrentSorters) {
                return backendService.getCurrentSorters();
            }
        }
        else if (this.sortService && this.sortService.getCurrentLocalSorters) {
            return this.sortService.getCurrentLocalSorters();
        }
        return null;
    };
    GridStateService.prototype.resetColumns = function (columnDefinitions) {
        var columns = columnDefinitions || this._columns;
        var currentColumns = this.getAssociatedCurrentColumns(columns);
        this.onGridStateChanged.next({ change: { newValues: currentColumns, type: GridStateType.columns }, gridState: this.getCurrentGridState() });
    };
    /** if we use Row Selection or the Checkbox Selector, we need to reset any selection */
    GridStateService.prototype.resetRowSelection = function () {
        if (this._gridOptions.enableRowSelection || this._gridOptions.enableCheckboxSelector) {
            // this also requires the Row Selection Model to be registered as well
            var rowSelectionExtension = this.extensionService && this.extensionService.getExtensionByName && this.extensionService.getExtensionByName(ExtensionName.rowSelection);
            if (rowSelectionExtension && rowSelectionExtension.instance) {
                this._grid.setSelectedRows([]);
            }
        }
    };
    /**
     * Subscribe to all necessary SlickGrid or Service Events that deals with a Grid change,
     * when triggered, we will publish a Grid State Event with current Grid State
     */
    GridStateService.prototype.subscribeToAllGridChanges = function (grid) {
        var _this = this;
        // Subscribe to Event Emitter of Filter changed
        this.subscriptions.push(this.filterService.onFilterChanged.subscribe(function (currentFilters) {
            _this.resetRowSelection();
            _this.onGridStateChanged.next({ change: { newValues: currentFilters, type: GridStateType.filter }, gridState: _this.getCurrentGridState() });
        }));
        // Subscribe to Event Emitter of Filter cleared
        this.subscriptions.push(this.filterService.onFilterCleared.subscribe(function () {
            _this.resetRowSelection();
            _this.onGridStateChanged.next({ change: { newValues: [], type: GridStateType.filter }, gridState: _this.getCurrentGridState() });
        }));
        // Subscribe to Event Emitter of Sort changed
        this.subscriptions.push(this.sortService.onSortChanged.subscribe(function (currentSorters) {
            _this.resetRowSelection();
            _this.onGridStateChanged.next({ change: { newValues: currentSorters, type: GridStateType.sorter }, gridState: _this.getCurrentGridState() });
        }));
        // Subscribe to Event Emitter of Sort cleared
        this.subscriptions.push(this.sortService.onSortCleared.subscribe(function () {
            _this.resetRowSelection();
            _this.onGridStateChanged.next({ change: { newValues: [], type: GridStateType.sorter }, gridState: _this.getCurrentGridState() });
        }));
        // Subscribe to ColumnPicker and/or GridMenu for show/hide Columns visibility changes
        this.bindExtensionAddonEventToGridStateChange(ExtensionName.columnPicker, 'onColumnsChanged');
        this.bindExtensionAddonEventToGridStateChange(ExtensionName.gridMenu, 'onColumnsChanged');
        // subscribe to Column Resize & Reordering
        this.bindSlickGridEventToGridStateChange('onColumnsReordered', grid);
        this.bindSlickGridEventToGridStateChange('onColumnsResized', grid);
    };
    // --
    // private methods
    // ------------------
    /**
     * Bind a SlickGrid Extension Event to a Grid State change event
     * @param extension name
     * @param grid
     */
    GridStateService.prototype.bindExtensionAddonEventToGridStateChange = function (extensionName, eventName) {
        var _this = this;
        var extension = this.extensionService && this.extensionService.getExtensionByName && this.extensionService.getExtensionByName(extensionName);
        var slickEvent = extension && extension.instance && extension.instance[eventName];
        if (slickEvent && slickEvent.subscribe) {
            this._eventHandler.subscribe(slickEvent, function (e, args) {
                var columns = args && args.columns;
                var currentColumns = _this.getAssociatedCurrentColumns(columns);
                _this.onGridStateChanged.next({ change: { newValues: currentColumns, type: GridStateType.columns }, gridState: _this.getCurrentGridState() });
            });
        }
    };
    /**
     * Bind a Grid Event to a Grid State change event
     * @param event name
     * @param grid
     */
    GridStateService.prototype.bindSlickGridEventToGridStateChange = function (eventName, grid) {
        var _this = this;
        var slickGridEvent = grid && grid[eventName];
        if (slickGridEvent && slickGridEvent.subscribe) {
            this._eventHandler.subscribe(slickGridEvent, function (e, args) {
                var columns = grid.getColumns();
                var currentColumns = _this.getAssociatedCurrentColumns(columns);
                _this.onGridStateChanged.next({ change: { newValues: currentColumns, type: GridStateType.columns }, gridState: _this.getCurrentGridState() });
            });
        }
    };
    return GridStateService;
}());
export { GridStateService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZFN0YXRlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL3NlcnZpY2VzL2dyaWRTdGF0ZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBTUwsYUFBYSxFQUliLGFBQWEsR0FDZCxNQUFNLG1CQUFtQixDQUFDO0FBSTNCLE9BQU8sRUFBRSxPQUFPLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBSzdDO0lBQUE7UUFDVSxrQkFBYSxHQUFHLElBQUksS0FBSyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3pDLGFBQVEsR0FBYSxFQUFFLENBQUM7UUFDeEIsb0JBQWUsR0FBb0IsRUFBRSxDQUFDO1FBS3RDLGtCQUFhLEdBQW1CLEVBQUUsQ0FBQztRQUMzQyx1QkFBa0IsR0FBRyxJQUFJLE9BQU8sRUFBbUIsQ0FBQztJQXFSdEQsQ0FBQztJQWxSQyxzQkFBWSwwQ0FBWTtRQUR4QixpRUFBaUU7YUFDakU7WUFDRSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDOUUsQ0FBQzs7O09BQUE7SUFFRDs7Ozs7O09BTUc7SUFDSCwrQkFBSSxHQUFKLFVBQUssSUFBUyxFQUFFLGdCQUFrQyxFQUFFLGFBQTRCLEVBQUUsV0FBd0I7UUFDeEcsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDbEIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLGdCQUFnQixDQUFDO1FBQ3pDLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1FBQ25DLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBRS9CLElBQUksQ0FBQyx5QkFBeUIs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QUFFLEVBQUUsQ0FBQyxDQUFDO1lBQzlJLENBQUMsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNLLDhEQUFtQyxHQUEzQyxVQUE0QyxTQUFpQixFQUFFLElBQVM7UUFBeEUsaUJBVUM7UUFUQyxJQUFNLGNBQWMsR0FBRyxJQUFJLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRS9DLElBQUksY0FBYyxJQUFJLGNBQWMsQ0FBQyxTQUFTLEVBQUU7WUFDOUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsY0FBYyxFQUFFLFVBQUMsQ0FBUSxFQUFFLElBQVM7Z0JBQy9ELElBQU0sT0FBTyxHQUFhLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztnQkFDNUMsSUFBTSxjQUFjLEdBQW9CLEtBQUksQ0FBQywyQkFBMkIsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDbEYsS0FBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxFQUFFLFNBQVMsRUFBRSxjQUFjLEVBQUUsSUFBSSxFQUFFLGFBQWEsQ0FBQyxPQUFPLEVBQUUsRUFBRSxTQUFTLEVBQUUsS0FBSSxDQUFDLG1CQUFtQixFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQzlJLENBQUMsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDO0lBQ0gsdUJBQUM7QUFBRCxDQUFDLEFBOVJELElBOFJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb2x1bW4sXHJcbiAgQ3VycmVudENvbHVtbixcclxuICBDdXJyZW50RmlsdGVyLFxyXG4gIEN1cnJlbnRQYWdpbmF0aW9uLFxyXG4gIEN1cnJlbnRTb3J0ZXIsXHJcbiAgRXh0ZW5zaW9uTmFtZSxcclxuICBHcmlkT3B0aW9uLFxyXG4gIEdyaWRTdGF0ZSxcclxuICBHcmlkU3RhdGVDaGFuZ2UsXHJcbiAgR3JpZFN0YXRlVHlwZSxcclxufSBmcm9tICcuLy4uL21vZGVscy9pbmRleCc7XHJcbmltcG9ydCB7IEV4dGVuc2lvblNlcnZpY2UgfSBmcm9tICcuL2V4dGVuc2lvbi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRmlsdGVyU2VydmljZSB9IGZyb20gJy4vZmlsdGVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTb3J0U2VydmljZSB9IGZyb20gJy4vc29ydC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcblxyXG4vLyB1c2luZyBleHRlcm5hbCBub24tdHlwZWQganMgbGlicmFyaWVzXHJcbmRlY2xhcmUgdmFyIFNsaWNrOiBhbnk7XHJcblxyXG5leHBvcnQgY2xhc3MgR3JpZFN0YXRlU2VydmljZSB7XHJcbiAgcHJpdmF0ZSBfZXZlbnRIYW5kbGVyID0gbmV3IFNsaWNrLkV2ZW50SGFuZGxlcigpO1xyXG4gIHByaXZhdGUgX2NvbHVtbnM6IENvbHVtbltdID0gW107XHJcbiAgcHJpdmF0ZSBfY3VycmVudENvbHVtbnM6IEN1cnJlbnRDb2x1bW5bXSA9IFtdO1xyXG4gIHByaXZhdGUgX2dyaWQ6IGFueTtcclxuICBwcml2YXRlIGV4dGVuc2lvblNlcnZpY2U6IEV4dGVuc2lvblNlcnZpY2U7XHJcbiAgcHJpdmF0ZSBmaWx0ZXJTZXJ2aWNlOiBGaWx0ZXJTZXJ2aWNlO1xyXG4gIHByaXZhdGUgc29ydFNlcnZpY2U6IFNvcnRTZXJ2aWNlO1xyXG4gIHByaXZhdGUgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcclxuICBvbkdyaWRTdGF0ZUNoYW5nZWQgPSBuZXcgU3ViamVjdDxHcmlkU3RhdGVDaGFuZ2U+KCk7XHJcblxyXG4gIC8qKiBHZXR0ZXIgZm9yIHRoZSBHcmlkIE9wdGlvbnMgcHVsbGVkIHRocm91Z2ggdGhlIEdyaWQgT2JqZWN0ICovXHJcbiAgcHJpdmF0ZSBnZXQgX2dyaWRPcHRpb25zKCk6IEdyaWRPcHRpb24ge1xyXG4gICAgcmV0dXJuICh0aGlzLl9ncmlkICYmIHRoaXMuX2dyaWQuZ2V0T3B0aW9ucykgPyB0aGlzLl9ncmlkLmdldE9wdGlvbnMoKSA6IHt9O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSW5pdGlhbGl6ZSB0aGUgRXhwb3J0IFNlcnZpY2VcclxuICAgKiBAcGFyYW0gZ3JpZFxyXG4gICAqIEBwYXJhbSBmaWx0ZXJTZXJ2aWNlXHJcbiAgICogQHBhcmFtIHNvcnRTZXJ2aWNlXHJcbiAgICogQHBhcmFtIGRhdGFWaWV3XHJcbiAgICovXHJcbiAgaW5pdChncmlkOiBhbnksIGV4dGVuc2lvblNlcnZpY2U6IEV4dGVuc2lvblNlcnZpY2UsIGZpbHRlclNlcnZpY2U6IEZpbHRlclNlcnZpY2UsIHNvcnRTZXJ2aWNlOiBTb3J0U2VydmljZSk6IHZvaWQge1xyXG4gICAgdGhpcy5fZ3JpZCA9IGdyaWQ7XHJcbiAgICB0aGlzLmV4dGVuc2lvblNlcnZpY2UgPSBleHRlbnNpb25TZXJ2aWNlO1xyXG4gICAgdGhpcy5maWx0ZXJTZXJ2aWNlID0gZmlsdGVyU2VydmljZTtcclxuICAgIHRoaXMuc29ydFNlcnZpY2UgPSBzb3J0U2VydmljZTtcclxuXHJcbiAgICB0aGlzLnN1YnNjcmliZVRvQWxsR3JpZENoYW5nZXMoZ3JpZCk7XHJcbiAgfVxyXG5cclxuICAvKiogRGlzcG9zZSBvZiBhbGwgdGhlIFNsaWNrR3JpZCAmIEFuZ3VsYXIgc3Vic2NyaXB0aW9ucyAqL1xyXG4gIGRpc3Bvc2UoKSB7XHJcbiAgICAvLyB1bnN1YnNjcmliZSBhbGwgU2xpY2tHcmlkIGV2ZW50c1xyXG4gICAgdGhpcy5fZXZlbnRIYW5kbGVyLnVuc3Vic2NyaWJlQWxsKCk7XHJcblxyXG4gICAgLy8gYWxzbyB1bnN1YnNjcmliZSBhbGwgQW5ndWxhciBTdWJzY3JpcHRpb25zXHJcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZm9yRWFjaCgoc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24pID0+IHtcclxuICAgICAgaWYgKHN1YnNjcmlwdGlvbiAmJiBzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUpIHtcclxuICAgICAgICBzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMgPSBbXTtcclxuICAgIHRoaXMuX2N1cnJlbnRDb2x1bW5zID0gW107XHJcbiAgICB0aGlzLl9jb2x1bW5zID0gW107XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIGN1cnJlbnQgZ3JpZCBzdGF0ZSAoZmlsdGVycy9zb3J0ZXJzL3BhZ2luYXRpb24pXHJcbiAgICogQHJldHVybiBncmlkIHN0YXRlXHJcbiAgICovXHJcbiAgZ2V0Q3VycmVudEdyaWRTdGF0ZSgpOiBHcmlkU3RhdGUge1xyXG4gICAgY29uc3QgZ3JpZFN0YXRlOiBHcmlkU3RhdGUgPSB7XHJcbiAgICAgIGNvbHVtbnM6IHRoaXMuZ2V0Q3VycmVudENvbHVtbnMoKSxcclxuICAgICAgZmlsdGVyczogdGhpcy5nZXRDdXJyZW50RmlsdGVycygpLFxyXG4gICAgICBzb3J0ZXJzOiB0aGlzLmdldEN1cnJlbnRTb3J0ZXJzKClcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgY3VycmVudFBhZ2luYXRpb24gPSB0aGlzLmdldEN1cnJlbnRQYWdpbmF0aW9uKCk7XHJcbiAgICBpZiAoY3VycmVudFBhZ2luYXRpb24pIHtcclxuICAgICAgZ3JpZFN0YXRlLnBhZ2luYXRpb24gPSBjdXJyZW50UGFnaW5hdGlvbjtcclxuICAgIH1cclxuICAgIHJldHVybiBncmlkU3RhdGU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIENvbHVtbnMgKGFuZCB0aGVpciBzdGF0ZTogdmlzaWJpbGl0eS9wb3NpdGlvbikgdGhhdCBhcmUgY3VycmVudGx5IGFwcGxpZWQgaW4gdGhlIGdyaWRcclxuICAgKiBAcmV0dXJuIGN1cnJlbnQgY29sdW1uc1xyXG4gICAqL1xyXG4gIGdldENvbHVtbnMoKTogQ29sdW1uW10ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2NvbHVtbnM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBGcm9tIGFuIGFycmF5IG9mIEdyaWQgQ29sdW1uIERlZmluaXRpb25zLCBnZXQgdGhlIGFzc29jaWF0ZWQgQ3VycmVudCBDb2x1bW5zXHJcbiAgICogQHBhcmFtIGdyaWRDb2x1bW5zXHJcbiAgICovXHJcbiAgZ2V0QXNzb2NpYXRlZEN1cnJlbnRDb2x1bW5zKGdyaWRDb2x1bW5zOiBDb2x1bW5bXSk6IEN1cnJlbnRDb2x1bW5bXSB7XHJcbiAgICBjb25zdCBjdXJyZW50Q29sdW1uczogQ3VycmVudENvbHVtbltdID0gW107XHJcblxyXG4gICAgaWYgKGdyaWRDb2x1bW5zICYmIEFycmF5LmlzQXJyYXkoZ3JpZENvbHVtbnMpKSB7XHJcbiAgICAgIGdyaWRDb2x1bW5zLmZvckVhY2goKGNvbHVtbjogQ29sdW1uLCBpbmRleDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgaWYgKGNvbHVtbiAmJiBjb2x1bW4uaWQpIHtcclxuICAgICAgICAgIGN1cnJlbnRDb2x1bW5zLnB1c2goe1xyXG4gICAgICAgICAgICBjb2x1bW5JZDogY29sdW1uLmlkIGFzIHN0cmluZyxcclxuICAgICAgICAgICAgY3NzQ2xhc3M6IGNvbHVtbi5jc3NDbGFzcyB8fCAnJyxcclxuICAgICAgICAgICAgaGVhZGVyQ3NzQ2xhc3M6IGNvbHVtbi5oZWFkZXJDc3NDbGFzcyB8fCAnJyxcclxuICAgICAgICAgICAgd2lkdGg6IGNvbHVtbi53aWR0aCB8fCAwXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgdGhpcy5fY3VycmVudENvbHVtbnMgPSBjdXJyZW50Q29sdW1ucztcclxuICAgIHJldHVybiBjdXJyZW50Q29sdW1ucztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEZyb20gYW4gYXJyYXkgb2YgQ3VycmVudCBDb2x1bW5zLCBnZXQgdGhlIGFzc29jaWF0ZWQgR3JpZCBDb2x1bW4gRGVmaW5pdGlvbnNcclxuICAgKiBAcGFyYW0gZ3JpZFxyXG4gICAqIEBwYXJhbSBjdXJyZW50Q29sdW1uc1xyXG4gICAqL1xyXG4gIGdldEFzc29jaWF0ZWRHcmlkQ29sdW1ucyhncmlkOiBhbnksIGN1cnJlbnRDb2x1bW5zOiBDdXJyZW50Q29sdW1uW10pOiBDb2x1bW5bXSB7XHJcbiAgICBjb25zdCBjb2x1bW5zOiBDb2x1bW5bXSA9IFtdO1xyXG4gICAgY29uc3QgZ3JpZENvbHVtbnM6IENvbHVtbltdID0gZ3JpZC5nZXRDb2x1bW5zKCk7XHJcblxyXG4gICAgaWYgKGN1cnJlbnRDb2x1bW5zICYmIEFycmF5LmlzQXJyYXkoY3VycmVudENvbHVtbnMpKSB7XHJcbiAgICAgIGN1cnJlbnRDb2x1bW5zLmZvckVhY2goKGN1cnJlbnRDb2x1bW46IEN1cnJlbnRDb2x1bW4sIGluZGV4OiBudW1iZXIpID0+IHtcclxuICAgICAgICBjb25zdCBncmlkQ29sdW1uOiBDb2x1bW4gPSBncmlkQ29sdW1ucy5maW5kKChjOiBDb2x1bW4pID0+IGMuaWQgPT09IGN1cnJlbnRDb2x1bW4uY29sdW1uSWQpO1xyXG4gICAgICAgIGlmIChncmlkQ29sdW1uICYmIGdyaWRDb2x1bW4uaWQpIHtcclxuICAgICAgICAgIGNvbHVtbnMucHVzaCh7XHJcbiAgICAgICAgICAgIC4uLmdyaWRDb2x1bW4sXHJcbiAgICAgICAgICAgIGNzc0NsYXNzOiBjdXJyZW50Q29sdW1uLmNzc0NsYXNzLFxyXG4gICAgICAgICAgICBoZWFkZXJDc3NDbGFzczogY3VycmVudENvbHVtbi5oZWFkZXJDc3NDbGFzcyxcclxuICAgICAgICAgICAgd2lkdGg6IGN1cnJlbnRDb2x1bW4ud2lkdGhcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLl9jb2x1bW5zID0gY29sdW1ucztcclxuICAgIHJldHVybiBjb2x1bW5zO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBDb2x1bW5zIChhbmQgdGhlaXIgc3RhdGU6IHZpc2liaWxpdHkvcG9zaXRpb24pIHRoYXQgYXJlIGN1cnJlbnRseSBhcHBsaWVkIGluIHRoZSBncmlkXHJcbiAgICogQHJldHVybiBjdXJyZW50IGNvbHVtbnNcclxuICAgKi9cclxuICBnZXRDdXJyZW50Q29sdW1ucygpOiBDdXJyZW50Q29sdW1uW10ge1xyXG4gICAgbGV0IGN1cnJlbnRDb2x1bW5zOiBDdXJyZW50Q29sdW1uW10gPSBbXTtcclxuICAgIGlmICh0aGlzLl9jdXJyZW50Q29sdW1ucyAmJiBBcnJheS5pc0FycmF5KHRoaXMuX2N1cnJlbnRDb2x1bW5zKSAmJiB0aGlzLl9jdXJyZW50Q29sdW1ucy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGN1cnJlbnRDb2x1bW5zID0gdGhpcy5fY3VycmVudENvbHVtbnM7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjdXJyZW50Q29sdW1ucyA9IHRoaXMuZ2V0QXNzb2NpYXRlZEN1cnJlbnRDb2x1bW5zKHRoaXMuX2dyaWQuZ2V0Q29sdW1ucygpKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gY3VycmVudENvbHVtbnM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIEZpbHRlcnMgKGFuZCB0aGVpciBzdGF0ZSwgY29sdW1uSWQsIHNlYXJjaFRlcm0ocykpIHRoYXQgYXJlIGN1cnJlbnRseSBhcHBsaWVkIGluIHRoZSBncmlkXHJcbiAgICogQHJldHVybiBjdXJyZW50IGZpbHRlcnNcclxuICAgKi9cclxuICBnZXRDdXJyZW50RmlsdGVycygpOiBDdXJyZW50RmlsdGVyW10gfCBudWxsIHtcclxuICAgIGlmICh0aGlzLl9ncmlkT3B0aW9ucyAmJiB0aGlzLl9ncmlkT3B0aW9ucy5iYWNrZW5kU2VydmljZUFwaSkge1xyXG4gICAgICBjb25zdCBiYWNrZW5kU2VydmljZSA9IHRoaXMuX2dyaWRPcHRpb25zLmJhY2tlbmRTZXJ2aWNlQXBpLnNlcnZpY2U7XHJcbiAgICAgIGlmIChiYWNrZW5kU2VydmljZSAmJiBiYWNrZW5kU2VydmljZS5nZXRDdXJyZW50RmlsdGVycykge1xyXG4gICAgICAgIHJldHVybiBiYWNrZW5kU2VydmljZS5nZXRDdXJyZW50RmlsdGVycygpIGFzIEN1cnJlbnRGaWx0ZXJbXTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmICh0aGlzLmZpbHRlclNlcnZpY2UgJiYgdGhpcy5maWx0ZXJTZXJ2aWNlLmdldEN1cnJlbnRMb2NhbEZpbHRlcnMpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZmlsdGVyU2VydmljZS5nZXRDdXJyZW50TG9jYWxGaWx0ZXJzKCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCBjdXJyZW50IFBhZ2luYXRpb24gKGFuZCBpdCdzIHN0YXRlLCBwYWdlTnVtYmVyLCBwYWdlU2l6ZSkgdGhhdCBhcmUgY3VycmVudGx5IGFwcGxpZWQgaW4gdGhlIGdyaWRcclxuICAgKiBAcmV0dXJuIGN1cnJlbnQgcGFnaW5hdGlvbiBzdGF0ZVxyXG4gICAqL1xyXG4gIGdldEN1cnJlbnRQYWdpbmF0aW9uKCk6IEN1cnJlbnRQYWdpbmF0aW9uIHwgbnVsbCB7XHJcbiAgICBpZiAodGhpcy5fZ3JpZE9wdGlvbnMgJiYgdGhpcy5fZ3JpZE9wdGlvbnMuYmFja2VuZFNlcnZpY2VBcGkpIHtcclxuICAgICAgY29uc3QgYmFja2VuZFNlcnZpY2UgPSB0aGlzLl9ncmlkT3B0aW9ucy5iYWNrZW5kU2VydmljZUFwaS5zZXJ2aWNlO1xyXG4gICAgICBpZiAoYmFja2VuZFNlcnZpY2UgJiYgYmFja2VuZFNlcnZpY2UuZ2V0Q3VycmVudFBhZ2luYXRpb24pIHtcclxuICAgICAgICByZXR1cm4gYmFja2VuZFNlcnZpY2UuZ2V0Q3VycmVudFBhZ2luYXRpb24oKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gVE9ETyBpbXBsZW1lbnQgdGhpcyB3aGVuZXZlciBsb2NhbCBwYWdpbmF0aW9uIGdldHMgaW1wbGVtZW50ZWRcclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBjdXJyZW50IFNvcnRlcnMgKGFuZCB0aGVpciBzdGF0ZSwgY29sdW1uSWQsIGRpcmVjdGlvbikgdGhhdCBhcmUgY3VycmVudGx5IGFwcGxpZWQgaW4gdGhlIGdyaWRcclxuICAgKiBAcmV0dXJuIGN1cnJlbnQgc29ydGVyc1xyXG4gICAqL1xyXG4gIGdldEN1cnJlbnRTb3J0ZXJzKCk6IEN1cnJlbnRTb3J0ZXJbXSB8IG51bGwge1xyXG4gICAgaWYgKHRoaXMuX2dyaWRPcHRpb25zICYmIHRoaXMuX2dyaWRPcHRpb25zLmJhY2tlbmRTZXJ2aWNlQXBpKSB7XHJcbiAgICAgIGNvbnN0IGJhY2tlbmRTZXJ2aWNlID0gdGhpcy5fZ3JpZE9wdGlvbnMuYmFja2VuZFNlcnZpY2VBcGkuc2VydmljZTtcclxuICAgICAgaWYgKGJhY2tlbmRTZXJ2aWNlICYmIGJhY2tlbmRTZXJ2aWNlLmdldEN1cnJlbnRTb3J0ZXJzKSB7XHJcbiAgICAgICAgcmV0dXJuIGJhY2tlbmRTZXJ2aWNlLmdldEN1cnJlbnRTb3J0ZXJzKCkgYXMgQ3VycmVudFNvcnRlcltdO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuc29ydFNlcnZpY2UgJiYgdGhpcy5zb3J0U2VydmljZS5nZXRDdXJyZW50TG9jYWxTb3J0ZXJzKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnNvcnRTZXJ2aWNlLmdldEN1cnJlbnRMb2NhbFNvcnRlcnMoKTtcclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgcmVzZXRDb2x1bW5zKGNvbHVtbkRlZmluaXRpb25zPzogQ29sdW1uW10pIHtcclxuICAgIGNvbnN0IGNvbHVtbnM6IENvbHVtbltdID0gY29sdW1uRGVmaW5pdGlvbnMgfHwgdGhpcy5fY29sdW1ucztcclxuICAgIGNvbnN0IGN1cnJlbnRDb2x1bW5zOiBDdXJyZW50Q29sdW1uW10gPSB0aGlzLmdldEFzc29jaWF0ZWRDdXJyZW50Q29sdW1ucyhjb2x1bW5zKTtcclxuICAgIHRoaXMub25HcmlkU3RhdGVDaGFuZ2VkLm5leHQoeyBjaGFuZ2U6IHsgbmV3VmFsdWVzOiBjdXJyZW50Q29sdW1ucywgdHlwZTogR3JpZFN0YXRlVHlwZS5jb2x1bW5zIH0sIGdyaWRTdGF0ZTogdGhpcy5nZXRDdXJyZW50R3JpZFN0YXRlKCkgfSk7XHJcbiAgfVxyXG5cclxuICAvKiogaWYgd2UgdXNlIFJvdyBTZWxlY3Rpb24gb3IgdGhlIENoZWNrYm94IFNlbGVjdG9yLCB3ZSBuZWVkIHRvIHJlc2V0IGFueSBzZWxlY3Rpb24gKi9cclxuICByZXNldFJvd1NlbGVjdGlvbigpIHtcclxuICAgIGlmICh0aGlzLl9ncmlkT3B0aW9ucy5lbmFibGVSb3dTZWxlY3Rpb24gfHwgdGhpcy5fZ3JpZE9wdGlvbnMuZW5hYmxlQ2hlY2tib3hTZWxlY3Rvcikge1xyXG4gICAgICAvLyB0aGlzIGFsc28gcmVxdWlyZXMgdGhlIFJvdyBTZWxlY3Rpb24gTW9kZWwgdG8gYmUgcmVnaXN0ZXJlZCBhcyB3ZWxsXHJcbiAgICAgIGNvbnN0IHJvd1NlbGVjdGlvbkV4dGVuc2lvbiA9IHRoaXMuZXh0ZW5zaW9uU2VydmljZSAmJiB0aGlzLmV4dGVuc2lvblNlcnZpY2UuZ2V0RXh0ZW5zaW9uQnlOYW1lICYmIHRoaXMuZXh0ZW5zaW9uU2VydmljZS5nZXRFeHRlbnNpb25CeU5hbWUoRXh0ZW5zaW9uTmFtZS5yb3dTZWxlY3Rpb24pO1xyXG4gICAgICBpZiAocm93U2VsZWN0aW9uRXh0ZW5zaW9uICYmIHJvd1NlbGVjdGlvbkV4dGVuc2lvbi5pbnN0YW5jZSkge1xyXG4gICAgICAgIHRoaXMuX2dyaWQuc2V0U2VsZWN0ZWRSb3dzKFtdKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3Vic2NyaWJlIHRvIGFsbCBuZWNlc3NhcnkgU2xpY2tHcmlkIG9yIFNlcnZpY2UgRXZlbnRzIHRoYXQgZGVhbHMgd2l0aCBhIEdyaWQgY2hhbmdlLFxyXG4gICAqIHdoZW4gdHJpZ2dlcmVkLCB3ZSB3aWxsIHB1Ymxpc2ggYSBHcmlkIFN0YXRlIEV2ZW50IHdpdGggY3VycmVudCBHcmlkIFN0YXRlXHJcbiAgICovXHJcbiAgc3Vic2NyaWJlVG9BbGxHcmlkQ2hhbmdlcyhncmlkOiBhbnkpIHtcclxuICAgIC8vIFN1YnNjcmliZSB0byBFdmVudCBFbWl0dGVyIG9mIEZpbHRlciBjaGFuZ2VkXHJcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcclxuICAgICAgdGhpcy5maWx0ZXJTZXJ2aWNlLm9uRmlsdGVyQ2hhbmdlZC5zdWJzY3JpYmUoKGN1cnJlbnRGaWx0ZXJzOiBDdXJyZW50RmlsdGVyW10pID0+IHtcclxuICAgICAgICB0aGlzLnJlc2V0Um93U2VsZWN0aW9uKCk7XHJcbiAgICAgICAgdGhpcy5vbkdyaWRTdGF0ZUNoYW5nZWQubmV4dCh7IGNoYW5nZTogeyBuZXdWYWx1ZXM6IGN1cnJlbnRGaWx0ZXJzLCB0eXBlOiBHcmlkU3RhdGVUeXBlLmZpbHRlciB9LCBncmlkU3RhdGU6IHRoaXMuZ2V0Q3VycmVudEdyaWRTdGF0ZSgpIH0pO1xyXG4gICAgICB9KVxyXG4gICAgKTtcclxuICAgIC8vIFN1YnNjcmliZSB0byBFdmVudCBFbWl0dGVyIG9mIEZpbHRlciBjbGVhcmVkXHJcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcclxuICAgICAgdGhpcy5maWx0ZXJTZXJ2aWNlLm9uRmlsdGVyQ2xlYXJlZC5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMucmVzZXRSb3dTZWxlY3Rpb24oKTtcclxuICAgICAgICB0aGlzLm9uR3JpZFN0YXRlQ2hhbmdlZC5uZXh0KHsgY2hhbmdlOiB7IG5ld1ZhbHVlczogW10sIHR5cGU6IEdyaWRTdGF0ZVR5cGUuZmlsdGVyIH0sIGdyaWRTdGF0ZTogdGhpcy5nZXRDdXJyZW50R3JpZFN0YXRlKCkgfSk7XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG5cclxuICAgIC8vIFN1YnNjcmliZSB0byBFdmVudCBFbWl0dGVyIG9mIFNvcnQgY2hhbmdlZFxyXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXHJcbiAgICAgIHRoaXMuc29ydFNlcnZpY2Uub25Tb3J0Q2hhbmdlZC5zdWJzY3JpYmUoKGN1cnJlbnRTb3J0ZXJzOiBDdXJyZW50U29ydGVyW10pID0+IHtcclxuICAgICAgICB0aGlzLnJlc2V0Um93U2VsZWN0aW9uKCk7XHJcbiAgICAgICAgdGhpcy5vbkdyaWRTdGF0ZUNoYW5nZWQubmV4dCh7IGNoYW5nZTogeyBuZXdWYWx1ZXM6IGN1cnJlbnRTb3J0ZXJzLCB0eXBlOiBHcmlkU3RhdGVUeXBlLnNvcnRlciB9LCBncmlkU3RhdGU6IHRoaXMuZ2V0Q3VycmVudEdyaWRTdGF0ZSgpIH0pO1xyXG4gICAgICB9KVxyXG4gICAgKTtcclxuXHJcbiAgICAvLyBTdWJzY3JpYmUgdG8gRXZlbnQgRW1pdHRlciBvZiBTb3J0IGNsZWFyZWRcclxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxyXG4gICAgICB0aGlzLnNvcnRTZXJ2aWNlLm9uU29ydENsZWFyZWQuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICB0aGlzLnJlc2V0Um93U2VsZWN0aW9uKCk7XHJcbiAgICAgICAgdGhpcy5vbkdyaWRTdGF0ZUNoYW5nZWQubmV4dCh7IGNoYW5nZTogeyBuZXdWYWx1ZXM6IFtdLCB0eXBlOiBHcmlkU3RhdGVUeXBlLnNvcnRlciB9LCBncmlkU3RhdGU6IHRoaXMuZ2V0Q3VycmVudEdyaWRTdGF0ZSgpIH0pO1xyXG4gICAgICB9KVxyXG4gICAgKTtcclxuXHJcbiAgICAvLyBTdWJzY3JpYmUgdG8gQ29sdW1uUGlja2VyIGFuZC9vciBHcmlkTWVudSBmb3Igc2hvdy9oaWRlIENvbHVtbnMgdmlzaWJpbGl0eSBjaGFuZ2VzXHJcbiAgICB0aGlzLmJpbmRFeHRlbnNpb25BZGRvbkV2ZW50VG9HcmlkU3RhdGVDaGFuZ2UoRXh0ZW5zaW9uTmFtZS5jb2x1bW5QaWNrZXIsICdvbkNvbHVtbnNDaGFuZ2VkJyk7XHJcbiAgICB0aGlzLmJpbmRFeHRlbnNpb25BZGRvbkV2ZW50VG9HcmlkU3RhdGVDaGFuZ2UoRXh0ZW5zaW9uTmFtZS5ncmlkTWVudSwgJ29uQ29sdW1uc0NoYW5nZWQnKTtcclxuXHJcbiAgICAvLyBzdWJzY3JpYmUgdG8gQ29sdW1uIFJlc2l6ZSAmIFJlb3JkZXJpbmdcclxuICAgIHRoaXMuYmluZFNsaWNrR3JpZEV2ZW50VG9HcmlkU3RhdGVDaGFuZ2UoJ29uQ29sdW1uc1Jlb3JkZXJlZCcsIGdyaWQpO1xyXG4gICAgdGhpcy5iaW5kU2xpY2tHcmlkRXZlbnRUb0dyaWRTdGF0ZUNoYW5nZSgnb25Db2x1bW5zUmVzaXplZCcsIGdyaWQpO1xyXG4gIH1cclxuXHJcbiAgLy8gLS1cclxuICAvLyBwcml2YXRlIG1ldGhvZHNcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgLyoqXHJcbiAgICogQmluZCBhIFNsaWNrR3JpZCBFeHRlbnNpb24gRXZlbnQgdG8gYSBHcmlkIFN0YXRlIGNoYW5nZSBldmVudFxyXG4gICAqIEBwYXJhbSBleHRlbnNpb24gbmFtZVxyXG4gICAqIEBwYXJhbSBncmlkXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBiaW5kRXh0ZW5zaW9uQWRkb25FdmVudFRvR3JpZFN0YXRlQ2hhbmdlKGV4dGVuc2lvbk5hbWU6IEV4dGVuc2lvbk5hbWUsIGV2ZW50TmFtZTogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBleHRlbnNpb24gPSB0aGlzLmV4dGVuc2lvblNlcnZpY2UgJiYgdGhpcy5leHRlbnNpb25TZXJ2aWNlLmdldEV4dGVuc2lvbkJ5TmFtZSAmJiB0aGlzLmV4dGVuc2lvblNlcnZpY2UuZ2V0RXh0ZW5zaW9uQnlOYW1lKGV4dGVuc2lvbk5hbWUpO1xyXG4gICAgY29uc3Qgc2xpY2tFdmVudCA9IGV4dGVuc2lvbiAmJiBleHRlbnNpb24uaW5zdGFuY2UgJiYgZXh0ZW5zaW9uLmluc3RhbmNlW2V2ZW50TmFtZV07XHJcblxyXG4gICAgaWYgKHNsaWNrRXZlbnQgJiYgc2xpY2tFdmVudC5zdWJzY3JpYmUpIHtcclxuICAgICAgdGhpcy5fZXZlbnRIYW5kbGVyLnN1YnNjcmliZShzbGlja0V2ZW50LCAoZTogRXZlbnQsIGFyZ3M6IGFueSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGNvbHVtbnM6IENvbHVtbltdID0gYXJncyAmJiBhcmdzLmNvbHVtbnM7XHJcbiAgICAgICAgY29uc3QgY3VycmVudENvbHVtbnM6IEN1cnJlbnRDb2x1bW5bXSA9IHRoaXMuZ2V0QXNzb2NpYXRlZEN1cnJlbnRDb2x1bW5zKGNvbHVtbnMpO1xyXG4gICAgICAgIHRoaXMub25HcmlkU3RhdGVDaGFuZ2VkLm5leHQoeyBjaGFuZ2U6IHsgbmV3VmFsdWVzOiBjdXJyZW50Q29sdW1ucywgdHlwZTogR3JpZFN0YXRlVHlwZS5jb2x1bW5zIH0sIGdyaWRTdGF0ZTogdGhpcy5nZXRDdXJyZW50R3JpZFN0YXRlKCkgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQmluZCBhIEdyaWQgRXZlbnQgdG8gYSBHcmlkIFN0YXRlIGNoYW5nZSBldmVudFxyXG4gICAqIEBwYXJhbSBldmVudCBuYW1lXHJcbiAgICogQHBhcmFtIGdyaWRcclxuICAgKi9cclxuICBwcml2YXRlIGJpbmRTbGlja0dyaWRFdmVudFRvR3JpZFN0YXRlQ2hhbmdlKGV2ZW50TmFtZTogc3RyaW5nLCBncmlkOiBhbnkpIHtcclxuICAgIGNvbnN0IHNsaWNrR3JpZEV2ZW50ID0gZ3JpZCAmJiBncmlkW2V2ZW50TmFtZV07XHJcblxyXG4gICAgaWYgKHNsaWNrR3JpZEV2ZW50ICYmIHNsaWNrR3JpZEV2ZW50LnN1YnNjcmliZSkge1xyXG4gICAgICB0aGlzLl9ldmVudEhhbmRsZXIuc3Vic2NyaWJlKHNsaWNrR3JpZEV2ZW50LCAoZTogRXZlbnQsIGFyZ3M6IGFueSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGNvbHVtbnM6IENvbHVtbltdID0gZ3JpZC5nZXRDb2x1bW5zKCk7XHJcbiAgICAgICAgY29uc3QgY3VycmVudENvbHVtbnM6IEN1cnJlbnRDb2x1bW5bXSA9IHRoaXMuZ2V0QXNzb2NpYXRlZEN1cnJlbnRDb2x1bW5zKGNvbHVtbnMpO1xyXG4gICAgICAgIHRoaXMub25HcmlkU3RhdGVDaGFuZ2VkLm5leHQoeyBjaGFuZ2U6IHsgbmV3VmFsdWVzOiBjdXJyZW50Q29sdW1ucywgdHlwZTogR3JpZFN0YXRlVHlwZS5jb2x1bW5zIH0sIGdyaWRTdGF0ZTogdGhpcy5nZXRDdXJyZW50R3JpZFN0YXRlKCkgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=