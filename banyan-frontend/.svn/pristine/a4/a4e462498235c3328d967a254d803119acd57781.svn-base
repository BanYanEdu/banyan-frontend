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
const slickgridEventPrefix = 'sg';
let AngularSlickgridComponent = class AngularSlickgridComponent {
    constructor(elm, exportService, extensionService, extensionUtility, filterService, gridService, gridEventService, gridStateService, groupingAndColspanService, resizer, sharedService, sortService, translate, forRootConfig) {
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
    set gridHeight(height) {
        this._fixedHeight = height;
    }
    set gridWidth(width) {
        this._fixedWidth = width;
    }
    set columnDefinitions(columnDefinitions) {
        this._columnDefinitions = columnDefinitions;
        if (this.isGridInitialized) {
            this.updateColumnDefinitionsList(columnDefinitions);
        }
    }
    get columnDefinitions() {
        return this._columnDefinitions;
    }
    set dataset(dataset) {
        this._dataset = dataset;
        this.refreshGridData(dataset);
    }
    get dataset() {
        return this.dataView.getItems();
    }
    ngOnInit() {
        this.onBeforeGridCreate.emit(true);
        if (this.gridOptions && !this.gridOptions.enableAutoResize && (this._fixedHeight || this._fixedWidth)) {
            this.gridHeightString = `${this._fixedHeight}px`;
            this.gridWidthString = `${this._fixedWidth}px`;
        }
    }
    ngOnDestroy() {
        this.onBeforeGridDestroy.emit(this.grid);
        this.destroy();
        this.onAfterGridDestroyed.emit(true);
    }
    destroy(emptyDomElementContainer = false) {
        const gridContainerId = this.gridOptions && this.gridOptions.gridContainerId;
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
    }
    ngAfterViewInit() {
        this.initialization();
        this.isGridInitialized = true;
        // user must provide a "gridHeight" or use "autoResize: true" in the grid options
        if (!this._fixedHeight && !this.gridOptions.enableAutoResize) {
            throw new Error(`[Angular-Slickgrid] requires a "grid-height" or the "enableAutoResize" grid option to be enabled.
        Without that the grid will seem empty while in fact it just does not have any height define.`);
        }
    }
    initialization() {
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
        this.grid = new Slick.Grid(`#${this.gridId}`, this.customDataView || this.dataView, this._columnDefinitions, this.gridOptions);
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
                const syncGridSelection = this.gridOptions.dataView.syncGridSelection;
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
    }
    /**
     * Commits the current edit to the grid
     */
    commitEdit(target) {
        if (this.grid.getOptions().autoCommitEdit) {
            const activeNode = this.grid.getActiveCellNode();
            // a timeout must be set or this could come into conflict when slickgrid
            // tries to commit the edit when going from one editor to another on the grid
            // through the click event. If the timeout was not here it would
            // try to commit/destroy the editor twice, which would throw a jquery
            // error about the element not being in the DOM
            setTimeout(() => {
                // make sure the target is the active editor so we do not
                // commit prematurely
                if (activeNode && activeNode.contains(target) && this.grid.getEditorLock().isActive()) {
                    this.grid.getEditorLock().commitCurrentEdit();
                }
            });
        }
    }
    /**
     * Define our internal Post Process callback, it will execute internally after we get back result from the Process backend call
     * For now, this is GraphQL Service ONLY feature and it will basically refresh the Dataset & Pagination without having the user to create his own PostProcess every time
     */
    createBackendApiInternalPostProcessCallback(gridOptions) {
        if (gridOptions && gridOptions.backendServiceApi) {
            const backendApi = gridOptions.backendServiceApi;
            // internalPostProcess only works with a GraphQL Service, so make sure it is that type
            if (backendApi && backendApi.service && backendApi.service instanceof GraphqlService) {
                backendApi.internalPostProcess = (processResult) => {
                    const datasetName = (backendApi && backendApi.service && typeof backendApi.service.getDatasetName === 'function') ? backendApi.service.getDatasetName() : '';
                    if (processResult && processResult.data && processResult.data[datasetName]) {
                        this._dataset = processResult.data[datasetName].nodes;
                        this.refreshGridData(this._dataset, processResult.data[datasetName].totalCount);
                    }
                    else {
                        this._dataset = [];
                    }
                };
            }
        }
    }
    attachDifferentHooks(grid, gridOptions, dataView) {
        // on locale change, we have to manually translate the Headers, GridMenu
        this.subscriptions.push(this.translate.onLangChange.subscribe((event) => {
            if (gridOptions.enableTranslate) {
                this.extensionService.translateColumnHeaders();
                this.extensionService.translateColumnPicker();
                this.extensionService.translateGridMenu();
                this.extensionService.translateHeaderMenu();
            }
        }));
        // if user entered some Columns "presets", we need to reflect them all in the grid
        if (gridOptions.presets && Array.isArray(gridOptions.presets.columns) && gridOptions.presets.columns.length > 0) {
            const gridColumns = this.gridStateService.getAssociatedGridColumns(grid, gridOptions.presets.columns);
            if (gridColumns && Array.isArray(gridColumns) && gridColumns.length > 0) {
                // make sure that the checkbox selector is also visible if it is enabled
                if (gridOptions.enableCheckboxSelector) {
                    const checkboxColumn = (Array.isArray(this._columnDefinitions) && this._columnDefinitions.length > 0) ? this._columnDefinitions[0] : null;
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
            const backendApi = gridOptions.backendServiceApi;
            if (backendApi && backendApi.service && backendApi.service.init) {
                backendApi.service.init(backendApi.options, gridOptions.pagination, this.grid);
            }
        }
        // expose all Slick Grid Events through dispatch
        for (const prop in grid) {
            if (grid.hasOwnProperty(prop) && prop.startsWith('on')) {
                this._eventHandler.subscribe(grid[prop], (e, args) => {
                    return this.dispatchCustomEvent(`${slickgridEventPrefix}${titleCase(prop)}`, { eventData: e, args });
                });
            }
        }
        // expose all Slick DataView Events through dispatch
        for (const prop in dataView) {
            if (dataView.hasOwnProperty(prop) && prop.startsWith('on')) {
                this._eventHandler.subscribe(dataView[prop], (e, args) => {
                    return this.dispatchCustomEvent(`${slickgridEventPrefix}${titleCase(prop)}`, { eventData: e, args });
                });
            }
        }
        // expose GridState Service changes event through dispatch
        this.subscriptions.push(this.gridStateService.onGridStateChanged.subscribe((gridStateChange) => {
            this.onGridStateChanged.emit(gridStateChange);
        }));
        // on cell click, mainly used with the columnDef.action callback
        this.gridEventService.attachOnCellChange(grid, dataView);
        this.gridEventService.attachOnClick(grid, dataView);
        if (dataView && grid) {
            this._eventHandler.subscribe(dataView.onRowCountChanged, (e, args) => {
                grid.invalidate();
            });
            // without this, filtering data with local dataset will not always show correctly
            // also don't use "invalidateRows" since it destroys the entire row and as bad user experience when updating a row
            // see commit: https://github.com/ghiscoding/Angular-Slickgrid/commit/bb62c0aa2314a5d61188ff005ccb564577f08805
            if (gridOptions && gridOptions.enableFiltering && !gridOptions.enableRowDetailView) {
                this._eventHandler.subscribe(dataView.onRowsChanged, (e, args) => {
                    if (args && args.rows && Array.isArray(args.rows)) {
                        args.rows.forEach((row) => grid.updateRow(row));
                        grid.render();
                    }
                });
            }
        }
        // does the user have a colspan callback?
        if (gridOptions.colspanCallback) {
            this.dataView.getItemMetadata = (rowNumber) => {
                const item = this.dataView.getItem(rowNumber);
                return gridOptions.colspanCallback(item);
            };
        }
    }
    attachBackendCallbackFunctions(gridOptions) {
        const backendApi = gridOptions.backendServiceApi;
        const serviceOptions = (backendApi && backendApi.service && backendApi.service.options) ? backendApi.service.options : {};
        const isExecuteCommandOnInit = (!serviceOptions) ? false : ((serviceOptions && serviceOptions.hasOwnProperty('executeProcessCommandOnInit')) ? serviceOptions['executeProcessCommandOnInit'] : true);
        // update backend filters (if need be) before the query runs
        if (backendApi) {
            const backendService = backendApi.service;
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
                const columnFilters = this.filterService.getColumnFilters();
                if (columnFilters && backendService && backendService.updateFilters) {
                    backendService.updateFilters(columnFilters, false);
                }
            }
        }
        if (backendApi && backendApi.service && (backendApi.onInit || isExecuteCommandOnInit)) {
            const query = (typeof backendApi.service.buildQuery === 'function') ? backendApi.service.buildQuery() : '';
            const process = (isExecuteCommandOnInit) ? backendApi.process(query) : backendApi.onInit(query);
            // wrap this inside a setTimeout to avoid timing issue since the gridOptions needs to be ready before running this onInit
            setTimeout(() => {
                // keep start time & end timestamps & return it after process execution
                const startTime = new Date();
                // run any pre-process, if defined, for example a spinner
                if (backendApi.preProcess) {
                    backendApi.preProcess();
                }
                try {
                    // the processes can be Observables (like HttpClient) or Promises
                    if (process instanceof Promise && process.then) {
                        process.then((processResult) => executeBackendProcessesCallback(startTime, processResult, backendApi, this.gridOptions));
                    }
                    else if (isObservable(process)) {
                        process.subscribe((processResult) => executeBackendProcessesCallback(startTime, processResult, backendApi, this.gridOptions), (error) => onBackendError(error, backendApi));
                    }
                }
                catch (error) {
                    onBackendError(error, backendApi);
                }
            });
        }
    }
    attachResizeHook(grid, options) {
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
    }
    executeAfterDataviewCreated(grid, gridOptions, dataView) {
        // if user entered some Sort "presets", we need to reflect them all in the DOM
        if (gridOptions.enableSorting) {
            if (gridOptions.presets && Array.isArray(gridOptions.presets.sorters) && gridOptions.presets.sorters.length > 0) {
                this.sortService.loadLocalPresets(grid, dataView);
            }
        }
    }
    mergeGridOptions(gridOptions) {
        gridOptions.gridId = this.gridId;
        gridOptions.gridContainerId = `slickGridContainer-${this.gridId}`;
        // use jquery extend to deep merge & copy to avoid immutable properties being changed in GlobalGridOptions after a route change
        const options = $.extend(true, {}, GlobalGridOptions, this.forRootConfig, gridOptions);
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
    }
    /**
     * On a Pagination changed, we will trigger a Grid State changed with the new pagination info
     * Also if we use Row Selection or the Checkbox Selector, we need to reset any selection
     */
    paginationChanged(pagination) {
        if (this.gridOptions.enableRowSelection || this.gridOptions.enableCheckboxSelector) {
            this.gridService.setSelectedRows([]);
        }
        this.gridStateService.onGridStateChanged.next({
            change: { newValues: pagination, type: GridStateType.pagination },
            gridState: this.gridStateService.getCurrentGridState()
        });
    }
    /**
     * When dataset changes, we need to refresh the entire grid UI & possibly resize it as well
     * @param dataset
     */
    refreshGridData(dataset, totalCount) {
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
                const delay = this.gridOptions.autoResize && this.gridOptions.autoResize.delay;
                this.resizer.resizeGrid(delay || 10);
            }
        }
    }
    /**
     * Dynamically change or update the column definitions list.
     * We will re-render the grid so that the new header and data shows up correctly.
     * If using i18n, we also need to trigger a re-translate of the column headers
     */
    updateColumnDefinitionsList(newColumnDefinitions) {
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
    }
    /** Toggle the filter row displayed on first row
     * @param isShowing
     */
    showHeaderRow(isShowing) {
        this.grid.setHeaderRowVisibility(isShowing);
        return isShowing;
    }
    /** Toggle the filter row displayed on first row */
    toggleHeaderRow() {
        const isShowing = !this.grid.getOptions().showHeaderRow;
        this.grid.setHeaderRowVisibility(isShowing);
        return isShowing;
    }
    //
    // private functions
    // ------------------
    /** Dispatch of Custom Event, which by default will bubble & is cancelable */
    dispatchCustomEvent(eventName, data, isBubbling = true, isCancelable = true) {
        const eventInit = { bubbles: isBubbling, cancelable: isCancelable };
        if (data) {
            eventInit.detail = data;
        }
        return this.elm.nativeElement.dispatchEvent(new CustomEvent(eventName, eventInit));
    }
    /** Load the Editor Collection asynchronously and replace the "collection" property when Observable resolves */
    loadEditorCollectionAsync(column) {
        const collectionAsync = column && column.editor && column.editor.collectionAsync;
        if (collectionAsync instanceof Observable) {
            this.subscriptions.push(collectionAsync.subscribe((resolvedCollection) => this.updateEditorCollection(column, resolvedCollection)));
        }
    }
    /**
     * For convenience to the user, we provide the property "editor" as an Angular-Slickgrid editor complex object
     * however "editor" is used internally by SlickGrid for it's own Editor Factory
     * so in our lib we will swap "editor" and copy it into a new property called "internalColumnEditor"
     * then take back "editor.model" and make it the new "editor" so that SlickGrid Editor Factory still works
     */
    swapInternalEditorToSlickGridFactoryEditor(columnDefinitions) {
        return columnDefinitions.map((column) => {
            // on every Editor that have a "collectionAsync", resolve the data and assign it to the "collection" property
            if (column.editor && column.editor.collectionAsync) {
                this.loadEditorCollectionAsync(column);
            }
            return Object.assign({}, column, { editor: column.editor && column.editor.model, internalColumnEditor: Object.assign({}, column.editor) });
        });
    }
    /**
     * Update the Editor "collection" property from an async call resolved
     * Since this is called after the async call resolves, the pointer will not be the same as the "column" argument passed.
     * Once we found the new pointer, we will reassign the "editor" and "collection" to the "internalColumnEditor" so it has newest collection
     */
    updateEditorCollection(column, newCollection) {
        column.editor.collection = newCollection;
        // find the new column reference pointer
        const columns = this.grid.getColumns();
        if (Array.isArray(columns)) {
            const columnRef = columns.find((col) => col.id === column.id);
            columnRef.internalColumnEditor = column.editor;
        }
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
export { AngularSlickgridComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1zbGlja2dyaWQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9jb21wb25lbnRzL2FuZ3VsYXItc2xpY2tncmlkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsK0JBQStCO0FBQy9CLGlHQUFpRztBQUNqRyxPQUFPLDBCQUEwQixDQUFDO0FBQ2xDLE9BQU8sdUNBQXVDLENBQUM7QUFDL0MsT0FBTyxzQkFBc0IsQ0FBQztBQUM5QixPQUFPLHNCQUFzQixDQUFDO0FBQzlCLE9BQU8sMEJBQTBCLENBQUM7QUFFbEMsNkJBQTZCO0FBQzdCLE9BQU8sRUFBaUIsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFxQixNQUFNLGVBQWUsQ0FBQztBQUN6SSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsU0FBUyxFQUFFLHlCQUF5QixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDL0UsT0FBTyxFQUFFLCtCQUErQixFQUFFLGNBQWMsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2hHLE9BQU8sRUFJTCxhQUFhLEVBSWIsYUFBYSxHQUVkLE1BQU0sbUJBQW1CLENBQUM7QUFDM0IsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFFOUQsV0FBVztBQUNYLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGtDQUFrQyxD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QXlFRyxvQkFBQSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUE7NkNBYkosVUFBVTtRQUNBLGFBQWE7UUFDVixnQkFBZ0I7UUFDaEIsZ0JBQWdCO1FBQ25CLGFBQWE7UUFDZixXQUFXO1FBQ04sZ0JBQWdCO1FBQ2hCLGdCQUFnQjtRQUNQLHlCQUF5QjtRQUMzQyxjQUFjO1FBQ1IsYUFBYTtRQUNmLFdBQVc7UUFDYixnQkFBZ0I7R0F2RTFCLHlCQUF5QixDQXVxQnJDO1NBdnFCWSx5QkFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbXBvcnQgM3JkIHBhcnR5IHZlbmRvciBsaWJzXHJcbi8vIG9ubHkgaW1wb3J0IHRoZSBuZWNlc3NhcnkgY29yZSBsaWIsIGVhY2ggd2lsbCBiZSBpbXBvcnRlZCBvbiBkZW1hbmQgd2hlbiBlbmFibGVkICh2aWEgcmVxdWlyZSlcclxuaW1wb3J0ICdqcXVlcnktdWktZGlzdC9qcXVlcnktdWknO1xyXG5pbXBvcnQgJ3NsaWNrZ3JpZC9saWIvanF1ZXJ5LmV2ZW50LmRyYWctMi4zLjAnO1xyXG5pbXBvcnQgJ3NsaWNrZ3JpZC9zbGljay5jb3JlJztcclxuaW1wb3J0ICdzbGlja2dyaWQvc2xpY2suZ3JpZCc7XHJcbmltcG9ydCAnc2xpY2tncmlkL3NsaWNrLmRhdGF2aWV3JztcclxuXHJcbi8vIC4uLnRoZW4gZXZlcnl0aGluZyBlbHNlLi4uXHJcbmltcG9ydCB7IEFmdGVyVmlld0luaXQsIENvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBJbmplY3QsIEluamVjdGFibGUsIElucHV0LCBPdXRwdXQsIE9uRGVzdHJveSwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcclxuaW1wb3J0IHsgR2xvYmFsR3JpZE9wdGlvbnMgfSBmcm9tICcuLy4uL2dsb2JhbC1ncmlkLW9wdGlvbnMnO1xyXG5pbXBvcnQgeyB0aXRsZUNhc2UsIHVuc3Vic2NyaWJlQWxsT2JzZXJ2YWJsZXMgfSBmcm9tICcuLy4uL3NlcnZpY2VzL3V0aWxpdGllcyc7XHJcbmltcG9ydCB7IGV4ZWN1dGVCYWNrZW5kUHJvY2Vzc2VzQ2FsbGJhY2ssIG9uQmFja2VuZEVycm9yIH0gZnJvbSAnLi4vc2VydmljZXMvYmFja2VuZC11dGlsaXRpZXMnO1xyXG5pbXBvcnQge1xyXG4gIEFuZ3VsYXJHcmlkSW5zdGFuY2UsXHJcbiAgQmFja2VuZFNlcnZpY2VPcHRpb24sXHJcbiAgQ29sdW1uLFxyXG4gIEV4dGVuc2lvbk5hbWUsXHJcbiAgR3JhcGhxbFJlc3VsdCxcclxuICBHcmlkT3B0aW9uLFxyXG4gIEdyaWRTdGF0ZUNoYW5nZSxcclxuICBHcmlkU3RhdGVUeXBlLFxyXG4gIFBhZ2luYXRpb24sXHJcbn0gZnJvbSAnLi8uLi9tb2RlbHMvaW5kZXgnO1xyXG5pbXBvcnQgeyBGaWx0ZXJGYWN0b3J5IH0gZnJvbSAnLi4vZmlsdGVycy9maWx0ZXJGYWN0b3J5JztcclxuaW1wb3J0IHsgU2xpY2tncmlkQ29uZmlnIH0gZnJvbSAnLi4vc2xpY2tncmlkLWNvbmZpZyc7XHJcbmltcG9ydCB7IGlzT2JzZXJ2YWJsZSwgT2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcblxyXG4vLyBTZXJ2aWNlc1xyXG5pbXBvcnQgeyBBbmd1bGFyVXRpbFNlcnZpY2UgfSBmcm9tICcuLy4uL3NlcnZpY2VzL2FuZ3VsYXJVdGlsU2VydmljZSc7XHJcbmltcG9ydCB7IEV4cG9ydFNlcnZpY2UgfSBmcm9tICcuLy4uL3NlcnZpY2VzL2V4cG9ydC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRXh0ZW5zaW9uU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2V4dGVuc2lvbi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRXh0ZW5zaW9uVXRpbGl0eSB9IGZyb20gJy4uL2V4dGVuc2lvbnMvZXh0ZW5zaW9uVXRpbGl0eSc7XHJcbmltcG9ydCB7IEZpbHRlclNlcnZpY2UgfSBmcm9tICcuLy4uL3NlcnZpY2VzL2ZpbHRlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgR3JhcGhxbFNlcnZpY2UgfSBmcm9tICcuLy4uL3NlcnZpY2VzL2dyYXBocWwuc2VydmljZSc7XHJcbmltcG9ydCB7IEdyaWRFdmVudFNlcnZpY2UgfSBmcm9tICcuLy4uL3NlcnZpY2VzL2dyaWRFdmVudC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgR3JpZFNlcnZpY2UgfSBmcm9tICcuLy4uL3NlcnZpY2VzL2dyaWQuc2VydmljZSc7XHJcbmltcG9ydCB7IEdyaWRTdGF0ZVNlcnZpY2UgfSBmcm9tICcuLy4uL3NlcnZpY2VzL2dyaWRTdGF0ZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgR3JvdXBpbmdBbmRDb2xzcGFuU2VydmljZSB9IGZyb20gJy4vLi4vc2VydmljZXMvZ3JvdXBpbmdBbmRDb2xzcGFuLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBSZXNpemVyU2VydmljZSB9IGZyb20gJy4vLi4vc2VydmljZXMvcmVzaXplci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU2hhcmVkU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3NoYXJlZC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU29ydFNlcnZpY2UgfSBmcm9tICcuLy4uL3NlcnZpY2VzL3NvcnQuc2VydmljZSc7XHJcblxyXG4vLyBFeHRlbnNpb25zIChTbGlja0dyaWQgQ29udHJvbHMgJiBQbHVnaW5zKVxyXG5pbXBvcnQgeyBBdXRvVG9vbHRpcEV4dGVuc2lvbiB9IGZyb20gJy4uL2V4dGVuc2lvbnMvYXV0b1Rvb2x0aXBFeHRlbnNpb24nO1xyXG5pbXBvcnQgeyBDZWxsRXh0ZXJuYWxDb3B5TWFuYWdlckV4dGVuc2lvbiB9IGZyb20gJy4uL2V4dGVuc2lvbnMvY2VsbEV4dGVybmFsQ29weU1hbmFnZXJFeHRlbnNpb24nO1xyXG5pbXBvcnQgeyBDaGVja2JveFNlbGVjdG9yRXh0ZW5zaW9uIH0gZnJvbSAnLi4vZXh0ZW5zaW9ucy9jaGVja2JveFNlbGVjdG9yRXh0ZW5zaW9uJztcclxuaW1wb3J0IHsgQ29sdW1uUGlja2VyRXh0ZW5zaW9uIH0gZnJvbSAnLi4vZXh0ZW5zaW9ucy9jb2x1bW5QaWNrZXJFeHRlbnNpb24nO1xyXG5pbXBvcnQgeyBEcmFnZ2FibGVHcm91cGluZ0V4dGVuc2lvbiB9IGZyb20gJy4uL2V4dGVuc2lvbnMvZHJhZ2dhYmxlR3JvdXBpbmdFeHRlbnNpb24nO1xyXG5pbXBvcnQgeyBHcmlkTWVudUV4dGVuc2lvbiB9IGZyb20gJy4uL2V4dGVuc2lvbnMvZ3JpZE1lbnVFeHRlbnNpb24nO1xyXG5pbXBvcnQgeyBHcm91cEl0ZW1NZXRhUHJvdmlkZXJFeHRlbnNpb24gfSBmcm9tICcuLi9leHRlbnNpb25zL2dyb3VwSXRlbU1ldGFQcm92aWRlckV4dGVuc2lvbic7XHJcbmltcG9ydCB7IEhlYWRlckJ1dHRvbkV4dGVuc2lvbiB9IGZyb20gJy4uL2V4dGVuc2lvbnMvaGVhZGVyQnV0dG9uRXh0ZW5zaW9uJztcclxuaW1wb3J0IHsgSGVhZGVyTWVudUV4dGVuc2lvbiB9IGZyb20gJy4uL2V4dGVuc2lvbnMvaGVhZGVyTWVudUV4dGVuc2lvbic7XHJcbmltcG9ydCB7IFJvd0RldGFpbFZpZXdFeHRlbnNpb24gfSBmcm9tICcuLi9leHRlbnNpb25zL3Jvd0RldGFpbFZpZXdFeHRlbnNpb24nO1xyXG5pbXBvcnQgeyBSb3dNb3ZlTWFuYWdlckV4dGVuc2lvbiB9IGZyb20gJy4uL2V4dGVuc2lvbnMvcm93TW92ZU1hbmFnZXJFeHRlbnNpb24nO1xyXG5pbXBvcnQgeyBSb3dTZWxlY3Rpb25FeHRlbnNpb24gfSBmcm9tICcuLi9leHRlbnNpb25zL3Jvd1NlbGVjdGlvbkV4dGVuc2lvbic7XHJcblxyXG4vLyB1c2luZyBleHRlcm5hbCBub24tdHlwZWQganMgbGlicmFyaWVzXHJcbmRlY2xhcmUgdmFyIFNsaWNrOiBhbnk7XHJcbmRlY2xhcmUgdmFyICQ6IGFueTtcclxuXHJcbmNvbnN0IHNsaWNrZ3JpZEV2ZW50UHJlZml4ID0gJ3NnJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhbmd1bGFyLXNsaWNrZ3JpZCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2FuZ3VsYXItc2xpY2tncmlkLmNvbXBvbmVudC5odG1sJyxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIC8vIG1ha2UgZXZlcnl0aGluZyB0cmFuc2llbnQgKG5vbi1zaW5nbGV0b24pXHJcbiAgICBBbmd1bGFyVXRpbFNlcnZpY2UsXHJcbiAgICBBdXRvVG9vbHRpcEV4dGVuc2lvbixcclxuICAgIENlbGxFeHRlcm5hbENvcHlNYW5hZ2VyRXh0ZW5zaW9uLFxyXG4gICAgQ2hlY2tib3hTZWxlY3RvckV4dGVuc2lvbixcclxuICAgIENvbHVtblBpY2tlckV4dGVuc2lvbixcclxuICAgIERyYWdnYWJsZUdyb3VwaW5nRXh0ZW5zaW9uLFxyXG4gICAgRXh0ZW5zaW9uU2VydmljZSxcclxuICAgIEV4cG9ydFNlcnZpY2UsXHJcbiAgICBFeHRlbnNpb25VdGlsaXR5LFxyXG4gICAgRmlsdGVyRmFjdG9yeSxcclxuICAgIEZpbHRlclNlcnZpY2UsXHJcbiAgICBHcmFwaHFsU2VydmljZSxcclxuICAgIEdyaWRFdmVudFNlcnZpY2UsXHJcbiAgICBHcmlkTWVudUV4dGVuc2lvbixcclxuICAgIEdyaWRTZXJ2aWNlLFxyXG4gICAgR3JpZFN0YXRlU2VydmljZSxcclxuICAgIEdyb3VwaW5nQW5kQ29sc3BhblNlcnZpY2UsXHJcbiAgICBHcm91cEl0ZW1NZXRhUHJvdmlkZXJFeHRlbnNpb24sXHJcbiAgICBIZWFkZXJCdXR0b25FeHRlbnNpb24sXHJcbiAgICBIZWFkZXJNZW51RXh0ZW5zaW9uLFxyXG4gICAgUmVzaXplclNlcnZpY2UsXHJcbiAgICBSb3dEZXRhaWxWaWV3RXh0ZW5zaW9uLFxyXG4gICAgUm93TW92ZU1hbmFnZXJFeHRlbnNpb24sXHJcbiAgICBSb3dTZWxlY3Rpb25FeHRlbnNpb24sXHJcbiAgICBTaGFyZWRTZXJ2aWNlLFxyXG4gICAgU29ydFNlcnZpY2UsXHJcbiAgICBTbGlja2dyaWRDb25maWdcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBbmd1bGFyU2xpY2tncmlkQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95LCBPbkluaXQge1xyXG4gIHByaXZhdGUgX2RhdGFzZXQ6IGFueVtdO1xyXG4gIHByaXZhdGUgX2NvbHVtbkRlZmluaXRpb25zOiBDb2x1bW5bXTtcclxuICBwcml2YXRlIF9ldmVudEhhbmRsZXI6IGFueSA9IG5ldyBTbGljay5FdmVudEhhbmRsZXIoKTtcclxuICBwcml2YXRlIF9maXhlZEhlaWdodDogbnVtYmVyIHwgbnVsbDtcclxuICBwcml2YXRlIF9maXhlZFdpZHRoOiBudW1iZXIgfCBudWxsO1xyXG4gIHByaXZhdGUgX2hpZGVIZWFkZXJSb3dBZnRlclBhZ2VMb2FkID0gZmFsc2U7XHJcbiAgZGF0YVZpZXc6IGFueTtcclxuICBncmlkOiBhbnk7XHJcbiAgZ3JpZFBhZ2luYXRpb25PcHRpb25zOiBHcmlkT3B0aW9uO1xyXG4gIGdyaWRIZWlnaHRTdHJpbmc6IHN0cmluZztcclxuICBncmlkV2lkdGhTdHJpbmc6IHN0cmluZztcclxuICBncm91cGluZ0RlZmluaXRpb246IGFueSA9IHt9O1xyXG4gIGdyb3VwSXRlbU1ldGFkYXRhUHJvdmlkZXI6IGFueTtcclxuICBzaG93UGFnaW5hdGlvbiA9IGZhbHNlO1xyXG4gIGlzR3JpZEluaXRpYWxpemVkID0gZmFsc2U7XHJcbiAgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcclxuXHJcbiAgQE91dHB1dCgpIG9uQW5ndWxhckdyaWRDcmVhdGVkID0gbmV3IEV2ZW50RW1pdHRlcjxBbmd1bGFyR3JpZEluc3RhbmNlPigpO1xyXG4gIEBPdXRwdXQoKSBvbkRhdGF2aWV3Q3JlYXRlZCA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gIEBPdXRwdXQoKSBvbkdyaWRDcmVhdGVkID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgQE91dHB1dCgpIG9uR3JpZEluaXRpYWxpemVkID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgQE91dHB1dCgpIG9uQmVmb3JlR3JpZENyZWF0ZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcclxuICBAT3V0cHV0KCkgb25CZWZvcmVHcmlkRGVzdHJveSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gIEBPdXRwdXQoKSBvbkFmdGVyR3JpZERlc3Ryb3llZCA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcclxuICBAT3V0cHV0KCkgb25HcmlkU3RhdGVDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcjxHcmlkU3RhdGVDaGFuZ2U+KCk7XHJcbiAgQElucHV0KCkgY3VzdG9tRGF0YVZpZXc6IGFueTtcclxuICBASW5wdXQoKSBncmlkSWQ6IHN0cmluZztcclxuICBASW5wdXQoKSBncmlkT3B0aW9uczogR3JpZE9wdGlvbjtcclxuXHJcbiAgQElucHV0KClcclxuICBzZXQgZ3JpZEhlaWdodChoZWlnaHQ6IG51bWJlcikge1xyXG4gICAgdGhpcy5fZml4ZWRIZWlnaHQgPSBoZWlnaHQ7XHJcbiAgfVxyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IGdyaWRXaWR0aCh3aWR0aDogbnVtYmVyKSB7XHJcbiAgICB0aGlzLl9maXhlZFdpZHRoID0gd2lkdGg7XHJcbiAgfVxyXG5cclxuICBASW5wdXQoKVxyXG4gIHNldCBjb2x1bW5EZWZpbml0aW9ucyhjb2x1bW5EZWZpbml0aW9uczogQ29sdW1uW10pIHtcclxuICAgIHRoaXMuX2NvbHVtbkRlZmluaXRpb25zID0gY29sdW1uRGVmaW5pdGlvbnM7XHJcbiAgICBpZiAodGhpcy5pc0dyaWRJbml0aWFsaXplZCkge1xyXG4gICAgICB0aGlzLnVwZGF0ZUNvbHVtbkRlZmluaXRpb25zTGlzdChjb2x1bW5EZWZpbml0aW9ucyk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGdldCBjb2x1bW5EZWZpbml0aW9ucygpOiBDb2x1bW5bXSB7XHJcbiAgICByZXR1cm4gdGhpcy5fY29sdW1uRGVmaW5pdGlvbnM7XHJcbiAgfVxyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IGRhdGFzZXQoZGF0YXNldDogYW55W10pIHtcclxuICAgIHRoaXMuX2RhdGFzZXQgPSBkYXRhc2V0O1xyXG4gICAgdGhpcy5yZWZyZXNoR3JpZERhdGEoZGF0YXNldCk7XHJcbiAgfVxyXG4gIGdldCBkYXRhc2V0KCk6IGFueVtdIHtcclxuICAgIHJldHVybiB0aGlzLmRhdGFWaWV3LmdldEl0ZW1zKCk7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgZWxtOiBFbGVtZW50UmVmLFxyXG4gICAgcHJpdmF0ZSBleHBvcnRTZXJ2aWNlOiBFeHBvcnRTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBleHRlbnNpb25TZXJ2aWNlOiBFeHRlbnNpb25TZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBleHRlbnNpb25VdGlsaXR5OiBFeHRlbnNpb25VdGlsaXR5LFxyXG4gICAgcHJpdmF0ZSBmaWx0ZXJTZXJ2aWNlOiBGaWx0ZXJTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBncmlkU2VydmljZTogR3JpZFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGdyaWRFdmVudFNlcnZpY2U6IEdyaWRFdmVudFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGdyaWRTdGF0ZVNlcnZpY2U6IEdyaWRTdGF0ZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGdyb3VwaW5nQW5kQ29sc3BhblNlcnZpY2U6IEdyb3VwaW5nQW5kQ29sc3BhblNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHJlc2l6ZXI6IFJlc2l6ZXJTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBzaGFyZWRTZXJ2aWNlOiBTaGFyZWRTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBzb3J0U2VydmljZTogU29ydFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHRyYW5zbGF0ZTogVHJhbnNsYXRlU2VydmljZSxcclxuICAgIEBJbmplY3QoJ2NvbmZpZycpIHByaXZhdGUgZm9yUm9vdENvbmZpZzogR3JpZE9wdGlvblxyXG4gICkgeyB9XHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5vbkJlZm9yZUdyaWRDcmVhdGUuZW1pdCh0cnVlKTtcclxuXHJcbiAgICBpZiAodGhpcy5ncmlkT3B0aW9ucyAmJiAhdGhpcy5ncmlkT3B0aW9ucy5lbmFibGVBdXRvUmVzaXplICYmICh0aGlzLl9maXhlZEhlaWdodCB8fCB0aGlzLl9maXhlZFdpZHRoKSkge1xyXG4gICAgICB0aGlzLmdyaWRIZWlnaHRTdHJpbmcgPSBgJHt0aGlzLl9maXhlZEhlaWdodH1weGA7XHJcbiAgICAgIHRoaXMuZ3JpZFdpZHRoU3RyaW5nID0gYCR7dGhpcy5fZml4ZWRXaWR0aH1weGA7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIHRoaXMub25CZWZvcmVHcmlkRGVzdHJveS5lbWl0KHRoaXMuZ3JpZCk7XHJcbiAgICB0aGlzLmRlc3Ryb3koKTtcclxuICAgIHRoaXMub25BZnRlckdyaWREZXN0cm95ZWQuZW1pdCh0cnVlKTtcclxuICB9XHJcblxyXG4gIGRlc3Ryb3koZW1wdHlEb21FbGVtZW50Q29udGFpbmVyID0gZmFsc2UpIHtcclxuICAgIGNvbnN0IGdyaWRDb250YWluZXJJZCA9IHRoaXMuZ3JpZE9wdGlvbnMgJiYgdGhpcy5ncmlkT3B0aW9ucy5ncmlkQ29udGFpbmVySWQ7XHJcbiAgICB0aGlzLmRhdGFWaWV3ID0gdW5kZWZpbmVkO1xyXG4gICAgdGhpcy5ncmlkT3B0aW9ucyA9IHt9O1xyXG4gICAgdGhpcy5leHRlbnNpb25TZXJ2aWNlLmRpc3Bvc2UoKTtcclxuICAgIHRoaXMuZmlsdGVyU2VydmljZS5kaXNwb3NlKCk7XHJcbiAgICB0aGlzLmdyaWRFdmVudFNlcnZpY2UuZGlzcG9zZSgpO1xyXG4gICAgdGhpcy5ncmlkU3RhdGVTZXJ2aWNlLmRpc3Bvc2UoKTtcclxuICAgIHRoaXMuZ3JvdXBpbmdBbmRDb2xzcGFuU2VydmljZS5kaXNwb3NlKCk7XHJcbiAgICB0aGlzLnJlc2l6ZXIuZGlzcG9zZSgpO1xyXG4gICAgdGhpcy5zb3J0U2VydmljZS5kaXNwb3NlKCk7XHJcbiAgICBpZiAodGhpcy5fZXZlbnRIYW5kbGVyICYmIHRoaXMuX2V2ZW50SGFuZGxlci51bnN1YnNjcmliZUFsbCkge1xyXG4gICAgICB0aGlzLl9ldmVudEhhbmRsZXIudW5zdWJzY3JpYmVBbGwoKTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmdyaWQgJiYgdGhpcy5ncmlkLmRlc3Ryb3kpIHtcclxuICAgICAgdGhpcy5ncmlkLmRlc3Ryb3koKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZW1wdHlEb21FbGVtZW50Q29udGFpbmVyKSB7XHJcbiAgICAgICQoZ3JpZENvbnRhaW5lcklkKS5lbXB0eSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGFsc28gdW5zdWJzY3JpYmUgYWxsIFJ4SlMgc3Vic2NyaXB0aW9uc1xyXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zID0gdW5zdWJzY3JpYmVBbGxPYnNlcnZhYmxlcyh0aGlzLnN1YnNjcmlwdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgdGhpcy5pbml0aWFsaXphdGlvbigpO1xyXG4gICAgdGhpcy5pc0dyaWRJbml0aWFsaXplZCA9IHRydWU7XHJcblxyXG4gICAgLy8gdXNlciBtdXN0IHByb3ZpZGUgYSBcImdyaWRIZWlnaHRcIiBvciB1c2UgXCJhdXRvUmVzaXplOiB0cnVlXCIgaW4gdGhlIGdyaWQgb3B0aW9uc1xyXG4gICAgaWYgKCF0aGlzLl9maXhlZEhlaWdodCAmJiAhdGhpcy5ncmlkT3B0aW9ucy5lbmFibGVBdXRvUmVzaXplKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihcclxuICAgICAgICBgW0FuZ3VsYXItU2xpY2tncmlkXSByZXF1aXJlcyBhIFwiZ3JpZC1oZWlnaHRcIiBvciB0aGUgXCJlbmFibGVBdXRvUmVzaXplXCIgZ3JpZCBvcHRpb24gdG8gYmUgZW5hYmxlZC5cclxuICAgICAgICBXaXRob3V0IHRoYXQgdGhlIGdyaWQgd2lsbCBzZWVtIGVtcHR5IHdoaWxlIGluIGZhY3QgaXQganVzdCBkb2VzIG5vdCBoYXZlIGFueSBoZWlnaHQgZGVmaW5lLmBcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGluaXRpYWxpemF0aW9uKCkge1xyXG4gICAgLy8gbWFrZSBzdXJlIHRoZSBkYXRhc2V0IGlzIGluaXRpYWxpemVkIChpZiBub3QgaXQgd2lsbCB0aHJvdyBhbiBlcnJvciB0aGF0IGl0IGNhbm5vdCBnZXRMZW5ndGggb2YgbnVsbClcclxuICAgIHRoaXMuX2RhdGFzZXQgPSB0aGlzLl9kYXRhc2V0IHx8IFtdO1xyXG4gICAgdGhpcy5ncmlkT3B0aW9ucyA9IHRoaXMubWVyZ2VHcmlkT3B0aW9ucyh0aGlzLmdyaWRPcHRpb25zKTtcclxuICAgIHRoaXMuY3JlYXRlQmFja2VuZEFwaUludGVybmFsUG9zdFByb2Nlc3NDYWxsYmFjayh0aGlzLmdyaWRPcHRpb25zKTtcclxuXHJcbiAgICBpZiAoIXRoaXMuY3VzdG9tRGF0YVZpZXcpIHtcclxuICAgICAgaWYgKHRoaXMuZ3JpZE9wdGlvbnMuZHJhZ2dhYmxlR3JvdXBpbmcgfHwgdGhpcy5ncmlkT3B0aW9ucy5lbmFibGVHcm91cGluZykge1xyXG4gICAgICAgIHRoaXMuZXh0ZW5zaW9uVXRpbGl0eS5sb2FkRXh0ZW5zaW9uRHluYW1pY2FsbHkoRXh0ZW5zaW9uTmFtZS5ncm91cEl0ZW1NZXRhUHJvdmlkZXIpO1xyXG4gICAgICAgIHRoaXMuZ3JvdXBJdGVtTWV0YWRhdGFQcm92aWRlciA9IG5ldyBTbGljay5EYXRhLkdyb3VwSXRlbU1ldGFkYXRhUHJvdmlkZXIoKTtcclxuICAgICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JvdXBJdGVtTWV0YWRhdGFQcm92aWRlciA9IHRoaXMuZ3JvdXBJdGVtTWV0YWRhdGFQcm92aWRlcjtcclxuICAgICAgICB0aGlzLmRhdGFWaWV3ID0gbmV3IFNsaWNrLkRhdGEuRGF0YVZpZXcoeyBncm91cEl0ZW1NZXRhZGF0YVByb3ZpZGVyOiB0aGlzLmdyb3VwSXRlbU1ldGFkYXRhUHJvdmlkZXIgfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5kYXRhVmlldyA9IG5ldyBTbGljay5EYXRhLkRhdGFWaWV3KCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBmb3IgY29udmVuaWVuY2UgdG8gdGhlIHVzZXIsIHdlIHByb3ZpZGUgdGhlIHByb3BlcnR5IFwiZWRpdG9yXCIgYXMgYW4gQW5ndWxhci1TbGlja2dyaWQgZWRpdG9yIGNvbXBsZXggb2JqZWN0XHJcbiAgICAvLyBob3dldmVyIFwiZWRpdG9yXCIgaXMgdXNlZCBpbnRlcm5hbGx5IGJ5IFNsaWNrR3JpZCBmb3IgaXQncyBvd24gRWRpdG9yIEZhY3RvcnlcclxuICAgIC8vIHNvIGluIG91ciBsaWIgd2Ugd2lsbCBzd2FwIFwiZWRpdG9yXCIgYW5kIGNvcHkgaXQgaW50byBhIG5ldyBwcm9wZXJ0eSBjYWxsZWQgXCJpbnRlcm5hbENvbHVtbkVkaXRvclwiXHJcbiAgICAvLyB0aGVuIHRha2UgYmFjayBcImVkaXRvci5tb2RlbFwiIGFuZCBtYWtlIGl0IHRoZSBuZXcgXCJlZGl0b3JcIiBzbyB0aGF0IFNsaWNrR3JpZCBFZGl0b3IgRmFjdG9yeSBzdGlsbCB3b3Jrc1xyXG4gICAgdGhpcy5fY29sdW1uRGVmaW5pdGlvbnMgPSB0aGlzLnN3YXBJbnRlcm5hbEVkaXRvclRvU2xpY2tHcmlkRmFjdG9yeUVkaXRvcih0aGlzLl9jb2x1bW5EZWZpbml0aW9ucyk7XHJcblxyXG4gICAgLy8gc2F2ZSByZWZlcmVuY2UgZm9yIGFsbCBjb2x1bW5zIGJlZm9yZSB0aGV5IG9wdGlvbmFsbHkgYmVjb21lIGhpZGRlbi92aXNpYmxlXHJcbiAgICB0aGlzLnNoYXJlZFNlcnZpY2UuYWxsQ29sdW1ucyA9IHRoaXMuX2NvbHVtbkRlZmluaXRpb25zO1xyXG4gICAgdGhpcy5zaGFyZWRTZXJ2aWNlLnZpc2libGVDb2x1bW5zID0gdGhpcy5fY29sdW1uRGVmaW5pdGlvbnM7XHJcbiAgICB0aGlzLmV4dGVuc2lvblNlcnZpY2UuY3JlYXRlRXh0ZW5zaW9uc0JlZm9yZUdyaWRDcmVhdGlvbih0aGlzLl9jb2x1bW5EZWZpbml0aW9ucywgdGhpcy5ncmlkT3B0aW9ucyk7XHJcblxyXG4gICAgLy8gYnVpbGQgU2xpY2tHcmlkIEdyaWQsIGFsc28gdXNlciBtaWdodCBvcHRpb25hbGx5IHBhc3MgYSBjdXN0b20gZGF0YXZpZXcgKGUuZy4gcmVtb3RlIG1vZGVsKVxyXG4gICAgdGhpcy5ncmlkID0gbmV3IFNsaWNrLkdyaWQoYCMke3RoaXMuZ3JpZElkfWAsIHRoaXMuY3VzdG9tRGF0YVZpZXcgfHwgdGhpcy5kYXRhVmlldywgdGhpcy5fY29sdW1uRGVmaW5pdGlvbnMsIHRoaXMuZ3JpZE9wdGlvbnMpO1xyXG5cclxuICAgIHRoaXMuc2hhcmVkU2VydmljZS5kYXRhVmlldyA9IHRoaXMuZGF0YVZpZXc7XHJcbiAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZCA9IHRoaXMuZ3JpZDtcclxuXHJcbiAgICB0aGlzLmV4dGVuc2lvblNlcnZpY2UuYmluZERpZmZlcmVudEV4dGVuc2lvbnMoKTtcclxuICAgIHRoaXMuYXR0YWNoRGlmZmVyZW50SG9va3ModGhpcy5ncmlkLCB0aGlzLmdyaWRPcHRpb25zLCB0aGlzLmRhdGFWaWV3KTtcclxuXHJcbiAgICAvLyBlbWl0IHRoZSBHcmlkICYgRGF0YVZpZXcgb2JqZWN0IHRvIG1ha2UgdGhlbSBhdmFpbGFibGUgaW4gcGFyZW50IGNvbXBvbmVudFxyXG4gICAgdGhpcy5vbkdyaWRDcmVhdGVkLmVtaXQodGhpcy5ncmlkKTtcclxuXHJcbiAgICAvLyBpbml0aWFsaXplIHRoZSBTbGlja0dyaWQgZ3JpZFxyXG4gICAgdGhpcy5ncmlkLmluaXQoKTtcclxuXHJcbiAgICBpZiAoIXRoaXMuY3VzdG9tRGF0YVZpZXcgJiYgKHRoaXMuZGF0YVZpZXcgJiYgdGhpcy5kYXRhVmlldy5iZWdpblVwZGF0ZSAmJiB0aGlzLmRhdGFWaWV3LnNldEl0ZW1zICYmIHRoaXMuZGF0YVZpZXcuZW5kVXBkYXRlKSkge1xyXG4gICAgICB0aGlzLm9uRGF0YXZpZXdDcmVhdGVkLmVtaXQodGhpcy5kYXRhVmlldyk7XHJcbiAgICAgIHRoaXMuZGF0YVZpZXcuYmVnaW5VcGRhdGUoKTtcclxuICAgICAgdGhpcy5kYXRhVmlldy5zZXRJdGVtcyh0aGlzLl9kYXRhc2V0LCB0aGlzLmdyaWRPcHRpb25zLmRhdGFzZXRJZFByb3BlcnR5TmFtZSk7XHJcbiAgICAgIHRoaXMuZGF0YVZpZXcuZW5kVXBkYXRlKCk7XHJcblxyXG4gICAgICAvLyBpZiB5b3UgZG9uJ3Qgd2FudCB0aGUgaXRlbXMgdGhhdCBhcmUgbm90IHZpc2libGUgKGR1ZSB0byBiZWluZyBmaWx0ZXJlZCBvdXQgb3IgYmVpbmcgb24gYSBkaWZmZXJlbnQgcGFnZSlcclxuICAgICAgLy8gdG8gc3RheSBzZWxlY3RlZCwgcGFzcyAnZmFsc2UnIHRvIHRoZSBzZWNvbmQgYXJnXHJcbiAgICAgIGlmICh0aGlzLmdyaWRPcHRpb25zICYmIHRoaXMuZ3JpZE9wdGlvbnMuZGF0YVZpZXcgJiYgdGhpcy5ncmlkT3B0aW9ucy5kYXRhVmlldy5oYXNPd25Qcm9wZXJ0eSgnc3luY0dyaWRTZWxlY3Rpb24nKSkge1xyXG4gICAgICAgIGNvbnN0IHN5bmNHcmlkU2VsZWN0aW9uID0gdGhpcy5ncmlkT3B0aW9ucy5kYXRhVmlldy5zeW5jR3JpZFNlbGVjdGlvbjtcclxuICAgICAgICBpZiAodHlwZW9mIHN5bmNHcmlkU2VsZWN0aW9uID09PSAnYm9vbGVhbicpIHtcclxuICAgICAgICAgIHRoaXMuZGF0YVZpZXcuc3luY0dyaWRTZWxlY3Rpb24odGhpcy5ncmlkLCB0aGlzLmdyaWRPcHRpb25zLmRhdGFWaWV3LnN5bmNHcmlkU2VsZWN0aW9uKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5kYXRhVmlldy5zeW5jR3JpZFNlbGVjdGlvbih0aGlzLmdyaWQsIHN5bmNHcmlkU2VsZWN0aW9uLnByZXNlcnZlSGlkZGVuLCBzeW5jR3JpZFNlbGVjdGlvbi5wcmVzZXJ2ZUhpZGRlbk9uU2VsZWN0aW9uQ2hhbmdlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyB1c2VyIG1pZ2h0IHdhbnQgdG8gaGlkZSB0aGUgaGVhZGVyIHJvdyBvbiBwYWdlIGxvYWQgYnV0IHN0aWxsIGhhdmUgYGVuYWJsZUZpbHRlcmluZzogdHJ1ZWBcclxuICAgIC8vIGlmIHRoYXQgaXMgdGhlIGNhc2UsIHdlIG5lZWQgdG8gaGlkZSB0aGUgaGVhZGVyUm93IE9OTFkgQUZURVIgYWxsIGZpbHRlcnMgZ290IGNyZWF0ZWQgJiBkYXRhVmlldyBleGlzdFxyXG4gICAgaWYgKHRoaXMuX2hpZGVIZWFkZXJSb3dBZnRlclBhZ2VMb2FkKSB7XHJcbiAgICAgIHRoaXMuc2hvd0hlYWRlclJvdyhmYWxzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gYWZ0ZXIgdGhlIERhdGFWaWV3IGlzIGNyZWF0ZWQgJiB1cGRhdGVkIGV4ZWN1dGUgc29tZSBwcm9jZXNzZXNcclxuICAgIHRoaXMuZXhlY3V0ZUFmdGVyRGF0YXZpZXdDcmVhdGVkKHRoaXMuZ3JpZCwgdGhpcy5ncmlkT3B0aW9ucywgdGhpcy5kYXRhVmlldyk7XHJcblxyXG4gICAgLy8gYXR0YWNoIHJlc2l6ZSBPTkxZIGFmdGVyIHRoZSBkYXRhVmlldyBpcyByZWFkeVxyXG4gICAgdGhpcy5hdHRhY2hSZXNpemVIb29rKHRoaXMuZ3JpZCwgdGhpcy5ncmlkT3B0aW9ucyk7XHJcblxyXG4gICAgLy8gYXR0YWNoIGdyb3VwaW5nIGFuZCBoZWFkZXIgZ3JvdXBpbmcgY29sc3BhbiBzZXJ2aWNlXHJcbiAgICBpZiAodGhpcy5ncmlkT3B0aW9ucy5jcmVhdGVQcmVIZWFkZXJQYW5lbCAmJiAhdGhpcy5ncmlkT3B0aW9ucy5lbmFibGVEcmFnZ2FibGVHcm91cGluZykge1xyXG4gICAgICB0aGlzLmdyb3VwaW5nQW5kQ29sc3BhblNlcnZpY2UuaW5pdCh0aGlzLmdyaWQsIHRoaXMuZGF0YVZpZXcpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGF0dGFjaCBncmlkICBzZXJ2aWNlXHJcbiAgICB0aGlzLmdyaWRTZXJ2aWNlLmluaXQodGhpcy5ncmlkLCB0aGlzLmRhdGFWaWV3KTtcclxuXHJcbiAgICAvLyB3aGVuIHVzZXIgZW5hYmxlcyB0cmFuc2xhdGlvbiwgd2UgbmVlZCB0byB0cmFuc2xhdGUgSGVhZGVycyBvbiBmaXJzdCBwYXNzICYgc3Vic2VxdWVudGx5IGluIHRoZSBhdHRhY2hEaWZmZXJlbnRIb29rc1xyXG4gICAgaWYgKHRoaXMuZ3JpZE9wdGlvbnMuZW5hYmxlVHJhbnNsYXRlKSB7XHJcbiAgICAgIHRoaXMuZXh0ZW5zaW9uU2VydmljZS50cmFuc2xhdGVDb2x1bW5IZWFkZXJzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gaWYgRXhwb3J0IGlzIGVuYWJsZWQsIGluaXRpYWxpemUgdGhlIHNlcnZpY2Ugd2l0aCB0aGUgbmVjZXNzYXJ5IGdyaWQgYW5kIG90aGVyIG9iamVjdHNcclxuICAgIGlmICh0aGlzLmdyaWRPcHRpb25zLmVuYWJsZUV4cG9ydCkge1xyXG4gICAgICB0aGlzLmV4cG9ydFNlcnZpY2UuaW5pdCh0aGlzLmdyaWQsIHRoaXMuZGF0YVZpZXcpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIG9uY2UgYWxsIGhvb2tzIGFyZSBpbiBwbGFjZWQgYW5kIHRoZSBncmlkIGlzIGluaXRpYWxpemVkLCB3ZSBjYW4gZW1pdCBhbiBldmVudFxyXG4gICAgdGhpcy5vbkdyaWRJbml0aWFsaXplZC5lbWl0KHRoaXMuZ3JpZCk7XHJcblxyXG4gICAgLy8gYXR0YWNoIHRoZSBCYWNrZW5kIFNlcnZpY2UgQVBJIGNhbGxiYWNrIGZ1bmN0aW9ucyBvbmx5IGFmdGVyIHRoZSBncmlkIGlzIGluaXRpYWxpemVkXHJcbiAgICAvLyBiZWNhdXNlIHRoZSBwcmVQcm9jZXNzKCkgYW5kIG9uSW5pdCgpIG1pZ2h0IGdldCB0cmlnZ2VyZWRcclxuICAgIGlmICh0aGlzLmdyaWRPcHRpb25zICYmIHRoaXMuZ3JpZE9wdGlvbnMuYmFja2VuZFNlcnZpY2VBcGkpIHtcclxuICAgICAgdGhpcy5hdHRhY2hCYWNrZW5kQ2FsbGJhY2tGdW5jdGlvbnModGhpcy5ncmlkT3B0aW9ucyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5ncmlkU3RhdGVTZXJ2aWNlLmluaXQodGhpcy5ncmlkLCB0aGlzLmV4dGVuc2lvblNlcnZpY2UsIHRoaXMuZmlsdGVyU2VydmljZSwgdGhpcy5zb3J0U2VydmljZSk7XHJcblxyXG4gICAgdGhpcy5vbkFuZ3VsYXJHcmlkQ3JlYXRlZC5lbWl0KHtcclxuICAgICAgLy8gU2xpY2sgR3JpZCAmIERhdGFWaWV3IG9iamVjdHNcclxuICAgICAgZGF0YVZpZXc6IHRoaXMuZGF0YVZpZXcsXHJcbiAgICAgIHNsaWNrR3JpZDogdGhpcy5ncmlkLFxyXG5cclxuICAgICAgLy8gcHVibGljIG1ldGhvZHNcclxuICAgICAgZGVzdHJveTogdGhpcy5kZXN0cm95LmJpbmQodGhpcyksXHJcblxyXG4gICAgICAvLyByZXR1cm4gYWxsIGF2YWlsYWJsZSBTZXJ2aWNlcyAobm9uLXNpbmdsZXRvbilcclxuICAgICAgYmFja2VuZFNlcnZpY2U6IHRoaXMuZ3JpZE9wdGlvbnMgJiYgdGhpcy5ncmlkT3B0aW9ucy5iYWNrZW5kU2VydmljZUFwaSAmJiB0aGlzLmdyaWRPcHRpb25zLmJhY2tlbmRTZXJ2aWNlQXBpLnNlcnZpY2UsXHJcbiAgICAgIGV4cG9ydFNlcnZpY2U6IHRoaXMuZXhwb3J0U2VydmljZSxcclxuICAgICAgZXh0ZW5zaW9uU2VydmljZTogdGhpcy5leHRlbnNpb25TZXJ2aWNlLFxyXG4gICAgICBmaWx0ZXJTZXJ2aWNlOiB0aGlzLmZpbHRlclNlcnZpY2UsXHJcbiAgICAgIGdyaWRFdmVudFNlcnZpY2U6IHRoaXMuZ3JpZEV2ZW50U2VydmljZSxcclxuICAgICAgZ3JpZFN0YXRlU2VydmljZTogdGhpcy5ncmlkU3RhdGVTZXJ2aWNlLFxyXG4gICAgICBncmlkU2VydmljZTogdGhpcy5ncmlkU2VydmljZSxcclxuICAgICAgZ3JvdXBpbmdTZXJ2aWNlOiB0aGlzLmdyb3VwaW5nQW5kQ29sc3BhblNlcnZpY2UsXHJcbiAgICAgIHJlc2l6ZXJTZXJ2aWNlOiB0aGlzLnJlc2l6ZXIsXHJcbiAgICAgIHNvcnRTZXJ2aWNlOiB0aGlzLnNvcnRTZXJ2aWNlLFxyXG5cclxuICAgICAgLyoqIEBkZXByZWNhdGVkIHBsZWFzZSB1c2UgXCJleHRlbnNpb25TZXJ2aWNlXCIgaW5zdGVhZCAqL1xyXG4gICAgICBwbHVnaW5TZXJ2aWNlOiB0aGlzLmV4dGVuc2lvblNlcnZpY2UsXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENvbW1pdHMgdGhlIGN1cnJlbnQgZWRpdCB0byB0aGUgZ3JpZFxyXG4gICAqL1xyXG4gIGNvbW1pdEVkaXQodGFyZ2V0OiBFbGVtZW50KSB7XHJcbiAgICBpZiAodGhpcy5ncmlkLmdldE9wdGlvbnMoKS5hdXRvQ29tbWl0RWRpdCkge1xyXG4gICAgICBjb25zdCBhY3RpdmVOb2RlID0gdGhpcy5ncmlkLmdldEFjdGl2ZUNlbGxOb2RlKCk7XHJcblxyXG4gICAgICAvLyBhIHRpbWVvdXQgbXVzdCBiZSBzZXQgb3IgdGhpcyBjb3VsZCBjb21lIGludG8gY29uZmxpY3Qgd2hlbiBzbGlja2dyaWRcclxuICAgICAgLy8gdHJpZXMgdG8gY29tbWl0IHRoZSBlZGl0IHdoZW4gZ29pbmcgZnJvbSBvbmUgZWRpdG9yIHRvIGFub3RoZXIgb24gdGhlIGdyaWRcclxuICAgICAgLy8gdGhyb3VnaCB0aGUgY2xpY2sgZXZlbnQuIElmIHRoZSB0aW1lb3V0IHdhcyBub3QgaGVyZSBpdCB3b3VsZFxyXG4gICAgICAvLyB0cnkgdG8gY29tbWl0L2Rlc3Ryb3kgdGhlIGVkaXRvciB0d2ljZSwgd2hpY2ggd291bGQgdGhyb3cgYSBqcXVlcnlcclxuICAgICAgLy8gZXJyb3IgYWJvdXQgdGhlIGVsZW1lbnQgbm90IGJlaW5nIGluIHRoZSBET01cclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgLy8gbWFrZSBzdXJlIHRoZSB0YXJnZXQgaXMgdGhlIGFjdGl2ZSBlZGl0b3Igc28gd2UgZG8gbm90XHJcbiAgICAgICAgLy8gY29tbWl0IHByZW1hdHVyZWx5XHJcbiAgICAgICAgaWYgKGFjdGl2ZU5vZGUgJiYgYWN0aXZlTm9kZS5jb250YWlucyh0YXJnZXQpICYmIHRoaXMuZ3JpZC5nZXRFZGl0b3JMb2NrKCkuaXNBY3RpdmUoKSkge1xyXG4gICAgICAgICAgdGhpcy5ncmlkLmdldEVkaXRvckxvY2soKS5jb21taXRDdXJyZW50RWRpdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEZWZpbmUgb3VyIGludGVybmFsIFBvc3QgUHJvY2VzcyBjYWxsYmFjaywgaXQgd2lsbCBleGVjdXRlIGludGVybmFsbHkgYWZ0ZXIgd2UgZ2V0IGJhY2sgcmVzdWx0IGZyb20gdGhlIFByb2Nlc3MgYmFja2VuZCBjYWxsXHJcbiAgICogRm9yIG5vdywgdGhpcyBpcyBHcmFwaFFMIFNlcnZpY2UgT05MWSBmZWF0dXJlIGFuZCBpdCB3aWxsIGJhc2ljYWxseSByZWZyZXNoIHRoZSBEYXRhc2V0ICYgUGFnaW5hdGlvbiB3aXRob3V0IGhhdmluZyB0aGUgdXNlciB0byBjcmVhdGUgaGlzIG93biBQb3N0UHJvY2VzcyBldmVyeSB0aW1lXHJcbiAgICovXHJcbiAgY3JlYXRlQmFja2VuZEFwaUludGVybmFsUG9zdFByb2Nlc3NDYWxsYmFjayhncmlkT3B0aW9uczogR3JpZE9wdGlvbikge1xyXG4gICAgaWYgKGdyaWRPcHRpb25zICYmIGdyaWRPcHRpb25zLmJhY2tlbmRTZXJ2aWNlQXBpKSB7XHJcbiAgICAgIGNvbnN0IGJhY2tlbmRBcGkgPSBncmlkT3B0aW9ucy5iYWNrZW5kU2VydmljZUFwaTtcclxuXHJcbiAgICAgIC8vIGludGVybmFsUG9zdFByb2Nlc3Mgb25seSB3b3JrcyB3aXRoIGEgR3JhcGhRTCBTZXJ2aWNlLCBzbyBtYWtlIHN1cmUgaXQgaXMgdGhhdCB0eXBlXHJcbiAgICAgIGlmIChiYWNrZW5kQXBpICYmIGJhY2tlbmRBcGkuc2VydmljZSAmJiBiYWNrZW5kQXBpLnNlcnZpY2UgaW5zdGFuY2VvZiBHcmFwaHFsU2VydmljZSkge1xyXG4gICAgICAgIGJhY2tlbmRBcGkuaW50ZXJuYWxQb3N0UHJvY2VzcyA9IChwcm9jZXNzUmVzdWx0OiBhbnkpID0+IHtcclxuICAgICAgICAgIGNvbnN0IGRhdGFzZXROYW1lID0gKGJhY2tlbmRBcGkgJiYgYmFja2VuZEFwaS5zZXJ2aWNlICYmIHR5cGVvZiBiYWNrZW5kQXBpLnNlcnZpY2UuZ2V0RGF0YXNldE5hbWUgPT09ICdmdW5jdGlvbicpID8gYmFja2VuZEFwaS5zZXJ2aWNlLmdldERhdGFzZXROYW1lKCkgOiAnJztcclxuICAgICAgICAgIGlmIChwcm9jZXNzUmVzdWx0ICYmIHByb2Nlc3NSZXN1bHQuZGF0YSAmJiBwcm9jZXNzUmVzdWx0LmRhdGFbZGF0YXNldE5hbWVdKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2RhdGFzZXQgPSBwcm9jZXNzUmVzdWx0LmRhdGFbZGF0YXNldE5hbWVdLm5vZGVzO1xyXG4gICAgICAgICAgICB0aGlzLnJlZnJlc2hHcmlkRGF0YSh0aGlzLl9kYXRhc2V0LCBwcm9jZXNzUmVzdWx0LmRhdGFbZGF0YXNldE5hbWVdLnRvdGFsQ291bnQpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fZGF0YXNldCA9IFtdO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGF0dGFjaERpZmZlcmVudEhvb2tzKGdyaWQ6IGFueSwgZ3JpZE9wdGlvbnM6IEdyaWRPcHRpb24sIGRhdGFWaWV3OiBhbnkpIHtcclxuICAgIC8vIG9uIGxvY2FsZSBjaGFuZ2UsIHdlIGhhdmUgdG8gbWFudWFsbHkgdHJhbnNsYXRlIHRoZSBIZWFkZXJzLCBHcmlkTWVudVxyXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXHJcbiAgICAgIHRoaXMudHJhbnNsYXRlLm9uTGFuZ0NoYW5nZS5zdWJzY3JpYmUoKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgaWYgKGdyaWRPcHRpb25zLmVuYWJsZVRyYW5zbGF0ZSkge1xyXG4gICAgICAgICAgdGhpcy5leHRlbnNpb25TZXJ2aWNlLnRyYW5zbGF0ZUNvbHVtbkhlYWRlcnMoKTtcclxuICAgICAgICAgIHRoaXMuZXh0ZW5zaW9uU2VydmljZS50cmFuc2xhdGVDb2x1bW5QaWNrZXIoKTtcclxuICAgICAgICAgIHRoaXMuZXh0ZW5zaW9uU2VydmljZS50cmFuc2xhdGVHcmlkTWVudSgpO1xyXG4gICAgICAgICAgdGhpcy5leHRlbnNpb25TZXJ2aWNlLnRyYW5zbGF0ZUhlYWRlck1lbnUoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG5cclxuICAgIC8vIGlmIHVzZXIgZW50ZXJlZCBzb21lIENvbHVtbnMgXCJwcmVzZXRzXCIsIHdlIG5lZWQgdG8gcmVmbGVjdCB0aGVtIGFsbCBpbiB0aGUgZ3JpZFxyXG4gICAgaWYgKGdyaWRPcHRpb25zLnByZXNldHMgJiYgQXJyYXkuaXNBcnJheShncmlkT3B0aW9ucy5wcmVzZXRzLmNvbHVtbnMpICYmIGdyaWRPcHRpb25zLnByZXNldHMuY29sdW1ucy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGNvbnN0IGdyaWRDb2x1bW5zOiBDb2x1bW5bXSA9IHRoaXMuZ3JpZFN0YXRlU2VydmljZS5nZXRBc3NvY2lhdGVkR3JpZENvbHVtbnMoZ3JpZCwgZ3JpZE9wdGlvbnMucHJlc2V0cy5jb2x1bW5zKTtcclxuICAgICAgaWYgKGdyaWRDb2x1bW5zICYmIEFycmF5LmlzQXJyYXkoZ3JpZENvbHVtbnMpICYmIGdyaWRDb2x1bW5zLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAvLyBtYWtlIHN1cmUgdGhhdCB0aGUgY2hlY2tib3ggc2VsZWN0b3IgaXMgYWxzbyB2aXNpYmxlIGlmIGl0IGlzIGVuYWJsZWRcclxuICAgICAgICBpZiAoZ3JpZE9wdGlvbnMuZW5hYmxlQ2hlY2tib3hTZWxlY3Rvcikge1xyXG4gICAgICAgICAgY29uc3QgY2hlY2tib3hDb2x1bW4gPSAoQXJyYXkuaXNBcnJheSh0aGlzLl9jb2x1bW5EZWZpbml0aW9ucykgJiYgdGhpcy5fY29sdW1uRGVmaW5pdGlvbnMubGVuZ3RoID4gMCkgPyB0aGlzLl9jb2x1bW5EZWZpbml0aW9uc1swXSA6IG51bGw7XHJcbiAgICAgICAgICBpZiAoY2hlY2tib3hDb2x1bW4gJiYgY2hlY2tib3hDb2x1bW4uaWQgPT09ICdfY2hlY2tib3hfc2VsZWN0b3InICYmIGdyaWRDb2x1bW5zWzBdLmlkICE9PSAnX2NoZWNrYm94X3NlbGVjdG9yJykge1xyXG4gICAgICAgICAgICBncmlkQ29sdW1ucy51bnNoaWZ0KGNoZWNrYm94Q29sdW1uKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGZpbmFsbHkgc2V0IHRoZSBuZXcgcHJlc2V0cyBjb2x1bW5zIChpbmNsdWRpbmcgY2hlY2tib3ggc2VsZWN0b3IgaWYgbmVlZCBiZSlcclxuICAgICAgICBncmlkLnNldENvbHVtbnMoZ3JpZENvbHVtbnMpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gYXR0YWNoIGV4dGVybmFsIHNvcnRpbmcgKGJhY2tlbmQpIHdoZW4gYXZhaWxhYmxlIG9yIGRlZmF1bHQgb25Tb3J0IChkYXRhVmlldylcclxuICAgIGlmIChncmlkT3B0aW9ucy5lbmFibGVTb3J0aW5nICYmICF0aGlzLmN1c3RvbURhdGFWaWV3KSB7XHJcbiAgICAgIGdyaWRPcHRpb25zLmJhY2tlbmRTZXJ2aWNlQXBpID8gdGhpcy5zb3J0U2VydmljZS5hdHRhY2hCYWNrZW5kT25Tb3J0KGdyaWQsIGRhdGFWaWV3KSA6IHRoaXMuc29ydFNlcnZpY2UuYXR0YWNoTG9jYWxPblNvcnQoZ3JpZCwgZGF0YVZpZXcpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGF0dGFjaCBleHRlcm5hbCBmaWx0ZXIgKGJhY2tlbmQpIHdoZW4gYXZhaWxhYmxlIG9yIGRlZmF1bHQgb25GaWx0ZXIgKGRhdGFWaWV3KVxyXG4gICAgaWYgKGdyaWRPcHRpb25zLmVuYWJsZUZpbHRlcmluZyAmJiAhdGhpcy5jdXN0b21EYXRhVmlldykge1xyXG4gICAgICB0aGlzLmZpbHRlclNlcnZpY2UuaW5pdChncmlkKTtcclxuXHJcbiAgICAgIC8vIGlmIHVzZXIgZW50ZXJlZCBzb21lIEZpbHRlciBcInByZXNldHNcIiwgd2UgbmVlZCB0byByZWZsZWN0IHRoZW0gYWxsIGluIHRoZSBET01cclxuICAgICAgaWYgKGdyaWRPcHRpb25zLnByZXNldHMgJiYgQXJyYXkuaXNBcnJheShncmlkT3B0aW9ucy5wcmVzZXRzLmZpbHRlcnMpICYmIGdyaWRPcHRpb25zLnByZXNldHMuZmlsdGVycy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgdGhpcy5maWx0ZXJTZXJ2aWNlLnBvcHVsYXRlQ29sdW1uRmlsdGVyU2VhcmNoVGVybXMoKTtcclxuICAgICAgfVxyXG4gICAgICBncmlkT3B0aW9ucy5iYWNrZW5kU2VydmljZUFwaSA/IHRoaXMuZmlsdGVyU2VydmljZS5hdHRhY2hCYWNrZW5kT25GaWx0ZXIoZ3JpZCwgdGhpcy5kYXRhVmlldykgOiB0aGlzLmZpbHRlclNlcnZpY2UuYXR0YWNoTG9jYWxPbkZpbHRlcihncmlkLCB0aGlzLmRhdGFWaWV3KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBpZiB1c2VyIHNldCBhbiBvbkluaXQgQmFja2VuZCwgd2UnbGwgcnVuIGl0IHJpZ2h0IGF3YXkgKGFuZCBpZiBzbywgd2UgYWxzbyBuZWVkIHRvIHJ1biBwcmVQcm9jZXNzLCBpbnRlcm5hbFBvc3RQcm9jZXNzICYgcG9zdFByb2Nlc3MpXHJcbiAgICBpZiAoZ3JpZE9wdGlvbnMuYmFja2VuZFNlcnZpY2VBcGkpIHtcclxuICAgICAgY29uc3QgYmFja2VuZEFwaSA9IGdyaWRPcHRpb25zLmJhY2tlbmRTZXJ2aWNlQXBpO1xyXG5cclxuICAgICAgaWYgKGJhY2tlbmRBcGkgJiYgYmFja2VuZEFwaS5zZXJ2aWNlICYmIGJhY2tlbmRBcGkuc2VydmljZS5pbml0KSB7XHJcbiAgICAgICAgYmFja2VuZEFwaS5zZXJ2aWNlLmluaXQoYmFja2VuZEFwaS5vcHRpb25zLCBncmlkT3B0aW9ucy5wYWdpbmF0aW9uLCB0aGlzLmdyaWQpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZXhwb3NlIGFsbCBTbGljayBHcmlkIEV2ZW50cyB0aHJvdWdoIGRpc3BhdGNoXHJcbiAgICBmb3IgKGNvbnN0IHByb3AgaW4gZ3JpZCkge1xyXG4gICAgICBpZiAoZ3JpZC5oYXNPd25Qcm9wZXJ0eShwcm9wKSAmJiBwcm9wLnN0YXJ0c1dpdGgoJ29uJykpIHtcclxuICAgICAgICB0aGlzLl9ldmVudEhhbmRsZXIuc3Vic2NyaWJlKGdyaWRbcHJvcF0sIChlOiBhbnksIGFyZ3M6IGFueSkgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXMuZGlzcGF0Y2hDdXN0b21FdmVudChgJHtzbGlja2dyaWRFdmVudFByZWZpeH0ke3RpdGxlQ2FzZShwcm9wKX1gLCB7IGV2ZW50RGF0YTogZSwgYXJncyB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGV4cG9zZSBhbGwgU2xpY2sgRGF0YVZpZXcgRXZlbnRzIHRocm91Z2ggZGlzcGF0Y2hcclxuICAgIGZvciAoY29uc3QgcHJvcCBpbiBkYXRhVmlldykge1xyXG4gICAgICBpZiAoZGF0YVZpZXcuaGFzT3duUHJvcGVydHkocHJvcCkgJiYgcHJvcC5zdGFydHNXaXRoKCdvbicpKSB7XHJcbiAgICAgICAgdGhpcy5fZXZlbnRIYW5kbGVyLnN1YnNjcmliZShkYXRhVmlld1twcm9wXSwgKGU6IGFueSwgYXJnczogYW55KSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gdGhpcy5kaXNwYXRjaEN1c3RvbUV2ZW50KGAke3NsaWNrZ3JpZEV2ZW50UHJlZml4fSR7dGl0bGVDYXNlKHByb3ApfWAsIHsgZXZlbnREYXRhOiBlLCBhcmdzIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZXhwb3NlIEdyaWRTdGF0ZSBTZXJ2aWNlIGNoYW5nZXMgZXZlbnQgdGhyb3VnaCBkaXNwYXRjaFxyXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXHJcbiAgICAgIHRoaXMuZ3JpZFN0YXRlU2VydmljZS5vbkdyaWRTdGF0ZUNoYW5nZWQuc3Vic2NyaWJlKChncmlkU3RhdGVDaGFuZ2U6IEdyaWRTdGF0ZUNoYW5nZSkgPT4ge1xyXG4gICAgICAgIHRoaXMub25HcmlkU3RhdGVDaGFuZ2VkLmVtaXQoZ3JpZFN0YXRlQ2hhbmdlKTtcclxuICAgICAgfSlcclxuICAgICk7XHJcblxyXG5cclxuICAgIC8vIG9uIGNlbGwgY2xpY2ssIG1haW5seSB1c2VkIHdpdGggdGhlIGNvbHVtbkRlZi5hY3Rpb24gY2FsbGJhY2tcclxuICAgIHRoaXMuZ3JpZEV2ZW50U2VydmljZS5hdHRhY2hPbkNlbGxDaGFuZ2UoZ3JpZCwgZGF0YVZpZXcpO1xyXG4gICAgdGhpcy5ncmlkRXZlbnRTZXJ2aWNlLmF0dGFjaE9uQ2xpY2soZ3JpZCwgZGF0YVZpZXcpO1xyXG5cclxuICAgIGlmIChkYXRhVmlldyAmJiBncmlkKSB7XHJcbiAgICAgIHRoaXMuX2V2ZW50SGFuZGxlci5zdWJzY3JpYmUoZGF0YVZpZXcub25Sb3dDb3VudENoYW5nZWQsIChlOiBhbnksIGFyZ3M6IGFueSkgPT4ge1xyXG4gICAgICAgIGdyaWQuaW52YWxpZGF0ZSgpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIC8vIHdpdGhvdXQgdGhpcywgZmlsdGVyaW5nIGRhdGEgd2l0aCBsb2NhbCBkYXRhc2V0IHdpbGwgbm90IGFsd2F5cyBzaG93IGNvcnJlY3RseVxyXG4gICAgICAvLyBhbHNvIGRvbid0IHVzZSBcImludmFsaWRhdGVSb3dzXCIgc2luY2UgaXQgZGVzdHJveXMgdGhlIGVudGlyZSByb3cgYW5kIGFzIGJhZCB1c2VyIGV4cGVyaWVuY2Ugd2hlbiB1cGRhdGluZyBhIHJvd1xyXG4gICAgICAvLyBzZWUgY29tbWl0OiBodHRwczovL2dpdGh1Yi5jb20vZ2hpc2NvZGluZy9Bbmd1bGFyLVNsaWNrZ3JpZC9jb21taXQvYmI2MmMwYWEyMzE0YTVkNjExODhmZjAwNWNjYjU2NDU3N2YwODgwNVxyXG4gICAgICBpZiAoZ3JpZE9wdGlvbnMgJiYgZ3JpZE9wdGlvbnMuZW5hYmxlRmlsdGVyaW5nICYmICFncmlkT3B0aW9ucy5lbmFibGVSb3dEZXRhaWxWaWV3KSB7XHJcbiAgICAgICAgdGhpcy5fZXZlbnRIYW5kbGVyLnN1YnNjcmliZShkYXRhVmlldy5vblJvd3NDaGFuZ2VkLCAoZTogYW55LCBhcmdzOiBhbnkpID0+IHtcclxuICAgICAgICAgIGlmIChhcmdzICYmIGFyZ3Mucm93cyAmJiBBcnJheS5pc0FycmF5KGFyZ3Mucm93cykpIHtcclxuICAgICAgICAgICAgYXJncy5yb3dzLmZvckVhY2goKHJvdykgPT4gZ3JpZC51cGRhdGVSb3cocm93KSk7XHJcbiAgICAgICAgICAgIGdyaWQucmVuZGVyKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBkb2VzIHRoZSB1c2VyIGhhdmUgYSBjb2xzcGFuIGNhbGxiYWNrP1xyXG4gICAgaWYgKGdyaWRPcHRpb25zLmNvbHNwYW5DYWxsYmFjaykge1xyXG4gICAgICB0aGlzLmRhdGFWaWV3LmdldEl0ZW1NZXRhZGF0YSA9IChyb3dOdW1iZXI6IG51bWJlcikgPT4ge1xyXG4gICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLmRhdGFWaWV3LmdldEl0ZW0ocm93TnVtYmVyKTtcclxuICAgICAgICByZXR1cm4gZ3JpZE9wdGlvbnMuY29sc3BhbkNhbGxiYWNrKGl0ZW0pO1xyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXR0YWNoQmFja2VuZENhbGxiYWNrRnVuY3Rpb25zKGdyaWRPcHRpb25zOiBHcmlkT3B0aW9uKSB7XHJcbiAgICBjb25zdCBiYWNrZW5kQXBpID0gZ3JpZE9wdGlvbnMuYmFja2VuZFNlcnZpY2VBcGk7XHJcbiAgICBjb25zdCBzZXJ2aWNlT3B0aW9uczogQmFja2VuZFNlcnZpY2VPcHRpb24gPSAoYmFja2VuZEFwaSAmJiBiYWNrZW5kQXBpLnNlcnZpY2UgJiYgYmFja2VuZEFwaS5zZXJ2aWNlLm9wdGlvbnMpID8gYmFja2VuZEFwaS5zZXJ2aWNlLm9wdGlvbnMgOiB7fTtcclxuICAgIGNvbnN0IGlzRXhlY3V0ZUNvbW1hbmRPbkluaXQgPSAoIXNlcnZpY2VPcHRpb25zKSA/IGZhbHNlIDogKChzZXJ2aWNlT3B0aW9ucyAmJiBzZXJ2aWNlT3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnZXhlY3V0ZVByb2Nlc3NDb21tYW5kT25Jbml0JykpID8gc2VydmljZU9wdGlvbnNbJ2V4ZWN1dGVQcm9jZXNzQ29tbWFuZE9uSW5pdCddIDogdHJ1ZSk7XHJcblxyXG4gICAgLy8gdXBkYXRlIGJhY2tlbmQgZmlsdGVycyAoaWYgbmVlZCBiZSkgYmVmb3JlIHRoZSBxdWVyeSBydW5zXHJcbiAgICBpZiAoYmFja2VuZEFwaSkge1xyXG4gICAgICBjb25zdCBiYWNrZW5kU2VydmljZSA9IGJhY2tlbmRBcGkuc2VydmljZTtcclxuXHJcbiAgICAgIC8vIGlmIHVzZXIgZW50ZXJlZCBzb21lIGFueSBcInByZXNldHNcIiwgd2UgbmVlZCB0byByZWZsZWN0IHRoZW0gYWxsIGluIHRoZSBncmlkXHJcbiAgICAgIGlmIChncmlkT3B0aW9ucyAmJiBncmlkT3B0aW9ucy5wcmVzZXRzKSB7XHJcbiAgICAgICAgLy8gRmlsdGVycyBcInByZXNldHNcIlxyXG4gICAgICAgIGlmIChiYWNrZW5kU2VydmljZSAmJiBiYWNrZW5kU2VydmljZS51cGRhdGVGaWx0ZXJzICYmIEFycmF5LmlzQXJyYXkoZ3JpZE9wdGlvbnMucHJlc2V0cy5maWx0ZXJzKSAmJiBncmlkT3B0aW9ucy5wcmVzZXRzLmZpbHRlcnMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgYmFja2VuZFNlcnZpY2UudXBkYXRlRmlsdGVycyhncmlkT3B0aW9ucy5wcmVzZXRzLmZpbHRlcnMsIHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBTb3J0ZXJzIFwicHJlc2V0c1wiXHJcbiAgICAgICAgaWYgKGJhY2tlbmRTZXJ2aWNlICYmIGJhY2tlbmRTZXJ2aWNlLnVwZGF0ZVNvcnRlcnMgJiYgQXJyYXkuaXNBcnJheShncmlkT3B0aW9ucy5wcmVzZXRzLnNvcnRlcnMpICYmIGdyaWRPcHRpb25zLnByZXNldHMuc29ydGVycy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICBiYWNrZW5kU2VydmljZS51cGRhdGVTb3J0ZXJzKHVuZGVmaW5lZCwgZ3JpZE9wdGlvbnMucHJlc2V0cy5zb3J0ZXJzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gUGFnaW5hdGlvbiBcInByZXNldHNcIlxyXG4gICAgICAgIGlmIChiYWNrZW5kU2VydmljZSAmJiBiYWNrZW5kU2VydmljZS51cGRhdGVQYWdpbmF0aW9uICYmIGdyaWRPcHRpb25zLnByZXNldHMucGFnaW5hdGlvbikge1xyXG4gICAgICAgICAgYmFja2VuZFNlcnZpY2UudXBkYXRlUGFnaW5hdGlvbihncmlkT3B0aW9ucy5wcmVzZXRzLnBhZ2luYXRpb24ucGFnZU51bWJlciwgZ3JpZE9wdGlvbnMucHJlc2V0cy5wYWdpbmF0aW9uLnBhZ2VTaXplKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc3QgY29sdW1uRmlsdGVycyA9IHRoaXMuZmlsdGVyU2VydmljZS5nZXRDb2x1bW5GaWx0ZXJzKCk7XHJcbiAgICAgICAgaWYgKGNvbHVtbkZpbHRlcnMgJiYgYmFja2VuZFNlcnZpY2UgJiYgYmFja2VuZFNlcnZpY2UudXBkYXRlRmlsdGVycykge1xyXG4gICAgICAgICAgYmFja2VuZFNlcnZpY2UudXBkYXRlRmlsdGVycyhjb2x1bW5GaWx0ZXJzLCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGJhY2tlbmRBcGkgJiYgYmFja2VuZEFwaS5zZXJ2aWNlICYmIChiYWNrZW5kQXBpLm9uSW5pdCB8fCBpc0V4ZWN1dGVDb21tYW5kT25Jbml0KSkge1xyXG4gICAgICBjb25zdCBxdWVyeSA9ICh0eXBlb2YgYmFja2VuZEFwaS5zZXJ2aWNlLmJ1aWxkUXVlcnkgPT09ICdmdW5jdGlvbicpID8gYmFja2VuZEFwaS5zZXJ2aWNlLmJ1aWxkUXVlcnkoKSA6ICcnO1xyXG4gICAgICBjb25zdCBwcm9jZXNzID0gKGlzRXhlY3V0ZUNvbW1hbmRPbkluaXQpID8gYmFja2VuZEFwaS5wcm9jZXNzKHF1ZXJ5KSA6IGJhY2tlbmRBcGkub25Jbml0KHF1ZXJ5KTtcclxuXHJcbiAgICAgIC8vIHdyYXAgdGhpcyBpbnNpZGUgYSBzZXRUaW1lb3V0IHRvIGF2b2lkIHRpbWluZyBpc3N1ZSBzaW5jZSB0aGUgZ3JpZE9wdGlvbnMgbmVlZHMgdG8gYmUgcmVhZHkgYmVmb3JlIHJ1bm5pbmcgdGhpcyBvbkluaXRcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgLy8ga2VlcCBzdGFydCB0aW1lICYgZW5kIHRpbWVzdGFtcHMgJiByZXR1cm4gaXQgYWZ0ZXIgcHJvY2VzcyBleGVjdXRpb25cclxuICAgICAgICBjb25zdCBzdGFydFRpbWUgPSBuZXcgRGF0ZSgpO1xyXG5cclxuICAgICAgICAvLyBydW4gYW55IHByZS1wcm9jZXNzLCBpZiBkZWZpbmVkLCBmb3IgZXhhbXBsZSBhIHNwaW5uZXJcclxuICAgICAgICBpZiAoYmFja2VuZEFwaS5wcmVQcm9jZXNzKSB7XHJcbiAgICAgICAgICBiYWNrZW5kQXBpLnByZVByb2Nlc3MoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAvLyB0aGUgcHJvY2Vzc2VzIGNhbiBiZSBPYnNlcnZhYmxlcyAobGlrZSBIdHRwQ2xpZW50KSBvciBQcm9taXNlc1xyXG4gICAgICAgICAgaWYgKHByb2Nlc3MgaW5zdGFuY2VvZiBQcm9taXNlICYmIHByb2Nlc3MudGhlbikge1xyXG4gICAgICAgICAgICBwcm9jZXNzLnRoZW4oKHByb2Nlc3NSZXN1bHQ6IEdyYXBocWxSZXN1bHQgfCBhbnkpID0+IGV4ZWN1dGVCYWNrZW5kUHJvY2Vzc2VzQ2FsbGJhY2soc3RhcnRUaW1lLCBwcm9jZXNzUmVzdWx0LCBiYWNrZW5kQXBpLCB0aGlzLmdyaWRPcHRpb25zKSk7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKGlzT2JzZXJ2YWJsZShwcm9jZXNzKSkge1xyXG4gICAgICAgICAgICBwcm9jZXNzLnN1YnNjcmliZShcclxuICAgICAgICAgICAgICAocHJvY2Vzc1Jlc3VsdDogR3JhcGhxbFJlc3VsdCB8IGFueSkgPT4gZXhlY3V0ZUJhY2tlbmRQcm9jZXNzZXNDYWxsYmFjayhzdGFydFRpbWUsIHByb2Nlc3NSZXN1bHQsIGJhY2tlbmRBcGksIHRoaXMuZ3JpZE9wdGlvbnMpLFxyXG4gICAgICAgICAgICAgIChlcnJvcjogYW55KSA9PiBvbkJhY2tlbmRFcnJvcihlcnJvciwgYmFja2VuZEFwaSlcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgb25CYWNrZW5kRXJyb3IoZXJyb3IsIGJhY2tlbmRBcGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhdHRhY2hSZXNpemVIb29rKGdyaWQ6IGFueSwgb3B0aW9uczogR3JpZE9wdGlvbikge1xyXG4gICAgLy8gZXhwYW5kL2F1dG9maXQgY29sdW1ucyBvbiBmaXJzdCBwYWdlIGxvYWRcclxuICAgIGlmIChncmlkICYmIG9wdGlvbnMuYXV0b0ZpdENvbHVtbnNPbkZpcnN0TG9hZCAmJiBvcHRpb25zLmVuYWJsZUF1dG9TaXplQ29sdW1ucykge1xyXG4gICAgICBncmlkLmF1dG9zaXplQ29sdW1ucygpO1xyXG5cclxuICAgICAgLy8gY29tcGVuc2F0ZSBhbnl0aW1lIFNsaWNrR3JpZCBtZWFzdXJlU2Nyb2xsYmFyIGlzIGluY29ycmVjdCAob25seSBzZWVtcyB0byBoYXBwZW4gaW4gQ2hyb21lIDEvNSBjb21wdXRlcnMpXHJcbiAgICAgIHRoaXMucmVzaXplci5jb21wZW5zYXRlSG9yaXpvbnRhbFNjcm9sbCh0aGlzLmdyaWQsIHRoaXMuZ3JpZE9wdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGF1dG8tcmVzaXplIGdyaWQgb24gYnJvd3NlciByZXNpemVcclxuICAgIGlmICh0aGlzLl9maXhlZEhlaWdodCB8fCB0aGlzLl9maXhlZFdpZHRoKSB7XHJcbiAgICAgIHRoaXMucmVzaXplci5pbml0KGdyaWQsIHsgaGVpZ2h0OiB0aGlzLl9maXhlZEhlaWdodCwgd2lkdGg6IHRoaXMuX2ZpeGVkV2lkdGggfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnJlc2l6ZXIuaW5pdChncmlkKTtcclxuICAgIH1cclxuICAgIGlmIChvcHRpb25zLmVuYWJsZUF1dG9SZXNpemUpIHtcclxuICAgICAgdGhpcy5yZXNpemVyLmJpbmRBdXRvUmVzaXplRGF0YUdyaWQoKTtcclxuICAgICAgaWYgKGdyaWQgJiYgb3B0aW9ucy5hdXRvRml0Q29sdW1uc09uRmlyc3RMb2FkICYmIG9wdGlvbnMuZW5hYmxlQXV0b1NpemVDb2x1bW5zKSB7XHJcbiAgICAgICAgZ3JpZC5hdXRvc2l6ZUNvbHVtbnMoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZXhlY3V0ZUFmdGVyRGF0YXZpZXdDcmVhdGVkKGdyaWQ6IGFueSwgZ3JpZE9wdGlvbnM6IEdyaWRPcHRpb24sIGRhdGFWaWV3OiBhbnkpIHtcclxuICAgIC8vIGlmIHVzZXIgZW50ZXJlZCBzb21lIFNvcnQgXCJwcmVzZXRzXCIsIHdlIG5lZWQgdG8gcmVmbGVjdCB0aGVtIGFsbCBpbiB0aGUgRE9NXHJcbiAgICBpZiAoZ3JpZE9wdGlvbnMuZW5hYmxlU29ydGluZykge1xyXG4gICAgICBpZiAoZ3JpZE9wdGlvbnMucHJlc2V0cyAmJiBBcnJheS5pc0FycmF5KGdyaWRPcHRpb25zLnByZXNldHMuc29ydGVycykgJiYgZ3JpZE9wdGlvbnMucHJlc2V0cy5zb3J0ZXJzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICB0aGlzLnNvcnRTZXJ2aWNlLmxvYWRMb2NhbFByZXNldHMoZ3JpZCwgZGF0YVZpZXcpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBtZXJnZUdyaWRPcHRpb25zKGdyaWRPcHRpb25zKTogR3JpZE9wdGlvbiB7XHJcbiAgICBncmlkT3B0aW9ucy5ncmlkSWQgPSB0aGlzLmdyaWRJZDtcclxuICAgIGdyaWRPcHRpb25zLmdyaWRDb250YWluZXJJZCA9IGBzbGlja0dyaWRDb250YWluZXItJHt0aGlzLmdyaWRJZH1gO1xyXG5cclxuICAgIC8vIHVzZSBqcXVlcnkgZXh0ZW5kIHRvIGRlZXAgbWVyZ2UgJiBjb3B5IHRvIGF2b2lkIGltbXV0YWJsZSBwcm9wZXJ0aWVzIGJlaW5nIGNoYW5nZWQgaW4gR2xvYmFsR3JpZE9wdGlvbnMgYWZ0ZXIgYSByb3V0ZSBjaGFuZ2VcclxuICAgIGNvbnN0IG9wdGlvbnMgPSAkLmV4dGVuZCh0cnVlLCB7fSwgR2xvYmFsR3JpZE9wdGlvbnMsIHRoaXMuZm9yUm9vdENvbmZpZywgZ3JpZE9wdGlvbnMpO1xyXG5cclxuICAgIC8vIHVzaW5nIGpRdWVyeSBleHRlbmQgdG8gZG8gYSBkZWVwIGNsb25lIGhhcyBhbiB1bndhbnRlZCBzaWRlIG9uIG9iamVjdHMgYW5kIHBhZ2VTaXplcyBidXQgRVM2IHNwcmVhZCBoYXMgb3RoZXIgd29yc3Qgc2lkZSBlZmZlY3RzXHJcbiAgICAvLyBzbyB3ZSB3aWxsIGp1c3Qgb3ZlcndyaXRlIHRoZSBwYWdlU2l6ZXMgd2hlbiBuZWVkZWQsIHRoaXMgaXMgdGhlIG9ubHkgb25lIGNhdXNpbmcgaXNzdWVzIHNvIGZhci5cclxuICAgIC8vIGpRdWVyeSB3cm90ZSB0aGlzIG9uIHRoZWlyIGRvY3M6OiBPbiBhIGRlZXAgZXh0ZW5kLCBPYmplY3QgYW5kIEFycmF5IGFyZSBleHRlbmRlZCwgYnV0IG9iamVjdCB3cmFwcGVycyBvbiBwcmltaXRpdmUgdHlwZXMgc3VjaCBhcyBTdHJpbmcsIEJvb2xlYW4sIGFuZCBOdW1iZXIgYXJlIG5vdC5cclxuICAgIGlmIChncmlkT3B0aW9ucyAmJiBncmlkT3B0aW9ucy5iYWNrZW5kU2VydmljZUFwaSkge1xyXG4gICAgICBpZiAoZ3JpZE9wdGlvbnMucGFnaW5hdGlvbiAmJiBBcnJheS5pc0FycmF5KGdyaWRPcHRpb25zLnBhZ2luYXRpb24ucGFnZVNpemVzKSAmJiBncmlkT3B0aW9ucy5wYWdpbmF0aW9uLnBhZ2VTaXplcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgb3B0aW9ucy5wYWdpbmF0aW9uLnBhZ2VTaXplcyA9IGdyaWRPcHRpb25zLnBhZ2luYXRpb24ucGFnZVNpemVzO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gYWxzbyBtYWtlIHN1cmUgdG8gc2hvdyB0aGUgaGVhZGVyIHJvdyBpZiB1c2VyIGhhdmUgZW5hYmxlZCBmaWx0ZXJpbmdcclxuICAgIHRoaXMuX2hpZGVIZWFkZXJSb3dBZnRlclBhZ2VMb2FkID0gKG9wdGlvbnMuc2hvd0hlYWRlclJvdyA9PT0gZmFsc2UpO1xyXG4gICAgaWYgKG9wdGlvbnMuZW5hYmxlRmlsdGVyaW5nICYmICFvcHRpb25zLnNob3dIZWFkZXJSb3cpIHtcclxuICAgICAgb3B0aW9ucy5zaG93SGVhZGVyUm93ID0gb3B0aW9ucy5lbmFibGVGaWx0ZXJpbmc7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gb3B0aW9ucztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE9uIGEgUGFnaW5hdGlvbiBjaGFuZ2VkLCB3ZSB3aWxsIHRyaWdnZXIgYSBHcmlkIFN0YXRlIGNoYW5nZWQgd2l0aCB0aGUgbmV3IHBhZ2luYXRpb24gaW5mb1xyXG4gICAqIEFsc28gaWYgd2UgdXNlIFJvdyBTZWxlY3Rpb24gb3IgdGhlIENoZWNrYm94IFNlbGVjdG9yLCB3ZSBuZWVkIHRvIHJlc2V0IGFueSBzZWxlY3Rpb25cclxuICAgKi9cclxuICBwYWdpbmF0aW9uQ2hhbmdlZChwYWdpbmF0aW9uOiBQYWdpbmF0aW9uKSB7XHJcbiAgICBpZiAodGhpcy5ncmlkT3B0aW9ucy5lbmFibGVSb3dTZWxlY3Rpb24gfHwgdGhpcy5ncmlkT3B0aW9ucy5lbmFibGVDaGVja2JveFNlbGVjdG9yKSB7XHJcbiAgICAgIHRoaXMuZ3JpZFNlcnZpY2Uuc2V0U2VsZWN0ZWRSb3dzKFtdKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmdyaWRTdGF0ZVNlcnZpY2Uub25HcmlkU3RhdGVDaGFuZ2VkLm5leHQoe1xyXG4gICAgICBjaGFuZ2U6IHsgbmV3VmFsdWVzOiBwYWdpbmF0aW9uLCB0eXBlOiBHcmlkU3RhdGVUeXBlLnBhZ2luYXRpb24gfSxcclxuICAgICAgZ3JpZFN0YXRlOiB0aGlzLmdyaWRTdGF0ZVNlcnZpY2UuZ2V0Q3VycmVudEdyaWRTdGF0ZSgpXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZW4gZGF0YXNldCBjaGFuZ2VzLCB3ZSBuZWVkIHRvIHJlZnJlc2ggdGhlIGVudGlyZSBncmlkIFVJICYgcG9zc2libHkgcmVzaXplIGl0IGFzIHdlbGxcclxuICAgKiBAcGFyYW0gZGF0YXNldFxyXG4gICAqL1xyXG4gIHJlZnJlc2hHcmlkRGF0YShkYXRhc2V0OiBhbnlbXSwgdG90YWxDb3VudD86IG51bWJlcikge1xyXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YXNldCkgJiYgdGhpcy5ncmlkICYmIHRoaXMuZGF0YVZpZXcgJiYgdHlwZW9mIHRoaXMuZGF0YVZpZXcuc2V0SXRlbXMgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgdGhpcy5kYXRhVmlldy5zZXRJdGVtcyhkYXRhc2V0LCB0aGlzLmdyaWRPcHRpb25zLmRhdGFzZXRJZFByb3BlcnR5TmFtZSk7XHJcbiAgICAgIGlmICghdGhpcy5ncmlkT3B0aW9ucy5iYWNrZW5kU2VydmljZUFwaSkge1xyXG4gICAgICAgIHRoaXMuZGF0YVZpZXcucmVTb3J0KCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChkYXRhc2V0KSB7XHJcbiAgICAgICAgdGhpcy5ncmlkLmludmFsaWRhdGUoKTtcclxuICAgICAgICB0aGlzLmdyaWQucmVuZGVyKCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICh0aGlzLmdyaWRPcHRpb25zLmJhY2tlbmRTZXJ2aWNlQXBpKSB7XHJcbiAgICAgICAgLy8gZG8gd2Ugd2FudCB0byBzaG93IHBhZ2luYXRpb24/XHJcbiAgICAgICAgLy8gaWYgd2UgaGF2ZSBhIGJhY2tlbmRTZXJ2aWNlQXBpIGFuZCB0aGUgZW5hYmxlUGFnaW5hdGlvbiBpcyB1bmRlZmluZWQsIHdlJ2xsIGFzc3VtZSB0aGF0IHdlIGRvIHdhbnQgdG8gc2VlIGl0LCBlbHNlIGdldCB0aGF0IGRlZmluZWQgdmFsdWVcclxuICAgICAgICB0aGlzLnNob3dQYWdpbmF0aW9uID0gKCh0aGlzLmdyaWRPcHRpb25zLmJhY2tlbmRTZXJ2aWNlQXBpICYmIHRoaXMuZ3JpZE9wdGlvbnMuZW5hYmxlUGFnaW5hdGlvbiA9PT0gdW5kZWZpbmVkKSA/IHRydWUgOiB0aGlzLmdyaWRPcHRpb25zLmVuYWJsZVBhZ2luYXRpb24pIHx8IGZhbHNlO1xyXG5cclxuICAgICAgICAvLyBiZWZvcmUgbWVyZ2luZyB0aGUgZ3JpZCBvcHRpb25zLCBtYWtlIHN1cmUgdGhhdCBpdCBoYXMgdGhlIHRvdGFsSXRlbXMgY291bnRcclxuICAgICAgICAvLyBvbmNlIHdlIGhhdmUgdGhhdCwgd2UgY2FuIG1lcmdlIGFuZCBwYXNzIGFsbCB0aGVzZSBvcHRpb25zIHRvIHRoZSBwYWdpbmF0aW9uIGNvbXBvbmVudFxyXG4gICAgICAgIGlmICghdGhpcy5ncmlkT3B0aW9ucy5wYWdpbmF0aW9uKSB7XHJcbiAgICAgICAgICB0aGlzLmdyaWRPcHRpb25zLnBhZ2luYXRpb24gPSAodGhpcy5ncmlkT3B0aW9ucy5wYWdpbmF0aW9uKSA/IHRoaXMuZ3JpZE9wdGlvbnMucGFnaW5hdGlvbiA6IHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuZ3JpZE9wdGlvbnMucGFnaW5hdGlvbiAmJiB0b3RhbENvdW50ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgIHRoaXMuZ3JpZE9wdGlvbnMucGFnaW5hdGlvbi50b3RhbEl0ZW1zID0gdG90YWxDb3VudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuZ3JpZE9wdGlvbnMucHJlc2V0cyAmJiB0aGlzLmdyaWRPcHRpb25zLnByZXNldHMucGFnaW5hdGlvbiAmJiB0aGlzLmdyaWRPcHRpb25zLnBhZ2luYXRpb24pIHtcclxuICAgICAgICAgIHRoaXMuZ3JpZE9wdGlvbnMucGFnaW5hdGlvbi5wYWdlU2l6ZSA9IHRoaXMuZ3JpZE9wdGlvbnMucHJlc2V0cy5wYWdpbmF0aW9uLnBhZ2VTaXplO1xyXG4gICAgICAgICAgdGhpcy5ncmlkT3B0aW9ucy5wYWdpbmF0aW9uLnBhZ2VOdW1iZXIgPSB0aGlzLmdyaWRPcHRpb25zLnByZXNldHMucGFnaW5hdGlvbi5wYWdlTnVtYmVyO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmdyaWRQYWdpbmF0aW9uT3B0aW9ucyA9IHRoaXMubWVyZ2VHcmlkT3B0aW9ucyh0aGlzLmdyaWRPcHRpb25zKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gcmVzaXplIHRoZSBncmlkIGluc2lkZSBhIHNsaWdodCB0aW1lb3V0LCBpbiBjYXNlIG90aGVyIERPTSBlbGVtZW50IGNoYW5nZWQgcHJpb3IgdG8gdGhlIHJlc2l6ZSAobGlrZSBhIGZpbHRlci9wYWdpbmF0aW9uIGNoYW5nZWQpXHJcbiAgICAgIGlmICh0aGlzLmdyaWQgJiYgdGhpcy5ncmlkT3B0aW9ucy5lbmFibGVBdXRvUmVzaXplKSB7XHJcbiAgICAgICAgY29uc3QgZGVsYXkgPSB0aGlzLmdyaWRPcHRpb25zLmF1dG9SZXNpemUgJiYgdGhpcy5ncmlkT3B0aW9ucy5hdXRvUmVzaXplLmRlbGF5O1xyXG4gICAgICAgIHRoaXMucmVzaXplci5yZXNpemVHcmlkKGRlbGF5IHx8IDEwKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRHluYW1pY2FsbHkgY2hhbmdlIG9yIHVwZGF0ZSB0aGUgY29sdW1uIGRlZmluaXRpb25zIGxpc3QuXHJcbiAgICogV2Ugd2lsbCByZS1yZW5kZXIgdGhlIGdyaWQgc28gdGhhdCB0aGUgbmV3IGhlYWRlciBhbmQgZGF0YSBzaG93cyB1cCBjb3JyZWN0bHkuXHJcbiAgICogSWYgdXNpbmcgaTE4biwgd2UgYWxzbyBuZWVkIHRvIHRyaWdnZXIgYSByZS10cmFuc2xhdGUgb2YgdGhlIGNvbHVtbiBoZWFkZXJzXHJcbiAgICovXHJcbiAgdXBkYXRlQ29sdW1uRGVmaW5pdGlvbnNMaXN0KG5ld0NvbHVtbkRlZmluaXRpb25zKSB7XHJcbiAgICAvLyBtYXAvc3dhcCB0aGUgaW50ZXJuYWwgbGlicmFyeSBFZGl0b3IgdG8gdGhlIFNsaWNrR3JpZCBFZGl0b3IgZmFjdG9yeVxyXG4gICAgbmV3Q29sdW1uRGVmaW5pdGlvbnMgPSB0aGlzLnN3YXBJbnRlcm5hbEVkaXRvclRvU2xpY2tHcmlkRmFjdG9yeUVkaXRvcihuZXdDb2x1bW5EZWZpbml0aW9ucyk7XHJcblxyXG4gICAgaWYgKHRoaXMuZ3JpZE9wdGlvbnMuZW5hYmxlVHJhbnNsYXRlKSB7XHJcbiAgICAgIHRoaXMuZXh0ZW5zaW9uU2VydmljZS50cmFuc2xhdGVDb2x1bW5IZWFkZXJzKGZhbHNlLCBuZXdDb2x1bW5EZWZpbml0aW9ucyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmV4dGVuc2lvblNlcnZpY2UucmVuZGVyQ29sdW1uSGVhZGVycyhuZXdDb2x1bW5EZWZpbml0aW9ucyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuZ3JpZE9wdGlvbnMgJiYgdGhpcy5ncmlkT3B0aW9ucy5lbmFibGVBdXRvU2l6ZUNvbHVtbnMpIHtcclxuICAgICAgdGhpcy5ncmlkLmF1dG9zaXplQ29sdW1ucygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIFRvZ2dsZSB0aGUgZmlsdGVyIHJvdyBkaXNwbGF5ZWQgb24gZmlyc3Qgcm93XHJcbiAgICogQHBhcmFtIGlzU2hvd2luZ1xyXG4gICAqL1xyXG4gIHNob3dIZWFkZXJSb3coaXNTaG93aW5nOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLmdyaWQuc2V0SGVhZGVyUm93VmlzaWJpbGl0eShpc1Nob3dpbmcpO1xyXG4gICAgcmV0dXJuIGlzU2hvd2luZztcclxuICB9XHJcblxyXG4gIC8qKiBUb2dnbGUgdGhlIGZpbHRlciByb3cgZGlzcGxheWVkIG9uIGZpcnN0IHJvdyAqL1xyXG4gIHRvZ2dsZUhlYWRlclJvdygpIHtcclxuICAgIGNvbnN0IGlzU2hvd2luZyA9ICF0aGlzLmdyaWQuZ2V0T3B0aW9ucygpLnNob3dIZWFkZXJSb3c7XHJcbiAgICB0aGlzLmdyaWQuc2V0SGVhZGVyUm93VmlzaWJpbGl0eShpc1Nob3dpbmcpO1xyXG4gICAgcmV0dXJuIGlzU2hvd2luZztcclxuICB9XHJcblxyXG4gIC8vXHJcbiAgLy8gcHJpdmF0ZSBmdW5jdGlvbnNcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgLyoqIERpc3BhdGNoIG9mIEN1c3RvbSBFdmVudCwgd2hpY2ggYnkgZGVmYXVsdCB3aWxsIGJ1YmJsZSAmIGlzIGNhbmNlbGFibGUgKi9cclxuICBwcml2YXRlIGRpc3BhdGNoQ3VzdG9tRXZlbnQoZXZlbnROYW1lOiBzdHJpbmcsIGRhdGE/OiBhbnksIGlzQnViYmxpbmc6IGJvb2xlYW4gPSB0cnVlLCBpc0NhbmNlbGFibGU6IGJvb2xlYW4gPSB0cnVlKSB7XHJcbiAgICBjb25zdCBldmVudEluaXQ6IEN1c3RvbUV2ZW50SW5pdCA9IHsgYnViYmxlczogaXNCdWJibGluZywgY2FuY2VsYWJsZTogaXNDYW5jZWxhYmxlIH07XHJcbiAgICBpZiAoZGF0YSkge1xyXG4gICAgICBldmVudEluaXQuZGV0YWlsID0gZGF0YTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLmVsbS5uYXRpdmVFbGVtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KGV2ZW50TmFtZSwgZXZlbnRJbml0KSk7XHJcbiAgfVxyXG5cclxuICAvKiogTG9hZCB0aGUgRWRpdG9yIENvbGxlY3Rpb24gYXN5bmNocm9ub3VzbHkgYW5kIHJlcGxhY2UgdGhlIFwiY29sbGVjdGlvblwiIHByb3BlcnR5IHdoZW4gT2JzZXJ2YWJsZSByZXNvbHZlcyAqL1xyXG4gIHByaXZhdGUgbG9hZEVkaXRvckNvbGxlY3Rpb25Bc3luYyhjb2x1bW46IENvbHVtbikge1xyXG4gICAgY29uc3QgY29sbGVjdGlvbkFzeW5jID0gY29sdW1uICYmIGNvbHVtbi5lZGl0b3IgJiYgY29sdW1uLmVkaXRvci5jb2xsZWN0aW9uQXN5bmM7XHJcbiAgICBpZiAoY29sbGVjdGlvbkFzeW5jIGluc3RhbmNlb2YgT2JzZXJ2YWJsZSkge1xyXG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcclxuICAgICAgICBjb2xsZWN0aW9uQXN5bmMuc3Vic2NyaWJlKChyZXNvbHZlZENvbGxlY3Rpb24pID0+IHRoaXMudXBkYXRlRWRpdG9yQ29sbGVjdGlvbihjb2x1bW4sIHJlc29sdmVkQ29sbGVjdGlvbikpXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBGb3IgY29udmVuaWVuY2UgdG8gdGhlIHVzZXIsIHdlIHByb3ZpZGUgdGhlIHByb3BlcnR5IFwiZWRpdG9yXCIgYXMgYW4gQW5ndWxhci1TbGlja2dyaWQgZWRpdG9yIGNvbXBsZXggb2JqZWN0XHJcbiAgICogaG93ZXZlciBcImVkaXRvclwiIGlzIHVzZWQgaW50ZXJuYWxseSBieSBTbGlja0dyaWQgZm9yIGl0J3Mgb3duIEVkaXRvciBGYWN0b3J5XHJcbiAgICogc28gaW4gb3VyIGxpYiB3ZSB3aWxsIHN3YXAgXCJlZGl0b3JcIiBhbmQgY29weSBpdCBpbnRvIGEgbmV3IHByb3BlcnR5IGNhbGxlZCBcImludGVybmFsQ29sdW1uRWRpdG9yXCJcclxuICAgKiB0aGVuIHRha2UgYmFjayBcImVkaXRvci5tb2RlbFwiIGFuZCBtYWtlIGl0IHRoZSBuZXcgXCJlZGl0b3JcIiBzbyB0aGF0IFNsaWNrR3JpZCBFZGl0b3IgRmFjdG9yeSBzdGlsbCB3b3Jrc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgc3dhcEludGVybmFsRWRpdG9yVG9TbGlja0dyaWRGYWN0b3J5RWRpdG9yKGNvbHVtbkRlZmluaXRpb25zOiBDb2x1bW5bXSkge1xyXG4gICAgcmV0dXJuIGNvbHVtbkRlZmluaXRpb25zLm1hcCgoY29sdW1uOiBDb2x1bW4gfCBhbnkpID0+IHtcclxuICAgICAgLy8gb24gZXZlcnkgRWRpdG9yIHRoYXQgaGF2ZSBhIFwiY29sbGVjdGlvbkFzeW5jXCIsIHJlc29sdmUgdGhlIGRhdGEgYW5kIGFzc2lnbiBpdCB0byB0aGUgXCJjb2xsZWN0aW9uXCIgcHJvcGVydHlcclxuICAgICAgaWYgKGNvbHVtbi5lZGl0b3IgJiYgY29sdW1uLmVkaXRvci5jb2xsZWN0aW9uQXN5bmMpIHtcclxuICAgICAgICB0aGlzLmxvYWRFZGl0b3JDb2xsZWN0aW9uQXN5bmMoY29sdW1uKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4geyAuLi5jb2x1bW4sIGVkaXRvcjogY29sdW1uLmVkaXRvciAmJiBjb2x1bW4uZWRpdG9yLm1vZGVsLCBpbnRlcm5hbENvbHVtbkVkaXRvcjogeyAuLi5jb2x1bW4uZWRpdG9yIH0gfTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXBkYXRlIHRoZSBFZGl0b3IgXCJjb2xsZWN0aW9uXCIgcHJvcGVydHkgZnJvbSBhbiBhc3luYyBjYWxsIHJlc29sdmVkXHJcbiAgICogU2luY2UgdGhpcyBpcyBjYWxsZWQgYWZ0ZXIgdGhlIGFzeW5jIGNhbGwgcmVzb2x2ZXMsIHRoZSBwb2ludGVyIHdpbGwgbm90IGJlIHRoZSBzYW1lIGFzIHRoZSBcImNvbHVtblwiIGFyZ3VtZW50IHBhc3NlZC5cclxuICAgKiBPbmNlIHdlIGZvdW5kIHRoZSBuZXcgcG9pbnRlciwgd2Ugd2lsbCByZWFzc2lnbiB0aGUgXCJlZGl0b3JcIiBhbmQgXCJjb2xsZWN0aW9uXCIgdG8gdGhlIFwiaW50ZXJuYWxDb2x1bW5FZGl0b3JcIiBzbyBpdCBoYXMgbmV3ZXN0IGNvbGxlY3Rpb25cclxuICAgKi9cclxuICBwcml2YXRlIHVwZGF0ZUVkaXRvckNvbGxlY3Rpb24oY29sdW1uOiBDb2x1bW4sIG5ld0NvbGxlY3Rpb246IGFueVtdKSB7XHJcbiAgICBjb2x1bW4uZWRpdG9yLmNvbGxlY3Rpb24gPSBuZXdDb2xsZWN0aW9uO1xyXG5cclxuICAgIC8vIGZpbmQgdGhlIG5ldyBjb2x1bW4gcmVmZXJlbmNlIHBvaW50ZXJcclxuICAgIGNvbnN0IGNvbHVtbnMgPSB0aGlzLmdyaWQuZ2V0Q29sdW1ucygpO1xyXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoY29sdW1ucykpIHtcclxuICAgICAgY29uc3QgY29sdW1uUmVmOiBDb2x1bW4gPSBjb2x1bW5zLmZpbmQoKGNvbDogQ29sdW1uKSA9PiBjb2wuaWQgPT09IGNvbHVtbi5pZCk7XHJcbiAgICAgIGNvbHVtblJlZi5pbnRlcm5hbENvbHVtbkVkaXRvciA9IGNvbHVtbi5lZGl0b3I7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==