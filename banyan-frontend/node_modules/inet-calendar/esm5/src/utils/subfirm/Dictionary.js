/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var SubFirmDictionary = /** @class */ (function () {
    function SubFirmDictionary() {
    }
    /**
     * @param {?} data
     * @param {?} callback
     * @return {?}
     */
    SubFirmDictionary.prototype.create = /**
     * @param {?} data
     * @param {?} callback
     * @return {?}
     */
    function (data, callback) {
        $.ajax({
            type: 'post',
            url: this.getUrl('subfirm/dictionary/create'),
            data: data,
            success: (/**
             * @param {?} data
             * @return {?}
             */
            function (data) { return callback(data); }),
            error: (/**
             * @return {?}
             */
            function () { return callback(null); })
        });
    };
    /**
     * @param {?} data
     * @param {?} callback
     * @return {?}
     */
    SubFirmDictionary.prototype.update = /**
     * @param {?} data
     * @param {?} callback
     * @return {?}
     */
    function (data, callback) {
        data.dictID = data.dictID || data.uuid;
        $.ajax({
            type: 'post',
            url: this.getUrl('subfirm/dictionary/update'),
            data: data,
            success: (/**
             * @param {?} data
             * @return {?}
             */
            function (data) { return callback(data); }),
            error: (/**
             * @return {?}
             */
            function () { return callback(null); })
        });
    };
    /**
     * @param {?} data
     * @param {?} callback
     * @return {?}
     */
    SubFirmDictionary.prototype.remove = /**
     * @param {?} data
     * @param {?} callback
     * @return {?}
     */
    function (data, callback) {
        data.dictID = data.dictID || data.uuid;
        $.ajax({
            url: this.getUrl('subfirm/dictionary/remove'),
            data: data,
            success: (/**
             * @param {?} data
             * @return {?}
             */
            function (data) { return callback(data); }),
            error: (/**
             * @return {?}
             */
            function () { return callback(null); })
        });
    };
    /**
     * @param {?} reference
     * @param {?} callback
     * @return {?}
     */
    SubFirmDictionary.prototype.list = /**
     * @param {?} reference
     * @param {?} callback
     * @return {?}
     */
    function (reference, callback) {
        $.ajax({
            url: this.getUrl('subfirm/dictionary/list'),
            data: {
                reference: reference
            },
            success: (/**
             * @param {?} data
             * @return {?}
             */
            function (data) { return callback(data && data.items || []); }),
            error: (/**
             * @return {?}
             */
            function () { return callback([]); })
        });
    };
    /**
     * @param {?} url
     * @return {?}
     */
    SubFirmDictionary.prototype.getUrl = /**
     * @param {?} url
     * @return {?}
     */
    function (url) {
        return iNet.getPUrl(url);
    };
    return SubFirmDictionary;
}());
export { SubFirmDictionary };
/**
 * @record
 */
