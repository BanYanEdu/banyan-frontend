/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { CalendarService } from '../calendar.service';
import { CalendarUtils } from "../CalendarUtils";
var CalendarDialogRepeatComponent = /** @class */ (function () {
    function CalendarDialogRepeatComponent(calendarService) {
        this.calendarService = calendarService;
        this.onRepeat = new EventEmitter();
        this.data = {};
        this.dateFormat = 'DD/MM/YYYY';
        this.repeatTypes = CalendarUtils.repeatTypes;
        this.weekDays = CalendarUtils.weekDays;
    }
    /**
     * @return {?}
     */
    CalendarDialogRepeatComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.$modal = $(this.repeatModal.nativeElement);
        document.body.appendChild(this.repeatModal.nativeElement);
    };
    /**
     * @return {?}
     */
    CalendarDialogRepeatComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.$modal.is(':visible')) {
            this.$modal.modal('hide').on('hidden.bs.modal', (/**
             * @return {?}
             */
            function () {
                $(this).remove();
            }));
        }
        else {
            this.$modal.remove();
        }
    };
    /**
     * @param {?} data
     * @return {?}
     */
    CalendarDialogRepeatComponent.prototype.openRepeat = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        this.data = data || {};
        this.initData();
        this.$modal.modal('show');
    };
    /**
     * @return {?}
     */
    CalendarDialogRepeatComponent.prototype.saveRepeat = /**
     * @return {?}
     */
    function () {
        this.onRepeat.emit(this.getRepeatData());
    };
    /**
     * @param {?} item
     * @return {?}
     */
    CalendarDialogRepeatComponent.prototype.changeWeekDay = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        item.checked = !item.checked;
        if (this.getWeekDayChecked().length < 1) {
            item.checked = true;
        }
    };
    /**
     * @return {?}
     */
    CalendarDialogRepeatComponent.prototype.changeDate = /**
     * @return {?}
     */
    function () {
        if (!this.start || !this.start.getTime()) {
            this.start = new Date();
        }
        if (!this.until || !this.until.getTime() || this.start >= this.until) {
            this.until = new Date(this.start.getFullYear(), this.start.getMonth(), this.start.getDate());
            this.until.setMonth(this.until.getMonth() + 1);
        }
    };
    /**
     * @return {?}
     */
    CalendarDialogRepeatComponent.prototype.getRepeatData = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var params = {
            rrmode: this.rrmode,
            lstart: this.start.getTime(),
            until: this.until.getTime(),
            wkdays: []
        };
        if (params.rrmode == 'WEEKLY') {
            // this.weekDays.forEach(item => {
            //   if (item.checked) {
            //     params.wkdays += item.value + ',';
            //   }
            // });
            // params.wkdays = params.wkdays.slice(0, -1);
            params.wkdays = this.getWeekDayChecked().map((/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return item.value; }));
        }
        return params;
    };
    /**
     * @return {?}
     */
    CalendarDialogRepeatComponent.prototype.getWeekDayChecked = /**
     * @return {?}
     */
    function () {
        return this.weekDays.filter((/**
         * @param {?} item
         * @return {?}
         */
        function (item) {
            return item.checked;
        }));
    };
    /**
     * @private
     * @return {?}
     */
    CalendarDialogRepeatComponent.prototype.initData = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.rrmode = this.data.rrmode || 'DAILY';
        this.start = new Date(this.data.lstart);
        this.until = new Date(this.data.until);
        this.changeDate();
        if (this.data.wkdays) {
            this.weekDays.forEach((/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                if (_this.data.wkdays.indexOf(item.value) > -1) {
                    item.checked = true;
                }
            }));
        }
        else {
            this.weekDays[(this.start.getDay() + 6) % 7].checked = true;
        }
    };
    CalendarDialogRepeatComponent.decorators = [
        { type: Component, args: [{
                    selector: 'calendar-repeat-modal',
                    template: "<div #repeatModal class=\"modal fade\" tabindex=\"-1\" role=\"dialog\">\n    <div class=\"modal-dialog\" role=\"document\">\n        <div class=\"modal-content\">\n            <div class=\"modal-body\">\n                <div class=\"form-group\">\n                    <label>L\u1EB7p l\u1ECBch</label>\n                    <select [(ngModel)]=\"rrmode\" class=\"form-control\">\n                        <option *ngFor=\"let item of repeatTypes\" [value]=\"item.value\">{{ item.label }}</option>\n                    </select>\n                </div>\n                <div *ngIf=\"rrmode === 'WEEKLY'\" class=\"form-group\" style=\"margin-bottom: 0;\">\n                    <div class=\"check-box-i\">\n                        <div *ngFor=\"let day of weekDays\"\n                             [title]=\"day.title\"\n                             (click)=\"changeWeekDay(day)\"\n                             [ngClass]=\"{'check-box-active':day.checked}\"\n                             class=\"check-box-item\">{{ day.label }}</div>\n                    </div>\n                </div>\n                <div class=\"form-group\">\n                    <label>B\u1EAFt \u0111\u1EA7u</label>\n                    <div class=\"input-group\">\n                        <input\n                            class=\"form-control\"\n                            #repeatStart=\"bsDatepicker\"\n                            bsDatepicker\n                            [bsConfig]=\"{ dateInputFormat: dateFormat }\"\n                            (ngModelChange)=\"changeDate()\"\n                            [(ngModel)]=\"start\">\n                        <div (click)=\"repeatStart.toggle()\" class=\"input-group-append\">\n                            <i class=\"fa fa-calendar input-group-text\"></i>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"form-group\">\n                    <label>K\u1EBFt th\u00FAc</label>\n                    <div class=\"input-group\">\n                        <input\n                            class=\"form-control\"\n                            #repeatUntil=\"bsDatepicker\"\n                            bsDatepicker\n                            [bsConfig]=\"{ dateInputFormat: dateFormat }\"\n                            (ngModelChange)=\"changeDate()\"\n                            [(ngModel)]=\"until\">\n                        <div (click)=\"repeatUntil.toggle()\" class=\"input-group-append\">\n                            <i class=\"fa fa-calendar input-group-text\"></i>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"form-action\">\n                    <button type=\"button\" class=\"btn btn-secondary btn-sm\" data-dismiss=\"modal\">\n                        \u0110\u00F3ng\n                    </button>\n                    <button type=\"button\" class=\"ml-1 btn btn-primary btn-sm\" data-dismiss=\"modal\" (click)=\"saveRepeat()\">\n                        Xong\n                    </button>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>",
                    styles: [".modal-dialog{width:400px}.form-action{text-align:right;margin:15px 0}.check-box-i,.check-box-item{overflow:hidden}.check-box-item{float:left;width:30px;height:30px;line-height:30px;border-radius:50%;text-align:center;margin:0 10px 20px 0;font-size:12px;background:rgba(0,0,0,.1);cursor:pointer}.check-box-active{background:#438eb9;color:#fff}.check-box-disable{opacity:.5}"]
                }] }
    ];
    /** @nocollapse */
    CalendarDialogRepeatComponent.ctorParameters = function () { return [
        { type: CalendarService }
    ]; };
    CalendarDialogRepeatComponent.propDecorators = {
        onRepeat: [{ type: Output }],
        repeatModal: [{ type: ViewChild, args: ['repeatModal',] }],
        repeatStart: [{ type: ViewChild, args: ['repeatStart',] }],
        repeatUntil: [{ type: ViewChild, args: ['repeatUntil',] }]
    };
    return CalendarDialogRepeatComponent;
}());
export { CalendarDialogRepeatComponent };
if (false) {
    /** @type {?} */
    CalendarDialogRepeatComponent.prototype.onRepeat;
    /** @type {?} */
    CalendarDialogRepeatComponent.prototype.repeatModal;
    /** @type {?} */
    CalendarDialogRepeatComponent.prototype.repeatStart;
    /** @type {?} */
    CalendarDialogRepeatComponent.prototype.repeatUntil;
    /** @type {?} */
    CalendarDialogRepeatComponent.prototype.start;
    /** @type {?} */
    CalendarDialogRepeatComponent.prototype.until;
    /** @type {?} */
    CalendarDialogRepeatComponent.prototype.rrmode;
    /** @type {?} */
    CalendarDialogRepeatComponent.prototype.repeatTypes;
    /** @type {?} */
    CalendarDialogRepeatComponent.prototype.weekDays;
    /** @type {?} */
    CalendarDialogRepeatComponent.prototype.data;
    /** @type {?} */
    CalendarDialogRepeatComponent.prototype.$modal;
    /** @type {?} */
    CalendarDialogRepeatComponent.prototype.dateFormat;
    /**
     * @type {?}
     * @private
     */
    CalendarDialogRepeatComponent.prototype.calendarService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLXJlcGVhdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbmV0LWNhbGVuZGFyLyIsInNvdXJjZXMiOlsic3JjL2RpYWxvZy1yZXBlYXQvZGlhbG9nLXJlcGVhdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBZ0IsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQWEsTUFBTSxFQUFFLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMvRyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFdEQsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBRy9DO0lBbUJFLHVDQUNVLGVBQWdDO1FBQWhDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQWRoQyxhQUFRLEdBQUcsSUFBSSxZQUFZLEVBQWEsQ0FBQztRQVNuRCxTQUFJLEdBQVEsRUFBRSxDQUFDO1FBRWYsZUFBVSxHQUFXLFlBQVksQ0FBQztRQUtoQyxJQUFJLENBQUMsV0FBVyxHQUFHLGFBQWEsQ0FBQyxXQUFXLENBQUM7UUFDN0MsSUFBSSxDQUFDLFFBQVEsR0FBRyxhQUFhLENBQUMsUUFBUSxDQUFDO0lBQ3pDLENBQUM7Ozs7SUFFRCx1REFBZTs7O0lBQWY7UUFDRSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ2hELFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDNUQsQ0FBQzs7OztJQUVELG1EQUFXOzs7SUFBWDtRQUNFLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDOUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLGlCQUFpQjs7O1lBQUU7Z0JBQzlDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNuQixDQUFDLEVBQUMsQ0FBQztTQUNKO2FBQU07WUFDTCxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ3RCO0lBQ0gsQ0FBQzs7Ozs7SUFFRCxrREFBVTs7OztJQUFWLFVBQVcsSUFBUztRQUNsQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzVCLENBQUM7Ozs7SUFFRCxrREFBVTs7O0lBQVY7UUFDRSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQztJQUMzQyxDQUFDOzs7OztJQUVELHFEQUFhOzs7O0lBQWIsVUFBYyxJQUFJO1FBQ2hCLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQzdCLElBQUksSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUN2QyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztTQUNyQjtJQUNILENBQUM7Ozs7SUFFRCxrREFBVTs7O0lBQVY7UUFDRSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDeEMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1NBQ3pCO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNwRSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7WUFDN0YsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztTQUNoRDtJQUNILENBQUM7Ozs7SUFFRCxxREFBYTs7O0lBQWI7O1lBQ1EsTUFBTSxHQUFHO1lBQ2IsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1lBQ25CLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRTtZQUM1QixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUU7WUFDM0IsTUFBTSxFQUFFLEVBQUU7U0FDWDtRQUVELElBQUksTUFBTSxDQUFDLE1BQU0sSUFBSSxRQUFRLEVBQUU7WUFFN0Isa0NBQWtDO1lBQ2xDLHdCQUF3QjtZQUN4Qix5Q0FBeUM7WUFDekMsTUFBTTtZQUNOLE1BQU07WUFDTiw4Q0FBOEM7WUFDNUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxHQUFHOzs7O1lBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxJQUFJLENBQUMsS0FBSyxFQUFWLENBQVUsRUFBQyxDQUFDO1NBQ3BFO1FBRUQsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQzs7OztJQUVELHlEQUFpQjs7O0lBQWpCO1FBQ0UsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU07Ozs7UUFBQyxVQUFBLElBQUk7WUFDOUIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3RCLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7SUFFTyxnREFBUTs7OztJQUFoQjtRQUFBLGlCQWVDO1FBZEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxPQUFPLENBQUM7UUFDMUMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFFbEIsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNwQixJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU87Ozs7WUFBQyxVQUFBLElBQUk7Z0JBQ3hCLElBQUksS0FBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtvQkFDN0MsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7aUJBQ3JCO1lBQ0gsQ0FBQyxFQUFDLENBQUM7U0FDSjthQUFNO1lBQ0wsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztTQUM3RDtJQUNILENBQUM7O2dCQS9HRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHVCQUF1QjtvQkFDakMsMmtHQUE2Qzs7aUJBRTlDOzs7O2dCQVRRLGVBQWU7OzsyQkFXckIsTUFBTTs4QkFDTixTQUFTLFNBQUMsYUFBYTs4QkFDdkIsU0FBUyxTQUFDLGFBQWE7OEJBQ3ZCLFNBQVMsU0FBQyxhQUFhOztJQXVHMUIsb0NBQUM7Q0FBQSxBQWhIRCxJQWdIQztTQTNHWSw2QkFBNkI7OztJQUN4QyxpREFBbUQ7O0lBQ25ELG9EQUFrRDs7SUFDbEQsb0RBQXNDOztJQUN0QyxvREFBc0M7O0lBQ3RDLDhDQUFXOztJQUNYLDhDQUFXOztJQUNYLCtDQUFZOztJQUNaLG9EQUFtQjs7SUFDbkIsaURBQWdCOztJQUNoQiw2Q0FBZTs7SUFDZiwrQ0FBWTs7SUFDWixtREFBa0M7Ozs7O0lBR2hDLHdEQUF3QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QWZ0ZXJWaWV3SW5pdCwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIE9uRGVzdHJveSwgT3V0cHV0LCBWaWV3Q2hpbGR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2FsZW5kYXJTZXJ2aWNlIH0gZnJvbSAnLi4vY2FsZW5kYXIuc2VydmljZSc7XG5pbXBvcnQge0NhbFJlcGVhdH0gZnJvbSBcIi4uL3V0aWxzL21vZGVsL0NhbEV2ZW50XCI7XG5pbXBvcnQge0NhbGVuZGFyVXRpbHN9IGZyb20gXCIuLi9DYWxlbmRhclV0aWxzXCI7XG5kZWNsYXJlIGxldCAkOmFueTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2FsZW5kYXItcmVwZWF0LW1vZGFsJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2RpYWxvZy1yZXBlYXQuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9kaWFsb2ctcmVwZWF0LmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBDYWxlbmRhckRpYWxvZ1JlcGVhdENvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveXtcbiAgQE91dHB1dCgpIG9uUmVwZWF0ID0gbmV3IEV2ZW50RW1pdHRlcjxDYWxSZXBlYXQ+KCk7XG4gIEBWaWV3Q2hpbGQoJ3JlcGVhdE1vZGFsJykgcmVwZWF0TW9kYWw6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ3JlcGVhdFN0YXJ0JykgcmVwZWF0U3RhcnQ7XG4gIEBWaWV3Q2hpbGQoJ3JlcGVhdFVudGlsJykgcmVwZWF0VW50aWw7XG4gIHN0YXJ0OiBhbnk7XG4gIHVudGlsOiBhbnk7XG4gIHJybW9kZTogYW55O1xuICByZXBlYXRUeXBlczogYW55W107XG4gIHdlZWtEYXlzOiBhbnlbXTtcbiAgZGF0YTogYW55ID0ge307XG4gICRtb2RhbDogYW55O1xuICBkYXRlRm9ybWF0OiBzdHJpbmcgPSAnREQvTU0vWVlZWSc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjYWxlbmRhclNlcnZpY2U6IENhbGVuZGFyU2VydmljZSxcbiAgKSB7XG4gICAgdGhpcy5yZXBlYXRUeXBlcyA9IENhbGVuZGFyVXRpbHMucmVwZWF0VHlwZXM7XG4gICAgdGhpcy53ZWVrRGF5cyA9IENhbGVuZGFyVXRpbHMud2Vla0RheXM7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy4kbW9kYWwgPSAkKHRoaXMucmVwZWF0TW9kYWwubmF0aXZlRWxlbWVudCk7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLnJlcGVhdE1vZGFsLm5hdGl2ZUVsZW1lbnQpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuJG1vZGFsLmlzKCc6dmlzaWJsZScpKSB7XG4gICAgICB0aGlzLiRtb2RhbC5tb2RhbCgnaGlkZScpLm9uKCdoaWRkZW4uYnMubW9kYWwnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICQodGhpcykucmVtb3ZlKCk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy4kbW9kYWwucmVtb3ZlKCk7XG4gICAgfVxuICB9XG5cbiAgb3BlblJlcGVhdChkYXRhOiBhbnkpIHtcbiAgICB0aGlzLmRhdGEgPSBkYXRhIHx8IHt9O1xuICAgIHRoaXMuaW5pdERhdGEoKTtcbiAgICB0aGlzLiRtb2RhbC5tb2RhbCgnc2hvdycpO1xuICB9XG5cbiAgc2F2ZVJlcGVhdCgpIHtcbiAgICB0aGlzLm9uUmVwZWF0LmVtaXQodGhpcy5nZXRSZXBlYXREYXRhKCkpO1xuICB9XG5cbiAgY2hhbmdlV2Vla0RheShpdGVtKSB7XG4gICAgaXRlbS5jaGVja2VkID0gIWl0ZW0uY2hlY2tlZDtcbiAgICBpZiAodGhpcy5nZXRXZWVrRGF5Q2hlY2tlZCgpLmxlbmd0aCA8IDEpIHtcbiAgICAgIGl0ZW0uY2hlY2tlZCA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgY2hhbmdlRGF0ZSgpIHtcbiAgICBpZiAoIXRoaXMuc3RhcnQgfHwgIXRoaXMuc3RhcnQuZ2V0VGltZSgpKSB7XG4gICAgICB0aGlzLnN0YXJ0ID0gbmV3IERhdGUoKTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLnVudGlsIHx8ICF0aGlzLnVudGlsLmdldFRpbWUoKSB8fCB0aGlzLnN0YXJ0ID49IHRoaXMudW50aWwpIHtcbiAgICAgIHRoaXMudW50aWwgPSBuZXcgRGF0ZSh0aGlzLnN0YXJ0LmdldEZ1bGxZZWFyKCksIHRoaXMuc3RhcnQuZ2V0TW9udGgoKSwgdGhpcy5zdGFydC5nZXREYXRlKCkpO1xuICAgICAgdGhpcy51bnRpbC5zZXRNb250aCh0aGlzLnVudGlsLmdldE1vbnRoKCkgKyAxKTtcbiAgICB9XG4gIH1cblxuICBnZXRSZXBlYXREYXRhKCk6IENhbFJlcGVhdCB7XG4gICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgcnJtb2RlOiB0aGlzLnJybW9kZSxcbiAgICAgIGxzdGFydDogdGhpcy5zdGFydC5nZXRUaW1lKCksXG4gICAgICB1bnRpbDogdGhpcy51bnRpbC5nZXRUaW1lKCksXG4gICAgICB3a2RheXM6IFtdXG4gICAgfTtcblxuICAgIGlmIChwYXJhbXMucnJtb2RlID09ICdXRUVLTFknKSB7XG5cbiAgICAgIC8vIHRoaXMud2Vla0RheXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIC8vICAgaWYgKGl0ZW0uY2hlY2tlZCkge1xuICAgICAgLy8gICAgIHBhcmFtcy53a2RheXMgKz0gaXRlbS52YWx1ZSArICcsJztcbiAgICAgIC8vICAgfVxuICAgICAgLy8gfSk7XG4gICAgICAvLyBwYXJhbXMud2tkYXlzID0gcGFyYW1zLndrZGF5cy5zbGljZSgwLCAtMSk7XG4gICAgICAgIHBhcmFtcy53a2RheXMgPSB0aGlzLmdldFdlZWtEYXlDaGVja2VkKCkubWFwKGl0ZW0gPT4gaXRlbS52YWx1ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhcmFtcztcbiAgfVxuXG4gIGdldFdlZWtEYXlDaGVja2VkKCkge1xuICAgIHJldHVybiB0aGlzLndlZWtEYXlzLmZpbHRlcihpdGVtID0+IHtcbiAgICAgIHJldHVybiBpdGVtLmNoZWNrZWQ7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGluaXREYXRhKCkge1xuICAgIHRoaXMucnJtb2RlID0gdGhpcy5kYXRhLnJybW9kZSB8fCAnREFJTFknO1xuICAgIHRoaXMuc3RhcnQgPSBuZXcgRGF0ZSh0aGlzLmRhdGEubHN0YXJ0KTtcbiAgICB0aGlzLnVudGlsID0gbmV3IERhdGUodGhpcy5kYXRhLnVudGlsKTtcbiAgICB0aGlzLmNoYW5nZURhdGUoKTtcblxuICAgIGlmICh0aGlzLmRhdGEud2tkYXlzKSB7XG4gICAgICB0aGlzLndlZWtEYXlzLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmRhdGEud2tkYXlzLmluZGV4T2YoaXRlbS52YWx1ZSkgPiAtMSkge1xuICAgICAgICAgIGl0ZW0uY2hlY2tlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLndlZWtEYXlzWyh0aGlzLnN0YXJ0LmdldERheSgpICsgNikgJSA3XS5jaGVja2VkID0gdHJ1ZTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==