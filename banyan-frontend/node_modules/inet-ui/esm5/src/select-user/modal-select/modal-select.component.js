/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { BsModalService } from "ngx-bootstrap";
import { CoreService } from "inet-core";
var ModalSelectComponent = /** @class */ (function () {
    function ModalSelectComponent(coreService, modalService) {
        this.coreService = coreService;
        this.modalService = modalService;
        this.selectUsers = [];
        this.users = [];
    }
    /**
     * @return {?}
     */
    ModalSelectComponent.prototype.setDefault = /**
     * @return {?}
     */
    function () {
        this.selectUsers = [];
    };
    /**
     * @return {?}
     */
    ModalSelectComponent.prototype.searchUser = /**
     * @return {?}
     */
    function () {
        var _this = this;
        clearTimeout(this.timer);
        /** @type {?} */
        var value = this.key || '';
        this.timer = setTimeout((/**
         * @return {?}
         */
        function () {
            _this.coreService.searchFirmAccount({ keyword: value, pageSize: 10 }, (/**
             * @param {?} data
             * @return {?}
             */
            function (data) {
                /** @type {?} */
                var users = data && data['items'] || [];
                _this.setUsers(users);
            }));
        }), 300);
    };
    /**
     * @param {?} item
     * @return {?}
     */
    ModalSelectComponent.prototype.addUser = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        if (this.isSingle) {
            if (this.selectUsers[0]) {
                this.users.push(this.selectUsers[0]);
            }
            this.selectUsers[0] = item;
        }
        else {
            for (var i = 0; i < this.selectUsers.length; i++) {
                if (this.selectUsers[i].username === item.username) {
                    return;
                }
            }
            this.selectUsers.push(item);
        }
        this.setUsers(this.users);
    };
    /**
     * @param {?} item
     * @return {?}
     */
    ModalSelectComponent.prototype.removeUser = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        for (var i = 0; i < this.selectUsers.length; i++) {
            if (this.selectUsers[i].username === item.username) {
                this.users.push(item);
                this.selectUsers.splice(i, 1);
                return;
            }
        }
    };
    /**
     * @return {?}
     */
    ModalSelectComponent.prototype.show = /**
     * @return {?}
     */
    function () {
        this.searchUser();
        this.modalRef = this.modalService.show(this.selectModal);
    };
    /**
     * @return {?}
     */
    ModalSelectComponent.prototype.hide = /**
     * @return {?}
     */
    function () {
        this.modalRef.hide();
    };
    /**
     * @private
     * @param {?} user
     * @return {?}
     */
    ModalSelectComponent.prototype.hasUser = /**
     * @private
     * @param {?} user
     * @return {?}
     */
    function (user) {
        var e_1, _a;
        try {
            for (var _b = tslib_1.__values(this.selectUsers), _c = _b.next(); !_c.done; _c = _b.next()) {
                var item = _c.value;
                if (item.username === user.username) {
                    return true;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return false;
    };
    /**
     * @private
     * @param {?} users
     * @return {?}
     */
    ModalSelectComponent.prototype.setUsers = /**
     * @private
     * @param {?} users
     * @return {?}
     */
    function (users) {
        var _this = this;
        this.users = users.filter((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return !_this.hasUser(item); }));
    };
    ModalSelectComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-modal-select',
                    template: "<ng-template #selectModal>\n    <div class=\"modal-header border-0\">\n        <h5 class=\"modal-title pull-left\"><i class=\"fa fa-users\"></i> Ch\u1ECDn ng\u01B0\u1EDDi d\u00F9ng </h5>\n        <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"hide()\">\n            <span aria-hidden=\"true\">&times;</span>\n        </button>\n    </div>\n    <div class=\"modal-body p-0 font-size\">\n        <div class=\"col-sm-12 border-bottom\">\n            <div class=\"input-group input-group-sm\" style=\"padding-bottom: 10px;\">\n                <input (input)=\"searchUser()\"\n                       [(ngModel)]=\"key\" type=\"text\" class=\"form-control\" placeholder=\"T\u00ECm ki\u1EBFm\">\n                <div class=\"input-group-append\">\n                    <span class=\"input-group-text\" (click)=\"searchUser()\">\n                        <i class=\"fa fa-search\"></i>\n                    </span>\n                </div>\n            </div>\n        </div>\n        <nav class=\"nav nav-tabs\">\n            <span class=\"nav-item nav-link active rounded-0\" href=\"#nav-book\" data-toggle=\"tab\"  role=\"tab\">\n                <i class=\"fa fa-group\"></i> T\u1EA5t c\u1EA3\n            </span>\n            <span class=\"nav-item nav-link rounded-0\" href=\"#nav-book-select\" data-toggle=\"tab\" role=\"tab\">\n                <i class=\"fa fa-check-circle\"></i> \u0110\u00E3 ch\u1ECDn\n                <span [hidden]=\"selectUsers?.length<1\" class=\"ml-1 badge badge-primary rounded-circle\">{{ selectUsers?.length }}</span>\n            </span>\n        </nav>\n        <div class=\"tab-content\">\n            <div id=\"nav-book\" class=\"tab-pane fade active show\" role=\"tabpanel\" aria-labelledby=\"nav-home-tab\" aria-expanded=\"true\">\n                <ul class=\"list-group rounded-0\"\n                    [ngClass]=\"{'p-3':users?.length > 0}\">\n                    <li *ngFor=\"let user of users\"\n                        (click)=\"addUser(user)\"\n                        class=\"list-group-item rounded-0\">\n                        <div class=\"row\">\n                            <div class=\"col-sm-2\">\n                                <img userAvatar [usercode]=\"user?.username\" class=\"rounded-circle\">\n                            </div>\n                            <div class=\"col-sm-10\">\n                                <span class=\"name\">{{user.fullname}}</span>\n                                <br>\n                                <span class=\"email text-muted\"><i class=\"fa fa-envelope\"></i>&nbsp;{{user.username}}</span>\n                            </div>\n                        </div>\n                        <div class=\"clearfix\"></div>\n                    </li>\n                    <li *ngIf=\"users?.length<1\" class=\"list-group-item rounded-0 border-0\">\n                        <i>Kh\u00F4ng t\u00ECm th\u1EA5y d\u1EEF li\u1EC7u</i>\n                    </li>\n                </ul>\n            </div>\n            <div id=\"nav-book-select\"\n                 class=\"tab-pane fade\" role=\"tabpanel\" aria-labelledby=\"nav-profile-tab\" aria-expanded=\"false\">\n                <ul class=\"list-group rounded-0\"\n                    [ngClass]=\"{'p-3':selectUsers?.length > 0}\">\n                    <li *ngFor=\"let user of selectUsers\"\n                        (click)=\"removeUser(user)\"\n                        class=\"list-group-item rounded-0 selected\">\n                        <div class=\"row\">\n                            <div class=\"col-sm-2\">\n                                <img userAvatar [usercode]=\"user?.username\" class=\"rounded-circle\">\n                            </div>\n                            <div class=\"col-sm-10\">\n                                <span class=\"name\">{{user.fullname}}</span>\n                                <br>\n                                <span class=\"email\"><i class=\"fa fa-envelope\"></i>&nbsp;{{user.username}}</span>\n                            </div>\n                        </div>\n                        <div class=\"clearfix\"></div>\n                    </li>\n                    <li *ngIf=\"selectUsers?.length<1\" class=\"list-group-item rounded-0 border-0\">\n                        <i>Kh\u00F4ng t\u00ECm th\u1EA5y d\u1EEF li\u1EC7u</i>\n                    </li>\n                </ul>\n            </div>\n        </div>\n    </div>\n    <div class=\"modal-footer text-right\">\n        <button type=\"button\" class=\"btn btn-danger btn-sm\" (click)=\"hide()\"><i class=\"fa fa-remove\"></i> \u0110\u00F3ng</button>\n    </div>\n</ng-template>",
                    styles: [".tab-content{height:391px;overflow-x:hidden}.font-size{font-size:13px}.nav-tabs .nav-link.active{border-top:2px solid #4c8fbd!important;background:#fff}.nav-tabs .nav-link{background-color:#f9f9f9;color:#6b6b6b;cursor:pointer;border-bottom:1px solid #e9ecef}.list-group-item .name{font-weight:700}.list-group-item .email{white-space:nowrap}.list-group-item:hover{background-color:#f5f5f5;cursor:pointer}.list-group-item img{max-width:50px!important;height:50px;width:50px;padding:1px;border:1px solid #ebebeb;background-size:cover;background-repeat:no-repeat;background-position:center;content:\"\";display:block}.list-group-item.selected{background-color:#63abf7!important;border:1px solid #779!important;color:#fff}"]
                }] }
    ];
    /** @nocollapse */
    ModalSelectComponent.ctorParameters = function () { return [
        { type: CoreService },
        { type: BsModalService }
    ]; };
    ModalSelectComponent.propDecorators = {
        selectUsers: [{ type: Input, args: ['selectUsers',] }],
        isSingle: [{ type: Input, args: ['isSingle',] }],
        selectModal: [{ type: ViewChild, args: ['selectModal',] }]
    };
    return ModalSelectComponent;
}());
export { ModalSelectComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtc2VsZWN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtdWkvIiwic291cmNlcyI6WyJzcmMvc2VsZWN0LXVzZXIvbW9kYWwtc2VsZWN0L21vZGFsLXNlbGVjdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZFLE9BQU8sRUFBYSxjQUFjLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekQsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLFdBQVcsQ0FBQztBQUV0QztJQWlCRSw4QkFBcUIsV0FBd0IsRUFDeEIsWUFBNEI7UUFENUIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsaUJBQVksR0FBWixZQUFZLENBQWdCO1FBWDNCLGdCQUFXLEdBQVUsRUFBRSxDQUFDO1FBTTlDLFVBQUssR0FBVSxFQUFFLENBQUM7SUFLbUMsQ0FBQzs7OztJQUV0RCx5Q0FBVTs7O0lBQVY7UUFDRSxJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztJQUN4QixDQUFDOzs7O0lBRUQseUNBQVU7OztJQUFWO1FBQUEsaUJBU0M7UUFSQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDOztZQUNyQixLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsSUFBSSxFQUFFO1FBQzFCLElBQUksQ0FBQyxLQUFLLEdBQUcsVUFBVTs7O1FBQUM7WUFDdEIsS0FBSSxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBQzs7OztZQUFFLFVBQUMsSUFBSTs7b0JBQ2xFLEtBQUssR0FBRyxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUU7Z0JBQ3ZDLEtBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENB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QTlFWSxvQkFBb0I7OztJQUMvQiwyQ0FBOEM7O0lBQzlDLHdDQUFxQzs7SUFFckMsMkNBQXdEOztJQUV4RCx3Q0FBcUI7O0lBQ3JCLHFDQUFrQjs7SUFDbEIsbUNBQVk7Ozs7O0lBQ1oscUNBQW1COzs7OztJQUVOLDJDQUFnQzs7Ozs7SUFDaEMsNENBQW9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBUZW1wbGF0ZVJlZiwgVmlld0NoaWxkfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7QnNNb2RhbFJlZiwgQnNNb2RhbFNlcnZpY2V9IGZyb20gXCJuZ3gtYm9vdHN0cmFwXCI7XG5pbXBvcnQge0NvcmVTZXJ2aWNlfSBmcm9tIFwiaW5ldC1jb3JlXCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FwcC1tb2RhbC1zZWxlY3QnLFxuICB0ZW1wbGF0ZVVybDogJy4vbW9kYWwtc2VsZWN0LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbW9kYWwtc2VsZWN0LmNvbXBvbmVudC5jc3MnXVxuXG59KVxuZXhwb3J0IGNsYXNzIE1vZGFsU2VsZWN0Q29tcG9uZW50e1xuICBASW5wdXQoJ3NlbGVjdFVzZXJzJykgc2VsZWN0VXNlcnM6IGFueVtdID0gW107XG4gIEBJbnB1dCgnaXNTaW5nbGUnKSBpc1NpbmdsZTogYm9vbGVhbjtcblxuICBAVmlld0NoaWxkKCdzZWxlY3RNb2RhbCcpIHNlbGVjdE1vZGFsOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIG1vZGFsUmVmOiBCc01vZGFsUmVmO1xuICB1c2VyczogYW55W10gPSBbXTtcbiAga2V5OiBzdHJpbmc7XG4gIHByaXZhdGUgdGltZXI6IGFueTtcblxuICBjb25zdHJ1Y3RvciggcHJpdmF0ZSBjb3JlU2VydmljZTogQ29yZVNlcnZpY2UsXG4gICAgICAgICAgICAgICBwcml2YXRlIG1vZGFsU2VydmljZTogQnNNb2RhbFNlcnZpY2UpIHsgfVxuXG4gIHNldERlZmF1bHQoKSB7XG4gICAgdGhpcy5zZWxlY3RVc2VycyA9IFtdO1xuICB9XG5cbiAgc2VhcmNoVXNlcigpIHtcbiAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lcik7XG4gICAgbGV0IHZhbHVlID0gdGhpcy5rZXkgfHwgJyc7XG4gICAgdGhpcy50aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5jb3JlU2VydmljZS5zZWFyY2hGaXJtQWNjb3VudCh7a2V5d29yZDogdmFsdWUsIHBhZ2VTaXplOiAxMH0sIChkYXRhKSA9PiB7XG4gICAgICAgIGxldCB1c2VycyA9IGRhdGEgJiYgZGF0YVsnaXRlbXMnXSB8fCBbXTtcbiAgICAgICAgdGhpcy5zZXRVc2Vycyh1c2Vycyk7XG4gICAgICB9KTtcbiAgICB9LDMwMCk7XG4gIH1cblxuICBhZGRVc2VyKGl0ZW06IGFueSl7XG4gICAgaWYodGhpcy5pc1NpbmdsZSl7XG4gICAgICBpZih0aGlzLnNlbGVjdFVzZXJzWzBdKXtcbiAgICAgICAgdGhpcy51c2Vycy5wdXNoKHRoaXMuc2VsZWN0VXNlcnNbMF0pO1xuICAgICAgfVxuICAgICAgdGhpcy5zZWxlY3RVc2Vyc1swXSA9IGl0ZW07XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5zZWxlY3RVc2Vycy5sZW5ndGg7IGkrKyl7XG4gICAgICAgIGlmKHRoaXMuc2VsZWN0VXNlcnNbaV0udXNlcm5hbWUgPT09IGl0ZW0udXNlcm5hbWUpe1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy5zZWxlY3RVc2Vycy5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgICB0aGlzLnNldFVzZXJzKHRoaXMudXNlcnMpO1xuICB9XG5cbiAgcmVtb3ZlVXNlcihpdGVtOiBhbnkpe1xuICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLnNlbGVjdFVzZXJzLmxlbmd0aDsgaSsrKXtcbiAgICAgIGlmKHRoaXMuc2VsZWN0VXNlcnNbaV0udXNlcm5hbWUgPT09IGl0ZW0udXNlcm5hbWUpe1xuICAgICAgICB0aGlzLnVzZXJzLnB1c2goaXRlbSk7XG4gICAgICAgIHRoaXMuc2VsZWN0VXNlcnMuc3BsaWNlKGksIDEpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc2hvdygpe1xuICAgIHRoaXMuc2VhcmNoVXNlcigpO1xuICAgIHRoaXMubW9kYWxSZWYgPSB0aGlzLm1vZGFsU2VydmljZS5zaG93KHRoaXMuc2VsZWN0TW9kYWwpO1xuICB9XG5cbiAgaGlkZSgpe1xuICAgIHRoaXMubW9kYWxSZWYuaGlkZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBoYXNVc2VyKHVzZXIpOiBib29sZWFuIHtcbiAgICBmb3IgKGxldCBpdGVtIG9mIHRoaXMuc2VsZWN0VXNlcnMpIHtcbiAgICAgIGlmIChpdGVtLnVzZXJuYW1lID09PSB1c2VyLnVzZXJuYW1lKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBwcml2YXRlIHNldFVzZXJzKHVzZXJzOiBhbnlbXSkge1xuICAgIHRoaXMudXNlcnMgPSB1c2Vycy5maWx0ZXIoKGl0ZW0pID0+ICF0aGlzLmhhc1VzZXIoaXRlbSkpO1xuICB9XG59XG4iXX0=