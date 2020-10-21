import * as tslib_1 from "tslib";
import { mapOperatorType, mapOperatorByFieldType } from './utilities';
import { FieldType, SortDirection } from './../models/index';
import QueryBuilder from './graphqlQueryBuilder';
var DEFAULT_ITEMS_PER_PAGE = 25;
var DEFAULT_PAGE_SIZE = 20;
var GraphqlService = /** @class */ (function () {
    function GraphqlService() {
        this._currentFilters = [];
        this._currentSorters = [];
        this.defaultPaginationOptions = {
            first: DEFAULT_ITEMS_PER_PAGE,
            offset: 0
        };
    }
    Object.defineProperty(GraphqlService.prototype, "_gridOptions", {
        /** Getter for the Grid Options pulled through the Grid Object */
        get: function () {
            return (this._grid && this._grid.getOptions) ? this._grid.getOptions() : {};
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Build the GraphQL query, since the service include/exclude cursor, the output query will be different.
     * @param serviceOptions GraphqlServiceOption
     */
    GraphqlService.prototype.buildQuery = function () {
        var e_1, _a, e_2, _b;
        if (!this.options || !this.options.datasetName || (!this._columnDefinitions && !this.options.columnDefinitions)) {
            throw new Error('GraphQL Service requires "datasetName" & "columnDefinitions" properties for it to work');
        }
        // get the column definitions and exclude some if they were tagged as excluded
        var columnDefinitions = this._columnDefinitions || this.options.columnDefinitions;
        columnDefinitions = columnDefinitions.filter(function (column) { return !column.excludeFromQuery; });
        var queryQb = new QueryBuilder('query');
        var datasetQb = new QueryBuilder(this.options.datasetName);
        var dataQb = (this.options.isWithCursor) ? new QueryBuilder('edges') : new QueryBuilder('nodes');
        // get all the columnds Ids for the filters to work
        var columnIds = [];
        if (columnDefinitions && Array.isArray(columnDefinitions)) {
            try {
                for (var columnDefinitions_1 = tslib_1.__values(columnDefinitions), columnDefinitions_1_1 = columnDefinitions_1.next(); !columnDefinitions_1_1.done; columnDefinitions_1_1 = columnDefinitions_1.next()) {
                    var column = columnDefinitions_1_1.value;
                    columnIds.push(column.field);
                    // if extra "fields" are passed, also push them to columnIds
                    if (column.fields) {
                        columnIds.push.apply(columnIds, tslib_1.__spread(column.fields));
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (columnDefinitions_1_1 && !columnDefinitions_1_1.done && (_a = columnDefinitions_1.return)) _a.call(columnDefinitions_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            // columnIds = columnDefinitions.map((column) => column.field);
        }
        else {
            columnIds = this.options.columnIds || [];
        }
        // Slickgrid also requires the "id" field to be part of DataView
        // add it to the GraphQL query if it wasn't already part of the list
        if (columnIds.indexOf('id') === -1) {
            columnIds.unshift('id');
        }
        var filters = this.buildFilterQuery(columnIds);
        if (this.options.isWithCursor) {
            // ...pageInfo { hasNextPage, endCursor }, edges { cursor, node { _filters_ } }
            var pageInfoQb = new QueryBuilder('pageInfo');
            pageInfoQb.find('hasNextPage', 'endCursor');
            dataQb.find(['cursor', { node: filters }]);
            datasetQb.find(['totalCount', pageInfoQb, dataQb]);
        }
        else {
            // ...nodes { _filters_ }
            dataQb.find(filters);
            datasetQb.find(['totalCount', dataQb]);
        }
        // add dataset filters, could be Pagination and SortingFilters and/or FieldFilters
        var datasetFilters = {};
        // only add pagination if it's enabled in the grid options
        if (this._gridOptions.enablePagination !== false) {
            datasetFilters = tslib_1.__assign({}, this.options.paginationOptions, { first: ((this.options.paginationOptions && this.options.paginationOptions.first) ? this.options.paginationOptions.first : ((this.pagination && this.pagination.pageSize) ? this.pagination.pageSize : null)) || this.defaultPaginationOptions.first });
            if (!this.options.isWithCursor) {
                datasetFilters.offset = ((this.options.paginationOptions && this.options.paginationOptions.hasOwnProperty('offset')) ? +this.options.paginationOptions['offset'] : 0);
            }
        }
        if (this.options.sortingOptions && Array.isArray(this.options.sortingOptions) && this.options.sortingOptions.length > 0) {
            // orderBy: [{ field:x, direction: 'ASC' }]
            datasetFilters.orderBy = this.options.sortingOptions;
        }
        if (this.options.filteringOptions && Array.isArray(this.options.filteringOptions) && this.options.filteringOptions.length > 0) {
            // filterBy: [{ field: date, operator: '>', value: '2000-10-10' }]
            datasetFilters.filterBy = this.options.filteringOptions;
        }
        if (this.options.addLocaleIntoQuery) {
            // first: 20, ... locale: "en-CA"
            datasetFilters.locale = this._gridOptions && this._gridOptions.i18n && this._gridOptions.i18n.currentLang || 'en';
        }
        if (this.options.extraQueryArguments) {
            try {
                // first: 20, ... userId: 123
                for (var _c = tslib_1.__values(this.options.extraQueryArguments), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var queryArgument = _d.value;
                    datasetFilters[queryArgument.field] = queryArgument.value;
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
        // query { users(first: 20, orderBy: [], filterBy: [])}
        datasetQb.filter(datasetFilters);
        queryQb.find(datasetQb);
        var enumSearchProperties = ['direction:', 'field:', 'operator:'];
        return this.trimDoubleQuotesOnEnumField(queryQb.toString(), enumSearchProperties, this.options.keepArgumentFieldDoubleQuotes || false);
    };
    /**
     * From an input array of strings, we want to build a GraphQL query string.
     * The process has to take the dot notation and parse it into a valid GraphQL query
     * Following this SO answer https://stackoverflow.com/a/47705476/1212166
     *
     * INPUT
     *  ['firstName', 'lastName', 'billing.address.street', 'billing.address.zip']
     * OUTPUT
     * firstName, lastName, billing{address{street, zip}}
     * @param inputArray
     */
    GraphqlService.prototype.buildFilterQuery = function (inputArray) {
        var set = function (o, a) {
            if (o === void 0) { o = {}; }
            var k = a.shift();
            o[k] = a.length ? set(o[k], a) : null;
            return o;
        };
        var output = inputArray.reduce(function (o, a) { return set(o, a.split('.')); }, {});
        return JSON.stringify(output)
            .replace(/\"|\:|null/g, '')
            .replace(/^\{/, '')
            .replace(/\}$/, '');
    };
    GraphqlService.prototype.clearFilters = function () {
        this._currentFilters = [];
        this.updateOptions({ filteringOptions: [] });
    };
    GraphqlService.prototype.clearSorters = function () {
        this._currentSorters = [];
        this.updateOptions({ sortingOptions: [] });
    };
    GraphqlService.prototype.init = function (serviceOptions, pagination, grid) {
        this._grid = grid;
        this.options = serviceOptions || {};
        this.pagination = pagination;
        if (grid && grid.getColumns) {
            this._columnDefinitions = serviceOptions.columnDefinitions || grid.getColumns();
        }
    };
    /**
     * Get an initialization of Pagination options
     * @return Pagination Options
     */
    GraphqlService.prototype.getInitPaginationOptions = function () {
        return (this.options.isWithCursor) ? { first: (this.pagination ? this.pagination.pageSize : DEFAULT_ITEMS_PER_PAGE) } : { first: (this.pagination ? this.pagination.pageSize : DEFAULT_ITEMS_PER_PAGE), offset: 0 };
    };
    /** Get the GraphQL dataset name */
    GraphqlService.prototype.getDatasetName = function () {
        return this.options.datasetName || '';
    };
    /** Get the Filters that are currently used by the grid */
    GraphqlService.prototype.getCurrentFilters = function () {
        return this._currentFilters;
    };
    /** Get the Pagination that is currently used by the grid */
    GraphqlService.prototype.getCurrentPagination = function () {
        return this._currentPagination;
    };
    /** Get the Sorters that are currently used by the grid */
    GraphqlService.prototype.getCurrentSorters = function () {
        return this._currentSorters;
    };
    /*
     * Reset the pagination options
     */
    GraphqlService.prototype.resetPaginationOptions = function () {
        var paginationOptions;
        if (this.options.isWithCursor) {
            // first, last, after, before
            paginationOptions = {
                after: '',
                before: undefined,
                last: undefined
            };
        }
        else {
            // first, last, offset
            paginationOptions = (this.options.paginationOptions || this.getInitPaginationOptions());
            paginationOptions.offset = 0;
        }
        // save current pagination as Page 1 and page size as "first" set size
        this._currentPagination = {
            pageNumber: 1,
            pageSize: paginationOptions.first
        };
        this.updateOptions({ paginationOptions: paginationOptions });
    };
    GraphqlService.prototype.updateOptions = function (serviceOptions) {
        this.options = tslib_1.__assign({}, this.options, serviceOptions);
    };
    /*
     * FILTERING
     */
    GraphqlService.prototype.processOnFilterChanged = function (event, args) {
        var _this = this;
        var gridOptions = this._gridOptions || args.grid.getOptions();
        var backendApi = gridOptions.backendServiceApi;
        if (backendApi === undefined) {
            throw new Error('Something went wrong in the GraphqlService, "backendServiceApi" is not initialized');
        }
        // keep current filters & always save it as an array (columnFilters can be an object when it is dealt by SlickGrid Filter)
        this._currentFilters = this.castFilterToColumnFilter(args.columnFilters);
        var promise = new Promise(function (resolve, reject) {
            if (!args || !args.grid) {
                throw new Error('Something went wrong when trying create the GraphQL Backend Service, it seems that "args" is not populated correctly');
            }
            // loop through all columns to inspect filters & set the query
            _this.updateFilters(args.columnFilters, false);
            _this.resetPaginationOptions();
            resolve(_this.buildQuery());
        });
        return promise;
    };
    /*
     * PAGINATION
     * With cursor, the query can have 4 arguments (first, after, last, before), for example:
     *   users (first:20, after:"YXJyYXljb25uZWN0aW9uOjM=") {
     *     totalCount
     *     pageInfo {
     *       hasNextPage
     *       endCursor
     *     }
     *     edges {
     *       cursor
     *       node {
     *         name
     *         gender
     *       }
     *     }
     *   }
     * Without cursor, the query can have 3 arguments (first, last, offset), for example:
     *   users (first:20, offset: 10) {
     *     totalCount
     *     nodes {
     *       name
     *       gender
     *     }
     *   }
     */
    GraphqlService.prototype.processOnPaginationChanged = function (event, args) {
        var pageSize = +(args.pageSize || ((this.pagination) ? this.pagination.pageSize : DEFAULT_PAGE_SIZE));
        this.updatePagination(args.newPage, pageSize);
        // build the GraphQL query which we will use in the WebAPI callback
        return this.buildQuery();
    };
    /*
     * SORTING
     * we will use sorting as per a Facebook suggestion on a Github issue (with some small changes)
     * https://github.com/graphql/graphql-relay-js/issues/20#issuecomment-220494222
     */
    GraphqlService.prototype.processOnSortChanged = function (event, args) {
        var sortColumns = (args.multiColumnSort) ? args.sortCols : new Array({ sortCol: args.sortCol, sortAsc: args.sortAsc });
        // loop through all columns to inspect sorters & set the query
        this.updateSorters(sortColumns);
        // build the GraphQL query which we will use in the WebAPI callback
        return this.buildQuery();
    };
    /**
     * loop through all columns to inspect filters & update backend service filteringOptions
     * @param columnFilters
     */
    GraphqlService.prototype.updateFilters = function (columnFilters, isUpdatedByPreset) {
        var searchByArray = [];
        var searchValue;
        // on filter preset load, we need to keep current filters
        if (isUpdatedByPreset) {
            this._currentFilters = this.castFilterToColumnFilter(columnFilters);
        }
        var _loop_1 = function (columnId) {
            if (columnFilters.hasOwnProperty(columnId)) {
                var columnFilter_1 = columnFilters[columnId];
                // if user defined some "presets", then we need to find the filters from the column definitions instead
                var columnDef = void 0;
                if (isUpdatedByPreset && Array.isArray(this_1._columnDefinitions)) {
                    columnDef = this_1._columnDefinitions.find(function (column) { return column.id === columnFilter_1.columnId; });
                }
                else {
                    columnDef = columnFilter_1.columnDef;
                }
                if (!columnDef) {
                    throw new Error('[Backend Service API]: Something went wrong in trying to get the column definition of the specified filter (or preset filters). Did you make a typo on the filter columnId?');
                }
                var fieldName = columnDef.queryField || columnDef.queryFieldFilter || columnDef.field || columnDef.name || '';
                var searchTerms = (columnFilter_1 ? columnFilter_1.searchTerms : null) || [];
                var fieldSearchValue = (Array.isArray(searchTerms) && searchTerms.length === 1) ? searchTerms[0] : '';
                if (typeof fieldSearchValue === 'undefined') {
                    fieldSearchValue = '';
                }
                if (typeof fieldSearchValue !== 'string' && !searchTerms) {
                    throw new Error("GraphQL filter searchTerm property must be provided as type \"string\", if you use filter with options then make sure your IDs are also string. For example: filter: {model: Filters.select, collection: [{ id: \"0\", value: \"0\" }, { id: \"1\", value: \"1\" }]");
                }
                fieldSearchValue = '' + fieldSearchValue; // make sure it's a string
                var matches = fieldSearchValue.match(/^([<>!=\*]{0,2})(.*[^<>!=\*])([\*]?)$/); // group 1: Operator, 2: searchValue, 3: last char is '*' (meaning starts with, ex.: abc*)
                var operator = columnFilter_1.operator || ((matches) ? matches[1] : '');
                searchValue = (!!matches) ? matches[2] : '';
                var lastValueChar = (!!matches) ? matches[3] : (operator === '*z' ? '*' : '');
                // no need to query if search value is empty
                if (fieldName && searchValue === '' && searchTerms.length === 0) {
                    return "continue";
                }
                // when having more than 1 search term (we need to create a CSV string for GraphQL "IN" or "NOT IN" filter search)
                if (searchTerms && searchTerms.length > 1) {
                    searchValue = searchTerms.join(',');
                }
                else if (typeof searchValue === 'string') {
                    // escaping the search value
                    searchValue = searchValue.replace("'", "''"); // escape single quotes by doubling them
                    if (operator === '*' || operator === 'a*' || operator === '*z' || lastValueChar === '*') {
                        operator = (operator === '*' || operator === '*z') ? 'endsWith' : 'startsWith';
                    }
                }
                // if we didn't find an Operator but we have a Filter Type, we should use default Operator
                // multipleSelect is "IN", while singleSelect is "EQ", else don't map any operator
                if (!operator && columnDef.filter) {
                    operator = columnDef.filter.operator;
                }
                // if we still don't have an operator find the proper Operator to use by it's field type
                if (!operator) {
                    operator = mapOperatorByFieldType(columnDef.type || FieldType.string);
                }
                searchByArray.push({
                    field: fieldName,
                    operator: mapOperatorType(operator),
                    value: searchValue
                });
            }
        };
        var this_1 = this;
        for (var columnId in columnFilters) {
            _loop_1(columnId);
        }
        // update the service options with filters for the buildQuery() to work later
        this.updateOptions({ filteringOptions: searchByArray });
    };
    /**
     * Update the pagination component with it's new page number and size
     * @param newPage
     * @param pageSize
     */
    GraphqlService.prototype.updatePagination = function (newPage, pageSize) {
        this._currentPagination = {
            pageNumber: newPage,
            pageSize: pageSize
        };
        var paginationOptions;
        if (this.options.isWithCursor) {
            paginationOptions = {
                first: pageSize
            };
        }
        else {
            paginationOptions = {
                first: pageSize,
                offset: (newPage - 1) * pageSize
            };
        }
        this.updateOptions({ paginationOptions: paginationOptions });
    };
    /**
     * loop through all columns to inspect sorters & update backend service sortingOptions
     * @param columnFilters
     */
    GraphqlService.prototype.updateSorters = function (sortColumns, presetSorters) {
        var _this = this;
        var e_3, _a;
        var currentSorters = [];
        var graphqlSorters = [];
        if (!sortColumns && presetSorters) {
            // make the presets the current sorters, also make sure that all direction are in uppercase for GraphQL
            currentSorters = presetSorters;
            currentSorters.forEach(function (sorter) { return sorter.direction = sorter.direction.toUpperCase(); });
            // display the correct sorting icons on the UI, for that it requires (columnId, sortAsc) properties
            var tmpSorterArray = currentSorters.map(function (sorter) {
                var columnDef = _this._columnDefinitions.find(function (column) { return column.id === sorter.columnId; });
                graphqlSorters.push({
                    field: columnDef ? ((columnDef.queryField || columnDef.queryFieldSorter || columnDef.field || columnDef.id) + '') : (sorter.columnId + ''),
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
            // set the sort icons, but also make sure to filter out null values (happens when no columnDef found)
            if (Array.isArray(tmpSorterArray)) {
                this._grid.setSortColumns(tmpSorterArray.filter(function (sorter) { return sorter; }));
            }
        }
        else if (sortColumns && !presetSorters) {
            // build the orderBy array, it could be multisort, example
            // orderBy:[{field: lastName, direction: ASC}, {field: firstName, direction: DESC}]
            if (Array.isArray(sortColumns) && sortColumns.length > 0) {
                try {
                    for (var sortColumns_1 = tslib_1.__values(sortColumns), sortColumns_1_1 = sortColumns_1.next(); !sortColumns_1_1.done; sortColumns_1_1 = sortColumns_1.next()) {
                        var column = sortColumns_1_1.value;
                        if (column && column.sortCol) {
                            currentSorters.push({
                                columnId: column.sortCol.id + '',
                                direction: column.sortAsc ? SortDirection.ASC : SortDirection.DESC
                            });
                            graphqlSorters.push({
                                field: (column.sortCol.queryField || column.sortCol.queryFieldSorter || column.sortCol.field || column.sortCol.id) + '',
                                direction: column.sortAsc ? SortDirection.ASC : SortDirection.DESC
                            });
                        }
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (sortColumns_1_1 && !sortColumns_1_1.done && (_a = sortColumns_1.return)) _a.call(sortColumns_1);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
            }
        }
        // keep current Sorters and update the service options with the new sorting
        this._currentSorters = currentSorters;
        this.updateOptions({ sortingOptions: graphqlSorters });
    };
    /**
     * A function which takes an input string and removes double quotes only
     * on certain fields are identified as GraphQL enums (except fields with dot notation)
     * For example let say we identified ("direction:", "sort") as word which are GraphQL enum fields
     * then the result will be:
     * FROM
     * query { users (orderBy:[{field:"firstName", direction:"ASC"} }]) }
     * TO
     * query { users (orderBy:[{field: firstName, direction: ASC}})}
     *
     * EXCEPTIONS (fields with dot notation "." which are inside a "field:")
     * these fields will keep double quotes while everything else will be stripped of double quotes
     * query { users (orderBy:[{field:"billing.street.name", direction: "ASC"} }
     * TO
     * query { users (orderBy:[{field:"billing.street.name", direction: ASC}}
     * @param inputStr input string
     * @param enumSearchWords array of enum words to filter
     * @returns outputStr output string
     */
    GraphqlService.prototype.trimDoubleQuotesOnEnumField = function (inputStr, enumSearchWords, keepArgumentFieldDoubleQuotes) {
        var patternWordInQuotes = "s?((field:s*)?\".*?\")";
        var patternRegex = enumSearchWords.join(patternWordInQuotes + '|');
        patternRegex += patternWordInQuotes; // the last one should also have the pattern but without the pipe "|"
        // example with (field: & direction:):  /field:s?(".*?")|direction:s?(".*?")/
        var reg = new RegExp(patternRegex, 'g');
        return inputStr.replace(reg, function (group1, group2, group3) {
            // remove double quotes except when the string starts with a "field:"
            var removeDoubleQuotes = true;
            if (group1.startsWith('field:') && keepArgumentFieldDoubleQuotes) {
                removeDoubleQuotes = false;
            }
            var rep = removeDoubleQuotes ? group1.replace(/"/g, '') : group1;
            return rep;
        });
    };
    //
    // private functions
    // -------------------
    /**
     * Cast provided filters (could be in multiple format) into an array of ColumnFilter
     * @param columnFilters
     */
    GraphqlService.prototype.castFilterToColumnFilter = function (columnFilters) {
        // keep current filters & always save it as an array (columnFilters can be an object when it is dealt by SlickGrid Filter)
        var filtersArray = (typeof columnFilters === 'object') ? Object.keys(columnFilters).map(function (key) { return columnFilters[key]; }) : columnFilters;
        return filtersArray.map(function (filter) {
            var tmpFilter = { columnId: filter.columnId || '' };
            if (filter.operator) {
                tmpFilter.operator = filter.operator;
            }
            if (Array.isArray(filter.searchTerms)) {
                tmpFilter.searchTerms = filter.searchTerms;
            }
            return tmpFilter;
        });
    };
    return GraphqlService;
}());
export { GraphqlService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhcGhxbC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9zZXJ2aWNlcy9ncmFwaHFsLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxlQUFlLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDdEUsT0FBTyxFQVNMLFNBQVMsRUFZVCxhQUFhLEVBRWQsTUFBTSxtQkFBbUIsQ0FBQztBQUMzQixPQUFPLFlBQVksTUFBTSx1QkFBdUIsQ0FBQztBQUVqRCxJQUFNLHNCQUFzQixHQUFHLEVBQUUsQ0FBQztBQUNsQyxJQUFNLGlCQUFpQixHQUFHLEVBQUUsQ0FBQztBQUU3QjtJQUFBO1FBQ1Usb0JBQWUsR0FBb0MsRUFBRSxDQUFDO1FBRXRELG9CQUFlLEdBQW9CLEVBQUUsQ0FBQztRQUs5Qyw2QkFBd0IsR0FBNEQ7WUFDbEYsS0FBSyxFQUFFLHNCQUFzQjtZQUM3QixNQUFNLEVBQUUsQ0FBQztTQUNWLENBQUM7SUFvZ0JKLENBQUM7SUFqZ0JDLHNCQUFZLHdDQUFZO1FBRHhCLGlFQUFpRTthQUNqRTtZQUNFLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUM5RSxDQUFDOzs7T0FBQTtJQUVEOzs7T0FHRztJQUNILG1DQUFVLEdBQVY7O1FBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFO1lBQy9H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QUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxhQUFhLENBQUMsR0FBRyxDQUFDLEVBQWxCLENBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDO1FBRXJKLE9BQU8sWUFBWSxDQUFDLEdBQUcsQ0FBQyxVQUFDLE1BQU07WUFDN0IsSUFBTSxTQUFTLEdBQWtCLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQyxRQUFRLElBQUksRUFBRSxFQUFFLENBQUM7WUFDckUsSUFBSSxNQUFNLENBQUMsUUFBUSxFQUFFO2dCQUNuQixTQUFTLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUM7YUFDdEM7WUFDRCxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxFQUFFO2dCQUNyQyxTQUFTLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUM7YUFDNUM7WUFDRCxPQUFPLFNBQVMsQ0FBQztRQUNuQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDSCxxQkFBQztBQUFELENBQUMsQUEvZ0JELElBK2dCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IG1hcE9wZXJhdG9yVHlwZSwgbWFwT3BlcmF0b3JCeUZpZWxkVHlwZSB9IGZyb20gJy4vdXRpbGl0aWVzJztcclxuaW1wb3J0IHtcclxuICBCYWNrZW5kU2VydmljZSxcclxuICBDb2x1bW4sXHJcbiAgQ29sdW1uRmlsdGVyLFxyXG4gIENvbHVtbkZpbHRlcnMsXHJcbiAgQ29sdW1uU29ydCxcclxuICBDdXJyZW50RmlsdGVyLFxyXG4gIEN1cnJlbnRQYWdpbmF0aW9uLFxyXG4gIEN1cnJlbnRTb3J0ZXIsXHJcbiAgRmllbGRUeXBlLFxyXG4gIEZpbHRlckNoYW5nZWRBcmdzLFxyXG4gIEdyYXBocWxDdXJzb3JQYWdpbmF0aW9uT3B0aW9uLFxyXG4gIEdyYXBocWxEYXRhc2V0RmlsdGVyLFxyXG4gIEdyYXBocWxGaWx0ZXJpbmdPcHRpb24sXHJcbiAgR3JhcGhxbFBhZ2luYXRpb25PcHRpb24sXHJcbiAgR3JhcGhxbFNlcnZpY2VPcHRpb24sXHJcbiAgR3JhcGhxbFNvcnRpbmdPcHRpb24sXHJcbiAgR3JpZE9wdGlvbixcclxuICBQYWdpbmF0aW9uLFxyXG4gIFBhZ2luYXRpb25DaGFuZ2VkQXJncyxcclxuICBTb3J0Q2hhbmdlZEFyZ3MsXHJcbiAgU29ydERpcmVjdGlvbixcclxuICBTb3J0RGlyZWN0aW9uU3RyaW5nXHJcbn0gZnJvbSAnLi8uLi9tb2RlbHMvaW5kZXgnO1xyXG5pbXBvcnQgUXVlcnlCdWlsZGVyIGZyb20gJy4vZ3JhcGhxbFF1ZXJ5QnVpbGRlcic7XHJcblxyXG5jb25zdCBERUZBVUxUX0lURU1TX1BFUl9QQUdFID0gMjU7XHJcbmNvbnN0IERFRkFVTFRfUEFHRV9TSVpFID0gMjA7XHJcblxyXG5leHBvcnQgY2xhc3MgR3JhcGhxbFNlcnZpY2UgaW1wbGVtZW50cyBCYWNrZW5kU2VydmljZSB7XHJcbiAgcHJpdmF0ZSBfY3VycmVudEZpbHRlcnM6IENvbHVtbkZpbHRlcnMgfCBDdXJyZW50RmlsdGVyW10gPSBbXTtcclxuICBwcml2YXRlIF9jdXJyZW50UGFnaW5hdGlvbjogQ3VycmVudFBhZ2luYXRpb247XHJcbiAgcHJpdmF0ZSBfY3VycmVudFNvcnRlcnM6IEN1cnJlbnRTb3J0ZXJbXSA9IFtdO1xyXG4gIHByaXZhdGUgX2NvbHVtbkRlZmluaXRpb25zOiBDb2x1bW5bXTtcclxuICBwcml2YXRlIF9ncmlkOiBhbnk7XHJcbiAgb3B0aW9uczogR3JhcGhxbFNlcnZpY2VPcHRpb247XHJcbiAgcGFnaW5hdGlvbjogUGFnaW5hdGlvbiB8IHVuZGVmaW5lZDtcclxuICBkZWZhdWx0UGFnaW5hdGlvbk9wdGlvbnM6IEdyYXBocWxQYWdpbmF0aW9uT3B0aW9uIHwgR3JhcGhxbEN1cnNvclBhZ2luYXRpb25PcHRpb24gPSB7XHJcbiAgICBmaXJzdDogREVGQVVMVF9JVEVNU19QRVJfUEFHRSxcclxuICAgIG9mZnNldDogMFxyXG4gIH07XHJcblxyXG4gIC8qKiBHZXR0ZXIgZm9yIHRoZSBHcmlkIE9wdGlvbnMgcHVsbGVkIHRocm91Z2ggdGhlIEdyaWQgT2JqZWN0ICovXHJcbiAgcHJpdmF0ZSBnZXQgX2dyaWRPcHRpb25zKCk6IEdyaWRPcHRpb24ge1xyXG4gICAgcmV0dXJuICh0aGlzLl9ncmlkICYmIHRoaXMuX2dyaWQuZ2V0T3B0aW9ucykgPyB0aGlzLl9ncmlkLmdldE9wdGlvbnMoKSA6IHt9O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQnVpbGQgdGhlIEdyYXBoUUwgcXVlcnksIHNpbmNlIHRoZSBzZXJ2aWNlIGluY2x1ZGUvZXhjbHVkZSBjdXJzb3IsIHRoZSBvdXRwdXQgcXVlcnkgd2lsbCBiZSBkaWZmZXJlbnQuXHJcbiAgICogQHBhcmFtIHNlcnZpY2VPcHRpb25zIEdyYXBocWxTZXJ2aWNlT3B0aW9uXHJcbiAgICovXHJcbiAgYnVpbGRRdWVyeSgpIHtcclxuICAgIGlmICghdGhpcy5vcHRpb25zIHx8ICF0aGlzLm9wdGlvbnMuZGF0YXNldE5hbWUgfHwgKCF0aGlzLl9jb2x1bW5EZWZpbml0aW9ucyAmJiAhdGhpcy5vcHRpb25zLmNvbHVtbkRlZmluaXRpb25zKSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0dyYXBoUUwgU2VydmljZSByZXF1aXJlcyBcImRhdGFzZXROYW1lXCIgJiBcImNvbHVtbkRlZmluaXRpb25zXCIgcHJvcGVydGllcyBmb3IgaXQgdG8gd29yaycpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGdldCB0aGUgY29sdW1uIGRlZmluaXRpb25zIGFuZCBleGNsdWRlIHNvbWUgaWYgdGhleSB3ZXJlIHRhZ2dlZCBhcyBleGNsdWRlZFxyXG4gICAgbGV0IGNvbHVtbkRlZmluaXRpb25zID0gdGhpcy5fY29sdW1uRGVmaW5pdGlvbnMgfHwgdGhpcy5vcHRpb25zLmNvbHVtbkRlZmluaXRpb25zO1xyXG4gICAgY29sdW1uRGVmaW5pdGlvbnMgPSBjb2x1bW5EZWZpbml0aW9ucy5maWx0ZXIoKGNvbHVtbjogQ29sdW1uKSA9PiAhY29sdW1uLmV4Y2x1ZGVGcm9tUXVlcnkpO1xyXG5cclxuICAgIGNvbnN0IHF1ZXJ5UWIgPSBuZXcgUXVlcnlCdWlsZGVyKCdxdWVyeScpO1xyXG4gICAgY29uc3QgZGF0YXNldFFiID0gbmV3IFF1ZXJ5QnVpbGRlcih0aGlzLm9wdGlvbnMuZGF0YXNldE5hbWUpO1xyXG4gICAgY29uc3QgZGF0YVFiID0gKHRoaXMub3B0aW9ucy5pc1dpdGhDdXJzb3IpID8gbmV3IFF1ZXJ5QnVpbGRlcignZWRnZXMnKSA6IG5ldyBRdWVyeUJ1aWxkZXIoJ25vZGVzJyk7XHJcblxyXG4gICAgLy8gZ2V0IGFsbCB0aGUgY29sdW1uZHMgSWRzIGZvciB0aGUgZmlsdGVycyB0byB3b3JrXHJcbiAgICBsZXQgY29sdW1uSWRzOiBzdHJpbmdbXSA9IFtdO1xyXG4gICAgaWYgKGNvbHVtbkRlZmluaXRpb25zICYmIEFycmF5LmlzQXJyYXkoY29sdW1uRGVmaW5pdGlvbnMpKSB7XHJcbiAgICAgIGZvciAoY29uc3QgY29sdW1uIG9mIGNvbHVtbkRlZmluaXRpb25zKSB7XHJcbiAgICAgICAgY29sdW1uSWRzLnB1c2goY29sdW1uLmZpZWxkKTtcclxuXHJcbiAgICAgICAgLy8gaWYgZXh0cmEgXCJmaWVsZHNcIiBhcmUgcGFzc2VkLCBhbHNvIHB1c2ggdGhlbSB0byBjb2x1bW5JZHNcclxuICAgICAgICBpZiAoY29sdW1uLmZpZWxkcykge1xyXG4gICAgICAgICAgY29sdW1uSWRzLnB1c2goLi4uY29sdW1uLmZpZWxkcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIC8vIGNvbHVtbklkcyA9IGNvbHVtbkRlZmluaXRpb25zLm1hcCgoY29sdW1uKSA9PiBjb2x1bW4uZmllbGQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29sdW1uSWRzID0gdGhpcy5vcHRpb25zLmNvbHVtbklkcyB8fCBbXTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBTbGlja2dyaWQgYWxzbyByZXF1aXJlcyB0aGUgXCJpZFwiIGZpZWxkIHRvIGJlIHBhcnQgb2YgRGF0YVZpZXdcclxuICAgIC8vIGFkZCBpdCB0byB0aGUgR3JhcGhRTCBxdWVyeSBpZiBpdCB3YXNuJ3QgYWxyZWFkeSBwYXJ0IG9mIHRoZSBsaXN0XHJcbiAgICBpZiAoY29sdW1uSWRzLmluZGV4T2YoJ2lkJykgPT09IC0xKSB7XHJcbiAgICAgIGNvbHVtbklkcy51bnNoaWZ0KCdpZCcpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGZpbHRlcnMgPSB0aGlzLmJ1aWxkRmlsdGVyUXVlcnkoY29sdW1uSWRzKTtcclxuXHJcbiAgICBpZiAodGhpcy5vcHRpb25zLmlzV2l0aEN1cnNvcikge1xyXG4gICAgICAvLyAuLi5wYWdlSW5mbyB7IGhhc05leHRQYWdlLCBlbmRDdXJzb3IgfSwgZWRnZXMgeyBjdXJzb3IsIG5vZGUgeyBfZmlsdGVyc18gfSB9XHJcbiAgICAgIGNvbnN0IHBhZ2VJbmZvUWIgPSBuZXcgUXVlcnlCdWlsZGVyKCdwYWdlSW5mbycpO1xyXG4gICAgICBwYWdlSW5mb1FiLmZpbmQoJ2hhc05leHRQYWdlJywgJ2VuZEN1cnNvcicpO1xyXG4gICAgICBkYXRhUWIuZmluZChbJ2N1cnNvcicsIHsgbm9kZTogZmlsdGVycyB9XSk7XHJcbiAgICAgIGRhdGFzZXRRYi5maW5kKFsndG90YWxDb3VudCcsIHBhZ2VJbmZvUWIsIGRhdGFRYl0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gLi4ubm9kZXMgeyBfZmlsdGVyc18gfVxyXG4gICAgICBkYXRhUWIuZmluZChmaWx0ZXJzKTtcclxuICAgICAgZGF0YXNldFFiLmZpbmQoWyd0b3RhbENvdW50JywgZGF0YVFiXSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gYWRkIGRhdGFzZXQgZmlsdGVycywgY291bGQgYmUgUGFnaW5hdGlvbiBhbmQgU29ydGluZ0ZpbHRlcnMgYW5kL29yIEZpZWxkRmlsdGVyc1xyXG4gICAgbGV0IGRhdGFzZXRGaWx0ZXJzOiBHcmFwaHFsRGF0YXNldEZpbHRlciA9IHt9O1xyXG5cclxuICAgIC8vIG9ubHkgYWRkIHBhZ2luYXRpb24gaWYgaXQncyBlbmFibGVkIGluIHRoZSBncmlkIG9wdGlvbnNcclxuICAgIGlmICh0aGlzLl9ncmlkT3B0aW9ucy5lbmFibGVQYWdpbmF0aW9uICE9PSBmYWxzZSkge1xyXG4gICAgICBkYXRhc2V0RmlsdGVycyA9IHtcclxuICAgICAgICAuLi50aGlzLm9wdGlvbnMucGFnaW5hdGlvbk9wdGlvbnMsXHJcbiAgICAgICAgZmlyc3Q6ICgodGhpcy5vcHRpb25zLnBhZ2luYXRpb25PcHRpb25zICYmIHRoaXMub3B0aW9ucy5wYWdpbmF0aW9uT3B0aW9ucy5maXJzdCkgPyB0aGlzLm9wdGlvbnMucGFnaW5hdGlvbk9wdGlvbnMuZmlyc3QgOiAoKHRoaXMucGFnaW5hdGlvbiAmJiB0aGlzLnBhZ2luYXRpb24ucGFnZVNpemUpID8gdGhpcy5wYWdpbmF0aW9uLnBhZ2VTaXplIDogbnVsbCkpIHx8IHRoaXMuZGVmYXVsdFBhZ2luYXRpb25PcHRpb25zLmZpcnN0XHJcbiAgICAgIH07XHJcblxyXG4gICAgICBpZiAoIXRoaXMub3B0aW9ucy5pc1dpdGhDdXJzb3IpIHtcclxuICAgICAgICBkYXRhc2V0RmlsdGVycy5vZmZzZXQgPSAoKHRoaXMub3B0aW9ucy5wYWdpbmF0aW9uT3B0aW9ucyAmJiB0aGlzLm9wdGlvbnMucGFnaW5hdGlvbk9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ29mZnNldCcpKSA/ICt0aGlzLm9wdGlvbnMucGFnaW5hdGlvbk9wdGlvbnNbJ29mZnNldCddIDogMCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5vcHRpb25zLnNvcnRpbmdPcHRpb25zICYmIEFycmF5LmlzQXJyYXkodGhpcy5vcHRpb25zLnNvcnRpbmdPcHRpb25zKSAmJiB0aGlzLm9wdGlvbnMuc29ydGluZ09wdGlvbnMubGVuZ3RoID4gMCkge1xyXG4gICAgICAvLyBvcmRlckJ5OiBbeyBmaWVsZDp4LCBkaXJlY3Rpb246ICdBU0MnIH1dXHJcbiAgICAgIGRhdGFzZXRGaWx0ZXJzLm9yZGVyQnkgPSB0aGlzLm9wdGlvbnMuc29ydGluZ09wdGlvbnM7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5vcHRpb25zLmZpbHRlcmluZ09wdGlvbnMgJiYgQXJyYXkuaXNBcnJheSh0aGlzLm9wdGlvbnMuZmlsdGVyaW5nT3B0aW9ucykgJiYgdGhpcy5vcHRpb25zLmZpbHRlcmluZ09wdGlvbnMubGVuZ3RoID4gMCkge1xyXG4gICAgICAvLyBmaWx0ZXJCeTogW3sgZmllbGQ6IGRhdGUsIG9wZXJhdG9yOiAnPicsIHZhbHVlOiAnMjAwMC0xMC0xMCcgfV1cclxuICAgICAgZGF0YXNldEZpbHRlcnMuZmlsdGVyQnkgPSB0aGlzLm9wdGlvbnMuZmlsdGVyaW5nT3B0aW9ucztcclxuICAgIH1cclxuICAgIGlmICh0aGlzLm9wdGlvbnMuYWRkTG9jYWxlSW50b1F1ZXJ5KSB7XHJcbiAgICAgIC8vIGZpcnN0OiAyMCwgLi4uIGxvY2FsZTogXCJlbi1DQVwiXHJcbiAgICAgIGRhdGFzZXRGaWx0ZXJzLmxvY2FsZSA9IHRoaXMuX2dyaWRPcHRpb25zICYmIHRoaXMuX2dyaWRPcHRpb25zLmkxOG4gJiYgdGhpcy5fZ3JpZE9wdGlvbnMuaTE4bi5jdXJyZW50TGFuZyB8fCAnZW4nO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5leHRyYVF1ZXJ5QXJndW1lbnRzKSB7XHJcbiAgICAgIC8vIGZpcnN0OiAyMCwgLi4uIHVzZXJJZDogMTIzXHJcbiAgICAgIGZvciAoY29uc3QgcXVlcnlBcmd1bWVudCBvZiB0aGlzLm9wdGlvbnMuZXh0cmFRdWVyeUFyZ3VtZW50cykge1xyXG4gICAgICAgIGRhdGFzZXRGaWx0ZXJzW3F1ZXJ5QXJndW1lbnQuZmllbGRdID0gcXVlcnlBcmd1bWVudC52YWx1ZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIHF1ZXJ5IHsgdXNlcnMoZmlyc3Q6IDIwLCBvcmRlckJ5OiBbXSwgZmlsdGVyQnk6IFtdKX1cclxuICAgIGRhdGFzZXRRYi5maWx0ZXIoZGF0YXNldEZpbHRlcnMpO1xyXG4gICAgcXVlcnlRYi5maW5kKGRhdGFzZXRRYik7XHJcblxyXG4gICAgY29uc3QgZW51bVNlYXJjaFByb3BlcnRpZXMgPSBbJ2RpcmVjdGlvbjonLCAnZmllbGQ6JywgJ29wZXJhdG9yOiddO1xyXG4gICAgcmV0dXJuIHRoaXMudHJpbURvdWJsZVF1b3Rlc09uRW51bUZpZWxkKHF1ZXJ5UWIudG9TdHJpbmcoKSwgZW51bVNlYXJjaFByb3BlcnRpZXMsIHRoaXMub3B0aW9ucy5rZWVwQXJndW1lbnRGaWVsZERvdWJsZVF1b3RlcyB8fCBmYWxzZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBGcm9tIGFuIGlucHV0IGFycmF5IG9mIHN0cmluZ3MsIHdlIHdhbnQgdG8gYnVpbGQgYSBHcmFwaFFMIHF1ZXJ5IHN0cmluZy5cclxuICAgKiBUaGUgcHJvY2VzcyBoYXMgdG8gdGFrZSB0aGUgZG90IG5vdGF0aW9uIGFuZCBwYXJzZSBpdCBpbnRvIGEgdmFsaWQgR3JhcGhRTCBxdWVyeVxyXG4gICAqIEZvbGxvd2luZyB0aGlzIFNPIGFuc3dlciBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvNDc3MDU0NzYvMTIxMjE2NlxyXG4gICAqXHJcbiAgICogSU5QVVRcclxuICAgKiAgWydmaXJzdE5hbWUnLCAnbGFzdE5hbWUnLCAnYmlsbGluZy5hZGRyZXNzLnN0cmVldCcsICdiaWxsaW5nLmFkZHJlc3MuemlwJ11cclxuICAgKiBPVVRQVVRcclxuICAgKiBmaXJzdE5hbWUsIGxhc3ROYW1lLCBiaWxsaW5ne2FkZHJlc3N7c3RyZWV0LCB6aXB9fVxyXG4gICAqIEBwYXJhbSBpbnB1dEFycmF5XHJcbiAgICovXHJcbiAgYnVpbGRGaWx0ZXJRdWVyeShpbnB1dEFycmF5OiBzdHJpbmdbXSkge1xyXG5cclxuICAgIGNvbnN0IHNldCA9IChvOiBhbnkgPSB7fSwgYTogYW55KSA9PiB7XHJcbiAgICAgIGNvbnN0IGsgPSBhLnNoaWZ0KCk7XHJcbiAgICAgIG9ba10gPSBhLmxlbmd0aCA/IHNldChvW2tdLCBhKSA6IG51bGw7XHJcbiAgICAgIHJldHVybiBvO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBvdXRwdXQgPSBpbnB1dEFycmF5LnJlZHVjZSgobzogYW55LCBhOiBzdHJpbmcpID0+IHNldChvLCBhLnNwbGl0KCcuJykpLCB7fSk7XHJcblxyXG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KG91dHB1dClcclxuICAgICAgLnJlcGxhY2UoL1xcXCJ8XFw6fG51bGwvZywgJycpXHJcbiAgICAgIC5yZXBsYWNlKC9eXFx7LywgJycpXHJcbiAgICAgIC5yZXBsYWNlKC9cXH0kLywgJycpO1xyXG4gIH1cclxuXHJcbiAgY2xlYXJGaWx0ZXJzKCkge1xyXG4gICAgdGhpcy5fY3VycmVudEZpbHRlcnMgPSBbXTtcclxuICAgIHRoaXMudXBkYXRlT3B0aW9ucyh7IGZpbHRlcmluZ09wdGlvbnM6IFtdIH0pO1xyXG4gIH1cclxuXHJcbiAgY2xlYXJTb3J0ZXJzKCkge1xyXG4gICAgdGhpcy5fY3VycmVudFNvcnRlcnMgPSBbXTtcclxuICAgIHRoaXMudXBkYXRlT3B0aW9ucyh7IHNvcnRpbmdPcHRpb25zOiBbXSB9KTtcclxuICB9XHJcblxyXG4gIGluaXQoc2VydmljZU9wdGlvbnM/OiBHcmFwaHFsU2VydmljZU9wdGlvbiwgcGFnaW5hdGlvbj86IFBhZ2luYXRpb24sIGdyaWQ/OiBhbnkpOiB2b2lkIHtcclxuICAgIHRoaXMuX2dyaWQgPSBncmlkO1xyXG4gICAgdGhpcy5vcHRpb25zID0gc2VydmljZU9wdGlvbnMgfHwge307XHJcbiAgICB0aGlzLnBhZ2luYXRpb24gPSBwYWdpbmF0aW9uO1xyXG5cclxuICAgIGlmIChncmlkICYmIGdyaWQuZ2V0Q29sdW1ucykge1xyXG4gICAgICB0aGlzLl9jb2x1bW5EZWZpbml0aW9ucyA9IHNlcnZpY2VPcHRpb25zLmNvbHVtbkRlZmluaXRpb25zIHx8IGdyaWQuZ2V0Q29sdW1ucygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IGFuIGluaXRpYWxpemF0aW9uIG9mIFBhZ2luYXRpb24gb3B0aW9uc1xyXG4gICAqIEByZXR1cm4gUGFnaW5hdGlvbiBPcHRpb25zXHJcbiAgICovXHJcbiAgZ2V0SW5pdFBhZ2luYXRpb25PcHRpb25zKCk6IEdyYXBocWxEYXRhc2V0RmlsdGVyIHtcclxuICAgIHJldHVybiAodGhpcy5vcHRpb25zLmlzV2l0aEN1cnNvcikgPyB7IGZpcnN0OiAodGhpcy5wYWdpbmF0aW9uID8gdGhpcy5wYWdpbmF0aW9uLnBhZ2VTaXplIDogREVGQVVMVF9JVEVNU19QRVJfUEFHRSkgfSA6IHsgZmlyc3Q6ICh0aGlzLnBhZ2luYXRpb24gPyB0aGlzLnBhZ2luYXRpb24ucGFnZVNpemUgOiBERUZBVUxUX0lURU1TX1BFUl9QQUdFKSwgb2Zmc2V0OiAwIH07XHJcbiAgfVxyXG5cclxuICAvKiogR2V0IHRoZSBHcmFwaFFMIGRhdGFzZXQgbmFtZSAqL1xyXG4gIGdldERhdGFzZXROYW1lKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLmRhdGFzZXROYW1lIHx8ICcnO1xyXG4gIH1cclxuXHJcbiAgLyoqIEdldCB0aGUgRmlsdGVycyB0aGF0IGFyZSBjdXJyZW50bHkgdXNlZCBieSB0aGUgZ3JpZCAqL1xyXG4gIGdldEN1cnJlbnRGaWx0ZXJzKCk6IENvbHVtbkZpbHRlcnMgfCBDdXJyZW50RmlsdGVyW10ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRGaWx0ZXJzO1xyXG4gIH1cclxuXHJcbiAgLyoqIEdldCB0aGUgUGFnaW5hdGlvbiB0aGF0IGlzIGN1cnJlbnRseSB1c2VkIGJ5IHRoZSBncmlkICovXHJcbiAgZ2V0Q3VycmVudFBhZ2luYXRpb24oKTogQ3VycmVudFBhZ2luYXRpb24ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRQYWdpbmF0aW9uO1xyXG4gIH1cclxuXHJcbiAgLyoqIEdldCB0aGUgU29ydGVycyB0aGF0IGFyZSBjdXJyZW50bHkgdXNlZCBieSB0aGUgZ3JpZCAqL1xyXG4gIGdldEN1cnJlbnRTb3J0ZXJzKCk6IEN1cnJlbnRTb3J0ZXJbXSB7XHJcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudFNvcnRlcnM7XHJcbiAgfVxyXG5cclxuICAvKlxyXG4gICAqIFJlc2V0IHRoZSBwYWdpbmF0aW9uIG9wdGlvbnNcclxuICAgKi9cclxuICByZXNldFBhZ2luYXRpb25PcHRpb25zKCkge1xyXG4gICAgbGV0IHBhZ2luYXRpb25PcHRpb25zO1xyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5pc1dpdGhDdXJzb3IpIHtcclxuICAgICAgLy8gZmlyc3QsIGxhc3QsIGFmdGVyLCBiZWZvcmVcclxuICAgICAgcGFnaW5hdGlvbk9wdGlvbnMgPSB7XHJcbiAgICAgICAgYWZ0ZXI6ICcnLFxyXG4gICAgICAgIGJlZm9yZTogdW5kZWZpbmVkLFxyXG4gICAgICAgIGxhc3Q6IHVuZGVmaW5lZFxyXG4gICAgICB9IGFzIEdyYXBocWxDdXJzb3JQYWdpbmF0aW9uT3B0aW9uO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gZmlyc3QsIGxhc3QsIG9mZnNldFxyXG4gICAgICBwYWdpbmF0aW9uT3B0aW9ucyA9ICh0aGlzLm9wdGlvbnMucGFnaW5hdGlvbk9wdGlvbnMgfHwgdGhpcy5nZXRJbml0UGFnaW5hdGlvbk9wdGlvbnMoKSkgYXMgR3JhcGhxbFBhZ2luYXRpb25PcHRpb247XHJcbiAgICAgIHBhZ2luYXRpb25PcHRpb25zLm9mZnNldCA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gc2F2ZSBjdXJyZW50IHBhZ2luYXRpb24gYXMgUGFnZSAxIGFuZCBwYWdlIHNpemUgYXMgXCJmaXJzdFwiIHNldCBzaXplXHJcbiAgICB0aGlzLl9jdXJyZW50UGFnaW5hdGlvbiA9IHtcclxuICAgICAgcGFnZU51bWJlcjogMSxcclxuICAgICAgcGFnZVNpemU6IHBhZ2luYXRpb25PcHRpb25zLmZpcnN0XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMudXBkYXRlT3B0aW9ucyh7IHBhZ2luYXRpb25PcHRpb25zIH0pO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlT3B0aW9ucyhzZXJ2aWNlT3B0aW9ucz86IEdyYXBocWxTZXJ2aWNlT3B0aW9uKSB7XHJcbiAgICB0aGlzLm9wdGlvbnMgPSB7IC4uLnRoaXMub3B0aW9ucywgLi4uc2VydmljZU9wdGlvbnMgfTtcclxuICB9XHJcblxyXG4gIC8qXHJcbiAgICogRklMVEVSSU5HXHJcbiAgICovXHJcbiAgcHJvY2Vzc09uRmlsdGVyQ2hhbmdlZChldmVudDogRXZlbnQsIGFyZ3M6IEZpbHRlckNoYW5nZWRBcmdzKTogUHJvbWlzZTxzdHJpbmc+IHtcclxuICAgIGNvbnN0IGdyaWRPcHRpb25zOiBHcmlkT3B0aW9uID0gdGhpcy5fZ3JpZE9wdGlvbnMgfHwgYXJncy5ncmlkLmdldE9wdGlvbnMoKTtcclxuICAgIGNvbnN0IGJhY2tlbmRBcGkgPSBncmlkT3B0aW9ucy5iYWNrZW5kU2VydmljZUFwaTtcclxuXHJcbiAgICBpZiAoYmFja2VuZEFwaSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignU29tZXRoaW5nIHdlbnQgd3JvbmcgaW4gdGhlIEdyYXBocWxTZXJ2aWNlLCBcImJhY2tlbmRTZXJ2aWNlQXBpXCIgaXMgbm90IGluaXRpYWxpemVkJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8ga2VlcCBjdXJyZW50IGZpbHRlcnMgJiBhbHdheXMgc2F2ZSBpdCBhcyBhbiBhcnJheSAoY29sdW1uRmlsdGVycyBjYW4gYmUgYW4gb2JqZWN0IHdoZW4gaXQgaXMgZGVhbHQgYnkgU2xpY2tHcmlkIEZpbHRlcilcclxuICAgIHRoaXMuX2N1cnJlbnRGaWx0ZXJzID0gdGhpcy5jYXN0RmlsdGVyVG9Db2x1bW5GaWx0ZXIoYXJncy5jb2x1bW5GaWx0ZXJzKTtcclxuXHJcbiAgICBjb25zdCBwcm9taXNlID0gbmV3IFByb21pc2U8c3RyaW5nPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIGlmICghYXJncyB8fCAhYXJncy5ncmlkKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTb21ldGhpbmcgd2VudCB3cm9uZyB3aGVuIHRyeWluZyBjcmVhdGUgdGhlIEdyYXBoUUwgQmFja2VuZCBTZXJ2aWNlLCBpdCBzZWVtcyB0aGF0IFwiYXJnc1wiIGlzIG5vdCBwb3B1bGF0ZWQgY29ycmVjdGx5Jyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIGxvb3AgdGhyb3VnaCBhbGwgY29sdW1ucyB0byBpbnNwZWN0IGZpbHRlcnMgJiBzZXQgdGhlIHF1ZXJ5XHJcbiAgICAgIHRoaXMudXBkYXRlRmlsdGVycyhhcmdzLmNvbHVtbkZpbHRlcnMsIGZhbHNlKTtcclxuXHJcbiAgICAgIHRoaXMucmVzZXRQYWdpbmF0aW9uT3B0aW9ucygpO1xyXG4gICAgICByZXNvbHZlKHRoaXMuYnVpbGRRdWVyeSgpKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBwcm9taXNlO1xyXG4gIH1cclxuXHJcbiAgLypcclxuICAgKiBQQUdJTkFUSU9OXHJcbiAgICogV2l0aCBjdXJzb3IsIHRoZSBxdWVyeSBjYW4gaGF2ZSA0IGFyZ3VtZW50cyAoZmlyc3QsIGFmdGVyLCBsYXN0LCBiZWZvcmUpLCBmb3IgZXhhbXBsZTpcclxuICAgKiAgIHVzZXJzIChmaXJzdDoyMCwgYWZ0ZXI6XCJZWEp5WVhsamIyNXVaV04wYVc5dU9qTT1cIikge1xyXG4gICAqICAgICB0b3RhbENvdW50XHJcbiAgICogICAgIHBhZ2VJbmZvIHtcclxuICAgKiAgICAgICBoYXNOZXh0UGFnZVxyXG4gICAqICAgICAgIGVuZEN1cnNvclxyXG4gICAqICAgICB9XHJcbiAgICogICAgIGVkZ2VzIHtcclxuICAgKiAgICAgICBjdXJzb3JcclxuICAgKiAgICAgICBub2RlIHtcclxuICAgKiAgICAgICAgIG5hbWVcclxuICAgKiAgICAgICAgIGdlbmRlclxyXG4gICAqICAgICAgIH1cclxuICAgKiAgICAgfVxyXG4gICAqICAgfVxyXG4gICAqIFdpdGhvdXQgY3Vyc29yLCB0aGUgcXVlcnkgY2FuIGhhdmUgMyBhcmd1bWVudHMgKGZpcnN0LCBsYXN0LCBvZmZzZXQpLCBmb3IgZXhhbXBsZTpcclxuICAgKiAgIHVzZXJzIChmaXJzdDoyMCwgb2Zmc2V0OiAxMCkge1xyXG4gICAqICAgICB0b3RhbENvdW50XHJcbiAgICogICAgIG5vZGVzIHtcclxuICAgKiAgICAgICBuYW1lXHJcbiAgICogICAgICAgZ2VuZGVyXHJcbiAgICogICAgIH1cclxuICAgKiAgIH1cclxuICAgKi9cclxuICBwcm9jZXNzT25QYWdpbmF0aW9uQ2hhbmdlZChldmVudDogRXZlbnQsIGFyZ3M6IFBhZ2luYXRpb25DaGFuZ2VkQXJncykge1xyXG4gICAgY29uc3QgcGFnZVNpemUgPSArKGFyZ3MucGFnZVNpemUgfHwgKCh0aGlzLnBhZ2luYXRpb24pID8gdGhpcy5wYWdpbmF0aW9uLnBhZ2VTaXplIDogREVGQVVMVF9QQUdFX1NJWkUpKTtcclxuICAgIHRoaXMudXBkYXRlUGFnaW5hdGlvbihhcmdzLm5ld1BhZ2UsIHBhZ2VTaXplKTtcclxuXHJcbiAgICAvLyBidWlsZCB0aGUgR3JhcGhRTCBxdWVyeSB3aGljaCB3ZSB3aWxsIHVzZSBpbiB0aGUgV2ViQVBJIGNhbGxiYWNrXHJcbiAgICByZXR1cm4gdGhpcy5idWlsZFF1ZXJ5KCk7XHJcbiAgfVxyXG5cclxuICAvKlxyXG4gICAqIFNPUlRJTkdcclxuICAgKiB3ZSB3aWxsIHVzZSBzb3J0aW5nIGFzIHBlciBhIEZhY2Vib29rIHN1Z2dlc3Rpb24gb24gYSBHaXRodWIgaXNzdWUgKHdpdGggc29tZSBzbWFsbCBjaGFuZ2VzKVxyXG4gICAqIGh0dHBzOi8vZ2l0aHViLmNvbS9ncmFwaHFsL2dyYXBocWwtcmVsYXktanMvaXNzdWVzLzIwI2lzc3VlY29tbWVudC0yMjA0OTQyMjJcclxuICAgKi9cclxuICBwcm9jZXNzT25Tb3J0Q2hhbmdlZChldmVudDogRXZlbnQsIGFyZ3M6IFNvcnRDaGFuZ2VkQXJncykge1xyXG4gICAgY29uc3Qgc29ydENvbHVtbnMgPSAoYXJncy5tdWx0aUNvbHVtblNvcnQpID8gYXJncy5zb3J0Q29scyA6IG5ldyBBcnJheSh7IHNvcnRDb2w6IGFyZ3Muc29ydENvbCwgc29ydEFzYzogYXJncy5zb3J0QXNjIH0pO1xyXG5cclxuICAgIC8vIGxvb3AgdGhyb3VnaCBhbGwgY29sdW1ucyB0byBpbnNwZWN0IHNvcnRlcnMgJiBzZXQgdGhlIHF1ZXJ5XHJcbiAgICB0aGlzLnVwZGF0ZVNvcnRlcnMoc29ydENvbHVtbnMpO1xyXG5cclxuICAgIC8vIGJ1aWxkIHRoZSBHcmFwaFFMIHF1ZXJ5IHdoaWNoIHdlIHdpbGwgdXNlIGluIHRoZSBXZWJBUEkgY2FsbGJhY2tcclxuICAgIHJldHVybiB0aGlzLmJ1aWxkUXVlcnkoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGxvb3AgdGhyb3VnaCBhbGwgY29sdW1ucyB0byBpbnNwZWN0IGZpbHRlcnMgJiB1cGRhdGUgYmFja2VuZCBzZXJ2aWNlIGZpbHRlcmluZ09wdGlvbnNcclxuICAgKiBAcGFyYW0gY29sdW1uRmlsdGVyc1xyXG4gICAqL1xyXG4gIHVwZGF0ZUZpbHRlcnMoY29sdW1uRmlsdGVyczogQ29sdW1uRmlsdGVycyB8IEN1cnJlbnRGaWx0ZXJbXSwgaXNVcGRhdGVkQnlQcmVzZXQ6IGJvb2xlYW4pIHtcclxuICAgIGNvbnN0IHNlYXJjaEJ5QXJyYXk6IEdyYXBocWxGaWx0ZXJpbmdPcHRpb25bXSA9IFtdO1xyXG4gICAgbGV0IHNlYXJjaFZhbHVlOiBzdHJpbmcgfCBzdHJpbmdbXTtcclxuXHJcbiAgICAvLyBvbiBmaWx0ZXIgcHJlc2V0IGxvYWQsIHdlIG5lZWQgdG8ga2VlcCBjdXJyZW50IGZpbHRlcnNcclxuICAgIGlmIChpc1VwZGF0ZWRCeVByZXNldCkge1xyXG4gICAgICB0aGlzLl9jdXJyZW50RmlsdGVycyA9IHRoaXMuY2FzdEZpbHRlclRvQ29sdW1uRmlsdGVyKGNvbHVtbkZpbHRlcnMpO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAoY29uc3QgY29sdW1uSWQgaW4gY29sdW1uRmlsdGVycykge1xyXG4gICAgICBpZiAoY29sdW1uRmlsdGVycy5oYXNPd25Qcm9wZXJ0eShjb2x1bW5JZCkpIHtcclxuICAgICAgICBjb25zdCBjb2x1bW5GaWx0ZXIgPSBjb2x1bW5GaWx0ZXJzW2NvbHVtbklkXTtcclxuXHJcbiAgICAgICAgLy8gaWYgdXNlciBkZWZpbmVkIHNvbWUgXCJwcmVzZXRzXCIsIHRoZW4gd2UgbmVlZCB0byBmaW5kIHRoZSBmaWx0ZXJzIGZyb20gdGhlIGNvbHVtbiBkZWZpbml0aW9ucyBpbnN0ZWFkXHJcbiAgICAgICAgbGV0IGNvbHVtbkRlZjogQ29sdW1uIHwgdW5kZWZpbmVkO1xyXG4gICAgICAgIGlmIChpc1VwZGF0ZWRCeVByZXNldCAmJiBBcnJheS5pc0FycmF5KHRoaXMuX2NvbHVtbkRlZmluaXRpb25zKSkge1xyXG4gICAgICAgICAgY29sdW1uRGVmID0gdGhpcy5fY29sdW1uRGVmaW5pdGlvbnMuZmluZCgoY29sdW1uOiBDb2x1bW4pID0+IGNvbHVtbi5pZCA9PT0gY29sdW1uRmlsdGVyLmNvbHVtbklkKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY29sdW1uRGVmID0gY29sdW1uRmlsdGVyLmNvbHVtbkRlZjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFjb2x1bW5EZWYpIHtcclxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignW0JhY2tlbmQgU2VydmljZSBBUEldOiBTb21ldGhpbmcgd2VudCB3cm9uZyBpbiB0cnlpbmcgdG8gZ2V0IHRoZSBjb2x1bW4gZGVmaW5pdGlvbiBvZiB0aGUgc3BlY2lmaWVkIGZpbHRlciAob3IgcHJlc2V0IGZpbHRlcnMpLiBEaWQgeW91IG1ha2UgYSB0eXBvIG9uIHRoZSBmaWx0ZXIgY29sdW1uSWQ/Jyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBmaWVsZE5hbWUgPSBjb2x1bW5EZWYucXVlcnlGaWVsZCB8fCBjb2x1bW5EZWYucXVlcnlGaWVsZEZpbHRlciB8fCBjb2x1bW5EZWYuZmllbGQgfHwgY29sdW1uRGVmLm5hbWUgfHwgJyc7XHJcbiAgICAgICAgY29uc3Qgc2VhcmNoVGVybXMgPSAoY29sdW1uRmlsdGVyID8gY29sdW1uRmlsdGVyLnNlYXJjaFRlcm1zIDogbnVsbCkgfHwgW107XHJcbiAgICAgICAgbGV0IGZpZWxkU2VhcmNoVmFsdWUgPSAoQXJyYXkuaXNBcnJheShzZWFyY2hUZXJtcykgJiYgc2VhcmNoVGVybXMubGVuZ3RoID09PSAxKSA/IHNlYXJjaFRlcm1zWzBdIDogJyc7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBmaWVsZFNlYXJjaFZhbHVlID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgZmllbGRTZWFyY2hWYWx1ZSA9ICcnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBmaWVsZFNlYXJjaFZhbHVlICE9PSAnc3RyaW5nJyAmJiAhc2VhcmNoVGVybXMpIHtcclxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgR3JhcGhRTCBmaWx0ZXIgc2VhcmNoVGVybSBwcm9wZXJ0eSBtdXN0IGJlIHByb3ZpZGVkIGFzIHR5cGUgXCJzdHJpbmdcIiwgaWYgeW91IHVzZSBmaWx0ZXIgd2l0aCBvcHRpb25zIHRoZW4gbWFrZSBzdXJlIHlvdXIgSURzIGFyZSBhbHNvIHN0cmluZy4gRm9yIGV4YW1wbGU6IGZpbHRlcjoge21vZGVsOiBGaWx0ZXJzLnNlbGVjdCwgY29sbGVjdGlvbjogW3sgaWQ6IFwiMFwiLCB2YWx1ZTogXCIwXCIgfSwgeyBpZDogXCIxXCIsIHZhbHVlOiBcIjFcIiB9XWApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZmllbGRTZWFyY2hWYWx1ZSA9ICcnICsgZmllbGRTZWFyY2hWYWx1ZTsgLy8gbWFrZSBzdXJlIGl0J3MgYSBzdHJpbmdcclxuICAgICAgICBjb25zdCBtYXRjaGVzID0gZmllbGRTZWFyY2hWYWx1ZS5tYXRjaCgvXihbPD4hPVxcKl17MCwyfSkoLipbXjw+IT1cXCpdKShbXFwqXT8pJC8pOyAvLyBncm91cCAxOiBPcGVyYXRvciwgMjogc2VhcmNoVmFsdWUsIDM6IGxhc3QgY2hhciBpcyAnKicgKG1lYW5pbmcgc3RhcnRzIHdpdGgsIGV4LjogYWJjKilcclxuICAgICAgICBsZXQgb3BlcmF0b3IgPSBjb2x1bW5GaWx0ZXIub3BlcmF0b3IgfHwgKChtYXRjaGVzKSA/IG1hdGNoZXNbMV0gOiAnJyk7XHJcbiAgICAgICAgc2VhcmNoVmFsdWUgPSAoISFtYXRjaGVzKSA/IG1hdGNoZXNbMl0gOiAnJztcclxuICAgICAgICBjb25zdCBsYXN0VmFsdWVDaGFyID0gKCEhbWF0Y2hlcykgPyBtYXRjaGVzWzNdIDogKG9wZXJhdG9yID09PSAnKnonID8gJyonIDogJycpO1xyXG5cclxuICAgICAgICAvLyBubyBuZWVkIHRvIHF1ZXJ5IGlmIHNlYXJjaCB2YWx1ZSBpcyBlbXB0eVxyXG4gICAgICAgIGlmIChmaWVsZE5hbWUgJiYgc2VhcmNoVmFsdWUgPT09ICcnICYmIHNlYXJjaFRlcm1zLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyB3aGVuIGhhdmluZyBtb3JlIHRoYW4gMSBzZWFyY2ggdGVybSAod2UgbmVlZCB0byBjcmVhdGUgYSBDU1Ygc3RyaW5nIGZvciBHcmFwaFFMIFwiSU5cIiBvciBcIk5PVCBJTlwiIGZpbHRlciBzZWFyY2gpXHJcbiAgICAgICAgaWYgKHNlYXJjaFRlcm1zICYmIHNlYXJjaFRlcm1zLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgIHNlYXJjaFZhbHVlID0gc2VhcmNoVGVybXMuam9pbignLCcpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHNlYXJjaFZhbHVlID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgLy8gZXNjYXBpbmcgdGhlIHNlYXJjaCB2YWx1ZVxyXG4gICAgICAgICAgc2VhcmNoVmFsdWUgPSBzZWFyY2hWYWx1ZS5yZXBsYWNlKGAnYCwgYCcnYCk7IC8vIGVzY2FwZSBzaW5nbGUgcXVvdGVzIGJ5IGRvdWJsaW5nIHRoZW1cclxuICAgICAgICAgIGlmIChvcGVyYXRvciA9PT0gJyonIHx8IG9wZXJhdG9yID09PSAnYSonIHx8IG9wZXJhdG9yID09PSAnKnonIHx8IGxhc3RWYWx1ZUNoYXIgPT09ICcqJykge1xyXG4gICAgICAgICAgICBvcGVyYXRvciA9IChvcGVyYXRvciA9PT0gJyonIHx8IG9wZXJhdG9yID09PSAnKnonKSA/ICdlbmRzV2l0aCcgOiAnc3RhcnRzV2l0aCc7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBpZiB3ZSBkaWRuJ3QgZmluZCBhbiBPcGVyYXRvciBidXQgd2UgaGF2ZSBhIEZpbHRlciBUeXBlLCB3ZSBzaG91bGQgdXNlIGRlZmF1bHQgT3BlcmF0b3JcclxuICAgICAgICAvLyBtdWx0aXBsZVNlbGVjdCBpcyBcIklOXCIsIHdoaWxlIHNpbmdsZVNlbGVjdCBpcyBcIkVRXCIsIGVsc2UgZG9uJ3QgbWFwIGFueSBvcGVyYXRvclxyXG4gICAgICAgIGlmICghb3BlcmF0b3IgJiYgY29sdW1uRGVmLmZpbHRlcikge1xyXG4gICAgICAgICAgb3BlcmF0b3IgPSBjb2x1bW5EZWYuZmlsdGVyLm9wZXJhdG9yO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gaWYgd2Ugc3RpbGwgZG9uJ3QgaGF2ZSBhbiBvcGVyYXRvciBmaW5kIHRoZSBwcm9wZXIgT3BlcmF0b3IgdG8gdXNlIGJ5IGl0J3MgZmllbGQgdHlwZVxyXG4gICAgICAgIGlmICghb3BlcmF0b3IpIHtcclxuICAgICAgICAgIG9wZXJhdG9yID0gbWFwT3BlcmF0b3JCeUZpZWxkVHlwZShjb2x1bW5EZWYudHlwZSB8fCBGaWVsZFR5cGUuc3RyaW5nKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlYXJjaEJ5QXJyYXkucHVzaCh7XHJcbiAgICAgICAgICBmaWVsZDogZmllbGROYW1lLFxyXG4gICAgICAgICAgb3BlcmF0b3I6IG1hcE9wZXJhdG9yVHlwZShvcGVyYXRvciksXHJcbiAgICAgICAgICB2YWx1ZTogc2VhcmNoVmFsdWVcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIHVwZGF0ZSB0aGUgc2VydmljZSBvcHRpb25zIHdpdGggZmlsdGVycyBmb3IgdGhlIGJ1aWxkUXVlcnkoKSB0byB3b3JrIGxhdGVyXHJcbiAgICB0aGlzLnVwZGF0ZU9wdGlvbnMoeyBmaWx0ZXJpbmdPcHRpb25zOiBzZWFyY2hCeUFycmF5IH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXBkYXRlIHRoZSBwYWdpbmF0aW9uIGNvbXBvbmVudCB3aXRoIGl0J3MgbmV3IHBhZ2UgbnVtYmVyIGFuZCBzaXplXHJcbiAgICogQHBhcmFtIG5ld1BhZ2VcclxuICAgKiBAcGFyYW0gcGFnZVNpemVcclxuICAgKi9cclxuICB1cGRhdGVQYWdpbmF0aW9uKG5ld1BhZ2U6IG51bWJlciwgcGFnZVNpemU6IG51bWJlcikge1xyXG4gICAgdGhpcy5fY3VycmVudFBhZ2luYXRpb24gPSB7XHJcbiAgICAgIHBhZ2VOdW1iZXI6IG5ld1BhZ2UsXHJcbiAgICAgIHBhZ2VTaXplXHJcbiAgICB9O1xyXG5cclxuICAgIGxldCBwYWdpbmF0aW9uT3B0aW9ucztcclxuICAgIGlmICh0aGlzLm9wdGlvbnMuaXNXaXRoQ3Vyc29yKSB7XHJcbiAgICAgIHBhZ2luYXRpb25PcHRpb25zID0ge1xyXG4gICAgICAgIGZpcnN0OiBwYWdlU2l6ZVxyXG4gICAgICB9O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcGFnaW5hdGlvbk9wdGlvbnMgPSB7XHJcbiAgICAgICAgZmlyc3Q6IHBhZ2VTaXplLFxyXG4gICAgICAgIG9mZnNldDogKG5ld1BhZ2UgLSAxKSAqIHBhZ2VTaXplXHJcbiAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy51cGRhdGVPcHRpb25zKHsgcGFnaW5hdGlvbk9wdGlvbnMgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBsb29wIHRocm91Z2ggYWxsIGNvbHVtbnMgdG8gaW5zcGVjdCBzb3J0ZXJzICYgdXBkYXRlIGJhY2tlbmQgc2VydmljZSBzb3J0aW5nT3B0aW9uc1xyXG4gICAqIEBwYXJhbSBjb2x1bW5GaWx0ZXJzXHJcbiAgICovXHJcbiAgdXBkYXRlU29ydGVycyhzb3J0Q29sdW1ucz86IENvbHVtblNvcnRbXSwgcHJlc2V0U29ydGVycz86IEN1cnJlbnRTb3J0ZXJbXSkge1xyXG4gICAgbGV0IGN1cnJlbnRTb3J0ZXJzOiBDdXJyZW50U29ydGVyW10gPSBbXTtcclxuICAgIGNvbnN0IGdyYXBocWxTb3J0ZXJzOiBHcmFwaHFsU29ydGluZ09wdGlvbltdID0gW107XHJcblxyXG4gICAgaWYgKCFzb3J0Q29sdW1ucyAmJiBwcmVzZXRTb3J0ZXJzKSB7XHJcbiAgICAgIC8vIG1ha2UgdGhlIHByZXNldHMgdGhlIGN1cnJlbnQgc29ydGVycywgYWxzbyBtYWtlIHN1cmUgdGhhdCBhbGwgZGlyZWN0aW9uIGFyZSBpbiB1cHBlcmNhc2UgZm9yIEdyYXBoUUxcclxuICAgICAgY3VycmVudFNvcnRlcnMgPSBwcmVzZXRTb3J0ZXJzO1xyXG4gICAgICBjdXJyZW50U29ydGVycy5mb3JFYWNoKChzb3J0ZXIpID0+IHNvcnRlci5kaXJlY3Rpb24gPSBzb3J0ZXIuZGlyZWN0aW9uLnRvVXBwZXJDYXNlKCkgYXMgU29ydERpcmVjdGlvblN0cmluZyk7XHJcblxyXG4gICAgICAvLyBkaXNwbGF5IHRoZSBjb3JyZWN0IHNvcnRpbmcgaWNvbnMgb24gdGhlIFVJLCBmb3IgdGhhdCBpdCByZXF1aXJlcyAoY29sdW1uSWQsIHNvcnRBc2MpIHByb3BlcnRpZXNcclxuICAgICAgY29uc3QgdG1wU29ydGVyQXJyYXkgPSBjdXJyZW50U29ydGVycy5tYXAoKHNvcnRlcikgPT4ge1xyXG4gICAgICAgIGNvbnN0IGNvbHVtbkRlZiA9IHRoaXMuX2NvbHVtbkRlZmluaXRpb25zLmZpbmQoKGNvbHVtbjogQ29sdW1uKSA9PiBjb2x1bW4uaWQgPT09IHNvcnRlci5jb2x1bW5JZCk7XHJcblxyXG4gICAgICAgIGdyYXBocWxTb3J0ZXJzLnB1c2goe1xyXG4gICAgICAgICAgZmllbGQ6IGNvbHVtbkRlZiA/ICgoY29sdW1uRGVmLnF1ZXJ5RmllbGQgfHwgY29sdW1uRGVmLnF1ZXJ5RmllbGRTb3J0ZXIgfHwgY29sdW1uRGVmLmZpZWxkIHx8IGNvbHVtbkRlZi5pZCkgKyAnJykgOiAoc29ydGVyLmNvbHVtbklkICsgJycpLFxyXG4gICAgICAgICAgZGlyZWN0aW9uOiBzb3J0ZXIuZGlyZWN0aW9uXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIHJldHVybiBvbmx5IHRoZSBjb2x1bW4ocykgZm91bmQgaW4gdGhlIENvbHVtbiBEZWZpbml0aW9ucyBFTFNFIG51bGxcclxuICAgICAgICBpZiAoY29sdW1uRGVmKSB7XHJcbiAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBjb2x1bW5JZDogc29ydGVyLmNvbHVtbklkLFxyXG4gICAgICAgICAgICBzb3J0QXNjOiBzb3J0ZXIuZGlyZWN0aW9uLnRvVXBwZXJDYXNlKCkgPT09IFNvcnREaXJlY3Rpb24uQVNDXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICAvLyBzZXQgdGhlIHNvcnQgaWNvbnMsIGJ1dCBhbHNvIG1ha2Ugc3VyZSB0byBmaWx0ZXIgb3V0IG51bGwgdmFsdWVzIChoYXBwZW5zIHdoZW4gbm8gY29sdW1uRGVmIGZvdW5kKVxyXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheSh0bXBTb3J0ZXJBcnJheSkpIHtcclxuICAgICAgICB0aGlzLl9ncmlkLnNldFNvcnRDb2x1bW5zKHRtcFNvcnRlckFycmF5LmZpbHRlcigoc29ydGVyKSA9PiBzb3J0ZXIpKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChzb3J0Q29sdW1ucyAmJiAhcHJlc2V0U29ydGVycykge1xyXG4gICAgICAvLyBidWlsZCB0aGUgb3JkZXJCeSBhcnJheSwgaXQgY291bGQgYmUgbXVsdGlzb3J0LCBleGFtcGxlXHJcbiAgICAgIC8vIG9yZGVyQnk6W3tmaWVsZDogbGFzdE5hbWUsIGRpcmVjdGlvbjogQVNDfSwge2ZpZWxkOiBmaXJzdE5hbWUsIGRpcmVjdGlvbjogREVTQ31dXHJcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHNvcnRDb2x1bW5zKSAmJiBzb3J0Q29sdW1ucy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgZm9yIChjb25zdCBjb2x1bW4gb2Ygc29ydENvbHVtbnMpIHtcclxuICAgICAgICAgIGlmIChjb2x1bW4gJiYgY29sdW1uLnNvcnRDb2wpIHtcclxuICAgICAgICAgICAgY3VycmVudFNvcnRlcnMucHVzaCh7XHJcbiAgICAgICAgICAgICAgY29sdW1uSWQ6IGNvbHVtbi5zb3J0Q29sLmlkICsgJycsXHJcbiAgICAgICAgICAgICAgZGlyZWN0aW9uOiBjb2x1bW4uc29ydEFzYyA/IFNvcnREaXJlY3Rpb24uQVNDIDogU29ydERpcmVjdGlvbi5ERVNDXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgZ3JhcGhxbFNvcnRlcnMucHVzaCh7XHJcbiAgICAgICAgICAgICAgZmllbGQ6IChjb2x1bW4uc29ydENvbC5xdWVyeUZpZWxkIHx8IGNvbHVtbi5zb3J0Q29sLnF1ZXJ5RmllbGRTb3J0ZXIgfHwgY29sdW1uLnNvcnRDb2wuZmllbGQgfHwgY29sdW1uLnNvcnRDb2wuaWQpICsgJycsXHJcbiAgICAgICAgICAgICAgZGlyZWN0aW9uOiBjb2x1bW4uc29ydEFzYyA/IFNvcnREaXJlY3Rpb24uQVNDIDogU29ydERpcmVjdGlvbi5ERVNDXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGtlZXAgY3VycmVudCBTb3J0ZXJzIGFuZCB1cGRhdGUgdGhlIHNlcnZpY2Ugb3B0aW9ucyB3aXRoIHRoZSBuZXcgc29ydGluZ1xyXG4gICAgdGhpcy5fY3VycmVudFNvcnRlcnMgPSBjdXJyZW50U29ydGVycztcclxuICAgIHRoaXMudXBkYXRlT3B0aW9ucyh7IHNvcnRpbmdPcHRpb25zOiBncmFwaHFsU29ydGVycyB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgZnVuY3Rpb24gd2hpY2ggdGFrZXMgYW4gaW5wdXQgc3RyaW5nIGFuZCByZW1vdmVzIGRvdWJsZSBxdW90ZXMgb25seVxyXG4gICAqIG9uIGNlcnRhaW4gZmllbGRzIGFyZSBpZGVudGlmaWVkIGFzIEdyYXBoUUwgZW51bXMgKGV4Y2VwdCBmaWVsZHMgd2l0aCBkb3Qgbm90YXRpb24pXHJcbiAgICogRm9yIGV4YW1wbGUgbGV0IHNheSB3ZSBpZGVudGlmaWVkIChcImRpcmVjdGlvbjpcIiwgXCJzb3J0XCIpIGFzIHdvcmQgd2hpY2ggYXJlIEdyYXBoUUwgZW51bSBmaWVsZHNcclxuICAgKiB0aGVuIHRoZSByZXN1bHQgd2lsbCBiZTpcclxuICAgKiBGUk9NXHJcbiAgICogcXVlcnkgeyB1c2VycyAob3JkZXJCeTpbe2ZpZWxkOlwiZmlyc3ROYW1lXCIsIGRpcmVjdGlvbjpcIkFTQ1wifSB9XSkgfVxyXG4gICAqIFRPXHJcbiAgICogcXVlcnkgeyB1c2VycyAob3JkZXJCeTpbe2ZpZWxkOiBmaXJzdE5hbWUsIGRpcmVjdGlvbjogQVNDfX0pfVxyXG4gICAqXHJcbiAgICogRVhDRVBUSU9OUyAoZmllbGRzIHdpdGggZG90IG5vdGF0aW9uIFwiLlwiIHdoaWNoIGFyZSBpbnNpZGUgYSBcImZpZWxkOlwiKVxyXG4gICAqIHRoZXNlIGZpZWxkcyB3aWxsIGtlZXAgZG91YmxlIHF1b3RlcyB3aGlsZSBldmVyeXRoaW5nIGVsc2Ugd2lsbCBiZSBzdHJpcHBlZCBvZiBkb3VibGUgcXVvdGVzXHJcbiAgICogcXVlcnkgeyB1c2VycyAob3JkZXJCeTpbe2ZpZWxkOlwiYmlsbGluZy5zdHJlZXQubmFtZVwiLCBkaXJlY3Rpb246IFwiQVNDXCJ9IH1cclxuICAgKiBUT1xyXG4gICAqIHF1ZXJ5IHsgdXNlcnMgKG9yZGVyQnk6W3tmaWVsZDpcImJpbGxpbmcuc3RyZWV0Lm5hbWVcIiwgZGlyZWN0aW9uOiBBU0N9fVxyXG4gICAqIEBwYXJhbSBpbnB1dFN0ciBpbnB1dCBzdHJpbmdcclxuICAgKiBAcGFyYW0gZW51bVNlYXJjaFdvcmRzIGFycmF5IG9mIGVudW0gd29yZHMgdG8gZmlsdGVyXHJcbiAgICogQHJldHVybnMgb3V0cHV0U3RyIG91dHB1dCBzdHJpbmdcclxuICAgKi9cclxuICB0cmltRG91YmxlUXVvdGVzT25FbnVtRmllbGQoaW5wdXRTdHI6IHN0cmluZywgZW51bVNlYXJjaFdvcmRzOiBzdHJpbmdbXSwga2VlcEFyZ3VtZW50RmllbGREb3VibGVRdW90ZXM6IGJvb2xlYW4pIHtcclxuICAgIGNvbnN0IHBhdHRlcm5Xb3JkSW5RdW90ZXMgPSBgXFxzPygoZmllbGQ6XFxzKik/XCIuKj9cIilgO1xyXG4gICAgbGV0IHBhdHRlcm5SZWdleCA9IGVudW1TZWFyY2hXb3Jkcy5qb2luKHBhdHRlcm5Xb3JkSW5RdW90ZXMgKyAnfCcpO1xyXG4gICAgcGF0dGVyblJlZ2V4ICs9IHBhdHRlcm5Xb3JkSW5RdW90ZXM7IC8vIHRoZSBsYXN0IG9uZSBzaG91bGQgYWxzbyBoYXZlIHRoZSBwYXR0ZXJuIGJ1dCB3aXRob3V0IHRoZSBwaXBlIFwifFwiXHJcbiAgICAvLyBleGFtcGxlIHdpdGggKGZpZWxkOiAmIGRpcmVjdGlvbjopOiAgL2ZpZWxkOnM/KFwiLio/XCIpfGRpcmVjdGlvbjpzPyhcIi4qP1wiKS9cclxuICAgIGNvbnN0IHJlZyA9IG5ldyBSZWdFeHAocGF0dGVyblJlZ2V4LCAnZycpO1xyXG5cclxuICAgIHJldHVybiBpbnB1dFN0ci5yZXBsYWNlKHJlZywgKGdyb3VwMSwgZ3JvdXAyLCBncm91cDMpID0+IHtcclxuICAgICAgLy8gcmVtb3ZlIGRvdWJsZSBxdW90ZXMgZXhjZXB0IHdoZW4gdGhlIHN0cmluZyBzdGFydHMgd2l0aCBhIFwiZmllbGQ6XCJcclxuICAgICAgbGV0IHJlbW92ZURvdWJsZVF1b3RlcyA9IHRydWU7XHJcbiAgICAgIGlmIChncm91cDEuc3RhcnRzV2l0aCgnZmllbGQ6JykgJiYga2VlcEFyZ3VtZW50RmllbGREb3VibGVRdW90ZXMpIHtcclxuICAgICAgICByZW1vdmVEb3VibGVRdW90ZXMgPSBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCByZXAgPSByZW1vdmVEb3VibGVRdW90ZXMgPyBncm91cDEucmVwbGFjZSgvXCIvZywgJycpIDogZ3JvdXAxO1xyXG4gICAgICByZXR1cm4gcmVwO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvL1xyXG4gIC8vIHByaXZhdGUgZnVuY3Rpb25zXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8qKlxyXG4gICAqIENhc3QgcHJvdmlkZWQgZmlsdGVycyAoY291bGQgYmUgaW4gbXVsdGlwbGUgZm9ybWF0KSBpbnRvIGFuIGFycmF5IG9mIENvbHVtbkZpbHRlclxyXG4gICAqIEBwYXJhbSBjb2x1bW5GaWx0ZXJzXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjYXN0RmlsdGVyVG9Db2x1bW5GaWx0ZXIoY29sdW1uRmlsdGVyczogQ29sdW1uRmlsdGVycyB8IEN1cnJlbnRGaWx0ZXJbXSk6IEN1cnJlbnRGaWx0ZXJbXSB7XHJcbiAgICAvLyBrZWVwIGN1cnJlbnQgZmlsdGVycyAmIGFsd2F5cyBzYXZlIGl0IGFzIGFuIGFycmF5IChjb2x1bW5GaWx0ZXJzIGNhbiBiZSBhbiBvYmplY3Qgd2hlbiBpdCBpcyBkZWFsdCBieSBTbGlja0dyaWQgRmlsdGVyKVxyXG4gICAgY29uc3QgZmlsdGVyc0FycmF5OiBDb2x1bW5GaWx0ZXJbXSA9ICh0eXBlb2YgY29sdW1uRmlsdGVycyA9PT0gJ29iamVjdCcpID8gT2JqZWN0LmtleXMoY29sdW1uRmlsdGVycykubWFwKGtleSA9PiBjb2x1bW5GaWx0ZXJzW2tleV0pIDogY29sdW1uRmlsdGVycztcclxuXHJcbiAgICByZXR1cm4gZmlsdGVyc0FycmF5Lm1hcCgoZmlsdGVyKSA9PiB7XHJcbiAgICAgIGNvbnN0IHRtcEZpbHRlcjogQ3VycmVudEZpbHRlciA9IHsgY29sdW1uSWQ6IGZpbHRlci5jb2x1bW5JZCB8fCAnJyB9O1xyXG4gICAgICBpZiAoZmlsdGVyLm9wZXJhdG9yKSB7XHJcbiAgICAgICAgdG1wRmlsdGVyLm9wZXJhdG9yID0gZmlsdGVyLm9wZXJhdG9yO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGZpbHRlci5zZWFyY2hUZXJtcykpIHtcclxuICAgICAgICB0bXBGaWx0ZXIuc2VhcmNoVGVybXMgPSBmaWx0ZXIuc2VhcmNoVGVybXM7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHRtcEZpbHRlcjtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=