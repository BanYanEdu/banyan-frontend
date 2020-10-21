/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ContentChildren, QueryList, TemplateRef, ContentChild, ViewChildren } from '@angular/core';
import { DataTableColumn } from '../column/column.component';
import { DataTableRow } from '../row/row.component';
import { defaultTranslations } from '../../types/default-translations.type';
import { drag } from '../../utils/drag';
import { TranslateService } from "@ngx-translate/core";
import { CloudTranslateService } from "../../../translate/cloud-translate.service";
export class DataTable {
    /**
     * @param {?} translate
     */
    constructor(translate) {
        this.translate = translate;
        this._items = [];
        this.header = false;
        this.pagination = true;
        this.pagination_range = true;
        this.pagination_limit = false;
        this.pagination_input = true;
        this.pagination_numbers = false;
        this.indexColumn = true;
        this.indexColumnHeader = '';
        this.selectColumn = false;
        this.multiSelect = true;
        this.substituteRows = false;
        this.expandableRows = false;
        this.translations = defaultTranslations;
        this.selectOnRowClick = false;
        this.autoReload = true;
        this.showReloading = true;
        this.showColumnSelector = false;
        this.autoHidePaging = false;
        this._sortAsc = true;
        this._offset = 0;
        this._limit = 10;
        // Reloading:
        this._reloading = false;
        this.reload = new EventEmitter();
        this._displayParams = (/** @type {?} */ ({})); // params of the last finished reload
        this._scheduledReload = null;
        // event handlers:
        this.rowClick = new EventEmitter();
        this.rowDoubleClick = new EventEmitter();
        this.headerClick = new EventEmitter();
        this.cellClick = new EventEmitter();
        this.selectedRows = [];
        this._selectAllCheckbox = false;
        this.selectionChange = new EventEmitter();
        this.expandClick = new EventEmitter();
        // column resizing:
        this._resizeInProgress = false;
        this.resizeLimit = 30;
    }
    /**
     * @return {?}
     */
    get items() {
        return this._items;
    }
    /**
     * @param {?} items
     * @return {?}
     */
    set items(items) {
        this.selectedRows = [];
        this._items = items;
        this._onReloadFinished();
    }
    /**
     * @return {?}
     */
    get sortBy() {
        return this._sortBy;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set sortBy(value) {
        this._sortBy = value;
        this._triggerReload();
    }
    /**
     * @return {?}
     */
    get sortAsc() {
        return this._sortAsc;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set sortAsc(value) {
        this._sortAsc = value;
        this._triggerReload();
    }
    /**
     * @return {?}
     */
    get offset() {
        return this._offset;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set offset(value) {
        this._offset = value;
        this._triggerReload();
    }
    /**
     * @return {?}
     */
    get limit() {
        return this._limit;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set limit(value) {
        this._limit = value;
        this._triggerReload();
    }
    // calculated property:
    /**
     * @return {?}
     */
    get page() {
        return Math.floor(this.offset / this.limit) + 1;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set page(value) {
        this.offset = (value - 1) * this.limit;
    }
    /**
     * @return {?}
     */
    get lastPage() {
        return Math.ceil(this.itemCount / this.limit);
    }
    // setting multiple observable properties simultaneously
    /**
     * @param {?} sortBy
     * @param {?} asc
     * @return {?}
     */
    sort(sortBy, asc) {
        this.sortBy = sortBy;
        this.sortAsc = asc;
    }
    /**
     * @return {?}
     */
    firstPage() {
        this.offset = 0;
    }
    // init
    /**
     * @return {?}
     */
    ngOnInit() {
        this.translateSubscription = this.translate.get([CloudTranslateService.GRID_KEY]).subscribe((/**
         * @param {?} res
         * @return {?}
         */
        res => {
            /** @type {?} */
            const __resources = res[CloudTranslateService.GRID_KEY];
            if (__resources.translations) {
                this.translations = ((/** @type {?} */ (__resources.translations)));
            }
            else {
                this.translations = defaultTranslations;
            }
            if (!this.noDataMessage && __resources.emptyMsg) {
                this.noDataMessage = __resources.emptyMsg;
            }
        }));
        this._initDefaultValues();
        this._initDefaultClickEvents();
        this._updateDisplayParams();
        if (this.autoReload && this._scheduledReload == null) {
            this.reloadItems();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.translateSubscription) {
            this.translateSubscription.unsubscribe();
        }
    }
    /**
     * @private
     * @return {?}
     */
    _initDefaultValues() {
        this.indexColumnVisible = this.indexColumn;
        this.selectColumnVisible = this.selectColumn;
        this.expandColumnVisible = this.expandableRows;
    }
    /**
     * @private
     * @return {?}
     */
    _initDefaultClickEvents() {
        this.headerClick.subscribe((/**
         * @param {?} tableEvent
         * @return {?}
         */
        tableEvent => this.sortColumn(tableEvent.column)));
        if (this.selectOnRowClick) {
            this.rowClick.subscribe((/**
             * @param {?} tableEvent
             * @return {?}
             */
            tableEvent => tableEvent.row.selected = !tableEvent.row.selected));
        }
    }
    /**
     * @return {?}
     */
    get reloading() {
        return this._reloading;
    }
    /**
     * @return {?}
     */
    reloadItems() {
        this._reloading = true;
        this.reload.emit(this._getRemoteParameters());
    }
    /**
     * @private
     * @return {?}
     */
    _onReloadFinished() {
        this._updateDisplayParams();
        this._selectAllCheckbox = false;
        this._reloading = false;
    }
    // params of the last finished reload
    /**
     * @return {?}
     */
    get displayParams() {
        return this._displayParams;
    }
    /**
     * @return {?}
     */
    _updateDisplayParams() {
        this._displayParams = {
            sortBy: this.sortBy,
            sortAsc: this.sortAsc,
            offset: this.offset,
            limit: this.limit
        };
    }
    // for avoiding cascading reloads if multiple params are set at once:
    /**
     * @return {?}
     */
    _triggerReload() {
        if (this._scheduledReload) {
            clearTimeout(this._scheduledReload);
        }
        this._scheduledReload = setTimeout((/**
         * @return {?}
         */
        () => {
            this.reloadItems();
        }));
    }
    /**
     * @param {?} row
     * @param {?} event
     * @return {?}
     */
    rowClicked(row, event) {
        this.rowClick.emit({ row, event });
    }
    /**
     * @param {?} row
     * @param {?} event
     * @return {?}
     */
    rowDoubleClicked(row, event) {
        this.rowDoubleClick.emit({ row, event });
    }
    /**
     * @param {?} column
     * @param {?} event
     * @return {?}
     */
    headerClicked(column, event) {
        if (!this._resizeInProgress) {
            event.preventDefault();
            event.stopPropagation();
            this.headerClick.emit({ column, event });
        }
        else {
            this._resizeInProgress = false; // this is because I can't prevent click from mousup of the drag end
        }
    }
    /**
     * @private
     * @param {?} column
     * @param {?} row
     * @param {?} event
     * @return {?}
     */
    cellClicked(column, row, event) {
        this.cellClick.emit({ row, column, event });
    }
    // functions:
    /**
     * @private
     * @return {?}
     */
    _getRemoteParameters() {
        /** @type {?} */
        let params = (/** @type {?} */ ({}));
        if (this.sortBy) {
            params.sortBy = this.sortBy;
            params.sortAsc = this.sortAsc;
        }
        if (this.pagination) {
            params.offset = this.offset;
            params.limit = this.limit;
        }
        return params;
    }
    /**
     * @private
     * @param {?} column
     * @return {?}
     */
    sortColumn(column) {
        if (column.sortable) {
            /** @type {?} */
            let ascending = this.sortBy === column.property ? !this.sortAsc : true;
            this.sort(column.property, ascending);
        }
    }
    /**
     * @return {?}
     */
    get columnCount() {
        /** @type {?} */
        let count = 0;
        count += this.indexColumnVisible ? 1 : 0;
        count += this.selectColumnVisible ? 1 : 0;
        count += this.expandColumnVisible ? 1 : 0;
        this.columns.toArray().forEach((/**
         * @param {?} column
         * @return {?}
         */
        column => {
            count += column.visible ? 1 : 0;
        }));
        return count;
    }
    /**
     * @param {?} item
     * @param {?} index
     * @param {?} row
     * @return {?}
     */
    getRowColor(item, index, row) {
        if (this.rowColors !== undefined) {
            return ((/** @type {?} */ (this.rowColors)))(item, row, index);
        }
    }
    /**
     * @return {?}
     */
    get selectAllCheckbox() {
        return this._selectAllCheckbox;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set selectAllCheckbox(value) {
        this._selectAllCheckbox = value;
        this._onSelectAllChanged(value);
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    _onSelectAllChanged(value) {
        this.rows.toArray().forEach((/**
         * @param {?} row
         * @return {?}
         */
        row => row.selected = value));
    }
    /**
     * @param {?} selected
     * @param {?} row
     * @return {?}
     */
    onRowSelectChanged(selected, row) {
        // maintain the selectedRow(s) view
        if (this.multiSelect) {
            /** @type {?} */
            let index = this.selectedRows.indexOf(row);
            if (row.selected && index < 0) {
                this.selectedRows.push(row);
            }
            else if (!row.selected && index >= 0) {
                this.selectedRows.splice(index, 1);
            }
        }
        else {
            if (row.selected) {
                this.selectedRow = row;
                this.selectedRows = [row];
                // unselect all other rows:
                this.rows.toArray().filter((/**
                 * @param {?} row_
                 * @return {?}
                 */
                row_ => row_.selected)).forEach((/**
                 * @param {?} row_
                 * @return {?}
                 */
                row_ => {
                    if (row_ !== row) { // avoid endless loop
                        row_.selected = false;
                    }
                }));
            }
            else if (this.selectedRow === row) {
                this.selectedRow = undefined;
                this.selectedRows = [];
            }
        }
        //FIXME: prevent sticky execution
        this.selectionChange.emit({ selected, row, selectedRows: this.selectedRows });
    }
    /**
     * @param {?} expanded
     * @param {?} row
     * @return {?}
     */
    onExpandChanged(expanded, row) {
        this.expandClick.emit({ expanded, row });
    }
    // other:
    /**
     * @return {?}
     */
    get substituteItems() {
        return Array.from({ length: this.displayParams.limit - this.items.length });
    }
    /**
     * @param {?} event
     * @param {?} column
     * @param {?} columnElement
     * @return {?}
     */
    resizeColumnStart(event, column, columnElement) {
        this._resizeInProgress = true;
        drag(event, {
            move: (/**
             * @param {?} moveEvent
             * @param {?} dx
             * @return {?}
             */
            (moveEvent, dx) => {
                if (this._isResizeInLimit(columnElement, dx)) {
                    column.width = columnElement.offsetWidth + dx;
                }
            }),
        });
    }
    /**
     * @private
     * @param {?} columnElement
     * @param {?} dx
     * @return {?}
     */
    _isResizeInLimit(columnElement, dx) {
        /* This is needed because CSS min-width didn't work on table-layout: fixed.
         Without the limits, resizing can make the next column disappear completely,
         and even increase the table width. The current implementation suffers from the fact,
         that offsetWidth sometimes contains out-of-date values. */
        if ((dx < 0 && (columnElement.offsetWidth + dx) <= this.resizeLimit) ||
            !columnElement.nextElementSibling || // resizing doesn't make sense for the last visible column
            (dx >= 0 && (((/** @type {?} */ (columnElement.nextElementSibling))).offsetWidth + dx) <= this.resizeLimit)) {
            return false;
        }
        return true;
    }
}
DataTable.decorators = [
    { type: Component, args: [{
                moduleId: 'grid-module',
                selector: 'data-table',
                template: "<div class=\"data-table-wrapper\">\n    <data-table-header *ngIf=\"header\"></data-table-header>\n\n    <data-table-pagination\n            *ngIf=\"pagination\"\n            [show_range]=\"pagination_range\"\n            [show_limit]=\"pagination_limit\"\n            [show_input]=\"pagination_input\"\n            [show_numbers]=\"pagination_numbers\"\n            [show_column_selector]=\"showColumnSelector\"\n            [autoHide]=\"autoHidePaging\"\n            [basicSearch]=\"basicSearch\"\n            [advanceSearch]=\"advanceSearch\">\n    </data-table-pagination>\n\n    <div class=\"data-table-box\">\n        <table class=\"table table-condensed table-bordered data-table\">\n            <thead>\n            <tr>\n                <th scope=\"col\" [hide]=\"!expandColumnVisible\" class=\"expand-column-header\">\n                <th scope=\"col\" [hide]=\"!indexColumnVisible\" class=\"index-column-header\">\n                    <span [textContent]=\"indexColumnHeader\"></span>\n                </th>\n                <th scope=\"col\" [hide]=\"!selectColumnVisible\" class=\"select-column-header\">\n                    <input [hide]=\"!multiSelect\" type=\"checkbox\" [(ngModel)]=\"selectAllCheckbox\" [attr.aria-label]=\"translations.selectAllRows\" />\n                    <label class=\"mb-0 lbl\"></label>\n                </th>\n                <th scope=\"col\" *ngFor=\"let column of columns\" #th [hide]=\"!column.visible\"\n                    (click)=\"headerClicked(column, $event)\"\n                    (keydown.enter)=\"headerClicked(column, $event)\" (keydown.space)=\"headerClicked(column, $event)\"\n\n                    [class.sortable]=\"column.sortable\" [class.resizable]=\"column.resizable\"\n\n                    [ngClass]=\"column.styleClassObject\" class=\"column-header\" [style.width]=\"column.width | px\"\n\n                    [attr.aria-sort]=\"column.sortable ? (column.property === sortBy ? (sortAsc ? 'ascending' : 'descending') : 'none') : null\"\n                    [attr.tabindex]=\"column.sortable ? '0' : null\">\n                    <span *ngIf=\"!column.headerTemplate\" [textContent]=\"column.header\"></span>\n                    <span *ngIf=\"column.headerTemplate\" [ngTemplateOutlet]=\"column.headerTemplate\" [ngTemplateOutletContext]=\"{column: column}\"></span>\n                    <span class=\"column-sort-icon\" *ngIf=\"column.sortable\">\n                            <span class=\"fa fa-sort column-sortable-icon\" [hide]=\"column.property === sortBy\"></span>\n                            <span [hide]=\"column.property !== sortBy\">\n                                 <span class=\"fa\" [ngClass]=\"{'fa-sort-asc': !sortAsc, 'fa-sort-desc': sortAsc}\"></span>\n                            </span>\n                    </span>\n                    <span *ngIf=\"column.resizable\" class=\"column-resize-handle\" (mousedown)=\"resizeColumnStart($event, column, th)\"></span>\n                </th>\n            </tr>\n            </thead>\n            <tbody *ngFor=\"let item of items; let index=index\" class=\"data-table-row-wrapper\"\n                   dataTableRow #row [item]=\"item\" [index]=\"index\"\n                   (selectedChange)=\"onRowSelectChanged($event, row)\"\n                   (expandedChange)=\"onExpandChanged($event, row)\">\n            </tbody>\n            <tbody *ngIf=\"itemCount === 0 && noDataMessage\">\n            <tr>\n                <td [attr.colspan]=\"columnCount\">{{ noDataMessage }}</td>\n            </tr>\n            </tbody>\n            <tbody class=\"substitute-rows\" *ngIf=\"pagination && substituteRows\">\n            <tr *ngFor=\"let item of substituteItems, let index = index\"\n                [class.row-odd]=\"(index + items.length) % 2 === 0\"\n                [class.row-even]=\"(index + items.length) % 2 === 1\"\n            >\n                <td [hide]=\"!expandColumnVisible\"></td>\n                <td [hide]=\"!indexColumnVisible\">&nbsp;</td>\n                <td [hide]=\"!selectColumnVisible\"></td>\n                <td *ngFor=\"let column of columns\" [hide]=\"!column.visible\">\n            </tr>\n            </tbody>\n        </table>\n\n        <div class=\"loading-cover\" *ngIf=\"showReloading && reloading\"></div>\n    </div>\n</div>\n",
                styles: [":host /deep/ .data-table.table>tbody+tbody{border-top:none}:host /deep/ .data-table.table td{vertical-align:middle}:host /deep/ .data-table>tbody>tr>td,:host /deep/ .data-table>thead>tr>th{overflow:hidden}:host /deep/ .row-odd{background-color:#f6f6f6}.data-table .substitute-rows>tr:hover,:host /deep/ .data-table .data-table-row:hover{background-color:#ececec}.data-table{box-shadow:0 0 15px #ececec;table-layout:fixed}.column-header{position:relative}.expand-column-header{width:50px}.select-column-header{width:50px;text-align:center}.index-column-header{width:40px;text-align:center}.column-header.sortable{cursor:pointer}.column-header .column-sort-icon{float:right}.column-header.resizable .column-sort-icon{margin-right:8px}.column-header .column-sort-icon .column-sortable-icon{color:#d3d3d3}.column-header .column-resize-handle{position:absolute;top:0;right:0;margin:0;padding:0;width:8px;height:100%;cursor:col-resize}.data-table-box{position:relative}.loading-cover{position:absolute;width:100%;height:100%;background-color:rgba(255,255,255,.3);top:0}@-webkit-keyframes spinner{to{transform:rotate(360deg)}}@keyframes spinner{to{transform:rotate(360deg)}}.loading-cover:before{content:'';box-sizing:border-box;position:absolute;top:50%;left:50%;width:40px;height:40px;border-radius:50%;margin-top:-15px;margin-left:-15px;border:1px solid #ccc;border-top-color:#07d;-webkit-animation:.6s linear infinite spinner;animation:.6s linear infinite spinner}:host /deep/ .data-table.table input[type=checkbox],:host /deep/ .data-table.table input[type=radio]{opacity:0;position:absolute;z-index:12;width:18px;height:18px}:host /deep/ .data-table.table input[type=checkbox]+.lbl::before,:host /deep/ .data-table.table input[type=radio]+.lbl::before{font-family:FontAwesome;font-weight:400;font-size:11px;color:#32a3ce;content:\"\\a0\";display:inline-block;background-color:#fafafa;border:1px solid #ccc;box-shadow:0 1px 2px rgba(0,0,0,.05);border-radius:0;text-align:center;vertical-align:middle;height:13px;line-height:13px;min-width:13px;margin-right:1px}:host /deep/ .data-table.table input[type=checkbox]:active+.lbl::before,:host /deep/ .data-table.table input[type=checkbox]:checked:active+.lbl::before,:host /deep/ .data-table.table input[type=radio]:active+.lbl::before,:host /deep/ .data-table.table input[type=radio]:checked:active+.lbl::before{box-shadow:0 1px 2px rgba(0,0,0,.05),inset 0 1px 3px rgba(0,0,0,.1)}:host /deep/ .data-table.table input[type=checkbox]:checked+.lbl::before,:host /deep/ .data-table.table input[type=radio]:checked+.lbl::before{content:'\\f00c';display:inline-block;content:'\\f00c';background-color:#f5f8fc;border-color:#adb8c0;box-shadow:0 1px 2px rgba(0,0,0,.05),inset 0 -15px 10px -12px rgba(0,0,0,.05),inset 15px 10px -12px rgba(255,255,255,.1)}:host /deep/ .data-table.table input[type=checkbox]+.lbl:hover::before,:host /deep/ .data-table.table input[type=checkbox]:hover+.lbl::before,:host /deep/ .data-table.table input[type=radio]+.lbl:hover::before,:host /deep/ .data-table.table input[type=radio]:hover+.lbl::before{border-color:#ff893c}"]
            }] }
];
/** @nocollapse */
DataTable.ctorParameters = () => [
    { type: TranslateService }
];
DataTable.propDecorators = {
    items: [{ type: Input }],
    itemCount: [{ type: Input }],
    columns: [{ type: ContentChildren, args: [DataTableColumn,] }],
    rows: [{ type: ViewChildren, args: [DataTableRow,] }],
    expandTemplate: [{ type: ContentChild, args: ['dataTableExpand',] }],
    headerTitle: [{ type: Input }],
    header: [{ type: Input }],
    pagination: [{ type: Input }],
    pagination_range: [{ type: Input }],
    pagination_limit: [{ type: Input }],
    pagination_input: [{ type: Input }],
    pagination_numbers: [{ type: Input }],
    indexColumn: [{ type: Input }],
    indexColumnHeader: [{ type: Input }],
    rowColors: [{ type: Input }],
    rowTooltip: [{ type: Input }],
    selectColumn: [{ type: Input }],
    multiSelect: [{ type: Input }],
    substituteRows: [{ type: Input }],
    expandableRows: [{ type: Input }],
    translations: [{ type: Input }],
    selectOnRowClick: [{ type: Input }],
    autoReload: [{ type: Input }],
    showReloading: [{ type: Input }],
    noDataMessage: [{ type: Input }],
    showColumnSelector: [{ type: Input }],
    autoHidePaging: [{ type: Input }],
    basicSearch: [{ type: ContentChild, args: ['basicSearch',] }],
    advanceSearch: [{ type: ContentChild, args: ['advanceSearch',] }],
    sortBy: [{ type: Input }],
    sortAsc: [{ type: Input }],
    offset: [{ type: Input }],
    limit: [{ type: Input }],
    page: [{ type: Input }],
    reload: [{ type: Output }],
    rowClick: [{ type: Output }],
    rowDoubleClick: [{ type: Output }],
    headerClick: [{ type: Output }],
    cellClick: [{ type: Output }],
    selectionChange: [{ type: Output }],
    expandClick: [{ type: Output }]
};
if (false) {
    /**
     * @type {?}
     * @private
     */
    DataTable.prototype._items;
    /** @type {?} */
    DataTable.prototype.itemCount;
    /** @type {?} */
    DataTable.prototype.columns;
    /** @type {?} */
    DataTable.prototype.rows;
    /** @type {?} */
    DataTable.prototype.expandTemplate;
    /** @type {?} */
    DataTable.prototype.headerTitle;
    /** @type {?} */
    DataTable.prototype.header;
    /** @type {?} */
    DataTable.prototype.pagination;
    /** @type {?} */
    DataTable.prototype.pagination_range;
    /** @type {?} */
    DataTable.prototype.pagination_limit;
    /** @type {?} */
    DataTable.prototype.pagination_input;
    /** @type {?} */
    DataTable.prototype.pagination_numbers;
    /** @type {?} */
    DataTable.prototype.indexColumn;
    /** @type {?} */
    DataTable.prototype.indexColumnHeader;
    /** @type {?} */
    DataTable.prototype.rowColors;
    /** @type {?} */
    DataTable.prototype.rowTooltip;
    /** @type {?} */
    DataTable.prototype.selectColumn;
    /** @type {?} */
    DataTable.prototype.multiSelect;
    /** @type {?} */
    DataTable.prototype.substituteRows;
    /** @type {?} */
    DataTable.prototype.expandableRows;
    /** @type {?} */
    DataTable.prototype.translations;
    /** @type {?} */
    DataTable.prototype.selectOnRowClick;
    /** @type {?} */
    DataTable.prototype.autoReload;
    /** @type {?} */
    DataTable.prototype.showReloading;
    /** @type {?} */
    DataTable.prototype.noDataMessage;
    /** @type {?} */
    DataTable.prototype.showColumnSelector;
    /** @type {?} */
    DataTable.prototype.autoHidePaging;
    /** @type {?} */
    DataTable.prototype.indexColumnVisible;
    /** @type {?} */
    DataTable.prototype.selectColumnVisible;
    /** @type {?} */
    DataTable.prototype.expandColumnVisible;
    /**
     * @type {?}
     * @private
     */
    DataTable.prototype._sortBy;
    /**
     * @type {?}
     * @private
     */
    DataTable.prototype._sortAsc;
    /**
     * @type {?}
     * @private
     */
    DataTable.prototype._offset;
    /**
     * @type {?}
     * @private
     */
    DataTable.prototype._limit;
    /**
     * @type {?}
     * @private
     */
    DataTable.prototype.translateSubscription;
    /** @type {?} */
    DataTable.prototype.basicSearch;
    /** @type {?} */
    DataTable.prototype.advanceSearch;
    /** @type {?} */
    DataTable.prototype._reloading;
    /** @type {?} */
    DataTable.prototype.reload;
    /** @type {?} */
    DataTable.prototype._displayParams;
    /** @type {?} */
    DataTable.prototype._scheduledReload;
    /** @type {?} */
    DataTable.prototype.rowClick;
    /** @type {?} */
    DataTable.prototype.rowDoubleClick;
    /** @type {?} */
    DataTable.prototype.headerClick;
    /** @type {?} */
    DataTable.prototype.cellClick;
    /** @type {?} */
    DataTable.prototype.selectedRow;
    /** @type {?} */
    DataTable.prototype.selectedRows;
    /**
     * @type {?}
     * @private
     */
    DataTable.prototype._selectAllCheckbox;
    /** @type {?} */
    DataTable.prototype.selectionChange;
    /** @type {?} */
    DataTable.prototype.expandClick;
    /**
     * @type {?}
     * @private
     */
    DataTable.prototype._resizeInProgress;
    /** @type {?} */
    DataTable.prototype.resizeLimit;
    /**
     * @type {?}
     * @private
     */
    DataTable.prototype.translate;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC11aS8iLCJzb3VyY2VzIjpbInNyYy9ncmlkL2NvbXBvbmVudHMvdGFibGUvdGFibGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0gsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLGVBQWUsRUFBRSxTQUFTLEVBQ2xFLFdBQVcsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUMxQyxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFDM0QsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBSWxELE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLHVDQUF1QyxDQUFDO0FBQzFFLE9BQU8sRUFBQyxJQUFJLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUN0QyxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUNyRCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSw0Q0FBNEMsQ0FBQztBQVNqRixNQUFNLE9BQU8sU0FBUzs7OztJQWlJbEIsWUFBb0IsU0FBMkI7UUFBM0IsY0FBUyxHQUFULFNBQVMsQ0FBa0I7UUEvSHZDLFdBQU0sR0FBVSxFQUFFLENBQUM7UUF1QmxCLFdBQU0sR0FBRyxLQUFLLENBQUM7UUFDZixlQUFVLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLHFCQUFnQixHQUFHLElBQUksQ0FBQztRQUN4QixxQkFBZ0IsR0FBRyxLQUFLLENBQUM7UUFDekIscUJBQWdCLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLHVCQUFrQixHQUFHLEtBQUssQ0FBQztRQUMzQixnQkFBVyxHQUFHLElBQUksQ0FBQztRQUNuQixzQkFBaUIsR0FBRyxFQUFFLENBQUM7UUFHdkIsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFDckIsZ0JBQVcsR0FBRyxJQUFJLENBQUM7UUFDbkIsbUJBQWMsR0FBRyxLQUFLLENBQUM7UUFDdkIsbUJBQWMsR0FBRyxLQUFLLENBQUM7UUFDdkIsaUJBQVksR0FBMEIsbUJBQW1CLENBQUM7UUFDMUQscUJBQWdCLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLGVBQVUsR0FBRyxJQUFJLENBQUM7UUFDbEIsa0JBQWEsR0FBRyxJQUFJLENBQUM7UUFFckIsdUJBQWtCLEdBQUcsS0FBSyxDQUFDO1FBQzNCLG1CQUFjLEdBQUcsS0FBSyxDQUFDO1FBVXhCLGFBQVEsR0FBRyxJQUFJLENBQUM7UUFFaEIsWUFBTyxHQUFHLENBQUMsQ0FBQztRQUNaLFdBQU0sR0FBRyxFQUFFLENBQUM7O1FBcUhwQixlQUFVLEdBQUcsS0FBSyxDQUFDO1FBTVQsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFjdEMsbUJBQWMsR0FBRyxtQkFBaUIsRUFBRSxFQUFBLENBQUMsQ0FBQyxxQ0FBcUM7UUFlM0UscUJBQWdCLEdBQUcsSUFBSSxDQUFDOztRQWNkLGFBQVEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzlCLG1CQUFjLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNwQyxnQkFBVyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDakMsY0FBUyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFtRXpDLGlCQUFZLEdBQW1CLEVBQUUsQ0FBQztRQUUxQix1QkFBa0IsR0FBRyxLQUFLLENBQUM7UUFlekIsb0JBQWUsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBZ0NyQyxnQkFBVyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7O1FBY25DLHNCQUFpQixHQUFHLEtBQUssQ0FBQztRQWNsQyxnQkFBVyxHQUFHLEVBQUUsQ0FBQztJQWxQaUMsQ0FBQzs7OztJQTdIbkQsSUFBYSxLQUFLO1FBQ2QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7Ozs7O0lBRUQsSUFBSSxLQUFLLENBQUMsS0FBWTtRQUNsQixJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUM3QixDQUFDOzs7O0lBb0RELElBQ0ksTUFBTTtRQUNOLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN4QixDQUFDOzs7OztJQUVELElBQUksTUFBTSxDQUFDLEtBQUs7UUFDWixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNyQixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDMUIsQ0FBQzs7OztJQUVELElBQ0ksT0FBTztRQUNQLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDOzs7OztJQUVELElBQUksT0FBTyxDQUFDLEtBQUs7UUFDYixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUN0QixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDMUIsQ0FBQzs7OztJQUVELElBQ0ksTUFBTTtRQUNOLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN4QixDQUFDOzs7OztJQUVELElBQUksTUFBTSxDQUFDLEtBQUs7UUFDWixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNyQixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDMUIsQ0FBQzs7OztJQUVELElBQ0ksS0FBSztRQUNMLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUN2QixDQUFDOzs7OztJQUVELElBQUksS0FBSyxDQUFDLEtBQUs7UUFDWCxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDMUIsQ0FBQzs7Ozs7SUFJRCxJQUNJLElBQUk7UUFDSixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3BELENBQUM7Ozs7O0lBRUQsSUFBSSxJQUFJLENBQUMsS0FBSztRQUNWLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztJQUMzQyxDQUFDOzs7O0lBRUQsSUFBSSxRQUFRO1FBQ1IsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xELENBQUM7Ozs7Ozs7SUFJRCxJQUFJLENBQUMsTUFBYyxFQUFFLEdBQVk7UUFDN0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7SUFDdkIsQ0FBQzs7OztJQUVELFNBQVM7UUFDTCxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUNwQixDQUFDOzs7OztJQUlELFFBQVE7UUFDSixJQUFJLENBQUMscUJBQXFCLEdBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFNBQVM7Ozs7UUFBQyxHQUFHLENBQUMsRUFBRTs7a0JBQ3pGLFdBQVcsR0FBRyxHQUFHLENBQUMscUJBQXFCLENBQUMsUUFBUSxDQUFDO1lBQ3ZELElBQUcsV0FBVyxDQUFDLFlBQVksRUFBRTtnQkFDekIsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLG1CQUFBLFdBQVcsQ0FBQyxZQUFZLEVBQXlCLENBQUMsQ0FBQzthQUMzRTtpQkFBTTtnQkFDSCxJQUFJLENBQUMsWUFBWSxHQUFHLG1CQUFtQixDQUFDO2FBQzNDO1lBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLElBQUksV0FBVyxDQUFDLFFBQVEsRUFBRTtnQkFDN0MsSUFBSSxDQUFDLGFBQWEsR0FBRyxXQUFXLENBQUMsUUFBUSxDQUFDO2FBQzdDO1FBQ0wsQ0FBQyxFQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztRQUU1QixJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLGdCQUFnQixJQUFJLElBQUksRUFBRTtZQUNsRCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDdEI7SUFDTCxDQUFDOzs7O0lBQ0QsV0FBVztRQUNQLElBQUksSUFBSSxDQUFDLHFCQUFxQixFQUFFO1lBQzVCLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUM1QztJQUNMLENBQUM7Ozs7O0lBR08sa0JBQWtCO1FBQ3RCLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQzNDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQzdDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDO0lBQ25ELENBQUM7Ozs7O0lBRU8sdUJBQXVCO1FBQzNCLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUzs7OztRQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQUMsQ0FBQztRQUM3RSxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtZQUN2QixJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVM7Ozs7WUFBQyxVQUFVLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsUUFBUSxHQUFHLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUMsQ0FBQztTQUM3RjtJQUNMLENBQUM7Ozs7SUFNRCxJQUFJLFNBQVM7UUFDVCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDM0IsQ0FBQzs7OztJQUlELFdBQVc7UUFDUCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztRQUN2QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxDQUFDO0lBQ2xELENBQUM7Ozs7O0lBRU8saUJBQWlCO1FBQ3JCLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1FBRTVCLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxLQUFLLENBQUM7UUFDaEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7SUFDNUIsQ0FBQzs7Ozs7SUFJRCxJQUFJLGFBQWE7UUFDYixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUM7SUFDL0IsQ0FBQzs7OztJQUVELG9CQUFvQjtRQUNoQixJQUFJLENBQUMsY0FBYyxHQUFHO1lBQ2xCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtZQUNuQixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87WUFDckIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1lBQ25CLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztTQUNwQixDQUFDO0lBQ04sQ0FBQzs7Ozs7SUFLRCxjQUFjO1FBQ1YsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7WUFDdkIsWUFBWSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1NBQ3ZDO1FBQ0QsSUFBSSxDQUFDLGdCQUFnQixHQUFHLFVBQVU7OztRQUFDLEdBQUcsRUFBRTtZQUNwQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdkIsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7Ozs7SUFTTSxVQUFVLENBQUMsR0FBaUIsRUFBRSxLQUFLO1FBQ3RDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUMsR0FBRyxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUM7SUFDckMsQ0FBQzs7Ozs7O0lBRU0sZ0JBQWdCLENBQUMsR0FBaUIsRUFBRSxLQUFLO1FBQzVDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUMsR0FBRyxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUM7SUFDM0MsQ0FBQzs7Ozs7O0lBRUQsYUFBYSxDQUFDLE1BQXVCLEVBQUUsS0FBWTtRQUMvQyxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFO1lBQ3pCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN2QixLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDeEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBQyxNQUFNLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQztTQUMxQzthQUFNO1lBQ0gsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQyxDQUFDLG9FQUFvRTtTQUN2RztJQUNMLENBQUM7Ozs7Ozs7O0lBRU8sV0FBVyxDQUFDLE1BQXVCLEVBQUUsR0FBaUIsRUFBRSxLQUFpQjtRQUM3RSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQztJQUM5QyxDQUFDOzs7Ozs7SUFJTyxvQkFBb0I7O1lBQ3BCLE1BQU0sR0FBRyxtQkFBaUIsRUFBRSxFQUFBO1FBRWhDLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNiLE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUM1QixNQUFNLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7U0FDakM7UUFDRCxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDakIsTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQzVCLE1BQU0sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztTQUM3QjtRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7Ozs7OztJQUVPLFVBQVUsQ0FBQyxNQUF1QjtRQUN0QyxJQUFJLE1BQU0sQ0FBQyxRQUFRLEVBQUU7O2dCQUNiLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxLQUFLLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSTtZQUN0RSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUM7U0FDekM7SUFDTCxDQUFDOzs7O0lBRUQsSUFBSSxXQUFXOztZQUNQLEtBQUssR0FBRyxDQUFDO1FBQ2IsS0FBSyxJQUFJLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekMsS0FBSyxJQUFJLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDMUMsS0FBSyxJQUFJLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxPQUFPOzs7O1FBQUMsTUFBTSxDQUFDLEVBQUU7WUFDcEMsS0FBSyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BDLENBQUMsRUFBQyxDQUFDO1FBQ0gsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQzs7Ozs7OztJQUVNLFdBQVcsQ0FBQyxJQUFTLEVBQUUsS0FBYSxFQUFFLEdBQWlCO1FBQzFELElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxTQUFTLEVBQUU7WUFDOUIsT0FBTyxDQUFDLG1CQUFhLElBQUksQ0FBQyxTQUFTLEVBQUEsQ0FBQyxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDMUQ7SUFDTCxDQUFDOzs7O0lBU0QsSUFBSSxpQkFBaUI7UUFDakIsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUM7SUFDbkMsQ0FBQzs7Ozs7SUFFRCxJQUFJLGlCQUFpQixDQUFDLEtBQUs7UUFDdkIsSUFBSSxDQUFDLGtCQUFrQixHQUFHLEtBQUssQ0FBQztRQUNoQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDcEMsQ0FBQzs7Ozs7O0lBRU8sbUJBQW1CLENBQUMsS0FBYztRQUN0QyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLE9BQU87Ozs7UUFBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEdBQUcsS0FBSyxFQUFDLENBQUM7SUFDN0QsQ0FBQzs7Ozs7O0lBSUQsa0JBQWtCLENBQUMsUUFBaUIsRUFBRSxHQUFpQjtRQUNuRCxtQ0FBbUM7UUFDbkMsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFOztnQkFDZCxLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDO1lBQzFDLElBQUksR0FBRyxDQUFDLFFBQVEsSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFO2dCQUMzQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUMvQjtpQkFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsSUFBSSxLQUFLLElBQUksQ0FBQyxFQUFFO2dCQUNwQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7YUFDdEM7U0FDSjthQUFNO1lBQ0gsSUFBSSxHQUFHLENBQUMsUUFBUSxFQUFFO2dCQUNkLElBQUksQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDO2dCQUN2QixJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzFCLDJCQUEyQjtnQkFDM0IsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxNQUFNOzs7O2dCQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBQyxDQUFDLE9BQU87Ozs7Z0JBQUMsSUFBSSxDQUFDLEVBQUU7b0JBQzdELElBQUksSUFBSSxLQUFLLEdBQUcsRUFBRSxFQUFFLHFCQUFxQjt3QkFDckMsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7cUJBQ3pCO2dCQUNMLENBQUMsRUFBQyxDQUFDO2FBQ047aUJBQU0sSUFBSSxJQUFJLENBQUMsV0FBVyxLQUFLLEdBQUcsRUFBRTtnQkFDakMsSUFBSSxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUM7Z0JBQzdCLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO2FBQzFCO1NBQ0o7UUFDRCxpQ0FBaUM7UUFFakMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsRUFBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFDLENBQUMsQ0FBQztJQUVoRixDQUFDOzs7Ozs7SUFJRCxlQUFlLENBQUMsUUFBaUIsRUFBRSxHQUFpQjtRQUNoRCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUMsQ0FBQyxDQUFDO0lBQzNDLENBQUM7Ozs7O0lBSUQsSUFBSSxlQUFlO1FBQ2YsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFDLENBQUMsQ0FBQztJQUM5RSxDQUFDOzs7Ozs7O0lBTUQsaUJBQWlCLENBQUMsS0FBaUIsRUFBRSxNQUF1QixFQUFFLGFBQTBCO1FBQ3BGLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUM7UUFFOUIsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNSLElBQUk7Ozs7O1lBQUUsQ0FBQyxTQUFxQixFQUFFLEVBQVUsRUFBRSxFQUFFO2dCQUN4QyxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLEVBQUUsRUFBRSxDQUFDLEVBQUU7b0JBQzFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsYUFBYSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7aUJBQ2pEO1lBQ0wsQ0FBQyxDQUFBO1NBQ0osQ0FBQyxDQUFDO0lBQ1AsQ0FBQzs7Ozs7OztJQUlPLGdCQUFnQixDQUFDLGFBQTBCLEVBQUUsRUFBVTtRQUMzRDs7O21FQUcyRDtRQUMzRCxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQztZQUNoRSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsSUFBSSwwREFBMEQ7WUFDL0YsQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxtQkFBYyxhQUFhLENBQUMsa0JBQWtCLEVBQUEsQ0FBQyxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUMsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUU7WUFDdEcsT0FBTyxLQUFLLENBQUM7U0FDaEI7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDOzs7WUF2WUosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxhQUFhO2dCQUN2QixRQUFRLEVBQUUsWUFBWTtnQkFDdEIsb3RJQUFxQzs7YUFFeEM7Ozs7WUFSTyxnQkFBZ0I7OztvQkFjbkIsS0FBSzt3QkFVTCxLQUFLO3NCQUlMLGVBQWUsU0FBQyxlQUFlO21CQUMvQixZQUFZLFNBQUMsWUFBWTs2QkFDekIsWUFBWSxTQUFDLGlCQUFpQjswQkFJOUIsS0FBSztxQkFDTCxLQUFLO3lCQUNMLEtBQUs7K0JBQ0wsS0FBSzsrQkFDTCxLQUFLOytCQUNMLEtBQUs7aUNBQ0wsS0FBSzswQkFDTCxLQUFLO2dDQUNMLEtBQUs7d0JBQ0wsS0FBSzt5QkFDTCxLQUFLOzJCQUNMLEtBQUs7MEJBQ0wsS0FBSzs2QkFDTCxLQUFLOzZCQUNMLEtBQUs7MkJBQ0wsS0FBSzsrQkFDTCxLQUFLO3lCQUNMLEtBQUs7NEJBQ0wsS0FBSzs0QkFDTCxLQUFLO2lDQUNMLEtBQUs7NkJBQ0wsS0FBSzswQkFnQkwsWUFBWSxTQUFDLGFBQWE7NEJBQzFCLFlBQVksU0FBQyxlQUFlO3FCQUU1QixLQUFLO3NCQVVMLEtBQUs7cUJBVUwsS0FBSztvQkFVTCxLQUFLO21CQVlMLEtBQUs7cUJBMkVMLE1BQU07dUJBMkNOLE1BQU07NkJBQ04sTUFBTTswQkFDTixNQUFNO3dCQUNOLE1BQU07OEJBb0ZOLE1BQU07MEJBZ0NOLE1BQU07Ozs7Ozs7SUFyVlAsMkJBQTJCOztJQVkzQiw4QkFBMkI7O0lBSTNCLDRCQUFzRTs7SUFDdEUseUJBQTBEOztJQUMxRCxtQ0FBa0U7O0lBSWxFLGdDQUE2Qjs7SUFDN0IsMkJBQXdCOztJQUN4QiwrQkFBMkI7O0lBQzNCLHFDQUFpQzs7SUFDakMscUNBQWtDOztJQUNsQyxxQ0FBaUM7O0lBQ2pDLHVDQUFvQzs7SUFDcEMsZ0NBQTRCOztJQUM1QixzQ0FBZ0M7O0lBQ2hDLDhCQUFnQzs7SUFDaEMsK0JBQWlDOztJQUNqQyxpQ0FBOEI7O0lBQzlCLGdDQUE0Qjs7SUFDNUIsbUNBQWdDOztJQUNoQyxtQ0FBZ0M7O0lBQ2hDLGlDQUFtRTs7SUFDbkUscUNBQWtDOztJQUNsQywrQkFBMkI7O0lBQzNCLGtDQUE4Qjs7SUFDOUIsa0NBQStCOztJQUMvQix1Q0FBb0M7O0lBQ3BDLG1DQUFnQzs7SUFHaEMsdUNBQTRCOztJQUM1Qix3Q0FBNkI7O0lBQzdCLHdDQUE2Qjs7Ozs7SUFJN0IsNEJBQXdCOzs7OztJQUN4Qiw2QkFBd0I7Ozs7O0lBRXhCLDRCQUFvQjs7Ozs7SUFDcEIsMkJBQW9COzs7OztJQUNwQiwwQ0FBNEM7O0lBRTVDLGdDQUFrRTs7SUFDbEUsa0NBQXNFOztJQWlIdEUsK0JBQW1COztJQU1uQiwyQkFBc0M7O0lBY3RDLG1DQUFxQzs7SUFlckMscUNBQXdCOztJQWN4Qiw2QkFBd0M7O0lBQ3hDLG1DQUE4Qzs7SUFDOUMsZ0NBQTJDOztJQUMzQyw4QkFBeUM7O0lBa0V6QyxnQ0FBMEI7O0lBQzFCLGlDQUFrQzs7Ozs7SUFFbEMsdUNBQW1DOztJQWVuQyxvQ0FBK0M7O0lBZ0MvQyxnQ0FBMkM7Ozs7O0lBYzNDLHNDQUFrQzs7SUFjbEMsZ0NBQWlCOzs7OztJQWxQTCw4QkFBbUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBDb250ZW50Q2hpbGRyZW4sIFF1ZXJ5TGlzdCxcbiAgICBUZW1wbGF0ZVJlZiwgQ29udGVudENoaWxkLCBWaWV3Q2hpbGRyZW4sIE9uSW5pdCwgT25EZXN0cm95LCBFbGVtZW50UmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtEYXRhVGFibGVDb2x1bW59IGZyb20gJy4uL2NvbHVtbi9jb2x1bW4uY29tcG9uZW50JztcbmltcG9ydCB7RGF0YVRhYmxlUm93fSBmcm9tICcuLi9yb3cvcm93LmNvbXBvbmVudCc7XG5pbXBvcnQge0RhdGFUYWJsZVBhcmFtc30gZnJvbSAnLi4vLi4vdHlwZXMvZGF0YS10YWJsZS1wYXJhbXMudHlwZSc7XG5pbXBvcnQge1Jvd0NhbGxiYWNrfSBmcm9tICcuLi8uLi90eXBlcy9yb3ctY2FsbGJhY2sudHlwZSc7XG5pbXBvcnQge0RhdGFUYWJsZVRyYW5zbGF0aW9uc30gZnJvbSAnLi4vLi4vdHlwZXMvZGF0YS10YWJsZS10cmFuc2xhdGlvbnMudHlwZSc7XG5pbXBvcnQge2RlZmF1bHRUcmFuc2xhdGlvbnN9IGZyb20gJy4uLy4uL3R5cGVzL2RlZmF1bHQtdHJhbnNsYXRpb25zLnR5cGUnO1xuaW1wb3J0IHtkcmFnfSBmcm9tICcuLi8uLi91dGlscy9kcmFnJztcbmltcG9ydCB7VHJhbnNsYXRlU2VydmljZX0gZnJvbSBcIkBuZ3gtdHJhbnNsYXRlL2NvcmVcIjtcbmltcG9ydCB7Q2xvdWRUcmFuc2xhdGVTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vLi4vdHJhbnNsYXRlL2Nsb3VkLXRyYW5zbGF0ZS5zZXJ2aWNlXCI7XG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSBcInJ4anNcIjtcbkBDb21wb25lbnQoe1xuICAgIG1vZHVsZUlkOiAnZ3JpZC1tb2R1bGUnLFxuICAgIHNlbGVjdG9yOiAnZGF0YS10YWJsZScsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3RhYmxlLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi90YWJsZS5jb21wb25lbnQuY3NzJ11cbn0pXG5cbmV4cG9ydCBjbGFzcyBEYXRhVGFibGUgaW1wbGVtZW50cyBEYXRhVGFibGVQYXJhbXMsIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICAgIHByaXZhdGUgX2l0ZW1zOiBhbnlbXSA9IFtdO1xuXG4gICAgQElucHV0KCkgZ2V0IGl0ZW1zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faXRlbXM7XG4gICAgfVxuXG4gICAgc2V0IGl0ZW1zKGl0ZW1zOiBhbnlbXSkge1xuICAgICAgICB0aGlzLnNlbGVjdGVkUm93cyA9IFtdO1xuICAgICAgICB0aGlzLl9pdGVtcyA9IGl0ZW1zO1xuICAgICAgICB0aGlzLl9vblJlbG9hZEZpbmlzaGVkKCk7XG4gICAgfVxuXG4gICAgQElucHV0KCkgaXRlbUNvdW50OiBudW1iZXI7XG5cbiAgICAvLyBVSSBjb21wb25lbnRzOlxuXG4gICAgQENvbnRlbnRDaGlsZHJlbihEYXRhVGFibGVDb2x1bW4pIGNvbHVtbnM6IFF1ZXJ5TGlzdDxEYXRhVGFibGVDb2x1bW4+O1xuICAgIEBWaWV3Q2hpbGRyZW4oRGF0YVRhYmxlUm93KSByb3dzOiBRdWVyeUxpc3Q8RGF0YVRhYmxlUm93PjtcbiAgICBAQ29udGVudENoaWxkKCdkYXRhVGFibGVFeHBhbmQnKSBleHBhbmRUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIC8vIE9uZS10aW1lIG9wdGlvbmFsIGJpbmRpbmdzIHdpdGggZGVmYXVsdCB2YWx1ZXM6XG5cbiAgICBASW5wdXQoKSBoZWFkZXJUaXRsZTogc3RyaW5nO1xuICAgIEBJbnB1dCgpIGhlYWRlciA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIHBhZ2luYXRpb24gPSB0cnVlO1xuICAgIEBJbnB1dCgpIHBhZ2luYXRpb25fcmFuZ2UgPSB0cnVlO1xuICAgIEBJbnB1dCgpIHBhZ2luYXRpb25fbGltaXQgPSBmYWxzZTtcbiAgICBASW5wdXQoKSBwYWdpbmF0aW9uX2lucHV0ID0gdHJ1ZTtcbiAgICBASW5wdXQoKSBwYWdpbmF0aW9uX251bWJlcnMgPSBmYWxzZTtcbiAgICBASW5wdXQoKSBpbmRleENvbHVtbiA9IHRydWU7XG4gICAgQElucHV0KCkgaW5kZXhDb2x1bW5IZWFkZXIgPSAnJztcbiAgICBASW5wdXQoKSByb3dDb2xvcnM6IFJvd0NhbGxiYWNrO1xuICAgIEBJbnB1dCgpIHJvd1Rvb2x0aXA6IFJvd0NhbGxiYWNrO1xuICAgIEBJbnB1dCgpIHNlbGVjdENvbHVtbiA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIG11bHRpU2VsZWN0ID0gdHJ1ZTtcbiAgICBASW5wdXQoKSBzdWJzdGl0dXRlUm93cyA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIGV4cGFuZGFibGVSb3dzID0gZmFsc2U7XG4gICAgQElucHV0KCkgdHJhbnNsYXRpb25zOiBEYXRhVGFibGVUcmFuc2xhdGlvbnMgPSBkZWZhdWx0VHJhbnNsYXRpb25zO1xuICAgIEBJbnB1dCgpIHNlbGVjdE9uUm93Q2xpY2sgPSBmYWxzZTtcbiAgICBASW5wdXQoKSBhdXRvUmVsb2FkID0gdHJ1ZTtcbiAgICBASW5wdXQoKSBzaG93UmVsb2FkaW5nID0gdHJ1ZTtcbiAgICBASW5wdXQoKSBub0RhdGFNZXNzYWdlOiBzdHJpbmc7XG4gICAgQElucHV0KCkgc2hvd0NvbHVtblNlbGVjdG9yID0gZmFsc2U7XG4gICAgQElucHV0KCkgYXV0b0hpZGVQYWdpbmcgPSBmYWxzZTtcbiAgICAvLyBVSSBzdGF0ZSB3aXRob3V0IGlucHV0OlxuXG4gICAgaW5kZXhDb2x1bW5WaXNpYmxlOiBib29sZWFuO1xuICAgIHNlbGVjdENvbHVtblZpc2libGU6IGJvb2xlYW47XG4gICAgZXhwYW5kQ29sdW1uVmlzaWJsZTogYm9vbGVhbjtcblxuICAgIC8vIFVJIHN0YXRlOiB2aXNpYmxlIGdlL3NldCBmb3IgdGhlIG91dHNpZGUgd2l0aCBASW5wdXQgZm9yIG9uZS10aW1lIGluaXRpYWwgdmFsdWVzXG5cbiAgICBwcml2YXRlIF9zb3J0Qnk6IHN0cmluZztcbiAgICBwcml2YXRlIF9zb3J0QXNjID0gdHJ1ZTtcblxuICAgIHByaXZhdGUgX29mZnNldCA9IDA7XG4gICAgcHJpdmF0ZSBfbGltaXQgPSAxMDtcbiAgICBwcml2YXRlIHRyYW5zbGF0ZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgQENvbnRlbnRDaGlsZCgnYmFzaWNTZWFyY2gnKSBiYXNpY1NlYXJjaDogVGVtcGxhdGVSZWY8RWxlbWVudFJlZj47XG4gICAgQENvbnRlbnRDaGlsZCgnYWR2YW5jZVNlYXJjaCcpIGFkdmFuY2VTZWFyY2g6IFRlbXBsYXRlUmVmPEVsZW1lbnRSZWY+O1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgc29ydEJ5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc29ydEJ5O1xuICAgIH1cblxuICAgIHNldCBzb3J0QnkodmFsdWUpIHtcbiAgICAgICAgdGhpcy5fc29ydEJ5ID0gdmFsdWU7XG4gICAgICAgIHRoaXMuX3RyaWdnZXJSZWxvYWQoKTtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBzb3J0QXNjKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc29ydEFzYztcbiAgICB9XG5cbiAgICBzZXQgc29ydEFzYyh2YWx1ZSkge1xuICAgICAgICB0aGlzLl9zb3J0QXNjID0gdmFsdWU7XG4gICAgICAgIHRoaXMuX3RyaWdnZXJSZWxvYWQoKTtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBvZmZzZXQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9vZmZzZXQ7XG4gICAgfVxuXG4gICAgc2V0IG9mZnNldCh2YWx1ZSkge1xuICAgICAgICB0aGlzLl9vZmZzZXQgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5fdHJpZ2dlclJlbG9hZCgpO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGxpbWl0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbGltaXQ7XG4gICAgfVxuXG4gICAgc2V0IGxpbWl0KHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX2xpbWl0ID0gdmFsdWU7XG4gICAgICAgIHRoaXMuX3RyaWdnZXJSZWxvYWQoKTtcbiAgICB9XG5cbiAgICAvLyBjYWxjdWxhdGVkIHByb3BlcnR5OlxuXG4gICAgQElucHV0KClcbiAgICBnZXQgcGFnZSgpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IodGhpcy5vZmZzZXQgLyB0aGlzLmxpbWl0KSArIDE7XG4gICAgfVxuXG4gICAgc2V0IHBhZ2UodmFsdWUpIHtcbiAgICAgICAgdGhpcy5vZmZzZXQgPSAodmFsdWUgLSAxKSAqIHRoaXMubGltaXQ7XG4gICAgfVxuXG4gICAgZ2V0IGxhc3RQYWdlKCkge1xuICAgICAgICByZXR1cm4gTWF0aC5jZWlsKHRoaXMuaXRlbUNvdW50IC8gdGhpcy5saW1pdCk7XG4gICAgfVxuXG4gICAgLy8gc2V0dGluZyBtdWx0aXBsZSBvYnNlcnZhYmxlIHByb3BlcnRpZXMgc2ltdWx0YW5lb3VzbHlcblxuICAgIHNvcnQoc29ydEJ5OiBzdHJpbmcsIGFzYzogYm9vbGVhbikge1xuICAgICAgICB0aGlzLnNvcnRCeSA9IHNvcnRCeTtcbiAgICAgICAgdGhpcy5zb3J0QXNjID0gYXNjO1xuICAgIH1cbiAgICBcbiAgICBmaXJzdFBhZ2UoKSB7XG4gICAgICAgIHRoaXMub2Zmc2V0ID0gMDsgXG4gICAgfVxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgdHJhbnNsYXRlOiBUcmFuc2xhdGVTZXJ2aWNlKSB7fVxuXG4gICAgLy8gaW5pdFxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLnRyYW5zbGF0ZVN1YnNjcmlwdGlvbiA9ICB0aGlzLnRyYW5zbGF0ZS5nZXQoW0Nsb3VkVHJhbnNsYXRlU2VydmljZS5HUklEX0tFWV0pLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgICAgICAgY29uc3QgX19yZXNvdXJjZXMgPSByZXNbQ2xvdWRUcmFuc2xhdGVTZXJ2aWNlLkdSSURfS0VZXTtcbiAgICAgICAgICAgIGlmKF9fcmVzb3VyY2VzLnRyYW5zbGF0aW9ucykge1xuICAgICAgICAgICAgICAgIHRoaXMudHJhbnNsYXRpb25zID0gKF9fcmVzb3VyY2VzLnRyYW5zbGF0aW9ucyBhcyBEYXRhVGFibGVUcmFuc2xhdGlvbnMpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRyYW5zbGF0aW9ucyA9IGRlZmF1bHRUcmFuc2xhdGlvbnM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXRoaXMubm9EYXRhTWVzc2FnZSAmJiBfX3Jlc291cmNlcy5lbXB0eU1zZykge1xuICAgICAgICAgICAgICAgIHRoaXMubm9EYXRhTWVzc2FnZSA9IF9fcmVzb3VyY2VzLmVtcHR5TXNnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLl9pbml0RGVmYXVsdFZhbHVlcygpO1xuICAgICAgICB0aGlzLl9pbml0RGVmYXVsdENsaWNrRXZlbnRzKCk7XG4gICAgICAgIHRoaXMuX3VwZGF0ZURpc3BsYXlQYXJhbXMoKTtcblxuICAgICAgICBpZiAodGhpcy5hdXRvUmVsb2FkICYmIHRoaXMuX3NjaGVkdWxlZFJlbG9hZCA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLnJlbG9hZEl0ZW1zKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLnRyYW5zbGF0ZVN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGhpcy50cmFuc2xhdGVTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgcHJpdmF0ZSBfaW5pdERlZmF1bHRWYWx1ZXMoKSB7XG4gICAgICAgIHRoaXMuaW5kZXhDb2x1bW5WaXNpYmxlID0gdGhpcy5pbmRleENvbHVtbjtcbiAgICAgICAgdGhpcy5zZWxlY3RDb2x1bW5WaXNpYmxlID0gdGhpcy5zZWxlY3RDb2x1bW47XG4gICAgICAgIHRoaXMuZXhwYW5kQ29sdW1uVmlzaWJsZSA9IHRoaXMuZXhwYW5kYWJsZVJvd3M7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaW5pdERlZmF1bHRDbGlja0V2ZW50cygpIHtcbiAgICAgICAgdGhpcy5oZWFkZXJDbGljay5zdWJzY3JpYmUodGFibGVFdmVudCA9PiB0aGlzLnNvcnRDb2x1bW4odGFibGVFdmVudC5jb2x1bW4pKTtcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0T25Sb3dDbGljaykge1xuICAgICAgICAgICAgdGhpcy5yb3dDbGljay5zdWJzY3JpYmUodGFibGVFdmVudCA9PiB0YWJsZUV2ZW50LnJvdy5zZWxlY3RlZCA9ICF0YWJsZUV2ZW50LnJvdy5zZWxlY3RlZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBSZWxvYWRpbmc6XG5cbiAgICBfcmVsb2FkaW5nID0gZmFsc2U7XG5cbiAgICBnZXQgcmVsb2FkaW5nKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVsb2FkaW5nO1xuICAgIH1cblxuICAgIEBPdXRwdXQoKSByZWxvYWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICByZWxvYWRJdGVtcygpIHtcbiAgICAgICAgdGhpcy5fcmVsb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZWxvYWQuZW1pdCh0aGlzLl9nZXRSZW1vdGVQYXJhbWV0ZXJzKCkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX29uUmVsb2FkRmluaXNoZWQoKSB7XG4gICAgICAgIHRoaXMuX3VwZGF0ZURpc3BsYXlQYXJhbXMoKTtcblxuICAgICAgICB0aGlzLl9zZWxlY3RBbGxDaGVja2JveCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9yZWxvYWRpbmcgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBfZGlzcGxheVBhcmFtcyA9IDxEYXRhVGFibGVQYXJhbXM+e307IC8vIHBhcmFtcyBvZiB0aGUgbGFzdCBmaW5pc2hlZCByZWxvYWRcblxuICAgIGdldCBkaXNwbGF5UGFyYW1zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGlzcGxheVBhcmFtcztcbiAgICB9XG5cbiAgICBfdXBkYXRlRGlzcGxheVBhcmFtcygpIHtcbiAgICAgICAgdGhpcy5fZGlzcGxheVBhcmFtcyA9IHtcbiAgICAgICAgICAgIHNvcnRCeTogdGhpcy5zb3J0QnksXG4gICAgICAgICAgICBzb3J0QXNjOiB0aGlzLnNvcnRBc2MsXG4gICAgICAgICAgICBvZmZzZXQ6IHRoaXMub2Zmc2V0LFxuICAgICAgICAgICAgbGltaXQ6IHRoaXMubGltaXRcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBfc2NoZWR1bGVkUmVsb2FkID0gbnVsbDtcblxuICAgIC8vIGZvciBhdm9pZGluZyBjYXNjYWRpbmcgcmVsb2FkcyBpZiBtdWx0aXBsZSBwYXJhbXMgYXJlIHNldCBhdCBvbmNlOlxuICAgIF90cmlnZ2VyUmVsb2FkKCkge1xuICAgICAgICBpZiAodGhpcy5fc2NoZWR1bGVkUmVsb2FkKSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5fc2NoZWR1bGVkUmVsb2FkKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9zY2hlZHVsZWRSZWxvYWQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVsb2FkSXRlbXMoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gZXZlbnQgaGFuZGxlcnM6XG5cbiAgICBAT3V0cHV0KCkgcm93Q2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQE91dHB1dCgpIHJvd0RvdWJsZUNsaWNrID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBPdXRwdXQoKSBoZWFkZXJDbGljayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBAT3V0cHV0KCkgY2VsbENsaWNrID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgcHVibGljIHJvd0NsaWNrZWQocm93OiBEYXRhVGFibGVSb3csIGV2ZW50KSB7XG4gICAgICAgIHRoaXMucm93Q2xpY2suZW1pdCh7cm93LCBldmVudH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyByb3dEb3VibGVDbGlja2VkKHJvdzogRGF0YVRhYmxlUm93LCBldmVudCkge1xuICAgICAgICB0aGlzLnJvd0RvdWJsZUNsaWNrLmVtaXQoe3JvdywgZXZlbnR9KTtcbiAgICB9XG5cbiAgICBoZWFkZXJDbGlja2VkKGNvbHVtbjogRGF0YVRhYmxlQ29sdW1uLCBldmVudDogRXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9yZXNpemVJblByb2dyZXNzKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICB0aGlzLmhlYWRlckNsaWNrLmVtaXQoe2NvbHVtbiwgZXZlbnR9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3Jlc2l6ZUluUHJvZ3Jlc3MgPSBmYWxzZTsgLy8gdGhpcyBpcyBiZWNhdXNlIEkgY2FuJ3QgcHJldmVudCBjbGljayBmcm9tIG1vdXN1cCBvZiB0aGUgZHJhZyBlbmRcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgY2VsbENsaWNrZWQoY29sdW1uOiBEYXRhVGFibGVDb2x1bW4sIHJvdzogRGF0YVRhYmxlUm93LCBldmVudDogTW91c2VFdmVudCkge1xuICAgICAgICB0aGlzLmNlbGxDbGljay5lbWl0KHtyb3csIGNvbHVtbiwgZXZlbnR9KTtcbiAgICB9XG5cbiAgICAvLyBmdW5jdGlvbnM6XG5cbiAgICBwcml2YXRlIF9nZXRSZW1vdGVQYXJhbWV0ZXJzKCk6IERhdGFUYWJsZVBhcmFtcyB7XG4gICAgICAgIGxldCBwYXJhbXMgPSA8RGF0YVRhYmxlUGFyYW1zPnt9O1xuXG4gICAgICAgIGlmICh0aGlzLnNvcnRCeSkge1xuICAgICAgICAgICAgcGFyYW1zLnNvcnRCeSA9IHRoaXMuc29ydEJ5O1xuICAgICAgICAgICAgcGFyYW1zLnNvcnRBc2MgPSB0aGlzLnNvcnRBc2M7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucGFnaW5hdGlvbikge1xuICAgICAgICAgICAgcGFyYW1zLm9mZnNldCA9IHRoaXMub2Zmc2V0O1xuICAgICAgICAgICAgcGFyYW1zLmxpbWl0ID0gdGhpcy5saW1pdDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcGFyYW1zO1xuICAgIH1cblxuICAgIHByaXZhdGUgc29ydENvbHVtbihjb2x1bW46IERhdGFUYWJsZUNvbHVtbikge1xuICAgICAgICBpZiAoY29sdW1uLnNvcnRhYmxlKSB7XG4gICAgICAgICAgICBsZXQgYXNjZW5kaW5nID0gdGhpcy5zb3J0QnkgPT09IGNvbHVtbi5wcm9wZXJ0eSA/ICF0aGlzLnNvcnRBc2MgOiB0cnVlO1xuICAgICAgICAgICAgdGhpcy5zb3J0KGNvbHVtbi5wcm9wZXJ0eSwgYXNjZW5kaW5nKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBjb2x1bW5Db3VudCgpIHtcbiAgICAgICAgbGV0IGNvdW50ID0gMDtcbiAgICAgICAgY291bnQgKz0gdGhpcy5pbmRleENvbHVtblZpc2libGUgPyAxIDogMDtcbiAgICAgICAgY291bnQgKz0gdGhpcy5zZWxlY3RDb2x1bW5WaXNpYmxlID8gMSA6IDA7XG4gICAgICAgIGNvdW50ICs9IHRoaXMuZXhwYW5kQ29sdW1uVmlzaWJsZSA/IDEgOiAwO1xuICAgICAgICB0aGlzLmNvbHVtbnMudG9BcnJheSgpLmZvckVhY2goY29sdW1uID0+IHtcbiAgICAgICAgICAgIGNvdW50ICs9IGNvbHVtbi52aXNpYmxlID8gMSA6IDA7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gY291bnQ7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFJvd0NvbG9yKGl0ZW06IGFueSwgaW5kZXg6IG51bWJlciwgcm93OiBEYXRhVGFibGVSb3cpIHtcbiAgICAgICAgaWYgKHRoaXMucm93Q29sb3JzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiAoPFJvd0NhbGxiYWNrPnRoaXMucm93Q29sb3JzKShpdGVtLCByb3csIGluZGV4KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIHNlbGVjdGlvbjpcblxuICAgIHNlbGVjdGVkUm93OiBEYXRhVGFibGVSb3c7XG4gICAgc2VsZWN0ZWRSb3dzOiBEYXRhVGFibGVSb3dbXSA9IFtdO1xuXG4gICAgcHJpdmF0ZSBfc2VsZWN0QWxsQ2hlY2tib3ggPSBmYWxzZTtcblxuICAgIGdldCBzZWxlY3RBbGxDaGVja2JveCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbGVjdEFsbENoZWNrYm94O1xuICAgIH1cblxuICAgIHNldCBzZWxlY3RBbGxDaGVja2JveCh2YWx1ZSkge1xuICAgICAgICB0aGlzLl9zZWxlY3RBbGxDaGVja2JveCA9IHZhbHVlO1xuICAgICAgICB0aGlzLl9vblNlbGVjdEFsbENoYW5nZWQodmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX29uU2VsZWN0QWxsQ2hhbmdlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLnJvd3MudG9BcnJheSgpLmZvckVhY2gocm93ID0+IHJvdy5zZWxlY3RlZCA9IHZhbHVlKTtcbiAgICB9XG5cbiAgICBAT3V0cHV0KCkgc2VsZWN0aW9uQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgb25Sb3dTZWxlY3RDaGFuZ2VkKHNlbGVjdGVkOiBib29sZWFuLCByb3c6IERhdGFUYWJsZVJvdykge1xuICAgICAgICAvLyBtYWludGFpbiB0aGUgc2VsZWN0ZWRSb3cocykgdmlld1xuICAgICAgICBpZiAodGhpcy5tdWx0aVNlbGVjdCkge1xuICAgICAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5zZWxlY3RlZFJvd3MuaW5kZXhPZihyb3cpO1xuICAgICAgICAgICAgaWYgKHJvdy5zZWxlY3RlZCAmJiBpbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkUm93cy5wdXNoKHJvdyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCFyb3cuc2VsZWN0ZWQgJiYgaW5kZXggPj0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRSb3dzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAocm93LnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFJvdyA9IHJvdztcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkUm93cyA9IFtyb3ddO1xuICAgICAgICAgICAgICAgIC8vIHVuc2VsZWN0IGFsbCBvdGhlciByb3dzOlxuICAgICAgICAgICAgICAgIHRoaXMucm93cy50b0FycmF5KCkuZmlsdGVyKHJvd18gPT4gcm93Xy5zZWxlY3RlZCkuZm9yRWFjaChyb3dfID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJvd18gIT09IHJvdykgeyAvLyBhdm9pZCBlbmRsZXNzIGxvb3BcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvd18uc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnNlbGVjdGVkUm93ID09PSByb3cpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkUm93ID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRSb3dzID0gW107XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy9GSVhNRTogcHJldmVudCBzdGlja3kgZXhlY3V0aW9uXG5cbiAgICAgICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2UuZW1pdCh7c2VsZWN0ZWQsIHJvdywgc2VsZWN0ZWRSb3dzOiB0aGlzLnNlbGVjdGVkUm93c30pO1xuXG4gICAgfVxuXG4gICAgQE91dHB1dCgpIGV4cGFuZENsaWNrID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgb25FeHBhbmRDaGFuZ2VkKGV4cGFuZGVkOiBib29sZWFuLCByb3c6IERhdGFUYWJsZVJvdykge1xuICAgICAgICB0aGlzLmV4cGFuZENsaWNrLmVtaXQoe2V4cGFuZGVkLCByb3d9KTtcbiAgICB9XG5cbiAgICAvLyBvdGhlcjpcblxuICAgIGdldCBzdWJzdGl0dXRlSXRlbXMoKSB7XG4gICAgICAgIHJldHVybiBBcnJheS5mcm9tKHtsZW5ndGg6IHRoaXMuZGlzcGxheVBhcmFtcy5saW1pdCAtIHRoaXMuaXRlbXMubGVuZ3RofSk7XG4gICAgfVxuXG4gICAgLy8gY29sdW1uIHJlc2l6aW5nOlxuXG4gICAgcHJpdmF0ZSBfcmVzaXplSW5Qcm9ncmVzcyA9IGZhbHNlO1xuXG4gICAgcmVzaXplQ29sdW1uU3RhcnQoZXZlbnQ6IE1vdXNlRXZlbnQsIGNvbHVtbjogRGF0YVRhYmxlQ29sdW1uLCBjb2x1bW5FbGVtZW50OiBIVE1MRWxlbWVudCkge1xuICAgICAgICB0aGlzLl9yZXNpemVJblByb2dyZXNzID0gdHJ1ZTtcblxuICAgICAgICBkcmFnKGV2ZW50LCB7XG4gICAgICAgICAgICBtb3ZlOiAobW92ZUV2ZW50OiBNb3VzZUV2ZW50LCBkeDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2lzUmVzaXplSW5MaW1pdChjb2x1bW5FbGVtZW50LCBkeCkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uLndpZHRoID0gY29sdW1uRWxlbWVudC5vZmZzZXRXaWR0aCArIGR4O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlc2l6ZUxpbWl0ID0gMzA7XG5cbiAgICBwcml2YXRlIF9pc1Jlc2l6ZUluTGltaXQoY29sdW1uRWxlbWVudDogSFRNTEVsZW1lbnQsIGR4OiBudW1iZXIpIHtcbiAgICAgICAgLyogVGhpcyBpcyBuZWVkZWQgYmVjYXVzZSBDU1MgbWluLXdpZHRoIGRpZG4ndCB3b3JrIG9uIHRhYmxlLWxheW91dDogZml4ZWQuXG4gICAgICAgICBXaXRob3V0IHRoZSBsaW1pdHMsIHJlc2l6aW5nIGNhbiBtYWtlIHRoZSBuZXh0IGNvbHVtbiBkaXNhcHBlYXIgY29tcGxldGVseSxcbiAgICAgICAgIGFuZCBldmVuIGluY3JlYXNlIHRoZSB0YWJsZSB3aWR0aC4gVGhlIGN1cnJlbnQgaW1wbGVtZW50YXRpb24gc3VmZmVycyBmcm9tIHRoZSBmYWN0LFxuICAgICAgICAgdGhhdCBvZmZzZXRXaWR0aCBzb21ldGltZXMgY29udGFpbnMgb3V0LW9mLWRhdGUgdmFsdWVzLiAqL1xuICAgICAgICBpZiAoKGR4IDwgMCAmJiAoY29sdW1uRWxlbWVudC5vZmZzZXRXaWR0aCArIGR4KSA8PSB0aGlzLnJlc2l6ZUxpbWl0KSB8fFxuICAgICAgICAgICAgIWNvbHVtbkVsZW1lbnQubmV4dEVsZW1lbnRTaWJsaW5nIHx8IC8vIHJlc2l6aW5nIGRvZXNuJ3QgbWFrZSBzZW5zZSBmb3IgdGhlIGxhc3QgdmlzaWJsZSBjb2x1bW5cbiAgICAgICAgICAgIChkeCA+PSAwICYmICgoPEhUTUxFbGVtZW50PiBjb2x1bW5FbGVtZW50Lm5leHRFbGVtZW50U2libGluZykub2Zmc2V0V2lkdGggKyBkeCkgPD0gdGhpcy5yZXNpemVMaW1pdCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG59XG4iXX0=