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
let ExtensionService = class ExtensionService {
    constructor(autoTooltipExtension, cellExternalCopyExtension, checkboxSelectorExtension, columnPickerExtension, draggableGroupingExtension, gridMenuExtension, groupItemMetaExtension, headerButtonExtension, headerMenuExtension, rowDetailViewExtension, rowMoveManagerExtension, rowSelectionExtension, sharedService, translate) {
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
    dispose() {
        this.sharedService.grid = null;
        this.sharedService.visibleColumns = [];
        // dispose of each control/plugin & reset the list
        this._extensionList.forEach((item) => {
            if (item && item.class && item.class.dispose) {
                item.class.dispose();
            }
        });
        this._extensionList = [];
    }
    /** Get all columns (includes visible and non-visible) */
    getAllColumns() {
        return this.sharedService.allColumns || [];
    }
    /** Get only visible columns */
    getVisibleColumns() {
        return this.sharedService.visibleColumns || [];
    }
    /** Get all Extensions */
    getAllExtensions() {
        return this._extensionList;
    }
    /**
     * Get an Extension by it's name
     *  @param name
     */
    getExtensionByName(name) {
        return this._extensionList.find((p) => p.name === name);
    }
    /**
     * Get the instance of the SlickGrid addon (control or plugin).
     * This is the raw addon coming directly from SlickGrid itself, not to confuse with Angular-Slickgrid extension
     *  @param name
     */
    getSlickgridAddonInstance(name) {
        const extension = this.getExtensionByName(name);
        if (extension && (extension.instance || extension.addon)) {
            return extension.instance;
        }
        return null;
    }
    /** Auto-resize all the column in the grid to fit the grid width */
    autoResizeColumns() {
        this.sharedService.grid.autosizeColumns();
    }
    /** Attach/Create different Controls or Plugins after the Grid is created */
    bindDifferentExtensions() {
        if (this.sharedService && this.sharedService.gridOptions) {
            // make sure all columns are translated before creating ColumnPicker/GridMenu Controls
            // this is to avoid having hidden columns not being translated on first load
            if (this.sharedService.gridOptions.enableTranslate) {
                this.translateItems(this.sharedService.allColumns, 'headerKey', 'name');
            }
            // Auto Tooltip Plugin
            if (this.sharedService.gridOptions.enableAutoTooltip) {
                if (this.autoTooltipExtension && this.autoTooltipExtension.register) {
                    const instance = this.autoTooltipExtension.register();
                    this._extensionList.push({ name: ExtensionName.autoTooltip, class: this.autoTooltipExtension, addon: instance, instance });
                }
            }
            // Cell External Copy Manager Plugin (Excel Like)
            if (this.sharedService.gridOptions.enableExcelCopyBuffer) {
                if (this.cellExternalCopyExtension && this.cellExternalCopyExtension.register) {
                    const instance = this.cellExternalCopyExtension.register();
                    this._extensionList.push({ name: ExtensionName.cellExternalCopyManager, class: this.cellExternalCopyExtension, addon: instance, instance });
                }
            }
            // Checkbox Selector Plugin
            if (this.sharedService.gridOptions.enableCheckboxSelector) {
                if (this.checkboxSelectorExtension && this.checkboxSelectorExtension.register) {
                    const rowSelectionExtension = this.getExtensionByName(ExtensionName.rowSelection);
                    const instance = this.checkboxSelectorExtension.register(rowSelectionExtension);
                    this._extensionList.push({ name: ExtensionName.checkboxSelector, class: this.checkboxSelectorExtension, addon: instance, instance });
                }
            }
            // Column Picker Control
            if (this.sharedService.gridOptions.enableColumnPicker) {
                if (this.columnPickerExtension && this.columnPickerExtension.register) {
                    const instance = this.columnPickerExtension.register();
                    this._extensionList.push({ name: ExtensionName.columnPicker, class: this.columnPickerExtension, addon: instance, instance });
                }
            }
            // Draggable Grouping Plugin
            if (this.sharedService.gridOptions.enableDraggableGrouping) {
                if (this.draggableGroupingExtension && this.draggableGroupingExtension.register) {
                    const instance = this.draggableGroupingExtension.register();
                    this._extensionList.push({ name: ExtensionName.draggableGrouping, class: this.draggableGroupingExtension, addon: instance, instance });
                }
            }
            // Grid Menu Control
            if (this.sharedService.gridOptions.enableGridMenu) {
                if (this.gridMenuExtension && this.gridMenuExtension.register) {
                    const instance = this.gridMenuExtension.register();
                    this._extensionList.push({ name: ExtensionName.gridMenu, class: this.gridMenuExtension, addon: instance, instance });
                }
            }
            // Grouping Plugin
            // register the group item metadata provider to add expand/collapse group handlers
            if (this.sharedService.gridOptions.enableDraggableGrouping || this.sharedService.gridOptions.enableGrouping) {
                if (this.groupItemMetaExtension && this.groupItemMetaExtension.register) {
                    const instance = this.groupItemMetaExtension.register();
                    this._extensionList.push({ name: ExtensionName.groupItemMetaProvider, class: this.groupItemMetaExtension, addon: instance, instance });
                }
            }
            // Header Button Plugin
            if (this.sharedService.gridOptions.enableHeaderButton) {
                if (this.headerButtonExtension && this.headerButtonExtension.register) {
                    const instance = this.headerButtonExtension.register();
                    this._extensionList.push({ name: ExtensionName.headerButton, class: this.headerButtonExtension, addon: instance, instance });
                }
            }
            // Header Menu Plugin
            if (this.sharedService.gridOptions.enableHeaderMenu) {
                if (this.headerMenuExtension && this.headerMenuExtension.register) {
                    const instance = this.headerMenuExtension.register();
                    this._extensionList.push({ name: ExtensionName.headerMenu, class: this.headerMenuExtension, addon: instance, instance });
                }
            }
            // Row Detail View Plugin
            if (this.sharedService.gridOptions.enableRowDetailView) {
                if (this.rowDetailViewExtension && this.rowDetailViewExtension.register) {
                    const rowSelectionExtension = this.getExtensionByName(ExtensionName.rowSelection);
                    const instance = this.rowDetailViewExtension.register(rowSelectionExtension);
                    this._extensionList.push({ name: ExtensionName.rowDetailView, class: this.rowDetailViewExtension, addon: instance, instance });
                }
            }
            // Row Move Manager Plugin
            if (this.sharedService.gridOptions.enableRowMoveManager) {
                if (this.rowMoveManagerExtension && this.rowMoveManagerExtension.register) {
                    const instance = this.rowMoveManagerExtension.register();
                    this._extensionList.push({ name: ExtensionName.rowMoveManager, class: this.rowMoveManagerExtension, addon: instance, instance });
                }
            }
            // Row Selection Plugin
            if (!this.sharedService.gridOptions.enableCheckboxSelector && this.sharedService.gridOptions.enableRowSelection) {
                if (this.rowSelectionExtension && this.rowSelectionExtension.register) {
                    const instance = this.rowSelectionExtension.register();
                    this._extensionList.push({ name: ExtensionName.rowSelection, class: this.rowSelectionExtension, addon: instance, instance });
                }
            }
            // manually register other plugins
            if (this.sharedService.gridOptions.registerPlugins !== undefined) {
                if (Array.isArray(this.sharedService.gridOptions.registerPlugins)) {
                    this.sharedService.gridOptions.registerPlugins.forEach((plugin) => {
                        const instance = this.sharedService.grid.registerPlugin(plugin);
                        this._extensionList.push({ name: ExtensionName.noname, class: null, addon: instance, instance });
                    });
                }
                else {
                    this.sharedService.grid.registerPlugin(this.sharedService.gridOptions.registerPlugins);
                    const plugin = this.sharedService.gridOptions.registerPlugins;
                    const instance = this.sharedService.grid.registerPlugin(plugin);
                    this._extensionList.push({ name: ExtensionName.noname, class: null, addon: instance, instance });
                }
            }
        }
    }
    /**
     * Attach/Create certain plugins before the Grid creation, else they might behave oddly.
     * Mostly because the column definitions might change after the grid creation
     * @param columnDefinitions
     * @param options
     */
    createExtensionsBeforeGridCreation(columnDefinitions, options) {
        if (options.enableCheckboxSelector) {
            this.checkboxSelectorExtension.create(columnDefinitions, options);
        }
        if (options.enableRowDetailView) {
            this.rowDetailViewExtension.create(columnDefinitions, options);
        }
        if (options.enableDraggableGrouping) {
            const plugin = this.draggableGroupingExtension.create(options);
            options.enableColumnReorder = plugin.getSetupColumnReorder;
        }
    }
    /** Hide a column from the grid */
    hideColumn(column) {
        if (this.sharedService && this.sharedService.grid && this.sharedService.grid.getColumns && this.sharedService.grid.setColumns) {
            const columnIndex = this.sharedService.grid.getColumnIndex(column.id);
            this.sharedService.visibleColumns = this.removeColumnByIndex(this.sharedService.grid.getColumns(), columnIndex);
            this.sharedService.grid.setColumns(this.sharedService.visibleColumns);
        }
    }
    /** Refresh the dataset through the Backend Service */
    refreshBackendDataset(gridOptions) {
        this.gridMenuExtension.refreshBackendDataset(gridOptions);
    }
    /**
     * Remove a column from the grid by it's index in the grid
     * @param columns input
     * @param index
     */
    removeColumnByIndex(columns, index) {
        if (Array.isArray(columns)) {
            return columns.filter((el, i) => index !== i);
        }
        return columns;
    }
    /** Translate the Column Picker and it's last 2 checkboxes */
    translateColumnPicker() {
        if (this.columnPickerExtension && this.columnPickerExtension.translateColumnPicker) {
            this.columnPickerExtension.translateColumnPicker();
        }
    }
    /**
     * Translate the Header Menu titles, we need to loop through all column definition to re-translate them
     */
    translateGridMenu() {
        if (this.gridMenuExtension && this.gridMenuExtension.translateGridMenu) {
            this.gridMenuExtension.translateGridMenu();
        }
    }
    /**
     * Translate the Header Menu titles, we need to loop through all column definition to re-translate them
     */
    translateHeaderMenu() {
        if (this.headerMenuExtension && this.headerMenuExtension.translateHeaderMenu) {
            this.headerMenuExtension.translateHeaderMenu();
        }
    }
    /**
     * Translate manually the header titles.
     * We could optionally pass a locale (that will change currently loaded locale), else it will use current locale
     * @param locale to use
     * @param new column definitions (optional)
     */
    translateColumnHeaders(locale, newColumnDefinitions) {
        if (locale) {
            this.translate.use(locale);
        }
        let columnDefinitions = newColumnDefinitions;
        if (!columnDefinitions) {
            columnDefinitions = this.sharedService.columnDefinitions;
        }
        this.translateItems(columnDefinitions, 'headerKey', 'name');
        this.translateItems(this.sharedService.allColumns, 'headerKey', 'name');
        // re-render the column headers
        this.renderColumnHeaders(columnDefinitions);
    }
    /**
     * Render (or re-render) the column headers from column definitions.
     * calling setColumns() will trigger a grid re-render
     */
    renderColumnHeaders(newColumnDefinitions) {
        let collection = newColumnDefinitions;
        if (!collection) {
            collection = this.sharedService.columnDefinitions;
        }
        if (Array.isArray(collection) && this.sharedService.grid && this.sharedService.grid.setColumns) {
            this.sharedService.grid.setColumns(collection);
        }
    }
    /** Translate an array of items from an input key and assign translated value to the output key */
    translateItems(items, inputKey, outputKey) {
        if (Array.isArray(items)) {
            for (const item of items) {
                if (item[inputKey]) {
                    item[outputKey] = this.translate.instant(item[inputKey]);
                }
            }
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
export { ExtensionService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0ZW5zaW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL3NlcnZpY2VzL2V4dGVuc2lvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxpREFBaUQ7QUFDakQsT0FBTyw0Q0FBNEMsQ0FBQztBQUNwRCxPQUFPLDJDQUEyQyxDQUFDO0FBQ25ELE9BQU8sNENBQTRDLENBQUM7QUFFcEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN2RCxPQUFPLEVBR0wsYUFBYSxHQUVkLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUNMLG9CQUFvQixFQUNwQixnQ0FBZ0MsRUFDaEMseUJBQXlCLEVBQ3pCLHFCQUFxQixFQUNyQiwwQkFBMEIsRUFDMUIsaUJBQWlCLEVBQ2pCLDhCQUE4QixFQUM5QixxQkFBcUIsRUFDckIsbUJBQW1CLEVBQ25CLHNCQUFzQixFQUN0Qix1QkFBdUIsRUFDdkIscUJBQXFCLEdBQ3RCLE1BQU0scUJBQXFCLENBQUM7QUFDN0IsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBR2pELElBQWEsZ0JBQWdCLEdBQTdCLE1BQWEsZ0JBQWdCO0lBRzNCLFlBQ1Usb0JBQTBDLEVBQzFDLHlCQUEyRCxFQUMzRCx5QkFBb0QsRUFDcEQscUJBQTRDLEVBQzVDLDBCQUFzRCxFQUN0RCxpQkFBb0MsRUFDcEMsc0JBQXNELEVBQ3RELHFCQUE0QyxFQUM1QyxtQkFBd0MsRUFDeEMsc0JBQThDLEVBQzlDLHVCQUFnRCxFQUNoRCxxQkFBNEMsRUFDNUMsYUFBNEIsRUFDNUIsU0FBMkI7UUFiM0IseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQUMxQyw4QkFBeUIsR0FBekIseUJBQXlC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QUFpQjtRQUNaLDhCQUE4QjtRQUMvQixxQkFBcUI7UUFDdkIsbUJBQW1CO1FBQ2hCLHNCQUFzQjtRQUNyQix1QkFBdUI7UUFDekIscUJBQXFCO1FBQzdCLGFBQWE7UUFDakIsZ0JBQWdCO0dBakIxQixnQkFBZ0IsQ0E2VDVCO1NBN1RZLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCBjb21tb24gM3JkIHBhcnR5IFNsaWNrR3JpZCBwbHVnaW5zL2xpYnNcclxuaW1wb3J0ICdzbGlja2dyaWQvcGx1Z2lucy9zbGljay5jZWxscmFuZ2VkZWNvcmF0b3InO1xyXG5pbXBvcnQgJ3NsaWNrZ3JpZC9wbHVnaW5zL3NsaWNrLmNlbGxyYW5nZXNlbGVjdG9yJztcclxuaW1wb3J0ICdzbGlja2dyaWQvcGx1Z2lucy9zbGljay5jZWxsc2VsZWN0aW9ubW9kZWwnO1xyXG5cclxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XHJcbmltcG9ydCB7XHJcbiAgQ29sdW1uLFxyXG4gIEV4dGVuc2lvbk1vZGVsLFxyXG4gIEV4dGVuc2lvbk5hbWUsXHJcbiAgR3JpZE9wdGlvbixcclxufSBmcm9tICcuLi9tb2RlbHMvaW5kZXgnO1xyXG5pbXBvcnQge1xyXG4gIEF1dG9Ub29sdGlwRXh0ZW5zaW9uLFxyXG4gIENlbGxFeHRlcm5hbENvcHlNYW5hZ2VyRXh0ZW5zaW9uLFxyXG4gIENoZWNrYm94U2VsZWN0b3JFeHRlbnNpb24sXHJcbiAgQ29sdW1uUGlja2VyRXh0ZW5zaW9uLFxyXG4gIERyYWdnYWJsZUdyb3VwaW5nRXh0ZW5zaW9uLFxyXG4gIEdyaWRNZW51RXh0ZW5zaW9uLFxyXG4gIEdyb3VwSXRlbU1ldGFQcm92aWRlckV4dGVuc2lvbixcclxuICBIZWFkZXJCdXR0b25FeHRlbnNpb24sXHJcbiAgSGVhZGVyTWVudUV4dGVuc2lvbixcclxuICBSb3dEZXRhaWxWaWV3RXh0ZW5zaW9uLFxyXG4gIFJvd01vdmVNYW5hZ2VyRXh0ZW5zaW9uLFxyXG4gIFJvd1NlbGVjdGlvbkV4dGVuc2lvbixcclxufSBmcm9tICcuLi9leHRlbnNpb25zL2luZGV4JztcclxuaW1wb3J0IHsgU2hhcmVkU2VydmljZSB9IGZyb20gJy4vc2hhcmVkLnNlcnZpY2UnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgRXh0ZW5zaW9uU2VydmljZSB7XHJcbiAgcHJpdmF0ZSBfZXh0ZW5zaW9uTGlzdDogRXh0ZW5zaW9uTW9kZWxbXSA9IFtdO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgYXV0b1Rvb2x0aXBFeHRlbnNpb246IEF1dG9Ub29sdGlwRXh0ZW5zaW9uLFxyXG4gICAgcHJpdmF0ZSBjZWxsRXh0ZXJuYWxDb3B5RXh0ZW5zaW9uOiBDZWxsRXh0ZXJuYWxDb3B5TWFuYWdlckV4dGVuc2lvbixcclxuICAgIHByaXZhdGUgY2hlY2tib3hTZWxlY3RvckV4dGVuc2lvbjogQ2hlY2tib3hTZWxlY3RvckV4dGVuc2lvbixcclxuICAgIHByaXZhdGUgY29sdW1uUGlja2VyRXh0ZW5zaW9uOiBDb2x1bW5QaWNrZXJFeHRlbnNpb24sXHJcbiAgICBwcml2YXRlIGRyYWdnYWJsZUdyb3VwaW5nRXh0ZW5zaW9uOiBEcmFnZ2FibGVHcm91cGluZ0V4dGVuc2lvbixcclxuICAgIHByaXZhdGUgZ3JpZE1lbnVFeHRlbnNpb246IEdyaWRNZW51RXh0ZW5zaW9uLFxyXG4gICAgcHJpdmF0ZSBncm91cEl0ZW1NZXRhRXh0ZW5zaW9uOiBHcm91cEl0ZW1NZXRhUHJvdmlkZXJFeHRlbnNpb24sXHJcbiAgICBwcml2YXRlIGhlYWRlckJ1dHRvbkV4dGVuc2lvbjogSGVhZGVyQnV0dG9uRXh0ZW5zaW9uLFxyXG4gICAgcHJpdmF0ZSBoZWFkZXJNZW51RXh0ZW5zaW9uOiBIZWFkZXJNZW51RXh0ZW5zaW9uLFxyXG4gICAgcHJpdmF0ZSByb3dEZXRhaWxWaWV3RXh0ZW5zaW9uOiBSb3dEZXRhaWxWaWV3RXh0ZW5zaW9uLFxyXG4gICAgcHJpdmF0ZSByb3dNb3ZlTWFuYWdlckV4dGVuc2lvbjogUm93TW92ZU1hbmFnZXJFeHRlbnNpb24sXHJcbiAgICBwcml2YXRlIHJvd1NlbGVjdGlvbkV4dGVuc2lvbjogUm93U2VsZWN0aW9uRXh0ZW5zaW9uLFxyXG4gICAgcHJpdmF0ZSBzaGFyZWRTZXJ2aWNlOiBTaGFyZWRTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSB0cmFuc2xhdGU6IFRyYW5zbGF0ZVNlcnZpY2UsXHJcbiAgKSB7IH1cclxuXHJcbiAgLyoqIERpc3Bvc2Ugb2YgYWxsIHRoZSBjb250cm9scyAmIHBsdWdpbnMgKi9cclxuICBkaXNwb3NlKCkge1xyXG4gICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQgPSBudWxsO1xyXG4gICAgdGhpcy5zaGFyZWRTZXJ2aWNlLnZpc2libGVDb2x1bW5zID0gW107XHJcblxyXG4gICAgLy8gZGlzcG9zZSBvZiBlYWNoIGNvbnRyb2wvcGx1Z2luICYgcmVzZXQgdGhlIGxpc3RcclxuICAgIHRoaXMuX2V4dGVuc2lvbkxpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICBpZiAoaXRlbSAmJiBpdGVtLmNsYXNzICYmIGl0ZW0uY2xhc3MuZGlzcG9zZSkge1xyXG4gICAgICAgIGl0ZW0uY2xhc3MuZGlzcG9zZSgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHRoaXMuX2V4dGVuc2lvbkxpc3QgPSBbXTtcclxuICB9XHJcblxyXG4gIC8qKiBHZXQgYWxsIGNvbHVtbnMgKGluY2x1ZGVzIHZpc2libGUgYW5kIG5vbi12aXNpYmxlKSAqL1xyXG4gIGdldEFsbENvbHVtbnMoKTogQ29sdW1uW10ge1xyXG4gICAgcmV0dXJuIHRoaXMuc2hhcmVkU2VydmljZS5hbGxDb2x1bW5zIHx8IFtdO1xyXG4gIH1cclxuXHJcbiAgLyoqIEdldCBvbmx5IHZpc2libGUgY29sdW1ucyAqL1xyXG4gIGdldFZpc2libGVDb2x1bW5zKCk6IENvbHVtbltdIHtcclxuICAgIHJldHVybiB0aGlzLnNoYXJlZFNlcnZpY2UudmlzaWJsZUNvbHVtbnMgfHwgW107XHJcbiAgfVxyXG5cclxuICAvKiogR2V0IGFsbCBFeHRlbnNpb25zICovXHJcbiAgZ2V0QWxsRXh0ZW5zaW9ucygpOiBFeHRlbnNpb25Nb2RlbFtdIHtcclxuICAgIHJldHVybiB0aGlzLl9leHRlbnNpb25MaXN0O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IGFuIEV4dGVuc2lvbiBieSBpdCdzIG5hbWVcclxuICAgKiAgQHBhcmFtIG5hbWVcclxuICAgKi9cclxuICBnZXRFeHRlbnNpb25CeU5hbWUobmFtZTogRXh0ZW5zaW9uTmFtZSk6IEV4dGVuc2lvbk1vZGVsIHwgdW5kZWZpbmVkIHtcclxuICAgIHJldHVybiB0aGlzLl9leHRlbnNpb25MaXN0LmZpbmQoKHApID0+IHAubmFtZSA9PT0gbmFtZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIGluc3RhbmNlIG9mIHRoZSBTbGlja0dyaWQgYWRkb24gKGNvbnRyb2wgb3IgcGx1Z2luKS5cclxuICAgKiBUaGlzIGlzIHRoZSByYXcgYWRkb24gY29taW5nIGRpcmVjdGx5IGZyb20gU2xpY2tHcmlkIGl0c2VsZiwgbm90IHRvIGNvbmZ1c2Ugd2l0aCBBbmd1bGFyLVNsaWNrZ3JpZCBleHRlbnNpb25cclxuICAgKiAgQHBhcmFtIG5hbWVcclxuICAgKi9cclxuICBnZXRTbGlja2dyaWRBZGRvbkluc3RhbmNlKG5hbWU6IEV4dGVuc2lvbk5hbWUpOiBhbnkge1xyXG4gICAgY29uc3QgZXh0ZW5zaW9uID0gdGhpcy5nZXRFeHRlbnNpb25CeU5hbWUobmFtZSk7XHJcbiAgICBpZiAoZXh0ZW5zaW9uICYmIChleHRlbnNpb24uaW5zdGFuY2UgfHwgZXh0ZW5zaW9uLmFkZG9uKSkge1xyXG4gICAgICByZXR1cm4gZXh0ZW5zaW9uLmluc3RhbmNlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICAvKiogQXV0by1yZXNpemUgYWxsIHRoZSBjb2x1bW4gaW4gdGhlIGdyaWQgdG8gZml0IHRoZSBncmlkIHdpZHRoICovXHJcbiAgYXV0b1Jlc2l6ZUNvbHVtbnMoKSB7XHJcbiAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZC5hdXRvc2l6ZUNvbHVtbnMoKTtcclxuICB9XHJcblxyXG4gIC8qKiBBdHRhY2gvQ3JlYXRlIGRpZmZlcmVudCBDb250cm9scyBvciBQbHVnaW5zIGFmdGVyIHRoZSBHcmlkIGlzIGNyZWF0ZWQgKi9cclxuICBiaW5kRGlmZmVyZW50RXh0ZW5zaW9ucygpIHtcclxuICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zKSB7XHJcbiAgICAgIC8vIG1ha2Ugc3VyZSBhbGwgY29sdW1ucyBhcmUgdHJhbnNsYXRlZCBiZWZvcmUgY3JlYXRpbmcgQ29sdW1uUGlja2VyL0dyaWRNZW51IENvbnRyb2xzXHJcbiAgICAgIC8vIHRoaXMgaXMgdG8gYXZvaWQgaGF2aW5nIGhpZGRlbiBjb2x1bW5zIG5vdCBiZWluZyB0cmFuc2xhdGVkIG9uIGZpcnN0IGxvYWRcclxuICAgICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5lbmFibGVUcmFuc2xhdGUpIHtcclxuICAgICAgICB0aGlzLnRyYW5zbGF0ZUl0ZW1zKHRoaXMuc2hhcmVkU2VydmljZS5hbGxDb2x1bW5zLCAnaGVhZGVyS2V5JywgJ25hbWUnKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gQXV0byBUb29sdGlwIFBsdWdpblxyXG4gICAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmVuYWJsZUF1dG9Ub29sdGlwKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuYXV0b1Rvb2x0aXBFeHRlbnNpb24gJiYgdGhpcy5hdXRvVG9vbHRpcEV4dGVuc2lvbi5yZWdpc3Rlcikge1xyXG4gICAgICAgICAgY29uc3QgaW5zdGFuY2UgPSB0aGlzLmF1dG9Ub29sdGlwRXh0ZW5zaW9uLnJlZ2lzdGVyKClcclxuICAgICAgICAgIHRoaXMuX2V4dGVuc2lvbkxpc3QucHVzaCh7IG5hbWU6IEV4dGVuc2lvbk5hbWUuYXV0b1Rvb2x0aXAsIGNsYXNzOiB0aGlzLmF1dG9Ub29sdGlwRXh0ZW5zaW9uLCBhZGRvbjogaW5zdGFuY2UsIGluc3RhbmNlIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gQ2VsbCBFeHRlcm5hbCBDb3B5IE1hbmFnZXIgUGx1Z2luIChFeGNlbCBMaWtlKVxyXG4gICAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmVuYWJsZUV4Y2VsQ29weUJ1ZmZlcikge1xyXG4gICAgICAgIGlmICh0aGlzLmNlbGxFeHRlcm5hbENvcHlFeHRlbnNpb24gJiYgdGhpcy5jZWxsRXh0ZXJuYWxDb3B5RXh0ZW5zaW9uLnJlZ2lzdGVyKSB7XHJcbiAgICAgICAgICBjb25zdCBpbnN0YW5jZSA9IHRoaXMuY2VsbEV4dGVybmFsQ29weUV4dGVuc2lvbi5yZWdpc3RlcigpO1xyXG4gICAgICAgICAgdGhpcy5fZXh0ZW5zaW9uTGlzdC5wdXNoKHsgbmFtZTogRXh0ZW5zaW9uTmFtZS5jZWxsRXh0ZXJuYWxDb3B5TWFuYWdlciwgY2xhc3M6IHRoaXMuY2VsbEV4dGVybmFsQ29weUV4dGVuc2lvbiwgYWRkb246IGluc3RhbmNlLCBpbnN0YW5jZSB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIENoZWNrYm94IFNlbGVjdG9yIFBsdWdpblxyXG4gICAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmVuYWJsZUNoZWNrYm94U2VsZWN0b3IpIHtcclxuICAgICAgICBpZiAodGhpcy5jaGVja2JveFNlbGVjdG9yRXh0ZW5zaW9uICYmIHRoaXMuY2hlY2tib3hTZWxlY3RvckV4dGVuc2lvbi5yZWdpc3Rlcikge1xyXG4gICAgICAgICAgY29uc3Qgcm93U2VsZWN0aW9uRXh0ZW5zaW9uID0gdGhpcy5nZXRFeHRlbnNpb25CeU5hbWUoRXh0ZW5zaW9uTmFtZS5yb3dTZWxlY3Rpb24pO1xyXG4gICAgICAgICAgY29uc3QgaW5zdGFuY2UgPSB0aGlzLmNoZWNrYm94U2VsZWN0b3JFeHRlbnNpb24ucmVnaXN0ZXIocm93U2VsZWN0aW9uRXh0ZW5zaW9uKTtcclxuICAgICAgICAgIHRoaXMuX2V4dGVuc2lvbkxpc3QucHVzaCh7IG5hbWU6IEV4dGVuc2lvbk5hbWUuY2hlY2tib3hTZWxlY3RvciwgY2xhc3M6IHRoaXMuY2hlY2tib3hTZWxlY3RvckV4dGVuc2lvbiwgYWRkb246IGluc3RhbmNlLCBpbnN0YW5jZSB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIENvbHVtbiBQaWNrZXIgQ29udHJvbFxyXG4gICAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmVuYWJsZUNvbHVtblBpY2tlcikge1xyXG4gICAgICAgIGlmICh0aGlzLmNvbHVtblBpY2tlckV4dGVuc2lvbiAmJiB0aGlzLmNvbHVtblBpY2tlckV4dGVuc2lvbi5yZWdpc3Rlcikge1xyXG4gICAgICAgICAgY29uc3QgaW5zdGFuY2UgPSB0aGlzLmNvbHVtblBpY2tlckV4dGVuc2lvbi5yZWdpc3RlcigpO1xyXG4gICAgICAgICAgdGhpcy5fZXh0ZW5zaW9uTGlzdC5wdXNoKHsgbmFtZTogRXh0ZW5zaW9uTmFtZS5jb2x1bW5QaWNrZXIsIGNsYXNzOiB0aGlzLmNvbHVtblBpY2tlckV4dGVuc2lvbiwgYWRkb246IGluc3RhbmNlLCBpbnN0YW5jZSB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIERyYWdnYWJsZSBHcm91cGluZyBQbHVnaW5cclxuICAgICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5lbmFibGVEcmFnZ2FibGVHcm91cGluZykge1xyXG4gICAgICAgIGlmICh0aGlzLmRyYWdnYWJsZUdyb3VwaW5nRXh0ZW5zaW9uICYmIHRoaXMuZHJhZ2dhYmxlR3JvdXBpbmdFeHRlbnNpb24ucmVnaXN0ZXIpIHtcclxuICAgICAgICAgIGNvbnN0IGluc3RhbmNlID0gdGhpcy5kcmFnZ2FibGVHcm91cGluZ0V4dGVuc2lvbi5yZWdpc3RlcigpO1xyXG4gICAgICAgICAgdGhpcy5fZXh0ZW5zaW9uTGlzdC5wdXNoKHsgbmFtZTogRXh0ZW5zaW9uTmFtZS5kcmFnZ2FibGVHcm91cGluZywgY2xhc3M6IHRoaXMuZHJhZ2dhYmxlR3JvdXBpbmdFeHRlbnNpb24sIGFkZG9uOiBpbnN0YW5jZSwgaW5zdGFuY2UgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBHcmlkIE1lbnUgQ29udHJvbFxyXG4gICAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmVuYWJsZUdyaWRNZW51KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZ3JpZE1lbnVFeHRlbnNpb24gJiYgdGhpcy5ncmlkTWVudUV4dGVuc2lvbi5yZWdpc3Rlcikge1xyXG4gICAgICAgICAgY29uc3QgaW5zdGFuY2UgPSB0aGlzLmdyaWRNZW51RXh0ZW5zaW9uLnJlZ2lzdGVyKCk7XHJcbiAgICAgICAgICB0aGlzLl9leHRlbnNpb25MaXN0LnB1c2goeyBuYW1lOiBFeHRlbnNpb25OYW1lLmdyaWRNZW51LCBjbGFzczogdGhpcy5ncmlkTWVudUV4dGVuc2lvbiwgYWRkb246IGluc3RhbmNlLCBpbnN0YW5jZSB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIEdyb3VwaW5nIFBsdWdpblxyXG4gICAgICAvLyByZWdpc3RlciB0aGUgZ3JvdXAgaXRlbSBtZXRhZGF0YSBwcm92aWRlciB0byBhZGQgZXhwYW5kL2NvbGxhcHNlIGdyb3VwIGhhbmRsZXJzXHJcbiAgICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZW5hYmxlRHJhZ2dhYmxlR3JvdXBpbmcgfHwgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmVuYWJsZUdyb3VwaW5nKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZ3JvdXBJdGVtTWV0YUV4dGVuc2lvbiAmJiB0aGlzLmdyb3VwSXRlbU1ldGFFeHRlbnNpb24ucmVnaXN0ZXIpIHtcclxuICAgICAgICAgIGNvbnN0IGluc3RhbmNlID0gdGhpcy5ncm91cEl0ZW1NZXRhRXh0ZW5zaW9uLnJlZ2lzdGVyKCk7XHJcbiAgICAgICAgICB0aGlzLl9leHRlbnNpb25MaXN0LnB1c2goeyBuYW1lOiBFeHRlbnNpb25OYW1lLmdyb3VwSXRlbU1ldGFQcm92aWRlciwgY2xhc3M6IHRoaXMuZ3JvdXBJdGVtTWV0YUV4dGVuc2lvbiwgYWRkb246IGluc3RhbmNlLCBpbnN0YW5jZSB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIEhlYWRlciBCdXR0b24gUGx1Z2luXHJcbiAgICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZW5hYmxlSGVhZGVyQnV0dG9uKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaGVhZGVyQnV0dG9uRXh0ZW5zaW9uICYmIHRoaXMuaGVhZGVyQnV0dG9uRXh0ZW5zaW9uLnJlZ2lzdGVyKSB7XHJcbiAgICAgICAgICBjb25zdCBpbnN0YW5jZSA9IHRoaXMuaGVhZGVyQnV0dG9uRXh0ZW5zaW9uLnJlZ2lzdGVyKCk7XHJcbiAgICAgICAgICB0aGlzLl9leHRlbnNpb25MaXN0LnB1c2goeyBuYW1lOiBFeHRlbnNpb25OYW1lLmhlYWRlckJ1dHRvbiwgY2xhc3M6IHRoaXMuaGVhZGVyQnV0dG9uRXh0ZW5zaW9uLCBhZGRvbjogaW5zdGFuY2UsIGluc3RhbmNlIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gSGVhZGVyIE1lbnUgUGx1Z2luXHJcbiAgICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZW5hYmxlSGVhZGVyTWVudSkge1xyXG4gICAgICAgIGlmICh0aGlzLmhlYWRlck1lbnVFeHRlbnNpb24gJiYgdGhpcy5oZWFkZXJNZW51RXh0ZW5zaW9uLnJlZ2lzdGVyKSB7XHJcbiAgICAgICAgICBjb25zdCBpbnN0YW5jZSA9IHRoaXMuaGVhZGVyTWVudUV4dGVuc2lvbi5yZWdpc3RlcigpO1xyXG4gICAgICAgICAgdGhpcy5fZXh0ZW5zaW9uTGlzdC5wdXNoKHsgbmFtZTogRXh0ZW5zaW9uTmFtZS5oZWFkZXJNZW51LCBjbGFzczogdGhpcy5oZWFkZXJNZW51RXh0ZW5zaW9uLCBhZGRvbjogaW5zdGFuY2UsIGluc3RhbmNlIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gUm93IERldGFpbCBWaWV3IFBsdWdpblxyXG4gICAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmVuYWJsZVJvd0RldGFpbFZpZXcpIHtcclxuICAgICAgICBpZiAodGhpcy5yb3dEZXRhaWxWaWV3RXh0ZW5zaW9uICYmIHRoaXMucm93RGV0YWlsVmlld0V4dGVuc2lvbi5yZWdpc3Rlcikge1xyXG4gICAgICAgICAgY29uc3Qgcm93U2VsZWN0aW9uRXh0ZW5zaW9uID0gdGhpcy5nZXRFeHRlbnNpb25CeU5hbWUoRXh0ZW5zaW9uTmFtZS5yb3dTZWxlY3Rpb24pO1xyXG4gICAgICAgICAgY29uc3QgaW5zdGFuY2UgPSB0aGlzLnJvd0RldGFpbFZpZXdFeHRlbnNpb24ucmVnaXN0ZXIocm93U2VsZWN0aW9uRXh0ZW5zaW9uKTtcclxuICAgICAgICAgIHRoaXMuX2V4dGVuc2lvbkxpc3QucHVzaCh7IG5hbWU6IEV4dGVuc2lvbk5hbWUucm93RGV0YWlsVmlldywgY2xhc3M6IHRoaXMucm93RGV0YWlsVmlld0V4dGVuc2lvbiwgYWRkb246IGluc3RhbmNlLCBpbnN0YW5jZSB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIFJvdyBNb3ZlIE1hbmFnZXIgUGx1Z2luXHJcbiAgICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZW5hYmxlUm93TW92ZU1hbmFnZXIpIHtcclxuICAgICAgICBpZiAodGhpcy5yb3dNb3ZlTWFuYWdlckV4dGVuc2lvbiAmJiB0aGlzLnJvd01vdmVNYW5hZ2VyRXh0ZW5zaW9uLnJlZ2lzdGVyKSB7XHJcbiAgICAgICAgICBjb25zdCBpbnN0YW5jZSA9IHRoaXMucm93TW92ZU1hbmFnZXJFeHRlbnNpb24ucmVnaXN0ZXIoKTtcclxuICAgICAgICAgIHRoaXMuX2V4dGVuc2lvbkxpc3QucHVzaCh7IG5hbWU6IEV4dGVuc2lvbk5hbWUucm93TW92ZU1hbmFnZXIsIGNsYXNzOiB0aGlzLnJvd01vdmVNYW5hZ2VyRXh0ZW5zaW9uLCBhZGRvbjogaW5zdGFuY2UsIGluc3RhbmNlIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gUm93IFNlbGVjdGlvbiBQbHVnaW5cclxuICAgICAgaWYgKCF0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZW5hYmxlQ2hlY2tib3hTZWxlY3RvciAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZW5hYmxlUm93U2VsZWN0aW9uKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucm93U2VsZWN0aW9uRXh0ZW5zaW9uICYmIHRoaXMucm93U2VsZWN0aW9uRXh0ZW5zaW9uLnJlZ2lzdGVyKSB7XHJcbiAgICAgICAgICBjb25zdCBpbnN0YW5jZSA9IHRoaXMucm93U2VsZWN0aW9uRXh0ZW5zaW9uLnJlZ2lzdGVyKCk7XHJcbiAgICAgICAgICB0aGlzLl9leHRlbnNpb25MaXN0LnB1c2goeyBuYW1lOiBFeHRlbnNpb25OYW1lLnJvd1NlbGVjdGlvbiwgY2xhc3M6IHRoaXMucm93U2VsZWN0aW9uRXh0ZW5zaW9uLCBhZGRvbjogaW5zdGFuY2UsIGluc3RhbmNlIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gbWFudWFsbHkgcmVnaXN0ZXIgb3RoZXIgcGx1Z2luc1xyXG4gICAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLnJlZ2lzdGVyUGx1Z2lucyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLnJlZ2lzdGVyUGx1Z2lucykpIHtcclxuICAgICAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5yZWdpc3RlclBsdWdpbnMuZm9yRWFjaCgocGx1Z2luKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGluc3RhbmNlID0gdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQucmVnaXN0ZXJQbHVnaW4ocGx1Z2luKTtcclxuICAgICAgICAgICAgdGhpcy5fZXh0ZW5zaW9uTGlzdC5wdXNoKHsgbmFtZTogRXh0ZW5zaW9uTmFtZS5ub25hbWUsIGNsYXNzOiBudWxsLCBhZGRvbjogaW5zdGFuY2UsIGluc3RhbmNlIH0pO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLnJlZ2lzdGVyUGx1Z2luKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5yZWdpc3RlclBsdWdpbnMpO1xyXG4gICAgICAgICAgY29uc3QgcGx1Z2luID0gdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLnJlZ2lzdGVyUGx1Z2lucztcclxuICAgICAgICAgIGNvbnN0IGluc3RhbmNlID0gdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQucmVnaXN0ZXJQbHVnaW4ocGx1Z2luKTtcclxuICAgICAgICAgIHRoaXMuX2V4dGVuc2lvbkxpc3QucHVzaCh7IG5hbWU6IEV4dGVuc2lvbk5hbWUubm9uYW1lLCBjbGFzczogbnVsbCwgYWRkb246IGluc3RhbmNlLCBpbnN0YW5jZSB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEF0dGFjaC9DcmVhdGUgY2VydGFpbiBwbHVnaW5zIGJlZm9yZSB0aGUgR3JpZCBjcmVhdGlvbiwgZWxzZSB0aGV5IG1pZ2h0IGJlaGF2ZSBvZGRseS5cclxuICAgKiBNb3N0bHkgYmVjYXVzZSB0aGUgY29sdW1uIGRlZmluaXRpb25zIG1pZ2h0IGNoYW5nZSBhZnRlciB0aGUgZ3JpZCBjcmVhdGlvblxyXG4gICAqIEBwYXJhbSBjb2x1bW5EZWZpbml0aW9uc1xyXG4gICAqIEBwYXJhbSBvcHRpb25zXHJcbiAgICovXHJcbiAgY3JlYXRlRXh0ZW5zaW9uc0JlZm9yZUdyaWRDcmVhdGlvbihjb2x1bW5EZWZpbml0aW9uczogQ29sdW1uW10sIG9wdGlvbnM6IEdyaWRPcHRpb24pIHtcclxuICAgIGlmIChvcHRpb25zLmVuYWJsZUNoZWNrYm94U2VsZWN0b3IpIHtcclxuICAgICAgdGhpcy5jaGVja2JveFNlbGVjdG9yRXh0ZW5zaW9uLmNyZWF0ZShjb2x1bW5EZWZpbml0aW9ucywgb3B0aW9ucyk7XHJcbiAgICB9XHJcbiAgICBpZiAob3B0aW9ucy5lbmFibGVSb3dEZXRhaWxWaWV3KSB7XHJcbiAgICAgIHRoaXMucm93RGV0YWlsVmlld0V4dGVuc2lvbi5jcmVhdGUoY29sdW1uRGVmaW5pdGlvbnMsIG9wdGlvbnMpO1xyXG4gICAgfVxyXG4gICAgaWYgKG9wdGlvbnMuZW5hYmxlRHJhZ2dhYmxlR3JvdXBpbmcpIHtcclxuICAgICAgY29uc3QgcGx1Z2luID0gdGhpcy5kcmFnZ2FibGVHcm91cGluZ0V4dGVuc2lvbi5jcmVhdGUob3B0aW9ucyk7XHJcbiAgICAgIG9wdGlvbnMuZW5hYmxlQ29sdW1uUmVvcmRlciA9IHBsdWdpbi5nZXRTZXR1cENvbHVtblJlb3JkZXI7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKiogSGlkZSBhIGNvbHVtbiBmcm9tIHRoZSBncmlkICovXHJcbiAgaGlkZUNvbHVtbihjb2x1bW46IENvbHVtbikge1xyXG4gICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZSAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZCAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZC5nZXRDb2x1bW5zICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLnNldENvbHVtbnMpIHtcclxuICAgICAgY29uc3QgY29sdW1uSW5kZXggPSB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZC5nZXRDb2x1bW5JbmRleChjb2x1bW4uaWQpO1xyXG4gICAgICB0aGlzLnNoYXJlZFNlcnZpY2UudmlzaWJsZUNvbHVtbnMgPSB0aGlzLnJlbW92ZUNvbHVtbkJ5SW5kZXgodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQuZ2V0Q29sdW1ucygpLCBjb2x1bW5JbmRleCk7XHJcbiAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLnNldENvbHVtbnModGhpcy5zaGFyZWRTZXJ2aWNlLnZpc2libGVDb2x1bW5zKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiBSZWZyZXNoIHRoZSBkYXRhc2V0IHRocm91Z2ggdGhlIEJhY2tlbmQgU2VydmljZSAqL1xyXG4gIHJlZnJlc2hCYWNrZW5kRGF0YXNldChncmlkT3B0aW9ucz86IEdyaWRPcHRpb24pIHtcclxuICAgIHRoaXMuZ3JpZE1lbnVFeHRlbnNpb24ucmVmcmVzaEJhY2tlbmREYXRhc2V0KGdyaWRPcHRpb25zKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbW92ZSBhIGNvbHVtbiBmcm9tIHRoZSBncmlkIGJ5IGl0J3MgaW5kZXggaW4gdGhlIGdyaWRcclxuICAgKiBAcGFyYW0gY29sdW1ucyBpbnB1dFxyXG4gICAqIEBwYXJhbSBpbmRleFxyXG4gICAqL1xyXG4gIHJlbW92ZUNvbHVtbkJ5SW5kZXgoY29sdW1uczogQ29sdW1uW10sIGluZGV4OiBudW1iZXIpOiBDb2x1bW5bXSB7XHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheShjb2x1bW5zKSkge1xyXG4gICAgICByZXR1cm4gY29sdW1ucy5maWx0ZXIoKGVsOiBDb2x1bW4sIGk6IG51bWJlcikgPT4gaW5kZXggIT09IGkpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNvbHVtbnM7XHJcbiAgfVxyXG5cclxuICAvKiogVHJhbnNsYXRlIHRoZSBDb2x1bW4gUGlja2VyIGFuZCBpdCdzIGxhc3QgMiBjaGVja2JveGVzICovXHJcbiAgdHJhbnNsYXRlQ29sdW1uUGlja2VyKCkge1xyXG4gICAgaWYgKHRoaXMuY29sdW1uUGlja2VyRXh0ZW5zaW9uICYmIHRoaXMuY29sdW1uUGlja2VyRXh0ZW5zaW9uLnRyYW5zbGF0ZUNvbHVtblBpY2tlcikge1xyXG4gICAgICB0aGlzLmNvbHVtblBpY2tlckV4dGVuc2lvbi50cmFuc2xhdGVDb2x1bW5QaWNrZXIoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRyYW5zbGF0ZSB0aGUgSGVhZGVyIE1lbnUgdGl0bGVzLCB3ZSBuZWVkIHRvIGxvb3AgdGhyb3VnaCBhbGwgY29sdW1uIGRlZmluaXRpb24gdG8gcmUtdHJhbnNsYXRlIHRoZW1cclxuICAgKi9cclxuICB0cmFuc2xhdGVHcmlkTWVudSgpIHtcclxuICAgIGlmICh0aGlzLmdyaWRNZW51RXh0ZW5zaW9uICYmIHRoaXMuZ3JpZE1lbnVFeHRlbnNpb24udHJhbnNsYXRlR3JpZE1lbnUpIHtcclxuICAgICAgdGhpcy5ncmlkTWVudUV4dGVuc2lvbi50cmFuc2xhdGVHcmlkTWVudSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVHJhbnNsYXRlIHRoZSBIZWFkZXIgTWVudSB0aXRsZXMsIHdlIG5lZWQgdG8gbG9vcCB0aHJvdWdoIGFsbCBjb2x1bW4gZGVmaW5pdGlvbiB0byByZS10cmFuc2xhdGUgdGhlbVxyXG4gICAqL1xyXG4gIHRyYW5zbGF0ZUhlYWRlck1lbnUoKSB7XHJcbiAgICBpZiAodGhpcy5oZWFkZXJNZW51RXh0ZW5zaW9uICYmIHRoaXMuaGVhZGVyTWVudUV4dGVuc2lvbi50cmFuc2xhdGVIZWFkZXJNZW51KSB7XHJcbiAgICAgIHRoaXMuaGVhZGVyTWVudUV4dGVuc2lvbi50cmFuc2xhdGVIZWFkZXJNZW51KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUcmFuc2xhdGUgbWFudWFsbHkgdGhlIGhlYWRlciB0aXRsZXMuXHJcbiAgICogV2UgY291bGQgb3B0aW9uYWxseSBwYXNzIGEgbG9jYWxlICh0aGF0IHdpbGwgY2hhbmdlIGN1cnJlbnRseSBsb2FkZWQgbG9jYWxlKSwgZWxzZSBpdCB3aWxsIHVzZSBjdXJyZW50IGxvY2FsZVxyXG4gICAqIEBwYXJhbSBsb2NhbGUgdG8gdXNlXHJcbiAgICogQHBhcmFtIG5ldyBjb2x1bW4gZGVmaW5pdGlvbnMgKG9wdGlvbmFsKVxyXG4gICAqL1xyXG4gIHRyYW5zbGF0ZUNvbHVtbkhlYWRlcnMobG9jYWxlPzogYm9vbGVhbiB8IHN0cmluZywgbmV3Q29sdW1uRGVmaW5pdGlvbnM/OiBDb2x1bW5bXSkge1xyXG4gICAgaWYgKGxvY2FsZSkge1xyXG4gICAgICB0aGlzLnRyYW5zbGF0ZS51c2UobG9jYWxlIGFzIHN0cmluZyk7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGNvbHVtbkRlZmluaXRpb25zID0gbmV3Q29sdW1uRGVmaW5pdGlvbnM7XHJcbiAgICBpZiAoIWNvbHVtbkRlZmluaXRpb25zKSB7XHJcbiAgICAgIGNvbHVtbkRlZmluaXRpb25zID0gdGhpcy5zaGFyZWRTZXJ2aWNlLmNvbHVtbkRlZmluaXRpb25zO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMudHJhbnNsYXRlSXRlbXMoY29sdW1uRGVmaW5pdGlvbnMsICdoZWFkZXJLZXknLCAnbmFtZScpO1xyXG4gICAgdGhpcy50cmFuc2xhdGVJdGVtcyh0aGlzLnNoYXJlZFNlcnZpY2UuYWxsQ29sdW1ucywgJ2hlYWRlcktleScsICduYW1lJyk7XHJcblxyXG4gICAgLy8gcmUtcmVuZGVyIHRoZSBjb2x1bW4gaGVhZGVyc1xyXG4gICAgdGhpcy5yZW5kZXJDb2x1bW5IZWFkZXJzKGNvbHVtbkRlZmluaXRpb25zKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbmRlciAob3IgcmUtcmVuZGVyKSB0aGUgY29sdW1uIGhlYWRlcnMgZnJvbSBjb2x1bW4gZGVmaW5pdGlvbnMuXHJcbiAgICogY2FsbGluZyBzZXRDb2x1bW5zKCkgd2lsbCB0cmlnZ2VyIGEgZ3JpZCByZS1yZW5kZXJcclxuICAgKi9cclxuICByZW5kZXJDb2x1bW5IZWFkZXJzKG5ld0NvbHVtbkRlZmluaXRpb25zPzogQ29sdW1uW10pIHtcclxuICAgIGxldCBjb2xsZWN0aW9uID0gbmV3Q29sdW1uRGVmaW5pdGlvbnM7XHJcbiAgICBpZiAoIWNvbGxlY3Rpb24pIHtcclxuICAgICAgY29sbGVjdGlvbiA9IHRoaXMuc2hhcmVkU2VydmljZS5jb2x1bW5EZWZpbml0aW9ucztcclxuICAgIH1cclxuICAgIGlmIChBcnJheS5pc0FycmF5KGNvbGxlY3Rpb24pICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLnNldENvbHVtbnMpIHtcclxuICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQuc2V0Q29sdW1ucyhjb2xsZWN0aW9uKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiBUcmFuc2xhdGUgYW4gYXJyYXkgb2YgaXRlbXMgZnJvbSBhbiBpbnB1dCBrZXkgYW5kIGFzc2lnbiB0cmFuc2xhdGVkIHZhbHVlIHRvIHRoZSBvdXRwdXQga2V5ICovXHJcbiAgcHJpdmF0ZSB0cmFuc2xhdGVJdGVtcyhpdGVtczogYW55W10sIGlucHV0S2V5OiBzdHJpbmcsIG91dHB1dEtleTogc3RyaW5nKSB7XHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheShpdGVtcykpIHtcclxuICAgICAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zKSB7XHJcbiAgICAgICAgaWYgKGl0ZW1baW5wdXRLZXldKSB7XHJcbiAgICAgICAgICBpdGVtW291dHB1dEtleV0gPSB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KGl0ZW1baW5wdXRLZXldKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19