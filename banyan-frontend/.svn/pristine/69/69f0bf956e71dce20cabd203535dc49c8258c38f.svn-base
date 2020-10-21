import { getScrollBarWidth } from './utilities';
import { Subject } from 'rxjs';
// global constants, height/width are in pixels
var DATAGRID_MIN_HEIGHT = 180;
var DATAGRID_MIN_WIDTH = 300;
var DATAGRID_BOTTOM_PADDING = 20;
var DATAGRID_PAGINATION_HEIGHT = 35;
var ResizerService = /** @class */ (function () {
    function ResizerService() {
        this._resizePaused = false;
        this.onGridAfterResize = new Subject();
        this.onGridBeforeResize = new Subject();
    }
    Object.defineProperty(ResizerService.prototype, "_gridOptions", {
        /** Getter for the Grid Options pulled through the Grid Object */
        get: function () {
            return (this._grid && this._grid.getOptions) ? this._grid.getOptions() : {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResizerService.prototype, "_gridUid", {
        get: function () {
            return (this._grid && this._grid.getUID) ? this._grid.getUID() : this._gridOptions && this._gridOptions.gridId;
        },
        enumerable: true,
        configurable: true
    });
    ResizerService.prototype.init = function (grid, fixedDimensions) {
        this._grid = grid;
        if (fixedDimensions) {
            this._fixedHeight = fixedDimensions.height;
            this._fixedWidth = fixedDimensions.width;
        }
    };
    /** Attach an auto resize trigger on the datagrid, if that is enable then it will resize itself to the available space
     * Options: we could also provide a % factor to resize on each height/width independently
     */
    ResizerService.prototype.bindAutoResizeDataGrid = function (newSizes) {
        var _this = this;
        // if we can't find the grid to resize, return without attaching anything
        var gridDomElm = $("#" + (this._gridOptions && this._gridOptions.gridId ? this._gridOptions.gridId : 'grid1'));
        if (gridDomElm === undefined || gridDomElm.offset() === undefined) {
            return null;
        }
        // -- 1st resize the datagrid size at first load (we need this because the .on event is not triggered on first load)
        // -- also we add a slight delay (in ms) so that we resize after the grid render is done
        this.resizeGrid(10, newSizes);
        // -- 2nd attach a trigger on the Window DOM element, so that it happens also when resizing after first load
        // -- attach auto-resize to Window object only if it exist
        $(window).on("resize.grid." + this._gridUid, function (event) {
            _this.onGridBeforeResize.next(event);
            if (!_this._resizePaused) {
                _this.resizeGrid(0, newSizes);
            }
        });
    };
    /**
     * Calculate the datagrid new height/width from the available space, also consider that a % factor might be applied to calculation
     * object gridOptions
     */
    ResizerService.prototype.calculateGridNewDimensions = function (gridOptions) {
        var gridDomElm = $("#" + gridOptions.gridId);
        var autoResizeOptions = gridOptions && gridOptions.autoResize || {};
        var containerElm = (autoResizeOptions && autoResizeOptions.containerId) ? $("#" + autoResizeOptions.containerId) : $("#" + gridOptions.gridContainerId);
        if (!window || containerElm === undefined || gridDomElm === undefined) {
            return null;
        }
        // calculate bottom padding
        // if using pagination, we need to add the pagination height to this bottom padding
        var bottomPadding = (autoResizeOptions && autoResizeOptions.bottomPadding) ? autoResizeOptions.bottomPadding : DATAGRID_BOTTOM_PADDING;
        if (bottomPadding && (gridOptions.enablePagination || this._gridOptions.backendServiceApi)) {
            bottomPadding += DATAGRID_PAGINATION_HEIGHT;
        }
        var gridHeight = 0;
        var gridOffsetTop = 0;
        // which DOM element are we using to calculate the available size for the grid?
        if (autoResizeOptions.calculateAvailableSizeBy === 'container') {
            // uses the container's height to calculate grid height without any top offset
            gridHeight = containerElm.height() || 0;
        }
        else {
            // uses the browser's window height with its top offset to calculate grid height
            gridHeight = window.innerHeight || 0;
            var coordOffsetTop = gridDomElm.offset();
            gridOffsetTop = (coordOffsetTop !== undefined) ? coordOffsetTop.top : 0;
        }
        var availableHeight = gridHeight - gridOffsetTop - bottomPadding;
        var availableWidth = containerElm.width() || 0;
        var maxHeight = autoResizeOptions && autoResizeOptions.maxHeight || undefined;
        var minHeight = autoResizeOptions && autoResizeOptions.minHeight || DATAGRID_MIN_HEIGHT;
        var maxWidth = autoResizeOptions && autoResizeOptions.maxWidth || undefined;
        var minWidth = autoResizeOptions && autoResizeOptions.minWidth || DATAGRID_MIN_WIDTH;
        var newHeight = availableHeight;
        var newWidth = (autoResizeOptions && autoResizeOptions.sidePadding) ? availableWidth - autoResizeOptions.sidePadding : availableWidth;
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
    };
    /**
     * Dispose function when element is destroyed
     */
    ResizerService.prototype.dispose = function () {
        $(window).off("resize.grid." + this._gridUid);
    };
    /**
     * For some reason this only seems to happen in Chrome and is sometime miscalculated by SlickGrid measureSrollbar() method
     * When that happens we will compensate and resize the Grid Viewport to avoid seeing horizontal scrollbar
     * Most of the time it happens, it's a tiny offset calculation of usually 3px (enough to show scrollbar)
     * GitHub issue reference: https://github.com/6pac/SlickGrid/issues/275
     */
    ResizerService.prototype.compensateHorizontalScroll = function (grid, gridOptions) {
        var gridElm = $("#" + gridOptions.gridId);
        var scrollbarDimensions = grid && grid.getScrollbarDimensions();
        var slickGridScrollbarWidth = scrollbarDimensions && scrollbarDimensions.width;
        var calculatedScrollbarWidth = getScrollBarWidth();
        // if scrollbar width is different from SlickGrid calculation to our custom calculation
        // then resize the grid with the missing pixels to remove scroll (usually only 3px)
        if (slickGridScrollbarWidth < calculatedScrollbarWidth) {
            gridElm.width(gridElm.width() + (calculatedScrollbarWidth - slickGridScrollbarWidth));
        }
    };
    /**
     * Return the last resize dimensions used by the service
     * @return last dimensions
     */
    ResizerService.prototype.getLastResizeDimensions = function () {
        return this._lastDimensions;
    };
    /** Provide the possibility to pause the resizer for some time, until user decides to re-enabled it later if he wish to. */
    ResizerService.prototype.pauseResizer = function (isResizePaused) {
        this._resizePaused = isResizePaused;
    };
    /** Resize the datagrid to fit the browser height & width */
    ResizerService.prototype.resizeGrid = function (delay, newSizes) {
        var _this = this;
        if (delay === void 0) { delay = 10; }
        if (!this._grid || !this._gridOptions) {
            throw new Error("\n      Angular-Slickgrid resizer requires a valid Grid object and Grid Options defined.\n      You can fix this by setting your gridOption to use \"enableAutoResize\" or create an instance of the ResizerService by calling bindAutoResizeDataGrid()");
        }
        return new Promise(function (resolve) {
            // because of the javascript async nature, we might want to delay the resize a little bit
            delay = delay || 0;
            if (delay > 0) {
                clearTimeout(_this._timer);
                _this._timer = setTimeout(function () { return resolve(_this.resizeGridCallback(newSizes)); }, delay);
            }
            else {
                resolve(_this.resizeGridCallback(newSizes));
            }
        });
    };
    ResizerService.prototype.resizeGridCallback = function (newSizes) {
        var lastDimensions = this.resizeGridWithDimensions(newSizes);
        this.onGridAfterResize.next(lastDimensions);
        return lastDimensions;
    };
    ResizerService.prototype.resizeGridWithDimensions = function (newSizes) {
        // calculate the available sizes with minimum height defined as a constant
        var availableDimensions = this.calculateGridNewDimensions(this._gridOptions);
        var gridElm = $("#" + this._gridOptions.gridId) || {};
        var gridContainerElm = $("#" + this._gridOptions.gridContainerId) || {};
        if ((newSizes || availableDimensions) && gridElm.length > 0) {
            // get the new sizes, if new sizes are passed (not 0), we will use them else use available space
            // basically if user passes 1 of the dimension, let say he passes just the height,
            // we will use the height as a fixed height but the width will be resized by it's available space
            var newHeight = (newSizes && newSizes.height) ? newSizes.height : availableDimensions.height;
            var newWidth = (newSizes && newSizes.width) ? newSizes.width : availableDimensions.width;
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
                if (this._gridUid && $("." + this._gridUid).length > 0) {
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
    };
    return ResizerService;
}());
export { ResizerService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzaXplci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9zZXJ2aWNlcy9yZXNpemVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ2hELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFLL0IsK0NBQStDO0FBQy9DLElBQU0sbUJBQW1CLEdBQUcsR0FBRyxDQUFDO0FBQ2hDLElBQU0sa0JBQWtCLEdBQUcsR0FBRyxDQUFDO0FBQy9CLElBQU0sdUJBQXVCLEdBQUcsRUFBRSxDQUFDO0FBQ25DLElBQU0sMEJBQTBCLEdBQUcsRUFBRSxDQUFDO0FBUXRDO0lBQUE7UUFNVSxrQkFBYSxHQUFHLEtBQUssQ0FBQztRQUM5QixzQkFBaUIsR0FBRyxJQUFJLE9BQU8sRUFBaUIsQ0FBQztRQUNqRCx1QkFBa0IsR0FBRyxJQUFJLE9BQU8sRUFBUyxDQUFDO0lBa081QyxDQUFDO0lBL05DLHNCQUFZLHdDQUFZO1FBRHhCLGlFQUFpRTthQUNqRTtZQUNFLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUM5RSxDQUFDOzs7T0FBQTtJQUVELHNCQUFZLG9DQUFRO2FBQXBCO1lBQ0UsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQztRQUNqSCxDQUFDOzs7T0FBQTtJQUVELDZCQUFJLEdBQUosVUFBSyxJQUFTLEVBQUUsZUFBK0I7UUFDN0MsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDbEIsSUFBSSxlQUFlLEVBQUU7WUFDbkIsSUFBSSxDQUFDLFlBQVksR0FBRyxlQUFlLENBQUMsTUFBTSxDQUFDO1lBQzNDLElBQUksQ0FBQyxXQUFXLEdBQUcsZUFBZSxDQUFDLEtBQUssQ0FBQztTQUMxQztJQUNILENBQUM7SUFFRDs7T0FFRztJQUNILCtDQUFzQixHQUF0QixVQUF1QixRQUF3QjtRQUEvQyxpQkFtQkM7UUFsQkMseUVBQXlFO1FBQ3pFLElBQU0sVUFBVSxHQUFHLENBQUMsQ0FBQyxPQUFJLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUUsQ0FBQyxDQUFDO1FBQy9HLElBQUksVUFBVSxLQUFLLFNBQVMsSUFBSSxVQUFVLENBQUMsTUFBTSxFQUFFLEtBQUssU0FBUyxFQUFFO1lBQ2pFLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFFRCxvSEFBb0g7UUFDcEgsd0ZBQXdGO1FBQ3hGLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRTlCLDRHQUE0RztRQUM1RywwREFBMEQ7UUFDMUQsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxpQkFBZSxJQUFJLENBQUMsUUFBVSxFQUFFLFVBQUMsS0FBWTtZQUN4RCxLQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3BDLElBQUksQ0FBQyxLQUFJLENBQUMsYUFBYSxFQUFFO2dCQUN2QixLQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQzthQUM5QjtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7T0FHRztJQUNILG1EQUEwQixHQUExQixVQUEyQixXQUF1QjtRQUNoRCxJQUFNLFVBQVUsR0FBRyxDQUFDLENBQUMsTUFBSSxXQUFXLENBQUMsTUFBUSxDQUFDLENBQUM7UUFDL0MsSUFBTSxpQkFBaUIsR0FBRyxXQUFXLElBQUksV0FBVyxDQUFDLFVBQVUsSUFBSSxFQUFFLENBQUM7UUFDdEUsSUFBTSxZQUFZLEdBQUcsQ0FBQyxpQkFBaUIsSUFBSSxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQUksaUJBQWlCLENBQUMsV0FBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFJLFdBQVcsQ0FBQyxlQUFpQixDQUFDLENBQUM7UUFDMUosSUFBSSxDQUFDLE1BQU0sSUFBSSxZQUFZLEtBQUssU0FBUyxJQUFJLFVBQVUsS0FBSyxTQUFTLEVBQUU7WUFDckUsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUVELDJCQUEyQjtRQUMzQixtRkFBbUY7UUFDbkYsSUFBSSxhQUFhLEdBQUcsQ0FBQyxpQkFBaUIsSUFBSSxpQkFBaUIsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyx1QkFBdUIsQ0FBQztRQUN2SSxJQUFJLGFBQWEsSUFBSSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLGlCQUFpQixDQUFDLEVBQUU7WUFDMUYsYUFBYSxJQUFJLDBCQUEwQixDQUFDO1NBQzdDO1FBRUQsSUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLElBQUksYUFBYSxHQUFHLENBQUMsQ0FBQztRQUV0QiwrRUFBK0U7UUFDL0UsSUFBSSxpQkFBaUIsQ0FBQyx3QkFBd0IsS0FBSyxXQUFXLEVBQUU7WUFDOUQsOEVBQThFO1lBQzlFLFVBQVUsR0FBRyxZQUFZLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ3pDO2FBQU07WUFDTCxnRkFBZ0Y7WUFDaEYsVUFBVSxHQUFHLE1BQU0sQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDO1lBQ3JDLElBQU0sY0FBYyxHQUFHLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUMzQyxhQUFhLEdBQUcsQ0FBQyxjQUFjLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN6RTtRQUVELElBQU0sZUFBZSxHQUFHLFVBQVUsR0FBRyxhQUFhLEdBQUcsYUFBYSxDQUFDO1FBQ25FLElBQU0sY0FBYyxHQUFHLFlBQVksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDakQsSUFBTSxTQUFTLEdBQUcsaUJBQWlCLElBQUksaUJBQWlCLENBQUMsU0FBUyxJQUFJLFNBQVMsQ0FBQztRQUNoRixJQUFNLFNBQVMsR0FBRyxpQkFBaUIsSUFBSSxpQkFBaUIsQ0FBQyxTQUFTLElBQUksbUJBQW1CLENBQUM7UUFDMUYsSUFBTSxRQUFRLEdBQUcsaUJBQWlCLElBQUksaUJBQWlCLENBQUMsUUFBUSxJQUFJLFNBQVMsQ0FBQztRQUM5RSxJQUFNLFFBQVEsR0FBRyxpQkFBaUIsSUFBSSxpQkFBaUIsQ0FBQyxRQUFRLElBQUksa0JBQWtCLENBQUM7UUFFdkYsSUFBSSxTQUFTLEdBQUcsZUFBZSxDQUFDO1FBQ2hDLElBQUksUUFBUSxHQUFHLENBQUMsaUJBQWlCLElBQUksaUJBQWlCLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLGNBQWMsR0FBRyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQztRQUV0SSw0RkFBNEY7UUFDNUYsSUFBSSxTQUFTLEdBQUcsU0FBUyxFQUFFO1lBQ3pCLFNBQVMsR0FBRyxTQUFTLENBQUM7U0FDdkI7UUFDRCxJQUFJLFNBQVMsSUFBSSxTQUFTLEdBQUcsU0FBUyxFQUFFO1lBQ3RDLFNBQVMsR0FBRyxTQUFTLENBQUM7U0FDdkI7UUFDRCxJQUFJLFFBQVEsR0FBRyxRQUFRLEVBQUU7WUFDdkIsUUFBUSxHQUFHLFFBQVEsQ0FBQztTQUNyQjtRQUNELElBQUksUUFBUSxJQUFJLFFBQVEsR0FBRyxRQUFRLEVBQUU7WUFDbkMsUUFBUSxHQUFHLFFBQVEsQ0FBQztTQUNyQjtRQUVELG9FQUFvRTtRQUNwRSxPQUFPO1lBQ0wsTUFBTSxFQUFFLElBQUksQ0FBQyxZQUFZLElBQUksU0FBUztZQUN0QyxLQUFLLEVBQUUsSUFBSSxDQUFDLFdBQVcsSUFBSSxRQUFRO1NBQ3BDLENBQUM7SUFDSixDQUFDO0lBRUQ7O09BRUc7SUFDSCxnQ0FBTyxHQUFQO1FBQ0UsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxpQkFBZSxJQUFJLENBQUMsUUFBVSxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsbURBQTBCLEdBQTFCLFVBQTJCLElBQVMsRUFBRSxXQUF1QjtRQUMzRCxJQUFNLE9BQU8sR0FBRyxDQUFDLENBQUMsTUFBSSxXQUFXLENBQUMsTUFBUSxDQUFDLENBQUM7UUFFNUMsSUFBTSxtQkFBbUIsR0FBRyxJQUFJLElBQUksSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7UUFDbEUsSUFBTSx1QkFBdUIsR0FBRyxtQkFBbUIsSUFBSSxtQkFBbUIsQ0FBQyxLQUFLLENBQUM7UUFDakYsSUFBTSx3QkFBd0IsR0FBRyxpQkFBaUIsRUFBRSxDQUFDO1FBRXJELHVGQUF1RjtRQUN2RixtRkFBbUY7UUFDbkYsSUFBSSx1QkFBdUIsR0FBRyx3QkFBd0IsRUFBRTtZQUN0RCxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLHdCQUF3QixHQUFHLHVCQUF1QixDQUFDLENBQUMsQ0FBQztTQUN2RjtJQUNILENBQUM7SUFFRDs7O09BR0c7SUFDSCxnREFBdUIsR0FBdkI7UUFDRSxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUM7SUFDOUIsQ0FBQztJQUVELDJIQUEySDtJQUMzSCxxQ0FBWSxHQUFaLFVBQWEsY0FBdUI7UUFDbEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxjQUFjLENBQUM7SUFDdEMsQ0FBQztJQUVELDREQUE0RDtJQUM1RCxtQ0FBVSxHQUFWLFVBQVcsS0FBVSxFQUFFLFFBQXdCO1FBQS9DLGlCQWtCQztRQWxCVSxzQkFBQSxFQUFBLFVBQVU7UUFDbkIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3JDLE1BQU0sSUFBSSxLQUFLLENBQUMseVBBRXNJLENBQUMsQ0FBQztTQUN6SjtRQUVELE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPO1lBQ3pCLHlGQUF5RjtZQUN6RixLQUFLLEdBQUcsS0FBSyxJQUFJLENBQUMsQ0FBQztZQUVuQixJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUU7Z0JBQ2IsWUFBWSxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDMUIsS0FBSSxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUMsY0FBTSxPQUFBLE9BQU8sQ0FBQyxLQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBMUMsQ0FBMEMsRUFBRSxLQUFLLENBQUMsQ0FBQzthQUNuRjtpQkFBTTtnQkFDTCxPQUFPLENBQUMsS0FBSSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7YUFDNUM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCwyQ0FBa0IsR0FBbEIsVUFBbUIsUUFBdUI7UUFDeEMsSUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQy9ELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDNUMsT0FBTyxjQUFjLENBQUM7SUFDeEIsQ0FBQztJQUVELGlEQUF3QixHQUF4QixVQUF5QixRQUF3QjtRQUMvQywwRUFBMEU7UUFDMUUsSUFBTSxtQkFBbUIsR0FBRyxJQUFJLENBQUMsMEJBQTBCLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQy9FLElBQU0sT0FBTyxHQUFHLENBQUMsQ0FBQyxNQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3hELElBQU0sZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDLE1BQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxlQUFpQixDQUFDLElBQUksRUFBRSxDQUFDO1FBRTFFLElBQUksQ0FBQyxRQUFRLElBQUksbUJBQW1CLENBQUMsSUFBSSxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUMzRCxnR0FBZ0c7WUFDaEcsa0ZBQWtGO1lBQ2xGLGlHQUFpRztZQUNqRyxJQUFNLFNBQVMsR0FBRyxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQztZQUMvRixJQUFNLFFBQVEsR0FBRyxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQztZQUUzRiwrQ0FBK0M7WUFDL0MsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFO2dCQUNqQyxPQUFPLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUMxQixnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDcEM7WUFDRCxPQUFPLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3hCLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUVqQyxxRUFBcUU7WUFDckUsNEJBQTRCO1lBQzVCLDZIQUE2SDtZQUM3SCxJQUFJLElBQUksTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEtBQUssSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUU7Z0JBQ3hHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLENBQUM7YUFDM0I7WUFFRCxvRkFBb0Y7WUFDcEYsSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMscUJBQXFCLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLEVBQUU7Z0JBQzlGLDBJQUEwSTtnQkFDMUksSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsQ0FBQyxNQUFJLElBQUksQ0FBQyxRQUFVLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO29CQUN0RCxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO2lCQUM5QjtnQkFFRCw2REFBNkQ7Z0JBQzdELElBQUksQ0FBQywwQkFBMEIsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUNoRTtZQUVELDZEQUE2RDtZQUM3RCxJQUFJLENBQUMsZUFBZSxHQUFHO2dCQUNyQixNQUFNLEVBQUUsU0FBUztnQkFDakIsS0FBSyxFQUFFLFFBQVE7YUFDaEIsQ0FBQztZQUVGLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQixJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQUMsRUFBRTtnQkFDL0UsSUFBSSxDQUFDLGVBQWUsQ0FBQyxvQkFBb0IsR0FBRyxTQUFTLEdBQUcsMEJBQTBCLENBQUM7YUFDcEY7U0FDRjtRQUVELE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQztJQUM5QixDQUFDO0lBQ0gscUJBQUM7QUFBRCxDQUFDLEFBMU9ELElBME9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR3JpZE9wdGlvbiB9IGZyb20gJy4vLi4vbW9kZWxzL2luZGV4JztcclxuaW1wb3J0IHsgZ2V0U2Nyb2xsQmFyV2lkdGggfSBmcm9tICcuL3V0aWxpdGllcyc7XHJcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuXHJcbi8vIHVzaW5nIGV4dGVybmFsIG5vbi10eXBlZCBqcyBsaWJyYXJpZXNcclxuZGVjbGFyZSB2YXIgJDogYW55O1xyXG5cclxuLy8gZ2xvYmFsIGNvbnN0YW50cywgaGVpZ2h0L3dpZHRoIGFyZSBpbiBwaXhlbHNcclxuY29uc3QgREFUQUdSSURfTUlOX0hFSUdIVCA9IDE4MDtcclxuY29uc3QgREFUQUdSSURfTUlOX1dJRFRIID0gMzAwO1xyXG5jb25zdCBEQVRBR1JJRF9CT1RUT01fUEFERElORyA9IDIwO1xyXG5jb25zdCBEQVRBR1JJRF9QQUdJTkFUSU9OX0hFSUdIVCA9IDM1O1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBHcmlkRGltZW5zaW9uIHtcclxuICBoZWlnaHQ6IG51bWJlcjtcclxuICB3aWR0aDogbnVtYmVyO1xyXG4gIGhlaWdodFdpdGhQYWdpbmF0aW9uPzogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUmVzaXplclNlcnZpY2Uge1xyXG4gIHByaXZhdGUgX2ZpeGVkSGVpZ2h0OiBudW1iZXIgfCBudWxsO1xyXG4gIHByaXZhdGUgX2ZpeGVkV2lkdGg6IG51bWJlciB8IG51bGw7XHJcbiAgcHJpdmF0ZSBfZ3JpZDogYW55O1xyXG4gIHByaXZhdGUgX2xhc3REaW1lbnNpb25zOiBHcmlkRGltZW5zaW9uO1xyXG4gIHByaXZhdGUgX3RpbWVyOiBhbnk7XHJcbiAgcHJpdmF0ZSBfcmVzaXplUGF1c2VkID0gZmFsc2U7XHJcbiAgb25HcmlkQWZ0ZXJSZXNpemUgPSBuZXcgU3ViamVjdDxHcmlkRGltZW5zaW9uPigpO1xyXG4gIG9uR3JpZEJlZm9yZVJlc2l6ZSA9IG5ldyBTdWJqZWN0PEV2ZW50PigpO1xyXG5cclxuICAvKiogR2V0dGVyIGZvciB0aGUgR3JpZCBPcHRpb25zIHB1bGxlZCB0aHJvdWdoIHRoZSBHcmlkIE9iamVjdCAqL1xyXG4gIHByaXZhdGUgZ2V0IF9ncmlkT3B0aW9ucygpOiBHcmlkT3B0aW9uIHtcclxuICAgIHJldHVybiAodGhpcy5fZ3JpZCAmJiB0aGlzLl9ncmlkLmdldE9wdGlvbnMpID8gdGhpcy5fZ3JpZC5nZXRPcHRpb25zKCkgOiB7fTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0IF9ncmlkVWlkKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gKHRoaXMuX2dyaWQgJiYgdGhpcy5fZ3JpZC5nZXRVSUQpID8gdGhpcy5fZ3JpZC5nZXRVSUQoKSA6IHRoaXMuX2dyaWRPcHRpb25zICYmIHRoaXMuX2dyaWRPcHRpb25zLmdyaWRJZDtcclxuICB9XHJcblxyXG4gIGluaXQoZ3JpZDogYW55LCBmaXhlZERpbWVuc2lvbnM/OiBHcmlkRGltZW5zaW9uKTogdm9pZCB7XHJcbiAgICB0aGlzLl9ncmlkID0gZ3JpZDtcclxuICAgIGlmIChmaXhlZERpbWVuc2lvbnMpIHtcclxuICAgICAgdGhpcy5fZml4ZWRIZWlnaHQgPSBmaXhlZERpbWVuc2lvbnMuaGVpZ2h0O1xyXG4gICAgICB0aGlzLl9maXhlZFdpZHRoID0gZml4ZWREaW1lbnNpb25zLndpZHRoO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIEF0dGFjaCBhbiBhdXRvIHJlc2l6ZSB0cmlnZ2VyIG9uIHRoZSBkYXRhZ3JpZCwgaWYgdGhhdCBpcyBlbmFibGUgdGhlbiBpdCB3aWxsIHJlc2l6ZSBpdHNlbGYgdG8gdGhlIGF2YWlsYWJsZSBzcGFjZVxyXG4gICAqIE9wdGlvbnM6IHdlIGNvdWxkIGFsc28gcHJvdmlkZSBhICUgZmFjdG9yIHRvIHJlc2l6ZSBvbiBlYWNoIGhlaWdodC93aWR0aCBpbmRlcGVuZGVudGx5XHJcbiAgICovXHJcbiAgYmluZEF1dG9SZXNpemVEYXRhR3JpZChuZXdTaXplcz86IEdyaWREaW1lbnNpb24pIHtcclxuICAgIC8vIGlmIHdlIGNhbid0IGZpbmQgdGhlIGdyaWQgdG8gcmVzaXplLCByZXR1cm4gd2l0aG91dCBhdHRhY2hpbmcgYW55dGhpbmdcclxuICAgIGNvbnN0IGdyaWREb21FbG0gPSAkKGAjJHt0aGlzLl9ncmlkT3B0aW9ucyAmJiB0aGlzLl9ncmlkT3B0aW9ucy5ncmlkSWQgPyB0aGlzLl9ncmlkT3B0aW9ucy5ncmlkSWQgOiAnZ3JpZDEnfWApO1xyXG4gICAgaWYgKGdyaWREb21FbG0gPT09IHVuZGVmaW5lZCB8fCBncmlkRG9tRWxtLm9mZnNldCgpID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gLS0gMXN0IHJlc2l6ZSB0aGUgZGF0YWdyaWQgc2l6ZSBhdCBmaXJzdCBsb2FkICh3ZSBuZWVkIHRoaXMgYmVjYXVzZSB0aGUgLm9uIGV2ZW50IGlzIG5vdCB0cmlnZ2VyZWQgb24gZmlyc3QgbG9hZClcclxuICAgIC8vIC0tIGFsc28gd2UgYWRkIGEgc2xpZ2h0IGRlbGF5IChpbiBtcykgc28gdGhhdCB3ZSByZXNpemUgYWZ0ZXIgdGhlIGdyaWQgcmVuZGVyIGlzIGRvbmVcclxuICAgIHRoaXMucmVzaXplR3JpZCgxMCwgbmV3U2l6ZXMpO1xyXG5cclxuICAgIC8vIC0tIDJuZCBhdHRhY2ggYSB0cmlnZ2VyIG9uIHRoZSBXaW5kb3cgRE9NIGVsZW1lbnQsIHNvIHRoYXQgaXQgaGFwcGVucyBhbHNvIHdoZW4gcmVzaXppbmcgYWZ0ZXIgZmlyc3QgbG9hZFxyXG4gICAgLy8gLS0gYXR0YWNoIGF1dG8tcmVzaXplIHRvIFdpbmRvdyBvYmplY3Qgb25seSBpZiBpdCBleGlzdFxyXG4gICAgJCh3aW5kb3cpLm9uKGByZXNpemUuZ3JpZC4ke3RoaXMuX2dyaWRVaWR9YCwgKGV2ZW50OiBFdmVudCkgPT4ge1xyXG4gICAgICB0aGlzLm9uR3JpZEJlZm9yZVJlc2l6ZS5uZXh0KGV2ZW50KTtcclxuICAgICAgaWYgKCF0aGlzLl9yZXNpemVQYXVzZWQpIHtcclxuICAgICAgICB0aGlzLnJlc2l6ZUdyaWQoMCwgbmV3U2l6ZXMpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENhbGN1bGF0ZSB0aGUgZGF0YWdyaWQgbmV3IGhlaWdodC93aWR0aCBmcm9tIHRoZSBhdmFpbGFibGUgc3BhY2UsIGFsc28gY29uc2lkZXIgdGhhdCBhICUgZmFjdG9yIG1pZ2h0IGJlIGFwcGxpZWQgdG8gY2FsY3VsYXRpb25cclxuICAgKiBvYmplY3QgZ3JpZE9wdGlvbnNcclxuICAgKi9cclxuICBjYWxjdWxhdGVHcmlkTmV3RGltZW5zaW9ucyhncmlkT3B0aW9uczogR3JpZE9wdGlvbik6IEdyaWREaW1lbnNpb24gfCBudWxsIHtcclxuICAgIGNvbnN0IGdyaWREb21FbG0gPSAkKGAjJHtncmlkT3B0aW9ucy5ncmlkSWR9YCk7XHJcbiAgICBjb25zdCBhdXRvUmVzaXplT3B0aW9ucyA9IGdyaWRPcHRpb25zICYmIGdyaWRPcHRpb25zLmF1dG9SZXNpemUgfHwge307XHJcbiAgICBjb25zdCBjb250YWluZXJFbG0gPSAoYXV0b1Jlc2l6ZU9wdGlvbnMgJiYgYXV0b1Jlc2l6ZU9wdGlvbnMuY29udGFpbmVySWQpID8gJChgIyR7YXV0b1Jlc2l6ZU9wdGlvbnMuY29udGFpbmVySWR9YCkgOiAkKGAjJHtncmlkT3B0aW9ucy5ncmlkQ29udGFpbmVySWR9YCk7XHJcbiAgICBpZiAoIXdpbmRvdyB8fCBjb250YWluZXJFbG0gPT09IHVuZGVmaW5lZCB8fCBncmlkRG9tRWxtID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gY2FsY3VsYXRlIGJvdHRvbSBwYWRkaW5nXHJcbiAgICAvLyBpZiB1c2luZyBwYWdpbmF0aW9uLCB3ZSBuZWVkIHRvIGFkZCB0aGUgcGFnaW5hdGlvbiBoZWlnaHQgdG8gdGhpcyBib3R0b20gcGFkZGluZ1xyXG4gICAgbGV0IGJvdHRvbVBhZGRpbmcgPSAoYXV0b1Jlc2l6ZU9wdGlvbnMgJiYgYXV0b1Jlc2l6ZU9wdGlvbnMuYm90dG9tUGFkZGluZykgPyBhdXRvUmVzaXplT3B0aW9ucy5ib3R0b21QYWRkaW5nIDogREFUQUdSSURfQk9UVE9NX1BBRERJTkc7XHJcbiAgICBpZiAoYm90dG9tUGFkZGluZyAmJiAoZ3JpZE9wdGlvbnMuZW5hYmxlUGFnaW5hdGlvbiB8fCB0aGlzLl9ncmlkT3B0aW9ucy5iYWNrZW5kU2VydmljZUFwaSkpIHtcclxuICAgICAgYm90dG9tUGFkZGluZyArPSBEQVRBR1JJRF9QQUdJTkFUSU9OX0hFSUdIVDtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgZ3JpZEhlaWdodCA9IDA7XHJcbiAgICBsZXQgZ3JpZE9mZnNldFRvcCA9IDA7XHJcblxyXG4gICAgLy8gd2hpY2ggRE9NIGVsZW1lbnQgYXJlIHdlIHVzaW5nIHRvIGNhbGN1bGF0ZSB0aGUgYXZhaWxhYmxlIHNpemUgZm9yIHRoZSBncmlkP1xyXG4gICAgaWYgKGF1dG9SZXNpemVPcHRpb25zLmNhbGN1bGF0ZUF2YWlsYWJsZVNpemVCeSA9PT0gJ2NvbnRhaW5lcicpIHtcclxuICAgICAgLy8gdXNlcyB0aGUgY29udGFpbmVyJ3MgaGVpZ2h0IHRvIGNhbGN1bGF0ZSBncmlkIGhlaWdodCB3aXRob3V0IGFueSB0b3Agb2Zmc2V0XHJcbiAgICAgIGdyaWRIZWlnaHQgPSBjb250YWluZXJFbG0uaGVpZ2h0KCkgfHwgMDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIHVzZXMgdGhlIGJyb3dzZXIncyB3aW5kb3cgaGVpZ2h0IHdpdGggaXRzIHRvcCBvZmZzZXQgdG8gY2FsY3VsYXRlIGdyaWQgaGVpZ2h0XHJcbiAgICAgIGdyaWRIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQgfHwgMDtcclxuICAgICAgY29uc3QgY29vcmRPZmZzZXRUb3AgPSBncmlkRG9tRWxtLm9mZnNldCgpO1xyXG4gICAgICBncmlkT2Zmc2V0VG9wID0gKGNvb3JkT2Zmc2V0VG9wICE9PSB1bmRlZmluZWQpID8gY29vcmRPZmZzZXRUb3AudG9wIDogMDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBhdmFpbGFibGVIZWlnaHQgPSBncmlkSGVpZ2h0IC0gZ3JpZE9mZnNldFRvcCAtIGJvdHRvbVBhZGRpbmc7XHJcbiAgICBjb25zdCBhdmFpbGFibGVXaWR0aCA9IGNvbnRhaW5lckVsbS53aWR0aCgpIHx8IDA7XHJcbiAgICBjb25zdCBtYXhIZWlnaHQgPSBhdXRvUmVzaXplT3B0aW9ucyAmJiBhdXRvUmVzaXplT3B0aW9ucy5tYXhIZWlnaHQgfHwgdW5kZWZpbmVkO1xyXG4gICAgY29uc3QgbWluSGVpZ2h0ID0gYXV0b1Jlc2l6ZU9wdGlvbnMgJiYgYXV0b1Jlc2l6ZU9wdGlvbnMubWluSGVpZ2h0IHx8IERBVEFHUklEX01JTl9IRUlHSFQ7XHJcbiAgICBjb25zdCBtYXhXaWR0aCA9IGF1dG9SZXNpemVPcHRpb25zICYmIGF1dG9SZXNpemVPcHRpb25zLm1heFdpZHRoIHx8IHVuZGVmaW5lZDtcclxuICAgIGNvbnN0IG1pbldpZHRoID0gYXV0b1Jlc2l6ZU9wdGlvbnMgJiYgYXV0b1Jlc2l6ZU9wdGlvbnMubWluV2lkdGggfHwgREFUQUdSSURfTUlOX1dJRFRIO1xyXG5cclxuICAgIGxldCBuZXdIZWlnaHQgPSBhdmFpbGFibGVIZWlnaHQ7XHJcbiAgICBsZXQgbmV3V2lkdGggPSAoYXV0b1Jlc2l6ZU9wdGlvbnMgJiYgYXV0b1Jlc2l6ZU9wdGlvbnMuc2lkZVBhZGRpbmcpID8gYXZhaWxhYmxlV2lkdGggLSBhdXRvUmVzaXplT3B0aW9ucy5zaWRlUGFkZGluZyA6IGF2YWlsYWJsZVdpZHRoO1xyXG5cclxuICAgIC8vIG9wdGlvbmFsbHkgKHdoZW4gZGVmaW5lZCksIG1ha2Ugc3VyZSB0aGF0IGdyaWQgaGVpZ2h0ICYgd2lkdGggYXJlIHdpdGhpbiB0aGVpciB0aHJlc2hvbGRzXHJcbiAgICBpZiAobmV3SGVpZ2h0IDwgbWluSGVpZ2h0KSB7XHJcbiAgICAgIG5ld0hlaWdodCA9IG1pbkhlaWdodDtcclxuICAgIH1cclxuICAgIGlmIChtYXhIZWlnaHQgJiYgbmV3SGVpZ2h0ID4gbWF4SGVpZ2h0KSB7XHJcbiAgICAgIG5ld0hlaWdodCA9IG1heEhlaWdodDtcclxuICAgIH1cclxuICAgIGlmIChuZXdXaWR0aCA8IG1pbldpZHRoKSB7XHJcbiAgICAgIG5ld1dpZHRoID0gbWluV2lkdGg7XHJcbiAgICB9XHJcbiAgICBpZiAobWF4V2lkdGggJiYgbmV3V2lkdGggPiBtYXhXaWR0aCkge1xyXG4gICAgICBuZXdXaWR0aCA9IG1heFdpZHRoO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHJldHVybiB0aGUgbmV3IGRpbWVuc2lvbnMgdW5sZXNzIGEgZml4ZWQgaGVpZ2h0L3dpZHRoIHdhcyBkZWZpbmVkXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBoZWlnaHQ6IHRoaXMuX2ZpeGVkSGVpZ2h0IHx8IG5ld0hlaWdodCxcclxuICAgICAgd2lkdGg6IHRoaXMuX2ZpeGVkV2lkdGggfHwgbmV3V2lkdGhcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEaXNwb3NlIGZ1bmN0aW9uIHdoZW4gZWxlbWVudCBpcyBkZXN0cm95ZWRcclxuICAgKi9cclxuICBkaXNwb3NlKCkge1xyXG4gICAgJCh3aW5kb3cpLm9mZihgcmVzaXplLmdyaWQuJHt0aGlzLl9ncmlkVWlkfWApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRm9yIHNvbWUgcmVhc29uIHRoaXMgb25seSBzZWVtcyB0byBoYXBwZW4gaW4gQ2hyb21lIGFuZCBpcyBzb21ldGltZSBtaXNjYWxjdWxhdGVkIGJ5IFNsaWNrR3JpZCBtZWFzdXJlU3JvbGxiYXIoKSBtZXRob2RcclxuICAgKiBXaGVuIHRoYXQgaGFwcGVucyB3ZSB3aWxsIGNvbXBlbnNhdGUgYW5kIHJlc2l6ZSB0aGUgR3JpZCBWaWV3cG9ydCB0byBhdm9pZCBzZWVpbmcgaG9yaXpvbnRhbCBzY3JvbGxiYXJcclxuICAgKiBNb3N0IG9mIHRoZSB0aW1lIGl0IGhhcHBlbnMsIGl0J3MgYSB0aW55IG9mZnNldCBjYWxjdWxhdGlvbiBvZiB1c3VhbGx5IDNweCAoZW5vdWdoIHRvIHNob3cgc2Nyb2xsYmFyKVxyXG4gICAqIEdpdEh1YiBpc3N1ZSByZWZlcmVuY2U6IGh0dHBzOi8vZ2l0aHViLmNvbS82cGFjL1NsaWNrR3JpZC9pc3N1ZXMvMjc1XHJcbiAgICovXHJcbiAgY29tcGVuc2F0ZUhvcml6b250YWxTY3JvbGwoZ3JpZDogYW55LCBncmlkT3B0aW9uczogR3JpZE9wdGlvbikge1xyXG4gICAgY29uc3QgZ3JpZEVsbSA9ICQoYCMke2dyaWRPcHRpb25zLmdyaWRJZH1gKTtcclxuXHJcbiAgICBjb25zdCBzY3JvbGxiYXJEaW1lbnNpb25zID0gZ3JpZCAmJiBncmlkLmdldFNjcm9sbGJhckRpbWVuc2lvbnMoKTtcclxuICAgIGNvbnN0IHNsaWNrR3JpZFNjcm9sbGJhcldpZHRoID0gc2Nyb2xsYmFyRGltZW5zaW9ucyAmJiBzY3JvbGxiYXJEaW1lbnNpb25zLndpZHRoO1xyXG4gICAgY29uc3QgY2FsY3VsYXRlZFNjcm9sbGJhcldpZHRoID0gZ2V0U2Nyb2xsQmFyV2lkdGgoKTtcclxuXHJcbiAgICAvLyBpZiBzY3JvbGxiYXIgd2lkdGggaXMgZGlmZmVyZW50IGZyb20gU2xpY2tHcmlkIGNhbGN1bGF0aW9uIHRvIG91ciBjdXN0b20gY2FsY3VsYXRpb25cclxuICAgIC8vIHRoZW4gcmVzaXplIHRoZSBncmlkIHdpdGggdGhlIG1pc3NpbmcgcGl4ZWxzIHRvIHJlbW92ZSBzY3JvbGwgKHVzdWFsbHkgb25seSAzcHgpXHJcbiAgICBpZiAoc2xpY2tHcmlkU2Nyb2xsYmFyV2lkdGggPCBjYWxjdWxhdGVkU2Nyb2xsYmFyV2lkdGgpIHtcclxuICAgICAgZ3JpZEVsbS53aWR0aChncmlkRWxtLndpZHRoKCkgKyAoY2FsY3VsYXRlZFNjcm9sbGJhcldpZHRoIC0gc2xpY2tHcmlkU2Nyb2xsYmFyV2lkdGgpKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybiB0aGUgbGFzdCByZXNpemUgZGltZW5zaW9ucyB1c2VkIGJ5IHRoZSBzZXJ2aWNlXHJcbiAgICogQHJldHVybiBsYXN0IGRpbWVuc2lvbnNcclxuICAgKi9cclxuICBnZXRMYXN0UmVzaXplRGltZW5zaW9ucygpOiBHcmlkRGltZW5zaW9uIHtcclxuICAgIHJldHVybiB0aGlzLl9sYXN0RGltZW5zaW9ucztcclxuICB9XHJcblxyXG4gIC8qKiBQcm92aWRlIHRoZSBwb3NzaWJpbGl0eSB0byBwYXVzZSB0aGUgcmVzaXplciBmb3Igc29tZSB0aW1lLCB1bnRpbCB1c2VyIGRlY2lkZXMgdG8gcmUtZW5hYmxlZCBpdCBsYXRlciBpZiBoZSB3aXNoIHRvLiAqL1xyXG4gIHBhdXNlUmVzaXplcihpc1Jlc2l6ZVBhdXNlZDogYm9vbGVhbikge1xyXG4gICAgdGhpcy5fcmVzaXplUGF1c2VkID0gaXNSZXNpemVQYXVzZWQ7XHJcbiAgfVxyXG5cclxuICAvKiogUmVzaXplIHRoZSBkYXRhZ3JpZCB0byBmaXQgdGhlIGJyb3dzZXIgaGVpZ2h0ICYgd2lkdGggKi9cclxuICByZXNpemVHcmlkKGRlbGF5ID0gMTAsIG5ld1NpemVzPzogR3JpZERpbWVuc2lvbik6IFByb21pc2U8R3JpZERpbWVuc2lvbj4ge1xyXG4gICAgaWYgKCF0aGlzLl9ncmlkIHx8ICF0aGlzLl9ncmlkT3B0aW9ucykge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFxyXG4gICAgICBBbmd1bGFyLVNsaWNrZ3JpZCByZXNpemVyIHJlcXVpcmVzIGEgdmFsaWQgR3JpZCBvYmplY3QgYW5kIEdyaWQgT3B0aW9ucyBkZWZpbmVkLlxyXG4gICAgICBZb3UgY2FuIGZpeCB0aGlzIGJ5IHNldHRpbmcgeW91ciBncmlkT3B0aW9uIHRvIHVzZSBcImVuYWJsZUF1dG9SZXNpemVcIiBvciBjcmVhdGUgYW4gaW5zdGFuY2Ugb2YgdGhlIFJlc2l6ZXJTZXJ2aWNlIGJ5IGNhbGxpbmcgYmluZEF1dG9SZXNpemVEYXRhR3JpZCgpYCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcbiAgICAgIC8vIGJlY2F1c2Ugb2YgdGhlIGphdmFzY3JpcHQgYXN5bmMgbmF0dXJlLCB3ZSBtaWdodCB3YW50IHRvIGRlbGF5IHRoZSByZXNpemUgYSBsaXR0bGUgYml0XHJcbiAgICAgIGRlbGF5ID0gZGVsYXkgfHwgMDtcclxuXHJcbiAgICAgIGlmIChkZWxheSA+IDApIHtcclxuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5fdGltZXIpO1xyXG4gICAgICAgIHRoaXMuX3RpbWVyID0gc2V0VGltZW91dCgoKSA9PiByZXNvbHZlKHRoaXMucmVzaXplR3JpZENhbGxiYWNrKG5ld1NpemVzKSksIGRlbGF5KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXNvbHZlKHRoaXMucmVzaXplR3JpZENhbGxiYWNrKG5ld1NpemVzKSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcmVzaXplR3JpZENhbGxiYWNrKG5ld1NpemVzOiBHcmlkRGltZW5zaW9uKSB7XHJcbiAgICBjb25zdCBsYXN0RGltZW5zaW9ucyA9IHRoaXMucmVzaXplR3JpZFdpdGhEaW1lbnNpb25zKG5ld1NpemVzKTtcclxuICAgIHRoaXMub25HcmlkQWZ0ZXJSZXNpemUubmV4dChsYXN0RGltZW5zaW9ucyk7XHJcbiAgICByZXR1cm4gbGFzdERpbWVuc2lvbnM7XHJcbiAgfVxyXG5cclxuICByZXNpemVHcmlkV2l0aERpbWVuc2lvbnMobmV3U2l6ZXM/OiBHcmlkRGltZW5zaW9uKTogR3JpZERpbWVuc2lvbiB7XHJcbiAgICAvLyBjYWxjdWxhdGUgdGhlIGF2YWlsYWJsZSBzaXplcyB3aXRoIG1pbmltdW0gaGVpZ2h0IGRlZmluZWQgYXMgYSBjb25zdGFudFxyXG4gICAgY29uc3QgYXZhaWxhYmxlRGltZW5zaW9ucyA9IHRoaXMuY2FsY3VsYXRlR3JpZE5ld0RpbWVuc2lvbnModGhpcy5fZ3JpZE9wdGlvbnMpO1xyXG4gICAgY29uc3QgZ3JpZEVsbSA9ICQoYCMke3RoaXMuX2dyaWRPcHRpb25zLmdyaWRJZH1gKSB8fCB7fTtcclxuICAgIGNvbnN0IGdyaWRDb250YWluZXJFbG0gPSAkKGAjJHt0aGlzLl9ncmlkT3B0aW9ucy5ncmlkQ29udGFpbmVySWR9YCkgfHwge307XHJcblxyXG4gICAgaWYgKChuZXdTaXplcyB8fCBhdmFpbGFibGVEaW1lbnNpb25zKSAmJiBncmlkRWxtLmxlbmd0aCA+IDApIHtcclxuICAgICAgLy8gZ2V0IHRoZSBuZXcgc2l6ZXMsIGlmIG5ldyBzaXplcyBhcmUgcGFzc2VkIChub3QgMCksIHdlIHdpbGwgdXNlIHRoZW0gZWxzZSB1c2UgYXZhaWxhYmxlIHNwYWNlXHJcbiAgICAgIC8vIGJhc2ljYWxseSBpZiB1c2VyIHBhc3NlcyAxIG9mIHRoZSBkaW1lbnNpb24sIGxldCBzYXkgaGUgcGFzc2VzIGp1c3QgdGhlIGhlaWdodCxcclxuICAgICAgLy8gd2Ugd2lsbCB1c2UgdGhlIGhlaWdodCBhcyBhIGZpeGVkIGhlaWdodCBidXQgdGhlIHdpZHRoIHdpbGwgYmUgcmVzaXplZCBieSBpdCdzIGF2YWlsYWJsZSBzcGFjZVxyXG4gICAgICBjb25zdCBuZXdIZWlnaHQgPSAobmV3U2l6ZXMgJiYgbmV3U2l6ZXMuaGVpZ2h0KSA/IG5ld1NpemVzLmhlaWdodCA6IGF2YWlsYWJsZURpbWVuc2lvbnMuaGVpZ2h0O1xyXG4gICAgICBjb25zdCBuZXdXaWR0aCA9IChuZXdTaXplcyAmJiBuZXdTaXplcy53aWR0aCkgPyBuZXdTaXplcy53aWR0aCA6IGF2YWlsYWJsZURpbWVuc2lvbnMud2lkdGg7XHJcblxyXG4gICAgICAvLyBhcHBseSB0aGVzZSBuZXcgaGVpZ2h0L3dpZHRoIHRvIHRoZSBkYXRhZ3JpZFxyXG4gICAgICBpZiAoIXRoaXMuX2dyaWRPcHRpb25zLmF1dG9IZWlnaHQpIHtcclxuICAgICAgICBncmlkRWxtLmhlaWdodChuZXdIZWlnaHQpO1xyXG4gICAgICAgIGdyaWRDb250YWluZXJFbG0uaGVpZ2h0KG5ld0hlaWdodCk7XHJcbiAgICAgIH1cclxuICAgICAgZ3JpZEVsbS53aWR0aChuZXdXaWR0aCk7XHJcbiAgICAgIGdyaWRDb250YWluZXJFbG0ud2lkdGgobmV3V2lkdGgpO1xyXG5cclxuICAgICAgLy8gcmVzaXplIHRoZSBzbGlja2dyaWQgY2FudmFzIG9uIGFsbCBicm93c2VyIGV4Y2VwdCBzb21lIElFIHZlcnNpb25zXHJcbiAgICAgIC8vIGV4Y2x1ZGUgYWxsIElFIGJlbG93IElFMTFcclxuICAgICAgLy8gSUUxMSB3YW50cyB0byBiZSBhIGJldHRlciBzdGFuZGFyZCAoVzNDKSBmb2xsb3dlciAoZmluYWxseSkgdGhleSBldmVuIGNoYW5nZWQgdGhlaXIgYXBwTmFtZSBvdXRwdXQgdG8gYWxzbyBoYXZlICdOZXRzY2FwZSdcclxuICAgICAgaWYgKG5ldyBSZWdFeHAoJ01TSUUgWzYtOF0nKS5leGVjKG5hdmlnYXRvci51c2VyQWdlbnQpID09PSBudWxsICYmIHRoaXMuX2dyaWQgJiYgdGhpcy5fZ3JpZC5yZXNpemVDYW52YXMpIHtcclxuICAgICAgICB0aGlzLl9ncmlkLnJlc2l6ZUNhbnZhcygpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBhbHNvIGNhbGwgdGhlIGdyaWQgYXV0by1zaXplIGNvbHVtbnMgc28gdGhhdCBpdCB0YWtlcyBhdmFpbGFibGUgd2hlbiBnb2luZyBiaWdnZXJcclxuICAgICAgaWYgKHRoaXMuX2dyaWRPcHRpb25zICYmIHRoaXMuX2dyaWRPcHRpb25zLmVuYWJsZUF1dG9TaXplQ29sdW1ucyAmJiB0aGlzLl9ncmlkLmF1dG9zaXplQ29sdW1ucykge1xyXG4gICAgICAgIC8vIG1ha2Ugc3VyZSB0aGF0IHRoZSBncmlkIHN0aWxsIGV4aXN0IChieSBsb29raW5nIGlmIHRoZSBHcmlkIFVJRCBpcyBmb3VuZCBpbiB0aGUgRE9NIHRyZWUpIHRvIGF2b2lkIFNsaWNrR3JpZCBlcnJvciBcIm1pc3Npbmcgc3R5bGVzaGVldFwiXHJcbiAgICAgICAgaWYgKHRoaXMuX2dyaWRVaWQgJiYgJChgLiR7dGhpcy5fZ3JpZFVpZH1gKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICB0aGlzLl9ncmlkLmF1dG9zaXplQ29sdW1ucygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gY29tcGVuc2F0ZSBhbnl0aW1lIFNsaWNrR3JpZCBtZWFzdXJlU2Nyb2xsYmFyIGlzIGluY29ycmVjdFxyXG4gICAgICAgIHRoaXMuY29tcGVuc2F0ZUhvcml6b250YWxTY3JvbGwodGhpcy5fZ3JpZCwgdGhpcy5fZ3JpZE9wdGlvbnMpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBrZWVwIGxhc3QgcmVzaXplZCBkaW1lbnNpb25zICYgcmVzb2x2ZSB0aGVtIHRvIHRoZSBQcm9taXNlXHJcbiAgICAgIHRoaXMuX2xhc3REaW1lbnNpb25zID0ge1xyXG4gICAgICAgIGhlaWdodDogbmV3SGVpZ2h0LFxyXG4gICAgICAgIHdpZHRoOiBuZXdXaWR0aFxyXG4gICAgICB9O1xyXG5cclxuICAgICAgaWYgKCh0aGlzLl9ncmlkT3B0aW9ucy5lbmFibGVQYWdpbmF0aW9uIHx8IHRoaXMuX2dyaWRPcHRpb25zLmJhY2tlbmRTZXJ2aWNlQXBpKSkge1xyXG4gICAgICAgIHRoaXMuX2xhc3REaW1lbnNpb25zLmhlaWdodFdpdGhQYWdpbmF0aW9uID0gbmV3SGVpZ2h0ICsgREFUQUdSSURfUEFHSU5BVElPTl9IRUlHSFQ7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5fbGFzdERpbWVuc2lvbnM7XHJcbiAgfVxyXG59XHJcbiJdfQ==