/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as _moment from 'moment';
/** @type {?} */
const moment = _moment;
export class DateFormatter {
    /**
     * @param {?} date
     */
    constructor(date) {
        this.date = new Date(date);
    }
    /**
     * @return {?}
     */
    formatFullYear() {
        return moment(this.date).format('DD/MM/YYYY, H:mm');
    }
    /**
     * @return {?}
     */
    formatYear() {
        return moment(this.date).format('DD/MM/YYYY');
    }
    /**
     * @return {?}
     */
    formatMonth() {
        return moment(this.date).format('DD/MM, H:mm');
    }
    /**
     * @return {?}
     */
    formatDate() {
        return moment(this.date).format('DD/MM, H:mm');
    }
    /**
     * @return {?}
     */
    formatTime() {
        return moment(this.date).format('H:mm');
    }
    /**
     * @return {?}
     */
    format() {
        if (!this.date.getTime()) {
            return '';
        }
        /** @type {?} */
        const now = new Date();
        /** @type {?} */
        const conditions = {
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
    }
}
if (false) {
    /** @type {?} */
    DateFormatter.prototype.date;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0ZUZvcm1hdHRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtY2hhdC8iLCJzb3VyY2VzIjpbInNyYy9EYXRlRm9ybWF0dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEtBQUssT0FBTyxNQUFNLFFBQVEsQ0FBQzs7TUFDNUIsTUFBTSxHQUFHLE9BQU87QUFFdEIsTUFBTSxPQUFPLGFBQWE7Ozs7SUFHdEIsWUFBWSxJQUE0QjtRQUNwQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9CLENBQUM7Ozs7SUFFRCxjQUFjO1FBQ1YsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQ3hELENBQUM7Ozs7SUFFRCxVQUFVO1FBQ04sT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNsRCxDQUFDOzs7O0lBRUQsV0FBVztRQUNQLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDbkQsQ0FBQzs7OztJQUVELFVBQVU7UUFDTixPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ25ELENBQUM7Ozs7SUFFRCxVQUFVO1FBQ04sT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM1QyxDQUFDOzs7O0lBRUQsTUFBTTtRQUNGLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ3RCLE9BQU8sRUFBRSxDQUFDO1NBQ2I7O2NBQ0ssR0FBRyxHQUFHLElBQUksSUFBSSxFQUFFOztjQUNoQixVQUFVLEdBQUc7WUFDZixNQUFNLEVBQUUsR0FBRyxDQUFDLFdBQVcsRUFBRSxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ3JELE9BQU8sRUFBRSxHQUFHLENBQUMsUUFBUSxFQUFFLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDaEQsTUFBTSxFQUFFLEdBQUcsQ0FBQyxPQUFPLEVBQUUsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtTQUNoRDtRQUNELElBQUksVUFBVSxDQUFDLE1BQU0sSUFBSSxVQUFVLENBQUMsT0FBTyxJQUFJLFVBQVUsQ0FBQyxNQUFNLEVBQUU7WUFDOUQsT0FBTyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDNUI7UUFDRCxJQUFJLFVBQVUsQ0FBQyxNQUFNLElBQUksVUFBVSxDQUFDLE9BQU8sRUFBRTtZQUN6QyxPQUFPLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUM1QjtRQUNELElBQUksVUFBVSxDQUFDLE1BQU0sRUFBRTtZQUNuQixPQUFPLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUM3QjtRQUNELE9BQU8sSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQzdCLENBQUM7Q0FDSjs7O0lBL0NHLDZCQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgX21vbWVudCBmcm9tICdtb21lbnQnO1xuY29uc3QgbW9tZW50ID0gX21vbWVudDtcblxuZXhwb3J0IGNsYXNzIERhdGVGb3JtYXR0ZXIge1xuICAgIGRhdGU6IERhdGU7XG5cbiAgICBjb25zdHJ1Y3RvcihkYXRlOiBzdHJpbmcgfCBEYXRlIHwgbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuZGF0ZSA9IG5ldyBEYXRlKGRhdGUpO1xuICAgIH1cblxuICAgIGZvcm1hdEZ1bGxZZWFyKCkge1xuICAgICAgICByZXR1cm4gbW9tZW50KHRoaXMuZGF0ZSkuZm9ybWF0KCdERC9NTS9ZWVlZLCBIOm1tJyk7XG4gICAgfVxuXG4gICAgZm9ybWF0WWVhcigpIHtcbiAgICAgICAgcmV0dXJuIG1vbWVudCh0aGlzLmRhdGUpLmZvcm1hdCgnREQvTU0vWVlZWScpO1xuICAgIH1cblxuICAgIGZvcm1hdE1vbnRoKCkge1xuICAgICAgICByZXR1cm4gbW9tZW50KHRoaXMuZGF0ZSkuZm9ybWF0KCdERC9NTSwgSDptbScpO1xuICAgIH1cblxuICAgIGZvcm1hdERhdGUoKSB7XG4gICAgICAgIHJldHVybiBtb21lbnQodGhpcy5kYXRlKS5mb3JtYXQoJ0REL01NLCBIOm1tJyk7XG4gICAgfVxuXG4gICAgZm9ybWF0VGltZSgpIHtcbiAgICAgICAgcmV0dXJuIG1vbWVudCh0aGlzLmRhdGUpLmZvcm1hdCgnSDptbScpO1xuICAgIH1cblxuICAgIGZvcm1hdCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRhdGUuZ2V0VGltZSgpKSB7XG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcbiAgICAgICAgY29uc3QgY29uZGl0aW9ucyA9IHtcbiAgICAgICAgICAgIG9uWWVhcjogbm93LmdldEZ1bGxZZWFyKCkgPT09IHRoaXMuZGF0ZS5nZXRGdWxsWWVhcigpLFxuICAgICAgICAgICAgb25Nb250aDogbm93LmdldE1vbnRoKCkgPT09IHRoaXMuZGF0ZS5nZXRNb250aCgpLFxuICAgICAgICAgICAgb25EYXRlOiBub3cuZ2V0RGF0ZSgpID09PSB0aGlzLmRhdGUuZ2V0RGF0ZSgpLFxuICAgICAgICB9O1xuICAgICAgICBpZiAoY29uZGl0aW9ucy5vblllYXIgJiYgY29uZGl0aW9ucy5vbk1vbnRoICYmIGNvbmRpdGlvbnMub25EYXRlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5mb3JtYXRUaW1lKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvbmRpdGlvbnMub25ZZWFyICYmIGNvbmRpdGlvbnMub25Nb250aCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZm9ybWF0RGF0ZSgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb25kaXRpb25zLm9uWWVhcikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZm9ybWF0TW9udGgoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5mb3JtYXRZZWFyKCk7XG4gICAgfVxufSJdfQ==