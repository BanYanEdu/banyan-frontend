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
const moment = moment_;
moment.locale('vi');
export class CalendarService {
    /**
     * @param {?} suggestService
     * @param {?} componentFactoryResolver
     * @param {?} injector
     * @param {?} appRef
     */
    constructor(suggestService, componentFactoryResolver, injector, appRef) {
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
        () => {
            xCalendar.loadRole(this.myOrg.organId, (/**
             * @param {?} role
             * @return {?}
             */
            (role) => {
                xCalendar.setOrgId(this.myOrg.organId);
                this._ready = true;
                this._triggerReady();
            }));
        }));
    }
    /**
     * @param {?} callback
     * @return {?}
     */
    ready(callback) {
        if (this._ready) {
            callback();
        }
        else {
            this._fns.push(callback);
        }
    }
    /**
     * @private
     * @return {?}
     */
    _triggerReady() {
        this._fns.forEach((/**
         * @param {?} fn
         * @return {?}
         */
        fn => fn()));
        this._fns = [];
    }
    /**
     * @param {?} content
     * @param {?} callback
     * @return {?}
     */
    searchLocation(content, callback) {
        if (!content) {
            return;
        }
        /** @type {?} */
        let params = {
            keyword: this.locationKeySuggestion,
            content: content
        };
        this.suggestService.loadSuggestion(params, callback);
    }
    /**
     * @param {?} content
     * @param {?} callback
     * @return {?}
     */
    saveLocation(content, callback) {
        if (!content) {
            return;
        }
        /** @type {?} */
        let params = {
            keyword: this.locationKeySuggestion,
            content: content
        };
        this.suggestService.saveSuggestion(params, callback);
    }
    /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    createEvent(params, callback) {
        this.ready((/**
         * @return {?}
         */
        () => xCalendar.create(params, callback)));
    }
    /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    updateEvent(params, callback) {
        this.ready((/**
         * @return {?}
         */
        () => xCalendar.update(params, callback)));
    }
    /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    removeEvent(params, callback) {
        this.ready((/**
         * @return {?}
         */
        () => xCalendar.remove(params, callback)));
    }
    /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    attendeeSearch(params, callback) {
        this.ready((/**
         * @return {?}
         */
        () => xCalendar.loadUserByKeyword(params, callback)));
    }
    /**
     * @param {?} callback
     * @return {?}
     */
    loadAttendees(callback) {
        this.ready((/**
         * @return {?}
         */
        () => xCalendar.searchAttendee({}, callback)));
    }
    /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    loadEvents(params, callback) {
        this.ready((/**
         * @return {?}
         */
        () => xCalendar.getListEvents(params, callback)));
    }
    /**
     * @param {?} date
     * @param {?} callback
     * @return {?}
     */
    loadMonthEvents(date, callback) {
        this.ready((/**
         * @return {?}
         */
        () => xCalendar.loadMonthEvents({}, date, callback)));
    }
    /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    loadEvent(params, callback) {
        this.ready((/**
         * @return {?}
         */
        () => xCalendar.loadEvent(params, callback)));
    }
    /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    deleteAttachment(params, callback) {
        this.ready((/**
         * @return {?}
         */
        () => xCalendar.deleteAttachment(params, callback)));
    }
    /**
     * @param {?} event
     * @param {?} jsEvent
     * @param {?} target
     * @param {?} onChange
     * @return {?}
     */
    viewEvent(event, jsEvent, target, onChange) {
        this._initViewModal();
        this._viewModalRef.instance.viewEvent(event, jsEvent, target, onChange);
    }
    /**
     * @return {?}
     */
    hideViewModal() {
        if (this._viewModalRef) {
            this._viewModalRef.instance.hide();
        }
    }
    /**
     * @private
     * @return {?}
     */
    _initViewModal() {
        if (this._viewModalRef) {
            return;
        }
        /** @type {?} */
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(CalendarDialogViewComponent);
        this._viewModalRef = componentFactory.create(this.injector);
        this.appRef.attachView(this._viewModalRef.hostView);
    }
}
CalendarService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
CalendarService.ctorParameters = () => [
    { type: SuggestionService },
    { type: ComponentFactoryResolver },
    { type: Injector },
    { type: ApplicationRef }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtY2FsZW5kYXIvIiwic291cmNlcyI6WyJzcmMvY2FsZW5kYXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBRSx3QkFBd0IsRUFBRSxRQUFRLEVBQUUsY0FBYyxFQUFlLE1BQU0sZUFBZSxDQUFDO0FBQzNHLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLFdBQVcsQ0FBQztBQUM1QyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFFNUMsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7QUFDbEMsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0scUNBQXFDLENBQUM7O01BQzVFLE1BQU0sR0FBRyxPQUFPO0FBRXRCLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7QUFHcEIsTUFBTSxPQUFPLGVBQWU7Ozs7Ozs7SUFZeEIsWUFDWSxjQUFpQyxFQUNqQyx3QkFBa0QsRUFDbEQsUUFBa0IsRUFDbEIsTUFBc0I7UUFIdEIsbUJBQWMsR0FBZCxjQUFjLENBQW1CO1FBQ2pDLDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBMEI7UUFDbEQsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNsQixXQUFNLEdBQU4sTUFBTSxDQUFnQjtRQWZsQyxVQUFLLEdBQUc7WUFDSixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87WUFDckIsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO1lBQ3JCLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVTtTQUM5QixDQUFDO1FBQ0YsMEJBQXFCLEdBQUcsb0JBQW9CLENBQUM7UUFHckMsU0FBSSxHQUFlLEVBQUUsQ0FBQztRQVMxQixTQUFTLENBQUMsT0FBTyxHQUFHLDRCQUE0QixDQUFDO1FBQ2pELFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFP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QXdCLENBQUMsdUJBQXVCLENBQUMsMkJBQTJCLENBQUM7UUFDM0csSUFBSSxDQUFDLGFBQWEsR0FBRyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzVELElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDeEQsQ0FBQzs7O1lBdkhKLFVBQVU7Ozs7WUFUSCxpQkFBaUI7WUFETCx3QkFBd0I7WUFBRSxRQUFRO1lBQUUsY0FBYzs7OztJQVlsRSxnQ0FJRTs7SUFDRixnREFBNkM7Ozs7O0lBRTdDLGlDQUF3Qjs7Ozs7SUFDeEIsK0JBQThCOzs7OztJQUM5Qix3Q0FBaUU7Ozs7O0lBRzdELHlDQUF5Qzs7Ozs7SUFDekMsbURBQTBEOzs7OztJQUMxRCxtQ0FBMEI7Ozs7O0lBQzFCLGlDQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZSwgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBJbmplY3RvciwgQXBwbGljYXRpb25SZWYsIENvbXBvbmVudFJlZn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1N1Z2dlc3Rpb25TZXJ2aWNlfSBmcm9tICdpbmV0LWNvcmUnO1xuaW1wb3J0IHt4Q2FsZW5kYXJ9IGZyb20gXCIuL3V0aWxzL3hDYWxlbmRhclwiO1xuaW1wb3J0IHtDYWxFdmVudH0gZnJvbSBcIi4vdXRpbHMvbW9kZWwvQ2FsRXZlbnRcIjtcbmltcG9ydCAqIGFzIG1vbWVudF8gZnJvbSBcIm1vbWVudFwiO1xuaW1wb3J0IHsgQ2FsZW5kYXJEaWFsb2dWaWV3Q29tcG9uZW50IH0gZnJvbSAnLi9kaWFsb2ctdmlldy9kaWFsb2ctdmlldy5jb21wb25lbnQnO1xuY29uc3QgbW9tZW50ID0gbW9tZW50XztcbmRlY2xhcmUgbGV0IGlOZXQ6IGFueTtcbm1vbWVudC5sb2NhbGUoJ3ZpJyk7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDYWxlbmRhclNlcnZpY2Uge1xuICAgIG15T3JnID0ge1xuICAgICAgICBvcmdhbklkOiBpTmV0Lm9yZ2FuSWQsXG4gICAgICAgIG9yZ05hbWU6IGlOZXQub3JnTmFtZSxcbiAgICAgICAgZmlybVByZWZpeDogaU5ldC5maXJtUHJlZml4XG4gICAgfTtcbiAgICBsb2NhdGlvbktleVN1Z2dlc3Rpb24gPSAneGNhbGVuZGFyX2xvY2F0aW9uJztcblxuICAgIHByaXZhdGUgX3JlYWR5OiBib29sZWFuO1xuICAgIHByaXZhdGUgX2ZuczogRnVuY3Rpb25bXSA9IFtdO1xuICAgIHByaXZhdGUgX3ZpZXdNb2RhbFJlZjogQ29tcG9uZW50UmVmPENhbGVuZGFyRGlhbG9nVmlld0NvbXBvbmVudD47XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBzdWdnZXN0U2VydmljZTogU3VnZ2VzdGlvblNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgICAgIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yLFxuICAgICAgICBwcml2YXRlIGFwcFJlZjogQXBwbGljYXRpb25SZWYsXG4gICAgKSB7XG4gICAgICAgIHhDYWxlbmRhci5yb2xlVXJsID0gJ3VuaWNvcm4vcGFnZS9jYWxlbmRhci9yb2xlJztcbiAgICAgICAgeENhbGVuZGFyLnNldE9yZ0lkKHRoaXMubXlPcmcub3JnYW5JZCk7XG4gICAgICAgIHhDYWxlbmRhci5yZWFkeSgoKSA9PiB7XG4gICAgICAgICAgICB4Q2FsZW5kYXIubG9hZFJvbGUodGhpcy5teU9yZy5vcmdhbklkLCAocm9sZSkgPT4ge1xuICAgICAgICAgICAgICAgIHhDYWxlbmRhci5zZXRPcmdJZCh0aGlzLm15T3JnLm9yZ2FuSWQpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlYWR5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLl90cmlnZ2VyUmVhZHkoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZWFkeShjYWxsYmFjazogRnVuY3Rpb24pIHtcbiAgICAgICAgaWYgKHRoaXMuX3JlYWR5KSB7XG4gICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fZm5zLnB1c2goY2FsbGJhY2spO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfdHJpZ2dlclJlYWR5KCkge1xuICAgICAgICB0aGlzLl9mbnMuZm9yRWFjaChmbiA9PiBmbigpKTtcbiAgICAgICAgdGhpcy5fZm5zID0gW107XG4gICAgfVxuXG4gICAgc2VhcmNoTG9jYXRpb24oY29udGVudDogc3RyaW5nLCBjYWxsYmFjazogRnVuY3Rpb24pIHtcbiAgICAgICAgaWYgKCFjb250ZW50KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHBhcmFtcyA9IHtcbiAgICAgICAgICAgIGtleXdvcmQ6IHRoaXMubG9jYXRpb25LZXlTdWdnZXN0aW9uLFxuICAgICAgICAgICAgY29udGVudDogY29udGVudFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnN1Z2dlc3RTZXJ2aWNlLmxvYWRTdWdnZXN0aW9uKHBhcmFtcywgY2FsbGJhY2spO1xuICAgIH1cblxuICAgIHNhdmVMb2NhdGlvbihjb250ZW50OiBzdHJpbmcsIGNhbGxiYWNrOiBGdW5jdGlvbikge1xuICAgICAgICBpZiAoIWNvbnRlbnQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgcGFyYW1zID0ge1xuICAgICAgICAgICAga2V5d29yZDogdGhpcy5sb2NhdGlvbktleVN1Z2dlc3Rpb24sXG4gICAgICAgICAgICBjb250ZW50OiBjb250ZW50XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc3VnZ2VzdFNlcnZpY2Uuc2F2ZVN1Z2dlc3Rpb24ocGFyYW1zLCBjYWxsYmFjayk7XG4gICAgfVxuXG4gICAgY3JlYXRlRXZlbnQocGFyYW1zLCBjYWxsYmFjaykge1xuICAgICAgICB0aGlzLnJlYWR5KCgpID0+IHhDYWxlbmRhci5jcmVhdGUocGFyYW1zLCBjYWxsYmFjaykpO1xuICAgIH1cblxuICAgIHVwZGF0ZUV2ZW50KHBhcmFtcywgY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5yZWFkeSgoKSA9PiB4Q2FsZW5kYXIudXBkYXRlKHBhcmFtcywgY2FsbGJhY2spKTtcbiAgICB9XG5cbiAgICByZW1vdmVFdmVudChwYXJhbXMsIGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMucmVhZHkoKCkgPT4geENhbGVuZGFyLnJlbW92ZShwYXJhbXMsIGNhbGxiYWNrKSk7XG4gICAgfVxuXG4gICAgYXR0ZW5kZWVTZWFyY2gocGFyYW1zLCBjYWxsYmFjaykge1xuICAgICAgICB0aGlzLnJlYWR5KCgpID0+IHhDYWxlbmRhci5sb2FkVXNlckJ5S2V5d29yZChwYXJhbXMsIGNhbGxiYWNrKSk7XG4gICAgfVxuXG4gICAgbG9hZEF0dGVuZGVlcyhjYWxsYmFjaykge1xuICAgICAgICB0aGlzLnJlYWR5KCgpID0+IHhDYWxlbmRhci5zZWFyY2hBdHRlbmRlZSh7fSwgY2FsbGJhY2spKTtcbiAgICB9XG5cbiAgICBsb2FkRXZlbnRzKHBhcmFtcywgY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5yZWFkeSgoKSA9PiB4Q2FsZW5kYXIuZ2V0TGlzdEV2ZW50cyhwYXJhbXMsIGNhbGxiYWNrKSk7XG4gICAgfVxuXG4gICAgbG9hZE1vbnRoRXZlbnRzKGRhdGUsIGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMucmVhZHkoKCkgPT4geENhbGVuZGFyLmxvYWRNb250aEV2ZW50cyh7fSwgZGF0ZSwgY2FsbGJhY2spKTtcbiAgICB9XG5cbiAgICBsb2FkRXZlbnQocGFyYW1zLCBjYWxsYmFjaykge1xuICAgICAgICB0aGlzLnJlYWR5KCgpID0+IHhDYWxlbmRhci5sb2FkRXZlbnQocGFyYW1zLCBjYWxsYmFjaykpO1xuICAgIH1cblxuICAgIGRlbGV0ZUF0dGFjaG1lbnQocGFyYW1zLCBjYWxsYmFjazogRnVuY3Rpb24pIHtcbiAgICAgICAgdGhpcy5yZWFkeSgoKSA9PiB4Q2FsZW5kYXIuZGVsZXRlQXR0YWNobWVudChwYXJhbXMsY2FsbGJhY2spKTtcbiAgICB9XG5cbiAgICB2aWV3RXZlbnQoZXZlbnQ6IENhbEV2ZW50LCBqc0V2ZW50OiBNb3VzZUV2ZW50LCB0YXJnZXQ6IEhUTUxFbGVtZW50LCBvbkNoYW5nZTogRnVuY3Rpb24pIHtcbiAgICAgICAgdGhpcy5faW5pdFZpZXdNb2RhbCgpO1xuICAgICAgICB0aGlzLl92aWV3TW9kYWxSZWYuaW5zdGFuY2Uudmlld0V2ZW50KGV2ZW50LCBqc0V2ZW50LCB0YXJnZXQsIG9uQ2hhbmdlKTtcbiAgICB9XG5cbiAgICBoaWRlVmlld01vZGFsKCkge1xuICAgICAgICBpZiAodGhpcy5fdmlld01vZGFsUmVmKSB7XG4gICAgICAgICAgICB0aGlzLl92aWV3TW9kYWxSZWYuaW5zdGFuY2UuaGlkZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaW5pdFZpZXdNb2RhbCgpIHtcbiAgICAgICAgaWYgKHRoaXMuX3ZpZXdNb2RhbFJlZikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNvbXBvbmVudEZhY3RvcnkgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShDYWxlbmRhckRpYWxvZ1ZpZXdDb21wb25lbnQpO1xuICAgICAgICB0aGlzLl92aWV3TW9kYWxSZWYgPSBjb21wb25lbnRGYWN0b3J5LmNyZWF0ZSh0aGlzLmluamVjdG9yKTtcbiAgICAgICAgdGhpcy5hcHBSZWYuYXR0YWNoVmlldyh0aGlzLl92aWV3TW9kYWxSZWYuaG9zdFZpZXcpO1xuICAgIH1cbn1cbiJdfQ==