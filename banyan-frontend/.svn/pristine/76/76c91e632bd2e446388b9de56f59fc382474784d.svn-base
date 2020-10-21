/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Inject, forwardRef, Output, EventEmitter } from '@angular/core';
import { DataTable } from '../table/table.component';
var DataTableRow = /** @class */ (function () {
    function DataTableRow(dataTable) {
        this.dataTable = dataTable;
        this.selectedChange = new EventEmitter();
        this.expandedChange = new EventEmitter();
        this._this = this; // FIXME is there no template keyword for this in angular 2?
    }
    Object.defineProperty(DataTableRow.prototype, "selected", {
        get: /**
         * @return {?}
         */
        function () {
            return this._selected;
        },
        set: /**
         * @param {?} selected
         * @return {?}
         */
        function (selected) {
            this._selected = selected;
            this.selectedChange.emit(selected);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableRow.prototype, "displayIndex", {
        // other:
        get: 
        // other:
        /**
         * @return {?}
         */
        function () {
            if (this.dataTable.pagination) {
                return this.dataTable.displayParams.offset + this.index + 1;
            }
            else {
                return this.index + 1;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DataTableRow.prototype.getTooltip = /**
     * @return {?}
     */
    function () {
        if (this.dataTable.rowTooltip) {
            return this.dataTable.rowTooltip(this.item, this, this.index);
        }
        return '';
    };
    /**
     * @return {?}
     */
    DataTableRow.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.selected = false;
    };
    /**
     * @return {?}
     */
    DataTableRow.prototype.expand = /**
     * @return {?}
     */
    function () {
        this.expanded = !this.expanded;
        this.expandedChange.emit(this.expanded);
    };
    /**
     * @return {?}
     */
    DataTableRow.prototype.collapse = /**
     * @return {?}
     */
    function () {
        this.expanded = false;
        this.expandedChange.emit(this.expanded);
    };
    DataTableRow.decorators = [
        { type: Component, args: [{
                    moduleId: 'grid-module',
                    selector: '[dataTableRow]',
                    template: "<tr\tclass=\"data-table-row\"\n       [title]=\"getTooltip()\"\n       [style.background-color]=\"dataTable.getRowColor(item, index, _this)\"\n       [class.row-odd]=\"index % 2 === 0\"\n       [class.row-even]=\"index % 2 === 1\"\n       [class.selected]=\"selected\"\n       [class.clickable]=\"dataTable.selectOnRowClick\"\n       (dblclick)=\"dataTable.rowDoubleClicked(_this, $event)\"\n       (click)=\"dataTable.rowClicked(_this, $event)\"\n>\n    <td [hide]=\"!dataTable.expandColumnVisible\">\n        <div tabindex=\"0\" role=\"button\" (click)=\"this.expand(); $event.stopPropagation()\" class=\"row-expand-button\"\n             [attr.aria-expanded]=\"expanded\" [title]=\"dataTable.translations.expandRow\" [attr.aria-label]=\"dataTable.translations.expandRow\">\n            <span class=\"fa\" [ngClass]=\"{'fa-caret-right': !expanded, 'fa-caret-down': expanded}\" aria-hidden=\"true\"></span>\n        </div>\n    </td>\n    <td [hide]=\"!dataTable.indexColumnVisible\" class=\"index-column\" [textContent]=\"displayIndex\"></td>\n    <td [hide]=\"!dataTable.selectColumnVisible\" class=\"select-column\" (click)=\"$event.stopPropagation()\">\n        <input type=\"checkbox\" [(ngModel)]=\"selected\"/>\n        <label class=\"mb-0 lbl\"></label>\n    </td>\n    <td *ngFor=\"let column of dataTable.columns\" [hide]=\"!column.visible\" [ngClass]=\"column.styleClassObject\" class=\"data-column\"\n        [style.background-color]=\"column.getCellColor(_this, index)\">\n        <div *ngIf=\"!column.cellTemplate\" [textContent]=\"item[column.property]\"></div>\n        <div *ngIf=\"column.cellTemplate\" [ngTemplateOutlet]=\"column.cellTemplate\" [ngTemplateOutletContext]=\"{column: column, row: _this, item: item}\"></div>\n    </td>\n</tr>\n<tr *ngIf=\"dataTable.expandableRows\" [hide]=\"!expanded\" class=\"row-expansion\">\n    <td [attr.colspan]=\"dataTable.columnCount\">\n        <div [ngTemplateOutlet]=\"dataTable.expandTemplate\" [ngTemplateOutletContext]=\"{row: _this, item: item}\"></div>\n    </td>\n</tr>",
                    styles: [".index-column,.select-column{text-align:center}.row-expand-button{cursor:pointer;text-align:center}.clickable{cursor:pointer}.data-table-row.selected{background:#ffc!important}"]
                }] }
    ];
    /** @nocollapse */
    DataTableRow.ctorParameters = function () { return [
        { type: DataTable, decorators: [{ type: Inject, args: [forwardRef((/**
                         * @return {?}
                         */
                        function () { return DataTable; })),] }] }
    ]; };
    DataTableRow.propDecorators = {
        item: [{ type: Input }],
        index: [{ type: Input }],
        selectedChange: [{ type: Output }],
        expandedChange: [{ type: Output }]
    };
    return DataTableRow;
}());
export { DataTableRow };
if (false) {
    /** @type {?} */
    DataTableRow.prototype.item;
    /** @type {?} */
    DataTableRow.prototype.index;
    /** @type {?} */
    DataTableRow.prototype.expanded;
    /**
     * @type {?}
     * @private
     */
    DataTableRow.prototype._selected;
    /** @type {?} */
    DataTableRow.prototype.selectedChange;
    /** @type {?} */
    DataTableRow.prototype.expandedChange;
    /** @type {?} */
    DataTableRow.prototype._this;
    /** @type {?} */
    DataTableRow.prototype.dataTable;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtdWkvIiwic291cmNlcyI6WyJzcmMvZ3JpZC9jb21wb25lbnRzL3Jvdy9yb3cuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0gsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQzdELE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUVyRDtJQThDSSxzQkFBd0QsU0FBb0I7UUFBcEIsY0FBUyxHQUFULFNBQVMsQ0FBVztRQTdCbEUsbUJBQWMsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3BDLG1CQUFjLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQTRDdkMsVUFBSyxHQUFHLElBQUksQ0FBQyxDQUFDLDREQUE0RDtJQWhCRixDQUFDO0lBMUJoRixzQkFBSSxrQ0FBUTs7OztRQUFaO1lBQ0ksT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQzFCLENBQUM7Ozs7O1FBRUQsVUFBYSxRQUFRO1lBQ2pCLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1lBQzFCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3ZDLENBQUM7OztPQUxBO0lBU0Qsc0JBQUksc0NBQVk7UUFGaEIsU0FBUzs7Ozs7O1FBRVQ7WUFDSSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFO2dCQUMzQixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQzthQUMvRDtpQkFBTTtnQkFDSCxPQUFPLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO2FBQ3pCO1FBQ0wsQ0FBQzs7O09BQUE7Ozs7SUFFRCxpQ0FBVTs7O0lBQVY7UUFDSSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFO1lBQzNCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2pFO1FBQ0QsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDOzs7O0lBSUQsa0NBQVc7OztJQUFYO1FBQ0ksSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7SUFDMUIsQ0FBQzs7OztJQUVELDZCQUFNOzs7SUFBTjtRQUNJLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQy9CLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM1QyxDQUFDOzs7O0lBRUQsK0JBQVE7OztJQUFSO1FBQ0ksSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDdEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzVDLENBQUM7O2dCQTVESixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLGFBQWE7b0JBQ3ZCLFFBQVEsRUFBRSxnQkFBZ0I7b0JBQzFCLG1nRUFBbUM7O2lCQUV0Qzs7OztnQkFQUSxTQUFTLHVCQWdERCxNQUFNLFNBQUMsVUFBVTs7O3dCQUFDLGNBQU0sT0FBQSxTQUFTLEVBQVQsQ0FBUyxFQUFDOzs7dUJBdEM5QyxLQUFLO3dCQUNMLEtBQUs7aUNBUUwsTUFBTTtpQ0FDTixNQUFNOztJQTZDWCxtQkFBQztDQUFBLEFBL0RELElBK0RDO1NBekRZLFlBQVk7OztJQUVyQiw0QkFBbUI7O0lBQ25CLDZCQUF1Qjs7SUFFdkIsZ0NBQWtCOzs7OztJQUlsQixpQ0FBMkI7O0lBRTNCLHNDQUE4Qzs7SUFDOUMsc0NBQThDOztJQTRDOUMsNkJBQW9COztJQWhCUixpQ0FBZ0UiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENvbXBvbmVudCwgSW5wdXQsIEluamVjdCwgZm9yd2FyZFJlZiwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIE9uRGVzdHJveVxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERhdGFUYWJsZSB9IGZyb20gJy4uL3RhYmxlL3RhYmxlLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICAgIG1vZHVsZUlkOiAnZ3JpZC1tb2R1bGUnLFxuICAgIHNlbGVjdG9yOiAnW2RhdGFUYWJsZVJvd10nLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9yb3cuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3Jvdy5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgRGF0YVRhYmxlUm93IGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICAgIEBJbnB1dCgpIGl0ZW06IGFueTtcbiAgICBASW5wdXQoKSBpbmRleDogbnVtYmVyO1xuXG4gICAgZXhwYW5kZWQ6IGJvb2xlYW47XG5cbiAgICAvLyByb3cgc2VsZWN0aW9uOlxuXG4gICAgcHJpdmF0ZSBfc2VsZWN0ZWQ6IGJvb2xlYW47XG5cbiAgICBAT3V0cHV0KCkgc2VsZWN0ZWRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQE91dHB1dCgpIGV4cGFuZGVkQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgZ2V0IHNlbGVjdGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWQ7XG4gICAgfVxuXG4gICAgc2V0IHNlbGVjdGVkKHNlbGVjdGVkKSB7XG4gICAgICAgIHRoaXMuX3NlbGVjdGVkID0gc2VsZWN0ZWQ7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRDaGFuZ2UuZW1pdChzZWxlY3RlZCk7XG4gICAgfVxuXG4gICAgLy8gb3RoZXI6XG5cbiAgICBnZXQgZGlzcGxheUluZGV4KCkge1xuICAgICAgICBpZiAodGhpcy5kYXRhVGFibGUucGFnaW5hdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0YVRhYmxlLmRpc3BsYXlQYXJhbXMub2Zmc2V0ICsgdGhpcy5pbmRleCArIDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pbmRleCArIDE7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRUb29sdGlwKCkge1xuICAgICAgICBpZiAodGhpcy5kYXRhVGFibGUucm93VG9vbHRpcCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0YVRhYmxlLnJvd1Rvb2x0aXAodGhpcy5pdGVtLCB0aGlzLCB0aGlzLmluZGV4KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoQEluamVjdChmb3J3YXJkUmVmKCgpID0+IERhdGFUYWJsZSkpIHB1YmxpYyBkYXRhVGFibGU6IERhdGFUYWJsZSkge31cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLnNlbGVjdGVkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgZXhwYW5kKCkge1xuICAgICAgICB0aGlzLmV4cGFuZGVkID0gIXRoaXMuZXhwYW5kZWQ7XG4gICAgICAgIHRoaXMuZXhwYW5kZWRDaGFuZ2UuZW1pdCh0aGlzLmV4cGFuZGVkKTtcbiAgICB9XG5cbiAgICBjb2xsYXBzZSgpIHtcbiAgICAgICAgdGhpcy5leHBhbmRlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmV4cGFuZGVkQ2hhbmdlLmVtaXQodGhpcy5leHBhbmRlZCk7XG4gICAgfVxuXG4gICAgcHVibGljIF90aGlzID0gdGhpczsgLy8gRklYTUUgaXMgdGhlcmUgbm8gdGVtcGxhdGUga2V5d29yZCBmb3IgdGhpcyBpbiBhbmd1bGFyIDI/XG59XG4iXX0=