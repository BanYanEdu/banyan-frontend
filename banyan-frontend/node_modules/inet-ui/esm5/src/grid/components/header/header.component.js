/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Inject, forwardRef } from '@angular/core';
import { DataTable } from '../table/table.component';
var DataTableHeader = /** @class */ (function () {
    function DataTableHeader(dataTable) {
        this.dataTable = dataTable;
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
    DataTableHeader.ctorParameters = function () { return [
        { type: DataTable, decorators: [{ type: Inject, args: [forwardRef((/**
                         * @return {?}
                         */
                        function () { return DataTable; })),] }] }
    ]; };
    return DataTableHeader;
}());
export { DataTableHeader };
if (false) {
    /** @type {?} */
    DataTableHeader.prototype.dataTable;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtdWkvIiwic291cmNlcyI6WyJzcmMvZ3JpZC9jb21wb25lbnRzL2hlYWRlci9oZWFkZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDNUQsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBRW5EO0lBUUkseUJBQXdELFNBQW9CO1FBQXBCLGNBQVMsR0FBVCxTQUFTLENBQVc7SUFDNUUsQ0FBQzs7Z0JBVEosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxhQUFhO29CQUN2QixRQUFRLEVBQUUsbUJBQW1CO29CQUM3Qiw0SEFBc0M7O2lCQUV6Qzs7OztnQkFQTyxTQUFTLHVCQVVBLE1BQU0sU0FBQyxVQUFVOzs7d0JBQUMsY0FBTSxPQUFBLFNBQVMsRUFBVCxDQUFTLEVBQUM7O0lBRW5ELHNCQUFDO0NBQUEsQUFWRCxJQVVDO1NBSlksZUFBZTs7O0lBRVosb0NBQWdFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEluamVjdCwgZm9yd2FyZFJlZn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0RhdGFUYWJsZX0gZnJvbSAnLi4vdGFibGUvdGFibGUuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gICAgbW9kdWxlSWQ6ICdncmlkLW1vZHVsZScsXG4gICAgc2VsZWN0b3I6ICdkYXRhLXRhYmxlLWhlYWRlcicsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2hlYWRlci5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vaGVhZGVyLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBEYXRhVGFibGVIZWFkZXIge1xuXG4gICAgY29uc3RydWN0b3IoQEluamVjdChmb3J3YXJkUmVmKCgpID0+IERhdGFUYWJsZSkpIHB1YmxpYyBkYXRhVGFibGU6IERhdGFUYWJsZSkge1xuICAgIH1cbn1cbiJdfQ==