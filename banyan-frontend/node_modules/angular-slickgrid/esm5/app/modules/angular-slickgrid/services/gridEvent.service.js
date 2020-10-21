var GridEventService = /** @class */ (function () {
    function GridEventService() {
        this._eventHandler = new Slick.EventHandler();
    }
    /* OnCellChange Event */
    GridEventService.prototype.attachOnCellChange = function (grid, dataView) {
        // subscribe to this Slickgrid event of onCellChange
        this._eventHandler.subscribe(grid.onCellChange, function (e, args) {
            if (!e || !args || !grid || args.cell === undefined || !grid.getColumns || !grid.getDataItem) {
                return;
            }
            var column = grid.getColumns()[args.cell];
            // if the column definition has a onCellChange property (a callback function), then run it
            if (typeof column.onCellChange === 'function') {
                // add to the output gridOptions & dataView since we'll need them inside the AJAX column.onCellChange
                var returnedArgs = {
                    row: args.row,
                    cell: args.cell,
                    dataView: dataView,
                    grid: grid,
                    columnDef: column,
                    dataContext: grid.getDataItem(args.row)
                };
                // finally call up the Slick.column.onCellChanges.... function
                column.onCellChange(e, returnedArgs);
            }
        });
    };
    /* OnClick Event */
    GridEventService.prototype.attachOnClick = function (grid, dataView) {
        this._eventHandler.subscribe(grid.onClick, function (e, args) {
            if (!e || !args || !grid || args.cell === undefined || !grid.getColumns || !grid.getDataItem) {
                return;
            }
            var column = grid.getColumns()[args.cell];
            var gridOptions = grid.getOptions();
            // only when using autoCommitEdit, we will make the cell active (in focus) when clicked
            // setting the cell as active as a side effect and if autoCommitEdit is set to false then the Editors won't save correctly
            if (gridOptions && gridOptions.enableCellNavigation && !gridOptions.editable || (gridOptions.editable && gridOptions.autoCommitEdit)) {
                grid.setActiveCell(args.row, args.cell);
            }
            // if the column definition has a onCellClick property (a callback function), then run it
            if (typeof column.onCellClick === 'function') {
                // add to the output gridOptions & dataView since we'll need them inside the AJAX column.onClick
                var returnedArgs = {
                    row: args.row,
                    cell: args.cell,
                    dataView: dataView,
                    grid: grid,
                    columnDef: column,
                    dataContext: grid.getDataItem(args.row)
                };
                // finally call up the Slick.column.onCellClick.... function
                column.onCellClick(e, returnedArgs);
            }
        });
    };
    GridEventService.prototype.dispose = function () {
        this._eventHandler.unsubscribeAll();
    };
    return GridEventService;
}());
export { GridEventService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZEV2ZW50LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL3NlcnZpY2VzL2dyaWRFdmVudC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUtBO0lBQUE7UUFDVSxrQkFBYSxHQUFRLElBQUksS0FBSyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBZ0V4RCxDQUFDO0lBOURDLHdCQUF3QjtJQUN4Qiw2Q0FBa0IsR0FBbEIsVUFBbUIsSUFBUyxFQUFFLFFBQWE7UUFDekMsb0RBQW9EO1FBQ3BELElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsVUFBQyxDQUFRLEVBQUUsSUFBYztZQUN2RSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssU0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7Z0JBQzVGLE9BQU87YUFDUjtZQUNELElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFNUMsMEZBQTBGO1lBQzFGLElBQUksT0FBTyxNQUFNLENBQUMsWUFBWSxLQUFLLFVBQVUsRUFBRTtnQkFDN0MscUdBQXFHO2dCQUNyRyxJQUFNLFlBQVksR0FBZ0I7b0JBQ2hDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRztvQkFDYixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7b0JBQ2YsUUFBUSxVQUFBO29CQUNSLElBQUksTUFBQTtvQkFDSixTQUFTLEVBQUUsTUFBTTtvQkFDakIsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztpQkFDeEMsQ0FBQztnQkFFRiw4REFBOEQ7Z0JBQzlELE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLFlBQVksQ0FBQyxDQUFDO2FBQ3RDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0QsbUJBQW1CO0lBQ25CLHdDQUFhLEdBQWIsVUFBYyxJQUFTLEVBQUUsUUFBYTtRQUNwQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFVBQUMsQ0FBUSxFQUFFLElBQWM7WUFDbEUsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLFNBQVMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO2dCQUM1RixPQUFPO2FBQ1I7WUFDRCxJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzVDLElBQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUV0Qyx1RkFBdUY7WUFDdkYsMEhBQTBIO1lBQzFILElBQUksV0FBVyxJQUFJLFdBQVcsQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxJQUFJLFdBQVcsQ0FBQyxjQUFjLENBQUMsRUFBRTtnQkFDcEksSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUN6QztZQUVELHlGQUF5RjtZQUN6RixJQUFJLE9BQU8sTUFBTSxDQUFDLFdBQVcsS0FBSyxVQUFVLEVBQUU7Z0JBQzVDLGdHQUFnRztnQkFDaEcsSUFBTSxZQUFZLEdBQWdCO29CQUNoQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUc7b0JBQ2IsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO29CQUNmLFFBQVEsVUFBQTtvQkFDUixJQUFJLE1BQUE7b0JBQ0osU0FBUyxFQUFFLE1BQU07b0JBQ2pCLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7aUJBQ3hDLENBQUM7Z0JBRUYsNERBQTREO2dCQUM1RCxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRSxZQUFZLENBQUMsQ0FBQzthQUNyQztRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELGtDQUFPLEdBQVA7UUFDRSxJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ3RDLENBQUM7SUFDSCx1QkFBQztBQUFELENBQUMsQUFqRUQsSUFpRUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPbkV2ZW50QXJncywgQ2VsbEFyZ3MsIEdyaWRPcHRpb24gfSBmcm9tICcuLy4uL21vZGVscy9pbmRleCc7XHJcblxyXG4vLyB1c2luZyBleHRlcm5hbCBub24tdHlwZWQganMgbGlicmFyaWVzXHJcbmRlY2xhcmUgdmFyIFNsaWNrOiBhbnk7XHJcblxyXG5leHBvcnQgY2xhc3MgR3JpZEV2ZW50U2VydmljZSB7XHJcbiAgcHJpdmF0ZSBfZXZlbnRIYW5kbGVyOiBhbnkgPSBuZXcgU2xpY2suRXZlbnRIYW5kbGVyKCk7XHJcblxyXG4gIC8qIE9uQ2VsbENoYW5nZSBFdmVudCAqL1xyXG4gIGF0dGFjaE9uQ2VsbENoYW5nZShncmlkOiBhbnksIGRhdGFWaWV3OiBhbnkpIHtcclxuICAgIC8vIHN1YnNjcmliZSB0byB0aGlzIFNsaWNrZ3JpZCBldmVudCBvZiBvbkNlbGxDaGFuZ2VcclxuICAgIHRoaXMuX2V2ZW50SGFuZGxlci5zdWJzY3JpYmUoZ3JpZC5vbkNlbGxDaGFuZ2UsIChlOiBFdmVudCwgYXJnczogQ2VsbEFyZ3MpID0+IHtcclxuICAgICAgaWYgKCFlIHx8ICFhcmdzIHx8ICFncmlkIHx8IGFyZ3MuY2VsbCA9PT0gdW5kZWZpbmVkIHx8ICFncmlkLmdldENvbHVtbnMgfHwgIWdyaWQuZ2V0RGF0YUl0ZW0pIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgY29sdW1uID0gZ3JpZC5nZXRDb2x1bW5zKClbYXJncy5jZWxsXTtcclxuXHJcbiAgICAgIC8vIGlmIHRoZSBjb2x1bW4gZGVmaW5pdGlvbiBoYXMgYSBvbkNlbGxDaGFuZ2UgcHJvcGVydHkgKGEgY2FsbGJhY2sgZnVuY3Rpb24pLCB0aGVuIHJ1biBpdFxyXG4gICAgICBpZiAodHlwZW9mIGNvbHVtbi5vbkNlbGxDaGFuZ2UgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAvLyBhZGQgdG8gdGhlIG91dHB1dCBncmlkT3B0aW9ucyAmIGRhdGFWaWV3IHNpbmNlIHdlJ2xsIG5lZWQgdGhlbSBpbnNpZGUgdGhlIEFKQVggY29sdW1uLm9uQ2VsbENoYW5nZVxyXG4gICAgICAgIGNvbnN0IHJldHVybmVkQXJnczogT25FdmVudEFyZ3MgPSB7XHJcbiAgICAgICAgICByb3c6IGFyZ3Mucm93LFxyXG4gICAgICAgICAgY2VsbDogYXJncy5jZWxsLFxyXG4gICAgICAgICAgZGF0YVZpZXcsXHJcbiAgICAgICAgICBncmlkLFxyXG4gICAgICAgICAgY29sdW1uRGVmOiBjb2x1bW4sXHJcbiAgICAgICAgICBkYXRhQ29udGV4dDogZ3JpZC5nZXREYXRhSXRlbShhcmdzLnJvdylcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyBmaW5hbGx5IGNhbGwgdXAgdGhlIFNsaWNrLmNvbHVtbi5vbkNlbGxDaGFuZ2VzLi4uLiBmdW5jdGlvblxyXG4gICAgICAgIGNvbHVtbi5vbkNlbGxDaGFuZ2UoZSwgcmV0dXJuZWRBcmdzKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG4gIC8qIE9uQ2xpY2sgRXZlbnQgKi9cclxuICBhdHRhY2hPbkNsaWNrKGdyaWQ6IGFueSwgZGF0YVZpZXc6IGFueSkge1xyXG4gICAgdGhpcy5fZXZlbnRIYW5kbGVyLnN1YnNjcmliZShncmlkLm9uQ2xpY2ssIChlOiBFdmVudCwgYXJnczogQ2VsbEFyZ3MpID0+IHtcclxuICAgICAgaWYgKCFlIHx8ICFhcmdzIHx8ICFncmlkIHx8IGFyZ3MuY2VsbCA9PT0gdW5kZWZpbmVkIHx8ICFncmlkLmdldENvbHVtbnMgfHwgIWdyaWQuZ2V0RGF0YUl0ZW0pIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgY29sdW1uID0gZ3JpZC5nZXRDb2x1bW5zKClbYXJncy5jZWxsXTtcclxuICAgICAgY29uc3QgZ3JpZE9wdGlvbnMgPSBncmlkLmdldE9wdGlvbnMoKTtcclxuXHJcbiAgICAgIC8vIG9ubHkgd2hlbiB1c2luZyBhdXRvQ29tbWl0RWRpdCwgd2Ugd2lsbCBtYWtlIHRoZSBjZWxsIGFjdGl2ZSAoaW4gZm9jdXMpIHdoZW4gY2xpY2tlZFxyXG4gICAgICAvLyBzZXR0aW5nIHRoZSBjZWxsIGFzIGFjdGl2ZSBhcyBhIHNpZGUgZWZmZWN0IGFuZCBpZiBhdXRvQ29tbWl0RWRpdCBpcyBzZXQgdG8gZmFsc2UgdGhlbiB0aGUgRWRpdG9ycyB3b24ndCBzYXZlIGNvcnJlY3RseVxyXG4gICAgICBpZiAoZ3JpZE9wdGlvbnMgJiYgZ3JpZE9wdGlvbnMuZW5hYmxlQ2VsbE5hdmlnYXRpb24gJiYgIWdyaWRPcHRpb25zLmVkaXRhYmxlIHx8IChncmlkT3B0aW9ucy5lZGl0YWJsZSAmJiBncmlkT3B0aW9ucy5hdXRvQ29tbWl0RWRpdCkpIHtcclxuICAgICAgICBncmlkLnNldEFjdGl2ZUNlbGwoYXJncy5yb3csIGFyZ3MuY2VsbCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIGlmIHRoZSBjb2x1bW4gZGVmaW5pdGlvbiBoYXMgYSBvbkNlbGxDbGljayBwcm9wZXJ0eSAoYSBjYWxsYmFjayBmdW5jdGlvbiksIHRoZW4gcnVuIGl0XHJcbiAgICAgIGlmICh0eXBlb2YgY29sdW1uLm9uQ2VsbENsaWNrID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgLy8gYWRkIHRvIHRoZSBvdXRwdXQgZ3JpZE9wdGlvbnMgJiBkYXRhVmlldyBzaW5jZSB3ZSdsbCBuZWVkIHRoZW0gaW5zaWRlIHRoZSBBSkFYIGNvbHVtbi5vbkNsaWNrXHJcbiAgICAgICAgY29uc3QgcmV0dXJuZWRBcmdzOiBPbkV2ZW50QXJncyA9IHtcclxuICAgICAgICAgIHJvdzogYXJncy5yb3csXHJcbiAgICAgICAgICBjZWxsOiBhcmdzLmNlbGwsXHJcbiAgICAgICAgICBkYXRhVmlldyxcclxuICAgICAgICAgIGdyaWQsXHJcbiAgICAgICAgICBjb2x1bW5EZWY6IGNvbHVtbixcclxuICAgICAgICAgIGRhdGFDb250ZXh0OiBncmlkLmdldERhdGFJdGVtKGFyZ3Mucm93KVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIGZpbmFsbHkgY2FsbCB1cCB0aGUgU2xpY2suY29sdW1uLm9uQ2VsbENsaWNrLi4uLiBmdW5jdGlvblxyXG4gICAgICAgIGNvbHVtbi5vbkNlbGxDbGljayhlLCByZXR1cm5lZEFyZ3MpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGRpc3Bvc2UoKSB7XHJcbiAgICB0aGlzLl9ldmVudEhhbmRsZXIudW5zdWJzY3JpYmVBbGwoKTtcclxuICB9XHJcbn1cclxuIl19