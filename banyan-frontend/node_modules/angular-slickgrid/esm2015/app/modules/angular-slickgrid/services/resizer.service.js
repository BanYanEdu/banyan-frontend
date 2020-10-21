import { getScrollBarWidth } from './utilities';
import { Subject } from 'rxjs';
// global constants, height/width are in pixels
const DATAGRID_MIN_HEIGHT = 180;
const DATAGRID_MIN_WIDTH = 300;
const DATAGRID_BOTTOM_PADDING = 20;
const DATAGRID_PAGINATION_HEIGHT = 35;
export class ResizerService {
    constructor() {
        this._resizePaused = false;
        this.onGridAfterResize = new Subject();
        this.onGridBeforeResize = new Subject();
    }
    /** Getter for the Grid Options pulled through the Grid Object */
    get _gridOptions() {
        return (this._grid && this._grid.getOptions) ? this._grid.getOptions() : {};
    }
    get _gridUid() {
        return (this._grid && this._grid.getUID) ? this._grid.getUID() : this._gridOptions && this._gridOptions.gridId;
    }
    init(grid, fixedDimensions) {
        this._grid = grid;
        if (fixedDimensions) {
            this._fixedHeight = fixedDimensions.height;
            this._fixedWidth = fixedDimensions.width;
        }
    }
    /** Attach an auto resize trigger on the datagrid, if that is enable then it will resize itself to the available space
     * Options: we could also provide a % factor to resize on each height/width independently
     */
    bindAutoResizeDataGrid(newSizes) {
        // if we can't find the grid to resize, return without attaching anything
        const gridDomElm = $(`#${this._gridOptions && this._gridOptions.gridId ? this._gridOptions.gridId : 'grid1'}`);
        if (gridDomElm === undefined || gridDomElm.offset() === undefined) {
            return null;
        }
        // -- 1st resize the datagrid size at first load (we need this because the .on event is not triggered on first load)
        // -- also we add a slight delay (in ms) so that we resize after the grid render is done
        this.resizeGrid(10, newSizes);
        // -- 2nd attach a trigger on the Window DOM element, so that it happens also when resizing after first load
        // -- attach auto-resize to Window object only if it exist
        $(window).on(`resize.grid.${this._gridUid}`, (event) => {
            this.onGridBeforeResize.next(event);
            if (!this._resizePaused) {
                this.resizeGrid(0, newSizes);
            }
        });
    }
    /**
     * Calculate the datagrid new height/width from the available space, also consider that a % factor might be applied to calculation
     * object gridOptions
     */
    calculateGridNewDimensions(gridOptions) {
        const gridDomElm = $(`#${gridOptions.gridId}`);
        const autoResizeOptions = gridOptions && gridOptions.autoResize || {};
        const containerElm = (autoResizeOptions && autoResizeOptions.containerId) ? $(`#${autoResizeOptions.containerId}`) : $(`#${gridOptions.gridContainerId}`);
        if (!window || containerElm === undefined || gridDomElm === undefined) {
            return null;
        }
        // calculate bottom padding
        // if using pagination, we need to add the pagination height to this bottom padding
        let bottomPadding = (autoResizeOptions && autoResizeOptions.bottomPadding) ? autoResizeOptions.bottomPadding : DATAGRID_BOTTOM_PADDING;
        if (bottomPadding && (gridOptions.enablePagination || this._gridOptions.backendServiceApi)) {
            bottomPadding += DATAGRID_PAGINATION_HEIGHT;
        }
        let gridHeight = 0;
        let gridOffsetTop = 0;
        // which DOM element are we using to calculate the available size for the grid?
        if (autoResizeOptions.calculateAvailableSizeBy === 'container') {
            // uses the container's height to calculate grid height without any top offset
            gridHeight = containerElm.height() || 0;
        }
        else {
            // uses the browser's window height with its top offset to calculate grid height
            gridHeight = window.innerHeight || 0;
            const coordOffsetTop = gridDomElm.offset();
            gridOffsetTop = (coordOffsetTop !== undefined) ? coordOffsetTop.top : 0;
        }
        const availableHeight = gridHeight - gridOffsetTop - bottomPadding;
        const availableWidth = containerElm.width() || 0;
        const maxHeight = autoResizeOptions && autoResizeOptions.maxHeight || undefined;
        const minHeight = autoResizeOptions && autoResizeOptions.minHeight || DATAGRID_MIN_HEIGHT;
        const maxWidth = autoResizeOptions && autoResizeOptions.maxWidth || undefined;
        const minWidth = autoResizeOptions && autoResizeOptions.minWidth || DATAGRID_MIN_WIDTH;
        let newHeight = availableHeight;
        let newWidth = (autoResizeOptions && autoResizeOptions.sidePadding) ? availableWidth - autoResizeOptions.sidePadding : availableWidth;
        // optionally (when defined), make sure that grid height & width are within their thresholds
        if (newHeight < minHeight) {
            newHeight = minHeight;
        }
        if (maxHeight && newHeight > maxHeight) {
            newHeight = maxHeight;
        }
        if (newWidth < minWidth) {
            newWidth = minWidth;
        }
        if (maxWidth && newWidth > maxWidth) {
            newWidth = maxWidth;
        }
        // return the new dimensions unless a fixed height/width was defined
        return {
            height: this._fixedHeight || newHeight,
            width: this._fixedWidth || newWidth
        };
    }
    /**
     * Dispose function when element is destroyed
     */
    dispose() {
        $(window).off(`resize.grid.${this._gridUid}`);
    }
    /**
     * For some reason this only seems to happen in Chrome and is sometime miscalculated by SlickGrid measureSrollbar() method
     * When that happens we will compensate and resize the Grid Viewport to avoid seeing horizontal scrollbar
     * Most of the time it happens, it's a tiny offset calculation of usually 3px (enough to show scrollbar)
     * GitHub issue reference: https://github.com/6pac/SlickGrid/issues/275
     */
    compensateHorizontalScroll(grid, gridOptions) {
        const gridElm = $(`#${gridOptions.gridId}`);
        const scrollbarDimensions = grid && grid.getScrollbarDimensions();
        const slickGridScrollbarWidth = scrollbarDimensions && scrollbarDimensions.width;
        const calculatedScrollbarWidth = getScrollBarWidth();
        // if scrollbar width is different from SlickGrid calculation to our custom calculation
        // then resize the grid with the missing pixels to remove scroll (usually only 3px)
        if (slickGridScrollbarWidth < calculatedScrollbarWidth) {
            gridElm.width(gridElm.width() + (calculatedScrollbarWidth - slickGridScrollbarWidth));
        }
    }
    /**
     * Return the last resize dimensions used by the service
     * @return last dimensions
     */
    getLastResizeDimensions() {
        return this._lastDimensions;
    }
    /** Provide the possibility to pause the resizer for some time, until user decides to re-enabled it later if he wish to. */
    pauseResizer(isResizePaused) {
        this._resizePaused = isResizePaused;
    }
    /** Resize the datagrid to fit the browser height & width */
    resizeGrid(delay = 10, newSizes) {
        if (!this._grid || !this._gridOptions) {
            throw new Error(`
      Angular-Slickgrid resizer requires a valid Grid object and Grid Options defined.
      You can fix this by setting your gridOption to use "enableAutoResize" or create an instance of the ResizerService by calling bindAutoResizeDataGrid()`);
        }
        return new Promise((resolve) => {
            // because of the javascript async nature, we might want to delay the resize a little bit
            delay = delay || 0;
            if (delay > 0) {
                clearTimeout(this._timer);
                this._timer = setTimeout(() => resolve(this.resizeGridCallback(newSizes)), delay);
            }
            else {
                resolve(this.resizeGridCallback(newSizes));
            }
        });
    }
    resizeGridCallback(newSizes) {
        const lastDimensions = this.resizeGridWithDimensions(newSizes);
        this.onGridAfterResize.next(lastDimensions);
        return lastDimensions;
    }
    resizeGridWithDimensions(newSizes) {
        // calculate the available sizes with minimum height defined as a constant
        const availableDimensions = this.calculateGridNewDimensions(this._gridOptions);
        const gridElm = $(`#${this._gridOptions.gridId}`) || {};
        const gridContainerElm = $(`#${this._gridOptions.gridContainerId}`) || {};
        if ((newSizes || availableDimensions) && gridElm.length > 0) {
            // get the new sizes, if new sizes are passed (not 0), we will use them else use available space
            // basically if user passes 1 of the dimension, let say he passes just the height,
            // we will use the height as a fixed height but the width will be resized by it's available space
            const newHeight = (newSizes && newSizes.height) ? newSizes.height : availableDimensions.height;
            const newWidth = (newSizes && newSizes.width) ? newSizes.width : availableDimensions.width;
            // apply these new height/width to the datagrid
            if (!this._gridOptions.autoHeight) {
                gridElm.height(newHeight);
                gridContainerElm.height(newHeight);
            }
            gridElm.width(newWidth);
            gridContainerElm.width(newWidth);
            // resize the slickgrid canvas on all browser except some IE versions
            // exclude all IE below IE11
            // IE11 wants to be a better standard (W3C) follower (finally) they even changed their appName output to also have 'Netscape'
            if (new RegExp('MSIE [6-8]').exec(navigator.userAgent) === null && this._grid && this._grid.resizeCanvas) {
                this._grid.resizeCanvas();
            }
            // also call the grid auto-size columns so that it takes available when going bigger
            if (this._gridOptions && this._gridOptions.enableAutoSizeColumns && this._grid.autosizeColumns) {
                // make sure that the grid still exist (by looking if the Grid UID is found in the DOM tree) to avoid SlickGrid error "missing stylesheet"
                if (this._gridUid && $(`.${this._gridUid}`).length > 0) {
                    this._grid.autosizeColumns();
                }
                // compensate anytime SlickGrid measureScrollbar is incorrect
                this.compensateHorizontalScroll(this._grid, this._gridOptions);
            }
            // keep last resized dimensions & resolve them to the Promise
            this._lastDimensions = {
                height: newHeight,
                width: newWidth
            };
            if ((this._gridOptions.enablePagination || this._gridOptions.backendServiceApi)) {
                this._lastDimensions.heightWithPagination = newHeight + DATAGRID_PAGINATION_HEIGHT;
            }
        }
        return this._lastDimensions;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzaXplci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9zZXJ2aWNlcy9yZXNpemVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ2hELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFLL0IsK0NBQStDO0FBQy9DLE1BQU0sbUJBQW1CLEdBQUcsR0FBRyxDQUFDO0FBQ2hDLE1BQU0sa0JBQWtCLEdBQUcsR0FBRyxDQUFDO0FBQy9CLE1BQU0sdUJBQXVCLEdBQUcsRUFBRSxDQUFDO0FBQ25DLE1BQU0sMEJBQTBCLEdBQUcsRUFBRSxDQUFDO0FBUXRDLE1BQU0sT0FBTyxjQUFjO0lBQTNCO1FBTVUsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFDOUIsc0JBQWlCLEdBQUcsSUFBSSxPQUFPLEVBQWlCLENBQUM7UUFDakQsdUJBQWtCLEdBQUcsSUFBSSxPQUFPLEVBQVMsQ0FBQztJQWtPNUMsQ0FBQztJQWhPQyxpRUFBaUU7SUFDakUsSUFBWSxZQUFZO1FBQ3RCLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUM5RSxDQUFDO0lBRUQsSUFBWSxRQUFRO1FBQ2xCLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLFlBQVksQ0FB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QyxZQUFZLEVBQUUsQ0FBQzthQUMzQjtZQUVELG9GQUFvRjtZQUNwRixJQUFJLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxxQkFBcUIsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsRUFBRTtnQkFDOUYsMElBQTBJO2dCQUMxSSxJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtvQkFDdEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztpQkFDOUI7Z0JBRUQsNkRBQTZEO2dCQUM3RCxJQUFJLENBQUMsMEJBQTBCLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7YUFDaEU7WUFFRCw2REFBNkQ7WUFDN0QsSUFBSSxDQUFDLGVBQWUsR0FBRztnQkFDckIsTUFBTSxFQUFFLFNBQVM7Z0JBQ2pCLEtBQUssRUFBRSxRQUFRO2FBQ2hCLENBQUM7WUFFRixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLGlCQUFpQixDQUFDLEVBQUU7Z0JBQy9FLElBQUksQ0FBQyxlQUFlLENBQUMsb0JBQW9CLEdBQUcsU0FBUyxHQUFHLDBCQUEwQixDQUFDO2FBQ3BGO1NBQ0Y7UUFFRCxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUM7SUFDOUIsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR3JpZE9wdGlvbiB9IGZyb20gJy4vLi4vbW9kZWxzL2luZGV4JztcclxuaW1wb3J0IHsgZ2V0U2Nyb2xsQmFyV2lkdGggfSBmcm9tICcuL3V0aWxpdGllcyc7XHJcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuXHJcbi8vIHVzaW5nIGV4dGVybmFsIG5vbi10eXBlZCBqcyBsaWJyYXJpZXNcclxuZGVjbGFyZSB2YXIgJDogYW55O1xyXG5cclxuLy8gZ2xvYmFsIGNvbnN0YW50cywgaGVpZ2h0L3dpZHRoIGFyZSBpbiBwaXhlbHNcclxuY29uc3QgREFUQUdSSURfTUlOX0hFSUdIVCA9IDE4MDtcclxuY29uc3QgREFUQUdSSURfTUlOX1dJRFRIID0gMzAwO1xyXG5jb25zdCBEQVRBR1JJRF9CT1RUT01fUEFERElORyA9IDIwO1xyXG5jb25zdCBEQVRBR1JJRF9QQUdJTkFUSU9OX0hFSUdIVCA9IDM1O1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBHcmlkRGltZW5zaW9uIHtcclxuICBoZWlnaHQ6IG51bWJlcjtcclxuICB3aWR0aDogbnVtYmVyO1xyXG4gIGhlaWdodFdpdGhQYWdpbmF0aW9uPzogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUmVzaXplclNlcnZpY2Uge1xyXG4gIHByaXZhdGUgX2ZpeGVkSGVpZ2h0OiBudW1iZXIgfCBudWxsO1xyXG4gIHByaXZhdGUgX2ZpeGVkV2lkdGg6IG51bWJlciB8IG51bGw7XHJcbiAgcHJpdmF0ZSBfZ3JpZDogYW55O1xyXG4gIHByaXZhdGUgX2xhc3REaW1lbnNpb25zOiBHcmlkRGltZW5zaW9uO1xyXG4gIHByaXZhdGUgX3RpbWVyOiBhbnk7XHJcbiAgcHJpdmF0ZSBfcmVzaXplUGF1c2VkID0gZmFsc2U7XHJcbiAgb25HcmlkQWZ0ZXJSZXNpemUgPSBuZXcgU3ViamVjdDxHcmlkRGltZW5zaW9uPigpO1xyXG4gIG9uR3JpZEJlZm9yZVJlc2l6ZSA9IG5ldyBTdWJqZWN0PEV2ZW50PigpO1xyXG5cclxuICAvKiogR2V0dGVyIGZvciB0aGUgR3JpZCBPcHRpb25zIHB1bGxlZCB0aHJvdWdoIHRoZSBHcmlkIE9iamVjdCAqL1xyXG4gIHByaXZhdGUgZ2V0IF9ncmlkT3B0aW9ucygpOiBHcmlkT3B0aW9uIHtcclxuICAgIHJldHVybiAodGhpcy5fZ3JpZCAmJiB0aGlzLl9ncmlkLmdldE9wdGlvbnMpID8gdGhpcy5fZ3JpZC5nZXRPcHRpb25zKCkgOiB7fTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0IF9ncmlkVWlkKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gKHRoaXMuX2dyaWQgJiYgdGhpcy5fZ3JpZC5nZXRVSUQpID8gdGhpcy5fZ3JpZC5nZXRVSUQoKSA6IHRoaXMuX2dyaWRPcHRpb25zICYmIHRoaXMuX2dyaWRPcHRpb25zLmdyaWRJZDtcclxuICB9XHJcblxyXG4gIGluaXQoZ3JpZDogYW55LCBmaXhlZERpbWVuc2lvbnM/OiBHcmlkRGltZW5zaW9uKTogdm9pZCB7XHJcbiAgICB0aGlzLl9ncmlkID0gZ3JpZDtcclxuICAgIGlmIChmaXhlZERpbWVuc2lvbnMpIHtcclxuICAgICAgdGhpcy5fZml4ZWRIZWlnaHQgPSBmaXhlZERpbWVuc2lvbnMuaGVpZ2h0O1xyXG4gICAgICB0aGlzLl9maXhlZFdpZHRoID0gZml4ZWREaW1lbnNpb25zLndpZHRoO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIEF0dGFjaCBhbiBhdXRvIHJlc2l6ZSB0cmlnZ2VyIG9uIHRoZSBkYXRhZ3JpZCwgaWYgdGhhdCBpcyBlbmFibGUgdGhlbiBpdCB3aWxsIHJlc2l6ZSBpdHNlbGYgdG8gdGhlIGF2YWlsYWJsZSBzcGFjZVxyXG4gICAqIE9wdGlvbnM6IHdlIGNvdWxkIGFsc28gcHJvdmlkZSBhICUgZmFjdG9yIHRvIHJlc2l6ZSBvbiBlYWNoIGhlaWdodC93aWR0aCBpbmRlcGVuZGVudGx5XHJcbiAgICovXHJcbiAgYmluZEF1dG9SZXNpemVEYXRhR3JpZChuZXdTaXplcz86IEdyaWREaW1lbnNpb24pIHtcclxuICAgIC8vIGlmIHdlIGNhbid0IGZpbmQgdGhlIGdyaWQgdG8gcmVzaXplLCByZXR1cm4gd2l0aG91dCBhdHRhY2hpbmcgYW55dGhpbmdcclxuICAgIGNvbnN0IGdyaWREb21FbG0gPSAkKGAjJHt0aGlzLl9ncmlkT3B0aW9ucyAmJiB0aGlzLl9ncmlkT3B0aW9ucy5ncmlkSWQgPyB0aGlzLl9ncmlkT3B0aW9ucy5ncmlkSWQgOiAnZ3JpZDEnfWApO1xyXG4gICAgaWYgKGdyaWREb21FbG0gPT09IHVuZGVmaW5lZCB8fCBncmlkRG9tRWxtLm9mZnNldCgpID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gLS0gMXN0IHJlc2l6ZSB0aGUgZGF0YWdyaWQgc2l6ZSBhdCBmaXJzdCBsb2FkICh3ZSBuZWVkIHRoaXMgYmVjYXVzZSB0aGUgLm9uIGV2ZW50IGlzIG5vdCB0cmlnZ2VyZWQgb24gZmlyc3QgbG9hZClcclxuICAgIC8vIC0tIGFsc28gd2UgYWRkIGEgc2xpZ2h0IGRlbGF5IChpbiBtcykgc28gdGhhdCB3ZSByZXNpemUgYWZ0ZXIgdGhlIGdyaWQgcmVuZGVyIGlzIGRvbmVcclxuICAgIHRoaXMucmVzaXplR3JpZCgxMCwgbmV3U2l6ZXMpO1xyXG5cclxuICAgIC8vIC0tIDJuZCBhdHRhY2ggYSB0cmlnZ2VyIG9uIHRoZSBXaW5kb3cgRE9NIGVsZW1lbnQsIHNvIHRoYXQgaXQgaGFwcGVucyBhbHNvIHdoZW4gcmVzaXppbmcgYWZ0ZXIgZmlyc3QgbG9hZFxyXG4gICAgLy8gLS0gYXR0YWNoIGF1dG8tcmVzaXplIHRvIFdpbmRvdyBvYmplY3Qgb25seSBpZiBpdCBleGlzdFxyXG4gICAgJCh3aW5kb3cpLm9uKGByZXNpemUuZ3JpZC4ke3RoaXMuX2dyaWRVaWR9YCwgKGV2ZW50OiBFdmVudCkgPT4ge1xyXG4gICAgICB0aGlzLm9uR3JpZEJlZm9yZVJlc2l6ZS5uZXh0KGV2ZW50KTtcclxuICAgICAgaWYgKCF0aGlzLl9yZXNpemVQYXVzZWQpIHtcclxuICAgICAgICB0aGlzLnJlc2l6ZUdyaWQoMCwgbmV3U2l6ZXMpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENhbGN1bGF0ZSB0aGUgZGF0YWdyaWQgbmV3IGhlaWdodC93aWR0aCBmcm9tIHRoZSBhdmFpbGFibGUgc3BhY2UsIGFsc28gY29uc2lkZXIgdGhhdCBhICUgZmFjdG9yIG1pZ2h0IGJlIGFwcGxpZWQgdG8gY2FsY3VsYXRpb25cclxuICAgKiBvYmplY3QgZ3JpZE9wdGlvbnNcclxuICAgKi9cclxuICBjYWxjdWxhdGVHcmlkTmV3RGltZW5zaW9ucyhncmlkT3B0aW9uczogR3JpZE9wdGlvbik6IEdyaWREaW1lbnNpb24gfCBudWxsIHtcclxuICAgIGNvbnN0IGdyaWREb21FbG0gPSAkKGAjJHtncmlkT3B0aW9ucy5ncmlkSWR9YCk7XHJcbiAgICBjb25zdCBhdXRvUmVzaXplT3B0aW9ucyA9IGdyaWRPcHRpb25zICYmIGdyaWRPcHRpb25zLmF1dG9SZXNpemUgfHwge307XHJcbiAgICBjb25zdCBjb250YWluZXJFbG0gPSAoYXV0b1Jlc2l6ZU9wdGlvbnMgJiYgYXV0b1Jlc2l6ZU9wdGlvbnMuY29udGFpbmVySWQpID8gJChgIyR7YXV0b1Jlc2l6ZU9wdGlvbnMuY29udGFpbmVySWR9YCkgOiAkKGAjJHtncmlkT3B0aW9ucy5ncmlkQ29udGFpbmVySWR9YCk7XHJcbiAgICBpZiAoIXdpbmRvdyB8fCBjb250YWluZXJFbG0gPT09IHVuZGVmaW5lZCB8fCBncmlkRG9tRWxtID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gY2FsY3VsYXRlIGJvdHRvbSBwYWRkaW5nXHJcbiAgICAvLyBpZiB1c2luZyBwYWdpbmF0aW9uLCB3ZSBuZWVkIHRvIGFkZCB0aGUgcGFnaW5hdGlvbiBoZWlnaHQgdG8gdGhpcyBib3R0b20gcGFkZGluZ1xyXG4gICAgbGV0IGJvdHRvbVBhZGRpbmcgPSAoYXV0b1Jlc2l6ZU9wdGlvbnMgJiYgYXV0b1Jlc2l6ZU9wdGlvbnMuYm90dG9tUGFkZGluZykgPyBhdXRvUmVzaXplT3B0aW9ucy5ib3R0b21QYWRkaW5nIDogREFUQUdSSURfQk9UVE9NX1BBRERJTkc7XHJcbiAgICBpZiAoYm90dG9tUGFkZGluZyAmJiAoZ3JpZE9wdGlvbnMuZW5hYmxlUGFnaW5hdGlvbiB8fCB0aGlzLl9ncmlkT3B0aW9ucy5iYWNrZW5kU2VydmljZUFwaSkpIHtcclxuICAgICAgYm90dG9tUGFkZGluZyArPSBEQVRBR1JJRF9QQUdJTkFUSU9OX0hFSUdIVDtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgZ3JpZEhlaWdodCA9IDA7XHJcbiAgICBsZXQgZ3JpZE9mZnNldFRvcCA9IDA7XHJcblxyXG4gICAgLy8gd2hpY2ggRE9NIGVsZW1lbnQgYXJlIHdlIHVzaW5nIHRvIGNhbGN1bGF0ZSB0aGUgYXZhaWxhYmxlIHNpemUgZm9yIHRoZSBncmlkP1xyXG4gICAgaWYgKGF1dG9SZXNpemVPcHRpb25zLmNhbGN1bGF0ZUF2YWlsYWJsZVNpemVCeSA9PT0gJ2NvbnRhaW5lcicpIHtcclxuICAgICAgLy8gdXNlcyB0aGUgY29udGFpbmVyJ3MgaGVpZ2h0IHRvIGNhbGN1bGF0ZSBncmlkIGhlaWdodCB3aXRob3V0IGFueSB0b3Agb2Zmc2V0XHJcbiAgICAgIGdyaWRIZWlnaHQgPSBjb250YWluZXJFbG0uaGVpZ2h0KCkgfHwgMDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIHVzZXMgdGhlIGJyb3dzZXIncyB3aW5kb3cgaGVpZ2h0IHdpdGggaXRzIHRvcCBvZmZzZXQgdG8gY2FsY3VsYXRlIGdyaWQgaGVpZ2h0XHJcbiAgICAgIGdyaWRIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQgfHwgMDtcclxuICAgICAgY29uc3QgY29vcmRPZmZzZXRUb3AgPSBncmlkRG9tRWxtLm9mZnNldCgpO1xyXG4gICAgICBncmlkT2Zmc2V0VG9wID0gKGNvb3JkT2Zmc2V0VG9wICE9PSB1bmRlZmluZWQpID8gY29vcmRPZmZzZXRUb3AudG9wIDogMDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBhdmFpbGFibGVIZWlnaHQgPSBncmlkSGVpZ2h0IC0gZ3JpZE9mZnNldFRvcCAtIGJvdHRvbVBhZGRpbmc7XHJcbiAgICBjb25zdCBhdmFpbGFibGVXaWR0aCA9IGNvbnRhaW5lckVsbS53aWR0aCgpIHx8IDA7XHJcbiAgICBjb25zdCBtYXhIZWlnaHQgPSBhdXRvUmVzaXplT3B0aW9ucyAmJiBhdXRvUmVzaXplT3B0aW9ucy5tYXhIZWlnaHQgfHwgdW5kZWZpbmVkO1xyXG4gICAgY29uc3QgbWluSGVpZ2h0ID0gYXV0b1Jlc2l6ZU9wdGlvbnMgJiYgYXV0b1Jlc2l6ZU9wdGlvbnMubWluSGVpZ2h0IHx8IERBVEFHUklEX01JTl9IRUlHSFQ7XHJcbiAgICBjb25zdCBtYXhXaWR0aCA9IGF1dG9SZXNpemVPcHRpb25zICYmIGF1dG9SZXNpemVPcHRpb25zLm1heFdpZHRoIHx8IHVuZGVmaW5lZDtcclxuICAgIGNvbnN0IG1pbldpZHRoID0gYXV0b1Jlc2l6ZU9wdGlvbnMgJiYgYXV0b1Jlc2l6ZU9wdGlvbnMubWluV2lkdGggfHwgREFUQUdSSURfTUlOX1dJRFRIO1xyXG5cclxuICAgIGxldCBuZXdIZWlnaHQgPSBhdmFpbGFibGVIZWlnaHQ7XHJcbiAgICBsZXQgbmV3V2lkdGggPSAoYXV0b1Jlc2l6ZU9wdGlvbnMgJiYgYXV0b1Jlc2l6ZU9wdGlvbnMuc2lkZVBhZGRpbmcpID8gYXZhaWxhYmxlV2lkdGggLSBhdXRvUmVzaXplT3B0aW9ucy5zaWRlUGFkZGluZyA6IGF2YWlsYWJsZVdpZHRoO1xyXG5cclxuICAgIC8vIG9wdGlvbmFsbHkgKHdoZW4gZGVmaW5lZCksIG1ha2Ugc3VyZSB0aGF0IGdyaWQgaGVpZ2h0ICYgd2lkdGggYXJlIHdpdGhpbiB0aGVpciB0aHJlc2hvbGRzXHJcbiAgICBpZiAobmV3SGVpZ2h0IDwgbWluSGVpZ2h0KSB7XHJcbiAgICAgIG5ld0hlaWdodCA9IG1pbkhlaWdodDtcclxuICAgIH1cclxuICAgIGlmIChtYXhIZWlnaHQgJiYgbmV3SGVpZ2h0ID4gbWF4SGVpZ2h0KSB7XHJcbiAgICAgIG5ld0hlaWdodCA9IG1heEhlaWdodDtcclxuICAgIH1cclxuICAgIGlmIChuZXdXaWR0aCA8IG1pbldpZHRoKSB7XHJcbiAgICAgIG5ld1dpZHRoID0gbWluV2lkdGg7XHJcbiAgICB9XHJcbiAgICBpZiAobWF4V2lkdGggJiYgbmV3V2lkdGggPiBtYXhXaWR0aCkge1xyXG4gICAgICBuZXdXaWR0aCA9IG1heFdpZHRoO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHJldHVybiB0aGUgbmV3IGRpbWVuc2lvbnMgdW5sZXNzIGEgZml4ZWQgaGVpZ2h0L3dpZHRoIHdhcyBkZWZpbmVkXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBoZWlnaHQ6IHRoaXMuX2ZpeGVkSGVpZ2h0IHx8IG5ld0hlaWdodCxcclxuICAgICAgd2lkdGg6IHRoaXMuX2ZpeGVkV2lkdGggfHwgbmV3V2lkdGhcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEaXNwb3NlIGZ1bmN0aW9uIHdoZW4gZWxlbWVudCBpcyBkZXN0cm95ZWRcclxuICAgKi9cclxuICBkaXNwb3NlKCkge1xyXG4gICAgJCh3aW5kb3cpLm9mZihgcmVzaXplLmdyaWQuJHt0aGlzLl9ncmlkVWlkfWApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRm9yIHNvbWUgcmVhc29uIHRoaXMgb25seSBzZWVtcyB0byBoYXBwZW4gaW4gQ2hyb21lIGFuZCBpcyBzb21ldGltZSBtaXNjYWxjdWxhdGVkIGJ5IFNsaWNrR3JpZCBtZWFzdXJlU3JvbGxiYXIoKSBtZXRob2RcclxuICAgKiBXaGVuIHRoYXQgaGFwcGVucyB3ZSB3aWxsIGNvbXBlbnNhdGUgYW5kIHJlc2l6ZSB0aGUgR3JpZCBWaWV3cG9ydCB0byBhdm9pZCBzZWVpbmcgaG9yaXpvbnRhbCBzY3JvbGxiYXJcclxuICAgKiBNb3N0IG9mIHRoZSB0aW1lIGl0IGhhcHBlbnMsIGl0J3MgYSB0aW55IG9mZnNldCBjYWxjdWxhdGlvbiBvZiB1c3VhbGx5IDNweCAoZW5vdWdoIHRvIHNob3cgc2Nyb2xsYmFyKVxyXG4gICAqIEdpdEh1YiBpc3N1ZSByZWZlcmVuY2U6IGh0dHBzOi8vZ2l0aHViLmNvbS82cGFjL1NsaWNrR3JpZC9pc3N1ZXMvMjc1XHJcbiAgICovXHJcbiAgY29tcGVuc2F0ZUhvcml6b250YWxTY3JvbGwoZ3JpZDogYW55LCBncmlkT3B0aW9uczogR3JpZE9wdGlvbikge1xyXG4gICAgY29uc3QgZ3JpZEVsbSA9ICQoYCMke2dyaWRPcHRpb25zLmdyaWRJZH1gKTtcclxuXHJcbiAgICBjb25zdCBzY3JvbGxiYXJEaW1lbnNpb25zID0gZ3JpZCAmJiBncmlkLmdldFNjcm9sbGJhckRpbWVuc2lvbnMoKTtcclxuICAgIGNvbnN0IHNsaWNrR3JpZFNjcm9sbGJhcldpZHRoID0gc2Nyb2xsYmFyRGltZW5zaW9ucyAmJiBzY3JvbGxiYXJEaW1lbnNpb25zLndpZHRoO1xyXG4gICAgY29uc3QgY2FsY3VsYXRlZFNjcm9sbGJhcldpZHRoID0gZ2V0U2Nyb2xsQmFyV2lkdGgoKTtcclxuXHJcbiAgICAvLyBpZiBzY3JvbGxiYXIgd2lkdGggaXMgZGlmZmVyZW50IGZyb20gU2xpY2tHcmlkIGNhbGN1bGF0aW9uIHRvIG91ciBjdXN0b20gY2FsY3VsYXRpb25cclxuICAgIC8vIHRoZW4gcmVzaXplIHRoZSBncmlkIHdpdGggdGhlIG1pc3NpbmcgcGl4ZWxzIHRvIHJlbW92ZSBzY3JvbGwgKHVzdWFsbHkgb25seSAzcHgpXHJcbiAgICBpZiAoc2xpY2tHcmlkU2Nyb2xsYmFyV2lkdGggPCBjYWxjdWxhdGVkU2Nyb2xsYmFyV2lkdGgpIHtcclxuICAgICAgZ3JpZEVsbS53aWR0aChncmlkRWxtLndpZHRoKCkgKyAoY2FsY3VsYXRlZFNjcm9sbGJhcldpZHRoIC0gc2xpY2tHcmlkU2Nyb2xsYmFyV2lkdGgpKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybiB0aGUgbGFzdCByZXNpemUgZGltZW5zaW9ucyB1c2VkIGJ5IHRoZSBzZXJ2aWNlXHJcbiAgICogQHJldHVybiBsYXN0IGRpbWVuc2lvbnNcclxuICAgKi9cclxuICBnZXRMYXN0UmVzaXplRGltZW5zaW9ucygpOiBHcmlkRGltZW5zaW9uIHtcclxuICAgIHJldHVybiB0aGlzLl9sYXN0RGltZW5zaW9ucztcclxuICB9XHJcblxyXG4gIC8qKiBQcm92aWRlIHRoZSBwb3NzaWJpbGl0eSB0byBwYXVzZSB0aGUgcmVzaXplciBmb3Igc29tZSB0aW1lLCB1bnRpbCB1c2VyIGRlY2lkZXMgdG8gcmUtZW5hYmxlZCBpdCBsYXRlciBpZiBoZSB3aXNoIHRvLiAqL1xyXG4gIHBhdXNlUmVzaXplcihpc1Jlc2l6ZVBhdXNlZDogYm9vbGVhbikge1xyXG4gICAgdGhpcy5fcmVzaXplUGF1c2VkID0gaXNSZXNpemVQYXVzZWQ7XHJcbiAgfVxyXG5cclxuICAvKiogUmVzaXplIHRoZSBkYXRhZ3JpZCB0byBmaXQgdGhlIGJyb3dzZXIgaGVpZ2h0ICYgd2lkdGggKi9cclxuICByZXNpemVHcmlkKGRlbGF5ID0gMTAsIG5ld1NpemVzPzogR3JpZERpbWVuc2lvbik6IFByb21pc2U8R3JpZERpbWVuc2lvbj4ge1xyXG4gICAgaWYgKCF0aGlzLl9ncmlkIHx8ICF0aGlzLl9ncmlkT3B0aW9ucykge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFxyXG4gICAgICBBbmd1bGFyLVNsaWNrZ3JpZCByZXNpemVyIHJlcXVpcmVzIGEgdmFsaWQgR3JpZCBvYmplY3QgYW5kIEdyaWQgT3B0aW9ucyBkZWZpbmVkLlxyXG4gICAgICBZb3UgY2FuIGZpeCB0aGlzIGJ5IHNldHRpbmcgeW91ciBncmlkT3B0aW9uIHRvIHVzZSBcImVuYWJsZUF1dG9SZXNpemVcIiBvciBjcmVhdGUgYW4gaW5zdGFuY2Ugb2YgdGhlIFJlc2l6ZXJTZXJ2aWNlIGJ5IGNhbGxpbmcgYmluZEF1dG9SZXNpemVEYXRhR3JpZCgpYCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcbiAgICAgIC8vIGJlY2F1c2Ugb2YgdGhlIGphdmFzY3JpcHQgYXN5bmMgbmF0dXJlLCB3ZSBtaWdodCB3YW50IHRvIGRlbGF5IHRoZSByZXNpemUgYSBsaXR0bGUgYml0XHJcbiAgICAgIGRlbGF5ID0gZGVsYXkgfHwgMDtcclxuXHJcbiAgICAgIGlmIChkZWxheSA+IDApIHtcclxuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5fdGltZXIpO1xyXG4gICAgICAgIHRoaXMuX3RpbWVyID0gc2V0VGltZW91dCgoKSA9PiByZXNvbHZlKHRoaXMucmVzaXplR3JpZENhbGxiYWNrKG5ld1NpemVzKSksIGRlbGF5KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXNvbHZlKHRoaXMucmVzaXplR3JpZENhbGxiYWNrKG5ld1NpemVzKSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcmVzaXplR3JpZENhbGxiYWNrKG5ld1NpemVzOiBHcmlkRGltZW5zaW9uKSB7XHJcbiAgICBjb25zdCBsYXN0RGltZW5zaW9ucyA9IHRoaXMucmVzaXplR3JpZFdpdGhEaW1lbnNpb25zKG5ld1NpemVzKTtcclxuICAgIHRoaXMub25HcmlkQWZ0ZXJSZXNpemUubmV4dChsYXN0RGltZW5zaW9ucyk7XHJcbiAgICByZXR1cm4gbGFzdERpbWVuc2lvbnM7XHJcbiAgfVxyXG5cclxuICByZXNpemVHcmlkV2l0aERpbWVuc2lvbnMobmV3U2l6ZXM/OiBHcmlkRGltZW5zaW9uKTogR3JpZERpbWVuc2lvbiB7XHJcbiAgICAvLyBjYWxjdWxhdGUgdGhlIGF2YWlsYWJsZSBzaXplcyB3aXRoIG1pbmltdW0gaGVpZ2h0IGRlZmluZWQgYXMgYSBjb25zdGFudFxyXG4gICAgY29uc3QgYXZhaWxhYmxlRGltZW5zaW9ucyA9IHRoaXMuY2FsY3VsYXRlR3JpZE5ld0RpbWVuc2lvbnModGhpcy5fZ3JpZE9wdGlvbnMpO1xyXG4gICAgY29uc3QgZ3JpZEVsbSA9ICQoYCMke3RoaXMuX2dyaWRPcHRpb25zLmdyaWRJZH1gKSB8fCB7fTtcclxuICAgIGNvbnN0IGdyaWRDb250YWluZXJFbG0gPSAkKGAjJHt0aGlzLl9ncmlkT3B0aW9ucy5ncmlkQ29udGFpbmVySWR9YCkgfHwge307XHJcblxyXG4gICAgaWYgKChuZXdTaXplcyB8fCBhdmFpbGFibGVEaW1lbnNpb25zKSAmJiBncmlkRWxtLmxlbmd0aCA+IDApIHtcclxuICAgICAgLy8gZ2V0IHRoZSBuZXcgc2l6ZXMsIGlmIG5ldyBzaXplcyBhcmUgcGFzc2VkIChub3QgMCksIHdlIHdpbGwgdXNlIHRoZW0gZWxzZSB1c2UgYXZhaWxhYmxlIHNwYWNlXHJcbiAgICAgIC8vIGJhc2ljYWxseSBpZiB1c2VyIHBhc3NlcyAxIG9mIHRoZSBkaW1lbnNpb24sIGxldCBzYXkgaGUgcGFzc2VzIGp1c3QgdGhlIGhlaWdodCxcclxuICAgICAgLy8gd2Ugd2lsbCB1c2UgdGhlIGhlaWdodCBhcyBhIGZpeGVkIGhlaWdodCBidXQgdGhlIHdpZHRoIHdpbGwgYmUgcmVzaXplZCBieSBpdCdzIGF2YWlsYWJsZSBzcGFjZVxyXG4gICAgICBjb25zdCBuZXdIZWlnaHQgPSAobmV3U2l6ZXMgJiYgbmV3U2l6ZXMuaGVpZ2h0KSA/IG5ld1NpemVzLmhlaWdodCA6IGF2YWlsYWJsZURpbWVuc2lvbnMuaGVpZ2h0O1xyXG4gICAgICBjb25zdCBuZXdXaWR0aCA9IChuZXdTaXplcyAmJiBuZXdTaXplcy53aWR0aCkgPyBuZXdTaXplcy53aWR0aCA6IGF2YWlsYWJsZURpbWVuc2lvbnMud2lkdGg7XHJcblxyXG4gICAgICAvLyBhcHBseSB0aGVzZSBuZXcgaGVpZ2h0L3dpZHRoIHRvIHRoZSBkYXRhZ3JpZFxyXG4gICAgICBpZiAoIXRoaXMuX2dyaWRPcHRpb25zLmF1dG9IZWlnaHQpIHtcclxuICAgICAgICBncmlkRWxtLmhlaWdodChuZXdIZWlnaHQpO1xyXG4gICAgICAgIGdyaWRDb250YWluZXJFbG0uaGVpZ2h0KG5ld0hlaWdodCk7XHJcbiAgICAgIH1cclxuICAgICAgZ3JpZEVsbS53aWR0aChuZXdXaWR0aCk7XHJcbiAgICAgIGdyaWRDb250YWluZXJFbG0ud2lkdGgobmV3V2lkdGgpO1xyXG5cclxuICAgICAgLy8gcmVzaXplIHRoZSBzbGlja2dyaWQgY2FudmFzIG9uIGFsbCBicm93c2VyIGV4Y2VwdCBzb21lIElFIHZlcnNpb25zXHJcbiAgICAgIC8vIGV4Y2x1ZGUgYWxsIElFIGJlbG93IElFMTFcclxuICAgICAgLy8gSUUxMSB3YW50cyB0byBiZSBhIGJldHRlciBzdGFuZGFyZCAoVzNDKSBmb2xsb3dlciAoZmluYWxseSkgdGhleSBldmVuIGNoYW5nZWQgdGhlaXIgYXBwTmFtZSBvdXRwdXQgdG8gYWxzbyBoYXZlICdOZXRzY2FwZSdcclxuICAgICAgaWYgKG5ldyBSZWdFeHAoJ01TSUUgWzYtOF0nKS5leGVjKG5hdmlnYXRvci51c2VyQWdlbnQpID09PSBudWxsICYmIHRoaXMuX2dyaWQgJiYgdGhpcy5fZ3JpZC5yZXNpemVDYW52YXMpIHtcclxuICAgICAgICB0aGlzLl9ncmlkLnJlc2l6ZUNhbnZhcygpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBhbHNvIGNhbGwgdGhlIGdyaWQgYXV0by1zaXplIGNvbHVtbnMgc28gdGhhdCBpdCB0YWtlcyBhdmFpbGFibGUgd2hlbiBnb2luZyBiaWdnZXJcclxuICAgICAgaWYgKHRoaXMuX2dyaWRPcHRpb25zICYmIHRoaXMuX2dyaWRPcHRpb25zLmVuYWJsZUF1dG9TaXplQ29sdW1ucyAmJiB0aGlzLl9ncmlkLmF1dG9zaXplQ29sdW1ucykge1xyXG4gICAgICAgIC8vIG1ha2Ugc3VyZSB0aGF0IHRoZSBncmlkIHN0aWxsIGV4aXN0IChieSBsb29raW5nIGlmIHRoZSBHcmlkIFVJRCBpcyBmb3VuZCBpbiB0aGUgRE9NIHRyZWUpIHRvIGF2b2lkIFNsaWNrR3JpZCBlcnJvciBcIm1pc3Npbmcgc3R5bGVzaGVldFwiXHJcbiAgICAgICAgaWYgKHRoaXMuX2dyaWRVaWQgJiYgJChgLiR7dGhpcy5fZ3JpZFVpZH1gKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICB0aGlzLl9ncmlkLmF1dG9zaXplQ29sdW1ucygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gY29tcGVuc2F0ZSBhbnl0aW1lIFNsaWNrR3JpZCBtZWFzdXJlU2Nyb2xsYmFyIGlzIGluY29ycmVjdFxyXG4gICAgICAgIHRoaXMuY29tcGVuc2F0ZUhvcml6b250YWxTY3JvbGwodGhpcy5fZ3JpZCwgdGhpcy5fZ3JpZE9wdGlvbnMpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBrZWVwIGxhc3QgcmVzaXplZCBkaW1lbnNpb25zICYgcmVzb2x2ZSB0aGVtIHRvIHRoZSBQcm9taXNlXHJcbiAgICAgIHRoaXMuX2xhc3REaW1lbnNpb25zID0ge1xyXG4gICAgICAgIGhlaWdodDogbmV3SGVpZ2h0LFxyXG4gICAgICAgIHdpZHRoOiBuZXdXaWR0aFxyXG4gICAgICB9O1xyXG5cclxuICAgICAgaWYgKCh0aGlzLl9ncmlkT3B0aW9ucy5lbmFibGVQYWdpbmF0aW9uIHx8IHRoaXMuX2dyaWRPcHRpb25zLmJhY2tlbmRTZXJ2aWNlQXBpKSkge1xyXG4gICAgICAgIHRoaXMuX2xhc3REaW1lbnNpb25zLmhlaWdodFdpdGhQYWdpbmF0aW9uID0gbmV3SGVpZ2h0ICsgREFUQUdSSURfUEFHSU5BVElPTl9IRUlHSFQ7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5fbGFzdERpbWVuc2lvbnM7XHJcbiAgfVxyXG59XHJcbiJdfQ==