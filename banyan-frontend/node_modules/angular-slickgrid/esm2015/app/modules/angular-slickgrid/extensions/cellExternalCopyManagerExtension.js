import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { ExtensionName, } from '../models/index';
import { ExtensionUtility } from './extensionUtility';
import { sanitizeHtmlToText } from '../services/utilities';
import { SharedService } from '../services/shared.service';
let CellExternalCopyManagerExtension = class CellExternalCopyManagerExtension {
    constructor(extensionUtility, sharedService) {
        this.extensionUtility = extensionUtility;
        this.sharedService = sharedService;
        this._eventHandler = new Slick.EventHandler();
    }
    get addonOptions() {
        return this._addonOptions;
    }
    get eventHandler() {
        return this._eventHandler;
    }
    get commandQueue() {
        return this._commandQueue;
    }
    get undoRedoBuffer() {
        return this._undoRedoBuffer;
    }
    dispose() {
        // unsubscribe all SlickGrid events
        this._eventHandler.unsubscribeAll();
        if (this._addon && this._addon.destroy) {
            this._addon.destroy();
        }
    }
    register() {
        if (this.sharedService && this.sharedService.grid && this.sharedService.gridOptions) {
            // dynamically import the SlickGrid plugin (addon) with RequireJS
            this.extensionUtility.loadExtensionDynamically(ExtensionName.cellExternalCopyManager);
            this.createUndoRedoBuffer();
            this.hookUndoShortcutKey();
            this._addonOptions = Object.assign({}, this.getDefaultOptions(), this.sharedService.gridOptions.excelCopyBufferOptions);
            this.sharedService.grid.setSelectionModel(new Slick.CellSelectionModel());
            this._addon = new Slick.CellExternalCopyManager(this._addonOptions);
            this.sharedService.grid.registerPlugin(this._addon);
            // hook to all possible events
            if (this.sharedService.grid && this.sharedService.gridOptions.excelCopyBufferOptions) {
                if (this.sharedService.gridOptions.excelCopyBufferOptions.onExtensionRegistered) {
                    this.sharedService.gridOptions.excelCopyBufferOptions.onExtensionRegistered(this._addon);
                }
                this._eventHandler.subscribe(this._addon.onCopyCells, (e, args) => {
                    if (this.sharedService.gridOptions.excelCopyBufferOptions && typeof this.sharedService.gridOptions.excelCopyBufferOptions.onCopyCells === 'function') {
                        this.sharedService.gridOptions.excelCopyBufferOptions.onCopyCells(e, args);
                    }
                });
                this._eventHandler.subscribe(this._addon.onCopyCancelled, (e, args) => {
                    if (this.sharedService.gridOptions.excelCopyBufferOptions && typeof this.sharedService.gridOptions.excelCopyBufferOptions.onCopyCancelled === 'function') {
                        this.sharedService.gridOptions.excelCopyBufferOptions.onCopyCancelled(e, args);
                    }
                });
                this._eventHandler.subscribe(this._addon.onPasteCells, (e, args) => {
                    if (this.sharedService.gridOptions.excelCopyBufferOptions && typeof this.sharedService.gridOptions.excelCopyBufferOptions.onPasteCells === 'function') {
                        this.sharedService.gridOptions.excelCopyBufferOptions.onPasteCells(e, args);
                    }
                });
            }
            return this._addon;
        }
        return null;
    }
    /** Create an undo redo buffer used by the Excel like copy */
    createUndoRedoBuffer() {
        let commandCtr = 0;
        this._commandQueue = [];
        this._undoRedoBuffer = {
            queueAndExecuteCommand: (editCommand) => {
                this._commandQueue[commandCtr] = editCommand;
                commandCtr++;
                editCommand.execute();
            },
            undo: () => {
                if (commandCtr === 0) {
                    return;
                }
                commandCtr--;
                const command = this._commandQueue[commandCtr];
                if (command && Slick.GlobalEditorLock.cancelCurrentEdit()) {
                    command.undo();
                }
            },
            redo: () => {
                if (commandCtr >= this._commandQueue.length) {
                    return;
                }
                const command = this._commandQueue[commandCtr];
                commandCtr++;
                if (command && Slick.GlobalEditorLock.cancelCurrentEdit()) {
                    command.execute();
                }
            }
        };
    }
    /** @return default plugin (addon) options */
    getDefaultOptions() {
        let newRowIds = 0;
        return {
            clipboardCommandHandler: (editCommand) => {
                this._undoRedoBuffer.queueAndExecuteCommand.call(this._undoRedoBuffer, editCommand);
            },
            dataItemColumnValueExtractor: (item, columnDef) => {
                // when grid or cell is not editable, we will possibly evaluate the Formatter if it was passed
                // to decide if we evaluate the Formatter, we will use the same flag from Export which is "exportWithFormatter"
                if (!this.sharedService.gridOptions.editable || !columnDef.editor) {
                    const isEvaluatingFormatter = (columnDef.exportWithFormatter !== undefined) ? columnDef.exportWithFormatter : (this.sharedService.gridOptions.exportOptions && this.sharedService.gridOptions.exportOptions.exportWithFormatter);
                    if (columnDef.formatter && isEvaluatingFormatter) {
                        const formattedOutput = columnDef.formatter(0, 0, item[columnDef.field], columnDef, item, this.sharedService.grid);
                        if (columnDef.sanitizeDataExport || (this.sharedService.gridOptions.exportOptions && this.sharedService.gridOptions.exportOptions.sanitizeDataExport)) {
                            let outputString = formattedOutput;
                            if (formattedOutput && typeof formattedOutput === 'object' && formattedOutput.hasOwnProperty('text')) {
                                outputString = formattedOutput.text;
                            }
                            if (outputString === null) {
                                outputString = '';
                            }
                            return sanitizeHtmlToText(outputString);
                        }
                        return formattedOutput;
                    }
                }
                // else use the default "dataItemColumnValueExtractor" from the plugin itself
                // we can do that by setting back the getter with null
                return null;
            },
            readOnlyMode: false,
            includeHeaderWhenCopying: false,
            newRowCreator: (count) => {
                for (let i = 0; i < count; i++) {
                    const item = {
                        id: 'newRow_' + newRowIds++
                    };
                    this.sharedService.grid.getData().addItem(item);
                }
            }
        };
    }
    /** Attach an undo shortcut key hook that will redo/undo the copy buffer using Ctrl+(Shift)+Z keyboard events */
    hookUndoShortcutKey() {
        document.addEventListener('keydown', (e) => {
            const keyCode = e.keyCode || e.code;
            if (keyCode === 90 && (e.ctrlKey || e.metaKey)) {
                if (e.shiftKey) {
                    this._undoRedoBuffer.redo(); // Ctrl + Shift + Z
                }
                else {
                    this._undoRedoBuffer.undo(); // Ctrl + Z
                }
            }
        });
    }
};
CellExternalCopyManagerExtension = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [ExtensionUtility, SharedService])
], CellExternalCopyManagerExtension);
export { CellExternalCopyManagerExtension };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VsbEV4dGVybmFsQ29weU1hbmFnZXJFeHRlbnNpb24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL2V4dGVuc2lvbnMvY2VsbEV4dGVybmFsQ29weU1hbmFnZXJFeHRlbnNpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQU1MLGFBQWEsR0FHZCxNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzNELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQU8zRCxJQUFhLGdDQUFnQyxHQUE3QyxNQUFhLGdDQUFnQztJQU8zQyxZQUFvQixnQkFBa0MsRUFBVSxhQUE0QjtRQUF4RSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQVUsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDMUYsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUNoRCxDQUFDO0lBRUQsSUFBSSxZQUFZO1FBQ2QsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQzVCLENBQUM7SUFFRCxJQUFJLFlBQVk7UUFDZCxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7SUFDNUIsQ0FBQztJQUVELElBQUksWUFBWTtRQUNkLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQztJQUM1QixDQUFDO0lBRUQsSUFBSSxjQUFjO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQztJQUM5QixDQUFDO0lBRUQsT0FBTztRQUNMLG1DQUFtQztRQUNuQyxJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsRUFB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Z0JBQWdCLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBZ0IsRUFBRSxFQUFFO1lBQ3hELE1BQU0sT0FBTyxHQUFHLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNwQyxJQUFJLE9BQU8sS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRTtnQkFDOUMsSUFBSSxDQUFDLENBQUMsUUFBUSxFQUFFO29CQUNkLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxtQkFBbUI7aUJBQ2pEO3FCQUFNO29CQUNMLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxXQUFXO2lCQUN6QzthQUNGO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0YsQ0FBQTtBQXRLWSxnQ0FBZ0M7SUFENUMsVUFBVSxFQUFFOzZDQVEyQixnQkFBZ0IsRUFBeUIsYUFBYTtHQVBqRixnQ0FBZ0MsQ0FzSzVDO1NBdEtZLGdDQUFnQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtcclxuICBDb2x1bW4sXHJcbiAgRWRpdENvbW1hbmQsXHJcbiAgRWRpdFVuZG9SZWRvQnVmZmVyLFxyXG4gIEV4Y2VsQ29weUJ1ZmZlck9wdGlvbixcclxuICBFeHRlbnNpb24sXHJcbiAgRXh0ZW5zaW9uTmFtZSxcclxuICBTZWxlY3RlZFJhbmdlLFxyXG4gIFNsaWNrRXZlbnRIYW5kbGVyLFxyXG59IGZyb20gJy4uL21vZGVscy9pbmRleCc7XHJcbmltcG9ydCB7IEV4dGVuc2lvblV0aWxpdHkgfSBmcm9tICcuL2V4dGVuc2lvblV0aWxpdHknO1xyXG5pbXBvcnQgeyBzYW5pdGl6ZUh0bWxUb1RleHQgfSBmcm9tICcuLi9zZXJ2aWNlcy91dGlsaXRpZXMnO1xyXG5pbXBvcnQgeyBTaGFyZWRTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvc2hhcmVkLnNlcnZpY2UnO1xyXG5cclxuLy8gdXNpbmcgZXh0ZXJuYWwgbm9uLXR5cGVkIGpzIGxpYnJhcmllc1xyXG5kZWNsYXJlIHZhciBTbGljazogYW55O1xyXG5kZWNsYXJlIHZhciAkOiBhbnk7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBDZWxsRXh0ZXJuYWxDb3B5TWFuYWdlckV4dGVuc2lvbiBpbXBsZW1lbnRzIEV4dGVuc2lvbiB7XHJcbiAgcHJpdmF0ZSBfYWRkb246IGFueTtcclxuICBwcml2YXRlIF9hZGRvbk9wdGlvbnM6IEV4Y2VsQ29weUJ1ZmZlck9wdGlvbjtcclxuICBwcml2YXRlIF9ldmVudEhhbmRsZXI6IFNsaWNrRXZlbnRIYW5kbGVyO1xyXG4gIHByaXZhdGUgX2NvbW1hbmRRdWV1ZTogRWRpdENvbW1hbmRbXTtcclxuICBwcml2YXRlIF91bmRvUmVkb0J1ZmZlcjogRWRpdFVuZG9SZWRvQnVmZmVyO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGV4dGVuc2lvblV0aWxpdHk6IEV4dGVuc2lvblV0aWxpdHksIHByaXZhdGUgc2hhcmVkU2VydmljZTogU2hhcmVkU2VydmljZSkge1xyXG4gICAgdGhpcy5fZXZlbnRIYW5kbGVyID0gbmV3IFNsaWNrLkV2ZW50SGFuZGxlcigpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGFkZG9uT3B0aW9ucygpOiBFeGNlbENvcHlCdWZmZXJPcHRpb24ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2FkZG9uT3B0aW9ucztcclxuICB9XHJcblxyXG4gIGdldCBldmVudEhhbmRsZXIoKTogU2xpY2tFdmVudEhhbmRsZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuX2V2ZW50SGFuZGxlcjtcclxuICB9XHJcblxyXG4gIGdldCBjb21tYW5kUXVldWUoKTogRWRpdENvbW1hbmRbXSB7XHJcbiAgICByZXR1cm4gdGhpcy5fY29tbWFuZFF1ZXVlO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHVuZG9SZWRvQnVmZmVyKCk6IEVkaXRVbmRvUmVkb0J1ZmZlciB7XHJcbiAgICByZXR1cm4gdGhpcy5fdW5kb1JlZG9CdWZmZXI7XHJcbiAgfVxyXG5cclxuICBkaXNwb3NlKCkge1xyXG4gICAgLy8gdW5zdWJzY3JpYmUgYWxsIFNsaWNrR3JpZCBldmVudHNcclxuICAgIHRoaXMuX2V2ZW50SGFuZGxlci51bnN1YnNjcmliZUFsbCgpO1xyXG4gICAgaWYgKHRoaXMuX2FkZG9uICYmIHRoaXMuX2FkZG9uLmRlc3Ryb3kpIHtcclxuICAgICAgdGhpcy5fYWRkb24uZGVzdHJveSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVnaXN0ZXIoKTogYW55IHtcclxuICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zKSB7XHJcbiAgICAgIC8vIGR5bmFtaWNhbGx5IGltcG9ydCB0aGUgU2xpY2tHcmlkIHBsdWdpbiAoYWRkb24pIHdpdGggUmVxdWlyZUpTXHJcbiAgICAgIHRoaXMuZXh0ZW5zaW9uVXRpbGl0eS5sb2FkRXh0ZW5zaW9uRHluYW1pY2FsbHkoRXh0ZW5zaW9uTmFtZS5jZWxsRXh0ZXJuYWxDb3B5TWFuYWdlcik7XHJcbiAgICAgIHRoaXMuY3JlYXRlVW5kb1JlZG9CdWZmZXIoKTtcclxuICAgICAgdGhpcy5ob29rVW5kb1Nob3J0Y3V0S2V5KCk7XHJcblxyXG4gICAgICB0aGlzLl9hZGRvbk9wdGlvbnMgPSB7IC4uLnRoaXMuZ2V0RGVmYXVsdE9wdGlvbnMoKSwgLi4udGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmV4Y2VsQ29weUJ1ZmZlck9wdGlvbnMgfSBhcyBFeGNlbENvcHlCdWZmZXJPcHRpb247XHJcbiAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLnNldFNlbGVjdGlvbk1vZGVsKG5ldyBTbGljay5DZWxsU2VsZWN0aW9uTW9kZWwoKSk7XHJcbiAgICAgIHRoaXMuX2FkZG9uID0gbmV3IFNsaWNrLkNlbGxFeHRlcm5hbENvcHlNYW5hZ2VyKHRoaXMuX2FkZG9uT3B0aW9ucyk7XHJcbiAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLnJlZ2lzdGVyUGx1Z2luKHRoaXMuX2FkZG9uKTtcclxuXHJcbiAgICAgIC8vIGhvb2sgdG8gYWxsIHBvc3NpYmxlIGV2ZW50c1xyXG4gICAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmV4Y2VsQ29weUJ1ZmZlck9wdGlvbnMpIHtcclxuICAgICAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmV4Y2VsQ29weUJ1ZmZlck9wdGlvbnMub25FeHRlbnNpb25SZWdpc3RlcmVkKSB7XHJcbiAgICAgICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZXhjZWxDb3B5QnVmZmVyT3B0aW9ucy5vbkV4dGVuc2lvblJlZ2lzdGVyZWQodGhpcy5fYWRkb24pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9ldmVudEhhbmRsZXIuc3Vic2NyaWJlKHRoaXMuX2FkZG9uLm9uQ29weUNlbGxzLCAoZTogYW55LCBhcmdzOiB7IHJhbmdlczogU2VsZWN0ZWRSYW5nZVtdIH0pID0+IHtcclxuICAgICAgICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZXhjZWxDb3B5QnVmZmVyT3B0aW9ucyAmJiB0eXBlb2YgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmV4Y2VsQ29weUJ1ZmZlck9wdGlvbnMub25Db3B5Q2VsbHMgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmV4Y2VsQ29weUJ1ZmZlck9wdGlvbnMub25Db3B5Q2VsbHMoZSwgYXJncyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5fZXZlbnRIYW5kbGVyLnN1YnNjcmliZSh0aGlzLl9hZGRvbi5vbkNvcHlDYW5jZWxsZWQsIChlOiBhbnksIGFyZ3M6IHsgcmFuZ2VzOiBTZWxlY3RlZFJhbmdlW10gfSkgPT4ge1xyXG4gICAgICAgICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5leGNlbENvcHlCdWZmZXJPcHRpb25zICYmIHR5cGVvZiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZXhjZWxDb3B5QnVmZmVyT3B0aW9ucy5vbkNvcHlDYW5jZWxsZWQgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmV4Y2VsQ29weUJ1ZmZlck9wdGlvbnMub25Db3B5Q2FuY2VsbGVkKGUsIGFyZ3MpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuX2V2ZW50SGFuZGxlci5zdWJzY3JpYmUodGhpcy5fYWRkb24ub25QYXN0ZUNlbGxzLCAoZTogYW55LCBhcmdzOiB7IHJhbmdlczogU2VsZWN0ZWRSYW5nZVtdIH0pID0+IHtcclxuICAgICAgICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZXhjZWxDb3B5QnVmZmVyT3B0aW9ucyAmJiB0eXBlb2YgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmV4Y2VsQ29weUJ1ZmZlck9wdGlvbnMub25QYXN0ZUNlbGxzID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5leGNlbENvcHlCdWZmZXJPcHRpb25zLm9uUGFzdGVDZWxscyhlLCBhcmdzKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHRoaXMuX2FkZG9uO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICAvKiogQ3JlYXRlIGFuIHVuZG8gcmVkbyBidWZmZXIgdXNlZCBieSB0aGUgRXhjZWwgbGlrZSBjb3B5ICovXHJcbiAgcHJpdmF0ZSBjcmVhdGVVbmRvUmVkb0J1ZmZlcigpIHtcclxuICAgIGxldCBjb21tYW5kQ3RyID0gMDtcclxuICAgIHRoaXMuX2NvbW1hbmRRdWV1ZSA9IFtdO1xyXG5cclxuICAgIHRoaXMuX3VuZG9SZWRvQnVmZmVyID0ge1xyXG4gICAgICBxdWV1ZUFuZEV4ZWN1dGVDb21tYW5kOiAoZWRpdENvbW1hbmQ6IEVkaXRDb21tYW5kKSA9PiB7XHJcbiAgICAgICAgdGhpcy5fY29tbWFuZFF1ZXVlW2NvbW1hbmRDdHJdID0gZWRpdENvbW1hbmQ7XHJcbiAgICAgICAgY29tbWFuZEN0cisrO1xyXG4gICAgICAgIGVkaXRDb21tYW5kLmV4ZWN1dGUoKTtcclxuICAgICAgfSxcclxuICAgICAgdW5kbzogKCkgPT4ge1xyXG4gICAgICAgIGlmIChjb21tYW5kQ3RyID09PSAwKSB7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbW1hbmRDdHItLTtcclxuICAgICAgICBjb25zdCBjb21tYW5kID0gdGhpcy5fY29tbWFuZFF1ZXVlW2NvbW1hbmRDdHJdO1xyXG4gICAgICAgIGlmIChjb21tYW5kICYmIFNsaWNrLkdsb2JhbEVkaXRvckxvY2suY2FuY2VsQ3VycmVudEVkaXQoKSkge1xyXG4gICAgICAgICAgY29tbWFuZC51bmRvKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICByZWRvOiAoKSA9PiB7XHJcbiAgICAgICAgaWYgKGNvbW1hbmRDdHIgPj0gdGhpcy5fY29tbWFuZFF1ZXVlLmxlbmd0aCkge1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBjb21tYW5kID0gdGhpcy5fY29tbWFuZFF1ZXVlW2NvbW1hbmRDdHJdO1xyXG4gICAgICAgIGNvbW1hbmRDdHIrKztcclxuICAgICAgICBpZiAoY29tbWFuZCAmJiBTbGljay5HbG9iYWxFZGl0b3JMb2NrLmNhbmNlbEN1cnJlbnRFZGl0KCkpIHtcclxuICAgICAgICAgIGNvbW1hbmQuZXhlY3V0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8qKiBAcmV0dXJuIGRlZmF1bHQgcGx1Z2luIChhZGRvbikgb3B0aW9ucyAqL1xyXG4gIHByaXZhdGUgZ2V0RGVmYXVsdE9wdGlvbnMoKTogRXhjZWxDb3B5QnVmZmVyT3B0aW9uIHtcclxuICAgIGxldCBuZXdSb3dJZHMgPSAwO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIGNsaXBib2FyZENvbW1hbmRIYW5kbGVyOiAoZWRpdENvbW1hbmQ6IGFueSkgPT4ge1xyXG4gICAgICAgIHRoaXMuX3VuZG9SZWRvQnVmZmVyLnF1ZXVlQW5kRXhlY3V0ZUNvbW1hbmQuY2FsbCh0aGlzLl91bmRvUmVkb0J1ZmZlciwgZWRpdENvbW1hbmQpO1xyXG4gICAgICB9LFxyXG4gICAgICBkYXRhSXRlbUNvbHVtblZhbHVlRXh0cmFjdG9yOiAoaXRlbTogYW55LCBjb2x1bW5EZWY6IENvbHVtbikgPT4ge1xyXG4gICAgICAgIC8vIHdoZW4gZ3JpZCBvciBjZWxsIGlzIG5vdCBlZGl0YWJsZSwgd2Ugd2lsbCBwb3NzaWJseSBldmFsdWF0ZSB0aGUgRm9ybWF0dGVyIGlmIGl0IHdhcyBwYXNzZWRcclxuICAgICAgICAvLyB0byBkZWNpZGUgaWYgd2UgZXZhbHVhdGUgdGhlIEZvcm1hdHRlciwgd2Ugd2lsbCB1c2UgdGhlIHNhbWUgZmxhZyBmcm9tIEV4cG9ydCB3aGljaCBpcyBcImV4cG9ydFdpdGhGb3JtYXR0ZXJcIlxyXG4gICAgICAgIGlmICghdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmVkaXRhYmxlIHx8ICFjb2x1bW5EZWYuZWRpdG9yKSB7XHJcbiAgICAgICAgICBjb25zdCBpc0V2YWx1YXRpbmdGb3JtYXR0ZXIgPSAoY29sdW1uRGVmLmV4cG9ydFdpdGhGb3JtYXR0ZXIgIT09IHVuZGVmaW5lZCkgPyBjb2x1bW5EZWYuZXhwb3J0V2l0aEZvcm1hdHRlciA6ICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZXhwb3J0T3B0aW9ucyAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZXhwb3J0T3B0aW9ucy5leHBvcnRXaXRoRm9ybWF0dGVyKTtcclxuICAgICAgICAgIGlmIChjb2x1bW5EZWYuZm9ybWF0dGVyICYmIGlzRXZhbHVhdGluZ0Zvcm1hdHRlcikge1xyXG4gICAgICAgICAgICBjb25zdCBmb3JtYXR0ZWRPdXRwdXQgPSBjb2x1bW5EZWYuZm9ybWF0dGVyKDAsIDAsIGl0ZW1bY29sdW1uRGVmLmZpZWxkXSwgY29sdW1uRGVmLCBpdGVtLCB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZCk7XHJcbiAgICAgICAgICAgIGlmIChjb2x1bW5EZWYuc2FuaXRpemVEYXRhRXhwb3J0IHx8ICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZXhwb3J0T3B0aW9ucyAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMuZXhwb3J0T3B0aW9ucy5zYW5pdGl6ZURhdGFFeHBvcnQpKSB7XHJcbiAgICAgICAgICAgICAgbGV0IG91dHB1dFN0cmluZyA9IGZvcm1hdHRlZE91dHB1dCBhcyBzdHJpbmc7XHJcbiAgICAgICAgICAgICAgaWYgKGZvcm1hdHRlZE91dHB1dCAmJiB0eXBlb2YgZm9ybWF0dGVkT3V0cHV0ID09PSAnb2JqZWN0JyAmJiBmb3JtYXR0ZWRPdXRwdXQuaGFzT3duUHJvcGVydHkoJ3RleHQnKSkge1xyXG4gICAgICAgICAgICAgICAgb3V0cHV0U3RyaW5nID0gZm9ybWF0dGVkT3V0cHV0LnRleHQ7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGlmIChvdXRwdXRTdHJpbmcgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIG91dHB1dFN0cmluZyA9ICcnO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICByZXR1cm4gc2FuaXRpemVIdG1sVG9UZXh0KG91dHB1dFN0cmluZyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGZvcm1hdHRlZE91dHB1dDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gZWxzZSB1c2UgdGhlIGRlZmF1bHQgXCJkYXRhSXRlbUNvbHVtblZhbHVlRXh0cmFjdG9yXCIgZnJvbSB0aGUgcGx1Z2luIGl0c2VsZlxyXG4gICAgICAgIC8vIHdlIGNhbiBkbyB0aGF0IGJ5IHNldHRpbmcgYmFjayB0aGUgZ2V0dGVyIHdpdGggbnVsbFxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICB9LFxyXG4gICAgICByZWFkT25seU1vZGU6IGZhbHNlLFxyXG4gICAgICBpbmNsdWRlSGVhZGVyV2hlbkNvcHlpbmc6IGZhbHNlLFxyXG4gICAgICBuZXdSb3dDcmVhdG9yOiAoY291bnQ6IG51bWJlcikgPT4ge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xyXG4gICAgICAgICAgY29uc3QgaXRlbSA9IHtcclxuICAgICAgICAgICAgaWQ6ICduZXdSb3dfJyArIG5ld1Jvd0lkcysrXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQuZ2V0RGF0YSgpLmFkZEl0ZW0oaXRlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgLyoqIEF0dGFjaCBhbiB1bmRvIHNob3J0Y3V0IGtleSBob29rIHRoYXQgd2lsbCByZWRvL3VuZG8gdGhlIGNvcHkgYnVmZmVyIHVzaW5nIEN0cmwrKFNoaWZ0KStaIGtleWJvYXJkIGV2ZW50cyAqL1xyXG4gIHByaXZhdGUgaG9va1VuZG9TaG9ydGN1dEtleSgpIHtcclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZTogS2V5Ym9hcmRFdmVudCkgPT4ge1xyXG4gICAgICBjb25zdCBrZXlDb2RlID0gZS5rZXlDb2RlIHx8IGUuY29kZTtcclxuICAgICAgaWYgKGtleUNvZGUgPT09IDkwICYmIChlLmN0cmxLZXkgfHwgZS5tZXRhS2V5KSkge1xyXG4gICAgICAgIGlmIChlLnNoaWZ0S2V5KSB7XHJcbiAgICAgICAgICB0aGlzLl91bmRvUmVkb0J1ZmZlci5yZWRvKCk7IC8vIEN0cmwgKyBTaGlmdCArIFpcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5fdW5kb1JlZG9CdWZmZXIudW5kbygpOyAvLyBDdHJsICsgWlxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==