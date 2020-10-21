/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ChatMessageService } from "../../message.service";
import { MessageChatComponent } from '../message-chat/message-chat.component';
export class MessagePanelComponent {
    /**
     * @param {?} messageService
     */
    constructor(messageService) {
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
        () => this._stateChange()));
        this._messageSub = this.messageService.unreadMessageChange.subscribe((/**
         * @param {?} count
         * @return {?}
         */
        (count) => this.unreadMessageChange.emit(count)));
        this._stateChange();
    }
    /**
     * @private
     * @return {?}
     */
    _stateChange() {
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
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._socketSub.unsubscribe();
        this._messageSub.unsubscribe();
    }
    /**
     * @param {?} contact
     * @return {?}
     */
    openVideoCall(contact) {
    }
    /**
     * @param {?} contact
     * @return {?}
     */
    openAudioCall(contact) {
    }
    /**
     * @param {?} contact
     * @param {?=} call
     * @return {?}
     */
    openChatWith(contact, call) {
        this.roomName = null;
        if (this.contact !== contact) {
            this.contact = contact;
            contact.unread = 0; // mark read
        }
        // Delay for chat
        setTimeout((/**
         * @return {?}
         */
        () => {
            this.chatOpen = true;
            if (call) {
                this.messageChatComponent.messageJoinCall['joined'] = false;
                this.messageChatComponent.joinRoom(true, contact.usercode);
            }
        }), 100);
    }
    /**
     * @return {?}
     */
    closeChat() {
        this.chatOpen = false;
    }
    /**
     * @param {?} roomName
     * @return {?}
     */
    openRoom(roomName) {
        this.contact = null;
        this.roomName = roomName;
    }
    /**
     * @param {?} contact
     * @return {?}
     */
    callToContactSelected(contact) {
        this.openChatWith(contact, true);
    }
}
MessagePanelComponent.decorators = [
    { type: Component, args: [{
                selector: 'message-panel',
                template: "<div *ngIf=\"!readyToChat\" class=\"message-panel__status\">{{stateMessage}}</div>\n<div class=\"message-panel__container\">\n  <message-contact-list class=\"message-panel__side\" (contactSelected)=\"openChatWith($event)\" (roomSelected)=\"openRoom($event)\" (callTo)=\"callToContactSelected($event)\"></message-contact-list>\n  <div class=\"message-panel__body\" [ngClass]=\"{'open': chatOpen}\">\n    <div *ngIf=\"!contact && !roomName\" class=\"message-panel__welcome text-primary\">\n      <div style=\"font-size: 151px;\"><i class=\"fa fa-comments\" aria-hidden=\"true\"></i>\n      </div>\n      <div>Ch\u00E0o m\u1EEBng \u0111\u1EBFn v\u1EDBi <b>Calista!</b></div>\n    </div>\n    <message-chat *ngIf=\"contact\"\n                  [username]=\"contact.usercode\"\n                  [audioCall]=\"audioCall\"\n                  [videoCall]=\"videoCall\"\n                  [closable]=\"closable\"\n                  (onAudioCall)=\"openAudioCall($event)\"\n                  (onVideoCall)=\"openVideoCall($event)\"\n                  (onClose)=\"closeChat()\"></message-chat>\n    <room-chat *ngIf=\"roomName\" [roomName]=\"roomName\"></room-chat>\n  </div>\n</div>\n",
                styles: [":host{display:flex;flex-direction:column;width:100%;height:100%;overflow:hidden;position:relative}.message-panel__status{text-align:center;width:100%;background:rgba(0,0,0,.8);color:#fff;font-size:16px;line-height:50px}.message-panel__container{width:100%;height:100%;position:relative;flex-grow:1}.message-panel__side{float:left;width:300px;background:#f1f1f4;border-right:1px solid #dedede}.message-panel__body{overflow:hidden;height:100%;position:relative;background:#fff;border-left:0}.message-panel__welcome{text-align:center;font-size:30px;position:absolute;padding:0 20px;width:100%;top:30%;margin-top:-20px}@media (max-width:768px){.message-panel__side{width:100%}.message-panel__body{position:absolute;right:0;bottom:0;left:0;width:100%;height:400px;border-left:1px;display:none}.message-panel__body.open{display:block}}"]
            }] }
];
/** @nocollapse */
MessagePanelComponent.ctorParameters = () => [
    { type: ChatMessageService }
];
MessagePanelComponent.propDecorators = {
    audioCall: [{ type: Input }],
    videoCall: [{ type: Input }],
    closable: [{ type: Input }],
    unreadMessageChange: [{ type: Output }],
    messageChatComponent: [{ type: ViewChild, args: [MessageChatComponent,] }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS1wYW5lbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbmV0LWNoYXQvIiwic291cmNlcyI6WyJzcmMvY29tcG9uZW50L21lc3NhZ2UtcGFuZWwvbWVzc2FnZS1wYW5lbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBYSxNQUFNLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRTNGLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBUTlFLE1BQU0sT0FBTyxxQkFBcUI7Ozs7SUFlaEMsWUFBb0IsY0FBa0M7UUFBbEMsbUJBQWMsR0FBZCxjQUFjLENBQW9CO1FBZDdDLGNBQVMsR0FBWSxJQUFJLENBQUM7UUFDMUIsY0FBUyxHQUFZLElBQUksQ0FBQztRQUMxQixhQUFRLEdBQVksS0FBSyxDQUFDLENBQUMsdUNBQXVDOztRQUNqRSx3QkFBbUIsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO1FBSTNELGFBQVEsR0FBWSxLQUFLLENBQUM7UUFDMUIsZ0JBQVcsR0FBWSxLQUFLLENBQUM7UUFPM0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsU0FBUzs7O1FBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxFQUFDLENBQUM7UUFDdkcsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLG1CQUFtQixDQUFDLFNBQVM7Ozs7UUFBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBQyxDQUFDO1FBQ3RILElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN0QixDQUFDOzs7OztJQUVPLFlBQVk7UUFDbEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUM7UUFDL0QsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUU7WUFDL0MsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7U0FDeEI7YUFBTSxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRTtZQUNuRCxJQUFJLENBQUMsWUFBWSxHQUFHLDBCQUEwQixDQUFDO1NBQ2hEO2FBQU07WUFDTCxJQUFJLENBQUMsWUFBWSxHQUFHLGlCQUFpQixDQUFDO1NBQ3ZDO0lBQ0gsQ0FBQzs7OztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzlCLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDakMsQ0FBQzs7Ozs7SUFFRCxhQUFhLENBQUMsT0FBdUI7SUFFckMsQ0FBQzs7Ozs7SUFFRCxhQUFhLENBQUMsT0FBdUI7SUFFckMsQ0FBQzs7Ozs7O0lBRUQsWUFBWSxDQUFDLE9BQXVCLEVBQUUsSUFBYztRQUNsRCxJQUFJLENBQUMsUUFBUSxHQUFFLElBQUksQ0FBQztRQUNwQixJQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssT0FBTyxFQUFFO1lBQzVCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1lBQ3ZCLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsWUFBWTtTQUNqQztRQUNELGlCQUFpQjtRQUNqQixVQUFVOzs7UUFBQyxHQUFHLEVBQUU7WUFDZCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztZQUNyQixJQUFHLElBQUksRUFBQztnQkFDTixJQUFJLENBQUMsb0JBQW9CLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxHQUFFLEtBQUssQ0FBQztnQkFDM0QsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQzNEO1FBQ0gsQ0FBQyxHQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ1YsQ0FBQzs7OztJQUVELFNBQVM7UUFDUCxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztJQUN4QixDQUFDOzs7OztJQUVELFFBQVEsQ0FBQyxRQUFnQjtRQUN2QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNwQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUMzQixDQUFDOzs7OztJQUNELHFCQUFxQixDQUFDLE9BQU87UUFDM0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbkMsQ0FBQzs7O1lBNUVGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsZUFBZTtnQkFDekIsbXFDQUE2Qzs7YUFFOUM7Ozs7WUFSTyxrQkFBa0I7Ozt3QkFVdkIsS0FBSzt3QkFDTCxLQUFLO3VCQUNMLEtBQUs7a0NBQ0wsTUFBTTttQ0FDTixTQUFTLFNBQUMsb0JBQW9COzs7O0lBSi9CLDBDQUFtQzs7SUFDbkMsMENBQW1DOztJQUNuQyx5Q0FBbUM7O0lBQ25DLG9EQUEyRDs7SUFDM0QscURBQTJFOztJQUUzRSx3Q0FBd0I7O0lBQ3hCLHlDQUEwQjs7SUFDMUIsNENBQTZCOztJQUM3Qiw2Q0FBcUI7O0lBQ3JCLHlDQUFpQjs7Ozs7SUFDakIsMkNBQWlDOzs7OztJQUNqQyw0Q0FBa0M7Ozs7O0lBRXRCLCtDQUEwQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkRlc3Ryb3ksIE91dHB1dCwgVmlld0NoaWxkfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TWVzc2FnZUNvbnRhY3R9IGZyb20gXCIuLi8uLi9tb2RlbC9NZXNzYWdlQ29udGFjdFwiO1xuaW1wb3J0IHtDaGF0TWVzc2FnZVNlcnZpY2V9IGZyb20gXCIuLi8uLi9tZXNzYWdlLnNlcnZpY2VcIjtcbmltcG9ydCB7IE1lc3NhZ2VDaGF0Q29tcG9uZW50IH0gZnJvbSAnLi4vbWVzc2FnZS1jaGF0L21lc3NhZ2UtY2hhdC5jb21wb25lbnQnO1xuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21lc3NhZ2UtcGFuZWwnLFxuICB0ZW1wbGF0ZVVybDogJy4vbWVzc2FnZS1wYW5lbC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL21lc3NhZ2UtcGFuZWwuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIE1lc3NhZ2VQYW5lbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpIGF1ZGlvQ2FsbDogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgpIHZpZGVvQ2FsbDogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgpIGNsb3NhYmxlOiBib29sZWFuID0gZmFsc2U7IC8vIFN1cHBvcnQgY2xvc2UgYnV0dG9uIG9uIHNtYWxsIHNjcmVlblxuICBAT3V0cHV0KCkgdW5yZWFkTWVzc2FnZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuICBAVmlld0NoaWxkKE1lc3NhZ2VDaGF0Q29tcG9uZW50KSBtZXNzYWdlQ2hhdENvbXBvbmVudDpNZXNzYWdlQ2hhdENvbXBvbmVudDtcblxuICBjb250YWN0OiBNZXNzYWdlQ29udGFjdDtcbiAgY2hhdE9wZW46IGJvb2xlYW4gPSBmYWxzZTtcbiAgcmVhZHlUb0NoYXQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgc3RhdGVNZXNzYWdlOiBzdHJpbmc7XG4gIHJvb21OYW1lOiBzdHJpbmc7XG4gIHByaXZhdGUgcmVhZG9ubHkgX3NvY2tldFN1YjogYW55O1xuICBwcml2YXRlIHJlYWRvbmx5IF9tZXNzYWdlU3ViOiBhbnk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBtZXNzYWdlU2VydmljZTogQ2hhdE1lc3NhZ2VTZXJ2aWNlKSB7XG4gICAgdGhpcy5fc29ja2V0U3ViID0gdGhpcy5tZXNzYWdlU2VydmljZS5zb2NrZXRTZXJ2aWNlLm9uU3RhdGVDaGFuZ2Uuc3Vic2NyaWJlKCgpID0+IHRoaXMuX3N0YXRlQ2hhbmdlKCkpO1xuICAgIHRoaXMuX21lc3NhZ2VTdWIgPSB0aGlzLm1lc3NhZ2VTZXJ2aWNlLnVucmVhZE1lc3NhZ2VDaGFuZ2Uuc3Vic2NyaWJlKChjb3VudCkgPT4gdGhpcy51bnJlYWRNZXNzYWdlQ2hhbmdlLmVtaXQoY291bnQpKTtcbiAgICB0aGlzLl9zdGF0ZUNoYW5nZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfc3RhdGVDaGFuZ2UoKSB7XG4gICAgdGhpcy5yZWFkeVRvQ2hhdCA9IHRoaXMubWVzc2FnZVNlcnZpY2Uuc29ja2V0U2VydmljZS5jb25uZWN0ZWQ7XG4gICAgaWYgKHRoaXMubWVzc2FnZVNlcnZpY2Uuc29ja2V0U2VydmljZS5jb25uZWN0ZWQpIHtcbiAgICAgIHRoaXMuc3RhdGVNZXNzYWdlID0gJyc7XG4gICAgfSBlbHNlIGlmICh0aGlzLm1lc3NhZ2VTZXJ2aWNlLnNvY2tldFNlcnZpY2UuY2xvc2VkKSB7XG4gICAgICB0aGlzLnN0YXRlTWVzc2FnZSA9ICdL4bq/dCBu4buRaSBraMO0bmcgdGjDoG5oIGPDtG5nJztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zdGF0ZU1lc3NhZ2UgPSAnxJBhbmcga+G6v3QgbuG7kWkuLi4nO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX3NvY2tldFN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX21lc3NhZ2VTdWIudW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIG9wZW5WaWRlb0NhbGwoY29udGFjdDogTWVzc2FnZUNvbnRhY3QpIHtcblxuICB9XG5cbiAgb3BlbkF1ZGlvQ2FsbChjb250YWN0OiBNZXNzYWdlQ29udGFjdCkge1xuXG4gIH1cblxuICBvcGVuQ2hhdFdpdGgoY29udGFjdDogTWVzc2FnZUNvbnRhY3QsIGNhbGw/OiBib29sZWFuKSB7XG4gICAgdGhpcy5yb29tTmFtZT0gbnVsbDtcbiAgICBpZiAodGhpcy5jb250YWN0ICE9PSBjb250YWN0KSB7XG4gICAgICB0aGlzLmNvbnRhY3QgPSBjb250YWN0O1xuICAgICAgY29udGFjdC51bnJlYWQgPSAwOyAvLyBtYXJrIHJlYWRcbiAgICB9XG4gICAgLy8gRGVsYXkgZm9yIGNoYXRcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuY2hhdE9wZW4gPSB0cnVlO1xuICAgICAgaWYoY2FsbCl7XG4gICAgICAgIHRoaXMubWVzc2FnZUNoYXRDb21wb25lbnQubWVzc2FnZUpvaW5DYWxsWydqb2luZWQnXT0gZmFsc2U7XG4gICAgICAgIHRoaXMubWVzc2FnZUNoYXRDb21wb25lbnQuam9pblJvb20odHJ1ZSxjb250YWN0LnVzZXJjb2RlKTtcbiAgICAgIH1cbiAgICB9LCAxMDApO1xuICB9XG5cbiAgY2xvc2VDaGF0KCkge1xuICAgIHRoaXMuY2hhdE9wZW4gPSBmYWxzZTtcbiAgfVxuXG4gIG9wZW5Sb29tKHJvb21OYW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzLmNvbnRhY3QgPSBudWxsO1xuICAgIHRoaXMucm9vbU5hbWUgPSByb29tTmFtZTtcbiAgfVxuICBjYWxsVG9Db250YWN0U2VsZWN0ZWQoY29udGFjdCl7XG4gICAgdGhpcy5vcGVuQ2hhdFdpdGgoY29udGFjdCwgdHJ1ZSk7XG4gIH1cbn1cbiJdfQ==