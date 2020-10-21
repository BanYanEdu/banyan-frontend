/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { DateFormatter } from "../DateFormatter";
export class MessageChatHolder {
    /**
     * @param {?} date
     */
    constructor(date) {
        this.messages = [];
        this.date = new Date(date);
        this.date.setHours(0, 0, 0, 0);
        this.display = new DateFormatter(this.date).formatYear();
    }
    /**
     * @param {?} date
     * @return {?}
     */
    isSameDate(date) {
        /** @type {?} */
        let d = new Date(date);
        d.setHours(0, 0, 0, 0);
        return this.date.getTime() === d.getTime();
    }
}
if (false) {
    /** @type {?} */
    MessageChatHolder.prototype.messages;
    /** @type {?} */
    MessageChatHolder.prototype.date;
    /** @type {?} */
    MessageChatHolder.prototype.display;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWVzc2FnZUhvbGRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtY2hhdC8iLCJzb3VyY2VzIjpbInNyYy9tb2RlbC9NZXNzYWdlSG9sZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFFL0MsTUFBTSxPQUFPLGlCQUFpQjs7OztJQUsxQixZQUFZLElBQUk7UUFKaEIsYUFBUSxHQUFrQixFQUFFLENBQUM7UUFLekIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzQixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUMvQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUM3RCxDQUFDOzs7OztJQUVELFVBQVUsQ0FBQyxJQUFVOztZQUNiLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDdEIsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN2QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQy9DLENBQUM7Q0FDSjs7O0lBZkcscUNBQTZCOztJQUM3QixpQ0FBVzs7SUFDWCxvQ0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge01lc3NhZ2VDaGF0fSBmcm9tIFwiLi9NZXNzYWdlQ2hhdFwiO1xuaW1wb3J0IHtEYXRlRm9ybWF0dGVyfSBmcm9tIFwiLi4vRGF0ZUZvcm1hdHRlclwiO1xuXG5leHBvcnQgY2xhc3MgTWVzc2FnZUNoYXRIb2xkZXIge1xuICAgIG1lc3NhZ2VzOiBNZXNzYWdlQ2hhdFtdID0gW107XG4gICAgZGF0ZTogRGF0ZTtcbiAgICBkaXNwbGF5OiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3RvcihkYXRlKSB7XG4gICAgICAgIHRoaXMuZGF0ZSA9IG5ldyBEYXRlKGRhdGUpO1xuICAgICAgICB0aGlzLmRhdGUuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG4gICAgICAgIHRoaXMuZGlzcGxheSA9IG5ldyBEYXRlRm9ybWF0dGVyKHRoaXMuZGF0ZSkuZm9ybWF0WWVhcigpO1xuICAgIH1cblxuICAgIGlzU2FtZURhdGUoZGF0ZTogRGF0ZSkge1xuICAgICAgICBsZXQgZCA9IG5ldyBEYXRlKGRhdGUpO1xuICAgICAgICBkLnNldEhvdXJzKDAsIDAsIDAsIDApO1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRlLmdldFRpbWUoKSA9PT0gZC5nZXRUaW1lKCk7XG4gICAgfVxufSJdfQ==