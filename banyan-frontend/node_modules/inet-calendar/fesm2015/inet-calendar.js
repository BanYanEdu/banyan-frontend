import { EventEmitter, Component, Input, Output, ViewChild, Injectable, ComponentFactoryResolver, Injector, ApplicationRef, IterableDiffers, NgModule, Pipe, ElementRef, forwardRef, Directive, HostListener } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, NavigationEnd, ActivatedRoute, RouterModule } from '@angular/router';
import { HtmlUtils, SuggestionService, ResourceLoaderService, NotificationService, HttpClientService, CoreModule } from 'inet-core';
import * as moment_ from 'moment';
import { ModalDirective, BsModalService, TimepickerModule, BsDatepickerModule, ModalModule, TypeaheadModule } from 'ngx-bootstrap';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// Convert vietnamese to latin
/** @type {?} */
var accents_arr = [
    "à", "á", "ạ", "ả", "ã", "â", "ầ", "ấ", "ậ", "ẩ", "ẫ", "ă",
    "ằ", "ắ", "ặ", "ẳ", "ẵ", "è", "é", "ẹ", "ẻ", "ẽ", "ê", "ề",
    "ế", "ệ", "ể", "ễ",
    "ì", "í", "ị", "ỉ", "ĩ",
    "ò", "ó", "ọ", "ỏ", "õ", "ô", "ồ", "ố", "ộ", "ổ", "ỗ", "ơ",
    "ờ", "ớ", "ợ", "ở", "ỡ",
    "ù", "ú", "ụ", "ủ", "ũ", "ư", "ừ", "ứ", "ự", "ử", "ữ",
    "ỳ", "ý", "ỵ", "ỷ", "ỹ",
    "đ",
    "À", "Á", "Ạ", "Ả", "Ã", "Â", "Ầ", "Ấ", "Ậ", "Ẩ", "Ẫ", "Ă",
    "Ằ", "Ắ", "Ặ", "Ẳ", "Ẵ",
    "È", "É", "Ẹ", "Ẻ", "Ẽ", "Ê", "Ề", "Ế", "Ệ", "Ể", "Ễ",
    "Ì", "Í", "Ị", "Ỉ", "Ĩ",
    "Ò", "Ó", "Ọ", "Ỏ", "Õ", "Ô", "Ồ", "Ố", "Ộ", "Ổ", "Ỗ", "Ơ",
    "Ờ", "Ớ", "Ợ", "Ở", "Ỡ",
    "Ù", "Ú", "Ụ", "Ủ", "Ũ", "Ư", "Ừ", "Ứ", "Ự", "Ử", "Ữ",
    "Ỳ", "Ý", "Ỵ", "Ỷ", "Ỹ",
    "Đ"
];
/** @type {?} */
var no_accents_arr = [
    "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a",
    "a", "a", "a", "a", "a", "a",
    "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e",
    "i", "i", "i", "i", "i",
    "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o",
    "o", "o", "o", "o", "o",
    "u", "u", "u", "u", "u", "u", "u", "u", "u", "u", "u",
    "y", "y", "y", "y", "y",
    "d",
    "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A",
    "A", "A", "A", "A", "A",
    "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E",
    "I", "I", "I", "I", "I",
    "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O",
    "O", "O", "O", "O", "O",
    "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U",
    "Y", "Y", "Y", "Y", "Y",
    "D"
];
/** @type {?} */
let vnToLatin = (/**
 * @param {?} str
 * @return {?}
 */
(str) => {
    return str.replace(/[^\u0000-\u007E]/g, (/**
     * @param {?} a
     * @return {?}
     */
    function (a) {
        /** @type {?} */
        let index = accents_arr.indexOf(a);
        return index < 0 ? a : no_accents_arr[index];
    }));
});

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
let DateUtils = {
    firstDay: 1,
    /**
     * @param {?} date
     * @param {?=} firstDay
     * @return {?}
     */
    getWeekRange(date, firstDay) {
        /** @type {?} */
        let startDate = this.getDateStartWeek(date, firstDay);
        /** @type {?} */
        let endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + 6);
        return {
            startWeek: startDate,
            endWeek: endDate
        };
    },
    /**
     * @param {?} date
     * @param {?=} firstDay
     * @return {?}
     */
    getDayIndexOnWeek(date, firstDay) {
        // Default start date on monday
        if (firstDay === undefined || firstDay < 0) {
            firstDay = this.firstDay;
        }
        if (date.getDay() < firstDay) {
            return 7 - date.getDay() - firstDay;
        }
        else {
            return date.getDay() - firstDay;
        }
    },
    /**
     * @param {?} date
     * @param {?=} firstDay
     * @return {?}
     */
    getDateStartWeek(date, firstDay) {
        /** @type {?} */
        let distance = this.getDayIndexOnWeek(date, firstDay);
        date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        date.setDate(date.getDate() - distance);
        return date;
    },
    /**
     * @param {?} date
     * @param {?=} firstDay
     * @return {?}
     */
    getDateEndWeek(date, firstDay) {
        /** @type {?} */
        let endDate = this.getDateStartWeek(date, firstDay);
        endDate.setDate(endDate.getDate() + 6);
        return endDate;
    },
    /**
     * @param {?} date
     * @return {?}
     */
    dayOfYear(date) {
        /** @type {?} */
        let jan = new Date(date.getFullYear(), 0, 1);
        jan.setTime(jan.getTime() - 1);
        return Math.ceil((date.getTime() - jan.getTime()) / 86400000);
    },
    /**
     * @param {?} date
     * @param {?=} firstDay
     * @return {?}
     */
    getWeek(date, firstDay) {
        /** @type {?} */
        let startYear = new Date(date.getFullYear(), 0, 1);
        /** @type {?} */
        let startWeek = this.getDateStartWeek(date, firstDay);
        /** @type {?} */
        let dayInYear = this.dayOfYear(startWeek);
        return Math.ceil(dayInYear / 7);
    },
    /**
     * @param {?} w
     * @param {?} y
     * @return {?}
     */
    getDateFromWeek(w, y) {
        /** @type {?} */
        let d = (1 + (w - 1) * 7);
        return new Date(y, 0, d);
    },
    /**
     * @param {?} date
     * @return {?}
     */
    dateIsToday(date) {
        /** @type {?} */
        let now = new Date();
        /** @type {?} */
        let compareDate = new Date(date);
        now.setHours(0, 0, 0, 0);
        compareDate.setHours(0, 0, 0, 0);
        return now.getTime() === compareDate.getTime();
    },
    /**
     * @param {?} date
     * @return {?}
     */
    weekIsToday(date) {
        return this.getWeek(date) === this.getWeek(new Date());
    },
    /**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    isSameWeek(a, b) {
        return this.getWeek(a) === this.getWeek(b);
    }
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
let AjaxAPI = {
    /**
     * @param {?} url
     * @param {?=} domain
     * @param {?=} firmPrefix
     * @return {?}
     */
    getUrl(url, domain, firmPrefix) {
        if (url.indexOf('://') > -1)
            return url;
        domain = domain || iNet.getUrl('{0}');
        url = domain.replace('{0}', url);
        // Change firm prefix
        if (firmPrefix) {
            /** @type {?} */
            let urls = url.split('/');
            urls[4] = firmPrefix;
            url = urls.join('/');
        }
        return url;
    },
    // Get url by subfirm
    /**
     * @param {?} url
     * @param {?=} domain
     * @param {?=} firmPrefix
     * @return {?}
     */
    getPUrl(url, domain, firmPrefix) {
        return this.getUrl(url, domain, firmPrefix || iNet.firmPrefix);
    },
    // Send request
    /**
     * @param {?} options
     * @return {?}
     */
    sendRequest(options) {
        return $.ajax(options);
    },
    // Post ajax by FormData
    /**
     * @param {?} options
     * @return {?}
     */
    postForm(options) {
        options = $.extend({}, options, {
            type: 'post',
            cache: false,
            contentType: false,
            processData: false
        });
        // build form data
        if (options.data && options.data.toString().indexOf('FormData') < 0) {
            /** @type {?} */
            let form = new FormData();
            for (let k in options.data) {
                form.append(k, options.data[k]);
            }
            options.data = form;
        }
        return this.sendRequest(options);
    }
};
// Detect on mobile
if (window['eNet']) {
    AjaxAPI.sendRequest = window['eNet'].ajaxSecure;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {string} */
const CalAttendeeType = {
    ALIAS: 'alias',
    ORGAN: 'org',
    USER: 'user',
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
let CalConfigs = [
    {
        name: 'DATE_TIME_FORMAT',
        value: 'DD/MM/YYYY HH:mm',
        description: 'Định dạng hiển thị ngày và thời gian'
    },
    {
        name: 'DATE_FORMAT',
        value: 'DD/MM/YYYY',
        description: 'Định dạng hiển thị ngày'
    },
    {
        name: 'TIME_FORMAT',
        value: 'HH:mm',
        description: 'Định dạng hiển thị thời gian'
    },
    {
        name: 'TIME_NEW_UPDATE',
        value: '12',
        description: 'Thời gian hiển thị lịch mới cập nhật: giờ'
    },
    {
        name: 'NOTE_LAST_UPDATE',
        value: true,
        description: 'Hiển thị thời gian sửa đổi cuối cùng: true | false'
    },
    {
        name: 'EVENT_BETWEEN_UNIT',
        value: true,
        description: 'Lịch giữa các đơn vị: true | false'
    },
    {
        name: 'PUBLISH_VIEW',
        value: 'date',
        description: '[Trang ban hành] Chế độ hiển thị mặc định: week | date'
    },
    {
        name: 'TV_VIEW',
        value: 'date',
        description: '[Trang tivi] Chế độ hiển thị: week | date'
    },
    {
        name: 'TV_TRANS_VELOCITY',
        value: '30',
        description: '[Trang tivi] Tốc độ chạy của lịch trên mỗi pixcel - millisecond'
    },
    {
        name: 'EMBED_VIEW',
        value: 'date',
        description: '[Trang nhúng] Chế độ hiển thị mặc định: week | date'
    },
    {
        name: 'EMBED_VIEW_PAST',
        value: true,
        description: '[Trang nhúng] Hiển thị những lịch đã diễn ra: true | false'
    },
    {
        name: 'PERSON_VIEW',
        value: 'listWeek',
        description: '[Trang lịch] Chế độ hiển thị mặc định: agendaWeek | agendaDay | listWeek'
    },
    {
        name: 'PERSON_CREATE_TYPE',
        value: 'COMMUNITY',
        description: '[Trang lịch] Loại lịch mặc định khi tạo: COMMUNITY (cộng đồng) | ORGANIZATION (nội bộ)'
    },
    {
        name: 'INVITATION_SUPPORT',
        value: true,
        description: 'Hỗ trợ thư mời hợp'
    },
    // Department
    {
        name: 'DEPARTMENT_VIEW_OTHER',
        value: true,
        description: 'Xem lịch của phòng ban khác: true'
    },
    {
        name: 'DEPARTMENT_APPROVE_OTHER',
        value: false,
        description: 'Duyệt lịch của phòng ban khác: false'
    },
    {
        name: 'CAR_TYPE_CREATE',
        value: 'COMMUNITY',
        description: 'Loại lịch mặc định khi tạo lịch xe: COMMUNITY | ORGANIZATION'
    },
    {
        name: 'CALENDAR_INCLUDE_CAR',
        value: 'false',
        description: 'Hiển thị lịch bao gồm lich xe'
    },
    {
        name: 'EDIT_EVENT_PAST',
        value: false,
        description: 'Cho phép cập nhật nội dung lịch đã diễn ra: false'
    },
    {
        name: 'PERSONAL_CAN_PUBLISH',
        value: false,
        description: '[Lịch cá nhân] Cho phép ban hành: false'
    },
    {
        name: 'PEOPLE_EVENT_ENABLE',
        value: false,
        description: 'Cho phép tạo lịch tiếp dân'
    },
    {
        name: 'PERSONAL_EVENT_ENABLE',
        value: false,
        description: 'Cho phép tạo lịch cá nhân'
    },
    {
        name: 'CAR_EVENT_ENABLE',
        value: false,
        description: 'Cho phép tạo lịch xe'
    },
    {
        name: 'ATTENDEE_DISPLAY_MAX_LENGTH',
        value: '0',
        description: 'Độ dài hiển thị tối đa của thành phần'
    },
    {
        name: 'VIEW_BY_LEADER',
        value: true,
        description: 'Xem lịch theo danh sách lãnh đạo'
    },
    {
        name: 'MOBILE_VIEW_BY_LEADER',
        value: false,
        description: '[Mobile] Mặc định xem lịch theo danh sách lãnh đạo'
    },
    {
        name: 'MOBILE_VIEW_BY_LEADER_ENABLE',
        value: false,
        description: '[Mobile] Xem lịch theo danh sách lãnh đạo'
    },
    {
        name: 'PUBLISH_EVENT_AFTER_CREATE',
        value: false,
        description: 'Ban hành lịch sau khi tạo'
    },
    {
        name: 'CHECK_DUPLICATE_BEFORE_PUBLISH',
        value: false,
        description: 'Kiểm tra lịch trùng trước khi ban hành'
    },
    {
        name: 'SUBJECT_DISPLAY_MAX_LENGTH',
        value: '0',
        description: 'Độ dài hiển thị tối đa của nội dung lịch'
    },
    {
        name: 'PREFIX_ATTENDEE_NAME',
        value: '',
        description: 'Tiền tố hiển thị trước tên người dùng khi tạo lịch'
    },
    {
        name: 'WORK_TIME_START',
        value: '7:00',
        description: 'Thời gian bắt đầu làm việc'
    },
    {
        name: 'WORK_TIME_END',
        value: '17:00',
        description: 'Thời gian kết thúc làm việc'
    },
    {
        name: 'NOTIFY_TO_ATTENDEE_ENABLE',
        value: 'false',
        description: 'Cho phép người duyệt lịch gửi thông báo nhắc nhở cho người nhận'
    },
];
/**
 * @record
 */
function CalConfigItem() { }
if (false) {
    /** @type {?} */
    CalConfigItem.prototype.name;
    /** @type {?} */
    CalConfigItem.prototype.value;
    /** @type {?|undefined} */
    CalConfigItem.prototype.description;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {string} */
const CalType = {
    COMMUNITY: 'COMMUNITY',
    ORGANIZATION: 'ORGANIZATION',
    DEPARTMENT: 'DEPARTMENT',
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {string} */
const CalCategory = {
    IMPORTANT: "IMPORTANT",
    CAR: "CAR",
    INVITATION: "INVITATION",
    PERSONAL: "PERSONAL",
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {string} */
const CalCategoryIcon = {
    PERSONAL: "fa fa-user",
    IMPORTANT: "fa fa-star",
    CAR: "fa fa-car",
    INVITATION: "fa fa-envelope",
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {string} */
const CalAttendeeRole = {
    PREPARER: 'PREPARER',
    OBSERVER: 'OBSERVER',
    CHAIRMAN: 'CHAIRMAN',
    MEMBER: 'MEMBER',
    CREATOR: 'CREATOR',
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {string} */
const CalSubType = {
    MEET_PEOPLE: "COMMUNITY;MEET_PEOPLE",
    PERSONAL: "ORGANIZATION;PERSONAL",
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {number} */
const CalMode = {
    CREATE: 0,
    PUBLISH: 1,
    SENT: 2,
    CANCEL: 3,
    VERIFY: 4,
    OTHER: 5,
};
CalMode[CalMode.CREATE] = 'CREATE';
CalMode[CalMode.PUBLISH] = 'PUBLISH';
CalMode[CalMode.SENT] = 'SENT';
CalMode[CalMode.CANCEL] = 'CANCEL';
CalMode[CalMode.VERIFY] = 'VERIFY';
CalMode[CalMode.OTHER] = 'OTHER';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class CalendarCar {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class SubFirmDictionary {
    /**
     * @param {?} data
     * @param {?} callback
     * @return {?}
     */
    create(data, callback) {
        $.ajax({
            type: 'post',
            url: this.getUrl('subfirm/dictionary/create'),
            data: data,
            success: (/**
             * @param {?} data
             * @return {?}
             */
            (data) => callback(data)),
            error: (/**
             * @return {?}
             */
            () => callback(null))
        });
    }
    /**
     * @param {?} data
     * @param {?} callback
     * @return {?}
     */
    update(data, callback) {
        data.dictID = data.dictID || data.uuid;
        $.ajax({
            type: 'post',
            url: this.getUrl('subfirm/dictionary/update'),
            data: data,
            success: (/**
             * @param {?} data
             * @return {?}
             */
            (data) => callback(data)),
            error: (/**
             * @return {?}
             */
            () => callback(null))
        });
    }
    /**
     * @param {?} data
     * @param {?} callback
     * @return {?}
     */
    remove(data, callback) {
        data.dictID = data.dictID || data.uuid;
        $.ajax({
            url: this.getUrl('subfirm/dictionary/remove'),
            data: data,
            success: (/**
             * @param {?} data
             * @return {?}
             */
            (data) => callback(data)),
            error: (/**
             * @return {?}
             */
            () => callback(null))
        });
    }
    /**
     * @param {?} reference
     * @param {?} callback
     * @return {?}
     */
    list(reference, callback) {
        $.ajax({
            url: this.getUrl('subfirm/dictionary/list'),
            data: {
                reference: reference
            },
            success: (/**
             * @param {?} data
             * @return {?}
             */
            (data) => callback(data && data.items || [])),
            error: (/**
             * @return {?}
             */
            () => callback([]))
        });
    }
    /**
     * @param {?} url
     * @return {?}
     */
    getUrl(url) {
        return iNet.getPUrl(url);
    }
}
/**
 * @record
 */
function DictionaryData() { }
if (false) {
    /** @type {?|undefined} */
    DictionaryData.prototype.dictID;
    /** @type {?|undefined} */
    DictionaryData.prototype.name;
    /** @type {?|undefined} */
    DictionaryData.prototype.value;
    /** @type {?|undefined} */
    DictionaryData.prototype.reference;
    /** @type {?|undefined} */
    DictionaryData.prototype.uuid;
    /** @type {?|undefined} */
    DictionaryData.prototype.cache;
    /** @type {?|undefined} */
    DictionaryData.prototype.order;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {string} */
const CalAttendeeState = {
    NEEDS_ACTION: 'NEEDS_ACTION',
    ACCEPTED: 'ACCEPTED',
    DECLINED: 'DECLINED',
    TENTATIVE: 'TENTATIVE',
    DELEGATED: 'DELEGATED',
    COMPLETED: 'COMPLETED',
    IN_PROCESS: 'IN_PROCESS',
    NONE: 'NONE',
    OTHERS: 'OTHERS',
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const LEADER_REFERENCE = 'CAL_BUILDER_LEADER';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const moment = moment_;
window['moment'] = moment;
class CalBuilder {
    constructor() {
        this.TIME_NEW_UPDATE = 12;
        this.roleUrl = 'xschedule/page/role';
        this.MODE = CalMode;
        this.ROLE = CalAttendeeRole;
        this.calSubType = CalSubType;
        this.calCategory = CalCategory;
        this.vnToLatin = vnToLatin;
        this.dateUtils = DateUtils;
        this.calAttendeeType = CalAttendeeType;
        this.calAttendeeState = CalAttendeeState;
        this.calType = CalType;
        this.subFirmDic = new SubFirmDictionary();
        this.carUtils = new CalendarCar(this.subFirmDic);
        this.configs = CalConfigs;
        this.resources = {
            days: [
                'Chủ nhật',
                'Thứ hai',
                'Thứ ba',
                'Thứ tư',
                'Thứ năm',
                'Thứ sáu',
                'Thứ bảy'
            ],
            statuses: [
                'Mới tạo',
                'Ban hành',
                'Chờ duyệt',
                'Đã hủy',
                'Thông qua',
                'Lịch đơn vị khác'
            ],
            allDay: 'Cả ngày',
            hour: 'giờ',
            minute: 'phút'
        };
        this._userRoles = {};
        this._mapEvents = {};
        this._queue = {};
        this._organs = [];
        this._myOrgans = [];
        this.typeIsDepartment = (/**
         * @param {?} type
         * @return {?}
         */
        (type) => type === CalType.DEPARTMENT);
        this.typeIsCommunity = (/**
         * @param {?} type
         * @return {?}
         */
        (type) => type === CalType.COMMUNITY);
        this.typeIsOrganization = (/**
         * @param {?} type
         * @return {?}
         */
        (type) => type === CalType.ORGANIZATION);
        this.catIsInvitation = (/**
         * @param {?} category
         * @return {?}
         */
        (category) => CalCategory.INVITATION === category);
        this.catIsPersonal = (/**
         * @param {?} category
         * @return {?}
         */
        (category) => CalCategory.PERSONAL === category);
        this.catIsCar = (/**
         * @param {?} category
         * @return {?}
         */
        (category) => CalCategory.CAR === category);
        this.catIsImportant = (/**
         * @param {?} category
         * @return {?}
         */
        (category) => CalCategory.IMPORTANT === category);
        this.formatDateStr = (/**
         * @param {?} date
         * @return {?}
         */
        (date) => this.formatDate(date, this.getConfigValue('DATE_FORMAT')));
        this.formatTimeStr = (/**
         * @param {?} date
         * @return {?}
         */
        (date) => this.formatDate(date, this.getConfigValue('TIME_FORMAT')));
        this.formatDateTimeStr = (/**
         * @param {?} date
         * @return {?}
         */
        (date) => this.formatDate(date, this.getConfigValue('DATE_TIME_FORMAT')));
        this.formatDate = (/**
         * @param {?} date
         * @param {?} format
         * @return {?}
         */
        (date, format) => moment(date).format(format));
        this.getEventStatus = (/**
         * @param {?} mode
         * @return {?}
         */
        (mode) => this.resources.statuses[mode]);
        this.isCreate = (/**
         * @param {?} mode
         * @return {?}
         */
        (mode) => mode === CalMode.CREATE);
        this.isPublish = (/**
         * @param {?} mode
         * @return {?}
         */
        (mode) => mode === CalMode.PUBLISH);
        this.isSent = (/**
         * @param {?} mode
         * @return {?}
         */
        (mode) => mode === CalMode.SENT);
        this.isCancel = (/**
         * @param {?} mode
         * @return {?}
         */
        (mode) => mode === CalMode.CANCEL);
        this.isOther = (/**
         * @param {?} mode
         * @return {?}
         */
        (mode) => mode === CalMode.OTHER);
    }
    /**
     * @return {?}
     */
    _applyConfig() {
        iNet.apply(this, DateUtils);
        // Apply config
        if (window['xCalendarConfigList'] && window['xCalendarConfigList'].length > 0) {
            window['xCalendarConfigList'].forEach((/**
             * @param {?} config
             * @return {?}
             */
            (config) => {
                /** @type {?} */
                let obj = this.getConfigObj(config.name);
                if (obj) {
                    $.extend(obj, config);
                }
                else {
                    this.configs.push(config);
                }
            }));
        }
        if (window['xCalendarConfigCustoms']) {
            for (let k in window['xCalendarConfigCustoms']) {
                /** @type {?} */
                let obj = this.getConfigObj(k);
                if (obj) {
                    obj.value = window['xCalendarConfigCustoms'][k];
                }
            }
        }
        // Apply resources
        if (window['xcalendarResources']) {
            this.resources = window['xcalendarResources'];
        }
        this.configs.forEach((/**
         * @param {?} obj
         * @return {?}
         */
        function (obj) {
            if (obj.value === 'false') {
                obj.value = false;
            }
        }));
    }
    /**
     * @param {?} name
     * @return {?}
     */
    getConfigValue(name) {
        /** @type {?} */
        let obj = this.getConfigObj(name);
        return obj && obj.value;
    }
    /**
     * @param {?} name
     * @return {?}
     */
    getConfigObj(name) {
        for (let i = 0; i < this.configs.length; i++) {
            if (this.configs[i].name === name) {
                return this.configs[i];
            }
        }
    }
    /**
     * @param {?} name
     * @param {?} executor
     * @param {?} callback
     * @return {?}
     */
    addQueue(name, executor, callback) {
        this._queue[name] = this._queue[name] || [];
        this._queue[name].push(callback);
        if (this._queue[name].length === 1) {
            new Promise((/**
             * @param {?} resolve
             * @return {?}
             */
            (resolve) => {
                executor(resolve);
            })).then((/**
             * @param {?} value
             * @return {?}
             */
            (value) => {
                this._queue[name].forEach((/**
                 * @param {?} fn
                 * @return {?}
                 */
                (fn) => {
                    fn && fn(value);
                }));
                delete this._queue[name];
            }));
        }
    }
    /**
     * @param {?} callback
     * @param {?=} options
     * @return {?}
     */
    ready(callback, options) {
        this._loadOrgans((/**
         * @param {?} organs
         * @return {?}
         */
        (organs) => {
            callback(organs, this._getOrganOnInit());
        }), options);
    }
    // Cache all org in a minute for performance
    /**
     * @param {?} key
     * @param {?=} value
     * @return {?}
     */
    cacheSessionStorage(key, value) {
        try {
            if (!value) {
                // Cache data in a minute
                /** @type {?} */
                let timeCache = 5 * 60000;
                /** @type {?} */
                let cache = sessionStorage.getItem(key);
                if (cache) {
                    cache = JSON.parse(cache);
                    if (new Date().getTime() - cache.time < timeCache) {
                        return cache.data;
                    }
                    else {
                        sessionStorage.removeItem(key);
                    }
                }
                return false;
            }
            else {
                sessionStorage.setItem(key, JSON.stringify({
                    time: new Date().getTime(),
                    data: value
                }));
            }
            // Fixed prev version
            localStorage.removeItem(key);
        }
        catch (e) { }
    }
    // Cache data on global window, refresh tab will reset
    /**
     * @param {?} key
     * @param {?=} data
     * @return {?}
     */
    cacheDataTemp(key, data) {
        this._cacheStore = this._cacheStore || {};
        if (data === undefined) {
            return this._cacheStore[key];
        }
        else {
            this._cacheStore[key] = data;
        }
    }
    /**
     * @param {?} orgid
     * @return {?}
     */
    setOrgId(orgid) {
        this.orgid = orgid;
        this._cacheOrgId(orgid);
    }
    /**
     * @return {?}
     */
    getOrgId() {
        return this.orgid || this._cacheOrgId() || iNet.organId;
    }
    /**
     * @param {?=} orgid
     * @return {?}
     */
    _cacheOrgId(orgid) {
        /** @type {?} */
        let id = 'xcalendar_orgid';
        try {
            if (!orgid) {
                return localStorage.getItem(id);
            }
            else {
                localStorage.setItem(id, orgid);
            }
        }
        catch (e) { }
    }
    /**
     * @param {?=} date
     * @return {?}
     */
    getHourMinute(date) {
        if (date.getTime) {
            // date object
            return date.getHours() * 60 + date.getMinutes();
        }
        else {
            // string hour
            date = date.split(':');
            return Number(date[0]) * 60 + Number(date[1]);
        }
    }
    /**
     * @param {?} form
     * @param {?} success
     * @param {?=} options
     * @return {?}
     */
    create(form, success, options) {
        return this.postForm({
            url: 'calbuilder/element/create',
            data: form,
            success: (/**
             * @param {?} event
             * @return {?}
             */
            (event) => {
                if (event && event.uuid)
                    this.indexEvent(event);
                success(event);
            })
        }, options);
    }
    /**
     * @param {?} params
     * @param {?} success
     * @param {?=} options
     * @return {?}
     */
    updateEventByRole(params, success, options) {
        /** @type {?} */
        let organId = params && params.orgid || this.getOrgId();
        this.loadRole(organId, (/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            let event = this.getEventByObjectId(params && params.element);
            if (this.isReviewer(organId)) {
                this.reviewUpdate(params, success, options);
            }
            else if (this.isOwnReviewer(organId) && event && this.meIsCreator(event)) {
                this.ownerReviewUpdate(params, success, options);
            }
            else {
                this.update(params, success, options);
            }
        }), options);
    }
    /**
     * @param {?} form
     * @param {?} success
     * @param {?=} options
     * @return {?}
     */
    update(form, success, options) {
        return this.postForm({
            url: 'calbuilder/element/update',
            data: form,
            success: (/**
             * @param {?} event
             * @return {?}
             */
            (event) => {
                if (event && event.uuid)
                    this.indexEvent(event);
                success && success(event);
            })
        }, options);
    }
    /**
     * @param {?} form
     * @param {?} success
     * @param {?=} options
     * @return {?}
     */
    reviewUpdate(form, success, options) {
        return this.postForm({
            url: 'calbuilder/reviewupdate',
            data: form,
            success: (/**
             * @param {?} event
             * @return {?}
             */
            (event) => {
                if (event && event.uuid)
                    this.indexEvent(event);
                success && success(event);
            })
        }, options);
    }
    /**
     * @param {?} form
     * @param {?} success
     * @param {?=} options
     * @return {?}
     */
    ownerReviewUpdate(form, success, options) {
        return this.postForm({
            url: 'calbuilder/owner/reviewupdate',
            data: form,
            success: (/**
             * @param {?} event
             * @return {?}
             */
            (event) => {
                if (event && event.uuid)
                    this.indexEvent(event);
                success && success(event);
            })
        }, options);
    }
    /**
     * @param {?} params
     * @param {?} callback
     * @param {?=} options
     * @return {?}
     */
    remove(params, callback, options) {
        return this.sendRequest({
            url: 'calbuilder/element/delete',
            data: params,
            success: callback
        }, options);
    }
    /**
     * @param {?} params
     * @param {?} success
     * @param {?=} options
     * @return {?}
     */
    cancel(params, success, options) {
        /** @type {?} */
        let organId = params && params.orgid || this.getOrgId();
        this.loadRole(organId, (/**
         * @return {?}
         */
        () => {
            if (this.isReviewer(organId)) {
                this.reviewCancel(params, success, options);
            }
            else if (this.isOwnReviewer(organId)) {
                this.ownerReviewCancel(params, success, options);
            }
        }), options);
    }
    // element, members
    /**
     * @param {?} params
     * @param {?} success
     * @param {?=} options
     * @return {?}
     */
    reviewNotify(params, success, options) {
        return this.sendRequest({
            type: 'post',
            url: 'calbuilder/reviewnotify',
            data: params,
            success: success
        }, options);
    }
    /**
     * @param {?} params
     * @param {?} success
     * @param {?=} options
     * @return {?}
     */
    reviewCancel(params, success, options) {
        return this.sendRequest({
            url: 'calbuilder/reviewcancel',
            data: params,
            success: (/**
             * @param {?} event
             * @return {?}
             */
            (event) => {
                if (event && event.uuid)
                    this.indexEvent(event);
                success && success(event);
            })
        }, options);
    }
    /**
     * @param {?} params
     * @param {?} success
     * @param {?=} options
     * @return {?}
     */
    ownerReviewCancel(params, success, options) {
        return this.sendRequest({
            url: 'calbuilder/owner/reviewcancel',
            data: params,
            success: (/**
             * @param {?} event
             * @return {?}
             */
            (event) => {
                if (event && event.uuid)
                    this.indexEvent(event);
                success && success(event);
            })
        }, options);
    }
    /**
     * @param {?} params
     * @param {?} success
     * @param {?=} options
     * @return {?}
     */
    deleteAttachment(params, success, options) {
        /**
         * fileID: 'id1,id2'
         * element: 'uuid'
         */
        return this.sendRequest({
            type: 'post',
            url: 'calbuilder/file/delete',
            data: params,
            success: (/**
             * @param {?} event
             * @return {?}
             */
            (event) => {
                success && success(this.indexEvent(event));
            })
        }, options);
    }
    /**
     * @param {?} organId
     * @param {?} callback
     * @param {?=} options
     * @return {?}
     */
    loadOrganMembers(organId, callback, options) {
        organId = organId || this.getOrgId();
        return this.searchAttendee({ orgid: organId }, callback, options);
    }
    /**
     * @param {?} params
     * @param {?} success
     * @param {?=} options
     * @return {?}
     */
    searchAttendee(params, success, options) {
        this._searchAttendee(params, (/**
         * @param {?} members
         * @return {?}
         */
        function (members) {
            members.sort((/**
             * @param {?} a
             * @param {?} b
             * @return {?}
             */
            (a, b) => a.fullname.localeCompare(b.fullname)));
            success(members);
        }), options);
    }
    /**
     * @param {?} params
     * @param {?} success
     * @param {?=} options
     * @return {?}
     */
    _searchAttendee(params, success, options) {
        return this.sendRequest({
            url: 'calbuilder/attendee/search',
            data: params,
            success: (/**
             * @param {?} data
             * @return {?}
             */
            (data) => {
                /** @type {?} */
                let members = data && data.elements || [];
                members = members.filter((/**
                 * @param {?} item
                 * @return {?}
                 */
                (item) => !item.alias));
                members.forEach((/**
                 * @param {?} member
                 * @return {?}
                 */
                (member) => this._indexAccount(member)));
                success(members);
            }),
            error: (/**
             * @return {?}
             */
            function () {
                success([]);
            })
        }, options, true);
    }
    /**
     * @param {?} account
     * @return {?}
     */
    _indexAccount(account) {
        // Remove suffix email before search user "binh@binhdinh.gov.vn"
        // don't search on suffix "@binhdinh.gov.vn"
        account['_index'] = vnToLatin(account.fullname.toLowerCase()) + ' ' +
            account.username.split('@')[0];
        account.display = this.insertPrefixAttendee(account.fullname || account.username);
        return account;
    }
    /**
     * @param {?} params
     * @param {?} callback
     * @param {?=} options
     * @return {?}
     */
    loadDepartments(params, callback, options) {
        return this.sendRequest({
            url: 'calbuilder/department/list',
            data: params,
            success: (/**
             * @param {?} data
             * @return {?}
             */
            (data) => {
                data = data && data.items || [];
                data.sort((/**
                 * @param {?} a
                 * @param {?} b
                 * @return {?}
                 */
                (a, b) => {
                    return a.order - b.order;
                }));
                callback(data);
            }),
            error: (/**
             * @return {?}
             */
            () => {
                callback([]);
            })
        }, options, true);
    }
    /**
     * @param {?} callback
     * @param {?=} options
     * @return {?}
     */
    getMyOrg(callback, options) {
        /** @type {?} */
        let keyCache = 'cal_my_organs';
        // Remove data unused prev version
        localStorage.removeItem(keyCache);
        keyCache += iNet.usercode;
        this._myOrgans = this._myOrgans.length && this._myOrgans || this.cacheSessionStorage(keyCache) || [];
        if (this._myOrgans.length > 0) {
            return callback(this._myOrgans);
        }
        this.sendRequest({
            url: 'plugin/organization/list',
            success: (/**
             * @param {?} data
             * @return {?}
             */
            (data) => {
                /** @type {?} */
                let organs = this._convertOrg(data && data.elements || []);
                if (organs.length > 0) {
                    organs = this.visibleMyOrgans(organs);
                    this._myOrgans = organs;
                    this.cacheSessionStorage(keyCache, organs);
                }
                callback(organs);
            }),
            error: (/**
             * @return {?}
             */
            () => callback([]))
        }, options, true);
    }
    /**
     * @param {?} organs
     * @return {?}
     */
    visibleMyOrgans(organs) {
        return organs.filter((/**
         * @param {?} organ
         * @return {?}
         */
        (organ) => {
            /** @type {?} */
            let _organ = this.getOrgById(organ.firmUUID);
            return _organ && !!_organ.groupType;
        }));
    }
    /**
     * @param {?} callback
     * @param {?=} options
     * @return {?}
     */
    getAllOrg(callback, options) {
        /** @type {?} */
        let keyCache = 'cal_organ_list';
        // Remove data unused prev version
        localStorage.removeItem(keyCache);
        keyCache += iNet.usercode;
        this._organs = this._organs.length && this._organs || this.cacheSessionStorage(keyCache) || [];
        // Check all org is cached
        if (this._organs.length > 0) {
            return callback(this._organs);
        }
        return this.sendRequest({
            data: { pageSize: -1 },
            url: 'plugin/organization/search',
            success: (/**
             * @param {?} data
             * @return {?}
             */
            (data) => {
                /** @type {?} */
                let organs = this._convertOrg(data && data.items || []);
                if (organs.length > 0) {
                    // Only get organ has groupType
                    organs = this.visibleOrgans(organs);
                    this._organs = organs;
                    this.cacheSessionStorage(keyCache, this._organs);
                }
                callback(organs);
            }),
            error: (/**
             * @return {?}
             */
            () => callback([]))
        }, options, true);
    }
    /**
     * @param {?} organs
     * @return {?}
     */
    visibleOrgans(organs) {
        return organs.filter((/**
         * @param {?} organ
         * @return {?}
         */
        (organ) => !!organ.groupType));
    }
    /**
     * @private
     * @param {?} callback
     * @param {?=} options
     * @return {?}
     */
    _loadOrgans(callback, options) {
        if (this._organs && this._organs.length > 0) {
            callback(this._organs.slice());
        }
        else {
            this.getAllOrg((/**
             * @param {?} organs
             * @return {?}
             */
            (organs) => {
                // Detect user login
                this.loadRole('', (/**
                 * @param {?} role
                 * @return {?}
                 */
                (role) => {
                    this.isAuth = !!role.isAuth;
                    if (role.isAuth) {
                        this.getMyOrg((/**
                         * @param {?} myOrgans
                         * @return {?}
                         */
                        (myOrgans) => {
                            // Move my organs to first
                            for (let i = myOrgans.length - 1; i >= 0; i--) {
                                /** @type {?} */
                                let myOrgan = myOrgans[i];
                                for (let j = 0; j < organs.length; j++) {
                                    /** @type {?} */
                                    let organ = organs[j];
                                    if (organ.firmUUID === myOrgan.firmUUID) {
                                        organs.splice(j, 1);
                                        organ.myOrg = true;
                                        organs.unshift(organ);
                                        break;
                                    }
                                }
                            }
                            callback(organs);
                        }), options);
                    }
                    else {
                        callback(organs);
                    }
                }), options);
            }), options);
        }
    }
    /**
     * @param {?} callback
     * @param {?=} domain
     * @return {?}
     */
    getTreeOrg(callback, domain) {
        this._loadOrgans((/**
         * @param {?} data
         * @return {?}
         */
        (data) => {
            /** @type {?} */
            let tree = [];
            // Set children is empty
            data.forEach((/**
             * @param {?} item
             * @return {?}
             */
            (item) => {
                item.children = [];
            }));
            // Build tree org list
            data.forEach((/**
             * @param {?} item
             * @return {?}
             */
            (item) => {
                if (item.parentID) {
                    /** @type {?} */
                    let parentOrgan = this.getOrgById(item.parentID);
                    if (parentOrgan) {
                        parentOrgan.children.push(item);
                    }
                }
                else {
                    tree.push(item);
                }
            }));
            tree.data = data;
            callback && callback(tree);
        }), domain);
    }
    /**
     * @param {?=} item
     * @return {?}
     */
    indexOrgSearch(item) {
        item._index = vnToLatin([item.firmName, item.firmUUID, item.firmPrefix].join(' ').toLowerCase());
    }
    /**
     * @param {?=} orgid
     * @return {?}
     */
    isMyOrg(orgid) {
        /** @type {?} */
        let org = this.getOrgById(orgid);
        return org && org.myOrg;
    }
    /**
     * @param {?} params
     * @param {?} callback
     * @param {?=} options
     * @return {?}
     */
    loadEvent(params, callback, options) {
        return this.sendRequest({
            type: 'post',
            url: 'calbuilder/element/load',
            data: params,
            success: (/**
             * @param {?} data
             * @return {?}
             */
            (data) => {
                if (!data || !data.uuid) {
                    // Event not found, try to load review event
                    this.loadRole(params.orgid, (/**
                     * @return {?}
                     */
                    () => {
                        if (this.isReviewer(params.orgid)) {
                            this.loadEventReview(params, callback, options);
                        }
                        else {
                            callback && callback(data);
                        }
                    }));
                    return;
                }
                this.indexEvent(data);
                callback && callback(data);
            })
        }, options);
    }
    /**
     * @param {?} params
     * @param {?} callback
     * @param {?=} options
     * @return {?}
     */
    updateState(params, callback, options) {
        if (params.notes) {
            params.notes = this.formatTextUpdate(params.notes);
        }
        return this.loadEvent(params, callback, options);
    }
    /**
     * @param {?} params
     * @param {?} success
     * @param {?=} options
     * @return {?}
     */
    loadEventReview(params, success, options) {
        return this.sendRequest({
            url: 'calbuilder/reviewload',
            data: params,
            success: (/**
             * @param {?} event
             * @return {?}
             */
            (event) => {
                if (event && event.uuid)
                    this.indexEvent(event);
                success && success(event);
            })
        }, options);
    }
    /**
     * @param {?} params
     * @param {?} success
     * @param {?=} options
     * @return {?}
     */
    loadGroupEvent(params, success, options) {
        return this.sendRequest({
            url: 'calbuilder/element/group',
            data: params,
            success: (/**
             * @param {?} data
             * @return {?}
             */
            (data) => success(this.modifyEvent(data && data.items || [])))
        }, options);
    }
    /**
     * @param {?} params
     * @param {?} callback
     * @param {?} options
     * @return {?}
     */
    loadOrgEvents(params, callback, options) {
        this._loadOnDifferYear(this._loadOrgEvents, params, callback, options);
    }
    /**
     * @param {?} params
     * @param {?} callback
     * @param {?} options
     * @return {?}
     */
    _loadOrgEvents(params, callback, options) {
        return this.sendRequest({
            type: 'post',
            url: 'calbuilder/mainboard/view',
            data: params,
            success: (/**
             * @param {?} data
             * @return {?}
             */
            (data) => callback(this.modifyEvent(data && data.items || [])))
        }, options);
    }
    /**
     * @param {?} params
     * @param {?} callback
     * @param {?} options
     * @return {?}
     */
    loadCommunityEvents(params, callback, options) {
        this._loadOnDifferYear(this._loadCommunityEvents, params, callback, options);
    }
    /**
     * @param {?} params
     * @param {?} callback
     * @param {?} options
     * @return {?}
     */
    _loadCommunityEvents(params, callback, options) {
        return this.sendRequest({
            type: 'post',
            url: 'calbuilder/mainboard/published',
            data: params,
            success: (/**
             * @param {?} data
             * @return {?}
             */
            (data) => callback(this.modifyEvent(data && data.items || []))),
            useOrgId: true
        }, options);
    }
    /**
     * @param {?} params
     * @param {?} callback
     * @param {?} options
     * @return {?}
     */
    loadAllPublishEvents(params, callback, options) {
        this._loadOnDifferYear(this._loadAllPublishEvents, params, callback, options);
    }
    /**
     * @param {?} params
     * @param {?} callback
     * @param {?} options
     * @return {?}
     */
    _loadAllPublishEvents(params, callback, options) {
        return this.sendRequest({
            type: 'post',
            url: 'calbuilder/mainboard/published',
            data: params,
            success: (/**
             * @param {?} data
             * @return {?}
             */
            (data) => callback(this.modifyEvent(data && data.items || []))),
            removeOrgId: true
        }, options);
    }
    /**
     * @param {?} params
     * @param {?} callback
     * @param {?=} options
     * @return {?}
     */
    loadPublishEvents(params, callback, options) {
        // Load role
        this.loadRole(params.orgid, (/**
         * @return {?}
         */
        () => {
            // Reviewer
            if (this.isMyOrg(params.orgid)) {
                this.loadOrgEvents(params, callback, options);
            }
            else {
                this.loadCommunityEvents(params, callback, options);
            }
        }), options);
    }
    /**
     * @param {?} params
     * @param {?} callback
     * @param {?} options
     * @return {?}
     */
    getReviewEvents(params, callback, options) {
        this._loadOnDifferYear(this._getReviewEvents, params, callback, options);
    }
    /**
     * @param {?} params
     * @param {?} callback
     * @param {?} options
     * @return {?}
     */
    _getReviewEvents(params, callback, options) {
        return this.sendRequest({
            type: 'post',
            url: 'calbuilder/reviewlist',
            data: params,
            success: (/**
             * @param {?} data
             * @return {?}
             */
            (data) => callback(this.modifyEvent(data && data.items || [])))
        }, options);
    }
    /**
     * @param {?} params
     * @param {?} callback
     * @param {?} options
     * @return {?}
     */
    getViewEvents(params, callback, options) {
        this._loadOnDifferYear(this._getViewEvents, params, callback, options);
    }
    /**
     * @param {?} params
     * @param {?} callback
     * @param {?} options
     * @return {?}
     */
    _getViewEvents(params, callback, options) {
        return this.sendRequest({
            type: 'post',
            url: 'calbuilder/viewlist',
            data: params,
            success: (/**
             * @param {?} data
             * @return {?}
             */
            (data) => callback(this.modifyEvent(data && data.items || [])))
        }, options);
    }
    /**
     * @param {?} params
     * @param {?} callback
     * @param {?} options
     * @return {?}
     */
    reviewSearchEvents(params, callback, options) {
        this._loadOnDifferYear(this._reviewSearchEvents, params, callback, options);
    }
    // members: ",,"
    /**
     * @param {?} params
     * @param {?} callback
     * @param {?} options
     * @return {?}
     */
    _reviewSearchEvents(params, callback, options) {
        return this.sendRequest({
            type: 'post',
            url: 'calbuilder/reviewsearch',
            data: params,
            success: (/**
             * @param {?} data
             * @return {?}
             */
            (data) => callback(this.modifyEvent(data && data.items || [])))
        }, options);
    }
    /**
     * @param {?} params
     * @param {?} callback
     * @param {?=} options
     * @return {?}
     */
    getOwnEvents(params, callback, options) {
        this._loadOnDifferYear(this._getOwnEvents, params, callback, options);
    }
    /**
     * @param {?} params
     * @param {?} callback
     * @param {?} options
     * @return {?}
     */
    _getOwnEvents(params, callback, options) {
        return this.sendRequest({
            type: 'post',
            url: 'calbuilder/element/list',
            data: params,
            success: (/**
             * @param {?} data
             * @return {?}
             */
            (data) => callback(this.modifyEvent(data && data.items || [])))
        }, options);
    }
    /**
     * @param {?} params
     * @param {?} callback
     * @param {?=} options
     * @return {?}
     */
    getListEvents(params, callback, options) {
        /** @type {?} */
        let promises = [];
        params.orgid = params.orgid || this.getOrgId();
        // Load review event
        this.loadRole(params.orgid, (/**
         * @return {?}
         */
        () => {
            // My events
            promises.push(new Promise((/**
             * @param {?} resolve
             * @return {?}
             */
            (resolve) => {
                /** @type {?} */
                let _options = $.extend({}, options);
                _options.error = (/**
                 * @return {?}
                 */
                function () {
                    resolve([]);
                });
                this.getOwnEvents(params, resolve, _options);
            })));
            if (this.isReviewer(params.orgid)) {
                // Reviewer
                promises.push(new Promise((/**
                 * @param {?} resolve
                 * @return {?}
                 */
                (resolve) => {
                    /** @type {?} */
                    let _options = $.extend({}, options);
                    _options.error = (/**
                     * @return {?}
                     */
                    function () {
                        resolve([]);
                    });
                    this.getReviewEvents(params, resolve, _options);
                })));
            }
            else if (this.isViewer(params.orgid)) {
                // Viewer
                promises.push(new Promise((/**
                 * @param {?} resolve
                 * @return {?}
                 */
                (resolve) => {
                    /** @type {?} */
                    let _options = $.extend({}, options);
                    _options.error = (/**
                     * @return {?}
                     */
                    function () {
                        resolve([]);
                    });
                    this.getViewEvents(params, resolve, _options);
                })));
            }
            // Load all promises
            Promise.all(promises).then((/**
             * @param {?} values
             * @return {?}
             */
            (values) => {
                /** @type {?} */
                let events = [];
                values.forEach((/**
                 * @param {?} value
                 * @return {?}
                 */
                (value) => events = events.concat(value || [])));
                events = this.removeEventDuplicate(events);
                callback(this.modifyEvent(events));
            }));
        }), options);
    }
    /**
     * @param {?} events
     * @return {?}
     */
    modifyEvent(events) {
        if (!events)
            return;
        this.removeEventDuplicate(events);
        events.forEach((/**
         * @param {?} item
         * @return {?}
         */
        (item) => this.indexEvent(item)));
        this.sortEvents(events);
        return events;
    }
    /**
     * @param {?} events
     * @return {?}
     */
    removeEventDuplicate(events) {
        if (events.length > 1) {
            for (let i = 1; i < events.length; i++) {
                for (let j = i - 1; j >= 0; j--) {
                    if (events[i].uuid === events[j].uuid && events[i].day === events[j].day) {
                        events.splice(i, 1);
                        --i;
                        break;
                    }
                }
            }
        }
        return events;
    }
    /**
     * @param {?} events
     * @return {?}
     */
    sortEvents(events) {
        // sort by start date
        this.sortEventStart(events);
        this.sortEventPriority(events);
        return events;
    }
    /**
     * @param {?} events
     * @return {?}
     */
    sortEventStart(events) {
        this._sort(events, 'from');
        return events;
    }
    /**
     * @param {?} events
     * @return {?}
     */
    sortEventPriority(events) {
        // sort by priority on day
        for (let i = 0; i < events.length; i++) {
            /** @type {?} */
            let item = events[i];
            item._order = Number(item._order) || 0;
            if (item._order > 0) {
                moveFirst(item);
                i = events.indexOf(item);
            }
        }
        /**
         * @param {?} item
         * @return {?}
         */
        function moveFirst(item) {
            if (item._order !== 0) {
                /** @type {?} */
                let index = events.indexOf(item);
                if (index > 0) {
                    /** @type {?} */
                    let tmp = events[index - 1];
                    if (item.day === tmp.day && (tmp._order === 0 || item._order < tmp._order)) {
                        events[index] = tmp;
                        events[index - 1] = item;
                        moveFirst(item);
                    }
                }
            }
        }
        return events;
    }
    /**
     * @param {?} arr
     * @param {?=} orderBy
     * @return {?}
     */
    _sort(arr, orderBy) {
        for (let i = 1; i < arr.length; i++) {
            if (i === 0)
                continue;
            /** @type {?} */
            let item = arr[i];
            /** @type {?} */
            let prev = arr[i - 1];
            if (item[orderBy] < prev[orderBy]) {
                arr[i] = prev;
                arr[i - 1] = item;
                i -= 2;
            }
        }
    }
    // keywords: string[]
    /**
     * @param {?} events
     * @param {?} keywords
     * @return {?}
     */
    searchEventsByKeywords(events, keywords) {
        if (keywords && keywords.length > 0) {
            return events.filter((/**
             * @param {?} event
             * @return {?}
             */
            (event) => {
                for (let i = 0; i < keywords.length; i++) {
                    if (event._index.indexOf(keywords[i]) < 0) {
                        return false;
                    }
                }
                return true;
            }));
        }
        return events.slice();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    indexEvent(event) {
        // Save event with link to get later
        event.objectId = event.uuid + event.mode + event.day;
        this._mapEvents[event.objectId] = event;
        this._mapEvents[event.uuid] = event;
        if (!event._indexed) {
            this.indexEventMembers(event);
            if (window['beforeIndexEvent']) {
                window['beforeIndexEvent'](event);
            }
            event.subjectDisplay = this.formatTextDisplay(event.subject || '');
            event.locationDisplay = this.formatTextDisplay(event.location || '');
            this.indexRepeat(event);
            this.indexEventAttribute(event);
            this.indexEventDate(event);
            this.indexEventSearch(event);
            this.indexCustom(event);
            event.category = event.category || '';
            event.categoryIcon = CalCategoryIcon[event.category];
            event.department = event.departID;
            event._indexed = true;
        }
        return event;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    indexEventMembers(event) {
        /** @type {?} */
        let obj = {};
        for (let k in CalAttendeeRole) {
            obj[k] = [];
        }
        event.members = event.members || [];
        event.attendees = [];
        event.members.forEach((/**
         * @param {?} item
         * @return {?}
         */
        (item) => {
            item.name = this.attendeeDisplay(item);
            item.value = this.attendeeValue(item);
            // Type attendee
            if (item.alias) {
                item.type = CalAttendeeType.ALIAS;
            }
            else if (item.username) {
                item.type = CalAttendeeType.USER;
            }
            else {
                item.type = CalAttendeeType.ORGAN;
            }
            obj[item.role] = obj[item.role] || [];
            obj[item.role].push(item);
            if (item.role === CalAttendeeRole.CREATOR) {
                event.creator = item.username;
                event.fullname = item.fullname;
                event.isCreator = this.usernameIsMe(event.creator);
                event.creatorStr = event.fullname + '(' + event.creator + ')';
            }
            else {
                event.attendees.push(item);
            }
        }));
        event.chairmanStr = this._groupMember2String(obj.CHAIRMAN);
        event.memberStr = this._groupMember2String(obj.MEMBER);
        // Todo: test prepare str
        event.prepareStr = this._groupMember2String(obj.PREPARER);
        event.watcherStr = event.observerStr = this._groupMember2String(obj.OBSERVER);
        event.membersDecode = obj;
    }
    /**
     * @param {?} members
     * @return {?}
     */
    _groupMember2String(members) {
        /** @type {?} */
        let str = '';
        /** @type {?} */
        let data = this.groupAttendeeByOrgan(members);
        for (let k in data) {
            /** @type {?} */
            let items = data[k];
            /** @type {?} */
            let organ = items.filter((/**
             * @param {?} item
             * @return {?}
             */
            (item) => item.type === CalAttendeeType.ORGAN))[0];
            if (organ) {
                str += '<b>' + organ.organName + '</b>: ';
            }
            // Todo: consider to use this.buildMemberShow
            items.forEach((/**
             * @param {?} item
             * @return {?}
             */
            (item) => {
                if (item.type !== CalAttendeeType.ORGAN) {
                    str += item.name + ', ';
                }
            }));
            str = str.slice(0, -2);
            str += '<br>';
        }
        return str.slice(0, -4);
    }
    /**
     * @param {?=} event
     * @return {?}
     */
    indexEventAttribute(event) {
        for (let k in event.attribute) {
            event['_' + k] = event.attribute[k];
        }
        event._order = Number(event._order) || 0;
        if (event._subType) {
            event.type = event._subType;
        }
    }
    /**
     * @param {?} calEvent
     * @return {?}
     */
    initEvent(calEvent) {
        calEvent = $.extend({}, calEvent);
        this._initEventDate(calEvent);
        calEvent.startTime = calEvent.from.format('H:i');
        calEvent.toTime = calEvent.to.format('H:i');
        return calEvent;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    _initEventDate(event) {
        if (event) {
            /** @type {?} */
            let date;
            if (event && event.uuid) {
                date = new Date(event.year, 0, event.day);
                if (date.getTime()) {
                    event.from = new Date(date.getTime() + event.startTime * 60 * 1000);
                    event.to = new Date(date.getTime() + event.toTime * 60 * 1000);
                }
            }
            if (!date || !date.getTime()) {
                date = new Date();
                date.setHours(date.getHours() + 1, 0, 0, 0);
                event.from = date;
                date = new Date(date);
                date.setHours(date.getHours() + 1);
                event.to = date;
            }
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    indexEventDate(event) {
        this._initEventDate(event);
        // all day event
        event.allDay = event._allday === 'true';
        event.timeStr = this.formatDateStr(event.from);
        if (event.allDay) {
            event.startTimeStr = event.toTimeStr = this.resources.allDay;
            event.hourStr = this.resources.allDay;
        }
        else {
            event.startTimeStr = this.formatTimeStr(event.from);
            event.toTimeStr = this.formatTimeStr(event.to);
            event.hourStr = event.startTimeStr + ' - ' + event.toTimeStr;
        }
        event.timeStr += '; ' + event.hourStr;
        event.start = event.from;
        event.end = event.to;
        // Time create and update
        if (event.createTime) {
            event.createDate = new Date(event.createTime);
            event.createDateStr = this.formatDateTimeStr(event.createDate);
        }
        if (event.updateTime) {
            event.updateDate = new Date(event.updateTime);
            event.updateDateStr = this.formatDateTimeStr(event.updateDate);
        }
        /** @type {?} */
        let hourUpdated = new Date().getTime() - (event.updateTime || event.createTime);
        hourUpdated /= (60 * 60 * 1000);
        if (hourUpdated < 0) {
            hourUpdated = 0;
        }
        if (hourUpdated <= this.TIME_NEW_UPDATE) {
            event.recentUpdated = true;
            event.lastUpdateStr = this.getTextForMinutes(hourUpdated * 60);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    indexEventSearch(event) {
        // Index data to search
        event._index = '';
        event._members = [];
        if (event.subject) {
            event._index = vnToLatin(event.subject.toLowerCase());
        }
        // Index location to search
        if (event.location) {
            event._index += ' ' + vnToLatin(event.location.toLowerCase());
        }
        for (let i = 0; i < event.members.length; i++) {
            /** @type {?} */
            let member = event.members[i];
            if (member.fullname)
                event._index += ' ' + vnToLatin(member.fullname.toLowerCase());
            if (member.username) {
                event._index += ' ' + member.username.toLowerCase();
                // attendee
                if (member.role !== CalAttendeeRole.CREATOR) {
                    event._members.push(member.username);
                }
            }
        }
        // Attachments
        if (event.attachments) {
            event.attachments.forEach((/**
             * @param {?} file
             * @return {?}
             */
            (file) => {
                file.orgid = event.firmUUID;
            }));
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    indexRepeat(event) {
        //"FREQ=WEEKLY;UNTIL=20170707;INTERVAL=1;BYDAY=MO"
        if (event.rrule) {
            /** @type {?} */
            let obj = {};
            event.rrule.split(';').forEach((/**
             * @param {?} item
             * @return {?}
             */
            (item) => {
                item = item.split('=');
                if (item[0] === 'FREQ') {
                    obj.type = obj.rrule = obj.rrmode = item[1];
                }
                else if (item[0] === 'BYDAY') {
                    obj.wkdays = item[1].split(',');
                }
            }));
            if (event.lstart) {
                obj.lstart = new Date(event.lstart);
            }
            if (event.until) {
                obj.until = new Date(event.until);
            }
            event.repeat = obj;
        }
    }
    // Custom index
    /**
     * @param {?} event
     * @return {?}
     */
    indexCustom(event) {
    }
    /**
     * @param {?=} orgid
     * @return {?}
     */
    isReviewer(orgid) {
        orgid = orgid || this.getOrgId();
        return this._userRoles[orgid] && !!this._userRoles[orgid].reviewer;
    }
    /**
     * @param {?=} orgid
     * @return {?}
     */
    isOwnReviewer(orgid) {
        orgid = orgid || this.getOrgId();
        return this._userRoles[orgid] && !!this._userRoles[orgid].own_reviewer;
    }
    /**
     * @param {?=} orgid
     * @return {?}
     */
    isViewer(orgid) {
        orgid = orgid || this.getOrgId();
        return this._userRoles[orgid] && !!this._userRoles[orgid].viewer;
    }
    /**
     * @param {?=} query
     * @return {?}
     */
    getQueryParams(query) {
        /** @type {?} */
        let params = {};
        query = query || location.search;
        query.replace('?', '').split('&').forEach((/**
         * @param {?} item
         * @return {?}
         */
        (item) => {
            if (item) {
                /** @type {?} */
                let equalIndex = item.indexOf('=');
                if (equalIndex > -1)
                    params[item.slice(0, equalIndex)] = item.slice(equalIndex + 1);
            }
        }));
        return params;
    }
    /**
     * @param {?=} params
     * @return {?}
     */
    buildQueryString(params) {
        /** @type {?} */
        let query = '';
        for (let k in params) {
            query += k + '=' + encodeURIComponent(params[k]) + '&';
        }
        return query.slice(0, -1);
    }
    /**
     * @param {?} usercode
     * @param {?=} domain
     * @return {?}
     */
    getUserAvatar(usercode, domain) {
        return AjaxAPI.getUrl('system/userprofile/photo', domain) +
            '?usercode=' + usercode + '&thumbnail=50';
    }
    /**
     * @param {?} event
     * @param {?} callback
     * @param {?=} currentOrganId
     * @param {?=} options
     * @return {?}
     */
    getPermissionOnEvent(event, callback, currentOrganId, options) {
        /** @type {?} */
        let mode = event.mode;
        if (this.isOther(mode)) {
            callback();
            return;
        }
        if (!event.uuid) {
            return callback({
                save: true,
                saveCreate: true
            });
        }
        currentOrganId = currentOrganId || this.getOrgId() || event.firmUUID;
        this.loadRole(currentOrganId, (/**
         * @return {?}
         */
        () => {
            this.indexEvent(event);
            /** @type {?} */
            let permissions;
            /** @type {?} */
            const canReview = this.isReviewer(currentOrganId) ||
                (this.isOwnReviewer(currentOrganId) && this.canOwnReviewEvent(event));
            /** @type {?} */
            const canReviewUpdate = !this.isCreate(mode) && !this.isCancel(mode) && canReview;
            if (event.firmUUID === currentOrganId) {
                /** @type {?} */
                const isEditMyEvent = this.canUpdateOwnEvent(event);
                if (event.type === CalSubType.PERSONAL && !this.getConfigValue('PERSONAL_CAN_PUBLISH')) {
                    // Personal calendar
                    permissions = {
                        save: isEditMyEvent,
                        delete: isEditMyEvent
                    };
                }
                else {
                    permissions = {
                        save: isEditMyEvent || canReviewUpdate,
                        approve: canReview && (this.isSent(mode) || isEditMyEvent),
                        reject: canReview && this.isSent(mode),
                        send: isEditMyEvent && !canReview,
                        revert: (this.isSent(mode) && event.isCreator) ||
                            ((this.isCancel(mode) || this.isPublish(mode)) && canReview),
                        cancel: canReview && this.isPublish(mode),
                        delete: isEditMyEvent
                    };
                }
            }
            else {
                // External update attendees
                permissions = {};
                if (this.isPublish(event.mode) && this.hasFirmAttendee(event, currentOrganId) &&
                    this.canExternalUpdateEvent(event, currentOrganId)) {
                    permissions = { updateAttendee: true };
                }
            }
            permissions.print = true;
            permissions.exportInvitation = this.catIsInvitation(event.category) && event._templateId;
            callback(permissions);
        }), options);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    canUpdateOwnEvent(event) {
        return event.isCreator && this.isCreate(event.mode);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    canReviewEvent(event) {
        return this.isReviewer(event.firmUUID);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    canOwnReviewEvent(event) {
        return this.isOwnReviewer(event.firmUUID) && event.isCreator;
    }
    /**
     * @param {?} event
     * @param {?} ownOrganId
     * @return {?}
     */
    canUpdateAttendee(event, ownOrganId) {
        return this.isFirmEvent(event, ownOrganId) && (this.canUpdateOwnEvent(event) ||
            this.canOwnReviewEvent(event) ||
            this.canReviewEvent(event));
    }
    /**
     * @param {?} event
     * @param {?} organId
     * @return {?}
     */
    canExternalUpdateEvent(event, organId) {
        return this.isPublish(event.mode) && !this.isFirmEvent(event, organId) && this.isReviewer(organId);
    }
    /**
     * @param {?} event
     * @param {?} ownOrganId
     * @return {?}
     */
    isFirmEvent(event, ownOrganId) {
        return event.firmUUID === ownOrganId;
    }
    /**
     * @param {?} params
     * @param {?} callback
     * @param {?=} options
     * @return {?}
     */
    searchAnyAttendee(params, callback, options) {
        this.searchUserAsAttendee(params, (/**
         * @param {?} users
         * @return {?}
         */
        (users) => {
            this.searchOrganAsAttendee(params, (/**
             * @param {?} orgs
             * @return {?}
             */
            (orgs) => {
                orgs.forEach((/**
                 * @param {?} org
                 * @return {?}
                 */
                (org) => users.push(org)));
                callback(users);
            }));
        }), options);
    }
    /**
     * @param {?} params
     * @param {?} callback
     * @param {?=} options
     * @return {?}
     */
    searchUserAsAttendee(params, callback, options) {
        /** @type {?} */
        let organId = params.orgid || this.getOrgId();
        /** @type {?} */
        let organName = this.getOrgNameById(organId);
        this.loadOrganMembers(organId, (/**
         * @param {?} members
         * @return {?}
         */
        (members) => {
            /** @type {?} */
            let keyword = params.keyword || '';
            /** @type {?} */
            let limit = params.limit || -1;
            /** @type {?} */
            let attendees = [];
            keyword = vnToLatin(keyword).toLowerCase();
            for (let i = 0; i < members.length; i++) {
                /** @type {?} */
                let member = members[i];
                if (!keyword || member._index.indexOf(keyword) > -1) {
                    /** @type {?} */
                    let attendee = this.memberToAttendee(member);
                    attendee.organId = organId;
                    attendee.organName = organName;
                    attendees.push(attendee);
                    if (limit > 0 && attendees.length >= limit) {
                        break;
                    }
                }
            }
            callback(attendees);
        }), options);
    }
    /**
     * @param {?} params
     * @param {?} callback
     * @param {?=} options
     * @return {?}
     */
    searchOrganAsAttendee(params, callback, options) {
        this.loadOrgByKeyword(params, (/**
         * @param {?} organs
         * @return {?}
         */
        (organs) => {
            callback(organs.map((/**
             * @param {?} organ
             * @return {?}
             */
            (organ) => this.organToAttendee(organ))));
        }), options);
    }
    /**
     * @param {?} fullname
     * @return {?}
     */
    insertPrefixAttendee(fullname) {
        if (this.getConfigValue('PREFIX_ATTENDEE_NAME')) {
            return this.getConfigValue('PREFIX_ATTENDEE_NAME') + fullname;
        }
        return fullname;
    }
    /**
     * @param {?} member
     * @return {?}
     */
    memberToAttendee(member) {
        return {
            username: member.username,
            fullname: member.fullname,
            display: this.insertPrefixAttendee(member.fullname),
            type: CalAttendeeType.USER
        };
    }
    /**
     * @param {?} organ
     * @return {?}
     */
    organToAttendee(organ) {
        return {
            organId: organ.firmUUID,
            organName: organ.firmName,
            type: CalAttendeeType.ORGAN
        };
    }
    /**
     * @param {?} alias
     * @param {?} organId
     * @return {?}
     */
    aliasToAttendee(alias, organId) {
        organId = organId || this.getOrgId();
        return {
            alias: alias,
            organId: organId,
            organName: this.getOrgNameById(organId),
            type: CalAttendeeType.ALIAS
        };
    }
    // Search user and orgs to select when create calendar
    /**
     * @param {?} params
     * @param {?} callback
     * @param {?=} options
     * @return {?}
     */
    loadAttendeeByName(params, callback, options) {
        if (!params || !params.keyword)
            return callback([]);
        // Limit user search
        params.limit = params.limit || 5;
        this.loadUserByKeyword(params, (/**
         * @param {?} users
         * @return {?}
         */
        (users) => {
            this.loadOrgByKeyword(params, (/**
             * @param {?} orgs
             * @return {?}
             */
            (orgs) => {
                callback(users.concat(orgs));
            }));
        }), options);
    }
    /**
     * @param {?} params
     * @param {?} callback
     * @param {?=} options
     * @return {?}
     */
    loadUserByKeyword(params, callback, options) {
        // Load all users and search on client
        this.searchAttendee({
            orgid: params.orgid
        }, (/**
         * @param {?} members
         * @return {?}
         */
        (members) => {
            /** @type {?} */
            let users = [];
            /** @type {?} */
            let keyword = vnToLatin(params.keyword.toLowerCase());
            for (let i = 0; i < members.length; i++) {
                /** @type {?} */
                let user = members[i];
                if (user._index.indexOf(keyword) > -1) {
                    users.push({
                        name: user.fullname,
                        value: user.username,
                        type: CalAttendeeType.USER,
                        member: user
                    });
                    if (users.length >= params.limit) {
                        break;
                    }
                }
            }
            callback(users);
        }), options);
    }
    /**
     * @param {?} params
     * @param {?} callback
     * @param {?=} options
     * @return {?}
     */
    loadOrgByKeyword(params, callback, options) {
        /** @type {?} */
        let data = [];
        this._loadOrgans((/**
         * @param {?} orgs
         * @return {?}
         */
        (orgs) => {
            // Filter orgs match
            /** @type {?} */
            let key = vnToLatin(params.keyword).toLowerCase();
            for (let i = 0; i < orgs.length; i++) {
                /** @type {?} */
                let item = orgs[i];
                if (item._index.indexOf(key) > -1) {
                    data.push(item);
                    if (data.length >= params.limit)
                        break;
                }
            }
            callback(data);
        }), options);
    }
    /**
     * @param {?} item
     * @param {?=} domain
     * @param {?=} event
     * @return {?}
     */
    getFileUrl(item, domain, event) {
        if (!item)
            return '';
        /** @type {?} */
        let orgid = item.orgid || this.getOrgId();
        /** @type {?} */
        let _role = this._userRoles[orgid];
        /** @type {?} */
        let url;
        if (_role && _role.isAuth && this.isMyOrg(orgid)) {
            url = 'calbuilder/binary/view';
        }
        else if (this.hasFirmAttendee(event, this.getOrgId())) {
            orgid = this.getOrgId();
            url = 'calbuilder/binary/view';
        }
        else {
            url = 'calbuilder/mainboard/binary/view';
        }
        return this.getUrlByOrgId(url, orgid, domain) + '?fileID=' + item.uuid + '&element=' + item.folder + '&orgid=' + orgid;
    }
    /**
     * @param {?} item
     * @param {?=} domain
     * @param {?=} event
     * @return {?}
     */
    getFileViewUrl(item, domain, event) {
        /** @type {?} */
        let url = this.getFileUrl(item, domain, event);
        if (item.file && item.file.slice(-3).toLowerCase() === "pdf") {
            url += '&view=pdf&t=' + new Date().getTime();
        }
        return url;
    }
    /**
     * @param {?} event
     * @param {?} organId
     * @return {?}
     */
    hasFirmAttendee(event, organId) {
        if (event && organId) {
            for (let i = 0; i < event.members.length; i++) {
                /** @type {?} */
                let member = event.members[i];
                if (member.type === CalAttendeeType.ORGAN && member.organId === organId) {
                    return true;
                }
            }
        }
    }
    /**
     * @param {?} uuid
     * @return {?}
     */
    getOrgByUid(uuid) {
        for (let i = 0; i < this._organs.length; i++) {
            if (this._organs[i].uuid === uuid) {
                return this._organs[i];
            }
        }
    }
    /**
     * @param {?} orgId
     * @return {?}
     */
    getOrgById(orgId) {
        for (let i = 0; i < this._organs.length; i++) {
            if (this._organs[i].firmUUID === orgId) {
                return this._organs[i];
            }
        }
    }
    /**
     * @param {?} orgId
     * @return {?}
     */
    getOrgNameById(orgId) {
        /** @type {?} */
        let organ = this.getOrgById(orgId);
        return organ && organ.firmName || '';
    }
    /**
     * @param {?} prefix
     * @return {?}
     */
    getOrgByPrefix(prefix) {
        for (let i = 0; i < this._organs.length; i++) {
            if (this._organs[i].firmPrefix === prefix) {
                return this._organs[i];
            }
        }
    }
    /**
     * @param {?} url
     * @param {?} orgid
     * @param {?=} domain
     * @return {?}
     */
    getUrlByOrgId(url, orgid, domain) {
        /** @type {?} */
        let item = this.getOrgById(orgid);
        return AjaxAPI.getUrl(url, domain, item && item.firmPrefix);
    }
    /**
     * @param {?} orgid
     * @param {?} callback
     * @param {?=} options
     * @return {?}
     */
    loadRole(orgid, callback, options) {
        orgid = orgid || this.getOrgId();
        if (this._userRoles[orgid]) {
            return callback(this._userRoles[orgid]);
        }
        this.sendRequest({
            url: this.roleUrl,
            data: { orgid: orgid },
            success: (/**
             * @param {?} data
             * @return {?}
             */
            (data) => {
                try {
                    data = JSON.parse(data);
                    if (data.isAuth) {
                        this._userRoles[orgid] = data;
                        iNet.usercode = data.usercode;
                    }
                    callback(data);
                }
                catch (e) {
                    callback({});
                }
            }),
            error: (/**
             * @return {?}
             */
            () => {
                callback({});
            })
        }, options, true);
    }
    /**
     * @param {?} organIds
     * @param {?} callback
     * @param {?=} options
     * @return {?}
     */
    loadRoles(organIds, callback, options) {
        /** @type {?} */
        let promises = [];
        organIds.forEach((/**
         * @param {?} organId
         * @return {?}
         */
        (organId) => {
            promises.push(new Promise(((/**
             * @param {?} resolve
             * @return {?}
             */
            resolve => {
                this.loadRole(organId, resolve, options);
            }))));
        }));
        Promise.all(promises).then((/**
         * @param {?} values
         * @return {?}
         */
        (values) => callback(values)));
    }
    /**
     * @param {?} events
     * @param {?=} date
     * @param {?=} firstDay
     * @return {?}
     */
    generateEventWeekView(events, date, firstDay) {
        /** @type {?} */
        let segEvents = [];
        /** @type {?} */
        let startWeek = DateUtils.getDateStartWeek(date, firstDay);
        for (let i = 0; i < 7; i++) {
            /** @type {?} */
            let dayOfYear = DateUtils.dayOfYear(startWeek);
            segEvents.push(this.generateEventView(events.filter((/**
             * @param {?} event
             * @return {?}
             */
            (event) => {
                return event.day === dayOfYear;
            })), startWeek));
            startWeek.setDate(startWeek.getDate() + 1);
        }
        return segEvents;
    }
    /**
     * @param {?} segEvents
     * @return {?}
     */
    getLastUpdateSegEvents(segEvents) {
        /** @type {?} */
        let lastUpdate;
        segEvents.forEach((/**
         * @param {?} segEvent
         * @return {?}
         */
        (segEvent) => {
            segEvent.items.forEach((/**
             * @param {?} event
             * @return {?}
             */
            (event) => {
                /** @type {?} */
                let lastUpdateEvent = event.updateDate || event.createDate;
                if (!lastUpdate || lastUpdate < lastUpdateEvent) {
                    lastUpdate = lastUpdateEvent;
                }
            }));
        }));
        return lastUpdate;
    }
    /**
     * @param {?} events
     * @param {?} date
     * @return {?}
     */
    generateEventView(events, date) {
        date = new Date(date);
        return {
            day: DateUtils.dayOfYear(date),
            display: this.getDisplayByDay(date.getDay()),
            dayStr: this.formatDateStr(date),
            isToday: DateUtils.dateIsToday(date),
            date: date,
            items: events
        };
    }
    /**
     * @param {?=} day
     * @return {?}
     */
    getDisplayByDay(day) {
        return this.resources.days[day];
    }
    /**
     * @param {?} members
     * @param {?=} role
     * @return {?}
     */
    buildMembers(members, role) {
        members.forEach((/**
         * @param {?} member
         * @return {?}
         */
        (member) => member.role = role || CalAttendeeRole.MEMBER));
        return members;
    }
    /**
     * @param {?} attendees
     * @return {?}
     */
    groupAttendeeByOrgan(attendees) {
        /** @type {?} */
        let data = {};
        attendees.forEach((/**
         * @param {?} attendee
         * @return {?}
         */
        function (attendee) {
            data[attendee.organId] = data[attendee.organId] || [];
            data[attendee.organId].push(attendee);
        }));
        return data;
    }
    /**
     * @param {?} event
     * @param {?} attendees
     * @param {?} ownOrganId
     * @param {?} callback
     * @param {?=} options
     * @return {?}
     */
    groupAttendeeByOrganRole(event, attendees, ownOrganId, callback, options) {
        if (attendees.length < 1) {
            return callback([]);
        }
        /** @type {?} */
        let groupByOrgans = this.groupAttendeeByOrgan(attendees);
        /** @type {?} */
        let organIds = Object.keys(groupByOrgans);
        if (organIds.indexOf(ownOrganId) < 0) {
            organIds.push(ownOrganId);
        }
        this.loadRoles(organIds, (/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            let internalUpdate = !event.uuid || this.canUpdateAttendee(event, ownOrganId);
            /** @type {?} */
            let data = [];
            Object.keys(groupByOrgans).forEach((/**
             * @param {?} organId
             * @return {?}
             */
            (organId) => {
                /** @type {?} */
                let isMyOrgan = organId === ownOrganId;
                /** @type {?} */
                let externalUpdate = isMyOrgan && this.canExternalUpdateEvent(event, organId);
                /** @type {?} */
                let attendees = groupByOrgans[organId];
                data.push({
                    organId: organId,
                    organName: this.getOrgNameById(organId),
                    internalUpdate: internalUpdate,
                    externalUpdate: externalUpdate,
                    updateAttendee: internalUpdate || externalUpdate,
                    attendees: attendees,
                    canRemoveAttendee: (/**
                     * @param {?} attendee
                     * @return {?}
                     */
                    function (attendee) {
                        return internalUpdate || (externalUpdate && attendee.type !== CalAttendeeType.ORGAN);
                    }),
                    canUpdateState: (/**
                     * @param {?} attendee
                     * @return {?}
                     */
                    (attendee) => {
                        return attendee.readTime !== undefined && isMyOrgan && this.attendeeIsMe(attendee);
                    })
                });
            }));
            callback(data);
        }), options);
    }
    /**
     * @param {?=} item
     * @return {?}
     */
    buildMemberStr(item) {
        item.members = item.members || [];
        return item.members.map((/**
         * @param {?} item
         * @return {?}
         */
        (item) => item.name)).join(',');
    }
    /**
     * @param {?} members
     * @return {?}
     */
    buildMemberShow(members) {
        return (members || []).map((/**
         * @param {?} item
         * @return {?}
         */
        (item) => item.name)).join(';');
    }
    /**
     * @param {?} data
     * @param {?=} event
     * @return {?}
     */
    modifyDataUpdate(data, event) {
        /** @type {?} */
        let attendeeJson = [];
        // Remove all members and rebuild
        if (data.attendee) {
            /** @type {?} */
            let newAttendees = data.attendee.filter((/**
             * @param {?} attendee
             * @return {?}
             */
            function (attendee) {
                return attendee.readTime === undefined;
            }));
            if (event && event.uuid) {
                /** @type {?} */
                let remainAttendees = data.attendee.filter((/**
                 * @param {?} attendee
                 * @return {?}
                 */
                function (attendee) {
                    return attendee.readTime !== undefined;
                }));
                event.members.forEach((/**
                 * @param {?} member
                 * @return {?}
                 */
                (member) => {
                    if (member.role !== CalAttendeeRole.CREATOR) {
                        if (remainAttendees.indexOf(member) < 0) {
                            attendeeJson.push(this.attendeeRemoveJson(member));
                        }
                    }
                }));
            }
            newAttendees.forEach((/**
             * @param {?} attendee
             * @return {?}
             */
            (attendee) => attendeeJson.push(this.attendeeAddJson(attendee))));
        }
        // Secure text update
        if (data.subject) {
            data.subject = this.formatTextUpdate(data.subject);
        }
        if (data.location) {
            data.location = this.formatTextUpdate(data.location);
        }
        data.attendee = JSON.stringify(attendeeJson);
        // Personal calendar
        if (!this.getConfigValue('PERSONAL_CAN_PUBLISH') && data.type === CalSubType.PERSONAL) {
            data.mode = CalMode.CREATE;
        }
        if (data.type === CalSubType.MEET_PEOPLE || data.type === CalSubType.PERSONAL) {
            data._subType = data.type;
            data.type = data.type.split(';')[0];
        }
        else {
            data._subType = '';
        }
        return data;
    }
    /**
     * @param {?} attendee
     * @return {?}
     */
    attendeeAddJson(attendee) {
        /** @type {?} */
        let obj = {
            organId: attendee.organId,
            organName: attendee.organName,
            role: attendee.role || CalAttendeeRole.MEMBER
        };
        switch (attendee.type) {
            case CalAttendeeType.USER:
                obj.members = attendee.username + ':' + attendee.fullname;
                obj.display = attendee.display;
                break;
            case CalAttendeeType.ORGAN:
                if (this.getConfigValue('EVENT_BETWEEN_UNIT')) {
                    obj.firms = attendee.organId + ':' + attendee.organName;
                }
                break;
            default:
                obj.alias = attendee.alias || attendee.organName;
        }
        return obj;
    }
    /**
     * @param {?} attendee
     * @return {?}
     */
    attendeeRemoveJson(attendee) {
        /** @type {?} */
        let obj = {
            organId: attendee.organId
        };
        switch (attendee.type) {
            case CalAttendeeType.USER:
                obj.members = attendee.username + ':REMOVE';
                break;
            case CalAttendeeType.ORGAN:
                obj.firms = attendee.organId + ':REMOVE';
                break;
            default:
                obj.alias = attendee.alias + ':REMOVE';
        }
        return obj;
    }
    /**
     * @param {?} data
     * @return {?}
     */
    _convertOrg(data) {
        data = data || [];
        for (let i = 0; i < data.length; i++) {
            /** @type {?} */
            let item = data[i];
            item.firmName = item.orgName || item.name;
            item.firmPrefix = item.uriPrefix || item.prefix;
            item.firmUUID = item.organId || item.organiId || '';
            this.indexOrgSearch(item);
        }
        // sort by name
        data.sort((/**
         * @param {?} a
         * @param {?} b
         * @return {?}
         */
        (a, b) => {
            return a.firmName.localeCompare(b.firmName);
        }));
        return data;
    }
    /**
     * @param {?} objectId
     * @return {?}
     */
    viewEventOnModal(objectId) {
        if (this._mapEvents[objectId]) {
            iNet.plugins.ready((/**
             * @param {?} plugins
             * @return {?}
             */
            (plugins) => {
                if (plugins.xcalendar) {
                    plugins.xcalendar.openView(this._mapEvents[objectId]);
                }
            }));
        }
    }
    // Save and get event
    /**
     * @param {?} objectId
     * @return {?}
     */
    getEventByObjectId(objectId) {
        return this._mapEvents[objectId];
    }
    /**
     * @param {?=} minutes
     * @return {?}
     */
    getTextForMinutes(minutes) {
        minutes = parseInt(minutes) || 1;
        if (minutes >= 60) {
            return Math.round(minutes / 60) + ' ' + this.resources.hour;
        }
        else {
            return minutes + ' ' + this.resources.minute;
        }
    }
    /**
     * @param {?} events
     * @return {?}
     */
    groupEventBySession(events) {
        /** @type {?} */
        let data = {
            allday: [],
            morning: [],
            afternoon: [],
            evening: []
        };
        events.forEach((/**
         * @param {?} item
         * @return {?}
         */
        (item) => {
            if (item.allDay) {
                data.allday.push(item);
            }
            else if (item.from.getHours() < 12) {
                data.morning.push(item);
            }
            else if (item.from.getHours() < 18) {
                data.afternoon.push(item);
            }
            else {
                data.evening.push(item);
            }
        }));
        for (let k in data) {
            this.sortEvents(data[k]);
        }
        return data;
    }
    /**
     * @param {?} events
     * @param {?} persons
     * @param {?} date
     * @return {?}
     */
    groupEventByPerson(events, persons, date) {
        /** @type {?} */
        let data = {
            persons: [],
            segEvents: this.generateEventWeekView(events, date)
        };
        /** @type {?} */
        let eventByDays = data.segEvents.map((/**
         * @param {?} segEvent
         * @return {?}
         */
        function (segEvent) {
            return segEvent.items;
        }));
        persons.forEach((/**
         * @param {?} person
         * @return {?}
         */
        (person) => {
            /** @type {?} */
            let eventDays = eventByDays.map((/**
             * @param {?} events
             * @return {?}
             */
            (events) => events.filter((/**
             * @param {?} event
             * @return {?}
             */
            event => this.memberIsAttendee(event, person.name)))));
            data.persons.push({
                person: person,
                eventDays: eventDays
            });
        }));
        return data;
    }
    /**
     * @param {?} events
     * @param {?} organId
     * @param {?} callback
     * @param {?=} options
     * @return {?}
     */
    groupEventByLeaders(events, organId, callback, options) {
        this.loadLeaders(organId, (/**
         * @param {?} leaders
         * @return {?}
         */
        (leaders) => {
            /** @type {?} */
            let dataLeaders = [];
            /** @type {?} */
            let otherEvents = [];
            leaders.forEach((/**
             * @param {?} leader
             * @return {?}
             */
            (leader) => dataLeaders.push({
                username: leader.name,
                fullname: leader.value,
                events: []
            })));
            events.forEach((/**
             * @param {?} event
             * @return {?}
             */
            (event) => {
                /** @type {?} */
                let isFound;
                for (let i = 0; i < dataLeaders.length; i++) {
                    /** @type {?} */
                    let item = dataLeaders[i];
                    if (this.memberIsAttendee(event, item.username)) {
                        isFound = true;
                        item.events.push(event);
                    }
                }
                if (!isFound) {
                    otherEvents.push(event);
                }
            }));
            callback(dataLeaders, otherEvents);
        }), options, true);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    meIsCreator(event) {
        for (let i = event.members.length - 1; i >= 0; i--) {
            if (event.members[i].role === CalAttendeeRole.CREATOR && this.attendeeIsMe(event.members[i])) {
                return true;
            }
        }
        return false;
    }
    /**
     * @param {?} attendde
     * @return {?}
     */
    attendeeIsMe(attendde) {
        return this.usernameIsMe(attendde.username);
    }
    /**
     * @param {?} attendde
     * @return {?}
     */
    attendeeDisplay(attendde) {
        return attendde.alias || attendde.display || attendde.fullname || attendde.username || attendde.organName;
    }
    /**
     * @param {?} attendde
     * @return {?}
     */
    attendeeValue(attendde) {
        return attendde.alias || attendde.username || attendde.organId;
    }
    /**
     * @param {?} text
     * @return {?}
     */
    formatTextDisplay(text) {
        /** @type {?} */
        let display = this.formatTextUpdate(text);
        // break line
        display = display.replace(/\n/g, '<br>');
        return display;
    }
    /**
     * @param {?} text
     * @return {?}
     */
    formatTextUpdate(text) {
        /** @type {?} */
        let $fragment = $('<div>').html(text);
        $fragment.find('style,script').remove();
        return $fragment.html();
    }
    /**
     * @param {?} event
     * @param {?} member
     * @return {?}
     */
    memberIsAttendee(event, member) {
        // for (let i = 0; i < event.members.length; i++) {
        //     if (event.members[i].role !== CalAttendeeRole.CREATOR && event.members[i].username === member) {
        //         return true;
        //     }
        // }
        for (let i = 0; i < event.members.length; i++) {
            if (event.members[i].username === member) {
                return true;
            }
        }
    }
    /**
     * @param {?} event
     * @param {?} username
     * @return {?}
     */
    getAttendeeByUsername(event, username) {
        for (let i = 0; i < event.members.length; i++) {
            if (event.members[i].username === username) {
                return event.members[i];
            }
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    getAttendeeIsMe(event) {
        for (let i = 0; i < event.members.length; i++) {
            /** @type {?} */
            let member = event.members[i];
            if (member.role !== CalAttendeeRole.CREATOR && this.usernameIsMe(member.username)) {
                return member;
            }
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    eventIsViewed(event) {
        /** @type {?} */
        let attendee = this.getAttendeeIsMe(event);
        return !attendee || attendee.readTime;
    }
    /**
     * @param {?} username
     * @return {?}
     */
    usernameIsMe(username) {
        return username === iNet.usercode;
    }
    /**
     * @param {?} data
     * @param {?=} options
     * @param {?=} cacheResponse
     * @return {?}
     */
    sendRequest(data, options, cacheResponse) {
        /** @type {?} */
        let option = this._buildAjaxOptions(data, options);
        if (cacheResponse) {
            /** @type {?} */
            let keyCache = option.url;
            if (option.data && Object.keys(option.data).length > 0) {
                keyCache += JSON.stringify(option.data);
            }
            /** @type {?} */
            let dataCached = this.cacheDataTemp(keyCache);
            if (dataCached) {
                return option.success(dataCached);
            }
            this.addQueue(keyCache, (/**
             * @param {?} resolve
             * @return {?}
             */
            (resolve) => {
                /** @type {?} */
                let _option = $.extend({}, option);
                _option.success = (/**
                 * @param {?} data
                 * @return {?}
                 */
                (data) => {
                    this.cacheDataTemp(keyCache, data);
                    resolve(data);
                });
                _option.error = (/**
                 * @param {?} error
                 * @return {?}
                 */
                (error) => {
                    resolve(null, error);
                });
                AjaxAPI.sendRequest(_option);
            }), (/**
             * @param {?} data
             * @param {?} error
             * @return {?}
             */
            (data, error) => {
                if (error) {
                    option.error && option.error(error);
                }
                else {
                    option.success && option.success(data);
                }
            }));
        }
        else {
            return AjaxAPI.sendRequest(option);
        }
    }
    /**
     * @param {?} data
     * @param {?=} options
     * @return {?}
     */
    postForm(data, options) {
        return AjaxAPI.postForm(this._buildAjaxOptions(data, options));
    }
    /**
     * @param {?} data
     * @param {?=} options
     * @return {?}
     */
    _buildAjaxOptions(data, options) {
        /** @type {?} */
        let option = $.extend({}, data, options);
        /** @type {?} */
        let orgid = option.data && option.data.orgid || this.getOrgId();
        /** @type {?} */
        let org = this.getOrgById(orgid);
        /** @type {?} */
        let isLocalFirm = org && org.firmPrefix === iNet.path.slice(1);
        /** @type {?} */
        let isUseOrgId = !option.removeOrgId && (isLocalFirm || option.useOrgId);
        if (isUseOrgId) {
            option.data = option.data || {};
            option.data.orgid = orgid;
        }
        else if (option.data) {
            delete option.data.orgid;
        }
        option.url = this.getUrlByOrgId(option.url, orgid, option.domain);
        return option;
    }
    /**
     * @return {?}
     */
    _getOrganOnInit() {
        /** @type {?} */
        let organ;
        /** @type {?} */
        let params = this.getQueryParams();
        // Get by url query
        if (params['orgid']) {
            this.setOrgId(params['orgid']);
            organ = this.getOrgById(params['orgid']);
        }
        // get organ by firm prefix
        if (!organ && iNet.firmPrefix !== 'smartcloud') {
            organ = this.getOrgByPrefix(iNet.firmPrefix);
        }
        // Get organ active recently
        if (!organ) {
            /** @type {?} */
            let organId = this.getOrgId() || iNet.organId;
            organ = this.getOrgById(organId);
        }
        // Get organ local
        if (!organ) {
            organ = this.getOrgByPrefix(iNet.path.slice(1));
        }
        // get organ first
        if (!organ) {
            organ = this._myOrgans && this._myOrgans[0] || this._organs && this._organs[0];
        }
        if (organ) {
            this.setOrgId(organ.firmUUID);
        }
        return organ;
    }
    /**
     * @param {?} cars
     * @param {?} events
     * @return {?}
     */
    groupEventByCar(cars, events) {
        /** @type {?} */
        let data = [];
        cars.forEach((/**
         * @param {?} car
         * @return {?}
         */
        function (car) {
            data.push({
                car: car,
                events: []
            });
        }));
        events.forEach((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            /** @type {?} */
            let carData = data[0];
            if (event._carUUID) {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].car.uuid === event._carUUID) {
                        carData = data[i];
                    }
                }
            }
            carData.events.push(event);
        }));
        return data;
    }
    /**
     * @param {?} events
     * @return {?}
     */
    filterMeetPeopleEvents(events) {
        return events.filter((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            return event._subType === CalSubType.MEET_PEOPLE;
        }));
    }
    /**
     * @param {?} executor
     * @param {?} params
     * @param {?} callback
     * @param {?} options
     * @return {?}
     */
    _loadOnDifferYear(executor, params, callback, options) {
        if (!params.from || !params.to || params.from <= params.to) {
            executor.apply(this, [params, callback, options]);
        }
        else {
            // Load in differ year
            /** @type {?} */
            let promises = [];
            /** @type {?} */
            let endOfYear = new Date(params.year + 1, 0);
            endOfYear.setTime(endOfYear.getTime() - 1);
            /** @type {?} */
            let params1 = $.extend({}, params);
            /** @type {?} */
            let options1 = $.extend({}, options);
            params1.to = DateUtils.dayOfYear(endOfYear);
            promises.push(new Promise((/**
             * @param {?} resolve
             * @return {?}
             */
            (resolve) => {
                executor.apply(this, [params1, resolve, options1]);
            })));
            /** @type {?} */
            let params2 = $.extend({}, params);
            /** @type {?} */
            let options2 = $.extend({}, options);
            params2.year = params.year + 1;
            params2.from = 1;
            promises.push(new Promise((/**
             * @param {?} resolve
             * @return {?}
             */
            (resolve) => {
                executor.apply(this, [params2, resolve, options2]);
            })));
            Promise.all(promises).then((/**
             * @param {?} values
             * @return {?}
             */
            (values) => {
                /** @type {?} */
                let events = [].concat.apply([], values);
                this.removeEventDuplicate(events);
                callback(events);
            }));
        }
    }
    /**
     * @param {?} params
     * @param {?} date
     * @param {?} callback
     * @param {?=} options
     * @return {?}
     */
    loadMonthEvents(params, date, callback, options) {
        /** @type {?} */
        let from;
        /** @type {?} */
        let to;
        date = new Date(date);
        // Start month
        date.setDate(1);
        // Start date of week
        from = DateUtils.getDateStartWeek(date);
        // End month
        date.setMonth(date.getMonth() + 1);
        date.setTime(date.getTime() - 1);
        // End date of week
        to = DateUtils.getDateEndWeek(date);
        params = $.extend({}, params, this.getRangeParams(from, to));
        if (this.isMyOrg(params.orgid)) {
            this.getListEvents(params, callback, options);
        }
        else {
            this.loadPublishEvents(params, callback, options);
        }
    }
    /**
     * @param {?} calEvent
     * @param {?} domain
     * @return {?}
     */
    getExportUrl(calEvent, domain) {
        if (calEvent && calEvent.uuid && calEvent._templateId) {
            return this.getUrlByOrgId('calbuilder/invitation/export', calEvent.firmUUID, domain) +
                '?templateID=' + calEvent._templateId +
                '&element=' + calEvent.uuid;
        }
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getWeekParams(date) {
        /** @type {?} */
        let weekRange = DateUtils.getWeekRange(date);
        return this.getRangeParams(weekRange.startWeek, weekRange.endWeek);
    }
    /**
     * @param {?} from
     * @param {?} to
     * @return {?}
     */
    getRangeParams(from, to) {
        return {
            year: from.getFullYear(),
            from: DateUtils.dayOfYear(from),
            to: DateUtils.dayOfYear(to)
        };
    }
    /**
     * @param {?} date
     * @param {?} weekParams
     * @return {?}
     */
    dateEqualWeekParams(date, weekParams) {
        /** @type {?} */
        let params = this.getWeekParams(date);
        return date && weekParams && params.year === weekParams.year &&
            params.from === weekParams.from &&
            params.to === weekParams.to;
    }
    /**
     * @param {?} event
     * @param {?=} params
     * @return {?}
     */
    eventIsOnRange(event, params) {
        return (params.startTime >= event.startTime && params.startTime < event.toTime) ||
            (params.toTime <= event.toTime && params.toTime > event.startTime) ||
            (params.startTime <= event.startTime && params.toTime >= event.toTime);
    }
    /**
     * @param {?} params
     * @param {?} callback
     * @param {?=} options
     * @return {?}
     */
    verifyDuplicateEvents(params, callback, options) {
        /** @type {?} */
        let duplicateEvents = [];
        this.loadPublishEvents({
            year: params.year,
            day: params.day,
            orgid: params.orgid || this.getOrgId()
        }, (/**
         * @param {?} events
         * @return {?}
         */
        (events) => {
            /** @type {?} */
            let allEvents = [];
            if (this.catIsCar(params.category)) {
                events = events.filter((/**
                 * @param {?} event
                 * @return {?}
                 */
                (event) => this.catIsCar(event.category)));
            }
            else {
                events = events.filter((/**
                 * @param {?} event
                 * @return {?}
                 */
                (event) => !this.catIsCar(event.category)));
            }
            /** @type {?} */
            const detector = (/**
             * @param {?} username
             * @return {?}
             */
            (username) => {
                /** @type {?} */
                let obj = {
                    username: username,
                    events: []
                };
                events.forEach((/**
                 * @param {?} event
                 * @return {?}
                 */
                (event) => {
                    /** @type {?} */
                    let member = this.getAttendeeByUsername(event, username);
                    if (member) {
                        obj.fullname = member.fullname;
                        obj.events.push(event);
                        allEvents.push(event);
                    }
                }));
                if (obj.events.length > 0) {
                    duplicateEvents.push(obj);
                }
            });
            events = events.filter((/**
             * @param {?} event
             * @return {?}
             */
            (event) => {
                return event.mode === CalMode.PUBLISH && event.uuid !== params.element &&
                    this.eventIsOnRange(event, params);
            }));
            if (params.attendee) {
                params.attendee.forEach((/**
                 * @param {?} attendee
                 * @return {?}
                 */
                (attendee) => detector(attendee.username)));
            }
            // Todo: creator is attendee
            /** @type {?} */
            let isExist = false;
            for (let i = 0; i < duplicateEvents.length; i++) {
                if (duplicateEvents[i].username === iNet.usercode) {
                    isExist = true;
                    break;
                }
            }
            if (!isExist) {
                detector(iNet.usercode);
            }
            duplicateEvents['allEvents'] = this.removeEventDuplicate(allEvents);
            callback(duplicateEvents);
        }), options);
    }
    /**
     * @param {?} params
     * @param {?} event
     * @return {?}
     */
    needVerifyDuplicate(params, event) {
        /** @type {?} */
        var isEventPublished = event.mode === CalMode.PUBLISH;
        /** @type {?} */
        var actionPublish = !isEventPublished && Number(params.mode) === CalMode.PUBLISH;
        /** @type {?} */
        var isTimeChanged = event.uuid && ((params.startTime && event.startTime !== params.startTime) ||
            (params.toTime && event.toTime !== params.toTime) ||
            (params.day && event.day !== params.day)) && isEventPublished;
        return actionPublish || isTimeChanged;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    subjectDisplayWithMaxLength(event) {
        // Subject max length
        /** @type {?} */
        var maxLength = Number(this.getConfigValue('SUBJECT_DISPLAY_MAX_LENGTH')) || 0;
        // Display view more
        if (maxLength > 0 && maxLength < event.subject.length) {
            /** @type {?} */
            var subjectDisplay = event.subject.substr(0, maxLength);
            subjectDisplay = this.formatTextDisplay(subjectDisplay);
            subjectDisplay += '...';
            return this.formatTextDisplay(subjectDisplay);
        }
        return event.subjectDisplay;
    }
    // SubFirm Dictionary Utils
    /**
     * @param {?} data
     * @param {?} callback
     * @param {?=} options
     * @return {?}
     */
    dictCreate(data, callback, options) {
        return this.sendRequest({
            type: 'post',
            url: 'subfirm/dictionary/create',
            data: data,
            success: callback
        }, options);
    }
    /**
     * @param {?} data
     * @param {?} callback
     * @param {?=} options
     * @return {?}
     */
    dictUpdate(data, callback, options) {
        data.dictID = data.dictID || data.uuid;
        return this.sendRequest({
            type: 'post',
            url: 'subfirm/dictionary/update',
            data: data,
            success: callback
        }, options);
    }
    /**
     * @param {?} data
     * @param {?} callback
     * @param {?=} options
     * @return {?}
     */
    dictRemove(data, callback, options) {
        data.dictID = data.dictID || data.uuid;
        return this.sendRequest({
            type: 'post',
            url: 'subfirm/dictionary/remove',
            data: data,
            success: callback
        }, options);
    }
    /**
     * @param {?} params
     * @param {?} callback
     * @param {?=} options
     * @param {?=} cacheResponse
     * @return {?}
     */
    dictList(params, callback, options, cacheResponse) {
        // reference: required
        return this.sendRequest({
            type: 'post',
            url: 'subfirm/dictionary/list',
            data: params,
            success: (/**
             * @param {?} data
             * @return {?}
             */
            (data) => callback(data && data.items || [])),
            error: (/**
             * @return {?}
             */
            () => callback([]))
        }, options, cacheResponse);
    }
    // Leader
    /**
     * @param {?} organId
     * @param {?} callback
     * @param {?=} options
     * @param {?=} cacheResponse
     * @return {?}
     */
    loadLeaders(organId, callback, options, cacheResponse) {
        /** @type {?} */
        let params = {
            orgid: organId || this.getOrgId(),
            reference: LEADER_REFERENCE
        };
        this.dictList(params, (/**
         * @param {?} leaders
         * @return {?}
         */
        function (leaders) {
            leaders.sort((/**
             * @param {?} a
             * @param {?} b
             * @return {?}
             */
            function (a, b) {
                return b.order - a.order;
            }));
            callback(leaders);
        }), options, cacheResponse);
    }
    /**
     * @param {?} data
     * @param {?} callback
     * @param {?=} options
     * @return {?}
     */
    leaderCreateOrUpdate(data, callback, options) {
        if (!data.uuid) {
            data.reference = LEADER_REFERENCE;
            this.dictCreate(data, callback, options);
        }
        else {
            this.dictUpdate(data, callback, options);
        }
    }
    /**
     * @param {?} data
     * @param {?} callback
     * @param {?=} options
     * @return {?}
     */
    leaderRemove(data, callback, options) {
        this.dictRemove(data, callback, options);
    }
}
if (false) {
    /** @type {?} */
    CalBuilder.prototype.isAuth;
    /** @type {?} */
    CalBuilder.prototype.orgid;
    /** @type {?} */
    CalBuilder.prototype.TIME_NEW_UPDATE;
    /** @type {?} */
    CalBuilder.prototype.roleUrl;
    /** @type {?} */
    CalBuilder.prototype.MODE;
    /** @type {?} */
    CalBuilder.prototype.ROLE;
    /** @type {?} */
    CalBuilder.prototype.calSubType;
    /** @type {?} */
    CalBuilder.prototype.calCategory;
    /** @type {?} */
    CalBuilder.prototype.vnToLatin;
    /** @type {?} */
    CalBuilder.prototype.dateUtils;
    /** @type {?} */
    CalBuilder.prototype.calAttendeeType;
    /** @type {?} */
    CalBuilder.prototype.calAttendeeState;
    /** @type {?} */
    CalBuilder.prototype.calType;
    /** @type {?} */
    CalBuilder.prototype.subFirmDic;
    /** @type {?} */
    CalBuilder.prototype.carUtils;
    /** @type {?} */
    CalBuilder.prototype.configs;
    /** @type {?} */
    CalBuilder.prototype.resources;
    /** @type {?} */
    CalBuilder.prototype._userRoles;
    /** @type {?} */
    CalBuilder.prototype._mapEvents;
    /** @type {?} */
    CalBuilder.prototype._cacheStore;
    /** @type {?} */
    CalBuilder.prototype._queue;
    /** @type {?} */
    CalBuilder.prototype._organs;
    /** @type {?} */
    CalBuilder.prototype._myOrgans;
    /** @type {?} */
    CalBuilder.prototype.typeIsDepartment;
    /** @type {?} */
    CalBuilder.prototype.typeIsCommunity;
    /** @type {?} */
    CalBuilder.prototype.typeIsOrganization;
    /** @type {?} */
    CalBuilder.prototype.catIsInvitation;
    /** @type {?} */
    CalBuilder.prototype.catIsPersonal;
    /** @type {?} */
    CalBuilder.prototype.catIsCar;
    /** @type {?} */
    CalBuilder.prototype.catIsImportant;
    /** @type {?} */
    CalBuilder.prototype.formatDateStr;
    /** @type {?} */
    CalBuilder.prototype.formatTimeStr;
    /** @type {?} */
    CalBuilder.prototype.formatDateTimeStr;
    /** @type {?} */
    CalBuilder.prototype.formatDate;
    /** @type {?} */
    CalBuilder.prototype.getEventStatus;
    /** @type {?} */
    CalBuilder.prototype.isCreate;
    /** @type {?} */
    CalBuilder.prototype.isPublish;
    /** @type {?} */
    CalBuilder.prototype.isSent;
    /** @type {?} */
    CalBuilder.prototype.isCancel;
    /** @type {?} */
    CalBuilder.prototype.isOther;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
let xCalendar = new CalBuilder();
xCalendar._applyConfig();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class CalendarDialogDelete {
    /**
     * @param {?} calendarService
     */
    constructor(calendarService) {
        this.calendarService = calendarService;
        this.onDelete = new EventEmitter();
        this.dialogTitle = 'Lịch công tác';
        this.dialogContent = '';
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this._initDialogDelete();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._destroyDialogDelete();
    }
    /**
     * @return {?}
     */
    hide() {
        this.confirmDialog.hide();
    }
    /**
     * @return {?}
     */
    delete() {
        this.calendarService.removeEvent({
            element: this.calEvent.uuid,
            orgid: this.calEvent.firmUUID
        }, (/**
         * @return {?}
         */
        () => {
            this.hide();
            this.onDelete.emit();
        }));
    }
    /**
     * @return {?}
     */
    show() {
        this.dialogContent = 'Bạn có đồng ý xóa sự kiện <b>"' + this.calEvent.subject + '"</b> không?';
        this.confirmDialog.show();
    }
    /**
     * @private
     * @return {?}
     */
    _initDialogDelete() {
        this._$dialogDelete = $(this.dialogDelete.nativeElement).hide();
        // Click outside to close
        this.hide = this.hide.bind(this);
        document.body.addEventListener('click', this.hide);
        // Prevent close
        this._$dialogDelete.on('click', (/**
         * @param {?} e
         * @return {?}
         */
        (e) => e.stopPropagation()));
        // Append modal to body
        $(document.body).append(this._$dialogDelete);
    }
    /**
     * @private
     * @return {?}
     */
    _destroyDialogDelete() {
        document.body.removeEventListener('click', this.hide);
        this._$dialogDelete.remove();
    }
}
CalendarDialogDelete.decorators = [
    { type: Component, args: [{
                selector: 'calendar-dialog-delete',
                template: "<div #dialogDelete class=\"modal fade\" bsModal #confirmDialog=\"bs-modal\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">\n    <div class=\"modal-dialog\" role=\"document\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <h4 class=\"modal-title pull-left\"> {{dialogTitle}}</h4>\n                <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"hide()\">\n                    <span aria-hidden=\"true\">&times;</span>\n                </button>\n            </div>\n            <div class=\"modal-body\" [innerHTML]=\"dialogContent\">\n            </div>\n            <div class=\"modal-footer\">\n                <div class=\"text-right\">\n                    <button type=\"button\" class=\"btn btn-lg btn-danger btn-sm\" (click)=\"delete()\">\n                        <i class=\"fa fa-trash\"></i> X\u00F3a\n                    </button>\n                    <button type=\"button\" class=\"btn btn-lg btn-default ml-2 btn-sm\" (click)=\"hide()\">\n                        <i class=\"fa fa-times\"></i> \u0110\u00F3ng\n                    </button>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>",
                styles: [""]
            }] }
];
/** @nocollapse */
CalendarDialogDelete.ctorParameters = () => [
    { type: CalendarService }
];
CalendarDialogDelete.propDecorators = {
    calEvent: [{ type: Input }],
    onDelete: [{ type: Output }],
    confirmDialog: [{ type: ViewChild, args: [ModalDirective,] }],
    dialogDelete: [{ type: ViewChild, args: ['dialogDelete',] }]
};
if (false) {
    /** @type {?} */
    CalendarDialogDelete.prototype.calEvent;
    /** @type {?} */
    CalendarDialogDelete.prototype.onDelete;
    /** @type {?} */
    CalendarDialogDelete.prototype.confirmDialog;
    /** @type {?} */
    CalendarDialogDelete.prototype.dialogDelete;
    /** @type {?} */
    CalendarDialogDelete.prototype.dialogTitle;
    /** @type {?} */
    CalendarDialogDelete.prototype.dialogContent;
    /**
     * @type {?}
     * @private
     */
    CalendarDialogDelete.prototype._$dialogDelete;
    /**
     * @type {?}
     * @private
     */
    CalendarDialogDelete.prototype.calendarService;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const moment$1 = moment_;
moment$1.locale('vi');
class CalendarUtils {
    /**
     * @param {?} data
     * @return {?}
     */
    static getRepeatText(data) {
        /** @type {?} */
        let display = '';
        for (let i = 0; i < CalendarUtils.repeatTypes.length; i++) {
            if (CalendarUtils.repeatTypes[i].value === data.rrmode) {
                display = CalendarUtils.repeatTypes[i].label;
            }
        }
        if (data.rrmode === 'WEEKLY') {
            display += ' - ' + CalendarUtils._getTextRepeatWeek(data.wkdays);
        }
        return display;
    }
    /**
     * @param {?} wkdays
     * @return {?}
     */
    static _getTextRepeatWeek(wkdays) {
        if (wkdays) {
            return CalendarUtils.weekDays.filter((/**
             * @param {?} day
             * @return {?}
             */
            day => {
                return wkdays.indexOf(day.value) > -1;
            })).map((/**
             * @param {?} day
             * @return {?}
             */
            day => {
                return day.title;
            })).join(', ');
        }
        return '';
    }
    /**
     * @param {?} date
     * @return {?}
     */
    static displayDay(date) {
        /** @type {?} */
        let str = moment$1(date).format('dddd, d MMMM');
        if (new Date().getFullYear() !== date.getFullYear()) {
            str += ' năm ' + date.getFullYear();
        }
        return str.slice(0, 1).toUpperCase() + str.slice(1);
    }
    /**
     * @param {?} date
     * @return {?}
     */
    static displayDate(date) {
        return moment$1(date).format('[Ngày] LL');
    }
    /**
     * @param {?} date
     * @return {?}
     */
    static displayWeek(date) {
        return moment$1(date).format('[Tuần] w [năm] Y');
    }
    /**
     * @param {?} date
     * @return {?}
     */
    static displayMonth(date) {
        return moment$1(date).format('[Tháng] MM [năm] Y');
    }
    /**
     * @param {?} date
     * @return {?}
     */
    static displayTime(date) {
        return moment$1(date).format('HH:mm');
    }
    /**
     * @param {?} element
     * @param {?} e
     * @param {?=} padding
     * @return {?}
     */
    static computePosByPoint(element, e, padding) {
        /** @type {?} */
        let bounds = element.getBoundingClientRect();
        /** @type {?} */
        let halfHeight = bounds.height / 2;
        /** @type {?} */
        let halfWidth = bounds.width / 2;
        /** @type {?} */
        let direction;
        /** @type {?} */
        let pos = {
            left: e.x - halfWidth,
            top: e.y - halfHeight
        };
        padding = padding || 5;
        // Position out of width
        if (innerWidth < pos.left + bounds.width + padding) {
            pos.left = innerWidth - padding - bounds.width;
        }
        else if (pos.left < padding) {
            pos.left = padding;
        }
        // Position out of height
        if (innerHeight < pos.top + bounds.height + padding) {
            pos.top = innerHeight - padding - bounds.height;
        }
        else if (pos.top < padding) {
            pos.top = padding;
        }
        // Detect best position
        /** @type {?} */
        let deltaTop = e.pageY;
        /** @type {?} */
        let deltaBottom = innerHeight - e.pageX;
        /** @type {?} */
        let deltaLeft = e.pageX;
        /** @type {?} */
        let deltaRight = innerWidth - e.pageY;
        /** @type {?} */
        let deltaMax = Math.max(deltaTop, deltaRight, deltaBottom, deltaLeft);
        switch (deltaMax) {
            case deltaTop:
                direction = 'top';
                pos.top -= halfHeight + padding;
                break;
            case deltaBottom:
                direction = 'bottom';
                pos.top += halfHeight + padding;
                break;
            case deltaLeft:
                direction = 'left';
                pos.left -= halfWidth + padding;
                break;
            case deltaRight:
                direction = 'right';
                pos.left += halfWidth + padding;
                break;
        }
        return {
            direction: direction,
            position: pos,
            elementBounds: bounds
        };
    }
    /**
     * @param {?} element
     * @param {?} target
     * @param {?} jsEvent
     * @param {?=} padding
     * @return {?}
     */
    static computePosByTargetEl(element, target, jsEvent, padding) {
        /** @type {?} */
        let elementBounds = element.getBoundingClientRect();
        /** @type {?} */
        let targetBounds = target.getBoundingClientRect();
        /** @type {?} */
        let pos = {};
        /** @type {?} */
        let direction = {};
        padding = padding || 10;
        /** @type {?} */
        let deltaRect = {
            top: targetBounds.top,
            right: innerWidth - targetBounds.right,
            bottom: innerHeight - targetBounds.bottom,
            left: targetBounds.left
        };
        /** @type {?} */
        let maxX = Math.max(deltaRect.left, deltaRect.right);
        /** @type {?} */
        let maxY = Math.max(deltaRect.top, deltaRect.bottom);
        // Get click point when left and right not enough modal
        if (elementBounds.width > maxX) {
            deltaRect.left = jsEvent.pageX;
            deltaRect.right = innerWidth - jsEvent.pageX;
        }
        // Get click point when top and bottom not enough modal
        if (elementBounds.height > maxY) {
            deltaRect.top = jsEvent.pageY;
            deltaRect.bottom = innerHeight - jsEvent.pageY;
        }
        // X direction
        if (deltaRect.left > deltaRect.right) {
            direction.left = true;
            pos.left = deltaRect.left - elementBounds.width;
        }
        else {
            direction.right = true;
            pos.left = innerWidth - deltaRect.right;
        }
        // Y direction
        if (deltaRect.top > deltaRect.bottom) {
            direction.top = true;
            pos.top = deltaRect.top - elementBounds.height;
        }
        else {
            direction.bottom = true;
            pos.top = innerHeight - deltaRect.bottom;
        }
        // Best dimension to display
        if (maxX * elementBounds.width > maxY * elementBounds.height) {
            // By x
            /** @type {?} */
            let targetHeight = innerHeight - deltaRect.bottom - deltaRect.top;
            if (direction.top) {
                pos.top += targetHeight;
            }
            else {
                pos.top -= targetHeight;
            }
        }
        else {
            // By y
            /** @type {?} */
            let targetWidth = innerWidth - deltaRect.left - deltaRect.right;
            if (direction.left) {
                pos.left += targetWidth;
            }
            else {
                pos.left -= targetWidth;
            }
        }
        // Out of width
        if (pos.left < padding) {
            pos.left = padding;
        }
        else if (pos.left + elementBounds.width > innerWidth) {
            pos.left = innerWidth - elementBounds.width - padding;
        }
        // Out of height
        if (pos.top < padding) {
            pos.top = padding;
        }
        else if (pos.top + elementBounds.height > innerHeight) {
            pos.top = innerHeight - elementBounds.height - padding;
        }
        // compute with document scroll
        pos.top += document.scrollingElement.scrollTop;
        pos.left += document.scrollingElement.scrollLeft;
        return pos;
    }
}
CalendarUtils.repeatTypes = [
    { label: 'Hàng ngày', value: 'DAILY' },
    { label: 'Hàng tuần', value: 'WEEKLY' },
    { label: 'Hàng tháng', value: 'MONTHLY' }
];
CalendarUtils.weekDays = [
    { label: 'T2', title: 'Thứ hai', value: 'MO' },
    { label: 'T3', title: 'Thứ ba', value: 'TU' },
    { label: 'T4', title: 'Thứ tư', value: 'WE' },
    { label: 'T5', title: 'Thứ năm', value: 'TH' },
    { label: 'T6', title: 'Thứ sáu', value: 'FR' },
    { label: 'T7', title: 'Thứ bảy', value: 'SA' },
    { label: 'CN', title: 'Chủ nhật', value: 'SU' }
];
if (false) {
    /** @type {?} */
    CalendarUtils.repeatTypes;
    /** @type {?} */
    CalendarUtils.weekDays;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class CalendarEvent {
    /**
     * @param {?} event
     */
    constructor(event) {
        this.repeatText = '';
        this.timeDisplay = '';
        this.event = event;
        this.subject = HtmlUtils.formatHtmlDisplay(event.subject);
        this.summary = HtmlUtils.formatHtmlDisplay(event.summary);
        if (event.members) {
            this.myAttendee = event.members.find((/**
             * @param {?} item
             * @return {?}
             */
            item => {
                return item.role !== 'CREATOR' && item.username === iNet.username;
            }));
        }
        if (event.repeat) {
            this.repeatText = CalendarUtils.getRepeatText(event.repeat);
        }
        else {
            this.repeatText = '';
        }
        this.timeDisplay = CalendarUtils.displayDay(event.start);
        if (event.attribute._allday !== 'true') {
            this.timeDisplay += ` ⋅ ${CalendarUtils.displayTime(event.start)} - ${CalendarUtils.displayTime(event.end)}`;
        }
    }
}
if (false) {
    /** @type {?} */
    CalendarEvent.prototype.subject;
    /** @type {?} */
    CalendarEvent.prototype.summary;
    /** @type {?} */
    CalendarEvent.prototype.repeatText;
    /** @type {?} */
    CalendarEvent.prototype.timeDisplay;
    /** @type {?} */
    CalendarEvent.prototype.event;
    /** @type {?} */
    CalendarEvent.prototype.myAttendee;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class CalendarDialogViewComponent {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const moment$2 = moment_;
moment$2.locale('vi');
class CalendarService {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class CalendarTodayComponent {
    /**
     * @param {?} calendarService
     */
    constructor(calendarService) {
        this.calendarService = calendarService;
        this.onChange = new EventEmitter();
        this.events = [];
        this.colors = [
            // '#438EB9',
            '#007bff',
            '#3CA54A',
            '#FF9800',
            '#EF5B49',
            '#77901B',
            '#7D5392',
            '#808080'
        ];
        this._date = new Date();
        this.calendarService.ready((/**
         * @return {?}
         */
        () => this.loadTodayEvents()));
    }
    /**
     * @return {?}
     */
    loadTodayEvents() {
        if (!this._date) {
            return;
        }
        this.calendarService.loadEvents({
            day: DateUtils.dayOfYear(this._date),
            year: this._date.getFullYear()
        }, (/**
         * @param {?} events
         * @return {?}
         */
        (events) => {
            events.forEach((/**
             * @param {?} e
             * @return {?}
             */
            (e) => this._initEventStatus(e)));
            this.events = events.slice(0, 3); // Maximum 3 events
        }));
    }
    /**
     * @param {?} event
     * @param {?} jsEvent
     * @param {?} targetEl
     * @return {?}
     */
    onViewEvent(event, jsEvent, targetEl) {
        this.calendarService.viewEvent(event, jsEvent, targetEl, (/**
         * @return {?}
         */
        () => {
            this.loadTodayEvents();
            this.onChange.emit(true);
        }));
    }
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    _initEventStatus(event) {
        /** @type {?} */
        let now = new Date();
        event.progressing = event.start < now && event.end > now;
        event.ended = event.end < now;
        event.pending = event.start > now;
        if (event.progressing) {
            event.statusText = 'Đang diễn ra';
            event.statusColor = this.colors[0];
        }
        else if (event.pending) {
            event.statusText = 'Chưa diễn ra';
            event.statusColor = this.colors[5];
        }
        else {
            event.statusText = 'Kết thúc';
            event.statusColor = this.colors[6];
        }
        event.style = {
            'background-color': this.colors[event.mode]
        };
    }
}
CalendarTodayComponent.decorators = [
    { type: Component, args: [{
                selector: 'calendar-widget-today',
                template: "<div #viewToggle class=\"calendar-body\">\n    <div *ngFor=\"let event of events\" #targetEl (click)=\"onViewEvent(event, $event, targetEl)\"\n         class=\"calendar-event\">\n        <div class=\"calendar-event__state\" [ngStyle]=\"event['style']\"></div>\n        <div class=\"calendar-event__content\">\n            <div class=\"calendar-event__title\">\n                {{event.subject}}\n                <div class=\"calendar-event__progress\" [style.color]=\"event['statusColor']\">{{event['statusText']}}</div>\n            </div>\n            <div class=\"calendar-event__text\">\n                <i class=\"fa fa-clock-o calendar-event__icon\"></i>\n                {{event['hourStr']}}\n            </div>\n            <div *ngIf=\"event.location\" class=\"calendar-event__text\">\n                <i class=\"fa fa-map-marker calendar-event__icon\"></i>\n                {{event.location}}\n            </div>\n        </div>\n    </div>\n</div>\n",
                styles: [".calendar-body{max-height:300px;overflow:hidden auto}.calendar-event{padding:5px 15px;color:#212121;cursor:pointer}.calendar-event:hover{background:rgba(0,0,0,.05)}.calendar-event__state{width:8px;height:8px;border-radius:50%;margin:5px 10px 0 0;float:left}.calendar-event__content{overflow:hidden}.calendar-event__title{line-height:18px;margin-bottom:3px}.calendar-event__progress{font-size:80%;text-transform:uppercase;font-weight:700}.calendar-event__text{font-size:90%;line-height:18px;color:#757575}.calendar-event__icon{width:12px}"]
            }] }
];
/** @nocollapse */
CalendarTodayComponent.ctorParameters = () => [
    { type: CalendarService }
];
CalendarTodayComponent.propDecorators = {
    onChange: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    CalendarTodayComponent.prototype.onChange;
    /** @type {?} */
    CalendarTodayComponent.prototype.events;
    /** @type {?} */
    CalendarTodayComponent.prototype.colors;
    /**
     * @type {?}
     * @private
     */
    CalendarTodayComponent.prototype._date;
    /**
     * @type {?}
     * @private
     */
    CalendarTodayComponent.prototype.calendarService;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const moment$3 = moment_;
class CalendarComponent {
    /**
     * @param {?} calendarService
     * @param {?} route
     * @param {?} router
     * @param {?} resourceLoader
     * @param {?} notify
     */
    constructor(calendarService, route, router, resourceLoader, notify) {
        this.calendarService = calendarService;
        this.route = route;
        this.router = router;
        this.resourceLoader = resourceLoader;
        this.notify = notify;
        this.viewTypes = [
            new CalendarViewMode('Ngày', CalendarMode.timeGridDay, {
                columnHeaderText: (/**
                 * @param {?} date
                 * @return {?}
                 */
                (date) => {
                    /** @type {?} */
                    let str = moment$3(date).format('dddd, D/M/Y');
                    return str.slice(0, 1).toUpperCase() + str.slice(1);
                }),
                titleFormat: (/**
                 * @return {?}
                 */
                () => CalendarUtils.displayDate(this.calendar.getDate()))
            }),
            new CalendarViewMode('Tuần', CalendarMode.timeGridWeek, {
                titleFormat: (/**
                 * @return {?}
                 */
                () => CalendarUtils.displayWeek(this.calendar.getDate()))
            }),
            new CalendarViewMode('Tháng', CalendarMode.dayGridMonth, {
                titleFormat: (/**
                 * @return {?}
                 */
                () => CalendarUtils.displayMonth(this.calendar.getDate()))
            })
        ];
        this.defaultMode = CalendarMode.dayGridMonth;
        this.calendarConfig = {
            plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
            themeSystem: 'bootstrap',
            firstDay: 1,
            locale: 'vi',
            allDaySlot: true,
            allDayText: 'Cả ngày',
            header: false,
            nowIndicator: true,
            navLinks: true,
            // can click day/week names to navigate views
            editable: true,
            droppable: true,
            eventLimit: true,
            // allow "more" link when too many events
            selectable: true,
            selectMirror: true,
            weekends: true,
            views: {},
            businessHours: {
                daysOfWeek: [1, 2, 3, 4, 5],
                // Monday - Friday
                startTime: '00:01',
                endTime: '23:59'
            },
            eventDrop: (/**
             * @param {?} arg
             * @return {?}
             */
            (arg) => this._updateEventTime(arg)),
            eventResize: (/**
             * @param {?} arg
             * @return {?}
             */
            (arg) => this._updateEventTime(arg)),
            select: (/**
             * @param {?} arg
             * @return {?}
             */
            (arg) => this._selectRange(arg)),
            eventClick: (/**
             * @param {?} arg
             * @return {?}
             */
            (arg) => this._viewEvent(arg)),
            eventDragStart: (/**
             * @return {?}
             */
            () => this._hideViewDialog()),
            datesRender: (/**
             * @return {?}
             */
            () => this._calendarChange()),
            height: (/**
             * @return {?}
             */
            function () {
                return innerHeight - 59;
            })
        };
        this._modeCache = '__calendar_mode__';
        this._events = [];
        // Apply cache config
        Object.assign(this.calendarConfig, this._getDataView());
        // Merge view config
        this.viewTypes.forEach((/**
         * @param {?} view
         * @return {?}
         */
        (view) => {
            if (view.options) {
                this.calendarConfig.views[view.value] = view.options;
            }
        }));
        // Use locale
        moment$3.locale(this.calendarConfig.locale.toString());
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this._init();
        this._hideViewDialog();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.calendar.destroy();
        if (this._routerObserver) {
            this._routerObserver.unsubscribe();
        }
    }
    /**
     * @private
     * @return {?}
     */
    _init() {
        this.calendar = new Calendar(this.calendarRef.nativeElement, this.calendarConfig);
        this.calendar.render();
        // Change date view
        this._routerObserver = this.router.events.pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        event => event instanceof NavigationEnd)))
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        (event) => this._onNavigated(event)));
    }
    /**
     * @private
     * @param {?} args
     * @return {?}
     */
    _updateEventTime(args) {
        /** @type {?} */
        let event;
        if (args.oldEvent) {
            event = this._events[Number(args.oldEvent.id)];
        }
        else {
            event = this._events[Number(args.event.id)];
        }
        if (event.mode !== 1) {
            /** @type {?} */
            let toTime;
            if (args.event.allDay) {
                toTime = 23 * 60 + 59;
            }
            else {
                toTime = args.event.end.getHours() * 60 + args.event.end.getMinutes();
            }
            /** @type {?} */
            let params = {
                element: event.uuid,
                year: args.event.start.getFullYear(),
                day: DateUtils.dayOfYear(args.event.start),
                startTime: args.event.start.getHours() * 60 + args.event.start.getMinutes(),
                toTime: toTime,
                _allday: args.event.allDay
            };
            if (event.repeat) {
                Object.assign(params, event.repeat);
            }
            this.calendarService.updateEvent(params, (/**
             * @param {?} data
             * @param {?} err
             * @return {?}
             */
            (data, err) => {
                if (!data) {
                    this.notify.showMessage('Cập nhật lịch không thành công: ' + err.status, 'error');
                    args.revert();
                    return;
                }
                this.reloadEvents();
            }));
        }
        else {
            // Can't change event
            args.revert();
        }
    }
    /**
     * @return {?}
     */
    createEvent() {
        /** @type {?} */
        let date = new Date();
        date.setHours(date.getHours() + 1, 0);
        this._createEvent(date, new Date(date.getTime() + 60 * 60 * 1000));
    }
    /**
     * @private
     * @param {?=} forceChange
     * @return {?}
     */
    _loadEvents(forceChange = false) {
        this._hideViewDialog();
        clearTimeout(this._eventTimer);
        this._eventTimer = setTimeout((/**
         * @return {?}
         */
        () => {
            this._loadRangeEvents(forceChange);
        }), 500);
    }
    /**
     * @private
     * @param {?} start
     * @param {?} end
     * @param {?=} allDay
     * @return {?}
     */
    _createEvent(start, end, allDay = false) {
        /** @type {?} */
        const dataBase64 = window.btoa(JSON.stringify({
            start: start.valueOf(),
            end: end.valueOf(),
            attribute: {
                allday: allDay + ''
            }
        }));
        this.router.navigate(['/calendar/create', dataBase64]);
        this._hideViewDialog();
    }
    /**
     * @private
     * @param {?} info
     * @return {?}
     */
    _selectRange(info) {
        this._createEvent(info.start, info.end, info.start.getTime() === (info.end.getTime() - 24 * 60 * 60 * 1000));
    }
    /**
     * @private
     * @return {?}
     */
    _calendarChange() {
        if (this.calendar.view.type === CalendarMode.dayGridDay) {
            this.calendar.changeView(CalendarMode.timeGridDay);
            // Trigger change
            setTimeout((/**
             * @return {?}
             */
            () => this._calendarChange()));
            return;
        }
        setTimeout((/**
         * @return {?}
         */
        () => {
            this._updateInfo();
            this._loadEvents();
        }));
    }
    /**
     * @private
     * @return {?}
     */
    _updateInfo() {
        this.viewTitle = this.calendar.view.title;
        this.viewTypes.forEach((/**
         * @param {?} view
         * @return {?}
         */
        (view) => view.active = view.value === this.calendar.view.type));
        this._checkIsToday();
        this._updateViewParams();
    }
    /**
     * @private
     * @return {?}
     */
    _checkIsToday() {
        /** @type {?} */
        const range = {
            start: this.calendar.view.activeStart,
            end: this.calendar.view.activeEnd,
        };
        this.isToday = this._dateInRange(new Date(), range);
    }
    /**
     * @private
     * @param {?=} forceChange
     * @return {?}
     */
    _loadRangeEvents(forceChange) {
        if (forceChange || this._outOfRange()) {
            this._currentRange = this._getRange();
            this.calendarService.loadEvents(xCalendar.getRangeParams(this._currentRange.start, this._currentRange.end), (/**
             * @param {?} events
             * @return {?}
             */
            (events) => this._renderEvents(events || [])));
            this.calendar.removeAllEventSources();
        }
    }
    // Range view default is 6 week
    /**
     * @private
     * @return {?}
     */
    _getRange() {
        /** @type {?} */
        let start = new Date(this.calendar.getDate());
        /** @type {?} */
        let end;
        start.setDate(1);
        start.setHours(0, 0, 0, 0);
        while (start.getDay() !== this.calendarConfig.firstDay) {
            start.setDate(start.getDate() - 1);
        }
        end = new Date(start.getTime() + 6 * 7 * 24 * 60 * 60 * 1000);
        return {
            start: start,
            end: end
        };
    }
    /**
     * @private
     * @return {?}
     */
    _outOfRange() {
        if (!this._currentRange) {
            return true;
        }
        return !(this._dateInRange(this.calendar.view.currentStart) && this._dateInRange(this.calendar.view.currentEnd));
    }
    /**
     * @private
     * @param {?} date
     * @param {?=} range
     * @return {?}
     */
    _dateInRange(date, range) {
        range = range || this._currentRange;
        return date >= range.start && date <= range.end;
    }
    /**
     * @private
     * @param {?} events
     * @return {?}
     */
    _renderEvents(events) {
        this._events = events;
        /** @type {?} */
        let eventInputs = events.map((/**
         * @param {?} event
         * @param {?} index
         * @return {?}
         */
        (event, index) => {
            /** @type {?} */
            let eventInput = {
                id: index,
                uuid: event.uuid,
                allDay: event.allDay,
                title: event.subject,
                start: event.start,
                end: event.end,
            };
            if (event.end < new Date()) {
                // Event on the past
                eventInput.textColor = '#999';
                eventInput.color = '#ddd';
            }
            else if (event.isCreator) {
                // Owner event
                eventInput.textColor = '#fff';
                eventInput.color = '#4da0d8';
            }
            else {
                // Other event
                eventInput.textColor = '#333';
                eventInput.color = '#99ed96';
            }
            return eventInput;
        }));
        this._addEventSource(eventInputs);
    }
    /**
     * @private
     * @param {?} args
     * @return {?}
     */
    _viewEvent(args) {
        /** @type {?} */
        let event = this._events[Number(args.event.id)];
        this.calendarService.viewEvent(event, args.jsEvent, args.jsEvent.currentTarget, (/**
         * @return {?}
         */
        () => this.reloadEvents()));
    }
    /**
     * @private
     * @param {?} events
     * @return {?}
     */
    _addEventSource(events) {
        this.calendar.addEventSource({
            events: events
        });
    }
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    _onNavigated(event) {
        /** @type {?} */
        const viewData = this._getDataView();
        this.calendar.changeView(viewData.defaultView, viewData.defaultDate);
    }
    /**
     * @param {?} type
     * @return {?}
     */
    changeView(type) {
        this.calendar.changeView(type.value);
    }
    /**
     * @return {?}
     */
    onPrev() {
        this.calendar.prev();
    }
    /**
     * @return {?}
     */
    onNext() {
        this.calendar.next();
    }
    /**
     * @return {?}
     */
    onToday() {
        this.calendar.changeView(CalendarMode.timeGridDay, new Date());
    }
    /**
     * @private
     * @param {?} mode
     * @return {?}
     */
    _getCalendarMode(mode) {
        for (let i = 0; i < this.viewTypes.length; i++) {
            if (this.viewTypes[i].value === mode) {
                return this.viewTypes[i];
            }
        }
    }
    /**
     * @private
     * @return {?}
     */
    _updateViewParams() {
        /** @type {?} */
        let params = [
            this.calendar.view.type,
            moment$3(this.calendar.getDate()).format('YYYY-M-D')
        ];
        this.router.navigate(['/calendar/v/' + params.join('/')]);
    }
    /**
     * @private
     * @return {?}
     */
    _getDataView() {
        /** @type {?} */
        let segments = this.route.snapshot.url;
        /** @type {?} */
        let modeView = this._cacheModeView();
        /** @type {?} */
        let date;
        if (segments.length > 1) {
            modeView = segments[0].path;
            date = new Date(segments[1].path);
        }
        if (!date || !date.getTime()) {
            date = new Date();
        }
        if (!this._getCalendarMode(modeView)) {
            modeView = this._getCalendarMode(this.defaultMode).value;
        }
        this._cacheModeView(modeView);
        return {
            defaultView: modeView,
            defaultDate: date,
        };
    }
    /**
     * @private
     * @param {?=} modeView
     * @return {?}
     */
    _cacheModeView(modeView) {
        if (modeView === undefined) {
            return localStorage.getItem(this._modeCache);
        }
        else {
            localStorage.setItem(this._modeCache, modeView);
        }
    }
    /**
     * @return {?}
     */
    reloadEvents() {
        this._hideViewDialog();
        this._loadEvents(true);
        this.calendarWidget.loadTodayEvents();
    }
    /**
     * @private
     * @return {?}
     */
    _hideViewDialog() {
        this.calendarService.hideViewModal();
    }
}
CalendarComponent.decorators = [
    { type: Component, args: [{
                selector: 'inet-calendar',
                template: "<div class=\"calendar-app\">\n    <div class=\"calendar-app__nav p-3\">\n        <div class=\"d-flex align-items-center\">\n            <div class=\"flex-grow-1\" style=\"font-size: 16px;font-weight: 500;line-height: 18px\">{{viewTitle}}</div>\n            <div class=\"btn-group\" role=\"group\">\n                <button (click)=\"onPrev()\" type=\"button\" class=\"btn btn-light\"><i class=\"fa fa-chevron-left\"></i></button>\n                <button (click)=\"onNext()\" type=\"button\" class=\"btn btn-light\"><i class=\"fa fa-chevron-right\"></i></button>\n            </div>\n        </div>\n        <div class=\"btn-group d-flex mt-3\" role=\"group\">\n            <button *ngFor=\"let type of viewTypes\" (click)=\"changeView(type)\"\n                    [ngClass]=\"{'btn-light': !type.active}\" type=\"button\" class=\"btn btn-primary flex-grow-1\">\n                {{type.name}}\n            </button>\n        </div>\n        <button (click)=\"onToday()\" [ngClass]=\"{'btn-light': !isToday}\" type=\"button\" class=\"btn btn-primary w-100 mt-3\">H\u00F4m nay</button>\n        <button (click)=\"createEvent()\" type=\"button\" class=\"btn btn-primary w-100 mt-3\">T\u1EA1o s\u1EF1 ki\u1EC7n</button>\n        <!-- <div (click)=\"createEvent()\" class=\"calendar-add-btn mt-3 pt-2 pb-2 text-primary\">\n            <i class=\"fa fa-plus mr-1\"></i> Th\u00EAm s\u1EF1 ki\u1EC7n\n        </div> -->\n        <div class=\"mt-3\" style=\"margin-left: -15px;margin-right: -15px;\">\n            <div class=\"ml-3 mr-3 pb-1 mb-1\" style=\"border-bottom: 2px solid #007bff;font-weight: bold;\">S\u1EF1 ki\u1EC7n h\u00F4m nay</div>\n            <calendar-widget-today (onChange)=\"reloadEvents()\"></calendar-widget-today>\n        </div>\n    </div>\n    <div class=\"calendar-app__body pr-1\">\n        <div #calendarRef></div>\n    </div>\n</div>\n",
                styles: [".calendar-app{width:100%;height:calc(100vh - 60px);background:#fff;padding:0}.calendar-app__nav{height:100%;float:left;width:300px}.calendar-app__body{height:100%;overflow:hidden;background:rgba(0,0,0,.01)}.calendar-add-btn{cursor:pointer;font-weight:700}.calendar-add-btn:hover{opacity:.8}"]
            }] }
];
/** @nocollapse */
CalendarComponent.ctorParameters = () => [
    { type: CalendarService },
    { type: ActivatedRoute },
    { type: Router },
    { type: ResourceLoaderService },
    { type: NotificationService }
];
CalendarComponent.propDecorators = {
    calendarRef: [{ type: ViewChild, args: ['calendarRef',] }],
    calendarWidget: [{ type: ViewChild, args: [CalendarTodayComponent,] }]
};
if (false) {
    /** @type {?} */
    CalendarComponent.prototype.calendarRef;
    /** @type {?} */
    CalendarComponent.prototype.calendarWidget;
    /** @type {?} */
    CalendarComponent.prototype.viewTypes;
    /** @type {?} */
    CalendarComponent.prototype.defaultMode;
    /** @type {?} */
    CalendarComponent.prototype.viewTitle;
    /** @type {?} */
    CalendarComponent.prototype.calendarConfig;
    /** @type {?} */
    CalendarComponent.prototype.calendar;
    /** @type {?} */
    CalendarComponent.prototype.isToday;
    /**
     * @type {?}
     * @private
     */
    CalendarComponent.prototype._eventTimer;
    /**
     * @type {?}
     * @private
     */
    CalendarComponent.prototype._modeCache;
    /**
     * @type {?}
     * @private
     */
    CalendarComponent.prototype._routerObserver;
    /**
     * @type {?}
     * @private
     */
    CalendarComponent.prototype._events;
    /**
     * @type {?}
     * @private
     */
    CalendarComponent.prototype._currentRange;
    /**
     * @type {?}
     * @private
     */
    CalendarComponent.prototype.calendarService;
    /**
     * @type {?}
     * @private
     */
    CalendarComponent.prototype.route;
    /**
     * @type {?}
     * @private
     */
    CalendarComponent.prototype.router;
    /**
     * @type {?}
     * @private
     */
    CalendarComponent.prototype.resourceLoader;
    /**
     * @type {?}
     * @private
     */
    CalendarComponent.prototype.notify;
}
class CalendarViewMode {
    /**
     * @param {?} name
     * @param {?} value
     * @param {?=} options
     */
    constructor(name, value, options) {
        this.active = false;
        this.name = name;
        this.value = value;
        this.options = options;
    }
}
if (false) {
    /** @type {?} */
    CalendarViewMode.prototype.name;
    /** @type {?} */
    CalendarViewMode.prototype.value;
    /** @type {?} */
    CalendarViewMode.prototype.options;
    /** @type {?} */
    CalendarViewMode.prototype.active;
}
/** @enum {string} */
const CalendarMode = {
    dayGridDay: 'dayGridDay',
    timeGridDay: 'timeGridDay',
    timeGridWeek: 'timeGridWeek',
    dayGridMonth: 'dayGridMonth',
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class CalendarDialogRepeatComponent {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FileListComponent {
    constructor() {
        this.files = [];
        this.removable = true;
        this.onClick = new EventEmitter();
        this.onRemove = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._initFileEl();
    }
    /**
     * @param {?} file
     * @param {?} event
     * @return {?}
     */
    clickFile(file, event) {
        this.onClick.emit({ file, event });
    }
    /**
     * @param {?} file
     * @return {?}
     */
    removeFile(file) {
        /** @type {?} */
        const index = this.files.indexOf(file);
        if (index > -1) {
            this.files.splice(index, 1);
            this.onRemove.emit(file);
        }
    }
    /**
     * @param {?} files
     * @return {?}
     */
    addFiles(files) {
        // Read as base64 if image
        for (let i = 0; i < files.length; i++) {
            /** @type {?} */
            let file = files[i];
            if (this._fileIsImage(file)) {
                file['image'] = true;
                this._readImageBase64(file);
            }
            this.files.push(file);
        }
    }
    /**
     * @private
     * @return {?}
     */
    _initFileEl() {
        if (this.fileEl) {
            this.fileEl.addEventListener('change', (/**
             * @param {?} e
             * @return {?}
             */
            (e) => {
                /** @type {?} */
                const files = this.fileEl.files;
                if (files.length > 0) {
                    // Read as base64 if image
                    this.addFiles(files);
                    // Reset file
                    this.fileEl.value = '';
                }
            }));
        }
    }
    /**
     * @private
     * @param {?} file
     * @return {?}
     */
    _readImageBase64(file) {
        /** @type {?} */
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (/**
         * @return {?}
         */
        function () {
            file.url = reader.result;
        });
    }
    /**
     * @private
     * @param {?} file
     * @return {?}
     */
    _fileIsImage(file) {
        return file.type && file.type.indexOf('image') > -1;
    }
}
FileListComponent.decorators = [
    { type: Component, args: [{
                selector: 'file-list',
                template: "<ng-container *ngFor=\"let file of files\">\n    <ng-template *ngTemplateOutlet=\"template ? template : fileItem; context: {file: file}\">\n    </ng-template>\n</ng-container>\n<ng-template #fileItem let-file=\"file\">\n    <div class=\"file-item\" [title]=\"file.name\" (click)=\"clickFile(file, $event)\">\n        <img *ngIf=\"file.image; else icon\" [src]=\"file.url\" class=\"file-item__image\">\n        <ng-template #icon>\n            <img [src]=\"file.name | fileIcon\" class=\"file-item__image_type\">\n            <div class=\"file-item__name\">{{file.name}}</div>\n        </ng-template>\n        <i *ngIf=\"removable\" (click)=\"removeFile(file)\" class=\"fa fa-times file-item__remove\"></i>\n    </div>\n</ng-template>",
                styles: [":host{display:block}.file-item{display:inline-block;text-align:center;width:80px;height:80px;border-radius:2px;position:relative;margin-right:5px;margin-bottom:5px;border:1px solid #ddd;overflow:hidden;padding:0 5px;cursor:pointer;background:#fff}.file-item__image{max-width:100%;position:absolute;left:50%;top:50%;transform:translate3d(-50%,-50%,0)}.file-item__image_type{max-width:20px;max-height:20px;margin-bottom:5px;margin-top:10px}.file-item__name{font-size:12px;line-height:13px;max-height:40px;overflow:hidden}.file-item__remove{position:absolute;right:3px;top:3px;cursor:pointer;width:24px;height:24px;line-height:24px;border-radius:50%;background:rgba(0,0,0,.2);color:#fff;text-align:center;font-size:12px}.file-item__remove:hover{background:rgba(0,0,0,.5)}"]
            }] }
];
FileListComponent.propDecorators = {
    fileEl: [{ type: Input }],
    files: [{ type: Input }],
    removable: [{ type: Input }],
    template: [{ type: Input }],
    onClick: [{ type: Output }],
    onRemove: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    FileListComponent.prototype.fileEl;
    /** @type {?} */
    FileListComponent.prototype.files;
    /** @type {?} */
    FileListComponent.prototype.removable;
    /** @type {?} */
    FileListComponent.prototype.template;
    /** @type {?} */
    FileListComponent.prototype.onClick;
    /** @type {?} */
    FileListComponent.prototype.onRemove;
}
/**
 * @record
 */
function FileListItem() { }
if (false) {
    /** @type {?|undefined} */
    FileListItem.prototype.id;
    /** @type {?|undefined} */
    FileListItem.prototype.url;
    /** @type {?|undefined} */
    FileListItem.prototype.image;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AttachmentListComponent {
    /**
     * @param {?} calendarService
     * @param {?} modalService
     */
    constructor(calendarService, modalService) {
        this.calendarService = calendarService;
        this.modalService = modalService;
        this.files = [];
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes.calEvent) {
            this._attachmentToFiles();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.modalRef) {
            this.modalRef.hide();
        }
    }
    /**
     * @param {?} file
     * @param {?} event
     * @return {?}
     */
    viewAttachment(file, event) {
        window.open(xCalendar.getFileViewUrl(file.data, null, event));
    }
    /**
     * @param {?} file
     * @param {?} template
     * @return {?}
     */
    removeAttachment(file, template) {
        if (file.id) {
            this._file = file;
            this.confirmMessage = 'Tệp tin <b>"' + file.name + '"</b> sẽ bị xoá?';
            this.modalRef = this.modalService.show(template);
        }
        else {
            this.fileList.removeFile(file);
        }
    }
    /**
     * @return {?}
     */
    removeFile() {
        if (!this._file) {
            return;
        }
        this.modalRef.hide();
        this.calendarService.deleteAttachment({ fileID: this._file.id, element: this.calEvent.uuid }, (/**
         * @return {?}
         */
        () => { }));
        this.fileList.removeFile(this._file);
        this._file = null;
    }
    /**
     * @private
     * @return {?}
     */
    _attachmentToFiles() {
        if (this.calEvent && this.calEvent.attachments) {
            this.files = this.calEvent.attachments.map((/**
             * @param {?} item
             * @return {?}
             */
            (item) => {
                return {
                    name: item.file,
                    type: item.mimetype,
                    size: item.size,
                    id: item.gridfsUUID,
                    data: item
                };
            }));
        }
        else {
            this.files = [];
        }
    }
}
AttachmentListComponent.decorators = [
    { type: Component, args: [{
                selector: 'calendar-attachment-list',
                template: "<file-list [template]=\"fileItem\" [files]=\"files\" [fileEl]=\"fileEl\" [removable]=\"removable\"></file-list>\n<ng-template #fileItem let-file=\"file\">\n    <div class=\"file-item\" [title]=\"file.name\">\n        <img [src]=\"file.name | fileIcon\" class=\"file-item__image\">\n        <div class=\"file-item__name text-primary\" (click)=\"viewAttachment(file, $event)\">{{file.name}}</div>\n        <i *ngIf=\"removable\" (click)=\"removeAttachment(file, template)\"\n           class=\"fa fa-trash file-item__remove text-danger\"></i>\n    </div>\n</ng-template>\n<ng-template #template>\n    <div class=\"modal-header\">\n        <h4 class=\"modal-title pull-left\">Th\u00F4ng b\u00E1o</h4>\n        <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"modalRef.hide()\">\n            <span aria-hidden=\"true\">&times;</span>\n        </button>\n    </div>\n    <div class=\"modal-body\" [innerHTML]=\"confirmMessage\"></div>\n    <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-danger\" (click)=\"removeFile()\">X\u00F3a</button>\n        <button type=\"button\" class=\"btn btn-secondary\" (click)=\"modalRef.hide()\">\u0110\u00F3ng</button>\n    </div>\n</ng-template>",
                styles: [".file-item{height:24px;line-height:24px;overflow:hidden;font-size:13px;cursor:pointer;margin-bottom:5px}.file-item__image{float:left;width:24px;height:24px;margin-right:10px}.file-item__name{float:left;max-width:80%;white-space:nowrap;overflow:hidden}.file-item__remove{width:24px;height:24px;line-height:24px;text-align:center}"]
            }] }
];
/** @nocollapse */
AttachmentListComponent.ctorParameters = () => [
    { type: CalendarService },
    { type: BsModalService }
];
AttachmentListComponent.propDecorators = {
    calEvent: [{ type: Input }],
    fileEl: [{ type: Input }],
    removable: [{ type: Input }],
    fileList: [{ type: ViewChild, args: [FileListComponent,] }]
};
if (false) {
    /** @type {?} */
    AttachmentListComponent.prototype.calEvent;
    /** @type {?} */
    AttachmentListComponent.prototype.fileEl;
    /** @type {?} */
    AttachmentListComponent.prototype.removable;
    /** @type {?} */
    AttachmentListComponent.prototype.fileList;
    /** @type {?} */
    AttachmentListComponent.prototype.files;
    /** @type {?} */
    AttachmentListComponent.prototype.modalRef;
    /** @type {?} */
    AttachmentListComponent.prototype.confirmMessage;
    /**
     * @type {?}
     * @private
     */
    AttachmentListComponent.prototype._file;
    /**
     * @type {?}
     * @private
     */
    AttachmentListComponent.prototype.calendarService;
    /**
     * @type {?}
     * @private
     */
    AttachmentListComponent.prototype.modalService;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const moment$4 = moment_;
class CalendarFormComponent {
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
            startTime: moment$4(this.event.start).format('HH:mm'),
            toTime: moment$4(this.event.end).format('HH:mm'),
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
        let date = moment$4(data.date);
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const moment$5 = moment_;
class CalendarViewerComponent {
    constructor() {
        this.dateFormat = 'MMMM/YYYY';
        this.locale = 'vi';
        this.firstDay = 1;
        this.limitEvent = 3;
        this.view = CalendarViewerMode.MONTH;
        this.onChange = new EventEmitter();
        this.onActive = new EventEmitter();
        this.dates = [];
        this.weekDates = [];
    }
    /**
     * @param {?} date
     * @return {?}
     */
    set date(date) {
        /** @type {?} */
        let _date;
        if (!date || !date.getTime()) {
            _date = new Date();
        }
        else {
            _date = new Date(date);
        }
        _date.setHours(0, 0, 0, 0);
        if (this.view === CalendarViewerMode.MONTH) {
            // Set date start month
            _date.setDate(1);
        }
        // current date view
        if (this._date && _date.getTime() === this._date.getTime()) {
            return;
        }
        this._date = _date;
        this._render();
    }
    /**
     * @return {?}
     */
    get date() {
        return new Date(this._date);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (!this._date) {
            this.date = new Date();
        }
    }
    /**
     * @param {?} events
     * @param {?} date
     * @return {?}
     */
    setEvents(events, date) {
        /** @type {?} */
        let dateViewer = this._getDateViewer(date);
        if (dateViewer) {
            dateViewer.events = events;
        }
    }
    /**
     * @return {?}
     */
    clearEvents() {
        this.dates.forEach((/**
         * @param {?} dateViewer
         * @return {?}
         */
        dateViewer => dateViewer.events = null));
    }
    /**
     * @return {?}
     */
    toDay() {
        this.date = new Date();
    }
    /**
     * @return {?}
     */
    prev() {
        if (this.view === CalendarViewerMode.MONTH) {
            this._prevMonth();
        }
        else {
            this._prevWeek();
        }
        this._render();
    }
    /**
     * @return {?}
     */
    next() {
        if (this.view === CalendarViewerMode.MONTH) {
            this._nextMonth();
        }
        else {
            this._nextWeek();
        }
        this._render();
    }
    /**
     * @param {?} dateViewer
     * @return {?}
     */
    activeDate(dateViewer) {
        this.dateActive = dateViewer;
        // Move to target month
        if (dateViewer.outOfRange) {
            this.date = dateViewer.date;
        }
        this.onActive.emit(dateViewer);
    }
    /**
     * @param {?} date
     * @return {?}
     */
    focusDate(date) {
        /** @type {?} */
        let dateViewer = this._getDateViewer(date);
        if (dateViewer) {
            this.activeDate(dateViewer);
        }
    }
    /**
     * @private
     * @return {?}
     */
    _nextMonth() {
        this._date.setMonth(this._date.getMonth() + 1);
    }
    /**
     * @private
     * @return {?}
     */
    _prevMonth() {
        this._date.setMonth(this._date.getMonth() - 1);
    }
    /**
     * @private
     * @return {?}
     */
    _nextWeek() {
        this._date.setDate(this._date.getDate() + 7);
    }
    /**
     * @private
     * @return {?}
     */
    _prevWeek() {
        this._date.setDate(this._date.getDate() - 7);
    }
    /**
     * @private
     * @return {?}
     */
    _render() {
        if (this.view === CalendarViewerMode.MONTH) {
            this._renderMonth();
        }
        else {
            this._renderWeek();
        }
        this.onChange.emit(this.date);
    }
    /**
     * @private
     * @return {?}
     */
    _renderMonth() {
        /** @type {?} */
        let date = this._getDateStartWeek();
        this.dates = [];
        this.weekDates = [];
        while (this.weekDates.length <= 6) {
            this.weekDates.push(this._createWeekDate(date));
            // detect date is end month
            if (date.getMonth() !== this._date.getMonth()) {
                break;
            }
        }
        this._renderTitle();
        this._renderWeekTitle(this.weekDates[0]);
    }
    /**
     * @private
     * @return {?}
     */
    _renderWeek() {
        /** @type {?} */
        let date = this._getDateStartWeek();
        this.dates = [];
        this.weekDates = [this._createWeekDate(date)];
        this.weekDates[0].forEach((/**
         * @param {?} date
         * @return {?}
         */
        date => date.outOfRange = false));
        this._renderTitle();
        this._renderWeekTitle(this.weekDates[0]);
    }
    /**
     * @private
     * @param {?} date
     * @return {?}
     */
    _createWeekDate(date) {
        /** @type {?} */
        var weekDates = [];
        for (let i = 0; i < 7; i++) {
            /** @type {?} */
            let dateViewer = {
                date: new Date(date),
                time: date.getTime(),
                outOfRange: this._date.getMonth() !== date.getMonth(),
                today: this._isToday(date)
            };
            weekDates.push(dateViewer);
            this.dates.push(dateViewer);
            date.setDate(date.getDate() + 1);
        }
        return weekDates;
    }
    /**
     * @private
     * @param {?} weekDates
     * @return {?}
     */
    _renderWeekTitle(weekDates) {
        this.weekTitles = [];
        weekDates.forEach((/**
         * @param {?} viewerDate
         * @return {?}
         */
        (viewerDate) => {
            this.weekTitles.push(moment$5(viewerDate.date).locale(this.locale).format('dd'));
        }));
    }
    /**
     * @private
     * @return {?}
     */
    _renderTitle() {
        this.dateTitle = moment$5(this._date).locale(this.locale).format(this.dateFormat);
    }
    /**
     * @private
     * @return {?}
     */
    _getDateStartWeek() {
        /** @type {?} */
        let date = new Date(this._date);
        /** @type {?} */
        let startWeekFromNow = date.getDay() - this.firstDay;
        if (date.getDay() < this.firstDay) {
            startWeekFromNow += 7;
        }
        // Set date start week
        date.setDate(date.getDate() - startWeekFromNow);
        return date;
    }
    /**
     * @private
     * @param {?} date
     * @return {?}
     */
    _isToday(date) {
        /** @type {?} */
        var now = new Date();
        return now.getDate() === date.getDate() && now.getMonth() === date.getMonth() && now.getFullYear() === date.getFullYear();
    }
    /**
     * @private
     * @param {?} date
     * @return {?}
     */
    _getDateViewer(date) {
        /** @type {?} */
        let _date = new Date(date);
        _date.setHours(0, 0, 0, 0);
        for (let i = 0; i < this.dates.length; i++) {
            if (this.dates[i].time === _date.getTime()) {
                return this.dates[i];
            }
        }
    }
}
CalendarViewerComponent.decorators = [
    { type: Component, args: [{
                selector: 'calendar-viewer',
                template: "<div class=\"calendar-viewer\">\n\n  <div role=\"row\" class=\"calendar-viewer__head\">\n    <i (click)=\"next()\" class=\"calendar-viewer__button fa fa-chevron-right\"></i>\n    <i (click)=\"toDay()\" class=\"calendar-viewer__button fa fa-circle\" style=\"font-size:10px\"></i>\n    <i (click)=\"prev()\" class=\"calendar-viewer__button fa fa-chevron-left\"></i>\n    <div class=\"calendar-viewer__title\">{{dateTitle}}</div>\n  </div>\n\n  <div role=\"grid\" class=\"calendar-viewer__body\">\n    <div role=\"row\" class=\"calendar-viewer__row\">\n      <div class=\"calendar-viewer__th\" *ngFor=\"let title of weekTitles\">{{title}}</div>\n    </div>\n    <div *ngFor=\"let week of weekDates\" role=\"row\" class=\"calendar-viewer__row\">\n      <div *ngFor=\"let dateViewer of week\"\n           [ngClass]=\"{'light-cell': dateViewer.outOfRange, 'today-cell': dateViewer.today}\" class=\"calendar-viewer__td\">\n        <div (click)=\"activeDate(dateViewer)\" class=\"calendar-viewer__date\" [ngClass]=\"{'active': dateViewer.time === dateActive?.time}\">\n          <span>{{dateViewer.date.getDate()}}</span>\n          <div *ngIf=\"dateViewer.events\" class=\"calendar-viewer__events\">\n            <div *ngFor=\"let event of dateViewer.events\" [ngStyle]=\"event.style\"></div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n\n</div>\n",
                styles: [".calendar-viewer{padding:10px 0}.calendar-viewer__head{font-size:14px;padding:0 5px 0 15px;height:40px;color:#757575}.calendar-viewer__title{overflow:hidden;line-height:40px;font-weight:700;text-transform:uppercase}.calendar-viewer__button{float:right;margin:2px 0;text-align:center}.calendar-viewer__body{display:table;table-layout:fixed;width:100%;text-align:center;color:#212121;font-size:14px}.calendar-viewer__row{display:table-row}.calendar-viewer__th{display:table-cell;vertical-align:middle;height:24px;font-size:12px;color:#757575;font-weight:700}.calendar-viewer__td{display:table-cell;vertical-align:middle;height:44px}.calendar-viewer__td.light-cell{opacity:.2}.calendar-viewer__td.today-cell .calendar-viewer__button,.calendar-viewer__td.today-cell .calendar-viewer__date{color:#dc3545}.calendar-viewer__button,.calendar-viewer__date{height:36px;width:36px;line-height:36px;border-radius:50%;cursor:pointer;display:inline-block;position:relative}.calendar-viewer__button:hover,.calendar-viewer__date:hover{background-color:rgba(0,0,0,.1)}.active.calendar-viewer__button,.calendar-viewer__date.active{background-color:#438eb9!important;color:#fff!important}.active.calendar-viewer__button .calendar-viewer__events div,.calendar-viewer__date.active .calendar-viewer__events div{background-color:#fff!important}.calendar-viewer__events{position:absolute;left:5px;right:5px;bottom:4px;text-align:center;overflow:hidden;line-height:0;height:6px}.calendar-viewer__events div{width:4px;height:4px;border-radius:50%;margin:0 1px;background-color:#438eb9;display:inline-block}"]
            }] }
];
/** @nocollapse */
CalendarViewerComponent.ctorParameters = () => [];
CalendarViewerComponent.propDecorators = {
    dateFormat: [{ type: Input }],
    locale: [{ type: Input }],
    firstDay: [{ type: Input }],
    limitEvent: [{ type: Input }],
    view: [{ type: Input }],
    date: [{ type: Input }],
    onChange: [{ type: Output }],
    onActive: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    CalendarViewerComponent.prototype.dateFormat;
    /** @type {?} */
    CalendarViewerComponent.prototype.locale;
    /** @type {?} */
    CalendarViewerComponent.prototype.firstDay;
    /** @type {?} */
    CalendarViewerComponent.prototype.limitEvent;
    /** @type {?} */
    CalendarViewerComponent.prototype.view;
    /** @type {?} */
    CalendarViewerComponent.prototype.onChange;
    /** @type {?} */
    CalendarViewerComponent.prototype.onActive;
    /** @type {?} */
    CalendarViewerComponent.prototype.dateTitle;
    /** @type {?} */
    CalendarViewerComponent.prototype.dates;
    /** @type {?} */
    CalendarViewerComponent.prototype.weekDates;
    /** @type {?} */
    CalendarViewerComponent.prototype.weekTitles;
    /** @type {?} */
    CalendarViewerComponent.prototype.dateActive;
    /**
     * @type {?}
     * @private
     */
    CalendarViewerComponent.prototype._date;
}
/**
 * @record
 */
function CalendarViewerDate() { }
if (false) {
    /** @type {?} */
    CalendarViewerDate.prototype.date;
    /** @type {?} */
    CalendarViewerDate.prototype.time;
    /** @type {?} */
    CalendarViewerDate.prototype.outOfRange;
    /** @type {?} */
    CalendarViewerDate.prototype.today;
    /** @type {?|undefined} */
    CalendarViewerDate.prototype.events;
}
/** @enum {string} */
const CalendarViewerMode = {
    MONTH: 'month',
    WEEK: 'week',
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class CalendarWidgetComponent {
    /**
     * @param {?} calendarService
     */
    constructor(calendarService) {
        this.calendarService = calendarService;
        this.locale = 'vi';
        this.dateFormat = 'dddd, D/M/YYYY';
        this.colors = [
            '#438EB9',
            '#3CA54A',
            '#FF9800',
            '#EF5B49',
            '#77901B',
            '#7D5392',
            '#808080'
        ];
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.loadEvents();
    }
    /**
     * @param {?} date
     * @return {?}
     */
    changeMonth(date) {
        this._date = date;
        this.calendarViewer.clearEvents();
        this.loadEvents();
    }
    /**
     * @param {?} e
     * @return {?}
     */
    activeDate(e) {
        this.activeDateViewer = e;
        this.activeDateTitle = xCalendar.formatDate(e.date, this.dateFormat);
    }
    /**
     * @return {?}
     */
    loadEvents() {
        if (!this._date) {
            return;
        }
        this.calendarService.loadMonthEvents(this._date, (/**
         * @param {?} events
         * @return {?}
         */
        (events) => {
            events.sort((/**
             * @param {?} a
             * @param {?} b
             * @return {?}
             */
            function (a, b) {
                return a.day - b.day;
            }));
            this._groupEventByDate(events).forEach((/**
             * @param {?} group
             * @return {?}
             */
            (group) => {
                this.calendarViewer.setEvents(group.events, group.date);
            }));
            // Focus today
            if (!this.activeDateViewer) {
                this.calendarViewer.focusDate(new Date());
            }
        }));
    }
    /**
     * @param {?} event
     * @param {?} jsEvent
     * @param {?} targetEl
     * @return {?}
     */
    onViewEvent(event, jsEvent, targetEl) {
        this.calendarService.viewEvent(event, jsEvent, targetEl, (/**
         * @return {?}
         */
        () => this.loadEvents()));
    }
    /**
     * @private
     * @param {?} events
     * @return {?}
     */
    _groupEventByDate(events) {
        /** @type {?} */
        let groups = [];
        events.forEach((/**
         * @param {?} event
         * @return {?}
         */
        event => {
            /** @type {?} */
            let group;
            /** @type {?} */
            let date = new Date(event.from);
            date.setHours(0, 0, 0, 0);
            for (let i = 0; i < groups.length; i++) {
                if (groups[i].date.getTime() === date.getTime()) {
                    group = groups[i];
                    break;
                }
            }
            if (!group) {
                group = {
                    events: [],
                    date: date
                };
                groups.push(group);
            }
            this._initEventStatus(event);
            group.events.push(event);
        }));
        // sort event by time
        groups.forEach((/**
         * @param {?} group
         * @return {?}
         */
        (group) => {
            group.events.sort((/**
             * @param {?} a
             * @param {?} b
             * @return {?}
             */
            (a, b) => a.startTime - b.startTime));
        }));
        return groups;
    }
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    _initEventStatus(event) {
        /** @type {?} */
        let now = new Date();
        event.progressing = event.start < now && event.end > now;
        event.ended = event.end < now;
        event.pending = event.start > now;
        if (event.progressing) {
            event.statusText = 'Đang diễn ra';
            event.statusColor = this.colors[0];
        }
        else if (event.pending) {
            event.statusText = 'Chưa diễn ra';
            event.statusColor = this.colors[5];
        }
        else {
            event.statusText = 'Kết thúc';
            event.statusColor = this.colors[6];
        }
        event.style = {
            'background-color': this.colors[event.mode]
        };
    }
}
CalendarWidgetComponent.decorators = [
    { type: Component, args: [{
                selector: 'calendar-widget',
                template: "<calendar-viewer #calendarViewer [locale]=\"locale\" (onChange)=\"changeMonth($event)\" (onActive)=\"activeDate($event)\"></calendar-viewer>\n<div class=\"calendar-container\" *ngIf=\"activeDateViewer?.events?.length\">\n    <div class=\"calendar-event__date\">{{activeDateTitle}}</div>\n    <div #viewToggle class=\"calendar-body\">\n        <div *ngFor=\"let event of activeDateViewer.events\" #targetEl (click)=\"onViewEvent(event, $event, targetEl)\"  class=\"calendar-event\">\n            <div  class=\"calendar-event__state\" [ngStyle]=\"event.style\"></div>\n            <div class=\"calendar-event__content\">\n                <div class=\"calendar-event__title\">\n                    {{event.subject}}\n                    <div class=\"calendar-event__progress\" [style.color]=\"event.statusColor\">{{event.statusText}}</div>\n                </div>\n                <div class=\"calendar-event__text\">\n                    <i class=\"fa fa-clock-o calendar-event__icon\"></i>\n                    {{event.hourStr}}\n                </div>\n                <div *ngIf=\"event.location\" class=\"calendar-event__text\">\n                    <i class=\"fa fa-map-marker calendar-event__icon\"></i>\n                    {{event.location}}\n                </div>\n            </div>\n        </div>\n    </div>\n</div>",
                styles: [".calendar-container{padding-bottom:15px}.calendar-event__date{font-size:12px;color:#757575;font-weight:700;margin:0 15px 5px;padding-top:15px;text-transform:uppercase;border-top:1px solid #ddd}.calendar-body{max-height:300px;overflow:hidden auto}.calendar-event{padding:5px 15px;color:#212121;cursor:pointer}.calendar-event:hover{background-color:rgba(0,0,0,.05)}.calendar-event__state{width:8px;height:8px;border-radius:50%;margin:5px 10px 0 0;float:left}.calendar-event__content{overflow:hidden}.calendar-event__title{font-size:14px;line-height:18px;margin-bottom:3px}.calendar-event__progress{font-size:11px;text-transform:uppercase;font-weight:700}.calendar-event__text{font-size:12px;line-height:18px;color:#757575}.calendar-event__icon{width:12px}"]
            }] }
];
/** @nocollapse */
CalendarWidgetComponent.ctorParameters = () => [
    { type: CalendarService }
];
CalendarWidgetComponent.propDecorators = {
    calendarViewer: [{ type: ViewChild, args: ['calendarViewer',] }],
    viewToggle: [{ type: ViewChild, args: ['viewToggle',] }],
    locale: [{ type: Input }],
    dateFormat: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    CalendarWidgetComponent.prototype.calendarViewer;
    /** @type {?} */
    CalendarWidgetComponent.prototype.viewToggle;
    /** @type {?} */
    CalendarWidgetComponent.prototype.locale;
    /** @type {?} */
    CalendarWidgetComponent.prototype.dateFormat;
    /** @type {?} */
    CalendarWidgetComponent.prototype.activeDateViewer;
    /** @type {?} */
    CalendarWidgetComponent.prototype.activeDateTitle;
    /** @type {?} */
    CalendarWidgetComponent.prototype.colors;
    /**
     * @type {?}
     * @private
     */
    CalendarWidgetComponent.prototype._date;
    /**
     * @type {?}
     * @private
     */
    CalendarWidgetComponent.prototype.calendarService;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class CalendarAttendeeListComponent {
    /**
     * @param {?} differs
     */
    constructor(differs) {
        this.attendees = [];
        this.editable = false;
        this.expandable = false;
        this.onDelete = new EventEmitter();
        this.expandEnable = true;
        this.expanded = true;
        this.differ = differs.find([]).create(null);
    }
    /**
     * @return {?}
     */
    ngDoCheck() {
        /** @type {?} */
        const change = this.differ.diff(this.attendees);
        // Detect push item on array
        if (change) {
            this.generateDetail();
        }
    }
    /**
     * @param {?} attendee
     * @return {?}
     */
    removeAttendee(attendee) {
        /** @type {?} */
        let index = this.attendees.indexOf(attendee);
        if (index > -1) {
            this.attendees.splice(index, 1);
            this.onDelete.emit();
        }
    }
    /**
     * @return {?}
     */
    generateDetail() {
        /** @type {?} */
        let accept = 0;
        /** @type {?} */
        let reject = 0;
        /** @type {?} */
        let unknown = 0;
        /** @type {?} */
        let arr = [];
        this.attendees.forEach((/**
         * @param {?} item
         * @return {?}
         */
        function (item) {
            if (item.state === CalAttendeeState.ACCEPTED) {
                item._stateText = 'Tham dự';
                accept++;
            }
            else if (item.state === CalAttendeeState.DECLINED) {
                item._stateText = 'Không tham dự';
                reject++;
            }
            else if (item.state === CalAttendeeState.NEEDS_ACTION) {
                item._stateText = 'Chưa quyết định';
                unknown++;
            }
        }));
        if (accept) {
            arr.push(accept + ' có');
        }
        if (reject) {
            arr.push(reject + ' không');
        }
        if (unknown) {
            arr.push(unknown + ' chưa quyết định');
        }
        this.stateText = arr.join(', ');
    }
    /**
     * @return {?}
     */
    expandAttendees() {
        if (this.expandEnable) {
            this.expanded = !this.expanded;
        }
    }
    /**
     * @param {?} attendee
     * @return {?}
     */
    getStateIcon(attendee) {
        /** @type {?} */
        let cls;
        switch (attendee.state) {
            case 'ACCEPTED':
                cls = 'fa-check accept';
                break;
            case 'DECLINED':
                cls = 'fa-check accept';
                break;
            default:
                cls = 'fa-check unknown';
        }
        return 'attendee-info fa ' + cls;
    }
}
CalendarAttendeeListComponent.decorators = [
    { type: Component, args: [{
                selector: 'calendar-attendee-list',
                template: "<div *ngIf=\"attendees?.length\" (click)=\"expandAttendees()\" [ngClass]=\"expandEnable ? 'expandable' : ''\"\n     class=\"attendee-detail\">\n    <span class=\"attendee-number\">{{attendees.length}} kh\u00E1ch</span>\n    <i *ngIf=\"expandEnable\" class=\"fa fa-angle-{{expanded ? 'up' : 'down'}}\" style=\"padding-left: 10px\"></i>\n    <div class=\"attendee-desc\">{{stateText}}</div>\n</div>\n<div [ngClass]=\"{'hide': !expanded}\">\n    <div class=\"attendee-item\" *ngFor=\"let attendee of attendees\">\n        <div>\n            <img *ngIf=\"attendee.username; else aliasAvatar\"\n                 class=\"attendee-avatar\"\n                 userAvatar [usercode]=\"attendee.username\">\n            <ng-template #aliasAvatar>\n                <i class=\"attendee-avatar fa fa-question\"></i>\n            </ng-template>\n        </div>\n        <i *ngIf=\"attendee.state\" [title]=\"attendee._stateText\" [ngClass]=\"getStateIcon(attendee)\"></i>\n        <div class=\"attendee-content\">\n            <b>{{attendee.fullname || attendee.alias}} </b>\n            <span> {{attendee.notes}}</span>\n        </div>\n        <div *ngIf=\"editable\">\n            <i class=\"attendee-remove fa fa-times\" (click)=\"removeAttendee(attendee)\"></i>\n        </div>\n    </div>\n</div>",
                styles: [".attendee-detail{margin-bottom:2px;line-height:16px;display:inline-block}.attendee-detail.expandable{cursor:pointer}.attendee-detail.expandable:hover{background:rgba(0,0,0,.04)}.attendee-number{font-size:14px}.attendee-desc{font-size:13px;color:rgba(0,0,0,.5)}.attendee-item{position:relative;padding:4px 0;overflow:hidden;display:flex;align-items:center}.attendee-item:hover{background:rgba(0,0,0,.04)}.attendee-item:hover .attendee-remove{display:block}.attendee-item .attendee-remove{flex-grow:0;color:rgba(0,0,0,.3);width:24px;height:24px;line-height:24px;cursor:pointer;text-align:center;display:none;font-size:12px}.attendee-avatar{flex-grow:0;width:24px;height:24px;border-radius:50%;margin-right:15px}i.attendee-avatar{text-align:center;line-height:24px;font-size:20px;background:#6c757d;color:#fff}.attendee-content{flex-grow:1;overflow:hidden;font-size:13px;line-height:16px;color:rgba(0,0,0,.5)}.attendee-content b{color:rgba(0,0,0,.7)}.attendee-info{position:absolute;top:50%;left:18px;font-size:8px;width:14px;height:14px;line-height:12px;border-radius:50%;border:1px solid #fff;color:#fff;text-align:center}.attendee-info.accept{background:#28a745}.attendee-info.reject{background:#dc3545}.attendee-info.unknown{background:#6c757d}"]
            }] }
];
/** @nocollapse */
CalendarAttendeeListComponent.ctorParameters = () => [
    { type: IterableDiffers }
];
CalendarAttendeeListComponent.propDecorators = {
    attendees: [{ type: Input }],
    editable: [{ type: Input }],
    expandable: [{ type: Input }],
    onDelete: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    CalendarAttendeeListComponent.prototype.attendees;
    /** @type {?} */
    CalendarAttendeeListComponent.prototype.editable;
    /** @type {?} */
    CalendarAttendeeListComponent.prototype.expandable;
    /** @type {?} */
    CalendarAttendeeListComponent.prototype.onDelete;
    /** @type {?} */
    CalendarAttendeeListComponent.prototype.differ;
    /** @type {?} */
    CalendarAttendeeListComponent.prototype.stateText;
    /** @type {?} */
    CalendarAttendeeListComponent.prototype.expandEnable;
    /** @type {?} */
    CalendarAttendeeListComponent.prototype.expanded;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const routes = [
    {
        path: 'calendar/v',
        children: [{
                path: '**',
                component: CalendarComponent
            }]
    },
    {
        path: 'calendar/event',
        children: [
            {
                path: ':id',
                component: CalendarFormComponent
            },
            {
                path: '**',
                redirectTo: 'create',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: 'calendar/create',
        children: [
            {
                path: ':data',
                component: CalendarFormComponent
            },
            {
                path: '**',
                component: CalendarFormComponent
            }
        ]
    },
    {
        path: 'calendar',
        redirectTo: 'calendar/v',
        pathMatch: 'full'
    }
];
class CalendarRoutingModule {
}
CalendarRoutingModule.decorators = [
    { type: NgModule, args: [{
                imports: [RouterModule.forChild(routes)],
                exports: [RouterModule]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const FILES_FORMAT = [
    'unknown', 'text', 'archive', 'audio', 'video',
    'png', 'jpg', 'gif', 'tiff', 'svg', 'ai', 'psd', 'dwg',
    'avi', 'fla', 'mp2', 'mp3', 'mp4', 'aac', 'flac', 'wma', 'wav', 'mxf',
    'iso', 'mdf', 'nrg',
    'zip', '7z', 'arj', 'rar',
    'pdf', 'doc', 'rtf', 'txt', 'xls', 'ppt',
    'css', 'csv', 'html', 'json', 'js', 'xml',
    'dbf', 'exe'
];
/** @type {?} */
const FILES_EDIT_FORMAT = [
    'doc', 'docx', 'odt', 'ods', 'xls', 'xlsx',
    'ppt', 'pps', 'pptm', 'pptx', 'pot', 'potx',
    'dot', 'dotx', 'docm', 'dotx', 'csv', 'sxw'
];
/** @type {?} */
const FILES_VIEW_FORMAT = ['pdf', 'png', 'jpg', 'jpeg', 'gif'];
/** @type {?} */
const UNKNOWN = 'unknown';
class FileFormatService {
    constructor() { }
    /**
     * @return {?}
     */
    getImagePath() {
        /** @type {?} */
        let path = iNet.commonImageFolder;
        /** @type {?} */
        const lastIndex = path.lastIndexOf('/');
        if (lastIndex === path.length - 1) {
            return path.substring(0, lastIndex);
        }
        return path;
    }
    /**
     * @return {?}
     */
    getFileFormatPath() {
        return `${this.getImagePath()}/format`;
    }
    /**
     * @param {?} ext
     * @return {?}
     */
    getUrlByExt(ext) {
        /** @type {?} */
        const path = this.getFileFormatPath();
        if (FILES_FORMAT.indexOf(ext) > -1) {
            return `${path}/${ext.toLowerCase()}.svg`;
        }
        return `${path}/${UNKNOWN}.svg`;
    }
    /**
     * @param {?} name
     * @return {?}
     */
    getUrlByName(name) {
        return this.getUrlByExt(this.getExtByName(name));
    }
    /**
     * @param {?} name
     * @return {?}
     */
    getExtByName(name) {
        return name.split('.').pop().toLowerCase() || UNKNOWN;
    }
    /**
     * @return {?}
     */
    getEditFormats() {
        return FILES_EDIT_FORMAT;
    }
    /**
     * @return {?}
     */
    getViewFormats() {
        return FILES_VIEW_FORMAT;
    }
}
FileFormatService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
FileFormatService.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FileExtPipe {
    /**
     * @param {?} formatService
     */
    constructor(formatService) {
        this.formatService = formatService;
    }
    /**
     * @param {?} name
     * @return {?}
     */
    transform(name) {
        return this.formatService.getExtByName(name);
    }
}
FileExtPipe.decorators = [
    { type: Pipe, args: [{
                name: 'fileExt'
            },] }
];
/** @nocollapse */
FileExtPipe.ctorParameters = () => [
    { type: FileFormatService }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    FileExtPipe.prototype.formatService;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FileIconPipe {
    /**
     * @param {?} formatService
     */
    constructor(formatService) {
        this.formatService = formatService;
    }
    /**
     * @param {?} name
     * @return {?}
     */
    transform(name) {
        return this.formatService.getUrlByName(name);
    }
}
FileIconPipe.decorators = [
    { type: Pipe, args: [{
                name: 'fileIcon'
            },] }
];
/** @nocollapse */
FileIconPipe.ctorParameters = () => [
    { type: FileFormatService }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    FileIconPipe.prototype.formatService;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class FileListModule {
}
FileListModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                declarations: [
                    FileIconPipe,
                    FileExtPipe,
                    FileListComponent
                ],
                exports: [
                    FileIconPipe,
                    FileExtPipe,
                    FileListComponent
                ],
                providers: [FileFormatService]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class TimePickerModalComponent {
    /**
     * @param {?} el
     */
    constructor(el) {
        this.el = el;
        this.arrowkeys = true;
        this.hourStep = 1;
        this.minuteStep = 15;
        this.mousewheel = true;
        this.readonlyInput = false;
        this.secondsStep = 10;
        this.showMinutes = true;
        this.showSpinners = true;
        this.onChange = new EventEmitter();
    }
    /**
     * @param {?} date
     * @return {?}
     */
    set time(date) {
        this._timeDate = date;
        this.timeStr = TimePickerModalComponent._formatDate(date);
        this.onChange.emit(this.timeStr);
    }
    /**
     * @return {?}
     */
    get time() {
        return this._timeDate;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.$modal = $(this.el.nativeElement).detach().addClass('modal');
        this.$modalContent = this.$modal.find('.time-picker-modal');
        // Touched close
        this.$modal.on('mousedown click', (/**
         * @param {?} e
         * @return {?}
         */
        (e) => {
            if (e.target.isSameNode(this.$modal[0])) {
                this.close();
            }
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.$modal.remove();
    }
    /**
     * @return {?}
     */
    close() {
        this.$modal.detach();
    }
    /**
     * @param {?} css
     * @return {?}
     */
    open(css) {
        this.$modalContent.css(css);
        document.body.appendChild(this.$modal[0]);
    }
    /**
     * @private
     * @param {?} date
     * @return {?}
     */
    static _formatDate(date) {
        if (!date || !date.getTime()) {
            return '';
        }
        else {
            return ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);
        }
    }
}
TimePickerModalComponent.decorators = [
    { type: Component, args: [{
                selector: 'time-picker-modal',
                template: "<div class=\"time-picker-modal\">\n    <timepicker #timePicker [(ngModel)]=\"time\"\n                [arrowkeys]=\"arrowkeys\"\n                [max]=\"max\"\n                [min]=\"min\"\n                [minuteStep]=\"minuteStep\"\n                [mousewheel]=\"mousewheel\"\n                [readonlyInput]=\"readonlyInput\"\n                [secondsStep]=\"secondsStep\"\n                [showMeridian]=\"showMeridian\"\n                [showMinutes]=\"showMinutes\"\n                [showSeconds]=\"showSeconds\"\n                [showSpinners]=\"showSpinners\">\n\n    </timepicker>\n</div>",
                styles: [":host(.modal){display:block;z-index:1101}.time-picker-modal{position:absolute;border:1px solid rgba(0,0,0,.2);background:#fff;border-radius:4px;padding:10px}"]
            }] }
];
/** @nocollapse */
TimePickerModalComponent.ctorParameters = () => [
    { type: ElementRef }
];
TimePickerModalComponent.propDecorators = {
    arrowkeys: [{ type: Input }],
    hourStep: [{ type: Input }],
    max: [{ type: Input }],
    min: [{ type: Input }],
    minuteStep: [{ type: Input }],
    mousewheel: [{ type: Input }],
    readonlyInput: [{ type: Input }],
    secondsStep: [{ type: Input }],
    showMeridian: [{ type: Input }],
    showMinutes: [{ type: Input }],
    showSeconds: [{ type: Input }],
    showSpinners: [{ type: Input }],
    time: [{ type: Input }],
    onChange: [{ type: Output }],
    timePicker: [{ type: ViewChild, args: ['timePicker',] }]
};
if (false) {
    /** @type {?} */
    TimePickerModalComponent.prototype.arrowkeys;
    /** @type {?} */
    TimePickerModalComponent.prototype.hourStep;
    /** @type {?} */
    TimePickerModalComponent.prototype.max;
    /** @type {?} */
    TimePickerModalComponent.prototype.min;
    /** @type {?} */
    TimePickerModalComponent.prototype.minuteStep;
    /** @type {?} */
    TimePickerModalComponent.prototype.mousewheel;
    /** @type {?} */
    TimePickerModalComponent.prototype.readonlyInput;
    /** @type {?} */
    TimePickerModalComponent.prototype.secondsStep;
    /** @type {?} */
    TimePickerModalComponent.prototype.showMeridian;
    /** @type {?} */
    TimePickerModalComponent.prototype.showMinutes;
    /** @type {?} */
    TimePickerModalComponent.prototype.showSeconds;
    /** @type {?} */
    TimePickerModalComponent.prototype.showSpinners;
    /** @type {?} */
    TimePickerModalComponent.prototype.onChange;
    /** @type {?} */
    TimePickerModalComponent.prototype.timePicker;
    /** @type {?} */
    TimePickerModalComponent.prototype.timeStr;
    /** @type {?} */
    TimePickerModalComponent.prototype.$modal;
    /** @type {?} */
    TimePickerModalComponent.prototype.$modalContent;
    /**
     * @type {?}
     * @private
     */
    TimePickerModalComponent.prototype._timeDate;
    /** @type {?} */
    TimePickerModalComponent.prototype.el;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const DEFAULT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef((/**
     * @return {?}
     */
    () => TimePickerModalDirective)),
    multi: true
};
class TimePickerModalDirective {
    /**
     * @param {?} el
     */
    constructor(el) {
        this.el = el;
        this.valueChange = new EventEmitter();
    }
    /**
     * @return {?}
     */
    onFocus() {
        this.open();
        this.onChange();
    }
    /**
     * @return {?}
     */
    onChange() {
        this.timePickerModal.time = this.getDateInput();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (!this.timePickerModal) {
            console.error('[TimePickerModalDirective] Missing timePickerModal');
        }
        this.timePickerModal.onChange.subscribe((/**
         * @param {?} timeStr
         * @return {?}
         */
        (timeStr) => {
            this.writeValue(timeStr);
            if (this.propagateChange) {
                this.propagateChange(timeStr);
            }
        }));
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this.el.nativeElement.value = value;
        this.valueChange.emit(value);
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.propagateChange = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
    }
    /**
     * @return {?}
     */
    open() {
        /** @type {?} */
        let bounding = this.el.nativeElement.getBoundingClientRect();
        /** @type {?} */
        let css = {
            left: bounding.left
        };
        if (bounding.top + 150 < innerHeight) {
            // Show bottom
            css['top'] = bounding.top + bounding.height + 2;
        }
        else {
            // Show top
            css['bottom'] = bounding.top - 2;
        }
        this.timePickerModal.open(css);
    }
    /**
     * @return {?}
     */
    close() {
        this.timePickerModal.close();
    }
    /**
     * @private
     * @return {?}
     */
    getDateInput() {
        /** @type {?} */
        let value = this.getValue();
        if (!value) {
            return null;
        }
        /** @type {?} */
        let date = new Date();
        date.setMinutes(0);
        // HH:mm:ss format
        /** @type {?} */
        let times;
        if (value.indexOf(':') > -1) {
            times = value.split(':');
        }
        else {
            times = [];
            for (let i = 0; i < value.length + 1; i += 2) {
                times.push(value.substr(i, 2));
            }
        }
        times[0] = Number(times[0]);
        times[1] = Number(times[1]) || 0;
        // Invalid time
        if (!times[0] && times[0] !== 0) {
            return null;
        }
        date.setHours(times[0]);
        date.setMinutes(times[1]);
        return date;
    }
    /**
     * @private
     * @return {?}
     */
    getValue() {
        return this.el.nativeElement.value.trim();
    }
}
TimePickerModalDirective.decorators = [
    { type: Directive, args: [{
                selector: '[timePicker]',
                providers: [DEFAULT_VALUE_ACCESSOR]
            },] }
];
/** @nocollapse */
TimePickerModalDirective.ctorParameters = () => [
    { type: ElementRef }
];
TimePickerModalDirective.propDecorators = {
    valueChange: [{ type: Output }],
    timePickerModal: [{ type: Input }],
    onFocus: [{ type: HostListener, args: ['focus',] }],
    onChange: [{ type: HostListener, args: ['change',] }]
};
if (false) {
    /** @type {?} */
    TimePickerModalDirective.prototype.valueChange;
    /** @type {?} */
    TimePickerModalDirective.prototype.timePickerModal;
    /**
     * @type {?}
     * @private
     */
    TimePickerModalDirective.prototype.propagateChange;
    /**
     * @type {?}
     * @private
     */
    TimePickerModalDirective.prototype.el;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * TimePickerModal: https://valor-software.com/ngx-bootstrap/#/timepicker#timepicker-config
 *
 * <input type="text" class="form-control" timePicker [timePickerModal]="timeEndModal" [(ngModel)]="timeStr">
 * <time-picker-modal #timeEndModal></time-picker-modal>
 *
 */
class TimePickerModalModule {
}
TimePickerModalModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    TimepickerModule.forRoot(),
                    CommonModule,
                    FormsModule
                ],
                declarations: [
                    TimePickerModalDirective,
                    TimePickerModalComponent
                ],
                exports: [
                    TimePickerModalDirective,
                    TimePickerModalComponent,
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class CalendarModule {
}
CalendarModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    BsDatepickerModule.forRoot(),
                    TimepickerModule.forRoot(),
                    ModalModule.forRoot(),
                    TypeaheadModule.forRoot(),
                    ReactiveFormsModule,
                    CommonModule,
                    FormsModule,
                    CoreModule,
                    FileListModule,
                    CommonModule,
                    TimePickerModalModule,
                    HttpClientModule,
                    CalendarRoutingModule
                ],
                exports: [
                    CalendarComponent,
                    CalendarDialogRepeatComponent,
                    CalendarFormComponent,
                    CalendarTodayComponent,
                    CalendarWidgetComponent,
                    CalendarDialogViewComponent,
                    CalendarAttendeeListComponent,
                    CalendarDialogDelete,
                    AttachmentListComponent,
                    CalendarViewerComponent
                ],
                declarations: [
                    CalendarComponent,
                    CalendarDialogRepeatComponent,
                    CalendarFormComponent,
                    CalendarTodayComponent,
                    CalendarWidgetComponent,
                    CalendarDialogViewComponent,
                    CalendarAttendeeListComponent,
                    CalendarDialogDelete,
                    AttachmentListComponent,
                    CalendarViewerComponent
                ],
                providers: [
                    CalendarService,
                    ResourceLoaderService,
                    SuggestionService
                ],
                entryComponents: [
                    CalendarDialogViewComponent
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { CalendarComponent, CalendarFormComponent, CalendarMode, CalendarModule, CalendarService, CalendarViewMode, FileListModule as ɵa, FileIconPipe as ɵb, FileFormatService as ɵc, FileExtPipe as ɵd, FileListComponent as ɵe, TimePickerModalModule as ɵf, DEFAULT_VALUE_ACCESSOR as ɵg, TimePickerModalDirective as ɵh, TimePickerModalComponent as ɵi, CalendarRoutingModule as ɵj, CalendarTodayComponent as ɵk, AttachmentListComponent as ɵl, CalendarDialogRepeatComponent as ɵm, CalendarWidgetComponent as ɵn, CalendarDialogViewComponent as ɵo, CalendarAttendeeListComponent as ɵp, CalendarDialogDelete as ɵq, CalendarViewerComponent as ɵr };
//# sourceMappingURL=inet-calendar.js.map
