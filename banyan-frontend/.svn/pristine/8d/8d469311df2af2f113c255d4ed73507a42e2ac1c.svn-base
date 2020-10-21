/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Inject, forwardRef, Output, EventEmitter } from '@angular/core';
import { DataTable } from '../table/table.component';
export class DataTableRow {
    /**
     * @param {?} dataTable
     */
    constructor(dataTable) {
        this.dataTable = dataTable;
        this.selectedChange = new EventEmitter();
        this.expandedChange = new EventEmitter();
        this._this = this; // FIXME is there no template keyword for this in angular 2?
    }
    /**
     * @return {?}
     */
    get selected() {
        return this._selected;
    }
    /**
     * @param {?} selected
     * @return {?}
     */
    set selected(selected) {
        this._selected = selected;
        this.selectedChange.emit(selected);
    }
    // other:
    /**
     * @return {?}
     */
    get displayIndex() {
        if (this.dataTable.pagination) {
            return this.dataTable.displayParams.offset + this.index + 1;
        }
        else {
            return this.index + 1;
        }
    }
    /**
     * @return {?}
     */
    getTooltip() {
        if (this.dataTable.rowTooltip) {
            return this.dataTable.rowTooltip(this.item, this, this.index);
        }
        return '';
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.selected = false;
    }
    /**
     * @return {?}
     */
    expand() {
        this.expanded = !this.expanded;
        this.expandedChange.emit(this.expanded);
    }
    /**
     * @return {?}
     */
    collapse() {
        this.expanded = false;
        this.expandedChange.emit(this.expanded);
    }
}
DataTableRow.decorators = [
    { type: Component, args: [{
                moduleId: 'grid-module',
                selector: '[dataTableRow]',
                template: "<tr\tclass=\"data-table-row\"\n       [title]=\"getTooltip()\"\n       [style.background-color]=\"dataTable.getRowColor(item, index, _this)\"\n       [class.row-odd]=\"index % 2 === 0\"\n       [class.row-even]=\"index % 2 === 1\"\n       [class.selected]=\"selected\"\n       [class.clickable]=\"dataTable.selectOnRowClick\"\n       (dblclick)=\"dataTable.rowDoubleClicked(_this, $event)\"\n       (click)=\"dataTable.rowClicked(_this, $event)\"\n>\n    <td [hide]=\"!dataTable.expandColumnVisible\">\n        <div tabindex=\"0\" role=\"button\" (click)=\"this.expand(); $event.stopPropagation()\" class=\"row-expand-button\"\n             [attr.aria-expanded]=\"expanded\" [title]=\"dataTable.translations.expandRow\" [attr.aria-label]=\"dataTable.translations.expandRow\">\n            <span class=\"fa\" [ngClass]=\"{'fa-caret-right': !expanded, 'fa-caret-down': expanded}\" aria-hidden=\"true\"></span>\n        </div>\n    </td>\n    <td [hide]=\"!dataTable.indexColumnVisible\" class=\"index-column\" [textContent]=\"displayIndex\"></td>\n    <td [hide]=\"!dataTable.selectColumnVisible\" class=\"select-column\" (click)=\"$event.stopPropagation()\">\n        <input type=\"checkbox\" [(ngModel)]=\"selected\"/>\n        <label class=\"mb-0 lbl\"></label>\n    </td>\n    <td *ngFor=\"let column of dataTable.columns\" [hide]=\"!column.visible\" [ngClass]=\"column.styleClassObject\" class=\"data-column\"\n        [style.background-color]=\"column.getCellColor(_this, index)\">\n        <div *ngIf=\"!column.cellTemplate\" [textContent]=\"item[column.property]\"></div>\n        <div *ngIf=\"column.cellTemplate\" [ngTemplateOutlet]=\"column.cellTemplate\" [ngTemplateOutletContext]=\"{column: column, row: _this, item: item}\"></div>\n    </td>\n</tr>\n<tr *ngIf=\"dataTable.expandableRows\" [hide]=\"!expanded\" class=\"row-expansion\">\n    <td [attr.colspan]=\"dataTable.columnCount\">\n        <div [ngTemplateOutlet]=\"dataTable.expandTemplate\" [ngTemplateOutletContext]=\"{row: _this, item: item}\"></div>\n    </td>\n</tr>",
                styles: [".index-column,.select-column{text-align:center}.row-expand-button{cursor:pointer;text-align:center}.clickable{cursor:pointer}.data-table-row.selected{background:#ffc!important}"]
            }] }
];
/** @nocollapse */
DataTableRow.ctorParameters = () => [
    { type: DataTable, decorators: [{ type: Inject, args: [forwardRef((/**
                     * @return {?}
                     */
                    () => DataTable)),] }] }
];
DataTableRow.propDecorators = {
    item: [{ type: Input }],
    index: [{ type: Input }],
    selectedChange: [{ type: Output }],
    expandedChange: [{ type: Output }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtdWkvIiwic291cmNlcyI6WyJzcmMvZ3JpZC9jb21wb25lbnRzL3Jvdy9yb3cuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0gsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQzdELE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQVFyRCxNQUFNLE9BQU8sWUFBWTs7OztJQXdDckIsWUFBd0QsU0FBb0I7UUFBcEIsY0FBUyxHQUFULFNBQVMsQ0FBVztRQTdCbEUsbUJBQWMsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3BDLG1CQUFjLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQTRDdkMsVUFBSyxHQUFHLElBQUksQ0FBQyxDQUFDLDREQUE0RDtJQWhCRixDQUFDOzs7O0lBMUJoRixJQUFJLFFBQVE7UUFDUixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQzs7Ozs7SUFFRCxJQUFJLFFBQVEsQ0FBQyxRQUFRO1FBQ2pCLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1FBQzFCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7Ozs7O0lBSUQsSUFBSSxZQUFZO1FBQ1osSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRTtZQUMzQixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztTQUMvRDthQUFNO1lBQ0gsT0FBTyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztTQUN6QjtJQUNMLENBQUM7Ozs7SUFFRCxVQUFVO1FBQ04sSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRTtZQUMzQixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNqRTtRQUNELE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQzs7OztJQUlELFdBQVc7UUFDUCxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztJQUMxQixDQUFDOzs7O0lBRUQsTUFBTTtRQUNGLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQy9CLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM1QyxDQUFDOzs7O0lBRUQsUUFBUTtRQUNKLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM1QyxDQUFDOzs7WUE1REosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxhQUFhO2dCQUN2QixRQUFRLEVBQUUsZ0JBQWdCO2dCQUMxQixtZ0VBQW1DOzthQUV0Qzs7OztZQVBRLFNBQVMsdUJBZ0RELE1BQU0sU0FBQyxVQUFVOzs7b0JBQUMsR0FBRyxFQUFFLENBQUMsU0FBUyxFQUFDOzs7bUJBdEM5QyxLQUFLO29CQUNMLEtBQUs7NkJBUUwsTUFBTTs2QkFDTixNQUFNOzs7O0lBVlAsNEJBQW1COztJQUNuQiw2QkFBdUI7O0lBRXZCLGdDQUFrQjs7Ozs7SUFJbEIsaUNBQTJCOztJQUUzQixzQ0FBOEM7O0lBQzlDLHNDQUE4Qzs7SUE0QzlDLDZCQUFvQjs7SUFoQlIsaUNBQWdFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBDb21wb25lbnQsIElucHV0LCBJbmplY3QsIGZvcndhcmRSZWYsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBPbkRlc3Ryb3lcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEYXRhVGFibGUgfSBmcm9tICcuLi90YWJsZS90YWJsZS5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBtb2R1bGVJZDogJ2dyaWQtbW9kdWxlJyxcbiAgICBzZWxlY3RvcjogJ1tkYXRhVGFibGVSb3ddJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vcm93LmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9yb3cuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIERhdGFUYWJsZVJvdyBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG5cbiAgICBASW5wdXQoKSBpdGVtOiBhbnk7XG4gICAgQElucHV0KCkgaW5kZXg6IG51bWJlcjtcblxuICAgIGV4cGFuZGVkOiBib29sZWFuO1xuXG4gICAgLy8gcm93IHNlbGVjdGlvbjpcblxuICAgIHByaXZhdGUgX3NlbGVjdGVkOiBib29sZWFuO1xuXG4gICAgQE91dHB1dCgpIHNlbGVjdGVkQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBPdXRwdXQoKSBleHBhbmRlZENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIGdldCBzZWxlY3RlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkO1xuICAgIH1cblxuICAgIHNldCBzZWxlY3RlZChzZWxlY3RlZCkge1xuICAgICAgICB0aGlzLl9zZWxlY3RlZCA9IHNlbGVjdGVkO1xuICAgICAgICB0aGlzLnNlbGVjdGVkQ2hhbmdlLmVtaXQoc2VsZWN0ZWQpO1xuICAgIH1cblxuICAgIC8vIG90aGVyOlxuXG4gICAgZ2V0IGRpc3BsYXlJbmRleCgpIHtcbiAgICAgICAgaWYgKHRoaXMuZGF0YVRhYmxlLnBhZ2luYXRpb24pIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGFUYWJsZS5kaXNwbGF5UGFyYW1zLm9mZnNldCArIHRoaXMuaW5kZXggKyAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW5kZXggKyAxO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0VG9vbHRpcCgpIHtcbiAgICAgICAgaWYgKHRoaXMuZGF0YVRhYmxlLnJvd1Rvb2x0aXApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGFUYWJsZS5yb3dUb29sdGlwKHRoaXMuaXRlbSwgdGhpcywgdGhpcy5pbmRleCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBEYXRhVGFibGUpKSBwdWJsaWMgZGF0YVRhYmxlOiBEYXRhVGFibGUpIHt9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIGV4cGFuZCgpIHtcbiAgICAgICAgdGhpcy5leHBhbmRlZCA9ICF0aGlzLmV4cGFuZGVkO1xuICAgICAgICB0aGlzLmV4cGFuZGVkQ2hhbmdlLmVtaXQodGhpcy5leHBhbmRlZCk7XG4gICAgfVxuXG4gICAgY29sbGFwc2UoKSB7XG4gICAgICAgIHRoaXMuZXhwYW5kZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5leHBhbmRlZENoYW5nZS5lbWl0KHRoaXMuZXhwYW5kZWQpO1xuICAgIH1cblxuICAgIHB1YmxpYyBfdGhpcyA9IHRoaXM7IC8vIEZJWE1FIGlzIHRoZXJlIG5vIHRlbXBsYXRlIGtleXdvcmQgZm9yIHRoaXMgaW4gYW5ndWxhciAyP1xufVxuIl19