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
export class ChatMessageService {
    /**
     * @param {?} httpService
     * @param {?} socketService
     */
    constructor(httpService, socketService) {
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
        (message) => {
            if (message.application === APP_CHAT) {
                this.updateLastMessage(message.sender, message);
                this._messageSubject.next(new MessageChat(message));
            }
        }));
    }
    /**
     * @return {?}
     */
    destroy() {
        this._socketObserver.unsubscribe();
        this._messageSubject.unsubscribe();
        this._unreadSubject.unsubscribe();
    }
    /**
     * @return {?}
     */
    loadFriends() {
        return new Observable((/**
         * @param {?} observer
         * @return {?}
         */
        (observer) => {
            this.httpService.getJSON(iNet.getPUrl('unifiedpush/list')).subscribe((/**
             * @param {?} data
             * @return {?}
             */
            (data) => {
                observer.next((data || []).map((/**
                 * @param {?} item
                 * @return {?}
                 */
                (item) => new MessageContact(item))));
                observer.complete();
            }));
        }));
    }
    /**
     * @param {?} callback
     * @return {?}
     */
    loadContacts(callback) {
        if (this.contacts.length > 0) {
            callback(this.contacts);
        }
        else {
            this.loadFriends().subscribe((/**
             * @param {?} data
             * @return {?}
             */
            (data) => {
                this.contacts = data.filter((/**
                 * @param {?} item
                 * @return {?}
                 */
                (item) => item.usercode !== iNet.usercode));
                this.updateUnreadMessage();
                callback(this.contacts);
            }), (/**
             * @return {?}
             */
            () => callback([])));
        }
    }
    /**
     * @return {?}
     */
    updateUnreadMessage() {
        /** @type {?} */
        let unread = 0;
        this.contacts.forEach((/**
         * @param {?} friend
         * @return {?}
         */
        (friend) => unread += friend.unread));
        this._unreadSubject.next(unread);
    }
    /**
     * @param {?} usercode
     * @param {?} callback
     * @return {?}
     */
    getContactByUserCode(usercode, callback) {
        if (usercode === 'news-feed' || usercode === iNet.usercode) {
            return;
        }
        this.loadContacts((/**
         * @param {?} contacts
         * @return {?}
         */
        (contacts) => {
            for (let i = 0; i < contacts.length; i++) {
                if (contacts[i].usercode === usercode) {
                    return callback(contacts[i]);
                }
            }
            // contact not exist
            /** @type {?} */
            const contact = new MessageContact({ usercode: usercode, fullname: usercode, unread: 1 });
            this.contacts.unshift(contact);
            callback(contact);
        }));
    }
    /**
     * @param {?} usercode
     * @return {?}
     */
    hasContact(usercode) {
        for (let i = 0; i < this.contacts.length; i++) {
            if (this.contacts[i].usercode === usercode) {
                return true;
            }
        }
        return false;
    }
    /**
     * @param {?} username
     * @param {?} message
     * @return {?}
     */
    send(username, message) {
        return this.socketService.send(username, message, APP_CHAT);
    }
    /**
     * @param {?} envelop
     * @return {?}
     */
    sendEnvelop(envelop) {
        return this.socketService.sendEnvelop(envelop);
    }
    /**
     * @param {?} address
     * @param {?} message
     * @param {?=} join
     * @return {?}
     */
    buildEnvelop(address, message, join) {
        if (join) {
            return this.socketService.buildEnvelop(address, message, APP_CHAT, join);
        }
        else {
            return this.socketService.buildEnvelop(address, message, APP_CHAT);
        }
    }
    /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    pushMessage(params, callback) {
        /** @type {?} */
        const formData = this.httpService.convertToFormData(params);
        this.httpService.post(iNet.getPUrl('message/upload'), formData).subscribe((/**
         * @param {?} data
         * @return {?}
         */
        (data) => {
            /** @type {?} */
            let envelop = this.socketService.buildEnvelop(params.alias, params.content, APP_CHAT);
            envelop.body.message = data.message;
            envelop.body.message.content = envelop.body.message.alert = params.content;
            envelop.body.uuid = data.uuid;
            this.socketService.sendEnvelop(envelop);
            callback(envelop.body);
        }));
    }
    /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    loadMessages(params, callback) {
        this.httpService.postJSON(iNet.getPUrl('message/query'), params).subscribe((/**
         * @param {?} data
         * @return {?}
         */
        (data) => {
            data = data || {};
            data.items = data.items || [];
            data.total = data.total || 0;
            data.items.sort((/**
             * @param {?} a
             * @param {?} b
             * @return {?}
             */
            (a, b) => a.sent - b.sent));
            data.items = data.items.map((/**
             * @param {?} item
             * @return {?}
             */
            (item) => new MessageChat(item)));
            this.resetUnreadMessage(params['sender']);
            callback(data);
        }));
    }
    /**
     * @param {?} usercode
     * @param {?} message
     * @return {?}
     */
    updateLastMessage(usercode, message) {
        // Update last message, move contact to first
        this.getContactByUserCode(usercode, (/**
         * @param {?} contact
         * @return {?}
         */
        (contact) => {
            /** @type {?} */
            var index = this.contacts.indexOf(contact);
            if (index > -1) {
                this.contacts.splice(index, 1);
            }
            this.contacts.unshift(contact);
            /** @type {?} */
            let typeMessages = message.message.alert.split(":");
            if (typeMessages.length > 2) {
                if (typeMessages[0] === 'uri_message' && typeMessages[1] === 'video_conference') {
                    contact.message = '<i class="fa fa-phone pr-1" aria-hidden="true"></i> Cuộc gọi thoại';
                }
                else {
                    /** @type {?} */
                    let __mesDisplay = this.revertMessageDisplay(message.message.alert) || '';
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
                this.updateUnreadMessage();
            }
        }));
    }
    /**
     * @param {?} str
     * @return {?}
     */
    decodeBase64(str) {
        return decodeURIComponent(escape(window.atob(str)));
    }
    /**
     * @param {?} username
     * @return {?}
     */
    resetUnreadMessage(username) {
        this.getContactByUserCode(username, (/**
         * @param {?} contact
         * @return {?}
         */
        (contact) => {
            contact.unread = 0;
            this.updateUnreadMessage();
        }));
    }
    /**
     * @param {?} keyword
     * @param {?} callback
     * @return {?}
     */
    searchContacts(keyword, callback) {
        this.loadContacts((/**
         * @param {?} contacts
         * @return {?}
         */
        (contacts) => callback(this._filterUsers(keyword, contacts))));
    }
    /**
     * @private
     * @param {?} keyword
     * @param {?} contacts
     * @return {?}
     */
    _filterUsers(keyword, contacts) {
        if (!keyword) {
            return contacts;
        }
        return contacts.filter((/**
         * @param {?} item
         * @return {?}
         */
        (item) => item.isMatch(keyword)));
    }
    /**
     * @param {?} message
     * @return {?}
     */
    revertMessage(message) {
        /** @type {?} */
        let __index = message.indexOf("uri_message") || 0;
        return message.substring(__index);
    }
    /**
     * @param {?} message
     * @return {?}
     */
    revertMessageDisplay(message) {
        /** @type {?} */
        let __index = message.indexOf("uri_message") || 0;
        return message.substring(0, __index);
    }
    /**
     * @return {?}
     */
    reconnetSocket() {
        this.socketService.close();
    }
    /**
     * @param {?} message
     * @return {?}
     */
    checkJoinVideoCall(message) {
    }
}
ChatMessageService._instance = null;
ChatMessageService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
ChatMessageService.ctorParameters = () => [
    { type: HttpClientService },
    { type: WebSocketClientService }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC1jaGF0LyIsInNvdXJjZXMiOlsic3JjL21lc3NhZ2Uuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUMsaUJBQWlCLEVBQUUsc0JBQXNCLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFDcEUsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQ2xELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUN0RCxPQUFPLEVBQUMsVUFBVSxFQUFFLE9BQU8sRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUN6QyxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFNaEQsTUFBTSxPQUFPLGtCQUFrQjs7Ozs7SUFVM0IsWUFBb0IsV0FBOEIsRUFDL0IsYUFBcUM7UUFEcEMsZ0JBQVcsR0FBWCxXQUFXLENBQW1CO1FBQy9CLGtCQUFhLEdBQWIsYUFBYSxDQUF3QjtRQVJoRCxvQkFBZSxHQUFHLElBQUksT0FBTyxFQUFlLENBQUM7UUFDN0MsbUJBQWMsR0FBRyxJQUFJLE9BQU8sRUFBVSxDQUFDO1FBRS9DLGFBQVEsR0FBcUIsRUFBRSxDQUFDO1FBQ2hDLG9CQUFlLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN0RCx3QkFBbUIsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBSXJELElBQUksa0JBQWtCLENBQUMsU0FBUyxFQUFFO1lBQzlCLE9BQU8sa0JBQWtCLENBQUMsU0FBUyxDQUFDO1NBQ3ZDO1FBQ0Qsa0JBQWtCLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUNwQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLFNBQVM7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aEMsNkNBQXNEOztJQUN0RCxpREFBeUQ7Ozs7O0lBRTdDLHlDQUFzQzs7SUFDdEMsMkNBQTRDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7SHR0cENsaWVudFNlcnZpY2UsIFdlYlNvY2tldENsaWVudFNlcnZpY2V9IGZyb20gXCJpbmV0LWNvcmVcIjtcbmltcG9ydCB7QVBQX0NIQVR9IGZyb20gXCIuL21vZGVsL01lc3NhZ2VDb25zdGFudHNcIjtcbmltcG9ydCB7TWVzc2FnZUNvbnRhY3R9IGZyb20gXCIuL21vZGVsL01lc3NhZ2VDb250YWN0XCI7XG5pbXBvcnQge09ic2VydmFibGUsIFN1YmplY3R9IGZyb20gXCJyeGpzXCI7XG5pbXBvcnQge01lc3NhZ2VDaGF0fSBmcm9tIFwiLi9tb2RlbC9NZXNzYWdlQ2hhdFwiO1xuaW1wb3J0IHsgRW52ZWxvcEJvZHksIFdlYlNvY2tldEVudmVsb3AgfSBmcm9tICdpbmV0LWNvcmUvc3JjL3dlYnNvY2tldC93ZWJzb2NrZXQtYWJzdHJhY3QnO1xuXG5kZWNsYXJlIGxldCBpTmV0OiBhbnk7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDaGF0TWVzc2FnZVNlcnZpY2Uge1xuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogQ2hhdE1lc3NhZ2VTZXJ2aWNlID0gbnVsbDtcbiAgICBwcml2YXRlIF9zb2NrZXRPYnNlcnZlcjtcbiAgICBwcml2YXRlIF9tZXNzYWdlU3ViamVjdCA9IG5ldyBTdWJqZWN0PE1lc3NhZ2VDaGF0PigpO1xuICAgIHByaXZhdGUgX3VucmVhZFN1YmplY3QgPSBuZXcgU3ViamVjdDxudW1iZXI+KCk7XG5cbiAgICBjb250YWN0czogTWVzc2FnZUNvbnRhY3RbXSA9IFtdO1xuICAgIG1lc3NhZ2VSZWNlaXZlZCA9IHRoaXMuX21lc3NhZ2VTdWJqZWN0LmFzT2JzZXJ2YWJsZSgpO1xuICAgIHVucmVhZE1lc3NhZ2VDaGFuZ2UgPSB0aGlzLl91bnJlYWRTdWJqZWN0LmFzT2JzZXJ2YWJsZSgpO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwU2VydmljZTogSHR0cENsaWVudFNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHVibGljIHNvY2tldFNlcnZpY2U6IFdlYlNvY2tldENsaWVudFNlcnZpY2UpIHtcbiAgICAgICAgaWYgKENoYXRNZXNzYWdlU2VydmljZS5faW5zdGFuY2UpIHtcbiAgICAgICAgICAgIHJldHVybiBDaGF0TWVzc2FnZVNlcnZpY2UuX2luc3RhbmNlO1xuICAgICAgICB9XG4gICAgICAgIENoYXRNZXNzYWdlU2VydmljZS5faW5zdGFuY2UgPSB0aGlzO1xuICAgICAgICB0aGlzLl9zb2NrZXRPYnNlcnZlciA9IHRoaXMuc29ja2V0U2VydmljZS5vbk1lc3NhZ2Uuc3Vic2NyaWJlKChtZXNzYWdlOiBFbnZlbG9wQm9keSkgPT4ge1xuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuYXBwbGljYXRpb24gPT09IEFQUF9DSEFUKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVMYXN0TWVzc2FnZShtZXNzYWdlLnNlbmRlciwgbWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fbWVzc2FnZVN1YmplY3QubmV4dChuZXcgTWVzc2FnZUNoYXQobWVzc2FnZSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIGRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3NvY2tldE9ic2VydmVyLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIHRoaXMuX21lc3NhZ2VTdWJqZWN0LnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIHRoaXMuX3VucmVhZFN1YmplY3QudW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICBsb2FkRnJpZW5kcygpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlPE1lc3NhZ2VDb250YWN0W10+KChvYnNlcnZlcikgPT4ge1xuICAgICAgICAgICAgdGhpcy5odHRwU2VydmljZS5nZXRKU09OKGlOZXQuZ2V0UFVybCgndW5pZmllZHB1c2gvbGlzdCcpKS5zdWJzY3JpYmUoKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICBvYnNlcnZlci5uZXh0KChkYXRhIHx8IFtdKS5tYXAoKGl0ZW0pID0+IG5ldyBNZXNzYWdlQ29udGFjdChpdGVtKSkpO1xuICAgICAgICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbG9hZENvbnRhY3RzKGNhbGxiYWNrOiBGdW5jdGlvbikge1xuICAgICAgICBpZiAodGhpcy5jb250YWN0cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjYWxsYmFjayh0aGlzLmNvbnRhY3RzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubG9hZEZyaWVuZHMoKS5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgKGRhdGE6IE1lc3NhZ2VDb250YWN0W10pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250YWN0cyA9IGRhdGEuZmlsdGVyKChpdGVtKSA9PiBpdGVtLnVzZXJjb2RlICE9PSBpTmV0LnVzZXJjb2RlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVVbnJlYWRNZXNzYWdlKCk7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKHRoaXMuY29udGFjdHMpO1xuICAgICAgICAgICAgICAgIH0sICgpID0+IGNhbGxiYWNrKFtdKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZVVucmVhZE1lc3NhZ2UoKSB7XG4gICAgICAgIGxldCB1bnJlYWQgPSAwO1xuICAgICAgICB0aGlzLmNvbnRhY3RzLmZvckVhY2goKGZyaWVuZCkgPT4gdW5yZWFkICs9IGZyaWVuZC51bnJlYWQpO1xuICAgICAgICB0aGlzLl91bnJlYWRTdWJqZWN0Lm5leHQodW5yZWFkKTtcbiAgICB9XG5cbiAgICBnZXRDb250YWN0QnlVc2VyQ29kZSh1c2VyY29kZTogc3RyaW5nLCBjYWxsYmFjazogRnVuY3Rpb24pIHtcbiAgICAgICAgaWYgKHVzZXJjb2RlID09PSAnbmV3cy1mZWVkJyB8fCB1c2VyY29kZSA9PT0gaU5ldC51c2VyY29kZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubG9hZENvbnRhY3RzKChjb250YWN0cykgPT4ge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb250YWN0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChjb250YWN0c1tpXS51c2VyY29kZSA9PT0gdXNlcmNvZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGNvbnRhY3RzW2ldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBjb250YWN0IG5vdCBleGlzdFxuICAgICAgICAgICAgY29uc3QgY29udGFjdCA9IG5ldyBNZXNzYWdlQ29udGFjdCh7dXNlcmNvZGU6IHVzZXJjb2RlLCBmdWxsbmFtZTogdXNlcmNvZGUsIHVucmVhZDogMX0pO1xuICAgICAgICAgICAgdGhpcy5jb250YWN0cy51bnNoaWZ0KGNvbnRhY3QpO1xuICAgICAgICAgICAgY2FsbGJhY2soY29udGFjdCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGhhc0NvbnRhY3QodXNlcmNvZGU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY29udGFjdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbnRhY3RzW2ldLnVzZXJjb2RlID09PSB1c2VyY29kZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBzZW5kKHVzZXJuYW1lOiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zb2NrZXRTZXJ2aWNlLnNlbmQodXNlcm5hbWUsIG1lc3NhZ2UsIEFQUF9DSEFUKTtcbiAgICB9XG5cbiAgICBzZW5kRW52ZWxvcChlbnZlbG9wOiBXZWJTb2NrZXRFbnZlbG9wKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgICAgIHJldHVybiB0aGlzLnNvY2tldFNlcnZpY2Uuc2VuZEVudmVsb3AoZW52ZWxvcCk7XG4gICAgfVxuXG4gICAgYnVpbGRFbnZlbG9wKGFkZHJlc3M6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nLGpvaW4/OiBzdHJpbmcpOiBXZWJTb2NrZXRFbnZlbG9wIHtcbiAgICAgICAgaWYoam9pbil7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zb2NrZXRTZXJ2aWNlLmJ1aWxkRW52ZWxvcChhZGRyZXNzLCBtZXNzYWdlLCBBUFBfQ0hBVCwgam9pbik7XG5cbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zb2NrZXRTZXJ2aWNlLmJ1aWxkRW52ZWxvcChhZGRyZXNzLCBtZXNzYWdlLCBBUFBfQ0hBVCk7XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1c2hNZXNzYWdlKHBhcmFtcywgY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XG4gICAgICAgIGNvbnN0IGZvcm1EYXRhID0gdGhpcy5odHRwU2VydmljZS5jb252ZXJ0VG9Gb3JtRGF0YShwYXJhbXMpO1xuICAgICAgICB0aGlzLmh0dHBTZXJ2aWNlLnBvc3QoaU5ldC5nZXRQVXJsKCdtZXNzYWdlL3VwbG9hZCcpLCBmb3JtRGF0YSkuc3Vic2NyaWJlKFxuICAgICAgICAgICAgKGRhdGE6IEVudmVsb3BCb2R5KSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGVudmVsb3A6IFdlYlNvY2tldEVudmVsb3AgPSB0aGlzLnNvY2tldFNlcnZpY2UuYnVpbGRFbnZlbG9wKHBhcmFtcy5hbGlhcywgcGFyYW1zLmNvbnRlbnQsIEFQUF9DSEFUKTtcbiAgICAgICAgICAgICAgICBlbnZlbG9wLmJvZHkubWVzc2FnZSA9IGRhdGEubWVzc2FnZTtcbiAgICAgICAgICAgICAgICBlbnZlbG9wLmJvZHkubWVzc2FnZS5jb250ZW50ID0gZW52ZWxvcC5ib2R5Lm1lc3NhZ2UuYWxlcnQgPSBwYXJhbXMuY29udGVudDtcbiAgICAgICAgICAgICAgICBlbnZlbG9wLmJvZHkudXVpZCA9IGRhdGEudXVpZDtcbiAgICAgICAgICAgICAgICB0aGlzLnNvY2tldFNlcnZpY2Uuc2VuZEVudmVsb3AoZW52ZWxvcCk7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soZW52ZWxvcC5ib2R5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBsb2FkTWVzc2FnZXMocGFyYW1zLCBjYWxsYmFjazogRnVuY3Rpb24pIHtcbiAgICAgICAgdGhpcy5odHRwU2VydmljZS5wb3N0SlNPTihpTmV0LmdldFBVcmwoJ21lc3NhZ2UvcXVlcnknKSwgcGFyYW1zKS5zdWJzY3JpYmUoKGRhdGEpID0+IHtcbiAgICAgICAgICAgIGRhdGEgPSBkYXRhIHx8IHt9O1xuICAgICAgICAgICAgZGF0YS5pdGVtcyA9IGRhdGEuaXRlbXMgfHwgW107XG4gICAgICAgICAgICBkYXRhLnRvdGFsID0gZGF0YS50b3RhbCB8fCAwO1xuICAgICAgICAgICAgZGF0YS5pdGVtcy5zb3J0KChhLCBiKSA9PiBhLnNlbnQgLSBiLnNlbnQpO1xuICAgICAgICAgICAgZGF0YS5pdGVtcyA9IGRhdGEuaXRlbXMubWFwKChpdGVtKSA9PiBuZXcgTWVzc2FnZUNoYXQoaXRlbSkpO1xuICAgICAgICAgICAgdGhpcy5yZXNldFVucmVhZE1lc3NhZ2UocGFyYW1zWydzZW5kZXInXSk7XG4gICAgICAgICAgICBjYWxsYmFjayhkYXRhKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdXBkYXRlTGFzdE1lc3NhZ2UodXNlcmNvZGU6IHN0cmluZywgbWVzc2FnZTogRW52ZWxvcEJvZHkpIHtcbiAgICAgICAgLy8gVXBkYXRlIGxhc3QgbWVzc2FnZSwgbW92ZSBjb250YWN0IHRvIGZpcnN0XG4gICAgICAgIHRoaXMuZ2V0Q29udGFjdEJ5VXNlckNvZGUodXNlcmNvZGUsIChjb250YWN0OiBNZXNzYWdlQ29udGFjdCkgPT4ge1xuICAgICAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5jb250YWN0cy5pbmRleE9mKGNvbnRhY3QpO1xuICAgICAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRhY3RzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmNvbnRhY3RzLnVuc2hpZnQoY29udGFjdCk7XG4gICAgICAgICAgICAgICAgbGV0IHR5cGVNZXNzYWdlcyA9ICBtZXNzYWdlLm1lc3NhZ2UuYWxlcnQuc3BsaXQoXCI6XCIpO1xuICAgICAgICAgICAgaWYodHlwZU1lc3NhZ2VzLmxlbmd0aCA+Mil7XG4gICAgICAgICAgICAgICAgICAgIGlmKHR5cGVNZXNzYWdlc1swXT09PSd1cmlfbWVzc2FnZScgJiYgdHlwZU1lc3NhZ2VzWzFdPT09J3ZpZGVvX2NvbmZlcmVuY2UnKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhY3QubWVzc2FnZSA9ICc8aSBjbGFzcz1cImZhIGZhLXBob25lIHByLTFcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+IEN14buZYyBn4buNaSB0aG/huqFpJztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IF9fbWVzRGlzcGxheSA9ICB0aGlzLnJldmVydE1lc3NhZ2VEaXNwbGF5KG1lc3NhZ2UubWVzc2FnZS5hbGVydCkgfHwgJyc7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0eXBlTWVzc2FnZXNbMF09PT0ndXJpX21lc3NhZ2UnICYmIHR5cGVNZXNzYWdlc1sxXT09PSdsaW5rX3ByZXZpZXcnKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250YWN0Lm1lc3NhZ2UgPV9fbWVzRGlzcGxheTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGNvbnRhY3QubWVzc2FnZSA9IG1lc3NhZ2UubWVzc2FnZS5hbGVydDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gY29udGFjdC5tZXNzYWdlID0gbWVzc2FnZS5tZXNzYWdlLmFsZXJ0O1xuXG4gICAgICAgICAgICAvLyBOb3QgbWUgc2VuZFxuICAgICAgICAgICAgaWYgKG1lc3NhZ2Uuc2VuZGVyICE9PSBpTmV0LnVzZXJjb2RlKSB7XG4gICAgICAgICAgICAgICAgY29udGFjdC51bnJlYWQrKztcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVVucmVhZE1lc3NhZ2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGRlY29kZUJhc2U2NChzdHI6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KGVzY2FwZSh3aW5kb3cuYXRvYihzdHIpKSk7XG4gICAgfVxuXG4gICAgcmVzZXRVbnJlYWRNZXNzYWdlKHVzZXJuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5nZXRDb250YWN0QnlVc2VyQ29kZSh1c2VybmFtZSwgKGNvbnRhY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnRhY3QudW5yZWFkID0gMDtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVW5yZWFkTWVzc2FnZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzZWFyY2hDb250YWN0cyhrZXl3b3JkOiBzdHJpbmcsIGNhbGxiYWNrOiBGdW5jdGlvbikge1xuICAgICAgICB0aGlzLmxvYWRDb250YWN0cygoY29udGFjdHM6IE1lc3NhZ2VDb250YWN0W10pID0+IGNhbGxiYWNrKHRoaXMuX2ZpbHRlclVzZXJzKGtleXdvcmQsIGNvbnRhY3RzKSkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2ZpbHRlclVzZXJzKGtleXdvcmQ6IHN0cmluZywgY29udGFjdHM6IE1lc3NhZ2VDb250YWN0W10pIHtcbiAgICAgICAgaWYgKCFrZXl3b3JkKSB7XG4gICAgICAgICAgICByZXR1cm4gY29udGFjdHM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbnRhY3RzLmZpbHRlcigoaXRlbSkgPT4gaXRlbS5pc01hdGNoKGtleXdvcmQpKTtcbiAgICB9XG5cbiAgICByZXZlcnRNZXNzYWdlKG1lc3NhZ2U6IHN0cmluZyl7XG4gICAgICAgIGxldCBfX2luZGV4ID0gbWVzc2FnZS5pbmRleE9mKFwidXJpX21lc3NhZ2VcIikgfHwgMDtcbiAgICAgICByZXR1cm4gIG1lc3NhZ2Uuc3Vic3RyaW5nKF9faW5kZXgpO1xuICAgIH1cbiAgICByZXZlcnRNZXNzYWdlRGlzcGxheShtZXNzYWdlOiBzdHJpbmcpe1xuICAgICAgICBsZXQgX19pbmRleCA9IG1lc3NhZ2UuaW5kZXhPZihcInVyaV9tZXNzYWdlXCIpIHx8IDA7XG4gICAgICAgIHJldHVybiAgbWVzc2FnZS5zdWJzdHJpbmcoMCxfX2luZGV4KTtcbiAgICB9XG5cbiAgICByZWNvbm5ldFNvY2tldCgpe1xuICAgICAgICB0aGlzLnNvY2tldFNlcnZpY2UuY2xvc2UoKTtcbiAgICB9XG5cbiAgICBjaGVja0pvaW5WaWRlb0NhbGwobWVzc2FnZSl7XG4gICAgfVxufVxuIl19