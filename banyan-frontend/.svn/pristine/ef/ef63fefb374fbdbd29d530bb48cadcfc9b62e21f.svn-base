export class GroupingAndColspanService {
    constructor() {
        this._eventHandler = new Slick.EventHandler();
    }
    /** Getter for the Grid Options pulled through the Grid Object */
    get _gridOptions() {
        return (this._grid && this._grid.getOptions) ? this._grid.getOptions() : {};
    }
    /** Getter for the Column Definitions pulled through the Grid Object */
    get _columnDefinitions() {
        return (this._grid && this._grid.getColumns) ? this._grid.getColumns() : [];
    }
    init(grid, dataView) {
        this._grid = grid;
        this._dataView = dataView;
        if (grid && this._gridOptions) {
            // When dealing with Pre-Header Grouping colspan, we need to re-create the pre-header in multiple occasions
            // for all these occasions, we have to trigger a re-create
            if (this._gridOptions.createPreHeaderPanel) {
                this._eventHandler.subscribe(grid.onSort, (e, args) => {
                    this.createPreHeaderRowGroupingTitle();
                });
                this._eventHandler.subscribe(grid.onColumnsResized, (e, args) => {
                    this.createPreHeaderRowGroupingTitle();
                });
                this._eventHandler.subscribe(dataView.onRowCountChanged, (e, args) => {
                    this.createPreHeaderRowGroupingTitle();
                });
                // also not sure why at this point, but it seems that I need to call the 1st create in a delayed execution
                // probably some kind of timing issues and delaying it until the grid is fully ready does help
                setTimeout(() => {
                    this.createPreHeaderRowGroupingTitle();
                }, 50);
            }
        }
    }
    dispose() {
        // unsubscribe all SlickGrid events
        this._eventHandler.unsubscribeAll();
    }
    createPreHeaderRowGroupingTitle() {
        const $preHeaderPanel = $(this._grid.getPreHeaderPanel())
            .empty()
            .addClass('slick-header-columns')
            .css('left', '-1000px')
            .width(this._grid.getHeadersWidth());
        $preHeaderPanel.parent().addClass('slick-header');
        const headerColumnWidthDiff = this._grid.getHeaderColumnWidthDiff();
        let m;
        let header;
        let lastColumnGroup = '';
        let widthTotal = 0;
        for (let i = 0; i < this._columnDefinitions.length; i++) {
            m = this._columnDefinitions[i];
            if (lastColumnGroup === m.columnGroup && i > 0) {
                widthTotal += m.width;
                header.width(widthTotal - headerColumnWidthDiff);
            }
            else {
                widthTotal = m.width;
                header = $(`<div class="ui-state-default slick-header-column" />`)
                    .html(`<span class="slick-column-name">${m.columnGroup || ''}</span>`)
                    .width(m.width - headerColumnWidthDiff)
                    .appendTo($preHeaderPanel);
            }
            lastColumnGroup = m.columnGroup;
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvdXBpbmdBbmRDb2xzcGFuLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL3NlcnZpY2VzL2dyb3VwaW5nQW5kQ29sc3Bhbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVlBLE1BQU0sT0FBTyx5QkFBeUI7SUFBdEM7UUFDVSxrQkFBYSxHQUFHLElBQUksS0FBSyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBMEVuRCxDQUFDO0lBdEVDLGlFQUFpRTtJQUNqRSxJQUFZLFlBQVk7UUFDdEIsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQzlFLENBQUM7SUFFRCx1RUFBdUU7SUFDdkUsSUFBWSxrQkFBa0I7UUFDNUIsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQzlFLENBQUM7SUFFRCxJQUFJLENBQUMsSUFBUyxFQUFFLFFBQWE7UUFDM0IsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDbEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7UUFFMUIsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUM3QiwyR0FBMkc7WUFDM0csMERBQTBEO1lBQzFELElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxvQkFBb0IsRUFBRTtnQkFDMUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQVEsRUFBRSxJQUFTLEVBQUUsRUFBRTtvQkFDaEUsSUFBSSxDQUFDLCtCQUErQixFQUFFLENBQUM7Z0JBQ3pDLENBQUMsQ0FBQyxDQUFDO2dCQUNILElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLENBQVEsRUFBRSxJQUFTLEVBQUUsRUFBRTtvQkFDMUUsSUFBSSxDQUFDLCtCQUErQixFQUFFLENBQUM7Z0JBQ3pDLENBQUMsQ0FBQyxDQUFDO2dCQUNILElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQVEsRUFBRSxJQUFTLEVBQUUsRUFBRTtvQkFDL0UsSUFBSSxDQUFDLCtCQUErQixFQUFFLENBQUM7Z0JBQ3pDLENBQUMsQ0FBQyxDQUFDO2dCQUVILDBHQUEwRztnQkFDMUcsOEZBQThGO2dCQUM5RixVQUFVLENBQUMsR0FBRyxFQUFFO29CQUNkLElBQUksQ0FBQywrQkFBK0IsRUFBRSxDQUFDO2dCQUN6QyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7YUFDUjtTQUNGO0lBQ0gsQ0FBQztJQUVELE9BQU87UUFDTCxtQ0FBbUM7UUFDbkMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUN0QyxDQUFDO0lBRUQsK0JBQStCO1FBQzdCLE1BQU0sZUFBZSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFpQixFQUFFLENBQUM7YUFDdEQsS0FBSyxFQUFFO2FBQ1AsUUFBUSxDQUFDLHNCQUFzQixDQUFDO2FBQ2hDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDO2FBQ3RCLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUM7UUFDdkMsZUFBZSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNsRCxNQUFNLHFCQUFxQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztRQUNwRSxJQUFJLENBQUMsQ0FBQztRQUNOLElBQUksTUFBTSxDQUFDO1FBQ1gsSUFBSSxlQUFlLEdBQUcsRUFBRSxDQUFDO1FBQ3pCLElBQUksVUFBVSxHQUFHLENBQUMsQ0FBQztRQUVuQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN2RCxDQUFDLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9CLElBQUksZUFBZSxLQUFLLENBQUMsQ0FBQyxXQUFXLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDOUMsVUFBVSxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUM7Z0JBQ3RCLE1BQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLHFCQUFxQixDQUFDLENBQUM7YUFDbEQ7aUJBQU07Z0JBQ0wsVUFBVSxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUM7Z0JBQ3JCLE1BQU0sR0FBRyxDQUFDLENBQUMsc0RBQXNELENBQUM7cUJBQy9ELElBQUksQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDLFdBQVcsSUFBSSxFQUFFLFNBQVMsQ0FBQztxQkFDckUsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcscUJBQXFCLENBQUM7cUJBQ3RDLFFBQVEsQ0FBQyxlQUFlLENBQUMsQ0FBQzthQUM5QjtZQUNELGVBQWUsR0FBRyxDQUFDLENBQUMsV0FBVyxDQUFDO1NBQ2pDO0lBQ0gsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB7XHJcbiAgQ29sdW1uLFxyXG4gIEdyaWRPcHRpb25cclxufSBmcm9tICcuLy4uL21vZGVscy9pbmRleCc7XHJcblxyXG4vLyB1c2luZyBleHRlcm5hbCBub24tdHlwZWQganMgbGlicmFyaWVzXHJcbmRlY2xhcmUgbGV0ICQ6IGFueTtcclxuXHJcbi8vIHVzaW5nIGV4dGVybmFsIG5vbi10eXBlZCBqcyBsaWJyYXJpZXNcclxuZGVjbGFyZSB2YXIgU2xpY2s6IGFueTtcclxuXHJcbmV4cG9ydCBjbGFzcyBHcm91cGluZ0FuZENvbHNwYW5TZXJ2aWNlIHtcclxuICBwcml2YXRlIF9ldmVudEhhbmRsZXIgPSBuZXcgU2xpY2suRXZlbnRIYW5kbGVyKCk7XHJcbiAgcHJpdmF0ZSBfZGF0YVZpZXc6IGFueTtcclxuICBwcml2YXRlIF9ncmlkOiBhbnk7XHJcblxyXG4gIC8qKiBHZXR0ZXIgZm9yIHRoZSBHcmlkIE9wdGlvbnMgcHVsbGVkIHRocm91Z2ggdGhlIEdyaWQgT2JqZWN0ICovXHJcbiAgcHJpdmF0ZSBnZXQgX2dyaWRPcHRpb25zKCk6IEdyaWRPcHRpb24ge1xyXG4gICAgcmV0dXJuICh0aGlzLl9ncmlkICYmIHRoaXMuX2dyaWQuZ2V0T3B0aW9ucykgPyB0aGlzLl9ncmlkLmdldE9wdGlvbnMoKSA6IHt9O1xyXG4gIH1cclxuXHJcbiAgLyoqIEdldHRlciBmb3IgdGhlIENvbHVtbiBEZWZpbml0aW9ucyBwdWxsZWQgdGhyb3VnaCB0aGUgR3JpZCBPYmplY3QgKi9cclxuICBwcml2YXRlIGdldCBfY29sdW1uRGVmaW5pdGlvbnMoKTogQ29sdW1uW10ge1xyXG4gICAgcmV0dXJuICh0aGlzLl9ncmlkICYmIHRoaXMuX2dyaWQuZ2V0Q29sdW1ucykgPyB0aGlzLl9ncmlkLmdldENvbHVtbnMoKSA6IFtdO1xyXG4gIH1cclxuXHJcbiAgaW5pdChncmlkOiBhbnksIGRhdGFWaWV3OiBhbnkpIHtcclxuICAgIHRoaXMuX2dyaWQgPSBncmlkO1xyXG4gICAgdGhpcy5fZGF0YVZpZXcgPSBkYXRhVmlldztcclxuXHJcbiAgICBpZiAoZ3JpZCAmJiB0aGlzLl9ncmlkT3B0aW9ucykge1xyXG4gICAgICAvLyBXaGVuIGRlYWxpbmcgd2l0aCBQcmUtSGVhZGVyIEdyb3VwaW5nIGNvbHNwYW4sIHdlIG5lZWQgdG8gcmUtY3JlYXRlIHRoZSBwcmUtaGVhZGVyIGluIG11bHRpcGxlIG9jY2FzaW9uc1xyXG4gICAgICAvLyBmb3IgYWxsIHRoZXNlIG9jY2FzaW9ucywgd2UgaGF2ZSB0byB0cmlnZ2VyIGEgcmUtY3JlYXRlXHJcbiAgICAgIGlmICh0aGlzLl9ncmlkT3B0aW9ucy5jcmVhdGVQcmVIZWFkZXJQYW5lbCkge1xyXG4gICAgICAgIHRoaXMuX2V2ZW50SGFuZGxlci5zdWJzY3JpYmUoZ3JpZC5vblNvcnQsIChlOiBFdmVudCwgYXJnczogYW55KSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmNyZWF0ZVByZUhlYWRlclJvd0dyb3VwaW5nVGl0bGUoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLl9ldmVudEhhbmRsZXIuc3Vic2NyaWJlKGdyaWQub25Db2x1bW5zUmVzaXplZCwgKGU6IEV2ZW50LCBhcmdzOiBhbnkpID0+IHtcclxuICAgICAgICAgIHRoaXMuY3JlYXRlUHJlSGVhZGVyUm93R3JvdXBpbmdUaXRsZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuX2V2ZW50SGFuZGxlci5zdWJzY3JpYmUoZGF0YVZpZXcub25Sb3dDb3VudENoYW5nZWQsIChlOiBFdmVudCwgYXJnczogYW55KSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmNyZWF0ZVByZUhlYWRlclJvd0dyb3VwaW5nVGl0bGUoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gYWxzbyBub3Qgc3VyZSB3aHkgYXQgdGhpcyBwb2ludCwgYnV0IGl0IHNlZW1zIHRoYXQgSSBuZWVkIHRvIGNhbGwgdGhlIDFzdCBjcmVhdGUgaW4gYSBkZWxheWVkIGV4ZWN1dGlvblxyXG4gICAgICAgIC8vIHByb2JhYmx5IHNvbWUga2luZCBvZiB0aW1pbmcgaXNzdWVzIGFuZCBkZWxheWluZyBpdCB1bnRpbCB0aGUgZ3JpZCBpcyBmdWxseSByZWFkeSBkb2VzIGhlbHBcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgIHRoaXMuY3JlYXRlUHJlSGVhZGVyUm93R3JvdXBpbmdUaXRsZSgpO1xyXG4gICAgICAgIH0sIDUwKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZGlzcG9zZSgpIHtcclxuICAgIC8vIHVuc3Vic2NyaWJlIGFsbCBTbGlja0dyaWQgZXZlbnRzXHJcbiAgICB0aGlzLl9ldmVudEhhbmRsZXIudW5zdWJzY3JpYmVBbGwoKTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZVByZUhlYWRlclJvd0dyb3VwaW5nVGl0bGUoKSB7XHJcbiAgICBjb25zdCAkcHJlSGVhZGVyUGFuZWwgPSAkKHRoaXMuX2dyaWQuZ2V0UHJlSGVhZGVyUGFuZWwoKSlcclxuICAgICAgLmVtcHR5KClcclxuICAgICAgLmFkZENsYXNzKCdzbGljay1oZWFkZXItY29sdW1ucycpXHJcbiAgICAgIC5jc3MoJ2xlZnQnLCAnLTEwMDBweCcpXHJcbiAgICAgIC53aWR0aCh0aGlzLl9ncmlkLmdldEhlYWRlcnNXaWR0aCgpKTtcclxuICAgICRwcmVIZWFkZXJQYW5lbC5wYXJlbnQoKS5hZGRDbGFzcygnc2xpY2staGVhZGVyJyk7XHJcbiAgICBjb25zdCBoZWFkZXJDb2x1bW5XaWR0aERpZmYgPSB0aGlzLl9ncmlkLmdldEhlYWRlckNvbHVtbldpZHRoRGlmZigpO1xyXG4gICAgbGV0IG07XHJcbiAgICBsZXQgaGVhZGVyO1xyXG4gICAgbGV0IGxhc3RDb2x1bW5Hcm91cCA9ICcnO1xyXG4gICAgbGV0IHdpZHRoVG90YWwgPSAwO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fY29sdW1uRGVmaW5pdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgbSA9IHRoaXMuX2NvbHVtbkRlZmluaXRpb25zW2ldO1xyXG4gICAgICBpZiAobGFzdENvbHVtbkdyb3VwID09PSBtLmNvbHVtbkdyb3VwICYmIGkgPiAwKSB7XHJcbiAgICAgICAgd2lkdGhUb3RhbCArPSBtLndpZHRoO1xyXG4gICAgICAgIGhlYWRlci53aWR0aCh3aWR0aFRvdGFsIC0gaGVhZGVyQ29sdW1uV2lkdGhEaWZmKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB3aWR0aFRvdGFsID0gbS53aWR0aDtcclxuICAgICAgICBoZWFkZXIgPSAkKGA8ZGl2IGNsYXNzPVwidWktc3RhdGUtZGVmYXVsdCBzbGljay1oZWFkZXItY29sdW1uXCIgLz5gKVxyXG4gICAgICAgICAgLmh0bWwoYDxzcGFuIGNsYXNzPVwic2xpY2stY29sdW1uLW5hbWVcIj4ke20uY29sdW1uR3JvdXAgfHwgJyd9PC9zcGFuPmApXHJcbiAgICAgICAgICAud2lkdGgobS53aWR0aCAtIGhlYWRlckNvbHVtbldpZHRoRGlmZilcclxuICAgICAgICAgIC5hcHBlbmRUbygkcHJlSGVhZGVyUGFuZWwpO1xyXG4gICAgICB9XHJcbiAgICAgIGxhc3RDb2x1bW5Hcm91cCA9IG0uY29sdW1uR3JvdXA7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==