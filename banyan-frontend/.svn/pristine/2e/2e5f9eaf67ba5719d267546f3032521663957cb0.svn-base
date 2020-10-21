/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as _moment from 'moment';
/** @type {?} */
var moment = _moment;
/** @type {?} */
var times = {
    minute: 60 * 1000,
    date: 24 * 60 * 1000,
    week: 7 * 24 * 60 * 1000,
    month: 30 * 24 * 60 * 1000,
    year: 365 * 24 * 60 * 1000
};
var DateFormatUtils = /** @class */ (function () {
    function DateFormatUtils() {
    }
    /**
     * @param {?} date
     * @return {?}
     */
    DateFormatUtils.fromNow = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        /** @type {?} */
        var _date = new Date(date);
        /** @type {?} */
        var deltaFromNow;
        if (!_date.getTime()) {
            _date = new Date();
        }
        deltaFromNow = new Date().getTime() - _date.getTime();
        deltaFromNow /= 100; // By second
        if (deltaFromNow > 0) {
            if (deltaFromNow < times.date) {
                return Math.ceil(deltaFromNow / times.minute) + ' ' + this.textResources.minute;
            }
            else if (deltaFromNow < times.week) {
                return Math.ceil(deltaFromNow / times.date) + ' ' + this.textResources.date;
            }
            else if (deltaFromNow < times.month) {
                return Math.ceil(deltaFromNow / times.week) + ' ' + this.textResources.week;
            }
            else if (deltaFromNow < times.year) {
                return Math.ceil(deltaFromNow / times.month) + ' ' + this.textResources.month;
            }
        }
        return this.format(_date, this.textResources.year);
    };
    /**
     * @param {?} date
     * @param {?} format
     * @param {?=} locale
     * @return {?}
     */
    DateFormatUtils.format = /**
     * @param {?} date
     * @param {?} format
     * @param {?=} locale
     * @return {?}
     */
    function (date, format, locale) {
        return moment(date).locale(locale || this.locale).format(format);
    };
    DateFormatUtils.locale = 'vi';
    DateFormatUtils.textResources = {
        minute: 'phút',
        date: 'ngày',
        week: 'tuần',
        month: 'tháng',
        year: 'DD/MM/YYYY HH:mm'
    };
    return DateFormatUtils;
}());
export { DateFormatUtils };
if (false) {
    /** @type {?} */
    DateFormatUtils.locale;
    /** @type {?} */
    DateFormatUtils.textResources;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0ZUZvcm1hdFV0aWxzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC11aS8iLCJzb3VyY2VzIjpbInNyYy91dGlscy9EYXRlRm9ybWF0VXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sS0FBSyxPQUFPLE1BQU0sUUFBUSxDQUFDOztJQUM1QixNQUFNLEdBQUcsT0FBTzs7SUFFaEIsS0FBSyxHQUFHO0lBQ1YsTUFBTSxFQUFFLEVBQUUsR0FBRyxJQUFJO0lBQ2pCLElBQUksRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUk7SUFDcEIsSUFBSSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUk7SUFDeEIsS0FBSyxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUk7SUFDMUIsSUFBSSxFQUFFLEdBQUcsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUk7Q0FDN0I7QUFFRDtJQUFBO0lBd0NBLENBQUM7Ozs7O0lBNUJVLHVCQUFPOzs7O0lBQWQsVUFBZSxJQUFTOztZQUNoQixLQUFLLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDOztZQUN0QixZQUFvQjtRQUV4QixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ2xCLEtBQUssR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1NBQ3RCO1FBRUQsWUFBWSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3RELFlBQVksSUFBSSxHQUFHLENBQUMsQ0FBQyxZQUFZO1FBRWpDLElBQUksWUFBWSxHQUFHLENBQUMsRUFBRTtZQUNsQixJQUFJLFlBQVksR0FBRyxLQUFLLENBQUMsSUFBSSxFQUFFO2dCQUMzQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUM7YUFDbkY7aUJBQU0sSUFBSSxZQUFZLEdBQUcsS0FBSyxDQUFDLElBQUksRUFBRTtnQkFDbEMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDO2FBQy9FO2lCQUFNLElBQUksWUFBWSxHQUFHLEtBQUssQ0FBQyxLQUFLLEVBQUU7Z0JBQ25DLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQzthQUMvRTtpQkFBTSxJQUFJLFlBQVksR0FBRyxLQUFLLENBQUMsSUFBSSxFQUFFO2dCQUNsQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUM7YUFDakY7U0FDSjtRQUNELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN2RCxDQUFDOzs7Ozs7O0lBRU0sc0JBQU07Ozs7OztJQUFiLFVBQWMsSUFBUyxFQUFFLE1BQWMsRUFBRSxNQUFlO1FBQ3BELE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNyRSxDQUFDO0lBckNNLHNCQUFNLEdBQUcsSUFBSSxDQUFDO0lBRWQsNkJBQWEsR0FBRztRQUNuQixNQUFNLEVBQUUsTUFBTTtRQUNkLElBQUksRUFBRSxNQUFNO1FBQ1osSUFBSSxFQUFFLE1BQU07UUFDWixLQUFLLEVBQUUsT0FBTztRQUNkLElBQUksRUFBRSxrQkFBa0I7S0FDM0IsQ0FBQztJQThCTixzQkFBQztDQUFBLEFBeENELElBd0NDO1NBeENZLGVBQWU7OztJQUV4Qix1QkFBcUI7O0lBRXJCLDhCQU1FIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgX21vbWVudCBmcm9tICdtb21lbnQnO1xuY29uc3QgbW9tZW50ID0gX21vbWVudDtcblxuY29uc3QgdGltZXMgPSB7XG4gICAgbWludXRlOiA2MCAqIDEwMDAsXG4gICAgZGF0ZTogMjQgKiA2MCAqIDEwMDAsXG4gICAgd2VlazogNyAqIDI0ICogNjAgKiAxMDAwLFxuICAgIG1vbnRoOiAzMCAqIDI0ICogNjAgKiAxMDAwLFxuICAgIHllYXI6IDM2NSAqIDI0ICogNjAgKiAxMDAwXG59O1xuXG5leHBvcnQgY2xhc3MgRGF0ZUZvcm1hdFV0aWxzIHtcblxuICAgIHN0YXRpYyBsb2NhbGUgPSAndmknO1xuXG4gICAgc3RhdGljIHRleHRSZXNvdXJjZXMgPSB7XG4gICAgICAgIG1pbnV0ZTogJ3Bow7p0JyxcbiAgICAgICAgZGF0ZTogJ25nw6B5JyxcbiAgICAgICAgd2VlazogJ3R14bqnbicsXG4gICAgICAgIG1vbnRoOiAndGjDoW5nJyxcbiAgICAgICAgeWVhcjogJ0REL01NL1lZWVkgSEg6bW0nXG4gICAgfTtcblxuICAgIHN0YXRpYyBmcm9tTm93KGRhdGU6IGFueSk6IHN0cmluZyB7XG4gICAgICAgIGxldCBfZGF0ZSA9IG5ldyBEYXRlKGRhdGUpO1xuICAgICAgICBsZXQgZGVsdGFGcm9tTm93OiBudW1iZXI7XG5cbiAgICAgICAgaWYgKCFfZGF0ZS5nZXRUaW1lKCkpIHtcbiAgICAgICAgICAgIF9kYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRlbHRhRnJvbU5vdyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gX2RhdGUuZ2V0VGltZSgpO1xuICAgICAgICBkZWx0YUZyb21Ob3cgLz0gMTAwOyAvLyBCeSBzZWNvbmRcblxuICAgICAgICBpZiAoZGVsdGFGcm9tTm93ID4gMCkge1xuICAgICAgICAgICAgaWYgKGRlbHRhRnJvbU5vdyA8IHRpbWVzLmRhdGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gTWF0aC5jZWlsKGRlbHRhRnJvbU5vdyAvIHRpbWVzLm1pbnV0ZSkgKyAnICcgKyB0aGlzLnRleHRSZXNvdXJjZXMubWludXRlO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChkZWx0YUZyb21Ob3cgPCB0aW1lcy53ZWVrKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIE1hdGguY2VpbChkZWx0YUZyb21Ob3cgLyB0aW1lcy5kYXRlKSArICcgJyArIHRoaXMudGV4dFJlc291cmNlcy5kYXRlO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChkZWx0YUZyb21Ob3cgPCB0aW1lcy5tb250aCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBNYXRoLmNlaWwoZGVsdGFGcm9tTm93IC8gdGltZXMud2VlaykgKyAnICcgKyB0aGlzLnRleHRSZXNvdXJjZXMud2VlaztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGVsdGFGcm9tTm93IDwgdGltZXMueWVhcikge1xuICAgICAgICAgICAgICAgIHJldHVybiBNYXRoLmNlaWwoZGVsdGFGcm9tTm93IC8gdGltZXMubW9udGgpICsgJyAnICsgdGhpcy50ZXh0UmVzb3VyY2VzLm1vbnRoO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmZvcm1hdChfZGF0ZSwgdGhpcy50ZXh0UmVzb3VyY2VzLnllYXIpO1xuICAgIH1cblxuICAgIHN0YXRpYyBmb3JtYXQoZGF0ZTogYW55LCBmb3JtYXQ6IHN0cmluZywgbG9jYWxlPzogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBtb21lbnQoZGF0ZSkubG9jYWxlKGxvY2FsZSB8fCB0aGlzLmxvY2FsZSkuZm9ybWF0KGZvcm1hdCk7XG4gICAgfVxufVxuIl19