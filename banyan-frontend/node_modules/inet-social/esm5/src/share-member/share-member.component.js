/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, ViewChild, Input } from '@angular/core';
import { SocialService } from '../social.service';
import { Policy, SHARE_COMPANY, SHARE_FRIEND, SHARE_ME, SHARE_PUBLISH } from '../model/Config';
import { AccentService } from 'inet-core';
var ShareMemberComponent = /** @class */ (function () {
    function ShareMemberComponent(socialService, accentService) {
        this.socialService = socialService;
        this.accentService = accentService;
        this.companyMode = true;
        this.companyCategories = [
            SHARE_COMPANY,
            SHARE_ME
        ];
        this.communityCategories = [
            SHARE_PUBLISH,
            SHARE_FRIEND,
            SHARE_ME
        ];
        this.groups = [];
        // All groups, members
        this.contacts = [];
        // Groups, members active
        this.members = [];
        this.friends = [];
        // Search data
        this.searchContacts = [];
        this.selectContacts = [];
        this.showMenu = false;
        this.policies = [];
        this.customActive = false;
        this._matchContacts = [];
        this._params = {
            pageSize: 10,
            pageNumber: 0,
            loading: false
        };
    }
    /**
     * @return {?}
     */
    ShareMemberComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        document.body.appendChild(this.shareModal._element.nativeElement);
        this.onCloseMenu = this.onCloseMenu.bind(this);
        document.addEventListener('click', this.onCloseMenu);
        this.init();
        setTimeout((/**
         * @return {?}
         */
        function () {
            if (_this.activity) {
                _this.setPolicies(_this.activity._policies);
            }
            else {
                _this.setPolicies();
            }
        }), 100);
    };
    /**
     * @return {?}
     */
    ShareMemberComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        document.removeEventListener('click', this.onCloseMenu);
        this._modalShowObserver.unsubscribe();
    };
    /**
     * @return {?}
     */
    ShareMemberComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._modalShowObserver = this.shareModal.onShown.subscribe((/**
         * @return {?}
         */
        function () {
            _this._focusInputMember();
            _this.searchMember();
        }));
    };
    /**
     * @return {?}
     */
    ShareMemberComponent.prototype.init = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.companyMode) {
            this.categories = this.companyCategories;
            // Load all users company
            /** @type {?} */
            var userAdded = [];
            this.socialService.searchMember({ pageSize: -1 }, (/**
             * @param {?} members
             * @return {?}
             */
            function (members) {
                members.forEach((/**
                 * @param {?} member
                 * @return {?}
                 */
                function (member) {
                    /** @type {?} */
                    var user = (/** @type {?} */ (_this._createSocialMember({
                        member: member.username,
                        display: member.fullname,
                        policy: Policy.Individual
                    })));
                    user.username = member.username;
                    _this.contacts.push(user);
                }));
                _this._sortMembers(_this.contacts);
            }));
        }
        else {
            this.categories = this.communityCategories;
            // Load all groups
            this.socialService.listGroups((/**
             * @param {?} groups
             * @return {?}
             */
            function (groups) {
                groups.forEach((/**
                 * @param {?} group
                 * @return {?}
                 */
                function (group) {
                    /** @type {?} */
                    var member = _this._createSocialMember({
                        display: group,
                        member: group,
                        policy: Policy.Friend
                    });
                    member.group = true;
                    _this.groups.push(member);
                    _this.contacts.push(member);
                }));
                _this._sortMembers(_this.groups);
                _this._sortMembers(_this.contacts);
            }));
            // Load all friends
            this.socialService.listFriends({ pageSize: -1 }, (/**
             * @param {?} members
             * @return {?}
             */
            function (members) {
                members.forEach((/**
                 * @param {?} member
                 * @return {?}
                 */
                function (member) {
                    /** @type {?} */
                    var user = _this._createSocialMember({
                        member: member.usercode,
                        display: member.fullname,
                        policy: Policy.Individual
                    });
                    user.username = member.usercode;
                    _this.friends.push(user);
                    _this.contacts.push(user);
                }));
                _this._sortMembers(_this.friends);
                _this._sortMembers(_this.contacts);
            }));
        }
        this.categories.forEach((/**
         * @param {?} category
         * @return {?}
         */
        function (category) { return category._index = _this._indexKeyToSearch(category.display); }));
        this.contacts = this.categories.slice();
    };
    /**
     * @return {?}
     */
    ShareMemberComponent.prototype.setDefault = /**
     * @return {?}
     */
    function () {
        this._resetActive();
        this._resetModal();
        this.closeMenu();
    };
    /**
     * @param {?=} members
     * @return {?}
     */
    ShareMemberComponent.prototype.setPolicies = /**
     * @param {?=} members
     * @return {?}
     */
    function (members) {
        this.setDefault();
        if (!members || members.length < 1) {
            members = [this.categories[0]];
        }
        // Set active category or group
        if (members.length === 1 && (members[0].category || members[0].group)) {
            members[0].active = true;
        }
        else {
            this.customActive = true;
        }
        /** @type {?} */
        var displays = [];
        /** @type {?} */
        var policies = [];
        for (var i = 0; i < members.length; i++) {
            /** @type {?} */
            var member = members[i];
            displays.push(member.display);
            policies = policies.concat(member.value);
        }
        this.policies = policies;
        this.display = displays.join(', ');
        this.displayIcon = members[0].icon;
        this.members = members;
    };
    /**
     * @param {?} params
     * @return {?}
     */
    ShareMemberComponent.prototype.injectPolicies = /**
     * @param {?} params
     * @return {?}
     */
    function (params) {
        if (this.policies.length < 1) {
            params.published = true;
            // params.element = JSON.stringify('[]');
        }
        else {
            params.element = JSON.stringify(this.policies);
        }
        return params;
    };
    /**
     * @param {?} member
     * @return {?}
     */
    ShareMemberComponent.prototype.selectMember = /**
     * @param {?} member
     * @return {?}
     */
    function (member) {
        this.setPolicies([member]);
        this.closeMenu();
    };
    /**
     * @return {?}
     */
    ShareMemberComponent.prototype.onCloseMenu = /**
     * @return {?}
     */
    function () {
        if (!this.isOpening()) {
            this.showMenu = false;
        }
    };
    /**
     * @return {?}
     */
    ShareMemberComponent.prototype.openSelectCustom = /**
     * @return {?}
     */
    function () {
        this.selectContacts = this.members.slice();
        this.shareModal.show();
        this._updateSelectContacts();
    };
    /**
     * @return {?}
     */
    ShareMemberComponent.prototype.closeMenu = /**
     * @return {?}
     */
    function () {
        this.showMenu = false;
    };
    /**
     * @return {?}
     */
    ShareMemberComponent.prototype.openMenu = /**
     * @return {?}
     */
    function () {
        this.showMenu = true;
    };
    /**
     * @return {?}
     */
    ShareMemberComponent.prototype.searchMember = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var value = this._indexKeyToSearch(this._getSearchKeyword());
        if (value) {
            this._matchContacts = this.contacts.filter((/**
             * @param {?} member
             * @return {?}
             */
            function (member) {
                return member._index.indexOf(value) > -1 ||
                    (typeof member.id === 'string' && member.id.indexOf(value) > -1);
            }));
        }
        else {
            this._matchContacts = this.contacts;
        }
        this._loadContacts(true);
    };
    /**
     * @param {?} member
     * @return {?}
     */
    ShareMemberComponent.prototype.addMember = /**
     * @param {?} member
     * @return {?}
     */
    function (member) {
        member.selected = !member.selected;
        if (member.selected) {
            if (!this.hasSelectedMember(member)) {
                this.selectContacts.push(member);
            }
        }
        else {
            this.removeMember(member);
        }
    };
    /**
     * @param {?} member
     * @return {?}
     */
    ShareMemberComponent.prototype.removeMember = /**
     * @param {?} member
     * @return {?}
     */
    function (member) {
        /** @type {?} */
        var index = this.getIndexMemberSelected(member);
        if (index > -1) {
            member.selected = false;
            this.selectContacts.splice(index, 1);
        }
    };
    /**
     * @param {?} member
     * @return {?}
     */
    ShareMemberComponent.prototype.hasSelectedMember = /**
     * @param {?} member
     * @return {?}
     */
    function (member) {
        return this.getIndexMemberSelected(member) > -1;
    };
    /**
     * @param {?} member
     * @return {?}
     */
    ShareMemberComponent.prototype.getIndexMemberSelected = /**
     * @param {?} member
     * @return {?}
     */
    function (member) {
        for (var i = 0; i < this.selectContacts.length; i++) {
            if (this.selectContacts[i].id === member.id) {
                return i;
            }
        }
        return -1;
    };
    /**
     * @return {?}
     */
    ShareMemberComponent.prototype.isOpening = /**
     * @return {?}
     */
    function () {
        return this.shareModal.isShown;
    };
    /**
     * @param {?} e
     * @return {?}
     */
    ShareMemberComponent.prototype.cancelChanges = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        e.stopPropagation();
        this.shareModal.hide();
    };
    /**
     * @param {?} e
     * @return {?}
     */
    ShareMemberComponent.prototype.saveChanges = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        e.stopPropagation();
        this.setPolicies(this.selectContacts);
        this.shareModal.hide();
        this.closeMenu();
    };
    /**
     * @param {?} e
     * @return {?}
     */
    ShareMemberComponent.prototype.onScrollContact = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        /** @type {?} */
        var node = e.target;
        if (!this._params.loading && node.scrollHeight - (node.scrollTop + node.clientHeight) <= 40) {
            this._loadContacts();
        }
    };
    /**
     * @private
     * @return {?}
     */
    ShareMemberComponent.prototype._scrollTopModal = /**
     * @private
     * @return {?}
     */
    function () {
        this.contactList.nativeElement.scrollTop = 0;
    };
    /**
     * @private
     * @return {?}
     */
    ShareMemberComponent.prototype._updateSelectContacts = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.contacts.forEach((/**
         * @param {?} member
         * @return {?}
         */
        function (member) { return member.selected = _this.hasSelectedMember(member); }));
    };
    /**
     * @private
     * @return {?}
     */
    ShareMemberComponent.prototype._resetActive = /**
     * @private
     * @return {?}
     */
    function () {
        this.categories.forEach((/**
         * @param {?} cat
         * @return {?}
         */
        function (cat) { return cat.active = false; }));
        this.groups.forEach((/**
         * @param {?} group
         * @return {?}
         */
        function (group) { return group.active = false; }));
        this.customActive = false;
    };
    /**
     * @private
     * @return {?}
     */
    ShareMemberComponent.prototype._resetModal = /**
     * @private
     * @return {?}
     */
    function () {
        this._params.loading = false;
        this._params.pageNumber = 0;
        this._matchContacts = [];
        this.selectContacts = [];
        this.searchContacts = [];
        this._setSearchKeyword('');
    };
    /**
     * @private
     * @param {?=} init
     * @return {?}
     */
    ShareMemberComponent.prototype._loadContacts = /**
     * @private
     * @param {?=} init
     * @return {?}
     */
    function (init) {
        this._params.loading = true;
        if (init) {
            this._scrollTopModal();
            this._params.pageNumber = 0;
            this.searchContacts = [];
        }
        this.searchContacts = this.searchContacts.concat(this._matchContacts.slice(this._params.pageNumber * this._params.pageSize, (this._params.pageNumber + 1) * this._params.pageSize));
        this._params.pageNumber += 1;
        this._params.loading = !this._hasContacts();
    };
    /**
     * @private
     * @return {?}
     */
    ShareMemberComponent.prototype._hasContacts = /**
     * @private
     * @return {?}
     */
    function () {
        return this._matchContacts.length > this._params.pageNumber * this._params.pageSize;
    };
    /**
     * @private
     * @param {?} members
     * @return {?}
     */
    ShareMemberComponent.prototype._sortMembers = /**
     * @private
     * @param {?} members
     * @return {?}
     */
    function (members) {
        members.sort((/**
         * @param {?} a
         * @param {?} b
         * @return {?}
         */
        function (a, b) { return a.display.localeCompare(b.display); }));
    };
    /**
     * @private
     * @param {?} str
     * @return {?}
     */
    ShareMemberComponent.prototype._indexKeyToSearch = /**
     * @private
     * @param {?} str
     * @return {?}
     */
    function (str) {
        return this.accentService.viToEn(str).toLowerCase();
    };
    /**
     * @private
     * @param {?} policyItem
     * @return {?}
     */
    ShareMemberComponent.prototype._createSocialMember = /**
     * @private
     * @param {?} policyItem
     * @return {?}
     */
    function (policyItem) {
        return {
            id: policyItem.member,
            display: policyItem.display,
            icon: this.socialService.getIconByType(policyItem.policy),
            value: [policyItem],
            _index: this._indexKeyToSearch(policyItem.display)
        };
    };
    /**
     * @private
     * @return {?}
     */
    ShareMemberComponent.prototype._focusInputMember = /**
     * @private
     * @return {?}
     */
    function () {
        this.inputMember.nativeElement.focus();
    };
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    ShareMemberComponent.prototype._setSearchKeyword = /**
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.inputMember.nativeElement.value = value;
    };
    /**
     * @private
     * @return {?}
     */
    ShareMemberComponent.prototype._getSearchKeyword = /**
     * @private
     * @return {?}
     */
    function () {
        return this.inputMember.nativeElement.value;
    };
    ShareMemberComponent.decorators = [
        { type: Component, args: [{
                    selector: '[socialShareMember]',
                    template: "<div class=\"group-share\">\n    <button (click)=\"$event.stopPropagation(); showMenu = !showMenu\" class=\"share-button btn btn-light active btn-sm\" tabindex=\"-1\" [title]=\"display\">\n        <div class=\"share-button_contain\">\n            <div class=\"share-button__padding\">\n                <i class=\"fa\" [ngClass]=\"displayIcon\"></i>\n            </div>\n            <div class=\"share-button__content\">\n                <div>{{display}}</div>\n            </div>\n            <div>\n                <i class=\"fa fa-caret-down\"></i>\n            </div>\n        </div>\n    </button>\n    <ul (click)=\"$event.stopPropagation()\" class=\"dropdown-menu share-menu\" [ngClass]=\"{'show': showMenu}\">\n        <li class=\"dropdown-header\">\n            Ai s\u1EBD nh\u00ECn th\u1EA5y n\u1ED9i dung n\u00E0y?\n        </li>\n\n        <li class=\"dropdown-item\" *ngFor=\"let category of categories\" (click)=\"selectMember(category)\">\n            <i class=\"fa {{category.icon}} group-share-icon\"></i> {{ category.display }}\n            <i [hidden]=\"!category.active\" class=\"fa fa-check category-check\"></i>\n        </li>\n\n        <li class=\"dropdown-item\" (click)=\"openSelectCustom()\">\n            <i class=\"fa fa-cog group-share-icon\"></i> T\u00F9y ch\u1ECDn...\n            <div *ngIf=\"customActive\">\n                <div class=\"custom-display\">{{display}}</div>\n                <i class=\"fa fa-check category-check\"></i>\n            </div>\n        </li>\n\n        <div *ngIf=\"groups.length\" class=\"seperate\"></div>\n        <li *ngFor=\"let group of groups\" class=\"dropdown-item\" (click)=\"selectMember(group)\">\n            <i class=\"fa group-share-icon\" [ngClass]=\"group.icon\"></i> {{group.display}}\n            <i [hidden]=\"!group.active\" class=\"fa fa-check category-check\"></i>\n        </li>\n    </ul>\n</div>\n\n<div class=\"modal fade\" bsModal #shareModal=\"bs-modal\" tabindex=\"-1\" role=\"dialog\">\n  <div class=\"modal-dialog\">\n    <div class=\"modal-content\">\n        <div class=\"modal-header\">\n            <h5 class=\"modal-title pull-left\">Chia s\u1EBB</h5>\n            <button type=\"button\" class=\"btn btn-primary btn-sm pull-right\" (click)=\"saveChanges($event)\" tabindex=\"-1\">\n                Xong\n            </button>\n        </div>\n        <div class=\"modal-body\">\n            <div class=\"auto-tag form-control contact-search\">\n                <div *ngFor=\"let member of selectContacts\" class=\"auto-tag-item\">\n                    <span>{{member.display}}</span>\n                    <i class=\"fa fa-times\" (click)=\"removeMember(member)\"></i>\n                </div>\n                <input #searchInput (keyup)=\"searchMember()\" type=\"text\" class=\"auto-tag-input\" placeholder=\"T\u00ECm ki\u1EBFm b\u1EA1n b\u00E8...\">\n            </div>\n\n            <div #contactList (scroll)=\"onScrollContact($event)\" class=\"contact-list\">\n                <div class=\"list-item list-avatar\" *ngFor=\"let member of searchContacts\" (click)=\"addMember(member)\">\n                    <img *ngIf=\"member.username; else icon\" userAvatar [usercode]=\"member.username\" class=\"list-item__image\">\n                    <ng-template #icon>\n                        <i class=\"list-item__icon fa\" [ngClass]=\"member.icon\"></i>\n                    </ng-template>\n                    <div class=\"list-item__content\">{{member.display}}</div>\n                    <label class=\"checkbox-container\">\n                        <input type=\"checkbox\" [checked]=\"member.selected\" disabled>\n                        <span class=\"checkmark\"></span>\n                    </label>\n                </div>\n            </div>\n        </div>\n    </div>\n  </div>\n</div>\n",
                    styles: [".auto-tag{display:flex;flex-wrap:wrap;height:auto;padding-bottom:0}.auto-tag .auto-tag-item{display:flex;align-items:center;border-radius:4px;background:#eee;padding:0 10px;white-space:nowrap;margin:0 5px 5px 0}.auto-tag .auto-tag-item i{cursor:pointer;padding:5px;margin-right:-5px}.auto-tag .auto-tag-input{border:0;outline:0}.checkbox-container{display:block;position:relative;cursor:pointer;font-size:22px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;min-width:20px;min-height:20px;margin:0}.checkbox-container input{position:absolute;opacity:0;cursor:pointer}.checkbox-container .checkmark{position:absolute;top:0;left:0;height:20px;width:20px;background-color:#eee;border-radius:4px}.checkbox-container .checkmark:after{content:\"\";position:absolute;display:none;left:8px;top:4px;width:5px;height:10px;border:solid #fff;border-width:0 3px 3px 0;transform:rotate(45deg)}.checkbox-container:hover .checkmark{background-color:#ccc}.checkbox-container input:checked+.checkmark{background-color:#2196f3}.checkbox-container input:checked+.checkmark:after{display:block}.list-avatar{padding:5px 10px;overflow:hidden;cursor:pointer;margin-bottom:5px;display:flex;align-items:center}.list-item__icon,.list-item__image{width:32px;height:32px;border-radius:50%}.list-item__icon{line-height:32px;text-align:center;background:rgba(0,0,0,.05);color:rgba(0,0,0,.5)}.list-item__content{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding:0 15px;line-height:32px;flex-grow:1}", ".share-menu{max-height:300px;max-width:300px;overflow:auto}.seperate{margin:5px 20px;border-top:1px solid #eee}.group-share{position:relative;display:inline-block}.group-share-icon{width:22px}.dropdown-header,.dropdown-item{position:relative;font-size:14px;cursor:pointer;padding-left:32px}.category-check{position:absolute;left:8px;top:7px}.share-button{max-width:300px}.share-button_contain{display:flex}.share-button__content,.share-button__padding{padding-right:5px}.share-button__content{overflow:hidden}.share-button__content div{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.custom-display{font-size:13px;color:rgba(0,0,0,.6);line-height:15px;white-space:normal}.contact-list{height:300px;overflow:auto;margin-top:10px}@media (max-width:480px){.share-button{max-width:220px}.contact-search{max-height:140px;overflow:auto}.contact-list{height:200px}}"]
                }] }
    ];
    /** @nocollapse */
    ShareMemberComponent.ctorParameters = function () { return [
        { type: SocialService },
        { type: AccentService }
    ]; };
    ShareMemberComponent.propDecorators = {
        shareModal: [{ type: ViewChild, args: ['shareModal',] }],
        inputMember: [{ type: ViewChild, args: ['searchInput',] }],
        contactList: [{ type: ViewChild, args: ['contactList',] }],
        companyMode: [{ type: Input }],
        activity: [{ type: Input }]
    };
    return ShareMemberComponent;
}());
export { ShareMemberComponent };
if (false) {
    /** @type {?} */
    ShareMemberComponent.prototype.shareModal;
    /** @type {?} */
    ShareMemberComponent.prototype.inputMember;
    /** @type {?} */
    ShareMemberComponent.prototype.contactList;
    /** @type {?} */
    ShareMemberComponent.prototype.companyMode;
    /** @type {?} */
    ShareMemberComponent.prototype.activity;
    /** @type {?} */
    ShareMemberComponent.prototype.categories;
    /** @type {?} */
    ShareMemberComponent.prototype.companyCategories;
    /** @type {?} */
    ShareMemberComponent.prototype.communityCategories;
    /** @type {?} */
    ShareMemberComponent.prototype.groups;
    /** @type {?} */
    ShareMemberComponent.prototype.contacts;
    /** @type {?} */
    ShareMemberComponent.prototype.members;
    /** @type {?} */
    ShareMemberComponent.prototype.friends;
    /** @type {?} */
    ShareMemberComponent.prototype.searchContacts;
    /** @type {?} */
    ShareMemberComponent.prototype.selectContacts;
    /** @type {?} */
    ShareMemberComponent.prototype.showMenu;
    /** @type {?} */
    ShareMemberComponent.prototype.displayIcon;
    /** @type {?} */
    ShareMemberComponent.prototype.display;
    /** @type {?} */
    ShareMemberComponent.prototype.policies;
    /** @type {?} */
    ShareMemberComponent.prototype.customActive;
    /**
     * @type {?}
     * @private
     */
    ShareMemberComponent.prototype._matchContacts;
    /**
     * @type {?}
     * @private
     */
    ShareMemberComponent.prototype._params;
    /**
     * @type {?}
     * @private
     */
    ShareMemberComponent.prototype._modalShowObserver;
    /**
     * @type {?}
     * @private
     */
    ShareMemberComponent.prototype.socialService;
    /**
     * @type {?}
     * @private
     */
    ShareMemberComponent.prototype.accentService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmUtbWVtYmVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtc29jaWFsLyIsInNvdXJjZXMiOlsic3JjL3NoYXJlLW1lbWJlci9zaGFyZS1tZW1iZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0gsU0FBUyxFQUNULFVBQVUsRUFDVixTQUFTLEVBSVQsS0FBSyxFQUNSLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUNoRCxPQUFPLEVBQ0gsTUFBTSxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUM3QyxhQUFhLEVBQ2hCLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLFdBQVcsQ0FBQztBQUl4QztJQTJESSw4QkFDWSxhQUE0QixFQUM1QixhQUE0QjtRQUQ1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQWhEL0IsZ0JBQVcsR0FBWSxJQUFJLENBQUM7UUFLckMsc0JBQWlCLEdBQW1CO1lBQ2hDLGFBQWE7WUFDYixRQUFRO1NBQ1gsQ0FBQztRQUVGLHdCQUFtQixHQUFtQjtZQUNsQyxhQUFhO1lBQ2IsWUFBWTtZQUNaLFFBQVE7U0FDWCxDQUFDO1FBRUYsV0FBTSxHQUFtQixFQUFFLENBQUM7O1FBRzVCLGFBQVEsR0FBbUIsRUFBRSxDQUFDOztRQUc5QixZQUFPLEdBQW1CLEVBQUUsQ0FBQztRQUU3QixZQUFPLEdBQW1CLEVBQUUsQ0FBQzs7UUFHN0IsbUJBQWMsR0FBbUIsRUFBRSxDQUFDO1FBQ3BDLG1CQUFjLEdBQW1CLEVBQUUsQ0FBQztRQUVwQyxhQUFRLEdBQVksS0FBSyxDQUFDO1FBSTFCLGFBQVEsR0FBYSxFQUFFLENBQUM7UUFFeEIsaUJBQVksR0FBWSxLQUFLLENBQUM7UUFFdEIsbUJBQWMsR0FBbUIsRUFBRSxD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V0FBVyxDQUFDLGFBQWEsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ2pELENBQUM7Ozs7O0lBRU8sZ0RBQWlCOzs7O0lBQXpCO1FBQ0ksT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUM7SUFDaEQsQ0FBQzs7Z0JBL1dKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUscUJBQXFCO29CQUMvQiwrdEhBQTRDOztpQkFLL0M7Ozs7Z0JBaEJPLGFBQWE7Z0JBS2IsYUFBYTs7OzZCQWFoQixTQUFTLFNBQUMsWUFBWTs4QkFDdEIsU0FBUyxTQUFDLGFBQWE7OEJBQ3ZCLFNBQVMsU0FBQyxhQUFhOzhCQUV2QixLQUFLOzJCQUNMLEtBQUs7O0lBa1dWLDJCQUFDO0NBQUEsQUFoWEQsSUFnWEM7U0F4V1ksb0JBQW9COzs7SUFDN0IsMENBQW9DOztJQUNwQywyQ0FBa0Q7O0lBQ2xELDJDQUFrRDs7SUFFbEQsMkNBQXFDOztJQUNyQyx3Q0FBa0Q7O0lBRWxELDBDQUEyQjs7SUFFM0IsaURBR0U7O0lBRUYsbURBSUU7O0lBRUYsc0NBQTRCOztJQUc1Qix3Q0FBOEI7O0lBRzlCLHVDQUE2Qjs7SUFFN0IsdUNBQTZCOztJQUc3Qiw4Q0FBb0M7O0lBQ3BDLDhDQUFvQzs7SUFFcEMsd0NBQTBCOztJQUUxQiwyQ0FBb0I7O0lBQ3BCLHVDQUFnQjs7SUFDaEIsd0NBQXdCOztJQUV4Qiw0Q0FBOEI7Ozs7O0lBRTlCLDhDQUE0Qzs7Ozs7SUFDNUMsdUNBSUU7Ozs7O0lBQ0Ysa0RBQTJCOzs7OztJQUd2Qiw2Q0FBb0M7Ozs7O0lBQ3BDLDZDQUFvQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQ29tcG9uZW50LFxuICAgIEVsZW1lbnRSZWYsXG4gICAgVmlld0NoaWxkLFxuICAgIEFmdGVyVmlld0luaXQsXG4gICAgT25EZXN0cm95LFxuICAgIE9uSW5pdCxcbiAgICBJbnB1dFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7U29jaWFsU2VydmljZX0gZnJvbSAnLi4vc29jaWFsLnNlcnZpY2UnO1xuaW1wb3J0IHtcbiAgICBQb2xpY3ksIFNIQVJFX0NPTVBBTlksIFNIQVJFX0ZSSUVORCwgU0hBUkVfTUUsXG4gICAgU0hBUkVfUFVCTElTSCwgU29jaWFsTWVtYmVyXG59IGZyb20gJy4uL21vZGVsL0NvbmZpZyc7XG5pbXBvcnQge0FjY2VudFNlcnZpY2V9IGZyb20gJ2luZXQtY29yZSc7XG5pbXBvcnQge1NvY2lhbEFjdGl2aXR5fSBmcm9tIFwiLi4vbW9kZWwvQWN0aXZpdHlcIjtcbmltcG9ydCB7U29jaWFsQ29tbWVudH0gZnJvbSBcIi4uL21vZGVsL0NvbW1lbnRcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdbc29jaWFsU2hhcmVNZW1iZXJdJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vc2hhcmUtbWVtYmVyLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFtcbiAgICAgICAgJy4uL3N0eWxlcy91c2VyLXN0eWxlcy5jc3MnLFxuICAgICAgICAnLi9zaGFyZS1tZW1iZXIuY29tcG9uZW50LmNzcydcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIFNoYXJlTWVtYmVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIEFmdGVyVmlld0luaXQge1xuICAgIEBWaWV3Q2hpbGQoJ3NoYXJlTW9kYWwnKSBzaGFyZU1vZGFsO1xuICAgIEBWaWV3Q2hpbGQoJ3NlYXJjaElucHV0JykgaW5wdXRNZW1iZXI6IEVsZW1lbnRSZWY7XG4gICAgQFZpZXdDaGlsZCgnY29udGFjdExpc3QnKSBjb250YWN0TGlzdDogRWxlbWVudFJlZjtcblxuICAgIEBJbnB1dCgpIGNvbXBhbnlNb2RlOiBib29sZWFuID0gdHJ1ZTtcbiAgICBASW5wdXQoKSBhY3Rpdml0eTogU29jaWFsQWN0aXZpdHkgfCBTb2NpYWxDb21tZW50O1xuXG4gICAgY2F0ZWdvcmllczogU29jaWFsTWVtYmVyW107XG5cbiAgICBjb21wYW55Q2F0ZWdvcmllczogU29jaWFsTWVtYmVyW10gPSBbXG4gICAgICAgIFNIQVJFX0NPTVBBTlksXG4gICAgICAgIFNIQVJFX01FXG4gICAgXTtcblxuICAgIGNvbW11bml0eUNhdGVnb3JpZXM6IFNvY2lhbE1lbWJlcltdID0gW1xuICAgICAgICBTSEFSRV9QVUJMSVNILFxuICAgICAgICBTSEFSRV9GUklFTkQsXG4gICAgICAgIFNIQVJFX01FXG4gICAgXTtcblxuICAgIGdyb3VwczogU29jaWFsTWVtYmVyW10gPSBbXTtcblxuICAgIC8vIEFsbCBncm91cHMsIG1lbWJlcnNcbiAgICBjb250YWN0czogU29jaWFsTWVtYmVyW10gPSBbXTtcblxuICAgIC8vIEdyb3VwcywgbWVtYmVycyBhY3RpdmVcbiAgICBtZW1iZXJzOiBTb2NpYWxNZW1iZXJbXSA9IFtdO1xuXG4gICAgZnJpZW5kczogU29jaWFsTWVtYmVyW10gPSBbXTtcblxuICAgIC8vIFNlYXJjaCBkYXRhXG4gICAgc2VhcmNoQ29udGFjdHM6IFNvY2lhbE1lbWJlcltdID0gW107XG4gICAgc2VsZWN0Q29udGFjdHM6IFNvY2lhbE1lbWJlcltdID0gW107XG5cbiAgICBzaG93TWVudTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgZGlzcGxheUljb246IHN0cmluZztcbiAgICBkaXNwbGF5OiBzdHJpbmc7XG4gICAgcG9saWNpZXM6IFBvbGljeVtdID0gW107XG5cbiAgICBjdXN0b21BY3RpdmU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHByaXZhdGUgX21hdGNoQ29udGFjdHM6IFNvY2lhbE1lbWJlcltdID0gW107XG4gICAgcHJpdmF0ZSBfcGFyYW1zID0ge1xuICAgICAgICBwYWdlU2l6ZTogMTAsXG4gICAgICAgIHBhZ2VOdW1iZXI6IDAsXG4gICAgICAgIGxvYWRpbmc6IGZhbHNlXG4gICAgfTtcbiAgICBwcml2YXRlIF9tb2RhbFNob3dPYnNlcnZlcjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIHNvY2lhbFNlcnZpY2U6IFNvY2lhbFNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgYWNjZW50U2VydmljZTogQWNjZW50U2VydmljZVxuICAgICkgeyB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLnNoYXJlTW9kYWwuX2VsZW1lbnQubmF0aXZlRWxlbWVudCk7XG5cbiAgICAgICAgdGhpcy5vbkNsb3NlTWVudSA9IHRoaXMub25DbG9zZU1lbnUuYmluZCh0aGlzKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uQ2xvc2VNZW51KTtcblxuICAgICAgICB0aGlzLmluaXQoKTtcblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmFjdGl2aXR5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRQb2xpY2llcyh0aGlzLmFjdGl2aXR5Ll9wb2xpY2llcyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0UG9saWNpZXMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgMTAwKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uQ2xvc2VNZW51KTtcbiAgICAgICAgdGhpcy5fbW9kYWxTaG93T2JzZXJ2ZXIudW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIHRoaXMuX21vZGFsU2hvd09ic2VydmVyID0gdGhpcy5zaGFyZU1vZGFsLm9uU2hvd24uc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX2ZvY3VzSW5wdXRNZW1iZXIoKTtcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoTWVtYmVyKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGluaXQoKSB7XG5cbiAgICAgICAgaWYgKHRoaXMuY29tcGFueU1vZGUpIHtcbiAgICAgICAgICAgIHRoaXMuY2F0ZWdvcmllcyA9IHRoaXMuY29tcGFueUNhdGVnb3JpZXM7XG5cbiAgICAgICAgICAgIC8vIExvYWQgYWxsIHVzZXJzIGNvbXBhbnlcbiAgICAgICAgICAgIGxldCB1c2VyQWRkZWQgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuc29jaWFsU2VydmljZS5zZWFyY2hNZW1iZXIoe3BhZ2VTaXplOiAtMX0sIChtZW1iZXJzKSA9PiB7XG4gICAgICAgICAgICAgICAgbWVtYmVycy5mb3JFYWNoKG1lbWJlciA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCB1c2VyID0gPFNvY2lhbE1lbWJlcj50aGlzLl9jcmVhdGVTb2NpYWxNZW1iZXIoe1xuICAgICAgICAgICAgICAgICAgICAgICAgbWVtYmVyOiBtZW1iZXIudXNlcm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBtZW1iZXIuZnVsbG5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBwb2xpY3k6IFBvbGljeS5JbmRpdmlkdWFsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB1c2VyLnVzZXJuYW1lID0gbWVtYmVyLnVzZXJuYW1lO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRhY3RzLnB1c2godXNlcik7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9zb3J0TWVtYmVycyh0aGlzLmNvbnRhY3RzKTtcblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY2F0ZWdvcmllcyA9IHRoaXMuY29tbXVuaXR5Q2F0ZWdvcmllcztcblxuICAgICAgICAgICAgLy8gTG9hZCBhbGwgZ3JvdXBzXG4gICAgICAgICAgICB0aGlzLnNvY2lhbFNlcnZpY2UubGlzdEdyb3VwcygoZ3JvdXBzKSA9PiB7XG4gICAgICAgICAgICAgICAgZ3JvdXBzLmZvckVhY2goZ3JvdXAgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgbWVtYmVyID0gdGhpcy5fY3JlYXRlU29jaWFsTWVtYmVyKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IGdyb3VwLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVtYmVyOiBncm91cCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvbGljeTogUG9saWN5LkZyaWVuZFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgbWVtYmVyLmdyb3VwID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ncm91cHMucHVzaChtZW1iZXIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRhY3RzLnB1c2gobWVtYmVyKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHRoaXMuX3NvcnRNZW1iZXJzKHRoaXMuZ3JvdXBzKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9zb3J0TWVtYmVycyh0aGlzLmNvbnRhY3RzKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBMb2FkIGFsbCBmcmllbmRzXG4gICAgICAgICAgICB0aGlzLnNvY2lhbFNlcnZpY2UubGlzdEZyaWVuZHMoe3BhZ2VTaXplOiAtMX0sIChtZW1iZXJzKSA9PiB7XG4gICAgICAgICAgICAgICAgbWVtYmVycy5mb3JFYWNoKG1lbWJlciA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCB1c2VyID0gdGhpcy5fY3JlYXRlU29jaWFsTWVtYmVyKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lbWJlcjogbWVtYmVyLnVzZXJjb2RlLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogbWVtYmVyLmZ1bGxuYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9saWN5OiBQb2xpY3kuSW5kaXZpZHVhbFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgdXNlci51c2VybmFtZSA9IG1lbWJlci51c2VyY29kZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mcmllbmRzLnB1c2godXNlcik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGFjdHMucHVzaCh1c2VyKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHRoaXMuX3NvcnRNZW1iZXJzKHRoaXMuZnJpZW5kcyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fc29ydE1lbWJlcnModGhpcy5jb250YWN0cyk7XG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jYXRlZ29yaWVzLmZvckVhY2goY2F0ZWdvcnkgPT4gY2F0ZWdvcnkuX2luZGV4ID0gdGhpcy5faW5kZXhLZXlUb1NlYXJjaChjYXRlZ29yeS5kaXNwbGF5KSk7XG4gICAgICAgIHRoaXMuY29udGFjdHMgPSB0aGlzLmNhdGVnb3JpZXMuc2xpY2UoKTtcblxuICAgIH1cblxuICAgIHNldERlZmF1bHQoKSB7XG4gICAgICAgIHRoaXMuX3Jlc2V0QWN0aXZlKCk7XG4gICAgICAgIHRoaXMuX3Jlc2V0TW9kYWwoKTtcbiAgICAgICAgdGhpcy5jbG9zZU1lbnUoKTtcbiAgICB9XG5cbiAgICBzZXRQb2xpY2llcyhtZW1iZXJzPzogU29jaWFsTWVtYmVyW10pIHtcblxuICAgICAgICB0aGlzLnNldERlZmF1bHQoKTtcblxuICAgICAgICBpZiAoIW1lbWJlcnMgfHwgbWVtYmVycy5sZW5ndGggPCAxKSB7XG4gICAgICAgICAgICBtZW1iZXJzID0gW3RoaXMuY2F0ZWdvcmllc1swXV07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTZXQgYWN0aXZlIGNhdGVnb3J5IG9yIGdyb3VwXG4gICAgICAgIGlmIChtZW1iZXJzLmxlbmd0aCA9PT0gMSAmJiAobWVtYmVyc1swXS5jYXRlZ29yeSB8fCBtZW1iZXJzWzBdLmdyb3VwKSkge1xuICAgICAgICAgICAgbWVtYmVyc1swXS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jdXN0b21BY3RpdmUgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGRpc3BsYXlzID0gW10sIHBvbGljaWVzID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWVtYmVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IG1lbWJlciA9IG1lbWJlcnNbaV07XG4gICAgICAgICAgICBkaXNwbGF5cy5wdXNoKG1lbWJlci5kaXNwbGF5KTtcbiAgICAgICAgICAgIHBvbGljaWVzID0gcG9saWNpZXMuY29uY2F0KG1lbWJlci52YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnBvbGljaWVzID0gcG9saWNpZXM7XG4gICAgICAgIHRoaXMuZGlzcGxheSA9IGRpc3BsYXlzLmpvaW4oJywgJyk7XG4gICAgICAgIHRoaXMuZGlzcGxheUljb24gPSBtZW1iZXJzWzBdLmljb247XG4gICAgICAgIHRoaXMubWVtYmVycyA9IG1lbWJlcnM7XG5cbiAgICB9XG5cbiAgICBpbmplY3RQb2xpY2llcyhwYXJhbXM6IGFueSkge1xuICAgICAgICBpZiAodGhpcy5wb2xpY2llcy5sZW5ndGggPCAxKSB7XG4gICAgICAgICAgICBwYXJhbXMucHVibGlzaGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIC8vIHBhcmFtcy5lbGVtZW50ID0gSlNPTi5zdHJpbmdpZnkoJ1tdJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwYXJhbXMuZWxlbWVudCA9IEpTT04uc3RyaW5naWZ5KHRoaXMucG9saWNpZXMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwYXJhbXM7XG4gICAgfVxuXG4gICAgc2VsZWN0TWVtYmVyKG1lbWJlcjogU29jaWFsTWVtYmVyKSB7XG4gICAgICAgIHRoaXMuc2V0UG9saWNpZXMoW21lbWJlcl0pO1xuICAgICAgICB0aGlzLmNsb3NlTWVudSgpO1xuICAgIH1cblxuICAgIG9uQ2xvc2VNZW51KCkge1xuICAgICAgICBpZiAoIXRoaXMuaXNPcGVuaW5nKCkpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd01lbnUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9wZW5TZWxlY3RDdXN0b20oKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0Q29udGFjdHMgPSB0aGlzLm1lbWJlcnMuc2xpY2UoKTtcbiAgICAgICAgdGhpcy5zaGFyZU1vZGFsLnNob3coKTtcbiAgICAgICAgdGhpcy5fdXBkYXRlU2VsZWN0Q29udGFjdHMoKTtcbiAgICB9XG5cbiAgICBjbG9zZU1lbnUoKSB7XG4gICAgICAgIHRoaXMuc2hvd01lbnUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBvcGVuTWVudSgpIHtcbiAgICAgICAgdGhpcy5zaG93TWVudSA9IHRydWU7XG4gICAgfVxuXG4gICAgc2VhcmNoTWVtYmVyKCkge1xuICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLl9pbmRleEtleVRvU2VhcmNoKHRoaXMuX2dldFNlYXJjaEtleXdvcmQoKSk7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fbWF0Y2hDb250YWN0cyA9IHRoaXMuY29udGFjdHMuZmlsdGVyKG1lbWJlciA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1lbWJlci5faW5kZXguaW5kZXhPZih2YWx1ZSkgPiAtMSB8fFxuICAgICAgICAgICAgICAgICAgICAodHlwZW9mIG1lbWJlci5pZCA9PT0gJ3N0cmluZycgJiYgbWVtYmVyLmlkLmluZGV4T2YodmFsdWUpID4gLTEpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9tYXRjaENvbnRhY3RzID0gdGhpcy5jb250YWN0cztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9sb2FkQ29udGFjdHModHJ1ZSk7XG4gICAgfVxuXG4gICAgYWRkTWVtYmVyKG1lbWJlcjogU29jaWFsTWVtYmVyKSB7XG4gICAgICAgIG1lbWJlci5zZWxlY3RlZCA9ICFtZW1iZXIuc2VsZWN0ZWQ7XG4gICAgICAgIGlmIChtZW1iZXIuc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5oYXNTZWxlY3RlZE1lbWJlcihtZW1iZXIpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RDb250YWN0cy5wdXNoKG1lbWJlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZU1lbWJlcihtZW1iZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVtb3ZlTWVtYmVyKG1lbWJlcjogU29jaWFsTWVtYmVyKSB7XG4gICAgICAgIGxldCBpbmRleCA9IHRoaXMuZ2V0SW5kZXhNZW1iZXJTZWxlY3RlZChtZW1iZXIpO1xuICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICAgICAgbWVtYmVyLnNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdENvbnRhY3RzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYXNTZWxlY3RlZE1lbWJlcihtZW1iZXI6IFNvY2lhbE1lbWJlcik6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRJbmRleE1lbWJlclNlbGVjdGVkKG1lbWJlcikgPiAtMTtcbiAgICB9XG5cbiAgICBnZXRJbmRleE1lbWJlclNlbGVjdGVkKG1lbWJlcjogU29jaWFsTWVtYmVyKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zZWxlY3RDb250YWN0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0Q29udGFjdHNbaV0uaWQgPT09IG1lbWJlci5pZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAtMTtcbiAgICB9XG5cbiAgICBpc09wZW5pbmcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNoYXJlTW9kYWwuaXNTaG93bjtcbiAgICB9XG5cbiAgICBjYW5jZWxDaGFuZ2VzKGUpIHtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgdGhpcy5zaGFyZU1vZGFsLmhpZGUoKTtcbiAgICB9XG5cbiAgICBzYXZlQ2hhbmdlcyhlKSB7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHRoaXMuc2V0UG9saWNpZXModGhpcy5zZWxlY3RDb250YWN0cyk7XG4gICAgICAgIHRoaXMuc2hhcmVNb2RhbC5oaWRlKCk7XG4gICAgICAgIHRoaXMuY2xvc2VNZW51KCk7XG4gICAgfVxuXG4gICAgb25TY3JvbGxDb250YWN0KGUpIHtcbiAgICAgICAgbGV0IG5vZGUgPSBlLnRhcmdldDtcbiAgICAgICAgaWYgKCF0aGlzLl9wYXJhbXMubG9hZGluZyAmJiBub2RlLnNjcm9sbEhlaWdodCAtIChub2RlLnNjcm9sbFRvcCArIG5vZGUuY2xpZW50SGVpZ2h0KSA8PSA0MCkge1xuICAgICAgICAgICAgdGhpcy5fbG9hZENvbnRhY3RzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9zY3JvbGxUb3BNb2RhbCgpIHtcbiAgICAgICAgdGhpcy5jb250YWN0TGlzdC5uYXRpdmVFbGVtZW50LnNjcm9sbFRvcCA9IDA7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfdXBkYXRlU2VsZWN0Q29udGFjdHMoKSB7XG4gICAgICAgIHRoaXMuY29udGFjdHMuZm9yRWFjaChtZW1iZXIgPT4gbWVtYmVyLnNlbGVjdGVkID0gdGhpcy5oYXNTZWxlY3RlZE1lbWJlcihtZW1iZXIpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9yZXNldEFjdGl2ZSgpIHtcbiAgICAgICAgdGhpcy5jYXRlZ29yaWVzLmZvckVhY2goY2F0ID0+IGNhdC5hY3RpdmUgPSBmYWxzZSk7XG4gICAgICAgIHRoaXMuZ3JvdXBzLmZvckVhY2goZ3JvdXAgPT4gZ3JvdXAuYWN0aXZlID0gZmFsc2UpO1xuICAgICAgICB0aGlzLmN1c3RvbUFjdGl2ZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3Jlc2V0TW9kYWwoKSB7XG4gICAgICAgIHRoaXMuX3BhcmFtcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX3BhcmFtcy5wYWdlTnVtYmVyID0gMDtcbiAgICAgICAgdGhpcy5fbWF0Y2hDb250YWN0cyA9IFtdO1xuICAgICAgICB0aGlzLnNlbGVjdENvbnRhY3RzID0gW107XG4gICAgICAgIHRoaXMuc2VhcmNoQ29udGFjdHMgPSBbXTtcbiAgICAgICAgdGhpcy5fc2V0U2VhcmNoS2V5d29yZCgnJyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfbG9hZENvbnRhY3RzKGluaXQ/OiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX3BhcmFtcy5sb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgaWYgKGluaXQpIHtcbiAgICAgICAgICAgIHRoaXMuX3Njcm9sbFRvcE1vZGFsKCk7XG4gICAgICAgICAgICB0aGlzLl9wYXJhbXMucGFnZU51bWJlciA9IDA7XG4gICAgICAgICAgICB0aGlzLnNlYXJjaENvbnRhY3RzID0gW107XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZWFyY2hDb250YWN0cyA9IHRoaXMuc2VhcmNoQ29udGFjdHMuY29uY2F0KHRoaXMuX21hdGNoQ29udGFjdHMuc2xpY2UoXG4gICAgICAgICAgICB0aGlzLl9wYXJhbXMucGFnZU51bWJlciAqIHRoaXMuX3BhcmFtcy5wYWdlU2l6ZSxcbiAgICAgICAgICAgICh0aGlzLl9wYXJhbXMucGFnZU51bWJlciArIDEpICogdGhpcy5fcGFyYW1zLnBhZ2VTaXplKSk7XG5cbiAgICAgICAgdGhpcy5fcGFyYW1zLnBhZ2VOdW1iZXIgKz0gMTtcbiAgICAgICAgdGhpcy5fcGFyYW1zLmxvYWRpbmcgPSAhdGhpcy5faGFzQ29udGFjdHMoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9oYXNDb250YWN0cygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hdGNoQ29udGFjdHMubGVuZ3RoID4gdGhpcy5fcGFyYW1zLnBhZ2VOdW1iZXIgKiB0aGlzLl9wYXJhbXMucGFnZVNpemU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfc29ydE1lbWJlcnMobWVtYmVyczogU29jaWFsTWVtYmVyW10pIHtcbiAgICAgICAgbWVtYmVycy5zb3J0KChhLCBiKSA9PiBhLmRpc3BsYXkubG9jYWxlQ29tcGFyZShiLmRpc3BsYXkpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9pbmRleEtleVRvU2VhcmNoKHN0cjogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWNjZW50U2VydmljZS52aVRvRW4oc3RyKS50b0xvd2VyQ2FzZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2NyZWF0ZVNvY2lhbE1lbWJlcihwb2xpY3lJdGVtKTogU29jaWFsTWVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGlkOiBwb2xpY3lJdGVtLm1lbWJlcixcbiAgICAgICAgICAgIGRpc3BsYXk6IHBvbGljeUl0ZW0uZGlzcGxheSxcbiAgICAgICAgICAgIGljb246IHRoaXMuc29jaWFsU2VydmljZS5nZXRJY29uQnlUeXBlKHBvbGljeUl0ZW0ucG9saWN5KSxcbiAgICAgICAgICAgIHZhbHVlOiBbcG9saWN5SXRlbV0sXG4gICAgICAgICAgICBfaW5kZXg6IHRoaXMuX2luZGV4S2V5VG9TZWFyY2gocG9saWN5SXRlbS5kaXNwbGF5KVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHByaXZhdGUgX2ZvY3VzSW5wdXRNZW1iZXIoKSB7XG4gICAgICAgIHRoaXMuaW5wdXRNZW1iZXIubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3NldFNlYXJjaEtleXdvcmQodmFsdWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLmlucHV0TWVtYmVyLm5hdGl2ZUVsZW1lbnQudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9nZXRTZWFyY2hLZXl3b3JkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pbnB1dE1lbWJlci5uYXRpdmVFbGVtZW50LnZhbHVlO1xuICAgIH1cbn1cbiJdfQ==