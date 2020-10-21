/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var CalendarCar = /** @class */ (function () {
    function CalendarCar(subFirmDict) {
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
    CalendarCar.prototype.loadCars = /**
     * @param {?} callback
     * @return {?}
     */
    function (callback) {
        this._loadList(this.carRef, callback);
    };
    /**
     * @param {?} data
     * @param {?} callback
     * @return {?}
     */
    CalendarCar.prototype.createOrUpdateCars = /**
     * @param {?} data
     * @param {?} callback
     * @return {?}
     */
    function (data, callback) {
        var _this = this;
        if (!data.uuid) {
            data.name = this.carRef;
            data.reference = this.carRef;
            this.subFirmDict.create(data, (/**
             * @param {?} data
             * @return {?}
             */
            function (data) { return _this.parseJsonValue(data, callback); }));
        }
        else {
            this.subFirmDict.update(data, (/**
             * @param {?} data
             * @return {?}
             */
            function (data) { return _this.parseJsonValue(data, callback); }));
        }
    };
    /**
     * @param {?} callback
     * @return {?}
     */
    CalendarCar.prototype.loadDrivers = /**
     * @param {?} callback
     * @return {?}
     */
    function (callback) {
        this._loadList(this.driverRef, callback);
    };
    /**
     * @param {?} data
     * @param {?} callback
     * @return {?}
     */
    CalendarCar.prototype.createOrUpdateDrivers = /**
     * @param {?} data
     * @param {?} callback
     * @return {?}
     */
    function (data, callback) {
        var _this = this;
        if (!data.uuid) {
            data.name = this.driverRef;
            data.reference = this.driverRef;
            this.subFirmDict.create(data, (/**
             * @param {?} data
             * @return {?}
             */
            function (data) { return _this.parseJsonValue(data, callback); }));
        }
        else {
            this.subFirmDict.update(data, (/**
             * @param {?} data
             * @return {?}
             */
            function (data) { return _this.parseJsonValue(data, callback); }));
        }
    };
    /**
     * @param {?} ref
     * @param {?} callback
     * @return {?}
     */
    CalendarCar.prototype._loadList = /**
     * @param {?} ref
     * @param {?} callback
     * @return {?}
     */
    function (ref, callback) {
        var _this = this;
        this.subFirmDict.list(ref, (/**
         * @param {?} results
         * @return {?}
         */
        function (results) { return _this.parseJsonValue(results[0], callback); }));
    };
    /**
     * @param {?} data
     * @param {?} callback
     * @return {?}
     */
    CalendarCar.prototype.parseJsonValue = /**
     * @param {?} data
     * @param {?} callback
     * @return {?}
     */
    function (data, callback) {
        /** @type {?} */
        var values = [];
        try {
            values = JSON.parse(data.value);
        }
        catch (e) { }
        callback(values, data);
    };
    return CalendarCar;
}());
export { CalendarCar };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FsZW5kYXJDYXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbmV0LWNhbGVuZGFyLyIsInNvdXJjZXMiOlsic3JjL3V0aWxzL0NhbGVuZGFyQ2FyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQTtJQVlFLHFCQUFZLFdBQThCO1FBVjFDLGVBQVUsR0FBRztZQUNYLElBQUksRUFBRSxVQUFVO1lBQ2hCLElBQUksRUFBRSxFQUFFO1NBQ1QsQ0FBQztRQUVGLFdBQU0sR0FBVyxpQkFBaUIsQ0FBQztRQUNuQyxjQUFTLEdBQVcsb0JBQW9CLENBQUM7UUFLdkMsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7SUFDakMsQ0FBQzs7Ozs7SUFFRCw4QkFBUTs7OztJQUFSLFVBQVMsUUFBa0I7UUFDekIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7Ozs7OztJQUVELHdDQUFrQjs7Ozs7SUFBbEIsVUFBbUIsSUFBb0IsRUFBRSxRQUFrQjtRQUEzRCxpQkFRQztRQVBDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ2QsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQ3hCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUM3QixJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJOzs7O1lBQUUsVUFBQyxJQUFJLElBQUssT0FBQSxLQUFJLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsRUFBbkMsQ0FBbUMsRUFBQyxDQUFDO1NBQzlFO2FBQU07WUFDTCxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJOzs7O1lBQUUsVUFBQyxJQUFJLElBQUssT0FBQSxLQUFJLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsRUFBbkMsQ0FBbUMsRUFBQyxDQUFDO1NBQzlFO0lBQ0gsQ0FBQzs7Ozs7SUFFRCxpQ0FBVzs7OztJQUFYLFVBQVksUUFBa0I7UUFDNUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzNDLENBQUM7Ozs7OztJQUVELDJDQUFxQjs7Ozs7SUFBckIsVUFBc0IsSUFBb0IsRUFBRSxRQUFrQjtRQUE5RCxpQkFRQztRQVBDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ2QsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQzNCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUNoQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJOzs7O1lBQUUsVUFBQyxJQUFJLElBQUssT0FBQSxLQUFJLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsRUFBbkMsQ0FBbUMsRUFBQyxDQUFDO1NBQzlFO2FBQU07WUFDTCxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJOzs7O1lBQUUsVUFBQyxJQUFJLElBQUssT0FBQSxLQUFJLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsRUFBbkMsQ0FBbUMsRUFBQyxDQUFDO1NBQzlFO0lBQ0gsQ0FBQzs7Ozs7O0lBRUQsK0JBQVM7Ozs7O0lBQVQsVUFBVSxHQUFXLEVBQUUsUUFBa0I7UUFBekMsaUJBRUM7UUFEQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHOzs7O1FBQUUsVUFBQyxPQUFPLElBQUssT0FBQSxLQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsRUFBekMsQ0FBeUMsRUFBQyxDQUFDO0lBQ3JGLENBQUM7Ozs7OztJQUVELG9DQUFjOzs7OztJQUFkLFVBQWUsSUFBb0IsRUFBRSxRQUFrQjs7WUFDakQsTUFBTSxHQUFHLEVBQUU7UUFDZixJQUFJO1lBQ0YsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2pDO1FBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRTtRQUNkLFFBQVEsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDekIsQ0FBQztJQUNILGtCQUFDO0FBQUQsQ0FBQyxBQXZERCxJQXVEQzs7OztJQXJEQyxpQ0FHRTs7SUFFRiw2QkFBbUM7O0lBQ25DLGdDQUF5Qzs7SUFFekMsa0NBQStCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEaWN0aW9uYXJ5RGF0YSwgU3ViRmlybURpY3Rpb25hcnl9IGZyb20gXCIuL3N1YmZpcm0vRGljdGlvbmFyeVwiO1xuXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJDYXIge1xuXG4gIGNhckRlZmF1bHQgPSB7XG4gICAgbmFtZTogJ03hurdjIMSR4buLbmgnLFxuICAgIHV1aWQ6ICcnXG4gIH07XG5cbiAgY2FyUmVmOiBzdHJpbmcgPSAnQ0FMX0JVSUxERVJfQ0FSJztcbiAgZHJpdmVyUmVmOiBzdHJpbmcgPSAnQ0FMX0JVSUxERVJfRFJJVkVSJztcblxuICBzdWJGaXJtRGljdDogU3ViRmlybURpY3Rpb25hcnk7XG5cbiAgY29uc3RydWN0b3Ioc3ViRmlybURpY3Q6IFN1YkZpcm1EaWN0aW9uYXJ5KSB7XG4gICAgdGhpcy5zdWJGaXJtRGljdCA9IHN1YkZpcm1EaWN0O1xuICB9XG5cbiAgbG9hZENhcnMoY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XG4gICAgdGhpcy5fbG9hZExpc3QodGhpcy5jYXJSZWYsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIGNyZWF0ZU9yVXBkYXRlQ2FycyhkYXRhOiBEaWN0aW9uYXJ5RGF0YSwgY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XG4gICAgaWYgKCFkYXRhLnV1aWQpIHtcbiAgICAgIGRhdGEubmFtZSA9IHRoaXMuY2FyUmVmO1xuICAgICAgZGF0YS5yZWZlcmVuY2UgPSB0aGlzLmNhclJlZjtcbiAgICAgIHRoaXMuc3ViRmlybURpY3QuY3JlYXRlKGRhdGEsIChkYXRhKSA9PiB0aGlzLnBhcnNlSnNvblZhbHVlKGRhdGEsIGNhbGxiYWNrKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3ViRmlybURpY3QudXBkYXRlKGRhdGEsIChkYXRhKSA9PiB0aGlzLnBhcnNlSnNvblZhbHVlKGRhdGEsIGNhbGxiYWNrKSk7XG4gICAgfVxuICB9XG5cbiAgbG9hZERyaXZlcnMoY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XG4gICAgdGhpcy5fbG9hZExpc3QodGhpcy5kcml2ZXJSZWYsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIGNyZWF0ZU9yVXBkYXRlRHJpdmVycyhkYXRhOiBEaWN0aW9uYXJ5RGF0YSwgY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XG4gICAgaWYgKCFkYXRhLnV1aWQpIHtcbiAgICAgIGRhdGEubmFtZSA9IHRoaXMuZHJpdmVyUmVmO1xuICAgICAgZGF0YS5yZWZlcmVuY2UgPSB0aGlzLmRyaXZlclJlZjtcbiAgICAgIHRoaXMuc3ViRmlybURpY3QuY3JlYXRlKGRhdGEsIChkYXRhKSA9PiB0aGlzLnBhcnNlSnNvblZhbHVlKGRhdGEsIGNhbGxiYWNrKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3ViRmlybURpY3QudXBkYXRlKGRhdGEsIChkYXRhKSA9PiB0aGlzLnBhcnNlSnNvblZhbHVlKGRhdGEsIGNhbGxiYWNrKSk7XG4gICAgfVxuICB9XG5cbiAgX2xvYWRMaXN0KHJlZjogc3RyaW5nLCBjYWxsYmFjazogRnVuY3Rpb24pIHtcbiAgICB0aGlzLnN1YkZpcm1EaWN0Lmxpc3QocmVmLCAocmVzdWx0cykgPT4gdGhpcy5wYXJzZUpzb25WYWx1ZShyZXN1bHRzWzBdLCBjYWxsYmFjaykpO1xuICB9XG5cbiAgcGFyc2VKc29uVmFsdWUoZGF0YTogRGljdGlvbmFyeURhdGEsIGNhbGxiYWNrOiBGdW5jdGlvbikge1xuICAgIGxldCB2YWx1ZXMgPSBbXTtcbiAgICB0cnkge1xuICAgICAgdmFsdWVzID0gSlNPTi5wYXJzZShkYXRhLnZhbHVlKTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICAgIGNhbGxiYWNrKHZhbHVlcywgZGF0YSk7XG4gIH1cbn1cbiJdfQ==