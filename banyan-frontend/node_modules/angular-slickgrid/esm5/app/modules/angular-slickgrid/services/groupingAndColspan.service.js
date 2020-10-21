var GroupingAndColspanService = /** @class */ (function () {
    function GroupingAndColspanService() {
        this._eventHandler = new Slick.EventHandler();
    }
    Object.defineProperty(GroupingAndColspanService.prototype, "_gridOptions", {
        /** Getter for the Grid Options pulled through the Grid Object */
        get: function () {
            return (this._grid && this._grid.getOptions) ? this._grid.getOptions() : {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GroupingAndColspanService.prototype, "_columnDefinitions", {
        /** Getter for the Column Definitions pulled through the Grid Object */
        get: function () {
            return (this._grid && this._grid.getColumns) ? this._grid.getColumns() : [];
        },
        enumerable: true,
        configurable: true
    });
    GroupingAndColspanService.prototype.init = function (grid, dataView) {
        var _this = this;
        this._grid = grid;
        this._dataView = dataView;
        if (grid && this._gridOptions) {
            // When dealing with Pre-Header Grouping colspan, we need to re-create the pre-header in multiple occasions
            // for all these occasions, we have to trigger a re-create
            if (this._gridOptions.createPreHeaderPanel) {
                this._eventHandler.subscribe(grid.onSort, function (e, args) {
                    _this.createPreHeaderRowGroupingTitle();
                });
                this._eventHandler.subscribe(grid.onColumnsResized, function (e, args) {
                    _this.createPreHeaderRowGroupingTitle();
                });
                this._eventHandler.subscribe(dataView.onRowCountChanged, function (e, args) {
                    _this.createPreHeaderRowGroupingTitle();
                });
                // also not sure why at this point, but it seems that I need to call the 1st create in a delayed execution
                // probably some kind of timing issues and delaying it until the grid is fully ready does help
                setTimeout(function () {
                    _this.createPreHeaderRowGroupingTitle();
                }, 50);
            }
        }
    };
    GroupingAndColspanService.prototype.dispose = function () {
        // unsubscribe all SlickGrid events
        this._eventHandler.unsubscribeAll();
    };
    GroupingAndColspanService.prototype.createPreHeaderRowGroupingTitle = function () {
        var $preHeaderPanel = $(this._grid.getPreHeaderPanel())
            .empty()
            .addClass('slick-header-columns')
            .css('left', '-1000px')
            .width(this._grid.getHeadersWidth());
        $preHeaderPanel.parent().addClass('slick-header');
        var headerColumnWidthDiff = this._grid.getHeaderColumnWidthDiff();
        var m;
        var header;
        var lastColumnGroup = '';
        var widthTotal = 0;
        for (var i = 0; i < this._columnDefinitions.length; i++) {
            m = this._columnDefinitions[i];
            if (lastColumnGroup === m.columnGroup && i > 0) {
                widthTotal += m.width;
                header.width(widthTotal - headerColumnWidthDiff);
            }
            else {
                widthTotal = m.width;
                header = $("<div class=\"ui-state-default slick-header-column\" />")
                    .html("<span class=\"slick-column-name\">" + (m.columnGroup || '') + "</span>")
                    .width(m.width - headerColumnWidthDiff)
                    .appendTo($preHeaderPanel);
            }
            lastColumnGroup = m.columnGroup;
        }
    };
    return GroupingAndColspanService;
}());
export { GroupingAndColspanService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvdXBpbmdBbmRDb2xzcGFuLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL3NlcnZpY2VzL2dyb3VwaW5nQW5kQ29sc3Bhbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVlBO0lBQUE7UUFDVSxrQkFBYSxHQUFHLElBQUksS0FBSyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBMEVuRCxDQUFDO0lBckVDLHNCQUFZLG1EQUFZO1FBRHhCLGlFQUFpRTthQUNqRTtZQUNFLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUM5RSxDQUFDOzs7T0FBQTtJQUdELHNCQUFZLHlEQUFrQjtRQUQ5Qix1RUFBdUU7YUFDdkU7WUFDRSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDOUUsQ0FBQzs7O09BQUE7SUFFRCx3Q0FBSSxHQUFKLFVBQUssSUFBUyxFQUFFLFFBQWE7UUFBN0IsaUJBeUJDO1FBeEJDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1FBRTFCLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDN0IsMkdBQTJHO1lBQzNHLDBEQUEwRDtZQUMxRCxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsb0JBQW9CLEVBQUU7Z0JBQzFDLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsVUFBQyxDQUFRLEVBQUUsSUFBUztvQkFDNUQsS0FBSSxDQUFDLCtCQUErQixFQUFFLENBQUM7Z0JBQ3pDLENBQUMsQ0FBQyxDQUFDO2dCQUNILElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxVQUFDLENBQVEsRUFBRSxJQUFTO29CQUN0RSxLQUFJLENBQUMsK0JBQStCLEVBQUUsQ0FBQztnQkFDekMsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLGlCQUFpQixFQUFFLFVBQUMsQ0FBUSxFQUFFLElBQVM7b0JBQzNFLEtBQUksQ0FBQywrQkFBK0IsRUFBRSxDQUFDO2dCQUN6QyxDQUFDLENBQUMsQ0FBQztnQkFFSCwwR0FBMEc7Z0JBQzFHLDhGQUE4RjtnQkFDOUYsVUFBVSxDQUFDO29CQUNULEtBQUksQ0FBQywrQkFBK0IsRUFBRSxDQUFDO2dCQUN6QyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7YUFDUjtTQUNGO0lBQ0gsQ0FBQztJQUVELDJDQUFPLEdBQVA7UUFDRSxtQ0FBbUM7UUFDbkMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUN0QyxDQUFDO0lBRUQsbUVBQStCLEdBQS9CO1FBQ0UsSUFBTSxlQUFlLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCLEVBQUUsQ0FBQzthQUN0RCxLQUFLLEVBQUU7YUFDUCxRQUFRLENBQUMsc0JBQXNCLENBQUM7YUFDaEMsR0FBRyxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUM7YUFDdEIsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQztRQUN2QyxlQUFlLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ2xELElBQU0scUJBQXFCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO1FBQ3BFLElBQUksQ0FBQyxDQUFDO1FBQ04sSUFBSSxNQUFNLENBQUM7UUFDWCxJQUFJLGVBQWUsR0FBRyxFQUFFLENBQUM7UUFDekIsSUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFDO1FBRW5CLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3ZELENBQUMsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0IsSUFBSSxlQUFlLEtBQUssQ0FBQyxDQUFDLFdBQVcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUM5QyxVQUFVLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQztnQkFDdEIsTUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcscUJBQXFCLENBQUMsQ0FBQzthQUNsRDtpQkFBTTtnQkFDTCxVQUFVLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQztnQkFDckIsTUFBTSxHQUFHLENBQUMsQ0FBQyx3REFBc0QsQ0FBQztxQkFDL0QsSUFBSSxDQUFDLHdDQUFtQyxDQUFDLENBQUMsV0FBVyxJQUFJLEVBQUUsYUFBUyxDQUFDO3FCQUNyRSxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxxQkFBcUIsQ0FBQztxQkFDdEMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxDQUFDO2FBQzlCO1lBQ0QsZUFBZSxHQUFHLENBQUMsQ0FBQyxXQUFXLENBQUM7U0FDakM7SUFDSCxDQUFDO0lBQ0gsZ0NBQUM7QUFBRCxDQUFDLEFBM0VELElBMkVDIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB7XHJcbiAgQ29sdW1uLFxyXG4gIEdyaWRPcHRpb25cclxufSBmcm9tICcuLy4uL21vZGVscy9pbmRleCc7XHJcblxyXG4vLyB1c2luZyBleHRlcm5hbCBub24tdHlwZWQganMgbGlicmFyaWVzXHJcbmRlY2xhcmUgbGV0ICQ6IGFueTtcclxuXHJcbi8vIHVzaW5nIGV4dGVybmFsIG5vbi10eXBlZCBqcyBsaWJyYXJpZXNcclxuZGVjbGFyZSB2YXIgU2xpY2s6IGFueTtcclxuXHJcbmV4cG9ydCBjbGFzcyBHcm91cGluZ0FuZENvbHNwYW5TZXJ2aWNlIHtcclxuICBwcml2YXRlIF9ldmVudEhhbmRsZXIgPSBuZXcgU2xpY2suRXZlbnRIYW5kbGVyKCk7XHJcbiAgcHJpdmF0ZSBfZGF0YVZpZXc6IGFueTtcclxuICBwcml2YXRlIF9ncmlkOiBhbnk7XHJcblxyXG4gIC8qKiBHZXR0ZXIgZm9yIHRoZSBHcmlkIE9wdGlvbnMgcHVsbGVkIHRocm91Z2ggdGhlIEdyaWQgT2JqZWN0ICovXHJcbiAgcHJpdmF0ZSBnZXQgX2dyaWRPcHRpb25zKCk6IEdyaWRPcHRpb24ge1xyXG4gICAgcmV0dXJuICh0aGlzLl9ncmlkICYmIHRoaXMuX2dyaWQuZ2V0T3B0aW9ucykgPyB0aGlzLl9ncmlkLmdldE9wdGlvbnMoKSA6IHt9O1xyXG4gIH1cclxuXHJcbiAgLyoqIEdldHRlciBmb3IgdGhlIENvbHVtbiBEZWZpbml0aW9ucyBwdWxsZWQgdGhyb3VnaCB0aGUgR3JpZCBPYmplY3QgKi9cclxuICBwcml2YXRlIGdldCBfY29sdW1uRGVmaW5pdGlvbnMoKTogQ29sdW1uW10ge1xyXG4gICAgcmV0dXJuICh0aGlzLl9ncmlkICYmIHRoaXMuX2dyaWQuZ2V0Q29sdW1ucykgPyB0aGlzLl9ncmlkLmdldENvbHVtbnMoKSA6IFtdO1xyXG4gIH1cclxuXHJcbiAgaW5pdChncmlkOiBhbnksIGRhdGFWaWV3OiBhbnkpIHtcclxuICAgIHRoaXMuX2dyaWQgPSBncmlkO1xyXG4gICAgdGhpcy5fZGF0YVZpZXcgPSBkYXRhVmlldztcclxuXHJcbiAgICBpZiAoZ3JpZCAmJiB0aGlzLl9ncmlkT3B0aW9ucykge1xyXG4gICAgICAvLyBXaGVuIGRlYWxpbmcgd2l0aCBQcmUtSGVhZGVyIEdyb3VwaW5nIGNvbHNwYW4sIHdlIG5lZWQgdG8gcmUtY3JlYXRlIHRoZSBwcmUtaGVhZGVyIGluIG11bHRpcGxlIG9jY2FzaW9uc1xyXG4gICAgICAvLyBmb3IgYWxsIHRoZXNlIG9jY2FzaW9ucywgd2UgaGF2ZSB0byB0cmlnZ2VyIGEgcmUtY3JlYXRlXHJcbiAgICAgIGlmICh0aGlzLl9ncmlkT3B0aW9ucy5jcmVhdGVQcmVIZWFkZXJQYW5lbCkge1xyXG4gICAgICAgIHRoaXMuX2V2ZW50SGFuZGxlci5zdWJzY3JpYmUoZ3JpZC5vblNvcnQsIChlOiBFdmVudCwgYXJnczogYW55KSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmNyZWF0ZVByZUhlYWRlclJvd0dyb3VwaW5nVGl0bGUoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLl9ldmVudEhhbmRsZXIuc3Vic2NyaWJlKGdyaWQub25Db2x1bW5zUmVzaXplZCwgKGU6IEV2ZW50LCBhcmdzOiBhbnkpID0+IHtcclxuICAgICAgICAgIHRoaXMuY3JlYXRlUHJlSGVhZGVyUm93R3JvdXBpbmdUaXRsZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuX2V2ZW50SGFuZGxlci5zdWJzY3JpYmUoZGF0YVZpZXcub25Sb3dDb3VudENoYW5nZWQsIChlOiBFdmVudCwgYXJnczogYW55KSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmNyZWF0ZVByZUhlYWRlclJvd0dyb3VwaW5nVGl0bGUoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gYWxzbyBub3Qgc3VyZSB3aHkgYXQgdGhpcyBwb2ludCwgYnV0IGl0IHNlZW1zIHRoYXQgSSBuZWVkIHRvIGNhbGwgdGhlIDFzdCBjcmVhdGUgaW4gYSBkZWxheWVkIGV4ZWN1dGlvblxyXG4gICAgICAgIC8vIHByb2JhYmx5IHNvbWUga2luZCBvZiB0aW1pbmcgaXNzdWVzIGFuZCBkZWxheWluZyBpdCB1bnRpbCB0aGUgZ3JpZCBpcyBmdWxseSByZWFkeSBkb2VzIGhlbHBcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgIHRoaXMuY3JlYXRlUHJlSGVhZGVyUm93R3JvdXBpbmdUaXRsZSgpO1xyXG4gICAgICAgIH0sIDUwKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZGlzcG9zZSgpIHtcclxuICAgIC8vIHVuc3Vic2NyaWJlIGFsbCBTbGlja0dyaWQgZXZlbnRzXHJcbiAgICB0aGlzLl9ldmVudEhhbmRsZXIudW5zdWJzY3JpYmVBbGwoKTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZVByZUhlYWRlclJvd0dyb3VwaW5nVGl0bGUoKSB7XHJcbiAgICBjb25zdCAkcHJlSGVhZGVyUGFuZWwgPSAkKHRoaXMuX2dyaWQuZ2V0UHJlSGVhZGVyUGFuZWwoKSlcclxuICAgICAgLmVtcHR5KClcclxuICAgICAgLmFkZENsYXNzKCdzbGljay1oZWFkZXItY29sdW1ucycpXHJcbiAgICAgIC5jc3MoJ2xlZnQnLCAnLTEwMDBweCcpXHJcbiAgICAgIC53aWR0aCh0aGlzLl9ncmlkLmdldEhlYWRlcnNXaWR0aCgpKTtcclxuICAgICRwcmVIZWFkZXJQYW5lbC5wYXJlbnQoKS5hZGRDbGFzcygnc2xpY2staGVhZGVyJyk7XHJcbiAgICBjb25zdCBoZWFkZXJDb2x1bW5XaWR0aERpZmYgPSB0aGlzLl9ncmlkLmdldEhlYWRlckNvbHVtbldpZHRoRGlmZigpO1xyXG4gICAgbGV0IG07XHJcbiAgICBsZXQgaGVhZGVyO1xyXG4gICAgbGV0IGxhc3RDb2x1bW5Hcm91cCA9ICcnO1xyXG4gICAgbGV0IHdpZHRoVG90YWwgPSAwO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fY29sdW1uRGVmaW5pdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgbSA9IHRoaXMuX2NvbHVtbkRlZmluaXRpb25zW2ldO1xyXG4gICAgICBpZiAobGFzdENvbHVtbkdyb3VwID09PSBtLmNvbHVtbkdyb3VwICYmIGkgPiAwKSB7XHJcbiAgICAgICAgd2lkdGhUb3RhbCArPSBtLndpZHRoO1xyXG4gICAgICAgIGhlYWRlci53aWR0aCh3aWR0aFRvdGFsIC0gaGVhZGVyQ29sdW1uV2lkdGhEaWZmKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB3aWR0aFRvdGFsID0gbS53aWR0aDtcclxuICAgICAgICBoZWFkZXIgPSAkKGA8ZGl2IGNsYXNzPVwidWktc3RhdGUtZGVmYXVsdCBzbGljay1oZWFkZXItY29sdW1uXCIgLz5gKVxyXG4gICAgICAgICAgLmh0bWwoYDxzcGFuIGNsYXNzPVwic2xpY2stY29sdW1uLW5hbWVcIj4ke20uY29sdW1uR3JvdXAgfHwgJyd9PC9zcGFuPmApXHJcbiAgICAgICAgICAud2lkdGgobS53aWR0aCAtIGhlYWRlckNvbHVtbldpZHRoRGlmZilcclxuICAgICAgICAgIC5hcHBlbmRUbygkcHJlSGVhZGVyUGFuZWwpO1xyXG4gICAgICB9XHJcbiAgICAgIGxhc3RDb2x1bW5Hcm91cCA9IG0uY29sdW1uR3JvdXA7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==