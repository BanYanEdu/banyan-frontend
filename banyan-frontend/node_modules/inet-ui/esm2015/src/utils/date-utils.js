/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { DatePipe } from "@angular/common";
export class DateUtils {
    /**
     * @param {?} date
     * @param {?=} format
     * @return {?}
     */
    static format(date, format) {
        if (!format) {
            format = this.VN_DATETIME_FORMAT;
        }
        return this.datePipe.transform(date, format);
    }
}
DateUtils.datePipe = new DatePipe('en-US');
DateUtils.DATETIME_FORMAT = 'dd/MM/yyyy HH:mm';
DateUtils.VN_DATETIME_FORMAT = 'HH:mm dd/MM/yyyy';
DateUtils.DATE_FORMAT = 'dd/MM/yyyy';
DateUtils.TIME_FORMAT = 'HH:mm';
if (false) {
    /**
     * @type {?}
     * @private
     */
    DateUtils.datePipe;
    /** @type {?} */
    DateUtils.DATETIME_FORMAT;
    /** @type {?} */
    DateUtils.VN_DATETIME_FORMAT;
    /** @type {?} */
    DateUtils.DATE_FORMAT;
    /** @type {?} */
    DateUtils.TIME_FORMAT;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS11dGlscy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtdWkvIiwic291cmNlcyI6WyJzcmMvdXRpbHMvZGF0ZS11dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBRXpDLE1BQU0sT0FBTyxTQUFTOzs7Ozs7SUFPWCxNQUFNLENBQUMsTUFBTSxDQUFDLElBQTRCLEVBQUUsTUFBZTtRQUM5RCxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ1QsTUFBTSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztTQUNwQztRQUNELE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ2pELENBQUM7O0FBWGMsa0JBQVEsR0FBYSxJQUFJLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUM1Qyx5QkFBZSxHQUFHLGtCQUFrQixDQUFDO0FBQ3JDLDRCQUFrQixHQUFHLGtCQUFrQixDQUFDO0FBQ3hDLHFCQUFXLEdBQUcsWUFBWSxDQUFDO0FBQzNCLHFCQUFXLEdBQUcsT0FBTyxDQUFDOzs7Ozs7SUFKcEMsbUJBQTBEOztJQUMxRCwwQkFBbUQ7O0lBQ25ELDZCQUFzRDs7SUFDdEQsc0JBQXlDOztJQUN6QyxzQkFBb0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0RhdGVQaXBlfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XG5cbmV4cG9ydCBjbGFzcyBEYXRlVXRpbHMge1xuICAgIHByaXZhdGUgc3RhdGljIGRhdGVQaXBlOiBEYXRlUGlwZSA9IG5ldyBEYXRlUGlwZSgnZW4tVVMnKTtcbiAgICBwdWJsaWMgc3RhdGljIERBVEVUSU1FX0ZPUk1BVCA9ICdkZC9NTS95eXl5IEhIOm1tJztcbiAgICBwdWJsaWMgc3RhdGljIFZOX0RBVEVUSU1FX0ZPUk1BVCA9ICdISDptbSBkZC9NTS95eXl5JztcbiAgICBwdWJsaWMgc3RhdGljIERBVEVfRk9STUFUID0gJ2RkL01NL3l5eXknO1xuICAgIHB1YmxpYyBzdGF0aWMgVElNRV9GT1JNQVQgPSAnSEg6bW0nO1xuXG4gICAgcHVibGljIHN0YXRpYyBmb3JtYXQoZGF0ZTogRGF0ZSB8IG51bWJlciB8IHN0cmluZywgZm9ybWF0Pzogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKCFmb3JtYXQpIHtcbiAgICAgICAgICAgIGZvcm1hdCA9IHRoaXMuVk5fREFURVRJTUVfRk9STUFUO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGVQaXBlLnRyYW5zZm9ybShkYXRlLCBmb3JtYXQpO1xuICAgIH1cbn1cbiJdfQ==