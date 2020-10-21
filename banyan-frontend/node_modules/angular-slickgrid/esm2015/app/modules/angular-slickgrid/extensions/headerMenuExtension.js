import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Constants } from '../constants';
import { ExtensionName, } from '../models/index';
import { FilterService } from '../services/filter.service';
import { SortService } from '../services/sort.service';
import { SharedService } from '../services/shared.service';
import { ExtensionUtility } from './extensionUtility';
let HeaderMenuExtension = class HeaderMenuExtension {
    constructor(extensionUtility, filterService, sharedService, sortService, translate) {
        this.extensionUtility = extensionUtility;
        this.filterService = filterService;
        this.sharedService = sharedService;
        this.sortService = sortService;
        this.translate = translate;
        this._eventHandler = new Slick.EventHandler();
    }
    get eventHandler() {
        return this._eventHandler;
    }
    dispose() {
        // unsubscribe all SlickGrid events
        this._eventHandler.unsubscribeAll();
        if (this._addon && this._addon.destroy) {
            this._addon.destroy();
        }
    }
    /**
    * Create the Header Menu and expose all the available hooks that user can subscribe (onCommand, onBeforeMenuShow, ...)
    * @param grid
    * @param dataView
    * @param columnDefinitions
    */
    register() {
        if (this.sharedService && this.sharedService.grid && this.sharedService.gridOptions) {
            // dynamically import the SlickGrid plugin (addon) with RequireJS
            this.extensionUtility.loadExtensionDynamically(ExtensionName.headerMenu);
            this.sharedService.gridOptions.headerMenu = Object.assign({}, this.getDefaultHeaderMenuOptions(), this.sharedService.gridOptions.headerMenu);
            if (this.sharedService.gridOptions.enableHeaderMenu) {
                this.sharedService.gridOptions.headerMenu = this.addHeaderMenuCustomCommands(this.sharedService.gridOptions, this.sharedService.columnDefinitions);
            }
            this._addon = new Slick.Plugins.HeaderMenu(this.sharedService.gridOptions.headerMenu);
            this.sharedService.grid.registerPlugin(this._addon);
            // hook all events
            if (this.sharedService.grid && this.sharedService.gridOptions.headerMenu) {
                if (this.sharedService.gridOptions.headerMenu.onExtensionRegistered) {
                    this.sharedService.gridOptions.headerMenu.onExtensionRegistered(this._addon);
                }
                this._eventHandler.subscribe(this._addon.onCommand, (e, args) => {
                    this.executeHeaderMenuInternalCommands(e, args);
                    if (this.sharedService.gridOptions.headerMenu && typeof this.sharedService.gridOptions.headerMenu.onCommand === 'function') {
                        this.sharedService.gridOptions.headerMenu.onCommand(e, args);
                    }
                });
                this._eventHandler.subscribe(this._addon.onBeforeMenuShow, (e, args) => {
                    if (this.sharedService.gridOptions.headerMenu && typeof this.sharedService.gridOptions.headerMenu.onBeforeMenuShow === 'function') {
                        this.sharedService.gridOptions.headerMenu.onBeforeMenuShow(e, args);
                    }
                });
            }
            return this._addon;
        }
        return null;
    }
    /**
     * Create Header Menu with Custom Commands if user has enabled Header Menu
     * @param options
     * @param columnDefinitions
     * @return header menu
     */
    addHeaderMenuCustomCommands(options, columnDefinitions) {
        const headerMenuOptions = options.headerMenu || {};
        if (columnDefinitions && Array.isArray(columnDefinitions) && options.enableHeaderMenu) {
            columnDefinitions.forEach((columnDef) => {
                if (columnDef && !columnDef.excludeFromHeaderMenu) {
                    if (!columnDef.header || !columnDef.header.menu) {
                        columnDef.header = {
                            menu: {
                                items: []
                            }
                        };
                    }
                    const columnHeaderMenuItems = columnDef && columnDef.header && columnDef.header.menu && columnDef.header.menu.items || [];
                    // Sorting Commands
                    if (options.enableSorting && columnDef.sortable && headerMenuOptions && !headerMenuOptions.hideSortCommands) {
                        if (columnHeaderMenuItems.filter((item) => item.command === 'sort-asc').length === 0) {
                            columnHeaderMenuItems.push({
                                iconCssClass: headerMenuOptions.iconSortAscCommand || 'fa fa-sort-asc',
                                title: options.enableTranslate ? this.translate.instant('SORT_ASCENDING') : Constants.TEXT_SORT_ASCENDING,
                                command: 'sort-asc',
                                positionOrder: 50
                            });
                        }
                        if (columnHeaderMenuItems.filter((item) => item.command === 'sort-desc').length === 0) {
                            columnHeaderMenuItems.push({
                                iconCssClass: headerMenuOptions.iconSortDescCommand || 'fa fa-sort-desc',
                                title: options.enableTranslate ? this.translate.instant('SORT_DESCENDING') : Constants.TEXT_SORT_DESCENDING,
                                command: 'sort-desc',
                                positionOrder: 51
                            });
                        }
                        // add a divider (separator) between the top sort commands and the other clear commands
                        if (columnHeaderMenuItems.filter((item) => item.positionOrder === 52).length === 0) {
                            columnHeaderMenuItems.push({ divider: true, command: '', positionOrder: 52 });
                        }
                        if (!headerMenuOptions.hideClearSortCommand && columnHeaderMenuItems.filter((item) => item.command === 'clear-sort').length === 0) {
                            columnHeaderMenuItems.push({
                                iconCssClass: headerMenuOptions.iconClearSortCommand || 'fa fa-unsorted',
                                title: options.enableTranslate ? this.translate.instant('REMOVE_SORT') : Constants.TEXT_REMOVE_SORT,
                                command: 'clear-sort',
                                positionOrder: 54
                            });
                        }
                    }
                    // Filtering Commands
                    if (options.enableFiltering && columnDef.filterable && headerMenuOptions && !headerMenuOptions.hideFilterCommands) {
                        if (!headerMenuOptions.hideClearFilterCommand && columnHeaderMenuItems.filter((item) => item.command === 'clear-filter').length === 0) {
                            columnHeaderMenuItems.push({
                                iconCssClass: headerMenuOptions.iconClearFilterCommand || 'fa fa-filter',
                                title: options.enableTranslate ? this.translate.instant('REMOVE_FILTER') : Constants.TEXT_REMOVE_FILTER,
                                command: 'clear-filter',
                                positionOrder: 53
                            });
                        }
                    }
                    // Hide Column Command
                    if (headerMenuOptions && !headerMenuOptions.hideColumnHideCommand && columnHeaderMenuItems.filter((item) => item.command === 'hide').length === 0) {
                        columnHeaderMenuItems.push({
                            iconCssClass: headerMenuOptions.iconColumnHideCommand || 'fa fa-times',
                            title: options.enableTranslate ? this.translate.instant('HIDE_COLUMN') : Constants.TEXT_HIDE_COLUMN,
                            command: 'hide',
                            positionOrder: 55
                        });
                    }
                    this.extensionUtility.translateItems(columnHeaderMenuItems, 'titleKey', 'title');
                    this.extensionUtility.sortItems(columnHeaderMenuItems, 'positionOrder');
                }
            });
        }
        return headerMenuOptions;
    }
    /** Hide a column from the grid */
    hideColumn(column) {
        if (this.sharedService.grid && this.sharedService.grid.getColumns && this.sharedService.grid.setColumns && this.sharedService.grid.getColumnIndex) {
            const columnIndex = this.sharedService.grid.getColumnIndex(column.id);
            const currentColumns = this.sharedService.grid.getColumns();
            const visibleColumns = this.extensionUtility.arrayRemoveItemByIndex(currentColumns, columnIndex);
            this.sharedService.visibleColumns = visibleColumns;
            this.sharedService.grid.setColumns(visibleColumns);
        }
    }
    /**
     * Translate the Header Menu titles, we need to loop through all column definition to re-translate them
     */
    translateHeaderMenu() {
        if (this.sharedService.gridOptions && this.sharedService.gridOptions.headerMenu) {
            this.resetHeaderMenuTranslations(this.sharedService.visibleColumns);
        }
    }
    // --
    // private functions
    // ------------------
    /** @return default Header Menu options */
    getDefaultHeaderMenuOptions() {
        return {
            autoAlignOffset: 12,
            minWidth: 140,
            hideColumnHideCommand: false,
            hideSortCommands: false,
            title: ''
        };
    }
    /**
     * Reset all the Grid Menu options which have text to translate
     * @param grid menu object
     */
    resetHeaderMenuTranslations(columnDefinitions) {
        columnDefinitions.forEach((columnDef) => {
            if (columnDef && columnDef.header && columnDef.header && columnDef.header.menu && columnDef.header.menu.items) {
                if (!columnDef.excludeFromHeaderMenu) {
                    const columnHeaderMenuItems = columnDef.header.menu.items || [];
                    columnHeaderMenuItems.forEach((item) => {
                        switch (item.command) {
                            case 'clear-filter':
                                item.title = this.translate.instant('REMOVE_FILTER') || Constants.TEXT_REMOVE_FILTER;
                                break;
                            case 'clear-sort':
                                item.title = this.translate.instant('REMOVE_SORT') || Constants.TEXT_REMOVE_SORT;
                                break;
                            case 'sort-asc':
                                item.title = this.translate.instant('SORT_ASCENDING') || Constants.TEXT_SORT_ASCENDING;
                                break;
                            case 'sort-desc':
                                item.title = this.translate.instant('SORT_DESCENDING') || Constants.TEXT_SORT_DESCENDING;
                                break;
                            case 'hide':
                                item.title = this.translate.instant('HIDE_COLUMN') || Constants.TEXT_HIDE_COLUMN;
                                break;
                        }
                        // re-translate if there's a "titleKey"
                        if (this.sharedService.gridOptions && this.sharedService.gridOptions.enableTranslate) {
                            this.extensionUtility.translateItems(columnHeaderMenuItems, 'titleKey', 'title');
                        }
                    });
                }
            }
        });
    }
    /** Clear the Filter on the current column (if it's actually filtered) */
    clearColumnFilter(event, args) {
        if (args && args.column) {
            this.filterService.clearFilterByColumnId(event, args.column.id);
        }
    }
    /** Clear the Sort on the current column (if it's actually sorted) */
    clearColumnSort(event, args) {
        if (args && args.column && this.sharedService) {
            // get previously sorted columns
            const allSortedCols = this.sortService.getPreviousColumnSorts();
            const sortedColsWithoutCurrent = this.sortService.getPreviousColumnSorts(args.column.id + '');
            if (Array.isArray(allSortedCols) && Array.isArray(sortedColsWithoutCurrent) && allSortedCols.length !== sortedColsWithoutCurrent.length) {
                if (this.sharedService.gridOptions && this.sharedService.gridOptions.backendServiceApi) {
                    this.sortService.onBackendSortChanged(event, { multiColumnSort: true, sortCols: sortedColsWithoutCurrent, grid: this.sharedService.grid });
                }
                else if (this.sharedService.dataView) {
                    this.sortService.onLocalSortChanged(this.sharedService.grid, this.sharedService.dataView, sortedColsWithoutCurrent, true);
                }
                else {
                    // when using customDataView, we will simply send it as a onSort event with notify
                    const isMultiSort = this.sharedService.gridOptions && this.sharedService.gridOptions.multiColumnSort || false;
                    const sortOutput = isMultiSort ? sortedColsWithoutCurrent : sortedColsWithoutCurrent[0];
                    args.grid.onSort.notify(sortOutput);
                }
                // update the this.sharedService.gridObj sortColumns array which will at the same add the visual sort icon(s) on the UI
                const updatedSortColumns = sortedColsWithoutCurrent.map((col) => {
                    return {
                        columnId: col && col.sortCol && col.sortCol.id,
                        sortAsc: col && col.sortAsc
                    };
                });
                this.sharedService.grid.setSortColumns(updatedSortColumns); // add sort icon in UI
            }
        }
    }
    /** Execute the Header Menu Commands that was triggered by the onCommand subscribe */
    executeHeaderMenuInternalCommands(event, args) {
        if (args && args.command) {
            switch (args.command) {
                case 'hide':
                    this.hideColumn(args.column);
                    if (this.sharedService.gridOptions && this.sharedService.gridOptions.enableAutoSizeColumns) {
                        this.sharedService.grid.autosizeColumns();
                    }
                    break;
                case 'clear-filter':
                    this.clearColumnFilter(event, args);
                    break;
                case 'clear-sort':
                    this.clearColumnSort(event, args);
                    break;
                case 'sort-asc':
                case 'sort-desc':
                    const isSortingAsc = (args.command === 'sort-asc');
                    this.sortColumn(event, args, isSortingAsc);
                    break;
                default:
                    break;
            }
        }
    }
    /** Sort the current column */
    sortColumn(event, args, isSortingAsc = true) {
        if (args && args.column) {
            // get previously sorted columns
            const sortedColsWithoutCurrent = this.sortService.getPreviousColumnSorts(args.column.id + '');
            // add to the column array, the column sorted by the header menu
            sortedColsWithoutCurrent.push({ sortCol: args.column, sortAsc: isSortingAsc });
            if (this.sharedService.gridOptions.backendServiceApi) {
                this.sortService.onBackendSortChanged(event, { multiColumnSort: true, sortCols: sortedColsWithoutCurrent, grid: this.sharedService.grid });
            }
            else if (this.sharedService.dataView) {
                this.sortService.onLocalSortChanged(this.sharedService.grid, this.sharedService.dataView, sortedColsWithoutCurrent);
            }
            else {
                // when using customDataView, we will simply send it as a onSort event with notify
                const isMultiSort = this.sharedService && this.sharedService.gridOptions && this.sharedService.gridOptions.multiColumnSort || false;
                const sortOutput = isMultiSort ? sortedColsWithoutCurrent : sortedColsWithoutCurrent[0];
                args.grid.onSort.notify(sortOutput);
            }
            // update the this.sharedService.gridObj sortColumns array which will at the same add the visual sort icon(s) on the UI
            const newSortColumns = sortedColsWithoutCurrent.map((col) => {
                return {
                    columnId: col && col.sortCol && col.sortCol.id,
                    sortAsc: col && col.sortAsc
                };
            });
            this.sharedService.grid.setSortColumns(newSortColumns); // add sort icon in UI
        }
    }
};
HeaderMenuExtension = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [ExtensionUtility,
        FilterService,
        SharedService,
        SortService,
        TranslateService])
], HeaderMenuExtension);
export { HeaderMenuExtension };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyTWVudUV4dGVuc2lvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvZXh0ZW5zaW9ucy9oZWFkZXJNZW51RXh0ZW5zaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDekMsT0FBTyxFQUlMLGFBQWEsR0FPZCxNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzNELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBTXRELElBQWEsbUJBQW1CLEdBQWhDLE1BQWEsbUJBQW1CO0lBSTlCLFlBQ1UsZ0JBQWtDLEVBQ2xDLGFBQTRCLEVBQzVCLGFBQTRCLEVBQzVCLFdBQXdCLEVBQ3hCLFNBQTJCO1FBSjNCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsY0FBUyxHQUFULFNBQVMsQ0FBa0I7UUFFbkMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUNoRCxDQUFDO0lBRUQsSUFBSSxZQUFZO1FBQ2QsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQzVCLENBQUM7SUFFRCxP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QyxFQUFFO29CQUM5QyxPQUFPLEVBQUUsR0FBRyxJQUFJLEdBQUcsQ0FBQyxPQUFPO2lCQUM1QixDQUFDO1lBQ0osQ0FBQyxDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxzQkFBc0I7U0FDL0U7SUFDSCxDQUFDO0NBQ0YsQ0FBQTtBQS9UWSxtQkFBbUI7SUFEL0IsVUFBVSxFQUFFOzZDQU1pQixnQkFBZ0I7UUFDbkIsYUFBYTtRQUNiLGFBQWE7UUFDZixXQUFXO1FBQ2IsZ0JBQWdCO0dBVDFCLG1CQUFtQixDQStUL0I7U0EvVFksbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XHJcbmltcG9ydCB7IENvbnN0YW50cyB9IGZyb20gJy4uL2NvbnN0YW50cyc7XHJcbmltcG9ydCB7XHJcbiAgQ29sdW1uLFxyXG4gIENvbHVtblNvcnQsXHJcbiAgRXh0ZW5zaW9uLFxyXG4gIEV4dGVuc2lvbk5hbWUsXHJcbiAgR3JpZE9wdGlvbixcclxuICBIZWFkZXJNZW51LFxyXG4gIEhlYWRlck1lbnVJdGVtLFxyXG4gIEhlYWRlck1lbnVPbkNvbW1hbmRBcmdzLFxyXG4gIEhlYWRlck1lbnVPbkJlZm9yZU1lbnVTaG93QXJncyxcclxuICBTbGlja0V2ZW50SGFuZGxlcixcclxufSBmcm9tICcuLi9tb2RlbHMvaW5kZXgnO1xyXG5pbXBvcnQgeyBGaWx0ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvZmlsdGVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTb3J0U2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3NvcnQuc2VydmljZSc7XHJcbmltcG9ydCB7IFNoYXJlZFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9zaGFyZWQuc2VydmljZSc7XHJcbmltcG9ydCB7IEV4dGVuc2lvblV0aWxpdHkgfSBmcm9tICcuL2V4dGVuc2lvblV0aWxpdHknO1xyXG5cclxuLy8gdXNpbmcgZXh0ZXJuYWwgbm9uLXR5cGVkIGpzIGxpYnJhcmllc1xyXG5kZWNsYXJlIHZhciBTbGljazogYW55O1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgSGVhZGVyTWVudUV4dGVuc2lvbiBpbXBsZW1lbnRzIEV4dGVuc2lvbiB7XHJcbiAgcHJpdmF0ZSBfYWRkb246IGFueTtcclxuICBwcml2YXRlIF9ldmVudEhhbmRsZXI6IFNsaWNrRXZlbnRIYW5kbGVyO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgZXh0ZW5zaW9uVXRpbGl0eTogRXh0ZW5zaW9uVXRpbGl0eSxcclxuICAgIHByaXZhdGUgZmlsdGVyU2VydmljZTogRmlsdGVyU2VydmljZSxcclxuICAgIHByaXZhdGUgc2hhcmVkU2VydmljZTogU2hhcmVkU2VydmljZSxcclxuICAgIHByaXZhdGUgc29ydFNlcnZpY2U6IFNvcnRTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSB0cmFuc2xhdGU6IFRyYW5zbGF0ZVNlcnZpY2UsXHJcbiAgKSB7XHJcbiAgICB0aGlzLl9ldmVudEhhbmRsZXIgPSBuZXcgU2xpY2suRXZlbnRIYW5kbGVyKCk7XHJcbiAgfVxyXG5cclxuICBnZXQgZXZlbnRIYW5kbGVyKCk6IFNsaWNrRXZlbnRIYW5kbGVyIHtcclxuICAgIHJldHVybiB0aGlzLl9ldmVudEhhbmRsZXI7XHJcbiAgfVxyXG5cclxuICBkaXNwb3NlKCkge1xyXG4gICAgLy8gdW5zdWJzY3JpYmUgYWxsIFNsaWNrR3JpZCBldmVudHNcclxuICAgIHRoaXMuX2V2ZW50SGFuZGxlci51bnN1YnNjcmliZUFsbCgpO1xyXG4gICAgaWYgKHRoaXMuX2FkZG9uICYmIHRoaXMuX2FkZG9uLmRlc3Ryb3kpIHtcclxuICAgICAgdGhpcy5fYWRkb24uZGVzdHJveSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgKiBDcmVhdGUgdGhlIEhlYWRlciBNZW51IGFuZCBleHBvc2UgYWxsIHRoZSBhdmFpbGFibGUgaG9va3MgdGhhdCB1c2VyIGNhbiBzdWJzY3JpYmUgKG9uQ29tbWFuZCwgb25CZWZvcmVNZW51U2hvdywgLi4uKVxyXG4gICogQHBhcmFtIGdyaWRcclxuICAqIEBwYXJhbSBkYXRhVmlld1xyXG4gICogQHBhcmFtIGNvbHVtbkRlZmluaXRpb25zXHJcbiAgKi9cclxuICByZWdpc3RlcigpOiBhbnkge1xyXG4gICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZSAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZCAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMpIHtcclxuICAgICAgLy8gZHluYW1pY2FsbHkgaW1wb3J0IHRoZSBTbGlja0dyaWQgcGx1Z2luIChhZGRvbikgd2l0aCBSZXF1aXJlSlNcclxuICAgICAgdGhpcy5leHRlbnNpb25VdGlsaXR5LmxvYWRFeHRlbnNpb25EeW5hbWljYWxseShFeHRlbnNpb25OYW1lLmhlYWRlck1lbnUpO1xyXG4gICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuaGVhZGVyTWVudSA9IHsgLi4udGhpcy5nZXREZWZhdWx0SGVhZGVyTWVudU9wdGlvbnMoKSwgLi4udGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmhlYWRlck1lbnUgfTtcclxuICAgICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5lbmFibGVIZWFkZXJNZW51KSB7XHJcbiAgICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmhlYWRlck1lbnUgPSB0aGlzLmFkZEhlYWRlck1lbnVDdXN0b21Db21tYW5kcyh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMsIHRoaXMuc2hhcmVkU2VydmljZS5jb2x1bW5EZWZpbml0aW9ucyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuX2FkZG9uID0gbmV3IFNsaWNrLlBsdWdpbnMuSGVhZGVyTWVudSh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuaGVhZGVyTWVudSk7XHJcbiAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLnJlZ2lzdGVyUGx1Z2luKHRoaXMuX2FkZG9uKTtcclxuXHJcbiAgICAgIC8vIGhvb2sgYWxsIGV2ZW50c1xyXG4gICAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmhlYWRlck1lbnUpIHtcclxuICAgICAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmhlYWRlck1lbnUub25FeHRlbnNpb25SZWdpc3RlcmVkKSB7XHJcbiAgICAgICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuaGVhZGVyTWVudS5vbkV4dGVuc2lvblJlZ2lzdGVyZWQodGhpcy5fYWRkb24pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9ldmVudEhhbmRsZXIuc3Vic2NyaWJlKHRoaXMuX2FkZG9uLm9uQ29tbWFuZCwgKGU6IGFueSwgYXJnczogSGVhZGVyTWVudU9uQ29tbWFuZEFyZ3MpID0+IHtcclxuICAgICAgICAgIHRoaXMuZXhlY3V0ZUhlYWRlck1lbnVJbnRlcm5hbENvbW1hbmRzKGUsIGFyZ3MpO1xyXG4gICAgICAgICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5oZWFkZXJNZW51ICYmIHR5cGVvZiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuaGVhZGVyTWVudS5vbkNvbW1hbmQgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmhlYWRlck1lbnUub25Db21tYW5kKGUsIGFyZ3MpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuX2V2ZW50SGFuZGxlci5zdWJzY3JpYmUodGhpcy5fYWRkb24ub25CZWZvcmVNZW51U2hvdywgKGU6IGFueSwgYXJnczogSGVhZGVyTWVudU9uQmVmb3JlTWVudVNob3dBcmdzKSA9PiB7XHJcbiAgICAgICAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmhlYWRlck1lbnUgJiYgdHlwZW9mIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5oZWFkZXJNZW51Lm9uQmVmb3JlTWVudVNob3cgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmhlYWRlck1lbnUub25CZWZvcmVNZW51U2hvdyhlLCBhcmdzKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdGhpcy5fYWRkb247XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZSBIZWFkZXIgTWVudSB3aXRoIEN1c3RvbSBDb21tYW5kcyBpZiB1c2VyIGhhcyBlbmFibGVkIEhlYWRlciBNZW51XHJcbiAgICogQHBhcmFtIG9wdGlvbnNcclxuICAgKiBAcGFyYW0gY29sdW1uRGVmaW5pdGlvbnNcclxuICAgKiBAcmV0dXJuIGhlYWRlciBtZW51XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBhZGRIZWFkZXJNZW51Q3VzdG9tQ29tbWFuZHMob3B0aW9uczogR3JpZE9wdGlvbiwgY29sdW1uRGVmaW5pdGlvbnM6IENvbHVtbltdKTogSGVhZGVyTWVudSB7XHJcbiAgICBjb25zdCBoZWFkZXJNZW51T3B0aW9ucyA9IG9wdGlvbnMuaGVhZGVyTWVudSB8fCB7fTtcclxuXHJcbiAgICBpZiAoY29sdW1uRGVmaW5pdGlvbnMgJiYgQXJyYXkuaXNBcnJheShjb2x1bW5EZWZpbml0aW9ucykgJiYgb3B0aW9ucy5lbmFibGVIZWFkZXJNZW51KSB7XHJcbiAgICAgIGNvbHVtbkRlZmluaXRpb25zLmZvckVhY2goKGNvbHVtbkRlZjogQ29sdW1uKSA9PiB7XHJcbiAgICAgICAgaWYgKGNvbHVtbkRlZiAmJiAhY29sdW1uRGVmLmV4Y2x1ZGVGcm9tSGVhZGVyTWVudSkge1xyXG4gICAgICAgICAgaWYgKCFjb2x1bW5EZWYuaGVhZGVyIHx8ICFjb2x1bW5EZWYuaGVhZGVyLm1lbnUpIHtcclxuICAgICAgICAgICAgY29sdW1uRGVmLmhlYWRlciA9IHtcclxuICAgICAgICAgICAgICBtZW51OiB7XHJcbiAgICAgICAgICAgICAgICBpdGVtczogW11cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgY29uc3QgY29sdW1uSGVhZGVyTWVudUl0ZW1zOiBIZWFkZXJNZW51SXRlbVtdID0gY29sdW1uRGVmICYmIGNvbHVtbkRlZi5oZWFkZXIgJiYgY29sdW1uRGVmLmhlYWRlci5tZW51ICYmIGNvbHVtbkRlZi5oZWFkZXIubWVudS5pdGVtcyB8fCBbXTtcclxuXHJcbiAgICAgICAgICAvLyBTb3J0aW5nIENvbW1hbmRzXHJcbiAgICAgICAgICBpZiAob3B0aW9ucy5lbmFibGVTb3J0aW5nICYmIGNvbHVtbkRlZi5zb3J0YWJsZSAmJiBoZWFkZXJNZW51T3B0aW9ucyAmJiAhaGVhZGVyTWVudU9wdGlvbnMuaGlkZVNvcnRDb21tYW5kcykge1xyXG4gICAgICAgICAgICBpZiAoY29sdW1uSGVhZGVyTWVudUl0ZW1zLmZpbHRlcigoaXRlbTogSGVhZGVyTWVudUl0ZW0pID0+IGl0ZW0uY29tbWFuZCA9PT0gJ3NvcnQtYXNjJykubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgY29sdW1uSGVhZGVyTWVudUl0ZW1zLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgaWNvbkNzc0NsYXNzOiBoZWFkZXJNZW51T3B0aW9ucy5pY29uU29ydEFzY0NvbW1hbmQgfHwgJ2ZhIGZhLXNvcnQtYXNjJyxcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBvcHRpb25zLmVuYWJsZVRyYW5zbGF0ZSA/IHRoaXMudHJhbnNsYXRlLmluc3RhbnQoJ1NPUlRfQVNDRU5ESU5HJykgOiBDb25zdGFudHMuVEVYVF9TT1JUX0FTQ0VORElORyxcclxuICAgICAgICAgICAgICAgIGNvbW1hbmQ6ICdzb3J0LWFzYycsXHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbk9yZGVyOiA1MFxyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjb2x1bW5IZWFkZXJNZW51SXRlbXMuZmlsdGVyKChpdGVtOiBIZWFkZXJNZW51SXRlbSkgPT4gaXRlbS5jb21tYW5kID09PSAnc29ydC1kZXNjJykubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgY29sdW1uSGVhZGVyTWVudUl0ZW1zLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgaWNvbkNzc0NsYXNzOiBoZWFkZXJNZW51T3B0aW9ucy5pY29uU29ydERlc2NDb21tYW5kIHx8ICdmYSBmYS1zb3J0LWRlc2MnLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IG9wdGlvbnMuZW5hYmxlVHJhbnNsYXRlID8gdGhpcy50cmFuc2xhdGUuaW5zdGFudCgnU09SVF9ERVNDRU5ESU5HJykgOiBDb25zdGFudHMuVEVYVF9TT1JUX0RFU0NFTkRJTkcsXHJcbiAgICAgICAgICAgICAgICBjb21tYW5kOiAnc29ydC1kZXNjJyxcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uT3JkZXI6IDUxXHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIGFkZCBhIGRpdmlkZXIgKHNlcGFyYXRvcikgYmV0d2VlbiB0aGUgdG9wIHNvcnQgY29tbWFuZHMgYW5kIHRoZSBvdGhlciBjbGVhciBjb21tYW5kc1xyXG4gICAgICAgICAgICBpZiAoY29sdW1uSGVhZGVyTWVudUl0ZW1zLmZpbHRlcigoaXRlbTogSGVhZGVyTWVudUl0ZW0pID0+IGl0ZW0ucG9zaXRpb25PcmRlciA9PT0gNTIpLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgIGNvbHVtbkhlYWRlck1lbnVJdGVtcy5wdXNoKHsgZGl2aWRlcjogdHJ1ZSwgY29tbWFuZDogJycsIHBvc2l0aW9uT3JkZXI6IDUyIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoIWhlYWRlck1lbnVPcHRpb25zLmhpZGVDbGVhclNvcnRDb21tYW5kICYmIGNvbHVtbkhlYWRlck1lbnVJdGVtcy5maWx0ZXIoKGl0ZW06IEhlYWRlck1lbnVJdGVtKSA9PiBpdGVtLmNvbW1hbmQgPT09ICdjbGVhci1zb3J0JykubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgY29sdW1uSGVhZGVyTWVudUl0ZW1zLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgaWNvbkNzc0NsYXNzOiBoZWFkZXJNZW51T3B0aW9ucy5pY29uQ2xlYXJTb3J0Q29tbWFuZCB8fCAnZmEgZmEtdW5zb3J0ZWQnLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IG9wdGlvbnMuZW5hYmxlVHJhbnNsYXRlID8gdGhpcy50cmFuc2xhdGUuaW5zdGFudCgnUkVNT1ZFX1NPUlQnKSA6IENvbnN0YW50cy5URVhUX1JFTU9WRV9TT1JULFxyXG4gICAgICAgICAgICAgICAgY29tbWFuZDogJ2NsZWFyLXNvcnQnLFxyXG4gICAgICAgICAgICAgICAgcG9zaXRpb25PcmRlcjogNTRcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vIEZpbHRlcmluZyBDb21tYW5kc1xyXG4gICAgICAgICAgaWYgKG9wdGlvbnMuZW5hYmxlRmlsdGVyaW5nICYmIGNvbHVtbkRlZi5maWx0ZXJhYmxlICYmIGhlYWRlck1lbnVPcHRpb25zICYmICFoZWFkZXJNZW51T3B0aW9ucy5oaWRlRmlsdGVyQ29tbWFuZHMpIHtcclxuICAgICAgICAgICAgaWYgKCFoZWFkZXJNZW51T3B0aW9ucy5oaWRlQ2xlYXJGaWx0ZXJDb21tYW5kICYmIGNvbHVtbkhlYWRlck1lbnVJdGVtcy5maWx0ZXIoKGl0ZW06IEhlYWRlck1lbnVJdGVtKSA9PiBpdGVtLmNvbW1hbmQgPT09ICdjbGVhci1maWx0ZXInKS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICBjb2x1bW5IZWFkZXJNZW51SXRlbXMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBpY29uQ3NzQ2xhc3M6IGhlYWRlck1lbnVPcHRpb25zLmljb25DbGVhckZpbHRlckNvbW1hbmQgfHwgJ2ZhIGZhLWZpbHRlcicsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogb3B0aW9ucy5lbmFibGVUcmFuc2xhdGUgPyB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KCdSRU1PVkVfRklMVEVSJykgOiBDb25zdGFudHMuVEVYVF9SRU1PVkVfRklMVEVSLFxyXG4gICAgICAgICAgICAgICAgY29tbWFuZDogJ2NsZWFyLWZpbHRlcicsXHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbk9yZGVyOiA1M1xyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgLy8gSGlkZSBDb2x1bW4gQ29tbWFuZFxyXG4gICAgICAgICAgaWYgKGhlYWRlck1lbnVPcHRpb25zICYmICFoZWFkZXJNZW51T3B0aW9ucy5oaWRlQ29sdW1uSGlkZUNvbW1hbmQgJiYgY29sdW1uSGVhZGVyTWVudUl0ZW1zLmZpbHRlcigoaXRlbTogSGVhZGVyTWVudUl0ZW0pID0+IGl0ZW0uY29tbWFuZCA9PT0gJ2hpZGUnKS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgY29sdW1uSGVhZGVyTWVudUl0ZW1zLnB1c2goe1xyXG4gICAgICAgICAgICAgIGljb25Dc3NDbGFzczogaGVhZGVyTWVudU9wdGlvbnMuaWNvbkNvbHVtbkhpZGVDb21tYW5kIHx8ICdmYSBmYS10aW1lcycsXHJcbiAgICAgICAgICAgICAgdGl0bGU6IG9wdGlvbnMuZW5hYmxlVHJhbnNsYXRlID8gdGhpcy50cmFuc2xhdGUuaW5zdGFudCgnSElERV9DT0xVTU4nKSA6IENvbnN0YW50cy5URVhUX0hJREVfQ09MVU1OLFxyXG4gICAgICAgICAgICAgIGNvbW1hbmQ6ICdoaWRlJyxcclxuICAgICAgICAgICAgICBwb3NpdGlvbk9yZGVyOiA1NVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICB0aGlzLmV4dGVuc2lvblV0aWxpdHkudHJhbnNsYXRlSXRlbXMoY29sdW1uSGVhZGVyTWVudUl0ZW1zLCAndGl0bGVLZXknLCAndGl0bGUnKTtcclxuICAgICAgICAgIHRoaXMuZXh0ZW5zaW9uVXRpbGl0eS5zb3J0SXRlbXMoY29sdW1uSGVhZGVyTWVudUl0ZW1zLCAncG9zaXRpb25PcmRlcicpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gaGVhZGVyTWVudU9wdGlvbnM7XHJcbiAgfVxyXG5cclxuICAvKiogSGlkZSBhIGNvbHVtbiBmcm9tIHRoZSBncmlkICovXHJcbiAgaGlkZUNvbHVtbihjb2x1bW46IENvbHVtbikge1xyXG4gICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLmdldENvbHVtbnMgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQuc2V0Q29sdW1ucyAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZC5nZXRDb2x1bW5JbmRleCkge1xyXG4gICAgICBjb25zdCBjb2x1bW5JbmRleCA9IHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLmdldENvbHVtbkluZGV4KGNvbHVtbi5pZCk7XHJcbiAgICAgIGNvbnN0IGN1cnJlbnRDb2x1bW5zID0gdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQuZ2V0Q29sdW1ucygpO1xyXG4gICAgICBjb25zdCB2aXNpYmxlQ29sdW1ucyA9IHRoaXMuZXh0ZW5zaW9uVXRpbGl0eS5hcnJheVJlbW92ZUl0ZW1CeUluZGV4KGN1cnJlbnRDb2x1bW5zLCBjb2x1bW5JbmRleCk7XHJcbiAgICAgIHRoaXMuc2hhcmVkU2VydmljZS52aXNpYmxlQ29sdW1ucyA9IHZpc2libGVDb2x1bW5zO1xyXG4gICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZC5zZXRDb2x1bW5zKHZpc2libGVDb2x1bW5zKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRyYW5zbGF0ZSB0aGUgSGVhZGVyIE1lbnUgdGl0bGVzLCB3ZSBuZWVkIHRvIGxvb3AgdGhyb3VnaCBhbGwgY29sdW1uIGRlZmluaXRpb24gdG8gcmUtdHJhbnNsYXRlIHRoZW1cclxuICAgKi9cclxuICB0cmFuc2xhdGVIZWFkZXJNZW51KCkge1xyXG4gICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucyAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuaGVhZGVyTWVudSkge1xyXG4gICAgICB0aGlzLnJlc2V0SGVhZGVyTWVudVRyYW5zbGF0aW9ucyh0aGlzLnNoYXJlZFNlcnZpY2UudmlzaWJsZUNvbHVtbnMpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gLS1cclxuICAvLyBwcml2YXRlIGZ1bmN0aW9uc1xyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAvKiogQHJldHVybiBkZWZhdWx0IEhlYWRlciBNZW51IG9wdGlvbnMgKi9cclxuICBwcml2YXRlIGdldERlZmF1bHRIZWFkZXJNZW51T3B0aW9ucygpOiBIZWFkZXJNZW51IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGF1dG9BbGlnbk9mZnNldDogMTIsXHJcbiAgICAgIG1pbldpZHRoOiAxNDAsXHJcbiAgICAgIGhpZGVDb2x1bW5IaWRlQ29tbWFuZDogZmFsc2UsXHJcbiAgICAgIGhpZGVTb3J0Q29tbWFuZHM6IGZhbHNlLFxyXG4gICAgICB0aXRsZTogJydcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXNldCBhbGwgdGhlIEdyaWQgTWVudSBvcHRpb25zIHdoaWNoIGhhdmUgdGV4dCB0byB0cmFuc2xhdGVcclxuICAgKiBAcGFyYW0gZ3JpZCBtZW51IG9iamVjdFxyXG4gICAqL1xyXG4gIHByaXZhdGUgcmVzZXRIZWFkZXJNZW51VHJhbnNsYXRpb25zKGNvbHVtbkRlZmluaXRpb25zOiBDb2x1bW5bXSkge1xyXG4gICAgY29sdW1uRGVmaW5pdGlvbnMuZm9yRWFjaCgoY29sdW1uRGVmOiBDb2x1bW4pID0+IHtcclxuICAgICAgaWYgKGNvbHVtbkRlZiAmJiBjb2x1bW5EZWYuaGVhZGVyICYmIGNvbHVtbkRlZi5oZWFkZXIgJiYgY29sdW1uRGVmLmhlYWRlci5tZW51ICYmIGNvbHVtbkRlZi5oZWFkZXIubWVudS5pdGVtcykge1xyXG4gICAgICAgIGlmICghY29sdW1uRGVmLmV4Y2x1ZGVGcm9tSGVhZGVyTWVudSkge1xyXG4gICAgICAgICAgY29uc3QgY29sdW1uSGVhZGVyTWVudUl0ZW1zOiBIZWFkZXJNZW51SXRlbVtdID0gY29sdW1uRGVmLmhlYWRlci5tZW51Lml0ZW1zIHx8IFtdO1xyXG4gICAgICAgICAgY29sdW1uSGVhZGVyTWVudUl0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgc3dpdGNoIChpdGVtLmNvbW1hbmQpIHtcclxuICAgICAgICAgICAgICBjYXNlICdjbGVhci1maWx0ZXInOlxyXG4gICAgICAgICAgICAgICAgaXRlbS50aXRsZSA9IHRoaXMudHJhbnNsYXRlLmluc3RhbnQoJ1JFTU9WRV9GSUxURVInKSB8fCBDb25zdGFudHMuVEVYVF9SRU1PVkVfRklMVEVSO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgY2FzZSAnY2xlYXItc29ydCc6XHJcbiAgICAgICAgICAgICAgICBpdGVtLnRpdGxlID0gdGhpcy50cmFuc2xhdGUuaW5zdGFudCgnUkVNT1ZFX1NPUlQnKSB8fCBDb25zdGFudHMuVEVYVF9SRU1PVkVfU09SVDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgIGNhc2UgJ3NvcnQtYXNjJzpcclxuICAgICAgICAgICAgICAgIGl0ZW0udGl0bGUgPSB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KCdTT1JUX0FTQ0VORElORycpIHx8IENvbnN0YW50cy5URVhUX1NPUlRfQVNDRU5ESU5HO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgY2FzZSAnc29ydC1kZXNjJzpcclxuICAgICAgICAgICAgICAgIGl0ZW0udGl0bGUgPSB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KCdTT1JUX0RFU0NFTkRJTkcnKSB8fCBDb25zdGFudHMuVEVYVF9TT1JUX0RFU0NFTkRJTkc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICBjYXNlICdoaWRlJzpcclxuICAgICAgICAgICAgICAgIGl0ZW0udGl0bGUgPSB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KCdISURFX0NPTFVNTicpIHx8IENvbnN0YW50cy5URVhUX0hJREVfQ09MVU1OO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIHJlLXRyYW5zbGF0ZSBpZiB0aGVyZSdzIGEgXCJ0aXRsZUtleVwiXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmVuYWJsZVRyYW5zbGF0ZSkge1xyXG4gICAgICAgICAgICAgIHRoaXMuZXh0ZW5zaW9uVXRpbGl0eS50cmFuc2xhdGVJdGVtcyhjb2x1bW5IZWFkZXJNZW51SXRlbXMsICd0aXRsZUtleScsICd0aXRsZScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqIENsZWFyIHRoZSBGaWx0ZXIgb24gdGhlIGN1cnJlbnQgY29sdW1uIChpZiBpdCdzIGFjdHVhbGx5IGZpbHRlcmVkKSAqL1xyXG4gIHByaXZhdGUgY2xlYXJDb2x1bW5GaWx0ZXIoZXZlbnQ6IEV2ZW50LCBhcmdzOiBIZWFkZXJNZW51T25Db21tYW5kQXJncykge1xyXG4gICAgaWYgKGFyZ3MgJiYgYXJncy5jb2x1bW4pIHtcclxuICAgICAgdGhpcy5maWx0ZXJTZXJ2aWNlLmNsZWFyRmlsdGVyQnlDb2x1bW5JZChldmVudCwgYXJncy5jb2x1bW4uaWQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIENsZWFyIHRoZSBTb3J0IG9uIHRoZSBjdXJyZW50IGNvbHVtbiAoaWYgaXQncyBhY3R1YWxseSBzb3J0ZWQpICovXHJcbiAgcHJpdmF0ZSBjbGVhckNvbHVtblNvcnQoZXZlbnQ6IEV2ZW50LCBhcmdzOiBIZWFkZXJNZW51T25Db21tYW5kQXJncykge1xyXG4gICAgaWYgKGFyZ3MgJiYgYXJncy5jb2x1bW4gJiYgdGhpcy5zaGFyZWRTZXJ2aWNlKSB7XHJcbiAgICAgIC8vIGdldCBwcmV2aW91c2x5IHNvcnRlZCBjb2x1bW5zXHJcbiAgICAgIGNvbnN0IGFsbFNvcnRlZENvbHM6IENvbHVtblNvcnRbXSA9IHRoaXMuc29ydFNlcnZpY2UuZ2V0UHJldmlvdXNDb2x1bW5Tb3J0cygpO1xyXG4gICAgICBjb25zdCBzb3J0ZWRDb2xzV2l0aG91dEN1cnJlbnQ6IENvbHVtblNvcnRbXSA9IHRoaXMuc29ydFNlcnZpY2UuZ2V0UHJldmlvdXNDb2x1bW5Tb3J0cyhhcmdzLmNvbHVtbi5pZCArICcnKTtcclxuXHJcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGFsbFNvcnRlZENvbHMpICYmIEFycmF5LmlzQXJyYXkoc29ydGVkQ29sc1dpdGhvdXRDdXJyZW50KSAmJiBhbGxTb3J0ZWRDb2xzLmxlbmd0aCAhPT0gc29ydGVkQ29sc1dpdGhvdXRDdXJyZW50Lmxlbmd0aCkge1xyXG4gICAgICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmJhY2tlbmRTZXJ2aWNlQXBpKSB7XHJcbiAgICAgICAgICB0aGlzLnNvcnRTZXJ2aWNlLm9uQmFja2VuZFNvcnRDaGFuZ2VkKGV2ZW50LCB7IG11bHRpQ29sdW1uU29ydDogdHJ1ZSwgc29ydENvbHM6IHNvcnRlZENvbHNXaXRob3V0Q3VycmVudCwgZ3JpZDogdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQgfSk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZGF0YVZpZXcpIHtcclxuICAgICAgICAgIHRoaXMuc29ydFNlcnZpY2Uub25Mb2NhbFNvcnRDaGFuZ2VkKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLCB0aGlzLnNoYXJlZFNlcnZpY2UuZGF0YVZpZXcsIHNvcnRlZENvbHNXaXRob3V0Q3VycmVudCwgdHJ1ZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIC8vIHdoZW4gdXNpbmcgY3VzdG9tRGF0YVZpZXcsIHdlIHdpbGwgc2ltcGx5IHNlbmQgaXQgYXMgYSBvblNvcnQgZXZlbnQgd2l0aCBub3RpZnlcclxuICAgICAgICAgIGNvbnN0IGlzTXVsdGlTb3J0ID0gdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5tdWx0aUNvbHVtblNvcnQgfHwgZmFsc2U7XHJcbiAgICAgICAgICBjb25zdCBzb3J0T3V0cHV0ID0gaXNNdWx0aVNvcnQgPyBzb3J0ZWRDb2xzV2l0aG91dEN1cnJlbnQgOiBzb3J0ZWRDb2xzV2l0aG91dEN1cnJlbnRbMF07XHJcbiAgICAgICAgICBhcmdzLmdyaWQub25Tb3J0Lm5vdGlmeShzb3J0T3V0cHV0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPYmogc29ydENvbHVtbnMgYXJyYXkgd2hpY2ggd2lsbCBhdCB0aGUgc2FtZSBhZGQgdGhlIHZpc3VhbCBzb3J0IGljb24ocykgb24gdGhlIFVJXHJcbiAgICAgICAgY29uc3QgdXBkYXRlZFNvcnRDb2x1bW5zOiBDb2x1bW5Tb3J0W10gPSBzb3J0ZWRDb2xzV2l0aG91dEN1cnJlbnQubWFwKChjb2wpID0+IHtcclxuICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGNvbHVtbklkOiBjb2wgJiYgY29sLnNvcnRDb2wgJiYgY29sLnNvcnRDb2wuaWQsXHJcbiAgICAgICAgICAgIHNvcnRBc2M6IGNvbCAmJiBjb2wuc29ydEFzY1xyXG4gICAgICAgICAgfTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZC5zZXRTb3J0Q29sdW1ucyh1cGRhdGVkU29ydENvbHVtbnMpOyAvLyBhZGQgc29ydCBpY29uIGluIFVJXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiBFeGVjdXRlIHRoZSBIZWFkZXIgTWVudSBDb21tYW5kcyB0aGF0IHdhcyB0cmlnZ2VyZWQgYnkgdGhlIG9uQ29tbWFuZCBzdWJzY3JpYmUgKi9cclxuICBwcml2YXRlIGV4ZWN1dGVIZWFkZXJNZW51SW50ZXJuYWxDb21tYW5kcyhldmVudDogRXZlbnQsIGFyZ3M6IEhlYWRlck1lbnVPbkNvbW1hbmRBcmdzKSB7XHJcbiAgICBpZiAoYXJncyAmJiBhcmdzLmNvbW1hbmQpIHtcclxuICAgICAgc3dpdGNoIChhcmdzLmNvbW1hbmQpIHtcclxuICAgICAgICBjYXNlICdoaWRlJzpcclxuICAgICAgICAgIHRoaXMuaGlkZUNvbHVtbihhcmdzLmNvbHVtbik7XHJcbiAgICAgICAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5lbmFibGVBdXRvU2l6ZUNvbHVtbnMpIHtcclxuICAgICAgICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQuYXV0b3NpemVDb2x1bW5zKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdjbGVhci1maWx0ZXInOlxyXG4gICAgICAgICAgdGhpcy5jbGVhckNvbHVtbkZpbHRlcihldmVudCwgYXJncyk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdjbGVhci1zb3J0JzpcclxuICAgICAgICAgIHRoaXMuY2xlYXJDb2x1bW5Tb3J0KGV2ZW50LCBhcmdzKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ3NvcnQtYXNjJzpcclxuICAgICAgICBjYXNlICdzb3J0LWRlc2MnOlxyXG4gICAgICAgICAgY29uc3QgaXNTb3J0aW5nQXNjID0gKGFyZ3MuY29tbWFuZCA9PT0gJ3NvcnQtYXNjJyk7XHJcbiAgICAgICAgICB0aGlzLnNvcnRDb2x1bW4oZXZlbnQsIGFyZ3MsIGlzU29ydGluZ0FzYyk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiBTb3J0IHRoZSBjdXJyZW50IGNvbHVtbiAqL1xyXG4gIHByaXZhdGUgc29ydENvbHVtbihldmVudDogRXZlbnQsIGFyZ3M6IEhlYWRlck1lbnVPbkNvbW1hbmRBcmdzLCBpc1NvcnRpbmdBc2MgPSB0cnVlKSB7XHJcbiAgICBpZiAoYXJncyAmJiBhcmdzLmNvbHVtbikge1xyXG4gICAgICAvLyBnZXQgcHJldmlvdXNseSBzb3J0ZWQgY29sdW1uc1xyXG4gICAgICBjb25zdCBzb3J0ZWRDb2xzV2l0aG91dEN1cnJlbnQ6IENvbHVtblNvcnRbXSA9IHRoaXMuc29ydFNlcnZpY2UuZ2V0UHJldmlvdXNDb2x1bW5Tb3J0cyhhcmdzLmNvbHVtbi5pZCArICcnKTtcclxuXHJcbiAgICAgIC8vIGFkZCB0byB0aGUgY29sdW1uIGFycmF5LCB0aGUgY29sdW1uIHNvcnRlZCBieSB0aGUgaGVhZGVyIG1lbnVcclxuICAgICAgc29ydGVkQ29sc1dpdGhvdXRDdXJyZW50LnB1c2goeyBzb3J0Q29sOiBhcmdzLmNvbHVtbiwgc29ydEFzYzogaXNTb3J0aW5nQXNjIH0pO1xyXG4gICAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmJhY2tlbmRTZXJ2aWNlQXBpKSB7XHJcbiAgICAgICAgdGhpcy5zb3J0U2VydmljZS5vbkJhY2tlbmRTb3J0Q2hhbmdlZChldmVudCwgeyBtdWx0aUNvbHVtblNvcnQ6IHRydWUsIHNvcnRDb2xzOiBzb3J0ZWRDb2xzV2l0aG91dEN1cnJlbnQsIGdyaWQ6IHRoaXMuc2hhcmVkU2VydmljZS5ncmlkIH0pO1xyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5kYXRhVmlldykge1xyXG4gICAgICAgIHRoaXMuc29ydFNlcnZpY2Uub25Mb2NhbFNvcnRDaGFuZ2VkKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLCB0aGlzLnNoYXJlZFNlcnZpY2UuZGF0YVZpZXcsIHNvcnRlZENvbHNXaXRob3V0Q3VycmVudCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gd2hlbiB1c2luZyBjdXN0b21EYXRhVmlldywgd2Ugd2lsbCBzaW1wbHkgc2VuZCBpdCBhcyBhIG9uU29ydCBldmVudCB3aXRoIG5vdGlmeVxyXG4gICAgICAgIGNvbnN0IGlzTXVsdGlTb3J0ID0gdGhpcy5zaGFyZWRTZXJ2aWNlICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucyAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMubXVsdGlDb2x1bW5Tb3J0IHx8IGZhbHNlO1xyXG4gICAgICAgIGNvbnN0IHNvcnRPdXRwdXQgPSBpc011bHRpU29ydCA/IHNvcnRlZENvbHNXaXRob3V0Q3VycmVudCA6IHNvcnRlZENvbHNXaXRob3V0Q3VycmVudFswXTtcclxuICAgICAgICBhcmdzLmdyaWQub25Tb3J0Lm5vdGlmeShzb3J0T3V0cHV0KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gdXBkYXRlIHRoZSB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9iaiBzb3J0Q29sdW1ucyBhcnJheSB3aGljaCB3aWxsIGF0IHRoZSBzYW1lIGFkZCB0aGUgdmlzdWFsIHNvcnQgaWNvbihzKSBvbiB0aGUgVUlcclxuICAgICAgY29uc3QgbmV3U29ydENvbHVtbnM6IENvbHVtblNvcnRbXSA9IHNvcnRlZENvbHNXaXRob3V0Q3VycmVudC5tYXAoKGNvbCkgPT4ge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICBjb2x1bW5JZDogY29sICYmIGNvbC5zb3J0Q29sICYmIGNvbC5zb3J0Q29sLmlkLFxyXG4gICAgICAgICAgc29ydEFzYzogY29sICYmIGNvbC5zb3J0QXNjXHJcbiAgICAgICAgfTtcclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLnNldFNvcnRDb2x1bW5zKG5ld1NvcnRDb2x1bW5zKTsgLy8gYWRkIHNvcnQgaWNvbiBpbiBVSVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=