/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
export class SubFirmDictionary {
    /**
     * @param {?} data
     * @param {?} callback
     * @return {?}
     */
    create(data, callback) {
        $.ajax({
            type: 'post',
            url: this.getUrl('subfirm/dictionary/create'),
            data: data,
            success: (/**
             * @param {?} data
             * @return {?}
             */
            (data) => callback(data)),
            error: (/**
             * @return {?}
             */
            () => callback(null))
        });
    }
    /**
     * @param {?} data
     * @param {?} callback
     * @return {?}
     */
    update(data, callback) {
        data.dictID = data.dictID || data.uuid;
        $.ajax({
            type: 'post',
            url: this.getUrl('subfirm/dictionary/update'),
            data: data,
            success: (/**
             * @param {?} data
             * @return {?}
             */
            (data) => callback(data)),
            error: (/**
             * @return {?}
             */
            () => callback(null))
        });
    }
    /**
     * @param {?} data
     * @param {?} callback
     * @return {?}
     */
    remove(data, callback) {
        data.dictID = data.dictID || data.uuid;
        $.ajax({
            url: this.getUrl('subfirm/dictionary/remove'),
            data: data,
            success: (/**
             * @param {?} data
             * @return {?}
             */
            (data) => callback(data)),
            error: (/**
             * @return {?}
             */
            () => callback(null))
        });
    }
    /**
     * @param {?} reference
     * @param {?} callback
     * @return {?}
     */
    list(reference, callback) {
        $.ajax({
            url: this.getUrl('subfirm/dictionary/list'),
            data: {
                reference: reference
            },
            success: (/**
             * @param {?} data
             * @return {?}
             */
            (data) => callback(data && data.items || [])),
            error: (/**
             * @return {?}
             */
            () => callback([]))
        });
    }
    /**
     * @param {?} url
     * @return {?}
     */
    getUrl(url) {
        return iNet.getPUrl(url);
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGljdGlvbmFyeS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtY2FsZW5kYXIvIiwic291cmNlcyI6WyJzcmMvdXRpbHMvc3ViZmlybS9EaWN0aW9uYXJ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFHQSxNQUFNLE9BQU8saUJBQWlCOzs7Ozs7SUFFMUIsTUFBTSxDQUFDLElBQW9CLEVBQUUsUUFBa0I7UUFDM0MsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNILElBQUksRUFBRSxNQUFNO1lBQ1osR0FBRyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsMkJBQTJCLENBQUM7WUFDN0MsSUFBSSxFQUFFLElBQUk7WUFDVixPQUFPOzs7O1lBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUNqQyxLQUFLOzs7WUFBRSxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUE7U0FDOUIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQzs7Ozs7O0lBRUQsTUFBTSxDQUFDLElBQW9CLEVBQUUsUUFBa0I7UUFDM0MsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDdkMsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNILElBQUksRUFBRSxNQUFNO1lBQ1osR0FBRyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsMkJBQTJCLENBQUM7WUFDN0MsSUFBSSxFQUFFLElBQUk7WUFDVixPQUFPOzs7O1lBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUNqQyxLQUFLOzs7WUFBRSxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUE7U0FDOUIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQzs7Ozs7O0lBRUQsTUFBTSxDQUFDLElBQW9CLEVBQUUsUUFBa0I7UUFDM0MsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDdkMsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNILEdBQUcsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLDJCQUEyQixDQUFDO1lBQzdDLElBQUksRUFBRSxJQUFJO1lBQ1YsT0FBTzs7OztZQUFFLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDakMsS0FBSzs7O1lBQUUsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFBO1NBQzlCLENBQUMsQ0FBQztJQUNQLENBQUM7Ozs7OztJQUVELElBQUksQ0FBQyxTQUFpQixFQUFFLFFBQWtCO1FBQ3RDLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDSCxHQUFHLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyx5QkFBeUIsQ0FBQztZQUMzQyxJQUFJLEVBQUU7Z0JBQ0YsU0FBUyxFQUFFLFNBQVM7YUFDdkI7WUFDRCxPQUFPOzs7O1lBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUMsQ0FBQTtZQUNyRCxLQUFLOzs7WUFBRSxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUE7U0FDNUIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQzs7Ozs7SUFHRCxNQUFNLENBQUMsR0FBVztRQUNkLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM3QixDQUFDO0NBRUo7Ozs7QUFFRCxvQ0FRQzs7O0lBUEcsZ0NBQWU7O0lBQ2YsOEJBQWE7O0lBQ2IsK0JBQWM7O0lBQ2QsbUNBQWtCOztJQUNsQiw4QkFBYTs7SUFDYiwrQkFBZTs7SUFDZiwrQkFBYyIsInNvdXJjZXNDb250ZW50IjpbImRlY2xhcmUgbGV0IGlOZXQ6IGFueTtcbmRlY2xhcmUgbGV0ICQ6IGFueTtcblxuZXhwb3J0IGNsYXNzIFN1YkZpcm1EaWN0aW9uYXJ5IHtcblxuICAgIGNyZWF0ZShkYXRhOiBEaWN0aW9uYXJ5RGF0YSwgY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB0eXBlOiAncG9zdCcsXG4gICAgICAgICAgICB1cmw6IHRoaXMuZ2V0VXJsKCdzdWJmaXJtL2RpY3Rpb25hcnkvY3JlYXRlJyksXG4gICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgc3VjY2VzczogKGRhdGEpID0+IGNhbGxiYWNrKGRhdGEpLFxuICAgICAgICAgICAgZXJyb3I6ICgpID0+IGNhbGxiYWNrKG51bGwpXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHVwZGF0ZShkYXRhOiBEaWN0aW9uYXJ5RGF0YSwgY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XG4gICAgICAgIGRhdGEuZGljdElEID0gZGF0YS5kaWN0SUQgfHwgZGF0YS51dWlkO1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdHlwZTogJ3Bvc3QnLFxuICAgICAgICAgICAgdXJsOiB0aGlzLmdldFVybCgnc3ViZmlybS9kaWN0aW9uYXJ5L3VwZGF0ZScpLFxuICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IChkYXRhKSA9PiBjYWxsYmFjayhkYXRhKSxcbiAgICAgICAgICAgIGVycm9yOiAoKSA9PiBjYWxsYmFjayhudWxsKVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZW1vdmUoZGF0YTogRGljdGlvbmFyeURhdGEsIGNhbGxiYWNrOiBGdW5jdGlvbikge1xuICAgICAgICBkYXRhLmRpY3RJRCA9IGRhdGEuZGljdElEIHx8IGRhdGEudXVpZDtcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogdGhpcy5nZXRVcmwoJ3N1YmZpcm0vZGljdGlvbmFyeS9yZW1vdmUnKSxcbiAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICBzdWNjZXNzOiAoZGF0YSkgPT4gY2FsbGJhY2soZGF0YSksXG4gICAgICAgICAgICBlcnJvcjogKCkgPT4gY2FsbGJhY2sobnVsbClcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbGlzdChyZWZlcmVuY2U6IHN0cmluZywgY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IHRoaXMuZ2V0VXJsKCdzdWJmaXJtL2RpY3Rpb25hcnkvbGlzdCcpLFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIHJlZmVyZW5jZTogcmVmZXJlbmNlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3VjY2VzczogKGRhdGEpID0+IGNhbGxiYWNrKGRhdGEgJiYgZGF0YS5pdGVtcyB8fCBbXSksXG4gICAgICAgICAgICBlcnJvcjogKCkgPT4gY2FsbGJhY2soW10pXG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgZ2V0VXJsKHVybDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGlOZXQuZ2V0UFVybCh1cmwpO1xuICAgIH1cblxufVxuXG5leHBvcnQgaW50ZXJmYWNlIERpY3Rpb25hcnlEYXRhIHtcbiAgICBkaWN0SUQ/OiBzdHJpbmcgLy8gdXVpZCB3aGVuIHVwZGF0ZVxuICAgIG5hbWU/OiBzdHJpbmdcbiAgICB2YWx1ZT86IHN0cmluZ1xuICAgIHJlZmVyZW5jZT86IHN0cmluZ1xuICAgIHV1aWQ/OiBzdHJpbmdcbiAgICBjYWNoZT86IGJvb2xlYW5cbiAgICBvcmRlcj86IG51bWJlclxufVxuIl19