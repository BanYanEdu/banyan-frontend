import { Extension, SlickEventHandler } from '../models/index';
import { ExtensionUtility } from './extensionUtility';
import { SharedService } from '../services/shared.service';
export declare class HeaderButtonExtension implements Extension {
    private extensionUtility;
    private sharedService;
    private _eventHandler;
    private _addon;
    constructor(extensionUtility: ExtensionUtility, sharedService: SharedService);
    readonly eventHandler: SlickEventHandler;
    dispose(): void;
    register(): any;
}
