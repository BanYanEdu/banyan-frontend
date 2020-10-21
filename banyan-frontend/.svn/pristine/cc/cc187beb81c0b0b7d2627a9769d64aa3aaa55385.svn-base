/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as moment_ from "moment";
/** @type {?} */
const moment = moment_;
moment.locale('vi');
export class CalendarUtils {
    /**
     * @param {?} data
     * @return {?}
     */
    static getRepeatText(data) {
        /** @type {?} */
        let display = '';
        for (let i = 0; i < CalendarUtils.repeatTypes.length; i++) {
            if (CalendarUtils.repeatTypes[i].value === data.rrmode) {
                display = CalendarUtils.repeatTypes[i].label;
            }
        }
        if (data.rrmode === 'WEEKLY') {
            display += ' - ' + CalendarUtils._getTextRepeatWeek(data.wkdays);
        }
        return display;
    }
    /**
     * @param {?} wkdays
     * @return {?}
     */
    static _getTextRepeatWeek(wkdays) {
        if (wkdays) {
            return CalendarUtils.weekDays.filter((/**
             * @param {?} day
             * @return {?}
             */
            day => {
                return wkdays.indexOf(day.value) > -1;
            })).map((/**
             * @param {?} day
             * @return {?}
             */
            day => {
                return day.title;
            })).join(', ');
        }
        return '';
    }
    /**
     * @param {?} date
     * @return {?}
     */
    static displayDay(date) {
        /** @type {?} */
        let str = moment(date).format('dddd, d MMMM');
        if (new Date().getFullYear() !== date.getFullYear()) {
            str += ' năm ' + date.getFullYear();
        }
        return str.slice(0, 1).toUpperCase() + str.slice(1);
    }
    /**
     * @param {?} date
     * @return {?}
     */
    static displayDate(date) {
        return moment(date).format('[Ngày] LL');
    }
    /**
     * @param {?} date
     * @return {?}
     */
    static displayWeek(date) {
        return moment(date).format('[Tuần] w [năm] Y');
    }
    /**
     * @param {?} date
     * @return {?}
     */
    static displayMonth(date) {
        return moment(date).format('[Tháng] MM [năm] Y');
    }
    /**
     * @param {?} date
     * @return {?}
     */
    static displayTime(date) {
        return moment(date).format('HH:mm');
    }
    /**
     * @param {?} element
     * @param {?} e
     * @param {?=} padding
     * @return {?}
     */
    static computePosByPoint(element, e, padding) {
        /** @type {?} */
        let bounds = element.getBoundingClientRect();
        /** @type {?} */
        let halfHeight = bounds.height / 2;
        /** @type {?} */
        let halfWidth = bounds.width / 2;
        /** @type {?} */
        let direction;
        /** @type {?} */
        let pos = {
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
        let deltaTop = e.pageY;
        /** @type {?} */
        let deltaBottom = innerHeight - e.pageX;
        /** @type {?} */
        let deltaLeft = e.pageX;
        /** @type {?} */
        let deltaRight = innerWidth - e.pageY;
        /** @type {?} */
        let deltaMax = Math.max(deltaTop, deltaRight, deltaBottom, deltaLeft);
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
    }
    /**
     * @param {?} element
     * @param {?} target
     * @param {?} jsEvent
     * @param {?=} padding
     * @return {?}
     */
    static computePosByTargetEl(element, target, jsEvent, padding) {
        /** @type {?} */
        let elementBounds = element.getBoundingClientRect();
        /** @type {?} */
        let targetBounds = target.getBoundingClientRect();
        /** @type {?} */
        let pos = {};
        /** @type {?} */
        let direction = {};
        padding = padding || 10;
        /** @type {?} */
        let deltaRect = {
            top: targetBounds.top,
            right: innerWidth - targetBounds.right,
            bottom: innerHeight - targetBounds.bottom,
            left: targetBounds.left
        };
        /** @type {?} */
        let maxX = Math.max(deltaRect.left, deltaRect.right);
        /** @type {?} */
        let maxY = Math.max(deltaRect.top, deltaRect.bottom);
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
            let targetHeight = innerHeight - deltaRect.bottom - deltaRect.top;
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
            let targetWidth = innerWidth - deltaRect.left - deltaRect.right;
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
    }
}
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
if (false) {
    /** @type {?} */
    CalendarUtils.repeatTypes;
    /** @type {?} */
    CalendarUtils.weekDays;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FsZW5kYXJVdGlscy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtY2FsZW5kYXIvIiwic291cmNlcyI6WyJzcmMvQ2FsZW5kYXJVdGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7O01BQzVCLE1BQU0sR0FBRyxPQUFPO0FBQ3RCLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7QUFFcEIsTUFBTSxPQUFPLGFBQWE7Ozs7O0lBaUJ0QixNQUFNLENBQUMsYUFBYSxDQUFDLElBQWU7O1lBQzVCLE9BQU8sR0FBRyxFQUFFO1FBQ2hCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxhQUFhLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN2RCxJQUFJLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ3BELE9BQU8sR0FBRyxhQUFhLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQzthQUNoRDtTQUNKO1FBQ0QsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLFFBQVEsRUFBRTtZQUMxQixPQUFPLElBQUssS0FBSyxHQUFHLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDckU7UUFDRCxPQUFPLE9BQU8sQ0FBQztJQUNuQixDQUFDOzs7OztJQUVELE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxNQUFnQjtRQUN0QyxJQUFJLE1BQU0sRUFBRTtZQUNSLE9BQU8sYUFBYSxDQUFDLFFBQVEsQ0FBQyxNQUFNOzs7O1lBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ3ZDLE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDMUMsQ0FB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QUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFDO0lBQzVDLEVBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUM7SUFDNUMsRUFBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBQztJQUM1QyxFQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFDO0NBQ2hELENBQUM7OztJQWRGLDBCQUlFOztJQUVGLHVCQVFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDYWxSZXBlYXR9IGZyb20gXCIuL3V0aWxzL21vZGVsL0NhbEV2ZW50XCI7XG5pbXBvcnQgKiBhcyBtb21lbnRfIGZyb20gXCJtb21lbnRcIjtcbmNvbnN0IG1vbWVudCA9IG1vbWVudF87XG5tb21lbnQubG9jYWxlKCd2aScpO1xuXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJVdGlscyB7XG4gICAgc3RhdGljIHJlcGVhdFR5cGVzID0gW1xuICAgICAgICB7bGFiZWw6ICdIw6BuZyBuZ8OgeScsIHZhbHVlOiAnREFJTFknfSxcbiAgICAgICAge2xhYmVsOiAnSMOgbmcgdHXhuqduJywgdmFsdWU6ICdXRUVLTFknfSxcbiAgICAgICAge2xhYmVsOiAnSMOgbmcgdGjDoW5nJywgdmFsdWU6ICdNT05USExZJ31cbiAgICBdO1xuXG4gICAgc3RhdGljIHdlZWtEYXlzID0gW1xuICAgICAgICB7bGFiZWw6ICdUMicsIHRpdGxlOiAnVGjhu6kgaGFpJywgdmFsdWU6ICdNTyd9LFxuICAgICAgICB7bGFiZWw6ICdUMycsIHRpdGxlOiAnVGjhu6kgYmEnLCB2YWx1ZTogJ1RVJ30sXG4gICAgICAgIHtsYWJlbDogJ1Q0JywgdGl0bGU6ICdUaOG7qSB0xrAnLCB2YWx1ZTogJ1dFJ30sXG4gICAgICAgIHtsYWJlbDogJ1Q1JywgdGl0bGU6ICdUaOG7qSBuxINtJywgdmFsdWU6ICdUSCd9LFxuICAgICAgICB7bGFiZWw6ICdUNicsIHRpdGxlOiAnVGjhu6kgc8OhdScsIHZhbHVlOiAnRlInfSxcbiAgICAgICAge2xhYmVsOiAnVDcnLCB0aXRsZTogJ1Ro4bupIGLhuqN5JywgdmFsdWU6ICdTQSd9LFxuICAgICAgICB7bGFiZWw6ICdDTicsIHRpdGxlOiAnQ2jhu6cgbmjhuq10JywgdmFsdWU6ICdTVSd9XG4gICAgXTtcblxuICAgIHN0YXRpYyBnZXRSZXBlYXRUZXh0KGRhdGE6IENhbFJlcGVhdCk6IHN0cmluZyB7XG4gICAgICAgIGxldCBkaXNwbGF5ID0gJyc7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgQ2FsZW5kYXJVdGlscy5yZXBlYXRUeXBlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKENhbGVuZGFyVXRpbHMucmVwZWF0VHlwZXNbaV0udmFsdWUgPT09IGRhdGEucnJtb2RlKSB7XG4gICAgICAgICAgICAgICAgZGlzcGxheSA9IENhbGVuZGFyVXRpbHMucmVwZWF0VHlwZXNbaV0ubGFiZWw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRhdGEucnJtb2RlID09PSAnV0VFS0xZJykge1xuICAgICAgICAgICAgZGlzcGxheSArPSAgJyAtICcgKyBDYWxlbmRhclV0aWxzLl9nZXRUZXh0UmVwZWF0V2VlayhkYXRhLndrZGF5cyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRpc3BsYXk7XG4gICAgfVxuXG4gICAgc3RhdGljIF9nZXRUZXh0UmVwZWF0V2Vlayh3a2RheXM6IHN0cmluZ1tdKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKHdrZGF5cykge1xuICAgICAgICAgICAgcmV0dXJuIENhbGVuZGFyVXRpbHMud2Vla0RheXMuZmlsdGVyKGRheSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHdrZGF5cy5pbmRleE9mKGRheS52YWx1ZSkgPiAtMTtcbiAgICAgICAgICAgIH0pLm1hcChkYXkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBkYXkudGl0bGU7XG4gICAgICAgICAgICB9KS5qb2luKCcsICcpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgICBzdGF0aWMgZGlzcGxheURheShkYXRlOiBEYXRlKSB7XG4gICAgICAgIGxldCBzdHIgPSBtb21lbnQoZGF0ZSkuZm9ybWF0KCdkZGRkLCBkIE1NTU0nKTtcbiAgICAgICAgaWYgKG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKSAhPT0gZGF0ZS5nZXRGdWxsWWVhcigpKSB7XG4gICAgICAgICAgICBzdHIgKz0gJyBuxINtICcgKyBkYXRlLmdldEZ1bGxZZWFyKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN0ci5zbGljZSgwLCAxKS50b1VwcGVyQ2FzZSgpICsgc3RyLnNsaWNlKDEpO1xuICAgIH1cblxuICAgIHN0YXRpYyBkaXNwbGF5RGF0ZShkYXRlOiBEYXRlKSB7XG4gICAgICAgIHJldHVybiBtb21lbnQoZGF0ZSkuZm9ybWF0KCdbTmfDoHldIExMJyk7XG4gICAgfVxuXG4gICAgc3RhdGljIGRpc3BsYXlXZWVrKGRhdGU6IERhdGUpIHtcbiAgICAgICAgcmV0dXJuIG1vbWVudChkYXRlKS5mb3JtYXQoJ1tUdeG6p25dIHcgW27Eg21dIFknKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZGlzcGxheU1vbnRoKGRhdGU6IERhdGUpIHtcbiAgICAgICAgcmV0dXJuIG1vbWVudChkYXRlKS5mb3JtYXQoJ1tUaMOhbmddIE1NIFtuxINtXSBZJyk7XG4gICAgfVxuXG4gICAgc3RhdGljIGRpc3BsYXlUaW1lKGRhdGU6IERhdGUpIHtcbiAgICAgICAgcmV0dXJuIG1vbWVudChkYXRlKS5mb3JtYXQoJ0hIOm1tJyk7XG4gICAgfVxuXG4gICAgc3RhdGljIGNvbXB1dGVQb3NCeVBvaW50KGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBlOiBNb3VzZUV2ZW50LCBwYWRkaW5nPzogbnVtYmVyKSB7XG4gICAgICAgIGxldCBib3VuZHMgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICBsZXQgaGFsZkhlaWdodCA9IGJvdW5kcy5oZWlnaHQgLyAyO1xuICAgICAgICBsZXQgaGFsZldpZHRoID0gYm91bmRzLndpZHRoIC8gMjtcbiAgICAgICAgbGV0IGRpcmVjdGlvbjtcbiAgICAgICAgbGV0IHBvczogYW55ID0ge1xuICAgICAgICAgICAgbGVmdDogZS54IC0gaGFsZldpZHRoLFxuICAgICAgICAgICAgdG9wOiBlLnkgLSBoYWxmSGVpZ2h0XG4gICAgICAgIH07XG5cbiAgICAgICAgcGFkZGluZyA9IHBhZGRpbmcgfHwgNTtcblxuICAgICAgICAvLyBQb3NpdGlvbiBvdXQgb2Ygd2lkdGhcbiAgICAgICAgaWYgKGlubmVyV2lkdGggPCBwb3MubGVmdCArIGJvdW5kcy53aWR0aCArIHBhZGRpbmcpIHtcbiAgICAgICAgICAgIHBvcy5sZWZ0ID0gaW5uZXJXaWR0aCAtIHBhZGRpbmcgLSBib3VuZHMud2lkdGg7XG4gICAgICAgIH0gZWxzZSBpZiAocG9zLmxlZnQgPCBwYWRkaW5nKSB7XG4gICAgICAgICAgICBwb3MubGVmdCA9IHBhZGRpbmc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBQb3NpdGlvbiBvdXQgb2YgaGVpZ2h0XG4gICAgICAgIGlmIChpbm5lckhlaWdodCA8IHBvcy50b3AgKyBib3VuZHMuaGVpZ2h0ICsgcGFkZGluZykge1xuICAgICAgICAgICAgcG9zLnRvcCA9IGlubmVySGVpZ2h0IC0gcGFkZGluZyAtIGJvdW5kcy5oZWlnaHQ7XG4gICAgICAgIH0gZWxzZSBpZiAocG9zLnRvcCA8IHBhZGRpbmcpIHtcbiAgICAgICAgICAgIHBvcy50b3AgPSBwYWRkaW5nO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRGV0ZWN0IGJlc3QgcG9zaXRpb25cbiAgICAgICAgbGV0IGRlbHRhVG9wID0gZS5wYWdlWTtcbiAgICAgICAgbGV0IGRlbHRhQm90dG9tID0gaW5uZXJIZWlnaHQgLSBlLnBhZ2VYO1xuICAgICAgICBsZXQgZGVsdGFMZWZ0ID0gZS5wYWdlWDtcbiAgICAgICAgbGV0IGRlbHRhUmlnaHQgPSBpbm5lcldpZHRoIC0gZS5wYWdlWTtcblxuICAgICAgICBsZXQgZGVsdGFNYXggPSBNYXRoLm1heChkZWx0YVRvcCwgZGVsdGFSaWdodCwgZGVsdGFCb3R0b20sIGRlbHRhTGVmdCk7XG5cbiAgICAgICAgc3dpdGNoIChkZWx0YU1heCkge1xuICAgICAgICAgICAgY2FzZSBkZWx0YVRvcDpcbiAgICAgICAgICAgICAgICBkaXJlY3Rpb24gPSAndG9wJztcbiAgICAgICAgICAgICAgICBwb3MudG9wIC09IGhhbGZIZWlnaHQgKyBwYWRkaW5nO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBkZWx0YUJvdHRvbTpcbiAgICAgICAgICAgICAgICBkaXJlY3Rpb24gPSAnYm90dG9tJztcbiAgICAgICAgICAgICAgICBwb3MudG9wICs9IGhhbGZIZWlnaHQgKyBwYWRkaW5nO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBkZWx0YUxlZnQ6XG4gICAgICAgICAgICAgICAgZGlyZWN0aW9uID0gJ2xlZnQnO1xuICAgICAgICAgICAgICAgIHBvcy5sZWZ0IC09IGhhbGZXaWR0aCArIHBhZGRpbmc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGRlbHRhUmlnaHQ6XG4gICAgICAgICAgICAgICAgZGlyZWN0aW9uID0gJ3JpZ2h0JztcbiAgICAgICAgICAgICAgICBwb3MubGVmdCArPSBoYWxmV2lkdGggKyBwYWRkaW5nO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGRpcmVjdGlvbjogZGlyZWN0aW9uLFxuICAgICAgICAgICAgcG9zaXRpb246IHBvcyxcbiAgICAgICAgICAgIGVsZW1lbnRCb3VuZHM6IGJvdW5kc1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIHN0YXRpYyBjb21wdXRlUG9zQnlUYXJnZXRFbChlbGVtZW50OiBIVE1MRWxlbWVudCwgdGFyZ2V0OiBIVE1MRWxlbWVudCwganNFdmVudDogTW91c2VFdmVudCwgcGFkZGluZz86IG51bWJlcikge1xuICAgICAgICBsZXQgZWxlbWVudEJvdW5kcyA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIGxldCB0YXJnZXRCb3VuZHMgPSB0YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIGxldCBwb3M6IGFueSA9IHt9O1xuICAgICAgICBsZXQgZGlyZWN0aW9uOiBhbnkgPSB7fTtcbiAgICAgICAgcGFkZGluZyA9IHBhZGRpbmcgfHwgMTA7XG5cbiAgICAgICAgbGV0IGRlbHRhUmVjdCA9IHtcbiAgICAgICAgICAgIHRvcDogdGFyZ2V0Qm91bmRzLnRvcCxcbiAgICAgICAgICAgIHJpZ2h0OiBpbm5lcldpZHRoIC0gdGFyZ2V0Qm91bmRzLnJpZ2h0LFxuICAgICAgICAgICAgYm90dG9tOiBpbm5lckhlaWdodCAtIHRhcmdldEJvdW5kcy5ib3R0b20sXG4gICAgICAgICAgICBsZWZ0OiB0YXJnZXRCb3VuZHMubGVmdFxuICAgICAgICB9O1xuICAgICAgICBsZXQgbWF4WCA9IE1hdGgubWF4KGRlbHRhUmVjdC5sZWZ0LCBkZWx0YVJlY3QucmlnaHQpO1xuICAgICAgICBsZXQgbWF4WSA9IE1hdGgubWF4KGRlbHRhUmVjdC50b3AsIGRlbHRhUmVjdC5ib3R0b20pO1xuXG4gICAgICAgIC8vIEdldCBjbGljayBwb2ludCB3aGVuIGxlZnQgYW5kIHJpZ2h0IG5vdCBlbm91Z2ggbW9kYWxcbiAgICAgICAgaWYgKGVsZW1lbnRCb3VuZHMud2lkdGggPiBtYXhYKSB7XG4gICAgICAgICAgICBkZWx0YVJlY3QubGVmdCA9IGpzRXZlbnQucGFnZVg7XG4gICAgICAgICAgICBkZWx0YVJlY3QucmlnaHQgPSBpbm5lcldpZHRoIC0ganNFdmVudC5wYWdlWDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEdldCBjbGljayBwb2ludCB3aGVuIHRvcCBhbmQgYm90dG9tIG5vdCBlbm91Z2ggbW9kYWxcbiAgICAgICAgaWYgKGVsZW1lbnRCb3VuZHMuaGVpZ2h0ID4gbWF4WSkge1xuICAgICAgICAgICAgZGVsdGFSZWN0LnRvcCA9IGpzRXZlbnQucGFnZVk7XG4gICAgICAgICAgICBkZWx0YVJlY3QuYm90dG9tID0gaW5uZXJIZWlnaHQgLSBqc0V2ZW50LnBhZ2VZO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gWCBkaXJlY3Rpb25cbiAgICAgICAgaWYgKGRlbHRhUmVjdC5sZWZ0ID4gZGVsdGFSZWN0LnJpZ2h0KSB7XG4gICAgICAgICAgICBkaXJlY3Rpb24ubGVmdCA9IHRydWU7XG4gICAgICAgICAgICBwb3MubGVmdCA9IGRlbHRhUmVjdC5sZWZ0IC0gZWxlbWVudEJvdW5kcy53aWR0aDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRpcmVjdGlvbi5yaWdodCA9IHRydWU7XG4gICAgICAgICAgICBwb3MubGVmdCA9IGlubmVyV2lkdGggLSBkZWx0YVJlY3QucmlnaHQ7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBZIGRpcmVjdGlvblxuICAgICAgICBpZiAoZGVsdGFSZWN0LnRvcCA+IGRlbHRhUmVjdC5ib3R0b20pIHtcbiAgICAgICAgICAgIGRpcmVjdGlvbi50b3AgPSB0cnVlO1xuICAgICAgICAgICAgcG9zLnRvcCA9IGRlbHRhUmVjdC50b3AgLSBlbGVtZW50Qm91bmRzLmhlaWdodDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRpcmVjdGlvbi5ib3R0b20gPSB0cnVlO1xuICAgICAgICAgICAgcG9zLnRvcCA9IGlubmVySGVpZ2h0IC0gZGVsdGFSZWN0LmJvdHRvbTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEJlc3QgZGltZW5zaW9uIHRvIGRpc3BsYXlcbiAgICAgICAgaWYgKG1heFggKiBlbGVtZW50Qm91bmRzLndpZHRoID4gbWF4WSAqIGVsZW1lbnRCb3VuZHMuaGVpZ2h0KSB7XG4gICAgICAgICAgICAvLyBCeSB4XG4gICAgICAgICAgICBsZXQgdGFyZ2V0SGVpZ2h0ID0gaW5uZXJIZWlnaHQgLSBkZWx0YVJlY3QuYm90dG9tIC0gZGVsdGFSZWN0LnRvcDtcbiAgICAgICAgICAgIGlmIChkaXJlY3Rpb24udG9wKSB7XG4gICAgICAgICAgICAgICAgcG9zLnRvcCArPSB0YXJnZXRIZWlnaHQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHBvcy50b3AgLT0gdGFyZ2V0SGVpZ2h0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gQnkgeVxuICAgICAgICAgICAgbGV0IHRhcmdldFdpZHRoID0gaW5uZXJXaWR0aCAtIGRlbHRhUmVjdC5sZWZ0IC0gZGVsdGFSZWN0LnJpZ2h0O1xuICAgICAgICAgICAgaWYgKGRpcmVjdGlvbi5sZWZ0KSB7XG4gICAgICAgICAgICAgICAgcG9zLmxlZnQgKz0gdGFyZ2V0V2lkdGg7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHBvcy5sZWZ0IC09IHRhcmdldFdpZHRoO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gT3V0IG9mIHdpZHRoXG4gICAgICAgIGlmIChwb3MubGVmdCA8IHBhZGRpbmcpIHtcbiAgICAgICAgICAgIHBvcy5sZWZ0ID0gcGFkZGluZztcbiAgICAgICAgfSBlbHNlIGlmIChwb3MubGVmdCArIGVsZW1lbnRCb3VuZHMud2lkdGggPiBpbm5lcldpZHRoKSB7XG4gICAgICAgICAgICBwb3MubGVmdCA9IGlubmVyV2lkdGggLSBlbGVtZW50Qm91bmRzLndpZHRoIC0gcGFkZGluZztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIE91dCBvZiBoZWlnaHRcbiAgICAgICAgaWYgKHBvcy50b3AgPCBwYWRkaW5nKSB7XG4gICAgICAgICAgICBwb3MudG9wID0gcGFkZGluZztcbiAgICAgICAgfSBlbHNlIGlmIChwb3MudG9wICsgZWxlbWVudEJvdW5kcy5oZWlnaHQgPiBpbm5lckhlaWdodCkge1xuICAgICAgICAgICAgcG9zLnRvcCA9IGlubmVySGVpZ2h0IC0gZWxlbWVudEJvdW5kcy5oZWlnaHQgLSBwYWRkaW5nO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY29tcHV0ZSB3aXRoIGRvY3VtZW50IHNjcm9sbFxuICAgICAgICBwb3MudG9wICs9IGRvY3VtZW50LnNjcm9sbGluZ0VsZW1lbnQuc2Nyb2xsVG9wO1xuICAgICAgICBwb3MubGVmdCArPSBkb2N1bWVudC5zY3JvbGxpbmdFbGVtZW50LnNjcm9sbExlZnQ7XG5cbiAgICAgICAgcmV0dXJuIHBvcztcbiAgICB9XG59XG4iXX0=