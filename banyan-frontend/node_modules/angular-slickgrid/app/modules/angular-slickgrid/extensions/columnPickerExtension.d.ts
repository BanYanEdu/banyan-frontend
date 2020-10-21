import { Extension, SlickEventHandler } from '../models/index';
import { ExtensionUtility } from './extensionUtility';
import { SharedService } from '../services/shared.service';
export declare class ColumnPickerExtension implements Extension {
    private extensionUtility;
    private sharedService;
    private _eventHandler;
    private _addon;
    constructor(extensionUtility: ExtensionUtility, sharedService: SharedService);
    readonly eventHandler: SlickEventHandler;
    dispose(): void;
    register(): any;
    /** Translate the Column Picker headers and also the last 2 checkboxes */
    translateColumnPicker(): void;
    private emptyColumnPickerTitles;
}
