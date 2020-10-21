import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Constants } from '../constants';
import { DelimiterType, ExtensionName, FileType, } from '../models';
import { ExportService } from '../services/export.service';
import { ExtensionUtility } from './extensionUtility';
import { FilterService } from '../services/filter.service';
import { SortService } from '../services/sort.service';
import { castToPromise } from '../services/utilities';
import { SharedService } from '../services/shared.service';
var GridMenuExtension = /** @class */ (function () {
    function GridMenuExtension(exportService, extensionUtility, filterService, sharedService, sortService, translate) {
        this.exportService = exportService;
        this.extensionUtility = extensionUtility;
        this.filterService = filterService;
        this.sharedService = sharedService;
        this.sortService = sortService;
        this.translate = translate;
        this._areVisibleColumnDifferent = false;
        this._eventHandler = new Slick.EventHandler();
    }
    Object.defineProperty(GridMenuExtension.prototype, "eventHandler", {
        get: function () {
            return this._eventHandler;
        },
        enumerable: true,
        configurable: true
    });
    GridMenuExtension.prototype.dispose = function () {
        // unsubscribe all SlickGrid events
        this._eventHandler.unsubscribeAll();
        if (this._addon && this._addon.destroy) {
            this._addon.destroy();
        }
    };
    GridMenuExtension.prototype.showGridMenu = function (e) {
        this._addon.showGridMenu(e);
    };
    /** Create the Header Menu and expose all the available hooks that user can subscribe (onCommand, onBeforeMenuShow, ...) */
    GridMenuExtension.prototype.register = function () {
        var _this = this;
        // keep original user grid menu, useful when switching locale to translate
        this._userOriginalGridMenu = tslib_1.__assign({}, this.sharedService.gridOptions.gridMenu);
        if (this.sharedService.gridOptions && this.sharedService.gridOptions.gridMenu) {
            // dynamically import the SlickGrid plugin (addon) with RequireJS
            this.extensionUtility.loadExtensionDynamically(ExtensionName.gridMenu);
            this.sharedService.gridOptions.gridMenu = tslib_1.__assign({}, this.getDefaultGridMenuOptions(), this.sharedService.gridOptions.gridMenu);
            // merge original user grid menu items with internal items
            // then sort all Grid Menu Custom Items (sorted by pointer, no need to use the return)
            this.sharedService.gridOptions.gridMenu.customItems = tslib_1.__spread(this._userOriginalGridMenu.customItems || [], this.addGridMenuCustomCommands());
            this.extensionUtility.translateItems(this.sharedService.gridOptions.gridMenu.customItems, 'titleKey', 'title');
            this.extensionUtility.sortItems(this.sharedService.gridOptions.gridMenu.customItems, 'positionOrder');
            this._addon = new Slick.Controls.GridMenu(this.sharedService.columnDefinitions, this.sharedService.grid, this.sharedService.gridOptions);
            // hook all events
            if (this.sharedService.grid && this.sharedService.gridOptions.gridMenu) {
                if (this.sharedService.gridOptions.gridMenu.onExtensionRegistered) {
                    this.sharedService.gridOptions.gridMenu.onExtensionRegistered(this._addon);
                }
                this._eventHandler.subscribe(this._addon.onBeforeMenuShow, function (e, args) {
                    if (_this.sharedService.gridOptions.gridMenu && typeof _this.sharedService.gridOptions.gridMenu.onBeforeMenuShow === 'function') {
                        _this.sharedService.gridOptions.gridMenu.onBeforeMenuShow(e, args);
                    }
                });
                this._eventHandler.subscribe(this._addon.onColumnsChanged, function (e, args) {
                    _this._areVisibleColumnDifferent = true;
                    if (_this.sharedService.gridOptions.gridMenu && typeof _this.sharedService.gridOptions.gridMenu.onColumnsChanged === 'function') {
                        _this.sharedService.gridOptions.gridMenu.onColumnsChanged(e, args);
                    }
                });
                this._eventHandler.subscribe(this._addon.onCommand, function (e, args) {
                    _this.executeGridMenuInternalCustomCommands(e, args);
                    if (_this.sharedService.gridOptions.gridMenu && typeof _this.sharedService.gridOptions.gridMenu.onCommand === 'function') {
                        _this.sharedService.gridOptions.gridMenu.onCommand(e, args);
                    }
                });
                this._eventHandler.subscribe(this._addon.onMenuClose, function (e, args) {
                    if (_this.sharedService.gridOptions.gridMenu && typeof _this.sharedService.gridOptions.gridMenu.onMenuClose === 'function') {
                        _this.sharedService.gridOptions.gridMenu.onMenuClose(e, args);
                    }
                    // we also want to resize the columns if the user decided to hide certain column(s)
                    if (_this.sharedService.grid && typeof _this.sharedService.grid.autosizeColumns === 'function') {
                        // make sure that the grid still exist (by looking if the Grid UID is found in the DOM tree)
                        var gridUid = _this.sharedService.grid.getUID();
                        if (_this._areVisibleColumnDifferent && gridUid && $("." + gridUid).length > 0) {
                            if (_this.sharedService.gridOptions && _this.sharedService.gridOptions.enableAutoSizeColumns) {
                                _this.sharedService.grid.autosizeColumns();
                            }
                            _this._areVisibleColumnDifferent = false;
                        }
                    }
                });
            }
            return this._addon;
        }
        return null;
    };
    /** Refresh the dataset through the Backend Service */
    GridMenuExtension.prototype.refreshBackendDataset = function (gridOptions) {
        var _this = this;
        var query = '';
        // user can pass new set of grid options which will override current ones
        if (gridOptions) {
            this.sharedService.gridOptions = tslib_1.__assign({}, this.sharedService.gridOptions, gridOptions);
        }
        var backendApi = this.sharedService.gridOptions.backendServiceApi;
        if (!backendApi || !backendApi.service || !backendApi.process) {
            throw new Error("BackendServiceApi requires at least a \"process\" function and a \"service\" defined");
        }
        if (backendApi.service) {
            query = backendApi.service.buildQuery();
        }
        if (query && query !== '') {
            // keep start time & end timestamps & return it after process execution
            var startTime_1 = new Date();
            if (backendApi.preProcess) {
                backendApi.preProcess();
            }
            // the process could be an Observable (like HttpClient) or a Promise
            // in any case, we need to have a Promise so that we can await on it (if an Observable, convert it to Promise)
            var observableOrPromise = backendApi.process(query);
            castToPromise(observableOrPromise).then(function (processResult) {
                var endTime = new Date();
                // from the result, call our internal post process to update the Dataset and Pagination info
                if (processResult && backendApi && backendApi.internalPostProcess) {
                    backendApi.internalPostProcess(processResult);
                }
                // send the response process to the postProcess callback
                if (backendApi && backendApi.postProcess) {
                    if (processResult instanceof Object) {
                        processResult.statistics = {
                            startTime: startTime_1,
                            endTime: endTime,
                            executionTime: endTime.valueOf() - startTime_1.valueOf(),
                            totalItemCount: _this.sharedService.gridOptions && _this.sharedService.gridOptions.pagination && _this.sharedService.gridOptions.pagination.totalItems
                        };
                    }
                    backendApi.postProcess(processResult);
                }
            });
        }
    };
    /** Translate the Grid Menu titles and column picker */
    GridMenuExtension.prototype.translateGridMenu = function () {
        // update the properties by pointers, that is the only way to get Grid Menu Control to see the new values
        // we also need to call the control init so that it takes the new Grid object with latest values
        if (this.sharedService.gridOptions && this.sharedService.gridOptions.gridMenu) {
            this.sharedService.gridOptions.gridMenu.customItems = [];
            this.emptyGridMenuTitles();
            // merge original user grid menu items with internal items
            // then sort all Grid Menu Custom Items (sorted by pointer, no need to use the return)
            this.sharedService.gridOptions.gridMenu.customItems = tslib_1.__spread(this._userOriginalGridMenu.customItems || [], this.addGridMenuCustomCommands());
            this.extensionUtility.translateItems(this.sharedService.gridOptions.gridMenu.customItems, 'titleKey', 'title');
            this.extensionUtility.sortItems(this.sharedService.gridOptions.gridMenu.customItems, 'positionOrder');
            this.sharedService.gridOptions.gridMenu.columnTitle = this.extensionUtility.getPickerTitleOutputString('columnTitle', 'gridMenu');
            this.sharedService.gridOptions.gridMenu.forceFitTitle = this.extensionUtility.getPickerTitleOutputString('forceFitTitle', 'gridMenu');
            this.sharedService.gridOptions.gridMenu.syncResizeTitle = this.extensionUtility.getPickerTitleOutputString('syncResizeTitle', 'gridMenu');
            // translate all columns (including non-visible)
            this.extensionUtility.translateItems(this.sharedService.allColumns, 'headerKey', 'name');
            // re-initialize the Grid Menu, that will recreate all the menus & list
            // doing an "init()" won't drop any existing command attached
            if (this._addon.init) {
                this._addon.init(this.sharedService.grid);
            }
        }
    };
    // --
    // private functions
    // ------------------
    /** Create Grid Menu with Custom Commands if user has enabled Filters and/or uses a Backend Service (OData, GraphQL) */
    GridMenuExtension.prototype.addGridMenuCustomCommands = function () {
        var backendApi = this.sharedService.gridOptions.backendServiceApi || null;
        var gridMenuCustomItems = [];
        if (this.sharedService.gridOptions && this.sharedService.gridOptions.enableFiltering) {
            // show grid menu: clear all filters
            if (this.sharedService.gridOptions && this.sharedService.gridOptions.gridMenu && !this.sharedService.gridOptions.gridMenu.hideClearAllFiltersCommand) {
                gridMenuCustomItems.push({
                    iconCssClass: this.sharedService.gridOptions.gridMenu.iconClearAllFiltersCommand || 'fa fa-filter text-danger',
                    title: this.sharedService.gridOptions.enableTranslate ? this.translate.instant('CLEAR_ALL_FILTERS') : Constants.TEXT_CLEAR_ALL_FILTERS,
                    disabled: false,
                    command: 'clear-filter',
                    positionOrder: 50
                });
            }
            // show grid menu: toggle filter row
            if (this.sharedService.gridOptions && this.sharedService.gridOptions.gridMenu && !this.sharedService.gridOptions.gridMenu.hideToggleFilterCommand) {
                gridMenuCustomItems.push({
                    iconCssClass: this.sharedService.gridOptions.gridMenu.iconToggleFilterCommand || 'fa fa-random',
                    title: this.sharedService.gridOptions.enableTranslate ? this.translate.instant('TOGGLE_FILTER_ROW') : Constants.TEXT_TOGGLE_FILTER_ROW,
                    disabled: false,
                    command: 'toggle-filter',
                    positionOrder: 52
                });
            }
            // show grid menu: refresh dataset
            if (this.sharedService.gridOptions && this.sharedService.gridOptions.gridMenu && !this.sharedService.gridOptions.gridMenu.hideRefreshDatasetCommand && backendApi) {
                gridMenuCustomItems.push({
                    iconCssClass: this.sharedService.gridOptions.gridMenu.iconRefreshDatasetCommand || 'fa fa-refresh',
                    title: this.sharedService.gridOptions.enableTranslate ? this.translate.instant('REFRESH_DATASET') : Constants.TEXT_REFRESH_DATASET,
                    disabled: false,
                    command: 'refresh-dataset',
                    positionOrder: 54
                });
            }
        }
        if (this.sharedService.gridOptions.showPreHeaderPanel) {
            // show grid menu: toggle pre-header row
            if (this.sharedService.gridOptions && this.sharedService.gridOptions.gridMenu && !this.sharedService.gridOptions.gridMenu.hideTogglePreHeaderCommand) {
                gridMenuCustomItems.push({
                    iconCssClass: this.sharedService.gridOptions.gridMenu.iconTogglePreHeaderCommand || 'fa fa-random',
                    title: this.sharedService.gridOptions.enableTranslate ? this.translate.instant('TOGGLE_PRE_HEADER_ROW') : Constants.TEXT_TOGGLE_PRE_HEADER_ROW,
                    disabled: false,
                    command: 'toggle-preheader',
                    positionOrder: 52
                });
            }
        }
        if (this.sharedService.gridOptions.enableSorting) {
            // show grid menu: clear all sorting
            if (this.sharedService.gridOptions && this.sharedService.gridOptions.gridMenu && !this.sharedService.gridOptions.gridMenu.hideClearAllSortingCommand) {
                gridMenuCustomItems.push({
                    iconCssClass: this.sharedService.gridOptions.gridMenu.iconClearAllSortingCommand || 'fa fa-unsorted text-danger',
                    title: this.sharedService.gridOptions.enableTranslate ? this.translate.instant('CLEAR_ALL_SORTING') : Constants.TEXT_CLEAR_ALL_SORTING,
                    disabled: false,
                    command: 'clear-sorting',
                    positionOrder: 51
                });
            }
        }
        // show grid menu: export to file
        if (this.sharedService.gridOptions && this.sharedService.gridOptions.enableExport && this.sharedService.gridOptions.gridMenu && !this.sharedService.gridOptions.gridMenu.hideExportCsvCommand) {
            gridMenuCustomItems.push({
                iconCssClass: this.sharedService.gridOptions.gridMenu.iconExportCsvCommand || 'fa fa-download',
                title: this.sharedService.gridOptions.enableTranslate ? this.translate.instant('EXPORT_TO_CSV') : Constants.TEXT_EXPORT_IN_CSV_FORMAT,
                disabled: false,
                command: 'export-csv',
                positionOrder: 53
            });
        }
        // show grid menu: export to text file as tab delimited
        if (this.sharedService.gridOptions && this.sharedService.gridOptions.enableExport && this.sharedService.gridOptions.gridMenu && !this.sharedService.gridOptions.gridMenu.hideExportTextDelimitedCommand) {
            gridMenuCustomItems.push({
                iconCssClass: this.sharedService.gridOptions.gridMenu.iconExportTextDelimitedCommand || 'fa fa-download',
                title: this.sharedService.gridOptions.enableTranslate ? this.translate.instant('EXPORT_TO_TAB_DELIMITED') : Constants.TEXT_EXPORT_IN_TEXT_FORMAT,
                disabled: false,
                command: 'export-text-delimited',
                positionOrder: 54
            });
        }
        // add the custom "Commands" title if there are any commands
        if (this.sharedService.gridOptions && this.sharedService.gridOptions.gridMenu && (gridMenuCustomItems.length > 0 || (this.sharedService.gridOptions.gridMenu.customItems && this.sharedService.gridOptions.gridMenu.customItems.length > 0))) {
            this.sharedService.gridOptions.gridMenu.customTitle = this.sharedService.gridOptions.gridMenu.customTitle || this.extensionUtility.getPickerTitleOutputString('customTitle', 'gridMenu');
        }
        return gridMenuCustomItems;
    };
    /**
     * Execute the Grid Menu Custom command callback that was triggered by the onCommand subscribe
     * These are the default internal custom commands
     * @param event
     * @param GridMenuItem args
     */
    GridMenuExtension.prototype.executeGridMenuInternalCustomCommands = function (e, args) {
        if (args && args.command) {
            switch (args.command) {
                case 'clear-filter':
                    this.filterService.clearFilters();
                    this.sharedService.dataView.refresh();
                    break;
                case 'clear-sorting':
                    this.sortService.clearSorting();
                    this.sharedService.dataView.refresh();
                    break;
                case 'export-csv':
                    this.exportService.exportToFile({
                        delimiter: DelimiterType.comma,
                        filename: 'export',
                        format: FileType.csv,
                        useUtf8WithBom: true
                    });
                    break;
                case 'export-text-delimited':
                    this.exportService.exportToFile({
                        delimiter: DelimiterType.tab,
                        filename: 'export',
                        format: FileType.txt,
                        useUtf8WithBom: true
                    });
                    break;
                case 'toggle-filter':
                    var showHeaderRow = this.sharedService && this.sharedService.gridOptions && this.sharedService.gridOptions.showHeaderRow || false;
                    this.sharedService.grid.setHeaderRowVisibility(!showHeaderRow);
                    break;
                case 'toggle-toppanel':
                    var showTopPanel = this.sharedService && this.sharedService.gridOptions && this.sharedService.gridOptions.showTopPanel || false;
                    this.sharedService.grid.setTopPanelVisibility(!showTopPanel);
                    break;
                case 'toggle-preheader':
                    var showPreHeaderPanel = this.sharedService && this.sharedService.gridOptions && this.sharedService.gridOptions.showPreHeaderPanel || false;
                    this.sharedService.grid.setPreHeaderPanelVisibility(!showPreHeaderPanel);
                    break;
                case 'refresh-dataset':
                    this.refreshBackendDataset();
                    break;
                default:
                    break;
            }
        }
    };
    GridMenuExtension.prototype.emptyGridMenuTitles = function () {
        if (this.sharedService && this.sharedService.gridOptions && this.sharedService.gridOptions.gridMenu) {
            this.sharedService.gridOptions.gridMenu.customTitle = '';
            this.sharedService.gridOptions.gridMenu.columnTitle = '';
            this.sharedService.gridOptions.gridMenu.forceFitTitle = '';
            this.sharedService.gridOptions.gridMenu.syncResizeTitle = '';
        }
    };
    /** @return default Grid Menu options */
    GridMenuExtension.prototype.getDefaultGridMenuOptions = function () {
        return {
            customTitle: undefined,
            columnTitle: this.extensionUtility.getPickerTitleOutputString('columnTitle', 'gridMenu'),
            forceFitTitle: this.extensionUtility.getPickerTitleOutputString('forceFitTitle', 'gridMenu'),
            syncResizeTitle: this.extensionUtility.getPickerTitleOutputString('syncResizeTitle', 'gridMenu'),
            iconCssClass: 'fa fa-bars',
            menuWidth: 18,
            customItems: [],
            hideClearAllFiltersCommand: false,
            hideRefreshDatasetCommand: false,
            hideToggleFilterCommand: false,
        };
    };
    GridMenuExtension = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [ExportService,
            ExtensionUtility,
            FilterService,
            SharedService,
            SortService,
            TranslateService])
    ], GridMenuExtension);
    return GridMenuExtension;
}());
export { GridMenuExtension };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZE1lbnVFeHRlbnNpb24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL2V4dGVuc2lvbnMvZ3JpZE1lbnVFeHRlbnNpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdkQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN6QyxPQUFPLEVBRUwsYUFBYSxFQUViLGFBQWEsRUFDYixRQUFRLEdBTVQsTUFBTSxXQUFXLENBQUM7QUFDbkIsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzNELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3RELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQU8zRDtJQU1FLDJCQUNVLGFBQTRCLEVBQzVCLGdCQUFrQyxFQUNsQyxhQUE0QixFQUM1QixhQUE0QixFQUM1QixXQUF3QixFQUN4QixTQUEyQjtRQUwzQixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLGNBQVMsR0FBVCxTQUFTLENBQWtCO1FBVjdCLCtCQUEwQixHQUFHLEtB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RUFBRSxVQUFVLENBQUM7WUFDaEcsWUFBWSxFQUFFLFlBQVk7WUFDMUIsU0FBUyxFQUFFLEVBQUU7WUFDYixXQUFXLEVBQUUsRUFBRTtZQUNmLDBCQUEwQixFQUFFLEtBQUs7WUFDakMseUJBQXlCLEVBQUUsS0FBSztZQUNoQyx1QkFBdUIsRUFBRSxLQUFLO1NBQy9CLENBQUM7SUFDSixDQUFDO0lBalhVLGlCQUFpQjtRQUQ3QixVQUFVLEVBQUU7aURBUWMsYUFBYTtZQUNWLGdCQUFnQjtZQUNuQixhQUFhO1lBQ2IsYUFBYTtZQUNmLFdBQVc7WUFDYixnQkFBZ0I7T0FaMUIsaUJBQWlCLENBa1g3QjtJQUFELHdCQUFDO0NBQUEsQUFsWEQsSUFrWEM7U0FsWFksaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XHJcbmltcG9ydCB7IENvbnN0YW50cyB9IGZyb20gJy4uL2NvbnN0YW50cyc7XHJcbmltcG9ydCB7XHJcbiAgQ2VsbEFyZ3MsXHJcbiAgRGVsaW1pdGVyVHlwZSxcclxuICBFeHRlbnNpb24sXHJcbiAgRXh0ZW5zaW9uTmFtZSxcclxuICBGaWxlVHlwZSxcclxuICBHcmFwaHFsUmVzdWx0LFxyXG4gIEdyaWRPcHRpb24sXHJcbiAgR3JpZE1lbnUsXHJcbiAgR3JpZE1lbnVJdGVtLFxyXG4gIFNsaWNrRXZlbnRIYW5kbGVyLFxyXG59IGZyb20gJy4uL21vZGVscyc7XHJcbmltcG9ydCB7IEV4cG9ydFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9leHBvcnQuc2VydmljZSc7XHJcbmltcG9ydCB7IEV4dGVuc2lvblV0aWxpdHkgfSBmcm9tICcuL2V4dGVuc2lvblV0aWxpdHknO1xyXG5pbXBvcnQgeyBGaWx0ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvZmlsdGVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTb3J0U2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3NvcnQuc2VydmljZSc7XHJcbmltcG9ydCB7IGNhc3RUb1Byb21pc2UgfSBmcm9tICcuLi9zZXJ2aWNlcy91dGlsaXRpZXMnO1xyXG5pbXBvcnQgeyBTaGFyZWRTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvc2hhcmVkLnNlcnZpY2UnO1xyXG5cclxuLy8gdXNpbmcgZXh0ZXJuYWwgbm9uLXR5cGVkIGpzIGxpYnJhcmllc1xyXG5kZWNsYXJlIHZhciBTbGljazogYW55O1xyXG5kZWNsYXJlIHZhciAkOiBhbnk7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBHcmlkTWVudUV4dGVuc2lvbiBpbXBsZW1lbnRzIEV4dGVuc2lvbiB7XHJcbiAgcHJpdmF0ZSBfYWRkb246IGFueTtcclxuICBwcml2YXRlIF9hcmVWaXNpYmxlQ29sdW1uRGlmZmVyZW50ID0gZmFsc2U7XHJcbiAgcHJpdmF0ZSBfZXZlbnRIYW5kbGVyOiBTbGlja0V2ZW50SGFuZGxlcjtcclxuICBwcml2YXRlIF91c2VyT3JpZ2luYWxHcmlkTWVudTogR3JpZE1lbnU7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBleHBvcnRTZXJ2aWNlOiBFeHBvcnRTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBleHRlbnNpb25VdGlsaXR5OiBFeHRlbnNpb25VdGlsaXR5LFxyXG4gICAgcHJpdmF0ZSBmaWx0ZXJTZXJ2aWNlOiBGaWx0ZXJTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBzaGFyZWRTZXJ2aWNlOiBTaGFyZWRTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBzb3J0U2VydmljZTogU29ydFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHRyYW5zbGF0ZTogVHJhbnNsYXRlU2VydmljZSxcclxuICApIHtcclxuICAgIHRoaXMuX2V2ZW50SGFuZGxlciA9IG5ldyBTbGljay5FdmVudEhhbmRsZXIoKTtcclxuICB9XHJcblxyXG4gIGdldCBldmVudEhhbmRsZXIoKTogU2xpY2tFdmVudEhhbmRsZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuX2V2ZW50SGFuZGxlcjtcclxuICB9XHJcblxyXG4gIGRpc3Bvc2UoKSB7XHJcbiAgICAvLyB1bnN1YnNjcmliZSBhbGwgU2xpY2tHcmlkIGV2ZW50c1xyXG4gICAgdGhpcy5fZXZlbnRIYW5kbGVyLnVuc3Vic2NyaWJlQWxsKCk7XHJcbiAgICBpZiAodGhpcy5fYWRkb24gJiYgdGhpcy5fYWRkb24uZGVzdHJveSkge1xyXG4gICAgICB0aGlzLl9hZGRvbi5kZXN0cm95KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzaG93R3JpZE1lbnUoZSkge1xyXG4gICAgdGhpcy5fYWRkb24uc2hvd0dyaWRNZW51KGUpO1xyXG4gIH1cclxuXHJcbiAgLyoqIENyZWF0ZSB0aGUgSGVhZGVyIE1lbnUgYW5kIGV4cG9zZSBhbGwgdGhlIGF2YWlsYWJsZSBob29rcyB0aGF0IHVzZXIgY2FuIHN1YnNjcmliZSAob25Db21tYW5kLCBvbkJlZm9yZU1lbnVTaG93LCAuLi4pICovXHJcbiAgcmVnaXN0ZXIoKTogYW55IHtcclxuICAgIC8vIGtlZXAgb3JpZ2luYWwgdXNlciBncmlkIG1lbnUsIHVzZWZ1bCB3aGVuIHN3aXRjaGluZyBsb2NhbGUgdG8gdHJhbnNsYXRlXHJcbiAgICB0aGlzLl91c2VyT3JpZ2luYWxHcmlkTWVudSA9IHsgLi4udGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51IH07XHJcblxyXG4gICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucyAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUpIHtcclxuICAgICAgLy8gZHluYW1pY2FsbHkgaW1wb3J0IHRoZSBTbGlja0dyaWQgcGx1Z2luIChhZGRvbikgd2l0aCBSZXF1aXJlSlNcclxuICAgICAgdGhpcy5leHRlbnNpb25VdGlsaXR5LmxvYWRFeHRlbnNpb25EeW5hbWljYWxseShFeHRlbnNpb25OYW1lLmdyaWRNZW51KTtcclxuICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51ID0geyAuLi50aGlzLmdldERlZmF1bHRHcmlkTWVudU9wdGlvbnMoKSwgLi4udGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51IH07XHJcblxyXG4gICAgICAvLyBtZXJnZSBvcmlnaW5hbCB1c2VyIGdyaWQgbWVudSBpdGVtcyB3aXRoIGludGVybmFsIGl0ZW1zXHJcbiAgICAgIC8vIHRoZW4gc29ydCBhbGwgR3JpZCBNZW51IEN1c3RvbSBJdGVtcyAoc29ydGVkIGJ5IHBvaW50ZXIsIG5vIG5lZWQgdG8gdXNlIHRoZSByZXR1cm4pXHJcbiAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudS5jdXN0b21JdGVtcyA9IFsuLi50aGlzLl91c2VyT3JpZ2luYWxHcmlkTWVudS5jdXN0b21JdGVtcyB8fCBbXSwgLi4udGhpcy5hZGRHcmlkTWVudUN1c3RvbUNvbW1hbmRzKCldO1xyXG4gICAgICB0aGlzLmV4dGVuc2lvblV0aWxpdHkudHJhbnNsYXRlSXRlbXModGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51LmN1c3RvbUl0ZW1zLCAndGl0bGVLZXknLCAndGl0bGUnKTtcclxuICAgICAgdGhpcy5leHRlbnNpb25VdGlsaXR5LnNvcnRJdGVtcyh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUuY3VzdG9tSXRlbXMsICdwb3NpdGlvbk9yZGVyJyk7XHJcblxyXG4gICAgICB0aGlzLl9hZGRvbiA9IG5ldyBTbGljay5Db250cm9scy5HcmlkTWVudSh0aGlzLnNoYXJlZFNlcnZpY2UuY29sdW1uRGVmaW5pdGlvbnMsIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLCB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMpO1xyXG5cclxuICAgICAgLy8gaG9vayBhbGwgZXZlbnRzXHJcbiAgICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZCAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUpIHtcclxuICAgICAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51Lm9uRXh0ZW5zaW9uUmVnaXN0ZXJlZCkge1xyXG4gICAgICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51Lm9uRXh0ZW5zaW9uUmVnaXN0ZXJlZCh0aGlzLl9hZGRvbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2V2ZW50SGFuZGxlci5zdWJzY3JpYmUodGhpcy5fYWRkb24ub25CZWZvcmVNZW51U2hvdywgKGU6IGFueSwgYXJnczogQ2VsbEFyZ3MpID0+IHtcclxuICAgICAgICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUgJiYgdHlwZW9mIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudS5vbkJlZm9yZU1lbnVTaG93ID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudS5vbkJlZm9yZU1lbnVTaG93KGUsIGFyZ3MpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuX2V2ZW50SGFuZGxlci5zdWJzY3JpYmUodGhpcy5fYWRkb24ub25Db2x1bW5zQ2hhbmdlZCwgKGU6IGFueSwgYXJnczogQ2VsbEFyZ3MpID0+IHtcclxuICAgICAgICAgIHRoaXMuX2FyZVZpc2libGVDb2x1bW5EaWZmZXJlbnQgPSB0cnVlO1xyXG4gICAgICAgICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudSAmJiB0eXBlb2YgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51Lm9uQ29sdW1uc0NoYW5nZWQgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51Lm9uQ29sdW1uc0NoYW5nZWQoZSwgYXJncyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5fZXZlbnRIYW5kbGVyLnN1YnNjcmliZSh0aGlzLl9hZGRvbi5vbkNvbW1hbmQsIChlOiBhbnksIGFyZ3M6IGFueSkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5leGVjdXRlR3JpZE1lbnVJbnRlcm5hbEN1c3RvbUNvbW1hbmRzKGUsIGFyZ3MpO1xyXG4gICAgICAgICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudSAmJiB0eXBlb2YgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51Lm9uQ29tbWFuZCA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUub25Db21tYW5kKGUsIGFyZ3MpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuX2V2ZW50SGFuZGxlci5zdWJzY3JpYmUodGhpcy5fYWRkb24ub25NZW51Q2xvc2UsIChlOiBhbnksIGFyZ3M6IENlbGxBcmdzKSA9PiB7XHJcbiAgICAgICAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51ICYmIHR5cGVvZiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUub25NZW51Q2xvc2UgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51Lm9uTWVudUNsb3NlKGUsIGFyZ3MpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vIHdlIGFsc28gd2FudCB0byByZXNpemUgdGhlIGNvbHVtbnMgaWYgdGhlIHVzZXIgZGVjaWRlZCB0byBoaWRlIGNlcnRhaW4gY29sdW1uKHMpXHJcbiAgICAgICAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQgJiYgdHlwZW9mIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLmF1dG9zaXplQ29sdW1ucyA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAvLyBtYWtlIHN1cmUgdGhhdCB0aGUgZ3JpZCBzdGlsbCBleGlzdCAoYnkgbG9va2luZyBpZiB0aGUgR3JpZCBVSUQgaXMgZm91bmQgaW4gdGhlIERPTSB0cmVlKVxyXG4gICAgICAgICAgICBjb25zdCBncmlkVWlkID0gdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQuZ2V0VUlEKCk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9hcmVWaXNpYmxlQ29sdW1uRGlmZmVyZW50ICYmIGdyaWRVaWQgJiYgJChgLiR7Z3JpZFVpZH1gKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucyAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZW5hYmxlQXV0b1NpemVDb2x1bW5zKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZC5hdXRvc2l6ZUNvbHVtbnMoKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgdGhpcy5fYXJlVmlzaWJsZUNvbHVtbkRpZmZlcmVudCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHRoaXMuX2FkZG9uO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICAvKiogUmVmcmVzaCB0aGUgZGF0YXNldCB0aHJvdWdoIHRoZSBCYWNrZW5kIFNlcnZpY2UgKi9cclxuICByZWZyZXNoQmFja2VuZERhdGFzZXQoZ3JpZE9wdGlvbnM/OiBHcmlkT3B0aW9uKSB7XHJcbiAgICBsZXQgcXVlcnkgPSAnJztcclxuXHJcbiAgICAvLyB1c2VyIGNhbiBwYXNzIG5ldyBzZXQgb2YgZ3JpZCBvcHRpb25zIHdoaWNoIHdpbGwgb3ZlcnJpZGUgY3VycmVudCBvbmVzXHJcbiAgICBpZiAoZ3JpZE9wdGlvbnMpIHtcclxuICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zID0geyAuLi50aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMsIC4uLmdyaWRPcHRpb25zIH07XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYmFja2VuZEFwaSA9IHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5iYWNrZW5kU2VydmljZUFwaTtcclxuICAgIGlmICghYmFja2VuZEFwaSB8fCAhYmFja2VuZEFwaS5zZXJ2aWNlIHx8ICFiYWNrZW5kQXBpLnByb2Nlc3MpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBCYWNrZW5kU2VydmljZUFwaSByZXF1aXJlcyBhdCBsZWFzdCBhIFwicHJvY2Vzc1wiIGZ1bmN0aW9uIGFuZCBhIFwic2VydmljZVwiIGRlZmluZWRgKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoYmFja2VuZEFwaS5zZXJ2aWNlKSB7XHJcbiAgICAgIHF1ZXJ5ID0gYmFja2VuZEFwaS5zZXJ2aWNlLmJ1aWxkUXVlcnkoKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAocXVlcnkgJiYgcXVlcnkgIT09ICcnKSB7XHJcbiAgICAgIC8vIGtlZXAgc3RhcnQgdGltZSAmIGVuZCB0aW1lc3RhbXBzICYgcmV0dXJuIGl0IGFmdGVyIHByb2Nlc3MgZXhlY3V0aW9uXHJcbiAgICAgIGNvbnN0IHN0YXJ0VGltZSA9IG5ldyBEYXRlKCk7XHJcblxyXG4gICAgICBpZiAoYmFja2VuZEFwaS5wcmVQcm9jZXNzKSB7XHJcbiAgICAgICAgYmFja2VuZEFwaS5wcmVQcm9jZXNzKCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIHRoZSBwcm9jZXNzIGNvdWxkIGJlIGFuIE9ic2VydmFibGUgKGxpa2UgSHR0cENsaWVudCkgb3IgYSBQcm9taXNlXHJcbiAgICAgIC8vIGluIGFueSBjYXNlLCB3ZSBuZWVkIHRvIGhhdmUgYSBQcm9taXNlIHNvIHRoYXQgd2UgY2FuIGF3YWl0IG9uIGl0IChpZiBhbiBPYnNlcnZhYmxlLCBjb252ZXJ0IGl0IHRvIFByb21pc2UpXHJcbiAgICAgIGNvbnN0IG9ic2VydmFibGVPclByb21pc2UgPSBiYWNrZW5kQXBpLnByb2Nlc3MocXVlcnkpO1xyXG5cclxuICAgICAgY2FzdFRvUHJvbWlzZShvYnNlcnZhYmxlT3JQcm9taXNlKS50aGVuKChwcm9jZXNzUmVzdWx0OiBHcmFwaHFsUmVzdWx0IHwgYW55KSA9PiB7XHJcbiAgICAgICAgY29uc3QgZW5kVGltZSA9IG5ldyBEYXRlKCk7XHJcblxyXG4gICAgICAgIC8vIGZyb20gdGhlIHJlc3VsdCwgY2FsbCBvdXIgaW50ZXJuYWwgcG9zdCBwcm9jZXNzIHRvIHVwZGF0ZSB0aGUgRGF0YXNldCBhbmQgUGFnaW5hdGlvbiBpbmZvXHJcbiAgICAgICAgaWYgKHByb2Nlc3NSZXN1bHQgJiYgYmFja2VuZEFwaSAmJiBiYWNrZW5kQXBpLmludGVybmFsUG9zdFByb2Nlc3MpIHtcclxuICAgICAgICAgIGJhY2tlbmRBcGkuaW50ZXJuYWxQb3N0UHJvY2Vzcyhwcm9jZXNzUmVzdWx0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHNlbmQgdGhlIHJlc3BvbnNlIHByb2Nlc3MgdG8gdGhlIHBvc3RQcm9jZXNzIGNhbGxiYWNrXHJcbiAgICAgICAgaWYgKGJhY2tlbmRBcGkgJiYgYmFja2VuZEFwaS5wb3N0UHJvY2Vzcykge1xyXG4gICAgICAgICAgaWYgKHByb2Nlc3NSZXN1bHQgaW5zdGFuY2VvZiBPYmplY3QpIHtcclxuICAgICAgICAgICAgcHJvY2Vzc1Jlc3VsdC5zdGF0aXN0aWNzID0ge1xyXG4gICAgICAgICAgICAgIHN0YXJ0VGltZSxcclxuICAgICAgICAgICAgICBlbmRUaW1lLFxyXG4gICAgICAgICAgICAgIGV4ZWN1dGlvblRpbWU6IGVuZFRpbWUudmFsdWVPZigpIC0gc3RhcnRUaW1lLnZhbHVlT2YoKSxcclxuICAgICAgICAgICAgICB0b3RhbEl0ZW1Db3VudDogdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5wYWdpbmF0aW9uICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5wYWdpbmF0aW9uLnRvdGFsSXRlbXNcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGJhY2tlbmRBcGkucG9zdFByb2Nlc3MocHJvY2Vzc1Jlc3VsdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiBUcmFuc2xhdGUgdGhlIEdyaWQgTWVudSB0aXRsZXMgYW5kIGNvbHVtbiBwaWNrZXIgKi9cclxuICB0cmFuc2xhdGVHcmlkTWVudSgpIHtcclxuICAgIC8vIHVwZGF0ZSB0aGUgcHJvcGVydGllcyBieSBwb2ludGVycywgdGhhdCBpcyB0aGUgb25seSB3YXkgdG8gZ2V0IEdyaWQgTWVudSBDb250cm9sIHRvIHNlZSB0aGUgbmV3IHZhbHVlc1xyXG4gICAgLy8gd2UgYWxzbyBuZWVkIHRvIGNhbGwgdGhlIGNvbnRyb2wgaW5pdCBzbyB0aGF0IGl0IHRha2VzIHRoZSBuZXcgR3JpZCBvYmplY3Qgd2l0aCBsYXRlc3QgdmFsdWVzXHJcbiAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudSkge1xyXG4gICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUuY3VzdG9tSXRlbXMgPSBbXTtcclxuICAgICAgdGhpcy5lbXB0eUdyaWRNZW51VGl0bGVzKCk7XHJcblxyXG4gICAgICAvLyBtZXJnZSBvcmlnaW5hbCB1c2VyIGdyaWQgbWVudSBpdGVtcyB3aXRoIGludGVybmFsIGl0ZW1zXHJcbiAgICAgIC8vIHRoZW4gc29ydCBhbGwgR3JpZCBNZW51IEN1c3RvbSBJdGVtcyAoc29ydGVkIGJ5IHBvaW50ZXIsIG5vIG5lZWQgdG8gdXNlIHRoZSByZXR1cm4pXHJcbiAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudS5jdXN0b21JdGVtcyA9IFsuLi50aGlzLl91c2VyT3JpZ2luYWxHcmlkTWVudS5jdXN0b21JdGVtcyB8fCBbXSwgLi4udGhpcy5hZGRHcmlkTWVudUN1c3RvbUNvbW1hbmRzKCldO1xyXG4gICAgICB0aGlzLmV4dGVuc2lvblV0aWxpdHkudHJhbnNsYXRlSXRlbXModGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51LmN1c3RvbUl0ZW1zLCAndGl0bGVLZXknLCAndGl0bGUnKTtcclxuICAgICAgdGhpcy5leHRlbnNpb25VdGlsaXR5LnNvcnRJdGVtcyh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUuY3VzdG9tSXRlbXMsICdwb3NpdGlvbk9yZGVyJyk7XHJcblxyXG4gICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUuY29sdW1uVGl0bGUgPSB0aGlzLmV4dGVuc2lvblV0aWxpdHkuZ2V0UGlja2VyVGl0bGVPdXRwdXRTdHJpbmcoJ2NvbHVtblRpdGxlJywgJ2dyaWRNZW51Jyk7XHJcbiAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudS5mb3JjZUZpdFRpdGxlID0gdGhpcy5leHRlbnNpb25VdGlsaXR5LmdldFBpY2tlclRpdGxlT3V0cHV0U3RyaW5nKCdmb3JjZUZpdFRpdGxlJywgJ2dyaWRNZW51Jyk7XHJcbiAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudS5zeW5jUmVzaXplVGl0bGUgPSB0aGlzLmV4dGVuc2lvblV0aWxpdHkuZ2V0UGlja2VyVGl0bGVPdXRwdXRTdHJpbmcoJ3N5bmNSZXNpemVUaXRsZScsICdncmlkTWVudScpO1xyXG5cclxuICAgICAgLy8gdHJhbnNsYXRlIGFsbCBjb2x1bW5zIChpbmNsdWRpbmcgbm9uLXZpc2libGUpXHJcbiAgICAgIHRoaXMuZXh0ZW5zaW9uVXRpbGl0eS50cmFuc2xhdGVJdGVtcyh0aGlzLnNoYXJlZFNlcnZpY2UuYWxsQ29sdW1ucywgJ2hlYWRlcktleScsICduYW1lJyk7XHJcblxyXG4gICAgICAvLyByZS1pbml0aWFsaXplIHRoZSBHcmlkIE1lbnUsIHRoYXQgd2lsbCByZWNyZWF0ZSBhbGwgdGhlIG1lbnVzICYgbGlzdFxyXG4gICAgICAvLyBkb2luZyBhbiBcImluaXQoKVwiIHdvbid0IGRyb3AgYW55IGV4aXN0aW5nIGNvbW1hbmQgYXR0YWNoZWRcclxuICAgICAgaWYgKHRoaXMuX2FkZG9uLmluaXQpIHtcclxuICAgICAgICB0aGlzLl9hZGRvbi5pbml0KHRoaXMuc2hhcmVkU2VydmljZS5ncmlkKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gLS1cclxuICAvLyBwcml2YXRlIGZ1bmN0aW9uc1xyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAvKiogQ3JlYXRlIEdyaWQgTWVudSB3aXRoIEN1c3RvbSBDb21tYW5kcyBpZiB1c2VyIGhhcyBlbmFibGVkIEZpbHRlcnMgYW5kL29yIHVzZXMgYSBCYWNrZW5kIFNlcnZpY2UgKE9EYXRhLCBHcmFwaFFMKSAqL1xyXG4gIHByaXZhdGUgYWRkR3JpZE1lbnVDdXN0b21Db21tYW5kcygpIHtcclxuICAgIGNvbnN0IGJhY2tlbmRBcGkgPSB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuYmFja2VuZFNlcnZpY2VBcGkgfHwgbnVsbDtcclxuICAgIGNvbnN0IGdyaWRNZW51Q3VzdG9tSXRlbXM6IEdyaWRNZW51SXRlbVtdID0gW107XHJcblxyXG4gICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucyAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZW5hYmxlRmlsdGVyaW5nKSB7XHJcbiAgICAgIC8vIHNob3cgZ3JpZCBtZW51OiBjbGVhciBhbGwgZmlsdGVyc1xyXG4gICAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudSAmJiAhdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51LmhpZGVDbGVhckFsbEZpbHRlcnNDb21tYW5kKSB7XHJcbiAgICAgICAgZ3JpZE1lbnVDdXN0b21JdGVtcy5wdXNoKFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBpY29uQ3NzQ2xhc3M6IHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudS5pY29uQ2xlYXJBbGxGaWx0ZXJzQ29tbWFuZCB8fCAnZmEgZmEtZmlsdGVyIHRleHQtZGFuZ2VyJyxcclxuICAgICAgICAgICAgdGl0bGU6IHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5lbmFibGVUcmFuc2xhdGUgPyB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KCdDTEVBUl9BTExfRklMVEVSUycpIDogQ29uc3RhbnRzLlRFWFRfQ0xFQVJfQUxMX0ZJTFRFUlMsXHJcbiAgICAgICAgICAgIGRpc2FibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgY29tbWFuZDogJ2NsZWFyLWZpbHRlcicsXHJcbiAgICAgICAgICAgIHBvc2l0aW9uT3JkZXI6IDUwXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gc2hvdyBncmlkIG1lbnU6IHRvZ2dsZSBmaWx0ZXIgcm93XHJcbiAgICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51ICYmICF0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUuaGlkZVRvZ2dsZUZpbHRlckNvbW1hbmQpIHtcclxuICAgICAgICBncmlkTWVudUN1c3RvbUl0ZW1zLnB1c2goXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGljb25Dc3NDbGFzczogdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51Lmljb25Ub2dnbGVGaWx0ZXJDb21tYW5kIHx8ICdmYSBmYS1yYW5kb20nLFxyXG4gICAgICAgICAgICB0aXRsZTogdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmVuYWJsZVRyYW5zbGF0ZSA/IHRoaXMudHJhbnNsYXRlLmluc3RhbnQoJ1RPR0dMRV9GSUxURVJfUk9XJykgOiBDb25zdGFudHMuVEVYVF9UT0dHTEVfRklMVEVSX1JPVyxcclxuICAgICAgICAgICAgZGlzYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBjb21tYW5kOiAndG9nZ2xlLWZpbHRlcicsXHJcbiAgICAgICAgICAgIHBvc2l0aW9uT3JkZXI6IDUyXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gc2hvdyBncmlkIG1lbnU6IHJlZnJlc2ggZGF0YXNldFxyXG4gICAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudSAmJiAhdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51LmhpZGVSZWZyZXNoRGF0YXNldENvbW1hbmQgJiYgYmFja2VuZEFwaSkge1xyXG4gICAgICAgIGdyaWRNZW51Q3VzdG9tSXRlbXMucHVzaChcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgaWNvbkNzc0NsYXNzOiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUuaWNvblJlZnJlc2hEYXRhc2V0Q29tbWFuZCB8fCAnZmEgZmEtcmVmcmVzaCcsXHJcbiAgICAgICAgICAgIHRpdGxlOiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZW5hYmxlVHJhbnNsYXRlID8gdGhpcy50cmFuc2xhdGUuaW5zdGFudCgnUkVGUkVTSF9EQVRBU0VUJykgOiBDb25zdGFudHMuVEVYVF9SRUZSRVNIX0RBVEFTRVQsXHJcbiAgICAgICAgICAgIGRpc2FibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgY29tbWFuZDogJ3JlZnJlc2gtZGF0YXNldCcsXHJcbiAgICAgICAgICAgIHBvc2l0aW9uT3JkZXI6IDU0XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuc2hvd1ByZUhlYWRlclBhbmVsKSB7XHJcbiAgICAgIC8vIHNob3cgZ3JpZCBtZW51OiB0b2dnbGUgcHJlLWhlYWRlciByb3dcclxuICAgICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucyAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUgJiYgIXRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudS5oaWRlVG9nZ2xlUHJlSGVhZGVyQ29tbWFuZCkge1xyXG4gICAgICAgIGdyaWRNZW51Q3VzdG9tSXRlbXMucHVzaChcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgaWNvbkNzc0NsYXNzOiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUuaWNvblRvZ2dsZVByZUhlYWRlckNvbW1hbmQgfHwgJ2ZhIGZhLXJhbmRvbScsXHJcbiAgICAgICAgICAgIHRpdGxlOiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZW5hYmxlVHJhbnNsYXRlID8gdGhpcy50cmFuc2xhdGUuaW5zdGFudCgnVE9HR0xFX1BSRV9IRUFERVJfUk9XJykgOiBDb25zdGFudHMuVEVYVF9UT0dHTEVfUFJFX0hFQURFUl9ST1csXHJcbiAgICAgICAgICAgIGRpc2FibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgY29tbWFuZDogJ3RvZ2dsZS1wcmVoZWFkZXInLFxyXG4gICAgICAgICAgICBwb3NpdGlvbk9yZGVyOiA1MlxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmVuYWJsZVNvcnRpbmcpIHtcclxuICAgICAgLy8gc2hvdyBncmlkIG1lbnU6IGNsZWFyIGFsbCBzb3J0aW5nXHJcbiAgICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51ICYmICF0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUuaGlkZUNsZWFyQWxsU29ydGluZ0NvbW1hbmQpIHtcclxuICAgICAgICBncmlkTWVudUN1c3RvbUl0ZW1zLnB1c2goXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGljb25Dc3NDbGFzczogdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51Lmljb25DbGVhckFsbFNvcnRpbmdDb21tYW5kIHx8ICdmYSBmYS11bnNvcnRlZCB0ZXh0LWRhbmdlcicsXHJcbiAgICAgICAgICAgIHRpdGxlOiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZW5hYmxlVHJhbnNsYXRlID8gdGhpcy50cmFuc2xhdGUuaW5zdGFudCgnQ0xFQVJfQUxMX1NPUlRJTkcnKSA6IENvbnN0YW50cy5URVhUX0NMRUFSX0FMTF9TT1JUSU5HLFxyXG4gICAgICAgICAgICBkaXNhYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgIGNvbW1hbmQ6ICdjbGVhci1zb3J0aW5nJyxcclxuICAgICAgICAgICAgcG9zaXRpb25PcmRlcjogNTFcclxuICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gc2hvdyBncmlkIG1lbnU6IGV4cG9ydCB0byBmaWxlXHJcbiAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5lbmFibGVFeHBvcnQgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51ICYmICF0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUuaGlkZUV4cG9ydENzdkNvbW1hbmQpIHtcclxuICAgICAgZ3JpZE1lbnVDdXN0b21JdGVtcy5wdXNoKFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGljb25Dc3NDbGFzczogdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51Lmljb25FeHBvcnRDc3ZDb21tYW5kIHx8ICdmYSBmYS1kb3dubG9hZCcsXHJcbiAgICAgICAgICB0aXRsZTogdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmVuYWJsZVRyYW5zbGF0ZSA/IHRoaXMudHJhbnNsYXRlLmluc3RhbnQoJ0VYUE9SVF9UT19DU1YnKSA6IENvbnN0YW50cy5URVhUX0VYUE9SVF9JTl9DU1ZfRk9STUFULFxyXG4gICAgICAgICAgZGlzYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgY29tbWFuZDogJ2V4cG9ydC1jc3YnLFxyXG4gICAgICAgICAgcG9zaXRpb25PcmRlcjogNTNcclxuICAgICAgICB9XHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICAvLyBzaG93IGdyaWQgbWVudTogZXhwb3J0IHRvIHRleHQgZmlsZSBhcyB0YWIgZGVsaW1pdGVkXHJcbiAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5lbmFibGVFeHBvcnQgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51ICYmICF0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUuaGlkZUV4cG9ydFRleHREZWxpbWl0ZWRDb21tYW5kKSB7XHJcbiAgICAgIGdyaWRNZW51Q3VzdG9tSXRlbXMucHVzaChcclxuICAgICAgICB7XHJcbiAgICAgICAgICBpY29uQ3NzQ2xhc3M6IHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudS5pY29uRXhwb3J0VGV4dERlbGltaXRlZENvbW1hbmQgfHwgJ2ZhIGZhLWRvd25sb2FkJyxcclxuICAgICAgICAgIHRpdGxlOiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZW5hYmxlVHJhbnNsYXRlID8gdGhpcy50cmFuc2xhdGUuaW5zdGFudCgnRVhQT1JUX1RPX1RBQl9ERUxJTUlURUQnKSA6IENvbnN0YW50cy5URVhUX0VYUE9SVF9JTl9URVhUX0ZPUk1BVCxcclxuICAgICAgICAgIGRpc2FibGVkOiBmYWxzZSxcclxuICAgICAgICAgIGNvbW1hbmQ6ICdleHBvcnQtdGV4dC1kZWxpbWl0ZWQnLFxyXG4gICAgICAgICAgcG9zaXRpb25PcmRlcjogNTRcclxuICAgICAgICB9XHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gYWRkIHRoZSBjdXN0b20gXCJDb21tYW5kc1wiIHRpdGxlIGlmIHRoZXJlIGFyZSBhbnkgY29tbWFuZHNcclxuICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51ICYmIChncmlkTWVudUN1c3RvbUl0ZW1zLmxlbmd0aCA+IDAgfHwgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudS5jdXN0b21JdGVtcyAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUuY3VzdG9tSXRlbXMubGVuZ3RoID4gMCkpKSB7XHJcbiAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudS5jdXN0b21UaXRsZSA9IHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudS5jdXN0b21UaXRsZSB8fCB0aGlzLmV4dGVuc2lvblV0aWxpdHkuZ2V0UGlja2VyVGl0bGVPdXRwdXRTdHJpbmcoJ2N1c3RvbVRpdGxlJywgJ2dyaWRNZW51Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGdyaWRNZW51Q3VzdG9tSXRlbXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBFeGVjdXRlIHRoZSBHcmlkIE1lbnUgQ3VzdG9tIGNvbW1hbmQgY2FsbGJhY2sgdGhhdCB3YXMgdHJpZ2dlcmVkIGJ5IHRoZSBvbkNvbW1hbmQgc3Vic2NyaWJlXHJcbiAgICogVGhlc2UgYXJlIHRoZSBkZWZhdWx0IGludGVybmFsIGN1c3RvbSBjb21tYW5kc1xyXG4gICAqIEBwYXJhbSBldmVudFxyXG4gICAqIEBwYXJhbSBHcmlkTWVudUl0ZW0gYXJnc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgZXhlY3V0ZUdyaWRNZW51SW50ZXJuYWxDdXN0b21Db21tYW5kcyhlOiBFdmVudCwgYXJnczogR3JpZE1lbnVJdGVtKSB7XHJcbiAgICBpZiAoYXJncyAmJiBhcmdzLmNvbW1hbmQpIHtcclxuICAgICAgc3dpdGNoIChhcmdzLmNvbW1hbmQpIHtcclxuICAgICAgICBjYXNlICdjbGVhci1maWx0ZXInOlxyXG4gICAgICAgICAgdGhpcy5maWx0ZXJTZXJ2aWNlLmNsZWFyRmlsdGVycygpO1xyXG4gICAgICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmRhdGFWaWV3LnJlZnJlc2goKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ2NsZWFyLXNvcnRpbmcnOlxyXG4gICAgICAgICAgdGhpcy5zb3J0U2VydmljZS5jbGVhclNvcnRpbmcoKTtcclxuICAgICAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5kYXRhVmlldy5yZWZyZXNoKCk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdleHBvcnQtY3N2JzpcclxuICAgICAgICAgIHRoaXMuZXhwb3J0U2VydmljZS5leHBvcnRUb0ZpbGUoe1xyXG4gICAgICAgICAgICBkZWxpbWl0ZXI6IERlbGltaXRlclR5cGUuY29tbWEsXHJcbiAgICAgICAgICAgIGZpbGVuYW1lOiAnZXhwb3J0JyxcclxuICAgICAgICAgICAgZm9ybWF0OiBGaWxlVHlwZS5jc3YsXHJcbiAgICAgICAgICAgIHVzZVV0ZjhXaXRoQm9tOiB0cnVlXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ2V4cG9ydC10ZXh0LWRlbGltaXRlZCc6XHJcbiAgICAgICAgICB0aGlzLmV4cG9ydFNlcnZpY2UuZXhwb3J0VG9GaWxlKHtcclxuICAgICAgICAgICAgZGVsaW1pdGVyOiBEZWxpbWl0ZXJUeXBlLnRhYixcclxuICAgICAgICAgICAgZmlsZW5hbWU6ICdleHBvcnQnLFxyXG4gICAgICAgICAgICBmb3JtYXQ6IEZpbGVUeXBlLnR4dCxcclxuICAgICAgICAgICAgdXNlVXRmOFdpdGhCb206IHRydWVcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAndG9nZ2xlLWZpbHRlcic6XHJcbiAgICAgICAgICBjb25zdCBzaG93SGVhZGVyUm93ID0gdGhpcy5zaGFyZWRTZXJ2aWNlICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucyAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuc2hvd0hlYWRlclJvdyB8fCBmYWxzZTtcclxuICAgICAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLnNldEhlYWRlclJvd1Zpc2liaWxpdHkoIXNob3dIZWFkZXJSb3cpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAndG9nZ2xlLXRvcHBhbmVsJzpcclxuICAgICAgICAgIGNvbnN0IHNob3dUb3BQYW5lbCA9IHRoaXMuc2hhcmVkU2VydmljZSAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLnNob3dUb3BQYW5lbCB8fCBmYWxzZTtcclxuICAgICAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLnNldFRvcFBhbmVsVmlzaWJpbGl0eSghc2hvd1RvcFBhbmVsKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ3RvZ2dsZS1wcmVoZWFkZXInOlxyXG4gICAgICAgICAgY29uc3Qgc2hvd1ByZUhlYWRlclBhbmVsID0gdGhpcy5zaGFyZWRTZXJ2aWNlICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucyAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuc2hvd1ByZUhlYWRlclBhbmVsIHx8IGZhbHNlO1xyXG4gICAgICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQuc2V0UHJlSGVhZGVyUGFuZWxWaXNpYmlsaXR5KCFzaG93UHJlSGVhZGVyUGFuZWwpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAncmVmcmVzaC1kYXRhc2V0JzpcclxuICAgICAgICAgIHRoaXMucmVmcmVzaEJhY2tlbmREYXRhc2V0KCk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgZW1wdHlHcmlkTWVudVRpdGxlcygpIHtcclxuICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudSkge1xyXG4gICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZ3JpZE1lbnUuY3VzdG9tVGl0bGUgPSAnJztcclxuICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmdyaWRNZW51LmNvbHVtblRpdGxlID0gJyc7XHJcbiAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudS5mb3JjZUZpdFRpdGxlID0gJyc7XHJcbiAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5ncmlkTWVudS5zeW5jUmVzaXplVGl0bGUgPSAnJztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiBAcmV0dXJuIGRlZmF1bHQgR3JpZCBNZW51IG9wdGlvbnMgKi9cclxuICBwcml2YXRlIGdldERlZmF1bHRHcmlkTWVudU9wdGlvbnMoKTogR3JpZE1lbnUge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgY3VzdG9tVGl0bGU6IHVuZGVmaW5lZCxcclxuICAgICAgY29sdW1uVGl0bGU6IHRoaXMuZXh0ZW5zaW9uVXRpbGl0eS5nZXRQaWNrZXJUaXRsZU91dHB1dFN0cmluZygnY29sdW1uVGl0bGUnLCAnZ3JpZE1lbnUnKSxcclxuICAgICAgZm9yY2VGaXRUaXRsZTogdGhpcy5leHRlbnNpb25VdGlsaXR5LmdldFBpY2tlclRpdGxlT3V0cHV0U3RyaW5nKCdmb3JjZUZpdFRpdGxlJywgJ2dyaWRNZW51JyksXHJcbiAgICAgIHN5bmNSZXNpemVUaXRsZTogdGhpcy5leHRlbnNpb25VdGlsaXR5LmdldFBpY2tlclRpdGxlT3V0cHV0U3RyaW5nKCdzeW5jUmVzaXplVGl0bGUnLCAnZ3JpZE1lbnUnKSxcclxuICAgICAgaWNvbkNzc0NsYXNzOiAnZmEgZmEtYmFycycsXHJcbiAgICAgIG1lbnVXaWR0aDogMTgsXHJcbiAgICAgIGN1c3RvbUl0ZW1zOiBbXSxcclxuICAgICAgaGlkZUNsZWFyQWxsRmlsdGVyc0NvbW1hbmQ6IGZhbHNlLFxyXG4gICAgICBoaWRlUmVmcmVzaERhdGFzZXRDb21tYW5kOiBmYWxzZSxcclxuICAgICAgaGlkZVRvZ2dsZUZpbHRlckNvbW1hbmQ6IGZhbHNlLFxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIl19