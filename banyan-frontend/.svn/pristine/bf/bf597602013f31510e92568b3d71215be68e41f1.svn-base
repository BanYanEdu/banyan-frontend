import * as tslib_1 from "tslib";
import './global-utilities';
import { parseUtcDate } from './utilities';
import { Injectable } from '@angular/core';
import { CaseType, FieldType, SortDirection } from './../models/index';
import { OdataService } from './odata.service';
const DEFAULT_ITEMS_PER_PAGE = 25;
const DEFAULT_PAGE_SIZE = 20;
let GridOdataService = class GridOdataService {
    constructor() {
        this._currentFilters = [];
        this._currentSorters = [];
        this.defaultOptions = {
            top: DEFAULT_ITEMS_PER_PAGE,
            orderBy: '',
            caseType: CaseType.pascalCase
        };
        this.odataService = new OdataService();
    }
    /** Getter for the Grid Options pulled through the Grid Object */
    get _gridOptions() {
        return (this._grid && this._grid.getOptions) ? this._grid.getOptions() : {};
    }
    buildQuery() {
        return this.odataService.buildQuery();
    }
    clearFilters() {
        this._currentFilters = [];
        this.updateOptions({ filteringOptions: [] });
    }
    clearSorters() {
        this._currentSorters = [];
        this.updateOptions({ sortingOptions: [] });
    }
    init(options, pagination, grid) {
        this._grid = grid;
        const mergedOptions = Object.assign({}, this.defaultOptions, options);
        if (pagination && pagination.pageSize) {
            mergedOptions.top = pagination.pageSize;
        }
        this.odataService.options = Object.assign({}, mergedOptions, { top: mergedOptions.top || this.defaultOptions.top });
        this.options = this.odataService.options;
        this.pagination = pagination;
        // save current pagination as Page 1 and page size as "top"
        this._currentPagination = {
            pageNumber: 1,
            pageSize: this.odataService.options.top || this.defaultOptions.top
        };
        if (grid && grid.getColumns) {
            this._columnDefinitions = (options && options.columnDefinitions) || grid.getColumns();
            this._columnDefinitions = this._columnDefinitions.filter((column) => !column.excludeFromQuery);
        }
    }
    updateOptions(serviceOptions) {
        this.options = Object.assign({}, this.options, serviceOptions);
    }
    removeColumnFilter(fieldName) {
        this.odataService.removeColumnFilter(fieldName);
    }
    /** Get the Filters that are currently used by the grid */
    getCurrentFilters() {
        return this._currentFilters;
    }
    /** Get the Pagination that is currently used by the grid */
    getCurrentPagination() {
        return this._currentPagination;
    }
    /** Get the Sorters that are currently used by the grid */
    getCurrentSorters() {
        return this._currentSorters;
    }
    /*
     * Reset the pagination options
     */
    resetPaginationOptions() {
        this.odataService.updateOptions({
            skip: 0
        });
    }
    saveColumnFilter(fieldName, value, terms) {
        this.odataService.saveColumnFilter(fieldName, value, terms);
    }
    /*
     * FILTERING
     */
    processOnFilterChanged(event, args) {
        const serviceOptions = args.grid.getOptions();
        const backendApi = serviceOptions.backendServiceApi;
        if (backendApi === undefined) {
            throw new Error('Something went wrong in the GridOdataService, "backendServiceApi" is not initialized');
        }
        // keep current filters & always save it as an array (columnFilters can be an object when it is dealt by SlickGrid Filter)
        this._currentFilters = this.castFilterToColumnFilter(args.columnFilters);
        const promise = new Promise((resolve, reject) => {
            // loop through all columns to inspect filters & set the query
            this.updateFilters(args.columnFilters);
            this.resetPaginationOptions();
            resolve(this.odataService.buildQuery());
        });
        return promise;
    }
    /*
     * PAGINATION
     */
    processOnPaginationChanged(event, args) {
        const pageSize = +(args.pageSize || DEFAULT_PAGE_SIZE);
        this.updatePagination(args.newPage, pageSize);
        // build the OData query which we will use in the WebAPI callback
        return this.odataService.buildQuery();
    }
    /*
     * SORTING
     */
    processOnSortChanged(event, args) {
        const sortColumns = (args.multiColumnSort) ? args.sortCols : new Array({ sortCol: args.sortCol, sortAsc: args.sortAsc });
        // loop through all columns to inspect sorters & set the query
        this.updateSorters(sortColumns);
        // build the OData query which we will use in the WebAPI callback
        return this.odataService.buildQuery();
    }
    /**
     * loop through all columns to inspect filters & update backend service filteringOptions
     * @param columnFilters
     */
    updateFilters(columnFilters, isUpdatedByPreset) {
        let searchBy = '';
        const searchByArray = [];
        // on filter preset load, we need to keep current filters
        if (isUpdatedByPreset) {
            this._currentFilters = this.castFilterToColumnFilter(columnFilters);
        }
        // loop through all columns to inspect filters
        for (const columnId in columnFilters) {
            if (columnFilters.hasOwnProperty(columnId)) {
                const columnFilter = columnFilters[columnId];
                // if user defined some "presets", then we need to find the filters from the column definitions instead
                let columnDef;
                if (isUpdatedByPreset && Array.isArray(this._columnDefinitions)) {
                    columnDef = this._columnDefinitions.find((column) => {
                        return column.id === columnFilter.columnId;
                    });
                }
                else {
                    columnDef = columnFilter.columnDef;
                }
                if (!columnDef) {
                    throw new Error('[Backend Service API]: Something went wrong in trying to get the column definition of the specified filter (or preset filters). Did you make a typo on the filter columnId?');
                }
                let fieldName = columnDef.queryField || columnDef.queryFieldFilter || columnDef.field || columnDef.name || '';
                const fieldType = columnDef.type || 'string';
                const searchTerms = (columnFilter ? columnFilter.searchTerms : null) || [];
                let fieldSearchValue = (Array.isArray(searchTerms) && searchTerms.length === 1) ? searchTerms[0] : '';
                if (typeof fieldSearchValue === 'undefined') {
                    fieldSearchValue = '';
                }
                if (typeof fieldSearchValue !== 'string' && !searchTerms) {
                    throw new Error(`ODdata filter searchTerm property must be provided as type "string", if you use filter with options then make sure your IDs are also string. For example: filter: {model: Filters.select, collection: [{ id: "0", value: "0" }, { id: "1", value: "1" }]`);
                }
                fieldSearchValue = '' + fieldSearchValue; // make sure it's a string
                const matches = fieldSearchValue.match(/^([<>!=\*]{0,2})(.*[^<>!=\*])([\*]?)$/); // group 1: Operator, 2: searchValue, 3: last char is '*' (meaning starts with, ex.: abc*)
                const operator = columnFilter.operator || ((matches) ? matches[1] : '');
                let searchValue = (!!matches) ? matches[2] : '';
                const lastValueChar = (!!matches) ? matches[3] : (operator === '*z' ? '*' : '');
                const bypassOdataQuery = columnFilter.bypassBackendQuery || false;
                // no need to query if search value is empty
                if (fieldName && searchValue === '' && searchTerms.length === 0) {
                    this.removeColumnFilter(fieldName);
                    continue;
                }
                // escaping the search value
                searchValue = searchValue.replace(`'`, `''`); // escape single quotes by doubling them
                searchValue = encodeURIComponent(searchValue); // encode URI of the final search value
                // extra query arguments
                if (bypassOdataQuery) {
                    // push to our temp array and also trim white spaces
                    if (fieldName) {
                        this.saveColumnFilter(fieldName, fieldSearchValue, searchTerms);
                    }
                }
                else {
                    searchBy = '';
                    // titleCase the fieldName so that it matches the WebApi names
                    if (this.odataService.options.caseType === CaseType.pascalCase) {
                        fieldName = String.titleCase(fieldName || '');
                    }
                    // when having more than 1 search term (then check if we have a "IN" or "NOT IN" filter search)
                    if (searchTerms && searchTerms.length > 1) {
                        const tmpSearchTerms = [];
                        if (operator === 'IN') {
                            // example:: (Stage eq "Expired" or Stage eq "Renewal")
                            for (let j = 0, lnj = searchTerms.length; j < lnj; j++) {
                                tmpSearchTerms.push(`${fieldName} eq '${searchTerms[j]}'`);
                            }
                            searchBy = tmpSearchTerms.join(' or ');
                            searchBy = `(${searchBy})`;
                        }
                        else if (operator === 'NIN' || operator === 'NOTIN' || operator === 'NOT IN') {
                            // example:: (Stage ne "Expired" and Stage ne "Renewal")
                            for (let k = 0, lnk = searchTerms.length; k < lnk; k++) {
                                tmpSearchTerms.push(`${fieldName} ne '${searchTerms[k]}'`);
                            }
                            searchBy = tmpSearchTerms.join(' and ');
                            searchBy = `(${searchBy})`;
                        }
                    }
                    else if (operator === '*' || operator === 'a*' || operator === '*z' || lastValueChar !== '') {
                        // first/last character is a '*' will be a startsWith or endsWith
                        searchBy = (operator === '*' || operator === '*z')
                            ? `endswith(${fieldName}, '${searchValue}')`
                            : `startswith(${fieldName}, '${searchValue}')`;
                    }
                    else if (fieldType === FieldType.date) {
                        // date field needs to be UTC and within DateTime function
                        const dateFormatted = parseUtcDate(searchValue, true);
                        if (dateFormatted) {
                            searchBy = `${fieldName} ${this.mapOdataOperator(operator)} DateTime'${dateFormatted}'`;
                        }
                    }
                    else if (fieldType === FieldType.string) {
                        // string field needs to be in single quotes
                        if (operator === '') {
                            searchBy = `substringof('${searchValue}', ${fieldName})`;
                        }
                        else {
                            // searchBy = `substringof('${searchValue}', ${fieldNameCased}) ${this.mapOdataOperator(operator)} true`;
                            searchBy = `${fieldName} ${this.mapOdataOperator(operator)} '${searchValue}'`;
                        }
                    }
                    else {
                        // any other field type (or undefined type)
                        searchValue = fieldType === FieldType.number ? searchValue : `'${searchValue}'`;
                        searchBy = `${fieldName} ${this.mapOdataOperator(operator)} ${searchValue}`;
                    }
                    // push to our temp array and also trim white spaces
                    if (searchBy !== '') {
                        searchByArray.push(String.trim(searchBy));
                        this.saveColumnFilter(fieldName || '', fieldSearchValue, searchTerms);
                    }
                }
            }
        }
        // update the service options with filters for the buildQuery() to work later
        this.odataService.updateOptions({
            filter: (searchByArray.length > 0) ? searchByArray.join(' and ') : '',
            skip: undefined
        });
    }
    /**
     * Update the pagination component with it's new page number and size
     * @param newPage
     * @param pageSize
     */
    updatePagination(newPage, pageSize) {
        this._currentPagination = {
            pageNumber: newPage,
            pageSize
        };
        this.odataService.updateOptions({
            top: pageSize,
            skip: (newPage - 1) * pageSize
        });
    }
    /**
     * loop through all columns to inspect sorters & update backend service orderBy
     * @param columnFilters
     */
    updateSorters(sortColumns, presetSorters) {
        let sortByArray = [];
        const sorterArray = [];
        if (!sortColumns && presetSorters) {
            // make the presets the current sorters, also make sure that all direction are in lowercase for OData
            sortByArray = presetSorters;
            sortByArray.forEach((sorter) => sorter.direction = sorter.direction.toLowerCase());
            // display the correct sorting icons on the UI, for that it requires (columnId, sortAsc) properties
            const tmpSorterArray = sortByArray.map((sorter) => {
                const columnDef = this._columnDefinitions.find((column) => column.id === sorter.columnId);
                sorterArray.push({
                    columnId: columnDef ? ((columnDef.queryField || columnDef.queryFieldSorter || columnDef.field || columnDef.id) + '') : (sorter.columnId + ''),
                    direction: sorter.direction
                });
                // return only the column(s) found in the Column Definitions ELSE null
                if (columnDef) {
                    return {
                        columnId: sorter.columnId,
                        sortAsc: sorter.direction.toUpperCase() === SortDirection.ASC
                    };
                }
                return null;
            });
            this._grid.setSortColumns(tmpSorterArray);
        }
        else if (sortColumns && !presetSorters) {
            // build the SortBy string, it could be multisort, example: customerNo asc, purchaserName desc
            if (sortColumns && sortColumns.length === 0) {
                sortByArray = new Array(this.defaultOptions.orderBy); // when empty, use the default sort
            }
            else {
                if (sortColumns) {
                    for (const columnDef of sortColumns) {
                        if (columnDef.sortCol) {
                            let fieldName = (columnDef.sortCol.queryField || columnDef.sortCol.queryFieldSorter || columnDef.sortCol.field || columnDef.sortCol.id) + '';
                            let columnFieldName = (columnDef.sortCol.field || columnDef.sortCol.id) + '';
                            if (this.odataService.options.caseType === CaseType.pascalCase) {
                                fieldName = String.titleCase(fieldName);
                                columnFieldName = String.titleCase(columnFieldName);
                            }
                            sorterArray.push({
                                columnId: columnFieldName,
                                direction: columnDef.sortAsc ? 'asc' : 'desc'
                            });
                        }
                    }
                    sortByArray = sorterArray;
                }
            }
        }
        // transform the sortby array into a CSV string for OData
        sortByArray = sortByArray || [];
        const csvString = sortByArray.map((sorter) => {
            if (sorter && sorter.columnId) {
                return `${sorter.columnId} ${sorter && sorter.direction && sorter.direction.toLowerCase() || ''}`;
            }
            return '';
        }).join(',');
        this.odataService.updateOptions({
            orderBy: (this.odataService.options.caseType === CaseType.pascalCase) ? String.titleCase(csvString) : csvString
        });
        // keep current Sorters and update the service options with the new sorting
        this._currentSorters = sortByArray;
        // build the OData query which we will use in the WebAPI callback
        return this.odataService.buildQuery();
    }
    //
    // private functions
    // -------------------
    /**
     * Cast provided filters (could be in multiple format) into an array of ColumnFilter
     * @param columnFilters
     */
    castFilterToColumnFilter(columnFilters) {
        // keep current filters & always save it as an array (columnFilters can be an object when it is dealt by SlickGrid Filter)
        const filtersArray = ((typeof columnFilters === 'object') ? Object.keys(columnFilters).map(key => columnFilters[key]) : columnFilters);
        return filtersArray.map((filter) => {
            const columnDef = filter.columnDef;
            const tmpFilter = { columnId: filter.columnId || '' };
            if (filter.operator) {
                tmpFilter.operator = filter.operator;
            }
            if (Array.isArray(filter.searchTerms)) {
                tmpFilter.searchTerms = filter.searchTerms;
            }
            return tmpFilter;
        });
    }
    /**
     * Mapper for mathematical operators (ex.: <= is "le", > is "gt")
     * @param string operator
     * @returns string map
     */
    mapOdataOperator(operator) {
        let map = '';
        switch (operator) {
            case '<':
                map = 'lt';
                break;
            case '<=':
                map = 'le';
                break;
            case '>':
                map = 'gt';
                break;
            case '>=':
                map = 'ge';
                break;
            case '<>':
            case '!=':
                map = 'ne';
                break;
            case '=':
            case '==':
            default:
                map = 'eq';
                break;
        }
        return map;
    }
};
GridOdataService = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [])
], GridOdataService);
export { GridOdataService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC1vZGF0YS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9zZXJ2aWNlcy9ncmlkLW9kYXRhLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sb0JBQW9CLENBQUM7QUFDNUIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUMzQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFFTCxRQUFRLEVBU1IsU0FBUyxFQU1ULGFBQWEsRUFFZCxNQUFNLG1CQUFtQixDQUFDO0FBQzNCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxNQUFNLHNCQUFzQixHQUFHLEVBQUUsQ0FBQztBQUNsQyxNQUFNLGlCQUFpQixHQUFHLEVBQUUsQ0FBQztBQUc3QixJQUFhLGdCQUFnQixHQUE3QixNQUFhLGdCQUFnQjtJQWUzQjtRQWRRLG9CQUFlLEdBQW9CLEVBQUUsQ0FBQztRQUV0QyxvQkFBZSxHQUFvQixFQUFFLENBQUM7UUFNOUMsbUJBQWMsR0FBZ0I7WUFDNUIsR0FBRyxFQUFFLHNCQUFzQjtZQUMzQixPQUFPLEVBQUUsRUFBRTtZQUNYLFFBQVEsRUFBRSxRQUFRLENBQUMsVUFBVTtTQUM5QixDQUFDO1FBR0EsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBQ3pDLENBQUM7SUFFRCxpRUFBaUU7SUFDakUsSUFBWSxZQUFZO1FBQ3RCLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUM5RSxDQUFDO0lBRUQsVUFBVTtR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QUFFOztHQUNBLGdCQUFnQixDQSthNUI7U0EvYVksZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICcuL2dsb2JhbC11dGlsaXRpZXMnO1xyXG5pbXBvcnQgeyBwYXJzZVV0Y0RhdGUgfSBmcm9tICcuL3V0aWxpdGllcyc7XHJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtcclxuICBCYWNrZW5kU2VydmljZSxcclxuICBDYXNlVHlwZSxcclxuICBDb2x1bW4sXHJcbiAgQ29sdW1uRmlsdGVyLFxyXG4gIENvbHVtbkZpbHRlcnMsXHJcbiAgQ29sdW1uU29ydCxcclxuICBDdXJyZW50RmlsdGVyLFxyXG4gIEN1cnJlbnRQYWdpbmF0aW9uLFxyXG4gIEN1cnJlbnRTb3J0ZXIsXHJcbiAgRmlsdGVyQ2hhbmdlZEFyZ3MsXHJcbiAgRmllbGRUeXBlLFxyXG4gIEdyaWRPcHRpb24sXHJcbiAgT2RhdGFPcHRpb24sXHJcbiAgUGFnaW5hdGlvbixcclxuICBQYWdpbmF0aW9uQ2hhbmdlZEFyZ3MsXHJcbiAgU29ydENoYW5nZWRBcmdzLFxyXG4gIFNvcnREaXJlY3Rpb24sXHJcbiAgU29ydERpcmVjdGlvblN0cmluZ1xyXG59IGZyb20gJy4vLi4vbW9kZWxzL2luZGV4JztcclxuaW1wb3J0IHsgT2RhdGFTZXJ2aWNlIH0gZnJvbSAnLi9vZGF0YS5zZXJ2aWNlJztcclxuXHJcbmNvbnN0IERFRkFVTFRfSVRFTVNfUEVSX1BBR0UgPSAyNTtcclxuY29uc3QgREVGQVVMVF9QQUdFX1NJWkUgPSAyMDtcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEdyaWRPZGF0YVNlcnZpY2UgaW1wbGVtZW50cyBCYWNrZW5kU2VydmljZSB7XHJcbiAgcHJpdmF0ZSBfY3VycmVudEZpbHRlcnM6IEN1cnJlbnRGaWx0ZXJbXSA9IFtdO1xyXG4gIHByaXZhdGUgX2N1cnJlbnRQYWdpbmF0aW9uOiBDdXJyZW50UGFnaW5hdGlvbjtcclxuICBwcml2YXRlIF9jdXJyZW50U29ydGVyczogQ3VycmVudFNvcnRlcltdID0gW107XHJcbiAgcHJpdmF0ZSBfY29sdW1uRGVmaW5pdGlvbnM6IENvbHVtbltdO1xyXG4gIHByaXZhdGUgX2dyaWQ6IGFueTtcclxuICBvZGF0YVNlcnZpY2U6IE9kYXRhU2VydmljZTtcclxuICBvcHRpb25zOiBPZGF0YU9wdGlvbjtcclxuICBwYWdpbmF0aW9uOiBQYWdpbmF0aW9uIHwgdW5kZWZpbmVkO1xyXG4gIGRlZmF1bHRPcHRpb25zOiBPZGF0YU9wdGlvbiA9IHtcclxuICAgIHRvcDogREVGQVVMVF9JVEVNU19QRVJfUEFHRSxcclxuICAgIG9yZGVyQnk6ICcnLFxyXG4gICAgY2FzZVR5cGU6IENhc2VUeXBlLnBhc2NhbENhc2VcclxuICB9O1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMub2RhdGFTZXJ2aWNlID0gbmV3IE9kYXRhU2VydmljZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqIEdldHRlciBmb3IgdGhlIEdyaWQgT3B0aW9ucyBwdWxsZWQgdGhyb3VnaCB0aGUgR3JpZCBPYmplY3QgKi9cclxuICBwcml2YXRlIGdldCBfZ3JpZE9wdGlvbnMoKTogR3JpZE9wdGlvbiB7XHJcbiAgICByZXR1cm4gKHRoaXMuX2dyaWQgJiYgdGhpcy5fZ3JpZC5nZXRPcHRpb25zKSA/IHRoaXMuX2dyaWQuZ2V0T3B0aW9ucygpIDoge307XHJcbiAgfVxyXG5cclxuICBidWlsZFF1ZXJ5KCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5vZGF0YVNlcnZpY2UuYnVpbGRRdWVyeSgpO1xyXG4gIH1cclxuXHJcbiAgY2xlYXJGaWx0ZXJzKCkge1xyXG4gICAgdGhpcy5fY3VycmVudEZpbHRlcnMgPSBbXTtcclxuICAgIHRoaXMudXBkYXRlT3B0aW9ucyh7IGZpbHRlcmluZ09wdGlvbnM6IFtdIH0pO1xyXG4gIH1cclxuXHJcbiAgY2xlYXJTb3J0ZXJzKCkge1xyXG4gICAgdGhpcy5fY3VycmVudFNvcnRlcnMgPSBbXTtcclxuICAgIHRoaXMudXBkYXRlT3B0aW9ucyh7IHNvcnRpbmdPcHRpb25zOiBbXSB9KTtcclxuICB9XHJcblxyXG4gIGluaXQob3B0aW9uczogT2RhdGFPcHRpb24sIHBhZ2luYXRpb24/OiBQYWdpbmF0aW9uLCBncmlkPzogYW55KTogdm9pZCB7XHJcbiAgICB0aGlzLl9ncmlkID0gZ3JpZDtcclxuICAgIGNvbnN0IG1lcmdlZE9wdGlvbnMgPSB7IC4uLnRoaXMuZGVmYXVsdE9wdGlvbnMsIC4uLm9wdGlvbnMgfTtcclxuICAgIGlmIChwYWdpbmF0aW9uICYmIHBhZ2luYXRpb24ucGFnZVNpemUpIHtcclxuICAgICAgbWVyZ2VkT3B0aW9ucy50b3AgPSBwYWdpbmF0aW9uLnBhZ2VTaXplO1xyXG4gICAgfVxyXG4gICAgdGhpcy5vZGF0YVNlcnZpY2Uub3B0aW9ucyA9IHsgLi4ubWVyZ2VkT3B0aW9ucywgdG9wOiBtZXJnZWRPcHRpb25zLnRvcCB8fCB0aGlzLmRlZmF1bHRPcHRpb25zLnRvcCB9O1xyXG4gICAgdGhpcy5vcHRpb25zID0gdGhpcy5vZGF0YVNlcnZpY2Uub3B0aW9ucztcclxuICAgIHRoaXMucGFnaW5hdGlvbiA9IHBhZ2luYXRpb247XHJcblxyXG4gICAgLy8gc2F2ZSBjdXJyZW50IHBhZ2luYXRpb24gYXMgUGFnZSAxIGFuZCBwYWdlIHNpemUgYXMgXCJ0b3BcIlxyXG4gICAgdGhpcy5fY3VycmVudFBhZ2luYXRpb24gPSB7XHJcbiAgICAgIHBhZ2VOdW1iZXI6IDEsXHJcbiAgICAgIHBhZ2VTaXplOiB0aGlzLm9kYXRhU2VydmljZS5vcHRpb25zLnRvcCB8fCB0aGlzLmRlZmF1bHRPcHRpb25zLnRvcFxyXG4gICAgfTtcclxuXHJcbiAgICBpZiAoZ3JpZCAmJiBncmlkLmdldENvbHVtbnMpIHtcclxuICAgICAgdGhpcy5fY29sdW1uRGVmaW5pdGlvbnMgPSAob3B0aW9ucyAmJiBvcHRpb25zLmNvbHVtbkRlZmluaXRpb25zKSB8fCBncmlkLmdldENvbHVtbnMoKTtcclxuICAgICAgdGhpcy5fY29sdW1uRGVmaW5pdGlvbnMgPSB0aGlzLl9jb2x1bW5EZWZpbml0aW9ucy5maWx0ZXIoKGNvbHVtbjogQ29sdW1uKSA9PiAhY29sdW1uLmV4Y2x1ZGVGcm9tUXVlcnkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdXBkYXRlT3B0aW9ucyhzZXJ2aWNlT3B0aW9ucz86IE9kYXRhT3B0aW9uKSB7XHJcbiAgICB0aGlzLm9wdGlvbnMgPSB7IC4uLnRoaXMub3B0aW9ucywgLi4uc2VydmljZU9wdGlvbnMgfTtcclxuICB9XHJcblxyXG4gIHJlbW92ZUNvbHVtbkZpbHRlcihmaWVsZE5hbWU6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgdGhpcy5vZGF0YVNlcnZpY2UucmVtb3ZlQ29sdW1uRmlsdGVyKGZpZWxkTmFtZSk7XHJcbiAgfVxyXG5cclxuICAvKiogR2V0IHRoZSBGaWx0ZXJzIHRoYXQgYXJlIGN1cnJlbnRseSB1c2VkIGJ5IHRoZSBncmlkICovXHJcbiAgZ2V0Q3VycmVudEZpbHRlcnMoKTogQ3VycmVudEZpbHRlcltdIHtcclxuICAgIHJldHVybiB0aGlzLl9jdXJyZW50RmlsdGVycztcclxuICB9XHJcblxyXG4gIC8qKiBHZXQgdGhlIFBhZ2luYXRpb24gdGhhdCBpcyBjdXJyZW50bHkgdXNlZCBieSB0aGUgZ3JpZCAqL1xyXG4gIGdldEN1cnJlbnRQYWdpbmF0aW9uKCk6IEN1cnJlbnRQYWdpbmF0aW9uIHtcclxuICAgIHJldHVybiB0aGlzLl9jdXJyZW50UGFnaW5hdGlvbjtcclxuICB9XHJcblxyXG4gIC8qKiBHZXQgdGhlIFNvcnRlcnMgdGhhdCBhcmUgY3VycmVudGx5IHVzZWQgYnkgdGhlIGdyaWQgKi9cclxuICBnZXRDdXJyZW50U29ydGVycygpOiBDdXJyZW50U29ydGVyW10ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRTb3J0ZXJzO1xyXG4gIH1cclxuXHJcbiAgLypcclxuICAgKiBSZXNldCB0aGUgcGFnaW5hdGlvbiBvcHRpb25zXHJcbiAgICovXHJcbiAgcmVzZXRQYWdpbmF0aW9uT3B0aW9ucygpIHtcclxuICAgIHRoaXMub2RhdGFTZXJ2aWNlLnVwZGF0ZU9wdGlvbnMoe1xyXG4gICAgICBza2lwOiAwXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHNhdmVDb2x1bW5GaWx0ZXIoZmllbGROYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcsIHRlcm1zPzogYW55W10pIHtcclxuICAgIHRoaXMub2RhdGFTZXJ2aWNlLnNhdmVDb2x1bW5GaWx0ZXIoZmllbGROYW1lLCB2YWx1ZSwgdGVybXMpO1xyXG4gIH1cclxuXHJcbiAgLypcclxuICAgKiBGSUxURVJJTkdcclxuICAgKi9cclxuICBwcm9jZXNzT25GaWx0ZXJDaGFuZ2VkKGV2ZW50OiBFdmVudCwgYXJnczogRmlsdGVyQ2hhbmdlZEFyZ3MpOiBQcm9taXNlPHN0cmluZz4ge1xyXG4gICAgY29uc3Qgc2VydmljZU9wdGlvbnM6IEdyaWRPcHRpb24gPSBhcmdzLmdyaWQuZ2V0T3B0aW9ucygpO1xyXG4gICAgY29uc3QgYmFja2VuZEFwaSA9IHNlcnZpY2VPcHRpb25zLmJhY2tlbmRTZXJ2aWNlQXBpO1xyXG5cclxuICAgIGlmIChiYWNrZW5kQXBpID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdTb21ldGhpbmcgd2VudCB3cm9uZyBpbiB0aGUgR3JpZE9kYXRhU2VydmljZSwgXCJiYWNrZW5kU2VydmljZUFwaVwiIGlzIG5vdCBpbml0aWFsaXplZCcpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGtlZXAgY3VycmVudCBmaWx0ZXJzICYgYWx3YXlzIHNhdmUgaXQgYXMgYW4gYXJyYXkgKGNvbHVtbkZpbHRlcnMgY2FuIGJlIGFuIG9iamVjdCB3aGVuIGl0IGlzIGRlYWx0IGJ5IFNsaWNrR3JpZCBGaWx0ZXIpXHJcbiAgICB0aGlzLl9jdXJyZW50RmlsdGVycyA9IHRoaXMuY2FzdEZpbHRlclRvQ29sdW1uRmlsdGVyKGFyZ3MuY29sdW1uRmlsdGVycyk7XHJcblxyXG4gICAgY29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlPHN0cmluZz4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAvLyBsb29wIHRocm91Z2ggYWxsIGNvbHVtbnMgdG8gaW5zcGVjdCBmaWx0ZXJzICYgc2V0IHRoZSBxdWVyeVxyXG4gICAgICB0aGlzLnVwZGF0ZUZpbHRlcnMoYXJncy5jb2x1bW5GaWx0ZXJzKTtcclxuXHJcbiAgICAgIHRoaXMucmVzZXRQYWdpbmF0aW9uT3B0aW9ucygpO1xyXG4gICAgICByZXNvbHZlKHRoaXMub2RhdGFTZXJ2aWNlLmJ1aWxkUXVlcnkoKSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gcHJvbWlzZTtcclxuICB9XHJcblxyXG4gIC8qXHJcbiAgICogUEFHSU5BVElPTlxyXG4gICAqL1xyXG4gIHByb2Nlc3NPblBhZ2luYXRpb25DaGFuZ2VkKGV2ZW50OiBFdmVudCwgYXJnczogUGFnaW5hdGlvbkNoYW5nZWRBcmdzKSB7XHJcbiAgICBjb25zdCBwYWdlU2l6ZSA9ICsoYXJncy5wYWdlU2l6ZSB8fCBERUZBVUxUX1BBR0VfU0laRSk7XHJcbiAgICB0aGlzLnVwZGF0ZVBhZ2luYXRpb24oYXJncy5uZXdQYWdlLCBwYWdlU2l6ZSk7XHJcblxyXG4gICAgLy8gYnVpbGQgdGhlIE9EYXRhIHF1ZXJ5IHdoaWNoIHdlIHdpbGwgdXNlIGluIHRoZSBXZWJBUEkgY2FsbGJhY2tcclxuICAgIHJldHVybiB0aGlzLm9kYXRhU2VydmljZS5idWlsZFF1ZXJ5KCk7XHJcbiAgfVxyXG5cclxuICAvKlxyXG4gICAqIFNPUlRJTkdcclxuICAgKi9cclxuICBwcm9jZXNzT25Tb3J0Q2hhbmdlZChldmVudDogRXZlbnQsIGFyZ3M6IFNvcnRDaGFuZ2VkQXJncykge1xyXG4gICAgY29uc3Qgc29ydENvbHVtbnMgPSAoYXJncy5tdWx0aUNvbHVtblNvcnQpID8gYXJncy5zb3J0Q29scyA6IG5ldyBBcnJheSh7IHNvcnRDb2w6IGFyZ3Muc29ydENvbCwgc29ydEFzYzogYXJncy5zb3J0QXNjIH0pO1xyXG5cclxuICAgIC8vIGxvb3AgdGhyb3VnaCBhbGwgY29sdW1ucyB0byBpbnNwZWN0IHNvcnRlcnMgJiBzZXQgdGhlIHF1ZXJ5XHJcbiAgICB0aGlzLnVwZGF0ZVNvcnRlcnMoc29ydENvbHVtbnMpO1xyXG5cclxuICAgIC8vIGJ1aWxkIHRoZSBPRGF0YSBxdWVyeSB3aGljaCB3ZSB3aWxsIHVzZSBpbiB0aGUgV2ViQVBJIGNhbGxiYWNrXHJcbiAgICByZXR1cm4gdGhpcy5vZGF0YVNlcnZpY2UuYnVpbGRRdWVyeSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogbG9vcCB0aHJvdWdoIGFsbCBjb2x1bW5zIHRvIGluc3BlY3QgZmlsdGVycyAmIHVwZGF0ZSBiYWNrZW5kIHNlcnZpY2UgZmlsdGVyaW5nT3B0aW9uc1xyXG4gICAqIEBwYXJhbSBjb2x1bW5GaWx0ZXJzXHJcbiAgICovXHJcbiAgdXBkYXRlRmlsdGVycyhjb2x1bW5GaWx0ZXJzOiBDb2x1bW5GaWx0ZXJzIHwgQ3VycmVudEZpbHRlcltdLCBpc1VwZGF0ZWRCeVByZXNldD86IGJvb2xlYW4pIHtcclxuICAgIGxldCBzZWFyY2hCeSA9ICcnO1xyXG4gICAgY29uc3Qgc2VhcmNoQnlBcnJheTogc3RyaW5nW10gPSBbXTtcclxuXHJcbiAgICAvLyBvbiBmaWx0ZXIgcHJlc2V0IGxvYWQsIHdlIG5lZWQgdG8ga2VlcCBjdXJyZW50IGZpbHRlcnNcclxuICAgIGlmIChpc1VwZGF0ZWRCeVByZXNldCkge1xyXG4gICAgICB0aGlzLl9jdXJyZW50RmlsdGVycyA9IHRoaXMuY2FzdEZpbHRlclRvQ29sdW1uRmlsdGVyKGNvbHVtbkZpbHRlcnMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGxvb3AgdGhyb3VnaCBhbGwgY29sdW1ucyB0byBpbnNwZWN0IGZpbHRlcnNcclxuICAgIGZvciAoY29uc3QgY29sdW1uSWQgaW4gY29sdW1uRmlsdGVycykge1xyXG4gICAgICBpZiAoY29sdW1uRmlsdGVycy5oYXNPd25Qcm9wZXJ0eShjb2x1bW5JZCkpIHtcclxuICAgICAgICBjb25zdCBjb2x1bW5GaWx0ZXIgPSBjb2x1bW5GaWx0ZXJzW2NvbHVtbklkXTtcclxuXHJcbiAgICAgICAgLy8gaWYgdXNlciBkZWZpbmVkIHNvbWUgXCJwcmVzZXRzXCIsIHRoZW4gd2UgbmVlZCB0byBmaW5kIHRoZSBmaWx0ZXJzIGZyb20gdGhlIGNvbHVtbiBkZWZpbml0aW9ucyBpbnN0ZWFkXHJcbiAgICAgICAgbGV0IGNvbHVtbkRlZjogQ29sdW1uIHwgdW5kZWZpbmVkO1xyXG4gICAgICAgIGlmIChpc1VwZGF0ZWRCeVByZXNldCAmJiBBcnJheS5pc0FycmF5KHRoaXMuX2NvbHVtbkRlZmluaXRpb25zKSkge1xyXG4gICAgICAgICAgY29sdW1uRGVmID0gdGhpcy5fY29sdW1uRGVmaW5pdGlvbnMuZmluZCgoY29sdW1uOiBDb2x1bW4pID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGNvbHVtbi5pZCA9PT0gY29sdW1uRmlsdGVyLmNvbHVtbklkO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvbHVtbkRlZiA9IGNvbHVtbkZpbHRlci5jb2x1bW5EZWY7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghY29sdW1uRGVmKSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1tCYWNrZW5kIFNlcnZpY2UgQVBJXTogU29tZXRoaW5nIHdlbnQgd3JvbmcgaW4gdHJ5aW5nIHRvIGdldCB0aGUgY29sdW1uIGRlZmluaXRpb24gb2YgdGhlIHNwZWNpZmllZCBmaWx0ZXIgKG9yIHByZXNldCBmaWx0ZXJzKS4gRGlkIHlvdSBtYWtlIGEgdHlwbyBvbiB0aGUgZmlsdGVyIGNvbHVtbklkPycpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGZpZWxkTmFtZSA9IGNvbHVtbkRlZi5xdWVyeUZpZWxkIHx8IGNvbHVtbkRlZi5xdWVyeUZpZWxkRmlsdGVyIHx8IGNvbHVtbkRlZi5maWVsZCB8fCBjb2x1bW5EZWYubmFtZSB8fCAnJztcclxuICAgICAgICBjb25zdCBmaWVsZFR5cGUgPSBjb2x1bW5EZWYudHlwZSB8fCAnc3RyaW5nJztcclxuICAgICAgICBjb25zdCBzZWFyY2hUZXJtcyA9IChjb2x1bW5GaWx0ZXIgPyBjb2x1bW5GaWx0ZXIuc2VhcmNoVGVybXMgOiBudWxsKSB8fCBbXTtcclxuICAgICAgICBsZXQgZmllbGRTZWFyY2hWYWx1ZSA9IChBcnJheS5pc0FycmF5KHNlYXJjaFRlcm1zKSAmJiBzZWFyY2hUZXJtcy5sZW5ndGggPT09IDEpID8gc2VhcmNoVGVybXNbMF0gOiAnJztcclxuICAgICAgICBpZiAodHlwZW9mIGZpZWxkU2VhcmNoVmFsdWUgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICBmaWVsZFNlYXJjaFZhbHVlID0gJyc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodHlwZW9mIGZpZWxkU2VhcmNoVmFsdWUgIT09ICdzdHJpbmcnICYmICFzZWFyY2hUZXJtcykge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBPRGRhdGEgZmlsdGVyIHNlYXJjaFRlcm0gcHJvcGVydHkgbXVzdCBiZSBwcm92aWRlZCBhcyB0eXBlIFwic3RyaW5nXCIsIGlmIHlvdSB1c2UgZmlsdGVyIHdpdGggb3B0aW9ucyB0aGVuIG1ha2Ugc3VyZSB5b3VyIElEcyBhcmUgYWxzbyBzdHJpbmcuIEZvciBleGFtcGxlOiBmaWx0ZXI6IHttb2RlbDogRmlsdGVycy5zZWxlY3QsIGNvbGxlY3Rpb246IFt7IGlkOiBcIjBcIiwgdmFsdWU6IFwiMFwiIH0sIHsgaWQ6IFwiMVwiLCB2YWx1ZTogXCIxXCIgfV1gKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZpZWxkU2VhcmNoVmFsdWUgPSAnJyArIGZpZWxkU2VhcmNoVmFsdWU7IC8vIG1ha2Ugc3VyZSBpdCdzIGEgc3RyaW5nXHJcbiAgICAgICAgY29uc3QgbWF0Y2hlcyA9IGZpZWxkU2VhcmNoVmFsdWUubWF0Y2goL14oWzw+IT1cXCpdezAsMn0pKC4qW148PiE9XFwqXSkoW1xcKl0/KSQvKTsgLy8gZ3JvdXAgMTogT3BlcmF0b3IsIDI6IHNlYXJjaFZhbHVlLCAzOiBsYXN0IGNoYXIgaXMgJyonIChtZWFuaW5nIHN0YXJ0cyB3aXRoLCBleC46IGFiYyopXHJcbiAgICAgICAgY29uc3Qgb3BlcmF0b3IgPSBjb2x1bW5GaWx0ZXIub3BlcmF0b3IgfHwgKChtYXRjaGVzKSA/IG1hdGNoZXNbMV0gOiAnJyk7XHJcbiAgICAgICAgbGV0IHNlYXJjaFZhbHVlID0gKCEhbWF0Y2hlcykgPyBtYXRjaGVzWzJdIDogJyc7XHJcbiAgICAgICAgY29uc3QgbGFzdFZhbHVlQ2hhciA9ICghIW1hdGNoZXMpID8gbWF0Y2hlc1szXSA6IChvcGVyYXRvciA9PT0gJyp6JyA/ICcqJyA6ICcnKTtcclxuICAgICAgICBjb25zdCBieXBhc3NPZGF0YVF1ZXJ5ID0gY29sdW1uRmlsdGVyLmJ5cGFzc0JhY2tlbmRRdWVyeSB8fCBmYWxzZTtcclxuXHJcbiAgICAgICAgLy8gbm8gbmVlZCB0byBxdWVyeSBpZiBzZWFyY2ggdmFsdWUgaXMgZW1wdHlcclxuICAgICAgICBpZiAoZmllbGROYW1lICYmIHNlYXJjaFZhbHVlID09PSAnJyAmJiBzZWFyY2hUZXJtcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgIHRoaXMucmVtb3ZlQ29sdW1uRmlsdGVyKGZpZWxkTmFtZSk7XHJcbiAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGVzY2FwaW5nIHRoZSBzZWFyY2ggdmFsdWVcclxuICAgICAgICBzZWFyY2hWYWx1ZSA9IHNlYXJjaFZhbHVlLnJlcGxhY2UoYCdgLCBgJydgKTsgLy8gZXNjYXBlIHNpbmdsZSBxdW90ZXMgYnkgZG91YmxpbmcgdGhlbVxyXG4gICAgICAgIHNlYXJjaFZhbHVlID0gZW5jb2RlVVJJQ29tcG9uZW50KHNlYXJjaFZhbHVlKTsgLy8gZW5jb2RlIFVSSSBvZiB0aGUgZmluYWwgc2VhcmNoIHZhbHVlXHJcblxyXG4gICAgICAgIC8vIGV4dHJhIHF1ZXJ5IGFyZ3VtZW50c1xyXG4gICAgICAgIGlmIChieXBhc3NPZGF0YVF1ZXJ5KSB7XHJcbiAgICAgICAgICAvLyBwdXNoIHRvIG91ciB0ZW1wIGFycmF5IGFuZCBhbHNvIHRyaW0gd2hpdGUgc3BhY2VzXHJcbiAgICAgICAgICBpZiAoZmllbGROYW1lKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2F2ZUNvbHVtbkZpbHRlcihmaWVsZE5hbWUsIGZpZWxkU2VhcmNoVmFsdWUsIHNlYXJjaFRlcm1zKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgc2VhcmNoQnkgPSAnJztcclxuXHJcbiAgICAgICAgICAvLyB0aXRsZUNhc2UgdGhlIGZpZWxkTmFtZSBzbyB0aGF0IGl0IG1hdGNoZXMgdGhlIFdlYkFwaSBuYW1lc1xyXG4gICAgICAgICAgaWYgKHRoaXMub2RhdGFTZXJ2aWNlLm9wdGlvbnMuY2FzZVR5cGUgPT09IENhc2VUeXBlLnBhc2NhbENhc2UpIHtcclxuICAgICAgICAgICAgZmllbGROYW1lID0gU3RyaW5nLnRpdGxlQ2FzZShmaWVsZE5hbWUgfHwgJycpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vIHdoZW4gaGF2aW5nIG1vcmUgdGhhbiAxIHNlYXJjaCB0ZXJtICh0aGVuIGNoZWNrIGlmIHdlIGhhdmUgYSBcIklOXCIgb3IgXCJOT1QgSU5cIiBmaWx0ZXIgc2VhcmNoKVxyXG4gICAgICAgICAgaWYgKHNlYXJjaFRlcm1zICYmIHNlYXJjaFRlcm1zLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgY29uc3QgdG1wU2VhcmNoVGVybXMgPSBbXTtcclxuXHJcbiAgICAgICAgICAgIGlmIChvcGVyYXRvciA9PT0gJ0lOJykge1xyXG4gICAgICAgICAgICAgIC8vIGV4YW1wbGU6OiAoU3RhZ2UgZXEgXCJFeHBpcmVkXCIgb3IgU3RhZ2UgZXEgXCJSZW5ld2FsXCIpXHJcbiAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDAsIGxuaiA9IHNlYXJjaFRlcm1zLmxlbmd0aDsgaiA8IGxuajsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICB0bXBTZWFyY2hUZXJtcy5wdXNoKGAke2ZpZWxkTmFtZX0gZXEgJyR7c2VhcmNoVGVybXNbal19J2ApO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBzZWFyY2hCeSA9IHRtcFNlYXJjaFRlcm1zLmpvaW4oJyBvciAnKTtcclxuICAgICAgICAgICAgICBzZWFyY2hCeSA9IGAoJHtzZWFyY2hCeX0pYDtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChvcGVyYXRvciA9PT0gJ05JTicgfHwgb3BlcmF0b3IgPT09ICdOT1RJTicgfHwgb3BlcmF0b3IgPT09ICdOT1QgSU4nKSB7XHJcbiAgICAgICAgICAgICAgLy8gZXhhbXBsZTo6IChTdGFnZSBuZSBcIkV4cGlyZWRcIiBhbmQgU3RhZ2UgbmUgXCJSZW5ld2FsXCIpXHJcbiAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDAsIGxuayA9IHNlYXJjaFRlcm1zLmxlbmd0aDsgayA8IGxuazsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICB0bXBTZWFyY2hUZXJtcy5wdXNoKGAke2ZpZWxkTmFtZX0gbmUgJyR7c2VhcmNoVGVybXNba119J2ApO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBzZWFyY2hCeSA9IHRtcFNlYXJjaFRlcm1zLmpvaW4oJyBhbmQgJyk7XHJcbiAgICAgICAgICAgICAgc2VhcmNoQnkgPSBgKCR7c2VhcmNoQnl9KWA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gZWxzZSBpZiAob3BlcmF0b3IgPT09ICcqJyB8fCBvcGVyYXRvciA9PT0gJ2EqJyB8fCBvcGVyYXRvciA9PT0gJyp6JyB8fCBsYXN0VmFsdWVDaGFyICE9PSAnJykge1xyXG4gICAgICAgICAgICAvLyBmaXJzdC9sYXN0IGNoYXJhY3RlciBpcyBhICcqJyB3aWxsIGJlIGEgc3RhcnRzV2l0aCBvciBlbmRzV2l0aFxyXG4gICAgICAgICAgICBzZWFyY2hCeSA9IChvcGVyYXRvciA9PT0gJyonIHx8IG9wZXJhdG9yID09PSAnKnonKVxyXG4gICAgICAgICAgICAgID8gYGVuZHN3aXRoKCR7ZmllbGROYW1lfSwgJyR7c2VhcmNoVmFsdWV9JylgXHJcbiAgICAgICAgICAgICAgOiBgc3RhcnRzd2l0aCgke2ZpZWxkTmFtZX0sICcke3NlYXJjaFZhbHVlfScpYDtcclxuICAgICAgICAgIH0gZWxzZSBpZiAoZmllbGRUeXBlID09PSBGaWVsZFR5cGUuZGF0ZSkge1xyXG4gICAgICAgICAgICAvLyBkYXRlIGZpZWxkIG5lZWRzIHRvIGJlIFVUQyBhbmQgd2l0aGluIERhdGVUaW1lIGZ1bmN0aW9uXHJcbiAgICAgICAgICAgIGNvbnN0IGRhdGVGb3JtYXR0ZWQgPSBwYXJzZVV0Y0RhdGUoc2VhcmNoVmFsdWUsIHRydWUpO1xyXG4gICAgICAgICAgICBpZiAoZGF0ZUZvcm1hdHRlZCkge1xyXG4gICAgICAgICAgICAgIHNlYXJjaEJ5ID0gYCR7ZmllbGROYW1lfSAke3RoaXMubWFwT2RhdGFPcGVyYXRvcihvcGVyYXRvcil9IERhdGVUaW1lJyR7ZGF0ZUZvcm1hdHRlZH0nYDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIGlmIChmaWVsZFR5cGUgPT09IEZpZWxkVHlwZS5zdHJpbmcpIHtcclxuICAgICAgICAgICAgLy8gc3RyaW5nIGZpZWxkIG5lZWRzIHRvIGJlIGluIHNpbmdsZSBxdW90ZXNcclxuICAgICAgICAgICAgaWYgKG9wZXJhdG9yID09PSAnJykge1xyXG4gICAgICAgICAgICAgIHNlYXJjaEJ5ID0gYHN1YnN0cmluZ29mKCcke3NlYXJjaFZhbHVlfScsICR7ZmllbGROYW1lfSlgO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIC8vIHNlYXJjaEJ5ID0gYHN1YnN0cmluZ29mKCcke3NlYXJjaFZhbHVlfScsICR7ZmllbGROYW1lQ2FzZWR9KSAke3RoaXMubWFwT2RhdGFPcGVyYXRvcihvcGVyYXRvcil9IHRydWVgO1xyXG4gICAgICAgICAgICAgIHNlYXJjaEJ5ID0gYCR7ZmllbGROYW1lfSAke3RoaXMubWFwT2RhdGFPcGVyYXRvcihvcGVyYXRvcil9ICcke3NlYXJjaFZhbHVlfSdgO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBhbnkgb3RoZXIgZmllbGQgdHlwZSAob3IgdW5kZWZpbmVkIHR5cGUpXHJcbiAgICAgICAgICAgIHNlYXJjaFZhbHVlID0gZmllbGRUeXBlID09PSBGaWVsZFR5cGUubnVtYmVyID8gc2VhcmNoVmFsdWUgOiBgJyR7c2VhcmNoVmFsdWV9J2A7XHJcbiAgICAgICAgICAgIHNlYXJjaEJ5ID0gYCR7ZmllbGROYW1lfSAke3RoaXMubWFwT2RhdGFPcGVyYXRvcihvcGVyYXRvcil9ICR7c2VhcmNoVmFsdWV9YDtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvLyBwdXNoIHRvIG91ciB0ZW1wIGFycmF5IGFuZCBhbHNvIHRyaW0gd2hpdGUgc3BhY2VzXHJcbiAgICAgICAgICBpZiAoc2VhcmNoQnkgIT09ICcnKSB7XHJcbiAgICAgICAgICAgIHNlYXJjaEJ5QXJyYXkucHVzaChTdHJpbmcudHJpbShzZWFyY2hCeSkpO1xyXG4gICAgICAgICAgICB0aGlzLnNhdmVDb2x1bW5GaWx0ZXIoZmllbGROYW1lIHx8ICcnLCBmaWVsZFNlYXJjaFZhbHVlLCBzZWFyY2hUZXJtcyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gdXBkYXRlIHRoZSBzZXJ2aWNlIG9wdGlvbnMgd2l0aCBmaWx0ZXJzIGZvciB0aGUgYnVpbGRRdWVyeSgpIHRvIHdvcmsgbGF0ZXJcclxuICAgIHRoaXMub2RhdGFTZXJ2aWNlLnVwZGF0ZU9wdGlvbnMoe1xyXG4gICAgICBmaWx0ZXI6IChzZWFyY2hCeUFycmF5Lmxlbmd0aCA+IDApID8gc2VhcmNoQnlBcnJheS5qb2luKCcgYW5kICcpIDogJycsXHJcbiAgICAgIHNraXA6IHVuZGVmaW5lZFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVcGRhdGUgdGhlIHBhZ2luYXRpb24gY29tcG9uZW50IHdpdGggaXQncyBuZXcgcGFnZSBudW1iZXIgYW5kIHNpemVcclxuICAgKiBAcGFyYW0gbmV3UGFnZVxyXG4gICAqIEBwYXJhbSBwYWdlU2l6ZVxyXG4gICAqL1xyXG4gIHVwZGF0ZVBhZ2luYXRpb24obmV3UGFnZTogbnVtYmVyLCBwYWdlU2l6ZTogbnVtYmVyKSB7XHJcbiAgICB0aGlzLl9jdXJyZW50UGFnaW5hdGlvbiA9IHtcclxuICAgICAgcGFnZU51bWJlcjogbmV3UGFnZSxcclxuICAgICAgcGFnZVNpemVcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5vZGF0YVNlcnZpY2UudXBkYXRlT3B0aW9ucyh7XHJcbiAgICAgIHRvcDogcGFnZVNpemUsXHJcbiAgICAgIHNraXA6IChuZXdQYWdlIC0gMSkgKiBwYWdlU2l6ZVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBsb29wIHRocm91Z2ggYWxsIGNvbHVtbnMgdG8gaW5zcGVjdCBzb3J0ZXJzICYgdXBkYXRlIGJhY2tlbmQgc2VydmljZSBvcmRlckJ5XHJcbiAgICogQHBhcmFtIGNvbHVtbkZpbHRlcnNcclxuICAgKi9cclxuICB1cGRhdGVTb3J0ZXJzKHNvcnRDb2x1bW5zPzogQ29sdW1uU29ydFtdLCBwcmVzZXRTb3J0ZXJzPzogQ3VycmVudFNvcnRlcltdKSB7XHJcbiAgICBsZXQgc29ydEJ5QXJyYXk6IGFueVtdID0gW107XHJcbiAgICBjb25zdCBzb3J0ZXJBcnJheTogQ3VycmVudFNvcnRlcltdID0gW107XHJcblxyXG4gICAgaWYgKCFzb3J0Q29sdW1ucyAmJiBwcmVzZXRTb3J0ZXJzKSB7XHJcbiAgICAgIC8vIG1ha2UgdGhlIHByZXNldHMgdGhlIGN1cnJlbnQgc29ydGVycywgYWxzbyBtYWtlIHN1cmUgdGhhdCBhbGwgZGlyZWN0aW9uIGFyZSBpbiBsb3dlcmNhc2UgZm9yIE9EYXRhXHJcbiAgICAgIHNvcnRCeUFycmF5ID0gcHJlc2V0U29ydGVycztcclxuICAgICAgc29ydEJ5QXJyYXkuZm9yRWFjaCgoc29ydGVyKSA9PiBzb3J0ZXIuZGlyZWN0aW9uID0gc29ydGVyLmRpcmVjdGlvbi50b0xvd2VyQ2FzZSgpIGFzIFNvcnREaXJlY3Rpb25TdHJpbmcpO1xyXG5cclxuICAgICAgLy8gZGlzcGxheSB0aGUgY29ycmVjdCBzb3J0aW5nIGljb25zIG9uIHRoZSBVSSwgZm9yIHRoYXQgaXQgcmVxdWlyZXMgKGNvbHVtbklkLCBzb3J0QXNjKSBwcm9wZXJ0aWVzXHJcbiAgICAgIGNvbnN0IHRtcFNvcnRlckFycmF5ID0gc29ydEJ5QXJyYXkubWFwKChzb3J0ZXIpID0+IHtcclxuICAgICAgICBjb25zdCBjb2x1bW5EZWYgPSB0aGlzLl9jb2x1bW5EZWZpbml0aW9ucy5maW5kKChjb2x1bW46IENvbHVtbikgPT4gY29sdW1uLmlkID09PSBzb3J0ZXIuY29sdW1uSWQpO1xyXG5cclxuICAgICAgICBzb3J0ZXJBcnJheS5wdXNoKHtcclxuICAgICAgICAgIGNvbHVtbklkOiBjb2x1bW5EZWYgPyAoKGNvbHVtbkRlZi5xdWVyeUZpZWxkIHx8IGNvbHVtbkRlZi5xdWVyeUZpZWxkU29ydGVyIHx8IGNvbHVtbkRlZi5maWVsZCB8fCBjb2x1bW5EZWYuaWQpICsgJycpIDogKHNvcnRlci5jb2x1bW5JZCArICcnKSxcclxuICAgICAgICAgIGRpcmVjdGlvbjogc29ydGVyLmRpcmVjdGlvblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyByZXR1cm4gb25seSB0aGUgY29sdW1uKHMpIGZvdW5kIGluIHRoZSBDb2x1bW4gRGVmaW5pdGlvbnMgRUxTRSBudWxsXHJcbiAgICAgICAgaWYgKGNvbHVtbkRlZikge1xyXG4gICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgY29sdW1uSWQ6IHNvcnRlci5jb2x1bW5JZCxcclxuICAgICAgICAgICAgc29ydEFzYzogc29ydGVyLmRpcmVjdGlvbi50b1VwcGVyQ2FzZSgpID09PSBTb3J0RGlyZWN0aW9uLkFTQ1xyXG4gICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLl9ncmlkLnNldFNvcnRDb2x1bW5zKHRtcFNvcnRlckFycmF5KTtcclxuICAgIH0gZWxzZSBpZiAoc29ydENvbHVtbnMgJiYgIXByZXNldFNvcnRlcnMpIHtcclxuICAgICAgLy8gYnVpbGQgdGhlIFNvcnRCeSBzdHJpbmcsIGl0IGNvdWxkIGJlIG11bHRpc29ydCwgZXhhbXBsZTogY3VzdG9tZXJObyBhc2MsIHB1cmNoYXNlck5hbWUgZGVzY1xyXG4gICAgICBpZiAoc29ydENvbHVtbnMgJiYgc29ydENvbHVtbnMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgc29ydEJ5QXJyYXkgPSBuZXcgQXJyYXkodGhpcy5kZWZhdWx0T3B0aW9ucy5vcmRlckJ5KTsgLy8gd2hlbiBlbXB0eSwgdXNlIHRoZSBkZWZhdWx0IHNvcnRcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAoc29ydENvbHVtbnMpIHtcclxuICAgICAgICAgIGZvciAoY29uc3QgY29sdW1uRGVmIG9mIHNvcnRDb2x1bW5zKSB7XHJcbiAgICAgICAgICAgIGlmIChjb2x1bW5EZWYuc29ydENvbCkge1xyXG4gICAgICAgICAgICAgIGxldCBmaWVsZE5hbWUgPSAoY29sdW1uRGVmLnNvcnRDb2wucXVlcnlGaWVsZCB8fCBjb2x1bW5EZWYuc29ydENvbC5xdWVyeUZpZWxkU29ydGVyIHx8IGNvbHVtbkRlZi5zb3J0Q29sLmZpZWxkIHx8IGNvbHVtbkRlZi5zb3J0Q29sLmlkKSArICcnO1xyXG4gICAgICAgICAgICAgIGxldCBjb2x1bW5GaWVsZE5hbWUgPSAoY29sdW1uRGVmLnNvcnRDb2wuZmllbGQgfHwgY29sdW1uRGVmLnNvcnRDb2wuaWQpICsgJyc7XHJcbiAgICAgICAgICAgICAgaWYgKHRoaXMub2RhdGFTZXJ2aWNlLm9wdGlvbnMuY2FzZVR5cGUgPT09IENhc2VUeXBlLnBhc2NhbENhc2UpIHtcclxuICAgICAgICAgICAgICAgIGZpZWxkTmFtZSA9IFN0cmluZy50aXRsZUNhc2UoZmllbGROYW1lKTtcclxuICAgICAgICAgICAgICAgIGNvbHVtbkZpZWxkTmFtZSA9IFN0cmluZy50aXRsZUNhc2UoY29sdW1uRmllbGROYW1lKTtcclxuICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgIHNvcnRlckFycmF5LnB1c2goe1xyXG4gICAgICAgICAgICAgICAgY29sdW1uSWQ6IGNvbHVtbkZpZWxkTmFtZSxcclxuICAgICAgICAgICAgICAgIGRpcmVjdGlvbjogY29sdW1uRGVmLnNvcnRBc2MgPyAnYXNjJyA6ICdkZXNjJ1xyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBzb3J0QnlBcnJheSA9IHNvcnRlckFycmF5O1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIHRyYW5zZm9ybSB0aGUgc29ydGJ5IGFycmF5IGludG8gYSBDU1Ygc3RyaW5nIGZvciBPRGF0YVxyXG4gICAgc29ydEJ5QXJyYXkgPSBzb3J0QnlBcnJheSB8fCBbXSBhcyBDdXJyZW50U29ydGVyW107XHJcbiAgICBjb25zdCBjc3ZTdHJpbmcgPSBzb3J0QnlBcnJheS5tYXAoKHNvcnRlcikgPT4ge1xyXG4gICAgICBpZiAoc29ydGVyICYmIHNvcnRlci5jb2x1bW5JZCkge1xyXG4gICAgICAgIHJldHVybiBgJHtzb3J0ZXIuY29sdW1uSWR9ICR7c29ydGVyICYmIHNvcnRlci5kaXJlY3Rpb24gJiYgc29ydGVyLmRpcmVjdGlvbi50b0xvd2VyQ2FzZSgpIHx8ICcnfWA7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuICcnO1xyXG4gICAgfSkuam9pbignLCcpO1xyXG5cclxuICAgIHRoaXMub2RhdGFTZXJ2aWNlLnVwZGF0ZU9wdGlvbnMoe1xyXG4gICAgICBvcmRlckJ5OiAodGhpcy5vZGF0YVNlcnZpY2Uub3B0aW9ucy5jYXNlVHlwZSA9PT0gQ2FzZVR5cGUucGFzY2FsQ2FzZSkgPyBTdHJpbmcudGl0bGVDYXNlKGNzdlN0cmluZykgOiBjc3ZTdHJpbmdcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIGtlZXAgY3VycmVudCBTb3J0ZXJzIGFuZCB1cGRhdGUgdGhlIHNlcnZpY2Ugb3B0aW9ucyB3aXRoIHRoZSBuZXcgc29ydGluZ1xyXG4gICAgdGhpcy5fY3VycmVudFNvcnRlcnMgPSBzb3J0QnlBcnJheSBhcyBDdXJyZW50U29ydGVyW107XHJcblxyXG4gICAgLy8gYnVpbGQgdGhlIE9EYXRhIHF1ZXJ5IHdoaWNoIHdlIHdpbGwgdXNlIGluIHRoZSBXZWJBUEkgY2FsbGJhY2tcclxuICAgIHJldHVybiB0aGlzLm9kYXRhU2VydmljZS5idWlsZFF1ZXJ5KCk7XHJcbiAgfVxyXG5cclxuICAvL1xyXG4gIC8vIHByaXZhdGUgZnVuY3Rpb25zXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8qKlxyXG4gICAqIENhc3QgcHJvdmlkZWQgZmlsdGVycyAoY291bGQgYmUgaW4gbXVsdGlwbGUgZm9ybWF0KSBpbnRvIGFuIGFycmF5IG9mIENvbHVtbkZpbHRlclxyXG4gICAqIEBwYXJhbSBjb2x1bW5GaWx0ZXJzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjYXN0RmlsdGVyVG9Db2x1bW5GaWx0ZXIoY29sdW1uRmlsdGVyczogQ29sdW1uRmlsdGVycyB8IEN1cnJlbnRGaWx0ZXJbXSk6IEN1cnJlbnRGaWx0ZXJbXSB7XHJcbiAgICAvLyBrZWVwIGN1cnJlbnQgZmlsdGVycyAmIGFsd2F5cyBzYXZlIGl0IGFzIGFuIGFycmF5IChjb2x1bW5GaWx0ZXJzIGNhbiBiZSBhbiBvYmplY3Qgd2hlbiBpdCBpcyBkZWFsdCBieSBTbGlja0dyaWQgRmlsdGVyKVxyXG4gICAgY29uc3QgZmlsdGVyc0FycmF5OiBDb2x1bW5GaWx0ZXJbXSA9ICgodHlwZW9mIGNvbHVtbkZpbHRlcnMgPT09ICdvYmplY3QnKSA/IE9iamVjdC5rZXlzKGNvbHVtbkZpbHRlcnMpLm1hcChrZXkgPT4gY29sdW1uRmlsdGVyc1trZXldKSA6IGNvbHVtbkZpbHRlcnMpIGFzIEN1cnJlbnRGaWx0ZXJbXTtcclxuXHJcbiAgICByZXR1cm4gZmlsdGVyc0FycmF5Lm1hcCgoZmlsdGVyKSA9PiB7XHJcbiAgICAgIGNvbnN0IGNvbHVtbkRlZiA9IGZpbHRlci5jb2x1bW5EZWY7XHJcbiAgICAgIGNvbnN0IHRtcEZpbHRlcjogQ3VycmVudEZpbHRlciA9IHsgY29sdW1uSWQ6IGZpbHRlci5jb2x1bW5JZCB8fCAnJyB9O1xyXG4gICAgICBpZiAoZmlsdGVyLm9wZXJhdG9yKSB7XHJcbiAgICAgICAgdG1wRmlsdGVyLm9wZXJhdG9yID0gZmlsdGVyLm9wZXJhdG9yO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGZpbHRlci5zZWFyY2hUZXJtcykpIHtcclxuICAgICAgICB0bXBGaWx0ZXIuc2VhcmNoVGVybXMgPSBmaWx0ZXIuc2VhcmNoVGVybXM7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHRtcEZpbHRlcjtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTWFwcGVyIGZvciBtYXRoZW1hdGljYWwgb3BlcmF0b3JzIChleC46IDw9IGlzIFwibGVcIiwgPiBpcyBcImd0XCIpXHJcbiAgICogQHBhcmFtIHN0cmluZyBvcGVyYXRvclxyXG4gICAqIEByZXR1cm5zIHN0cmluZyBtYXBcclxuICAgKi9cclxuICBwcml2YXRlIG1hcE9kYXRhT3BlcmF0b3Iob3BlcmF0b3I6IHN0cmluZykge1xyXG4gICAgbGV0IG1hcCA9ICcnO1xyXG4gICAgc3dpdGNoIChvcGVyYXRvcikge1xyXG4gICAgICBjYXNlICc8JzpcclxuICAgICAgICBtYXAgPSAnbHQnO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICc8PSc6XHJcbiAgICAgICAgbWFwID0gJ2xlJztcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnPic6XHJcbiAgICAgICAgbWFwID0gJ2d0JztcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnPj0nOlxyXG4gICAgICAgIG1hcCA9ICdnZSc7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJzw+JzpcclxuICAgICAgY2FzZSAnIT0nOlxyXG4gICAgICAgIG1hcCA9ICduZSc7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJz0nOlxyXG4gICAgICBjYXNlICc9PSc6XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgbWFwID0gJ2VxJztcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbWFwO1xyXG4gIH1cclxufVxyXG4iXX0=