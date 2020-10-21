/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Inject, forwardRef, Input, TemplateRef } from '@angular/core';
import { DataTable } from '../table/table.component';
var DataTablePagination = /** @class */ (function () {
    function DataTablePagination(dataTable) {
        this.dataTable = dataTable;
        this.show_range = false;
        this.show_limit = false;
        this.show_input = false;
        this.show_numbers = true;
        this.show_column_selector = false;
        this.autoHide = false;
        this.columnSelectorOpen = false;
    }
    /**
     * @return {?}
     */
    DataTablePagination.prototype._closeSelector = /**
     * @return {?}
     */
    function () {
        this.columnSelectorOpen = false;
    };
    /**
     * @return {?}
     */
    DataTablePagination.prototype.pageBack = /**
     * @return {?}
     */
    function () {
        this.dataTable.offset -= Math.min(this.dataTable.limit, this.dataTable.offset);
    };
    /**
     * @return {?}
     */
    DataTablePagination.prototype.pageForward = /**
     * @return {?}
     */
    function () {
        this.dataTable.offset += this.dataTable.limit;
    };
    /**
     * @return {?}
     */
    DataTablePagination.prototype.pageFirst = /**
     * @return {?}
     */
    function () {
        this.dataTable.offset = 0;
    };
    /**
     * @return {?}
     */
    DataTablePagination.prototype.pageLast = /**
     * @return {?}
     */
    function () {
        this.dataTable.offset = (this.maxPage - 1) * this.dataTable.limit;
    };
    Object.defineProperty(DataTablePagination.prototype, "maxPage", {
        get: /**
         * @return {?}
         */
        function () {
            return Math.ceil(this.dataTable.itemCount / this.dataTable.limit);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTablePagination.prototype, "limit", {
        get: /**
         * @return {?}
         */
        function () {
            return this.dataTable.limit;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.dataTable.limit = Number((/** @type {?} */ (value))); // TODO better way to handle that value of number <input> is string?
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTablePagination.prototype, "page", {
        get: /**
         * @return {?}
         */
        function () {
            return this.dataTable.page;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.dataTable.page = Number((/** @type {?} */ (value)));
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} number
     * @param {?} page
     * @return {?}
     */
    DataTablePagination.prototype.createPageRange = /**
     * @param {?} number
     * @param {?} page
     * @return {?}
     */
    function (number, page) {
        /** @type {?} */
        var displayedPage = 3;
        /** @type {?} */
        var items = [];
        if (number > 1) {
            /** @type {?} */
            var maxPage = number;
            /** @type {?} */
            var minPage = 1;
            if (page === 1 && maxPage >= displayedPage) {
                maxPage = 3;
            }
            else if (page > 1 && maxPage > page + 1) {
                minPage = page - 1;
                maxPage = page + 1;
            }
            else if (page > 2 && maxPage > page) {
                minPage = page - 1;
                maxPage = page + 1;
            }
            else if (page > 2 && maxPage === page) {
                minPage = page - 2;
                maxPage = page;
            }
            for (var i = minPage; i <= maxPage; i++) {
                items.push(i);
            }
        }
        return items;
    };
    /**
     * @param {?} value
     * @return {?}
     */
    DataTablePagination.prototype.onChange = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        value = Number((/** @type {?} */ (value)));
        /** @type {?} */
        var minPage = 1;
        /** @type {?} */
        var maxPage = this.maxPage;
        if (value < minPage) {
            value = minPage;
        }
        else if (value > maxPage) {
            value = maxPage;
        }
        this.page = value;
        return value;
    };
    DataTablePagination.decorators = [
        { type: Component, args: [{
                    moduleId: 'grid-module',
                    selector: 'data-table-pagination',
                    template: "<div class=\"pagination-box\">\n    <div class=\"pagination-range\"  *ngIf=\"!show_range\">\n        <ng-template [ngTemplateOutlet]=\"basicSearch\"></ng-template>\n    </div>\n    <div class=\"pagination-range input-group-sm\" *ngIf=\"show_range\">\n        <div class=\"input-group-prepend\">\n            <span class=\"input-group-text\">\n        {{dataTable.translations.paginationRange}}:\n        <span class=\"ml-1\" [textContent]=\"dataTable.itemCount>0 ? dataTable.offset + 1 : 0\"></span>\n        -\n        <span [textContent]=\"[dataTable.offset + dataTable.limit , dataTable.itemCount] | min\"></span>\n        /\n        <span [textContent]=\"dataTable.itemCount\"></span>\n        </span>\n        </div>\n    </div>\n\n    <div class=\"pagination-controllers\">\n        <div class=\"pagination-limit\" *ngIf=\"show_limit\">\n            <div class=\"input-group input-group-sm\">\n                <div class=\"input-group-prepend\">\n                    <span class=\"input-group-text\">{{dataTable.translations.paginationLimit}}:</span>\n                </div>\n                <input #limitInput type=\"number\" class=\"form-control\" min=\"1\" step=\"1\" [disabled]=\"maxPage === 0\"\n                       [ngModel]=\"limit\" (blur)=\"limit = limitInput.value\"\n                       (keyup.enter)=\"limit = limitInput.value\" (keyup.esc)=\"limitInput.value = limit\"/>\n            </div>\n        </div>\n        <div class=\"pagination-pages mr-1\" *ngIf=\"!autoHide || (autoHide && (maxPage > 0))\">\n            <button [disabled]=\"dataTable.offset <= 0\" (click)=\"pageFirst()\"\n                    class=\"btn btn-sm btn-default pagination-firstpage\"\n                    [title]=\"dataTable.translations.firstText\">\n                <i class=\"fa fa-step-backward\"></i>\n            </button>\n            <button [disabled]=\"dataTable.offset <= 0\" (click)=\"pageBack()\"\n                    class=\"btn btn-sm btn-default pagination-prevpage ml-1\"\n                    [title]=\"dataTable.translations.prevText\">\n                <i class=\"fa fa-chevron-left\"></i>\n            </button>\n            <div class=\"pagination-page ml-1\" *ngIf=\"show_input\">\n                <div class=\"input-group input-group-sm\">\n                    <input #pageInput type=\"number\" class=\"form-control\" min=\"1\" step=\"1\" max=\"{{maxPage}}\"\n                           [ngModel]=\"page\" (blur)=\"pageInput.value = onChange(pageInput.value)\"\n                           (keyup.enter)=\"pageInput.value = onChange(pageInput.value)\" [disabled]=\"maxPage === 0\"\n                           (keyup.esc)=\"pageInput.value = page\"/>\n                    <div class=\"input-group-append\">\n                        <span class=\"input-group-text\"><span>/</span><span\n                                [textContent]=\"dataTable.lastPage\"></span></span>\n                    </div>\n                </div>\n            </div>\n            <div class=\"pagination-page\" *ngIf=\"show_numbers\">\n                <button *ngFor=\"let i of createPageRange(maxPage,page)\"\n                        [disabled]=\"i == page\"\n                        (click)=\"page = i\"\n                        class=\"btn btn-sm btn-default ml-1\">{{ i }}\n                </button>\n            </div>\n            <button [disabled]=\"(dataTable.offset + dataTable.limit) >= dataTable.itemCount\" (click)=\"pageForward()\"\n                    class=\"btn btn-sm btn-default pagination-nextpage ml-1\" [title]=\"dataTable.translations.nextText\">\n                <i class=\"fa fa-chevron-right\"></i>\n            </button>\n            <button [disabled]=\"(dataTable.offset + dataTable.limit) >= dataTable.itemCount\" (click)=\"pageLast()\"\n                    class=\"btn btn-sm btn-default pagination-lastpage ml-1\" [title]=\"dataTable.translations.lastText\">\n                <i class=\"fa fa-step-forward\"></i>\n            </button>\n            <button type=\"button\" class=\"btn btn-sm btn-default pagination-reload ml-1\"\n                    (click)=\"dataTable.reloadItems()\"\n                    [attr.aria-label]=\"dataTable.translations.headerReload\"\n                    [title]=\"dataTable.translations.headerReload\">\n                <i class=\"fa fa-refresh\"></i>\n            </button>\n            <button *ngIf=\"show_column_selector\" type=\"button\" class=\"btn btn btn-sm btn-default column-selector-button ml-1\"\n                    [class.active]=\"columnSelectorOpen\"\n                    (click)=\"columnSelectorOpen = !columnSelectorOpen; $event.stopPropagation()\"\n                    [attr.aria-label]=\"dataTable.translations.headerColumnSelector\"\n                    [title]=\"dataTable.translations.headerColumnSelector\">\n                <i class=\"fa fa-list\"></i>\n            </button>\n            <div *ngIf=\"show_column_selector\" class=\"column-selector-wrapper\" (click)=\"$event.stopPropagation()\">\n                <div *ngIf=\"columnSelectorOpen\" class=\"column-selector-box panel panel-default\">\n                    <div *ngIf=\"dataTable.expandableRows\" class=\"column-selector-fixed-column checkbox\">\n                        <label>\n                            <input type=\"checkbox\" id=\"chk-expand-column-selector\" [(ngModel)]=\"dataTable.expandColumnVisible\"/>\n                            <label class=\"mb-0 lbl\" for=\"chk-expand-column-selector\"> {{dataTable.translations.expandColumn}}</label>\n                        </label>\n                    </div>\n                    <div *ngIf=\"dataTable.indexColumn\" class=\"column-selector-fixed-column checkbox\">\n                        <label>\n                            <input type=\"checkbox\" id=\"chk-index-column-selector\" [(ngModel)]=\"dataTable.indexColumnVisible\"/>\n                            <label class=\"mb-0 lbl\" for=\"chk-index-column-selector\"> {{dataTable.translations.indexColumn}}</label>\n                        </label>\n                    </div>\n                    <div *ngIf=\"dataTable.selectColumn\" class=\"column-selector-fixed-column checkbox\">\n                        <label>\n                            <input type=\"checkbox\" id=\"chk-select-column-selector\" [(ngModel)]=\"dataTable.selectColumnVisible\"/>\n                            <label class=\"mb-0 lbl\" for=\"chk-select-column-selector\"> {{dataTable.translations.selectColumn}}</label>\n                        </label>\n                    </div>\n                    <div *ngFor=\"let column of dataTable.columns;\" class=\"column-selector-column checkbox\">\n                        <label>\n                            <input type=\"checkbox\" [id]=\"'chk-'+ column.property + '-selector'\" [(ngModel)]=\"column.visible\"/>\n                            <label class=\"mb-0 lbl\" [for]=\"'chk-'+ column.property + '-selector'\">\n                                &nbsp;<span [textContent]=\"column.header || (column.property)\"></span>\n                            </label>\n                        </label>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <ng-template *ngIf=\"!show_range\" [ngTemplateOutlet]=\"advanceSearch\"></ng-template>\n</div>\n",
                    host: {
                        '(document:click)': '_closeSelector()'
                    },
                    styles: [".pagination-box{position:relative;display:block;min-height:38px;background-color:#e9ecef;border:1px solid #ced4da;padding:2px}.pagination-range{margin-left:3px;display:inline-block}.pagination-controllers{float:right}.pagination-controllers input{min-width:60px;text-align:right;max-width:80px}.pagination-limit{margin-right:10px;display:inline-table;width:180px;float:left}.pagination-pages{display:inline-block}.pagination-page{display:inline-table}.pagination-box button{outline:0!important}.column-selector-button,.pagination-firstpage,.pagination-lastpage,.pagination-nextpage,.pagination-prevpage,.pagination-reload{vertical-align:top}.column-selector-wrapper{position:relative}.column-selector-box{box-shadow:0 0 10px #d3d3d3;width:150px;padding:10px;position:absolute;right:0;top:1px;z-index:1060;background:#fff}.column-selector-box .checkbox{margin-bottom:4px}.column-selector-fixed-column{font-style:italic}"]
                }] }
    ];
    /** @nocollapse */
    DataTablePagination.ctorParameters = function () { return [
        { type: DataTable, decorators: [{ type: Inject, args: [forwardRef((/**
                         * @return {?}
                         */
                        function () { return DataTable; })),] }] }
    ]; };
    DataTablePagination.propDecorators = {
        show_range: [{ type: Input }],
        show_limit: [{ type: Input }],
        show_input: [{ type: Input }],
        show_numbers: [{ type: Input }],
        show_column_selector: [{ type: Input }],
        autoHide: [{ type: Input }],
        basicSearch: [{ type: Input }],
        advanceSearch: [{ type: Input }]
    };
    return DataTablePagination;
}());
export { DataTablePagination };
if (false) {
    /** @type {?} */
    DataTablePagination.prototype.show_range;
    /** @type {?} */
    DataTablePagination.prototype.show_limit;
    /** @type {?} */
    DataTablePagination.prototype.show_input;
    /** @type {?} */
    DataTablePagination.prototype.show_numbers;
    /** @type {?} */
    DataTablePagination.prototype.show_column_selector;
    /** @type {?} */
    DataTablePagination.prototype.autoHide;
    /** @type {?} */
    DataTablePagination.prototype.basicSearch;
    /** @type {?} */
    DataTablePagination.prototype.advanceSearch;
    /** @type {?} */
    DataTablePagination.prototype.columnSelectorOpen;
    /** @type {?} */
    DataTablePagination.prototype.dataTable;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnaW5hdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbmV0LXVpLyIsInNvdXJjZXMiOlsic3JjL2dyaWQvY29tcG9uZW50cy9wYWdpbmF0aW9uL3BhZ2luYXRpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0gsU0FBUyxFQUNULE1BQU0sRUFDTixVQUFVLEVBQ1YsS0FBSyxFQUlMLFdBQVcsRUFFZCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFFbkQ7SUEyQkksNkJBQXdELFNBQW9CO1FBQXBCLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFoQm5FLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFDbkIsZUFBVSxHQUFHLEtBQUssQ0FBQztRQUNuQixlQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ25CLGlCQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLHlCQUFvQixHQUFHLEtBQUssQ0FBQztRQUM3QixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBSzFCLHVCQUFrQixHQUFHLEtBQUssQ0FBQztJQU8zQixDQUFDOzs7O0lBTEQsNENBQWM7OztJQUFkO1FBQ0ksSUFBSSxDQUFDLGtCQUFrQixHQUFHLEtBQUssQ0FBQztJQUNwQyxDQUFDOzs7O0lBS0Qsc0NBQVE7OztJQUFSO1FBQ0ksSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ25GLENBQUM7Ozs7SUFFRCx5Q0FBVzs7O0lBQVg7UUFDSSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQztJQUNsRCxDQUFDOzs7O0lBRUQsdUNBQVM7OztJQUFUO1FBQ0ksSUFBSSxDQUFDLFNB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SyxDQUFDO0lBQ2pCLENBQUM7O2dCQXRHSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLGFBQWE7b0JBQ3ZCLFFBQVEsRUFBRSx1QkFBdUI7b0JBQ2pDLDZuT0FBMEM7b0JBRTFDLElBQUksRUFBRTt3QkFDRixrQkFBa0IsRUFBRSxrQkFBa0I7cUJBQ3pDOztpQkFDSjs7OztnQkFWTyxTQUFTLHVCQTZCQSxNQUFNLFNBQUMsVUFBVTs7O3dCQUFDLGNBQU0sT0FBQSxTQUFTLEVBQVQsQ0FBUyxFQUFDOzs7NkJBaEI5QyxLQUFLOzZCQUNMLEtBQUs7NkJBQ0wsS0FBSzsrQkFDTCxLQUFLO3VDQUNMLEtBQUs7MkJBQ0wsS0FBSzs4QkFFTCxLQUFLO2dDQUNMLEtBQUs7O0lBb0ZWLDBCQUFDO0NBQUEsQUF2R0QsSUF1R0M7U0E5RlksbUJBQW1COzs7SUFFNUIseUNBQTRCOztJQUM1Qix5Q0FBNEI7O0lBQzVCLHlDQUE0Qjs7SUFDNUIsMkNBQTZCOztJQUM3QixtREFBc0M7O0lBQ3RDLHVDQUEwQjs7SUFFMUIsMENBQThDOztJQUM5Qyw0Q0FBZ0Q7O0lBRWhELGlEQUEyQjs7SUFNZix3Q0FBZ0UiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENvbXBvbmVudCxcbiAgICBJbmplY3QsXG4gICAgZm9yd2FyZFJlZixcbiAgICBJbnB1dCxcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgT3V0cHV0LFxuICAgIENvbnRlbnRDaGlsZCxcbiAgICBUZW1wbGF0ZVJlZixcbiAgICBFbGVtZW50UmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtEYXRhVGFibGV9IGZyb20gJy4uL3RhYmxlL3RhYmxlLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICAgIG1vZHVsZUlkOiAnZ3JpZC1tb2R1bGUnLFxuICAgIHNlbGVjdG9yOiAnZGF0YS10YWJsZS1wYWdpbmF0aW9uJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vcGFnaW5hdGlvbi5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vcGFnaW5hdGlvbi5jb21wb25lbnQuY3NzJ10sXG4gICAgaG9zdDoge1xuICAgICAgICAnKGRvY3VtZW50OmNsaWNrKSc6ICdfY2xvc2VTZWxlY3RvcigpJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgRGF0YVRhYmxlUGFnaW5hdGlvbiB7XG5cbiAgICBASW5wdXQoKSBzaG93X3JhbmdlID0gZmFsc2U7XG4gICAgQElucHV0KCkgc2hvd19saW1pdCA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIHNob3dfaW5wdXQgPSBmYWxzZTtcbiAgICBASW5wdXQoKSBzaG93X251bWJlcnMgPSB0cnVlO1xuICAgIEBJbnB1dCgpIHNob3dfY29sdW1uX3NlbGVjdG9yID0gZmFsc2U7XG4gICAgQElucHV0KCkgYXV0b0hpZGUgPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpIGJhc2ljU2VhcmNoOiBUZW1wbGF0ZVJlZjxFbGVtZW50UmVmPjtcbiAgICBASW5wdXQoKSBhZHZhbmNlU2VhcmNoOiBUZW1wbGF0ZVJlZjxFbGVtZW50UmVmPjtcblxuICAgIGNvbHVtblNlbGVjdG9yT3BlbiA9IGZhbHNlO1xuXG4gICAgX2Nsb3NlU2VsZWN0b3IoKSB7XG4gICAgICAgIHRoaXMuY29sdW1uU2VsZWN0b3JPcGVuID0gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoQEluamVjdChmb3J3YXJkUmVmKCgpID0+IERhdGFUYWJsZSkpIHB1YmxpYyBkYXRhVGFibGU6IERhdGFUYWJsZSkge1xuICAgIH1cblxuICAgIHBhZ2VCYWNrKCkge1xuICAgICAgICB0aGlzLmRhdGFUYWJsZS5vZmZzZXQgLT0gTWF0aC5taW4odGhpcy5kYXRhVGFibGUubGltaXQsIHRoaXMuZGF0YVRhYmxlLm9mZnNldCk7XG4gICAgfVxuXG4gICAgcGFnZUZvcndhcmQoKSB7XG4gICAgICAgIHRoaXMuZGF0YVRhYmxlLm9mZnNldCArPSB0aGlzLmRhdGFUYWJsZS5saW1pdDtcbiAgICB9XG5cbiAgICBwYWdlRmlyc3QoKSB7XG4gICAgICAgIHRoaXMuZGF0YVRhYmxlLm9mZnNldCA9IDA7XG4gICAgfVxuXG4gICAgcGFnZUxhc3QoKSB7XG4gICAgICAgIHRoaXMuZGF0YVRhYmxlLm9mZnNldCA9ICh0aGlzLm1heFBhZ2UgLSAxKSAqIHRoaXMuZGF0YVRhYmxlLmxpbWl0O1xuICAgIH1cblxuICAgIGdldCBtYXhQYWdlKCkge1xuICAgICAgICByZXR1cm4gTWF0aC5jZWlsKHRoaXMuZGF0YVRhYmxlLml0ZW1Db3VudCAvIHRoaXMuZGF0YVRhYmxlLmxpbWl0KTtcbiAgICB9XG5cbiAgICBnZXQgbGltaXQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGFUYWJsZS5saW1pdDtcbiAgICB9XG5cbiAgICBzZXQgbGltaXQodmFsdWUpIHtcbiAgICAgICAgdGhpcy5kYXRhVGFibGUubGltaXQgPSBOdW1iZXIoPGFueT52YWx1ZSk7IC8vIFRPRE8gYmV0dGVyIHdheSB0byBoYW5kbGUgdGhhdCB2YWx1ZSBvZiBudW1iZXIgPGlucHV0PiBpcyBzdHJpbmc/XG4gICAgfVxuXG4gICAgZ2V0IHBhZ2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGFUYWJsZS5wYWdlO1xuICAgIH1cblxuICAgIHNldCBwYWdlKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuZGF0YVRhYmxlLnBhZ2UgPSBOdW1iZXIoPGFueT52YWx1ZSk7XG4gICAgfVxuXG4gICAgY3JlYXRlUGFnZVJhbmdlKG51bWJlciwgcGFnZSk6IGFueVtdIHtcbiAgICAgICAgY29uc3QgZGlzcGxheWVkUGFnZSA9IDM7XG4gICAgICAgIGxldCBpdGVtczogbnVtYmVyW10gPSBbXTtcbiAgICAgICAgaWYgKG51bWJlciA+IDEpIHtcbiAgICAgICAgICAgIGxldCBtYXhQYWdlID0gbnVtYmVyO1xuICAgICAgICAgICAgbGV0IG1pblBhZ2UgPSAxO1xuICAgICAgICAgICAgaWYgKHBhZ2UgPT09IDEgJiYgbWF4UGFnZSA+PSBkaXNwbGF5ZWRQYWdlKSB7XG4gICAgICAgICAgICAgICAgbWF4UGFnZSA9IDM7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHBhZ2UgPiAxICYmIG1heFBhZ2UgPiBwYWdlICsgMSkge1xuICAgICAgICAgICAgICAgIG1pblBhZ2UgPSBwYWdlIC0gMTtcbiAgICAgICAgICAgICAgICBtYXhQYWdlID0gcGFnZSArIDE7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHBhZ2UgPiAyICYmIG1heFBhZ2UgPiBwYWdlKSB7XG4gICAgICAgICAgICAgICAgbWluUGFnZSA9IHBhZ2UgLSAxO1xuICAgICAgICAgICAgICAgIG1heFBhZ2UgPSBwYWdlICsgMTtcbiAgICAgICAgICAgIH0gZWxzZSAgaWYgKHBhZ2UgPiAyICYmIG1heFBhZ2UgPT09IHBhZ2UpIHtcbiAgICAgICAgICAgICAgICBtaW5QYWdlID0gcGFnZSAtIDI7XG4gICAgICAgICAgICAgICAgbWF4UGFnZSA9IHBhZ2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gbWluUGFnZTsgaSA8PSBtYXhQYWdlOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpdGVtcy5wdXNoKGkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpdGVtcztcbiAgICB9XG5cbiAgICBvbkNoYW5nZSh2YWx1ZSk6IGFueSB7XG4gICAgICAgIHZhbHVlID0gTnVtYmVyKDxhbnk+dmFsdWUpO1xuICAgICAgICBjb25zdCBtaW5QYWdlID0gMTtcbiAgICAgICAgY29uc3QgbWF4UGFnZSA9IHRoaXMubWF4UGFnZTtcbiAgICAgICAgaWYgKHZhbHVlIDwgbWluUGFnZSkge1xuICAgICAgICAgICAgdmFsdWUgPSBtaW5QYWdlO1xuICAgICAgICB9IGVsc2UgaWYgKHZhbHVlID4gbWF4UGFnZSkge1xuICAgICAgICAgICAgdmFsdWUgPSBtYXhQYWdlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucGFnZSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxufVxuIl19