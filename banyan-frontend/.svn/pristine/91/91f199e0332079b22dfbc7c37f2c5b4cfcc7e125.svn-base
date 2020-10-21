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
var moment = moment_;
var CalendarFormComponent = /** @class */ (function () {
    function CalendarFormComponent(route, calendarService, notify, router, http) {
        var _this = this;
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
        function (subscriber) {
            /** @type {?} */
            var value = _this.attendeeModal.trim();
            if (!value) {
                subscriber.next([]);
                return;
            }
            value = vnToLatin(value);
            subscriber.next(_this._attendees.filter((/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return item['_index'].indexOf(value) > -1; })).slice(0, 10));
        })).pipe(debounceTime(200), distinctUntilChanged());
        this.locationSearch = new Observable((/**
         * @param {?} subscriber
         * @return {?}
         */
        function (subscriber) {
            /** @type {?} */
            var value = _this.formData.location;
            if (!value) {
                subscriber.next([]);
                return;
            }
            _this.calendarService.searchLocation(value, (/**
             * @param {?} items
             * @return {?}
             */
            function (items) { return subscriber.next(items.map((/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return item.content; }))); }));
        })).pipe(debounceTime(200), distinctUntilChanged());
        this.calendarService.ready((/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var params = _this.route.snapshot.paramMap;
            if (params.get('id')) {
                _this.calendarService.loadEvent({
                    element: params.get('id')
                }, (/**
                 * @param {?} event
                 * @return {?}
                 */
                function (event) {
                    if (!event) {
                        _this.eventNotFound = true;
                        return;
                    }
                    _this.event = event;
                    _this.attendees = event.attendees;
                    if (event.members) {
                        _this.event.myAttendee = event.members.find((/**
                         * @param {?} item
                         * @return {?}
                         */
                        function (item) {
                            return item.role !== 'CREATOR' && item.username === iNet.username;
                        }));
                    }
                    _this._initForm();
                }));
            }
            else {
                /** @type {?} */
                var event_1;
                try {
                    event_1 = JSON.parse(atob(params.get('data')));
                    event_1.start = new Date(event_1.start);
                    event_1.end = new Date(event_1.end);
                }
                catch (e) {
                    event_1 = {};
                    event_1.start = new Date();
                    event_1.start.setHours(event_1.start.getHours() + 1, 0, 0, 0);
                    event_1.end = new Date(event_1.start.getTime() + 60 * 60 * 1000);
                }
                _this.event = event_1;
                _this._initForm();
            }
        }));
        this.calendarService.loadAttendees((/**
         * @param {?} attendees
         * @return {?}
         */
        function (attendees) { return _this._attendees = attendees; }));
    }
    /**
     * @return {?}
     */
    CalendarFormComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.titleInput.nativeElement.focus();
    };
    /**
     * @private
     * @return {?}
     */
    CalendarFormComponent.prototype._initForm = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var values = {
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
    };
    /**
     * @return {?}
     */
    CalendarFormComponent.prototype.createEvent = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var data = this._getFormData();
        if (!data) {
            return;
        }
        this.http.showLoading('Đang xử lý...');
        if (data.element) {
            this.calendarService.updateEvent(data, (/**
             * @param {?} data
             * @return {?}
             */
            function (data) {
                if (data) {
                    _this._onSuccess();
                }
                else {
                    _this.notify.showMessage('Cập nhật lịch không thành công', 'error');
                }
            }));
            this._updateMyState();
        }
        else {
            this.calendarService.createEvent(data, (/**
             * @param {?} data
             * @return {?}
             */
            function (data) {
                if (data) {
                    _this._onSuccess();
                }
                else {
                    _this.notify.showMessage('Tạo lịch không thành công', 'error');
                }
            }));
        }
    };
    /**
     * @private
     * @return {?}
     */
    CalendarFormComponent.prototype._onSuccess = /**
     * @private
     * @return {?}
     */
    function () {
        this.router.navigate(['/calendar']);
    };
    /**
     * @private
     * @return {?}
     */
    CalendarFormComponent.prototype._getFormData = /**
     * @private
     * @return {?}
     */
    function () {
        if (!this._validate()) {
            return;
        }
        /** @type {?} */
        var data = this.formData;
        /** @type {?} */
        var params = {
            subject: data.title,
            summary: data.summary,
            location: data.location,
            startTime: this.getMinutes(data._allday ? '00:00' : data.startTime),
            toTime: this.getMinutes(data._allday ? '23:59' : data.toTime),
            _allday: data._allday
        };
        /** @type {?} */
        var date = moment(data.date);
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
        function (file, index) {
            if (!file.id) {
                params['file' + index] = file;
            }
        }));
        if (params.location) {
            this.calendarService.saveLocation(params.location, (/**
             * @return {?}
             */
            function () { }));
        }
        params.attendee = this.attendees;
        xCalendar.modifyDataUpdate(params, this.event);
        return params;
    };
    /**
     * @private
     * @param {?} attendee
     * @return {?}
     */
    CalendarFormComponent.prototype._hasAttendee = /**
     * @private
     * @param {?} attendee
     * @return {?}
     */
    function (attendee) {
        for (var i = 0; i < this.attendees.length; i++) {
            if (this.attendees[i].username === attendee.username) {
                return true;
            }
        }
        return false;
    };
    /**
     * @param {?} e
     * @return {?}
     */
    CalendarFormComponent.prototype.addAttendee = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        /** @type {?} */
        var attendee = e.item;
        this.attendeeModal = '';
        if (!this._hasAttendee(attendee)) {
            attendee.type = CalAttendeeType.USER;
            this.attendees.push(attendee);
        }
    };
    /**
     * @private
     * @return {?}
     */
    CalendarFormComponent.prototype._validate = /**
     * @private
     * @return {?}
     */
    function () {
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
    };
    /**
     * @param {?} data
     * @return {?}
     */
    CalendarFormComponent.prototype.setRepeatData = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        if (!data) {
            this._clearRepeat();
            return;
        }
        this.event.repeat = data;
        this.repeatText = CalendarUtils.getRepeatText(data);
        this.formData.repeat = true;
    };
    /**
     * @param {?} checked
     * @return {?}
     */
    CalendarFormComponent.prototype.openRepeat = /**
     * @param {?} checked
     * @return {?}
     */
    function (checked) {
        if (checked) {
            this.repeatModal.openRepeat({
                lstart: this.event.lstart
            });
        }
        this._clearRepeat();
    };
    /**
     * @param {?} e
     * @return {?}
     */
    CalendarFormComponent.prototype.onEditRepeat = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        e.preventDefault();
        e.stopPropagation();
        this.repeatModal.openRepeat(this.event.repeat);
    };
    /**
     * @private
     * @return {?}
     */
    CalendarFormComponent.prototype._clearRepeat = /**
     * @private
     * @return {?}
     */
    function () {
        this.repeatText = '';
        this.formData.repeat = false;
    };
    /**
     * @private
     * @return {?}
     */
    CalendarFormComponent.prototype._updateMyState = /**
     * @private
     * @return {?}
     */
    function () {
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
    };
    /**
     * @return {?}
     */
    CalendarFormComponent.prototype.goBack = /**
     * @return {?}
     */
    function () {
        history.back();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    CalendarFormComponent.prototype.onRemoveEvent = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }
        this.viewDeleteModal.show();
    };
    /**
     * @private
     * @param {?} hourStr
     * @return {?}
     */
    CalendarFormComponent.prototype.getMinutes = /**
     * @private
     * @param {?} hourStr
     * @return {?}
     */
    function (hourStr) {
        /** @type {?} */
        var hours = hourStr.split(':');
        return Number(hours[0]) * 60 + Number(hours[1]);
    };
    CalendarFormComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-calendar-form',
                    template: "<div class=\"admin-layout\">\n    <div class=\"container-fluid nav-fixed-top cp-toolbar\">\n        <button (click)=\"goBack()\" class=\"btn btn-sm btn-primary mr-1 ng-star-inserted\" data-toggle=\"tooltip\" type=\"button\" title=\"Tr\u1EDF v\u1EC1\">\n            <i class=\"fa fa-arrow-left\"></i>\n        </button>\n        <button *ngIf=\"event.isCreator || !event.uuid\" (click)=\"createEvent()\" class=\"btn btn-sm btn-primary ng-star-inserted mr-1\" data-toggle=\"tooltip\" type=\"button\" title=\"L\u01B0u s\u1EF1 ki\u1EC7n\">\n            <i class=\"fa fa-save\"></i>\n        </button>\n        <button *ngIf=\"event.isCreator\" (click)=\"onRemoveEvent($event)\" class=\"btn btn-sm btn-danger ng-star-inserted\" data-toggle=\"tooltip\" type=\"button\" title=\"X\u00F3a s\u1EF1 ki\u1EC7n\">\n            <i class=\"fa fa-trash\"></i>\n        </button>\n    </div>\n    <div class=\"cp-content p-3\">\n        <div class=\"card\" *ngIf=\"eventNotFound\">\n            <div class=\"card-body text-center\">\n                Kh\u00F4ng t\u00ECm th\u1EA5y l\u1ECBch\n            </div>\n        </div>\n        <div [ngClass]=\"{'hide': eventNotFound}\" class=\"row\">\n                <div class=\"col-md-6\">\n                    <div class=\"form-group\">\n                        <label class=\"font-weight-bold\">Ti\u00EAu \u0111\u1EC1 (<span class=\"text-danger\">*</span>):</label>\n                        <input #titleInput type=\"text\" class=\"form-control\"\n                               [(ngModel)]=\"formData.title\"\n                               [ngClass]=\"{'is-invalid': titleInput.value.trim().length === 0}\">\n                    </div>\n                    <div class=\"form-group row\">\n                        <div class=\"col-6\" style=\"padding-right:5px\">\n                            <label class=\"font-weight-bold\">Ng\u00E0y s\u1EF1 ki\u1EC7n (<span class=\"text-danger\">*</span>):</label>\n                            <input type=\"text\" class=\"form-control\"\n                                   [(ngModel)]=\"formData.date\"\n                                   [ngClass]=\"{'is-invalid': formData.date.length === 0}\"\n                                   #dp=\"bsDatepicker\"\n                                   bsDatepicker\n                                   [bsConfig]=\"{dateInputFormat: 'DD/MM/YYYY'}\">\n                        </div>\n                        <div *ngIf=\"!allDay.checked\" class=\"col-3\" style=\"padding-right:5px;padding-left:5px\">\n                            <label class=\"font-weight-bold\">T\u1EEB gi\u1EDD (<span class=\"text-danger\">*</span>):</label>\n                            <input type=\"text\" class=\"form-control\"\n                                   [(ngModel)]=\"formData.startTime\"\n                                   [ngClass]=\"{'is-invalid': (timeError || formData.startTime.length === 0)}\"\n                                   timePicker\n                                   [timePickerModal]=\"timeStartModal\">\n                            <time-picker-modal #timeStartModal></time-picker-modal>\n                        </div>\n                        <div *ngIf=\"!allDay.checked\" class=\"col-3\" style=\"padding-left:5px\">\n                            <label class=\"font-weight-bold\">\u0110\u1EBFn gi\u1EDD (<span class=\"text-danger\">*</span>):</label>\n                            <input type=\"text\" class=\"form-control\"\n                                   [(ngModel)]=\"formData.toTime\"\n                                   [ngClass]=\"{'is-invalid': (timeError || formData.toTime.length === 0)}\"\n                                   timePicker\n                                   [timePickerModal]=\"timeEndModal\">\n                            <time-picker-modal #timeEndModal></time-picker-modal>\n                        </div>\n                    </div>\n                    <div class=\"form-group form-check\">\n                        <input #allDay [(ngModel)]=\"formData._allday\" type=\"checkbox\" id=\"_allday\" class=\"form-check-input\" value=\"true\"/>\n                        <label class=\"form-check-label font-weight-bold\" for=\"_allday\">C\u1EA3 ng\u00E0y</label>\n                    </div>\n                    <div class=\"form-group form-check\">\n                        <input (click)=\"openRepeat(repeat.checked)\"\n                               #repeat\n                               [(ngModel)]=\"formData.repeat\"\n                               class=\"form-check-input\"\n                               id=\"repeat\" type=\"checkbox\" value=\"true\"/>\n                        <label class=\"form-check-label font-weight-bold\" for=\"repeat\">L\u1EB7p l\u1ECBch</label>\n                        <span *ngIf=\"repeatText\">\n                            <b>:</b> {{repeatText}}\n                            <i (click)=\"onEditRepeat($event)\" class=\"fa fa-pencil\" style=\"padding: 5px;margin: -5px 0;cursor: pointer;\" title=\"Ch\u1EC9nh s\u1EEDa\"></i>\n                        </span>\n                    </div>\n                    <div class=\"form-group\">\n                        <button (click)=\"fileAttachment.click()\" title=\"T\u1EADp tin \u0111\u00EDnh k\u00E8m\" type=\"button\" class=\"btn btn-primary btn-sm rounded\">\n                            <i class=\"fa fa-cloud-upload pr-1\" aria-hidden=\"true\"></i>\n                            <span>\u0110\u00EDnh k\u00E8m</span>\n                            <input #fileAttachment type=\"file\" multiple style=\"display:none\">\n                        </button>\n                        <div style=\"margin-top: 10px\">\n                            <calendar-attachment-list\n                                    [calEvent]=\"event\"\n                                    [removable]=\"true\"\n                                    [fileEl]=\"fileAttachment\"></calendar-attachment-list>\n                        </div>\n                    </div>\n                    <div class=\"form-group\">\n                        <label class=\"font-weight-bold\">\u0110\u1ECBa \u0111i\u1EC3m:</label>\n                        <input type=\"text\" class=\"form-control\"\n                               [(ngModel)]=\"formData.location\"\n                               [typeahead]=\"locationSearch\">\n                    </div>\n                    <div class=\"form-group\">\n                        <label class=\"font-weight-bold\">M\u00F4 t\u1EA3:</label>\n                        <textarea (keydown.enter)=\"$event.stopPropagation()\" type=\"text\" class=\"form-control\"\n                                  [(ngModel)]=\"formData.summary\"></textarea>\n                    </div>\n                </div>\n                <div class=\"col-md-6\">\n                    <div [hidden]=\"!event.myAttendee\" class=\"form-group\">\n                        <label class=\"font-weight-bold\">B\u1EA1n c\u00F3 tham d\u1EF1 kh\u00F4ng?</label>\n                        <div class=\"input-group\">\n                            <select [(ngModel)]=\"formData.state\" class=\"attendee-select form-control\" style=\"margin-right:-3px\">\n                                <option value=\"ACCEPTED\">C\u00F3</option>\n                                <option value=\"DECLINED\">Kh\u00F4ng</option>\n                                <option value=\"NEEDS_ACTION\">C\u00F3 th\u1EC3</option>\n                            </select>\n                            <input [(ngModel)]=\"formData.notes\" type=\"text\" class=\"form-control\" placeholder=\"Ghi ch\u00FA\">\n                        </div>\n                    </div>\n                    <div class=\"form-group\">\n                        <label class=\"font-weight-bold\">Th\u00E0nh ph\u1EA7n: </label>\n                        <ng-template #attendeeTemplate let-attendee=\"item\">\n                            <div class=\"attendee-item\">\n                                <img userAvatar [usercode]=\"attendee.username\">\n                                <div>{{attendee.fullname}}</div>\n                            </div>\n                        </ng-template>\n                        <input type=\"text\" class=\"form-control\"\n                               #attendeeInput\n                               [(ngModel)]=\"attendeeModal\"\n                               [typeahead]=\"attendeeSearch\"\n                               [typeaheadItemTemplate]=\"attendeeTemplate\"\n                               (typeaheadOnSelect)=\"addAttendee($event)\"/>\n                    </div>\n                    <div class=\"form-group\">\n                        <calendar-attendee-list [attendees]=\"attendees\" [editable]=\"true\"></calendar-attendee-list>\n                    </div>\n                </div>\n            </div>\n    </div>\n    <calendar-repeat-modal #repeatModal (onRepeat)=\"setRepeatData($event)\"></calendar-repeat-modal>\n</div>\n<calendar-dialog-delete #dialogRemove [calEvent]=\"event\" (onDelete)=\"goBack()\" hidden></calendar-dialog-delete>\n",
                    styles: [".attendee-select{background:#e9ecef;width:90px;padding-right:5px;padding-left:5px;flex:none}.attendee-list-container{overflow:auto;max-height:200px;box-shadow:rgba(0,0,0,.14) 0 8px 10px 1px,rgba(0,0,0,.12) 0 3px 14px 2px,rgba(0,0,0,.2) 0 5px 5px -3px;border-radius:4px;margin-top:5px}.form-check-input{opacity:1!important;margin-top:1px}.attendee-item{display:flex;margin:0 -10px;align-items:center}.attendee-item>img{width:30px;height:30px;border-radius:50%;margin-right:10px}"]
                }] }
    ];
    /** @nocollapse */
    CalendarFormComponent.ctorParameters = function () { return [
        { type: ActivatedRoute },
        { type: CalendarService },
        { type: NotificationService },
        { type: Router },
        { type: HttpClientService }
    ]; };
    CalendarFormComponent.propDecorators = {
        repeatModal: [{ type: ViewChild, args: ['repeatModal',] }],
        viewDeleteModal: [{ type: ViewChild, args: ['dialogRemove',] }],
        titleInput: [{ type: ViewChild, args: ['titleInput',] }],
        attendeeInput: [{ type: ViewChild, args: ['attendeeInput',] }],
        fileList: [{ type: ViewChild, args: [AttachmentListComponent,] }]
    };
    return CalendarFormComponent;
}());
export { CalendarFormComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItZm9ybS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbmV0LWNhbGVuZGFyLyIsInNvdXJjZXMiOlsic3JjL2Zvcm0vY2FsZW5kYXItZm9ybS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBZ0IsU0FBUyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFOUUsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ3BELE9BQU8sRUFBQyw2QkFBNkIsRUFBQyxNQUFNLDBDQUEwQyxDQUFDO0FBQ3ZGLE9BQU8sRUFBQyxjQUFjLEVBQUUsTUFBTSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDdkQsT0FBTyxFQUFDLG1CQUFtQixFQUFFLGlCQUFpQixFQUFDLE1BQU0sV0FBVyxDQUFDO0FBQ2pFLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLDBDQUEwQyxDQUFDO0FBQzlFLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLDhDQUE4QyxDQUFDO0FBR3JGLE9BQU8sS0FBSyxPQUFPLE1BQU0sUUFBUSxDQUFDO0FBQ2xDLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUNqRCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFDL0QsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDaEMsT0FBTyxFQUFDLFlBQVksRUFBRSxvQkFBb0IsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRWxFLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQzs7SUFDekMsTUFBTSxHQUFHLE9BQU87QUFHdEI7SUFpQ0ksK0JBQW9CLEtBQXFCLEVBQ3JCLGVBQWdDLEVBQ2hDLE1BQTJCLEVBQzNCLE1BQWMsRUFDZCxJ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SnZDLCtDQVFtRDs7SUFXbkQsK0NBT21EOzs7OztJQTdLdkMsc0NBQTZCOzs7OztJQUM3QixnREFBd0M7Ozs7O0lBQ3hDLHVDQUFtQzs7Ozs7SUFDbkMsdUNBQXNCOzs7OztJQUN0QixxQ0FBK0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0FmdGVyVmlld0luaXQsIENvbXBvbmVudCwgRWxlbWVudFJlZiwgVmlld0NoaWxkfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Rm9ybUNvbnRyb2wsIEZvcm1Hcm91cCwgVmFsaWRhdG9yc30gZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XG5pbXBvcnQge0NhbGVuZGFyU2VydmljZX0gZnJvbSBcIi4uL2NhbGVuZGFyLnNlcnZpY2VcIjtcbmltcG9ydCB7Q2FsZW5kYXJEaWFsb2dSZXBlYXRDb21wb25lbnR9IGZyb20gXCIuLi9kaWFsb2ctcmVwZWF0L2RpYWxvZy1yZXBlYXQuY29tcG9uZW50XCI7XG5pbXBvcnQge0FjdGl2YXRlZFJvdXRlLCBSb3V0ZXJ9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7Tm90aWZpY2F0aW9uU2VydmljZSwgSHR0cENsaWVudFNlcnZpY2V9IGZyb20gJ2luZXQtY29yZSc7XG5pbXBvcnQge0NhbGVuZGFyRGlhbG9nRGVsZXRlfSBmcm9tIFwiLi4vZGlhbG9nLWRlbGV0ZS9kaWFsb2ctZGVsZXRlLmNvbXBvbmVudFwiO1xuaW1wb3J0IHtBdHRhY2htZW50TGlzdENvbXBvbmVudH0gZnJvbSBcIi4uL2F0dGFjaG1lbnQtbGlzdC9hdHRhY2htZW50LWxpc3QuY29tcG9uZW50XCI7XG5pbXBvcnQge0NhbEV2ZW50LCBDYWxSZXBlYXR9IGZyb20gXCIuLi91dGlscy9tb2RlbC9DYWxFdmVudFwiO1xuaW1wb3J0IHtDYWxBdHRlbmRlZX0gZnJvbSBcIi4uL3V0aWxzL21vZGVsL0NhbEF0dGVuZGVlXCI7XG5pbXBvcnQgKiBhcyBtb21lbnRfIGZyb20gJ21vbWVudCc7XG5pbXBvcnQge3ZuVG9MYXRpbn0gZnJvbSBcIi4uL3V0aWxzL2NvbW1vbi9BY2NlbnRcIjtcbmltcG9ydCB7Q2FsQXR0ZW5kZWVUeXBlfSBmcm9tIFwiLi4vdXRpbHMvbW9kZWwvQ2FsQXR0ZW5kZWVUeXBlXCI7XG5pbXBvcnQge3hDYWxlbmRhcn0gZnJvbSBcIi4uL3V0aWxzL3hDYWxlbmRhclwiO1xuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tIFwicnhqc1wiO1xuaW1wb3J0IHtkZWJvdW5jZVRpbWUsIGRpc3RpbmN0VW50aWxDaGFuZ2VkfSBmcm9tIFwicnhqcy9vcGVyYXRvcnNcIjtcbmltcG9ydCB7VHlwZWFoZWFkTWF0Y2h9IGZyb20gXCJuZ3gtYm9vdHN0cmFwXCI7XG5pbXBvcnQge0NhbGVuZGFyVXRpbHN9IGZyb20gXCIuLi9DYWxlbmRhclV0aWxzXCI7XG5jb25zdCBtb21lbnQgPSBtb21lbnRfO1xuZGVjbGFyZSBsZXQgaU5ldDogYW55O1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2FwcC1jYWxlbmRhci1mb3JtJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vY2FsZW5kYXItZm9ybS5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbXG4gICAgICAgICcuL2NhbGVuZGFyLWZvcm0uY29tcG9uZW50LmNzcydcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIENhbGVuZGFyRm9ybUNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuICAgIEBWaWV3Q2hpbGQoJ3JlcGVhdE1vZGFsJykgcmVwZWF0TW9kYWw6IENhbGVuZGFyRGlhbG9nUmVwZWF0Q29tcG9uZW50O1xuICAgIEBWaWV3Q2hpbGQoJ2RpYWxvZ1JlbW92ZScpIHZpZXdEZWxldGVNb2RhbDogQ2FsZW5kYXJEaWFsb2dEZWxldGU7XG4gICAgQFZpZXdDaGlsZCgndGl0bGVJbnB1dCcpIHRpdGxlSW5wdXQ6IEVsZW1lbnRSZWY7XG4gICAgQFZpZXdDaGlsZCgnYXR0ZW5kZWVJbnB1dCcpIGF0dGVuZGVlSW5wdXQ6IEVsZW1lbnRSZWY7XG4gICAgQFZpZXdDaGlsZChBdHRhY2htZW50TGlzdENvbXBvbmVudCkgZmlsZUxpc3Q6IEF0dGFjaG1lbnRMaXN0Q29tcG9uZW50O1xuICAgIGV2ZW50OiBDYWxFdmVudCA9IHt9O1xuICAgIHJlcGVhdFRleHQ6IHN0cmluZztcbiAgICBldmVudE5vdEZvdW5kOiBib29sZWFuO1xuICAgIHRpbWVFcnJvcjogYm9vbGVhbjtcbiAgICBhdHRlbmRlZU1vZGFsOiBhbnk7XG4gICAgZm9ybURhdGEgPSB7XG4gICAgICAgIHRpdGxlOiAnJyxcbiAgICAgICAgZGF0ZTogJycsXG4gICAgICAgIHN0YXJ0VGltZTogJycsXG4gICAgICAgIHRvVGltZTogJycsXG4gICAgICAgIGxvY2F0aW9uOiAnJyxcbiAgICAgICAgc3VtbWFyeTogJycsXG4gICAgICAgIHN0YXRlOiAnJyxcbiAgICAgICAgbm90ZXM6ICcnLFxuICAgICAgICByZXBlYXQ6IGZhbHNlLFxuICAgICAgICBfYWxsZGF5OiAnJ1xuICAgIH07XG4gICAgYXR0ZW5kZWVzOiBDYWxBdHRlbmRlZVtdID0gW107XG4gICAgcHJpdmF0ZSBfYXR0ZW5kZWVzOiBDYWxBdHRlbmRlZVtdID0gW107XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIGNhbGVuZGFyU2VydmljZTogQ2FsZW5kYXJTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgbm90aWZ5OiBOb3RpZmljYXRpb25TZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50U2VydmljZSkge1xuICAgICAgICB0aGlzLmNhbGVuZGFyU2VydmljZS5yZWFkeSgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgcGFyYW1zID0gdGhpcy5yb3V0ZS5zbmFwc2hvdC5wYXJhbU1hcDtcbiAgICAgICAgICAgIGlmIChwYXJhbXMuZ2V0KCdpZCcpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYWxlbmRhclNlcnZpY2UubG9hZEV2ZW50KHtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudDogcGFyYW1zLmdldCgnaWQnKVxuICAgICAgICAgICAgICAgIH0sIChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmV2ZW50Tm90Rm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXZlbnQgPSBldmVudDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdHRlbmRlZXMgPSBldmVudC5hdHRlbmRlZXM7XG4gICAgICAgICAgICAgICAgICAgIGlmKGV2ZW50Lm1lbWJlcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXZlbnQubXlBdHRlbmRlZSA9IGV2ZW50Lm1lbWJlcnMuZmluZChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS5yb2xlICE9PSAnQ1JFQVRPUicgJiYgaXRlbS51c2VybmFtZSA9PT0gaU5ldC51c2VybmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2luaXRGb3JtKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxldCBldmVudDtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBldmVudCA9IEpTT04ucGFyc2UoYXRvYihwYXJhbXMuZ2V0KCdkYXRhJykpKTtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQuc3RhcnQgPSBuZXcgRGF0ZShldmVudC5zdGFydCk7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LmVuZCA9IG5ldyBEYXRlKGV2ZW50LmVuZCk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICBldmVudCA9IHt9O1xuICAgICAgICAgICAgICAgICAgICBldmVudC5zdGFydCA9IG5ldyBEYXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnN0YXJ0LnNldEhvdXJzKGV2ZW50LnN0YXJ0LmdldEhvdXJzKCkgKyAxLCAwLCAwLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQuZW5kID0gbmV3IERhdGUoZXZlbnQuc3RhcnQuZ2V0VGltZSgpICsgNjAgKiA2MCAqIDEwMDApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmV2ZW50ID0gZXZlbnQ7XG4gICAgICAgICAgICAgICAgdGhpcy5faW5pdEZvcm0oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuY2FsZW5kYXJTZXJ2aWNlLmxvYWRBdHRlbmRlZXMoKGF0dGVuZGVlcykgPT4gdGhpcy5fYXR0ZW5kZWVzID0gYXR0ZW5kZWVzKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudGl0bGVJbnB1dC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaW5pdEZvcm0oKSB7XG4gICAgICAgIGxldCB2YWx1ZXMgPSB7XG4gICAgICAgICAgICB0aXRsZTogdGhpcy5ldmVudC5zdWJqZWN0IHx8ICcnLFxuICAgICAgICAgICAgZGF0ZTogdGhpcy5ldmVudC5zdGFydCxcbiAgICAgICAgICAgIHN0YXJ0VGltZTogbW9tZW50KHRoaXMuZXZlbnQuc3RhcnQpLmZvcm1hdCgnSEg6bW0nKSxcbiAgICAgICAgICAgIHRvVGltZTogbW9tZW50KHRoaXMuZXZlbnQuZW5kKS5mb3JtYXQoJ0hIOm1tJyksXG4gICAgICAgICAgICBsb2NhdGlvbjogdGhpcy5ldmVudC5sb2NhdGlvbiB8fCAnJyxcbiAgICAgICAgICAgIHN1bW1hcnk6IHRoaXMuZXZlbnQuc3VtbWFyeSB8fCAnJyxcbiAgICAgICAgICAgIF9hbGxkYXk6IHRoaXMuZXZlbnQuYXR0cmlidXRlICYmIHRoaXMuZXZlbnQuYXR0cmlidXRlWydhbGxkYXknXSA9PT0gJ3RydWUnIHx8IGZhbHNlLFxuICAgICAgICAgICAgc3RhdGU6ICdORUVEU19BQ1RJT04nLFxuICAgICAgICAgICAgbm90ZXM6ICcnLFxuICAgICAgICAgICAgcmVwZWF0OiBmYWxzZSxcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHRoaXMuZXZlbnQubXlBdHRlbmRlZSkge1xuICAgICAgICAgICAgdmFsdWVzLnN0YXRlID0gdGhpcy5ldmVudC5teUF0dGVuZGVlLnN0YXRlO1xuICAgICAgICAgICAgdmFsdWVzLm5vdGVzID0gdGhpcy5ldmVudC5teUF0dGVuZGVlLm5vdGVzIHx8ICcnO1xuICAgICAgICB9XG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5mb3JtRGF0YSwgdmFsdWVzKTtcbiAgICAgICAgaWYgKHRoaXMuZXZlbnQucmVwZWF0KSB7XG4gICAgICAgICAgICB0aGlzLnNldFJlcGVhdERhdGEodGhpcy5ldmVudC5yZXBlYXQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY3JlYXRlRXZlbnQoKSB7XG4gICAgICAgIGxldCBkYXRhID0gdGhpcy5fZ2V0Rm9ybURhdGEoKTtcbiAgICAgICAgaWYgKCFkYXRhKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5odHRwLnNob3dMb2FkaW5nKCfEkGFuZyB44butIGzDvS4uLicpO1xuICAgICAgICBpZiAoZGF0YS5lbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLmNhbGVuZGFyU2VydmljZS51cGRhdGVFdmVudChkYXRhLCAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX29uU3VjY2VzcygpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZ5LnNob3dNZXNzYWdlKCdD4bqtcCBuaOG6rXQgbOG7i2NoIGtow7RuZyB0aMOgbmggY8O0bmcnLCAnZXJyb3InKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZU15U3RhdGUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY2FsZW5kYXJTZXJ2aWNlLmNyZWF0ZUV2ZW50KGRhdGEsIChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fb25TdWNjZXNzKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZnkuc2hvd01lc3NhZ2UoJ1ThuqFvIGzhu4tjaCBraMO0bmcgdGjDoG5oIGPDtG5nJywgJ2Vycm9yJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9vblN1Y2Nlc3MoKSB7XG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL2NhbGVuZGFyJ10pO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2dldEZvcm1EYXRhKCkge1xuICAgICAgICBpZiAoIXRoaXMuX3ZhbGlkYXRlKCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgZGF0YSA9IHRoaXMuZm9ybURhdGE7XG4gICAgICAgIGxldCBwYXJhbXM6IGFueSA9IHtcbiAgICAgICAgICAgIHN1YmplY3Q6IGRhdGEudGl0bGUsXG4gICAgICAgICAgICBzdW1tYXJ5OiBkYXRhLnN1bW1hcnksXG4gICAgICAgICAgICBsb2NhdGlvbjogZGF0YS5sb2NhdGlvbixcbiAgICAgICAgICAgIHN0YXJ0VGltZTogdGhpcy5nZXRNaW51dGVzKGRhdGEuX2FsbGRheSA/ICcwMDowMCcgOiBkYXRhLnN0YXJ0VGltZSksXG4gICAgICAgICAgICB0b1RpbWU6IHRoaXMuZ2V0TWludXRlcyhkYXRhLl9hbGxkYXkgPyAnMjM6NTknIDogZGF0YS50b1RpbWUpLFxuICAgICAgICAgICAgX2FsbGRheTogZGF0YS5fYWxsZGF5XG4gICAgICAgIH07XG4gICAgICAgIGxldCBkYXRlID0gbW9tZW50KGRhdGEuZGF0ZSk7XG4gICAgICAgIHBhcmFtcy5kYXkgPSBkYXRlLmRheU9mWWVhcigpO1xuICAgICAgICBwYXJhbXMueWVhciA9IGRhdGUueWVhcigpO1xuICAgICAgICBpZiAodGhpcy5ldmVudC51dWlkKSB7XG4gICAgICAgICAgICBwYXJhbXMuZWxlbWVudCA9IHRoaXMuZXZlbnQudXVpZDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS5yZXBlYXQgJiYgdGhpcy5ldmVudC5yZXBlYXQpIHtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24ocGFyYW1zLCB0aGlzLmV2ZW50LnJlcGVhdCk7XG4gICAgICAgICAgICBpZihwYXJhbXMud2tkYXlzKXtcbiAgICAgICAgICAgICAgICBwYXJhbXMud2tkYXlzID0gcGFyYW1zLndrZGF5cy5qb2luKCcsJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5maWxlTGlzdC5maWxlcy5mb3JFYWNoKChmaWxlLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgaWYgKCFmaWxlLmlkKSB7XG4gICAgICAgICAgICAgICAgcGFyYW1zWydmaWxlJyArIGluZGV4XSA9IGZpbGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAocGFyYW1zLmxvY2F0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLmNhbGVuZGFyU2VydmljZS5zYXZlTG9jYXRpb24ocGFyYW1zLmxvY2F0aW9uLCAoKSA9PiB7fSk7XG4gICAgICAgIH1cbiAgICAgICAgcGFyYW1zLmF0dGVuZGVlID0gdGhpcy5hdHRlbmRlZXM7XG4gICAgICAgIHhDYWxlbmRhci5tb2RpZnlEYXRhVXBkYXRlKHBhcmFtcywgdGhpcy5ldmVudCk7XG4gICAgICAgIHJldHVybiBwYXJhbXM7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaGFzQXR0ZW5kZWUoYXR0ZW5kZWU6IENhbEF0dGVuZGVlKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5hdHRlbmRlZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmF0dGVuZGVlc1tpXS51c2VybmFtZSA9PT0gYXR0ZW5kZWUudXNlcm5hbWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgYXR0ZW5kZWVTZWFyY2ggPSBuZXcgT2JzZXJ2YWJsZShzdWJzY3JpYmVyID0+IHtcbiAgICAgICAgbGV0IHZhbHVlID0gdGhpcy5hdHRlbmRlZU1vZGFsLnRyaW0oKTtcbiAgICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KFtdKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YWx1ZSA9IHZuVG9MYXRpbih2YWx1ZSk7XG4gICAgICAgIHN1YnNjcmliZXIubmV4dCh0aGlzLl9hdHRlbmRlZXMuZmlsdGVyKChpdGVtKSA9PiBpdGVtWydfaW5kZXgnXS5pbmRleE9mKHZhbHVlKSA+IC0xKS5zbGljZSgwLCAxMCkpO1xuICAgIH0pLnBpcGUoZGVib3VuY2VUaW1lKDIwMCksIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpO1xuXG4gICAgYWRkQXR0ZW5kZWUoZTogVHlwZWFoZWFkTWF0Y2gpIHtcbiAgICAgICAgbGV0IGF0dGVuZGVlID0gZS5pdGVtO1xuICAgICAgICB0aGlzLmF0dGVuZGVlTW9kYWwgPSAnJztcbiAgICAgICAgaWYgKCF0aGlzLl9oYXNBdHRlbmRlZShhdHRlbmRlZSkpIHtcbiAgICAgICAgICAgIGF0dGVuZGVlLnR5cGUgPSBDYWxBdHRlbmRlZVR5cGUuVVNFUjtcbiAgICAgICAgICAgIHRoaXMuYXR0ZW5kZWVzLnB1c2goYXR0ZW5kZWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbG9jYXRpb25TZWFyY2ggPSBuZXcgT2JzZXJ2YWJsZShzdWJzY3JpYmVyID0+IHtcbiAgICAgICAgbGV0IHZhbHVlID0gdGhpcy5mb3JtRGF0YS5sb2NhdGlvbjtcbiAgICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KFtdKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNhbGVuZGFyU2VydmljZS5zZWFyY2hMb2NhdGlvbih2YWx1ZSwgKGl0ZW1zKSA9PiBzdWJzY3JpYmVyLm5leHQoaXRlbXMubWFwKGl0ZW0gPT4gaXRlbS5jb250ZW50KSkpO1xuICAgIH0pLnBpcGUoZGVib3VuY2VUaW1lKDIwMCksIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpO1xuXG4gICAgcHJpdmF0ZSBfdmFsaWRhdGUoKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICghdGhpcy5mb3JtRGF0YS50aXRsZS50cmltKCkgfHwgIXRoaXMuZm9ybURhdGEuZGF0ZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5mb3JtRGF0YS5fYWxsZGF5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5nZXRNaW51dGVzKHRoaXMuZm9ybURhdGEuc3RhcnRUaW1lKSA+PSB0aGlzLmdldE1pbnV0ZXModGhpcy5mb3JtRGF0YS50b1RpbWUpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50aW1lRXJyb3IgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRpbWVFcnJvciA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBzZXRSZXBlYXREYXRhKGRhdGE6IENhbFJlcGVhdCkge1xuICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICAgIHRoaXMuX2NsZWFyUmVwZWF0KCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5ldmVudC5yZXBlYXQgPSBkYXRhO1xuICAgICAgICB0aGlzLnJlcGVhdFRleHQgPSBDYWxlbmRhclV0aWxzLmdldFJlcGVhdFRleHQoZGF0YSk7XG4gICAgICAgIHRoaXMuZm9ybURhdGEucmVwZWF0ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBvcGVuUmVwZWF0KGNoZWNrZWQ6IGJvb2xlYW4pIHtcbiAgICAgICAgaWYgKGNoZWNrZWQpIHtcbiAgICAgICAgICAgIHRoaXMucmVwZWF0TW9kYWwub3BlblJlcGVhdCh7XG4gICAgICAgICAgICAgICAgbHN0YXJ0OiB0aGlzLmV2ZW50LmxzdGFydFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fY2xlYXJSZXBlYXQoKTtcbiAgICB9XG5cbiAgICBvbkVkaXRSZXBlYXQoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHRoaXMucmVwZWF0TW9kYWwub3BlblJlcGVhdCh0aGlzLmV2ZW50LnJlcGVhdCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfY2xlYXJSZXBlYXQoKSB7XG4gICAgICAgIHRoaXMucmVwZWF0VGV4dCA9ICcnO1xuICAgICAgICB0aGlzLmZvcm1EYXRhLnJlcGVhdCA9IGZhbHNlO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3VwZGF0ZU15U3RhdGUoKSB7XG4gICAgICAgIGlmICghdGhpcy5ldmVudC5teUF0dGVuZGVlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jYWxlbmRhclNlcnZpY2UubG9hZEV2ZW50KHtcbiAgICAgICAgICAgIHN0YXRlOiB0aGlzLmZvcm1EYXRhLnN0YXRlLFxuICAgICAgICAgICAgbm90ZXM6IHRoaXMuZm9ybURhdGEubm90ZXMsXG4gICAgICAgICAgICBlbGVtZW50OiB0aGlzLmV2ZW50LnV1aWRcbiAgICAgICAgfSwgZnVuY3Rpb24gKCkge30pO1xuICAgIH1cblxuICAgIGdvQmFjaygpIHtcbiAgICAgICAgaGlzdG9yeS5iYWNrKCk7XG4gICAgfVxuXG4gICAgb25SZW1vdmVFdmVudChldmVudCl7XG4gICAgICAgIGlmIChldmVudCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudmlld0RlbGV0ZU1vZGFsLnNob3coKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldE1pbnV0ZXMoaG91clN0cjogc3RyaW5nKTogbnVtYmVyIHtcbiAgICAgICAgbGV0IGhvdXJzID0gaG91clN0ci5zcGxpdCgnOicpO1xuICAgICAgICByZXR1cm4gTnVtYmVyKGhvdXJzWzBdKSAqIDYwICsgTnVtYmVyKGhvdXJzWzFdKTtcbiAgICB9XG59Il19