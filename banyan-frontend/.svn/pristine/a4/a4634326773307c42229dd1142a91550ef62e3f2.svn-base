/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
var PaginationListComponent = /** @class */ (function () {
    function PaginationListComponent() {
        this.changePage = new EventEmitter();
        this.load = new EventEmitter();
        this.itemsPage = [];
        this.startNumber = 0;
        this.endNumber = 0;
        this.totalPage = 0;
    }
    /**
     * @return {?}
     */
    PaginationListComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @return {?}
     */
    PaginationListComponent.prototype.loadPagination = /**
     * @return {?}
     */
    function () {
        var _this = this;
        setTimeout((/**
         * @return {?}
         */
        function () {
            _this.getItemsPage();
        }), 50);
    };
    /**
     * @return {?}
     */
    PaginationListComponent.prototype.getItemsPage = /**
     * @return {?}
     */
    function () {
        if (this.total === 0) {
            this.startNumber = 0;
            this.endNumber = 0;
            this.page = 0;
            this.itemsPage = [];
        }
        else {
            if (this.page === 0) {
                this.page++;
            }
            /** @type {?} */
            var totalPage = this.page * this.limit;
            this.startNumber = totalPage - this.limit + 1;
            this.endNumber = totalPage > this.total ? this.total : (this.startNumber + this.limit - 1);
            if (this.page === 1)
                this.itemsPage = this.items.slice(0, totalPage > this.total ? this.total : (this.startNumber + this.limit - 1));
            else {
                this.itemsPage = this.items.slice(this.startNumber - 1, this.endNumber);
            }
        }
        this.totalPage = Math.ceil(this.total / this.limit);
        this.changePage.emit({
            page: this.page,
            items: this.itemsPage
        });
    };
    /**
     * @return {?}
     */
    PaginationListComponent.prototype.prevPage = /**
     * @return {?}
     */
    function () {
        if (this.page > 1) {
            this.page--;
            this.getItemsPage();
        }
    };
    /**
     * @return {?}
     */
    PaginationListComponent.prototype.prevFirstPage = /**
     * @return {?}
     */
    function () {
        if (this.page !== 1) {
            this.page = 1;
            this.getItemsPage();
        }
    };
    /**
     * @return {?}
     */
    PaginationListComponent.prototype.nextPage = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var maxPage = Math.ceil(this.total / this.limit);
        if (this.page < maxPage) {
            this.page++;
            this.getItemsPage();
        }
    };
    /**
     * @return {?}
     */
    PaginationListComponent.prototype.nextLastPage = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var maxPage = Math.ceil(this.total / this.limit);
        if (this.page !== maxPage) {
            this.page = maxPage;
            this.getItemsPage();
        }
    };
    /**
     * @return {?}
     */
    PaginationListComponent.prototype.reload = /**
     * @return {?}
     */
    function () {
        this.load.emit({
            page: this.page,
            items: this.getItemsPage()
        });
    };
    /**
     * @return {?}
     */
    PaginationListComponent.prototype.inputPageText = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var total = Math.ceil(this.total / this.limit);
        if (this.page < 1) {
            this.page = 1;
        }
        else if (this.page > total) {
            this.page = total;
        }
        this.getItemsPage();
    };
    PaginationListComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-pagination-list',
                    template: "<div class=\"btn-group h-100 col-sm-12 pl-0 pr-0\" role=\"group\" aria-label=\"First group\">\n    <span class=\"rounded-left title-show pl-3 pr-3\">\n    <span class=\"mr-2\">Hi\u1EC3n th\u1ECB</span>\n        <b>{{startNumber}} - {{endNumber}} / {{total}}</b>\n    </span>\n\n    <button type=\"button\" (click)=\"prevFirstPage()\" class=\"btn btn-light border\">\n        <i class=\"fa fa-step-backward\" aria-hidden=\"true\"></i>\n    </button>\n    <button type=\"button\" (click)=\"prevPage()\" class=\"btn btn-light border\">\n        <i class=\"fa fa-chevron-left\" aria-hidden=\"true\"></i>\n    </button>\n    <input type=\"text\" class=\"text-center border-right-0 border-left-0 border\"\n           [(ngModel)]=\"page\"\n           oninput=\"this.value=this.value.replace(/[^0-9]/g,'');\"\n           (keyup.enter)=\"inputPageText()\"\n           (focusout)=\"inputPageText()\"\n           style=\"width: 36px;background: #efefef;\">\n    <button type=\"button\" (click)=\"nextPage()\" class=\"btn btn-light border\">\n        <i class=\"fa fa-chevron-right\" aria-hidden=\"true\"></i>\n    </button>\n    <button type=\"button\" (click)=\"nextLastPage()\" class=\"btn btn-light border\">\n        <i class=\"fa fa-step-forward\" aria-hidden=\"true\"></i>\n    </button>\n    <button type=\"button\" class=\"btn btn-light border\" (click)=\"reload()\">\n        <i class=\"fa fa-refresh\" aria-hidden=\"true\"></i>\n    </button>\n</div>\n\n",
                    styles: [".title-show{display:flex;align-items:center;justify-content:center;width:auto;color:#333;background:#e9ecef}"]
                }] }
    ];
    /** @nocollapse */
    PaginationListComponent.ctorParameters = function () { return []; };
    PaginationListComponent.propDecorators = {
        total: [{ type: Input }],
        page: [{ type: Input }],
        items: [{ type: Input }],
        limit: [{ type: Input }],
        changePage: [{ type: Output }],
        load: [{ type: Output }]
    };
    return PaginationListComponent;
}());
export { PaginationListComponent };
if (false) {
    /** @type {?} */
    PaginationListComponent.prototype.total;
    /** @type {?} */
    PaginationListComponent.prototype.page;
    /** @type {?} */
    PaginationListComponent.prototype.items;
    /** @type {?} */
    PaginationListComponent.prototype.limit;
    /** @type {?} */
    PaginationListComponent.prototype.changePage;
    /** @type {?} */
    PaginationListComponent.prototype.load;
    /** @type {?} */
    PaginationListComponent.prototype.itemsPage;
    /** @type {?} */
    PaginationListComponent.prototype.startNumber;
    /** @type {?} */
    PaginationListComponent.prototype.endNumber;
    /** @type {?} */
    PaginationListComponent.prototype.totalPage;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnaW5hdGlvbi1saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtdWkvIiwic291cmNlcyI6WyJzcmMvcGFnaW5hdGlvbi9wYWdpbmF0aW9uLWxpc3QvcGFnaW5hdGlvbi1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUU3RTtJQWtCSTtRQVBVLGVBQVUsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2hDLFNBQUksR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3BDLGNBQVMsR0FBZSxFQUFFLENBQUM7UUFDM0IsZ0JBQVcsR0FBRyxDQUFDLENBQUM7UUFDaEIsY0FBUyxHQUFHLENBQUMsQ0FBQztRQUNkLGNBQVMsR0FBRyxDQUFDLENBQUM7SUFHZCxDQUFDOzs7O0lBRUQsMENBQVE7OztJQUFSO0lBQ0EsQ0FBQzs7OztJQUVELGdEQUFjOzs7SUFBZDtRQUFBLGlCQUlDO1FBSEcsVUFBVTs7O1FBQUM7WUFDUCxLQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDeEIsQ0FBQyxHQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ1gsQ0FBQzs7OztJQUVELDhDQUFZOzs7SUFBWjtRQUNJLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxDQUFDLEVBQUU7WUFDbEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7WUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7WUFDbkIsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUM7WUFDZCxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztTQUN2QjthQUNJO1lBQ0QsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsRUFBRTtnQkFDakIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO2FBQ2Y7O2dCQUNHLFNB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QUFDO1FBQzlDLElBQUksSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLEVBQUU7WUFDZixJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztTQUNqQjthQUNJLElBQUksSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLEVBQUU7WUFDeEIsSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7U0FDckI7UUFDRCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDeEIsQ0FBQzs7Z0JBdkdKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUscUJBQXFCO29CQUMvQix5N0NBQStDOztpQkFFbEQ7Ozs7O3dCQUdJLEtBQUs7dUJBQ0wsS0FBSzt3QkFDTCxLQUFLO3dCQUNMLEtBQUs7NkJBQ0wsTUFBTTt1QkFDTixNQUFNOztJQTRGWCw4QkFBQztDQUFBLEFBeEdELElBd0dDO1NBbkdZLHVCQUF1Qjs7O0lBRWhDLHdDQUF1Qjs7SUFDdkIsdUNBQXNCOztJQUN0Qix3Q0FBZTs7SUFDZix3Q0FBdUI7O0lBQ3ZCLDZDQUEwQzs7SUFDMUMsdUNBQW9DOztJQUNwQyw0Q0FBMkI7O0lBQzNCLDhDQUFnQjs7SUFDaEIsNENBQWM7O0lBQ2QsNENBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2FwcC1wYWdpbmF0aW9uLWxpc3QnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9wYWdpbmF0aW9uLWxpc3QuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3BhZ2luYXRpb24tbGlzdC5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFBhZ2luYXRpb25MaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIEBJbnB1dCgpIHRvdGFsOiBudW1iZXI7XG4gICAgQElucHV0KCkgcGFnZTogbnVtYmVyO1xuICAgIEBJbnB1dCgpIGl0ZW1zO1xuICAgIEBJbnB1dCgpIGxpbWl0OiBudW1iZXI7XG4gICAgQE91dHB1dCgpIGNoYW5nZVBhZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQE91dHB1dCgpIGxvYWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgaXRlbXNQYWdlOiBBcnJheTxhbnk+ID0gW107XG4gICAgc3RhcnROdW1iZXIgPSAwO1xuICAgIGVuZE51bWJlciA9IDA7XG4gICAgdG90YWxQYWdlID0gMDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgIH1cblxuICAgIGxvYWRQYWdpbmF0aW9uKCkge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZ2V0SXRlbXNQYWdlKCk7XG4gICAgICAgIH0sIDUwKTtcbiAgICB9XG5cbiAgICBnZXRJdGVtc1BhZ2UoKSB7XG4gICAgICAgIGlmICh0aGlzLnRvdGFsID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0TnVtYmVyID0gMDtcbiAgICAgICAgICAgIHRoaXMuZW5kTnVtYmVyID0gMDtcbiAgICAgICAgICAgIHRoaXMucGFnZSA9IDA7XG4gICAgICAgICAgICB0aGlzLml0ZW1zUGFnZSA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMucGFnZSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMucGFnZSsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IHRvdGFsUGFnZSA9IHRoaXMucGFnZSAqIHRoaXMubGltaXQ7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0TnVtYmVyID0gdG90YWxQYWdlIC0gdGhpcy5saW1pdCArIDE7XG4gICAgICAgICAgICB0aGlzLmVuZE51bWJlciA9IHRvdGFsUGFnZSA+IHRoaXMudG90YWwgPyB0aGlzLnRvdGFsIDogKHRoaXMuc3RhcnROdW1iZXIgKyB0aGlzLmxpbWl0IC0gMSk7XG4gICAgICAgICAgICBpZiAodGhpcy5wYWdlID09PSAxKVxuICAgICAgICAgICAgICAgIHRoaXMuaXRlbXNQYWdlID0gdGhpcy5pdGVtcy5zbGljZSgwLCB0b3RhbFBhZ2UgPiB0aGlzLnRvdGFsID8gdGhpcy50b3RhbCA6ICh0aGlzLnN0YXJ0TnVtYmVyICsgdGhpcy5saW1pdCAtIDEpKTtcbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuaXRlbXNQYWdlID0gdGhpcy5pdGVtcy5zbGljZSh0aGlzLnN0YXJ0TnVtYmVyIC0gMSwgdGhpcy5lbmROdW1iZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMudG90YWxQYWdlID0gTWF0aC5jZWlsKHRoaXMudG90YWwgLyB0aGlzLmxpbWl0KTtcbiAgICAgICAgdGhpcy5jaGFuZ2VQYWdlLmVtaXQoe1xuICAgICAgICAgICAgcGFnZTogdGhpcy5wYWdlLFxuICAgICAgICAgICAgaXRlbXM6IHRoaXMuaXRlbXNQYWdlXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByZXZQYWdlKCkge1xuICAgICAgICBpZiAodGhpcy5wYWdlID4gMSkge1xuICAgICAgICAgICAgdGhpcy5wYWdlLS07XG4gICAgICAgICAgICB0aGlzLmdldEl0ZW1zUGFnZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJldkZpcnN0UGFnZSgpIHtcbiAgICAgICAgaWYgKHRoaXMucGFnZSAhPT0gMSkge1xuICAgICAgICAgICAgdGhpcy5wYWdlID0gMTtcbiAgICAgICAgICAgIHRoaXMuZ2V0SXRlbXNQYWdlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZXh0UGFnZSgpIHtcbiAgICAgICAgbGV0IG1heFBhZ2UgPSBNYXRoLmNlaWwodGhpcy50b3RhbCAvIHRoaXMubGltaXQpO1xuICAgICAgICBpZiAodGhpcy5wYWdlIDwgbWF4UGFnZSkge1xuICAgICAgICAgICAgdGhpcy5wYWdlKys7XG4gICAgICAgICAgICB0aGlzLmdldEl0ZW1zUGFnZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmV4dExhc3RQYWdlKCkge1xuICAgICAgICBsZXQgbWF4UGFnZSA9IE1hdGguY2VpbCh0aGlzLnRvdGFsIC8gdGhpcy5saW1pdCk7XG4gICAgICAgIGlmICh0aGlzLnBhZ2UgIT09IG1heFBhZ2UpIHtcbiAgICAgICAgICAgIHRoaXMucGFnZSA9IG1heFBhZ2U7XG4gICAgICAgICAgICB0aGlzLmdldEl0ZW1zUGFnZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVsb2FkKCkge1xuICAgICAgICB0aGlzLmxvYWQuZW1pdCh7XG4gICAgICAgICAgICBwYWdlOiB0aGlzLnBhZ2UsXG4gICAgICAgICAgICBpdGVtczogdGhpcy5nZXRJdGVtc1BhZ2UoKVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpbnB1dFBhZ2VUZXh0KCkge1xuICAgICAgICBsZXQgdG90YWwgPSBNYXRoLmNlaWwodGhpcy50b3RhbCAvIHRoaXMubGltaXQpO1xuICAgICAgICBpZiAodGhpcy5wYWdlIDwgMSkge1xuICAgICAgICAgICAgdGhpcy5wYWdlID0gMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnBhZ2UgPiB0b3RhbCkge1xuICAgICAgICAgICAgdGhpcy5wYWdlID0gdG90YWw7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5nZXRJdGVtc1BhZ2UoKTtcbiAgICB9XG59XG4iXX0=