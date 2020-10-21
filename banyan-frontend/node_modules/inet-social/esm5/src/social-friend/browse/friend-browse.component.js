/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component } from '@angular/core';
import { SocialService } from '../../social.service';
var FriendBrowseComponent = /** @class */ (function () {
    function FriendBrowseComponent(socialService) {
        this.socialService = socialService;
        this.category = 'All friends';
        this.members = [];
        this.params = {
            pageSize: 20,
            pageNumber: 0
        };
        this.placeholder = 'Tìm kiếm bạn bè...';
    }
    /**
     * @return {?}
     */
    FriendBrowseComponent.prototype.clearSearchValue = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @param {?} value
     * @return {?}
     */
    FriendBrowseComponent.prototype.onSearch = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this._searchMember(value);
    };
    /**
     * @return {?}
     */
    FriendBrowseComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this._searchMember('');
    };
    /**
     * @param {?} friend
     * @return {?}
     */
    FriendBrowseComponent.prototype.inviteFriend = /**
     * @param {?} friend
     * @return {?}
     */
    function (friend) {
        friend.added = true;
        this.socialService.invitationCreate({
            member: friend.username,
            memberName: friend.fullname,
            type: 'FRIEND',
            category: this.category
        }, (/**
         * @param {?} response
         * @param {?} error
         * @return {?}
         */
        function (response, error) {
        }));
    };
    /**
     * @private
     * @param {?} keyword
     * @return {?}
     */
    FriendBrowseComponent.prototype._searchMember = /**
     * @private
     * @param {?} keyword
     * @return {?}
     */
    function (keyword) {
        var _this = this;
        if (this.params.keyword === keyword) {
            return;
        }
        this.params.keyword = keyword;
        this.params.pageNumber = 0;
        clearTimeout(this._timer);
        this._timer = setTimeout((/**
         * @return {?}
         */
        function () {
            _this.socialService.invitationSearch(_this.params, (/**
             * @param {?} respone
             * @param {?} error
             * @return {?}
             */
            function (respone, error) {
                if (_this.params.keyword != keyword) {
                    return;
                }
                /** @type {?} */
                var members = respone || [];
                /** @type {?} */
                var userCodes = [];
                _this.members = [];
                members.forEach((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) {
                    if (userCodes.indexOf(item.username) < 0) {
                        userCodes.push(item.username);
                        if (!item.fullname) {
                            item.fullname = item.username;
                        }
                        _this.members.push(item);
                    }
                }));
            }));
        }), 500);
    };
    FriendBrowseComponent.decorators = [
        { type: Component, args: [{
                    template: "<div class=\"grid-title\">\n    Nh\u1EEFng ng\u01B0\u1EDDi b\u1EA1n c\u00F3 th\u1EC3 bi\u1EBFt\n</div>\n<div class=\"grid-container\">\n    <div class=\"grid-item\" *ngFor=\"let member of members\">\n        <img userAvatar [usercode]=\"member.username\" class=\"grid-item__icon\">\n        <div class=\"grid-item__content\">\n            <div class=\"grid-content__ellipsis\">{{member.fullname}}</div>\n            <div class=\"grid-content__brief\">{{member.username}}</div>\n        </div>\n        <button *ngIf=\"!member.added;else added;\" (click)=\"inviteFriend(member)\" class=\"grid-item__btn btn btn-sm btn-primary\" title=\"Th\u00EAm b\u1EA1n\">\n            <i class=\"fa fa-user-plus\"></i>\n        </button>\n    </div>\n    <ng-template #added>\n        <button class=\"grid-item__btn btn btn-sm btn-success\">\n            <i class=\"fa fa-check\"></i>\n        </button>\n    </ng-template>\n</div>",
                    styles: [".grid-title{color:rgba(0,0,0,.54);font-size:14px;margin:8px;font-weight:700}.grid-container{padding-bottom:20px;overflow:hidden}.grid-item{float:left;width:50%;padding:0 15px;margin-right:-1px;margin-bottom:-1px;border:1px solid rgba(0,0,0,.05);cursor:pointer;display:flex;height:90px;align-items:center}.grid-item__sm{height:80px}.grid-item__icon{width:60px;height:60px;line-height:60px;text-align:center;color:rgba(0,0,0,.54);border-radius:50%;font-size:26px;background:rgba(0,0,0,.05)}.grid-item__btn{line-height:20px;margin-left:5px}.grid-item__content{flex-grow:1;padding:0 10px 0 15px;line-height:20px;overflow:hidden;font-size:16px}.grid-content__brief,.grid-content__ellipsis{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.grid-content__brief{font-size:14px;color:rgba(0,0,0,.4)}@media (max-width:767px){.grid-item{width:100%}.grid-item__icon{width:40px;height:40px;line-height:40px}}", ""]
                }] }
    ];
    /** @nocollapse */
    FriendBrowseComponent.ctorParameters = function () { return [
        { type: SocialService }
    ]; };
    return FriendBrowseComponent;
}());
export { FriendBrowseComponent };
if (false) {
    /** @type {?} */
    FriendBrowseComponent.prototype.category;
    /** @type {?} */
    FriendBrowseComponent.prototype.members;
    /** @type {?} */
    FriendBrowseComponent.prototype.params;
    /**
     * @type {?}
     * @private
     */
    FriendBrowseComponent.prototype._timer;
    /** @type {?} */
    FriendBrowseComponent.prototype.placeholder;
    /**
     * @type {?}
     * @private
     */
    FriendBrowseComponent.prototype.socialService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJpZW5kLWJyb3dzZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbmV0LXNvY2lhbC8iLCJzb3VyY2VzIjpbInNyYy9zb2NpYWwtZnJpZW5kL2Jyb3dzZS9mcmllbmQtYnJvd3NlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBZ0IsTUFBTSxlQUFlLENBQUM7QUFFdkQsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBR25EO0lBa0JJLCtCQUNZLGFBQTRCO1FBQTVCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBWHhDLGFBQVEsR0FBVyxhQUFhLENBQUM7UUFDakMsWUFBTyxHQUFtQixFQUFFLENBQUM7UUFFN0IsV0FBTSxHQUFRO1lBQ1YsUUFBUSxFQUFFLEVBQUU7WUFDWixVQUFVLEVBQUUsQ0FBQztTQUNoQixDQUFDO1FBU0YsZ0JBQVcsR0FBVyxvQkFBb0IsQ0FBQztJQUYzQyxDQUFDOzs7O0lBSUQsZ0RBQWdCOzs7SUFBaEI7SUFDQSxDQUFDOzs7OztJQUVELHdDQUFROzs7O0lBQVIsVUFBUyxLQUFhO1FBQ2xCLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUIsQ0FBQzs7OztJQUVELHdDQUFROzs7SUFBUjtRQUNJLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDM0IsQ0FBQzs7Ozs7SUFFRCw0Q0FBWTs7OztJQUFaLFVBQWEsTUFBTTtRQUNmLE1BQU0sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUM7WUFDaEMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxRQUFRO1lBQ3ZCLFVBQVUsRUFBRSxNQUFNLENBQUMsUUFBUTtZQUMzQixJQUFJLEVBQUUsUUFBUTtZQUNkLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtTQUMxQjs7Ozs7UUFBRSxVQUFDLFFBQVEsRUFBRSxLQUFLO1FBQ25CLENBQUMsRUFBQyxDQUFDO0lBQ1AsQ0FBQzs7Ozs7O0lBRU8sNkNBQWE7Ozs7O0lBQXJCLFVBQXNCLE9BQWU7UUFBckMsaUJBMkJDO1FBMUJHLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEtBQUssT0FBTyxFQUFFO1lBQ2pDLE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUM5QixJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7UUFFM0IsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMxQixJQUFJLENBQUMsTUFBTSxHQUFHLFVBQVU7OztRQUFDO1lBQ3JCLEtBQUksQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsS0FBSSxDQUFDLE1BQU07Ozs7O1lBQUUsVUFBQyxPQUFPLEVBQUUsS0FBSztnQkFDNUQsSUFBSSxLQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sSUFBSSxPQUFPLEVBQUU7b0JBQ2hDLE9BQU87aUJBQ1Y7O29CQUNLLE9BQU8sR0FBRyxPQUFPLElBQUksRUFBRTs7b0JBQ3ZCLFNBQVMsR0FBRyxFQUFFO2dCQUNwQixLQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztnQkFDbEIsT0FBTyxDQUFDLE9BQU87Ozs7Z0JBQUMsVUFBQSxJQUFJO29CQUNoQixJQUFJLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRTt3QkFDdEMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7d0JBQzlCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzRCQUNoQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7eUJBQ2pDO3dCQUNELEtBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO3FCQUMzQjtnQkFDTCxDQUFDLEVBQUMsQ0FBQztZQUNQLENBQUMsRUFBQyxDQUFDO1FBQ1AsQ0FBQyxHQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ1osQ0FBQzs7Z0JBMUVKLFNBQVMsU0FBQztvQkFDUCxnNkJBQTZDOztpQkFLaEQ7Ozs7Z0JBVE8sYUFBYTs7SUE4RXJCLDRCQUFDO0NBQUEsQUEzRUQsSUEyRUM7U0FwRVkscUJBQXFCOzs7SUFDOUIseUNBQWlDOztJQUNqQyx3Q0FBNkI7O0lBRTdCLHVDQUdFOzs7OztJQUVGLHVDQUFlOztJQU9mLDRDQUEyQzs7Ozs7SUFKdkMsOENBQW9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtTb2NpYWxGcmllbmR9IGZyb20gJy4uLy4uL21vZGVsL1NvY2lhbEZyaWVuZCc7XG5pbXBvcnQge1NvY2lhbFNlcnZpY2V9IGZyb20gJy4uLy4uL3NvY2lhbC5zZXJ2aWNlJztcbmltcG9ydCB7RnJpZW5kVGFifSBmcm9tICcuLi9GcmllbmRUYWInO1xuXG5AQ29tcG9uZW50KHtcbiAgICB0ZW1wbGF0ZVVybDogJy4vZnJpZW5kLWJyb3dzZS5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbXG4gICAgICAgICcuLi9zdHlsZS5jc3MnLFxuICAgICAgICAnLi9mcmllbmQtYnJvd3NlLmNvbXBvbmVudC5jc3MnXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBGcmllbmRCcm93c2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEZyaWVuZFRhYiB7XG4gICAgY2F0ZWdvcnk6IHN0cmluZyA9ICdBbGwgZnJpZW5kcyc7XG4gICAgbWVtYmVyczogU29jaWFsRnJpZW5kW10gPSBbXTtcblxuICAgIHBhcmFtczogYW55ID0ge1xuICAgICAgICBwYWdlU2l6ZTogMjAsXG4gICAgICAgIHBhZ2VOdW1iZXI6IDBcbiAgICB9O1xuXG4gICAgcHJpdmF0ZSBfdGltZXI7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBzb2NpYWxTZXJ2aWNlOiBTb2NpYWxTZXJ2aWNlXG4gICAgKSB7XG4gICAgfVxuXG4gICAgcGxhY2Vob2xkZXI6IHN0cmluZyA9ICdUw6xtIGtp4bq/bSBi4bqhbiBiw6guLi4nO1xuXG4gICAgY2xlYXJTZWFyY2hWYWx1ZSgpOiB2b2lkIHtcbiAgICB9XG5cbiAgICBvblNlYXJjaCh2YWx1ZTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3NlYXJjaE1lbWJlcih2YWx1ZSk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuX3NlYXJjaE1lbWJlcignJyk7XG4gICAgfVxuXG4gICAgaW52aXRlRnJpZW5kKGZyaWVuZCkge1xuICAgICAgICBmcmllbmQuYWRkZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLnNvY2lhbFNlcnZpY2UuaW52aXRhdGlvbkNyZWF0ZSh7XG4gICAgICAgICAgICBtZW1iZXI6IGZyaWVuZC51c2VybmFtZSxcbiAgICAgICAgICAgIG1lbWJlck5hbWU6IGZyaWVuZC5mdWxsbmFtZSxcbiAgICAgICAgICAgIHR5cGU6ICdGUklFTkQnLFxuICAgICAgICAgICAgY2F0ZWdvcnk6IHRoaXMuY2F0ZWdvcnlcbiAgICAgICAgfSwgKHJlc3BvbnNlLCBlcnJvcikgPT4ge1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9zZWFyY2hNZW1iZXIoa2V5d29yZDogc3RyaW5nKSB7XG4gICAgICAgIGlmICh0aGlzLnBhcmFtcy5rZXl3b3JkID09PSBrZXl3b3JkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wYXJhbXMua2V5d29yZCA9IGtleXdvcmQ7XG4gICAgICAgIHRoaXMucGFyYW1zLnBhZ2VOdW1iZXIgPSAwO1xuXG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLl90aW1lcik7XG4gICAgICAgIHRoaXMuX3RpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNvY2lhbFNlcnZpY2UuaW52aXRhdGlvblNlYXJjaCh0aGlzLnBhcmFtcywgKHJlc3BvbmUsIGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucGFyYW1zLmtleXdvcmQgIT0ga2V5d29yZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IG1lbWJlcnMgPSByZXNwb25lIHx8IFtdO1xuICAgICAgICAgICAgICAgIGNvbnN0IHVzZXJDb2RlcyA9IFtdO1xuICAgICAgICAgICAgICAgIHRoaXMubWVtYmVycyA9IFtdO1xuICAgICAgICAgICAgICAgIG1lbWJlcnMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHVzZXJDb2Rlcy5pbmRleE9mKGl0ZW0udXNlcm5hbWUpIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXNlckNvZGVzLnB1c2goaXRlbS51c2VybmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWl0ZW0uZnVsbG5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmZ1bGxuYW1lID0gaXRlbS51c2VybmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWVtYmVycy5wdXNoKGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgNTAwKTtcbiAgICB9XG59XG4iXX0=