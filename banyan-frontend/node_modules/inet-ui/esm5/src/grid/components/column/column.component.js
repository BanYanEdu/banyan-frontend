/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Input, ContentChild } from '@angular/core';
var DataTableColumn = /** @class */ (function () {
    function DataTableColumn() {
        this.sortable = false;
        this.resizable = false;
        this.visible = true;
        this.styleClassObject = {}; // for [ngClass]
    }
    /**
     * @param {?} row
     * @param {?} index
     * @return {?}
     */
    DataTableColumn.prototype.getCellColor = /**
     * @param {?} row
     * @param {?} index
     * @return {?}
     */
    function (row, index) {
        if (this.cellColors !== undefined) {
            return ((/** @type {?} */ (this.cellColors)))(row.item, row, this, index);
        }
    };
    // for [ngClass]
    /**
     * @return {?}
     */
    DataTableColumn.prototype.ngOnInit = 
    // for [ngClass]
    /**
     * @return {?}
     */
    function () {
        this._initCellClass();
    };
    /**
     * @private
     * @return {?}
     */
    DataTableColumn.prototype._initCellClass = /**
     * @private
     * @return {?}
     */
    function () {
        var _a;
        if (!this.styleClass && this.property) {
            if (/^[a-zA-Z0-9_]+$/.test(this.property)) {
                this.styleClass = 'column-' + this.property;
            }
            else {
                this.styleClass = 'column-' + this.property.replace(/[^a-zA-Z0-9_]/g, '');
            }
        }
        if (this.styleClass != null) {
            this.styleClassObject = (_a = {},
                _a[this.styleClass] = true,
                _a);
        }
    };
    DataTableColumn.decorators = [
        { type: Directive, args: [{
                    selector: 'data-table-column'
                },] }
    ];
    DataTableColumn.propDecorators = {
        header: [{ type: Input }],
        sortable: [{ type: Input }],
        resizable: [{ type: Input }],
        property: [{ type: Input }],
        styleClass: [{ type: Input }],
        cellColors: [{ type: Input }],
        width: [{ type: Input }],
        visible: [{ type: Input }],
        cellTemplate: [{ type: ContentChild, args: ['dataTableCell',] }],
        headerTemplate: [{ type: ContentChild, args: ['dataTableHeader',] }]
    };
    return DataTableColumn;
}());
export { DataTableColumn };
if (false) {
    /** @type {?} */
    DataTableColumn.prototype.header;
    /** @type {?} */
    DataTableColumn.prototype.sortable;
    /** @type {?} */
    DataTableColumn.prototype.resizable;
    /** @type {?} */
    DataTableColumn.prototype.property;
    /** @type {?} */
    DataTableColumn.prototype.styleClass;
    /** @type {?} */
    DataTableColumn.prototype.cellColors;
    /** @type {?} */
    DataTableColumn.prototype.width;
    /** @type {?} */
    DataTableColumn.prototype.visible;
    /** @type {?} */
    DataTableColumn.prototype.cellTemplate;
    /** @type {?} */
    DataTableColumn.prototype.headerTemplate;
    /**
     * @type {?}
     * @private
     */
    DataTableColumn.prototype.styleClassObject;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtdWkvIiwic291cmNlcyI6WyJzcmMvZ3JpZC9jb21wb25lbnRzL2NvbHVtbi9jb2x1bW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFJdkU7SUFBQTtRQU9hLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFDakIsY0FBUyxHQUFHLEtBQUssQ0FBQztRQU9sQixZQUFPLEdBQUcsSUFBSSxDQUFDO1FBV2hCLHFCQUFnQixHQUFHLEVBQUUsQ0FBQyxDQUFDLGdCQUFnQjtJQXFCbkQsQ0FBQzs7Ozs7O0lBM0JHLHNDQUFZOzs7OztJQUFaLFVBQWEsR0FBaUIsRUFBRSxLQUFhO1FBQ3pDLElBQUksSUFBSSxDQUFDLFVBQVUsS0FBSyxTQUFTLEVBQUU7WUFDL0IsT0FBTyxDQUFDLG1CQUFjLElBQUksQ0FBQyxVQUFVLEVBQUEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztTQUN0RTtJQUNMLENBQUM7Ozs7O0lBSUQsa0NBQVE7Ozs7O0lBQVI7UUFDSSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDMUIsQ0FBQzs7Ozs7SUFFTyx3Q0FBYzs7OztJQUF0Qjs7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ25DLElBQUksaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFDdkMsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQzthQUMvQztpQkFBTTtnQkFDSCxJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLENBQUMsQ0FBQzthQUM3RTtTQUNKO1FBRUQsSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksRUFBRTtZQUN6QixJQUFJLENBQUMsZ0JBQWdCO2dCQUNqQixHQUFDLElBQUksQ0FBQyxVQUFVLElBQUcsSUFBSTttQkFDMUIsQ0FBQztTQUNMO0lBQ0wsQ0FBQzs7Z0JBOUNKLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsbUJBQW1CO2lCQUM5Qjs7O3lCQUlJLEtBQUs7MkJBQ0wsS0FBSzs0QkFDTCxLQUFLOzJCQUNMLEtBQUs7NkJBQ0wsS0FBSzs2QkFDTCxLQUFLO3dCQUdMLEtBQUs7MEJBQ0wsS0FBSzsrQkFFTCxZQUFZLFNBQUMsZUFBZTtpQ0FDNUIsWUFBWSxTQUFDLGlCQUFpQjs7SUE2Qm5DLHNCQUFDO0NBQUEsQUEvQ0QsSUErQ0M7U0E1Q1ksZUFBZTs7O0lBR3hCLGlDQUF3Qjs7SUFDeEIsbUNBQTBCOztJQUMxQixvQ0FBMkI7O0lBQzNCLG1DQUEwQjs7SUFDMUIscUNBQTRCOztJQUM1QixxQ0FBa0M7O0lBR2xDLGdDQUFnQzs7SUFDaEMsa0NBQXdCOztJQUV4Qix1Q0FBNEM7O0lBQzVDLHlDQUFnRDs7Ozs7SUFRaEQsMkNBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgQ29udGVudENoaWxkLCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERhdGFUYWJsZVJvdyB9IGZyb20gJy4uL3Jvdy9yb3cuY29tcG9uZW50JztcbmltcG9ydCB7IENlbGxDYWxsYmFjayB9IGZyb20gJy4uLy4uL3R5cGVzL2NlbGwtY2FsbGJhY2sudHlwZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ2RhdGEtdGFibGUtY29sdW1uJ1xufSlcbmV4cG9ydCBjbGFzcyBEYXRhVGFibGVDb2x1bW4gaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgLy8gaW5pdDpcbiAgICBASW5wdXQoKSBoZWFkZXI6IHN0cmluZztcbiAgICBASW5wdXQoKSBzb3J0YWJsZSA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIHJlc2l6YWJsZSA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIHByb3BlcnR5OiBzdHJpbmc7XG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nO1xuICAgIEBJbnB1dCgpIGNlbGxDb2xvcnM6IENlbGxDYWxsYmFjaztcblxuICAgIC8vIGluaXQgYW5kIHN0YXRlOlxuICAgIEBJbnB1dCgpIHdpZHRoOiBudW1iZXIgfCBzdHJpbmc7XG4gICAgQElucHV0KCkgdmlzaWJsZSA9IHRydWU7XG5cbiAgICBAQ29udGVudENoaWxkKCdkYXRhVGFibGVDZWxsJykgY2VsbFRlbXBsYXRlO1xuICAgIEBDb250ZW50Q2hpbGQoJ2RhdGFUYWJsZUhlYWRlcicpIGhlYWRlclRlbXBsYXRlO1xuXG4gICAgZ2V0Q2VsbENvbG9yKHJvdzogRGF0YVRhYmxlUm93LCBpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIGlmICh0aGlzLmNlbGxDb2xvcnMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuICg8Q2VsbENhbGxiYWNrPnRoaXMuY2VsbENvbG9ycykocm93Lml0ZW0sIHJvdywgdGhpcywgaW5kZXgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdHlsZUNsYXNzT2JqZWN0ID0ge307IC8vIGZvciBbbmdDbGFzc11cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLl9pbml0Q2VsbENsYXNzKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaW5pdENlbGxDbGFzcygpIHtcbiAgICAgICAgaWYgKCF0aGlzLnN0eWxlQ2xhc3MgJiYgdGhpcy5wcm9wZXJ0eSkge1xuICAgICAgICAgICAgaWYgKC9eW2EtekEtWjAtOV9dKyQvLnRlc3QodGhpcy5wcm9wZXJ0eSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0eWxlQ2xhc3MgPSAnY29sdW1uLScgKyB0aGlzLnByb3BlcnR5O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0eWxlQ2xhc3MgPSAnY29sdW1uLScgKyB0aGlzLnByb3BlcnR5LnJlcGxhY2UoL1teYS16QS1aMC05X10vZywgJycpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuc3R5bGVDbGFzcyAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLnN0eWxlQ2xhc3NPYmplY3QgPSB7XG4gICAgICAgICAgICAgICAgW3RoaXMuc3R5bGVDbGFzc106IHRydWVcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=