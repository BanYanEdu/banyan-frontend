/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ChatMessageService } from "../../message.service";
import { MessageChatComponent } from '../message-chat/message-chat.component';
var MessagePanelComponent = /** @class */ (function () {
    function MessagePanelComponent(messageService) {
        var _this = this;
        this.messageService = messageService;
        this.audioCall = true;
        this.videoCall = true;
        this.closable = false; // Support close button on small screen
        // Support close button on small screen
        this.unreadMessageChange = new EventEmitter();
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
        { type: Component, args: [{
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
        audioCall: [{ type: Input }],
        videoCall: [{ type: Input }],
        closable: [{ type: Input }],
        unreadMessageChange: [{ type: Output }],
        messageChatComponent: [{ type: ViewChild, args: [MessageChatComponent,] }]
    };
    return MessagePanelComponent;
}());
export { MessagePanelComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS1wYW5lbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbmV0LWNoYXQvIiwic291cmNlcyI6WyJzcmMvY29tcG9uZW50L21lc3NhZ2UtcGFuZWwvbWVzc2FnZS1wYW5lbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBYSxNQUFNLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRTNGLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBRzlFO0lBb0JFLCtCQUFvQixjQUFrQztRQUF0RCxpQkFJQztRQUptQixtQkFBYyxHQUFkLGNBQWMsQ0FBb0I7UUFkN0MsY0FBUyxHQUFZLElBQUksQ0FBQztRQUMxQixjQUFTLEdBQVksSUFBSSxDQUFDO1FBQzFCLGFBQVEsR0FBWSxLQUFLLENBQUMsQ0FBQyx1Q0FBdUM7O1FBQ2pFLHdCQUFtQixHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFJM0QsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUMxQixnQkFBVyxHQUFZLEtBQUssQ0FBQztRQU8zQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxTQUFTOzs7UUFBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLFlBQVksRUFBRSxFQUFuQixDQUFtQixFQUFDLENBQUM7UUFDdkcsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLG1CQUFtQixDQUFDLFNBQVM7Ozs7UUFBQyxVQUFDLEtBQUssSUFBSyxPQUFBLEtBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQXBDLENBQW9DLEVBQUMsQ0FBQztRQUN0SCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDdEIsQ0FBQzs7Ozs7SUFFTyw0Q0FBWTs7OztJQUFwQjtRQUNFLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDO1FBQy9ELElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFFO1lBQy9DLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO1NBQ3hCO2FBQU0sSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUU7WUFDbkQsSUFBSSxDQUFDLFlBQVksR0FBRywwQkFBMEIsQ0FBQztTQUNoRDthQUFNO1lBQ0wsSUFBSSxDQUFDLFlBQVksR0FBRyxpQkFBaUIsQ0FBQztTQUN2QztJQUNILENBQUM7Ozs7SUFFRCwyQ0FBVzs7O0lBQVg7UUFDRSxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzlCLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDakMsQ0FBQzs7Ozs7SUFFRCw2Q0FBYTs7OztJQUFiLFVBQWMsT0FBdUI7SUFFckMsQ0FBQzs7Ozs7SUFFRCw2Q0FBYTs7OztJQUFiLFVBQWMsT0FBdUI7SUFFckMsQ0FBQzs7Ozs7O0lBRUQsNENBQVk7Ozs7O0lBQVosVUFBYSxPQUF1QixFQUFFLElBQWM7UUFBcEQsaUJBY0M7UUFiQyxJQUFJLENBQUMsUUFBUSxHQUFFLElBQUksQ0FBQztRQUNwQixJQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssT0FBTyxFQUFFO1lBQzVCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1lBQ3ZCLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsWUFBWTtTQUNqQztRQUNELGlCQUFpQjtRQUNqQixVQUFVOzs7UUFBQztZQUNULEtBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBQ3JCLElBQUcsSUFBSSxFQUFDO2dCQUNOLEtBQUksQ0FBQyxvQkFBb0IsQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLEdBQUUsS0FBSyxDQUFDO2dCQUMzRCxLQUFJLENBQUMsb0JBQW9CLENBQUMsUUFBUSxDQUFDLElBQUksRUFBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDM0Q7UUFDSCxDQUFDLEdBQUUsR0FBRyxDQUFDLENBQUM7SUFDVixDQUFDOzs7O0lBRUQseUNBQVM7OztJQUFUO1FBQ0UsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7SUFDeEIsQ0FBQzs7Ozs7SUFFRCx3Q0FBUTs7OztJQUFSLFVBQVMsUUFBZ0I7UUFDdkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDcEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7SUFDM0IsQ0FBQzs7Ozs7SUFDRCxxREFBcUI7Ozs7SUFBckIsVUFBc0IsT0FBTztRQUMzQixJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNuQyxDQUFDOztnQkE1RUYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxlQUFlO29CQUN6QixtcUNBQTZDOztpQkFFOUM7Ozs7Z0JBUk8sa0JBQWtCOzs7NEJBVXZCLEtBQUs7NEJBQ0wsS0FBSzsyQkFDTCxLQUFLO3NDQUNMLE1BQU07dUNBQ04sU0FBUyxTQUFDLG9CQUFvQjs7SUFtRWpDLDRCQUFDO0NBQUEsQUE3RUQsSUE2RUM7U0F4RVkscUJBQXFCOzs7SUFDaEMsMENBQW1DOztJQUNuQywwQ0FBbUM7O0lBQ25DLHlDQUFtQzs7SUFDbkMsb0RBQTJEOztJQUMzRCxxREFBMkU7O0lBRTNFLHdDQUF3Qjs7SUFDeEIseUNBQTBCOztJQUMxQiw0Q0FBNkI7O0lBQzdCLDZDQUFxQjs7SUFDckIseUNBQWlCOzs7OztJQUNqQiwyQ0FBaUM7Ozs7O0lBQ2pDLDRDQUFrQzs7Ozs7SUFFdEIsK0NBQTBDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uRGVzdHJveSwgT3V0cHV0LCBWaWV3Q2hpbGR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNZXNzYWdlQ29udGFjdH0gZnJvbSBcIi4uLy4uL21vZGVsL01lc3NhZ2VDb250YWN0XCI7XG5pbXBvcnQge0NoYXRNZXNzYWdlU2VydmljZX0gZnJvbSBcIi4uLy4uL21lc3NhZ2Uuc2VydmljZVwiO1xuaW1wb3J0IHsgTWVzc2FnZUNoYXRDb21wb25lbnQgfSBmcm9tICcuLi9tZXNzYWdlLWNoYXQvbWVzc2FnZS1jaGF0LmNvbXBvbmVudCc7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWVzc2FnZS1wYW5lbCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9tZXNzYWdlLXBhbmVsLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbWVzc2FnZS1wYW5lbC5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgTWVzc2FnZVBhbmVsQ29tcG9uZW50IGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgQElucHV0KCkgYXVkaW9DYWxsOiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCkgdmlkZW9DYWxsOiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCkgY2xvc2FibGU6IGJvb2xlYW4gPSBmYWxzZTsgLy8gU3VwcG9ydCBjbG9zZSBidXR0b24gb24gc21hbGwgc2NyZWVuXG4gIEBPdXRwdXQoKSB1bnJlYWRNZXNzYWdlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG4gIEBWaWV3Q2hpbGQoTWVzc2FnZUNoYXRDb21wb25lbnQpIG1lc3NhZ2VDaGF0Q29tcG9uZW50Ok1lc3NhZ2VDaGF0Q29tcG9uZW50O1xuXG4gIGNvbnRhY3Q6IE1lc3NhZ2VDb250YWN0O1xuICBjaGF0T3BlbjogYm9vbGVhbiA9IGZhbHNlO1xuICByZWFkeVRvQ2hhdDogYm9vbGVhbiA9IGZhbHNlO1xuICBzdGF0ZU1lc3NhZ2U6IHN0cmluZztcbiAgcm9vbU5hbWU6IHN0cmluZztcbiAgcHJpdmF0ZSByZWFkb25seSBfc29ja2V0U3ViOiBhbnk7XG4gIHByaXZhdGUgcmVhZG9ubHkgX21lc3NhZ2VTdWI6IGFueTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG1lc3NhZ2VTZXJ2aWNlOiBDaGF0TWVzc2FnZVNlcnZpY2UpIHtcbiAgICB0aGlzLl9zb2NrZXRTdWIgPSB0aGlzLm1lc3NhZ2VTZXJ2aWNlLnNvY2tldFNlcnZpY2Uub25TdGF0ZUNoYW5nZS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5fc3RhdGVDaGFuZ2UoKSk7XG4gICAgdGhpcy5fbWVzc2FnZVN1YiA9IHRoaXMubWVzc2FnZVNlcnZpY2UudW5yZWFkTWVzc2FnZUNoYW5nZS5zdWJzY3JpYmUoKGNvdW50KSA9PiB0aGlzLnVucmVhZE1lc3NhZ2VDaGFuZ2UuZW1pdChjb3VudCkpO1xuICAgIHRoaXMuX3N0YXRlQ2hhbmdlKCk7XG4gIH1cblxuICBwcml2YXRlIF9zdGF0ZUNoYW5nZSgpIHtcbiAgICB0aGlzLnJlYWR5VG9DaGF0ID0gdGhpcy5tZXNzYWdlU2VydmljZS5zb2NrZXRTZXJ2aWNlLmNvbm5lY3RlZDtcbiAgICBpZiAodGhpcy5tZXNzYWdlU2VydmljZS5zb2NrZXRTZXJ2aWNlLmNvbm5lY3RlZCkge1xuICAgICAgdGhpcy5zdGF0ZU1lc3NhZ2UgPSAnJztcbiAgICB9IGVsc2UgaWYgKHRoaXMubWVzc2FnZVNlcnZpY2Uuc29ja2V0U2VydmljZS5jbG9zZWQpIHtcbiAgICAgIHRoaXMuc3RhdGVNZXNzYWdlID0gJ0vhur90IG7hu5FpIGtow7RuZyB0aMOgbmggY8O0bmcnO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0YXRlTWVzc2FnZSA9ICfEkGFuZyBr4bq/dCBu4buRaS4uLic7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fc29ja2V0U3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fbWVzc2FnZVN1Yi51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgb3BlblZpZGVvQ2FsbChjb250YWN0OiBNZXNzYWdlQ29udGFjdCkge1xuXG4gIH1cblxuICBvcGVuQXVkaW9DYWxsKGNvbnRhY3Q6IE1lc3NhZ2VDb250YWN0KSB7XG5cbiAgfVxuXG4gIG9wZW5DaGF0V2l0aChjb250YWN0OiBNZXNzYWdlQ29udGFjdCwgY2FsbD86IGJvb2xlYW4pIHtcbiAgICB0aGlzLnJvb21OYW1lPSBudWxsO1xuICAgIGlmICh0aGlzLmNvbnRhY3QgIT09IGNvbnRhY3QpIHtcbiAgICAgIHRoaXMuY29udGFjdCA9IGNvbnRhY3Q7XG4gICAgICBjb250YWN0LnVucmVhZCA9IDA7IC8vIG1hcmsgcmVhZFxuICAgIH1cbiAgICAvLyBEZWxheSBmb3IgY2hhdFxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5jaGF0T3BlbiA9IHRydWU7XG4gICAgICBpZihjYWxsKXtcbiAgICAgICAgdGhpcy5tZXNzYWdlQ2hhdENvbXBvbmVudC5tZXNzYWdlSm9pbkNhbGxbJ2pvaW5lZCddPSBmYWxzZTtcbiAgICAgICAgdGhpcy5tZXNzYWdlQ2hhdENvbXBvbmVudC5qb2luUm9vbSh0cnVlLGNvbnRhY3QudXNlcmNvZGUpO1xuICAgICAgfVxuICAgIH0sIDEwMCk7XG4gIH1cblxuICBjbG9zZUNoYXQoKSB7XG4gICAgdGhpcy5jaGF0T3BlbiA9IGZhbHNlO1xuICB9XG5cbiAgb3BlblJvb20ocm9vbU5hbWU6IHN0cmluZykge1xuICAgIHRoaXMuY29udGFjdCA9IG51bGw7XG4gICAgdGhpcy5yb29tTmFtZSA9IHJvb21OYW1lO1xuICB9XG4gIGNhbGxUb0NvbnRhY3RTZWxlY3RlZChjb250YWN0KXtcbiAgICB0aGlzLm9wZW5DaGF0V2l0aChjb250YWN0LCB0cnVlKTtcbiAgfVxufVxuIl19