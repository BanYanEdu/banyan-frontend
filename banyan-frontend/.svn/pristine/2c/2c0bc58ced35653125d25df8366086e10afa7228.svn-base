/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
export var AjaxAPI = {
    getUrl: /**
     * @param {?} url
     * @param {?=} domain
     * @param {?=} firmPrefix
     * @return {?}
     */
    function (url, domain, firmPrefix) {
        if (url.indexOf('://') > -1)
            return url;
        domain = domain || iNet.getUrl('{0}');
        url = domain.replace('{0}', url);
        // Change firm prefix
        if (firmPrefix) {
            /** @type {?} */
            var urls = url.split('/');
            urls[4] = firmPrefix;
            url = urls.join('/');
        }
        return url;
    },
    // Get url by subfirm
    getPUrl: 
    // Get url by subfirm
    /**
     * @param {?} url
     * @param {?=} domain
     * @param {?=} firmPrefix
     * @return {?}
     */
    function (url, domain, firmPrefix) {
        return this.getUrl(url, domain, firmPrefix || iNet.firmPrefix);
    },
    // Send request
    sendRequest: 
    // Send request
    /**
     * @param {?} options
     * @return {?}
     */
    function (options) {
        return $.ajax(options);
    },
    // Post ajax by FormData
    postForm: 
    // Post ajax by FormData
    /**
     * @param {?} options
     * @return {?}
     */
    function (options) {
        options = $.extend({}, options, {
            type: 'post',
            cache: false,
            contentType: false,
            processData: false
        });
        // build form data
        if (options.data && options.data.toString().indexOf('FormData') < 0) {
            /** @type {?} */
            var form = new FormData();
            for (var k in options.data) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWpheEFQSS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtY2FsZW5kYXIvIiwic291cmNlcyI6WyJzcmMvdXRpbHMvY29tbW9uL0FqYXhBUEkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFHQSxNQUFNLEtBQUssT0FBTyxHQUFHO0lBRW5CLE1BQU07Ozs7OztjQUFFLEdBQVcsRUFBRSxNQUFlLEVBQUUsVUFBbUI7UUFDdkQsSUFBRyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN4QixPQUFPLEdBQUcsQ0FBQztRQUNiLE1BQU0sR0FBRyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN0QyxHQUFHLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFFakMscUJBQXFCO1FBQ3JCLElBQUksVUFBVSxFQUFFOztnQkFDVixJQUFJLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7WUFDekIsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLFVBQVUsQ0FBQztZQUNyQixHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUN0QjtRQUVELE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQUVELHFCQUFxQjtJQUNyQixPQUFPOzs7Ozs7OztjQUFFLEdBQVcsRUFBRSxNQUFlLEVBQUUsVUFBbUI7UUFDeEQsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsVUFBVSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBRUQsZUFBZTtJQUNmLFdBQVc7Ozs7OztjQUFFLE9BQVk7UUFDdkIsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFFRCx3QkFBd0I7SUFDeEIsUUFBUTs7Ozs7O2NBQUUsT0FBWTtRQUVwQixPQUFPLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsT0FBTyxFQUFFO1lBQzlCLElBQUksRUFBRSxNQUFNO1lBQ1osS0FBSyxFQUFFLEtBQUs7WUFDWixXQUFXLEVBQUUsS0FBSztZQUNsQixXQUFXLEVBQUUsS0FBSztTQUNuQixDQUFDLENBQUM7UUFFSCxrQkFBa0I7UUFDbEIsSUFBRyxPQUFPLENBQUMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsRUFBQzs7Z0JBQzNELElBQUksR0FBRyxJQUFJLFFBQVEsRUFBRTtZQUN6QixLQUFJLElBQUksQ0FBQyxJQUFJLE9BQU8sQ0FBQyxJQUFJLEVBQUM7Z0JBQ3hCLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNqQztZQUNELE9BQU8sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1NBQ3ZCO1FBRUQsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ25DLENBQUM7Q0FFRjs7QUFHRCxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRTtJQUNsQixPQUFPLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxVQUFVLENBQUM7Q0FDakQiLCJzb3VyY2VzQ29udGVudCI6WyJkZWNsYXJlIGxldCBpTmV0OiBhbnk7XG5kZWNsYXJlIGxldCAkOiBhbnk7XG5cbmV4cG9ydCBsZXQgQWpheEFQSSA9IHtcblxuICBnZXRVcmwgKHVybDogc3RyaW5nLCBkb21haW4/OiBzdHJpbmcsIGZpcm1QcmVmaXg/OiBzdHJpbmcpIHtcbiAgICBpZih1cmwuaW5kZXhPZignOi8vJykgPiAtMSlcbiAgICAgIHJldHVybiB1cmw7XG4gICAgZG9tYWluID0gZG9tYWluIHx8IGlOZXQuZ2V0VXJsKCd7MH0nKTtcbiAgICB1cmwgPSBkb21haW4ucmVwbGFjZSgnezB9JywgdXJsKTtcblxuICAgIC8vIENoYW5nZSBmaXJtIHByZWZpeFxuICAgIGlmIChmaXJtUHJlZml4KSB7XG4gICAgICBsZXQgdXJscyA9IHVybC5zcGxpdCgnLycpO1xuICAgICAgdXJsc1s0XSA9IGZpcm1QcmVmaXg7XG4gICAgICB1cmwgPSB1cmxzLmpvaW4oJy8nKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdXJsO1xuICB9LFxuXG4gIC8vIEdldCB1cmwgYnkgc3ViZmlybVxuICBnZXRQVXJsICh1cmw6IHN0cmluZywgZG9tYWluPzogc3RyaW5nLCBmaXJtUHJlZml4Pzogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0VXJsKHVybCwgZG9tYWluLCBmaXJtUHJlZml4IHx8IGlOZXQuZmlybVByZWZpeCk7XG4gIH0sXG5cbiAgLy8gU2VuZCByZXF1ZXN0XG4gIHNlbmRSZXF1ZXN0IChvcHRpb25zOiBhbnkpIHtcbiAgICByZXR1cm4gJC5hamF4KG9wdGlvbnMpO1xuICB9LFxuXG4gIC8vIFBvc3QgYWpheCBieSBGb3JtRGF0YVxuICBwb3N0Rm9ybSAob3B0aW9uczogYW55KSB7XG5cbiAgICBvcHRpb25zID0gJC5leHRlbmQoe30sIG9wdGlvbnMsIHtcbiAgICAgIHR5cGU6ICdwb3N0JyxcbiAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgIGNvbnRlbnRUeXBlOiBmYWxzZSxcbiAgICAgIHByb2Nlc3NEYXRhOiBmYWxzZVxuICAgIH0pO1xuXG4gICAgLy8gYnVpbGQgZm9ybSBkYXRhXG4gICAgaWYob3B0aW9ucy5kYXRhICYmIG9wdGlvbnMuZGF0YS50b1N0cmluZygpLmluZGV4T2YoJ0Zvcm1EYXRhJykgPCAwKXtcbiAgICAgICAgbGV0IGZvcm0gPSBuZXcgRm9ybURhdGEoKTtcbiAgICAgICAgZm9yKGxldCBrIGluIG9wdGlvbnMuZGF0YSl7XG4gICAgICAgICAgZm9ybS5hcHBlbmQoaywgb3B0aW9ucy5kYXRhW2tdKTtcbiAgICAgICAgfVxuICAgICAgICBvcHRpb25zLmRhdGEgPSBmb3JtO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnNlbmRSZXF1ZXN0KG9wdGlvbnMpO1xuICB9XG5cbn07XG5cbi8vIERldGVjdCBvbiBtb2JpbGVcbmlmICh3aW5kb3dbJ2VOZXQnXSkge1xuICBBamF4QVBJLnNlbmRSZXF1ZXN0ID0gd2luZG93WydlTmV0J10uYWpheFNlY3VyZTtcbn1cbiJdfQ==