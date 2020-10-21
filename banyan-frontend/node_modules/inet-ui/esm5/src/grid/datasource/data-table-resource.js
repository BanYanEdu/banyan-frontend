/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 */
var /**
 * @template T
 */
DataTableResource = /** @class */ (function () {
    function DataTableResource(items) {
        this.items = items;
    }
    /**
     * @param {?} params
     * @param {?=} filter
     * @return {?}
     */
    DataTableResource.prototype.query = /**
     * @param {?} params
     * @param {?=} filter
     * @return {?}
     */
    function (params, filter) {
        /** @type {?} */
        var result = [];
        if (filter) {
            result = this.items.filter(filter);
        }
        else {
            result = this.items.slice(); // shallow copy to use for sorting instead of changing the original
        }
        // Update page number
        params.page = Math.floor(params.offset / params.limit);
        if (params.sortBy) {
            result.sort((/**
             * @param {?} a
             * @param {?} b
             * @return {?}
             */
            function (a, b) {
                if (typeof a[params.sortBy] === 'string') {
                    return a[params.sortBy].localeCompare(b[params.sortBy]);
                }
                else {
                    return a[params.sortBy] - b[params.sortBy];
                }
            }));
            if (params.sortAsc === false) {
                result.reverse();
            }
        }
        if (params.offset !== undefined) {
            if (params.limit === undefined) {
                result = result.slice(params.offset, result.length);
            }
            else {
                result = result.slice(params.offset, params.offset + params.limit);
            }
        }
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            setTimeout((/**
             * @return {?}
             */
            function () { return resolve(result); }));
        }));
    };
    /**
     * @return {?}
     */
    DataTableResource.prototype.count = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            setTimeout((/**
             * @return {?}
             */
            function () { return resolve(_this.items.length); }));
        }));
    };
    /**
     * @param {?} v
     * @return {?}
     */
    DataTableResource.prototype.setItems = /**
     * @param {?} v
     * @return {?}
     */
    function (v) {
        this.items = v;
    };
    return DataTableResource;
}());
/**
 * @template T
 */
