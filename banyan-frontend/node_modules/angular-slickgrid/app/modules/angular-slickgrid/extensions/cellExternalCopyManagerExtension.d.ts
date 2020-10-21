import { EditCommand, EditUndoRedoBuffer, ExcelCopyBufferOption, Extension, SlickEventHandler } from '../models/index';
import { ExtensionUtility } from './extensionUtility';
import { SharedService } from '../services/shared.service';
export declare class CellExternalCopyManagerExtension implements Extension {
    private extensionUtility;
    private sharedService;
    private _addon;
    private _addonOptions;
    private _eventHandler;
    private _commandQueue;
    private _undoRedoBuffer;
    constructor(extensionUtility: ExtensionUtility, sharedService: SharedService);
    readonly addonOptions: ExcelCopyBufferOption;
    readonly eventHandler: SlickEventHandler;
    readonly commandQueue: EditCommand[];
    readonly undoRedoBuffer: EditUndoRedoBuffer;
    dispose(): void;
    register(): any;
    /** Create an undo redo buffer used by the Excel like copy */
    private createUndoRedoBuffer;
    /** @return default plugin (addon) options */
    private getDefaultOptions;
    /** Attach an undo shortcut key hook that will redo/undo the copy buffer using Ctrl+(Shift)+Z keyboard events */
    private hookUndoShortcutKey;
}
