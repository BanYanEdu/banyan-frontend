/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { AccentService } from "inet-core";
export class MessageContact {
    /**
     * @param {?} options
     */
    constructor(options) {
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
    isMatch(keyword = '') {
        return this._indexSearch.indexOf(MessageContact._accent.viToEn(keyword)) > -1;
    }
}
MessageContact._accent = new AccentService();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWVzc2FnZUNvbnRhY3QuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbmV0LWNoYXQvIiwic291cmNlcyI6WyJzcmMvbW9kZWwvTWVzc2FnZUNvbnRhY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxhQUFhLEVBQVksTUFBTSxXQUFXLENBQUM7QUFFbkQsTUFBTSxPQUFPLGNBQWM7Ozs7SUFXekIsWUFBWSxPQUFPO1FBVG5CLGFBQVEsR0FBVyxFQUFFLENBQUM7UUFDdEIsYUFBUSxHQUFXLEVBQUUsQ0FBQztRQUN0QixZQUFPLEdBQVcsQ0FBQyxDQUFDO1FBQ3BCLFlBQU8sR0FBVyxFQUFFLENBQUM7UUFDckIsV0FBTSxHQUFZLEtBQUssQ0FBQztRQUN4QixXQUFNLEdBQVcsQ0FBQyxDQUFDOztRQUVuQixpQkFBWSxHQUFXLEVBQUUsQ0FBQztRQUd4QixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztRQUM3Qiw0REFBNEQ7UUFFNUQsSUFBSSxDQUFDLFlBQVksR0FBRyxjQUFjLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ3JGLHNDQUFzQztRQUN0QyxJQUFJLENBQUMsWUFBWSxJQUFJLGNBQWMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDekcsQ0FBQzs7Ozs7SUFFRCxPQUFPLENBQUMsVUFBa0IsRUFBRTtRQUMxQixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDaEYsQ0FBQzs7QUFyQmMsc0JBQU8sR0FBRyxJQUFJLGFBQWEsRUFBRSxDQUFDOzs7Ozs7SUFBN0MsdUJBQTZDOztJQUM3QyxrQ0FBc0I7O0lBQ3RCLGtDQUFzQjs7SUFDdEIsaUNBQW9COztJQUNwQixpQ0FBcUI7O0lBQ3JCLGdDQUF3Qjs7SUFDeEIsZ0NBQW1COztJQUNuQiw4QkFBYzs7SUFDZCxzQ0FBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0FjY2VudFNlcnZpY2UsIEh0bWxVdGlsc30gZnJvbSBcImluZXQtY29yZVwiO1xuXG5leHBvcnQgY2xhc3MgTWVzc2FnZUNvbnRhY3Qge1xuICBwcml2YXRlIHN0YXRpYyBfYWNjZW50ID0gbmV3IEFjY2VudFNlcnZpY2UoKTtcbiAgZnVsbG5hbWU6IHN0cmluZyA9ICcnO1xuICB1c2VyY29kZTogc3RyaW5nID0gJyc7XG4gIGxhc3Rtc2c6IG51bWJlciA9IDA7XG4gIG1lc3NhZ2U6IHN0cmluZyA9ICcnO1xuICBvbmxpbmU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgdW5yZWFkOiBudW1iZXIgPSAwO1xuICB0eXBlPzogc3RyaW5nOyAvLyBDT01QQU5ZIHwgRlJJRU5EXG4gIF9pbmRleFNlYXJjaDogc3RyaW5nID0gJyc7XG5cbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgb3B0aW9ucyk7XG4gICAgLy8gdGhpcy5tZXNzYWdlID0gSHRtbFV0aWxzLmZvcm1hdEh0bWxEaXNwbGF5KHRoaXMubWVzc2FnZSk7XG5cbiAgICB0aGlzLl9pbmRleFNlYXJjaCA9IE1lc3NhZ2VDb250YWN0Ll9hY2NlbnQudmlUb0VuKHRoaXMuZnVsbG5hbWUudG9Mb3dlckNhc2UoKSkgKyAnICc7XG4gICAgLy8gUmVtb3ZlIHN1ZmZpeCBlbWFpbCBcIkBpbmV0Y2xvdWQudm5cIlxuICAgIHRoaXMuX2luZGV4U2VhcmNoICs9IE1lc3NhZ2VDb250YWN0Ll9hY2NlbnQudmlUb0VuKHRoaXMudXNlcmNvZGUuc2xpY2UoMCwgdGhpcy51c2VyY29kZS5pbmRleE9mKCdAJykpKTtcbiAgfVxuXG4gIGlzTWF0Y2goa2V5d29yZDogc3RyaW5nID0gJycpIHtcbiAgICByZXR1cm4gdGhpcy5faW5kZXhTZWFyY2guaW5kZXhPZihNZXNzYWdlQ29udGFjdC5fYWNjZW50LnZpVG9FbihrZXl3b3JkKSkgPiAtMTtcbiAgfVxufVxuIl19