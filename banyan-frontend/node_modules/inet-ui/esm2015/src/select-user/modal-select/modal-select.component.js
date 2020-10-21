/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { BsModalService } from "ngx-bootstrap";
import { CoreService } from "inet-core";
export class ModalSelectComponent {
    /**
     * @param {?} coreService
     * @param {?} modalService
     */
    constructor(coreService, modalService) {
        this.coreService = coreService;
        this.modalService = modalService;
        this.selectUsers = [];
        this.users = [];
    }
    /**
     * @return {?}
     */
    setDefault() {
        this.selectUsers = [];
    }
    /**
     * @return {?}
     */
    searchUser() {
        clearTimeout(this.timer);
        /** @type {?} */
        let value = this.key || '';
        this.timer = setTimeout((/**
         * @return {?}
         */
        () => {
            this.coreService.searchFirmAccount({ keyword: value, pageSize: 10 }, (/**
             * @param {?} data
             * @return {?}
             */
            (data) => {
                /** @type {?} */
                let users = data && data['items'] || [];
                this.setUsers(users);
            }));
        }), 300);
    }
    /**
     * @param {?} item
     * @return {?}
     */
    addUser(item) {
        if (this.isSingle) {
            if (this.selectUsers[0]) {
                this.users.push(this.selectUsers[0]);
            }
            this.selectUsers[0] = item;
        }
        else {
            for (let i = 0; i < this.selectUsers.length; i++) {
                if (this.selectUsers[i].username === item.username) {
                    return;
                }
            }
            this.selectUsers.push(item);
        }
        this.setUsers(this.users);
    }
    /**
     * @param {?} item
     * @return {?}
     */
    removeUser(item) {
        for (let i = 0; i < this.selectUsers.length; i++) {
            if (this.selectUsers[i].username === item.username) {
                this.users.push(item);
                this.selectUsers.splice(i, 1);
                return;
            }
        }
    }
    /**
     * @return {?}
     */
    show() {
        this.searchUser();
        this.modalRef = this.modalService.show(this.selectModal);
    }
    /**
     * @return {?}
     */
    hide() {
        this.modalRef.hide();
    }
    /**
     * @private
     * @param {?} user
     * @return {?}
     */
    hasUser(user) {
        for (let item of this.selectUsers) {
            if (item.username === user.username) {
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
    setUsers(users) {
        this.users = users.filter((/**
         * @param {?} item
         * @return {?}
         */
        (item) => !this.hasUser(item)));
    }
}
ModalSelectComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-modal-select',
                template: "<ng-template #selectModal>\n    <div class=\"modal-header border-0\">\n        <h5 class=\"modal-title pull-left\"><i class=\"fa fa-users\"></i> Ch\u1ECDn ng\u01B0\u1EDDi d\u00F9ng </h5>\n        <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"hide()\">\n            <span aria-hidden=\"true\">&times;</span>\n        </button>\n    </div>\n    <div class=\"modal-body p-0 font-size\">\n        <div class=\"col-sm-12 border-bottom\">\n            <div class=\"input-group input-group-sm\" style=\"padding-bottom: 10px;\">\n                <input (input)=\"searchUser()\"\n                       [(ngModel)]=\"key\" type=\"text\" class=\"form-control\" placeholder=\"T\u00ECm ki\u1EBFm\">\n                <div class=\"input-group-append\">\n                    <span class=\"input-group-text\" (click)=\"searchUser()\">\n                        <i class=\"fa fa-search\"></i>\n                    </span>\n                </div>\n            </div>\n        </div>\n        <nav class=\"nav nav-tabs\">\n            <span class=\"nav-item nav-link active rounded-0\" href=\"#nav-book\" data-toggle=\"tab\"  role=\"tab\">\n                <i class=\"fa fa-group\"></i> T\u1EA5t c\u1EA3\n            </span>\n            <span class=\"nav-item nav-link rounded-0\" href=\"#nav-book-select\" data-toggle=\"tab\" role=\"tab\">\n                <i class=\"fa fa-check-circle\"></i> \u0110\u00E3 ch\u1ECDn\n                <span [hidden]=\"selectUsers?.length<1\" class=\"ml-1 badge badge-primary rounded-circle\">{{ selectUsers?.length }}</span>\n            </span>\n        </nav>\n        <div class=\"tab-content\">\n            <div id=\"nav-book\" class=\"tab-pane fade active show\" role=\"tabpanel\" aria-labelledby=\"nav-home-tab\" aria-expanded=\"true\">\n                <ul class=\"list-group rounded-0\"\n                    [ngClass]=\"{'p-3':users?.length > 0}\">\n                    <li *ngFor=\"let user of users\"\n                        (click)=\"addUser(user)\"\n                        class=\"list-group-item rounded-0\">\n                        <div class=\"row\">\n                            <div class=\"col-sm-2\">\n                                <img userAvatar [usercode]=\"user?.username\" class=\"rounded-circle\">\n                            </div>\n                            <div class=\"col-sm-10\">\n                                <span class=\"name\">{{user.fullname}}</span>\n                                <br>\n                                <span class=\"email text-muted\"><i class=\"fa fa-envelope\"></i>&nbsp;{{user.username}}</span>\n                            </div>\n                        </div>\n                        <div class=\"clearfix\"></div>\n                    </li>\n                    <li *ngIf=\"users?.length<1\" class=\"list-group-item rounded-0 border-0\">\n                        <i>Kh\u00F4ng t\u00ECm th\u1EA5y d\u1EEF li\u1EC7u</i>\n                    </li>\n                </ul>\n            </div>\n            <div id=\"nav-book-select\"\n                 class=\"tab-pane fade\" role=\"tabpanel\" aria-labelledby=\"nav-profile-tab\" aria-expanded=\"false\">\n                <ul class=\"list-group rounded-0\"\n                    [ngClass]=\"{'p-3':selectUsers?.length > 0}\">\n                    <li *ngFor=\"let user of selectUsers\"\n                        (click)=\"removeUser(user)\"\n                        class=\"list-group-item rounded-0 selected\">\n                        <div class=\"row\">\n                            <div class=\"col-sm-2\">\n                                <img userAvatar [usercode]=\"user?.username\" class=\"rounded-circle\">\n                            </div>\n                            <div class=\"col-sm-10\">\n                                <span class=\"name\">{{user.fullname}}</span>\n                                <br>\n                                <span class=\"email\"><i class=\"fa fa-envelope\"></i>&nbsp;{{user.username}}</span>\n                            </div>\n                        </div>\n                        <div class=\"clearfix\"></div>\n                    </li>\n                    <li *ngIf=\"selectUsers?.length<1\" class=\"list-group-item rounded-0 border-0\">\n                        <i>Kh\u00F4ng t\u00ECm th\u1EA5y d\u1EEF li\u1EC7u</i>\n                    </li>\n                </ul>\n            </div>\n        </div>\n    </div>\n    <div class=\"modal-footer text-right\">\n        <button type=\"button\" class=\"btn btn-danger btn-sm\" (click)=\"hide()\"><i class=\"fa fa-remove\"></i> \u0110\u00F3ng</button>\n    </div>\n</ng-template>",
                styles: [".tab-content{height:391px;overflow-x:hidden}.font-size{font-size:13px}.nav-tabs .nav-link.active{border-top:2px solid #4c8fbd!important;background:#fff}.nav-tabs .nav-link{background-color:#f9f9f9;color:#6b6b6b;cursor:pointer;border-bottom:1px solid #e9ecef}.list-group-item .name{font-weight:700}.list-group-item .email{white-space:nowrap}.list-group-item:hover{background-color:#f5f5f5;cursor:pointer}.list-group-item img{max-width:50px!important;height:50px;width:50px;padding:1px;border:1px solid #ebebeb;background-size:cover;background-repeat:no-repeat;background-position:center;content:\"\";display:block}.list-group-item.selected{background-color:#63abf7!important;border:1px solid #779!important;color:#fff}"]
            }] }
];
/** @nocollapse */
ModalSelectComponent.ctorParameters = () => [
    { type: CoreService },
    { type: BsModalService }
];
ModalSelectComponent.propDecorators = {
    selectUsers: [{ type: Input, args: ['selectUsers',] }],
    isSingle: [{ type: Input, args: ['isSingle',] }],
    selectModal: [{ type: ViewChild, args: ['selectModal',] }]
};
if (false) {
    /** @type {?} */
    ModalSelectComponent.prototype.selectUsers;
    /** @type {?} */
    ModalSelectComponent.prototype.isSingle;
    /** @type {?} */
    ModalSelectComponent.prototype.selectModal;
    /** @type {?} */
    ModalSelectComponent.prototype.modalRef;
    /** @type {?} */
    ModalSelectComponent.prototype.users;
    /** @type {?} */
    ModalSelectComponent.prototype.key;
    /**
     * @type {?}
     * @private
     */
    ModalSelectComponent.prototype.timer;
    /**
     * @type {?}
     * @private
     */
    ModalSelectComponent.prototype.coreService;
    /**
     * @type {?}
     * @private
     */
    ModalSelectComponent.prototype.modalService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtc2VsZWN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtdWkvIiwic291cmNlcyI6WyJzcmMvc2VsZWN0LXVzZXIvbW9kYWwtc2VsZWN0L21vZGFsLXNlbGVjdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkUsT0FBTyxFQUFhLGNBQWMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6RCxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sV0FBVyxDQUFDO0FBUXRDLE1BQU0sT0FBTyxvQkFBb0I7Ozs7O0lBVy9CLFlBQXFCLFdBQXdCLEVBQ3hCLFlBQTRCO1FBRDVCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLGlCQUFZLEdBQVosWUFBWSxDQUFnQjtRQVgzQixnQkFBVyxHQUFVLEVBQUUsQ0FBQztRQU05QyxVQUFLLEdBQVUsRUFBRSxDQUFDO0lBS21DLENBQUM7Ozs7SUFFdEQsVUFBVTtRQUNSLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO0lBQ3hCLENBQUM7Ozs7SUFFRCxVQUFVO1FBQ1IsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzs7WUFDckIsS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLElBQUksRUFBRTtRQUMxQixJQUFJLENBQUMsS0FBSyxHQUFHLFVBQVU7OztRQUFDLEdBQUcsRUFBRTtZQUMzQixJQUFJLENBQUMsV0FBVyxDQUFDLGlCQUFpQixDQUFDLEVBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFDOzs7O1lBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTs7b0JBQ3RFLEtBQUssR0FBRyxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUU7Z0JBQ3ZDLElBQUksQ0FBQyxRQUFRLENBQUMs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bnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBUZW1wbGF0ZVJlZiwgVmlld0NoaWxkfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7QnNNb2RhbFJlZiwgQnNNb2RhbFNlcnZpY2V9IGZyb20gXCJuZ3gtYm9vdHN0cmFwXCI7XG5pbXBvcnQge0NvcmVTZXJ2aWNlfSBmcm9tIFwiaW5ldC1jb3JlXCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FwcC1tb2RhbC1zZWxlY3QnLFxuICB0ZW1wbGF0ZVVybDogJy4vbW9kYWwtc2VsZWN0LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbW9kYWwtc2VsZWN0LmNvbXBvbmVudC5jc3MnXVxuXG59KVxuZXhwb3J0IGNsYXNzIE1vZGFsU2VsZWN0Q29tcG9uZW50e1xuICBASW5wdXQoJ3NlbGVjdFVzZXJzJykgc2VsZWN0VXNlcnM6IGFueVtdID0gW107XG4gIEBJbnB1dCgnaXNTaW5nbGUnKSBpc1NpbmdsZTogYm9vbGVhbjtcblxuICBAVmlld0NoaWxkKCdzZWxlY3RNb2RhbCcpIHNlbGVjdE1vZGFsOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIG1vZGFsUmVmOiBCc01vZGFsUmVmO1xuICB1c2VyczogYW55W10gPSBbXTtcbiAga2V5OiBzdHJpbmc7XG4gIHByaXZhdGUgdGltZXI6IGFueTtcblxuICBjb25zdHJ1Y3RvciggcHJpdmF0ZSBjb3JlU2VydmljZTogQ29yZVNlcnZpY2UsXG4gICAgICAgICAgICAgICBwcml2YXRlIG1vZGFsU2VydmljZTogQnNNb2RhbFNlcnZpY2UpIHsgfVxuXG4gIHNldERlZmF1bHQoKSB7XG4gICAgdGhpcy5zZWxlY3RVc2VycyA9IFtdO1xuICB9XG5cbiAgc2VhcmNoVXNlcigpIHtcbiAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lcik7XG4gICAgbGV0IHZhbHVlID0gdGhpcy5rZXkgfHwgJyc7XG4gICAgdGhpcy50aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5jb3JlU2VydmljZS5zZWFyY2hGaXJtQWNjb3VudCh7a2V5d29yZDogdmFsdWUsIHBhZ2VTaXplOiAxMH0sIChkYXRhKSA9PiB7XG4gICAgICAgIGxldCB1c2VycyA9IGRhdGEgJiYgZGF0YVsnaXRlbXMnXSB8fCBbXTtcbiAgICAgICAgdGhpcy5zZXRVc2Vycyh1c2Vycyk7XG4gICAgICB9KTtcbiAgICB9LDMwMCk7XG4gIH1cblxuICBhZGRVc2VyKGl0ZW06IGFueSl7XG4gICAgaWYodGhpcy5pc1NpbmdsZSl7XG4gICAgICBpZih0aGlzLnNlbGVjdFVzZXJzWzBdKXtcbiAgICAgICAgdGhpcy51c2Vycy5wdXNoKHRoaXMuc2VsZWN0VXNlcnNbMF0pO1xuICAgICAgfVxuICAgICAgdGhpcy5zZWxlY3RVc2Vyc1swXSA9IGl0ZW07XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5zZWxlY3RVc2Vycy5sZW5ndGg7IGkrKyl7XG4gICAgICAgIGlmKHRoaXMuc2VsZWN0VXNlcnNbaV0udXNlcm5hbWUgPT09IGl0ZW0udXNlcm5hbWUpe1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy5zZWxlY3RVc2Vycy5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgICB0aGlzLnNldFVzZXJzKHRoaXMudXNlcnMpO1xuICB9XG5cbiAgcmVtb3ZlVXNlcihpdGVtOiBhbnkpe1xuICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLnNlbGVjdFVzZXJzLmxlbmd0aDsgaSsrKXtcbiAgICAgIGlmKHRoaXMuc2VsZWN0VXNlcnNbaV0udXNlcm5hbWUgPT09IGl0ZW0udXNlcm5hbWUpe1xuICAgICAgICB0aGlzLnVzZXJzLnB1c2goaXRlbSk7XG4gICAgICAgIHRoaXMuc2VsZWN0VXNlcnMuc3BsaWNlKGksIDEpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc2hvdygpe1xuICAgIHRoaXMuc2VhcmNoVXNlcigpO1xuICAgIHRoaXMubW9kYWxSZWYgPSB0aGlzLm1vZGFsU2VydmljZS5zaG93KHRoaXMuc2VsZWN0TW9kYWwpO1xuICB9XG5cbiAgaGlkZSgpe1xuICAgIHRoaXMubW9kYWxSZWYuaGlkZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBoYXNVc2VyKHVzZXIpOiBib29sZWFuIHtcbiAgICBmb3IgKGxldCBpdGVtIG9mIHRoaXMuc2VsZWN0VXNlcnMpIHtcbiAgICAgIGlmIChpdGVtLnVzZXJuYW1lID09PSB1c2VyLnVzZXJuYW1lKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBwcml2YXRlIHNldFVzZXJzKHVzZXJzOiBhbnlbXSkge1xuICAgIHRoaXMudXNlcnMgPSB1c2Vycy5maWx0ZXIoKGl0ZW0pID0+ICF0aGlzLmhhc1VzZXIoaXRlbSkpO1xuICB9XG59XG4iXX0=