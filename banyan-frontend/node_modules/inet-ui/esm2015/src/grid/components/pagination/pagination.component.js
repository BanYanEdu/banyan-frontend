/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Inject, forwardRef, Input, TemplateRef } from '@angular/core';
import { DataTable } from '../table/table.component';
export class DataTablePagination {
    /**
     * @param {?} dataTable
     */
    constructor(dataTable) {
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
    _closeSelector() {
        this.columnSelectorOpen = false;
    }
    /**
     * @return {?}
     */
    pageBack() {
        this.dataTable.offset -= Math.min(this.dataTable.limit, this.dataTable.offset);
    }
    /**
     * @return {?}
     */
    pageForward() {
        this.dataTable.offset += this.dataTable.limit;
    }
    /**
     * @return {?}
     */
    pageFirst() {
        this.dataTable.offset = 0;
    }
    /**
     * @return {?}
     */
    pageLast() {
        this.dataTable.offset = (this.maxPage - 1) * this.dataTable.limit;
    }
    /**
     * @return {?}
     */
    get maxPage() {
        return Math.ceil(this.dataTable.itemCount / this.dataTable.limit);
    }
    /**
     * @return {?}
     */
    get limit() {
        return this.dataTable.limit;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set limit(value) {
        this.dataTable.limit = Number((/** @type {?} */ (value))); // TODO better way to handle that value of number <input> is string?
    }
    /**
     * @return {?}
     */
    get page() {
        return this.dataTable.page;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set page(value) {
        this.dataTable.page = Number((/** @type {?} */ (value)));
    }
    /**
     * @param {?} number
     * @param {?} page
     * @return {?}
     */
    createPageRange(number, page) {
        /** @type {?} */
        const displayedPage = 3;
        /** @type {?} */
        let items = [];
        if (number > 1) {
            /** @type {?} */
            let maxPage = number;
            /** @type {?} */
            let minPage = 1;
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
            for (let i = minPage; i <= maxPage; i++) {
                items.push(i);
            }
        }
        return items;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    onChange(value) {
        value = Number((/** @type {?} */ (value)));
        /** @type {?} */
        const minPage = 1;
        /** @type {?} */
        const maxPage = this.maxPage;
        if (value < minPage) {
            value = minPage;
        }
        else if (value > maxPage) {
            value = maxPage;
        }
        this.page = value;
        return value;
    }
}
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
DataTablePagination.ctorParameters = () => [
    { type: DataTable, decorators: [{ type: Inject, args: [forwardRef((/**
                     * @return {?}
                     */
                    () => DataTable)),] }] }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnaW5hdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbmV0LXVpLyIsInNvdXJjZXMiOlsic3JjL2dyaWQvY29tcG9uZW50cy9wYWdpbmF0aW9uL3BhZ2luYXRpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0gsU0FBUyxFQUNULE1BQU0sRUFDTixVQUFVLEVBQ1YsS0FBSyxFQUlMLFdBQVcsRUFFZCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFXbkQsTUFBTSxPQUFPLG1CQUFtQjs7OztJQWtCNUIsWUFBd0QsU0FBb0I7UUFBcEIsY0FBUyxHQUFULFNBQVMsQ0FBVztRQWhCbkUsZUFBVSxHQUFHLEtBQUssQ0FBQztRQUNuQixlQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ25CLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFDbkIsaUJBQVksR0FBRyxJQUFJLENBQUM7UUFDcEIseUJBQW9CLEdBQUcsS0FBSyxDQUFDO1FBQzdCLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFLMUIsdUJBQWtCLEdBQUcsS0FBSyxDQUFDO0lBTzNCLENBQUM7Ozs7SUFMRCxjQUFjO1FBQ1YsSUFBSSxDQUFDLGtCQUFrQixHQUFHLEtBQUssQ0FBQztJQUNwQyxDQUFDOzs7O0lBS0QsUUFBUTtRQUNKLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNuRixDQUFDOzs7O0lBRUQsV0FBVztRQUNQLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDO0lBQ2xELENBQUM7Ozs7SUFFRCxTQUFTO1FBQ0wsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFN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QixRQUFRLEVBQUUsdUJBQXVCO2dCQUNqQyw2bk9BQTBDO2dCQUUxQyxJQUFJLEVBQUU7b0JBQ0Ysa0JBQWtCLEVBQUUsa0JBQWtCO2lCQUN6Qzs7YUFDSjs7OztZQVZPLFNBQVMsdUJBNkJBLE1BQU0sU0FBQyxVQUFVOzs7b0JBQUMsR0FBRyxFQUFFLENBQUMsU0FBUyxFQUFDOzs7eUJBaEI5QyxLQUFLO3lCQUNMLEtBQUs7eUJBQ0wsS0FBSzsyQkFDTCxLQUFLO21DQUNMLEtBQUs7dUJBQ0wsS0FBSzswQkFFTCxLQUFLOzRCQUNMLEtBQUs7Ozs7SUFSTix5Q0FBNEI7O0lBQzVCLHlDQUE0Qjs7SUFDNUIseUNBQTRCOztJQUM1QiwyQ0FBNkI7O0lBQzdCLG1EQUFzQzs7SUFDdEMsdUNBQTBCOztJQUUxQiwwQ0FBOEM7O0lBQzlDLDRDQUFnRDs7SUFFaEQsaURBQTJCOztJQU1mLHdDQUFnRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQ29tcG9uZW50LFxuICAgIEluamVjdCxcbiAgICBmb3J3YXJkUmVmLFxuICAgIElucHV0LFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBPdXRwdXQsXG4gICAgQ29udGVudENoaWxkLFxuICAgIFRlbXBsYXRlUmVmLFxuICAgIEVsZW1lbnRSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0RhdGFUYWJsZX0gZnJvbSAnLi4vdGFibGUvdGFibGUuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gICAgbW9kdWxlSWQ6ICdncmlkLW1vZHVsZScsXG4gICAgc2VsZWN0b3I6ICdkYXRhLXRhYmxlLXBhZ2luYXRpb24nLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9wYWdpbmF0aW9uLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9wYWdpbmF0aW9uLmNvbXBvbmVudC5jc3MnXSxcbiAgICBob3N0OiB7XG4gICAgICAgICcoZG9jdW1lbnQ6Y2xpY2spJzogJ19jbG9zZVNlbGVjdG9yKCknXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBEYXRhVGFibGVQYWdpbmF0aW9uIHtcblxuICAgIEBJbnB1dCgpIHNob3dfcmFuZ2UgPSBmYWxzZTtcbiAgICBASW5wdXQoKSBzaG93X2xpbWl0ID0gZmFsc2U7XG4gICAgQElucHV0KCkgc2hvd19pbnB1dCA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIHNob3dfbnVtYmVycyA9IHRydWU7XG4gICAgQElucHV0KCkgc2hvd19jb2x1bW5fc2VsZWN0b3IgPSBmYWxzZTtcbiAgICBASW5wdXQoKSBhdXRvSGlkZSA9IGZhbHNlO1xuXG4gICAgQElucHV0KCkgYmFzaWNTZWFyY2g6IFRlbXBsYXRlUmVmPEVsZW1lbnRSZWY+O1xuICAgIEBJbnB1dCgpIGFkdmFuY2VTZWFyY2g6IFRlbXBsYXRlUmVmPEVsZW1lbnRSZWY+O1xuXG4gICAgY29sdW1uU2VsZWN0b3JPcGVuID0gZmFsc2U7XG5cbiAgICBfY2xvc2VTZWxlY3RvcigpIHtcbiAgICAgICAgdGhpcy5jb2x1bW5TZWxlY3Rvck9wZW4gPSBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gRGF0YVRhYmxlKSkgcHVibGljIGRhdGFUYWJsZTogRGF0YVRhYmxlKSB7XG4gICAgfVxuXG4gICAgcGFnZUJhY2soKSB7XG4gICAgICAgIHRoaXMuZGF0YVRhYmxlLm9mZnNldCAtPSBNYXRoLm1pbih0aGlzLmRhdGFUYWJsZS5saW1pdCwgdGhpcy5kYXRhVGFibGUub2Zmc2V0KTtcbiAgICB9XG5cbiAgICBwYWdlRm9yd2FyZCgpIHtcbiAgICAgICAgdGhpcy5kYXRhVGFibGUub2Zmc2V0ICs9IHRoaXMuZGF0YVRhYmxlLmxpbWl0O1xuICAgIH1cblxuICAgIHBhZ2VGaXJzdCgpIHtcbiAgICAgICAgdGhpcy5kYXRhVGFibGUub2Zmc2V0ID0gMDtcbiAgICB9XG5cbiAgICBwYWdlTGFzdCgpIHtcbiAgICAgICAgdGhpcy5kYXRhVGFibGUub2Zmc2V0ID0gKHRoaXMubWF4UGFnZSAtIDEpICogdGhpcy5kYXRhVGFibGUubGltaXQ7XG4gICAgfVxuXG4gICAgZ2V0IG1heFBhZ2UoKSB7XG4gICAgICAgIHJldHVybiBNYXRoLmNlaWwodGhpcy5kYXRhVGFibGUuaXRlbUNvdW50IC8gdGhpcy5kYXRhVGFibGUubGltaXQpO1xuICAgIH1cblxuICAgIGdldCBsaW1pdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YVRhYmxlLmxpbWl0O1xuICAgIH1cblxuICAgIHNldCBsaW1pdCh2YWx1ZSkge1xuICAgICAgICB0aGlzLmRhdGFUYWJsZS5saW1pdCA9IE51bWJlcig8YW55PnZhbHVlKTsgLy8gVE9ETyBiZXR0ZXIgd2F5IHRvIGhhbmRsZSB0aGF0IHZhbHVlIG9mIG51bWJlciA8aW5wdXQ+IGlzIHN0cmluZz9cbiAgICB9XG5cbiAgICBnZXQgcGFnZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YVRhYmxlLnBhZ2U7XG4gICAgfVxuXG4gICAgc2V0IHBhZ2UodmFsdWUpIHtcbiAgICAgICAgdGhpcy5kYXRhVGFibGUucGFnZSA9IE51bWJlcig8YW55PnZhbHVlKTtcbiAgICB9XG5cbiAgICBjcmVhdGVQYWdlUmFuZ2UobnVtYmVyLCBwYWdlKTogYW55W10ge1xuICAgICAgICBjb25zdCBkaXNwbGF5ZWRQYWdlID0gMztcbiAgICAgICAgbGV0IGl0ZW1zOiBudW1iZXJbXSA9IFtdO1xuICAgICAgICBpZiAobnVtYmVyID4gMSkge1xuICAgICAgICAgICAgbGV0IG1heFBhZ2UgPSBudW1iZXI7XG4gICAgICAgICAgICBsZXQgbWluUGFnZSA9IDE7XG4gICAgICAgICAgICBpZiAocGFnZSA9PT0gMSAmJiBtYXhQYWdlID49IGRpc3BsYXllZFBhZ2UpIHtcbiAgICAgICAgICAgICAgICBtYXhQYWdlID0gMztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocGFnZSA+IDEgJiYgbWF4UGFnZSA+IHBhZ2UgKyAxKSB7XG4gICAgICAgICAgICAgICAgbWluUGFnZSA9IHBhZ2UgLSAxO1xuICAgICAgICAgICAgICAgIG1heFBhZ2UgPSBwYWdlICsgMTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocGFnZSA+IDIgJiYgbWF4UGFnZSA+IHBhZ2UpIHtcbiAgICAgICAgICAgICAgICBtaW5QYWdlID0gcGFnZSAtIDE7XG4gICAgICAgICAgICAgICAgbWF4UGFnZSA9IHBhZ2UgKyAxO1xuICAgICAgICAgICAgfSBlbHNlICBpZiAocGFnZSA+IDIgJiYgbWF4UGFnZSA9PT0gcGFnZSkge1xuICAgICAgICAgICAgICAgIG1pblBhZ2UgPSBwYWdlIC0gMjtcbiAgICAgICAgICAgICAgICBtYXhQYWdlID0gcGFnZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSBtaW5QYWdlOyBpIDw9IG1heFBhZ2U7IGkrKykge1xuICAgICAgICAgICAgICAgIGl0ZW1zLnB1c2goaSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGl0ZW1zO1xuICAgIH1cblxuICAgIG9uQ2hhbmdlKHZhbHVlKTogYW55IHtcbiAgICAgICAgdmFsdWUgPSBOdW1iZXIoPGFueT52YWx1ZSk7XG4gICAgICAgIGNvbnN0IG1pblBhZ2UgPSAxO1xuICAgICAgICBjb25zdCBtYXhQYWdlID0gdGhpcy5tYXhQYWdlO1xuICAgICAgICBpZiAodmFsdWUgPCBtaW5QYWdlKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IG1pblBhZ2U7XG4gICAgICAgIH0gZWxzZSBpZiAodmFsdWUgPiBtYXhQYWdlKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IG1heFBhZ2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wYWdlID0gdmFsdWU7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG59XG4iXX0=