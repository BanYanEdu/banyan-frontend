/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { HtmlUtils } from "inet-core";
import { DateFormatter } from "../DateFormatter";
var MessageChat = /** @class */ (function () {
    function MessageChat(message) {
        this.isSent = false;
        this.attachments = [];
        /** @type {?} */
        var formatter = new DateFormatter(message.sent || new Date());
        this.message = message;
        this.isSent = this.message.sender === iNet.username;
        this.attachments = MessageChat.parseAttachments(message);
        this.displayText = HtmlUtils.formatHtmlDisplay(message.message.alert || message.message.content);
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
export { MessageChat };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWVzc2FnZUNoYXQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbmV0LWNoYXQvIiwic291cmNlcyI6WyJzcmMvbW9kZWwvTWVzc2FnZUNoYXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQWMsTUFBTSxXQUFXLENBQUM7QUFDakQsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBSy9DO0lBV0kscUJBQVksT0FBb0I7UUFUaEMsV0FBTSxHQUFZLEtBQUssQ0FBQztRQUN4QixnQkFBVyxHQUFVLEVBQUUsQ0FBQzs7WUFTZCxTQUFTLEdBQUcsSUFBSSxhQUFhLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxJQUFJLElBQUksRUFBRSxDQUFDO1FBQy9ELElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUNwRCxJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2pHLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQzNDLElBQUksQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQztJQUMvQixDQUFDOzs7OztJQUVNLDRCQUFnQjs7OztJQUF2QixVQUF3QixJQUFpQjs7O1lBRWpDLFdBQVcsR0FBRyxFQUFFO1FBQ3BCLEtBQUssSUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUMxQixJQUFJLENBQUMsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEVBQUU7O29CQUNyQixJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7O29CQUN0QixhQUFhLEdBQUcsc0JBQXNCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzs7b0JBQ2pELFdBQVcsR0FBRyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDOztvQkFDL0MsR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUM7cUJBQzdFLFdBQVMsSUFBSSxDQUFDLElBQUksa0JBQWEsQ0FBRyxDQUFBO2dCQUN0QyxXQUFXLENBQUMsSUFBSSxDQUFDO29CQUNiLEdBQUcsRUFBRSxHQUFHO29CQUNSLEVBQUUsRUFBRSxDQUFDO29CQUNMLElBQUksRUFBRSxJQUFJO29CQUNWLEtBQUssRUFBRSxXQUFXO29CQUNsQixhQUFhLEVBQUUsYUFBYTtpQkFDL0IsQ0FBQyxDQUFDO2FBQ047U0FDSjtRQUNELE9BQU8sV0FBVyxDQUFDO0lBQ3ZCLENBQUM7SUFDTCxrQkFBQztBQUFELENBQUMsQUEzQ0QsSUEyQ0M7Ozs7SUExQ0csOEJBQXFCOztJQUNyQiw2QkFBd0I7O0lBQ3hCLGtDQUF3Qjs7SUFFeEIsa0NBQW9COztJQUNwQixnQ0FBa0I7O0lBQ2xCLCtCQUFpQjs7SUFDakIsMkJBQVc7O0lBQ1gsaUNBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtIdG1sVXRpbHMsIEVudmVsb3BCb2R5fSBmcm9tIFwiaW5ldC1jb3JlXCI7XG5pbXBvcnQge0RhdGVGb3JtYXR0ZXJ9IGZyb20gXCIuLi9EYXRlRm9ybWF0dGVyXCI7XG5pbXBvcnQge09wZW5HcmFwaERhdGF9IGZyb20gXCIuLi9vcGVuLWdyYXBoXCI7XG5cbmRlY2xhcmUgbGV0IGlOZXQ6IGFueTtcblxuZXhwb3J0IGNsYXNzIE1lc3NhZ2VDaGF0IHtcbiAgICBtZXNzYWdlOiBFbnZlbG9wQm9keTtcbiAgICBpc1NlbnQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBhdHRhY2htZW50czogYW55W10gPSBbXTtcblxuICAgIGRpc3BsYXlUZXh0OiBzdHJpbmc7XG4gICAgc2hvcnRUaW1lOiBzdHJpbmc7XG4gICAgbG9uZ1RpbWU6IHN0cmluZztcbiAgICBkYXRlOiBEYXRlO1xuICAgIF9vcGVuR3JhcGg/OiBPcGVuR3JhcGhEYXRhO1xuXG4gICAgY29uc3RydWN0b3IobWVzc2FnZTogRW52ZWxvcEJvZHkpIHtcbiAgICAgICAgY29uc3QgZm9ybWF0dGVyID0gbmV3IERhdGVGb3JtYXR0ZXIobWVzc2FnZS5zZW50IHx8IG5ldyBEYXRlKCkpO1xuICAgICAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgICAgICB0aGlzLmlzU2VudCA9IHRoaXMubWVzc2FnZS5zZW5kZXIgPT09IGlOZXQudXNlcm5hbWU7XG4gICAgICAgIHRoaXMuYXR0YWNobWVudHMgPSBNZXNzYWdlQ2hhdC5wYXJzZUF0dGFjaG1lbnRzKG1lc3NhZ2UpO1xuICAgICAgICB0aGlzLmRpc3BsYXlUZXh0ID0gSHRtbFV0aWxzLmZvcm1hdEh0bWxEaXNwbGF5KG1lc3NhZ2UubWVzc2FnZS5hbGVydCB8fCBtZXNzYWdlLm1lc3NhZ2UuY29udGVudCk7XG4gICAgICAgIHRoaXMuc2hvcnRUaW1lID0gZm9ybWF0dGVyLmZvcm1hdFRpbWUoKTtcbiAgICAgICAgdGhpcy5sb25nVGltZSA9IGZvcm1hdHRlci5mb3JtYXRGdWxsWWVhcigpO1xuICAgICAgICB0aGlzLmRhdGUgPSBmb3JtYXR0ZXIuZGF0ZTtcbiAgICB9XG5cbiAgICBzdGF0aWMgcGFyc2VBdHRhY2htZW50cyhkYXRhOiBFbnZlbG9wQm9keSkge1xuICAgICAgICAvLyB1dWlkOi8vNWQwMjFjYjM5Mjc4YzJjMzY2NjA4MWEwXG4gICAgICAgIHZhciBhdHRhY2htZW50cyA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IGsgaW4gZGF0YS5tZXNzYWdlKSB7XG4gICAgICAgICAgICBpZiAoay5zdGFydHNXaXRoKCd1dWlkOi8vJykpIHtcbiAgICAgICAgICAgICAgICB2YXIgbmFtZSA9IGRhdGEubWVzc2FnZVtrXTtcbiAgICAgICAgICAgICAgICB2YXIgY2FuVmlld0lubGluZSA9IC8ocG5nfGpwZ3xqcGVnfHBkZikkL2kudGVzdChuYW1lKTtcbiAgICAgICAgICAgICAgICB2YXIgZmlsZUlzSW1hZ2UgPSAvKHBuZ3xqcGd8anBlZ3xnaWYpJC9pLnRlc3QobmFtZSk7XG4gICAgICAgICAgICAgICAgdmFyIHVybCA9IGlOZXQuZ2V0UFVybChjYW5WaWV3SW5saW5lID8gJ21lc3NhZ2UvYmluYXJ5aW5saW5lJyA6ICdtZXNzYWdlL2JpbmFyeScpICtcbiAgICAgICAgICAgICAgICAgICAgYD91dWlkPSR7ZGF0YS51dWlkfSZ1cGxvYWRJRD0ke2t9YDtcbiAgICAgICAgICAgICAgICBhdHRhY2htZW50cy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgICAgICAgICAgICAgIGlkOiBrLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICAgICAgICAgICAgICBpbWFnZTogZmlsZUlzSW1hZ2UsXG4gICAgICAgICAgICAgICAgICAgIGNhblZpZXdJbmxpbmU6IGNhblZpZXdJbmxpbmVcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXR0YWNobWVudHM7XG4gICAgfVxufVxuIl19