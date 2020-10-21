/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Input, ContentChild } from '@angular/core';
export class DataTableColumn {
    constructor() {
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
    getCellColor(row, index) {
        if (this.cellColors !== undefined) {
            return ((/** @type {?} */ (this.cellColors)))(row.item, row, this, index);
        }
    }
    // for [ngClass]
    /**
     * @return {?}
     */
    ngOnInit() {
        this._initCellClass();
    }
    /**
     * @private
     * @return {?}
     */
    _initCellClass() {
        if (!this.styleClass && this.property) {
            if (/^[a-zA-Z0-9_]+$/.test(this.property)) {
                this.styleClass = 'column-' + this.property;
            }
            else {
                this.styleClass = 'column-' + this.property.replace(/[^a-zA-Z0-9_]/g, '');
            }
        }
        if (this.styleClass != null) {
            this.styleClassObject = {
                [this.styleClass]: true
            };
        }
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtdWkvIiwic291cmNlcyI6WyJzcmMvZ3JpZC9jb21wb25lbnRzL2NvbHVtbi9jb2x1bW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFPdkUsTUFBTSxPQUFPLGVBQWU7SUFINUI7UUFPYSxhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFPbEIsWUFBTyxHQUFHLElBQUksQ0FBQztRQVdoQixxQkFBZ0IsR0FBRyxFQUFFLENBQUMsQ0FBQyxnQkFBZ0I7SUFxQm5ELENBQUM7Ozs7OztJQTNCRyxZQUFZLENBQUMsR0FBaUIsRUFBRSxLQUFhO1FBQ3pDLElBQUksSUFBSSxDQUFDLFVBQVUsS0FBSyxTQUFTLEVBQUU7WUFDL0IsT0FBTyxDQUFDLG1CQUFjLElBQUksQ0FBQyxVQUFVLEVBQUEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztTQUN0RTtJQUNMLENBQUM7Ozs7O0lBSUQsUUFBUTtRQUNKLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUMxQixDQUFDOzs7OztJQUVPLGNBQWM7UUFDbEIsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNuQyxJQUFJLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQ3ZDLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7YUFDL0M7aUJBQU07Z0JBQ0gsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsRUFBRSxDQUFDLENBQUM7YUFDN0U7U0FDSjtRQUVELElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLEVBQUU7WUFDekIsSUFBSSxDQUFDLGdCQUFnQixHQUFHO2dCQUNwQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxJQUFJO2FBQzFCLENBQUM7U0FDTDtJQUNMLENBQUM7OztZQTlDSixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjthQUM5Qjs7O3FCQUlJLEtBQUs7dUJBQ0wsS0FBSzt3QkFDTCxLQUFLO3VCQUNMLEtBQUs7eUJBQ0wsS0FBSzt5QkFDTCxLQUFLO29CQUdMLEtBQUs7c0JBQ0wsS0FBSzsyQkFFTCxZQUFZLFNBQUMsZUFBZTs2QkFDNUIsWUFBWSxTQUFDLGlCQUFpQjs7OztJQVovQixpQ0FBd0I7O0lBQ3hCLG1DQUEwQjs7SUFDMUIsb0NBQTJCOztJQUMzQixtQ0FBMEI7O0lBQzFCLHFDQUE0Qjs7SUFDNUIscUNBQWtDOztJQUdsQyxnQ0FBZ0M7O0lBQ2hDLGtDQUF3Qjs7SUFFeEIsdUNBQTRDOztJQUM1Qyx5Q0FBZ0Q7Ozs7O0lBUWhELDJDQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIENvbnRlbnRDaGlsZCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEYXRhVGFibGVSb3cgfSBmcm9tICcuLi9yb3cvcm93LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDZWxsQ2FsbGJhY2sgfSBmcm9tICcuLi8uLi90eXBlcy9jZWxsLWNhbGxiYWNrLnR5cGUnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdkYXRhLXRhYmxlLWNvbHVtbidcbn0pXG5leHBvcnQgY2xhc3MgRGF0YVRhYmxlQ29sdW1uIGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIC8vIGluaXQ6XG4gICAgQElucHV0KCkgaGVhZGVyOiBzdHJpbmc7XG4gICAgQElucHV0KCkgc29ydGFibGUgPSBmYWxzZTtcbiAgICBASW5wdXQoKSByZXNpemFibGUgPSBmYWxzZTtcbiAgICBASW5wdXQoKSBwcm9wZXJ0eTogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZztcbiAgICBASW5wdXQoKSBjZWxsQ29sb3JzOiBDZWxsQ2FsbGJhY2s7XG5cbiAgICAvLyBpbml0IGFuZCBzdGF0ZTpcbiAgICBASW5wdXQoKSB3aWR0aDogbnVtYmVyIHwgc3RyaW5nO1xuICAgIEBJbnB1dCgpIHZpc2libGUgPSB0cnVlO1xuXG4gICAgQENvbnRlbnRDaGlsZCgnZGF0YVRhYmxlQ2VsbCcpIGNlbGxUZW1wbGF0ZTtcbiAgICBAQ29udGVudENoaWxkKCdkYXRhVGFibGVIZWFkZXInKSBoZWFkZXJUZW1wbGF0ZTtcblxuICAgIGdldENlbGxDb2xvcihyb3c6IERhdGFUYWJsZVJvdywgaW5kZXg6IG51bWJlcikge1xuICAgICAgICBpZiAodGhpcy5jZWxsQ29sb3JzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiAoPENlbGxDYWxsYmFjaz50aGlzLmNlbGxDb2xvcnMpKHJvdy5pdGVtLCByb3csIHRoaXMsIGluZGV4KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgc3R5bGVDbGFzc09iamVjdCA9IHt9OyAvLyBmb3IgW25nQ2xhc3NdXG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5faW5pdENlbGxDbGFzcygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2luaXRDZWxsQ2xhc3MoKSB7XG4gICAgICAgIGlmICghdGhpcy5zdHlsZUNsYXNzICYmIHRoaXMucHJvcGVydHkpIHtcbiAgICAgICAgICAgIGlmICgvXlthLXpBLVowLTlfXSskLy50ZXN0KHRoaXMucHJvcGVydHkpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdHlsZUNsYXNzID0gJ2NvbHVtbi0nICsgdGhpcy5wcm9wZXJ0eTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdHlsZUNsYXNzID0gJ2NvbHVtbi0nICsgdGhpcy5wcm9wZXJ0eS5yZXBsYWNlKC9bXmEtekEtWjAtOV9dL2csICcnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnN0eWxlQ2xhc3MgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5zdHlsZUNsYXNzT2JqZWN0ID0ge1xuICAgICAgICAgICAgICAgIFt0aGlzLnN0eWxlQ2xhc3NdOiB0cnVlXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxufVxuIl19