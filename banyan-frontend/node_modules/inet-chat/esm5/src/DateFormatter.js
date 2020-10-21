/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as _moment from 'moment';
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
export { DateFormatter };
if (false) {
    /** @type {?} */
    DateFormatter.prototype.date;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0ZUZvcm1hdHRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtY2hhdC8iLCJzb3VyY2VzIjpbInNyYy9EYXRlRm9ybWF0dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEtBQUssT0FBTyxNQUFNLFFBQVEsQ0FBQzs7SUFDNUIsTUFBTSxHQUFHLE9BQU87QUFFdEI7SUFHSSx1QkFBWSxJQUE0QjtRQUNwQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9CLENBQUM7Ozs7SUFFRCxzQ0FBYzs7O0lBQWQ7UUFDSSxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDeEQsQ0FBQzs7OztJQUVELGtDQUFVOzs7SUFBVjtRQUNJLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDbEQsQ0FBQzs7OztJQUVELG1DQUFXOzs7SUFBWDtRQUNJLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDbkQsQ0FBQzs7OztJQUVELGtDQUFVOzs7SUFBVjtRQUNJLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDbkQsQ0FBQzs7OztJQUVELGtDQUFVOzs7SUFBVjtRQUNJLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDNUMsQ0FBQzs7OztJQUVELDhCQUFNOzs7SUFBTjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ3RCLE9BQU8sRUFBRSxDQUFDO1NBQ2I7O1lBQ0ssR0FBRyxHQUFHLElBQUksSUFBSSxFQUFFOztZQUNoQixVQUFVLEdBQUc7WUFDZixNQUFNLEVBQUUsR0FBRyxDQUFDLFdBQVcsRUFBRSxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ3JELE9BQU8sRUFBRSxHQUFHLENBQUMsUUFBUSxFQUFFLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDaEQsTUFBTSxFQUFFLEdBQUcsQ0FBQyxPQUFPLEVBQUUsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtTQUNoRDtRQUNELElBQUksVUFBVSxDQUFDLE1BQU0sSUFBSSxVQUFVLENBQUMsT0FBTyxJQUFJLFVBQVUsQ0FBQyxNQUFNLEVBQUU7WUFDOUQsT0FBTyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDNUI7UUFDRCxJQUFJLFVBQVUsQ0FBQyxNQUFNLElBQUksVUFBVSxDQUFDLE9BQU8sRUFBRTtZQUN6QyxPQUFPLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUM1QjtRQUNELElBQUksVUFBVSxDQUFDLE1BQU0sRUFBRTtZQUNuQixPQUFPLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUM3QjtRQUNELE9BQU8sSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFDTCxvQkFBQztBQUFELENBQUMsQUFoREQsSUFnREM7Ozs7SUEvQ0csNkJBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBfbW9tZW50IGZyb20gJ21vbWVudCc7XG5jb25zdCBtb21lbnQgPSBfbW9tZW50O1xuXG5leHBvcnQgY2xhc3MgRGF0ZUZvcm1hdHRlciB7XG4gICAgZGF0ZTogRGF0ZTtcblxuICAgIGNvbnN0cnVjdG9yKGRhdGU6IHN0cmluZyB8IERhdGUgfCBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5kYXRlID0gbmV3IERhdGUoZGF0ZSk7XG4gICAgfVxuXG4gICAgZm9ybWF0RnVsbFllYXIoKSB7XG4gICAgICAgIHJldHVybiBtb21lbnQodGhpcy5kYXRlKS5mb3JtYXQoJ0REL01NL1lZWVksIEg6bW0nKTtcbiAgICB9XG5cbiAgICBmb3JtYXRZZWFyKCkge1xuICAgICAgICByZXR1cm4gbW9tZW50KHRoaXMuZGF0ZSkuZm9ybWF0KCdERC9NTS9ZWVlZJyk7XG4gICAgfVxuXG4gICAgZm9ybWF0TW9udGgoKSB7XG4gICAgICAgIHJldHVybiBtb21lbnQodGhpcy5kYXRlKS5mb3JtYXQoJ0REL01NLCBIOm1tJyk7XG4gICAgfVxuXG4gICAgZm9ybWF0RGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIG1vbWVudCh0aGlzLmRhdGUpLmZvcm1hdCgnREQvTU0sIEg6bW0nKTtcbiAgICB9XG5cbiAgICBmb3JtYXRUaW1lKCkge1xuICAgICAgICByZXR1cm4gbW9tZW50KHRoaXMuZGF0ZSkuZm9ybWF0KCdIOm1tJyk7XG4gICAgfVxuXG4gICAgZm9ybWF0KCkge1xuICAgICAgICBpZiAoIXRoaXMuZGF0ZS5nZXRUaW1lKCkpIHtcbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuICAgICAgICBjb25zdCBjb25kaXRpb25zID0ge1xuICAgICAgICAgICAgb25ZZWFyOiBub3cuZ2V0RnVsbFllYXIoKSA9PT0gdGhpcy5kYXRlLmdldEZ1bGxZZWFyKCksXG4gICAgICAgICAgICBvbk1vbnRoOiBub3cuZ2V0TW9udGgoKSA9PT0gdGhpcy5kYXRlLmdldE1vbnRoKCksXG4gICAgICAgICAgICBvbkRhdGU6IG5vdy5nZXREYXRlKCkgPT09IHRoaXMuZGF0ZS5nZXREYXRlKCksXG4gICAgICAgIH07XG4gICAgICAgIGlmIChjb25kaXRpb25zLm9uWWVhciAmJiBjb25kaXRpb25zLm9uTW9udGggJiYgY29uZGl0aW9ucy5vbkRhdGUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZvcm1hdFRpbWUoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29uZGl0aW9ucy5vblllYXIgJiYgY29uZGl0aW9ucy5vbk1vbnRoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5mb3JtYXREYXRlKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvbmRpdGlvbnMub25ZZWFyKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5mb3JtYXRNb250aCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmZvcm1hdFllYXIoKTtcbiAgICB9XG59Il19