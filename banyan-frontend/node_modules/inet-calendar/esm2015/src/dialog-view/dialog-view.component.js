/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarDialogDelete } from "../dialog-delete/dialog-delete.component";
import { CalendarEvent } from "../model/CalendarEvent";
import { CalendarUtils } from "../CalendarUtils";
export class CalendarDialogViewComponent {
    /**
     * @param {?} router
     */
    constructor(router) {
        this.router = router;
        this.onChange = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this._initModalView();
        this._addScrollUpdatePos();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._destroyModalView();
        this._removeScrollUpdatePos();
    }
    /**
     * @return {?}
     */
    editEvent() {
        this.hide();
        this.router.navigate(['/calendar/event', this.calendarEvent.event.uuid || '']);
    }
    /**
     * @return {?}
     */
    changeEvent() {
        this.hide();
        this.onChange.emit();
        this._onChange();
    }
    /**
     * @param {?} event
     * @param {?} jsEvent
     * @param {?} target
     * @param {?} onChange
     * @return {?}
     */
    viewEvent(event, jsEvent, target, onChange) {
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
        () => this._openModal(jsEvent, target)), 100);
    }
    /**
     * @return {?}
     */
    hide() {
        this._showModal = false;
        this._$modalView.hide();
        this._$modalView.css('opacity', 0);
    }
    /**
     * @return {?}
     */
    show() {
        this._showModal = true;
        this._$modalView.show();
    }
    /**
     * @return {?}
     */
    removeEvent() {
        this.viewDeleteModal.show();
    }
    /**
     * @private
     * @return {?}
     */
    _preventScrolling() {
        $(document.scrollingElement).css('overflow', 'hidden');
        clearTimeout(this._scrollTimer);
        this._scrollTimer = setTimeout((/**
         * @return {?}
         */
        () => {
            $(document.scrollingElement).css('overflow', '');
        }), 600);
    }
    /**
     * @private
     * @return {?}
     */
    _syncBodyHeight() {
        this.maxHeight = innerHeight - 150;
    }
    /**
     * @private
     * @return {?}
     */
    _initModalView() {
        this._$modalView = $(this.modalView.nativeElement).hide();
        // Click outside to close
        this.hide = this.hide.bind(this);
        document.body.addEventListener('click', this.hide);
        // Prevent close
        this._$modalView.on('click', (/**
         * @param {?} e
         * @return {?}
         */
        (e) => e.stopPropagation()));
        // Append modal to body
        $(document.body).append(this._$modalView);
    }
    /**
     * @private
     * @return {?}
     */
    _destroyModalView() {
        document.body.removeEventListener('click', this.hide);
        this._$modalView.remove();
    }
    /**
     * @private
     * @return {?}
     */
    _addScrollUpdatePos() {
        this._scrollUpdatePos = this._scrollUpdatePos.bind(this);
        document.addEventListener('scroll', this._scrollUpdatePos, true);
    }
    /**
     * @private
     * @return {?}
     */
    _removeScrollUpdatePos() {
        document.removeEventListener('scroll', this._scrollUpdatePos);
    }
    /**
     * @private
     * @return {?}
     */
    _scrollUpdatePos() {
        // Delay update pos for performance
        if (this._showModal && this._jsEvent && this._targetEl) {
            clearTimeout(this._timer);
            this._timer = setTimeout((/**
             * @return {?}
             */
            () => this._openModal(this._jsEvent, this._targetEl)), 100);
        }
    }
    /**
     * @private
     * @param {?} jsEvent
     * @param {?} target
     * @return {?}
     */
    _openModal(jsEvent, target) {
        // Show to get real size
        this.show();
        /** @type {?} */
        let pos = CalendarUtils.computePosByTargetEl(this.modalView.nativeElement, target, jsEvent);
        /** @type {?} */
        let transformCss = 'translate3d(' + pos.left + 'px,' + pos.top + 'px,0)';
        // Use transform translate3d to boot performance
        this._$modalView.css({
            '-webkit-transition-duration': '300ms',
            'transition-duration': '300ms',
            'opacity': '1',
            '-webkit-transform': transformCss,
            'transform': transformCss,
        });
    }
}
CalendarDialogViewComponent.decorators = [
    { type: Component, args: [{
                template: "<div #modalView class=\"modal-dialog popover\" role=\"document\">\n    <div class=\"modal-content\" *ngIf=\"calEvent\">\n            <div class=\"header-dialog\" [ngClass]=\"{'overlay': titleOverlay}\">\n                <i class=\"fa fa-pencil\" *ngIf=\"calEvent.isCreator || !!calendarEvent.myAttendee\" (click)=\"editEvent()\" title=\"Ch\u1EC9nh s\u1EEDa\"></i>\n                <i class=\"fa fa-trash\" *ngIf=\"calEvent.isCreator\" (click)=\"removeEvent()\" title=\"X\u00F3a\"></i>\n                <i (click)=\"hide()\" class=\"fa fa-times\" title=\"\u0110\u00F3ng\"></i>\n            </div>\n        <div class=\"content-dialog\" [ngStyle]=\"{'max-height.px': maxHeight}\">\n                <div class=\"field-group\">\n                    <i class=\"field-icon fa fa-calendar\"></i>\n                    <div class=\"field-content\">\n                        <div style=\"font-size:18px\" [innerHTML]=\"calendarEvent.subject\"></div>\n                        <div>{{calendarEvent.timeDisplay}}</div>\n                        <div>{{calendarEvent.repeatText}}</div>\n                    </div>\n                </div>\n                <div class=\"field-group\" *ngIf=\"calEvent.memberStr\">\n                    <i class=\"field-icon fa fa-users\" title=\"Kh\u00E1ch m\u1EDDi tham d\u1EF1\"></i>\n                    <div class=\"field-content\">\n                        <calendar-attendee-list [attendees]=\"calEvent.attendees\" [expandable]=\"true\"></calendar-attendee-list>\n                    </div>\n                </div>\n                <div class=\"field-group\" *ngIf=\"calEvent.location\">\n                    <i class=\"field-icon fa fa-map-marker\" title=\"\u0110\u1ECBa \u0111i\u1EC3m\"></i>\n                    <div class=\"field-content\">{{ calEvent.location }}</div>\n                </div>\n                <div class=\"field-group\" *ngIf=\"calendarEvent.summary\">\n                    <i class=\"field-icon fa fa-align-left\" title=\"M\u00F4 t\u1EA3 s\u1EF1 ki\u1EC7n\"></i>\n                    <div class=\"field-content\" [innerHTML]=\"calendarEvent.summary\"></div>\n                </div>\n                <div class=\"field-group\" *ngIf=\"calEvent['fullname']\">\n                    <i class=\"field-icon fa fa-user-circle\" title=\"Ng\u01B0\u1EDDi t\u1EA1o\"></i>\n                    <div class=\"field-content\">{{ calEvent['fullname'] }}</div>\n                </div>\n                <div class=\"field-group\" *ngIf=\"calEvent?.attachments?.length\">\n                    <i class=\"field-icon fa fa-paperclip\" title=\"T\u1EADp tin \u0111\u00EDnh k\u00E8m\"></i>\n                    <div class=\"field-content\">\n                        <calendar-attachment-list [calEvent]=\"calEvent\"></calendar-attachment-list>\n                    </div>\n                </div>\n            </div>\n    </div>\n</div>\n<calendar-dialog-delete #dialogRemove hidden [calEvent]=\"calEvent\" (onDelete)=\"changeEvent()\"></calendar-dialog-delete>\n",
                styles: [".modal-dialog{min-width:450px;margin:0;z-index:1040!important}.modal-content{padding:0;border-radius:4px;border:0;box-shadow:1px 1px 7px 3px rgba(0,0,0,.14)}.header-dialog{padding:10px 25px;text-align:right}.header-dialog .overlay{border-bottom:1px solid #eee}.header-dialog>i{cursor:pointer;width:34px;height:34px;line-height:34px;text-align:center;font-size:18px;border-radius:50%;color:#555;margin-left:10px}.header-dialog>i:hover{background:rgba(0,0,0,.1)}.field-group{margin-bottom:20px;padding-left:14px;padding-right:5px}.field-icon{width:30px;float:left;color:#666;font-size:20px;text-align:center;margin-right:15px;margin-top:2px}.field-content{overflow:hidden;line-height:1.6}.file-attach-layout{float:left;max-width:144px;border:1px solid #fff;padding-right:5px}.file-attach-content{height:36px;line-height:36px;border-radius:2px;cursor:pointer;color:#2a6496;margin-bottom:7px}.file-attach-img{float:left;width:20px;height:20px;margin-top:6px;margin-right:10px}.file-attach-text{display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}a{color:#428bca;text-decoration:none;background:0 0}a:not([href]):hover{text-decoration:underline}.content-dialog{overflow-y:auto}"]
            }] }
];
/** @nocollapse */
CalendarDialogViewComponent.ctorParameters = () => [
    { type: Router }
];
CalendarDialogViewComponent.propDecorators = {
    onChange: [{ type: Output }],
    modalView: [{ type: ViewChild, args: ['modalView',] }],
    viewDeleteModal: [{ type: ViewChild, args: ['dialogRemove',] }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLXZpZXcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC1jYWxlbmRhci8iLCJzb3VyY2VzIjpbInNyYy9kaWFsb2ctdmlldy9kaWFsb2ctdmlldy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBZ0IsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQWEsTUFBTSxFQUFFLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMvRyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFFdkMsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sMENBQTBDLENBQUM7QUFDOUUsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ3JELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQU8vQyxNQUFNLE9BQU8sMkJBQTJCOzs7O0lBZ0JwQyxZQUFvQixNQUFjO1FBQWQsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQWZ4QixhQUFRLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQWVILENBQUM7Ozs7SUFFdEMsZUFBZTtRQUNYLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztJQUMvQixDQUFDOzs7O0lBRUQsV0FBVztRQUNQLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO0lBQ2xDLENBQUM7Ozs7SUFFRCxTQUFTO1FBQ0wsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ1osSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNuRixDQUFDOzs7O0lBRUQsV0FBVztRQUNQLElBQUks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aEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUM7WUFDakIsNkJBQTZCLEVBQUUsT0FBTztZQUN0QyxxQkFBcUIsRUFBRSxPQUFPO1lBQzlCLFNBQVMsRUFBRSxHQUFHO1lBQ2QsbUJBQW1CLEVBQUUsWUFBWTtZQUNqQyxXQUFXLEVBQUUsWUFBWTtTQUM1QixDQUFDLENBQUM7SUFDUCxDQUFDOzs7WUFySUosU0FBUyxTQUFDO2dCQUNQLG03RkFBMkM7O2FBRTlDOzs7O1lBVk8sTUFBTTs7O3VCQVlULE1BQU07d0JBQ04sU0FBUyxTQUFDLFdBQVc7OEJBQ3JCLFNBQVMsU0FBQyxjQUFjOzs7O0lBRnpCLCtDQUF3Qzs7SUFDeEMsZ0RBQThDOztJQUM5QyxzREFBaUU7O0lBQ2pFLG9EQUE2Qjs7SUFDN0IsK0NBQW1COztJQUNuQixnREFBa0I7O0lBQ2xCLG1EQUFzQjs7Ozs7SUFDdEIsaURBQTRCOzs7OztJQUM1QixnREFBK0I7Ozs7O0lBQy9CLCtDQUE2Qjs7Ozs7SUFDN0IsNkNBQWU7Ozs7O0lBQ2YsbURBQXFCOzs7OztJQUNyQixrREFBb0I7Ozs7O0lBQ3BCLGdEQUE0Qjs7Ozs7SUFFaEIsNkNBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgT25EZXN0cm95LCBPdXRwdXQsIFZpZXdDaGlsZH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1JvdXRlcn0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7Q2FsRXZlbnR9IGZyb20gXCIuLi91dGlscy9tb2RlbC9DYWxFdmVudFwiO1xuaW1wb3J0IHtDYWxlbmRhckRpYWxvZ0RlbGV0ZX0gZnJvbSBcIi4uL2RpYWxvZy1kZWxldGUvZGlhbG9nLWRlbGV0ZS5jb21wb25lbnRcIjtcbmltcG9ydCB7Q2FsZW5kYXJFdmVudH0gZnJvbSBcIi4uL21vZGVsL0NhbGVuZGFyRXZlbnRcIjtcbmltcG9ydCB7Q2FsZW5kYXJVdGlsc30gZnJvbSBcIi4uL0NhbGVuZGFyVXRpbHNcIjtcbmRlY2xhcmUgbGV0ICQ6YW55O1xuXG5AQ29tcG9uZW50KHtcbiAgICB0ZW1wbGF0ZVVybDogJy4vZGlhbG9nLXZpZXcuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2RpYWxvZy12aWV3LmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBDYWxlbmRhckRpYWxvZ1ZpZXdDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICAgIEBPdXRwdXQoKSBvbkNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBAVmlld0NoaWxkKCdtb2RhbFZpZXcnKSBtb2RhbFZpZXc6IEVsZW1lbnRSZWY7XG4gICAgQFZpZXdDaGlsZCgnZGlhbG9nUmVtb3ZlJykgdmlld0RlbGV0ZU1vZGFsOiBDYWxlbmRhckRpYWxvZ0RlbGV0ZTtcbiAgICBjYWxlbmRhckV2ZW50OiBDYWxlbmRhckV2ZW50O1xuICAgIGNhbEV2ZW50OiBDYWxFdmVudDtcbiAgICBtYXhIZWlnaHQ6IG51bWJlcjtcbiAgICB0aXRsZU92ZXJsYXk6IGJvb2xlYW47XG4gICAgcHJpdmF0ZSBfc2hvd01vZGFsOiBib29sZWFuO1xuICAgIHByaXZhdGUgX3RhcmdldEVsOiBIVE1MRWxlbWVudDtcbiAgICBwcml2YXRlIF9qc0V2ZW50OiBNb3VzZUV2ZW50O1xuICAgIHByaXZhdGUgX3RpbWVyO1xuICAgIHByaXZhdGUgX3Njcm9sbFRpbWVyO1xuICAgIHByaXZhdGUgXyRtb2RhbFZpZXc7XG4gICAgcHJpdmF0ZSBfb25DaGFuZ2U6IEZ1bmN0aW9uO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlcikge31cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgdGhpcy5faW5pdE1vZGFsVmlldygpO1xuICAgICAgICB0aGlzLl9hZGRTY3JvbGxVcGRhdGVQb3MoKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5fZGVzdHJveU1vZGFsVmlldygpO1xuICAgICAgICB0aGlzLl9yZW1vdmVTY3JvbGxVcGRhdGVQb3MoKTtcbiAgICB9XG5cbiAgICBlZGl0RXZlbnQoKSB7XG4gICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9jYWxlbmRhci9ldmVudCcsIHRoaXMuY2FsZW5kYXJFdmVudC5ldmVudC51dWlkIHx8ICcnXSk7XG4gICAgfVxuXG4gICAgY2hhbmdlRXZlbnQoKSB7XG4gICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICB0aGlzLm9uQ2hhbmdlLmVtaXQoKTtcbiAgICAgICAgdGhpcy5fb25DaGFuZ2UoKTtcbiAgICB9XG5cbiAgICB2aWV3RXZlbnQoZXZlbnQ6IENhbEV2ZW50LCBqc0V2ZW50OiBNb3VzZUV2ZW50LCB0YXJnZXQ6IEhUTUxFbGVtZW50LCBvbkNoYW5nZTogRnVuY3Rpb24pIHtcbiAgICAgICAgdGhpcy5fb25DaGFuZ2UgPSBvbkNoYW5nZTtcbiAgICAgICAgdGhpcy5jYWxlbmRhckV2ZW50ID0gbmV3IENhbGVuZGFyRXZlbnQoZXZlbnQpO1xuICAgICAgICB0aGlzLmNhbEV2ZW50ID0gZXZlbnQ7XG4gICAgICAgIHRoaXMuX3RhcmdldEVsID0gdGFyZ2V0O1xuICAgICAgICB0aGlzLl9qc0V2ZW50ID0ganNFdmVudDtcbiAgICAgICAgdGhpcy5fc3luY0JvZHlIZWlnaHQoKTtcbiAgICAgICAgdGhpcy5fcHJldmVudFNjcm9sbGluZygpO1xuICAgICAgICBqc0V2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuX29wZW5Nb2RhbChqc0V2ZW50LCB0YXJnZXQpLCAxMDApXG4gICAgfVxuXG4gICAgaGlkZSgpIHtcbiAgICAgICAgdGhpcy5fc2hvd01vZGFsID0gZmFsc2U7XG4gICAgICAgIHRoaXMuXyRtb2RhbFZpZXcuaGlkZSgpO1xuICAgICAgICB0aGlzLl8kbW9kYWxWaWV3LmNzcygnb3BhY2l0eScsIDApO1xuICAgIH1cblxuICAgIHNob3coKSB7XG4gICAgICAgIHRoaXMuX3Nob3dNb2RhbCA9IHRydWU7XG4gICAgICAgIHRoaXMuXyRtb2RhbFZpZXcuc2hvdygpO1xuICAgIH1cblxuICAgIHJlbW92ZUV2ZW50KCkge1xuICAgICAgICB0aGlzLnZpZXdEZWxldGVNb2RhbC5zaG93KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfcHJldmVudFNjcm9sbGluZygpIHtcbiAgICAgICAgJChkb2N1bWVudC5zY3JvbGxpbmdFbGVtZW50KS5jc3MoJ292ZXJmbG93JywgJ2hpZGRlbicpO1xuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5fc2Nyb2xsVGltZXIpO1xuICAgICAgICB0aGlzLl9zY3JvbGxUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgJChkb2N1bWVudC5zY3JvbGxpbmdFbGVtZW50KS5jc3MoJ292ZXJmbG93JywgJycpO1xuICAgICAgICB9LCA2MDApO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3N5bmNCb2R5SGVpZ2h0KCkge1xuICAgICAgICB0aGlzLm1heEhlaWdodCA9IGlubmVySGVpZ2h0IC0gMTUwO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2luaXRNb2RhbFZpZXcoKSB7XG4gICAgICAgIHRoaXMuXyRtb2RhbFZpZXcgPSAkKHRoaXMubW9kYWxWaWV3Lm5hdGl2ZUVsZW1lbnQpLmhpZGUoKTtcblxuICAgICAgICAvLyBDbGljayBvdXRzaWRlIHRvIGNsb3NlXG4gICAgICAgIHRoaXMuaGlkZSA9IHRoaXMuaGlkZS5iaW5kKHRoaXMpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oaWRlKTtcblxuICAgICAgICAvLyBQcmV2ZW50IGNsb3NlXG4gICAgICAgIHRoaXMuXyRtb2RhbFZpZXcub24oJ2NsaWNrJywgKGUpID0+IGUuc3RvcFByb3BhZ2F0aW9uKCkpO1xuXG4gICAgICAgIC8vIEFwcGVuZCBtb2RhbCB0byBib2R5XG4gICAgICAgICQoZG9jdW1lbnQuYm9keSkuYXBwZW5kKHRoaXMuXyRtb2RhbFZpZXcpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2Rlc3Ryb3lNb2RhbFZpZXcoKSB7XG4gICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhpZGUpO1xuICAgICAgICB0aGlzLl8kbW9kYWxWaWV3LnJlbW92ZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2FkZFNjcm9sbFVwZGF0ZVBvcygpIHtcbiAgICAgICAgdGhpcy5fc2Nyb2xsVXBkYXRlUG9zID0gdGhpcy5fc2Nyb2xsVXBkYXRlUG9zLmJpbmQodGhpcyk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuX3Njcm9sbFVwZGF0ZVBvcywgdHJ1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfcmVtb3ZlU2Nyb2xsVXBkYXRlUG9zKCkge1xuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLl9zY3JvbGxVcGRhdGVQb3MpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3Njcm9sbFVwZGF0ZVBvcygpIHtcbiAgICAgICAgLy8gRGVsYXkgdXBkYXRlIHBvcyBmb3IgcGVyZm9ybWFuY2VcbiAgICAgICAgaWYgKHRoaXMuX3Nob3dNb2RhbCAmJiB0aGlzLl9qc0V2ZW50ICYmIHRoaXMuX3RhcmdldEVsKSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5fdGltZXIpO1xuICAgICAgICAgICAgdGhpcy5fdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHRoaXMuX29wZW5Nb2RhbCh0aGlzLl9qc0V2ZW50LCB0aGlzLl90YXJnZXRFbCksIDEwMCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9vcGVuTW9kYWwoanNFdmVudCwgdGFyZ2V0OiBIVE1MRWxlbWVudCkge1xuICAgICAgICAvLyBTaG93IHRvIGdldCByZWFsIHNpemVcbiAgICAgICAgdGhpcy5zaG93KCk7XG5cbiAgICAgICAgbGV0IHBvcyA9IENhbGVuZGFyVXRpbHMuY29tcHV0ZVBvc0J5VGFyZ2V0RWwodGhpcy5tb2RhbFZpZXcubmF0aXZlRWxlbWVudCwgdGFyZ2V0LCBqc0V2ZW50KTtcblxuICAgICAgICBsZXQgdHJhbnNmb3JtQ3NzID0gJ3RyYW5zbGF0ZTNkKCcgKyBwb3MubGVmdCArICdweCwnICsgcG9zLnRvcCArICdweCwwKSc7XG4gICAgICAgIC8vIFVzZSB0cmFuc2Zvcm0gdHJhbnNsYXRlM2QgdG8gYm9vdCBwZXJmb3JtYW5jZVxuICAgICAgICB0aGlzLl8kbW9kYWxWaWV3LmNzcyh7XG4gICAgICAgICAgICAnLXdlYmtpdC10cmFuc2l0aW9uLWR1cmF0aW9uJzogJzMwMG1zJyxcbiAgICAgICAgICAgICd0cmFuc2l0aW9uLWR1cmF0aW9uJzogJzMwMG1zJyxcbiAgICAgICAgICAgICdvcGFjaXR5JzogJzEnLFxuICAgICAgICAgICAgJy13ZWJraXQtdHJhbnNmb3JtJzogdHJhbnNmb3JtQ3NzLFxuICAgICAgICAgICAgJ3RyYW5zZm9ybSc6IHRyYW5zZm9ybUNzcyxcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIl19