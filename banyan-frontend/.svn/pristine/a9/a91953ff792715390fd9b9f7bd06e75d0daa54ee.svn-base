/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ViewChild, ContentChild, TemplateRef, } from '@angular/core';
import { ListViewRow } from "./list-view-row";
var ListViewComponent = /** @class */ (function () {
    function ListViewComponent() {
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
    ListViewComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        /*
        console.log('[listItems]', this.listItems);
        console.log('[template]', this.template);
        console.log('[toolbar]', this.toolbar);
        */
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    ListViewComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        /** @type {?} */
        var count = this.items.length;
        this.listItems = this.items.map((/**
         * @param {?} item
         * @param {?} index
         * @return {?}
         */
        function (item, index) {
            return new ListViewRow(item, index, count);
        }));
        this.autoSelectItem();
    };
    /**
     * @private
     * @return {?}
     */
    ListViewComponent.prototype.autoSelectItem = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.autoSelect && this.listItems.length > 0) {
            this.selectedItems = [];
            this.selectItem(0); //active first item
        }
    };
    /**
     * @return {?}
     */
    ListViewComponent.prototype.requestFocus = /**
     * @return {?}
     */
    function () {
        this.listBody.nativeElement.focus();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    ListViewComponent.prototype.handleKeyPress = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var keyCode = event.which;
        /** @type {?} */
        var row = this.activeItem < 0 ? {} : this.listItems[this.activeItem];
        row.active = false;
        /** @type {?} */
        var prevActiveItem = this.activeItem;
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
    };
    /**
     * @param {?} event
     * @param {?} index
     * @return {?}
     */
    ListViewComponent.prototype.handleClick = /**
     * @param {?} event
     * @param {?} index
     * @return {?}
     */
    function (event, index) {
        if (event.metaKey || event.ctrlKey) {
            this.toggleItem(index);
        }
        else {
            this.selectedItems = [];
            this.selectItem(index);
        }
    };
    /**
     * @return {?}
     */
    ListViewComponent.prototype.updateItemState = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.listItems.forEach((/**
         * @param {?} row
         * @param {?} index
         * @return {?}
         */
        function (row, index) {
            row.selected = _this.selectedItems.indexOf(_this.items[index]) >= 0;
            row.active = index == _this.activeItem;
        }));
        if (this.activeItem >= 0) {
            this.scrollItemIntoView(this.activeItem);
        }
    };
    /**
     * @param {?} index
     * @return {?}
     */
    ListViewComponent.prototype.scrollItemIntoView = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        /** @type {?} */
        var activeItemEl = (/** @type {?} */ (((/** @type {?} */ (this.listBody.nativeElement))).children.item(index)));
        /** @type {?} */
        var scrollTop = this.listBody.nativeElement.scrollTop;
        /** @type {?} */
        var scrollEnd = scrollTop + this.listBody.nativeElement.offsetHeight;
        if (activeItemEl.offsetTop < scrollTop) {
            this.listBody.nativeElement.scrollTop = activeItemEl.offsetTop;
        }
        else if (activeItemEl.offsetTop + activeItemEl.offsetHeight > scrollEnd) {
            this.listBody.nativeElement.scrollTop = activeItemEl.offsetTop + activeItemEl.offsetHeight - this.listBody.nativeElement.offsetHeight;
        }
        else if (activeItemEl.offsetTop > scrollEnd) {
        }
    };
    /**
     * @param {?} index
     * @return {?}
     */
    ListViewComponent.prototype.toggleItem = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        if (this.selectedItems.indexOf(this.items[index]) >= 0) {
            this.deselectItem(index);
        }
        else {
            this.selectItem(index);
        }
    };
    /**
     * @param {?} index
     * @return {?}
     */
    ListViewComponent.prototype.deselectItem = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        this.selectedItems.splice(this.selectedItems.indexOf(this.items[index]), 1);
        this.updateItemState();
        this.onSelectionChanged.emit(this.selectedItems);
    };
    /**
     * @param {?} index
     * @return {?}
     */
    ListViewComponent.prototype.selectItem = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
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
    };
    /**
     * @return {?}
     */
    ListViewComponent.prototype.selectAll = /**
     * @return {?}
     */
    function () {
        if (this.singleSelect) {
            this.autoSelectItem();
        }
        else {
            this.selectedItems = this.items.map((/**
             * @param {?} l
             * @return {?}
             */
            function (l) { return l; }));
            this.updateItemState();
        }
        this.onSelectionChanged.emit(this.selectedItems);
    };
    /**
     * @return {?}
     */
    ListViewComponent.prototype.clearSelection = /**
     * @return {?}
     */
    function () {
        this.selectedItems = [];
        this.updateItemState();
        this.onSelectionChanged.emit(this.selectedItems);
    };
    /**
     * @param {?} id
     * @return {?}
     */
    ListViewComponent.prototype.selectById = /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        var _this = this;
        //this.selectedItems = [];
        setTimeout((/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var index = _this.items.findIndex((/**
             * @param {?} obj
             * @return {?}
             */
            function (obj) { return obj[_this.getIdProperty()] == id; }));
            if (index > -1) {
                _this.selectItem(index);
            }
        }), 10);
    };
    /**
     * @return {?}
     */
    ListViewComponent.prototype.getIdProperty = /**
     * @return {?}
     */
    function () {
        return this.idProperty;
    };
    ListViewComponent.decorators = [
        { type: Component, args: [{
                    selector: 'list-view',
                    template: "<div class=\"toolbar\">\n    <ng-template [ngTemplateOutlet]=\"toolbar\"></ng-template>\n</div>\n<div class=\"search-container\">\n    <ng-template [ngTemplateOutlet]=\"search\"></ng-template>\n</div>\n<div #listBody class=\"list-body content\" tabindex=\"0\" (keydown)=\"handleKeyPress($event)\">\n    <i class=\"list-item-body flex-column\" style=\"text-align: center;padding-top: 10px;\" *ngIf=\"listItems?.length < 1\">\n        {{'grid.emptyMsg' | translate}}\n    </i>\n    <a *ngFor=\"let item of listItems; let index = index\" class=\"list-item-body flex-column\"\n       (click)=\"handleClick($event, index)\" [attr.data-index]=\"index\">\n        <ng-template [ngTemplateOutlet]=\"template\" [ngTemplateOutletContext]=\"item\"></ng-template>\n    </a>\n</div>\n<div class=\"footer\">\n    <ng-template [ngTemplateOutlet]=\"footer\"></ng-template>\n</div>"
                }] }
    ];
    /** @nocollapse */
    ListViewComponent.ctorParameters = function () { return []; };
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
    return ListViewComponent;
}());
export { ListViewComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC12aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtdWkvIiwic291cmNlcyI6WyJzcmMvbGlzdC12aWV3L2xpc3Qtdmlldy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQVUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQzlDLFNBQVMsRUFBRSxZQUFZLEVBQUUsV0FBVyxHQUN2QyxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFFNUM7SUF1Qkk7UUFqQkEsY0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNmLGtCQUFhLEdBQUcsRUFBRSxDQUFDO1FBQ25CLGVBQVUsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUVQLFVBQUssR0FBRyxFQUFFLENBQUM7UUFDVix1QkFBa0IsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBUzdCLGVBQVUsR0FBVyxNQUFNLENBQUM7SUFJakQsQ0FBQzs7OztJQUVELG9DQUFROzs7SUFBUjtRQUNJOzs7O1VBSUU7SUFDTixDQUFDOzs7OztJQUVELHVDQUFXOzs7O0lBQVgsVUFBWSxPQUFPOztZQUNULEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU07UUFDL0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUc7Ozs7O1FBQUMsVUFBQyxJQUFJLEVBQUUsS0FBSztZQUN4QyxPQUFPLElBQUksV0FBVyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDL0MsQ0FBQyxFQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDMUIsQ0FBQzs7Ozs7SUFFTywwQ0FBYzs7OztJQUF0QjtRQUNJLElBQUcsSUFBSSxDQUFDLFVBQVUsSUFBSyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBQyxDQUFD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OzBCQUVwQixZQUFZLFNBQUMsWUFBWTsyQkFDekIsWUFBWSxTQUFDLFlBQVk7eUJBQ3pCLFlBQVksU0FBQyxXQUFXO3lCQUN4QixZQUFZLFNBQUMsV0FBVzs2QkFFeEIsS0FBSyxTQUFDLFlBQVk7NkJBQ2xCLEtBQUssU0FBQyxZQUFZOytCQUNsQixLQUFLLFNBQUMsY0FBYzs7SUFzTHpCLHdCQUFDO0NBQUEsQUE1TUQsSUE0TUM7U0F4TVksaUJBQWlCOzs7SUFFMUIsc0NBQWU7O0lBQ2YsMENBQW1COztJQUNuQix1Q0FBZ0I7O0lBRWhCLGtDQUFvQjs7SUFDcEIsK0NBQWtEOztJQUVsRCxxQ0FBZ0M7O0lBRWhDLG9DQUE2RDs7SUFDN0QscUNBQThEOztJQUM5RCxtQ0FBMkQ7O0lBQzNELG1DQUEyRDs7SUFFM0QsdUNBQWlEOztJQUNqRCx1Q0FBeUM7O0lBQ3pDLHlDQUE2QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlcixcbiAgICBWaWV3Q2hpbGQsIENvbnRlbnRDaGlsZCwgVGVtcGxhdGVSZWYsIE9uQ2hhbmdlcywgRWxlbWVudFJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0xpc3RWaWV3Um93fSBmcm9tIFwiLi9saXN0LXZpZXctcm93XCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbGlzdC12aWV3JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vbGlzdC12aWV3LmNvbXBvbmVudC5odG1sJ1xufSlcbmV4cG9ydCBjbGFzcyBMaXN0Vmlld0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcblxuICAgIGxpc3RJdGVtcyA9IFtdO1xuICAgIHNlbGVjdGVkSXRlbXMgPSBbXTtcbiAgICBhY3RpdmVJdGVtID0gLTE7XG5cbiAgICBASW5wdXQoKSBpdGVtcyA9IFtdO1xuICAgIEBPdXRwdXQoKSBvblNlbGVjdGlvbkNoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAVmlld0NoaWxkKFwibGlzdEJvZHlcIikgbGlzdEJvZHk7XG5cbiAgICBAQ29udGVudENoaWxkKCd0b29sYmFyVHBsJykgdG9vbGJhcjogVGVtcGxhdGVSZWY8RWxlbWVudFJlZj47XG4gICAgQENvbnRlbnRDaGlsZCgnY29udGVudFRwbCcpIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxFbGVtZW50UmVmPjtcbiAgICBAQ29udGVudENoaWxkKCdzZWFyY2hUcGwnKSBzZWFyY2g6IFRlbXBsYXRlUmVmPEVsZW1lbnRSZWY+O1xuICAgIEBDb250ZW50Q2hpbGQoJ2Zvb3RlclRwbCcpIGZvb3RlcjogVGVtcGxhdGVSZWY8RWxlbWVudFJlZj47XG5cbiAgICBASW5wdXQoJ2lkUHJvcGVydHknKSBpZFByb3BlcnR5OiBzdHJpbmcgPSAndXVpZCc7XG4gICAgQElucHV0KCdhdXRvU2VsZWN0JykgYXV0b1NlbGVjdDogYm9vbGVhbjtcbiAgICBASW5wdXQoJ3NpbmdsZVNlbGVjdCcpIHNpbmdsZVNlbGVjdDogYm9vbGVhbjtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgLypcbiAgICAgICAgY29uc29sZS5sb2coJ1tsaXN0SXRlbXNdJywgdGhpcy5saXN0SXRlbXMpO1xuICAgICAgICBjb25zb2xlLmxvZygnW3RlbXBsYXRlXScsIHRoaXMudGVtcGxhdGUpO1xuICAgICAgICBjb25zb2xlLmxvZygnW3Rvb2xiYXJdJywgdGhpcy50b29sYmFyKTtcbiAgICAgICAgKi9cbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzKSB7XG4gICAgICAgIGNvbnN0IGNvdW50ID0gdGhpcy5pdGVtcy5sZW5ndGg7XG4gICAgICAgIHRoaXMubGlzdEl0ZW1zID0gdGhpcy5pdGVtcy5tYXAoKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IExpc3RWaWV3Um93KGl0ZW0sIGluZGV4LCBjb3VudCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmF1dG9TZWxlY3RJdGVtKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhdXRvU2VsZWN0SXRlbSgpIHtcbiAgICAgICAgaWYodGhpcy5hdXRvU2VsZWN0ICAmJiB0aGlzLmxpc3RJdGVtcy5sZW5ndGg+MCkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zID0gW107XG4gICAgICAgICAgICB0aGlzLnNlbGVjdEl0ZW0oMCk7Ly9hY3RpdmUgZmlyc3QgaXRlbVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVxdWVzdEZvY3VzKCkge1xuICAgICAgICB0aGlzLmxpc3RCb2R5Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICB9XG5cbiAgICBoYW5kbGVLZXlQcmVzcyhldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBjb25zdCBrZXlDb2RlID0gZXZlbnQud2hpY2g7XG5cbiAgICAgICAgbGV0IHJvdyA9IHRoaXMuYWN0aXZlSXRlbSA8IDAgPyB7fSA6IHRoaXMubGlzdEl0ZW1zW3RoaXMuYWN0aXZlSXRlbV07XG4gICAgICAgIHJvdy5hY3RpdmUgPSBmYWxzZTtcblxuICAgICAgICBjb25zdCBwcmV2QWN0aXZlSXRlbSA9IHRoaXMuYWN0aXZlSXRlbTtcbiAgICAgICAgc3dpdGNoIChrZXlDb2RlKSB7XG4gICAgICAgICAgICBjYXNlIDQwOlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFjdGl2ZUl0ZW0gPT09IHRoaXMuaXRlbXMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZUl0ZW0gPSAwO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZUl0ZW0rKztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMzg6XG4gICAgICAgICAgICBjYXNlIDk6XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYWN0aXZlSXRlbSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZUl0ZW0gPSB0aGlzLml0ZW1zLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlSXRlbS0tO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIDMyOlxuICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlSXRlbSh0aGlzLmFjdGl2ZUl0ZW0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuYWN0aXZlSXRlbSA9PSBwcmV2QWN0aXZlSXRlbSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGV2ZW50LmFsdEtleSkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVJdGVtU3RhdGUoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vY29uc3QgaXNTZWxlY3RlZCA9IHJvdy5zZWxlY3RlZDtcbiAgICAgICAgaWYgKGV2ZW50LnNoaWZ0S2V5KSB7XG4gICAgICAgICAgICByb3cuc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcm93LnNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbXMgPSBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2VsZWN0SXRlbSh0aGlzLmFjdGl2ZUl0ZW0pO1xuICAgIH1cblxuICAgIGhhbmRsZUNsaWNrKGV2ZW50LCBpbmRleCkge1xuICAgICAgICBpZiAoZXZlbnQubWV0YUtleSB8fCBldmVudC5jdHJsS2V5KSB7XG4gICAgICAgICAgICB0aGlzLnRvZ2dsZUl0ZW0oaW5kZXgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zID0gW107XG4gICAgICAgICAgICB0aGlzLnNlbGVjdEl0ZW0oaW5kZXgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlSXRlbVN0YXRlKCkge1xuICAgICAgICB0aGlzLmxpc3RJdGVtcy5mb3JFYWNoKChyb3csIGluZGV4KSA9PiB7XG4gICAgICAgICAgICByb3cuc2VsZWN0ZWQgPSB0aGlzLnNlbGVjdGVkSXRlbXMuaW5kZXhPZih0aGlzLml0ZW1zW2luZGV4XSkgPj0gMDtcbiAgICAgICAgICAgIHJvdy5hY3RpdmUgPSBpbmRleCA9PSB0aGlzLmFjdGl2ZUl0ZW07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICh0aGlzLmFjdGl2ZUl0ZW0gPj0gMCkge1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxJdGVtSW50b1ZpZXcodGhpcy5hY3RpdmVJdGVtKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNjcm9sbEl0ZW1JbnRvVmlldyhpbmRleCkge1xuICAgICAgICBjb25zdCBhY3RpdmVJdGVtRWwgPSAodGhpcy5saXN0Qm9keS5uYXRpdmVFbGVtZW50IGFzIEhUTUxFbGVtZW50KS5jaGlsZHJlbi5pdGVtKGluZGV4KSBhcyBIVE1MRWxlbWVudDtcbiAgICAgICAgY29uc3Qgc2Nyb2xsVG9wID0gdGhpcy5saXN0Qm9keS5uYXRpdmVFbGVtZW50LnNjcm9sbFRvcDtcbiAgICAgICAgY29uc3Qgc2Nyb2xsRW5kID0gc2Nyb2xsVG9wICsgdGhpcy5saXN0Qm9keS5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodDtcbiAgICAgICAgaWYgKGFjdGl2ZUl0ZW1FbC5vZmZzZXRUb3AgPCBzY3JvbGxUb3ApIHtcbiAgICAgICAgICAgIHRoaXMubGlzdEJvZHkubmF0aXZlRWxlbWVudC5zY3JvbGxUb3AgPSBhY3RpdmVJdGVtRWwub2Zmc2V0VG9wO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGFjdGl2ZUl0ZW1FbC5vZmZzZXRUb3AgKyBhY3RpdmVJdGVtRWwub2Zmc2V0SGVpZ2h0ID4gc2Nyb2xsRW5kKSB7XG4gICAgICAgICAgICB0aGlzLmxpc3RCb2R5Lm5hdGl2ZUVsZW1lbnQuc2Nyb2xsVG9wID0gYWN0aXZlSXRlbUVsLm9mZnNldFRvcCArIGFjdGl2ZUl0ZW1FbC5vZmZzZXRIZWlnaHQgLSB0aGlzLmxpc3RCb2R5Lm5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGFjdGl2ZUl0ZW1FbC5vZmZzZXRUb3AgPiBzY3JvbGxFbmQpIHtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRvZ2dsZUl0ZW0oaW5kZXgpIHtcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRJdGVtcy5pbmRleE9mKHRoaXMuaXRlbXNbaW5kZXhdKSA+PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmRlc2VsZWN0SXRlbShpbmRleCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdEl0ZW0oaW5kZXgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGVzZWxlY3RJdGVtKGluZGV4KSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtcy5zcGxpY2UodGhpcy5zZWxlY3RlZEl0ZW1zLmluZGV4T2YodGhpcy5pdGVtc1tpbmRleF0pLCAxKTtcbiAgICAgICAgdGhpcy51cGRhdGVJdGVtU3RhdGUoKTtcbiAgICAgICAgdGhpcy5vblNlbGVjdGlvbkNoYW5nZWQuZW1pdCh0aGlzLnNlbGVjdGVkSXRlbXMpO1xuICAgIH1cblxuICAgIHNlbGVjdEl0ZW0oaW5kZXgpIHtcbiAgICAgICAgaWYodGhpcy5zaW5nbGVTZWxlY3QpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtcyA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYWN0aXZlSXRlbSA9IGluZGV4O1xuICAgICAgICAvLyAoPEVtYmVkZGVkVmlld1JlZjxMaXN0Vmlld1Jvdz4+dGhpcy5fdnIuZ2V0KGluZGV4KSkucm9vdE5vZGVzWzBdLnNjcm9sbEludG9WaWV3KGZhbHNlKTtcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRJdGVtcy5pbmRleE9mKHRoaXMuaXRlbXNbaW5kZXhdKSA8IDApIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtcy5wdXNoKHRoaXMuaXRlbXNbaW5kZXhdKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnVwZGF0ZUl0ZW1TdGF0ZSgpO1xuICAgICAgICB0aGlzLm9uU2VsZWN0aW9uQ2hhbmdlZC5lbWl0KHRoaXMuc2VsZWN0ZWRJdGVtcyk7XG4gICAgfVxuXG4gICAgc2VsZWN0QWxsKCkge1xuICAgICAgICBpZih0aGlzLnNpbmdsZVNlbGVjdCkge1xuICAgICAgICAgICAgdGhpcy5hdXRvU2VsZWN0SXRlbSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zID0gdGhpcy5pdGVtcy5tYXAobCA9PiBsKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSXRlbVN0YXRlKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vblNlbGVjdGlvbkNoYW5nZWQuZW1pdCh0aGlzLnNlbGVjdGVkSXRlbXMpO1xuICAgIH1cblxuICAgIGNsZWFyU2VsZWN0aW9uKCkge1xuICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbXMgPSBbXTtcbiAgICAgICAgdGhpcy51cGRhdGVJdGVtU3RhdGUoKTtcbiAgICAgICAgdGhpcy5vblNlbGVjdGlvbkNoYW5nZWQuZW1pdCh0aGlzLnNlbGVjdGVkSXRlbXMpO1xuICAgIH1cblxuICAgIHNlbGVjdEJ5SWQoaWQ6IHN0cmluZykge1xuICAgICAgICAvL3RoaXMuc2VsZWN0ZWRJdGVtcyA9IFtdO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGxldCBpbmRleCA9IHRoaXMuaXRlbXMuZmluZEluZGV4KG9iaiA9PiBvYmpbdGhpcy5nZXRJZFByb3BlcnR5KCldID09IGlkKTtcbiAgICAgICAgICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RJdGVtKGluZGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgMTApXG4gICAgfVxuXG4gICAgZ2V0SWRQcm9wZXJ0eSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaWRQcm9wZXJ0eTtcbiAgICB9XG5cbn1cbiJdfQ==