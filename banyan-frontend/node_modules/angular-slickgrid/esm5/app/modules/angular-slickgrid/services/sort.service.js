import { EmitterType, FieldType, SortDirection, SortDirectionNumber, } from './../models/index';
import { executeBackendProcessesCallback, onBackendError } from './backend-utilities';
import { getDescendantProperty } from './utilities';
import { sortByFieldType } from '../sorters/sorterUtilities';
import { isObservable, Subject } from 'rxjs';
var SortService = /** @class */ (function () {
    function SortService() {
        this._currentLocalSorters = [];
        this._eventHandler = new Slick.EventHandler();
        this._isBackendGrid = false;
        this.onSortChanged = new Subject();
        this.onSortCleared = new Subject();
    }
    Object.defineProperty(SortService.prototype, "_gridOptions", {
        /** Getter for the Grid Options pulled through the Grid Object */
        get: function () {
            return (this._grid && this._grid.getOptions) ? this._grid.getOptions() : {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SortService.prototype, "_columnDefinitions", {
        /** Getter for the Column Definitions pulled through the Grid Object */
        get: function () {
            return (this._grid && this._grid.getColumns) ? this._grid.getColumns() : [];
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Attach a backend sort (single/multi) hook to the grid
     * @param grid SlickGrid Grid object
     * @param dataView SlickGrid DataView object
     */
    SortService.prototype.attachBackendOnSort = function (grid, dataView) {
        this._isBackendGrid = true;
        this._grid = grid;
        this._dataView = dataView;
        this._slickSubscriber = grid.onSort;
        // subscribe to the SlickGrid event and call the backend execution
        this._slickSubscriber.subscribe(this.onBackendSortChanged.bind(this));
    };
    SortService.prototype.onBackendSortChanged = function (event, args) {
        var _this = this;
        if (!args || !args.grid) {
            throw new Error('Something went wrong when trying to attach the "onBackendSortChanged(event, args)" function, it seems that "args" is not populated correctly');
        }
        var gridOptions = args.grid.getOptions() || {};
        var backendApi = gridOptions.backendServiceApi;
        if (!backendApi || !backendApi.process || !backendApi.service) {
            throw new Error("BackendServiceApi requires at least a \"process\" function and a \"service\" defined");
        }
        try {
            // keep start time & end timestamps & return it after process execution
            var startTime_1 = new Date();
            if (backendApi.preProcess) {
                backendApi.preProcess();
            }
            var query = backendApi.service.processOnSortChanged(event, args);
            this.emitSortChanged(EmitterType.remote);
            // the processes can be Observables (like HttpClient) or Promises
            var process_1 = backendApi.process(query);
            if (process_1 instanceof Promise && process_1.then) {
                process_1.then(function (processResult) { return executeBackendProcessesCallback(startTime_1, processResult, backendApi, _this._gridOptions); });
            }
            else if (isObservable(process_1)) {
                process_1.subscribe(function (processResult) { return executeBackendProcessesCallback(startTime_1, processResult, backendApi, _this._gridOptions); }, function (error) { return onBackendError(error, backendApi); });
            }
        }
        catch (error) {
            onBackendError(error, backendApi);
        }
    };
    /**
     * Attach a local sort (single/multi) hook to the grid
     * @param grid SlickGrid Grid object
     * @param gridOptions Grid Options object
     * @param dataView
     */
    SortService.prototype.attachLocalOnSort = function (grid, dataView) {
        var _this = this;
        this._isBackendGrid = false;
        this._grid = grid;
        this._dataView = dataView;
        this._slickSubscriber = grid.onSort;
        this._slickSubscriber.subscribe(function (e, args) {
            // multiSort and singleSort are not exactly the same, but we want to structure it the same for the (for loop) after
            // also to avoid having to rewrite the for loop in the sort, we will make the singleSort an array of 1 object
            var sortColumns = (args.multiColumnSort) ? args.sortCols : new Array({ sortAsc: args.sortAsc, sortCol: args.sortCol });
            // keep current sorters
            _this._currentLocalSorters = []; // reset current local sorters
            if (Array.isArray(sortColumns)) {
                sortColumns.forEach(function (sortColumn) {
                    if (sortColumn.sortCol) {
                        _this._currentLocalSorters.push({
                            columnId: sortColumn.sortCol.id,
                            direction: sortColumn.sortAsc ? SortDirection.ASC : SortDirection.DESC
                        });
                    }
                });
            }
            _this.onLocalSortChanged(grid, dataView, sortColumns);
            _this.emitSortChanged(EmitterType.local);
        });
    };
    SortService.prototype.clearSorting = function (triggerQueryEvent) {
        if (triggerQueryEvent === void 0) { triggerQueryEvent = true; }
        if (this._grid && this._gridOptions && this._dataView) {
            // remove any sort icons (this setSortColumns function call really does only that)
            this._grid.setSortColumns([]);
            // we also need to trigger a sort change
            // for a backend grid, we will trigger a backend sort changed with an empty sort columns array
            // however for a local grid, we need to pass a sort column and so we will sort by the 1st column
            if (triggerQueryEvent) {
                if (this._isBackendGrid) {
                    this.onBackendSortChanged(undefined, { grid: this._grid, sortCols: [] });
                }
                else {
                    if (this._columnDefinitions && Array.isArray(this._columnDefinitions)) {
                        this.onLocalSortChanged(this._grid, this._dataView, new Array({ sortAsc: true, sortCol: this._columnDefinitions[0] }));
                    }
                }
            }
            else if (this._isBackendGrid) {
                var backendService = this._gridOptions && this._gridOptions.backendServiceApi && this._gridOptions.backendServiceApi.service;
                if (backendService && backendService.clearSorters) {
                    backendService.clearSorters();
                }
            }
        }
        // set current sorter to empty & emit a sort changed event
        this._currentLocalSorters = [];
        // emit an event when sorts are all cleared
        this.onSortCleared.next(true);
    };
    SortService.prototype.getCurrentLocalSorters = function () {
        return this._currentLocalSorters;
    };
    /**
     * Get column sorts,
     * If a column is passed as an argument, we won't add this column to our output array since it is already in the array
     * We want to know the sort prior to calling the next sorting command
     */
    SortService.prototype.getPreviousColumnSorts = function (columnId) {
        var _this = this;
        // getSortColumns() only returns sortAsc & columnId, we want the entire column definition
        var oldSortColumns = this._grid && this._grid.getSortColumns();
        // get the column definition but only keep column which are not equal to our current column
        if (Array.isArray(oldSortColumns)) {
            var sortedCols = oldSortColumns.reduce(function (cols, col) {
                if (!columnId || col.columnId !== columnId) {
                    cols.push({ sortCol: _this._columnDefinitions[_this._grid.getColumnIndex(col.columnId)], sortAsc: col.sortAsc });
                }
                return cols;
            }, []);
            return sortedCols;
        }
        return [];
    };
    /**
     * load any presets if there are any
     * @param grid
     * @param dataView
     */
    SortService.prototype.loadLocalPresets = function (grid, dataView) {
        var _this = this;
        var sortCols = [];
        this._currentLocalSorters = []; // reset current local sorters
        if (this._gridOptions && this._gridOptions.presets && this._gridOptions.presets.sorters) {
            var sorters = this._gridOptions.presets.sorters;
            sorters.forEach(function (presetSorting) {
                var gridColumn = _this._columnDefinitions.find(function (col) { return col.id === presetSorting.columnId; });
                if (gridColumn) {
                    sortCols.push({
                        columnId: gridColumn.id,
                        sortAsc: ((presetSorting.direction.toUpperCase() === SortDirection.ASC) ? true : false),
                        sortCol: gridColumn
                    });
                    // keep current sorters
                    _this._currentLocalSorters.push({
                        columnId: gridColumn.id + '',
                        direction: presetSorting.direction.toUpperCase()
                    });
                }
            });
            if (sortCols.length > 0) {
                this.onLocalSortChanged(grid, dataView, sortCols);
                grid.setSortColumns(sortCols); // use this to add sort icon(s) in UI
            }
        }
    };
    SortService.prototype.onLocalSortChanged = function (grid, dataView, sortColumns, forceReSort) {
        if (forceReSort === void 0) { forceReSort = false; }
        if (grid && dataView) {
            if (forceReSort) {
                dataView.reSort();
            }
            dataView.sort(function (dataRow1, dataRow2) {
                for (var i = 0, l = sortColumns.length; i < l; i++) {
                    var columnSortObj = sortColumns[i];
                    if (columnSortObj && columnSortObj.sortCol) {
                        var sortDirection = columnSortObj.sortAsc ? SortDirectionNumber.asc : SortDirectionNumber.desc;
                        var sortField = columnSortObj.sortCol.queryField || columnSortObj.sortCol.queryFieldSorter || columnSortObj.sortCol.field;
                        var fieldType = columnSortObj.sortCol.type || FieldType.string;
                        var value1 = dataRow1[sortField];
                        var value2 = dataRow2[sortField];
                        // when item is a complex object (dot "." notation), we need to filter the value contained in the object tree
                        if (sortField && sortField.indexOf('.') >= 0) {
                            value1 = getDescendantProperty(dataRow1, sortField);
                            value2 = getDescendantProperty(dataRow2, sortField);
                        }
                        // user could provide his own custom Sorter
                        if (columnSortObj.sortCol && columnSortObj.sortCol.sorter) {
                            var customSortResult = columnSortObj.sortCol.sorter(value1, value2, sortDirection, columnSortObj.sortCol);
                            if (customSortResult !== SortDirectionNumber.neutral) {
                                return customSortResult;
                            }
                        }
                        var sortResult = sortByFieldType(value1, value2, fieldType, sortDirection, columnSortObj.sortCol);
                        if (sortResult !== SortDirectionNumber.neutral) {
                            return sortResult;
                        }
                    }
                }
                return SortDirectionNumber.neutral;
            });
            grid.invalidate();
            grid.render();
        }
    };
    SortService.prototype.dispose = function () {
        // unsubscribe local event
        if (this._slickSubscriber && typeof this._slickSubscriber.unsubscribe === 'function') {
            this._slickSubscriber.unsubscribe();
        }
        // unsubscribe all SlickGrid events
        this._eventHandler.unsubscribeAll();
    };
    /**
     * A simple function that is attached to the subscriber and emit a change when the sort is called.
     * Other services, like Pagination, can then subscribe to it.
     * @param sender
     */
    SortService.prototype.emitSortChanged = function (sender) {
        if (sender === EmitterType.remote && this._gridOptions && this._gridOptions.backendServiceApi) {
            var currentSorters = [];
            var backendService = this._gridOptions.backendServiceApi.service;
            if (backendService && backendService.getCurrentSorters) {
                currentSorters = backendService.getCurrentSorters();
            }
            this.onSortChanged.next(currentSorters);
        }
        else if (sender === EmitterType.local) {
            this.onSortChanged.next(this.getCurrentLocalSorters());
        }
    };
    return SortService;
}());
export { SortService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9zZXJ2aWNlcy9zb3J0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUlMLFdBQVcsRUFDWCxTQUFTLEVBSVQsYUFBYSxFQUNiLG1CQUFtQixHQUVwQixNQUFNLG1CQUFtQixDQUFDO0FBQzNCLE9BQU8sRUFBRSwrQkFBK0IsRUFBRSxjQUFjLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN0RixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDcEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzdELE9BQU8sRUFBRSxZQUFZLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBSzdDO0lBQUE7UUFDVSx5QkFBb0IsR0FBb0IsRUFBRSxDQUFDO1FBQzNDLGtCQUFhLEdBQVEsSUFBSSxLQUFLLENBQUMsWUFBWSxFQUFFLENBQUM7UUFJOUMsbUJBQWMsR0FBRyxLQUFLLENBQUM7UUFDL0Isa0JBQWEsR0FBRyxJQUFJLE9BQU8sRUFBbUIsQ0FBQztRQUMvQyxrQkFBYSxHQUFHLElBQUksT0FBTyxFQUFXLENBQUM7SUF1UXpDLENBQUM7SUFwUUMsc0JBQVkscUNBQVk7UUFEeEIsaUVBQWlFO2FBQ2pFO1lBQ0UsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQzlFLENBQUM7OztPQUFBO0lBR0Qsc0JBQVksMkNBQWtCO1FBRDlCLHVFQUF1RTthQUN2RTtZQUNFLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElB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QUVELG1DQUFtQztRQUNuQyxJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ3RDLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gscUNBQWUsR0FBZixVQUFnQixNQUFtQjtRQUNqQyxJQUFJLE1BQU0sS0FBSyxXQUFXLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsRUFBRTtZQUM3RixJQUFJLGNBQWMsR0FBb0IsRUFBRSxDQUFDO1lBQ3pDLElBQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDO1lBQ25FLElBQUksY0FBYyxJQUFJLGNBQWMsQ0FBQyxpQkFBaUIsRUFBRTtnQkFDdEQsY0FBYyxHQUFHLGNBQWMsQ0FBQyxpQkFBaUIsRUFBcUIsQ0FBQzthQUN4RTtZQUNELElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1NBQ3pDO2FBQU0sSUFBSSxNQUFNLEtBQUssV0FBVyxDQUFDLEtBQUssRUFBRTtZQUN2QyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQyxDQUFDO1NBQ3hEO0lBQ0gsQ0FBQztJQUNILGtCQUFDO0FBQUQsQ0FBQyxBQS9RRCxJQStRQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbHVtbixcbiAgQ29sdW1uU29ydCxcbiAgQ3VycmVudFNvcnRlcixcbiAgRW1pdHRlclR5cGUsXG4gIEZpZWxkVHlwZSxcbiAgR3JhcGhxbFJlc3VsdCxcbiAgR3JpZE9wdGlvbixcbiAgU2xpY2tFdmVudCxcbiAgU29ydERpcmVjdGlvbixcbiAgU29ydERpcmVjdGlvbk51bWJlcixcbiAgU29ydERpcmVjdGlvblN0cmluZyxcbn0gZnJvbSAnLi8uLi9tb2RlbHMvaW5kZXgnO1xuaW1wb3J0IHsgZXhlY3V0ZUJhY2tlbmRQcm9jZXNzZXNDYWxsYmFjaywgb25CYWNrZW5kRXJyb3IgfSBmcm9tICcuL2JhY2tlbmQtdXRpbGl0aWVzJztcbmltcG9ydCB7IGdldERlc2NlbmRhbnRQcm9wZXJ0eSB9IGZyb20gJy4vdXRpbGl0aWVzJztcbmltcG9ydCB7IHNvcnRCeUZpZWxkVHlwZSB9IGZyb20gJy4uL3NvcnRlcnMvc29ydGVyVXRpbGl0aWVzJztcbmltcG9ydCB7IGlzT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG4vLyB1c2luZyBleHRlcm5hbCBub24tdHlwZWQganMgbGlicmFyaWVzXG5kZWNsYXJlIHZhciBTbGljazogYW55O1xuXG5leHBvcnQgY2xhc3MgU29ydFNlcnZpY2Uge1xuICBwcml2YXRlIF9jdXJyZW50TG9jYWxTb3J0ZXJzOiBDdXJyZW50U29ydGVyW10gPSBbXTtcbiAgcHJpdmF0ZSBfZXZlbnRIYW5kbGVyOiBhbnkgPSBuZXcgU2xpY2suRXZlbnRIYW5kbGVyKCk7XG4gIHByaXZhdGUgX2RhdGFWaWV3OiBhbnk7XG4gIHByaXZhdGUgX2dyaWQ6IGFueTtcbiAgcHJpdmF0ZSBfc2xpY2tTdWJzY3JpYmVyOiBTbGlja0V2ZW50O1xuICBwcml2YXRlIF9pc0JhY2tlbmRHcmlkID0gZmFsc2U7XG4gIG9uU29ydENoYW5nZWQgPSBuZXcgU3ViamVjdDxDdXJyZW50U29ydGVyW10+KCk7XG4gIG9uU29ydENsZWFyZWQgPSBuZXcgU3ViamVjdDxib29sZWFuPigpO1xuXG4gIC8qKiBHZXR0ZXIgZm9yIHRoZSBHcmlkIE9wdGlvbnMgcHVsbGVkIHRocm91Z2ggdGhlIEdyaWQgT2JqZWN0ICovXG4gIHByaXZhdGUgZ2V0IF9ncmlkT3B0aW9ucygpOiBHcmlkT3B0aW9uIHtcbiAgICByZXR1cm4gKHRoaXMuX2dyaWQgJiYgdGhpcy5fZ3JpZC5nZXRPcHRpb25zKSA/IHRoaXMuX2dyaWQuZ2V0T3B0aW9ucygpIDoge307XG4gIH1cblxuICAvKiogR2V0dGVyIGZvciB0aGUgQ29sdW1uIERlZmluaXRpb25zIHB1bGxlZCB0aHJvdWdoIHRoZSBHcmlkIE9iamVjdCAqL1xuICBwcml2YXRlIGdldCBfY29sdW1uRGVmaW5pdGlvbnMoKTogQ29sdW1uW10ge1xuICAgIHJldHVybiAodGhpcy5fZ3JpZCAmJiB0aGlzLl9ncmlkLmdldENvbHVtbnMpID8gdGhpcy5fZ3JpZC5nZXRDb2x1bW5zKCkgOiBbXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYSBiYWNrZW5kIHNvcnQgKHNpbmdsZS9tdWx0aSkgaG9vayB0byB0aGUgZ3JpZFxuICAgKiBAcGFyYW0gZ3JpZCBTbGlja0dyaWQgR3JpZCBvYmplY3RcbiAgICogQHBhcmFtIGRhdGFWaWV3IFNsaWNrR3JpZCBEYXRhVmlldyBvYmplY3RcbiAgICovXG4gIGF0dGFjaEJhY2tlbmRPblNvcnQoZ3JpZDogYW55LCBkYXRhVmlldzogYW55KSB7XG4gICAgdGhpcy5faXNCYWNrZW5kR3JpZCA9IHRydWU7XG4gICAgdGhpcy5fZ3JpZCA9IGdyaWQ7XG4gICAgdGhpcy5fZGF0YVZpZXcgPSBkYXRhVmlldztcbiAgICB0aGlzLl9zbGlja1N1YnNjcmliZXIgPSBncmlkLm9uU29ydDtcblxuICAgIC8vIHN1YnNjcmliZSB0byB0aGUgU2xpY2tHcmlkIGV2ZW50IGFuZCBjYWxsIHRoZSBiYWNrZW5kIGV4ZWN1dGlvblxuICAgIHRoaXMuX3NsaWNrU3Vic2NyaWJlci5zdWJzY3JpYmUodGhpcy5vbkJhY2tlbmRTb3J0Q2hhbmdlZC5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIG9uQmFja2VuZFNvcnRDaGFuZ2VkKGV2ZW50OiBFdmVudCwgYXJnczogYW55KSB7XG4gICAgaWYgKCFhcmdzIHx8ICFhcmdzLmdyaWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignU29tZXRoaW5nIHdlbnQgd3Jvbmcgd2hlbiB0cnlpbmcgdG8gYXR0YWNoIHRoZSBcIm9uQmFja2VuZFNvcnRDaGFuZ2VkKGV2ZW50LCBhcmdzKVwiIGZ1bmN0aW9uLCBpdCBzZWVtcyB0aGF0IFwiYXJnc1wiIGlzIG5vdCBwb3B1bGF0ZWQgY29ycmVjdGx5Jyk7XG4gICAgfVxuICAgIGNvbnN0IGdyaWRPcHRpb25zOiBHcmlkT3B0aW9uID0gYXJncy5ncmlkLmdldE9wdGlvbnMoKSB8fCB7fTtcbiAgICBjb25zdCBiYWNrZW5kQXBpID0gZ3JpZE9wdGlvbnMuYmFja2VuZFNlcnZpY2VBcGk7XG5cbiAgICBpZiAoIWJhY2tlbmRBcGkgfHwgIWJhY2tlbmRBcGkucHJvY2VzcyB8fCAhYmFja2VuZEFwaS5zZXJ2aWNlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEJhY2tlbmRTZXJ2aWNlQXBpIHJlcXVpcmVzIGF0IGxlYXN0IGEgXCJwcm9jZXNzXCIgZnVuY3Rpb24gYW5kIGEgXCJzZXJ2aWNlXCIgZGVmaW5lZGApO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICAvLyBrZWVwIHN0YXJ0IHRpbWUgJiBlbmQgdGltZXN0YW1wcyAmIHJldHVybiBpdCBhZnRlciBwcm9jZXNzIGV4ZWN1dGlvblxuICAgICAgY29uc3Qgc3RhcnRUaW1lID0gbmV3IERhdGUoKTtcblxuICAgICAgaWYgKGJhY2tlbmRBcGkucHJlUHJvY2Vzcykge1xuICAgICAgICBiYWNrZW5kQXBpLnByZVByb2Nlc3MoKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcXVlcnkgPSBiYWNrZW5kQXBpLnNlcnZpY2UucHJvY2Vzc09uU29ydENoYW5nZWQoZXZlbnQsIGFyZ3MpO1xuICAgICAgdGhpcy5lbWl0U29ydENoYW5nZWQoRW1pdHRlclR5cGUucmVtb3RlKTtcblxuICAgICAgLy8gdGhlIHByb2Nlc3NlcyBjYW4gYmUgT2JzZXJ2YWJsZXMgKGxpa2UgSHR0cENsaWVudCkgb3IgUHJvbWlzZXNcbiAgICAgIGNvbnN0IHByb2Nlc3MgPSBiYWNrZW5kQXBpLnByb2Nlc3MocXVlcnkpO1xuICAgICAgaWYgKHByb2Nlc3MgaW5zdGFuY2VvZiBQcm9taXNlICYmIHByb2Nlc3MudGhlbikge1xuICAgICAgICBwcm9jZXNzLnRoZW4oKHByb2Nlc3NSZXN1bHQ6IEdyYXBocWxSZXN1bHQgfCBhbnkpID0+IGV4ZWN1dGVCYWNrZW5kUHJvY2Vzc2VzQ2FsbGJhY2soc3RhcnRUaW1lLCBwcm9jZXNzUmVzdWx0LCBiYWNrZW5kQXBpLCB0aGlzLl9ncmlkT3B0aW9ucykpO1xuICAgICAgfSBlbHNlIGlmIChpc09ic2VydmFibGUocHJvY2VzcykpIHtcbiAgICAgICAgcHJvY2Vzcy5zdWJzY3JpYmUoXG4gICAgICAgICAgKHByb2Nlc3NSZXN1bHQ6IEdyYXBocWxSZXN1bHQgfCBhbnkpID0+IGV4ZWN1dGVCYWNrZW5kUHJvY2Vzc2VzQ2FsbGJhY2soc3RhcnRUaW1lLCBwcm9jZXNzUmVzdWx0LCBiYWNrZW5kQXBpLCB0aGlzLl9ncmlkT3B0aW9ucyksXG4gICAgICAgICAgKGVycm9yOiBhbnkpID0+IG9uQmFja2VuZEVycm9yKGVycm9yLCBiYWNrZW5kQXBpKVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBvbkJhY2tlbmRFcnJvcihlcnJvciwgYmFja2VuZEFwaSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaCBhIGxvY2FsIHNvcnQgKHNpbmdsZS9tdWx0aSkgaG9vayB0byB0aGUgZ3JpZFxuICAgKiBAcGFyYW0gZ3JpZCBTbGlja0dyaWQgR3JpZCBvYmplY3RcbiAgICogQHBhcmFtIGdyaWRPcHRpb25zIEdyaWQgT3B0aW9ucyBvYmplY3RcbiAgICogQHBhcmFtIGRhdGFWaWV3XG4gICAqL1xuICBhdHRhY2hMb2NhbE9uU29ydChncmlkOiBhbnksIGRhdGFWaWV3OiBhbnkpIHtcbiAgICB0aGlzLl9pc0JhY2tlbmRHcmlkID0gZmFsc2U7XG4gICAgdGhpcy5fZ3JpZCA9IGdyaWQ7XG4gICAgdGhpcy5fZGF0YVZpZXcgPSBkYXRhVmlldztcbiAgICB0aGlzLl9zbGlja1N1YnNjcmliZXIgPSBncmlkLm9uU29ydDtcblxuICAgIHRoaXMuX3NsaWNrU3Vic2NyaWJlci5zdWJzY3JpYmUoKGU6IGFueSwgYXJnczogYW55KSA9PiB7XG4gICAgICAvLyBtdWx0aVNvcnQgYW5kIHNpbmdsZVNvcnQgYXJlIG5vdCBleGFjdGx5IHRoZSBzYW1lLCBidXQgd2Ugd2FudCB0byBzdHJ1Y3R1cmUgaXQgdGhlIHNhbWUgZm9yIHRoZSAoZm9yIGxvb3ApIGFmdGVyXG4gICAgICAvLyBhbHNvIHRvIGF2b2lkIGhhdmluZyB0byByZXdyaXRlIHRoZSBmb3IgbG9vcCBpbiB0aGUgc29ydCwgd2Ugd2lsbCBtYWtlIHRoZSBzaW5nbGVTb3J0IGFuIGFycmF5IG9mIDEgb2JqZWN0XG4gICAgICBjb25zdCBzb3J0Q29sdW1ucyA9IChhcmdzLm11bHRpQ29sdW1uU29ydCkgPyBhcmdzLnNvcnRDb2xzIDogbmV3IEFycmF5KHtzb3J0QXNjOiBhcmdzLnNvcnRBc2MsIHNvcnRDb2w6IGFyZ3Muc29ydENvbH0pO1xuXG4gICAgICAvLyBrZWVwIGN1cnJlbnQgc29ydGVyc1xuICAgICAgdGhpcy5fY3VycmVudExvY2FsU29ydGVycyA9IFtdOyAvLyByZXNldCBjdXJyZW50IGxvY2FsIHNvcnRlcnNcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHNvcnRDb2x1bW5zKSkge1xuICAgICAgICBzb3J0Q29sdW1ucy5mb3JFYWNoKChzb3J0Q29sdW1uOiB7IHNvcnRDb2w6IENvbHVtbiwgc29ydEFzYzogbnVtYmVyIH0pID0+IHtcbiAgICAgICAgICBpZiAoc29ydENvbHVtbi5zb3J0Q29sKSB7XG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50TG9jYWxTb3J0ZXJzLnB1c2goe1xuICAgICAgICAgICAgICBjb2x1bW5JZDogc29ydENvbHVtbi5zb3J0Q29sLmlkLFxuICAgICAgICAgICAgICBkaXJlY3Rpb246IHNvcnRDb2x1bW4uc29ydEFzYyA/IFNvcnREaXJlY3Rpb24uQVNDIDogU29ydERpcmVjdGlvbi5ERVNDXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICB0aGlzLm9uTG9jYWxTb3J0Q2hhbmdlZChncmlkLCBkYXRhVmlldywgc29ydENvbHVtbnMpO1xuICAgICAgdGhpcy5lbWl0U29ydENoYW5nZWQoRW1pdHRlclR5cGUubG9jYWwpO1xuICAgIH0pO1xuICB9XG5cbiAgY2xlYXJTb3J0aW5nKHRyaWdnZXJRdWVyeUV2ZW50ID0gdHJ1ZSkge1xuICAgIGlmICh0aGlzLl9ncmlkICYmIHRoaXMuX2dyaWRPcHRpb25zICYmIHRoaXMuX2RhdGFWaWV3KSB7XG4gICAgICAvLyByZW1vdmUgYW55IHNvcnQgaWNvbnMgKHRoaXMgc2V0U29ydENvbHVtbnMgZnVuY3Rpb24gY2FsbCByZWFsbHkgZG9lcyBvbmx5IHRoYXQpXG4gICAgICB0aGlzLl9ncmlkLnNldFNvcnRDb2x1bW5zKFtdKTtcblxuICAgICAgLy8gd2UgYWxzbyBuZWVkIHRvIHRyaWdnZXIgYSBzb3J0IGNoYW5nZVxuICAgICAgLy8gZm9yIGEgYmFja2VuZCBncmlkLCB3ZSB3aWxsIHRyaWdnZXIgYSBiYWNrZW5kIHNvcnQgY2hhbmdlZCB3aXRoIGFuIGVtcHR5IHNvcnQgY29sdW1ucyBhcnJheVxuICAgICAgLy8gaG93ZXZlciBmb3IgYSBsb2NhbCBncmlkLCB3ZSBuZWVkIHRvIHBhc3MgYSBzb3J0IGNvbHVtbiBhbmQgc28gd2Ugd2lsbCBzb3J0IGJ5IHRoZSAxc3QgY29sdW1uXG4gICAgICBpZiAodHJpZ2dlclF1ZXJ5RXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuX2lzQmFja2VuZEdyaWQpIHtcbiAgICAgICAgICB0aGlzLm9uQmFja2VuZFNvcnRDaGFuZ2VkKHVuZGVmaW5lZCwgeyBncmlkOiB0aGlzLl9ncmlkLCBzb3J0Q29sczogW10gfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKHRoaXMuX2NvbHVtbkRlZmluaXRpb25zICYmIEFycmF5LmlzQXJyYXkodGhpcy5fY29sdW1uRGVmaW5pdGlvbnMpKSB7XG4gICAgICAgICAgICB0aGlzLm9uTG9jYWxTb3J0Q2hhbmdlZCh0aGlzLl9ncmlkLCB0aGlzLl9kYXRhVmlldywgbmV3IEFycmF5KHtzb3J0QXNjOiB0cnVlLCBzb3J0Q29sOiB0aGlzLl9jb2x1bW5EZWZpbml0aW9uc1swXSB9KSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuX2lzQmFja2VuZEdyaWQpIHtcbiAgICAgICAgY29uc3QgYmFja2VuZFNlcnZpY2UgPSB0aGlzLl9ncmlkT3B0aW9ucyAmJiB0aGlzLl9ncmlkT3B0aW9ucy5iYWNrZW5kU2VydmljZUFwaSAmJiB0aGlzLl9ncmlkT3B0aW9ucy5iYWNrZW5kU2VydmljZUFwaS5zZXJ2aWNlO1xuICAgICAgICBpZiAoYmFja2VuZFNlcnZpY2UgJiYgYmFja2VuZFNlcnZpY2UuY2xlYXJTb3J0ZXJzKSB7XG4gICAgICAgICAgYmFja2VuZFNlcnZpY2UuY2xlYXJTb3J0ZXJzKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBzZXQgY3VycmVudCBzb3J0ZXIgdG8gZW1wdHkgJiBlbWl0IGEgc29ydCBjaGFuZ2VkIGV2ZW50XG4gICAgdGhpcy5fY3VycmVudExvY2FsU29ydGVycyA9IFtdO1xuXG4gICAgLy8gZW1pdCBhbiBldmVudCB3aGVuIHNvcnRzIGFyZSBhbGwgY2xlYXJlZFxuICAgIHRoaXMub25Tb3J0Q2xlYXJlZC5uZXh0KHRydWUpO1xuICB9XG5cbiAgZ2V0Q3VycmVudExvY2FsU29ydGVycygpOiBDdXJyZW50U29ydGVyW10ge1xuICAgIHJldHVybiB0aGlzLl9jdXJyZW50TG9jYWxTb3J0ZXJzO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBjb2x1bW4gc29ydHMsXG4gICAqIElmIGEgY29sdW1uIGlzIHBhc3NlZCBhcyBhbiBhcmd1bWVudCwgd2Ugd29uJ3QgYWRkIHRoaXMgY29sdW1uIHRvIG91ciBvdXRwdXQgYXJyYXkgc2luY2UgaXQgaXMgYWxyZWFkeSBpbiB0aGUgYXJyYXlcbiAgICogV2Ugd2FudCB0byBrbm93IHRoZSBzb3J0IHByaW9yIHRvIGNhbGxpbmcgdGhlIG5leHQgc29ydGluZyBjb21tYW5kXG4gICAqL1xuICBnZXRQcmV2aW91c0NvbHVtblNvcnRzKGNvbHVtbklkPzogc3RyaW5nKSB7XG4gICAgLy8gZ2V0U29ydENvbHVtbnMoKSBvbmx5IHJldHVybnMgc29ydEFzYyAmIGNvbHVtbklkLCB3ZSB3YW50IHRoZSBlbnRpcmUgY29sdW1uIGRlZmluaXRpb25cbiAgICBjb25zdCBvbGRTb3J0Q29sdW1ucyA9IHRoaXMuX2dyaWQgJiYgdGhpcy5fZ3JpZC5nZXRTb3J0Q29sdW1ucygpO1xuXG4gICAgLy8gZ2V0IHRoZSBjb2x1bW4gZGVmaW5pdGlvbiBidXQgb25seSBrZWVwIGNvbHVtbiB3aGljaCBhcmUgbm90IGVxdWFsIHRvIG91ciBjdXJyZW50IGNvbHVtblxuICAgIGlmIChBcnJheS5pc0FycmF5KG9sZFNvcnRDb2x1bW5zKSkge1xuICAgICAgY29uc3Qgc29ydGVkQ29scyA9IG9sZFNvcnRDb2x1bW5zLnJlZHVjZSgoY29scywgY29sKSA9PiB7XG4gICAgICAgIGlmICghY29sdW1uSWQgfHwgY29sLmNvbHVtbklkICE9PSBjb2x1bW5JZCkge1xuICAgICAgICAgIGNvbHMucHVzaCh7IHNvcnRDb2w6IHRoaXMuX2NvbHVtbkRlZmluaXRpb25zW3RoaXMuX2dyaWQuZ2V0Q29sdW1uSW5kZXgoY29sLmNvbHVtbklkKV0sIHNvcnRBc2M6IGNvbC5zb3J0QXNjIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb2xzO1xuICAgICAgfSwgW10pO1xuXG4gICAgICByZXR1cm4gc29ydGVkQ29scztcbiAgICB9XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgLyoqXG4gICAqIGxvYWQgYW55IHByZXNldHMgaWYgdGhlcmUgYXJlIGFueVxuICAgKiBAcGFyYW0gZ3JpZFxuICAgKiBAcGFyYW0gZGF0YVZpZXdcbiAgICovXG4gIGxvYWRMb2NhbFByZXNldHMoZ3JpZDogYW55LCBkYXRhVmlldzogYW55KSB7XG4gICAgY29uc3Qgc29ydENvbHM6IENvbHVtblNvcnRbXSA9IFtdO1xuICAgIHRoaXMuX2N1cnJlbnRMb2NhbFNvcnRlcnMgPSBbXTsgLy8gcmVzZXQgY3VycmVudCBsb2NhbCBzb3J0ZXJzXG4gICAgaWYgKHRoaXMuX2dyaWRPcHRpb25zICYmIHRoaXMuX2dyaWRPcHRpb25zLnByZXNldHMgJiYgdGhpcy5fZ3JpZE9wdGlvbnMucHJlc2V0cy5zb3J0ZXJzKSB7XG4gICAgICBjb25zdCBzb3J0ZXJzID0gdGhpcy5fZ3JpZE9wdGlvbnMucHJlc2V0cy5zb3J0ZXJzO1xuXG4gICAgICBzb3J0ZXJzLmZvckVhY2goKHByZXNldFNvcnRpbmc6IEN1cnJlbnRTb3J0ZXIpID0+IHtcbiAgICAgICAgY29uc3QgZ3JpZENvbHVtbiA9IHRoaXMuX2NvbHVtbkRlZmluaXRpb25zLmZpbmQoKGNvbDogQ29sdW1uKSA9PiBjb2wuaWQgPT09IHByZXNldFNvcnRpbmcuY29sdW1uSWQpO1xuICAgICAgICBpZiAoZ3JpZENvbHVtbikge1xuICAgICAgICAgIHNvcnRDb2xzLnB1c2goe1xuICAgICAgICAgICAgY29sdW1uSWQ6IGdyaWRDb2x1bW4uaWQsXG4gICAgICAgICAgICBzb3J0QXNjOiAoKHByZXNldFNvcnRpbmcuZGlyZWN0aW9uLnRvVXBwZXJDYXNlKCkgPT09IFNvcnREaXJlY3Rpb24uQVNDKSA/IHRydWUgOiBmYWxzZSksXG4gICAgICAgICAgICBzb3J0Q29sOiBncmlkQ29sdW1uXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAvLyBrZWVwIGN1cnJlbnQgc29ydGVyc1xuICAgICAgICAgIHRoaXMuX2N1cnJlbnRMb2NhbFNvcnRlcnMucHVzaCh7XG4gICAgICAgICAgICBjb2x1bW5JZDogZ3JpZENvbHVtbi5pZCArICcnLFxuICAgICAgICAgICAgZGlyZWN0aW9uOiBwcmVzZXRTb3J0aW5nLmRpcmVjdGlvbi50b1VwcGVyQ2FzZSgpIGFzIFNvcnREaXJlY3Rpb25TdHJpbmdcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGlmIChzb3J0Q29scy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMub25Mb2NhbFNvcnRDaGFuZ2VkKGdyaWQsIGRhdGFWaWV3LCBzb3J0Q29scyk7XG4gICAgICAgIGdyaWQuc2V0U29ydENvbHVtbnMoc29ydENvbHMpOyAvLyB1c2UgdGhpcyB0byBhZGQgc29ydCBpY29uKHMpIGluIFVJXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgb25Mb2NhbFNvcnRDaGFuZ2VkKGdyaWQ6IGFueSwgZGF0YVZpZXc6IGFueSwgc29ydENvbHVtbnM6IENvbHVtblNvcnRbXSwgZm9yY2VSZVNvcnQgPSBmYWxzZSkge1xuICAgIGlmIChncmlkICYmIGRhdGFWaWV3KSB7XG4gICAgICBpZiAoZm9yY2VSZVNvcnQpIHtcbiAgICAgICAgZGF0YVZpZXcucmVTb3J0KCk7XG4gICAgICB9XG5cbiAgICAgIGRhdGFWaWV3LnNvcnQoKGRhdGFSb3cxOiBhbnksIGRhdGFSb3cyOiBhbnkpID0+IHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBzb3J0Q29sdW1ucy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICBjb25zdCBjb2x1bW5Tb3J0T2JqID0gc29ydENvbHVtbnNbaV07XG4gICAgICAgICAgaWYgKGNvbHVtblNvcnRPYmogJiYgY29sdW1uU29ydE9iai5zb3J0Q29sKSB7XG4gICAgICAgICAgICBjb25zdCBzb3J0RGlyZWN0aW9uID0gY29sdW1uU29ydE9iai5zb3J0QXNjID8gU29ydERpcmVjdGlvbk51bWJlci5hc2MgOiBTb3J0RGlyZWN0aW9uTnVtYmVyLmRlc2M7XG4gICAgICAgICAgICBjb25zdCBzb3J0RmllbGQgPSBjb2x1bW5Tb3J0T2JqLnNvcnRDb2wucXVlcnlGaWVsZCB8fCBjb2x1bW5Tb3J0T2JqLnNvcnRDb2wucXVlcnlGaWVsZFNvcnRlciB8fCBjb2x1bW5Tb3J0T2JqLnNvcnRDb2wuZmllbGQ7XG4gICAgICAgICAgICBjb25zdCBmaWVsZFR5cGUgPSBjb2x1bW5Tb3J0T2JqLnNvcnRDb2wudHlwZSB8fCBGaWVsZFR5cGUuc3RyaW5nO1xuICAgICAgICAgICAgbGV0IHZhbHVlMSA9IGRhdGFSb3cxW3NvcnRGaWVsZF07XG4gICAgICAgICAgICBsZXQgdmFsdWUyID0gZGF0YVJvdzJbc29ydEZpZWxkXTtcblxuICAgICAgICAgICAgLy8gd2hlbiBpdGVtIGlzIGEgY29tcGxleCBvYmplY3QgKGRvdCBcIi5cIiBub3RhdGlvbiksIHdlIG5lZWQgdG8gZmlsdGVyIHRoZSB2YWx1ZSBjb250YWluZWQgaW4gdGhlIG9iamVjdCB0cmVlXG4gICAgICAgICAgICBpZiAoc29ydEZpZWxkICYmIHNvcnRGaWVsZC5pbmRleE9mKCcuJykgPj0gMCkge1xuICAgICAgICAgICAgICB2YWx1ZTEgPSBnZXREZXNjZW5kYW50UHJvcGVydHkoZGF0YVJvdzEsIHNvcnRGaWVsZCk7XG4gICAgICAgICAgICAgIHZhbHVlMiA9IGdldERlc2NlbmRhbnRQcm9wZXJ0eShkYXRhUm93Miwgc29ydEZpZWxkKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gdXNlciBjb3VsZCBwcm92aWRlIGhpcyBvd24gY3VzdG9tIFNvcnRlclxuICAgICAgICAgICAgaWYgKGNvbHVtblNvcnRPYmouc29ydENvbCAmJiBjb2x1bW5Tb3J0T2JqLnNvcnRDb2wuc29ydGVyKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGN1c3RvbVNvcnRSZXN1bHQgPSBjb2x1bW5Tb3J0T2JqLnNvcnRDb2wuc29ydGVyKHZhbHVlMSwgdmFsdWUyLCBzb3J0RGlyZWN0aW9uLCBjb2x1bW5Tb3J0T2JqLnNvcnRDb2wpO1xuICAgICAgICAgICAgICBpZiAoY3VzdG9tU29ydFJlc3VsdCAhPT0gU29ydERpcmVjdGlvbk51bWJlci5uZXV0cmFsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGN1c3RvbVNvcnRSZXN1bHQ7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3Qgc29ydFJlc3VsdCA9IHNvcnRCeUZpZWxkVHlwZSh2YWx1ZTEsIHZhbHVlMiwgZmllbGRUeXBlLCBzb3J0RGlyZWN0aW9uLCBjb2x1bW5Tb3J0T2JqLnNvcnRDb2wpO1xuICAgICAgICAgICAgaWYgKHNvcnRSZXN1bHQgIT09IFNvcnREaXJlY3Rpb25OdW1iZXIubmV1dHJhbCkge1xuICAgICAgICAgICAgICByZXR1cm4gc29ydFJlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFNvcnREaXJlY3Rpb25OdW1iZXIubmV1dHJhbDtcbiAgICAgIH0pO1xuXG4gICAgICBncmlkLmludmFsaWRhdGUoKTtcbiAgICAgIGdyaWQucmVuZGVyKCk7XG4gICAgfVxuICB9XG5cbiAgZGlzcG9zZSgpIHtcbiAgICAvLyB1bnN1YnNjcmliZSBsb2NhbCBldmVudFxuICAgIGlmICh0aGlzLl9zbGlja1N1YnNjcmliZXIgJiYgdHlwZW9mIHRoaXMuX3NsaWNrU3Vic2NyaWJlci51bnN1YnNjcmliZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhpcy5fc2xpY2tTdWJzY3JpYmVyLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgLy8gdW5zdWJzY3JpYmUgYWxsIFNsaWNrR3JpZCBldmVudHNcbiAgICB0aGlzLl9ldmVudEhhbmRsZXIudW5zdWJzY3JpYmVBbGwoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBIHNpbXBsZSBmdW5jdGlvbiB0aGF0IGlzIGF0dGFjaGVkIHRvIHRoZSBzdWJzY3JpYmVyIGFuZCBlbWl0IGEgY2hhbmdlIHdoZW4gdGhlIHNvcnQgaXMgY2FsbGVkLlxuICAgKiBPdGhlciBzZXJ2aWNlcywgbGlrZSBQYWdpbmF0aW9uLCBjYW4gdGhlbiBzdWJzY3JpYmUgdG8gaXQuXG4gICAqIEBwYXJhbSBzZW5kZXJcbiAgICovXG4gIGVtaXRTb3J0Q2hhbmdlZChzZW5kZXI6IEVtaXR0ZXJUeXBlKSB7XG4gICAgaWYgKHNlbmRlciA9PT0gRW1pdHRlclR5cGUucmVtb3RlICYmIHRoaXMuX2dyaWRPcHRpb25zICYmIHRoaXMuX2dyaWRPcHRpb25zLmJhY2tlbmRTZXJ2aWNlQXBpKSB7XG4gICAgICBsZXQgY3VycmVudFNvcnRlcnM6IEN1cnJlbnRTb3J0ZXJbXSA9IFtdO1xuICAgICAgY29uc3QgYmFja2VuZFNlcnZpY2UgPSB0aGlzLl9ncmlkT3B0aW9ucy5iYWNrZW5kU2VydmljZUFwaS5zZXJ2aWNlO1xuICAgICAgaWYgKGJhY2tlbmRTZXJ2aWNlICYmIGJhY2tlbmRTZXJ2aWNlLmdldEN1cnJlbnRTb3J0ZXJzKSB7XG4gICAgICAgIGN1cnJlbnRTb3J0ZXJzID0gYmFja2VuZFNlcnZpY2UuZ2V0Q3VycmVudFNvcnRlcnMoKSBhcyBDdXJyZW50U29ydGVyW107XG4gICAgICB9XG4gICAgICB0aGlzLm9uU29ydENoYW5nZWQubmV4dChjdXJyZW50U29ydGVycyk7XG4gICAgfSBlbHNlIGlmIChzZW5kZXIgPT09IEVtaXR0ZXJUeXBlLmxvY2FsKSB7XG4gICAgICB0aGlzLm9uU29ydENoYW5nZWQubmV4dCh0aGlzLmdldEN1cnJlbnRMb2NhbFNvcnRlcnMoKSk7XG4gICAgfVxuICB9XG59XG4iXX0=