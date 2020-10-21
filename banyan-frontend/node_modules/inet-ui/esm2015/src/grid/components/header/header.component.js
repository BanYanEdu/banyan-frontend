/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Inject, forwardRef } from '@angular/core';
import { DataTable } from '../table/table.component';
export class DataTableHeader {
    /**
     * @param {?} dataTable
     */
    constructor(dataTable) {
        this.dataTable = dataTable;
    }
}
DataTableHeader.decorators = [
    { type: Component, args: [{
                moduleId: 'grid-module',
                selector: 'data-table-header',
                template: "<div class=\"data-table-header\">\n    <h4 class=\"title\" [textContent]=\"dataTable.headerTitle\"></h4>\n</div>",
                styles: [".data-table-header{min-height:25px;margin-bottom:10px}.title{display:inline-block;margin:5px 0 0 5px}"]
            }] }
];
/** @nocollapse */
DataTableHeader.ctorParameters = () => [
    { type: DataTable, decorators: [{ type: Inject, args: [forwardRef((/**
                     * @return {?}
                     */
                    () => DataTable)),] }] }
];
if (false) {
    /** @type {?} */
    DataTableHeader.prototype.dataTable;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtdWkvIiwic291cmNlcyI6WyJzcmMvZ3JpZC9jb21wb25lbnRzL2hlYWRlci9oZWFkZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDNUQsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBUW5ELE1BQU0sT0FBTyxlQUFlOzs7O0lBRXhCLFlBQXdELFNBQW9CO1FBQXBCLGNBQVMsR0FBVCxTQUFTLENBQVc7SUFDNUUsQ0FBQzs7O1lBVEosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxhQUFhO2dCQUN2QixRQUFRLEVBQUUsbUJBQW1CO2dCQUM3Qiw0SEFBc0M7O2FBRXpDOzs7O1lBUE8sU0FBUyx1QkFVQSxNQUFNLFNBQUMsVUFBVTs7O29CQUFDLEdBQUcsRUFBRSxDQUFDLFNBQVMsRUFBQzs7OztJQUFuQyxvQ0FBZ0UiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5qZWN0LCBmb3J3YXJkUmVmfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RGF0YVRhYmxlfSBmcm9tICcuLi90YWJsZS90YWJsZS5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBtb2R1bGVJZDogJ2dyaWQtbW9kdWxlJyxcbiAgICBzZWxlY3RvcjogJ2RhdGEtdGFibGUtaGVhZGVyJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vaGVhZGVyLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9oZWFkZXIuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIERhdGFUYWJsZUhlYWRlciB7XG5cbiAgICBjb25zdHJ1Y3RvcihASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gRGF0YVRhYmxlKSkgcHVibGljIGRhdGFUYWJsZTogRGF0YVRhYmxlKSB7XG4gICAgfVxufVxuIl19