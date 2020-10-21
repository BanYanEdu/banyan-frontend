/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { AccentService } from "inet-core";
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
    MessageContact._accent = new AccentService();
    return MessageContact;
}());
export { MessageContact };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWVzc2FnZUNvbnRhY3QuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbmV0LWNoYXQvIiwic291cmNlcyI6WyJzcmMvbW9kZWwvTWVzc2FnZUNvbnRhY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxhQUFhLEVBQVksTUFBTSxXQUFXLENBQUM7QUFFbkQ7SUFXRSx3QkFBWSxPQUFPO1FBVG5CLGFBQVEsR0FBVyxFQUFFLENBQUM7UUFDdEIsYUFBUSxHQUFXLEVBQUUsQ0FBQztRQUN0QixZQUFPLEdBQVcsQ0FBQyxDQUFDO1FBQ3BCLFlBQU8sR0FBVyxFQUFFLENBQUM7UUFDckIsV0FBTSxHQUFZLEtBQUssQ0FBQztRQUN4QixXQUFNLEdBQVcsQ0FBQyxDQUFDOztRQUVuQixpQkFBWSxHQUFXLEVBQUUsQ0FBQztRQUd4QixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztRQUM3Qiw0REFBNEQ7UUFFNUQsSUFBSSxDQUFDLFlBQVksR0FBRyxjQUFjLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ3JGLHNDQUFzQztRQUN0QyxJQUFJLENBQUMsWUFBWSxJQUFJLGNBQWMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDekcsQ0FBQzs7Ozs7SUFFRCxnQ0FBTzs7OztJQUFQLFVBQVEsT0FBb0I7UUFBcEIsd0JBQUEsRUFBQSxZQUFvQjtRQUMxQixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDaEYsQ0FBQztJQXJCYyxzQkFBTyxHQUFHLElBQUksYUFBYSxFQUFFLENBQUM7SUFzQi9DLHFCQUFDO0NBQUEsQUF2QkQsSUF1QkM7U0F2QlksY0FBYzs7Ozs7O0lBQ3pCLHVCQUE2Qzs7SUFDN0Msa0NBQXNCOztJQUN0QixrQ0FBc0I7O0lBQ3RCLGlDQUFvQjs7SUFDcEIsaUNBQXFCOztJQUNyQixnQ0FBd0I7O0lBQ3hCLGdDQUFtQjs7SUFDbkIsOEJBQWM7O0lBQ2Qsc0NBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtBY2NlbnRTZXJ2aWNlLCBIdG1sVXRpbHN9IGZyb20gXCJpbmV0LWNvcmVcIjtcblxuZXhwb3J0IGNsYXNzIE1lc3NhZ2VDb250YWN0IHtcbiAgcHJpdmF0ZSBzdGF0aWMgX2FjY2VudCA9IG5ldyBBY2NlbnRTZXJ2aWNlKCk7XG4gIGZ1bGxuYW1lOiBzdHJpbmcgPSAnJztcbiAgdXNlcmNvZGU6IHN0cmluZyA9ICcnO1xuICBsYXN0bXNnOiBudW1iZXIgPSAwO1xuICBtZXNzYWdlOiBzdHJpbmcgPSAnJztcbiAgb25saW5lOiBib29sZWFuID0gZmFsc2U7XG4gIHVucmVhZDogbnVtYmVyID0gMDtcbiAgdHlwZT86IHN0cmluZzsgLy8gQ09NUEFOWSB8IEZSSUVORFxuICBfaW5kZXhTZWFyY2g6IHN0cmluZyA9ICcnO1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIG9wdGlvbnMpO1xuICAgIC8vIHRoaXMubWVzc2FnZSA9IEh0bWxVdGlscy5mb3JtYXRIdG1sRGlzcGxheSh0aGlzLm1lc3NhZ2UpO1xuXG4gICAgdGhpcy5faW5kZXhTZWFyY2ggPSBNZXNzYWdlQ29udGFjdC5fYWNjZW50LnZpVG9Fbih0aGlzLmZ1bGxuYW1lLnRvTG93ZXJDYXNlKCkpICsgJyAnO1xuICAgIC8vIFJlbW92ZSBzdWZmaXggZW1haWwgXCJAaW5ldGNsb3VkLnZuXCJcbiAgICB0aGlzLl9pbmRleFNlYXJjaCArPSBNZXNzYWdlQ29udGFjdC5fYWNjZW50LnZpVG9Fbih0aGlzLnVzZXJjb2RlLnNsaWNlKDAsIHRoaXMudXNlcmNvZGUuaW5kZXhPZignQCcpKSk7XG4gIH1cblxuICBpc01hdGNoKGtleXdvcmQ6IHN0cmluZyA9ICcnKSB7XG4gICAgcmV0dXJuIHRoaXMuX2luZGV4U2VhcmNoLmluZGV4T2YoTWVzc2FnZUNvbnRhY3QuX2FjY2VudC52aVRvRW4oa2V5d29yZCkpID4gLTE7XG4gIH1cbn1cbiJdfQ==