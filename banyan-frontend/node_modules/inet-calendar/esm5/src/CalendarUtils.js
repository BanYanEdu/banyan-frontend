/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as moment_ from "moment";
/** @type {?} */
var moment = moment_;
moment.locale('vi');
var CalendarUtils = /** @class */ (function () {
    function CalendarUtils() {
    }
    /**
     * @param {?} data
     * @return {?}
     */
    CalendarUtils.getRepeatText = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        /** @type {?} */
        var display = '';
        for (var i = 0; i < CalendarUtils.repeatTypes.length; i++) {
            if (CalendarUtils.repeatTypes[i].value === data.rrmode) {
                display = CalendarUtils.repeatTypes[i].label;
            }
        }
        if (data.rrmode === 'WEEKLY') {
            display += ' - ' + CalendarUtils._getTextRepeatWeek(data.wkdays);
        }
        return display;
    };
    /**
     * @param {?} wkdays
     * @return {?}
     */
    CalendarUtils._getTextRepeatWeek = /**
     * @param {?} wkdays
     * @return {?}
     */
    function (wkdays) {
        if (wkdays) {
            return CalendarUtils.weekDays.filter((/**
             * @param {?} day
             * @return {?}
             */
            function (day) {
                return wkdays.indexOf(day.value) > -1;
            })).map((/**
             * @param {?} day
             * @return {?}
             */
            function (day) {
                return day.title;
            })).join(', ');
        }
        return '';
    };
    /**
     * @param {?} date
     * @return {?}
     */
    CalendarUtils.displayDay = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        /** @type {?} */
        var str = moment(date).format('dddd, d MMMM');
        if (new Date().getFullYear() !== date.getFullYear()) {
            str += ' năm ' + date.getFullYear();
        }
        return str.slice(0, 1).toUpperCase() + str.slice(1);
    };
    /**
     * @param {?} date
     * @return {?}
     */
    CalendarUtils.displayDate = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return moment(date).format('[Ngày] LL');
    };
    /**
     * @param {?} date
     * @return {?}
     */
    CalendarUtils.displayWeek = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return moment(date).format('[Tuần] w [năm] Y');
    };
    /**
     * @param {?} date
     * @return {?}
     */
    CalendarUtils.displayMonth = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return moment(date).format('[Tháng] MM [năm] Y');
    };
    /**
     * @param {?} date
     * @return {?}
     */
    CalendarUtils.displayTime = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return moment(date).format('HH:mm');
    };
    /**
     * @param {?} element
     * @param {?} e
     * @param {?=} padding
     * @return {?}
     */
    CalendarUtils.computePosByPoint = /**
     * @param {?} element
     * @param {?} e
     * @param {?=} padding
     * @return {?}
     */
    function (element, e, padding) {
        /** @type {?} */
        var bounds = element.getBoundingClientRect();
        /** @type {?} */
        var halfHeight = bounds.height / 2;
        /** @type {?} */
        var halfWidth = bounds.width / 2;
        /** @type {?} */
        var direction;
        /** @type {?} */
        var pos = {
            left: e.x - halfWidth,
            top: e.y - halfHeight
        };
        padding = padding || 5;
        // Position out of width
        if (innerWidth < pos.left + bounds.width + padding) {
            pos.left = innerWidth - padding - bounds.width;
        }
        else if (pos.left < padding) {
            pos.left = padding;
        }
        // Position out of height
        if (innerHeight < pos.top + bounds.height + padding) {
            pos.top = innerHeight - padding - bounds.height;
        }
        else if (pos.top < padding) {
            pos.top = padding;
        }
        // Detect best position
        /** @type {?} */
        var deltaTop = e.pageY;
        /** @type {?} */
        var deltaBottom = innerHeight - e.pageX;
        /** @type {?} */
        var deltaLeft = e.pageX;
        /** @type {?} */
        var deltaRight = innerWidth - e.pageY;
        /** @type {?} */
        var deltaMax = Math.max(deltaTop, deltaRight, deltaBottom, deltaLeft);
        switch (deltaMax) {
            case deltaTop:
                direction = 'top';
                pos.top -= halfHeight + padding;
                break;
            case deltaBottom:
                direction = 'bottom';
                pos.top += halfHeight + padding;
                break;
            case deltaLeft:
                direction = 'left';
                pos.left -= halfWidth + padding;
                break;
            case deltaRight:
                direction = 'right';
                pos.left += halfWidth + padding;
                break;
        }
        return {
            direction: direction,
            position: pos,
            elementBounds: bounds
        };
    };
    /**
     * @param {?} element
     * @param {?} target
     * @param {?} jsEvent
     * @param {?=} padding
     * @return {?}
     */
    CalendarUtils.computePosByTargetEl = /**
     * @param {?} element
     * @param {?} target
     * @param {?} jsEvent
     * @param {?=} padding
     * @return {?}
     */
    function (element, target, jsEvent, padding) {
        /** @type {?} */
        var elementBounds = element.getBoundingClientRect();
        /** @type {?} */
        var targetBounds = target.getBoundingClientRect();
        /** @type {?} */
        var pos = {};
        /** @type {?} */
        var direction = {};
        padding = padding || 10;
        /** @type {?} */
        var deltaRect = {
            top: targetBounds.top,
            right: innerWidth - targetBounds.right,
            bottom: innerHeight - targetBounds.bottom,
            left: targetBounds.left
        };
        /** @type {?} */
        var maxX = Math.max(deltaRect.left, deltaRect.right);
        /** @type {?} */
        var maxY = Math.max(deltaRect.top, deltaRect.bottom);
        // Get click point when left and right not enough modal
        if (elementBounds.width > maxX) {
            deltaRect.left = jsEvent.pageX;
            deltaRect.right = innerWidth - jsEvent.pageX;
        }
        // Get click point when top and bottom not enough modal
        if (elementBounds.height > maxY) {
            deltaRect.top = jsEvent.pageY;
            deltaRect.bottom = innerHeight - jsEvent.pageY;
        }
        // X direction
        if (deltaRect.left > deltaRect.right) {
            direction.left = true;
            pos.left = deltaRect.left - elementBounds.width;
        }
        else {
            direction.right = true;
            pos.left = innerWidth - deltaRect.right;
        }
        // Y direction
        if (deltaRect.top > deltaRect.bottom) {
            direction.top = true;
            pos.top = deltaRect.top - elementBounds.height;
        }
        else {
            direction.bottom = true;
            pos.top = innerHeight - deltaRect.bottom;
        }
        // Best dimension to display
        if (maxX * elementBounds.width > maxY * elementBounds.height) {
            // By x
            /** @type {?} */
            var targetHeight = innerHeight - deltaRect.bottom - deltaRect.top;
            if (direction.top) {
                pos.top += targetHeight;
            }
            else {
                pos.top -= targetHeight;
            }
        }
        else {
            // By y
            /** @type {?} */
            var targetWidth = innerWidth - deltaRect.left - deltaRect.right;
            if (direction.left) {
                pos.left += targetWidth;
            }
            else {
                pos.left -= targetWidth;
            }
        }
        // Out of width
        if (pos.left < padding) {
            pos.left = padding;
        }
        else if (pos.left + elementBounds.width > innerWidth) {
            pos.left = innerWidth - elementBounds.width - padding;
        }
        // Out of height
        if (pos.top < padding) {
            pos.top = padding;
        }
        else if (pos.top + elementBounds.height > innerHeight) {
            pos.top = innerHeight - elementBounds.height - padding;
        }
        // compute with document scroll
        pos.top += document.scrollingElement.scrollTop;
        pos.left += document.scrollingElement.scrollLeft;
        return pos;
    };
    CalendarUtils.repeatTypes = [
        { label: 'Hàng ngày', value: 'DAILY' },
        { label: 'Hàng tuần', value: 'WEEKLY' },
        { label: 'Hàng tháng', value: 'MONTHLY' }
    ];
    CalendarUtils.weekDays = [
        { label: 'T2', title: 'Thứ hai', value: 'MO' },
        { label: 'T3', title: 'Thứ ba', value: 'TU' },
        { label: 'T4', title: 'Thứ tư', value: 'WE' },
        { label: 'T5', title: 'Thứ năm', value: 'TH' },
        { label: 'T6', title: 'Thứ sáu', value: 'FR' },
        { label: 'T7', title: 'Thứ bảy', value: 'SA' },
        { label: 'CN', title: 'Chủ nhật', value: 'SU' }
    ];
    return CalendarUtils;
}());
export { CalendarUtils };
if (false) {
    /** @type {?} */
    CalendarUtils.repeatTypes;
    /** @type {?} */
    CalendarUtils.weekDays;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FsZW5kYXJVdGlscy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtY2FsZW5kYXIvIiwic291cmNlcyI6WyJzcmMvQ2FsZW5kYXJVdGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7O0lBQzVCLE1BQU0sR0FBRyxPQUFPO0FBQ3RCLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7QUFFcEI7SUFBQTtJQWtOQSxDQUFDOzs7OztJQWpNVSwyQkFBYTs7OztJQUFwQixVQUFxQixJQUFlOztZQUM1QixPQUFPLEdBQUcsRUFBRTtRQUNoQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsYUFBYSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDdkQsSUFBSSxhQUFhLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNwRCxPQUFPLEdBQUcsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7YUFDaEQ7U0FDSjtRQUNELElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxRQUFRLEVBQUU7WUFDMUIsT0FBTyxJQUFLLEtBQUssR0FBRyxhQUFhLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3JFO1FBQ0QsT0FBTyxPQUFPLENBQUM7SUFDbkIsQ0FBQzs7Ozs7SUFFTSxnQ0FBa0I7Ozs7SUFBekIsVUFBMEIsTUFBZ0I7UUFDdEMsSUFBSSxNQUFNLEVBQUU7WUFDUixPQUFPLGFBQWEsQ0FBQyxRQUFRLENBQUMsTUFBTTs7OztZQUFDLFVBQUEsR0FBRztnQkFDcEMsT0FBTyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUMxQyxDQUFDLEVB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QUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFDO1FBQzVDLEVBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUM7UUFDNUMsRUFBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBQztRQUM1QyxFQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFDO0tBQ2hELENBQUM7SUFtTU4sb0JBQUM7Q0FBQSxBQWxORCxJQWtOQztTQWxOWSxhQUFhOzs7SUFDdEIsMEJBSUU7O0lBRUYsdUJBUUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NhbFJlcGVhdH0gZnJvbSBcIi4vdXRpbHMvbW9kZWwvQ2FsRXZlbnRcIjtcbmltcG9ydCAqIGFzIG1vbWVudF8gZnJvbSBcIm1vbWVudFwiO1xuY29uc3QgbW9tZW50ID0gbW9tZW50Xztcbm1vbWVudC5sb2NhbGUoJ3ZpJyk7XG5cbmV4cG9ydCBjbGFzcyBDYWxlbmRhclV0aWxzIHtcbiAgICBzdGF0aWMgcmVwZWF0VHlwZXMgPSBbXG4gICAgICAgIHtsYWJlbDogJ0jDoG5nIG5nw6B5JywgdmFsdWU6ICdEQUlMWSd9LFxuICAgICAgICB7bGFiZWw6ICdIw6BuZyB0deG6p24nLCB2YWx1ZTogJ1dFRUtMWSd9LFxuICAgICAgICB7bGFiZWw6ICdIw6BuZyB0aMOhbmcnLCB2YWx1ZTogJ01PTlRITFknfVxuICAgIF07XG5cbiAgICBzdGF0aWMgd2Vla0RheXMgPSBbXG4gICAgICAgIHtsYWJlbDogJ1QyJywgdGl0bGU6ICdUaOG7qSBoYWknLCB2YWx1ZTogJ01PJ30sXG4gICAgICAgIHtsYWJlbDogJ1QzJywgdGl0bGU6ICdUaOG7qSBiYScsIHZhbHVlOiAnVFUnfSxcbiAgICAgICAge2xhYmVsOiAnVDQnLCB0aXRsZTogJ1Ro4bupIHTGsCcsIHZhbHVlOiAnV0UnfSxcbiAgICAgICAge2xhYmVsOiAnVDUnLCB0aXRsZTogJ1Ro4bupIG7Eg20nLCB2YWx1ZTogJ1RIJ30sXG4gICAgICAgIHtsYWJlbDogJ1Q2JywgdGl0bGU6ICdUaOG7qSBzw6F1JywgdmFsdWU6ICdGUid9LFxuICAgICAgICB7bGFiZWw6ICdUNycsIHRpdGxlOiAnVGjhu6kgYuG6o3knLCB2YWx1ZTogJ1NBJ30sXG4gICAgICAgIHtsYWJlbDogJ0NOJywgdGl0bGU6ICdDaOG7pyBuaOG6rXQnLCB2YWx1ZTogJ1NVJ31cbiAgICBdO1xuXG4gICAgc3RhdGljIGdldFJlcGVhdFRleHQoZGF0YTogQ2FsUmVwZWF0KTogc3RyaW5nIHtcbiAgICAgICAgbGV0IGRpc3BsYXkgPSAnJztcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBDYWxlbmRhclV0aWxzLnJlcGVhdFR5cGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoQ2FsZW5kYXJVdGlscy5yZXBlYXRUeXBlc1tpXS52YWx1ZSA9PT0gZGF0YS5ycm1vZGUpIHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5ID0gQ2FsZW5kYXJVdGlscy5yZXBlYXRUeXBlc1tpXS5sYWJlbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS5ycm1vZGUgPT09ICdXRUVLTFknKSB7XG4gICAgICAgICAgICBkaXNwbGF5ICs9ICAnIC0gJyArIENhbGVuZGFyVXRpbHMuX2dldFRleHRSZXBlYXRXZWVrKGRhdGEud2tkYXlzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGlzcGxheTtcbiAgICB9XG5cbiAgICBzdGF0aWMgX2dldFRleHRSZXBlYXRXZWVrKHdrZGF5czogc3RyaW5nW10pOiBzdHJpbmcge1xuICAgICAgICBpZiAod2tkYXlzKSB7XG4gICAgICAgICAgICByZXR1cm4gQ2FsZW5kYXJVdGlscy53ZWVrRGF5cy5maWx0ZXIoZGF5ID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gd2tkYXlzLmluZGV4T2YoZGF5LnZhbHVlKSA+IC0xO1xuICAgICAgICAgICAgfSkubWFwKGRheSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRheS50aXRsZTtcbiAgICAgICAgICAgIH0pLmpvaW4oJywgJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICAgIHN0YXRpYyBkaXNwbGF5RGF5KGRhdGU6IERhdGUpIHtcbiAgICAgICAgbGV0IHN0ciA9IG1vbWVudChkYXRlKS5mb3JtYXQoJ2RkZGQsIGQgTU1NTScpO1xuICAgICAgICBpZiAobmV3IERhdGUoKS5nZXRGdWxsWWVhcigpICE9PSBkYXRlLmdldEZ1bGxZZWFyKCkpIHtcbiAgICAgICAgICAgIHN0ciArPSAnIG7Eg20gJyArIGRhdGUuZ2V0RnVsbFllYXIoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3RyLnNsaWNlKDAsIDEpLnRvVXBwZXJDYXNlKCkgKyBzdHIuc2xpY2UoMSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGRpc3BsYXlEYXRlKGRhdGU6IERhdGUpIHtcbiAgICAgICAgcmV0dXJuIG1vbWVudChkYXRlKS5mb3JtYXQoJ1tOZ8OgeV0gTEwnKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZGlzcGxheVdlZWsoZGF0ZTogRGF0ZSkge1xuICAgICAgICByZXR1cm4gbW9tZW50KGRhdGUpLmZvcm1hdCgnW1R14bqnbl0gdyBbbsSDbV0gWScpO1xuICAgIH1cblxuICAgIHN0YXRpYyBkaXNwbGF5TW9udGgoZGF0ZTogRGF0ZSkge1xuICAgICAgICByZXR1cm4gbW9tZW50KGRhdGUpLmZvcm1hdCgnW1Row6FuZ10gTU0gW27Eg21dIFknKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZGlzcGxheVRpbWUoZGF0ZTogRGF0ZSkge1xuICAgICAgICByZXR1cm4gbW9tZW50KGRhdGUpLmZvcm1hdCgnSEg6bW0nKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgY29tcHV0ZVBvc0J5UG9pbnQoZWxlbWVudDogSFRNTEVsZW1lbnQsIGU6IE1vdXNlRXZlbnQsIHBhZGRpbmc/OiBudW1iZXIpIHtcbiAgICAgICAgbGV0IGJvdW5kcyA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIGxldCBoYWxmSGVpZ2h0ID0gYm91bmRzLmhlaWdodCAvIDI7XG4gICAgICAgIGxldCBoYWxmV2lkdGggPSBib3VuZHMud2lkdGggLyAyO1xuICAgICAgICBsZXQgZGlyZWN0aW9uO1xuICAgICAgICBsZXQgcG9zOiBhbnkgPSB7XG4gICAgICAgICAgICBsZWZ0OiBlLnggLSBoYWxmV2lkdGgsXG4gICAgICAgICAgICB0b3A6IGUueSAtIGhhbGZIZWlnaHRcbiAgICAgICAgfTtcblxuICAgICAgICBwYWRkaW5nID0gcGFkZGluZyB8fCA1O1xuXG4gICAgICAgIC8vIFBvc2l0aW9uIG91dCBvZiB3aWR0aFxuICAgICAgICBpZiAoaW5uZXJXaWR0aCA8IHBvcy5sZWZ0ICsgYm91bmRzLndpZHRoICsgcGFkZGluZykge1xuICAgICAgICAgICAgcG9zLmxlZnQgPSBpbm5lcldpZHRoIC0gcGFkZGluZyAtIGJvdW5kcy53aWR0aDtcbiAgICAgICAgfSBlbHNlIGlmIChwb3MubGVmdCA8IHBhZGRpbmcpIHtcbiAgICAgICAgICAgIHBvcy5sZWZ0ID0gcGFkZGluZztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFBvc2l0aW9uIG91dCBvZiBoZWlnaHRcbiAgICAgICAgaWYgKGlubmVySGVpZ2h0IDwgcG9zLnRvcCArIGJvdW5kcy5oZWlnaHQgKyBwYWRkaW5nKSB7XG4gICAgICAgICAgICBwb3MudG9wID0gaW5uZXJIZWlnaHQgLSBwYWRkaW5nIC0gYm91bmRzLmhlaWdodDtcbiAgICAgICAgfSBlbHNlIGlmIChwb3MudG9wIDwgcGFkZGluZykge1xuICAgICAgICAgICAgcG9zLnRvcCA9IHBhZGRpbmc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBEZXRlY3QgYmVzdCBwb3NpdGlvblxuICAgICAgICBsZXQgZGVsdGFUb3AgPSBlLnBhZ2VZO1xuICAgICAgICBsZXQgZGVsdGFCb3R0b20gPSBpbm5lckhlaWdodCAtIGUucGFnZVg7XG4gICAgICAgIGxldCBkZWx0YUxlZnQgPSBlLnBhZ2VYO1xuICAgICAgICBsZXQgZGVsdGFSaWdodCA9IGlubmVyV2lkdGggLSBlLnBhZ2VZO1xuXG4gICAgICAgIGxldCBkZWx0YU1heCA9IE1hdGgubWF4KGRlbHRhVG9wLCBkZWx0YVJpZ2h0LCBkZWx0YUJvdHRvbSwgZGVsdGFMZWZ0KTtcblxuICAgICAgICBzd2l0Y2ggKGRlbHRhTWF4KSB7XG4gICAgICAgICAgICBjYXNlIGRlbHRhVG9wOlxuICAgICAgICAgICAgICAgIGRpcmVjdGlvbiA9ICd0b3AnO1xuICAgICAgICAgICAgICAgIHBvcy50b3AgLT0gaGFsZkhlaWdodCArIHBhZGRpbmc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGRlbHRhQm90dG9tOlxuICAgICAgICAgICAgICAgIGRpcmVjdGlvbiA9ICdib3R0b20nO1xuICAgICAgICAgICAgICAgIHBvcy50b3AgKz0gaGFsZkhlaWdodCArIHBhZGRpbmc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGRlbHRhTGVmdDpcbiAgICAgICAgICAgICAgICBkaXJlY3Rpb24gPSAnbGVmdCc7XG4gICAgICAgICAgICAgICAgcG9zLmxlZnQgLT0gaGFsZldpZHRoICsgcGFkZGluZztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgZGVsdGFSaWdodDpcbiAgICAgICAgICAgICAgICBkaXJlY3Rpb24gPSAncmlnaHQnO1xuICAgICAgICAgICAgICAgIHBvcy5sZWZ0ICs9IGhhbGZXaWR0aCArIHBhZGRpbmc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZGlyZWN0aW9uOiBkaXJlY3Rpb24sXG4gICAgICAgICAgICBwb3NpdGlvbjogcG9zLFxuICAgICAgICAgICAgZWxlbWVudEJvdW5kczogYm91bmRzXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgc3RhdGljIGNvbXB1dGVQb3NCeVRhcmdldEVsKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCB0YXJnZXQ6IEhUTUxFbGVtZW50LCBqc0V2ZW50OiBNb3VzZUV2ZW50LCBwYWRkaW5nPzogbnVtYmVyKSB7XG4gICAgICAgIGxldCBlbGVtZW50Qm91bmRzID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgbGV0IHRhcmdldEJvdW5kcyA9IHRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgbGV0IHBvczogYW55ID0ge307XG4gICAgICAgIGxldCBkaXJlY3Rpb246IGFueSA9IHt9O1xuICAgICAgICBwYWRkaW5nID0gcGFkZGluZyB8fCAxMDtcblxuICAgICAgICBsZXQgZGVsdGFSZWN0ID0ge1xuICAgICAgICAgICAgdG9wOiB0YXJnZXRCb3VuZHMudG9wLFxuICAgICAgICAgICAgcmlnaHQ6IGlubmVyV2lkdGggLSB0YXJnZXRCb3VuZHMucmlnaHQsXG4gICAgICAgICAgICBib3R0b206IGlubmVySGVpZ2h0IC0gdGFyZ2V0Qm91bmRzLmJvdHRvbSxcbiAgICAgICAgICAgIGxlZnQ6IHRhcmdldEJvdW5kcy5sZWZ0XG4gICAgICAgIH07XG4gICAgICAgIGxldCBtYXhYID0gTWF0aC5tYXgoZGVsdGFSZWN0LmxlZnQsIGRlbHRhUmVjdC5yaWdodCk7XG4gICAgICAgIGxldCBtYXhZID0gTWF0aC5tYXgoZGVsdGFSZWN0LnRvcCwgZGVsdGFSZWN0LmJvdHRvbSk7XG5cbiAgICAgICAgLy8gR2V0IGNsaWNrIHBvaW50IHdoZW4gbGVmdCBhbmQgcmlnaHQgbm90IGVub3VnaCBtb2RhbFxuICAgICAgICBpZiAoZWxlbWVudEJvdW5kcy53aWR0aCA+IG1heFgpIHtcbiAgICAgICAgICAgIGRlbHRhUmVjdC5sZWZ0ID0ganNFdmVudC5wYWdlWDtcbiAgICAgICAgICAgIGRlbHRhUmVjdC5yaWdodCA9IGlubmVyV2lkdGggLSBqc0V2ZW50LnBhZ2VYO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gR2V0IGNsaWNrIHBvaW50IHdoZW4gdG9wIGFuZCBib3R0b20gbm90IGVub3VnaCBtb2RhbFxuICAgICAgICBpZiAoZWxlbWVudEJvdW5kcy5oZWlnaHQgPiBtYXhZKSB7XG4gICAgICAgICAgICBkZWx0YVJlY3QudG9wID0ganNFdmVudC5wYWdlWTtcbiAgICAgICAgICAgIGRlbHRhUmVjdC5ib3R0b20gPSBpbm5lckhlaWdodCAtIGpzRXZlbnQucGFnZVk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBYIGRpcmVjdGlvblxuICAgICAgICBpZiAoZGVsdGFSZWN0LmxlZnQgPiBkZWx0YVJlY3QucmlnaHQpIHtcbiAgICAgICAgICAgIGRpcmVjdGlvbi5sZWZ0ID0gdHJ1ZTtcbiAgICAgICAgICAgIHBvcy5sZWZ0ID0gZGVsdGFSZWN0LmxlZnQgLSBlbGVtZW50Qm91bmRzLndpZHRoO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGlyZWN0aW9uLnJpZ2h0ID0gdHJ1ZTtcbiAgICAgICAgICAgIHBvcy5sZWZ0ID0gaW5uZXJXaWR0aCAtIGRlbHRhUmVjdC5yaWdodDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFkgZGlyZWN0aW9uXG4gICAgICAgIGlmIChkZWx0YVJlY3QudG9wID4gZGVsdGFSZWN0LmJvdHRvbSkge1xuICAgICAgICAgICAgZGlyZWN0aW9uLnRvcCA9IHRydWU7XG4gICAgICAgICAgICBwb3MudG9wID0gZGVsdGFSZWN0LnRvcCAtIGVsZW1lbnRCb3VuZHMuaGVpZ2h0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGlyZWN0aW9uLmJvdHRvbSA9IHRydWU7XG4gICAgICAgICAgICBwb3MudG9wID0gaW5uZXJIZWlnaHQgLSBkZWx0YVJlY3QuYm90dG9tO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQmVzdCBkaW1lbnNpb24gdG8gZGlzcGxheVxuICAgICAgICBpZiAobWF4WCAqIGVsZW1lbnRCb3VuZHMud2lkdGggPiBtYXhZICogZWxlbWVudEJvdW5kcy5oZWlnaHQpIHtcbiAgICAgICAgICAgIC8vIEJ5IHhcbiAgICAgICAgICAgIGxldCB0YXJnZXRIZWlnaHQgPSBpbm5lckhlaWdodCAtIGRlbHRhUmVjdC5ib3R0b20gLSBkZWx0YVJlY3QudG9wO1xuICAgICAgICAgICAgaWYgKGRpcmVjdGlvbi50b3ApIHtcbiAgICAgICAgICAgICAgICBwb3MudG9wICs9IHRhcmdldEhlaWdodDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcG9zLnRvcCAtPSB0YXJnZXRIZWlnaHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBCeSB5XG4gICAgICAgICAgICBsZXQgdGFyZ2V0V2lkdGggPSBpbm5lcldpZHRoIC0gZGVsdGFSZWN0LmxlZnQgLSBkZWx0YVJlY3QucmlnaHQ7XG4gICAgICAgICAgICBpZiAoZGlyZWN0aW9uLmxlZnQpIHtcbiAgICAgICAgICAgICAgICBwb3MubGVmdCArPSB0YXJnZXRXaWR0aDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcG9zLmxlZnQgLT0gdGFyZ2V0V2lkdGg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBPdXQgb2Ygd2lkdGhcbiAgICAgICAgaWYgKHBvcy5sZWZ0IDwgcGFkZGluZykge1xuICAgICAgICAgICAgcG9zLmxlZnQgPSBwYWRkaW5nO1xuICAgICAgICB9IGVsc2UgaWYgKHBvcy5sZWZ0ICsgZWxlbWVudEJvdW5kcy53aWR0aCA+IGlubmVyV2lkdGgpIHtcbiAgICAgICAgICAgIHBvcy5sZWZ0ID0gaW5uZXJXaWR0aCAtIGVsZW1lbnRCb3VuZHMud2lkdGggLSBwYWRkaW5nO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gT3V0IG9mIGhlaWdodFxuICAgICAgICBpZiAocG9zLnRvcCA8IHBhZGRpbmcpIHtcbiAgICAgICAgICAgIHBvcy50b3AgPSBwYWRkaW5nO1xuICAgICAgICB9IGVsc2UgaWYgKHBvcy50b3AgKyBlbGVtZW50Qm91bmRzLmhlaWdodCA+IGlubmVySGVpZ2h0KSB7XG4gICAgICAgICAgICBwb3MudG9wID0gaW5uZXJIZWlnaHQgLSBlbGVtZW50Qm91bmRzLmhlaWdodCAtIHBhZGRpbmc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjb21wdXRlIHdpdGggZG9jdW1lbnQgc2Nyb2xsXG4gICAgICAgIHBvcy50b3AgKz0gZG9jdW1lbnQuc2Nyb2xsaW5nRWxlbWVudC5zY3JvbGxUb3A7XG4gICAgICAgIHBvcy5sZWZ0ICs9IGRvY3VtZW50LnNjcm9sbGluZ0VsZW1lbnQuc2Nyb2xsTGVmdDtcblxuICAgICAgICByZXR1cm4gcG9zO1xuICAgIH1cbn1cbiJdfQ==