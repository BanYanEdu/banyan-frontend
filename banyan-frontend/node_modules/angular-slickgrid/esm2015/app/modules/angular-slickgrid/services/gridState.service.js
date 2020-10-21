import { ExtensionName, GridStateType, } from './../models/index';
import { Subject } from 'rxjs';
export class GridStateService {
    constructor() {
        this._eventHandler = new Slick.EventHandler();
        this._columns = [];
        this._currentColumns = [];
        this.subscriptions = [];
        this.onGridStateChanged = new Subject();
    }
    /** Getter for the Grid Options pulled through the Grid Object */
    get _gridOptions() {
        return (this._grid && this._grid.getOptions) ? this._grid.getOptions() : {};
    }
    /**
     * Initialize the Export Service
     * @param grid
     * @param filterService
     * @param sortService
     * @param dataView
     */
    init(grid, extensionService, filterService, sortService) {
        this._grid = grid;
        this.extensionService = extensionService;
        this.filterService = filterService;
        this.sortService = sortService;
        this.subscribeToAllGridChanges(grid);
    }
    /** Dispose of all the SlickGrid & Angular subscriptions */
    dispose() {
        // unsubscribe all SlickGrid events
        this._eventHandler.unsubscribeAll();
        // also unsubscribe all Angular Subscriptions
        this.subscriptions.forEach((subscription) => {
            if (subscription && subscription.unsubscribe) {
                subscription.unsubscribe();
            }
        });
        this.subscriptions = [];
        this._currentColumns = [];
        this._columns = [];
    }
    /**
     * Get the current grid state (filters/sorters/pagination)
     * @return grid state
     */
    getCurrentGridState() {
        const gridState = {
            columns: this.getCurrentColumns(),
            filters: this.getCurrentFilters(),
            sorters: this.getCurrentSorters()
        };
        const currentPagination = this.getCurrentPagination();
        if (currentPagination) {
            gridState.pagination = currentPagination;
        }
        return gridState;
    }
    /**
     * Get the Columns (and their state: visibility/position) that are currently applied in the grid
     * @return current columns
     */
    getColumns() {
        return this._columns;
    }
    /**
     * From an array of Grid Column Definitions, get the associated Current Columns
     * @param gridColumns
     */
    getAssociatedCurrentColumns(gridColumns) {
        const currentColumns = [];
        if (gridColumns && Array.isArray(gridColumns)) {
            gridColumns.forEach((column, index) => {
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
    }
    /**
     * From an array of Current Columns, get the associated Grid Column Definitions
     * @param grid
     * @param currentColumns
     */
    getAssociatedGridColumns(grid, currentColumns) {
        const columns = [];
        const gridColumns = grid.getColumns();
        if (currentColumns && Array.isArray(currentColumns)) {
            currentColumns.forEach((currentColumn, index) => {
                const gridColumn = gridColumns.find((c) => c.id === currentColumn.columnId);
                if (gridColumn && gridColumn.id) {
                    columns.push(Object.assign({}, gridColumn, { cssClass: currentColumn.cssClass, headerCssClass: currentColumn.headerCssClass, width: currentColumn.width }));
                }
            });
        }
        this._columns = columns;
        return columns;
    }
    /**
     * Get the Columns (and their state: visibility/position) that are currently applied in the grid
     * @return current columns
     */
    getCurrentColumns() {
        let currentColumns = [];
        if (this._currentColumns && Array.isArray(this._currentColumns) && this._currentColumns.length > 0) {
            currentColumns = this._currentColumns;
        }
        else {
            currentColumns = this.getAssociatedCurrentColumns(this._grid.getColumns());
        }
        return currentColumns;
    }
    /**
     * Get the Filters (and their state, columnId, searchTerm(s)) that are currently applied in the grid
     * @return current filters
     */
    getCurrentFilters() {
        if (this._gridOptions && this._gridOptions.backendServiceApi) {
            const backendService = this._gridOptions.backendServiceApi.service;
            if (backendService && backendService.getCurrentFilters) {
                return backendService.getCurrentFilters();
            }
        }
        else if (this.filterService && this.filterService.getCurrentLocalFilters) {
            return this.filterService.getCurrentLocalFilters();
        }
        return null;
    }
    /**
     * Get current Pagination (and it's state, pageNumber, pageSize) that are currently applied in the grid
     * @return current pagination state
     */
    getCurrentPagination() {
        if (this._gridOptions && this._gridOptions.backendServiceApi) {
            const backendService = this._gridOptions.backendServiceApi.service;
            if (backendService && backendService.getCurrentPagination) {
                return backendService.getCurrentPagination();
            }
        }
        else {
            // TODO implement this whenever local pagination gets implemented
        }
        return null;
    }
    /**
     * Get the current Sorters (and their state, columnId, direction) that are currently applied in the grid
     * @return current sorters
     */
    getCurrentSorters() {
        if (this._gridOptions && this._gridOptions.backendServiceApi) {
            const backendService = this._gridOptions.backendServiceApi.service;
            if (backendService && backendService.getCurrentSorters) {
                return backendService.getCurrentSorters();
            }
        }
        else if (this.sortService && this.sortService.getCurrentLocalSorters) {
            return this.sortService.getCurrentLocalSorters();
        }
        return null;
    }
    resetColumns(columnDefinitions) {
        const columns = columnDefinitions || this._columns;
        const currentColumns = this.getAssociatedCurrentColumns(columns);
        this.onGridStateChanged.next({ change: { newValues: currentColumns, type: GridStateType.columns }, gridState: this.getCurrentGridState() });
    }
    /** if we use Row Selection or the Checkbox Selector, we need to reset any selection */
    resetRowSelection() {
        if (this._gridOptions.enableRowSelection || this._gridOptions.enableCheckboxSelector) {
            // this also requires the Row Selection Model to be registered as well
            const rowSelectionExtension = this.extensionService && this.extensionService.getExtensionByName && this.extensionService.getExtensionByName(ExtensionName.rowSelection);
            if (rowSelectionExtension && rowSelectionExtension.instance) {
                this._grid.setSelectedRows([]);
            }
        }
    }
    /**
     * Subscribe to all necessary SlickGrid or Service Events that deals with a Grid change,
     * when triggered, we will publish a Grid State Event with current Grid State
     */
    subscribeToAllGridChanges(grid) {
        // Subscribe to Event Emitter of Filter changed
        this.subscriptions.push(this.filterService.onFilterChanged.subscribe((currentFilters) => {
            this.resetRowSelection();
            this.onGridStateChanged.next({ change: { newValues: currentFilters, type: GridStateType.filter }, gridState: this.getCurrentGridState() });
        }));
        // Subscribe to Event Emitter of Filter cleared
        this.subscriptions.push(this.filterService.onFilterCleared.subscribe(() => {
            this.resetRowSelection();
            this.onGridStateChanged.next({ change: { newValues: [], type: GridStateType.filter }, gridState: this.getCurrentGridState() });
        }));
        // Subscribe to Event Emitter of Sort changed
        this.subscriptions.push(this.sortService.onSortChanged.subscribe((currentSorters) => {
            this.resetRowSelection();
            this.onGridStateChanged.next({ change: { newValues: currentSorters, type: GridStateType.sorter }, gridState: this.getCurrentGridState() });
        }));
        // Subscribe to Event Emitter of Sort cleared
        this.subscriptions.push(this.sortService.onSortCleared.subscribe(() => {
            this.resetRowSelection();
            this.onGridStateChanged.next({ change: { newValues: [], type: GridStateType.sorter }, gridState: this.getCurrentGridState() });
        }));
        // Subscribe to ColumnPicker and/or GridMenu for show/hide Columns visibility changes
        this.bindExtensionAddonEventToGridStateChange(ExtensionName.columnPicker, 'onColumnsChanged');
        this.bindExtensionAddonEventToGridStateChange(ExtensionName.gridMenu, 'onColumnsChanged');
        // subscribe to Column Resize & Reordering
        this.bindSlickGridEventToGridStateChange('onColumnsReordered', grid);
        this.bindSlickGridEventToGridStateChange('onColumnsResized', grid);
    }
    // --
    // private methods
    // ------------------
    /**
     * Bind a SlickGrid Extension Event to a Grid State change event
     * @param extension name
     * @param grid
     */
    bindExtensionAddonEventToGridStateChange(extensionName, eventName) {
        const extension = this.extensionService && this.extensionService.getExtensionByName && this.extensionService.getExtensionByName(extensionName);
        const slickEvent = extension && extension.instance && extension.instance[eventName];
        if (slickEvent && slickEvent.subscribe) {
            this._eventHandler.subscribe(slickEvent, (e, args) => {
                const columns = args && args.columns;
                const currentColumns = this.getAssociatedCurrentColumns(columns);
                this.onGridStateChanged.next({ change: { newValues: currentColumns, type: GridStateType.columns }, gridState: this.getCurrentGridState() });
            });
        }
    }
    /**
     * Bind a Grid Event to a Grid State change event
     * @param event name
     * @param grid
     */
    bindSlickGridEventToGridStateChange(eventName, grid) {
        const slickGridEvent = grid && grid[eventName];
        if (slickGridEvent && slickGridEvent.subscribe) {
            this._eventHandler.subscribe(slickGridEvent, (e, args) => {
                const columns = grid.getColumns();
                const currentColumns = this.getAssociatedCurrentColumns(columns);
                this.onGridStateChanged.next({ change: { newValues: currentColumns, type: GridStateType.columns }, gridState: this.getCurrentGridState() });
            });
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZFN0YXRlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL3NlcnZpY2VzL2dyaWRTdGF0ZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFNTCxhQUFhLEVBSWIsYUFBYSxHQUNkLE1BQU0sbUJBQW1CLENBQUM7QUFJM0IsT0FBTyxFQUFFLE9BQU8sRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFLN0MsTUFBTSxPQUFPLGdCQUFnQjtJQUE3QjtRQUNVLGtCQUFhLEdBQUcsSUFBSSxLQUFLLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDekMsYUFBUSxHQUFhLEVBQUUsQ0FBQztRQUN4QixvQkFBZSxHQUFvQixFQUFFLENBQUM7UUFLdEMsa0JBQWEsR0FBbUIsRUFBRSxDQUFDO1FBQzNDLHVCQUFrQixHQUFHLElBQUksT0FBTyxFQUFtQixDQUFDO0lBcVJ0RCxDQUFDO0lBblJDLGlFQUFpRTtJQUNqRSxJQUFZLFlBQVk7UUFDdEIsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQzlFLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxJQUFJLENBQUMsSUFBUyxFQUFFLGdCQUFrQyxFQUFFLGFBQTRCLEVBQUUsV0FBd0I7UUFDeEcsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDbEIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLGdCQUFnQixDQUFDO1FBQ3pDLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1FBQ25DLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBRS9CLElBQUksQ0FBQyx5QkFBeUIsQ0FB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LENBQUM7U0FDSjtJQUNILENBQUM7SUFFRDs7OztPQUlHO0lBQ0ssbUNBQW1DLENBQUMsU0FBaUIsRUFBRSxJQUFTO1FBQ3RFLE1BQU0sY0FBYyxHQUFHLElBQUksSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFL0MsSUFBSSxjQUFjLElBQUksY0FBYyxDQUFDLFNBQVMsRUFBRTtZQUM5QyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFRLEVBQUUsSUFBUyxFQUFFLEVBQUU7Z0JBQ25FLE1BQU0sT0FBTyxHQUFhLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztnQkFDNUMsTUFBTSxjQUFjLEdBQW9CLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDbEYsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxFQUFFLFNBQVMsRUFBRSxjQUFjLEVBQUUsSUFBSSxFQUFFLGFBQWEsQ0FBQyxPQUFPLEVBQUUsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQzlJLENBQUMsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbHVtbixcclxuICBDdXJyZW50Q29sdW1uLFxyXG4gIEN1cnJlbnRGaWx0ZXIsXHJcbiAgQ3VycmVudFBhZ2luYXRpb24sXHJcbiAgQ3VycmVudFNvcnRlcixcclxuICBFeHRlbnNpb25OYW1lLFxyXG4gIEdyaWRPcHRpb24sXHJcbiAgR3JpZFN0YXRlLFxyXG4gIEdyaWRTdGF0ZUNoYW5nZSxcclxuICBHcmlkU3RhdGVUeXBlLFxyXG59IGZyb20gJy4vLi4vbW9kZWxzL2luZGV4JztcclxuaW1wb3J0IHsgRXh0ZW5zaW9uU2VydmljZSB9IGZyb20gJy4vZXh0ZW5zaW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBGaWx0ZXJTZXJ2aWNlIH0gZnJvbSAnLi9maWx0ZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IFNvcnRTZXJ2aWNlIH0gZnJvbSAnLi9zb3J0LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuXHJcbi8vIHVzaW5nIGV4dGVybmFsIG5vbi10eXBlZCBqcyBsaWJyYXJpZXNcclxuZGVjbGFyZSB2YXIgU2xpY2s6IGFueTtcclxuXHJcbmV4cG9ydCBjbGFzcyBHcmlkU3RhdGVTZXJ2aWNlIHtcclxuICBwcml2YXRlIF9ldmVudEhhbmRsZXIgPSBuZXcgU2xpY2suRXZlbnRIYW5kbGVyKCk7XHJcbiAgcHJpdmF0ZSBfY29sdW1uczogQ29sdW1uW10gPSBbXTtcclxuICBwcml2YXRlIF9jdXJyZW50Q29sdW1uczogQ3VycmVudENvbHVtbltdID0gW107XHJcbiAgcHJpdmF0ZSBfZ3JpZDogYW55O1xyXG4gIHByaXZhdGUgZXh0ZW5zaW9uU2VydmljZTogRXh0ZW5zaW9uU2VydmljZTtcclxuICBwcml2YXRlIGZpbHRlclNlcnZpY2U6IEZpbHRlclNlcnZpY2U7XHJcbiAgcHJpdmF0ZSBzb3J0U2VydmljZTogU29ydFNlcnZpY2U7XHJcbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xyXG4gIG9uR3JpZFN0YXRlQ2hhbmdlZCA9IG5ldyBTdWJqZWN0PEdyaWRTdGF0ZUNoYW5nZT4oKTtcclxuXHJcbiAgLyoqIEdldHRlciBmb3IgdGhlIEdyaWQgT3B0aW9ucyBwdWxsZWQgdGhyb3VnaCB0aGUgR3JpZCBPYmplY3QgKi9cclxuICBwcml2YXRlIGdldCBfZ3JpZE9wdGlvbnMoKTogR3JpZE9wdGlvbiB7XHJcbiAgICByZXR1cm4gKHRoaXMuX2dyaWQgJiYgdGhpcy5fZ3JpZC5nZXRPcHRpb25zKSA/IHRoaXMuX2dyaWQuZ2V0T3B0aW9ucygpIDoge307XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbml0aWFsaXplIHRoZSBFeHBvcnQgU2VydmljZVxyXG4gICAqIEBwYXJhbSBncmlkXHJcbiAgICogQHBhcmFtIGZpbHRlclNlcnZpY2VcclxuICAgKiBAcGFyYW0gc29ydFNlcnZpY2VcclxuICAgKiBAcGFyYW0gZGF0YVZpZXdcclxuICAgKi9cclxuICBpbml0KGdyaWQ6IGFueSwgZXh0ZW5zaW9uU2VydmljZTogRXh0ZW5zaW9uU2VydmljZSwgZmlsdGVyU2VydmljZTogRmlsdGVyU2VydmljZSwgc29ydFNlcnZpY2U6IFNvcnRTZXJ2aWNlKTogdm9pZCB7XHJcbiAgICB0aGlzLl9ncmlkID0gZ3JpZDtcclxuICAgIHRoaXMuZXh0ZW5zaW9uU2VydmljZSA9IGV4dGVuc2lvblNlcnZpY2U7XHJcbiAgICB0aGlzLmZpbHRlclNlcnZpY2UgPSBmaWx0ZXJTZXJ2aWNlO1xyXG4gICAgdGhpcy5zb3J0U2VydmljZSA9IHNvcnRTZXJ2aWNlO1xyXG5cclxuICAgIHRoaXMuc3Vic2NyaWJlVG9BbGxHcmlkQ2hhbmdlcyhncmlkKTtcclxuICB9XHJcblxyXG4gIC8qKiBEaXNwb3NlIG9mIGFsbCB0aGUgU2xpY2tHcmlkICYgQW5ndWxhciBzdWJzY3JpcHRpb25zICovXHJcbiAgZGlzcG9zZSgpIHtcclxuICAgIC8vIHVuc3Vic2NyaWJlIGFsbCBTbGlja0dyaWQgZXZlbnRzXHJcbiAgICB0aGlzLl9ldmVudEhhbmRsZXIudW5zdWJzY3JpYmVBbGwoKTtcclxuXHJcbiAgICAvLyBhbHNvIHVuc3Vic2NyaWJlIGFsbCBBbmd1bGFyIFN1YnNjcmlwdGlvbnNcclxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5mb3JFYWNoKChzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbikgPT4ge1xyXG4gICAgICBpZiAoc3Vic2NyaXB0aW9uICYmIHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSkge1xyXG4gICAgICAgIHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucyA9IFtdO1xyXG4gICAgdGhpcy5fY3VycmVudENvbHVtbnMgPSBbXTtcclxuICAgIHRoaXMuX2NvbHVtbnMgPSBbXTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgY3VycmVudCBncmlkIHN0YXRlIChmaWx0ZXJzL3NvcnRlcnMvcGFnaW5hdGlvbilcclxuICAgKiBAcmV0dXJuIGdyaWQgc3RhdGVcclxuICAgKi9cclxuICBnZXRDdXJyZW50R3JpZFN0YXRlKCk6IEdyaWRTdGF0ZSB7XHJcbiAgICBjb25zdCBncmlkU3RhdGU6IEdyaWRTdGF0ZSA9IHtcclxuICAgICAgY29sdW1uczogdGhpcy5nZXRDdXJyZW50Q29sdW1ucygpLFxyXG4gICAgICBmaWx0ZXJzOiB0aGlzLmdldEN1cnJlbnRGaWx0ZXJzKCksXHJcbiAgICAgIHNvcnRlcnM6IHRoaXMuZ2V0Q3VycmVudFNvcnRlcnMoKVxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBjdXJyZW50UGFnaW5hdGlvbiA9IHRoaXMuZ2V0Q3VycmVudFBhZ2luYXRpb24oKTtcclxuICAgIGlmIChjdXJyZW50UGFnaW5hdGlvbikge1xyXG4gICAgICBncmlkU3RhdGUucGFnaW5hdGlvbiA9IGN1cnJlbnRQYWdpbmF0aW9uO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGdyaWRTdGF0ZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgQ29sdW1ucyAoYW5kIHRoZWlyIHN0YXRlOiB2aXNpYmlsaXR5L3Bvc2l0aW9uKSB0aGF0IGFyZSBjdXJyZW50bHkgYXBwbGllZCBpbiB0aGUgZ3JpZFxyXG4gICAqIEByZXR1cm4gY3VycmVudCBjb2x1bW5zXHJcbiAgICovXHJcbiAgZ2V0Q29sdW1ucygpOiBDb2x1bW5bXSB7XHJcbiAgICByZXR1cm4gdGhpcy5fY29sdW1ucztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEZyb20gYW4gYXJyYXkgb2YgR3JpZCBDb2x1bW4gRGVmaW5pdGlvbnMsIGdldCB0aGUgYXNzb2NpYXRlZCBDdXJyZW50IENvbHVtbnNcclxuICAgKiBAcGFyYW0gZ3JpZENvbHVtbnNcclxuICAgKi9cclxuICBnZXRBc3NvY2lhdGVkQ3VycmVudENvbHVtbnMoZ3JpZENvbHVtbnM6IENvbHVtbltdKTogQ3VycmVudENvbHVtbltdIHtcclxuICAgIGNvbnN0IGN1cnJlbnRDb2x1bW5zOiBDdXJyZW50Q29sdW1uW10gPSBbXTtcclxuXHJcbiAgICBpZiAoZ3JpZENvbHVtbnMgJiYgQXJyYXkuaXNBcnJheShncmlkQ29sdW1ucykpIHtcclxuICAgICAgZ3JpZENvbHVtbnMuZm9yRWFjaCgoY29sdW1uOiBDb2x1bW4sIGluZGV4OiBudW1iZXIpID0+IHtcclxuICAgICAgICBpZiAoY29sdW1uICYmIGNvbHVtbi5pZCkge1xyXG4gICAgICAgICAgY3VycmVudENvbHVtbnMucHVzaCh7XHJcbiAgICAgICAgICAgIGNvbHVtbklkOiBjb2x1bW4uaWQgYXMgc3RyaW5nLFxyXG4gICAgICAgICAgICBjc3NDbGFzczogY29sdW1uLmNzc0NsYXNzIHx8ICcnLFxyXG4gICAgICAgICAgICBoZWFkZXJDc3NDbGFzczogY29sdW1uLmhlYWRlckNzc0NsYXNzIHx8ICcnLFxyXG4gICAgICAgICAgICB3aWR0aDogY29sdW1uLndpZHRoIHx8IDBcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLl9jdXJyZW50Q29sdW1ucyA9IGN1cnJlbnRDb2x1bW5zO1xyXG4gICAgcmV0dXJuIGN1cnJlbnRDb2x1bW5zO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRnJvbSBhbiBhcnJheSBvZiBDdXJyZW50IENvbHVtbnMsIGdldCB0aGUgYXNzb2NpYXRlZCBHcmlkIENvbHVtbiBEZWZpbml0aW9uc1xyXG4gICAqIEBwYXJhbSBncmlkXHJcbiAgICogQHBhcmFtIGN1cnJlbnRDb2x1bW5zXHJcbiAgICovXHJcbiAgZ2V0QXNzb2NpYXRlZEdyaWRDb2x1bW5zKGdyaWQ6IGFueSwgY3VycmVudENvbHVtbnM6IEN1cnJlbnRDb2x1bW5bXSk6IENvbHVtbltdIHtcclxuICAgIGNvbnN0IGNvbHVtbnM6IENvbHVtbltdID0gW107XHJcbiAgICBjb25zdCBncmlkQ29sdW1uczogQ29sdW1uW10gPSBncmlkLmdldENvbHVtbnMoKTtcclxuXHJcbiAgICBpZiAoY3VycmVudENvbHVtbnMgJiYgQXJyYXkuaXNBcnJheShjdXJyZW50Q29sdW1ucykpIHtcclxuICAgICAgY3VycmVudENvbHVtbnMuZm9yRWFjaCgoY3VycmVudENvbHVtbjogQ3VycmVudENvbHVtbiwgaW5kZXg6IG51bWJlcikgPT4ge1xyXG4gICAgICAgIGNvbnN0IGdyaWRDb2x1bW46IENvbHVtbiA9IGdyaWRDb2x1bW5zLmZpbmQoKGM6IENvbHVtbikgPT4gYy5pZCA9PT0gY3VycmVudENvbHVtbi5jb2x1bW5JZCk7XHJcbiAgICAgICAgaWYgKGdyaWRDb2x1bW4gJiYgZ3JpZENvbHVtbi5pZCkge1xyXG4gICAgICAgICAgY29sdW1ucy5wdXNoKHtcclxuICAgICAgICAgICAgLi4uZ3JpZENvbHVtbixcclxuICAgICAgICAgICAgY3NzQ2xhc3M6IGN1cnJlbnRDb2x1bW4uY3NzQ2xhc3MsXHJcbiAgICAgICAgICAgIGhlYWRlckNzc0NsYXNzOiBjdXJyZW50Q29sdW1uLmhlYWRlckNzc0NsYXNzLFxyXG4gICAgICAgICAgICB3aWR0aDogY3VycmVudENvbHVtbi53aWR0aFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIHRoaXMuX2NvbHVtbnMgPSBjb2x1bW5zO1xyXG4gICAgcmV0dXJuIGNvbHVtbnM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIENvbHVtbnMgKGFuZCB0aGVpciBzdGF0ZTogdmlzaWJpbGl0eS9wb3NpdGlvbikgdGhhdCBhcmUgY3VycmVudGx5IGFwcGxpZWQgaW4gdGhlIGdyaWRcclxuICAgKiBAcmV0dXJuIGN1cnJlbnQgY29sdW1uc1xyXG4gICAqL1xyXG4gIGdldEN1cnJlbnRDb2x1bW5zKCk6IEN1cnJlbnRDb2x1bW5bXSB7XHJcbiAgICBsZXQgY3VycmVudENvbHVtbnM6IEN1cnJlbnRDb2x1bW5bXSA9IFtdO1xyXG4gICAgaWYgKHRoaXMuX2N1cnJlbnRDb2x1bW5zICYmIEFycmF5LmlzQXJyYXkodGhpcy5fY3VycmVudENvbHVtbnMpICYmIHRoaXMuX2N1cnJlbnRDb2x1bW5zLmxlbmd0aCA+IDApIHtcclxuICAgICAgY3VycmVudENvbHVtbnMgPSB0aGlzLl9jdXJyZW50Q29sdW1ucztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGN1cnJlbnRDb2x1bW5zID0gdGhpcy5nZXRBc3NvY2lhdGVkQ3VycmVudENvbHVtbnModGhpcy5fZ3JpZC5nZXRDb2x1bW5zKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBjdXJyZW50Q29sdW1ucztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgRmlsdGVycyAoYW5kIHRoZWlyIHN0YXRlLCBjb2x1bW5JZCwgc2VhcmNoVGVybShzKSkgdGhhdCBhcmUgY3VycmVudGx5IGFwcGxpZWQgaW4gdGhlIGdyaWRcclxuICAgKiBAcmV0dXJuIGN1cnJlbnQgZmlsdGVyc1xyXG4gICAqL1xyXG4gIGdldEN1cnJlbnRGaWx0ZXJzKCk6IEN1cnJlbnRGaWx0ZXJbXSB8IG51bGwge1xyXG4gICAgaWYgKHRoaXMuX2dyaWRPcHRpb25zICYmIHRoaXMuX2dyaWRPcHRpb25zLmJhY2tlbmRTZXJ2aWNlQXBpKSB7XHJcbiAgICAgIGNvbnN0IGJhY2tlbmRTZXJ2aWNlID0gdGhpcy5fZ3JpZE9wdGlvbnMuYmFja2VuZFNlcnZpY2VBcGkuc2VydmljZTtcclxuICAgICAgaWYgKGJhY2tlbmRTZXJ2aWNlICYmIGJhY2tlbmRTZXJ2aWNlLmdldEN1cnJlbnRGaWx0ZXJzKSB7XHJcbiAgICAgICAgcmV0dXJuIGJhY2tlbmRTZXJ2aWNlLmdldEN1cnJlbnRGaWx0ZXJzKCkgYXMgQ3VycmVudEZpbHRlcltdO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuZmlsdGVyU2VydmljZSAmJiB0aGlzLmZpbHRlclNlcnZpY2UuZ2V0Q3VycmVudExvY2FsRmlsdGVycykge1xyXG4gICAgICByZXR1cm4gdGhpcy5maWx0ZXJTZXJ2aWNlLmdldEN1cnJlbnRMb2NhbEZpbHRlcnMoKTtcclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IGN1cnJlbnQgUGFnaW5hdGlvbiAoYW5kIGl0J3Mgc3RhdGUsIHBhZ2VOdW1iZXIsIHBhZ2VTaXplKSB0aGF0IGFyZSBjdXJyZW50bHkgYXBwbGllZCBpbiB0aGUgZ3JpZFxyXG4gICAqIEByZXR1cm4gY3VycmVudCBwYWdpbmF0aW9uIHN0YXRlXHJcbiAgICovXHJcbiAgZ2V0Q3VycmVudFBhZ2luYXRpb24oKTogQ3VycmVudFBhZ2luYXRpb24gfCBudWxsIHtcclxuICAgIGlmICh0aGlzLl9ncmlkT3B0aW9ucyAmJiB0aGlzLl9ncmlkT3B0aW9ucy5iYWNrZW5kU2VydmljZUFwaSkge1xyXG4gICAgICBjb25zdCBiYWNrZW5kU2VydmljZSA9IHRoaXMuX2dyaWRPcHRpb25zLmJhY2tlbmRTZXJ2aWNlQXBpLnNlcnZpY2U7XHJcbiAgICAgIGlmIChiYWNrZW5kU2VydmljZSAmJiBiYWNrZW5kU2VydmljZS5nZXRDdXJyZW50UGFnaW5hdGlvbikge1xyXG4gICAgICAgIHJldHVybiBiYWNrZW5kU2VydmljZS5nZXRDdXJyZW50UGFnaW5hdGlvbigpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBUT0RPIGltcGxlbWVudCB0aGlzIHdoZW5ldmVyIGxvY2FsIHBhZ2luYXRpb24gZ2V0cyBpbXBsZW1lbnRlZFxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIGN1cnJlbnQgU29ydGVycyAoYW5kIHRoZWlyIHN0YXRlLCBjb2x1bW5JZCwgZGlyZWN0aW9uKSB0aGF0IGFyZSBjdXJyZW50bHkgYXBwbGllZCBpbiB0aGUgZ3JpZFxyXG4gICAqIEByZXR1cm4gY3VycmVudCBzb3J0ZXJzXHJcbiAgICovXHJcbiAgZ2V0Q3VycmVudFNvcnRlcnMoKTogQ3VycmVudFNvcnRlcltdIHwgbnVsbCB7XHJcbiAgICBpZiAodGhpcy5fZ3JpZE9wdGlvbnMgJiYgdGhpcy5fZ3JpZE9wdGlvbnMuYmFja2VuZFNlcnZpY2VBcGkpIHtcclxuICAgICAgY29uc3QgYmFja2VuZFNlcnZpY2UgPSB0aGlzLl9ncmlkT3B0aW9ucy5iYWNrZW5kU2VydmljZUFwaS5zZXJ2aWNlO1xyXG4gICAgICBpZiAoYmFja2VuZFNlcnZpY2UgJiYgYmFja2VuZFNlcnZpY2UuZ2V0Q3VycmVudFNvcnRlcnMpIHtcclxuICAgICAgICByZXR1cm4gYmFja2VuZFNlcnZpY2UuZ2V0Q3VycmVudFNvcnRlcnMoKSBhcyBDdXJyZW50U29ydGVyW107XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAodGhpcy5zb3J0U2VydmljZSAmJiB0aGlzLnNvcnRTZXJ2aWNlLmdldEN1cnJlbnRMb2NhbFNvcnRlcnMpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuc29ydFNlcnZpY2UuZ2V0Q3VycmVudExvY2FsU29ydGVycygpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICByZXNldENvbHVtbnMoY29sdW1uRGVmaW5pdGlvbnM/OiBDb2x1bW5bXSkge1xyXG4gICAgY29uc3QgY29sdW1uczogQ29sdW1uW10gPSBjb2x1bW5EZWZpbml0aW9ucyB8fCB0aGlzLl9jb2x1bW5zO1xyXG4gICAgY29uc3QgY3VycmVudENvbHVtbnM6IEN1cnJlbnRDb2x1bW5bXSA9IHRoaXMuZ2V0QXNzb2NpYXRlZEN1cnJlbnRDb2x1bW5zKGNvbHVtbnMpO1xyXG4gICAgdGhpcy5vbkdyaWRTdGF0ZUNoYW5nZWQubmV4dCh7IGNoYW5nZTogeyBuZXdWYWx1ZXM6IGN1cnJlbnRDb2x1bW5zLCB0eXBlOiBHcmlkU3RhdGVUeXBlLmNvbHVtbnMgfSwgZ3JpZFN0YXRlOiB0aGlzLmdldEN1cnJlbnRHcmlkU3RhdGUoKSB9KTtcclxuICB9XHJcblxyXG4gIC8qKiBpZiB3ZSB1c2UgUm93IFNlbGVjdGlvbiBvciB0aGUgQ2hlY2tib3ggU2VsZWN0b3IsIHdlIG5lZWQgdG8gcmVzZXQgYW55IHNlbGVjdGlvbiAqL1xyXG4gIHJlc2V0Um93U2VsZWN0aW9uKCkge1xyXG4gICAgaWYgKHRoaXMuX2dyaWRPcHRpb25zLmVuYWJsZVJvd1NlbGVjdGlvbiB8fCB0aGlzLl9ncmlkT3B0aW9ucy5lbmFibGVDaGVja2JveFNlbGVjdG9yKSB7XHJcbiAgICAgIC8vIHRoaXMgYWxzbyByZXF1aXJlcyB0aGUgUm93IFNlbGVjdGlvbiBNb2RlbCB0byBiZSByZWdpc3RlcmVkIGFzIHdlbGxcclxuICAgICAgY29uc3Qgcm93U2VsZWN0aW9uRXh0ZW5zaW9uID0gdGhpcy5leHRlbnNpb25TZXJ2aWNlICYmIHRoaXMuZXh0ZW5zaW9uU2VydmljZS5nZXRFeHRlbnNpb25CeU5hbWUgJiYgdGhpcy5leHRlbnNpb25TZXJ2aWNlLmdldEV4dGVuc2lvbkJ5TmFtZShFeHRlbnNpb25OYW1lLnJvd1NlbGVjdGlvbik7XHJcbiAgICAgIGlmIChyb3dTZWxlY3Rpb25FeHRlbnNpb24gJiYgcm93U2VsZWN0aW9uRXh0ZW5zaW9uLmluc3RhbmNlKSB7XHJcbiAgICAgICAgdGhpcy5fZ3JpZC5zZXRTZWxlY3RlZFJvd3MoW10pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTdWJzY3JpYmUgdG8gYWxsIG5lY2Vzc2FyeSBTbGlja0dyaWQgb3IgU2VydmljZSBFdmVudHMgdGhhdCBkZWFscyB3aXRoIGEgR3JpZCBjaGFuZ2UsXHJcbiAgICogd2hlbiB0cmlnZ2VyZWQsIHdlIHdpbGwgcHVibGlzaCBhIEdyaWQgU3RhdGUgRXZlbnQgd2l0aCBjdXJyZW50IEdyaWQgU3RhdGVcclxuICAgKi9cclxuICBzdWJzY3JpYmVUb0FsbEdyaWRDaGFuZ2VzKGdyaWQ6IGFueSkge1xyXG4gICAgLy8gU3Vic2NyaWJlIHRvIEV2ZW50IEVtaXR0ZXIgb2YgRmlsdGVyIGNoYW5nZWRcclxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxyXG4gICAgICB0aGlzLmZpbHRlclNlcnZpY2Uub25GaWx0ZXJDaGFuZ2VkLnN1YnNjcmliZSgoY3VycmVudEZpbHRlcnM6IEN1cnJlbnRGaWx0ZXJbXSkgPT4ge1xyXG4gICAgICAgIHRoaXMucmVzZXRSb3dTZWxlY3Rpb24oKTtcclxuICAgICAgICB0aGlzLm9uR3JpZFN0YXRlQ2hhbmdlZC5uZXh0KHsgY2hhbmdlOiB7IG5ld1ZhbHVlczogY3VycmVudEZpbHRlcnMsIHR5cGU6IEdyaWRTdGF0ZVR5cGUuZmlsdGVyIH0sIGdyaWRTdGF0ZTogdGhpcy5nZXRDdXJyZW50R3JpZFN0YXRlKCkgfSk7XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG4gICAgLy8gU3Vic2NyaWJlIHRvIEV2ZW50IEVtaXR0ZXIgb2YgRmlsdGVyIGNsZWFyZWRcclxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxyXG4gICAgICB0aGlzLmZpbHRlclNlcnZpY2Uub25GaWx0ZXJDbGVhcmVkLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5yZXNldFJvd1NlbGVjdGlvbigpO1xyXG4gICAgICAgIHRoaXMub25HcmlkU3RhdGVDaGFuZ2VkLm5leHQoeyBjaGFuZ2U6IHsgbmV3VmFsdWVzOiBbXSwgdHlwZTogR3JpZFN0YXRlVHlwZS5maWx0ZXIgfSwgZ3JpZFN0YXRlOiB0aGlzLmdldEN1cnJlbnRHcmlkU3RhdGUoKSB9KTtcclxuICAgICAgfSlcclxuICAgICk7XHJcblxyXG4gICAgLy8gU3Vic2NyaWJlIHRvIEV2ZW50IEVtaXR0ZXIgb2YgU29ydCBjaGFuZ2VkXHJcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcclxuICAgICAgdGhpcy5zb3J0U2VydmljZS5vblNvcnRDaGFuZ2VkLnN1YnNjcmliZSgoY3VycmVudFNvcnRlcnM6IEN1cnJlbnRTb3J0ZXJbXSkgPT4ge1xyXG4gICAgICAgIHRoaXMucmVzZXRSb3dTZWxlY3Rpb24oKTtcclxuICAgICAgICB0aGlzLm9uR3JpZFN0YXRlQ2hhbmdlZC5uZXh0KHsgY2hhbmdlOiB7IG5ld1ZhbHVlczogY3VycmVudFNvcnRlcnMsIHR5cGU6IEdyaWRTdGF0ZVR5cGUuc29ydGVyIH0sIGdyaWRTdGF0ZTogdGhpcy5nZXRDdXJyZW50R3JpZFN0YXRlKCkgfSk7XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG5cclxuICAgIC8vIFN1YnNjcmliZSB0byBFdmVudCBFbWl0dGVyIG9mIFNvcnQgY2xlYXJlZFxyXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXHJcbiAgICAgIHRoaXMuc29ydFNlcnZpY2Uub25Tb3J0Q2xlYXJlZC5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMucmVzZXRSb3dTZWxlY3Rpb24oKTtcclxuICAgICAgICB0aGlzLm9uR3JpZFN0YXRlQ2hhbmdlZC5uZXh0KHsgY2hhbmdlOiB7IG5ld1ZhbHVlczogW10sIHR5cGU6IEdyaWRTdGF0ZVR5cGUuc29ydGVyIH0sIGdyaWRTdGF0ZTogdGhpcy5nZXRDdXJyZW50R3JpZFN0YXRlKCkgfSk7XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG5cclxuICAgIC8vIFN1YnNjcmliZSB0byBDb2x1bW5QaWNrZXIgYW5kL29yIEdyaWRNZW51IGZvciBzaG93L2hpZGUgQ29sdW1ucyB2aXNpYmlsaXR5IGNoYW5nZXNcclxuICAgIHRoaXMuYmluZEV4dGVuc2lvbkFkZG9uRXZlbnRUb0dyaWRTdGF0ZUNoYW5nZShFeHRlbnNpb25OYW1lLmNvbHVtblBpY2tlciwgJ29uQ29sdW1uc0NoYW5nZWQnKTtcclxuICAgIHRoaXMuYmluZEV4dGVuc2lvbkFkZG9uRXZlbnRUb0dyaWRTdGF0ZUNoYW5nZShFeHRlbnNpb25OYW1lLmdyaWRNZW51LCAnb25Db2x1bW5zQ2hhbmdlZCcpO1xyXG5cclxuICAgIC8vIHN1YnNjcmliZSB0byBDb2x1bW4gUmVzaXplICYgUmVvcmRlcmluZ1xyXG4gICAgdGhpcy5iaW5kU2xpY2tHcmlkRXZlbnRUb0dyaWRTdGF0ZUNoYW5nZSgnb25Db2x1bW5zUmVvcmRlcmVkJywgZ3JpZCk7XHJcbiAgICB0aGlzLmJpbmRTbGlja0dyaWRFdmVudFRvR3JpZFN0YXRlQ2hhbmdlKCdvbkNvbHVtbnNSZXNpemVkJywgZ3JpZCk7XHJcbiAgfVxyXG5cclxuICAvLyAtLVxyXG4gIC8vIHByaXZhdGUgbWV0aG9kc1xyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAvKipcclxuICAgKiBCaW5kIGEgU2xpY2tHcmlkIEV4dGVuc2lvbiBFdmVudCB0byBhIEdyaWQgU3RhdGUgY2hhbmdlIGV2ZW50XHJcbiAgICogQHBhcmFtIGV4dGVuc2lvbiBuYW1lXHJcbiAgICogQHBhcmFtIGdyaWRcclxuICAgKi9cclxuICBwcml2YXRlIGJpbmRFeHRlbnNpb25BZGRvbkV2ZW50VG9HcmlkU3RhdGVDaGFuZ2UoZXh0ZW5zaW9uTmFtZTogRXh0ZW5zaW9uTmFtZSwgZXZlbnROYW1lOiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IGV4dGVuc2lvbiA9IHRoaXMuZXh0ZW5zaW9uU2VydmljZSAmJiB0aGlzLmV4dGVuc2lvblNlcnZpY2UuZ2V0RXh0ZW5zaW9uQnlOYW1lICYmIHRoaXMuZXh0ZW5zaW9uU2VydmljZS5nZXRFeHRlbnNpb25CeU5hbWUoZXh0ZW5zaW9uTmFtZSk7XHJcbiAgICBjb25zdCBzbGlja0V2ZW50ID0gZXh0ZW5zaW9uICYmIGV4dGVuc2lvbi5pbnN0YW5jZSAmJiBleHRlbnNpb24uaW5zdGFuY2VbZXZlbnROYW1lXTtcclxuXHJcbiAgICBpZiAoc2xpY2tFdmVudCAmJiBzbGlja0V2ZW50LnN1YnNjcmliZSkge1xyXG4gICAgICB0aGlzLl9ldmVudEhhbmRsZXIuc3Vic2NyaWJlKHNsaWNrRXZlbnQsIChlOiBFdmVudCwgYXJnczogYW55KSA9PiB7XHJcbiAgICAgICAgY29uc3QgY29sdW1uczogQ29sdW1uW10gPSBhcmdzICYmIGFyZ3MuY29sdW1ucztcclxuICAgICAgICBjb25zdCBjdXJyZW50Q29sdW1uczogQ3VycmVudENvbHVtbltdID0gdGhpcy5nZXRBc3NvY2lhdGVkQ3VycmVudENvbHVtbnMoY29sdW1ucyk7XHJcbiAgICAgICAgdGhpcy5vbkdyaWRTdGF0ZUNoYW5nZWQubmV4dCh7IGNoYW5nZTogeyBuZXdWYWx1ZXM6IGN1cnJlbnRDb2x1bW5zLCB0eXBlOiBHcmlkU3RhdGVUeXBlLmNvbHVtbnMgfSwgZ3JpZFN0YXRlOiB0aGlzLmdldEN1cnJlbnRHcmlkU3RhdGUoKSB9KTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBCaW5kIGEgR3JpZCBFdmVudCB0byBhIEdyaWQgU3RhdGUgY2hhbmdlIGV2ZW50XHJcbiAgICogQHBhcmFtIGV2ZW50IG5hbWVcclxuICAgKiBAcGFyYW0gZ3JpZFxyXG4gICAqL1xyXG4gIHByaXZhdGUgYmluZFNsaWNrR3JpZEV2ZW50VG9HcmlkU3RhdGVDaGFuZ2UoZXZlbnROYW1lOiBzdHJpbmcsIGdyaWQ6IGFueSkge1xyXG4gICAgY29uc3Qgc2xpY2tHcmlkRXZlbnQgPSBncmlkICYmIGdyaWRbZXZlbnROYW1lXTtcclxuXHJcbiAgICBpZiAoc2xpY2tHcmlkRXZlbnQgJiYgc2xpY2tHcmlkRXZlbnQuc3Vic2NyaWJlKSB7XHJcbiAgICAgIHRoaXMuX2V2ZW50SGFuZGxlci5zdWJzY3JpYmUoc2xpY2tHcmlkRXZlbnQsIChlOiBFdmVudCwgYXJnczogYW55KSA9PiB7XHJcbiAgICAgICAgY29uc3QgY29sdW1uczogQ29sdW1uW10gPSBncmlkLmdldENvbHVtbnMoKTtcclxuICAgICAgICBjb25zdCBjdXJyZW50Q29sdW1uczogQ3VycmVudENvbHVtbltdID0gdGhpcy5nZXRBc3NvY2lhdGVkQ3VycmVudENvbHVtbnMoY29sdW1ucyk7XHJcbiAgICAgICAgdGhpcy5vbkdyaWRTdGF0ZUNoYW5nZWQubmV4dCh7IGNoYW5nZTogeyBuZXdWYWx1ZXM6IGN1cnJlbnRDb2x1bW5zLCB0eXBlOiBHcmlkU3RhdGVUeXBlLmNvbHVtbnMgfSwgZ3JpZFN0YXRlOiB0aGlzLmdldEN1cnJlbnRHcmlkU3RhdGUoKSB9KTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==