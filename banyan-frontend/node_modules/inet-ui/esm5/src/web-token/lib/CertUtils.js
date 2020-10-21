/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var CertUtils = /** @class */ (function () {
    function CertUtils() {
    }
    /**
     * @param {?} subject
     * @return {?}
     */
    CertUtils.parseCertString = /**
     * @param {?} subject
     * @return {?}
     */
    function (subject) {
        /** @type {?} */
        var data = {};
        subject.split(',').forEach((/**
         * @param {?} str
         * @return {?}
         */
        function (str) {
            /** @type {?} */
            var values = str.trim().split('=');
            if (data[values[0]]) {
                data[values[0]] += ', ' + values[1];
            }
            else {
                data[values[0]] = values[1];
            }
        }));
        return data;
    };
    return CertUtils;
}());
export { CertUtils };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2VydFV0aWxzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC11aS8iLCJzb3VyY2VzIjpbInNyYy93ZWItdG9rZW4vbGliL0NlcnRVdGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUE7SUFBQTtJQWNBLENBQUM7Ozs7O0lBWlUseUJBQWU7Ozs7SUFBdEIsVUFBdUIsT0FBZTs7WUFDNUIsSUFBSSxHQUFRLEVBQUU7UUFDcEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPOzs7O1FBQUMsVUFBQyxHQUFHOztnQkFDckIsTUFBTSxHQUFHLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO1lBQ3BDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUNqQixJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUN2QztpQkFBTTtnQkFDSCxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQy9CO1FBQ0wsQ0FBQyxFQUFDLENBQUM7UUFDSCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBQ0wsZ0JBQUM7QUFBRCxDQUFDLEFBZEQsSUFjQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBDZXJ0VXRpbHMge1xyXG5cclxuICAgIHN0YXRpYyBwYXJzZUNlcnRTdHJpbmcoc3ViamVjdDogc3RyaW5nKSB7XHJcbiAgICAgICAgY29uc3QgZGF0YTogYW55ID0ge307XHJcbiAgICAgICAgc3ViamVjdC5zcGxpdCgnLCcpLmZvckVhY2goKHN0cikgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB2YWx1ZXMgPSBzdHIudHJpbSgpLnNwbGl0KCc9Jyk7XHJcbiAgICAgICAgICAgIGlmIChkYXRhW3ZhbHVlc1swXV0pIHtcclxuICAgICAgICAgICAgICAgIGRhdGFbdmFsdWVzWzBdXSArPSAnLCAnICsgdmFsdWVzWzFdO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZGF0YVt2YWx1ZXNbMF1dID0gdmFsdWVzWzFdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICB9XHJcbn0iXX0=