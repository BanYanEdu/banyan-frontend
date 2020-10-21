/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { ListUserComponent } from '../list-user/list-user.component';
import { SocialService } from '../../social.service';
var GroupCreateComponent = /** @class */ (function () {
    function GroupCreateComponent(socialService) {
        this.socialService = socialService;
        this.onCreate = new EventEmitter();
    }
    /**
     * @return {?}
     */
    GroupCreateComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this._input = this.inputGroup.nativeElement;
        document.body.appendChild(this.modal._element.nativeElement);
    };
    /**
     * @return {?}
     */
    GroupCreateComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.modal._element.nativeElement.remove();
    };
    /**
     * @return {?}
     */
    GroupCreateComponent.prototype.open = /**
     * @return {?}
     */
    function () {
        this._input.value = '';
        this.listUser.resetData();
        this.modal.show();
    };
    /**
     * @return {?}
     */
    GroupCreateComponent.prototype.onShown = /**
     * @return {?}
     */
    function () {
        this._input.focus();
        this.listUser.onSearch();
    };
    /**
     * @return {?}
     */
    GroupCreateComponent.prototype.onSave = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var params = {
            category: this._input.value.trim(),
            member: this.listUser.selectMembers.map((/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return item.username; })).join(',')
        };
        if (!params.category) {
            this._input.focus();
            return;
        }
        if (!params.member) {
            this.listUser.focusInput();
            return;
        }
        this.socialService.groupMemberCreate(params, (/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            _this.onCreate.emit(data);
        }));
        this.modal.hide();
    };
    /**
     * @return {?}
     */
    GroupCreateComponent.prototype.onCancel = /**
     * @return {?}
     */
    function () {
        this.modal.hide();
    };
    GroupCreateComponent.decorators = [
        { type: Component, args: [{
                    selector: '[socialGroupCreate]',
                    template: "<div class=\"modal fade\" bsModal #modal=\"bs-modal\" (onShown)=\"onShown()\" tabindex=\"-1\" role=\"dialog\">\n  <div class=\"modal-dialog\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <h5 class=\"modal-title pull-left\">T\u1EA1o nh\u00F3m</h5>\n        <button type=\"button\" class=\"close pull-right\" (click)=\"modal.hide()\" tabindex=\"-1\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>\n      <div class=\"modal-body\">\n        <div class=\"form-group\">\n          <label>T\u00EAn nh\u00F3m</label>\n          <input #inputGroup type=\"text\" class=\"form-control\">\n        </div>\n        <div class=\"form-group\">\n          <label>Th\u00EAm th\u00E0nh vi\u00EAn</label>\n          <div socialListUser #listUser></div>\n        </div>\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-primary\" (click)=\"onSave()\">T\u1EA1o nh\u00F3m</button>\n        <button type=\"button\" class=\"btn btn-secondary\" (click)=\"onCancel()\">\u0110\u00F3ng</button>\n      </div>\n    </div>\n  </div>\n</div>\n",
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    GroupCreateComponent.ctorParameters = function () { return [
        { type: SocialService }
    ]; };
    GroupCreateComponent.propDecorators = {
        onCreate: [{ type: Output }],
        modal: [{ type: ViewChild, args: ['modal',] }],
        inputGroup: [{ type: ViewChild, args: ['inputGroup',] }],
        listUser: [{ type: ViewChild, args: ['listUser',] }]
    };
    return GroupCreateComponent;
}());
export { GroupCreateComponent };
if (false) {
    /** @type {?} */
    GroupCreateComponent.prototype.onCreate;
    /** @type {?} */
    GroupCreateComponent.prototype.modal;
    /** @type {?} */
    GroupCreateComponent.prototype.inputGroup;
    /** @type {?} */
    GroupCreateComponent.prototype.listUser;
    /**
     * @type {?}
     * @private
     */
    GroupCreateComponent.prototype._input;
    /**
     * @type {?}
     * @private
     */
    GroupCreateComponent.prototype.socialService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvdXAtY3JlYXRlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtc29jaWFsLyIsInNvdXJjZXMiOlsic3JjL3NvY2lhbC1mcmllbmQvZ3JvdXAtY3JlYXRlL2dyb3VwLWNyZWF0ZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBNEIsTUFBTSxFQUFFLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMvRyxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxrQ0FBa0MsQ0FBQztBQUNuRSxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFFbkQ7SUFjSSw4QkFDWSxhQUE0QjtRQUE1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQVQ5QixhQUFRLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztJQVc3QyxDQUFDOzs7O0lBRUQsdUNBQVE7OztJQUFSO1FBQ0ksSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQztRQUM1QyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNqRSxDQUFDOzs7O0lBRUQsMENBQVc7OztJQUFYO1FBQ0ksSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQy9DLENBQUM7Ozs7SUFFRCxtQ0FBSTs7O0lBQUo7UUFDSSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3RCLENBQUM7Ozs7SUFFRCxzQ0FBTzs7O0lBQVA7UUFDSSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDN0IsQ0FBQzs7OztJQUVELHFDQUFNOzs7SUFBTjtRQUFBLGlCQW9CQzs7WUFuQk8sTUFBTSxHQUFHO1lBQ1QsUUFBUSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRTtZQUNsQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRzs7OztZQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsSUFBSSxDQUFDLFFBQVEsRUFBYixDQUFhLEVBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO1NBQzNFO1FBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUU7WUFDbEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNwQixPQUFPO1NBQ1Y7UUFFRCxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRTtZQUNoQixJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQzNCLE9BQU87U0FDVjtRQUVELElBQUksQ0FBQyxhQUFhLENBQUMsaUJBQWlCLENBQUMsTUFBTTs7OztRQUFFLFVBQUMsSUFBSTtZQUM5QyxLQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QixDQUFDLEVBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDdEIsQ0FBQzs7OztJQUVELHVDQUFROzs7SUFBUjtRQUNJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDdEIsQ0FBQzs7Z0JBL0RKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUscUJBQXFCO29CQUMvQiw4bkNBQTRDOztpQkFFL0M7Ozs7Z0JBTk8sYUFBYTs7OzJCQVFoQixNQUFNO3dCQUVOLFNBQVMsU0FBQyxPQUFPOzZCQUNqQixTQUFTLFNBQUMsWUFBWTsyQkFDdEIsU0FBUyxTQUFDLFVBQVU7O0lBc0R6QiwyQkFBQztDQUFBLEFBaEVELElBZ0VDO1NBM0RZLG9CQUFvQjs7O0lBQzdCLHdDQUE2Qzs7SUFFN0MscUNBQTBCOztJQUMxQiwwQ0FBZ0Q7O0lBQ2hELHdDQUFtRDs7Ozs7SUFFbkQsc0NBQWU7Ozs7O0lBR1gsNkNBQW9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0LCBPdXRwdXQsIFZpZXdDaGlsZH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0xpc3RVc2VyQ29tcG9uZW50fSBmcm9tICcuLi9saXN0LXVzZXIvbGlzdC11c2VyLmNvbXBvbmVudCc7XG5pbXBvcnQge1NvY2lhbFNlcnZpY2V9IGZyb20gJy4uLy4uL3NvY2lhbC5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdbc29jaWFsR3JvdXBDcmVhdGVdJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vZ3JvdXAtY3JlYXRlLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9ncm91cC1jcmVhdGUuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIEdyb3VwQ3JlYXRlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAgIEBPdXRwdXQoKSBvbkNyZWF0ZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gICAgQFZpZXdDaGlsZCgnbW9kYWwnKSBtb2RhbDtcbiAgICBAVmlld0NoaWxkKCdpbnB1dEdyb3VwJykgaW5wdXRHcm91cDogRWxlbWVudFJlZjtcbiAgICBAVmlld0NoaWxkKCdsaXN0VXNlcicpIGxpc3RVc2VyOiBMaXN0VXNlckNvbXBvbmVudDtcblxuICAgIHByaXZhdGUgX2lucHV0O1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgc29jaWFsU2VydmljZTogU29jaWFsU2VydmljZVxuICAgICkge1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLl9pbnB1dCA9IHRoaXMuaW5wdXRHcm91cC5uYXRpdmVFbGVtZW50O1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMubW9kYWwuX2VsZW1lbnQubmF0aXZlRWxlbWVudCk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMubW9kYWwuX2VsZW1lbnQubmF0aXZlRWxlbWVudC5yZW1vdmUoKTtcbiAgICB9XG5cbiAgICBvcGVuKCkge1xuICAgICAgICB0aGlzLl9pbnB1dC52YWx1ZSA9ICcnO1xuICAgICAgICB0aGlzLmxpc3RVc2VyLnJlc2V0RGF0YSgpO1xuICAgICAgICB0aGlzLm1vZGFsLnNob3coKTtcbiAgICB9XG5cbiAgICBvblNob3duKCkge1xuICAgICAgICB0aGlzLl9pbnB1dC5mb2N1cygpO1xuICAgICAgICB0aGlzLmxpc3RVc2VyLm9uU2VhcmNoKCk7XG4gICAgfVxuXG4gICAgb25TYXZlKCkge1xuICAgICAgICBsZXQgcGFyYW1zID0ge1xuICAgICAgICAgICAgY2F0ZWdvcnk6IHRoaXMuX2lucHV0LnZhbHVlLnRyaW0oKSxcbiAgICAgICAgICAgIG1lbWJlcjogdGhpcy5saXN0VXNlci5zZWxlY3RNZW1iZXJzLm1hcChpdGVtID0+IGl0ZW0udXNlcm5hbWUpLmpvaW4oJywnKVxuICAgICAgICB9O1xuICAgICAgICBpZiAoIXBhcmFtcy5jYXRlZ29yeSkge1xuICAgICAgICAgICAgdGhpcy5faW5wdXQuZm9jdXMoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghcGFyYW1zLm1lbWJlcikge1xuICAgICAgICAgICAgdGhpcy5saXN0VXNlci5mb2N1c0lucHV0KCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNvY2lhbFNlcnZpY2UuZ3JvdXBNZW1iZXJDcmVhdGUocGFyYW1zLCAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5vbkNyZWF0ZS5lbWl0KGRhdGEpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLm1vZGFsLmhpZGUoKTtcbiAgICB9XG5cbiAgICBvbkNhbmNlbCgpIHtcbiAgICAgICAgdGhpcy5tb2RhbC5oaWRlKCk7XG4gICAgfVxufVxuIl19