import { dateEuroShortSorter } from './dateEuroShortSorter';
import { dateEuroSorter } from './dateEuroSorter';
import { dateIsoSorter } from './dateIsoSorter';
import { dateSorter } from './dateSorter';
import { dateUsShortSorter } from './dateUsShortSorter';
import { dateUsSorter } from './dateUsSorter';
import { numericSorter } from './numericSorter';
import { objectStringSorter } from './objectStringSorter';
import { stringSorter } from './stringSorter';
export var Sorters = {
    /** Sorter method to sort values by Date object type (uses Moment.js ISO_8601 standard format, optionally include time) */
    date: dateSorter,
    /**
     * Sorter method to sort values by Date formatted as ISO date (excluding time),
     * If you wish to optionally include time simply use the "Sorters.date" which work with/without time
     */
    dateIso: dateIsoSorter,
    /** Sorter method to sort values by Date formatted as Euro date (dd/mm/yyyy) */
    dateEuro: dateEuroSorter,
    /** Sorter method to sort values by Date formatted as Euro short date (d/m/yy) */
    dateEuroShort: dateEuroShortSorter,
    /** Sorter method to sort values by Date formatted as US date (mm/dd/yyyy) */
    dateUs: dateUsSorter,
    /** Sorter method to sort values by Date formatted as US short date (m/d/yy) */
    dateUsShort: dateUsShortSorter,
    /** Sorter method to sort values as numeric fields */
    numeric: numericSorter,
    /**
     * Sorter method to sort object values with a "dataKey" provided in your column definition, it's data content must be of type string
     * Example:
     * columnDef = { id='user', field: 'user', ..., dataKey: 'firstName', sorter: Sorters.objectString }
     * collection = [{ firstName: 'John', lastName: 'Doe' }, { firstName: 'Bob', lastName: 'Cash' }]
     */
    objectString: objectStringSorter,
    /** Sorter method to sort values as regular strings */
    string: stringSorter
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL3NvcnRlcnMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDNUQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNoRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQzFDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM5QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDaEQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDMUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTlDLE1BQU0sQ0FBQyxJQUFNLE9BQU8sR0FBRztJQUNyQiwwSEFBMEg7SUFDMUgsSUFBSSxFQUFFLFVBQVU7SUFFaEI7OztPQUdHO0lBQ0gsT0FBTyxFQUFFLGFBQWE7SUFFdEIsK0VBQStFO0lBQy9FLFFBQVEsRUFBRSxjQUFjO0lBRXhCLGlGQUFpRjtJQUNqRixhQUFhLEVBQUUsbUJBQW1CO0lBRWxDLDZFQUE2RTtJQUM3RSxNQUFNLEVBQUUsWUFBWTtJQUVwQiwrRUFBK0U7SUFDL0UsV0FBVyxFQUFFLGlCQUFpQjtJQUU5QixxREFBcUQ7SUFDckQsT0FBTyxFQUFFLGFBQWE7SUFFdEI7Ozs7O09BS0c7SUFDSCxZQUFZLEVBQUUsa0JBQWtCO0lBRWhDLHNEQUFzRDtJQUN0RCxNQUFNLEVBQUUsWUFBWTtDQUNyQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU29ydERpcmVjdGlvbk51bWJlciB9IGZyb20gJy4vLi4vbW9kZWxzL3NvcnREaXJlY3Rpb25OdW1iZXIuZW51bSc7XHJcbmltcG9ydCB7IGRhdGVFdXJvU2hvcnRTb3J0ZXIgfSBmcm9tICcuL2RhdGVFdXJvU2hvcnRTb3J0ZXInO1xyXG5pbXBvcnQgeyBkYXRlRXVyb1NvcnRlciB9IGZyb20gJy4vZGF0ZUV1cm9Tb3J0ZXInO1xyXG5pbXBvcnQgeyBkYXRlSXNvU29ydGVyIH0gZnJvbSAnLi9kYXRlSXNvU29ydGVyJztcclxuaW1wb3J0IHsgZGF0ZVNvcnRlciB9IGZyb20gJy4vZGF0ZVNvcnRlcic7XHJcbmltcG9ydCB7IGRhdGVVc1Nob3J0U29ydGVyIH0gZnJvbSAnLi9kYXRlVXNTaG9ydFNvcnRlcic7XHJcbmltcG9ydCB7IGRhdGVVc1NvcnRlciB9IGZyb20gJy4vZGF0ZVVzU29ydGVyJztcclxuaW1wb3J0IHsgbnVtZXJpY1NvcnRlciB9IGZyb20gJy4vbnVtZXJpY1NvcnRlcic7XHJcbmltcG9ydCB7IG9iamVjdFN0cmluZ1NvcnRlciB9IGZyb20gJy4vb2JqZWN0U3RyaW5nU29ydGVyJztcclxuaW1wb3J0IHsgc3RyaW5nU29ydGVyIH0gZnJvbSAnLi9zdHJpbmdTb3J0ZXInO1xyXG5cclxuZXhwb3J0IGNvbnN0IFNvcnRlcnMgPSB7XHJcbiAgLyoqIFNvcnRlciBtZXRob2QgdG8gc29ydCB2YWx1ZXMgYnkgRGF0ZSBvYmplY3QgdHlwZSAodXNlcyBNb21lbnQuanMgSVNPXzg2MDEgc3RhbmRhcmQgZm9ybWF0LCBvcHRpb25hbGx5IGluY2x1ZGUgdGltZSkgKi9cclxuICBkYXRlOiBkYXRlU29ydGVyLFxyXG5cclxuICAvKipcclxuICAgKiBTb3J0ZXIgbWV0aG9kIHRvIHNvcnQgdmFsdWVzIGJ5IERhdGUgZm9ybWF0dGVkIGFzIElTTyBkYXRlIChleGNsdWRpbmcgdGltZSksXHJcbiAgICogSWYgeW91IHdpc2ggdG8gb3B0aW9uYWxseSBpbmNsdWRlIHRpbWUgc2ltcGx5IHVzZSB0aGUgXCJTb3J0ZXJzLmRhdGVcIiB3aGljaCB3b3JrIHdpdGgvd2l0aG91dCB0aW1lXHJcbiAgICovXHJcbiAgZGF0ZUlzbzogZGF0ZUlzb1NvcnRlcixcclxuXHJcbiAgLyoqIFNvcnRlciBtZXRob2QgdG8gc29ydCB2YWx1ZXMgYnkgRGF0ZSBmb3JtYXR0ZWQgYXMgRXVybyBkYXRlIChkZC9tbS95eXl5KSAqL1xyXG4gIGRhdGVFdXJvOiBkYXRlRXVyb1NvcnRlcixcclxuXHJcbiAgLyoqIFNvcnRlciBtZXRob2QgdG8gc29ydCB2YWx1ZXMgYnkgRGF0ZSBmb3JtYXR0ZWQgYXMgRXVybyBzaG9ydCBkYXRlIChkL20veXkpICovXHJcbiAgZGF0ZUV1cm9TaG9ydDogZGF0ZUV1cm9TaG9ydFNvcnRlcixcclxuXHJcbiAgLyoqIFNvcnRlciBtZXRob2QgdG8gc29ydCB2YWx1ZXMgYnkgRGF0ZSBmb3JtYXR0ZWQgYXMgVVMgZGF0ZSAobW0vZGQveXl5eSkgKi9cclxuICBkYXRlVXM6IGRhdGVVc1NvcnRlcixcclxuXHJcbiAgLyoqIFNvcnRlciBtZXRob2QgdG8gc29ydCB2YWx1ZXMgYnkgRGF0ZSBmb3JtYXR0ZWQgYXMgVVMgc2hvcnQgZGF0ZSAobS9kL3l5KSAqL1xyXG4gIGRhdGVVc1Nob3J0OiBkYXRlVXNTaG9ydFNvcnRlcixcclxuXHJcbiAgLyoqIFNvcnRlciBtZXRob2QgdG8gc29ydCB2YWx1ZXMgYXMgbnVtZXJpYyBmaWVsZHMgKi9cclxuICBudW1lcmljOiBudW1lcmljU29ydGVyLFxyXG5cclxuICAvKipcclxuICAgKiBTb3J0ZXIgbWV0aG9kIHRvIHNvcnQgb2JqZWN0IHZhbHVlcyB3aXRoIGEgXCJkYXRhS2V5XCIgcHJvdmlkZWQgaW4geW91ciBjb2x1bW4gZGVmaW5pdGlvbiwgaXQncyBkYXRhIGNvbnRlbnQgbXVzdCBiZSBvZiB0eXBlIHN0cmluZ1xyXG4gICAqIEV4YW1wbGU6XHJcbiAgICogY29sdW1uRGVmID0geyBpZD0ndXNlcicsIGZpZWxkOiAndXNlcicsIC4uLiwgZGF0YUtleTogJ2ZpcnN0TmFtZScsIHNvcnRlcjogU29ydGVycy5vYmplY3RTdHJpbmcgfVxyXG4gICAqIGNvbGxlY3Rpb24gPSBbeyBmaXJzdE5hbWU6ICdKb2huJywgbGFzdE5hbWU6ICdEb2UnIH0sIHsgZmlyc3ROYW1lOiAnQm9iJywgbGFzdE5hbWU6ICdDYXNoJyB9XVxyXG4gICAqL1xyXG4gIG9iamVjdFN0cmluZzogb2JqZWN0U3RyaW5nU29ydGVyLFxyXG5cclxuICAvKiogU29ydGVyIG1ldGhvZCB0byBzb3J0IHZhbHVlcyBhcyByZWd1bGFyIHN0cmluZ3MgKi9cclxuICBzdHJpbmc6IHN0cmluZ1NvcnRlclxyXG59O1xyXG4iXX0=