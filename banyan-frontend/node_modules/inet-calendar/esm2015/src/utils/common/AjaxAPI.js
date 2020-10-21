/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
export let AjaxAPI = {
    /**
     * @param {?} url
     * @param {?=} domain
     * @param {?=} firmPrefix
     * @return {?}
     */
    getUrl(url, domain, firmPrefix) {
        if (url.indexOf('://') > -1)
            return url;
        domain = domain || iNet.getUrl('{0}');
        url = domain.replace('{0}', url);
        // Change firm prefix
        if (firmPrefix) {
            /** @type {?} */
            let urls = url.split('/');
            urls[4] = firmPrefix;
            url = urls.join('/');
        }
        return url;
    },
    // Get url by subfirm
    /**
     * @param {?} url
     * @param {?=} domain
     * @param {?=} firmPrefix
     * @return {?}
     */
    getPUrl(url, domain, firmPrefix) {
        return this.getUrl(url, domain, firmPrefix || iNet.firmPrefix);
    },
    // Send request
    /**
     * @param {?} options
     * @return {?}
     */
    sendRequest(options) {
        return $.ajax(options);
    },
    // Post ajax by FormData
    /**
     * @param {?} options
     * @return {?}
     */
    postForm(options) {
        options = $.extend({}, options, {
            type: 'post',
            cache: false,
            contentType: false,
            processData: false
        });
        // build form data
        if (options.data && options.data.toString().indexOf('FormData') < 0) {
            /** @type {?} */
            let form = new FormData();
            for (let k in options.data) {
                form.append(k, options.data[k]);
            }
            options.data = form;
        }
        return this.sendRequest(options);
    }
};
// Detect on mobile
if (window['eNet']) {
    AjaxAPI.sendRequest = window['eNet'].ajaxSecure;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWpheEFQSS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtY2FsZW5kYXIvIiwic291cmNlcyI6WyJzcmMvdXRpbHMvY29tbW9uL0FqYXhBUEkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFHQSxNQUFNLEtBQUssT0FBTyxHQUFHOzs7Ozs7O0lBRW5CLE1BQU0sQ0FBRSxHQUFXLEVBQUUsTUFBZSxFQUFFLFVBQW1CO1FBQ3ZELElBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDeEIsT0FBTyxHQUFHLENBQUM7UUFDYixNQUFNLEdBQUcsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdEMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBRWpDLHFCQUFxQjtRQUNyQixJQUFJLFVBQVUsRUFBRTs7Z0JBQ1YsSUFBSSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxVQUFVLENBQUM7WUFDckIsR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDdEI7UUFFRCxPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7Ozs7Ozs7O0lBR0QsT0FBTyxDQUFFLEdBQVcsRUFBRSxNQUFlLEVBQUUsVUFBbUI7UUFDeEQsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsVUFBVSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNqRSxDQUFDOzs7Ozs7SUFHRCxXQUFXLENBQUUsT0FBWTtRQUN2QixPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDekIsQ0FBQzs7Ozs7O0lBR0QsUUFBUSxDQUFFLE9BQVk7UUFFcEIsT0FBTyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRTtZQUM5QixJQUFJLEVBQUUsTUFBTTtZQUNaLEtBQUssRUFBRSxLQUFLO1lBQ1osV0FBVyxFQUFFLEtBQUs7WUFDbEIsV0FBVyxFQUFFLEtBQUs7U0FDbkIsQ0FBQyxDQUFDO1FBRUgsa0JBQWtCO1FBQ2xCLElBQUcsT0FBTyxDQUFDLElBQUksSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEVBQUM7O2dCQUMzRCxJQUFJLEdBQUcsSUFBSSxRQUFRLEVBQUU7WUFDekIsS0FBSSxJQUFJLENBQUMsSUFBSSxPQUFPLENBQUMsSUFBSSxFQUFDO2dCQUN4QixJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDakM7WUFDRCxPQUFPLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztTQUN2QjtRQUVELE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNuQyxDQUFDO0NBRUY7O0FBR0QsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUU7SUFDbEIsT0FBTyxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsVUFBVSxDQUFDO0NBQ2pEIiwic291cmNlc0NvbnRlbnQiOlsiZGVjbGFyZSBsZXQgaU5ldDogYW55O1xuZGVjbGFyZSBsZXQgJDogYW55O1xuXG5leHBvcnQgbGV0IEFqYXhBUEkgPSB7XG5cbiAgZ2V0VXJsICh1cmw6IHN0cmluZywgZG9tYWluPzogc3RyaW5nLCBmaXJtUHJlZml4Pzogc3RyaW5nKSB7XG4gICAgaWYodXJsLmluZGV4T2YoJzovLycpID4gLTEpXG4gICAgICByZXR1cm4gdXJsO1xuICAgIGRvbWFpbiA9IGRvbWFpbiB8fCBpTmV0LmdldFVybCgnezB9Jyk7XG4gICAgdXJsID0gZG9tYWluLnJlcGxhY2UoJ3swfScsIHVybCk7XG5cbiAgICAvLyBDaGFuZ2UgZmlybSBwcmVmaXhcbiAgICBpZiAoZmlybVByZWZpeCkge1xuICAgICAgbGV0IHVybHMgPSB1cmwuc3BsaXQoJy8nKTtcbiAgICAgIHVybHNbNF0gPSBmaXJtUHJlZml4O1xuICAgICAgdXJsID0gdXJscy5qb2luKCcvJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHVybDtcbiAgfSxcblxuICAvLyBHZXQgdXJsIGJ5IHN1YmZpcm1cbiAgZ2V0UFVybCAodXJsOiBzdHJpbmcsIGRvbWFpbj86IHN0cmluZywgZmlybVByZWZpeD86IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLmdldFVybCh1cmwsIGRvbWFpbiwgZmlybVByZWZpeCB8fCBpTmV0LmZpcm1QcmVmaXgpO1xuICB9LFxuXG4gIC8vIFNlbmQgcmVxdWVzdFxuICBzZW5kUmVxdWVzdCAob3B0aW9uczogYW55KSB7XG4gICAgcmV0dXJuICQuYWpheChvcHRpb25zKTtcbiAgfSxcblxuICAvLyBQb3N0IGFqYXggYnkgRm9ybURhdGFcbiAgcG9zdEZvcm0gKG9wdGlvbnM6IGFueSkge1xuXG4gICAgb3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCBvcHRpb25zLCB7XG4gICAgICB0eXBlOiAncG9zdCcsXG4gICAgICBjYWNoZTogZmFsc2UsXG4gICAgICBjb250ZW50VHlwZTogZmFsc2UsXG4gICAgICBwcm9jZXNzRGF0YTogZmFsc2VcbiAgICB9KTtcblxuICAgIC8vIGJ1aWxkIGZvcm0gZGF0YVxuICAgIGlmKG9wdGlvbnMuZGF0YSAmJiBvcHRpb25zLmRhdGEudG9TdHJpbmcoKS5pbmRleE9mKCdGb3JtRGF0YScpIDwgMCl7XG4gICAgICAgIGxldCBmb3JtID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgICAgIGZvcihsZXQgayBpbiBvcHRpb25zLmRhdGEpe1xuICAgICAgICAgIGZvcm0uYXBwZW5kKGssIG9wdGlvbnMuZGF0YVtrXSk7XG4gICAgICAgIH1cbiAgICAgICAgb3B0aW9ucy5kYXRhID0gZm9ybTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5zZW5kUmVxdWVzdChvcHRpb25zKTtcbiAgfVxuXG59O1xuXG4vLyBEZXRlY3Qgb24gbW9iaWxlXG5pZiAod2luZG93WydlTmV0J10pIHtcbiAgQWpheEFQSS5zZW5kUmVxdWVzdCA9IHdpbmRvd1snZU5ldCddLmFqYXhTZWN1cmU7XG59XG4iXX0=