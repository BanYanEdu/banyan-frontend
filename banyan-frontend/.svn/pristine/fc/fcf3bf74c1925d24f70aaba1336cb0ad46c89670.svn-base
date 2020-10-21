/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ModalSelectComponent } from "./modal-select/modal-select.component";
import { CoreService } from "inet-core";
export class SelectUserComponent {
    /**
     * @param {?} coreService
     */
    constructor(coreService) {
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
    valid() {
        return this.isValid && this.selectUsers.length > 0;
    }
    /**
     * @return {?}
     */
    clearValid() {
        this.isFocus = false;
    }
    /**
     * @return {?}
     */
    validInput() {
        setTimeout((/**
         * @return {?}
         */
        () => {
            if (this.valid()) {
                this.isFocus = false;
            }
            else {
                this.isFocus = true;
            }
        }), 250);
    }
    /**
     * @return {?}
     */
    searchUser() {
        clearTimeout(this.timer);
        this.timer = setTimeout((/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            let value = this.getKeyword();
            if (value === this.searchValue) {
                return;
            }
            if (!value) {
                this.users.length = 0;
                this.searchValue = value;
                return;
            }
            this.coreService.searchFirmAccount({ keyword: value, pageSize: 10 }, (/**
             * @param {?} data
             * @return {?}
             */
            (data) => {
                /** @type {?} */
                let users = data && data['items'] || [];
                this.setUser(users);
            }));
        }), 300);
    }
    /**
     * @param {?} item
     * @return {?}
     */
    removeUser(item) {
        for (let i = 0; i < this.selectUsers.length; i++) {
            if (this.selectUsers[i].username === item.username) {
                this.selectUsers.splice(i, 1);
                this.validInput();
                this.onAdd.emit(item);
                return;
            }
        }
    }
    /**
     * @private
     * @return {?}
     */
    setDefault() {
        this.inputUser.nativeElement.value = '';
        this.searchValue = '';
        this.users = [];
        this.selectUsers = [];
    }
    /**
     * @param {?} item
     * @return {?}
     */
    addUser(item) {
        if (this.isSingle) {
            this.selectUsers[0] = item;
        }
        else {
            for (let selectMember of this.selectUsers) {
                if (selectMember.username === item.username) {
                    return;
                }
            }
            this.selectUsers.push(item);
        }
        this.inputUser.nativeElement.value = '';
        this.searchValue = '';
        this.focusInput();
        this.validInput();
    }
    /**
     * @param {?} e
     * @param {?} el
     * @return {?}
     */
    clickUser(e, el) {
        if (e.target.isSameNode(el)) {
            this.focusInput();
        }
    }
    /**
     * @return {?}
     */
    removeLastUser() {
        this.selectUsers.splice(-1);
    }
    /**
     * @return {?}
     */
    openModal() {
        this.modalSelect.show();
    }
    /**
     * @private
     * @param {?} user
     * @return {?}
     */
    hasUser(user) {
        for (let selectMember of this.selectUsers) {
            if (selectMember.username === user.username) {
                return true;
            }
        }
        return false;
    }
    /**
     * @private
     * @param {?} users
     * @return {?}
     */
    setUser(users) {
        this.users = users.filter((/**
         * @param {?} item
         * @return {?}
         */
        (item) => !this.hasUser(item)));
    }
    /**
     * @private
     * @return {?}
     */
    focusInput() {
        this.inputUser.nativeElement.focus();
    }
    /**
     * @private
     * @return {?}
     */
    getKeyword() {
        return this.inputUser.nativeElement.value.trim();
    }
    /**
     * @return {?}
     */
    onMouseEnter() {
        this.isMouseEnter = true;
    }
    /**
     * @return {?}
     */
    onMouseDown() {
        this.isMouseEnter = false;
    }
}
SelectUserComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-select-user',
                template: "<div class=\"row\">\n    <div class=\"col-sm-12\">\n        <div class=\"border select-multiple-content\"\n             #shareUserContainer\n             (click)=\"clickUser($event, shareUserContainer)\"\n             [ngClass]=\"{'select-valid': isValid && isFocus && selectUsers?.length < 1}\"\n             (mouseenter)=\"onMouseEnter()\"\n             (mouseleave)=\"onMouseDown()\">\n            <span *ngIf=\"isValid && isFocus && isMouseEnter && selectUsers?.length < 1\" class=\"select-tooltip\">\n                B\u1EA1n c\u1EA7n ch\u1ECDn \u00EDt nh\u1EA5t m\u1ED9t ng\u01B0\u1EDDi.\n            </span>\n            <span *ngFor=\"let user of selectUsers\" class=\"select-multiple-item border\">\n                <img userAvatar [usercode]=\"user?.username\" width=\"28\" height=\"28\">\n                <span>{{user.fullname}}</span>\n                <span (click)=\"removeUser(user)\" class=\"badge badge-muted text-muted rounded-circle m-1\">\n                    <i class=\"fa fa-times\" style=\"cursor: pointer;\"></i>\n                </span>\n            </span>\n            <span class=\"autocomplete-container\">\n                <input type=\"text\" class=\"auto-tag-input\" style=\"width: 80px !important;\"\n                       #inputUser\n                       appAutocompleteInput\n                       [autoList]=\"autoList\"\n                       (input)=\"searchUser()\"\n                       (onBackSpaceRemove)=\"removeLastUser()\"\n                       (blur)=\"validInput()\">\n            </span>\n        </div>\n        <ul class=\"list-group autocomplete-list\"\n            appAutocompleteList\n            #autoList=\"appAutocompleteList\">\n            <li *ngFor=\"let item of users\" (click)=\"addUser(item)\" class=\"list-group-item auto-item-image rounded-0\">\n                <img userAvatar [usercode]=\"item?.username\">\n                <div>{{item.fullname}}</div>\n            </li>\n        </ul>\n        <i (click)=\"openModal()\" class=\"icon-user\" style=\"position: absolute;top: 0;right: 10px;padding: 16px;cursor: pointer;\"></i>\n    </div>\n    <app-modal-select\n        [selectUsers]=\"selectUsers\"\n        [isSingle]=\"isSingle\">\n    </app-modal-select>\n</div>",
                styles: [".autocomplete-container{position:relative}.autocomplete-list{display:none;position:absolute;left:0;right:0;z-index:1;overflow:auto;max-height:500px}.autocomplete-list>li{padding:10px;cursor:pointer;border-width:0 1px}.autocomplete-list>li:first-child{border-top-width:1px}.autocomplete-list>li:last-child{border-bottom-width:1px}.auto-item-image i,.auto-item-image img{float:left;width:30px;height:30px;margin-right:10px}.auto-item-image i{text-align:center;line-height:30px;background:rgba(0,0,0,.05);color:rgba(0,0,0,.5)}.auto-item-image div{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.auto-tag{padding:2px 7px 7px;min-height:38px;height:auto}.auto-tag-input{border:0;padding:0;margin-top:5px;height:24px;line-height:22px}.auto-tag-input:focus{outline:0}.auto-tag-item{font-size:14px;line-height:24px;margin-right:5px;margin-top:5px;padding:0 5px;float:left;background:#e9ebee;border:1px solid rgba(0,0,0,.2);border-radius:2px}.auto-tag-item i{float:right;margin-right:-5px;height:24px;width:24px;line-height:24px;text-align:center;cursor:pointer}", ".select-multiple-content{width:100%;min-height:46px;padding:3px}.select-multiple-item{color:#343434;background:#e0e0e0;margin:4px;display:inline-block;font-size:.875em}.list-group-item img{height:34px!important;width:34px!important}.badge-muted{color:#e0e0e0!important;background:#9e9e9e}.auto-tag-input{margin-top:0!important;height:37px!important}.auto-item-image>img{margin-top:-5px}.autocomplete-list{padding:0 15px;overflow:hidden}.select-valid{border:1px solid red!important}.select-tooltip{position:absolute;bottom:150%;margin-bottom:-15px;padding:7px;width:50%;left:25%;border-radius:3px;background-color:#dc3545;color:#fff;content:attr(data-tooltip);text-align:center;font-size:14px;line-height:1.2}"]
            }] }
];
/** @nocollapse */
SelectUserComponent.ctorParameters = () => [
    { type: CoreService }
];
SelectUserComponent.propDecorators = {
    id: [{ type: Input, args: ['id',] }],
    selectUsers: [{ type: Input, args: ['selectUsers',] }],
    isSingle: [{ type: Input, args: ['isSingle',] }],
    isValid: [{ type: Input, args: ['isValid',] }],
    onAdd: [{ type: Output }],
    modalSelect: [{ type: ViewChild, args: [ModalSelectComponent,] }],
    inputUser: [{ type: ViewChild, args: ['inputUser',] }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LXVzZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC11aS8iLCJzb3VyY2VzIjpbInNyYy9zZWxlY3QtdXNlci9zZWxlY3QtdXNlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM1RixPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSx1Q0FBdUMsQ0FBQztBQUMzRSxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sV0FBVyxDQUFDO0FBV3RDLE1BQU0sT0FBTyxtQkFBbUI7Ozs7SUFrQjlCLFlBQW9CLFdBQXdCO1FBQXhCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBaEIvQixPQUFFLEdBQVcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ3RCLGdCQUFXLEdBQVUsRUFBRSxDQUFDO1FBSXBDLFVBQUssR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBSzFDLGlCQUFZLEdBQVcsS0FBSyxDQUFDO1FBQzdCLFlBQU8sR0FBVyxLQUFLLENBQUM7UUFDeEIsVUFBSyxHQUFVLEVBQUUsQ0FBQztJQUk4QixDQUFDOzs7O0lBRWpELEtBQUs7UUFDSCxPQUFPLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQ3JELENBQUM7Ozs7SUFFRCxVQUFVO1FBQ1IsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7SUFDdkIsQ0FBQzs7OztJQUVELFVBQVU7UUFDUixVQUFVOzs7UUFBQyxHQUFHLEVBQUU7WUFDZCxJQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsRUFBQztnQkFDZCxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQzthQUN0QjtpQkFDRztnQkFDRixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQzthQUNyQjtRQUNILENBQUMsR0FBRSxHQUFHLENBQUMsQ0FBQztJQUNWLENBQUM7Ozs7SUFFRCxVQUFVO1FBQ1IsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN6QixJQUFJLENBQUMsS0FBSyxHQUFHLFVBQVU7OztRQUFDLEdBQUcsRUFBRTs7Z0JBQ3ZCLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQzdCLElBQUksS0FBSyxLQUFLLElBQUksQ0FBQyxXQUFXLEVBQUU7Z0JBQzlCLE9BQU87YUFDUjtZQUNELElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1YsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO2dCQUN0QixJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztnQkFDekIsT0FBTzthQUNSO1lBQ0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBQzs7OztZQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7O29CQUN0RSxLQUFLLEdBQUcsSUFBSSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFO2dCQUN2QyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3RCLENBQUMsRUFBQyxDQUFDO1FBQ0wsQ0FBQyxHQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ1QsQ0FBQzs7Ozs7SUFFRCxVQUFVLENBQUMsSUFBUztRQUNsQixLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7WUFDOUMsSUFBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsS0FBSyxJQUFJLENBQUMsUUFBUSxFQUFDO2dCQUNoRCxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQzlCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztnQkFDbEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3RCLE9BQU87YUFDUjtTQUNGO0lBQ0gsQ0FBQzs7Ozs7SUFFTyxVQUFVO1FBQ2hCLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDeEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDaEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7SUFDeEIsQ0FBQzs7Ozs7SUFFRCxPQUFPLENBQUMsSUFBUztRQUNmLElBQUcsSUFBSSxDQUFDLFFBQVEsRUFBQztZQUNmLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO1NBQzVCO2FBQ0c7WUFDRixLQUFJLElBQUksWUFBWSxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUM7Z0JBQ3ZDLElBQUcsWUFBWSxDQUFDLFFBQVEsS0FBSyxJQUFJLENBQUMsUUFBUSxFQUFDO29CQUN6QyxPQUFPO2lCQUNSO2FBQ0Y7WUFDRCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUM3QjtRQUNELElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDeEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNwQixDQUFDOzs7Ozs7SUFFRCxTQUFTLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDYixJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFO1lBQzNCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUNuQjtJQUNILENBQUM7Ozs7SUFFRCxjQUFjO1FBQ1osSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM5QixDQUFDOzs7O0lBRUQsU0FBUztRQUNQLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDMUIsQ0FBQzs7Ozs7O0lBRU8sT0FBTyxDQUFDLElBQUk7UUFDbEIsS0FBSyxJQUFJLFlBQVksSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ3pDLElBQUksWUFBWSxDQUFDLFFBQVEsS0FBSyxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUMzQyxPQUFPLElBQUksQ0FBQzthQUNiO1NBQ0Y7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7Ozs7OztJQUVPLE9BQU8sQ0FBQyxLQUFZO1FBQzFCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLE1BQU07Ozs7UUFBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFDLENBQUM7SUFDM0QsQ0FBQzs7Ozs7SUFFTyxVQUFVO1FBQ2hCLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3ZDLENBQUM7Ozs7O0lBRU8sVUFBVTtRQUNoQixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNuRCxDQUFDOzs7O0lBRUQsWUFBWTtRQUNWLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO0lBQzNCLENBQUM7Ozs7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7SUFDNUIsQ0FBQzs7O1lBL0lGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsaUJBQWlCO2dCQUMzQiw4c0VBQTJDOzthQUs1Qzs7OztZQVZPLFdBQVc7OztpQkFhaEIsS0FBSyxTQUFDLElBQUk7MEJBQ1YsS0FBSyxTQUFDLGFBQWE7dUJBQ25CLEtBQUssU0FBQyxVQUFVO3NCQUNoQixLQUFLLFNBQUMsU0FBUztvQkFFZixNQUFNOzBCQUVOLFNBQVMsU0FBQyxvQkFBb0I7d0JBQzlCLFNBQVMsU0FBQyxXQUFXOzs7O0lBUnRCLGlDQUE0Qzs7SUFDNUMsMENBQThDOztJQUM5Qyx1Q0FBcUM7O0lBQ3JDLHNDQUFtQzs7SUFFbkMsb0NBQTBDOztJQUUxQywwQ0FBbUU7O0lBQ25FLHdDQUE4Qzs7SUFFOUMsMkNBQTZCOztJQUM3QixzQ0FBd0I7O0lBQ3hCLG9DQUFrQjs7Ozs7SUFDbEIsb0NBQW1COzs7OztJQUNuQiwwQ0FBNEI7Ozs7O0lBRWhCLDBDQUFnQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQsIFZpZXdDaGlsZH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01vZGFsU2VsZWN0Q29tcG9uZW50fSBmcm9tIFwiLi9tb2RhbC1zZWxlY3QvbW9kYWwtc2VsZWN0LmNvbXBvbmVudFwiO1xuaW1wb3J0IHtDb3JlU2VydmljZX0gZnJvbSBcImluZXQtY29yZVwiO1xuZGVjbGFyZSBsZXQgaU5ldDogYW55O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhcHAtc2VsZWN0LXVzZXInLFxuICB0ZW1wbGF0ZVVybDogJy4vc2VsZWN0LXVzZXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFtcbiAgICAgICcuLi9zY3NzL2F1dG9jb21wbGV0ZS5jc3MnLFxuICAgICAgJy4vc2VsZWN0LXVzZXIuY29tcG9uZW50LmNzcydcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBTZWxlY3RVc2VyQ29tcG9uZW50e1xuICBcbiAgQElucHV0KCdpZCcpIGlkOiBzdHJpbmcgPSBpTmV0LmdlbmVyYXRlSWQoKTtcbiAgQElucHV0KCdzZWxlY3RVc2VycycpIHNlbGVjdFVzZXJzOiBhbnlbXSA9IFtdO1xuICBASW5wdXQoJ2lzU2luZ2xlJykgaXNTaW5nbGU6IGJvb2xlYW47XG4gIEBJbnB1dCgnaXNWYWxpZCcpIGlzVmFsaWQ6IGJvb2xlYW47XG5cbiAgQE91dHB1dCgpIG9uQWRkID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQFZpZXdDaGlsZChNb2RhbFNlbGVjdENvbXBvbmVudCkgbW9kYWxTZWxlY3Q6IE1vZGFsU2VsZWN0Q29tcG9uZW50O1xuICBAVmlld0NoaWxkKCdpbnB1dFVzZXInKSBpbnB1dFVzZXI6IEVsZW1lbnRSZWY7XG4gIFxuICBpc01vdXNlRW50ZXI6Ym9vbGVhbiA9IGZhbHNlO1xuICBpc0ZvY3VzOmJvb2xlYW4gPSBmYWxzZTtcbiAgdXNlcnM6IGFueVtdID0gW107XG4gIHByaXZhdGUgdGltZXI6IGFueTtcbiAgcHJpdmF0ZSBzZWFyY2hWYWx1ZTogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29yZVNlcnZpY2U6IENvcmVTZXJ2aWNlKSB7IH1cblxuICB2YWxpZCgpe1xuICAgIHJldHVybiB0aGlzLmlzVmFsaWQgJiYgdGhpcy5zZWxlY3RVc2Vycy5sZW5ndGggPiAwO1xuICB9XG5cbiAgY2xlYXJWYWxpZCgpe1xuICAgIHRoaXMuaXNGb2N1cyA9IGZhbHNlO1xuICB9XG5cbiAgdmFsaWRJbnB1dCgpe1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaWYodGhpcy52YWxpZCgpKXtcbiAgICAgICAgdGhpcy5pc0ZvY3VzID0gZmFsc2U7XG4gICAgICB9XG4gICAgICBlbHNle1xuICAgICAgICB0aGlzLmlzRm9jdXMgPSB0cnVlO1xuICAgICAgfVxuICAgIH0sIDI1MCk7XG4gIH1cblxuICBzZWFyY2hVc2VyKCkge1xuICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVyKTtcbiAgICB0aGlzLnRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBsZXQgdmFsdWUgPSB0aGlzLmdldEtleXdvcmQoKTtcbiAgICAgIGlmICh2YWx1ZSA9PT0gdGhpcy5zZWFyY2hWYWx1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoIXZhbHVlKSB7XG4gICAgICAgIHRoaXMudXNlcnMubGVuZ3RoID0gMDtcbiAgICAgICAgdGhpcy5zZWFyY2hWYWx1ZSA9IHZhbHVlO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLmNvcmVTZXJ2aWNlLnNlYXJjaEZpcm1BY2NvdW50KHtrZXl3b3JkOiB2YWx1ZSwgcGFnZVNpemU6IDEwfSwgKGRhdGEpID0+IHtcbiAgICAgICAgbGV0IHVzZXJzID0gZGF0YSAmJiBkYXRhWydpdGVtcyddIHx8IFtdO1xuICAgICAgICB0aGlzLnNldFVzZXIodXNlcnMpO1xuICAgICAgfSk7XG4gICAgfSwzMDApO1xuICB9XG5cbiAgcmVtb3ZlVXNlcihpdGVtOiBhbnkpe1xuICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLnNlbGVjdFVzZXJzLmxlbmd0aDsgaSsrKXtcbiAgICAgIGlmKHRoaXMuc2VsZWN0VXNlcnNbaV0udXNlcm5hbWUgPT09IGl0ZW0udXNlcm5hbWUpe1xuICAgICAgICB0aGlzLnNlbGVjdFVzZXJzLnNwbGljZShpLCAxKTtcbiAgICAgICAgdGhpcy52YWxpZElucHV0KCk7XG4gICAgICAgIHRoaXMub25BZGQuZW1pdChpdGVtKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2V0RGVmYXVsdCgpe1xuICAgIHRoaXMuaW5wdXRVc2VyLm5hdGl2ZUVsZW1lbnQudmFsdWUgPSAnJztcbiAgICB0aGlzLnNlYXJjaFZhbHVlID0gJyc7XG4gICAgdGhpcy51c2VycyA9IFtdO1xuICAgIHRoaXMuc2VsZWN0VXNlcnMgPSBbXTtcbiAgfVxuXG4gIGFkZFVzZXIoaXRlbTogYW55KXtcbiAgICBpZih0aGlzLmlzU2luZ2xlKXtcbiAgICAgIHRoaXMuc2VsZWN0VXNlcnNbMF0gPSBpdGVtO1xuICAgIH1cbiAgICBlbHNle1xuICAgICAgZm9yKGxldCBzZWxlY3RNZW1iZXIgb2YgdGhpcy5zZWxlY3RVc2Vycyl7XG4gICAgICAgIGlmKHNlbGVjdE1lbWJlci51c2VybmFtZSA9PT0gaXRlbS51c2VybmFtZSl7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLnNlbGVjdFVzZXJzLnB1c2goaXRlbSk7XG4gICAgfVxuICAgIHRoaXMuaW5wdXRVc2VyLm5hdGl2ZUVsZW1lbnQudmFsdWUgPSAnJztcbiAgICB0aGlzLnNlYXJjaFZhbHVlID0gJyc7XG4gICAgdGhpcy5mb2N1c0lucHV0KCk7XG4gICAgdGhpcy52YWxpZElucHV0KCk7XG4gIH1cblxuICBjbGlja1VzZXIoZSwgZWwpIHtcbiAgICBpZiAoZS50YXJnZXQuaXNTYW1lTm9kZShlbCkpIHtcbiAgICAgIHRoaXMuZm9jdXNJbnB1dCgpO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZUxhc3RVc2VyKCkge1xuICAgIHRoaXMuc2VsZWN0VXNlcnMuc3BsaWNlKC0xKTtcbiAgfVxuXG4gIG9wZW5Nb2RhbCgpe1xuICAgIHRoaXMubW9kYWxTZWxlY3Quc2hvdygpO1xuICB9XG5cbiAgcHJpdmF0ZSBoYXNVc2VyKHVzZXIpOiBib29sZWFuIHtcbiAgICBmb3IgKGxldCBzZWxlY3RNZW1iZXIgb2YgdGhpcy5zZWxlY3RVc2Vycykge1xuICAgICAgaWYgKHNlbGVjdE1lbWJlci51c2VybmFtZSA9PT0gdXNlci51c2VybmFtZSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRVc2VyKHVzZXJzOiBhbnlbXSkge1xuICAgIHRoaXMudXNlcnMgPSB1c2Vycy5maWx0ZXIoKGl0ZW0pID0+ICF0aGlzLmhhc1VzZXIoaXRlbSkpO1xuICB9XG5cbiAgcHJpdmF0ZSBmb2N1c0lucHV0KCkge1xuICAgIHRoaXMuaW5wdXRVc2VyLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0S2V5d29yZCgpIHtcbiAgICByZXR1cm4gdGhpcy5pbnB1dFVzZXIubmF0aXZlRWxlbWVudC52YWx1ZS50cmltKCk7XG4gIH1cblxuICBvbk1vdXNlRW50ZXIoKXtcbiAgICB0aGlzLmlzTW91c2VFbnRlciA9IHRydWU7XG4gIH1cblxuICBvbk1vdXNlRG93bigpe1xuICAgIHRoaXMuaXNNb3VzZUVudGVyID0gZmFsc2U7XG4gIH1cbn1cbiJdfQ==