(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('inet-core'), require('rxjs'), require('moment'), require('@angular/forms'), require('ngx-autosize')) :
    typeof define === 'function' && define.amd ? define('inet-chat', ['exports', '@angular/core', '@angular/common', 'inet-core', 'rxjs', 'moment', '@angular/forms', 'ngx-autosize'], factory) :
    (global = global || self, factory(global['inet-chat'] = {}, global.ng.core, global.ng.common, global.inetCore, global.rxjs, global._moment, global.ng.forms, global.ngxAutosize));
}(this, (function (exports, core, common, inetCore, rxjs, _moment, forms, ngxAutosize) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var APP_CHAT = 'iChat';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var MessageContact = /** @class */ (function () {
        function MessageContact(options) {
            this.fullname = '';
            this.usercode = '';
            this.lastmsg = 0;
            this.message = '';
            this.online = false;
            this.unread = 0;
            // COMPANY | FRIEND
            this._indexSearch = '';
            Object.assign(this, options);
            // this.message = HtmlUtils.formatHtmlDisplay(this.message);
            this._indexSearch = MessageContact._accent.viToEn(this.fullname.toLowerCase()) + ' ';
            // Remove suffix email "@inetcloud.vn"
            this._indexSearch += MessageContact._accent.viToEn(this.usercode.slice(0, this.usercode.indexOf('@')));
        }
        /**
         * @param {?=} keyword
         * @return {?}
         */
        MessageContact.prototype.isMatch = /**
         * @param {?=} keyword
         * @return {?}
         */
        function (keyword) {
            if (keyword === void 0) { keyword = ''; }
            return this._indexSearch.indexOf(MessageContact._accent.viToEn(keyword)) > -1;
        };
        MessageContact._accent = new inetCore.AccentService();
        return MessageContact;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        MessageContact._accent;
        /** @type {?} */
        MessageContact.prototype.fullname;
        /** @type {?} */
        MessageContact.prototype.usercode;
        /** @type {?} */
        MessageContact.prototype.lastmsg;
        /** @type {?} */
        MessageContact.prototype.message;
        /** @type {?} */
        MessageContact.prototype.online;
        /** @type {?} */
        MessageContact.prototype.unread;
        /** @type {?} */
        MessageContact.prototype.type;
        /** @type {?} */
        MessageContact.prototype._indexSearch;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var moment = _moment;
    var DateFormatter = /** @class */ (function () {
        function DateFormatter(date) {
            this.date = new Date(date);
        }
        /**
         * @return {?}
         */
        DateFormatter.prototype.formatFullYear = /**
         * @return {?}
         */
        function () {
            return moment(this.date).format('DD/MM/YYYY, H:mm');
        };
        /**
         * @return {?}
         */
        DateFormatter.prototype.formatYear = /**
         * @return {?}
         */
        function () {
            return moment(this.date).format('DD/MM/YYYY');
        };
        /**
         * @return {?}
         */
        DateFormatter.prototype.formatMonth = /**
         * @return {?}
         */
        function () {
            return moment(this.date).format('DD/MM, H:mm');
        };
        /**
         * @return {?}
         */
        DateFormatter.prototype.formatDate = /**
         * @return {?}
         */
        function () {
            return moment(this.date).format('DD/MM, H:mm');
        };
        /**
         * @return {?}
         */
        DateFormatter.prototype.formatTime = /**
         * @return {?}
         */
        function () {
            return moment(this.date).format('H:mm');
        };
        /**
         * @return {?}
         */
        DateFormatter.prototype.format = /**
         * @return {?}
         */
        function () {
            if (!this.date.getTime()) {
                return '';
            }
            /** @type {?} */
            var now = new Date();
            /** @type {?} */
            var conditions = {
                onYear: now.getFullYear() === this.date.getFullYear(),
                onMonth: now.getMonth() === this.date.getMonth(),
                onDate: now.getDate() === this.date.getDate(),
            };
            if (conditions.onYear && conditions.onMonth && conditions.onDate) {
                return this.formatTime();
            }
            if (conditions.onYear && conditions.onMonth) {
                return this.formatDate();
            }
            if (conditions.onYear) {
                return this.formatMonth();
            }
            return this.formatYear();
        };
        return DateFormatter;
    }());
    if (false) {
        /** @type {?} */
        DateFormatter.prototype.date;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var MessageChat = /** @class */ (function () {
        function MessageChat(message) {
            this.isSent = false;
            this.attachments = [];
            /** @type {?} */
            var formatter = new DateFormatter(message.sent || new Date());
            this.message = message;
            this.isSent = this.message.sender === iNet.username;
            this.attachments = MessageChat.parseAttachments(message);
            this.displayText = inetCore.HtmlUtils.formatHtmlDisplay(message.message.alert || message.message.content);
            this.shortTime = formatter.formatTime();
            this.longTime = formatter.formatFullYear();
            this.date = formatter.date;
        }
        /**
         * @param {?} data
         * @return {?}
         */
        MessageChat.parseAttachments = /**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            // uuid://5d021cb39278c2c3666081a0
            /** @type {?} */
            var attachments = [];
            for (var k in data.message) {
                if (k.startsWith('uuid://')) {
                    /** @type {?} */
                    var name = data.message[k];
                    /** @type {?} */
                    var canViewInline = /(png|jpg|jpeg|pdf)$/i.test(name);
                    /** @type {?} */
                    var fileIsImage = /(png|jpg|jpeg|gif)$/i.test(name);
                    /** @type {?} */
                    var url = iNet.getPUrl(canViewInline ? 'message/binaryinline' : 'message/binary') +
                        ("?uuid=" + data.uuid + "&uploadID=" + k);
                    attachments.push({
                        url: url,
                        id: k,
                        name: name,
                        image: fileIsImage,
                        canViewInline: canViewInline
                    });
                }
            }
            return attachments;
        };
        return MessageChat;
    }());
    if (false) {
        /** @type {?} */
        MessageChat.prototype.message;
        /** @type {?} */
        MessageChat.prototype.isSent;
        /** @type {?} */
        MessageChat.prototype.attachments;
        /** @type {?} */
        MessageChat.prototype.displayText;
        /** @type {?} */
        MessageChat.prototype.shortTime;
        /** @type {?} */
        MessageChat.prototype.longTime;
        /** @type {?} */
        MessageChat.prototype.date;
        /** @type {?} */
        MessageChat.prototype._openGraph;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ChatMessageService = /** @class */ (function () {
        function ChatMessageService(httpService, socketService) {
            var _this = this;
            this.httpService = httpService;
            this.socketService = socketService;
            this._messageSubject = new rxjs.Subject();
            this._unreadSubject = new rxjs.Subject();
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
            return new rxjs.Observable((/**
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
            { type: core.Injectable }
        ];
        /** @nocollapse */
        ChatMessageService.ctorParameters = function () { return [
            { type: inetCore.HttpClientService },
            { type: inetCore.WebSocketClientService }
        ]; };
        return ChatMessageService;
    }());
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

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ContactListComponent = /** @class */ (function () {
        function ContactListComponent(messageService, webSocketService) {
            this.messageService = messageService;
            this.webSocketService = webSocketService;
            this.contactSelected = new core.EventEmitter();
            this.roomSelected = new core.EventEmitter();
            this.callTo = new core.EventEmitter();
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
            { type: core.Component, args: [{
                        selector: 'message-contact-list',
                        template: "<div  class=\"contact bg-white\" role=\"button\">\n    <div  class=\"contact-online online\" >\n        <img class=\"contact-image\" userAvatar [usercode]=\"username\">\n    </div>\n    <div  class=\"contact-content\">\n        <div  class=\"contact-name\">{{fullname}}</div>\n    </div>\n    <div  style=\"white-space: nowrap\"><i  class=\"message-chat__action fa fa-ellipsis-v\"></i>\n    </div>\n</div>\n\n<div class=\"contact-list__search\">\n    <search-input [placeholder]=\"'T\u00ECm ki\u1EBFm ...'\" (onChanged)=\"searchContacts($event)\"></search-input>\n    <!--    <div class=\"text-center m-1\">-->\n    <!--        <button (click)=\"selectRoom('company')\" type=\"button\" class=\"btn btn-block btn-light\">-->\n    <!--            <i class=\"fa fa-video-camera\"></i> Cu\u1ED9c h\u1ECDp c\u00F4ng ty</button>-->\n    <!--    </div>-->\n</div>\n<div #contactRef class=\"contact-list__body\">\n    <div *ngFor=\"let contact of contacts\" class=\"contact\" role=\"button\" (click)=\"selectContact(contact)\">\n        <div class=\"contact-online\" [ngClass]=\"{'online': contact.online,'offline': !contact.online }\">\n            <img class=\"contact-image\" userAvatar [usercode]=\"contact.usercode\">\n        </div>\n        <div class=\"contact-content\">\n            <div class=\"contact-name\">{{contact.fullname || contact.usercode}}</div>\n            <div class=\"contact-detail\" [innerHTML]=\"contact.message\"></div>\n        </div>\n        <div *ngIf=\"contact.unread\" class=\"contact-icon badge badge-danger\" style=\"margin-right: 5px\">\n            {{contact.unread}}\n        </div>\n        <div *ngIf=\"contact.usercode !== username\" (click)=\"callToContact(contact)\" style=\"white-space: nowrap\"><i\n                class=\"message-chat__action fa fa-phone\"></i></div>\n        <!--        <i class=\"contact-icon fa fa-circle text-secondary\" [ngClass]=\"{'text-success': contact.online}\"></i>-->\n    </div>\n</div>\n<!--<ul class=\"chat-main\">-->\n<!--    <li data-to=\"blank\">-->\n<!--        <div class=\"chat-box\">-->\n<!--            <div class=\"profile offline bg-size\" style=\"background-image: url(&quot;../assets/images/contact/1.jpg&quot;); background-size: cover; background-position: center center; display: block;\"><img class=\"bg-img\" src=\"../assets/images/contact/1.jpg\" alt=\"Avatar\" style=\"display: none;\"></div>-->\n<!--            <div class=\"details\">-->\n<!--                <h5>Josephin water</h5>-->\n<!--                <h6>Hi, i am josephin. How are you.. ! There are many variations of passages.</h6>-->\n<!--            </div>-->\n<!--            <div class=\"date-status\"><i class=\"ti-pin2\"></i>-->\n<!--                <h6>22/10/19</h6>-->\n<!--                <h6 class=\"font-success status\"> Seen</h6>-->\n<!--            </div>-->\n<!--        </div>-->\n<!--    </li>-->\n<!--    <li class=\"active\" data-to=\"chating\">-->\n<!--        <div class=\"chat-box\">-->\n<!--            <div class=\"profile online bg-size\" style=\"background-image: url(&quot;../assets/images/contact/2.jpg&quot;); background-size: cover; background-position: center center; display: block;\"><img class=\"bg-img\" src=\"../assets/images/contact/2.jpg\" alt=\"Avatar\" style=\"display: none;\"></div>-->\n<!--            <div class=\"details\">-->\n<!--                <h5>Jony Lynetin</h5>-->\n<!--                <h6>Typing................</h6>-->\n<!--            </div>-->\n<!--            <div class=\"date-status\"><i class=\"ti-pin2\"></i>-->\n<!--                <h6>30/11/19</h6>-->\n<!--                <div class=\"badge badge-primary sm\">8</div>-->\n<!--            </div>-->\n<!--        </div>-->\n<!--    </li>-->\n<!--    <li data-to=\"blank\">-->\n<!--        <div class=\"chat-box\">-->\n<!--            <div class=\"profile unreachable bg-size\" style=\"background-image: url(&quot;../assets/images/contact/3.jpg&quot;); background-size: cover; background-position: center center; display: block;\"><img class=\"bg-img\" src=\"../assets/images/contact/3.jpg\" alt=\"Avatar\" style=\"display: none;\"></div>-->\n<!--            <div class=\"details\">-->\n<!--                <h5>Sufiya Elija</h5>-->\n<!--                <h6>I need job, please help me.</h6>-->\n<!--            </div>-->\n<!--            <div class=\"date-status\"><i class=\"ti-pin2\"></i>-->\n<!--                <h6>15/06/19</h6>-->\n<!--                <h6 class=\"font-dark status\"> Sending</h6>-->\n<!--            </div>-->\n<!--        </div>-->\n<!--    </li>-->\n<!--    <li data-to=\"blank\">-->\n<!--        <div class=\"chat-box\">-->\n<!--            <div class=\"profile busy bg-size\" style=\"background-image: url(&quot;../assets/images/contact/4.jpg&quot;); background-size: cover; background-position: center center; display: block;\"><img class=\"bg-img\" src=\"../assets/images/contact/4.jpg\" alt=\"Avatar\" style=\"display: none;\"></div>-->\n<!--            <div class=\"details\">-->\n<!--                <h5>Mukrani Pabelo</h5>-->\n<!--                <h6>Hi, i am josephin. How are you.. ! There are many variations of passages.</h6>-->\n<!--            </div>-->\n<!--            <div class=\"date-status\"><i class=\"ti-pin2\"></i>-->\n<!--                <h6>04/06/19</h6>-->\n<!--                <h6 class=\"font-danger status\"> Failed</h6>-->\n<!--            </div>-->\n<!--        </div>-->\n<!--    </li>-->\n<!--    <li data-to=\"blank\">-->\n<!--        <div class=\"chat-box\">-->\n<!--            <div class=\"profile busy bg-size\" style=\"background-image: url(&quot;../assets/images/contact/2.jpg&quot;); background-size: cover; background-position: center center; display: block;\"><img class=\"bg-img\" src=\"../assets/images/contact/2.jpg\" alt=\"Avatar\" style=\"display: none;\"></div>-->\n<!--            <div class=\"details\">-->\n<!--                <h5>Jhon Deo</h5>-->\n<!--                <h6>Hi, i am josephin. How are you.. ! There are many variations of passages.</h6>-->\n<!--            </div>-->\n<!--            <div class=\"date-status\"><i class=\"ti-pin2\"></i>-->\n<!--                <h6>04/06/19</h6>-->\n<!--                <h6 class=\"font-danger status\"> Failed</h6>-->\n<!--            </div>-->\n<!--        </div>-->\n<!--    </li>-->\n<!--    <li data-to=\"blank\">-->\n<!--        <div class=\"chat-box\">-->\n<!--            <div class=\"profile busy bg-size\" style=\"background-image: url(&quot;../assets/images/contact/1.jpg&quot;); background-size: cover; background-position: center center; display: block;\"><img class=\"bg-img\" src=\"../assets/images/contact/1.jpg\" alt=\"Avatar\" style=\"display: none;\"></div>-->\n<!--            <div class=\"details\">-->\n<!--                <h5>Pabelo Mukrani</h5>-->\n<!--                <h6>Hi, i am josephin. How are you.. ! There are many variations of passages.</h6>-->\n<!--            </div>-->\n<!--            <div class=\"date-status\"><i class=\"ti-pin2\"></i>-->\n<!--                <h6>04/06/19</h6>-->\n<!--                <h6 class=\"font-danger status\"> Failed</h6>-->\n<!--            </div>-->\n<!--        </div>-->\n<!--    </li>-->\n<!--</ul>-->",
                        styles: [".message-chat__action{min-width:34px;width:34px;height:34px;line-height:34px;font-size:17px;text-align:center;border-radius:50%;background:#eff7fe;color:#1c9dea;margin-left:10px;cursor:pointer}.message-chat__action:hover{background:#1c9dea;color:#fff}.subject-text,.watermark .leftwatermark{display:none!important}:host{display:block;position:relative;height:100%}.contact-list__search{position:absolute;top:50px;left:0;width:100%;height:50px;padding:10px;background:#fff;border-bottom:1px solid #d3d3d3}.contact-list__body{position:absolute;top:100px;left:0;bottom:0;width:100%;overflow:auto;background:#fff}.contact-list__body::-webkit-scrollbar{width:5px}.contact-list__body::-webkit-scrollbar-track{background:#f1f1f1}.contact-list__body::-webkit-scrollbar-thumb{background:#d6eaf7}.contact-list__body::-webkit-scrollbar-thumb:hover{background:#d6eaf7}.contact{padding:10px;cursor:pointer;display:flex;align-items:center}.contact:active,.contact:hover{background:#eff7fe}.contact:last-child{border-bottom:1px solid #ddd}.contact-image{min-width:40px;width:40px;height:40px;line-height:40px;font-size:20px;text-align:center;border-radius:50%;margin-right:10px;background:rgba(0,0,0,.1)}.contact-content{flex-grow:1;overflow:hidden;font-size:16px;line-height:20px}.contact-name{margin-bottom:2px;color:rgba(0,0,0,.7);font-weight:700;font-size:14px}.contact-detail{font-size:13px;color:rgba(0,0,0,.5);height:14px;line-height:14px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.contact-icon{font-size:9px}.contact-online.offline::before,.contact-online.online::before{content:\"\";position:absolute;height:13px;width:13px;border-radius:100%;border:2px solid #fff;left:44px}.contact-online.online::before{background:#28a745}.contact-online.offline::before{background:#6c757d}"]
                    }] }
        ];
        /** @nocollapse */
        ContactListComponent.ctorParameters = function () { return [
            { type: ChatMessageService },
            { type: inetCore.WebSocketClientService }
        ]; };
        ContactListComponent.propDecorators = {
            contactSelected: [{ type: core.Output }],
            roomSelected: [{ type: core.Output }],
            callTo: [{ type: core.Output }],
            contactRef: [{ type: core.ViewChild, args: ['contactRef',] }]
        };
        return ContactListComponent;
    }());
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

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var MessageChatHolder = /** @class */ (function () {
        function MessageChatHolder(date) {
            this.messages = [];
            this.date = new Date(date);
            this.date.setHours(0, 0, 0, 0);
            this.display = new DateFormatter(this.date).formatYear();
        }
        /**
         * @param {?} date
         * @return {?}
         */
        MessageChatHolder.prototype.isSameDate = /**
         * @param {?} date
         * @return {?}
         */
        function (date) {
            /** @type {?} */
            var d = new Date(date);
            d.setHours(0, 0, 0, 0);
            return this.date.getTime() === d.getTime();
        };
        return MessageChatHolder;
    }());
    if (false) {
        /** @type {?} */
        MessageChatHolder.prototype.messages;
        /** @type {?} */
        MessageChatHolder.prototype.date;
        /** @type {?} */
        MessageChatHolder.prototype.display;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var FileListComponent = /** @class */ (function () {
        function FileListComponent() {
            this.files = [];
            this.removable = true;
            this.onClick = new core.EventEmitter();
            this.onRemove = new core.EventEmitter();
        }
        /**
         * @return {?}
         */
        FileListComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            this._initFileEl();
        };
        /**
         * @param {?} file
         * @param {?} event
         * @return {?}
         */
        FileListComponent.prototype.clickFile = /**
         * @param {?} file
         * @param {?} event
         * @return {?}
         */
        function (file, event) {
            this.onClick.emit({ file: file, event: event });
        };
        /**
         * @param {?} file
         * @return {?}
         */
        FileListComponent.prototype.removeFile = /**
         * @param {?} file
         * @return {?}
         */
        function (file) {
            /** @type {?} */
            var index = this.files.indexOf(file);
            if (index > -1) {
                this.files.splice(index, 1);
                this.onRemove.emit(file);
            }
        };
        /**
         * @param {?} files
         * @return {?}
         */
        FileListComponent.prototype.addFiles = /**
         * @param {?} files
         * @return {?}
         */
        function (files) {
            // Read as base64 if image
            for (var i = 0; i < files.length; i++) {
                /** @type {?} */
                var file = files[i];
                if (this._fileIsImage(file)) {
                    file['image'] = true;
                    this._readImageBase64(file);
                }
                this.files.push(file);
            }
        };
        /**
         * @private
         * @return {?}
         */
        FileListComponent.prototype._initFileEl = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            if (this.fileEl) {
                this.fileEl.addEventListener('change', (/**
                 * @param {?} e
                 * @return {?}
                 */
                function (e) {
                    /** @type {?} */
                    var files = _this.fileEl.files;
                    if (files.length > 0) {
                        // Read as base64 if image
                        _this.addFiles(files);
                        // Reset file
                        _this.fileEl.value = '';
                    }
                }));
            }
        };
        /**
         * @private
         * @param {?} file
         * @return {?}
         */
        FileListComponent.prototype._readImageBase64 = /**
         * @private
         * @param {?} file
         * @return {?}
         */
        function (file) {
            /** @type {?} */
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (/**
             * @return {?}
             */
            function () {
                file.url = reader.result;
            });
        };
        /**
         * @private
         * @param {?} file
         * @return {?}
         */
        FileListComponent.prototype._fileIsImage = /**
         * @private
         * @param {?} file
         * @return {?}
         */
        function (file) {
            return file.type && file.type.indexOf('image') > -1;
        };
        FileListComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'file-list',
                        template: "<ng-container *ngFor=\"let file of files\">\n    <ng-template *ngTemplateOutlet=\"template ? template : fileItem; context: {file: file}\">\n    </ng-template>\n</ng-container>\n<ng-template #fileItem let-file=\"file\">\n    <div class=\"file-item\" [title]=\"file.name\" (click)=\"clickFile(file, $event)\">\n        <img *ngIf=\"file.image; else icon\" [src]=\"file.url\" class=\"file-item__image\">\n        <ng-template #icon>\n            <img [src]=\"file.name | fileIcon\" class=\"file-item__image_type\">\n            <div class=\"file-item__name\">{{file.name}}</div>\n        </ng-template>\n        <i *ngIf=\"removable\" (click)=\"removeFile(file)\" class=\"fa fa-times file-item__remove\"></i>\n    </div>\n</ng-template>",
                        styles: [":host{display:block}.file-item{display:flex;align-items:center;width:auto;height:100%;border-radius:2px;position:relative;margin-right:5px;margin-bottom:5px;overflow:hidden;padding:0 5px;cursor:pointer}.file-item__image_type{max-width:36px;max-height:36px;margin-bottom:5px;margin-top:5px;margin-right:5px}.file-item__name{font-size:12px;line-height:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.file-item__remove{position:absolute;right:3px;top:3px;cursor:pointer;width:24px;height:24px;line-height:24px;border-radius:50%;background:rgba(0,0,0,.2);color:#fff;text-align:center;font-size:12px}.file-item__remove:hover{background:rgba(0,0,0,.5)}"]
                    }] }
        ];
        FileListComponent.propDecorators = {
            fileEl: [{ type: core.Input }],
            files: [{ type: core.Input }],
            removable: [{ type: core.Input }],
            template: [{ type: core.Input }],
            onClick: [{ type: core.Output }],
            onRemove: [{ type: core.Output }]
        };
        return FileListComponent;
    }());
    if (false) {
        /** @type {?} */
        FileListComponent.prototype.fileEl;
        /** @type {?} */
        FileListComponent.prototype.files;
        /** @type {?} */
        FileListComponent.prototype.removable;
        /** @type {?} */
        FileListComponent.prototype.template;
        /** @type {?} */
        FileListComponent.prototype.onClick;
        /** @type {?} */
        FileListComponent.prototype.onRemove;
    }
    /**
     * @record
     */
    function FileListItem() { }
    if (false) {
        /** @type {?|undefined} */
        FileListItem.prototype.id;
        /** @type {?|undefined} */
        FileListItem.prototype.url;
        /** @type {?|undefined} */
        FileListItem.prototype.image;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var VideoConferenceService = /** @class */ (function () {
        function VideoConferenceService(httpService) {
            this.httpService = httpService;
            this.domain = 'jitsi.inetcloud.vn';
            this.messageJoin = { app: 'iChat', conferenceID: '', sender: '', joined: '', inAccess: '' };
            return VideoConferenceService.instance = VideoConferenceService.instance || this;
        }
        /**
         * @param {?} parentNode
         * @param {?} roomName
         * @param {?=} audioOnly
         * @param {?=} height
         * @param {?=} callback
         * @return {?}
         */
        VideoConferenceService.prototype.join = /**
         * @param {?} parentNode
         * @param {?} roomName
         * @param {?=} audioOnly
         * @param {?=} height
         * @param {?=} callback
         * @return {?}
         */
        function (parentNode, roomName, audioOnly, height, callback) {
            var _this = this;
            if (audioOnly === void 0) { audioOnly = false; }
            if (height === void 0) { height = 350; }
            if (!JitsiMeetExternalAPI) {
                return;
            }
            /** @type {?} */
            var tokenId = '';
            this.httpService.postJSON(iNet.getPUrl('conference/authorized'), { roomID: roomName }).subscribe((/**
             * @param {?} data
             * @return {?}
             */
            function (data) {
                tokenId = data.webdata || '';
                _this.dispose();
                /** @type {?} */
                var options = {
                    roomName: roomName,
                    width: '100%',
                    height: '100%',
                    parentNode: parentNode,
                    jwt: tokenId
                };
                if (audioOnly) {
                    options.height = '100%';
                    options['configOverwrite'] = {
                        startAudioOnly: true,
                        startWithVideoMuted: true
                    };
                }
                _this.api = new JitsiMeetExternalAPI(_this.domain, options);
                if (callback) {
                    callback(_this.api);
                }
                _this.api.executeCommand('sendTones', {
                    tones: '12345#',
                    // The dial pad touch tones to play. For example, '12345#'.
                    duration: 200,
                    // Optional. The number of milliseconds each tone should play. The default is 200.
                    pause: 200 // Optional. The number of milliseconds between each tone. The default is 200.
                });
                // this.api.executeCommand('displayName', iNet.displayName);
                // this.api.executeCommand('email', iNet.username);
                // this.api.executeCommand('setVideoQuality', 720);
            }));
            /*
            this.api.addEventListener('readyToClose',  ()=> {
                this.dispose();
            });

             */
        };
        /**
         * @param {?} parentNode
         * @param {?} userName
         * @param {?=} audioOnly
         * @param {?=} height
         * @param {?=} callback
         * @return {?}
         */
        VideoConferenceService.prototype.callTo = /**
         * @param {?} parentNode
         * @param {?} userName
         * @param {?=} audioOnly
         * @param {?=} height
         * @param {?=} callback
         * @return {?}
         */
        function (parentNode, userName, audioOnly, height, callback) {
            var _this = this;
            if (audioOnly === void 0) { audioOnly = false; }
            if (height === void 0) { height = 350; }
            /** @type {?} */
            var conferenceID = '';
            this.httpService.postJSON(iNet.getPUrl('conference/end2end'), { callTo: userName }).subscribe((/**
             * @param {?} data
             * @return {?}
             */
            function (data) {
                if (data.type !== inetCore.ErrorMessage.TYPE) {
                    conferenceID = data.conferenceID || '';
                    if (!iNet.isEmpty(conferenceID)) {
                        if (!JitsiMeetExternalAPI) {
                            return;
                        }
                        /** @type {?} */
                        var tokenId_1 = '';
                        /** @type {?} */
                        var messageJSON = { sender: iNet.username, conferenceID: conferenceID };
                        /** @type {?} */
                        var __messageStr_1 = 'uri_message:video_conference:' + _this.encodeBase64(JSON.stringify(messageJSON)) || '';
                        // this.chatMessageService.send(userName,__messageStr);
                        _this.httpService.postJSON(iNet.getPUrl('conference/authorized'), { roomID: conferenceID }).subscribe((/**
                         * @param {?} data
                         * @return {?}
                         */
                        function (data) {
                            tokenId_1 = data.webdata || '';
                            _this.dispose();
                            /** @type {?} */
                            var options = {
                                roomName: conferenceID,
                                width: '100%',
                                height: '100%',
                                parentNode: parentNode,
                                jwt: tokenId_1
                            };
                            if (audioOnly) {
                                options.height = '100%';
                                options['configOverwrite'] = {
                                    startAudioOnly: true,
                                    startWithVideoMuted: true
                                };
                            }
                            _this.api = new JitsiMeetExternalAPI(_this.domain, options);
                            _this.messageJoin.sender = iNet.username;
                            _this.messageJoin.conferenceID = conferenceID;
                            if (callback) {
                                callback(_this.api, __messageStr_1);
                            }
                            _this.api.executeCommand('sendTones', {
                                tones: '12345#',
                                // The dial pad touch tones to play. For example, '12345#'.
                                duration: 200,
                                // Optional. The number of milliseconds each tone should play. The default is 200.
                                pause: 200 // Optional. The number of milliseconds between each tone. The default is 200.
                            });
                            // this.api.executeCommand('displayName', iNet.displayName);
                            // this.api.executeCommand('email', iNet.username);
                            // this.api.executeCommand('setVideoQuality', 720);
                        }));
                    }
                }
            }));
            /*
            this.api.addEventListener('readyToClose',  ()=> {
                this.dispose();
            });

             */
        };
        /**
         * @return {?}
         */
        VideoConferenceService.prototype.getApi = /**
         * @return {?}
         */
        function () {
            return this.api;
        };
        /**
         * @return {?}
         */
        VideoConferenceService.prototype.dispose = /**
         * @return {?}
         */
        function () {
            if (this.api) {
                this.api.dispose();
                delete this.api;
            }
        };
        /**
         * @return {?}
         */
        VideoConferenceService.prototype.getMessageJoin = /**
         * @return {?}
         */
        function () {
            return this.messageJoin;
        };
        /**
         * @param {?} receiver
         * @return {?}
         */
        VideoConferenceService.prototype.getRoomNameByReceiver = /**
         * @param {?} receiver
         * @return {?}
         */
        function (receiver) {
            return iNet.username.split('@')[0] + '_' + receiver.split('@')[0];
        };
        /**
         * @return {?}
         */
        VideoConferenceService.prototype.isExistMeet = /**
         * @return {?}
         */
        function () {
            return !!JitsiMeetExternalAPI;
        };
        /**
         * @param {?} str
         * @return {?}
         */
        VideoConferenceService.prototype.encodeBase64 = /**
         * @param {?} str
         * @return {?}
         */
        function (str) {
            return window.btoa(unescape(encodeURIComponent(str)));
        };
        VideoConferenceService.instance = null;
        VideoConferenceService.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        VideoConferenceService.ctorParameters = function () { return [
            { type: inetCore.HttpClientService }
        ]; };
        return VideoConferenceService;
    }());
    if (false) {
        /** @type {?} */
        VideoConferenceService.instance;
        /** @type {?} */
        VideoConferenceService.prototype.api;
        /** @type {?} */
        VideoConferenceService.prototype.domain;
        /** @type {?} */
        VideoConferenceService.prototype.messageJoin;
        /**
         * @type {?}
         * @private
         */
        VideoConferenceService.prototype.httpService;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var OpenGraphService = /** @class */ (function () {
        function OpenGraphService() {
            this.regex = /(https?:\/\/[^\s]+)/;
        }
        /**
         * @param {?} link
         * @param {?} callback
         * @return {?}
         */
        OpenGraphService.prototype.loadPreviewLink = /**
         * @param {?} link
         * @param {?} callback
         * @return {?}
         */
        function (link, callback) {
            var _this = this;
            if (!link) {
                callback(null, {
                    error: 'Link is empty'
                });
                return;
            }
            if (!this.isLink(link)) {
                callback(null, {
                    error: 'Link invalid'
                });
                return;
            }
            $.ajax({
                type: 'post',
                url: iNet.getUrl('opengraph/fetch'),
                data: {
                    url: link
                },
                success: (/**
                 * @param {?} data
                 * @return {?}
                 */
                function (data) {
                    callback(_this.convertOpenData(data, link));
                }),
                error: (/**
                 * @param {?} xhr
                 * @return {?}
                 */
                function (xhr) {
                    callback(null, xhr);
                })
            });
        };
        /**
         * @param {?} link
         * @return {?}
         */
        OpenGraphService.prototype.isLink = /**
         * @param {?} link
         * @return {?}
         */
        function (link) {
            return this.regex.test(link);
        };
        /**
         * @param {?} src
         * @param {?} callback
         * @return {?}
         */
        OpenGraphService.prototype.loadImageInfo = /**
         * @param {?} src
         * @param {?} callback
         * @return {?}
         */
        function (src, callback) {
            /** @type {?} */
            var img = new Image();
            img.onload = img.onerror = (/**
             * @param {?} e
             * @return {?}
             */
            function (e) {
                /** @type {?} */
                var imageInfo = {
                    width: img.width,
                    height: img.height
                };
                if (imageInfo.width && imageInfo.height) {
                    imageInfo.available = true;
                    imageInfo.landscape = imageInfo.width / imageInfo.height > 1.1;
                }
                callback(imageInfo);
            });
            img.src = src;
        };
        /**
         * @private
         * @param {?} properties
         * @param {?} url
         * @return {?}
         */
        OpenGraphService.prototype.convertOpenData = /**
         * @private
         * @param {?} properties
         * @param {?} url
         * @return {?}
         */
        function (properties, url) {
            if (properties.length < 1) {
                return;
            }
            /** @type {?} */
            var openData = (/** @type {?} */ ({}));
            properties.forEach((/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                openData[item.property] = item.content;
            }));
            if (!openData.url) {
                openData.url = url;
            }
            return openData;
        };
        OpenGraphService.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        OpenGraphService.ctorParameters = function () { return []; };
        return OpenGraphService;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        OpenGraphService.prototype.regex;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    // declare let $: any;
    // import {ifvisible} from "ifvisible.js"
    var MessageChatComponent = /** @class */ (function () {
        function MessageChatComponent(openGraphService, messageService, videoService, element) {
            var _this = this;
            this.openGraphService = openGraphService;
            this.messageService = messageService;
            this.videoService = videoService;
            this.element = element;
            this.audioCall = false;
            this.videoCall = false;
            this.closable = false;
            this.onAudioCall = new core.EventEmitter();
            this.onVideoCall = new core.EventEmitter();
            this.onClose = new core.EventEmitter();
            this.videoPanelVisible = false;
            this.linkRegex = /(https?:\/\/[^\s]+)/;
            this.holders = [];
            this.files = [];
            this.loading = true;
            this.profile = iNet.username;
            this.messageJoinCall = {};
            this._hasMoreMsg = false;
            this._params = {
                pageSize: 20,
                pageNumber: 0
            };
            this._messageObserver = this.messageService.messageReceived.subscribe((/**
             * @param {?} message
             * @return {?}
             */
            function (message) {
                if (message.message.sender !== iNet.username) {
                    if (message.message.sender === _this.username) {
                        if (message.message.message.alert) {
                            /** @type {?} */
                            var typeMessage = message.message.message.alert.split(":");
                            if (typeMessage[0] === 'uri_message') {
                                if (typeMessage[1] === 'video_conference' && !iNet.isEmpty(typeMessage[2])) {
                                    _this.__messageChat = JSON.parse(_this.decodeBase64(typeMessage[2])) || {};
                                    if (_this.__messageChat.action === 'END') {
                                        if (message.message.message.joins.split(',').length === 1) {
                                            message.displayText = _this.messageMissCall();
                                            _this._sendSuccess(message);
                                        }
                                        else {
                                            message.displayText = _this.messageJoinedCall(message.message.message.duration);
                                            _this._sendSuccess(message);
                                        }
                                    }
                                    if (_this.__messageChat.action === 'LEFT' && message.message.message.joins.split(',')[0] === iNet.username) {
                                        if (message.message.message.joins.split(',').length === 1) {
                                            message.displayText = _this.messageMissCall();
                                            message.message.sender = message.message.message.joins.split(',')[0];
                                            message.message.message.joins.split(',')[0] === iNet.username ? message.isSent = true : message.isSent = false;
                                            _this._sendSuccess(message);
                                        }
                                        else {
                                            message.displayText = _this.messageJoinedCallTo(message.message.message.duration);
                                            message.message.sender = message.message.message.joins.split(',')[0];
                                            message.message.message.joins.split(',')[0] === iNet.username ? message.isSent = true : message.isSent = false;
                                            _this._sendSuccess(message);
                                        }
                                    }
                                }
                            }
                            else {
                                _this._sendSuccess(message);
                            }
                        }
                    }
                    else {
                        _this.messageService.updateLastMessage(_this.username, message.message);
                        _this.messageService.resetUnreadMessage(_this.username);
                    }
                }
                else {
                    /** @type {?} */
                    var typeMessage = message.message.message.alert.split(":");
                    if (typeMessage[0] === 'uri_message') {
                        if (typeMessage[1] === 'video_conference' && !iNet.isEmpty(typeMessage[2])) {
                            _this.__messageChat = JSON.parse(_this.decodeBase64(typeMessage[2])) || {};
                            if (_this.__messageChat.action === 'JOIN') {
                            }
                            else {
                                if (_this.__messageChat.action === 'LEFT') {
                                    _this.videoService.dispose();
                                    document.getElementById("meet").style.visibility = "hidden";
                                    _this._sendSuccess(message);
                                }
                            }
                        }
                    }
                }
                // if (message.message.sender === this.username) {
                // }
            }));
            this.element.nativeElement.addEventListener('drop', (/**
             * @param {?} e
             * @return {?}
             */
            function (e) {
                _this.element.nativeElement.style.opacity = '1';
                _this._onDropFile(e);
            }));
            this.element.nativeElement.addEventListener('dragleave', (/**
             * @param {?} e
             * @return {?}
             */
            function (e) {
                _this.element.nativeElement.style.opacity = '1';
            }));
            this.element.nativeElement.addEventListener('dragover', (/**
             * @param {?} e
             * @return {?}
             */
            function (e) {
                _this.element.nativeElement.style.opacity = '.5';
                e.preventDefault();
            }));
        }
        Object.defineProperty(MessageChatComponent.prototype, "canSend", {
            // @ViewChild(LinkPreviewComponent) linkPreview: LinkPreviewComponent;
            get: 
            // @ViewChild(LinkPreviewComponent) linkPreview: LinkPreviewComponent;
            /**
             * @return {?}
             */
            function () {
                return this.files.length > 0 || this.message.length > 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MessageChatComponent.prototype, "message", {
            get: /**
             * @return {?}
             */
            function () {
                return this.input && this.input.nativeElement.value.trim() || '';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MessageChatComponent.prototype, "scrollTop", {
            get: /**
             * @return {?}
             */
            function () {
                return this.messageBody.nativeElement.scrollTop;
            },
            set: /**
             * @param {?} scrollTop
             * @return {?}
             */
            function (scrollTop) {
                this.messageBody.nativeElement.scrollTop = scrollTop;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MessageChatComponent.prototype, "scrollHeight", {
            get: /**
             * @return {?}
             */
            function () {
                return this.messageBody.nativeElement.scrollHeight;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MessageChatComponent.prototype, "scrollBottom", {
            get: /**
             * @return {?}
             */
            function () {
                return this.scrollHeight - this.messageBody.nativeElement.scrollTop;
            },
            set: /**
             * @param {?} scrollBottom
             * @return {?}
             */
            function (scrollBottom) {
                this.scrollTop = this.scrollHeight - scrollBottom;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         * @param {?} ev
         * @return {?}
         */
        MessageChatComponent.prototype._onDropFile = /**
         * @private
         * @param {?} ev
         * @return {?}
         */
        function (ev) {
            // Prevent default behavior (Prevent file from being opened)
            ev.preventDefault();
            /** @type {?} */
            var files;
            if (ev.dataTransfer.items) {
                files = [];
                // Use DataTransferItemList interface to access the file(s)
                for (var i = 0; i < ev.dataTransfer.items.length; i++) {
                    // If dropped items aren't files, reject them
                    if (ev.dataTransfer.items[i].kind === 'file') {
                        files.push(ev.dataTransfer.items[i].getAsFile());
                    }
                }
            }
            else {
                files = ev.dataTransfer.files;
            }
            if (files.length > 0) {
                this.fileList.addFiles(files);
            }
        };
        /**
         * @return {?}
         */
        MessageChatComponent.prototype.ngAfterContentChecked = /**
         * @return {?}
         */
        function () {
            // Collect scroll position before render new messages
            if (this._scrollNeedUpdate) {
                this._lastScrollBottom = this.scrollBottom;
            }
        };
        /**
         * @return {?}
         */
        MessageChatComponent.prototype.ngAfterViewChecked = /**
         * @return {?}
         */
        function () {
            // Restore scroll position after render new messages if not match
            if (this._scrollNeedUpdate) {
                /** @type {?} */
                var scrollBottom = this.scrollBottom;
                this._scrollNeedUpdate = false;
                if (this._lastScrollBottom != scrollBottom) {
                    // Restore last scrollBottom
                    this.scrollBottom = this._lastScrollBottom;
                }
            }
        };
        /**
         * @return {?}
         */
        MessageChatComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this._onLoad();
            // ifvisible.on("focus", () => {
            //     if (ifvisible.now()) {
            //         this._params.pageNumber = 0;
            //         this._onLoad();
            //         // this.messageService.reconnetSocket();
            //     }
            // });
            this.messageBody.nativeElement.addEventListener('scroll', (/**
             * @return {?}
             */
            function () { return _this._onBodyScroll(); }));
            if (!this.videoService.isExistMeet()) {
                this.videoPanelVisible = false;
            }
        };
        /**
         * @private
         * @return {?}
         */
        MessageChatComponent.prototype._onBodyScroll = /**
         * @private
         * @return {?}
         */
        function () {
            /** @type {?} */
            var scrollBottom = this.scrollBottom;
            this._scrollingTop = this._scrollBottom <= scrollBottom;
            this._scrollBottom = scrollBottom;
            if (this.loading || !this._hasMoreMsg) {
                return;
            }
            // scroll to top
            if (this._scrollingTop && this.scrollTop < 150) {
                this._loadMessages();
            }
        };
        /**
         * @param {?} changes
         * @return {?}
         */
        MessageChatComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            if (changes.username && !changes.username.firstChange) {
                this._onLoad();
                this.messageJoinCall['joined'] = false;
            }
        };
        /**
         * @return {?}
         */
        MessageChatComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this._messageObserver.unsubscribe();
        };
        /**
         * @param {?} e
         * @return {?}
         */
        MessageChatComponent.prototype.viewAttachment = /**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            window.open(e.file.url, '_blank');
        };
        /**
         * @return {?}
         */
        MessageChatComponent.prototype.sendMessage = /**
         * @return {?}
         */
        function () {
            var _this = this;
            /** @type {?} */
            var value = this.message.trim();
            /** @type {?} */
            var __mes = this.messageService.revertMessage(value) || '';
            // let __mesDisplay = this.messageService.revertMessageDisplay(value) || '';
            /** @type {?} */
            var links = this.linkRegex.exec(__mes);
            if (links && links.length > 0) {
                this.openGraphService.loadPreviewLink(this.message, (/**
                 * @param {?} data
                 * @return {?}
                 */
                function (data) {
                    value = _this.encodeBase64(JSON.stringify(_this.convertLinks(data)));
                    _this.sendMessageSocket('uri_message:link_preview:' + value);
                }));
            }
            else {
                this.sendMessageSocket(value);
            }
        };
        /**
         * @param {?} value
         * @return {?}
         */
        MessageChatComponent.prototype.sendMessageSocket = /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value || this.files.length > 0) {
                if (this.files.length > 0) {
                    this._sendPush(value);
                }
                else {
                    this._sendSocket(value);
                }
                this._clearInput();
            }
        };
        /**
         * @param {?} data
         * @return {?}
         */
        MessageChatComponent.prototype.convertLinks = /**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            /** @type {?} */
            var param = {};
            param['title'] = data['title'];
            param['image'] = data['image'];
            param['description'] = data['description'];
            param['url'] = data['url'];
            param['finalUrl'] = data['site_name'].toUpperCase();
            return param;
        };
        /**
         * @private
         * @return {?}
         */
        MessageChatComponent.prototype._loadMessages = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            this.loading = true;
            this._hasMoreMsg = false;
            this.messageService.loadMessages(this._params, (/**
             * @param {?} result
             * @return {?}
             */
            function (result) {
                // this.messages = result.items.concat(this.messages);
                _this._addMessages(result.items);
                if (_this._params.pageNumber === 0) {
                    _this._scrollToBottom();
                }
                _this._scrollNeedUpdate = true;
                _this._params.pageNumber += 1;
                _this._hasMoreMsg = _this._params.pageSize * _this._params.pageNumber < result.total;
                setTimeout((/**
                 * @return {?}
                 */
                function () {
                    _this.loading = false;
                    _this._onBodyScroll();
                }), 500);
            }));
        };
        /**
         * @private
         * @return {?}
         */
        MessageChatComponent.prototype._focus = /**
         * @private
         * @return {?}
         */
        function () {
            this.input.nativeElement.focus();
        };
        /**
         * @private
         * @return {?}
         */
        MessageChatComponent.prototype._scrollToBottom = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            setTimeout((/**
             * @return {?}
             */
            function () {
                _this.scrollTop = _this.scrollHeight;
            }), 100);
        };
        /**
         * @private
         * @return {?}
         */
        MessageChatComponent.prototype._clearInput = /**
         * @private
         * @return {?}
         */
        function () {
            this.files.length = 0;
            this.input.nativeElement.value = '';
            this._focus();
        };
        /**
         * @private
         * @param {?} messagesArr
         * @param {?=} insertLast
         * @return {?}
         */
        MessageChatComponent.prototype._addMessages = /**
         * @private
         * @param {?} messagesArr
         * @param {?=} insertLast
         * @return {?}
         */
        function (messagesArr, insertLast) {
            var _this = this;
            if (insertLast === void 0) { insertLast = false; }
            /** @type {?} */
            var messages = this.convertArrayMessage(JSON.stringify(messagesArr));
            messages.sort((/**
             * @param {?} a
             * @param {?} b
             * @return {?}
             */
            function (a, b) { return b.date.getTime() - a.date.getTime(); }));
            messages.forEach((/**
             * @param {?} message
             * @return {?}
             */
            function (message) {
                /** @type {?} */
                var holder;
                for (var i = 0; i < _this.holders.length; i++) {
                    if (_this.holders[i].isSameDate(message.date)) {
                        holder = _this.holders[i];
                        break;
                    }
                }
                if (!holder) {
                    holder = new MessageChatHolder(message.date);
                    if (insertLast) {
                        _this.holders.push(holder);
                    }
                    else {
                        _this.holders.unshift(holder);
                    }
                }
                if (insertLast) {
                    holder.messages.push(message);
                }
                else {
                    holder.messages.unshift(message);
                }
            }));
        };
        /**
         * @private
         * @param {?} messages
         * @return {?}
         */
        MessageChatComponent.prototype.convertMessages = /**
         * @private
         * @param {?} messages
         * @return {?}
         */
        function (messages) {
            if (!iNet.isEmpty(messages)) {
                /** @type {?} */
                var __mes = this.messageService.revertMessage(messages.displayText) || '';
                /** @type {?} */
                var __mesDisplay = this.messageService.revertMessageDisplay(messages.displayText) || '';
                /** @type {?} */
                var typeMessages = __mes.split(":");
                if (typeMessages.length >= 2) {
                    if (typeMessages[0] === 'uri_message' && typeMessages[1] === 'video_conference') {
                        /** @type {?} */
                        var __messageChat = JSON.parse(this.decodeBase64(typeMessages[2])) || {};
                        if (messages.message.sender === this.username) {
                            if (__messageChat.action === 'END') {
                                if (messages.message.message.joins.split(',').length === 1) {
                                    messages.displayText = this.messageMissCall();
                                    return messages;
                                }
                                else {
                                    messages.displayText = this.messageJoinedCall(messages.message.message.duration);
                                    return messages;
                                }
                            }
                            if (__messageChat.action === 'LEFT' && messages.message.message.joins.split(',')[0] === messages.message.sender) {
                                if (messages.message.message.joins.split(',').length === 1) {
                                    messages.displayText = this.messageMissCall();
                                    return messages;
                                }
                                else {
                                    messages.displayText = this.messageJoinedCall(messages.message.message.duration);
                                    return messages;
                                }
                            }
                            else {
                                return messages;
                            }
                        }
                        else {
                            if (__messageChat.action === 'END') {
                                if (messages.message.message.joins.split(',').length === 1) {
                                    messages.displayText = this.messageMissCall();
                                    return messages;
                                }
                                else {
                                    messages.displayText = this.messageJoinedCallTo(messages.message.message.duration);
                                    return messages;
                                }
                            }
                            else {
                                if (this.messageJoinCall['joined']) {
                                    messages.displayText = this.messageJoinedCallTo(messages.message.message.duration);
                                    return messages;
                                }
                                else {
                                    messages.displayText = this.messageMissCall();
                                    return messages;
                                }
                            }
                        }
                    }
                    else {
                        if (typeMessages[0] === 'uri_message' && typeMessages[1] === 'link_preview') {
                            /** @type {?} */
                            var __messageLink = JSON.parse(this.decodeBase64(typeMessages[2])) || {};
                            messages['_openGraph'] = __messageLink;
                            messages.displayText = __mesDisplay;
                            return messages;
                        }
                        else {
                            return messages;
                        }
                    }
                }
                else {
                    return messages;
                }
            }
        };
        /**
         * @return {?}
         */
        MessageChatComponent.prototype.messageMissCall = /**
         * @return {?}
         */
        function () {
            // $('.message-chat__miss').on('click',()=>{
            //     console.log('click')
            //     this.joinRoom(true);
            // })
            return '<div class="contact d-flex my-1" role="button" style="">\n' +
                '    <i class="message-chat__miss fa fa-phone ml-0"></i>\n' +
                '    <div class="contact-content pl-2">\n' +
                '        <div class="contact-name mb-1">Cuộc gọi bị nhỡ</div>\n' +
                '        <div class="contact-detail">Gọi lại</div>\n' +
                '    </div>\n' +
                '</div>';
        };
        /**
         * @param {?} duration
         * @return {?}
         */
        MessageChatComponent.prototype.messageJoinedCall = /**
         * @param {?} duration
         * @return {?}
         */
        function (duration) {
            return '<div class="contact d-flex my-1" role="button" style="">\n' +
                '    <i class="message-chat__action fa fa-phone ml-0"></i>\n' +
                '    <div class="contact-content pl-2">\n' +
                '        <div class="contact-name mb-1">Cuộc gọi thoại đến</div>\n' +
                '        <div class="contact-detail">' + duration + ' giây' + '</div>\n' +
                '    </div>\n' +
                '</div>';
        };
        /**
         * @param {?} duration
         * @return {?}
         */
        MessageChatComponent.prototype.messageJoinedCallTo = /**
         * @param {?} duration
         * @return {?}
         */
        function (duration) {
            return '<div class="contact d-flex my-1" role="button" style="">\n' +
                '    <i class="message-chat__action fa fa-phone ml-0"></i>\n' +
                '    <div class="contact-content pl-2">\n' +
                '        <div class="contact-name mb-1">Cuộc gọi thoại đi</div>\n' +
                '        <div class="contact-detail">' + duration + ' giây' + '</div>\n' +
                '    </div>\n' +
                '</div>';
        };
        /**
         * @private
         * @param {?} arrMessage
         * @return {?}
         */
        MessageChatComponent.prototype.convertArrayMessage = /**
         * @private
         * @param {?} arrMessage
         * @return {?}
         */
        function (arrMessage) {
            var _this = this;
            /** @type {?} */
            var arr = JSON.parse(arrMessage);
            arr.forEach((/**
             * @param {?} ele
             * @return {?}
             */
            function (ele) {
                ele = _this.convertMessages(ele);
                ele.date = new Date(ele.date);
                return ele;
            }));
            return arr;
        };
        /**
         * @param {?} str
         * @return {?}
         */
        MessageChatComponent.prototype.encodeBase64 = /**
         * @param {?} str
         * @return {?}
         */
        function (str) {
            return window.btoa(unescape(encodeURIComponent(str)));
        };
        /**
         * @param {?} str
         * @return {?}
         */
        MessageChatComponent.prototype.decodeBase64 = /**
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
        MessageChatComponent.prototype._onLoad = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            this.disposeRoom();
            this._params.sender = this.username;
            this._params.pageNumber = 0;
            this._hasMoreMsg = false;
            this.holders = [];
            this.loading = true;
            this.files.length = 0;
            this.messageService.getContactByUserCode(this.username, (/**
             * @param {?} contact
             * @return {?}
             */
            function (contact) { return _this.contact = contact; }));
            setTimeout((/**
             * @return {?}
             */
            function () {
                _this._loadMessages();
                _this._focus();
            }), 500);
        };
        /**
         * @private
         * @param {?} value
         * @return {?}
         */
        MessageChatComponent.prototype._sendSocket = /**
         * @private
         * @param {?} value
         * @return {?}
         */
        function (value) {
            /** @type {?} */
            var envelop = this.messageService.buildEnvelop(this.username, value);
            this.messageService.sendEnvelop(envelop);
            this._sendSuccess(new MessageChat(envelop.body));
        };
        /**
         * @private
         * @param {?} value
         * @return {?}
         */
        MessageChatComponent.prototype._sendPush = /**
         * @private
         * @param {?} value
         * @return {?}
         */
        function (value) {
            var _this = this;
            /** @type {?} */
            var params = {
                content: value,
                alert: value,
                application: APP_CHAT,
                alias: this.username,
            };
            this.files.forEach((/**
             * @param {?} file
             * @param {?} i
             * @return {?}
             */
            function (file, i) {
                params['file-' + i] = file;
            }));
            this.messageService.pushMessage(params, (/**
             * @param {?} message
             * @return {?}
             */
            function (message) {
                if (message) {
                    _this._sendSuccess(new MessageChat(message));
                }
            }));
        };
        /**
         * @private
         * @param {?} message
         * @return {?}
         */
        MessageChatComponent.prototype._sendSuccess = /**
         * @private
         * @param {?} message
         * @return {?}
         */
        function (message) {
            this._addMessages([this.convertMessages(message)], true);
            this.messageService.updateLastMessage(this.username, message.message);
            this.messageService.resetUnreadMessage(this.username);
            this._scrollToBottom();
        };
        /**
         * @param {?} audioOnly
         * @param {?=} usercode
         * @return {?}
         */
        MessageChatComponent.prototype.joinRoom = /**
         * @param {?} audioOnly
         * @param {?=} usercode
         * @return {?}
         */
        function (audioOnly, usercode) {
            var _this = this;
            this.videoPanelVisible = false;
            this.messageJoinCall['joined'] = false;
            if (!this.videoService.isExistMeet()) {
                this.messageJoinCall['joined'] = false;
                return;
            }
            /** @type {?} */
            var element = document.querySelector('#meet');
            document.getElementById("meet").style.visibility = "visible";
            /** @type {?} */
            var __user = '';
            if (!!usercode) {
                __user = usercode;
            }
            else {
                __user = this.contact.usercode;
            }
            this.videoService.callTo(element, __user, audioOnly, 350, (/**
             * @param {?} api
             * @param {?} messages
             * @return {?}
             */
            function (api, messages) {
                api.addEventListener('readyToClose', (/**
                 * @return {?}
                 */
                function () {
                    _this.videoService.dispose();
                    document.getElementById("meet").style.visibility = "hidden";
                    // this.messageService.sendEnvelop(envelop);
                    if (!_this.messageJoinCall['joined']) {
                        /** @type {?} */
                        var envelop = _this.messageService.buildEnvelop(_this.username, messages);
                        _this._sendSuccess(new MessageChat(envelop.body));
                    }
                    // else{
                    //     let __joins = [iNet.username,this.username];
                    //     const envelop = this.messageService.buildEnvelop(this.username, messages,__joins.join(',') )
                    //     console.log('envelop',envelop,__joins.join(','))
                    //     this._sendSuccess(new MessageChat(envelop.body));
                    // }
                }));
                api.addEventListener('videoConferenceJoined', (/**
                 * @return {?}
                 */
                function () {
                    _this.messageJoinCall = _this.videoService.getMessageJoin();
                    _this.messageJoinCall['joined'] = true;
                }));
            }));
        };
        /**
         * @return {?}
         */
        MessageChatComponent.prototype.disposeRoom = /**
         * @return {?}
         */
        function () {
            this.videoPanelVisible = true;
            this.videoService.dispose();
        };
        MessageChatComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'message-chat',
                        template: "<div class=\"messenger-contact\" *ngIf=\"contact\">\n    <div class=\"messenger-contact-name\">{{contact.fullname || contact.usercode}}</div>\n    <div style=\"white-space: nowrap\">\n        <i class=\"message-chat__action fa fa-phone\" *ngIf=\"audioCall && profile !== contact.usercode\" (click)=\"joinRoom(true)\"></i>\n<!--        <i class=\"message-chat__action fa fa-video-camera\" *ngIf=\"videoCall && profile !== contact.usercode\" (click)=\"joinRoom(false)\"></i>-->\n        <i class=\"message-chat__action fa fa-times\" *ngIf=\"closable\" (click)=\"onClose.emit(contact)\"></i>\n    </div>\n</div>\n<div #messageBody class=\"messenger-body\">\n    <div class=\"message-video\">\n        <!--<div *ngIf=\"videoPanelVisible\" class=\"container text-center mb-2\" style=\"background: #000000;min-height: 200px;\">-->\n            <!--<h5 class=\"text-white\" style=\"padding: 40px;\">\u0110ang c\u00F3 cu\u1ED9c tr\u00F2 chuy\u1EC7n</h5>-->\n            <!--<button class=\"btn btn-success\" (click)=\"joinRoom(false)\">Tham gia</button>-->\n        <!--</div>-->\n        <div id=\"meet\" class=\"container-video-meet\" [ngClass]=\"{'hide': videoPanelVisible}\"></div>\n    </div>\n    <div class=\"message-content\">\n        <div *ngFor=\"let holder of holders\">\n            <div class=\"messenger-date-group\">{{holder.display}}</div>\n            <div *ngFor=\"let message of holder.messages\" class=\"messenger-chat\" [ngClass]=\"{'sent': message.isSent}\" >\n                <img *ngIf=\"!message.isSent && message.displayText!==''\" class=\"messenger-chat-image\" userAvatar [usercode]=\"message.message.sender\">\n                <div class=\"messenger-chat-content\" >\n                    <file-list [files]=\"message.attachments\" [removable]=\"false\" (onClick)=\"viewAttachment($event)\" class=\"messenger-chat__file\"></file-list>\n                    <app-link-preview *ngIf=\"message._openGraph\" [openGraphData]=\"message._openGraph\"\n                                      [removable]=\"false\" class=\"social-block\"></app-link-preview>\n                    <span *ngIf=\"!message._openGraph\" [innerHTML]=\"message.displayText\"></span>\n                    <div class=\"messenger-chat-time\" [title]=\"message.longTime\">{{message.shortTime}}</div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n<div class=\"messenger-footer\">\n    <file-list #fileList fileList [fileEl]=\"fileEl\" [files]=\"files\"></file-list>\n    <div class=\"messenger-footer-inner\">\n        <div class=\"messenger-footer-input\">\n            <textarea type=\"text\" #input autosize  (keyup.enter)=\"sendMessage()\" placeholder=\"Nh\u1EADp n\u1ED9i dung ...\"></textarea>\n        </div>\n        <label class=\"message-chat__action fa fa-image\" style=\"margin-bottom: 0;\">\n            <input #fileEl type=\"file\"  (change)=\"input.focus()\" multiple style=\"display:none\">\n        </label>\n        <i *ngIf=\"canSend\" (click)=\"sendMessage()\" class=\"messenger-footer-send message-chat__action fa fa-arrow-right\" aria-hidden=\"true\"></i>\n    </div>\n</div>\n<i *ngIf=\"loading\" class=\"messenger-spinner fa fa-spinner fa-spin\"></i>\n",
                        encapsulation: core.ViewEncapsulation.None,
                        styles: [":host{position:relative;display:block;width:100%;height:100%}.messenger-contact{top:0;left:0;width:100%;height:100px;display:flex;align-items:center;justify-content:space-between;padding:0 15px;border-bottom:1px solid #d3d3d3}.messenger-contact-name{max-height:36px;line-height:18px;overflow:hidden;color:#1c9dea;font-weight:700}.message-chat__miss{min-width:34px;width:34px;height:34px;line-height:34px;font-size:17px;text-align:center;border-radius:50%;background:red;color:#fff;margin-left:10px;cursor:pointer}.message-chat__miss:active,.message-chat__miss:hover{background:#8b1313;color:#fff}.message-chat__action{min-width:34px;width:34px;height:34px;line-height:34px;font-size:17px;text-align:center;border-radius:50%;background:#eff7fe;color:#1c9dea;margin-left:10px;cursor:pointer}.message-chat__action:active,.message-chat__action:hover{background:#1c9dea;color:#fff}.message-chat__action .sent_action{background:#046094!important}.messenger-body{background:#eff7fe;position:absolute;top:100px;bottom:65px;overflow-x:hidden;overflow-y:auto;width:100%}.messenger-body::-webkit-scrollbar{width:5px}.messenger-body::-webkit-scrollbar-track{background:#f1f1f1}.messenger-body::-webkit-scrollbar-thumb{background:#d6eaf7}.messenger-body::-webkit-scrollbar-thumb:hover{background:#d6eaf7}.message-video{display:flex;position:-webkit-sticky;position:sticky;top:0;left:0;right:0;z-index:10}.message-content{padding:15px}.messenger-date-group{width:100%;border-bottom:1px solid #ddd;margin:10px 0;padding:5px 0;text-align:center}.messenger-chat{margin-bottom:10px;overflow:hidden;display:flex}.messenger-chat.sent{flex-direction:row-reverse}.messenger-chat.sent .messenger-chat-content{background:#e5edf5;text-align:right;font-weight:700;color:#223645}.messenger-chat-image{min-width:32px;width:32px;height:32px;line-height:32px;font-size:16px;text-align:center;border-radius:50%;background:rgba(0,0,0,.1);margin-right:10px}.messenger-chat-content{background:#1c9dea;border-radius:25px;padding:7px 15px;overflow:hidden;max-width:80%;font-size:13px;line-height:1.2;word-break:break-word;font-weight:700;color:#fff}.messenger-chat-time{font-size:12px;color:#fff;margin-top:2px}.sent .messenger-chat-time{font-size:12px;color:#223645!important;margin-top:2px}.messenger-chat__file{margin-right:-5px}.messenger-chat__file /deep/ .file-item{width:76px;height:76px}.messenger-spinner{width:40px;height:40px;text-align:center;line-height:40px;position:absolute;top:50%;left:50%;font-size:40px;color:#666;margin-top:-20px;margin-left:-20px}.messenger-footer{position:absolute;left:0;bottom:0;width:100%;padding:10px 15px;background:#fff}.messenger-footer-inner{width:100%;display:flex;align-items:center}.messenger-footer-input{flex-grow:1;padding-top:6px}.messenger-footer-input textarea{border:0;outline:0;padding:10px 40px 0 10px;width:100%;font-size:14px;line-height:12px;border-radius:20px;background:#eff7fe;resize:none}.messenger-footer-send{color:#fff;background:#1c9dea}.messenger-footer-send:active,.messenger-footer-send:hover{background:#438eb9}.container-video-meet{height:100vh;width:100%}iframe{height:100vh!important}"]
                    }] }
        ];
        /** @nocollapse */
        MessageChatComponent.ctorParameters = function () { return [
            { type: OpenGraphService },
            { type: ChatMessageService },
            { type: VideoConferenceService },
            { type: core.ElementRef }
        ]; };
        MessageChatComponent.propDecorators = {
            username: [{ type: core.Input }],
            audioCall: [{ type: core.Input }],
            videoCall: [{ type: core.Input }],
            closable: [{ type: core.Input }],
            onAudioCall: [{ type: core.Output }],
            onVideoCall: [{ type: core.Output }],
            onClose: [{ type: core.Output }],
            input: [{ type: core.ViewChild, args: ['input',] }],
            messageBody: [{ type: core.ViewChild, args: ['messageBody',] }],
            fileList: [{ type: core.ViewChild, args: ['fileList',] }]
        };
        return MessageChatComponent;
    }());
    if (false) {
        /** @type {?} */
        MessageChatComponent.prototype.username;
        /** @type {?} */
        MessageChatComponent.prototype.audioCall;
        /** @type {?} */
        MessageChatComponent.prototype.videoCall;
        /** @type {?} */
        MessageChatComponent.prototype.closable;
        /** @type {?} */
        MessageChatComponent.prototype.onAudioCall;
        /** @type {?} */
        MessageChatComponent.prototype.onVideoCall;
        /** @type {?} */
        MessageChatComponent.prototype.onClose;
        /** @type {?} */
        MessageChatComponent.prototype.input;
        /** @type {?} */
        MessageChatComponent.prototype.messageBody;
        /** @type {?} */
        MessageChatComponent.prototype.fileList;
        /** @type {?} */
        MessageChatComponent.prototype.videoPanelVisible;
        /**
         * @type {?}
         * @private
         */
        MessageChatComponent.prototype.linkRegex;
        /** @type {?} */
        MessageChatComponent.prototype.contact;
        /** @type {?} */
        MessageChatComponent.prototype.holders;
        /** @type {?} */
        MessageChatComponent.prototype.files;
        /** @type {?} */
        MessageChatComponent.prototype.loading;
        /** @type {?} */
        MessageChatComponent.prototype.profile;
        /** @type {?} */
        MessageChatComponent.prototype.messageJoinCall;
        /**
         * @type {?}
         * @private
         */
        MessageChatComponent.prototype._scrollingTop;
        /**
         * @type {?}
         * @private
         */
        MessageChatComponent.prototype._scrollBottom;
        /**
         * @type {?}
         * @private
         */
        MessageChatComponent.prototype._lastScrollBottom;
        /**
         * @type {?}
         * @private
         */
        MessageChatComponent.prototype._scrollNeedUpdate;
        /**
         * @type {?}
         * @private
         */
        MessageChatComponent.prototype._hasMoreMsg;
        /**
         * @type {?}
         * @private
         */
        MessageChatComponent.prototype._messageObserver;
        /**
         * @type {?}
         * @private
         */
        MessageChatComponent.prototype.__messageChat;
        /**
         * @type {?}
         * @private
         */
        MessageChatComponent.prototype._params;
        /**
         * @type {?}
         * @private
         */
        MessageChatComponent.prototype.openGraphService;
        /**
         * @type {?}
         * @private
         */
        MessageChatComponent.prototype.messageService;
        /**
         * @type {?}
         * @private
         */
        MessageChatComponent.prototype.videoService;
        /**
         * @type {?}
         * @private
         */
        MessageChatComponent.prototype.element;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var SearchInputComponent = /** @class */ (function () {
        function SearchInputComponent() {
            this.placeholder = '';
            this.keyword = '';
            this.onSearch = new core.EventEmitter();
            this.onPressed = new core.EventEmitter();
            this.onChanged = new core.EventEmitter();
        }
        /**
         * @return {?}
         */
        SearchInputComponent.prototype.search = /**
         * @return {?}
         */
        function () {
            this.onSearch.emit(this.keyword);
        };
        /**
         * @param {?} e
         * @return {?}
         */
        SearchInputComponent.prototype.keyPressed = /**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            this.onPressed.emit(e);
            if (e.key === 'Enter') {
                this.search();
            }
            this.onChanged.emit(this.keyword);
        };
        /**
         * @return {?}
         */
        SearchInputComponent.prototype.clear = /**
         * @return {?}
         */
        function () {
            this.keyword = '';
            this.onChanged.emit(this.keyword);
        };
        SearchInputComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'search-input',
                        template: "<div class=\"search-input__container\">\n  <input [(ngModel)]=\"keyword\" (keyup)=\"keyPressed($event)\" [placeholder]=\"placeholder\" class=\"form-control form-control-sm search-input__text\">\n  <i (click)=\"search()\" class=\"fa fa-search search-input__icon\" style=\"left:0\"></i>\n  <i *ngIf=\"keyword.length\" (click)=\"clear()\" class=\"fa fa-times search-input__icon\" style=\"right:0\"></i>\n</div>\n",
                        styles: [":host{display:block}.search-input__container{position:relative}.search-input__text{padding-left:30px;padding-right:30px}.search-input__icon{position:absolute;top:0;line-height:30px;width:30px;height:30px;text-align:center;color:#1c9dea;cursor:pointer}.search-input__icon:hover{color:#1c9dea}"]
                    }] }
        ];
        SearchInputComponent.propDecorators = {
            placeholder: [{ type: core.Input }],
            keyword: [{ type: core.Input }],
            onSearch: [{ type: core.Output }],
            onPressed: [{ type: core.Output }],
            onChanged: [{ type: core.Output }]
        };
        return SearchInputComponent;
    }());
    if (false) {
        /** @type {?} */
        SearchInputComponent.prototype.placeholder;
        /** @type {?} */
        SearchInputComponent.prototype.keyword;
        /** @type {?} */
        SearchInputComponent.prototype.onSearch;
        /** @type {?} */
        SearchInputComponent.prototype.onPressed;
        /** @type {?} */
        SearchInputComponent.prototype.onChanged;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var MessagePanelComponent = /** @class */ (function () {
        function MessagePanelComponent(messageService) {
            var _this = this;
            this.messageService = messageService;
            this.audioCall = true;
            this.videoCall = true;
            this.closable = false; // Support close button on small screen
            // Support close button on small screen
            this.unreadMessageChange = new core.EventEmitter();
            this.chatOpen = false;
            this.readyToChat = false;
            this._socketSub = this.messageService.socketService.onStateChange.subscribe((/**
             * @return {?}
             */
            function () { return _this._stateChange(); }));
            this._messageSub = this.messageService.unreadMessageChange.subscribe((/**
             * @param {?} count
             * @return {?}
             */
            function (count) { return _this.unreadMessageChange.emit(count); }));
            this._stateChange();
        }
        /**
         * @private
         * @return {?}
         */
        MessagePanelComponent.prototype._stateChange = /**
         * @private
         * @return {?}
         */
        function () {
            this.readyToChat = this.messageService.socketService.connected;
            if (this.messageService.socketService.connected) {
                this.stateMessage = '';
            }
            else if (this.messageService.socketService.closed) {
                this.stateMessage = 'Kết nối không thành công';
            }
            else {
                this.stateMessage = 'Đang kết nối...';
            }
        };
        /**
         * @return {?}
         */
        MessagePanelComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this._socketSub.unsubscribe();
            this._messageSub.unsubscribe();
        };
        /**
         * @param {?} contact
         * @return {?}
         */
        MessagePanelComponent.prototype.openVideoCall = /**
         * @param {?} contact
         * @return {?}
         */
        function (contact) {
        };
        /**
         * @param {?} contact
         * @return {?}
         */
        MessagePanelComponent.prototype.openAudioCall = /**
         * @param {?} contact
         * @return {?}
         */
        function (contact) {
        };
        /**
         * @param {?} contact
         * @param {?=} call
         * @return {?}
         */
        MessagePanelComponent.prototype.openChatWith = /**
         * @param {?} contact
         * @param {?=} call
         * @return {?}
         */
        function (contact, call) {
            var _this = this;
            this.roomName = null;
            if (this.contact !== contact) {
                this.contact = contact;
                contact.unread = 0; // mark read
            }
            // Delay for chat
            setTimeout((/**
             * @return {?}
             */
            function () {
                _this.chatOpen = true;
                if (call) {
                    _this.messageChatComponent.messageJoinCall['joined'] = false;
                    _this.messageChatComponent.joinRoom(true, contact.usercode);
                }
            }), 100);
        };
        /**
         * @return {?}
         */
        MessagePanelComponent.prototype.closeChat = /**
         * @return {?}
         */
        function () {
            this.chatOpen = false;
        };
        /**
         * @param {?} roomName
         * @return {?}
         */
        MessagePanelComponent.prototype.openRoom = /**
         * @param {?} roomName
         * @return {?}
         */
        function (roomName) {
            this.contact = null;
            this.roomName = roomName;
        };
        /**
         * @param {?} contact
         * @return {?}
         */
        MessagePanelComponent.prototype.callToContactSelected = /**
         * @param {?} contact
         * @return {?}
         */
        function (contact) {
            this.openChatWith(contact, true);
        };
        MessagePanelComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'message-panel',
                        template: "<div *ngIf=\"!readyToChat\" class=\"message-panel__status\">{{stateMessage}}</div>\n<div class=\"message-panel__container\">\n  <message-contact-list class=\"message-panel__side\" (contactSelected)=\"openChatWith($event)\" (roomSelected)=\"openRoom($event)\" (callTo)=\"callToContactSelected($event)\"></message-contact-list>\n  <div class=\"message-panel__body\" [ngClass]=\"{'open': chatOpen}\">\n    <div *ngIf=\"!contact && !roomName\" class=\"message-panel__welcome text-primary\">\n      <div style=\"font-size: 151px;\"><i class=\"fa fa-comments\" aria-hidden=\"true\"></i>\n      </div>\n      <div>Ch\u00E0o m\u1EEBng \u0111\u1EBFn v\u1EDBi <b>Calista!</b></div>\n    </div>\n    <message-chat *ngIf=\"contact\"\n                  [username]=\"contact.usercode\"\n                  [audioCall]=\"audioCall\"\n                  [videoCall]=\"videoCall\"\n                  [closable]=\"closable\"\n                  (onAudioCall)=\"openAudioCall($event)\"\n                  (onVideoCall)=\"openVideoCall($event)\"\n                  (onClose)=\"closeChat()\"></message-chat>\n    <room-chat *ngIf=\"roomName\" [roomName]=\"roomName\"></room-chat>\n  </div>\n</div>\n",
                        styles: [":host{display:flex;flex-direction:column;width:100%;height:100%;overflow:hidden;position:relative}.message-panel__status{text-align:center;width:100%;background:rgba(0,0,0,.8);color:#fff;font-size:16px;line-height:50px}.message-panel__container{width:100%;height:100%;position:relative;flex-grow:1}.message-panel__side{float:left;width:300px;background:#f1f1f4;border-right:1px solid #dedede}.message-panel__body{overflow:hidden;height:100%;position:relative;background:#fff;border-left:0}.message-panel__welcome{text-align:center;font-size:30px;position:absolute;padding:0 20px;width:100%;top:30%;margin-top:-20px}@media (max-width:768px){.message-panel__side{width:100%}.message-panel__body{position:absolute;right:0;bottom:0;left:0;width:100%;height:400px;border-left:1px;display:none}.message-panel__body.open{display:block}}"]
                    }] }
        ];
        /** @nocollapse */
        MessagePanelComponent.ctorParameters = function () { return [
            { type: ChatMessageService }
        ]; };
        MessagePanelComponent.propDecorators = {
            audioCall: [{ type: core.Input }],
            videoCall: [{ type: core.Input }],
            closable: [{ type: core.Input }],
            unreadMessageChange: [{ type: core.Output }],
            messageChatComponent: [{ type: core.ViewChild, args: [MessageChatComponent,] }]
        };
        return MessagePanelComponent;
    }());
    if (false) {
        /** @type {?} */
        MessagePanelComponent.prototype.audioCall;
        /** @type {?} */
        MessagePanelComponent.prototype.videoCall;
        /** @type {?} */
        MessagePanelComponent.prototype.closable;
        /** @type {?} */
        MessagePanelComponent.prototype.unreadMessageChange;
        /** @type {?} */
        MessagePanelComponent.prototype.messageChatComponent;
        /** @type {?} */
        MessagePanelComponent.prototype.contact;
        /** @type {?} */
        MessagePanelComponent.prototype.chatOpen;
        /** @type {?} */
        MessagePanelComponent.prototype.readyToChat;
        /** @type {?} */
        MessagePanelComponent.prototype.stateMessage;
        /** @type {?} */
        MessagePanelComponent.prototype.roomName;
        /**
         * @type {?}
         * @private
         */
        MessagePanelComponent.prototype._socketSub;
        /**
         * @type {?}
         * @private
         */
        MessagePanelComponent.prototype._messageSub;
        /**
         * @type {?}
         * @private
         */
        MessagePanelComponent.prototype.messageService;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var FILES_FORMAT = [
        'unknown', 'text', 'archive', 'audio', 'video',
        'png', 'jpg', 'gif', 'tiff', 'svg', 'ai', 'psd', 'dwg',
        'avi', 'fla', 'mp2', 'mp3', 'mp4', 'aac', 'flac', 'wma', 'wav', 'mxf',
        'iso', 'mdf', 'nrg',
        'zip', '7z', 'arj', 'rar',
        'pdf', 'doc', 'rtf', 'txt', 'xls', 'ppt',
        'css', 'csv', 'html', 'json', 'js', 'xml',
        'dbf', 'exe'
    ];
    /** @type {?} */
    var FILES_EDIT_FORMAT = [
        'doc', 'docx', 'odt', 'ods', 'xls', 'xlsx',
        'ppt', 'pps', 'pptm', 'pptx', 'pot', 'potx',
        'dot', 'dotx', 'docm', 'dotx', 'csv', 'sxw'
    ];
    /** @type {?} */
    var FILES_VIEW_FORMAT = ['pdf', 'png', 'jpg', 'jpeg', 'gif'];
    /** @type {?} */
    var UNKNOWN = 'unknown';
    var FileFormatService = /** @class */ (function () {
        function FileFormatService() {
        }
        /**
         * @return {?}
         */
        FileFormatService.prototype.getImagePath = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var path = iNet.commonImageFolder;
            /** @type {?} */
            var lastIndex = path.lastIndexOf('/');
            if (lastIndex === path.length - 1) {
                return path.substring(0, lastIndex);
            }
            return path;
        };
        /**
         * @return {?}
         */
        FileFormatService.prototype.getFileFormatPath = /**
         * @return {?}
         */
        function () {
            return this.getImagePath() + "/format";
        };
        /**
         * @param {?} ext
         * @return {?}
         */
        FileFormatService.prototype.getUrlByExt = /**
         * @param {?} ext
         * @return {?}
         */
        function (ext) {
            /** @type {?} */
            var path = this.getFileFormatPath();
            if (FILES_FORMAT.indexOf(ext) > -1) {
                return path + "/" + ext.toLowerCase() + ".svg";
            }
            return path + "/" + UNKNOWN + ".svg";
        };
        /**
         * @param {?} name
         * @return {?}
         */
        FileFormatService.prototype.getUrlByName = /**
         * @param {?} name
         * @return {?}
         */
        function (name) {
            return this.getUrlByExt(this.getExtByName(name));
        };
        /**
         * @param {?} name
         * @return {?}
         */
        FileFormatService.prototype.getExtByName = /**
         * @param {?} name
         * @return {?}
         */
        function (name) {
            return name.split('.').pop().toLowerCase() || UNKNOWN;
        };
        /**
         * @return {?}
         */
        FileFormatService.prototype.getEditFormats = /**
         * @return {?}
         */
        function () {
            return FILES_EDIT_FORMAT;
        };
        /**
         * @return {?}
         */
        FileFormatService.prototype.getViewFormats = /**
         * @return {?}
         */
        function () {
            return FILES_VIEW_FORMAT;
        };
        FileFormatService.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        FileFormatService.ctorParameters = function () { return []; };
        return FileFormatService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var FileExtPipe = /** @class */ (function () {
        function FileExtPipe(formatService) {
            this.formatService = formatService;
        }
        /**
         * @param {?} name
         * @return {?}
         */
        FileExtPipe.prototype.transform = /**
         * @param {?} name
         * @return {?}
         */
        function (name) {
            return this.formatService.getExtByName(name);
        };
        FileExtPipe.decorators = [
            { type: core.Pipe, args: [{
                        name: 'fileExt'
                    },] }
        ];
        /** @nocollapse */
        FileExtPipe.ctorParameters = function () { return [
            { type: FileFormatService }
        ]; };
        return FileExtPipe;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        FileExtPipe.prototype.formatService;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var FileIconPipe = /** @class */ (function () {
        function FileIconPipe(formatService) {
            this.formatService = formatService;
        }
        /**
         * @param {?} name
         * @return {?}
         */
        FileIconPipe.prototype.transform = /**
         * @param {?} name
         * @return {?}
         */
        function (name) {
            return this.formatService.getUrlByName(name);
        };
        FileIconPipe.decorators = [
            { type: core.Pipe, args: [{
                        name: 'fileIcon'
                    },] }
        ];
        /** @nocollapse */
        FileIconPipe.ctorParameters = function () { return [
            { type: FileFormatService }
        ]; };
        return FileIconPipe;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        FileIconPipe.prototype.formatService;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var FileListModule = /** @class */ (function () {
        function FileListModule() {
        }
        FileListModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule
                        ],
                        declarations: [
                            FileIconPipe,
                            FileExtPipe,
                            FileListComponent
                        ],
                        exports: [
                            FileIconPipe,
                            FileExtPipe,
                            FileListComponent
                        ],
                        providers: [FileFormatService]
                    },] }
        ];
        return FileListModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var RoomChatComponent = /** @class */ (function () {
        function RoomChatComponent(videoService) {
            this.videoService = videoService;
            this.videoPanelVisible = true;
        }
        /**
         * @return {?}
         */
        RoomChatComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            this.joinRoom();
        };
        /**
         * @return {?}
         */
        RoomChatComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.disposeRoom();
        };
        /**
         * @return {?}
         */
        RoomChatComponent.prototype.joinRoom = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this.videoPanelVisible = false;
            if (!this.videoService.isExistMeet()) {
                return;
            }
            this.disposeRoom();
            this.videoService.join(document.querySelector('#meetRoom'), this.roomName, false, 600);
            this.videoService.getApi().addEventListener('readyToClose', (/**
             * @return {?}
             */
            function () {
                _this.disposeRoom();
            }));
        };
        /**
         * @return {?}
         */
        RoomChatComponent.prototype.disposeRoom = /**
         * @return {?}
         */
        function () {
            this.videoPanelVisible = true;
            this.videoService.dispose();
        };
        RoomChatComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'room-chat',
                        template: "<div class=\"message-video\">\n    <div *ngIf=\"videoPanelVisible\" class=\"container text-center mb-2\" style=\"background: #000000;min-height: 250px;\">\n        <h5 class=\"text-white\" style=\"padding: 40px;\">Cu\u1ED9c h\u1ECDp c\u00F4ng ty , ai c\u0169ng c\u00F3 th\u1EC3 tham gia</h5>\n        <button class=\"btn btn-success\" (click)=\"joinRoom()\">Tham gia</button>\n    </div>\n    <div id=\"meetRoom\" style=\"width: 100%\" [ngClass]=\"{'hide': videoPanelVisible}\"></div>\n</div>\n",
                        styles: [""]
                    }] }
        ];
        /** @nocollapse */
        RoomChatComponent.ctorParameters = function () { return [
            { type: VideoConferenceService }
        ]; };
        RoomChatComponent.propDecorators = {
            roomName: [{ type: core.Input }]
        };
        return RoomChatComponent;
    }());
    if (false) {
        /** @type {?} */
        RoomChatComponent.prototype.roomName;
        /** @type {?} */
        RoomChatComponent.prototype.videoPanelVisible;
        /**
         * @type {?}
         * @private
         */
        RoomChatComponent.prototype.videoService;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var LinkPreviewComponent = /** @class */ (function () {
        function LinkPreviewComponent(openGraphService) {
            this.openGraphService = openGraphService;
            this.removable = true;
            this.onLoad = new core.EventEmitter();
            this.onDelete = new core.EventEmitter();
            this._hidden = false;
        }
        /**
         * @return {?}
         */
        LinkPreviewComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            if (this.openGraphService.isLink(this.link)) {
                this.loadPreview();
            }
            else if (this.openGraphData) {
                this.loadImageInfo();
            }
            else {
                this.setHidden(true);
            }
        };
        /**
         * @return {?}
         */
        LinkPreviewComponent.prototype.isPreview = /**
         * @return {?}
         */
        function () {
            return !this.isHidden() && (!!this.link || !!this.openGraphData);
        };
        /**
         * @param {?} data
         * @return {?}
         */
        LinkPreviewComponent.prototype.setData = /**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            if (!data || !data.title) {
                return;
            }
            this.openGraphData = data;
            this.loadImageInfo();
            this.setHidden(false);
        };
        /**
         * @return {?}
         */
        LinkPreviewComponent.prototype.getData = /**
         * @return {?}
         */
        function () {
            return this.openGraphData;
        };
        /**
         * @param {?} link
         * @return {?}
         */
        LinkPreviewComponent.prototype.setLink = /**
         * @param {?} link
         * @return {?}
         */
        function (link) {
            if (this.link === link) {
                return;
            }
            this.link = link;
            this.loadPreview();
        };
        /**
         * @return {?}
         */
        LinkPreviewComponent.prototype.removePreView = /**
         * @return {?}
         */
        function () {
            this.onDelete.emit(this);
            this.clearData();
        };
        /**
         * @param {?} url
         * @return {?}
         */
        LinkPreviewComponent.prototype.getDomain = /**
         * @param {?} url
         * @return {?}
         */
        function (url) {
            if (!url) {
                return '';
            }
            /** @type {?} */
            var domain = url.split('/')[2] || '';
            return domain.replace('www.', '');
        };
        /**
         * @return {?}
         */
        LinkPreviewComponent.prototype.clearData = /**
         * @return {?}
         */
        function () {
            this.link = null;
            this.openGraphData = null;
            this.setHidden(true);
        };
        /**
         * @private
         * @return {?}
         */
        LinkPreviewComponent.prototype.loadPreview = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            this.setHidden(false);
            if (this.openGraphService.isLink(this.link)) {
                this.openGraphService.loadPreviewLink(this.link, (/**
                 * @param {?} data
                 * @return {?}
                 */
                function (data) {
                    if (data) {
                        _this.setData(data);
                    }
                    else {
                        _this.setHidden(true);
                    }
                }));
            }
            else {
                this.setHidden(true);
            }
        };
        /**
         * @private
         * @return {?}
         */
        LinkPreviewComponent.prototype.loadImageInfo = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            if (this.openGraphData && this.openGraphData.image) {
                this.openGraphService.loadImageInfo(this.openGraphData.image, (/**
                 * @param {?} imageInfo
                 * @return {?}
                 */
                function (imageInfo) {
                    _this.openGraphData.imageInfo = imageInfo;
                }));
            }
        };
        /**
         * @private
         * @param {?} hidden
         * @return {?}
         */
        LinkPreviewComponent.prototype.setHidden = /**
         * @private
         * @param {?} hidden
         * @return {?}
         */
        function (hidden) {
            this._hidden = hidden;
        };
        /**
         * @private
         * @return {?}
         */
        LinkPreviewComponent.prototype.isHidden = /**
         * @private
         * @return {?}
         */
        function () {
            return this._hidden;
        };
        LinkPreviewComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'app-link-preview',
                        template: "<div *ngIf=\"!_hidden\" class=\"link-preview\">\n    <div *ngIf=\"!openGraphData; else preview\">\n        <i class=\"fa fa-spinner fa-spin link-preview-spinner\"></i>\n        <div class=\"link-preview-content\">\u0110ang t\u1EA3i ch\u1EBF \u0111\u1ED9 xem tr\u01B0\u1EDBc...</div>\n    </div>\n    <ng-template #preview>\n        <div *ngIf=\"openGraphData?.imageInfo?.available\"\n             [ngClass]=\"openGraphData.imageInfo.landscape ? 'landscape mb-0' : 'portrait mb-0'\"\n             class=\"link-preview-image\">\n            <img [src]=\"openGraphData.image\">\n        </div>\n        <div class=\"link-preview-content bg-white\">\n            <div class=\"link-preview-title\">{{openGraphData.title}}</div>\n            <div class=\"link-preview-text\">{{openGraphData.description}}</div>\n            <div class=\"link-preview-url\">{{getDomain(openGraphData.url)}}</div>\n        </div>\n        <a [href]=\"openGraphData.url\" target=\"_blank\" rel=\"noopener nofollow\" class=\"link-preview-anchor\"></a>\n    </ng-template>\n    <i *ngIf=\"removable\" (click)=\"removePreView()\" class=\"fa fa-times link-preview-remove\"></i>\n</div>",
                        styles: [".link-preview{margin-bottom:15px;display:block;overflow:hidden;border:1px solid rgba(0,0,0,.1);position:relative;color:#555;width:300px}.link-preview-spinner{float:left;width:44px;height:44px;font-size:20px;line-height:44px;text-align:center}.link-preview-anchor{position:absolute;top:0;right:0;bottom:0;left:0;z-index:1;opacity:0;font-size:10px}.link-preview-remove{position:absolute;top:8px;right:8px;width:24px;height:24px;line-height:24px;border-radius:50%;background:rgba(0,0,0,.2);color:#fff;text-align:center;z-index:2;cursor:pointer;font-size:14px}.link-preview-remove:hover{background:rgba(0,0,0,.4)}.link-preview-image{overflow:hidden}.link-preview-image.landscape{margin-bottom:5px;border-bottom:1px solid rgba(0,0,0,.1);max-height:250px;width:330px}.link-preview-image.landscape img{width:100%;-o-object-fit:contain;object-fit:contain;height:100%}.link-preview-image.portrait{float:left;width:160px;height:160px;position:relative}.link-preview-image.portrait img{position:absolute;min-width:100%;min-height:100%;top:50%;left:50%;transform:translate3d(-50%,-50%,0)}.link-preview-content{overflow:hidden;padding:10px 30px 10px 15px}.link-preview-title{color:#333;font-size:15px;line-height:22px}.link-preview-text{overflow:hidden;margin-top:7px;font-size:10px;line-height:18px}.link-preview-url{margin-top:7px;text-transform:uppercase;font-size:12px;color:#888}"]
                    }] }
        ];
        /** @nocollapse */
        LinkPreviewComponent.ctorParameters = function () { return [
            { type: OpenGraphService }
        ]; };
        LinkPreviewComponent.propDecorators = {
            link: [{ type: core.Input }],
            openGraphData: [{ type: core.Input }],
            removable: [{ type: core.Input }],
            onLoad: [{ type: core.Output }],
            onDelete: [{ type: core.Output }]
        };
        return LinkPreviewComponent;
    }());
    if (false) {
        /** @type {?} */
        LinkPreviewComponent.prototype.link;
        /** @type {?} */
        LinkPreviewComponent.prototype.openGraphData;
        /** @type {?} */
        LinkPreviewComponent.prototype.removable;
        /** @type {?} */
        LinkPreviewComponent.prototype.onLoad;
        /** @type {?} */
        LinkPreviewComponent.prototype.onDelete;
        /** @type {?} */
        LinkPreviewComponent.prototype._hidden;
        /**
         * @type {?}
         * @private
         */
        LinkPreviewComponent.prototype.openGraphService;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var OpenGraphModule = /** @class */ (function () {
        function OpenGraphModule() {
        }
        OpenGraphModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule
                        ],
                        exports: [
                            LinkPreviewComponent
                        ],
                        declarations: [
                            LinkPreviewComponent
                        ],
                        providers: [
                            OpenGraphService
                        ]
                    },] }
        ];
        return OpenGraphModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ChatMessageModule = /** @class */ (function () {
        function ChatMessageModule() {
        }
        ChatMessageModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            forms.FormsModule,
                            inetCore.CoreModule,
                            ngxAutosize.AutosizeModule,
                            FileListModule,
                            OpenGraphModule
                        ],
                        exports: [
                            MessageChatComponent,
                            ContactListComponent,
                            SearchInputComponent,
                            MessagePanelComponent
                        ],
                        declarations: [
                            MessageChatComponent,
                            ContactListComponent,
                            SearchInputComponent,
                            MessagePanelComponent,
                            RoomChatComponent
                        ],
                        providers: [
                            inetCore.AccentService,
                            ChatMessageService,
                            VideoConferenceService,
                            inetCore.WebSocketClientService
                        ]
                    },] }
        ];
        return ChatMessageModule;
    }());

    exports.ChatMessageModule = ChatMessageModule;
    exports.ChatMessageService = ChatMessageService;
    exports.ContactListComponent = ContactListComponent;
    exports.DateFormatter = DateFormatter;
    exports.MessageChatComponent = MessageChatComponent;
    exports.MessagePanelComponent = MessagePanelComponent;
    exports.RoomChatComponent = RoomChatComponent;
    exports.VideoConferenceService = VideoConferenceService;
    exports.ɵa = FileListModule;
    exports.ɵb = FileIconPipe;
    exports.ɵc = FileFormatService;
    exports.ɵd = FileExtPipe;
    exports.ɵe = FileListComponent;
    exports.ɵf = OpenGraphModule;
    exports.ɵg = LinkPreviewComponent;
    exports.ɵh = OpenGraphService;
    exports.ɵi = SearchInputComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=inet-chat.umd.js.map
