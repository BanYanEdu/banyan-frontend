import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { ExtensionService } from './extension.service';
import { FilterService } from './filter.service';
import { GridStateService } from './gridState.service';
import { SortService } from './sort.service';
import { Subject } from 'rxjs';
var highlightTimerEnd;
var GridServiceDeleteOptionDefaults = { triggerEvent: true };
var GridServiceInsertOptionDefaults = { highlightRow: true, resortGrid: false, selectRow: false, triggerEvent: true };
var GridServiceUpdateOptionDefaults = { highlightRow: true, selectRow: false, triggerEvent: true };
var GridService = /** @class */ (function () {
    function GridService(extensionService, filterService, gridStateService, sortService) {
        this.extensionService = extensionService;
        this.filterService = filterService;
        this.gridStateService = gridStateService;
        this.sortService = sortService;
        this.onItemAdded = new Subject();
        this.onItemDeleted = new Subject();
        this.onItemUpdated = new Subject();
        this.onItemUpserted = new Subject();
    }
    Object.defineProperty(GridService.prototype, "_gridOptions", {
        /** Getter for the Grid Options pulled through the Grid Object */
        get: function () {
            return (this._grid && this._grid.getOptions) ? this._grid.getOptions() : {};
        },
        enumerable: true,
        configurable: true
    });
    GridService.prototype.init = function (grid, dataView) {
        this._grid = grid;
        this._dataView = dataView;
    };
    /** Clear all Filters & Sorts */
    GridService.prototype.clearAllFiltersAndSorts = function () {
        // call both clear Filters & Sort but only trigger the last one to avoid sending multiple backend queries
        if (this.sortService && this.sortService.clearSorting) {
            this.sortService.clearSorting(false); // skip event trigger on this one
        }
        if (this.filterService && this.filterService.clearFilters) {
            this.filterService.clearFilters();
        }
    };
    /**
     * From a SlickGrid Event triggered get the Column Definition and Item Data Context
     *
     * For example the SlickGrid onClick will return cell arguments when subscribing to it.
     * From these cellArgs, we want to get the Column Definition and Item Data
     * @param cell event args
     * @return object with columnDef and dataContext
     */
    GridService.prototype.getColumnFromEventArguments = function (args) {
        if (!args || !args.grid || !args.grid.getColumns || !args.grid.getDataItem) {
            throw new Error('To get the column definition and data, we need to have these arguments passed as objects (row, cell, grid)');
        }
        return {
            row: args.row,
            cell: args.cell,
            columnDef: args.grid.getColumns()[args.cell],
            dataContext: args.grid.getDataItem(args.row),
            dataView: this._dataView,
            grid: this._grid
        };
    };
    /** Get data item by it's row index number */
    GridService.prototype.getDataItemByRowNumber = function (rowNumber) {
        if (!this._grid || typeof this._grid.getDataItem !== 'function') {
            throw new Error("We could not find SlickGrid Grid object or it's \"getDataItem\" method");
        }
        return this._grid.getDataItem(rowNumber);
    };
    /** Chain the item Metadata with our implementation of Metadata at given row index */
    GridService.prototype.getItemRowMetadataToHighlight = function (previousItemMetadata) {
        var _this = this;
        return function (rowNumber) {
            var item = _this._dataView.getItem(rowNumber);
            var meta = { cssClasses: '' };
            if (typeof previousItemMetadata === 'function') {
                meta = previousItemMetadata(rowNumber);
            }
            if (!meta) {
                meta = { cssClasses: '' };
            }
            if (item && item._dirty) {
                meta.cssClasses = (meta && meta.cssClasses || '') + ' dirty';
            }
            if (item && item.rowClass && meta) {
                meta.cssClasses += " " + item.rowClass;
                meta.cssClasses += " row" + rowNumber;
            }
            return meta;
        };
    };
    /**
     * Highlight then fade a row for x seconds.
     * The implementation follows this SO answer: https://stackoverflow.com/a/19985148/1212166
     * @param rowNumber
     * @param fadeDelay
     */
    GridService.prototype.highlightRow = function (rowNumber, fadeDelay, fadeOutDelay) {
        var _this = this;
        if (fadeDelay === void 0) { fadeDelay = 1500; }
        if (fadeOutDelay === void 0) { fadeOutDelay = 300; }
        // create a SelectionModel if there's not one yet
        if (!this._grid.getSelectionModel()) {
            var rowSelectionPlugin = new Slick.RowSelectionModel(this._gridOptions.rowSelectionOptions || {});
            this._grid.setSelectionModel(rowSelectionPlugin);
        }
        if (Array.isArray(rowNumber)) {
            rowNumber.forEach(function (row) { return _this.highlightRowByMetadata(row, fadeDelay, fadeOutDelay); });
        }
        else {
            this.highlightRowByMetadata(rowNumber, fadeDelay, fadeOutDelay);
        }
    };
    GridService.prototype.highlightRowByMetadata = function (rowNumber, fadeDelay, fadeOutDelay) {
        var _this = this;
        if (fadeDelay === void 0) { fadeDelay = 1500; }
        if (fadeOutDelay === void 0) { fadeOutDelay = 300; }
        this._dataView.getItemMetadata = this.getItemRowMetadataToHighlight(this._dataView.getItemMetadata);
        var item = this._dataView.getItem(rowNumber);
        if (item && item.id) {
            item.rowClass = 'highlight';
            this._dataView.updateItem(item.id, item);
            this.renderGrid();
            // fade out
            clearTimeout(highlightTimerEnd);
            highlightTimerEnd = setTimeout(function () {
                item.rowClass = 'highlight-end';
                _this._dataView.updateItem(item.id, item);
                _this.renderGrid();
            }, fadeOutDelay);
            // delete the row's CSS highlight classes once the delay is passed
            setTimeout(function () {
                if (item && item.id) {
                    delete item.rowClass;
                    if (_this._dataView.getIdxById(item.id) !== undefined) {
                        _this._dataView.updateItem(item.id, item);
                        _this.renderGrid();
                    }
                }
            }, fadeDelay + fadeOutDelay);
        }
    };
    /** Get the Data Item from a grid row index */
    GridService.prototype.getDataItemByRowIndex = function (index) {
        if (!this._grid || typeof this._grid.getDataItem !== 'function') {
            throw new Error('We could not find SlickGrid Grid object and/or "getDataItem" method');
        }
        return this._grid.getDataItem(index);
    };
    /** Get the Data Item from an array of grid row indexes */
    GridService.prototype.getDataItemByRowIndexes = function (indexes) {
        var _this = this;
        if (!this._grid || typeof this._grid.getDataItem !== 'function') {
            throw new Error('We could not find SlickGrid Grid object and/or "getDataItem" method');
        }
        var dataItems = [];
        if (Array.isArray(indexes)) {
            indexes.forEach(function (idx) {
                dataItems.push(_this._grid.getDataItem(idx));
            });
        }
        return dataItems;
    };
    /** Get the currently selected row indexes */
    GridService.prototype.getSelectedRows = function () {
        if (!this._grid || typeof this._grid.getSelectedRows !== 'function') {
            throw new Error('We could not find SlickGrid Grid object and/or "getSelectedRows" method');
        }
        return this._grid.getSelectedRows();
    };
    /** Get the currently selected rows item data */
    GridService.prototype.getSelectedRowsDataItem = function () {
        if (!this._grid || typeof this._grid.getSelectedRows !== 'function') {
            throw new Error('We could not find SlickGrid Grid object and/or "getSelectedRows" method');
        }
        var selectedRowIndexes = this._grid.getSelectedRows();
        return this.getDataItemByRowIndexes(selectedRowIndexes);
    };
    /** Select the selected row by a row index */
    GridService.prototype.setSelectedRow = function (rowIndex) {
        if (this._grid && this._grid.setSelectedRows) {
            this._grid.setSelectedRows([rowIndex]);
        }
    };
    /** Set selected rows with provided array of row indexes */
    GridService.prototype.setSelectedRows = function (rowIndexes) {
        if (this._grid && this._grid.setSelectedRows) {
            this._grid.setSelectedRows(rowIndexes);
        }
    };
    /** Re-Render the Grid */
    GridService.prototype.renderGrid = function () {
        if (this._grid && typeof this._grid.invalidate === 'function') {
            this._grid.invalidate();
            this._grid.render();
        }
    };
    /**
     * Reset the grid to it's original state (clear any filters, sorting & pagination if exists) .
     * The column definitions could be passed as argument to reset (this can be used after a Grid State reset)
     * The reset will clear the Filters & Sort, then will reset the Columns to their original state
     */
    GridService.prototype.resetGrid = function (columnDefinitions) {
        // reset columns to original states & refresh the grid
        if (this._grid && this._dataView) {
            var originalColumns = this.extensionService.getAllColumns();
            if (Array.isArray(originalColumns) && originalColumns.length > 0) {
                // set the grid columns to it's original column definitions
                this._grid.setColumns(originalColumns);
                if (this._gridOptions && this._gridOptions.enableAutoSizeColumns) {
                    this._grid.autosizeColumns();
                }
                this.gridStateService.resetColumns(columnDefinitions);
            }
        }
        if (this.filterService && this.filterService.clearFilters) {
            this.filterService.clearFilters();
        }
        if (this.sortService && this.sortService.clearSorting) {
            this.sortService.clearSorting();
        }
    };
    /** @deprecated please use "addItem" method instead */
    GridService.prototype.addItemToDatagrid = function (item, shouldHighlightRow, shouldResortGrid, shouldTriggerEvent, shouldSelectRow) {
        if (shouldHighlightRow === void 0) { shouldHighlightRow = true; }
        if (shouldResortGrid === void 0) { shouldResortGrid = false; }
        if (shouldTriggerEvent === void 0) { shouldTriggerEvent = true; }
        if (shouldSelectRow === void 0) { shouldSelectRow = true; }
        return this.addItem(item, { highlightRow: shouldHighlightRow, resortGrid: shouldResortGrid, triggerEvent: shouldTriggerEvent, selectRow: shouldSelectRow });
    };
    /** @deprecated please use "addItems" method instead */
    GridService.prototype.addItemsToDatagrid = function (items, shouldHighlightRow, shouldResortGrid, shouldTriggerEvent, shouldSelectRow) {
        if (shouldHighlightRow === void 0) { shouldHighlightRow = true; }
        if (shouldResortGrid === void 0) { shouldResortGrid = false; }
        if (shouldTriggerEvent === void 0) { shouldTriggerEvent = true; }
        if (shouldSelectRow === void 0) { shouldSelectRow = true; }
        return this.addItems(items, { highlightRow: shouldHighlightRow, resortGrid: shouldResortGrid, triggerEvent: shouldTriggerEvent, selectRow: shouldSelectRow });
    };
    /**
     * Add an item (data item) to the datagrid, by default it will highlight (flashing) the inserted row but we can disable it too
     * @param item object which must contain a unique "id" property and any other suitable properties
     * @param options: provide the possibility to do certain actions after or during the upsert (highlightRow, resortGrid, selectRow, triggerEvent)
     * @return rowIndex: typically index 0
     */
    GridService.prototype.addItem = function (item, options) {
        options = tslib_1.__assign({}, GridServiceInsertOptionDefaults, options);
        if (!this._grid || !this._gridOptions || !this._dataView) {
            throw new Error('We could not find SlickGrid Grid, DataView objects');
        }
        if (!item || !item.hasOwnProperty('id')) {
            throw new Error("Adding an item requires the item to include an \"id\" property");
        }
        this._dataView.insertItem(0, item); // insert at index 0
        // row number in the grid, by default it will be on first row
        var rowNumber = 0;
        // do we want the item to be sorted in the grid, when set to False it will insert on first row (defaults to false)
        if (options.resortGrid) {
            this._dataView.reSort();
            // find the row number in the grid and if user wanted to see highlighted row
            // we need to do it here after resort and get each row number because it possibly changes after the sort
            rowNumber = this._dataView.getRowById(item.id);
        }
        else {
            this._grid.scrollRowIntoView(rowNumber); // scroll to row 0
        }
        // highlight the row we just added, if highlight is defined
        if (options.highlightRow) {
            this.highlightRow(rowNumber);
        }
        // select the row in the grid
        if (options.selectRow && this._gridOptions && (this._gridOptions.enableCheckboxSelector || this._gridOptions.enableRowSelection)) {
            this._grid.setSelectedRows(rowNumber);
        }
        // do we want to trigger an event after adding the item
        if (options.triggerEvent) {
            this.onItemAdded.next(item);
        }
        return rowNumber;
    };
    /**
     * Add item array (data item) to the datagrid, by default it will highlight (flashing) the inserted row but we can disable it too
     * @param item object arrays, which must contain unique "id" property and any other suitable properties
     * @param options: provide the possibility to do certain actions after or during the upsert (highlightRow, resortGrid, selectRow, triggerEvent)
     */
    GridService.prototype.addItems = function (items, options) {
        var _this = this;
        options = tslib_1.__assign({}, GridServiceInsertOptionDefaults, options);
        var rowNumbers = [];
        // loop through all items to add
        if (!Array.isArray(items)) {
            return [this.addItem(items, options)];
        }
        else {
            items.forEach(function (item) { return _this.addItem(item, { highlightRow: false, resortGrid: false, selectRow: false, triggerEvent: false }); });
        }
        // do we want the item to be sorted in the grid, when set to False it will insert on first row (defaults to false)
        if (options.resortGrid) {
            this._dataView.reSort();
            // if user wanted to see highlighted row
            // we need to do it here after resort and get each row number because it possibly changes after the sort
            if (options.highlightRow) {
                items.forEach(function (item) {
                    var rowNumber = _this._dataView.getRowById(item.id);
                    rowNumbers.push(rowNumber);
                });
            }
        }
        else if (options.highlightRow) {
            var ln = items.length;
            for (var i = 0; i < ln; i++) {
                rowNumbers.push(i);
            }
        }
        // do user want to highlight the rows
        if (options.highlightRow) {
            this.highlightRow(rowNumbers);
        }
        // select the row in the grid
        if (options.selectRow && this._gridOptions && (this._gridOptions.enableCheckboxSelector || this._gridOptions.enableRowSelection)) {
            this._grid.setSelectedRows(rowNumbers);
        }
        // do we want to trigger an event after adding the item
        if (options.triggerEvent) {
            this.onItemAdded.next(items);
        }
        return rowNumbers;
    };
    /** @deprecated please use "deleteItem" method instead */
    GridService.prototype.deleteDataGridItem = function (item, shouldTriggerEvent) {
        if (shouldTriggerEvent === void 0) { shouldTriggerEvent = true; }
        this.deleteItem(item, { triggerEvent: shouldTriggerEvent });
    };
    /** @deprecated please use "deleteItems" method instead */
    GridService.prototype.deleteDataGridItems = function (items, shouldTriggerEvent) {
        if (shouldTriggerEvent === void 0) { shouldTriggerEvent = true; }
        this.deleteItems(items, { triggerEvent: shouldTriggerEvent });
    };
    /** @deprecated please use "deleteItemById" method instead */
    GridService.prototype.deleteDataGridItemById = function (itemId, shouldTriggerEvent) {
        if (shouldTriggerEvent === void 0) { shouldTriggerEvent = true; }
        this.deleteItemById(itemId, { triggerEvent: shouldTriggerEvent });
    };
    /** @deprecated please use "deleteItemByIds" method instead */
    GridService.prototype.deleteDataGridItemByIds = function (itemIds, shouldTriggerEvent) {
        if (shouldTriggerEvent === void 0) { shouldTriggerEvent = true; }
        this.deleteItemByIds(itemIds, { triggerEvent: shouldTriggerEvent });
    };
    /**
     * Delete an existing item from the datagrid (dataView)
     * @param item object which must contain a unique "id" property and any other suitable properties
     * @param options: provide the possibility to do certain actions after or during the upsert (triggerEvent)
     * @return item id deleted
     */
    GridService.prototype.deleteItem = function (item, options) {
        options = tslib_1.__assign({}, GridServiceDeleteOptionDefaults, options);
        if (!item || !item.hasOwnProperty('id')) {
            throw new Error("Deleting an item requires the item to include an \"id\" property");
        }
        return this.deleteItemById(item.id, options);
    };
    /**
     * Delete an array of existing items from the datagrid
     * @param item object which must contain a unique "id" property and any other suitable properties
     * @param options: provide the possibility to do certain actions after or during the upsert (triggerEvent)
     * @return item id deleted
     */
    GridService.prototype.deleteItems = function (items, options) {
        var _this = this;
        options = tslib_1.__assign({}, GridServiceDeleteOptionDefaults, options);
        // when it's not an array, we can call directly the single item delete
        if (!Array.isArray(items)) {
            this.deleteItem(items, options);
            return [items.id];
        }
        var itemIds = [];
        items.forEach(function (item) {
            if (item && item.id !== undefined) {
                itemIds.push(item.id);
            }
            _this.deleteItem(item, { triggerEvent: false });
        });
        // do we want to trigger an event after deleting the item
        if (options.triggerEvent) {
            this.onItemDeleted.next(items);
        }
        return itemIds;
    };
    /**
     * Delete an existing item from the datagrid (dataView) by it's id
     * @param itemId: item unique id
     * @param options: provide the possibility to do certain actions after or during the upsert (triggerEvent)
     * @return item id deleted
     */
    GridService.prototype.deleteItemById = function (itemId, options) {
        options = tslib_1.__assign({}, GridServiceDeleteOptionDefaults, options);
        if (itemId === null || itemId === undefined) {
            throw new Error("Cannot delete a row without a valid \"id\"");
        }
        // when user has row selection enabled, we should clear any selection to avoid confusion after a delete
        if (this._grid && this._gridOptions && (this._gridOptions.enableCheckboxSelector || this._gridOptions.enableRowSelection)) {
            this._grid.setSelectedRows([]);
        }
        // delete the item from the dataView
        this._dataView.deleteItem(itemId);
        // do we want to trigger an event after deleting the item
        if (options.triggerEvent) {
            this.onItemDeleted.next(itemId);
        }
        return itemId;
    };
    /**
     * Delete an array of existing items from the datagrid
     * @param itemIds array of item unique IDs
     * @param options: provide the possibility to do certain actions after or during the upsert (triggerEvent)
     */
    GridService.prototype.deleteItemByIds = function (itemIds, options) {
        options = tslib_1.__assign({}, GridServiceDeleteOptionDefaults, options);
        // when it's not an array, we can call directly the single item delete
        if (Array.isArray(itemIds)) {
            for (var i = 0; i < itemIds.length; i++) {
                if (itemIds[i] !== null) {
                    this.deleteItemById(itemIds[i], { triggerEvent: false });
                }
            }
            // do we want to trigger an event after deleting the item
            if (options.triggerEvent) {
                this.onItemDeleted.next(itemIds);
            }
            return itemIds;
        }
        return [];
    };
    /** @deprecated please use "updateItem" method instead */
    GridService.prototype.updateDataGridItem = function (item, shouldHighlightRow, shouldTriggerEvent, shouldSelectRow) {
        if (shouldHighlightRow === void 0) { shouldHighlightRow = true; }
        if (shouldTriggerEvent === void 0) { shouldTriggerEvent = true; }
        if (shouldSelectRow === void 0) { shouldSelectRow = true; }
        return this.updateItem(item, { highlightRow: shouldHighlightRow, triggerEvent: shouldTriggerEvent, selectRow: shouldSelectRow });
    };
    /** @deprecated please use "updateItems" method instead */
    GridService.prototype.updateDataGridItems = function (items, shouldHighlightRow, shouldTriggerEvent, shouldSelectRow) {
        if (shouldHighlightRow === void 0) { shouldHighlightRow = true; }
        if (shouldTriggerEvent === void 0) { shouldTriggerEvent = true; }
        if (shouldSelectRow === void 0) { shouldSelectRow = true; }
        return this.updateItems(items, { highlightRow: shouldHighlightRow, triggerEvent: shouldTriggerEvent, selectRow: shouldSelectRow });
    };
    /** @deprecated please use "updateItemById" method instead */
    GridService.prototype.updateDataGridItemById = function (itemId, item, shouldHighlightRow, shouldTriggerEvent, shouldSelectRow) {
        if (shouldHighlightRow === void 0) { shouldHighlightRow = true; }
        if (shouldTriggerEvent === void 0) { shouldTriggerEvent = true; }
        if (shouldSelectRow === void 0) { shouldSelectRow = true; }
        return this.updateItemById(itemId, item, { highlightRow: shouldHighlightRow, triggerEvent: shouldTriggerEvent, selectRow: shouldSelectRow });
    };
    /**
     * Update an existing item with new properties inside the datagrid
     * @param item object which must contain a unique "id" property and any other suitable properties
     * @param options: provide the possibility to do certain actions after or during the upsert (highlightRow, selectRow, triggerEvent)
     * @return grid row index
     */
    GridService.prototype.updateItem = function (item, options) {
        options = tslib_1.__assign({}, GridServiceUpdateOptionDefaults, options);
        var itemId = (!item || !item.hasOwnProperty('id')) ? undefined : item.id;
        if (itemId === undefined) {
            throw new Error("Calling Update of an item requires the item to include an \"id\" property");
        }
        return this.updateItemById(itemId, item, options);
    };
    /**
     * Update an array of existing items with new properties inside the datagrid
     * @param item object arrays, which must contain unique "id" property and any other suitable properties
     * @param options: provide the possibility to do certain actions after or during the upsert (highlightRow, selectRow, triggerEvent)
     * @return grid row indexes
     */
    GridService.prototype.updateItems = function (items, options) {
        var _this = this;
        options = tslib_1.__assign({}, GridServiceUpdateOptionDefaults, options);
        // when it's not an array, we can call directly the single item update
        if (!Array.isArray(items)) {
            return [this.updateItem(items, options)];
        }
        var gridRowNumbers = [];
        items.forEach(function (item) {
            gridRowNumbers.push(_this.updateItem(item, { highlightRow: false, selectRow: false, triggerEvent: false }));
        });
        // only highlight at the end, all at once
        // we have to do this because doing highlight 1 by 1 would only re-select the last highlighted row which is wrong behavior
        if (options.highlightRow) {
            this.highlightRow(gridRowNumbers);
        }
        // select the row in the grid
        if (options.selectRow && this._gridOptions && (this._gridOptions.enableCheckboxSelector || this._gridOptions.enableRowSelection)) {
            this._grid.setSelectedRows(gridRowNumbers);
        }
        // do we want to trigger an event after updating the item
        if (options.triggerEvent) {
            this.onItemUpdated.next(items);
        }
        return gridRowNumbers;
    };
    /**
     * Update an existing item in the datagrid by it's id and new properties
     * @param itemId: item unique id
     * @param item object which must contain a unique "id" property and any other suitable properties
     * @param options: provide the possibility to do certain actions after or during the upsert (highlightRow, selectRow, triggerEvent)
     * @return grid row number
     */
    GridService.prototype.updateItemById = function (itemId, item, options) {
        options = tslib_1.__assign({}, GridServiceUpdateOptionDefaults, options);
        if (itemId === undefined) {
            throw new Error("Cannot update a row without a valid \"id\"");
        }
        var rowNumber = this._dataView.getRowById(itemId);
        if (!item || rowNumber === undefined) {
            throw new Error("The item to update in the grid was not found with id: " + itemId);
        }
        if (this._dataView.getIdxById(itemId) !== undefined) {
            // Update the item itself inside the dataView
            this._dataView.updateItem(itemId, item);
            this._grid.updateRow(rowNumber);
            // highlight the row we just updated, if defined
            if (options.highlightRow) {
                this.highlightRow(rowNumber);
            }
            // select the row in the grid
            if (options.selectRow && this._gridOptions && (this._gridOptions.enableCheckboxSelector || this._gridOptions.enableRowSelection)) {
                this._grid.setSelectedRows(rowNumber);
            }
            // do we want to trigger an event after updating the item
            if (options.triggerEvent) {
                this.onItemUpdated.next(item);
            }
        }
        return rowNumber;
    };
    /**
     * Insert a row into the grid if it doesn't already exist or update if it does.
     * @param item object which must contain a unique "id" property and any other suitable properties
     * @param options: provide the possibility to do certain actions after or during the upsert (highlightRow, resortGrid, selectRow, triggerEvent)
     */
    GridService.prototype.upsertItem = function (item, options) {
        options = tslib_1.__assign({}, GridServiceInsertOptionDefaults, options);
        var itemId = (!item || !item.hasOwnProperty('id')) ? undefined : item.id;
        if (itemId === undefined) {
            throw new Error("Calling Upsert of an item requires the item to include an \"id\" property");
        }
        return this.upsertItemById(itemId, item, options);
    };
    /**
     * Update an array of existing items with new properties inside the datagrid
     * @param item object arrays, which must contain unique "id" property and any other suitable properties
     * @param options: provide the possibility to do certain actions after or during the upsert (highlightRow, resortGrid, selectRow, triggerEvent)
     * @return row numbers in the grid
     */
    GridService.prototype.upsertItems = function (items, options) {
        var _this = this;
        options = tslib_1.__assign({}, GridServiceInsertOptionDefaults, options);
        // when it's not an array, we can call directly the single item update
        if (!Array.isArray(items)) {
            return [this.upsertItem(items, options)];
        }
        var gridRowNumbers = [];
        items.forEach(function (item) {
            gridRowNumbers.push(_this.upsertItem(item, { highlightRow: false, resortGrid: false, selectRow: false, triggerEvent: false }));
        });
        // only highlight at the end, all at once
        // we have to do this because doing highlight 1 by 1 would only re-select the last highlighted row which is wrong behavior
        if (options.highlightRow) {
            this.highlightRow(gridRowNumbers);
        }
        // select the row in the grid
        if (options.selectRow && this._gridOptions && (this._gridOptions.enableCheckboxSelector || this._gridOptions.enableRowSelection)) {
            this._grid.setSelectedRows(gridRowNumbers);
        }
        // do we want to trigger an event after updating the item
        if (options.triggerEvent) {
            this.onItemUpserted.next(items);
        }
        return gridRowNumbers;
    };
    /**
     * Update an existing item in the datagrid by it's id and new properties
     * @param itemId: item unique id
     * @param item object which must contain a unique "id" property and any other suitable properties
     * @param options: provide the possibility to do certain actions after or during the upsert (highlightRow, resortGrid, selectRow, triggerEvent)
     * @return grid row number in the grid
     */
    GridService.prototype.upsertItemById = function (itemId, item, options) {
        options = tslib_1.__assign({}, GridServiceInsertOptionDefaults, options);
        if (itemId === undefined) {
            throw new Error("Calling Upsert of an item requires the item to include a valid and unique \"id\" property");
        }
        var rowNumber;
        if (this._dataView.getRowById(itemId) === undefined) {
            rowNumber = this.addItem(item, options);
        }
        else {
            rowNumber = this.updateItem(item, { highlightRow: options.highlightRow, selectRow: options.selectRow, triggerEvent: options.triggerEvent });
        }
        // do we want to trigger an event after updating the item
        if (options.triggerEvent) {
            this.onItemUpserted.next(item);
        }
        return rowNumber;
    };
    GridService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [ExtensionService,
            FilterService,
            GridStateService,
            SortService])
    ], GridService);
    return GridService;
}());
export { GridService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9zZXJ2aWNlcy9ncmlkLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBSS9CLElBQUksaUJBQXNCLENBQUM7QUFDM0IsSUFBTSwrQkFBK0IsR0FBNEIsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUM7QUFDeEYsSUFBTSwrQkFBK0IsR0FBNEIsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUM7QUFDakosSUFBTSwrQkFBK0IsR0FBNEIsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxDQUFDO0FBRzlIO0lBUUUscUJBQ1UsZ0JBQWtDLEVBQ2xDLGFBQTRCLEVBQzVCLGdCQUFrQyxFQUNsQyxXQUF3QjtRQUh4QixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFUbEMsZ0JB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UUFFRCx5REFBeUQ7UUFDekQsSUFBSSxPQUFPLENBQUMsWUFBWSxFQUFFO1lBQ3hCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2hDO1FBQ0QsT0FBTyxTQUFTLENBQUM7SUFDbkIsQ0FBQztJQS9vQlUsV0FBVztRQUR2QixVQUFVLEVBQUU7aURBVWlCLGdCQUFnQjtZQUNuQixhQUFhO1lBQ1YsZ0JBQWdCO1lBQ3JCLFdBQVc7T0FadkIsV0FBVyxDQWdwQnZCO0lBQUQsa0JBQUM7Q0FBQSxBQWhwQkQsSUFncEJDO1NBaHBCWSxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDZWxsQXJncywgQ29sdW1uLCBHcmlkT3B0aW9uLCBHcmlkU2VydmljZURlbGV0ZU9wdGlvbiwgR3JpZFNlcnZpY2VJbnNlcnRPcHRpb24sIEdyaWRTZXJ2aWNlVXBkYXRlT3B0aW9uLCBPbkV2ZW50QXJncyB9IGZyb20gJy4vLi4vbW9kZWxzL2luZGV4JztcclxuaW1wb3J0IHsgRXh0ZW5zaW9uU2VydmljZSB9IGZyb20gJy4vZXh0ZW5zaW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBGaWx0ZXJTZXJ2aWNlIH0gZnJvbSAnLi9maWx0ZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IEdyaWRTdGF0ZVNlcnZpY2UgfSBmcm9tICcuL2dyaWRTdGF0ZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU29ydFNlcnZpY2UgfSBmcm9tICcuL3NvcnQuc2VydmljZSc7XHJcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuXHJcbi8vIHVzaW5nIGV4dGVybmFsIG5vbi10eXBlZCBqcyBsaWJyYXJpZXNcclxuZGVjbGFyZSB2YXIgU2xpY2s6IGFueTtcclxubGV0IGhpZ2hsaWdodFRpbWVyRW5kOiBhbnk7XHJcbmNvbnN0IEdyaWRTZXJ2aWNlRGVsZXRlT3B0aW9uRGVmYXVsdHM6IEdyaWRTZXJ2aWNlRGVsZXRlT3B0aW9uID0geyB0cmlnZ2VyRXZlbnQ6IHRydWUgfTtcclxuY29uc3QgR3JpZFNlcnZpY2VJbnNlcnRPcHRpb25EZWZhdWx0czogR3JpZFNlcnZpY2VJbnNlcnRPcHRpb24gPSB7IGhpZ2hsaWdodFJvdzogdHJ1ZSwgcmVzb3J0R3JpZDogZmFsc2UsIHNlbGVjdFJvdzogZmFsc2UsIHRyaWdnZXJFdmVudDogdHJ1ZSB9O1xyXG5jb25zdCBHcmlkU2VydmljZVVwZGF0ZU9wdGlvbkRlZmF1bHRzOiBHcmlkU2VydmljZVVwZGF0ZU9wdGlvbiA9IHsgaGlnaGxpZ2h0Um93OiB0cnVlLCBzZWxlY3RSb3c6IGZhbHNlLCB0cmlnZ2VyRXZlbnQ6IHRydWUgfTtcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEdyaWRTZXJ2aWNlIHtcclxuICBwcml2YXRlIF9ncmlkOiBhbnk7XHJcbiAgcHJpdmF0ZSBfZGF0YVZpZXc6IGFueTtcclxuICBvbkl0ZW1BZGRlZCA9IG5ldyBTdWJqZWN0PGFueSB8IGFueVtdPigpO1xyXG4gIG9uSXRlbURlbGV0ZWQgPSBuZXcgU3ViamVjdDxhbnkgfCBhbnlbXT4oKTtcclxuICBvbkl0ZW1VcGRhdGVkID0gbmV3IFN1YmplY3Q8YW55IHwgYW55W10+KCk7XHJcbiAgb25JdGVtVXBzZXJ0ZWQgPSBuZXcgU3ViamVjdDxhbnkgfCBhbnlbXT4oKTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGV4dGVuc2lvblNlcnZpY2U6IEV4dGVuc2lvblNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGZpbHRlclNlcnZpY2U6IEZpbHRlclNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGdyaWRTdGF0ZVNlcnZpY2U6IEdyaWRTdGF0ZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHNvcnRTZXJ2aWNlOiBTb3J0U2VydmljZVxyXG4gICkgeyB9XHJcblxyXG4gIC8qKiBHZXR0ZXIgZm9yIHRoZSBHcmlkIE9wdGlvbnMgcHVsbGVkIHRocm91Z2ggdGhlIEdyaWQgT2JqZWN0ICovXHJcbiAgcHJpdmF0ZSBnZXQgX2dyaWRPcHRpb25zKCk6IEdyaWRPcHRpb24ge1xyXG4gICAgcmV0dXJuICh0aGlzLl9ncmlkICYmIHRoaXMuX2dyaWQuZ2V0T3B0aW9ucykgPyB0aGlzLl9ncmlkLmdldE9wdGlvbnMoKSA6IHt9O1xyXG4gIH1cclxuXHJcbiAgaW5pdChncmlkOiBhbnksIGRhdGFWaWV3OiBhbnkpOiB2b2lkIHtcclxuICAgIHRoaXMuX2dyaWQgPSBncmlkO1xyXG4gICAgdGhpcy5fZGF0YVZpZXcgPSBkYXRhVmlldztcclxuICB9XHJcblxyXG4gIC8qKiBDbGVhciBhbGwgRmlsdGVycyAmIFNvcnRzICovXHJcbiAgY2xlYXJBbGxGaWx0ZXJzQW5kU29ydHMoKSB7XHJcbiAgICAvLyBjYWxsIGJvdGggY2xlYXIgRmlsdGVycyAmIFNvcnQgYnV0IG9ubHkgdHJpZ2dlciB0aGUgbGFzdCBvbmUgdG8gYXZvaWQgc2VuZGluZyBtdWx0aXBsZSBiYWNrZW5kIHF1ZXJpZXNcclxuICAgIGlmICh0aGlzLnNvcnRTZXJ2aWNlICYmIHRoaXMuc29ydFNlcnZpY2UuY2xlYXJTb3J0aW5nKSB7XHJcbiAgICAgIHRoaXMuc29ydFNlcnZpY2UuY2xlYXJTb3J0aW5nKGZhbHNlKTsgLy8gc2tpcCBldmVudCB0cmlnZ2VyIG9uIHRoaXMgb25lXHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5maWx0ZXJTZXJ2aWNlICYmIHRoaXMuZmlsdGVyU2VydmljZS5jbGVhckZpbHRlcnMpIHtcclxuICAgICAgdGhpcy5maWx0ZXJTZXJ2aWNlLmNsZWFyRmlsdGVycygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRnJvbSBhIFNsaWNrR3JpZCBFdmVudCB0cmlnZ2VyZWQgZ2V0IHRoZSBDb2x1bW4gRGVmaW5pdGlvbiBhbmQgSXRlbSBEYXRhIENvbnRleHRcclxuICAgKlxyXG4gICAqIEZvciBleGFtcGxlIHRoZSBTbGlja0dyaWQgb25DbGljayB3aWxsIHJldHVybiBjZWxsIGFyZ3VtZW50cyB3aGVuIHN1YnNjcmliaW5nIHRvIGl0LlxyXG4gICAqIEZyb20gdGhlc2UgY2VsbEFyZ3MsIHdlIHdhbnQgdG8gZ2V0IHRoZSBDb2x1bW4gRGVmaW5pdGlvbiBhbmQgSXRlbSBEYXRhXHJcbiAgICogQHBhcmFtIGNlbGwgZXZlbnQgYXJnc1xyXG4gICAqIEByZXR1cm4gb2JqZWN0IHdpdGggY29sdW1uRGVmIGFuZCBkYXRhQ29udGV4dFxyXG4gICAqL1xyXG4gIGdldENvbHVtbkZyb21FdmVudEFyZ3VtZW50cyhhcmdzOiBDZWxsQXJncyk6IE9uRXZlbnRBcmdzIHtcclxuICAgIGlmICghYXJncyB8fCAhYXJncy5ncmlkIHx8ICFhcmdzLmdyaWQuZ2V0Q29sdW1ucyB8fCAhYXJncy5ncmlkLmdldERhdGFJdGVtKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignVG8gZ2V0IHRoZSBjb2x1bW4gZGVmaW5pdGlvbiBhbmQgZGF0YSwgd2UgbmVlZCB0byBoYXZlIHRoZXNlIGFyZ3VtZW50cyBwYXNzZWQgYXMgb2JqZWN0cyAocm93LCBjZWxsLCBncmlkKScpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIHJvdzogYXJncy5yb3csXHJcbiAgICAgIGNlbGw6IGFyZ3MuY2VsbCxcclxuICAgICAgY29sdW1uRGVmOiBhcmdzLmdyaWQuZ2V0Q29sdW1ucygpW2FyZ3MuY2VsbF0sXHJcbiAgICAgIGRhdGFDb250ZXh0OiBhcmdzLmdyaWQuZ2V0RGF0YUl0ZW0oYXJncy5yb3cpLFxyXG4gICAgICBkYXRhVmlldzogdGhpcy5fZGF0YVZpZXcsXHJcbiAgICAgIGdyaWQ6IHRoaXMuX2dyaWRcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvKiogR2V0IGRhdGEgaXRlbSBieSBpdCdzIHJvdyBpbmRleCBudW1iZXIgKi9cclxuICBnZXREYXRhSXRlbUJ5Um93TnVtYmVyKHJvd051bWJlcjogbnVtYmVyKSB7XHJcbiAgICBpZiAoIXRoaXMuX2dyaWQgfHwgdHlwZW9mIHRoaXMuX2dyaWQuZ2V0RGF0YUl0ZW0gIT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBXZSBjb3VsZCBub3QgZmluZCBTbGlja0dyaWQgR3JpZCBvYmplY3Qgb3IgaXQncyBcImdldERhdGFJdGVtXCIgbWV0aG9kYCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5fZ3JpZC5nZXREYXRhSXRlbShyb3dOdW1iZXIpO1xyXG4gIH1cclxuXHJcbiAgLyoqIENoYWluIHRoZSBpdGVtIE1ldGFkYXRhIHdpdGggb3VyIGltcGxlbWVudGF0aW9uIG9mIE1ldGFkYXRhIGF0IGdpdmVuIHJvdyBpbmRleCAqL1xyXG4gIGdldEl0ZW1Sb3dNZXRhZGF0YVRvSGlnaGxpZ2h0KHByZXZpb3VzSXRlbU1ldGFkYXRhOiBhbnkpIHtcclxuICAgIHJldHVybiAocm93TnVtYmVyOiBudW1iZXIpID0+IHtcclxuICAgICAgY29uc3QgaXRlbSA9IHRoaXMuX2RhdGFWaWV3LmdldEl0ZW0ocm93TnVtYmVyKTtcclxuICAgICAgbGV0IG1ldGEgPSB7IGNzc0NsYXNzZXM6ICcnIH07XHJcbiAgICAgIGlmICh0eXBlb2YgcHJldmlvdXNJdGVtTWV0YWRhdGEgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICBtZXRhID0gcHJldmlvdXNJdGVtTWV0YWRhdGEocm93TnVtYmVyKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCFtZXRhKSB7XHJcbiAgICAgICAgbWV0YSA9IHsgY3NzQ2xhc3NlczogJycgfTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGl0ZW0gJiYgaXRlbS5fZGlydHkpIHtcclxuICAgICAgICBtZXRhLmNzc0NsYXNzZXMgPSAobWV0YSAmJiBtZXRhLmNzc0NsYXNzZXMgfHwgJycpICsgJyBkaXJ0eSc7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChpdGVtICYmIGl0ZW0ucm93Q2xhc3MgJiYgbWV0YSkge1xyXG4gICAgICAgIG1ldGEuY3NzQ2xhc3NlcyArPSBgICR7aXRlbS5yb3dDbGFzc31gO1xyXG4gICAgICAgIG1ldGEuY3NzQ2xhc3NlcyArPSBgIHJvdyR7cm93TnVtYmVyfWA7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBtZXRhO1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEhpZ2hsaWdodCB0aGVuIGZhZGUgYSByb3cgZm9yIHggc2Vjb25kcy5cclxuICAgKiBUaGUgaW1wbGVtZW50YXRpb24gZm9sbG93cyB0aGlzIFNPIGFuc3dlcjogaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzE5OTg1MTQ4LzEyMTIxNjZcclxuICAgKiBAcGFyYW0gcm93TnVtYmVyXHJcbiAgICogQHBhcmFtIGZhZGVEZWxheVxyXG4gICAqL1xyXG4gIGhpZ2hsaWdodFJvdyhyb3dOdW1iZXI6IG51bWJlciB8IG51bWJlcltdLCBmYWRlRGVsYXkgPSAxNTAwLCBmYWRlT3V0RGVsYXkgPSAzMDApIHtcclxuICAgIC8vIGNyZWF0ZSBhIFNlbGVjdGlvbk1vZGVsIGlmIHRoZXJlJ3Mgbm90IG9uZSB5ZXRcclxuICAgIGlmICghdGhpcy5fZ3JpZC5nZXRTZWxlY3Rpb25Nb2RlbCgpKSB7XHJcbiAgICAgIGNvbnN0IHJvd1NlbGVjdGlvblBsdWdpbiA9IG5ldyBTbGljay5Sb3dTZWxlY3Rpb25Nb2RlbCh0aGlzLl9ncmlkT3B0aW9ucy5yb3dTZWxlY3Rpb25PcHRpb25zIHx8IHt9KTtcclxuICAgICAgdGhpcy5fZ3JpZC5zZXRTZWxlY3Rpb25Nb2RlbChyb3dTZWxlY3Rpb25QbHVnaW4pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChBcnJheS5pc0FycmF5KHJvd051bWJlcikpIHtcclxuICAgICAgcm93TnVtYmVyLmZvckVhY2gocm93ID0+IHRoaXMuaGlnaGxpZ2h0Um93QnlNZXRhZGF0YShyb3csIGZhZGVEZWxheSwgZmFkZU91dERlbGF5KSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmhpZ2hsaWdodFJvd0J5TWV0YWRhdGEocm93TnVtYmVyLCBmYWRlRGVsYXksIGZhZGVPdXREZWxheSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBoaWdobGlnaHRSb3dCeU1ldGFkYXRhKHJvd051bWJlcjogbnVtYmVyLCBmYWRlRGVsYXkgPSAxNTAwLCBmYWRlT3V0RGVsYXkgPSAzMDApIHtcclxuICAgIHRoaXMuX2RhdGFWaWV3LmdldEl0ZW1NZXRhZGF0YSA9IHRoaXMuZ2V0SXRlbVJvd01ldGFkYXRhVG9IaWdobGlnaHQodGhpcy5fZGF0YVZpZXcuZ2V0SXRlbU1ldGFkYXRhKTtcclxuXHJcbiAgICBjb25zdCBpdGVtID0gdGhpcy5fZGF0YVZpZXcuZ2V0SXRlbShyb3dOdW1iZXIpO1xyXG4gICAgaWYgKGl0ZW0gJiYgaXRlbS5pZCkge1xyXG4gICAgICBpdGVtLnJvd0NsYXNzID0gJ2hpZ2hsaWdodCc7XHJcbiAgICAgIHRoaXMuX2RhdGFWaWV3LnVwZGF0ZUl0ZW0oaXRlbS5pZCwgaXRlbSk7XHJcbiAgICAgIHRoaXMucmVuZGVyR3JpZCgpO1xyXG5cclxuICAgICAgLy8gZmFkZSBvdXRcclxuICAgICAgY2xlYXJUaW1lb3V0KGhpZ2hsaWdodFRpbWVyRW5kKTtcclxuICAgICAgaGlnaGxpZ2h0VGltZXJFbmQgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICBpdGVtLnJvd0NsYXNzID0gJ2hpZ2hsaWdodC1lbmQnO1xyXG4gICAgICAgIHRoaXMuX2RhdGFWaWV3LnVwZGF0ZUl0ZW0oaXRlbS5pZCwgaXRlbSk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJHcmlkKCk7XHJcbiAgICAgIH0sIGZhZGVPdXREZWxheSk7XHJcblxyXG4gICAgICAvLyBkZWxldGUgdGhlIHJvdydzIENTUyBoaWdobGlnaHQgY2xhc3NlcyBvbmNlIHRoZSBkZWxheSBpcyBwYXNzZWRcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgaWYgKGl0ZW0gJiYgaXRlbS5pZCkge1xyXG4gICAgICAgICAgZGVsZXRlIGl0ZW0ucm93Q2xhc3M7XHJcbiAgICAgICAgICBpZiAodGhpcy5fZGF0YVZpZXcuZ2V0SWR4QnlJZChpdGVtLmlkKSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2RhdGFWaWV3LnVwZGF0ZUl0ZW0oaXRlbS5pZCwgaXRlbSk7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyR3JpZCgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSwgZmFkZURlbGF5ICsgZmFkZU91dERlbGF5KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiBHZXQgdGhlIERhdGEgSXRlbSBmcm9tIGEgZ3JpZCByb3cgaW5kZXggKi9cclxuICBnZXREYXRhSXRlbUJ5Um93SW5kZXgoaW5kZXg6IG51bWJlcik6IGFueSB7XHJcbiAgICBpZiAoIXRoaXMuX2dyaWQgfHwgdHlwZW9mIHRoaXMuX2dyaWQuZ2V0RGF0YUl0ZW0gIT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdXZSBjb3VsZCBub3QgZmluZCBTbGlja0dyaWQgR3JpZCBvYmplY3QgYW5kL29yIFwiZ2V0RGF0YUl0ZW1cIiBtZXRob2QnKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5fZ3JpZC5nZXREYXRhSXRlbShpbmRleCk7XHJcbiAgfVxyXG5cclxuICAvKiogR2V0IHRoZSBEYXRhIEl0ZW0gZnJvbSBhbiBhcnJheSBvZiBncmlkIHJvdyBpbmRleGVzICovXHJcbiAgZ2V0RGF0YUl0ZW1CeVJvd0luZGV4ZXMoaW5kZXhlczogbnVtYmVyW10pOiBhbnlbXSB7XHJcbiAgICBpZiAoIXRoaXMuX2dyaWQgfHwgdHlwZW9mIHRoaXMuX2dyaWQuZ2V0RGF0YUl0ZW0gIT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdXZSBjb3VsZCBub3QgZmluZCBTbGlja0dyaWQgR3JpZCBvYmplY3QgYW5kL29yIFwiZ2V0RGF0YUl0ZW1cIiBtZXRob2QnKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBkYXRhSXRlbXMgPSBbXTtcclxuXHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheShpbmRleGVzKSkge1xyXG4gICAgICBpbmRleGVzLmZvckVhY2goKGlkeCkgPT4ge1xyXG4gICAgICAgIGRhdGFJdGVtcy5wdXNoKHRoaXMuX2dyaWQuZ2V0RGF0YUl0ZW0oaWR4KSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBkYXRhSXRlbXM7XHJcbiAgfVxyXG5cclxuICAvKiogR2V0IHRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgcm93IGluZGV4ZXMgKi9cclxuICBnZXRTZWxlY3RlZFJvd3MoKTogbnVtYmVyW10ge1xyXG4gICAgaWYgKCF0aGlzLl9ncmlkIHx8IHR5cGVvZiB0aGlzLl9ncmlkLmdldFNlbGVjdGVkUm93cyAhPT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1dlIGNvdWxkIG5vdCBmaW5kIFNsaWNrR3JpZCBHcmlkIG9iamVjdCBhbmQvb3IgXCJnZXRTZWxlY3RlZFJvd3NcIiBtZXRob2QnKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLl9ncmlkLmdldFNlbGVjdGVkUm93cygpO1xyXG4gIH1cclxuXHJcbiAgLyoqIEdldCB0aGUgY3VycmVudGx5IHNlbGVjdGVkIHJvd3MgaXRlbSBkYXRhICovXHJcbiAgZ2V0U2VsZWN0ZWRSb3dzRGF0YUl0ZW0oKTogYW55W10ge1xyXG4gICAgaWYgKCF0aGlzLl9ncmlkIHx8IHR5cGVvZiB0aGlzLl9ncmlkLmdldFNlbGVjdGVkUm93cyAhPT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1dlIGNvdWxkIG5vdCBmaW5kIFNsaWNrR3JpZCBHcmlkIG9iamVjdCBhbmQvb3IgXCJnZXRTZWxlY3RlZFJvd3NcIiBtZXRob2QnKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzZWxlY3RlZFJvd0luZGV4ZXMgPSB0aGlzLl9ncmlkLmdldFNlbGVjdGVkUm93cygpO1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0RGF0YUl0ZW1CeVJvd0luZGV4ZXMoc2VsZWN0ZWRSb3dJbmRleGVzKTtcclxuICB9XHJcblxyXG4gIC8qKiBTZWxlY3QgdGhlIHNlbGVjdGVkIHJvdyBieSBhIHJvdyBpbmRleCAqL1xyXG4gIHNldFNlbGVjdGVkUm93KHJvd0luZGV4OiBudW1iZXIpIHtcclxuICAgIGlmICh0aGlzLl9ncmlkICYmIHRoaXMuX2dyaWQuc2V0U2VsZWN0ZWRSb3dzKSB7XHJcbiAgICAgIHRoaXMuX2dyaWQuc2V0U2VsZWN0ZWRSb3dzKFtyb3dJbmRleF0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIFNldCBzZWxlY3RlZCByb3dzIHdpdGggcHJvdmlkZWQgYXJyYXkgb2Ygcm93IGluZGV4ZXMgKi9cclxuICBzZXRTZWxlY3RlZFJvd3Mocm93SW5kZXhlczogbnVtYmVyW10pIHtcclxuICAgIGlmICh0aGlzLl9ncmlkICYmIHRoaXMuX2dyaWQuc2V0U2VsZWN0ZWRSb3dzKSB7XHJcbiAgICAgIHRoaXMuX2dyaWQuc2V0U2VsZWN0ZWRSb3dzKHJvd0luZGV4ZXMpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIFJlLVJlbmRlciB0aGUgR3JpZCAqL1xyXG4gIHJlbmRlckdyaWQoKSB7XHJcbiAgICBpZiAodGhpcy5fZ3JpZCAmJiB0eXBlb2YgdGhpcy5fZ3JpZC5pbnZhbGlkYXRlID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgIHRoaXMuX2dyaWQuaW52YWxpZGF0ZSgpO1xyXG4gICAgICB0aGlzLl9ncmlkLnJlbmRlcigpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVzZXQgdGhlIGdyaWQgdG8gaXQncyBvcmlnaW5hbCBzdGF0ZSAoY2xlYXIgYW55IGZpbHRlcnMsIHNvcnRpbmcgJiBwYWdpbmF0aW9uIGlmIGV4aXN0cykgLlxyXG4gICAqIFRoZSBjb2x1bW4gZGVmaW5pdGlvbnMgY291bGQgYmUgcGFzc2VkIGFzIGFyZ3VtZW50IHRvIHJlc2V0ICh0aGlzIGNhbiBiZSB1c2VkIGFmdGVyIGEgR3JpZCBTdGF0ZSByZXNldClcclxuICAgKiBUaGUgcmVzZXQgd2lsbCBjbGVhciB0aGUgRmlsdGVycyAmIFNvcnQsIHRoZW4gd2lsbCByZXNldCB0aGUgQ29sdW1ucyB0byB0aGVpciBvcmlnaW5hbCBzdGF0ZVxyXG4gICAqL1xyXG4gIHJlc2V0R3JpZChjb2x1bW5EZWZpbml0aW9ucz86IENvbHVtbltdKSB7XHJcbiAgICAvLyByZXNldCBjb2x1bW5zIHRvIG9yaWdpbmFsIHN0YXRlcyAmIHJlZnJlc2ggdGhlIGdyaWRcclxuICAgIGlmICh0aGlzLl9ncmlkICYmIHRoaXMuX2RhdGFWaWV3KSB7XHJcbiAgICAgIGNvbnN0IG9yaWdpbmFsQ29sdW1ucyA9IHRoaXMuZXh0ZW5zaW9uU2VydmljZS5nZXRBbGxDb2x1bW5zKCk7XHJcblxyXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShvcmlnaW5hbENvbHVtbnMpICYmIG9yaWdpbmFsQ29sdW1ucy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgLy8gc2V0IHRoZSBncmlkIGNvbHVtbnMgdG8gaXQncyBvcmlnaW5hbCBjb2x1bW4gZGVmaW5pdGlvbnNcclxuICAgICAgICB0aGlzLl9ncmlkLnNldENvbHVtbnMob3JpZ2luYWxDb2x1bW5zKTtcclxuICAgICAgICBpZiAodGhpcy5fZ3JpZE9wdGlvbnMgJiYgdGhpcy5fZ3JpZE9wdGlvbnMuZW5hYmxlQXV0b1NpemVDb2x1bW5zKSB7XHJcbiAgICAgICAgICB0aGlzLl9ncmlkLmF1dG9zaXplQ29sdW1ucygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmdyaWRTdGF0ZVNlcnZpY2UucmVzZXRDb2x1bW5zKGNvbHVtbkRlZmluaXRpb25zKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmZpbHRlclNlcnZpY2UgJiYgdGhpcy5maWx0ZXJTZXJ2aWNlLmNsZWFyRmlsdGVycykge1xyXG4gICAgICB0aGlzLmZpbHRlclNlcnZpY2UuY2xlYXJGaWx0ZXJzKCk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5zb3J0U2VydmljZSAmJiB0aGlzLnNvcnRTZXJ2aWNlLmNsZWFyU29ydGluZykge1xyXG4gICAgICB0aGlzLnNvcnRTZXJ2aWNlLmNsZWFyU29ydGluZygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIEBkZXByZWNhdGVkIHBsZWFzZSB1c2UgXCJhZGRJdGVtXCIgbWV0aG9kIGluc3RlYWQgKi9cclxuICBhZGRJdGVtVG9EYXRhZ3JpZChpdGVtOiBhbnksIHNob3VsZEhpZ2hsaWdodFJvdyA9IHRydWUsIHNob3VsZFJlc29ydEdyaWQgPSBmYWxzZSwgc2hvdWxkVHJpZ2dlckV2ZW50ID0gdHJ1ZSwgc2hvdWxkU2VsZWN0Um93ID0gdHJ1ZSk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5hZGRJdGVtKGl0ZW0sIHsgaGlnaGxpZ2h0Um93OiBzaG91bGRIaWdobGlnaHRSb3csIHJlc29ydEdyaWQ6IHNob3VsZFJlc29ydEdyaWQsIHRyaWdnZXJFdmVudDogc2hvdWxkVHJpZ2dlckV2ZW50LCBzZWxlY3RSb3c6IHNob3VsZFNlbGVjdFJvdyB9KTtcclxuICB9XHJcblxyXG4gIC8qKiBAZGVwcmVjYXRlZCBwbGVhc2UgdXNlIFwiYWRkSXRlbXNcIiBtZXRob2QgaW5zdGVhZCAqL1xyXG4gIGFkZEl0ZW1zVG9EYXRhZ3JpZChpdGVtczogYW55W10sIHNob3VsZEhpZ2hsaWdodFJvdyA9IHRydWUsIHNob3VsZFJlc29ydEdyaWQgPSBmYWxzZSwgc2hvdWxkVHJpZ2dlckV2ZW50ID0gdHJ1ZSwgc2hvdWxkU2VsZWN0Um93ID0gdHJ1ZSk6IG51bWJlcltdIHtcclxuICAgIHJldHVybiB0aGlzLmFkZEl0ZW1zKGl0ZW1zLCB7IGhpZ2hsaWdodFJvdzogc2hvdWxkSGlnaGxpZ2h0Um93LCByZXNvcnRHcmlkOiBzaG91bGRSZXNvcnRHcmlkLCB0cmlnZ2VyRXZlbnQ6IHNob3VsZFRyaWdnZXJFdmVudCwgc2VsZWN0Um93OiBzaG91bGRTZWxlY3RSb3cgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgYW4gaXRlbSAoZGF0YSBpdGVtKSB0byB0aGUgZGF0YWdyaWQsIGJ5IGRlZmF1bHQgaXQgd2lsbCBoaWdobGlnaHQgKGZsYXNoaW5nKSB0aGUgaW5zZXJ0ZWQgcm93IGJ1dCB3ZSBjYW4gZGlzYWJsZSBpdCB0b29cclxuICAgKiBAcGFyYW0gaXRlbSBvYmplY3Qgd2hpY2ggbXVzdCBjb250YWluIGEgdW5pcXVlIFwiaWRcIiBwcm9wZXJ0eSBhbmQgYW55IG90aGVyIHN1aXRhYmxlIHByb3BlcnRpZXNcclxuICAgKiBAcGFyYW0gb3B0aW9uczogcHJvdmlkZSB0aGUgcG9zc2liaWxpdHkgdG8gZG8gY2VydGFpbiBhY3Rpb25zIGFmdGVyIG9yIGR1cmluZyB0aGUgdXBzZXJ0IChoaWdobGlnaHRSb3csIHJlc29ydEdyaWQsIHNlbGVjdFJvdywgdHJpZ2dlckV2ZW50KVxyXG4gICAqIEByZXR1cm4gcm93SW5kZXg6IHR5cGljYWxseSBpbmRleCAwXHJcbiAgICovXHJcbiAgYWRkSXRlbShpdGVtOiBhbnksIG9wdGlvbnM/OiBHcmlkU2VydmljZUluc2VydE9wdGlvbik6IG51bWJlciB7XHJcbiAgICBvcHRpb25zID0geyAuLi5HcmlkU2VydmljZUluc2VydE9wdGlvbkRlZmF1bHRzLCAuLi5vcHRpb25zIH07XHJcblxyXG4gICAgaWYgKCF0aGlzLl9ncmlkIHx8ICF0aGlzLl9ncmlkT3B0aW9ucyB8fCAhdGhpcy5fZGF0YVZpZXcpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdXZSBjb3VsZCBub3QgZmluZCBTbGlja0dyaWQgR3JpZCwgRGF0YVZpZXcgb2JqZWN0cycpO1xyXG4gICAgfVxyXG4gICAgaWYgKCFpdGVtIHx8ICFpdGVtLmhhc093blByb3BlcnR5KCdpZCcpKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQWRkaW5nIGFuIGl0ZW0gcmVxdWlyZXMgdGhlIGl0ZW0gdG8gaW5jbHVkZSBhbiBcImlkXCIgcHJvcGVydHlgKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9kYXRhVmlldy5pbnNlcnRJdGVtKDAsIGl0ZW0pOyAvLyBpbnNlcnQgYXQgaW5kZXggMFxyXG5cclxuICAgIC8vIHJvdyBudW1iZXIgaW4gdGhlIGdyaWQsIGJ5IGRlZmF1bHQgaXQgd2lsbCBiZSBvbiBmaXJzdCByb3dcclxuICAgIGxldCByb3dOdW1iZXIgPSAwO1xyXG5cclxuICAgIC8vIGRvIHdlIHdhbnQgdGhlIGl0ZW0gdG8gYmUgc29ydGVkIGluIHRoZSBncmlkLCB3aGVuIHNldCB0byBGYWxzZSBpdCB3aWxsIGluc2VydCBvbiBmaXJzdCByb3cgKGRlZmF1bHRzIHRvIGZhbHNlKVxyXG4gICAgaWYgKG9wdGlvbnMucmVzb3J0R3JpZCkge1xyXG4gICAgICB0aGlzLl9kYXRhVmlldy5yZVNvcnQoKTtcclxuXHJcbiAgICAgIC8vIGZpbmQgdGhlIHJvdyBudW1iZXIgaW4gdGhlIGdyaWQgYW5kIGlmIHVzZXIgd2FudGVkIHRvIHNlZSBoaWdobGlnaHRlZCByb3dcclxuICAgICAgLy8gd2UgbmVlZCB0byBkbyBpdCBoZXJlIGFmdGVyIHJlc29ydCBhbmQgZ2V0IGVhY2ggcm93IG51bWJlciBiZWNhdXNlIGl0IHBvc3NpYmx5IGNoYW5nZXMgYWZ0ZXIgdGhlIHNvcnRcclxuICAgICAgcm93TnVtYmVyID0gdGhpcy5fZGF0YVZpZXcuZ2V0Um93QnlJZChpdGVtLmlkKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuX2dyaWQuc2Nyb2xsUm93SW50b1ZpZXcocm93TnVtYmVyKTsgLy8gc2Nyb2xsIHRvIHJvdyAwXHJcbiAgICB9XHJcblxyXG4gICAgLy8gaGlnaGxpZ2h0IHRoZSByb3cgd2UganVzdCBhZGRlZCwgaWYgaGlnaGxpZ2h0IGlzIGRlZmluZWRcclxuICAgIGlmIChvcHRpb25zLmhpZ2hsaWdodFJvdykge1xyXG4gICAgICB0aGlzLmhpZ2hsaWdodFJvdyhyb3dOdW1iZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHNlbGVjdCB0aGUgcm93IGluIHRoZSBncmlkXHJcbiAgICBpZiAob3B0aW9ucy5zZWxlY3RSb3cgJiYgdGhpcy5fZ3JpZE9wdGlvbnMgJiYgKHRoaXMuX2dyaWRPcHRpb25zLmVuYWJsZUNoZWNrYm94U2VsZWN0b3IgfHwgdGhpcy5fZ3JpZE9wdGlvbnMuZW5hYmxlUm93U2VsZWN0aW9uKSkge1xyXG4gICAgICB0aGlzLl9ncmlkLnNldFNlbGVjdGVkUm93cyhyb3dOdW1iZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGRvIHdlIHdhbnQgdG8gdHJpZ2dlciBhbiBldmVudCBhZnRlciBhZGRpbmcgdGhlIGl0ZW1cclxuICAgIGlmIChvcHRpb25zLnRyaWdnZXJFdmVudCkge1xyXG4gICAgICB0aGlzLm9uSXRlbUFkZGVkLm5leHQoaXRlbSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJvd051bWJlcjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZCBpdGVtIGFycmF5IChkYXRhIGl0ZW0pIHRvIHRoZSBkYXRhZ3JpZCwgYnkgZGVmYXVsdCBpdCB3aWxsIGhpZ2hsaWdodCAoZmxhc2hpbmcpIHRoZSBpbnNlcnRlZCByb3cgYnV0IHdlIGNhbiBkaXNhYmxlIGl0IHRvb1xyXG4gICAqIEBwYXJhbSBpdGVtIG9iamVjdCBhcnJheXMsIHdoaWNoIG11c3QgY29udGFpbiB1bmlxdWUgXCJpZFwiIHByb3BlcnR5IGFuZCBhbnkgb3RoZXIgc3VpdGFibGUgcHJvcGVydGllc1xyXG4gICAqIEBwYXJhbSBvcHRpb25zOiBwcm92aWRlIHRoZSBwb3NzaWJpbGl0eSB0byBkbyBjZXJ0YWluIGFjdGlvbnMgYWZ0ZXIgb3IgZHVyaW5nIHRoZSB1cHNlcnQgKGhpZ2hsaWdodFJvdywgcmVzb3J0R3JpZCwgc2VsZWN0Um93LCB0cmlnZ2VyRXZlbnQpXHJcbiAgICovXHJcbiAgYWRkSXRlbXMoaXRlbXM6IGFueSB8IGFueVtdLCBvcHRpb25zPzogR3JpZFNlcnZpY2VJbnNlcnRPcHRpb24pOiBudW1iZXJbXSB7XHJcbiAgICBvcHRpb25zID0geyAuLi5HcmlkU2VydmljZUluc2VydE9wdGlvbkRlZmF1bHRzLCAuLi5vcHRpb25zIH07XHJcbiAgICBjb25zdCByb3dOdW1iZXJzOiBudW1iZXJbXSA9IFtdO1xyXG5cclxuICAgIC8vIGxvb3AgdGhyb3VnaCBhbGwgaXRlbXMgdG8gYWRkXHJcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoaXRlbXMpKSB7XHJcbiAgICAgIHJldHVybiBbdGhpcy5hZGRJdGVtKGl0ZW1zLCBvcHRpb25zKV07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpdGVtcy5mb3JFYWNoKChpdGVtOiBhbnkpID0+IHRoaXMuYWRkSXRlbShpdGVtLCB7IGhpZ2hsaWdodFJvdzogZmFsc2UsIHJlc29ydEdyaWQ6IGZhbHNlLCBzZWxlY3RSb3c6IGZhbHNlLCB0cmlnZ2VyRXZlbnQ6IGZhbHNlIH0pKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBkbyB3ZSB3YW50IHRoZSBpdGVtIHRvIGJlIHNvcnRlZCBpbiB0aGUgZ3JpZCwgd2hlbiBzZXQgdG8gRmFsc2UgaXQgd2lsbCBpbnNlcnQgb24gZmlyc3Qgcm93IChkZWZhdWx0cyB0byBmYWxzZSlcclxuICAgIGlmIChvcHRpb25zLnJlc29ydEdyaWQpIHtcclxuICAgICAgdGhpcy5fZGF0YVZpZXcucmVTb3J0KCk7XHJcblxyXG4gICAgICAvLyBpZiB1c2VyIHdhbnRlZCB0byBzZWUgaGlnaGxpZ2h0ZWQgcm93XHJcbiAgICAgIC8vIHdlIG5lZWQgdG8gZG8gaXQgaGVyZSBhZnRlciByZXNvcnQgYW5kIGdldCBlYWNoIHJvdyBudW1iZXIgYmVjYXVzZSBpdCBwb3NzaWJseSBjaGFuZ2VzIGFmdGVyIHRoZSBzb3J0XHJcbiAgICAgIGlmIChvcHRpb25zLmhpZ2hsaWdodFJvdykge1xyXG4gICAgICAgIGl0ZW1zLmZvckVhY2goKGl0ZW06IGFueSkgPT4ge1xyXG4gICAgICAgICAgY29uc3Qgcm93TnVtYmVyID0gdGhpcy5fZGF0YVZpZXcuZ2V0Um93QnlJZChpdGVtLmlkKTtcclxuICAgICAgICAgIHJvd051bWJlcnMucHVzaChyb3dOdW1iZXIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKG9wdGlvbnMuaGlnaGxpZ2h0Um93KSB7XHJcbiAgICAgIGNvbnN0IGxuID0gaXRlbXMubGVuZ3RoO1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxuOyBpKyspIHtcclxuICAgICAgICByb3dOdW1iZXJzLnB1c2goaSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBkbyB1c2VyIHdhbnQgdG8gaGlnaGxpZ2h0IHRoZSByb3dzXHJcbiAgICBpZiAob3B0aW9ucy5oaWdobGlnaHRSb3cpIHtcclxuICAgICAgdGhpcy5oaWdobGlnaHRSb3cocm93TnVtYmVycyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gc2VsZWN0IHRoZSByb3cgaW4gdGhlIGdyaWRcclxuICAgIGlmIChvcHRpb25zLnNlbGVjdFJvdyAmJiB0aGlzLl9ncmlkT3B0aW9ucyAmJiAodGhpcy5fZ3JpZE9wdGlvbnMuZW5hYmxlQ2hlY2tib3hTZWxlY3RvciB8fCB0aGlzLl9ncmlkT3B0aW9ucy5lbmFibGVSb3dTZWxlY3Rpb24pKSB7XHJcbiAgICAgIHRoaXMuX2dyaWQuc2V0U2VsZWN0ZWRSb3dzKHJvd051bWJlcnMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGRvIHdlIHdhbnQgdG8gdHJpZ2dlciBhbiBldmVudCBhZnRlciBhZGRpbmcgdGhlIGl0ZW1cclxuICAgIGlmIChvcHRpb25zLnRyaWdnZXJFdmVudCkge1xyXG4gICAgICB0aGlzLm9uSXRlbUFkZGVkLm5leHQoaXRlbXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByb3dOdW1iZXJzO1xyXG4gIH1cclxuXHJcbiAgLyoqIEBkZXByZWNhdGVkIHBsZWFzZSB1c2UgXCJkZWxldGVJdGVtXCIgbWV0aG9kIGluc3RlYWQgKi9cclxuICBkZWxldGVEYXRhR3JpZEl0ZW0oaXRlbTogYW55LCBzaG91bGRUcmlnZ2VyRXZlbnQgPSB0cnVlKSB7XHJcbiAgICB0aGlzLmRlbGV0ZUl0ZW0oaXRlbSwgeyB0cmlnZ2VyRXZlbnQ6IHNob3VsZFRyaWdnZXJFdmVudCB9KTtcclxuICB9XHJcblxyXG4gIC8qKiBAZGVwcmVjYXRlZCBwbGVhc2UgdXNlIFwiZGVsZXRlSXRlbXNcIiBtZXRob2QgaW5zdGVhZCAqL1xyXG4gIGRlbGV0ZURhdGFHcmlkSXRlbXMoaXRlbXM6IGFueVtdLCBzaG91bGRUcmlnZ2VyRXZlbnQgPSB0cnVlKSB7XHJcbiAgICB0aGlzLmRlbGV0ZUl0ZW1zKGl0ZW1zLCB7IHRyaWdnZXJFdmVudDogc2hvdWxkVHJpZ2dlckV2ZW50IH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqIEBkZXByZWNhdGVkIHBsZWFzZSB1c2UgXCJkZWxldGVJdGVtQnlJZFwiIG1ldGhvZCBpbnN0ZWFkICovXHJcbiAgZGVsZXRlRGF0YUdyaWRJdGVtQnlJZChpdGVtSWQ6IHN0cmluZyB8IG51bWJlciwgc2hvdWxkVHJpZ2dlckV2ZW50ID0gdHJ1ZSkge1xyXG4gICAgdGhpcy5kZWxldGVJdGVtQnlJZChpdGVtSWQsIHsgdHJpZ2dlckV2ZW50OiBzaG91bGRUcmlnZ2VyRXZlbnQgfSk7XHJcbiAgfVxyXG5cclxuICAvKiogQGRlcHJlY2F0ZWQgcGxlYXNlIHVzZSBcImRlbGV0ZUl0ZW1CeUlkc1wiIG1ldGhvZCBpbnN0ZWFkICovXHJcbiAgZGVsZXRlRGF0YUdyaWRJdGVtQnlJZHMoaXRlbUlkczogbnVtYmVyW10gfCBzdHJpbmdbXSwgc2hvdWxkVHJpZ2dlckV2ZW50ID0gdHJ1ZSkge1xyXG4gICAgdGhpcy5kZWxldGVJdGVtQnlJZHMoaXRlbUlkcywgeyB0cmlnZ2VyRXZlbnQ6IHNob3VsZFRyaWdnZXJFdmVudCB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERlbGV0ZSBhbiBleGlzdGluZyBpdGVtIGZyb20gdGhlIGRhdGFncmlkIChkYXRhVmlldylcclxuICAgKiBAcGFyYW0gaXRlbSBvYmplY3Qgd2hpY2ggbXVzdCBjb250YWluIGEgdW5pcXVlIFwiaWRcIiBwcm9wZXJ0eSBhbmQgYW55IG90aGVyIHN1aXRhYmxlIHByb3BlcnRpZXNcclxuICAgKiBAcGFyYW0gb3B0aW9uczogcHJvdmlkZSB0aGUgcG9zc2liaWxpdHkgdG8gZG8gY2VydGFpbiBhY3Rpb25zIGFmdGVyIG9yIGR1cmluZyB0aGUgdXBzZXJ0ICh0cmlnZ2VyRXZlbnQpXHJcbiAgICogQHJldHVybiBpdGVtIGlkIGRlbGV0ZWRcclxuICAgKi9cclxuICBkZWxldGVJdGVtKGl0ZW06IGFueSwgb3B0aW9ucz86IEdyaWRTZXJ2aWNlRGVsZXRlT3B0aW9uKTogbnVtYmVyIHwgc3RyaW5nIHtcclxuICAgIG9wdGlvbnMgPSB7IC4uLkdyaWRTZXJ2aWNlRGVsZXRlT3B0aW9uRGVmYXVsdHMsIC4uLm9wdGlvbnMgfTtcclxuXHJcbiAgICBpZiAoIWl0ZW0gfHwgIWl0ZW0uaGFzT3duUHJvcGVydHkoJ2lkJykpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBEZWxldGluZyBhbiBpdGVtIHJlcXVpcmVzIHRoZSBpdGVtIHRvIGluY2x1ZGUgYW4gXCJpZFwiIHByb3BlcnR5YCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5kZWxldGVJdGVtQnlJZChpdGVtLmlkLCBvcHRpb25zKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERlbGV0ZSBhbiBhcnJheSBvZiBleGlzdGluZyBpdGVtcyBmcm9tIHRoZSBkYXRhZ3JpZFxyXG4gICAqIEBwYXJhbSBpdGVtIG9iamVjdCB3aGljaCBtdXN0IGNvbnRhaW4gYSB1bmlxdWUgXCJpZFwiIHByb3BlcnR5IGFuZCBhbnkgb3RoZXIgc3VpdGFibGUgcHJvcGVydGllc1xyXG4gICAqIEBwYXJhbSBvcHRpb25zOiBwcm92aWRlIHRoZSBwb3NzaWJpbGl0eSB0byBkbyBjZXJ0YWluIGFjdGlvbnMgYWZ0ZXIgb3IgZHVyaW5nIHRoZSB1cHNlcnQgKHRyaWdnZXJFdmVudClcclxuICAgKiBAcmV0dXJuIGl0ZW0gaWQgZGVsZXRlZFxyXG4gICAqL1xyXG4gIGRlbGV0ZUl0ZW1zKGl0ZW1zOiBhbnkgfCBhbnlbXSwgb3B0aW9ucz86IEdyaWRTZXJ2aWNlRGVsZXRlT3B0aW9uKTogbnVtYmVyW10gfCBzdHJpbmdbXSB7XHJcbiAgICBvcHRpb25zID0geyAuLi5HcmlkU2VydmljZURlbGV0ZU9wdGlvbkRlZmF1bHRzLCAuLi5vcHRpb25zIH07XHJcblxyXG4gICAgLy8gd2hlbiBpdCdzIG5vdCBhbiBhcnJheSwgd2UgY2FuIGNhbGwgZGlyZWN0bHkgdGhlIHNpbmdsZSBpdGVtIGRlbGV0ZVxyXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGl0ZW1zKSkge1xyXG4gICAgICB0aGlzLmRlbGV0ZUl0ZW0oaXRlbXMsIG9wdGlvbnMpO1xyXG4gICAgICByZXR1cm4gW2l0ZW1zLmlkXTtcclxuICAgIH1cclxuICAgIGNvbnN0IGl0ZW1JZHMgPSBbXTtcclxuICAgIGl0ZW1zLmZvckVhY2goKGl0ZW06IGFueSkgPT4ge1xyXG4gICAgICBpZiAoaXRlbSAmJiBpdGVtLmlkICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBpdGVtSWRzLnB1c2goaXRlbS5pZCk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5kZWxldGVJdGVtKGl0ZW0sIHsgdHJpZ2dlckV2ZW50OiBmYWxzZSB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIGRvIHdlIHdhbnQgdG8gdHJpZ2dlciBhbiBldmVudCBhZnRlciBkZWxldGluZyB0aGUgaXRlbVxyXG4gICAgaWYgKG9wdGlvbnMudHJpZ2dlckV2ZW50KSB7XHJcbiAgICAgIHRoaXMub25JdGVtRGVsZXRlZC5uZXh0KGl0ZW1zKTtcclxuICAgIH1cclxuICAgIHJldHVybiBpdGVtSWRzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRGVsZXRlIGFuIGV4aXN0aW5nIGl0ZW0gZnJvbSB0aGUgZGF0YWdyaWQgKGRhdGFWaWV3KSBieSBpdCdzIGlkXHJcbiAgICogQHBhcmFtIGl0ZW1JZDogaXRlbSB1bmlxdWUgaWRcclxuICAgKiBAcGFyYW0gb3B0aW9uczogcHJvdmlkZSB0aGUgcG9zc2liaWxpdHkgdG8gZG8gY2VydGFpbiBhY3Rpb25zIGFmdGVyIG9yIGR1cmluZyB0aGUgdXBzZXJ0ICh0cmlnZ2VyRXZlbnQpXHJcbiAgICogQHJldHVybiBpdGVtIGlkIGRlbGV0ZWRcclxuICAgKi9cclxuICBkZWxldGVJdGVtQnlJZChpdGVtSWQ6IHN0cmluZyB8IG51bWJlciwgb3B0aW9ucz86IEdyaWRTZXJ2aWNlRGVsZXRlT3B0aW9uKTogbnVtYmVyIHwgc3RyaW5nIHtcclxuICAgIG9wdGlvbnMgPSB7IC4uLkdyaWRTZXJ2aWNlRGVsZXRlT3B0aW9uRGVmYXVsdHMsIC4uLm9wdGlvbnMgfTtcclxuXHJcbiAgICBpZiAoaXRlbUlkID09PSBudWxsIHx8IGl0ZW1JZCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQ2Fubm90IGRlbGV0ZSBhIHJvdyB3aXRob3V0IGEgdmFsaWQgXCJpZFwiYCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gd2hlbiB1c2VyIGhhcyByb3cgc2VsZWN0aW9uIGVuYWJsZWQsIHdlIHNob3VsZCBjbGVhciBhbnkgc2VsZWN0aW9uIHRvIGF2b2lkIGNvbmZ1c2lvbiBhZnRlciBhIGRlbGV0ZVxyXG4gICAgaWYgKHRoaXMuX2dyaWQgJiYgdGhpcy5fZ3JpZE9wdGlvbnMgJiYgKHRoaXMuX2dyaWRPcHRpb25zLmVuYWJsZUNoZWNrYm94U2VsZWN0b3IgfHwgdGhpcy5fZ3JpZE9wdGlvbnMuZW5hYmxlUm93U2VsZWN0aW9uKSkge1xyXG4gICAgICB0aGlzLl9ncmlkLnNldFNlbGVjdGVkUm93cyhbXSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZGVsZXRlIHRoZSBpdGVtIGZyb20gdGhlIGRhdGFWaWV3XHJcbiAgICB0aGlzLl9kYXRhVmlldy5kZWxldGVJdGVtKGl0ZW1JZCk7XHJcblxyXG4gICAgLy8gZG8gd2Ugd2FudCB0byB0cmlnZ2VyIGFuIGV2ZW50IGFmdGVyIGRlbGV0aW5nIHRoZSBpdGVtXHJcbiAgICBpZiAob3B0aW9ucy50cmlnZ2VyRXZlbnQpIHtcclxuICAgICAgdGhpcy5vbkl0ZW1EZWxldGVkLm5leHQoaXRlbUlkKTtcclxuICAgIH1cclxuICAgIHJldHVybiBpdGVtSWQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEZWxldGUgYW4gYXJyYXkgb2YgZXhpc3RpbmcgaXRlbXMgZnJvbSB0aGUgZGF0YWdyaWRcclxuICAgKiBAcGFyYW0gaXRlbUlkcyBhcnJheSBvZiBpdGVtIHVuaXF1ZSBJRHNcclxuICAgKiBAcGFyYW0gb3B0aW9uczogcHJvdmlkZSB0aGUgcG9zc2liaWxpdHkgdG8gZG8gY2VydGFpbiBhY3Rpb25zIGFmdGVyIG9yIGR1cmluZyB0aGUgdXBzZXJ0ICh0cmlnZ2VyRXZlbnQpXHJcbiAgICovXHJcbiAgZGVsZXRlSXRlbUJ5SWRzKGl0ZW1JZHM6IG51bWJlcltdIHwgc3RyaW5nW10sIG9wdGlvbnM/OiBHcmlkU2VydmljZURlbGV0ZU9wdGlvbik6IG51bWJlcltdIHwgc3RyaW5nW10ge1xyXG4gICAgb3B0aW9ucyA9IHsgLi4uR3JpZFNlcnZpY2VEZWxldGVPcHRpb25EZWZhdWx0cywgLi4ub3B0aW9ucyB9O1xyXG5cclxuICAgIC8vIHdoZW4gaXQncyBub3QgYW4gYXJyYXksIHdlIGNhbiBjYWxsIGRpcmVjdGx5IHRoZSBzaW5nbGUgaXRlbSBkZWxldGVcclxuICAgIGlmIChBcnJheS5pc0FycmF5KGl0ZW1JZHMpKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbUlkcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChpdGVtSWRzW2ldICE9PSBudWxsKSB7XHJcbiAgICAgICAgICB0aGlzLmRlbGV0ZUl0ZW1CeUlkKGl0ZW1JZHNbaV0sIHsgdHJpZ2dlckV2ZW50OiBmYWxzZSB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIGRvIHdlIHdhbnQgdG8gdHJpZ2dlciBhbiBldmVudCBhZnRlciBkZWxldGluZyB0aGUgaXRlbVxyXG4gICAgICBpZiAob3B0aW9ucy50cmlnZ2VyRXZlbnQpIHtcclxuICAgICAgICB0aGlzLm9uSXRlbURlbGV0ZWQubmV4dChpdGVtSWRzKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gaXRlbUlkcztcclxuICAgIH1cclxuICAgIHJldHVybiBbXTtcclxuICB9XHJcblxyXG4gIC8qKiBAZGVwcmVjYXRlZCBwbGVhc2UgdXNlIFwidXBkYXRlSXRlbVwiIG1ldGhvZCBpbnN0ZWFkICovXHJcbiAgdXBkYXRlRGF0YUdyaWRJdGVtKGl0ZW06IGFueSwgc2hvdWxkSGlnaGxpZ2h0Um93ID0gdHJ1ZSwgc2hvdWxkVHJpZ2dlckV2ZW50ID0gdHJ1ZSwgc2hvdWxkU2VsZWN0Um93ID0gdHJ1ZSk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy51cGRhdGVJdGVtKGl0ZW0sIHsgaGlnaGxpZ2h0Um93OiBzaG91bGRIaWdobGlnaHRSb3csIHRyaWdnZXJFdmVudDogc2hvdWxkVHJpZ2dlckV2ZW50LCBzZWxlY3RSb3c6IHNob3VsZFNlbGVjdFJvdyB9KTtcclxuICB9XHJcblxyXG4gIC8qKiBAZGVwcmVjYXRlZCBwbGVhc2UgdXNlIFwidXBkYXRlSXRlbXNcIiBtZXRob2QgaW5zdGVhZCAqL1xyXG4gIHVwZGF0ZURhdGFHcmlkSXRlbXMoaXRlbXM6IGFueSB8IGFueVtdLCBzaG91bGRIaWdobGlnaHRSb3cgPSB0cnVlLCBzaG91bGRUcmlnZ2VyRXZlbnQgPSB0cnVlLCBzaG91bGRTZWxlY3RSb3cgPSB0cnVlKTogbnVtYmVyW10ge1xyXG4gICAgcmV0dXJuIHRoaXMudXBkYXRlSXRlbXMoaXRlbXMsIHsgaGlnaGxpZ2h0Um93OiBzaG91bGRIaWdobGlnaHRSb3csIHRyaWdnZXJFdmVudDogc2hvdWxkVHJpZ2dlckV2ZW50LCBzZWxlY3RSb3c6IHNob3VsZFNlbGVjdFJvdyB9KTtcclxuICB9XHJcblxyXG4gIC8qKiBAZGVwcmVjYXRlZCBwbGVhc2UgdXNlIFwidXBkYXRlSXRlbUJ5SWRcIiBtZXRob2QgaW5zdGVhZCAqL1xyXG4gIHVwZGF0ZURhdGFHcmlkSXRlbUJ5SWQoaXRlbUlkOiBudW1iZXIgfCBzdHJpbmcsIGl0ZW06IGFueSwgc2hvdWxkSGlnaGxpZ2h0Um93ID0gdHJ1ZSwgc2hvdWxkVHJpZ2dlckV2ZW50ID0gdHJ1ZSwgc2hvdWxkU2VsZWN0Um93ID0gdHJ1ZSk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy51cGRhdGVJdGVtQnlJZChpdGVtSWQsIGl0ZW0sIHsgaGlnaGxpZ2h0Um93OiBzaG91bGRIaWdobGlnaHRSb3csIHRyaWdnZXJFdmVudDogc2hvdWxkVHJpZ2dlckV2ZW50LCBzZWxlY3RSb3c6IHNob3VsZFNlbGVjdFJvdyB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwZGF0ZSBhbiBleGlzdGluZyBpdGVtIHdpdGggbmV3IHByb3BlcnRpZXMgaW5zaWRlIHRoZSBkYXRhZ3JpZFxyXG4gICAqIEBwYXJhbSBpdGVtIG9iamVjdCB3aGljaCBtdXN0IGNvbnRhaW4gYSB1bmlxdWUgXCJpZFwiIHByb3BlcnR5IGFuZCBhbnkgb3RoZXIgc3VpdGFibGUgcHJvcGVydGllc1xyXG4gICAqIEBwYXJhbSBvcHRpb25zOiBwcm92aWRlIHRoZSBwb3NzaWJpbGl0eSB0byBkbyBjZXJ0YWluIGFjdGlvbnMgYWZ0ZXIgb3IgZHVyaW5nIHRoZSB1cHNlcnQgKGhpZ2hsaWdodFJvdywgc2VsZWN0Um93LCB0cmlnZ2VyRXZlbnQpXHJcbiAgICogQHJldHVybiBncmlkIHJvdyBpbmRleFxyXG4gICAqL1xyXG4gIHVwZGF0ZUl0ZW0oaXRlbTogYW55LCBvcHRpb25zPzogR3JpZFNlcnZpY2VVcGRhdGVPcHRpb24pOiBudW1iZXIge1xyXG4gICAgb3B0aW9ucyA9IHsgLi4uR3JpZFNlcnZpY2VVcGRhdGVPcHRpb25EZWZhdWx0cywgLi4ub3B0aW9ucyB9O1xyXG4gICAgY29uc3QgaXRlbUlkID0gKCFpdGVtIHx8ICFpdGVtLmhhc093blByb3BlcnR5KCdpZCcpKSA/IHVuZGVmaW5lZCA6IGl0ZW0uaWQ7XHJcblxyXG4gICAgaWYgKGl0ZW1JZCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQ2FsbGluZyBVcGRhdGUgb2YgYW4gaXRlbSByZXF1aXJlcyB0aGUgaXRlbSB0byBpbmNsdWRlIGFuIFwiaWRcIiBwcm9wZXJ0eWApO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLnVwZGF0ZUl0ZW1CeUlkKGl0ZW1JZCwgaXRlbSwgb3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVcGRhdGUgYW4gYXJyYXkgb2YgZXhpc3RpbmcgaXRlbXMgd2l0aCBuZXcgcHJvcGVydGllcyBpbnNpZGUgdGhlIGRhdGFncmlkXHJcbiAgICogQHBhcmFtIGl0ZW0gb2JqZWN0IGFycmF5cywgd2hpY2ggbXVzdCBjb250YWluIHVuaXF1ZSBcImlkXCIgcHJvcGVydHkgYW5kIGFueSBvdGhlciBzdWl0YWJsZSBwcm9wZXJ0aWVzXHJcbiAgICogQHBhcmFtIG9wdGlvbnM6IHByb3ZpZGUgdGhlIHBvc3NpYmlsaXR5IHRvIGRvIGNlcnRhaW4gYWN0aW9ucyBhZnRlciBvciBkdXJpbmcgdGhlIHVwc2VydCAoaGlnaGxpZ2h0Um93LCBzZWxlY3RSb3csIHRyaWdnZXJFdmVudClcclxuICAgKiBAcmV0dXJuIGdyaWQgcm93IGluZGV4ZXNcclxuICAgKi9cclxuICB1cGRhdGVJdGVtcyhpdGVtczogYW55IHwgYW55W10sIG9wdGlvbnM/OiBHcmlkU2VydmljZVVwZGF0ZU9wdGlvbik6IG51bWJlcltdIHtcclxuICAgIG9wdGlvbnMgPSB7IC4uLkdyaWRTZXJ2aWNlVXBkYXRlT3B0aW9uRGVmYXVsdHMsIC4uLm9wdGlvbnMgfTtcclxuXHJcbiAgICAvLyB3aGVuIGl0J3Mgbm90IGFuIGFycmF5LCB3ZSBjYW4gY2FsbCBkaXJlY3RseSB0aGUgc2luZ2xlIGl0ZW0gdXBkYXRlXHJcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoaXRlbXMpKSB7XHJcbiAgICAgIHJldHVybiBbdGhpcy51cGRhdGVJdGVtKGl0ZW1zLCBvcHRpb25zKV07XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZ3JpZFJvd051bWJlcnM6IG51bWJlcltdID0gW107XHJcbiAgICBpdGVtcy5mb3JFYWNoKChpdGVtOiBhbnkpID0+IHtcclxuICAgICAgZ3JpZFJvd051bWJlcnMucHVzaCh0aGlzLnVwZGF0ZUl0ZW0oaXRlbSwgeyBoaWdobGlnaHRSb3c6IGZhbHNlLCBzZWxlY3RSb3c6IGZhbHNlLCB0cmlnZ2VyRXZlbnQ6IGZhbHNlIH0pKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIG9ubHkgaGlnaGxpZ2h0IGF0IHRoZSBlbmQsIGFsbCBhdCBvbmNlXHJcbiAgICAvLyB3ZSBoYXZlIHRvIGRvIHRoaXMgYmVjYXVzZSBkb2luZyBoaWdobGlnaHQgMSBieSAxIHdvdWxkIG9ubHkgcmUtc2VsZWN0IHRoZSBsYXN0IGhpZ2hsaWdodGVkIHJvdyB3aGljaCBpcyB3cm9uZyBiZWhhdmlvclxyXG4gICAgaWYgKG9wdGlvbnMuaGlnaGxpZ2h0Um93KSB7XHJcbiAgICAgIHRoaXMuaGlnaGxpZ2h0Um93KGdyaWRSb3dOdW1iZXJzKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBzZWxlY3QgdGhlIHJvdyBpbiB0aGUgZ3JpZFxyXG4gICAgaWYgKG9wdGlvbnMuc2VsZWN0Um93ICYmIHRoaXMuX2dyaWRPcHRpb25zICYmICh0aGlzLl9ncmlkT3B0aW9ucy5lbmFibGVDaGVja2JveFNlbGVjdG9yIHx8IHRoaXMuX2dyaWRPcHRpb25zLmVuYWJsZVJvd1NlbGVjdGlvbikpIHtcclxuICAgICAgdGhpcy5fZ3JpZC5zZXRTZWxlY3RlZFJvd3MoZ3JpZFJvd051bWJlcnMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGRvIHdlIHdhbnQgdG8gdHJpZ2dlciBhbiBldmVudCBhZnRlciB1cGRhdGluZyB0aGUgaXRlbVxyXG4gICAgaWYgKG9wdGlvbnMudHJpZ2dlckV2ZW50KSB7XHJcbiAgICAgIHRoaXMub25JdGVtVXBkYXRlZC5uZXh0KGl0ZW1zKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZ3JpZFJvd051bWJlcnM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVcGRhdGUgYW4gZXhpc3RpbmcgaXRlbSBpbiB0aGUgZGF0YWdyaWQgYnkgaXQncyBpZCBhbmQgbmV3IHByb3BlcnRpZXNcclxuICAgKiBAcGFyYW0gaXRlbUlkOiBpdGVtIHVuaXF1ZSBpZFxyXG4gICAqIEBwYXJhbSBpdGVtIG9iamVjdCB3aGljaCBtdXN0IGNvbnRhaW4gYSB1bmlxdWUgXCJpZFwiIHByb3BlcnR5IGFuZCBhbnkgb3RoZXIgc3VpdGFibGUgcHJvcGVydGllc1xyXG4gICAqIEBwYXJhbSBvcHRpb25zOiBwcm92aWRlIHRoZSBwb3NzaWJpbGl0eSB0byBkbyBjZXJ0YWluIGFjdGlvbnMgYWZ0ZXIgb3IgZHVyaW5nIHRoZSB1cHNlcnQgKGhpZ2hsaWdodFJvdywgc2VsZWN0Um93LCB0cmlnZ2VyRXZlbnQpXHJcbiAgICogQHJldHVybiBncmlkIHJvdyBudW1iZXJcclxuICAgKi9cclxuICB1cGRhdGVJdGVtQnlJZChpdGVtSWQ6IG51bWJlciB8IHN0cmluZywgaXRlbTogYW55LCBvcHRpb25zPzogR3JpZFNlcnZpY2VVcGRhdGVPcHRpb24pOiBudW1iZXIge1xyXG4gICAgb3B0aW9ucyA9IHsgLi4uR3JpZFNlcnZpY2VVcGRhdGVPcHRpb25EZWZhdWx0cywgLi4ub3B0aW9ucyB9O1xyXG4gICAgaWYgKGl0ZW1JZCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQ2Fubm90IHVwZGF0ZSBhIHJvdyB3aXRob3V0IGEgdmFsaWQgXCJpZFwiYCk7XHJcbiAgICB9XHJcbiAgICBjb25zdCByb3dOdW1iZXIgPSB0aGlzLl9kYXRhVmlldy5nZXRSb3dCeUlkKGl0ZW1JZCk7XHJcblxyXG4gICAgaWYgKCFpdGVtIHx8IHJvd051bWJlciA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVGhlIGl0ZW0gdG8gdXBkYXRlIGluIHRoZSBncmlkIHdhcyBub3QgZm91bmQgd2l0aCBpZDogJHtpdGVtSWR9YCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuX2RhdGFWaWV3LmdldElkeEJ5SWQoaXRlbUlkKSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIC8vIFVwZGF0ZSB0aGUgaXRlbSBpdHNlbGYgaW5zaWRlIHRoZSBkYXRhVmlld1xyXG4gICAgICB0aGlzLl9kYXRhVmlldy51cGRhdGVJdGVtKGl0ZW1JZCwgaXRlbSk7XHJcbiAgICAgIHRoaXMuX2dyaWQudXBkYXRlUm93KHJvd051bWJlcik7XHJcblxyXG4gICAgICAvLyBoaWdobGlnaHQgdGhlIHJvdyB3ZSBqdXN0IHVwZGF0ZWQsIGlmIGRlZmluZWRcclxuICAgICAgaWYgKG9wdGlvbnMuaGlnaGxpZ2h0Um93KSB7XHJcbiAgICAgICAgdGhpcy5oaWdobGlnaHRSb3cocm93TnVtYmVyKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gc2VsZWN0IHRoZSByb3cgaW4gdGhlIGdyaWRcclxuICAgICAgaWYgKG9wdGlvbnMuc2VsZWN0Um93ICYmIHRoaXMuX2dyaWRPcHRpb25zICYmICh0aGlzLl9ncmlkT3B0aW9ucy5lbmFibGVDaGVja2JveFNlbGVjdG9yIHx8IHRoaXMuX2dyaWRPcHRpb25zLmVuYWJsZVJvd1NlbGVjdGlvbikpIHtcclxuICAgICAgICB0aGlzLl9ncmlkLnNldFNlbGVjdGVkUm93cyhyb3dOdW1iZXIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBkbyB3ZSB3YW50IHRvIHRyaWdnZXIgYW4gZXZlbnQgYWZ0ZXIgdXBkYXRpbmcgdGhlIGl0ZW1cclxuICAgICAgaWYgKG9wdGlvbnMudHJpZ2dlckV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5vbkl0ZW1VcGRhdGVkLm5leHQoaXRlbSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiByb3dOdW1iZXI7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbnNlcnQgYSByb3cgaW50byB0aGUgZ3JpZCBpZiBpdCBkb2Vzbid0IGFscmVhZHkgZXhpc3Qgb3IgdXBkYXRlIGlmIGl0IGRvZXMuXHJcbiAgICogQHBhcmFtIGl0ZW0gb2JqZWN0IHdoaWNoIG11c3QgY29udGFpbiBhIHVuaXF1ZSBcImlkXCIgcHJvcGVydHkgYW5kIGFueSBvdGhlciBzdWl0YWJsZSBwcm9wZXJ0aWVzXHJcbiAgICogQHBhcmFtIG9wdGlvbnM6IHByb3ZpZGUgdGhlIHBvc3NpYmlsaXR5IHRvIGRvIGNlcnRhaW4gYWN0aW9ucyBhZnRlciBvciBkdXJpbmcgdGhlIHVwc2VydCAoaGlnaGxpZ2h0Um93LCByZXNvcnRHcmlkLCBzZWxlY3RSb3csIHRyaWdnZXJFdmVudClcclxuICAgKi9cclxuICB1cHNlcnRJdGVtKGl0ZW06IGFueSwgb3B0aW9ucz86IEdyaWRTZXJ2aWNlSW5zZXJ0T3B0aW9uKTogbnVtYmVyIHtcclxuICAgIG9wdGlvbnMgPSB7IC4uLkdyaWRTZXJ2aWNlSW5zZXJ0T3B0aW9uRGVmYXVsdHMsIC4uLm9wdGlvbnMgfTtcclxuICAgIGNvbnN0IGl0ZW1JZCA9ICghaXRlbSB8fCAhaXRlbS5oYXNPd25Qcm9wZXJ0eSgnaWQnKSkgPyB1bmRlZmluZWQgOiBpdGVtLmlkO1xyXG5cclxuICAgIGlmIChpdGVtSWQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYENhbGxpbmcgVXBzZXJ0IG9mIGFuIGl0ZW0gcmVxdWlyZXMgdGhlIGl0ZW0gdG8gaW5jbHVkZSBhbiBcImlkXCIgcHJvcGVydHlgKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy51cHNlcnRJdGVtQnlJZChpdGVtSWQsIGl0ZW0sIG9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXBkYXRlIGFuIGFycmF5IG9mIGV4aXN0aW5nIGl0ZW1zIHdpdGggbmV3IHByb3BlcnRpZXMgaW5zaWRlIHRoZSBkYXRhZ3JpZFxyXG4gICAqIEBwYXJhbSBpdGVtIG9iamVjdCBhcnJheXMsIHdoaWNoIG11c3QgY29udGFpbiB1bmlxdWUgXCJpZFwiIHByb3BlcnR5IGFuZCBhbnkgb3RoZXIgc3VpdGFibGUgcHJvcGVydGllc1xyXG4gICAqIEBwYXJhbSBvcHRpb25zOiBwcm92aWRlIHRoZSBwb3NzaWJpbGl0eSB0byBkbyBjZXJ0YWluIGFjdGlvbnMgYWZ0ZXIgb3IgZHVyaW5nIHRoZSB1cHNlcnQgKGhpZ2hsaWdodFJvdywgcmVzb3J0R3JpZCwgc2VsZWN0Um93LCB0cmlnZ2VyRXZlbnQpXHJcbiAgICogQHJldHVybiByb3cgbnVtYmVycyBpbiB0aGUgZ3JpZFxyXG4gICAqL1xyXG4gIHVwc2VydEl0ZW1zKGl0ZW1zOiBhbnkgfCBhbnlbXSwgb3B0aW9ucz86IEdyaWRTZXJ2aWNlSW5zZXJ0T3B0aW9uKTogbnVtYmVyW10ge1xyXG4gICAgb3B0aW9ucyA9IHsgLi4uR3JpZFNlcnZpY2VJbnNlcnRPcHRpb25EZWZhdWx0cywgLi4ub3B0aW9ucyB9O1xyXG4gICAgLy8gd2hlbiBpdCdzIG5vdCBhbiBhcnJheSwgd2UgY2FuIGNhbGwgZGlyZWN0bHkgdGhlIHNpbmdsZSBpdGVtIHVwZGF0ZVxyXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGl0ZW1zKSkge1xyXG4gICAgICByZXR1cm4gW3RoaXMudXBzZXJ0SXRlbShpdGVtcywgb3B0aW9ucyldO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGdyaWRSb3dOdW1iZXJzOiBudW1iZXJbXSA9IFtdO1xyXG4gICAgaXRlbXMuZm9yRWFjaCgoaXRlbTogYW55KSA9PiB7XHJcbiAgICAgIGdyaWRSb3dOdW1iZXJzLnB1c2godGhpcy51cHNlcnRJdGVtKGl0ZW0sIHsgaGlnaGxpZ2h0Um93OiBmYWxzZSwgcmVzb3J0R3JpZDogZmFsc2UsIHNlbGVjdFJvdzogZmFsc2UsIHRyaWdnZXJFdmVudDogZmFsc2UgfSkpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gb25seSBoaWdobGlnaHQgYXQgdGhlIGVuZCwgYWxsIGF0IG9uY2VcclxuICAgIC8vIHdlIGhhdmUgdG8gZG8gdGhpcyBiZWNhdXNlIGRvaW5nIGhpZ2hsaWdodCAxIGJ5IDEgd291bGQgb25seSByZS1zZWxlY3QgdGhlIGxhc3QgaGlnaGxpZ2h0ZWQgcm93IHdoaWNoIGlzIHdyb25nIGJlaGF2aW9yXHJcbiAgICBpZiAob3B0aW9ucy5oaWdobGlnaHRSb3cpIHtcclxuICAgICAgdGhpcy5oaWdobGlnaHRSb3coZ3JpZFJvd051bWJlcnMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHNlbGVjdCB0aGUgcm93IGluIHRoZSBncmlkXHJcbiAgICBpZiAob3B0aW9ucy5zZWxlY3RSb3cgJiYgdGhpcy5fZ3JpZE9wdGlvbnMgJiYgKHRoaXMuX2dyaWRPcHRpb25zLmVuYWJsZUNoZWNrYm94U2VsZWN0b3IgfHwgdGhpcy5fZ3JpZE9wdGlvbnMuZW5hYmxlUm93U2VsZWN0aW9uKSkge1xyXG4gICAgICB0aGlzLl9ncmlkLnNldFNlbGVjdGVkUm93cyhncmlkUm93TnVtYmVycyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZG8gd2Ugd2FudCB0byB0cmlnZ2VyIGFuIGV2ZW50IGFmdGVyIHVwZGF0aW5nIHRoZSBpdGVtXHJcbiAgICBpZiAob3B0aW9ucy50cmlnZ2VyRXZlbnQpIHtcclxuICAgICAgdGhpcy5vbkl0ZW1VcHNlcnRlZC5uZXh0KGl0ZW1zKTtcclxuICAgIH1cclxuICAgIHJldHVybiBncmlkUm93TnVtYmVycztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwZGF0ZSBhbiBleGlzdGluZyBpdGVtIGluIHRoZSBkYXRhZ3JpZCBieSBpdCdzIGlkIGFuZCBuZXcgcHJvcGVydGllc1xyXG4gICAqIEBwYXJhbSBpdGVtSWQ6IGl0ZW0gdW5pcXVlIGlkXHJcbiAgICogQHBhcmFtIGl0ZW0gb2JqZWN0IHdoaWNoIG11c3QgY29udGFpbiBhIHVuaXF1ZSBcImlkXCIgcHJvcGVydHkgYW5kIGFueSBvdGhlciBzdWl0YWJsZSBwcm9wZXJ0aWVzXHJcbiAgICogQHBhcmFtIG9wdGlvbnM6IHByb3ZpZGUgdGhlIHBvc3NpYmlsaXR5IHRvIGRvIGNlcnRhaW4gYWN0aW9ucyBhZnRlciBvciBkdXJpbmcgdGhlIHVwc2VydCAoaGlnaGxpZ2h0Um93LCByZXNvcnRHcmlkLCBzZWxlY3RSb3csIHRyaWdnZXJFdmVudClcclxuICAgKiBAcmV0dXJuIGdyaWQgcm93IG51bWJlciBpbiB0aGUgZ3JpZFxyXG4gICAqL1xyXG4gIHVwc2VydEl0ZW1CeUlkKGl0ZW1JZDogbnVtYmVyIHwgc3RyaW5nLCBpdGVtOiBhbnksIG9wdGlvbnM/OiBHcmlkU2VydmljZUluc2VydE9wdGlvbik6IG51bWJlciB7XHJcbiAgICBvcHRpb25zID0geyAuLi5HcmlkU2VydmljZUluc2VydE9wdGlvbkRlZmF1bHRzLCAuLi5vcHRpb25zIH07XHJcbiAgICBpZiAoaXRlbUlkID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYWxsaW5nIFVwc2VydCBvZiBhbiBpdGVtIHJlcXVpcmVzIHRoZSBpdGVtIHRvIGluY2x1ZGUgYSB2YWxpZCBhbmQgdW5pcXVlIFwiaWRcIiBwcm9wZXJ0eWApO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCByb3dOdW1iZXI6IG51bWJlcjtcclxuICAgIGlmICh0aGlzLl9kYXRhVmlldy5nZXRSb3dCeUlkKGl0ZW1JZCkgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICByb3dOdW1iZXIgPSB0aGlzLmFkZEl0ZW0oaXRlbSwgb3B0aW9ucyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByb3dOdW1iZXIgPSB0aGlzLnVwZGF0ZUl0ZW0oaXRlbSwgeyBoaWdobGlnaHRSb3c6IG9wdGlvbnMuaGlnaGxpZ2h0Um93LCBzZWxlY3RSb3c6IG9wdGlvbnMuc2VsZWN0Um93LCB0cmlnZ2VyRXZlbnQ6IG9wdGlvbnMudHJpZ2dlckV2ZW50IH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGRvIHdlIHdhbnQgdG8gdHJpZ2dlciBhbiBldmVudCBhZnRlciB1cGRhdGluZyB0aGUgaXRlbVxyXG4gICAgaWYgKG9wdGlvbnMudHJpZ2dlckV2ZW50KSB7XHJcbiAgICAgIHRoaXMub25JdGVtVXBzZXJ0ZWQubmV4dChpdGVtKTtcclxuICAgIH1cclxuICAgIHJldHVybiByb3dOdW1iZXI7XHJcbiAgfVxyXG59XHJcbiJdfQ==