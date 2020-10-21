/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
export class PaginationListComponent {
    constructor() {
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
    ngOnInit() {
    }
    /**
     * @return {?}
     */
    loadPagination() {
        setTimeout((/**
         * @return {?}
         */
        () => {
            this.getItemsPage();
        }), 50);
    }
    /**
     * @return {?}
     */
    getItemsPage() {
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
            let totalPage = this.page * this.limit;
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
    }
    /**
     * @return {?}
     */
    prevPage() {
        if (this.page > 1) {
            this.page--;
            this.getItemsPage();
        }
    }
    /**
     * @return {?}
     */
    prevFirstPage() {
        if (this.page !== 1) {
            this.page = 1;
            this.getItemsPage();
        }
    }
    /**
     * @return {?}
     */
    nextPage() {
        /** @type {?} */
        let maxPage = Math.ceil(this.total / this.limit);
        if (this.page < maxPage) {
            this.page++;
            this.getItemsPage();
        }
    }
    /**
     * @return {?}
     */
    nextLastPage() {
        /** @type {?} */
        let maxPage = Math.ceil(this.total / this.limit);
        if (this.page !== maxPage) {
            this.page = maxPage;
            this.getItemsPage();
        }
    }
    /**
     * @return {?}
     */
    reload() {
        this.load.emit({
            page: this.page,
            items: this.getItemsPage()
        });
    }
    /**
     * @return {?}
     */
    inputPageText() {
        /** @type {?} */
        let total = Math.ceil(this.total / this.limit);
        if (this.page < 1) {
            this.page = 1;
        }
        else if (this.page > total) {
            this.page = total;
        }
        this.getItemsPage();
    }
}
PaginationListComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-pagination-list',
                template: "<div class=\"btn-group h-100 col-sm-12 pl-0 pr-0\" role=\"group\" aria-label=\"First group\">\n    <span class=\"rounded-left title-show pl-3 pr-3\">\n    <span class=\"mr-2\">Hi\u1EC3n th\u1ECB</span>\n        <b>{{startNumber}} - {{endNumber}} / {{total}}</b>\n    </span>\n\n    <button type=\"button\" (click)=\"prevFirstPage()\" class=\"btn btn-light border\">\n        <i class=\"fa fa-step-backward\" aria-hidden=\"true\"></i>\n    </button>\n    <button type=\"button\" (click)=\"prevPage()\" class=\"btn btn-light border\">\n        <i class=\"fa fa-chevron-left\" aria-hidden=\"true\"></i>\n    </button>\n    <input type=\"text\" class=\"text-center border-right-0 border-left-0 border\"\n           [(ngModel)]=\"page\"\n           oninput=\"this.value=this.value.replace(/[^0-9]/g,'');\"\n           (keyup.enter)=\"inputPageText()\"\n           (focusout)=\"inputPageText()\"\n           style=\"width: 36px;background: #efefef;\">\n    <button type=\"button\" (click)=\"nextPage()\" class=\"btn btn-light border\">\n        <i class=\"fa fa-chevron-right\" aria-hidden=\"true\"></i>\n    </button>\n    <button type=\"button\" (click)=\"nextLastPage()\" class=\"btn btn-light border\">\n        <i class=\"fa fa-step-forward\" aria-hidden=\"true\"></i>\n    </button>\n    <button type=\"button\" class=\"btn btn-light border\" (click)=\"reload()\">\n        <i class=\"fa fa-refresh\" aria-hidden=\"true\"></i>\n    </button>\n</div>\n\n",
                styles: [".title-show{display:flex;align-items:center;justify-content:center;width:auto;color:#333;background:#e9ecef}"]
            }] }
];
/** @nocollapse */
PaginationListComponent.ctorParameters = () => [];
PaginationListComponent.propDecorators = {
    total: [{ type: Input }],
    page: [{ type: Input }],
    items: [{ type: Input }],
    limit: [{ type: Input }],
    changePage: [{ type: Output }],
    load: [{ type: Output }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnaW5hdGlvbi1saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtdWkvIiwic291cmNlcyI6WyJzcmMvcGFnaW5hdGlvbi9wYWdpbmF0aW9uLWxpc3QvcGFnaW5hdGlvbi1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQU83RSxNQUFNLE9BQU8sdUJBQXVCO0lBYWhDO1FBUFUsZUFBVSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDaEMsU0FBSSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDcEMsY0FBUyxHQUFlLEVBQUUsQ0FBQztRQUMzQixnQkFBVyxHQUFHLENBQUMsQ0FBQztRQUNoQixjQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsY0FBUyxHQUFHLENBQUMsQ0FBQztJQUdkLENBQUM7Ozs7SUFFRCxRQUFRO0lBQ1IsQ0FBQzs7OztJQUVELGNBQWM7UUFDVixVQUFVOzs7UUFBQyxHQUFHLEVBQUU7WUFDWixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDeEIsQ0FBQyxHQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ1gsQ0FBQzs7OztJQUVELFlBQVk7UUFDUixJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssQ0FBQyxFQUFFO1lBQ2xCLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1lBQ25CLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO1lBQ2QsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7U0FDdkI7YUFDSTtZQUNELElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxDQUFDLEVBQUU7Z0JBQ2pCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUNmOztnQkFDRyxTQUFTLEdBQUcs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QUFDLElBQUksR0FBRyxDQUFDLENBQUM7U0FDakI7YUFDSSxJQUFJLElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxFQUFFO1lBQ3hCLElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO1NBQ3JCO1FBQ0QsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3hCLENBQUM7OztZQXZHSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHFCQUFxQjtnQkFDL0IseTdDQUErQzs7YUFFbEQ7Ozs7O29CQUdJLEtBQUs7bUJBQ0wsS0FBSztvQkFDTCxLQUFLO29CQUNMLEtBQUs7eUJBQ0wsTUFBTTttQkFDTixNQUFNOzs7O0lBTFAsd0NBQXVCOztJQUN2Qix1Q0FBc0I7O0lBQ3RCLHdDQUFlOztJQUNmLHdDQUF1Qjs7SUFDdkIsNkNBQTBDOztJQUMxQyx1Q0FBb0M7O0lBQ3BDLDRDQUEyQjs7SUFDM0IsOENBQWdCOztJQUNoQiw0Q0FBYzs7SUFDZCw0Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE91dHB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXBwLXBhZ2luYXRpb24tbGlzdCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3BhZ2luYXRpb24tbGlzdC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vcGFnaW5hdGlvbi1saXN0LmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUGFnaW5hdGlvbkxpc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgQElucHV0KCkgdG90YWw6IG51bWJlcjtcbiAgICBASW5wdXQoKSBwYWdlOiBudW1iZXI7XG4gICAgQElucHV0KCkgaXRlbXM7XG4gICAgQElucHV0KCkgbGltaXQ6IG51bWJlcjtcbiAgICBAT3V0cHV0KCkgY2hhbmdlUGFnZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBAT3V0cHV0KCkgbG9hZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBpdGVtc1BhZ2U6IEFycmF5PGFueT4gPSBbXTtcbiAgICBzdGFydE51bWJlciA9IDA7XG4gICAgZW5kTnVtYmVyID0gMDtcbiAgICB0b3RhbFBhZ2UgPSAwO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgfVxuXG4gICAgbG9hZFBhZ2luYXRpb24oKSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5nZXRJdGVtc1BhZ2UoKTtcbiAgICAgICAgfSwgNTApO1xuICAgIH1cblxuICAgIGdldEl0ZW1zUGFnZSgpIHtcbiAgICAgICAgaWYgKHRoaXMudG90YWwgPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnROdW1iZXIgPSAwO1xuICAgICAgICAgICAgdGhpcy5lbmROdW1iZXIgPSAwO1xuICAgICAgICAgICAgdGhpcy5wYWdlID0gMDtcbiAgICAgICAgICAgIHRoaXMuaXRlbXNQYWdlID0gW107XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wYWdlID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wYWdlKys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgdG90YWxQYWdlID0gdGhpcy5wYWdlICogdGhpcy5saW1pdDtcbiAgICAgICAgICAgIHRoaXMuc3RhcnROdW1iZXIgPSB0b3RhbFBhZ2UgLSB0aGlzLmxpbWl0ICsgMTtcbiAgICAgICAgICAgIHRoaXMuZW5kTnVtYmVyID0gdG90YWxQYWdlID4gdGhpcy50b3RhbCA/IHRoaXMudG90YWwgOiAodGhpcy5zdGFydE51bWJlciArIHRoaXMubGltaXQgLSAxKTtcbiAgICAgICAgICAgIGlmICh0aGlzLnBhZ2UgPT09IDEpXG4gICAgICAgICAgICAgICAgdGhpcy5pdGVtc1BhZ2UgPSB0aGlzLml0ZW1zLnNsaWNlKDAsIHRvdGFsUGFnZSA+IHRoaXMudG90YWwgPyB0aGlzLnRvdGFsIDogKHRoaXMuc3RhcnROdW1iZXIgKyB0aGlzLmxpbWl0IC0gMSkpO1xuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pdGVtc1BhZ2UgPSB0aGlzLml0ZW1zLnNsaWNlKHRoaXMuc3RhcnROdW1iZXIgLSAxLCB0aGlzLmVuZE51bWJlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy50b3RhbFBhZ2UgPSBNYXRoLmNlaWwodGhpcy50b3RhbCAvIHRoaXMubGltaXQpO1xuICAgICAgICB0aGlzLmNoYW5nZVBhZ2UuZW1pdCh7XG4gICAgICAgICAgICBwYWdlOiB0aGlzLnBhZ2UsXG4gICAgICAgICAgICBpdGVtczogdGhpcy5pdGVtc1BhZ2VcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJldlBhZ2UoKSB7XG4gICAgICAgIGlmICh0aGlzLnBhZ2UgPiAxKSB7XG4gICAgICAgICAgICB0aGlzLnBhZ2UtLTtcbiAgICAgICAgICAgIHRoaXMuZ2V0SXRlbXNQYWdlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcmV2Rmlyc3RQYWdlKCkge1xuICAgICAgICBpZiAodGhpcy5wYWdlICE9PSAxKSB7XG4gICAgICAgICAgICB0aGlzLnBhZ2UgPSAxO1xuICAgICAgICAgICAgdGhpcy5nZXRJdGVtc1BhZ2UoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5leHRQYWdlKCkge1xuICAgICAgICBsZXQgbWF4UGFnZSA9IE1hdGguY2VpbCh0aGlzLnRvdGFsIC8gdGhpcy5saW1pdCk7XG4gICAgICAgIGlmICh0aGlzLnBhZ2UgPCBtYXhQYWdlKSB7XG4gICAgICAgICAgICB0aGlzLnBhZ2UrKztcbiAgICAgICAgICAgIHRoaXMuZ2V0SXRlbXNQYWdlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZXh0TGFzdFBhZ2UoKSB7XG4gICAgICAgIGxldCBtYXhQYWdlID0gTWF0aC5jZWlsKHRoaXMudG90YWwgLyB0aGlzLmxpbWl0KTtcbiAgICAgICAgaWYgKHRoaXMucGFnZSAhPT0gbWF4UGFnZSkge1xuICAgICAgICAgICAgdGhpcy5wYWdlID0gbWF4UGFnZTtcbiAgICAgICAgICAgIHRoaXMuZ2V0SXRlbXNQYWdlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZWxvYWQoKSB7XG4gICAgICAgIHRoaXMubG9hZC5lbWl0KHtcbiAgICAgICAgICAgIHBhZ2U6IHRoaXMucGFnZSxcbiAgICAgICAgICAgIGl0ZW1zOiB0aGlzLmdldEl0ZW1zUGFnZSgpXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGlucHV0UGFnZVRleHQoKSB7XG4gICAgICAgIGxldCB0b3RhbCA9IE1hdGguY2VpbCh0aGlzLnRvdGFsIC8gdGhpcy5saW1pdCk7XG4gICAgICAgIGlmICh0aGlzLnBhZ2UgPCAxKSB7XG4gICAgICAgICAgICB0aGlzLnBhZ2UgPSAxO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMucGFnZSA+IHRvdGFsKSB7XG4gICAgICAgICAgICB0aGlzLnBhZ2UgPSB0b3RhbDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmdldEl0ZW1zUGFnZSgpO1xuICAgIH1cbn1cbiJdfQ==