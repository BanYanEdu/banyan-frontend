import * as tslib_1 from "tslib";
// import common 3rd party SlickGrid plugins/libs
import 'slickgrid/plugins/slick.cellrangedecorator';
import 'slickgrid/plugins/slick.cellrangeselector';
import 'slickgrid/plugins/slick.cellselectionmodel';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ExtensionName, } from '../models/index';
import { AutoTooltipExtension, CellExternalCopyManagerExtension, CheckboxSelectorExtension, ColumnPickerExtension, DraggableGroupingExtension, GridMenuExtension, GroupItemMetaProviderExtension, HeaderButtonExtension, HeaderMenuExtension, RowDetailViewExtension, RowMoveManagerExtension, RowSelectionExtension, } from '../extensions/index';
import { SharedService } from './shared.service';
var ExtensionService = /** @class */ (function () {
    function ExtensionService(autoTooltipExtension, cellExternalCopyExtension, checkboxSelectorExtension, columnPickerExtension, draggableGroupingExtension, gridMenuExtension, groupItemMetaExtension, headerButtonExtension, headerMenuExtension, rowDetailViewExtension, rowMoveManagerExtension, rowSelectionExtension, sharedService, translate) {
        this.autoTooltipExtension = autoTooltipExtension;
        this.cellExternalCopyExtension = cellExternalCopyExtension;
        this.checkboxSelectorExtension = checkboxSelectorExtension;
        this.columnPickerExtension = columnPickerExtension;
        this.draggableGroupingExtension = draggableGroupingExtension;
        this.gridMenuExtension = gridMenuExtension;
        this.groupItemMetaExtension = groupItemMetaExtension;
        this.headerButtonExtension = headerButtonExtension;
        this.headerMenuExtension = headerMenuExtension;
        this.rowDetailViewExtension = rowDetailViewExtension;
        this.rowMoveManagerExtension = rowMoveManagerExtension;
        this.rowSelectionExtension = rowSelectionExtension;
        this.sharedService = sharedService;
        this.translate = translate;
        this._extensionList = [];
    }
    /** Dispose of all the controls & plugins */
    ExtensionService.prototype.dispose = function () {
        this.sharedService.grid = null;
        this.sharedService.visibleColumns = [];
        // dispose of each control/plugin & reset the list
        this._extensionList.forEach(function (item) {
            if (item && item.class && item.class.dispose) {
                item.class.dispose();
            }
        });
        this._extensionList = [];
    };
    /** Get all columns (includes visible and non-visible) */
    ExtensionService.prototype.getAllColumns = function () {
        return this.sharedService.allColumns || [];
    };
    /** Get only visible columns */
    ExtensionService.prototype.getVisibleColumns = function () {
        return this.sharedService.visibleColumns || [];
    };
    /** Get all Extensions */
    ExtensionService.prototype.getAllExtensions = function () {
        return this._extensionList;
    };
    /**
     * Get an Extension by it's name
     *  @param name
     */
    ExtensionService.prototype.getExtensionByName = function (name) {
        return this._extensionList.find(function (p) { return p.name === name; });
    };
    /**
     * Get the instance of the SlickGrid addon (control or plugin).
     * This is the raw addon coming directly from SlickGrid itself, not to confuse with Angular-Slickgrid extension
     *  @param name
     */
    ExtensionService.prototype.getSlickgridAddonInstance = function (name) {
        var extension = this.getExtensionByName(name);
        if (extension && (extension.instance || extension.addon)) {
            return extension.instance;
        }
        return null;
    };
    /** Auto-resize all the column in the grid to fit the grid width */
    ExtensionService.prototype.autoResizeColumns = function () {
        this.sharedService.grid.autosizeColumns();
    };
    /** Attach/Create different Controls or Plugins after the Grid is created */
    ExtensionService.prototype.bindDifferentExtensions = function () {
        var _this = this;
        if (this.sharedService && this.sharedService.gridOptions) {
            // make sure all columns are translated before creating ColumnPicker/GridMenu Controls
            // this is to avoid having hidden columns not being translated on first load
            if (this.sharedService.gridOptions.enableTranslate) {
                this.translateItems(this.sharedService.allColumns, 'headerKey', 'name');
            }
            // Auto Tooltip Plugin
            if (this.sharedService.gridOptions.enableAutoTooltip) {
                if (this.autoTooltipExtension && this.autoTooltipExtension.register) {
                    var instance = this.autoTooltipExtension.register();
                    this._extensionList.push({ name: ExtensionName.autoTooltip, class: this.autoTooltipExtension, addon: instance, instance: instance });
                }
            }
            // Cell External Copy Manager Plugin (Excel Like)
            if (this.sharedService.gridOptions.enableExcelCopyBuffer) {
                if (this.cellExternalCopyExtension && this.cellExternalCopyExtension.register) {
                    var instance = this.cellExternalCopyExtension.register();
                    this._extensionList.push({ name: ExtensionName.cellExternalCopyManager, class: this.cellExternalCopyExtension, addon: instance, instance: instance });
                }
            }
            // Checkbox Selector Plugin
            if (this.sharedService.gridOptions.enableCheckboxSelector) {
                if (this.checkboxSelectorExtension && this.checkboxSelectorExtension.register) {
                    var rowSelectionExtension = this.getExtensionByName(ExtensionName.rowSelection);
                    var instance = this.checkboxSelectorExtension.register(rowSelectionExtension);
                    this._extensionList.push({ name: ExtensionName.checkboxSelector, class: this.checkboxSelectorExtension, addon: instance, instance: instance });
                }
            }
            // Column Picker Control
            if (this.sharedService.gridOptions.enableColumnPicker) {
                if (this.columnPickerExtension && this.columnPickerExtension.register) {
                    var instance = this.columnPickerExtension.register();
                    this._extensionList.push({ name: ExtensionName.columnPicker, class: this.columnPickerExtension, addon: instance, instance: instance });
                }
            }
            // Draggable Grouping Plugin
            if (this.sharedService.gridOptions.enableDraggableGrouping) {
                if (this.draggableGroupingExtension && this.draggableGroupingExtension.register) {
                    var instance = this.draggableGroupingExtension.register();
                    this._extensionList.push({ name: ExtensionName.draggableGrouping, class: this.draggableGroupingExtension, addon: instance, instance: instance });
                }
            }
            // Grid Menu Control
            if (this.sharedService.gridOptions.enableGridMenu) {
                if (this.gridMenuExtension && this.gridMenuExtension.register) {
                    var instance = this.gridMenuExtension.register();
                    this._extensionList.push({ name: ExtensionName.gridMenu, class: this.gridMenuExtension, addon: instance, instance: instance });
                }
            }
            // Grouping Plugin
            // register the group item metadata provider to add expand/collapse group handlers
            if (this.sharedService.gridOptions.enableDraggableGrouping || this.sharedService.gridOptions.enableGrouping) {
                if (this.groupItemMetaExtension && this.groupItemMetaExtension.register) {
                    var instance = this.groupItemMetaExtension.register();
                    this._extensionList.push({ name: ExtensionName.groupItemMetaProvider, class: this.groupItemMetaExtension, addon: instance, instance: instance });
                }
            }
            // Header Button Plugin
            if (this.sharedService.gridOptions.enableHeaderButton) {
                if (this.headerButtonExtension && this.headerButtonExtension.register) {
                    var instance = this.headerButtonExtension.register();
                    this._extensionList.push({ name: ExtensionName.headerButton, class: this.headerButtonExtension, addon: instance, instance: instance });
                }
            }
            // Header Menu Plugin
            if (this.sharedService.gridOptions.enableHeaderMenu) {
                if (this.headerMenuExtension && this.headerMenuExtension.register) {
                    var instance = this.headerMenuExtension.register();
                    this._extensionList.push({ name: ExtensionName.headerMenu, class: this.headerMenuExtension, addon: instance, instance: instance });
                }
            }
            // Row Detail View Plugin
            if (this.sharedService.gridOptions.enableRowDetailView) {
                if (this.rowDetailViewExtension && this.rowDetailViewExtension.register) {
                    var rowSelectionExtension = this.getExtensionByName(ExtensionName.rowSelection);
                    var instance = this.rowDetailViewExtension.register(rowSelectionExtension);
                    this._extensionList.push({ name: ExtensionName.rowDetailView, class: this.rowDetailViewExtension, addon: instance, instance: instance });
                }
            }
            // Row Move Manager Plugin
            if (this.sharedService.gridOptions.enableRowMoveManager) {
                if (this.rowMoveManagerExtension && this.rowMoveManagerExtension.register) {
                    var instance = this.rowMoveManagerExtension.register();
                    this._extensionList.push({ name: ExtensionName.rowMoveManager, class: this.rowMoveManagerExtension, addon: instance, instance: instance });
                }
            }
            // Row Selection Plugin
            if (!this.sharedService.gridOptions.enableCheckboxSelector && this.sharedService.gridOptions.enableRowSelection) {
                if (this.rowSelectionExtension && this.rowSelectionExtension.register) {
                    var instance = this.rowSelectionExtension.register();
                    this._extensionList.push({ name: ExtensionName.rowSelection, class: this.rowSelectionExtension, addon: instance, instance: instance });
                }
            }
            // manually register other plugins
            if (this.sharedService.gridOptions.registerPlugins !== undefined) {
                if (Array.isArray(this.sharedService.gridOptions.registerPlugins)) {
                    this.sharedService.gridOptions.registerPlugins.forEach(function (plugin) {
                        var instance = _this.sharedService.grid.registerPlugin(plugin);
                        _this._extensionList.push({ name: ExtensionName.noname, class: null, addon: instance, instance: instance });
                    });
                }
                else {
                    this.sharedService.grid.registerPlugin(this.sharedService.gridOptions.registerPlugins);
                    var plugin = this.sharedService.gridOptions.registerPlugins;
                    var instance = this.sharedService.grid.registerPlugin(plugin);
                    this._extensionList.push({ name: ExtensionName.noname, class: null, addon: instance, instance: instance });
                }
            }
        }
    };
    /**
     * Attach/Create certain plugins before the Grid creation, else they might behave oddly.
     * Mostly because the column definitions might change after the grid creation
     * @param columnDefinitions
     * @param options
     */
    ExtensionService.prototype.createExtensionsBeforeGridCreation = function (columnDefinitions, options) {
        if (options.enableCheckboxSelector) {
            this.checkboxSelectorExtension.create(columnDefinitions, options);
        }
        if (options.enableRowDetailView) {
            this.rowDetailViewExtension.create(columnDefinitions, options);
        }
        if (options.enableDraggableGrouping) {
            var plugin = this.draggableGroupingExtension.create(options);
            options.enableColumnReorder = plugin.getSetupColumnReorder;
        }
    };
    /** Hide a column from the grid */
    ExtensionService.prototype.hideColumn = function (column) {
        if (this.sharedService && this.sharedService.grid && this.sharedService.grid.getColumns && this.sharedService.grid.setColumns) {
            var columnIndex = this.sharedService.grid.getColumnIndex(column.id);
            this.sharedService.visibleColumns = this.removeColumnByIndex(this.sharedService.grid.getColumns(), columnIndex);
            this.sharedService.grid.setColumns(this.sharedService.visibleColumns);
        }
    };
    /** Refresh the dataset through the Backend Service */
    ExtensionService.prototype.refreshBackendDataset = function (gridOptions) {
        this.gridMenuExtension.refreshBackendDataset(gridOptions);
    };
    /**
     * Remove a column from the grid by it's index in the grid
     * @param columns input
     * @param index
     */
    ExtensionService.prototype.removeColumnByIndex = function (columns, index) {
        if (Array.isArray(columns)) {
            return columns.filter(function (el, i) { return index !== i; });
        }
        return columns;
    };
    /** Translate the Column Picker and it's last 2 checkboxes */
    ExtensionService.prototype.translateColumnPicker = function () {
        if (this.columnPickerExtension && this.columnPickerExtension.translateColumnPicker) {
            this.columnPickerExtension.translateColumnPicker();
        }
    };
    /**
     * Translate the Header Menu titles, we need to loop through all column definition to re-translate them
     */
    ExtensionService.prototype.translateGridMenu = function () {
        if (this.gridMenuExtension && this.gridMenuExtension.translateGridMenu) {
            this.gridMenuExtension.translateGridMenu();
        }
    };
    /**
     * Translate the Header Menu titles, we need to loop through all column definition to re-translate them
     */
    ExtensionService.prototype.translateHeaderMenu = function () {
        if (this.headerMenuExtension && this.headerMenuExtension.translateHeaderMenu) {
            this.headerMenuExtension.translateHeaderMenu();
        }
    };
    /**
     * Translate manually the header titles.
     * We could optionally pass a locale (that will change currently loaded locale), else it will use current locale
     * @param locale to use
     * @param new column definitions (optional)
     */
    ExtensionService.prototype.translateColumnHeaders = function (locale, newColumnDefinitions) {
        if (locale) {
            this.translate.use(locale);
        }
        var columnDefinitions = newColumnDefinitions;
        if (!columnDefinitions) {
            columnDefinitions = this.sharedService.columnDefinitions;
        }
        this.translateItems(columnDefinitions, 'headerKey', 'name');
        this.translateItems(this.sharedService.allColumns, 'headerKey', 'name');
        // re-render the column headers
        this.renderColumnHeaders(columnDefinitions);
    };
    /**
     * Render (or re-render) the column headers from column definitions.
     * calling setColumns() will trigger a grid re-render
     */
    ExtensionService.prototype.renderColumnHeaders = function (newColumnDefinitions) {
        var collection = newColumnDefinitions;
        if (!collection) {
            collection = this.sharedService.columnDefinitions;
        }
        if (Array.isArray(collection) && this.sharedService.grid && this.sharedService.grid.setColumns) {
            this.sharedService.grid.setColumns(collection);
        }
    };
    /** Translate an array of items from an input key and assign translated value to the output key */
    ExtensionService.prototype.translateItems = function (items, inputKey, outputKey) {
        var e_1, _a;
        if (Array.isArray(items)) {
            try {
                for (var items_1 = tslib_1.__values(items), items_1_1 = items_1.next(); !items_1_1.done; items_1_1 = items_1.next()) {
                    var item = items_1_1.value;
                    if (item[inputKey]) {
                        item[outputKey] = this.translate.instant(item[inputKey]);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (items_1_1 && !items_1_1.done && (_a = items_1.return)) _a.call(items_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
    };
    ExtensionService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [AutoTooltipExtension,
            CellExternalCopyManagerExtension,
            CheckboxSelectorExtension,
            ColumnPickerExtension,
            DraggableGroupingExtension,
            GridMenuExtension,
            GroupItemMetaProviderExtension,
            HeaderButtonExtension,
            HeaderMenuExtension,
            RowDetailViewExtension,
            RowMoveManagerExtension,
            RowSelectionExtension,
            SharedService,
            TranslateService])
    ], ExtensionService);
    return ExtensionService;
}());
export { ExtensionService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0ZW5zaW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL3NlcnZpY2VzL2V4dGVuc2lvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxpREFBaUQ7QUFDakQsT0FBTyw0Q0FBNEMsQ0FBQztBQUNwRCxPQUFPLDJDQUEyQyxDQUFDO0FBQ25ELE9BQU8sNENBQTRDLENBQUM7QUFFcEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN2RCxPQUFPLEVBR0wsYUFBYSxHQUVkLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUNMLG9CQUFvQixFQUNwQixnQ0FBZ0MsRUFDaEMseUJBQXlCLEVBQ3pCLHFCQUFxQixFQUNyQiwwQkFBMEIsRUFDMUIsaUJBQWlCLEVBQ2pCLDhCQUE4QixFQUM5QixxQkFBcUIsRUFDckIsbUJBQW1CLEVBQ25CLHNCQUFzQixFQUN0Qix1QkFBdUIsRUFDdkIscUJBQXFCLEdBQ3RCLE1BQU0scUJBQXFCLENBQUM7QUFDN0IsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBR2pEO0lBR0UsMEJBQ1Usb0JBQTBDLEVBQzFDLHlCQUEyRCxFQUMzRCx5QkFBb0QsRUFDcEQscUJBQTRDLEVBQzVDLDBCQUFzRCxFQUN0RCxpQkFBb0MsRUFDcEMsc0JBQXNELEVBQ3RELHFCQUE0QyxFQUM1QyxtQkFBd0MsRUFDeEMsc0JBQThDLEVBQzlDLHVCQUFnRCxFQUNoRCxxQkFBNEMsRUFDNUMsYUFBNEIsRUFDNUIsU0FBMkI7UUFiM0IseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQUMxQyw4QkFBeUIsR0FBekIseUJBQXlCLENBQWtDO1FBQzNELDhCQUF5QixHQUF6Qix5QkFB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SSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7cUJBQzFEO2lCQUNGOzs7Ozs7Ozs7U0FDRjtJQUNILENBQUM7SUE1VFUsZ0JBQWdCO1FBRDVCLFVBQVUsRUFBRTtpREFLcUIsb0JBQW9CO1lBQ2YsZ0NBQWdDO1lBQ2hDLHlCQUF5QjtZQUM3QixxQkFBcUI7WUFDaEIsMEJBQTBCO1lBQ25DLGlCQUFpQjtZQUNaLDhCQUE4QjtZQUMvQixxQkFBcUI7WUFDdkIsbUJBQW1CO1lBQ2hCLHNCQUFzQjtZQUNyQix1QkFBdUI7WUFDekIscUJBQXFCO1lBQzdCLGFBQWE7WUFDakIsZ0JBQWdCO09BakIxQixnQkFBZ0IsQ0E2VDVCO0lBQUQsdUJBQUM7Q0FBQSxBQTdURCxJQTZUQztTQTdUWSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbXBvcnQgY29tbW9uIDNyZCBwYXJ0eSBTbGlja0dyaWQgcGx1Z2lucy9saWJzXHJcbmltcG9ydCAnc2xpY2tncmlkL3BsdWdpbnMvc2xpY2suY2VsbHJhbmdlZGVjb3JhdG9yJztcclxuaW1wb3J0ICdzbGlja2dyaWQvcGx1Z2lucy9zbGljay5jZWxscmFuZ2VzZWxlY3Rvcic7XHJcbmltcG9ydCAnc2xpY2tncmlkL3BsdWdpbnMvc2xpY2suY2VsbHNlbGVjdGlvbm1vZGVsJztcclxuXHJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xyXG5pbXBvcnQge1xyXG4gIENvbHVtbixcclxuICBFeHRlbnNpb25Nb2RlbCxcclxuICBFeHRlbnNpb25OYW1lLFxyXG4gIEdyaWRPcHRpb24sXHJcbn0gZnJvbSAnLi4vbW9kZWxzL2luZGV4JztcclxuaW1wb3J0IHtcclxuICBBdXRvVG9vbHRpcEV4dGVuc2lvbixcclxuICBDZWxsRXh0ZXJuYWxDb3B5TWFuYWdlckV4dGVuc2lvbixcclxuICBDaGVja2JveFNlbGVjdG9yRXh0ZW5zaW9uLFxyXG4gIENvbHVtblBpY2tlckV4dGVuc2lvbixcclxuICBEcmFnZ2FibGVHcm91cGluZ0V4dGVuc2lvbixcclxuICBHcmlkTWVudUV4dGVuc2lvbixcclxuICBHcm91cEl0ZW1NZXRhUHJvdmlkZXJFeHRlbnNpb24sXHJcbiAgSGVhZGVyQnV0dG9uRXh0ZW5zaW9uLFxyXG4gIEhlYWRlck1lbnVFeHRlbnNpb24sXHJcbiAgUm93RGV0YWlsVmlld0V4dGVuc2lvbixcclxuICBSb3dNb3ZlTWFuYWdlckV4dGVuc2lvbixcclxuICBSb3dTZWxlY3Rpb25FeHRlbnNpb24sXHJcbn0gZnJvbSAnLi4vZXh0ZW5zaW9ucy9pbmRleCc7XHJcbmltcG9ydCB7IFNoYXJlZFNlcnZpY2UgfSBmcm9tICcuL3NoYXJlZC5zZXJ2aWNlJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEV4dGVuc2lvblNlcnZpY2Uge1xyXG4gIHByaXZhdGUgX2V4dGVuc2lvbkxpc3Q6IEV4dGVuc2lvbk1vZGVsW10gPSBbXTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGF1dG9Ub29sdGlwRXh0ZW5zaW9uOiBBdXRvVG9vbHRpcEV4dGVuc2lvbixcclxuICAgIHByaXZhdGUgY2VsbEV4dGVybmFsQ29weUV4dGVuc2lvbjogQ2VsbEV4dGVybmFsQ29weU1hbmFnZXJFeHRlbnNpb24sXHJcbiAgICBwcml2YXRlIGNoZWNrYm94U2VsZWN0b3JFeHRlbnNpb246IENoZWNrYm94U2VsZWN0b3JFeHRlbnNpb24sXHJcbiAgICBwcml2YXRlIGNvbHVtblBpY2tlckV4dGVuc2lvbjogQ29sdW1uUGlja2VyRXh0ZW5zaW9uLFxyXG4gICAgcHJpdmF0ZSBkcmFnZ2FibGVHcm91cGluZ0V4dGVuc2lvbjogRHJhZ2dhYmxlR3JvdXBpbmdFeHRlbnNpb24sXHJcbiAgICBwcml2YXRlIGdyaWRNZW51RXh0ZW5zaW9uOiBHcmlkTWVudUV4dGVuc2lvbixcclxuICAgIHByaXZhdGUgZ3JvdXBJdGVtTWV0YUV4dGVuc2lvbjogR3JvdXBJdGVtTWV0YVByb3ZpZGVyRXh0ZW5zaW9uLFxyXG4gICAgcHJpdmF0ZSBoZWFkZXJCdXR0b25FeHRlbnNpb246IEhlYWRlckJ1dHRvbkV4dGVuc2lvbixcclxuICAgIHByaXZhdGUgaGVhZGVyTWVudUV4dGVuc2lvbjogSGVhZGVyTWVudUV4dGVuc2lvbixcclxuICAgIHByaXZhdGUgcm93RGV0YWlsVmlld0V4dGVuc2lvbjogUm93RGV0YWlsVmlld0V4dGVuc2lvbixcclxuICAgIHByaXZhdGUgcm93TW92ZU1hbmFnZXJFeHRlbnNpb246IFJvd01vdmVNYW5hZ2VyRXh0ZW5zaW9uLFxyXG4gICAgcHJpdmF0ZSByb3dTZWxlY3Rpb25FeHRlbnNpb246IFJvd1NlbGVjdGlvbkV4dGVuc2lvbixcclxuICAgIHByaXZhdGUgc2hhcmVkU2VydmljZTogU2hhcmVkU2VydmljZSxcclxuICAgIHByaXZhdGUgdHJhbnNsYXRlOiBUcmFuc2xhdGVTZXJ2aWNlLFxyXG4gICkgeyB9XHJcblxyXG4gIC8qKiBEaXNwb3NlIG9mIGFsbCB0aGUgY29udHJvbHMgJiBwbHVnaW5zICovXHJcbiAgZGlzcG9zZSgpIHtcclxuICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkID0gbnVsbDtcclxuICAgIHRoaXMuc2hhcmVkU2VydmljZS52aXNpYmxlQ29sdW1ucyA9IFtdO1xyXG5cclxuICAgIC8vIGRpc3Bvc2Ugb2YgZWFjaCBjb250cm9sL3BsdWdpbiAmIHJlc2V0IHRoZSBsaXN0XHJcbiAgICB0aGlzLl9leHRlbnNpb25MaXN0LmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgaWYgKGl0ZW0gJiYgaXRlbS5jbGFzcyAmJiBpdGVtLmNsYXNzLmRpc3Bvc2UpIHtcclxuICAgICAgICBpdGVtLmNsYXNzLmRpc3Bvc2UoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICB0aGlzLl9leHRlbnNpb25MaXN0ID0gW107XHJcbiAgfVxyXG5cclxuICAvKiogR2V0IGFsbCBjb2x1bW5zIChpbmNsdWRlcyB2aXNpYmxlIGFuZCBub24tdmlzaWJsZSkgKi9cclxuICBnZXRBbGxDb2x1bW5zKCk6IENvbHVtbltdIHtcclxuICAgIHJldHVybiB0aGlzLnNoYXJlZFNlcnZpY2UuYWxsQ29sdW1ucyB8fCBbXTtcclxuICB9XHJcblxyXG4gIC8qKiBHZXQgb25seSB2aXNpYmxlIGNvbHVtbnMgKi9cclxuICBnZXRWaXNpYmxlQ29sdW1ucygpOiBDb2x1bW5bXSB7XHJcbiAgICByZXR1cm4gdGhpcy5zaGFyZWRTZXJ2aWNlLnZpc2libGVDb2x1bW5zIHx8IFtdO1xyXG4gIH1cclxuXHJcbiAgLyoqIEdldCBhbGwgRXh0ZW5zaW9ucyAqL1xyXG4gIGdldEFsbEV4dGVuc2lvbnMoKTogRXh0ZW5zaW9uTW9kZWxbXSB7XHJcbiAgICByZXR1cm4gdGhpcy5fZXh0ZW5zaW9uTGlzdDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCBhbiBFeHRlbnNpb24gYnkgaXQncyBuYW1lXHJcbiAgICogIEBwYXJhbSBuYW1lXHJcbiAgICovXHJcbiAgZ2V0RXh0ZW5zaW9uQnlOYW1lKG5hbWU6IEV4dGVuc2lvbk5hbWUpOiBFeHRlbnNpb25Nb2RlbCB8IHVuZGVmaW5lZCB7XHJcbiAgICByZXR1cm4gdGhpcy5fZXh0ZW5zaW9uTGlzdC5maW5kKChwKSA9PiBwLm5hbWUgPT09IG5hbWUpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBpbnN0YW5jZSBvZiB0aGUgU2xpY2tHcmlkIGFkZG9uIChjb250cm9sIG9yIHBsdWdpbikuXHJcbiAgICogVGhpcyBpcyB0aGUgcmF3IGFkZG9uIGNvbWluZyBkaXJlY3RseSBmcm9tIFNsaWNrR3JpZCBpdHNlbGYsIG5vdCB0byBjb25mdXNlIHdpdGggQW5ndWxhci1TbGlja2dyaWQgZXh0ZW5zaW9uXHJcbiAgICogIEBwYXJhbSBuYW1lXHJcbiAgICovXHJcbiAgZ2V0U2xpY2tncmlkQWRkb25JbnN0YW5jZShuYW1lOiBFeHRlbnNpb25OYW1lKTogYW55IHtcclxuICAgIGNvbnN0IGV4dGVuc2lvbiA9IHRoaXMuZ2V0RXh0ZW5zaW9uQnlOYW1lKG5hbWUpO1xyXG4gICAgaWYgKGV4dGVuc2lvbiAmJiAoZXh0ZW5zaW9uLmluc3RhbmNlIHx8IGV4dGVuc2lvbi5hZGRvbikpIHtcclxuICAgICAgcmV0dXJuIGV4dGVuc2lvbi5pbnN0YW5jZTtcclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgLyoqIEF1dG8tcmVzaXplIGFsbCB0aGUgY29sdW1uIGluIHRoZSBncmlkIHRvIGZpdCB0aGUgZ3JpZCB3aWR0aCAqL1xyXG4gIGF1dG9SZXNpemVDb2x1bW5zKCkge1xyXG4gICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQuYXV0b3NpemVDb2x1bW5zKCk7XHJcbiAgfVxyXG5cclxuICAvKiogQXR0YWNoL0NyZWF0ZSBkaWZmZXJlbnQgQ29udHJvbHMgb3IgUGx1Z2lucyBhZnRlciB0aGUgR3JpZCBpcyBjcmVhdGVkICovXHJcbiAgYmluZERpZmZlcmVudEV4dGVuc2lvbnMoKSB7XHJcbiAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucykge1xyXG4gICAgICAvLyBtYWtlIHN1cmUgYWxsIGNvbHVtbnMgYXJlIHRyYW5zbGF0ZWQgYmVmb3JlIGNyZWF0aW5nIENvbHVtblBpY2tlci9HcmlkTWVudSBDb250cm9sc1xyXG4gICAgICAvLyB0aGlzIGlzIHRvIGF2b2lkIGhhdmluZyBoaWRkZW4gY29sdW1ucyBub3QgYmVpbmcgdHJhbnNsYXRlZCBvbiBmaXJzdCBsb2FkXHJcbiAgICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZW5hYmxlVHJhbnNsYXRlKSB7XHJcbiAgICAgICAgdGhpcy50cmFuc2xhdGVJdGVtcyh0aGlzLnNoYXJlZFNlcnZpY2UuYWxsQ29sdW1ucywgJ2hlYWRlcktleScsICduYW1lJyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIEF1dG8gVG9vbHRpcCBQbHVnaW5cclxuICAgICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5lbmFibGVBdXRvVG9vbHRpcCkge1xyXG4gICAgICAgIGlmICh0aGlzLmF1dG9Ub29sdGlwRXh0ZW5zaW9uICYmIHRoaXMuYXV0b1Rvb2x0aXBFeHRlbnNpb24ucmVnaXN0ZXIpIHtcclxuICAgICAgICAgIGNvbnN0IGluc3RhbmNlID0gdGhpcy5hdXRvVG9vbHRpcEV4dGVuc2lvbi5yZWdpc3RlcigpXHJcbiAgICAgICAgICB0aGlzLl9leHRlbnNpb25MaXN0LnB1c2goeyBuYW1lOiBFeHRlbnNpb25OYW1lLmF1dG9Ub29sdGlwLCBjbGFzczogdGhpcy5hdXRvVG9vbHRpcEV4dGVuc2lvbiwgYWRkb246IGluc3RhbmNlLCBpbnN0YW5jZSB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIENlbGwgRXh0ZXJuYWwgQ29weSBNYW5hZ2VyIFBsdWdpbiAoRXhjZWwgTGlrZSlcclxuICAgICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5lbmFibGVFeGNlbENvcHlCdWZmZXIpIHtcclxuICAgICAgICBpZiAodGhpcy5jZWxsRXh0ZXJuYWxDb3B5RXh0ZW5zaW9uICYmIHRoaXMuY2VsbEV4dGVybmFsQ29weUV4dGVuc2lvbi5yZWdpc3Rlcikge1xyXG4gICAgICAgICAgY29uc3QgaW5zdGFuY2UgPSB0aGlzLmNlbGxFeHRlcm5hbENvcHlFeHRlbnNpb24ucmVnaXN0ZXIoKTtcclxuICAgICAgICAgIHRoaXMuX2V4dGVuc2lvbkxpc3QucHVzaCh7IG5hbWU6IEV4dGVuc2lvbk5hbWUuY2VsbEV4dGVybmFsQ29weU1hbmFnZXIsIGNsYXNzOiB0aGlzLmNlbGxFeHRlcm5hbENvcHlFeHRlbnNpb24sIGFkZG9uOiBpbnN0YW5jZSwgaW5zdGFuY2UgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBDaGVja2JveCBTZWxlY3RvciBQbHVnaW5cclxuICAgICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5lbmFibGVDaGVja2JveFNlbGVjdG9yKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY2hlY2tib3hTZWxlY3RvckV4dGVuc2lvbiAmJiB0aGlzLmNoZWNrYm94U2VsZWN0b3JFeHRlbnNpb24ucmVnaXN0ZXIpIHtcclxuICAgICAgICAgIGNvbnN0IHJvd1NlbGVjdGlvbkV4dGVuc2lvbiA9IHRoaXMuZ2V0RXh0ZW5zaW9uQnlOYW1lKEV4dGVuc2lvbk5hbWUucm93U2VsZWN0aW9uKTtcclxuICAgICAgICAgIGNvbnN0IGluc3RhbmNlID0gdGhpcy5jaGVja2JveFNlbGVjdG9yRXh0ZW5zaW9uLnJlZ2lzdGVyKHJvd1NlbGVjdGlvbkV4dGVuc2lvbik7XHJcbiAgICAgICAgICB0aGlzLl9leHRlbnNpb25MaXN0LnB1c2goeyBuYW1lOiBFeHRlbnNpb25OYW1lLmNoZWNrYm94U2VsZWN0b3IsIGNsYXNzOiB0aGlzLmNoZWNrYm94U2VsZWN0b3JFeHRlbnNpb24sIGFkZG9uOiBpbnN0YW5jZSwgaW5zdGFuY2UgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBDb2x1bW4gUGlja2VyIENvbnRyb2xcclxuICAgICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5lbmFibGVDb2x1bW5QaWNrZXIpIHtcclxuICAgICAgICBpZiAodGhpcy5jb2x1bW5QaWNrZXJFeHRlbnNpb24gJiYgdGhpcy5jb2x1bW5QaWNrZXJFeHRlbnNpb24ucmVnaXN0ZXIpIHtcclxuICAgICAgICAgIGNvbnN0IGluc3RhbmNlID0gdGhpcy5jb2x1bW5QaWNrZXJFeHRlbnNpb24ucmVnaXN0ZXIoKTtcclxuICAgICAgICAgIHRoaXMuX2V4dGVuc2lvbkxpc3QucHVzaCh7IG5hbWU6IEV4dGVuc2lvbk5hbWUuY29sdW1uUGlja2VyLCBjbGFzczogdGhpcy5jb2x1bW5QaWNrZXJFeHRlbnNpb24sIGFkZG9uOiBpbnN0YW5jZSwgaW5zdGFuY2UgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBEcmFnZ2FibGUgR3JvdXBpbmcgUGx1Z2luXHJcbiAgICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZW5hYmxlRHJhZ2dhYmxlR3JvdXBpbmcpIHtcclxuICAgICAgICBpZiAodGhpcy5kcmFnZ2FibGVHcm91cGluZ0V4dGVuc2lvbiAmJiB0aGlzLmRyYWdnYWJsZUdyb3VwaW5nRXh0ZW5zaW9uLnJlZ2lzdGVyKSB7XHJcbiAgICAgICAgICBjb25zdCBpbnN0YW5jZSA9IHRoaXMuZHJhZ2dhYmxlR3JvdXBpbmdFeHRlbnNpb24ucmVnaXN0ZXIoKTtcclxuICAgICAgICAgIHRoaXMuX2V4dGVuc2lvbkxpc3QucHVzaCh7IG5hbWU6IEV4dGVuc2lvbk5hbWUuZHJhZ2dhYmxlR3JvdXBpbmcsIGNsYXNzOiB0aGlzLmRyYWdnYWJsZUdyb3VwaW5nRXh0ZW5zaW9uLCBhZGRvbjogaW5zdGFuY2UsIGluc3RhbmNlIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gR3JpZCBNZW51IENvbnRyb2xcclxuICAgICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5lbmFibGVHcmlkTWVudSkge1xyXG4gICAgICAgIGlmICh0aGlzLmdyaWRNZW51RXh0ZW5zaW9uICYmIHRoaXMuZ3JpZE1lbnVFeHRlbnNpb24ucmVnaXN0ZXIpIHtcclxuICAgICAgICAgIGNvbnN0IGluc3RhbmNlID0gdGhpcy5ncmlkTWVudUV4dGVuc2lvbi5yZWdpc3RlcigpO1xyXG4gICAgICAgICAgdGhpcy5fZXh0ZW5zaW9uTGlzdC5wdXNoKHsgbmFtZTogRXh0ZW5zaW9uTmFtZS5ncmlkTWVudSwgY2xhc3M6IHRoaXMuZ3JpZE1lbnVFeHRlbnNpb24sIGFkZG9uOiBpbnN0YW5jZSwgaW5zdGFuY2UgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBHcm91cGluZyBQbHVnaW5cclxuICAgICAgLy8gcmVnaXN0ZXIgdGhlIGdyb3VwIGl0ZW0gbWV0YWRhdGEgcHJvdmlkZXIgdG8gYWRkIGV4cGFuZC9jb2xsYXBzZSBncm91cCBoYW5kbGVyc1xyXG4gICAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmVuYWJsZURyYWdnYWJsZUdyb3VwaW5nIHx8IHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5lbmFibGVHcm91cGluZykge1xyXG4gICAgICAgIGlmICh0aGlzLmdyb3VwSXRlbU1ldGFFeHRlbnNpb24gJiYgdGhpcy5ncm91cEl0ZW1NZXRhRXh0ZW5zaW9uLnJlZ2lzdGVyKSB7XHJcbiAgICAgICAgICBjb25zdCBpbnN0YW5jZSA9IHRoaXMuZ3JvdXBJdGVtTWV0YUV4dGVuc2lvbi5yZWdpc3RlcigpO1xyXG4gICAgICAgICAgdGhpcy5fZXh0ZW5zaW9uTGlzdC5wdXNoKHsgbmFtZTogRXh0ZW5zaW9uTmFtZS5ncm91cEl0ZW1NZXRhUHJvdmlkZXIsIGNsYXNzOiB0aGlzLmdyb3VwSXRlbU1ldGFFeHRlbnNpb24sIGFkZG9uOiBpbnN0YW5jZSwgaW5zdGFuY2UgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBIZWFkZXIgQnV0dG9uIFBsdWdpblxyXG4gICAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmVuYWJsZUhlYWRlckJ1dHRvbikge1xyXG4gICAgICAgIGlmICh0aGlzLmhlYWRlckJ1dHRvbkV4dGVuc2lvbiAmJiB0aGlzLmhlYWRlckJ1dHRvbkV4dGVuc2lvbi5yZWdpc3Rlcikge1xyXG4gICAgICAgICAgY29uc3QgaW5zdGFuY2UgPSB0aGlzLmhlYWRlckJ1dHRvbkV4dGVuc2lvbi5yZWdpc3RlcigpO1xyXG4gICAgICAgICAgdGhpcy5fZXh0ZW5zaW9uTGlzdC5wdXNoKHsgbmFtZTogRXh0ZW5zaW9uTmFtZS5oZWFkZXJCdXR0b24sIGNsYXNzOiB0aGlzLmhlYWRlckJ1dHRvbkV4dGVuc2lvbiwgYWRkb246IGluc3RhbmNlLCBpbnN0YW5jZSB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIEhlYWRlciBNZW51IFBsdWdpblxyXG4gICAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmVuYWJsZUhlYWRlck1lbnUpIHtcclxuICAgICAgICBpZiAodGhpcy5oZWFkZXJNZW51RXh0ZW5zaW9uICYmIHRoaXMuaGVhZGVyTWVudUV4dGVuc2lvbi5yZWdpc3Rlcikge1xyXG4gICAgICAgICAgY29uc3QgaW5zdGFuY2UgPSB0aGlzLmhlYWRlck1lbnVFeHRlbnNpb24ucmVnaXN0ZXIoKTtcclxuICAgICAgICAgIHRoaXMuX2V4dGVuc2lvbkxpc3QucHVzaCh7IG5hbWU6IEV4dGVuc2lvbk5hbWUuaGVhZGVyTWVudSwgY2xhc3M6IHRoaXMuaGVhZGVyTWVudUV4dGVuc2lvbiwgYWRkb246IGluc3RhbmNlLCBpbnN0YW5jZSB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIFJvdyBEZXRhaWwgVmlldyBQbHVnaW5cclxuICAgICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5lbmFibGVSb3dEZXRhaWxWaWV3KSB7XHJcbiAgICAgICAgaWYgKHRoaXMucm93RGV0YWlsVmlld0V4dGVuc2lvbiAmJiB0aGlzLnJvd0RldGFpbFZpZXdFeHRlbnNpb24ucmVnaXN0ZXIpIHtcclxuICAgICAgICAgIGNvbnN0IHJvd1NlbGVjdGlvbkV4dGVuc2lvbiA9IHRoaXMuZ2V0RXh0ZW5zaW9uQnlOYW1lKEV4dGVuc2lvbk5hbWUucm93U2VsZWN0aW9uKTtcclxuICAgICAgICAgIGNvbnN0IGluc3RhbmNlID0gdGhpcy5yb3dEZXRhaWxWaWV3RXh0ZW5zaW9uLnJlZ2lzdGVyKHJvd1NlbGVjdGlvbkV4dGVuc2lvbik7XHJcbiAgICAgICAgICB0aGlzLl9leHRlbnNpb25MaXN0LnB1c2goeyBuYW1lOiBFeHRlbnNpb25OYW1lLnJvd0RldGFpbFZpZXcsIGNsYXNzOiB0aGlzLnJvd0RldGFpbFZpZXdFeHRlbnNpb24sIGFkZG9uOiBpbnN0YW5jZSwgaW5zdGFuY2UgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBSb3cgTW92ZSBNYW5hZ2VyIFBsdWdpblxyXG4gICAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmVuYWJsZVJvd01vdmVNYW5hZ2VyKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucm93TW92ZU1hbmFnZXJFeHRlbnNpb24gJiYgdGhpcy5yb3dNb3ZlTWFuYWdlckV4dGVuc2lvbi5yZWdpc3Rlcikge1xyXG4gICAgICAgICAgY29uc3QgaW5zdGFuY2UgPSB0aGlzLnJvd01vdmVNYW5hZ2VyRXh0ZW5zaW9uLnJlZ2lzdGVyKCk7XHJcbiAgICAgICAgICB0aGlzLl9leHRlbnNpb25MaXN0LnB1c2goeyBuYW1lOiBFeHRlbnNpb25OYW1lLnJvd01vdmVNYW5hZ2VyLCBjbGFzczogdGhpcy5yb3dNb3ZlTWFuYWdlckV4dGVuc2lvbiwgYWRkb246IGluc3RhbmNlLCBpbnN0YW5jZSB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIFJvdyBTZWxlY3Rpb24gUGx1Z2luXHJcbiAgICAgIGlmICghdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmVuYWJsZUNoZWNrYm94U2VsZWN0b3IgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmVuYWJsZVJvd1NlbGVjdGlvbikge1xyXG4gICAgICAgIGlmICh0aGlzLnJvd1NlbGVjdGlvbkV4dGVuc2lvbiAmJiB0aGlzLnJvd1NlbGVjdGlvbkV4dGVuc2lvbi5yZWdpc3Rlcikge1xyXG4gICAgICAgICAgY29uc3QgaW5zdGFuY2UgPSB0aGlzLnJvd1NlbGVjdGlvbkV4dGVuc2lvbi5yZWdpc3RlcigpO1xyXG4gICAgICAgICAgdGhpcy5fZXh0ZW5zaW9uTGlzdC5wdXNoKHsgbmFtZTogRXh0ZW5zaW9uTmFtZS5yb3dTZWxlY3Rpb24sIGNsYXNzOiB0aGlzLnJvd1NlbGVjdGlvbkV4dGVuc2lvbiwgYWRkb246IGluc3RhbmNlLCBpbnN0YW5jZSB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIG1hbnVhbGx5IHJlZ2lzdGVyIG90aGVyIHBsdWdpbnNcclxuICAgICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5yZWdpc3RlclBsdWdpbnMgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5yZWdpc3RlclBsdWdpbnMpKSB7XHJcbiAgICAgICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMucmVnaXN0ZXJQbHVnaW5zLmZvckVhY2goKHBsdWdpbikgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBpbnN0YW5jZSA9IHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLnJlZ2lzdGVyUGx1Z2luKHBsdWdpbik7XHJcbiAgICAgICAgICAgIHRoaXMuX2V4dGVuc2lvbkxpc3QucHVzaCh7IG5hbWU6IEV4dGVuc2lvbk5hbWUubm9uYW1lLCBjbGFzczogbnVsbCwgYWRkb246IGluc3RhbmNlLCBpbnN0YW5jZSB9KTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZC5yZWdpc3RlclBsdWdpbih0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMucmVnaXN0ZXJQbHVnaW5zKTtcclxuICAgICAgICAgIGNvbnN0IHBsdWdpbiA9IHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5yZWdpc3RlclBsdWdpbnM7XHJcbiAgICAgICAgICBjb25zdCBpbnN0YW5jZSA9IHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLnJlZ2lzdGVyUGx1Z2luKHBsdWdpbik7XHJcbiAgICAgICAgICB0aGlzLl9leHRlbnNpb25MaXN0LnB1c2goeyBuYW1lOiBFeHRlbnNpb25OYW1lLm5vbmFtZSwgY2xhc3M6IG51bGwsIGFkZG9uOiBpbnN0YW5jZSwgaW5zdGFuY2UgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBdHRhY2gvQ3JlYXRlIGNlcnRhaW4gcGx1Z2lucyBiZWZvcmUgdGhlIEdyaWQgY3JlYXRpb24sIGVsc2UgdGhleSBtaWdodCBiZWhhdmUgb2RkbHkuXHJcbiAgICogTW9zdGx5IGJlY2F1c2UgdGhlIGNvbHVtbiBkZWZpbml0aW9ucyBtaWdodCBjaGFuZ2UgYWZ0ZXIgdGhlIGdyaWQgY3JlYXRpb25cclxuICAgKiBAcGFyYW0gY29sdW1uRGVmaW5pdGlvbnNcclxuICAgKiBAcGFyYW0gb3B0aW9uc1xyXG4gICAqL1xyXG4gIGNyZWF0ZUV4dGVuc2lvbnNCZWZvcmVHcmlkQ3JlYXRpb24oY29sdW1uRGVmaW5pdGlvbnM6IENvbHVtbltdLCBvcHRpb25zOiBHcmlkT3B0aW9uKSB7XHJcbiAgICBpZiAob3B0aW9ucy5lbmFibGVDaGVja2JveFNlbGVjdG9yKSB7XHJcbiAgICAgIHRoaXMuY2hlY2tib3hTZWxlY3RvckV4dGVuc2lvbi5jcmVhdGUoY29sdW1uRGVmaW5pdGlvbnMsIG9wdGlvbnMpO1xyXG4gICAgfVxyXG4gICAgaWYgKG9wdGlvbnMuZW5hYmxlUm93RGV0YWlsVmlldykge1xyXG4gICAgICB0aGlzLnJvd0RldGFpbFZpZXdFeHRlbnNpb24uY3JlYXRlKGNvbHVtbkRlZmluaXRpb25zLCBvcHRpb25zKTtcclxuICAgIH1cclxuICAgIGlmIChvcHRpb25zLmVuYWJsZURyYWdnYWJsZUdyb3VwaW5nKSB7XHJcbiAgICAgIGNvbnN0IHBsdWdpbiA9IHRoaXMuZHJhZ2dhYmxlR3JvdXBpbmdFeHRlbnNpb24uY3JlYXRlKG9wdGlvbnMpO1xyXG4gICAgICBvcHRpb25zLmVuYWJsZUNvbHVtblJlb3JkZXIgPSBwbHVnaW4uZ2V0U2V0dXBDb2x1bW5SZW9yZGVyO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIEhpZGUgYSBjb2x1bW4gZnJvbSB0aGUgZ3JpZCAqL1xyXG4gIGhpZGVDb2x1bW4oY29sdW1uOiBDb2x1bW4pIHtcclxuICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQuZ2V0Q29sdW1ucyAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZC5zZXRDb2x1bW5zKSB7XHJcbiAgICAgIGNvbnN0IGNvbHVtbkluZGV4ID0gdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQuZ2V0Q29sdW1uSW5kZXgoY29sdW1uLmlkKTtcclxuICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLnZpc2libGVDb2x1bW5zID0gdGhpcy5yZW1vdmVDb2x1bW5CeUluZGV4KHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLmdldENvbHVtbnMoKSwgY29sdW1uSW5kZXgpO1xyXG4gICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZC5zZXRDb2x1bW5zKHRoaXMuc2hhcmVkU2VydmljZS52aXNpYmxlQ29sdW1ucyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKiogUmVmcmVzaCB0aGUgZGF0YXNldCB0aHJvdWdoIHRoZSBCYWNrZW5kIFNlcnZpY2UgKi9cclxuICByZWZyZXNoQmFja2VuZERhdGFzZXQoZ3JpZE9wdGlvbnM/OiBHcmlkT3B0aW9uKSB7XHJcbiAgICB0aGlzLmdyaWRNZW51RXh0ZW5zaW9uLnJlZnJlc2hCYWNrZW5kRGF0YXNldChncmlkT3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW1vdmUgYSBjb2x1bW4gZnJvbSB0aGUgZ3JpZCBieSBpdCdzIGluZGV4IGluIHRoZSBncmlkXHJcbiAgICogQHBhcmFtIGNvbHVtbnMgaW5wdXRcclxuICAgKiBAcGFyYW0gaW5kZXhcclxuICAgKi9cclxuICByZW1vdmVDb2x1bW5CeUluZGV4KGNvbHVtbnM6IENvbHVtbltdLCBpbmRleDogbnVtYmVyKTogQ29sdW1uW10ge1xyXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoY29sdW1ucykpIHtcclxuICAgICAgcmV0dXJuIGNvbHVtbnMuZmlsdGVyKChlbDogQ29sdW1uLCBpOiBudW1iZXIpID0+IGluZGV4ICE9PSBpKTtcclxuICAgIH1cclxuICAgIHJldHVybiBjb2x1bW5zO1xyXG4gIH1cclxuXHJcbiAgLyoqIFRyYW5zbGF0ZSB0aGUgQ29sdW1uIFBpY2tlciBhbmQgaXQncyBsYXN0IDIgY2hlY2tib3hlcyAqL1xyXG4gIHRyYW5zbGF0ZUNvbHVtblBpY2tlcigpIHtcclxuICAgIGlmICh0aGlzLmNvbHVtblBpY2tlckV4dGVuc2lvbiAmJiB0aGlzLmNvbHVtblBpY2tlckV4dGVuc2lvbi50cmFuc2xhdGVDb2x1bW5QaWNrZXIpIHtcclxuICAgICAgdGhpcy5jb2x1bW5QaWNrZXJFeHRlbnNpb24udHJhbnNsYXRlQ29sdW1uUGlja2VyKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUcmFuc2xhdGUgdGhlIEhlYWRlciBNZW51IHRpdGxlcywgd2UgbmVlZCB0byBsb29wIHRocm91Z2ggYWxsIGNvbHVtbiBkZWZpbml0aW9uIHRvIHJlLXRyYW5zbGF0ZSB0aGVtXHJcbiAgICovXHJcbiAgdHJhbnNsYXRlR3JpZE1lbnUoKSB7XHJcbiAgICBpZiAodGhpcy5ncmlkTWVudUV4dGVuc2lvbiAmJiB0aGlzLmdyaWRNZW51RXh0ZW5zaW9uLnRyYW5zbGF0ZUdyaWRNZW51KSB7XHJcbiAgICAgIHRoaXMuZ3JpZE1lbnVFeHRlbnNpb24udHJhbnNsYXRlR3JpZE1lbnUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRyYW5zbGF0ZSB0aGUgSGVhZGVyIE1lbnUgdGl0bGVzLCB3ZSBuZWVkIHRvIGxvb3AgdGhyb3VnaCBhbGwgY29sdW1uIGRlZmluaXRpb24gdG8gcmUtdHJhbnNsYXRlIHRoZW1cclxuICAgKi9cclxuICB0cmFuc2xhdGVIZWFkZXJNZW51KCkge1xyXG4gICAgaWYgKHRoaXMuaGVhZGVyTWVudUV4dGVuc2lvbiAmJiB0aGlzLmhlYWRlck1lbnVFeHRlbnNpb24udHJhbnNsYXRlSGVhZGVyTWVudSkge1xyXG4gICAgICB0aGlzLmhlYWRlck1lbnVFeHRlbnNpb24udHJhbnNsYXRlSGVhZGVyTWVudSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVHJhbnNsYXRlIG1hbnVhbGx5IHRoZSBoZWFkZXIgdGl0bGVzLlxyXG4gICAqIFdlIGNvdWxkIG9wdGlvbmFsbHkgcGFzcyBhIGxvY2FsZSAodGhhdCB3aWxsIGNoYW5nZSBjdXJyZW50bHkgbG9hZGVkIGxvY2FsZSksIGVsc2UgaXQgd2lsbCB1c2UgY3VycmVudCBsb2NhbGVcclxuICAgKiBAcGFyYW0gbG9jYWxlIHRvIHVzZVxyXG4gICAqIEBwYXJhbSBuZXcgY29sdW1uIGRlZmluaXRpb25zIChvcHRpb25hbClcclxuICAgKi9cclxuICB0cmFuc2xhdGVDb2x1bW5IZWFkZXJzKGxvY2FsZT86IGJvb2xlYW4gfCBzdHJpbmcsIG5ld0NvbHVtbkRlZmluaXRpb25zPzogQ29sdW1uW10pIHtcclxuICAgIGlmIChsb2NhbGUpIHtcclxuICAgICAgdGhpcy50cmFuc2xhdGUudXNlKGxvY2FsZSBhcyBzdHJpbmcpO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBjb2x1bW5EZWZpbml0aW9ucyA9IG5ld0NvbHVtbkRlZmluaXRpb25zO1xyXG4gICAgaWYgKCFjb2x1bW5EZWZpbml0aW9ucykge1xyXG4gICAgICBjb2x1bW5EZWZpbml0aW9ucyA9IHRoaXMuc2hhcmVkU2VydmljZS5jb2x1bW5EZWZpbml0aW9ucztcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnRyYW5zbGF0ZUl0ZW1zKGNvbHVtbkRlZmluaXRpb25zLCAnaGVhZGVyS2V5JywgJ25hbWUnKTtcclxuICAgIHRoaXMudHJhbnNsYXRlSXRlbXModGhpcy5zaGFyZWRTZXJ2aWNlLmFsbENvbHVtbnMsICdoZWFkZXJLZXknLCAnbmFtZScpO1xyXG5cclxuICAgIC8vIHJlLXJlbmRlciB0aGUgY29sdW1uIGhlYWRlcnNcclxuICAgIHRoaXMucmVuZGVyQ29sdW1uSGVhZGVycyhjb2x1bW5EZWZpbml0aW9ucyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW5kZXIgKG9yIHJlLXJlbmRlcikgdGhlIGNvbHVtbiBoZWFkZXJzIGZyb20gY29sdW1uIGRlZmluaXRpb25zLlxyXG4gICAqIGNhbGxpbmcgc2V0Q29sdW1ucygpIHdpbGwgdHJpZ2dlciBhIGdyaWQgcmUtcmVuZGVyXHJcbiAgICovXHJcbiAgcmVuZGVyQ29sdW1uSGVhZGVycyhuZXdDb2x1bW5EZWZpbml0aW9ucz86IENvbHVtbltdKSB7XHJcbiAgICBsZXQgY29sbGVjdGlvbiA9IG5ld0NvbHVtbkRlZmluaXRpb25zO1xyXG4gICAgaWYgKCFjb2xsZWN0aW9uKSB7XHJcbiAgICAgIGNvbGxlY3Rpb24gPSB0aGlzLnNoYXJlZFNlcnZpY2UuY29sdW1uRGVmaW5pdGlvbnM7XHJcbiAgICB9XHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheShjb2xsZWN0aW9uKSAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZCAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZC5zZXRDb2x1bW5zKSB7XHJcbiAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLnNldENvbHVtbnMoY29sbGVjdGlvbik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKiogVHJhbnNsYXRlIGFuIGFycmF5IG9mIGl0ZW1zIGZyb20gYW4gaW5wdXQga2V5IGFuZCBhc3NpZ24gdHJhbnNsYXRlZCB2YWx1ZSB0byB0aGUgb3V0cHV0IGtleSAqL1xyXG4gIHByaXZhdGUgdHJhbnNsYXRlSXRlbXMoaXRlbXM6IGFueVtdLCBpbnB1dEtleTogc3RyaW5nLCBvdXRwdXRLZXk6IHN0cmluZykge1xyXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoaXRlbXMpKSB7XHJcbiAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcykge1xyXG4gICAgICAgIGlmIChpdGVtW2lucHV0S2V5XSkge1xyXG4gICAgICAgICAgaXRlbVtvdXRwdXRLZXldID0gdGhpcy50cmFuc2xhdGUuaW5zdGFudChpdGVtW2lucHV0S2V5XSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==