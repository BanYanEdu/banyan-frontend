export class SharedService {
    // --
    // public
    /** Getter for All Columns  in the grid (hidden/visible) */
    get allColumns() {
        return this._allColumns;
    }
    /** Setter for All Columns  in the grid (hidden/visible) */
    set allColumns(allColumns) {
        this._allColumns = allColumns;
    }
    /** Getter for the Column Definitions pulled through the Grid Object */
    get columnDefinitions() {
        return (this._grid && this._grid.getColumns) ? this._grid.getColumns() : [];
    }
    /** Getter for SlickGrid DataView object */
    get dataView() {
        return this._dataView;
    }
    /** Setter for SlickGrid DataView object */
    set dataView(dataView) {
        this._dataView = dataView;
    }
    /** Getter for SlickGrid Grid object */
    get grid() {
        return this._grid;
    }
    /** Setter for SlickGrid Grid object */
    set grid(grid) {
        this._grid = grid;
    }
    /** Getter for the Grid Options pulled through the Grid Object */
    get gridOptions() {
        return this._gridOptions || this._grid && this._grid.getOptions && this._grid.getOptions() || {};
    }
    /** Setter for the Grid Options pulled through the Grid Object */
    set gridOptions(gridOptions) {
        this._gridOptions = gridOptions;
    }
    /** Getter for the Grid Options */
    get groupItemMetadataProvider() {
        return this._groupItemMetadataProvider;
    }
    /** Setter for the Grid Options */
    set groupItemMetadataProvider(groupItemMetadataProvider) {
        this._groupItemMetadataProvider = groupItemMetadataProvider;
    }
    /** Getter for the Visible Columns in the grid */
    get visibleColumns() {
        return this._visibleColumns;
    }
    /** Setter for the Visible Columns in the grid */
    set visibleColumns(visibleColumns) {
        this._visibleColumns = visibleColumns;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL3NlcnZpY2VzL3NoYXJlZC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE1BQU0sT0FBTyxhQUFhO0lBUXhCLEtBQUs7SUFDTCxTQUFTO0lBRVQsMkRBQTJEO0lBQzNELElBQUksVUFBVTtRQUNaLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUMxQixDQUFDO0lBQ0QsMkRBQTJEO0lBQzNELElBQUksVUFBVSxDQUFDLFVBQW9CO1FBQ2pDLElBQUksQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDO0lBQ2hDLENBQUM7SUFFRCx1RUFBdUU7SUFDdkUsSUFBSSxpQkFBaUI7UUFDbkIsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQzlFLENBQUM7SUFFRCwyQ0FBMkM7SUFDM0MsSUFBSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3hCLENBQUM7SUFDRCwyQ0FBMkM7SUFDM0MsSUFBSSxRQUFRLENBQUMsUUFBYTtRQUN4QixJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztJQUM1QixDQUFDO0lBRUQsdUNBQXVDO0lBQ3ZDLElBQUksSUFBSTtRQUNOLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUNwQixDQUFDO0lBQ0QsdUNBQXVDO0lBQ3ZDLElBQUksSUFBSSxDQUFDLElBQVM7UUFDaEIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7SUFDcEIsQ0FBQztJQUVELGlFQUFpRTtJQUNqRSxJQUFJLFdBQVc7UUFDYixPQUFPLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxJQUFJLEVBQUUsQ0FBQztJQUNuRyxDQUFDO0lBRUQsaUVBQWlFO0lBQ2pFLElBQUksV0FBVyxDQUFDLFdBQXVCO1FBQ3JDLElBQUksQ0FBQyxZQUFZLEdBQUcsV0FBVyxDQUFDO0lBQ2xDLENBQUM7SUFFRCxrQ0FBa0M7SUFDbEMsSUFBSSx5QkFBeUI7UUFDM0IsT0FBTyxJQUFJLENBQUMsMEJBQTBCLENBQUM7SUFDekMsQ0FBQztJQUNELGtDQUFrQztJQUNsQyxJQUFJLHlCQUF5QixDQUFDLHlCQUE4QjtRQUMxRCxJQUFJLENBQUMsMEJBQTBCLEdBQUcseUJBQXlCLENBQUM7SUFDOUQsQ0FBQztJQUVELGlEQUFpRDtJQUNqRCxJQUFJLGNBQWM7UUFDaEIsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDO0lBQzlCLENBQUM7SUFDRCxpREFBaUQ7SUFDakQsSUFBSSxjQUFjLENBQUMsY0FBd0I7UUFDekMsSUFBSSxDQUFDLGVBQWUsR0FBRyxjQUFjLENBQUM7SUFDeEMsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29sdW1uLCBHcmlkT3B0aW9uIH0gZnJvbSAnLi4vbW9kZWxzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBTaGFyZWRTZXJ2aWNlIHtcclxuICBwcml2YXRlIF9hbGxDb2x1bW5zOiBDb2x1bW5bXTtcclxuICBwcml2YXRlIF9kYXRhVmlldzogYW55O1xyXG4gIHByaXZhdGUgX2dyb3VwSXRlbU1ldGFkYXRhUHJvdmlkZXI6IGFueTtcclxuICBwcml2YXRlIF9ncmlkOiBhbnk7XHJcbiAgcHJpdmF0ZSBfZ3JpZE9wdGlvbnM6IEdyaWRPcHRpb247XHJcbiAgcHJpdmF0ZSBfdmlzaWJsZUNvbHVtbnM6IENvbHVtbltdO1xyXG5cclxuICAvLyAtLVxyXG4gIC8vIHB1YmxpY1xyXG5cclxuICAvKiogR2V0dGVyIGZvciBBbGwgQ29sdW1ucyAgaW4gdGhlIGdyaWQgKGhpZGRlbi92aXNpYmxlKSAqL1xyXG4gIGdldCBhbGxDb2x1bW5zKCk6IENvbHVtbltdIHtcclxuICAgIHJldHVybiB0aGlzLl9hbGxDb2x1bW5zO1xyXG4gIH1cclxuICAvKiogU2V0dGVyIGZvciBBbGwgQ29sdW1ucyAgaW4gdGhlIGdyaWQgKGhpZGRlbi92aXNpYmxlKSAqL1xyXG4gIHNldCBhbGxDb2x1bW5zKGFsbENvbHVtbnM6IENvbHVtbltdKSB7XHJcbiAgICB0aGlzLl9hbGxDb2x1bW5zID0gYWxsQ29sdW1ucztcclxuICB9XHJcblxyXG4gIC8qKiBHZXR0ZXIgZm9yIHRoZSBDb2x1bW4gRGVmaW5pdGlvbnMgcHVsbGVkIHRocm91Z2ggdGhlIEdyaWQgT2JqZWN0ICovXHJcbiAgZ2V0IGNvbHVtbkRlZmluaXRpb25zKCk6IENvbHVtbltdIHtcclxuICAgIHJldHVybiAodGhpcy5fZ3JpZCAmJiB0aGlzLl9ncmlkLmdldENvbHVtbnMpID8gdGhpcy5fZ3JpZC5nZXRDb2x1bW5zKCkgOiBbXTtcclxuICB9XHJcblxyXG4gIC8qKiBHZXR0ZXIgZm9yIFNsaWNrR3JpZCBEYXRhVmlldyBvYmplY3QgKi9cclxuICBnZXQgZGF0YVZpZXcoKTogYW55IHtcclxuICAgIHJldHVybiB0aGlzLl9kYXRhVmlldztcclxuICB9XHJcbiAgLyoqIFNldHRlciBmb3IgU2xpY2tHcmlkIERhdGFWaWV3IG9iamVjdCAqL1xyXG4gIHNldCBkYXRhVmlldyhkYXRhVmlldzogYW55KSB7XHJcbiAgICB0aGlzLl9kYXRhVmlldyA9IGRhdGFWaWV3O1xyXG4gIH1cclxuXHJcbiAgLyoqIEdldHRlciBmb3IgU2xpY2tHcmlkIEdyaWQgb2JqZWN0ICovXHJcbiAgZ2V0IGdyaWQoKTogYW55IHtcclxuICAgIHJldHVybiB0aGlzLl9ncmlkO1xyXG4gIH1cclxuICAvKiogU2V0dGVyIGZvciBTbGlja0dyaWQgR3JpZCBvYmplY3QgKi9cclxuICBzZXQgZ3JpZChncmlkOiBhbnkpIHtcclxuICAgIHRoaXMuX2dyaWQgPSBncmlkO1xyXG4gIH1cclxuXHJcbiAgLyoqIEdldHRlciBmb3IgdGhlIEdyaWQgT3B0aW9ucyBwdWxsZWQgdGhyb3VnaCB0aGUgR3JpZCBPYmplY3QgKi9cclxuICBnZXQgZ3JpZE9wdGlvbnMoKTogR3JpZE9wdGlvbiB7XHJcbiAgICByZXR1cm4gdGhpcy5fZ3JpZE9wdGlvbnMgfHwgdGhpcy5fZ3JpZCAmJiB0aGlzLl9ncmlkLmdldE9wdGlvbnMgJiYgdGhpcy5fZ3JpZC5nZXRPcHRpb25zKCkgfHwge307XHJcbiAgfVxyXG5cclxuICAvKiogU2V0dGVyIGZvciB0aGUgR3JpZCBPcHRpb25zIHB1bGxlZCB0aHJvdWdoIHRoZSBHcmlkIE9iamVjdCAqL1xyXG4gIHNldCBncmlkT3B0aW9ucyhncmlkT3B0aW9uczogR3JpZE9wdGlvbikge1xyXG4gICAgdGhpcy5fZ3JpZE9wdGlvbnMgPSBncmlkT3B0aW9ucztcclxuICB9XHJcblxyXG4gIC8qKiBHZXR0ZXIgZm9yIHRoZSBHcmlkIE9wdGlvbnMgKi9cclxuICBnZXQgZ3JvdXBJdGVtTWV0YWRhdGFQcm92aWRlcigpOiBhbnkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2dyb3VwSXRlbU1ldGFkYXRhUHJvdmlkZXI7XHJcbiAgfVxyXG4gIC8qKiBTZXR0ZXIgZm9yIHRoZSBHcmlkIE9wdGlvbnMgKi9cclxuICBzZXQgZ3JvdXBJdGVtTWV0YWRhdGFQcm92aWRlcihncm91cEl0ZW1NZXRhZGF0YVByb3ZpZGVyOiBhbnkpIHtcclxuICAgIHRoaXMuX2dyb3VwSXRlbU1ldGFkYXRhUHJvdmlkZXIgPSBncm91cEl0ZW1NZXRhZGF0YVByb3ZpZGVyO1xyXG4gIH1cclxuXHJcbiAgLyoqIEdldHRlciBmb3IgdGhlIFZpc2libGUgQ29sdW1ucyBpbiB0aGUgZ3JpZCAqL1xyXG4gIGdldCB2aXNpYmxlQ29sdW1ucygpOiBDb2x1bW5bXSB7XHJcbiAgICByZXR1cm4gdGhpcy5fdmlzaWJsZUNvbHVtbnM7XHJcbiAgfVxyXG4gIC8qKiBTZXR0ZXIgZm9yIHRoZSBWaXNpYmxlIENvbHVtbnMgaW4gdGhlIGdyaWQgKi9cclxuICBzZXQgdmlzaWJsZUNvbHVtbnModmlzaWJsZUNvbHVtbnM6IENvbHVtbltdKSB7XHJcbiAgICB0aGlzLl92aXNpYmxlQ29sdW1ucyA9IHZpc2libGVDb2x1bW5zO1xyXG4gIH1cclxufVxyXG4iXX0=