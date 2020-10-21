import * as tslib_1 from "tslib";
// import 3rd party vendor libs
// only import the necessary core lib, each will be imported on demand when enabled (via require)
import 'jquery-ui-dist/jquery-ui';
import 'slickgrid/lib/jquery.event.drag-2.3.0';
import 'slickgrid/slick.core';
import 'slickgrid/slick.grid';
import 'slickgrid/slick.dataview';
// ...then everything else...
import { Component, ElementRef, EventEmitter, Inject, Injectable, Input, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { GlobalGridOptions } from './../global-grid-options';
import { titleCase, unsubscribeAllObservables } from './../services/utilities';
import { executeBackendProcessesCallback, onBackendError } from '../services/backend-utilities';
import { ExtensionName, GridStateType, } from './../models/index';
import { FilterFactory } from '../filters/filterFactory';
import { SlickgridConfig } from '../slickgrid-config';
import { isObservable, Observable } from 'rxjs';
// Services
import { AngularUtilService } from './../services/angularUtilService';
import { ExportService } from './../services/export.service';
import { ExtensionService } from '../services/extension.service';
import { ExtensionUtility } from '../extensions/extensionUtility';
import { FilterService } from './../services/filter.service';
import { GraphqlService } from './../services/graphql.service';
import { GridEventService } from './../services/gridEvent.service';
import { GridService } from './../services/grid.service';
import { GridStateService } from './../services/gridState.service';
import { GroupingAndColspanService } from './../services/groupingAndColspan.service';
import { ResizerService } from './../services/resizer.service';
import { SharedService } from '../services/shared.service';
import { SortService } from './../services/sort.service';
// Extensions (SlickGrid Controls & Plugins)
import { AutoTooltipExtension } from '../extensions/autoTooltipExtension';
import { CellExternalCopyManagerExtension } from '../extensions/cellExternalCopyManagerExtension';
import { CheckboxSelectorExtension } from '../extensions/checkboxSelectorExtension';
import { ColumnPickerExtension } from '../extensions/columnPickerExtension';
import { DraggableGroupingExtension } from '../extensions/draggableGroupingExtension';
import { GridMenuExtension } from '../extensions/gridMenuExtension';
import { GroupItemMetaProviderExtension } from '../extensions/groupItemMetaProviderExtension';
import { HeaderButtonExtension } from '../extensions/headerButtonExtension';
import { HeaderMenuExtension } from '../extensions/headerMenuExtension';
import { RowDetailViewExtension } from '../extensions/rowDetailViewExtension';
import { RowMoveManagerExtension } from '../extensions/rowMoveManagerExtension';
import { RowSelectionExtension } from '../extensions/rowSelectionExtension';
var slickgridEventPrefix = 'sg';
var AngularSlickgridComponent = /** @class */ (function () {
    function AngularSlickgridComponent(elm, exportService, extensionService, extensionUtility, filterService, gridService, gridEventService, gridStateService, groupingAndColspanService, resizer, sharedService, sortService, translate, forRootConfig) {
        this.elm = elm;
        this.exportService = exportService;
        this.extensionService = extensionService;
        this.extensionUtility = extensionUtility;
        this.filterService = filterService;
        this.gridService = gridService;
        this.gridEventService = gridEventService;
        this.gridStateService = gridStateService;
        this.groupingAndColspanService = groupingAndColspanService;
        this.resizer = resizer;
        this.sharedService = sharedService;
        this.sortService = sortService;
        this.translate = translate;
        this.forRootConfig = forRootConfig;
        this._eventHandler = new Slick.EventHandler();
        this._hideHeaderRowAfterPageLoad = false;
        this.groupingDefinition = {};
        this.showPagination = false;
        this.isGridInitialized = false;
        this.subscriptions = [];
        this.onAngularGridCreated = new EventEmitter();
        this.onDataviewCreated = new EventEmitter();
        this.onGridCreated = new EventEmitter();
        this.onGridInitialized = new EventEmitter();
        this.onBeforeGridCreate = new EventEmitter();
        this.onBeforeGridDestroy = new EventEmitter();
        this.onAfterGridDestroyed = new EventEmitter();
        this.onGridStateChanged = new EventEmitter();
    }
    Object.defineProperty(AngularSlickgridComponent.prototype, "gridHeight", {
        set: function (height) {
            this._fixedHeight = height;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AngularSlickgridComponent.prototype, "gridWidth", {
        set: function (width) {
            this._fixedWidth = width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AngularSlickgridComponent.prototype, "columnDefinitions", {
        get: function () {
            return this._columnDefinitions;
        },
        set: function (columnDefinitions) {
            this._columnDefinitions = columnDefinitions;
            if (this.isGridInitialized) {
                this.updateColumnDefinitionsList(columnDefinitions);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AngularSlickgridComponent.prototype, "dataset", {
        get: function () {
            return this.dataView.getItems();
        },
        set: function (dataset) {
            this._dataset = dataset;
            this.refreshGridData(dataset);
        },
        enumerable: true,
        configurable: true
    });
    AngularSlickgridComponent.prototype.ngOnInit = function () {
        this.onBeforeGridCreate.emit(true);
        if (this.gridOptions && !this.gridOptions.enableAutoResize && (this._fixedHeight || this._fixedWidth)) {
            this.gridHeightString = this._fixedHeight + "px";
            this.gridWidthString = this._fixedWidth + "px";
        }
    };
    AngularSlickgridComponent.prototype.ngOnDestroy = function () {
        this.onBeforeGridDestroy.emit(this.grid);
        this.destroy();
        this.onAfterGridDestroyed.emit(true);
    };
    AngularSlickgridComponent.prototype.destroy = function (emptyDomElementContainer) {
        if (emptyDomElementContainer === void 0) { emptyDomElementContainer = false; }
        var gridContainerId = this.gridOptions && this.gridOptions.gridContainerId;
        this.dataView = undefined;
        this.gridOptions = {};
        this.extensionService.dispose();
        this.filterService.dispose();
        this.gridEventService.dispose();
        this.gridStateService.dispose();
        this.groupingAndColspanService.dispose();
        this.resizer.dispose();
        this.sortService.dispose();
        if (this._eventHandler && this._eventHandler.unsubscribeAll) {
            this._eventHandler.unsubscribeAll();
        }
        if (this.grid && this.grid.destroy) {
            this.grid.destroy();
        }
        if (emptyDomElementContainer) {
            $(gridContainerId).empty();
        }
        // also unsubscribe all RxJS subscriptions
        this.subscriptions = unsubscribeAllObservables(this.subscriptions);
    };
    AngularSlickgridComponent.prototype.ngAfterViewInit = function () {
        this.initialization();
        this.isGridInitialized = true;
        // user must provide a "gridHeight" or use "autoResize: true" in the grid options
        if (!this._fixedHeight && !this.gridOptions.enableAutoResize) {
            throw new Error("[Angular-Slickgrid] requires a \"grid-height\" or the \"enableAutoResize\" grid option to be enabled.\n        Without that the grid will seem empty while in fact it just does not have any height define.");
        }
    };
    AngularSlickgridComponent.prototype.initialization = function () {
        // make sure the dataset is initialized (if not it will throw an error that it cannot getLength of null)
        this._dataset = this._dataset || [];
        this.gridOptions = this.mergeGridOptions(this.gridOptions);
        this.createBackendApiInternalPostProcessCallback(this.gridOptions);
        if (!this.customDataView) {
            if (this.gridOptions.draggableGrouping || this.gridOptions.enableGrouping) {
                this.extensionUtility.loadExtensionDynamically(ExtensionName.groupItemMetaProvider);
                this.groupItemMetadataProvider = new Slick.Data.GroupItemMetadataProvider();
                this.sharedService.groupItemMetadataProvider = this.groupItemMetadataProvider;
                this.dataView = new Slick.Data.DataView({ groupItemMetadataProvider: this.groupItemMetadataProvider });
            }
            else {
                this.dataView = new Slick.Data.DataView();
            }
        }
        // for convenience to the user, we provide the property "editor" as an Angular-Slickgrid editor complex object
        // however "editor" is used internally by SlickGrid for it's own Editor Factory
        // so in our lib we will swap "editor" and copy it into a new property called "internalColumnEditor"
        // then take back "editor.model" and make it the new "editor" so that SlickGrid Editor Factory still works
        this._columnDefinitions = this.swapInternalEditorToSlickGridFactoryEditor(this._columnDefinitions);
        // save reference for all columns before they optionally become hidden/visible
        this.sharedService.allColumns = this._columnDefinitions;
        this.sharedService.visibleColumns = this._columnDefinitions;
        this.extensionService.createExtensionsBeforeGridCreation(this._columnDefinitions, this.gridOptions);
        // build SlickGrid Grid, also user might optionally pass a custom dataview (e.g. remote model)
        this.grid = new Slick.Grid("#" + this.gridId, this.customDataView || this.dataView, this._columnDefinitions, this.gridOptions);
        this.sharedService.dataView = this.dataView;
        this.sharedService.grid = this.grid;
        this.extensionService.bindDifferentExtensions();
        this.attachDifferentHooks(this.grid, this.gridOptions, this.dataView);
        // emit the Grid & DataView object to make them available in parent component
        this.onGridCreated.emit(this.grid);
        // initialize the SlickGrid grid
        this.grid.init();
        if (!this.customDataView && (this.dataView && this.dataView.beginUpdate && this.dataView.setItems && this.dataView.endUpdate)) {
            this.onDataviewCreated.emit(this.dataView);
            this.dataView.beginUpdate();
            this.dataView.setItems(this._dataset, this.gridOptions.datasetIdPropertyName);
            this.dataView.endUpdate();
            // if you don't want the items that are not visible (due to being filtered out or being on a different page)
            // to stay selected, pass 'false' to the second arg
            if (this.gridOptions && this.gridOptions.dataView && this.gridOptions.dataView.hasOwnProperty('syncGridSelection')) {
                var syncGridSelection = this.gridOptions.dataView.syncGridSelection;
                if (typeof syncGridSelection === 'boolean') {
                    this.dataView.syncGridSelection(this.grid, this.gridOptions.dataView.syncGridSelection);
                }
                else {
                    this.dataView.syncGridSelection(this.grid, syncGridSelection.preserveHidden, syncGridSelection.preserveHiddenOnSelectionChange);
                }
            }
        }
        // user might want to hide the header row on page load but still have `enableFiltering: true`
        // if that is the case, we need to hide the headerRow ONLY AFTER all filters got created & dataView exist
        if (this._hideHeaderRowAfterPageLoad) {
            this.showHeaderRow(false);
        }
        // after the DataView is created & updated execute some processes
        this.executeAfterDataviewCreated(this.grid, this.gridOptions, this.dataView);
        // attach resize ONLY after the dataView is ready
        this.attachResizeHook(this.grid, this.gridOptions);
        // attach grouping and header grouping colspan service
        if (this.gridOptions.createPreHeaderPanel && !this.gridOptions.enableDraggableGrouping) {
            this.groupingAndColspanService.init(this.grid, this.dataView);
        }
        // attach grid  service
        this.gridService.init(this.grid, this.dataView);
        // when user enables translation, we need to translate Headers on first pass & subsequently in the attachDifferentHooks
        if (this.gridOptions.enableTranslate) {
            this.extensionService.translateColumnHeaders();
        }
        // if Export is enabled, initialize the service with the necessary grid and other objects
        if (this.gridOptions.enableExport) {
            this.exportService.init(this.grid, this.dataView);
        }
        // once all hooks are in placed and the grid is initialized, we can emit an event
        this.onGridInitialized.emit(this.grid);
        // attach the Backend Service API callback functions only after the grid is initialized
        // because the preProcess() and onInit() might get triggered
        if (this.gridOptions && this.gridOptions.backendServiceApi) {
            this.attachBackendCallbackFunctions(this.gridOptions);
        }
        this.gridStateService.init(this.grid, this.extensionService, this.filterService, this.sortService);
        this.onAngularGridCreated.emit({
            // Slick Grid & DataView objects
            dataView: this.dataView,
            slickGrid: this.grid,
            // public methods
            destroy: this.destroy.bind(this),
            // return all available Services (non-singleton)
            backendService: this.gridOptions && this.gridOptions.backendServiceApi && this.gridOptions.backendServiceApi.service,
            exportService: this.exportService,
            extensionService: this.extensionService,
            filterService: this.filterService,
            gridEventService: this.gridEventService,
            gridStateService: this.gridStateService,
            gridService: this.gridService,
            groupingService: this.groupingAndColspanService,
            resizerService: this.resizer,
            sortService: this.sortService,
            /** @deprecated please use "extensionService" instead */
            pluginService: this.extensionService,
        });
    };
    /**
     * Commits the current edit to the grid
     */
    AngularSlickgridComponent.prototype.commitEdit = function (target) {
        var _this = this;
        if (this.grid.getOptions().autoCommitEdit) {
            var activeNode_1 = this.grid.getActiveCellNode();
            // a timeout must be set or this could come into conflict when slickgrid
            // tries to commit the edit when going from one editor to another on the grid
            // through the click event. If the timeout was not here it would
            // try to commit/destroy the editor twice, which would throw a jquery
            // error about the element not being in the DOM
            setTimeout(function () {
                // make sure the target is the active editor so we do not
                // commit prematurely
                if (activeNode_1 && activeNode_1.contains(target) && _this.grid.getEditorLock().isActive()) {
                    _this.grid.getEditorLock().commitCurrentEdit();
                }
            });
        }
    };
    /**
     * Define our internal Post Process callback, it will execute internally after we get back result from the Process backend call
     * For now, this is GraphQL Service ONLY feature and it will basically refresh the Dataset & Pagination without having the user to create his own PostProcess every time
     */
    AngularSlickgridComponent.prototype.createBackendApiInternalPostProcessCallback = function (gridOptions) {
        var _this = this;
        if (gridOptions && gridOptions.backendServiceApi) {
            var backendApi_1 = gridOptions.backendServiceApi;
            // internalPostProcess only works with a GraphQL Service, so make sure it is that type
            if (backendApi_1 && backendApi_1.service && backendApi_1.service instanceof GraphqlService) {
                backendApi_1.internalPostProcess = function (processResult) {
                    var datasetName = (backendApi_1 && backendApi_1.service && typeof backendApi_1.service.getDatasetName === 'function') ? backendApi_1.service.getDatasetName() : '';
                    if (processResult && processResult.data && processResult.data[datasetName]) {
                        _this._dataset = processResult.data[datasetName].nodes;
                        _this.refreshGridData(_this._dataset, processResult.data[datasetName].totalCount);
                    }
                    else {
                        _this._dataset = [];
                    }
                };
            }
        }
    };
    AngularSlickgridComponent.prototype.attachDifferentHooks = function (grid, gridOptions, dataView) {
        var _this = this;
        // on locale change, we have to manually translate the Headers, GridMenu
        this.subscriptions.push(this.translate.onLangChange.subscribe(function (event) {
            if (gridOptions.enableTranslate) {
                _this.extensionService.translateColumnHeaders();
                _this.extensionService.translateColumnPicker();
                _this.extensionService.translateGridMenu();
                _this.extensionService.translateHeaderMenu();
            }
        }));
        // if user entered some Columns "presets", we need to reflect them all in the grid
        if (gridOptions.presets && Array.isArray(gridOptions.presets.columns) && gridOptions.presets.columns.length > 0) {
            var gridColumns = this.gridStateService.getAssociatedGridColumns(grid, gridOptions.presets.columns);
            if (gridColumns && Array.isArray(gridColumns) && gridColumns.length > 0) {
                // make sure that the checkbox selector is also visible if it is enabled
                if (gridOptions.enableCheckboxSelector) {
                    var checkboxColumn = (Array.isArray(this._columnDefinitions) && this._columnDefinitions.length > 0) ? this._columnDefinitions[0] : null;
                    if (checkboxColumn && checkboxColumn.id === '_checkbox_selector' && gridColumns[0].id !== '_checkbox_selector') {
                        gridColumns.unshift(checkboxColumn);
                    }
                }
                // finally set the new presets columns (including checkbox selector if need be)
                grid.setColumns(gridColumns);
            }
        }
        // attach external sorting (backend) when available or default onSort (dataView)
        if (gridOptions.enableSorting && !this.customDataView) {
            gridOptions.backendServiceApi ? this.sortService.attachBackendOnSort(grid, dataView) : this.sortService.attachLocalOnSort(grid, dataView);
        }
        // attach external filter (backend) when available or default onFilter (dataView)
        if (gridOptions.enableFiltering && !this.customDataView) {
            this.filterService.init(grid);
            // if user entered some Filter "presets", we need to reflect them all in the DOM
            if (gridOptions.presets && Array.isArray(gridOptions.presets.filters) && gridOptions.presets.filters.length > 0) {
                this.filterService.populateColumnFilterSearchTerms();
            }
            gridOptions.backendServiceApi ? this.filterService.attachBackendOnFilter(grid, this.dataView) : this.filterService.attachLocalOnFilter(grid, this.dataView);
        }
        // if user set an onInit Backend, we'll run it right away (and if so, we also need to run preProcess, internalPostProcess & postProcess)
        if (gridOptions.backendServiceApi) {
            var backendApi = gridOptions.backendServiceApi;
            if (backendApi && backendApi.service && backendApi.service.init) {
                backendApi.service.init(backendApi.options, gridOptions.pagination, this.grid);
            }
        }
        var _loop_1 = function (prop) {
            if (grid.hasOwnProperty(prop) && prop.startsWith('on')) {
                this_1._eventHandler.subscribe(grid[prop], function (e, args) {
                    return _this.dispatchCustomEvent("" + slickgridEventPrefix + titleCase(prop), { eventData: e, args: args });
                });
            }
        };
        var this_1 = this;
        // expose all Slick Grid Events through dispatch
        for (var prop in grid) {
            _loop_1(prop);
        }
        var _loop_2 = function (prop) {
            if (dataView.hasOwnProperty(prop) && prop.startsWith('on')) {
                this_2._eventHandler.subscribe(dataView[prop], function (e, args) {
                    return _this.dispatchCustomEvent("" + slickgridEventPrefix + titleCase(prop), { eventData: e, args: args });
                });
            }
        };
        var this_2 = this;
        // expose all Slick DataView Events through dispatch
        for (var prop in dataView) {
            _loop_2(prop);
        }
        // expose GridState Service changes event through dispatch
        this.subscriptions.push(this.gridStateService.onGridStateChanged.subscribe(function (gridStateChange) {
            _this.onGridStateChanged.emit(gridStateChange);
        }));
        // on cell click, mainly used with the columnDef.action callback
        this.gridEventService.attachOnCellChange(grid, dataView);
        this.gridEventService.attachOnClick(grid, dataView);
        if (dataView && grid) {
            this._eventHandler.subscribe(dataView.onRowCountChanged, function (e, args) {
                grid.invalidate();
            });
            // without this, filtering data with local dataset will not always show correctly
            // also don't use "invalidateRows" since it destroys the entire row and as bad user experience when updating a row
            // see commit: https://github.com/ghiscoding/Angular-Slickgrid/commit/bb62c0aa2314a5d61188ff005ccb564577f08805
            if (gridOptions && gridOptions.enableFiltering && !gridOptions.enableRowDetailView) {
                this._eventHandler.subscribe(dataView.onRowsChanged, function (e, args) {
                    if (args && args.rows && Array.isArray(args.rows)) {
                        args.rows.forEach(function (row) { return grid.updateRow(row); });
                        grid.render();
                    }
                });
            }
        }
        // does the user have a colspan callback?
        if (gridOptions.colspanCallback) {
            this.dataView.getItemMetadata = function (rowNumber) {
                var item = _this.dataView.getItem(rowNumber);
                return gridOptions.colspanCallback(item);
            };
        }
    };
    AngularSlickgridComponent.prototype.attachBackendCallbackFunctions = function (gridOptions) {
        var _this = this;
        var backendApi = gridOptions.backendServiceApi;
        var serviceOptions = (backendApi && backendApi.service && backendApi.service.options) ? backendApi.service.options : {};
        var isExecuteCommandOnInit = (!serviceOptions) ? false : ((serviceOptions && serviceOptions.hasOwnProperty('executeProcessCommandOnInit')) ? serviceOptions['executeProcessCommandOnInit'] : true);
        // update backend filters (if need be) before the query runs
        if (backendApi) {
            var backendService = backendApi.service;
            // if user entered some any "presets", we need to reflect them all in the grid
            if (gridOptions && gridOptions.presets) {
                // Filters "presets"
                if (backendService && backendService.updateFilters && Array.isArray(gridOptions.presets.filters) && gridOptions.presets.filters.length > 0) {
                    backendService.updateFilters(gridOptions.presets.filters, true);
                }
                // Sorters "presets"
                if (backendService && backendService.updateSorters && Array.isArray(gridOptions.presets.sorters) && gridOptions.presets.sorters.length > 0) {
                    backendService.updateSorters(undefined, gridOptions.presets.sorters);
                }
                // Pagination "presets"
                if (backendService && backendService.updatePagination && gridOptions.presets.pagination) {
                    backendService.updatePagination(gridOptions.presets.pagination.pageNumber, gridOptions.presets.pagination.pageSize);
                }
            }
            else {
                var columnFilters = this.filterService.getColumnFilters();
                if (columnFilters && backendService && backendService.updateFilters) {
                    backendService.updateFilters(columnFilters, false);
                }
            }
        }
        if (backendApi && backendApi.service && (backendApi.onInit || isExecuteCommandOnInit)) {
            var query = (typeof backendApi.service.buildQuery === 'function') ? backendApi.service.buildQuery() : '';
            var process_1 = (isExecuteCommandOnInit) ? backendApi.process(query) : backendApi.onInit(query);
            // wrap this inside a setTimeout to avoid timing issue since the gridOptions needs to be ready before running this onInit
            setTimeout(function () {
                // keep start time & end timestamps & return it after process execution
                var startTime = new Date();
                // run any pre-process, if defined, for example a spinner
                if (backendApi.preProcess) {
                    backendApi.preProcess();
                }
                try {
                    // the processes can be Observables (like HttpClient) or Promises
                    if (process_1 instanceof Promise && process_1.then) {
                        process_1.then(function (processResult) { return executeBackendProcessesCallback(startTime, processResult, backendApi, _this.gridOptions); });
                    }
                    else if (isObservable(process_1)) {
                        process_1.subscribe(function (processResult) { return executeBackendProcessesCallback(startTime, processResult, backendApi, _this.gridOptions); }, function (error) { return onBackendError(error, backendApi); });
                    }
                }
                catch (error) {
                    onBackendError(error, backendApi);
                }
            });
        }
    };
    AngularSlickgridComponent.prototype.attachResizeHook = function (grid, options) {
        // expand/autofit columns on first page load
        if (grid && options.autoFitColumnsOnFirstLoad && options.enableAutoSizeColumns) {
            grid.autosizeColumns();
            // compensate anytime SlickGrid measureScrollbar is incorrect (only seems to happen in Chrome 1/5 computers)
            this.resizer.compensateHorizontalScroll(this.grid, this.gridOptions);
        }
        // auto-resize grid on browser resize
        if (this._fixedHeight || this._fixedWidth) {
            this.resizer.init(grid, { height: this._fixedHeight, width: this._fixedWidth });
        }
        else {
            this.resizer.init(grid);
        }
        if (options.enableAutoResize) {
            this.resizer.bindAutoResizeDataGrid();
            if (grid && options.autoFitColumnsOnFirstLoad && options.enableAutoSizeColumns) {
                grid.autosizeColumns();
            }
        }
    };
    AngularSlickgridComponent.prototype.executeAfterDataviewCreated = function (grid, gridOptions, dataView) {
        // if user entered some Sort "presets", we need to reflect them all in the DOM
        if (gridOptions.enableSorting) {
            if (gridOptions.presets && Array.isArray(gridOptions.presets.sorters) && gridOptions.presets.sorters.length > 0) {
                this.sortService.loadLocalPresets(grid, dataView);
            }
        }
    };
    AngularSlickgridComponent.prototype.mergeGridOptions = function (gridOptions) {
        gridOptions.gridId = this.gridId;
        gridOptions.gridContainerId = "slickGridContainer-" + this.gridId;
        // use jquery extend to deep merge & copy to avoid immutable properties being changed in GlobalGridOptions after a route change
        var options = $.extend(true, {}, GlobalGridOptions, this.forRootConfig, gridOptions);
        // using jQuery extend to do a deep clone has an unwanted side on objects and pageSizes but ES6 spread has other worst side effects
        // so we will just overwrite the pageSizes when needed, this is the only one causing issues so far.
        // jQuery wrote this on their docs:: On a deep extend, Object and Array are extended, but object wrappers on primitive types such as String, Boolean, and Number are not.
        if (gridOptions && gridOptions.backendServiceApi) {
            if (gridOptions.pagination && Array.isArray(gridOptions.pagination.pageSizes) && gridOptions.pagination.pageSizes.length > 0) {
                options.pagination.pageSizes = gridOptions.pagination.pageSizes;
            }
        }
        // also make sure to show the header row if user have enabled filtering
        this._hideHeaderRowAfterPageLoad = (options.showHeaderRow === false);
        if (options.enableFiltering && !options.showHeaderRow) {
            options.showHeaderRow = options.enableFiltering;
        }
        return options;
    };
    /**
     * On a Pagination changed, we will trigger a Grid State changed with the new pagination info
     * Also if we use Row Selection or the Checkbox Selector, we need to reset any selection
     */
    AngularSlickgridComponent.prototype.paginationChanged = function (pagination) {
        if (this.gridOptions.enableRowSelection || this.gridOptions.enableCheckboxSelector) {
            this.gridService.setSelectedRows([]);
        }
        this.gridStateService.onGridStateChanged.next({
            change: { newValues: pagination, type: GridStateType.pagination },
            gridState: this.gridStateService.getCurrentGridState()
        });
    };
    /**
     * When dataset changes, we need to refresh the entire grid UI & possibly resize it as well
     * @param dataset
     */
    AngularSlickgridComponent.prototype.refreshGridData = function (dataset, totalCount) {
        if (Array.isArray(dataset) && this.grid && this.dataView && typeof this.dataView.setItems === 'function') {
            this.dataView.setItems(dataset, this.gridOptions.datasetIdPropertyName);
            if (!this.gridOptions.backendServiceApi) {
                this.dataView.reSort();
            }
            if (dataset) {
                this.grid.invalidate();
                this.grid.render();
            }
            if (this.gridOptions.backendServiceApi) {
                // do we want to show pagination?
                // if we have a backendServiceApi and the enablePagination is undefined, we'll assume that we do want to see it, else get that defined value
                this.showPagination = ((this.gridOptions.backendServiceApi && this.gridOptions.enablePagination === undefined) ? true : this.gridOptions.enablePagination) || false;
                // before merging the grid options, make sure that it has the totalItems count
                // once we have that, we can merge and pass all these options to the pagination component
                if (!this.gridOptions.pagination) {
                    this.gridOptions.pagination = (this.gridOptions.pagination) ? this.gridOptions.pagination : undefined;
                }
                if (this.gridOptions.pagination && totalCount !== undefined) {
                    this.gridOptions.pagination.totalItems = totalCount;
                }
                if (this.gridOptions.presets && this.gridOptions.presets.pagination && this.gridOptions.pagination) {
                    this.gridOptions.pagination.pageSize = this.gridOptions.presets.pagination.pageSize;
                    this.gridOptions.pagination.pageNumber = this.gridOptions.presets.pagination.pageNumber;
                }
                this.gridPaginationOptions = this.mergeGridOptions(this.gridOptions);
            }
            // resize the grid inside a slight timeout, in case other DOM element changed prior to the resize (like a filter/pagination changed)
            if (this.grid && this.gridOptions.enableAutoResize) {
                var delay = this.gridOptions.autoResize && this.gridOptions.autoResize.delay;
                this.resizer.resizeGrid(delay || 10);
            }
        }
    };
    /**
     * Dynamically change or update the column definitions list.
     * We will re-render the grid so that the new header and data shows up correctly.
     * If using i18n, we also need to trigger a re-translate of the column headers
     */
    AngularSlickgridComponent.prototype.updateColumnDefinitionsList = function (newColumnDefinitions) {
        // map/swap the internal library Editor to the SlickGrid Editor factory
        newColumnDefinitions = this.swapInternalEditorToSlickGridFactoryEditor(newColumnDefinitions);
        if (this.gridOptions.enableTranslate) {
            this.extensionService.translateColumnHeaders(false, newColumnDefinitions);
        }
        else {
            this.extensionService.renderColumnHeaders(newColumnDefinitions);
        }
        if (this.gridOptions && this.gridOptions.enableAutoSizeColumns) {
            this.grid.autosizeColumns();
        }
    };
    /** Toggle the filter row displayed on first row
     * @param isShowing
     */
    AngularSlickgridComponent.prototype.showHeaderRow = function (isShowing) {
        this.grid.setHeaderRowVisibility(isShowing);
        return isShowing;
    };
    /** Toggle the filter row displayed on first row */
    AngularSlickgridComponent.prototype.toggleHeaderRow = function () {
        var isShowing = !this.grid.getOptions().showHeaderRow;
        this.grid.setHeaderRowVisibility(isShowing);
        return isShowing;
    };
    //
    // private functions
    // ------------------
    /** Dispatch of Custom Event, which by default will bubble & is cancelable */
    AngularSlickgridComponent.prototype.dispatchCustomEvent = function (eventName, data, isBubbling, isCancelable) {
        if (isBubbling === void 0) { isBubbling = true; }
        if (isCancelable === void 0) { isCancelable = true; }
        var eventInit = { bubbles: isBubbling, cancelable: isCancelable };
        if (data) {
            eventInit.detail = data;
        }
        return this.elm.nativeElement.dispatchEvent(new CustomEvent(eventName, eventInit));
    };
    /** Load the Editor Collection asynchronously and replace the "collection" property when Observable resolves */
    AngularSlickgridComponent.prototype.loadEditorCollectionAsync = function (column) {
        var _this = this;
        var collectionAsync = column && column.editor && column.editor.collectionAsync;
        if (collectionAsync instanceof Observable) {
            this.subscriptions.push(collectionAsync.subscribe(function (resolvedCollection) { return _this.updateEditorCollection(column, resolvedCollection); }));
        }
    };
    /**
     * For convenience to the user, we provide the property "editor" as an Angular-Slickgrid editor complex object
     * however "editor" is used internally by SlickGrid for it's own Editor Factory
     * so in our lib we will swap "editor" and copy it into a new property called "internalColumnEditor"
     * then take back "editor.model" and make it the new "editor" so that SlickGrid Editor Factory still works
     */
    AngularSlickgridComponent.prototype.swapInternalEditorToSlickGridFactoryEditor = function (columnDefinitions) {
        var _this = this;
        return columnDefinitions.map(function (column) {
            // on every Editor that have a "collectionAsync", resolve the data and assign it to the "collection" property
            if (column.editor && column.editor.collectionAsync) {
                _this.loadEditorCollectionAsync(column);
            }
            return tslib_1.__assign({}, column, { editor: column.editor && column.editor.model, internalColumnEditor: tslib_1.__assign({}, column.editor) });
        });
    };
    /**
     * Update the Editor "collection" property from an async call resolved
     * Since this is called after the async call resolves, the pointer will not be the same as the "column" argument passed.
     * Once we found the new pointer, we will reassign the "editor" and "collection" to the "internalColumnEditor" so it has newest collection
     */
    AngularSlickgridComponent.prototype.updateEditorCollection = function (column, newCollection) {
        column.editor.collection = newCollection;
        // find the new column reference pointer
        var columns = this.grid.getColumns();
        if (Array.isArray(columns)) {
            var columnRef = columns.find(function (col) { return col.id === column.id; });
            columnRef.internalColumnEditor = column.editor;
        }
    };
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], AngularSlickgridComponent.prototype, "onAngularGridCreated", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], AngularSlickgridComponent.prototype, "onDataviewCreated", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], AngularSlickgridComponent.prototype, "onGridCreated", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], AngularSlickgridComponent.prototype, "onGridInitialized", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], AngularSlickgridComponent.prototype, "onBeforeGridCreate", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], AngularSlickgridComponent.prototype, "onBeforeGridDestroy", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], AngularSlickgridComponent.prototype, "onAfterGridDestroyed", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], AngularSlickgridComponent.prototype, "onGridStateChanged", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], AngularSlickgridComponent.prototype, "customDataView", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], AngularSlickgridComponent.prototype, "gridId", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], AngularSlickgridComponent.prototype, "gridOptions", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number),
        tslib_1.__metadata("design:paramtypes", [Number])
    ], AngularSlickgridComponent.prototype, "gridHeight", null);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number),
        tslib_1.__metadata("design:paramtypes", [Number])
    ], AngularSlickgridComponent.prototype, "gridWidth", null);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Array),
        tslib_1.__metadata("design:paramtypes", [Array])
    ], AngularSlickgridComponent.prototype, "columnDefinitions", null);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Array),
        tslib_1.__metadata("design:paramtypes", [Array])
    ], AngularSlickgridComponent.prototype, "dataset", null);
    AngularSlickgridComponent = tslib_1.__decorate([
        Injectable(),
        Component({
            selector: 'angular-slickgrid',
            template: "<div id=\"slickGridContainer-{{gridId}}\" class=\"gridPane\" [style.width]=\"gridWidthString\">\r\n    <div attr.id='{{gridId}}' class=\"slickgrid-container\" style=\"width: 100%\" [style.height]=\"gridHeightString\">\r\n    </div>\r\n\r\n    <slick-pagination id=\"slickPagingContainer-{{gridId}}\"\r\n        *ngIf=\"showPagination\"\r\n        (onPaginationChanged)=\"paginationChanged($event)\"\r\n        [dataView]=\"dataView\"\r\n        [gridPaginationOptions]=\"gridPaginationOptions\">\r\n    </slick-pagination>\r\n</div>\r\n",
            providers: [
                // make everything transient (non-singleton)
                AngularUtilService,
                AutoTooltipExtension,
                CellExternalCopyManagerExtension,
                CheckboxSelectorExtension,
                ColumnPickerExtension,
                DraggableGroupingExtension,
                ExtensionService,
                ExportService,
                ExtensionUtility,
                FilterFactory,
                FilterService,
                GraphqlService,
                GridEventService,
                GridMenuExtension,
                GridService,
                GridStateService,
                GroupingAndColspanService,
                GroupItemMetaProviderExtension,
                HeaderButtonExtension,
                HeaderMenuExtension,
                ResizerService,
                RowDetailViewExtension,
                RowMoveManagerExtension,
                RowSelectionExtension,
                SharedService,
                SortService,
                SlickgridConfig
            ]
        }),
        tslib_1.__param(13, Inject('config')),
        tslib_1.__metadata("design:paramtypes", [ElementRef,
            ExportService,
            ExtensionService,
            ExtensionUtility,
            FilterService,
            GridService,
            GridEventService,
            GridStateService,
            GroupingAndColspanService,
            ResizerService,
            SharedService,
            SortService,
            TranslateService, Object])
    ], AngularSlickgridComponent);
    return AngularSlickgridComponent;
}());
export { AngularSlickgridComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1zbGlja2dyaWQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9jb21wb25lbnRzL2FuZ3VsYXItc2xpY2tncmlkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsK0JBQStCO0FBQy9CLGlHQUFpRztBQUNqRyxPQUFPLDBCQUEwQixDQUFDO0FBQ2xDLE9BQU8sdUNBQXVDLENBQUM7QUFDL0MsT0FBTyxzQkFBc0IsQ0FBQztBQUM5QixPQUFPLHNCQUFzQixDQUFDO0FBQzlCLE9BQU8sMEJBQTBCLENBQUM7QUFFbEMsNkJBQTZCO0FBQzdCLE9BQU8sRUFBaUIsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFxQixNQUFNLGVBQWUsQ0FBQztBQUN6SSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsU0FBUyxFQUFFLHlCQUF5QixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDL0UsT0FBTyxFQUFFLCtCQUErQixFQUFFLGNBQWMsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2hHLE9BQU8sRUFJTCxhQUFhLEVBSWIsYUFBYSxHQUVkLE1BQU0sbUJBQW1CLENBQUM7QUFDM0IsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFFOUQsV0FBVztBQUNYLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGtDQUFrQyxD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QUNoQixhQUFhO2dCQUNiLGFBQWE7Z0JBQ2IsY0FBYztnQkFDZCxnQkFBZ0I7Z0JBQ2hCLGlCQUFpQjtnQkFDakIsV0FBVztnQkFDWCxnQkFBZ0I7Z0JBQ2hCLHlCQUF5QjtnQkFDekIsOEJBQThCO2dCQUM5QixxQkFBcUI7Z0JBQ3JCLG1CQUFtQjtnQkFDbkIsY0FBYztnQkFDZCxzQkFBc0I7Z0JBQ3RCLHVCQUF1QjtnQkFDdkIscUJBQXFCO2dCQUNyQixhQUFhO2dCQUNiLFdBQVc7Z0JBQ1gsZUFBZTthQUNoQjtTQUNGLENBQUM7UUF5RUcsb0JBQUEsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFBO2lEQWJKLFVBQVU7WUFDQSxhQUFhO1lBQ1YsZ0JBQWdCO1lBQ2hCLGdCQUFnQjtZQUNuQixhQUFhO1lBQ2YsV0FBVztZQUNOLGdCQUFnQjtZQUNoQixnQkFBZ0I7WUFDUCx5QkFBeUI7WUFDM0MsY0FBYztZQUNSLGFBQWE7WUFDZixXQUFXO1lBQ2IsZ0JBQWdCO09BdkUxQix5QkFBeUIsQ0F1cUJyQztJQUFELGdDQUFDO0NBQUEsQUF2cUJELElBdXFCQztTQXZxQlkseUJBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gaW1wb3J0IDNyZCBwYXJ0eSB2ZW5kb3IgbGlic1xyXG4vLyBvbmx5IGltcG9ydCB0aGUgbmVjZXNzYXJ5IGNvcmUgbGliLCBlYWNoIHdpbGwgYmUgaW1wb3J0ZWQgb24gZGVtYW5kIHdoZW4gZW5hYmxlZCAodmlhIHJlcXVpcmUpXHJcbmltcG9ydCAnanF1ZXJ5LXVpLWRpc3QvanF1ZXJ5LXVpJztcclxuaW1wb3J0ICdzbGlja2dyaWQvbGliL2pxdWVyeS5ldmVudC5kcmFnLTIuMy4wJztcclxuaW1wb3J0ICdzbGlja2dyaWQvc2xpY2suY29yZSc7XHJcbmltcG9ydCAnc2xpY2tncmlkL3NsaWNrLmdyaWQnO1xyXG5pbXBvcnQgJ3NsaWNrZ3JpZC9zbGljay5kYXRhdmlldyc7XHJcblxyXG4vLyAuLi50aGVuIGV2ZXJ5dGhpbmcgZWxzZS4uLlxyXG5pbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5qZWN0LCBJbmplY3RhYmxlLCBJbnB1dCwgT3V0cHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XHJcbmltcG9ydCB7IEdsb2JhbEdyaWRPcHRpb25zIH0gZnJvbSAnLi8uLi9nbG9iYWwtZ3JpZC1vcHRpb25zJztcclxuaW1wb3J0IHsgdGl0bGVDYXNlLCB1bnN1YnNjcmliZUFsbE9ic2VydmFibGVzIH0gZnJvbSAnLi8uLi9zZXJ2aWNlcy91dGlsaXRpZXMnO1xyXG5pbXBvcnQgeyBleGVjdXRlQmFja2VuZFByb2Nlc3Nlc0NhbGxiYWNrLCBvbkJhY2tlbmRFcnJvciB9IGZyb20gJy4uL3NlcnZpY2VzL2JhY2tlbmQtdXRpbGl0aWVzJztcclxuaW1wb3J0IHtcclxuICBBbmd1bGFyR3JpZEluc3RhbmNlLFxyXG4gIEJhY2tlbmRTZXJ2aWNlT3B0aW9uLFxyXG4gIENvbHVtbixcclxuICBFeHRlbnNpb25OYW1lLFxyXG4gIEdyYXBocWxSZXN1bHQsXHJcbiAgR3JpZE9wdGlvbixcclxuICBHcmlkU3RhdGVDaGFuZ2UsXHJcbiAgR3JpZFN0YXRlVHlwZSxcclxuICBQYWdpbmF0aW9uLFxyXG59IGZyb20gJy4vLi4vbW9kZWxzL2luZGV4JztcclxuaW1wb3J0IHsgRmlsdGVyRmFjdG9yeSB9IGZyb20gJy4uL2ZpbHRlcnMvZmlsdGVyRmFjdG9yeSc7XHJcbmltcG9ydCB7IFNsaWNrZ3JpZENvbmZpZyB9IGZyb20gJy4uL3NsaWNrZ3JpZC1jb25maWcnO1xyXG5pbXBvcnQgeyBpc09ic2VydmFibGUsIE9ic2VydmFibGUsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5cclxuLy8gU2VydmljZXNcclxuaW1wb3J0IHsgQW5ndWxhclV0aWxTZXJ2aWNlIH0gZnJvbSAnLi8uLi9zZXJ2aWNlcy9hbmd1bGFyVXRpbFNlcnZpY2UnO1xyXG5pbXBvcnQgeyBFeHBvcnRTZXJ2aWNlIH0gZnJvbSAnLi8uLi9zZXJ2aWNlcy9leHBvcnQuc2VydmljZSc7XHJcbmltcG9ydCB7IEV4dGVuc2lvblNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9leHRlbnNpb24uc2VydmljZSc7XHJcbmltcG9ydCB7IEV4dGVuc2lvblV0aWxpdHkgfSBmcm9tICcuLi9leHRlbnNpb25zL2V4dGVuc2lvblV0aWxpdHknO1xyXG5pbXBvcnQgeyBGaWx0ZXJTZXJ2aWNlIH0gZnJvbSAnLi8uLi9zZXJ2aWNlcy9maWx0ZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IEdyYXBocWxTZXJ2aWNlIH0gZnJvbSAnLi8uLi9zZXJ2aWNlcy9ncmFwaHFsLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBHcmlkRXZlbnRTZXJ2aWNlIH0gZnJvbSAnLi8uLi9zZXJ2aWNlcy9ncmlkRXZlbnQuc2VydmljZSc7XHJcbmltcG9ydCB7IEdyaWRTZXJ2aWNlIH0gZnJvbSAnLi8uLi9zZXJ2aWNlcy9ncmlkLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBHcmlkU3RhdGVTZXJ2aWNlIH0gZnJvbSAnLi8uLi9zZXJ2aWNlcy9ncmlkU3RhdGUuc2VydmljZSc7XHJcbmltcG9ydCB7IEdyb3VwaW5nQW5kQ29sc3BhblNlcnZpY2UgfSBmcm9tICcuLy4uL3NlcnZpY2VzL2dyb3VwaW5nQW5kQ29sc3Bhbi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgUmVzaXplclNlcnZpY2UgfSBmcm9tICcuLy4uL3NlcnZpY2VzL3Jlc2l6ZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IFNoYXJlZFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9zaGFyZWQuc2VydmljZSc7XHJcbmltcG9ydCB7IFNvcnRTZXJ2aWNlIH0gZnJvbSAnLi8uLi9zZXJ2aWNlcy9zb3J0LnNlcnZpY2UnO1xyXG5cclxuLy8gRXh0ZW5zaW9ucyAoU2xpY2tHcmlkIENvbnRyb2xzICYgUGx1Z2lucylcclxuaW1wb3J0IHsgQXV0b1Rvb2x0aXBFeHRlbnNpb24gfSBmcm9tICcuLi9leHRlbnNpb25zL2F1dG9Ub29sdGlwRXh0ZW5zaW9uJztcclxuaW1wb3J0IHsgQ2VsbEV4dGVybmFsQ29weU1hbmFnZXJFeHRlbnNpb24gfSBmcm9tICcuLi9leHRlbnNpb25zL2NlbGxFeHRlcm5hbENvcHlNYW5hZ2VyRXh0ZW5zaW9uJztcclxuaW1wb3J0IHsgQ2hlY2tib3hTZWxlY3RvckV4dGVuc2lvbiB9IGZyb20gJy4uL2V4dGVuc2lvbnMvY2hlY2tib3hTZWxlY3RvckV4dGVuc2lvbic7XHJcbmltcG9ydCB7IENvbHVtblBpY2tlckV4dGVuc2lvbiB9IGZyb20gJy4uL2V4dGVuc2lvbnMvY29sdW1uUGlja2VyRXh0ZW5zaW9uJztcclxuaW1wb3J0IHsgRHJhZ2dhYmxlR3JvdXBpbmdFeHRlbnNpb24gfSBmcm9tICcuLi9leHRlbnNpb25zL2RyYWdnYWJsZUdyb3VwaW5nRXh0ZW5zaW9uJztcclxuaW1wb3J0IHsgR3JpZE1lbnVFeHRlbnNpb24gfSBmcm9tICcuLi9leHRlbnNpb25zL2dyaWRNZW51RXh0ZW5zaW9uJztcclxuaW1wb3J0IHsgR3JvdXBJdGVtTWV0YVByb3ZpZGVyRXh0ZW5zaW9uIH0gZnJvbSAnLi4vZXh0ZW5zaW9ucy9ncm91cEl0ZW1NZXRhUHJvdmlkZXJFeHRlbnNpb24nO1xyXG5pbXBvcnQgeyBIZWFkZXJCdXR0b25FeHRlbnNpb24gfSBmcm9tICcuLi9leHRlbnNpb25zL2hlYWRlckJ1dHRvbkV4dGVuc2lvbic7XHJcbmltcG9ydCB7IEhlYWRlck1lbnVFeHRlbnNpb24gfSBmcm9tICcuLi9leHRlbnNpb25zL2hlYWRlck1lbnVFeHRlbnNpb24nO1xyXG5pbXBvcnQgeyBSb3dEZXRhaWxWaWV3RXh0ZW5zaW9uIH0gZnJvbSAnLi4vZXh0ZW5zaW9ucy9yb3dEZXRhaWxWaWV3RXh0ZW5zaW9uJztcclxuaW1wb3J0IHsgUm93TW92ZU1hbmFnZXJFeHRlbnNpb24gfSBmcm9tICcuLi9leHRlbnNpb25zL3Jvd01vdmVNYW5hZ2VyRXh0ZW5zaW9uJztcclxuaW1wb3J0IHsgUm93U2VsZWN0aW9uRXh0ZW5zaW9uIH0gZnJvbSAnLi4vZXh0ZW5zaW9ucy9yb3dTZWxlY3Rpb25FeHRlbnNpb24nO1xyXG5cclxuLy8gdXNpbmcgZXh0ZXJuYWwgbm9uLXR5cGVkIGpzIGxpYnJhcmllc1xyXG5kZWNsYXJlIHZhciBTbGljazogYW55O1xyXG5kZWNsYXJlIHZhciAkOiBhbnk7XHJcblxyXG5jb25zdCBzbGlja2dyaWRFdmVudFByZWZpeCA9ICdzZyc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYW5ndWxhci1zbGlja2dyaWQnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9hbmd1bGFyLXNsaWNrZ3JpZC5jb21wb25lbnQuaHRtbCcsXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICAvLyBtYWtlIGV2ZXJ5dGhpbmcgdHJhbnNpZW50IChub24tc2luZ2xldG9uKVxyXG4gICAgQW5ndWxhclV0aWxTZXJ2aWNlLFxyXG4gICAgQXV0b1Rvb2x0aXBFeHRlbnNpb24sXHJcbiAgICBDZWxsRXh0ZXJuYWxDb3B5TWFuYWdlckV4dGVuc2lvbixcclxuICAgIENoZWNrYm94U2VsZWN0b3JFeHRlbnNpb24sXHJcbiAgICBDb2x1bW5QaWNrZXJFeHRlbnNpb24sXHJcbiAgICBEcmFnZ2FibGVHcm91cGluZ0V4dGVuc2lvbixcclxuICAgIEV4dGVuc2lvblNlcnZpY2UsXHJcbiAgICBFeHBvcnRTZXJ2aWNlLFxyXG4gICAgRXh0ZW5zaW9uVXRpbGl0eSxcclxuICAgIEZpbHRlckZhY3RvcnksXHJcbiAgICBGaWx0ZXJTZXJ2aWNlLFxyXG4gICAgR3JhcGhxbFNlcnZpY2UsXHJcbiAgICBHcmlkRXZlbnRTZXJ2aWNlLFxyXG4gICAgR3JpZE1lbnVFeHRlbnNpb24sXHJcbiAgICBHcmlkU2VydmljZSxcclxuICAgIEdyaWRTdGF0ZVNlcnZpY2UsXHJcbiAgICBHcm91cGluZ0FuZENvbHNwYW5TZXJ2aWNlLFxyXG4gICAgR3JvdXBJdGVtTWV0YVByb3ZpZGVyRXh0ZW5zaW9uLFxyXG4gICAgSGVhZGVyQnV0dG9uRXh0ZW5zaW9uLFxyXG4gICAgSGVhZGVyTWVudUV4dGVuc2lvbixcclxuICAgIFJlc2l6ZXJTZXJ2aWNlLFxyXG4gICAgUm93RGV0YWlsVmlld0V4dGVuc2lvbixcclxuICAgIFJvd01vdmVNYW5hZ2VyRXh0ZW5zaW9uLFxyXG4gICAgUm93U2VsZWN0aW9uRXh0ZW5zaW9uLFxyXG4gICAgU2hhcmVkU2VydmljZSxcclxuICAgIFNvcnRTZXJ2aWNlLFxyXG4gICAgU2xpY2tncmlkQ29uZmlnXHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQW5ndWxhclNsaWNrZ3JpZENvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSwgT25Jbml0IHtcclxuICBwcml2YXRlIF9kYXRhc2V0OiBhbnlbXTtcclxuICBwcml2YXRlIF9jb2x1bW5EZWZpbml0aW9uczogQ29sdW1uW107XHJcbiAgcHJpdmF0ZSBfZXZlbnRIYW5kbGVyOiBhbnkgPSBuZXcgU2xpY2suRXZlbnRIYW5kbGVyKCk7XHJcbiAgcHJpdmF0ZSBfZml4ZWRIZWlnaHQ6IG51bWJlciB8IG51bGw7XHJcbiAgcHJpdmF0ZSBfZml4ZWRXaWR0aDogbnVtYmVyIHwgbnVsbDtcclxuICBwcml2YXRlIF9oaWRlSGVhZGVyUm93QWZ0ZXJQYWdlTG9hZCA9IGZhbHNlO1xyXG4gIGRhdGFWaWV3OiBhbnk7XHJcbiAgZ3JpZDogYW55O1xyXG4gIGdyaWRQYWdpbmF0aW9uT3B0aW9uczogR3JpZE9wdGlvbjtcclxuICBncmlkSGVpZ2h0U3RyaW5nOiBzdHJpbmc7XHJcbiAgZ3JpZFdpZHRoU3RyaW5nOiBzdHJpbmc7XHJcbiAgZ3JvdXBpbmdEZWZpbml0aW9uOiBhbnkgPSB7fTtcclxuICBncm91cEl0ZW1NZXRhZGF0YVByb3ZpZGVyOiBhbnk7XHJcbiAgc2hvd1BhZ2luYXRpb24gPSBmYWxzZTtcclxuICBpc0dyaWRJbml0aWFsaXplZCA9IGZhbHNlO1xyXG4gIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XHJcblxyXG4gIEBPdXRwdXQoKSBvbkFuZ3VsYXJHcmlkQ3JlYXRlZCA9IG5ldyBFdmVudEVtaXR0ZXI8QW5ndWxhckdyaWRJbnN0YW5jZT4oKTtcclxuICBAT3V0cHV0KCkgb25EYXRhdmlld0NyZWF0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICBAT3V0cHV0KCkgb25HcmlkQ3JlYXRlZCA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gIEBPdXRwdXQoKSBvbkdyaWRJbml0aWFsaXplZCA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gIEBPdXRwdXQoKSBvbkJlZm9yZUdyaWRDcmVhdGUgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XHJcbiAgQE91dHB1dCgpIG9uQmVmb3JlR3JpZERlc3Ryb3kgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICBAT3V0cHV0KCkgb25BZnRlckdyaWREZXN0cm95ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XHJcbiAgQE91dHB1dCgpIG9uR3JpZFN0YXRlQ2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXI8R3JpZFN0YXRlQ2hhbmdlPigpO1xyXG4gIEBJbnB1dCgpIGN1c3RvbURhdGFWaWV3OiBhbnk7XHJcbiAgQElucHV0KCkgZ3JpZElkOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgZ3JpZE9wdGlvbnM6IEdyaWRPcHRpb247XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IGdyaWRIZWlnaHQoaGVpZ2h0OiBudW1iZXIpIHtcclxuICAgIHRoaXMuX2ZpeGVkSGVpZ2h0ID0gaGVpZ2h0O1xyXG4gIH1cclxuICBASW5wdXQoKVxyXG4gIHNldCBncmlkV2lkdGgod2lkdGg6IG51bWJlcikge1xyXG4gICAgdGhpcy5fZml4ZWRXaWR0aCA9IHdpZHRoO1xyXG4gIH1cclxuXHJcbiAgQElucHV0KClcclxuICBzZXQgY29sdW1uRGVmaW5pdGlvbnMoY29sdW1uRGVmaW5pdGlvbnM6IENvbHVtbltdKSB7XHJcbiAgICB0aGlzLl9jb2x1bW5EZWZpbml0aW9ucyA9IGNvbHVtbkRlZmluaXRpb25zO1xyXG4gICAgaWYgKHRoaXMuaXNHcmlkSW5pdGlhbGl6ZWQpIHtcclxuICAgICAgdGhpcy51cGRhdGVDb2x1bW5EZWZpbml0aW9uc0xpc3QoY29sdW1uRGVmaW5pdGlvbnMpO1xyXG4gICAgfVxyXG4gIH1cclxuICBnZXQgY29sdW1uRGVmaW5pdGlvbnMoKTogQ29sdW1uW10ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2NvbHVtbkRlZmluaXRpb25zO1xyXG4gIH1cclxuICBASW5wdXQoKVxyXG4gIHNldCBkYXRhc2V0KGRhdGFzZXQ6IGFueVtdKSB7XHJcbiAgICB0aGlzLl9kYXRhc2V0ID0gZGF0YXNldDtcclxuICAgIHRoaXMucmVmcmVzaEdyaWREYXRhKGRhdGFzZXQpO1xyXG4gIH1cclxuICBnZXQgZGF0YXNldCgpOiBhbnlbXSB7XHJcbiAgICByZXR1cm4gdGhpcy5kYXRhVmlldy5nZXRJdGVtcygpO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGVsbTogRWxlbWVudFJlZixcclxuICAgIHByaXZhdGUgZXhwb3J0U2VydmljZTogRXhwb3J0U2VydmljZSxcclxuICAgIHByaXZhdGUgZXh0ZW5zaW9uU2VydmljZTogRXh0ZW5zaW9uU2VydmljZSxcclxuICAgIHByaXZhdGUgZXh0ZW5zaW9uVXRpbGl0eTogRXh0ZW5zaW9uVXRpbGl0eSxcclxuICAgIHByaXZhdGUgZmlsdGVyU2VydmljZTogRmlsdGVyU2VydmljZSxcclxuICAgIHByaXZhdGUgZ3JpZFNlcnZpY2U6IEdyaWRTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBncmlkRXZlbnRTZXJ2aWNlOiBHcmlkRXZlbnRTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBncmlkU3RhdGVTZXJ2aWNlOiBHcmlkU3RhdGVTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBncm91cGluZ0FuZENvbHNwYW5TZXJ2aWNlOiBHcm91cGluZ0FuZENvbHNwYW5TZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSByZXNpemVyOiBSZXNpemVyU2VydmljZSxcclxuICAgIHByaXZhdGUgc2hhcmVkU2VydmljZTogU2hhcmVkU2VydmljZSxcclxuICAgIHByaXZhdGUgc29ydFNlcnZpY2U6IFNvcnRTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSB0cmFuc2xhdGU6IFRyYW5zbGF0ZVNlcnZpY2UsXHJcbiAgICBASW5qZWN0KCdjb25maWcnKSBwcml2YXRlIGZvclJvb3RDb25maWc6IEdyaWRPcHRpb25cclxuICApIHsgfVxyXG5cclxuICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIHRoaXMub25CZWZvcmVHcmlkQ3JlYXRlLmVtaXQodHJ1ZSk7XHJcblxyXG4gICAgaWYgKHRoaXMuZ3JpZE9wdGlvbnMgJiYgIXRoaXMuZ3JpZE9wdGlvbnMuZW5hYmxlQXV0b1Jlc2l6ZSAmJiAodGhpcy5fZml4ZWRIZWlnaHQgfHwgdGhpcy5fZml4ZWRXaWR0aCkpIHtcclxuICAgICAgdGhpcy5ncmlkSGVpZ2h0U3RyaW5nID0gYCR7dGhpcy5fZml4ZWRIZWlnaHR9cHhgO1xyXG4gICAgICB0aGlzLmdyaWRXaWR0aFN0cmluZyA9IGAke3RoaXMuX2ZpeGVkV2lkdGh9cHhgO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICB0aGlzLm9uQmVmb3JlR3JpZERlc3Ryb3kuZW1pdCh0aGlzLmdyaWQpO1xyXG4gICAgdGhpcy5kZXN0cm95KCk7XHJcbiAgICB0aGlzLm9uQWZ0ZXJHcmlkRGVzdHJveWVkLmVtaXQodHJ1ZSk7XHJcbiAgfVxyXG5cclxuICBkZXN0cm95KGVtcHR5RG9tRWxlbWVudENvbnRhaW5lciA9IGZhbHNlKSB7XHJcbiAgICBjb25zdCBncmlkQ29udGFpbmVySWQgPSB0aGlzLmdyaWRPcHRpb25zICYmIHRoaXMuZ3JpZE9wdGlvbnMuZ3JpZENvbnRhaW5lcklkO1xyXG4gICAgdGhpcy5kYXRhVmlldyA9IHVuZGVmaW5lZDtcclxuICAgIHRoaXMuZ3JpZE9wdGlvbnMgPSB7fTtcclxuICAgIHRoaXMuZXh0ZW5zaW9uU2VydmljZS5kaXNwb3NlKCk7XHJcbiAgICB0aGlzLmZpbHRlclNlcnZpY2UuZGlzcG9zZSgpO1xyXG4gICAgdGhpcy5ncmlkRXZlbnRTZXJ2aWNlLmRpc3Bvc2UoKTtcclxuICAgIHRoaXMuZ3JpZFN0YXRlU2VydmljZS5kaXNwb3NlKCk7XHJcbiAgICB0aGlzLmdyb3VwaW5nQW5kQ29sc3BhblNlcnZpY2UuZGlzcG9zZSgpO1xyXG4gICAgdGhpcy5yZXNpemVyLmRpc3Bvc2UoKTtcclxuICAgIHRoaXMuc29ydFNlcnZpY2UuZGlzcG9zZSgpO1xyXG4gICAgaWYgKHRoaXMuX2V2ZW50SGFuZGxlciAmJiB0aGlzLl9ldmVudEhhbmRsZXIudW5zdWJzY3JpYmVBbGwpIHtcclxuICAgICAgdGhpcy5fZXZlbnRIYW5kbGVyLnVuc3Vic2NyaWJlQWxsKCk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5ncmlkICYmIHRoaXMuZ3JpZC5kZXN0cm95KSB7XHJcbiAgICAgIHRoaXMuZ3JpZC5kZXN0cm95KCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGVtcHR5RG9tRWxlbWVudENvbnRhaW5lcikge1xyXG4gICAgICAkKGdyaWRDb250YWluZXJJZCkuZW1wdHkoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBhbHNvIHVuc3Vic2NyaWJlIGFsbCBSeEpTIHN1YnNjcmlwdGlvbnNcclxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucyA9IHVuc3Vic2NyaWJlQWxsT2JzZXJ2YWJsZXModGhpcy5zdWJzY3JpcHRpb25zKTtcclxuICB9XHJcblxyXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgIHRoaXMuaW5pdGlhbGl6YXRpb24oKTtcclxuICAgIHRoaXMuaXNHcmlkSW5pdGlhbGl6ZWQgPSB0cnVlO1xyXG5cclxuICAgIC8vIHVzZXIgbXVzdCBwcm92aWRlIGEgXCJncmlkSGVpZ2h0XCIgb3IgdXNlIFwiYXV0b1Jlc2l6ZTogdHJ1ZVwiIGluIHRoZSBncmlkIG9wdGlvbnNcclxuICAgIGlmICghdGhpcy5fZml4ZWRIZWlnaHQgJiYgIXRoaXMuZ3JpZE9wdGlvbnMuZW5hYmxlQXV0b1Jlc2l6ZSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXHJcbiAgICAgICAgYFtBbmd1bGFyLVNsaWNrZ3JpZF0gcmVxdWlyZXMgYSBcImdyaWQtaGVpZ2h0XCIgb3IgdGhlIFwiZW5hYmxlQXV0b1Jlc2l6ZVwiIGdyaWQgb3B0aW9uIHRvIGJlIGVuYWJsZWQuXHJcbiAgICAgICAgV2l0aG91dCB0aGF0IHRoZSBncmlkIHdpbGwgc2VlbSBlbXB0eSB3aGlsZSBpbiBmYWN0IGl0IGp1c3QgZG9lcyBub3QgaGF2ZSBhbnkgaGVpZ2h0IGRlZmluZS5gXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpbml0aWFsaXphdGlvbigpIHtcclxuICAgIC8vIG1ha2Ugc3VyZSB0aGUgZGF0YXNldCBpcyBpbml0aWFsaXplZCAoaWYgbm90IGl0IHdpbGwgdGhyb3cgYW4gZXJyb3IgdGhhdCBpdCBjYW5ub3QgZ2V0TGVuZ3RoIG9mIG51bGwpXHJcbiAgICB0aGlzLl9kYXRhc2V0ID0gdGhpcy5fZGF0YXNldCB8fCBbXTtcclxuICAgIHRoaXMuZ3JpZE9wdGlvbnMgPSB0aGlzLm1lcmdlR3JpZE9wdGlvbnModGhpcy5ncmlkT3B0aW9ucyk7XHJcbiAgICB0aGlzLmNyZWF0ZUJhY2tlbmRBcGlJbnRlcm5hbFBvc3RQcm9jZXNzQ2FsbGJhY2sodGhpcy5ncmlkT3B0aW9ucyk7XHJcblxyXG4gICAgaWYgKCF0aGlzLmN1c3RvbURhdGFWaWV3KSB7XHJcbiAgICAgIGlmICh0aGlzLmdyaWRPcHRpb25zLmRyYWdnYWJsZUdyb3VwaW5nIHx8IHRoaXMuZ3JpZE9wdGlvbnMuZW5hYmxlR3JvdXBpbmcpIHtcclxuICAgICAgICB0aGlzLmV4dGVuc2lvblV0aWxpdHkubG9hZEV4dGVuc2lvbkR5bmFtaWNhbGx5KEV4dGVuc2lvbk5hbWUuZ3JvdXBJdGVtTWV0YVByb3ZpZGVyKTtcclxuICAgICAgICB0aGlzLmdyb3VwSXRlbU1ldGFkYXRhUHJvdmlkZXIgPSBuZXcgU2xpY2suRGF0YS5Hcm91cEl0ZW1NZXRhZGF0YVByb3ZpZGVyKCk7XHJcbiAgICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyb3VwSXRlbU1ldGFkYXRhUHJvdmlkZXIgPSB0aGlzLmdyb3VwSXRlbU1ldGFkYXRhUHJvdmlkZXI7XHJcbiAgICAgICAgdGhpcy5kYXRhVmlldyA9IG5ldyBTbGljay5EYXRhLkRhdGFWaWV3KHsgZ3JvdXBJdGVtTWV0YWRhdGFQcm92aWRlcjogdGhpcy5ncm91cEl0ZW1NZXRhZGF0YVByb3ZpZGVyIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuZGF0YVZpZXcgPSBuZXcgU2xpY2suRGF0YS5EYXRhVmlldygpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZm9yIGNvbnZlbmllbmNlIHRvIHRoZSB1c2VyLCB3ZSBwcm92aWRlIHRoZSBwcm9wZXJ0eSBcImVkaXRvclwiIGFzIGFuIEFuZ3VsYXItU2xpY2tncmlkIGVkaXRvciBjb21wbGV4IG9iamVjdFxyXG4gICAgLy8gaG93ZXZlciBcImVkaXRvclwiIGlzIHVzZWQgaW50ZXJuYWxseSBieSBTbGlja0dyaWQgZm9yIGl0J3Mgb3duIEVkaXRvciBGYWN0b3J5XHJcbiAgICAvLyBzbyBpbiBvdXIgbGliIHdlIHdpbGwgc3dhcCBcImVkaXRvclwiIGFuZCBjb3B5IGl0IGludG8gYSBuZXcgcHJvcGVydHkgY2FsbGVkIFwiaW50ZXJuYWxDb2x1bW5FZGl0b3JcIlxyXG4gICAgLy8gdGhlbiB0YWtlIGJhY2sgXCJlZGl0b3IubW9kZWxcIiBhbmQgbWFrZSBpdCB0aGUgbmV3IFwiZWRpdG9yXCIgc28gdGhhdCBTbGlja0dyaWQgRWRpdG9yIEZhY3Rvcnkgc3RpbGwgd29ya3NcclxuICAgIHRoaXMuX2NvbHVtbkRlZmluaXRpb25zID0gdGhpcy5zd2FwSW50ZXJuYWxFZGl0b3JUb1NsaWNrR3JpZEZhY3RvcnlFZGl0b3IodGhpcy5fY29sdW1uRGVmaW5pdGlvbnMpO1xyXG5cclxuICAgIC8vIHNhdmUgcmVmZXJlbmNlIGZvciBhbGwgY29sdW1ucyBiZWZvcmUgdGhleSBvcHRpb25hbGx5IGJlY29tZSBoaWRkZW4vdmlzaWJsZVxyXG4gICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmFsbENvbHVtbnMgPSB0aGlzLl9jb2x1bW5EZWZpbml0aW9ucztcclxuICAgIHRoaXMuc2hhcmVkU2VydmljZS52aXNpYmxlQ29sdW1ucyA9IHRoaXMuX2NvbHVtbkRlZmluaXRpb25zO1xyXG4gICAgdGhpcy5leHRlbnNpb25TZXJ2aWNlLmNyZWF0ZUV4dGVuc2lvbnNCZWZvcmVHcmlkQ3JlYXRpb24odGhpcy5fY29sdW1uRGVmaW5pdGlvbnMsIHRoaXMuZ3JpZE9wdGlvbnMpO1xyXG5cclxuICAgIC8vIGJ1aWxkIFNsaWNrR3JpZCBHcmlkLCBhbHNvIHVzZXIgbWlnaHQgb3B0aW9uYWxseSBwYXNzIGEgY3VzdG9tIGRhdGF2aWV3IChlLmcuIHJlbW90ZSBtb2RlbClcclxuICAgIHRoaXMuZ3JpZCA9IG5ldyBTbGljay5HcmlkKGAjJHt0aGlzLmdyaWRJZH1gLCB0aGlzLmN1c3RvbURhdGFWaWV3IHx8IHRoaXMuZGF0YVZpZXcsIHRoaXMuX2NvbHVtbkRlZmluaXRpb25zLCB0aGlzLmdyaWRPcHRpb25zKTtcclxuXHJcbiAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZGF0YVZpZXcgPSB0aGlzLmRhdGFWaWV3O1xyXG4gICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQgPSB0aGlzLmdyaWQ7XHJcblxyXG4gICAgdGhpcy5leHRlbnNpb25TZXJ2aWNlLmJpbmREaWZmZXJlbnRFeHRlbnNpb25zKCk7XHJcbiAgICB0aGlzLmF0dGFjaERpZmZlcmVudEhvb2tzKHRoaXMuZ3JpZCwgdGhpcy5ncmlkT3B0aW9ucywgdGhpcy5kYXRhVmlldyk7XHJcblxyXG4gICAgLy8gZW1pdCB0aGUgR3JpZCAmIERhdGFWaWV3IG9iamVjdCB0byBtYWtlIHRoZW0gYXZhaWxhYmxlIGluIHBhcmVudCBjb21wb25lbnRcclxuICAgIHRoaXMub25HcmlkQ3JlYXRlZC5lbWl0KHRoaXMuZ3JpZCk7XHJcblxyXG4gICAgLy8gaW5pdGlhbGl6ZSB0aGUgU2xpY2tHcmlkIGdyaWRcclxuICAgIHRoaXMuZ3JpZC5pbml0KCk7XHJcblxyXG4gICAgaWYgKCF0aGlzLmN1c3RvbURhdGFWaWV3ICYmICh0aGlzLmRhdGFWaWV3ICYmIHRoaXMuZGF0YVZpZXcuYmVnaW5VcGRhdGUgJiYgdGhpcy5kYXRhVmlldy5zZXRJdGVtcyAmJiB0aGlzLmRhdGFWaWV3LmVuZFVwZGF0ZSkpIHtcclxuICAgICAgdGhpcy5vbkRhdGF2aWV3Q3JlYXRlZC5lbWl0KHRoaXMuZGF0YVZpZXcpO1xyXG4gICAgICB0aGlzLmRhdGFWaWV3LmJlZ2luVXBkYXRlKCk7XHJcbiAgICAgIHRoaXMuZGF0YVZpZXcuc2V0SXRlbXModGhpcy5fZGF0YXNldCwgdGhpcy5ncmlkT3B0aW9ucy5kYXRhc2V0SWRQcm9wZXJ0eU5hbWUpO1xyXG4gICAgICB0aGlzLmRhdGFWaWV3LmVuZFVwZGF0ZSgpO1xyXG5cclxuICAgICAgLy8gaWYgeW91IGRvbid0IHdhbnQgdGhlIGl0ZW1zIHRoYXQgYXJlIG5vdCB2aXNpYmxlIChkdWUgdG8gYmVpbmcgZmlsdGVyZWQgb3V0IG9yIGJlaW5nIG9uIGEgZGlmZmVyZW50IHBhZ2UpXHJcbiAgICAgIC8vIHRvIHN0YXkgc2VsZWN0ZWQsIHBhc3MgJ2ZhbHNlJyB0byB0aGUgc2Vjb25kIGFyZ1xyXG4gICAgICBpZiAodGhpcy5ncmlkT3B0aW9ucyAmJiB0aGlzLmdyaWRPcHRpb25zLmRhdGFWaWV3ICYmIHRoaXMuZ3JpZE9wdGlvbnMuZGF0YVZpZXcuaGFzT3duUHJvcGVydHkoJ3N5bmNHcmlkU2VsZWN0aW9uJykpIHtcclxuICAgICAgICBjb25zdCBzeW5jR3JpZFNlbGVjdGlvbiA9IHRoaXMuZ3JpZE9wdGlvbnMuZGF0YVZpZXcuc3luY0dyaWRTZWxlY3Rpb247XHJcbiAgICAgICAgaWYgKHR5cGVvZiBzeW5jR3JpZFNlbGVjdGlvbiA9PT0gJ2Jvb2xlYW4nKSB7XHJcbiAgICAgICAgICB0aGlzLmRhdGFWaWV3LnN5bmNHcmlkU2VsZWN0aW9uKHRoaXMuZ3JpZCwgdGhpcy5ncmlkT3B0aW9ucy5kYXRhVmlldy5zeW5jR3JpZFNlbGVjdGlvbik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuZGF0YVZpZXcuc3luY0dyaWRTZWxlY3Rpb24odGhpcy5ncmlkLCBzeW5jR3JpZFNlbGVjdGlvbi5wcmVzZXJ2ZUhpZGRlbiwgc3luY0dyaWRTZWxlY3Rpb24ucHJlc2VydmVIaWRkZW5PblNlbGVjdGlvbkNoYW5nZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gdXNlciBtaWdodCB3YW50IHRvIGhpZGUgdGhlIGhlYWRlciByb3cgb24gcGFnZSBsb2FkIGJ1dCBzdGlsbCBoYXZlIGBlbmFibGVGaWx0ZXJpbmc6IHRydWVgXHJcbiAgICAvLyBpZiB0aGF0IGlzIHRoZSBjYXNlLCB3ZSBuZWVkIHRvIGhpZGUgdGhlIGhlYWRlclJvdyBPTkxZIEFGVEVSIGFsbCBmaWx0ZXJzIGdvdCBjcmVhdGVkICYgZGF0YVZpZXcgZXhpc3RcclxuICAgIGlmICh0aGlzLl9oaWRlSGVhZGVyUm93QWZ0ZXJQYWdlTG9hZCkge1xyXG4gICAgICB0aGlzLnNob3dIZWFkZXJSb3coZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGFmdGVyIHRoZSBEYXRhVmlldyBpcyBjcmVhdGVkICYgdXBkYXRlZCBleGVjdXRlIHNvbWUgcHJvY2Vzc2VzXHJcbiAgICB0aGlzLmV4ZWN1dGVBZnRlckRhdGF2aWV3Q3JlYXRlZCh0aGlzLmdyaWQsIHRoaXMuZ3JpZE9wdGlvbnMsIHRoaXMuZGF0YVZpZXcpO1xyXG5cclxuICAgIC8vIGF0dGFjaCByZXNpemUgT05MWSBhZnRlciB0aGUgZGF0YVZpZXcgaXMgcmVhZHlcclxuICAgIHRoaXMuYXR0YWNoUmVzaXplSG9vayh0aGlzLmdyaWQsIHRoaXMuZ3JpZE9wdGlvbnMpO1xyXG5cclxuICAgIC8vIGF0dGFjaCBncm91cGluZyBhbmQgaGVhZGVyIGdyb3VwaW5nIGNvbHNwYW4gc2VydmljZVxyXG4gICAgaWYgKHRoaXMuZ3JpZE9wdGlvbnMuY3JlYXRlUHJlSGVhZGVyUGFuZWwgJiYgIXRoaXMuZ3JpZE9wdGlvbnMuZW5hYmxlRHJhZ2dhYmxlR3JvdXBpbmcpIHtcclxuICAgICAgdGhpcy5ncm91cGluZ0FuZENvbHNwYW5TZXJ2aWNlLmluaXQodGhpcy5ncmlkLCB0aGlzLmRhdGFWaWV3KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBhdHRhY2ggZ3JpZCAgc2VydmljZVxyXG4gICAgdGhpcy5ncmlkU2VydmljZS5pbml0KHRoaXMuZ3JpZCwgdGhpcy5kYXRhVmlldyk7XHJcblxyXG4gICAgLy8gd2hlbiB1c2VyIGVuYWJsZXMgdHJhbnNsYXRpb24sIHdlIG5lZWQgdG8gdHJhbnNsYXRlIEhlYWRlcnMgb24gZmlyc3QgcGFzcyAmIHN1YnNlcXVlbnRseSBpbiB0aGUgYXR0YWNoRGlmZmVyZW50SG9va3NcclxuICAgIGlmICh0aGlzLmdyaWRPcHRpb25zLmVuYWJsZVRyYW5zbGF0ZSkge1xyXG4gICAgICB0aGlzLmV4dGVuc2lvblNlcnZpY2UudHJhbnNsYXRlQ29sdW1uSGVhZGVycygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGlmIEV4cG9ydCBpcyBlbmFibGVkLCBpbml0aWFsaXplIHRoZSBzZXJ2aWNlIHdpdGggdGhlIG5lY2Vzc2FyeSBncmlkIGFuZCBvdGhlciBvYmplY3RzXHJcbiAgICBpZiAodGhpcy5ncmlkT3B0aW9ucy5lbmFibGVFeHBvcnQpIHtcclxuICAgICAgdGhpcy5leHBvcnRTZXJ2aWNlLmluaXQodGhpcy5ncmlkLCB0aGlzLmRhdGFWaWV3KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBvbmNlIGFsbCBob29rcyBhcmUgaW4gcGxhY2VkIGFuZCB0aGUgZ3JpZCBpcyBpbml0aWFsaXplZCwgd2UgY2FuIGVtaXQgYW4gZXZlbnRcclxuICAgIHRoaXMub25HcmlkSW5pdGlhbGl6ZWQuZW1pdCh0aGlzLmdyaWQpO1xyXG5cclxuICAgIC8vIGF0dGFjaCB0aGUgQmFja2VuZCBTZXJ2aWNlIEFQSSBjYWxsYmFjayBmdW5jdGlvbnMgb25seSBhZnRlciB0aGUgZ3JpZCBpcyBpbml0aWFsaXplZFxyXG4gICAgLy8gYmVjYXVzZSB0aGUgcHJlUHJvY2VzcygpIGFuZCBvbkluaXQoKSBtaWdodCBnZXQgdHJpZ2dlcmVkXHJcbiAgICBpZiAodGhpcy5ncmlkT3B0aW9ucyAmJiB0aGlzLmdyaWRPcHRpb25zLmJhY2tlbmRTZXJ2aWNlQXBpKSB7XHJcbiAgICAgIHRoaXMuYXR0YWNoQmFja2VuZENhbGxiYWNrRnVuY3Rpb25zKHRoaXMuZ3JpZE9wdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZ3JpZFN0YXRlU2VydmljZS5pbml0KHRoaXMuZ3JpZCwgdGhpcy5leHRlbnNpb25TZXJ2aWNlLCB0aGlzLmZpbHRlclNlcnZpY2UsIHRoaXMuc29ydFNlcnZpY2UpO1xyXG5cclxuICAgIHRoaXMub25Bbmd1bGFyR3JpZENyZWF0ZWQuZW1pdCh7XHJcbiAgICAgIC8vIFNsaWNrIEdyaWQgJiBEYXRhVmlldyBvYmplY3RzXHJcbiAgICAgIGRhdGFWaWV3OiB0aGlzLmRhdGFWaWV3LFxyXG4gICAgICBzbGlja0dyaWQ6IHRoaXMuZ3JpZCxcclxuXHJcbiAgICAgIC8vIHB1YmxpYyBtZXRob2RzXHJcbiAgICAgIGRlc3Ryb3k6IHRoaXMuZGVzdHJveS5iaW5kKHRoaXMpLFxyXG5cclxuICAgICAgLy8gcmV0dXJuIGFsbCBhdmFpbGFibGUgU2VydmljZXMgKG5vbi1zaW5nbGV0b24pXHJcbiAgICAgIGJhY2tlbmRTZXJ2aWNlOiB0aGlzLmdyaWRPcHRpb25zICYmIHRoaXMuZ3JpZE9wdGlvbnMuYmFja2VuZFNlcnZpY2VBcGkgJiYgdGhpcy5ncmlkT3B0aW9ucy5iYWNrZW5kU2VydmljZUFwaS5zZXJ2aWNlLFxyXG4gICAgICBleHBvcnRTZXJ2aWNlOiB0aGlzLmV4cG9ydFNlcnZpY2UsXHJcbiAgICAgIGV4dGVuc2lvblNlcnZpY2U6IHRoaXMuZXh0ZW5zaW9uU2VydmljZSxcclxuICAgICAgZmlsdGVyU2VydmljZTogdGhpcy5maWx0ZXJTZXJ2aWNlLFxyXG4gICAgICBncmlkRXZlbnRTZXJ2aWNlOiB0aGlzLmdyaWRFdmVudFNlcnZpY2UsXHJcbiAgICAgIGdyaWRTdGF0ZVNlcnZpY2U6IHRoaXMuZ3JpZFN0YXRlU2VydmljZSxcclxuICAgICAgZ3JpZFNlcnZpY2U6IHRoaXMuZ3JpZFNlcnZpY2UsXHJcbiAgICAgIGdyb3VwaW5nU2VydmljZTogdGhpcy5ncm91cGluZ0FuZENvbHNwYW5TZXJ2aWNlLFxyXG4gICAgICByZXNpemVyU2VydmljZTogdGhpcy5yZXNpemVyLFxyXG4gICAgICBzb3J0U2VydmljZTogdGhpcy5zb3J0U2VydmljZSxcclxuXHJcbiAgICAgIC8qKiBAZGVwcmVjYXRlZCBwbGVhc2UgdXNlIFwiZXh0ZW5zaW9uU2VydmljZVwiIGluc3RlYWQgKi9cclxuICAgICAgcGx1Z2luU2VydmljZTogdGhpcy5leHRlbnNpb25TZXJ2aWNlLFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDb21taXRzIHRoZSBjdXJyZW50IGVkaXQgdG8gdGhlIGdyaWRcclxuICAgKi9cclxuICBjb21taXRFZGl0KHRhcmdldDogRWxlbWVudCkge1xyXG4gICAgaWYgKHRoaXMuZ3JpZC5nZXRPcHRpb25zKCkuYXV0b0NvbW1pdEVkaXQpIHtcclxuICAgICAgY29uc3QgYWN0aXZlTm9kZSA9IHRoaXMuZ3JpZC5nZXRBY3RpdmVDZWxsTm9kZSgpO1xyXG5cclxuICAgICAgLy8gYSB0aW1lb3V0IG11c3QgYmUgc2V0IG9yIHRoaXMgY291bGQgY29tZSBpbnRvIGNvbmZsaWN0IHdoZW4gc2xpY2tncmlkXHJcbiAgICAgIC8vIHRyaWVzIHRvIGNvbW1pdCB0aGUgZWRpdCB3aGVuIGdvaW5nIGZyb20gb25lIGVkaXRvciB0byBhbm90aGVyIG9uIHRoZSBncmlkXHJcbiAgICAgIC8vIHRocm91Z2ggdGhlIGNsaWNrIGV2ZW50LiBJZiB0aGUgdGltZW91dCB3YXMgbm90IGhlcmUgaXQgd291bGRcclxuICAgICAgLy8gdHJ5IHRvIGNvbW1pdC9kZXN0cm95IHRoZSBlZGl0b3IgdHdpY2UsIHdoaWNoIHdvdWxkIHRocm93IGEganF1ZXJ5XHJcbiAgICAgIC8vIGVycm9yIGFib3V0IHRoZSBlbGVtZW50IG5vdCBiZWluZyBpbiB0aGUgRE9NXHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIC8vIG1ha2Ugc3VyZSB0aGUgdGFyZ2V0IGlzIHRoZSBhY3RpdmUgZWRpdG9yIHNvIHdlIGRvIG5vdFxyXG4gICAgICAgIC8vIGNvbW1pdCBwcmVtYXR1cmVseVxyXG4gICAgICAgIGlmIChhY3RpdmVOb2RlICYmIGFjdGl2ZU5vZGUuY29udGFpbnModGFyZ2V0KSAmJiB0aGlzLmdyaWQuZ2V0RWRpdG9yTG9jaygpLmlzQWN0aXZlKCkpIHtcclxuICAgICAgICAgIHRoaXMuZ3JpZC5nZXRFZGl0b3JMb2NrKCkuY29tbWl0Q3VycmVudEVkaXQoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRGVmaW5lIG91ciBpbnRlcm5hbCBQb3N0IFByb2Nlc3MgY2FsbGJhY2ssIGl0IHdpbGwgZXhlY3V0ZSBpbnRlcm5hbGx5IGFmdGVyIHdlIGdldCBiYWNrIHJlc3VsdCBmcm9tIHRoZSBQcm9jZXNzIGJhY2tlbmQgY2FsbFxyXG4gICAqIEZvciBub3csIHRoaXMgaXMgR3JhcGhRTCBTZXJ2aWNlIE9OTFkgZmVhdHVyZSBhbmQgaXQgd2lsbCBiYXNpY2FsbHkgcmVmcmVzaCB0aGUgRGF0YXNldCAmIFBhZ2luYXRpb24gd2l0aG91dCBoYXZpbmcgdGhlIHVzZXIgdG8gY3JlYXRlIGhpcyBvd24gUG9zdFByb2Nlc3MgZXZlcnkgdGltZVxyXG4gICAqL1xyXG4gIGNyZWF0ZUJhY2tlbmRBcGlJbnRlcm5hbFBvc3RQcm9jZXNzQ2FsbGJhY2soZ3JpZE9wdGlvbnM6IEdyaWRPcHRpb24pIHtcclxuICAgIGlmIChncmlkT3B0aW9ucyAmJiBncmlkT3B0aW9ucy5iYWNrZW5kU2VydmljZUFwaSkge1xyXG4gICAgICBjb25zdCBiYWNrZW5kQXBpID0gZ3JpZE9wdGlvbnMuYmFja2VuZFNlcnZpY2VBcGk7XHJcblxyXG4gICAgICAvLyBpbnRlcm5hbFBvc3RQcm9jZXNzIG9ubHkgd29ya3Mgd2l0aCBhIEdyYXBoUUwgU2VydmljZSwgc28gbWFrZSBzdXJlIGl0IGlzIHRoYXQgdHlwZVxyXG4gICAgICBpZiAoYmFja2VuZEFwaSAmJiBiYWNrZW5kQXBpLnNlcnZpY2UgJiYgYmFja2VuZEFwaS5zZXJ2aWNlIGluc3RhbmNlb2YgR3JhcGhxbFNlcnZpY2UpIHtcclxuICAgICAgICBiYWNrZW5kQXBpLmludGVybmFsUG9zdFByb2Nlc3MgPSAocHJvY2Vzc1Jlc3VsdDogYW55KSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBkYXRhc2V0TmFtZSA9IChiYWNrZW5kQXBpICYmIGJhY2tlbmRBcGkuc2VydmljZSAmJiB0eXBlb2YgYmFja2VuZEFwaS5zZXJ2aWNlLmdldERhdGFzZXROYW1lID09PSAnZnVuY3Rpb24nKSA/IGJhY2tlbmRBcGkuc2VydmljZS5nZXREYXRhc2V0TmFtZSgpIDogJyc7XHJcbiAgICAgICAgICBpZiAocHJvY2Vzc1Jlc3VsdCAmJiBwcm9jZXNzUmVzdWx0LmRhdGEgJiYgcHJvY2Vzc1Jlc3VsdC5kYXRhW2RhdGFzZXROYW1lXSkge1xyXG4gICAgICAgICAgICB0aGlzLl9kYXRhc2V0ID0gcHJvY2Vzc1Jlc3VsdC5kYXRhW2RhdGFzZXROYW1lXS5ub2RlcztcclxuICAgICAgICAgICAgdGhpcy5yZWZyZXNoR3JpZERhdGEodGhpcy5fZGF0YXNldCwgcHJvY2Vzc1Jlc3VsdC5kYXRhW2RhdGFzZXROYW1lXS50b3RhbENvdW50KTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2RhdGFzZXQgPSBbXTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhdHRhY2hEaWZmZXJlbnRIb29rcyhncmlkOiBhbnksIGdyaWRPcHRpb25zOiBHcmlkT3B0aW9uLCBkYXRhVmlldzogYW55KSB7XHJcbiAgICAvLyBvbiBsb2NhbGUgY2hhbmdlLCB3ZSBoYXZlIHRvIG1hbnVhbGx5IHRyYW5zbGF0ZSB0aGUgSGVhZGVycywgR3JpZE1lbnVcclxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxyXG4gICAgICB0aGlzLnRyYW5zbGF0ZS5vbkxhbmdDaGFuZ2Uuc3Vic2NyaWJlKChldmVudCkgPT4ge1xyXG4gICAgICAgIGlmIChncmlkT3B0aW9ucy5lbmFibGVUcmFuc2xhdGUpIHtcclxuICAgICAgICAgIHRoaXMuZXh0ZW5zaW9uU2VydmljZS50cmFuc2xhdGVDb2x1bW5IZWFkZXJzKCk7XHJcbiAgICAgICAgICB0aGlzLmV4dGVuc2lvblNlcnZpY2UudHJhbnNsYXRlQ29sdW1uUGlja2VyKCk7XHJcbiAgICAgICAgICB0aGlzLmV4dGVuc2lvblNlcnZpY2UudHJhbnNsYXRlR3JpZE1lbnUoKTtcclxuICAgICAgICAgIHRoaXMuZXh0ZW5zaW9uU2VydmljZS50cmFuc2xhdGVIZWFkZXJNZW51KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgKTtcclxuXHJcbiAgICAvLyBpZiB1c2VyIGVudGVyZWQgc29tZSBDb2x1bW5zIFwicHJlc2V0c1wiLCB3ZSBuZWVkIHRvIHJlZmxlY3QgdGhlbSBhbGwgaW4gdGhlIGdyaWRcclxuICAgIGlmIChncmlkT3B0aW9ucy5wcmVzZXRzICYmIEFycmF5LmlzQXJyYXkoZ3JpZE9wdGlvbnMucHJlc2V0cy5jb2x1bW5zKSAmJiBncmlkT3B0aW9ucy5wcmVzZXRzLmNvbHVtbnMubGVuZ3RoID4gMCkge1xyXG4gICAgICBjb25zdCBncmlkQ29sdW1uczogQ29sdW1uW10gPSB0aGlzLmdyaWRTdGF0ZVNlcnZpY2UuZ2V0QXNzb2NpYXRlZEdyaWRDb2x1bW5zKGdyaWQsIGdyaWRPcHRpb25zLnByZXNldHMuY29sdW1ucyk7XHJcbiAgICAgIGlmIChncmlkQ29sdW1ucyAmJiBBcnJheS5pc0FycmF5KGdyaWRDb2x1bW5zKSAmJiBncmlkQ29sdW1ucy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgLy8gbWFrZSBzdXJlIHRoYXQgdGhlIGNoZWNrYm94IHNlbGVjdG9yIGlzIGFsc28gdmlzaWJsZSBpZiBpdCBpcyBlbmFibGVkXHJcbiAgICAgICAgaWYgKGdyaWRPcHRpb25zLmVuYWJsZUNoZWNrYm94U2VsZWN0b3IpIHtcclxuICAgICAgICAgIGNvbnN0IGNoZWNrYm94Q29sdW1uID0gKEFycmF5LmlzQXJyYXkodGhpcy5fY29sdW1uRGVmaW5pdGlvbnMpICYmIHRoaXMuX2NvbHVtbkRlZmluaXRpb25zLmxlbmd0aCA+IDApID8gdGhpcy5fY29sdW1uRGVmaW5pdGlvbnNbMF0gOiBudWxsO1xyXG4gICAgICAgICAgaWYgKGNoZWNrYm94Q29sdW1uICYmIGNoZWNrYm94Q29sdW1uLmlkID09PSAnX2NoZWNrYm94X3NlbGVjdG9yJyAmJiBncmlkQ29sdW1uc1swXS5pZCAhPT0gJ19jaGVja2JveF9zZWxlY3RvcicpIHtcclxuICAgICAgICAgICAgZ3JpZENvbHVtbnMudW5zaGlmdChjaGVja2JveENvbHVtbik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBmaW5hbGx5IHNldCB0aGUgbmV3IHByZXNldHMgY29sdW1ucyAoaW5jbHVkaW5nIGNoZWNrYm94IHNlbGVjdG9yIGlmIG5lZWQgYmUpXHJcbiAgICAgICAgZ3JpZC5zZXRDb2x1bW5zKGdyaWRDb2x1bW5zKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGF0dGFjaCBleHRlcm5hbCBzb3J0aW5nIChiYWNrZW5kKSB3aGVuIGF2YWlsYWJsZSBvciBkZWZhdWx0IG9uU29ydCAoZGF0YVZpZXcpXHJcbiAgICBpZiAoZ3JpZE9wdGlvbnMuZW5hYmxlU29ydGluZyAmJiAhdGhpcy5jdXN0b21EYXRhVmlldykge1xyXG4gICAgICBncmlkT3B0aW9ucy5iYWNrZW5kU2VydmljZUFwaSA/IHRoaXMuc29ydFNlcnZpY2UuYXR0YWNoQmFja2VuZE9uU29ydChncmlkLCBkYXRhVmlldykgOiB0aGlzLnNvcnRTZXJ2aWNlLmF0dGFjaExvY2FsT25Tb3J0KGdyaWQsIGRhdGFWaWV3KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBhdHRhY2ggZXh0ZXJuYWwgZmlsdGVyIChiYWNrZW5kKSB3aGVuIGF2YWlsYWJsZSBvciBkZWZhdWx0IG9uRmlsdGVyIChkYXRhVmlldylcclxuICAgIGlmIChncmlkT3B0aW9ucy5lbmFibGVGaWx0ZXJpbmcgJiYgIXRoaXMuY3VzdG9tRGF0YVZpZXcpIHtcclxuICAgICAgdGhpcy5maWx0ZXJTZXJ2aWNlLmluaXQoZ3JpZCk7XHJcblxyXG4gICAgICAvLyBpZiB1c2VyIGVudGVyZWQgc29tZSBGaWx0ZXIgXCJwcmVzZXRzXCIsIHdlIG5lZWQgdG8gcmVmbGVjdCB0aGVtIGFsbCBpbiB0aGUgRE9NXHJcbiAgICAgIGlmIChncmlkT3B0aW9ucy5wcmVzZXRzICYmIEFycmF5LmlzQXJyYXkoZ3JpZE9wdGlvbnMucHJlc2V0cy5maWx0ZXJzKSAmJiBncmlkT3B0aW9ucy5wcmVzZXRzLmZpbHRlcnMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIHRoaXMuZmlsdGVyU2VydmljZS5wb3B1bGF0ZUNvbHVtbkZpbHRlclNlYXJjaFRlcm1zKCk7XHJcbiAgICAgIH1cclxuICAgICAgZ3JpZE9wdGlvbnMuYmFja2VuZFNlcnZpY2VBcGkgPyB0aGlzLmZpbHRlclNlcnZpY2UuYXR0YWNoQmFja2VuZE9uRmlsdGVyKGdyaWQsIHRoaXMuZGF0YVZpZXcpIDogdGhpcy5maWx0ZXJTZXJ2aWNlLmF0dGFjaExvY2FsT25GaWx0ZXIoZ3JpZCwgdGhpcy5kYXRhVmlldyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gaWYgdXNlciBzZXQgYW4gb25Jbml0IEJhY2tlbmQsIHdlJ2xsIHJ1biBpdCByaWdodCBhd2F5IChhbmQgaWYgc28sIHdlIGFsc28gbmVlZCB0byBydW4gcHJlUHJvY2VzcywgaW50ZXJuYWxQb3N0UHJvY2VzcyAmIHBvc3RQcm9jZXNzKVxyXG4gICAgaWYgKGdyaWRPcHRpb25zLmJhY2tlbmRTZXJ2aWNlQXBpKSB7XHJcbiAgICAgIGNvbnN0IGJhY2tlbmRBcGkgPSBncmlkT3B0aW9ucy5iYWNrZW5kU2VydmljZUFwaTtcclxuXHJcbiAgICAgIGlmIChiYWNrZW5kQXBpICYmIGJhY2tlbmRBcGkuc2VydmljZSAmJiBiYWNrZW5kQXBpLnNlcnZpY2UuaW5pdCkge1xyXG4gICAgICAgIGJhY2tlbmRBcGkuc2VydmljZS5pbml0KGJhY2tlbmRBcGkub3B0aW9ucywgZ3JpZE9wdGlvbnMucGFnaW5hdGlvbiwgdGhpcy5ncmlkKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGV4cG9zZSBhbGwgU2xpY2sgR3JpZCBFdmVudHMgdGhyb3VnaCBkaXNwYXRjaFxyXG4gICAgZm9yIChjb25zdCBwcm9wIGluIGdyaWQpIHtcclxuICAgICAgaWYgKGdyaWQuaGFzT3duUHJvcGVydHkocHJvcCkgJiYgcHJvcC5zdGFydHNXaXRoKCdvbicpKSB7XHJcbiAgICAgICAgdGhpcy5fZXZlbnRIYW5kbGVyLnN1YnNjcmliZShncmlkW3Byb3BdLCAoZTogYW55LCBhcmdzOiBhbnkpID0+IHtcclxuICAgICAgICAgIHJldHVybiB0aGlzLmRpc3BhdGNoQ3VzdG9tRXZlbnQoYCR7c2xpY2tncmlkRXZlbnRQcmVmaXh9JHt0aXRsZUNhc2UocHJvcCl9YCwgeyBldmVudERhdGE6IGUsIGFyZ3MgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBleHBvc2UgYWxsIFNsaWNrIERhdGFWaWV3IEV2ZW50cyB0aHJvdWdoIGRpc3BhdGNoXHJcbiAgICBmb3IgKGNvbnN0IHByb3AgaW4gZGF0YVZpZXcpIHtcclxuICAgICAgaWYgKGRhdGFWaWV3Lmhhc093blByb3BlcnR5KHByb3ApICYmIHByb3Auc3RhcnRzV2l0aCgnb24nKSkge1xyXG4gICAgICAgIHRoaXMuX2V2ZW50SGFuZGxlci5zdWJzY3JpYmUoZGF0YVZpZXdbcHJvcF0sIChlOiBhbnksIGFyZ3M6IGFueSkgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXMuZGlzcGF0Y2hDdXN0b21FdmVudChgJHtzbGlja2dyaWRFdmVudFByZWZpeH0ke3RpdGxlQ2FzZShwcm9wKX1gLCB7IGV2ZW50RGF0YTogZSwgYXJncyB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGV4cG9zZSBHcmlkU3RhdGUgU2VydmljZSBjaGFuZ2VzIGV2ZW50IHRocm91Z2ggZGlzcGF0Y2hcclxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxyXG4gICAgICB0aGlzLmdyaWRTdGF0ZVNlcnZpY2Uub25HcmlkU3RhdGVDaGFuZ2VkLnN1YnNjcmliZSgoZ3JpZFN0YXRlQ2hhbmdlOiBHcmlkU3RhdGVDaGFuZ2UpID0+IHtcclxuICAgICAgICB0aGlzLm9uR3JpZFN0YXRlQ2hhbmdlZC5lbWl0KGdyaWRTdGF0ZUNoYW5nZSk7XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG5cclxuXHJcbiAgICAvLyBvbiBjZWxsIGNsaWNrLCBtYWlubHkgdXNlZCB3aXRoIHRoZSBjb2x1bW5EZWYuYWN0aW9uIGNhbGxiYWNrXHJcbiAgICB0aGlzLmdyaWRFdmVudFNlcnZpY2UuYXR0YWNoT25DZWxsQ2hhbmdlKGdyaWQsIGRhdGFWaWV3KTtcclxuICAgIHRoaXMuZ3JpZEV2ZW50U2VydmljZS5hdHRhY2hPbkNsaWNrKGdyaWQsIGRhdGFWaWV3KTtcclxuXHJcbiAgICBpZiAoZGF0YVZpZXcgJiYgZ3JpZCkge1xyXG4gICAgICB0aGlzLl9ldmVudEhhbmRsZXIuc3Vic2NyaWJlKGRhdGFWaWV3Lm9uUm93Q291bnRDaGFuZ2VkLCAoZTogYW55LCBhcmdzOiBhbnkpID0+IHtcclxuICAgICAgICBncmlkLmludmFsaWRhdGUoKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICAvLyB3aXRob3V0IHRoaXMsIGZpbHRlcmluZyBkYXRhIHdpdGggbG9jYWwgZGF0YXNldCB3aWxsIG5vdCBhbHdheXMgc2hvdyBjb3JyZWN0bHlcclxuICAgICAgLy8gYWxzbyBkb24ndCB1c2UgXCJpbnZhbGlkYXRlUm93c1wiIHNpbmNlIGl0IGRlc3Ryb3lzIHRoZSBlbnRpcmUgcm93IGFuZCBhcyBiYWQgdXNlciBleHBlcmllbmNlIHdoZW4gdXBkYXRpbmcgYSByb3dcclxuICAgICAgLy8gc2VlIGNvbW1pdDogaHR0cHM6Ly9naXRodWIuY29tL2doaXNjb2RpbmcvQW5ndWxhci1TbGlja2dyaWQvY29tbWl0L2JiNjJjMGFhMjMxNGE1ZDYxMTg4ZmYwMDVjY2I1NjQ1NzdmMDg4MDVcclxuICAgICAgaWYgKGdyaWRPcHRpb25zICYmIGdyaWRPcHRpb25zLmVuYWJsZUZpbHRlcmluZyAmJiAhZ3JpZE9wdGlvbnMuZW5hYmxlUm93RGV0YWlsVmlldykge1xyXG4gICAgICAgIHRoaXMuX2V2ZW50SGFuZGxlci5zdWJzY3JpYmUoZGF0YVZpZXcub25Sb3dzQ2hhbmdlZCwgKGU6IGFueSwgYXJnczogYW55KSA9PiB7XHJcbiAgICAgICAgICBpZiAoYXJncyAmJiBhcmdzLnJvd3MgJiYgQXJyYXkuaXNBcnJheShhcmdzLnJvd3MpKSB7XHJcbiAgICAgICAgICAgIGFyZ3Mucm93cy5mb3JFYWNoKChyb3cpID0+IGdyaWQudXBkYXRlUm93KHJvdykpO1xyXG4gICAgICAgICAgICBncmlkLnJlbmRlcigpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZG9lcyB0aGUgdXNlciBoYXZlIGEgY29sc3BhbiBjYWxsYmFjaz9cclxuICAgIGlmIChncmlkT3B0aW9ucy5jb2xzcGFuQ2FsbGJhY2spIHtcclxuICAgICAgdGhpcy5kYXRhVmlldy5nZXRJdGVtTWV0YWRhdGEgPSAocm93TnVtYmVyOiBudW1iZXIpID0+IHtcclxuICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5kYXRhVmlldy5nZXRJdGVtKHJvd051bWJlcik7XHJcbiAgICAgICAgcmV0dXJuIGdyaWRPcHRpb25zLmNvbHNwYW5DYWxsYmFjayhpdGVtKTtcclxuICAgICAgfTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGF0dGFjaEJhY2tlbmRDYWxsYmFja0Z1bmN0aW9ucyhncmlkT3B0aW9uczogR3JpZE9wdGlvbikge1xyXG4gICAgY29uc3QgYmFja2VuZEFwaSA9IGdyaWRPcHRpb25zLmJhY2tlbmRTZXJ2aWNlQXBpO1xyXG4gICAgY29uc3Qgc2VydmljZU9wdGlvbnM6IEJhY2tlbmRTZXJ2aWNlT3B0aW9uID0gKGJhY2tlbmRBcGkgJiYgYmFja2VuZEFwaS5zZXJ2aWNlICYmIGJhY2tlbmRBcGkuc2VydmljZS5vcHRpb25zKSA/IGJhY2tlbmRBcGkuc2VydmljZS5vcHRpb25zIDoge307XHJcbiAgICBjb25zdCBpc0V4ZWN1dGVDb21tYW5kT25Jbml0ID0gKCFzZXJ2aWNlT3B0aW9ucykgPyBmYWxzZSA6ICgoc2VydmljZU9wdGlvbnMgJiYgc2VydmljZU9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ2V4ZWN1dGVQcm9jZXNzQ29tbWFuZE9uSW5pdCcpKSA/IHNlcnZpY2VPcHRpb25zWydleGVjdXRlUHJvY2Vzc0NvbW1hbmRPbkluaXQnXSA6IHRydWUpO1xyXG5cclxuICAgIC8vIHVwZGF0ZSBiYWNrZW5kIGZpbHRlcnMgKGlmIG5lZWQgYmUpIGJlZm9yZSB0aGUgcXVlcnkgcnVuc1xyXG4gICAgaWYgKGJhY2tlbmRBcGkpIHtcclxuICAgICAgY29uc3QgYmFja2VuZFNlcnZpY2UgPSBiYWNrZW5kQXBpLnNlcnZpY2U7XHJcblxyXG4gICAgICAvLyBpZiB1c2VyIGVudGVyZWQgc29tZSBhbnkgXCJwcmVzZXRzXCIsIHdlIG5lZWQgdG8gcmVmbGVjdCB0aGVtIGFsbCBpbiB0aGUgZ3JpZFxyXG4gICAgICBpZiAoZ3JpZE9wdGlvbnMgJiYgZ3JpZE9wdGlvbnMucHJlc2V0cykge1xyXG4gICAgICAgIC8vIEZpbHRlcnMgXCJwcmVzZXRzXCJcclxuICAgICAgICBpZiAoYmFja2VuZFNlcnZpY2UgJiYgYmFja2VuZFNlcnZpY2UudXBkYXRlRmlsdGVycyAmJiBBcnJheS5pc0FycmF5KGdyaWRPcHRpb25zLnByZXNldHMuZmlsdGVycykgJiYgZ3JpZE9wdGlvbnMucHJlc2V0cy5maWx0ZXJzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgIGJhY2tlbmRTZXJ2aWNlLnVwZGF0ZUZpbHRlcnMoZ3JpZE9wdGlvbnMucHJlc2V0cy5maWx0ZXJzLCB0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gU29ydGVycyBcInByZXNldHNcIlxyXG4gICAgICAgIGlmIChiYWNrZW5kU2VydmljZSAmJiBiYWNrZW5kU2VydmljZS51cGRhdGVTb3J0ZXJzICYmIEFycmF5LmlzQXJyYXkoZ3JpZE9wdGlvbnMucHJlc2V0cy5zb3J0ZXJzKSAmJiBncmlkT3B0aW9ucy5wcmVzZXRzLnNvcnRlcnMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgYmFja2VuZFNlcnZpY2UudXBkYXRlU29ydGVycyh1bmRlZmluZWQsIGdyaWRPcHRpb25zLnByZXNldHMuc29ydGVycyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFBhZ2luYXRpb24gXCJwcmVzZXRzXCJcclxuICAgICAgICBpZiAoYmFja2VuZFNlcnZpY2UgJiYgYmFja2VuZFNlcnZpY2UudXBkYXRlUGFnaW5hdGlvbiAmJiBncmlkT3B0aW9ucy5wcmVzZXRzLnBhZ2luYXRpb24pIHtcclxuICAgICAgICAgIGJhY2tlbmRTZXJ2aWNlLnVwZGF0ZVBhZ2luYXRpb24oZ3JpZE9wdGlvbnMucHJlc2V0cy5wYWdpbmF0aW9uLnBhZ2VOdW1iZXIsIGdyaWRPcHRpb25zLnByZXNldHMucGFnaW5hdGlvbi5wYWdlU2l6ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IGNvbHVtbkZpbHRlcnMgPSB0aGlzLmZpbHRlclNlcnZpY2UuZ2V0Q29sdW1uRmlsdGVycygpO1xyXG4gICAgICAgIGlmIChjb2x1bW5GaWx0ZXJzICYmIGJhY2tlbmRTZXJ2aWNlICYmIGJhY2tlbmRTZXJ2aWNlLnVwZGF0ZUZpbHRlcnMpIHtcclxuICAgICAgICAgIGJhY2tlbmRTZXJ2aWNlLnVwZGF0ZUZpbHRlcnMoY29sdW1uRmlsdGVycywgZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChiYWNrZW5kQXBpICYmIGJhY2tlbmRBcGkuc2VydmljZSAmJiAoYmFja2VuZEFwaS5vbkluaXQgfHwgaXNFeGVjdXRlQ29tbWFuZE9uSW5pdCkpIHtcclxuICAgICAgY29uc3QgcXVlcnkgPSAodHlwZW9mIGJhY2tlbmRBcGkuc2VydmljZS5idWlsZFF1ZXJ5ID09PSAnZnVuY3Rpb24nKSA/IGJhY2tlbmRBcGkuc2VydmljZS5idWlsZFF1ZXJ5KCkgOiAnJztcclxuICAgICAgY29uc3QgcHJvY2VzcyA9IChpc0V4ZWN1dGVDb21tYW5kT25Jbml0KSA/IGJhY2tlbmRBcGkucHJvY2VzcyhxdWVyeSkgOiBiYWNrZW5kQXBpLm9uSW5pdChxdWVyeSk7XHJcblxyXG4gICAgICAvLyB3cmFwIHRoaXMgaW5zaWRlIGEgc2V0VGltZW91dCB0byBhdm9pZCB0aW1pbmcgaXNzdWUgc2luY2UgdGhlIGdyaWRPcHRpb25zIG5lZWRzIHRvIGJlIHJlYWR5IGJlZm9yZSBydW5uaW5nIHRoaXMgb25Jbml0XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIC8vIGtlZXAgc3RhcnQgdGltZSAmIGVuZCB0aW1lc3RhbXBzICYgcmV0dXJuIGl0IGFmdGVyIHByb2Nlc3MgZXhlY3V0aW9uXHJcbiAgICAgICAgY29uc3Qgc3RhcnRUaW1lID0gbmV3IERhdGUoKTtcclxuXHJcbiAgICAgICAgLy8gcnVuIGFueSBwcmUtcHJvY2VzcywgaWYgZGVmaW5lZCwgZm9yIGV4YW1wbGUgYSBzcGlubmVyXHJcbiAgICAgICAgaWYgKGJhY2tlbmRBcGkucHJlUHJvY2Vzcykge1xyXG4gICAgICAgICAgYmFja2VuZEFwaS5wcmVQcm9jZXNzKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgLy8gdGhlIHByb2Nlc3NlcyBjYW4gYmUgT2JzZXJ2YWJsZXMgKGxpa2UgSHR0cENsaWVudCkgb3IgUHJvbWlzZXNcclxuICAgICAgICAgIGlmIChwcm9jZXNzIGluc3RhbmNlb2YgUHJvbWlzZSAmJiBwcm9jZXNzLnRoZW4pIHtcclxuICAgICAgICAgICAgcHJvY2Vzcy50aGVuKChwcm9jZXNzUmVzdWx0OiBHcmFwaHFsUmVzdWx0IHwgYW55KSA9PiBleGVjdXRlQmFja2VuZFByb2Nlc3Nlc0NhbGxiYWNrKHN0YXJ0VGltZSwgcHJvY2Vzc1Jlc3VsdCwgYmFja2VuZEFwaSwgdGhpcy5ncmlkT3B0aW9ucykpO1xyXG4gICAgICAgICAgfSBlbHNlIGlmIChpc09ic2VydmFibGUocHJvY2VzcykpIHtcclxuICAgICAgICAgICAgcHJvY2Vzcy5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgICAgKHByb2Nlc3NSZXN1bHQ6IEdyYXBocWxSZXN1bHQgfCBhbnkpID0+IGV4ZWN1dGVCYWNrZW5kUHJvY2Vzc2VzQ2FsbGJhY2soc3RhcnRUaW1lLCBwcm9jZXNzUmVzdWx0LCBiYWNrZW5kQXBpLCB0aGlzLmdyaWRPcHRpb25zKSxcclxuICAgICAgICAgICAgICAoZXJyb3I6IGFueSkgPT4gb25CYWNrZW5kRXJyb3IoZXJyb3IsIGJhY2tlbmRBcGkpXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgIG9uQmFja2VuZEVycm9yKGVycm9yLCBiYWNrZW5kQXBpKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXR0YWNoUmVzaXplSG9vayhncmlkOiBhbnksIG9wdGlvbnM6IEdyaWRPcHRpb24pIHtcclxuICAgIC8vIGV4cGFuZC9hdXRvZml0IGNvbHVtbnMgb24gZmlyc3QgcGFnZSBsb2FkXHJcbiAgICBpZiAoZ3JpZCAmJiBvcHRpb25zLmF1dG9GaXRDb2x1bW5zT25GaXJzdExvYWQgJiYgb3B0aW9ucy5lbmFibGVBdXRvU2l6ZUNvbHVtbnMpIHtcclxuICAgICAgZ3JpZC5hdXRvc2l6ZUNvbHVtbnMoKTtcclxuXHJcbiAgICAgIC8vIGNvbXBlbnNhdGUgYW55dGltZSBTbGlja0dyaWQgbWVhc3VyZVNjcm9sbGJhciBpcyBpbmNvcnJlY3QgKG9ubHkgc2VlbXMgdG8gaGFwcGVuIGluIENocm9tZSAxLzUgY29tcHV0ZXJzKVxyXG4gICAgICB0aGlzLnJlc2l6ZXIuY29tcGVuc2F0ZUhvcml6b250YWxTY3JvbGwodGhpcy5ncmlkLCB0aGlzLmdyaWRPcHRpb25zKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBhdXRvLXJlc2l6ZSBncmlkIG9uIGJyb3dzZXIgcmVzaXplXHJcbiAgICBpZiAodGhpcy5fZml4ZWRIZWlnaHQgfHwgdGhpcy5fZml4ZWRXaWR0aCkge1xyXG4gICAgICB0aGlzLnJlc2l6ZXIuaW5pdChncmlkLCB7IGhlaWdodDogdGhpcy5fZml4ZWRIZWlnaHQsIHdpZHRoOiB0aGlzLl9maXhlZFdpZHRoIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5yZXNpemVyLmluaXQoZ3JpZCk7XHJcbiAgICB9XHJcbiAgICBpZiAob3B0aW9ucy5lbmFibGVBdXRvUmVzaXplKSB7XHJcbiAgICAgIHRoaXMucmVzaXplci5iaW5kQXV0b1Jlc2l6ZURhdGFHcmlkKCk7XHJcbiAgICAgIGlmIChncmlkICYmIG9wdGlvbnMuYXV0b0ZpdENvbHVtbnNPbkZpcnN0TG9hZCAmJiBvcHRpb25zLmVuYWJsZUF1dG9TaXplQ29sdW1ucykge1xyXG4gICAgICAgIGdyaWQuYXV0b3NpemVDb2x1bW5zKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGV4ZWN1dGVBZnRlckRhdGF2aWV3Q3JlYXRlZChncmlkOiBhbnksIGdyaWRPcHRpb25zOiBHcmlkT3B0aW9uLCBkYXRhVmlldzogYW55KSB7XHJcbiAgICAvLyBpZiB1c2VyIGVudGVyZWQgc29tZSBTb3J0IFwicHJlc2V0c1wiLCB3ZSBuZWVkIHRvIHJlZmxlY3QgdGhlbSBhbGwgaW4gdGhlIERPTVxyXG4gICAgaWYgKGdyaWRPcHRpb25zLmVuYWJsZVNvcnRpbmcpIHtcclxuICAgICAgaWYgKGdyaWRPcHRpb25zLnByZXNldHMgJiYgQXJyYXkuaXNBcnJheShncmlkT3B0aW9ucy5wcmVzZXRzLnNvcnRlcnMpICYmIGdyaWRPcHRpb25zLnByZXNldHMuc29ydGVycy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgdGhpcy5zb3J0U2VydmljZS5sb2FkTG9jYWxQcmVzZXRzKGdyaWQsIGRhdGFWaWV3KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbWVyZ2VHcmlkT3B0aW9ucyhncmlkT3B0aW9ucyk6IEdyaWRPcHRpb24ge1xyXG4gICAgZ3JpZE9wdGlvbnMuZ3JpZElkID0gdGhpcy5ncmlkSWQ7XHJcbiAgICBncmlkT3B0aW9ucy5ncmlkQ29udGFpbmVySWQgPSBgc2xpY2tHcmlkQ29udGFpbmVyLSR7dGhpcy5ncmlkSWR9YDtcclxuXHJcbiAgICAvLyB1c2UganF1ZXJ5IGV4dGVuZCB0byBkZWVwIG1lcmdlICYgY29weSB0byBhdm9pZCBpbW11dGFibGUgcHJvcGVydGllcyBiZWluZyBjaGFuZ2VkIGluIEdsb2JhbEdyaWRPcHRpb25zIGFmdGVyIGEgcm91dGUgY2hhbmdlXHJcbiAgICBjb25zdCBvcHRpb25zID0gJC5leHRlbmQodHJ1ZSwge30sIEdsb2JhbEdyaWRPcHRpb25zLCB0aGlzLmZvclJvb3RDb25maWcsIGdyaWRPcHRpb25zKTtcclxuXHJcbiAgICAvLyB1c2luZyBqUXVlcnkgZXh0ZW5kIHRvIGRvIGEgZGVlcCBjbG9uZSBoYXMgYW4gdW53YW50ZWQgc2lkZSBvbiBvYmplY3RzIGFuZCBwYWdlU2l6ZXMgYnV0IEVTNiBzcHJlYWQgaGFzIG90aGVyIHdvcnN0IHNpZGUgZWZmZWN0c1xyXG4gICAgLy8gc28gd2Ugd2lsbCBqdXN0IG92ZXJ3cml0ZSB0aGUgcGFnZVNpemVzIHdoZW4gbmVlZGVkLCB0aGlzIGlzIHRoZSBvbmx5IG9uZSBjYXVzaW5nIGlzc3VlcyBzbyBmYXIuXHJcbiAgICAvLyBqUXVlcnkgd3JvdGUgdGhpcyBvbiB0aGVpciBkb2NzOjogT24gYSBkZWVwIGV4dGVuZCwgT2JqZWN0IGFuZCBBcnJheSBhcmUgZXh0ZW5kZWQsIGJ1dCBvYmplY3Qgd3JhcHBlcnMgb24gcHJpbWl0aXZlIHR5cGVzIHN1Y2ggYXMgU3RyaW5nLCBCb29sZWFuLCBhbmQgTnVtYmVyIGFyZSBub3QuXHJcbiAgICBpZiAoZ3JpZE9wdGlvbnMgJiYgZ3JpZE9wdGlvbnMuYmFja2VuZFNlcnZpY2VBcGkpIHtcclxuICAgICAgaWYgKGdyaWRPcHRpb25zLnBhZ2luYXRpb24gJiYgQXJyYXkuaXNBcnJheShncmlkT3B0aW9ucy5wYWdpbmF0aW9uLnBhZ2VTaXplcykgJiYgZ3JpZE9wdGlvbnMucGFnaW5hdGlvbi5wYWdlU2l6ZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIG9wdGlvbnMucGFnaW5hdGlvbi5wYWdlU2l6ZXMgPSBncmlkT3B0aW9ucy5wYWdpbmF0aW9uLnBhZ2VTaXplcztcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGFsc28gbWFrZSBzdXJlIHRvIHNob3cgdGhlIGhlYWRlciByb3cgaWYgdXNlciBoYXZlIGVuYWJsZWQgZmlsdGVyaW5nXHJcbiAgICB0aGlzLl9oaWRlSGVhZGVyUm93QWZ0ZXJQYWdlTG9hZCA9IChvcHRpb25zLnNob3dIZWFkZXJSb3cgPT09IGZhbHNlKTtcclxuICAgIGlmIChvcHRpb25zLmVuYWJsZUZpbHRlcmluZyAmJiAhb3B0aW9ucy5zaG93SGVhZGVyUm93KSB7XHJcbiAgICAgIG9wdGlvbnMuc2hvd0hlYWRlclJvdyA9IG9wdGlvbnMuZW5hYmxlRmlsdGVyaW5nO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG9wdGlvbnM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBPbiBhIFBhZ2luYXRpb24gY2hhbmdlZCwgd2Ugd2lsbCB0cmlnZ2VyIGEgR3JpZCBTdGF0ZSBjaGFuZ2VkIHdpdGggdGhlIG5ldyBwYWdpbmF0aW9uIGluZm9cclxuICAgKiBBbHNvIGlmIHdlIHVzZSBSb3cgU2VsZWN0aW9uIG9yIHRoZSBDaGVja2JveCBTZWxlY3Rvciwgd2UgbmVlZCB0byByZXNldCBhbnkgc2VsZWN0aW9uXHJcbiAgICovXHJcbiAgcGFnaW5hdGlvbkNoYW5nZWQocGFnaW5hdGlvbjogUGFnaW5hdGlvbikge1xyXG4gICAgaWYgKHRoaXMuZ3JpZE9wdGlvbnMuZW5hYmxlUm93U2VsZWN0aW9uIHx8IHRoaXMuZ3JpZE9wdGlvbnMuZW5hYmxlQ2hlY2tib3hTZWxlY3Rvcikge1xyXG4gICAgICB0aGlzLmdyaWRTZXJ2aWNlLnNldFNlbGVjdGVkUm93cyhbXSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5ncmlkU3RhdGVTZXJ2aWNlLm9uR3JpZFN0YXRlQ2hhbmdlZC5uZXh0KHtcclxuICAgICAgY2hhbmdlOiB7IG5ld1ZhbHVlczogcGFnaW5hdGlvbiwgdHlwZTogR3JpZFN0YXRlVHlwZS5wYWdpbmF0aW9uIH0sXHJcbiAgICAgIGdyaWRTdGF0ZTogdGhpcy5ncmlkU3RhdGVTZXJ2aWNlLmdldEN1cnJlbnRHcmlkU3RhdGUoKVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGVuIGRhdGFzZXQgY2hhbmdlcywgd2UgbmVlZCB0byByZWZyZXNoIHRoZSBlbnRpcmUgZ3JpZCBVSSAmIHBvc3NpYmx5IHJlc2l6ZSBpdCBhcyB3ZWxsXHJcbiAgICogQHBhcmFtIGRhdGFzZXRcclxuICAgKi9cclxuICByZWZyZXNoR3JpZERhdGEoZGF0YXNldDogYW55W10sIHRvdGFsQ291bnQ/OiBudW1iZXIpIHtcclxuICAgIGlmIChBcnJheS5pc0FycmF5KGRhdGFzZXQpICYmIHRoaXMuZ3JpZCAmJiB0aGlzLmRhdGFWaWV3ICYmIHR5cGVvZiB0aGlzLmRhdGFWaWV3LnNldEl0ZW1zID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgIHRoaXMuZGF0YVZpZXcuc2V0SXRlbXMoZGF0YXNldCwgdGhpcy5ncmlkT3B0aW9ucy5kYXRhc2V0SWRQcm9wZXJ0eU5hbWUpO1xyXG4gICAgICBpZiAoIXRoaXMuZ3JpZE9wdGlvbnMuYmFja2VuZFNlcnZpY2VBcGkpIHtcclxuICAgICAgICB0aGlzLmRhdGFWaWV3LnJlU29ydCgpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoZGF0YXNldCkge1xyXG4gICAgICAgIHRoaXMuZ3JpZC5pbnZhbGlkYXRlKCk7XHJcbiAgICAgICAgdGhpcy5ncmlkLnJlbmRlcigpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAodGhpcy5ncmlkT3B0aW9ucy5iYWNrZW5kU2VydmljZUFwaSkge1xyXG4gICAgICAgIC8vIGRvIHdlIHdhbnQgdG8gc2hvdyBwYWdpbmF0aW9uP1xyXG4gICAgICAgIC8vIGlmIHdlIGhhdmUgYSBiYWNrZW5kU2VydmljZUFwaSBhbmQgdGhlIGVuYWJsZVBhZ2luYXRpb24gaXMgdW5kZWZpbmVkLCB3ZSdsbCBhc3N1bWUgdGhhdCB3ZSBkbyB3YW50IHRvIHNlZSBpdCwgZWxzZSBnZXQgdGhhdCBkZWZpbmVkIHZhbHVlXHJcbiAgICAgICAgdGhpcy5zaG93UGFnaW5hdGlvbiA9ICgodGhpcy5ncmlkT3B0aW9ucy5iYWNrZW5kU2VydmljZUFwaSAmJiB0aGlzLmdyaWRPcHRpb25zLmVuYWJsZVBhZ2luYXRpb24gPT09IHVuZGVmaW5lZCkgPyB0cnVlIDogdGhpcy5ncmlkT3B0aW9ucy5lbmFibGVQYWdpbmF0aW9uKSB8fCBmYWxzZTtcclxuXHJcbiAgICAgICAgLy8gYmVmb3JlIG1lcmdpbmcgdGhlIGdyaWQgb3B0aW9ucywgbWFrZSBzdXJlIHRoYXQgaXQgaGFzIHRoZSB0b3RhbEl0ZW1zIGNvdW50XHJcbiAgICAgICAgLy8gb25jZSB3ZSBoYXZlIHRoYXQsIHdlIGNhbiBtZXJnZSBhbmQgcGFzcyBhbGwgdGhlc2Ugb3B0aW9ucyB0byB0aGUgcGFnaW5hdGlvbiBjb21wb25lbnRcclxuICAgICAgICBpZiAoIXRoaXMuZ3JpZE9wdGlvbnMucGFnaW5hdGlvbikge1xyXG4gICAgICAgICAgdGhpcy5ncmlkT3B0aW9ucy5wYWdpbmF0aW9uID0gKHRoaXMuZ3JpZE9wdGlvbnMucGFnaW5hdGlvbikgPyB0aGlzLmdyaWRPcHRpb25zLnBhZ2luYXRpb24gOiB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmdyaWRPcHRpb25zLnBhZ2luYXRpb24gJiYgdG90YWxDb3VudCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICB0aGlzLmdyaWRPcHRpb25zLnBhZ2luYXRpb24udG90YWxJdGVtcyA9IHRvdGFsQ291bnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmdyaWRPcHRpb25zLnByZXNldHMgJiYgdGhpcy5ncmlkT3B0aW9ucy5wcmVzZXRzLnBhZ2luYXRpb24gJiYgdGhpcy5ncmlkT3B0aW9ucy5wYWdpbmF0aW9uKSB7XHJcbiAgICAgICAgICB0aGlzLmdyaWRPcHRpb25zLnBhZ2luYXRpb24ucGFnZVNpemUgPSB0aGlzLmdyaWRPcHRpb25zLnByZXNldHMucGFnaW5hdGlvbi5wYWdlU2l6ZTtcclxuICAgICAgICAgIHRoaXMuZ3JpZE9wdGlvbnMucGFnaW5hdGlvbi5wYWdlTnVtYmVyID0gdGhpcy5ncmlkT3B0aW9ucy5wcmVzZXRzLnBhZ2luYXRpb24ucGFnZU51bWJlcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5ncmlkUGFnaW5hdGlvbk9wdGlvbnMgPSB0aGlzLm1lcmdlR3JpZE9wdGlvbnModGhpcy5ncmlkT3B0aW9ucyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIHJlc2l6ZSB0aGUgZ3JpZCBpbnNpZGUgYSBzbGlnaHQgdGltZW91dCwgaW4gY2FzZSBvdGhlciBET00gZWxlbWVudCBjaGFuZ2VkIHByaW9yIHRvIHRoZSByZXNpemUgKGxpa2UgYSBmaWx0ZXIvcGFnaW5hdGlvbiBjaGFuZ2VkKVxyXG4gICAgICBpZiAodGhpcy5ncmlkICYmIHRoaXMuZ3JpZE9wdGlvbnMuZW5hYmxlQXV0b1Jlc2l6ZSkge1xyXG4gICAgICAgIGNvbnN0IGRlbGF5ID0gdGhpcy5ncmlkT3B0aW9ucy5hdXRvUmVzaXplICYmIHRoaXMuZ3JpZE9wdGlvbnMuYXV0b1Jlc2l6ZS5kZWxheTtcclxuICAgICAgICB0aGlzLnJlc2l6ZXIucmVzaXplR3JpZChkZWxheSB8fCAxMCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIER5bmFtaWNhbGx5IGNoYW5nZSBvciB1cGRhdGUgdGhlIGNvbHVtbiBkZWZpbml0aW9ucyBsaXN0LlxyXG4gICAqIFdlIHdpbGwgcmUtcmVuZGVyIHRoZSBncmlkIHNvIHRoYXQgdGhlIG5ldyBoZWFkZXIgYW5kIGRhdGEgc2hvd3MgdXAgY29ycmVjdGx5LlxyXG4gICAqIElmIHVzaW5nIGkxOG4sIHdlIGFsc28gbmVlZCB0byB0cmlnZ2VyIGEgcmUtdHJhbnNsYXRlIG9mIHRoZSBjb2x1bW4gaGVhZGVyc1xyXG4gICAqL1xyXG4gIHVwZGF0ZUNvbHVtbkRlZmluaXRpb25zTGlzdChuZXdDb2x1bW5EZWZpbml0aW9ucykge1xyXG4gICAgLy8gbWFwL3N3YXAgdGhlIGludGVybmFsIGxpYnJhcnkgRWRpdG9yIHRvIHRoZSBTbGlja0dyaWQgRWRpdG9yIGZhY3RvcnlcclxuICAgIG5ld0NvbHVtbkRlZmluaXRpb25zID0gdGhpcy5zd2FwSW50ZXJuYWxFZGl0b3JUb1NsaWNrR3JpZEZhY3RvcnlFZGl0b3IobmV3Q29sdW1uRGVmaW5pdGlvbnMpO1xyXG5cclxuICAgIGlmICh0aGlzLmdyaWRPcHRpb25zLmVuYWJsZVRyYW5zbGF0ZSkge1xyXG4gICAgICB0aGlzLmV4dGVuc2lvblNlcnZpY2UudHJhbnNsYXRlQ29sdW1uSGVhZGVycyhmYWxzZSwgbmV3Q29sdW1uRGVmaW5pdGlvbnMpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5leHRlbnNpb25TZXJ2aWNlLnJlbmRlckNvbHVtbkhlYWRlcnMobmV3Q29sdW1uRGVmaW5pdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmdyaWRPcHRpb25zICYmIHRoaXMuZ3JpZE9wdGlvbnMuZW5hYmxlQXV0b1NpemVDb2x1bW5zKSB7XHJcbiAgICAgIHRoaXMuZ3JpZC5hdXRvc2l6ZUNvbHVtbnMoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiBUb2dnbGUgdGhlIGZpbHRlciByb3cgZGlzcGxheWVkIG9uIGZpcnN0IHJvd1xyXG4gICAqIEBwYXJhbSBpc1Nob3dpbmdcclxuICAgKi9cclxuICBzaG93SGVhZGVyUm93KGlzU2hvd2luZzogYm9vbGVhbikge1xyXG4gICAgdGhpcy5ncmlkLnNldEhlYWRlclJvd1Zpc2liaWxpdHkoaXNTaG93aW5nKTtcclxuICAgIHJldHVybiBpc1Nob3dpbmc7XHJcbiAgfVxyXG5cclxuICAvKiogVG9nZ2xlIHRoZSBmaWx0ZXIgcm93IGRpc3BsYXllZCBvbiBmaXJzdCByb3cgKi9cclxuICB0b2dnbGVIZWFkZXJSb3coKSB7XHJcbiAgICBjb25zdCBpc1Nob3dpbmcgPSAhdGhpcy5ncmlkLmdldE9wdGlvbnMoKS5zaG93SGVhZGVyUm93O1xyXG4gICAgdGhpcy5ncmlkLnNldEhlYWRlclJvd1Zpc2liaWxpdHkoaXNTaG93aW5nKTtcclxuICAgIHJldHVybiBpc1Nob3dpbmc7XHJcbiAgfVxyXG5cclxuICAvL1xyXG4gIC8vIHByaXZhdGUgZnVuY3Rpb25zXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gIC8qKiBEaXNwYXRjaCBvZiBDdXN0b20gRXZlbnQsIHdoaWNoIGJ5IGRlZmF1bHQgd2lsbCBidWJibGUgJiBpcyBjYW5jZWxhYmxlICovXHJcbiAgcHJpdmF0ZSBkaXNwYXRjaEN1c3RvbUV2ZW50KGV2ZW50TmFtZTogc3RyaW5nLCBkYXRhPzogYW55LCBpc0J1YmJsaW5nOiBib29sZWFuID0gdHJ1ZSwgaXNDYW5jZWxhYmxlOiBib29sZWFuID0gdHJ1ZSkge1xyXG4gICAgY29uc3QgZXZlbnRJbml0OiBDdXN0b21FdmVudEluaXQgPSB7IGJ1YmJsZXM6IGlzQnViYmxpbmcsIGNhbmNlbGFibGU6IGlzQ2FuY2VsYWJsZSB9O1xyXG4gICAgaWYgKGRhdGEpIHtcclxuICAgICAgZXZlbnRJbml0LmRldGFpbCA9IGRhdGE7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5lbG0ubmF0aXZlRWxlbWVudC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudChldmVudE5hbWUsIGV2ZW50SW5pdCkpO1xyXG4gIH1cclxuXHJcbiAgLyoqIExvYWQgdGhlIEVkaXRvciBDb2xsZWN0aW9uIGFzeW5jaHJvbm91c2x5IGFuZCByZXBsYWNlIHRoZSBcImNvbGxlY3Rpb25cIiBwcm9wZXJ0eSB3aGVuIE9ic2VydmFibGUgcmVzb2x2ZXMgKi9cclxuICBwcml2YXRlIGxvYWRFZGl0b3JDb2xsZWN0aW9uQXN5bmMoY29sdW1uOiBDb2x1bW4pIHtcclxuICAgIGNvbnN0IGNvbGxlY3Rpb25Bc3luYyA9IGNvbHVtbiAmJiBjb2x1bW4uZWRpdG9yICYmIGNvbHVtbi5lZGl0b3IuY29sbGVjdGlvbkFzeW5jO1xyXG4gICAgaWYgKGNvbGxlY3Rpb25Bc3luYyBpbnN0YW5jZW9mIE9ic2VydmFibGUpIHtcclxuICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXHJcbiAgICAgICAgY29sbGVjdGlvbkFzeW5jLnN1YnNjcmliZSgocmVzb2x2ZWRDb2xsZWN0aW9uKSA9PiB0aGlzLnVwZGF0ZUVkaXRvckNvbGxlY3Rpb24oY29sdW1uLCByZXNvbHZlZENvbGxlY3Rpb24pKVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRm9yIGNvbnZlbmllbmNlIHRvIHRoZSB1c2VyLCB3ZSBwcm92aWRlIHRoZSBwcm9wZXJ0eSBcImVkaXRvclwiIGFzIGFuIEFuZ3VsYXItU2xpY2tncmlkIGVkaXRvciBjb21wbGV4IG9iamVjdFxyXG4gICAqIGhvd2V2ZXIgXCJlZGl0b3JcIiBpcyB1c2VkIGludGVybmFsbHkgYnkgU2xpY2tHcmlkIGZvciBpdCdzIG93biBFZGl0b3IgRmFjdG9yeVxyXG4gICAqIHNvIGluIG91ciBsaWIgd2Ugd2lsbCBzd2FwIFwiZWRpdG9yXCIgYW5kIGNvcHkgaXQgaW50byBhIG5ldyBwcm9wZXJ0eSBjYWxsZWQgXCJpbnRlcm5hbENvbHVtbkVkaXRvclwiXHJcbiAgICogdGhlbiB0YWtlIGJhY2sgXCJlZGl0b3IubW9kZWxcIiBhbmQgbWFrZSBpdCB0aGUgbmV3IFwiZWRpdG9yXCIgc28gdGhhdCBTbGlja0dyaWQgRWRpdG9yIEZhY3Rvcnkgc3RpbGwgd29ya3NcclxuICAgKi9cclxuICBwcml2YXRlIHN3YXBJbnRlcm5hbEVkaXRvclRvU2xpY2tHcmlkRmFjdG9yeUVkaXRvcihjb2x1bW5EZWZpbml0aW9uczogQ29sdW1uW10pIHtcclxuICAgIHJldHVybiBjb2x1bW5EZWZpbml0aW9ucy5tYXAoKGNvbHVtbjogQ29sdW1uIHwgYW55KSA9PiB7XHJcbiAgICAgIC8vIG9uIGV2ZXJ5IEVkaXRvciB0aGF0IGhhdmUgYSBcImNvbGxlY3Rpb25Bc3luY1wiLCByZXNvbHZlIHRoZSBkYXRhIGFuZCBhc3NpZ24gaXQgdG8gdGhlIFwiY29sbGVjdGlvblwiIHByb3BlcnR5XHJcbiAgICAgIGlmIChjb2x1bW4uZWRpdG9yICYmIGNvbHVtbi5lZGl0b3IuY29sbGVjdGlvbkFzeW5jKSB7XHJcbiAgICAgICAgdGhpcy5sb2FkRWRpdG9yQ29sbGVjdGlvbkFzeW5jKGNvbHVtbik7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHsgLi4uY29sdW1uLCBlZGl0b3I6IGNvbHVtbi5lZGl0b3IgJiYgY29sdW1uLmVkaXRvci5tb2RlbCwgaW50ZXJuYWxDb2x1bW5FZGl0b3I6IHsgLi4uY29sdW1uLmVkaXRvciB9IH07XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwZGF0ZSB0aGUgRWRpdG9yIFwiY29sbGVjdGlvblwiIHByb3BlcnR5IGZyb20gYW4gYXN5bmMgY2FsbCByZXNvbHZlZFxyXG4gICAqIFNpbmNlIHRoaXMgaXMgY2FsbGVkIGFmdGVyIHRoZSBhc3luYyBjYWxsIHJlc29sdmVzLCB0aGUgcG9pbnRlciB3aWxsIG5vdCBiZSB0aGUgc2FtZSBhcyB0aGUgXCJjb2x1bW5cIiBhcmd1bWVudCBwYXNzZWQuXHJcbiAgICogT25jZSB3ZSBmb3VuZCB0aGUgbmV3IHBvaW50ZXIsIHdlIHdpbGwgcmVhc3NpZ24gdGhlIFwiZWRpdG9yXCIgYW5kIFwiY29sbGVjdGlvblwiIHRvIHRoZSBcImludGVybmFsQ29sdW1uRWRpdG9yXCIgc28gaXQgaGFzIG5ld2VzdCBjb2xsZWN0aW9uXHJcbiAgICovXHJcbiAgcHJpdmF0ZSB1cGRhdGVFZGl0b3JDb2xsZWN0aW9uKGNvbHVtbjogQ29sdW1uLCBuZXdDb2xsZWN0aW9uOiBhbnlbXSkge1xyXG4gICAgY29sdW1uLmVkaXRvci5jb2xsZWN0aW9uID0gbmV3Q29sbGVjdGlvbjtcclxuXHJcbiAgICAvLyBmaW5kIHRoZSBuZXcgY29sdW1uIHJlZmVyZW5jZSBwb2ludGVyXHJcbiAgICBjb25zdCBjb2x1bW5zID0gdGhpcy5ncmlkLmdldENvbHVtbnMoKTtcclxuICAgIGlmIChBcnJheS5pc0FycmF5KGNvbHVtbnMpKSB7XHJcbiAgICAgIGNvbnN0IGNvbHVtblJlZjogQ29sdW1uID0gY29sdW1ucy5maW5kKChjb2w6IENvbHVtbikgPT4gY29sLmlkID09PSBjb2x1bW4uaWQpO1xyXG4gICAgICBjb2x1bW5SZWYuaW50ZXJuYWxDb2x1bW5FZGl0b3IgPSBjb2x1bW4uZWRpdG9yO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=