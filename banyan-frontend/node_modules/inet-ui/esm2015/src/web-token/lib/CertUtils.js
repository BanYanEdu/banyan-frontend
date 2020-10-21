/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
export class CertUtils {
    /**
     * @param {?} subject
     * @return {?}
     */
    static parseCertString(subject) {
        /** @type {?} */
        const data = {};
        subject.split(',').forEach((/**
         * @param {?} str
         * @return {?}
         */
        (str) => {
            /** @type {?} */
            const values = str.trim().split('=');
            if (data[values[0]]) {
                data[values[0]] += ', ' + values[1];
            }
            else {
                data[values[0]] = values[1];
            }
        }));
        return data;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2VydFV0aWxzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC11aS8iLCJzb3VyY2VzIjpbInNyYy93ZWItdG9rZW4vbGliL0NlcnRVdGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsTUFBTSxPQUFPLFNBQVM7Ozs7O0lBRWxCLE1BQU0sQ0FBQyxlQUFlLENBQUMsT0FBZTs7Y0FDNUIsSUFBSSxHQUFRLEVBQUU7UUFDcEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPOzs7O1FBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTs7a0JBQ3pCLE1BQU0sR0FBRyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztZQUNwQyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDakIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDdkM7aUJBQU07Z0JBQ0gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUMvQjtRQUNMLENBQUMsRUFBQyxDQUFDO1FBQ0gsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztDQUNKIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIENlcnRVdGlscyB7XHJcblxyXG4gICAgc3RhdGljIHBhcnNlQ2VydFN0cmluZyhzdWJqZWN0OiBzdHJpbmcpIHtcclxuICAgICAgICBjb25zdCBkYXRhOiBhbnkgPSB7fTtcclxuICAgICAgICBzdWJqZWN0LnNwbGl0KCcsJykuZm9yRWFjaCgoc3RyKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlcyA9IHN0ci50cmltKCkuc3BsaXQoJz0nKTtcclxuICAgICAgICAgICAgaWYgKGRhdGFbdmFsdWVzWzBdXSkge1xyXG4gICAgICAgICAgICAgICAgZGF0YVt2YWx1ZXNbMF1dICs9ICcsICcgKyB2YWx1ZXNbMV07XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBkYXRhW3ZhbHVlc1swXV0gPSB2YWx1ZXNbMV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgIH1cclxufSJdfQ==