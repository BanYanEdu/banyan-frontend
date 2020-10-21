/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as _moment from 'moment';
/** @type {?} */
const moment = _moment;
/** @type {?} */
const times = {
    minute: 60 * 1000,
    date: 24 * 60 * 1000,
    week: 7 * 24 * 60 * 1000,
    month: 30 * 24 * 60 * 1000,
    year: 365 * 24 * 60 * 1000
};
export class DateFormatUtils {
    /**
     * @param {?} date
     * @return {?}
     */
    static fromNow(date) {
        /** @type {?} */
        let _date = new Date(date);
        /** @type {?} */
        let deltaFromNow;
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
    }
    /**
     * @param {?} date
     * @param {?} format
     * @param {?=} locale
     * @return {?}
     */
    static format(date, format, locale) {
        return moment(date).locale(locale || this.locale).format(format);
    }
}
DateFormatUtils.locale = 'vi';
DateFormatUtils.textResources = {
    minute: 'phút',
    date: 'ngày',
    week: 'tuần',
    month: 'tháng',
    year: 'DD/MM/YYYY HH:mm'
};
if (false) {
    /** @type {?} */
    DateFormatUtils.locale;
    /** @type {?} */
    DateFormatUtils.textResources;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0ZUZvcm1hdFV0aWxzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC11aS8iLCJzb3VyY2VzIjpbInNyYy91dGlscy9EYXRlRm9ybWF0VXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sS0FBSyxPQUFPLE1BQU0sUUFBUSxDQUFDOztNQUM1QixNQUFNLEdBQUcsT0FBTzs7TUFFaEIsS0FBSyxHQUFHO0lBQ1YsTUFBTSxFQUFFLEVBQUUsR0FBRyxJQUFJO0lBQ2pCLElBQUksRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUk7SUFDcEIsSUFBSSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUk7SUFDeEIsS0FBSyxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUk7SUFDMUIsSUFBSSxFQUFFLEdBQUcsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUk7Q0FDN0I7QUFFRCxNQUFNLE9BQU8sZUFBZTs7Ozs7SUFZeEIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFTOztZQUNoQixLQUFLLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDOztZQUN0QixZQUFvQjtRQUV4QixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ2xCLEtBQUssR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1NBQ3RCO1FBRUQsWUFBWSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3RELFlBQVksSUFBSSxHQUFHLENBQUMsQ0FBQyxZQUFZO1FBRWpDLElBQUksWUFBWSxHQUFHLENBQUMsRUFBRTtZQUNsQixJQUFJLFlBQVksR0FBRyxLQUFLLENBQUMsSUFBSSxFQUFFO2dCQUMzQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUM7YUFDbkY7aUJBQU0sSUFBSSxZQUFZLEdBQUcsS0FBSyxDQUFDLElBQUksRUFBRTtnQkFDbEMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDO2FBQy9FO2lCQUFNLElBQUksWUFBWSxHQUFHLEtBQUssQ0FBQyxLQUFLLEVBQUU7Z0JBQ25DLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQzthQUMvRTtpQkFBTSxJQUFJLFlBQVksR0FBRyxLQUFLLENBQUMsSUFBSSxFQUFFO2dCQUNsQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUM7YUFDakY7U0FDSjtRQUNELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN2RCxDQUFDOzs7Ozs7O0lBRUQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFTLEVBQUUsTUFBYyxFQUFFLE1BQWU7UUFDcEQsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3JFLENBQUM7O0FBckNNLHNCQUFNLEdBQUcsSUFBSSxDQUFDO0FBRWQsNkJBQWEsR0FBRztJQUNuQixNQUFNLEVBQUUsTUFBTTtJQUNkLElBQUksRUFBRSxNQUFNO0lBQ1osSUFBSSxFQUFFLE1BQU07SUFDWixLQUFLLEVBQUUsT0FBTztJQUNkLElBQUksRUFBRSxrQkFBa0I7Q0FDM0IsQ0FBQzs7O0lBUkYsdUJBQXFCOztJQUVyQiw4QkFNRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIF9tb21lbnQgZnJvbSAnbW9tZW50JztcbmNvbnN0IG1vbWVudCA9IF9tb21lbnQ7XG5cbmNvbnN0IHRpbWVzID0ge1xuICAgIG1pbnV0ZTogNjAgKiAxMDAwLFxuICAgIGRhdGU6IDI0ICogNjAgKiAxMDAwLFxuICAgIHdlZWs6IDcgKiAyNCAqIDYwICogMTAwMCxcbiAgICBtb250aDogMzAgKiAyNCAqIDYwICogMTAwMCxcbiAgICB5ZWFyOiAzNjUgKiAyNCAqIDYwICogMTAwMFxufTtcblxuZXhwb3J0IGNsYXNzIERhdGVGb3JtYXRVdGlscyB7XG5cbiAgICBzdGF0aWMgbG9jYWxlID0gJ3ZpJztcblxuICAgIHN0YXRpYyB0ZXh0UmVzb3VyY2VzID0ge1xuICAgICAgICBtaW51dGU6ICdwaMO6dCcsXG4gICAgICAgIGRhdGU6ICduZ8OgeScsXG4gICAgICAgIHdlZWs6ICd0deG6p24nLFxuICAgICAgICBtb250aDogJ3Row6FuZycsXG4gICAgICAgIHllYXI6ICdERC9NTS9ZWVlZIEhIOm1tJ1xuICAgIH07XG5cbiAgICBzdGF0aWMgZnJvbU5vdyhkYXRlOiBhbnkpOiBzdHJpbmcge1xuICAgICAgICBsZXQgX2RhdGUgPSBuZXcgRGF0ZShkYXRlKTtcbiAgICAgICAgbGV0IGRlbHRhRnJvbU5vdzogbnVtYmVyO1xuXG4gICAgICAgIGlmICghX2RhdGUuZ2V0VGltZSgpKSB7XG4gICAgICAgICAgICBfZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBkZWx0YUZyb21Ob3cgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIF9kYXRlLmdldFRpbWUoKTtcbiAgICAgICAgZGVsdGFGcm9tTm93IC89IDEwMDsgLy8gQnkgc2Vjb25kXG5cbiAgICAgICAgaWYgKGRlbHRhRnJvbU5vdyA+IDApIHtcbiAgICAgICAgICAgIGlmIChkZWx0YUZyb21Ob3cgPCB0aW1lcy5kYXRlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIE1hdGguY2VpbChkZWx0YUZyb21Ob3cgLyB0aW1lcy5taW51dGUpICsgJyAnICsgdGhpcy50ZXh0UmVzb3VyY2VzLm1pbnV0ZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGVsdGFGcm9tTm93IDwgdGltZXMud2Vlaykge1xuICAgICAgICAgICAgICAgIHJldHVybiBNYXRoLmNlaWwoZGVsdGFGcm9tTm93IC8gdGltZXMuZGF0ZSkgKyAnICcgKyB0aGlzLnRleHRSZXNvdXJjZXMuZGF0ZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGVsdGFGcm9tTm93IDwgdGltZXMubW9udGgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gTWF0aC5jZWlsKGRlbHRhRnJvbU5vdyAvIHRpbWVzLndlZWspICsgJyAnICsgdGhpcy50ZXh0UmVzb3VyY2VzLndlZWs7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRlbHRhRnJvbU5vdyA8IHRpbWVzLnllYXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gTWF0aC5jZWlsKGRlbHRhRnJvbU5vdyAvIHRpbWVzLm1vbnRoKSArICcgJyArIHRoaXMudGV4dFJlc291cmNlcy5tb250aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5mb3JtYXQoX2RhdGUsIHRoaXMudGV4dFJlc291cmNlcy55ZWFyKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZm9ybWF0KGRhdGU6IGFueSwgZm9ybWF0OiBzdHJpbmcsIGxvY2FsZT86IHN0cmluZykge1xuICAgICAgICByZXR1cm4gbW9tZW50KGRhdGUpLmxvY2FsZShsb2NhbGUgfHwgdGhpcy5sb2NhbGUpLmZvcm1hdChmb3JtYXQpO1xuICAgIH1cbn1cbiJdfQ==