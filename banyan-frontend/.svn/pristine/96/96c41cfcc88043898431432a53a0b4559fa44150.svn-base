/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
var NumberUtilsService = /** @class */ (function () {
    function NumberUtilsService() {
    }
    /**
     * @param {?} value
     * @return {?}
     */
    NumberUtilsService.prototype.isNumeric = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if ((undefined === value) || (null === value)) {
            return false;
        }
        if (typeof value === 'number') {
            return true;
        }
        if (!/^[0-9.,]+$/.test(value)) {
            return false;
        }
        if (!/^(?=.*\d)\d*[\.\,]?\d*$/.test(value)) {
            return false;
        }
        return !isNaN(parseFloat(value) - 0);
    };
    /**
     * @param {?} obj
     * @return {?}
     */
    NumberUtilsService.prototype.isObjectEmpty = /**
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
        return Object.keys(obj).length === 0 && obj.constructor === Object;
    };
    /**
     * @param {?} value
     * @param {?=} separator
     * @return {?}
     */
    NumberUtilsService.prototype.addSeparator = /**
     * @param {?} value
     * @param {?=} separator
     * @return {?}
     */
    function (value, separator) {
        if (separator === void 0) { separator = ','; }
        if (value && separator) {
            value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
        }
        return value;
    };
    /**
     * @param {?} value
     * @param {?=} separator
     * @return {?}
     */
    NumberUtilsService.prototype.removeSeparator = /**
     * @param {?} value
     * @param {?=} separator
     * @return {?}
     */
    function (value, separator) {
        if (separator === void 0) { separator = ','; }
        if (value && typeof value !== 'number') {
            switch (separator) {
                case ' ':
                    value = value.toString().replace(/[\s]/g, '');
                    break;
                case ',':
                    value = value.toString().replace(/\,/g, '');
                    break;
                default:
                    value = value.toString().replace(/separator/g, '');
                    break;
            }
        }
        return value;
    };
    NumberUtilsService.decorators = [
        { type: Injectable }
    ];
    return NumberUtilsService;
}());
export { NumberUtilsService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtYmVyLXV0aWxzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbmV0LXVpLyIsInNvdXJjZXMiOlsic3JjL251bWJlci1mb3JtYXQvbnVtYmVyLXV0aWxzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFekM7SUFBQTtJQStDQSxDQUFDOzs7OztJQTVDRyxzQ0FBUzs7OztJQUFULFVBQVUsS0FBSztRQUNYLElBQUksQ0FBQyxTQUFTLEtBQUssS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssS0FBSyxDQUFDLEVBQUU7WUFDM0MsT0FBTyxLQUFLLENBQUM7U0FDaEI7UUFDRCxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtZQUMzQixPQUFPLElBQUksQ0FBQztTQUNmO1FBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDM0IsT0FBTyxLQUFLLENBQUM7U0FDaEI7UUFDRCxJQUFJLENBQUMseUJBQXlCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3hDLE9BQU8sS0FBSyxDQUFDO1NBQ2hCO1FBQ0QsT0FBTyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDekMsQ0FBQzs7Ozs7SUFFRCwwQ0FBYTs7OztJQUFiLFVBQWMsR0FBRztRQUNiLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLEdBQUcsQ0FBQyxXQUFXLEtBQUssTUFBTSxDQUFDO0lBQ3ZFLENBQUM7Ozs7OztJQUVELHlDQUFZOzs7OztJQUFaLFVBQWEsS0FBSyxFQUFFLFNBQXVCO1FBQXZCLDBCQUFBLEVBQUEsZUFBdUI7UUFDdkMsSUFBSSxLQUFLLElBQUksU0FBUyxFQUFFO1lBQ3BCLEtBQUssR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsT0FBTyxDQUFDLHVCQUF1QixFQUFFLFNBQVMsQ0FBQyxDQUFDO1NBQ3hFO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQzs7Ozs7O0lBRUQsNENBQWU7Ozs7O0lBQWYsVUFBZ0IsS0FBSyxFQUFFLFNBQXVCO1FBQXZCLDBCQUFBLEVBQUEsZUFBdUI7UUFDMUMsSUFBSSxLQUFLLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO1lBQ3BDLFFBQVEsU0FBUyxFQUFFO2dCQUNmLEtBQUssR0FBRztvQkFDSixLQUFLLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUM7b0JBQzlDLE1BQU07Z0JBQ1YsS0FBSyxHQUFHO29CQUNKLEtBQUssR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztvQkFDNUMsTUFBTTtnQkFDVjtvQkFDSSxLQUFLLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUFDLENBQUM7b0JBQ25ELE1BQU07YUFDYjtTQUNKO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQzs7Z0JBN0NKLFVBQVU7O0lBK0NYLHlCQUFDO0NBQUEsQUEvQ0QsSUErQ0M7U0E5Q1ksa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE51bWJlclV0aWxzU2VydmljZSB7XG5cbiAgICBpc051bWVyaWModmFsdWUpOmJvb2xlYW4ge1xuICAgICAgICBpZiAoKHVuZGVmaW5lZCA9PT0gdmFsdWUpIHx8IChudWxsID09PSB2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCEvXlswLTkuLF0rJC8udGVzdCh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIS9eKD89LipcXGQpXFxkKltcXC5cXCxdP1xcZCokLy50ZXN0KHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAhaXNOYU4ocGFyc2VGbG9hdCh2YWx1ZSkgLSAwKTtcbiAgICB9XG5cbiAgICBpc09iamVjdEVtcHR5KG9iaik6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMob2JqKS5sZW5ndGggPT09IDAgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBPYmplY3Q7XG4gICAgfVxuXG4gICAgYWRkU2VwYXJhdG9yKHZhbHVlLCBzZXBhcmF0b3I6IHN0cmluZyA9ICcsJyk6IHN0cmluZyB7XG4gICAgICAgIGlmICh2YWx1ZSAmJiBzZXBhcmF0b3IpIHtcbiAgICAgICAgICAgIHZhbHVlID0gdmFsdWUudG9TdHJpbmcoKS5yZXBsYWNlKC9cXEIoPz0oXFxkezN9KSsoPyFcXGQpKS9nLCBzZXBhcmF0b3IpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICByZW1vdmVTZXBhcmF0b3IodmFsdWUsIHNlcGFyYXRvcjogc3RyaW5nID0gJywnKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoc2VwYXJhdG9yKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnICc6XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUudG9TdHJpbmcoKS5yZXBsYWNlKC9bXFxzXS9nLCAnJyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJywnOlxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLnRvU3RyaW5nKCkucmVwbGFjZSgvXFwsL2csICcnKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS50b1N0cmluZygpLnJlcGxhY2UoL3NlcGFyYXRvci9nLCAnJyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbn1cbiJdfQ==