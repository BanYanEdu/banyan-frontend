/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ViewChild, ContentChild, TemplateRef, } from '@angular/core';
import { ListViewRow } from "./list-view-row";
export class ListViewComponent {
    constructor() {
        this.listItems = [];
        this.selectedItems = [];
        this.activeItem = -1;
        this.items = [];
        this.onSelectionChanged = new EventEmitter();
        this.idProperty = 'uuid';
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        /*
        console.log('[listItems]', this.listItems);
        console.log('[template]', this.template);
        console.log('[toolbar]', this.toolbar);
        */
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        /** @type {?} */
        const count = this.items.length;
        this.listItems = this.items.map((/**
         * @param {?} item
         * @param {?} index
         * @return {?}
         */
        (item, index) => {
            return new ListViewRow(item, index, count);
        }));
        this.autoSelectItem();
    }
    /**
     * @private
     * @return {?}
     */
    autoSelectItem() {
        if (this.autoSelect && this.listItems.length > 0) {
            this.selectedItems = [];
            this.selectItem(0); //active first item
        }
    }
    /**
     * @return {?}
     */
    requestFocus() {
        this.listBody.nativeElement.focus();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    handleKeyPress(event) {
        /** @type {?} */
        const keyCode = event.which;
        /** @type {?} */
        let row = this.activeItem < 0 ? {} : this.listItems[this.activeItem];
        row.active = false;
        /** @type {?} */
        const prevActiveItem = this.activeItem;
        switch (keyCode) {
            case 40:
                if (this.activeItem === this.items.length - 1) {
                    this.activeItem = 0;
                    break;
                }
                this.activeItem++;
                break;
            case 38:
            case 9:
                if (this.activeItem === 0) {
                    this.activeItem = this.items.length - 1;
                    break;
                }
                this.activeItem--;
                break;
            case 32:
                this.toggleItem(this.activeItem);
                break;
            default:
                return;
        }
        event.preventDefault();
        event.stopPropagation();
        if (this.activeItem == prevActiveItem) {
            return;
        }
        if (event.altKey) {
            this.updateItemState();
            return;
        }
        //const isSelected = row.selected;
        if (event.shiftKey) {
            row.selected = true;
        }
        else {
            row.selected = false;
            this.selectedItems = [];
        }
        this.selectItem(this.activeItem);
    }
    /**
     * @param {?} event
     * @param {?} index
     * @return {?}
     */
    handleClick(event, index) {
        if (event.metaKey || event.ctrlKey) {
            this.toggleItem(index);
        }
        else {
            this.selectedItems = [];
            this.selectItem(index);
        }
    }
    /**
     * @return {?}
     */
    updateItemState() {
        this.listItems.forEach((/**
         * @param {?} row
         * @param {?} index
         * @return {?}
         */
        (row, index) => {
            row.selected = this.selectedItems.indexOf(this.items[index]) >= 0;
            row.active = index == this.activeItem;
        }));
        if (this.activeItem >= 0) {
            this.scrollItemIntoView(this.activeItem);
        }
    }
    /**
     * @param {?} index
     * @return {?}
     */
    scrollItemIntoView(index) {
        /** @type {?} */
        const activeItemEl = (/** @type {?} */ (((/** @type {?} */ (this.listBody.nativeElement))).children.item(index)));
        /** @type {?} */
        const scrollTop = this.listBody.nativeElement.scrollTop;
        /** @type {?} */
        const scrollEnd = scrollTop + this.listBody.nativeElement.offsetHeight;
        if (activeItemEl.offsetTop < scrollTop) {
            this.listBody.nativeElement.scrollTop = activeItemEl.offsetTop;
        }
        else if (activeItemEl.offsetTop + activeItemEl.offsetHeight > scrollEnd) {
            this.listBody.nativeElement.scrollTop = activeItemEl.offsetTop + activeItemEl.offsetHeight - this.listBody.nativeElement.offsetHeight;
        }
        else if (activeItemEl.offsetTop > scrollEnd) {
        }
    }
    /**
     * @param {?} index
     * @return {?}
     */
    toggleItem(index) {
        if (this.selectedItems.indexOf(this.items[index]) >= 0) {
            this.deselectItem(index);
        }
        else {
            this.selectItem(index);
        }
    }
    /**
     * @param {?} index
     * @return {?}
     */
    deselectItem(index) {
        this.selectedItems.splice(this.selectedItems.indexOf(this.items[index]), 1);
        this.updateItemState();
        this.onSelectionChanged.emit(this.selectedItems);
    }
    /**
     * @param {?} index
     * @return {?}
     */
    selectItem(index) {
        if (this.singleSelect) {
            this.selectedItems = [];
        }
        this.activeItem = index;
        // (<EmbeddedViewRef<ListViewRow>>this._vr.get(index)).rootNodes[0].scrollIntoView(false);
        if (this.selectedItems.indexOf(this.items[index]) < 0) {
            this.selectedItems.push(this.items[index]);
        }
        this.updateItemState();
        this.onSelectionChanged.emit(this.selectedItems);
    }
    /**
     * @return {?}
     */
    selectAll() {
        if (this.singleSelect) {
            this.autoSelectItem();
        }
        else {
            this.selectedItems = this.items.map((/**
             * @param {?} l
             * @return {?}
             */
            l => l));
            this.updateItemState();
        }
        this.onSelectionChanged.emit(this.selectedItems);
    }
    /**
     * @return {?}
     */
    clearSelection() {
        this.selectedItems = [];
        this.updateItemState();
        this.onSelectionChanged.emit(this.selectedItems);
    }
    /**
     * @param {?} id
     * @return {?}
     */
    selectById(id) {
        //this.selectedItems = [];
        setTimeout((/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            let index = this.items.findIndex((/**
             * @param {?} obj
             * @return {?}
             */
            obj => obj[this.getIdProperty()] == id));
            if (index > -1) {
                this.selectItem(index);
            }
        }), 10);
    }
    /**
     * @return {?}
     */
    getIdProperty() {
        return this.idProperty;
    }
}
ListViewComponent.decorators = [
    { type: Component, args: [{
                selector: 'list-view',
                template: "<div class=\"toolbar\">\n    <ng-template [ngTemplateOutlet]=\"toolbar\"></ng-template>\n</div>\n<div class=\"search-container\">\n    <ng-template [ngTemplateOutlet]=\"search\"></ng-template>\n</div>\n<div #listBody class=\"list-body content\" tabindex=\"0\" (keydown)=\"handleKeyPress($event)\">\n    <i class=\"list-item-body flex-column\" style=\"text-align: center;padding-top: 10px;\" *ngIf=\"listItems?.length < 1\">\n        {{'grid.emptyMsg' | translate}}\n    </i>\n    <a *ngFor=\"let item of listItems; let index = index\" class=\"list-item-body flex-column\"\n       (click)=\"handleClick($event, index)\" [attr.data-index]=\"index\">\n        <ng-template [ngTemplateOutlet]=\"template\" [ngTemplateOutletContext]=\"item\"></ng-template>\n    </a>\n</div>\n<div class=\"footer\">\n    <ng-template [ngTemplateOutlet]=\"footer\"></ng-template>\n</div>"
            }] }
];
/** @nocollapse */
ListViewComponent.ctorParameters = () => [];
ListViewComponent.propDecorators = {
    items: [{ type: Input }],
    onSelectionChanged: [{ type: Output }],
    listBody: [{ type: ViewChild, args: ["listBody",] }],
    toolbar: [{ type: ContentChild, args: ['toolbarTpl',] }],
    template: [{ type: ContentChild, args: ['contentTpl',] }],
    search: [{ type: ContentChild, args: ['searchTpl',] }],
    footer: [{ type: ContentChild, args: ['footerTpl',] }],
    idProperty: [{ type: Input, args: ['idProperty',] }],
    autoSelect: [{ type: Input, args: ['autoSelect',] }],
    singleSelect: [{ type: Input, args: ['singleSelect',] }]
};
if (false) {
    /** @type {?} */
    ListViewComponent.prototype.listItems;
    /** @type {?} */
    ListViewComponent.prototype.selectedItems;
    /** @type {?} */
    ListViewComponent.prototype.activeItem;
    /** @type {?} */
    ListViewComponent.prototype.items;
    /** @type {?} */
    ListViewComponent.prototype.onSelectionChanged;
    /** @type {?} */
    ListViewComponent.prototype.listBody;
    /** @type {?} */
    ListViewComponent.prototype.toolbar;
    /** @type {?} */
    ListViewComponent.prototype.template;
    /** @type {?} */
    ListViewComponent.prototype.search;
    /** @type {?} */
    ListViewComponent.prototype.footer;
    /** @type {?} */
    ListViewComponent.prototype.idProperty;
    /** @type {?} */
    ListViewComponent.prototype.autoSelect;
    /** @type {?} */
    ListViewComponent.prototype.singleSelect;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC12aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtdWkvIiwic291cmNlcyI6WyJzcmMvbGlzdC12aWV3L2xpc3Qtdmlldy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQVUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQzlDLFNBQVMsRUFBRSxZQUFZLEVBQUUsV0FBVyxHQUN2QyxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFNNUMsTUFBTSxPQUFPLGlCQUFpQjtJQW1CMUI7UUFqQkEsY0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNmLGtCQUFhLEdBQUcsRUFBRSxDQUFDO1FBQ25CLGVBQVUsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUVQLFVBQUssR0FBRyxFQUFFLENBQUM7UUFDVix1QkFBa0IsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBUzdCLGVBQVUsR0FBVyxNQUFNLENBQUM7SUFJakQsQ0FBQzs7OztJQUVELFFBQVE7UUFDSjs7OztVQUlFO0lBQ04sQ0FBQzs7Ozs7SUFFRCxXQUFXLENBQUMsT0FBTzs7Y0FDVCxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNO1FBQy9CLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHOzs7OztRQUFDLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO1lBQzVDLE9BQU8sSUFBSSxXQUFXLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztRQUMvQyxDQUFDLEVBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUMxQixDQUFDOzs7OztJQUVPLGNBQWM7UUFDbEIsSUFBRyxJQUFJLENBQUMsVUFBVSxJQUFLLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFDLENB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WUFBWTsyQkFDbEIsS0FBSyxTQUFDLGNBQWM7Ozs7SUFoQnJCLHNDQUFlOztJQUNmLDBDQUFtQjs7SUFDbkIsdUNBQWdCOztJQUVoQixrQ0FBb0I7O0lBQ3BCLCtDQUFrRDs7SUFFbEQscUNBQWdDOztJQUVoQyxvQ0FBNkQ7O0lBQzdELHFDQUE4RDs7SUFDOUQsbUNBQTJEOztJQUMzRCxtQ0FBMkQ7O0lBRTNELHVDQUFpRDs7SUFDakQsdUNBQXlDOztJQUN6Qyx5Q0FBNkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsXG4gICAgVmlld0NoaWxkLCBDb250ZW50Q2hpbGQsIFRlbXBsYXRlUmVmLCBPbkNoYW5nZXMsIEVsZW1lbnRSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtMaXN0Vmlld1Jvd30gZnJvbSBcIi4vbGlzdC12aWV3LXJvd1wiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2xpc3QtdmlldycsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2xpc3Qtdmlldy5jb21wb25lbnQuaHRtbCdcbn0pXG5leHBvcnQgY2xhc3MgTGlzdFZpZXdDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG5cbiAgICBsaXN0SXRlbXMgPSBbXTtcbiAgICBzZWxlY3RlZEl0ZW1zID0gW107XG4gICAgYWN0aXZlSXRlbSA9IC0xO1xuXG4gICAgQElucHV0KCkgaXRlbXMgPSBbXTtcbiAgICBAT3V0cHV0KCkgb25TZWxlY3Rpb25DaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQFZpZXdDaGlsZChcImxpc3RCb2R5XCIpIGxpc3RCb2R5O1xuXG4gICAgQENvbnRlbnRDaGlsZCgndG9vbGJhclRwbCcpIHRvb2xiYXI6IFRlbXBsYXRlUmVmPEVsZW1lbnRSZWY+O1xuICAgIEBDb250ZW50Q2hpbGQoJ2NvbnRlbnRUcGwnKSB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8RWxlbWVudFJlZj47XG4gICAgQENvbnRlbnRDaGlsZCgnc2VhcmNoVHBsJykgc2VhcmNoOiBUZW1wbGF0ZVJlZjxFbGVtZW50UmVmPjtcbiAgICBAQ29udGVudENoaWxkKCdmb290ZXJUcGwnKSBmb290ZXI6IFRlbXBsYXRlUmVmPEVsZW1lbnRSZWY+O1xuXG4gICAgQElucHV0KCdpZFByb3BlcnR5JykgaWRQcm9wZXJ0eTogc3RyaW5nID0gJ3V1aWQnO1xuICAgIEBJbnB1dCgnYXV0b1NlbGVjdCcpIGF1dG9TZWxlY3Q6IGJvb2xlYW47XG4gICAgQElucHV0KCdzaW5nbGVTZWxlY3QnKSBzaW5nbGVTZWxlY3Q6IGJvb2xlYW47XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIC8qXG4gICAgICAgIGNvbnNvbGUubG9nKCdbbGlzdEl0ZW1zXScsIHRoaXMubGlzdEl0ZW1zKTtcbiAgICAgICAgY29uc29sZS5sb2coJ1t0ZW1wbGF0ZV0nLCB0aGlzLnRlbXBsYXRlKTtcbiAgICAgICAgY29uc29sZS5sb2coJ1t0b29sYmFyXScsIHRoaXMudG9vbGJhcik7XG4gICAgICAgICovXG4gICAgfVxuXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlcykge1xuICAgICAgICBjb25zdCBjb3VudCA9IHRoaXMuaXRlbXMubGVuZ3RoO1xuICAgICAgICB0aGlzLmxpc3RJdGVtcyA9IHRoaXMuaXRlbXMubWFwKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBMaXN0Vmlld1JvdyhpdGVtLCBpbmRleCwgY291bnQpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5hdXRvU2VsZWN0SXRlbSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgYXV0b1NlbGVjdEl0ZW0oKSB7XG4gICAgICAgIGlmKHRoaXMuYXV0b1NlbGVjdCAgJiYgdGhpcy5saXN0SXRlbXMubGVuZ3RoPjApIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtcyA9IFtdO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RJdGVtKDApOy8vYWN0aXZlIGZpcnN0IGl0ZW1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlcXVlc3RGb2N1cygpIHtcbiAgICAgICAgdGhpcy5saXN0Qm9keS5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgfVxuXG4gICAgaGFuZGxlS2V5UHJlc3MoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgY29uc3Qga2V5Q29kZSA9IGV2ZW50LndoaWNoO1xuXG4gICAgICAgIGxldCByb3cgPSB0aGlzLmFjdGl2ZUl0ZW0gPCAwID8ge30gOiB0aGlzLmxpc3RJdGVtc1t0aGlzLmFjdGl2ZUl0ZW1dO1xuICAgICAgICByb3cuYWN0aXZlID0gZmFsc2U7XG5cbiAgICAgICAgY29uc3QgcHJldkFjdGl2ZUl0ZW0gPSB0aGlzLmFjdGl2ZUl0ZW07XG4gICAgICAgIHN3aXRjaCAoa2V5Q29kZSkge1xuICAgICAgICAgICAgY2FzZSA0MDpcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hY3RpdmVJdGVtID09PSB0aGlzLml0ZW1zLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3RpdmVJdGVtID0gMDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5hY3RpdmVJdGVtKys7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDM4OlxuICAgICAgICAgICAgY2FzZSA5OlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFjdGl2ZUl0ZW0gPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3RpdmVJdGVtID0gdGhpcy5pdGVtcy5sZW5ndGggLSAxO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZUl0ZW0tLTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAzMjpcbiAgICAgICAgICAgICAgICB0aGlzLnRvZ2dsZUl0ZW0odGhpcy5hY3RpdmVJdGVtKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgIGlmICh0aGlzLmFjdGl2ZUl0ZW0gPT0gcHJldkFjdGl2ZUl0ZW0pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChldmVudC5hbHRLZXkpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSXRlbVN0YXRlKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvL2NvbnN0IGlzU2VsZWN0ZWQgPSByb3cuc2VsZWN0ZWQ7XG4gICAgICAgIGlmIChldmVudC5zaGlmdEtleSkge1xuICAgICAgICAgICAgcm93LnNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJvdy5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zID0gW107XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNlbGVjdEl0ZW0odGhpcy5hY3RpdmVJdGVtKTtcbiAgICB9XG5cbiAgICBoYW5kbGVDbGljayhldmVudCwgaW5kZXgpIHtcbiAgICAgICAgaWYgKGV2ZW50Lm1ldGFLZXkgfHwgZXZlbnQuY3RybEtleSkge1xuICAgICAgICAgICAgdGhpcy50b2dnbGVJdGVtKGluZGV4KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtcyA9IFtdO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RJdGVtKGluZGV4KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZUl0ZW1TdGF0ZSgpIHtcbiAgICAgICAgdGhpcy5saXN0SXRlbXMuZm9yRWFjaCgocm93LCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgcm93LnNlbGVjdGVkID0gdGhpcy5zZWxlY3RlZEl0ZW1zLmluZGV4T2YodGhpcy5pdGVtc1tpbmRleF0pID49IDA7XG4gICAgICAgICAgICByb3cuYWN0aXZlID0gaW5kZXggPT0gdGhpcy5hY3RpdmVJdGVtO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAodGhpcy5hY3RpdmVJdGVtID49IDApIHtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsSXRlbUludG9WaWV3KHRoaXMuYWN0aXZlSXRlbSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzY3JvbGxJdGVtSW50b1ZpZXcoaW5kZXgpIHtcbiAgICAgICAgY29uc3QgYWN0aXZlSXRlbUVsID0gKHRoaXMubGlzdEJvZHkubmF0aXZlRWxlbWVudCBhcyBIVE1MRWxlbWVudCkuY2hpbGRyZW4uaXRlbShpbmRleCkgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IHNjcm9sbFRvcCA9IHRoaXMubGlzdEJvZHkubmF0aXZlRWxlbWVudC5zY3JvbGxUb3A7XG4gICAgICAgIGNvbnN0IHNjcm9sbEVuZCA9IHNjcm9sbFRvcCArIHRoaXMubGlzdEJvZHkubmF0aXZlRWxlbWVudC5vZmZzZXRIZWlnaHQ7XG4gICAgICAgIGlmIChhY3RpdmVJdGVtRWwub2Zmc2V0VG9wIDwgc2Nyb2xsVG9wKSB7XG4gICAgICAgICAgICB0aGlzLmxpc3RCb2R5Lm5hdGl2ZUVsZW1lbnQuc2Nyb2xsVG9wID0gYWN0aXZlSXRlbUVsLm9mZnNldFRvcDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhY3RpdmVJdGVtRWwub2Zmc2V0VG9wICsgYWN0aXZlSXRlbUVsLm9mZnNldEhlaWdodCA+IHNjcm9sbEVuZCkge1xuICAgICAgICAgICAgdGhpcy5saXN0Qm9keS5uYXRpdmVFbGVtZW50LnNjcm9sbFRvcCA9IGFjdGl2ZUl0ZW1FbC5vZmZzZXRUb3AgKyBhY3RpdmVJdGVtRWwub2Zmc2V0SGVpZ2h0IC0gdGhpcy5saXN0Qm9keS5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhY3RpdmVJdGVtRWwub2Zmc2V0VG9wID4gc2Nyb2xsRW5kKSB7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0b2dnbGVJdGVtKGluZGV4KSB7XG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkSXRlbXMuaW5kZXhPZih0aGlzLml0ZW1zW2luZGV4XSkgPj0gMCkge1xuICAgICAgICAgICAgdGhpcy5kZXNlbGVjdEl0ZW0oaW5kZXgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RJdGVtKGluZGV4KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRlc2VsZWN0SXRlbShpbmRleCkge1xuICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbXMuc3BsaWNlKHRoaXMuc2VsZWN0ZWRJdGVtcy5pbmRleE9mKHRoaXMuaXRlbXNbaW5kZXhdKSwgMSk7XG4gICAgICAgIHRoaXMudXBkYXRlSXRlbVN0YXRlKCk7XG4gICAgICAgIHRoaXMub25TZWxlY3Rpb25DaGFuZ2VkLmVtaXQodGhpcy5zZWxlY3RlZEl0ZW1zKTtcbiAgICB9XG5cbiAgICBzZWxlY3RJdGVtKGluZGV4KSB7XG4gICAgICAgIGlmKHRoaXMuc2luZ2xlU2VsZWN0KSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbXMgPSBbXTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmFjdGl2ZUl0ZW0gPSBpbmRleDtcbiAgICAgICAgLy8gKDxFbWJlZGRlZFZpZXdSZWY8TGlzdFZpZXdSb3c+PnRoaXMuX3ZyLmdldChpbmRleCkpLnJvb3ROb2Rlc1swXS5zY3JvbGxJbnRvVmlldyhmYWxzZSk7XG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkSXRlbXMuaW5kZXhPZih0aGlzLml0ZW1zW2luZGV4XSkgPCAwKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbXMucHVzaCh0aGlzLml0ZW1zW2luZGV4XSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy51cGRhdGVJdGVtU3RhdGUoKTtcbiAgICAgICAgdGhpcy5vblNlbGVjdGlvbkNoYW5nZWQuZW1pdCh0aGlzLnNlbGVjdGVkSXRlbXMpO1xuICAgIH1cblxuICAgIHNlbGVjdEFsbCgpIHtcbiAgICAgICAgaWYodGhpcy5zaW5nbGVTZWxlY3QpIHtcbiAgICAgICAgICAgIHRoaXMuYXV0b1NlbGVjdEl0ZW0oKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtcyA9IHRoaXMuaXRlbXMubWFwKGwgPT4gbCk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUl0ZW1TdGF0ZSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMub25TZWxlY3Rpb25DaGFuZ2VkLmVtaXQodGhpcy5zZWxlY3RlZEl0ZW1zKTtcbiAgICB9XG5cbiAgICBjbGVhclNlbGVjdGlvbigpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zID0gW107XG4gICAgICAgIHRoaXMudXBkYXRlSXRlbVN0YXRlKCk7XG4gICAgICAgIHRoaXMub25TZWxlY3Rpb25DaGFuZ2VkLmVtaXQodGhpcy5zZWxlY3RlZEl0ZW1zKTtcbiAgICB9XG5cbiAgICBzZWxlY3RCeUlkKGlkOiBzdHJpbmcpIHtcbiAgICAgICAgLy90aGlzLnNlbGVjdGVkSXRlbXMgPSBbXTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgaW5kZXggPSB0aGlzLml0ZW1zLmZpbmRJbmRleChvYmogPT4gb2JqW3RoaXMuZ2V0SWRQcm9wZXJ0eSgpXSA9PSBpZCk7XG4gICAgICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0SXRlbShpbmRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDEwKVxuICAgIH1cblxuICAgIGdldElkUHJvcGVydHkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlkUHJvcGVydHk7XG4gICAgfVxuXG59XG4iXX0=