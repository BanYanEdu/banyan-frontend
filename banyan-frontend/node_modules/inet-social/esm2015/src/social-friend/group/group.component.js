/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ViewChild } from '@angular/core';
import { SocialService } from "../../social.service";
import { NavigationEnd, Router } from "@angular/router";
import { GroupMemberComponent } from "../group-member/group-member.component";
import { GroupCreateComponent } from "../group-create/group-create.component";
import { BsModalService } from 'ngx-bootstrap';
import { AccentService } from 'inet-core';
import { filter } from "rxjs/operators";
export class SocialGroupComponent {
    /**
     * @param {?} socialService
     * @param {?} accentService
     * @param {?} router
     * @param {?} modalService
     */
    constructor(socialService, accentService, router, modalService) {
        this.socialService = socialService;
        this.accentService = accentService;
        this.router = router;
        this.modalService = modalService;
        this.friends = [];
        this.members = [];
        this._prefix = '/social/friend';
        this.placeholder = 'Tìm kiếm...';
        this._loadAllFriends();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    onSearch(value) {
        this.searching = !!value;
        if (value) {
            value = this.accentService.viToEn(value);
            if (this.viewGroups) {
                this.friends.forEach((/**
                 * @param {?} item
                 * @return {?}
                 */
                item => {
                    item.hidden = item._index.indexOf(value) < 0;
                }));
            }
            else {
                this.members.forEach((/**
                 * @param {?} item
                 * @return {?}
                 */
                item => {
                    item.hidden = item._index.indexOf(value) < 0;
                }));
            }
        }
        else {
            if (this.viewGroups) {
                this.friends.forEach((/**
                 * @param {?} item
                 * @return {?}
                 */
                item => delete item.hidden));
            }
            else {
                this.members.forEach((/**
                 * @param {?} item
                 * @return {?}
                 */
                item => delete item.hidden));
            }
        }
    }
    /**
     * @return {?}
     */
    clearSearchValue() { }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._router = this.router.events
            .pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        event => event instanceof NavigationEnd)))
            .subscribe((/**
         * @return {?}
         */
        () => {
            this._actionView();
        }));
        this._actionView();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._router.unsubscribe();
    }
    /**
     * @return {?}
     */
    createGroup() {
        this.modalCreateMember.open();
    }
    /**
     * @return {?}
     */
    groupCreated() {
        this._loadGroups();
        this._loadAllFriends();
    }
    /**
     * @param {?} group
     * @return {?}
     */
    viewGroup(group) {
        this.router.navigate([this._prefix + '/' + group]);
    }
    /**
     * @param {?} group
     * @param {?} template
     * @return {?}
     */
    removeGroup(group, template) {
        this.groupActive = group;
        this.modalGroupDeleteRef = this.modalService.show(template);
    }
    // Todo: improve remove group
    /**
     * @return {?}
     */
    onDeleteGroup() {
        this.modalGroupDeleteRef.hide();
        this._loadFriends(this.groupActive, (/**
         * @param {?} members
         * @return {?}
         */
        (members) => {
            this.socialService.groupMemberDelete({
                category: this.groupActive,
                member: this._getMemberStr(members)
            }, (/**
             * @return {?}
             */
            () => {
                this._loadGroups();
                this._loadAllFriends();
                if (!this.viewGroups) {
                    this.toGroups();
                }
            }));
        }));
        this.groups.splice(this.groups.indexOf(this.groupActive), 1);
    }
    /**
     * @param {?} friend
     * @param {?} template
     * @return {?}
     */
    removeFriend(friend, template) {
        this.modalMemberDeleteRef = this.modalService.show(template);
        this.memberActive = friend;
    }
    /**
     * @return {?}
     */
    onDeleteMember() {
        /** @type {?} */
        const promises = [];
        if (this.memberActive.categories) {
            // Member on groups
            this.memberActive.categories.forEach((/**
             * @param {?} category
             * @return {?}
             */
            category => {
                promises.push(this._deleteMemberPromise(this.memberActive.usercode, category));
            }));
        }
        else {
            promises.push(this._deleteMemberPromise(this.memberActive.usercode, this.memberActive.category));
        }
        Promise.all(promises).then((/**
         * @param {?} values
         * @return {?}
         */
        values => {
            if (this.groupView) {
                this._loadMembers();
            }
            this._loadAllFriends();
        }));
        this.modalMemberDeleteRef.hide();
    }
    /**
     * @private
     * @param {?} usercode
     * @param {?} category
     * @return {?}
     */
    _deleteMemberPromise(usercode, category) {
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            this.socialService.groupMemberDelete({
                category: category,
                member: usercode
            }, resolve);
        }));
    }
    /**
     * @return {?}
     */
    addMemberGroup() {
        this.modalAddMember.open();
    }
    /**
     * @param {?} members
     * @return {?}
     */
    saveMemberGroup(members) {
        this.socialService.groupMemberCreate({
            category: this.groupView,
            member: this._getMemberStr(members)
        }, (/**
         * @return {?}
         */
        () => {
            this._loadMembers();
            this._loadAllFriends();
        }));
    }
    /**
     * @return {?}
     */
    toGroups() {
        this.router.navigate([this._prefix]);
    }
    /**
     * @private
     * @return {?}
     */
    _viewGroup() {
        this.viewGroups = true;
        this.groupView = '';
        if (!this.groups) {
            this._loadGroups();
        }
    }
    /**
     * @private
     * @return {?}
     */
    _loadGroups() {
        this.noGroups = false;
        this.socialService.listGroups((/**
         * @param {?} groups
         * @return {?}
         */
        groups => {
            this.groups = groups;
            this.noGroups = groups.length < 1;
        }));
    }
    /**
     * @private
     * @param {?} group
     * @return {?}
     */
    _viewGroupMember(group) {
        this.viewMembers = true;
        this.members = [];
        this.groupView = group;
        this._loadMembers();
    }
    /**
     * @private
     * @return {?}
     */
    _loadMembers() {
        this._loadFriends(this.groupView, (/**
         * @param {?} users
         * @return {?}
         */
        users => this.members = users));
    }
    /**
     * @private
     * @return {?}
     */
    _loadAllFriends() {
        this.friends = [];
        this.noFriends = false;
        this._loadFriends('', (/**
         * @param {?} users
         * @return {?}
         */
        users => {
            /** @type {?} */
            const tmp = [];
            users.forEach((/**
             * @param {?} item
             * @return {?}
             */
            item => {
                /** @type {?} */
                const index = tmp.indexOf(item.usercode);
                if (index < 0) {
                    tmp.push(item.usercode);
                    item.categories = [item.category];
                    this.friends.push(item);
                }
                else {
                    this.friends[index].categories.push(item.category);
                }
            }));
            this.noFriends = this.friends.length < 1;
        }));
    }
    /**
     * @private
     * @param {?} category
     * @param {?} callback
     * @return {?}
     */
    _loadFriends(category, callback) {
        this.socialService.listFriends({
            pageSize: -1,
            category: category
        }, (/**
         * @param {?} users
         * @return {?}
         */
        (users) => {
            users.forEach((/**
             * @param {?} item
             * @return {?}
             */
            item => {
                item._index = this._indexSearch(item.fullname) + ' ' + item.usercode;
            }));
            callback(users);
        }));
    }
    /**
     * @private
     * @param {?} members
     * @return {?}
     */
    _getMemberStr(members) {
        return members.map((/**
         * @param {?} item
         * @return {?}
         */
        item => item.usercode || item.username)).join(',');
    }
    /**
     * @private
     * @return {?}
     */
    _actionView() {
        this.viewGroups = this.viewMembers = false;
        /** @type {?} */
        const group = this.router.url.split('/')[3];
        this.clearSearchValue();
        if (!group) {
            this._viewGroup();
        }
        else {
            this._viewGroupMember(decodeURIComponent(group));
        }
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    _indexSearch(value) {
        return this.accentService.viToEn(value.toLowerCase());
    }
}
SocialGroupComponent.decorators = [
    { type: Component, args: [{
                template: "<div *ngIf=\"viewGroups; else memberTemplate\">\n  <div class=\"group-toolbar\">\n    <button *ngIf=\"viewGroups\" class=\"btn btn-primary btn-sm\" (click)=\"createGroup()\">\n      <i class=\"fa fa-plus\"></i>\n      <span>T\u1EA1o nh\u00F3m</span>\n    </button>\n  </div>\n  <div *ngIf=\"!searching\">\n    <div class=\"grid-title\">Nh\u00F3m</div>\n    <div class=\"grid-container\">\n      <div class=\"grid-item\" *ngFor=\"let group of groups\" (click)=\"viewGroup(group)\">\n        <i class=\"grid-item__icon fa fa-users\"></i>\n        <div class=\"grid-item__content\" [title]=\"group\">\n          <div class=\"grid-content__ellipsis\">{{group}}</div>\n        </div>\n        <button (click)=\"$event.stopPropagation(); removeGroup(group, templateConfirmGroup)\"\n                class=\"btn btn-sm btn-danger grid-item__btn\"\n                title=\"X\u00F3a nh\u00F3m\">\n          <i class=\"fa fa-trash\"></i>\n        </button>\n      </div>\n      <div class=\"grid-item\" *ngIf=\"noGroups\">\n          <i class=\"grid-item__icon fa fa-bell\"></i>\n          <div class=\"grid-item__content\">Ch\u01B0a c\u00F3 nh\u00F3m \u0111\u01B0\u1EE3c t\u1EA1o</div>\n      </div>\n    </div>\n  </div>\n  <div class=\"grid-title\">B\u1EA1n b\u00E8</div>\n  <div class=\"grid-container\">\n    <div class=\"grid-item\" *ngFor=\"let friend of friends\" [hidden]=\"friend.hidden\">\n      <img userAvatar [usercode]=\"friend.usercode\" class=\"grid-item__icon\">\n      <div class=\"grid-item__content\">\n        <div class=\"grid-content__ellipsis\">{{friend.fullname}}</div>\n        <div class=\"grid-content__brief\">{{friend.usercode}}</div>\n        <!--<div>-->\n          <!--<div *ngFor=\"let group of friend.categories\" class=\"group-item\">{{group}}</div>-->\n        <!--</div>-->\n      </div>\n      <button (click)=\"removeFriend(friend, templateConfirmMember)\"\n              class=\"btn btn-sm btn-danger grid-item__btn\"\n              title=\"X\u00F3a b\u1EA1n\">\n        <i class=\"fa fa-trash\"></i>\n      </button>\n    </div>\n    <div class=\"grid-item grid-item__sm\" *ngIf=\"noFriends\">\n      <i class=\"grid-item__icon fa fa-bell\"></i>\n      <div class=\"grid-item__content\">Ch\u01B0a c\u00F3 b\u1EA1n b\u00E8</div>\n    </div>\n  </div>\n</div>\n\n<ng-template #memberTemplate>\n  <div class=\"group-toolbar\">\n    <button class=\"btn btn-primary btn-sm\" (click)=\"toGroups()\">\n      <i class=\"fa fa-arrow-left\"></i>\n      <span>Tr\u1EDF v\u1EC1</span>\n    </button>\n    <button class=\"btn btn-primary btn-sm\" (click)=\"addMemberGroup()\">\n      <i class=\"fa fa-plus\"></i>\n      <span>Th\u00EAm th\u00E0nh vi\u00EAn</span>\n    </button>\n    <button class=\"btn btn-danger btn-sm\" (click)=\"removeGroup(groupView, templateConfirmGroup)\">\n      <i class=\"fa fa-trash\"></i>\n      <span>X\u00F3a nh\u00F3m</span>\n    </button>\n  </div>\n\n  <div class=\"grid-title\">{{groupView}}</div>\n\n  <div class=\"grid-container\">\n    <div class=\"grid-item\" *ngFor=\"let friend of members\" [hidden]=\"friend.hidden\">\n      <img userAvatar [usercode]=\"friend.usercode\" class=\"grid-item__icon\">\n      <div class=\"grid-item__content\">\n        <div class=\"grid-content__ellipsis\">{{friend.fullname}}</div>\n        <div class=\"grid-content__brief\">{{friend.usercode}}</div>\n      </div>\n      <button (click)=\"removeFriend(friend, templateConfirmMember)\"\n              class=\"btn btn-sm btn-danger grid-item__btn\"\n              title=\"X\u00F3a b\u1EA1n\">\n        <i class=\"fa fa-trash\"></i>\n      </button>\n    </div>\n    <div class=\"grid-item grid-item__sm\" *ngIf=\"members && !members.length\">\n        <i class=\"grid-item__icon fa fa-bell\"></i>\n        <div class=\"grid-item__content\">Ch\u01B0a c\u00F3 th\u00E0nh vi\u00EAn trong nh\u00F3m</div>\n    </div>\n  </div>\n\n</ng-template>\n\n<div socialGroupCreate #modalCreateMember (onCreate)=\"groupCreated()\"></div>\n<div socialGroupMember #modalAddMember (onSelect)=\"saveMemberGroup($event)\"></div>\n\n<ng-template #templateConfirmGroup>\n  <div class=\"modal-header\">\n    <h4 class=\"modal-title pull-left\">X\u00F3a nh\u00F3m</h4>\n    <button type=\"button\" class=\"close pull-right\" (click)=\"modalGroupDeleteRef.hide()\">\n      <span aria-hidden=\"true\">&times;</span>\n    </button>\n  </div>\n  <div class=\"modal-body\">\n    X\u00F3a <b>{{groupActive}}</b> kh\u1ECFi danh s\u00E1ch nh\u00F3m?\n  </div>\n  <div class=\"modal-footer\">\n    <button type=\"button\" class=\"btn btn-danger\" (click)=\"onDeleteGroup()\">X\u00F3a nh\u00F3m</button>\n    <button type=\"button\" class=\"btn btn-secondary\" (click)=\"modalGroupDeleteRef.hide()\">H\u1EE7y</button>\n  </div>\n</ng-template>\n<ng-template #templateConfirmMember>\n  <div class=\"modal-header\">\n    <h4 class=\"modal-title pull-left\">X\u00F3a b\u1EA1n b\u00E8</h4>\n    <button type=\"button\" class=\"close pull-right\" (click)=\"modalMemberDeleteRef.hide()\">\n      <span aria-hidden=\"true\">&times;</span>\n    </button>\n  </div>\n  <div class=\"modal-body\">\n    X\u00F3a <b>{{memberActive.fullname}}</b> kh\u1ECFi nh\u00F3m\n    <b>{{memberActive.categories ? memberActive.categories.join(', ') : memberActive.category}}</b>?\n  </div>\n  <div class=\"modal-footer\">\n    <button type=\"button\" class=\"btn btn-danger\" (click)=\"onDeleteMember()\">X\u00F3a b\u1EA1n</button>\n    <button type=\"button\" class=\"btn btn-secondary\" (click)=\"modalMemberDeleteRef.hide()\">H\u1EE7y</button>\n  </div>\n</ng-template>",
                styles: [".grid-title{color:rgba(0,0,0,.54);font-size:14px;margin:8px;font-weight:700}.grid-container{padding-bottom:20px;overflow:hidden}.grid-item{float:left;width:50%;padding:0 15px;margin-right:-1px;margin-bottom:-1px;border:1px solid rgba(0,0,0,.05);cursor:pointer;display:flex;height:90px;align-items:center}.grid-item__sm{height:80px}.grid-item__icon{width:60px;height:60px;line-height:60px;text-align:center;color:rgba(0,0,0,.54);border-radius:50%;font-size:26px;background:rgba(0,0,0,.05)}.grid-item__btn{line-height:20px;margin-left:5px}.grid-item__content{flex-grow:1;padding:0 10px 0 15px;line-height:20px;overflow:hidden;font-size:16px}.grid-content__brief,.grid-content__ellipsis{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.grid-content__brief{font-size:14px;color:rgba(0,0,0,.4)}@media (max-width:767px){.grid-item{width:100%}.grid-item__icon{width:40px;height:40px;line-height:40px}}", ".group-toolbar{margin:-20px -15px 20px;padding:7px 15px;background:rgba(0,0,0,.03)}.group-item{display:inline-block;margin-top:5px;font-size:12px;line-height:20px;padding:0 5px;overflow:hidden;border-radius:2px;color:#fff;background:#007bff;margin-right:5px}"]
            }] }
];
/** @nocollapse */
SocialGroupComponent.ctorParameters = () => [
    { type: SocialService },
    { type: AccentService },
    { type: Router },
    { type: BsModalService }
];
SocialGroupComponent.propDecorators = {
    modalCreateMember: [{ type: ViewChild, args: ['modalCreateMember',] }],
    modalAddMember: [{ type: ViewChild, args: ['modalAddMember',] }]
};
if (false) {
    /** @type {?} */
    SocialGroupComponent.prototype.modalCreateMember;
    /** @type {?} */
    SocialGroupComponent.prototype.modalAddMember;
    /** @type {?} */
    SocialGroupComponent.prototype.viewGroups;
    /** @type {?} */
    SocialGroupComponent.prototype.groups;
    /** @type {?} */
    SocialGroupComponent.prototype.friends;
    /** @type {?} */
    SocialGroupComponent.prototype.viewMembers;
    /** @type {?} */
    SocialGroupComponent.prototype.members;
    /** @type {?} */
    SocialGroupComponent.prototype.groupView;
    /** @type {?} */
    SocialGroupComponent.prototype.groupActive;
    /** @type {?} */
    SocialGroupComponent.prototype.memberActive;
    /** @type {?} */
    SocialGroupComponent.prototype.modalGroupDeleteRef;
    /** @type {?} */
    SocialGroupComponent.prototype.modalMemberDeleteRef;
    /** @type {?} */
    SocialGroupComponent.prototype.noGroups;
    /** @type {?} */
    SocialGroupComponent.prototype.noFriends;
    /** @type {?} */
    SocialGroupComponent.prototype.searching;
    /**
     * @type {?}
     * @private
     */
    SocialGroupComponent.prototype._prefix;
    /**
     * @type {?}
     * @private
     */
    SocialGroupComponent.prototype._router;
    /** @type {?} */
    SocialGroupComponent.prototype.placeholder;
    /**
     * @type {?}
     * @private
     */
    SocialGroupComponent.prototype.socialService;
    /**
     * @type {?}
     * @private
     */
    SocialGroupComponent.prototype.accentService;
    /**
     * @type {?}
     * @private
     */
    SocialGroupComponent.prototype.router;
    /**
     * @type {?}
     * @private
     */
    SocialGroupComponent.prototype.modalService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvdXAuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC1zb2NpYWwvIiwic291cmNlcyI6WyJzcmMvc29jaWFsLWZyaWVuZC9ncm91cC9ncm91cC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQWtDLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNuRixPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDbkQsT0FBTyxFQUFDLGFBQWEsRUFBRSxNQUFNLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN0RCxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSx3Q0FBd0MsQ0FBQztBQUM1RSxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSx3Q0FBd0MsQ0FBQztBQUM1RSxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRTdDLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFDeEMsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBU3RDLE1BQU0sT0FBTyxvQkFBb0I7Ozs7Ozs7SUF3Qi9CLFlBQ1UsYUFBNEIsRUFDNUIsYUFBNEIsRUFDNUIsTUFBYyxFQUNkLFlBQTRCO1FBSDVCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxpQkFBWSxHQUFaLFlBQVksQ0FBZ0I7UUF0QnRDLFlBQU8sR0FBVSxFQUFFLENBQUM7UUFHcEIsWUFBTyxHQUFVLEVBQUUsQ0FBQztRQVlaLFlBQU8sR0FBRyxnQkFBZ0IsQ0FBQztRQVluQyxnQkFBVyxHQUFHLGFBQWEsQ0FBQztRQUgxQixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDekIsQ0FBQzs7Ozs7SUFHRCxRQUFRLENBQUMsS0FBYTtRQUNwQixJQUFJLENBQUMsU0FB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OztJQUNwQyxzQ0FBc0I7Ozs7O0lBQ3RCLDRDQUFvQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBPbkRlc3Ryb3ksIE9uSW5pdCwgVGVtcGxhdGVSZWYsIFZpZXdDaGlsZH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1NvY2lhbFNlcnZpY2V9IGZyb20gXCIuLi8uLi9zb2NpYWwuc2VydmljZVwiO1xuaW1wb3J0IHtOYXZpZ2F0aW9uRW5kLCBSb3V0ZXJ9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7R3JvdXBNZW1iZXJDb21wb25lbnR9IGZyb20gXCIuLi9ncm91cC1tZW1iZXIvZ3JvdXAtbWVtYmVyLmNvbXBvbmVudFwiO1xuaW1wb3J0IHtHcm91cENyZWF0ZUNvbXBvbmVudH0gZnJvbSBcIi4uL2dyb3VwLWNyZWF0ZS9ncm91cC1jcmVhdGUuY29tcG9uZW50XCI7XG5pbXBvcnQge0JzTW9kYWxTZXJ2aWNlfSBmcm9tICduZ3gtYm9vdHN0cmFwJztcbmltcG9ydCB7RnJpZW5kVGFifSBmcm9tICcuLi9GcmllbmRUYWInO1xuaW1wb3J0IHtBY2NlbnRTZXJ2aWNlfSBmcm9tICdpbmV0LWNvcmUnO1xuaW1wb3J0IHtmaWx0ZXJ9IGZyb20gXCJyeGpzL29wZXJhdG9yc1wiO1xuXG5AQ29tcG9uZW50KHtcbiAgdGVtcGxhdGVVcmw6ICcuL2dyb3VwLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbXG4gICAgJy4uL3N0eWxlLmNzcycsXG4gICAgJy4vZ3JvdXAuY29tcG9uZW50LmNzcydcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBTb2NpYWxHcm91cENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBGcmllbmRUYWIge1xuICBAVmlld0NoaWxkKCdtb2RhbENyZWF0ZU1lbWJlcicpIG1vZGFsQ3JlYXRlTWVtYmVyOiBHcm91cENyZWF0ZUNvbXBvbmVudDtcbiAgQFZpZXdDaGlsZCgnbW9kYWxBZGRNZW1iZXInKSBtb2RhbEFkZE1lbWJlcjogR3JvdXBNZW1iZXJDb21wb25lbnQ7XG5cbiAgdmlld0dyb3VwczogYm9vbGVhbjtcbiAgZ3JvdXBzOiBzdHJpbmdbXTtcbiAgZnJpZW5kczogYW55W10gPSBbXTtcblxuICB2aWV3TWVtYmVyczogYm9vbGVhbjtcbiAgbWVtYmVyczogYW55W10gPSBbXTtcbiAgZ3JvdXBWaWV3OiBzdHJpbmc7XG4gIGdyb3VwQWN0aXZlOiBzdHJpbmc7XG4gIG1lbWJlckFjdGl2ZTogYW55O1xuXG4gIG1vZGFsR3JvdXBEZWxldGVSZWY6IGFueTtcbiAgbW9kYWxNZW1iZXJEZWxldGVSZWY6IGFueTtcblxuICBub0dyb3VwczogYm9vbGVhbjtcbiAgbm9GcmllbmRzOiBib29sZWFuO1xuICBzZWFyY2hpbmc6IGJvb2xlYW47XG5cbiAgcHJpdmF0ZSBfcHJlZml4ID0gJy9zb2NpYWwvZnJpZW5kJztcbiAgcHJpdmF0ZSBfcm91dGVyO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgc29jaWFsU2VydmljZTogU29jaWFsU2VydmljZSxcbiAgICBwcml2YXRlIGFjY2VudFNlcnZpY2U6IEFjY2VudFNlcnZpY2UsXG4gICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcbiAgICBwcml2YXRlIG1vZGFsU2VydmljZTogQnNNb2RhbFNlcnZpY2VcbiAgKSB7XG4gICAgdGhpcy5fbG9hZEFsbEZyaWVuZHMoKTtcbiAgfVxuXG4gIHBsYWNlaG9sZGVyID0gJ1TDrG0ga2nhur9tLi4uJztcbiAgb25TZWFyY2godmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuc2VhcmNoaW5nID0gISF2YWx1ZTtcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHZhbHVlID0gdGhpcy5hY2NlbnRTZXJ2aWNlLnZpVG9Fbih2YWx1ZSk7XG4gICAgICBpZiAodGhpcy52aWV3R3JvdXBzKSB7XG4gICAgICAgIHRoaXMuZnJpZW5kcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgIGl0ZW0uaGlkZGVuID0gaXRlbS5faW5kZXguaW5kZXhPZih2YWx1ZSkgPCAwO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubWVtYmVycy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgIGl0ZW0uaGlkZGVuID0gaXRlbS5faW5kZXguaW5kZXhPZih2YWx1ZSkgPCAwO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMudmlld0dyb3Vwcykge1xuICAgICAgICB0aGlzLmZyaWVuZHMuZm9yRWFjaChpdGVtID0+IGRlbGV0ZSBpdGVtLmhpZGRlbik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm1lbWJlcnMuZm9yRWFjaChpdGVtID0+IGRlbGV0ZSBpdGVtLmhpZGRlbik7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGNsZWFyU2VhcmNoVmFsdWUoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLl9yb3V0ZXIgPSB0aGlzLnJvdXRlci5ldmVudHNcbiAgICAgIC5waXBlKGZpbHRlcihldmVudCA9PiBldmVudCBpbnN0YW5jZW9mIE5hdmlnYXRpb25FbmQpKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuX2FjdGlvblZpZXcoKTtcbiAgICAgIH0pO1xuICAgIHRoaXMuX2FjdGlvblZpZXcoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX3JvdXRlci51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgY3JlYXRlR3JvdXAoKSB7XG4gICAgdGhpcy5tb2RhbENyZWF0ZU1lbWJlci5vcGVuKCk7XG4gIH1cblxuICBncm91cENyZWF0ZWQoKSB7XG4gICAgdGhpcy5fbG9hZEdyb3VwcygpO1xuICAgIHRoaXMuX2xvYWRBbGxGcmllbmRzKCk7XG4gIH1cblxuICB2aWV3R3JvdXAoZ3JvdXA6IHN0cmluZykge1xuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFt0aGlzLl9wcmVmaXggKyAnLycgKyBncm91cF0pO1xuICB9XG5cbiAgcmVtb3ZlR3JvdXAoZ3JvdXA6IHN0cmluZywgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4pIHtcbiAgICB0aGlzLmdyb3VwQWN0aXZlID0gZ3JvdXA7XG4gICAgdGhpcy5tb2RhbEdyb3VwRGVsZXRlUmVmID0gdGhpcy5tb2RhbFNlcnZpY2Uuc2hvdyh0ZW1wbGF0ZSk7XG4gIH1cblxuICAvLyBUb2RvOiBpbXByb3ZlIHJlbW92ZSBncm91cFxuICBvbkRlbGV0ZUdyb3VwKCkge1xuICAgIHRoaXMubW9kYWxHcm91cERlbGV0ZVJlZi5oaWRlKCk7XG4gICAgdGhpcy5fbG9hZEZyaWVuZHModGhpcy5ncm91cEFjdGl2ZSwgKG1lbWJlcnMpID0+IHtcbiAgICAgIHRoaXMuc29jaWFsU2VydmljZS5ncm91cE1lbWJlckRlbGV0ZSh7XG4gICAgICAgIGNhdGVnb3J5OiB0aGlzLmdyb3VwQWN0aXZlLFxuICAgICAgICBtZW1iZXI6IHRoaXMuX2dldE1lbWJlclN0cihtZW1iZXJzKVxuICAgICAgfSwgKCkgPT4ge1xuICAgICAgICB0aGlzLl9sb2FkR3JvdXBzKCk7XG4gICAgICAgIHRoaXMuX2xvYWRBbGxGcmllbmRzKCk7XG4gICAgICAgIGlmICghdGhpcy52aWV3R3JvdXBzKSB7XG4gICAgICAgICAgdGhpcy50b0dyb3VwcygpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICB0aGlzLmdyb3Vwcy5zcGxpY2UodGhpcy5ncm91cHMuaW5kZXhPZih0aGlzLmdyb3VwQWN0aXZlKSwgMSk7XG4gIH1cblxuICByZW1vdmVGcmllbmQoZnJpZW5kLCB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55Pikge1xuICAgIHRoaXMubW9kYWxNZW1iZXJEZWxldGVSZWYgPSB0aGlzLm1vZGFsU2VydmljZS5zaG93KHRlbXBsYXRlKTtcbiAgICB0aGlzLm1lbWJlckFjdGl2ZSA9IGZyaWVuZDtcbiAgfVxuXG4gIG9uRGVsZXRlTWVtYmVyKCkge1xuICAgIGNvbnN0IHByb21pc2VzID0gW107XG4gICAgaWYgKHRoaXMubWVtYmVyQWN0aXZlLmNhdGVnb3JpZXMpIHtcbiAgICAgIC8vIE1lbWJlciBvbiBncm91cHNcbiAgICAgIHRoaXMubWVtYmVyQWN0aXZlLmNhdGVnb3JpZXMuZm9yRWFjaChjYXRlZ29yeSA9PiB7XG4gICAgICAgIHByb21pc2VzLnB1c2godGhpcy5fZGVsZXRlTWVtYmVyUHJvbWlzZSh0aGlzLm1lbWJlckFjdGl2ZS51c2VyY29kZSwgY2F0ZWdvcnkpKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBwcm9taXNlcy5wdXNoKHRoaXMuX2RlbGV0ZU1lbWJlclByb21pc2UodGhpcy5tZW1iZXJBY3RpdmUudXNlcmNvZGUsIHRoaXMubWVtYmVyQWN0aXZlLmNhdGVnb3J5KSk7XG4gICAgfVxuXG4gICAgUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4odmFsdWVzID0+IHtcbiAgICAgIGlmICh0aGlzLmdyb3VwVmlldykge1xuICAgICAgICB0aGlzLl9sb2FkTWVtYmVycygpO1xuICAgICAgfVxuICAgICAgdGhpcy5fbG9hZEFsbEZyaWVuZHMoKTtcbiAgICB9KTtcbiAgICB0aGlzLm1vZGFsTWVtYmVyRGVsZXRlUmVmLmhpZGUoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2RlbGV0ZU1lbWJlclByb21pc2UodXNlcmNvZGUsIGNhdGVnb3J5KSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMuc29jaWFsU2VydmljZS5ncm91cE1lbWJlckRlbGV0ZSh7XG4gICAgICAgIGNhdGVnb3J5OiBjYXRlZ29yeSxcbiAgICAgICAgbWVtYmVyOiB1c2VyY29kZVxuICAgICAgfSwgcmVzb2x2ZSk7XG4gICAgfSk7XG4gIH1cblxuICBhZGRNZW1iZXJHcm91cCgpIHtcbiAgICB0aGlzLm1vZGFsQWRkTWVtYmVyLm9wZW4oKTtcbiAgfVxuXG4gIHNhdmVNZW1iZXJHcm91cChtZW1iZXJzKSB7XG4gICAgdGhpcy5zb2NpYWxTZXJ2aWNlLmdyb3VwTWVtYmVyQ3JlYXRlKHtcbiAgICAgIGNhdGVnb3J5OiB0aGlzLmdyb3VwVmlldyxcbiAgICAgIG1lbWJlcjogdGhpcy5fZ2V0TWVtYmVyU3RyKG1lbWJlcnMpXG4gICAgfSwgKCkgPT4ge1xuICAgICAgdGhpcy5fbG9hZE1lbWJlcnMoKTtcbiAgICAgIHRoaXMuX2xvYWRBbGxGcmllbmRzKCk7XG4gICAgfSk7XG4gIH1cblxuICB0b0dyb3VwcygpIHtcbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbdGhpcy5fcHJlZml4XSk7XG4gIH1cblxuICBwcml2YXRlIF92aWV3R3JvdXAoKSB7XG4gICAgdGhpcy52aWV3R3JvdXBzID0gdHJ1ZTtcbiAgICB0aGlzLmdyb3VwVmlldyA9ICcnO1xuICAgIGlmICghdGhpcy5ncm91cHMpIHtcbiAgICAgIHRoaXMuX2xvYWRHcm91cHMoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9sb2FkR3JvdXBzKCkge1xuICAgIHRoaXMubm9Hcm91cHMgPSBmYWxzZTtcbiAgICB0aGlzLnNvY2lhbFNlcnZpY2UubGlzdEdyb3Vwcyhncm91cHMgPT4ge1xuICAgICAgdGhpcy5ncm91cHMgPSBncm91cHM7XG4gICAgICB0aGlzLm5vR3JvdXBzID0gZ3JvdXBzLmxlbmd0aCA8IDE7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF92aWV3R3JvdXBNZW1iZXIoZ3JvdXA6IHN0cmluZykge1xuICAgIHRoaXMudmlld01lbWJlcnMgPSB0cnVlO1xuICAgIHRoaXMubWVtYmVycyA9IFtdO1xuICAgIHRoaXMuZ3JvdXBWaWV3ID0gZ3JvdXA7XG4gICAgdGhpcy5fbG9hZE1lbWJlcnMoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2xvYWRNZW1iZXJzKCkge1xuICAgIHRoaXMuX2xvYWRGcmllbmRzKHRoaXMuZ3JvdXBWaWV3LCB1c2VycyA9PiB0aGlzLm1lbWJlcnMgPSB1c2Vycyk7XG4gIH1cblxuICBwcml2YXRlIF9sb2FkQWxsRnJpZW5kcygpIHtcbiAgICB0aGlzLmZyaWVuZHMgPSBbXTtcbiAgICB0aGlzLm5vRnJpZW5kcyA9IGZhbHNlO1xuICAgIHRoaXMuX2xvYWRGcmllbmRzKCcnLCB1c2VycyA9PiB7XG4gICAgICBjb25zdCB0bXAgPSBbXTtcbiAgICAgIHVzZXJzLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gdG1wLmluZGV4T2YoaXRlbS51c2VyY29kZSk7XG4gICAgICAgIGlmIChpbmRleCA8IDApIHtcbiAgICAgICAgICB0bXAucHVzaChpdGVtLnVzZXJjb2RlKTtcbiAgICAgICAgICBpdGVtLmNhdGVnb3JpZXMgPSBbaXRlbS5jYXRlZ29yeV07XG4gICAgICAgICAgdGhpcy5mcmllbmRzLnB1c2goaXRlbSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5mcmllbmRzW2luZGV4XS5jYXRlZ29yaWVzLnB1c2goaXRlbS5jYXRlZ29yeSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgdGhpcy5ub0ZyaWVuZHMgPSB0aGlzLmZyaWVuZHMubGVuZ3RoIDwgMTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2xvYWRGcmllbmRzKGNhdGVnb3J5OiBzdHJpbmcsIGNhbGxiYWNrKSB7XG4gICAgdGhpcy5zb2NpYWxTZXJ2aWNlLmxpc3RGcmllbmRzKHtcbiAgICAgIHBhZ2VTaXplOiAtMSxcbiAgICAgIGNhdGVnb3J5OiBjYXRlZ29yeVxuICAgIH0sICh1c2VycykgPT4ge1xuICAgICAgdXNlcnMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgaXRlbS5faW5kZXggPSB0aGlzLl9pbmRleFNlYXJjaChpdGVtLmZ1bGxuYW1lKSArICcgJyArIGl0ZW0udXNlcmNvZGU7XG4gICAgICB9KTtcbiAgICAgIGNhbGxiYWNrKHVzZXJzKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldE1lbWJlclN0cihtZW1iZXJzOiBhbnlbXSk6IHN0cmluZyB7XG4gICAgcmV0dXJuIG1lbWJlcnMubWFwKGl0ZW0gPT4gaXRlbS51c2VyY29kZSB8fCBpdGVtLnVzZXJuYW1lKS5qb2luKCcsJyk7XG4gIH1cblxuICBwcml2YXRlIF9hY3Rpb25WaWV3KCkge1xuICAgIHRoaXMudmlld0dyb3VwcyA9IHRoaXMudmlld01lbWJlcnMgPSBmYWxzZTtcbiAgICBjb25zdCBncm91cCA9IHRoaXMucm91dGVyLnVybC5zcGxpdCgnLycpWzNdO1xuXG4gICAgdGhpcy5jbGVhclNlYXJjaFZhbHVlKCk7XG5cbiAgICBpZiAoIWdyb3VwKSB7XG4gICAgICB0aGlzLl92aWV3R3JvdXAoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fdmlld0dyb3VwTWVtYmVyKGRlY29kZVVSSUNvbXBvbmVudChncm91cCkpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2luZGV4U2VhcmNoKHZhbHVlOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5hY2NlbnRTZXJ2aWNlLnZpVG9Fbih2YWx1ZS50b0xvd2VyQ2FzZSgpKTtcbiAgfVxufVxuIl19