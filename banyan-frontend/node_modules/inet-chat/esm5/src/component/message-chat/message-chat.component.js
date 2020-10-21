/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { APP_CHAT } from "../../model/MessageConstants";
import { MessageChat } from "../../model/MessageChat";
import { ChatMessageService } from "../../message.service";
import { MessageChatHolder } from "../../model/MessageHolder";
import { FileListComponent } from "../../filelist/list/file-list.component";
import { VideoConferenceService } from "../../video-conference.service";
import { OpenGraphService } from '../../open-graph/open-graph.service';
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
        this.onAudioCall = new EventEmitter();
        this.onVideoCall = new EventEmitter();
        this.onClose = new EventEmitter();
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
        { type: Component, args: [{
                    selector: 'message-chat',
                    template: "<div class=\"messenger-contact\" *ngIf=\"contact\">\n    <div class=\"messenger-contact-name\">{{contact.fullname || contact.usercode}}</div>\n    <div style=\"white-space: nowrap\">\n        <i class=\"message-chat__action fa fa-phone\" *ngIf=\"audioCall && profile !== contact.usercode\" (click)=\"joinRoom(true)\"></i>\n<!--        <i class=\"message-chat__action fa fa-video-camera\" *ngIf=\"videoCall && profile !== contact.usercode\" (click)=\"joinRoom(false)\"></i>-->\n        <i class=\"message-chat__action fa fa-times\" *ngIf=\"closable\" (click)=\"onClose.emit(contact)\"></i>\n    </div>\n</div>\n<div #messageBody class=\"messenger-body\">\n    <div class=\"message-video\">\n        <!--<div *ngIf=\"videoPanelVisible\" class=\"container text-center mb-2\" style=\"background: #000000;min-height: 200px;\">-->\n            <!--<h5 class=\"text-white\" style=\"padding: 40px;\">\u0110ang c\u00F3 cu\u1ED9c tr\u00F2 chuy\u1EC7n</h5>-->\n            <!--<button class=\"btn btn-success\" (click)=\"joinRoom(false)\">Tham gia</button>-->\n        <!--</div>-->\n        <div id=\"meet\" class=\"container-video-meet\" [ngClass]=\"{'hide': videoPanelVisible}\"></div>\n    </div>\n    <div class=\"message-content\">\n        <div *ngFor=\"let holder of holders\">\n            <div class=\"messenger-date-group\">{{holder.display}}</div>\n            <div *ngFor=\"let message of holder.messages\" class=\"messenger-chat\" [ngClass]=\"{'sent': message.isSent}\" >\n                <img *ngIf=\"!message.isSent && message.displayText!==''\" class=\"messenger-chat-image\" userAvatar [usercode]=\"message.message.sender\">\n                <div class=\"messenger-chat-content\" >\n                    <file-list [files]=\"message.attachments\" [removable]=\"false\" (onClick)=\"viewAttachment($event)\" class=\"messenger-chat__file\"></file-list>\n                    <app-link-preview *ngIf=\"message._openGraph\" [openGraphData]=\"message._openGraph\"\n                                      [removable]=\"false\" class=\"social-block\"></app-link-preview>\n                    <span *ngIf=\"!message._openGraph\" [innerHTML]=\"message.displayText\"></span>\n                    <div class=\"messenger-chat-time\" [title]=\"message.longTime\">{{message.shortTime}}</div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n<div class=\"messenger-footer\">\n    <file-list #fileList fileList [fileEl]=\"fileEl\" [files]=\"files\"></file-list>\n    <div class=\"messenger-footer-inner\">\n        <div class=\"messenger-footer-input\">\n            <textarea type=\"text\" #input autosize  (keyup.enter)=\"sendMessage()\" placeholder=\"Nh\u1EADp n\u1ED9i dung ...\"></textarea>\n        </div>\n        <label class=\"message-chat__action fa fa-image\" style=\"margin-bottom: 0;\">\n            <input #fileEl type=\"file\"  (change)=\"input.focus()\" multiple style=\"display:none\">\n        </label>\n        <i *ngIf=\"canSend\" (click)=\"sendMessage()\" class=\"messenger-footer-send message-chat__action fa fa-arrow-right\" aria-hidden=\"true\"></i>\n    </div>\n</div>\n<i *ngIf=\"loading\" class=\"messenger-spinner fa fa-spinner fa-spin\"></i>\n",
                    encapsulation: ViewEncapsulation.None,
                    styles: [":host{position:relative;display:block;width:100%;height:100%}.messenger-contact{top:0;left:0;width:100%;height:100px;display:flex;align-items:center;justify-content:space-between;padding:0 15px;border-bottom:1px solid #d3d3d3}.messenger-contact-name{max-height:36px;line-height:18px;overflow:hidden;color:#1c9dea;font-weight:700}.message-chat__miss{min-width:34px;width:34px;height:34px;line-height:34px;font-size:17px;text-align:center;border-radius:50%;background:red;color:#fff;margin-left:10px;cursor:pointer}.message-chat__miss:active,.message-chat__miss:hover{background:#8b1313;color:#fff}.message-chat__action{min-width:34px;width:34px;height:34px;line-height:34px;font-size:17px;text-align:center;border-radius:50%;background:#eff7fe;color:#1c9dea;margin-left:10px;cursor:pointer}.message-chat__action:active,.message-chat__action:hover{background:#1c9dea;color:#fff}.message-chat__action .sent_action{background:#046094!important}.messenger-body{background:#eff7fe;position:absolute;top:100px;bottom:65px;overflow-x:hidden;overflow-y:auto;width:100%}.messenger-body::-webkit-scrollbar{width:5px}.messenger-body::-webkit-scrollbar-track{background:#f1f1f1}.messenger-body::-webkit-scrollbar-thumb{background:#d6eaf7}.messenger-body::-webkit-scrollbar-thumb:hover{background:#d6eaf7}.message-video{display:flex;position:-webkit-sticky;position:sticky;top:0;left:0;right:0;z-index:10}.message-content{padding:15px}.messenger-date-group{width:100%;border-bottom:1px solid #ddd;margin:10px 0;padding:5px 0;text-align:center}.messenger-chat{margin-bottom:10px;overflow:hidden;display:flex}.messenger-chat.sent{flex-direction:row-reverse}.messenger-chat.sent .messenger-chat-content{background:#e5edf5;text-align:right;font-weight:700;color:#223645}.messenger-chat-image{min-width:32px;width:32px;height:32px;line-height:32px;font-size:16px;text-align:center;border-radius:50%;background:rgba(0,0,0,.1);margin-right:10px}.messenger-chat-content{background:#1c9dea;border-radius:25px;padding:7px 15px;overflow:hidden;max-width:80%;font-size:13px;line-height:1.2;word-break:break-word;font-weight:700;color:#fff}.messenger-chat-time{font-size:12px;color:#fff;margin-top:2px}.sent .messenger-chat-time{font-size:12px;color:#223645!important;margin-top:2px}.messenger-chat__file{margin-right:-5px}.messenger-chat__file /deep/ .file-item{width:76px;height:76px}.messenger-spinner{width:40px;height:40px;text-align:center;line-height:40px;position:absolute;top:50%;left:50%;font-size:40px;color:#666;margin-top:-20px;margin-left:-20px}.messenger-footer{position:absolute;left:0;bottom:0;width:100%;padding:10px 15px;background:#fff}.messenger-footer-inner{width:100%;display:flex;align-items:center}.messenger-footer-input{flex-grow:1;padding-top:6px}.messenger-footer-input textarea{border:0;outline:0;padding:10px 40px 0 10px;width:100%;font-size:14px;line-height:12px;border-radius:20px;background:#eff7fe;resize:none}.messenger-footer-send{color:#fff;background:#1c9dea}.messenger-footer-send:active,.messenger-footer-send:hover{background:#438eb9}.container-video-meet{height:100vh;width:100%}iframe{height:100vh!important}"]
                }] }
    ];
    /** @nocollapse */
    MessageChatComponent.ctorParameters = function () { return [
        { type: OpenGraphService },
        { type: ChatMessageService },
        { type: VideoConferenceService },
        { type: ElementRef }
    ]; };
    MessageChatComponent.propDecorators = {
        username: [{ type: Input }],
        audioCall: [{ type: Input }],
        videoCall: [{ type: Input }],
        closable: [{ type: Input }],
        onAudioCall: [{ type: Output }],
        onVideoCall: [{ type: Output }],
        onClose: [{ type: Output }],
        input: [{ type: ViewChild, args: ['input',] }],
        messageBody: [{ type: ViewChild, args: ['messageBody',] }],
        fileList: [{ type: ViewChild, args: ['fileList',] }]
    };
    return MessageChatComponent;
}());
export { MessageChatComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS1jaGF0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtY2hhdC8iLCJzb3VyY2VzIjpbInNyYy9jb21wb25lbnQvbWVzc2FnZS1jaGF0L21lc3NhZ2UtY2hhdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFHSCxTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixLQUFLLEVBSUwsTUFBTSxFQUVOLFNBQVMsRUFBRSxpQkFBaUIsRUFDL0IsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBQ3RELE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUNwRCxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUN6RCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUM1RCxPQUFPLEVBQUMsaUJBQWlCLEVBQWUsTUFBTSx5Q0FBeUMsQ0FBQztBQUV4RixPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQztBQUN0RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQzs7O0FBTXZFO0lBb0VJLDhCQUNZLGdCQUFrQyxFQUNsQyxjQUFrQyxFQUNsQyxZQUFvQyxFQUNwQyxPQUFtQjtRQUovQixpQkE0RUM7UUEzRVcscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxtQkFBYyxHQUFkLGNBQWMsQ0FBb0I7UUFDbEMsaUJBQVksR0FBWixZQUFZLENBQXdCO1FBQ3BDLFlBQU8sR0FBUCxPQUFPLENBQVk7UUFoRXRCLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFDM0IsY0FBUyxHQUFZLEtBQUssQ0FBQztRQUMzQixhQUFRLEdBQVksS0FBSyxDQUFDO1FBQ3pCLGdCQUFXLEdBQUcsSUFBSSxZQUFZLEVBQWtCLENBQUM7UUFDakQs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eUNBQW9DOztJQUNwQyx3Q0FBbUM7O0lBQ25DLDJDQUEyRDs7SUFDM0QsMkNBQTJEOztJQUMzRCx1Q0FBdUQ7O0lBQ3ZELHFDQUFzQzs7SUFDdEMsMkNBQWtEOztJQUNsRCx3Q0FBbUQ7O0lBQ25ELGlEQUFtQzs7Ozs7SUFDbkMseUNBQTBDOztJQUMxQyx1Q0FBd0I7O0lBQ3hCLHVDQUFrQzs7SUFDbEMscUNBQWtCOztJQUNsQix1Q0FBd0I7O0lBQ3hCLHVDQUF3Qjs7SUFDeEIsK0NBQXFCOzs7OztJQStCckIsNkNBQStCOzs7OztJQUMvQiw2Q0FBOEI7Ozs7O0lBQzlCLGlEQUFrQzs7Ozs7SUFDbEMsaURBQW1DOzs7OztJQUNuQywyQ0FBcUM7Ozs7O0lBQ3JDLGdEQUF5Qjs7Ozs7SUFDekIsNkNBQXNCOzs7OztJQUV0Qix1Q0FHRTs7Ozs7SUFHRSxnREFBMEM7Ozs7O0lBQzFDLDhDQUEwQzs7Ozs7SUFDMUMsNENBQTRDOzs7OztJQUM1Qyx1Q0FBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIEFmdGVyQ29udGVudENoZWNrZWQsXG4gICAgQWZ0ZXJWaWV3Q2hlY2tlZCxcbiAgICBDb21wb25lbnQsXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSW5wdXQsXG4gICAgT25DaGFuZ2VzLFxuICAgIE9uRGVzdHJveSxcbiAgICBPbkluaXQsXG4gICAgT3V0cHV0LFxuICAgIFNpbXBsZUNoYW5nZXMsXG4gICAgVmlld0NoaWxkLCBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TWVzc2FnZUNvbnRhY3R9IGZyb20gXCIuLi8uLi9tb2RlbC9NZXNzYWdlQ29udGFjdFwiO1xuaW1wb3J0IHtBUFBfQ0hBVH0gZnJvbSBcIi4uLy4uL21vZGVsL01lc3NhZ2VDb25zdGFudHNcIjtcbmltcG9ydCB7TWVzc2FnZUNoYXR9IGZyb20gXCIuLi8uLi9tb2RlbC9NZXNzYWdlQ2hhdFwiO1xuaW1wb3J0IHtDaGF0TWVzc2FnZVNlcnZpY2V9IGZyb20gXCIuLi8uLi9tZXNzYWdlLnNlcnZpY2VcIjtcbmltcG9ydCB7TWVzc2FnZUNoYXRIb2xkZXJ9IGZyb20gXCIuLi8uLi9tb2RlbC9NZXNzYWdlSG9sZGVyXCI7XG5pbXBvcnQge0ZpbGVMaXN0Q29tcG9uZW50LCBGaWxlTGlzdEl0ZW19IGZyb20gXCIuLi8uLi9maWxlbGlzdC9saXN0L2ZpbGUtbGlzdC5jb21wb25lbnRcIjtcbmltcG9ydCB7RW52ZWxvcEJvZHl9IGZyb20gJ2luZXQtY29yZSc7XG5pbXBvcnQge1ZpZGVvQ29uZmVyZW5jZVNlcnZpY2V9IGZyb20gXCIuLi8uLi92aWRlby1jb25mZXJlbmNlLnNlcnZpY2VcIjtcbmltcG9ydCB7IE9wZW5HcmFwaFNlcnZpY2UgfSBmcm9tICcuLi8uLi9vcGVuLWdyYXBoL29wZW4tZ3JhcGguc2VydmljZSc7XG5cbmRlY2xhcmUgbGV0IGlOZXQ6IGFueTtcbi8vIGRlY2xhcmUgbGV0ICQ6IGFueTtcbi8vIGltcG9ydCB7aWZ2aXNpYmxlfSBmcm9tIFwiaWZ2aXNpYmxlLmpzXCJcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtZXNzYWdlLWNoYXQnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9tZXNzYWdlLWNoYXQuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL21lc3NhZ2UtY2hhdC5jb21wb25lbnQuY3NzJ10sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5leHBvcnQgY2xhc3MgTWVzc2FnZUNoYXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBBZnRlclZpZXdDaGVja2VkLCBBZnRlckNvbnRlbnRDaGVja2VkIHtcbiAgICBASW5wdXQoKSB1c2VybmFtZTogc3RyaW5nO1xuICAgIEBJbnB1dCgpIGF1ZGlvQ2FsbDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIHZpZGVvQ2FsbDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIGNsb3NhYmxlOiBib29sZWFuID0gZmFsc2U7XG4gICAgQE91dHB1dCgpIG9uQXVkaW9DYWxsID0gbmV3IEV2ZW50RW1pdHRlcjxNZXNzYWdlQ29udGFjdD4oKTtcbiAgICBAT3V0cHV0KCkgb25WaWRlb0NhbGwgPSBuZXcgRXZlbnRFbWl0dGVyPE1lc3NhZ2VDb250YWN0PigpO1xuICAgIEBPdXRwdXQoKSBvbkNsb3NlID0gbmV3IEV2ZW50RW1pdHRlcjxNZXNzYWdlQ29udGFjdD4oKTtcbiAgICBAVmlld0NoaWxkKCdpbnB1dCcpIGlucHV0OiBFbGVtZW50UmVmO1xuICAgIEBWaWV3Q2hpbGQoJ21lc3NhZ2VCb2R5JykgbWVzc2FnZUJvZHk6IEVsZW1lbnRSZWY7XG4gICAgQFZpZXdDaGlsZCgnZmlsZUxpc3QnKSBmaWxlTGlzdDogRmlsZUxpc3RDb21wb25lbnQ7XG4gICAgdmlkZW9QYW5lbFZpc2libGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIGxpbmtSZWdleCA9IC8oaHR0cHM/OlxcL1xcL1teXFxzXSspLztcbiAgICBjb250YWN0OiBNZXNzYWdlQ29udGFjdDtcbiAgICBob2xkZXJzOiBNZXNzYWdlQ2hhdEhvbGRlcltdID0gW107XG4gICAgZmlsZXM6IGFueVtdID0gW107XG4gICAgbG9hZGluZzogYm9vbGVhbiA9IHRydWU7XG4gICAgcHJvZmlsZSA9IGlOZXQudXNlcm5hbWU7XG4gICAgbWVzc2FnZUpvaW5DYWxsID0ge307XG4gICAgLy8gQFZpZXdDaGlsZChMaW5rUHJldmlld0NvbXBvbmVudCkgbGlua1ByZXZpZXc6IExpbmtQcmV2aWV3Q29tcG9uZW50O1xuXG4gICAgZ2V0IGNhblNlbmQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmZpbGVzLmxlbmd0aCA+IDAgfHwgdGhpcy5tZXNzYWdlLmxlbmd0aCA+IDA7XG4gICAgfVxuXG4gICAgZ2V0IG1lc3NhZ2UoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5wdXQgJiYgdGhpcy5pbnB1dC5uYXRpdmVFbGVtZW50LnZhbHVlLnRyaW0oKSB8fCAnJztcbiAgICB9XG5cbiAgICBnZXQgc2Nyb2xsVG9wKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLm1lc3NhZ2VCb2R5Lm5hdGl2ZUVsZW1lbnQuc2Nyb2xsVG9wO1xuICAgIH1cblxuICAgIHNldCBzY3JvbGxUb3Aoc2Nyb2xsVG9wOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5tZXNzYWdlQm9keS5uYXRpdmVFbGVtZW50LnNjcm9sbFRvcCA9IHNjcm9sbFRvcDtcbiAgICB9XG5cbiAgICBnZXQgc2Nyb2xsSGVpZ2h0KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLm1lc3NhZ2VCb2R5Lm5hdGl2ZUVsZW1lbnQuc2Nyb2xsSGVpZ2h0O1xuICAgIH1cblxuICAgIGdldCBzY3JvbGxCb3R0b20oKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2Nyb2xsSGVpZ2h0IC0gdGhpcy5tZXNzYWdlQm9keS5uYXRpdmVFbGVtZW50LnNjcm9sbFRvcDtcbiAgICB9XG5cbiAgICBzZXQgc2Nyb2xsQm90dG9tKHNjcm9sbEJvdHRvbTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuc2Nyb2xsVG9wID0gdGhpcy5zY3JvbGxIZWlnaHQgLSBzY3JvbGxCb3R0b207XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfc2Nyb2xsaW5nVG9wOiBib29sZWFuO1xuICAgIHByaXZhdGUgX3Njcm9sbEJvdHRvbTogbnVtYmVyO1xuICAgIHByaXZhdGUgX2xhc3RTY3JvbGxCb3R0b206IG51bWJlcjtcbiAgICBwcml2YXRlIF9zY3JvbGxOZWVkVXBkYXRlOiBib29sZWFuO1xuICAgIHByaXZhdGUgX2hhc01vcmVNc2c6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIF9tZXNzYWdlT2JzZXJ2ZXI7XG4gICAgcHJpdmF0ZSBfX21lc3NhZ2VDaGF0O1xuXG4gICAgcHJpdmF0ZSBfcGFyYW1zOiBhbnkgPSB7XG4gICAgICAgIHBhZ2VTaXplOiAyMCxcbiAgICAgICAgcGFnZU51bWJlcjogMFxuICAgIH07XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBvcGVuR3JhcGhTZXJ2aWNlOiBPcGVuR3JhcGhTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIG1lc3NhZ2VTZXJ2aWNlOiBDaGF0TWVzc2FnZVNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgdmlkZW9TZXJ2aWNlOiBWaWRlb0NvbmZlcmVuY2VTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGVsZW1lbnQ6IEVsZW1lbnRSZWZcbiAgICApIHtcbiAgICAgICAgdGhpcy5fbWVzc2FnZU9ic2VydmVyID0gdGhpcy5tZXNzYWdlU2VydmljZS5tZXNzYWdlUmVjZWl2ZWQuc3Vic2NyaWJlKChtZXNzYWdlOiBNZXNzYWdlQ2hhdCkgPT4ge1xuICAgICAgICAgICAgaWYgKG1lc3NhZ2UubWVzc2FnZS5zZW5kZXIgIT09IGlOZXQudXNlcm5hbWUpIHtcbiAgICAgICAgICAgICAgICBpZiAobWVzc2FnZS5tZXNzYWdlLnNlbmRlciA9PT0gdGhpcy51c2VybmFtZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAobWVzc2FnZS5tZXNzYWdlLm1lc3NhZ2UuYWxlcnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0eXBlTWVzc2FnZSA9IG1lc3NhZ2UubWVzc2FnZS5tZXNzYWdlLmFsZXJ0LnNwbGl0KFwiOlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlTWVzc2FnZVswXSA9PT0gJ3VyaV9tZXNzYWdlJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlTWVzc2FnZVsxXSA9PT0gJ3ZpZGVvX2NvbmZlcmVuY2UnICYmICFpTmV0LmlzRW1wdHkodHlwZU1lc3NhZ2VbMl0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX19tZXNzYWdlQ2hhdCA9IEpTT04ucGFyc2UodGhpcy5kZWNvZGVCYXNlNjQodHlwZU1lc3NhZ2VbMl0pKSB8fCB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX19tZXNzYWdlQ2hhdC5hY3Rpb24gPT09ICdFTkQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobWVzc2FnZS5tZXNzYWdlLm1lc3NhZ2Uuam9pbnMuc3BsaXQoJywnKS5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLmRpc3BsYXlUZXh0ID0gdGhpcy5tZXNzYWdlTWlzc0NhbGwoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZW5kU3VjY2VzcyhtZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5kaXNwbGF5VGV4dCA9IHRoaXMubWVzc2FnZUpvaW5lZENhbGwobWVzc2FnZS5tZXNzYWdlLm1lc3NhZ2UuZHVyYXRpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlbmRTdWNjZXNzKG1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9fbWVzc2FnZUNoYXQuYWN0aW9uID09PSAnTEVGVCcgJiYgbWVzc2FnZS5tZXNzYWdlLm1lc3NhZ2Uuam9pbnMuc3BsaXQoJywnKVswXSA9PT0gaU5ldC51c2VybmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1lc3NhZ2UubWVzc2FnZS5tZXNzYWdlLmpvaW5zLnNwbGl0KCcsJykubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5kaXNwbGF5VGV4dCA9IHRoaXMubWVzc2FnZU1pc3NDYWxsKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5tZXNzYWdlLnNlbmRlciA9IG1lc3NhZ2UubWVzc2FnZS5tZXNzYWdlLmpvaW5zLnNwbGl0KCcsJylbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5tZXNzYWdlLm1lc3NhZ2Uuam9pbnMuc3BsaXQoJywnKVswXSA9PT0gaU5ldC51c2VybmFtZSA/IG1lc3NhZ2UuaXNTZW50ID0gdHJ1ZSA6IG1lc3NhZ2UuaXNTZW50ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2VuZFN1Y2Nlc3MobWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UuZGlzcGxheVRleHQgPSB0aGlzLm1lc3NhZ2VKb2luZWRDYWxsVG8obWVzc2FnZS5tZXNzYWdlLm1lc3NhZ2UuZHVyYXRpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UubWVzc2FnZS5zZW5kZXIgPSBtZXNzYWdlLm1lc3NhZ2UubWVzc2FnZS5qb2lucy5zcGxpdCgnLCcpWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UubWVzc2FnZS5tZXNzYWdlLmpvaW5zLnNwbGl0KCcsJylbMF0gPT09IGlOZXQudXNlcm5hbWUgPyBtZXNzYWdlLmlzU2VudCA9IHRydWUgOiBtZXNzYWdlLmlzU2VudCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlbmRTdWNjZXNzKG1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZW5kU3VjY2VzcyhtZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWVzc2FnZVNlcnZpY2UudXBkYXRlTGFzdE1lc3NhZ2UodGhpcy51c2VybmFtZSwgbWVzc2FnZS5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tZXNzYWdlU2VydmljZS5yZXNldFVucmVhZE1lc3NhZ2UodGhpcy51c2VybmFtZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxldCB0eXBlTWVzc2FnZSA9IG1lc3NhZ2UubWVzc2FnZS5tZXNzYWdlLmFsZXJ0LnNwbGl0KFwiOlwiKTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZU1lc3NhZ2VbMF0gPT09ICd1cmlfbWVzc2FnZScpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVNZXNzYWdlWzFdID09PSAndmlkZW9fY29uZmVyZW5jZScgJiYgIWlOZXQuaXNFbXB0eSh0eXBlTWVzc2FnZVsyXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX19tZXNzYWdlQ2hhdCA9IEpTT04ucGFyc2UodGhpcy5kZWNvZGVCYXNlNjQodHlwZU1lc3NhZ2VbMl0pKSB8fCB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9fbWVzc2FnZUNoYXQuYWN0aW9uID09PSAnSk9JTicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX19tZXNzYWdlQ2hhdC5hY3Rpb24gPT09ICdMRUZUJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZGVvU2VydmljZS5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWVldFwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2VuZFN1Y2Nlc3MobWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gaWYgKG1lc3NhZ2UubWVzc2FnZS5zZW5kZXIgPT09IHRoaXMudXNlcm5hbWUpIHtcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2Ryb3AnLCAoZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc3R5bGUub3BhY2l0eSA9ICcxJztcbiAgICAgICAgICAgIHRoaXMuX29uRHJvcEZpbGUoZSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnbGVhdmUnLCAoZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc3R5bGUub3BhY2l0eSA9ICcxJztcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJywgKGUpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnN0eWxlLm9wYWNpdHkgPSAnLjUnO1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9vbkRyb3BGaWxlKGV2KSB7XG4gICAgICAgIC8vIFByZXZlbnQgZGVmYXVsdCBiZWhhdmlvciAoUHJldmVudCBmaWxlIGZyb20gYmVpbmcgb3BlbmVkKVxuICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBsZXQgZmlsZXM7XG4gICAgICAgIGlmIChldi5kYXRhVHJhbnNmZXIuaXRlbXMpIHtcbiAgICAgICAgICAgIGZpbGVzID0gW107XG4gICAgICAgICAgICAvLyBVc2UgRGF0YVRyYW5zZmVySXRlbUxpc3QgaW50ZXJmYWNlIHRvIGFjY2VzcyB0aGUgZmlsZShzKVxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBldi5kYXRhVHJhbnNmZXIuaXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAvLyBJZiBkcm9wcGVkIGl0ZW1zIGFyZW4ndCBmaWxlcywgcmVqZWN0IHRoZW1cbiAgICAgICAgICAgICAgICBpZiAoZXYuZGF0YVRyYW5zZmVyLml0ZW1zW2ldLmtpbmQgPT09ICdmaWxlJykge1xuICAgICAgICAgICAgICAgICAgICBmaWxlcy5wdXNoKGV2LmRhdGFUcmFuc2Zlci5pdGVtc1tpXS5nZXRBc0ZpbGUoKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZmlsZXMgPSBldi5kYXRhVHJhbnNmZXIuZmlsZXM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZpbGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuZmlsZUxpc3QuYWRkRmlsZXMoZmlsZXMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRDaGVja2VkKCkge1xuICAgICAgICAvLyBDb2xsZWN0IHNjcm9sbCBwb3NpdGlvbiBiZWZvcmUgcmVuZGVyIG5ldyBtZXNzYWdlc1xuICAgICAgICBpZiAodGhpcy5fc2Nyb2xsTmVlZFVwZGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5fbGFzdFNjcm9sbEJvdHRvbSA9IHRoaXMuc2Nyb2xsQm90dG9tO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdDaGVja2VkKCkge1xuICAgICAgICAvLyBSZXN0b3JlIHNjcm9sbCBwb3NpdGlvbiBhZnRlciByZW5kZXIgbmV3IG1lc3NhZ2VzIGlmIG5vdCBtYXRjaFxuICAgICAgICBpZiAodGhpcy5fc2Nyb2xsTmVlZFVwZGF0ZSkge1xuICAgICAgICAgICAgbGV0IHNjcm9sbEJvdHRvbSA9IHRoaXMuc2Nyb2xsQm90dG9tO1xuICAgICAgICAgICAgdGhpcy5fc2Nyb2xsTmVlZFVwZGF0ZSA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKHRoaXMuX2xhc3RTY3JvbGxCb3R0b20gIT0gc2Nyb2xsQm90dG9tKSB7XG4gICAgICAgICAgICAgICAgLy8gUmVzdG9yZSBsYXN0IHNjcm9sbEJvdHRvbVxuICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsQm90dG9tID0gdGhpcy5fbGFzdFNjcm9sbEJvdHRvbTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLl9vbkxvYWQoKTtcbiAgICAgICAgLy8gaWZ2aXNpYmxlLm9uKFwiZm9jdXNcIiwgKCkgPT4ge1xuICAgICAgICAvLyAgICAgaWYgKGlmdmlzaWJsZS5ub3coKSkge1xuICAgICAgICAvLyAgICAgICAgIHRoaXMuX3BhcmFtcy5wYWdlTnVtYmVyID0gMDtcbiAgICAgICAgLy8gICAgICAgICB0aGlzLl9vbkxvYWQoKTtcbiAgICAgICAgLy8gICAgICAgICAvLyB0aGlzLm1lc3NhZ2VTZXJ2aWNlLnJlY29ubmV0U29ja2V0KCk7XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH0pO1xuICAgICAgICB0aGlzLm1lc3NhZ2VCb2R5Lm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgKCkgPT4gdGhpcy5fb25Cb2R5U2Nyb2xsKCkpO1xuICAgICAgICBpZiAoIXRoaXMudmlkZW9TZXJ2aWNlLmlzRXhpc3RNZWV0KCkpIHtcbiAgICAgICAgICAgIHRoaXMudmlkZW9QYW5lbFZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfb25Cb2R5U2Nyb2xsKCkge1xuICAgICAgICBjb25zdCBzY3JvbGxCb3R0b20gPSB0aGlzLnNjcm9sbEJvdHRvbTtcbiAgICAgICAgdGhpcy5fc2Nyb2xsaW5nVG9wID0gdGhpcy5fc2Nyb2xsQm90dG9tIDw9IHNjcm9sbEJvdHRvbTtcbiAgICAgICAgdGhpcy5fc2Nyb2xsQm90dG9tID0gc2Nyb2xsQm90dG9tO1xuICAgICAgICBpZiAodGhpcy5sb2FkaW5nIHx8ICF0aGlzLl9oYXNNb3JlTXNnKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gc2Nyb2xsIHRvIHRvcFxuICAgICAgICBpZiAodGhpcy5fc2Nyb2xsaW5nVG9wICYmIHRoaXMuc2Nyb2xsVG9wIDwgMTUwKSB7XG4gICAgICAgICAgICB0aGlzLl9sb2FkTWVzc2FnZXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAgICAgaWYgKGNoYW5nZXMudXNlcm5hbWUgJiYgIWNoYW5nZXMudXNlcm5hbWUuZmlyc3RDaGFuZ2UpIHtcbiAgICAgICAgICAgIHRoaXMuX29uTG9hZCgpO1xuICAgICAgICAgICAgdGhpcy5tZXNzYWdlSm9pbkNhbGxbJ2pvaW5lZCddID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5fbWVzc2FnZU9ic2VydmVyLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgdmlld0F0dGFjaG1lbnQoZTogeyBmaWxlOiBGaWxlTGlzdEl0ZW0gfSkge1xuICAgICAgICB3aW5kb3cub3BlbihlLmZpbGUudXJsLCAnX2JsYW5rJyk7XG4gICAgfVxuXG4gICAgc2VuZE1lc3NhZ2UoKSB7XG4gICAgICAgIGxldCB2YWx1ZSA9IHRoaXMubWVzc2FnZS50cmltKCk7XG4gICAgICAgIGxldCBfX21lcyA9IHRoaXMubWVzc2FnZVNlcnZpY2UucmV2ZXJ0TWVzc2FnZSh2YWx1ZSkgfHwgJyc7XG4gICAgICAgIC8vIGxldCBfX21lc0Rpc3BsYXkgPSB0aGlzLm1lc3NhZ2VTZXJ2aWNlLnJldmVydE1lc3NhZ2VEaXNwbGF5KHZhbHVlKSB8fCAnJztcbiAgICAgICAgbGV0IGxpbmtzID0gdGhpcy5saW5rUmVnZXguZXhlYyhfX21lcyk7XG4gICAgICAgIGlmIChsaW5rcyAmJiBsaW5rcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLm9wZW5HcmFwaFNlcnZpY2UubG9hZFByZXZpZXdMaW5rKHRoaXMubWVzc2FnZSwgKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHRoaXMuZW5jb2RlQmFzZTY0KEpTT04uc3RyaW5naWZ5KHRoaXMuY29udmVydExpbmtzKGRhdGEpKSlcbiAgICAgICAgICAgICAgICB0aGlzLnNlbmRNZXNzYWdlU29ja2V0KCd1cmlfbWVzc2FnZTpsaW5rX3ByZXZpZXc6JyArIHZhbHVlKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNlbmRNZXNzYWdlU29ja2V0KHZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgc2VuZE1lc3NhZ2VTb2NrZXQodmFsdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlIHx8IHRoaXMuZmlsZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZmlsZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3NlbmRQdXNoKHZhbHVlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2VuZFNvY2tldCh2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9jbGVhcklucHV0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb252ZXJ0TGlua3MoZGF0YSkge1xuICAgICAgICBsZXQgcGFyYW0gPSB7fTtcbiAgICAgICAgcGFyYW1bJ3RpdGxlJ10gPSBkYXRhWyd0aXRsZSddO1xuICAgICAgICBwYXJhbVsnaW1hZ2UnXSA9IGRhdGFbJ2ltYWdlJ107XG4gICAgICAgIHBhcmFtWydkZXNjcmlwdGlvbiddID0gZGF0YVsnZGVzY3JpcHRpb24nXTtcbiAgICAgICAgcGFyYW1bJ3VybCddID0gZGF0YVsndXJsJ107XG4gICAgICAgIHBhcmFtWydmaW5hbFVybCddID0gZGF0YVsnc2l0ZV9uYW1lJ10udG9VcHBlckNhc2UoKTtcbiAgICAgICAgcmV0dXJuIHBhcmFtO1xuICAgIH1cblxuXG4gICAgcHJpdmF0ZSBfbG9hZE1lc3NhZ2VzKCkge1xuICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLl9oYXNNb3JlTXNnID0gZmFsc2U7XG4gICAgICAgIHRoaXMubWVzc2FnZVNlcnZpY2UubG9hZE1lc3NhZ2VzKHRoaXMuX3BhcmFtcywgKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgLy8gdGhpcy5tZXNzYWdlcyA9IHJlc3VsdC5pdGVtcy5jb25jYXQodGhpcy5tZXNzYWdlcyk7XG4gICAgICAgICAgICB0aGlzLl9hZGRNZXNzYWdlcyhyZXN1bHQuaXRlbXMpO1xuICAgICAgICAgICAgaWYgKHRoaXMuX3BhcmFtcy5wYWdlTnVtYmVyID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2Nyb2xsVG9Cb3R0b20oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX3Njcm9sbE5lZWRVcGRhdGUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5fcGFyYW1zLnBhZ2VOdW1iZXIgKz0gMTtcbiAgICAgICAgICAgIHRoaXMuX2hhc01vcmVNc2cgPSB0aGlzLl9wYXJhbXMucGFnZVNpemUgKiB0aGlzLl9wYXJhbXMucGFnZU51bWJlciA8IHJlc3VsdC50b3RhbDtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuX29uQm9keVNjcm9sbCgpO1xuICAgICAgICAgICAgfSwgNTAwKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZm9jdXMoKSB7XG4gICAgICAgIHRoaXMuaW5wdXQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3Njcm9sbFRvQm90dG9tKCkge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsVG9wID0gdGhpcy5zY3JvbGxIZWlnaHQ7XG4gICAgICAgIH0sIDEwMCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfY2xlYXJJbnB1dCgpIHtcbiAgICAgICAgdGhpcy5maWxlcy5sZW5ndGggPSAwO1xuICAgICAgICB0aGlzLmlucHV0Lm5hdGl2ZUVsZW1lbnQudmFsdWUgPSAnJztcbiAgICAgICAgdGhpcy5fZm9jdXMoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9hZGRNZXNzYWdlcyhtZXNzYWdlc0FycjogTWVzc2FnZUNoYXRbXSwgaW5zZXJ0TGFzdDogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgICAgIGxldCBtZXNzYWdlcyA9IHRoaXMuY29udmVydEFycmF5TWVzc2FnZShKU09OLnN0cmluZ2lmeShtZXNzYWdlc0FycikpO1xuICAgICAgICBtZXNzYWdlcy5zb3J0KChhLCBiKSA9PiBiLmRhdGUuZ2V0VGltZSgpIC0gYS5kYXRlLmdldFRpbWUoKSk7XG4gICAgICAgIG1lc3NhZ2VzLmZvckVhY2goKG1lc3NhZ2UpID0+IHtcbiAgICAgICAgICAgIGxldCBob2xkZXI7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuaG9sZGVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmhvbGRlcnNbaV0uaXNTYW1lRGF0ZShtZXNzYWdlLmRhdGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIGhvbGRlciA9IHRoaXMuaG9sZGVyc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFob2xkZXIpIHtcbiAgICAgICAgICAgICAgICBob2xkZXIgPSBuZXcgTWVzc2FnZUNoYXRIb2xkZXIobWVzc2FnZS5kYXRlKTtcbiAgICAgICAgICAgICAgICBpZiAoaW5zZXJ0TGFzdCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhvbGRlcnMucHVzaChob2xkZXIpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaG9sZGVycy51bnNoaWZ0KGhvbGRlcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGluc2VydExhc3QpIHtcbiAgICAgICAgICAgICAgICBob2xkZXIubWVzc2FnZXMucHVzaChtZXNzYWdlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaG9sZGVyLm1lc3NhZ2VzLnVuc2hpZnQobWVzc2FnZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgcHJpdmF0ZSBjb252ZXJ0TWVzc2FnZXMobWVzc2FnZXMpIHtcbiAgICAgICAgaWYgKCFpTmV0LmlzRW1wdHkobWVzc2FnZXMpKSB7XG4gICAgICAgICAgICBsZXQgX19tZXMgPSB0aGlzLm1lc3NhZ2VTZXJ2aWNlLnJldmVydE1lc3NhZ2UobWVzc2FnZXMuZGlzcGxheVRleHQpIHx8ICcnO1xuICAgICAgICAgICAgbGV0IF9fbWVzRGlzcGxheSA9IHRoaXMubWVzc2FnZVNlcnZpY2UucmV2ZXJ0TWVzc2FnZURpc3BsYXkobWVzc2FnZXMuZGlzcGxheVRleHQpIHx8ICcnO1xuICAgICAgICAgICAgbGV0IHR5cGVNZXNzYWdlcyA9IF9fbWVzLnNwbGl0KFwiOlwiKTtcbiAgICAgICAgICAgIGlmICh0eXBlTWVzc2FnZXMubGVuZ3RoID49IDIpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZU1lc3NhZ2VzWzBdID09PSAndXJpX21lc3NhZ2UnICYmIHR5cGVNZXNzYWdlc1sxXSA9PT0gJ3ZpZGVvX2NvbmZlcmVuY2UnKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBfX21lc3NhZ2VDaGF0ID0gSlNPTi5wYXJzZSh0aGlzLmRlY29kZUJhc2U2NCh0eXBlTWVzc2FnZXNbMl0pKSB8fCB7fTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1lc3NhZ2VzLm1lc3NhZ2Uuc2VuZGVyID09PSB0aGlzLnVzZXJuYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoX19tZXNzYWdlQ2hhdC5hY3Rpb24gPT09ICdFTkQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1lc3NhZ2VzLm1lc3NhZ2UubWVzc2FnZS5qb2lucy5zcGxpdCgnLCcpLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlcy5kaXNwbGF5VGV4dCA9IHRoaXMubWVzc2FnZU1pc3NDYWxsKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBtZXNzYWdlcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlcy5kaXNwbGF5VGV4dCA9IHRoaXMubWVzc2FnZUpvaW5lZENhbGwobWVzc2FnZXMubWVzc2FnZS5tZXNzYWdlLmR1cmF0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1lc3NhZ2VzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfX21lc3NhZ2VDaGF0LmFjdGlvbiA9PT0gJ0xFRlQnICYmIG1lc3NhZ2VzLm1lc3NhZ2UubWVzc2FnZS5qb2lucy5zcGxpdCgnLCcpWzBdID09PSBtZXNzYWdlcy5tZXNzYWdlLnNlbmRlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlcy5tZXNzYWdlLm1lc3NhZ2Uuam9pbnMuc3BsaXQoJywnKS5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZXMuZGlzcGxheVRleHQgPSB0aGlzLm1lc3NhZ2VNaXNzQ2FsbCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWVzc2FnZXM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZXMuZGlzcGxheVRleHQgPSB0aGlzLm1lc3NhZ2VKb2luZWRDYWxsKG1lc3NhZ2VzLm1lc3NhZ2UubWVzc2FnZS5kdXJhdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBtZXNzYWdlcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBtZXNzYWdlcztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9fbWVzc2FnZUNoYXQuYWN0aW9uID09PSAnRU5EJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlcy5tZXNzYWdlLm1lc3NhZ2Uuam9pbnMuc3BsaXQoJywnKS5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZXMuZGlzcGxheVRleHQgPSB0aGlzLm1lc3NhZ2VNaXNzQ2FsbCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWVzc2FnZXM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZXMuZGlzcGxheVRleHQgPSB0aGlzLm1lc3NhZ2VKb2luZWRDYWxsVG8obWVzc2FnZXMubWVzc2FnZS5tZXNzYWdlLmR1cmF0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1lc3NhZ2VzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubWVzc2FnZUpvaW5DYWxsWydqb2luZWQnXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlcy5kaXNwbGF5VGV4dCA9IHRoaXMubWVzc2FnZUpvaW5lZENhbGxUbyhtZXNzYWdlcy5tZXNzYWdlLm1lc3NhZ2UuZHVyYXRpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWVzc2FnZXM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZXMuZGlzcGxheVRleHQgPSB0aGlzLm1lc3NhZ2VNaXNzQ2FsbCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWVzc2FnZXM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZU1lc3NhZ2VzWzBdID09PSAndXJpX21lc3NhZ2UnICYmIHR5cGVNZXNzYWdlc1sxXSA9PT0gJ2xpbmtfcHJldmlldycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBfX21lc3NhZ2VMaW5rID0gSlNPTi5wYXJzZSh0aGlzLmRlY29kZUJhc2U2NCh0eXBlTWVzc2FnZXNbMl0pKSB8fCB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2VzWydfb3BlbkdyYXBoJ10gPSBfX21lc3NhZ2VMaW5rO1xuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZXMuZGlzcGxheVRleHQgPSBfX21lc0Rpc3BsYXk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWVzc2FnZXM7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWVzc2FnZXM7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBtZXNzYWdlcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG1lc3NhZ2VNaXNzQ2FsbCgpe1xuICAgICAgICAvLyAkKCcubWVzc2FnZS1jaGF0X19taXNzJykub24oJ2NsaWNrJywoKT0+e1xuICAgICAgICAvLyAgICAgY29uc29sZS5sb2coJ2NsaWNrJylcbiAgICAgICAgLy8gICAgIHRoaXMuam9pblJvb20odHJ1ZSk7XG4gICAgICAgIC8vIH0pXG4gICAgICAgIHJldHVybiAgJzxkaXYgY2xhc3M9XCJjb250YWN0IGQtZmxleCBteS0xXCIgcm9sZT1cImJ1dHRvblwiIHN0eWxlPVwiXCI+XFxuJyArXG4gICAgICAgICAgICAnICAgIDxpIGNsYXNzPVwibWVzc2FnZS1jaGF0X19taXNzIGZhIGZhLXBob25lIG1sLTBcIj48L2k+XFxuJyArXG4gICAgICAgICAgICAnICAgIDxkaXYgY2xhc3M9XCJjb250YWN0LWNvbnRlbnQgcGwtMlwiPlxcbicgK1xuICAgICAgICAgICAgJyAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRhY3QtbmFtZSBtYi0xXCI+Q3Xhu5ljIGfhu41pIGLhu4sgbmjhu6E8L2Rpdj5cXG4nICtcbiAgICAgICAgICAgICcgICAgICAgIDxkaXYgY2xhc3M9XCJjb250YWN0LWRldGFpbFwiPkfhu41pIGzhuqFpPC9kaXY+XFxuJyArXG4gICAgICAgICAgICAnICAgIDwvZGl2PlxcbicgK1xuICAgICAgICAgICAgJzwvZGl2PidcbiAgICB9XG4gICAgbWVzc2FnZUpvaW5lZENhbGwoZHVyYXRpb24pe1xuICAgICAgICByZXR1cm4gICc8ZGl2IGNsYXNzPVwiY29udGFjdCBkLWZsZXggbXktMVwiIHJvbGU9XCJidXR0b25cIiBzdHlsZT1cIlwiPlxcbicgK1xuICAgICAgICAnICAgIDxpIGNsYXNzPVwibWVzc2FnZS1jaGF0X19hY3Rpb24gZmEgZmEtcGhvbmUgbWwtMFwiPjwvaT5cXG4nICtcbiAgICAgICAgJyAgICA8ZGl2IGNsYXNzPVwiY29udGFjdC1jb250ZW50IHBsLTJcIj5cXG4nICtcbiAgICAgICAgJyAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRhY3QtbmFtZSBtYi0xXCI+Q3Xhu5ljIGfhu41pIHRob+G6oWkgxJHhur9uPC9kaXY+XFxuJyArXG4gICAgICAgICcgICAgICAgIDxkaXYgY2xhc3M9XCJjb250YWN0LWRldGFpbFwiPicgKyBkdXJhdGlvbiArICcgZ2nDonknICsgJzwvZGl2PlxcbicgK1xuICAgICAgICAnICAgIDwvZGl2PlxcbicgK1xuICAgICAgICAnPC9kaXY+J1xuICAgIH1cbiAgICBtZXNzYWdlSm9pbmVkQ2FsbFRvKGR1cmF0aW9uKXtcbiAgICAgICAgcmV0dXJuICAnPGRpdiBjbGFzcz1cImNvbnRhY3QgZC1mbGV4IG15LTFcIiByb2xlPVwiYnV0dG9uXCIgc3R5bGU9XCJcIj5cXG4nICtcbiAgICAgICAgICAgICcgICAgPGkgY2xhc3M9XCJtZXNzYWdlLWNoYXRfX2FjdGlvbiBmYSBmYS1waG9uZSBtbC0wXCI+PC9pPlxcbicgK1xuICAgICAgICAgICAgJyAgICA8ZGl2IGNsYXNzPVwiY29udGFjdC1jb250ZW50IHBsLTJcIj5cXG4nICtcbiAgICAgICAgICAgICcgICAgICAgIDxkaXYgY2xhc3M9XCJjb250YWN0LW5hbWUgbWItMVwiPkN14buZYyBn4buNaSB0aG/huqFpIMSRaTwvZGl2PlxcbicgK1xuICAgICAgICAgICAgJyAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRhY3QtZGV0YWlsXCI+JyArIGR1cmF0aW9uICsgJyBnacOieScgKyAnPC9kaXY+XFxuJyArXG4gICAgICAgICAgICAnICAgIDwvZGl2PlxcbicgK1xuICAgICAgICAgICAgJzwvZGl2PidcbiAgICB9XG5cblxuICAgIHByaXZhdGUgY29udmVydEFycmF5TWVzc2FnZShhcnJNZXNzYWdlKSB7XG4gICAgICAgIGxldCBhcnIgPSBKU09OLnBhcnNlKGFyck1lc3NhZ2UpO1xuICAgICAgICBhcnIuZm9yRWFjaChlbGUgPT4ge1xuICAgICAgICAgICAgZWxlID0gdGhpcy5jb252ZXJ0TWVzc2FnZXMoZWxlKTtcbiAgICAgICAgICAgIGVsZS5kYXRlID0gbmV3IERhdGUoZWxlLmRhdGUpO1xuICAgICAgICAgICAgcmV0dXJuIGVsZTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBhcnI7XG4gICAgfVxuXG4gICAgZW5jb2RlQmFzZTY0KHN0cjogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB3aW5kb3cuYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoc3RyKSkpO1xuICAgIH1cblxuICAgIGRlY29kZUJhc2U2NChzdHI6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KGVzY2FwZSh3aW5kb3cuYXRvYihzdHIpKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfb25Mb2FkKCkge1xuICAgICAgICB0aGlzLmRpc3Bvc2VSb29tKCk7XG4gICAgICAgIHRoaXMuX3BhcmFtcy5zZW5kZXIgPSB0aGlzLnVzZXJuYW1lO1xuICAgICAgICB0aGlzLl9wYXJhbXMucGFnZU51bWJlciA9IDA7XG4gICAgICAgIHRoaXMuX2hhc01vcmVNc2cgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5ob2xkZXJzID0gW107XG4gICAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG4gICAgICAgIHRoaXMuZmlsZXMubGVuZ3RoID0gMDtcbiAgICAgICAgdGhpcy5tZXNzYWdlU2VydmljZS5nZXRDb250YWN0QnlVc2VyQ29kZSh0aGlzLnVzZXJuYW1lLCAoY29udGFjdCkgPT4gdGhpcy5jb250YWN0ID0gY29udGFjdCk7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5fbG9hZE1lc3NhZ2VzKCk7XG4gICAgICAgICAgICB0aGlzLl9mb2N1cygpO1xuICAgICAgICB9LCA1MDApO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3NlbmRTb2NrZXQodmFsdWU6IHN0cmluZykge1xuICAgICAgICBjb25zdCBlbnZlbG9wID0gdGhpcy5tZXNzYWdlU2VydmljZS5idWlsZEVudmVsb3AodGhpcy51c2VybmFtZSwgdmFsdWUpO1xuICAgICAgICB0aGlzLm1lc3NhZ2VTZXJ2aWNlLnNlbmRFbnZlbG9wKGVudmVsb3ApO1xuICAgICAgICB0aGlzLl9zZW5kU3VjY2VzcyhuZXcgTWVzc2FnZUNoYXQoZW52ZWxvcC5ib2R5KSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfc2VuZFB1c2godmFsdWU6IHN0cmluZykge1xuICAgICAgICB2YXIgcGFyYW1zID0ge1xuICAgICAgICAgICAgY29udGVudDogdmFsdWUsXG4gICAgICAgICAgICBhbGVydDogdmFsdWUsXG4gICAgICAgICAgICBhcHBsaWNhdGlvbjogQVBQX0NIQVQsXG4gICAgICAgICAgICBhbGlhczogdGhpcy51c2VybmFtZSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5maWxlcy5mb3JFYWNoKGZ1bmN0aW9uIChmaWxlLCBpKSB7XG4gICAgICAgICAgICBwYXJhbXNbJ2ZpbGUtJyArIGldID0gZmlsZTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMubWVzc2FnZVNlcnZpY2UucHVzaE1lc3NhZ2UocGFyYW1zLCAobWVzc2FnZTogRW52ZWxvcEJvZHkpID0+IHtcbiAgICAgICAgICAgIGlmIChtZXNzYWdlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2VuZFN1Y2Nlc3MobmV3IE1lc3NhZ2VDaGF0KG1lc3NhZ2UpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfc2VuZFN1Y2Nlc3MobWVzc2FnZTogTWVzc2FnZUNoYXQpIHtcbiAgICAgICAgdGhpcy5fYWRkTWVzc2FnZXMoW3RoaXMuY29udmVydE1lc3NhZ2VzKG1lc3NhZ2UpXSwgdHJ1ZSk7XG4gICAgICAgIHRoaXMubWVzc2FnZVNlcnZpY2UudXBkYXRlTGFzdE1lc3NhZ2UodGhpcy51c2VybmFtZSwgbWVzc2FnZS5tZXNzYWdlKTtcbiAgICAgICAgdGhpcy5tZXNzYWdlU2VydmljZS5yZXNldFVucmVhZE1lc3NhZ2UodGhpcy51c2VybmFtZSk7XG4gICAgICAgIHRoaXMuX3Njcm9sbFRvQm90dG9tKCk7XG4gICAgfVxuXG4gICAgam9pblJvb20oYXVkaW9Pbmx5OiBib29sZWFuLCB1c2VyY29kZT86IHN0cmluZykge1xuICAgICAgICB0aGlzLnZpZGVvUGFuZWxWaXNpYmxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMubWVzc2FnZUpvaW5DYWxsWydqb2luZWQnXSA9IGZhbHNlO1xuICAgICAgICBpZiAoIXRoaXMudmlkZW9TZXJ2aWNlLmlzRXhpc3RNZWV0KCkpIHtcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZUpvaW5DYWxsWydqb2luZWQnXSA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbWVldCcpO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1lZXRcIikuc3R5bGUudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiO1xuICAgICAgICAgICAgbGV0IF9fdXNlciA9ICcnO1xuICAgICAgICAgICAgaWYoISF1c2VyY29kZSl7XG4gICAgICAgICAgICAgICAgX191c2VyID0gdXNlcmNvZGU7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBfX3VzZXIgPSAgdGhpcy5jb250YWN0LnVzZXJjb2RlXG4gICAgICAgICAgICB9XG4gICAgICAgIHRoaXMudmlkZW9TZXJ2aWNlLmNhbGxUbyhlbGVtZW50LCBfX3VzZXIsIGF1ZGlvT25seSwgMzUwLCAoYXBpLCBtZXNzYWdlcykgPT4ge1xuICAgICAgICAgICAgYXBpLmFkZEV2ZW50TGlzdGVuZXIoJ3JlYWR5VG9DbG9zZScsICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnZpZGVvU2VydmljZS5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtZWV0XCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICAgICAgICAgICAgICAgIC8vIHRoaXMubWVzc2FnZVNlcnZpY2Uuc2VuZEVudmVsb3AoZW52ZWxvcCk7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLm1lc3NhZ2VKb2luQ2FsbFsnam9pbmVkJ10pIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZW52ZWxvcCA9IHRoaXMubWVzc2FnZVNlcnZpY2UuYnVpbGRFbnZlbG9wKHRoaXMudXNlcm5hbWUsIG1lc3NhZ2VzKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2VuZFN1Y2Nlc3MobmV3IE1lc3NhZ2VDaGF0KGVudmVsb3AuYm9keSkpO1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIGVsc2V7XG4gICAgICAgICAgICAgICAgLy8gICAgIGxldCBfX2pvaW5zID0gW2lOZXQudXNlcm5hbWUsdGhpcy51c2VybmFtZV07XG4gICAgICAgICAgICAgICAgLy8gICAgIGNvbnN0IGVudmVsb3AgPSB0aGlzLm1lc3NhZ2VTZXJ2aWNlLmJ1aWxkRW52ZWxvcCh0aGlzLnVzZXJuYW1lLCBtZXNzYWdlcyxfX2pvaW5zLmpvaW4oJywnKSApXG4gICAgICAgICAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKCdlbnZlbG9wJyxlbnZlbG9wLF9fam9pbnMuam9pbignLCcpKVxuICAgICAgICAgICAgICAgIC8vICAgICB0aGlzLl9zZW5kU3VjY2VzcyhuZXcgTWVzc2FnZUNoYXQoZW52ZWxvcC5ib2R5KSk7XG4gICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBhcGkuYWRkRXZlbnRMaXN0ZW5lcigndmlkZW9Db25mZXJlbmNlSm9pbmVkJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubWVzc2FnZUpvaW5DYWxsID0gdGhpcy52aWRlb1NlcnZpY2UuZ2V0TWVzc2FnZUpvaW4oKTtcbiAgICAgICAgICAgICAgICB0aGlzLm1lc3NhZ2VKb2luQ2FsbFsnam9pbmVkJ10gPSB0cnVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgZGlzcG9zZVJvb20oKSB7XG4gICAgICAgIHRoaXMudmlkZW9QYW5lbFZpc2libGUgPSB0cnVlO1xuICAgICAgICB0aGlzLnZpZGVvU2VydmljZS5kaXNwb3NlKCk7XG4gICAgfVxufVxuIl19