export function DictionaryData() { }
if (false) {
    /** @type {?|undefined} */
    DictionaryData.prototype.dictID;
    /** @type {?|undefined} */
    DictionaryData.prototype.name;
    /** @type {?|undefined} */
    DictionaryData.prototype.value;
    /** @type {?|undefined} */
    DictionaryData.prototype.reference;
    /** @type {?|undefined} */
    DictionaryData.prototype.uuid;
    /** @type {?|undefined} */
    DictionaryData.prototype.cache;
    /** @type {?|undefined} */
    DictionaryData.prototype.order;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGljdGlvbmFyeS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtY2FsZW5kYXIvIiwic291cmNlcyI6WyJzcmMvdXRpbHMvc3ViZmlybS9EaWN0aW9uYXJ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFHQTtJQUFBO0lBaURBLENBQUM7Ozs7OztJQS9DRyxrQ0FBTTs7Ozs7SUFBTixVQUFPLElBQW9CLEVBQUUsUUFBa0I7UUFDM0MsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNILElBQUksRUFBRSxNQUFNO1lBQ1osR0FBRyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsMkJBQTJCLENBQUM7WUFDN0MsSUFBSSxFQUFFLElBQUk7WUFDVixPQUFPOzs7O1lBQUUsVUFBQyxJQUFJLElBQUssT0FBQSxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQWQsQ0FBYyxDQUFBO1lBQ2pDLEtBQUs7OztZQUFFLGNBQU0sT0FBQSxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQWQsQ0FBYyxDQUFBO1NBQzlCLENBQUMsQ0FBQztJQUNQLENBQUM7Ozs7OztJQUVELGtDQUFNOzs7OztJQUFOLFVBQU8sSUFBb0IsRUFBRSxRQUFrQjtRQUMzQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQztRQUN2QyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ0gsSUFBSSxFQUFFLE1BQU07WUFDWixHQUFHLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQywyQkFBMkIsQ0FBQztZQUM3QyxJQUFJLEVBQUUsSUFBSTtZQUNWLE9BQU87Ozs7WUFBRSxVQUFDLElBQUksSUFBSyxPQUFBLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBZCxDQUFjLENBQUE7WUFDakMsS0FBSzs7O1lBQUUsY0FBTSxPQUFBLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBZCxDQUFjLENBQUE7U0FDOUIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQzs7Ozs7O0lBRUQsa0NBQU07Ozs7O0lBQU4sVUFBTyxJQUFvQixFQUFFLFFBQWtCO1FBQzNDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3ZDLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDSCxHQUFHLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQywyQkFBMkIsQ0FBQztZQUM3QyxJQUFJLEVBQUUsSUFBSTtZQUNWLE9BQU87Ozs7WUFBRSxVQUFDLElBQUksSUFBSyxPQUFBLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBZCxDQUFjLENBQUE7WUFDakMsS0FBSzs7O1lBQUUsY0FBTSxPQUFBLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBZCxDQUFjLENBQUE7U0FDOUIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQzs7Ozs7O0lBRUQsZ0NBQUk7Ozs7O0lBQUosVUFBSyxTQUFpQixFQUFFLFFBQWtCO1FBQ3RDLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDSCxHQUFHLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyx5QkFBeUIsQ0FBQztZQUMzQyxJQUFJLEVBQUU7Z0JBQ0YsU0FBUyxFQUFFLFNBQVM7YUFDdkI7WUFDRCxPQUFPOzs7O1lBQUUsVUFBQyxJQUFJLElBQUssT0FBQSxRQUFRLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDLEVBQWxDLENBQWtDLENBQUE7WUFDckQsS0FBSzs7O1lBQUUsY0FBTSxPQUFBLFFBQVEsQ0FBQyxFQUFFLENBQUMsRUFBWixDQUFZLENBQUE7U0FDNUIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQzs7Ozs7SUFHRCxrQ0FBTTs7OztJQUFOLFVBQU8sR0FBVztRQUNkLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRUwsd0JBQUM7QUFBRCxDQUFDLEFBakRELElBaURDOzs7OztBQUVELG9DQVFDOzs7SUFQRyxnQ0FBZTs7SUFDZiw4QkFBYTs7SUFDYiwrQkFBYzs7SUFDZCxtQ0FBa0I7O0lBQ2xCLDhCQUFhOztJQUNiLCtCQUFlOztJQUNmLCtCQUFjIiwic291cmNlc0NvbnRlbnQiOlsiZGVjbGFyZSBsZXQgaU5ldDogYW55O1xuZGVjbGFyZSBsZXQgJDogYW55O1xuXG5leHBvcnQgY2xhc3MgU3ViRmlybURpY3Rpb25hcnkge1xuXG4gICAgY3JlYXRlKGRhdGE6IERpY3Rpb25hcnlEYXRhLCBjYWxsYmFjazogRnVuY3Rpb24pIHtcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHR5cGU6ICdwb3N0JyxcbiAgICAgICAgICAgIHVybDogdGhpcy5nZXRVcmwoJ3N1YmZpcm0vZGljdGlvbmFyeS9jcmVhdGUnKSxcbiAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICBzdWNjZXNzOiAoZGF0YSkgPT4gY2FsbGJhY2soZGF0YSksXG4gICAgICAgICAgICBlcnJvcjogKCkgPT4gY2FsbGJhY2sobnVsbClcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdXBkYXRlKGRhdGE6IERpY3Rpb25hcnlEYXRhLCBjYWxsYmFjazogRnVuY3Rpb24pIHtcbiAgICAgICAgZGF0YS5kaWN0SUQgPSBkYXRhLmRpY3RJRCB8fCBkYXRhLnV1aWQ7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB0eXBlOiAncG9zdCcsXG4gICAgICAgICAgICB1cmw6IHRoaXMuZ2V0VXJsKCdzdWJmaXJtL2RpY3Rpb25hcnkvdXBkYXRlJyksXG4gICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgc3VjY2VzczogKGRhdGEpID0+IGNhbGxiYWNrKGRhdGEpLFxuICAgICAgICAgICAgZXJyb3I6ICgpID0+IGNhbGxiYWNrKG51bGwpXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbW92ZShkYXRhOiBEaWN0aW9uYXJ5RGF0YSwgY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XG4gICAgICAgIGRhdGEuZGljdElEID0gZGF0YS5kaWN0SUQgfHwgZGF0YS51dWlkO1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiB0aGlzLmdldFVybCgnc3ViZmlybS9kaWN0aW9uYXJ5L3JlbW92ZScpLFxuICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IChkYXRhKSA9PiBjYWxsYmFjayhkYXRhKSxcbiAgICAgICAgICAgIGVycm9yOiAoKSA9PiBjYWxsYmFjayhudWxsKVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBsaXN0KHJlZmVyZW5jZTogc3RyaW5nLCBjYWxsYmFjazogRnVuY3Rpb24pIHtcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogdGhpcy5nZXRVcmwoJ3N1YmZpcm0vZGljdGlvbmFyeS9saXN0JyksXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgcmVmZXJlbmNlOiByZWZlcmVuY2VcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdWNjZXNzOiAoZGF0YSkgPT4gY2FsbGJhY2soZGF0YSAmJiBkYXRhLml0ZW1zIHx8IFtdKSxcbiAgICAgICAgICAgIGVycm9yOiAoKSA9PiBjYWxsYmFjayhbXSlcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICBnZXRVcmwodXJsOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gaU5ldC5nZXRQVXJsKHVybCk7XG4gICAgfVxuXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGljdGlvbmFyeURhdGEge1xuICAgIGRpY3RJRD86IHN0cmluZyAvLyB1dWlkIHdoZW4gdXBkYXRlXG4gICAgbmFtZT86IHN0cmluZ1xuICAgIHZhbHVlPzogc3RyaW5nXG4gICAgcmVmZXJlbmNlPzogc3RyaW5nXG4gICAgdXVpZD86IHN0cmluZ1xuICAgIGNhY2hlPzogYm9vbGVhblxuICAgIG9yZGVyPzogbnVtYmVyXG59XG4iXX0=