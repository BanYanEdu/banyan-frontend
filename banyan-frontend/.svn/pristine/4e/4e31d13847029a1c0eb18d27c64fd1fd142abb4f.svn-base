/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
export var DateUtils = {
    firstDay: 1,
    getWeekRange: /**
     * @param {?} date
     * @param {?=} firstDay
     * @return {?}
     */
    function (date, firstDay) {
        /** @type {?} */
        var startDate = this.getDateStartWeek(date, firstDay);
        /** @type {?} */
        var endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + 6);
        return {
            startWeek: startDate,
            endWeek: endDate
        };
    },
    getDayIndexOnWeek: /**
     * @param {?} date
     * @param {?=} firstDay
     * @return {?}
     */
    function (date, firstDay) {
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
    getDateStartWeek: /**
     * @param {?} date
     * @param {?=} firstDay
     * @return {?}
     */
    function (date, firstDay) {
        /** @type {?} */
        var distance = this.getDayIndexOnWeek(date, firstDay);
        date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        date.setDate(date.getDate() - distance);
        return date;
    },
    getDateEndWeek: /**
     * @param {?} date
     * @param {?=} firstDay
     * @return {?}
     */
    function (date, firstDay) {
        /** @type {?} */
        var endDate = this.getDateStartWeek(date, firstDay);
        endDate.setDate(endDate.getDate() + 6);
        return endDate;
    },
    dayOfYear: /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        /** @type {?} */
        var jan = new Date(date.getFullYear(), 0, 1);
        jan.setTime(jan.getTime() - 1);
        return Math.ceil((date.getTime() - jan.getTime()) / 86400000);
    },
    getWeek: /**
     * @param {?} date
     * @param {?=} firstDay
     * @return {?}
     */
    function (date, firstDay) {
        /** @type {?} */
        var startYear = new Date(date.getFullYear(), 0, 1);
        /** @type {?} */
        var startWeek = this.getDateStartWeek(date, firstDay);
        /** @type {?} */
        var dayInYear = this.dayOfYear(startWeek);
        return Math.ceil(dayInYear / 7);
    },
    getDateFromWeek: /**
     * @param {?} w
     * @param {?} y
     * @return {?}
     */
    function (w, y) {
        /** @type {?} */
        var d = (1 + (w - 1) * 7);
        return new Date(y, 0, d);
    },
    dateIsToday: /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        /** @type {?} */
        var now = new Date();
        /** @type {?} */
        var compareDate = new Date(date);
        now.setHours(0, 0, 0, 0);
        compareDate.setHours(0, 0, 0, 0);
        return now.getTime() === compareDate.getTime();
    },
    weekIsToday: /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this.getWeek(date) === this.getWeek(new Date());
    },
    isSameWeek: /**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    function (a, b) {
        return this.getWeek(a) === this.getWeek(b);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0ZVV0aWxzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC1jYWxlbmRhci8iLCJzb3VyY2VzIjpbInNyYy91dGlscy9jb21tb24vRGF0ZVV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsTUFBTSxLQUFLLFNBQVMsR0FBRztJQUVuQixRQUFRLEVBQUUsQ0FBQztJQUVYLFlBQVk7Ozs7O2NBQUMsSUFBVSxFQUFFLFFBQXVCOztZQUN4QyxTQUFTLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxRQUFRLENBQUM7O1lBQ2pELE9BQU8sR0FBRyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDakMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDdkMsT0FBTztZQUNILFNBQVMsRUFBRSxTQUFTO1lBQ3BCLE9BQU8sRUFBRSxPQUFPO1NBQ25CLENBQUE7SUFDTCxDQUFDO0lBRUQsaUJBQWlCOzs7OztJQUFqQixVQUFrQixJQUFVLEVBQUUsUUFBdUI7UUFDakQsK0JBQStCO1FBQy9CLElBQUksUUFBUSxLQUFLLFNBQVMsSUFBSSxRQUFRLEdBQUcsQ0FBQyxFQUFFO1lBQ3hDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1NBQzVCO1FBRUQsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsUUFBUSxFQUFFO1lBQzFCLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxRQUFRLENBQUM7U0FDdkM7YUFBTTtZQUNILE9BQU8sSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLFFBQVEsQ0FBQztTQUNuQztJQUNMLENBQUM7SUFFRCxnQkFBZ0I7Ozs7O0lBQWhCLFVBQWlCLElBQVUsRUFBRSxRQUF1Qjs7WUFDNUMsUUFBUSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDO1FBQ3JELElBQUks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XG5cbiAgICBnZXRXZWVrUmFuZ2UoZGF0ZTogRGF0ZSwgZmlyc3REYXk/OiBudW1iZXIgfCBhbnkpIHtcbiAgICAgICAgbGV0IHN0YXJ0RGF0ZSA9IHRoaXMuZ2V0RGF0ZVN0YXJ0V2VlayhkYXRlLCBmaXJzdERheSk7XG4gICAgICAgIGxldCBlbmREYXRlID0gbmV3IERhdGUoc3RhcnREYXRlKTtcbiAgICAgICAgZW5kRGF0ZS5zZXREYXRlKGVuZERhdGUuZ2V0RGF0ZSgpICsgNik7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzdGFydFdlZWs6IHN0YXJ0RGF0ZSxcbiAgICAgICAgICAgIGVuZFdlZWs6IGVuZERhdGVcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBnZXREYXlJbmRleE9uV2VlayhkYXRlOiBEYXRlLCBmaXJzdERheT86IG51bWJlciB8IGFueSk6IG51bWJlciB7XG4gICAgICAgIC8vIERlZmF1bHQgc3RhcnQgZGF0ZSBvbiBtb25kYXlcbiAgICAgICAgaWYgKGZpcnN0RGF5ID09PSB1bmRlZmluZWQgfHwgZmlyc3REYXkgPCAwKSB7XG4gICAgICAgICAgICBmaXJzdERheSA9IHRoaXMuZmlyc3REYXk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGF0ZS5nZXREYXkoKSA8IGZpcnN0RGF5KSB7XG4gICAgICAgICAgICByZXR1cm4gNyAtIGRhdGUuZ2V0RGF5KCkgLSBmaXJzdERheTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBkYXRlLmdldERheSgpIC0gZmlyc3REYXk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgZ2V0RGF0ZVN0YXJ0V2VlayhkYXRlOiBEYXRlLCBmaXJzdERheT86IG51bWJlciB8IGFueSk6IERhdGUge1xuICAgICAgICBsZXQgZGlzdGFuY2UgPSB0aGlzLmdldERheUluZGV4T25XZWVrKGRhdGUsIGZpcnN0RGF5KTtcbiAgICAgICAgZGF0ZSA9IG5ldyBEYXRlKGRhdGUuZ2V0RnVsbFllYXIoKSwgZGF0ZS5nZXRNb250aCgpLCBkYXRlLmdldERhdGUoKSk7XG4gICAgICAgIGRhdGUuc2V0RGF0ZShkYXRlLmdldERhdGUoKSAtIGRpc3RhbmNlKTtcbiAgICAgICAgcmV0dXJuIGRhdGU7XG4gICAgfSxcblxuICAgIGdldERhdGVFbmRXZWVrKGRhdGU6IERhdGUsIGZpcnN0RGF5PzogbnVtYmVyIHwgYW55KTogRGF0ZSB7XG4gICAgICAgIGxldCBlbmREYXRlID0gdGhpcy5nZXREYXRlU3RhcnRXZWVrKGRhdGUsIGZpcnN0RGF5KTtcbiAgICAgICAgZW5kRGF0ZS5zZXREYXRlKGVuZERhdGUuZ2V0RGF0ZSgpICsgNik7XG4gICAgICAgIHJldHVybiBlbmREYXRlO1xuICAgIH0sXG5cbiAgICBkYXlPZlllYXIoZGF0ZTogRGF0ZSk6IG51bWJlciB7XG4gICAgICAgIGxldCBqYW4gPSBuZXcgRGF0ZShkYXRlLmdldEZ1bGxZZWFyKCksIDAsIDEpO1xuICAgICAgICBqYW4uc2V0VGltZShqYW4uZ2V0VGltZSgpIC0gMSk7XG4gICAgICAgIHJldHVybiBNYXRoLmNlaWwoKGRhdGUuZ2V0VGltZSgpIC0gamFuLmdldFRpbWUoKSkgLyA4NjQwMDAwMCk7XG4gICAgfSxcblxuICAgIGdldFdlZWsoZGF0ZTogRGF0ZSwgZmlyc3REYXk/OiBudW1iZXIgfCBhbnkpOiBudW1iZXIge1xuICAgICAgICBsZXQgc3RhcnRZZWFyID0gbmV3IERhdGUoZGF0ZS5nZXRGdWxsWWVhcigpLCAwLCAxKTtcbiAgICAgICAgbGV0IHN0YXJ0V2VlayA9IHRoaXMuZ2V0RGF0ZVN0YXJ0V2VlayhkYXRlLCBmaXJzdERheSk7XG4gICAgICAgIGxldCBkYXlJblllYXIgPSB0aGlzLmRheU9mWWVhcihzdGFydFdlZWspO1xuICAgICAgICByZXR1cm4gTWF0aC5jZWlsKGRheUluWWVhciAvIDcpO1xuICAgIH0sXG5cbiAgICBnZXREYXRlRnJvbVdlZWsodzogbnVtYmVyLCB5OiBudW1iZXIpOiBEYXRlIHtcbiAgICAgICAgbGV0IGQgPSAoMSArICh3IC0gMSkgKiA3KTtcbiAgICAgICAgcmV0dXJuIG5ldyBEYXRlKHksIDAsIGQpO1xuICAgIH0sXG5cbiAgICBkYXRlSXNUb2RheShkYXRlKTogYm9vbGVhbiB7XG4gICAgICAgIGxldCBub3cgPSBuZXcgRGF0ZSgpO1xuICAgICAgICBsZXQgY29tcGFyZURhdGUgPSBuZXcgRGF0ZShkYXRlKTtcbiAgICAgICAgbm93LnNldEhvdXJzKDAsIDAsIDAsIDApO1xuICAgICAgICBjb21wYXJlRGF0ZS5zZXRIb3VycygwLCAwLCAwLCAwKTtcbiAgICAgICAgcmV0dXJuIG5vdy5nZXRUaW1lKCkgPT09IGNvbXBhcmVEYXRlLmdldFRpbWUoKTtcbiAgICB9LFxuXG4gICAgd2Vla0lzVG9kYXkoZGF0ZSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRXZWVrKGRhdGUpID09PSB0aGlzLmdldFdlZWsobmV3IERhdGUoKSk7XG4gICAgfSxcblxuICAgIGlzU2FtZVdlZWsoYTogRGF0ZSwgYjogRGF0ZSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRXZWVrKGEpID09PSB0aGlzLmdldFdlZWsoYik7XG4gICAgfVxuXG59O1xuIl19