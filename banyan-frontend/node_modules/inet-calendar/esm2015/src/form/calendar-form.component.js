/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, ViewChild } from '@angular/core';
import { CalendarService } from "../calendar.service";
import { CalendarDialogRepeatComponent } from "../dialog-repeat/dialog-repeat.component";
import { ActivatedRoute, Router } from "@angular/router";
import { NotificationService, HttpClientService } from 'inet-core';
import { CalendarDialogDelete } from "../dialog-delete/dialog-delete.component";
import { AttachmentListComponent } from "../attachment-list/attachment-list.component";
import * as moment_ from 'moment';
import { vnToLatin } from "../utils/common/Accent";
import { CalAttendeeType } from "../utils/model/CalAttendeeType";
import { xCalendar } from "../utils/xCalendar";
import { Observable } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { CalendarUtils } from "../CalendarUtils";
/** @type {?} */
const moment = moment_;
export class CalendarFormComponent {
    /**
     * @param {?} route
     * @param {?} calendarService
     * @param {?} notify
     * @param {?} router
     * @param {?} http
     */
    constructor(route, calendarService, notify, router, http) {
        this.route = route;
        this.calendarService = calendarService;
        this.notify = notify;
        this.router = router;
        this.http = http;
        this.event = {};
        this.formData = {
            title: '',
            date: '',
            startTime: '',
            toTime: '',
            location: '',
            summary: '',
            state: '',
            notes: '',
            repeat: false,
            _allday: ''
        };
        this.attendees = [];
        this._attendees = [];
        this.attendeeSearch = new Observable((/**
         * @param {?} subscriber
         * @return {?}
         */
        subscriber => {
            /** @type {?} */
            let value = this.attendeeModal.trim();
            if (!value) {
                subscriber.next([]);
                return;
            }
            value = vnToLatin(value);
            subscriber.next(this._attendees.filter((/**
             * @param {?} item
             * @return {?}
             */
            (item) => item['_index'].indexOf(value) > -1)).slice(0, 10));
        })).pipe(debounceTime(200), distinctUntilChanged());
        this.locationSearch = new Observable((/**
         * @param {?} subscriber
         * @return {?}
         */
        subscriber => {
            /** @type {?} */
            let value = this.formData.location;
            if (!value) {
                subscriber.next([]);
                return;
            }
            this.calendarService.searchLocation(value, (/**
             * @param {?} items
             * @return {?}
             */
            (items) => subscriber.next(items.map((/**
             * @param {?} item
             * @return {?}
             */
            item => item.content)))));
        })).pipe(debounceTime(200), distinctUntilChanged());
        this.calendarService.ready((/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            let params = this.route.snapshot.paramMap;
            if (params.get('id')) {
                this.calendarService.loadEvent({
                    element: params.get('id')
                }, (/**
                 * @param {?} event
                 * @return {?}
                 */
                (event) => {
                    if (!event) {
                        this.eventNotFound = true;
                        return;
                    }
                    this.event = event;
                    this.attendees = event.attendees;
                    if (event.members) {
                        this.event.myAttendee = event.members.find((/**
                         * @param {?} item
                         * @return {?}
                         */
                        item => {
                            return item.role !== 'CREATOR' && item.username === iNet.username;
                        }));
                    }
                    this._initForm();
                }));
            }
            else {
                /** @type {?} */
                let event;
                try {
                    event = JSON.parse(atob(params.get('data')));
                    event.start = new Date(event.start);
                    event.end = new Date(event.end);
                }
                catch (e) {
                    event = {};
                    event.start = new Date();
                    event.start.setHours(event.start.getHours() + 1, 0, 0, 0);
                    event.end = new Date(event.start.getTime() + 60 * 60 * 1000);
                }
                this.event = event;
                this._initForm();
            }
        }));
        this.calendarService.loadAttendees((/**
         * @param {?} attendees
         * @return {?}
         */
        (attendees) => this._attendees = attendees));
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.titleInput.nativeElement.focus();
    }
    /**
     * @private
     * @return {?}
     */
    _initForm() {
        /** @type {?} */
        let values = {
            title: this.event.subject || '',
            date: this.event.start,
            startTime: moment(this.event.start).format('HH:mm'),
            toTime: moment(this.event.end).format('HH:mm'),
            location: this.event.location || '',
            summary: this.event.summary || '',
            _allday: this.event.attribute && this.event.attribute['allday'] === 'true' || false,
            state: 'NEEDS_ACTION',
            notes: '',
            repeat: false,
        };
        if (this.event.myAttendee) {
            values.state = this.event.myAttendee.state;
            values.notes = this.event.myAttendee.notes || '';
        }
        Object.assign(this.formData, values);
        if (this.event.repeat) {
            this.setRepeatData(this.event.repeat);
        }
    }
    /**
     * @return {?}
     */
    createEvent() {
        /** @type {?} */
        let data = this._getFormData();
        if (!data) {
            return;
        }
        this.http.showLoading('Đang xử lý...');
        if (data.element) {
            this.calendarService.updateEvent(data, (/**
             * @param {?} data
             * @return {?}
             */
            (data) => {
                if (data) {
                    this._onSuccess();
                }
                else {
                    this.notify.showMessage('Cập nhật lịch không thành công', 'error');
                }
            }));
            this._updateMyState();
        }
        else {
            this.calendarService.createEvent(data, (/**
             * @param {?} data
             * @return {?}
             */
            (data) => {
                if (data) {
                    this._onSuccess();
                }
                else {
                    this.notify.showMessage('Tạo lịch không thành công', 'error');
                }
            }));
        }
    }
    /**
     * @private
     * @return {?}
     */
    _onSuccess() {
        this.router.navigate(['/calendar']);
    }
    /**
     * @private
     * @return {?}
     */
    _getFormData() {
        if (!this._validate()) {
            return;
        }
        /** @type {?} */
        let data = this.formData;
        /** @type {?} */
        let params = {
            subject: data.title,
            summary: data.summary,
            location: data.location,
            startTime: this.getMinutes(data._allday ? '00:00' : data.startTime),
            toTime: this.getMinutes(data._allday ? '23:59' : data.toTime),
            _allday: data._allday
        };
        /** @type {?} */
        let date = moment(data.date);
        params.day = date.dayOfYear();
        params.year = date.year();
        if (this.event.uuid) {
            params.element = this.event.uuid;
        }
        if (data.repeat && this.event.repeat) {
            Object.assign(params, this.event.repeat);
            if (params.wkdays) {
                params.wkdays = params.wkdays.join(',');
            }
        }
        this.fileList.files.forEach((/**
         * @param {?} file
         * @param {?} index
         * @return {?}
         */
        (file, index) => {
            if (!file.id) {
                params['file' + index] = file;
            }
        }));
        if (params.location) {
            this.calendarService.saveLocation(params.location, (/**
             * @return {?}
             */
            () => { }));
        }
        params.attendee = this.attendees;
        xCalendar.modifyDataUpdate(params, this.event);
        return params;
    }
    /**
     * @private
     * @param {?} attendee
     * @return {?}
     */
    _hasAttendee(attendee) {
        for (let i = 0; i < this.attendees.length; i++) {
            if (this.attendees[i].username === attendee.username) {
                return true;
            }
        }
        return false;
    }
    /**
     * @param {?} e
     * @return {?}
     */
    addAttendee(e) {
        /** @type {?} */
        let attendee = e.item;
        this.attendeeModal = '';
        if (!this._hasAttendee(attendee)) {
            attendee.type = CalAttendeeType.USER;
            this.attendees.push(attendee);
        }
    }
    /**
     * @private
     * @return {?}
     */
    _validate() {
        if (!this.formData.title.trim() || !this.formData.date) {
            return false;
        }
        if (!this.formData._allday) {
            if (this.getMinutes(this.formData.startTime) >= this.getMinutes(this.formData.toTime)) {
                this.timeError = true;
                return false;
            }
        }
        this.timeError = false;
        return true;
    }
    /**
     * @param {?} data
     * @return {?}
     */
    setRepeatData(data) {
        if (!data) {
            this._clearRepeat();
            return;
        }
        this.event.repeat = data;
        this.repeatText = CalendarUtils.getRepeatText(data);
        this.formData.repeat = true;
    }
    /**
     * @param {?} checked
     * @return {?}
     */
    openRepeat(checked) {
        if (checked) {
            this.repeatModal.openRepeat({
                lstart: this.event.lstart
            });
        }
        this._clearRepeat();
    }
    /**
     * @param {?} e
     * @return {?}
     */
    onEditRepeat(e) {
        e.preventDefault();
        e.stopPropagation();
        this.repeatModal.openRepeat(this.event.repeat);
    }
    /**
     * @private
     * @return {?}
     */
    _clearRepeat() {
        this.repeatText = '';
        this.formData.repeat = false;
    }
    /**
     * @private
     * @return {?}
     */
    _updateMyState() {
        if (!this.event.myAttendee) {
            return;
        }
        this.calendarService.loadEvent({
            state: this.formData.state,
            notes: this.formData.notes,
            element: this.event.uuid
        }, (/**
         * @return {?}
         */
        function () { }));
    }
    /**
     * @return {?}
     */
    goBack() {
        history.back();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onRemoveEvent(event) {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }
        this.viewDeleteModal.show();
    }
    /**
     * @private
     * @param {?} hourStr
     * @return {?}
     */
    getMinutes(hourStr) {
        /** @type {?} */
        let hours = hourStr.split(':');
        return Number(hours[0]) * 60 + Number(hours[1]);
    }
}
CalendarFormComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-calendar-form',
                template: "<div class=\"admin-layout\">\n    <div class=\"container-fluid nav-fixed-top cp-toolbar\">\n        <button (click)=\"goBack()\" class=\"btn btn-sm btn-primary mr-1 ng-star-inserted\" data-toggle=\"tooltip\" type=\"button\" title=\"Tr\u1EDF v\u1EC1\">\n            <i class=\"fa fa-arrow-left\"></i>\n        </button>\n        <button *ngIf=\"event.isCreator || !event.uuid\" (click)=\"createEvent()\" class=\"btn btn-sm btn-primary ng-star-inserted mr-1\" data-toggle=\"tooltip\" type=\"button\" title=\"L\u01B0u s\u1EF1 ki\u1EC7n\">\n            <i class=\"fa fa-save\"></i>\n        </button>\n        <button *ngIf=\"event.isCreator\" (click)=\"onRemoveEvent($event)\" class=\"btn btn-sm btn-danger ng-star-inserted\" data-toggle=\"tooltip\" type=\"button\" title=\"X\u00F3a s\u1EF1 ki\u1EC7n\">\n            <i class=\"fa fa-trash\"></i>\n        </button>\n    </div>\n    <div class=\"cp-content p-3\">\n        <div class=\"card\" *ngIf=\"eventNotFound\">\n            <div class=\"card-body text-center\">\n                Kh\u00F4ng t\u00ECm th\u1EA5y l\u1ECBch\n            </div>\n        </div>\n        <div [ngClass]=\"{'hide': eventNotFound}\" class=\"row\">\n                <div class=\"col-md-6\">\n                    <div class=\"form-group\">\n                        <label class=\"font-weight-bold\">Ti\u00EAu \u0111\u1EC1 (<span class=\"text-danger\">*</span>):</label>\n                        <input #titleInput type=\"text\" class=\"form-control\"\n                               [(ngModel)]=\"formData.title\"\n                               [ngClass]=\"{'is-invalid': titleInput.value.trim().length === 0}\">\n                    </div>\n                    <div class=\"form-group row\">\n                        <div class=\"col-6\" style=\"padding-right:5px\">\n                            <label class=\"font-weight-bold\">Ng\u00E0y s\u1EF1 ki\u1EC7n (<span class=\"text-danger\">*</span>):</label>\n                            <input type=\"text\" class=\"form-control\"\n                                   [(ngModel)]=\"formData.date\"\n                                   [ngClass]=\"{'is-invalid': formData.date.length === 0}\"\n                                   #dp=\"bsDatepicker\"\n                                   bsDatepicker\n                                   [bsConfig]=\"{dateInputFormat: 'DD/MM/YYYY'}\">\n                        </div>\n                        <div *ngIf=\"!allDay.checked\" class=\"col-3\" style=\"padding-right:5px;padding-left:5px\">\n                            <label class=\"font-weight-bold\">T\u1EEB gi\u1EDD (<span class=\"text-danger\">*</span>):</label>\n                            <input type=\"text\" class=\"form-control\"\n                                   [(ngModel)]=\"formData.startTime\"\n                                   [ngClass]=\"{'is-invalid': (timeError || formData.startTime.length === 0)}\"\n                                   timePicker\n                                   [timePickerModal]=\"timeStartModal\">\n                            <time-picker-modal #timeStartModal></time-picker-modal>\n                        </div>\n                        <div *ngIf=\"!allDay.checked\" class=\"col-3\" style=\"padding-left:5px\">\n                            <label class=\"font-weight-bold\">\u0110\u1EBFn gi\u1EDD (<span class=\"text-danger\">*</span>):</label>\n                            <input type=\"text\" class=\"form-control\"\n                                   [(ngModel)]=\"formData.toTime\"\n                                   [ngClass]=\"{'is-invalid': (timeError || formData.toTime.length === 0)}\"\n                                   timePicker\n                                   [timePickerModal]=\"timeEndModal\">\n                            <time-picker-modal #timeEndModal></time-picker-modal>\n                        </div>\n                    </div>\n                    <div class=\"form-group form-check\">\n                        <input #allDay [(ngModel)]=\"formData._allday\" type=\"checkbox\" id=\"_allday\" class=\"form-check-input\" value=\"true\"/>\n                        <label class=\"form-check-label font-weight-bold\" for=\"_allday\">C\u1EA3 ng\u00E0y</label>\n                    </div>\n                    <div class=\"form-group form-check\">\n                        <input (click)=\"openRepeat(repeat.checked)\"\n                               #repeat\n                               [(ngModel)]=\"formData.repeat\"\n                               class=\"form-check-input\"\n                               id=\"repeat\" type=\"checkbox\" value=\"true\"/>\n                        <label class=\"form-check-label font-weight-bold\" for=\"repeat\">L\u1EB7p l\u1ECBch</label>\n                        <span *ngIf=\"repeatText\">\n                            <b>:</b> {{repeatText}}\n                            <i (click)=\"onEditRepeat($event)\" class=\"fa fa-pencil\" style=\"padding: 5px;margin: -5px 0;cursor: pointer;\" title=\"Ch\u1EC9nh s\u1EEDa\"></i>\n                        </span>\n                    </div>\n                    <div class=\"form-group\">\n                        <button (click)=\"fileAttachment.click()\" title=\"T\u1EADp tin \u0111\u00EDnh k\u00E8m\" type=\"button\" class=\"btn btn-primary btn-sm rounded\">\n                            <i class=\"fa fa-cloud-upload pr-1\" aria-hidden=\"true\"></i>\n                            <span>\u0110\u00EDnh k\u00E8m</span>\n                            <input #fileAttachment type=\"file\" multiple style=\"display:none\">\n                        </button>\n                        <div style=\"margin-top: 10px\">\n                            <calendar-attachment-list\n                                    [calEvent]=\"event\"\n                                    [removable]=\"true\"\n                                    [fileEl]=\"fileAttachment\"></calendar-attachment-list>\n                        </div>\n                    </div>\n                    <div class=\"form-group\">\n                        <label class=\"font-weight-bold\">\u0110\u1ECBa \u0111i\u1EC3m:</label>\n                        <input type=\"text\" class=\"form-control\"\n                               [(ngModel)]=\"formData.location\"\n                               [typeahead]=\"locationSearch\">\n                    </div>\n                    <div class=\"form-group\">\n                        <label class=\"font-weight-bold\">M\u00F4 t\u1EA3:</label>\n                        <textarea (keydown.enter)=\"$event.stopPropagation()\" type=\"text\" class=\"form-control\"\n                                  [(ngModel)]=\"formData.summary\"></textarea>\n                    </div>\n                </div>\n                <div class=\"col-md-6\">\n                    <div [hidden]=\"!event.myAttendee\" class=\"form-group\">\n                        <label class=\"font-weight-bold\">B\u1EA1n c\u00F3 tham d\u1EF1 kh\u00F4ng?</label>\n                        <div class=\"input-group\">\n                            <select [(ngModel)]=\"formData.state\" class=\"attendee-select form-control\" style=\"margin-right:-3px\">\n                                <option value=\"ACCEPTED\">C\u00F3</option>\n                                <option value=\"DECLINED\">Kh\u00F4ng</option>\n                                <option value=\"NEEDS_ACTION\">C\u00F3 th\u1EC3</option>\n                            </select>\n                            <input [(ngModel)]=\"formData.notes\" type=\"text\" class=\"form-control\" placeholder=\"Ghi ch\u00FA\">\n                        </div>\n                    </div>\n                    <div class=\"form-group\">\n                        <label class=\"font-weight-bold\">Th\u00E0nh ph\u1EA7n: </label>\n                        <ng-template #attendeeTemplate let-attendee=\"item\">\n                            <div class=\"attendee-item\">\n                                <img userAvatar [usercode]=\"attendee.username\">\n                                <div>{{attendee.fullname}}</div>\n                            </div>\n                        </ng-template>\n                        <input type=\"text\" class=\"form-control\"\n                               #attendeeInput\n                               [(ngModel)]=\"attendeeModal\"\n                               [typeahead]=\"attendeeSearch\"\n                               [typeaheadItemTemplate]=\"attendeeTemplate\"\n                               (typeaheadOnSelect)=\"addAttendee($event)\"/>\n                    </div>\n                    <div class=\"form-group\">\n                        <calendar-attendee-list [attendees]=\"attendees\" [editable]=\"true\"></calendar-attendee-list>\n                    </div>\n                </div>\n            </div>\n    </div>\n    <calendar-repeat-modal #repeatModal (onRepeat)=\"setRepeatData($event)\"></calendar-repeat-modal>\n</div>\n<calendar-dialog-delete #dialogRemove [calEvent]=\"event\" (onDelete)=\"goBack()\" hidden></calendar-dialog-delete>\n",
                styles: [".attendee-select{background:#e9ecef;width:90px;padding-right:5px;padding-left:5px;flex:none}.attendee-list-container{overflow:auto;max-height:200px;box-shadow:rgba(0,0,0,.14) 0 8px 10px 1px,rgba(0,0,0,.12) 0 3px 14px 2px,rgba(0,0,0,.2) 0 5px 5px -3px;border-radius:4px;margin-top:5px}.form-check-input{opacity:1!important;margin-top:1px}.attendee-item{display:flex;margin:0 -10px;align-items:center}.attendee-item>img{width:30px;height:30px;border-radius:50%;margin-right:10px}"]
            }] }
];
/** @nocollapse */
CalendarFormComponent.ctorParameters = () => [
    { type: ActivatedRoute },
    { type: CalendarService },
    { type: NotificationService },
    { type: Router },
    { type: HttpClientService }
];
CalendarFormComponent.propDecorators = {
    repeatModal: [{ type: ViewChild, args: ['repeatModal',] }],
    viewDeleteModal: [{ type: ViewChild, args: ['dialogRemove',] }],
    titleInput: [{ type: ViewChild, args: ['titleInput',] }],
    attendeeInput: [{ type: ViewChild, args: ['attendeeInput',] }],
    fileList: [{ type: ViewChild, args: [AttachmentListComponent,] }]
};
if (false) {
    /** @type {?} */
    CalendarFormComponent.prototype.repeatModal;
    /** @type {?} */
    CalendarFormComponent.prototype.viewDeleteModal;
    /** @type {?} */
    CalendarFormComponent.prototype.titleInput;
    /** @type {?} */
    CalendarFormComponent.prototype.attendeeInput;
    /** @type {?} */
    CalendarFormComponent.prototype.fileList;
    /** @type {?} */
    CalendarFormComponent.prototype.event;
    /** @type {?} */
    CalendarFormComponent.prototype.repeatText;
    /** @type {?} */
    CalendarFormComponent.prototype.eventNotFound;
    /** @type {?} */
    CalendarFormComponent.prototype.timeError;
    /** @type {?} */
    CalendarFormComponent.prototype.attendeeModal;
    /** @type {?} */
    CalendarFormComponent.prototype.formData;
    /** @type {?} */
    CalendarFormComponent.prototype.attendees;
    /**
     * @type {?}
     * @private
     */
    CalendarFormComponent.prototype._attendees;
    /** @type {?} */
    CalendarFormComponent.prototype.attendeeSearch;
    /** @type {?} */
    CalendarFormComponent.prototype.locationSearch;
    /**
     * @type {?}
     * @private
     */
    CalendarFormComponent.prototype.route;
    /**
     * @type {?}
     * @private
     */
    CalendarFormComponent.prototype.calendarService;
    /**
     * @type {?}
     * @private
     */
    CalendarFormComponent.prototype.notify;
    /**
     * @type {?}
     * @private
     */
    CalendarFormComponent.prototype.router;
    /**
     * @type {?}
     * @private
     */
    CalendarFormComponent.prototype.http;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItZm9ybS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbmV0LWNhbGVuZGFyLyIsInNvdXJjZXMiOlsic3JjL2Zvcm0vY2FsZW5kYXItZm9ybS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBZ0IsU0FBUyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFOUUsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ3BELE9BQU8sRUFBQyw2QkFBNkIsRUFBQyxNQUFNLDBDQUEwQyxDQUFDO0FBQ3ZGLE9BQU8sRUFBQyxjQUFjLEVBQUUsTUFBTSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDdkQsT0FBTyxFQUFDLG1CQUFtQixFQUFFLGlCQUFpQixFQUFDLE1BQU0sV0FBVyxDQUFDO0FBQ2pFLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLDBDQUEwQyxDQUFDO0FBQzlFLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLDhDQUE4QyxDQUFDO0FBR3JGLE9BQU8sS0FBSyxPQUFPLE1BQU0sUUFBUSxDQUFDO0FBQ2xDLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUNqRCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFDL0QsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDaEMsT0FBTyxFQUFDLFlBQVksRUFBRSxvQkFBb0IsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRWxFLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQzs7TUFDekMsTUFBTSxHQUFHLE9BQU87QUFVdEIsTUFBTSxPQUFPLHFCQUFxQjs7Ozs7Ozs7SUEwQjlCLFlBQW9CLEtBQXFCLEVBQ3JCLGVBQWdDLEVBQ2hDLE1BQTJCLEVBQzNCLE1BQWMsRUFDZCxJQUF1QjtRQUp2QixVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUNyQixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsV0FBTSxHQUFOLE1BQU0sQ0FBcUI7UUFDM0IsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLFNBQUksR0FBSixJQUFJLENBQW1CO1FBeEIzQyxVQUFLLEdBQWEsRUFBRSxDQUFDO1FBS3JCLGFBQVEsR0FBRztZQUNQLEtBQUssRUFBRSxFQUFFO1lBQ1QsSUFBSSxFQUFFLEVBQUU7WUFDUixTQUFTLEVBQUUsRUFBRTtZQUNiLE1BQU0sRUFBRSxFQUFFO1lBQ1YsUUFBUSxFQUFFLEVBQUU7WUFDWixPQUFPLEVBQUUsRUFBRTtZQUNYLEtBQUssRUFBRSxFQUFFO1lBQ1QsS0FBSyxFQUFFLEVBQUU7WUFDVCxNQUFNLEVBQUUsS0FBSztZQUNiLE9BQU8sRUFBRSxFQUFFO1NBQ2QsQ0FBQztRQUNGLGNBQVMsR0FBa0IsRUFBRSxDQUFDO1FBQ3RCLGVBQVUsR0FBa0IsRUFBRSxDQUFDO1FBcUp2QyxtQkFBYyxHQUFHLElBQUksVUFBVTs7OztRQUFDLFVBQVUsQ0FBQyxFQUFFOztnQkFDckMsS0FBSyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFO1lBQ3JDLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1IsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDcEIsT0FBTzthQUNWO1lBQ0QsS0FBSyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN6QixVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTTs7OztZQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3ZHLENBQUMsRUFBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLEVBQUUsb0JBQW9CLEVBQUUsQ0FBQyxDQUFDO1FBV25ELG1CQUFjLEdBQUcsSUFBSSxVQUFVOzs7O1FBQUMsVUFBVSxDQUFDLEVBQUU7O2dCQUNyQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRO1lBQ2xDLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1IsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDcEIsT0FBTzthQUNWO1lBQ0QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxjQUFjLENBQUMsS0FBSzs7OztZQUFFLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHOzs7O1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxDQUFDO1FBQzVHLENBQUMsRUFBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLEVBQUUsb0JBQW9CLEVBQUUsQ0FBQyxDQUFDO1FBeEsvQyxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUs7OztRQUFDLEdBQUcsRUFBRTs7Z0JBQ3hCLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxRQUFRO1lBQ3pDLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDbEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUM7b0JBQzNCLE9BQU8sRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQztpQkFDNUI7Ozs7Z0JBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtvQkFDVCxJQUFJLENBQUMsS0FBSyxFQUFFO3dCQUNSLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO3dCQUMxQixPQUFPO3FCQUNWO29CQUNELElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO29CQUNuQixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUM7b0JBQ2pDLElBQUcsS0FBSyxDQUFDLE9BQU8sRUFBRTt3QkFDZCxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUk7Ozs7d0JBQUMsSUFBSSxDQUFDLEVBQUU7NEJBQzlDLE9BQU8sSUFBSSxDQUFDLElBQUksS0FBSyxTQUFTLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDO3dCQUN0RSxDQUFDLEVBQUMsQ0FBQztxQkFDTjtvQkFDRCxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBQ3JCLENBQUMsRUFBQyxDQUFDO2FBQ047aUJBQU07O29CQUNDLEtBQUs7Z0JBQ1QsSUFBSTtvQkFDQSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzdDLEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUNwQyxLQUFLLENBQUMsR0FBRyxHQUFHLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDbkM7Z0JBQUMsT0FBTyxDQUFDLEVBQUU7b0JBQ1IsS0FBSyxHQUFHLEVBQUUsQ0FBQztvQkFDWCxLQUFLLENBQUMsS0FBSyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7b0JBQ3pCLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQzFELEtBQUssQ0FBQyxHQUFHLEdBQUcsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO2lCQUNoRTtnQkFDRCxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztnQkFDbkIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO2FBQ3BCO1FBQ0wsQ0FBQyxFQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsZUFBZSxDQUFDLGFBQWE7Ozs7UUFBQyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLEVBQUMsQ0FBQztJQUNuRixDQUFDOzs7O0lBRUQsZUFBZTtRQUNYLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzFDLENBQUM7Ozs7O0lBRU8sU0FBUzs7WUFDVCxNQUFNLEdBQUc7WUFDVCxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLElBQUksRUFBRTtZQUMvQixJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLO1lBQ3RCLFNBQVMsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDO1lBQ25ELE1BQU0sRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDO1lBQzlDLFFBQVEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsSUFBSSxFQUFFO1lBQ25DLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sSUFBSSxFQUFFO1lBQ2pDLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxNQUFNLElBQUksS0FBSztZQUNuRixLQUFLLEVBQUUsY0FBYztZQUNyQixLQUFLLEVBQUUsRUFBRTtZQUNULE1BQU0sRUFBRSxLQUFLO1NBQ2hCO1FBQ0QsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRTtZQUN2QixNQUFNLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQztZQUMzQyxNQUFNLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUM7U0FDcEQ7UUFDRCxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDckMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRTtZQUNuQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDekM7SUFDTCxDQUFDOzs7O0lBRUQsV0FBVzs7WUFDSCxJQUFJLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRTtRQUM5QixJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1AsT0FBTztTQUNWO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDdkMsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsSUFBSTs7OztZQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQzVDLElBQUksSUFBSSxFQUFFO29CQUNOLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztpQkFDckI7cUJBQU07b0JBQ0gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsZ0NBQWdDLEVBQUUsT0FBTyxDQUFDLENBQUM7aUJBQ3RFO1lBQ0wsQ0FBQyxFQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDekI7YUFBTTtZQUNILElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLElBQUk7Ozs7WUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUM1QyxJQUFJLElBQUksRUFBRTtvQkFDTixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7aUJBQ3JCO3FCQUFNO29CQUNILElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLDJCQUEyQixFQUFFLE9BQU8sQ0FBQyxDQUFDO2lCQUNqRTtZQUNMLENBQUMsRUFBQyxDQUFDO1NBQ047SUFDTCxDQUFDOzs7OztJQUVPLFVBQVU7UUFDZCxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7SUFDeEMsQ0FBQzs7Ozs7SUFFTyxZQUFZO1FBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUU7WUFDbkIsT0FBTztTQUNWOztZQUNHLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUTs7WUFDcEIsTUFBTSxHQUFRO1lBQ2QsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLO1lBQ25CLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztZQUNyQixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDdkIsU0FBUyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQ25FLE1BQU0sRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUM3RCxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87U0FDeEI7O1lBQ0csSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQzVCLE1BQU0sQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQzlCLE1BQU0sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzFCLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUU7WUFDakIsTUFBTSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztTQUNwQztRQUNELElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRTtZQUNsQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3pDLElBQUcsTUFBTSxDQUFDLE1BQU0sRUFBQztnQkFDYixNQUFNLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQzNDO1NBQ0o7UUFDRCxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFPOzs7OztRQUFDLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO1lBQ3hDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFO2dCQUNWLE1BQU0sQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDO2FBQ2pDO1FBQ0wsQ0FBQyxFQUFDLENBQUM7UUFDSCxJQUFJLE1BQU0sQ0FBQyxRQUFRLEVBQUU7WUFDakIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLFFBQVE7OztZQUFFLEdBQUcsRUFBRSxHQUFFLENBQUMsRUFBQyxDQUFDO1NBQ2hFO1FBQ0QsTUFBTSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ2pDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQy9DLE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7Ozs7OztJQUVPLFlBQVksQ0FBQyxRQUFxQjtRQUN0QyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDNUMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsS0FBSyxRQUFRLENBQUMsUUFBUSxFQUFFO2dCQUNsRCxPQUFPLElBQUksQ0FBQzthQUNmO1NBQ0o7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDOzs7OztJQVlELFdBQVcsQ0FBQyxDQUFpQjs7WUFDckIsUUFBUSxHQUFHLENBQUMsQ0FBQyxJQUFJO1FBQ3JCLElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQzlCLFFBQVEsQ0FBQyxJQUFJLEdBQUcsZUFBZSxDQUFDLElBQUksQ0FBQztZQUNyQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNqQztJQUNMLENBQUM7Ozs7O0lBV08sU0FBUztRQUNiLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFO1lBQ3BELE9BQU8sS0FBSyxDQUFDO1NBQ2hCO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFO1lBQ3hCLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRTtnQkFDbkYsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7Z0JBQ3RCLE9BQU8sS0FBSyxDQUFDO2FBQ2hCO1NBQ0o7UUFDRCxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN2QixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDOzs7OztJQUVELGFBQWEsQ0FBQyxJQUFlO1FBQ3pCLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDUCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDcEIsT0FBTztTQUNWO1FBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxVQUFVLEdBQUcsYUFBYSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwRCxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7SUFDaEMsQ0FBQzs7Ozs7SUFFRCxVQUFVLENBQUMsT0FBZ0I7UUFDdkIsSUFBSSxPQUFPLEVBQUU7WUFDVCxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQztnQkFDeEIsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTTthQUM1QixDQUFDLENBQUM7U0FDTjtRQUNELElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN4QixDQUFDOzs7OztJQUVELFlBQVksQ0FBQyxDQUFDO1FBQ1YsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ25CLENBQUMsQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ25ELENBQUM7Ozs7O0lBRU8sWUFBWTtRQUNoQixJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDakMsQ0FBQzs7Ozs7SUFFTyxjQUFjO1FBQ2xCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRTtZQUN4QixPQUFPO1NBQ1Y7UUFDRCxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQztZQUMzQixLQUFLLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLO1lBQzFCLEtBQUssRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUs7WUFDMUIsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSTtTQUMzQjs7O1FBQUUsY0FBYSxDQUFDLEVBQUMsQ0FBQztJQUN2QixDQUFDOzs7O0lBRUQsTUFBTTtRQUNGLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNuQixDQUFDOzs7OztJQUVELGFBQWEsQ0FBQyxLQUFLO1FBQ2YsSUFBSSxLQUFLLEVBQUU7WUFDUCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDdkIsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1NBQzNCO1FBQ0QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNoQyxDQUFDOzs7Ozs7SUFFTyxVQUFVLENBQUMsT0FBZTs7WUFDMUIsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO1FBQzlCLE9BQU8sTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDcEQsQ0FBQzs7O1lBdFJKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsbUJBQW1CO2dCQUM3QiwwMFJBQTZDOzthQUloRDs7OztZQXZCTyxjQUFjO1lBRmQsZUFBZTtZQUdmLG1CQUFtQjtZQURILE1BQU07WUFDRCxpQkFBaUI7OzswQkF3QnpDLFNBQVMsU0FBQyxhQUFhOzhCQUN2QixTQUFTLFNBQUMsY0FBYzt5QkFDeEIsU0FBUyxTQUFDLFlBQVk7NEJBQ3RCLFNBQVMsU0FBQyxlQUFlO3VCQUN6QixTQUFTLFNBQUMsdUJBQXVCOzs7O0lBSmxDLDRDQUFxRTs7SUFDckUsZ0RBQWlFOztJQUNqRSwyQ0FBZ0Q7O0lBQ2hELDhDQUFzRDs7SUFDdEQseUNBQXNFOztJQUN0RSxzQ0FBcUI7O0lBQ3JCLDJDQUFtQjs7SUFDbkIsOENBQXVCOztJQUN2QiwwQ0FBbUI7O0lBQ25CLDhDQUFtQjs7SUFDbkIseUNBV0U7O0lBQ0YsMENBQThCOzs7OztJQUM5QiwyQ0FBdUM7O0lBcUp2QywrQ0FRbUQ7O0lBV25ELCtDQU9tRDs7Ozs7SUE3S3ZDLHNDQUE2Qjs7Ozs7SUFDN0IsZ0RBQXdDOzs7OztJQUN4Qyx1Q0FBbUM7Ozs7O0lBQ25DLHVDQUFzQjs7Ozs7SUFDdEIscUNBQStCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIFZpZXdDaGlsZH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Zvcm1Db250cm9sLCBGb3JtR3JvdXAsIFZhbGlkYXRvcnN9IGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xuaW1wb3J0IHtDYWxlbmRhclNlcnZpY2V9IGZyb20gXCIuLi9jYWxlbmRhci5zZXJ2aWNlXCI7XG5pbXBvcnQge0NhbGVuZGFyRGlhbG9nUmVwZWF0Q29tcG9uZW50fSBmcm9tIFwiLi4vZGlhbG9nLXJlcGVhdC9kaWFsb2ctcmVwZWF0LmNvbXBvbmVudFwiO1xuaW1wb3J0IHtBY3RpdmF0ZWRSb3V0ZSwgUm91dGVyfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQge05vdGlmaWNhdGlvblNlcnZpY2UsIEh0dHBDbGllbnRTZXJ2aWNlfSBmcm9tICdpbmV0LWNvcmUnO1xuaW1wb3J0IHtDYWxlbmRhckRpYWxvZ0RlbGV0ZX0gZnJvbSBcIi4uL2RpYWxvZy1kZWxldGUvZGlhbG9nLWRlbGV0ZS5jb21wb25lbnRcIjtcbmltcG9ydCB7QXR0YWNobWVudExpc3RDb21wb25lbnR9IGZyb20gXCIuLi9hdHRhY2htZW50LWxpc3QvYXR0YWNobWVudC1saXN0LmNvbXBvbmVudFwiO1xuaW1wb3J0IHtDYWxFdmVudCwgQ2FsUmVwZWF0fSBmcm9tIFwiLi4vdXRpbHMvbW9kZWwvQ2FsRXZlbnRcIjtcbmltcG9ydCB7Q2FsQXR0ZW5kZWV9IGZyb20gXCIuLi91dGlscy9tb2RlbC9DYWxBdHRlbmRlZVwiO1xuaW1wb3J0ICogYXMgbW9tZW50XyBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHt2blRvTGF0aW59IGZyb20gXCIuLi91dGlscy9jb21tb24vQWNjZW50XCI7XG5pbXBvcnQge0NhbEF0dGVuZGVlVHlwZX0gZnJvbSBcIi4uL3V0aWxzL21vZGVsL0NhbEF0dGVuZGVlVHlwZVwiO1xuaW1wb3J0IHt4Q2FsZW5kYXJ9IGZyb20gXCIuLi91dGlscy94Q2FsZW5kYXJcIjtcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSBcInJ4anNcIjtcbmltcG9ydCB7ZGVib3VuY2VUaW1lLCBkaXN0aW5jdFVudGlsQ2hhbmdlZH0gZnJvbSBcInJ4anMvb3BlcmF0b3JzXCI7XG5pbXBvcnQge1R5cGVhaGVhZE1hdGNofSBmcm9tIFwibmd4LWJvb3RzdHJhcFwiO1xuaW1wb3J0IHtDYWxlbmRhclV0aWxzfSBmcm9tIFwiLi4vQ2FsZW5kYXJVdGlsc1wiO1xuY29uc3QgbW9tZW50ID0gbW9tZW50XztcbmRlY2xhcmUgbGV0IGlOZXQ6IGFueTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhcHAtY2FsZW5kYXItZm9ybScsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2NhbGVuZGFyLWZvcm0uY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogW1xuICAgICAgICAnLi9jYWxlbmRhci1mb3JtLmNvbXBvbmVudC5jc3MnXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBDYWxlbmRhckZvcm1Db21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcbiAgICBAVmlld0NoaWxkKCdyZXBlYXRNb2RhbCcpIHJlcGVhdE1vZGFsOiBDYWxlbmRhckRpYWxvZ1JlcGVhdENvbXBvbmVudDtcbiAgICBAVmlld0NoaWxkKCdkaWFsb2dSZW1vdmUnKSB2aWV3RGVsZXRlTW9kYWw6IENhbGVuZGFyRGlhbG9nRGVsZXRlO1xuICAgIEBWaWV3Q2hpbGQoJ3RpdGxlSW5wdXQnKSB0aXRsZUlucHV0OiBFbGVtZW50UmVmO1xuICAgIEBWaWV3Q2hpbGQoJ2F0dGVuZGVlSW5wdXQnKSBhdHRlbmRlZUlucHV0OiBFbGVtZW50UmVmO1xuICAgIEBWaWV3Q2hpbGQoQXR0YWNobWVudExpc3RDb21wb25lbnQpIGZpbGVMaXN0OiBBdHRhY2htZW50TGlzdENvbXBvbmVudDtcbiAgICBldmVudDogQ2FsRXZlbnQgPSB7fTtcbiAgICByZXBlYXRUZXh0OiBzdHJpbmc7XG4gICAgZXZlbnROb3RGb3VuZDogYm9vbGVhbjtcbiAgICB0aW1lRXJyb3I6IGJvb2xlYW47XG4gICAgYXR0ZW5kZWVNb2RhbDogYW55O1xuICAgIGZvcm1EYXRhID0ge1xuICAgICAgICB0aXRsZTogJycsXG4gICAgICAgIGRhdGU6ICcnLFxuICAgICAgICBzdGFydFRpbWU6ICcnLFxuICAgICAgICB0b1RpbWU6ICcnLFxuICAgICAgICBsb2NhdGlvbjogJycsXG4gICAgICAgIHN1bW1hcnk6ICcnLFxuICAgICAgICBzdGF0ZTogJycsXG4gICAgICAgIG5vdGVzOiAnJyxcbiAgICAgICAgcmVwZWF0OiBmYWxzZSxcbiAgICAgICAgX2FsbGRheTogJydcbiAgICB9O1xuICAgIGF0dGVuZGVlczogQ2FsQXR0ZW5kZWVbXSA9IFtdO1xuICAgIHByaXZhdGUgX2F0dGVuZGVlczogQ2FsQXR0ZW5kZWVbXSA9IFtdO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBjYWxlbmRhclNlcnZpY2U6IENhbGVuZGFyU2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIG5vdGlmeTogTm90aWZpY2F0aW9uU2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgaHR0cDogSHR0cENsaWVudFNlcnZpY2UpIHtcbiAgICAgICAgdGhpcy5jYWxlbmRhclNlcnZpY2UucmVhZHkoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHBhcmFtcyA9IHRoaXMucm91dGUuc25hcHNob3QucGFyYW1NYXA7XG4gICAgICAgICAgICBpZiAocGFyYW1zLmdldCgnaWQnKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2FsZW5kYXJTZXJ2aWNlLmxvYWRFdmVudCh7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQ6IHBhcmFtcy5nZXQoJ2lkJylcbiAgICAgICAgICAgICAgICB9LCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ldmVudE5vdEZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmV2ZW50ID0gZXZlbnQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXR0ZW5kZWVzID0gZXZlbnQuYXR0ZW5kZWVzO1xuICAgICAgICAgICAgICAgICAgICBpZihldmVudC5tZW1iZXJzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmV2ZW50Lm15QXR0ZW5kZWUgPSBldmVudC5tZW1iZXJzLmZpbmQoaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0ucm9sZSAhPT0gJ0NSRUFUT1InICYmIGl0ZW0udXNlcm5hbWUgPT09IGlOZXQudXNlcm5hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbml0Rm9ybSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgZXZlbnQ7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQgPSBKU09OLnBhcnNlKGF0b2IocGFyYW1zLmdldCgnZGF0YScpKSk7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnN0YXJ0ID0gbmV3IERhdGUoZXZlbnQuc3RhcnQpO1xuICAgICAgICAgICAgICAgICAgICBldmVudC5lbmQgPSBuZXcgRGF0ZShldmVudC5lbmQpO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQuc3RhcnQgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICBldmVudC5zdGFydC5zZXRIb3VycyhldmVudC5zdGFydC5nZXRIb3VycygpICsgMSwgMCwgMCwgMCk7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LmVuZCA9IG5ldyBEYXRlKGV2ZW50LnN0YXJ0LmdldFRpbWUoKSArIDYwICogNjAgKiAxMDAwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5ldmVudCA9IGV2ZW50O1xuICAgICAgICAgICAgICAgIHRoaXMuX2luaXRGb3JtKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmNhbGVuZGFyU2VydmljZS5sb2FkQXR0ZW5kZWVzKChhdHRlbmRlZXMpID0+IHRoaXMuX2F0dGVuZGVlcyA9IGF0dGVuZGVlcyk7XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRpdGxlSW5wdXQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2luaXRGb3JtKCkge1xuICAgICAgICBsZXQgdmFsdWVzID0ge1xuICAgICAgICAgICAgdGl0bGU6IHRoaXMuZXZlbnQuc3ViamVjdCB8fCAnJyxcbiAgICAgICAgICAgIGRhdGU6IHRoaXMuZXZlbnQuc3RhcnQsXG4gICAgICAgICAgICBzdGFydFRpbWU6IG1vbWVudCh0aGlzLmV2ZW50LnN0YXJ0KS5mb3JtYXQoJ0hIOm1tJyksXG4gICAgICAgICAgICB0b1RpbWU6IG1vbWVudCh0aGlzLmV2ZW50LmVuZCkuZm9ybWF0KCdISDptbScpLFxuICAgICAgICAgICAgbG9jYXRpb246IHRoaXMuZXZlbnQubG9jYXRpb24gfHwgJycsXG4gICAgICAgICAgICBzdW1tYXJ5OiB0aGlzLmV2ZW50LnN1bW1hcnkgfHwgJycsXG4gICAgICAgICAgICBfYWxsZGF5OiB0aGlzLmV2ZW50LmF0dHJpYnV0ZSAmJiB0aGlzLmV2ZW50LmF0dHJpYnV0ZVsnYWxsZGF5J10gPT09ICd0cnVlJyB8fCBmYWxzZSxcbiAgICAgICAgICAgIHN0YXRlOiAnTkVFRFNfQUNUSU9OJyxcbiAgICAgICAgICAgIG5vdGVzOiAnJyxcbiAgICAgICAgICAgIHJlcGVhdDogZmFsc2UsXG4gICAgICAgIH07XG4gICAgICAgIGlmICh0aGlzLmV2ZW50Lm15QXR0ZW5kZWUpIHtcbiAgICAgICAgICAgIHZhbHVlcy5zdGF0ZSA9IHRoaXMuZXZlbnQubXlBdHRlbmRlZS5zdGF0ZTtcbiAgICAgICAgICAgIHZhbHVlcy5ub3RlcyA9IHRoaXMuZXZlbnQubXlBdHRlbmRlZS5ub3RlcyB8fCAnJztcbiAgICAgICAgfVxuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMuZm9ybURhdGEsIHZhbHVlcyk7XG4gICAgICAgIGlmICh0aGlzLmV2ZW50LnJlcGVhdCkge1xuICAgICAgICAgICAgdGhpcy5zZXRSZXBlYXREYXRhKHRoaXMuZXZlbnQucmVwZWF0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNyZWF0ZUV2ZW50KCkge1xuICAgICAgICBsZXQgZGF0YSA9IHRoaXMuX2dldEZvcm1EYXRhKCk7XG4gICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaHR0cC5zaG93TG9hZGluZygnxJBhbmcgeOG7rSBsw70uLi4nKTtcbiAgICAgICAgaWYgKGRhdGEuZWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5jYWxlbmRhclNlcnZpY2UudXBkYXRlRXZlbnQoZGF0YSwgKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9vblN1Y2Nlc3MoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdGlmeS5zaG93TWVzc2FnZSgnQ+G6rXAgbmjhuq10IGzhu4tjaCBraMO0bmcgdGjDoG5oIGPDtG5nJywgJ2Vycm9yJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLl91cGRhdGVNeVN0YXRlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNhbGVuZGFyU2VydmljZS5jcmVhdGVFdmVudChkYXRhLCAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX29uU3VjY2VzcygpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZ5LnNob3dNZXNzYWdlKCdU4bqhbyBs4buLY2gga2jDtG5nIHRow6BuaCBjw7RuZycsICdlcnJvcicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfb25TdWNjZXNzKCkge1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9jYWxlbmRhciddKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9nZXRGb3JtRGF0YSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLl92YWxpZGF0ZSgpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGRhdGEgPSB0aGlzLmZvcm1EYXRhO1xuICAgICAgICBsZXQgcGFyYW1zOiBhbnkgPSB7XG4gICAgICAgICAgICBzdWJqZWN0OiBkYXRhLnRpdGxlLFxuICAgICAgICAgICAgc3VtbWFyeTogZGF0YS5zdW1tYXJ5LFxuICAgICAgICAgICAgbG9jYXRpb246IGRhdGEubG9jYXRpb24sXG4gICAgICAgICAgICBzdGFydFRpbWU6IHRoaXMuZ2V0TWludXRlcyhkYXRhLl9hbGxkYXkgPyAnMDA6MDAnIDogZGF0YS5zdGFydFRpbWUpLFxuICAgICAgICAgICAgdG9UaW1lOiB0aGlzLmdldE1pbnV0ZXMoZGF0YS5fYWxsZGF5ID8gJzIzOjU5JyA6IGRhdGEudG9UaW1lKSxcbiAgICAgICAgICAgIF9hbGxkYXk6IGRhdGEuX2FsbGRheVxuICAgICAgICB9O1xuICAgICAgICBsZXQgZGF0ZSA9IG1vbWVudChkYXRhLmRhdGUpO1xuICAgICAgICBwYXJhbXMuZGF5ID0gZGF0ZS5kYXlPZlllYXIoKTtcbiAgICAgICAgcGFyYW1zLnllYXIgPSBkYXRlLnllYXIoKTtcbiAgICAgICAgaWYgKHRoaXMuZXZlbnQudXVpZCkge1xuICAgICAgICAgICAgcGFyYW1zLmVsZW1lbnQgPSB0aGlzLmV2ZW50LnV1aWQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRhdGEucmVwZWF0ICYmIHRoaXMuZXZlbnQucmVwZWF0KSB7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKHBhcmFtcywgdGhpcy5ldmVudC5yZXBlYXQpO1xuICAgICAgICAgICAgaWYocGFyYW1zLndrZGF5cyl7XG4gICAgICAgICAgICAgICAgcGFyYW1zLndrZGF5cyA9IHBhcmFtcy53a2RheXMuam9pbignLCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuZmlsZUxpc3QuZmlsZXMuZm9yRWFjaCgoZmlsZSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGlmICghZmlsZS5pZCkge1xuICAgICAgICAgICAgICAgIHBhcmFtc1snZmlsZScgKyBpbmRleF0gPSBmaWxlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKHBhcmFtcy5sb2NhdGlvbikge1xuICAgICAgICAgICAgdGhpcy5jYWxlbmRhclNlcnZpY2Uuc2F2ZUxvY2F0aW9uKHBhcmFtcy5sb2NhdGlvbiwgKCkgPT4ge30pO1xuICAgICAgICB9XG4gICAgICAgIHBhcmFtcy5hdHRlbmRlZSA9IHRoaXMuYXR0ZW5kZWVzO1xuICAgICAgICB4Q2FsZW5kYXIubW9kaWZ5RGF0YVVwZGF0ZShwYXJhbXMsIHRoaXMuZXZlbnQpO1xuICAgICAgICByZXR1cm4gcGFyYW1zO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2hhc0F0dGVuZGVlKGF0dGVuZGVlOiBDYWxBdHRlbmRlZSkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuYXR0ZW5kZWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5hdHRlbmRlZXNbaV0udXNlcm5hbWUgPT09IGF0dGVuZGVlLnVzZXJuYW1lKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGF0dGVuZGVlU2VhcmNoID0gbmV3IE9ic2VydmFibGUoc3Vic2NyaWJlciA9PiB7XG4gICAgICAgIGxldCB2YWx1ZSA9IHRoaXMuYXR0ZW5kZWVNb2RhbC50cmltKCk7XG4gICAgICAgIGlmICghdmFsdWUpIHtcbiAgICAgICAgICAgIHN1YnNjcmliZXIubmV4dChbXSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFsdWUgPSB2blRvTGF0aW4odmFsdWUpO1xuICAgICAgICBzdWJzY3JpYmVyLm5leHQodGhpcy5fYXR0ZW5kZWVzLmZpbHRlcigoaXRlbSkgPT4gaXRlbVsnX2luZGV4J10uaW5kZXhPZih2YWx1ZSkgPiAtMSkuc2xpY2UoMCwgMTApKTtcbiAgICB9KS5waXBlKGRlYm91bmNlVGltZSgyMDApLCBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKTtcblxuICAgIGFkZEF0dGVuZGVlKGU6IFR5cGVhaGVhZE1hdGNoKSB7XG4gICAgICAgIGxldCBhdHRlbmRlZSA9IGUuaXRlbTtcbiAgICAgICAgdGhpcy5hdHRlbmRlZU1vZGFsID0gJyc7XG4gICAgICAgIGlmICghdGhpcy5faGFzQXR0ZW5kZWUoYXR0ZW5kZWUpKSB7XG4gICAgICAgICAgICBhdHRlbmRlZS50eXBlID0gQ2FsQXR0ZW5kZWVUeXBlLlVTRVI7XG4gICAgICAgICAgICB0aGlzLmF0dGVuZGVlcy5wdXNoKGF0dGVuZGVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGxvY2F0aW9uU2VhcmNoID0gbmV3IE9ic2VydmFibGUoc3Vic2NyaWJlciA9PiB7XG4gICAgICAgIGxldCB2YWx1ZSA9IHRoaXMuZm9ybURhdGEubG9jYXRpb247XG4gICAgICAgIGlmICghdmFsdWUpIHtcbiAgICAgICAgICAgIHN1YnNjcmliZXIubmV4dChbXSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jYWxlbmRhclNlcnZpY2Uuc2VhcmNoTG9jYXRpb24odmFsdWUsIChpdGVtcykgPT4gc3Vic2NyaWJlci5uZXh0KGl0ZW1zLm1hcChpdGVtID0+IGl0ZW0uY29udGVudCkpKTtcbiAgICB9KS5waXBlKGRlYm91bmNlVGltZSgyMDApLCBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKTtcblxuICAgIHByaXZhdGUgX3ZhbGlkYXRlKCk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAoIXRoaXMuZm9ybURhdGEudGl0bGUudHJpbSgpIHx8ICF0aGlzLmZvcm1EYXRhLmRhdGUpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuZm9ybURhdGEuX2FsbGRheSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZ2V0TWludXRlcyh0aGlzLmZvcm1EYXRhLnN0YXJ0VGltZSkgPj0gdGhpcy5nZXRNaW51dGVzKHRoaXMuZm9ybURhdGEudG9UaW1lKSkge1xuICAgICAgICAgICAgICAgIHRoaXMudGltZUVycm9yID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy50aW1lRXJyb3IgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgc2V0UmVwZWF0RGF0YShkYXRhOiBDYWxSZXBlYXQpIHtcbiAgICAgICAgaWYgKCFkYXRhKSB7XG4gICAgICAgICAgICB0aGlzLl9jbGVhclJlcGVhdCgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZXZlbnQucmVwZWF0ID0gZGF0YTtcbiAgICAgICAgdGhpcy5yZXBlYXRUZXh0ID0gQ2FsZW5kYXJVdGlscy5nZXRSZXBlYXRUZXh0KGRhdGEpO1xuICAgICAgICB0aGlzLmZvcm1EYXRhLnJlcGVhdCA9IHRydWU7XG4gICAgfVxuXG4gICAgb3BlblJlcGVhdChjaGVja2VkOiBib29sZWFuKSB7XG4gICAgICAgIGlmIChjaGVja2VkKSB7XG4gICAgICAgICAgICB0aGlzLnJlcGVhdE1vZGFsLm9wZW5SZXBlYXQoe1xuICAgICAgICAgICAgICAgIGxzdGFydDogdGhpcy5ldmVudC5sc3RhcnRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2NsZWFyUmVwZWF0KCk7XG4gICAgfVxuXG4gICAgb25FZGl0UmVwZWF0KGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB0aGlzLnJlcGVhdE1vZGFsLm9wZW5SZXBlYXQodGhpcy5ldmVudC5yZXBlYXQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2NsZWFyUmVwZWF0KCkge1xuICAgICAgICB0aGlzLnJlcGVhdFRleHQgPSAnJztcbiAgICAgICAgdGhpcy5mb3JtRGF0YS5yZXBlYXQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF91cGRhdGVNeVN0YXRlKCkge1xuICAgICAgICBpZiAoIXRoaXMuZXZlbnQubXlBdHRlbmRlZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2FsZW5kYXJTZXJ2aWNlLmxvYWRFdmVudCh7XG4gICAgICAgICAgICBzdGF0ZTogdGhpcy5mb3JtRGF0YS5zdGF0ZSxcbiAgICAgICAgICAgIG5vdGVzOiB0aGlzLmZvcm1EYXRhLm5vdGVzLFxuICAgICAgICAgICAgZWxlbWVudDogdGhpcy5ldmVudC51dWlkXG4gICAgICAgIH0sIGZ1bmN0aW9uICgpIHt9KTtcbiAgICB9XG5cbiAgICBnb0JhY2soKSB7XG4gICAgICAgIGhpc3RvcnkuYmFjaygpO1xuICAgIH1cblxuICAgIG9uUmVtb3ZlRXZlbnQoZXZlbnQpe1xuICAgICAgICBpZiAoZXZlbnQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnZpZXdEZWxldGVNb2RhbC5zaG93KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRNaW51dGVzKGhvdXJTdHI6IHN0cmluZyk6IG51bWJlciB7XG4gICAgICAgIGxldCBob3VycyA9IGhvdXJTdHIuc3BsaXQoJzonKTtcbiAgICAgICAgcmV0dXJuIE51bWJlcihob3Vyc1swXSkgKiA2MCArIE51bWJlcihob3Vyc1sxXSk7XG4gICAgfVxufSJdfQ==