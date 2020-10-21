import { Extension, SlickEventHandler } from '../models/index';
import { ExtensionUtility } from './extensionUtility';
import { SharedService } from '../services/shared.service';
export declare class RowMoveManagerExtension implements Extension {
    private extensionUtility;
    private sharedService;
    private _addon;
    private _eventHandler;
    constructor(extensionUtility: ExtensionUtility, sharedService: SharedService);
    readonly eventHandler: SlickEventHandler;
    dispose(): void;
    register(rowSelectionPlugin?: any): any;
}
