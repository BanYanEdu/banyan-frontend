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
var SocialGroupComponent = /** @class */ (function () {
    function SocialGroupComponent(socialService, accentService, router, modalService) {
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
    SocialGroupComponent.prototype.onSearch = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.searching = !!value;
        if (value) {
            value = this.accentService.viToEn(value);
            if (this.viewGroups) {
                this.friends.forEach((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) {
                    item.hidden = item._index.indexOf(value) < 0;
                }));
            }
            else {
                this.members.forEach((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) {
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
                function (item) { return delete item.hidden; }));
            }
            else {
                this.members.forEach((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) { return delete item.hidden; }));
            }
        }
    };
    /**
     * @return {?}
     */
    SocialGroupComponent.prototype.clearSearchValue = /**
     * @return {?}
     */
    function () { };
    /**
     * @return {?}
     */
    SocialGroupComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._router = this.router.events
            .pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        function (event) { return event instanceof NavigationEnd; })))
            .subscribe((/**
         * @return {?}
         */
        function () {
            _this._actionView();
        }));
        this._actionView();
    };
    /**
     * @return {?}
     */
    SocialGroupComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._router.unsubscribe();
    };
    /**
     * @return {?}
     */
    SocialGroupComponent.prototype.createGroup = /**
     * @return {?}
     */
    function () {
        this.modalCreateMember.open();
    };
    /**
     * @return {?}
     */
    SocialGroupComponent.prototype.groupCreated = /**
     * @return {?}
     */
    function () {
        this._loadGroups();
        this._loadAllFriends();
    };
    /**
     * @param {?} group
     * @return {?}
     */
    SocialGroupComponent.prototype.viewGroup = /**
     * @param {?} group
     * @return {?}
     */
    function (group) {
        this.router.navigate([this._prefix + '/' + group]);
    };
    /**
     * @param {?} group
     * @param {?} template
     * @return {?}
     */
    SocialGroupComponent.prototype.removeGroup = /**
     * @param {?} group
     * @param {?} template
     * @return {?}
     */
    function (group, template) {
        this.groupActive = group;
        this.modalGroupDeleteRef = this.modalService.show(template);
    };
    // Todo: improve remove group
    // Todo: improve remove group
    /**
     * @return {?}
     */
    SocialGroupComponent.prototype.onDeleteGroup = 
    // Todo: improve remove group
    /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.modalGroupDeleteRef.hide();
        this._loadFriends(this.groupActive, (/**
         * @param {?} members
         * @return {?}
         */
        function (members) {
            _this.socialService.groupMemberDelete({
                category: _this.groupActive,
                member: _this._getMemberStr(members)
            }, (/**
             * @return {?}
             */
            function () {
                _this._loadGroups();
                _this._loadAllFriends();
                if (!_this.viewGroups) {
                    _this.toGroups();
                }
            }));
        }));
        this.groups.splice(this.groups.indexOf(this.groupActive), 1);
    };
    /**
     * @param {?} friend
     * @param {?} template
     * @return {?}
     */
    SocialGroupComponent.prototype.removeFriend = /**
     * @param {?} friend
     * @param {?} template
     * @return {?}
     */
    function (friend, template) {
        this.modalMemberDeleteRef = this.modalService.show(template);
        this.memberActive = friend;
    };
    /**
     * @return {?}
     */
    SocialGroupComponent.prototype.onDeleteMember = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var promises = [];
        if (this.memberActive.categories) {
            // Member on groups
            this.memberActive.categories.forEach((/**
             * @param {?} category
             * @return {?}
             */
            function (category) {
                promises.push(_this._deleteMemberPromise(_this.memberActive.usercode, category));
            }));
        }
        else {
            promises.push(this._deleteMemberPromise(this.memberActive.usercode, this.memberActive.category));
        }
        Promise.all(promises).then((/**
         * @param {?} values
         * @return {?}
         */
        function (values) {
            if (_this.groupView) {
                _this._loadMembers();
            }
            _this._loadAllFriends();
        }));
        this.modalMemberDeleteRef.hide();
    };
    /**
     * @private
     * @param {?} usercode
     * @param {?} category
     * @return {?}
     */
    SocialGroupComponent.prototype._deleteMemberPromise = /**
     * @private
     * @param {?} usercode
     * @param {?} category
     * @return {?}
     */
    function (usercode, category) {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            _this.socialService.groupMemberDelete({
                category: category,
                member: usercode
            }, resolve);
        }));
    };
    /**
     * @return {?}
     */
    SocialGroupComponent.prototype.addMemberGroup = /**
     * @return {?}
     */
    function () {
        this.modalAddMember.open();
    };
    /**
     * @param {?} members
     * @return {?}
     */
    SocialGroupComponent.prototype.saveMemberGroup = /**
     * @param {?} members
     * @return {?}
     */
    function (members) {
        var _this = this;
        this.socialService.groupMemberCreate({
            category: this.groupView,
            member: this._getMemberStr(members)
        }, (/**
         * @return {?}
         */
        function () {
            _this._loadMembers();
            _this._loadAllFriends();
        }));
    };
    /**
     * @return {?}
     */
    SocialGroupComponent.prototype.toGroups = /**
     * @return {?}
     */
    function () {
        this.router.navigate([this._prefix]);
    };
    /**
     * @private
     * @return {?}
     */
    SocialGroupComponent.prototype._viewGroup = /**
     * @private
     * @return {?}
     */
    function () {
        this.viewGroups = true;
        this.groupView = '';
        if (!this.groups) {
            this._loadGroups();
        }
    };
    /**
     * @private
     * @return {?}
     */
    SocialGroupComponent.prototype._loadGroups = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.noGroups = false;
        this.socialService.listGroups((/**
         * @param {?} groups
         * @return {?}
         */
        function (groups) {
            _this.groups = groups;
            _this.noGroups = groups.length < 1;
        }));
    };
    /**
     * @private
     * @param {?} group
     * @return {?}
     */
    SocialGroupComponent.prototype._viewGroupMember = /**
     * @private
     * @param {?} group
     * @return {?}
     */
    function (group) {
        this.viewMembers = true;
        this.members = [];
        this.groupView = group;
        this._loadMembers();
    };
    /**
     * @private
     * @return {?}
     */
    SocialGroupComponent.prototype._loadMembers = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this._loadFriends(this.groupView, (/**
         * @param {?} users
         * @return {?}
         */
        function (users) { return _this.members = users; }));
    };
    /**
     * @private
     * @return {?}
     */
    SocialGroupComponent.prototype._loadAllFriends = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.friends = [];
        this.noFriends = false;
        this._loadFriends('', (/**
         * @param {?} users
         * @return {?}
         */
        function (users) {
            /** @type {?} */
            var tmp = [];
            users.forEach((/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                /** @type {?} */
                var index = tmp.indexOf(item.usercode);
                if (index < 0) {
                    tmp.push(item.usercode);
                    item.categories = [item.category];
                    _this.friends.push(item);
                }
                else {
                    _this.friends[index].categories.push(item.category);
                }
            }));
            _this.noFriends = _this.friends.length < 1;
        }));
    };
    /**
     * @private
     * @param {?} category
     * @param {?} callback
     * @return {?}
     */
    SocialGroupComponent.prototype._loadFriends = /**
     * @private
     * @param {?} category
     * @param {?} callback
     * @return {?}
     */
    function (category, callback) {
        var _this = this;
        this.socialService.listFriends({
            pageSize: -1,
            category: category
        }, (/**
         * @param {?} users
         * @return {?}
         */
        function (users) {
            users.forEach((/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                item._index = _this._indexSearch(item.fullname) + ' ' + item.usercode;
            }));
            callback(users);
        }));
    };
    /**
     * @private
     * @param {?} members
     * @return {?}
     */
    SocialGroupComponent.prototype._getMemberStr = /**
     * @private
     * @param {?} members
     * @return {?}
     */
    function (members) {
        return members.map((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return item.usercode || item.username; })).join(',');
    };
    /**
     * @private
     * @return {?}
     */
    SocialGroupComponent.prototype._actionView = /**
     * @private
     * @return {?}
     */
    function () {
        this.viewGroups = this.viewMembers = false;
        /** @type {?} */
        var group = this.router.url.split('/')[3];
        this.clearSearchValue();
        if (!group) {
            this._viewGroup();
        }
        else {
            this._viewGroupMember(decodeURIComponent(group));
        }
    };
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    SocialGroupComponent.prototype._indexSearch = /**
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return this.accentService.viToEn(value.toLowerCase());
    };
    SocialGroupComponent.decorators = [
        { type: Component, args: [{
                    template: "<div *ngIf=\"viewGroups; else memberTemplate\">\n  <div class=\"group-toolbar\">\n    <button *ngIf=\"viewGroups\" class=\"btn btn-primary btn-sm\" (click)=\"createGroup()\">\n      <i class=\"fa fa-plus\"></i>\n      <span>T\u1EA1o nh\u00F3m</span>\n    </button>\n  </div>\n  <div *ngIf=\"!searching\">\n    <div class=\"grid-title\">Nh\u00F3m</div>\n    <div class=\"grid-container\">\n      <div class=\"grid-item\" *ngFor=\"let group of groups\" (click)=\"viewGroup(group)\">\n        <i class=\"grid-item__icon fa fa-users\"></i>\n        <div class=\"grid-item__content\" [title]=\"group\">\n          <div class=\"grid-content__ellipsis\">{{group}}</div>\n        </div>\n        <button (click)=\"$event.stopPropagation(); removeGroup(group, templateConfirmGroup)\"\n                class=\"btn btn-sm btn-danger grid-item__btn\"\n                title=\"X\u00F3a nh\u00F3m\">\n          <i class=\"fa fa-trash\"></i>\n        </button>\n      </div>\n      <div class=\"grid-item\" *ngIf=\"noGroups\">\n          <i class=\"grid-item__icon fa fa-bell\"></i>\n          <div class=\"grid-item__content\">Ch\u01B0a c\u00F3 nh\u00F3m \u0111\u01B0\u1EE3c t\u1EA1o</div>\n      </div>\n    </div>\n  </div>\n  <div class=\"grid-title\">B\u1EA1n b\u00E8</div>\n  <div class=\"grid-container\">\n    <div class=\"grid-item\" *ngFor=\"let friend of friends\" [hidden]=\"friend.hidden\">\n      <img userAvatar [usercode]=\"friend.usercode\" class=\"grid-item__icon\">\n      <div class=\"grid-item__content\">\n        <div class=\"grid-content__ellipsis\">{{friend.fullname}}</div>\n        <div class=\"grid-content__brief\">{{friend.usercode}}</div>\n        <!--<div>-->\n          <!--<div *ngFor=\"let group of friend.categories\" class=\"group-item\">{{group}}</div>-->\n        <!--</div>-->\n      </div>\n      <button (click)=\"removeFriend(friend, templateConfirmMember)\"\n              class=\"btn btn-sm btn-danger grid-item__btn\"\n              title=\"X\u00F3a b\u1EA1n\">\n        <i class=\"fa fa-trash\"></i>\n      </button>\n    </div>\n    <div class=\"grid-item grid-item__sm\" *ngIf=\"noFriends\">\n      <i class=\"grid-item__icon fa fa-bell\"></i>\n      <div class=\"grid-item__content\">Ch\u01B0a c\u00F3 b\u1EA1n b\u00E8</div>\n    </div>\n  </div>\n</div>\n\n<ng-template #memberTemplate>\n  <div class=\"group-toolbar\">\n    <button class=\"btn btn-primary btn-sm\" (click)=\"toGroups()\">\n      <i class=\"fa fa-arrow-left\"></i>\n      <span>Tr\u1EDF v\u1EC1</span>\n    </button>\n    <button class=\"btn btn-primary btn-sm\" (click)=\"addMemberGroup()\">\n      <i class=\"fa fa-plus\"></i>\n      <span>Th\u00EAm th\u00E0nh vi\u00EAn</span>\n    </button>\n    <button class=\"btn btn-danger btn-sm\" (click)=\"removeGroup(groupView, templateConfirmGroup)\">\n      <i class=\"fa fa-trash\"></i>\n      <span>X\u00F3a nh\u00F3m</span>\n    </button>\n  </div>\n\n  <div class=\"grid-title\">{{groupView}}</div>\n\n  <div class=\"grid-container\">\n    <div class=\"grid-item\" *ngFor=\"let friend of members\" [hidden]=\"friend.hidden\">\n      <img userAvatar [usercode]=\"friend.usercode\" class=\"grid-item__icon\">\n      <div class=\"grid-item__content\">\n        <div class=\"grid-content__ellipsis\">{{friend.fullname}}</div>\n        <div class=\"grid-content__brief\">{{friend.usercode}}</div>\n      </div>\n      <button (click)=\"removeFriend(friend, templateConfirmMember)\"\n              class=\"btn btn-sm btn-danger grid-item__btn\"\n              title=\"X\u00F3a b\u1EA1n\">\n        <i class=\"fa fa-trash\"></i>\n      </button>\n    </div>\n    <div class=\"grid-item grid-item__sm\" *ngIf=\"members && !members.length\">\n        <i class=\"grid-item__icon fa fa-bell\"></i>\n        <div class=\"grid-item__content\">Ch\u01B0a c\u00F3 th\u00E0nh vi\u00EAn trong nh\u00F3m</div>\n    </div>\n  </div>\n\n</ng-template>\n\n<div socialGroupCreate #modalCreateMember (onCreate)=\"groupCreated()\"></div>\n<div socialGroupMember #modalAddMember (onSelect)=\"saveMemberGroup($event)\"></div>\n\n<ng-template #templateConfirmGroup>\n  <div class=\"modal-header\">\n    <h4 class=\"modal-title pull-left\">X\u00F3a nh\u00F3m</h4>\n    <button type=\"button\" class=\"close pull-right\" (click)=\"modalGroupDeleteRef.hide()\">\n      <span aria-hidden=\"true\">&times;</span>\n    </button>\n  </div>\n  <div class=\"modal-body\">\n    X\u00F3a <b>{{groupActive}}</b> kh\u1ECFi danh s\u00E1ch nh\u00F3m?\n  </div>\n  <div class=\"modal-footer\">\n    <button type=\"button\" class=\"btn btn-danger\" (click)=\"onDeleteGroup()\">X\u00F3a nh\u00F3m</button>\n    <button type=\"button\" class=\"btn btn-secondary\" (click)=\"modalGroupDeleteRef.hide()\">H\u1EE7y</button>\n  </div>\n</ng-template>\n<ng-template #templateConfirmMember>\n  <div class=\"modal-header\">\n    <h4 class=\"modal-title pull-left\">X\u00F3a b\u1EA1n b\u00E8</h4>\n    <button type=\"button\" class=\"close pull-right\" (click)=\"modalMemberDeleteRef.hide()\">\n      <span aria-hidden=\"true\">&times;</span>\n    </button>\n  </div>\n  <div class=\"modal-body\">\n    X\u00F3a <b>{{memberActive.fullname}}</b> kh\u1ECFi nh\u00F3m\n    <b>{{memberActive.categories ? memberActive.categories.join(', ') : memberActive.category}}</b>?\n  </div>\n  <div class=\"modal-footer\">\n    <button type=\"button\" class=\"btn btn-danger\" (click)=\"onDeleteMember()\">X\u00F3a b\u1EA1n</button>\n    <button type=\"button\" class=\"btn btn-secondary\" (click)=\"modalMemberDeleteRef.hide()\">H\u1EE7y</button>\n  </div>\n</ng-template>",
                    styles: [".grid-title{color:rgba(0,0,0,.54);font-size:14px;margin:8px;font-weight:700}.grid-container{padding-bottom:20px;overflow:hidden}.grid-item{float:left;width:50%;padding:0 15px;margin-right:-1px;margin-bottom:-1px;border:1px solid rgba(0,0,0,.05);cursor:pointer;display:flex;height:90px;align-items:center}.grid-item__sm{height:80px}.grid-item__icon{width:60px;height:60px;line-height:60px;text-align:center;color:rgba(0,0,0,.54);border-radius:50%;font-size:26px;background:rgba(0,0,0,.05)}.grid-item__btn{line-height:20px;margin-left:5px}.grid-item__content{flex-grow:1;padding:0 10px 0 15px;line-height:20px;overflow:hidden;font-size:16px}.grid-content__brief,.grid-content__ellipsis{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.grid-content__brief{font-size:14px;color:rgba(0,0,0,.4)}@media (max-width:767px){.grid-item{width:100%}.grid-item__icon{width:40px;height:40px;line-height:40px}}", ".group-toolbar{margin:-20px -15px 20px;padding:7px 15px;background:rgba(0,0,0,.03)}.group-item{display:inline-block;margin-top:5px;font-size:12px;line-height:20px;padding:0 5px;overflow:hidden;border-radius:2px;color:#fff;background:#007bff;margin-right:5px}"]
                }] }
    ];
    /** @nocollapse */
    SocialGroupComponent.ctorParameters = function () { return [
        { type: SocialService },
        { type: AccentService },
        { type: Router },
        { type: BsModalService }
    ]; };
    SocialGroupComponent.propDecorators = {
        modalCreateMember: [{ type: ViewChild, args: ['modalCreateMember',] }],
        modalAddMember: [{ type: ViewChild, args: ['modalAddMember',] }]
    };
    return SocialGroupComponent;
}());
export { SocialGroupComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvdXAuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC1zb2NpYWwvIiwic291cmNlcyI6WyJzcmMvc29jaWFsLWZyaWVuZC9ncm91cC9ncm91cC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQWtDLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNuRixPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDbkQsT0FBTyxFQUFDLGFBQWEsRUFBRSxNQUFNLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN0RCxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSx3Q0FBd0MsQ0FBQztBQUM1RSxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSx3Q0FBd0MsQ0FBQztBQUM1RSxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRTdDLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFDeEMsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRXRDO0lBK0JFLDhCQUNVLGFBQTRCLEVBQzVCLGFBQTRCLEVBQzVCLE1BQWMsRUFDZCxZQUE0QjtRQUg1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsaUJBQVksR0FBWixZQUFZLENBQWdCO1FBdEJ0QyxZQUFPLEdBQVUsRUFBRSxDQUFDO1FBR3BCLFlBQU8sR0FBVSxFQUFFLENBQUM7UUFZWixZQUFPLEdBQUcsZ0JBQWdCLENBQUM7UUFZbkMsZ0JBQVcsR0FBRyxhQUFhLENBQUM7UUFIMUIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQ3pCLENBQUM7Ozs7O0lBR0QsdUNBQVE7Ozs7SUFBUixVQUFTLEtBQWE7UUFDcEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQ3pCLElBQUksS0FBSyxFQUFFO1lBQ1QsS0FBSyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3pDLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDbkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPOzs7O2dCQUFDLFVBQUEsSUFBSTtvQkFDdkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQy9DLENBQUMsRUFBQyxDQUFDO2FBQ0o7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPOzs7O2dCQUFDLFVBQUEsSUFBSTtvQkFDdkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQy9DLENBQUMsRUFBQyxDQUFDO2FBQ0o7U0FDRjthQUFNO1lBQ0wsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO2dCQUNuQixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU87Ozs7Z0JBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxPQUFPLElBQUksQ0FBQyxNQUFNLEVBQWxCLENBQWtCLEVBQUMsQ0FBQzthQUNsRDtpQkFBTTtnQkFDTCxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU87Ozs7Z0JBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxPQUFPLElBQUksQ0FBQyxNQUFNLEVBQWxCLENBQWtCLEVBQUMsQ0FBQzthQUNsRDtTQUNGO0lBQ0gsQ0FBQzs7OztJQUNELCtDQUFnQjs7O0lBQWhCLGNBQXFCLENBQUM7Ozs7SUFFdEIsdUNBQVE7OztJQUFSO1FBQUEsaUJBT0M7UUFOQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTTthQUM5QixJQUFJLENBQUMsTUFBTTs7OztRQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxZQUFZLGFBQWEsRUFBOUIsQ0FBOEIsRUFBQyxDQUFDO2FBQ3JELFNBQVM7OztRQUFDO1lBQ1QsS0FBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3JCLENBQUMsRUFBQyxDQUFDO1FBQ0wsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3JCLENBQUM7Ozs7SUFFRCwwQ0FBVzs7O0lBQVg7UUFDRSxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQzdCLENBQUM7Ozs7SUFFRCwwQ0FBVzs7O0lBQVg7UUFDRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDaEMsQ0FBQzs7OztJQUVELDJDQUFZOzs7SUFBWjtRQUNFLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDekIsQ0FBQzs7Ozs7SUFFRCx3Q0FBUzs7OztJQUFULFVBQVUsS0FBYTtRQUNyQixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDckQsQ0FBQzs7Ozs7O0lBRUQsMENBQVc7Ozs7O0lBQVgsVUFBWSxLQUFhLEVBQUUsUUFBMEI7UUFDbkQsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDekIsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzlELENBQUM7SUFFRCw2QkFBNkI7Ozs7O0lBQzdCLDRDQUFhOzs7OztJQUFiO1FBQUEsaUJBZUM7UUFkQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDaEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsV0FBVzs7OztRQUFFLFVBQUMsT0FBTztZQUMxQyxLQUFJLENBQUMsYUFBYSxDQUFDLGlCQUFpQixDQUFDO2dCQUNuQyxRQUFRLEVBQUUsS0FBSSxDQUFDLFdBQVc7Z0JBQzFCLE1BQU0sRUFBRSxLQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQzthQUNwQzs7O1lBQUU7Z0JBQ0QsS0FBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUNuQixLQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxLQUFJLENBQUMsVUFBVSxFQUFFO29CQUNwQixLQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7aUJBQ2pCO1lBQ0gsQ0FBQyxFQUFDLENBQUM7UUFDTCxDQUFDLEVBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMvRCxDQUFDOzs7Ozs7SUFFRCwyQ0FBWTs7Ozs7SUFBWixVQUFhLE1BQU0sRUFBRSxRQUEwQjtRQUM3QyxJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDN0QsSUFBSSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUM7SUFDN0IsQ0FBQzs7OztJQUVELDZDQUFjOzs7SUFBZDtRQUFBLGlCQWtCQzs7WUFqQk8sUUFBUSxHQUFHLEVBQUU7UUFDbkIsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRTtZQUNoQyxtQkFBbUI7WUFDbkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsT0FBTzs7OztZQUFDLFVBQUEsUUFBUTtnQkFDM0MsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsb0JBQW9CLENBQUMsS0FBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNqRixDQUFDLEVBQUMsQ0FBQztTQUNKO2FBQU07WUFDTCxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7U0FDbEc7UUFFRCxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUk7Ozs7UUFBQyxVQUFBLE1BQU07WUFDL0IsSUFBSSxLQUFJLENBQUMsU0FBUyxFQUFFO2dCQUNsQixLQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7YUFDckI7WUFDRCxLQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDekIsQ0FBQyxFQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDbkMsQ0FBQzs7Ozs7OztJQUVPLG1EQUFvQjs7Ozs7O0lBQTVCLFVBQTZCLFFBQVEsRUFBRSxRQUFRO1FBQS9DLGlCQU9DO1FBTkMsT0FBTyxJQUFJLE9BQU87Ozs7O1FBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUNqQyxLQUFJLENBQUMsYUFBYSxDQUFDLGlCQUFpQixDQUFDO2dCQUNuQyxRQUFRLEVBQUUsUUFBUTtnQkFDbEIsTUFBTSxFQUFFLFFBQVE7YUFDakIsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNkLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7OztJQUVELDZDQUFjOzs7SUFBZDtRQUNFLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDN0IsQ0FBQzs7Ozs7SUFFRCw4Q0FBZTs7OztJQUFmLFVBQWdCLE9BQU87UUFBdkIsaUJBUUM7UUFQQyxJQUFJLENBQUMsYUFBYSxDQUFDLGlCQUFpQixDQUFDO1lBQ25DLFFBQVEsRUFBRSxJQUFJLENBQUMsU0FBUztZQUN4QixNQUFNLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUM7U0FDcEM7OztRQUFFO1lBQ0QsS0FBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQ3BCLEtBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN6QixDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7Ozs7SUFFRCx1Q0FBUTs7O0lBQVI7UUFDRSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7Ozs7O0lBRU8seUNBQVU7Ozs7SUFBbEI7UUFDRSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztRQUN2QixJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNoQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDcEI7SUFDSCxDQUFDOzs7OztJQUVPLDBDQUFXOzs7O0lBQW5CO1FBQUEsaUJBTUM7UUFMQyxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUN0QixJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVU7Ozs7UUFBQyxVQUFBLE1BQU07WUFDbEMsS0FBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7WUFDckIsS0FBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUNwQyxDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7Ozs7OztJQUVPLCtDQUFnQjs7Ozs7SUFBeEIsVUFBeUIsS0FBYTtRQUNwQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztRQUN4QixJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN2QixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDdEIsQ0FBQzs7Ozs7SUFFTywyQ0FBWTs7OztJQUFwQjtRQUFBLGlCQUVDO1FBREMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsU0FBUzs7OztRQUFFLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLEVBQXBCLENBQW9CLEVBQUMsQ0FBQztJQUNuRSxDQUFDOzs7OztJQUVPLDhDQUFlOzs7O0lBQXZCO1FBQUEsaUJBaUJDO1FBaEJDLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRTs7OztRQUFFLFVBQUEsS0FBSzs7Z0JBQ25CLEdBQUcsR0FBRyxFQUFFO1lBQ2QsS0FBSyxDQUFDLE9BQU87Ozs7WUFBQyxVQUFBLElBQUk7O29CQUNWLEtBQUssR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7Z0JBQ3hDLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRTtvQkFDYixHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDeEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDbEMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQ3pCO3FCQUFNO29CQUNMLEtBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7aUJBQ3BEO1lBQ0gsQ0FBQyxFQUFDLENBQUM7WUFDSCxLQUFJLENBQUMsU0FBUyxHQUFHLEtBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUMzQyxDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7Ozs7Ozs7SUFFTywyQ0FBWTs7Ozs7O0lBQXBCLFVBQXFCLFFBQWdCLEVBQUUsUUFBUTtRQUEvQyxpQkFVQztRQVRDLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDO1lBQzdCLFFBQVEsRUFBRSxDQUFDLENBQUM7WUFDWixRQUFRLEVBQUUsUUFBUTtTQUNuQjs7OztRQUFFLFVBQUMsS0FBSztZQUNQLEtBQUssQ0FBQyxPQUFPOzs7O1lBQUMsVUFBQSxJQUFJO2dCQUNoQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQ3ZFLENBQUMsRUFBQyxDQUFDO1lBQ0gsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2xCLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7O0lBRU8sNENBQWE7Ozs7O0lBQXJCLFVBQXNCLE9BQWM7UUFDbEMsT0FBTyxPQUFPLENBQUMsR0FBRzs7OztRQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUE5QixDQUE4QixFQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7Ozs7O0lBRU8sMENBQVc7Ozs7SUFBbkI7UUFDRSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDOztZQUNyQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUUzQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUV4QixJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1YsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQ25CO2FBQU07WUFDTCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztTQUNsRDtJQUNILENBQUM7Ozs7OztJQUVPLDJDQUFZOzs7OztJQUFwQixVQUFxQixLQUFhO1FBQ2hDLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7SUFDeEQsQ0FBQzs7Z0JBbFBGLFNBQVMsU0FBQztvQkFDVCxrOEtBQXFDOztpQkFLdEM7Ozs7Z0JBZk8sYUFBYTtnQkFNYixhQUFhO2dCQUxFLE1BQU07Z0JBR3JCLGNBQWM7OztvQ0FhbkIsU0FBUyxTQUFDLG1CQUFtQjtpQ0FDN0IsU0FBUyxTQUFDLGdCQUFnQjs7SUEwTzdCLDJCQUFDO0NBQUEsQUFuUEQsSUFtUEM7U0E1T1ksb0JBQW9COzs7SUFDL0IsaURBQXdFOztJQUN4RSw4Q0FBa0U7O0lBRWxFLDBDQUFvQjs7SUFDcEIsc0NBQWlCOztJQUNqQix1Q0FBb0I7O0lBRXBCLDJDQUFxQjs7SUFDckIsdUNBQW9COztJQUNwQix5Q0FBa0I7O0lBQ2xCLDJDQUFvQjs7SUFDcEIsNENBQWtCOztJQUVsQixtREFBeUI7O0lBQ3pCLG9EQUEwQjs7SUFFMUIsd0NBQWtCOztJQUNsQix5Q0FBbUI7O0lBQ25CLHlDQUFtQjs7Ozs7SUFFbkIsdUNBQW1DOzs7OztJQUNuQyx1Q0FBZ0I7O0lBV2hCLDJDQUE0Qjs7Ozs7SUFSMUIsNkNBQW9DOzs7OztJQUNwQyw2Q0FBb0M7Ozs7O0lBQ3BDLHNDQUFzQjs7Ozs7SUFDdEIsNENBQW9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIE9uRGVzdHJveSwgT25Jbml0LCBUZW1wbGF0ZVJlZiwgVmlld0NoaWxkfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7U29jaWFsU2VydmljZX0gZnJvbSBcIi4uLy4uL3NvY2lhbC5zZXJ2aWNlXCI7XG5pbXBvcnQge05hdmlnYXRpb25FbmQsIFJvdXRlcn0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHtHcm91cE1lbWJlckNvbXBvbmVudH0gZnJvbSBcIi4uL2dyb3VwLW1lbWJlci9ncm91cC1tZW1iZXIuY29tcG9uZW50XCI7XG5pbXBvcnQge0dyb3VwQ3JlYXRlQ29tcG9uZW50fSBmcm9tIFwiLi4vZ3JvdXAtY3JlYXRlL2dyb3VwLWNyZWF0ZS5jb21wb25lbnRcIjtcbmltcG9ydCB7QnNNb2RhbFNlcnZpY2V9IGZyb20gJ25neC1ib290c3RyYXAnO1xuaW1wb3J0IHtGcmllbmRUYWJ9IGZyb20gJy4uL0ZyaWVuZFRhYic7XG5pbXBvcnQge0FjY2VudFNlcnZpY2V9IGZyb20gJ2luZXQtY29yZSc7XG5pbXBvcnQge2ZpbHRlcn0gZnJvbSBcInJ4anMvb3BlcmF0b3JzXCI7XG5cbkBDb21wb25lbnQoe1xuICB0ZW1wbGF0ZVVybDogJy4vZ3JvdXAuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFtcbiAgICAnLi4vc3R5bGUuY3NzJyxcbiAgICAnLi9ncm91cC5jb21wb25lbnQuY3NzJ1xuICBdXG59KVxuZXhwb3J0IGNsYXNzIFNvY2lhbEdyb3VwQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIEZyaWVuZFRhYiB7XG4gIEBWaWV3Q2hpbGQoJ21vZGFsQ3JlYXRlTWVtYmVyJykgbW9kYWxDcmVhdGVNZW1iZXI6IEdyb3VwQ3JlYXRlQ29tcG9uZW50O1xuICBAVmlld0NoaWxkKCdtb2RhbEFkZE1lbWJlcicpIG1vZGFsQWRkTWVtYmVyOiBHcm91cE1lbWJlckNvbXBvbmVudDtcblxuICB2aWV3R3JvdXBzOiBib29sZWFuO1xuICBncm91cHM6IHN0cmluZ1tdO1xuICBmcmllbmRzOiBhbnlbXSA9IFtdO1xuXG4gIHZpZXdNZW1iZXJzOiBib29sZWFuO1xuICBtZW1iZXJzOiBhbnlbXSA9IFtdO1xuICBncm91cFZpZXc6IHN0cmluZztcbiAgZ3JvdXBBY3RpdmU6IHN0cmluZztcbiAgbWVtYmVyQWN0aXZlOiBhbnk7XG5cbiAgbW9kYWxHcm91cERlbGV0ZVJlZjogYW55O1xuICBtb2RhbE1lbWJlckRlbGV0ZVJlZjogYW55O1xuXG4gIG5vR3JvdXBzOiBib29sZWFuO1xuICBub0ZyaWVuZHM6IGJvb2xlYW47XG4gIHNlYXJjaGluZzogYm9vbGVhbjtcblxuICBwcml2YXRlIF9wcmVmaXggPSAnL3NvY2lhbC9mcmllbmQnO1xuICBwcml2YXRlIF9yb3V0ZXI7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBzb2NpYWxTZXJ2aWNlOiBTb2NpYWxTZXJ2aWNlLFxuICAgIHByaXZhdGUgYWNjZW50U2VydmljZTogQWNjZW50U2VydmljZSxcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxuICAgIHByaXZhdGUgbW9kYWxTZXJ2aWNlOiBCc01vZGFsU2VydmljZVxuICApIHtcbiAgICB0aGlzLl9sb2FkQWxsRnJpZW5kcygpO1xuICB9XG5cbiAgcGxhY2Vob2xkZXIgPSAnVMOsbSBraeG6v20uLi4nO1xuICBvblNlYXJjaCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5zZWFyY2hpbmcgPSAhIXZhbHVlO1xuICAgIGlmICh2YWx1ZSkge1xuICAgICAgdmFsdWUgPSB0aGlzLmFjY2VudFNlcnZpY2UudmlUb0VuKHZhbHVlKTtcbiAgICAgIGlmICh0aGlzLnZpZXdHcm91cHMpIHtcbiAgICAgICAgdGhpcy5mcmllbmRzLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgaXRlbS5oaWRkZW4gPSBpdGVtLl9pbmRleC5pbmRleE9mKHZhbHVlKSA8IDA7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5tZW1iZXJzLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgaXRlbS5oaWRkZW4gPSBpdGVtLl9pbmRleC5pbmRleE9mKHZhbHVlKSA8IDA7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy52aWV3R3JvdXBzKSB7XG4gICAgICAgIHRoaXMuZnJpZW5kcy5mb3JFYWNoKGl0ZW0gPT4gZGVsZXRlIGl0ZW0uaGlkZGVuKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubWVtYmVycy5mb3JFYWNoKGl0ZW0gPT4gZGVsZXRlIGl0ZW0uaGlkZGVuKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgY2xlYXJTZWFyY2hWYWx1ZSgpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuX3JvdXRlciA9IHRoaXMucm91dGVyLmV2ZW50c1xuICAgICAgLnBpcGUoZmlsdGVyKGV2ZW50ID0+IGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvbkVuZCkpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5fYWN0aW9uVmlldygpO1xuICAgICAgfSk7XG4gICAgdGhpcy5fYWN0aW9uVmlldygpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fcm91dGVyLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBjcmVhdGVHcm91cCgpIHtcbiAgICB0aGlzLm1vZGFsQ3JlYXRlTWVtYmVyLm9wZW4oKTtcbiAgfVxuXG4gIGdyb3VwQ3JlYXRlZCgpIHtcbiAgICB0aGlzLl9sb2FkR3JvdXBzKCk7XG4gICAgdGhpcy5fbG9hZEFsbEZyaWVuZHMoKTtcbiAgfVxuXG4gIHZpZXdHcm91cChncm91cDogc3RyaW5nKSB7XG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW3RoaXMuX3ByZWZpeCArICcvJyArIGdyb3VwXSk7XG4gIH1cblxuICByZW1vdmVHcm91cChncm91cDogc3RyaW5nLCB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55Pikge1xuICAgIHRoaXMuZ3JvdXBBY3RpdmUgPSBncm91cDtcbiAgICB0aGlzLm1vZGFsR3JvdXBEZWxldGVSZWYgPSB0aGlzLm1vZGFsU2VydmljZS5zaG93KHRlbXBsYXRlKTtcbiAgfVxuXG4gIC8vIFRvZG86IGltcHJvdmUgcmVtb3ZlIGdyb3VwXG4gIG9uRGVsZXRlR3JvdXAoKSB7XG4gICAgdGhpcy5tb2RhbEdyb3VwRGVsZXRlUmVmLmhpZGUoKTtcbiAgICB0aGlzLl9sb2FkRnJpZW5kcyh0aGlzLmdyb3VwQWN0aXZlLCAobWVtYmVycykgPT4ge1xuICAgICAgdGhpcy5zb2NpYWxTZXJ2aWNlLmdyb3VwTWVtYmVyRGVsZXRlKHtcbiAgICAgICAgY2F0ZWdvcnk6IHRoaXMuZ3JvdXBBY3RpdmUsXG4gICAgICAgIG1lbWJlcjogdGhpcy5fZ2V0TWVtYmVyU3RyKG1lbWJlcnMpXG4gICAgICB9LCAoKSA9PiB7XG4gICAgICAgIHRoaXMuX2xvYWRHcm91cHMoKTtcbiAgICAgICAgdGhpcy5fbG9hZEFsbEZyaWVuZHMoKTtcbiAgICAgICAgaWYgKCF0aGlzLnZpZXdHcm91cHMpIHtcbiAgICAgICAgICB0aGlzLnRvR3JvdXBzKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHRoaXMuZ3JvdXBzLnNwbGljZSh0aGlzLmdyb3Vwcy5pbmRleE9mKHRoaXMuZ3JvdXBBY3RpdmUpLCAxKTtcbiAgfVxuXG4gIHJlbW92ZUZyaWVuZChmcmllbmQsIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+KSB7XG4gICAgdGhpcy5tb2RhbE1lbWJlckRlbGV0ZVJlZiA9IHRoaXMubW9kYWxTZXJ2aWNlLnNob3codGVtcGxhdGUpO1xuICAgIHRoaXMubWVtYmVyQWN0aXZlID0gZnJpZW5kO1xuICB9XG5cbiAgb25EZWxldGVNZW1iZXIoKSB7XG4gICAgY29uc3QgcHJvbWlzZXMgPSBbXTtcbiAgICBpZiAodGhpcy5tZW1iZXJBY3RpdmUuY2F0ZWdvcmllcykge1xuICAgICAgLy8gTWVtYmVyIG9uIGdyb3Vwc1xuICAgICAgdGhpcy5tZW1iZXJBY3RpdmUuY2F0ZWdvcmllcy5mb3JFYWNoKGNhdGVnb3J5ID0+IHtcbiAgICAgICAgcHJvbWlzZXMucHVzaCh0aGlzLl9kZWxldGVNZW1iZXJQcm9taXNlKHRoaXMubWVtYmVyQWN0aXZlLnVzZXJjb2RlLCBjYXRlZ29yeSkpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHByb21pc2VzLnB1c2godGhpcy5fZGVsZXRlTWVtYmVyUHJvbWlzZSh0aGlzLm1lbWJlckFjdGl2ZS51c2VyY29kZSwgdGhpcy5tZW1iZXJBY3RpdmUuY2F0ZWdvcnkpKTtcbiAgICB9XG5cbiAgICBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbih2YWx1ZXMgPT4ge1xuICAgICAgaWYgKHRoaXMuZ3JvdXBWaWV3KSB7XG4gICAgICAgIHRoaXMuX2xvYWRNZW1iZXJzKCk7XG4gICAgICB9XG4gICAgICB0aGlzLl9sb2FkQWxsRnJpZW5kcygpO1xuICAgIH0pO1xuICAgIHRoaXMubW9kYWxNZW1iZXJEZWxldGVSZWYuaGlkZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZGVsZXRlTWVtYmVyUHJvbWlzZSh1c2VyY29kZSwgY2F0ZWdvcnkpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5zb2NpYWxTZXJ2aWNlLmdyb3VwTWVtYmVyRGVsZXRlKHtcbiAgICAgICAgY2F0ZWdvcnk6IGNhdGVnb3J5LFxuICAgICAgICBtZW1iZXI6IHVzZXJjb2RlXG4gICAgICB9LCByZXNvbHZlKTtcbiAgICB9KTtcbiAgfVxuXG4gIGFkZE1lbWJlckdyb3VwKCkge1xuICAgIHRoaXMubW9kYWxBZGRNZW1iZXIub3BlbigpO1xuICB9XG5cbiAgc2F2ZU1lbWJlckdyb3VwKG1lbWJlcnMpIHtcbiAgICB0aGlzLnNvY2lhbFNlcnZpY2UuZ3JvdXBNZW1iZXJDcmVhdGUoe1xuICAgICAgY2F0ZWdvcnk6IHRoaXMuZ3JvdXBWaWV3LFxuICAgICAgbWVtYmVyOiB0aGlzLl9nZXRNZW1iZXJTdHIobWVtYmVycylcbiAgICB9LCAoKSA9PiB7XG4gICAgICB0aGlzLl9sb2FkTWVtYmVycygpO1xuICAgICAgdGhpcy5fbG9hZEFsbEZyaWVuZHMoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHRvR3JvdXBzKCkge1xuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFt0aGlzLl9wcmVmaXhdKTtcbiAgfVxuXG4gIHByaXZhdGUgX3ZpZXdHcm91cCgpIHtcbiAgICB0aGlzLnZpZXdHcm91cHMgPSB0cnVlO1xuICAgIHRoaXMuZ3JvdXBWaWV3ID0gJyc7XG4gICAgaWYgKCF0aGlzLmdyb3Vwcykge1xuICAgICAgdGhpcy5fbG9hZEdyb3VwcygpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2xvYWRHcm91cHMoKSB7XG4gICAgdGhpcy5ub0dyb3VwcyA9IGZhbHNlO1xuICAgIHRoaXMuc29jaWFsU2VydmljZS5saXN0R3JvdXBzKGdyb3VwcyA9PiB7XG4gICAgICB0aGlzLmdyb3VwcyA9IGdyb3VwcztcbiAgICAgIHRoaXMubm9Hcm91cHMgPSBncm91cHMubGVuZ3RoIDwgMTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX3ZpZXdHcm91cE1lbWJlcihncm91cDogc3RyaW5nKSB7XG4gICAgdGhpcy52aWV3TWVtYmVycyA9IHRydWU7XG4gICAgdGhpcy5tZW1iZXJzID0gW107XG4gICAgdGhpcy5ncm91cFZpZXcgPSBncm91cDtcbiAgICB0aGlzLl9sb2FkTWVtYmVycygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfbG9hZE1lbWJlcnMoKSB7XG4gICAgdGhpcy5fbG9hZEZyaWVuZHModGhpcy5ncm91cFZpZXcsIHVzZXJzID0+IHRoaXMubWVtYmVycyA9IHVzZXJzKTtcbiAgfVxuXG4gIHByaXZhdGUgX2xvYWRBbGxGcmllbmRzKCkge1xuICAgIHRoaXMuZnJpZW5kcyA9IFtdO1xuICAgIHRoaXMubm9GcmllbmRzID0gZmFsc2U7XG4gICAgdGhpcy5fbG9hZEZyaWVuZHMoJycsIHVzZXJzID0+IHtcbiAgICAgIGNvbnN0IHRtcCA9IFtdO1xuICAgICAgdXNlcnMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgY29uc3QgaW5kZXggPSB0bXAuaW5kZXhPZihpdGVtLnVzZXJjb2RlKTtcbiAgICAgICAgaWYgKGluZGV4IDwgMCkge1xuICAgICAgICAgIHRtcC5wdXNoKGl0ZW0udXNlcmNvZGUpO1xuICAgICAgICAgIGl0ZW0uY2F0ZWdvcmllcyA9IFtpdGVtLmNhdGVnb3J5XTtcbiAgICAgICAgICB0aGlzLmZyaWVuZHMucHVzaChpdGVtKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmZyaWVuZHNbaW5kZXhdLmNhdGVnb3JpZXMucHVzaChpdGVtLmNhdGVnb3J5KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICB0aGlzLm5vRnJpZW5kcyA9IHRoaXMuZnJpZW5kcy5sZW5ndGggPCAxO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfbG9hZEZyaWVuZHMoY2F0ZWdvcnk6IHN0cmluZywgY2FsbGJhY2spIHtcbiAgICB0aGlzLnNvY2lhbFNlcnZpY2UubGlzdEZyaWVuZHMoe1xuICAgICAgcGFnZVNpemU6IC0xLFxuICAgICAgY2F0ZWdvcnk6IGNhdGVnb3J5XG4gICAgfSwgKHVzZXJzKSA9PiB7XG4gICAgICB1c2Vycy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICBpdGVtLl9pbmRleCA9IHRoaXMuX2luZGV4U2VhcmNoKGl0ZW0uZnVsbG5hbWUpICsgJyAnICsgaXRlbS51c2VyY29kZTtcbiAgICAgIH0pO1xuICAgICAgY2FsbGJhY2sodXNlcnMpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0TWVtYmVyU3RyKG1lbWJlcnM6IGFueVtdKTogc3RyaW5nIHtcbiAgICByZXR1cm4gbWVtYmVycy5tYXAoaXRlbSA9PiBpdGVtLnVzZXJjb2RlIHx8IGl0ZW0udXNlcm5hbWUpLmpvaW4oJywnKTtcbiAgfVxuXG4gIHByaXZhdGUgX2FjdGlvblZpZXcoKSB7XG4gICAgdGhpcy52aWV3R3JvdXBzID0gdGhpcy52aWV3TWVtYmVycyA9IGZhbHNlO1xuICAgIGNvbnN0IGdyb3VwID0gdGhpcy5yb3V0ZXIudXJsLnNwbGl0KCcvJylbM107XG5cbiAgICB0aGlzLmNsZWFyU2VhcmNoVmFsdWUoKTtcblxuICAgIGlmICghZ3JvdXApIHtcbiAgICAgIHRoaXMuX3ZpZXdHcm91cCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl92aWV3R3JvdXBNZW1iZXIoZGVjb2RlVVJJQ29tcG9uZW50KGdyb3VwKSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfaW5kZXhTZWFyY2godmFsdWU6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLmFjY2VudFNlcnZpY2UudmlUb0VuKHZhbHVlLnRvTG93ZXJDYXNlKCkpO1xuICB9XG59XG4iXX0=