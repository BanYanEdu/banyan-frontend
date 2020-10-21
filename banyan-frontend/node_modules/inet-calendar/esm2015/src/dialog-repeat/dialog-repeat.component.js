/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { CalendarService } from '../calendar.service';
import { CalendarUtils } from "../CalendarUtils";
export class CalendarDialogRepeatComponent {
    /**
     * @param {?} calendarService
     */
    constructor(calendarService) {
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
    ngAfterViewInit() {
        this.$modal = $(this.repeatModal.nativeElement);
        document.body.appendChild(this.repeatModal.nativeElement);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
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
    }
    /**
     * @param {?} data
     * @return {?}
     */
    openRepeat(data) {
        this.data = data || {};
        this.initData();
        this.$modal.modal('show');
    }
    /**
     * @return {?}
     */
    saveRepeat() {
        this.onRepeat.emit(this.getRepeatData());
    }
    /**
     * @param {?} item
     * @return {?}
     */
    changeWeekDay(item) {
        item.checked = !item.checked;
        if (this.getWeekDayChecked().length < 1) {
            item.checked = true;
        }
    }
    /**
     * @return {?}
     */
    changeDate() {
        if (!this.start || !this.start.getTime()) {
            this.start = new Date();
        }
        if (!this.until || !this.until.getTime() || this.start >= this.until) {
            this.until = new Date(this.start.getFullYear(), this.start.getMonth(), this.start.getDate());
            this.until.setMonth(this.until.getMonth() + 1);
        }
    }
    /**
     * @return {?}
     */
    getRepeatData() {
        /** @type {?} */
        const params = {
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
            item => item.value));
        }
        return params;
    }
    /**
     * @return {?}
     */
    getWeekDayChecked() {
        return this.weekDays.filter((/**
         * @param {?} item
         * @return {?}
         */
        item => {
            return item.checked;
        }));
    }
    /**
     * @private
     * @return {?}
     */
    initData() {
        this.rrmode = this.data.rrmode || 'DAILY';
        this.start = new Date(this.data.lstart);
        this.until = new Date(this.data.until);
        this.changeDate();
        if (this.data.wkdays) {
            this.weekDays.forEach((/**
             * @param {?} item
             * @return {?}
             */
            item => {
                if (this.data.wkdays.indexOf(item.value) > -1) {
                    item.checked = true;
                }
            }));
        }
        else {
            this.weekDays[(this.start.getDay() + 6) % 7].checked = true;
        }
    }
}
CalendarDialogRepeatComponent.decorators = [
    { type: Component, args: [{
                selector: 'calendar-repeat-modal',
                template: "<div #repeatModal class=\"modal fade\" tabindex=\"-1\" role=\"dialog\">\n    <div class=\"modal-dialog\" role=\"document\">\n        <div class=\"modal-content\">\n            <div class=\"modal-body\">\n                <div class=\"form-group\">\n                    <label>L\u1EB7p l\u1ECBch</label>\n                    <select [(ngModel)]=\"rrmode\" class=\"form-control\">\n                        <option *ngFor=\"let item of repeatTypes\" [value]=\"item.value\">{{ item.label }}</option>\n                    </select>\n                </div>\n                <div *ngIf=\"rrmode === 'WEEKLY'\" class=\"form-group\" style=\"margin-bottom: 0;\">\n                    <div class=\"check-box-i\">\n                        <div *ngFor=\"let day of weekDays\"\n                             [title]=\"day.title\"\n                             (click)=\"changeWeekDay(day)\"\n                             [ngClass]=\"{'check-box-active':day.checked}\"\n                             class=\"check-box-item\">{{ day.label }}</div>\n                    </div>\n                </div>\n                <div class=\"form-group\">\n                    <label>B\u1EAFt \u0111\u1EA7u</label>\n                    <div class=\"input-group\">\n                        <input\n                            class=\"form-control\"\n                            #repeatStart=\"bsDatepicker\"\n                            bsDatepicker\n                            [bsConfig]=\"{ dateInputFormat: dateFormat }\"\n                            (ngModelChange)=\"changeDate()\"\n                            [(ngModel)]=\"start\">\n                        <div (click)=\"repeatStart.toggle()\" class=\"input-group-append\">\n                            <i class=\"fa fa-calendar input-group-text\"></i>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"form-group\">\n                    <label>K\u1EBFt th\u00FAc</label>\n                    <div class=\"input-group\">\n                        <input\n                            class=\"form-control\"\n                            #repeatUntil=\"bsDatepicker\"\n                            bsDatepicker\n                            [bsConfig]=\"{ dateInputFormat: dateFormat }\"\n                            (ngModelChange)=\"changeDate()\"\n                            [(ngModel)]=\"until\">\n                        <div (click)=\"repeatUntil.toggle()\" class=\"input-group-append\">\n                            <i class=\"fa fa-calendar input-group-text\"></i>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"form-action\">\n                    <button type=\"button\" class=\"btn btn-secondary btn-sm\" data-dismiss=\"modal\">\n                        \u0110\u00F3ng\n                    </button>\n                    <button type=\"button\" class=\"ml-1 btn btn-primary btn-sm\" data-dismiss=\"modal\" (click)=\"saveRepeat()\">\n                        Xong\n                    </button>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>",
                styles: [".modal-dialog{width:400px}.form-action{text-align:right;margin:15px 0}.check-box-i,.check-box-item{overflow:hidden}.check-box-item{float:left;width:30px;height:30px;line-height:30px;border-radius:50%;text-align:center;margin:0 10px 20px 0;font-size:12px;background:rgba(0,0,0,.1);cursor:pointer}.check-box-active{background:#438eb9;color:#fff}.check-box-disable{opacity:.5}"]
            }] }
];
/** @nocollapse */
CalendarDialogRepeatComponent.ctorParameters = () => [
    { type: CalendarService }
];
CalendarDialogRepeatComponent.propDecorators = {
    onRepeat: [{ type: Output }],
    repeatModal: [{ type: ViewChild, args: ['repeatModal',] }],
    repeatStart: [{ type: ViewChild, args: ['repeatStart',] }],
    repeatUntil: [{ type: ViewChild, args: ['repeatUntil',] }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLXJlcGVhdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbmV0LWNhbGVuZGFyLyIsInNvdXJjZXMiOlsic3JjL2RpYWxvZy1yZXBlYXQvZGlhbG9nLXJlcGVhdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBZ0IsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQWEsTUFBTSxFQUFFLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMvRyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFdEQsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBUS9DLE1BQU0sT0FBTyw2QkFBNkI7Ozs7SUFjeEMsWUFDVSxlQUFnQztRQUFoQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFkaEMsYUFBUSxHQUFHLElBQUksWUFBWSxFQUFhLENBQUM7UUFTbkQsU0FBSSxHQUFRLEVBQUUsQ0FBQztRQUVmLGVBQVUsR0FBVyxZQUFZLENBQUM7UUFLaEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxhQUFhLENBQUMsV0FBVyxDQUFDO1FBQzdDLElBQUksQ0FBQyxRQUFRLEdBQUcsYUFBYSxDQUFDLFFBQVEsQ0FBQztJQUN6QyxDQUFDOzs7O0lBRUQsZUFBZTtRQUNiLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDaEQsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUM1RCxDQUFDOzs7O0lBRUQsV0FBVztRQUNULElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDOUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLGlCQUFpQjs7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bWVudFJlZiwgRXZlbnRFbWl0dGVyLCBPbkRlc3Ryb3ksIE91dHB1dCwgVmlld0NoaWxkfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhbGVuZGFyU2VydmljZSB9IGZyb20gJy4uL2NhbGVuZGFyLnNlcnZpY2UnO1xuaW1wb3J0IHtDYWxSZXBlYXR9IGZyb20gXCIuLi91dGlscy9tb2RlbC9DYWxFdmVudFwiO1xuaW1wb3J0IHtDYWxlbmRhclV0aWxzfSBmcm9tIFwiLi4vQ2FsZW5kYXJVdGlsc1wiO1xuZGVjbGFyZSBsZXQgJDphbnk7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2NhbGVuZGFyLXJlcGVhdC1tb2RhbCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9kaWFsb2ctcmVwZWF0LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vZGlhbG9nLXJlcGVhdC5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJEaWFsb2dSZXBlYXRDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3l7XG4gIEBPdXRwdXQoKSBvblJlcGVhdCA9IG5ldyBFdmVudEVtaXR0ZXI8Q2FsUmVwZWF0PigpO1xuICBAVmlld0NoaWxkKCdyZXBlYXRNb2RhbCcpIHJlcGVhdE1vZGFsOiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCdyZXBlYXRTdGFydCcpIHJlcGVhdFN0YXJ0O1xuICBAVmlld0NoaWxkKCdyZXBlYXRVbnRpbCcpIHJlcGVhdFVudGlsO1xuICBzdGFydDogYW55O1xuICB1bnRpbDogYW55O1xuICBycm1vZGU6IGFueTtcbiAgcmVwZWF0VHlwZXM6IGFueVtdO1xuICB3ZWVrRGF5czogYW55W107XG4gIGRhdGE6IGFueSA9IHt9O1xuICAkbW9kYWw6IGFueTtcbiAgZGF0ZUZvcm1hdDogc3RyaW5nID0gJ0REL01NL1lZWVknO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY2FsZW5kYXJTZXJ2aWNlOiBDYWxlbmRhclNlcnZpY2UsXG4gICkge1xuICAgIHRoaXMucmVwZWF0VHlwZXMgPSBDYWxlbmRhclV0aWxzLnJlcGVhdFR5cGVzO1xuICAgIHRoaXMud2Vla0RheXMgPSBDYWxlbmRhclV0aWxzLndlZWtEYXlzO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuJG1vZGFsID0gJCh0aGlzLnJlcGVhdE1vZGFsLm5hdGl2ZUVsZW1lbnQpO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5yZXBlYXRNb2RhbC5uYXRpdmVFbGVtZW50KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGlmICh0aGlzLiRtb2RhbC5pcygnOnZpc2libGUnKSkge1xuICAgICAgdGhpcy4kbW9kYWwubW9kYWwoJ2hpZGUnKS5vbignaGlkZGVuLmJzLm1vZGFsJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAkKHRoaXMpLnJlbW92ZSgpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuJG1vZGFsLnJlbW92ZSgpO1xuICAgIH1cbiAgfVxuXG4gIG9wZW5SZXBlYXQoZGF0YTogYW55KSB7XG4gICAgdGhpcy5kYXRhID0gZGF0YSB8fCB7fTtcbiAgICB0aGlzLmluaXREYXRhKCk7XG4gICAgdGhpcy4kbW9kYWwubW9kYWwoJ3Nob3cnKTtcbiAgfVxuXG4gIHNhdmVSZXBlYXQoKSB7XG4gICAgdGhpcy5vblJlcGVhdC5lbWl0KHRoaXMuZ2V0UmVwZWF0RGF0YSgpKTtcbiAgfVxuXG4gIGNoYW5nZVdlZWtEYXkoaXRlbSkge1xuICAgIGl0ZW0uY2hlY2tlZCA9ICFpdGVtLmNoZWNrZWQ7XG4gICAgaWYgKHRoaXMuZ2V0V2Vla0RheUNoZWNrZWQoKS5sZW5ndGggPCAxKSB7XG4gICAgICBpdGVtLmNoZWNrZWQgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIGNoYW5nZURhdGUoKSB7XG4gICAgaWYgKCF0aGlzLnN0YXJ0IHx8ICF0aGlzLnN0YXJ0LmdldFRpbWUoKSkge1xuICAgICAgdGhpcy5zdGFydCA9IG5ldyBEYXRlKCk7XG4gICAgfVxuICAgIGlmICghdGhpcy51bnRpbCB8fCAhdGhpcy51bnRpbC5nZXRUaW1lKCkgfHwgdGhpcy5zdGFydCA+PSB0aGlzLnVudGlsKSB7XG4gICAgICB0aGlzLnVudGlsID0gbmV3IERhdGUodGhpcy5zdGFydC5nZXRGdWxsWWVhcigpLCB0aGlzLnN0YXJ0LmdldE1vbnRoKCksIHRoaXMuc3RhcnQuZ2V0RGF0ZSgpKTtcbiAgICAgIHRoaXMudW50aWwuc2V0TW9udGgodGhpcy51bnRpbC5nZXRNb250aCgpICsgMSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0UmVwZWF0RGF0YSgpOiBDYWxSZXBlYXQge1xuICAgIGNvbnN0IHBhcmFtcyA9IHtcbiAgICAgIHJybW9kZTogdGhpcy5ycm1vZGUsXG4gICAgICBsc3RhcnQ6IHRoaXMuc3RhcnQuZ2V0VGltZSgpLFxuICAgICAgdW50aWw6IHRoaXMudW50aWwuZ2V0VGltZSgpLFxuICAgICAgd2tkYXlzOiBbXVxuICAgIH07XG5cbiAgICBpZiAocGFyYW1zLnJybW9kZSA9PSAnV0VFS0xZJykge1xuXG4gICAgICAvLyB0aGlzLndlZWtEYXlzLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAvLyAgIGlmIChpdGVtLmNoZWNrZWQpIHtcbiAgICAgIC8vICAgICBwYXJhbXMud2tkYXlzICs9IGl0ZW0udmFsdWUgKyAnLCc7XG4gICAgICAvLyAgIH1cbiAgICAgIC8vIH0pO1xuICAgICAgLy8gcGFyYW1zLndrZGF5cyA9IHBhcmFtcy53a2RheXMuc2xpY2UoMCwgLTEpO1xuICAgICAgICBwYXJhbXMud2tkYXlzID0gdGhpcy5nZXRXZWVrRGF5Q2hlY2tlZCgpLm1hcChpdGVtID0+IGl0ZW0udmFsdWUpO1xuICAgIH1cblxuICAgIHJldHVybiBwYXJhbXM7XG4gIH1cblxuICBnZXRXZWVrRGF5Q2hlY2tlZCgpIHtcbiAgICByZXR1cm4gdGhpcy53ZWVrRGF5cy5maWx0ZXIoaXRlbSA9PiB7XG4gICAgICByZXR1cm4gaXRlbS5jaGVja2VkO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBpbml0RGF0YSgpIHtcbiAgICB0aGlzLnJybW9kZSA9IHRoaXMuZGF0YS5ycm1vZGUgfHwgJ0RBSUxZJztcbiAgICB0aGlzLnN0YXJ0ID0gbmV3IERhdGUodGhpcy5kYXRhLmxzdGFydCk7XG4gICAgdGhpcy51bnRpbCA9IG5ldyBEYXRlKHRoaXMuZGF0YS51bnRpbCk7XG4gICAgdGhpcy5jaGFuZ2VEYXRlKCk7XG5cbiAgICBpZiAodGhpcy5kYXRhLndrZGF5cykge1xuICAgICAgdGhpcy53ZWVrRGF5cy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICBpZiAodGhpcy5kYXRhLndrZGF5cy5pbmRleE9mKGl0ZW0udmFsdWUpID4gLTEpIHtcbiAgICAgICAgICBpdGVtLmNoZWNrZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy53ZWVrRGF5c1sodGhpcy5zdGFydC5nZXREYXkoKSArIDYpICUgN10uY2hlY2tlZCA9IHRydWU7XG4gICAgfVxuICB9XG59XG4iXX0=