export { DataTableResource };
if (false) {
    /**
     * @type {?}
     * @private
     */
    DataTableResource.prototype.items;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS10YWJsZS1yZXNvdXJjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtdWkvIiwic291cmNlcyI6WyJzcmMvZ3JpZC9kYXRhc291cmNlL2RhdGEtdGFibGUtcmVzb3VyY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUdBOzs7O0lBRUksMkJBQW9CLEtBQVU7UUFBVixVQUFLLEdBQUwsS0FBSyxDQUFLO0lBQUcsQ0FBQzs7Ozs7O0lBRWxDLGlDQUFLOzs7OztJQUFMLFVBQU0sTUFBdUIsRUFBRSxNQUF3RDs7WUFFL0UsTUFBTSxHQUFRLEVBQUU7UUFDcEIsSUFBSSxNQUFNLEVBQUU7WUFDUixNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDdEM7YUFBTTtZQUNILE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsbUVBQW1FO1NBQ25HO1FBRUQscUJBQXFCO1FBQ3JCLE1BQU0sQ0FBQyxJQUFJLEdBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUV4RCxJQUFJLE1BQU0sQ0FBQyxNQUFNLEVBQUU7WUFDZixNQUFNLENBQUMsSUFBSTs7Ozs7WUFBQyxVQUFDLENBQUMsRUFBRSxDQUFDO2dCQUNiLElBQUksT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLFFBQVEsRUFBRTtvQkFDdEMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7aUJBQzNEO3FCQUFNO29CQUNILE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2lCQUM5QztZQUNMLENBQUMsRUFBQyxDQUFDO1lBQ0gsSUFBSSxNQUFNLENBQUMsT0FBTyxLQUFLLEtBQUssRUFBRTtnQkFDMUIsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO2FBQ3BCO1NBQ0o7UUFDRCxJQUFJLE1BQU0sQ0FBQyxNQUFNLEtBQUssU0FBUyxFQUFFO1lBQzdCLElBQUksTUFBTSxDQUFDLEtBQUssS0FBSyxTQUFTLEVBQUU7Z0JBQzVCLE1BQU0sR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ3ZEO2lCQUFNO2dCQUNILE1BQU0sR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7YUFFdEU7U0FFSjtRQUVELE9BQU8sSUFBSSxPQUFPOzs7OztRQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU07WUFDL0IsVUFBVTs7O1lBQUMsY0FBTSxPQUFBLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBZixDQUFlLEVBQUMsQ0FBQztRQUN0QyxDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7Ozs7SUFFRCxpQ0FBSzs7O0lBQUw7UUFBQSxpQkFLQztRQUpHLE9BQU8sSUFBSSxPQUFPOzs7OztRQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU07WUFDL0IsVUFBVTs7O1lBQUMsY0FBTSxPQUFBLE9BQU8sQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUExQixDQUEwQixFQUFDLENBQUM7UUFDakQsQ0FBQyxFQUFDLENBQUM7SUFFUCxDQUFDOzs7OztJQUVELG9DQUFROzs7O0lBQVIsVUFBUyxDQUFNO1FBQ1gsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7SUFDbkIsQ0FBQztJQUNMLHdCQUFDO0FBQUQsQ0FBQyxBQXJERCxJQXFEQzs7Ozs7Ozs7OztJQW5EZSxrQ0FBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEYXRhVGFibGVQYXJhbXMgfSBmcm9tICcuLi90eXBlcy9kYXRhLXRhYmxlLXBhcmFtcy50eXBlJztcblxuXG5leHBvcnQgY2xhc3MgRGF0YVRhYmxlUmVzb3VyY2U8VD4ge1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBpdGVtczogVFtdKSB7fVxuXG4gICAgcXVlcnkocGFyYW1zOiBEYXRhVGFibGVQYXJhbXMsIGZpbHRlcj86IChpdGVtOiBULCBpbmRleDogbnVtYmVyLCBpdGVtczogVFtdKSA9PiBib29sZWFuKTogUHJvbWlzZTxUW10+IHtcblxuICAgICAgICBsZXQgcmVzdWx0OiBUW10gPSBbXTtcbiAgICAgICAgaWYgKGZpbHRlcikge1xuICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5pdGVtcy5maWx0ZXIoZmlsdGVyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMuaXRlbXMuc2xpY2UoKTsgLy8gc2hhbGxvdyBjb3B5IHRvIHVzZSBmb3Igc29ydGluZyBpbnN0ZWFkIG9mIGNoYW5naW5nIHRoZSBvcmlnaW5hbFxuICAgICAgICB9XG5cbiAgICAgICAgLy8gVXBkYXRlIHBhZ2UgbnVtYmVyXG4gICAgICAgIHBhcmFtcy5wYWdlID0gIE1hdGguZmxvb3IocGFyYW1zLm9mZnNldCAvIHBhcmFtcy5saW1pdCk7XG5cbiAgICAgICAgaWYgKHBhcmFtcy5zb3J0QnkpIHtcbiAgICAgICAgICAgIHJlc3VsdC5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBhW3BhcmFtcy5zb3J0QnldID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYVtwYXJhbXMuc29ydEJ5XS5sb2NhbGVDb21wYXJlKGJbcGFyYW1zLnNvcnRCeV0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhW3BhcmFtcy5zb3J0QnldIC0gYltwYXJhbXMuc29ydEJ5XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChwYXJhbXMuc29ydEFzYyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQucmV2ZXJzZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChwYXJhbXMub2Zmc2V0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmIChwYXJhbXMubGltaXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdC5zbGljZShwYXJhbXMub2Zmc2V0LCByZXN1bHQubGVuZ3RoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0LnNsaWNlKHBhcmFtcy5vZmZzZXQsIHBhcmFtcy5vZmZzZXQgKyBwYXJhbXMubGltaXQpO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHJlc29sdmUocmVzdWx0KSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvdW50KCk6IFByb21pc2U8bnVtYmVyPiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHJlc29sdmUodGhpcy5pdGVtcy5sZW5ndGgpKTtcbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICBzZXRJdGVtcyh2OiBUW10pIHtcbiAgICAgICAgdGhpcy5pdGVtcyA9IHY7XG4gICAgfVxufVxuIl19