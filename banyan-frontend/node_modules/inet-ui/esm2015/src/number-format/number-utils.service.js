/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
export class NumberUtilsService {
    /**
     * @param {?} value
     * @return {?}
     */
    isNumeric(value) {
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
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    isObjectEmpty(obj) {
        return Object.keys(obj).length === 0 && obj.constructor === Object;
    }
    /**
     * @param {?} value
     * @param {?=} separator
     * @return {?}
     */
    addSeparator(value, separator = ',') {
        if (value && separator) {
            value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
        }
        return value;
    }
    /**
     * @param {?} value
     * @param {?=} separator
     * @return {?}
     */
    removeSeparator(value, separator = ',') {
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
    }
}
NumberUtilsService.decorators = [
    { type: Injectable }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtYmVyLXV0aWxzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbmV0LXVpLyIsInNvdXJjZXMiOlsic3JjL251bWJlci1mb3JtYXQvbnVtYmVyLXV0aWxzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFHekMsTUFBTSxPQUFPLGtCQUFrQjs7Ozs7SUFFM0IsU0FBUyxDQUFDLEtBQUs7UUFDWCxJQUFJLENBQUMsU0FBUyxLQUFLLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLEtBQUssQ0FBQyxFQUFFO1lBQzNDLE9BQU8sS0FBSyxDQUFDO1NBQ2hCO1FBQ0QsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7WUFDM0IsT0FBTyxJQUFJLENBQUM7U0FDZjtRQUNELElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQzNCLE9BQU8sS0FBSyxDQUFDO1NBQ2hCO1FBQ0QsSUFBSSxDQUFDLHlCQUF5QixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUN4QyxPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUNELE9BQU8sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7Ozs7O0lBRUQsYUFBYSxDQUFDLEdBQUc7UUFDYixPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxHQUFHLENBQUMsV0FBVyxLQUFLLE1BQU0sQ0FBQztJQUN2RSxDQUFDOzs7Ozs7SUFFRCxZQUFZLENBQUMsS0FBSyxFQUFFLFlBQW9CLEdBQUc7UUFDdkMsSUFBSSxLQUFLLElBQUksU0FBUyxFQUFFO1lBQ3BCLEtBQUssR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsT0FBTyxDQUFDLHVCQUF1QixFQUFFLFNBQVMsQ0FBQyxDQUFDO1NBQ3hFO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQzs7Ozs7O0lBRUQsZUFBZSxDQUFDLEtBQUssRUFBRSxZQUFvQixHQUFHO1FBQzFDLElBQUksS0FBSyxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtZQUNwQyxRQUFRLFNBQVMsRUFBRTtnQkFDZixLQUFLLEdBQUc7b0JBQ0osS0FBSyxHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO29CQUM5QyxNQUFNO2dCQUNWLEtBQUssR0FBRztvQkFDSixLQUFLLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7b0JBQzVDLE1BQU07Z0JBQ1Y7b0JBQ0ksS0FBSyxHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQyxDQUFDO29CQUNuRCxNQUFNO2FBQ2I7U0FDSjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7OztZQTdDSixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE51bWJlclV0aWxzU2VydmljZSB7XG5cbiAgICBpc051bWVyaWModmFsdWUpOmJvb2xlYW4ge1xuICAgICAgICBpZiAoKHVuZGVmaW5lZCA9PT0gdmFsdWUpIHx8IChudWxsID09PSB2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCEvXlswLTkuLF0rJC8udGVzdCh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIS9eKD89LipcXGQpXFxkKltcXC5cXCxdP1xcZCokLy50ZXN0KHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAhaXNOYU4ocGFyc2VGbG9hdCh2YWx1ZSkgLSAwKTtcbiAgICB9XG5cbiAgICBpc09iamVjdEVtcHR5KG9iaik6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMob2JqKS5sZW5ndGggPT09IDAgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBPYmplY3Q7XG4gICAgfVxuXG4gICAgYWRkU2VwYXJhdG9yKHZhbHVlLCBzZXBhcmF0b3I6IHN0cmluZyA9ICcsJyk6IHN0cmluZyB7XG4gICAgICAgIGlmICh2YWx1ZSAmJiBzZXBhcmF0b3IpIHtcbiAgICAgICAgICAgIHZhbHVlID0gdmFsdWUudG9TdHJpbmcoKS5yZXBsYWNlKC9cXEIoPz0oXFxkezN9KSsoPyFcXGQpKS9nLCBzZXBhcmF0b3IpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICByZW1vdmVTZXBhcmF0b3IodmFsdWUsIHNlcGFyYXRvcjogc3RyaW5nID0gJywnKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoc2VwYXJhdG9yKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnICc6XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUudG9TdHJpbmcoKS5yZXBsYWNlKC9bXFxzXS9nLCAnJyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJywnOlxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLnRvU3RyaW5nKCkucmVwbGFjZSgvXFwsL2csICcnKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS50b1N0cmluZygpLnJlcGxhY2UoL3NlcGFyYXRvci9nLCAnJyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbn1cbiJdfQ==