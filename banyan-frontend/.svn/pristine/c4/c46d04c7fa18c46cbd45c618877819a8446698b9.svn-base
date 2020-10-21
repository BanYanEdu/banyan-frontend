/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarDialogDelete } from "../dialog-delete/dialog-delete.component";
import { CalendarEvent } from "../model/CalendarEvent";
import { CalendarUtils } from "../CalendarUtils";
var CalendarDialogViewComponent = /** @class */ (function () {
    function CalendarDialogViewComponent(router) {
        this.router = router;
        this.onChange = new EventEmitter();
    }
    /**
     * @return {?}
     */
    CalendarDialogViewComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this._initModalView();
        this._addScrollUpdatePos();
    };
    /**
     * @return {?}
     */
    CalendarDialogViewComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._destroyModalView();
        this._removeScrollUpdatePos();
    };
    /**
     * @return {?}
     */
    CalendarDialogViewComponent.prototype.editEvent = /**
     * @return {?}
     */
    function () {
        this.hide();
        this.router.navigate(['/calendar/event', this.calendarEvent.event.uuid || '']);
    };
    /**
     * @return {?}
     */
    CalendarDialogViewComponent.prototype.changeEvent = /**
     * @return {?}
     */
    function () {
        this.hide();
        this.onChange.emit();
        this._onChange();
    };
    /**
     * @param {?} event
     * @param {?} jsEvent
     * @param {?} target
     * @param {?} onChange
     * @return {?}
     */
    CalendarDialogViewComponent.prototype.viewEvent = /**
     * @param {?} event
     * @param {?} jsEvent
     * @param {?} target
     * @param {?} onChange
     * @return {?}
     */
    function (event, jsEvent, target, onChange) {
        var _this = this;
        this._onChange = onChange;
        this.calendarEvent = new CalendarEvent(event);
        this.calEvent = event;
        this._targetEl = target;
        this._jsEvent = jsEvent;
        this._syncBodyHeight();
        this._preventScrolling();
        jsEvent.stopPropagation();
        setTimeout((/**
         * @return {?}
         */
        function () { return _this._openModal(jsEvent, target); }), 100);
    };
    /**
     * @return {?}
     */
    CalendarDialogViewComponent.prototype.hide = /**
     * @return {?}
     */
    function () {
        this._showModal = false;
        this._$modalView.hide();
        this._$modalView.css('opacity', 0);
    };
    /**
     * @return {?}
     */
    CalendarDialogViewComponent.prototype.show = /**
     * @return {?}
     */
    function () {
        this._showModal = true;
        this._$modalView.show();
    };
    /**
     * @return {?}
     */
    CalendarDialogViewComponent.prototype.removeEvent = /**
     * @return {?}
     */
    function () {
        this.viewDeleteModal.show();
    };
    /**
     * @private
     * @return {?}
     */
    CalendarDialogViewComponent.prototype._preventScrolling = /**
     * @private
     * @return {?}
     */
    function () {
        $(document.scrollingElement).css('overflow', 'hidden');
        clearTimeout(this._scrollTimer);
        this._scrollTimer = setTimeout((/**
         * @return {?}
         */
        function () {
            $(document.scrollingElement).css('overflow', '');
        }), 600);
    };
    /**
     * @private
     * @return {?}
     */
    CalendarDialogViewComponent.prototype._syncBodyHeight = /**
     * @private
     * @return {?}
     */
    function () {
        this.maxHeight = innerHeight - 150;
    };
    /**
     * @private
     * @return {?}
     */
    CalendarDialogViewComponent.prototype._initModalView = /**
     * @private
     * @return {?}
     */
    function () {
        this._$modalView = $(this.modalView.nativeElement).hide();
        // Click outside to close
        this.hide = this.hide.bind(this);
        document.body.addEventListener('click', this.hide);
        // Prevent close
        this._$modalView.on('click', (/**
         * @param {?} e
         * @return {?}
         */
        function (e) { return e.stopPropagation(); }));
        // Append modal to body
        $(document.body).append(this._$modalView);
    };
    /**
     * @private
     * @return {?}
     */
    CalendarDialogViewComponent.prototype._destroyModalView = /**
     * @private
     * @return {?}
     */
    function () {
        document.body.removeEventListener('click', this.hide);
        this._$modalView.remove();
    };
    /**
     * @private
     * @return {?}
     */
    CalendarDialogViewComponent.prototype._addScrollUpdatePos = /**
     * @private
     * @return {?}
     */
    function () {
        this._scrollUpdatePos = this._scrollUpdatePos.bind(this);
        document.addEventListener('scroll', this._scrollUpdatePos, true);
    };
    /**
     * @private
     * @return {?}
     */
    CalendarDialogViewComponent.prototype._removeScrollUpdatePos = /**
     * @private
     * @return {?}
     */
    function () {
        document.removeEventListener('scroll', this._scrollUpdatePos);
    };
    /**
     * @private
     * @return {?}
     */
    CalendarDialogViewComponent.prototype._scrollUpdatePos = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        // Delay update pos for performance
        if (this._showModal && this._jsEvent && this._targetEl) {
            clearTimeout(this._timer);
            this._timer = setTimeout((/**
             * @return {?}
             */
            function () { return _this._openModal(_this._jsEvent, _this._targetEl); }), 100);
        }
    };
    /**
     * @private
     * @param {?} jsEvent
     * @param {?} target
     * @return {?}
     */
    CalendarDialogViewComponent.prototype._openModal = /**
     * @private
     * @param {?} jsEvent
     * @param {?} target
     * @return {?}
     */
    function (jsEvent, target) {
        // Show to get real size
        this.show();
        /** @type {?} */
        var pos = CalendarUtils.computePosByTargetEl(this.modalView.nativeElement, target, jsEvent);
        /** @type {?} */
        var transformCss = 'translate3d(' + pos.left + 'px,' + pos.top + 'px,0)';
        // Use transform translate3d to boot performance
        this._$modalView.css({
            '-webkit-transition-duration': '300ms',
            'transition-duration': '300ms',
            'opacity': '1',
            '-webkit-transform': transformCss,
            'transform': transformCss,
        });
    };
    CalendarDialogViewComponent.decorators = [
        { type: Component, args: [{
                    template: "<div #modalView class=\"modal-dialog popover\" role=\"document\">\n    <div class=\"modal-content\" *ngIf=\"calEvent\">\n            <div class=\"header-dialog\" [ngClass]=\"{'overlay': titleOverlay}\">\n                <i class=\"fa fa-pencil\" *ngIf=\"calEvent.isCreator || !!calendarEvent.myAttendee\" (click)=\"editEvent()\" title=\"Ch\u1EC9nh s\u1EEDa\"></i>\n                <i class=\"fa fa-trash\" *ngIf=\"calEvent.isCreator\" (click)=\"removeEvent()\" title=\"X\u00F3a\"></i>\n                <i (click)=\"hide()\" class=\"fa fa-times\" title=\"\u0110\u00F3ng\"></i>\n            </div>\n        <div class=\"content-dialog\" [ngStyle]=\"{'max-height.px': maxHeight}\">\n                <div class=\"field-group\">\n                    <i class=\"field-icon fa fa-calendar\"></i>\n                    <div class=\"field-content\">\n                        <div style=\"font-size:18px\" [innerHTML]=\"calendarEvent.subject\"></div>\n                        <div>{{calendarEvent.timeDisplay}}</div>\n                        <div>{{calendarEvent.repeatText}}</div>\n                    </div>\n                </div>\n                <div class=\"field-group\" *ngIf=\"calEvent.memberStr\">\n                    <i class=\"field-icon fa fa-users\" title=\"Kh\u00E1ch m\u1EDDi tham d\u1EF1\"></i>\n                    <div class=\"field-content\">\n                        <calendar-attendee-list [attendees]=\"calEvent.attendees\" [expandable]=\"true\"></calendar-attendee-list>\n                    </div>\n                </div>\n                <div class=\"field-group\" *ngIf=\"calEvent.location\">\n                    <i class=\"field-icon fa fa-map-marker\" title=\"\u0110\u1ECBa \u0111i\u1EC3m\"></i>\n                    <div class=\"field-content\">{{ calEvent.location }}</div>\n                </div>\n                <div class=\"field-group\" *ngIf=\"calendarEvent.summary\">\n                    <i class=\"field-icon fa fa-align-left\" title=\"M\u00F4 t\u1EA3 s\u1EF1 ki\u1EC7n\"></i>\n                    <div class=\"field-content\" [innerHTML]=\"calendarEvent.summary\"></div>\n                </div>\n                <div class=\"field-group\" *ngIf=\"calEvent['fullname']\">\n                    <i class=\"field-icon fa fa-user-circle\" title=\"Ng\u01B0\u1EDDi t\u1EA1o\"></i>\n                    <div class=\"field-content\">{{ calEvent['fullname'] }}</div>\n                </div>\n                <div class=\"field-group\" *ngIf=\"calEvent?.attachments?.length\">\n                    <i class=\"field-icon fa fa-paperclip\" title=\"T\u1EADp tin \u0111\u00EDnh k\u00E8m\"></i>\n                    <div class=\"field-content\">\n                        <calendar-attachment-list [calEvent]=\"calEvent\"></calendar-attachment-list>\n                    </div>\n                </div>\n            </div>\n    </div>\n</div>\n<calendar-dialog-delete #dialogRemove hidden [calEvent]=\"calEvent\" (onDelete)=\"changeEvent()\"></calendar-dialog-delete>\n",
                    styles: [".modal-dialog{min-width:450px;margin:0;z-index:1040!important}.modal-content{padding:0;border-radius:4px;border:0;box-shadow:1px 1px 7px 3px rgba(0,0,0,.14)}.header-dialog{padding:10px 25px;text-align:right}.header-dialog .overlay{border-bottom:1px solid #eee}.header-dialog>i{cursor:pointer;width:34px;height:34px;line-height:34px;text-align:center;font-size:18px;border-radius:50%;color:#555;margin-left:10px}.header-dialog>i:hover{background:rgba(0,0,0,.1)}.field-group{margin-bottom:20px;padding-left:14px;padding-right:5px}.field-icon{width:30px;float:left;color:#666;font-size:20px;text-align:center;margin-right:15px;margin-top:2px}.field-content{overflow:hidden;line-height:1.6}.file-attach-layout{float:left;max-width:144px;border:1px solid #fff;padding-right:5px}.file-attach-content{height:36px;line-height:36px;border-radius:2px;cursor:pointer;color:#2a6496;margin-bottom:7px}.file-attach-img{float:left;width:20px;height:20px;margin-top:6px;margin-right:10px}.file-attach-text{display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}a{color:#428bca;text-decoration:none;background:0 0}a:not([href]):hover{text-decoration:underline}.content-dialog{overflow-y:auto}"]
                }] }
    ];
    /** @nocollapse */
    CalendarDialogViewComponent.ctorParameters = function () { return [
        { type: Router }
    ]; };
    CalendarDialogViewComponent.propDecorators = {
        onChange: [{ type: Output }],
        modalView: [{ type: ViewChild, args: ['modalView',] }],
        viewDeleteModal: [{ type: ViewChild, args: ['dialogRemove',] }]
    };
    return CalendarDialogViewComponent;
}());
export { CalendarDialogViewComponent };
if (false) {
    /** @type {?} */
    CalendarDialogViewComponent.prototype.onChange;
    /** @type {?} */
    CalendarDialogViewComponent.prototype.modalView;
    /** @type {?} */
    CalendarDialogViewComponent.prototype.viewDeleteModal;
    /** @type {?} */
    CalendarDialogViewComponent.prototype.calendarEvent;
    /** @type {?} */
    CalendarDialogViewComponent.prototype.calEvent;
    /** @type {?} */
    CalendarDialogViewComponent.prototype.maxHeight;
    /** @type {?} */
    CalendarDialogViewComponent.prototype.titleOverlay;
    /**
     * @type {?}
     * @private
     */
    CalendarDialogViewComponent.prototype._showModal;
    /**
     * @type {?}
     * @private
     */
    CalendarDialogViewComponent.prototype._targetEl;
    /**
     * @type {?}
     * @private
     */
    CalendarDialogViewComponent.prototype._jsEvent;
    /**
     * @type {?}
     * @private
     */
    CalendarDialogViewComponent.prototype._timer;
    /**
     * @type {?}
     * @private
     */
    CalendarDialogViewComponent.prototype._scrollTimer;
    /**
     * @type {?}
     * @private
     */
    CalendarDialogViewComponent.prototype._$modalView;
    /**
     * @type {?}
     * @private
     */
    CalendarDialogViewComponent.prototype._onChange;
    /**
     * @type {?}
     * @private
     */
    CalendarDialogViewComponent.prototype.router;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLXZpZXcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC1jYWxlbmRhci8iLCJzb3VyY2VzIjpbInNyYy9kaWFsb2ctdmlldy9kaWFsb2ctdmlldy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBZ0IsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQWEsTUFBTSxFQUFFLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMvRyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFFdkMsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sMENBQTBDLENBQUM7QUFDOUUsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ3JELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUcvQztJQW9CSSxxQ0FBb0IsTUFBYztRQUFkLFdBQU0sR0FBTixNQUFNLENBQVE7UUFmeEIsYUFBUSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7SUFlSCxDQUFDOzs7O0lBRXRDLHFEQUFlOzs7SUFBZjtRQUNJLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztJQUMvQixDQUFDOzs7O0lBRUQsaURBQVc7OztJQUFYO1FBQ0ksSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7SUFDbEMsQ0FBQzs7OztJQUVELCtDQUFTOzs7SUFBVDtRQUNJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNaLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDbkYsQ0FBQzs7OztJQUVELGlEQUFXOzs7SUFB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QUFDLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUM7O1lBRXZGLFlBQVksR0FBRyxjQUFjLEdBQUcsR0FBRyxDQUFDLElBQUksR0FBRyxLQUFLLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxPQUFPO1FBQ3hFLGdEQUFnRDtRQUNoRCxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQztZQUNqQiw2QkFBNkIsRUFBRSxPQUFPO1lBQ3RDLHFCQUFxQixFQUFFLE9BQU87WUFDOUIsU0FBUyxFQUFFLEdBQUc7WUFDZCxtQkFBbUIsRUFBRSxZQUFZO1lBQ2pDLFdBQVcsRUFBRSxZQUFZO1NBQzVCLENBQUMsQ0FBQztJQUNQLENBQUM7O2dCQXJJSixTQUFTLFNBQUM7b0JBQ1AsbTdGQUEyQzs7aUJBRTlDOzs7O2dCQVZPLE1BQU07OzsyQkFZVCxNQUFNOzRCQUNOLFNBQVMsU0FBQyxXQUFXO2tDQUNyQixTQUFTLFNBQUMsY0FBYzs7SUErSDdCLGtDQUFDO0NBQUEsQUF0SUQsSUFzSUM7U0FsSVksMkJBQTJCOzs7SUFDcEMsK0NBQXdDOztJQUN4QyxnREFBOEM7O0lBQzlDLHNEQUFpRTs7SUFDakUsb0RBQTZCOztJQUM3QiwrQ0FBbUI7O0lBQ25CLGdEQUFrQjs7SUFDbEIsbURBQXNCOzs7OztJQUN0QixpREFBNEI7Ozs7O0lBQzVCLGdEQUErQjs7Ozs7SUFDL0IsK0NBQTZCOzs7OztJQUM3Qiw2Q0FBZTs7Ozs7SUFDZixtREFBcUI7Ozs7O0lBQ3JCLGtEQUFvQjs7Ozs7SUFDcEIsZ0RBQTRCOzs7OztJQUVoQiw2Q0FBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0FmdGVyVmlld0luaXQsIENvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBPbkRlc3Ryb3ksIE91dHB1dCwgVmlld0NoaWxkfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Um91dGVyfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHtDYWxFdmVudH0gZnJvbSBcIi4uL3V0aWxzL21vZGVsL0NhbEV2ZW50XCI7XG5pbXBvcnQge0NhbGVuZGFyRGlhbG9nRGVsZXRlfSBmcm9tIFwiLi4vZGlhbG9nLWRlbGV0ZS9kaWFsb2ctZGVsZXRlLmNvbXBvbmVudFwiO1xuaW1wb3J0IHtDYWxlbmRhckV2ZW50fSBmcm9tIFwiLi4vbW9kZWwvQ2FsZW5kYXJFdmVudFwiO1xuaW1wb3J0IHtDYWxlbmRhclV0aWxzfSBmcm9tIFwiLi4vQ2FsZW5kYXJVdGlsc1wiO1xuZGVjbGFyZSBsZXQgJDphbnk7XG5cbkBDb21wb25lbnQoe1xuICAgIHRlbXBsYXRlVXJsOiAnLi9kaWFsb2ctdmlldy5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vZGlhbG9nLXZpZXcuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIENhbGVuZGFyRGlhbG9nVmlld0NvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gICAgQE91dHB1dCgpIG9uQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBWaWV3Q2hpbGQoJ21vZGFsVmlldycpIG1vZGFsVmlldzogRWxlbWVudFJlZjtcbiAgICBAVmlld0NoaWxkKCdkaWFsb2dSZW1vdmUnKSB2aWV3RGVsZXRlTW9kYWw6IENhbGVuZGFyRGlhbG9nRGVsZXRlO1xuICAgIGNhbGVuZGFyRXZlbnQ6IENhbGVuZGFyRXZlbnQ7XG4gICAgY2FsRXZlbnQ6IENhbEV2ZW50O1xuICAgIG1heEhlaWdodDogbnVtYmVyO1xuICAgIHRpdGxlT3ZlcmxheTogYm9vbGVhbjtcbiAgICBwcml2YXRlIF9zaG93TW9kYWw6IGJvb2xlYW47XG4gICAgcHJpdmF0ZSBfdGFyZ2V0RWw6IEhUTUxFbGVtZW50O1xuICAgIHByaXZhdGUgX2pzRXZlbnQ6IE1vdXNlRXZlbnQ7XG4gICAgcHJpdmF0ZSBfdGltZXI7XG4gICAgcHJpdmF0ZSBfc2Nyb2xsVGltZXI7XG4gICAgcHJpdmF0ZSBfJG1vZGFsVmlldztcbiAgICBwcml2YXRlIF9vbkNoYW5nZTogRnVuY3Rpb247XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyKSB7fVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICB0aGlzLl9pbml0TW9kYWxWaWV3KCk7XG4gICAgICAgIHRoaXMuX2FkZFNjcm9sbFVwZGF0ZVBvcygpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLl9kZXN0cm95TW9kYWxWaWV3KCk7XG4gICAgICAgIHRoaXMuX3JlbW92ZVNjcm9sbFVwZGF0ZVBvcygpO1xuICAgIH1cblxuICAgIGVkaXRFdmVudCgpIHtcbiAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2NhbGVuZGFyL2V2ZW50JywgdGhpcy5jYWxlbmRhckV2ZW50LmV2ZW50LnV1aWQgfHwgJyddKTtcbiAgICB9XG5cbiAgICBjaGFuZ2VFdmVudCgpIHtcbiAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgIHRoaXMub25DaGFuZ2UuZW1pdCgpO1xuICAgICAgICB0aGlzLl9vbkNoYW5nZSgpO1xuICAgIH1cblxuICAgIHZpZXdFdmVudChldmVudDogQ2FsRXZlbnQsIGpzRXZlbnQ6IE1vdXNlRXZlbnQsIHRhcmdldDogSFRNTEVsZW1lbnQsIG9uQ2hhbmdlOiBGdW5jdGlvbikge1xuICAgICAgICB0aGlzLl9vbkNoYW5nZSA9IG9uQ2hhbmdlO1xuICAgICAgICB0aGlzLmNhbGVuZGFyRXZlbnQgPSBuZXcgQ2FsZW5kYXJFdmVudChldmVudCk7XG4gICAgICAgIHRoaXMuY2FsRXZlbnQgPSBldmVudDtcbiAgICAgICAgdGhpcy5fdGFyZ2V0RWwgPSB0YXJnZXQ7XG4gICAgICAgIHRoaXMuX2pzRXZlbnQgPSBqc0V2ZW50O1xuICAgICAgICB0aGlzLl9zeW5jQm9keUhlaWdodCgpO1xuICAgICAgICB0aGlzLl9wcmV2ZW50U2Nyb2xsaW5nKCk7XG4gICAgICAgIGpzRXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5fb3Blbk1vZGFsKGpzRXZlbnQsIHRhcmdldCksIDEwMClcbiAgICB9XG5cbiAgICBoaWRlKCkge1xuICAgICAgICB0aGlzLl9zaG93TW9kYWwgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fJG1vZGFsVmlldy5oaWRlKCk7XG4gICAgICAgIHRoaXMuXyRtb2RhbFZpZXcuY3NzKCdvcGFjaXR5JywgMCk7XG4gICAgfVxuXG4gICAgc2hvdygpIHtcbiAgICAgICAgdGhpcy5fc2hvd01vZGFsID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fJG1vZGFsVmlldy5zaG93KCk7XG4gICAgfVxuXG4gICAgcmVtb3ZlRXZlbnQoKSB7XG4gICAgICAgIHRoaXMudmlld0RlbGV0ZU1vZGFsLnNob3coKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9wcmV2ZW50U2Nyb2xsaW5nKCkge1xuICAgICAgICAkKGRvY3VtZW50LnNjcm9sbGluZ0VsZW1lbnQpLmNzcygnb3ZlcmZsb3cnLCAnaGlkZGVuJyk7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLl9zY3JvbGxUaW1lcik7XG4gICAgICAgIHRoaXMuX3Njcm9sbFRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAkKGRvY3VtZW50LnNjcm9sbGluZ0VsZW1lbnQpLmNzcygnb3ZlcmZsb3cnLCAnJyk7XG4gICAgICAgIH0sIDYwMCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfc3luY0JvZHlIZWlnaHQoKSB7XG4gICAgICAgIHRoaXMubWF4SGVpZ2h0ID0gaW5uZXJIZWlnaHQgLSAxNTA7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaW5pdE1vZGFsVmlldygpIHtcbiAgICAgICAgdGhpcy5fJG1vZGFsVmlldyA9ICQodGhpcy5tb2RhbFZpZXcubmF0aXZlRWxlbWVudCkuaGlkZSgpO1xuXG4gICAgICAgIC8vIENsaWNrIG91dHNpZGUgdG8gY2xvc2VcbiAgICAgICAgdGhpcy5oaWRlID0gdGhpcy5oaWRlLmJpbmQodGhpcyk7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhpZGUpO1xuXG4gICAgICAgIC8vIFByZXZlbnQgY2xvc2VcbiAgICAgICAgdGhpcy5fJG1vZGFsVmlldy5vbignY2xpY2snLCAoZSkgPT4gZS5zdG9wUHJvcGFnYXRpb24oKSk7XG5cbiAgICAgICAgLy8gQXBwZW5kIG1vZGFsIHRvIGJvZHlcbiAgICAgICAgJChkb2N1bWVudC5ib2R5KS5hcHBlbmQodGhpcy5fJG1vZGFsVmlldyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZGVzdHJveU1vZGFsVmlldygpIHtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGlkZSk7XG4gICAgICAgIHRoaXMuXyRtb2RhbFZpZXcucmVtb3ZlKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfYWRkU2Nyb2xsVXBkYXRlUG9zKCkge1xuICAgICAgICB0aGlzLl9zY3JvbGxVcGRhdGVQb3MgPSB0aGlzLl9zY3JvbGxVcGRhdGVQb3MuYmluZCh0aGlzKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5fc2Nyb2xsVXBkYXRlUG9zLCB0cnVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9yZW1vdmVTY3JvbGxVcGRhdGVQb3MoKSB7XG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuX3Njcm9sbFVwZGF0ZVBvcyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfc2Nyb2xsVXBkYXRlUG9zKCkge1xuICAgICAgICAvLyBEZWxheSB1cGRhdGUgcG9zIGZvciBwZXJmb3JtYW5jZVxuICAgICAgICBpZiAodGhpcy5fc2hvd01vZGFsICYmIHRoaXMuX2pzRXZlbnQgJiYgdGhpcy5fdGFyZ2V0RWwpIHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLl90aW1lcik7XG4gICAgICAgICAgICB0aGlzLl90aW1lciA9IHNldFRpbWVvdXQoKCkgPT4gdGhpcy5fb3Blbk1vZGFsKHRoaXMuX2pzRXZlbnQsIHRoaXMuX3RhcmdldEVsKSwgMTAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX29wZW5Nb2RhbChqc0V2ZW50LCB0YXJnZXQ6IEhUTUxFbGVtZW50KSB7XG4gICAgICAgIC8vIFNob3cgdG8gZ2V0IHJlYWwgc2l6ZVxuICAgICAgICB0aGlzLnNob3coKTtcblxuICAgICAgICBsZXQgcG9zID0gQ2FsZW5kYXJVdGlscy5jb21wdXRlUG9zQnlUYXJnZXRFbCh0aGlzLm1vZGFsVmlldy5uYXRpdmVFbGVtZW50LCB0YXJnZXQsIGpzRXZlbnQpO1xuXG4gICAgICAgIGxldCB0cmFuc2Zvcm1Dc3MgPSAndHJhbnNsYXRlM2QoJyArIHBvcy5sZWZ0ICsgJ3B4LCcgKyBwb3MudG9wICsgJ3B4LDApJztcbiAgICAgICAgLy8gVXNlIHRyYW5zZm9ybSB0cmFuc2xhdGUzZCB0byBib290IHBlcmZvcm1hbmNlXG4gICAgICAgIHRoaXMuXyRtb2RhbFZpZXcuY3NzKHtcbiAgICAgICAgICAgICctd2Via2l0LXRyYW5zaXRpb24tZHVyYXRpb24nOiAnMzAwbXMnLFxuICAgICAgICAgICAgJ3RyYW5zaXRpb24tZHVyYXRpb24nOiAnMzAwbXMnLFxuICAgICAgICAgICAgJ29wYWNpdHknOiAnMScsXG4gICAgICAgICAgICAnLXdlYmtpdC10cmFuc2Zvcm0nOiB0cmFuc2Zvcm1Dc3MsXG4gICAgICAgICAgICAndHJhbnNmb3JtJzogdHJhbnNmb3JtQ3NzLFxuICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=