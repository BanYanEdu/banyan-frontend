import { CellArgs, Column, GridServiceDeleteOption, GridServiceInsertOption, GridServiceUpdateOption, OnEventArgs } from './../models/index';
import { ExtensionService } from './extension.service';
import { FilterService } from './filter.service';
import { GridStateService } from './gridState.service';
import { SortService } from './sort.service';
import { Subject } from 'rxjs';
export declare class GridService {
    private extensionService;
    private filterService;
    private gridStateService;
    private sortService;
    private _grid;
    private _dataView;
    onItemAdded: Subject<any>;
    onItemDeleted: Subject<any>;
    onItemUpdated: Subject<any>;
    onItemUpserted: Subject<any>;
    constructor(extensionService: ExtensionService, filterService: FilterService, gridStateService: GridStateService, sortService: SortService);
    /** Getter for the Grid Options pulled through the Grid Object */
    private readonly _gridOptions;
    init(grid: any, dataView: any): void;
    /** Clear all Filters & Sorts */
    clearAllFiltersAndSorts(): void;
    /**
     * From a SlickGrid Event triggered get the Column Definition and Item Data Context
     *
     * For example the SlickGrid onClick will return cell arguments when subscribing to it.
     * From these cellArgs, we want to get the Column Definition and Item Data
     * @param cell event args
     * @return object with columnDef and dataContext
     */
    getColumnFromEventArguments(args: CellArgs): OnEventArgs;
    /** Get data item by it's row index number */
    getDataItemByRowNumber(rowNumber: number): any;
    /** Chain the item Metadata with our implementation of Metadata at given row index */
    getItemRowMetadataToHighlight(previousItemMetadata: any): (rowNumber: number) => {
        cssClasses: string;
    };
    /**
     * Highlight then fade a row for x seconds.
     * The implementation follows this SO answer: https://stackoverflow.com/a/19985148/1212166
     * @param rowNumber
     * @param fadeDelay
     */
    highlightRow(rowNumber: number | number[], fadeDelay?: number, fadeOutDelay?: number): void;
    highlightRowByMetadata(rowNumber: number, fadeDelay?: number, fadeOutDelay?: number): void;
    /** Get the Data Item from a grid row index */
    getDataItemByRowIndex(index: number): any;
    /** Get the Data Item from an array of grid row indexes */
    getDataItemByRowIndexes(indexes: number[]): any[];
    /** Get the currently selected row indexes */
    getSelectedRows(): number[];
    /** Get the currently selected rows item data */
    getSelectedRowsDataItem(): any[];
    /** Select the selected row by a row index */
    setSelectedRow(rowIndex: number): void;
    /** Set selected rows with provided array of row indexes */
    setSelectedRows(rowIndexes: number[]): void;
    /** Re-Render the Grid */
    renderGrid(): void;
    /**
     * Reset the grid to it's original state (clear any filters, sorting & pagination if exists) .
     * The column definitions could be passed as argument to reset (this can be used after a Grid State reset)
     * The reset will clear the Filters & Sort, then will reset the Columns to their original state
     */
    resetGrid(columnDefinitions?: Column[]): void;
    /** @deprecated please use "addItem" method instead */
    addItemToDatagrid(item: any, shouldHighlightRow?: boolean, shouldResortGrid?: boolean, shouldTriggerEvent?: boolean, shouldSelectRow?: boolean): number;
    /** @deprecated please use "addItems" method instead */
    addItemsToDatagrid(items: any[], shouldHighlightRow?: boolean, shouldResortGrid?: boolean, shouldTriggerEvent?: boolean, shouldSelectRow?: boolean): number[];
    /**
     * Add an item (data item) to the datagrid, by default it will highlight (flashing) the inserted row but we can disable it too
     * @param item object which must contain a unique "id" property and any other suitable properties
     * @param options: provide the possibility to do certain actions after or during the upsert (highlightRow, resortGrid, selectRow, triggerEvent)
     * @return rowIndex: typically index 0
     */
    addItem(item: any, options?: GridServiceInsertOption): number;
    /**
     * Add item array (data item) to the datagrid, by default it will highlight (flashing) the inserted row but we can disable it too
     * @param item object arrays, which must contain unique "id" property and any other suitable properties
     * @param options: provide the possibility to do certain actions after or during the upsert (highlightRow, resortGrid, selectRow, triggerEvent)
     */
    addItems(items: any | any[], options?: GridServiceInsertOption): number[];
    /** @deprecated please use "deleteItem" method instead */
    deleteDataGridItem(item: any, shouldTriggerEvent?: boolean): void;
    /** @deprecated please use "deleteItems" method instead */
    deleteDataGridItems(items: any[], shouldTriggerEvent?: boolean): void;
    /** @deprecated please use "deleteItemById" method instead */
    deleteDataGridItemById(itemId: string | number, shouldTriggerEvent?: boolean): void;
    /** @deprecated please use "deleteItemByIds" method instead */
    deleteDataGridItemByIds(itemIds: number[] | string[], shouldTriggerEvent?: boolean): void;
    /**
     * Delete an existing item from the datagrid (dataView)
     * @param item object which must contain a unique "id" property and any other suitable properties
     * @param options: provide the possibility to do certain actions after or during the upsert (triggerEvent)
     * @return item id deleted
     */
    deleteItem(item: any, options?: GridServiceDeleteOption): number | string;
    /**
     * Delete an array of existing items from the datagrid
     * @param item object which must contain a unique "id" property and any other suitable properties
     * @param options: provide the possibility to do certain actions after or during the upsert (triggerEvent)
     * @return item id deleted
     */
    deleteItems(items: any | any[], options?: GridServiceDeleteOption): number[] | string[];
    /**
     * Delete an existing item from the datagrid (dataView) by it's id
     * @param itemId: item unique id
     * @param options: provide the possibility to do certain actions after or during the upsert (triggerEvent)
     * @return item id deleted
     */
    deleteItemById(itemId: string | number, options?: GridServiceDeleteOption): number | string;
    /**
     * Delete an array of existing items from the datagrid
     * @param itemIds array of item unique IDs
     * @param options: provide the possibility to do certain actions after or during the upsert (triggerEvent)
     */
    deleteItemByIds(itemIds: number[] | string[], options?: GridServiceDeleteOption): number[] | string[];
    /** @deprecated please use "updateItem" method instead */
    updateDataGridItem(item: any, shouldHighlightRow?: boolean, shouldTriggerEvent?: boolean, shouldSelectRow?: boolean): number;
    /** @deprecated please use "updateItems" method instead */
    updateDataGridItems(items: any | any[], shouldHighlightRow?: boolean, shouldTriggerEvent?: boolean, shouldSelectRow?: boolean): number[];
    /** @deprecated please use "updateItemById" method instead */
    updateDataGridItemById(itemId: number | string, item: any, shouldHighlightRow?: boolean, shouldTriggerEvent?: boolean, shouldSelectRow?: boolean): number;
    /**
     * Update an existing item with new properties inside the datagrid
     * @param item object which must contain a unique "id" property and any other suitable properties
     * @param options: provide the possibility to do certain actions after or during the upsert (highlightRow, selectRow, triggerEvent)
     * @return grid row index
     */
    updateItem(item: any, options?: GridServiceUpdateOption): number;
    /**
     * Update an array of existing items with new properties inside the datagrid
     * @param item object arrays, which must contain unique "id" property and any other suitable properties
     * @param options: provide the possibility to do certain actions after or during the upsert (highlightRow, selectRow, triggerEvent)
     * @return grid row indexes
     */
    updateItems(items: any | any[], options?: GridServiceUpdateOption): number[];
    /**
     * Update an existing item in the datagrid by it's id and new properties
     * @param itemId: item unique id
     * @param item object which must contain a unique "id" property and any other suitable properties
     * @param options: provide the possibility to do certain actions after or during the upsert (highlightRow, selectRow, triggerEvent)
     * @return grid row number
     */
    updateItemById(itemId: number | string, item: any, options?: GridServiceUpdateOption): number;
    /**
     * Insert a row into the grid if it doesn't already exist or update if it does.
     * @param item object which must contain a unique "id" property and any other suitable properties
     * @param options: provide the possibility to do certain actions after or during the upsert (highlightRow, resortGrid, selectRow, triggerEvent)
     */
    upsertItem(item: any, options?: GridServiceInsertOption): number;
    /**
     * Update an array of existing items with new properties inside the datagrid
     * @param item object arrays, which must contain unique "id" property and any other suitable properties
     * @param options: provide the possibility to do certain actions after or during the upsert (highlightRow, resortGrid, selectRow, triggerEvent)
     * @return row numbers in the grid
     */
    upsertItems(items: any | any[], options?: GridServiceInsertOption): number[];
    /**
     * Update an existing item in the datagrid by it's id and new properties
     * @param itemId: item unique id
     * @param item object which must contain a unique "id" property and any other suitable properties
     * @param options: provide the possibility to do certain actions after or during the upsert (highlightRow, resortGrid, selectRow, triggerEvent)
     * @return grid row number in the grid
     */
    upsertItemById(itemId: number | string, item: any, options?: GridServiceInsertOption): number;
}
