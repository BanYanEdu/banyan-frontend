import { SharedService } from '../services/shared.service';
import { Extension, GridOption, SlickEventHandler } from '../models/index';
import { ExtensionUtility } from './extensionUtility';
export declare class DraggableGroupingExtension implements Extension {
    private extensionUtility;
    private sharedService;
    private _eventHandler;
    private _addon;
    constructor(extensionUtility: ExtensionUtility, sharedService: SharedService);
    readonly eventHandler: SlickEventHandler;
    dispose(): void;
    /**
     * Attach/Create different plugins before the Grid creation.
     * For example the multi-select have to be added to the column definition before the grid is created to work properly
     */
    create(gridOptions: GridOption): any;
    register(): any;
}
