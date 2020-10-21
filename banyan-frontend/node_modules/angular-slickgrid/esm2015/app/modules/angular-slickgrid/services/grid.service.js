import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { ExtensionService } from './extension.service';
import { FilterService } from './filter.service';
import { GridStateService } from './gridState.service';
import { SortService } from './sort.service';
import { Subject } from 'rxjs';
let highlightTimerEnd;
const GridServiceDeleteOptionDefaults = { triggerEvent: true };
const GridServiceInsertOptionDefaults = { highlightRow: true, resortGrid: false, selectRow: false, triggerEvent: true };
const GridServiceUpdateOptionDefaults = { highlightRow: true, selectRow: false, triggerEvent: true };
let GridService = class GridService {
    constructor(extensionService, filterService, gridStateService, sortService) {
        this.extensionService = extensionService;
        this.filterService = filterService;
        this.gridStateService = gridStateService;
        this.sortService = sortService;
        this.onItemAdded = new Subject();
        this.onItemDeleted = new Subject();
        this.onItemUpdated = new Subject();
        this.onItemUpserted = new Subject();
    }
    /** Getter for the Grid Options pulled through the Grid Object */
    get _gridOptions() {
        return (this._grid && this._grid.getOptions) ? this._grid.getOptions() : {};
    }
    init(grid, dataView) {
        this._grid = grid;
        this._dataView = dataView;
    }
    /** Clear all Filters & Sorts */
    clearAllFiltersAndSorts() {
        // call both clear Filters & Sort but only trigger the last one to avoid sending multiple backend queries
        if (this.sortService && this.sortService.clearSorting) {
            this.sortService.clearSorting(false); // skip event trigger on this one
        }
        if (this.filterService && this.filterService.clearFilters) {
            this.filterService.clearFilters();
        }
    }
    /**
     * From a SlickGrid Event triggered get the Column Definition and Item Data Context
     *
     * For example the SlickGrid onClick will return cell arguments when subscribing to it.
     * From these cellArgs, we want to get the Column Definition and Item Data
     * @param cell event args
     * @return object with columnDef and dataContext
     */
    getColumnFromEventArguments(args) {
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
    }
    /** Get data item by it's row index number */
    getDataItemByRowNumber(rowNumber) {
        if (!this._grid || typeof this._grid.getDataItem !== 'function') {
            throw new Error(`We could not find SlickGrid Grid object or it's "getDataItem" method`);
        }
        return this._grid.getDataItem(rowNumber);
    }
    /** Chain the item Metadata with our implementation of Metadata at given row index */
    getItemRowMetadataToHighlight(previousItemMetadata) {
        return (rowNumber) => {
            const item = this._dataView.getItem(rowNumber);
            let meta = { cssClasses: '' };
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
                meta.cssClasses += ` ${item.rowClass}`;
                meta.cssClasses += ` row${rowNumber}`;
            }
            return meta;
        };
    }
    /**
     * Highlight then fade a row for x seconds.
     * The implementation follows this SO answer: https://stackoverflow.com/a/19985148/1212166
     * @param rowNumber
     * @param fadeDelay
     */
    highlightRow(rowNumber, fadeDelay = 1500, fadeOutDelay = 300) {
        // create a SelectionModel if there's not one yet
        if (!this._grid.getSelectionModel()) {
            const rowSelectionPlugin = new Slick.RowSelectionModel(this._gridOptions.rowSelectionOptions || {});
            this._grid.setSelectionModel(rowSelectionPlugin);
        }
        if (Array.isArray(rowNumber)) {
            rowNumber.forEach(row => this.highlightRowByMetadata(row, fadeDelay, fadeOutDelay));
        }
        else {
            this.highlightRowByMetadata(rowNumber, fadeDelay, fadeOutDelay);
        }
    }
    highlightRowByMetadata(rowNumber, fadeDelay = 1500, fadeOutDelay = 300) {
        this._dataView.getItemMetadata = this.getItemRowMetadataToHighlight(this._dataView.getItemMetadata);
        const item = this._dataView.getItem(rowNumber);
        if (item && item.id) {
            item.rowClass = 'highlight';
            this._dataView.updateItem(item.id, item);
            this.renderGrid();
            // fade out
            clearTimeout(highlightTimerEnd);
            highlightTimerEnd = setTimeout(() => {
                item.rowClass = 'highlight-end';
                this._dataView.updateItem(item.id, item);
                this.renderGrid();
            }, fadeOutDelay);
            // delete the row's CSS highlight classes once the delay is passed
            setTimeout(() => {
                if (item && item.id) {
                    delete item.rowClass;
                    if (this._dataView.getIdxById(item.id) !== undefined) {
                        this._dataView.updateItem(item.id, item);
                        this.renderGrid();
                    }
                }
            }, fadeDelay + fadeOutDelay);
        }
    }
    /** Get the Data Item from a grid row index */
    getDataItemByRowIndex(index) {
        if (!this._grid || typeof this._grid.getDataItem !== 'function') {
            throw new Error('We could not find SlickGrid Grid object and/or "getDataItem" method');
        }
        return this._grid.getDataItem(index);
    }
    /** Get the Data Item from an array of grid row indexes */
    getDataItemByRowIndexes(indexes) {
        if (!this._grid || typeof this._grid.getDataItem !== 'function') {
            throw new Error('We could not find SlickGrid Grid object and/or "getDataItem" method');
        }
        const dataItems = [];
        if (Array.isArray(indexes)) {
            indexes.forEach((idx) => {
                dataItems.push(this._grid.getDataItem(idx));
            });
        }
        return dataItems;
    }
    /** Get the currently selected row indexes */
    getSelectedRows() {
        if (!this._grid || typeof this._grid.getSelectedRows !== 'function') {
            throw new Error('We could not find SlickGrid Grid object and/or "getSelectedRows" method');
        }
        return this._grid.getSelectedRows();
    }
    /** Get the currently selected rows item data */
    getSelectedRowsDataItem() {
        if (!this._grid || typeof this._grid.getSelectedRows !== 'function') {
            throw new Error('We could not find SlickGrid Grid object and/or "getSelectedRows" method');
        }
        const selectedRowIndexes = this._grid.getSelectedRows();
        return this.getDataItemByRowIndexes(selectedRowIndexes);
    }
    /** Select the selected row by a row index */
    setSelectedRow(rowIndex) {
        if (this._grid && this._grid.setSelectedRows) {
            this._grid.setSelectedRows([rowIndex]);
        }
    }
    /** Set selected rows with provided array of row indexes */
    setSelectedRows(rowIndexes) {
        if (this._grid && this._grid.setSelectedRows) {
            this._grid.setSelectedRows(rowIndexes);
        }
    }
    /** Re-Render the Grid */
    renderGrid() {
        if (this._grid && typeof this._grid.invalidate === 'function') {
            this._grid.invalidate();
            this._grid.render();
        }
    }
    /**
     * Reset the grid to it's original state (clear any filters, sorting & pagination if exists) .
     * The column definitions could be passed as argument to reset (this can be used after a Grid State reset)
     * The reset will clear the Filters & Sort, then will reset the Columns to their original state
     */
    resetGrid(columnDefinitions) {
        // reset columns to original states & refresh the grid
        if (this._grid && this._dataView) {
            const originalColumns = this.extensionService.getAllColumns();
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
    }
    /** @deprecated please use "addItem" method instead */
    addItemToDatagrid(item, shouldHighlightRow = true, shouldResortGrid = false, shouldTriggerEvent = true, shouldSelectRow = true) {
        return this.addItem(item, { highlightRow: shouldHighlightRow, resortGrid: shouldResortGrid, triggerEvent: shouldTriggerEvent, selectRow: shouldSelectRow });
    }
    /** @deprecated please use "addItems" method instead */
    addItemsToDatagrid(items, shouldHighlightRow = true, shouldResortGrid = false, shouldTriggerEvent = true, shouldSelectRow = true) {
        return this.addItems(items, { highlightRow: shouldHighlightRow, resortGrid: shouldResortGrid, triggerEvent: shouldTriggerEvent, selectRow: shouldSelectRow });
    }
    /**
     * Add an item (data item) to the datagrid, by default it will highlight (flashing) the inserted row but we can disable it too
     * @param item object which must contain a unique "id" property and any other suitable properties
     * @param options: provide the possibility to do certain actions after or during the upsert (highlightRow, resortGrid, selectRow, triggerEvent)
     * @return rowIndex: typically index 0
     */
    addItem(item, options) {
        options = Object.assign({}, GridServiceInsertOptionDefaults, options);
        if (!this._grid || !this._gridOptions || !this._dataView) {
            throw new Error('We could not find SlickGrid Grid, DataView objects');
        }
        if (!item || !item.hasOwnProperty('id')) {
            throw new Error(`Adding an item requires the item to include an "id" property`);
        }
        this._dataView.insertItem(0, item); // insert at index 0
        // row number in the grid, by default it will be on first row
        let rowNumber = 0;
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
    }
    /**
     * Add item array (data item) to the datagrid, by default it will highlight (flashing) the inserted row but we can disable it too
     * @param item object arrays, which must contain unique "id" property and any other suitable properties
     * @param options: provide the possibility to do certain actions after or during the upsert (highlightRow, resortGrid, selectRow, triggerEvent)
     */
    addItems(items, options) {
        options = Object.assign({}, GridServiceInsertOptionDefaults, options);
        const rowNumbers = [];
        // loop through all items to add
        if (!Array.isArray(items)) {
            return [this.addItem(items, options)];
        }
        else {
            items.forEach((item) => this.addItem(item, { highlightRow: false, resortGrid: false, selectRow: false, triggerEvent: false }));
        }
        // do we want the item to be sorted in the grid, when set to False it will insert on first row (defaults to false)
        if (options.resortGrid) {
            this._dataView.reSort();
            // if user wanted to see highlighted row
            // we need to do it here after resort and get each row number because it possibly changes after the sort
            if (options.highlightRow) {
                items.forEach((item) => {
                    const rowNumber = this._dataView.getRowById(item.id);
                    rowNumbers.push(rowNumber);
                });
            }
        }
        else if (options.highlightRow) {
            const ln = items.length;
            for (let i = 0; i < ln; i++) {
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
    }
    /** @deprecated please use "deleteItem" method instead */
    deleteDataGridItem(item, shouldTriggerEvent = true) {
        this.deleteItem(item, { triggerEvent: shouldTriggerEvent });
    }
    /** @deprecated please use "deleteItems" method instead */
    deleteDataGridItems(items, shouldTriggerEvent = true) {
        this.deleteItems(items, { triggerEvent: shouldTriggerEvent });
    }
    /** @deprecated please use "deleteItemById" method instead */
    deleteDataGridItemById(itemId, shouldTriggerEvent = true) {
        this.deleteItemById(itemId, { triggerEvent: shouldTriggerEvent });
    }
    /** @deprecated please use "deleteItemByIds" method instead */
    deleteDataGridItemByIds(itemIds, shouldTriggerEvent = true) {
        this.deleteItemByIds(itemIds, { triggerEvent: shouldTriggerEvent });
    }
    /**
     * Delete an existing item from the datagrid (dataView)
     * @param item object which must contain a unique "id" property and any other suitable properties
     * @param options: provide the possibility to do certain actions after or during the upsert (triggerEvent)
     * @return item id deleted
     */
    deleteItem(item, options) {
        options = Object.assign({}, GridServiceDeleteOptionDefaults, options);
        if (!item || !item.hasOwnProperty('id')) {
            throw new Error(`Deleting an item requires the item to include an "id" property`);
        }
        return this.deleteItemById(item.id, options);
    }
    /**
     * Delete an array of existing items from the datagrid
     * @param item object which must contain a unique "id" property and any other suitable properties
     * @param options: provide the possibility to do certain actions after or during the upsert (triggerEvent)
     * @return item id deleted
     */
    deleteItems(items, options) {
        options = Object.assign({}, GridServiceDeleteOptionDefaults, options);
        // when it's not an array, we can call directly the single item delete
        if (!Array.isArray(items)) {
            this.deleteItem(items, options);
            return [items.id];
        }
        const itemIds = [];
        items.forEach((item) => {
            if (item && item.id !== undefined) {
                itemIds.push(item.id);
            }
            this.deleteItem(item, { triggerEvent: false });
        });
        // do we want to trigger an event after deleting the item
        if (options.triggerEvent) {
            this.onItemDeleted.next(items);
        }
        return itemIds;
    }
    /**
     * Delete an existing item from the datagrid (dataView) by it's id
     * @param itemId: item unique id
     * @param options: provide the possibility to do certain actions after or during the upsert (triggerEvent)
     * @return item id deleted
     */
    deleteItemById(itemId, options) {
        options = Object.assign({}, GridServiceDeleteOptionDefaults, options);
        if (itemId === null || itemId === undefined) {
            throw new Error(`Cannot delete a row without a valid "id"`);
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
    }
    /**
     * Delete an array of existing items from the datagrid
     * @param itemIds array of item unique IDs
     * @param options: provide the possibility to do certain actions after or during the upsert (triggerEvent)
     */
    deleteItemByIds(itemIds, options) {
        options = Object.assign({}, GridServiceDeleteOptionDefaults, options);
        // when it's not an array, we can call directly the single item delete
        if (Array.isArray(itemIds)) {
            for (let i = 0; i < itemIds.length; i++) {
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
    }
    /** @deprecated please use "updateItem" method instead */
    updateDataGridItem(item, shouldHighlightRow = true, shouldTriggerEvent = true, shouldSelectRow = true) {
        return this.updateItem(item, { highlightRow: shouldHighlightRow, triggerEvent: shouldTriggerEvent, selectRow: shouldSelectRow });
    }
    /** @deprecated please use "updateItems" method instead */
    updateDataGridItems(items, shouldHighlightRow = true, shouldTriggerEvent = true, shouldSelectRow = true) {
        return this.updateItems(items, { highlightRow: shouldHighlightRow, triggerEvent: shouldTriggerEvent, selectRow: shouldSelectRow });
    }
    /** @deprecated please use "updateItemById" method instead */
    updateDataGridItemById(itemId, item, shouldHighlightRow = true, shouldTriggerEvent = true, shouldSelectRow = true) {
        return this.updateItemById(itemId, item, { highlightRow: shouldHighlightRow, triggerEvent: shouldTriggerEvent, selectRow: shouldSelectRow });
    }
    /**
     * Update an existing item with new properties inside the datagrid
     * @param item object which must contain a unique "id" property and any other suitable properties
     * @param options: provide the possibility to do certain actions after or during the upsert (highlightRow, selectRow, triggerEvent)
     * @return grid row index
     */
    updateItem(item, options) {
        options = Object.assign({}, GridServiceUpdateOptionDefaults, options);
        const itemId = (!item || !item.hasOwnProperty('id')) ? undefined : item.id;
        if (itemId === undefined) {
            throw new Error(`Calling Update of an item requires the item to include an "id" property`);
        }
        return this.updateItemById(itemId, item, options);
    }
    /**
     * Update an array of existing items with new properties inside the datagrid
     * @param item object arrays, which must contain unique "id" property and any other suitable properties
     * @param options: provide the possibility to do certain actions after or during the upsert (highlightRow, selectRow, triggerEvent)
     * @return grid row indexes
     */
    updateItems(items, options) {
        options = Object.assign({}, GridServiceUpdateOptionDefaults, options);
        // when it's not an array, we can call directly the single item update
        if (!Array.isArray(items)) {
            return [this.updateItem(items, options)];
        }
        const gridRowNumbers = [];
        items.forEach((item) => {
            gridRowNumbers.push(this.updateItem(item, { highlightRow: false, selectRow: false, triggerEvent: false }));
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
    }
    /**
     * Update an existing item in the datagrid by it's id and new properties
     * @param itemId: item unique id
     * @param item object which must contain a unique "id" property and any other suitable properties
     * @param options: provide the possibility to do certain actions after or during the upsert (highlightRow, selectRow, triggerEvent)
     * @return grid row number
     */
    updateItemById(itemId, item, options) {
        options = Object.assign({}, GridServiceUpdateOptionDefaults, options);
        if (itemId === undefined) {
            throw new Error(`Cannot update a row without a valid "id"`);
        }
        const rowNumber = this._dataView.getRowById(itemId);
        if (!item || rowNumber === undefined) {
            throw new Error(`The item to update in the grid was not found with id: ${itemId}`);
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
    }
    /**
     * Insert a row into the grid if it doesn't already exist or update if it does.
     * @param item object which must contain a unique "id" property and any other suitable properties
     * @param options: provide the possibility to do certain actions after or during the upsert (highlightRow, resortGrid, selectRow, triggerEvent)
     */
    upsertItem(item, options) {
        options = Object.assign({}, GridServiceInsertOptionDefaults, options);
        const itemId = (!item || !item.hasOwnProperty('id')) ? undefined : item.id;
        if (itemId === undefined) {
            throw new Error(`Calling Upsert of an item requires the item to include an "id" property`);
        }
        return this.upsertItemById(itemId, item, options);
    }
    /**
     * Update an array of existing items with new properties inside the datagrid
     * @param item object arrays, which must contain unique "id" property and any other suitable properties
     * @param options: provide the possibility to do certain actions after or during the upsert (highlightRow, resortGrid, selectRow, triggerEvent)
     * @return row numbers in the grid
     */
    upsertItems(items, options) {
        options = Object.assign({}, GridServiceInsertOptionDefaults, options);
        // when it's not an array, we can call directly the single item update
        if (!Array.isArray(items)) {
            return [this.upsertItem(items, options)];
        }
        const gridRowNumbers = [];
        items.forEach((item) => {
            gridRowNumbers.push(this.upsertItem(item, { highlightRow: false, resortGrid: false, selectRow: false, triggerEvent: false }));
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
    }
    /**
     * Update an existing item in the datagrid by it's id and new properties
     * @param itemId: item unique id
     * @param item object which must contain a unique "id" property and any other suitable properties
     * @param options: provide the possibility to do certain actions after or during the upsert (highlightRow, resortGrid, selectRow, triggerEvent)
     * @return grid row number in the grid
     */
    upsertItemById(itemId, item, options) {
        options = Object.assign({}, GridServiceInsertOptionDefaults, options);
        if (itemId === undefined) {
            throw new Error(`Calling Upsert of an item requires the item to include a valid and unique "id" property`);
        }
        let rowNumber;
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
    }
};
GridService = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [ExtensionService,
        FilterService,
        GridStateService,
        SortService])
], GridService);
export { GridService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9zZXJ2aWNlcy9ncmlkLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBSS9CLElBQUksaUJBQXNCLENBQUM7QUFDM0IsTUFBTSwrQkFBK0IsR0FBNEIsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUM7QUFDeEYsTUFBTSwrQkFBK0IsR0FBNEIsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUM7QUFDakosTUFBTSwrQkFBK0IsR0FBNEIsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxDQUFDO0FBRzlILElBQWEsV0FBVyxHQUF4QixNQUFhLFdBQVc7SUFRdEIsWUFDVSxnQkFBa0MsRUFDbEMsYUFBNEIsRUFDNUIsZ0JBQWtDLEVBQ2xDLFdBQXdCO1FBSHhCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxnQkFB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SUFBSSxTQUFpQixDQUFDO1FBQ3RCLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEtBQUssU0FBUyxFQUFFO1lBQ25ELFNBQVMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztTQUN6QzthQUFNO1lBQ0wsU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLEVBQUUsWUFBWSxFQUFFLE9BQU8sQ0FBQyxZQUFZLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBQyxTQUFTLEVBQUUsWUFBWSxFQUFFLE9BQU8sQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDO1NBQzdJO1FBRUQseURBQXlEO1FBQ3pELElBQUksT0FBTyxDQUFDLFlBQVksRUFBRTtZQUN4QixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNoQztRQUNELE9BQU8sU0FBUyxDQUFDO0lBQ25CLENBQUM7Q0FDRixDQUFBO0FBaHBCWSxXQUFXO0lBRHZCLFVBQVUsRUFBRTs2Q0FVaUIsZ0JBQWdCO1FBQ25CLGFBQWE7UUFDVixnQkFBZ0I7UUFDckIsV0FBVztHQVp2QixXQUFXLENBZ3BCdkI7U0FocEJZLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENlbGxBcmdzLCBDb2x1bW4sIEdyaWRPcHRpb24sIEdyaWRTZXJ2aWNlRGVsZXRlT3B0aW9uLCBHcmlkU2VydmljZUluc2VydE9wdGlvbiwgR3JpZFNlcnZpY2VVcGRhdGVPcHRpb24sIE9uRXZlbnRBcmdzIH0gZnJvbSAnLi8uLi9tb2RlbHMvaW5kZXgnO1xyXG5pbXBvcnQgeyBFeHRlbnNpb25TZXJ2aWNlIH0gZnJvbSAnLi9leHRlbnNpb24uc2VydmljZSc7XHJcbmltcG9ydCB7IEZpbHRlclNlcnZpY2UgfSBmcm9tICcuL2ZpbHRlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgR3JpZFN0YXRlU2VydmljZSB9IGZyb20gJy4vZ3JpZFN0YXRlLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTb3J0U2VydmljZSB9IGZyb20gJy4vc29ydC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5cclxuLy8gdXNpbmcgZXh0ZXJuYWwgbm9uLXR5cGVkIGpzIGxpYnJhcmllc1xyXG5kZWNsYXJlIHZhciBTbGljazogYW55O1xyXG5sZXQgaGlnaGxpZ2h0VGltZXJFbmQ6IGFueTtcclxuY29uc3QgR3JpZFNlcnZpY2VEZWxldGVPcHRpb25EZWZhdWx0czogR3JpZFNlcnZpY2VEZWxldGVPcHRpb24gPSB7IHRyaWdnZXJFdmVudDogdHJ1ZSB9O1xyXG5jb25zdCBHcmlkU2VydmljZUluc2VydE9wdGlvbkRlZmF1bHRzOiBHcmlkU2VydmljZUluc2VydE9wdGlvbiA9IHsgaGlnaGxpZ2h0Um93OiB0cnVlLCByZXNvcnRHcmlkOiBmYWxzZSwgc2VsZWN0Um93OiBmYWxzZSwgdHJpZ2dlckV2ZW50OiB0cnVlIH07XHJcbmNvbnN0IEdyaWRTZXJ2aWNlVXBkYXRlT3B0aW9uRGVmYXVsdHM6IEdyaWRTZXJ2aWNlVXBkYXRlT3B0aW9uID0geyBoaWdobGlnaHRSb3c6IHRydWUsIHNlbGVjdFJvdzogZmFsc2UsIHRyaWdnZXJFdmVudDogdHJ1ZSB9O1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgR3JpZFNlcnZpY2Uge1xyXG4gIHByaXZhdGUgX2dyaWQ6IGFueTtcclxuICBwcml2YXRlIF9kYXRhVmlldzogYW55O1xyXG4gIG9uSXRlbUFkZGVkID0gbmV3IFN1YmplY3Q8YW55IHwgYW55W10+KCk7XHJcbiAgb25JdGVtRGVsZXRlZCA9IG5ldyBTdWJqZWN0PGFueSB8IGFueVtdPigpO1xyXG4gIG9uSXRlbVVwZGF0ZWQgPSBuZXcgU3ViamVjdDxhbnkgfCBhbnlbXT4oKTtcclxuICBvbkl0ZW1VcHNlcnRlZCA9IG5ldyBTdWJqZWN0PGFueSB8IGFueVtdPigpO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgZXh0ZW5zaW9uU2VydmljZTogRXh0ZW5zaW9uU2VydmljZSxcclxuICAgIHByaXZhdGUgZmlsdGVyU2VydmljZTogRmlsdGVyU2VydmljZSxcclxuICAgIHByaXZhdGUgZ3JpZFN0YXRlU2VydmljZTogR3JpZFN0YXRlU2VydmljZSxcclxuICAgIHByaXZhdGUgc29ydFNlcnZpY2U6IFNvcnRTZXJ2aWNlXHJcbiAgKSB7IH1cclxuXHJcbiAgLyoqIEdldHRlciBmb3IgdGhlIEdyaWQgT3B0aW9ucyBwdWxsZWQgdGhyb3VnaCB0aGUgR3JpZCBPYmplY3QgKi9cclxuICBwcml2YXRlIGdldCBfZ3JpZE9wdGlvbnMoKTogR3JpZE9wdGlvbiB7XHJcbiAgICByZXR1cm4gKHRoaXMuX2dyaWQgJiYgdGhpcy5fZ3JpZC5nZXRPcHRpb25zKSA/IHRoaXMuX2dyaWQuZ2V0T3B0aW9ucygpIDoge307XHJcbiAgfVxyXG5cclxuICBpbml0KGdyaWQ6IGFueSwgZGF0YVZpZXc6IGFueSk6IHZvaWQge1xyXG4gICAgdGhpcy5fZ3JpZCA9IGdyaWQ7XHJcbiAgICB0aGlzLl9kYXRhVmlldyA9IGRhdGFWaWV3O1xyXG4gIH1cclxuXHJcbiAgLyoqIENsZWFyIGFsbCBGaWx0ZXJzICYgU29ydHMgKi9cclxuICBjbGVhckFsbEZpbHRlcnNBbmRTb3J0cygpIHtcclxuICAgIC8vIGNhbGwgYm90aCBjbGVhciBGaWx0ZXJzICYgU29ydCBidXQgb25seSB0cmlnZ2VyIHRoZSBsYXN0IG9uZSB0byBhdm9pZCBzZW5kaW5nIG11bHRpcGxlIGJhY2tlbmQgcXVlcmllc1xyXG4gICAgaWYgKHRoaXMuc29ydFNlcnZpY2UgJiYgdGhpcy5zb3J0U2VydmljZS5jbGVhclNvcnRpbmcpIHtcclxuICAgICAgdGhpcy5zb3J0U2VydmljZS5jbGVhclNvcnRpbmcoZmFsc2UpOyAvLyBza2lwIGV2ZW50IHRyaWdnZXIgb24gdGhpcyBvbmVcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmZpbHRlclNlcnZpY2UgJiYgdGhpcy5maWx0ZXJTZXJ2aWNlLmNsZWFyRmlsdGVycykge1xyXG4gICAgICB0aGlzLmZpbHRlclNlcnZpY2UuY2xlYXJGaWx0ZXJzKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBGcm9tIGEgU2xpY2tHcmlkIEV2ZW50IHRyaWdnZXJlZCBnZXQgdGhlIENvbHVtbiBEZWZpbml0aW9uIGFuZCBJdGVtIERhdGEgQ29udGV4dFxyXG4gICAqXHJcbiAgICogRm9yIGV4YW1wbGUgdGhlIFNsaWNrR3JpZCBvbkNsaWNrIHdpbGwgcmV0dXJuIGNlbGwgYXJndW1lbnRzIHdoZW4gc3Vic2NyaWJpbmcgdG8gaXQuXHJcbiAgICogRnJvbSB0aGVzZSBjZWxsQXJncywgd2Ugd2FudCB0byBnZXQgdGhlIENvbHVtbiBEZWZpbml0aW9uIGFuZCBJdGVtIERhdGFcclxuICAgKiBAcGFyYW0gY2VsbCBldmVudCBhcmdzXHJcbiAgICogQHJldHVybiBvYmplY3Qgd2l0aCBjb2x1bW5EZWYgYW5kIGRhdGFDb250ZXh0XHJcbiAgICovXHJcbiAgZ2V0Q29sdW1uRnJvbUV2ZW50QXJndW1lbnRzKGFyZ3M6IENlbGxBcmdzKTogT25FdmVudEFyZ3Mge1xyXG4gICAgaWYgKCFhcmdzIHx8ICFhcmdzLmdyaWQgfHwgIWFyZ3MuZ3JpZC5nZXRDb2x1bW5zIHx8ICFhcmdzLmdyaWQuZ2V0RGF0YUl0ZW0pIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUbyBnZXQgdGhlIGNvbHVtbiBkZWZpbml0aW9uIGFuZCBkYXRhLCB3ZSBuZWVkIHRvIGhhdmUgdGhlc2UgYXJndW1lbnRzIHBhc3NlZCBhcyBvYmplY3RzIChyb3csIGNlbGwsIGdyaWQpJyk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgcm93OiBhcmdzLnJvdyxcclxuICAgICAgY2VsbDogYXJncy5jZWxsLFxyXG4gICAgICBjb2x1bW5EZWY6IGFyZ3MuZ3JpZC5nZXRDb2x1bW5zKClbYXJncy5jZWxsXSxcclxuICAgICAgZGF0YUNvbnRleHQ6IGFyZ3MuZ3JpZC5nZXREYXRhSXRlbShhcmdzLnJvdyksXHJcbiAgICAgIGRhdGFWaWV3OiB0aGlzLl9kYXRhVmlldyxcclxuICAgICAgZ3JpZDogdGhpcy5fZ3JpZFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8qKiBHZXQgZGF0YSBpdGVtIGJ5IGl0J3Mgcm93IGluZGV4IG51bWJlciAqL1xyXG4gIGdldERhdGFJdGVtQnlSb3dOdW1iZXIocm93TnVtYmVyOiBudW1iZXIpIHtcclxuICAgIGlmICghdGhpcy5fZ3JpZCB8fCB0eXBlb2YgdGhpcy5fZ3JpZC5nZXREYXRhSXRlbSAhPT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFdlIGNvdWxkIG5vdCBmaW5kIFNsaWNrR3JpZCBHcmlkIG9iamVjdCBvciBpdCdzIFwiZ2V0RGF0YUl0ZW1cIiBtZXRob2RgKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLl9ncmlkLmdldERhdGFJdGVtKHJvd051bWJlcik7XHJcbiAgfVxyXG5cclxuICAvKiogQ2hhaW4gdGhlIGl0ZW0gTWV0YWRhdGEgd2l0aCBvdXIgaW1wbGVtZW50YXRpb24gb2YgTWV0YWRhdGEgYXQgZ2l2ZW4gcm93IGluZGV4ICovXHJcbiAgZ2V0SXRlbVJvd01ldGFkYXRhVG9IaWdobGlnaHQocHJldmlvdXNJdGVtTWV0YWRhdGE6IGFueSkge1xyXG4gICAgcmV0dXJuIChyb3dOdW1iZXI6IG51bWJlcikgPT4ge1xyXG4gICAgICBjb25zdCBpdGVtID0gdGhpcy5fZGF0YVZpZXcuZ2V0SXRlbShyb3dOdW1iZXIpO1xyXG4gICAgICBsZXQgbWV0YSA9IHsgY3NzQ2xhc3NlczogJycgfTtcclxuICAgICAgaWYgKHR5cGVvZiBwcmV2aW91c0l0ZW1NZXRhZGF0YSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgIG1ldGEgPSBwcmV2aW91c0l0ZW1NZXRhZGF0YShyb3dOdW1iZXIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoIW1ldGEpIHtcclxuICAgICAgICBtZXRhID0geyBjc3NDbGFzc2VzOiAnJyB9O1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoaXRlbSAmJiBpdGVtLl9kaXJ0eSkge1xyXG4gICAgICAgIG1ldGEuY3NzQ2xhc3NlcyA9IChtZXRhICYmIG1ldGEuY3NzQ2xhc3NlcyB8fCAnJykgKyAnIGRpcnR5JztcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGl0ZW0gJiYgaXRlbS5yb3dDbGFzcyAmJiBtZXRhKSB7XHJcbiAgICAgICAgbWV0YS5jc3NDbGFzc2VzICs9IGAgJHtpdGVtLnJvd0NsYXNzfWA7XHJcbiAgICAgICAgbWV0YS5jc3NDbGFzc2VzICs9IGAgcm93JHtyb3dOdW1iZXJ9YDtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIG1ldGE7XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSGlnaGxpZ2h0IHRoZW4gZmFkZSBhIHJvdyBmb3IgeCBzZWNvbmRzLlxyXG4gICAqIFRoZSBpbXBsZW1lbnRhdGlvbiBmb2xsb3dzIHRoaXMgU08gYW5zd2VyOiBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMTk5ODUxNDgvMTIxMjE2NlxyXG4gICAqIEBwYXJhbSByb3dOdW1iZXJcclxuICAgKiBAcGFyYW0gZmFkZURlbGF5XHJcbiAgICovXHJcbiAgaGlnaGxpZ2h0Um93KHJvd051bWJlcjogbnVtYmVyIHwgbnVtYmVyW10sIGZhZGVEZWxheSA9IDE1MDAsIGZhZGVPdXREZWxheSA9IDMwMCkge1xyXG4gICAgLy8gY3JlYXRlIGEgU2VsZWN0aW9uTW9kZWwgaWYgdGhlcmUncyBub3Qgb25lIHlldFxyXG4gICAgaWYgKCF0aGlzLl9ncmlkLmdldFNlbGVjdGlvbk1vZGVsKCkpIHtcclxuICAgICAgY29uc3Qgcm93U2VsZWN0aW9uUGx1Z2luID0gbmV3IFNsaWNrLlJvd1NlbGVjdGlvbk1vZGVsKHRoaXMuX2dyaWRPcHRpb25zLnJvd1NlbGVjdGlvbk9wdGlvbnMgfHwge30pO1xyXG4gICAgICB0aGlzLl9ncmlkLnNldFNlbGVjdGlvbk1vZGVsKHJvd1NlbGVjdGlvblBsdWdpbik7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKEFycmF5LmlzQXJyYXkocm93TnVtYmVyKSkge1xyXG4gICAgICByb3dOdW1iZXIuZm9yRWFjaChyb3cgPT4gdGhpcy5oaWdobGlnaHRSb3dCeU1ldGFkYXRhKHJvdywgZmFkZURlbGF5LCBmYWRlT3V0RGVsYXkpKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaGlnaGxpZ2h0Um93QnlNZXRhZGF0YShyb3dOdW1iZXIsIGZhZGVEZWxheSwgZmFkZU91dERlbGF5KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGhpZ2hsaWdodFJvd0J5TWV0YWRhdGEocm93TnVtYmVyOiBudW1iZXIsIGZhZGVEZWxheSA9IDE1MDAsIGZhZGVPdXREZWxheSA9IDMwMCkge1xyXG4gICAgdGhpcy5fZGF0YVZpZXcuZ2V0SXRlbU1ldGFkYXRhID0gdGhpcy5nZXRJdGVtUm93TWV0YWRhdGFUb0hpZ2hsaWdodCh0aGlzLl9kYXRhVmlldy5nZXRJdGVtTWV0YWRhdGEpO1xyXG5cclxuICAgIGNvbnN0IGl0ZW0gPSB0aGlzLl9kYXRhVmlldy5nZXRJdGVtKHJvd051bWJlcik7XHJcbiAgICBpZiAoaXRlbSAmJiBpdGVtLmlkKSB7XHJcbiAgICAgIGl0ZW0ucm93Q2xhc3MgPSAnaGlnaGxpZ2h0JztcclxuICAgICAgdGhpcy5fZGF0YVZpZXcudXBkYXRlSXRlbShpdGVtLmlkLCBpdGVtKTtcclxuICAgICAgdGhpcy5yZW5kZXJHcmlkKCk7XHJcblxyXG4gICAgICAvLyBmYWRlIG91dFxyXG4gICAgICBjbGVhclRpbWVvdXQoaGlnaGxpZ2h0VGltZXJFbmQpO1xyXG4gICAgICBoaWdobGlnaHRUaW1lckVuZCA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIGl0ZW0ucm93Q2xhc3MgPSAnaGlnaGxpZ2h0LWVuZCc7XHJcbiAgICAgICAgdGhpcy5fZGF0YVZpZXcudXBkYXRlSXRlbShpdGVtLmlkLCBpdGVtKTtcclxuICAgICAgICB0aGlzLnJlbmRlckdyaWQoKTtcclxuICAgICAgfSwgZmFkZU91dERlbGF5KTtcclxuXHJcbiAgICAgIC8vIGRlbGV0ZSB0aGUgcm93J3MgQ1NTIGhpZ2hsaWdodCBjbGFzc2VzIG9uY2UgdGhlIGRlbGF5IGlzIHBhc3NlZFxyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICBpZiAoaXRlbSAmJiBpdGVtLmlkKSB7XHJcbiAgICAgICAgICBkZWxldGUgaXRlbS5yb3dDbGFzcztcclxuICAgICAgICAgIGlmICh0aGlzLl9kYXRhVmlldy5nZXRJZHhCeUlkKGl0ZW0uaWQpICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5fZGF0YVZpZXcudXBkYXRlSXRlbShpdGVtLmlkLCBpdGVtKTtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJHcmlkKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9LCBmYWRlRGVsYXkgKyBmYWRlT3V0RGVsYXkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIEdldCB0aGUgRGF0YSBJdGVtIGZyb20gYSBncmlkIHJvdyBpbmRleCAqL1xyXG4gIGdldERhdGFJdGVtQnlSb3dJbmRleChpbmRleDogbnVtYmVyKTogYW55IHtcclxuICAgIGlmICghdGhpcy5fZ3JpZCB8fCB0eXBlb2YgdGhpcy5fZ3JpZC5nZXREYXRhSXRlbSAhPT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1dlIGNvdWxkIG5vdCBmaW5kIFNsaWNrR3JpZCBHcmlkIG9iamVjdCBhbmQvb3IgXCJnZXREYXRhSXRlbVwiIG1ldGhvZCcpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLl9ncmlkLmdldERhdGFJdGVtKGluZGV4KTtcclxuICB9XHJcblxyXG4gIC8qKiBHZXQgdGhlIERhdGEgSXRlbSBmcm9tIGFuIGFycmF5IG9mIGdyaWQgcm93IGluZGV4ZXMgKi9cclxuICBnZXREYXRhSXRlbUJ5Um93SW5kZXhlcyhpbmRleGVzOiBudW1iZXJbXSk6IGFueVtdIHtcclxuICAgIGlmICghdGhpcy5fZ3JpZCB8fCB0eXBlb2YgdGhpcy5fZ3JpZC5nZXREYXRhSXRlbSAhPT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1dlIGNvdWxkIG5vdCBmaW5kIFNsaWNrR3JpZCBHcmlkIG9iamVjdCBhbmQvb3IgXCJnZXREYXRhSXRlbVwiIG1ldGhvZCcpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGRhdGFJdGVtcyA9IFtdO1xyXG5cclxuICAgIGlmIChBcnJheS5pc0FycmF5KGluZGV4ZXMpKSB7XHJcbiAgICAgIGluZGV4ZXMuZm9yRWFjaCgoaWR4KSA9PiB7XHJcbiAgICAgICAgZGF0YUl0ZW1zLnB1c2godGhpcy5fZ3JpZC5nZXREYXRhSXRlbShpZHgpKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGRhdGFJdGVtcztcclxuICB9XHJcblxyXG4gIC8qKiBHZXQgdGhlIGN1cnJlbnRseSBzZWxlY3RlZCByb3cgaW5kZXhlcyAqL1xyXG4gIGdldFNlbGVjdGVkUm93cygpOiBudW1iZXJbXSB7XHJcbiAgICBpZiAoIXRoaXMuX2dyaWQgfHwgdHlwZW9mIHRoaXMuX2dyaWQuZ2V0U2VsZWN0ZWRSb3dzICE9PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignV2UgY291bGQgbm90IGZpbmQgU2xpY2tHcmlkIEdyaWQgb2JqZWN0IGFuZC9vciBcImdldFNlbGVjdGVkUm93c1wiIG1ldGhvZCcpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuX2dyaWQuZ2V0U2VsZWN0ZWRSb3dzKCk7XHJcbiAgfVxyXG5cclxuICAvKiogR2V0IHRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgcm93cyBpdGVtIGRhdGEgKi9cclxuICBnZXRTZWxlY3RlZFJvd3NEYXRhSXRlbSgpOiBhbnlbXSB7XHJcbiAgICBpZiAoIXRoaXMuX2dyaWQgfHwgdHlwZW9mIHRoaXMuX2dyaWQuZ2V0U2VsZWN0ZWRSb3dzICE9PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignV2UgY291bGQgbm90IGZpbmQgU2xpY2tHcmlkIEdyaWQgb2JqZWN0IGFuZC9vciBcImdldFNlbGVjdGVkUm93c1wiIG1ldGhvZCcpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHNlbGVjdGVkUm93SW5kZXhlcyA9IHRoaXMuX2dyaWQuZ2V0U2VsZWN0ZWRSb3dzKCk7XHJcbiAgICByZXR1cm4gdGhpcy5nZXREYXRhSXRlbUJ5Um93SW5kZXhlcyhzZWxlY3RlZFJvd0luZGV4ZXMpO1xyXG4gIH1cclxuXHJcbiAgLyoqIFNlbGVjdCB0aGUgc2VsZWN0ZWQgcm93IGJ5IGEgcm93IGluZGV4ICovXHJcbiAgc2V0U2VsZWN0ZWRSb3cocm93SW5kZXg6IG51bWJlcikge1xyXG4gICAgaWYgKHRoaXMuX2dyaWQgJiYgdGhpcy5fZ3JpZC5zZXRTZWxlY3RlZFJvd3MpIHtcclxuICAgICAgdGhpcy5fZ3JpZC5zZXRTZWxlY3RlZFJvd3MoW3Jvd0luZGV4XSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKiogU2V0IHNlbGVjdGVkIHJvd3Mgd2l0aCBwcm92aWRlZCBhcnJheSBvZiByb3cgaW5kZXhlcyAqL1xyXG4gIHNldFNlbGVjdGVkUm93cyhyb3dJbmRleGVzOiBudW1iZXJbXSkge1xyXG4gICAgaWYgKHRoaXMuX2dyaWQgJiYgdGhpcy5fZ3JpZC5zZXRTZWxlY3RlZFJvd3MpIHtcclxuICAgICAgdGhpcy5fZ3JpZC5zZXRTZWxlY3RlZFJvd3Mocm93SW5kZXhlcyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKiogUmUtUmVuZGVyIHRoZSBHcmlkICovXHJcbiAgcmVuZGVyR3JpZCgpIHtcclxuICAgIGlmICh0aGlzLl9ncmlkICYmIHR5cGVvZiB0aGlzLl9ncmlkLmludmFsaWRhdGUgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgdGhpcy5fZ3JpZC5pbnZhbGlkYXRlKCk7XHJcbiAgICAgIHRoaXMuX2dyaWQucmVuZGVyKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXNldCB0aGUgZ3JpZCB0byBpdCdzIG9yaWdpbmFsIHN0YXRlIChjbGVhciBhbnkgZmlsdGVycywgc29ydGluZyAmIHBhZ2luYXRpb24gaWYgZXhpc3RzKSAuXHJcbiAgICogVGhlIGNvbHVtbiBkZWZpbml0aW9ucyBjb3VsZCBiZSBwYXNzZWQgYXMgYXJndW1lbnQgdG8gcmVzZXQgKHRoaXMgY2FuIGJlIHVzZWQgYWZ0ZXIgYSBHcmlkIFN0YXRlIHJlc2V0KVxyXG4gICAqIFRoZSByZXNldCB3aWxsIGNsZWFyIHRoZSBGaWx0ZXJzICYgU29ydCwgdGhlbiB3aWxsIHJlc2V0IHRoZSBDb2x1bW5zIHRvIHRoZWlyIG9yaWdpbmFsIHN0YXRlXHJcbiAgICovXHJcbiAgcmVzZXRHcmlkKGNvbHVtbkRlZmluaXRpb25zPzogQ29sdW1uW10pIHtcclxuICAgIC8vIHJlc2V0IGNvbHVtbnMgdG8gb3JpZ2luYWwgc3RhdGVzICYgcmVmcmVzaCB0aGUgZ3JpZFxyXG4gICAgaWYgKHRoaXMuX2dyaWQgJiYgdGhpcy5fZGF0YVZpZXcpIHtcclxuICAgICAgY29uc3Qgb3JpZ2luYWxDb2x1bW5zID0gdGhpcy5leHRlbnNpb25TZXJ2aWNlLmdldEFsbENvbHVtbnMoKTtcclxuXHJcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KG9yaWdpbmFsQ29sdW1ucykgJiYgb3JpZ2luYWxDb2x1bW5zLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAvLyBzZXQgdGhlIGdyaWQgY29sdW1ucyB0byBpdCdzIG9yaWdpbmFsIGNvbHVtbiBkZWZpbml0aW9uc1xyXG4gICAgICAgIHRoaXMuX2dyaWQuc2V0Q29sdW1ucyhvcmlnaW5hbENvbHVtbnMpO1xyXG4gICAgICAgIGlmICh0aGlzLl9ncmlkT3B0aW9ucyAmJiB0aGlzLl9ncmlkT3B0aW9ucy5lbmFibGVBdXRvU2l6ZUNvbHVtbnMpIHtcclxuICAgICAgICAgIHRoaXMuX2dyaWQuYXV0b3NpemVDb2x1bW5zKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZ3JpZFN0YXRlU2VydmljZS5yZXNldENvbHVtbnMoY29sdW1uRGVmaW5pdGlvbnMpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuZmlsdGVyU2VydmljZSAmJiB0aGlzLmZpbHRlclNlcnZpY2UuY2xlYXJGaWx0ZXJzKSB7XHJcbiAgICAgIHRoaXMuZmlsdGVyU2VydmljZS5jbGVhckZpbHRlcnMoKTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLnNvcnRTZXJ2aWNlICYmIHRoaXMuc29ydFNlcnZpY2UuY2xlYXJTb3J0aW5nKSB7XHJcbiAgICAgIHRoaXMuc29ydFNlcnZpY2UuY2xlYXJTb3J0aW5nKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKiogQGRlcHJlY2F0ZWQgcGxlYXNlIHVzZSBcImFkZEl0ZW1cIiBtZXRob2QgaW5zdGVhZCAqL1xyXG4gIGFkZEl0ZW1Ub0RhdGFncmlkKGl0ZW06IGFueSwgc2hvdWxkSGlnaGxpZ2h0Um93ID0gdHJ1ZSwgc2hvdWxkUmVzb3J0R3JpZCA9IGZhbHNlLCBzaG91bGRUcmlnZ2VyRXZlbnQgPSB0cnVlLCBzaG91bGRTZWxlY3RSb3cgPSB0cnVlKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLmFkZEl0ZW0oaXRlbSwgeyBoaWdobGlnaHRSb3c6IHNob3VsZEhpZ2hsaWdodFJvdywgcmVzb3J0R3JpZDogc2hvdWxkUmVzb3J0R3JpZCwgdHJpZ2dlckV2ZW50OiBzaG91bGRUcmlnZ2VyRXZlbnQsIHNlbGVjdFJvdzogc2hvdWxkU2VsZWN0Um93IH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqIEBkZXByZWNhdGVkIHBsZWFzZSB1c2UgXCJhZGRJdGVtc1wiIG1ldGhvZCBpbnN0ZWFkICovXHJcbiAgYWRkSXRlbXNUb0RhdGFncmlkKGl0ZW1zOiBhbnlbXSwgc2hvdWxkSGlnaGxpZ2h0Um93ID0gdHJ1ZSwgc2hvdWxkUmVzb3J0R3JpZCA9IGZhbHNlLCBzaG91bGRUcmlnZ2VyRXZlbnQgPSB0cnVlLCBzaG91bGRTZWxlY3RSb3cgPSB0cnVlKTogbnVtYmVyW10ge1xyXG4gICAgcmV0dXJuIHRoaXMuYWRkSXRlbXMoaXRlbXMsIHsgaGlnaGxpZ2h0Um93OiBzaG91bGRIaWdobGlnaHRSb3csIHJlc29ydEdyaWQ6IHNob3VsZFJlc29ydEdyaWQsIHRyaWdnZXJFdmVudDogc2hvdWxkVHJpZ2dlckV2ZW50LCBzZWxlY3RSb3c6IHNob3VsZFNlbGVjdFJvdyB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZCBhbiBpdGVtIChkYXRhIGl0ZW0pIHRvIHRoZSBkYXRhZ3JpZCwgYnkgZGVmYXVsdCBpdCB3aWxsIGhpZ2hsaWdodCAoZmxhc2hpbmcpIHRoZSBpbnNlcnRlZCByb3cgYnV0IHdlIGNhbiBkaXNhYmxlIGl0IHRvb1xyXG4gICAqIEBwYXJhbSBpdGVtIG9iamVjdCB3aGljaCBtdXN0IGNvbnRhaW4gYSB1bmlxdWUgXCJpZFwiIHByb3BlcnR5IGFuZCBhbnkgb3RoZXIgc3VpdGFibGUgcHJvcGVydGllc1xyXG4gICAqIEBwYXJhbSBvcHRpb25zOiBwcm92aWRlIHRoZSBwb3NzaWJpbGl0eSB0byBkbyBjZXJ0YWluIGFjdGlvbnMgYWZ0ZXIgb3IgZHVyaW5nIHRoZSB1cHNlcnQgKGhpZ2hsaWdodFJvdywgcmVzb3J0R3JpZCwgc2VsZWN0Um93LCB0cmlnZ2VyRXZlbnQpXHJcbiAgICogQHJldHVybiByb3dJbmRleDogdHlwaWNhbGx5IGluZGV4IDBcclxuICAgKi9cclxuICBhZGRJdGVtKGl0ZW06IGFueSwgb3B0aW9ucz86IEdyaWRTZXJ2aWNlSW5zZXJ0T3B0aW9uKTogbnVtYmVyIHtcclxuICAgIG9wdGlvbnMgPSB7IC4uLkdyaWRTZXJ2aWNlSW5zZXJ0T3B0aW9uRGVmYXVsdHMsIC4uLm9wdGlvbnMgfTtcclxuXHJcbiAgICBpZiAoIXRoaXMuX2dyaWQgfHwgIXRoaXMuX2dyaWRPcHRpb25zIHx8ICF0aGlzLl9kYXRhVmlldykge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1dlIGNvdWxkIG5vdCBmaW5kIFNsaWNrR3JpZCBHcmlkLCBEYXRhVmlldyBvYmplY3RzJyk7XHJcbiAgICB9XHJcbiAgICBpZiAoIWl0ZW0gfHwgIWl0ZW0uaGFzT3duUHJvcGVydHkoJ2lkJykpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBBZGRpbmcgYW4gaXRlbSByZXF1aXJlcyB0aGUgaXRlbSB0byBpbmNsdWRlIGFuIFwiaWRcIiBwcm9wZXJ0eWApO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX2RhdGFWaWV3Lmluc2VydEl0ZW0oMCwgaXRlbSk7IC8vIGluc2VydCBhdCBpbmRleCAwXHJcblxyXG4gICAgLy8gcm93IG51bWJlciBpbiB0aGUgZ3JpZCwgYnkgZGVmYXVsdCBpdCB3aWxsIGJlIG9uIGZpcnN0IHJvd1xyXG4gICAgbGV0IHJvd051bWJlciA9IDA7XHJcblxyXG4gICAgLy8gZG8gd2Ugd2FudCB0aGUgaXRlbSB0byBiZSBzb3J0ZWQgaW4gdGhlIGdyaWQsIHdoZW4gc2V0IHRvIEZhbHNlIGl0IHdpbGwgaW5zZXJ0IG9uIGZpcnN0IHJvdyAoZGVmYXVsdHMgdG8gZmFsc2UpXHJcbiAgICBpZiAob3B0aW9ucy5yZXNvcnRHcmlkKSB7XHJcbiAgICAgIHRoaXMuX2RhdGFWaWV3LnJlU29ydCgpO1xyXG5cclxuICAgICAgLy8gZmluZCB0aGUgcm93IG51bWJlciBpbiB0aGUgZ3JpZCBhbmQgaWYgdXNlciB3YW50ZWQgdG8gc2VlIGhpZ2hsaWdodGVkIHJvd1xyXG4gICAgICAvLyB3ZSBuZWVkIHRvIGRvIGl0IGhlcmUgYWZ0ZXIgcmVzb3J0IGFuZCBnZXQgZWFjaCByb3cgbnVtYmVyIGJlY2F1c2UgaXQgcG9zc2libHkgY2hhbmdlcyBhZnRlciB0aGUgc29ydFxyXG4gICAgICByb3dOdW1iZXIgPSB0aGlzLl9kYXRhVmlldy5nZXRSb3dCeUlkKGl0ZW0uaWQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5fZ3JpZC5zY3JvbGxSb3dJbnRvVmlldyhyb3dOdW1iZXIpOyAvLyBzY3JvbGwgdG8gcm93IDBcclxuICAgIH1cclxuXHJcbiAgICAvLyBoaWdobGlnaHQgdGhlIHJvdyB3ZSBqdXN0IGFkZGVkLCBpZiBoaWdobGlnaHQgaXMgZGVmaW5lZFxyXG4gICAgaWYgKG9wdGlvbnMuaGlnaGxpZ2h0Um93KSB7XHJcbiAgICAgIHRoaXMuaGlnaGxpZ2h0Um93KHJvd051bWJlcik7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gc2VsZWN0IHRoZSByb3cgaW4gdGhlIGdyaWRcclxuICAgIGlmIChvcHRpb25zLnNlbGVjdFJvdyAmJiB0aGlzLl9ncmlkT3B0aW9ucyAmJiAodGhpcy5fZ3JpZE9wdGlvbnMuZW5hYmxlQ2hlY2tib3hTZWxlY3RvciB8fCB0aGlzLl9ncmlkT3B0aW9ucy5lbmFibGVSb3dTZWxlY3Rpb24pKSB7XHJcbiAgICAgIHRoaXMuX2dyaWQuc2V0U2VsZWN0ZWRSb3dzKHJvd051bWJlcik7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZG8gd2Ugd2FudCB0byB0cmlnZ2VyIGFuIGV2ZW50IGFmdGVyIGFkZGluZyB0aGUgaXRlbVxyXG4gICAgaWYgKG9wdGlvbnMudHJpZ2dlckV2ZW50KSB7XHJcbiAgICAgIHRoaXMub25JdGVtQWRkZWQubmV4dChpdGVtKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcm93TnVtYmVyO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIGl0ZW0gYXJyYXkgKGRhdGEgaXRlbSkgdG8gdGhlIGRhdGFncmlkLCBieSBkZWZhdWx0IGl0IHdpbGwgaGlnaGxpZ2h0IChmbGFzaGluZykgdGhlIGluc2VydGVkIHJvdyBidXQgd2UgY2FuIGRpc2FibGUgaXQgdG9vXHJcbiAgICogQHBhcmFtIGl0ZW0gb2JqZWN0IGFycmF5cywgd2hpY2ggbXVzdCBjb250YWluIHVuaXF1ZSBcImlkXCIgcHJvcGVydHkgYW5kIGFueSBvdGhlciBzdWl0YWJsZSBwcm9wZXJ0aWVzXHJcbiAgICogQHBhcmFtIG9wdGlvbnM6IHByb3ZpZGUgdGhlIHBvc3NpYmlsaXR5IHRvIGRvIGNlcnRhaW4gYWN0aW9ucyBhZnRlciBvciBkdXJpbmcgdGhlIHVwc2VydCAoaGlnaGxpZ2h0Um93LCByZXNvcnRHcmlkLCBzZWxlY3RSb3csIHRyaWdnZXJFdmVudClcclxuICAgKi9cclxuICBhZGRJdGVtcyhpdGVtczogYW55IHwgYW55W10sIG9wdGlvbnM/OiBHcmlkU2VydmljZUluc2VydE9wdGlvbik6IG51bWJlcltdIHtcclxuICAgIG9wdGlvbnMgPSB7IC4uLkdyaWRTZXJ2aWNlSW5zZXJ0T3B0aW9uRGVmYXVsdHMsIC4uLm9wdGlvbnMgfTtcclxuICAgIGNvbnN0IHJvd051bWJlcnM6IG51bWJlcltdID0gW107XHJcblxyXG4gICAgLy8gbG9vcCB0aHJvdWdoIGFsbCBpdGVtcyB0byBhZGRcclxuICAgIGlmICghQXJyYXkuaXNBcnJheShpdGVtcykpIHtcclxuICAgICAgcmV0dXJuIFt0aGlzLmFkZEl0ZW0oaXRlbXMsIG9wdGlvbnMpXTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGl0ZW1zLmZvckVhY2goKGl0ZW06IGFueSkgPT4gdGhpcy5hZGRJdGVtKGl0ZW0sIHsgaGlnaGxpZ2h0Um93OiBmYWxzZSwgcmVzb3J0R3JpZDogZmFsc2UsIHNlbGVjdFJvdzogZmFsc2UsIHRyaWdnZXJFdmVudDogZmFsc2UgfSkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGRvIHdlIHdhbnQgdGhlIGl0ZW0gdG8gYmUgc29ydGVkIGluIHRoZSBncmlkLCB3aGVuIHNldCB0byBGYWxzZSBpdCB3aWxsIGluc2VydCBvbiBmaXJzdCByb3cgKGRlZmF1bHRzIHRvIGZhbHNlKVxyXG4gICAgaWYgKG9wdGlvbnMucmVzb3J0R3JpZCkge1xyXG4gICAgICB0aGlzLl9kYXRhVmlldy5yZVNvcnQoKTtcclxuXHJcbiAgICAgIC8vIGlmIHVzZXIgd2FudGVkIHRvIHNlZSBoaWdobGlnaHRlZCByb3dcclxuICAgICAgLy8gd2UgbmVlZCB0byBkbyBpdCBoZXJlIGFmdGVyIHJlc29ydCBhbmQgZ2V0IGVhY2ggcm93IG51bWJlciBiZWNhdXNlIGl0IHBvc3NpYmx5IGNoYW5nZXMgYWZ0ZXIgdGhlIHNvcnRcclxuICAgICAgaWYgKG9wdGlvbnMuaGlnaGxpZ2h0Um93KSB7XHJcbiAgICAgICAgaXRlbXMuZm9yRWFjaCgoaXRlbTogYW55KSA9PiB7XHJcbiAgICAgICAgICBjb25zdCByb3dOdW1iZXIgPSB0aGlzLl9kYXRhVmlldy5nZXRSb3dCeUlkKGl0ZW0uaWQpO1xyXG4gICAgICAgICAgcm93TnVtYmVycy5wdXNoKHJvd051bWJlcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAob3B0aW9ucy5oaWdobGlnaHRSb3cpIHtcclxuICAgICAgY29uc3QgbG4gPSBpdGVtcy5sZW5ndGg7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbG47IGkrKykge1xyXG4gICAgICAgIHJvd051bWJlcnMucHVzaChpKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGRvIHVzZXIgd2FudCB0byBoaWdobGlnaHQgdGhlIHJvd3NcclxuICAgIGlmIChvcHRpb25zLmhpZ2hsaWdodFJvdykge1xyXG4gICAgICB0aGlzLmhpZ2hsaWdodFJvdyhyb3dOdW1iZXJzKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBzZWxlY3QgdGhlIHJvdyBpbiB0aGUgZ3JpZFxyXG4gICAgaWYgKG9wdGlvbnMuc2VsZWN0Um93ICYmIHRoaXMuX2dyaWRPcHRpb25zICYmICh0aGlzLl9ncmlkT3B0aW9ucy5lbmFibGVDaGVja2JveFNlbGVjdG9yIHx8IHRoaXMuX2dyaWRPcHRpb25zLmVuYWJsZVJvd1NlbGVjdGlvbikpIHtcclxuICAgICAgdGhpcy5fZ3JpZC5zZXRTZWxlY3RlZFJvd3Mocm93TnVtYmVycyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZG8gd2Ugd2FudCB0byB0cmlnZ2VyIGFuIGV2ZW50IGFmdGVyIGFkZGluZyB0aGUgaXRlbVxyXG4gICAgaWYgKG9wdGlvbnMudHJpZ2dlckV2ZW50KSB7XHJcbiAgICAgIHRoaXMub25JdGVtQWRkZWQubmV4dChpdGVtcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJvd051bWJlcnM7XHJcbiAgfVxyXG5cclxuICAvKiogQGRlcHJlY2F0ZWQgcGxlYXNlIHVzZSBcImRlbGV0ZUl0ZW1cIiBtZXRob2QgaW5zdGVhZCAqL1xyXG4gIGRlbGV0ZURhdGFHcmlkSXRlbShpdGVtOiBhbnksIHNob3VsZFRyaWdnZXJFdmVudCA9IHRydWUpIHtcclxuICAgIHRoaXMuZGVsZXRlSXRlbShpdGVtLCB7IHRyaWdnZXJFdmVudDogc2hvdWxkVHJpZ2dlckV2ZW50IH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqIEBkZXByZWNhdGVkIHBsZWFzZSB1c2UgXCJkZWxldGVJdGVtc1wiIG1ldGhvZCBpbnN0ZWFkICovXHJcbiAgZGVsZXRlRGF0YUdyaWRJdGVtcyhpdGVtczogYW55W10sIHNob3VsZFRyaWdnZXJFdmVudCA9IHRydWUpIHtcclxuICAgIHRoaXMuZGVsZXRlSXRlbXMoaXRlbXMsIHsgdHJpZ2dlckV2ZW50OiBzaG91bGRUcmlnZ2VyRXZlbnQgfSk7XHJcbiAgfVxyXG5cclxuICAvKiogQGRlcHJlY2F0ZWQgcGxlYXNlIHVzZSBcImRlbGV0ZUl0ZW1CeUlkXCIgbWV0aG9kIGluc3RlYWQgKi9cclxuICBkZWxldGVEYXRhR3JpZEl0ZW1CeUlkKGl0ZW1JZDogc3RyaW5nIHwgbnVtYmVyLCBzaG91bGRUcmlnZ2VyRXZlbnQgPSB0cnVlKSB7XHJcbiAgICB0aGlzLmRlbGV0ZUl0ZW1CeUlkKGl0ZW1JZCwgeyB0cmlnZ2VyRXZlbnQ6IHNob3VsZFRyaWdnZXJFdmVudCB9KTtcclxuICB9XHJcblxyXG4gIC8qKiBAZGVwcmVjYXRlZCBwbGVhc2UgdXNlIFwiZGVsZXRlSXRlbUJ5SWRzXCIgbWV0aG9kIGluc3RlYWQgKi9cclxuICBkZWxldGVEYXRhR3JpZEl0ZW1CeUlkcyhpdGVtSWRzOiBudW1iZXJbXSB8IHN0cmluZ1tdLCBzaG91bGRUcmlnZ2VyRXZlbnQgPSB0cnVlKSB7XHJcbiAgICB0aGlzLmRlbGV0ZUl0ZW1CeUlkcyhpdGVtSWRzLCB7IHRyaWdnZXJFdmVudDogc2hvdWxkVHJpZ2dlckV2ZW50IH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRGVsZXRlIGFuIGV4aXN0aW5nIGl0ZW0gZnJvbSB0aGUgZGF0YWdyaWQgKGRhdGFWaWV3KVxyXG4gICAqIEBwYXJhbSBpdGVtIG9iamVjdCB3aGljaCBtdXN0IGNvbnRhaW4gYSB1bmlxdWUgXCJpZFwiIHByb3BlcnR5IGFuZCBhbnkgb3RoZXIgc3VpdGFibGUgcHJvcGVydGllc1xyXG4gICAqIEBwYXJhbSBvcHRpb25zOiBwcm92aWRlIHRoZSBwb3NzaWJpbGl0eSB0byBkbyBjZXJ0YWluIGFjdGlvbnMgYWZ0ZXIgb3IgZHVyaW5nIHRoZSB1cHNlcnQgKHRyaWdnZXJFdmVudClcclxuICAgKiBAcmV0dXJuIGl0ZW0gaWQgZGVsZXRlZFxyXG4gICAqL1xyXG4gIGRlbGV0ZUl0ZW0oaXRlbTogYW55LCBvcHRpb25zPzogR3JpZFNlcnZpY2VEZWxldGVPcHRpb24pOiBudW1iZXIgfCBzdHJpbmcge1xyXG4gICAgb3B0aW9ucyA9IHsgLi4uR3JpZFNlcnZpY2VEZWxldGVPcHRpb25EZWZhdWx0cywgLi4ub3B0aW9ucyB9O1xyXG5cclxuICAgIGlmICghaXRlbSB8fCAhaXRlbS5oYXNPd25Qcm9wZXJ0eSgnaWQnKSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYERlbGV0aW5nIGFuIGl0ZW0gcmVxdWlyZXMgdGhlIGl0ZW0gdG8gaW5jbHVkZSBhbiBcImlkXCIgcHJvcGVydHlgKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLmRlbGV0ZUl0ZW1CeUlkKGl0ZW0uaWQsIG9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRGVsZXRlIGFuIGFycmF5IG9mIGV4aXN0aW5nIGl0ZW1zIGZyb20gdGhlIGRhdGFncmlkXHJcbiAgICogQHBhcmFtIGl0ZW0gb2JqZWN0IHdoaWNoIG11c3QgY29udGFpbiBhIHVuaXF1ZSBcImlkXCIgcHJvcGVydHkgYW5kIGFueSBvdGhlciBzdWl0YWJsZSBwcm9wZXJ0aWVzXHJcbiAgICogQHBhcmFtIG9wdGlvbnM6IHByb3ZpZGUgdGhlIHBvc3NpYmlsaXR5IHRvIGRvIGNlcnRhaW4gYWN0aW9ucyBhZnRlciBvciBkdXJpbmcgdGhlIHVwc2VydCAodHJpZ2dlckV2ZW50KVxyXG4gICAqIEByZXR1cm4gaXRlbSBpZCBkZWxldGVkXHJcbiAgICovXHJcbiAgZGVsZXRlSXRlbXMoaXRlbXM6IGFueSB8IGFueVtdLCBvcHRpb25zPzogR3JpZFNlcnZpY2VEZWxldGVPcHRpb24pOiBudW1iZXJbXSB8IHN0cmluZ1tdIHtcclxuICAgIG9wdGlvbnMgPSB7IC4uLkdyaWRTZXJ2aWNlRGVsZXRlT3B0aW9uRGVmYXVsdHMsIC4uLm9wdGlvbnMgfTtcclxuXHJcbiAgICAvLyB3aGVuIGl0J3Mgbm90IGFuIGFycmF5LCB3ZSBjYW4gY2FsbCBkaXJlY3RseSB0aGUgc2luZ2xlIGl0ZW0gZGVsZXRlXHJcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoaXRlbXMpKSB7XHJcbiAgICAgIHRoaXMuZGVsZXRlSXRlbShpdGVtcywgb3B0aW9ucyk7XHJcbiAgICAgIHJldHVybiBbaXRlbXMuaWRdO1xyXG4gICAgfVxyXG4gICAgY29uc3QgaXRlbUlkcyA9IFtdO1xyXG4gICAgaXRlbXMuZm9yRWFjaCgoaXRlbTogYW55KSA9PiB7XHJcbiAgICAgIGlmIChpdGVtICYmIGl0ZW0uaWQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGl0ZW1JZHMucHVzaChpdGVtLmlkKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmRlbGV0ZUl0ZW0oaXRlbSwgeyB0cmlnZ2VyRXZlbnQ6IGZhbHNlIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gZG8gd2Ugd2FudCB0byB0cmlnZ2VyIGFuIGV2ZW50IGFmdGVyIGRlbGV0aW5nIHRoZSBpdGVtXHJcbiAgICBpZiAob3B0aW9ucy50cmlnZ2VyRXZlbnQpIHtcclxuICAgICAgdGhpcy5vbkl0ZW1EZWxldGVkLm5leHQoaXRlbXMpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGl0ZW1JZHM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEZWxldGUgYW4gZXhpc3RpbmcgaXRlbSBmcm9tIHRoZSBkYXRhZ3JpZCAoZGF0YVZpZXcpIGJ5IGl0J3MgaWRcclxuICAgKiBAcGFyYW0gaXRlbUlkOiBpdGVtIHVuaXF1ZSBpZFxyXG4gICAqIEBwYXJhbSBvcHRpb25zOiBwcm92aWRlIHRoZSBwb3NzaWJpbGl0eSB0byBkbyBjZXJ0YWluIGFjdGlvbnMgYWZ0ZXIgb3IgZHVyaW5nIHRoZSB1cHNlcnQgKHRyaWdnZXJFdmVudClcclxuICAgKiBAcmV0dXJuIGl0ZW0gaWQgZGVsZXRlZFxyXG4gICAqL1xyXG4gIGRlbGV0ZUl0ZW1CeUlkKGl0ZW1JZDogc3RyaW5nIHwgbnVtYmVyLCBvcHRpb25zPzogR3JpZFNlcnZpY2VEZWxldGVPcHRpb24pOiBudW1iZXIgfCBzdHJpbmcge1xyXG4gICAgb3B0aW9ucyA9IHsgLi4uR3JpZFNlcnZpY2VEZWxldGVPcHRpb25EZWZhdWx0cywgLi4ub3B0aW9ucyB9O1xyXG5cclxuICAgIGlmIChpdGVtSWQgPT09IG51bGwgfHwgaXRlbUlkID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYW5ub3QgZGVsZXRlIGEgcm93IHdpdGhvdXQgYSB2YWxpZCBcImlkXCJgKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyB3aGVuIHVzZXIgaGFzIHJvdyBzZWxlY3Rpb24gZW5hYmxlZCwgd2Ugc2hvdWxkIGNsZWFyIGFueSBzZWxlY3Rpb24gdG8gYXZvaWQgY29uZnVzaW9uIGFmdGVyIGEgZGVsZXRlXHJcbiAgICBpZiAodGhpcy5fZ3JpZCAmJiB0aGlzLl9ncmlkT3B0aW9ucyAmJiAodGhpcy5fZ3JpZE9wdGlvbnMuZW5hYmxlQ2hlY2tib3hTZWxlY3RvciB8fCB0aGlzLl9ncmlkT3B0aW9ucy5lbmFibGVSb3dTZWxlY3Rpb24pKSB7XHJcbiAgICAgIHRoaXMuX2dyaWQuc2V0U2VsZWN0ZWRSb3dzKFtdKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBkZWxldGUgdGhlIGl0ZW0gZnJvbSB0aGUgZGF0YVZpZXdcclxuICAgIHRoaXMuX2RhdGFWaWV3LmRlbGV0ZUl0ZW0oaXRlbUlkKTtcclxuXHJcbiAgICAvLyBkbyB3ZSB3YW50IHRvIHRyaWdnZXIgYW4gZXZlbnQgYWZ0ZXIgZGVsZXRpbmcgdGhlIGl0ZW1cclxuICAgIGlmIChvcHRpb25zLnRyaWdnZXJFdmVudCkge1xyXG4gICAgICB0aGlzLm9uSXRlbURlbGV0ZWQubmV4dChpdGVtSWQpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGl0ZW1JZDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERlbGV0ZSBhbiBhcnJheSBvZiBleGlzdGluZyBpdGVtcyBmcm9tIHRoZSBkYXRhZ3JpZFxyXG4gICAqIEBwYXJhbSBpdGVtSWRzIGFycmF5IG9mIGl0ZW0gdW5pcXVlIElEc1xyXG4gICAqIEBwYXJhbSBvcHRpb25zOiBwcm92aWRlIHRoZSBwb3NzaWJpbGl0eSB0byBkbyBjZXJ0YWluIGFjdGlvbnMgYWZ0ZXIgb3IgZHVyaW5nIHRoZSB1cHNlcnQgKHRyaWdnZXJFdmVudClcclxuICAgKi9cclxuICBkZWxldGVJdGVtQnlJZHMoaXRlbUlkczogbnVtYmVyW10gfCBzdHJpbmdbXSwgb3B0aW9ucz86IEdyaWRTZXJ2aWNlRGVsZXRlT3B0aW9uKTogbnVtYmVyW10gfCBzdHJpbmdbXSB7XHJcbiAgICBvcHRpb25zID0geyAuLi5HcmlkU2VydmljZURlbGV0ZU9wdGlvbkRlZmF1bHRzLCAuLi5vcHRpb25zIH07XHJcblxyXG4gICAgLy8gd2hlbiBpdCdzIG5vdCBhbiBhcnJheSwgd2UgY2FuIGNhbGwgZGlyZWN0bHkgdGhlIHNpbmdsZSBpdGVtIGRlbGV0ZVxyXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoaXRlbUlkcykpIHtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtSWRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGl0ZW1JZHNbaV0gIT09IG51bGwpIHtcclxuICAgICAgICAgIHRoaXMuZGVsZXRlSXRlbUJ5SWQoaXRlbUlkc1tpXSwgeyB0cmlnZ2VyRXZlbnQ6IGZhbHNlIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gZG8gd2Ugd2FudCB0byB0cmlnZ2VyIGFuIGV2ZW50IGFmdGVyIGRlbGV0aW5nIHRoZSBpdGVtXHJcbiAgICAgIGlmIChvcHRpb25zLnRyaWdnZXJFdmVudCkge1xyXG4gICAgICAgIHRoaXMub25JdGVtRGVsZXRlZC5uZXh0KGl0ZW1JZHMpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBpdGVtSWRzO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFtdO1xyXG4gIH1cclxuXHJcbiAgLyoqIEBkZXByZWNhdGVkIHBsZWFzZSB1c2UgXCJ1cGRhdGVJdGVtXCIgbWV0aG9kIGluc3RlYWQgKi9cclxuICB1cGRhdGVEYXRhR3JpZEl0ZW0oaXRlbTogYW55LCBzaG91bGRIaWdobGlnaHRSb3cgPSB0cnVlLCBzaG91bGRUcmlnZ2VyRXZlbnQgPSB0cnVlLCBzaG91bGRTZWxlY3RSb3cgPSB0cnVlKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLnVwZGF0ZUl0ZW0oaXRlbSwgeyBoaWdobGlnaHRSb3c6IHNob3VsZEhpZ2hsaWdodFJvdywgdHJpZ2dlckV2ZW50OiBzaG91bGRUcmlnZ2VyRXZlbnQsIHNlbGVjdFJvdzogc2hvdWxkU2VsZWN0Um93IH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqIEBkZXByZWNhdGVkIHBsZWFzZSB1c2UgXCJ1cGRhdGVJdGVtc1wiIG1ldGhvZCBpbnN0ZWFkICovXHJcbiAgdXBkYXRlRGF0YUdyaWRJdGVtcyhpdGVtczogYW55IHwgYW55W10sIHNob3VsZEhpZ2hsaWdodFJvdyA9IHRydWUsIHNob3VsZFRyaWdnZXJFdmVudCA9IHRydWUsIHNob3VsZFNlbGVjdFJvdyA9IHRydWUpOiBudW1iZXJbXSB7XHJcbiAgICByZXR1cm4gdGhpcy51cGRhdGVJdGVtcyhpdGVtcywgeyBoaWdobGlnaHRSb3c6IHNob3VsZEhpZ2hsaWdodFJvdywgdHJpZ2dlckV2ZW50OiBzaG91bGRUcmlnZ2VyRXZlbnQsIHNlbGVjdFJvdzogc2hvdWxkU2VsZWN0Um93IH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqIEBkZXByZWNhdGVkIHBsZWFzZSB1c2UgXCJ1cGRhdGVJdGVtQnlJZFwiIG1ldGhvZCBpbnN0ZWFkICovXHJcbiAgdXBkYXRlRGF0YUdyaWRJdGVtQnlJZChpdGVtSWQ6IG51bWJlciB8IHN0cmluZywgaXRlbTogYW55LCBzaG91bGRIaWdobGlnaHRSb3cgPSB0cnVlLCBzaG91bGRUcmlnZ2VyRXZlbnQgPSB0cnVlLCBzaG91bGRTZWxlY3RSb3cgPSB0cnVlKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLnVwZGF0ZUl0ZW1CeUlkKGl0ZW1JZCwgaXRlbSwgeyBoaWdobGlnaHRSb3c6IHNob3VsZEhpZ2hsaWdodFJvdywgdHJpZ2dlckV2ZW50OiBzaG91bGRUcmlnZ2VyRXZlbnQsIHNlbGVjdFJvdzogc2hvdWxkU2VsZWN0Um93IH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXBkYXRlIGFuIGV4aXN0aW5nIGl0ZW0gd2l0aCBuZXcgcHJvcGVydGllcyBpbnNpZGUgdGhlIGRhdGFncmlkXHJcbiAgICogQHBhcmFtIGl0ZW0gb2JqZWN0IHdoaWNoIG11c3QgY29udGFpbiBhIHVuaXF1ZSBcImlkXCIgcHJvcGVydHkgYW5kIGFueSBvdGhlciBzdWl0YWJsZSBwcm9wZXJ0aWVzXHJcbiAgICogQHBhcmFtIG9wdGlvbnM6IHByb3ZpZGUgdGhlIHBvc3NpYmlsaXR5IHRvIGRvIGNlcnRhaW4gYWN0aW9ucyBhZnRlciBvciBkdXJpbmcgdGhlIHVwc2VydCAoaGlnaGxpZ2h0Um93LCBzZWxlY3RSb3csIHRyaWdnZXJFdmVudClcclxuICAgKiBAcmV0dXJuIGdyaWQgcm93IGluZGV4XHJcbiAgICovXHJcbiAgdXBkYXRlSXRlbShpdGVtOiBhbnksIG9wdGlvbnM/OiBHcmlkU2VydmljZVVwZGF0ZU9wdGlvbik6IG51bWJlciB7XHJcbiAgICBvcHRpb25zID0geyAuLi5HcmlkU2VydmljZVVwZGF0ZU9wdGlvbkRlZmF1bHRzLCAuLi5vcHRpb25zIH07XHJcbiAgICBjb25zdCBpdGVtSWQgPSAoIWl0ZW0gfHwgIWl0ZW0uaGFzT3duUHJvcGVydHkoJ2lkJykpID8gdW5kZWZpbmVkIDogaXRlbS5pZDtcclxuXHJcbiAgICBpZiAoaXRlbUlkID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYWxsaW5nIFVwZGF0ZSBvZiBhbiBpdGVtIHJlcXVpcmVzIHRoZSBpdGVtIHRvIGluY2x1ZGUgYW4gXCJpZFwiIHByb3BlcnR5YCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMudXBkYXRlSXRlbUJ5SWQoaXRlbUlkLCBpdGVtLCBvcHRpb25zKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwZGF0ZSBhbiBhcnJheSBvZiBleGlzdGluZyBpdGVtcyB3aXRoIG5ldyBwcm9wZXJ0aWVzIGluc2lkZSB0aGUgZGF0YWdyaWRcclxuICAgKiBAcGFyYW0gaXRlbSBvYmplY3QgYXJyYXlzLCB3aGljaCBtdXN0IGNvbnRhaW4gdW5pcXVlIFwiaWRcIiBwcm9wZXJ0eSBhbmQgYW55IG90aGVyIHN1aXRhYmxlIHByb3BlcnRpZXNcclxuICAgKiBAcGFyYW0gb3B0aW9uczogcHJvdmlkZSB0aGUgcG9zc2liaWxpdHkgdG8gZG8gY2VydGFpbiBhY3Rpb25zIGFmdGVyIG9yIGR1cmluZyB0aGUgdXBzZXJ0IChoaWdobGlnaHRSb3csIHNlbGVjdFJvdywgdHJpZ2dlckV2ZW50KVxyXG4gICAqIEByZXR1cm4gZ3JpZCByb3cgaW5kZXhlc1xyXG4gICAqL1xyXG4gIHVwZGF0ZUl0ZW1zKGl0ZW1zOiBhbnkgfCBhbnlbXSwgb3B0aW9ucz86IEdyaWRTZXJ2aWNlVXBkYXRlT3B0aW9uKTogbnVtYmVyW10ge1xyXG4gICAgb3B0aW9ucyA9IHsgLi4uR3JpZFNlcnZpY2VVcGRhdGVPcHRpb25EZWZhdWx0cywgLi4ub3B0aW9ucyB9O1xyXG5cclxuICAgIC8vIHdoZW4gaXQncyBub3QgYW4gYXJyYXksIHdlIGNhbiBjYWxsIGRpcmVjdGx5IHRoZSBzaW5nbGUgaXRlbSB1cGRhdGVcclxuICAgIGlmICghQXJyYXkuaXNBcnJheShpdGVtcykpIHtcclxuICAgICAgcmV0dXJuIFt0aGlzLnVwZGF0ZUl0ZW0oaXRlbXMsIG9wdGlvbnMpXTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBncmlkUm93TnVtYmVyczogbnVtYmVyW10gPSBbXTtcclxuICAgIGl0ZW1zLmZvckVhY2goKGl0ZW06IGFueSkgPT4ge1xyXG4gICAgICBncmlkUm93TnVtYmVycy5wdXNoKHRoaXMudXBkYXRlSXRlbShpdGVtLCB7IGhpZ2hsaWdodFJvdzogZmFsc2UsIHNlbGVjdFJvdzogZmFsc2UsIHRyaWdnZXJFdmVudDogZmFsc2UgfSkpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gb25seSBoaWdobGlnaHQgYXQgdGhlIGVuZCwgYWxsIGF0IG9uY2VcclxuICAgIC8vIHdlIGhhdmUgdG8gZG8gdGhpcyBiZWNhdXNlIGRvaW5nIGhpZ2hsaWdodCAxIGJ5IDEgd291bGQgb25seSByZS1zZWxlY3QgdGhlIGxhc3QgaGlnaGxpZ2h0ZWQgcm93IHdoaWNoIGlzIHdyb25nIGJlaGF2aW9yXHJcbiAgICBpZiAob3B0aW9ucy5oaWdobGlnaHRSb3cpIHtcclxuICAgICAgdGhpcy5oaWdobGlnaHRSb3coZ3JpZFJvd051bWJlcnMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHNlbGVjdCB0aGUgcm93IGluIHRoZSBncmlkXHJcbiAgICBpZiAob3B0aW9ucy5zZWxlY3RSb3cgJiYgdGhpcy5fZ3JpZE9wdGlvbnMgJiYgKHRoaXMuX2dyaWRPcHRpb25zLmVuYWJsZUNoZWNrYm94U2VsZWN0b3IgfHwgdGhpcy5fZ3JpZE9wdGlvbnMuZW5hYmxlUm93U2VsZWN0aW9uKSkge1xyXG4gICAgICB0aGlzLl9ncmlkLnNldFNlbGVjdGVkUm93cyhncmlkUm93TnVtYmVycyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZG8gd2Ugd2FudCB0byB0cmlnZ2VyIGFuIGV2ZW50IGFmdGVyIHVwZGF0aW5nIHRoZSBpdGVtXHJcbiAgICBpZiAob3B0aW9ucy50cmlnZ2VyRXZlbnQpIHtcclxuICAgICAgdGhpcy5vbkl0ZW1VcGRhdGVkLm5leHQoaXRlbXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBncmlkUm93TnVtYmVycztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwZGF0ZSBhbiBleGlzdGluZyBpdGVtIGluIHRoZSBkYXRhZ3JpZCBieSBpdCdzIGlkIGFuZCBuZXcgcHJvcGVydGllc1xyXG4gICAqIEBwYXJhbSBpdGVtSWQ6IGl0ZW0gdW5pcXVlIGlkXHJcbiAgICogQHBhcmFtIGl0ZW0gb2JqZWN0IHdoaWNoIG11c3QgY29udGFpbiBhIHVuaXF1ZSBcImlkXCIgcHJvcGVydHkgYW5kIGFueSBvdGhlciBzdWl0YWJsZSBwcm9wZXJ0aWVzXHJcbiAgICogQHBhcmFtIG9wdGlvbnM6IHByb3ZpZGUgdGhlIHBvc3NpYmlsaXR5IHRvIGRvIGNlcnRhaW4gYWN0aW9ucyBhZnRlciBvciBkdXJpbmcgdGhlIHVwc2VydCAoaGlnaGxpZ2h0Um93LCBzZWxlY3RSb3csIHRyaWdnZXJFdmVudClcclxuICAgKiBAcmV0dXJuIGdyaWQgcm93IG51bWJlclxyXG4gICAqL1xyXG4gIHVwZGF0ZUl0ZW1CeUlkKGl0ZW1JZDogbnVtYmVyIHwgc3RyaW5nLCBpdGVtOiBhbnksIG9wdGlvbnM/OiBHcmlkU2VydmljZVVwZGF0ZU9wdGlvbik6IG51bWJlciB7XHJcbiAgICBvcHRpb25zID0geyAuLi5HcmlkU2VydmljZVVwZGF0ZU9wdGlvbkRlZmF1bHRzLCAuLi5vcHRpb25zIH07XHJcbiAgICBpZiAoaXRlbUlkID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYW5ub3QgdXBkYXRlIGEgcm93IHdpdGhvdXQgYSB2YWxpZCBcImlkXCJgKTtcclxuICAgIH1cclxuICAgIGNvbnN0IHJvd051bWJlciA9IHRoaXMuX2RhdGFWaWV3LmdldFJvd0J5SWQoaXRlbUlkKTtcclxuXHJcbiAgICBpZiAoIWl0ZW0gfHwgcm93TnVtYmVyID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgaXRlbSB0byB1cGRhdGUgaW4gdGhlIGdyaWQgd2FzIG5vdCBmb3VuZCB3aXRoIGlkOiAke2l0ZW1JZH1gKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5fZGF0YVZpZXcuZ2V0SWR4QnlJZChpdGVtSWQpICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgLy8gVXBkYXRlIHRoZSBpdGVtIGl0c2VsZiBpbnNpZGUgdGhlIGRhdGFWaWV3XHJcbiAgICAgIHRoaXMuX2RhdGFWaWV3LnVwZGF0ZUl0ZW0oaXRlbUlkLCBpdGVtKTtcclxuICAgICAgdGhpcy5fZ3JpZC51cGRhdGVSb3cocm93TnVtYmVyKTtcclxuXHJcbiAgICAgIC8vIGhpZ2hsaWdodCB0aGUgcm93IHdlIGp1c3QgdXBkYXRlZCwgaWYgZGVmaW5lZFxyXG4gICAgICBpZiAob3B0aW9ucy5oaWdobGlnaHRSb3cpIHtcclxuICAgICAgICB0aGlzLmhpZ2hsaWdodFJvdyhyb3dOdW1iZXIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBzZWxlY3QgdGhlIHJvdyBpbiB0aGUgZ3JpZFxyXG4gICAgICBpZiAob3B0aW9ucy5zZWxlY3RSb3cgJiYgdGhpcy5fZ3JpZE9wdGlvbnMgJiYgKHRoaXMuX2dyaWRPcHRpb25zLmVuYWJsZUNoZWNrYm94U2VsZWN0b3IgfHwgdGhpcy5fZ3JpZE9wdGlvbnMuZW5hYmxlUm93U2VsZWN0aW9uKSkge1xyXG4gICAgICAgIHRoaXMuX2dyaWQuc2V0U2VsZWN0ZWRSb3dzKHJvd051bWJlcik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIGRvIHdlIHdhbnQgdG8gdHJpZ2dlciBhbiBldmVudCBhZnRlciB1cGRhdGluZyB0aGUgaXRlbVxyXG4gICAgICBpZiAob3B0aW9ucy50cmlnZ2VyRXZlbnQpIHtcclxuICAgICAgICB0aGlzLm9uSXRlbVVwZGF0ZWQubmV4dChpdGVtKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJvd051bWJlcjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEluc2VydCBhIHJvdyBpbnRvIHRoZSBncmlkIGlmIGl0IGRvZXNuJ3QgYWxyZWFkeSBleGlzdCBvciB1cGRhdGUgaWYgaXQgZG9lcy5cclxuICAgKiBAcGFyYW0gaXRlbSBvYmplY3Qgd2hpY2ggbXVzdCBjb250YWluIGEgdW5pcXVlIFwiaWRcIiBwcm9wZXJ0eSBhbmQgYW55IG90aGVyIHN1aXRhYmxlIHByb3BlcnRpZXNcclxuICAgKiBAcGFyYW0gb3B0aW9uczogcHJvdmlkZSB0aGUgcG9zc2liaWxpdHkgdG8gZG8gY2VydGFpbiBhY3Rpb25zIGFmdGVyIG9yIGR1cmluZyB0aGUgdXBzZXJ0IChoaWdobGlnaHRSb3csIHJlc29ydEdyaWQsIHNlbGVjdFJvdywgdHJpZ2dlckV2ZW50KVxyXG4gICAqL1xyXG4gIHVwc2VydEl0ZW0oaXRlbTogYW55LCBvcHRpb25zPzogR3JpZFNlcnZpY2VJbnNlcnRPcHRpb24pOiBudW1iZXIge1xyXG4gICAgb3B0aW9ucyA9IHsgLi4uR3JpZFNlcnZpY2VJbnNlcnRPcHRpb25EZWZhdWx0cywgLi4ub3B0aW9ucyB9O1xyXG4gICAgY29uc3QgaXRlbUlkID0gKCFpdGVtIHx8ICFpdGVtLmhhc093blByb3BlcnR5KCdpZCcpKSA/IHVuZGVmaW5lZCA6IGl0ZW0uaWQ7XHJcblxyXG4gICAgaWYgKGl0ZW1JZCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQ2FsbGluZyBVcHNlcnQgb2YgYW4gaXRlbSByZXF1aXJlcyB0aGUgaXRlbSB0byBpbmNsdWRlIGFuIFwiaWRcIiBwcm9wZXJ0eWApO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLnVwc2VydEl0ZW1CeUlkKGl0ZW1JZCwgaXRlbSwgb3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVcGRhdGUgYW4gYXJyYXkgb2YgZXhpc3RpbmcgaXRlbXMgd2l0aCBuZXcgcHJvcGVydGllcyBpbnNpZGUgdGhlIGRhdGFncmlkXHJcbiAgICogQHBhcmFtIGl0ZW0gb2JqZWN0IGFycmF5cywgd2hpY2ggbXVzdCBjb250YWluIHVuaXF1ZSBcImlkXCIgcHJvcGVydHkgYW5kIGFueSBvdGhlciBzdWl0YWJsZSBwcm9wZXJ0aWVzXHJcbiAgICogQHBhcmFtIG9wdGlvbnM6IHByb3ZpZGUgdGhlIHBvc3NpYmlsaXR5IHRvIGRvIGNlcnRhaW4gYWN0aW9ucyBhZnRlciBvciBkdXJpbmcgdGhlIHVwc2VydCAoaGlnaGxpZ2h0Um93LCByZXNvcnRHcmlkLCBzZWxlY3RSb3csIHRyaWdnZXJFdmVudClcclxuICAgKiBAcmV0dXJuIHJvdyBudW1iZXJzIGluIHRoZSBncmlkXHJcbiAgICovXHJcbiAgdXBzZXJ0SXRlbXMoaXRlbXM6IGFueSB8IGFueVtdLCBvcHRpb25zPzogR3JpZFNlcnZpY2VJbnNlcnRPcHRpb24pOiBudW1iZXJbXSB7XHJcbiAgICBvcHRpb25zID0geyAuLi5HcmlkU2VydmljZUluc2VydE9wdGlvbkRlZmF1bHRzLCAuLi5vcHRpb25zIH07XHJcbiAgICAvLyB3aGVuIGl0J3Mgbm90IGFuIGFycmF5LCB3ZSBjYW4gY2FsbCBkaXJlY3RseSB0aGUgc2luZ2xlIGl0ZW0gdXBkYXRlXHJcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoaXRlbXMpKSB7XHJcbiAgICAgIHJldHVybiBbdGhpcy51cHNlcnRJdGVtKGl0ZW1zLCBvcHRpb25zKV07XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZ3JpZFJvd051bWJlcnM6IG51bWJlcltdID0gW107XHJcbiAgICBpdGVtcy5mb3JFYWNoKChpdGVtOiBhbnkpID0+IHtcclxuICAgICAgZ3JpZFJvd051bWJlcnMucHVzaCh0aGlzLnVwc2VydEl0ZW0oaXRlbSwgeyBoaWdobGlnaHRSb3c6IGZhbHNlLCByZXNvcnRHcmlkOiBmYWxzZSwgc2VsZWN0Um93OiBmYWxzZSwgdHJpZ2dlckV2ZW50OiBmYWxzZSB9KSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBvbmx5IGhpZ2hsaWdodCBhdCB0aGUgZW5kLCBhbGwgYXQgb25jZVxyXG4gICAgLy8gd2UgaGF2ZSB0byBkbyB0aGlzIGJlY2F1c2UgZG9pbmcgaGlnaGxpZ2h0IDEgYnkgMSB3b3VsZCBvbmx5IHJlLXNlbGVjdCB0aGUgbGFzdCBoaWdobGlnaHRlZCByb3cgd2hpY2ggaXMgd3JvbmcgYmVoYXZpb3JcclxuICAgIGlmIChvcHRpb25zLmhpZ2hsaWdodFJvdykge1xyXG4gICAgICB0aGlzLmhpZ2hsaWdodFJvdyhncmlkUm93TnVtYmVycyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gc2VsZWN0IHRoZSByb3cgaW4gdGhlIGdyaWRcclxuICAgIGlmIChvcHRpb25zLnNlbGVjdFJvdyAmJiB0aGlzLl9ncmlkT3B0aW9ucyAmJiAodGhpcy5fZ3JpZE9wdGlvbnMuZW5hYmxlQ2hlY2tib3hTZWxlY3RvciB8fCB0aGlzLl9ncmlkT3B0aW9ucy5lbmFibGVSb3dTZWxlY3Rpb24pKSB7XHJcbiAgICAgIHRoaXMuX2dyaWQuc2V0U2VsZWN0ZWRSb3dzKGdyaWRSb3dOdW1iZXJzKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBkbyB3ZSB3YW50IHRvIHRyaWdnZXIgYW4gZXZlbnQgYWZ0ZXIgdXBkYXRpbmcgdGhlIGl0ZW1cclxuICAgIGlmIChvcHRpb25zLnRyaWdnZXJFdmVudCkge1xyXG4gICAgICB0aGlzLm9uSXRlbVVwc2VydGVkLm5leHQoaXRlbXMpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGdyaWRSb3dOdW1iZXJzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXBkYXRlIGFuIGV4aXN0aW5nIGl0ZW0gaW4gdGhlIGRhdGFncmlkIGJ5IGl0J3MgaWQgYW5kIG5ldyBwcm9wZXJ0aWVzXHJcbiAgICogQHBhcmFtIGl0ZW1JZDogaXRlbSB1bmlxdWUgaWRcclxuICAgKiBAcGFyYW0gaXRlbSBvYmplY3Qgd2hpY2ggbXVzdCBjb250YWluIGEgdW5pcXVlIFwiaWRcIiBwcm9wZXJ0eSBhbmQgYW55IG90aGVyIHN1aXRhYmxlIHByb3BlcnRpZXNcclxuICAgKiBAcGFyYW0gb3B0aW9uczogcHJvdmlkZSB0aGUgcG9zc2liaWxpdHkgdG8gZG8gY2VydGFpbiBhY3Rpb25zIGFmdGVyIG9yIGR1cmluZyB0aGUgdXBzZXJ0IChoaWdobGlnaHRSb3csIHJlc29ydEdyaWQsIHNlbGVjdFJvdywgdHJpZ2dlckV2ZW50KVxyXG4gICAqIEByZXR1cm4gZ3JpZCByb3cgbnVtYmVyIGluIHRoZSBncmlkXHJcbiAgICovXHJcbiAgdXBzZXJ0SXRlbUJ5SWQoaXRlbUlkOiBudW1iZXIgfCBzdHJpbmcsIGl0ZW06IGFueSwgb3B0aW9ucz86IEdyaWRTZXJ2aWNlSW5zZXJ0T3B0aW9uKTogbnVtYmVyIHtcclxuICAgIG9wdGlvbnMgPSB7IC4uLkdyaWRTZXJ2aWNlSW5zZXJ0T3B0aW9uRGVmYXVsdHMsIC4uLm9wdGlvbnMgfTtcclxuICAgIGlmIChpdGVtSWQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYENhbGxpbmcgVXBzZXJ0IG9mIGFuIGl0ZW0gcmVxdWlyZXMgdGhlIGl0ZW0gdG8gaW5jbHVkZSBhIHZhbGlkIGFuZCB1bmlxdWUgXCJpZFwiIHByb3BlcnR5YCk7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHJvd051bWJlcjogbnVtYmVyO1xyXG4gICAgaWYgKHRoaXMuX2RhdGFWaWV3LmdldFJvd0J5SWQoaXRlbUlkKSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHJvd051bWJlciA9IHRoaXMuYWRkSXRlbShpdGVtLCBvcHRpb25zKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJvd051bWJlciA9IHRoaXMudXBkYXRlSXRlbShpdGVtLCB7IGhpZ2hsaWdodFJvdzogb3B0aW9ucy5oaWdobGlnaHRSb3csIHNlbGVjdFJvdzogb3B0aW9ucy5zZWxlY3RSb3csIHRyaWdnZXJFdmVudDogb3B0aW9ucy50cmlnZ2VyRXZlbnQgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZG8gd2Ugd2FudCB0byB0cmlnZ2VyIGFuIGV2ZW50IGFmdGVyIHVwZGF0aW5nIHRoZSBpdGVtXHJcbiAgICBpZiAob3B0aW9ucy50cmlnZ2VyRXZlbnQpIHtcclxuICAgICAgdGhpcy5vbkl0ZW1VcHNlcnRlZC5uZXh0KGl0ZW0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJvd051bWJlcjtcclxuICB9XHJcbn1cclxuIl19