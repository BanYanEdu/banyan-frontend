import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { EmitterType, FieldType, KeyCode, OperatorType, } from './../models/index';
import { executeBackendProcessesCallback, onBackendError } from './backend-utilities';
import { getDescendantProperty } from './utilities';
import { FilterConditions } from './../filter-conditions';
import { FilterFactory } from '../filters/filterFactory';
import { isObservable, Subject } from 'rxjs';
import * as isequal_ from 'lodash.isequal';
const isequal = isequal_; // patch to fix rollup to work
// timer for keeping track of user typing waits
let timer;
const DEFAULT_FILTER_TYPING_DEBOUNCE = 500;
let FilterService = class FilterService {
    constructor(filterFactory) {
        this.filterFactory = filterFactory;
        this._eventHandler = new Slick.EventHandler();
        this._isFilterFirstRender = true;
        this._firstColumnIdRendered = '';
        this._filters = [];
        this._columnFilters = {};
        this.onFilterChanged = new Subject();
        this.onFilterCleared = new Subject();
    }
    /** Getter for the Grid Options pulled through the Grid Object */
    get _gridOptions() {
        return (this._grid && this._grid.getOptions) ? this._grid.getOptions() : {};
    }
    /** Getter for the Column Definitions pulled through the Grid Object */
    get _columnDefinitions() {
        return (this._grid && this._grid.getColumns) ? this._grid.getColumns() : [];
    }
    init(grid) {
        this._grid = grid;
    }
    /**
     * Attach a backend filter hook to the grid
     * @param grid SlickGrid Grid object
     */
    attachBackendOnFilter(grid, dataView) {
        this._dataView = dataView;
        this._filters = [];
        this._slickSubscriber = new Slick.Event();
        // subscribe to the SlickGrid event and call the backend execution
        this._slickSubscriber.subscribe(this.onBackendFilterChange.bind(this));
        // subscribe to SlickGrid onHeaderRowCellRendered event to create filter template
        this._eventHandler.subscribe(grid.onHeaderRowCellRendered, (e, args) => {
            // firstColumnIdRendered is null at first, so if it changes to being filled and equal then we know it was already rendered
            if (args.column.id === this._firstColumnIdRendered) {
                this._isFilterFirstRender = false;
            }
            this.addFilterTemplateToHeaderRow(args, this._isFilterFirstRender);
            if (this._firstColumnIdRendered === '') {
                this._firstColumnIdRendered = args.column.id;
            }
        });
    }
    onBackendFilterChange(event, args) {
        if (!args || !args.grid) {
            throw new Error('Something went wrong when trying to attach the "attachBackendOnFilterSubscribe(event, args)" function, it seems that "args" is not populated correctly');
        }
        const backendApi = this._gridOptions.backendServiceApi;
        if (!backendApi || !backendApi.process || !backendApi.service) {
            throw new Error(`BackendServiceApi requires at least a "process" function and a "service" defined`);
        }
        try {
            // keep start time & end timestamps & return it after process execution
            const startTime = new Date();
            // run a preProcess callback if defined
            if (backendApi.preProcess) {
                backendApi.preProcess();
            }
            // only add a delay when user is typing, on select dropdown filter (or "Clear Filter") it will execute right away
            let debounceTypingDelay = 0;
            const isTriggeredByClearFilter = args && args.clearFilterTriggered; // was it trigger by a "Clear Filter" command?
            if (!isTriggeredByClearFilter && event && event.keyCode !== KeyCode.ENTER && (event.type === 'input' || event.type === 'keyup' || event.type === 'keydown')) {
                debounceTypingDelay = backendApi.filterTypingDebounce || DEFAULT_FILTER_TYPING_DEBOUNCE;
            }
            // query backend, except when it's called by a ClearFilters then we won't
            if (args && args.shouldTriggerQuery) {
                // call the service to get a query back
                if (debounceTypingDelay > 0) {
                    clearTimeout(timer);
                    timer = setTimeout(() => this.executeBackendCallback(event, args, startTime, backendApi), debounceTypingDelay);
                }
                else {
                    this.executeBackendCallback(event, args, startTime, backendApi);
                }
            }
        }
        catch (error) {
            onBackendError(error, backendApi);
        }
    }
    executeBackendCallback(event, args, startTime, backendApi) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield backendApi.service.processOnFilterChanged(event, args);
            // emit an onFilterChanged event when it's not called by a clear filter
            if (args && !args.clearFilterTriggered) {
                this.emitFilterChanged(EmitterType.remote);
            }
            // the processes can be Observables (like HttpClient) or Promises
            const process = backendApi.process(query);
            if (process instanceof Promise && process.then) {
                process.then((processResult) => executeBackendProcessesCallback(startTime, processResult, backendApi, this._gridOptions));
            }
            else if (isObservable(process)) {
                process.subscribe((processResult) => executeBackendProcessesCallback(startTime, processResult, backendApi, this._gridOptions), (error) => onBackendError(error, backendApi));
            }
        });
    }
    /**
     * Attach a local filter hook to the grid
     * @param grid SlickGrid Grid object
     * @param dataView
     */
    attachLocalOnFilter(grid, dataView) {
        this._filters = [];
        this._dataView = dataView;
        this._slickSubscriber = new Slick.Event();
        dataView.setFilterArgs({ columnFilters: this._columnFilters, grid: this._grid });
        dataView.setFilter(this.customLocalFilter.bind(this, dataView));
        this._slickSubscriber.subscribe((e, args) => {
            const columnId = args.columnId;
            if (columnId != null) {
                dataView.refresh();
            }
            // emit an onFilterChanged event when it's not called by a clear filter
            if (args && !args.clearFilterTriggered) {
                this.emitFilterChanged(EmitterType.local);
            }
        });
        // subscribe to SlickGrid onHeaderRowCellRendered event to create filter template
        this._eventHandler.subscribe(grid.onHeaderRowCellRendered, (e, args) => {
            this.addFilterTemplateToHeaderRow(args);
        });
    }
    clearFilterByColumnId(event, columnId) {
        const colFilter = this._filters.find((filter) => filter.columnDef.id === columnId);
        if (colFilter && colFilter.clear) {
            colFilter.clear(true);
        }
        // we need to loop through all columnFilters and delete the filter found
        // only trying to clear columnFilter (without looping through) would not trigger a dataset change
        for (const colId in this._columnFilters) {
            if (colId === columnId && this._columnFilters[colId]) {
                delete this._columnFilters[colId];
            }
        }
        let emitter = EmitterType.local;
        const isBackendApi = this._gridOptions && this._gridOptions.backendServiceApi || false;
        // when using a backend service, we need to manually trigger a filter change
        if (isBackendApi) {
            emitter = EmitterType.remote;
            this.onBackendFilterChange(event, { grid: this._grid, columnFilters: this._columnFilters });
        }
        // emit an event when filter is cleared
        this.emitFilterChanged(emitter);
    }
    /** Clear the search filters (below the column titles) */
    clearFilters() {
        this._filters.forEach((filter) => {
            if (filter && filter.clear) {
                // clear element and trigger a change
                filter.clear(false);
            }
        });
        // we need to loop through all columnFilters and delete them 1 by 1
        // only trying to clear columnFilter (without looping through) would not trigger a dataset change
        for (const columnId in this._columnFilters) {
            if (columnId && this._columnFilters[columnId]) {
                delete this._columnFilters[columnId];
            }
        }
        // we also need to refresh the dataView and optionally the grid (it's optional since we use DataView)
        if (this._dataView && this._grid) {
            this._dataView.refresh();
            this._grid.invalidate();
        }
        // when using backend service, we need to query only once so it's better to do it here
        if (this._gridOptions && this._gridOptions.backendServiceApi) {
            const callbackArgs = { clearFilterTriggered: true, shouldTriggerQuery: true, grid: this._grid, columnFilters: this._columnFilters };
            this.executeBackendCallback(undefined, callbackArgs, new Date(), this._gridOptions.backendServiceApi);
        }
        // emit an event when filters are all cleared
        this.onFilterCleared.next(true);
    }
    customLocalFilter(dataView, item, args) {
        for (const columnId of Object.keys(args.columnFilters)) {
            const columnFilter = args.columnFilters[columnId];
            const columnIndex = args.grid.getColumnIndex(columnId);
            const columnDef = args.grid.getColumns()[columnIndex];
            if (!columnDef) {
                return false;
            }
            // Row Detail View plugin, if the row is padding we just get the value we're filtering on from it's parent
            if (this._gridOptions.enableRowDetailView) {
                const metadataPrefix = this._gridOptions.rowDetailView && this._gridOptions.rowDetailView.keyPrefix || '__';
                if (item[`${metadataPrefix}isPadding`] && item[`${metadataPrefix}parent`]) {
                    item = item[`${metadataPrefix}parent`];
                }
            }
            const dataKey = columnDef.dataKey;
            const fieldName = columnDef.queryField || columnDef.queryFieldFilter || columnDef.field;
            const fieldType = columnDef.type || FieldType.string;
            const filterSearchType = (columnDef.filterSearchType) ? columnDef.filterSearchType : null;
            let cellValue = item[fieldName];
            // when item is a complex object (dot "." notation), we need to filter the value contained in the object tree
            if (fieldName.indexOf('.') >= 0) {
                cellValue = getDescendantProperty(item, fieldName);
            }
            // if we find searchTerms use them but make a deep copy so that we don't affect original array
            // we might have to overwrite the value(s) locally that are returned
            // e.g: we don't want to operator within the search value, since it will fail filter condition check trigger afterward
            const searchValues = (columnFilter && columnFilter.searchTerms) ? $.extend(true, [], columnFilter.searchTerms) : null;
            let fieldSearchValue = (Array.isArray(searchValues) && searchValues.length === 1) ? searchValues[0] : '';
            let matches = null;
            if (fieldType !== FieldType.object) {
                fieldSearchValue = '' + fieldSearchValue; // make sure it's a string
                matches = fieldSearchValue.match(/^([<>!=\*]{0,2})(.*[^<>!=\*])([\*]?)$/); // group 1: Operator, 2: searchValue, 3: last char is '*' (meaning starts with, ex.: abc*)
            }
            let operator = columnFilter.operator || ((matches) ? matches[1] : '');
            const searchTerm = (!!matches) ? matches[2] : '';
            const lastValueChar = (!!matches) ? matches[3] : (operator === '*z' ? '*' : '');
            if (searchValues && searchValues.length > 1) {
                fieldSearchValue = searchValues.join(',');
            }
            else if (typeof fieldSearchValue === 'string') {
                // escaping the search value
                fieldSearchValue = fieldSearchValue.replace(`'`, `''`); // escape single quotes by doubling them
                if (operator === '*' || operator === 'a*' || operator === '*z' || lastValueChar === '*') {
                    operator = (operator === '*' || operator === '*z') ? OperatorType.endsWith : OperatorType.startsWith;
                }
            }
            // no need to query if search value is empty
            if (searchTerm === '' && (!searchValues || (Array.isArray(searchValues) && searchValues.length === 0))) {
                return true;
            }
            // if search value has a regex match we will only keep the value without the operator
            // in this case we need to overwrite the returned search values to truncate operator from the string search
            if (Array.isArray(matches) && matches.length >= 1 && (Array.isArray(searchValues) && searchValues.length === 1)) {
                searchValues[0] = searchTerm;
            }
            // filter search terms should always be string type (even though we permit the end user to input numbers)
            // so make sure each term are strings, if user has some default search terms, we will cast them to string
            if (searchValues && Array.isArray(searchValues) && fieldType !== FieldType.object) {
                for (let k = 0, ln = searchValues.length; k < ln; k++) {
                    // make sure all search terms are strings
                    searchValues[k] = ((searchValues[k] === undefined || searchValues[k] === null) ? '' : searchValues[k]) + '';
                }
            }
            // when using localization (i18n), we should use the formatter output to search as the new cell value
            if (columnDef && columnDef.params && columnDef.params.useFormatterOuputToFilter) {
                const rowIndex = (dataView && typeof dataView.getIdxById === 'function') ? dataView.getIdxById(item.id) : 0;
                cellValue = columnDef.formatter(rowIndex, columnIndex, cellValue, columnDef, item, this._grid);
            }
            // make sure cell value is always a string
            if (typeof cellValue === 'number') {
                cellValue = cellValue.toString();
            }
            const conditionOptions = {
                dataKey,
                fieldType,
                searchTerms: searchValues,
                cellValue,
                operator,
                cellValueLastChar: lastValueChar,
                filterSearchType
            };
            if (!FilterConditions.executeMappedCondition(conditionOptions)) {
                return false;
            }
        }
        return true;
    }
    dispose() {
        this.disposeColumnFilters();
        // unsubscribe all SlickGrid events
        this._eventHandler.unsubscribeAll();
        // unsubscribe local event
        if (this._slickSubscriber && typeof this._slickSubscriber.unsubscribe === 'function') {
            this._slickSubscriber.unsubscribe();
        }
    }
    /**
     * Dispose of the filters, since it's a singleton, we don't want to affect other grids with same columns
     */
    disposeColumnFilters() {
        // we need to loop through all columnFilters and delete them 1 by 1
        // only trying to make columnFilter an empty (without looping) would not trigger a dataset change
        for (const columnId in this._columnFilters) {
            if (columnId && this._columnFilters[columnId]) {
                delete this._columnFilters[columnId];
            }
        }
        // also destroy each Filter instances
        this._filters.forEach((filter, index) => {
            if (filter && filter.destroy) {
                filter.destroy(true);
            }
        });
    }
    getColumnFilters() {
        return this._columnFilters;
    }
    getCurrentLocalFilters() {
        const currentFilters = [];
        if (this._columnFilters) {
            for (const colId of Object.keys(this._columnFilters)) {
                const columnFilter = this._columnFilters[colId];
                const filter = { columnId: colId || '' };
                if (columnFilter && columnFilter.searchTerms) {
                    filter.searchTerms = columnFilter.searchTerms;
                }
                if (columnFilter.operator) {
                    filter.operator = columnFilter.operator;
                }
                if (Array.isArray(filter.searchTerms) && filter.searchTerms.length > 0 && filter.searchTerms[0] !== '') {
                    currentFilters.push(filter);
                }
            }
        }
        return currentFilters;
    }
    callbackSearchEvent(e, args) {
        if (args) {
            const searchTerm = ((e && e.target) ? e.target.value : undefined);
            const searchTerms = (args.searchTerms && Array.isArray(args.searchTerms)) ? args.searchTerms : (searchTerm ? [searchTerm] : undefined);
            const columnDef = args.columnDef || null;
            const columnId = columnDef ? (columnDef.id || '') : '';
            const operator = args.operator || undefined;
            const hasSearchTerms = searchTerms && Array.isArray(searchTerms);
            const termsCount = hasSearchTerms && searchTerms.length;
            const oldColumnFilters = Object.assign({}, this._columnFilters);
            if (!hasSearchTerms || termsCount === 0 || (termsCount === 1 && searchTerms[0] === '')) {
                // delete the property from the columnFilters when it becomes empty
                // without doing this, it would leave an incorrect state of the previous column filters when filtering on another column
                delete this._columnFilters[columnId];
            }
            else {
                const colId = '' + columnId;
                const colFilter = {
                    columnId: colId,
                    columnDef,
                    searchTerms,
                };
                if (operator) {
                    colFilter.operator = operator;
                }
                this._columnFilters[colId] = colFilter;
            }
            // trigger an event only if Filters changed or if ENTER key was pressed
            const eventKeyCode = e && e.keyCode;
            if (eventKeyCode === KeyCode.ENTER || !isequal(oldColumnFilters, this._columnFilters)) {
                this.triggerEvent(this._slickSubscriber, {
                    clearFilterTriggered: args.clearFilterTriggered,
                    shouldTriggerQuery: args.shouldTriggerQuery,
                    columnId,
                    columnDef: args.columnDef || null,
                    columnFilters: this._columnFilters,
                    operator,
                    searchTerms,
                    serviceOptions: this._onFilterChangedOptions,
                    grid: this._grid
                }, e);
            }
        }
    }
    addFilterTemplateToHeaderRow(args, isFilterFirstRender = true) {
        const columnDef = args.column;
        const columnId = columnDef.id || '';
        if (columnDef && columnId !== 'selector' && columnDef.filterable) {
            let searchTerms;
            let operator;
            const filter = this.filterFactory.createFilter(args.column.filter);
            operator = (columnDef && columnDef.filter && columnDef.filter.operator) || (filter && filter.operator) || undefined;
            if (this._columnFilters[columnDef.id]) {
                searchTerms = this._columnFilters[columnDef.id].searchTerms || undefined;
                operator = this._columnFilters[columnDef.id].operator || undefined;
            }
            else if (columnDef.filter) {
                // when hiding/showing (with Column Picker or Grid Menu), it will try to re-create yet again the filters (since SlickGrid does a re-render)
                // because of that we need to first get searchTerm(s) from the columnFilters (that is what the user last entered)
                searchTerms = columnDef.filter.searchTerms || undefined;
                this.updateColumnFilters(searchTerms, columnDef, operator);
            }
            const filterArguments = {
                grid: this._grid,
                operator,
                searchTerms,
                columnDef,
                callback: this.callbackSearchEvent.bind(this)
            };
            if (filter) {
                filter.init(filterArguments, isFilterFirstRender);
                const filterExistIndex = this._filters.findIndex((filt) => filter.columnDef.name === filt.columnDef.name);
                // add to the filters arrays or replace it when found
                if (filterExistIndex === -1) {
                    this._filters.push(filter);
                }
                else {
                    this._filters[filterExistIndex] = filter;
                }
                // when hiding/showing (with Column Picker or Grid Menu), it will try to re-create yet again the filters (since SlickGrid does a re-render)
                // we need to also set again the values in the DOM elements if the values were set by a searchTerm(s)
                if (searchTerms && filter.setValues) {
                    filter.setValues(searchTerms);
                }
            }
        }
    }
    /**
     * A simple function that is attached to the subscriber and emit a change when the filter is called.
     * Other services, like Pagination, can then subscribe to it.
     * @param caller
     */
    emitFilterChanged(caller) {
        if (caller === EmitterType.remote && this._gridOptions && this._gridOptions.backendServiceApi) {
            let currentFilters = [];
            const backendService = this._gridOptions.backendServiceApi.service;
            if (backendService && backendService.getCurrentFilters) {
                currentFilters = backendService.getCurrentFilters();
            }
            this.onFilterChanged.next(currentFilters);
        }
        else if (caller === EmitterType.local) {
            this.onFilterChanged.next(this.getCurrentLocalFilters());
        }
    }
    /**
     * When user passes an array of preset filters, we need to pre-populate each column filter searchTerm(s)
     * The process is to loop through the preset filters array, find the associated column from columnDefinitions and fill in the filter object searchTerm(s)
     * This is basically the same as if we would manually add searchTerm(s) to a column filter object in the column definition, but we do it programmatically.
     * At the end of the day, when creating the Filter (DOM Element), it will use these searchTerm(s) so we can take advantage of that without recoding each Filter type (DOM element)
     */
    populateColumnFilterSearchTerms() {
        if (this._gridOptions.presets && Array.isArray(this._gridOptions.presets.filters) && this._gridOptions.presets.filters.length > 0) {
            const filters = this._gridOptions.presets.filters;
            this._columnDefinitions.forEach((columnDef) => {
                // clear any columnDef searchTerms before applying Presets
                if (columnDef.filter && columnDef.filter.searchTerms) {
                    delete columnDef.filter.searchTerms;
                }
                // from each presets, we will find the associated columnDef and apply the preset searchTerms & operator if there is
                const columnPreset = filters.find((presetFilter) => {
                    return presetFilter.columnId === columnDef.id;
                });
                if (columnPreset && columnPreset.searchTerms && Array.isArray(columnPreset.searchTerms)) {
                    columnDef.filter = columnDef.filter || {};
                    columnDef.filter.operator = columnPreset.operator || columnDef.filter.operator || '';
                    columnDef.filter.searchTerms = columnPreset.searchTerms;
                }
            });
        }
    }
    updateColumnFilters(searchTerms, columnDef, operator) {
        if (searchTerms && columnDef) {
            // this._columnFilters.searchTerms = searchTerms;
            this._columnFilters[columnDef.id] = {
                columnId: columnDef.id,
                columnDef,
                searchTerms,
                operator
            };
        }
    }
    triggerEvent(slickEvent, args, e) {
        slickEvent = slickEvent || new Slick.Event();
        // event might have been created as a CustomEvent (e.g. CompoundDateFilter), without being a valid Slick.EventData.
        // if so we will create a new Slick.EventData and merge it with that CustomEvent to avoid having SlickGrid errors
        let event = e;
        if (e && typeof e.isPropagationStopped !== 'function') {
            event = $.extend({}, new Slick.EventData(), e);
        }
        slickEvent.notify(args, event, args.grid);
    }
};
FilterService = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [FilterFactory])
], FilterService);
export { FilterService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL3NlcnZpY2VzL2ZpbHRlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFLTCxXQUFXLEVBSVgsU0FBUyxFQUdULE9BQU8sRUFDUCxZQUFZLEdBS2IsTUFBTSxtQkFBbUIsQ0FBQztBQUMzQixPQUFPLEVBQUUsK0JBQStCLEVBQUUsY0FBYyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdEYsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3BELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzFELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM3QyxPQUFPLEtBQUssUUFBUSxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxDQUFDLDhCQUE4QjtBQU14RCwrQ0FBK0M7QUFDL0MsSUFBSSxLQUFVLENBQUM7QUFDZixNQUFNLDhCQUE4QixHQUFHLEdBQUcsQ0FBQztBQUczQyxJQUFhLGFBQWEsR0FBMUIsTUFBYSxhQUFhO0lBYXhCLFlBQW9CLGFBQTRCO1FBQTVCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBWnhDLGtCQUFhLEdBQUcsSUFBSSxLQUFLLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDekMseUJBQW9CLEdBQUcsSUFBSSxDQUFDO1FBQzVCLDJCQUFzQixHQUFHLEVBQUUsQ0FBQztRQUU1QixhQUFRLEdBQVUsRUFBRSxDQUFDO1FBQ3JCLG1CQUFjLEdBQWtCLEVBQUUsQ0FBQztRQUkzQyxvQkFBZSxHQUFHLElBQUksT0FBTyxFQUFtQixDQUFDO1FBQ2pELG9CQUFlLEdBQUcsSUFBSSxPQUFPLEVBQVcsQ0FBQztJQUVXLENBQUM7SUFFckQsaUVBQWlFO0lBQ2pFLElBQVksWUFBWTtRQUN0QixPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDOUUsQ0FBQztJQUVELHVFQUF1RTtJQUN2RSxJQUFZLGtCQUFrQjtRQUM1QixPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDOUUsQ0FBQztJQUVELElBQUksQ0FBQyxJQUFTO1FBQ1osSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7SUFDcEIsQ0FBQztJQUVEOzs7T0FHRztJQUNILHFCQUFxQixDQUFDLElBQVMsRUFBRSxRQUFhO1FBQzVDLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1FBQzFCLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUUxQyxrRUFBa0U7UUFDbEUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFFdkUsaUZBQWlGO1FBQ2pGLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDLENBQWdCLEVBQUUsSUFBUyxFQUFFLEVBQUU7WUFDekYsMEhBQTBIO1lBQzFILElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEtBQUssSUFBSSxDQUFDLHNCQUFzQixFQUFFO2dCQUNsRCxJQUFJLENBQUMsb0JBQW9CLEdBQUcsS0FBSyxDQUFDO2FBQ25DO1lBQ0QsSUFBSSxDQUFDLDRCQUE0QixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztZQUNuRSxJQUFJLElBQUksQ0FBQyxzQkFBc0IsS0FBSyxFQUFFLEVBQUU7Z0JBQ3RDLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQzthQUM5QztRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELHFCQUFxQixDQUFDLEtBQW9CLEVBQUUsSUFBUztRQUNuRCxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtZQUN2QixNQUFNLElBQUksS0FBSyxDQUFDLHdKQUF3SixDQUFDLENBQUM7U0FDM0s7UUFDRCxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGlCQUFpQixDQUFDO1FBQ3ZELElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRTtZQUM3RCxNQUFNLElBQUksS0FBSyxDQUFDLGtGQUFrRixDQUFDLENBQUM7U0FDckc7UUFDRCxJQUFJO1lBQ0YsdUVBQXVFO1lBQ3ZFLE1BQU0sU0FBUyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7WUFFN0IsdUNBQXVDO1lBQ3ZDLElBQUksVUFBVSxDQUFDLFVBQVUsRUFBRTtnQkFDekIsVUFBVSxDQUFDLFVBQVUsRUFBRSxDQUFDO2FBQ3pCO1lBRUQsaUhBQWlIO1lBQ2pILElBQUksbUJBQW1CLEdBQUcsQ0FBQyxDQUFDO1lBQzVCLE1BQU0sd0JBQXdCLEdBQUcsSUFBSSxJQUFJLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLDhDQUE4QztZQUVsSCxJQUFJLENBQUMsd0JBQXdCLElBQUksS0FBSyxJQUFJLEtBQUssQ0FBQyxPQUFPLEtBQUssT0FBTyxDQUFDLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssT0FBTyxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssT0FBTyxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssU0FBUyxDQUFDLEVBQUU7Z0JBQzNKLG1CQUFtQixHQUFHLFVBQVUsQ0FBQyxvQkFBb0IsSUFBSSw4QkFBOEIsQ0FBQzthQUN6RjtZQUVELHlFQUF5RTtZQUN6RSxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsa0JBQWtCLEVBQUU7Z0JBQ25DLHVDQUF1QztnQkFDdkMsSUFBSSxtQkFBbUIsR0FBRyxDQUFDLEVBQUU7b0JBQzNCLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDcEIsS0FBSyxHQUFHLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsVUFBVSxDQUFDLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztpQkFDaEg7cUJBQU07b0JBQ0wsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDO2lCQUNqRTthQUNGO1NBQ0Y7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLGNBQWMsQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLENBQUM7U0FDbkM7SUFDSCxDQUFDO0lBRUssc0JBQXNCLENBQUMsS0FBb0IsRUFBRSxJQUFTLEVBQUUsU0FBZSxFQUFFLFVBQTZCOztZQUMxRyxNQUFNLEtBQUssR0FBRyxNQUFNLFVBQVUsQ0FBQyxPQUFPLENBQUMsc0JBQXNCLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBRTNFLHVFQUF1RTtZQUN2RSxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRTtnQkFDdEMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUM1QztZQUVELGlFQUFpRTtZQUNqRSxNQUFNLE9BQU8sR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzFDLElBQUksT0FBTyxZQUFZLE9BQU8sSUFBSSxPQUFPLENBQUMsSUFBSSxFQUFFO2dCQUM5QyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsYUFBa0MsRUFBRSxFQUFFLENBQUMsK0JBQStCLENBQUMsU0FBUyxFQUFFLGFBQWEsRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7YUFDaEo7aUJBQU0sSUFBSSxZQUFZLENBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ2hDLE9BQU8sQ0FBQyxTQUFTLENBQ2YsQ0FBQyxhQUFrQyxFQUFFLEVBQUUsQ0FBQywrQkFBK0IsQ0FBQyxTQUFTLEVBQUUsYUFBYSxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQ2hJLENBQUMsS0FBVSxFQUFFLEVBQUUsQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQyxDQUNsRCxDQUFDO2FBQ0g7UUFDSCxDQUFDO0tBQUE7SUFFRDs7OztPQUlHO0lBQ0gsbUJBQW1CLENBQUMsSUFBUyxFQUFFLFFBQWE7UUFDMUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7UUFDMUIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBRTFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsRUFBRSxhQUFhLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDakYsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBRWhFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFnQixFQUFFLElBQVMsRUFBRSxFQUFFO1lBQzlELE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7WUFDL0IsSUFBSSxRQUFRLElBQUksSUFBSSxFQUFFO2dCQUNwQixRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7YUFDcEI7WUFDRCx1RUFBdUU7WUFDdkUsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUU7Z0JBQ3RDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDM0M7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUVILGlGQUFpRjtRQUNqRixJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQyxDQUFnQixFQUFFLElBQVMsRUFBRSxFQUFFO1lBQ3pGLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxQyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxxQkFBcUIsQ0FBQyxLQUFZLEVBQUUsUUFBeUI7UUFDM0QsTUFBTSxTQUFTLEdBQVcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFjLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsRUFBRSxLQUFLLFFBQVEsQ0FBQyxDQUFDO1FBQ25HLElBQUksU0FBUyxJQUFJLFNBQVMsQ0FBQyxLQUFLLEVBQUU7WUFDaEMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN2QjtRQUVELHdFQUF3RTtRQUN4RSxpR0FBaUc7UUFDakcsS0FBSyxNQUFNLEtBQUssSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ3ZDLElBQUksS0FBSyxLQUFLLFFBQVEsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUNwRCxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDbkM7U0FDRjtRQUVELElBQUksT0FBTyxHQUFnQixXQUFXLENBQUMsS0FBSyxDQUFDO1FBQzdDLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsSUFBSSxLQUFLLENBQUM7UUFFdkYsNEVBQTRFO1FBQzVFLElBQUksWUFBWSxFQUFFO1lBQ2hCLE9BQU8sR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDO1lBQzdCLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxLQUFzQixFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsYUFBYSxFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDO1NBQzlHO1FBRUQsdUNBQXVDO1FBQ3ZDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRUQseURBQXlEO0lBQ3pELFlBQVk7UUFDVixJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQWMsRUFBRSxFQUFFO1lBQ3ZDLElBQUksTUFBTSxJQUFJLE1BQU0sQ0FBQyxLQUFLLEVBQUU7Z0JBQzFCLHFDQUFxQztnQkFDckMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNyQjtRQUNILENBQUMsQ0FBQyxDQUFDO1FBRUgsbUVBQW1FO1FBQ25FLGlHQUFpRztRQUNqRyxLQUFLLE1BQU0sUUFBUSxJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDMUMsSUFBSSxRQUFRLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFDN0MsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ3RDO1NBQ0Y7UUFFRCxxR0FBcUc7UUFDckcsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDaEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUN6QixJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQ3pCO1FBRUQsc0ZBQXNGO1FBQ3RGLElBQUksSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLGlCQUFpQixFQUFFO1lBQzVELE1BQU0sWUFBWSxHQUFHLEVBQUUsb0JBQW9CLEVBQUUsSUFBSSxFQUFFLGtCQUFrQixFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxhQUFhLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3BJLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxTQUFTLEVBQUUsWUFBWSxFQUFFLElBQUksSUFBSSxFQUFFLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1NBQ3ZHO1FBRUQsNkNBQTZDO1FBQzdDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxRQUFhLEVBQUUsSUFBUyxFQUFFLElBQVM7UUFDbkQsS0FBSyxNQUFNLFFBQVEsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRTtZQUN0RCxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2xELE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3ZELE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDdEQsSUFBSSxDQUFDLFNBQVMsRUFBRTtnQkFDZCxPQUFPLEtBQUssQ0FBQzthQUNkO1lBRUQsMEdBQTBHO1lBQzFHLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsRUFBRTtnQkFDekMsTUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQztnQkFDNUcsSUFBSSxJQUFJLENBQUMsR0FBRyxjQUFjLFdBQVcsQ0FBQyxJQUFJLElBQUksQ0FBQyxHQUFHLGNBQWMsUUFBUSxDQUFDLEVBQUU7b0JBQ3pFLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxjQUFjLFFBQVEsQ0FBQyxDQUFDO2lCQUN4QzthQUNGO1lBRUQsTUFBTSxPQUFPLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQztZQUNsQyxNQUFNLFNBQVMsR0FBRyxTQUFTLENBQUMsVUFBVSxJQUFJLFNBQVMsQ0FBQyxnQkFBZ0IsSUFBSSxTQUFTLENBQUMsS0FBSyxDQUFDO1lBQ3hGLE1BQU0sU0FBUyxHQUFHLFNBQVMsQ0FBQyxJQUFJLElBQUksU0FBUyxDQUFDLE1BQU0sQ0FBQztZQUNyRCxNQUFNLGdCQUFnQixHQUFHLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQzFGLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUVoQyw2R0FBNkc7WUFDN0csSUFBSSxTQUFTLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDL0IsU0FBUyxHQUFHLHFCQUFxQixDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQzthQUNwRDtZQUVELDhGQUE4RjtZQUM5RixvRUFBb0U7WUFDcEUsc0hBQXNIO1lBQ3RILE1BQU0sWUFBWSxHQUFHLENBQUMsWUFBWSxJQUFJLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBRXRILElBQUksZ0JBQWdCLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLFlBQVksQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBRXpHLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQztZQUNuQixJQUFJLFNBQVMsS0FBSyxTQUFTLENBQUMsTUFBTSxFQUFFO2dCQUNsQyxnQkFBZ0IsR0FBRyxFQUFFLEdBQUcsZ0JBQWdCLENBQUMsQ0FBQywwQkFBMEI7Z0JBQ3BFLE9BQU8sR0FBRyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsdUNBQXVDLENBQUMsQ0FBQyxDQUFDLDBGQUEwRjthQUN0SztZQUVELElBQUksUUFBUSxHQUFHLFlBQVksQ0FBQyxRQUFRLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3RFLE1BQU0sVUFBVSxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUNqRCxNQUFNLGFBQWEsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7WUFFaEYsSUFBSSxZQUFZLElBQUksWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQzNDLGdCQUFnQixHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDM0M7aUJBQU0sSUFBSSxPQUFPLGdCQUFnQixLQUFLLFFBQVEsRUFBRTtnQkFDL0MsNEJBQTRCO2dCQUM1QixnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsd0NBQXdDO2dCQUNoRyxJQUFJLFFBQVEsS0FBSyxHQUFHLElBQUksUUFBUSxLQUFLLElBQUksSUFBSSxRQUFRLEtBQUssSUFBSSxJQUFJLGFBQWEsS0FBSyxHQUFHLEVBQUU7b0JBQ3ZGLFFBQVEsR0FBRyxDQUFDLFFBQVEsS0FBSyxHQUFHLElBQUksUUFBUSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDO2lCQUN0RzthQUNGO1lBRUQsNENBQTRDO1lBQzVDLElBQUksVUFBVSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsWUFBWSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsSUFBSSxZQUFZLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ3RHLE9BQU8sSUFBSSxDQUFDO2FBQ2I7WUFFRCxxRkFBcUY7WUFDckYsMkdBQTJHO1lBQzNHLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxPQUFPLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLElBQUksWUFBWSxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsRUFBRTtnQkFDL0csWUFBWSxDQUFDLENBQUMsQ0FBQyxHQUFHLFVBQVUsQ0FBQzthQUM5QjtZQUVELHlHQUF5RztZQUN6Ryx5R0FBeUc7WUFDekcsSUFBSSxZQUFZLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsSUFBSSxTQUFTLEtBQUssU0FBUyxDQUFDLE1BQU0sRUFBRTtnQkFDakYsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDckQseUNBQXlDO29CQUN6QyxZQUFZLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsS0FBSyxTQUFTLElBQUksWUFBWSxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztpQkFDN0c7YUFDRjtZQUVELHFHQUFxRztZQUNyRyxJQUFJLFNBQVMsSUFBSSxTQUFTLENBQUMsTUFBTSxJQUFJLFNBQVMsQ0FBQyxNQUFNLENBQUMseUJBQXlCLEVBQUU7Z0JBQy9FLE1BQU0sUUFBUSxHQUFHLENBQUMsUUFBUSxJQUFJLE9BQU8sUUFBUSxDQUFDLFVBQVUsS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDNUcsU0FBUyxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDaEc7WUFFRCwwQ0FBMEM7WUFDMUMsSUFBSSxPQUFPLFNBQVMsS0FBSyxRQUFRLEVBQUU7Z0JBQ2pDLFNBQVMsR0FBRyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUM7YUFDbEM7WUFFRCxNQUFNLGdCQUFnQixHQUFHO2dCQUN2QixPQUFPO2dCQUNQLFNBQVM7Z0JBQ1QsV0FBVyxFQUFFLFlBQVk7Z0JBQ3pCLFNBQVM7Z0JBQ1QsUUFBUTtnQkFDUixpQkFBaUIsRUFBRSxhQUFhO2dCQUNoQyxnQkFBZ0I7YUFDakIsQ0FBQztZQUVGLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxzQkFBc0IsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO2dCQUM5RCxPQUFPLEtBQUssQ0FBQzthQUNkO1NBQ0Y7UUFFRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxPQUFPO1FBQ0wsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7UUFFNUIsbUNBQW1DO1FBQ25DLElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxFQUFFLENBQUM7UUFFcEMsMEJBQTBCO1FBQzFCLElBQUksSUFBSSxDQUFDLGdCQUFnQixJQUFJLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsS0FBSyxVQUFVLEVBQUU7WUFDcEYsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3JDO0lBQ0gsQ0FBQztJQUVEOztPQUVHO0lBQ0gsb0JBQW9CO1FBQ2xCLG1FQUFtRTtRQUNuRSxpR0FBaUc7UUFDakcsS0FBSyxNQUFNLFFBQVEsSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQzFDLElBQUksUUFBUSxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQzdDLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUN0QztTQUNGO1FBRUQscUNBQXFDO1FBQ3JDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxFQUFFO1lBQ3RDLElBQUksTUFBTSxJQUFJLE1BQU0sQ0FBQyxPQUFPLEVBQUU7Z0JBQzVCLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDdEI7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxnQkFBZ0I7UUFDZCxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUM7SUFDN0IsQ0FBQztJQUVELHNCQUFzQjtRQUNwQixNQUFNLGNBQWMsR0FBb0IsRUFBRSxDQUFDO1FBQzNDLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUN2QixLQUFLLE1BQU0sS0FBSyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFO2dCQUNwRCxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNoRCxNQUFNLE1BQU0sR0FBRyxFQUFFLFFBQVEsRUFBRSxLQUFLLElBQUksRUFBRSxFQUFtQixDQUFDO2dCQUUxRCxJQUFJLFlBQVksSUFBSSxZQUFZLENBQUMsV0FBVyxFQUFFO29CQUM1QyxNQUFNLENBQUMsV0FBVyxHQUFHLFlBQVksQ0FBQyxXQUFXLENBQUM7aUJBQy9DO2dCQUNELElBQUksWUFBWSxDQUFDLFFBQVEsRUFBRTtvQkFDekIsTUFBTSxDQUFDLFFBQVEsR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDO2lCQUN6QztnQkFDRCxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtvQkFDdEcsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztpQkFDN0I7YUFDRjtTQUNGO1FBQ0QsT0FBTyxjQUFjLENBQUM7SUFDeEIsQ0FBQztJQUVELG1CQUFtQixDQUFDLENBQTRCLEVBQUUsSUFBdUI7UUFDdkUsSUFBSSxJQUFJLEVBQUU7WUFDUixNQUFNLFVBQVUsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUUsQ0FBQyxDQUFDLE1BQTJCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUN4RixNQUFNLFdBQVcsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3ZJLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDO1lBQ3pDLE1BQU0sUUFBUSxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDdkQsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsSUFBSSxTQUFTLENBQUM7WUFDNUMsTUFBTSxjQUFjLEdBQUcsV0FBVyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDakUsTUFBTSxVQUFVLEdBQUcsY0FBYyxJQUFJLFdBQVcsQ0FBQyxNQUFNLENBQUM7WUFDeEQsTUFBTSxnQkFBZ0IscUJBQVEsSUFBSSxDQUFDLGNBQWMsQ0FBRSxDQUFDO1lBRXBELElBQUksQ0FBQyxjQUFjLElBQUksVUFBVSxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsS0FBSyxDQUFDLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFO2dCQUN0RixtRUFBbUU7Z0JBQ25FLHdIQUF3SDtnQkFDeEgsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ3RDO2lCQUFNO2dCQUNMLE1BQU0sS0FBSyxHQUFHLEVBQUUsR0FBRyxRQUFrQixDQUFDO2dCQUN0QyxNQUFNLFNBQVMsR0FBaUI7b0JBQzlCLFFBQVEsRUFBRSxLQUFLO29CQUNmLFNBQVM7b0JBQ1QsV0FBVztpQkFDWixDQUFDO2dCQUNGLElBQUksUUFBUSxFQUFFO29CQUNaLFNBQVMsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO2lCQUMvQjtnQkFDRCxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxHQUFHLFNBQVMsQ0FBQzthQUN4QztZQUVELHVFQUF1RTtZQUN2RSxNQUFNLFlBQVksR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQztZQUNwQyxJQUFJLFlBQVksS0FBSyxPQUFPLENBQUMsS0FBSyxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRTtnQkFDckYsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7b0JBQ3ZDLG9CQUFvQixFQUFFLElBQUksQ0FBQyxvQkFBb0I7b0JBQy9DLGtCQUFrQixFQUFFLElBQUksQ0FBQyxrQkFBa0I7b0JBQzNDLFFBQVE7b0JBQ1IsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSTtvQkFDakMsYUFBYSxFQUFFLElBQUksQ0FBQyxjQUFjO29CQUNsQyxRQUFRO29CQUNSLFdBQVc7b0JBQ1gsY0FBYyxFQUFFLElBQUksQ0FBQyx1QkFBdUI7b0JBQzVDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSztpQkFDakIsRUFBRSxDQUFDLENBQUMsQ0FBQzthQUNQO1NBQ0Y7SUFDSCxDQUFDO0lBRUQsNEJBQTRCLENBQUMsSUFBOEMsRUFBRSxtQkFBbUIsR0FBRyxJQUFJO1FBQ3JHLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDOUIsTUFBTSxRQUFRLEdBQUcsU0FBUyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUM7UUFFcEMsSUFBSSxTQUFTLElBQUksUUFBUSxLQUFLLFVBQVUsSUFBSSxTQUFTLENBQUMsVUFBVSxFQUFFO1lBQ2hFLElBQUksV0FBcUMsQ0FBQztZQUMxQyxJQUFJLFFBQXVDLENBQUM7WUFDNUMsTUFBTSxNQUFNLEdBQXVCLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDdkYsUUFBUSxHQUFHLENBQUMsU0FBUyxJQUFJLFNBQVMsQ0FBQyxNQUFNLElBQUksU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksU0FBUyxDQUFDO1lBRXBILElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLEVBQUU7Z0JBQ3JDLFdBQVcsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxXQUFXLElBQUksU0FBUyxDQUFDO2dCQUN6RSxRQUFRLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUMsUUFBUSxJQUFJLFNBQVMsQ0FBQzthQUNwRTtpQkFBTSxJQUFJLFNBQVMsQ0FBQyxNQUFNLEVBQUU7Z0JBQzNCLDJJQUEySTtnQkFDM0ksaUhBQWlIO2dCQUNqSCxXQUFXLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxXQUFXLElBQUksU0FBUyxDQUFDO2dCQUN4RCxJQUFJLENBQUMsbUJBQW1CLENBQUMsV0FBVyxFQUFFLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQzthQUM1RDtZQUVELE1BQU0sZUFBZSxHQUFvQjtnQkFDdkMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLO2dCQUNoQixRQUFRO2dCQUNSLFdBQVc7Z0JBQ1gsU0FBUztnQkFDVCxRQUFRLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7YUFDOUMsQ0FBQztZQUVGLElBQUksTUFBTSxFQUFFO2dCQUNWLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLG1CQUFtQixDQUFDLENBQUM7Z0JBQ2xELE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBRTFHLHFEQUFxRDtnQkFDckQsSUFBSSxnQkFBZ0IsS0FBSyxDQUFDLENBQUMsRUFBRTtvQkFDM0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7aUJBQzVCO3FCQUFNO29CQUNMLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxNQUFNLENBQUM7aUJBQzFDO2dCQUVELDJJQUEySTtnQkFDM0kscUdBQXFHO2dCQUNyRyxJQUFJLFdBQVcsSUFBSSxNQUFNLENBQUMsU0FBUyxFQUFFO29CQUNuQyxNQUFNLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2lCQUMvQjthQUNGO1NBQ0Y7SUFDSCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILGlCQUFpQixDQUFDLE1BQW1CO1FBQ25DLElBQUksTUFBTSxLQUFLLFdBQVcsQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLGlCQUFpQixFQUFFO1lBQzdGLElBQUksY0FBYyxHQUFvQixFQUFFLENBQUM7WUFDekMsTUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUM7WUFDbkUsSUFBSSxjQUFjLElBQUksY0FBYyxDQUFDLGlCQUFpQixFQUFFO2dCQUN0RCxjQUFjLEdBQUcsY0FBYyxDQUFDLGlCQUFpQixFQUFxQixDQUFDO2FBQ3hFO1lBQ0QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7U0FDM0M7YUFBTSxJQUFJLE1BQU0sS0FBSyxXQUFXLENBQUMsS0FBSyxFQUFFO1lBQ3ZDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDLENBQUM7U0FDMUQ7SUFDSCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCwrQkFBK0I7UUFDN0IsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ2pJLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztZQUNsRCxJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBaUIsRUFBRSxFQUFFO2dCQUNwRCwwREFBMEQ7Z0JBQzFELElBQUksU0FBUyxDQUFDLE1BQU0sSUFBSSxTQUFTLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRTtvQkFDcEQsT0FBTyxTQUFTLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQztpQkFDckM7Z0JBRUQsbUhBQW1IO2dCQUNuSCxNQUFNLFlBQVksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsWUFBMkIsRUFBRSxFQUFFO29CQUNoRSxPQUFPLFlBQVksQ0FBQyxRQUFRLEtBQUssU0FBUyxDQUFDLEVBQUUsQ0FBQztnQkFDaEQsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsSUFBSSxZQUFZLElBQUksWUFBWSxDQUFDLFdBQVcsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsRUFBRTtvQkFDdkYsU0FBUyxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQztvQkFDMUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEdBQUcsWUFBWSxDQUFDLFFBQVEsSUFBSSxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUM7b0JBQ3JGLFNBQVMsQ0FBQyxNQUFNLENBQUMsV0FBVyxHQUFHLFlBQVksQ0FBQyxXQUFXLENBQUM7aUJBQ3pEO1lBQ0gsQ0FBQyxDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7SUFFTyxtQkFBbUIsQ0FBQyxXQUFxQyxFQUFFLFNBQWMsRUFBRSxRQUF3QztRQUN6SCxJQUFJLFdBQVcsSUFBSSxTQUFTLEVBQUU7WUFDNUIsaURBQWlEO1lBQ2pELElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxHQUFHO2dCQUNsQyxRQUFRLEVBQUUsU0FBUyxDQUFDLEVBQUU7Z0JBQ3RCLFNBQVM7Z0JBQ1QsV0FBVztnQkFDWCxRQUFRO2FBQ1QsQ0FBQztTQUNIO0lBQ0gsQ0FBQztJQUVPLFlBQVksQ0FBQyxVQUFlLEVBQUUsSUFBUyxFQUFFLENBQU07UUFDckQsVUFBVSxHQUFHLFVBQVUsSUFBSSxJQUFJLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUU3QyxtSEFBbUg7UUFDbkgsaUhBQWlIO1FBQ2pILElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNkLElBQUksQ0FBQyxJQUFJLE9BQU8sQ0FBQyxDQUFDLG9CQUFvQixLQUFLLFVBQVUsRUFBRTtZQUNyRCxLQUFLLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxLQUFLLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDaEQ7UUFDRCxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVDLENBQUM7Q0FDRixDQUFBO0FBaGhCWSxhQUFhO0lBRHpCLFVBQVUsRUFBRTs2Q0Fjd0IsYUFBYTtHQWJyQyxhQUFhLENBZ2hCekI7U0FoaEJZLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7XHJcbiAgQmFja2VuZFNlcnZpY2VBcGksXHJcbiAgQ29sdW1uLFxyXG4gIENvbHVtbkZpbHRlcixcclxuICBDb2x1bW5GaWx0ZXJzLFxyXG4gIEVtaXR0ZXJUeXBlLFxyXG4gIEZpbHRlcixcclxuICBGaWx0ZXJBcmd1bWVudHMsXHJcbiAgRmlsdGVyQ2FsbGJhY2tBcmcsXHJcbiAgRmllbGRUeXBlLFxyXG4gIEdyYXBocWxSZXN1bHQsXHJcbiAgR3JpZE9wdGlvbixcclxuICBLZXlDb2RlLFxyXG4gIE9wZXJhdG9yVHlwZSxcclxuICBDdXJyZW50RmlsdGVyLFxyXG4gIFNlYXJjaFRlcm0sXHJcbiAgU2xpY2tFdmVudCxcclxuICBPcGVyYXRvclN0cmluZyxcclxufSBmcm9tICcuLy4uL21vZGVscy9pbmRleCc7XHJcbmltcG9ydCB7IGV4ZWN1dGVCYWNrZW5kUHJvY2Vzc2VzQ2FsbGJhY2ssIG9uQmFja2VuZEVycm9yIH0gZnJvbSAnLi9iYWNrZW5kLXV0aWxpdGllcyc7XHJcbmltcG9ydCB7IGdldERlc2NlbmRhbnRQcm9wZXJ0eSB9IGZyb20gJy4vdXRpbGl0aWVzJztcclxuaW1wb3J0IHsgRmlsdGVyQ29uZGl0aW9ucyB9IGZyb20gJy4vLi4vZmlsdGVyLWNvbmRpdGlvbnMnO1xyXG5pbXBvcnQgeyBGaWx0ZXJGYWN0b3J5IH0gZnJvbSAnLi4vZmlsdGVycy9maWx0ZXJGYWN0b3J5JztcclxuaW1wb3J0IHsgaXNPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCAqIGFzIGlzZXF1YWxfIGZyb20gJ2xvZGFzaC5pc2VxdWFsJztcclxuY29uc3QgaXNlcXVhbCA9IGlzZXF1YWxfOyAvLyBwYXRjaCB0byBmaXggcm9sbHVwIHRvIHdvcmtcclxuXHJcbi8vIHVzaW5nIGV4dGVybmFsIG5vbi10eXBlZCBqcyBsaWJyYXJpZXNcclxuZGVjbGFyZSB2YXIgU2xpY2s6IGFueTtcclxuZGVjbGFyZSB2YXIgJDogYW55O1xyXG5cclxuLy8gdGltZXIgZm9yIGtlZXBpbmcgdHJhY2sgb2YgdXNlciB0eXBpbmcgd2FpdHNcclxubGV0IHRpbWVyOiBhbnk7XHJcbmNvbnN0IERFRkFVTFRfRklMVEVSX1RZUElOR19ERUJPVU5DRSA9IDUwMDtcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEZpbHRlclNlcnZpY2Uge1xyXG4gIHByaXZhdGUgX2V2ZW50SGFuZGxlciA9IG5ldyBTbGljay5FdmVudEhhbmRsZXIoKTtcclxuICBwcml2YXRlIF9pc0ZpbHRlckZpcnN0UmVuZGVyID0gdHJ1ZTtcclxuICBwcml2YXRlIF9maXJzdENvbHVtbklkUmVuZGVyZWQgPSAnJztcclxuICBwcml2YXRlIF9zbGlja1N1YnNjcmliZXI6IFNsaWNrRXZlbnQ7XHJcbiAgcHJpdmF0ZSBfZmlsdGVyczogYW55W10gPSBbXTtcclxuICBwcml2YXRlIF9jb2x1bW5GaWx0ZXJzOiBDb2x1bW5GaWx0ZXJzID0ge307XHJcbiAgcHJpdmF0ZSBfZGF0YVZpZXc6IGFueTtcclxuICBwcml2YXRlIF9ncmlkOiBhbnk7XHJcbiAgcHJpdmF0ZSBfb25GaWx0ZXJDaGFuZ2VkT3B0aW9uczogYW55O1xyXG4gIG9uRmlsdGVyQ2hhbmdlZCA9IG5ldyBTdWJqZWN0PEN1cnJlbnRGaWx0ZXJbXT4oKTtcclxuICBvbkZpbHRlckNsZWFyZWQgPSBuZXcgU3ViamVjdDxib29sZWFuPigpO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGZpbHRlckZhY3Rvcnk6IEZpbHRlckZhY3RvcnkpIHsgfVxyXG5cclxuICAvKiogR2V0dGVyIGZvciB0aGUgR3JpZCBPcHRpb25zIHB1bGxlZCB0aHJvdWdoIHRoZSBHcmlkIE9iamVjdCAqL1xyXG4gIHByaXZhdGUgZ2V0IF9ncmlkT3B0aW9ucygpOiBHcmlkT3B0aW9uIHtcclxuICAgIHJldHVybiAodGhpcy5fZ3JpZCAmJiB0aGlzLl9ncmlkLmdldE9wdGlvbnMpID8gdGhpcy5fZ3JpZC5nZXRPcHRpb25zKCkgOiB7fTtcclxuICB9XHJcblxyXG4gIC8qKiBHZXR0ZXIgZm9yIHRoZSBDb2x1bW4gRGVmaW5pdGlvbnMgcHVsbGVkIHRocm91Z2ggdGhlIEdyaWQgT2JqZWN0ICovXHJcbiAgcHJpdmF0ZSBnZXQgX2NvbHVtbkRlZmluaXRpb25zKCk6IENvbHVtbltdIHtcclxuICAgIHJldHVybiAodGhpcy5fZ3JpZCAmJiB0aGlzLl9ncmlkLmdldENvbHVtbnMpID8gdGhpcy5fZ3JpZC5nZXRDb2x1bW5zKCkgOiBbXTtcclxuICB9XHJcblxyXG4gIGluaXQoZ3JpZDogYW55KTogdm9pZCB7XHJcbiAgICB0aGlzLl9ncmlkID0gZ3JpZDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEF0dGFjaCBhIGJhY2tlbmQgZmlsdGVyIGhvb2sgdG8gdGhlIGdyaWRcclxuICAgKiBAcGFyYW0gZ3JpZCBTbGlja0dyaWQgR3JpZCBvYmplY3RcclxuICAgKi9cclxuICBhdHRhY2hCYWNrZW5kT25GaWx0ZXIoZ3JpZDogYW55LCBkYXRhVmlldzogYW55KSB7XHJcbiAgICB0aGlzLl9kYXRhVmlldyA9IGRhdGFWaWV3O1xyXG4gICAgdGhpcy5fZmlsdGVycyA9IFtdO1xyXG4gICAgdGhpcy5fc2xpY2tTdWJzY3JpYmVyID0gbmV3IFNsaWNrLkV2ZW50KCk7XHJcblxyXG4gICAgLy8gc3Vic2NyaWJlIHRvIHRoZSBTbGlja0dyaWQgZXZlbnQgYW5kIGNhbGwgdGhlIGJhY2tlbmQgZXhlY3V0aW9uXHJcbiAgICB0aGlzLl9zbGlja1N1YnNjcmliZXIuc3Vic2NyaWJlKHRoaXMub25CYWNrZW5kRmlsdGVyQ2hhbmdlLmJpbmQodGhpcykpO1xyXG5cclxuICAgIC8vIHN1YnNjcmliZSB0byBTbGlja0dyaWQgb25IZWFkZXJSb3dDZWxsUmVuZGVyZWQgZXZlbnQgdG8gY3JlYXRlIGZpbHRlciB0ZW1wbGF0ZVxyXG4gICAgdGhpcy5fZXZlbnRIYW5kbGVyLnN1YnNjcmliZShncmlkLm9uSGVhZGVyUm93Q2VsbFJlbmRlcmVkLCAoZTogS2V5Ym9hcmRFdmVudCwgYXJnczogYW55KSA9PiB7XHJcbiAgICAgIC8vIGZpcnN0Q29sdW1uSWRSZW5kZXJlZCBpcyBudWxsIGF0IGZpcnN0LCBzbyBpZiBpdCBjaGFuZ2VzIHRvIGJlaW5nIGZpbGxlZCBhbmQgZXF1YWwgdGhlbiB3ZSBrbm93IGl0IHdhcyBhbHJlYWR5IHJlbmRlcmVkXHJcbiAgICAgIGlmIChhcmdzLmNvbHVtbi5pZCA9PT0gdGhpcy5fZmlyc3RDb2x1bW5JZFJlbmRlcmVkKSB7XHJcbiAgICAgICAgdGhpcy5faXNGaWx0ZXJGaXJzdFJlbmRlciA9IGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuYWRkRmlsdGVyVGVtcGxhdGVUb0hlYWRlclJvdyhhcmdzLCB0aGlzLl9pc0ZpbHRlckZpcnN0UmVuZGVyKTtcclxuICAgICAgaWYgKHRoaXMuX2ZpcnN0Q29sdW1uSWRSZW5kZXJlZCA9PT0gJycpIHtcclxuICAgICAgICB0aGlzLl9maXJzdENvbHVtbklkUmVuZGVyZWQgPSBhcmdzLmNvbHVtbi5pZDtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBvbkJhY2tlbmRGaWx0ZXJDaGFuZ2UoZXZlbnQ6IEtleWJvYXJkRXZlbnQsIGFyZ3M6IGFueSkge1xyXG4gICAgaWYgKCFhcmdzIHx8ICFhcmdzLmdyaWQpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdTb21ldGhpbmcgd2VudCB3cm9uZyB3aGVuIHRyeWluZyB0byBhdHRhY2ggdGhlIFwiYXR0YWNoQmFja2VuZE9uRmlsdGVyU3Vic2NyaWJlKGV2ZW50LCBhcmdzKVwiIGZ1bmN0aW9uLCBpdCBzZWVtcyB0aGF0IFwiYXJnc1wiIGlzIG5vdCBwb3B1bGF0ZWQgY29ycmVjdGx5Jyk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBiYWNrZW5kQXBpID0gdGhpcy5fZ3JpZE9wdGlvbnMuYmFja2VuZFNlcnZpY2VBcGk7XHJcbiAgICBpZiAoIWJhY2tlbmRBcGkgfHwgIWJhY2tlbmRBcGkucHJvY2VzcyB8fCAhYmFja2VuZEFwaS5zZXJ2aWNlKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQmFja2VuZFNlcnZpY2VBcGkgcmVxdWlyZXMgYXQgbGVhc3QgYSBcInByb2Nlc3NcIiBmdW5jdGlvbiBhbmQgYSBcInNlcnZpY2VcIiBkZWZpbmVkYCk7XHJcbiAgICB9XHJcbiAgICB0cnkge1xyXG4gICAgICAvLyBrZWVwIHN0YXJ0IHRpbWUgJiBlbmQgdGltZXN0YW1wcyAmIHJldHVybiBpdCBhZnRlciBwcm9jZXNzIGV4ZWN1dGlvblxyXG4gICAgICBjb25zdCBzdGFydFRpbWUgPSBuZXcgRGF0ZSgpO1xyXG5cclxuICAgICAgLy8gcnVuIGEgcHJlUHJvY2VzcyBjYWxsYmFjayBpZiBkZWZpbmVkXHJcbiAgICAgIGlmIChiYWNrZW5kQXBpLnByZVByb2Nlc3MpIHtcclxuICAgICAgICBiYWNrZW5kQXBpLnByZVByb2Nlc3MoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gb25seSBhZGQgYSBkZWxheSB3aGVuIHVzZXIgaXMgdHlwaW5nLCBvbiBzZWxlY3QgZHJvcGRvd24gZmlsdGVyIChvciBcIkNsZWFyIEZpbHRlclwiKSBpdCB3aWxsIGV4ZWN1dGUgcmlnaHQgYXdheVxyXG4gICAgICBsZXQgZGVib3VuY2VUeXBpbmdEZWxheSA9IDA7XHJcbiAgICAgIGNvbnN0IGlzVHJpZ2dlcmVkQnlDbGVhckZpbHRlciA9IGFyZ3MgJiYgYXJncy5jbGVhckZpbHRlclRyaWdnZXJlZDsgLy8gd2FzIGl0IHRyaWdnZXIgYnkgYSBcIkNsZWFyIEZpbHRlclwiIGNvbW1hbmQ/XHJcblxyXG4gICAgICBpZiAoIWlzVHJpZ2dlcmVkQnlDbGVhckZpbHRlciAmJiBldmVudCAmJiBldmVudC5rZXlDb2RlICE9PSBLZXlDb2RlLkVOVEVSICYmIChldmVudC50eXBlID09PSAnaW5wdXQnIHx8IGV2ZW50LnR5cGUgPT09ICdrZXl1cCcgfHwgZXZlbnQudHlwZSA9PT0gJ2tleWRvd24nKSkge1xyXG4gICAgICAgIGRlYm91bmNlVHlwaW5nRGVsYXkgPSBiYWNrZW5kQXBpLmZpbHRlclR5cGluZ0RlYm91bmNlIHx8IERFRkFVTFRfRklMVEVSX1RZUElOR19ERUJPVU5DRTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gcXVlcnkgYmFja2VuZCwgZXhjZXB0IHdoZW4gaXQncyBjYWxsZWQgYnkgYSBDbGVhckZpbHRlcnMgdGhlbiB3ZSB3b24ndFxyXG4gICAgICBpZiAoYXJncyAmJiBhcmdzLnNob3VsZFRyaWdnZXJRdWVyeSkge1xyXG4gICAgICAgIC8vIGNhbGwgdGhlIHNlcnZpY2UgdG8gZ2V0IGEgcXVlcnkgYmFja1xyXG4gICAgICAgIGlmIChkZWJvdW5jZVR5cGluZ0RlbGF5ID4gMCkge1xyXG4gICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcclxuICAgICAgICAgIHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB0aGlzLmV4ZWN1dGVCYWNrZW5kQ2FsbGJhY2soZXZlbnQsIGFyZ3MsIHN0YXJ0VGltZSwgYmFja2VuZEFwaSksIGRlYm91bmNlVHlwaW5nRGVsYXkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLmV4ZWN1dGVCYWNrZW5kQ2FsbGJhY2soZXZlbnQsIGFyZ3MsIHN0YXJ0VGltZSwgYmFja2VuZEFwaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBvbkJhY2tlbmRFcnJvcihlcnJvciwgYmFja2VuZEFwaSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhc3luYyBleGVjdXRlQmFja2VuZENhbGxiYWNrKGV2ZW50OiBLZXlib2FyZEV2ZW50LCBhcmdzOiBhbnksIHN0YXJ0VGltZTogRGF0ZSwgYmFja2VuZEFwaTogQmFja2VuZFNlcnZpY2VBcGkpIHtcclxuICAgIGNvbnN0IHF1ZXJ5ID0gYXdhaXQgYmFja2VuZEFwaS5zZXJ2aWNlLnByb2Nlc3NPbkZpbHRlckNoYW5nZWQoZXZlbnQsIGFyZ3MpO1xyXG5cclxuICAgIC8vIGVtaXQgYW4gb25GaWx0ZXJDaGFuZ2VkIGV2ZW50IHdoZW4gaXQncyBub3QgY2FsbGVkIGJ5IGEgY2xlYXIgZmlsdGVyXHJcbiAgICBpZiAoYXJncyAmJiAhYXJncy5jbGVhckZpbHRlclRyaWdnZXJlZCkge1xyXG4gICAgICB0aGlzLmVtaXRGaWx0ZXJDaGFuZ2VkKEVtaXR0ZXJUeXBlLnJlbW90ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gdGhlIHByb2Nlc3NlcyBjYW4gYmUgT2JzZXJ2YWJsZXMgKGxpa2UgSHR0cENsaWVudCkgb3IgUHJvbWlzZXNcclxuICAgIGNvbnN0IHByb2Nlc3MgPSBiYWNrZW5kQXBpLnByb2Nlc3MocXVlcnkpO1xyXG4gICAgaWYgKHByb2Nlc3MgaW5zdGFuY2VvZiBQcm9taXNlICYmIHByb2Nlc3MudGhlbikge1xyXG4gICAgICBwcm9jZXNzLnRoZW4oKHByb2Nlc3NSZXN1bHQ6IEdyYXBocWxSZXN1bHQgfCBhbnkpID0+IGV4ZWN1dGVCYWNrZW5kUHJvY2Vzc2VzQ2FsbGJhY2soc3RhcnRUaW1lLCBwcm9jZXNzUmVzdWx0LCBiYWNrZW5kQXBpLCB0aGlzLl9ncmlkT3B0aW9ucykpO1xyXG4gICAgfSBlbHNlIGlmIChpc09ic2VydmFibGUocHJvY2VzcykpIHtcclxuICAgICAgcHJvY2Vzcy5zdWJzY3JpYmUoXHJcbiAgICAgICAgKHByb2Nlc3NSZXN1bHQ6IEdyYXBocWxSZXN1bHQgfCBhbnkpID0+IGV4ZWN1dGVCYWNrZW5kUHJvY2Vzc2VzQ2FsbGJhY2soc3RhcnRUaW1lLCBwcm9jZXNzUmVzdWx0LCBiYWNrZW5kQXBpLCB0aGlzLl9ncmlkT3B0aW9ucyksXHJcbiAgICAgICAgKGVycm9yOiBhbnkpID0+IG9uQmFja2VuZEVycm9yKGVycm9yLCBiYWNrZW5kQXBpKVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQXR0YWNoIGEgbG9jYWwgZmlsdGVyIGhvb2sgdG8gdGhlIGdyaWRcclxuICAgKiBAcGFyYW0gZ3JpZCBTbGlja0dyaWQgR3JpZCBvYmplY3RcclxuICAgKiBAcGFyYW0gZGF0YVZpZXdcclxuICAgKi9cclxuICBhdHRhY2hMb2NhbE9uRmlsdGVyKGdyaWQ6IGFueSwgZGF0YVZpZXc6IGFueSkge1xyXG4gICAgdGhpcy5fZmlsdGVycyA9IFtdO1xyXG4gICAgdGhpcy5fZGF0YVZpZXcgPSBkYXRhVmlldztcclxuICAgIHRoaXMuX3NsaWNrU3Vic2NyaWJlciA9IG5ldyBTbGljay5FdmVudCgpO1xyXG5cclxuICAgIGRhdGFWaWV3LnNldEZpbHRlckFyZ3MoeyBjb2x1bW5GaWx0ZXJzOiB0aGlzLl9jb2x1bW5GaWx0ZXJzLCBncmlkOiB0aGlzLl9ncmlkIH0pO1xyXG4gICAgZGF0YVZpZXcuc2V0RmlsdGVyKHRoaXMuY3VzdG9tTG9jYWxGaWx0ZXIuYmluZCh0aGlzLCBkYXRhVmlldykpO1xyXG5cclxuICAgIHRoaXMuX3NsaWNrU3Vic2NyaWJlci5zdWJzY3JpYmUoKGU6IEtleWJvYXJkRXZlbnQsIGFyZ3M6IGFueSkgPT4ge1xyXG4gICAgICBjb25zdCBjb2x1bW5JZCA9IGFyZ3MuY29sdW1uSWQ7XHJcbiAgICAgIGlmIChjb2x1bW5JZCAhPSBudWxsKSB7XHJcbiAgICAgICAgZGF0YVZpZXcucmVmcmVzaCgpO1xyXG4gICAgICB9XHJcbiAgICAgIC8vIGVtaXQgYW4gb25GaWx0ZXJDaGFuZ2VkIGV2ZW50IHdoZW4gaXQncyBub3QgY2FsbGVkIGJ5IGEgY2xlYXIgZmlsdGVyXHJcbiAgICAgIGlmIChhcmdzICYmICFhcmdzLmNsZWFyRmlsdGVyVHJpZ2dlcmVkKSB7XHJcbiAgICAgICAgdGhpcy5lbWl0RmlsdGVyQ2hhbmdlZChFbWl0dGVyVHlwZS5sb2NhbCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vIHN1YnNjcmliZSB0byBTbGlja0dyaWQgb25IZWFkZXJSb3dDZWxsUmVuZGVyZWQgZXZlbnQgdG8gY3JlYXRlIGZpbHRlciB0ZW1wbGF0ZVxyXG4gICAgdGhpcy5fZXZlbnRIYW5kbGVyLnN1YnNjcmliZShncmlkLm9uSGVhZGVyUm93Q2VsbFJlbmRlcmVkLCAoZTogS2V5Ym9hcmRFdmVudCwgYXJnczogYW55KSA9PiB7XHJcbiAgICAgIHRoaXMuYWRkRmlsdGVyVGVtcGxhdGVUb0hlYWRlclJvdyhhcmdzKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgY2xlYXJGaWx0ZXJCeUNvbHVtbklkKGV2ZW50OiBFdmVudCwgY29sdW1uSWQ6IG51bWJlciB8IHN0cmluZykge1xyXG4gICAgY29uc3QgY29sRmlsdGVyOiBGaWx0ZXIgPSB0aGlzLl9maWx0ZXJzLmZpbmQoKGZpbHRlcjogRmlsdGVyKSA9PiBmaWx0ZXIuY29sdW1uRGVmLmlkID09PSBjb2x1bW5JZCk7XHJcbiAgICBpZiAoY29sRmlsdGVyICYmIGNvbEZpbHRlci5jbGVhcikge1xyXG4gICAgICBjb2xGaWx0ZXIuY2xlYXIodHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gd2UgbmVlZCB0byBsb29wIHRocm91Z2ggYWxsIGNvbHVtbkZpbHRlcnMgYW5kIGRlbGV0ZSB0aGUgZmlsdGVyIGZvdW5kXHJcbiAgICAvLyBvbmx5IHRyeWluZyB0byBjbGVhciBjb2x1bW5GaWx0ZXIgKHdpdGhvdXQgbG9vcGluZyB0aHJvdWdoKSB3b3VsZCBub3QgdHJpZ2dlciBhIGRhdGFzZXQgY2hhbmdlXHJcbiAgICBmb3IgKGNvbnN0IGNvbElkIGluIHRoaXMuX2NvbHVtbkZpbHRlcnMpIHtcclxuICAgICAgaWYgKGNvbElkID09PSBjb2x1bW5JZCAmJiB0aGlzLl9jb2x1bW5GaWx0ZXJzW2NvbElkXSkge1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLl9jb2x1bW5GaWx0ZXJzW2NvbElkXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGxldCBlbWl0dGVyOiBFbWl0dGVyVHlwZSA9IEVtaXR0ZXJUeXBlLmxvY2FsO1xyXG4gICAgY29uc3QgaXNCYWNrZW5kQXBpID0gdGhpcy5fZ3JpZE9wdGlvbnMgJiYgdGhpcy5fZ3JpZE9wdGlvbnMuYmFja2VuZFNlcnZpY2VBcGkgfHwgZmFsc2U7XHJcblxyXG4gICAgLy8gd2hlbiB1c2luZyBhIGJhY2tlbmQgc2VydmljZSwgd2UgbmVlZCB0byBtYW51YWxseSB0cmlnZ2VyIGEgZmlsdGVyIGNoYW5nZVxyXG4gICAgaWYgKGlzQmFja2VuZEFwaSkge1xyXG4gICAgICBlbWl0dGVyID0gRW1pdHRlclR5cGUucmVtb3RlO1xyXG4gICAgICB0aGlzLm9uQmFja2VuZEZpbHRlckNoYW5nZShldmVudCBhcyBLZXlib2FyZEV2ZW50LCB7IGdyaWQ6IHRoaXMuX2dyaWQsIGNvbHVtbkZpbHRlcnM6IHRoaXMuX2NvbHVtbkZpbHRlcnMgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZW1pdCBhbiBldmVudCB3aGVuIGZpbHRlciBpcyBjbGVhcmVkXHJcbiAgICB0aGlzLmVtaXRGaWx0ZXJDaGFuZ2VkKGVtaXR0ZXIpO1xyXG4gIH1cclxuXHJcbiAgLyoqIENsZWFyIHRoZSBzZWFyY2ggZmlsdGVycyAoYmVsb3cgdGhlIGNvbHVtbiB0aXRsZXMpICovXHJcbiAgY2xlYXJGaWx0ZXJzKCkge1xyXG4gICAgdGhpcy5fZmlsdGVycy5mb3JFYWNoKChmaWx0ZXI6IEZpbHRlcikgPT4ge1xyXG4gICAgICBpZiAoZmlsdGVyICYmIGZpbHRlci5jbGVhcikge1xyXG4gICAgICAgIC8vIGNsZWFyIGVsZW1lbnQgYW5kIHRyaWdnZXIgYSBjaGFuZ2VcclxuICAgICAgICBmaWx0ZXIuY2xlYXIoZmFsc2UpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyB3ZSBuZWVkIHRvIGxvb3AgdGhyb3VnaCBhbGwgY29sdW1uRmlsdGVycyBhbmQgZGVsZXRlIHRoZW0gMSBieSAxXHJcbiAgICAvLyBvbmx5IHRyeWluZyB0byBjbGVhciBjb2x1bW5GaWx0ZXIgKHdpdGhvdXQgbG9vcGluZyB0aHJvdWdoKSB3b3VsZCBub3QgdHJpZ2dlciBhIGRhdGFzZXQgY2hhbmdlXHJcbiAgICBmb3IgKGNvbnN0IGNvbHVtbklkIGluIHRoaXMuX2NvbHVtbkZpbHRlcnMpIHtcclxuICAgICAgaWYgKGNvbHVtbklkICYmIHRoaXMuX2NvbHVtbkZpbHRlcnNbY29sdW1uSWRdKSB7XHJcbiAgICAgICAgZGVsZXRlIHRoaXMuX2NvbHVtbkZpbHRlcnNbY29sdW1uSWRdO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gd2UgYWxzbyBuZWVkIHRvIHJlZnJlc2ggdGhlIGRhdGFWaWV3IGFuZCBvcHRpb25hbGx5IHRoZSBncmlkIChpdCdzIG9wdGlvbmFsIHNpbmNlIHdlIHVzZSBEYXRhVmlldylcclxuICAgIGlmICh0aGlzLl9kYXRhVmlldyAmJiB0aGlzLl9ncmlkKSB7XHJcbiAgICAgIHRoaXMuX2RhdGFWaWV3LnJlZnJlc2goKTtcclxuICAgICAgdGhpcy5fZ3JpZC5pbnZhbGlkYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gd2hlbiB1c2luZyBiYWNrZW5kIHNlcnZpY2UsIHdlIG5lZWQgdG8gcXVlcnkgb25seSBvbmNlIHNvIGl0J3MgYmV0dGVyIHRvIGRvIGl0IGhlcmVcclxuICAgIGlmICh0aGlzLl9ncmlkT3B0aW9ucyAmJiB0aGlzLl9ncmlkT3B0aW9ucy5iYWNrZW5kU2VydmljZUFwaSkge1xyXG4gICAgICBjb25zdCBjYWxsYmFja0FyZ3MgPSB7IGNsZWFyRmlsdGVyVHJpZ2dlcmVkOiB0cnVlLCBzaG91bGRUcmlnZ2VyUXVlcnk6IHRydWUsIGdyaWQ6IHRoaXMuX2dyaWQsIGNvbHVtbkZpbHRlcnM6IHRoaXMuX2NvbHVtbkZpbHRlcnMgfTtcclxuICAgICAgdGhpcy5leGVjdXRlQmFja2VuZENhbGxiYWNrKHVuZGVmaW5lZCwgY2FsbGJhY2tBcmdzLCBuZXcgRGF0ZSgpLCB0aGlzLl9ncmlkT3B0aW9ucy5iYWNrZW5kU2VydmljZUFwaSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZW1pdCBhbiBldmVudCB3aGVuIGZpbHRlcnMgYXJlIGFsbCBjbGVhcmVkXHJcbiAgICB0aGlzLm9uRmlsdGVyQ2xlYXJlZC5uZXh0KHRydWUpO1xyXG4gIH1cclxuXHJcbiAgY3VzdG9tTG9jYWxGaWx0ZXIoZGF0YVZpZXc6IGFueSwgaXRlbTogYW55LCBhcmdzOiBhbnkpIHtcclxuICAgIGZvciAoY29uc3QgY29sdW1uSWQgb2YgT2JqZWN0LmtleXMoYXJncy5jb2x1bW5GaWx0ZXJzKSkge1xyXG4gICAgICBjb25zdCBjb2x1bW5GaWx0ZXIgPSBhcmdzLmNvbHVtbkZpbHRlcnNbY29sdW1uSWRdO1xyXG4gICAgICBjb25zdCBjb2x1bW5JbmRleCA9IGFyZ3MuZ3JpZC5nZXRDb2x1bW5JbmRleChjb2x1bW5JZCk7XHJcbiAgICAgIGNvbnN0IGNvbHVtbkRlZiA9IGFyZ3MuZ3JpZC5nZXRDb2x1bW5zKClbY29sdW1uSW5kZXhdO1xyXG4gICAgICBpZiAoIWNvbHVtbkRlZikge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gUm93IERldGFpbCBWaWV3IHBsdWdpbiwgaWYgdGhlIHJvdyBpcyBwYWRkaW5nIHdlIGp1c3QgZ2V0IHRoZSB2YWx1ZSB3ZSdyZSBmaWx0ZXJpbmcgb24gZnJvbSBpdCdzIHBhcmVudFxyXG4gICAgICBpZiAodGhpcy5fZ3JpZE9wdGlvbnMuZW5hYmxlUm93RGV0YWlsVmlldykge1xyXG4gICAgICAgIGNvbnN0IG1ldGFkYXRhUHJlZml4ID0gdGhpcy5fZ3JpZE9wdGlvbnMucm93RGV0YWlsVmlldyAmJiB0aGlzLl9ncmlkT3B0aW9ucy5yb3dEZXRhaWxWaWV3LmtleVByZWZpeCB8fCAnX18nO1xyXG4gICAgICAgIGlmIChpdGVtW2Ake21ldGFkYXRhUHJlZml4fWlzUGFkZGluZ2BdICYmIGl0ZW1bYCR7bWV0YWRhdGFQcmVmaXh9cGFyZW50YF0pIHtcclxuICAgICAgICAgIGl0ZW0gPSBpdGVtW2Ake21ldGFkYXRhUHJlZml4fXBhcmVudGBdO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgZGF0YUtleSA9IGNvbHVtbkRlZi5kYXRhS2V5O1xyXG4gICAgICBjb25zdCBmaWVsZE5hbWUgPSBjb2x1bW5EZWYucXVlcnlGaWVsZCB8fCBjb2x1bW5EZWYucXVlcnlGaWVsZEZpbHRlciB8fCBjb2x1bW5EZWYuZmllbGQ7XHJcbiAgICAgIGNvbnN0IGZpZWxkVHlwZSA9IGNvbHVtbkRlZi50eXBlIHx8IEZpZWxkVHlwZS5zdHJpbmc7XHJcbiAgICAgIGNvbnN0IGZpbHRlclNlYXJjaFR5cGUgPSAoY29sdW1uRGVmLmZpbHRlclNlYXJjaFR5cGUpID8gY29sdW1uRGVmLmZpbHRlclNlYXJjaFR5cGUgOiBudWxsO1xyXG4gICAgICBsZXQgY2VsbFZhbHVlID0gaXRlbVtmaWVsZE5hbWVdO1xyXG5cclxuICAgICAgLy8gd2hlbiBpdGVtIGlzIGEgY29tcGxleCBvYmplY3QgKGRvdCBcIi5cIiBub3RhdGlvbiksIHdlIG5lZWQgdG8gZmlsdGVyIHRoZSB2YWx1ZSBjb250YWluZWQgaW4gdGhlIG9iamVjdCB0cmVlXHJcbiAgICAgIGlmIChmaWVsZE5hbWUuaW5kZXhPZignLicpID49IDApIHtcclxuICAgICAgICBjZWxsVmFsdWUgPSBnZXREZXNjZW5kYW50UHJvcGVydHkoaXRlbSwgZmllbGROYW1lKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gaWYgd2UgZmluZCBzZWFyY2hUZXJtcyB1c2UgdGhlbSBidXQgbWFrZSBhIGRlZXAgY29weSBzbyB0aGF0IHdlIGRvbid0IGFmZmVjdCBvcmlnaW5hbCBhcnJheVxyXG4gICAgICAvLyB3ZSBtaWdodCBoYXZlIHRvIG92ZXJ3cml0ZSB0aGUgdmFsdWUocykgbG9jYWxseSB0aGF0IGFyZSByZXR1cm5lZFxyXG4gICAgICAvLyBlLmc6IHdlIGRvbid0IHdhbnQgdG8gb3BlcmF0b3Igd2l0aGluIHRoZSBzZWFyY2ggdmFsdWUsIHNpbmNlIGl0IHdpbGwgZmFpbCBmaWx0ZXIgY29uZGl0aW9uIGNoZWNrIHRyaWdnZXIgYWZ0ZXJ3YXJkXHJcbiAgICAgIGNvbnN0IHNlYXJjaFZhbHVlcyA9IChjb2x1bW5GaWx0ZXIgJiYgY29sdW1uRmlsdGVyLnNlYXJjaFRlcm1zKSA/ICQuZXh0ZW5kKHRydWUsIFtdLCBjb2x1bW5GaWx0ZXIuc2VhcmNoVGVybXMpIDogbnVsbDtcclxuXHJcbiAgICAgIGxldCBmaWVsZFNlYXJjaFZhbHVlID0gKEFycmF5LmlzQXJyYXkoc2VhcmNoVmFsdWVzKSAmJiBzZWFyY2hWYWx1ZXMubGVuZ3RoID09PSAxKSA/IHNlYXJjaFZhbHVlc1swXSA6ICcnO1xyXG5cclxuICAgICAgbGV0IG1hdGNoZXMgPSBudWxsO1xyXG4gICAgICBpZiAoZmllbGRUeXBlICE9PSBGaWVsZFR5cGUub2JqZWN0KSB7XHJcbiAgICAgICAgZmllbGRTZWFyY2hWYWx1ZSA9ICcnICsgZmllbGRTZWFyY2hWYWx1ZTsgLy8gbWFrZSBzdXJlIGl0J3MgYSBzdHJpbmdcclxuICAgICAgICBtYXRjaGVzID0gZmllbGRTZWFyY2hWYWx1ZS5tYXRjaCgvXihbPD4hPVxcKl17MCwyfSkoLipbXjw+IT1cXCpdKShbXFwqXT8pJC8pOyAvLyBncm91cCAxOiBPcGVyYXRvciwgMjogc2VhcmNoVmFsdWUsIDM6IGxhc3QgY2hhciBpcyAnKicgKG1lYW5pbmcgc3RhcnRzIHdpdGgsIGV4LjogYWJjKilcclxuICAgICAgfVxyXG5cclxuICAgICAgbGV0IG9wZXJhdG9yID0gY29sdW1uRmlsdGVyLm9wZXJhdG9yIHx8ICgobWF0Y2hlcykgPyBtYXRjaGVzWzFdIDogJycpO1xyXG4gICAgICBjb25zdCBzZWFyY2hUZXJtID0gKCEhbWF0Y2hlcykgPyBtYXRjaGVzWzJdIDogJyc7XHJcbiAgICAgIGNvbnN0IGxhc3RWYWx1ZUNoYXIgPSAoISFtYXRjaGVzKSA/IG1hdGNoZXNbM10gOiAob3BlcmF0b3IgPT09ICcqeicgPyAnKicgOiAnJyk7XHJcblxyXG4gICAgICBpZiAoc2VhcmNoVmFsdWVzICYmIHNlYXJjaFZhbHVlcy5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgZmllbGRTZWFyY2hWYWx1ZSA9IHNlYXJjaFZhbHVlcy5qb2luKCcsJyk7XHJcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGZpZWxkU2VhcmNoVmFsdWUgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgLy8gZXNjYXBpbmcgdGhlIHNlYXJjaCB2YWx1ZVxyXG4gICAgICAgIGZpZWxkU2VhcmNoVmFsdWUgPSBmaWVsZFNlYXJjaFZhbHVlLnJlcGxhY2UoYCdgLCBgJydgKTsgLy8gZXNjYXBlIHNpbmdsZSBxdW90ZXMgYnkgZG91YmxpbmcgdGhlbVxyXG4gICAgICAgIGlmIChvcGVyYXRvciA9PT0gJyonIHx8IG9wZXJhdG9yID09PSAnYSonIHx8IG9wZXJhdG9yID09PSAnKnonIHx8IGxhc3RWYWx1ZUNoYXIgPT09ICcqJykge1xyXG4gICAgICAgICAgb3BlcmF0b3IgPSAob3BlcmF0b3IgPT09ICcqJyB8fCBvcGVyYXRvciA9PT0gJyp6JykgPyBPcGVyYXRvclR5cGUuZW5kc1dpdGggOiBPcGVyYXRvclR5cGUuc3RhcnRzV2l0aDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIG5vIG5lZWQgdG8gcXVlcnkgaWYgc2VhcmNoIHZhbHVlIGlzIGVtcHR5XHJcbiAgICAgIGlmIChzZWFyY2hUZXJtID09PSAnJyAmJiAoIXNlYXJjaFZhbHVlcyB8fCAoQXJyYXkuaXNBcnJheShzZWFyY2hWYWx1ZXMpICYmIHNlYXJjaFZhbHVlcy5sZW5ndGggPT09IDApKSkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBpZiBzZWFyY2ggdmFsdWUgaGFzIGEgcmVnZXggbWF0Y2ggd2Ugd2lsbCBvbmx5IGtlZXAgdGhlIHZhbHVlIHdpdGhvdXQgdGhlIG9wZXJhdG9yXHJcbiAgICAgIC8vIGluIHRoaXMgY2FzZSB3ZSBuZWVkIHRvIG92ZXJ3cml0ZSB0aGUgcmV0dXJuZWQgc2VhcmNoIHZhbHVlcyB0byB0cnVuY2F0ZSBvcGVyYXRvciBmcm9tIHRoZSBzdHJpbmcgc2VhcmNoXHJcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KG1hdGNoZXMpICYmIG1hdGNoZXMubGVuZ3RoID49IDEgJiYgKEFycmF5LmlzQXJyYXkoc2VhcmNoVmFsdWVzKSAmJiBzZWFyY2hWYWx1ZXMubGVuZ3RoID09PSAxKSkge1xyXG4gICAgICAgIHNlYXJjaFZhbHVlc1swXSA9IHNlYXJjaFRlcm07XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIGZpbHRlciBzZWFyY2ggdGVybXMgc2hvdWxkIGFsd2F5cyBiZSBzdHJpbmcgdHlwZSAoZXZlbiB0aG91Z2ggd2UgcGVybWl0IHRoZSBlbmQgdXNlciB0byBpbnB1dCBudW1iZXJzKVxyXG4gICAgICAvLyBzbyBtYWtlIHN1cmUgZWFjaCB0ZXJtIGFyZSBzdHJpbmdzLCBpZiB1c2VyIGhhcyBzb21lIGRlZmF1bHQgc2VhcmNoIHRlcm1zLCB3ZSB3aWxsIGNhc3QgdGhlbSB0byBzdHJpbmdcclxuICAgICAgaWYgKHNlYXJjaFZhbHVlcyAmJiBBcnJheS5pc0FycmF5KHNlYXJjaFZhbHVlcykgJiYgZmllbGRUeXBlICE9PSBGaWVsZFR5cGUub2JqZWN0KSB7XHJcbiAgICAgICAgZm9yIChsZXQgayA9IDAsIGxuID0gc2VhcmNoVmFsdWVzLmxlbmd0aDsgayA8IGxuOyBrKyspIHtcclxuICAgICAgICAgIC8vIG1ha2Ugc3VyZSBhbGwgc2VhcmNoIHRlcm1zIGFyZSBzdHJpbmdzXHJcbiAgICAgICAgICBzZWFyY2hWYWx1ZXNba10gPSAoKHNlYXJjaFZhbHVlc1trXSA9PT0gdW5kZWZpbmVkIHx8IHNlYXJjaFZhbHVlc1trXSA9PT0gbnVsbCkgPyAnJyA6IHNlYXJjaFZhbHVlc1trXSkgKyAnJztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIHdoZW4gdXNpbmcgbG9jYWxpemF0aW9uIChpMThuKSwgd2Ugc2hvdWxkIHVzZSB0aGUgZm9ybWF0dGVyIG91dHB1dCB0byBzZWFyY2ggYXMgdGhlIG5ldyBjZWxsIHZhbHVlXHJcbiAgICAgIGlmIChjb2x1bW5EZWYgJiYgY29sdW1uRGVmLnBhcmFtcyAmJiBjb2x1bW5EZWYucGFyYW1zLnVzZUZvcm1hdHRlck91cHV0VG9GaWx0ZXIpIHtcclxuICAgICAgICBjb25zdCByb3dJbmRleCA9IChkYXRhVmlldyAmJiB0eXBlb2YgZGF0YVZpZXcuZ2V0SWR4QnlJZCA9PT0gJ2Z1bmN0aW9uJykgPyBkYXRhVmlldy5nZXRJZHhCeUlkKGl0ZW0uaWQpIDogMDtcclxuICAgICAgICBjZWxsVmFsdWUgPSBjb2x1bW5EZWYuZm9ybWF0dGVyKHJvd0luZGV4LCBjb2x1bW5JbmRleCwgY2VsbFZhbHVlLCBjb2x1bW5EZWYsIGl0ZW0sIHRoaXMuX2dyaWQpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBtYWtlIHN1cmUgY2VsbCB2YWx1ZSBpcyBhbHdheXMgYSBzdHJpbmdcclxuICAgICAgaWYgKHR5cGVvZiBjZWxsVmFsdWUgPT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgY2VsbFZhbHVlID0gY2VsbFZhbHVlLnRvU3RyaW5nKCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IGNvbmRpdGlvbk9wdGlvbnMgPSB7XHJcbiAgICAgICAgZGF0YUtleSxcclxuICAgICAgICBmaWVsZFR5cGUsXHJcbiAgICAgICAgc2VhcmNoVGVybXM6IHNlYXJjaFZhbHVlcyxcclxuICAgICAgICBjZWxsVmFsdWUsXHJcbiAgICAgICAgb3BlcmF0b3IsXHJcbiAgICAgICAgY2VsbFZhbHVlTGFzdENoYXI6IGxhc3RWYWx1ZUNoYXIsXHJcbiAgICAgICAgZmlsdGVyU2VhcmNoVHlwZVxyXG4gICAgICB9O1xyXG5cclxuICAgICAgaWYgKCFGaWx0ZXJDb25kaXRpb25zLmV4ZWN1dGVNYXBwZWRDb25kaXRpb24oY29uZGl0aW9uT3B0aW9ucykpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIGRpc3Bvc2UoKSB7XHJcbiAgICB0aGlzLmRpc3Bvc2VDb2x1bW5GaWx0ZXJzKCk7XHJcblxyXG4gICAgLy8gdW5zdWJzY3JpYmUgYWxsIFNsaWNrR3JpZCBldmVudHNcclxuICAgIHRoaXMuX2V2ZW50SGFuZGxlci51bnN1YnNjcmliZUFsbCgpO1xyXG5cclxuICAgIC8vIHVuc3Vic2NyaWJlIGxvY2FsIGV2ZW50XHJcbiAgICBpZiAodGhpcy5fc2xpY2tTdWJzY3JpYmVyICYmIHR5cGVvZiB0aGlzLl9zbGlja1N1YnNjcmliZXIudW5zdWJzY3JpYmUgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgdGhpcy5fc2xpY2tTdWJzY3JpYmVyLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEaXNwb3NlIG9mIHRoZSBmaWx0ZXJzLCBzaW5jZSBpdCdzIGEgc2luZ2xldG9uLCB3ZSBkb24ndCB3YW50IHRvIGFmZmVjdCBvdGhlciBncmlkcyB3aXRoIHNhbWUgY29sdW1uc1xyXG4gICAqL1xyXG4gIGRpc3Bvc2VDb2x1bW5GaWx0ZXJzKCkge1xyXG4gICAgLy8gd2UgbmVlZCB0byBsb29wIHRocm91Z2ggYWxsIGNvbHVtbkZpbHRlcnMgYW5kIGRlbGV0ZSB0aGVtIDEgYnkgMVxyXG4gICAgLy8gb25seSB0cnlpbmcgdG8gbWFrZSBjb2x1bW5GaWx0ZXIgYW4gZW1wdHkgKHdpdGhvdXQgbG9vcGluZykgd291bGQgbm90IHRyaWdnZXIgYSBkYXRhc2V0IGNoYW5nZVxyXG4gICAgZm9yIChjb25zdCBjb2x1bW5JZCBpbiB0aGlzLl9jb2x1bW5GaWx0ZXJzKSB7XHJcbiAgICAgIGlmIChjb2x1bW5JZCAmJiB0aGlzLl9jb2x1bW5GaWx0ZXJzW2NvbHVtbklkXSkge1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLl9jb2x1bW5GaWx0ZXJzW2NvbHVtbklkXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGFsc28gZGVzdHJveSBlYWNoIEZpbHRlciBpbnN0YW5jZXNcclxuICAgIHRoaXMuX2ZpbHRlcnMuZm9yRWFjaCgoZmlsdGVyLCBpbmRleCkgPT4ge1xyXG4gICAgICBpZiAoZmlsdGVyICYmIGZpbHRlci5kZXN0cm95KSB7XHJcbiAgICAgICAgZmlsdGVyLmRlc3Ryb3kodHJ1ZSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0Q29sdW1uRmlsdGVycygpIHtcclxuICAgIHJldHVybiB0aGlzLl9jb2x1bW5GaWx0ZXJzO1xyXG4gIH1cclxuXHJcbiAgZ2V0Q3VycmVudExvY2FsRmlsdGVycygpOiBDdXJyZW50RmlsdGVyW10ge1xyXG4gICAgY29uc3QgY3VycmVudEZpbHRlcnM6IEN1cnJlbnRGaWx0ZXJbXSA9IFtdO1xyXG4gICAgaWYgKHRoaXMuX2NvbHVtbkZpbHRlcnMpIHtcclxuICAgICAgZm9yIChjb25zdCBjb2xJZCBvZiBPYmplY3Qua2V5cyh0aGlzLl9jb2x1bW5GaWx0ZXJzKSkge1xyXG4gICAgICAgIGNvbnN0IGNvbHVtbkZpbHRlciA9IHRoaXMuX2NvbHVtbkZpbHRlcnNbY29sSWRdO1xyXG4gICAgICAgIGNvbnN0IGZpbHRlciA9IHsgY29sdW1uSWQ6IGNvbElkIHx8ICcnIH0gYXMgQ3VycmVudEZpbHRlcjtcclxuXHJcbiAgICAgICAgaWYgKGNvbHVtbkZpbHRlciAmJiBjb2x1bW5GaWx0ZXIuc2VhcmNoVGVybXMpIHtcclxuICAgICAgICAgIGZpbHRlci5zZWFyY2hUZXJtcyA9IGNvbHVtbkZpbHRlci5zZWFyY2hUZXJtcztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNvbHVtbkZpbHRlci5vcGVyYXRvcikge1xyXG4gICAgICAgICAgZmlsdGVyLm9wZXJhdG9yID0gY29sdW1uRmlsdGVyLm9wZXJhdG9yO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShmaWx0ZXIuc2VhcmNoVGVybXMpICYmIGZpbHRlci5zZWFyY2hUZXJtcy5sZW5ndGggPiAwICYmIGZpbHRlci5zZWFyY2hUZXJtc1swXSAhPT0gJycpIHtcclxuICAgICAgICAgIGN1cnJlbnRGaWx0ZXJzLnB1c2goZmlsdGVyKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBjdXJyZW50RmlsdGVycztcclxuICB9XHJcblxyXG4gIGNhbGxiYWNrU2VhcmNoRXZlbnQoZTogS2V5Ym9hcmRFdmVudCB8IHVuZGVmaW5lZCwgYXJnczogRmlsdGVyQ2FsbGJhY2tBcmcpIHtcclxuICAgIGlmIChhcmdzKSB7XHJcbiAgICAgIGNvbnN0IHNlYXJjaFRlcm0gPSAoKGUgJiYgZS50YXJnZXQpID8gKGUudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlIDogdW5kZWZpbmVkKTtcclxuICAgICAgY29uc3Qgc2VhcmNoVGVybXMgPSAoYXJncy5zZWFyY2hUZXJtcyAmJiBBcnJheS5pc0FycmF5KGFyZ3Muc2VhcmNoVGVybXMpKSA/IGFyZ3Muc2VhcmNoVGVybXMgOiAoc2VhcmNoVGVybSA/IFtzZWFyY2hUZXJtXSA6IHVuZGVmaW5lZCk7XHJcbiAgICAgIGNvbnN0IGNvbHVtbkRlZiA9IGFyZ3MuY29sdW1uRGVmIHx8IG51bGw7XHJcbiAgICAgIGNvbnN0IGNvbHVtbklkID0gY29sdW1uRGVmID8gKGNvbHVtbkRlZi5pZCB8fCAnJykgOiAnJztcclxuICAgICAgY29uc3Qgb3BlcmF0b3IgPSBhcmdzLm9wZXJhdG9yIHx8IHVuZGVmaW5lZDtcclxuICAgICAgY29uc3QgaGFzU2VhcmNoVGVybXMgPSBzZWFyY2hUZXJtcyAmJiBBcnJheS5pc0FycmF5KHNlYXJjaFRlcm1zKTtcclxuICAgICAgY29uc3QgdGVybXNDb3VudCA9IGhhc1NlYXJjaFRlcm1zICYmIHNlYXJjaFRlcm1zLmxlbmd0aDtcclxuICAgICAgY29uc3Qgb2xkQ29sdW1uRmlsdGVycyA9IHsgLi4udGhpcy5fY29sdW1uRmlsdGVycyB9O1xyXG5cclxuICAgICAgaWYgKCFoYXNTZWFyY2hUZXJtcyB8fCB0ZXJtc0NvdW50ID09PSAwIHx8ICh0ZXJtc0NvdW50ID09PSAxICYmIHNlYXJjaFRlcm1zWzBdID09PSAnJykpIHtcclxuICAgICAgICAvLyBkZWxldGUgdGhlIHByb3BlcnR5IGZyb20gdGhlIGNvbHVtbkZpbHRlcnMgd2hlbiBpdCBiZWNvbWVzIGVtcHR5XHJcbiAgICAgICAgLy8gd2l0aG91dCBkb2luZyB0aGlzLCBpdCB3b3VsZCBsZWF2ZSBhbiBpbmNvcnJlY3Qgc3RhdGUgb2YgdGhlIHByZXZpb3VzIGNvbHVtbiBmaWx0ZXJzIHdoZW4gZmlsdGVyaW5nIG9uIGFub3RoZXIgY29sdW1uXHJcbiAgICAgICAgZGVsZXRlIHRoaXMuX2NvbHVtbkZpbHRlcnNbY29sdW1uSWRdO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IGNvbElkID0gJycgKyBjb2x1bW5JZCBhcyBzdHJpbmc7XHJcbiAgICAgICAgY29uc3QgY29sRmlsdGVyOiBDb2x1bW5GaWx0ZXIgPSB7XHJcbiAgICAgICAgICBjb2x1bW5JZDogY29sSWQsXHJcbiAgICAgICAgICBjb2x1bW5EZWYsXHJcbiAgICAgICAgICBzZWFyY2hUZXJtcyxcclxuICAgICAgICB9O1xyXG4gICAgICAgIGlmIChvcGVyYXRvcikge1xyXG4gICAgICAgICAgY29sRmlsdGVyLm9wZXJhdG9yID0gb3BlcmF0b3I7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2NvbHVtbkZpbHRlcnNbY29sSWRdID0gY29sRmlsdGVyO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyB0cmlnZ2VyIGFuIGV2ZW50IG9ubHkgaWYgRmlsdGVycyBjaGFuZ2VkIG9yIGlmIEVOVEVSIGtleSB3YXMgcHJlc3NlZFxyXG4gICAgICBjb25zdCBldmVudEtleUNvZGUgPSBlICYmIGUua2V5Q29kZTtcclxuICAgICAgaWYgKGV2ZW50S2V5Q29kZSA9PT0gS2V5Q29kZS5FTlRFUiB8fCAhaXNlcXVhbChvbGRDb2x1bW5GaWx0ZXJzLCB0aGlzLl9jb2x1bW5GaWx0ZXJzKSkge1xyXG4gICAgICAgIHRoaXMudHJpZ2dlckV2ZW50KHRoaXMuX3NsaWNrU3Vic2NyaWJlciwge1xyXG4gICAgICAgICAgY2xlYXJGaWx0ZXJUcmlnZ2VyZWQ6IGFyZ3MuY2xlYXJGaWx0ZXJUcmlnZ2VyZWQsXHJcbiAgICAgICAgICBzaG91bGRUcmlnZ2VyUXVlcnk6IGFyZ3Muc2hvdWxkVHJpZ2dlclF1ZXJ5LFxyXG4gICAgICAgICAgY29sdW1uSWQsXHJcbiAgICAgICAgICBjb2x1bW5EZWY6IGFyZ3MuY29sdW1uRGVmIHx8IG51bGwsXHJcbiAgICAgICAgICBjb2x1bW5GaWx0ZXJzOiB0aGlzLl9jb2x1bW5GaWx0ZXJzLFxyXG4gICAgICAgICAgb3BlcmF0b3IsXHJcbiAgICAgICAgICBzZWFyY2hUZXJtcyxcclxuICAgICAgICAgIHNlcnZpY2VPcHRpb25zOiB0aGlzLl9vbkZpbHRlckNoYW5nZWRPcHRpb25zLFxyXG4gICAgICAgICAgZ3JpZDogdGhpcy5fZ3JpZFxyXG4gICAgICAgIH0sIGUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhZGRGaWx0ZXJUZW1wbGF0ZVRvSGVhZGVyUm93KGFyZ3M6IHsgY29sdW1uOiBDb2x1bW47IGdyaWQ6IGFueTsgbm9kZTogYW55IH0sIGlzRmlsdGVyRmlyc3RSZW5kZXIgPSB0cnVlKSB7XHJcbiAgICBjb25zdCBjb2x1bW5EZWYgPSBhcmdzLmNvbHVtbjtcclxuICAgIGNvbnN0IGNvbHVtbklkID0gY29sdW1uRGVmLmlkIHx8ICcnO1xyXG5cclxuICAgIGlmIChjb2x1bW5EZWYgJiYgY29sdW1uSWQgIT09ICdzZWxlY3RvcicgJiYgY29sdW1uRGVmLmZpbHRlcmFibGUpIHtcclxuICAgICAgbGV0IHNlYXJjaFRlcm1zOiBTZWFyY2hUZXJtW10gfCB1bmRlZmluZWQ7XHJcbiAgICAgIGxldCBvcGVyYXRvcjogT3BlcmF0b3JTdHJpbmcgfCBPcGVyYXRvclR5cGU7XHJcbiAgICAgIGNvbnN0IGZpbHRlcjogRmlsdGVyIHwgdW5kZWZpbmVkID0gdGhpcy5maWx0ZXJGYWN0b3J5LmNyZWF0ZUZpbHRlcihhcmdzLmNvbHVtbi5maWx0ZXIpO1xyXG4gICAgICBvcGVyYXRvciA9IChjb2x1bW5EZWYgJiYgY29sdW1uRGVmLmZpbHRlciAmJiBjb2x1bW5EZWYuZmlsdGVyLm9wZXJhdG9yKSB8fCAoZmlsdGVyICYmIGZpbHRlci5vcGVyYXRvcikgfHwgdW5kZWZpbmVkO1xyXG5cclxuICAgICAgaWYgKHRoaXMuX2NvbHVtbkZpbHRlcnNbY29sdW1uRGVmLmlkXSkge1xyXG4gICAgICAgIHNlYXJjaFRlcm1zID0gdGhpcy5fY29sdW1uRmlsdGVyc1tjb2x1bW5EZWYuaWRdLnNlYXJjaFRlcm1zIHx8IHVuZGVmaW5lZDtcclxuICAgICAgICBvcGVyYXRvciA9IHRoaXMuX2NvbHVtbkZpbHRlcnNbY29sdW1uRGVmLmlkXS5vcGVyYXRvciB8fCB1bmRlZmluZWQ7XHJcbiAgICAgIH0gZWxzZSBpZiAoY29sdW1uRGVmLmZpbHRlcikge1xyXG4gICAgICAgIC8vIHdoZW4gaGlkaW5nL3Nob3dpbmcgKHdpdGggQ29sdW1uIFBpY2tlciBvciBHcmlkIE1lbnUpLCBpdCB3aWxsIHRyeSB0byByZS1jcmVhdGUgeWV0IGFnYWluIHRoZSBmaWx0ZXJzIChzaW5jZSBTbGlja0dyaWQgZG9lcyBhIHJlLXJlbmRlcilcclxuICAgICAgICAvLyBiZWNhdXNlIG9mIHRoYXQgd2UgbmVlZCB0byBmaXJzdCBnZXQgc2VhcmNoVGVybShzKSBmcm9tIHRoZSBjb2x1bW5GaWx0ZXJzICh0aGF0IGlzIHdoYXQgdGhlIHVzZXIgbGFzdCBlbnRlcmVkKVxyXG4gICAgICAgIHNlYXJjaFRlcm1zID0gY29sdW1uRGVmLmZpbHRlci5zZWFyY2hUZXJtcyB8fCB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy51cGRhdGVDb2x1bW5GaWx0ZXJzKHNlYXJjaFRlcm1zLCBjb2x1bW5EZWYsIG9wZXJhdG9yKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgZmlsdGVyQXJndW1lbnRzOiBGaWx0ZXJBcmd1bWVudHMgPSB7XHJcbiAgICAgICAgZ3JpZDogdGhpcy5fZ3JpZCxcclxuICAgICAgICBvcGVyYXRvcixcclxuICAgICAgICBzZWFyY2hUZXJtcyxcclxuICAgICAgICBjb2x1bW5EZWYsXHJcbiAgICAgICAgY2FsbGJhY2s6IHRoaXMuY2FsbGJhY2tTZWFyY2hFdmVudC5iaW5kKHRoaXMpXHJcbiAgICAgIH07XHJcblxyXG4gICAgICBpZiAoZmlsdGVyKSB7XHJcbiAgICAgICAgZmlsdGVyLmluaXQoZmlsdGVyQXJndW1lbnRzLCBpc0ZpbHRlckZpcnN0UmVuZGVyKTtcclxuICAgICAgICBjb25zdCBmaWx0ZXJFeGlzdEluZGV4ID0gdGhpcy5fZmlsdGVycy5maW5kSW5kZXgoKGZpbHQpID0+IGZpbHRlci5jb2x1bW5EZWYubmFtZSA9PT0gZmlsdC5jb2x1bW5EZWYubmFtZSk7XHJcblxyXG4gICAgICAgIC8vIGFkZCB0byB0aGUgZmlsdGVycyBhcnJheXMgb3IgcmVwbGFjZSBpdCB3aGVuIGZvdW5kXHJcbiAgICAgICAgaWYgKGZpbHRlckV4aXN0SW5kZXggPT09IC0xKSB7XHJcbiAgICAgICAgICB0aGlzLl9maWx0ZXJzLnB1c2goZmlsdGVyKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5fZmlsdGVyc1tmaWx0ZXJFeGlzdEluZGV4XSA9IGZpbHRlcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHdoZW4gaGlkaW5nL3Nob3dpbmcgKHdpdGggQ29sdW1uIFBpY2tlciBvciBHcmlkIE1lbnUpLCBpdCB3aWxsIHRyeSB0byByZS1jcmVhdGUgeWV0IGFnYWluIHRoZSBmaWx0ZXJzIChzaW5jZSBTbGlja0dyaWQgZG9lcyBhIHJlLXJlbmRlcilcclxuICAgICAgICAvLyB3ZSBuZWVkIHRvIGFsc28gc2V0IGFnYWluIHRoZSB2YWx1ZXMgaW4gdGhlIERPTSBlbGVtZW50cyBpZiB0aGUgdmFsdWVzIHdlcmUgc2V0IGJ5IGEgc2VhcmNoVGVybShzKVxyXG4gICAgICAgIGlmIChzZWFyY2hUZXJtcyAmJiBmaWx0ZXIuc2V0VmFsdWVzKSB7XHJcbiAgICAgICAgICBmaWx0ZXIuc2V0VmFsdWVzKHNlYXJjaFRlcm1zKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgc2ltcGxlIGZ1bmN0aW9uIHRoYXQgaXMgYXR0YWNoZWQgdG8gdGhlIHN1YnNjcmliZXIgYW5kIGVtaXQgYSBjaGFuZ2Ugd2hlbiB0aGUgZmlsdGVyIGlzIGNhbGxlZC5cclxuICAgKiBPdGhlciBzZXJ2aWNlcywgbGlrZSBQYWdpbmF0aW9uLCBjYW4gdGhlbiBzdWJzY3JpYmUgdG8gaXQuXHJcbiAgICogQHBhcmFtIGNhbGxlclxyXG4gICAqL1xyXG4gIGVtaXRGaWx0ZXJDaGFuZ2VkKGNhbGxlcjogRW1pdHRlclR5cGUpIHtcclxuICAgIGlmIChjYWxsZXIgPT09IEVtaXR0ZXJUeXBlLnJlbW90ZSAmJiB0aGlzLl9ncmlkT3B0aW9ucyAmJiB0aGlzLl9ncmlkT3B0aW9ucy5iYWNrZW5kU2VydmljZUFwaSkge1xyXG4gICAgICBsZXQgY3VycmVudEZpbHRlcnM6IEN1cnJlbnRGaWx0ZXJbXSA9IFtdO1xyXG4gICAgICBjb25zdCBiYWNrZW5kU2VydmljZSA9IHRoaXMuX2dyaWRPcHRpb25zLmJhY2tlbmRTZXJ2aWNlQXBpLnNlcnZpY2U7XHJcbiAgICAgIGlmIChiYWNrZW5kU2VydmljZSAmJiBiYWNrZW5kU2VydmljZS5nZXRDdXJyZW50RmlsdGVycykge1xyXG4gICAgICAgIGN1cnJlbnRGaWx0ZXJzID0gYmFja2VuZFNlcnZpY2UuZ2V0Q3VycmVudEZpbHRlcnMoKSBhcyBDdXJyZW50RmlsdGVyW107XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5vbkZpbHRlckNoYW5nZWQubmV4dChjdXJyZW50RmlsdGVycyk7XHJcbiAgICB9IGVsc2UgaWYgKGNhbGxlciA9PT0gRW1pdHRlclR5cGUubG9jYWwpIHtcclxuICAgICAgdGhpcy5vbkZpbHRlckNoYW5nZWQubmV4dCh0aGlzLmdldEN1cnJlbnRMb2NhbEZpbHRlcnMoKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGVuIHVzZXIgcGFzc2VzIGFuIGFycmF5IG9mIHByZXNldCBmaWx0ZXJzLCB3ZSBuZWVkIHRvIHByZS1wb3B1bGF0ZSBlYWNoIGNvbHVtbiBmaWx0ZXIgc2VhcmNoVGVybShzKVxyXG4gICAqIFRoZSBwcm9jZXNzIGlzIHRvIGxvb3AgdGhyb3VnaCB0aGUgcHJlc2V0IGZpbHRlcnMgYXJyYXksIGZpbmQgdGhlIGFzc29jaWF0ZWQgY29sdW1uIGZyb20gY29sdW1uRGVmaW5pdGlvbnMgYW5kIGZpbGwgaW4gdGhlIGZpbHRlciBvYmplY3Qgc2VhcmNoVGVybShzKVxyXG4gICAqIFRoaXMgaXMgYmFzaWNhbGx5IHRoZSBzYW1lIGFzIGlmIHdlIHdvdWxkIG1hbnVhbGx5IGFkZCBzZWFyY2hUZXJtKHMpIHRvIGEgY29sdW1uIGZpbHRlciBvYmplY3QgaW4gdGhlIGNvbHVtbiBkZWZpbml0aW9uLCBidXQgd2UgZG8gaXQgcHJvZ3JhbW1hdGljYWxseS5cclxuICAgKiBBdCB0aGUgZW5kIG9mIHRoZSBkYXksIHdoZW4gY3JlYXRpbmcgdGhlIEZpbHRlciAoRE9NIEVsZW1lbnQpLCBpdCB3aWxsIHVzZSB0aGVzZSBzZWFyY2hUZXJtKHMpIHNvIHdlIGNhbiB0YWtlIGFkdmFudGFnZSBvZiB0aGF0IHdpdGhvdXQgcmVjb2RpbmcgZWFjaCBGaWx0ZXIgdHlwZSAoRE9NIGVsZW1lbnQpXHJcbiAgICovXHJcbiAgcG9wdWxhdGVDb2x1bW5GaWx0ZXJTZWFyY2hUZXJtcygpIHtcclxuICAgIGlmICh0aGlzLl9ncmlkT3B0aW9ucy5wcmVzZXRzICYmIEFycmF5LmlzQXJyYXkodGhpcy5fZ3JpZE9wdGlvbnMucHJlc2V0cy5maWx0ZXJzKSAmJiB0aGlzLl9ncmlkT3B0aW9ucy5wcmVzZXRzLmZpbHRlcnMubGVuZ3RoID4gMCkge1xyXG4gICAgICBjb25zdCBmaWx0ZXJzID0gdGhpcy5fZ3JpZE9wdGlvbnMucHJlc2V0cy5maWx0ZXJzO1xyXG4gICAgICB0aGlzLl9jb2x1bW5EZWZpbml0aW9ucy5mb3JFYWNoKChjb2x1bW5EZWY6IENvbHVtbikgPT4ge1xyXG4gICAgICAgIC8vIGNsZWFyIGFueSBjb2x1bW5EZWYgc2VhcmNoVGVybXMgYmVmb3JlIGFwcGx5aW5nIFByZXNldHNcclxuICAgICAgICBpZiAoY29sdW1uRGVmLmZpbHRlciAmJiBjb2x1bW5EZWYuZmlsdGVyLnNlYXJjaFRlcm1zKSB7XHJcbiAgICAgICAgICBkZWxldGUgY29sdW1uRGVmLmZpbHRlci5zZWFyY2hUZXJtcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGZyb20gZWFjaCBwcmVzZXRzLCB3ZSB3aWxsIGZpbmQgdGhlIGFzc29jaWF0ZWQgY29sdW1uRGVmIGFuZCBhcHBseSB0aGUgcHJlc2V0IHNlYXJjaFRlcm1zICYgb3BlcmF0b3IgaWYgdGhlcmUgaXNcclxuICAgICAgICBjb25zdCBjb2x1bW5QcmVzZXQgPSBmaWx0ZXJzLmZpbmQoKHByZXNldEZpbHRlcjogQ3VycmVudEZpbHRlcikgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIHByZXNldEZpbHRlci5jb2x1bW5JZCA9PT0gY29sdW1uRGVmLmlkO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmIChjb2x1bW5QcmVzZXQgJiYgY29sdW1uUHJlc2V0LnNlYXJjaFRlcm1zICYmIEFycmF5LmlzQXJyYXkoY29sdW1uUHJlc2V0LnNlYXJjaFRlcm1zKSkge1xyXG4gICAgICAgICAgY29sdW1uRGVmLmZpbHRlciA9IGNvbHVtbkRlZi5maWx0ZXIgfHwge307XHJcbiAgICAgICAgICBjb2x1bW5EZWYuZmlsdGVyLm9wZXJhdG9yID0gY29sdW1uUHJlc2V0Lm9wZXJhdG9yIHx8IGNvbHVtbkRlZi5maWx0ZXIub3BlcmF0b3IgfHwgJyc7XHJcbiAgICAgICAgICBjb2x1bW5EZWYuZmlsdGVyLnNlYXJjaFRlcm1zID0gY29sdW1uUHJlc2V0LnNlYXJjaFRlcm1zO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHVwZGF0ZUNvbHVtbkZpbHRlcnMoc2VhcmNoVGVybXM6IFNlYXJjaFRlcm1bXSB8IHVuZGVmaW5lZCwgY29sdW1uRGVmOiBhbnksIG9wZXJhdG9yPzogT3BlcmF0b3JUeXBlIHwgT3BlcmF0b3JTdHJpbmcpIHtcclxuICAgIGlmIChzZWFyY2hUZXJtcyAmJiBjb2x1bW5EZWYpIHtcclxuICAgICAgLy8gdGhpcy5fY29sdW1uRmlsdGVycy5zZWFyY2hUZXJtcyA9IHNlYXJjaFRlcm1zO1xyXG4gICAgICB0aGlzLl9jb2x1bW5GaWx0ZXJzW2NvbHVtbkRlZi5pZF0gPSB7XHJcbiAgICAgICAgY29sdW1uSWQ6IGNvbHVtbkRlZi5pZCxcclxuICAgICAgICBjb2x1bW5EZWYsXHJcbiAgICAgICAgc2VhcmNoVGVybXMsXHJcbiAgICAgICAgb3BlcmF0b3JcclxuICAgICAgfTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgdHJpZ2dlckV2ZW50KHNsaWNrRXZlbnQ6IGFueSwgYXJnczogYW55LCBlOiBhbnkpIHtcclxuICAgIHNsaWNrRXZlbnQgPSBzbGlja0V2ZW50IHx8IG5ldyBTbGljay5FdmVudCgpO1xyXG5cclxuICAgIC8vIGV2ZW50IG1pZ2h0IGhhdmUgYmVlbiBjcmVhdGVkIGFzIGEgQ3VzdG9tRXZlbnQgKGUuZy4gQ29tcG91bmREYXRlRmlsdGVyKSwgd2l0aG91dCBiZWluZyBhIHZhbGlkIFNsaWNrLkV2ZW50RGF0YS5cclxuICAgIC8vIGlmIHNvIHdlIHdpbGwgY3JlYXRlIGEgbmV3IFNsaWNrLkV2ZW50RGF0YSBhbmQgbWVyZ2UgaXQgd2l0aCB0aGF0IEN1c3RvbUV2ZW50IHRvIGF2b2lkIGhhdmluZyBTbGlja0dyaWQgZXJyb3JzXHJcbiAgICBsZXQgZXZlbnQgPSBlO1xyXG4gICAgaWYgKGUgJiYgdHlwZW9mIGUuaXNQcm9wYWdhdGlvblN0b3BwZWQgIT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgZXZlbnQgPSAkLmV4dGVuZCh7fSwgbmV3IFNsaWNrLkV2ZW50RGF0YSgpLCBlKTtcclxuICAgIH1cclxuICAgIHNsaWNrRXZlbnQubm90aWZ5KGFyZ3MsIGV2ZW50LCBhcmdzLmdyaWQpO1xyXG4gIH1cclxufVxyXG4iXX0=