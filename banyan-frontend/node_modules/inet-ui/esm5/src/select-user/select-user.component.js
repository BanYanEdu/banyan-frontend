/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ModalSelectComponent } from "./modal-select/modal-select.component";
import { CoreService } from "inet-core";
var SelectUserComponent = /** @class */ (function () {
    function SelectUserComponent(coreService) {
        this.coreService = coreService;
        this.id = iNet.generateId();
        this.selectUsers = [];
        this.onAdd = new EventEmitter();
        this.isMouseEnter = false;
        this.isFocus = false;
        this.users = [];
    }
    /**
     * @return {?}
     */
    SelectUserComponent.prototype.valid = /**
     * @return {?}
     */
    function () {
        return this.isValid && this.selectUsers.length > 0;
    };
    /**
     * @return {?}
     */
    SelectUserComponent.prototype.clearValid = /**
     * @return {?}
     */
    function () {
        this.isFocus = false;
    };
    /**
     * @return {?}
     */
    SelectUserComponent.prototype.validInput = /**
     * @return {?}
     */
    function () {
        var _this = this;
        setTimeout((/**
         * @return {?}
         */
        function () {
            if (_this.valid()) {
                _this.isFocus = false;
            }
            else {
                _this.isFocus = true;
            }
        }), 250);
    };
    /**
     * @return {?}
     */
    SelectUserComponent.prototype.searchUser = /**
     * @return {?}
     */
    function () {
        var _this = this;
        clearTimeout(this.timer);
        this.timer = setTimeout((/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var value = _this.getKeyword();
            if (value === _this.searchValue) {
                return;
            }
            if (!value) {
                _this.users.length = 0;
                _this.searchValue = value;
                return;
            }
            _this.coreService.searchFirmAccount({ keyword: value, pageSize: 10 }, (/**
             * @param {?} data
             * @return {?}
             */
            function (data) {
                /** @type {?} */
                var users = data && data['items'] || [];
                _this.setUser(users);
            }));
        }), 300);
    };
    /**
     * @param {?} item
     * @return {?}
     */
    SelectUserComponent.prototype.removeUser = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        for (var i = 0; i < this.selectUsers.length; i++) {
            if (this.selectUsers[i].username === item.username) {
                this.selectUsers.splice(i, 1);
                this.validInput();
                this.onAdd.emit(item);
                return;
            }
        }
    };
    /**
     * @private
     * @return {?}
     */
    SelectUserComponent.prototype.setDefault = /**
     * @private
     * @return {?}
     */
    function () {
        this.inputUser.nativeElement.value = '';
        this.searchValue = '';
        this.users = [];
        this.selectUsers = [];
    };
    /**
     * @param {?} item
     * @return {?}
     */
    SelectUserComponent.prototype.addUser = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        var e_1, _a;
        if (this.isSingle) {
            this.selectUsers[0] = item;
        }
        else {
            try {
                for (var _b = tslib_1.__values(this.selectUsers), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var selectMember = _c.value;
                    if (selectMember.username === item.username) {
                        return;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            this.selectUsers.push(item);
        }
        this.inputUser.nativeElement.value = '';
        this.searchValue = '';
        this.focusInput();
        this.validInput();
    };
    /**
     * @param {?} e
     * @param {?} el
     * @return {?}
     */
    SelectUserComponent.prototype.clickUser = /**
     * @param {?} e
     * @param {?} el
     * @return {?}
     */
    function (e, el) {
        if (e.target.isSameNode(el)) {
            this.focusInput();
        }
    };
    /**
     * @return {?}
     */
    SelectUserComponent.prototype.removeLastUser = /**
     * @return {?}
     */
    function () {
        this.selectUsers.splice(-1);
    };
    /**
     * @return {?}
     */
    SelectUserComponent.prototype.openModal = /**
     * @return {?}
     */
    function () {
        this.modalSelect.show();
    };
    /**
     * @private
     * @param {?} user
     * @return {?}
     */
    SelectUserComponent.prototype.hasUser = /**
     * @private
     * @param {?} user
     * @return {?}
     */
    function (user) {
        var e_2, _a;
        try {
            for (var _b = tslib_1.__values(this.selectUsers), _c = _b.next(); !_c.done; _c = _b.next()) {
                var selectMember = _c.value;
                if (selectMember.username === user.username) {
                    return true;
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return false;
    };
    /**
     * @private
     * @param {?} users
     * @return {?}
     */
    SelectUserComponent.prototype.setUser = /**
     * @private
     * @param {?} users
     * @return {?}
     */
    function (users) {
        var _this = this;
        this.users = users.filter((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return !_this.hasUser(item); }));
    };
    /**
     * @private
     * @return {?}
     */
    SelectUserComponent.prototype.focusInput = /**
     * @private
     * @return {?}
     */
    function () {
        this.inputUser.nativeElement.focus();
    };
    /**
     * @private
     * @return {?}
     */
    SelectUserComponent.prototype.getKeyword = /**
     * @private
     * @return {?}
     */
    function () {
        return this.inputUser.nativeElement.value.trim();
    };
    /**
     * @return {?}
     */
    SelectUserComponent.prototype.onMouseEnter = /**
     * @return {?}
     */
    function () {
        this.isMouseEnter = true;
    };
    /**
     * @return {?}
     */
    SelectUserComponent.prototype.onMouseDown = /**
     * @return {?}
     */
    function () {
        this.isMouseEnter = false;
    };
    SelectUserComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-select-user',
                    template: "<div class=\"row\">\n    <div class=\"col-sm-12\">\n        <div class=\"border select-multiple-content\"\n             #shareUserContainer\n             (click)=\"clickUser($event, shareUserContainer)\"\n             [ngClass]=\"{'select-valid': isValid && isFocus && selectUsers?.length < 1}\"\n             (mouseenter)=\"onMouseEnter()\"\n             (mouseleave)=\"onMouseDown()\">\n            <span *ngIf=\"isValid && isFocus && isMouseEnter && selectUsers?.length < 1\" class=\"select-tooltip\">\n                B\u1EA1n c\u1EA7n ch\u1ECDn \u00EDt nh\u1EA5t m\u1ED9t ng\u01B0\u1EDDi.\n            </span>\n            <span *ngFor=\"let user of selectUsers\" class=\"select-multiple-item border\">\n                <img userAvatar [usercode]=\"user?.username\" width=\"28\" height=\"28\">\n                <span>{{user.fullname}}</span>\n                <span (click)=\"removeUser(user)\" class=\"badge badge-muted text-muted rounded-circle m-1\">\n                    <i class=\"fa fa-times\" style=\"cursor: pointer;\"></i>\n                </span>\n            </span>\n            <span class=\"autocomplete-container\">\n                <input type=\"text\" class=\"auto-tag-input\" style=\"width: 80px !important;\"\n                       #inputUser\n                       appAutocompleteInput\n                       [autoList]=\"autoList\"\n                       (input)=\"searchUser()\"\n                       (onBackSpaceRemove)=\"removeLastUser()\"\n                       (blur)=\"validInput()\">\n            </span>\n        </div>\n        <ul class=\"list-group autocomplete-list\"\n            appAutocompleteList\n            #autoList=\"appAutocompleteList\">\n            <li *ngFor=\"let item of users\" (click)=\"addUser(item)\" class=\"list-group-item auto-item-image rounded-0\">\n                <img userAvatar [usercode]=\"item?.username\">\n                <div>{{item.fullname}}</div>\n            </li>\n        </ul>\n        <i (click)=\"openModal()\" class=\"icon-user\" style=\"position: absolute;top: 0;right: 10px;padding: 16px;cursor: pointer;\"></i>\n    </div>\n    <app-modal-select\n        [selectUsers]=\"selectUsers\"\n        [isSingle]=\"isSingle\">\n    </app-modal-select>\n</div>",
                    styles: [".autocomplete-container{position:relative}.autocomplete-list{display:none;position:absolute;left:0;right:0;z-index:1;overflow:auto;max-height:500px}.autocomplete-list>li{padding:10px;cursor:pointer;border-width:0 1px}.autocomplete-list>li:first-child{border-top-width:1px}.autocomplete-list>li:last-child{border-bottom-width:1px}.auto-item-image i,.auto-item-image img{float:left;width:30px;height:30px;margin-right:10px}.auto-item-image i{text-align:center;line-height:30px;background:rgba(0,0,0,.05);color:rgba(0,0,0,.5)}.auto-item-image div{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.auto-tag{padding:2px 7px 7px;min-height:38px;height:auto}.auto-tag-input{border:0;padding:0;margin-top:5px;height:24px;line-height:22px}.auto-tag-input:focus{outline:0}.auto-tag-item{font-size:14px;line-height:24px;margin-right:5px;margin-top:5px;padding:0 5px;float:left;background:#e9ebee;border:1px solid rgba(0,0,0,.2);border-radius:2px}.auto-tag-item i{float:right;margin-right:-5px;height:24px;width:24px;line-height:24px;text-align:center;cursor:pointer}", ".select-multiple-content{width:100%;min-height:46px;padding:3px}.select-multiple-item{color:#343434;background:#e0e0e0;margin:4px;display:inline-block;font-size:.875em}.list-group-item img{height:34px!important;width:34px!important}.badge-muted{color:#e0e0e0!important;background:#9e9e9e}.auto-tag-input{margin-top:0!important;height:37px!important}.auto-item-image>img{margin-top:-5px}.autocomplete-list{padding:0 15px;overflow:hidden}.select-valid{border:1px solid red!important}.select-tooltip{position:absolute;bottom:150%;margin-bottom:-15px;padding:7px;width:50%;left:25%;border-radius:3px;background-color:#dc3545;color:#fff;content:attr(data-tooltip);text-align:center;font-size:14px;line-height:1.2}"]
                }] }
    ];
    /** @nocollapse */
    SelectUserComponent.ctorParameters = function () { return [
        { type: CoreService }
    ]; };
    SelectUserComponent.propDecorators = {
        id: [{ type: Input, args: ['id',] }],
        selectUsers: [{ type: Input, args: ['selectUsers',] }],
        isSingle: [{ type: Input, args: ['isSingle',] }],
        isValid: [{ type: Input, args: ['isValid',] }],
        onAdd: [{ type: Output }],
        modalSelect: [{ type: ViewChild, args: [ModalSelectComponent,] }],
        inputUser: [{ type: ViewChild, args: ['inputUser',] }]
    };
    return SelectUserComponent;
}());
export { SelectUserComponent };
if (false) {
    /** @type {?} */
    SelectUserComponent.prototype.id;
    /** @type {?} */
    SelectUserComponent.prototype.selectUsers;
    /** @type {?} */
    SelectUserComponent.prototype.isSingle;
    /** @type {?} */
    SelectUserComponent.prototype.isValid;
    /** @type {?} */
    SelectUserComponent.prototype.onAdd;
    /** @type {?} */
    SelectUserComponent.prototype.modalSelect;
    /** @type {?} */
    SelectUserComponent.prototype.inputUser;
    /** @type {?} */
    SelectUserComponent.prototype.isMouseEnter;
    /** @type {?} */
    SelectUserComponent.prototype.isFocus;
    /** @type {?} */
    SelectUserComponent.prototype.users;
    /**
     * @type {?}
     * @private
     */
    SelectUserComponent.prototype.timer;
    /**
     * @type {?}
     * @private
     */
    SelectUserComponent.prototype.searchValue;
    /**
     * @type {?}
     * @private
     */
    SelectUserComponent.prototype.coreService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LXVzZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC11aS8iLCJzb3VyY2VzIjpbInNyYy9zZWxlY3QtdXNlci9zZWxlY3QtdXNlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDNUYsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sdUNBQXVDLENBQUM7QUFDM0UsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLFdBQVcsQ0FBQztBQUd0QztJQTBCRSw2QkFBb0IsV0FBd0I7UUFBeEIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFoQi9CLE9BQUUsR0FBVyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDdEIsZ0JBQVcsR0FBVSxFQUFFLENBQUM7UUFJcEMsVUFBSyxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFLMUMsaUJBQVksR0FBVyxLQUFLLENBQUM7UUFDN0IsWUFBTyxHQUFXLEtBQUssQ0FBQztRQUN4QixVQUFLLEdBQVUsRUFBRSxDQUFDO0lBSThCLENBQUM7Ozs7SUFFakQsbUNBQUs7OztJQUFMO1FBQ0UsT0FBTyxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUNyRCxDQUFDOzs7O0lBRUQsd0NBQVU7OztJQUFWO1FBQ0UsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7SUFDdkIsQ0FBQzs7OztJQUVELHdDQUFVOzs7SUFBVjtRQUFBLGlCQVNDO1FBUkMsVUFBVTs7O1FBQUM7WUFDVCxJQUFHLEtBQUksQ0FBQyxLQUFLLEVBQUUsRUFBQztnQkFDZCxLQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQzthQUN0QjtpQkFDRztnQkFDRixLQUFJLENBQUMs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QyxZQUFZLEdBQUcsSUFBSSxDQUFDO0lBQzNCLENBQUM7Ozs7SUFFRCx5Q0FBVzs7O0lBQVg7UUFDRSxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztJQUM1QixDQUFDOztnQkEvSUYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxpQkFBaUI7b0JBQzNCLDhzRUFBMkM7O2lCQUs1Qzs7OztnQkFWTyxXQUFXOzs7cUJBYWhCLEtBQUssU0FBQyxJQUFJOzhCQUNWLEtBQUssU0FBQyxhQUFhOzJCQUNuQixLQUFLLFNBQUMsVUFBVTswQkFDaEIsS0FBSyxTQUFDLFNBQVM7d0JBRWYsTUFBTTs4QkFFTixTQUFTLFNBQUMsb0JBQW9COzRCQUM5QixTQUFTLFNBQUMsV0FBVzs7SUE4SHhCLDBCQUFDO0NBQUEsQUFoSkQsSUFnSkM7U0F4SVksbUJBQW1COzs7SUFFOUIsaUNBQTRDOztJQUM1QywwQ0FBOEM7O0lBQzlDLHVDQUFxQzs7SUFDckMsc0NBQW1DOztJQUVuQyxvQ0FBMEM7O0lBRTFDLDBDQUFtRTs7SUFDbkUsd0NBQThDOztJQUU5QywyQ0FBNkI7O0lBQzdCLHNDQUF3Qjs7SUFDeEIsb0NBQWtCOzs7OztJQUNsQixvQ0FBbUI7Ozs7O0lBQ25CLDBDQUE0Qjs7Ozs7SUFFaEIsMENBQWdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCwgVmlld0NoaWxkfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TW9kYWxTZWxlY3RDb21wb25lbnR9IGZyb20gXCIuL21vZGFsLXNlbGVjdC9tb2RhbC1zZWxlY3QuY29tcG9uZW50XCI7XG5pbXBvcnQge0NvcmVTZXJ2aWNlfSBmcm9tIFwiaW5ldC1jb3JlXCI7XG5kZWNsYXJlIGxldCBpTmV0OiBhbnk7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FwcC1zZWxlY3QtdXNlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9zZWxlY3QtdXNlci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogW1xuICAgICAgJy4uL3Njc3MvYXV0b2NvbXBsZXRlLmNzcycsXG4gICAgICAnLi9zZWxlY3QtdXNlci5jb21wb25lbnQuY3NzJ1xuICBdXG59KVxuZXhwb3J0IGNsYXNzIFNlbGVjdFVzZXJDb21wb25lbnR7XG4gIFxuICBASW5wdXQoJ2lkJykgaWQ6IHN0cmluZyA9IGlOZXQuZ2VuZXJhdGVJZCgpO1xuICBASW5wdXQoJ3NlbGVjdFVzZXJzJykgc2VsZWN0VXNlcnM6IGFueVtdID0gW107XG4gIEBJbnB1dCgnaXNTaW5nbGUnKSBpc1NpbmdsZTogYm9vbGVhbjtcbiAgQElucHV0KCdpc1ZhbGlkJykgaXNWYWxpZDogYm9vbGVhbjtcblxuICBAT3V0cHV0KCkgb25BZGQgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBAVmlld0NoaWxkKE1vZGFsU2VsZWN0Q29tcG9uZW50KSBtb2RhbFNlbGVjdDogTW9kYWxTZWxlY3RDb21wb25lbnQ7XG4gIEBWaWV3Q2hpbGQoJ2lucHV0VXNlcicpIGlucHV0VXNlcjogRWxlbWVudFJlZjtcbiAgXG4gIGlzTW91c2VFbnRlcjpib29sZWFuID0gZmFsc2U7XG4gIGlzRm9jdXM6Ym9vbGVhbiA9IGZhbHNlO1xuICB1c2VyczogYW55W10gPSBbXTtcbiAgcHJpdmF0ZSB0aW1lcjogYW55O1xuICBwcml2YXRlIHNlYXJjaFZhbHVlOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjb3JlU2VydmljZTogQ29yZVNlcnZpY2UpIHsgfVxuXG4gIHZhbGlkKCl7XG4gICAgcmV0dXJuIHRoaXMuaXNWYWxpZCAmJiB0aGlzLnNlbGVjdFVzZXJzLmxlbmd0aCA+IDA7XG4gIH1cblxuICBjbGVhclZhbGlkKCl7XG4gICAgdGhpcy5pc0ZvY3VzID0gZmFsc2U7XG4gIH1cblxuICB2YWxpZElucHV0KCl7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBpZih0aGlzLnZhbGlkKCkpe1xuICAgICAgICB0aGlzLmlzRm9jdXMgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGVsc2V7XG4gICAgICAgIHRoaXMuaXNGb2N1cyA9IHRydWU7XG4gICAgICB9XG4gICAgfSwgMjUwKTtcbiAgfVxuXG4gIHNlYXJjaFVzZXIoKSB7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZXIpO1xuICAgIHRoaXMudGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGxldCB2YWx1ZSA9IHRoaXMuZ2V0S2V5d29yZCgpO1xuICAgICAgaWYgKHZhbHVlID09PSB0aGlzLnNlYXJjaFZhbHVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmICghdmFsdWUpIHtcbiAgICAgICAgdGhpcy51c2Vycy5sZW5ndGggPSAwO1xuICAgICAgICB0aGlzLnNlYXJjaFZhbHVlID0gdmFsdWU7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoaXMuY29yZVNlcnZpY2Uuc2VhcmNoRmlybUFjY291bnQoe2tleXdvcmQ6IHZhbHVlLCBwYWdlU2l6ZTogMTB9LCAoZGF0YSkgPT4ge1xuICAgICAgICBsZXQgdXNlcnMgPSBkYXRhICYmIGRhdGFbJ2l0ZW1zJ10gfHwgW107XG4gICAgICAgIHRoaXMuc2V0VXNlcih1c2Vycyk7XG4gICAgICB9KTtcbiAgICB9LDMwMCk7XG4gIH1cblxuICByZW1vdmVVc2VyKGl0ZW06IGFueSl7XG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuc2VsZWN0VXNlcnMubGVuZ3RoOyBpKyspe1xuICAgICAgaWYodGhpcy5zZWxlY3RVc2Vyc1tpXS51c2VybmFtZSA9PT0gaXRlbS51c2VybmFtZSl7XG4gICAgICAgIHRoaXMuc2VsZWN0VXNlcnMuc3BsaWNlKGksIDEpO1xuICAgICAgICB0aGlzLnZhbGlkSW5wdXQoKTtcbiAgICAgICAgdGhpcy5vbkFkZC5lbWl0KGl0ZW0pO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZXREZWZhdWx0KCl7XG4gICAgdGhpcy5pbnB1dFVzZXIubmF0aXZlRWxlbWVudC52YWx1ZSA9ICcnO1xuICAgIHRoaXMuc2VhcmNoVmFsdWUgPSAnJztcbiAgICB0aGlzLnVzZXJzID0gW107XG4gICAgdGhpcy5zZWxlY3RVc2VycyA9IFtdO1xuICB9XG5cbiAgYWRkVXNlcihpdGVtOiBhbnkpe1xuICAgIGlmKHRoaXMuaXNTaW5nbGUpe1xuICAgICAgdGhpcy5zZWxlY3RVc2Vyc1swXSA9IGl0ZW07XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICBmb3IobGV0IHNlbGVjdE1lbWJlciBvZiB0aGlzLnNlbGVjdFVzZXJzKXtcbiAgICAgICAgaWYoc2VsZWN0TWVtYmVyLnVzZXJuYW1lID09PSBpdGVtLnVzZXJuYW1lKXtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMuc2VsZWN0VXNlcnMucHVzaChpdGVtKTtcbiAgICB9XG4gICAgdGhpcy5pbnB1dFVzZXIubmF0aXZlRWxlbWVudC52YWx1ZSA9ICcnO1xuICAgIHRoaXMuc2VhcmNoVmFsdWUgPSAnJztcbiAgICB0aGlzLmZvY3VzSW5wdXQoKTtcbiAgICB0aGlzLnZhbGlkSW5wdXQoKTtcbiAgfVxuXG4gIGNsaWNrVXNlcihlLCBlbCkge1xuICAgIGlmIChlLnRhcmdldC5pc1NhbWVOb2RlKGVsKSkge1xuICAgICAgdGhpcy5mb2N1c0lucHV0KCk7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlTGFzdFVzZXIoKSB7XG4gICAgdGhpcy5zZWxlY3RVc2Vycy5zcGxpY2UoLTEpO1xuICB9XG5cbiAgb3Blbk1vZGFsKCl7XG4gICAgdGhpcy5tb2RhbFNlbGVjdC5zaG93KCk7XG4gIH1cblxuICBwcml2YXRlIGhhc1VzZXIodXNlcik6IGJvb2xlYW4ge1xuICAgIGZvciAobGV0IHNlbGVjdE1lbWJlciBvZiB0aGlzLnNlbGVjdFVzZXJzKSB7XG4gICAgICBpZiAoc2VsZWN0TWVtYmVyLnVzZXJuYW1lID09PSB1c2VyLnVzZXJuYW1lKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBwcml2YXRlIHNldFVzZXIodXNlcnM6IGFueVtdKSB7XG4gICAgdGhpcy51c2VycyA9IHVzZXJzLmZpbHRlcigoaXRlbSkgPT4gIXRoaXMuaGFzVXNlcihpdGVtKSk7XG4gIH1cblxuICBwcml2YXRlIGZvY3VzSW5wdXQoKSB7XG4gICAgdGhpcy5pbnB1dFVzZXIubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRLZXl3b3JkKCkge1xuICAgIHJldHVybiB0aGlzLmlucHV0VXNlci5uYXRpdmVFbGVtZW50LnZhbHVlLnRyaW0oKTtcbiAgfVxuXG4gIG9uTW91c2VFbnRlcigpe1xuICAgIHRoaXMuaXNNb3VzZUVudGVyID0gdHJ1ZTtcbiAgfVxuXG4gIG9uTW91c2VEb3duKCl7XG4gICAgdGhpcy5pc01vdXNlRW50ZXIgPSBmYWxzZTtcbiAgfVxufVxuIl19