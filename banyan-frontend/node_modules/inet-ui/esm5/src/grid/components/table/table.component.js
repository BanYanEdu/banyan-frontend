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
var DataTable = /** @class */ (function () {
    function DataTable(translate) {
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
    Object.defineProperty(DataTable.prototype, "items", {
        get: /**
         * @return {?}
         */
        function () {
            return this._items;
        },
        set: /**
         * @param {?} items
         * @return {?}
         */
        function (items) {
            this.selectedRows = [];
            this._items = items;
            this._onReloadFinished();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTable.prototype, "sortBy", {
        get: /**
         * @return {?}
         */
        function () {
            return this._sortBy;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._sortBy = value;
            this._triggerReload();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTable.prototype, "sortAsc", {
        get: /**
         * @return {?}
         */
        function () {
            return this._sortAsc;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._sortAsc = value;
            this._triggerReload();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTable.prototype, "offset", {
        get: /**
         * @return {?}
         */
        function () {
            return this._offset;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._offset = value;
            this._triggerReload();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTable.prototype, "limit", {
        get: /**
         * @return {?}
         */
        function () {
            return this._limit;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._limit = value;
            this._triggerReload();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTable.prototype, "page", {
        // calculated property:
        get: 
        // calculated property:
        /**
         * @return {?}
         */
        function () {
            return Math.floor(this.offset / this.limit) + 1;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.offset = (value - 1) * this.limit;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTable.prototype, "lastPage", {
        get: /**
         * @return {?}
         */
        function () {
            return Math.ceil(this.itemCount / this.limit);
        },
        enumerable: true,
        configurable: true
    });
    // setting multiple observable properties simultaneously
    // setting multiple observable properties simultaneously
    /**
     * @param {?} sortBy
     * @param {?} asc
     * @return {?}
     */
    DataTable.prototype.sort = 
    // setting multiple observable properties simultaneously
    /**
     * @param {?} sortBy
     * @param {?} asc
     * @return {?}
     */
    function (sortBy, asc) {
        this.sortBy = sortBy;
        this.sortAsc = asc;
    };
    /**
     * @return {?}
     */
    DataTable.prototype.firstPage = /**
     * @return {?}
     */
    function () {
        this.offset = 0;
    };
    // init
    // init
    /**
     * @return {?}
     */
    DataTable.prototype.ngOnInit = 
    // init
    /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.translateSubscription = this.translate.get([CloudTranslateService.GRID_KEY]).subscribe((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            /** @type {?} */
            var __resources = res[CloudTranslateService.GRID_KEY];
            if (__resources.translations) {
                _this.translations = ((/** @type {?} */ (__resources.translations)));
            }
            else {
                _this.translations = defaultTranslations;
            }
            if (!_this.noDataMessage && __resources.emptyMsg) {
                _this.noDataMessage = __resources.emptyMsg;
            }
        }));
        this._initDefaultValues();
        this._initDefaultClickEvents();
        this._updateDisplayParams();
        if (this.autoReload && this._scheduledReload == null) {
            this.reloadItems();
        }
    };
    /**
     * @return {?}
     */
    DataTable.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.translateSubscription) {
            this.translateSubscription.unsubscribe();
        }
    };
    /**
     * @private
     * @return {?}
     */
    DataTable.prototype._initDefaultValues = /**
     * @private
     * @return {?}
     */
    function () {
        this.indexColumnVisible = this.indexColumn;
        this.selectColumnVisible = this.selectColumn;
        this.expandColumnVisible = this.expandableRows;
    };
    /**
     * @private
     * @return {?}
     */
    DataTable.prototype._initDefaultClickEvents = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.headerClick.subscribe((/**
         * @param {?} tableEvent
         * @return {?}
         */
        function (tableEvent) { return _this.sortColumn(tableEvent.column); }));
        if (this.selectOnRowClick) {
            this.rowClick.subscribe((/**
             * @param {?} tableEvent
             * @return {?}
             */
            function (tableEvent) { return tableEvent.row.selected = !tableEvent.row.selected; }));
        }
    };
    Object.defineProperty(DataTable.prototype, "reloading", {
        get: /**
         * @return {?}
         */
        function () {
            return this._reloading;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DataTable.prototype.reloadItems = /**
     * @return {?}
     */
    function () {
        this._reloading = true;
        this.reload.emit(this._getRemoteParameters());
    };
    /**
     * @private
     * @return {?}
     */
    DataTable.prototype._onReloadFinished = /**
     * @private
     * @return {?}
     */
    function () {
        this._updateDisplayParams();
        this._selectAllCheckbox = false;
        this._reloading = false;
    };
    Object.defineProperty(DataTable.prototype, "displayParams", {
        get: 
        // params of the last finished reload
        /**
         * @return {?}
         */
        function () {
            return this._displayParams;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    DataTable.prototype._updateDisplayParams = /**
     * @return {?}
     */
    function () {
        this._displayParams = {
            sortBy: this.sortBy,
            sortAsc: this.sortAsc,
            offset: this.offset,
            limit: this.limit
        };
    };
    // for avoiding cascading reloads if multiple params are set at once:
    // for avoiding cascading reloads if multiple params are set at once:
    /**
     * @return {?}
     */
    DataTable.prototype._triggerReload = 
    // for avoiding cascading reloads if multiple params are set at once:
    /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this._scheduledReload) {
            clearTimeout(this._scheduledReload);
        }
        this._scheduledReload = setTimeout((/**
         * @return {?}
         */
        function () {
            _this.reloadItems();
        }));
    };
    /**
     * @param {?} row
     * @param {?} event
     * @return {?}
     */
    DataTable.prototype.rowClicked = /**
     * @param {?} row
     * @param {?} event
     * @return {?}
     */
    function (row, event) {
        this.rowClick.emit({ row: row, event: event });
    };
    /**
     * @param {?} row
     * @param {?} event
     * @return {?}
     */
    DataTable.prototype.rowDoubleClicked = /**
     * @param {?} row
     * @param {?} event
     * @return {?}
     */
    function (row, event) {
        this.rowDoubleClick.emit({ row: row, event: event });
    };
    /**
     * @param {?} column
     * @param {?} event
     * @return {?}
     */
    DataTable.prototype.headerClicked = /**
     * @param {?} column
     * @param {?} event
     * @return {?}
     */
    function (column, event) {
        if (!this._resizeInProgress) {
            event.preventDefault();
            event.stopPropagation();
            this.headerClick.emit({ column: column, event: event });
        }
        else {
            this._resizeInProgress = false; // this is because I can't prevent click from mousup of the drag end
        }
    };
    /**
     * @private
     * @param {?} column
     * @param {?} row
     * @param {?} event
     * @return {?}
     */
    DataTable.prototype.cellClicked = /**
     * @private
     * @param {?} column
     * @param {?} row
     * @param {?} event
     * @return {?}
     */
    function (column, row, event) {
        this.cellClick.emit({ row: row, column: column, event: event });
    };
    // functions:
    // functions:
    /**
     * @private
     * @return {?}
     */
    DataTable.prototype._getRemoteParameters = 
    // functions:
    /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var params = (/** @type {?} */ ({}));
        if (this.sortBy) {
            params.sortBy = this.sortBy;
            params.sortAsc = this.sortAsc;
        }
        if (this.pagination) {
            params.offset = this.offset;
            params.limit = this.limit;
        }
        return params;
    };
    /**
     * @private
     * @param {?} column
     * @return {?}
     */
    DataTable.prototype.sortColumn = /**
     * @private
     * @param {?} column
     * @return {?}
     */
    function (column) {
        if (column.sortable) {
            /** @type {?} */
            var ascending = this.sortBy === column.property ? !this.sortAsc : true;
            this.sort(column.property, ascending);
        }
    };
    Object.defineProperty(DataTable.prototype, "columnCount", {
        get: /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var count = 0;
            count += this.indexColumnVisible ? 1 : 0;
            count += this.selectColumnVisible ? 1 : 0;
            count += this.expandColumnVisible ? 1 : 0;
            this.columns.toArray().forEach((/**
             * @param {?} column
             * @return {?}
             */
            function (column) {
                count += column.visible ? 1 : 0;
            }));
            return count;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} item
     * @param {?} index
     * @param {?} row
     * @return {?}
     */
    DataTable.prototype.getRowColor = /**
     * @param {?} item
     * @param {?} index
     * @param {?} row
     * @return {?}
     */
    function (item, index, row) {
        if (this.rowColors !== undefined) {
            return ((/** @type {?} */ (this.rowColors)))(item, row, index);
        }
    };
    Object.defineProperty(DataTable.prototype, "selectAllCheckbox", {
        get: /**
         * @return {?}
         */
        function () {
            return this._selectAllCheckbox;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._selectAllCheckbox = value;
            this._onSelectAllChanged(value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    DataTable.prototype._onSelectAllChanged = /**
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.rows.toArray().forEach((/**
         * @param {?} row
         * @return {?}
         */
        function (row) { return row.selected = value; }));
    };
    /**
     * @param {?} selected
     * @param {?} row
     * @return {?}
     */
    DataTable.prototype.onRowSelectChanged = /**
     * @param {?} selected
     * @param {?} row
     * @return {?}
     */
    function (selected, row) {
        // maintain the selectedRow(s) view
        if (this.multiSelect) {
            /** @type {?} */
            var index = this.selectedRows.indexOf(row);
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
                function (row_) { return row_.selected; })).forEach((/**
                 * @param {?} row_
                 * @return {?}
                 */
                function (row_) {
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
        this.selectionChange.emit({ selected: selected, row: row, selectedRows: this.selectedRows });
    };
    /**
     * @param {?} expanded
     * @param {?} row
     * @return {?}
     */
    DataTable.prototype.onExpandChanged = /**
     * @param {?} expanded
     * @param {?} row
     * @return {?}
     */
    function (expanded, row) {
        this.expandClick.emit({ expanded: expanded, row: row });
    };
    Object.defineProperty(DataTable.prototype, "substituteItems", {
        // other:
        get: 
        // other:
        /**
         * @return {?}
         */
        function () {
            return Array.from({ length: this.displayParams.limit - this.items.length });
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} event
     * @param {?} column
     * @param {?} columnElement
     * @return {?}
     */
    DataTable.prototype.resizeColumnStart = /**
     * @param {?} event
     * @param {?} column
     * @param {?} columnElement
     * @return {?}
     */
    function (event, column, columnElement) {
        var _this = this;
        this._resizeInProgress = true;
        drag(event, {
            move: (/**
             * @param {?} moveEvent
             * @param {?} dx
             * @return {?}
             */
            function (moveEvent, dx) {
                if (_this._isResizeInLimit(columnElement, dx)) {
                    column.width = columnElement.offsetWidth + dx;
                }
            }),
        });
    };
    /**
     * @private
     * @param {?} columnElement
     * @param {?} dx
     * @return {?}
     */
    DataTable.prototype._isResizeInLimit = /**
     * @private
     * @param {?} columnElement
     * @param {?} dx
     * @return {?}
     */
    function (columnElement, dx) {
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
    };
    DataTable.decorators = [
        { type: Component, args: [{
                    moduleId: 'grid-module',
                    selector: 'data-table',
                    template: "<div class=\"data-table-wrapper\">\n    <data-table-header *ngIf=\"header\"></data-table-header>\n\n    <data-table-pagination\n            *ngIf=\"pagination\"\n            [show_range]=\"pagination_range\"\n            [show_limit]=\"pagination_limit\"\n            [show_input]=\"pagination_input\"\n            [show_numbers]=\"pagination_numbers\"\n            [show_column_selector]=\"showColumnSelector\"\n            [autoHide]=\"autoHidePaging\"\n            [basicSearch]=\"basicSearch\"\n            [advanceSearch]=\"advanceSearch\">\n    </data-table-pagination>\n\n    <div class=\"data-table-box\">\n        <table class=\"table table-condensed table-bordered data-table\">\n            <thead>\n            <tr>\n                <th scope=\"col\" [hide]=\"!expandColumnVisible\" class=\"expand-column-header\">\n                <th scope=\"col\" [hide]=\"!indexColumnVisible\" class=\"index-column-header\">\n                    <span [textContent]=\"indexColumnHeader\"></span>\n                </th>\n                <th scope=\"col\" [hide]=\"!selectColumnVisible\" class=\"select-column-header\">\n                    <input [hide]=\"!multiSelect\" type=\"checkbox\" [(ngModel)]=\"selectAllCheckbox\" [attr.aria-label]=\"translations.selectAllRows\" />\n                    <label class=\"mb-0 lbl\"></label>\n                </th>\n                <th scope=\"col\" *ngFor=\"let column of columns\" #th [hide]=\"!column.visible\"\n                    (click)=\"headerClicked(column, $event)\"\n                    (keydown.enter)=\"headerClicked(column, $event)\" (keydown.space)=\"headerClicked(column, $event)\"\n\n                    [class.sortable]=\"column.sortable\" [class.resizable]=\"column.resizable\"\n\n                    [ngClass]=\"column.styleClassObject\" class=\"column-header\" [style.width]=\"column.width | px\"\n\n                    [attr.aria-sort]=\"column.sortable ? (column.property === sortBy ? (sortAsc ? 'ascending' : 'descending') : 'none') : null\"\n                    [attr.tabindex]=\"column.sortable ? '0' : null\">\n                    <span *ngIf=\"!column.headerTemplate\" [textContent]=\"column.header\"></span>\n                    <span *ngIf=\"column.headerTemplate\" [ngTemplateOutlet]=\"column.headerTemplate\" [ngTemplateOutletContext]=\"{column: column}\"></span>\n                    <span class=\"column-sort-icon\" *ngIf=\"column.sortable\">\n                            <span class=\"fa fa-sort column-sortable-icon\" [hide]=\"column.property === sortBy\"></span>\n                            <span [hide]=\"column.property !== sortBy\">\n                                 <span class=\"fa\" [ngClass]=\"{'fa-sort-asc': !sortAsc, 'fa-sort-desc': sortAsc}\"></span>\n                            </span>\n                    </span>\n                    <span *ngIf=\"column.resizable\" class=\"column-resize-handle\" (mousedown)=\"resizeColumnStart($event, column, th)\"></span>\n                </th>\n            </tr>\n            </thead>\n            <tbody *ngFor=\"let item of items; let index=index\" class=\"data-table-row-wrapper\"\n                   dataTableRow #row [item]=\"item\" [index]=\"index\"\n                   (selectedChange)=\"onRowSelectChanged($event, row)\"\n                   (expandedChange)=\"onExpandChanged($event, row)\">\n            </tbody>\n            <tbody *ngIf=\"itemCount === 0 && noDataMessage\">\n            <tr>\n                <td [attr.colspan]=\"columnCount\">{{ noDataMessage }}</td>\n            </tr>\n            </tbody>\n            <tbody class=\"substitute-rows\" *ngIf=\"pagination && substituteRows\">\n            <tr *ngFor=\"let item of substituteItems, let index = index\"\n                [class.row-odd]=\"(index + items.length) % 2 === 0\"\n                [class.row-even]=\"(index + items.length) % 2 === 1\"\n            >\n                <td [hide]=\"!expandColumnVisible\"></td>\n                <td [hide]=\"!indexColumnVisible\">&nbsp;</td>\n                <td [hide]=\"!selectColumnVisible\"></td>\n                <td *ngFor=\"let column of columns\" [hide]=\"!column.visible\">\n            </tr>\n            </tbody>\n        </table>\n\n        <div class=\"loading-cover\" *ngIf=\"showReloading && reloading\"></div>\n    </div>\n</div>\n",
                    styles: [":host /deep/ .data-table.table>tbody+tbody{border-top:none}:host /deep/ .data-table.table td{vertical-align:middle}:host /deep/ .data-table>tbody>tr>td,:host /deep/ .data-table>thead>tr>th{overflow:hidden}:host /deep/ .row-odd{background-color:#f6f6f6}.data-table .substitute-rows>tr:hover,:host /deep/ .data-table .data-table-row:hover{background-color:#ececec}.data-table{box-shadow:0 0 15px #ececec;table-layout:fixed}.column-header{position:relative}.expand-column-header{width:50px}.select-column-header{width:50px;text-align:center}.index-column-header{width:40px;text-align:center}.column-header.sortable{cursor:pointer}.column-header .column-sort-icon{float:right}.column-header.resizable .column-sort-icon{margin-right:8px}.column-header .column-sort-icon .column-sortable-icon{color:#d3d3d3}.column-header .column-resize-handle{position:absolute;top:0;right:0;margin:0;padding:0;width:8px;height:100%;cursor:col-resize}.data-table-box{position:relative}.loading-cover{position:absolute;width:100%;height:100%;background-color:rgba(255,255,255,.3);top:0}@-webkit-keyframes spinner{to{transform:rotate(360deg)}}@keyframes spinner{to{transform:rotate(360deg)}}.loading-cover:before{content:'';box-sizing:border-box;position:absolute;top:50%;left:50%;width:40px;height:40px;border-radius:50%;margin-top:-15px;margin-left:-15px;border:1px solid #ccc;border-top-color:#07d;-webkit-animation:.6s linear infinite spinner;animation:.6s linear infinite spinner}:host /deep/ .data-table.table input[type=checkbox],:host /deep/ .data-table.table input[type=radio]{opacity:0;position:absolute;z-index:12;width:18px;height:18px}:host /deep/ .data-table.table input[type=checkbox]+.lbl::before,:host /deep/ .data-table.table input[type=radio]+.lbl::before{font-family:FontAwesome;font-weight:400;font-size:11px;color:#32a3ce;content:\"\\a0\";display:inline-block;background-color:#fafafa;border:1px solid #ccc;box-shadow:0 1px 2px rgba(0,0,0,.05);border-radius:0;text-align:center;vertical-align:middle;height:13px;line-height:13px;min-width:13px;margin-right:1px}:host /deep/ .data-table.table input[type=checkbox]:active+.lbl::before,:host /deep/ .data-table.table input[type=checkbox]:checked:active+.lbl::before,:host /deep/ .data-table.table input[type=radio]:active+.lbl::before,:host /deep/ .data-table.table input[type=radio]:checked:active+.lbl::before{box-shadow:0 1px 2px rgba(0,0,0,.05),inset 0 1px 3px rgba(0,0,0,.1)}:host /deep/ .data-table.table input[type=checkbox]:checked+.lbl::before,:host /deep/ .data-table.table input[type=radio]:checked+.lbl::before{content:'\\f00c';display:inline-block;content:'\\f00c';background-color:#f5f8fc;border-color:#adb8c0;box-shadow:0 1px 2px rgba(0,0,0,.05),inset 0 -15px 10px -12px rgba(0,0,0,.05),inset 15px 10px -12px rgba(255,255,255,.1)}:host /deep/ .data-table.table input[type=checkbox]+.lbl:hover::before,:host /deep/ .data-table.table input[type=checkbox]:hover+.lbl::before,:host /deep/ .data-table.table input[type=radio]+.lbl:hover::before,:host /deep/ .data-table.table input[type=radio]:hover+.lbl::before{border-color:#ff893c}"]
                }] }
    ];
    /** @nocollapse */
    DataTable.ctorParameters = function () { return [
        { type: TranslateService }
    ]; };
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
    return DataTable;
}());
export { DataTable };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC11aS8iLCJzb3VyY2VzIjpbInNyYy9ncmlkL2NvbXBvbmVudHMvdGFibGUvdGFibGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0gsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLGVBQWUsRUFBRSxTQUFTLEVBQ2xFLFdBQVcsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUMxQyxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFDM0QsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBSWxELE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLHVDQUF1QyxDQUFDO0FBQzFFLE9BQU8sRUFBQyxJQUFJLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUN0QyxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUNyRCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSw0Q0FBNEMsQ0FBQztBQUVqRjtJQXdJSSxtQkFBb0IsU0FBMkI7UUFBM0IsY0FBUyxHQUFULFNBQVMsQ0FBa0I7UUEvSHZDLFdBQU0sR0FBVSxFQUFFLENBQUM7UUF1QmxCLFdBQU0sR0FBRyxLQUFLLENBQUM7UUFDZixlQUFVLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLHFCQUFnQixHQUFHLElBQUksQ0FBQztRQUN4QixxQkFBZ0IsR0FBRyxLQUFLLENBQUM7UUFDekIscUJBQWdCLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLHVCQUFrQixHQUFHLEtBQUssQ0FBQztRQUMzQixnQkFBVyxHQUFHLElBQUksQ0FBQztRQUNuQixzQkFBaUIsR0FBRyxFQUFFLENBQUM7UUFHdkIsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFDckIsZ0JBQVcsR0FBRyxJQUFJLENBQUM7UUFDbkIs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SUFDM0Isa0NBQThCOztJQUM5QixrQ0FBK0I7O0lBQy9CLHVDQUFvQzs7SUFDcEMsbUNBQWdDOztJQUdoQyx1Q0FBNEI7O0lBQzVCLHdDQUE2Qjs7SUFDN0Isd0NBQTZCOzs7OztJQUk3Qiw0QkFBd0I7Ozs7O0lBQ3hCLDZCQUF3Qjs7Ozs7SUFFeEIsNEJBQW9COzs7OztJQUNwQiwyQkFBb0I7Ozs7O0lBQ3BCLDBDQUE0Qzs7SUFFNUMsZ0NBQWtFOztJQUNsRSxrQ0FBc0U7O0lBaUh0RSwrQkFBbUI7O0lBTW5CLDJCQUFzQzs7SUFjdEMsbUNBQXFDOztJQWVyQyxxQ0FBd0I7O0lBY3hCLDZCQUF3Qzs7SUFDeEMsbUNBQThDOztJQUM5QyxnQ0FBMkM7O0lBQzNDLDhCQUF5Qzs7SUFrRXpDLGdDQUEwQjs7SUFDMUIsaUNBQWtDOzs7OztJQUVsQyx1Q0FBbUM7O0lBZW5DLG9DQUErQzs7SUFnQy9DLGdDQUEyQzs7Ozs7SUFjM0Msc0NBQWtDOztJQWNsQyxnQ0FBaUI7Ozs7O0lBbFBMLDhCQUFtQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQ29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIENvbnRlbnRDaGlsZHJlbiwgUXVlcnlMaXN0LFxuICAgIFRlbXBsYXRlUmVmLCBDb250ZW50Q2hpbGQsIFZpZXdDaGlsZHJlbiwgT25Jbml0LCBPbkRlc3Ryb3ksIEVsZW1lbnRSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0RhdGFUYWJsZUNvbHVtbn0gZnJvbSAnLi4vY29sdW1uL2NvbHVtbi5jb21wb25lbnQnO1xuaW1wb3J0IHtEYXRhVGFibGVSb3d9IGZyb20gJy4uL3Jvdy9yb3cuY29tcG9uZW50JztcbmltcG9ydCB7RGF0YVRhYmxlUGFyYW1zfSBmcm9tICcuLi8uLi90eXBlcy9kYXRhLXRhYmxlLXBhcmFtcy50eXBlJztcbmltcG9ydCB7Um93Q2FsbGJhY2t9IGZyb20gJy4uLy4uL3R5cGVzL3Jvdy1jYWxsYmFjay50eXBlJztcbmltcG9ydCB7RGF0YVRhYmxlVHJhbnNsYXRpb25zfSBmcm9tICcuLi8uLi90eXBlcy9kYXRhLXRhYmxlLXRyYW5zbGF0aW9ucy50eXBlJztcbmltcG9ydCB7ZGVmYXVsdFRyYW5zbGF0aW9uc30gZnJvbSAnLi4vLi4vdHlwZXMvZGVmYXVsdC10cmFuc2xhdGlvbnMudHlwZSc7XG5pbXBvcnQge2RyYWd9IGZyb20gJy4uLy4uL3V0aWxzL2RyYWcnO1xuaW1wb3J0IHtUcmFuc2xhdGVTZXJ2aWNlfSBmcm9tIFwiQG5neC10cmFuc2xhdGUvY29yZVwiO1xuaW1wb3J0IHtDbG91ZFRyYW5zbGF0ZVNlcnZpY2V9IGZyb20gXCIuLi8uLi8uLi90cmFuc2xhdGUvY2xvdWQtdHJhbnNsYXRlLnNlcnZpY2VcIjtcbmltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tIFwicnhqc1wiO1xuQENvbXBvbmVudCh7XG4gICAgbW9kdWxlSWQ6ICdncmlkLW1vZHVsZScsXG4gICAgc2VsZWN0b3I6ICdkYXRhLXRhYmxlJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vdGFibGUuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3RhYmxlLmNvbXBvbmVudC5jc3MnXVxufSlcblxuZXhwb3J0IGNsYXNzIERhdGFUYWJsZSBpbXBsZW1lbnRzIERhdGFUYWJsZVBhcmFtcywgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgcHJpdmF0ZSBfaXRlbXM6IGFueVtdID0gW107XG5cbiAgICBASW5wdXQoKSBnZXQgaXRlbXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pdGVtcztcbiAgICB9XG5cbiAgICBzZXQgaXRlbXMoaXRlbXM6IGFueVtdKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRSb3dzID0gW107XG4gICAgICAgIHRoaXMuX2l0ZW1zID0gaXRlbXM7XG4gICAgICAgIHRoaXMuX29uUmVsb2FkRmluaXNoZWQoKTtcbiAgICB9XG5cbiAgICBASW5wdXQoKSBpdGVtQ291bnQ6IG51bWJlcjtcblxuICAgIC8vIFVJIGNvbXBvbmVudHM6XG5cbiAgICBAQ29udGVudENoaWxkcmVuKERhdGFUYWJsZUNvbHVtbikgY29sdW1uczogUXVlcnlMaXN0PERhdGFUYWJsZUNvbHVtbj47XG4gICAgQFZpZXdDaGlsZHJlbihEYXRhVGFibGVSb3cpIHJvd3M6IFF1ZXJ5TGlzdDxEYXRhVGFibGVSb3c+O1xuICAgIEBDb250ZW50Q2hpbGQoJ2RhdGFUYWJsZUV4cGFuZCcpIGV4cGFuZFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgLy8gT25lLXRpbWUgb3B0aW9uYWwgYmluZGluZ3Mgd2l0aCBkZWZhdWx0IHZhbHVlczpcblxuICAgIEBJbnB1dCgpIGhlYWRlclRpdGxlOiBzdHJpbmc7XG4gICAgQElucHV0KCkgaGVhZGVyID0gZmFsc2U7XG4gICAgQElucHV0KCkgcGFnaW5hdGlvbiA9IHRydWU7XG4gICAgQElucHV0KCkgcGFnaW5hdGlvbl9yYW5nZSA9IHRydWU7XG4gICAgQElucHV0KCkgcGFnaW5hdGlvbl9saW1pdCA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIHBhZ2luYXRpb25faW5wdXQgPSB0cnVlO1xuICAgIEBJbnB1dCgpIHBhZ2luYXRpb25fbnVtYmVycyA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIGluZGV4Q29sdW1uID0gdHJ1ZTtcbiAgICBASW5wdXQoKSBpbmRleENvbHVtbkhlYWRlciA9ICcnO1xuICAgIEBJbnB1dCgpIHJvd0NvbG9yczogUm93Q2FsbGJhY2s7XG4gICAgQElucHV0KCkgcm93VG9vbHRpcDogUm93Q2FsbGJhY2s7XG4gICAgQElucHV0KCkgc2VsZWN0Q29sdW1uID0gZmFsc2U7XG4gICAgQElucHV0KCkgbXVsdGlTZWxlY3QgPSB0cnVlO1xuICAgIEBJbnB1dCgpIHN1YnN0aXR1dGVSb3dzID0gZmFsc2U7XG4gICAgQElucHV0KCkgZXhwYW5kYWJsZVJvd3MgPSBmYWxzZTtcbiAgICBASW5wdXQoKSB0cmFuc2xhdGlvbnM6IERhdGFUYWJsZVRyYW5zbGF0aW9ucyA9IGRlZmF1bHRUcmFuc2xhdGlvbnM7XG4gICAgQElucHV0KCkgc2VsZWN0T25Sb3dDbGljayA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIGF1dG9SZWxvYWQgPSB0cnVlO1xuICAgIEBJbnB1dCgpIHNob3dSZWxvYWRpbmcgPSB0cnVlO1xuICAgIEBJbnB1dCgpIG5vRGF0YU1lc3NhZ2U6IHN0cmluZztcbiAgICBASW5wdXQoKSBzaG93Q29sdW1uU2VsZWN0b3IgPSBmYWxzZTtcbiAgICBASW5wdXQoKSBhdXRvSGlkZVBhZ2luZyA9IGZhbHNlO1xuICAgIC8vIFVJIHN0YXRlIHdpdGhvdXQgaW5wdXQ6XG5cbiAgICBpbmRleENvbHVtblZpc2libGU6IGJvb2xlYW47XG4gICAgc2VsZWN0Q29sdW1uVmlzaWJsZTogYm9vbGVhbjtcbiAgICBleHBhbmRDb2x1bW5WaXNpYmxlOiBib29sZWFuO1xuXG4gICAgLy8gVUkgc3RhdGU6IHZpc2libGUgZ2Uvc2V0IGZvciB0aGUgb3V0c2lkZSB3aXRoIEBJbnB1dCBmb3Igb25lLXRpbWUgaW5pdGlhbCB2YWx1ZXNcblxuICAgIHByaXZhdGUgX3NvcnRCeTogc3RyaW5nO1xuICAgIHByaXZhdGUgX3NvcnRBc2MgPSB0cnVlO1xuXG4gICAgcHJpdmF0ZSBfb2Zmc2V0ID0gMDtcbiAgICBwcml2YXRlIF9saW1pdCA9IDEwO1xuICAgIHByaXZhdGUgdHJhbnNsYXRlU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgICBAQ29udGVudENoaWxkKCdiYXNpY1NlYXJjaCcpIGJhc2ljU2VhcmNoOiBUZW1wbGF0ZVJlZjxFbGVtZW50UmVmPjtcbiAgICBAQ29udGVudENoaWxkKCdhZHZhbmNlU2VhcmNoJykgYWR2YW5jZVNlYXJjaDogVGVtcGxhdGVSZWY8RWxlbWVudFJlZj47XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBzb3J0QnkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zb3J0Qnk7XG4gICAgfVxuXG4gICAgc2V0IHNvcnRCeSh2YWx1ZSkge1xuICAgICAgICB0aGlzLl9zb3J0QnkgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5fdHJpZ2dlclJlbG9hZCgpO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHNvcnRBc2MoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zb3J0QXNjO1xuICAgIH1cblxuICAgIHNldCBzb3J0QXNjKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX3NvcnRBc2MgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5fdHJpZ2dlclJlbG9hZCgpO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IG9mZnNldCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX29mZnNldDtcbiAgICB9XG5cbiAgICBzZXQgb2Zmc2V0KHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX29mZnNldCA9IHZhbHVlO1xuICAgICAgICB0aGlzLl90cmlnZ2VyUmVsb2FkKCk7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBnZXQgbGltaXQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9saW1pdDtcbiAgICB9XG5cbiAgICBzZXQgbGltaXQodmFsdWUpIHtcbiAgICAgICAgdGhpcy5fbGltaXQgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5fdHJpZ2dlclJlbG9hZCgpO1xuICAgIH1cblxuICAgIC8vIGNhbGN1bGF0ZWQgcHJvcGVydHk6XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBwYWdlKCkge1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcih0aGlzLm9mZnNldCAvIHRoaXMubGltaXQpICsgMTtcbiAgICB9XG5cbiAgICBzZXQgcGFnZSh2YWx1ZSkge1xuICAgICAgICB0aGlzLm9mZnNldCA9ICh2YWx1ZSAtIDEpICogdGhpcy5saW1pdDtcbiAgICB9XG5cbiAgICBnZXQgbGFzdFBhZ2UoKSB7XG4gICAgICAgIHJldHVybiBNYXRoLmNlaWwodGhpcy5pdGVtQ291bnQgLyB0aGlzLmxpbWl0KTtcbiAgICB9XG5cbiAgICAvLyBzZXR0aW5nIG11bHRpcGxlIG9ic2VydmFibGUgcHJvcGVydGllcyBzaW11bHRhbmVvdXNseVxuXG4gICAgc29ydChzb3J0Qnk6IHN0cmluZywgYXNjOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuc29ydEJ5ID0gc29ydEJ5O1xuICAgICAgICB0aGlzLnNvcnRBc2MgPSBhc2M7XG4gICAgfVxuICAgIFxuICAgIGZpcnN0UGFnZSgpIHtcbiAgICAgICAgdGhpcy5vZmZzZXQgPSAwOyBcbiAgICB9XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSB0cmFuc2xhdGU6IFRyYW5zbGF0ZVNlcnZpY2UpIHt9XG5cbiAgICAvLyBpbml0XG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMudHJhbnNsYXRlU3Vic2NyaXB0aW9uID0gIHRoaXMudHJhbnNsYXRlLmdldChbQ2xvdWRUcmFuc2xhdGVTZXJ2aWNlLkdSSURfS0VZXSkuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICAgICAgICBjb25zdCBfX3Jlc291cmNlcyA9IHJlc1tDbG91ZFRyYW5zbGF0ZVNlcnZpY2UuR1JJRF9LRVldO1xuICAgICAgICAgICAgaWYoX19yZXNvdXJjZXMudHJhbnNsYXRpb25zKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50cmFuc2xhdGlvbnMgPSAoX19yZXNvdXJjZXMudHJhbnNsYXRpb25zIGFzIERhdGFUYWJsZVRyYW5zbGF0aW9ucyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMudHJhbnNsYXRpb25zID0gZGVmYXVsdFRyYW5zbGF0aW9ucztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghdGhpcy5ub0RhdGFNZXNzYWdlICYmIF9fcmVzb3VyY2VzLmVtcHR5TXNnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ub0RhdGFNZXNzYWdlID0gX19yZXNvdXJjZXMuZW1wdHlNc2c7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuX2luaXREZWZhdWx0VmFsdWVzKCk7XG4gICAgICAgIHRoaXMuX2luaXREZWZhdWx0Q2xpY2tFdmVudHMoKTtcbiAgICAgICAgdGhpcy5fdXBkYXRlRGlzcGxheVBhcmFtcygpO1xuXG4gICAgICAgIGlmICh0aGlzLmF1dG9SZWxvYWQgJiYgdGhpcy5fc2NoZWR1bGVkUmVsb2FkID09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMucmVsb2FkSXRlbXMoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMudHJhbnNsYXRlU3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnRyYW5zbGF0ZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBwcml2YXRlIF9pbml0RGVmYXVsdFZhbHVlcygpIHtcbiAgICAgICAgdGhpcy5pbmRleENvbHVtblZpc2libGUgPSB0aGlzLmluZGV4Q29sdW1uO1xuICAgICAgICB0aGlzLnNlbGVjdENvbHVtblZpc2libGUgPSB0aGlzLnNlbGVjdENvbHVtbjtcbiAgICAgICAgdGhpcy5leHBhbmRDb2x1bW5WaXNpYmxlID0gdGhpcy5leHBhbmRhYmxlUm93cztcbiAgICB9XG5cbiAgICBwcml2YXRlIF9pbml0RGVmYXVsdENsaWNrRXZlbnRzKCkge1xuICAgICAgICB0aGlzLmhlYWRlckNsaWNrLnN1YnNjcmliZSh0YWJsZUV2ZW50ID0+IHRoaXMuc29ydENvbHVtbih0YWJsZUV2ZW50LmNvbHVtbikpO1xuICAgICAgICBpZiAodGhpcy5zZWxlY3RPblJvd0NsaWNrKSB7XG4gICAgICAgICAgICB0aGlzLnJvd0NsaWNrLnN1YnNjcmliZSh0YWJsZUV2ZW50ID0+IHRhYmxlRXZlbnQucm93LnNlbGVjdGVkID0gIXRhYmxlRXZlbnQucm93LnNlbGVjdGVkKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJlbG9hZGluZzpcblxuICAgIF9yZWxvYWRpbmcgPSBmYWxzZTtcblxuICAgIGdldCByZWxvYWRpbmcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZWxvYWRpbmc7XG4gICAgfVxuXG4gICAgQE91dHB1dCgpIHJlbG9hZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIHJlbG9hZEl0ZW1zKCkge1xuICAgICAgICB0aGlzLl9yZWxvYWRpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlbG9hZC5lbWl0KHRoaXMuX2dldFJlbW90ZVBhcmFtZXRlcnMoKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfb25SZWxvYWRGaW5pc2hlZCgpIHtcbiAgICAgICAgdGhpcy5fdXBkYXRlRGlzcGxheVBhcmFtcygpO1xuXG4gICAgICAgIHRoaXMuX3NlbGVjdEFsbENoZWNrYm94ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX3JlbG9hZGluZyA9IGZhbHNlO1xuICAgIH1cblxuICAgIF9kaXNwbGF5UGFyYW1zID0gPERhdGFUYWJsZVBhcmFtcz57fTsgLy8gcGFyYW1zIG9mIHRoZSBsYXN0IGZpbmlzaGVkIHJlbG9hZFxuXG4gICAgZ2V0IGRpc3BsYXlQYXJhbXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaXNwbGF5UGFyYW1zO1xuICAgIH1cblxuICAgIF91cGRhdGVEaXNwbGF5UGFyYW1zKCkge1xuICAgICAgICB0aGlzLl9kaXNwbGF5UGFyYW1zID0ge1xuICAgICAgICAgICAgc29ydEJ5OiB0aGlzLnNvcnRCeSxcbiAgICAgICAgICAgIHNvcnRBc2M6IHRoaXMuc29ydEFzYyxcbiAgICAgICAgICAgIG9mZnNldDogdGhpcy5vZmZzZXQsXG4gICAgICAgICAgICBsaW1pdDogdGhpcy5saW1pdFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIF9zY2hlZHVsZWRSZWxvYWQgPSBudWxsO1xuXG4gICAgLy8gZm9yIGF2b2lkaW5nIGNhc2NhZGluZyByZWxvYWRzIGlmIG11bHRpcGxlIHBhcmFtcyBhcmUgc2V0IGF0IG9uY2U6XG4gICAgX3RyaWdnZXJSZWxvYWQoKSB7XG4gICAgICAgIGlmICh0aGlzLl9zY2hlZHVsZWRSZWxvYWQpIHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLl9zY2hlZHVsZWRSZWxvYWQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3NjaGVkdWxlZFJlbG9hZCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZWxvYWRJdGVtcygpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBldmVudCBoYW5kbGVyczpcblxuICAgIEBPdXRwdXQoKSByb3dDbGljayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBAT3V0cHV0KCkgcm93RG91YmxlQ2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQE91dHB1dCgpIGhlYWRlckNsaWNrID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBPdXRwdXQoKSBjZWxsQ2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBwdWJsaWMgcm93Q2xpY2tlZChyb3c6IERhdGFUYWJsZVJvdywgZXZlbnQpIHtcbiAgICAgICAgdGhpcy5yb3dDbGljay5lbWl0KHtyb3csIGV2ZW50fSk7XG4gICAgfVxuXG4gICAgcHVibGljIHJvd0RvdWJsZUNsaWNrZWQocm93OiBEYXRhVGFibGVSb3csIGV2ZW50KSB7XG4gICAgICAgIHRoaXMucm93RG91YmxlQ2xpY2suZW1pdCh7cm93LCBldmVudH0pO1xuICAgIH1cblxuICAgIGhlYWRlckNsaWNrZWQoY29sdW1uOiBEYXRhVGFibGVDb2x1bW4sIGV2ZW50OiBFdmVudCkge1xuICAgICAgICBpZiAoIXRoaXMuX3Jlc2l6ZUluUHJvZ3Jlc3MpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIHRoaXMuaGVhZGVyQ2xpY2suZW1pdCh7Y29sdW1uLCBldmVudH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fcmVzaXplSW5Qcm9ncmVzcyA9IGZhbHNlOyAvLyB0aGlzIGlzIGJlY2F1c2UgSSBjYW4ndCBwcmV2ZW50IGNsaWNrIGZyb20gbW91c3VwIG9mIHRoZSBkcmFnIGVuZFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjZWxsQ2xpY2tlZChjb2x1bW46IERhdGFUYWJsZUNvbHVtbiwgcm93OiBEYXRhVGFibGVSb3csIGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgICAgIHRoaXMuY2VsbENsaWNrLmVtaXQoe3JvdywgY29sdW1uLCBldmVudH0pO1xuICAgIH1cblxuICAgIC8vIGZ1bmN0aW9uczpcblxuICAgIHByaXZhdGUgX2dldFJlbW90ZVBhcmFtZXRlcnMoKTogRGF0YVRhYmxlUGFyYW1zIHtcbiAgICAgICAgbGV0IHBhcmFtcyA9IDxEYXRhVGFibGVQYXJhbXM+e307XG5cbiAgICAgICAgaWYgKHRoaXMuc29ydEJ5KSB7XG4gICAgICAgICAgICBwYXJhbXMuc29ydEJ5ID0gdGhpcy5zb3J0Qnk7XG4gICAgICAgICAgICBwYXJhbXMuc29ydEFzYyA9IHRoaXMuc29ydEFzYztcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5wYWdpbmF0aW9uKSB7XG4gICAgICAgICAgICBwYXJhbXMub2Zmc2V0ID0gdGhpcy5vZmZzZXQ7XG4gICAgICAgICAgICBwYXJhbXMubGltaXQgPSB0aGlzLmxpbWl0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwYXJhbXM7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzb3J0Q29sdW1uKGNvbHVtbjogRGF0YVRhYmxlQ29sdW1uKSB7XG4gICAgICAgIGlmIChjb2x1bW4uc29ydGFibGUpIHtcbiAgICAgICAgICAgIGxldCBhc2NlbmRpbmcgPSB0aGlzLnNvcnRCeSA9PT0gY29sdW1uLnByb3BlcnR5ID8gIXRoaXMuc29ydEFzYyA6IHRydWU7XG4gICAgICAgICAgICB0aGlzLnNvcnQoY29sdW1uLnByb3BlcnR5LCBhc2NlbmRpbmcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IGNvbHVtbkNvdW50KCkge1xuICAgICAgICBsZXQgY291bnQgPSAwO1xuICAgICAgICBjb3VudCArPSB0aGlzLmluZGV4Q29sdW1uVmlzaWJsZSA/IDEgOiAwO1xuICAgICAgICBjb3VudCArPSB0aGlzLnNlbGVjdENvbHVtblZpc2libGUgPyAxIDogMDtcbiAgICAgICAgY291bnQgKz0gdGhpcy5leHBhbmRDb2x1bW5WaXNpYmxlID8gMSA6IDA7XG4gICAgICAgIHRoaXMuY29sdW1ucy50b0FycmF5KCkuZm9yRWFjaChjb2x1bW4gPT4ge1xuICAgICAgICAgICAgY291bnQgKz0gY29sdW1uLnZpc2libGUgPyAxIDogMDtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBjb3VudDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0Um93Q29sb3IoaXRlbTogYW55LCBpbmRleDogbnVtYmVyLCByb3c6IERhdGFUYWJsZVJvdykge1xuICAgICAgICBpZiAodGhpcy5yb3dDb2xvcnMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuICg8Um93Q2FsbGJhY2s+dGhpcy5yb3dDb2xvcnMpKGl0ZW0sIHJvdywgaW5kZXgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gc2VsZWN0aW9uOlxuXG4gICAgc2VsZWN0ZWRSb3c6IERhdGFUYWJsZVJvdztcbiAgICBzZWxlY3RlZFJvd3M6IERhdGFUYWJsZVJvd1tdID0gW107XG5cbiAgICBwcml2YXRlIF9zZWxlY3RBbGxDaGVja2JveCA9IGZhbHNlO1xuXG4gICAgZ2V0IHNlbGVjdEFsbENoZWNrYm94KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VsZWN0QWxsQ2hlY2tib3g7XG4gICAgfVxuXG4gICAgc2V0IHNlbGVjdEFsbENoZWNrYm94KHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX3NlbGVjdEFsbENoZWNrYm94ID0gdmFsdWU7XG4gICAgICAgIHRoaXMuX29uU2VsZWN0QWxsQ2hhbmdlZCh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfb25TZWxlY3RBbGxDaGFuZ2VkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMucm93cy50b0FycmF5KCkuZm9yRWFjaChyb3cgPT4gcm93LnNlbGVjdGVkID0gdmFsdWUpO1xuICAgIH1cblxuICAgIEBPdXRwdXQoKSBzZWxlY3Rpb25DaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBvblJvd1NlbGVjdENoYW5nZWQoc2VsZWN0ZWQ6IGJvb2xlYW4sIHJvdzogRGF0YVRhYmxlUm93KSB7XG4gICAgICAgIC8vIG1haW50YWluIHRoZSBzZWxlY3RlZFJvdyhzKSB2aWV3XG4gICAgICAgIGlmICh0aGlzLm11bHRpU2VsZWN0KSB7XG4gICAgICAgICAgICBsZXQgaW5kZXggPSB0aGlzLnNlbGVjdGVkUm93cy5pbmRleE9mKHJvdyk7XG4gICAgICAgICAgICBpZiAocm93LnNlbGVjdGVkICYmIGluZGV4IDwgMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRSb3dzLnB1c2gocm93KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIXJvdy5zZWxlY3RlZCAmJiBpbmRleCA+PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFJvd3Muc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChyb3cuc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkUm93ID0gcm93O1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRSb3dzID0gW3Jvd107XG4gICAgICAgICAgICAgICAgLy8gdW5zZWxlY3QgYWxsIG90aGVyIHJvd3M6XG4gICAgICAgICAgICAgICAgdGhpcy5yb3dzLnRvQXJyYXkoKS5maWx0ZXIocm93XyA9PiByb3dfLnNlbGVjdGVkKS5mb3JFYWNoKHJvd18gPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAocm93XyAhPT0gcm93KSB7IC8vIGF2b2lkIGVuZGxlc3MgbG9vcFxuICAgICAgICAgICAgICAgICAgICAgICAgcm93Xy5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc2VsZWN0ZWRSb3cgPT09IHJvdykge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRSb3cgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFJvd3MgPSBbXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvL0ZJWE1FOiBwcmV2ZW50IHN0aWNreSBleGVjdXRpb25cblxuICAgICAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KHtzZWxlY3RlZCwgcm93LCBzZWxlY3RlZFJvd3M6IHRoaXMuc2VsZWN0ZWRSb3dzfSk7XG5cbiAgICB9XG5cbiAgICBAT3V0cHV0KCkgZXhwYW5kQ2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBvbkV4cGFuZENoYW5nZWQoZXhwYW5kZWQ6IGJvb2xlYW4sIHJvdzogRGF0YVRhYmxlUm93KSB7XG4gICAgICAgIHRoaXMuZXhwYW5kQ2xpY2suZW1pdCh7ZXhwYW5kZWQsIHJvd30pO1xuICAgIH1cblxuICAgIC8vIG90aGVyOlxuXG4gICAgZ2V0IHN1YnN0aXR1dGVJdGVtcygpIHtcbiAgICAgICAgcmV0dXJuIEFycmF5LmZyb20oe2xlbmd0aDogdGhpcy5kaXNwbGF5UGFyYW1zLmxpbWl0IC0gdGhpcy5pdGVtcy5sZW5ndGh9KTtcbiAgICB9XG5cbiAgICAvLyBjb2x1bW4gcmVzaXppbmc6XG5cbiAgICBwcml2YXRlIF9yZXNpemVJblByb2dyZXNzID0gZmFsc2U7XG5cbiAgICByZXNpemVDb2x1bW5TdGFydChldmVudDogTW91c2VFdmVudCwgY29sdW1uOiBEYXRhVGFibGVDb2x1bW4sIGNvbHVtbkVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XG4gICAgICAgIHRoaXMuX3Jlc2l6ZUluUHJvZ3Jlc3MgPSB0cnVlO1xuXG4gICAgICAgIGRyYWcoZXZlbnQsIHtcbiAgICAgICAgICAgIG1vdmU6IChtb3ZlRXZlbnQ6IE1vdXNlRXZlbnQsIGR4OiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5faXNSZXNpemVJbkxpbWl0KGNvbHVtbkVsZW1lbnQsIGR4KSkge1xuICAgICAgICAgICAgICAgICAgICBjb2x1bW4ud2lkdGggPSBjb2x1bW5FbGVtZW50Lm9mZnNldFdpZHRoICsgZHg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVzaXplTGltaXQgPSAzMDtcblxuICAgIHByaXZhdGUgX2lzUmVzaXplSW5MaW1pdChjb2x1bW5FbGVtZW50OiBIVE1MRWxlbWVudCwgZHg6IG51bWJlcikge1xuICAgICAgICAvKiBUaGlzIGlzIG5lZWRlZCBiZWNhdXNlIENTUyBtaW4td2lkdGggZGlkbid0IHdvcmsgb24gdGFibGUtbGF5b3V0OiBmaXhlZC5cbiAgICAgICAgIFdpdGhvdXQgdGhlIGxpbWl0cywgcmVzaXppbmcgY2FuIG1ha2UgdGhlIG5leHQgY29sdW1uIGRpc2FwcGVhciBjb21wbGV0ZWx5LFxuICAgICAgICAgYW5kIGV2ZW4gaW5jcmVhc2UgdGhlIHRhYmxlIHdpZHRoLiBUaGUgY3VycmVudCBpbXBsZW1lbnRhdGlvbiBzdWZmZXJzIGZyb20gdGhlIGZhY3QsXG4gICAgICAgICB0aGF0IG9mZnNldFdpZHRoIHNvbWV0aW1lcyBjb250YWlucyBvdXQtb2YtZGF0ZSB2YWx1ZXMuICovXG4gICAgICAgIGlmICgoZHggPCAwICYmIChjb2x1bW5FbGVtZW50Lm9mZnNldFdpZHRoICsgZHgpIDw9IHRoaXMucmVzaXplTGltaXQpIHx8XG4gICAgICAgICAgICAhY29sdW1uRWxlbWVudC5uZXh0RWxlbWVudFNpYmxpbmcgfHwgLy8gcmVzaXppbmcgZG9lc24ndCBtYWtlIHNlbnNlIGZvciB0aGUgbGFzdCB2aXNpYmxlIGNvbHVtblxuICAgICAgICAgICAgKGR4ID49IDAgJiYgKCg8SFRNTEVsZW1lbnQ+IGNvbHVtbkVsZW1lbnQubmV4dEVsZW1lbnRTaWJsaW5nKS5vZmZzZXRXaWR0aCArIGR4KSA8PSB0aGlzLnJlc2l6ZUxpbWl0KSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbn1cbiJdfQ==