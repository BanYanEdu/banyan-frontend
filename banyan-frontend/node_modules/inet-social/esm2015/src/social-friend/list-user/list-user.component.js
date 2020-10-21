/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { SocialService } from '../../social.service';
import { AccentService, CacheStorageService } from 'inet-core';
export class ListUserComponent {
    /**
     * @param {?} socialService
     * @param {?} accentService
     * @param {?} cacheStorage
     */
    constructor(socialService, accentService, cacheStorage) {
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
        const employees = this.cacheStorage.getData(this._allEmployees);
        // Cache employees on 5 minutes
        if (employees) {
            this._initMembers(JSON.parse(employees));
        }
        else {
            this.cacheStorage.promiseQueue(this._allEmployees, (/**
             * @param {?} key
             * @return {?}
             */
            (key) => {
                this.socialService.searchMember({ pageSize: -1 }, (/**
                 * @param {?} users
                 * @return {?}
                 */
                (users) => {
                    if (users && users.length > 0) {
                        this.cacheStorage.setData(key, JSON.stringify(users));
                    }
                    this.cacheStorage.resolveQueue(key, this, [users]);
                }));
            }), (/**
             * @param {?} users
             * @return {?}
             */
            (users) => this._initMembers(users)));
        }
        this.cacheStorage.promiseQueue(this._allFriends, (/**
         * @param {?} key
         * @return {?}
         */
        (key) => {
            this.socialService.listFriends({ pageSize: -1 }, (/**
             * @param {?} users
             * @return {?}
             */
            (users) => {
                this.cacheStorage.resolveQueue(key, this, [users]);
            }));
        }), (/**
         * @param {?} users
         * @return {?}
         */
        (users) => this._initMembers(users)));
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._search = this.search.nativeElement;
    }
    /**
     * @return {?}
     */
    resetData() {
        this.selectMembers = [];
        this.showMembers = [];
        this.matchMembers = [];
        this._search.value = '';
        this.members.forEach((/**
         * @param {?} item
         * @return {?}
         */
        item => delete item.selected));
    }
    /**
     * @return {?}
     */
    focusInput() {
        this._search.focus();
    }
    /**
     * @return {?}
     */
    onSearch() {
        /** @type {?} */
        let value = this._search.value.trim();
        if (value) {
            value = this.accentService.viToEn(value.toLowerCase());
            this.matchMembers = this.members.filter((/**
             * @param {?} item
             * @return {?}
             */
            item => item._index.indexOf(value) > -1));
        }
        else {
            this.matchMembers = this.members;
        }
        this.showMembers = this.matchMembers;
    }
    /**
     * @return {?}
     */
    onScroll() {
    }
    /**
     * @param {?} member
     * @return {?}
     */
    addMember(member) {
        member.selected = !member.selected;
        if (member.selected) {
            this.selectMembers.push(member);
        }
        else {
            this.removeMember(member);
        }
    }
    /**
     * @param {?} member
     * @return {?}
     */
    removeMember(member) {
        this.selectMembers.splice(this.selectMembers.indexOf(member), 1);
    }
    /**
     * @private
     * @param {?} users
     * @return {?}
     */
    _initMembers(users) {
        users.forEach((/**
         * @param {?} item
         * @return {?}
         */
        item => this._addMember(item)));
        this._sortMembers();
    }
    /**
     * @private
     * @param {?} member
     * @return {?}
     */
    _addMember(member) {
        member.username = member.username || member.usercode;
        if (this._hasMember(member)) {
            return;
        }
        member._index = this.accentService.viToEn(member.fullname.toLowerCase()) + ' ' + member.username;
        this.members.push(member);
    }
    /**
     * @private
     * @return {?}
     */
    _sortMembers() {
        this.members.sort((/**
         * @param {?} a
         * @param {?} b
         * @return {?}
         */
        (a, b) => a.fullname.localeCompare(b.fullname)));
    }
    /**
     * @private
     * @param {?} member
     * @return {?}
     */
    _hasMember(member) {
        for (let i = 0; i < this.members.length; i++) {
            if (this.members[i].username === member.username) {
                return true;
            }
        }
    }
}
ListUserComponent.decorators = [
    { type: Component, args: [{
                selector: '[socialListUser]',
                template: "<div class=\"auto-tag form-control\" style=\"max-height: 140px;overflow: auto;\">\n  <div *ngFor=\"let member of selectMembers\" class=\"auto-tag-item\">\n    <span>{{member.fullname}}</span>\n    <i class=\"fa fa-times\" (click)=\"removeMember(member)\"></i>\n  </div>\n  <input #search (keyup)=\"onSearch()\" type=\"text\" class=\"auto-tag-input\" [placeholder]=\"placeholder\">\n</div>\n<div #contactList (scroll)=\"onScroll()\"\n     style=\"overflow:auto;height: 240px;margin-top:10px\">\n  <div class=\"list-item list-avatar\" *ngFor=\"let member of showMembers\" (click)=\"addMember(member)\">\n    <img userAvatar [usercode]=\"member.username || member.usercode\" class=\"list-item__image\">\n    <div class=\"list-item__content\">{{member.fullname}}</div>\n    <label class=\"checkbox-container\">\n      <input type=\"checkbox\" [checked]=\"member.selected\" disabled>\n      <span class=\"checkmark\"></span>\n    </label>\n  </div>\n</div>",
                styles: [".auto-tag{display:flex;flex-wrap:wrap;height:auto;padding-bottom:0}.auto-tag .auto-tag-item{display:flex;align-items:center;border-radius:4px;background:#eee;padding:0 10px;white-space:nowrap;margin:0 5px 5px 0}.auto-tag .auto-tag-item i{cursor:pointer;padding:5px;margin-right:-5px}.auto-tag .auto-tag-input{border:0;outline:0}.checkbox-container{display:block;position:relative;cursor:pointer;font-size:22px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;min-width:20px;min-height:20px;margin:0}.checkbox-container input{position:absolute;opacity:0;cursor:pointer}.checkbox-container .checkmark{position:absolute;top:0;left:0;height:20px;width:20px;background-color:#eee;border-radius:4px}.checkbox-container .checkmark:after{content:\"\";position:absolute;display:none;left:8px;top:4px;width:5px;height:10px;border:solid #fff;border-width:0 3px 3px 0;transform:rotate(45deg)}.checkbox-container:hover .checkmark{background-color:#ccc}.checkbox-container input:checked+.checkmark{background-color:#2196f3}.checkbox-container input:checked+.checkmark:after{display:block}.list-avatar{padding:5px 10px;overflow:hidden;cursor:pointer;margin-bottom:5px;display:flex;align-items:center}.list-item__icon,.list-item__image{width:32px;height:32px;border-radius:50%}.list-item__icon{line-height:32px;text-align:center;background:rgba(0,0,0,.05);color:rgba(0,0,0,.5)}.list-item__content{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding:0 15px;line-height:32px;flex-grow:1}"]
            }] }
];
/** @nocollapse */
ListUserComponent.ctorParameters = () => [
    { type: SocialService },
    { type: AccentService },
    { type: CacheStorageService }
];
ListUserComponent.propDecorators = {
    placeholder: [{ type: Input }],
    height: [{ type: Input }],
    search: [{ type: ViewChild, args: ['search',] }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC11c2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtc29jaWFsLyIsInNvdXJjZXMiOlsic3JjL3NvY2lhbC1mcmllbmQvbGlzdC11c2VyL2xpc3QtdXNlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBVSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDOUUsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ25ELE9BQU8sRUFBQyxhQUFhLEVBQUUsbUJBQW1CLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFTN0QsTUFBTSxPQUFPLGlCQUFpQjs7Ozs7O0lBZTFCLFlBQ1ksYUFBNEIsRUFDNUIsYUFBNEIsRUFDNUIsWUFBaUM7UUFGakMsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsaUJBQVksR0FBWixZQUFZLENBQXFCO1FBakJwQyxnQkFBVyxHQUFXLGFBQWEsQ0FBQztRQUNwQyxXQUFNLEdBQVcsT0FBTyxDQUFDO1FBSWxDLFlBQU8sR0FBVSxFQUFFLENBQUM7UUFDcEIsa0JBQWEsR0FBUSxFQUFFLENBQUM7UUFDeEIsZ0JBQVcsR0FBUSxFQUFFLENBQUM7UUFDdEIsaUJBQVksR0FBUSxFQUFFLENBQUM7UUFHZixrQkFBYSxHQUFHLGtCQUFrQixDQUFDO1FBQ25DLGdCQUFXLEdBQUcsZ0JBQWdCLENBQUM7O2NBUTdCLFNBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDO1FBQy9ELCtCQUErQjtRQUMvQixJQUFJLFNBQVMsRUFBRTtZQUNYLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1NBQzVDO2FBQU07WUFDSCxJQUFJLENBQUMsWUFB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UUFBUSxDQUFDLEVBQUMsQ0FBQztJQUN0RSxDQUFDOzs7Ozs7SUFFTyxVQUFVLENBQUMsTUFBTTtRQUNyQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDMUMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsS0FBSyxNQUFNLENBQUMsUUFBUSxFQUFFO2dCQUM5QyxPQUFPLElBQUksQ0FBQzthQUNmO1NBQ0o7SUFDTCxDQUFDOzs7WUEzSEosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLG04QkFBeUM7O2FBSTVDOzs7O1lBVE8sYUFBYTtZQUNiLGFBQWE7WUFBRSxtQkFBbUI7OzswQkFVckMsS0FBSztxQkFDTCxLQUFLO3FCQUVMLFNBQVMsU0FBQyxRQUFROzs7O0lBSG5CLHdDQUE2Qzs7SUFDN0MsbUNBQWtDOztJQUVsQyxtQ0FBd0M7O0lBRXhDLG9DQUFvQjs7SUFDcEIsMENBQXdCOztJQUN4Qix3Q0FBc0I7O0lBQ3RCLHlDQUF1Qjs7Ozs7SUFFdkIsb0NBQWtDOzs7OztJQUNsQywwQ0FBMkM7Ozs7O0lBQzNDLHdDQUF1Qzs7Ozs7SUFHbkMsMENBQW9DOzs7OztJQUNwQywwQ0FBb0M7Ozs7O0lBQ3BDLHlDQUF5QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBFbGVtZW50UmVmLCBJbnB1dCwgT25Jbml0LCBWaWV3Q2hpbGR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtTb2NpYWxTZXJ2aWNlfSBmcm9tICcuLi8uLi9zb2NpYWwuc2VydmljZSc7XG5pbXBvcnQge0FjY2VudFNlcnZpY2UsIENhY2hlU3RvcmFnZVNlcnZpY2V9IGZyb20gJ2luZXQtY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnW3NvY2lhbExpc3RVc2VyXScsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2xpc3QtdXNlci5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbXG4gICAgICAgICcuLi8uLi9zdHlsZXMvdXNlci1zdHlsZXMuY3NzJ1xuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgTGlzdFVzZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIEBJbnB1dCgpIHBsYWNlaG9sZGVyOiBzdHJpbmcgPSAnVMOsbSBraeG6v20uLi4nO1xuICAgIEBJbnB1dCgpIGhlaWdodDogc3RyaW5nID0gJzI0MHB4JztcblxuICAgIEBWaWV3Q2hpbGQoJ3NlYXJjaCcpIHNlYXJjaDogRWxlbWVudFJlZjtcblxuICAgIG1lbWJlcnM6IGFueVtdID0gW107XG4gICAgc2VsZWN0TWVtYmVyczogYW55ID0gW107XG4gICAgc2hvd01lbWJlcnM6IGFueSA9IFtdO1xuICAgIG1hdGNoTWVtYmVyczogYW55ID0gW107XG5cbiAgICBwcml2YXRlIF9zZWFyY2g6IEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgcHJpdmF0ZSBfYWxsRW1wbG95ZWVzID0gJ3NvY2lhbF9lbXBsb3llZXMnO1xuICAgIHByaXZhdGUgX2FsbEZyaWVuZHMgPSAnc29jaWFsX2ZyaWVuZHMnO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgc29jaWFsU2VydmljZTogU29jaWFsU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBhY2NlbnRTZXJ2aWNlOiBBY2NlbnRTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGNhY2hlU3RvcmFnZTogQ2FjaGVTdG9yYWdlU2VydmljZVxuICAgICkge1xuXG4gICAgICAgIGNvbnN0IGVtcGxveWVlcyA9IHRoaXMuY2FjaGVTdG9yYWdlLmdldERhdGEodGhpcy5fYWxsRW1wbG95ZWVzKTtcbiAgICAgICAgLy8gQ2FjaGUgZW1wbG95ZWVzIG9uIDUgbWludXRlc1xuICAgICAgICBpZiAoZW1wbG95ZWVzKSB7XG4gICAgICAgICAgICB0aGlzLl9pbml0TWVtYmVycyhKU09OLnBhcnNlKGVtcGxveWVlcykpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jYWNoZVN0b3JhZ2UucHJvbWlzZVF1ZXVlKHRoaXMuX2FsbEVtcGxveWVlcyxcbiAgICAgICAgICAgICAgICAoa2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc29jaWFsU2VydmljZS5zZWFyY2hNZW1iZXIoe3BhZ2VTaXplOiAtMX0sICh1c2VycykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHVzZXJzICYmIHVzZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNhY2hlU3RvcmFnZS5zZXREYXRhKGtleSwgSlNPTi5zdHJpbmdpZnkodXNlcnMpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2FjaGVTdG9yYWdlLnJlc29sdmVRdWV1ZShrZXksIHRoaXMsIFt1c2Vyc10pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICh1c2VycykgPT4gdGhpcy5faW5pdE1lbWJlcnModXNlcnMpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2FjaGVTdG9yYWdlLnByb21pc2VRdWV1ZSh0aGlzLl9hbGxGcmllbmRzLFxuICAgICAgICAgICAgKGtleSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc29jaWFsU2VydmljZS5saXN0RnJpZW5kcyh7cGFnZVNpemU6IC0xfSwgKHVzZXJzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FjaGVTdG9yYWdlLnJlc29sdmVRdWV1ZShrZXksIHRoaXMsIFt1c2Vyc10pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICh1c2VycykgPT4gdGhpcy5faW5pdE1lbWJlcnModXNlcnMpKTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5fc2VhcmNoID0gdGhpcy5zZWFyY2gubmF0aXZlRWxlbWVudDtcbiAgICB9XG5cbiAgICByZXNldERhdGEoKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0TWVtYmVycyA9IFtdO1xuICAgICAgICB0aGlzLnNob3dNZW1iZXJzID0gW107XG4gICAgICAgIHRoaXMubWF0Y2hNZW1iZXJzID0gW107XG4gICAgICAgIHRoaXMuX3NlYXJjaC52YWx1ZSA9ICcnO1xuICAgICAgICB0aGlzLm1lbWJlcnMuZm9yRWFjaChpdGVtID0+IGRlbGV0ZSBpdGVtLnNlbGVjdGVkKTtcbiAgICB9XG5cbiAgICBmb2N1c0lucHV0KCkge1xuICAgICAgICB0aGlzLl9zZWFyY2guZm9jdXMoKTtcbiAgICB9XG5cbiAgICBvblNlYXJjaCgpIHtcbiAgICAgICAgbGV0IHZhbHVlID0gdGhpcy5fc2VhcmNoLnZhbHVlLnRyaW0oKTtcbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IHRoaXMuYWNjZW50U2VydmljZS52aVRvRW4odmFsdWUudG9Mb3dlckNhc2UoKSk7XG4gICAgICAgICAgICB0aGlzLm1hdGNoTWVtYmVycyA9IHRoaXMubWVtYmVycy5maWx0ZXIoaXRlbSA9PiBpdGVtLl9pbmRleC5pbmRleE9mKHZhbHVlKSA+IC0xKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubWF0Y2hNZW1iZXJzID0gdGhpcy5tZW1iZXJzO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zaG93TWVtYmVycyA9IHRoaXMubWF0Y2hNZW1iZXJzO1xuICAgIH1cblxuICAgIG9uU2Nyb2xsKCkge1xuXG4gICAgfVxuXG4gICAgYWRkTWVtYmVyKG1lbWJlcikge1xuICAgICAgICBtZW1iZXIuc2VsZWN0ZWQgPSAhbWVtYmVyLnNlbGVjdGVkO1xuICAgICAgICBpZiAobWVtYmVyLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdE1lbWJlcnMucHVzaChtZW1iZXIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVNZW1iZXIobWVtYmVyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbW92ZU1lbWJlcihtZW1iZXIpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RNZW1iZXJzLnNwbGljZSh0aGlzLnNlbGVjdE1lbWJlcnMuaW5kZXhPZihtZW1iZXIpLCAxKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9pbml0TWVtYmVycyh1c2VyczogYW55W10pIHtcbiAgICAgICAgdXNlcnMuZm9yRWFjaChpdGVtID0+IHRoaXMuX2FkZE1lbWJlcihpdGVtKSk7XG4gICAgICAgIHRoaXMuX3NvcnRNZW1iZXJzKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfYWRkTWVtYmVyKG1lbWJlcikge1xuICAgICAgICBtZW1iZXIudXNlcm5hbWUgPSBtZW1iZXIudXNlcm5hbWUgfHwgbWVtYmVyLnVzZXJjb2RlO1xuICAgICAgICBpZiAodGhpcy5faGFzTWVtYmVyKG1lbWJlcikpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBtZW1iZXIuX2luZGV4ID0gdGhpcy5hY2NlbnRTZXJ2aWNlLnZpVG9FbihtZW1iZXIuZnVsbG5hbWUudG9Mb3dlckNhc2UoKSkgKyAnICcgKyBtZW1iZXIudXNlcm5hbWU7XG4gICAgICAgIHRoaXMubWVtYmVycy5wdXNoKG1lbWJlcik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfc29ydE1lbWJlcnMoKSB7XG4gICAgICAgIHRoaXMubWVtYmVycy5zb3J0KChhLCBiKSA9PiBhLmZ1bGxuYW1lLmxvY2FsZUNvbXBhcmUoYi5mdWxsbmFtZSkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2hhc01lbWJlcihtZW1iZXIpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm1lbWJlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm1lbWJlcnNbaV0udXNlcm5hbWUgPT09IG1lbWJlci51c2VybmFtZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIl19