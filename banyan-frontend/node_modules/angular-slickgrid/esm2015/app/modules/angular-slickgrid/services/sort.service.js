import { EmitterType, FieldType, SortDirection, SortDirectionNumber, } from './../models/index';
import { executeBackendProcessesCallback, onBackendError } from './backend-utilities';
import { getDescendantProperty } from './utilities';
import { sortByFieldType } from '../sorters/sorterUtilities';
import { isObservable, Subject } from 'rxjs';
export class SortService {
    constructor() {
        this._currentLocalSorters = [];
        this._eventHandler = new Slick.EventHandler();
        this._isBackendGrid = false;
        this.onSortChanged = new Subject();
        this.onSortCleared = new Subject();
    }
    /** Getter for the Grid Options pulled through the Grid Object */
    get _gridOptions() {
        return (this._grid && this._grid.getOptions) ? this._grid.getOptions() : {};
    }
    /** Getter for the Column Definitions pulled through the Grid Object */
    get _columnDefinitions() {
        return (this._grid && this._grid.getColumns) ? this._grid.getColumns() : [];
    }
    /**
     * Attach a backend sort (single/multi) hook to the grid
     * @param grid SlickGrid Grid object
     * @param dataView SlickGrid DataView object
     */
    attachBackendOnSort(grid, dataView) {
        this._isBackendGrid = true;
        this._grid = grid;
        this._dataView = dataView;
        this._slickSubscriber = grid.onSort;
        // subscribe to the SlickGrid event and call the backend execution
        this._slickSubscriber.subscribe(this.onBackendSortChanged.bind(this));
    }
    onBackendSortChanged(event, args) {
        if (!args || !args.grid) {
            throw new Error('Something went wrong when trying to attach the "onBackendSortChanged(event, args)" function, it seems that "args" is not populated correctly');
        }
        const gridOptions = args.grid.getOptions() || {};
        const backendApi = gridOptions.backendServiceApi;
        if (!backendApi || !backendApi.process || !backendApi.service) {
            throw new Error(`BackendServiceApi requires at least a "process" function and a "service" defined`);
        }
        try {
            // keep start time & end timestamps & return it after process execution
            const startTime = new Date();
            if (backendApi.preProcess) {
                backendApi.preProcess();
            }
            const query = backendApi.service.processOnSortChanged(event, args);
            this.emitSortChanged(EmitterType.remote);
            // the processes can be Observables (like HttpClient) or Promises
            const process = backendApi.process(query);
            if (process instanceof Promise && process.then) {
                process.then((processResult) => executeBackendProcessesCallback(startTime, processResult, backendApi, this._gridOptions));
            }
            else if (isObservable(process)) {
                process.subscribe((processResult) => executeBackendProcessesCallback(startTime, processResult, backendApi, this._gridOptions), (error) => onBackendError(error, backendApi));
            }
        }
        catch (error) {
            onBackendError(error, backendApi);
        }
    }
    /**
     * Attach a local sort (single/multi) hook to the grid
     * @param grid SlickGrid Grid object
     * @param gridOptions Grid Options object
     * @param dataView
     */
    attachLocalOnSort(grid, dataView) {
        this._isBackendGrid = false;
        this._grid = grid;
        this._dataView = dataView;
        this._slickSubscriber = grid.onSort;
        this._slickSubscriber.subscribe((e, args) => {
            // multiSort and singleSort are not exactly the same, but we want to structure it the same for the (for loop) after
            // also to avoid having to rewrite the for loop in the sort, we will make the singleSort an array of 1 object
            const sortColumns = (args.multiColumnSort) ? args.sortCols : new Array({ sortAsc: args.sortAsc, sortCol: args.sortCol });
            // keep current sorters
            this._currentLocalSorters = []; // reset current local sorters
            if (Array.isArray(sortColumns)) {
                sortColumns.forEach((sortColumn) => {
                    if (sortColumn.sortCol) {
                        this._currentLocalSorters.push({
                            columnId: sortColumn.sortCol.id,
                            direction: sortColumn.sortAsc ? SortDirection.ASC : SortDirection.DESC
                        });
                    }
                });
            }
            this.onLocalSortChanged(grid, dataView, sortColumns);
            this.emitSortChanged(EmitterType.local);
        });
    }
    clearSorting(triggerQueryEvent = true) {
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
                const backendService = this._gridOptions && this._gridOptions.backendServiceApi && this._gridOptions.backendServiceApi.service;
                if (backendService && backendService.clearSorters) {
                    backendService.clearSorters();
                }
            }
        }
        // set current sorter to empty & emit a sort changed event
        this._currentLocalSorters = [];
        // emit an event when sorts are all cleared
        this.onSortCleared.next(true);
    }
    getCurrentLocalSorters() {
        return this._currentLocalSorters;
    }
    /**
     * Get column sorts,
     * If a column is passed as an argument, we won't add this column to our output array since it is already in the array
     * We want to know the sort prior to calling the next sorting command
     */
    getPreviousColumnSorts(columnId) {
        // getSortColumns() only returns sortAsc & columnId, we want the entire column definition
        const oldSortColumns = this._grid && this._grid.getSortColumns();
        // get the column definition but only keep column which are not equal to our current column
        if (Array.isArray(oldSortColumns)) {
            const sortedCols = oldSortColumns.reduce((cols, col) => {
                if (!columnId || col.columnId !== columnId) {
                    cols.push({ sortCol: this._columnDefinitions[this._grid.getColumnIndex(col.columnId)], sortAsc: col.sortAsc });
                }
                return cols;
            }, []);
            return sortedCols;
        }
        return [];
    }
    /**
     * load any presets if there are any
     * @param grid
     * @param dataView
     */
    loadLocalPresets(grid, dataView) {
        const sortCols = [];
        this._currentLocalSorters = []; // reset current local sorters
        if (this._gridOptions && this._gridOptions.presets && this._gridOptions.presets.sorters) {
            const sorters = this._gridOptions.presets.sorters;
            sorters.forEach((presetSorting) => {
                const gridColumn = this._columnDefinitions.find((col) => col.id === presetSorting.columnId);
                if (gridColumn) {
                    sortCols.push({
                        columnId: gridColumn.id,
                        sortAsc: ((presetSorting.direction.toUpperCase() === SortDirection.ASC) ? true : false),
                        sortCol: gridColumn
                    });
                    // keep current sorters
                    this._currentLocalSorters.push({
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
    }
    onLocalSortChanged(grid, dataView, sortColumns, forceReSort = false) {
        if (grid && dataView) {
            if (forceReSort) {
                dataView.reSort();
            }
            dataView.sort((dataRow1, dataRow2) => {
                for (let i = 0, l = sortColumns.length; i < l; i++) {
                    const columnSortObj = sortColumns[i];
                    if (columnSortObj && columnSortObj.sortCol) {
                        const sortDirection = columnSortObj.sortAsc ? SortDirectionNumber.asc : SortDirectionNumber.desc;
                        const sortField = columnSortObj.sortCol.queryField || columnSortObj.sortCol.queryFieldSorter || columnSortObj.sortCol.field;
                        const fieldType = columnSortObj.sortCol.type || FieldType.string;
                        let value1 = dataRow1[sortField];
                        let value2 = dataRow2[sortField];
                        // when item is a complex object (dot "." notation), we need to filter the value contained in the object tree
                        if (sortField && sortField.indexOf('.') >= 0) {
                            value1 = getDescendantProperty(dataRow1, sortField);
                            value2 = getDescendantProperty(dataRow2, sortField);
                        }
                        // user could provide his own custom Sorter
                        if (columnSortObj.sortCol && columnSortObj.sortCol.sorter) {
                            const customSortResult = columnSortObj.sortCol.sorter(value1, value2, sortDirection, columnSortObj.sortCol);
                            if (customSortResult !== SortDirectionNumber.neutral) {
                                return customSortResult;
                            }
                        }
                        const sortResult = sortByFieldType(value1, value2, fieldType, sortDirection, columnSortObj.sortCol);
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
    }
    dispose() {
        // unsubscribe local event
        if (this._slickSubscriber && typeof this._slickSubscriber.unsubscribe === 'function') {
            this._slickSubscriber.unsubscribe();
        }
        // unsubscribe all SlickGrid events
        this._eventHandler.unsubscribeAll();
    }
    /**
     * A simple function that is attached to the subscriber and emit a change when the sort is called.
     * Other services, like Pagination, can then subscribe to it.
     * @param sender
     */
    emitSortChanged(sender) {
        if (sender === EmitterType.remote && this._gridOptions && this._gridOptions.backendServiceApi) {
            let currentSorters = [];
            const backendService = this._gridOptions.backendServiceApi.service;
            if (backendService && backendService.getCurrentSorters) {
                currentSorters = backendService.getCurrentSorters();
            }
            this.onSortChanged.next(currentSorters);
        }
        else if (sender === EmitterType.local) {
            this.onSortChanged.next(this.getCurrentLocalSorters());
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9zZXJ2aWNlcy9zb3J0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUlMLFdBQVcsRUFDWCxTQUFTLEVBSVQsYUFBYSxFQUNiLG1CQUFtQixHQUVwQixNQUFNLG1CQUFtQixDQUFDO0FBQzNCLE9BQU8sRUFBRSwrQkFBK0IsRUFBRSxjQUFjLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN0RixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDcEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzdELE9BQU8sRUFBRSxZQUFZLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBSzdDLE1BQU0sT0FBTyxXQUFXO0lBQXhCO1FBQ1UseUJBQW9CLEdBQW9CLEVBQUUsQ0FBQztRQUMzQyxrQkFBYSxHQUFRLElBQUksS0FBSyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBSTlDLG1CQUFjLEdBQUcsS0FBSyxDQUFDO1FBQy9CLGtCQUFhLEdBQUcsSUFBSSxPQUFPLEVBQW1CLENBQUM7UUFDL0Msa0JBQWEsR0FBRyxJQUFJLE9BQU8sRUFBVyxDQUFDO0lBdVF6QyxDQUFDO0lBclFDLGlFQUFpRTtJQUNqRSxJQUFZLFlBQVk7UUFDdEIsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQzlFLENBQUM7SUFFRCx1RUFBdUU7SUFDdkUsSUFBWSxrQkFBa0I7UUFDNUIsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxD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TUFBTSxJQUFJLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsRUFBRTtZQUM3RixJQUFJLGNBQWMsR0FBb0IsRUFBRSxDQUFDO1lBQ3pDLE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDO1lBQ25FLElBQUksY0FBYyxJQUFJLGNBQWMsQ0FBQyxpQkFBaUIsRUFBRTtnQkFDdEQsY0FBYyxHQUFHLGNBQWMsQ0FBQyxpQkFBaUIsRUFBcUIsQ0FBQzthQUN4RTtZQUNELElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1NBQ3pDO2FBQU0sSUFBSSxNQUFNLEtBQUssV0FBVyxDQUFDLEtBQUssRUFBRTtZQUN2QyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQyxDQUFDO1NBQ3hEO0lBQ0gsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29sdW1uLFxuICBDb2x1bW5Tb3J0LFxuICBDdXJyZW50U29ydGVyLFxuICBFbWl0dGVyVHlwZSxcbiAgRmllbGRUeXBlLFxuICBHcmFwaHFsUmVzdWx0LFxuICBHcmlkT3B0aW9uLFxuICBTbGlja0V2ZW50LFxuICBTb3J0RGlyZWN0aW9uLFxuICBTb3J0RGlyZWN0aW9uTnVtYmVyLFxuICBTb3J0RGlyZWN0aW9uU3RyaW5nLFxufSBmcm9tICcuLy4uL21vZGVscy9pbmRleCc7XG5pbXBvcnQgeyBleGVjdXRlQmFja2VuZFByb2Nlc3Nlc0NhbGxiYWNrLCBvbkJhY2tlbmRFcnJvciB9IGZyb20gJy4vYmFja2VuZC11dGlsaXRpZXMnO1xuaW1wb3J0IHsgZ2V0RGVzY2VuZGFudFByb3BlcnR5IH0gZnJvbSAnLi91dGlsaXRpZXMnO1xuaW1wb3J0IHsgc29ydEJ5RmllbGRUeXBlIH0gZnJvbSAnLi4vc29ydGVycy9zb3J0ZXJVdGlsaXRpZXMnO1xuaW1wb3J0IHsgaXNPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbi8vIHVzaW5nIGV4dGVybmFsIG5vbi10eXBlZCBqcyBsaWJyYXJpZXNcbmRlY2xhcmUgdmFyIFNsaWNrOiBhbnk7XG5cbmV4cG9ydCBjbGFzcyBTb3J0U2VydmljZSB7XG4gIHByaXZhdGUgX2N1cnJlbnRMb2NhbFNvcnRlcnM6IEN1cnJlbnRTb3J0ZXJbXSA9IFtdO1xuICBwcml2YXRlIF9ldmVudEhhbmRsZXI6IGFueSA9IG5ldyBTbGljay5FdmVudEhhbmRsZXIoKTtcbiAgcHJpdmF0ZSBfZGF0YVZpZXc6IGFueTtcbiAgcHJpdmF0ZSBfZ3JpZDogYW55O1xuICBwcml2YXRlIF9zbGlja1N1YnNjcmliZXI6IFNsaWNrRXZlbnQ7XG4gIHByaXZhdGUgX2lzQmFja2VuZEdyaWQgPSBmYWxzZTtcbiAgb25Tb3J0Q2hhbmdlZCA9IG5ldyBTdWJqZWN0PEN1cnJlbnRTb3J0ZXJbXT4oKTtcbiAgb25Tb3J0Q2xlYXJlZCA9IG5ldyBTdWJqZWN0PGJvb2xlYW4+KCk7XG5cbiAgLyoqIEdldHRlciBmb3IgdGhlIEdyaWQgT3B0aW9ucyBwdWxsZWQgdGhyb3VnaCB0aGUgR3JpZCBPYmplY3QgKi9cbiAgcHJpdmF0ZSBnZXQgX2dyaWRPcHRpb25zKCk6IEdyaWRPcHRpb24ge1xuICAgIHJldHVybiAodGhpcy5fZ3JpZCAmJiB0aGlzLl9ncmlkLmdldE9wdGlvbnMpID8gdGhpcy5fZ3JpZC5nZXRPcHRpb25zKCkgOiB7fTtcbiAgfVxuXG4gIC8qKiBHZXR0ZXIgZm9yIHRoZSBDb2x1bW4gRGVmaW5pdGlvbnMgcHVsbGVkIHRocm91Z2ggdGhlIEdyaWQgT2JqZWN0ICovXG4gIHByaXZhdGUgZ2V0IF9jb2x1bW5EZWZpbml0aW9ucygpOiBDb2x1bW5bXSB7XG4gICAgcmV0dXJuICh0aGlzLl9ncmlkICYmIHRoaXMuX2dyaWQuZ2V0Q29sdW1ucykgPyB0aGlzLl9ncmlkLmdldENvbHVtbnMoKSA6IFtdO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaCBhIGJhY2tlbmQgc29ydCAoc2luZ2xlL211bHRpKSBob29rIHRvIHRoZSBncmlkXG4gICAqIEBwYXJhbSBncmlkIFNsaWNrR3JpZCBHcmlkIG9iamVjdFxuICAgKiBAcGFyYW0gZGF0YVZpZXcgU2xpY2tHcmlkIERhdGFWaWV3IG9iamVjdFxuICAgKi9cbiAgYXR0YWNoQmFja2VuZE9uU29ydChncmlkOiBhbnksIGRhdGFWaWV3OiBhbnkpIHtcbiAgICB0aGlzLl9pc0JhY2tlbmRHcmlkID0gdHJ1ZTtcbiAgICB0aGlzLl9ncmlkID0gZ3JpZDtcbiAgICB0aGlzLl9kYXRhVmlldyA9IGRhdGFWaWV3O1xuICAgIHRoaXMuX3NsaWNrU3Vic2NyaWJlciA9IGdyaWQub25Tb3J0O1xuXG4gICAgLy8gc3Vic2NyaWJlIHRvIHRoZSBTbGlja0dyaWQgZXZlbnQgYW5kIGNhbGwgdGhlIGJhY2tlbmQgZXhlY3V0aW9uXG4gICAgdGhpcy5fc2xpY2tTdWJzY3JpYmVyLnN1YnNjcmliZSh0aGlzLm9uQmFja2VuZFNvcnRDaGFuZ2VkLmJpbmQodGhpcykpO1xuICB9XG5cbiAgb25CYWNrZW5kU29ydENoYW5nZWQoZXZlbnQ6IEV2ZW50LCBhcmdzOiBhbnkpIHtcbiAgICBpZiAoIWFyZ3MgfHwgIWFyZ3MuZ3JpZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdTb21ldGhpbmcgd2VudCB3cm9uZyB3aGVuIHRyeWluZyB0byBhdHRhY2ggdGhlIFwib25CYWNrZW5kU29ydENoYW5nZWQoZXZlbnQsIGFyZ3MpXCIgZnVuY3Rpb24sIGl0IHNlZW1zIHRoYXQgXCJhcmdzXCIgaXMgbm90IHBvcHVsYXRlZCBjb3JyZWN0bHknKTtcbiAgICB9XG4gICAgY29uc3QgZ3JpZE9wdGlvbnM6IEdyaWRPcHRpb24gPSBhcmdzLmdyaWQuZ2V0T3B0aW9ucygpIHx8IHt9O1xuICAgIGNvbnN0IGJhY2tlbmRBcGkgPSBncmlkT3B0aW9ucy5iYWNrZW5kU2VydmljZUFwaTtcblxuICAgIGlmICghYmFja2VuZEFwaSB8fCAhYmFja2VuZEFwaS5wcm9jZXNzIHx8ICFiYWNrZW5kQXBpLnNlcnZpY2UpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQmFja2VuZFNlcnZpY2VBcGkgcmVxdWlyZXMgYXQgbGVhc3QgYSBcInByb2Nlc3NcIiBmdW5jdGlvbiBhbmQgYSBcInNlcnZpY2VcIiBkZWZpbmVkYCk7XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIC8vIGtlZXAgc3RhcnQgdGltZSAmIGVuZCB0aW1lc3RhbXBzICYgcmV0dXJuIGl0IGFmdGVyIHByb2Nlc3MgZXhlY3V0aW9uXG4gICAgICBjb25zdCBzdGFydFRpbWUgPSBuZXcgRGF0ZSgpO1xuXG4gICAgICBpZiAoYmFja2VuZEFwaS5wcmVQcm9jZXNzKSB7XG4gICAgICAgIGJhY2tlbmRBcGkucHJlUHJvY2VzcygpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBxdWVyeSA9IGJhY2tlbmRBcGkuc2VydmljZS5wcm9jZXNzT25Tb3J0Q2hhbmdlZChldmVudCwgYXJncyk7XG4gICAgICB0aGlzLmVtaXRTb3J0Q2hhbmdlZChFbWl0dGVyVHlwZS5yZW1vdGUpO1xuXG4gICAgICAvLyB0aGUgcHJvY2Vzc2VzIGNhbiBiZSBPYnNlcnZhYmxlcyAobGlrZSBIdHRwQ2xpZW50KSBvciBQcm9taXNlc1xuICAgICAgY29uc3QgcHJvY2VzcyA9IGJhY2tlbmRBcGkucHJvY2VzcyhxdWVyeSk7XG4gICAgICBpZiAocHJvY2VzcyBpbnN0YW5jZW9mIFByb21pc2UgJiYgcHJvY2Vzcy50aGVuKSB7XG4gICAgICAgIHByb2Nlc3MudGhlbigocHJvY2Vzc1Jlc3VsdDogR3JhcGhxbFJlc3VsdCB8IGFueSkgPT4gZXhlY3V0ZUJhY2tlbmRQcm9jZXNzZXNDYWxsYmFjayhzdGFydFRpbWUsIHByb2Nlc3NSZXN1bHQsIGJhY2tlbmRBcGksIHRoaXMuX2dyaWRPcHRpb25zKSk7XG4gICAgICB9IGVsc2UgaWYgKGlzT2JzZXJ2YWJsZShwcm9jZXNzKSkge1xuICAgICAgICBwcm9jZXNzLnN1YnNjcmliZShcbiAgICAgICAgICAocHJvY2Vzc1Jlc3VsdDogR3JhcGhxbFJlc3VsdCB8IGFueSkgPT4gZXhlY3V0ZUJhY2tlbmRQcm9jZXNzZXNDYWxsYmFjayhzdGFydFRpbWUsIHByb2Nlc3NSZXN1bHQsIGJhY2tlbmRBcGksIHRoaXMuX2dyaWRPcHRpb25zKSxcbiAgICAgICAgICAoZXJyb3I6IGFueSkgPT4gb25CYWNrZW5kRXJyb3IoZXJyb3IsIGJhY2tlbmRBcGkpXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIG9uQmFja2VuZEVycm9yKGVycm9yLCBiYWNrZW5kQXBpKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoIGEgbG9jYWwgc29ydCAoc2luZ2xlL211bHRpKSBob29rIHRvIHRoZSBncmlkXG4gICAqIEBwYXJhbSBncmlkIFNsaWNrR3JpZCBHcmlkIG9iamVjdFxuICAgKiBAcGFyYW0gZ3JpZE9wdGlvbnMgR3JpZCBPcHRpb25zIG9iamVjdFxuICAgKiBAcGFyYW0gZGF0YVZpZXdcbiAgICovXG4gIGF0dGFjaExvY2FsT25Tb3J0KGdyaWQ6IGFueSwgZGF0YVZpZXc6IGFueSkge1xuICAgIHRoaXMuX2lzQmFja2VuZEdyaWQgPSBmYWxzZTtcbiAgICB0aGlzLl9ncmlkID0gZ3JpZDtcbiAgICB0aGlzLl9kYXRhVmlldyA9IGRhdGFWaWV3O1xuICAgIHRoaXMuX3NsaWNrU3Vic2NyaWJlciA9IGdyaWQub25Tb3J0O1xuXG4gICAgdGhpcy5fc2xpY2tTdWJzY3JpYmVyLnN1YnNjcmliZSgoZTogYW55LCBhcmdzOiBhbnkpID0+IHtcbiAgICAgIC8vIG11bHRpU29ydCBhbmQgc2luZ2xlU29ydCBhcmUgbm90IGV4YWN0bHkgdGhlIHNhbWUsIGJ1dCB3ZSB3YW50IHRvIHN0cnVjdHVyZSBpdCB0aGUgc2FtZSBmb3IgdGhlIChmb3IgbG9vcCkgYWZ0ZXJcbiAgICAgIC8vIGFsc28gdG8gYXZvaWQgaGF2aW5nIHRvIHJld3JpdGUgdGhlIGZvciBsb29wIGluIHRoZSBzb3J0LCB3ZSB3aWxsIG1ha2UgdGhlIHNpbmdsZVNvcnQgYW4gYXJyYXkgb2YgMSBvYmplY3RcbiAgICAgIGNvbnN0IHNvcnRDb2x1bW5zID0gKGFyZ3MubXVsdGlDb2x1bW5Tb3J0KSA/IGFyZ3Muc29ydENvbHMgOiBuZXcgQXJyYXkoe3NvcnRBc2M6IGFyZ3Muc29ydEFzYywgc29ydENvbDogYXJncy5zb3J0Q29sfSk7XG5cbiAgICAgIC8vIGtlZXAgY3VycmVudCBzb3J0ZXJzXG4gICAgICB0aGlzLl9jdXJyZW50TG9jYWxTb3J0ZXJzID0gW107IC8vIHJlc2V0IGN1cnJlbnQgbG9jYWwgc29ydGVyc1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoc29ydENvbHVtbnMpKSB7XG4gICAgICAgIHNvcnRDb2x1bW5zLmZvckVhY2goKHNvcnRDb2x1bW46IHsgc29ydENvbDogQ29sdW1uLCBzb3J0QXNjOiBudW1iZXIgfSkgPT4ge1xuICAgICAgICAgIGlmIChzb3J0Q29sdW1uLnNvcnRDb2wpIHtcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRMb2NhbFNvcnRlcnMucHVzaCh7XG4gICAgICAgICAgICAgIGNvbHVtbklkOiBzb3J0Q29sdW1uLnNvcnRDb2wuaWQsXG4gICAgICAgICAgICAgIGRpcmVjdGlvbjogc29ydENvbHVtbi5zb3J0QXNjID8gU29ydERpcmVjdGlvbi5BU0MgOiBTb3J0RGlyZWN0aW9uLkRFU0NcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMub25Mb2NhbFNvcnRDaGFuZ2VkKGdyaWQsIGRhdGFWaWV3LCBzb3J0Q29sdW1ucyk7XG4gICAgICB0aGlzLmVtaXRTb3J0Q2hhbmdlZChFbWl0dGVyVHlwZS5sb2NhbCk7XG4gICAgfSk7XG4gIH1cblxuICBjbGVhclNvcnRpbmcodHJpZ2dlclF1ZXJ5RXZlbnQgPSB0cnVlKSB7XG4gICAgaWYgKHRoaXMuX2dyaWQgJiYgdGhpcy5fZ3JpZE9wdGlvbnMgJiYgdGhpcy5fZGF0YVZpZXcpIHtcbiAgICAgIC8vIHJlbW92ZSBhbnkgc29ydCBpY29ucyAodGhpcyBzZXRTb3J0Q29sdW1ucyBmdW5jdGlvbiBjYWxsIHJlYWxseSBkb2VzIG9ubHkgdGhhdClcbiAgICAgIHRoaXMuX2dyaWQuc2V0U29ydENvbHVtbnMoW10pO1xuXG4gICAgICAvLyB3ZSBhbHNvIG5lZWQgdG8gdHJpZ2dlciBhIHNvcnQgY2hhbmdlXG4gICAgICAvLyBmb3IgYSBiYWNrZW5kIGdyaWQsIHdlIHdpbGwgdHJpZ2dlciBhIGJhY2tlbmQgc29ydCBjaGFuZ2VkIHdpdGggYW4gZW1wdHkgc29ydCBjb2x1bW5zIGFycmF5XG4gICAgICAvLyBob3dldmVyIGZvciBhIGxvY2FsIGdyaWQsIHdlIG5lZWQgdG8gcGFzcyBhIHNvcnQgY29sdW1uIGFuZCBzbyB3ZSB3aWxsIHNvcnQgYnkgdGhlIDFzdCBjb2x1bW5cbiAgICAgIGlmICh0cmlnZ2VyUXVlcnlFdmVudCkge1xuICAgICAgICBpZiAodGhpcy5faXNCYWNrZW5kR3JpZCkge1xuICAgICAgICAgIHRoaXMub25CYWNrZW5kU29ydENoYW5nZWQodW5kZWZpbmVkLCB7IGdyaWQ6IHRoaXMuX2dyaWQsIHNvcnRDb2xzOiBbXSB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAodGhpcy5fY29sdW1uRGVmaW5pdGlvbnMgJiYgQXJyYXkuaXNBcnJheSh0aGlzLl9jb2x1bW5EZWZpbml0aW9ucykpIHtcbiAgICAgICAgICAgIHRoaXMub25Mb2NhbFNvcnRDaGFuZ2VkKHRoaXMuX2dyaWQsIHRoaXMuX2RhdGFWaWV3LCBuZXcgQXJyYXkoe3NvcnRBc2M6IHRydWUsIHNvcnRDb2w6IHRoaXMuX2NvbHVtbkRlZmluaXRpb25zWzBdIH0pKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodGhpcy5faXNCYWNrZW5kR3JpZCkge1xuICAgICAgICBjb25zdCBiYWNrZW5kU2VydmljZSA9IHRoaXMuX2dyaWRPcHRpb25zICYmIHRoaXMuX2dyaWRPcHRpb25zLmJhY2tlbmRTZXJ2aWNlQXBpICYmIHRoaXMuX2dyaWRPcHRpb25zLmJhY2tlbmRTZXJ2aWNlQXBpLnNlcnZpY2U7XG4gICAgICAgIGlmIChiYWNrZW5kU2VydmljZSAmJiBiYWNrZW5kU2VydmljZS5jbGVhclNvcnRlcnMpIHtcbiAgICAgICAgICBiYWNrZW5kU2VydmljZS5jbGVhclNvcnRlcnMoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIHNldCBjdXJyZW50IHNvcnRlciB0byBlbXB0eSAmIGVtaXQgYSBzb3J0IGNoYW5nZWQgZXZlbnRcbiAgICB0aGlzLl9jdXJyZW50TG9jYWxTb3J0ZXJzID0gW107XG5cbiAgICAvLyBlbWl0IGFuIGV2ZW50IHdoZW4gc29ydHMgYXJlIGFsbCBjbGVhcmVkXG4gICAgdGhpcy5vblNvcnRDbGVhcmVkLm5leHQodHJ1ZSk7XG4gIH1cblxuICBnZXRDdXJyZW50TG9jYWxTb3J0ZXJzKCk6IEN1cnJlbnRTb3J0ZXJbXSB7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRMb2NhbFNvcnRlcnM7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGNvbHVtbiBzb3J0cyxcbiAgICogSWYgYSBjb2x1bW4gaXMgcGFzc2VkIGFzIGFuIGFyZ3VtZW50LCB3ZSB3b24ndCBhZGQgdGhpcyBjb2x1bW4gdG8gb3VyIG91dHB1dCBhcnJheSBzaW5jZSBpdCBpcyBhbHJlYWR5IGluIHRoZSBhcnJheVxuICAgKiBXZSB3YW50IHRvIGtub3cgdGhlIHNvcnQgcHJpb3IgdG8gY2FsbGluZyB0aGUgbmV4dCBzb3J0aW5nIGNvbW1hbmRcbiAgICovXG4gIGdldFByZXZpb3VzQ29sdW1uU29ydHMoY29sdW1uSWQ/OiBzdHJpbmcpIHtcbiAgICAvLyBnZXRTb3J0Q29sdW1ucygpIG9ubHkgcmV0dXJucyBzb3J0QXNjICYgY29sdW1uSWQsIHdlIHdhbnQgdGhlIGVudGlyZSBjb2x1bW4gZGVmaW5pdGlvblxuICAgIGNvbnN0IG9sZFNvcnRDb2x1bW5zID0gdGhpcy5fZ3JpZCAmJiB0aGlzLl9ncmlkLmdldFNvcnRDb2x1bW5zKCk7XG5cbiAgICAvLyBnZXQgdGhlIGNvbHVtbiBkZWZpbml0aW9uIGJ1dCBvbmx5IGtlZXAgY29sdW1uIHdoaWNoIGFyZSBub3QgZXF1YWwgdG8gb3VyIGN1cnJlbnQgY29sdW1uXG4gICAgaWYgKEFycmF5LmlzQXJyYXkob2xkU29ydENvbHVtbnMpKSB7XG4gICAgICBjb25zdCBzb3J0ZWRDb2xzID0gb2xkU29ydENvbHVtbnMucmVkdWNlKChjb2xzLCBjb2wpID0+IHtcbiAgICAgICAgaWYgKCFjb2x1bW5JZCB8fCBjb2wuY29sdW1uSWQgIT09IGNvbHVtbklkKSB7XG4gICAgICAgICAgY29scy5wdXNoKHsgc29ydENvbDogdGhpcy5fY29sdW1uRGVmaW5pdGlvbnNbdGhpcy5fZ3JpZC5nZXRDb2x1bW5JbmRleChjb2wuY29sdW1uSWQpXSwgc29ydEFzYzogY29sLnNvcnRBc2MgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbHM7XG4gICAgICB9LCBbXSk7XG5cbiAgICAgIHJldHVybiBzb3J0ZWRDb2xzO1xuICAgIH1cbiAgICByZXR1cm4gW107XG4gIH1cblxuICAvKipcbiAgICogbG9hZCBhbnkgcHJlc2V0cyBpZiB0aGVyZSBhcmUgYW55XG4gICAqIEBwYXJhbSBncmlkXG4gICAqIEBwYXJhbSBkYXRhVmlld1xuICAgKi9cbiAgbG9hZExvY2FsUHJlc2V0cyhncmlkOiBhbnksIGRhdGFWaWV3OiBhbnkpIHtcbiAgICBjb25zdCBzb3J0Q29sczogQ29sdW1uU29ydFtdID0gW107XG4gICAgdGhpcy5fY3VycmVudExvY2FsU29ydGVycyA9IFtdOyAvLyByZXNldCBjdXJyZW50IGxvY2FsIHNvcnRlcnNcbiAgICBpZiAodGhpcy5fZ3JpZE9wdGlvbnMgJiYgdGhpcy5fZ3JpZE9wdGlvbnMucHJlc2V0cyAmJiB0aGlzLl9ncmlkT3B0aW9ucy5wcmVzZXRzLnNvcnRlcnMpIHtcbiAgICAgIGNvbnN0IHNvcnRlcnMgPSB0aGlzLl9ncmlkT3B0aW9ucy5wcmVzZXRzLnNvcnRlcnM7XG5cbiAgICAgIHNvcnRlcnMuZm9yRWFjaCgocHJlc2V0U29ydGluZzogQ3VycmVudFNvcnRlcikgPT4ge1xuICAgICAgICBjb25zdCBncmlkQ29sdW1uID0gdGhpcy5fY29sdW1uRGVmaW5pdGlvbnMuZmluZCgoY29sOiBDb2x1bW4pID0+IGNvbC5pZCA9PT0gcHJlc2V0U29ydGluZy5jb2x1bW5JZCk7XG4gICAgICAgIGlmIChncmlkQ29sdW1uKSB7XG4gICAgICAgICAgc29ydENvbHMucHVzaCh7XG4gICAgICAgICAgICBjb2x1bW5JZDogZ3JpZENvbHVtbi5pZCxcbiAgICAgICAgICAgIHNvcnRBc2M6ICgocHJlc2V0U29ydGluZy5kaXJlY3Rpb24udG9VcHBlckNhc2UoKSA9PT0gU29ydERpcmVjdGlvbi5BU0MpID8gdHJ1ZSA6IGZhbHNlKSxcbiAgICAgICAgICAgIHNvcnRDb2w6IGdyaWRDb2x1bW5cbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIC8vIGtlZXAgY3VycmVudCBzb3J0ZXJzXG4gICAgICAgICAgdGhpcy5fY3VycmVudExvY2FsU29ydGVycy5wdXNoKHtcbiAgICAgICAgICAgIGNvbHVtbklkOiBncmlkQ29sdW1uLmlkICsgJycsXG4gICAgICAgICAgICBkaXJlY3Rpb246IHByZXNldFNvcnRpbmcuZGlyZWN0aW9uLnRvVXBwZXJDYXNlKCkgYXMgU29ydERpcmVjdGlvblN0cmluZ1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgaWYgKHNvcnRDb2xzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy5vbkxvY2FsU29ydENoYW5nZWQoZ3JpZCwgZGF0YVZpZXcsIHNvcnRDb2xzKTtcbiAgICAgICAgZ3JpZC5zZXRTb3J0Q29sdW1ucyhzb3J0Q29scyk7IC8vIHVzZSB0aGlzIHRvIGFkZCBzb3J0IGljb24ocykgaW4gVUlcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBvbkxvY2FsU29ydENoYW5nZWQoZ3JpZDogYW55LCBkYXRhVmlldzogYW55LCBzb3J0Q29sdW1uczogQ29sdW1uU29ydFtdLCBmb3JjZVJlU29ydCA9IGZhbHNlKSB7XG4gICAgaWYgKGdyaWQgJiYgZGF0YVZpZXcpIHtcbiAgICAgIGlmIChmb3JjZVJlU29ydCkge1xuICAgICAgICBkYXRhVmlldy5yZVNvcnQoKTtcbiAgICAgIH1cblxuICAgICAgZGF0YVZpZXcuc29ydCgoZGF0YVJvdzE6IGFueSwgZGF0YVJvdzI6IGFueSkgPT4ge1xuICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IHNvcnRDb2x1bW5zLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgIGNvbnN0IGNvbHVtblNvcnRPYmogPSBzb3J0Q29sdW1uc1tpXTtcbiAgICAgICAgICBpZiAoY29sdW1uU29ydE9iaiAmJiBjb2x1bW5Tb3J0T2JqLnNvcnRDb2wpIHtcbiAgICAgICAgICAgIGNvbnN0IHNvcnREaXJlY3Rpb24gPSBjb2x1bW5Tb3J0T2JqLnNvcnRBc2MgPyBTb3J0RGlyZWN0aW9uTnVtYmVyLmFzYyA6IFNvcnREaXJlY3Rpb25OdW1iZXIuZGVzYztcbiAgICAgICAgICAgIGNvbnN0IHNvcnRGaWVsZCA9IGNvbHVtblNvcnRPYmouc29ydENvbC5xdWVyeUZpZWxkIHx8IGNvbHVtblNvcnRPYmouc29ydENvbC5xdWVyeUZpZWxkU29ydGVyIHx8IGNvbHVtblNvcnRPYmouc29ydENvbC5maWVsZDtcbiAgICAgICAgICAgIGNvbnN0IGZpZWxkVHlwZSA9IGNvbHVtblNvcnRPYmouc29ydENvbC50eXBlIHx8IEZpZWxkVHlwZS5zdHJpbmc7XG4gICAgICAgICAgICBsZXQgdmFsdWUxID0gZGF0YVJvdzFbc29ydEZpZWxkXTtcbiAgICAgICAgICAgIGxldCB2YWx1ZTIgPSBkYXRhUm93Mltzb3J0RmllbGRdO1xuXG4gICAgICAgICAgICAvLyB3aGVuIGl0ZW0gaXMgYSBjb21wbGV4IG9iamVjdCAoZG90IFwiLlwiIG5vdGF0aW9uKSwgd2UgbmVlZCB0byBmaWx0ZXIgdGhlIHZhbHVlIGNvbnRhaW5lZCBpbiB0aGUgb2JqZWN0IHRyZWVcbiAgICAgICAgICAgIGlmIChzb3J0RmllbGQgJiYgc29ydEZpZWxkLmluZGV4T2YoJy4nKSA+PSAwKSB7XG4gICAgICAgICAgICAgIHZhbHVlMSA9IGdldERlc2NlbmRhbnRQcm9wZXJ0eShkYXRhUm93MSwgc29ydEZpZWxkKTtcbiAgICAgICAgICAgICAgdmFsdWUyID0gZ2V0RGVzY2VuZGFudFByb3BlcnR5KGRhdGFSb3cyLCBzb3J0RmllbGQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyB1c2VyIGNvdWxkIHByb3ZpZGUgaGlzIG93biBjdXN0b20gU29ydGVyXG4gICAgICAgICAgICBpZiAoY29sdW1uU29ydE9iai5zb3J0Q29sICYmIGNvbHVtblNvcnRPYmouc29ydENvbC5zb3J0ZXIpIHtcbiAgICAgICAgICAgICAgY29uc3QgY3VzdG9tU29ydFJlc3VsdCA9IGNvbHVtblNvcnRPYmouc29ydENvbC5zb3J0ZXIodmFsdWUxLCB2YWx1ZTIsIHNvcnREaXJlY3Rpb24sIGNvbHVtblNvcnRPYmouc29ydENvbCk7XG4gICAgICAgICAgICAgIGlmIChjdXN0b21Tb3J0UmVzdWx0ICE9PSBTb3J0RGlyZWN0aW9uTnVtYmVyLm5ldXRyYWwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY3VzdG9tU29ydFJlc3VsdDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBzb3J0UmVzdWx0ID0gc29ydEJ5RmllbGRUeXBlKHZhbHVlMSwgdmFsdWUyLCBmaWVsZFR5cGUsIHNvcnREaXJlY3Rpb24sIGNvbHVtblNvcnRPYmouc29ydENvbCk7XG4gICAgICAgICAgICBpZiAoc29ydFJlc3VsdCAhPT0gU29ydERpcmVjdGlvbk51bWJlci5uZXV0cmFsKSB7XG4gICAgICAgICAgICAgIHJldHVybiBzb3J0UmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gU29ydERpcmVjdGlvbk51bWJlci5uZXV0cmFsO1xuICAgICAgfSk7XG5cbiAgICAgIGdyaWQuaW52YWxpZGF0ZSgpO1xuICAgICAgZ3JpZC5yZW5kZXIoKTtcbiAgICB9XG4gIH1cblxuICBkaXNwb3NlKCkge1xuICAgIC8vIHVuc3Vic2NyaWJlIGxvY2FsIGV2ZW50XG4gICAgaWYgKHRoaXMuX3NsaWNrU3Vic2NyaWJlciAmJiB0eXBlb2YgdGhpcy5fc2xpY2tTdWJzY3JpYmVyLnVuc3Vic2NyaWJlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aGlzLl9zbGlja1N1YnNjcmliZXIudW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICAvLyB1bnN1YnNjcmliZSBhbGwgU2xpY2tHcmlkIGV2ZW50c1xuICAgIHRoaXMuX2V2ZW50SGFuZGxlci51bnN1YnNjcmliZUFsbCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEEgc2ltcGxlIGZ1bmN0aW9uIHRoYXQgaXMgYXR0YWNoZWQgdG8gdGhlIHN1YnNjcmliZXIgYW5kIGVtaXQgYSBjaGFuZ2Ugd2hlbiB0aGUgc29ydCBpcyBjYWxsZWQuXG4gICAqIE90aGVyIHNlcnZpY2VzLCBsaWtlIFBhZ2luYXRpb24sIGNhbiB0aGVuIHN1YnNjcmliZSB0byBpdC5cbiAgICogQHBhcmFtIHNlbmRlclxuICAgKi9cbiAgZW1pdFNvcnRDaGFuZ2VkKHNlbmRlcjogRW1pdHRlclR5cGUpIHtcbiAgICBpZiAoc2VuZGVyID09PSBFbWl0dGVyVHlwZS5yZW1vdGUgJiYgdGhpcy5fZ3JpZE9wdGlvbnMgJiYgdGhpcy5fZ3JpZE9wdGlvbnMuYmFja2VuZFNlcnZpY2VBcGkpIHtcbiAgICAgIGxldCBjdXJyZW50U29ydGVyczogQ3VycmVudFNvcnRlcltdID0gW107XG4gICAgICBjb25zdCBiYWNrZW5kU2VydmljZSA9IHRoaXMuX2dyaWRPcHRpb25zLmJhY2tlbmRTZXJ2aWNlQXBpLnNlcnZpY2U7XG4gICAgICBpZiAoYmFja2VuZFNlcnZpY2UgJiYgYmFja2VuZFNlcnZpY2UuZ2V0Q3VycmVudFNvcnRlcnMpIHtcbiAgICAgICAgY3VycmVudFNvcnRlcnMgPSBiYWNrZW5kU2VydmljZS5nZXRDdXJyZW50U29ydGVycygpIGFzIEN1cnJlbnRTb3J0ZXJbXTtcbiAgICAgIH1cbiAgICAgIHRoaXMub25Tb3J0Q2hhbmdlZC5uZXh0KGN1cnJlbnRTb3J0ZXJzKTtcbiAgICB9IGVsc2UgaWYgKHNlbmRlciA9PT0gRW1pdHRlclR5cGUubG9jYWwpIHtcbiAgICAgIHRoaXMub25Tb3J0Q2hhbmdlZC5uZXh0KHRoaXMuZ2V0Q3VycmVudExvY2FsU29ydGVycygpKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==