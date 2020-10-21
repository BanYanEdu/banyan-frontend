import { TranslateService } from '@ngx-translate/core';
import { Extension, GridOption, SlickEventHandler } from '../models';
import { ExportService } from '../services/export.service';
import { ExtensionUtility } from './extensionUtility';
import { FilterService } from '../services/filter.service';
import { SortService } from '../services/sort.service';
import { SharedService } from '../services/shared.service';
export declare class GridMenuExtension implements Extension {
    private exportService;
    private extensionUtility;
    private filterService;
    private sharedService;
    private sortService;
    private translate;
    private _addon;
    private _areVisibleColumnDifferent;
    private _eventHandler;
    private _userOriginalGridMenu;
    constructor(exportService: ExportService, extensionUtility: ExtensionUtility, filterService: FilterService, sharedService: SharedService, sortService: SortService, translate: TranslateService);
    readonly eventHandler: SlickEventHandler;
    dispose(): void;
    showGridMenu(e: any): void;
    /** Create the Header Menu and expose all the available hooks that user can subscribe (onCommand, onBeforeMenuShow, ...) */
    register(): any;
    /** Refresh the dataset through the Backend Service */
    refreshBackendDataset(gridOptions?: GridOption): void;
    /** Translate the Grid Menu titles and column picker */
    translateGridMenu(): void;
    /** Create Grid Menu with Custom Commands if user has enabled Filters and/or uses a Backend Service (OData, GraphQL) */
    private addGridMenuCustomCommands;
    /**
     * Execute the Grid Menu Custom command callback that was triggered by the onCommand subscribe
     * These are the default internal custom commands
     * @param event
     * @param GridMenuItem args
     */
    private executeGridMenuInternalCustomCommands;
    private emptyGridMenuTitles;
    /** @return default Grid Menu options */
    private getDefaultGridMenuOptions;
}
