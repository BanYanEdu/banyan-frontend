/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { ChatMessageService } from "../../message.service";
import { WebSocketClientService } from "inet-core";
export class ContactListComponent {
    /**
     * @param {?} messageService
     * @param {?} webSocketService
     */
    constructor(messageService, webSocketService) {
        this.messageService = messageService;
        this.webSocketService = webSocketService;
        this.contactSelected = new EventEmitter();
        this.roomSelected = new EventEmitter();
        this.callTo = new EventEmitter();
        this.contacts = [];
        this.userInteract = false;
        this.lastPage = false;
        this.username = iNet.username;
        this.fullname = iNet.displayName;
        this._pageNumber = 0;
        this._pageSize = 20;
        this._loading = false;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this._contactEl = $(this.contactRef.nativeElement);
        this._detectUserInteract();
        this.searchContacts();
        this._statusObserver = this.messageService.socketService.onStateChange.subscribe((/**
         * @return {?}
         */
        () => {
            if (this.messageService.socketService.closed) {
                this.statusText = 'Kết nối không thành công';
            }
            else if (this.messageService.socketService.connecting) {
                this.statusText = 'Đang kết nối';
            }
            else if (this.messageService.socketService.connected) {
                this.statusText = '';
            }
        }));
        // Scroll bottom load more
        this._contactEl.on('scroll', (/**
         * @param {?} e
         * @return {?}
         */
        (e) => {
            if (this._loading || this.lastPage) {
                return;
            }
            if (e.target.scrollTop + e.target.clientHeight > e.target.scrollHeight - 100) {
                this.loadContacts();
            }
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this._statusObserver) {
            this._statusObserver.unsubscribe();
            this._statusObserver = null;
        }
    }
    /**
     * @param {?} contact
     * @return {?}
     */
    selectContact(contact) {
        this.contactSelected.emit(contact);
    }
    /**
     * @param {?=} value
     * @return {?}
     */
    searchContacts(value = '') {
        value = value.toLowerCase().trim();
        if (value === this._keyword) {
            return;
        }
        this._keyword = value;
        this.messageService.searchContacts(value, (/**
         * @param {?} contacts
         * @return {?}
         */
        (contacts) => {
            this._pageNumber = 0;
            this._loading = false;
            this._contacts = contacts;
            this.contacts.length = 0;
            this.loadContacts();
        }));
    }
    /**
     * @return {?}
     */
    loadContacts() {
        if (!this.userInteract || this._loading || !this._contacts) {
            return;
        }
        /** @type {?} */
        const begin = this._pageNumber * this._pageSize;
        this.lastPage = this._contacts && this._contacts.length < begin;
        if (this.lastPage) {
            return;
        }
        this._loading = true;
        this.contacts = this.contacts.concat(this._contacts.slice(begin, begin + this._pageSize));
        this.contacts.forEach((/**
         * @param {?} ele
         * @return {?}
         */
        ele => {
            /** @type {?} */
            let __mes = this.messageService.revertMessage(ele.message) || '';
            /** @type {?} */
            let __mesDisplay = this.messageService.revertMessageDisplay(ele.message) || '';
            /** @type {?} */
            let typeMessages = __mes.split(":");
            if (typeMessages.length > 0) {
                if (typeMessages[0] === 'uri_message' && (typeMessages[1] === 'video_conference...' || typeMessages[1] === 'video_conference')) {
                    ele.message = '<i class="fa fa-phone pr-1" aria-hidden="true"></i> Cuộc gọi thoại';
                    return ele;
                }
                else {
                    if (typeMessages[0] === 'uri_message' && typeMessages[1] === 'link_preview...') {
                        ele.message = __mesDisplay;
                        return ele;
                    }
                    else {
                        return ele;
                    }
                }
            }
        }));
        setTimeout((/**
         * @return {?}
         */
        () => {
            this._loading = false;
            this._pageNumber++;
        }), 300);
        this.selectContact(this.contacts[0]);
    }
    /**
     * @param {?} str
     * @return {?}
     */
    decodeBase64(str) {
        return decodeURIComponent(escape(window.atob(str)));
    }
    /**
     * @private
     * @return {?}
     */
    _detectUserInteract() {
        this._timer = setInterval((/**
         * @return {?}
         */
        () => {
            if (this._contactEl.is(':visible')) {
                this.userInteract = true;
                this.loadContacts();
                clearInterval(this._timer);
                this._timer = null;
            }
        }), 100);
    }
    /**
     * @param {?} roomName
     * @return {?}
     */
    selectRoom(roomName) {
        this.roomSelected.emit(roomName);
    }
    /**
     * @param {?} usercode
     * @return {?}
     */
    callToContact(usercode) {
        this.callTo.emit(usercode);
    }
}
ContactListComponent.decorators = [
    { type: Component, args: [{
                selector: 'message-contact-list',
                template: "<div  class=\"contact bg-white\" role=\"button\">\n    <div  class=\"contact-online online\" >\n        <img class=\"contact-image\" userAvatar [usercode]=\"username\">\n    </div>\n    <div  class=\"contact-content\">\n        <div  class=\"contact-name\">{{fullname}}</div>\n    </div>\n    <div  style=\"white-space: nowrap\"><i  class=\"message-chat__action fa fa-ellipsis-v\"></i>\n    </div>\n</div>\n\n<div class=\"contact-list__search\">\n    <search-input [placeholder]=\"'T\u00ECm ki\u1EBFm ...'\" (onChanged)=\"searchContacts($event)\"></search-input>\n    <!--    <div class=\"text-center m-1\">-->\n    <!--        <button (click)=\"selectRoom('company')\" type=\"button\" class=\"btn btn-block btn-light\">-->\n    <!--            <i class=\"fa fa-video-camera\"></i> Cu\u1ED9c h\u1ECDp c\u00F4ng ty</button>-->\n    <!--    </div>-->\n</div>\n<div #contactRef class=\"contact-list__body\">\n    <div *ngFor=\"let contact of contacts\" class=\"contact\" role=\"button\" (click)=\"selectContact(contact)\">\n        <div class=\"contact-online\" [ngClass]=\"{'online': contact.online,'offline': !contact.online }\">\n            <img class=\"contact-image\" userAvatar [usercode]=\"contact.usercode\">\n        </div>\n        <div class=\"contact-content\">\n            <div class=\"contact-name\">{{contact.fullname || contact.usercode}}</div>\n            <div class=\"contact-detail\" [innerHTML]=\"contact.message\"></div>\n        </div>\n        <div *ngIf=\"contact.unread\" class=\"contact-icon badge badge-danger\" style=\"margin-right: 5px\">\n            {{contact.unread}}\n        </div>\n        <div *ngIf=\"contact.usercode !== username\" (click)=\"callToContact(contact)\" style=\"white-space: nowrap\"><i\n                class=\"message-chat__action fa fa-phone\"></i></div>\n        <!--        <i class=\"contact-icon fa fa-circle text-secondary\" [ngClass]=\"{'text-success': contact.online}\"></i>-->\n    </div>\n</div>\n<!--<ul class=\"chat-main\">-->\n<!--    <li data-to=\"blank\">-->\n<!--        <div class=\"chat-box\">-->\n<!--            <div class=\"profile offline bg-size\" style=\"background-image: url(&quot;../assets/images/contact/1.jpg&quot;); background-size: cover; background-position: center center; display: block;\"><img class=\"bg-img\" src=\"../assets/images/contact/1.jpg\" alt=\"Avatar\" style=\"display: none;\"></div>-->\n<!--            <div class=\"details\">-->\n<!--                <h5>Josephin water</h5>-->\n<!--                <h6>Hi, i am josephin. How are you.. ! There are many variations of passages.</h6>-->\n<!--            </div>-->\n<!--            <div class=\"date-status\"><i class=\"ti-pin2\"></i>-->\n<!--                <h6>22/10/19</h6>-->\n<!--                <h6 class=\"font-success status\"> Seen</h6>-->\n<!--            </div>-->\n<!--        </div>-->\n<!--    </li>-->\n<!--    <li class=\"active\" data-to=\"chating\">-->\n<!--        <div class=\"chat-box\">-->\n<!--            <div class=\"profile online bg-size\" style=\"background-image: url(&quot;../assets/images/contact/2.jpg&quot;); background-size: cover; background-position: center center; display: block;\"><img class=\"bg-img\" src=\"../assets/images/contact/2.jpg\" alt=\"Avatar\" style=\"display: none;\"></div>-->\n<!--            <div class=\"details\">-->\n<!--                <h5>Jony Lynetin</h5>-->\n<!--                <h6>Typing................</h6>-->\n<!--            </div>-->\n<!--            <div class=\"date-status\"><i class=\"ti-pin2\"></i>-->\n<!--                <h6>30/11/19</h6>-->\n<!--                <div class=\"badge badge-primary sm\">8</div>-->\n<!--            </div>-->\n<!--        </div>-->\n<!--    </li>-->\n<!--    <li data-to=\"blank\">-->\n<!--        <div class=\"chat-box\">-->\n<!--            <div class=\"profile unreachable bg-size\" style=\"background-image: url(&quot;../assets/images/contact/3.jpg&quot;); background-size: cover; background-position: center center; display: block;\"><img class=\"bg-img\" src=\"../assets/images/contact/3.jpg\" alt=\"Avatar\" style=\"display: none;\"></div>-->\n<!--            <div class=\"details\">-->\n<!--                <h5>Sufiya Elija</h5>-->\n<!--                <h6>I need job, please help me.</h6>-->\n<!--            </div>-->\n<!--            <div class=\"date-status\"><i class=\"ti-pin2\"></i>-->\n<!--                <h6>15/06/19</h6>-->\n<!--                <h6 class=\"font-dark status\"> Sending</h6>-->\n<!--            </div>-->\n<!--        </div>-->\n<!--    </li>-->\n<!--    <li data-to=\"blank\">-->\n<!--        <div class=\"chat-box\">-->\n<!--            <div class=\"profile busy bg-size\" style=\"background-image: url(&quot;../assets/images/contact/4.jpg&quot;); background-size: cover; background-position: center center; display: block;\"><img class=\"bg-img\" src=\"../assets/images/contact/4.jpg\" alt=\"Avatar\" style=\"display: none;\"></div>-->\n<!--            <div class=\"details\">-->\n<!--                <h5>Mukrani Pabelo</h5>-->\n<!--                <h6>Hi, i am josephin. How are you.. ! There are many variations of passages.</h6>-->\n<!--            </div>-->\n<!--            <div class=\"date-status\"><i class=\"ti-pin2\"></i>-->\n<!--                <h6>04/06/19</h6>-->\n<!--                <h6 class=\"font-danger status\"> Failed</h6>-->\n<!--            </div>-->\n<!--        </div>-->\n<!--    </li>-->\n<!--    <li data-to=\"blank\">-->\n<!--        <div class=\"chat-box\">-->\n<!--            <div class=\"profile busy bg-size\" style=\"background-image: url(&quot;../assets/images/contact/2.jpg&quot;); background-size: cover; background-position: center center; display: block;\"><img class=\"bg-img\" src=\"../assets/images/contact/2.jpg\" alt=\"Avatar\" style=\"display: none;\"></div>-->\n<!--            <div class=\"details\">-->\n<!--                <h5>Jhon Deo</h5>-->\n<!--                <h6>Hi, i am josephin. How are you.. ! There are many variations of passages.</h6>-->\n<!--            </div>-->\n<!--            <div class=\"date-status\"><i class=\"ti-pin2\"></i>-->\n<!--                <h6>04/06/19</h6>-->\n<!--                <h6 class=\"font-danger status\"> Failed</h6>-->\n<!--            </div>-->\n<!--        </div>-->\n<!--    </li>-->\n<!--    <li data-to=\"blank\">-->\n<!--        <div class=\"chat-box\">-->\n<!--            <div class=\"profile busy bg-size\" style=\"background-image: url(&quot;../assets/images/contact/1.jpg&quot;); background-size: cover; background-position: center center; display: block;\"><img class=\"bg-img\" src=\"../assets/images/contact/1.jpg\" alt=\"Avatar\" style=\"display: none;\"></div>-->\n<!--            <div class=\"details\">-->\n<!--                <h5>Pabelo Mukrani</h5>-->\n<!--                <h6>Hi, i am josephin. How are you.. ! There are many variations of passages.</h6>-->\n<!--            </div>-->\n<!--            <div class=\"date-status\"><i class=\"ti-pin2\"></i>-->\n<!--                <h6>04/06/19</h6>-->\n<!--                <h6 class=\"font-danger status\"> Failed</h6>-->\n<!--            </div>-->\n<!--        </div>-->\n<!--    </li>-->\n<!--</ul>-->",
                styles: [".message-chat__action{min-width:34px;width:34px;height:34px;line-height:34px;font-size:17px;text-align:center;border-radius:50%;background:#eff7fe;color:#1c9dea;margin-left:10px;cursor:pointer}.message-chat__action:hover{background:#1c9dea;color:#fff}.subject-text,.watermark .leftwatermark{display:none!important}:host{display:block;position:relative;height:100%}.contact-list__search{position:absolute;top:50px;left:0;width:100%;height:50px;padding:10px;background:#fff;border-bottom:1px solid #d3d3d3}.contact-list__body{position:absolute;top:100px;left:0;bottom:0;width:100%;overflow:auto;background:#fff}.contact-list__body::-webkit-scrollbar{width:5px}.contact-list__body::-webkit-scrollbar-track{background:#f1f1f1}.contact-list__body::-webkit-scrollbar-thumb{background:#d6eaf7}.contact-list__body::-webkit-scrollbar-thumb:hover{background:#d6eaf7}.contact{padding:10px;cursor:pointer;display:flex;align-items:center}.contact:active,.contact:hover{background:#eff7fe}.contact:last-child{border-bottom:1px solid #ddd}.contact-image{min-width:40px;width:40px;height:40px;line-height:40px;font-size:20px;text-align:center;border-radius:50%;margin-right:10px;background:rgba(0,0,0,.1)}.contact-content{flex-grow:1;overflow:hidden;font-size:16px;line-height:20px}.contact-name{margin-bottom:2px;color:rgba(0,0,0,.7);font-weight:700;font-size:14px}.contact-detail{font-size:13px;color:rgba(0,0,0,.5);height:14px;line-height:14px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.contact-icon{font-size:9px}.contact-online.offline::before,.contact-online.online::before{content:\"\";position:absolute;height:13px;width:13px;border-radius:100%;border:2px solid #fff;left:44px}.contact-online.online::before{background:#28a745}.contact-online.offline::before{background:#6c757d}"]
            }] }
];
/** @nocollapse */
ContactListComponent.ctorParameters = () => [
    { type: ChatMessageService },
    { type: WebSocketClientService }
];
ContactListComponent.propDecorators = {
    contactSelected: [{ type: Output }],
    roomSelected: [{ type: Output }],
    callTo: [{ type: Output }],
    contactRef: [{ type: ViewChild, args: ['contactRef',] }]
};
if (false) {
    /** @type {?} */
    ContactListComponent.prototype.contactSelected;
    /** @type {?} */
    ContactListComponent.prototype.roomSelected;
    /** @type {?} */
    ContactListComponent.prototype.callTo;
    /** @type {?} */
    ContactListComponent.prototype.contactRef;
    /** @type {?} */
    ContactListComponent.prototype.contacts;
    /** @type {?} */
    ContactListComponent.prototype.statusText;
    /** @type {?} */
    ContactListComponent.prototype.userInteract;
    /** @type {?} */
    ContactListComponent.prototype.lastPage;
    /** @type {?} */
    ContactListComponent.prototype.username;
    /** @type {?} */
    ContactListComponent.prototype.fullname;
    /**
     * @type {?}
     * @private
     */
    ContactListComponent.prototype._contacts;
    /**
     * @type {?}
     * @private
     */
    ContactListComponent.prototype._statusObserver;
    /**
     * @type {?}
     * @private
     */
    ContactListComponent.prototype._pageNumber;
    /**
     * @type {?}
     * @private
     */
    ContactListComponent.prototype._pageSize;
    /**
     * @type {?}
     * @private
     */
    ContactListComponent.prototype._loading;
    /**
     * @type {?}
     * @private
     */
    ContactListComponent.prototype._timer;
    /**
     * @type {?}
     * @private
     */
    ContactListComponent.prototype._contactEl;
    /**
     * @type {?}
     * @private
     */
    ContactListComponent.prototype._keyword;
    /**
     * @type {?}
     * @private
     */
    ContactListComponent.prototype._messageObserver;
    /**
     * @type {?}
     * @private
     */
    ContactListComponent.prototype.messageService;
    /**
     * @type {?}
     * @private
     */
    ContactListComponent.prototype.webSocketService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGFjdC1saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtY2hhdC8iLCJzb3VyY2VzIjpbInNyYy9jb21wb25lbnQvY29udGFjdC1saXN0L2NvbnRhY3QtbGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBZ0IsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQXFCLE1BQU0sRUFBRSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFHdkgsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFFekQsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sV0FBVyxDQUFDO0FBVWpELE1BQU0sT0FBTyxvQkFBb0I7Ozs7O0lBd0I3QixZQUFvQixjQUFrQyxFQUFVLGdCQUF3QztRQUFwRixtQkFBYyxHQUFkLGNBQWMsQ0FBb0I7UUFBVSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQXdCO1FBdkI5RixvQkFBZSxHQUFHLElBQUksWUFBWSxFQUFrQixDQUFDO1FBQ3JELGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUMxQyxXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUU5QyxhQUFRLEdBQXFCLEVBQUUsQ0FBQztRQUVoQyxpQkFBWSxHQUFZLEtBQUssQ0FBQztRQUM5QixhQUFRLEdBQVksS0FBSyxDQUFDO1FBQzFCLGFBQVEsR0FBSSxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQzFCLGFBQVEsR0FBSSxJQUFJLENBQUMsV0FBVyxDQUFDO1FBSXJCLGdCQUFXLEdBQVcsQ0FBQyxDQUFDO1FBQ3hCLGNBQVMsR0FBVyxFQUFFLENBQUM7UUFDdkIsYUFBUSxHQUFZLEtBQUssQ0FBQztJQVNsQyxDQUFDOzs7O0lBRUQsZUFBZTtRQUNYLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUM7UUFD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SHZCLCtDQUErRDs7SUFDL0QsNENBQW9EOztJQUNwRCxzQ0FBOEM7O0lBQzlDLDBDQUFnRDs7SUFDaEQsd0NBQWdDOztJQUNoQywwQ0FBbUI7O0lBQ25CLDRDQUE4Qjs7SUFDOUIsd0NBQTBCOztJQUMxQix3Q0FBMEI7O0lBQzFCLHdDQUE2Qjs7Ozs7SUFFN0IseUNBQW9DOzs7OztJQUNwQywrQ0FBc0M7Ozs7O0lBQ3RDLDJDQUFnQzs7Ozs7SUFDaEMseUNBQStCOzs7OztJQUMvQix3Q0FBa0M7Ozs7O0lBQ2xDLHNDQUFlOzs7OztJQUNmLDBDQUFtQjs7Ozs7SUFDbkIsd0NBQWlCOzs7OztJQUNqQixnREFBeUI7Ozs7O0lBSWIsOENBQTBDOzs7OztJQUFFLGdEQUFnRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QWZ0ZXJWaWV3SW5pdCwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIE9uRGVzdHJveSwgT25Jbml0LCBPdXRwdXQsIFZpZXdDaGlsZH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01lc3NhZ2VDb250YWN0fSBmcm9tIFwiLi4vLi4vbW9kZWwvTWVzc2FnZUNvbnRhY3RcIjtcbmltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tIFwicnhqc1wiO1xuaW1wb3J0IHtDaGF0TWVzc2FnZVNlcnZpY2V9IGZyb20gXCIuLi8uLi9tZXNzYWdlLnNlcnZpY2VcIjtcbmltcG9ydCB7TWVzc2FnZUNoYXR9IGZyb20gXCIuLi8uLi9tb2RlbC9NZXNzYWdlQ2hhdFwiO1xuaW1wb3J0IHtXZWJTb2NrZXRDbGllbnRTZXJ2aWNlfSBmcm9tIFwiaW5ldC1jb3JlXCI7XG5cbmRlY2xhcmUgbGV0ICQ6IGFueTtcbmRlY2xhcmUgbGV0IGlOZXQ6IGFueTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtZXNzYWdlLWNvbnRhY3QtbGlzdCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2NvbnRhY3QtbGlzdC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vY29udGFjdC1saXN0LmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBDb250YWN0TGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSwgQWZ0ZXJWaWV3SW5pdCB7XG4gICAgQE91dHB1dCgpIGNvbnRhY3RTZWxlY3RlZCA9IG5ldyBFdmVudEVtaXR0ZXI8TWVzc2FnZUNvbnRhY3Q+KCk7XG4gICAgQE91dHB1dCgpIHJvb21TZWxlY3RlZCA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuICAgIEBPdXRwdXQoKSBjYWxsVG8gPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcbiAgICBAVmlld0NoaWxkKCdjb250YWN0UmVmJykgY29udGFjdFJlZjogRWxlbWVudFJlZjtcbiAgICBjb250YWN0czogTWVzc2FnZUNvbnRhY3RbXSA9IFtdO1xuICAgIHN0YXR1c1RleHQ6IHN0cmluZztcbiAgICB1c2VySW50ZXJhY3Q6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBsYXN0UGFnZTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHVzZXJuYW1lID0gIGlOZXQudXNlcm5hbWU7XG4gICAgZnVsbG5hbWUgPSAgaU5ldC5kaXNwbGF5TmFtZTtcblxuICAgIHByaXZhdGUgX2NvbnRhY3RzOiBNZXNzYWdlQ29udGFjdFtdO1xuICAgIHByaXZhdGUgX3N0YXR1c09ic2VydmVyOiBTdWJzY3JpcHRpb247XG4gICAgcHJpdmF0ZSBfcGFnZU51bWJlcjogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIF9wYWdlU2l6ZTogbnVtYmVyID0gMjA7XG4gICAgcHJpdmF0ZSBfbG9hZGluZzogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgX3RpbWVyO1xuICAgIHByaXZhdGUgX2NvbnRhY3RFbDtcbiAgICBwcml2YXRlIF9rZXl3b3JkO1xuICAgIHByaXZhdGUgX21lc3NhZ2VPYnNlcnZlcjtcblxuXG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIG1lc3NhZ2VTZXJ2aWNlOiBDaGF0TWVzc2FnZVNlcnZpY2UsIHByaXZhdGUgd2ViU29ja2V0U2VydmljZTogV2ViU29ja2V0Q2xpZW50U2VydmljZSkge1xuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgdGhpcy5fY29udGFjdEVsID0gJCh0aGlzLmNvbnRhY3RSZWYubmF0aXZlRWxlbWVudCk7XG4gICAgICAgIHRoaXMuX2RldGVjdFVzZXJJbnRlcmFjdCgpO1xuICAgICAgICB0aGlzLnNlYXJjaENvbnRhY3RzKCk7XG4gICAgICAgIHRoaXMuX3N0YXR1c09ic2VydmVyID0gdGhpcy5tZXNzYWdlU2VydmljZS5zb2NrZXRTZXJ2aWNlLm9uU3RhdGVDaGFuZ2Uuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLm1lc3NhZ2VTZXJ2aWNlLnNvY2tldFNlcnZpY2UuY2xvc2VkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0dXNUZXh0ID0gJ0vhur90IG7hu5FpIGtow7RuZyB0aMOgbmggY8O0bmcnO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm1lc3NhZ2VTZXJ2aWNlLnNvY2tldFNlcnZpY2UuY29ubmVjdGluZykge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdHVzVGV4dCA9ICfEkGFuZyBr4bq/dCBu4buRaSc7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMubWVzc2FnZVNlcnZpY2Uuc29ja2V0U2VydmljZS5jb25uZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXR1c1RleHQgPSAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gU2Nyb2xsIGJvdHRvbSBsb2FkIG1vcmVcbiAgICAgICAgdGhpcy5fY29udGFjdEVsLm9uKCdzY3JvbGwnLCAoZSkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2xvYWRpbmcgfHwgdGhpcy5sYXN0UGFnZSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChlLnRhcmdldC5zY3JvbGxUb3AgKyBlLnRhcmdldC5jbGllbnRIZWlnaHQgPiBlLnRhcmdldC5zY3JvbGxIZWlnaHQgLSAxMDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRDb250YWN0cygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcblxuICAgICAgICBpZiAodGhpcy5fc3RhdHVzT2JzZXJ2ZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX3N0YXR1c09ic2VydmVyLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICB0aGlzLl9zdGF0dXNPYnNlcnZlciA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZWxlY3RDb250YWN0KGNvbnRhY3Q6IE1lc3NhZ2VDb250YWN0KSB7XG4gICAgICAgIHRoaXMuY29udGFjdFNlbGVjdGVkLmVtaXQoY29udGFjdCk7XG4gICAgfVxuXG4gICAgc2VhcmNoQ29udGFjdHModmFsdWU6IHN0cmluZyA9ICcnKSB7XG4gICAgICAgIHZhbHVlID0gdmFsdWUudG9Mb3dlckNhc2UoKS50cmltKCk7XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gdGhpcy5fa2V5d29yZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2tleXdvcmQgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5tZXNzYWdlU2VydmljZS5zZWFyY2hDb250YWN0cyh2YWx1ZSwgKGNvbnRhY3RzKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9wYWdlTnVtYmVyID0gMDtcbiAgICAgICAgICAgIHRoaXMuX2xvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuX2NvbnRhY3RzID0gY29udGFjdHM7XG4gICAgICAgICAgICB0aGlzLmNvbnRhY3RzLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICB0aGlzLmxvYWRDb250YWN0cygpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBsb2FkQ29udGFjdHMoKSB7XG4gICAgICAgIGlmICghdGhpcy51c2VySW50ZXJhY3QgfHwgdGhpcy5fbG9hZGluZyB8fCAhdGhpcy5fY29udGFjdHMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBiZWdpbiA9IHRoaXMuX3BhZ2VOdW1iZXIgKiB0aGlzLl9wYWdlU2l6ZTtcbiAgICAgICAgdGhpcy5sYXN0UGFnZSA9IHRoaXMuX2NvbnRhY3RzICYmIHRoaXMuX2NvbnRhY3RzLmxlbmd0aCA8IGJlZ2luO1xuICAgICAgICBpZiAodGhpcy5sYXN0UGFnZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2xvYWRpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLmNvbnRhY3RzID0gdGhpcy5jb250YWN0cy5jb25jYXQodGhpcy5fY29udGFjdHMuc2xpY2UoYmVnaW4sIGJlZ2luICsgdGhpcy5fcGFnZVNpemUpKTtcblxuICAgICAgICB0aGlzLmNvbnRhY3RzLmZvckVhY2goZWxlPT57XG4gICAgICAgICAgICBsZXQgX19tZXMgPSAgdGhpcy5tZXNzYWdlU2VydmljZS5yZXZlcnRNZXNzYWdlKGVsZS5tZXNzYWdlKSB8fCAnJztcbiAgICAgICAgICAgIGxldCBfX21lc0Rpc3BsYXkgPSAgdGhpcy5tZXNzYWdlU2VydmljZS5yZXZlcnRNZXNzYWdlRGlzcGxheShlbGUubWVzc2FnZSkgfHwgJyc7XG4gICAgICAgICAgICBsZXQgdHlwZU1lc3NhZ2VzID0gIF9fbWVzLnNwbGl0KFwiOlwiKVxuICAgICAgICAgICAgaWYodHlwZU1lc3NhZ2VzLmxlbmd0aCA+MCl7XG4gICAgICAgICAgICAgICAgaWYodHlwZU1lc3NhZ2VzWzBdPT09J3VyaV9tZXNzYWdlJyAmJiAodHlwZU1lc3NhZ2VzWzFdPT09J3ZpZGVvX2NvbmZlcmVuY2UuLi4nIHx8IHR5cGVNZXNzYWdlc1sxXT09PSd2aWRlb19jb25mZXJlbmNlJykgKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZS5tZXNzYWdlID0gJzxpIGNsYXNzPVwiZmEgZmEtcGhvbmUgcHItMVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT4gQ3Xhu5ljIGfhu41pIHRob+G6oWknO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVsZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgaWYodHlwZU1lc3NhZ2VzWzBdPT09J3VyaV9tZXNzYWdlJyAmJiB0eXBlTWVzc2FnZXNbMV09PT0nbGlua19wcmV2aWV3Li4uJyl7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbGUubWVzc2FnZSA9X19tZXNEaXNwbGF5O1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVsZTtcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZWxlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX2xvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuX3BhZ2VOdW1iZXIrKztcbiAgICAgICAgfSwgMzAwKTtcbiAgICAgICAgdGhpcy5zZWxlY3RDb250YWN0KHRoaXMuY29udGFjdHNbMF0pO1xuICAgIH1cbiAgICBkZWNvZGVCYXNlNjQoc3RyOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChlc2NhcGUod2luZG93LmF0b2Ioc3RyKSkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2RldGVjdFVzZXJJbnRlcmFjdCgpIHtcbiAgICAgICAgdGhpcy5fdGltZXIgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5fY29udGFjdEVsLmlzKCc6dmlzaWJsZScpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51c2VySW50ZXJhY3QgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZENvbnRhY3RzKCk7XG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLl90aW1lcik7XG4gICAgICAgICAgICAgICAgdGhpcy5fdGltZXIgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCAxMDApO1xuICAgIH1cblxuXG4gICAgc2VsZWN0Um9vbShyb29tTmFtZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMucm9vbVNlbGVjdGVkLmVtaXQocm9vbU5hbWUpO1xuICAgIH1cbiAgICBjYWxsVG9Db250YWN0KHVzZXJjb2RlKXtcbiAgICAgICAgdGhpcy5jYWxsVG8uZW1pdCh1c2VyY29kZSk7XG4gICAgfVxufVxuIl19