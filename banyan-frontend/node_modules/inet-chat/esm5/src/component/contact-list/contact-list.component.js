/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { ChatMessageService } from "../../message.service";
import { WebSocketClientService } from "inet-core";
var ContactListComponent = /** @class */ (function () {
    function ContactListComponent(messageService, webSocketService) {
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
    ContactListComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._contactEl = $(this.contactRef.nativeElement);
        this._detectUserInteract();
        this.searchContacts();
        this._statusObserver = this.messageService.socketService.onStateChange.subscribe((/**
         * @return {?}
         */
        function () {
            if (_this.messageService.socketService.closed) {
                _this.statusText = 'Kết nối không thành công';
            }
            else if (_this.messageService.socketService.connecting) {
                _this.statusText = 'Đang kết nối';
            }
            else if (_this.messageService.socketService.connected) {
                _this.statusText = '';
            }
        }));
        // Scroll bottom load more
        this._contactEl.on('scroll', (/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            if (_this._loading || _this.lastPage) {
                return;
            }
            if (e.target.scrollTop + e.target.clientHeight > e.target.scrollHeight - 100) {
                _this.loadContacts();
            }
        }));
    };
    /**
     * @return {?}
     */
    ContactListComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this._statusObserver) {
            this._statusObserver.unsubscribe();
            this._statusObserver = null;
        }
    };
    /**
     * @param {?} contact
     * @return {?}
     */
    ContactListComponent.prototype.selectContact = /**
     * @param {?} contact
     * @return {?}
     */
    function (contact) {
        this.contactSelected.emit(contact);
    };
    /**
     * @param {?=} value
     * @return {?}
     */
    ContactListComponent.prototype.searchContacts = /**
     * @param {?=} value
     * @return {?}
     */
    function (value) {
        var _this = this;
        if (value === void 0) { value = ''; }
        value = value.toLowerCase().trim();
        if (value === this._keyword) {
            return;
        }
        this._keyword = value;
        this.messageService.searchContacts(value, (/**
         * @param {?} contacts
         * @return {?}
         */
        function (contacts) {
            _this._pageNumber = 0;
            _this._loading = false;
            _this._contacts = contacts;
            _this.contacts.length = 0;
            _this.loadContacts();
        }));
    };
    /**
     * @return {?}
     */
    ContactListComponent.prototype.loadContacts = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.userInteract || this._loading || !this._contacts) {
            return;
        }
        /** @type {?} */
        var begin = this._pageNumber * this._pageSize;
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
        function (ele) {
            /** @type {?} */
            var __mes = _this.messageService.revertMessage(ele.message) || '';
            /** @type {?} */
            var __mesDisplay = _this.messageService.revertMessageDisplay(ele.message) || '';
            /** @type {?} */
            var typeMessages = __mes.split(":");
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
        function () {
            _this._loading = false;
            _this._pageNumber++;
        }), 300);
        this.selectContact(this.contacts[0]);
    };
    /**
     * @param {?} str
     * @return {?}
     */
    ContactListComponent.prototype.decodeBase64 = /**
     * @param {?} str
     * @return {?}
     */
    function (str) {
        return decodeURIComponent(escape(window.atob(str)));
    };
    /**
     * @private
     * @return {?}
     */
    ContactListComponent.prototype._detectUserInteract = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this._timer = setInterval((/**
         * @return {?}
         */
        function () {
            if (_this._contactEl.is(':visible')) {
                _this.userInteract = true;
                _this.loadContacts();
                clearInterval(_this._timer);
                _this._timer = null;
            }
        }), 100);
    };
    /**
     * @param {?} roomName
     * @return {?}
     */
    ContactListComponent.prototype.selectRoom = /**
     * @param {?} roomName
     * @return {?}
     */
    function (roomName) {
        this.roomSelected.emit(roomName);
    };
    /**
     * @param {?} usercode
     * @return {?}
     */
    ContactListComponent.prototype.callToContact = /**
     * @param {?} usercode
     * @return {?}
     */
    function (usercode) {
        this.callTo.emit(usercode);
    };
    ContactListComponent.decorators = [
        { type: Component, args: [{
                    selector: 'message-contact-list',
                    template: "<div  class=\"contact bg-white\" role=\"button\">\n    <div  class=\"contact-online online\" >\n        <img class=\"contact-image\" userAvatar [usercode]=\"username\">\n    </div>\n    <div  class=\"contact-content\">\n        <div  class=\"contact-name\">{{fullname}}</div>\n    </div>\n    <div  style=\"white-space: nowrap\"><i  class=\"message-chat__action fa fa-ellipsis-v\"></i>\n    </div>\n</div>\n\n<div class=\"contact-list__search\">\n    <search-input [placeholder]=\"'T\u00ECm ki\u1EBFm ...'\" (onChanged)=\"searchContacts($event)\"></search-input>\n    <!--    <div class=\"text-center m-1\">-->\n    <!--        <button (click)=\"selectRoom('company')\" type=\"button\" class=\"btn btn-block btn-light\">-->\n    <!--            <i class=\"fa fa-video-camera\"></i> Cu\u1ED9c h\u1ECDp c\u00F4ng ty</button>-->\n    <!--    </div>-->\n</div>\n<div #contactRef class=\"contact-list__body\">\n    <div *ngFor=\"let contact of contacts\" class=\"contact\" role=\"button\" (click)=\"selectContact(contact)\">\n        <div class=\"contact-online\" [ngClass]=\"{'online': contact.online,'offline': !contact.online }\">\n            <img class=\"contact-image\" userAvatar [usercode]=\"contact.usercode\">\n        </div>\n        <div class=\"contact-content\">\n            <div class=\"contact-name\">{{contact.fullname || contact.usercode}}</div>\n            <div class=\"contact-detail\" [innerHTML]=\"contact.message\"></div>\n        </div>\n        <div *ngIf=\"contact.unread\" class=\"contact-icon badge badge-danger\" style=\"margin-right: 5px\">\n            {{contact.unread}}\n        </div>\n        <div *ngIf=\"contact.usercode !== username\" (click)=\"callToContact(contact)\" style=\"white-space: nowrap\"><i\n                class=\"message-chat__action fa fa-phone\"></i></div>\n        <!--        <i class=\"contact-icon fa fa-circle text-secondary\" [ngClass]=\"{'text-success': contact.online}\"></i>-->\n    </div>\n</div>\n<!--<ul class=\"chat-main\">-->\n<!--    <li data-to=\"blank\">-->\n<!--        <div class=\"chat-box\">-->\n<!--            <div class=\"profile offline bg-size\" style=\"background-image: url(&quot;../assets/images/contact/1.jpg&quot;); background-size: cover; background-position: center center; display: block;\"><img class=\"bg-img\" src=\"../assets/images/contact/1.jpg\" alt=\"Avatar\" style=\"display: none;\"></div>-->\n<!--            <div class=\"details\">-->\n<!--                <h5>Josephin water</h5>-->\n<!--                <h6>Hi, i am josephin. How are you.. ! There are many variations of passages.</h6>-->\n<!--            </div>-->\n<!--            <div class=\"date-status\"><i class=\"ti-pin2\"></i>-->\n<!--                <h6>22/10/19</h6>-->\n<!--                <h6 class=\"font-success status\"> Seen</h6>-->\n<!--            </div>-->\n<!--        </div>-->\n<!--    </li>-->\n<!--    <li class=\"active\" data-to=\"chating\">-->\n<!--        <div class=\"chat-box\">-->\n<!--            <div class=\"profile online bg-size\" style=\"background-image: url(&quot;../assets/images/contact/2.jpg&quot;); background-size: cover; background-position: center center; display: block;\"><img class=\"bg-img\" src=\"../assets/images/contact/2.jpg\" alt=\"Avatar\" style=\"display: none;\"></div>-->\n<!--            <div class=\"details\">-->\n<!--                <h5>Jony Lynetin</h5>-->\n<!--                <h6>Typing................</h6>-->\n<!--            </div>-->\n<!--            <div class=\"date-status\"><i class=\"ti-pin2\"></i>-->\n<!--                <h6>30/11/19</h6>-->\n<!--                <div class=\"badge badge-primary sm\">8</div>-->\n<!--            </div>-->\n<!--        </div>-->\n<!--    </li>-->\n<!--    <li data-to=\"blank\">-->\n<!--        <div class=\"chat-box\">-->\n<!--            <div class=\"profile unreachable bg-size\" style=\"background-image: url(&quot;../assets/images/contact/3.jpg&quot;); background-size: cover; background-position: center center; display: block;\"><img class=\"bg-img\" src=\"../assets/images/contact/3.jpg\" alt=\"Avatar\" style=\"display: none;\"></div>-->\n<!--            <div class=\"details\">-->\n<!--                <h5>Sufiya Elija</h5>-->\n<!--                <h6>I need job, please help me.</h6>-->\n<!--            </div>-->\n<!--            <div class=\"date-status\"><i class=\"ti-pin2\"></i>-->\n<!--                <h6>15/06/19</h6>-->\n<!--                <h6 class=\"font-dark status\"> Sending</h6>-->\n<!--            </div>-->\n<!--        </div>-->\n<!--    </li>-->\n<!--    <li data-to=\"blank\">-->\n<!--        <div class=\"chat-box\">-->\n<!--            <div class=\"profile busy bg-size\" style=\"background-image: url(&quot;../assets/images/contact/4.jpg&quot;); background-size: cover; background-position: center center; display: block;\"><img class=\"bg-img\" src=\"../assets/images/contact/4.jpg\" alt=\"Avatar\" style=\"display: none;\"></div>-->\n<!--            <div class=\"details\">-->\n<!--                <h5>Mukrani Pabelo</h5>-->\n<!--                <h6>Hi, i am josephin. How are you.. ! There are many variations of passages.</h6>-->\n<!--            </div>-->\n<!--            <div class=\"date-status\"><i class=\"ti-pin2\"></i>-->\n<!--                <h6>04/06/19</h6>-->\n<!--                <h6 class=\"font-danger status\"> Failed</h6>-->\n<!--            </div>-->\n<!--        </div>-->\n<!--    </li>-->\n<!--    <li data-to=\"blank\">-->\n<!--        <div class=\"chat-box\">-->\n<!--            <div class=\"profile busy bg-size\" style=\"background-image: url(&quot;../assets/images/contact/2.jpg&quot;); background-size: cover; background-position: center center; display: block;\"><img class=\"bg-img\" src=\"../assets/images/contact/2.jpg\" alt=\"Avatar\" style=\"display: none;\"></div>-->\n<!--            <div class=\"details\">-->\n<!--                <h5>Jhon Deo</h5>-->\n<!--                <h6>Hi, i am josephin. How are you.. ! There are many variations of passages.</h6>-->\n<!--            </div>-->\n<!--            <div class=\"date-status\"><i class=\"ti-pin2\"></i>-->\n<!--                <h6>04/06/19</h6>-->\n<!--                <h6 class=\"font-danger status\"> Failed</h6>-->\n<!--            </div>-->\n<!--        </div>-->\n<!--    </li>-->\n<!--    <li data-to=\"blank\">-->\n<!--        <div class=\"chat-box\">-->\n<!--            <div class=\"profile busy bg-size\" style=\"background-image: url(&quot;../assets/images/contact/1.jpg&quot;); background-size: cover; background-position: center center; display: block;\"><img class=\"bg-img\" src=\"../assets/images/contact/1.jpg\" alt=\"Avatar\" style=\"display: none;\"></div>-->\n<!--            <div class=\"details\">-->\n<!--                <h5>Pabelo Mukrani</h5>-->\n<!--                <h6>Hi, i am josephin. How are you.. ! There are many variations of passages.</h6>-->\n<!--            </div>-->\n<!--            <div class=\"date-status\"><i class=\"ti-pin2\"></i>-->\n<!--                <h6>04/06/19</h6>-->\n<!--                <h6 class=\"font-danger status\"> Failed</h6>-->\n<!--            </div>-->\n<!--        </div>-->\n<!--    </li>-->\n<!--</ul>-->",
                    styles: [".message-chat__action{min-width:34px;width:34px;height:34px;line-height:34px;font-size:17px;text-align:center;border-radius:50%;background:#eff7fe;color:#1c9dea;margin-left:10px;cursor:pointer}.message-chat__action:hover{background:#1c9dea;color:#fff}.subject-text,.watermark .leftwatermark{display:none!important}:host{display:block;position:relative;height:100%}.contact-list__search{position:absolute;top:50px;left:0;width:100%;height:50px;padding:10px;background:#fff;border-bottom:1px solid #d3d3d3}.contact-list__body{position:absolute;top:100px;left:0;bottom:0;width:100%;overflow:auto;background:#fff}.contact-list__body::-webkit-scrollbar{width:5px}.contact-list__body::-webkit-scrollbar-track{background:#f1f1f1}.contact-list__body::-webkit-scrollbar-thumb{background:#d6eaf7}.contact-list__body::-webkit-scrollbar-thumb:hover{background:#d6eaf7}.contact{padding:10px;cursor:pointer;display:flex;align-items:center}.contact:active,.contact:hover{background:#eff7fe}.contact:last-child{border-bottom:1px solid #ddd}.contact-image{min-width:40px;width:40px;height:40px;line-height:40px;font-size:20px;text-align:center;border-radius:50%;margin-right:10px;background:rgba(0,0,0,.1)}.contact-content{flex-grow:1;overflow:hidden;font-size:16px;line-height:20px}.contact-name{margin-bottom:2px;color:rgba(0,0,0,.7);font-weight:700;font-size:14px}.contact-detail{font-size:13px;color:rgba(0,0,0,.5);height:14px;line-height:14px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.contact-icon{font-size:9px}.contact-online.offline::before,.contact-online.online::before{content:\"\";position:absolute;height:13px;width:13px;border-radius:100%;border:2px solid #fff;left:44px}.contact-online.online::before{background:#28a745}.contact-online.offline::before{background:#6c757d}"]
                }] }
    ];
    /** @nocollapse */
    ContactListComponent.ctorParameters = function () { return [
        { type: ChatMessageService },
        { type: WebSocketClientService }
    ]; };
    ContactListComponent.propDecorators = {
        contactSelected: [{ type: Output }],
        roomSelected: [{ type: Output }],
        callTo: [{ type: Output }],
        contactRef: [{ type: ViewChild, args: ['contactRef',] }]
    };
    return ContactListComponent;
}());
export { ContactListComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGFjdC1saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtY2hhdC8iLCJzb3VyY2VzIjpbInNyYy9jb21wb25lbnQvY29udGFjdC1saXN0L2NvbnRhY3QtbGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBZ0IsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQXFCLE1BQU0sRUFBRSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFHdkgsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFFekQsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sV0FBVyxDQUFDO0FBS2pEO0lBNkJJLDhCQUFvQixjQUFrQyxFQUFVLGdCQUF3QztRQUFwRixtQkFBYyxHQUFkLGNBQWMsQ0FBb0I7UUFBVSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQXdCO1FBdkI5RixvQkFBZSxHQUFHLElBQUksWUFBWSxFQUFrQixDQUFDO1FBQ3JELGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUMxQyxXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUU5QyxhQUFRLEdBQXFCLEVBQUUsQ0FBQztRQUVoQyxpQkFBWSxHQUFZLEtBQUssQ0FBQztRQUM5QixhQUFRLEdBQVksS0FBSyxDQUFDO1FBQzFCLGFBQVEsR0FBSSxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQzFCLGFBQVEsR0FBSSxJQUFJLENBQUMsV0FBVyxDQUFDO1FBSXJCLGdCQUFXLEdBQVcsQ0FBQyxDQUFDO1FBQ3hCLGNBQVMsR0FBVyxFQUFFLENBQUM7UUFDdkIsYUFBUSxHQUFZLEtBQUssQ0FBQztJQVNsQyxDQUFDOzs7O0lBRUQsOENBQWU7OztJQUFmO1FBQUEsaUJBdUJDO1FBdEJHLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUM7UUFD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LHNCQUFzQjs7O2tDQVd6QixNQUFNOytCQUNOLE1BQU07eUJBQ04sTUFBTTs2QkFDTixTQUFTLFNBQUMsWUFBWTs7SUFzSTNCLDJCQUFDO0NBQUEsQUEvSUQsSUErSUM7U0ExSVksb0JBQW9COzs7SUFDN0IsK0NBQStEOztJQUMvRCw0Q0FBb0Q7O0lBQ3BELHNDQUE4Qzs7SUFDOUMsMENBQWdEOztJQUNoRCx3Q0FBZ0M7O0lBQ2hDLDBDQUFtQjs7SUFDbkIsNENBQThCOztJQUM5Qix3Q0FBMEI7O0lBQzFCLHdDQUEwQjs7SUFDMUIsd0NBQTZCOzs7OztJQUU3Qix5Q0FBb0M7Ozs7O0lBQ3BDLCtDQUFzQzs7Ozs7SUFDdEMsMkNBQWdDOzs7OztJQUNoQyx5Q0FBK0I7Ozs7O0lBQy9CLHdDQUFrQzs7Ozs7SUFDbEMsc0NBQWU7Ozs7O0lBQ2YsMENBQW1COzs7OztJQUNuQix3Q0FBaUI7Ozs7O0lBQ2pCLGdEQUF5Qjs7Ozs7SUFJYiw4Q0FBMEM7Ozs7O0lBQUUsZ0RBQWdEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgT25EZXN0cm95LCBPbkluaXQsIE91dHB1dCwgVmlld0NoaWxkfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TWVzc2FnZUNvbnRhY3R9IGZyb20gXCIuLi8uLi9tb2RlbC9NZXNzYWdlQ29udGFjdFwiO1xuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gXCJyeGpzXCI7XG5pbXBvcnQge0NoYXRNZXNzYWdlU2VydmljZX0gZnJvbSBcIi4uLy4uL21lc3NhZ2Uuc2VydmljZVwiO1xuaW1wb3J0IHtNZXNzYWdlQ2hhdH0gZnJvbSBcIi4uLy4uL21vZGVsL01lc3NhZ2VDaGF0XCI7XG5pbXBvcnQge1dlYlNvY2tldENsaWVudFNlcnZpY2V9IGZyb20gXCJpbmV0LWNvcmVcIjtcblxuZGVjbGFyZSBsZXQgJDogYW55O1xuZGVjbGFyZSBsZXQgaU5ldDogYW55O1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21lc3NhZ2UtY29udGFjdC1saXN0JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vY29udGFjdC1saXN0LmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9jb250YWN0LWxpc3QuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIENvbnRhY3RMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25EZXN0cm95LCBBZnRlclZpZXdJbml0IHtcbiAgICBAT3V0cHV0KCkgY29udGFjdFNlbGVjdGVkID0gbmV3IEV2ZW50RW1pdHRlcjxNZXNzYWdlQ29udGFjdD4oKTtcbiAgICBAT3V0cHV0KCkgcm9vbVNlbGVjdGVkID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG4gICAgQE91dHB1dCgpIGNhbGxUbyA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuICAgIEBWaWV3Q2hpbGQoJ2NvbnRhY3RSZWYnKSBjb250YWN0UmVmOiBFbGVtZW50UmVmO1xuICAgIGNvbnRhY3RzOiBNZXNzYWdlQ29udGFjdFtdID0gW107XG4gICAgc3RhdHVzVGV4dDogc3RyaW5nO1xuICAgIHVzZXJJbnRlcmFjdDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGxhc3RQYWdlOiBib29sZWFuID0gZmFsc2U7XG4gICAgdXNlcm5hbWUgPSAgaU5ldC51c2VybmFtZTtcbiAgICBmdWxsbmFtZSA9ICBpTmV0LmRpc3BsYXlOYW1lO1xuXG4gICAgcHJpdmF0ZSBfY29udGFjdHM6IE1lc3NhZ2VDb250YWN0W107XG4gICAgcHJpdmF0ZSBfc3RhdHVzT2JzZXJ2ZXI6IFN1YnNjcmlwdGlvbjtcbiAgICBwcml2YXRlIF9wYWdlTnVtYmVyOiBudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgX3BhZ2VTaXplOiBudW1iZXIgPSAyMDtcbiAgICBwcml2YXRlIF9sb2FkaW5nOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBfdGltZXI7XG4gICAgcHJpdmF0ZSBfY29udGFjdEVsO1xuICAgIHByaXZhdGUgX2tleXdvcmQ7XG4gICAgcHJpdmF0ZSBfbWVzc2FnZU9ic2VydmVyO1xuXG5cblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgbWVzc2FnZVNlcnZpY2U6IENoYXRNZXNzYWdlU2VydmljZSwgcHJpdmF0ZSB3ZWJTb2NrZXRTZXJ2aWNlOiBXZWJTb2NrZXRDbGllbnRTZXJ2aWNlKSB7XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICB0aGlzLl9jb250YWN0RWwgPSAkKHRoaXMuY29udGFjdFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgdGhpcy5fZGV0ZWN0VXNlckludGVyYWN0KCk7XG4gICAgICAgIHRoaXMuc2VhcmNoQ29udGFjdHMoKTtcbiAgICAgICAgdGhpcy5fc3RhdHVzT2JzZXJ2ZXIgPSB0aGlzLm1lc3NhZ2VTZXJ2aWNlLnNvY2tldFNlcnZpY2Uub25TdGF0ZUNoYW5nZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMubWVzc2FnZVNlcnZpY2Uuc29ja2V0U2VydmljZS5jbG9zZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXR1c1RleHQgPSAnS+G6v3QgbuG7kWkga2jDtG5nIHRow6BuaCBjw7RuZyc7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMubWVzc2FnZVNlcnZpY2Uuc29ja2V0U2VydmljZS5jb25uZWN0aW5nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0dXNUZXh0ID0gJ8SQYW5nIGvhur90IG7hu5FpJztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5tZXNzYWdlU2VydmljZS5zb2NrZXRTZXJ2aWNlLmNvbm5lY3RlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdHVzVGV4dCA9ICcnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBTY3JvbGwgYm90dG9tIGxvYWQgbW9yZVxuICAgICAgICB0aGlzLl9jb250YWN0RWwub24oJ3Njcm9sbCcsIChlKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5fbG9hZGluZyB8fCB0aGlzLmxhc3RQYWdlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGUudGFyZ2V0LnNjcm9sbFRvcCArIGUudGFyZ2V0LmNsaWVudEhlaWdodCA+IGUudGFyZ2V0LnNjcm9sbEhlaWdodCAtIDEwMCkge1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZENvbnRhY3RzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuXG4gICAgICAgIGlmICh0aGlzLl9zdGF0dXNPYnNlcnZlcikge1xuICAgICAgICAgICAgdGhpcy5fc3RhdHVzT2JzZXJ2ZXIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIHRoaXMuX3N0YXR1c09ic2VydmVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNlbGVjdENvbnRhY3QoY29udGFjdDogTWVzc2FnZUNvbnRhY3QpIHtcbiAgICAgICAgdGhpcy5jb250YWN0U2VsZWN0ZWQuZW1pdChjb250YWN0KTtcbiAgICB9XG5cbiAgICBzZWFyY2hDb250YWN0cyh2YWx1ZTogc3RyaW5nID0gJycpIHtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZS50b0xvd2VyQ2FzZSgpLnRyaW0oKTtcbiAgICAgICAgaWYgKHZhbHVlID09PSB0aGlzLl9rZXl3b3JkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fa2V5d29yZCA9IHZhbHVlO1xuICAgICAgICB0aGlzLm1lc3NhZ2VTZXJ2aWNlLnNlYXJjaENvbnRhY3RzKHZhbHVlLCAoY29udGFjdHMpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX3BhZ2VOdW1iZXIgPSAwO1xuICAgICAgICAgICAgdGhpcy5fbG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5fY29udGFjdHMgPSBjb250YWN0cztcbiAgICAgICAgICAgIHRoaXMuY29udGFjdHMubGVuZ3RoID0gMDtcbiAgICAgICAgICAgIHRoaXMubG9hZENvbnRhY3RzKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGxvYWRDb250YWN0cygpIHtcbiAgICAgICAgaWYgKCF0aGlzLnVzZXJJbnRlcmFjdCB8fCB0aGlzLl9sb2FkaW5nIHx8ICF0aGlzLl9jb250YWN0cykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGJlZ2luID0gdGhpcy5fcGFnZU51bWJlciAqIHRoaXMuX3BhZ2VTaXplO1xuICAgICAgICB0aGlzLmxhc3RQYWdlID0gdGhpcy5fY29udGFjdHMgJiYgdGhpcy5fY29udGFjdHMubGVuZ3RoIDwgYmVnaW47XG4gICAgICAgIGlmICh0aGlzLmxhc3RQYWdlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbG9hZGluZyA9IHRydWU7XG4gICAgICAgIHRoaXMuY29udGFjdHMgPSB0aGlzLmNvbnRhY3RzLmNvbmNhdCh0aGlzLl9jb250YWN0cy5zbGljZShiZWdpbiwgYmVnaW4gKyB0aGlzLl9wYWdlU2l6ZSkpO1xuXG4gICAgICAgIHRoaXMuY29udGFjdHMuZm9yRWFjaChlbGU9PntcbiAgICAgICAgICAgIGxldCBfX21lcyA9ICB0aGlzLm1lc3NhZ2VTZXJ2aWNlLnJldmVydE1lc3NhZ2UoZWxlLm1lc3NhZ2UpIHx8ICcnO1xuICAgICAgICAgICAgbGV0IF9fbWVzRGlzcGxheSA9ICB0aGlzLm1lc3NhZ2VTZXJ2aWNlLnJldmVydE1lc3NhZ2VEaXNwbGF5KGVsZS5tZXNzYWdlKSB8fCAnJztcbiAgICAgICAgICAgIGxldCB0eXBlTWVzc2FnZXMgPSAgX19tZXMuc3BsaXQoXCI6XCIpXG4gICAgICAgICAgICBpZih0eXBlTWVzc2FnZXMubGVuZ3RoID4wKXtcbiAgICAgICAgICAgICAgICBpZih0eXBlTWVzc2FnZXNbMF09PT0ndXJpX21lc3NhZ2UnICYmICh0eXBlTWVzc2FnZXNbMV09PT0ndmlkZW9fY29uZmVyZW5jZS4uLicgfHwgdHlwZU1lc3NhZ2VzWzFdPT09J3ZpZGVvX2NvbmZlcmVuY2UnKSApe1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlLm1lc3NhZ2UgPSAnPGkgY2xhc3M9XCJmYSBmYS1waG9uZSBwci0xXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPiBDdeG7mWMgZ+G7jWkgdGhv4bqhaSc7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZWxlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICBpZih0eXBlTWVzc2FnZXNbMF09PT0ndXJpX21lc3NhZ2UnICYmIHR5cGVNZXNzYWdlc1sxXT09PSdsaW5rX3ByZXZpZXcuLi4nKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZS5tZXNzYWdlID1fX21lc0Rpc3BsYXk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZWxlO1xuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlbGU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5fbG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5fcGFnZU51bWJlcisrO1xuICAgICAgICB9LCAzMDApO1xuICAgICAgICB0aGlzLnNlbGVjdENvbnRhY3QodGhpcy5jb250YWN0c1swXSk7XG4gICAgfVxuICAgIGRlY29kZUJhc2U2NChzdHI6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KGVzY2FwZSh3aW5kb3cuYXRvYihzdHIpKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZGV0ZWN0VXNlckludGVyYWN0KCkge1xuICAgICAgICB0aGlzLl90aW1lciA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9jb250YWN0RWwuaXMoJzp2aXNpYmxlJykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVzZXJJbnRlcmFjdCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkQ29udGFjdHMoKTtcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMuX3RpbWVyKTtcbiAgICAgICAgICAgICAgICB0aGlzLl90aW1lciA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDEwMCk7XG4gICAgfVxuXG5cbiAgICBzZWxlY3RSb29tKHJvb21OYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5yb29tU2VsZWN0ZWQuZW1pdChyb29tTmFtZSk7XG4gICAgfVxuICAgIGNhbGxUb0NvbnRhY3QodXNlcmNvZGUpe1xuICAgICAgICB0aGlzLmNhbGxUby5lbWl0KHVzZXJjb2RlKTtcbiAgICB9XG59XG4iXX0=