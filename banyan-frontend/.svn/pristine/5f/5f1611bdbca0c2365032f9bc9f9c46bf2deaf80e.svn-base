/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 */
export class DataTableResource {
    /**
     * @param {?} items
     */
    constructor(items) {
        this.items = items;
    }
    /**
     * @param {?} params
     * @param {?=} filter
     * @return {?}
     */
    query(params, filter) {
        /** @type {?} */
        let result = [];
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
            (a, b) => {
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
        (resolve, reject) => {
            setTimeout((/**
             * @return {?}
             */
            () => resolve(result)));
        }));
    }
    /**
     * @return {?}
     */
    count() {
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            setTimeout((/**
             * @return {?}
             */
            () => resolve(this.items.length)));
        }));
    }
    /**
     * @param {?} v
     * @return {?}
     */
    setItems(v) {
        this.items = v;
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    DataTableResource.prototype.items;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS10YWJsZS1yZXNvdXJjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtdWkvIiwic291cmNlcyI6WyJzcmMvZ3JpZC9kYXRhc291cmNlL2RhdGEtdGFibGUtcmVzb3VyY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUdBLE1BQU0sT0FBTyxpQkFBaUI7Ozs7SUFFMUIsWUFBb0IsS0FBVTtRQUFWLFVBQUssR0FBTCxLQUFLLENBQUs7SUFBRyxDQUFDOzs7Ozs7SUFFbEMsS0FBSyxDQUFDLE1BQXVCLEVBQUUsTUFBd0Q7O1lBRS9FLE1BQU0sR0FBUSxFQUFFO1FBQ3BCLElBQUksTUFBTSxFQUFFO1lBQ1IsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3RDO2FBQU07WUFDSCxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLG1FQUFtRTtTQUNuRztRQUVELHFCQUFxQjtRQUNyQixNQUFNLENBQUMsSUFBSSxHQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFeEQsSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFO1lBQ2YsTUFBTSxDQUFDLElBQUk7Ozs7O1lBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ2pCLElBQUksT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLFFBQVEsRUFBRTtvQkFDdEMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7aUJBQzNEO3FCQUFNO29CQUNILE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2lCQUM5QztZQUNMLENBQUMsRUFBQyxDQUFDO1lBQ0gsSUFBSSxNQUFNLENBQUMsT0FBTyxLQUFLLEtBQUssRUFBRTtnQkFDMUIsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO2FBQ3BCO1NBQ0o7UUFDRCxJQUFJLE1BQU0sQ0FBQyxNQUFNLEtBQUssU0FBUyxFQUFFO1lBQzdCLElBQUksTUFBTSxDQUFDLEtBQUssS0FBSyxTQUFTLEVBQUU7Z0JBQzVCLE1BQU0sR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ3ZEO2lCQUFNO2dCQUNILE1BQU0sR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7YUFFdEU7U0FFSjtRQUVELE9BQU8sSUFBSSxPQUFPOzs7OztRQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ25DLFVBQVU7OztZQUFDLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBQyxDQUFDO1FBQ3RDLENBQUMsRUFBQyxDQUFDO0lBQ1AsQ0FBQzs7OztJQUVELEtBQUs7UUFDRCxPQUFPLElBQUksT0FBTzs7Ozs7UUFBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNuQyxVQUFVOzs7WUFBQyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBQyxDQUFDO1FBQ2pELENBQUMsRUFBQyxDQUFDO0lBRVAsQ0FBQzs7Ozs7SUFFRCxRQUFRLENBQUMsQ0FBTTtRQUNYLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO0lBQ25CLENBQUM7Q0FDSjs7Ozs7O0lBbkRlLGtDQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERhdGFUYWJsZVBhcmFtcyB9IGZyb20gJy4uL3R5cGVzL2RhdGEtdGFibGUtcGFyYW1zLnR5cGUnO1xuXG5cbmV4cG9ydCBjbGFzcyBEYXRhVGFibGVSZXNvdXJjZTxUPiB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGl0ZW1zOiBUW10pIHt9XG5cbiAgICBxdWVyeShwYXJhbXM6IERhdGFUYWJsZVBhcmFtcywgZmlsdGVyPzogKGl0ZW06IFQsIGluZGV4OiBudW1iZXIsIGl0ZW1zOiBUW10pID0+IGJvb2xlYW4pOiBQcm9taXNlPFRbXT4ge1xuXG4gICAgICAgIGxldCByZXN1bHQ6IFRbXSA9IFtdO1xuICAgICAgICBpZiAoZmlsdGVyKSB7XG4gICAgICAgICAgICByZXN1bHQgPSB0aGlzLml0ZW1zLmZpbHRlcihmaWx0ZXIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5pdGVtcy5zbGljZSgpOyAvLyBzaGFsbG93IGNvcHkgdG8gdXNlIGZvciBzb3J0aW5nIGluc3RlYWQgb2YgY2hhbmdpbmcgdGhlIG9yaWdpbmFsXG4gICAgICAgIH1cblxuICAgICAgICAvLyBVcGRhdGUgcGFnZSBudW1iZXJcbiAgICAgICAgcGFyYW1zLnBhZ2UgPSAgTWF0aC5mbG9vcihwYXJhbXMub2Zmc2V0IC8gcGFyYW1zLmxpbWl0KTtcblxuICAgICAgICBpZiAocGFyYW1zLnNvcnRCeSkge1xuICAgICAgICAgICAgcmVzdWx0LnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGFbcGFyYW1zLnNvcnRCeV0gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhW3BhcmFtcy5zb3J0QnldLmxvY2FsZUNvbXBhcmUoYltwYXJhbXMuc29ydEJ5XSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFbcGFyYW1zLnNvcnRCeV0gLSBiW3BhcmFtcy5zb3J0QnldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKHBhcmFtcy5zb3J0QXNjID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5yZXZlcnNlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBhcmFtcy5vZmZzZXQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYgKHBhcmFtcy5saW1pdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0LnNsaWNlKHBhcmFtcy5vZmZzZXQsIHJlc3VsdC5sZW5ndGgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSByZXN1bHQuc2xpY2UocGFyYW1zLm9mZnNldCwgcGFyYW1zLm9mZnNldCArIHBhcmFtcy5saW1pdCk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gcmVzb2x2ZShyZXN1bHQpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY291bnQoKTogUHJvbWlzZTxudW1iZXI+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gcmVzb2x2ZSh0aGlzLml0ZW1zLmxlbmd0aCkpO1xuICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIHNldEl0ZW1zKHY6IFRbXSkge1xuICAgICAgICB0aGlzLml0ZW1zID0gdjtcbiAgICB9XG59XG4iXX0=