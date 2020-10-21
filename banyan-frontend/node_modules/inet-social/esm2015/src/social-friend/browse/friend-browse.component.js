/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component } from '@angular/core';
import { SocialService } from '../../social.service';
export class FriendBrowseComponent {
    /**
     * @param {?} socialService
     */
    constructor(socialService) {
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
    clearSearchValue() {
    }
    /**
     * @param {?} value
     * @return {?}
     */
    onSearch(value) {
        this._searchMember(value);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._searchMember('');
    }
    /**
     * @param {?} friend
     * @return {?}
     */
    inviteFriend(friend) {
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
        (response, error) => {
        }));
    }
    /**
     * @private
     * @param {?} keyword
     * @return {?}
     */
    _searchMember(keyword) {
        if (this.params.keyword === keyword) {
            return;
        }
        this.params.keyword = keyword;
        this.params.pageNumber = 0;
        clearTimeout(this._timer);
        this._timer = setTimeout((/**
         * @return {?}
         */
        () => {
            this.socialService.invitationSearch(this.params, (/**
             * @param {?} respone
             * @param {?} error
             * @return {?}
             */
            (respone, error) => {
                if (this.params.keyword != keyword) {
                    return;
                }
                /** @type {?} */
                const members = respone || [];
                /** @type {?} */
                const userCodes = [];
                this.members = [];
                members.forEach((/**
                 * @param {?} item
                 * @return {?}
                 */
                item => {
                    if (userCodes.indexOf(item.username) < 0) {
                        userCodes.push(item.username);
                        if (!item.fullname) {
                            item.fullname = item.username;
                        }
                        this.members.push(item);
                    }
                }));
            }));
        }), 500);
    }
}
FriendBrowseComponent.decorators = [
    { type: Component, args: [{
                template: "<div class=\"grid-title\">\n    Nh\u1EEFng ng\u01B0\u1EDDi b\u1EA1n c\u00F3 th\u1EC3 bi\u1EBFt\n</div>\n<div class=\"grid-container\">\n    <div class=\"grid-item\" *ngFor=\"let member of members\">\n        <img userAvatar [usercode]=\"member.username\" class=\"grid-item__icon\">\n        <div class=\"grid-item__content\">\n            <div class=\"grid-content__ellipsis\">{{member.fullname}}</div>\n            <div class=\"grid-content__brief\">{{member.username}}</div>\n        </div>\n        <button *ngIf=\"!member.added;else added;\" (click)=\"inviteFriend(member)\" class=\"grid-item__btn btn btn-sm btn-primary\" title=\"Th\u00EAm b\u1EA1n\">\n            <i class=\"fa fa-user-plus\"></i>\n        </button>\n    </div>\n    <ng-template #added>\n        <button class=\"grid-item__btn btn btn-sm btn-success\">\n            <i class=\"fa fa-check\"></i>\n        </button>\n    </ng-template>\n</div>",
                styles: [".grid-title{color:rgba(0,0,0,.54);font-size:14px;margin:8px;font-weight:700}.grid-container{padding-bottom:20px;overflow:hidden}.grid-item{float:left;width:50%;padding:0 15px;margin-right:-1px;margin-bottom:-1px;border:1px solid rgba(0,0,0,.05);cursor:pointer;display:flex;height:90px;align-items:center}.grid-item__sm{height:80px}.grid-item__icon{width:60px;height:60px;line-height:60px;text-align:center;color:rgba(0,0,0,.54);border-radius:50%;font-size:26px;background:rgba(0,0,0,.05)}.grid-item__btn{line-height:20px;margin-left:5px}.grid-item__content{flex-grow:1;padding:0 10px 0 15px;line-height:20px;overflow:hidden;font-size:16px}.grid-content__brief,.grid-content__ellipsis{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.grid-content__brief{font-size:14px;color:rgba(0,0,0,.4)}@media (max-width:767px){.grid-item{width:100%}.grid-item__icon{width:40px;height:40px;line-height:40px}}", ""]
            }] }
];
/** @nocollapse */
FriendBrowseComponent.ctorParameters = () => [
    { type: SocialService }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJpZW5kLWJyb3dzZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbmV0LXNvY2lhbC8iLCJzb3VyY2VzIjpbInNyYy9zb2NpYWwtZnJpZW5kL2Jyb3dzZS9mcmllbmQtYnJvd3NlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBZ0IsTUFBTSxlQUFlLENBQUM7QUFFdkQsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBVW5ELE1BQU0sT0FBTyxxQkFBcUI7Ozs7SUFXOUIsWUFDWSxhQUE0QjtRQUE1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQVh4QyxhQUFRLEdBQVcsYUFBYSxDQUFDO1FBQ2pDLFlBQU8sR0FBbUIsRUFBRSxDQUFDO1FBRTdCLFdBQU0sR0FBUTtZQUNWLFFBQVEsRUFBRSxFQUFFO1lBQ1osVUFBVSxFQUFFLENBQUM7U0FDaEIsQ0FBQztRQVNGLGdCQUFXLEdBQVcsb0JBQW9CLENBQUM7SUFGM0MsQ0FBQzs7OztJQUlELGdCQUFnQjtJQUNoQixDQUFDOzs7OztJQUVELFFBQVEsQ0FBQyxLQUFhO1FBQ2xCLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUIsQ0FBQzs7OztJQUVELFFBQVE7UUFDSixJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzNCLENBQUM7Ozs7O0lBRUQsWUFBWSxDQUFDLE1BQU07UUFDZixNQUFNLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNwQixJQUFJLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDO1lBQ2hDLE1BQU0sRUFBRSxNQUFNLENBQUMsUUFBUTtZQUN2QixVQUFVLEVBQUUsTUFBTSxDQUFDLFFBQVE7WUFDM0IsSUFBSSxFQUFFLFFBQVE7WUFDZCxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7U0FDMUI7Ozs7O1FBQUUsQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLEVBQUU7UUFDdkIsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7Ozs7SUFFTyxhQUFhLENBQUMsT0FBZTtRQUNqQyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxLQUFLLE9BQU8sRUFBRTtZQUNqQyxPQUFPO1NBQ1Y7UUFDRCxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDOUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO1FBRTNCLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDMUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxVQUFVOzs7UUFBQyxHQUFHLEVBQUU7WUFDMUIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsTUFBTTs7Ozs7WUFBRSxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRTtnQkFDaEUsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sSUFBSSxPQUFPLEVBQUU7b0JBQ2hDLE9BQU87aUJBQ1Y7O3NCQUNLLE9BQU8sR0FBRyxPQUFPLElBQUksRUFBRTs7c0JBQ3ZCLFNBQVMsR0FBRyxFQUFFO2dCQUNwQixJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztnQkFDbEIsT0FBTyxDQUFDLE9BQU87Ozs7Z0JBQUMsSUFBSSxDQUFDLEVBQUU7b0JBQ25CLElBQUksU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFO3dCQUN0QyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzt3QkFDOUIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7NEJBQ2hCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQzt5QkFDakM7d0JBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7cUJBQzNCO2dCQUNMLENBQUMsRUFBQyxDQUFDO1lBQ1AsQ0FBQyxFQUFDLENBQUM7UUFDUCxDQUFDLEdBQUUsR0FBRyxDQUFDLENBQUM7SUFDWixDQUFDOzs7WUExRUosU0FBUyxTQUFDO2dCQUNQLGc2QkFBNkM7O2FBS2hEOzs7O1lBVE8sYUFBYTs7OztJQVdqQix5Q0FBaUM7O0lBQ2pDLHdDQUE2Qjs7SUFFN0IsdUNBR0U7Ozs7O0lBRUYsdUNBQWU7O0lBT2YsNENBQTJDOzs7OztJQUp2Qyw4Q0FBb0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1NvY2lhbEZyaWVuZH0gZnJvbSAnLi4vLi4vbW9kZWwvU29jaWFsRnJpZW5kJztcbmltcG9ydCB7U29jaWFsU2VydmljZX0gZnJvbSAnLi4vLi4vc29jaWFsLnNlcnZpY2UnO1xuaW1wb3J0IHtGcmllbmRUYWJ9IGZyb20gJy4uL0ZyaWVuZFRhYic7XG5cbkBDb21wb25lbnQoe1xuICAgIHRlbXBsYXRlVXJsOiAnLi9mcmllbmQtYnJvd3NlLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFtcbiAgICAgICAgJy4uL3N0eWxlLmNzcycsXG4gICAgICAgICcuL2ZyaWVuZC1icm93c2UuY29tcG9uZW50LmNzcydcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIEZyaWVuZEJyb3dzZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgRnJpZW5kVGFiIHtcbiAgICBjYXRlZ29yeTogc3RyaW5nID0gJ0FsbCBmcmllbmRzJztcbiAgICBtZW1iZXJzOiBTb2NpYWxGcmllbmRbXSA9IFtdO1xuXG4gICAgcGFyYW1zOiBhbnkgPSB7XG4gICAgICAgIHBhZ2VTaXplOiAyMCxcbiAgICAgICAgcGFnZU51bWJlcjogMFxuICAgIH07XG5cbiAgICBwcml2YXRlIF90aW1lcjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIHNvY2lhbFNlcnZpY2U6IFNvY2lhbFNlcnZpY2VcbiAgICApIHtcbiAgICB9XG5cbiAgICBwbGFjZWhvbGRlcjogc3RyaW5nID0gJ1TDrG0ga2nhur9tIGLhuqFuIGLDqC4uLic7XG5cbiAgICBjbGVhclNlYXJjaFZhbHVlKCk6IHZvaWQge1xuICAgIH1cblxuICAgIG9uU2VhcmNoKHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fc2VhcmNoTWVtYmVyKHZhbHVlKTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5fc2VhcmNoTWVtYmVyKCcnKTtcbiAgICB9XG5cbiAgICBpbnZpdGVGcmllbmQoZnJpZW5kKSB7XG4gICAgICAgIGZyaWVuZC5hZGRlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuc29jaWFsU2VydmljZS5pbnZpdGF0aW9uQ3JlYXRlKHtcbiAgICAgICAgICAgIG1lbWJlcjogZnJpZW5kLnVzZXJuYW1lLFxuICAgICAgICAgICAgbWVtYmVyTmFtZTogZnJpZW5kLmZ1bGxuYW1lLFxuICAgICAgICAgICAgdHlwZTogJ0ZSSUVORCcsXG4gICAgICAgICAgICBjYXRlZ29yeTogdGhpcy5jYXRlZ29yeVxuICAgICAgICB9LCAocmVzcG9uc2UsIGVycm9yKSA9PiB7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3NlYXJjaE1lbWJlcihrZXl3b3JkOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHRoaXMucGFyYW1zLmtleXdvcmQgPT09IGtleXdvcmQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBhcmFtcy5rZXl3b3JkID0ga2V5d29yZDtcbiAgICAgICAgdGhpcy5wYXJhbXMucGFnZU51bWJlciA9IDA7XG5cbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX3RpbWVyKTtcbiAgICAgICAgdGhpcy5fdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc29jaWFsU2VydmljZS5pbnZpdGF0aW9uU2VhcmNoKHRoaXMucGFyYW1zLCAocmVzcG9uZSwgZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wYXJhbXMua2V5d29yZCAhPSBrZXl3b3JkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgbWVtYmVycyA9IHJlc3BvbmUgfHwgW107XG4gICAgICAgICAgICAgICAgY29uc3QgdXNlckNvZGVzID0gW107XG4gICAgICAgICAgICAgICAgdGhpcy5tZW1iZXJzID0gW107XG4gICAgICAgICAgICAgICAgbWVtYmVycy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAodXNlckNvZGVzLmluZGV4T2YoaXRlbS51c2VybmFtZSkgPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VyQ29kZXMucHVzaChpdGVtLnVzZXJuYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaXRlbS5mdWxsbmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uZnVsbG5hbWUgPSBpdGVtLnVzZXJuYW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tZW1iZXJzLnB1c2goaXRlbSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCA1MDApO1xuICAgIH1cbn1cbiJdfQ==