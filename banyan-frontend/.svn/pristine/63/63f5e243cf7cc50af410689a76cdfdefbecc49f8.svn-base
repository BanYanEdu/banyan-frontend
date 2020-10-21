/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
export let DateUtils = {
    firstDay: 1,
    /**
     * @param {?} date
     * @param {?=} firstDay
     * @return {?}
     */
    getWeekRange(date, firstDay) {
        /** @type {?} */
        let startDate = this.getDateStartWeek(date, firstDay);
        /** @type {?} */
        let endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + 6);
        return {
            startWeek: startDate,
            endWeek: endDate
        };
    },
    /**
     * @param {?} date
     * @param {?=} firstDay
     * @return {?}
     */
    getDayIndexOnWeek(date, firstDay) {
        // Default start date on monday
        if (firstDay === undefined || firstDay < 0) {
            firstDay = this.firstDay;
        }
        if (date.getDay() < firstDay) {
            return 7 - date.getDay() - firstDay;
        }
        else {
            return date.getDay() - firstDay;
        }
    },
    /**
     * @param {?} date
     * @param {?=} firstDay
     * @return {?}
     */
    getDateStartWeek(date, firstDay) {
        /** @type {?} */
        let distance = this.getDayIndexOnWeek(date, firstDay);
        date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        date.setDate(date.getDate() - distance);
        return date;
    },
    /**
     * @param {?} date
     * @param {?=} firstDay
     * @return {?}
     */
    getDateEndWeek(date, firstDay) {
        /** @type {?} */
        let endDate = this.getDateStartWeek(date, firstDay);
        endDate.setDate(endDate.getDate() + 6);
        return endDate;
    },
    /**
     * @param {?} date
     * @return {?}
     */
    dayOfYear(date) {
        /** @type {?} */
        let jan = new Date(date.getFullYear(), 0, 1);
        jan.setTime(jan.getTime() - 1);
        return Math.ceil((date.getTime() - jan.getTime()) / 86400000);
    },
    /**
     * @param {?} date
     * @param {?=} firstDay
     * @return {?}
     */
    getWeek(date, firstDay) {
        /** @type {?} */
        let startYear = new Date(date.getFullYear(), 0, 1);
        /** @type {?} */
        let startWeek = this.getDateStartWeek(date, firstDay);
        /** @type {?} */
        let dayInYear = this.dayOfYear(startWeek);
        return Math.ceil(dayInYear / 7);
    },
    /**
     * @param {?} w
     * @param {?} y
     * @return {?}
     */
    getDateFromWeek(w, y) {
        /** @type {?} */
        let d = (1 + (w - 1) * 7);
        return new Date(y, 0, d);
    },
    /**
     * @param {?} date
     * @return {?}
     */
    dateIsToday(date) {
        /** @type {?} */
        let now = new Date();
        /** @type {?} */
        let compareDate = new Date(date);
        now.setHours(0, 0, 0, 0);
        compareDate.setHours(0, 0, 0, 0);
        return now.getTime() === compareDate.getTime();
    },
    /**
     * @param {?} date
     * @return {?}
     */
    weekIsToday(date) {
        return this.getWeek(date) === this.getWeek(new Date());
    },
    /**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    isSameWeek(a, b) {
        return this.getWeek(a) === this.getWeek(b);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0ZVV0aWxzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC1jYWxlbmRhci8iLCJzb3VyY2VzIjpbInNyYy91dGlscy9jb21tb24vRGF0ZVV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsTUFBTSxLQUFLLFNBQVMsR0FBRztJQUVuQixRQUFRLEVBQUUsQ0FBQzs7Ozs7O0lBRVgsWUFBWSxDQUFDLElBQVUsRUFBRSxRQUF1Qjs7WUFDeEMsU0FBUyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDOztZQUNqRCxPQUFPLEdBQUcsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ2pDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3ZDLE9BQU87WUFDSCxTQUFTLEVBQUUsU0FBUztZQUNwQixPQUFPLEVBQUUsT0FBTztTQUNuQixDQUFBO0lBQ0wsQ0FBQzs7Ozs7O0lBRUQsaUJBQWlCLENBQUMsSUFBVSxFQUFFLFFBQXVCO1FBQ2pELCtCQUErQjtRQUMvQixJQUFJLFFBQVEsS0FBSyxTQUFTLElBQUksUUFBUSxHQUFHLENBQUMsRUFBRTtZQUN4QyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztTQUM1QjtRQUVELElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLFFBQVEsRUFBRTtZQUMxQixPQUFPLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsUUFBUSxDQUFDO1NBQ3ZDO2FBQU07WUFDSCxPQUFPLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxRQUFRLENBQUM7U0FDbkM7SUFDTCxDQUFDOzs7Ozs7SUFFRCxnQkFBZ0IsQ0FBQyxJQUFVLEVBQUUsUUFBdUI7O1lBQzVDLFFBQVEsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQztRQUNyRCxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUNyRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsR0FBRyxRQUFRLENBQUMsQ0FBQztRQUN4QyxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDOzs7Ozs7SUFFRCxjQUFjLENBQUMsSUFBVSxFQUFFLFFBQXVCOztZQUMxQyxPQUFPLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxRQUFRLENBQUM7UUFDbkQsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDdkMsT0FBTyxPQUFPLENBQUM7SUFDbkIsQ0FBQzs7Ozs7SUFFRCxTQUFTLENBQUMsSUFBVTs7WUFDWixHQUFHLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDNUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDL0IsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxHQUFHLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7Ozs7OztJQUVELE9BQU8sQ0FBQyxJQUFVLEVBQUUsUUFBdUI7O1lBQ25DLFNBQVMsR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQzs7WUFDOUMsU0FBUyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDOztZQUNqRCxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUM7UUFDekMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNwQyxDQUFDOzs7Ozs7SUFFRCxlQUFlLENBQUMsQ0FBUyxFQUFFLENBQVM7O1lBQzVCLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDekIsT0FBTyxJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzdCLENBQUM7Ozs7O0lBRUQsV0FBVyxDQUFDLElBQUk7O1lBQ1IsR0FBRyxHQUFHLElBQUksSUFBSSxFQUFFOztZQUNoQixXQUFXLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ2hDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDekIsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNqQyxPQUFPLEdBQUcsQ0FBQyxPQUFPLEVBQUUsS0FBSyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDbkQsQ0FBQzs7Ozs7SUFFRCxXQUFXLENBQUMsSUFBSTtRQUNaLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQztJQUMzRCxDQUFDOzs7Ozs7SUFFRCxVQUFVLENBQUMsQ0FBTyxFQUFFLENBQU87UUFDdkIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDL0MsQ0FBQztDQUVKIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGxldCBEYXRlVXRpbHMgPSB7XG5cbiAgICBmaXJzdERheTogMSxcblxuICAgIGdldFdlZWtSYW5nZShkYXRlOiBEYXRlLCBmaXJzdERheT86IG51bWJlciB8IGFueSkge1xuICAgICAgICBsZXQgc3RhcnREYXRlID0gdGhpcy5nZXREYXRlU3RhcnRXZWVrKGRhdGUsIGZpcnN0RGF5KTtcbiAgICAgICAgbGV0IGVuZERhdGUgPSBuZXcgRGF0ZShzdGFydERhdGUpO1xuICAgICAgICBlbmREYXRlLnNldERhdGUoZW5kRGF0ZS5nZXREYXRlKCkgKyA2KTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN0YXJ0V2Vlazogc3RhcnREYXRlLFxuICAgICAgICAgICAgZW5kV2VlazogZW5kRGF0ZVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIGdldERheUluZGV4T25XZWVrKGRhdGU6IERhdGUsIGZpcnN0RGF5PzogbnVtYmVyIHwgYW55KTogbnVtYmVyIHtcbiAgICAgICAgLy8gRGVmYXVsdCBzdGFydCBkYXRlIG9uIG1vbmRheVxuICAgICAgICBpZiAoZmlyc3REYXkgPT09IHVuZGVmaW5lZCB8fCBmaXJzdERheSA8IDApIHtcbiAgICAgICAgICAgIGZpcnN0RGF5ID0gdGhpcy5maXJzdERheTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkYXRlLmdldERheSgpIDwgZmlyc3REYXkpIHtcbiAgICAgICAgICAgIHJldHVybiA3IC0gZGF0ZS5nZXREYXkoKSAtIGZpcnN0RGF5O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGRhdGUuZ2V0RGF5KCkgLSBmaXJzdERheTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBnZXREYXRlU3RhcnRXZWVrKGRhdGU6IERhdGUsIGZpcnN0RGF5PzogbnVtYmVyIHwgYW55KTogRGF0ZSB7XG4gICAgICAgIGxldCBkaXN0YW5jZSA9IHRoaXMuZ2V0RGF5SW5kZXhPbldlZWsoZGF0ZSwgZmlyc3REYXkpO1xuICAgICAgICBkYXRlID0gbmV3IERhdGUoZGF0ZS5nZXRGdWxsWWVhcigpLCBkYXRlLmdldE1vbnRoKCksIGRhdGUuZ2V0RGF0ZSgpKTtcbiAgICAgICAgZGF0ZS5zZXREYXRlKGRhdGUuZ2V0RGF0ZSgpIC0gZGlzdGFuY2UpO1xuICAgICAgICByZXR1cm4gZGF0ZTtcbiAgICB9LFxuXG4gICAgZ2V0RGF0ZUVuZFdlZWsoZGF0ZTogRGF0ZSwgZmlyc3REYXk/OiBudW1iZXIgfCBhbnkpOiBEYXRlIHtcbiAgICAgICAgbGV0IGVuZERhdGUgPSB0aGlzLmdldERhdGVTdGFydFdlZWsoZGF0ZSwgZmlyc3REYXkpO1xuICAgICAgICBlbmREYXRlLnNldERhdGUoZW5kRGF0ZS5nZXREYXRlKCkgKyA2KTtcbiAgICAgICAgcmV0dXJuIGVuZERhdGU7XG4gICAgfSxcblxuICAgIGRheU9mWWVhcihkYXRlOiBEYXRlKTogbnVtYmVyIHtcbiAgICAgICAgbGV0IGphbiA9IG5ldyBEYXRlKGRhdGUuZ2V0RnVsbFllYXIoKSwgMCwgMSk7XG4gICAgICAgIGphbi5zZXRUaW1lKGphbi5nZXRUaW1lKCkgLSAxKTtcbiAgICAgICAgcmV0dXJuIE1hdGguY2VpbCgoZGF0ZS5nZXRUaW1lKCkgLSBqYW4uZ2V0VGltZSgpKSAvIDg2NDAwMDAwKTtcbiAgICB9LFxuXG4gICAgZ2V0V2VlayhkYXRlOiBEYXRlLCBmaXJzdERheT86IG51bWJlciB8IGFueSk6IG51bWJlciB7XG4gICAgICAgIGxldCBzdGFydFllYXIgPSBuZXcgRGF0ZShkYXRlLmdldEZ1bGxZZWFyKCksIDAsIDEpO1xuICAgICAgICBsZXQgc3RhcnRXZWVrID0gdGhpcy5nZXREYXRlU3RhcnRXZWVrKGRhdGUsIGZpcnN0RGF5KTtcbiAgICAgICAgbGV0IGRheUluWWVhciA9IHRoaXMuZGF5T2ZZZWFyKHN0YXJ0V2Vlayk7XG4gICAgICAgIHJldHVybiBNYXRoLmNlaWwoZGF5SW5ZZWFyIC8gNyk7XG4gICAgfSxcblxuICAgIGdldERhdGVGcm9tV2Vlayh3OiBudW1iZXIsIHk6IG51bWJlcik6IERhdGUge1xuICAgICAgICBsZXQgZCA9ICgxICsgKHcgLSAxKSAqIDcpO1xuICAgICAgICByZXR1cm4gbmV3IERhdGUoeSwgMCwgZCk7XG4gICAgfSxcblxuICAgIGRhdGVJc1RvZGF5KGRhdGUpOiBib29sZWFuIHtcbiAgICAgICAgbGV0IG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgICAgIGxldCBjb21wYXJlRGF0ZSA9IG5ldyBEYXRlKGRhdGUpO1xuICAgICAgICBub3cuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG4gICAgICAgIGNvbXBhcmVEYXRlLnNldEhvdXJzKDAsIDAsIDAsIDApO1xuICAgICAgICByZXR1cm4gbm93LmdldFRpbWUoKSA9PT0gY29tcGFyZURhdGUuZ2V0VGltZSgpO1xuICAgIH0sXG5cbiAgICB3ZWVrSXNUb2RheShkYXRlKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFdlZWsoZGF0ZSkgPT09IHRoaXMuZ2V0V2VlayhuZXcgRGF0ZSgpKTtcbiAgICB9LFxuXG4gICAgaXNTYW1lV2VlayhhOiBEYXRlLCBiOiBEYXRlKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFdlZWsoYSkgPT09IHRoaXMuZ2V0V2VlayhiKTtcbiAgICB9XG5cbn07XG4iXX0=