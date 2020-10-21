/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, ViewChild, Input } from '@angular/core';
import { SocialService } from '../social.service';
import { Policy, SHARE_COMPANY, SHARE_FRIEND, SHARE_ME, SHARE_PUBLISH } from '../model/Config';
import { AccentService } from 'inet-core';
export class ShareMemberComponent {
    /**
     * @param {?} socialService
     * @param {?} accentService
     */
    constructor(socialService, accentService) {
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
    ngOnInit() {
        document.body.appendChild(this.shareModal._element.nativeElement);
        this.onCloseMenu = this.onCloseMenu.bind(this);
        document.addEventListener('click', this.onCloseMenu);
        this.init();
        setTimeout((/**
         * @return {?}
         */
        () => {
            if (this.activity) {
                this.setPolicies(this.activity._policies);
            }
            else {
                this.setPolicies();
            }
        }), 100);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        document.removeEventListener('click', this.onCloseMenu);
        this._modalShowObserver.unsubscribe();
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this._modalShowObserver = this.shareModal.onShown.subscribe((/**
         * @return {?}
         */
        () => {
            this._focusInputMember();
            this.searchMember();
        }));
    }
    /**
     * @return {?}
     */
    init() {
        if (this.companyMode) {
            this.categories = this.companyCategories;
            // Load all users company
            /** @type {?} */
            let userAdded = [];
            this.socialService.searchMember({ pageSize: -1 }, (/**
             * @param {?} members
             * @return {?}
             */
            (members) => {
                members.forEach((/**
                 * @param {?} member
                 * @return {?}
                 */
                member => {
                    /** @type {?} */
                    let user = (/** @type {?} */ (this._createSocialMember({
                        member: member.username,
                        display: member.fullname,
                        policy: Policy.Individual
                    })));
                    user.username = member.username;
                    this.contacts.push(user);
                }));
                this._sortMembers(this.contacts);
            }));
        }
        else {
            this.categories = this.communityCategories;
            // Load all groups
            this.socialService.listGroups((/**
             * @param {?} groups
             * @return {?}
             */
            (groups) => {
                groups.forEach((/**
                 * @param {?} group
                 * @return {?}
                 */
                group => {
                    /** @type {?} */
                    let member = this._createSocialMember({
                        display: group,
                        member: group,
                        policy: Policy.Friend
                    });
                    member.group = true;
                    this.groups.push(member);
                    this.contacts.push(member);
                }));
                this._sortMembers(this.groups);
                this._sortMembers(this.contacts);
            }));
            // Load all friends
            this.socialService.listFriends({ pageSize: -1 }, (/**
             * @param {?} members
             * @return {?}
             */
            (members) => {
                members.forEach((/**
                 * @param {?} member
                 * @return {?}
                 */
                member => {
                    /** @type {?} */
                    let user = this._createSocialMember({
                        member: member.usercode,
                        display: member.fullname,
                        policy: Policy.Individual
                    });
                    user.username = member.usercode;
                    this.friends.push(user);
                    this.contacts.push(user);
                }));
                this._sortMembers(this.friends);
                this._sortMembers(this.contacts);
            }));
        }
        this.categories.forEach((/**
         * @param {?} category
         * @return {?}
         */
        category => category._index = this._indexKeyToSearch(category.display)));
        this.contacts = this.categories.slice();
    }
    /**
     * @return {?}
     */
    setDefault() {
        this._resetActive();
        this._resetModal();
        this.closeMenu();
    }
    /**
     * @param {?=} members
     * @return {?}
     */
    setPolicies(members) {
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
        let displays = [];
        /** @type {?} */
        let policies = [];
        for (let i = 0; i < members.length; i++) {
            /** @type {?} */
            let member = members[i];
            displays.push(member.display);
            policies = policies.concat(member.value);
        }
        this.policies = policies;
        this.display = displays.join(', ');
        this.displayIcon = members[0].icon;
        this.members = members;
    }
    /**
     * @param {?} params
     * @return {?}
     */
    injectPolicies(params) {
        if (this.policies.length < 1) {
            params.published = true;
            // params.element = JSON.stringify('[]');
        }
        else {
            params.element = JSON.stringify(this.policies);
        }
        return params;
    }
    /**
     * @param {?} member
     * @return {?}
     */
    selectMember(member) {
        this.setPolicies([member]);
        this.closeMenu();
    }
    /**
     * @return {?}
     */
    onCloseMenu() {
        if (!this.isOpening()) {
            this.showMenu = false;
        }
    }
    /**
     * @return {?}
     */
    openSelectCustom() {
        this.selectContacts = this.members.slice();
        this.shareModal.show();
        this._updateSelectContacts();
    }
    /**
     * @return {?}
     */
    closeMenu() {
        this.showMenu = false;
    }
    /**
     * @return {?}
     */
    openMenu() {
        this.showMenu = true;
    }
    /**
     * @return {?}
     */
    searchMember() {
        /** @type {?} */
        let value = this._indexKeyToSearch(this._getSearchKeyword());
        if (value) {
            this._matchContacts = this.contacts.filter((/**
             * @param {?} member
             * @return {?}
             */
            member => {
                return member._index.indexOf(value) > -1 ||
                    (typeof member.id === 'string' && member.id.indexOf(value) > -1);
            }));
        }
        else {
            this._matchContacts = this.contacts;
        }
        this._loadContacts(true);
    }
    /**
     * @param {?} member
     * @return {?}
     */
    addMember(member) {
        member.selected = !member.selected;
        if (member.selected) {
            if (!this.hasSelectedMember(member)) {
                this.selectContacts.push(member);
            }
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
        /** @type {?} */
        let index = this.getIndexMemberSelected(member);
        if (index > -1) {
            member.selected = false;
            this.selectContacts.splice(index, 1);
        }
    }
    /**
     * @param {?} member
     * @return {?}
     */
    hasSelectedMember(member) {
        return this.getIndexMemberSelected(member) > -1;
    }
    /**
     * @param {?} member
     * @return {?}
     */
    getIndexMemberSelected(member) {
        for (let i = 0; i < this.selectContacts.length; i++) {
            if (this.selectContacts[i].id === member.id) {
                return i;
            }
        }
        return -1;
    }
    /**
     * @return {?}
     */
    isOpening() {
        return this.shareModal.isShown;
    }
    /**
     * @param {?} e
     * @return {?}
     */
    cancelChanges(e) {
        e.stopPropagation();
        this.shareModal.hide();
    }
    /**
     * @param {?} e
     * @return {?}
     */
    saveChanges(e) {
        e.stopPropagation();
        this.setPolicies(this.selectContacts);
        this.shareModal.hide();
        this.closeMenu();
    }
    /**
     * @param {?} e
     * @return {?}
     */
    onScrollContact(e) {
        /** @type {?} */
        let node = e.target;
        if (!this._params.loading && node.scrollHeight - (node.scrollTop + node.clientHeight) <= 40) {
            this._loadContacts();
        }
    }
    /**
     * @private
     * @return {?}
     */
    _scrollTopModal() {
        this.contactList.nativeElement.scrollTop = 0;
    }
    /**
     * @private
     * @return {?}
     */
    _updateSelectContacts() {
        this.contacts.forEach((/**
         * @param {?} member
         * @return {?}
         */
        member => member.selected = this.hasSelectedMember(member)));
    }
    /**
     * @private
     * @return {?}
     */
    _resetActive() {
        this.categories.forEach((/**
         * @param {?} cat
         * @return {?}
         */
        cat => cat.active = false));
        this.groups.forEach((/**
         * @param {?} group
         * @return {?}
         */
        group => group.active = false));
        this.customActive = false;
    }
    /**
     * @private
     * @return {?}
     */
    _resetModal() {
        this._params.loading = false;
        this._params.pageNumber = 0;
        this._matchContacts = [];
        this.selectContacts = [];
        this.searchContacts = [];
        this._setSearchKeyword('');
    }
    /**
     * @private
     * @param {?=} init
     * @return {?}
     */
    _loadContacts(init) {
        this._params.loading = true;
        if (init) {
            this._scrollTopModal();
            this._params.pageNumber = 0;
            this.searchContacts = [];
        }
        this.searchContacts = this.searchContacts.concat(this._matchContacts.slice(this._params.pageNumber * this._params.pageSize, (this._params.pageNumber + 1) * this._params.pageSize));
        this._params.pageNumber += 1;
        this._params.loading = !this._hasContacts();
    }
    /**
     * @private
     * @return {?}
     */
    _hasContacts() {
        return this._matchContacts.length > this._params.pageNumber * this._params.pageSize;
    }
    /**
     * @private
     * @param {?} members
     * @return {?}
     */
    _sortMembers(members) {
        members.sort((/**
         * @param {?} a
         * @param {?} b
         * @return {?}
         */
        (a, b) => a.display.localeCompare(b.display)));
    }
    /**
     * @private
     * @param {?} str
     * @return {?}
     */
    _indexKeyToSearch(str) {
        return this.accentService.viToEn(str).toLowerCase();
    }
    /**
     * @private
     * @param {?} policyItem
     * @return {?}
     */
    _createSocialMember(policyItem) {
        return {
            id: policyItem.member,
            display: policyItem.display,
            icon: this.socialService.getIconByType(policyItem.policy),
            value: [policyItem],
            _index: this._indexKeyToSearch(policyItem.display)
        };
    }
    /**
     * @private
     * @return {?}
     */
    _focusInputMember() {
        this.inputMember.nativeElement.focus();
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    _setSearchKeyword(value) {
        this.inputMember.nativeElement.value = value;
    }
    /**
     * @private
     * @return {?}
     */
    _getSearchKeyword() {
        return this.inputMember.nativeElement.value;
    }
}
ShareMemberComponent.decorators = [
    { type: Component, args: [{
                selector: '[socialShareMember]',
                template: "<div class=\"group-share\">\n    <button (click)=\"$event.stopPropagation(); showMenu = !showMenu\" class=\"share-button btn btn-light active btn-sm\" tabindex=\"-1\" [title]=\"display\">\n        <div class=\"share-button_contain\">\n            <div class=\"share-button__padding\">\n                <i class=\"fa\" [ngClass]=\"displayIcon\"></i>\n            </div>\n            <div class=\"share-button__content\">\n                <div>{{display}}</div>\n            </div>\n            <div>\n                <i class=\"fa fa-caret-down\"></i>\n            </div>\n        </div>\n    </button>\n    <ul (click)=\"$event.stopPropagation()\" class=\"dropdown-menu share-menu\" [ngClass]=\"{'show': showMenu}\">\n        <li class=\"dropdown-header\">\n            Ai s\u1EBD nh\u00ECn th\u1EA5y n\u1ED9i dung n\u00E0y?\n        </li>\n\n        <li class=\"dropdown-item\" *ngFor=\"let category of categories\" (click)=\"selectMember(category)\">\n            <i class=\"fa {{category.icon}} group-share-icon\"></i> {{ category.display }}\n            <i [hidden]=\"!category.active\" class=\"fa fa-check category-check\"></i>\n        </li>\n\n        <li class=\"dropdown-item\" (click)=\"openSelectCustom()\">\n            <i class=\"fa fa-cog group-share-icon\"></i> T\u00F9y ch\u1ECDn...\n            <div *ngIf=\"customActive\">\n                <div class=\"custom-display\">{{display}}</div>\n                <i class=\"fa fa-check category-check\"></i>\n            </div>\n        </li>\n\n        <div *ngIf=\"groups.length\" class=\"seperate\"></div>\n        <li *ngFor=\"let group of groups\" class=\"dropdown-item\" (click)=\"selectMember(group)\">\n            <i class=\"fa group-share-icon\" [ngClass]=\"group.icon\"></i> {{group.display}}\n            <i [hidden]=\"!group.active\" class=\"fa fa-check category-check\"></i>\n        </li>\n    </ul>\n</div>\n\n<div class=\"modal fade\" bsModal #shareModal=\"bs-modal\" tabindex=\"-1\" role=\"dialog\">\n  <div class=\"modal-dialog\">\n    <div class=\"modal-content\">\n        <div class=\"modal-header\">\n            <h5 class=\"modal-title pull-left\">Chia s\u1EBB</h5>\n            <button type=\"button\" class=\"btn btn-primary btn-sm pull-right\" (click)=\"saveChanges($event)\" tabindex=\"-1\">\n                Xong\n            </button>\n        </div>\n        <div class=\"modal-body\">\n            <div class=\"auto-tag form-control contact-search\">\n                <div *ngFor=\"let member of selectContacts\" class=\"auto-tag-item\">\n                    <span>{{member.display}}</span>\n                    <i class=\"fa fa-times\" (click)=\"removeMember(member)\"></i>\n                </div>\n                <input #searchInput (keyup)=\"searchMember()\" type=\"text\" class=\"auto-tag-input\" placeholder=\"T\u00ECm ki\u1EBFm b\u1EA1n b\u00E8...\">\n            </div>\n\n            <div #contactList (scroll)=\"onScrollContact($event)\" class=\"contact-list\">\n                <div class=\"list-item list-avatar\" *ngFor=\"let member of searchContacts\" (click)=\"addMember(member)\">\n                    <img *ngIf=\"member.username; else icon\" userAvatar [usercode]=\"member.username\" class=\"list-item__image\">\n                    <ng-template #icon>\n                        <i class=\"list-item__icon fa\" [ngClass]=\"member.icon\"></i>\n                    </ng-template>\n                    <div class=\"list-item__content\">{{member.display}}</div>\n                    <label class=\"checkbox-container\">\n                        <input type=\"checkbox\" [checked]=\"member.selected\" disabled>\n                        <span class=\"checkmark\"></span>\n                    </label>\n                </div>\n            </div>\n        </div>\n    </div>\n  </div>\n</div>\n",
                styles: [".auto-tag{display:flex;flex-wrap:wrap;height:auto;padding-bottom:0}.auto-tag .auto-tag-item{display:flex;align-items:center;border-radius:4px;background:#eee;padding:0 10px;white-space:nowrap;margin:0 5px 5px 0}.auto-tag .auto-tag-item i{cursor:pointer;padding:5px;margin-right:-5px}.auto-tag .auto-tag-input{border:0;outline:0}.checkbox-container{display:block;position:relative;cursor:pointer;font-size:22px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;min-width:20px;min-height:20px;margin:0}.checkbox-container input{position:absolute;opacity:0;cursor:pointer}.checkbox-container .checkmark{position:absolute;top:0;left:0;height:20px;width:20px;background-color:#eee;border-radius:4px}.checkbox-container .checkmark:after{content:\"\";position:absolute;display:none;left:8px;top:4px;width:5px;height:10px;border:solid #fff;border-width:0 3px 3px 0;transform:rotate(45deg)}.checkbox-container:hover .checkmark{background-color:#ccc}.checkbox-container input:checked+.checkmark{background-color:#2196f3}.checkbox-container input:checked+.checkmark:after{display:block}.list-avatar{padding:5px 10px;overflow:hidden;cursor:pointer;margin-bottom:5px;display:flex;align-items:center}.list-item__icon,.list-item__image{width:32px;height:32px;border-radius:50%}.list-item__icon{line-height:32px;text-align:center;background:rgba(0,0,0,.05);color:rgba(0,0,0,.5)}.list-item__content{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding:0 15px;line-height:32px;flex-grow:1}", ".share-menu{max-height:300px;max-width:300px;overflow:auto}.seperate{margin:5px 20px;border-top:1px solid #eee}.group-share{position:relative;display:inline-block}.group-share-icon{width:22px}.dropdown-header,.dropdown-item{position:relative;font-size:14px;cursor:pointer;padding-left:32px}.category-check{position:absolute;left:8px;top:7px}.share-button{max-width:300px}.share-button_contain{display:flex}.share-button__content,.share-button__padding{padding-right:5px}.share-button__content{overflow:hidden}.share-button__content div{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.custom-display{font-size:13px;color:rgba(0,0,0,.6);line-height:15px;white-space:normal}.contact-list{height:300px;overflow:auto;margin-top:10px}@media (max-width:480px){.share-button{max-width:220px}.contact-search{max-height:140px;overflow:auto}.contact-list{height:200px}}"]
            }] }
];
/** @nocollapse */
ShareMemberComponent.ctorParameters = () => [
    { type: SocialService },
    { type: AccentService }
];
ShareMemberComponent.propDecorators = {
    shareModal: [{ type: ViewChild, args: ['shareModal',] }],
    inputMember: [{ type: ViewChild, args: ['searchInput',] }],
    contactList: [{ type: ViewChild, args: ['contactList',] }],
    companyMode: [{ type: Input }],
    activity: [{ type: Input }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmUtbWVtYmVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtc29jaWFsLyIsInNvdXJjZXMiOlsic3JjL3NoYXJlLW1lbWJlci9zaGFyZS1tZW1iZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0gsU0FBUyxFQUNULFVBQVUsRUFDVixTQUFTLEVBSVQsS0FBSyxFQUNSLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUNoRCxPQUFPLEVBQ0gsTUFBTSxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUM3QyxhQUFhLEVBQ2hCLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLFdBQVcsQ0FBQztBQVl4QyxNQUFNLE9BQU8sb0JBQW9COzs7OztJQW1EN0IsWUFDWSxhQUE0QixFQUM1QixhQUE0QjtRQUQ1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQWhEL0IsZ0JBQVcsR0FBWSxJQUFJLENBQUM7UUFLckMsc0JBQWlCLEdBQW1CO1lBQ2hDLGFBQWE7WUFDYixRQUFRO1NBQ1gsQ0FBQztRQUVGLHdCQUFtQixHQUFtQjtZQUNsQyxhQUFhO1lBQ2IsWUFBWTtZQUNaLFFBQVE7U0FDWCxDQUFDO1FBRUYsV0FBTSxHQUFtQixFQUFFLENBQUM7O1FBRzVCLGFBQVEsR0FBbUIsRUFBRSxDQUFDOztRQUc5QixZQUFPLEdBQW1CLEVBQUUsQ0FBQztRQUU3QixZQUFPLEdBQW1CLEVBQUUsQ0FBQzs7UUFHN0IsbUJBQWMsR0FBbUIsRUFBRSxDQUFDO1FBQ3BDLG1CQUFjLEdBQW1CLEVBQUUsQ0FBQztRQUVwQyxhQUFRLEdBQVksS0FBSyxDQUFDO1FBSTFCLGFBQVEsR0FBYSxFQUFFLENBQUM7UUFFeEIsaUJBQVksR0FBWSxLQUFLLENBQUM7UUFF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Q0wsS0FBSzs7OztJQUxOLDBDQUFvQzs7SUFDcEMsMkNBQWtEOztJQUNsRCwyQ0FBa0Q7O0lBRWxELDJDQUFxQzs7SUFDckMsd0NBQWtEOztJQUVsRCwwQ0FBMkI7O0lBRTNCLGlEQUdFOztJQUVGLG1EQUlFOztJQUVGLHNDQUE0Qjs7SUFHNUIsd0NBQThCOztJQUc5Qix1Q0FBNkI7O0lBRTdCLHVDQUE2Qjs7SUFHN0IsOENBQW9DOztJQUNwQyw4Q0FBb0M7O0lBRXBDLHdDQUEwQjs7SUFFMUIsMkNBQW9COztJQUNwQix1Q0FBZ0I7O0lBQ2hCLHdDQUF3Qjs7SUFFeEIsNENBQThCOzs7OztJQUU5Qiw4Q0FBNEM7Ozs7O0lBQzVDLHVDQUlFOzs7OztJQUNGLGtEQUEyQjs7Ozs7SUFHdkIsNkNBQW9DOzs7OztJQUNwQyw2Q0FBb0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENvbXBvbmVudCxcbiAgICBFbGVtZW50UmVmLFxuICAgIFZpZXdDaGlsZCxcbiAgICBBZnRlclZpZXdJbml0LFxuICAgIE9uRGVzdHJveSxcbiAgICBPbkluaXQsXG4gICAgSW5wdXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1NvY2lhbFNlcnZpY2V9IGZyb20gJy4uL3NvY2lhbC5zZXJ2aWNlJztcbmltcG9ydCB7XG4gICAgUG9saWN5LCBTSEFSRV9DT01QQU5ZLCBTSEFSRV9GUklFTkQsIFNIQVJFX01FLFxuICAgIFNIQVJFX1BVQkxJU0gsIFNvY2lhbE1lbWJlclxufSBmcm9tICcuLi9tb2RlbC9Db25maWcnO1xuaW1wb3J0IHtBY2NlbnRTZXJ2aWNlfSBmcm9tICdpbmV0LWNvcmUnO1xuaW1wb3J0IHtTb2NpYWxBY3Rpdml0eX0gZnJvbSBcIi4uL21vZGVsL0FjdGl2aXR5XCI7XG5pbXBvcnQge1NvY2lhbENvbW1lbnR9IGZyb20gXCIuLi9tb2RlbC9Db21tZW50XCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnW3NvY2lhbFNoYXJlTWVtYmVyXScsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3NoYXJlLW1lbWJlci5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbXG4gICAgICAgICcuLi9zdHlsZXMvdXNlci1zdHlsZXMuY3NzJyxcbiAgICAgICAgJy4vc2hhcmUtbWVtYmVyLmNvbXBvbmVudC5jc3MnXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBTaGFyZU1lbWJlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBBZnRlclZpZXdJbml0IHtcbiAgICBAVmlld0NoaWxkKCdzaGFyZU1vZGFsJykgc2hhcmVNb2RhbDtcbiAgICBAVmlld0NoaWxkKCdzZWFyY2hJbnB1dCcpIGlucHV0TWVtYmVyOiBFbGVtZW50UmVmO1xuICAgIEBWaWV3Q2hpbGQoJ2NvbnRhY3RMaXN0JykgY29udGFjdExpc3Q6IEVsZW1lbnRSZWY7XG5cbiAgICBASW5wdXQoKSBjb21wYW55TW9kZTogYm9vbGVhbiA9IHRydWU7XG4gICAgQElucHV0KCkgYWN0aXZpdHk6IFNvY2lhbEFjdGl2aXR5IHwgU29jaWFsQ29tbWVudDtcblxuICAgIGNhdGVnb3JpZXM6IFNvY2lhbE1lbWJlcltdO1xuXG4gICAgY29tcGFueUNhdGVnb3JpZXM6IFNvY2lhbE1lbWJlcltdID0gW1xuICAgICAgICBTSEFSRV9DT01QQU5ZLFxuICAgICAgICBTSEFSRV9NRVxuICAgIF07XG5cbiAgICBjb21tdW5pdHlDYXRlZ29yaWVzOiBTb2NpYWxNZW1iZXJbXSA9IFtcbiAgICAgICAgU0hBUkVfUFVCTElTSCxcbiAgICAgICAgU0hBUkVfRlJJRU5ELFxuICAgICAgICBTSEFSRV9NRVxuICAgIF07XG5cbiAgICBncm91cHM6IFNvY2lhbE1lbWJlcltdID0gW107XG5cbiAgICAvLyBBbGwgZ3JvdXBzLCBtZW1iZXJzXG4gICAgY29udGFjdHM6IFNvY2lhbE1lbWJlcltdID0gW107XG5cbiAgICAvLyBHcm91cHMsIG1lbWJlcnMgYWN0aXZlXG4gICAgbWVtYmVyczogU29jaWFsTWVtYmVyW10gPSBbXTtcblxuICAgIGZyaWVuZHM6IFNvY2lhbE1lbWJlcltdID0gW107XG5cbiAgICAvLyBTZWFyY2ggZGF0YVxuICAgIHNlYXJjaENvbnRhY3RzOiBTb2NpYWxNZW1iZXJbXSA9IFtdO1xuICAgIHNlbGVjdENvbnRhY3RzOiBTb2NpYWxNZW1iZXJbXSA9IFtdO1xuXG4gICAgc2hvd01lbnU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGRpc3BsYXlJY29uOiBzdHJpbmc7XG4gICAgZGlzcGxheTogc3RyaW5nO1xuICAgIHBvbGljaWVzOiBQb2xpY3lbXSA9IFtdO1xuXG4gICAgY3VzdG9tQWN0aXZlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBwcml2YXRlIF9tYXRjaENvbnRhY3RzOiBTb2NpYWxNZW1iZXJbXSA9IFtdO1xuICAgIHByaXZhdGUgX3BhcmFtcyA9IHtcbiAgICAgICAgcGFnZVNpemU6IDEwLFxuICAgICAgICBwYWdlTnVtYmVyOiAwLFxuICAgICAgICBsb2FkaW5nOiBmYWxzZVxuICAgIH07XG4gICAgcHJpdmF0ZSBfbW9kYWxTaG93T2JzZXJ2ZXI7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBzb2NpYWxTZXJ2aWNlOiBTb2NpYWxTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGFjY2VudFNlcnZpY2U6IEFjY2VudFNlcnZpY2VcbiAgICApIHsgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5zaGFyZU1vZGFsLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQpO1xuXG4gICAgICAgIHRoaXMub25DbG9zZU1lbnUgPSB0aGlzLm9uQ2xvc2VNZW51LmJpbmQodGhpcyk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vbkNsb3NlTWVudSk7XG5cbiAgICAgICAgdGhpcy5pbml0KCk7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5hY3Rpdml0eSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0UG9saWNpZXModGhpcy5hY3Rpdml0eS5fcG9saWNpZXMpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFBvbGljaWVzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDEwMCk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vbkNsb3NlTWVudSk7XG4gICAgICAgIHRoaXMuX21vZGFsU2hvd09ic2VydmVyLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICB0aGlzLl9tb2RhbFNob3dPYnNlcnZlciA9IHRoaXMuc2hhcmVNb2RhbC5vblNob3duLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9mb2N1c0lucHV0TWVtYmVyKCk7XG4gICAgICAgICAgICB0aGlzLnNlYXJjaE1lbWJlcigpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpbml0KCkge1xuXG4gICAgICAgIGlmICh0aGlzLmNvbXBhbnlNb2RlKSB7XG4gICAgICAgICAgICB0aGlzLmNhdGVnb3JpZXMgPSB0aGlzLmNvbXBhbnlDYXRlZ29yaWVzO1xuXG4gICAgICAgICAgICAvLyBMb2FkIGFsbCB1c2VycyBjb21wYW55XG4gICAgICAgICAgICBsZXQgdXNlckFkZGVkID0gW107XG4gICAgICAgICAgICB0aGlzLnNvY2lhbFNlcnZpY2Uuc2VhcmNoTWVtYmVyKHtwYWdlU2l6ZTogLTF9LCAobWVtYmVycykgPT4ge1xuICAgICAgICAgICAgICAgIG1lbWJlcnMuZm9yRWFjaChtZW1iZXIgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgdXNlciA9IDxTb2NpYWxNZW1iZXI+dGhpcy5fY3JlYXRlU29jaWFsTWVtYmVyKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lbWJlcjogbWVtYmVyLnVzZXJuYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogbWVtYmVyLmZ1bGxuYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9saWN5OiBQb2xpY3kuSW5kaXZpZHVhbFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgdXNlci51c2VybmFtZSA9IG1lbWJlci51c2VybmFtZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250YWN0cy5wdXNoKHVzZXIpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5fc29ydE1lbWJlcnModGhpcy5jb250YWN0cyk7XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNhdGVnb3JpZXMgPSB0aGlzLmNvbW11bml0eUNhdGVnb3JpZXM7XG5cbiAgICAgICAgICAgIC8vIExvYWQgYWxsIGdyb3Vwc1xuICAgICAgICAgICAgdGhpcy5zb2NpYWxTZXJ2aWNlLmxpc3RHcm91cHMoKGdyb3VwcykgPT4ge1xuICAgICAgICAgICAgICAgIGdyb3Vwcy5mb3JFYWNoKGdyb3VwID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1lbWJlciA9IHRoaXMuX2NyZWF0ZVNvY2lhbE1lbWJlcih7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBncm91cCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lbWJlcjogZ3JvdXAsXG4gICAgICAgICAgICAgICAgICAgICAgICBwb2xpY3k6IFBvbGljeS5GcmllbmRcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIG1lbWJlci5ncm91cCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JvdXBzLnB1c2gobWVtYmVyKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250YWN0cy5wdXNoKG1lbWJlcik7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9zb3J0TWVtYmVycyh0aGlzLmdyb3Vwcyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fc29ydE1lbWJlcnModGhpcy5jb250YWN0cyk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gTG9hZCBhbGwgZnJpZW5kc1xuICAgICAgICAgICAgdGhpcy5zb2NpYWxTZXJ2aWNlLmxpc3RGcmllbmRzKHtwYWdlU2l6ZTogLTF9LCAobWVtYmVycykgPT4ge1xuICAgICAgICAgICAgICAgIG1lbWJlcnMuZm9yRWFjaChtZW1iZXIgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgdXNlciA9IHRoaXMuX2NyZWF0ZVNvY2lhbE1lbWJlcih7XG4gICAgICAgICAgICAgICAgICAgICAgICBtZW1iZXI6IG1lbWJlci51c2VyY29kZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IG1lbWJlci5mdWxsbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvbGljeTogUG9saWN5LkluZGl2aWR1YWxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHVzZXIudXNlcm5hbWUgPSBtZW1iZXIudXNlcmNvZGU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZnJpZW5kcy5wdXNoKHVzZXIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRhY3RzLnB1c2godXNlcik7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9zb3J0TWVtYmVycyh0aGlzLmZyaWVuZHMpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3NvcnRNZW1iZXJzKHRoaXMuY29udGFjdHMpO1xuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2F0ZWdvcmllcy5mb3JFYWNoKGNhdGVnb3J5ID0+IGNhdGVnb3J5Ll9pbmRleCA9IHRoaXMuX2luZGV4S2V5VG9TZWFyY2goY2F0ZWdvcnkuZGlzcGxheSkpO1xuICAgICAgICB0aGlzLmNvbnRhY3RzID0gdGhpcy5jYXRlZ29yaWVzLnNsaWNlKCk7XG5cbiAgICB9XG5cbiAgICBzZXREZWZhdWx0KCkge1xuICAgICAgICB0aGlzLl9yZXNldEFjdGl2ZSgpO1xuICAgICAgICB0aGlzLl9yZXNldE1vZGFsKCk7XG4gICAgICAgIHRoaXMuY2xvc2VNZW51KCk7XG4gICAgfVxuXG4gICAgc2V0UG9saWNpZXMobWVtYmVycz86IFNvY2lhbE1lbWJlcltdKSB7XG5cbiAgICAgICAgdGhpcy5zZXREZWZhdWx0KCk7XG5cbiAgICAgICAgaWYgKCFtZW1iZXJzIHx8IG1lbWJlcnMubGVuZ3RoIDwgMSkge1xuICAgICAgICAgICAgbWVtYmVycyA9IFt0aGlzLmNhdGVnb3JpZXNbMF1dO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gU2V0IGFjdGl2ZSBjYXRlZ29yeSBvciBncm91cFxuICAgICAgICBpZiAobWVtYmVycy5sZW5ndGggPT09IDEgJiYgKG1lbWJlcnNbMF0uY2F0ZWdvcnkgfHwgbWVtYmVyc1swXS5ncm91cCkpIHtcbiAgICAgICAgICAgIG1lbWJlcnNbMF0uYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY3VzdG9tQWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBkaXNwbGF5cyA9IFtdLCBwb2xpY2llcyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1lbWJlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBtZW1iZXIgPSBtZW1iZXJzW2ldO1xuICAgICAgICAgICAgZGlzcGxheXMucHVzaChtZW1iZXIuZGlzcGxheSk7XG4gICAgICAgICAgICBwb2xpY2llcyA9IHBvbGljaWVzLmNvbmNhdChtZW1iZXIudmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5wb2xpY2llcyA9IHBvbGljaWVzO1xuICAgICAgICB0aGlzLmRpc3BsYXkgPSBkaXNwbGF5cy5qb2luKCcsICcpO1xuICAgICAgICB0aGlzLmRpc3BsYXlJY29uID0gbWVtYmVyc1swXS5pY29uO1xuICAgICAgICB0aGlzLm1lbWJlcnMgPSBtZW1iZXJzO1xuXG4gICAgfVxuXG4gICAgaW5qZWN0UG9saWNpZXMocGFyYW1zOiBhbnkpIHtcbiAgICAgICAgaWYgKHRoaXMucG9saWNpZXMubGVuZ3RoIDwgMSkge1xuICAgICAgICAgICAgcGFyYW1zLnB1Ymxpc2hlZCA9IHRydWU7XG4gICAgICAgICAgICAvLyBwYXJhbXMuZWxlbWVudCA9IEpTT04uc3RyaW5naWZ5KCdbXScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcGFyYW1zLmVsZW1lbnQgPSBKU09OLnN0cmluZ2lmeSh0aGlzLnBvbGljaWVzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcGFyYW1zO1xuICAgIH1cblxuICAgIHNlbGVjdE1lbWJlcihtZW1iZXI6IFNvY2lhbE1lbWJlcikge1xuICAgICAgICB0aGlzLnNldFBvbGljaWVzKFttZW1iZXJdKTtcbiAgICAgICAgdGhpcy5jbG9zZU1lbnUoKTtcbiAgICB9XG5cbiAgICBvbkNsb3NlTWVudSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzT3BlbmluZygpKSB7XG4gICAgICAgICAgICB0aGlzLnNob3dNZW51ID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvcGVuU2VsZWN0Q3VzdG9tKCkge1xuICAgICAgICB0aGlzLnNlbGVjdENvbnRhY3RzID0gdGhpcy5tZW1iZXJzLnNsaWNlKCk7XG4gICAgICAgIHRoaXMuc2hhcmVNb2RhbC5zaG93KCk7XG4gICAgICAgIHRoaXMuX3VwZGF0ZVNlbGVjdENvbnRhY3RzKCk7XG4gICAgfVxuXG4gICAgY2xvc2VNZW51KCkge1xuICAgICAgICB0aGlzLnNob3dNZW51ID0gZmFsc2U7XG4gICAgfVxuXG4gICAgb3Blbk1lbnUoKSB7XG4gICAgICAgIHRoaXMuc2hvd01lbnUgPSB0cnVlO1xuICAgIH1cblxuICAgIHNlYXJjaE1lbWJlcigpIHtcbiAgICAgICAgbGV0IHZhbHVlID0gdGhpcy5faW5kZXhLZXlUb1NlYXJjaCh0aGlzLl9nZXRTZWFyY2hLZXl3b3JkKCkpO1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX21hdGNoQ29udGFjdHMgPSB0aGlzLmNvbnRhY3RzLmZpbHRlcihtZW1iZXIgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBtZW1iZXIuX2luZGV4LmluZGV4T2YodmFsdWUpID4gLTEgfHxcbiAgICAgICAgICAgICAgICAgICAgKHR5cGVvZiBtZW1iZXIuaWQgPT09ICdzdHJpbmcnICYmIG1lbWJlci5pZC5pbmRleE9mKHZhbHVlKSA+IC0xKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fbWF0Y2hDb250YWN0cyA9IHRoaXMuY29udGFjdHM7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbG9hZENvbnRhY3RzKHRydWUpO1xuICAgIH1cblxuICAgIGFkZE1lbWJlcihtZW1iZXI6IFNvY2lhbE1lbWJlcikge1xuICAgICAgICBtZW1iZXIuc2VsZWN0ZWQgPSAhbWVtYmVyLnNlbGVjdGVkO1xuICAgICAgICBpZiAobWVtYmVyLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuaGFzU2VsZWN0ZWRNZW1iZXIobWVtYmVyKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0Q29udGFjdHMucHVzaChtZW1iZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVNZW1iZXIobWVtYmVyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbW92ZU1lbWJlcihtZW1iZXI6IFNvY2lhbE1lbWJlcikge1xuICAgICAgICBsZXQgaW5kZXggPSB0aGlzLmdldEluZGV4TWVtYmVyU2VsZWN0ZWQobWVtYmVyKTtcbiAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgICAgICAgIG1lbWJlci5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RDb250YWN0cy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFzU2VsZWN0ZWRNZW1iZXIobWVtYmVyOiBTb2NpYWxNZW1iZXIpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0SW5kZXhNZW1iZXJTZWxlY3RlZChtZW1iZXIpID4gLTE7XG4gICAgfVxuXG4gICAgZ2V0SW5kZXhNZW1iZXJTZWxlY3RlZChtZW1iZXI6IFNvY2lhbE1lbWJlcikge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc2VsZWN0Q29udGFjdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdENvbnRhY3RzW2ldLmlkID09PSBtZW1iZXIuaWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gLTE7XG4gICAgfVxuXG4gICAgaXNPcGVuaW5nKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zaGFyZU1vZGFsLmlzU2hvd247XG4gICAgfVxuXG4gICAgY2FuY2VsQ2hhbmdlcyhlKSB7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHRoaXMuc2hhcmVNb2RhbC5oaWRlKCk7XG4gICAgfVxuXG4gICAgc2F2ZUNoYW5nZXMoZSkge1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB0aGlzLnNldFBvbGljaWVzKHRoaXMuc2VsZWN0Q29udGFjdHMpO1xuICAgICAgICB0aGlzLnNoYXJlTW9kYWwuaGlkZSgpO1xuICAgICAgICB0aGlzLmNsb3NlTWVudSgpO1xuICAgIH1cblxuICAgIG9uU2Nyb2xsQ29udGFjdChlKSB7XG4gICAgICAgIGxldCBub2RlID0gZS50YXJnZXQ7XG4gICAgICAgIGlmICghdGhpcy5fcGFyYW1zLmxvYWRpbmcgJiYgbm9kZS5zY3JvbGxIZWlnaHQgLSAobm9kZS5zY3JvbGxUb3AgKyBub2RlLmNsaWVudEhlaWdodCkgPD0gNDApIHtcbiAgICAgICAgICAgIHRoaXMuX2xvYWRDb250YWN0cygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfc2Nyb2xsVG9wTW9kYWwoKSB7XG4gICAgICAgIHRoaXMuY29udGFjdExpc3QubmF0aXZlRWxlbWVudC5zY3JvbGxUb3AgPSAwO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3VwZGF0ZVNlbGVjdENvbnRhY3RzKCkge1xuICAgICAgICB0aGlzLmNvbnRhY3RzLmZvckVhY2gobWVtYmVyID0+IG1lbWJlci5zZWxlY3RlZCA9IHRoaXMuaGFzU2VsZWN0ZWRNZW1iZXIobWVtYmVyKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfcmVzZXRBY3RpdmUoKSB7XG4gICAgICAgIHRoaXMuY2F0ZWdvcmllcy5mb3JFYWNoKGNhdCA9PiBjYXQuYWN0aXZlID0gZmFsc2UpO1xuICAgICAgICB0aGlzLmdyb3Vwcy5mb3JFYWNoKGdyb3VwID0+IGdyb3VwLmFjdGl2ZSA9IGZhbHNlKTtcbiAgICAgICAgdGhpcy5jdXN0b21BY3RpdmUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9yZXNldE1vZGFsKCkge1xuICAgICAgICB0aGlzLl9wYXJhbXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9wYXJhbXMucGFnZU51bWJlciA9IDA7XG4gICAgICAgIHRoaXMuX21hdGNoQ29udGFjdHMgPSBbXTtcbiAgICAgICAgdGhpcy5zZWxlY3RDb250YWN0cyA9IFtdO1xuICAgICAgICB0aGlzLnNlYXJjaENvbnRhY3RzID0gW107XG4gICAgICAgIHRoaXMuX3NldFNlYXJjaEtleXdvcmQoJycpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2xvYWRDb250YWN0cyhpbml0PzogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9wYXJhbXMubG9hZGluZyA9IHRydWU7XG4gICAgICAgIGlmIChpbml0KSB7XG4gICAgICAgICAgICB0aGlzLl9zY3JvbGxUb3BNb2RhbCgpO1xuICAgICAgICAgICAgdGhpcy5fcGFyYW1zLnBhZ2VOdW1iZXIgPSAwO1xuICAgICAgICAgICAgdGhpcy5zZWFyY2hDb250YWN0cyA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2VhcmNoQ29udGFjdHMgPSB0aGlzLnNlYXJjaENvbnRhY3RzLmNvbmNhdCh0aGlzLl9tYXRjaENvbnRhY3RzLnNsaWNlKFxuICAgICAgICAgICAgdGhpcy5fcGFyYW1zLnBhZ2VOdW1iZXIgKiB0aGlzLl9wYXJhbXMucGFnZVNpemUsXG4gICAgICAgICAgICAodGhpcy5fcGFyYW1zLnBhZ2VOdW1iZXIgKyAxKSAqIHRoaXMuX3BhcmFtcy5wYWdlU2l6ZSkpO1xuXG4gICAgICAgIHRoaXMuX3BhcmFtcy5wYWdlTnVtYmVyICs9IDE7XG4gICAgICAgIHRoaXMuX3BhcmFtcy5sb2FkaW5nID0gIXRoaXMuX2hhc0NvbnRhY3RzKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaGFzQ29udGFjdHMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXRjaENvbnRhY3RzLmxlbmd0aCA+IHRoaXMuX3BhcmFtcy5wYWdlTnVtYmVyICogdGhpcy5fcGFyYW1zLnBhZ2VTaXplO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3NvcnRNZW1iZXJzKG1lbWJlcnM6IFNvY2lhbE1lbWJlcltdKSB7XG4gICAgICAgIG1lbWJlcnMuc29ydCgoYSwgYikgPT4gYS5kaXNwbGF5LmxvY2FsZUNvbXBhcmUoYi5kaXNwbGF5KSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaW5kZXhLZXlUb1NlYXJjaChzdHI6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmFjY2VudFNlcnZpY2UudmlUb0VuKHN0cikudG9Mb3dlckNhc2UoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9jcmVhdGVTb2NpYWxNZW1iZXIocG9saWN5SXRlbSk6IFNvY2lhbE1lbWJlciB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpZDogcG9saWN5SXRlbS5tZW1iZXIsXG4gICAgICAgICAgICBkaXNwbGF5OiBwb2xpY3lJdGVtLmRpc3BsYXksXG4gICAgICAgICAgICBpY29uOiB0aGlzLnNvY2lhbFNlcnZpY2UuZ2V0SWNvbkJ5VHlwZShwb2xpY3lJdGVtLnBvbGljeSksXG4gICAgICAgICAgICB2YWx1ZTogW3BvbGljeUl0ZW1dLFxuICAgICAgICAgICAgX2luZGV4OiB0aGlzLl9pbmRleEtleVRvU2VhcmNoKHBvbGljeUl0ZW0uZGlzcGxheSlcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9mb2N1c0lucHV0TWVtYmVyKCkge1xuICAgICAgICB0aGlzLmlucHV0TWVtYmVyLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9zZXRTZWFyY2hLZXl3b3JkKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5pbnB1dE1lbWJlci5uYXRpdmVFbGVtZW50LnZhbHVlID0gdmFsdWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZ2V0U2VhcmNoS2V5d29yZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5wdXRNZW1iZXIubmF0aXZlRWxlbWVudC52YWx1ZTtcbiAgICB9XG59XG4iXX0=