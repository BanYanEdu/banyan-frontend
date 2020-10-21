/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, ComponentFactoryResolver, Injector, ApplicationRef } from '@angular/core';
import { SuggestionService } from 'inet-core';
import { xCalendar } from "./utils/xCalendar";
import * as moment_ from "moment";
import { CalendarDialogViewComponent } from './dialog-view/dialog-view.component';
/** @type {?} */
var moment = moment_;
moment.locale('vi');
var CalendarService = /** @class */ (function () {
    function CalendarService(suggestService, componentFactoryResolver, injector, appRef) {
        var _this = this;
        this.suggestService = suggestService;
        this.componentFactoryResolver = componentFactoryResolver;
        this.injector = injector;
        this.appRef = appRef;
        this.myOrg = {
            organId: iNet.organId,
            orgName: iNet.orgName,
            firmPrefix: iNet.firmPrefix
        };
        this.locationKeySuggestion = 'xcalendar_location';
        this._fns = [];
        xCalendar.roleUrl = 'unicorn/page/calendar/role';
        xCalendar.setOrgId(this.myOrg.organId);
        xCalendar.ready((/**
         * @return {?}
         */
        function () {
            xCalendar.loadRole(_this.myOrg.organId, (/**
             * @param {?} role
             * @return {?}
             */
            function (role) {
                xCalendar.setOrgId(_this.myOrg.organId);
                _this._ready = true;
                _this._triggerReady();
            }));
        }));
    }
    /**
     * @param {?} callback
     * @return {?}
     */
    CalendarService.prototype.ready = /**
     * @param {?} callback
     * @return {?}
     */
    function (callback) {
        if (this._ready) {
            callback();
        }
        else {
            this._fns.push(callback);
        }
    };
    /**
     * @private
     * @return {?}
     */
    CalendarService.prototype._triggerReady = /**
     * @private
     * @return {?}
     */
    function () {
        this._fns.forEach((/**
         * @param {?} fn
         * @return {?}
         */
        function (fn) { return fn(); }));
        this._fns = [];
    };
    /**
     * @param {?} content
     * @param {?} callback
     * @return {?}
     */
    CalendarService.prototype.searchLocation = /**
     * @param {?} content
     * @param {?} callback
     * @return {?}
     */
    function (content, callback) {
        if (!content) {
            return;
        }
        /** @type {?} */
        var params = {
            keyword: this.locationKeySuggestion,
            content: content
        };
        this.suggestService.loadSuggestion(params, callback);
    };
    /**
     * @param {?} content
     * @param {?} callback
     * @return {?}
     */
    CalendarService.prototype.saveLocation = /**
     * @param {?} content
     * @param {?} callback
     * @return {?}
     */
    function (content, callback) {
        if (!content) {
            return;
        }
        /** @type {?} */
        var params = {
            keyword: this.locationKeySuggestion,
            content: content
        };
        this.suggestService.saveSuggestion(params, callback);
    };
    /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    CalendarService.prototype.createEvent = /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    function (params, callback) {
        this.ready((/**
         * @return {?}
         */
        function () { return xCalendar.create(params, callback); }));
    };
    /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    CalendarService.prototype.updateEvent = /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    function (params, callback) {
        this.ready((/**
         * @return {?}
         */
        function () { return xCalendar.update(params, callback); }));
    };
    /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    CalendarService.prototype.removeEvent = /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    function (params, callback) {
        this.ready((/**
         * @return {?}
         */
        function () { return xCalendar.remove(params, callback); }));
    };
    /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    CalendarService.prototype.attendeeSearch = /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    function (params, callback) {
        this.ready((/**
         * @return {?}
         */
        function () { return xCalendar.loadUserByKeyword(params, callback); }));
    };
    /**
     * @param {?} callback
     * @return {?}
     */
    CalendarService.prototype.loadAttendees = /**
     * @param {?} callback
     * @return {?}
     */
    function (callback) {
        this.ready((/**
         * @return {?}
         */
        function () { return xCalendar.searchAttendee({}, callback); }));
    };
    /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    CalendarService.prototype.loadEvents = /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    function (params, callback) {
        this.ready((/**
         * @return {?}
         */
        function () { return xCalendar.getListEvents(params, callback); }));
    };
    /**
     * @param {?} date
     * @param {?} callback
     * @return {?}
     */
    CalendarService.prototype.loadMonthEvents = /**
     * @param {?} date
     * @param {?} callback
     * @return {?}
     */
    function (date, callback) {
        this.ready((/**
         * @return {?}
         */
        function () { return xCalendar.loadMonthEvents({}, date, callback); }));
    };
    /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    CalendarService.prototype.loadEvent = /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    function (params, callback) {
        this.ready((/**
         * @return {?}
         */
        function () { return xCalendar.loadEvent(params, callback); }));
    };
    /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    CalendarService.prototype.deleteAttachment = /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    function (params, callback) {
        this.ready((/**
         * @return {?}
         */
        function () { return xCalendar.deleteAttachment(params, callback); }));
    };
    /**
     * @param {?} event
     * @param {?} jsEvent
     * @param {?} target
     * @param {?} onChange
     * @return {?}
     */
    CalendarService.prototype.viewEvent = /**
     * @param {?} event
     * @param {?} jsEvent
     * @param {?} target
     * @param {?} onChange
     * @return {?}
     */
    function (event, jsEvent, target, onChange) {
        this._initViewModal();
        this._viewModalRef.instance.viewEvent(event, jsEvent, target, onChange);
    };
    /**
     * @return {?}
     */
    CalendarService.prototype.hideViewModal = /**
     * @return {?}
     */
    function () {
        if (this._viewModalRef) {
            this._viewModalRef.instance.hide();
        }
    };
    /**
     * @private
     * @return {?}
     */
    CalendarService.prototype._initViewModal = /**
     * @private
     * @return {?}
     */
    function () {
        if (this._viewModalRef) {
            return;
        }
        /** @type {?} */
        var componentFactory = this.componentFactoryResolver.resolveComponentFactory(CalendarDialogViewComponent);
        this._viewModalRef = componentFactory.create(this.injector);
        this.appRef.attachView(this._viewModalRef.hostView);
    };
    CalendarService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    CalendarService.ctorParameters = function () { return [
        { type: SuggestionService },
        { type: ComponentFactoryResolver },
        { type: Injector },
        { type: ApplicationRef }
    ]; };
    return CalendarService;
}());
export { CalendarService };
if (false) {
    /** @type {?} */
    CalendarService.prototype.myOrg;
    /** @type {?} */
    CalendarService.prototype.locationKeySuggestion;
    /**
     * @type {?}
     * @private
     */
    CalendarService.prototype._ready;
    /**
     * @type {?}
     * @private
     */
    CalendarService.prototype._fns;
    /**
     * @type {?}
     * @private
     */
    CalendarService.prototype._viewModalRef;
    /**
     * @type {?}
     * @private
     */
    CalendarService.prototype.suggestService;
    /**
     * @type {?}
     * @private
     */
    CalendarService.prototype.componentFactoryResolver;
    /**
     * @type {?}
     * @private
     */
    CalendarService.prototype.injector;
    /**
     * @type {?}
     * @private
     */
    CalendarService.prototype.appRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtY2FsZW5kYXIvIiwic291cmNlcyI6WyJzcmMvY2FsZW5kYXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBRSx3QkFBd0IsRUFBRSxRQUFRLEVBQUUsY0FBYyxFQUFlLE1BQU0sZUFBZSxDQUFDO0FBQzNHLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLFdBQVcsQ0FBQztBQUM1QyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFFNUMsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7QUFDbEMsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0scUNBQXFDLENBQUM7O0lBQzVFLE1BQU0sR0FBRyxPQUFPO0FBRXRCLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7QUFFcEI7SUFhSSx5QkFDWSxjQUFpQyxFQUNqQyx3QkFBa0QsRUFDbEQsUUFBa0IsRUFDbEIsTUFBc0I7UUFKbEMsaUJBZUM7UUFkVyxtQkFBYyxHQUFkLGNBQWMsQ0FBbUI7UUFDakMsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUEwQjtRQUNsRCxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLFdBQU0sR0FBTixNQUFNLENBQWdCO1FBZmxDLFVBQUssR0FBRztZQUNKLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztZQUNyQixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87WUFDckIsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVO1NBQzlCLENBQUM7UUFDRiwwQkFBcUIsR0FBRyxvQkFBb0IsQ0FBQztRQUdyQyxTQUFJLEdBQWUsRUFBRSxDQUFDO1FBUzFCLFNBQVMsQ0FBQyxPQUFPLEdBQUcsNEJBQTRCLENBQUM7UUFDakQsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3ZDLFNBQVMsQ0FBQyxLQUFLOzs7UUFBQztZQUNaLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxPQUFPOzs7O1lBQUUsVUFBQyxJQUFJO2dCQUN4QyxTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ3ZDLEtBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO2dCQUNuQixLQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDekIsQ0FBQyxFQUFDLENBQUM7UUFDUCxDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7Ozs7O0lBRUQsK0JBQUs7Ozs7SUFBTCxVQUFNLFFBQWtCO1FBQ3BCLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNiLFFBQVEsRUFBRSxDQUFDO1NBQ2Q7YUFBTTtZQUNILElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQzVCO0lBQ0wsQ0FBQzs7Ozs7SUFFTyx1Q0FBYTs7OztJQUFyQjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTzs7OztRQUFDLFVBQUEsRUFBRSxJQUFJLE9BQUEsRUFBRSxFQUFFLEVBQUosQ0FBSSxFQUFDLENBQUM7UUFDOUIsSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7SUFDbkIsQ0FBQzs7Ozs7O0lBRUQsd0NBQWM7Ozs7O0lBQWQsVUFBZSxPQUFlLEVBQUUsUUFBa0I7UUFDOUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNWLE9BQU87U0FDVjs7WUFDRyxNQUFNLEdBQUc7WUFDVCxPQUFPLEVBQUUsSUFBSSxDQUFDLHFCQUFxQjtZQUNuQyxPQUFPLEVBQUUsT0FBTztTQUNuQjtRQUNELElBQUksQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztJQUN6RCxDQUFDOzs7Ozs7SUFFRCxzQ0FBWTs7Ozs7SUFBWixVQUFhLE9BQWUsRUFBRSxRQUFrQjtRQUM1QyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ1YsT0FBTztTQUNWOztZQUNHLE1BQU0sR0FBRztZQUNULE9BQU8sRUFBRSxJQUFJLENBQUMscUJBQXFCO1lBQ25DLE9BQU8sRUFBRSxPQUFPO1NBQ25CO1FBQ0QsSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3pELENBQUM7Ozs7OztJQUVELHFDQUFXOzs7OztJQUFYLFVBQVksTUFBTSxFQUFFLFFBQVE7UUFDeEIsSUFBSSxDQUFDLEtBQUs7OztRQUFDLGNBQU0sT0FBQSxTQUFTLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsRUFBbEMsQ0FBa0MsRUFBQyxDQUFDO0lBQ3pELENBQUM7Ozs7OztJQUVELHFDQUFXOzs7OztJQUFYLFVBQVksTUFBTSxFQUFFLFFBQVE7UUFDeEIsSUFBSSxDQUFDLEtBQUs7OztRQUFDLGNBQU0sT0FBQSxTQUFTLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsRUFBbEMsQ0FBa0MsRUFBQyxDQUFDO0lBQ3pELENBQUM7Ozs7OztJQUVELHFDQUFXOzs7OztJQUFYLFVBQVksTUFBTSxFQUFFLFFBQVE7UUFDeEIsSUFBSSxDQUFDLEtBQUs7OztRQUFDLGNBQU0sT0FBQSxTQUFTLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsRUFBbEMsQ0FBa0MsRUFBQyxDQUFDO0lBQ3pELENBQUM7Ozs7OztJQUVELHdDQUFjOzs7OztJQUFkLFVBQWUsTUFBTSxFQUFFLFFBQVE7UUFDM0IsSUFBSSxDQUFDLEtBQUs7OztRQUFDLGNBQU0sT0FBQSxTQUFTLENBQUMsaUJBQWlCLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxFQUE3QyxDQUE2QyxFQUFDLENBQUM7SUFDcEUsQ0FBQzs7Ozs7SUFFRCx1Q0FBYTs7OztJQUFiLFVBQWMsUUFBUTtRQUNsQixJQUFJLENBQUMsS0FBSzs7O1FBQUMsY0FBTSxPQUFBLFNBQVMsQ0FBQyxjQUFjLENBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxFQUF0QyxDQUFzQyxFQUFDLENBQUM7SUFDN0QsQ0FBQzs7Ozs7O0lBRUQsb0NBQVU7Ozs7O0lBQVYsVUFBVyxNQUFNLEVBQUUsUUFBUTtRQUN2QixJQUFJLENBQUMsS0FBSzs7O1FBQUMsY0FBTSxPQUFBLFNBQVMsQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxFQUF6QyxDQUF5QyxFQUFDLENBQUM7SUFDaEUsQ0FBQzs7Ozs7O0lBRUQseUNBQWU7Ozs7O0lBQWYsVUFBZ0IsSUFBSSxFQUFFLFFBQVE7UUFDMUIsSUFBSSxDQUFDLEtBQUs7OztRQUFDLGNBQU0sT0FBQSxTQUFTLENBQUMsZUFBZSxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDLEVBQTdDLENBQTZDLEVBQUMsQ0FBQztJQUNwRSxDQUFDOzs7Ozs7SUFFRCxtQ0FBUzs7Ozs7SUFBVCxVQUFVLE1BQU0sRUFBRSxRQUFRO1FBQ3RCLElBQUksQ0FBQyxLQUFLOzs7UUFBQyxjQUFNLE9BQUEsU0FBUyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLEVBQXJDLENBQXFDLEVBQUMsQ0FBQztJQUM1RCxDQUFDOzs7Ozs7SUFFRCwwQ0FBZ0I7Ozs7O0lBQWhCLFVBQWlCLE1BQU0sRUFBRSxRQUFrQjtRQUN2QyxJQUFJLENBQUMsS0FBSzs7O1FBQUMsY0FBTSxPQUFBLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUMsUUFBUSxDQUFDLEVBQTNDLENBQTJDLEVBQUMsQ0FBQztJQUNsRSxDQUFDOzs7Ozs7OztJQUVELG1DQUFTOzs7Ozs7O0lBQVQsVUFBVSxLQUFlLEVBQUUsT0FBbUIsRUFBRSxNQUFtQixFQUFFLFFBQWtCO1FBQ25GLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDNUUsQ0FBQzs7OztJQUVELHVDQUFhOzs7SUFBYjtRQUNJLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUNwQixJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUN0QztJQUNMLENBQUM7Ozs7O0lBRU8sd0NBQWM7Ozs7SUFBdEI7UUFDSSxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDcEIsT0FBTztTQUNWOztZQUNLLGdCQUFnQixHQUFHLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyx1QkFBdUIsQ0FBQywyQkFBMkIsQ0FBQztRQUMzRyxJQUFJLENBQUMsYUFBYSxHQUFHLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDNUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN4RCxDQUFDOztnQkF2SEosVUFBVTs7OztnQkFUSCxpQkFBaUI7Z0JBREwsd0JBQXdCO2dCQUFFLFFBQVE7Z0JBQUUsY0FBYzs7SUFrSXRFLHNCQUFDO0NBQUEsQUF4SEQsSUF3SEM7U0F2SFksZUFBZTs7O0lBQ3hCLGdDQUlFOztJQUNGLGdEQUE2Qzs7Ozs7SUFFN0MsaUNBQXdCOzs7OztJQUN4QiwrQkFBOEI7Ozs7O0lBQzlCLHdDQUFpRTs7Ozs7SUFHN0QseUNBQXlDOzs7OztJQUN6QyxtREFBMEQ7Ozs7O0lBQzFELG1DQUEwQjs7Ozs7SUFDMUIsaUNBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlLCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIEluamVjdG9yLCBBcHBsaWNhdGlvblJlZiwgQ29tcG9uZW50UmVmfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7U3VnZ2VzdGlvblNlcnZpY2V9IGZyb20gJ2luZXQtY29yZSc7XG5pbXBvcnQge3hDYWxlbmRhcn0gZnJvbSBcIi4vdXRpbHMveENhbGVuZGFyXCI7XG5pbXBvcnQge0NhbEV2ZW50fSBmcm9tIFwiLi91dGlscy9tb2RlbC9DYWxFdmVudFwiO1xuaW1wb3J0ICogYXMgbW9tZW50XyBmcm9tIFwibW9tZW50XCI7XG5pbXBvcnQgeyBDYWxlbmRhckRpYWxvZ1ZpZXdDb21wb25lbnQgfSBmcm9tICcuL2RpYWxvZy12aWV3L2RpYWxvZy12aWV3LmNvbXBvbmVudCc7XG5jb25zdCBtb21lbnQgPSBtb21lbnRfO1xuZGVjbGFyZSBsZXQgaU5ldDogYW55O1xubW9tZW50LmxvY2FsZSgndmknKTtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENhbGVuZGFyU2VydmljZSB7XG4gICAgbXlPcmcgPSB7XG4gICAgICAgIG9yZ2FuSWQ6IGlOZXQub3JnYW5JZCxcbiAgICAgICAgb3JnTmFtZTogaU5ldC5vcmdOYW1lLFxuICAgICAgICBmaXJtUHJlZml4OiBpTmV0LmZpcm1QcmVmaXhcbiAgICB9O1xuICAgIGxvY2F0aW9uS2V5U3VnZ2VzdGlvbiA9ICd4Y2FsZW5kYXJfbG9jYXRpb24nO1xuXG4gICAgcHJpdmF0ZSBfcmVhZHk6IGJvb2xlYW47XG4gICAgcHJpdmF0ZSBfZm5zOiBGdW5jdGlvbltdID0gW107XG4gICAgcHJpdmF0ZSBfdmlld01vZGFsUmVmOiBDb21wb25lbnRSZWY8Q2FsZW5kYXJEaWFsb2dWaWV3Q29tcG9uZW50PjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIHN1Z2dlc3RTZXJ2aWNlOiBTdWdnZXN0aW9uU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICAgICAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgICAgIHByaXZhdGUgYXBwUmVmOiBBcHBsaWNhdGlvblJlZixcbiAgICApIHtcbiAgICAgICAgeENhbGVuZGFyLnJvbGVVcmwgPSAndW5pY29ybi9wYWdlL2NhbGVuZGFyL3JvbGUnO1xuICAgICAgICB4Q2FsZW5kYXIuc2V0T3JnSWQodGhpcy5teU9yZy5vcmdhbklkKTtcbiAgICAgICAgeENhbGVuZGFyLnJlYWR5KCgpID0+IHtcbiAgICAgICAgICAgIHhDYWxlbmRhci5sb2FkUm9sZSh0aGlzLm15T3JnLm9yZ2FuSWQsIChyb2xlKSA9PiB7XG4gICAgICAgICAgICAgICAgeENhbGVuZGFyLnNldE9yZ0lkKHRoaXMubXlPcmcub3JnYW5JZCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVhZHkgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuX3RyaWdnZXJSZWFkeSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlYWR5KGNhbGxiYWNrOiBGdW5jdGlvbikge1xuICAgICAgICBpZiAodGhpcy5fcmVhZHkpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9mbnMucHVzaChjYWxsYmFjayk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF90cmlnZ2VyUmVhZHkoKSB7XG4gICAgICAgIHRoaXMuX2Zucy5mb3JFYWNoKGZuID0+IGZuKCkpO1xuICAgICAgICB0aGlzLl9mbnMgPSBbXTtcbiAgICB9XG5cbiAgICBzZWFyY2hMb2NhdGlvbihjb250ZW50OiBzdHJpbmcsIGNhbGxiYWNrOiBGdW5jdGlvbikge1xuICAgICAgICBpZiAoIWNvbnRlbnQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgcGFyYW1zID0ge1xuICAgICAgICAgICAga2V5d29yZDogdGhpcy5sb2NhdGlvbktleVN1Z2dlc3Rpb24sXG4gICAgICAgICAgICBjb250ZW50OiBjb250ZW50XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc3VnZ2VzdFNlcnZpY2UubG9hZFN1Z2dlc3Rpb24ocGFyYW1zLCBjYWxsYmFjayk7XG4gICAgfVxuXG4gICAgc2F2ZUxvY2F0aW9uKGNvbnRlbnQ6IHN0cmluZywgY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XG4gICAgICAgIGlmICghY29udGVudCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCBwYXJhbXMgPSB7XG4gICAgICAgICAgICBrZXl3b3JkOiB0aGlzLmxvY2F0aW9uS2V5U3VnZ2VzdGlvbixcbiAgICAgICAgICAgIGNvbnRlbnQ6IGNvbnRlbnRcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zdWdnZXN0U2VydmljZS5zYXZlU3VnZ2VzdGlvbihwYXJhbXMsIGNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICBjcmVhdGVFdmVudChwYXJhbXMsIGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMucmVhZHkoKCkgPT4geENhbGVuZGFyLmNyZWF0ZShwYXJhbXMsIGNhbGxiYWNrKSk7XG4gICAgfVxuXG4gICAgdXBkYXRlRXZlbnQocGFyYW1zLCBjYWxsYmFjaykge1xuICAgICAgICB0aGlzLnJlYWR5KCgpID0+IHhDYWxlbmRhci51cGRhdGUocGFyYW1zLCBjYWxsYmFjaykpO1xuICAgIH1cblxuICAgIHJlbW92ZUV2ZW50KHBhcmFtcywgY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5yZWFkeSgoKSA9PiB4Q2FsZW5kYXIucmVtb3ZlKHBhcmFtcywgY2FsbGJhY2spKTtcbiAgICB9XG5cbiAgICBhdHRlbmRlZVNlYXJjaChwYXJhbXMsIGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMucmVhZHkoKCkgPT4geENhbGVuZGFyLmxvYWRVc2VyQnlLZXl3b3JkKHBhcmFtcywgY2FsbGJhY2spKTtcbiAgICB9XG5cbiAgICBsb2FkQXR0ZW5kZWVzKGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMucmVhZHkoKCkgPT4geENhbGVuZGFyLnNlYXJjaEF0dGVuZGVlKHt9LCBjYWxsYmFjaykpO1xuICAgIH1cblxuICAgIGxvYWRFdmVudHMocGFyYW1zLCBjYWxsYmFjaykge1xuICAgICAgICB0aGlzLnJlYWR5KCgpID0+IHhDYWxlbmRhci5nZXRMaXN0RXZlbnRzKHBhcmFtcywgY2FsbGJhY2spKTtcbiAgICB9XG5cbiAgICBsb2FkTW9udGhFdmVudHMoZGF0ZSwgY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5yZWFkeSgoKSA9PiB4Q2FsZW5kYXIubG9hZE1vbnRoRXZlbnRzKHt9LCBkYXRlLCBjYWxsYmFjaykpO1xuICAgIH1cblxuICAgIGxvYWRFdmVudChwYXJhbXMsIGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMucmVhZHkoKCkgPT4geENhbGVuZGFyLmxvYWRFdmVudChwYXJhbXMsIGNhbGxiYWNrKSk7XG4gICAgfVxuXG4gICAgZGVsZXRlQXR0YWNobWVudChwYXJhbXMsIGNhbGxiYWNrOiBGdW5jdGlvbikge1xuICAgICAgICB0aGlzLnJlYWR5KCgpID0+IHhDYWxlbmRhci5kZWxldGVBdHRhY2htZW50KHBhcmFtcyxjYWxsYmFjaykpO1xuICAgIH1cblxuICAgIHZpZXdFdmVudChldmVudDogQ2FsRXZlbnQsIGpzRXZlbnQ6IE1vdXNlRXZlbnQsIHRhcmdldDogSFRNTEVsZW1lbnQsIG9uQ2hhbmdlOiBGdW5jdGlvbikge1xuICAgICAgICB0aGlzLl9pbml0Vmlld01vZGFsKCk7XG4gICAgICAgIHRoaXMuX3ZpZXdNb2RhbFJlZi5pbnN0YW5jZS52aWV3RXZlbnQoZXZlbnQsIGpzRXZlbnQsIHRhcmdldCwgb25DaGFuZ2UpO1xuICAgIH1cblxuICAgIGhpZGVWaWV3TW9kYWwoKSB7XG4gICAgICAgIGlmICh0aGlzLl92aWV3TW9kYWxSZWYpIHtcbiAgICAgICAgICAgIHRoaXMuX3ZpZXdNb2RhbFJlZi5pbnN0YW5jZS5oaWRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9pbml0Vmlld01vZGFsKCkge1xuICAgICAgICBpZiAodGhpcy5fdmlld01vZGFsUmVmKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY29tcG9uZW50RmFjdG9yeSA9IHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KENhbGVuZGFyRGlhbG9nVmlld0NvbXBvbmVudCk7XG4gICAgICAgIHRoaXMuX3ZpZXdNb2RhbFJlZiA9IGNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKHRoaXMuaW5qZWN0b3IpO1xuICAgICAgICB0aGlzLmFwcFJlZi5hdHRhY2hWaWV3KHRoaXMuX3ZpZXdNb2RhbFJlZi5ob3N0Vmlldyk7XG4gICAgfVxufVxuIl19