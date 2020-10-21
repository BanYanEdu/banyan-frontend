import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Constants } from '../constants';
import { ExtensionName, } from '../models/index';
import { FilterService } from '../services/filter.service';
import { SortService } from '../services/sort.service';
import { SharedService } from '../services/shared.service';
import { ExtensionUtility } from './extensionUtility';
var HeaderMenuExtension = /** @class */ (function () {
    function HeaderMenuExtension(extensionUtility, filterService, sharedService, sortService, translate) {
        this.extensionUtility = extensionUtility;
        this.filterService = filterService;
        this.sharedService = sharedService;
        this.sortService = sortService;
        this.translate = translate;
        this._eventHandler = new Slick.EventHandler();
    }
    Object.defineProperty(HeaderMenuExtension.prototype, "eventHandler", {
        get: function () {
            return this._eventHandler;
        },
        enumerable: true,
        configurable: true
    });
    HeaderMenuExtension.prototype.dispose = function () {
        // unsubscribe all SlickGrid events
        this._eventHandler.unsubscribeAll();
        if (this._addon && this._addon.destroy) {
            this._addon.destroy();
        }
    };
    /**
    * Create the Header Menu and expose all the available hooks that user can subscribe (onCommand, onBeforeMenuShow, ...)
    * @param grid
    * @param dataView
    * @param columnDefinitions
    */
    HeaderMenuExtension.prototype.register = function () {
        var _this = this;
        if (this.sharedService && this.sharedService.grid && this.sharedService.gridOptions) {
            // dynamically import the SlickGrid plugin (addon) with RequireJS
            this.extensionUtility.loadExtensionDynamically(ExtensionName.headerMenu);
            this.sharedService.gridOptions.headerMenu = tslib_1.__assign({}, this.getDefaultHeaderMenuOptions(), this.sharedService.gridOptions.headerMenu);
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
                this._eventHandler.subscribe(this._addon.onCommand, function (e, args) {
                    _this.executeHeaderMenuInternalCommands(e, args);
                    if (_this.sharedService.gridOptions.headerMenu && typeof _this.sharedService.gridOptions.headerMenu.onCommand === 'function') {
                        _this.sharedService.gridOptions.headerMenu.onCommand(e, args);
                    }
                });
                this._eventHandler.subscribe(this._addon.onBeforeMenuShow, function (e, args) {
                    if (_this.sharedService.gridOptions.headerMenu && typeof _this.sharedService.gridOptions.headerMenu.onBeforeMenuShow === 'function') {
                        _this.sharedService.gridOptions.headerMenu.onBeforeMenuShow(e, args);
                    }
                });
            }
            return this._addon;
        }
        return null;
    };
    /**
     * Create Header Menu with Custom Commands if user has enabled Header Menu
     * @param options
     * @param columnDefinitions
     * @return header menu
     */
    HeaderMenuExtension.prototype.addHeaderMenuCustomCommands = function (options, columnDefinitions) {
        var _this = this;
        var headerMenuOptions = options.headerMenu || {};
        if (columnDefinitions && Array.isArray(columnDefinitions) && options.enableHeaderMenu) {
            columnDefinitions.forEach(function (columnDef) {
                if (columnDef && !columnDef.excludeFromHeaderMenu) {
                    if (!columnDef.header || !columnDef.header.menu) {
                        columnDef.header = {
                            menu: {
                                items: []
                            }
                        };
                    }
                    var columnHeaderMenuItems = columnDef && columnDef.header && columnDef.header.menu && columnDef.header.menu.items || [];
                    // Sorting Commands
                    if (options.enableSorting && columnDef.sortable && headerMenuOptions && !headerMenuOptions.hideSortCommands) {
                        if (columnHeaderMenuItems.filter(function (item) { return item.command === 'sort-asc'; }).length === 0) {
                            columnHeaderMenuItems.push({
                                iconCssClass: headerMenuOptions.iconSortAscCommand || 'fa fa-sort-asc',
                                title: options.enableTranslate ? _this.translate.instant('SORT_ASCENDING') : Constants.TEXT_SORT_ASCENDING,
                                command: 'sort-asc',
                                positionOrder: 50
                            });
                        }
                        if (columnHeaderMenuItems.filter(function (item) { return item.command === 'sort-desc'; }).length === 0) {
                            columnHeaderMenuItems.push({
                                iconCssClass: headerMenuOptions.iconSortDescCommand || 'fa fa-sort-desc',
                                title: options.enableTranslate ? _this.translate.instant('SORT_DESCENDING') : Constants.TEXT_SORT_DESCENDING,
                                command: 'sort-desc',
                                positionOrder: 51
                            });
                        }
                        // add a divider (separator) between the top sort commands and the other clear commands
                        if (columnHeaderMenuItems.filter(function (item) { return item.positionOrder === 52; }).length === 0) {
                            columnHeaderMenuItems.push({ divider: true, command: '', positionOrder: 52 });
                        }
                        if (!headerMenuOptions.hideClearSortCommand && columnHeaderMenuItems.filter(function (item) { return item.command === 'clear-sort'; }).length === 0) {
                            columnHeaderMenuItems.push({
                                iconCssClass: headerMenuOptions.iconClearSortCommand || 'fa fa-unsorted',
                                title: options.enableTranslate ? _this.translate.instant('REMOVE_SORT') : Constants.TEXT_REMOVE_SORT,
                                command: 'clear-sort',
                                positionOrder: 54
                            });
                        }
                    }
                    // Filtering Commands
                    if (options.enableFiltering && columnDef.filterable && headerMenuOptions && !headerMenuOptions.hideFilterCommands) {
                        if (!headerMenuOptions.hideClearFilterCommand && columnHeaderMenuItems.filter(function (item) { return item.command === 'clear-filter'; }).length === 0) {
                            columnHeaderMenuItems.push({
                                iconCssClass: headerMenuOptions.iconClearFilterCommand || 'fa fa-filter',
                                title: options.enableTranslate ? _this.translate.instant('REMOVE_FILTER') : Constants.TEXT_REMOVE_FILTER,
                                command: 'clear-filter',
                                positionOrder: 53
                            });
                        }
                    }
                    // Hide Column Command
                    if (headerMenuOptions && !headerMenuOptions.hideColumnHideCommand && columnHeaderMenuItems.filter(function (item) { return item.command === 'hide'; }).length === 0) {
                        columnHeaderMenuItems.push({
                            iconCssClass: headerMenuOptions.iconColumnHideCommand || 'fa fa-times',
                            title: options.enableTranslate ? _this.translate.instant('HIDE_COLUMN') : Constants.TEXT_HIDE_COLUMN,
                            command: 'hide',
                            positionOrder: 55
                        });
                    }
                    _this.extensionUtility.translateItems(columnHeaderMenuItems, 'titleKey', 'title');
                    _this.extensionUtility.sortItems(columnHeaderMenuItems, 'positionOrder');
                }
            });
        }
        return headerMenuOptions;
    };
    /** Hide a column from the grid */
    HeaderMenuExtension.prototype.hideColumn = function (column) {
        if (this.sharedService.grid && this.sharedService.grid.getColumns && this.sharedService.grid.setColumns && this.sharedService.grid.getColumnIndex) {
            var columnIndex = this.sharedService.grid.getColumnIndex(column.id);
            var currentColumns = this.sharedService.grid.getColumns();
            var visibleColumns = this.extensionUtility.arrayRemoveItemByIndex(currentColumns, columnIndex);
            this.sharedService.visibleColumns = visibleColumns;
            this.sharedService.grid.setColumns(visibleColumns);
        }
    };
    /**
     * Translate the Header Menu titles, we need to loop through all column definition to re-translate them
     */
    HeaderMenuExtension.prototype.translateHeaderMenu = function () {
        if (this.sharedService.gridOptions && this.sharedService.gridOptions.headerMenu) {
            this.resetHeaderMenuTranslations(this.sharedService.visibleColumns);
        }
    };
    // --
    // private functions
    // ------------------
    /** @return default Header Menu options */
    HeaderMenuExtension.prototype.getDefaultHeaderMenuOptions = function () {
        return {
            autoAlignOffset: 12,
            minWidth: 140,
            hideColumnHideCommand: false,
            hideSortCommands: false,
            title: ''
        };
    };
    /**
     * Reset all the Grid Menu options which have text to translate
     * @param grid menu object
     */
    HeaderMenuExtension.prototype.resetHeaderMenuTranslations = function (columnDefinitions) {
        var _this = this;
        columnDefinitions.forEach(function (columnDef) {
            if (columnDef && columnDef.header && columnDef.header && columnDef.header.menu && columnDef.header.menu.items) {
                if (!columnDef.excludeFromHeaderMenu) {
                    var columnHeaderMenuItems_1 = columnDef.header.menu.items || [];
                    columnHeaderMenuItems_1.forEach(function (item) {
                        switch (item.command) {
                            case 'clear-filter':
                                item.title = _this.translate.instant('REMOVE_FILTER') || Constants.TEXT_REMOVE_FILTER;
                                break;
                            case 'clear-sort':
                                item.title = _this.translate.instant('REMOVE_SORT') || Constants.TEXT_REMOVE_SORT;
                                break;
                            case 'sort-asc':
                                item.title = _this.translate.instant('SORT_ASCENDING') || Constants.TEXT_SORT_ASCENDING;
                                break;
                            case 'sort-desc':
                                item.title = _this.translate.instant('SORT_DESCENDING') || Constants.TEXT_SORT_DESCENDING;
                                break;
                            case 'hide':
                                item.title = _this.translate.instant('HIDE_COLUMN') || Constants.TEXT_HIDE_COLUMN;
                                break;
                        }
                        // re-translate if there's a "titleKey"
                        if (_this.sharedService.gridOptions && _this.sharedService.gridOptions.enableTranslate) {
                            _this.extensionUtility.translateItems(columnHeaderMenuItems_1, 'titleKey', 'title');
                        }
                    });
                }
            }
        });
    };
    /** Clear the Filter on the current column (if it's actually filtered) */
    HeaderMenuExtension.prototype.clearColumnFilter = function (event, args) {
        if (args && args.column) {
            this.filterService.clearFilterByColumnId(event, args.column.id);
        }
    };
    /** Clear the Sort on the current column (if it's actually sorted) */
    HeaderMenuExtension.prototype.clearColumnSort = function (event, args) {
        if (args && args.column && this.sharedService) {
            // get previously sorted columns
            var allSortedCols = this.sortService.getPreviousColumnSorts();
            var sortedColsWithoutCurrent = this.sortService.getPreviousColumnSorts(args.column.id + '');
            if (Array.isArray(allSortedCols) && Array.isArray(sortedColsWithoutCurrent) && allSortedCols.length !== sortedColsWithoutCurrent.length) {
                if (this.sharedService.gridOptions && this.sharedService.gridOptions.backendServiceApi) {
                    this.sortService.onBackendSortChanged(event, { multiColumnSort: true, sortCols: sortedColsWithoutCurrent, grid: this.sharedService.grid });
                }
                else if (this.sharedService.dataView) {
                    this.sortService.onLocalSortChanged(this.sharedService.grid, this.sharedService.dataView, sortedColsWithoutCurrent, true);
                }
                else {
                    // when using customDataView, we will simply send it as a onSort event with notify
                    var isMultiSort = this.sharedService.gridOptions && this.sharedService.gridOptions.multiColumnSort || false;
                    var sortOutput = isMultiSort ? sortedColsWithoutCurrent : sortedColsWithoutCurrent[0];
                    args.grid.onSort.notify(sortOutput);
                }
                // update the this.sharedService.gridObj sortColumns array which will at the same add the visual sort icon(s) on the UI
                var updatedSortColumns = sortedColsWithoutCurrent.map(function (col) {
                    return {
                        columnId: col && col.sortCol && col.sortCol.id,
                        sortAsc: col && col.sortAsc
                    };
                });
                this.sharedService.grid.setSortColumns(updatedSortColumns); // add sort icon in UI
            }
        }
    };
    /** Execute the Header Menu Commands that was triggered by the onCommand subscribe */
    HeaderMenuExtension.prototype.executeHeaderMenuInternalCommands = function (event, args) {
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
                    var isSortingAsc = (args.command === 'sort-asc');
                    this.sortColumn(event, args, isSortingAsc);
                    break;
                default:
                    break;
            }
        }
    };
    /** Sort the current column */
    HeaderMenuExtension.prototype.sortColumn = function (event, args, isSortingAsc) {
        if (isSortingAsc === void 0) { isSortingAsc = true; }
        if (args && args.column) {
            // get previously sorted columns
            var sortedColsWithoutCurrent = this.sortService.getPreviousColumnSorts(args.column.id + '');
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
                var isMultiSort = this.sharedService && this.sharedService.gridOptions && this.sharedService.gridOptions.multiColumnSort || false;
                var sortOutput = isMultiSort ? sortedColsWithoutCurrent : sortedColsWithoutCurrent[0];
                args.grid.onSort.notify(sortOutput);
            }
            // update the this.sharedService.gridObj sortColumns array which will at the same add the visual sort icon(s) on the UI
            var newSortColumns = sortedColsWithoutCurrent.map(function (col) {
                return {
                    columnId: col && col.sortCol && col.sortCol.id,
                    sortAsc: col && col.sortAsc
                };
            });
            this.sharedService.grid.setSortColumns(newSortColumns); // add sort icon in UI
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
    return HeaderMenuExtension;
}());
export { HeaderMenuExtension };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyTWVudUV4dGVuc2lvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvZXh0ZW5zaW9ucy9oZWFkZXJNZW51RXh0ZW5zaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDekMsT0FBTyxFQUlMLGFBQWEsR0FPZCxNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzNELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBTXREO0lBSUUsNkJBQ1UsZ0JBQWtDLEVBQ2xDLGFBQTRCLEVBQzVCLGFBQTRCLEVBQzVCLFdBQXdCLEVBQ3hCLFNBQTJCO1FBSjNCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsY0FBUyxHQUFULFNBQVMsQ0FBa0I7UUFFbkMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUNoRCxDQUFDO0lBRUQsc0JBQUksNkNBQVk7YUFBaEI7WUFDRSxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDNUIsQ0FBQzs7O09BQUE7SUFFRCxxQ0FBTyxHQUFQO1FBQ0Us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QyxHQUFHO2dCQUNwRSxPQUFPO29CQUNMLFFBQVEsRUFBRSxHQUFHLElBQUksR0FBRyxDQUFDLE9BQU8sSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUU7b0JBQzlDLE9BQU8sRUFBRSxHQUFHLElBQUksR0FBRyxDQUFDLE9BQU87aUJBQzVCLENBQUM7WUFDSixDQUFDLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLHNCQUFzQjtTQUMvRTtJQUNILENBQUM7SUE5VFUsbUJBQW1CO1FBRC9CLFVBQVUsRUFBRTtpREFNaUIsZ0JBQWdCO1lBQ25CLGFBQWE7WUFDYixhQUFhO1lBQ2YsV0FBVztZQUNiLGdCQUFnQjtPQVQxQixtQkFBbUIsQ0ErVC9CO0lBQUQsMEJBQUM7Q0FBQSxBQS9URCxJQStUQztTQS9UWSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcclxuaW1wb3J0IHsgQ29uc3RhbnRzIH0gZnJvbSAnLi4vY29uc3RhbnRzJztcclxuaW1wb3J0IHtcclxuICBDb2x1bW4sXHJcbiAgQ29sdW1uU29ydCxcclxuICBFeHRlbnNpb24sXHJcbiAgRXh0ZW5zaW9uTmFtZSxcclxuICBHcmlkT3B0aW9uLFxyXG4gIEhlYWRlck1lbnUsXHJcbiAgSGVhZGVyTWVudUl0ZW0sXHJcbiAgSGVhZGVyTWVudU9uQ29tbWFuZEFyZ3MsXHJcbiAgSGVhZGVyTWVudU9uQmVmb3JlTWVudVNob3dBcmdzLFxyXG4gIFNsaWNrRXZlbnRIYW5kbGVyLFxyXG59IGZyb20gJy4uL21vZGVscy9pbmRleCc7XHJcbmltcG9ydCB7IEZpbHRlclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9maWx0ZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IFNvcnRTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvc29ydC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU2hhcmVkU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3NoYXJlZC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRXh0ZW5zaW9uVXRpbGl0eSB9IGZyb20gJy4vZXh0ZW5zaW9uVXRpbGl0eSc7XHJcblxyXG4vLyB1c2luZyBleHRlcm5hbCBub24tdHlwZWQganMgbGlicmFyaWVzXHJcbmRlY2xhcmUgdmFyIFNsaWNrOiBhbnk7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBIZWFkZXJNZW51RXh0ZW5zaW9uIGltcGxlbWVudHMgRXh0ZW5zaW9uIHtcclxuICBwcml2YXRlIF9hZGRvbjogYW55O1xyXG4gIHByaXZhdGUgX2V2ZW50SGFuZGxlcjogU2xpY2tFdmVudEhhbmRsZXI7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBleHRlbnNpb25VdGlsaXR5OiBFeHRlbnNpb25VdGlsaXR5LFxyXG4gICAgcHJpdmF0ZSBmaWx0ZXJTZXJ2aWNlOiBGaWx0ZXJTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBzaGFyZWRTZXJ2aWNlOiBTaGFyZWRTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBzb3J0U2VydmljZTogU29ydFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHRyYW5zbGF0ZTogVHJhbnNsYXRlU2VydmljZSxcclxuICApIHtcclxuICAgIHRoaXMuX2V2ZW50SGFuZGxlciA9IG5ldyBTbGljay5FdmVudEhhbmRsZXIoKTtcclxuICB9XHJcblxyXG4gIGdldCBldmVudEhhbmRsZXIoKTogU2xpY2tFdmVudEhhbmRsZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuX2V2ZW50SGFuZGxlcjtcclxuICB9XHJcblxyXG4gIGRpc3Bvc2UoKSB7XHJcbiAgICAvLyB1bnN1YnNjcmliZSBhbGwgU2xpY2tHcmlkIGV2ZW50c1xyXG4gICAgdGhpcy5fZXZlbnRIYW5kbGVyLnVuc3Vic2NyaWJlQWxsKCk7XHJcbiAgICBpZiAodGhpcy5fYWRkb24gJiYgdGhpcy5fYWRkb24uZGVzdHJveSkge1xyXG4gICAgICB0aGlzLl9hZGRvbi5kZXN0cm95KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAqIENyZWF0ZSB0aGUgSGVhZGVyIE1lbnUgYW5kIGV4cG9zZSBhbGwgdGhlIGF2YWlsYWJsZSBob29rcyB0aGF0IHVzZXIgY2FuIHN1YnNjcmliZSAob25Db21tYW5kLCBvbkJlZm9yZU1lbnVTaG93LCAuLi4pXHJcbiAgKiBAcGFyYW0gZ3JpZFxyXG4gICogQHBhcmFtIGRhdGFWaWV3XHJcbiAgKiBAcGFyYW0gY29sdW1uRGVmaW5pdGlvbnNcclxuICAqL1xyXG4gIHJlZ2lzdGVyKCk6IGFueSB7XHJcbiAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucykge1xyXG4gICAgICAvLyBkeW5hbWljYWxseSBpbXBvcnQgdGhlIFNsaWNrR3JpZCBwbHVnaW4gKGFkZG9uKSB3aXRoIFJlcXVpcmVKU1xyXG4gICAgICB0aGlzLmV4dGVuc2lvblV0aWxpdHkubG9hZEV4dGVuc2lvbkR5bmFtaWNhbGx5KEV4dGVuc2lvbk5hbWUuaGVhZGVyTWVudSk7XHJcbiAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5oZWFkZXJNZW51ID0geyAuLi50aGlzLmdldERlZmF1bHRIZWFkZXJNZW51T3B0aW9ucygpLCAuLi50aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuaGVhZGVyTWVudSB9O1xyXG4gICAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmVuYWJsZUhlYWRlck1lbnUpIHtcclxuICAgICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuaGVhZGVyTWVudSA9IHRoaXMuYWRkSGVhZGVyTWVudUN1c3RvbUNvbW1hbmRzKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucywgdGhpcy5zaGFyZWRTZXJ2aWNlLmNvbHVtbkRlZmluaXRpb25zKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5fYWRkb24gPSBuZXcgU2xpY2suUGx1Z2lucy5IZWFkZXJNZW51KHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5oZWFkZXJNZW51KTtcclxuICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQucmVnaXN0ZXJQbHVnaW4odGhpcy5fYWRkb24pO1xyXG5cclxuICAgICAgLy8gaG9vayBhbGwgZXZlbnRzXHJcbiAgICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZCAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuaGVhZGVyTWVudSkge1xyXG4gICAgICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuaGVhZGVyTWVudS5vbkV4dGVuc2lvblJlZ2lzdGVyZWQpIHtcclxuICAgICAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5oZWFkZXJNZW51Lm9uRXh0ZW5zaW9uUmVnaXN0ZXJlZCh0aGlzLl9hZGRvbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2V2ZW50SGFuZGxlci5zdWJzY3JpYmUodGhpcy5fYWRkb24ub25Db21tYW5kLCAoZTogYW55LCBhcmdzOiBIZWFkZXJNZW51T25Db21tYW5kQXJncykgPT4ge1xyXG4gICAgICAgICAgdGhpcy5leGVjdXRlSGVhZGVyTWVudUludGVybmFsQ29tbWFuZHMoZSwgYXJncyk7XHJcbiAgICAgICAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmhlYWRlck1lbnUgJiYgdHlwZW9mIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5oZWFkZXJNZW51Lm9uQ29tbWFuZCA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuaGVhZGVyTWVudS5vbkNvbW1hbmQoZSwgYXJncyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5fZXZlbnRIYW5kbGVyLnN1YnNjcmliZSh0aGlzLl9hZGRvbi5vbkJlZm9yZU1lbnVTaG93LCAoZTogYW55LCBhcmdzOiBIZWFkZXJNZW51T25CZWZvcmVNZW51U2hvd0FyZ3MpID0+IHtcclxuICAgICAgICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuaGVhZGVyTWVudSAmJiB0eXBlb2YgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmhlYWRlck1lbnUub25CZWZvcmVNZW51U2hvdyA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuaGVhZGVyTWVudS5vbkJlZm9yZU1lbnVTaG93KGUsIGFyZ3MpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB0aGlzLl9hZGRvbjtcclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlIEhlYWRlciBNZW51IHdpdGggQ3VzdG9tIENvbW1hbmRzIGlmIHVzZXIgaGFzIGVuYWJsZWQgSGVhZGVyIE1lbnVcclxuICAgKiBAcGFyYW0gb3B0aW9uc1xyXG4gICAqIEBwYXJhbSBjb2x1bW5EZWZpbml0aW9uc1xyXG4gICAqIEByZXR1cm4gaGVhZGVyIG1lbnVcclxuICAgKi9cclxuICBwcml2YXRlIGFkZEhlYWRlck1lbnVDdXN0b21Db21tYW5kcyhvcHRpb25zOiBHcmlkT3B0aW9uLCBjb2x1bW5EZWZpbml0aW9uczogQ29sdW1uW10pOiBIZWFkZXJNZW51IHtcclxuICAgIGNvbnN0IGhlYWRlck1lbnVPcHRpb25zID0gb3B0aW9ucy5oZWFkZXJNZW51IHx8IHt9O1xyXG5cclxuICAgIGlmIChjb2x1bW5EZWZpbml0aW9ucyAmJiBBcnJheS5pc0FycmF5KGNvbHVtbkRlZmluaXRpb25zKSAmJiBvcHRpb25zLmVuYWJsZUhlYWRlck1lbnUpIHtcclxuICAgICAgY29sdW1uRGVmaW5pdGlvbnMuZm9yRWFjaCgoY29sdW1uRGVmOiBDb2x1bW4pID0+IHtcclxuICAgICAgICBpZiAoY29sdW1uRGVmICYmICFjb2x1bW5EZWYuZXhjbHVkZUZyb21IZWFkZXJNZW51KSB7XHJcbiAgICAgICAgICBpZiAoIWNvbHVtbkRlZi5oZWFkZXIgfHwgIWNvbHVtbkRlZi5oZWFkZXIubWVudSkge1xyXG4gICAgICAgICAgICBjb2x1bW5EZWYuaGVhZGVyID0ge1xyXG4gICAgICAgICAgICAgIG1lbnU6IHtcclxuICAgICAgICAgICAgICAgIGl0ZW1zOiBbXVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBjb25zdCBjb2x1bW5IZWFkZXJNZW51SXRlbXM6IEhlYWRlck1lbnVJdGVtW10gPSBjb2x1bW5EZWYgJiYgY29sdW1uRGVmLmhlYWRlciAmJiBjb2x1bW5EZWYuaGVhZGVyLm1lbnUgJiYgY29sdW1uRGVmLmhlYWRlci5tZW51Lml0ZW1zIHx8IFtdO1xyXG5cclxuICAgICAgICAgIC8vIFNvcnRpbmcgQ29tbWFuZHNcclxuICAgICAgICAgIGlmIChvcHRpb25zLmVuYWJsZVNvcnRpbmcgJiYgY29sdW1uRGVmLnNvcnRhYmxlICYmIGhlYWRlck1lbnVPcHRpb25zICYmICFoZWFkZXJNZW51T3B0aW9ucy5oaWRlU29ydENvbW1hbmRzKSB7XHJcbiAgICAgICAgICAgIGlmIChjb2x1bW5IZWFkZXJNZW51SXRlbXMuZmlsdGVyKChpdGVtOiBIZWFkZXJNZW51SXRlbSkgPT4gaXRlbS5jb21tYW5kID09PSAnc29ydC1hc2MnKS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICBjb2x1bW5IZWFkZXJNZW51SXRlbXMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBpY29uQ3NzQ2xhc3M6IGhlYWRlck1lbnVPcHRpb25zLmljb25Tb3J0QXNjQ29tbWFuZCB8fCAnZmEgZmEtc29ydC1hc2MnLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IG9wdGlvbnMuZW5hYmxlVHJhbnNsYXRlID8gdGhpcy50cmFuc2xhdGUuaW5zdGFudCgnU09SVF9BU0NFTkRJTkcnKSA6IENvbnN0YW50cy5URVhUX1NPUlRfQVNDRU5ESU5HLFxyXG4gICAgICAgICAgICAgICAgY29tbWFuZDogJ3NvcnQtYXNjJyxcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uT3JkZXI6IDUwXHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNvbHVtbkhlYWRlck1lbnVJdGVtcy5maWx0ZXIoKGl0ZW06IEhlYWRlck1lbnVJdGVtKSA9PiBpdGVtLmNvbW1hbmQgPT09ICdzb3J0LWRlc2MnKS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICBjb2x1bW5IZWFkZXJNZW51SXRlbXMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBpY29uQ3NzQ2xhc3M6IGhlYWRlck1lbnVPcHRpb25zLmljb25Tb3J0RGVzY0NvbW1hbmQgfHwgJ2ZhIGZhLXNvcnQtZGVzYycsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogb3B0aW9ucy5lbmFibGVUcmFuc2xhdGUgPyB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KCdTT1JUX0RFU0NFTkRJTkcnKSA6IENvbnN0YW50cy5URVhUX1NPUlRfREVTQ0VORElORyxcclxuICAgICAgICAgICAgICAgIGNvbW1hbmQ6ICdzb3J0LWRlc2MnLFxyXG4gICAgICAgICAgICAgICAgcG9zaXRpb25PcmRlcjogNTFcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gYWRkIGEgZGl2aWRlciAoc2VwYXJhdG9yKSBiZXR3ZWVuIHRoZSB0b3Agc29ydCBjb21tYW5kcyBhbmQgdGhlIG90aGVyIGNsZWFyIGNvbW1hbmRzXHJcbiAgICAgICAgICAgIGlmIChjb2x1bW5IZWFkZXJNZW51SXRlbXMuZmlsdGVyKChpdGVtOiBIZWFkZXJNZW51SXRlbSkgPT4gaXRlbS5wb3NpdGlvbk9yZGVyID09PSA1MikubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgY29sdW1uSGVhZGVyTWVudUl0ZW1zLnB1c2goeyBkaXZpZGVyOiB0cnVlLCBjb21tYW5kOiAnJywgcG9zaXRpb25PcmRlcjogNTIgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICghaGVhZGVyTWVudU9wdGlvbnMuaGlkZUNsZWFyU29ydENvbW1hbmQgJiYgY29sdW1uSGVhZGVyTWVudUl0ZW1zLmZpbHRlcigoaXRlbTogSGVhZGVyTWVudUl0ZW0pID0+IGl0ZW0uY29tbWFuZCA9PT0gJ2NsZWFyLXNvcnQnKS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICBjb2x1bW5IZWFkZXJNZW51SXRlbXMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBpY29uQ3NzQ2xhc3M6IGhlYWRlck1lbnVPcHRpb25zLmljb25DbGVhclNvcnRDb21tYW5kIHx8ICdmYSBmYS11bnNvcnRlZCcsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogb3B0aW9ucy5lbmFibGVUcmFuc2xhdGUgPyB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KCdSRU1PVkVfU09SVCcpIDogQ29uc3RhbnRzLlRFWFRfUkVNT1ZFX1NPUlQsXHJcbiAgICAgICAgICAgICAgICBjb21tYW5kOiAnY2xlYXItc29ydCcsXHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbk9yZGVyOiA1NFxyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgLy8gRmlsdGVyaW5nIENvbW1hbmRzXHJcbiAgICAgICAgICBpZiAob3B0aW9ucy5lbmFibGVGaWx0ZXJpbmcgJiYgY29sdW1uRGVmLmZpbHRlcmFibGUgJiYgaGVhZGVyTWVudU9wdGlvbnMgJiYgIWhlYWRlck1lbnVPcHRpb25zLmhpZGVGaWx0ZXJDb21tYW5kcykge1xyXG4gICAgICAgICAgICBpZiAoIWhlYWRlck1lbnVPcHRpb25zLmhpZGVDbGVhckZpbHRlckNvbW1hbmQgJiYgY29sdW1uSGVhZGVyTWVudUl0ZW1zLmZpbHRlcigoaXRlbTogSGVhZGVyTWVudUl0ZW0pID0+IGl0ZW0uY29tbWFuZCA9PT0gJ2NsZWFyLWZpbHRlcicpLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgIGNvbHVtbkhlYWRlck1lbnVJdGVtcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgIGljb25Dc3NDbGFzczogaGVhZGVyTWVudU9wdGlvbnMuaWNvbkNsZWFyRmlsdGVyQ29tbWFuZCB8fCAnZmEgZmEtZmlsdGVyJyxcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBvcHRpb25zLmVuYWJsZVRyYW5zbGF0ZSA/IHRoaXMudHJhbnNsYXRlLmluc3RhbnQoJ1JFTU9WRV9GSUxURVInKSA6IENvbnN0YW50cy5URVhUX1JFTU9WRV9GSUxURVIsXHJcbiAgICAgICAgICAgICAgICBjb21tYW5kOiAnY2xlYXItZmlsdGVyJyxcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uT3JkZXI6IDUzXHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvLyBIaWRlIENvbHVtbiBDb21tYW5kXHJcbiAgICAgICAgICBpZiAoaGVhZGVyTWVudU9wdGlvbnMgJiYgIWhlYWRlck1lbnVPcHRpb25zLmhpZGVDb2x1bW5IaWRlQ29tbWFuZCAmJiBjb2x1bW5IZWFkZXJNZW51SXRlbXMuZmlsdGVyKChpdGVtOiBIZWFkZXJNZW51SXRlbSkgPT4gaXRlbS5jb21tYW5kID09PSAnaGlkZScpLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICBjb2x1bW5IZWFkZXJNZW51SXRlbXMucHVzaCh7XHJcbiAgICAgICAgICAgICAgaWNvbkNzc0NsYXNzOiBoZWFkZXJNZW51T3B0aW9ucy5pY29uQ29sdW1uSGlkZUNvbW1hbmQgfHwgJ2ZhIGZhLXRpbWVzJyxcclxuICAgICAgICAgICAgICB0aXRsZTogb3B0aW9ucy5lbmFibGVUcmFuc2xhdGUgPyB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KCdISURFX0NPTFVNTicpIDogQ29uc3RhbnRzLlRFWFRfSElERV9DT0xVTU4sXHJcbiAgICAgICAgICAgICAgY29tbWFuZDogJ2hpZGUnLFxyXG4gICAgICAgICAgICAgIHBvc2l0aW9uT3JkZXI6IDU1XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHRoaXMuZXh0ZW5zaW9uVXRpbGl0eS50cmFuc2xhdGVJdGVtcyhjb2x1bW5IZWFkZXJNZW51SXRlbXMsICd0aXRsZUtleScsICd0aXRsZScpO1xyXG4gICAgICAgICAgdGhpcy5leHRlbnNpb25VdGlsaXR5LnNvcnRJdGVtcyhjb2x1bW5IZWFkZXJNZW51SXRlbXMsICdwb3NpdGlvbk9yZGVyJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiBoZWFkZXJNZW51T3B0aW9ucztcclxuICB9XHJcblxyXG4gIC8qKiBIaWRlIGEgY29sdW1uIGZyb20gdGhlIGdyaWQgKi9cclxuICBoaWRlQ29sdW1uKGNvbHVtbjogQ29sdW1uKSB7XHJcbiAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQuZ2V0Q29sdW1ucyAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZC5zZXRDb2x1bW5zICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLmdldENvbHVtbkluZGV4KSB7XHJcbiAgICAgIGNvbnN0IGNvbHVtbkluZGV4ID0gdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQuZ2V0Q29sdW1uSW5kZXgoY29sdW1uLmlkKTtcclxuICAgICAgY29uc3QgY3VycmVudENvbHVtbnMgPSB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZC5nZXRDb2x1bW5zKCk7XHJcbiAgICAgIGNvbnN0IHZpc2libGVDb2x1bW5zID0gdGhpcy5leHRlbnNpb25VdGlsaXR5LmFycmF5UmVtb3ZlSXRlbUJ5SW5kZXgoY3VycmVudENvbHVtbnMsIGNvbHVtbkluZGV4KTtcclxuICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLnZpc2libGVDb2x1bW5zID0gdmlzaWJsZUNvbHVtbnM7XHJcbiAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLnNldENvbHVtbnModmlzaWJsZUNvbHVtbnMpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVHJhbnNsYXRlIHRoZSBIZWFkZXIgTWVudSB0aXRsZXMsIHdlIG5lZWQgdG8gbG9vcCB0aHJvdWdoIGFsbCBjb2x1bW4gZGVmaW5pdGlvbiB0byByZS10cmFuc2xhdGUgdGhlbVxyXG4gICAqL1xyXG4gIHRyYW5zbGF0ZUhlYWRlck1lbnUoKSB7XHJcbiAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5oZWFkZXJNZW51KSB7XHJcbiAgICAgIHRoaXMucmVzZXRIZWFkZXJNZW51VHJhbnNsYXRpb25zKHRoaXMuc2hhcmVkU2VydmljZS52aXNpYmxlQ29sdW1ucyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyAtLVxyXG4gIC8vIHByaXZhdGUgZnVuY3Rpb25zXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gIC8qKiBAcmV0dXJuIGRlZmF1bHQgSGVhZGVyIE1lbnUgb3B0aW9ucyAqL1xyXG4gIHByaXZhdGUgZ2V0RGVmYXVsdEhlYWRlck1lbnVPcHRpb25zKCk6IEhlYWRlck1lbnUge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgYXV0b0FsaWduT2Zmc2V0OiAxMixcclxuICAgICAgbWluV2lkdGg6IDE0MCxcclxuICAgICAgaGlkZUNvbHVtbkhpZGVDb21tYW5kOiBmYWxzZSxcclxuICAgICAgaGlkZVNvcnRDb21tYW5kczogZmFsc2UsXHJcbiAgICAgIHRpdGxlOiAnJ1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlc2V0IGFsbCB0aGUgR3JpZCBNZW51IG9wdGlvbnMgd2hpY2ggaGF2ZSB0ZXh0IHRvIHRyYW5zbGF0ZVxyXG4gICAqIEBwYXJhbSBncmlkIG1lbnUgb2JqZWN0XHJcbiAgICovXHJcbiAgcHJpdmF0ZSByZXNldEhlYWRlck1lbnVUcmFuc2xhdGlvbnMoY29sdW1uRGVmaW5pdGlvbnM6IENvbHVtbltdKSB7XHJcbiAgICBjb2x1bW5EZWZpbml0aW9ucy5mb3JFYWNoKChjb2x1bW5EZWY6IENvbHVtbikgPT4ge1xyXG4gICAgICBpZiAoY29sdW1uRGVmICYmIGNvbHVtbkRlZi5oZWFkZXIgJiYgY29sdW1uRGVmLmhlYWRlciAmJiBjb2x1bW5EZWYuaGVhZGVyLm1lbnUgJiYgY29sdW1uRGVmLmhlYWRlci5tZW51Lml0ZW1zKSB7XHJcbiAgICAgICAgaWYgKCFjb2x1bW5EZWYuZXhjbHVkZUZyb21IZWFkZXJNZW51KSB7XHJcbiAgICAgICAgICBjb25zdCBjb2x1bW5IZWFkZXJNZW51SXRlbXM6IEhlYWRlck1lbnVJdGVtW10gPSBjb2x1bW5EZWYuaGVhZGVyLm1lbnUuaXRlbXMgfHwgW107XHJcbiAgICAgICAgICBjb2x1bW5IZWFkZXJNZW51SXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKGl0ZW0uY29tbWFuZCkge1xyXG4gICAgICAgICAgICAgIGNhc2UgJ2NsZWFyLWZpbHRlcic6XHJcbiAgICAgICAgICAgICAgICBpdGVtLnRpdGxlID0gdGhpcy50cmFuc2xhdGUuaW5zdGFudCgnUkVNT1ZFX0ZJTFRFUicpIHx8IENvbnN0YW50cy5URVhUX1JFTU9WRV9GSUxURVI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICBjYXNlICdjbGVhci1zb3J0JzpcclxuICAgICAgICAgICAgICAgIGl0ZW0udGl0bGUgPSB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KCdSRU1PVkVfU09SVCcpIHx8IENvbnN0YW50cy5URVhUX1JFTU9WRV9TT1JUO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgY2FzZSAnc29ydC1hc2MnOlxyXG4gICAgICAgICAgICAgICAgaXRlbS50aXRsZSA9IHRoaXMudHJhbnNsYXRlLmluc3RhbnQoJ1NPUlRfQVNDRU5ESU5HJykgfHwgQ29uc3RhbnRzLlRFWFRfU09SVF9BU0NFTkRJTkc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICBjYXNlICdzb3J0LWRlc2MnOlxyXG4gICAgICAgICAgICAgICAgaXRlbS50aXRsZSA9IHRoaXMudHJhbnNsYXRlLmluc3RhbnQoJ1NPUlRfREVTQ0VORElORycpIHx8IENvbnN0YW50cy5URVhUX1NPUlRfREVTQ0VORElORztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgIGNhc2UgJ2hpZGUnOlxyXG4gICAgICAgICAgICAgICAgaXRlbS50aXRsZSA9IHRoaXMudHJhbnNsYXRlLmluc3RhbnQoJ0hJREVfQ09MVU1OJykgfHwgQ29uc3RhbnRzLlRFWFRfSElERV9DT0xVTU47XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gcmUtdHJhbnNsYXRlIGlmIHRoZXJlJ3MgYSBcInRpdGxlS2V5XCJcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucyAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZW5hYmxlVHJhbnNsYXRlKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5leHRlbnNpb25VdGlsaXR5LnRyYW5zbGF0ZUl0ZW1zKGNvbHVtbkhlYWRlck1lbnVJdGVtcywgJ3RpdGxlS2V5JywgJ3RpdGxlJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKiogQ2xlYXIgdGhlIEZpbHRlciBvbiB0aGUgY3VycmVudCBjb2x1bW4gKGlmIGl0J3MgYWN0dWFsbHkgZmlsdGVyZWQpICovXHJcbiAgcHJpdmF0ZSBjbGVhckNvbHVtbkZpbHRlcihldmVudDogRXZlbnQsIGFyZ3M6IEhlYWRlck1lbnVPbkNvbW1hbmRBcmdzKSB7XHJcbiAgICBpZiAoYXJncyAmJiBhcmdzLmNvbHVtbikge1xyXG4gICAgICB0aGlzLmZpbHRlclNlcnZpY2UuY2xlYXJGaWx0ZXJCeUNvbHVtbklkKGV2ZW50LCBhcmdzLmNvbHVtbi5pZCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKiogQ2xlYXIgdGhlIFNvcnQgb24gdGhlIGN1cnJlbnQgY29sdW1uIChpZiBpdCdzIGFjdHVhbGx5IHNvcnRlZCkgKi9cclxuICBwcml2YXRlIGNsZWFyQ29sdW1uU29ydChldmVudDogRXZlbnQsIGFyZ3M6IEhlYWRlck1lbnVPbkNvbW1hbmRBcmdzKSB7XHJcbiAgICBpZiAoYXJncyAmJiBhcmdzLmNvbHVtbiAmJiB0aGlzLnNoYXJlZFNlcnZpY2UpIHtcclxuICAgICAgLy8gZ2V0IHByZXZpb3VzbHkgc29ydGVkIGNvbHVtbnNcclxuICAgICAgY29uc3QgYWxsU29ydGVkQ29sczogQ29sdW1uU29ydFtdID0gdGhpcy5zb3J0U2VydmljZS5nZXRQcmV2aW91c0NvbHVtblNvcnRzKCk7XHJcbiAgICAgIGNvbnN0IHNvcnRlZENvbHNXaXRob3V0Q3VycmVudDogQ29sdW1uU29ydFtdID0gdGhpcy5zb3J0U2VydmljZS5nZXRQcmV2aW91c0NvbHVtblNvcnRzKGFyZ3MuY29sdW1uLmlkICsgJycpO1xyXG5cclxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoYWxsU29ydGVkQ29scykgJiYgQXJyYXkuaXNBcnJheShzb3J0ZWRDb2xzV2l0aG91dEN1cnJlbnQpICYmIGFsbFNvcnRlZENvbHMubGVuZ3RoICE9PSBzb3J0ZWRDb2xzV2l0aG91dEN1cnJlbnQubGVuZ3RoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucyAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuYmFja2VuZFNlcnZpY2VBcGkpIHtcclxuICAgICAgICAgIHRoaXMuc29ydFNlcnZpY2Uub25CYWNrZW5kU29ydENoYW5nZWQoZXZlbnQsIHsgbXVsdGlDb2x1bW5Tb3J0OiB0cnVlLCBzb3J0Q29sczogc29ydGVkQ29sc1dpdGhvdXRDdXJyZW50LCBncmlkOiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZCB9KTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5kYXRhVmlldykge1xyXG4gICAgICAgICAgdGhpcy5zb3J0U2VydmljZS5vbkxvY2FsU29ydENoYW5nZWQodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQsIHRoaXMuc2hhcmVkU2VydmljZS5kYXRhVmlldywgc29ydGVkQ29sc1dpdGhvdXRDdXJyZW50LCB0cnVlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgLy8gd2hlbiB1c2luZyBjdXN0b21EYXRhVmlldywgd2Ugd2lsbCBzaW1wbHkgc2VuZCBpdCBhcyBhIG9uU29ydCBldmVudCB3aXRoIG5vdGlmeVxyXG4gICAgICAgICAgY29uc3QgaXNNdWx0aVNvcnQgPSB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLm11bHRpQ29sdW1uU29ydCB8fCBmYWxzZTtcclxuICAgICAgICAgIGNvbnN0IHNvcnRPdXRwdXQgPSBpc011bHRpU29ydCA/IHNvcnRlZENvbHNXaXRob3V0Q3VycmVudCA6IHNvcnRlZENvbHNXaXRob3V0Q3VycmVudFswXTtcclxuICAgICAgICAgIGFyZ3MuZ3JpZC5vblNvcnQubm90aWZ5KHNvcnRPdXRwdXQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gdXBkYXRlIHRoZSB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9iaiBzb3J0Q29sdW1ucyBhcnJheSB3aGljaCB3aWxsIGF0IHRoZSBzYW1lIGFkZCB0aGUgdmlzdWFsIHNvcnQgaWNvbihzKSBvbiB0aGUgVUlcclxuICAgICAgICBjb25zdCB1cGRhdGVkU29ydENvbHVtbnM6IENvbHVtblNvcnRbXSA9IHNvcnRlZENvbHNXaXRob3V0Q3VycmVudC5tYXAoKGNvbCkgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgY29sdW1uSWQ6IGNvbCAmJiBjb2wuc29ydENvbCAmJiBjb2wuc29ydENvbC5pZCxcclxuICAgICAgICAgICAgc29ydEFzYzogY29sICYmIGNvbC5zb3J0QXNjXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLnNldFNvcnRDb2x1bW5zKHVwZGF0ZWRTb3J0Q29sdW1ucyk7IC8vIGFkZCBzb3J0IGljb24gaW4gVUlcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIEV4ZWN1dGUgdGhlIEhlYWRlciBNZW51IENvbW1hbmRzIHRoYXQgd2FzIHRyaWdnZXJlZCBieSB0aGUgb25Db21tYW5kIHN1YnNjcmliZSAqL1xyXG4gIHByaXZhdGUgZXhlY3V0ZUhlYWRlck1lbnVJbnRlcm5hbENvbW1hbmRzKGV2ZW50OiBFdmVudCwgYXJnczogSGVhZGVyTWVudU9uQ29tbWFuZEFyZ3MpIHtcclxuICAgIGlmIChhcmdzICYmIGFyZ3MuY29tbWFuZCkge1xyXG4gICAgICBzd2l0Y2ggKGFyZ3MuY29tbWFuZCkge1xyXG4gICAgICAgIGNhc2UgJ2hpZGUnOlxyXG4gICAgICAgICAgdGhpcy5oaWRlQ29sdW1uKGFyZ3MuY29sdW1uKTtcclxuICAgICAgICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmVuYWJsZUF1dG9TaXplQ29sdW1ucykge1xyXG4gICAgICAgICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZC5hdXRvc2l6ZUNvbHVtbnMoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ2NsZWFyLWZpbHRlcic6XHJcbiAgICAgICAgICB0aGlzLmNsZWFyQ29sdW1uRmlsdGVyKGV2ZW50LCBhcmdzKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ2NsZWFyLXNvcnQnOlxyXG4gICAgICAgICAgdGhpcy5jbGVhckNvbHVtblNvcnQoZXZlbnQsIGFyZ3MpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnc29ydC1hc2MnOlxyXG4gICAgICAgIGNhc2UgJ3NvcnQtZGVzYyc6XHJcbiAgICAgICAgICBjb25zdCBpc1NvcnRpbmdBc2MgPSAoYXJncy5jb21tYW5kID09PSAnc29ydC1hc2MnKTtcclxuICAgICAgICAgIHRoaXMuc29ydENvbHVtbihldmVudCwgYXJncywgaXNTb3J0aW5nQXNjKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIFNvcnQgdGhlIGN1cnJlbnQgY29sdW1uICovXHJcbiAgcHJpdmF0ZSBzb3J0Q29sdW1uKGV2ZW50OiBFdmVudCwgYXJnczogSGVhZGVyTWVudU9uQ29tbWFuZEFyZ3MsIGlzU29ydGluZ0FzYyA9IHRydWUpIHtcclxuICAgIGlmIChhcmdzICYmIGFyZ3MuY29sdW1uKSB7XHJcbiAgICAgIC8vIGdldCBwcmV2aW91c2x5IHNvcnRlZCBjb2x1bW5zXHJcbiAgICAgIGNvbnN0IHNvcnRlZENvbHNXaXRob3V0Q3VycmVudDogQ29sdW1uU29ydFtdID0gdGhpcy5zb3J0U2VydmljZS5nZXRQcmV2aW91c0NvbHVtblNvcnRzKGFyZ3MuY29sdW1uLmlkICsgJycpO1xyXG5cclxuICAgICAgLy8gYWRkIHRvIHRoZSBjb2x1bW4gYXJyYXksIHRoZSBjb2x1bW4gc29ydGVkIGJ5IHRoZSBoZWFkZXIgbWVudVxyXG4gICAgICBzb3J0ZWRDb2xzV2l0aG91dEN1cnJlbnQucHVzaCh7IHNvcnRDb2w6IGFyZ3MuY29sdW1uLCBzb3J0QXNjOiBpc1NvcnRpbmdBc2MgfSk7XHJcbiAgICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuYmFja2VuZFNlcnZpY2VBcGkpIHtcclxuICAgICAgICB0aGlzLnNvcnRTZXJ2aWNlLm9uQmFja2VuZFNvcnRDaGFuZ2VkKGV2ZW50LCB7IG11bHRpQ29sdW1uU29ydDogdHJ1ZSwgc29ydENvbHM6IHNvcnRlZENvbHNXaXRob3V0Q3VycmVudCwgZ3JpZDogdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQgfSk7XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmRhdGFWaWV3KSB7XHJcbiAgICAgICAgdGhpcy5zb3J0U2VydmljZS5vbkxvY2FsU29ydENoYW5nZWQodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQsIHRoaXMuc2hhcmVkU2VydmljZS5kYXRhVmlldywgc29ydGVkQ29sc1dpdGhvdXRDdXJyZW50KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyB3aGVuIHVzaW5nIGN1c3RvbURhdGFWaWV3LCB3ZSB3aWxsIHNpbXBseSBzZW5kIGl0IGFzIGEgb25Tb3J0IGV2ZW50IHdpdGggbm90aWZ5XHJcbiAgICAgICAgY29uc3QgaXNNdWx0aVNvcnQgPSB0aGlzLnNoYXJlZFNlcnZpY2UgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5tdWx0aUNvbHVtblNvcnQgfHwgZmFsc2U7XHJcbiAgICAgICAgY29uc3Qgc29ydE91dHB1dCA9IGlzTXVsdGlTb3J0ID8gc29ydGVkQ29sc1dpdGhvdXRDdXJyZW50IDogc29ydGVkQ29sc1dpdGhvdXRDdXJyZW50WzBdO1xyXG4gICAgICAgIGFyZ3MuZ3JpZC5vblNvcnQubm90aWZ5KHNvcnRPdXRwdXQpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyB1cGRhdGUgdGhlIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT2JqIHNvcnRDb2x1bW5zIGFycmF5IHdoaWNoIHdpbGwgYXQgdGhlIHNhbWUgYWRkIHRoZSB2aXN1YWwgc29ydCBpY29uKHMpIG9uIHRoZSBVSVxyXG4gICAgICBjb25zdCBuZXdTb3J0Q29sdW1uczogQ29sdW1uU29ydFtdID0gc29ydGVkQ29sc1dpdGhvdXRDdXJyZW50Lm1hcCgoY29sKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIGNvbHVtbklkOiBjb2wgJiYgY29sLnNvcnRDb2wgJiYgY29sLnNvcnRDb2wuaWQsXHJcbiAgICAgICAgICBzb3J0QXNjOiBjb2wgJiYgY29sLnNvcnRBc2NcclxuICAgICAgICB9O1xyXG4gICAgICB9KTtcclxuICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQuc2V0U29ydENvbHVtbnMobmV3U29ydENvbHVtbnMpOyAvLyBhZGQgc29ydCBpY29uIGluIFVJXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==