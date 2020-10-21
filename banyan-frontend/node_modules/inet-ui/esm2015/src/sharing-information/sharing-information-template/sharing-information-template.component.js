/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Observable, of, Subject } from "rxjs";
import { SharingInformationService } from "../sharing-information.service";
import { NotificationService } from "inet-core";
export class SharingInformationTemplateComponent {
    /**
     * @param {?} sharingInformationService
     * @param {?} notification
     */
    constructor(sharingInformationService, notification) {
        this.sharingInformationService = sharingInformationService;
        this.notification = notification;
        this.page = 0;
        this.limit = 10;
        this.finishLoading = false;
        this.dataTables = [];
        this.searchData = [];
        this.searchTerm$ = new Subject();
        this.destroy$ = new Subject();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.onSearchUsers();
        this.loadTableData();
        this.onDocumentClick = this.onDocumentClick.bind(this);
        document.addEventListener('click', this.onDocumentClick);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        document.removeEventListener('click', this.onDocumentClick);
    }
    /**
     * @param {?} val
     * @return {?}
     */
    mapApplicationData(val) {
        if (val.organId !== 'community' && val.pattern !== 'calista' && val.firmContext && val.pattern) {
            return {
                "appName": val.firmContext,
                "appIcon": val.icon
            };
        }
    }
    /**
     * @return {?}
     */
    loadTableData() {
        this.sharingInformationService.getApplicationList({}).concatMap((/**
         * @param {?} data
         * @return {?}
         */
        data => {
            if (data && data.elements) {
                return of(data.elements.map((/**
                 * @param {?} item
                 * @return {?}
                 */
                item => this.mapApplicationData(item))).filter((/**
                 * @param {?} item
                 * @return {?}
                 */
                item => item)));
            }
            return of(null);
        }))
            .concatMap((/**
         * @param {?} appInfo
         * @return {?}
         */
        (appInfo) => {
            this.dataTableInfo = appInfo || [];
            /** @type {?} */
            let appNames = appInfo.map((/**
             * @param {?} item
             * @return {?}
             */
            item => item.appName));
            if (appNames.length) {
                /** @type {?} */
                let __sources = appNames.map((/**
                 * @param {?} appname
                 * @param {?} index
                 * @return {?}
                 */
                (appname, index) => this.sharingInformationService.getApplicationRights({ appname: appname })));
                return Observable.concat(...__sources);
            }
            return of(null);
        }))
            .concatMap((/**
         * @param {?} data
         * @return {?}
         */
        (data) => {
            if (data && data.length) {
                this.dataTables.push(data);
                return this.sharingInformationService.getUserRights({ appname: data[0].application });
            }
            else {
                this.dataTableInfo = this.dataTableInfo.filter((/**
                 * @param {?} item
                 * @return {?}
                 */
                item => item.appName !== data.appname));
            }
            return of(null);
        }))
            .subscribe((/**
         * @param {?} data
         * @return {?}
         */
        data => {
            if (data && data.total) {
                /** @type {?} */
                let __userData = data.items || [];
                this.dataTables.forEach((/**
                 * @param {?} items
                 * @return {?}
                 */
                (items) => {
                    items.forEach((/**
                     * @param {?} table
                     * @return {?}
                     */
                    table => {
                        table.onSearch = false;
                        table.hidden = false;
                        /** @type {?} */
                        let __users = __userData.filter((/**
                         * @param {?} __user
                         * @return {?}
                         */
                        __user => __user.group == table.category && __user.application == table.application));
                        if (__users.length && __users[0].application == table.application) {
                            table.data = __users || [];
                            table.data = this.mergeValueInArray(table.data);
                        }
                    }));
                }));
            }
        }), (/**
         * @return {?}
         */
        () => {
        }), (/**
         * @return {?}
         */
        () => {
            this.finishLoading = true;
            // console.log(this.dataTables);
        }));
    }
    /**
     * @param {?} subItem
     * @return {?}
     */
    onToggleTable(subItem) {
        if (iNet.isEmpty(subItem.hidden)) {
            subItem.hidden = false;
        }
        else {
            subItem.hidden = !subItem.hidden;
        }
    }
    /**
     * @param {?} subItem
     * @return {?}
     */
    onSetSubItem(subItem) {
        this.subItem = subItem;
    }
    /**
     * @param {?} arr
     * @return {?}
     */
    mergeValueInArray(arr) {
        arr.forEach((/**
         * @param {?} item
         * @return {?}
         */
        (item) => {
            // console.log(arr);
            /** @type {?} */
            let __users = arr.filter((/**
             * @param {?} data
             * @return {?}
             */
            data => data.member === item.member)) || [];
            if (__users.length > 1) {
                arr = arr.filter((/**
                 * @param {?} val
                 * @return {?}
                 */
                val => val.member !== item.member));
                /** @type {?} */
                let __right = __users.map((/**
                 * @param {?} user
                 * @return {?}
                 */
                user => user.right)).join(",");
                /** @type {?} */
                let __uuids = __users.map((/**
                 * @param {?} user
                 * @return {?}
                 */
                user => [user.right, user.uuid]));
                // let __user: any={};
                arr.push(Object.assign({}, __users[0], { right: __right, uuids: __uuids }));
                // console.log(arr);
            }
            arr.forEach((/**
             * @param {?} item
             * @return {?}
             */
            item => {
                if (!item.uuids) {
                    item.uuids = [[item.right, item.uuid]];
                }
            }));
        }));
        return arr;
    }
    /**
     * @param {?} user
     * @param {?} subItem
     * @param {?} $event
     * @return {?}
     */
    onCheckUserRight(user, subItem, $event) {
        /** @type {?} */
        let __checked = $event.target.checked;
        /** @type {?} */
        let __value = $event.target.value;
        if (__checked) {
            this.sharingInformationService.updateUserRight({
                appname: user.application,
                member: user.member,
                right: __value,
                group: user.group,
            }).subscribe((/**
             * @param {?} data
             * @return {?}
             */
            data => {
                if (data && data.member) {
                    subItem.data.push(data);
                    /** @type {?} */
                    let __users = subItem.data.filter((/**
                     * @param {?} item
                     * @return {?}
                     */
                    item => item.member === data.member && item.uuid)) || [];
                    if (__users.length > 1) {
                        /** @type {?} */
                        let __right = __users.map((/**
                         * @param {?} user
                         * @return {?}
                         */
                        user => user.right)).join(",");
                        subItem.data.forEach((/**
                         * @param {?} item
                         * @return {?}
                         */
                        item => {
                            if (item.member == data.member && item.uuids) {
                                item.right = __right;
                                item.uuids.push([__value, data.uuid]);
                            }
                        }));
                    }
                    if (__users.length === 1) {
                        /** @type {?} */
                        let __right = __users.map((/**
                         * @param {?} user
                         * @return {?}
                         */
                        user => user.right)).join(",");
                        /** @type {?} */
                        let __uuids = __users.map((/**
                         * @param {?} user
                         * @return {?}
                         */
                        user => [user.right, user.uuid]));
                        subItem.data.push(Object.assign({}, __users[0], { right: __right, uuids: __uuids }));
                    }
                    subItem.data = subItem.data.filter((/**
                     * @param {?} item
                     * @return {?}
                     */
                    item => item.uuids));
                    // console.log("----->", subItem.data);
                    this.notification.showMessage("Đã chia sẻ dữ liệu cho " + data.member, "success", "Chia sẻ dữ liệu");
                }
                else {
                    this.notification.showMessage("Có lỗi xảy ra khi chia sẻ dữ liệu cho " + user.member, "error", "Chia sẻ dữ liệu");
                }
            }));
        }
        else {
            /** @type {?} */
            let __item = user.uuids.filter((/**
             * @param {?} item
             * @return {?}
             */
            item => item[0] == __value))[0] || [];
            this.sharingInformationService.deleteUserRight({
                appname: user.application,
                uuid: __item[1] || user.uuid
            }).subscribe((/**
             * @param {?} data
             * @return {?}
             */
            data => {
                if (data && data.uuid) {
                    /** @type {?} */
                    let __index = user.uuids.findIndex((/**
                     * @param {?} item
                     * @return {?}
                     */
                    item => item[1] == data.uuid));
                    user.uuids.splice(__index, 1);
                    /** @type {?} */
                    let __rights = user.right.split(",").filter((/**
                     * @param {?} name
                     * @return {?}
                     */
                    name => name !== __value));
                    user.right = __rights.join(",");
                    if (!user.uuids.length) {
                        // console.log("innnn");
                        /** @type {?} */
                        let index = subItem.data.findIndex((/**
                         * @param {?} item
                         * @return {?}
                         */
                        item => item.member === user.member));
                        index > -1 ? subItem.data.splice(index, 1) : '';
                    }
                    this.notification.showMessage("Đã hủy chia sẻ dữ liệu cho " + user.member, "success", "Chia sẻ dữ liệu");
                }
                else {
                    this.notification.showMessage("Có lỗi xảy ra khi chia dữ liệu cho " + user.member, "error", "Chia sẻ dữ liệu");
                }
            }));
        }
    }
    /**
     * @param {?} $event
     * @param {?} subItem
     * @return {?}
     */
    onKeyUp($event, subItem) {
        /** @type {?} */
        let __keyword = $event.target.value || "";
        this.searchTerm$.next(__keyword);
    }
    /**
     * @return {?}
     */
    onSearchUsers() {
        this.searchTerm$
            .delay(50)
            .debounceTime(200)
            .switchMap((/**
         * @param {?} keyword
         * @return {?}
         */
        (keyword) => {
            this.keyword = keyword;
            return keyword ? this.sharingInformationService.getSuggestUser({ keyword: keyword }) : of(null);
        }))
            .subscribe((/**
         * @param {?} data
         * @return {?}
         */
        (data) => {
            /** @type {?} */
            let __data = data ? data.items || [] : [];
            if (__data.length) {
                __data = __data.filter((/**
                 * @param {?} item
                 * @return {?}
                 */
                item => item.username !== iNet.username));
            }
            this.searchData = __data;
            if (this.subItem.data) {
                /** @type {?} */
                let __temp = this.subItem.data.map((/**
                 * @param {?} item
                 * @return {?}
                 */
                item => item.member));
                this.searchData = this.searchData.filter((/**
                 * @param {?} data
                 * @return {?}
                 */
                data => !__temp.includes(data.username)));
            }
        }));
    }
    /**
     * @param {?} subItem
     * @param {?} user
     * @return {?}
     */
    onChooseUser(subItem, user) {
        this.keyword = '';
        this.searchTerm$.next("");
        this.searchData = [];
        /** @type {?} */
        let __user = {
            application: subItem.application,
            member: user.username,
            right: "",
            group: subItem.category,
        };
        this.__userOnAdd = __user;
        if (!subItem.data) {
            subItem.data = [];
        }
        subItem.data.push(__user);
    }
    /**
     * @param {?} subItem
     * @return {?}
     */
    onFocusSearchOut(subItem) {
        setTimeout((/**
         * @return {?}
         */
        () => {
            this.searchData = [];
            subItem.onSearch = false;
        }), 300);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onDocumentClick(event) {
        if (this.suggestElement && this.suggestElement.nativeElement.contains(event.target)) {
            return;
        }
        this.searchData = [];
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    scrollMouse($event) {
        /** @type {?} */
        const target = $event.target;
        if (this.searchData.length !== this.total && (target.offsetHeight + target.scrollTop >= target.scrollHeight)) {
            this.page++;
            this.sharingInformationService.getSuggestUser({
                pageSize: this.limit,
                pageNumber: this.page,
                keyword: this.keyword
            }).subscribe((/**
             * @param {?} data
             * @return {?}
             */
            (data) => {
                /** @type {?} */
                let newData = data.items || [];
                this.searchData = this.searchData.concat(newData);
            }));
        }
    }
}
SharingInformationTemplateComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-sharing-information-template',
                template: "<div *ngIf=\"finishLoading\" class=\"sharing-table-wrapper custom-toolbar\">\n    <div *ngFor=\"let tableInfo of dataTableInfo; let index = index\" class=\"sharing-table-container\">\n        <div class=\"sharing-table-header\">\n            <div class=\"sharing-table-header-wrapper\">\n                <div class=\"d-flex\">\n                    <div class=\"sharing-table-popicon\">\n                        <img class=\"p-1 plugin-icon float-left application-icon\"\n                             [src]=\"tableInfo.appIcon\" onerror=\"this.onerror=null; this.src='https://media.inetcloud.vn/images/unicorn/app.png'\">\n                    </div>\n                    <div class=\"sharing-table-application\">\n                        <span class=\"mr-2\" style=\"text-transform: capitalize\">{{tableInfo.appName}}</span>\n                    </div>\n                </div>\n            </div>\n            <div *ngFor=\"let item of dataTables; let  index=index\" class=\"row m-0 pr-2 pl-2\">\n                <div *ngFor=\"let subItem of item; let subIndex= index\" class=\"col-lg-12\">\n                    <div *ngIf=\"subItem.application == tableInfo.appName\">\n                        <div class=\"right-name\" [style.marginBottom]=\"subItem.hidden?'6px':''\" (click)=\"onToggleTable(subItem)\"\n                             [style.background]=\"subItem.hidden==false?'#ededed':'#ededed'\">\n                            <div class=\"right-icon\">\n                                <i class=\"fa fa-angle-right\" [ngClass]=\"subItem.hidden==false?'fa-angle-down':''\"\n                                   aria-hidden=\"true\"></i>\n                            </div>\n                            {{subItem.category || \"\"}}\n                        </div>\n                        <div [hidden]=\"subItem.hidden\" class=\"table-wrapper col-lg-12 p-0\">\n                            <div class=\"table-responsive custom-toolbar\">\n                                <table class=\"table\">\n                                    <thead>\n                                    <tr>\n                                        <th id=\"user-name\" scope=\"col\">T\u00E0i kho\u1EA3n</th>\n                                        <th *ngFor=\"let right of subItem.rights; let rightIndex = index\" scope=\"col\"\n                                            style=\"text-transform: capitalize\">{{right}}</th>\n                                        <!--                                        <th></th>-->\n                                    </tr>\n                                    </thead>\n                                    <tbody style=\"position:relative\">\n                                    <tr class=\"user-search p-0 d-flex align-items-center\" style=\"margin-bottom: 36px\">\n                                        <td style=\"width: 100%; border:none;padding: 6px 0 0\">\n                                            <div class=\"input-group input-group-sm p-0 position-absolute\">\n                                                <div class=\"input-group-prepend\">\n                                                    <span class=\"input-group-text\" id=\"basic-addon1\" style=\"height: 30px\">\n                                                        <i class=\"fa fa-search\" aria-hidden=\"true\"></i></span>\n                                                </div>\n                                                <input (keyup)=\"onKeyUp($event, subItem)\" type=\"text\"\n                                                       (focusin)=\"subItem.onSearch = true; onSetSubItem(subItem)\"\n                                                       (focusout)=\"onFocusSearchOut(subItem)\"\n                                                       class=\"form-control form-control-sm\"\n                                                       placeholder=\"T\u00ECm t\u00E0i kho\u1EA3n\" aria-label=\"Username\"\n                                                       aria-describedby=\"basic-addon1\" style=\"height: 30px\">\n                                                <div #suggestEle (scroll)=\"scrollMouse($event)\"\n                                                     *ngIf=\"subItem.onSearch && searchData.length\"\n                                                     class=\"form-invitation-popover custom-toolbar\">\n                                                    <div *ngFor=\"let user of searchData; let i=index\"\n                                                         (click)=\"onChooseUser(subItem, user)\"\n                                                         class=\"popover-data d-flex\">\n                                                        <div class=\"user-avatar mr-2\">\n                                                            <img class=\"user-avatar-custom\" userAvatar\n                                                                 [usercode]=\"user.username\">\n                                                        </div>\n                                                        <div class=\"user-info-wrapper\">\n                                                            <div class=\"user-name\">\n                                                                {{user.fullname || \"\"}}\n                                                            </div>\n                                                            <div class=\"user-email\">\n                                                                {{user.username}}\n                                                            </div>\n                                                        </div>\n                                                    </div>\n                                                </div>\n                                            </div>\n                                        </td>\n                                    </tr>\n                                    <tr *ngFor=\"let user of subItem.data\">\n                                        <td>{{user.member}}</td>\n                                        <td *ngFor=\"let right of subItem.rights;\">\n                                            <div class=\"custom-control custom-checkbox ml-2\">\n                                                <input (click)=\"onCheckUserRight(user, subItem, $event)\"\n                                                       [checked]=\"user.right.includes(right)\" [value]=\"right\"\n                                                       type=\"checkbox\" class=\"custom-control-input\"\n                                                       [id]=\"user.application+user.member+subItem.category+right\">\n                                                <label class=\"custom-control-label\"\n                                                       [for]=\"user.application+user.member+subItem.category+right\"><span\n                                                        class=\"hidden-span\">a</span></label>\n                                            </div>\n                                        </td>\n                                    </tr>\n                                    </tbody>\n                                </table>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n",
                styles: [".sharing-table-wrapper{background:#fff;padding:0 20px}.sharing-table-wrapper .hidden-span{visibility:hidden}.sharing-table-wrapper table tr td:not(:first-child),.sharing-table-wrapper table tr th:not(:first-child){text-align:center}.sharing-table-wrapper table tbody tr td{padding:6px}.sharing-table-wrapper #user-name{font-weight:400;width:180px}.sharing-table-wrapper .sharing-table-container .sharing-table-header .sharing-table-header-wrapper{display:flex;justify-content:space-between;padding-bottom:4px;color:#366dd0}.sharing-table-wrapper .sharing-table-container .sharing-table-header .sharing-table-header-wrapper .sharing-table-popicon{margin-right:6px;font-size:21px}.sharing-table-wrapper .sharing-table-container .sharing-table-header .sharing-table-header-wrapper .sharing-table-popicon .application-icon{height:40px}.sharing-table-wrapper .sharing-table-container .sharing-table-header .sharing-table-header-wrapper .sharing-table-application{font-size:1.4em;font-weight:700;display:flex;align-items:center}.sharing-table-wrapper .sharing-table-container .sharing-table-header .user-search .form-invitation-popover{max-height:150px;width:100%;z-index:5;background:#fff;border:.5px solid #d3d3d3;border-radius:.1rem;overflow-x:hidden;overflow-y:scroll;top:32px}.sharing-table-wrapper .sharing-table-container .sharing-table-header .user-search .form-invitation-popover .popover-data{padding:6px;cursor:pointer;border-bottom:1px solid #f0f0f0}.sharing-table-wrapper .sharing-table-container .sharing-table-header .user-search .form-invitation-popover .popover-data:hover{background:#d5f1ff}.sharing-table-wrapper .sharing-table-container .sharing-table-header .user-search .form-invitation-popover .popover-data .user-avatar-custom{width:33px;height:33px;border:1px solid #e3e3e3}.sharing-table-wrapper .sharing-table-container .sharing-table-header .user-search .form-invitation-popover .popover-data .user-info-wrapper{display:flex;flex-direction:column}.sharing-table-wrapper .sharing-table-container .sharing-table-header .user-search .form-invitation-popover .popover-data .user-info-wrapper .user-email{font-size:80%}.right-name{font-size:16px;padding:6px 3px;border-radius:.2rem;font-weight:700;display:flex;cursor:pointer}.right-name:hover{background:#ededed!important}.right-icon{margin-right:10px}@-webkit-keyframes slidein{0%{margin-top:-12px}100%{margin-top:0}}@keyframes slidein{0%{margin-top:-12px}100%{margin-top:0}}.table-wrapper{-webkit-animation-name:slidein;animation-name:slidein;-webkit-animation-duration:.25s;animation-duration:.25s;display:block}"]
            }] }
];
/** @nocollapse */
SharingInformationTemplateComponent.ctorParameters = () => [
    { type: SharingInformationService },
    { type: NotificationService }
];
SharingInformationTemplateComponent.propDecorators = {
    suggestElement: [{ type: ViewChild, args: ['suggestEle',] }]
};
if (false) {
    /** @type {?} */
    SharingInformationTemplateComponent.prototype.total;
    /** @type {?} */
    SharingInformationTemplateComponent.prototype.page;
    /** @type {?} */
    SharingInformationTemplateComponent.prototype.limit;
    /** @type {?} */
    SharingInformationTemplateComponent.prototype.keyword;
    /** @type {?} */
    SharingInformationTemplateComponent.prototype.finishLoading;
    /** @type {?} */
    SharingInformationTemplateComponent.prototype.subItem;
    /** @type {?} */
    SharingInformationTemplateComponent.prototype.dataTables;
    /** @type {?} */
    SharingInformationTemplateComponent.prototype.searchData;
    /** @type {?} */
    SharingInformationTemplateComponent.prototype.dataTableInfo;
    /** @type {?} */
    SharingInformationTemplateComponent.prototype.searchTerm$;
    /** @type {?} */
    SharingInformationTemplateComponent.prototype.destroy$;
    /**
     * @type {?}
     * @private
     */
    SharingInformationTemplateComponent.prototype.__userOnAdd;
    /** @type {?} */
    SharingInformationTemplateComponent.prototype.suggestElement;
    /**
     * @type {?}
     * @private
     */
    SharingInformationTemplateComponent.prototype.sharingInformationService;
    /**
     * @type {?}
     * @private
     */
    SharingInformationTemplateComponent.prototype.notification;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmluZy1pbmZvcm1hdGlvbi10ZW1wbGF0ZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbmV0LXVpLyIsInNvdXJjZXMiOlsic3JjL3NoYXJpbmctaW5mb3JtYXRpb24vc2hhcmluZy1pbmZvcm1hdGlvbi10ZW1wbGF0ZS9zaGFyaW5nLWluZm9ybWF0aW9uLXRlbXBsYXRlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQVUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZFLE9BQU8sRUFBQyxVQUFVLEVBQUUsRUFBRSxFQUFFLE9BQU8sRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUM3QyxPQUFPLEVBQUMseUJBQXlCLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQztBQUN6RSxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFTOUMsTUFBTSxPQUFPLG1DQUFtQzs7Ozs7SUFrQjVDLFlBQW9CLHlCQUFvRCxFQUNwRCxZQUFpQztRQURqQyw4QkFBeUIsR0FBekIseUJBQXlCLENBQTJCO1FBQ3BELGlCQUFZLEdBQVosWUFBWSxDQUFxQjtRQWpCckQsU0FBSSxHQUFHLENBQUMsQ0FBQztRQUNULFVBQUssR0FBRyxFQUFFLENBQUM7UUFFWCxrQkFBYSxHQUFZLEtBQUssQ0FBQztRQUcvQixlQUFVLEdBQVUsRUFBRSxDQUFDO1FBQ3ZCLGVBQVUsR0FBVSxFQUFFLENBQUM7UUFHdkIsZ0JBQVcsR0FBRyxJQUFJLE9BQU8sRUFBVSxDQUFDO1FBQ3BDLGFBQVEsR0FBcUIsSUFBSSxPQUFPLEVBQVcsQ0FBQztJQU9wRCxDQUFDOzs7O0lBRUQsUUFBUTtRQUNKLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FB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LENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3RELENBQUMsRUFBQyxDQUFDO1NBQ047SUFDTCxDQUFDOzs7WUFyUUosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxrQ0FBa0M7Z0JBQzVDLHd0T0FBNEQ7O2FBRS9EOzs7O1lBVE8seUJBQXlCO1lBQ3pCLG1CQUFtQjs7OzZCQXlCdEIsU0FBUyxTQUFDLFlBQVk7Ozs7SUFmdkIsb0RBQWM7O0lBQ2QsbURBQVM7O0lBQ1Qsb0RBQVc7O0lBQ1gsc0RBQWdCOztJQUNoQiw0REFBK0I7O0lBRS9CLHNEQUFhOztJQUNiLHlEQUF1Qjs7SUFDdkIseURBQXVCOztJQUN2Qiw0REFBbUI7O0lBRW5CLDBEQUFvQzs7SUFDcEMsdURBQW9EOzs7OztJQUVwRCwwREFBeUI7O0lBQ3pCLDZEQUFvRDs7Ozs7SUFFeEMsd0VBQTREOzs7OztJQUM1RCwyREFBeUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgRWxlbWVudFJlZiwgT25Jbml0LCBWaWV3Q2hpbGR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtPYnNlcnZhYmxlLCBvZiwgU3ViamVjdH0gZnJvbSBcInJ4anNcIjtcbmltcG9ydCB7U2hhcmluZ0luZm9ybWF0aW9uU2VydmljZX0gZnJvbSBcIi4uL3NoYXJpbmctaW5mb3JtYXRpb24uc2VydmljZVwiO1xuaW1wb3J0IHtOb3RpZmljYXRpb25TZXJ2aWNlfSBmcm9tIFwiaW5ldC1jb3JlXCI7XG5cbmRlY2xhcmUgbGV0IGlOZXQ6IGFueTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhcHAtc2hhcmluZy1pbmZvcm1hdGlvbi10ZW1wbGF0ZScsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3NoYXJpbmctaW5mb3JtYXRpb24tdGVtcGxhdGUuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3NoYXJpbmctaW5mb3JtYXRpb24tdGVtcGxhdGUuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBTaGFyaW5nSW5mb3JtYXRpb25UZW1wbGF0ZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgdG90YWw6IG51bWJlcjtcbiAgICBwYWdlID0gMDtcbiAgICBsaW1pdCA9IDEwO1xuICAgIGtleXdvcmQ6IHN0cmluZztcbiAgICBmaW5pc2hMb2FkaW5nOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBzdWJJdGVtOiBhbnk7XG4gICAgZGF0YVRhYmxlczogYW55W10gPSBbXTtcbiAgICBzZWFyY2hEYXRhOiBhbnlbXSA9IFtdO1xuICAgIGRhdGFUYWJsZUluZm86IGFueTtcblxuICAgIHNlYXJjaFRlcm0kID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xuICAgIGRlc3Ryb3kkOiBTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IFN1YmplY3Q8Ym9vbGVhbj4oKTtcblxuICAgIHByaXZhdGUgX191c2VyT25BZGQ6IGFueTtcbiAgICBAVmlld0NoaWxkKCdzdWdnZXN0RWxlJykgc3VnZ2VzdEVsZW1lbnQ6IEVsZW1lbnRSZWY7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNoYXJpbmdJbmZvcm1hdGlvblNlcnZpY2U6IFNoYXJpbmdJbmZvcm1hdGlvblNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBub3RpZmljYXRpb246IE5vdGlmaWNhdGlvblNlcnZpY2UpIHtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5vblNlYXJjaFVzZXJzKCk7XG4gICAgICAgIHRoaXMubG9hZFRhYmxlRGF0YSgpO1xuICAgICAgICB0aGlzLm9uRG9jdW1lbnRDbGljayA9IHRoaXMub25Eb2N1bWVudENsaWNrLmJpbmQodGhpcyk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vbkRvY3VtZW50Q2xpY2spO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub25Eb2N1bWVudENsaWNrKTtcbiAgICB9XG5cbiAgICBtYXBBcHBsaWNhdGlvbkRhdGEodmFsOiBhbnkpIHtcbiAgICAgICAgaWYodmFsLm9yZ2FuSWQgIT09ICdjb21tdW5pdHknICYmIHZhbC5wYXR0ZXJuICE9PSAnY2FsaXN0YScgJiYgdmFsLmZpcm1Db250ZXh0ICYmICB2YWwucGF0dGVybil7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIFwiYXBwTmFtZVwiOiB2YWwuZmlybUNvbnRleHQsXG4gICAgICAgICAgICAgICAgXCJhcHBJY29uXCI6IHZhbC5pY29uXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBsb2FkVGFibGVEYXRhKCkge1xuICAgICAgICB0aGlzLnNoYXJpbmdJbmZvcm1hdGlvblNlcnZpY2UuZ2V0QXBwbGljYXRpb25MaXN0KHt9KS5jb25jYXRNYXAoZGF0YSA9PiB7XG4gICAgICAgICAgICBpZiAoZGF0YSAmJiBkYXRhLmVsZW1lbnRzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9mKGRhdGEuZWxlbWVudHMubWFwKGl0ZW0gPT4gdGhpcy5tYXBBcHBsaWNhdGlvbkRhdGEoaXRlbSkpLmZpbHRlcihpdGVtPT5pdGVtKSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBvZihudWxsKVxuICAgICAgICB9KVxuICAgICAgICAgICAgLmNvbmNhdE1hcCgoYXBwSW5mbykgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0YVRhYmxlSW5mbyA9IGFwcEluZm8gfHwgW107XG4gICAgICAgICAgICAgICAgbGV0IGFwcE5hbWVzID0gYXBwSW5mby5tYXAoaXRlbSA9PiBpdGVtLmFwcE5hbWUpO1xuICAgICAgICAgICAgICAgIGlmIChhcHBOYW1lcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IF9fc291cmNlcyA9IGFwcE5hbWVzLm1hcCgoYXBwbmFtZSwgaW5kZXgpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNoYXJpbmdJbmZvcm1hdGlvblNlcnZpY2UuZ2V0QXBwbGljYXRpb25SaWdodHMoe2FwcG5hbWU6IGFwcG5hbWV9KSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlLmNvbmNhdCguLi5fX3NvdXJjZXMpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBvZihudWxsKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jb25jYXRNYXAoKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YSAmJiBkYXRhLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFUYWJsZXMucHVzaChkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2hhcmluZ0luZm9ybWF0aW9uU2VydmljZS5nZXRVc2VyUmlnaHRzKHthcHBuYW1lOiBkYXRhWzBdLmFwcGxpY2F0aW9ufSk7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YVRhYmxlSW5mbz10aGlzLmRhdGFUYWJsZUluZm8uZmlsdGVyKGl0ZW09Pml0ZW0uYXBwTmFtZSAhPT0gZGF0YS5hcHBuYW1lKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gb2YobnVsbClcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3Vic2NyaWJlKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChkYXRhICYmIGRhdGEudG90YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IF9fdXNlckRhdGE6IGFueVtdID0gZGF0YS5pdGVtcyB8fCBbXTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhVGFibGVzLmZvckVhY2goKGl0ZW1zOiBhbnlbXSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXMuZm9yRWFjaCh0YWJsZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFibGUub25TZWFyY2ggPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWJsZS5oaWRkZW4gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgX191c2VycyA9IF9fdXNlckRhdGEuZmlsdGVyKF9fdXNlciA9PiBfX3VzZXIuZ3JvdXAgPT0gdGFibGUuY2F0ZWdvcnkgJiYgX191c2VyLmFwcGxpY2F0aW9uID09IHRhYmxlLmFwcGxpY2F0aW9uKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfX3VzZXJzLmxlbmd0aCAmJiBfX3VzZXJzWzBdLmFwcGxpY2F0aW9uID09IHRhYmxlLmFwcGxpY2F0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhYmxlLmRhdGEgPSBfX3VzZXJzIHx8IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWJsZS5kYXRhID0gdGhpcy5tZXJnZVZhbHVlSW5BcnJheSh0YWJsZS5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sICgpID0+IHtcblxuICAgICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZmluaXNoTG9hZGluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5kYXRhVGFibGVzKTtcbiAgICAgICAgICAgIH0pXG4gICAgfVxuXG4gICAgb25Ub2dnbGVUYWJsZShzdWJJdGVtOiBhbnkpIHtcbiAgICAgICAgaWYgKGlOZXQuaXNFbXB0eShzdWJJdGVtLmhpZGRlbikpIHtcbiAgICAgICAgICAgIHN1Ykl0ZW0uaGlkZGVuID0gZmFsc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdWJJdGVtLmhpZGRlbiA9ICFzdWJJdGVtLmhpZGRlblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25TZXRTdWJJdGVtKHN1Ykl0ZW06IGFueSkge1xuICAgICAgICB0aGlzLnN1Ykl0ZW0gPSBzdWJJdGVtO1xuICAgIH1cblxuICAgIG1lcmdlVmFsdWVJbkFycmF5KGFycjogYW55W10pIHtcbiAgICAgICAgYXJyLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGFycik7XG4gICAgICAgICAgICBsZXQgX191c2VyczogYW55W10gPSBhcnIuZmlsdGVyKGRhdGEgPT4gZGF0YS5tZW1iZXIgPT09IGl0ZW0ubWVtYmVyKSB8fCBbXTtcbiAgICAgICAgICAgIGlmIChfX3VzZXJzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICBhcnIgPSBhcnIuZmlsdGVyKHZhbCA9PiB2YWwubWVtYmVyICE9PSBpdGVtLm1lbWJlcik7XG4gICAgICAgICAgICAgICAgbGV0IF9fcmlnaHQ6IHN0cmluZyA9IF9fdXNlcnMubWFwKHVzZXIgPT4gdXNlci5yaWdodCkuam9pbihcIixcIik7XG4gICAgICAgICAgICAgICAgbGV0IF9fdXVpZHM6IGFueVtdID0gX191c2Vycy5tYXAodXNlciA9PiBbdXNlci5yaWdodCwgdXNlci51dWlkXSk7XG4gICAgICAgICAgICAgICAgLy8gbGV0IF9fdXNlcjogYW55PXt9O1xuICAgICAgICAgICAgICAgIGFyci5wdXNoKHsuLi5fX3VzZXJzWzBdLCByaWdodDogX19yaWdodCwgdXVpZHM6IF9fdXVpZHN9KTtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhhcnIpO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhcnIuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIWl0ZW0udXVpZHMpIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS51dWlkcyA9IFtbaXRlbS5yaWdodCwgaXRlbS51dWlkXV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gYXJyO1xuICAgIH1cblxuICAgIG9uQ2hlY2tVc2VyUmlnaHQodXNlcjogYW55LCBzdWJJdGVtOiBhbnksICRldmVudDogYW55KSB7XG4gICAgICAgIGxldCBfX2NoZWNrZWQgPSAkZXZlbnQudGFyZ2V0LmNoZWNrZWQ7XG4gICAgICAgIGxldCBfX3ZhbHVlID0gJGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICAgICAgaWYgKF9fY2hlY2tlZCkge1xuICAgICAgICAgICAgdGhpcy5zaGFyaW5nSW5mb3JtYXRpb25TZXJ2aWNlLnVwZGF0ZVVzZXJSaWdodCh7XG4gICAgICAgICAgICAgICAgYXBwbmFtZTogdXNlci5hcHBsaWNhdGlvbixcbiAgICAgICAgICAgICAgICBtZW1iZXI6IHVzZXIubWVtYmVyLFxuICAgICAgICAgICAgICAgIHJpZ2h0OiBfX3ZhbHVlLFxuICAgICAgICAgICAgICAgIGdyb3VwOiB1c2VyLmdyb3VwLFxuICAgICAgICAgICAgICAgIC8vIHV1aWQ6IHVzZXIudXVpZFxuICAgICAgICAgICAgfSkuc3Vic2NyaWJlKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChkYXRhICYmIGRhdGEubWVtYmVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHN1Ykl0ZW0uZGF0YS5wdXNoKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgX191c2VyczogYW55W10gPSBzdWJJdGVtLmRhdGEuZmlsdGVyKGl0ZW0gPT4gaXRlbS5tZW1iZXIgPT09IGRhdGEubWVtYmVyICYmIGl0ZW0udXVpZCkgfHwgW107XG4gICAgICAgICAgICAgICAgICAgIGlmIChfX3VzZXJzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBfX3JpZ2h0OiBzdHJpbmcgPSBfX3VzZXJzLm1hcCh1c2VyID0+IHVzZXIucmlnaHQpLmpvaW4oXCIsXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3ViSXRlbS5kYXRhLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0ubWVtYmVyID09IGRhdGEubWVtYmVyICYmIGl0ZW0udXVpZHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5yaWdodCA9IF9fcmlnaHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0udXVpZHMucHVzaChbX192YWx1ZSwgZGF0YS51dWlkXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoX191c2Vycy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBfX3JpZ2h0OiBzdHJpbmcgPSBfX3VzZXJzLm1hcCh1c2VyID0+IHVzZXIucmlnaHQpLmpvaW4oXCIsXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IF9fdXVpZHM6IGFueVtdID0gX191c2Vycy5tYXAodXNlciA9PiBbdXNlci5yaWdodCwgdXNlci51dWlkXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWJJdGVtLmRhdGEucHVzaCh7Li4uX191c2Vyc1swXSwgcmlnaHQ6IF9fcmlnaHQsIHV1aWRzOiBfX3V1aWRzfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc3ViSXRlbS5kYXRhID0gc3ViSXRlbS5kYXRhLmZpbHRlcihpdGVtPT5pdGVtLnV1aWRzKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCItLS0tLT5cIiwgc3ViSXRlbS5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb24uc2hvd01lc3NhZ2UoXCLEkMOjIGNoaWEgc+G6uyBk4buvIGxp4buHdSBjaG8gXCIgKyBkYXRhLm1lbWJlciwgXCJzdWNjZXNzXCIsIFwiQ2hpYSBz4bq7IGThu68gbGnhu4d1XCIpXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb24uc2hvd01lc3NhZ2UoXCJDw7MgbOG7l2kgeOG6o3kgcmEga2hpIGNoaWEgc+G6uyBk4buvIGxp4buHdSBjaG8gXCIgKyB1c2VyLm1lbWJlciwgXCJlcnJvclwiLCBcIkNoaWEgc+G6uyBk4buvIGxp4buHdVwiKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgX19pdGVtOiBhbnlbXSA9IHVzZXIudXVpZHMuZmlsdGVyKGl0ZW0gPT4gaXRlbVswXSA9PSBfX3ZhbHVlKVswXSB8fCBbXTtcbiAgICAgICAgICAgIHRoaXMuc2hhcmluZ0luZm9ybWF0aW9uU2VydmljZS5kZWxldGVVc2VyUmlnaHQoe1xuICAgICAgICAgICAgICAgIGFwcG5hbWU6IHVzZXIuYXBwbGljYXRpb24sXG4gICAgICAgICAgICAgICAgdXVpZDogX19pdGVtWzFdIHx8IHVzZXIudXVpZFxuICAgICAgICAgICAgfSkuc3Vic2NyaWJlKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChkYXRhICYmIGRhdGEudXVpZCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgX19pbmRleCA9IHVzZXIudXVpZHMuZmluZEluZGV4KGl0ZW0gPT4gaXRlbVsxXSA9PSBkYXRhLnV1aWQpO1xuICAgICAgICAgICAgICAgICAgICB1c2VyLnV1aWRzLnNwbGljZShfX2luZGV4LCAxKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IF9fcmlnaHRzID0gdXNlci5yaWdodC5zcGxpdChcIixcIikuZmlsdGVyKG5hbWUgPT4gbmFtZSAhPT0gX192YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHVzZXIucmlnaHQgPSBfX3JpZ2h0cy5qb2luKFwiLFwiKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF1c2VyLnV1aWRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJpbm5ublwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IHN1Ykl0ZW0uZGF0YS5maW5kSW5kZXgoaXRlbSA9PiBpdGVtLm1lbWJlciA9PT0gdXNlci5tZW1iZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXggPiAtMSA/IHN1Ykl0ZW0uZGF0YS5zcGxpY2UoaW5kZXgsIDEpIDogJyc7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb24uc2hvd01lc3NhZ2UoXCLEkMOjIGjhu6d5IGNoaWEgc+G6uyBk4buvIGxp4buHdSBjaG8gXCIgKyB1c2VyLm1lbWJlciwgXCJzdWNjZXNzXCIsIFwiQ2hpYSBz4bq7IGThu68gbGnhu4d1XCIpXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb24uc2hvd01lc3NhZ2UoXCJDw7MgbOG7l2kgeOG6o3kgcmEga2hpIGNoaWEgZOG7ryBsaeG7h3UgY2hvIFwiICsgdXNlci5tZW1iZXIsIFwiZXJyb3JcIiwgXCJDaGlhIHPhursgZOG7ryBsaeG7h3VcIilcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBvbktleVVwKCRldmVudDogYW55LCBzdWJJdGVtOiBhbnkpIHtcbiAgICAgICAgbGV0IF9fa2V5d29yZCA9ICRldmVudC50YXJnZXQudmFsdWUgfHwgXCJcIjtcbiAgICAgICAgdGhpcy5zZWFyY2hUZXJtJC5uZXh0KF9fa2V5d29yZCk7XG4gICAgfVxuXG4gICAgb25TZWFyY2hVc2VycygpIHtcbiAgICAgICAgdGhpcy5zZWFyY2hUZXJtJFxuICAgICAgICAgICAgLmRlbGF5KDUwKVxuICAgICAgICAgICAgLmRlYm91bmNlVGltZSgyMDApXG4gICAgICAgICAgICAuc3dpdGNoTWFwKChrZXl3b3JkOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmtleXdvcmQgPSBrZXl3b3JkO1xuICAgICAgICAgICAgICAgIHJldHVybiBrZXl3b3JkID8gdGhpcy5zaGFyaW5nSW5mb3JtYXRpb25TZXJ2aWNlLmdldFN1Z2dlc3RVc2VyKHtrZXl3b3JkOiBrZXl3b3JkfSkgOiBvZihudWxsKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKGRhdGE6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBfX2RhdGE6IGFueVtdID0gZGF0YSA/IGRhdGEuaXRlbXMgfHwgW10gOiBbXTtcbiAgICAgICAgICAgICAgICBpZiAoX19kYXRhLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBfX2RhdGEgPSBfX2RhdGEuZmlsdGVyKGl0ZW0gPT4gaXRlbS51c2VybmFtZSAhPT0gaU5ldC51c2VybmFtZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoRGF0YSA9IF9fZGF0YTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zdWJJdGVtLmRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IF9fdGVtcDogYW55W10gPSB0aGlzLnN1Ykl0ZW0uZGF0YS5tYXAoaXRlbSA9PiBpdGVtLm1lbWJlcik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoRGF0YSA9IHRoaXMuc2VhcmNoRGF0YS5maWx0ZXIoZGF0YSA9PiAhX190ZW1wLmluY2x1ZGVzKGRhdGEudXNlcm5hbWUpKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgfVxuXG4gICAgb25DaG9vc2VVc2VyKHN1Ykl0ZW06IGFueSwgdXNlcjogYW55KSB7XG4gICAgICAgIHRoaXMua2V5d29yZCA9ICcnO1xuICAgICAgICB0aGlzLnNlYXJjaFRlcm0kLm5leHQoXCJcIik7XG4gICAgICAgIHRoaXMuc2VhcmNoRGF0YSA9IFtdO1xuICAgICAgICBsZXQgX191c2VyOiBhbnkgPSB7XG4gICAgICAgICAgICBhcHBsaWNhdGlvbjogc3ViSXRlbS5hcHBsaWNhdGlvbixcbiAgICAgICAgICAgIG1lbWJlcjogdXNlci51c2VybmFtZSxcbiAgICAgICAgICAgIHJpZ2h0OiBcIlwiLFxuICAgICAgICAgICAgZ3JvdXA6IHN1Ykl0ZW0uY2F0ZWdvcnksXG4gICAgICAgICAgICAvLyB1dWlkOiBpTmV0LmdlbmVyYXRlSWQoKVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLl9fdXNlck9uQWRkID0gX191c2VyO1xuICAgICAgICBpZiAoIXN1Ykl0ZW0uZGF0YSkge1xuICAgICAgICAgICAgc3ViSXRlbS5kYXRhID0gW107XG4gICAgICAgIH1cbiAgICAgICAgc3ViSXRlbS5kYXRhLnB1c2goX191c2VyKTtcbiAgICB9XG5cbiAgICBvbkZvY3VzU2VhcmNoT3V0KHN1Ykl0ZW06IGFueSkge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoRGF0YSA9IFtdO1xuICAgICAgICAgICAgc3ViSXRlbS5vblNlYXJjaCA9IGZhbHNlO1xuICAgICAgICB9LCAzMDApXG4gICAgfVxuXG4gICAgb25Eb2N1bWVudENsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLnN1Z2dlc3RFbGVtZW50ICYmIHRoaXMuc3VnZ2VzdEVsZW1lbnQubmF0aXZlRWxlbWVudC5jb250YWlucyhldmVudC50YXJnZXQpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZWFyY2hEYXRhID0gW107XG4gICAgfVxuXG4gICAgc2Nyb2xsTW91c2UoJGV2ZW50OiBhbnkpIHtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gJGV2ZW50LnRhcmdldDtcbiAgICAgICAgaWYgKHRoaXMuc2VhcmNoRGF0YS5sZW5ndGggIT09IHRoaXMudG90YWwgJiYgKHRhcmdldC5vZmZzZXRIZWlnaHQgKyB0YXJnZXQuc2Nyb2xsVG9wID49IHRhcmdldC5zY3JvbGxIZWlnaHQpKSB7XG4gICAgICAgICAgICB0aGlzLnBhZ2UrKztcbiAgICAgICAgICAgIHRoaXMuc2hhcmluZ0luZm9ybWF0aW9uU2VydmljZS5nZXRTdWdnZXN0VXNlcih7XG4gICAgICAgICAgICAgICAgcGFnZVNpemU6IHRoaXMubGltaXQsXG4gICAgICAgICAgICAgICAgcGFnZU51bWJlcjogdGhpcy5wYWdlLFxuICAgICAgICAgICAgICAgIGtleXdvcmQ6IHRoaXMua2V5d29yZFxuICAgICAgICAgICAgfSkuc3Vic2NyaWJlKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IG5ld0RhdGEgPSBkYXRhLml0ZW1zIHx8IFtdO1xuICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoRGF0YSA9IHRoaXMuc2VhcmNoRGF0YS5jb25jYXQobmV3RGF0YSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==