/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { HttpClientService, WebSocketClientService } from "inet-core";
import { APP_CHAT } from "./model/MessageConstants";
import { MessageContact } from "./model/MessageContact";
import { Observable, Subject } from "rxjs";
import { MessageChat } from "./model/MessageChat";
var ChatMessageService = /** @class */ (function () {
    function ChatMessageService(httpService, socketService) {
        var _this = this;
        this.httpService = httpService;
        this.socketService = socketService;
        this._messageSubject = new Subject();
        this._unreadSubject = new Subject();
        this.contacts = [];
        this.messageReceived = this._messageSubject.asObservable();
        this.unreadMessageChange = this._unreadSubject.asObservable();
        if (ChatMessageService._instance) {
            return ChatMessageService._instance;
        }
        ChatMessageService._instance = this;
        this._socketObserver = this.socketService.onMessage.subscribe((/**
         * @param {?} message
         * @return {?}
         */
        function (message) {
            if (message.application === APP_CHAT) {
                _this.updateLastMessage(message.sender, message);
                _this._messageSubject.next(new MessageChat(message));
            }
        }));
    }
    /**
     * @return {?}
     */
    ChatMessageService.prototype.destroy = /**
     * @return {?}
     */
    function () {
        this._socketObserver.unsubscribe();
        this._messageSubject.unsubscribe();
        this._unreadSubject.unsubscribe();
    };
    /**
     * @return {?}
     */
    ChatMessageService.prototype.loadFriends = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return new Observable((/**
         * @param {?} observer
         * @return {?}
         */
        function (observer) {
            _this.httpService.getJSON(iNet.getPUrl('unifiedpush/list')).subscribe((/**
             * @param {?} data
             * @return {?}
             */
            function (data) {
                observer.next((data || []).map((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) { return new MessageContact(item); })));
                observer.complete();
            }));
        }));
    };
    /**
     * @param {?} callback
     * @return {?}
     */
    ChatMessageService.prototype.loadContacts = /**
     * @param {?} callback
     * @return {?}
     */
    function (callback) {
        var _this = this;
        if (this.contacts.length > 0) {
            callback(this.contacts);
        }
        else {
            this.loadFriends().subscribe((/**
             * @param {?} data
             * @return {?}
             */
            function (data) {
                _this.contacts = data.filter((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) { return item.usercode !== iNet.usercode; }));
                _this.updateUnreadMessage();
                callback(_this.contacts);
            }), (/**
             * @return {?}
             */
            function () { return callback([]); }));
        }
    };
    /**
     * @return {?}
     */
    ChatMessageService.prototype.updateUnreadMessage = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var unread = 0;
        this.contacts.forEach((/**
         * @param {?} friend
         * @return {?}
         */
        function (friend) { return unread += friend.unread; }));
        this._unreadSubject.next(unread);
    };
    /**
     * @param {?} usercode
     * @param {?} callback
     * @return {?}
     */
    ChatMessageService.prototype.getContactByUserCode = /**
     * @param {?} usercode
     * @param {?} callback
     * @return {?}
     */
    function (usercode, callback) {
        var _this = this;
        if (usercode === 'news-feed' || usercode === iNet.usercode) {
            return;
        }
        this.loadContacts((/**
         * @param {?} contacts
         * @return {?}
         */
        function (contacts) {
            for (var i = 0; i < contacts.length; i++) {
                if (contacts[i].usercode === usercode) {
                    return callback(contacts[i]);
                }
            }
            // contact not exist
            /** @type {?} */
            var contact = new MessageContact({ usercode: usercode, fullname: usercode, unread: 1 });
            _this.contacts.unshift(contact);
            callback(contact);
        }));
    };
    /**
     * @param {?} usercode
     * @return {?}
     */
    ChatMessageService.prototype.hasContact = /**
     * @param {?} usercode
     * @return {?}
     */
    function (usercode) {
        for (var i = 0; i < this.contacts.length; i++) {
            if (this.contacts[i].usercode === usercode) {
                return true;
            }
        }
        return false;
    };
    /**
     * @param {?} username
     * @param {?} message
     * @return {?}
     */
    ChatMessageService.prototype.send = /**
     * @param {?} username
     * @param {?} message
     * @return {?}
     */
    function (username, message) {
        return this.socketService.send(username, message, APP_CHAT);
    };
    /**
     * @param {?} envelop
     * @return {?}
     */
    ChatMessageService.prototype.sendEnvelop = /**
     * @param {?} envelop
     * @return {?}
     */
    function (envelop) {
        return this.socketService.sendEnvelop(envelop);
    };
    /**
     * @param {?} address
     * @param {?} message
     * @param {?=} join
     * @return {?}
     */
    ChatMessageService.prototype.buildEnvelop = /**
     * @param {?} address
     * @param {?} message
     * @param {?=} join
     * @return {?}
     */
    function (address, message, join) {
        if (join) {
            return this.socketService.buildEnvelop(address, message, APP_CHAT, join);
        }
        else {
            return this.socketService.buildEnvelop(address, message, APP_CHAT);
        }
    };
    /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    ChatMessageService.prototype.pushMessage = /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    function (params, callback) {
        var _this = this;
        /** @type {?} */
        var formData = this.httpService.convertToFormData(params);
        this.httpService.post(iNet.getPUrl('message/upload'), formData).subscribe((/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            /** @type {?} */
            var envelop = _this.socketService.buildEnvelop(params.alias, params.content, APP_CHAT);
            envelop.body.message = data.message;
            envelop.body.message.content = envelop.body.message.alert = params.content;
            envelop.body.uuid = data.uuid;
            _this.socketService.sendEnvelop(envelop);
            callback(envelop.body);
        }));
    };
    /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    ChatMessageService.prototype.loadMessages = /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    function (params, callback) {
        var _this = this;
        this.httpService.postJSON(iNet.getPUrl('message/query'), params).subscribe((/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            data = data || {};
            data.items = data.items || [];
            data.total = data.total || 0;
            data.items.sort((/**
             * @param {?} a
             * @param {?} b
             * @return {?}
             */
            function (a, b) { return a.sent - b.sent; }));
            data.items = data.items.map((/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return new MessageChat(item); }));
            _this.resetUnreadMessage(params['sender']);
            callback(data);
        }));
    };
    /**
     * @param {?} usercode
     * @param {?} message
     * @return {?}
     */
    ChatMessageService.prototype.updateLastMessage = /**
     * @param {?} usercode
     * @param {?} message
     * @return {?}
     */
    function (usercode, message) {
        var _this = this;
        // Update last message, move contact to first
        this.getContactByUserCode(usercode, (/**
         * @param {?} contact
         * @return {?}
         */
        function (contact) {
            /** @type {?} */
            var index = _this.contacts.indexOf(contact);
            if (index > -1) {
                _this.contacts.splice(index, 1);
            }
            _this.contacts.unshift(contact);
            /** @type {?} */
            var typeMessages = message.message.alert.split(":");
            if (typeMessages.length > 2) {
                if (typeMessages[0] === 'uri_message' && typeMessages[1] === 'video_conference') {
                    contact.message = '<i class="fa fa-phone pr-1" aria-hidden="true"></i> Cuộc gọi thoại';
                }
                else {
                    /** @type {?} */
                    var __mesDisplay = _this.revertMessageDisplay(message.message.alert) || '';
                    if (typeMessages[0] === 'uri_message' && typeMessages[1] === 'link_preview') {
                        contact.message = __mesDisplay;
                    }
                }
            }
            else {
                contact.message = message.message.alert;
            }
            // contact.message = message.message.alert;
            // Not me send
            if (message.sender !== iNet.usercode) {
                contact.unread++;
                _this.updateUnreadMessage();
            }
        }));
    };
    /**
     * @param {?} str
     * @return {?}
     */
    ChatMessageService.prototype.decodeBase64 = /**
     * @param {?} str
     * @return {?}
     */
    function (str) {
        return decodeURIComponent(escape(window.atob(str)));
    };
    /**
     * @param {?} username
     * @return {?}
     */
    ChatMessageService.prototype.resetUnreadMessage = /**
     * @param {?} username
     * @return {?}
     */
    function (username) {
        var _this = this;
        this.getContactByUserCode(username, (/**
         * @param {?} contact
         * @return {?}
         */
        function (contact) {
            contact.unread = 0;
            _this.updateUnreadMessage();
        }));
    };
    /**
     * @param {?} keyword
     * @param {?} callback
     * @return {?}
     */
    ChatMessageService.prototype.searchContacts = /**
     * @param {?} keyword
     * @param {?} callback
     * @return {?}
     */
    function (keyword, callback) {
        var _this = this;
        this.loadContacts((/**
         * @param {?} contacts
         * @return {?}
         */
        function (contacts) { return callback(_this._filterUsers(keyword, contacts)); }));
    };
    /**
     * @private
     * @param {?} keyword
     * @param {?} contacts
     * @return {?}
     */
    ChatMessageService.prototype._filterUsers = /**
     * @private
     * @param {?} keyword
     * @param {?} contacts
     * @return {?}
     */
    function (keyword, contacts) {
        if (!keyword) {
            return contacts;
        }
        return contacts.filter((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return item.isMatch(keyword); }));
    };
    /**
     * @param {?} message
     * @return {?}
     */
    ChatMessageService.prototype.revertMessage = /**
     * @param {?} message
     * @return {?}
     */
    function (message) {
        /** @type {?} */
        var __index = message.indexOf("uri_message") || 0;
        return message.substring(__index);
    };
    /**
     * @param {?} message
     * @return {?}
     */
    ChatMessageService.prototype.revertMessageDisplay = /**
     * @param {?} message
     * @return {?}
     */
    function (message) {
        /** @type {?} */
        var __index = message.indexOf("uri_message") || 0;
        return message.substring(0, __index);
    };
    /**
     * @return {?}
     */
    ChatMessageService.prototype.reconnetSocket = /**
     * @return {?}
     */
    function () {
        this.socketService.close();
    };
    /**
     * @param {?} message
     * @return {?}
     */
    ChatMessageService.prototype.checkJoinVideoCall = /**
     * @param {?} message
     * @return {?}
     */
    function (message) {
    };
    ChatMessageService._instance = null;
    ChatMessageService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    ChatMessageService.ctorParameters = function () { return [
        { type: HttpClientService },
        { type: WebSocketClientService }
    ]; };
    return ChatMessageService;
}());
export { ChatMessageService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    ChatMessageService._instance;
    /**
     * @type {?}
     * @private
     */
    ChatMessageService.prototype._socketObserver;
    /**
     * @type {?}
     * @private
     */
    ChatMessageService.prototype._messageSubject;
    /**
     * @type {?}
     * @private
     */
    ChatMessageService.prototype._unreadSubject;
    /** @type {?} */
    ChatMessageService.prototype.contacts;
    /** @type {?} */
    ChatMessageService.prototype.messageReceived;
    /** @type {?} */
    ChatMessageService.prototype.unreadMessageChange;
    /**
     * @type {?}
     * @private
     */
    ChatMessageService.prototype.httpService;
    /** @type {?} */
    ChatMessageService.prototype.socketService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC1jaGF0LyIsInNvdXJjZXMiOlsic3JjL21lc3NhZ2Uuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUMsaUJBQWlCLEVBQUUsc0JBQXNCLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFDcEUsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQ2xELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUN0RCxPQUFPLEVBQUMsVUFBVSxFQUFFLE9BQU8sRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUN6QyxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFLaEQ7SUFXSSw0QkFBb0IsV0FBOEIsRUFDL0IsYUFBcUM7UUFEeEQsaUJBYUM7UUFibUIsZ0JBQVcsR0FBWCxXQUFXLENBQW1CO1FBQy9CLGtCQUFhLEdBQWIsYUFBYSxDQUF3QjtRQVJoRCxvQkFBZSxHQUFHLElBQUksT0FBTyxFQUFlLENBQUM7UUFDN0MsbUJBQWMsR0FBRyxJQUFJLE9BQU8sRUFBVSxDQUFDO1FBRS9DLGFBQVEsR0FBcUIsRUFBRSxDQUFDO1FBQ2hDLG9CQUFlLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN0RCx3QkFBbUIsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBSXJELElBQUksa0JBQWtCLENBQUMsU0FBUyxFQUFFO1lBQzlCLE9BQU8sa0JBQWtCLENBQUMsU0FBUyxDQUFDO1NBQ3ZDO1FBQ0Qsa0JBQWtCLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUNwQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLFNBQVM7Ozs7UUFBQyxV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YSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQy9CLENBQUM7Ozs7O0lBRUQsK0NBQWtCOzs7O0lBQWxCLFVBQW1CLE9BQU87SUFDMUIsQ0FBQztJQXJNYyw0QkFBUyxHQUF1QixJQUFJLENBQUM7O2dCQUZ2RCxVQUFVOzs7O2dCQVRILGlCQUFpQjtnQkFBRSxzQkFBc0I7O0lBaU5qRCx5QkFBQztDQUFBLEFBeE1ELElBd01DO1NBdk1ZLGtCQUFrQjs7Ozs7O0lBQzNCLDZCQUFvRDs7Ozs7SUFDcEQsNkNBQXdCOzs7OztJQUN4Qiw2Q0FBcUQ7Ozs7O0lBQ3JELDRDQUErQzs7SUFFL0Msc0NBQWdDOztJQUNoQyw2Q0FBc0Q7O0lBQ3RELGlEQUF5RDs7Ozs7SUFFN0MseUNBQXNDOztJQUN0QywyQ0FBNEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtIdHRwQ2xpZW50U2VydmljZSwgV2ViU29ja2V0Q2xpZW50U2VydmljZX0gZnJvbSBcImluZXQtY29yZVwiO1xuaW1wb3J0IHtBUFBfQ0hBVH0gZnJvbSBcIi4vbW9kZWwvTWVzc2FnZUNvbnN0YW50c1wiO1xuaW1wb3J0IHtNZXNzYWdlQ29udGFjdH0gZnJvbSBcIi4vbW9kZWwvTWVzc2FnZUNvbnRhY3RcIjtcbmltcG9ydCB7T2JzZXJ2YWJsZSwgU3ViamVjdH0gZnJvbSBcInJ4anNcIjtcbmltcG9ydCB7TWVzc2FnZUNoYXR9IGZyb20gXCIuL21vZGVsL01lc3NhZ2VDaGF0XCI7XG5pbXBvcnQgeyBFbnZlbG9wQm9keSwgV2ViU29ja2V0RW52ZWxvcCB9IGZyb20gJ2luZXQtY29yZS9zcmMvd2Vic29ja2V0L3dlYnNvY2tldC1hYnN0cmFjdCc7XG5cbmRlY2xhcmUgbGV0IGlOZXQ6IGFueTtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENoYXRNZXNzYWdlU2VydmljZSB7XG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBDaGF0TWVzc2FnZVNlcnZpY2UgPSBudWxsO1xuICAgIHByaXZhdGUgX3NvY2tldE9ic2VydmVyO1xuICAgIHByaXZhdGUgX21lc3NhZ2VTdWJqZWN0ID0gbmV3IFN1YmplY3Q8TWVzc2FnZUNoYXQ+KCk7XG4gICAgcHJpdmF0ZSBfdW5yZWFkU3ViamVjdCA9IG5ldyBTdWJqZWN0PG51bWJlcj4oKTtcblxuICAgIGNvbnRhY3RzOiBNZXNzYWdlQ29udGFjdFtdID0gW107XG4gICAgbWVzc2FnZVJlY2VpdmVkID0gdGhpcy5fbWVzc2FnZVN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XG4gICAgdW5yZWFkTWVzc2FnZUNoYW5nZSA9IHRoaXMuX3VucmVhZFN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHBTZXJ2aWNlOiBIdHRwQ2xpZW50U2VydmljZSxcbiAgICAgICAgICAgICAgICBwdWJsaWMgc29ja2V0U2VydmljZTogV2ViU29ja2V0Q2xpZW50U2VydmljZSkge1xuICAgICAgICBpZiAoQ2hhdE1lc3NhZ2VTZXJ2aWNlLl9pbnN0YW5jZSkge1xuICAgICAgICAgICAgcmV0dXJuIENoYXRNZXNzYWdlU2VydmljZS5faW5zdGFuY2U7XG4gICAgICAgIH1cbiAgICAgICAgQ2hhdE1lc3NhZ2VTZXJ2aWNlLl9pbnN0YW5jZSA9IHRoaXM7XG4gICAgICAgIHRoaXMuX3NvY2tldE9ic2VydmVyID0gdGhpcy5zb2NrZXRTZXJ2aWNlLm9uTWVzc2FnZS5zdWJzY3JpYmUoKG1lc3NhZ2U6IEVudmVsb3BCb2R5KSA9PiB7XG4gICAgICAgICAgICBpZiAobWVzc2FnZS5hcHBsaWNhdGlvbiA9PT0gQVBQX0NIQVQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUxhc3RNZXNzYWdlKG1lc3NhZ2Uuc2VuZGVyLCBtZXNzYWdlKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9tZXNzYWdlU3ViamVjdC5uZXh0KG5ldyBNZXNzYWdlQ2hhdChtZXNzYWdlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgZGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fc29ja2V0T2JzZXJ2ZXIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgdGhpcy5fbWVzc2FnZVN1YmplY3QudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgdGhpcy5fdW5yZWFkU3ViamVjdC51bnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIGxvYWRGcmllbmRzKCkge1xuICAgICAgICByZXR1cm4gbmV3IE9ic2VydmFibGU8TWVzc2FnZUNvbnRhY3RbXT4oKG9ic2VydmVyKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmh0dHBTZXJ2aWNlLmdldEpTT04oaU5ldC5nZXRQVXJsKCd1bmlmaWVkcHVzaC9saXN0JykpLnN1YnNjcmliZSgoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgIG9ic2VydmVyLm5leHQoKGRhdGEgfHwgW10pLm1hcCgoaXRlbSkgPT4gbmV3IE1lc3NhZ2VDb250YWN0KGl0ZW0pKSk7XG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBsb2FkQ29udGFjdHMoY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbnRhY3RzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKHRoaXMuY29udGFjdHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5sb2FkRnJpZW5kcygpLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAoZGF0YTogTWVzc2FnZUNvbnRhY3RbXSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRhY3RzID0gZGF0YS5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0udXNlcmNvZGUgIT09IGlOZXQudXNlcmNvZGUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVVucmVhZE1lc3NhZ2UoKTtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sodGhpcy5jb250YWN0cyk7XG4gICAgICAgICAgICAgICAgfSwgKCkgPT4gY2FsbGJhY2soW10pXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlVW5yZWFkTWVzc2FnZSgpIHtcbiAgICAgICAgbGV0IHVucmVhZCA9IDA7XG4gICAgICAgIHRoaXMuY29udGFjdHMuZm9yRWFjaCgoZnJpZW5kKSA9PiB1bnJlYWQgKz0gZnJpZW5kLnVucmVhZCk7XG4gICAgICAgIHRoaXMuX3VucmVhZFN1YmplY3QubmV4dCh1bnJlYWQpO1xuICAgIH1cblxuICAgIGdldENvbnRhY3RCeVVzZXJDb2RlKHVzZXJjb2RlOiBzdHJpbmcsIGNhbGxiYWNrOiBGdW5jdGlvbikge1xuICAgICAgICBpZiAodXNlcmNvZGUgPT09ICduZXdzLWZlZWQnIHx8IHVzZXJjb2RlID09PSBpTmV0LnVzZXJjb2RlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5sb2FkQ29udGFjdHMoKGNvbnRhY3RzKSA9PiB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbnRhY3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNvbnRhY3RzW2ldLnVzZXJjb2RlID09PSB1c2VyY29kZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2FsbGJhY2soY29udGFjdHNbaV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGNvbnRhY3Qgbm90IGV4aXN0XG4gICAgICAgICAgICBjb25zdCBjb250YWN0ID0gbmV3IE1lc3NhZ2VDb250YWN0KHt1c2VyY29kZTogdXNlcmNvZGUsIGZ1bGxuYW1lOiB1c2VyY29kZSwgdW5yZWFkOiAxfSk7XG4gICAgICAgICAgICB0aGlzLmNvbnRhY3RzLnVuc2hpZnQoY29udGFjdCk7XG4gICAgICAgICAgICBjYWxsYmFjayhjb250YWN0KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaGFzQ29udGFjdCh1c2VyY29kZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jb250YWN0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHRoaXMuY29udGFjdHNbaV0udXNlcmNvZGUgPT09IHVzZXJjb2RlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHNlbmQodXNlcm5hbWU6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgICAgIHJldHVybiB0aGlzLnNvY2tldFNlcnZpY2Uuc2VuZCh1c2VybmFtZSwgbWVzc2FnZSwgQVBQX0NIQVQpO1xuICAgIH1cblxuICAgIHNlbmRFbnZlbG9wKGVudmVsb3A6IFdlYlNvY2tldEVudmVsb3ApOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc29ja2V0U2VydmljZS5zZW5kRW52ZWxvcChlbnZlbG9wKTtcbiAgICB9XG5cbiAgICBidWlsZEVudmVsb3AoYWRkcmVzczogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmcsam9pbj86IHN0cmluZyk6IFdlYlNvY2tldEVudmVsb3Age1xuICAgICAgICBpZihqb2luKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNvY2tldFNlcnZpY2UuYnVpbGRFbnZlbG9wKGFkZHJlc3MsIG1lc3NhZ2UsIEFQUF9DSEFULCBqb2luKTtcblxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNvY2tldFNlcnZpY2UuYnVpbGRFbnZlbG9wKGFkZHJlc3MsIG1lc3NhZ2UsIEFQUF9DSEFUKTtcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVzaE1lc3NhZ2UocGFyYW1zLCBjYWxsYmFjazogRnVuY3Rpb24pIHtcbiAgICAgICAgY29uc3QgZm9ybURhdGEgPSB0aGlzLmh0dHBTZXJ2aWNlLmNvbnZlcnRUb0Zvcm1EYXRhKHBhcmFtcyk7XG4gICAgICAgIHRoaXMuaHR0cFNlcnZpY2UucG9zdChpTmV0LmdldFBVcmwoJ21lc3NhZ2UvdXBsb2FkJyksIGZvcm1EYXRhKS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAoZGF0YTogRW52ZWxvcEJvZHkpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgZW52ZWxvcDogV2ViU29ja2V0RW52ZWxvcCA9IHRoaXMuc29ja2V0U2VydmljZS5idWlsZEVudmVsb3AocGFyYW1zLmFsaWFzLCBwYXJhbXMuY29udGVudCwgQVBQX0NIQVQpO1xuICAgICAgICAgICAgICAgIGVudmVsb3AuYm9keS5tZXNzYWdlID0gZGF0YS5tZXNzYWdlO1xuICAgICAgICAgICAgICAgIGVudmVsb3AuYm9keS5tZXNzYWdlLmNvbnRlbnQgPSBlbnZlbG9wLmJvZHkubWVzc2FnZS5hbGVydCA9IHBhcmFtcy5jb250ZW50O1xuICAgICAgICAgICAgICAgIGVudmVsb3AuYm9keS51dWlkID0gZGF0YS51dWlkO1xuICAgICAgICAgICAgICAgIHRoaXMuc29ja2V0U2VydmljZS5zZW5kRW52ZWxvcChlbnZlbG9wKTtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhlbnZlbG9wLmJvZHkpO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cblxuICAgIGxvYWRNZXNzYWdlcyhwYXJhbXMsIGNhbGxiYWNrOiBGdW5jdGlvbikge1xuICAgICAgICB0aGlzLmh0dHBTZXJ2aWNlLnBvc3RKU09OKGlOZXQuZ2V0UFVybCgnbWVzc2FnZS9xdWVyeScpLCBwYXJhbXMpLnN1YnNjcmliZSgoZGF0YSkgPT4ge1xuICAgICAgICAgICAgZGF0YSA9IGRhdGEgfHwge307XG4gICAgICAgICAgICBkYXRhLml0ZW1zID0gZGF0YS5pdGVtcyB8fCBbXTtcbiAgICAgICAgICAgIGRhdGEudG90YWwgPSBkYXRhLnRvdGFsIHx8IDA7XG4gICAgICAgICAgICBkYXRhLml0ZW1zLnNvcnQoKGEsIGIpID0+IGEuc2VudCAtIGIuc2VudCk7XG4gICAgICAgICAgICBkYXRhLml0ZW1zID0gZGF0YS5pdGVtcy5tYXAoKGl0ZW0pID0+IG5ldyBNZXNzYWdlQ2hhdChpdGVtKSk7XG4gICAgICAgICAgICB0aGlzLnJlc2V0VW5yZWFkTWVzc2FnZShwYXJhbXNbJ3NlbmRlciddKTtcbiAgICAgICAgICAgIGNhbGxiYWNrKGRhdGEpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB1cGRhdGVMYXN0TWVzc2FnZSh1c2VyY29kZTogc3RyaW5nLCBtZXNzYWdlOiBFbnZlbG9wQm9keSkge1xuICAgICAgICAvLyBVcGRhdGUgbGFzdCBtZXNzYWdlLCBtb3ZlIGNvbnRhY3QgdG8gZmlyc3RcbiAgICAgICAgdGhpcy5nZXRDb250YWN0QnlVc2VyQ29kZSh1c2VyY29kZSwgKGNvbnRhY3Q6IE1lc3NhZ2VDb250YWN0KSA9PiB7XG4gICAgICAgICAgICB2YXIgaW5kZXggPSB0aGlzLmNvbnRhY3RzLmluZGV4T2YoY29udGFjdCk7XG4gICAgICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGFjdHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuY29udGFjdHMudW5zaGlmdChjb250YWN0KTtcbiAgICAgICAgICAgICAgICBsZXQgdHlwZU1lc3NhZ2VzID0gIG1lc3NhZ2UubWVzc2FnZS5hbGVydC5zcGxpdChcIjpcIik7XG4gICAgICAgICAgICBpZih0eXBlTWVzc2FnZXMubGVuZ3RoID4yKXtcbiAgICAgICAgICAgICAgICAgICAgaWYodHlwZU1lc3NhZ2VzWzBdPT09J3VyaV9tZXNzYWdlJyAmJiB0eXBlTWVzc2FnZXNbMV09PT0ndmlkZW9fY29uZmVyZW5jZScpe1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGFjdC5tZXNzYWdlID0gJzxpIGNsYXNzPVwiZmEgZmEtcGhvbmUgcHItMVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT4gQ3Xhu5ljIGfhu41pIHRob+G6oWknO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgX19tZXNEaXNwbGF5ID0gIHRoaXMucmV2ZXJ0TWVzc2FnZURpc3BsYXkobWVzc2FnZS5tZXNzYWdlLmFsZXJ0KSB8fCAnJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHR5cGVNZXNzYWdlc1swXT09PSd1cmlfbWVzc2FnZScgJiYgdHlwZU1lc3NhZ2VzWzFdPT09J2xpbmtfcHJldmlldycpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhY3QubWVzc2FnZSA9X19tZXNEaXNwbGF5O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgY29udGFjdC5tZXNzYWdlID0gbWVzc2FnZS5tZXNzYWdlLmFsZXJ0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBjb250YWN0Lm1lc3NhZ2UgPSBtZXNzYWdlLm1lc3NhZ2UuYWxlcnQ7XG5cbiAgICAgICAgICAgIC8vIE5vdCBtZSBzZW5kXG4gICAgICAgICAgICBpZiAobWVzc2FnZS5zZW5kZXIgIT09IGlOZXQudXNlcmNvZGUpIHtcbiAgICAgICAgICAgICAgICBjb250YWN0LnVucmVhZCsrO1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlVW5yZWFkTWVzc2FnZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgZGVjb2RlQmFzZTY0KHN0cjogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoZXNjYXBlKHdpbmRvdy5hdG9iKHN0cikpKTtcbiAgICB9XG5cbiAgICByZXNldFVucmVhZE1lc3NhZ2UodXNlcm5hbWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLmdldENvbnRhY3RCeVVzZXJDb2RlKHVzZXJuYW1lLCAoY29udGFjdCkgPT4ge1xuICAgICAgICAgICAgY29udGFjdC51bnJlYWQgPSAwO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVVbnJlYWRNZXNzYWdlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNlYXJjaENvbnRhY3RzKGtleXdvcmQ6IHN0cmluZywgY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XG4gICAgICAgIHRoaXMubG9hZENvbnRhY3RzKChjb250YWN0czogTWVzc2FnZUNvbnRhY3RbXSkgPT4gY2FsbGJhY2sodGhpcy5fZmlsdGVyVXNlcnMoa2V5d29yZCwgY29udGFjdHMpKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZmlsdGVyVXNlcnMoa2V5d29yZDogc3RyaW5nLCBjb250YWN0czogTWVzc2FnZUNvbnRhY3RbXSkge1xuICAgICAgICBpZiAoIWtleXdvcmQpIHtcbiAgICAgICAgICAgIHJldHVybiBjb250YWN0cztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29udGFjdHMuZmlsdGVyKChpdGVtKSA9PiBpdGVtLmlzTWF0Y2goa2V5d29yZCkpO1xuICAgIH1cblxuICAgIHJldmVydE1lc3NhZ2UobWVzc2FnZTogc3RyaW5nKXtcbiAgICAgICAgbGV0IF9faW5kZXggPSBtZXNzYWdlLmluZGV4T2YoXCJ1cmlfbWVzc2FnZVwiKSB8fCAwO1xuICAgICAgIHJldHVybiAgbWVzc2FnZS5zdWJzdHJpbmcoX19pbmRleCk7XG4gICAgfVxuICAgIHJldmVydE1lc3NhZ2VEaXNwbGF5KG1lc3NhZ2U6IHN0cmluZyl7XG4gICAgICAgIGxldCBfX2luZGV4ID0gbWVzc2FnZS5pbmRleE9mKFwidXJpX21lc3NhZ2VcIikgfHwgMDtcbiAgICAgICAgcmV0dXJuICBtZXNzYWdlLnN1YnN0cmluZygwLF9faW5kZXgpO1xuICAgIH1cblxuICAgIHJlY29ubmV0U29ja2V0KCl7XG4gICAgICAgIHRoaXMuc29ja2V0U2VydmljZS5jbG9zZSgpO1xuICAgIH1cblxuICAgIGNoZWNrSm9pblZpZGVvQ2FsbChtZXNzYWdlKXtcbiAgICB9XG59XG4iXX0=