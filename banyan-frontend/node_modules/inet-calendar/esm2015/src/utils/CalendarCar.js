/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
export class CalendarCar {
    /**
     * @param {?} subFirmDict
     */
    constructor(subFirmDict) {
        this.carDefault = {
            name: 'Mặc định',
            uuid: ''
        };
        this.carRef = 'CAL_BUILDER_CAR';
        this.driverRef = 'CAL_BUILDER_DRIVER';
        this.subFirmDict = subFirmDict;
    }
    /**
     * @param {?} callback
     * @return {?}
     */
    loadCars(callback) {
        this._loadList(this.carRef, callback);
    }
    /**
     * @param {?} data
     * @param {?} callback
     * @return {?}
     */
    createOrUpdateCars(data, callback) {
        if (!data.uuid) {
            data.name = this.carRef;
            data.reference = this.carRef;
            this.subFirmDict.create(data, (/**
             * @param {?} data
             * @return {?}
             */
            (data) => this.parseJsonValue(data, callback)));
        }
        else {
            this.subFirmDict.update(data, (/**
             * @param {?} data
             * @return {?}
             */
            (data) => this.parseJsonValue(data, callback)));
        }
    }
    /**
     * @param {?} callback
     * @return {?}
     */
    loadDrivers(callback) {
        this._loadList(this.driverRef, callback);
    }
    /**
     * @param {?} data
     * @param {?} callback
     * @return {?}
     */
    createOrUpdateDrivers(data, callback) {
        if (!data.uuid) {
            data.name = this.driverRef;
            data.reference = this.driverRef;
            this.subFirmDict.create(data, (/**
             * @param {?} data
             * @return {?}
             */
            (data) => this.parseJsonValue(data, callback)));
        }
        else {
            this.subFirmDict.update(data, (/**
             * @param {?} data
             * @return {?}
             */
            (data) => this.parseJsonValue(data, callback)));
        }
    }
    /**
     * @param {?} ref
     * @param {?} callback
     * @return {?}
     */
    _loadList(ref, callback) {
        this.subFirmDict.list(ref, (/**
         * @param {?} results
         * @return {?}
         */
        (results) => this.parseJsonValue(results[0], callback)));
    }
    /**
     * @param {?} data
     * @param {?} callback
     * @return {?}
     */
    parseJsonValue(data, callback) {
        /** @type {?} */
        let values = [];
        try {
            values = JSON.parse(data.value);
        }
        catch (e) { }
        callback(values, data);
    }
}
if (false) {
    /** @type {?} */
    CalendarCar.prototype.carDefault;
    /** @type {?} */
    CalendarCar.prototype.carRef;
    /** @type {?} */
    CalendarCar.prototype.driverRef;
    /** @type {?} */
    CalendarCar.prototype.subFirmDict;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FsZW5kYXJDYXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbmV0LWNhbGVuZGFyLyIsInNvdXJjZXMiOlsic3JjL3V0aWxzL0NhbGVuZGFyQ2FyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxNQUFNLE9BQU8sV0FBVzs7OztJQVl0QixZQUFZLFdBQThCO1FBVjFDLGVBQVUsR0FBRztZQUNYLElBQUksRUFBRSxVQUFVO1lBQ2hCLElBQUksRUFBRSxFQUFFO1NBQ1QsQ0FBQztRQUVGLFdBQU0sR0FBVyxpQkFBaUIsQ0FBQztRQUNuQyxjQUFTLEdBQVcsb0JBQW9CLENBQUM7UUFLdkMsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7SUFDakMsQ0FBQzs7Ozs7SUFFRCxRQUFRLENBQUMsUUFBa0I7UUFDekIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7Ozs7OztJQUVELGtCQUFrQixDQUFDLElBQW9CLEVBQUUsUUFBa0I7UUFDekQsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDZCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDeEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQzdCLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUk7Ozs7WUFBRSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLEVBQUMsQ0FBQztTQUM5RTthQUFNO1lBQ0wsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSTs7OztZQUFFLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsRUFBQyxDQUFDO1NBQzlFO0lBQ0gsQ0FBQzs7Ozs7SUFFRCxXQUFXLENBQUMsUUFBa0I7UUFDNUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzNDLENBQUM7Ozs7OztJQUVELHFCQUFxQixDQUFDLElBQW9CLEVBQUUsUUFBa0I7UUFDNUQsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDZCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDM0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUk7Ozs7WUFBRSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLEVBQUMsQ0FBQztTQUM5RTthQUFNO1lBQ0wsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSTs7OztZQUFFLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsRUFBQyxDQUFDO1NBQzlFO0lBQ0gsQ0FBQzs7Ozs7O0lBRUQsU0FBUyxDQUFDLEdBQVcsRUFBRSxRQUFrQjtRQUN2QyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHOzs7O1FBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxFQUFDLENBQUM7SUFDckYsQ0FBQzs7Ozs7O0lBRUQsY0FBYyxDQUFDLElBQW9CLEVBQUUsUUFBa0I7O1lBQ2pELE1BQU0sR0FBRyxFQUFFO1FBQ2YsSUFBSTtZQUNGLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNqQztRQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUU7UUFDZCxRQUFRLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3pCLENBQUM7Q0FDRjs7O0lBckRDLGlDQUdFOztJQUVGLDZCQUFtQzs7SUFDbkMsZ0NBQXlDOztJQUV6QyxrQ0FBK0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0RpY3Rpb25hcnlEYXRhLCBTdWJGaXJtRGljdGlvbmFyeX0gZnJvbSBcIi4vc3ViZmlybS9EaWN0aW9uYXJ5XCI7XG5cbmV4cG9ydCBjbGFzcyBDYWxlbmRhckNhciB7XG5cbiAgY2FyRGVmYXVsdCA9IHtcbiAgICBuYW1lOiAnTeG6t2MgxJHhu4tuaCcsXG4gICAgdXVpZDogJydcbiAgfTtcblxuICBjYXJSZWY6IHN0cmluZyA9ICdDQUxfQlVJTERFUl9DQVInO1xuICBkcml2ZXJSZWY6IHN0cmluZyA9ICdDQUxfQlVJTERFUl9EUklWRVInO1xuXG4gIHN1YkZpcm1EaWN0OiBTdWJGaXJtRGljdGlvbmFyeTtcblxuICBjb25zdHJ1Y3RvcihzdWJGaXJtRGljdDogU3ViRmlybURpY3Rpb25hcnkpIHtcbiAgICB0aGlzLnN1YkZpcm1EaWN0ID0gc3ViRmlybURpY3Q7XG4gIH1cblxuICBsb2FkQ2FycyhjYWxsYmFjazogRnVuY3Rpb24pIHtcbiAgICB0aGlzLl9sb2FkTGlzdCh0aGlzLmNhclJlZiwgY2FsbGJhY2spO1xuICB9XG5cbiAgY3JlYXRlT3JVcGRhdGVDYXJzKGRhdGE6IERpY3Rpb25hcnlEYXRhLCBjYWxsYmFjazogRnVuY3Rpb24pIHtcbiAgICBpZiAoIWRhdGEudXVpZCkge1xuICAgICAgZGF0YS5uYW1lID0gdGhpcy5jYXJSZWY7XG4gICAgICBkYXRhLnJlZmVyZW5jZSA9IHRoaXMuY2FyUmVmO1xuICAgICAgdGhpcy5zdWJGaXJtRGljdC5jcmVhdGUoZGF0YSwgKGRhdGEpID0+IHRoaXMucGFyc2VKc29uVmFsdWUoZGF0YSwgY2FsbGJhY2spKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zdWJGaXJtRGljdC51cGRhdGUoZGF0YSwgKGRhdGEpID0+IHRoaXMucGFyc2VKc29uVmFsdWUoZGF0YSwgY2FsbGJhY2spKTtcbiAgICB9XG4gIH1cblxuICBsb2FkRHJpdmVycyhjYWxsYmFjazogRnVuY3Rpb24pIHtcbiAgICB0aGlzLl9sb2FkTGlzdCh0aGlzLmRyaXZlclJlZiwgY2FsbGJhY2spO1xuICB9XG5cbiAgY3JlYXRlT3JVcGRhdGVEcml2ZXJzKGRhdGE6IERpY3Rpb25hcnlEYXRhLCBjYWxsYmFjazogRnVuY3Rpb24pIHtcbiAgICBpZiAoIWRhdGEudXVpZCkge1xuICAgICAgZGF0YS5uYW1lID0gdGhpcy5kcml2ZXJSZWY7XG4gICAgICBkYXRhLnJlZmVyZW5jZSA9IHRoaXMuZHJpdmVyUmVmO1xuICAgICAgdGhpcy5zdWJGaXJtRGljdC5jcmVhdGUoZGF0YSwgKGRhdGEpID0+IHRoaXMucGFyc2VKc29uVmFsdWUoZGF0YSwgY2FsbGJhY2spKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zdWJGaXJtRGljdC51cGRhdGUoZGF0YSwgKGRhdGEpID0+IHRoaXMucGFyc2VKc29uVmFsdWUoZGF0YSwgY2FsbGJhY2spKTtcbiAgICB9XG4gIH1cblxuICBfbG9hZExpc3QocmVmOiBzdHJpbmcsIGNhbGxiYWNrOiBGdW5jdGlvbikge1xuICAgIHRoaXMuc3ViRmlybURpY3QubGlzdChyZWYsIChyZXN1bHRzKSA9PiB0aGlzLnBhcnNlSnNvblZhbHVlKHJlc3VsdHNbMF0sIGNhbGxiYWNrKSk7XG4gIH1cblxuICBwYXJzZUpzb25WYWx1ZShkYXRhOiBEaWN0aW9uYXJ5RGF0YSwgY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XG4gICAgbGV0IHZhbHVlcyA9IFtdO1xuICAgIHRyeSB7XG4gICAgICB2YWx1ZXMgPSBKU09OLnBhcnNlKGRhdGEudmFsdWUpO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgY2FsbGJhY2sodmFsdWVzLCBkYXRhKTtcbiAgfVxufVxuIl19