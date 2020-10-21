/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { SocialService } from '../../social.service';
import { AccentService, CacheStorageService } from 'inet-core';
var ListUserComponent = /** @class */ (function () {
    function ListUserComponent(socialService, accentService, cacheStorage) {
        var _this = this;
        this.socialService = socialService;
        this.accentService = accentService;
        this.cacheStorage = cacheStorage;
        this.placeholder = 'Tìm kiếm...';
        this.height = '240px';
        this.members = [];
        this.selectMembers = [];
        this.showMembers = [];
        this.matchMembers = [];
        this._allEmployees = 'social_employees';
        this._allFriends = 'social_friends';
        /** @type {?} */
        var employees = this.cacheStorage.getData(this._allEmployees);
        // Cache employees on 5 minutes
        if (employees) {
            this._initMembers(JSON.parse(employees));
        }
        else {
            this.cacheStorage.promiseQueue(this._allEmployees, (/**
             * @param {?} key
             * @return {?}
             */
            function (key) {
                _this.socialService.searchMember({ pageSize: -1 }, (/**
                 * @param {?} users
                 * @return {?}
                 */
                function (users) {
                    if (users && users.length > 0) {
                        _this.cacheStorage.setData(key, JSON.stringify(users));
                    }
                    _this.cacheStorage.resolveQueue(key, _this, [users]);
                }));
            }), (/**
             * @param {?} users
             * @return {?}
             */
            function (users) { return _this._initMembers(users); }));
        }
        this.cacheStorage.promiseQueue(this._allFriends, (/**
         * @param {?} key
         * @return {?}
         */
        function (key) {
            _this.socialService.listFriends({ pageSize: -1 }, (/**
             * @param {?} users
             * @return {?}
             */
            function (users) {
                _this.cacheStorage.resolveQueue(key, _this, [users]);
            }));
        }), (/**
         * @param {?} users
         * @return {?}
         */
        function (users) { return _this._initMembers(users); }));
    }
    /**
     * @return {?}
     */
    ListUserComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this._search = this.search.nativeElement;
    };
    /**
     * @return {?}
     */
    ListUserComponent.prototype.resetData = /**
     * @return {?}
     */
    function () {
        this.selectMembers = [];
        this.showMembers = [];
        this.matchMembers = [];
        this._search.value = '';
        this.members.forEach((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return delete item.selected; }));
    };
    /**
     * @return {?}
     */
    ListUserComponent.prototype.focusInput = /**
     * @return {?}
     */
    function () {
        this._search.focus();
    };
    /**
     * @return {?}
     */
    ListUserComponent.prototype.onSearch = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var value = this._search.value.trim();
        if (value) {
            value = this.accentService.viToEn(value.toLowerCase());
            this.matchMembers = this.members.filter((/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return item._index.indexOf(value) > -1; }));
        }
        else {
            this.matchMembers = this.members;
        }
        this.showMembers = this.matchMembers;
    };
    /**
     * @return {?}
     */
    ListUserComponent.prototype.onScroll = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @param {?} member
     * @return {?}
     */
    ListUserComponent.prototype.addMember = /**
     * @param {?} member
     * @return {?}
     */
    function (member) {
        member.selected = !member.selected;
        if (member.selected) {
            this.selectMembers.push(member);
        }
        else {
            this.removeMember(member);
        }
    };
    /**
     * @param {?} member
     * @return {?}
     */
    ListUserComponent.prototype.removeMember = /**
     * @param {?} member
     * @return {?}
     */
    function (member) {
        this.selectMembers.splice(this.selectMembers.indexOf(member), 1);
    };
    /**
     * @private
     * @param {?} users
     * @return {?}
     */
    ListUserComponent.prototype._initMembers = /**
     * @private
     * @param {?} users
     * @return {?}
     */
    function (users) {
        var _this = this;
        users.forEach((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return _this._addMember(item); }));
        this._sortMembers();
    };
    /**
     * @private
     * @param {?} member
     * @return {?}
     */
    ListUserComponent.prototype._addMember = /**
     * @private
     * @param {?} member
     * @return {?}
     */
    function (member) {
        member.username = member.username || member.usercode;
        if (this._hasMember(member)) {
            return;
        }
        member._index = this.accentService.viToEn(member.fullname.toLowerCase()) + ' ' + member.username;
        this.members.push(member);
    };
    /**
     * @private
     * @return {?}
     */
    ListUserComponent.prototype._sortMembers = /**
     * @private
     * @return {?}
     */
    function () {
        this.members.sort((/**
         * @param {?} a
         * @param {?} b
         * @return {?}
         */
        function (a, b) { return a.fullname.localeCompare(b.fullname); }));
    };
    /**
     * @private
     * @param {?} member
     * @return {?}
     */
    ListUserComponent.prototype._hasMember = /**
     * @private
     * @param {?} member
     * @return {?}
     */
    function (member) {
        for (var i = 0; i < this.members.length; i++) {
            if (this.members[i].username === member.username) {
                return true;
            }
        }
    };
    ListUserComponent.decorators = [
        { type: Component, args: [{
                    selector: '[socialListUser]',
                    template: "<div class=\"auto-tag form-control\" style=\"max-height: 140px;overflow: auto;\">\n  <div *ngFor=\"let member of selectMembers\" class=\"auto-tag-item\">\n    <span>{{member.fullname}}</span>\n    <i class=\"fa fa-times\" (click)=\"removeMember(member)\"></i>\n  </div>\n  <input #search (keyup)=\"onSearch()\" type=\"text\" class=\"auto-tag-input\" [placeholder]=\"placeholder\">\n</div>\n<div #contactList (scroll)=\"onScroll()\"\n     style=\"overflow:auto;height: 240px;margin-top:10px\">\n  <div class=\"list-item list-avatar\" *ngFor=\"let member of showMembers\" (click)=\"addMember(member)\">\n    <img userAvatar [usercode]=\"member.username || member.usercode\" class=\"list-item__image\">\n    <div class=\"list-item__content\">{{member.fullname}}</div>\n    <label class=\"checkbox-container\">\n      <input type=\"checkbox\" [checked]=\"member.selected\" disabled>\n      <span class=\"checkmark\"></span>\n    </label>\n  </div>\n</div>",
                    styles: [".auto-tag{display:flex;flex-wrap:wrap;height:auto;padding-bottom:0}.auto-tag .auto-tag-item{display:flex;align-items:center;border-radius:4px;background:#eee;padding:0 10px;white-space:nowrap;margin:0 5px 5px 0}.auto-tag .auto-tag-item i{cursor:pointer;padding:5px;margin-right:-5px}.auto-tag .auto-tag-input{border:0;outline:0}.checkbox-container{display:block;position:relative;cursor:pointer;font-size:22px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;min-width:20px;min-height:20px;margin:0}.checkbox-container input{position:absolute;opacity:0;cursor:pointer}.checkbox-container .checkmark{position:absolute;top:0;left:0;height:20px;width:20px;background-color:#eee;border-radius:4px}.checkbox-container .checkmark:after{content:\"\";position:absolute;display:none;left:8px;top:4px;width:5px;height:10px;border:solid #fff;border-width:0 3px 3px 0;transform:rotate(45deg)}.checkbox-container:hover .checkmark{background-color:#ccc}.checkbox-container input:checked+.checkmark{background-color:#2196f3}.checkbox-container input:checked+.checkmark:after{display:block}.list-avatar{padding:5px 10px;overflow:hidden;cursor:pointer;margin-bottom:5px;display:flex;align-items:center}.list-item__icon,.list-item__image{width:32px;height:32px;border-radius:50%}.list-item__icon{line-height:32px;text-align:center;background:rgba(0,0,0,.05);color:rgba(0,0,0,.5)}.list-item__content{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding:0 15px;line-height:32px;flex-grow:1}"]
                }] }
    ];
    /** @nocollapse */
    ListUserComponent.ctorParameters = function () { return [
        { type: SocialService },
        { type: AccentService },
        { type: CacheStorageService }
    ]; };
    ListUserComponent.propDecorators = {
        placeholder: [{ type: Input }],
        height: [{ type: Input }],
        search: [{ type: ViewChild, args: ['search',] }]
    };
    return ListUserComponent;
}());
export { ListUserComponent };
if (false) {
    /** @type {?} */
    ListUserComponent.prototype.placeholder;
    /** @type {?} */
    ListUserComponent.prototype.height;
    /** @type {?} */
    ListUserComponent.prototype.search;
    /** @type {?} */
    ListUserComponent.prototype.members;
    /** @type {?} */
    ListUserComponent.prototype.selectMembers;
    /** @type {?} */
    ListUserComponent.prototype.showMembers;
    /** @type {?} */
    ListUserComponent.prototype.matchMembers;
    /**
     * @type {?}
     * @private
     */
    ListUserComponent.prototype._search;
    /**
     * @type {?}
     * @private
     */
    ListUserComponent.prototype._allEmployees;
    /**
     * @type {?}
     * @private
     */
    ListUserComponent.prototype._allFriends;
    /**
     * @type {?}
     * @private
     */
    ListUserComponent.prototype.socialService;
    /**
     * @type {?}
     * @private
     */
    ListUserComponent.prototype.accentService;
    /**
     * @type {?}
     * @private
     */
    ListUserComponent.prototype.cacheStorage;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC11c2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtc29jaWFsLyIsInNvdXJjZXMiOlsic3JjL3NvY2lhbC1mcmllbmQvbGlzdC11c2VyL2xpc3QtdXNlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBVSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDOUUsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ25ELE9BQU8sRUFBQyxhQUFhLEVBQUUsbUJBQW1CLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFFN0Q7SUFzQkksMkJBQ1ksYUFBNEIsRUFDNUIsYUFBNEIsRUFDNUIsWUFBaUM7UUFIN0MsaUJBOEJDO1FBN0JXLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLGlCQUFZLEdBQVosWUFBWSxDQUFxQjtRQWpCcEMsZ0JBQVcsR0FBVyxhQUFhLENBQUM7UUFDcEMsV0FBTSxHQUFXLE9BQU8sQ0FBQztRQUlsQyxZQUFPLEdBQVUsRUFBRSxDQUFDO1FBQ3BCLGtCQUFhLEdBQVEsRUFBRSxDQUFDO1FBQ3hCLGdCQUFXLEdBQVEsRUFBRSxDQUFDO1FBQ3RCLGlCQUFZLEdBQVEsRUFBRSxDQUFDO1FBR2Ysa0JBQWEsR0FBRyxrQkFBa0IsQ0FBQztRQUNuQyxnQkFBVyxHQUFHLGdCQUFnQixDQUFDOztZQVE3QixTQUFTLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUMvRCwrQkFBK0I7UUFDL0IsSUFBSSxTQUFTLEVBQUU7WUFDWCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztTQUM1QzthQUFNO1lBQ0gsSUFBSSxDQUFDLFlBQVksQ0FBQyxZ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Q0FBQyxPQUFPLENBQUMsSUFBSTs7Ozs7UUFBQyxVQUFDLENBQUMsRUFBRSxDQUFDLElBQUssT0FBQSxDQUFDLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQXBDLENBQW9DLEVBQUMsQ0FBQztJQUN0RSxDQUFDOzs7Ozs7SUFFTyxzQ0FBVTs7Ozs7SUFBbEIsVUFBbUIsTUFBTTtRQUNyQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDMUMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsS0FBSyxNQUFNLENBQUMsUUFBUSxFQUFFO2dCQUM5QyxPQUFPLElBQUksQ0FBQzthQUNmO1NBQ0o7SUFDTCxDQUFDOztnQkEzSEosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxrQkFBa0I7b0JBQzVCLG04QkFBeUM7O2lCQUk1Qzs7OztnQkFUTyxhQUFhO2dCQUNiLGFBQWE7Z0JBQUUsbUJBQW1COzs7OEJBVXJDLEtBQUs7eUJBQ0wsS0FBSzt5QkFFTCxTQUFTLFNBQUMsUUFBUTs7SUFpSHZCLHdCQUFDO0NBQUEsQUE1SEQsSUE0SEM7U0FySFksaUJBQWlCOzs7SUFDMUIsd0NBQTZDOztJQUM3QyxtQ0FBa0M7O0lBRWxDLG1DQUF3Qzs7SUFFeEMsb0NBQW9COztJQUNwQiwwQ0FBd0I7O0lBQ3hCLHdDQUFzQjs7SUFDdEIseUNBQXVCOzs7OztJQUV2QixvQ0FBa0M7Ozs7O0lBQ2xDLDBDQUEyQzs7Ozs7SUFDM0Msd0NBQXVDOzs7OztJQUduQywwQ0FBb0M7Ozs7O0lBQ3BDLDBDQUFvQzs7Ozs7SUFDcEMseUNBQXlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEVsZW1lbnRSZWYsIElucHV0LCBPbkluaXQsIFZpZXdDaGlsZH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1NvY2lhbFNlcnZpY2V9IGZyb20gJy4uLy4uL3NvY2lhbC5zZXJ2aWNlJztcbmltcG9ydCB7QWNjZW50U2VydmljZSwgQ2FjaGVTdG9yYWdlU2VydmljZX0gZnJvbSAnaW5ldC1jb3JlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdbc29jaWFsTGlzdFVzZXJdJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vbGlzdC11c2VyLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFtcbiAgICAgICAgJy4uLy4uL3N0eWxlcy91c2VyLXN0eWxlcy5jc3MnXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBMaXN0VXNlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgQElucHV0KCkgcGxhY2Vob2xkZXI6IHN0cmluZyA9ICdUw6xtIGtp4bq/bS4uLic7XG4gICAgQElucHV0KCkgaGVpZ2h0OiBzdHJpbmcgPSAnMjQwcHgnO1xuXG4gICAgQFZpZXdDaGlsZCgnc2VhcmNoJykgc2VhcmNoOiBFbGVtZW50UmVmO1xuXG4gICAgbWVtYmVyczogYW55W10gPSBbXTtcbiAgICBzZWxlY3RNZW1iZXJzOiBhbnkgPSBbXTtcbiAgICBzaG93TWVtYmVyczogYW55ID0gW107XG4gICAgbWF0Y2hNZW1iZXJzOiBhbnkgPSBbXTtcblxuICAgIHByaXZhdGUgX3NlYXJjaDogSFRNTElucHV0RWxlbWVudDtcbiAgICBwcml2YXRlIF9hbGxFbXBsb3llZXMgPSAnc29jaWFsX2VtcGxveWVlcyc7XG4gICAgcHJpdmF0ZSBfYWxsRnJpZW5kcyA9ICdzb2NpYWxfZnJpZW5kcyc7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBzb2NpYWxTZXJ2aWNlOiBTb2NpYWxTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGFjY2VudFNlcnZpY2U6IEFjY2VudFNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgY2FjaGVTdG9yYWdlOiBDYWNoZVN0b3JhZ2VTZXJ2aWNlXG4gICAgKSB7XG5cbiAgICAgICAgY29uc3QgZW1wbG95ZWVzID0gdGhpcy5jYWNoZVN0b3JhZ2UuZ2V0RGF0YSh0aGlzLl9hbGxFbXBsb3llZXMpO1xuICAgICAgICAvLyBDYWNoZSBlbXBsb3llZXMgb24gNSBtaW51dGVzXG4gICAgICAgIGlmIChlbXBsb3llZXMpIHtcbiAgICAgICAgICAgIHRoaXMuX2luaXRNZW1iZXJzKEpTT04ucGFyc2UoZW1wbG95ZWVzKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNhY2hlU3RvcmFnZS5wcm9taXNlUXVldWUodGhpcy5fYWxsRW1wbG95ZWVzLFxuICAgICAgICAgICAgICAgIChrZXkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zb2NpYWxTZXJ2aWNlLnNlYXJjaE1lbWJlcih7cGFnZVNpemU6IC0xfSwgKHVzZXJzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodXNlcnMgJiYgdXNlcnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2FjaGVTdG9yYWdlLnNldERhdGEoa2V5LCBKU09OLnN0cmluZ2lmeSh1c2VycykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWNoZVN0b3JhZ2UucmVzb2x2ZVF1ZXVlKGtleSwgdGhpcywgW3VzZXJzXSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgKHVzZXJzKSA9PiB0aGlzLl9pbml0TWVtYmVycyh1c2VycykpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jYWNoZVN0b3JhZ2UucHJvbWlzZVF1ZXVlKHRoaXMuX2FsbEZyaWVuZHMsXG4gICAgICAgICAgICAoa2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zb2NpYWxTZXJ2aWNlLmxpc3RGcmllbmRzKHtwYWdlU2l6ZTogLTF9LCAodXNlcnMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWNoZVN0b3JhZ2UucmVzb2x2ZVF1ZXVlKGtleSwgdGhpcywgW3VzZXJzXSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgKHVzZXJzKSA9PiB0aGlzLl9pbml0TWVtYmVycyh1c2VycykpO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLl9zZWFyY2ggPSB0aGlzLnNlYXJjaC5uYXRpdmVFbGVtZW50O1xuICAgIH1cblxuICAgIHJlc2V0RGF0YSgpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RNZW1iZXJzID0gW107XG4gICAgICAgIHRoaXMuc2hvd01lbWJlcnMgPSBbXTtcbiAgICAgICAgdGhpcy5tYXRjaE1lbWJlcnMgPSBbXTtcbiAgICAgICAgdGhpcy5fc2VhcmNoLnZhbHVlID0gJyc7XG4gICAgICAgIHRoaXMubWVtYmVycy5mb3JFYWNoKGl0ZW0gPT4gZGVsZXRlIGl0ZW0uc2VsZWN0ZWQpO1xuICAgIH1cblxuICAgIGZvY3VzSW5wdXQoKSB7XG4gICAgICAgIHRoaXMuX3NlYXJjaC5mb2N1cygpO1xuICAgIH1cblxuICAgIG9uU2VhcmNoKCkge1xuICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLl9zZWFyY2gudmFsdWUudHJpbSgpO1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIHZhbHVlID0gdGhpcy5hY2NlbnRTZXJ2aWNlLnZpVG9Fbih2YWx1ZS50b0xvd2VyQ2FzZSgpKTtcbiAgICAgICAgICAgIHRoaXMubWF0Y2hNZW1iZXJzID0gdGhpcy5tZW1iZXJzLmZpbHRlcihpdGVtID0+IGl0ZW0uX2luZGV4LmluZGV4T2YodmFsdWUpID4gLTEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5tYXRjaE1lbWJlcnMgPSB0aGlzLm1lbWJlcnM7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNob3dNZW1iZXJzID0gdGhpcy5tYXRjaE1lbWJlcnM7XG4gICAgfVxuXG4gICAgb25TY3JvbGwoKSB7XG5cbiAgICB9XG5cbiAgICBhZGRNZW1iZXIobWVtYmVyKSB7XG4gICAgICAgIG1lbWJlci5zZWxlY3RlZCA9ICFtZW1iZXIuc2VsZWN0ZWQ7XG4gICAgICAgIGlmIChtZW1iZXIuc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0TWVtYmVycy5wdXNoKG1lbWJlcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZU1lbWJlcihtZW1iZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVtb3ZlTWVtYmVyKG1lbWJlcikge1xuICAgICAgICB0aGlzLnNlbGVjdE1lbWJlcnMuc3BsaWNlKHRoaXMuc2VsZWN0TWVtYmVycy5pbmRleE9mKG1lbWJlciksIDEpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2luaXRNZW1iZXJzKHVzZXJzOiBhbnlbXSkge1xuICAgICAgICB1c2Vycy5mb3JFYWNoKGl0ZW0gPT4gdGhpcy5fYWRkTWVtYmVyKGl0ZW0pKTtcbiAgICAgICAgdGhpcy5fc29ydE1lbWJlcnMoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9hZGRNZW1iZXIobWVtYmVyKSB7XG4gICAgICAgIG1lbWJlci51c2VybmFtZSA9IG1lbWJlci51c2VybmFtZSB8fCBtZW1iZXIudXNlcmNvZGU7XG4gICAgICAgIGlmICh0aGlzLl9oYXNNZW1iZXIobWVtYmVyKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIG1lbWJlci5faW5kZXggPSB0aGlzLmFjY2VudFNlcnZpY2UudmlUb0VuKG1lbWJlci5mdWxsbmFtZS50b0xvd2VyQ2FzZSgpKSArICcgJyArIG1lbWJlci51c2VybmFtZTtcbiAgICAgICAgdGhpcy5tZW1iZXJzLnB1c2gobWVtYmVyKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9zb3J0TWVtYmVycygpIHtcbiAgICAgICAgdGhpcy5tZW1iZXJzLnNvcnQoKGEsIGIpID0+IGEuZnVsbG5hbWUubG9jYWxlQ29tcGFyZShiLmZ1bGxuYW1lKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaGFzTWVtYmVyKG1lbWJlcikge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubWVtYmVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHRoaXMubWVtYmVyc1tpXS51c2VybmFtZSA9PT0gbWVtYmVyLnVzZXJuYW1lKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=