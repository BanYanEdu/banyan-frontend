(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('@angular/router'), require('inet-core'), require('moment'), require('ngx-bootstrap'), require('@fullcalendar/core'), require('@fullcalendar/daygrid'), require('@fullcalendar/timegrid'), require('@fullcalendar/interaction'), require('rxjs/operators'), require('rxjs'), require('@angular/common/http'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('inet-calendar', ['exports', '@angular/core', '@angular/forms', '@angular/router', 'inet-core', 'moment', 'ngx-bootstrap', '@fullcalendar/core', '@fullcalendar/daygrid', '@fullcalendar/timegrid', '@fullcalendar/interaction', 'rxjs/operators', 'rxjs', '@angular/common/http', '@angular/common'], factory) :
    (global = global || self, factory(global['inet-calendar'] = {}, global.ng.core, global.ng.forms, global.ng.router, global.inetCore, global.moment_, global.ngxBootstrap, global.core$1, global.dayGridPlugin, global.timeGridPlugin, global.interactionPlugin, global.rxjs.operators, global.rxjs, global.ng.common.http, global.ng.common));
}(this, (function (exports, core, forms, router, inetCore, moment_, ngxBootstrap, core$1, dayGridPlugin, timeGridPlugin, interactionPlugin, operators, rxjs, http, common) { 'use strict';

    dayGridPlugin = dayGridPlugin && dayGridPlugin.hasOwnProperty('default') ? dayGridPlugin['default'] : dayGridPlugin;
    timeGridPlugin = timeGridPlugin && timeGridPlugin.hasOwnProperty('default') ? timeGridPlugin['default'] : timeGridPlugin;
    interactionPlugin = interactionPlugin && interactionPlugin.hasOwnProperty('default') ? interactionPlugin['default'] : interactionPlugin;

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
    var vnToLatin = (/**
     * @param {?} str
     * @return {?}
     */
    function (str) {
        return str.replace(/[^\u0000-\u007E]/g, (/**
         * @param {?} a
         * @return {?}
         */
        function (a) {
            /** @type {?} */
            var index = accents_arr.indexOf(a);
            return index < 0 ? a : no_accents_arr[index];
        }));
    });

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var DateUtils = {
        firstDay: 1,
        getWeekRange: /**
         * @param {?} date
         * @param {?=} firstDay
         * @return {?}
         */
        function (date, firstDay) {
            /** @type {?} */
            var startDate = this.getDateStartWeek(date, firstDay);
            /** @type {?} */
            var endDate = new Date(startDate);
            endDate.setDate(endDate.getDate() + 6);
            return {
                startWeek: startDate,
                endWeek: endDate
            };
        },
        getDayIndexOnWeek: /**
         * @param {?} date
         * @param {?=} firstDay
         * @return {?}
         */
        function (date, firstDay) {
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
        getDateStartWeek: /**
         * @param {?} date
         * @param {?=} firstDay
         * @return {?}
         */
        function (date, firstDay) {
            /** @type {?} */
            var distance = this.getDayIndexOnWeek(date, firstDay);
            date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            date.setDate(date.getDate() - distance);
            return date;
        },
        getDateEndWeek: /**
         * @param {?} date
         * @param {?=} firstDay
         * @return {?}
         */
        function (date, firstDay) {
            /** @type {?} */
            var endDate = this.getDateStartWeek(date, firstDay);
            endDate.setDate(endDate.getDate() + 6);
            return endDate;
        },
        dayOfYear: /**
         * @param {?} date
         * @return {?}
         */
        function (date) {
            /** @type {?} */
            var jan = new Date(date.getFullYear(), 0, 1);
            jan.setTime(jan.getTime() - 1);
            return Math.ceil((date.getTime() - jan.getTime()) / 86400000);
        },
        getWeek: /**
         * @param {?} date
         * @param {?=} firstDay
         * @return {?}
         */
        function (date, firstDay) {
            /** @type {?} */
            var startYear = new Date(date.getFullYear(), 0, 1);
            /** @type {?} */
            var startWeek = this.getDateStartWeek(date, firstDay);
            /** @type {?} */
            var dayInYear = this.dayOfYear(startWeek);
            return Math.ceil(dayInYear / 7);
        },
        getDateFromWeek: /**
         * @param {?} w
         * @param {?} y
         * @return {?}
         */
        function (w, y) {
            /** @type {?} */
            var d = (1 + (w - 1) * 7);
            return new Date(y, 0, d);
        },
        dateIsToday: /**
         * @param {?} date
         * @return {?}
         */
        function (date) {
            /** @type {?} */
            var now = new Date();
            /** @type {?} */
            var compareDate = new Date(date);
            now.setHours(0, 0, 0, 0);
            compareDate.setHours(0, 0, 0, 0);
            return now.getTime() === compareDate.getTime();
        },
        weekIsToday: /**
         * @param {?} date
         * @return {?}
         */
        function (date) {
            return this.getWeek(date) === this.getWeek(new Date());
        },
        isSameWeek: /**
         * @param {?} a
         * @param {?} b
         * @return {?}
         */
        function (a, b) {
            return this.getWeek(a) === this.getWeek(b);
        }
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var AjaxAPI = {
        getUrl: /**
         * @param {?} url
         * @param {?=} domain
         * @param {?=} firmPrefix
         * @return {?}
         */
        function (url, domain, firmPrefix) {
            if (url.indexOf('://') > -1)
                return url;
            domain = domain || iNet.getUrl('{0}');
            url = domain.replace('{0}', url);
            // Change firm prefix
            if (firmPrefix) {
                /** @type {?} */
                var urls = url.split('/');
                urls[4] = firmPrefix;
                url = urls.join('/');
            }
            return url;
        },
        // Get url by subfirm
        getPUrl: 
        // Get url by subfirm
        /**
         * @param {?} url
         * @param {?=} domain
         * @param {?=} firmPrefix
         * @return {?}
         */
        function (url, domain, firmPrefix) {
            return this.getUrl(url, domain, firmPrefix || iNet.firmPrefix);
        },
        // Send request
        sendRequest: 
        // Send request
        /**
         * @param {?} options
         * @return {?}
         */
        function (options) {
            return $.ajax(options);
        },
        // Post ajax by FormData
        postForm: 
        // Post ajax by FormData
        /**
         * @param {?} options
         * @return {?}
         */
        function (options) {
            options = $.extend({}, options, {
                type: 'post',
                cache: false,
                contentType: false,
                processData: false
            });
            // build form data
            if (options.data && options.data.toString().indexOf('FormData') < 0) {
                /** @type {?} */
                var form = new FormData();
                for (var k in options.data) {
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
    var CalAttendeeType = {
        ALIAS: 'alias',
        ORGAN: 'org',
        USER: 'user',
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var CalConfigs = [
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
    var CalType = {
        COMMUNITY: 'COMMUNITY',
        ORGANIZATION: 'ORGANIZATION',
        DEPARTMENT: 'DEPARTMENT',
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @enum {string} */
    var CalCategory = {
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
    var CalCategoryIcon = {
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
    var CalAttendeeRole = {
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
    var CalSubType = {
        MEET_PEOPLE: "COMMUNITY;MEET_PEOPLE",
        PERSONAL: "ORGANIZATION;PERSONAL",
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @enum {number} */
    var CalMode = {
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
    var SubFirmDictionary = /** @class */ (function () {
        function SubFirmDictionary() {
        }
        /**
         * @param {?} data
         * @param {?} callback
         * @return {?}
         */
        SubFirmDictionary.prototype.create = /**
         * @param {?} data
         * @param {?} callback
         * @return {?}
         */
        function (data, callback) {
            $.ajax({
                type: 'post',
                url: this.getUrl('subfirm/dictionary/create'),
                data: data,
                success: (/**
                 * @param {?} data
                 * @return {?}
                 */
                function (data) { return callback(data); }),
                error: (/**
                 * @return {?}
                 */
                function () { return callback(null); })
            });
        };
        /**
         * @param {?} data
         * @param {?} callback
         * @return {?}
         */
        SubFirmDictionary.prototype.update = /**
         * @param {?} data
         * @param {?} callback
         * @return {?}
         */
        function (data, callback) {
            data.dictID = data.dictID || data.uuid;
            $.ajax({
                type: 'post',
                url: this.getUrl('subfirm/dictionary/update'),
                data: data,
                success: (/**
                 * @param {?} data
                 * @return {?}
                 */
                function (data) { return callback(data); }),
                error: (/**
                 * @return {?}
                 */
                function () { return callback(null); })
            });
        };
        /**
         * @param {?} data
         * @param {?} callback
         * @return {?}
         */
        SubFirmDictionary.prototype.remove = /**
         * @param {?} data
         * @param {?} callback
         * @return {?}
         */
        function (data, callback) {
            data.dictID = data.dictID || data.uuid;
            $.ajax({
                url: this.getUrl('subfirm/dictionary/remove'),
                data: data,
                success: (/**
                 * @param {?} data
                 * @return {?}
                 */
                function (data) { return callback(data); }),
                error: (/**
                 * @return {?}
                 */
                function () { return callback(null); })
            });
        };
        /**
         * @param {?} reference
         * @param {?} callback
         * @return {?}
         */
        SubFirmDictionary.prototype.list = /**
         * @param {?} reference
         * @param {?} callback
         * @return {?}
         */
        function (reference, callback) {
            $.ajax({
                url: this.getUrl('subfirm/dictionary/list'),
                data: {
                    reference: reference
                },
                success: (/**
                 * @param {?} data
                 * @return {?}
                 */
                function (data) { return callback(data && data.items || []); }),
                error: (/**
                 * @return {?}
                 */
                function () { return callback([]); })
            });
        };
        /**
         * @param {?} url
         * @return {?}
         */
        SubFirmDictionary.prototype.getUrl = /**
         * @param {?} url
         * @return {?}
         */
        function (url) {
            return iNet.getPUrl(url);
        };
        return SubFirmDictionary;
    }());
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
    var CalAttendeeState = {
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
    var LEADER_REFERENCE = 'CAL_BUILDER_LEADER';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var moment = moment_;
    window['moment'] = moment;
    var CalBuilder = /** @class */ (function () {
        function CalBuilder() {
            var _this = this;
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
            function (type) { return type === CalType.DEPARTMENT; });
            this.typeIsCommunity = (/**
             * @param {?} type
             * @return {?}
             */
            function (type) { return type === CalType.COMMUNITY; });
            this.typeIsOrganization = (/**
             * @param {?} type
             * @return {?}
             */
            function (type) { return type === CalType.ORGANIZATION; });
            this.catIsInvitation = (/**
             * @param {?} category
             * @return {?}
             */
            function (category) { return CalCategory.INVITATION === category; });
            this.catIsPersonal = (/**
             * @param {?} category
             * @return {?}
             */
            function (category) { return CalCategory.PERSONAL === category; });
            this.catIsCar = (/**
             * @param {?} category
             * @return {?}
             */
            function (category) { return CalCategory.CAR === category; });
            this.catIsImportant = (/**
             * @param {?} category
             * @return {?}
             */
            function (category) { return CalCategory.IMPORTANT === category; });
            this.formatDateStr = (/**
             * @param {?} date
             * @return {?}
             */
            function (date) { return _this.formatDate(date, _this.getConfigValue('DATE_FORMAT')); });
            this.formatTimeStr = (/**
             * @param {?} date
             * @return {?}
             */
            function (date) { return _this.formatDate(date, _this.getConfigValue('TIME_FORMAT')); });
            this.formatDateTimeStr = (/**
             * @param {?} date
             * @return {?}
             */
            function (date) { return _this.formatDate(date, _this.getConfigValue('DATE_TIME_FORMAT')); });
            this.formatDate = (/**
             * @param {?} date
             * @param {?} format
             * @return {?}
             */
            function (date, format) { return moment(date).format(format); });
            this.getEventStatus = (/**
             * @param {?} mode
             * @return {?}
             */
            function (mode) { return _this.resources.statuses[mode]; });
            this.isCreate = (/**
             * @param {?} mode
             * @return {?}
             */
            function (mode) { return mode === CalMode.CREATE; });
            this.isPublish = (/**
             * @param {?} mode
             * @return {?}
             */
            function (mode) { return mode === CalMode.PUBLISH; });
            this.isSent = (/**
             * @param {?} mode
             * @return {?}
             */
            function (mode) { return mode === CalMode.SENT; });
            this.isCancel = (/**
             * @param {?} mode
             * @return {?}
             */
            function (mode) { return mode === CalMode.CANCEL; });
            this.isOther = (/**
             * @param {?} mode
             * @return {?}
             */
            function (mode) { return mode === CalMode.OTHER; });
        }
        /**
         * @return {?}
         */
        CalBuilder.prototype._applyConfig = /**
         * @return {?}
         */
        function () {
            var _this = this;
            iNet.apply(this, DateUtils);
            // Apply config
            if (window['xCalendarConfigList'] && window['xCalendarConfigList'].length > 0) {
                window['xCalendarConfigList'].forEach((/**
                 * @param {?} config
                 * @return {?}
                 */
                function (config) {
                    /** @type {?} */
                    var obj = _this.getConfigObj(config.name);
                    if (obj) {
                        $.extend(obj, config);
                    }
                    else {
                        _this.configs.push(config);
                    }
                }));
            }
            if (window['xCalendarConfigCustoms']) {
                for (var k in window['xCalendarConfigCustoms']) {
                    /** @type {?} */
                    var obj = this.getConfigObj(k);
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
        };
        /**
         * @param {?} name
         * @return {?}
         */
        CalBuilder.prototype.getConfigValue = /**
         * @param {?} name
         * @return {?}
         */
        function (name) {
            /** @type {?} */
            var obj = this.getConfigObj(name);
            return obj && obj.value;
        };
        /**
         * @param {?} name
         * @return {?}
         */
        CalBuilder.prototype.getConfigObj = /**
         * @param {?} name
         * @return {?}
         */
        function (name) {
            for (var i = 0; i < this.configs.length; i++) {
                if (this.configs[i].name === name) {
                    return this.configs[i];
                }
            }
        };
        /**
         * @param {?} name
         * @param {?} executor
         * @param {?} callback
         * @return {?}
         */
        CalBuilder.prototype.addQueue = /**
         * @param {?} name
         * @param {?} executor
         * @param {?} callback
         * @return {?}
         */
        function (name, executor, callback) {
            var _this = this;
            this._queue[name] = this._queue[name] || [];
            this._queue[name].push(callback);
            if (this._queue[name].length === 1) {
                new Promise((/**
                 * @param {?} resolve
                 * @return {?}
                 */
                function (resolve) {
                    executor(resolve);
                })).then((/**
                 * @param {?} value
                 * @return {?}
                 */
                function (value) {
                    _this._queue[name].forEach((/**
                     * @param {?} fn
                     * @return {?}
                     */
                    function (fn) {
                        fn && fn(value);
                    }));
                    delete _this._queue[name];
                }));
            }
        };
        /**
         * @param {?} callback
         * @param {?=} options
         * @return {?}
         */
        CalBuilder.prototype.ready = /**
         * @param {?} callback
         * @param {?=} options
         * @return {?}
         */
        function (callback, options) {
            var _this = this;
            this._loadOrgans((/**
             * @param {?} organs
             * @return {?}
             */
            function (organs) {
                callback(organs, _this._getOrganOnInit());
            }), options);
        };
        // Cache all org in a minute for performance
        // Cache all org in a minute for performance
        /**
         * @param {?} key
         * @param {?=} value
         * @return {?}
         */
        CalBuilder.prototype.cacheSessionStorage = 
        // Cache all org in a minute for performance
        /**
         * @param {?} key
         * @param {?=} value
         * @return {?}
         */
        function (key, value) {
            try {
                if (!value) {
                    // Cache data in a minute
                    /** @type {?} */
                    var timeCache = 5 * 60000;
                    /** @type {?} */
                    var cache = sessionStorage.getItem(key);
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
        };
        // Cache data on global window, refresh tab will reset
        // Cache data on global window, refresh tab will reset
        /**
         * @param {?} key
         * @param {?=} data
         * @return {?}
         */
        CalBuilder.prototype.cacheDataTemp = 
        // Cache data on global window, refresh tab will reset
        /**
         * @param {?} key
         * @param {?=} data
         * @return {?}
         */
        function (key, data) {
            this._cacheStore = this._cacheStore || {};
            if (data === undefined) {
                return this._cacheStore[key];
            }
            else {
                this._cacheStore[key] = data;
            }
        };
        /**
         * @param {?} orgid
         * @return {?}
         */
        CalBuilder.prototype.setOrgId = /**
         * @param {?} orgid
         * @return {?}
         */
        function (orgid) {
            this.orgid = orgid;
            this._cacheOrgId(orgid);
        };
        /**
         * @return {?}
         */
        CalBuilder.prototype.getOrgId = /**
         * @return {?}
         */
        function () {
            return this.orgid || this._cacheOrgId() || iNet.organId;
        };
        /**
         * @param {?=} orgid
         * @return {?}
         */
        CalBuilder.prototype._cacheOrgId = /**
         * @param {?=} orgid
         * @return {?}
         */
        function (orgid) {
            /** @type {?} */
            var id = 'xcalendar_orgid';
            try {
                if (!orgid) {
                    return localStorage.getItem(id);
                }
                else {
                    localStorage.setItem(id, orgid);
                }
            }
            catch (e) { }
        };
        /**
         * @param {?=} date
         * @return {?}
         */
        CalBuilder.prototype.getHourMinute = /**
         * @param {?=} date
         * @return {?}
         */
        function (date) {
            if (date.getTime) {
                // date object
                return date.getHours() * 60 + date.getMinutes();
            }
            else {
                // string hour
                date = date.split(':');
                return Number(date[0]) * 60 + Number(date[1]);
            }
        };
        /**
         * @param {?} form
         * @param {?} success
         * @param {?=} options
         * @return {?}
         */
        CalBuilder.prototype.create = /**
         * @param {?} form
         * @param {?} success
         * @param {?=} options
         * @return {?}
         */
        function (form, success, options) {
            var _this = this;
            return this.postForm({
                url: 'calbuilder/element/create',
                data: form,
                success: (/**
                 * @param {?} event
                 * @return {?}
                 */
                function (event) {
                    if (event && event.uuid)
                        _this.indexEvent(event);
                    success(event);
                })
            }, options);
        };
        /**
         * @param {?} params
         * @param {?} success
         * @param {?=} options
         * @return {?}
         */
        CalBuilder.prototype.updateEventByRole = /**
         * @param {?} params
         * @param {?} success
         * @param {?=} options
         * @return {?}
         */
        function (params, success, options) {
            var _this = this;
            /** @type {?} */
            var organId = params && params.orgid || this.getOrgId();
            this.loadRole(organId, (/**
             * @return {?}
             */
            function () {
                /** @type {?} */
                var event = _this.getEventByObjectId(params && params.element);
                if (_this.isReviewer(organId)) {
                    _this.reviewUpdate(params, success, options);
                }
                else if (_this.isOwnReviewer(organId) && event && _this.meIsCreator(event)) {
                    _this.ownerReviewUpdate(params, success, options);
                }
                else {
                    _this.update(params, success, options);
                }
            }), options);
        };
        /**
         * @param {?} form
         * @param {?} success
         * @param {?=} options
         * @return {?}
         */
        CalBuilder.prototype.update = /**
         * @param {?} form
         * @param {?} success
         * @param {?=} options
         * @return {?}
         */
        function (form, success, options) {
            var _this = this;
            return this.postForm({
                url: 'calbuilder/element/update',
                data: form,
                success: (/**
                 * @param {?} event
                 * @return {?}
                 */
                function (event) {
                    if (event && event.uuid)
                        _this.indexEvent(event);
                    success && success(event);
                })
            }, options);
        };
        /**
         * @param {?} form
         * @param {?} success
         * @param {?=} options
         * @return {?}
         */
        CalBuilder.prototype.reviewUpdate = /**
         * @param {?} form
         * @param {?} success
         * @param {?=} options
         * @return {?}
         */
        function (form, success, options) {
            var _this = this;
            return this.postForm({
                url: 'calbuilder/reviewupdate',
                data: form,
                success: (/**
                 * @param {?} event
                 * @return {?}
                 */
                function (event) {
                    if (event && event.uuid)
                        _this.indexEvent(event);
                    success && success(event);
                })
            }, options);
        };
        /**
         * @param {?} form
         * @param {?} success
         * @param {?=} options
         * @return {?}
         */
        CalBuilder.prototype.ownerReviewUpdate = /**
         * @param {?} form
         * @param {?} success
         * @param {?=} options
         * @return {?}
         */
        function (form, success, options) {
            var _this = this;
            return this.postForm({
                url: 'calbuilder/owner/reviewupdate',
                data: form,
                success: (/**
                 * @param {?} event
                 * @return {?}
                 */
                function (event) {
                    if (event && event.uuid)
                        _this.indexEvent(event);
                    success && success(event);
                })
            }, options);
        };
        /**
         * @param {?} params
         * @param {?} callback
         * @param {?=} options
         * @return {?}
         */
        CalBuilder.prototype.remove = /**
         * @param {?} params
         * @param {?} callback
         * @param {?=} options
         * @return {?}
         */
        function (params, callback, options) {
            return this.sendRequest({
                url: 'calbuilder/element/delete',
                data: params,
                success: callback
            }, options);
        };
        /**
         * @param {?} params
         * @param {?} success
         * @param {?=} options
         * @return {?}
         */
        CalBuilder.prototype.cancel = /**
         * @param {?} params
         * @param {?} success
         * @param {?=} options
         * @return {?}
         */
        function (params, success, options) {
            var _this = this;
            /** @type {?} */
            var organId = params && params.orgid || this.getOrgId();
            this.loadRole(organId, (/**
             * @return {?}
             */
            function () {
                if (_this.isReviewer(organId)) {
                    _this.reviewCancel(params, success, options);
                }
                else if (_this.isOwnReviewer(organId)) {
                    _this.ownerReviewCancel(params, success, options);
                }
            }), options);
        };
        // element, members
        // element, members
        /**
         * @param {?} params
         * @param {?} success
         * @param {?=} options
         * @return {?}
         */
        CalBuilder.prototype.reviewNotify = 
        // element, members
        /**
         * @param {?} params
         * @param {?} success
         * @param {?=} options
         * @return {?}
         */
        function (params, success, options) {
            return this.sendRequest({
                type: 'post',
                url: 'calbuilder/reviewnotify',
                data: params,
                success: success
            }, options);
        };
        /**
         * @param {?} params
         * @param {?} success
         * @param {?=} options
         * @return {?}
         */
        CalBuilder.prototype.reviewCancel = /**
         * @param {?} params
         * @param {?} success
         * @param {?=} options
         * @return {?}
         */
        function (params, success, options) {
            var _this = this;
            return this.sendRequest({
                url: 'calbuilder/reviewcancel',
                data: params,
                success: (/**
                 * @param {?} event
                 * @return {?}
                 */
                function (event) {
                    if (event && event.uuid)
                        _this.indexEvent(event);
                    success && success(event);
                })
            }, options);
        };
        /**
         * @param {?} params
         * @param {?} success
         * @param {?=} options
         * @return {?}
         */
        CalBuilder.prototype.ownerReviewCancel = /**
         * @param {?} params
         * @param {?} success
         * @param {?=} options
         * @return {?}
         */
        function (params, success, options) {
            var _this = this;
            return this.sendRequest({
                url: 'calbuilder/owner/reviewcancel',
                data: params,
                success: (/**
                 * @param {?} event
                 * @return {?}
                 */
                function (event) {
                    if (event && event.uuid)
                        _this.indexEvent(event);
                    success && success(event);
                })
            }, options);
        };
        /**
         * @param {?} params
         * @param {?} success
         * @param {?=} options
         * @return {?}
         */
        CalBuilder.prototype.deleteAttachment = /**
         * @param {?} params
         * @param {?} success
         * @param {?=} options
         * @return {?}
         */
        function (params, success, options) {
            var _this = this;
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
                function (event) {
                    success && success(_this.indexEvent(event));
                })
            }, options);
        };
        /**
         * @param {?} organId
         * @param {?} callback
         * @param {?=} options
         * @return {?}
         */
        CalBuilder.prototype.loadOrganMembers = /**
         * @param {?} organId
         * @param {?} callback
         * @param {?=} options
         * @return {?}
         */
        function (organId, callback, options) {
            organId = organId || this.getOrgId();
            return this.searchAttendee({ orgid: organId }, callback, options);
        };
        /**
         * @param {?} params
         * @param {?} success
         * @param {?=} options
         * @return {?}
         */
        CalBuilder.prototype.searchAttendee = /**
         * @param {?} params
         * @param {?} success
         * @param {?=} options
         * @return {?}
         */
        function (params, success, options) {
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
                function (a, b) { return a.fullname.localeCompare(b.fullname); }));
                success(members);
            }), options);
        };
        /**
         * @param {?} params
         * @param {?} success
         * @param {?=} options
         * @return {?}
         */
        CalBuilder.prototype._searchAttendee = /**
         * @param {?} params
         * @param {?} success
         * @param {?=} options
         * @return {?}
         */
        function (params, success, options) {
            var _this = this;
            return this.sendRequest({
                url: 'calbuilder/attendee/search',
                data: params,
                success: (/**
                 * @param {?} data
                 * @return {?}
                 */
                function (data) {
                    /** @type {?} */
                    var members = data && data.elements || [];
                    members = members.filter((/**
                     * @param {?} item
                     * @return {?}
                     */
                    function (item) { return !item.alias; }));
                    members.forEach((/**
                     * @param {?} member
                     * @return {?}
                     */
                    function (member) { return _this._indexAccount(member); }));
                    success(members);
                }),
                error: (/**
                 * @return {?}
                 */
                function () {
                    success([]);
                })
            }, options, true);
        };
        /**
         * @param {?} account
         * @return {?}
         */
        CalBuilder.prototype._indexAccount = /**
         * @param {?} account
         * @return {?}
         */
        function (account) {
            // Remove suffix email before search user "binh@binhdinh.gov.vn"
            // don't search on suffix "@binhdinh.gov.vn"
            account['_index'] = vnToLatin(account.fullname.toLowerCase()) + ' ' +
                account.username.split('@')[0];
            account.display = this.insertPrefixAttendee(account.fullname || account.username);
            return account;
        };
        /**
         * @param {?} params
         * @param {?} callback
         * @param {?=} options
         * @return {?}
         */
        CalBuilder.prototype.loadDepartments = /**
         * @param {?} params
         * @param {?} callback
         * @param {?=} options
         * @return {?}
         */
        function (params, callback, options) {
            return this.sendRequest({
                url: 'calbuilder/department/list',
                data: params,
                success: (/**
                 * @param {?} data
                 * @return {?}
                 */
                function (data) {
                    data = data && data.items || [];
                    data.sort((/**
                     * @param {?} a
                     * @param {?} b
                     * @return {?}
                     */
                    function (a, b) {
                        return a.order - b.order;
                    }));
                    callback(data);
                }),
                error: (/**
                 * @return {?}
                 */
                function () {
                    callback([]);
                })
            }, options, true);
        };
        /**
         * @param {?} callback
         * @param {?=} options
         * @return {?}
         */
        CalBuilder.prototype.getMyOrg = /**
         * @param {?} callback
         * @param {?=} options
         * @return {?}
         */
        function (callback, options) {
            var _this = this;
            /** @type {?} */
            var keyCache = 'cal_my_organs';
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
                function (data) {
                    /** @type {?} */
                    var organs = _this._convertOrg(data && data.elements || []);
                    if (organs.length > 0) {
                        organs = _this.visibleMyOrgans(organs);
                        _this._myOrgans = organs;
                        _this.cacheSessionStorage(keyCache, organs);
                    }
                    callback(organs);
                }),
                error: (/**
                 * @return {?}
                 */
                function () { return callback([]); })
            }, options, true);
        };
        /**
         * @param {?} organs
         * @return {?}
         */
        CalBuilder.prototype.visibleMyOrgans = /**
         * @param {?} organs
         * @return {?}
         */
        function (organs) {
            var _this = this;
            return organs.filter((/**
             * @param {?} organ
             * @return {?}
             */
            function (organ) {
                /** @type {?} */
                var _organ = _this.getOrgById(organ.firmUUID);
                return _organ && !!_organ.groupType;
            }));
        };
        /**
         * @param {?} callback
         * @param {?=} options
         * @return {?}
         */
        CalBuilder.prototype.getAllOrg = /**
         * @param {?} callback
         * @param {?=} options
         * @return {?}
         */
        function (callback, options) {
            var _this = this;
            /** @type {?} */
            var keyCache = 'cal_organ_list';
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
                function (data) {
                    /** @type {?} */
                    var organs = _this._convertOrg(data && data.items || []);
                    if (organs.length > 0) {
                        // Only get organ has groupType
                        organs = _this.visibleOrgans(organs);
                        _this._organs = organs;
                        _this.cacheSessionStorage(keyCache, _this._organs);
                    }
                    callback(organs);
                }),
                error: (/**
                 * @return {?}
                 */
                function () { return callback([]); })
            }, options, true);
        };
        /**
         * @param {?} organs
         * @return {?}
         */
        CalBuilder.prototype.visibleOrgans = /**
         * @param {?} organs
         * @return {?}
         */
        function (organs) {
            return organs.filter((/**
             * @param {?} organ
             * @return {?}
             */
            function (organ) { return !!organ.groupType; }));
        };
        /**
         * @private
         * @param {?} callback
         * @param {?=} options
         * @return {?}
         */
        CalBuilder.prototype._loadOrgans = /**
         * @private
         * @param {?} callback
         * @param {?=} options
         * @return {?}
         */
        function (callback, options) {
            var _this = this;
            if (this._organs && this._organs.length > 0) {
                callback(this._organs.slice());
            }
            else {
                this.getAllOrg((/**
                 * @param {?} organs
                 * @return {?}
                 */
                function (organs) {
                    // Detect user login
                    _this.loadRole('', (/**
                     * @param {?} role
                     * @return {?}
                     */
                    function (role) {
                        _this.isAuth = !!role.isAuth;
                        if (role.isAuth) {
                            _this.getMyOrg((/**
                             * @param {?} myOrgans
                             * @return {?}
                             */
                            function (myOrgans) {
                                // Move my organs to first
                                for (var i = myOrgans.length - 1; i >= 0; i--) {
                                    /** @type {?} */
                                    var myOrgan = myOrgans[i];
                                    for (var j = 0; j < organs.length; j++) {
                                        /** @type {?} */
                                        var organ = organs[j];
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
        };
        /**
         * @param {?} callback
         * @param {?=} domain
         * @return {?}
         */
        CalBuilder.prototype.getTreeOrg = /**
         * @param {?} callback
         * @param {?=} domain
         * @return {?}
         */
        function (callback, domain) {
            var _this = this;
            this._loadOrgans((/**
             * @param {?} data
             * @return {?}
             */
            function (data) {
                /** @type {?} */
                var tree = [];
                // Set children is empty
                data.forEach((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) {
                    item.children = [];
                }));
                // Build tree org list
                data.forEach((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) {
                    if (item.parentID) {
                        /** @type {?} */
                        var parentOrgan = _this.getOrgById(item.parentID);
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
        };
        /**
         * @param {?=} item
         * @return {?}
         */
        CalBuilder.prototype.indexOrgSearch = /**
         * @param {?=} item
         * @return {?}
         */
        function (item) {
            item._index = vnToLatin([item.firmName, item.firmUUID, item.firmPrefix].join(' ').toLowerCase());
        };
        /**
         * @param {?=} orgid
         * @return {?}
         */
        CalBuilder.prototype.isMyOrg = /**
         * @param {?=} orgid
         * @return {?}
         */
        function (orgid) {
            /** @type {?} */
            var org = this.getOrgById(orgid);
            return org && org.myOrg;
        };
        /**
         * @param {?} params
         * @param {?} callback
         * @param {?=} options
         * @return {?}
         */
        CalBuilder.prototype.loadEvent = /**
         * @param {?} params
         * @param {?} callback
         * @param {?=} options
         * @return {?}
         */
        function (params, callback, options) {
            var _this = this;
            return this.sendRequest({
                type: 'post',
                url: 'calbuilder/element/load',
                data: params,
                success: (/**
                 * @param {?} data
                 * @return {?}
                 */
                function (data) {
                    if (!data || !data.uuid) {
                        // Event not found, try to load review event
                        _this.loadRole(params.orgid, (/**
                         * @return {?}
                         */
                        function () {
                            if (_this.isReviewer(params.orgid)) {
                                _this.loadEventReview(params, callback, options);
                            }
                            else {
                                callback && callback(data);
                            }
                        }));
                        return;
                    }
                    _this.indexEvent(data);
                    callback && callback(data);
                })
            }, options);
        };
        /**
         * @param {?} params
         * @param {?} callback
         * @param {?=} options
         * @return {?}
         */
        CalBuilder.prototype.updateState = /**
         * @param {?} params
         * @param {?} callback
         * @param {?=} options
         * @return {?}
         */
        function (params, callback, options) {
            if (params.notes) {
                params.notes = this.formatTextUpdate(params.notes);
            }
            return this.loadEvent(params, callback, options);
        };
        /**
         * @param {?} params
         * @param {?} success
         * @param {?=} options
         * @return {?}
         */
        CalBuilder.prototype.loadEventReview = /**
         * @param {?} params
         * @param {?} success
         * @param {?=} options
         * @return {?}
         */
        function (params, success, options) {
            var _this = this;
            return this.sendRequest({
                url: 'calbuilder/reviewload',
                data: params,
                success: (/**
                 * @param {?} event
                 * @return {?}
                 */
                function (event) {
                    if (event && event.uuid)
                        _this.indexEvent(event);
                    success && success(event);
                })
            }, options);
        };
        /**
         * @param {?} params
         * @param {?} success
         * @param {?=} options
         * @return {?}
         */
        CalBuilder.prototype.loadGroupEvent = /**
         * @param {?} params
         * @param {?} success
         * @param {?=} options
         * @return {?}
         */
        function (params, success, options) {
            var _this = this;
            return this.sendRequest({
                url: 'calbuilder/element/group',
                data: params,
                success: (/**
                 * @param {?} data
                 * @return {?}
                 */
                function (data) { return success(_this.modifyEvent(data && data.items || [])); })
            }, options);
        };
        /**
         * @param {?} params
         * @param {?} callback
         * @param {?} options
         * @return {?}
         */
        CalBuilder.prototype.loadOrgEvents = /**
         * @param {?} params
         * @param {?} callback
         * @param {?} options
         * @return {?}
         */
        function (params, callback, options) {
            this._loadOnDifferYear(this._loadOrgEvents, params, callback, options);
        };
        /**
         * @param {?} params
         * @param {?} callback
         * @param {?} options
         * @return {?}
         */
        CalBuilder.prototype._loadOrgEvents = /**
         * @param {?} params
         * @param {?} callback
         * @param {?} options
         * @return {?}
         */
        function (params, callback, options) {
            var _this = this;
            return this.sendRequest({
                type: 'post',
                url: 'calbuilder/mainboard/view',
                data: params,
                success: (/**
                 * @param {?} data
                 * @return {?}
                 */
                function (data) { return callback(_this.modifyEvent(data && data.items || [])); })
            }, options);
        };
        /**
         * @param {?} params
         * @param {?} callback
         * @param {?} options
         * @return {?}
         */
        CalBuilder.prototype.loadCommunityEvents = /**
         * @param {?} params
         * @param {?} callback
         * @param {?} options
         * @return {?}
         */
        function (params, callback, options) {
            this._loadOnDifferYear(this._loadCommunityEvents, params, callback, options);
        };
        /**
         * @param {?} params
         * @param {?} callback
         * @param {?} options
         * @return {?}
         */
        CalBuilder.prototype._loadCommunityEvents = /**
         * @param {?} params
         * @param {?} callback
         * @param {?} options
         * @return {?}
         */
        function (params, callback, options) {
            var _this = this;
            return this.sendRequest({
                type: 'post',
                url: 'calbuilder/mainboard/published',
                data: params,
                success: (/**
                 * @param {?} data
                 * @return {?}
                 */
                function (data) { return callback(_this.modifyEvent(data && data.items || [])); }),
                useOrgId: true
            }, options);
        };
        /**
         * @param {?} params
         * @param {?} callback
         * @param {?} options
         * @return {?}
         */
        CalBuilder.prototype.loadAllPublishEvents = /**
         * @param {?} params
         * @param {?} callback
         * @param {?} options
         * @return {?}
         */
        function (params, callback, options) {
            this._loadOnDifferYear(this._loadAllPublishEvents, params, callback, options);
        };
        /**
         * @param {?} params
         * @param {?} callback
         * @param {?} options
         * @return {?}
         */
        CalBuilder.prototype._loadAllPublishEvents = /**
         * @param {?} params
         * @param {?} callback
         * @param {?} options
         * @return {?}
         */
        function (params, callback, options) {
            var _this = this;
            return this.sendRequest({
                type: 'post',
                url: 'calbuilder/mainboard/published',
                data: params,
                success: (/**
                 * @param {?} data
                 * @return {?}
                 */
                function (data) { return callback(_this.modifyEvent(data && data.items || [])); }),
                removeOrgId: true
            }, options);
        };
        /**
         * @param {?} params
         * @param {?} callback
         * @param {?=} options
         * @return {?}
         */
        CalBuilder.prototype.loadPublishEvents = /**
         * @param {?} params
         * @param {?} callback
         * @param {?=} options
         * @return {?}
         */
        function (params, callback, options) {
            var _this = this;
            // Load role
            this.loadRole(params.orgid, (/**
             * @return {?}
             */
            function () {
                // Reviewer
                if (_this.isMyOrg(params.orgid)) {
                    _this.loadOrgEvents(params, callback, options);
                }
                else {
                    _this.loadCommunityEvents(params, callback, options);
                }
            }), options);
        };
        /**
         * @param {?} params
         * @param {?} callback
         * @param {?} options
         * @return {?}
         */
        CalBuilder.prototype.getReviewEvents = /**
         * @param {?} params
         * @param {?} callback
         * @param {?} options
         * @return {?}
         */
        function (params, callback, options) {
            this._loadOnDifferYear(this._getReviewEvents, params, callback, options);
        };
        /**
         * @param {?} params
         * @param {?} callback
         * @param {?} options
         * @return {?}
         */
        CalBuilder.prototype._getReviewEvents = /**
         * @param {?} params
         * @param {?} callback
         * @param {?} options
         * @return {?}
         */
        function (params, callback, options) {
            var _this = this;
            return this.sendRequest({
                type: 'post',
                url: 'calbuilder/reviewlist',
                data: params,
                success: (/**
                 * @param {?} data
                 * @return {?}
                 */
                function (data) { return callback(_this.modifyEvent(data && data.items || [])); })
            }, options);
        };
        /**
         * @param {?} params
         * @param {?} callback
         * @param {?} options
         * @return {?}
         */
        CalBuilder.prototype.getViewEvents = /**
         * @param {?} params
         * @param {?} callback
         * @param {?} options
         * @return {?}
         */
        function (params, callback, options) {
            this._loadOnDifferYear(this._getViewEvents, params, callback, options);
        };
        /**
         * @param {?} params
         * @param {?} callback
         * @param {?} options
         * @return {?}
         */
        CalBuilder.prototype._getViewEvents = /**
         * @param {?} params
         * @param {?} callback
         * @param {?} options
         * @return {?}
         */
        function (params, callback, options) {
            var _this = this;
            return this.sendRequest({
                type: 'post',
                url: 'calbuilder/viewlist',
                data: params,
                success: (/**
                 * @param {?} data
                 * @return {?}
                 */
                function (data) { return callback(_this.modifyEvent(data && data.items || [])); })
            }, options);
        };
        /**
         * @param {?} params
         * @param {?} callback
         * @param {?} options
         * @return {?}
         */
        CalBuilder.prototype.reviewSearchEvents = /**
         * @param {?} params
         * @param {?} callback
         * @param {?} options
         * @return {?}
         */
        function (params, callback, options) {
            this._loadOnDifferYear(this._reviewSearchEvents, params, callback, options);
        };
        // members: ",,"
        // members: ",,"
        /**
         * @param {?} params
         * @param {?} callback
         * @param {?} options
         * @return {?}
         */
        CalBuilder.prototype._reviewSearchEvents = 
        // members: ",,"
        /**
         * @param {?} params
         * @param {?} callback
         * @param {?} options
         * @return {?}
         */
        function (params, callback, options) {
            var _this = this;
            return this.sendRequest({
                type: 'post',
                url: 'calbuilder/reviewsearch',
                data: params,
                success: (/**
                 * @param {?} data
                 * @return {?}
                 */
                function (data) { return callback(_this.modifyEvent(data && data.items || [])); })
            }, options);
        };
        /**
         * @param {?} params
         * @param {?} callback
         * @param {?=} options
         * @return {?}
         */
        CalBuilder.prototype.getOwnEvents = /**
         * @param {?} params
         * @param {?} callback
         * @param {?=} options
         * @return {?}
         */
        function (params, callback, options) {
            this._loadOnDifferYear(this._getOwnEvents, params, callback, options);
        };
        /**
         * @param {?} params
         * @param {?} callback
         * @param {?} options
         * @return {?}
         */
        CalBuilder.prototype._getOwnEvents = /**
         * @param {?} params
         * @param {?} callback
         * @param {?} options
         * @return {?}
         */
        function (params, callback, options) {
            var _this = this;
            return this.sendRequest({
                type: 'post',
                url: 'calbuilder/element/list',
                data: params,
                success: (/**
                 * @param {?} data
                 * @return {?}
                 */
                function (data) { return callback(_this.modifyEvent(data && data.items || [])); })
            }, options);
        };
        /**
         * @param {?} params
         * @param {?} callback
         * @param {?=} options
         * @return {?}
         */
        CalBuilder.prototype.getListEvents = /**
         * @param {?} params
         * @param {?} callback
         * @param {?=} options
         * @return {?}
         */
        function (params, callback, options) {
            var _this = this;
            /** @type {?} */
            var promises = [];
            params.orgid = params.orgid || this.getOrgId();
            // Load review event
            this.loadRole(params.orgid, (/**
             * @return {?}
             */
            function () {
                // My events
                promises.push(new Promise((/**
                 * @param {?} resolve
                 * @return {?}
                 */
                function (resolve) {
                    /** @type {?} */
                    var _options = $.extend({}, options);
                    _options.error = (/**
                     * @return {?}
                     */
                    function () {
                        resolve([]);
                    });
                    _this.getOwnEvents(params, resolve, _options);
                })));
                if (_this.isReviewer(params.orgid)) {
                    // Reviewer
                    promises.push(new Promise((/**
                     * @param {?} resolve
                     * @return {?}
                     */
                    function (resolve) {
                        /** @type {?} */
                        var _options = $.extend({}, options);
                        _options.error = (/**
                         * @return {?}
                         */
                        function () {
                            resolve([]);
                        });
                        _this.getReviewEvents(params, resolve, _options);
                    })));
                }
                else if (_this.isViewer(params.orgid)) {
                    // Viewer
                    promises.push(new Promise((/**
                     * @param {?} resolve
                     * @return {?}
                     */
                    function (resolve) {
                        /** @type {?} */
                        var _options = $.extend({}, options);
                        _options.error = (/**
                         * @return {?}
                         */
                        function () {
                            resolve([]);
                        });
                        _this.getViewEvents(params, resolve, _options);
                    })));
                }
                // Load all promises
                Promise.all(promises).then((/**
                 * @param {?} values
                 * @return {?}
                 */
                function (values) {
                    /** @type {?} */
                    var events = [];
                    values.forEach((/**
                     * @param {?} value
                     * @return {?}
                     */
                    function (value) { return events = events.concat(value || []); }));
                    events = _this.removeEventDuplicate(events);
                    callback(_this.modifyEvent(events));
                }));
            }), options);
        };
        /**
         * @param {?} events
         * @return {?}
         */
        CalBuilder.prototype.modifyEvent = /**
         * @param {?} events
         * @return {?}
         */
        function (events) {
            var _this = this;
            if (!events)
                return;
            this.removeEventDuplicate(events);
            events.forEach((/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return _this.indexEvent(item); }));
            this.sortEvents(events);
            return events;
        };
        /**
         * @param {?} events
         * @return {?}
         */
        CalBuilder.prototype.removeEventDuplicate = /**
         * @param {?} events
         * @return {?}
         */
        function (events) {
            if (events.length > 1) {
                for (var i = 1; i < events.length; i++) {
                    for (var j = i - 1; j >= 0; j--) {
                        if (events[i].uuid === events[j].uuid && events[i].day === events[j].day) {
                            events.splice(i, 1);
                            --i;
                            break;
                        }
                    }
                }
            }
            return events;
        };
        /**
         * @param {?} events
         * @return {?}
         */
        CalBuilder.prototype.sortEvents = /**
         * @param {?} events
         * @return {?}
         */
        function (events) {
            // sort by start date
            this.sortEventStart(events);
            this.sortEventPriority(events);
            return events;
        };
        /**
         * @param {?} events
         * @return {?}
         */
        CalBuilder.prototype.sortEventStart = /**
         * @param {?} events
         * @return {?}
         */
        function (events) {
            this._sort(events, 'from');
            return events;
        };
        /**
         * @param {?} events
         * @return {?}
         */
        CalBuilder.prototype.sortEventPriority = /**
         * @param {?} events
         * @return {?}
         */
        function (events) {
            // sort by priority on day
            for (var i = 0; i < events.length; i++) {
                /** @type {?} */
                var item = events[i];
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
                    var index = events.indexOf(item);
                    if (index > 0) {
                        /** @type {?} */
                        var tmp = events[index - 1];
                        if (item.day === tmp.day && (tmp._order === 0 || item._order < tmp._order)) {
                            events[index] = tmp;
                            events[index - 1] = item;
                            moveFirst(item);
                        }
                    }
                }
            }
            return events;
        };
        /**
         * @param {?} arr
         * @param {?=} orderBy
         * @return {?}
         */
        CalBuilder.prototype._sort = /**
         * @param {?} arr
         * @param {?=} orderBy
         * @return {?}
         */
        function (arr, orderBy) {
            for (var i = 1; i < arr.length; i++) {
                if (i === 0)
                    continue;
                /** @type {?} */
                var item = arr[i];
                /** @type {?} */
                var prev = arr[i - 1];
                if (item[orderBy] < prev[orderBy]) {
                    arr[i] = prev;
                    arr[i - 1] = item;
                    i -= 2;
                }
            }
        };
        // keywords: string[]
        // keywords: string[]
        /**
         * @param {?} events
         * @param {?} keywords
         * @return {?}
         */
        CalBuilder.prototype.searchEventsByKeywords = 
        // keywords: string[]
        /**
         * @param {?} events
         * @param {?} keywords
         * @return {?}
         */
        function (events, keywords) {
            if (keywords && keywords.length > 0) {
                return events.filter((/**
                 * @param {?} event
                 * @return {?}
                 */
                function (event) {
                    for (var i = 0; i < keywords.length; i++) {
                        if (event._index.indexOf(keywords[i]) < 0) {
                            return false;
                        }
                    }
                    return true;
                }));
            }
            return events.slice();
        };
        /**
         * @param {?} event
         * @return {?}
         */
        CalBuilder.prototype.indexEvent = /**
         * @param {?} event
         * @return {?}
         */
        function (event) {
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
        };
        /**
         * @param {?} event
         * @return {?}
         */
        CalBuilder.prototype.indexEventMembers = /**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            var _this = this;
            /** @type {?} */
            var obj = {};
            for (var k in CalAttendeeRole) {
                obj[k] = [];
            }
            event.members = event.members || [];
            event.attendees = [];
            event.members.forEach((/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                item.name = _this.attendeeDisplay(item);
                item.value = _this.attendeeValue(item);
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
                    event.isCreator = _this.usernameIsMe(event.creator);
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
        };
        /**
         * @param {?} members
         * @return {?}
         */
        CalBuilder.prototype._groupMember2String = /**
         * @param {?} members
         * @return {?}
         */
        function (members) {
            /** @type {?} */
            var str = '';
            /** @type {?} */
            var data = this.groupAttendeeByOrgan(members);
            for (var k in data) {
                /** @type {?} */
                var items = data[k];
                /** @type {?} */
                var organ = items.filter((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) { return item.type === CalAttendeeType.ORGAN; }))[0];
                if (organ) {
                    str += '<b>' + organ.organName + '</b>: ';
                }
                // Todo: consider to use this.buildMemberShow
                items.forEach((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) {
                    if (item.type !== CalAttendeeType.ORGAN) {
                        str += item.name + ', ';
                    }
                }));
                str = str.slice(0, -2);
                str += '<br>';
            }
            return str.slice(0, -4);
        };
        /**
         * @param {?=} event
         * @return {?}
         */
        CalBuilder.prototype.indexEventAttribute = /**
         * @param {?=} event
         * @return {?}
         */
        function (event) {
            for (var k in event.attribute) {
                event['_' + k] = event.attribute[k];
            }
            event._order = Number(event._order) || 0;
            if (event._subType) {
                event.type = event._subType;
            }
        };
        /**
         * @param {?} calEvent
         * @return {?}
         */
        CalBuilder.prototype.initEvent = /**
         * @param {?} calEvent
         * @return {?}
         */
        function (calEvent) {
            calEvent = $.extend({}, calEvent);
            this._initEventDate(calEvent);
            calEvent.startTime = calEvent.from.format('H:i');
            calEvent.toTime = calEvent.to.format('H:i');
            return calEvent;
        };
        /**
         * @param {?} event
         * @return {?}
         */
        CalBuilder.prototype._initEventDate = /**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            if (event) {
                /** @type {?} */
                var date = void 0;
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
        };
        /**
         * @param {?} event
         * @return {?}
         */
        CalBuilder.prototype.indexEventDate = /**
         * @param {?} event
         * @return {?}
         */
        function (event) {
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
            var hourUpdated = new Date().getTime() - (event.updateTime || event.createTime);
            hourUpdated /= (60 * 60 * 1000);
            if (hourUpdated < 0) {
                hourUpdated = 0;
            }
            if (hourUpdated <= this.TIME_NEW_UPDATE) {
                event.recentUpdated = true;
                event.lastUpdateStr = this.getTextForMinutes(hourUpdated * 60);
            }
        };
        /**
         * @param {?} event
         * @return {?}
         */
        CalBuilder.prototype.indexEventSearch = /**
         * @param {?} event
         * @return {?}
         */
        function (event) {
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
            for (var i = 0; i < event.members.length; i++) {
                /** @type {?} */
                var member = event.members[i];
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
                function (file) {
                    file.orgid = event.firmUUID;
                }));
            }
        };
        /**
         * @param {?} event
         * @return {?}
         */
        CalBuilder.prototype.indexRepeat = /**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            //"FREQ=WEEKLY;UNTIL=20170707;INTERVAL=1;BYDAY=MO"
            if (event.rrule) {
                /** @type {?} */
                var obj_1 = {};
                event.rrule.split(';').forEach((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) {
                    item = item.split('=');
                    if (item[0] === 'FREQ') {
                        obj_1.type = obj_1.rrule = obj_1.rrmode = item[1];
                    }
                    else if (item[0] === 'BYDAY') {
                        obj_1.wkdays = item[1].split(',');
                    }
                }));
                if (event.lstart) {
                    obj_1.lstart = new Date(event.lstart);
                }
                if (event.until) {
                    obj_1.until = new Date(event.until);
                }
                event.repeat = obj_1;
            }
        };
        // Custom index
        // Custom index
        /**
         * @param {?} event
         * @return {?}
         */
        CalBuilder.prototype.indexCustom = 
        // Custom index
        /**
         * @param {?} event
         * @return {?}
         */
        function (event) {
        };
        /**
         * @param {?=} orgid
         * @return {?}
         */
        CalBuilder.prototype.isReviewer = /**
         * @param {?=} orgid
         * @return {?}
         */
        function (orgid) {
            orgid = orgid || this.getOrgId();
            return this._userRoles[orgid] && !!this._userRoles[orgid].reviewer;
        };
        /**
         * @param {?=} orgid
         * @return {?}
         */
        CalBuilder.prototype.isOwnReviewer = /**
         * @param {?=} orgid
         * @return {?}
         */
        function (orgid) {
            orgid = orgid || this.getOrgId();
            return this._userRoles[orgid] && !!this._userRoles[orgid].own_reviewer;
        };
        /**
         * @param {?=} orgid
         * @return {?}
         */
        CalBuilder.prototype.isViewer = /**
         * @param {?=} orgid
         * @return {?}
         */
        function (orgid) {
            orgid = orgid || this.getOrgId();
            return this._userRoles[orgid] && !!this._userRoles[orgid].viewer;
        };
        /**
         * @param {?=} query
         * @return {?}
         */
        CalBuilder.prototype.getQueryParams = /**
         * @param {?=} query
         * @return {?}
         */
        function (query) {
            /** @type {?} */
            var params = {};
            query = query || location.search;
            query.replace('?', '').split('&').forEach((/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                if (item) {
                    /** @type {?} */
                    var equalIndex = item.indexOf('=');
                    if (equalIndex > -1)
                        params[item.slice(0, equalIndex)] = item.slice(equalIndex + 1);
                }
            }));
            return params;
        };
        /**
         * @param {?=} params
         * @return {?}
         */
        CalBuilder.prototype.buildQueryString = /**
         * @param {?=} params
         * @return {?}
         */
        function (params) {
            /** @type {?} */
            var query = '';
            for (var k in params) {
                query += k + '=' + encodeURIComponent(params[k]) + '&';
            }
            return query.slice(0, -1);
        };
        /**
         * @param {?} usercode
         * @param {?=} domain
         * @return {?}
         */
        CalBuilder.prototype.getUserAvatar = /**
         * @param {?} usercode
         * @param {?=} domain
         * @return {?}
         */
        function (usercode, domain) {
            return AjaxAPI.getUrl('system/userprofile/photo', domain) +
                '?usercode=' + usercode + '&thumbnail=50';
        };
        /**
         * @param {?} event
         * @param {?} callback
         * @param {?=} currentOrganId
         * @param {?=} options
         * @return {?}
         */
        CalBuilder.prototype.getPermissionOnEvent = /**
         * @param {?} event
         * @param {?} callback
         * @param {?=} currentOrganId
         * @param {?=} options
         * @return {?}
         */
        function (event, callback, currentOrganId, options) {
            var _this = this;
            /** @type {?} */
            var mode = event.mode;
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
            function () {
                _this.indexEvent(event);
                /** @type {?} */
                var permissions;
                /** @type {?} */
                var canReview = _this.isReviewer(currentOrganId) ||
                    (_this.isOwnReviewer(currentOrganId) && _this.canOwnReviewEvent(event));
                /** @type {?} */
                var canReviewUpdate = !_this.isCreate(mode) && !_this.isCancel(mode) && canReview;
                if (event.firmUUID === currentOrganId) {
                    /** @type {?} */
                    var isEditMyEvent = _this.canUpdateOwnEvent(event);
                    if (event.type === CalSubType.PERSONAL && !_this.getConfigValue('PERSONAL_CAN_PUBLISH')) {
                        // Personal calendar
                        permissions = {
                            save: isEditMyEvent,
                            delete: isEditMyEvent
                        };
                    }
                    else {
                        permissions = {
                            save: isEditMyEvent || canReviewUpdate,
                            approve: canReview && (_this.isSent(mode) || isEditMyEvent),
                            reject: canReview && _this.isSent(mode),
                            send: isEditMyEvent && !canReview,
                            revert: (_this.isSent(mode) && event.isCreator) ||
                                ((_this.isCancel(mode) || _this.isPublish(mode)) && canReview),
                            cancel: canReview && _this.isPublish(mode),
                            delete: isEditMyEvent
                        };
                    }
                }
                else {
                    // External update attendees
                    permissions = {};
                    if (_this.isPublish(event.mode) && _this.hasFirmAttendee(event, currentOrganId) &&
                        _this.canExternalUpdateEvent(event, currentOrganId)) {
                        permissions = { updateAttendee: true };
                    }
                }
                permissions.print = true;
                permissions.exportInvitation = _this.catIsInvitation(event.category) && event._templateId;
                callback(permissions);
            }), options);
        };
        /**
         * @param {?} event
         * @return {?}
         */
        CalBuilder.prototype.canUpdateOwnEvent = /**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            return event.isCreator && this.isCreate(event.mode);
        };
        /**
         * @param {?} event
         * @return {?}
         */
        CalBuilder.prototype.canReviewEvent = /**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            return this.isReviewer(event.firmUUID);
        };
        /**
         * @param {?} event
         * @return {?}
         */
        CalBuilder.prototype.canOwnReviewEvent = /**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            return this.isOwnReviewer(event.firmUUID) && event.isCreator;
        };
        /**
         * @param {?} event
         * @param {?} ownOrganId
         * @return {?}
         */
        CalBuilder.prototype.canUpdateAttendee = /**
         * @param {?} event
         * @param {?} ownOrganId
         * @return {?}
         */
        function (event, ownOrganId) {
            return this.isFirmEvent(event, ownOrganId) && (this.canUpdateOwnEvent(event) ||
                this.canOwnReviewEvent(event) ||
                this.canReviewEvent(event));
        };
        /**
         * @param {?} event
         * @param {?} organId
         * @return {?}
         */
        CalBuilder.prototype.canExternalUpdateEvent = /**
         * @param {?} event
         * @param {?} organId
         * @return {?}
         */
        function (event, organId) {
            return this.isPublish(event.mode) && !this.isFirmEvent(event, organId) && this.isReviewer(organId);
        };
        /**
         * @param {?} event
         * @param {?} ownOrganId
         * @return {?}
         */
        CalBuilder.prototype.isFirmEvent = /**
         * @param {?} event
         * @param {?} ownOrganId
         * @return {?}
         */
        function (event, ownOrganId) {
            return event.firmUUID === ownOrganId;
        };
        /**
         * @param {?} params
         * @param {?} callback
         * @param {?=} options
         * @return {?}
         */
        CalBuilder.prototype.searchAnyAttendee = /**
         * @param {?} params
         * @param {?} callback
         * @param {?=} options
         * @return {?}
         */
        function (params, callback, options) {
            var _this = this;
            this.searchUserAsAttendee(params, (/**
             * @param {?} users
             * @return {?}
             */
            function (users) {
                _this.searchOrganAsAttendee(params, (/**
                 * @param {?} orgs
                 * @return {?}
                 */
                function (orgs) {
                    orgs.forEach((/**
                     * @param {?} org
                     * @return {?}
                     */
                    function (org) { return users.push(org); }));
                    callback(users);
                }));
            }), options);
        };
        /**
         * @param {?} params
         * @param {?} callback
         * @param {?=} options
         * @return {?}
         */
        CalBuilder.prototype.searchUserAsAttendee = /**
         * @param {?} params
         * @param {?} callback
         * @param {?=} options
         * @return {?}
         */
        function (params, callback, options) {
            var _this = this;
            /** @type {?} */
            var organId = params.orgid || this.getOrgId();
            /** @type {?} */
            var organName = this.getOrgNameById(organId);
            this.loadOrganMembers(organId, (/**
             * @param {?} members
             * @return {?}
             */
            function (members) {
                /** @type {?} */
                var keyword = params.keyword || '';
                /** @type {?} */
                var limit = params.limit || -1;
                /** @type {?} */
                var attendees = [];
                keyword = vnToLatin(keyword).toLowerCase();
                for (var i = 0; i < members.length; i++) {
                    /** @type {?} */
                    var member = members[i];
                    if (!keyword || member._index.indexOf(keyword) > -1) {
                        /** @type {?} */
                        var attendee = _this.memberToAttendee(member);
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
        };
        /**
         * @param {?} params
         * @param {?} callback
         * @param {?=} options
         * @return {?}
         */
        CalBuilder.prototype.searchOrganAsAttendee = /**
         * @param {?} params
         * @param {?} callback
         * @param {?=} options
         * @return {?}
         */
        function (params, callback, options) {
            var _this = this;
            this.loadOrgByKeyword(params, (/**
             * @param {?} organs
             * @return {?}
             */
            function (organs) {
                callback(organs.map((/**
                 * @param {?} organ
                 * @return {?}
                 */
                function (organ) { return _this.organToAttendee(organ); })));
            }), options);
        };
        /**
         * @param {?} fullname
         * @return {?}
         */
        CalBuilder.prototype.insertPrefixAttendee = /**
         * @param {?} fullname
         * @return {?}
         */
        function (fullname) {
            if (this.getConfigValue('PREFIX_ATTENDEE_NAME')) {
                return this.getConfigValue('PREFIX_ATTENDEE_NAME') + fullname;
            }
            return fullname;
        };
        /**
         * @param {?} member
         * @return {?}
         */
        CalBuilder.prototype.memberToAttendee = /**
         * @param {?} member
         * @return {?}
         */
        function (member) {
            return {
                username: member.username,
                fullname: member.fullname,
                display: this.insertPrefixAttendee(member.fullname),
                type: CalAttendeeType.USER
            };
        };
        /**
         * @param {?} organ
         * @return {?}
         */
        CalBuilder.prototype.organToAttendee = /**
         * @param {?} organ
         * @return {?}
         */
        function (organ) {
            return {
                organId: organ.firmUUID,
                organName: organ.firmName,
                type: CalAttendeeType.ORGAN
            };
        };
        /**
         * @param {?} alias
         * @param {?} organId
         * @return {?}
         */
        CalBuilder.prototype.aliasToAttendee = /**
         * @param {?} alias
         * @param {?} organId
         * @return {?}
         */
        function (alias, organId) {
            organId = organId || this.getOrgId();
            return {
                alias: alias,
                organId: organId,
                organName: this.getOrgNameById(organId),
                type: CalAttendeeType.ALIAS
            };
        };
        // Search user and orgs to select when create calendar
        // Search user and orgs to select when create calendar
        /**
         * @param {?} params
         * @param {?} callback
         * @param {?=} options
         * @return {?}
         */
        CalBuilder.prototype.loadAttendeeByName = 
        // Search user and orgs to select when create calendar
        /**
         * @param {?} params
         * @param {?} callback
         * @param {?=} options
         * @return {?}
         */
        function (params, callback, options) {
            var _this = this;
            if (!params || !params.keyword)
                return callback([]);
            // Limit user search
            params.limit = params.limit || 5;
            this.loadUserByKeyword(params, (/**
             * @param {?} users
             * @return {?}
             */
            function (users) {
                _this.loadOrgByKeyword(params, (/**
                 * @param {?} orgs
                 * @return {?}
                 */
                function (orgs) {
                    callback(users.concat(orgs));
                }));
            }), options);
        };
        /**
         * @param {?} params
         * @param {?} callback
         * @param {?=} options
         * @return {?}
         */
        CalBuilder.prototype.loadUserByKeyword = /**
         * @param {?} params
         * @param {?} callback
         * @param {?=} options
         * @return {?}
         */
        function (params, callback, options) {
            // Load all users and search on client
            this.searchAttendee({
                orgid: params.orgid
            }, (/**
             * @param {?} members
             * @return {?}
             */
            function (members) {
                /** @type {?} */
                var users = [];
                /** @type {?} */
                var keyword = vnToLatin(params.keyword.toLowerCase());
                for (var i = 0; i < members.length; i++) {
                    /** @type {?} */
                    var user = members[i];
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
        };
        /**
         * @param {?} params
         * @param {?} callback
         * @param {?=} options
         * @return {?}
         */
        CalBuilder.prototype.loadOrgByKeyword = /**
         * @param {?} params
         * @param {?} callback
         * @param {?=} options
         * @return {?}
         */
        function (params, callback, options) {
            /** @type {?} */
            var data = [];
            this._loadOrgans((/**
             * @param {?} orgs
             * @return {?}
             */
            function (orgs) {
                // Filter orgs match
                /** @type {?} */
                var key = vnToLatin(params.keyword).toLowerCase();
                for (var i = 0; i < orgs.length; i++) {
                    /** @type {?} */
                    var item = orgs[i];
                    if (item._index.indexOf(key) > -1) {
                        data.push(item);
                        if (data.length >= params.limit)
                            break;
                    }
                }
                callback(data);
            }), options);
        };
        /**
         * @param {?} item
         * @param {?=} domain
         * @param {?=} event
         * @return {?}
         */
        CalBuilder.prototype.getFileUrl = /**
         * @param {?} item
         * @param {?=} domain
         * @param {?=} event
         * @return {?}
         */
        function (item, domain, event) {
            if (!item)
                return '';
            /** @type {?} */
            var orgid = item.orgid || this.getOrgId();
            /** @type {?} */
            var _role = this._userRoles[orgid];
            /** @type {?} */
            var url;
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
        };
        /**
         * @param {?} item
         * @param {?=} domain
         * @param {?=} event
         * @return {?}
         */
        CalBuilder.prototype.getFileViewUrl = /**
         * @param {?} item
         * @param {?=} domain
         * @param {?=} event
         * @return {?}
         */
        function (item, domain, event) {
            /** @type {?} */
            var url = this.getFileUrl(item, domain, event);
            if (item.file && item.file.slice(-3).toLowerCase() === "pdf") {
                url += '&view=pdf&t=' + new Date().getTime();
            }
            return url;
        };
        /**
         * @param {?} event
         * @param {?} organId
         * @return {?}
         */
        CalBuilder.prototype.hasFirmAttendee = /**
         * @param {?} event
         * @param {?} organId
         * @return {?}
         */
        function (event, organId) {
            if (event && organId) {
                for (var i = 0; i < event.members.length; i++) {
                    /** @type {?} */
                    var member = event.members[i];
                    if (member.type === CalAttendeeType.ORGAN && member.organId === organId) {
                        return true;
                    }
                }
            }
        };
        /**
         * @param {?} uuid
         * @return {?}
         */
        CalBuilder.prototype.getOrgByUid = /**
         * @param {?} uuid
         * @return {?}
         */
        function (uuid) {
            for (var i = 0; i < this._organs.length; i++) {
                if (this._organs[i].uuid === uuid) {
                    return this._organs[i];
                }
            }
        };
        /**
         * @param {?} orgId
         * @return {?}
         */
        CalBuilder.prototype.getOrgById = /**
         * @param {?} orgId
         * @return {?}
         */
        function (orgId) {
            for (var i = 0; i < this._organs.length; i++) {
                if (this._organs[i].firmUUID === orgId) {
                    return this._organs[i];
                }
            }
        };
        /**
         * @param {?} orgId
         * @return {?}
         */
        CalBuilder.prototype.getOrgNameById = /**
         * @param {?} orgId
         * @return {?}
         */
        function (orgId) {
            /** @type {?} */
            var organ = this.getOrgById(orgId);
            return organ && organ.firmName || '';
        };
        /**
         * @param {?} prefix
         * @return {?}
         */
        CalBuilder.prototype.getOrgByPrefix = /**
         * @param {?} prefix
         * @return {?}
         */
        function (prefix) {
            for (var i = 0; i < this._organs.length; i++) {
                if (this._organs[i].firmPrefix === prefix) {
                    return this._organs[i];
                }
            }
        };
        /**
         * @param {?} url
         * @param {?} orgid
         * @param {?=} domain
         * @return {?}
         */
        CalBuilder.prototype.getUrlByOrgId = /**
         * @param {?} url
         * @param {?} orgid
         * @param {?=} domain
         * @return {?}
         */
        function (url, orgid, domain) {
            /** @type {?} */
            var item = this.getOrgById(orgid);
            return AjaxAPI.getUrl(url, domain, item && item.firmPrefix);
        };
        /**
         * @param {?} orgid
         * @param {?} callback
         * @param {?=} options
         * @return {?}
         */
        CalBuilder.prototype.loadRole = /**
         * @param {?} orgid
         * @param {?} callback
         * @param {?=} options
         * @return {?}
         */
        function (orgid, callback, options) {
            var _this = this;
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
                function (data) {
                    try {
                        data = JSON.parse(data);
                        if (data.isAuth) {
                            _this._userRoles[orgid] = data;
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
                function () {
                    callback({});
                })
            }, options, true);
        };
        /**
         * @param {?} organIds
         * @param {?} callback
         * @param {?=} options
         * @return {?}
         */
        CalBuilder.prototype.loadRoles = /**
         * @param {?} organIds
         * @param {?} callback
         * @param {?=} options
         * @return {?}
         */
        function (organIds, callback, options) {
            var _this = this;
            /** @type {?} */
            var promises = [];
            organIds.forEach((/**
             * @param {?} organId
             * @return {?}
             */
            function (organId) {
                promises.push(new Promise(((/**
                 * @param {?} resolve
                 * @return {?}
                 */
                function (resolve) {
                    _this.loadRole(organId, resolve, options);
                }))));
            }));
            Promise.all(promises).then((/**
             * @param {?} values
             * @return {?}
             */
            function (values) { return callback(values); }));
        };
        /**
         * @param {?} events
         * @param {?=} date
         * @param {?=} firstDay
         * @return {?}
         */
        CalBuilder.prototype.generateEventWeekView = /**
         * @param {?} events
         * @param {?=} date
         * @param {?=} firstDay
         * @return {?}
         */
        function (events, date, firstDay) {
            /** @type {?} */
            var segEvents = [];
            /** @type {?} */
            var startWeek = DateUtils.getDateStartWeek(date, firstDay);
            var _loop_1 = function (i) {
                /** @type {?} */
                var dayOfYear = DateUtils.dayOfYear(startWeek);
                segEvents.push(this_1.generateEventView(events.filter((/**
                 * @param {?} event
                 * @return {?}
                 */
                function (event) {
                    return event.day === dayOfYear;
                })), startWeek));
                startWeek.setDate(startWeek.getDate() + 1);
            };
            var this_1 = this;
            for (var i = 0; i < 7; i++) {
                _loop_1(i);
            }
            return segEvents;
        };
        /**
         * @param {?} segEvents
         * @return {?}
         */
        CalBuilder.prototype.getLastUpdateSegEvents = /**
         * @param {?} segEvents
         * @return {?}
         */
        function (segEvents) {
            /** @type {?} */
            var lastUpdate;
            segEvents.forEach((/**
             * @param {?} segEvent
             * @return {?}
             */
            function (segEvent) {
                segEvent.items.forEach((/**
                 * @param {?} event
                 * @return {?}
                 */
                function (event) {
                    /** @type {?} */
                    var lastUpdateEvent = event.updateDate || event.createDate;
                    if (!lastUpdate || lastUpdate < lastUpdateEvent) {
                        lastUpdate = lastUpdateEvent;
                    }
                }));
            }));
            return lastUpdate;
        };
        /**
         * @param {?} events
         * @param {?} date
         * @return {?}
         */
        CalBuilder.prototype.generateEventView = /**
         * @param {?} events
         * @param {?} date
         * @return {?}
         */
        function (events, date) {
            date = new Date(date);
            return {
                day: DateUtils.dayOfYear(date),
                display: this.getDisplayByDay(date.getDay()),
                dayStr: this.formatDateStr(date),
                isToday: DateUtils.dateIsToday(date),
                date: date,
                items: events
            };
        };
        /**
         * @param {?=} day
         * @return {?}
         */
        CalBuilder.prototype.getDisplayByDay = /**
         * @param {?=} day
         * @return {?}
         */
        function (day) {
            return this.resources.days[day];
        };
        /**
         * @param {?} members
         * @param {?=} role
         * @return {?}
         */
        CalBuilder.prototype.buildMembers = /**
         * @param {?} members
         * @param {?=} role
         * @return {?}
         */
        function (members, role) {
            members.forEach((/**
             * @param {?} member
             * @return {?}
             */
            function (member) { return member.role = role || CalAttendeeRole.MEMBER; }));
            return members;
        };
        /**
         * @param {?} attendees
         * @return {?}
         */
        CalBuilder.prototype.groupAttendeeByOrgan = /**
         * @param {?} attendees
         * @return {?}
         */
        function (attendees) {
            /** @type {?} */
            var data = {};
            attendees.forEach((/**
             * @param {?} attendee
             * @return {?}
             */
            function (attendee) {
                data[attendee.organId] = data[attendee.organId] || [];
                data[attendee.organId].push(attendee);
            }));
            return data;
        };
        /**
         * @param {?} event
         * @param {?} attendees
         * @param {?} ownOrganId
         * @param {?} callback
         * @param {?=} options
         * @return {?}
         */
        CalBuilder.prototype.groupAttendeeByOrganRole = /**
         * @param {?} event
         * @param {?} attendees
         * @param {?} ownOrganId
         * @param {?} callback
         * @param {?=} options
         * @return {?}
         */
        function (event, attendees, ownOrganId, callback, options) {
            var _this = this;
            if (attendees.length < 1) {
                return callback([]);
            }
            /** @type {?} */
            var groupByOrgans = this.groupAttendeeByOrgan(attendees);
            /** @type {?} */
            var organIds = Object.keys(groupByOrgans);
            if (organIds.indexOf(ownOrganId) < 0) {
                organIds.push(ownOrganId);
            }
            this.loadRoles(organIds, (/**
             * @return {?}
             */
            function () {
                /** @type {?} */
                var internalUpdate = !event.uuid || _this.canUpdateAttendee(event, ownOrganId);
                /** @type {?} */
                var data = [];
                Object.keys(groupByOrgans).forEach((/**
                 * @param {?} organId
                 * @return {?}
                 */
                function (organId) {
                    /** @type {?} */
                    var isMyOrgan = organId === ownOrganId;
                    /** @type {?} */
                    var externalUpdate = isMyOrgan && _this.canExternalUpdateEvent(event, organId);
                    /** @type {?} */
                    var attendees = groupByOrgans[organId];
                    data.push({
                        organId: organId,
                        organName: _this.getOrgNameById(organId),
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
                        function (attendee) {
                            return attendee.readTime !== undefined && isMyOrgan && _this.attendeeIsMe(attendee);
                        })
                    });
                }));
                callback(data);
            }), options);
        };
        /**
         * @param {?=} item
         * @return {?}
         */
        CalBuilder.prototype.buildMemberStr = /**
         * @param {?=} item
         * @return {?}
         */
        function (item) {
            item.members = item.members || [];
            return item.members.map((/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return item.name; })).join(',');
        };
        /**
         * @param {?} members
         * @return {?}
         */
        CalBuilder.prototype.buildMemberShow = /**
         * @param {?} members
         * @return {?}
         */
        function (members) {
            return (members || []).map((/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return item.name; })).join(';');
        };
        /**
         * @param {?} data
         * @param {?=} event
         * @return {?}
         */
        CalBuilder.prototype.modifyDataUpdate = /**
         * @param {?} data
         * @param {?=} event
         * @return {?}
         */
        function (data, event) {
            var _this = this;
            /** @type {?} */
            var attendeeJson = [];
            // Remove all members and rebuild
            if (data.attendee) {
                /** @type {?} */
                var newAttendees = data.attendee.filter((/**
                 * @param {?} attendee
                 * @return {?}
                 */
                function (attendee) {
                    return attendee.readTime === undefined;
                }));
                if (event && event.uuid) {
                    /** @type {?} */
                    var remainAttendees_1 = data.attendee.filter((/**
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
                    function (member) {
                        if (member.role !== CalAttendeeRole.CREATOR) {
                            if (remainAttendees_1.indexOf(member) < 0) {
                                attendeeJson.push(_this.attendeeRemoveJson(member));
                            }
                        }
                    }));
                }
                newAttendees.forEach((/**
                 * @param {?} attendee
                 * @return {?}
                 */
                function (attendee) { return attendeeJson.push(_this.attendeeAddJson(attendee)); }));
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
        };
        /**
         * @param {?} attendee
         * @return {?}
         */
        CalBuilder.prototype.attendeeAddJson = /**
         * @param {?} attendee
         * @return {?}
         */
        function (attendee) {
            /** @type {?} */
            var obj = {
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
        };
        /**
         * @param {?} attendee
         * @return {?}
         */
        CalBuilder.prototype.attendeeRemoveJson = /**
         * @param {?} attendee
         * @return {?}
         */
        function (attendee) {
            /** @type {?} */
            var obj = {
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
        };
        /**
         * @param {?} data
         * @return {?}
         */
        CalBuilder.prototype._convertOrg = /**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            data = data || [];
            for (var i = 0; i < data.length; i++) {
                /** @type {?} */
                var item = data[i];
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
            function (a, b) {
                return a.firmName.localeCompare(b.firmName);
            }));
            return data;
        };
        /**
         * @param {?} objectId
         * @return {?}
         */
        CalBuilder.prototype.viewEventOnModal = /**
         * @param {?} objectId
         * @return {?}
         */
        function (objectId) {
            var _this = this;
            if (this._mapEvents[objectId]) {
                iNet.plugins.ready((/**
                 * @param {?} plugins
                 * @return {?}
                 */
                function (plugins) {
                    if (plugins.xcalendar) {
                        plugins.xcalendar.openView(_this._mapEvents[objectId]);
                    }
                }));
            }
        };
        // Save and get event
        // Save and get event
        /**
         * @param {?} objectId
         * @return {?}
         */
        CalBuilder.prototype.getEventByObjectId = 
        // Save and get event
        /**
         * @param {?} objectId
         * @return {?}
         */
        function (objectId) {
            return this._mapEvents[objectId];
        };
        /**
         * @param {?=} minutes
         * @return {?}
         */
        CalBuilder.prototype.getTextForMinutes = /**
         * @param {?=} minutes
         * @return {?}
         */
        function (minutes) {
            minutes = parseInt(minutes) || 1;
            if (minutes >= 60) {
                return Math.round(minutes / 60) + ' ' + this.resources.hour;
            }
            else {
                return minutes + ' ' + this.resources.minute;
            }
        };
        /**
         * @param {?} events
         * @return {?}
         */
        CalBuilder.prototype.groupEventBySession = /**
         * @param {?} events
         * @return {?}
         */
        function (events) {
            /** @type {?} */
            var data = {
                allday: [],
                morning: [],
                afternoon: [],
                evening: []
            };
            events.forEach((/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
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
            for (var k in data) {
                this.sortEvents(data[k]);
            }
            return data;
        };
        /**
         * @param {?} events
         * @param {?} persons
         * @param {?} date
         * @return {?}
         */
        CalBuilder.prototype.groupEventByPerson = /**
         * @param {?} events
         * @param {?} persons
         * @param {?} date
         * @return {?}
         */
        function (events, persons, date) {
            var _this = this;
            /** @type {?} */
            var data = {
                persons: [],
                segEvents: this.generateEventWeekView(events, date)
            };
            /** @type {?} */
            var eventByDays = data.segEvents.map((/**
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
            function (person) {
                /** @type {?} */
                var eventDays = eventByDays.map((/**
                 * @param {?} events
                 * @return {?}
                 */
                function (events) {
                    return events.filter((/**
                     * @param {?} event
                     * @return {?}
                     */
                    function (event) { return _this.memberIsAttendee(event, person.name); }));
                }));
                data.persons.push({
                    person: person,
                    eventDays: eventDays
                });
            }));
            return data;
        };
        /**
         * @param {?} events
         * @param {?} organId
         * @param {?} callback
         * @param {?=} options
         * @return {?}
         */
        CalBuilder.prototype.groupEventByLeaders = /**
         * @param {?} events
         * @param {?} organId
         * @param {?} callback
         * @param {?=} options
         * @return {?}
         */
        function (events, organId, callback, options) {
            var _this = this;
            this.loadLeaders(organId, (/**
             * @param {?} leaders
             * @return {?}
             */
            function (leaders) {
                /** @type {?} */
                var dataLeaders = [];
                /** @type {?} */
                var otherEvents = [];
                leaders.forEach((/**
                 * @param {?} leader
                 * @return {?}
                 */
                function (leader) { return dataLeaders.push({
                    username: leader.name,
                    fullname: leader.value,
                    events: []
                }); }));
                events.forEach((/**
                 * @param {?} event
                 * @return {?}
                 */
                function (event) {
                    /** @type {?} */
                    var isFound;
                    for (var i = 0; i < dataLeaders.length; i++) {
                        /** @type {?} */
                        var item = dataLeaders[i];
                        if (_this.memberIsAttendee(event, item.username)) {
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
        };
        /**
         * @param {?} event
         * @return {?}
         */
        CalBuilder.prototype.meIsCreator = /**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            for (var i = event.members.length - 1; i >= 0; i--) {
                if (event.members[i].role === CalAttendeeRole.CREATOR && this.attendeeIsMe(event.members[i])) {
                    return true;
                }
            }
            return false;
        };
        /**
         * @param {?} attendde
         * @return {?}
         */
        CalBuilder.prototype.attendeeIsMe = /**
         * @param {?} attendde
         * @return {?}
         */
        function (attendde) {
            return this.usernameIsMe(attendde.username);
        };
        /**
         * @param {?} attendde
         * @return {?}
         */
        CalBuilder.prototype.attendeeDisplay = /**
         * @param {?} attendde
         * @return {?}
         */
        function (attendde) {
            return attendde.alias || attendde.display || attendde.fullname || attendde.username || attendde.organName;
        };
        /**
         * @param {?} attendde
         * @return {?}
         */
        CalBuilder.prototype.attendeeValue = /**
         * @param {?} attendde
         * @return {?}
         */
        function (attendde) {
            return attendde.alias || attendde.username || attendde.organId;
        };
        /**
         * @param {?} text
         * @return {?}
         */
        CalBuilder.prototype.formatTextDisplay = /**
         * @param {?} text
         * @return {?}
         */
        function (text) {
            /** @type {?} */
            var display = this.formatTextUpdate(text);
            // break line
            display = display.replace(/\n/g, '<br>');
            return display;
        };
        /**
         * @param {?} text
         * @return {?}
         */
        CalBuilder.prototype.formatTextUpdate = /**
         * @param {?} text
         * @return {?}
         */
        function (text) {
            /** @type {?} */
            var $fragment = $('<div>').html(text);
            $fragment.find('style,script').remove();
            return $fragment.html();
        };
        /**
         * @param {?} event
         * @param {?} member
         * @return {?}
         */
        CalBuilder.prototype.memberIsAttendee = /**
         * @param {?} event
         * @param {?} member
         * @return {?}
         */
        function (event, member) {
            // for (let i = 0; i < event.members.length; i++) {
            //     if (event.members[i].role !== CalAttendeeRole.CREATOR && event.members[i].username === member) {
            //         return true;
            //     }
            // }
            for (var i = 0; i < event.members.length; i++) {
                if (event.members[i].username === member) {
                    return true;
                }
            }
        };
        /**
         * @param {?} event
         * @param {?} username
         * @return {?}
         */
        CalBuilder.prototype.getAttendeeByUsername = /**
         * @param {?} event
         * @param {?} username
         * @return {?}
         */
        function (event, username) {
            for (var i = 0; i < event.members.length; i++) {
                if (event.members[i].username === username) {
                    return event.members[i];
                }
            }
        };
        /**
         * @param {?} event
         * @return {?}
         */
        CalBuilder.prototype.getAttendeeIsMe = /**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            for (var i = 0; i < event.members.length; i++) {
                /** @type {?} */
                var member = event.members[i];
                if (member.role !== CalAttendeeRole.CREATOR && this.usernameIsMe(member.username)) {
                    return member;
                }
            }
        };
        /**
         * @param {?} event
         * @return {?}
         */
        CalBuilder.prototype.eventIsViewed = /**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            /** @type {?} */
            var attendee = this.getAttendeeIsMe(event);
            return !attendee || attendee.readTime;
        };
        /**
         * @param {?} username
         * @return {?}
         */
        CalBuilder.prototype.usernameIsMe = /**
         * @param {?} username
         * @return {?}
         */
        function (username) {
            return username === iNet.usercode;
        };
        /**
         * @param {?} data
         * @param {?=} options
         * @param {?=} cacheResponse
         * @return {?}
         */
        CalBuilder.prototype.sendRequest = /**
         * @param {?} data
         * @param {?=} options
         * @param {?=} cacheResponse
         * @return {?}
         */
        function (data, options, cacheResponse) {
            var _this = this;
            /** @type {?} */
            var option = this._buildAjaxOptions(data, options);
            if (cacheResponse) {
                /** @type {?} */
                var keyCache_1 = option.url;
                if (option.data && Object.keys(option.data).length > 0) {
                    keyCache_1 += JSON.stringify(option.data);
                }
                /** @type {?} */
                var dataCached = this.cacheDataTemp(keyCache_1);
                if (dataCached) {
                    return option.success(dataCached);
                }
                this.addQueue(keyCache_1, (/**
                 * @param {?} resolve
                 * @return {?}
                 */
                function (resolve) {
                    /** @type {?} */
                    var _option = $.extend({}, option);
                    _option.success = (/**
                     * @param {?} data
                     * @return {?}
                     */
                    function (data) {
                        _this.cacheDataTemp(keyCache_1, data);
                        resolve(data);
                    });
                    _option.error = (/**
                     * @param {?} error
                     * @return {?}
                     */
                    function (error) {
                        resolve(null, error);
                    });
                    AjaxAPI.sendRequest(_option);
                }), (/**
                 * @param {?} data
                 * @param {?} error
                 * @return {?}
                 */
                function (data, error) {
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
        };
        /**
         * @param {?} data
         * @param {?=} options
         * @return {?}
         */
        CalBuilder.prototype.postForm = /**
         * @param {?} data
         * @param {?=} options
         * @return {?}
         */
        function (data, options) {
            return AjaxAPI.postForm(this._buildAjaxOptions(data, options));
        };
        /**
         * @param {?} data
         * @param {?=} options
         * @return {?}
         */
        CalBuilder.prototype._buildAjaxOptions = /**
         * @param {?} data
         * @param {?=} options
         * @return {?}
         */
        function (data, options) {
            /** @type {?} */
            var option = $.extend({}, data, options);
            /** @type {?} */
            var orgid = option.data && option.data.orgid || this.getOrgId();
            /** @type {?} */
            var org = this.getOrgById(orgid);
            /** @type {?} */
            var isLocalFirm = org && org.firmPrefix === iNet.path.slice(1);
            /** @type {?} */
            var isUseOrgId = !option.removeOrgId && (isLocalFirm || option.useOrgId);
            if (isUseOrgId) {
                option.data = option.data || {};
                option.data.orgid = orgid;
            }
            else if (option.data) {
                delete option.data.orgid;
            }
            option.url = this.getUrlByOrgId(option.url, orgid, option.domain);
            return option;
        };
        /**
         * @return {?}
         */
        CalBuilder.prototype._getOrganOnInit = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var organ;
            /** @type {?} */
            var params = this.getQueryParams();
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
                var organId = this.getOrgId() || iNet.organId;
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
        };
        /**
         * @param {?} cars
         * @param {?} events
         * @return {?}
         */
        CalBuilder.prototype.groupEventByCar = /**
         * @param {?} cars
         * @param {?} events
         * @return {?}
         */
        function (cars, events) {
            /** @type {?} */
            var data = [];
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
                var carData = data[0];
                if (event._carUUID) {
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].car.uuid === event._carUUID) {
                            carData = data[i];
                        }
                    }
                }
                carData.events.push(event);
            }));
            return data;
        };
        /**
         * @param {?} events
         * @return {?}
         */
        CalBuilder.prototype.filterMeetPeopleEvents = /**
         * @param {?} events
         * @return {?}
         */
        function (events) {
            return events.filter((/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                return event._subType === CalSubType.MEET_PEOPLE;
            }));
        };
        /**
         * @param {?} executor
         * @param {?} params
         * @param {?} callback
         * @param {?} options
         * @return {?}
         */
        CalBuilder.prototype._loadOnDifferYear = /**
         * @param {?} executor
         * @param {?} params
         * @param {?} callback
         * @param {?} options
         * @return {?}
         */
        function (executor, params, callback, options) {
            var _this = this;
            if (!params.from || !params.to || params.from <= params.to) {
                executor.apply(this, [params, callback, options]);
            }
            else {
                // Load in differ year
                /** @type {?} */
                var promises = [];
                /** @type {?} */
                var endOfYear = new Date(params.year + 1, 0);
                endOfYear.setTime(endOfYear.getTime() - 1);
                /** @type {?} */
                var params1_1 = $.extend({}, params);
                /** @type {?} */
                var options1_1 = $.extend({}, options);
                params1_1.to = DateUtils.dayOfYear(endOfYear);
                promises.push(new Promise((/**
                 * @param {?} resolve
                 * @return {?}
                 */
                function (resolve) {
                    executor.apply(_this, [params1_1, resolve, options1_1]);
                })));
                /** @type {?} */
                var params2_1 = $.extend({}, params);
                /** @type {?} */
                var options2_1 = $.extend({}, options);
                params2_1.year = params.year + 1;
                params2_1.from = 1;
                promises.push(new Promise((/**
                 * @param {?} resolve
                 * @return {?}
                 */
                function (resolve) {
                    executor.apply(_this, [params2_1, resolve, options2_1]);
                })));
                Promise.all(promises).then((/**
                 * @param {?} values
                 * @return {?}
                 */
                function (values) {
                    /** @type {?} */
                    var events = [].concat.apply([], values);
                    _this.removeEventDuplicate(events);
                    callback(events);
                }));
            }
        };
        /**
         * @param {?} params
         * @param {?} date
         * @param {?} callback
         * @param {?=} options
         * @return {?}
         */
        CalBuilder.prototype.loadMonthEvents = /**
         * @param {?} params
         * @param {?} date
         * @param {?} callback
         * @param {?=} options
         * @return {?}
         */
        function (params, date, callback, options) {
            /** @type {?} */
            var from;
            /** @type {?} */
            var to;
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
        };
        /**
         * @param {?} calEvent
         * @param {?} domain
         * @return {?}
         */
        CalBuilder.prototype.getExportUrl = /**
         * @param {?} calEvent
         * @param {?} domain
         * @return {?}
         */
        function (calEvent, domain) {
            if (calEvent && calEvent.uuid && calEvent._templateId) {
                return this.getUrlByOrgId('calbuilder/invitation/export', calEvent.firmUUID, domain) +
                    '?templateID=' + calEvent._templateId +
                    '&element=' + calEvent.uuid;
            }
        };
        /**
         * @param {?} date
         * @return {?}
         */
        CalBuilder.prototype.getWeekParams = /**
         * @param {?} date
         * @return {?}
         */
        function (date) {
            /** @type {?} */
            var weekRange = DateUtils.getWeekRange(date);
            return this.getRangeParams(weekRange.startWeek, weekRange.endWeek);
        };
        /**
         * @param {?} from
         * @param {?} to
         * @return {?}
         */
        CalBuilder.prototype.getRangeParams = /**
         * @param {?} from
         * @param {?} to
         * @return {?}
         */
        function (from, to) {
            return {
                year: from.getFullYear(),
                from: DateUtils.dayOfYear(from),
                to: DateUtils.dayOfYear(to)
            };
        };
        /**
         * @param {?} date
         * @param {?} weekParams
         * @return {?}
         */
        CalBuilder.prototype.dateEqualWeekParams = /**
         * @param {?} date
         * @param {?} weekParams
         * @return {?}
         */
        function (date, weekParams) {
            /** @type {?} */
            var params = this.getWeekParams(date);
            return date && weekParams && params.year === weekParams.year &&
                params.from === weekParams.from &&
                params.to === weekParams.to;
        };
        /**
         * @param {?} event
         * @param {?=} params
         * @return {?}
         */
        CalBuilder.prototype.eventIsOnRange = /**
         * @param {?} event
         * @param {?=} params
         * @return {?}
         */
        function (event, params) {
            return (params.startTime >= event.startTime && params.startTime < event.toTime) ||
                (params.toTime <= event.toTime && params.toTime > event.startTime) ||
                (params.startTime <= event.startTime && params.toTime >= event.toTime);
        };
        /**
         * @param {?} params
         * @param {?} callback
         * @param {?=} options
         * @return {?}
         */
        CalBuilder.prototype.verifyDuplicateEvents = /**
         * @param {?} params
         * @param {?} callback
         * @param {?=} options
         * @return {?}
         */
        function (params, callback, options) {
            var _this = this;
            /** @type {?} */
            var duplicateEvents = [];
            this.loadPublishEvents({
                year: params.year,
                day: params.day,
                orgid: params.orgid || this.getOrgId()
            }, (/**
             * @param {?} events
             * @return {?}
             */
            function (events) {
                /** @type {?} */
                var allEvents = [];
                if (_this.catIsCar(params.category)) {
                    events = events.filter((/**
                     * @param {?} event
                     * @return {?}
                     */
                    function (event) { return _this.catIsCar(event.category); }));
                }
                else {
                    events = events.filter((/**
                     * @param {?} event
                     * @return {?}
                     */
                    function (event) { return !_this.catIsCar(event.category); }));
                }
                /** @type {?} */
                var detector = (/**
                 * @param {?} username
                 * @return {?}
                 */
                function (username) {
                    /** @type {?} */
                    var obj = {
                        username: username,
                        events: []
                    };
                    events.forEach((/**
                     * @param {?} event
                     * @return {?}
                     */
                    function (event) {
                        /** @type {?} */
                        var member = _this.getAttendeeByUsername(event, username);
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
                function (event) {
                    return event.mode === CalMode.PUBLISH && event.uuid !== params.element &&
                        _this.eventIsOnRange(event, params);
                }));
                if (params.attendee) {
                    params.attendee.forEach((/**
                     * @param {?} attendee
                     * @return {?}
                     */
                    function (attendee) { return detector(attendee.username); }));
                }
                // Todo: creator is attendee
                /** @type {?} */
                var isExist = false;
                for (var i = 0; i < duplicateEvents.length; i++) {
                    if (duplicateEvents[i].username === iNet.usercode) {
                        isExist = true;
                        break;
                    }
                }
                if (!isExist) {
                    detector(iNet.usercode);
                }
                duplicateEvents['allEvents'] = _this.removeEventDuplicate(allEvents);
                callback(duplicateEvents);
            }), options);
        };
        /**
         * @param {?} params
         * @param {?} event
         * @return {?}
         */
        CalBuilder.prototype.needVerifyDuplicate = /**
         * @param {?} params
         * @param {?} event
         * @return {?}
         */
        function (params, event) {
            /** @type {?} */
            var isEventPublished = event.mode === CalMode.PUBLISH;
            /** @type {?} */
            var actionPublish = !isEventPublished && Number(params.mode) === CalMode.PUBLISH;
            /** @type {?} */
            var isTimeChanged = event.uuid && ((params.startTime && event.startTime !== params.startTime) ||
                (params.toTime && event.toTime !== params.toTime) ||
                (params.day && event.day !== params.day)) && isEventPublished;
            return actionPublish || isTimeChanged;
        };
        /**
         * @param {?} event
         * @return {?}
         */
        CalBuilder.prototype.subjectDisplayWithMaxLength = /**
         * @param {?} event
         * @return {?}
         */
        function (event) {
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
        };
        // SubFirm Dictionary Utils
        // SubFirm Dictionary Utils
        /**
         * @param {?} data
         * @param {?} callback
         * @param {?=} options
         * @return {?}
         */
        CalBuilder.prototype.dictCreate = 
        // SubFirm Dictionary Utils
        /**
         * @param {?} data
         * @param {?} callback
         * @param {?=} options
         * @return {?}
         */
        function (data, callback, options) {
            return this.sendRequest({
                type: 'post',
                url: 'subfirm/dictionary/create',
                data: data,
                success: callback
            }, options);
        };
        /**
         * @param {?} data
         * @param {?} callback
         * @param {?=} options
         * @return {?}
         */
        CalBuilder.prototype.dictUpdate = /**
         * @param {?} data
         * @param {?} callback
         * @param {?=} options
         * @return {?}
         */
        function (data, callback, options) {
            data.dictID = data.dictID || data.uuid;
            return this.sendRequest({
                type: 'post',
                url: 'subfirm/dictionary/update',
                data: data,
                success: callback
            }, options);
        };
        /**
         * @param {?} data
         * @param {?} callback
         * @param {?=} options
         * @return {?}
         */
        CalBuilder.prototype.dictRemove = /**
         * @param {?} data
         * @param {?} callback
         * @param {?=} options
         * @return {?}
         */
        function (data, callback, options) {
            data.dictID = data.dictID || data.uuid;
            return this.sendRequest({
                type: 'post',
                url: 'subfirm/dictionary/remove',
                data: data,
                success: callback
            }, options);
        };
        /**
         * @param {?} params
         * @param {?} callback
         * @param {?=} options
         * @param {?=} cacheResponse
         * @return {?}
         */
        CalBuilder.prototype.dictList = /**
         * @param {?} params
         * @param {?} callback
         * @param {?=} options
         * @param {?=} cacheResponse
         * @return {?}
         */
        function (params, callback, options, cacheResponse) {
            // reference: required
            return this.sendRequest({
                type: 'post',
                url: 'subfirm/dictionary/list',
                data: params,
                success: (/**
                 * @param {?} data
                 * @return {?}
                 */
                function (data) { return callback(data && data.items || []); }),
                error: (/**
                 * @return {?}
                 */
                function () { return callback([]); })
            }, options, cacheResponse);
        };
        // Leader
        // Leader
        /**
         * @param {?} organId
         * @param {?} callback
         * @param {?=} options
         * @param {?=} cacheResponse
         * @return {?}
         */
        CalBuilder.prototype.loadLeaders = 
        // Leader
        /**
         * @param {?} organId
         * @param {?} callback
         * @param {?=} options
         * @param {?=} cacheResponse
         * @return {?}
         */
        function (organId, callback, options, cacheResponse) {
            /** @type {?} */
            var params = {
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
        };
        /**
         * @param {?} data
         * @param {?} callback
         * @param {?=} options
         * @return {?}
         */
        CalBuilder.prototype.leaderCreateOrUpdate = /**
         * @param {?} data
         * @param {?} callback
         * @param {?=} options
         * @return {?}
         */
        function (data, callback, options) {
            if (!data.uuid) {
                data.reference = LEADER_REFERENCE;
                this.dictCreate(data, callback, options);
            }
            else {
                this.dictUpdate(data, callback, options);
            }
        };
        /**
         * @param {?} data
         * @param {?} callback
         * @param {?=} options
         * @return {?}
         */
        CalBuilder.prototype.leaderRemove = /**
         * @param {?} data
         * @param {?} callback
         * @param {?=} options
         * @return {?}
         */
        function (data, callback, options) {
            this.dictRemove(data, callback, options);
        };
        return CalBuilder;
    }());
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
    var xCalendar = new CalBuilder();
    xCalendar._applyConfig();

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var CalendarDialogDelete = /** @class */ (function () {
        function CalendarDialogDelete(calendarService) {
            this.calendarService = calendarService;
            this.onDelete = new core.EventEmitter();
            this.dialogTitle = 'Lịch công tác';
            this.dialogContent = '';
        }
        /**
         * @return {?}
         */
        CalendarDialogDelete.prototype.ngAfterViewInit = /**
         * @return {?}
         */
        function () {
            this._initDialogDelete();
        };
        /**
         * @return {?}
         */
        CalendarDialogDelete.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this._destroyDialogDelete();
        };
        /**
         * @return {?}
         */
        CalendarDialogDelete.prototype.hide = /**
         * @return {?}
         */
        function () {
            this.confirmDialog.hide();
        };
        /**
         * @return {?}
         */
        CalendarDialogDelete.prototype.delete = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this.calendarService.removeEvent({
                element: this.calEvent.uuid,
                orgid: this.calEvent.firmUUID
            }, (/**
             * @return {?}
             */
            function () {
                _this.hide();
                _this.onDelete.emit();
            }));
        };
        /**
         * @return {?}
         */
        CalendarDialogDelete.prototype.show = /**
         * @return {?}
         */
        function () {
            this.dialogContent = 'Bạn có đồng ý xóa sự kiện <b>"' + this.calEvent.subject + '"</b> không?';
            this.confirmDialog.show();
        };
        /**
         * @private
         * @return {?}
         */
        CalendarDialogDelete.prototype._initDialogDelete = /**
         * @private
         * @return {?}
         */
        function () {
            this._$dialogDelete = $(this.dialogDelete.nativeElement).hide();
            // Click outside to close
            this.hide = this.hide.bind(this);
            document.body.addEventListener('click', this.hide);
            // Prevent close
            this._$dialogDelete.on('click', (/**
             * @param {?} e
             * @return {?}
             */
            function (e) { return e.stopPropagation(); }));
            // Append modal to body
            $(document.body).append(this._$dialogDelete);
        };
        /**
         * @private
         * @return {?}
         */
        CalendarDialogDelete.prototype._destroyDialogDelete = /**
         * @private
         * @return {?}
         */
        function () {
            document.body.removeEventListener('click', this.hide);
            this._$dialogDelete.remove();
        };
        CalendarDialogDelete.decorators = [
            { type: core.Component, args: [{
                        selector: 'calendar-dialog-delete',
                        template: "<div #dialogDelete class=\"modal fade\" bsModal #confirmDialog=\"bs-modal\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">\n    <div class=\"modal-dialog\" role=\"document\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <h4 class=\"modal-title pull-left\"> {{dialogTitle}}</h4>\n                <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"hide()\">\n                    <span aria-hidden=\"true\">&times;</span>\n                </button>\n            </div>\n            <div class=\"modal-body\" [innerHTML]=\"dialogContent\">\n            </div>\n            <div class=\"modal-footer\">\n                <div class=\"text-right\">\n                    <button type=\"button\" class=\"btn btn-lg btn-danger btn-sm\" (click)=\"delete()\">\n                        <i class=\"fa fa-trash\"></i> X\u00F3a\n                    </button>\n                    <button type=\"button\" class=\"btn btn-lg btn-default ml-2 btn-sm\" (click)=\"hide()\">\n                        <i class=\"fa fa-times\"></i> \u0110\u00F3ng\n                    </button>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>",
                        styles: [""]
                    }] }
        ];
        /** @nocollapse */
        CalendarDialogDelete.ctorParameters = function () { return [
            { type: CalendarService }
        ]; };
        CalendarDialogDelete.propDecorators = {
            calEvent: [{ type: core.Input }],
            onDelete: [{ type: core.Output }],
            confirmDialog: [{ type: core.ViewChild, args: [ngxBootstrap.ModalDirective,] }],
            dialogDelete: [{ type: core.ViewChild, args: ['dialogDelete',] }]
        };
        return CalendarDialogDelete;
    }());
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
    var moment$1 = moment_;
    moment$1.locale('vi');
    var CalendarUtils = /** @class */ (function () {
        function CalendarUtils() {
        }
        /**
         * @param {?} data
         * @return {?}
         */
        CalendarUtils.getRepeatText = /**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            /** @type {?} */
            var display = '';
            for (var i = 0; i < CalendarUtils.repeatTypes.length; i++) {
                if (CalendarUtils.repeatTypes[i].value === data.rrmode) {
                    display = CalendarUtils.repeatTypes[i].label;
                }
            }
            if (data.rrmode === 'WEEKLY') {
                display += ' - ' + CalendarUtils._getTextRepeatWeek(data.wkdays);
            }
            return display;
        };
        /**
         * @param {?} wkdays
         * @return {?}
         */
        CalendarUtils._getTextRepeatWeek = /**
         * @param {?} wkdays
         * @return {?}
         */
        function (wkdays) {
            if (wkdays) {
                return CalendarUtils.weekDays.filter((/**
                 * @param {?} day
                 * @return {?}
                 */
                function (day) {
                    return wkdays.indexOf(day.value) > -1;
                })).map((/**
                 * @param {?} day
                 * @return {?}
                 */
                function (day) {
                    return day.title;
                })).join(', ');
            }
            return '';
        };
        /**
         * @param {?} date
         * @return {?}
         */
        CalendarUtils.displayDay = /**
         * @param {?} date
         * @return {?}
         */
        function (date) {
            /** @type {?} */
            var str = moment$1(date).format('dddd, d MMMM');
            if (new Date().getFullYear() !== date.getFullYear()) {
                str += ' năm ' + date.getFullYear();
            }
            return str.slice(0, 1).toUpperCase() + str.slice(1);
        };
        /**
         * @param {?} date
         * @return {?}
         */
        CalendarUtils.displayDate = /**
         * @param {?} date
         * @return {?}
         */
        function (date) {
            return moment$1(date).format('[Ngày] LL');
        };
        /**
         * @param {?} date
         * @return {?}
         */
        CalendarUtils.displayWeek = /**
         * @param {?} date
         * @return {?}
         */
        function (date) {
            return moment$1(date).format('[Tuần] w [năm] Y');
        };
        /**
         * @param {?} date
         * @return {?}
         */
        CalendarUtils.displayMonth = /**
         * @param {?} date
         * @return {?}
         */
        function (date) {
            return moment$1(date).format('[Tháng] MM [năm] Y');
        };
        /**
         * @param {?} date
         * @return {?}
         */
        CalendarUtils.displayTime = /**
         * @param {?} date
         * @return {?}
         */
        function (date) {
            return moment$1(date).format('HH:mm');
        };
        /**
         * @param {?} element
         * @param {?} e
         * @param {?=} padding
         * @return {?}
         */
        CalendarUtils.computePosByPoint = /**
         * @param {?} element
         * @param {?} e
         * @param {?=} padding
         * @return {?}
         */
        function (element, e, padding) {
            /** @type {?} */
            var bounds = element.getBoundingClientRect();
            /** @type {?} */
            var halfHeight = bounds.height / 2;
            /** @type {?} */
            var halfWidth = bounds.width / 2;
            /** @type {?} */
            var direction;
            /** @type {?} */
            var pos = {
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
            var deltaTop = e.pageY;
            /** @type {?} */
            var deltaBottom = innerHeight - e.pageX;
            /** @type {?} */
            var deltaLeft = e.pageX;
            /** @type {?} */
            var deltaRight = innerWidth - e.pageY;
            /** @type {?} */
            var deltaMax = Math.max(deltaTop, deltaRight, deltaBottom, deltaLeft);
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
        };
        /**
         * @param {?} element
         * @param {?} target
         * @param {?} jsEvent
         * @param {?=} padding
         * @return {?}
         */
        CalendarUtils.computePosByTargetEl = /**
         * @param {?} element
         * @param {?} target
         * @param {?} jsEvent
         * @param {?=} padding
         * @return {?}
         */
        function (element, target, jsEvent, padding) {
            /** @type {?} */
            var elementBounds = element.getBoundingClientRect();
            /** @type {?} */
            var targetBounds = target.getBoundingClientRect();
            /** @type {?} */
            var pos = {};
            /** @type {?} */
            var direction = {};
            padding = padding || 10;
            /** @type {?} */
            var deltaRect = {
                top: targetBounds.top,
                right: innerWidth - targetBounds.right,
                bottom: innerHeight - targetBounds.bottom,
                left: targetBounds.left
            };
            /** @type {?} */
            var maxX = Math.max(deltaRect.left, deltaRect.right);
            /** @type {?} */
            var maxY = Math.max(deltaRect.top, deltaRect.bottom);
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
                var targetHeight = innerHeight - deltaRect.bottom - deltaRect.top;
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
                var targetWidth = innerWidth - deltaRect.left - deltaRect.right;
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
        };
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
        return CalendarUtils;
    }());
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
    var CalendarEvent = /** @class */ (function () {
        function CalendarEvent(event) {
            this.repeatText = '';
            this.timeDisplay = '';
            this.event = event;
            this.subject = inetCore.HtmlUtils.formatHtmlDisplay(event.subject);
            this.summary = inetCore.HtmlUtils.formatHtmlDisplay(event.summary);
            if (event.members) {
                this.myAttendee = event.members.find((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) {
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
                this.timeDisplay += " \u22C5 " + CalendarUtils.displayTime(event.start) + " - " + CalendarUtils.displayTime(event.end);
            }
        }
        return CalendarEvent;
    }());
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
    var CalendarDialogViewComponent = /** @class */ (function () {
        function CalendarDialogViewComponent(router) {
            this.router = router;
            this.onChange = new core.EventEmitter();
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
            { type: core.Component, args: [{
                        template: "<div #modalView class=\"modal-dialog popover\" role=\"document\">\n    <div class=\"modal-content\" *ngIf=\"calEvent\">\n            <div class=\"header-dialog\" [ngClass]=\"{'overlay': titleOverlay}\">\n                <i class=\"fa fa-pencil\" *ngIf=\"calEvent.isCreator || !!calendarEvent.myAttendee\" (click)=\"editEvent()\" title=\"Ch\u1EC9nh s\u1EEDa\"></i>\n                <i class=\"fa fa-trash\" *ngIf=\"calEvent.isCreator\" (click)=\"removeEvent()\" title=\"X\u00F3a\"></i>\n                <i (click)=\"hide()\" class=\"fa fa-times\" title=\"\u0110\u00F3ng\"></i>\n            </div>\n        <div class=\"content-dialog\" [ngStyle]=\"{'max-height.px': maxHeight}\">\n                <div class=\"field-group\">\n                    <i class=\"field-icon fa fa-calendar\"></i>\n                    <div class=\"field-content\">\n                        <div style=\"font-size:18px\" [innerHTML]=\"calendarEvent.subject\"></div>\n                        <div>{{calendarEvent.timeDisplay}}</div>\n                        <div>{{calendarEvent.repeatText}}</div>\n                    </div>\n                </div>\n                <div class=\"field-group\" *ngIf=\"calEvent.memberStr\">\n                    <i class=\"field-icon fa fa-users\" title=\"Kh\u00E1ch m\u1EDDi tham d\u1EF1\"></i>\n                    <div class=\"field-content\">\n                        <calendar-attendee-list [attendees]=\"calEvent.attendees\" [expandable]=\"true\"></calendar-attendee-list>\n                    </div>\n                </div>\n                <div class=\"field-group\" *ngIf=\"calEvent.location\">\n                    <i class=\"field-icon fa fa-map-marker\" title=\"\u0110\u1ECBa \u0111i\u1EC3m\"></i>\n                    <div class=\"field-content\">{{ calEvent.location }}</div>\n                </div>\n                <div class=\"field-group\" *ngIf=\"calendarEvent.summary\">\n                    <i class=\"field-icon fa fa-align-left\" title=\"M\u00F4 t\u1EA3 s\u1EF1 ki\u1EC7n\"></i>\n                    <div class=\"field-content\" [innerHTML]=\"calendarEvent.summary\"></div>\n                </div>\n                <div class=\"field-group\" *ngIf=\"calEvent['fullname']\">\n                    <i class=\"field-icon fa fa-user-circle\" title=\"Ng\u01B0\u1EDDi t\u1EA1o\"></i>\n                    <div class=\"field-content\">{{ calEvent['fullname'] }}</div>\n                </div>\n                <div class=\"field-group\" *ngIf=\"calEvent?.attachments?.length\">\n                    <i class=\"field-icon fa fa-paperclip\" title=\"T\u1EADp tin \u0111\u00EDnh k\u00E8m\"></i>\n                    <div class=\"field-content\">\n                        <calendar-attachment-list [calEvent]=\"calEvent\"></calendar-attachment-list>\n                    </div>\n                </div>\n            </div>\n    </div>\n</div>\n<calendar-dialog-delete #dialogRemove hidden [calEvent]=\"calEvent\" (onDelete)=\"changeEvent()\"></calendar-dialog-delete>\n",
                        styles: [".modal-dialog{min-width:450px;margin:0;z-index:1040!important}.modal-content{padding:0;border-radius:4px;border:0;box-shadow:1px 1px 7px 3px rgba(0,0,0,.14)}.header-dialog{padding:10px 25px;text-align:right}.header-dialog .overlay{border-bottom:1px solid #eee}.header-dialog>i{cursor:pointer;width:34px;height:34px;line-height:34px;text-align:center;font-size:18px;border-radius:50%;color:#555;margin-left:10px}.header-dialog>i:hover{background:rgba(0,0,0,.1)}.field-group{margin-bottom:20px;padding-left:14px;padding-right:5px}.field-icon{width:30px;float:left;color:#666;font-size:20px;text-align:center;margin-right:15px;margin-top:2px}.field-content{overflow:hidden;line-height:1.6}.file-attach-layout{float:left;max-width:144px;border:1px solid #fff;padding-right:5px}.file-attach-content{height:36px;line-height:36px;border-radius:2px;cursor:pointer;color:#2a6496;margin-bottom:7px}.file-attach-img{float:left;width:20px;height:20px;margin-top:6px;margin-right:10px}.file-attach-text{display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}a{color:#428bca;text-decoration:none;background:0 0}a:not([href]):hover{text-decoration:underline}.content-dialog{overflow-y:auto}"]
                    }] }
        ];
        /** @nocollapse */
        CalendarDialogViewComponent.ctorParameters = function () { return [
            { type: router.Router }
        ]; };
        CalendarDialogViewComponent.propDecorators = {
            onChange: [{ type: core.Output }],
            modalView: [{ type: core.ViewChild, args: ['modalView',] }],
            viewDeleteModal: [{ type: core.ViewChild, args: ['dialogRemove',] }]
        };
        return CalendarDialogViewComponent;
    }());
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
    var moment$2 = moment_;
    moment$2.locale('vi');
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
            { type: core.Injectable }
        ];
        /** @nocollapse */
        CalendarService.ctorParameters = function () { return [
            { type: inetCore.SuggestionService },
            { type: core.ComponentFactoryResolver },
            { type: core.Injector },
            { type: core.ApplicationRef }
        ]; };
        return CalendarService;
    }());
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
    var CalendarTodayComponent = /** @class */ (function () {
        function CalendarTodayComponent(calendarService) {
            var _this = this;
            this.calendarService = calendarService;
            this.onChange = new core.EventEmitter();
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
            function () { return _this.loadTodayEvents(); }));
        }
        /**
         * @return {?}
         */
        CalendarTodayComponent.prototype.loadTodayEvents = /**
         * @return {?}
         */
        function () {
            var _this = this;
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
            function (events) {
                events.forEach((/**
                 * @param {?} e
                 * @return {?}
                 */
                function (e) { return _this._initEventStatus(e); }));
                _this.events = events.slice(0, 3); // Maximum 3 events
            }));
        };
        /**
         * @param {?} event
         * @param {?} jsEvent
         * @param {?} targetEl
         * @return {?}
         */
        CalendarTodayComponent.prototype.onViewEvent = /**
         * @param {?} event
         * @param {?} jsEvent
         * @param {?} targetEl
         * @return {?}
         */
        function (event, jsEvent, targetEl) {
            var _this = this;
            this.calendarService.viewEvent(event, jsEvent, targetEl, (/**
             * @return {?}
             */
            function () {
                _this.loadTodayEvents();
                _this.onChange.emit(true);
            }));
        };
        /**
         * @private
         * @param {?} event
         * @return {?}
         */
        CalendarTodayComponent.prototype._initEventStatus = /**
         * @private
         * @param {?} event
         * @return {?}
         */
        function (event) {
            /** @type {?} */
            var now = new Date();
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
        };
        CalendarTodayComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'calendar-widget-today',
                        template: "<div #viewToggle class=\"calendar-body\">\n    <div *ngFor=\"let event of events\" #targetEl (click)=\"onViewEvent(event, $event, targetEl)\"\n         class=\"calendar-event\">\n        <div class=\"calendar-event__state\" [ngStyle]=\"event['style']\"></div>\n        <div class=\"calendar-event__content\">\n            <div class=\"calendar-event__title\">\n                {{event.subject}}\n                <div class=\"calendar-event__progress\" [style.color]=\"event['statusColor']\">{{event['statusText']}}</div>\n            </div>\n            <div class=\"calendar-event__text\">\n                <i class=\"fa fa-clock-o calendar-event__icon\"></i>\n                {{event['hourStr']}}\n            </div>\n            <div *ngIf=\"event.location\" class=\"calendar-event__text\">\n                <i class=\"fa fa-map-marker calendar-event__icon\"></i>\n                {{event.location}}\n            </div>\n        </div>\n    </div>\n</div>\n",
                        styles: [".calendar-body{max-height:300px;overflow:hidden auto}.calendar-event{padding:5px 15px;color:#212121;cursor:pointer}.calendar-event:hover{background:rgba(0,0,0,.05)}.calendar-event__state{width:8px;height:8px;border-radius:50%;margin:5px 10px 0 0;float:left}.calendar-event__content{overflow:hidden}.calendar-event__title{line-height:18px;margin-bottom:3px}.calendar-event__progress{font-size:80%;text-transform:uppercase;font-weight:700}.calendar-event__text{font-size:90%;line-height:18px;color:#757575}.calendar-event__icon{width:12px}"]
                    }] }
        ];
        /** @nocollapse */
        CalendarTodayComponent.ctorParameters = function () { return [
            { type: CalendarService }
        ]; };
        CalendarTodayComponent.propDecorators = {
            onChange: [{ type: core.Output }]
        };
        return CalendarTodayComponent;
    }());
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
    var moment$3 = moment_;
    var CalendarComponent = /** @class */ (function () {
        function CalendarComponent(calendarService, route, router, resourceLoader, notify) {
            var _this = this;
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
                    function (date) {
                        /** @type {?} */
                        var str = moment$3(date).format('dddd, D/M/Y');
                        return str.slice(0, 1).toUpperCase() + str.slice(1);
                    }),
                    titleFormat: (/**
                     * @return {?}
                     */
                    function () { return CalendarUtils.displayDate(_this.calendar.getDate()); })
                }),
                new CalendarViewMode('Tuần', CalendarMode.timeGridWeek, {
                    titleFormat: (/**
                     * @return {?}
                     */
                    function () { return CalendarUtils.displayWeek(_this.calendar.getDate()); })
                }),
                new CalendarViewMode('Tháng', CalendarMode.dayGridMonth, {
                    titleFormat: (/**
                     * @return {?}
                     */
                    function () { return CalendarUtils.displayMonth(_this.calendar.getDate()); })
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
                function (arg) { return _this._updateEventTime(arg); }),
                eventResize: (/**
                 * @param {?} arg
                 * @return {?}
                 */
                function (arg) { return _this._updateEventTime(arg); }),
                select: (/**
                 * @param {?} arg
                 * @return {?}
                 */
                function (arg) { return _this._selectRange(arg); }),
                eventClick: (/**
                 * @param {?} arg
                 * @return {?}
                 */
                function (arg) { return _this._viewEvent(arg); }),
                eventDragStart: (/**
                 * @return {?}
                 */
                function () { return _this._hideViewDialog(); }),
                datesRender: (/**
                 * @return {?}
                 */
                function () { return _this._calendarChange(); }),
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
            function (view) {
                if (view.options) {
                    _this.calendarConfig.views[view.value] = view.options;
                }
            }));
            // Use locale
            moment$3.locale(this.calendarConfig.locale.toString());
        }
        /**
         * @return {?}
         */
        CalendarComponent.prototype.ngAfterViewInit = /**
         * @return {?}
         */
        function () {
            this._init();
            this._hideViewDialog();
        };
        /**
         * @return {?}
         */
        CalendarComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.calendar.destroy();
            if (this._routerObserver) {
                this._routerObserver.unsubscribe();
            }
        };
        /**
         * @private
         * @return {?}
         */
        CalendarComponent.prototype._init = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            this.calendar = new core$1.Calendar(this.calendarRef.nativeElement, this.calendarConfig);
            this.calendar.render();
            // Change date view
            this._routerObserver = this.router.events.pipe(operators.filter((/**
             * @param {?} event
             * @return {?}
             */
            function (event) { return event instanceof router.NavigationEnd; })))
                .subscribe((/**
             * @param {?} event
             * @return {?}
             */
            function (event) { return _this._onNavigated(event); }));
        };
        /**
         * @private
         * @param {?} args
         * @return {?}
         */
        CalendarComponent.prototype._updateEventTime = /**
         * @private
         * @param {?} args
         * @return {?}
         */
        function (args) {
            var _this = this;
            /** @type {?} */
            var event;
            if (args.oldEvent) {
                event = this._events[Number(args.oldEvent.id)];
            }
            else {
                event = this._events[Number(args.event.id)];
            }
            if (event.mode !== 1) {
                /** @type {?} */
                var toTime = void 0;
                if (args.event.allDay) {
                    toTime = 23 * 60 + 59;
                }
                else {
                    toTime = args.event.end.getHours() * 60 + args.event.end.getMinutes();
                }
                /** @type {?} */
                var params = {
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
                function (data, err) {
                    if (!data) {
                        _this.notify.showMessage('Cập nhật lịch không thành công: ' + err.status, 'error');
                        args.revert();
                        return;
                    }
                    _this.reloadEvents();
                }));
            }
            else {
                // Can't change event
                args.revert();
            }
        };
        /**
         * @return {?}
         */
        CalendarComponent.prototype.createEvent = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var date = new Date();
            date.setHours(date.getHours() + 1, 0);
            this._createEvent(date, new Date(date.getTime() + 60 * 60 * 1000));
        };
        /**
         * @private
         * @param {?=} forceChange
         * @return {?}
         */
        CalendarComponent.prototype._loadEvents = /**
         * @private
         * @param {?=} forceChange
         * @return {?}
         */
        function (forceChange) {
            var _this = this;
            if (forceChange === void 0) { forceChange = false; }
            this._hideViewDialog();
            clearTimeout(this._eventTimer);
            this._eventTimer = setTimeout((/**
             * @return {?}
             */
            function () {
                _this._loadRangeEvents(forceChange);
            }), 500);
        };
        /**
         * @private
         * @param {?} start
         * @param {?} end
         * @param {?=} allDay
         * @return {?}
         */
        CalendarComponent.prototype._createEvent = /**
         * @private
         * @param {?} start
         * @param {?} end
         * @param {?=} allDay
         * @return {?}
         */
        function (start, end, allDay) {
            if (allDay === void 0) { allDay = false; }
            /** @type {?} */
            var dataBase64 = window.btoa(JSON.stringify({
                start: start.valueOf(),
                end: end.valueOf(),
                attribute: {
                    allday: allDay + ''
                }
            }));
            this.router.navigate(['/calendar/create', dataBase64]);
            this._hideViewDialog();
        };
        /**
         * @private
         * @param {?} info
         * @return {?}
         */
        CalendarComponent.prototype._selectRange = /**
         * @private
         * @param {?} info
         * @return {?}
         */
        function (info) {
            this._createEvent(info.start, info.end, info.start.getTime() === (info.end.getTime() - 24 * 60 * 60 * 1000));
        };
        /**
         * @private
         * @return {?}
         */
        CalendarComponent.prototype._calendarChange = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            if (this.calendar.view.type === CalendarMode.dayGridDay) {
                this.calendar.changeView(CalendarMode.timeGridDay);
                // Trigger change
                setTimeout((/**
                 * @return {?}
                 */
                function () { return _this._calendarChange(); }));
                return;
            }
            setTimeout((/**
             * @return {?}
             */
            function () {
                _this._updateInfo();
                _this._loadEvents();
            }));
        };
        /**
         * @private
         * @return {?}
         */
        CalendarComponent.prototype._updateInfo = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            this.viewTitle = this.calendar.view.title;
            this.viewTypes.forEach((/**
             * @param {?} view
             * @return {?}
             */
            function (view) { return view.active = view.value === _this.calendar.view.type; }));
            this._checkIsToday();
            this._updateViewParams();
        };
        /**
         * @private
         * @return {?}
         */
        CalendarComponent.prototype._checkIsToday = /**
         * @private
         * @return {?}
         */
        function () {
            /** @type {?} */
            var range = {
                start: this.calendar.view.activeStart,
                end: this.calendar.view.activeEnd,
            };
            this.isToday = this._dateInRange(new Date(), range);
        };
        /**
         * @private
         * @param {?=} forceChange
         * @return {?}
         */
        CalendarComponent.prototype._loadRangeEvents = /**
         * @private
         * @param {?=} forceChange
         * @return {?}
         */
        function (forceChange) {
            var _this = this;
            if (forceChange || this._outOfRange()) {
                this._currentRange = this._getRange();
                this.calendarService.loadEvents(xCalendar.getRangeParams(this._currentRange.start, this._currentRange.end), (/**
                 * @param {?} events
                 * @return {?}
                 */
                function (events) { return _this._renderEvents(events || []); }));
                this.calendar.removeAllEventSources();
            }
        };
        // Range view default is 6 week
        // Range view default is 6 week
        /**
         * @private
         * @return {?}
         */
        CalendarComponent.prototype._getRange = 
        // Range view default is 6 week
        /**
         * @private
         * @return {?}
         */
        function () {
            /** @type {?} */
            var start = new Date(this.calendar.getDate());
            /** @type {?} */
            var end;
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
        };
        /**
         * @private
         * @return {?}
         */
        CalendarComponent.prototype._outOfRange = /**
         * @private
         * @return {?}
         */
        function () {
            if (!this._currentRange) {
                return true;
            }
            return !(this._dateInRange(this.calendar.view.currentStart) && this._dateInRange(this.calendar.view.currentEnd));
        };
        /**
         * @private
         * @param {?} date
         * @param {?=} range
         * @return {?}
         */
        CalendarComponent.prototype._dateInRange = /**
         * @private
         * @param {?} date
         * @param {?=} range
         * @return {?}
         */
        function (date, range) {
            range = range || this._currentRange;
            return date >= range.start && date <= range.end;
        };
        /**
         * @private
         * @param {?} events
         * @return {?}
         */
        CalendarComponent.prototype._renderEvents = /**
         * @private
         * @param {?} events
         * @return {?}
         */
        function (events) {
            this._events = events;
            /** @type {?} */
            var eventInputs = events.map((/**
             * @param {?} event
             * @param {?} index
             * @return {?}
             */
            function (event, index) {
                /** @type {?} */
                var eventInput = {
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
        };
        /**
         * @private
         * @param {?} args
         * @return {?}
         */
        CalendarComponent.prototype._viewEvent = /**
         * @private
         * @param {?} args
         * @return {?}
         */
        function (args) {
            var _this = this;
            /** @type {?} */
            var event = this._events[Number(args.event.id)];
            this.calendarService.viewEvent(event, args.jsEvent, args.jsEvent.currentTarget, (/**
             * @return {?}
             */
            function () { return _this.reloadEvents(); }));
        };
        /**
         * @private
         * @param {?} events
         * @return {?}
         */
        CalendarComponent.prototype._addEventSource = /**
         * @private
         * @param {?} events
         * @return {?}
         */
        function (events) {
            this.calendar.addEventSource({
                events: events
            });
        };
        /**
         * @private
         * @param {?} event
         * @return {?}
         */
        CalendarComponent.prototype._onNavigated = /**
         * @private
         * @param {?} event
         * @return {?}
         */
        function (event) {
            /** @type {?} */
            var viewData = this._getDataView();
            this.calendar.changeView(viewData.defaultView, viewData.defaultDate);
        };
        /**
         * @param {?} type
         * @return {?}
         */
        CalendarComponent.prototype.changeView = /**
         * @param {?} type
         * @return {?}
         */
        function (type) {
            this.calendar.changeView(type.value);
        };
        /**
         * @return {?}
         */
        CalendarComponent.prototype.onPrev = /**
         * @return {?}
         */
        function () {
            this.calendar.prev();
        };
        /**
         * @return {?}
         */
        CalendarComponent.prototype.onNext = /**
         * @return {?}
         */
        function () {
            this.calendar.next();
        };
        /**
         * @return {?}
         */
        CalendarComponent.prototype.onToday = /**
         * @return {?}
         */
        function () {
            this.calendar.changeView(CalendarMode.timeGridDay, new Date());
        };
        /**
         * @private
         * @param {?} mode
         * @return {?}
         */
        CalendarComponent.prototype._getCalendarMode = /**
         * @private
         * @param {?} mode
         * @return {?}
         */
        function (mode) {
            for (var i = 0; i < this.viewTypes.length; i++) {
                if (this.viewTypes[i].value === mode) {
                    return this.viewTypes[i];
                }
            }
        };
        /**
         * @private
         * @return {?}
         */
        CalendarComponent.prototype._updateViewParams = /**
         * @private
         * @return {?}
         */
        function () {
            /** @type {?} */
            var params = [
                this.calendar.view.type,
                moment$3(this.calendar.getDate()).format('YYYY-M-D')
            ];
            this.router.navigate(['/calendar/v/' + params.join('/')]);
        };
        /**
         * @private
         * @return {?}
         */
        CalendarComponent.prototype._getDataView = /**
         * @private
         * @return {?}
         */
        function () {
            /** @type {?} */
            var segments = this.route.snapshot.url;
            /** @type {?} */
            var modeView = this._cacheModeView();
            /** @type {?} */
            var date;
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
        };
        /**
         * @private
         * @param {?=} modeView
         * @return {?}
         */
        CalendarComponent.prototype._cacheModeView = /**
         * @private
         * @param {?=} modeView
         * @return {?}
         */
        function (modeView) {
            if (modeView === undefined) {
                return localStorage.getItem(this._modeCache);
            }
            else {
                localStorage.setItem(this._modeCache, modeView);
            }
        };
        /**
         * @return {?}
         */
        CalendarComponent.prototype.reloadEvents = /**
         * @return {?}
         */
        function () {
            this._hideViewDialog();
            this._loadEvents(true);
            this.calendarWidget.loadTodayEvents();
        };
        /**
         * @private
         * @return {?}
         */
        CalendarComponent.prototype._hideViewDialog = /**
         * @private
         * @return {?}
         */
        function () {
            this.calendarService.hideViewModal();
        };
        CalendarComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'inet-calendar',
                        template: "<div class=\"calendar-app\">\n    <div class=\"calendar-app__nav p-3\">\n        <div class=\"d-flex align-items-center\">\n            <div class=\"flex-grow-1\" style=\"font-size: 16px;font-weight: 500;line-height: 18px\">{{viewTitle}}</div>\n            <div class=\"btn-group\" role=\"group\">\n                <button (click)=\"onPrev()\" type=\"button\" class=\"btn btn-light\"><i class=\"fa fa-chevron-left\"></i></button>\n                <button (click)=\"onNext()\" type=\"button\" class=\"btn btn-light\"><i class=\"fa fa-chevron-right\"></i></button>\n            </div>\n        </div>\n        <div class=\"btn-group d-flex mt-3\" role=\"group\">\n            <button *ngFor=\"let type of viewTypes\" (click)=\"changeView(type)\"\n                    [ngClass]=\"{'btn-light': !type.active}\" type=\"button\" class=\"btn btn-primary flex-grow-1\">\n                {{type.name}}\n            </button>\n        </div>\n        <button (click)=\"onToday()\" [ngClass]=\"{'btn-light': !isToday}\" type=\"button\" class=\"btn btn-primary w-100 mt-3\">H\u00F4m nay</button>\n        <button (click)=\"createEvent()\" type=\"button\" class=\"btn btn-primary w-100 mt-3\">T\u1EA1o s\u1EF1 ki\u1EC7n</button>\n        <!-- <div (click)=\"createEvent()\" class=\"calendar-add-btn mt-3 pt-2 pb-2 text-primary\">\n            <i class=\"fa fa-plus mr-1\"></i> Th\u00EAm s\u1EF1 ki\u1EC7n\n        </div> -->\n        <div class=\"mt-3\" style=\"margin-left: -15px;margin-right: -15px;\">\n            <div class=\"ml-3 mr-3 pb-1 mb-1\" style=\"border-bottom: 2px solid #007bff;font-weight: bold;\">S\u1EF1 ki\u1EC7n h\u00F4m nay</div>\n            <calendar-widget-today (onChange)=\"reloadEvents()\"></calendar-widget-today>\n        </div>\n    </div>\n    <div class=\"calendar-app__body pr-1\">\n        <div #calendarRef></div>\n    </div>\n</div>\n",
                        styles: [".calendar-app{width:100%;height:calc(100vh - 60px);background:#fff;padding:0}.calendar-app__nav{height:100%;float:left;width:300px}.calendar-app__body{height:100%;overflow:hidden;background:rgba(0,0,0,.01)}.calendar-add-btn{cursor:pointer;font-weight:700}.calendar-add-btn:hover{opacity:.8}"]
                    }] }
        ];
        /** @nocollapse */
        CalendarComponent.ctorParameters = function () { return [
            { type: CalendarService },
            { type: router.ActivatedRoute },
            { type: router.Router },
            { type: inetCore.ResourceLoaderService },
            { type: inetCore.NotificationService }
        ]; };
        CalendarComponent.propDecorators = {
            calendarRef: [{ type: core.ViewChild, args: ['calendarRef',] }],
            calendarWidget: [{ type: core.ViewChild, args: [CalendarTodayComponent,] }]
        };
        return CalendarComponent;
    }());
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
    var CalendarViewMode = /** @class */ (function () {
        function CalendarViewMode(name, value, options) {
            this.active = false;
            this.name = name;
            this.value = value;
            this.options = options;
        }
        return CalendarViewMode;
    }());
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
    var CalendarMode = {
        dayGridDay: 'dayGridDay',
        timeGridDay: 'timeGridDay',
        timeGridWeek: 'timeGridWeek',
        dayGridMonth: 'dayGridMonth',
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var CalendarDialogRepeatComponent = /** @class */ (function () {
        function CalendarDialogRepeatComponent(calendarService) {
            this.calendarService = calendarService;
            this.onRepeat = new core.EventEmitter();
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
            { type: core.Component, args: [{
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
            onRepeat: [{ type: core.Output }],
            repeatModal: [{ type: core.ViewChild, args: ['repeatModal',] }],
            repeatStart: [{ type: core.ViewChild, args: ['repeatStart',] }],
            repeatUntil: [{ type: core.ViewChild, args: ['repeatUntil',] }]
        };
        return CalendarDialogRepeatComponent;
    }());
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
    var FileListComponent = /** @class */ (function () {
        function FileListComponent() {
            this.files = [];
            this.removable = true;
            this.onClick = new core.EventEmitter();
            this.onRemove = new core.EventEmitter();
        }
        /**
         * @return {?}
         */
        FileListComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            this._initFileEl();
        };
        /**
         * @param {?} file
         * @param {?} event
         * @return {?}
         */
        FileListComponent.prototype.clickFile = /**
         * @param {?} file
         * @param {?} event
         * @return {?}
         */
        function (file, event) {
            this.onClick.emit({ file: file, event: event });
        };
        /**
         * @param {?} file
         * @return {?}
         */
        FileListComponent.prototype.removeFile = /**
         * @param {?} file
         * @return {?}
         */
        function (file) {
            /** @type {?} */
            var index = this.files.indexOf(file);
            if (index > -1) {
                this.files.splice(index, 1);
                this.onRemove.emit(file);
            }
        };
        /**
         * @param {?} files
         * @return {?}
         */
        FileListComponent.prototype.addFiles = /**
         * @param {?} files
         * @return {?}
         */
        function (files) {
            // Read as base64 if image
            for (var i = 0; i < files.length; i++) {
                /** @type {?} */
                var file = files[i];
                if (this._fileIsImage(file)) {
                    file['image'] = true;
                    this._readImageBase64(file);
                }
                this.files.push(file);
            }
        };
        /**
         * @private
         * @return {?}
         */
        FileListComponent.prototype._initFileEl = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            if (this.fileEl) {
                this.fileEl.addEventListener('change', (/**
                 * @param {?} e
                 * @return {?}
                 */
                function (e) {
                    /** @type {?} */
                    var files = _this.fileEl.files;
                    if (files.length > 0) {
                        // Read as base64 if image
                        _this.addFiles(files);
                        // Reset file
                        _this.fileEl.value = '';
                    }
                }));
            }
        };
        /**
         * @private
         * @param {?} file
         * @return {?}
         */
        FileListComponent.prototype._readImageBase64 = /**
         * @private
         * @param {?} file
         * @return {?}
         */
        function (file) {
            /** @type {?} */
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (/**
             * @return {?}
             */
            function () {
                file.url = reader.result;
            });
        };
        /**
         * @private
         * @param {?} file
         * @return {?}
         */
        FileListComponent.prototype._fileIsImage = /**
         * @private
         * @param {?} file
         * @return {?}
         */
        function (file) {
            return file.type && file.type.indexOf('image') > -1;
        };
        FileListComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'file-list',
                        template: "<ng-container *ngFor=\"let file of files\">\n    <ng-template *ngTemplateOutlet=\"template ? template : fileItem; context: {file: file}\">\n    </ng-template>\n</ng-container>\n<ng-template #fileItem let-file=\"file\">\n    <div class=\"file-item\" [title]=\"file.name\" (click)=\"clickFile(file, $event)\">\n        <img *ngIf=\"file.image; else icon\" [src]=\"file.url\" class=\"file-item__image\">\n        <ng-template #icon>\n            <img [src]=\"file.name | fileIcon\" class=\"file-item__image_type\">\n            <div class=\"file-item__name\">{{file.name}}</div>\n        </ng-template>\n        <i *ngIf=\"removable\" (click)=\"removeFile(file)\" class=\"fa fa-times file-item__remove\"></i>\n    </div>\n</ng-template>",
                        styles: [":host{display:block}.file-item{display:inline-block;text-align:center;width:80px;height:80px;border-radius:2px;position:relative;margin-right:5px;margin-bottom:5px;border:1px solid #ddd;overflow:hidden;padding:0 5px;cursor:pointer;background:#fff}.file-item__image{max-width:100%;position:absolute;left:50%;top:50%;transform:translate3d(-50%,-50%,0)}.file-item__image_type{max-width:20px;max-height:20px;margin-bottom:5px;margin-top:10px}.file-item__name{font-size:12px;line-height:13px;max-height:40px;overflow:hidden}.file-item__remove{position:absolute;right:3px;top:3px;cursor:pointer;width:24px;height:24px;line-height:24px;border-radius:50%;background:rgba(0,0,0,.2);color:#fff;text-align:center;font-size:12px}.file-item__remove:hover{background:rgba(0,0,0,.5)}"]
                    }] }
        ];
        FileListComponent.propDecorators = {
            fileEl: [{ type: core.Input }],
            files: [{ type: core.Input }],
            removable: [{ type: core.Input }],
            template: [{ type: core.Input }],
            onClick: [{ type: core.Output }],
            onRemove: [{ type: core.Output }]
        };
        return FileListComponent;
    }());
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
    var AttachmentListComponent = /** @class */ (function () {
        function AttachmentListComponent(calendarService, modalService) {
            this.calendarService = calendarService;
            this.modalService = modalService;
            this.files = [];
        }
        /**
         * @param {?} changes
         * @return {?}
         */
        AttachmentListComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            if (changes.calEvent) {
                this._attachmentToFiles();
            }
        };
        /**
         * @return {?}
         */
        AttachmentListComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            if (this.modalRef) {
                this.modalRef.hide();
            }
        };
        /**
         * @param {?} file
         * @param {?} event
         * @return {?}
         */
        AttachmentListComponent.prototype.viewAttachment = /**
         * @param {?} file
         * @param {?} event
         * @return {?}
         */
        function (file, event) {
            window.open(xCalendar.getFileViewUrl(file.data, null, event));
        };
        /**
         * @param {?} file
         * @param {?} template
         * @return {?}
         */
        AttachmentListComponent.prototype.removeAttachment = /**
         * @param {?} file
         * @param {?} template
         * @return {?}
         */
        function (file, template) {
            if (file.id) {
                this._file = file;
                this.confirmMessage = 'Tệp tin <b>"' + file.name + '"</b> sẽ bị xoá?';
                this.modalRef = this.modalService.show(template);
            }
            else {
                this.fileList.removeFile(file);
            }
        };
        /**
         * @return {?}
         */
        AttachmentListComponent.prototype.removeFile = /**
         * @return {?}
         */
        function () {
            if (!this._file) {
                return;
            }
            this.modalRef.hide();
            this.calendarService.deleteAttachment({ fileID: this._file.id, element: this.calEvent.uuid }, (/**
             * @return {?}
             */
            function () { }));
            this.fileList.removeFile(this._file);
            this._file = null;
        };
        /**
         * @private
         * @return {?}
         */
        AttachmentListComponent.prototype._attachmentToFiles = /**
         * @private
         * @return {?}
         */
        function () {
            if (this.calEvent && this.calEvent.attachments) {
                this.files = this.calEvent.attachments.map((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) {
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
        };
        AttachmentListComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'calendar-attachment-list',
                        template: "<file-list [template]=\"fileItem\" [files]=\"files\" [fileEl]=\"fileEl\" [removable]=\"removable\"></file-list>\n<ng-template #fileItem let-file=\"file\">\n    <div class=\"file-item\" [title]=\"file.name\">\n        <img [src]=\"file.name | fileIcon\" class=\"file-item__image\">\n        <div class=\"file-item__name text-primary\" (click)=\"viewAttachment(file, $event)\">{{file.name}}</div>\n        <i *ngIf=\"removable\" (click)=\"removeAttachment(file, template)\"\n           class=\"fa fa-trash file-item__remove text-danger\"></i>\n    </div>\n</ng-template>\n<ng-template #template>\n    <div class=\"modal-header\">\n        <h4 class=\"modal-title pull-left\">Th\u00F4ng b\u00E1o</h4>\n        <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"modalRef.hide()\">\n            <span aria-hidden=\"true\">&times;</span>\n        </button>\n    </div>\n    <div class=\"modal-body\" [innerHTML]=\"confirmMessage\"></div>\n    <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-danger\" (click)=\"removeFile()\">X\u00F3a</button>\n        <button type=\"button\" class=\"btn btn-secondary\" (click)=\"modalRef.hide()\">\u0110\u00F3ng</button>\n    </div>\n</ng-template>",
                        styles: [".file-item{height:24px;line-height:24px;overflow:hidden;font-size:13px;cursor:pointer;margin-bottom:5px}.file-item__image{float:left;width:24px;height:24px;margin-right:10px}.file-item__name{float:left;max-width:80%;white-space:nowrap;overflow:hidden}.file-item__remove{width:24px;height:24px;line-height:24px;text-align:center}"]
                    }] }
        ];
        /** @nocollapse */
        AttachmentListComponent.ctorParameters = function () { return [
            { type: CalendarService },
            { type: ngxBootstrap.BsModalService }
        ]; };
        AttachmentListComponent.propDecorators = {
            calEvent: [{ type: core.Input }],
            fileEl: [{ type: core.Input }],
            removable: [{ type: core.Input }],
            fileList: [{ type: core.ViewChild, args: [FileListComponent,] }]
        };
        return AttachmentListComponent;
    }());
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
    var moment$4 = moment_;
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
            this.attendeeSearch = new rxjs.Observable((/**
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
            })).pipe(operators.debounceTime(200), operators.distinctUntilChanged());
            this.locationSearch = new rxjs.Observable((/**
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
            })).pipe(operators.debounceTime(200), operators.distinctUntilChanged());
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
            var date = moment$4(data.date);
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
            { type: core.Component, args: [{
                        selector: 'app-calendar-form',
                        template: "<div class=\"admin-layout\">\n    <div class=\"container-fluid nav-fixed-top cp-toolbar\">\n        <button (click)=\"goBack()\" class=\"btn btn-sm btn-primary mr-1 ng-star-inserted\" data-toggle=\"tooltip\" type=\"button\" title=\"Tr\u1EDF v\u1EC1\">\n            <i class=\"fa fa-arrow-left\"></i>\n        </button>\n        <button *ngIf=\"event.isCreator || !event.uuid\" (click)=\"createEvent()\" class=\"btn btn-sm btn-primary ng-star-inserted mr-1\" data-toggle=\"tooltip\" type=\"button\" title=\"L\u01B0u s\u1EF1 ki\u1EC7n\">\n            <i class=\"fa fa-save\"></i>\n        </button>\n        <button *ngIf=\"event.isCreator\" (click)=\"onRemoveEvent($event)\" class=\"btn btn-sm btn-danger ng-star-inserted\" data-toggle=\"tooltip\" type=\"button\" title=\"X\u00F3a s\u1EF1 ki\u1EC7n\">\n            <i class=\"fa fa-trash\"></i>\n        </button>\n    </div>\n    <div class=\"cp-content p-3\">\n        <div class=\"card\" *ngIf=\"eventNotFound\">\n            <div class=\"card-body text-center\">\n                Kh\u00F4ng t\u00ECm th\u1EA5y l\u1ECBch\n            </div>\n        </div>\n        <div [ngClass]=\"{'hide': eventNotFound}\" class=\"row\">\n                <div class=\"col-md-6\">\n                    <div class=\"form-group\">\n                        <label class=\"font-weight-bold\">Ti\u00EAu \u0111\u1EC1 (<span class=\"text-danger\">*</span>):</label>\n                        <input #titleInput type=\"text\" class=\"form-control\"\n                               [(ngModel)]=\"formData.title\"\n                               [ngClass]=\"{'is-invalid': titleInput.value.trim().length === 0}\">\n                    </div>\n                    <div class=\"form-group row\">\n                        <div class=\"col-6\" style=\"padding-right:5px\">\n                            <label class=\"font-weight-bold\">Ng\u00E0y s\u1EF1 ki\u1EC7n (<span class=\"text-danger\">*</span>):</label>\n                            <input type=\"text\" class=\"form-control\"\n                                   [(ngModel)]=\"formData.date\"\n                                   [ngClass]=\"{'is-invalid': formData.date.length === 0}\"\n                                   #dp=\"bsDatepicker\"\n                                   bsDatepicker\n                                   [bsConfig]=\"{dateInputFormat: 'DD/MM/YYYY'}\">\n                        </div>\n                        <div *ngIf=\"!allDay.checked\" class=\"col-3\" style=\"padding-right:5px;padding-left:5px\">\n                            <label class=\"font-weight-bold\">T\u1EEB gi\u1EDD (<span class=\"text-danger\">*</span>):</label>\n                            <input type=\"text\" class=\"form-control\"\n                                   [(ngModel)]=\"formData.startTime\"\n                                   [ngClass]=\"{'is-invalid': (timeError || formData.startTime.length === 0)}\"\n                                   timePicker\n                                   [timePickerModal]=\"timeStartModal\">\n                            <time-picker-modal #timeStartModal></time-picker-modal>\n                        </div>\n                        <div *ngIf=\"!allDay.checked\" class=\"col-3\" style=\"padding-left:5px\">\n                            <label class=\"font-weight-bold\">\u0110\u1EBFn gi\u1EDD (<span class=\"text-danger\">*</span>):</label>\n                            <input type=\"text\" class=\"form-control\"\n                                   [(ngModel)]=\"formData.toTime\"\n                                   [ngClass]=\"{'is-invalid': (timeError || formData.toTime.length === 0)}\"\n                                   timePicker\n                                   [timePickerModal]=\"timeEndModal\">\n                            <time-picker-modal #timeEndModal></time-picker-modal>\n                        </div>\n                    </div>\n                    <div class=\"form-group form-check\">\n                        <input #allDay [(ngModel)]=\"formData._allday\" type=\"checkbox\" id=\"_allday\" class=\"form-check-input\" value=\"true\"/>\n                        <label class=\"form-check-label font-weight-bold\" for=\"_allday\">C\u1EA3 ng\u00E0y</label>\n                    </div>\n                    <div class=\"form-group form-check\">\n                        <input (click)=\"openRepeat(repeat.checked)\"\n                               #repeat\n                               [(ngModel)]=\"formData.repeat\"\n                               class=\"form-check-input\"\n                               id=\"repeat\" type=\"checkbox\" value=\"true\"/>\n                        <label class=\"form-check-label font-weight-bold\" for=\"repeat\">L\u1EB7p l\u1ECBch</label>\n                        <span *ngIf=\"repeatText\">\n                            <b>:</b> {{repeatText}}\n                            <i (click)=\"onEditRepeat($event)\" class=\"fa fa-pencil\" style=\"padding: 5px;margin: -5px 0;cursor: pointer;\" title=\"Ch\u1EC9nh s\u1EEDa\"></i>\n                        </span>\n                    </div>\n                    <div class=\"form-group\">\n                        <button (click)=\"fileAttachment.click()\" title=\"T\u1EADp tin \u0111\u00EDnh k\u00E8m\" type=\"button\" class=\"btn btn-primary btn-sm rounded\">\n                            <i class=\"fa fa-cloud-upload pr-1\" aria-hidden=\"true\"></i>\n                            <span>\u0110\u00EDnh k\u00E8m</span>\n                            <input #fileAttachment type=\"file\" multiple style=\"display:none\">\n                        </button>\n                        <div style=\"margin-top: 10px\">\n                            <calendar-attachment-list\n                                    [calEvent]=\"event\"\n                                    [removable]=\"true\"\n                                    [fileEl]=\"fileAttachment\"></calendar-attachment-list>\n                        </div>\n                    </div>\n                    <div class=\"form-group\">\n                        <label class=\"font-weight-bold\">\u0110\u1ECBa \u0111i\u1EC3m:</label>\n                        <input type=\"text\" class=\"form-control\"\n                               [(ngModel)]=\"formData.location\"\n                               [typeahead]=\"locationSearch\">\n                    </div>\n                    <div class=\"form-group\">\n                        <label class=\"font-weight-bold\">M\u00F4 t\u1EA3:</label>\n                        <textarea (keydown.enter)=\"$event.stopPropagation()\" type=\"text\" class=\"form-control\"\n                                  [(ngModel)]=\"formData.summary\"></textarea>\n                    </div>\n                </div>\n                <div class=\"col-md-6\">\n                    <div [hidden]=\"!event.myAttendee\" class=\"form-group\">\n                        <label class=\"font-weight-bold\">B\u1EA1n c\u00F3 tham d\u1EF1 kh\u00F4ng?</label>\n                        <div class=\"input-group\">\n                            <select [(ngModel)]=\"formData.state\" class=\"attendee-select form-control\" style=\"margin-right:-3px\">\n                                <option value=\"ACCEPTED\">C\u00F3</option>\n                                <option value=\"DECLINED\">Kh\u00F4ng</option>\n                                <option value=\"NEEDS_ACTION\">C\u00F3 th\u1EC3</option>\n                            </select>\n                            <input [(ngModel)]=\"formData.notes\" type=\"text\" class=\"form-control\" placeholder=\"Ghi ch\u00FA\">\n                        </div>\n                    </div>\n                    <div class=\"form-group\">\n                        <label class=\"font-weight-bold\">Th\u00E0nh ph\u1EA7n: </label>\n                        <ng-template #attendeeTemplate let-attendee=\"item\">\n                            <div class=\"attendee-item\">\n                                <img userAvatar [usercode]=\"attendee.username\">\n                                <div>{{attendee.fullname}}</div>\n                            </div>\n                        </ng-template>\n                        <input type=\"text\" class=\"form-control\"\n                               #attendeeInput\n                               [(ngModel)]=\"attendeeModal\"\n                               [typeahead]=\"attendeeSearch\"\n                               [typeaheadItemTemplate]=\"attendeeTemplate\"\n                               (typeaheadOnSelect)=\"addAttendee($event)\"/>\n                    </div>\n                    <div class=\"form-group\">\n                        <calendar-attendee-list [attendees]=\"attendees\" [editable]=\"true\"></calendar-attendee-list>\n                    </div>\n                </div>\n            </div>\n    </div>\n    <calendar-repeat-modal #repeatModal (onRepeat)=\"setRepeatData($event)\"></calendar-repeat-modal>\n</div>\n<calendar-dialog-delete #dialogRemove [calEvent]=\"event\" (onDelete)=\"goBack()\" hidden></calendar-dialog-delete>\n",
                        styles: [".attendee-select{background:#e9ecef;width:90px;padding-right:5px;padding-left:5px;flex:none}.attendee-list-container{overflow:auto;max-height:200px;box-shadow:rgba(0,0,0,.14) 0 8px 10px 1px,rgba(0,0,0,.12) 0 3px 14px 2px,rgba(0,0,0,.2) 0 5px 5px -3px;border-radius:4px;margin-top:5px}.form-check-input{opacity:1!important;margin-top:1px}.attendee-item{display:flex;margin:0 -10px;align-items:center}.attendee-item>img{width:30px;height:30px;border-radius:50%;margin-right:10px}"]
                    }] }
        ];
        /** @nocollapse */
        CalendarFormComponent.ctorParameters = function () { return [
            { type: router.ActivatedRoute },
            { type: CalendarService },
            { type: inetCore.NotificationService },
            { type: router.Router },
            { type: inetCore.HttpClientService }
        ]; };
        CalendarFormComponent.propDecorators = {
            repeatModal: [{ type: core.ViewChild, args: ['repeatModal',] }],
            viewDeleteModal: [{ type: core.ViewChild, args: ['dialogRemove',] }],
            titleInput: [{ type: core.ViewChild, args: ['titleInput',] }],
            attendeeInput: [{ type: core.ViewChild, args: ['attendeeInput',] }],
            fileList: [{ type: core.ViewChild, args: [AttachmentListComponent,] }]
        };
        return CalendarFormComponent;
    }());
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
    var moment$5 = moment_;
    var CalendarViewerComponent = /** @class */ (function () {
        function CalendarViewerComponent() {
            this.dateFormat = 'MMMM/YYYY';
            this.locale = 'vi';
            this.firstDay = 1;
            this.limitEvent = 3;
            this.view = CalendarViewerMode.MONTH;
            this.onChange = new core.EventEmitter();
            this.onActive = new core.EventEmitter();
            this.dates = [];
            this.weekDates = [];
        }
        Object.defineProperty(CalendarViewerComponent.prototype, "date", {
            get: /**
             * @return {?}
             */
            function () {
                return new Date(this._date);
            },
            set: /**
             * @param {?} date
             * @return {?}
             */
            function (date) {
                /** @type {?} */
                var _date;
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
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        CalendarViewerComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            if (!this._date) {
                this.date = new Date();
            }
        };
        /**
         * @param {?} events
         * @param {?} date
         * @return {?}
         */
        CalendarViewerComponent.prototype.setEvents = /**
         * @param {?} events
         * @param {?} date
         * @return {?}
         */
        function (events, date) {
            /** @type {?} */
            var dateViewer = this._getDateViewer(date);
            if (dateViewer) {
                dateViewer.events = events;
            }
        };
        /**
         * @return {?}
         */
        CalendarViewerComponent.prototype.clearEvents = /**
         * @return {?}
         */
        function () {
            this.dates.forEach((/**
             * @param {?} dateViewer
             * @return {?}
             */
            function (dateViewer) { return dateViewer.events = null; }));
        };
        /**
         * @return {?}
         */
        CalendarViewerComponent.prototype.toDay = /**
         * @return {?}
         */
        function () {
            this.date = new Date();
        };
        /**
         * @return {?}
         */
        CalendarViewerComponent.prototype.prev = /**
         * @return {?}
         */
        function () {
            if (this.view === CalendarViewerMode.MONTH) {
                this._prevMonth();
            }
            else {
                this._prevWeek();
            }
            this._render();
        };
        /**
         * @return {?}
         */
        CalendarViewerComponent.prototype.next = /**
         * @return {?}
         */
        function () {
            if (this.view === CalendarViewerMode.MONTH) {
                this._nextMonth();
            }
            else {
                this._nextWeek();
            }
            this._render();
        };
        /**
         * @param {?} dateViewer
         * @return {?}
         */
        CalendarViewerComponent.prototype.activeDate = /**
         * @param {?} dateViewer
         * @return {?}
         */
        function (dateViewer) {
            this.dateActive = dateViewer;
            // Move to target month
            if (dateViewer.outOfRange) {
                this.date = dateViewer.date;
            }
            this.onActive.emit(dateViewer);
        };
        /**
         * @param {?} date
         * @return {?}
         */
        CalendarViewerComponent.prototype.focusDate = /**
         * @param {?} date
         * @return {?}
         */
        function (date) {
            /** @type {?} */
            var dateViewer = this._getDateViewer(date);
            if (dateViewer) {
                this.activeDate(dateViewer);
            }
        };
        /**
         * @private
         * @return {?}
         */
        CalendarViewerComponent.prototype._nextMonth = /**
         * @private
         * @return {?}
         */
        function () {
            this._date.setMonth(this._date.getMonth() + 1);
        };
        /**
         * @private
         * @return {?}
         */
        CalendarViewerComponent.prototype._prevMonth = /**
         * @private
         * @return {?}
         */
        function () {
            this._date.setMonth(this._date.getMonth() - 1);
        };
        /**
         * @private
         * @return {?}
         */
        CalendarViewerComponent.prototype._nextWeek = /**
         * @private
         * @return {?}
         */
        function () {
            this._date.setDate(this._date.getDate() + 7);
        };
        /**
         * @private
         * @return {?}
         */
        CalendarViewerComponent.prototype._prevWeek = /**
         * @private
         * @return {?}
         */
        function () {
            this._date.setDate(this._date.getDate() - 7);
        };
        /**
         * @private
         * @return {?}
         */
        CalendarViewerComponent.prototype._render = /**
         * @private
         * @return {?}
         */
        function () {
            if (this.view === CalendarViewerMode.MONTH) {
                this._renderMonth();
            }
            else {
                this._renderWeek();
            }
            this.onChange.emit(this.date);
        };
        /**
         * @private
         * @return {?}
         */
        CalendarViewerComponent.prototype._renderMonth = /**
         * @private
         * @return {?}
         */
        function () {
            /** @type {?} */
            var date = this._getDateStartWeek();
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
        };
        /**
         * @private
         * @return {?}
         */
        CalendarViewerComponent.prototype._renderWeek = /**
         * @private
         * @return {?}
         */
        function () {
            /** @type {?} */
            var date = this._getDateStartWeek();
            this.dates = [];
            this.weekDates = [this._createWeekDate(date)];
            this.weekDates[0].forEach((/**
             * @param {?} date
             * @return {?}
             */
            function (date) { return date.outOfRange = false; }));
            this._renderTitle();
            this._renderWeekTitle(this.weekDates[0]);
        };
        /**
         * @private
         * @param {?} date
         * @return {?}
         */
        CalendarViewerComponent.prototype._createWeekDate = /**
         * @private
         * @param {?} date
         * @return {?}
         */
        function (date) {
            /** @type {?} */
            var weekDates = [];
            for (var i = 0; i < 7; i++) {
                /** @type {?} */
                var dateViewer = {
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
        };
        /**
         * @private
         * @param {?} weekDates
         * @return {?}
         */
        CalendarViewerComponent.prototype._renderWeekTitle = /**
         * @private
         * @param {?} weekDates
         * @return {?}
         */
        function (weekDates) {
            var _this = this;
            this.weekTitles = [];
            weekDates.forEach((/**
             * @param {?} viewerDate
             * @return {?}
             */
            function (viewerDate) {
                _this.weekTitles.push(moment$5(viewerDate.date).locale(_this.locale).format('dd'));
            }));
        };
        /**
         * @private
         * @return {?}
         */
        CalendarViewerComponent.prototype._renderTitle = /**
         * @private
         * @return {?}
         */
        function () {
            this.dateTitle = moment$5(this._date).locale(this.locale).format(this.dateFormat);
        };
        /**
         * @private
         * @return {?}
         */
        CalendarViewerComponent.prototype._getDateStartWeek = /**
         * @private
         * @return {?}
         */
        function () {
            /** @type {?} */
            var date = new Date(this._date);
            /** @type {?} */
            var startWeekFromNow = date.getDay() - this.firstDay;
            if (date.getDay() < this.firstDay) {
                startWeekFromNow += 7;
            }
            // Set date start week
            date.setDate(date.getDate() - startWeekFromNow);
            return date;
        };
        /**
         * @private
         * @param {?} date
         * @return {?}
         */
        CalendarViewerComponent.prototype._isToday = /**
         * @private
         * @param {?} date
         * @return {?}
         */
        function (date) {
            /** @type {?} */
            var now = new Date();
            return now.getDate() === date.getDate() && now.getMonth() === date.getMonth() && now.getFullYear() === date.getFullYear();
        };
        /**
         * @private
         * @param {?} date
         * @return {?}
         */
        CalendarViewerComponent.prototype._getDateViewer = /**
         * @private
         * @param {?} date
         * @return {?}
         */
        function (date) {
            /** @type {?} */
            var _date = new Date(date);
            _date.setHours(0, 0, 0, 0);
            for (var i = 0; i < this.dates.length; i++) {
                if (this.dates[i].time === _date.getTime()) {
                    return this.dates[i];
                }
            }
        };
        CalendarViewerComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'calendar-viewer',
                        template: "<div class=\"calendar-viewer\">\n\n  <div role=\"row\" class=\"calendar-viewer__head\">\n    <i (click)=\"next()\" class=\"calendar-viewer__button fa fa-chevron-right\"></i>\n    <i (click)=\"toDay()\" class=\"calendar-viewer__button fa fa-circle\" style=\"font-size:10px\"></i>\n    <i (click)=\"prev()\" class=\"calendar-viewer__button fa fa-chevron-left\"></i>\n    <div class=\"calendar-viewer__title\">{{dateTitle}}</div>\n  </div>\n\n  <div role=\"grid\" class=\"calendar-viewer__body\">\n    <div role=\"row\" class=\"calendar-viewer__row\">\n      <div class=\"calendar-viewer__th\" *ngFor=\"let title of weekTitles\">{{title}}</div>\n    </div>\n    <div *ngFor=\"let week of weekDates\" role=\"row\" class=\"calendar-viewer__row\">\n      <div *ngFor=\"let dateViewer of week\"\n           [ngClass]=\"{'light-cell': dateViewer.outOfRange, 'today-cell': dateViewer.today}\" class=\"calendar-viewer__td\">\n        <div (click)=\"activeDate(dateViewer)\" class=\"calendar-viewer__date\" [ngClass]=\"{'active': dateViewer.time === dateActive?.time}\">\n          <span>{{dateViewer.date.getDate()}}</span>\n          <div *ngIf=\"dateViewer.events\" class=\"calendar-viewer__events\">\n            <div *ngFor=\"let event of dateViewer.events\" [ngStyle]=\"event.style\"></div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n\n</div>\n",
                        styles: [".calendar-viewer{padding:10px 0}.calendar-viewer__head{font-size:14px;padding:0 5px 0 15px;height:40px;color:#757575}.calendar-viewer__title{overflow:hidden;line-height:40px;font-weight:700;text-transform:uppercase}.calendar-viewer__button{float:right;margin:2px 0;text-align:center}.calendar-viewer__body{display:table;table-layout:fixed;width:100%;text-align:center;color:#212121;font-size:14px}.calendar-viewer__row{display:table-row}.calendar-viewer__th{display:table-cell;vertical-align:middle;height:24px;font-size:12px;color:#757575;font-weight:700}.calendar-viewer__td{display:table-cell;vertical-align:middle;height:44px}.calendar-viewer__td.light-cell{opacity:.2}.calendar-viewer__td.today-cell .calendar-viewer__button,.calendar-viewer__td.today-cell .calendar-viewer__date{color:#dc3545}.calendar-viewer__button,.calendar-viewer__date{height:36px;width:36px;line-height:36px;border-radius:50%;cursor:pointer;display:inline-block;position:relative}.calendar-viewer__button:hover,.calendar-viewer__date:hover{background-color:rgba(0,0,0,.1)}.active.calendar-viewer__button,.calendar-viewer__date.active{background-color:#438eb9!important;color:#fff!important}.active.calendar-viewer__button .calendar-viewer__events div,.calendar-viewer__date.active .calendar-viewer__events div{background-color:#fff!important}.calendar-viewer__events{position:absolute;left:5px;right:5px;bottom:4px;text-align:center;overflow:hidden;line-height:0;height:6px}.calendar-viewer__events div{width:4px;height:4px;border-radius:50%;margin:0 1px;background-color:#438eb9;display:inline-block}"]
                    }] }
        ];
        /** @nocollapse */
        CalendarViewerComponent.ctorParameters = function () { return []; };
        CalendarViewerComponent.propDecorators = {
            dateFormat: [{ type: core.Input }],
            locale: [{ type: core.Input }],
            firstDay: [{ type: core.Input }],
            limitEvent: [{ type: core.Input }],
            view: [{ type: core.Input }],
            date: [{ type: core.Input }],
            onChange: [{ type: core.Output }],
            onActive: [{ type: core.Output }]
        };
        return CalendarViewerComponent;
    }());
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
    var CalendarViewerMode = {
        MONTH: 'month',
        WEEK: 'week',
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var CalendarWidgetComponent = /** @class */ (function () {
        function CalendarWidgetComponent(calendarService) {
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
        CalendarWidgetComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            this.loadEvents();
        };
        /**
         * @param {?} date
         * @return {?}
         */
        CalendarWidgetComponent.prototype.changeMonth = /**
         * @param {?} date
         * @return {?}
         */
        function (date) {
            this._date = date;
            this.calendarViewer.clearEvents();
            this.loadEvents();
        };
        /**
         * @param {?} e
         * @return {?}
         */
        CalendarWidgetComponent.prototype.activeDate = /**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            this.activeDateViewer = e;
            this.activeDateTitle = xCalendar.formatDate(e.date, this.dateFormat);
        };
        /**
         * @return {?}
         */
        CalendarWidgetComponent.prototype.loadEvents = /**
         * @return {?}
         */
        function () {
            var _this = this;
            if (!this._date) {
                return;
            }
            this.calendarService.loadMonthEvents(this._date, (/**
             * @param {?} events
             * @return {?}
             */
            function (events) {
                events.sort((/**
                 * @param {?} a
                 * @param {?} b
                 * @return {?}
                 */
                function (a, b) {
                    return a.day - b.day;
                }));
                _this._groupEventByDate(events).forEach((/**
                 * @param {?} group
                 * @return {?}
                 */
                function (group) {
                    _this.calendarViewer.setEvents(group.events, group.date);
                }));
                // Focus today
                if (!_this.activeDateViewer) {
                    _this.calendarViewer.focusDate(new Date());
                }
            }));
        };
        /**
         * @param {?} event
         * @param {?} jsEvent
         * @param {?} targetEl
         * @return {?}
         */
        CalendarWidgetComponent.prototype.onViewEvent = /**
         * @param {?} event
         * @param {?} jsEvent
         * @param {?} targetEl
         * @return {?}
         */
        function (event, jsEvent, targetEl) {
            var _this = this;
            this.calendarService.viewEvent(event, jsEvent, targetEl, (/**
             * @return {?}
             */
            function () { return _this.loadEvents(); }));
        };
        /**
         * @private
         * @param {?} events
         * @return {?}
         */
        CalendarWidgetComponent.prototype._groupEventByDate = /**
         * @private
         * @param {?} events
         * @return {?}
         */
        function (events) {
            var _this = this;
            /** @type {?} */
            var groups = [];
            events.forEach((/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                /** @type {?} */
                var group;
                /** @type {?} */
                var date = new Date(event.from);
                date.setHours(0, 0, 0, 0);
                for (var i = 0; i < groups.length; i++) {
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
                _this._initEventStatus(event);
                group.events.push(event);
            }));
            // sort event by time
            groups.forEach((/**
             * @param {?} group
             * @return {?}
             */
            function (group) {
                group.events.sort((/**
                 * @param {?} a
                 * @param {?} b
                 * @return {?}
                 */
                function (a, b) { return a.startTime - b.startTime; }));
            }));
            return groups;
        };
        /**
         * @private
         * @param {?} event
         * @return {?}
         */
        CalendarWidgetComponent.prototype._initEventStatus = /**
         * @private
         * @param {?} event
         * @return {?}
         */
        function (event) {
            /** @type {?} */
            var now = new Date();
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
        };
        CalendarWidgetComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'calendar-widget',
                        template: "<calendar-viewer #calendarViewer [locale]=\"locale\" (onChange)=\"changeMonth($event)\" (onActive)=\"activeDate($event)\"></calendar-viewer>\n<div class=\"calendar-container\" *ngIf=\"activeDateViewer?.events?.length\">\n    <div class=\"calendar-event__date\">{{activeDateTitle}}</div>\n    <div #viewToggle class=\"calendar-body\">\n        <div *ngFor=\"let event of activeDateViewer.events\" #targetEl (click)=\"onViewEvent(event, $event, targetEl)\"  class=\"calendar-event\">\n            <div  class=\"calendar-event__state\" [ngStyle]=\"event.style\"></div>\n            <div class=\"calendar-event__content\">\n                <div class=\"calendar-event__title\">\n                    {{event.subject}}\n                    <div class=\"calendar-event__progress\" [style.color]=\"event.statusColor\">{{event.statusText}}</div>\n                </div>\n                <div class=\"calendar-event__text\">\n                    <i class=\"fa fa-clock-o calendar-event__icon\"></i>\n                    {{event.hourStr}}\n                </div>\n                <div *ngIf=\"event.location\" class=\"calendar-event__text\">\n                    <i class=\"fa fa-map-marker calendar-event__icon\"></i>\n                    {{event.location}}\n                </div>\n            </div>\n        </div>\n    </div>\n</div>",
                        styles: [".calendar-container{padding-bottom:15px}.calendar-event__date{font-size:12px;color:#757575;font-weight:700;margin:0 15px 5px;padding-top:15px;text-transform:uppercase;border-top:1px solid #ddd}.calendar-body{max-height:300px;overflow:hidden auto}.calendar-event{padding:5px 15px;color:#212121;cursor:pointer}.calendar-event:hover{background-color:rgba(0,0,0,.05)}.calendar-event__state{width:8px;height:8px;border-radius:50%;margin:5px 10px 0 0;float:left}.calendar-event__content{overflow:hidden}.calendar-event__title{font-size:14px;line-height:18px;margin-bottom:3px}.calendar-event__progress{font-size:11px;text-transform:uppercase;font-weight:700}.calendar-event__text{font-size:12px;line-height:18px;color:#757575}.calendar-event__icon{width:12px}"]
                    }] }
        ];
        /** @nocollapse */
        CalendarWidgetComponent.ctorParameters = function () { return [
            { type: CalendarService }
        ]; };
        CalendarWidgetComponent.propDecorators = {
            calendarViewer: [{ type: core.ViewChild, args: ['calendarViewer',] }],
            viewToggle: [{ type: core.ViewChild, args: ['viewToggle',] }],
            locale: [{ type: core.Input }],
            dateFormat: [{ type: core.Input }]
        };
        return CalendarWidgetComponent;
    }());
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
    var CalendarAttendeeListComponent = /** @class */ (function () {
        function CalendarAttendeeListComponent(differs) {
            this.attendees = [];
            this.editable = false;
            this.expandable = false;
            this.onDelete = new core.EventEmitter();
            this.expandEnable = true;
            this.expanded = true;
            this.differ = differs.find([]).create(null);
        }
        /**
         * @return {?}
         */
        CalendarAttendeeListComponent.prototype.ngDoCheck = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var change = this.differ.diff(this.attendees);
            // Detect push item on array
            if (change) {
                this.generateDetail();
            }
        };
        /**
         * @param {?} attendee
         * @return {?}
         */
        CalendarAttendeeListComponent.prototype.removeAttendee = /**
         * @param {?} attendee
         * @return {?}
         */
        function (attendee) {
            /** @type {?} */
            var index = this.attendees.indexOf(attendee);
            if (index > -1) {
                this.attendees.splice(index, 1);
                this.onDelete.emit();
            }
        };
        /**
         * @return {?}
         */
        CalendarAttendeeListComponent.prototype.generateDetail = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var accept = 0;
            /** @type {?} */
            var reject = 0;
            /** @type {?} */
            var unknown = 0;
            /** @type {?} */
            var arr = [];
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
        };
        /**
         * @return {?}
         */
        CalendarAttendeeListComponent.prototype.expandAttendees = /**
         * @return {?}
         */
        function () {
            if (this.expandEnable) {
                this.expanded = !this.expanded;
            }
        };
        /**
         * @param {?} attendee
         * @return {?}
         */
        CalendarAttendeeListComponent.prototype.getStateIcon = /**
         * @param {?} attendee
         * @return {?}
         */
        function (attendee) {
            /** @type {?} */
            var cls;
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
        };
        CalendarAttendeeListComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'calendar-attendee-list',
                        template: "<div *ngIf=\"attendees?.length\" (click)=\"expandAttendees()\" [ngClass]=\"expandEnable ? 'expandable' : ''\"\n     class=\"attendee-detail\">\n    <span class=\"attendee-number\">{{attendees.length}} kh\u00E1ch</span>\n    <i *ngIf=\"expandEnable\" class=\"fa fa-angle-{{expanded ? 'up' : 'down'}}\" style=\"padding-left: 10px\"></i>\n    <div class=\"attendee-desc\">{{stateText}}</div>\n</div>\n<div [ngClass]=\"{'hide': !expanded}\">\n    <div class=\"attendee-item\" *ngFor=\"let attendee of attendees\">\n        <div>\n            <img *ngIf=\"attendee.username; else aliasAvatar\"\n                 class=\"attendee-avatar\"\n                 userAvatar [usercode]=\"attendee.username\">\n            <ng-template #aliasAvatar>\n                <i class=\"attendee-avatar fa fa-question\"></i>\n            </ng-template>\n        </div>\n        <i *ngIf=\"attendee.state\" [title]=\"attendee._stateText\" [ngClass]=\"getStateIcon(attendee)\"></i>\n        <div class=\"attendee-content\">\n            <b>{{attendee.fullname || attendee.alias}} </b>\n            <span> {{attendee.notes}}</span>\n        </div>\n        <div *ngIf=\"editable\">\n            <i class=\"attendee-remove fa fa-times\" (click)=\"removeAttendee(attendee)\"></i>\n        </div>\n    </div>\n</div>",
                        styles: [".attendee-detail{margin-bottom:2px;line-height:16px;display:inline-block}.attendee-detail.expandable{cursor:pointer}.attendee-detail.expandable:hover{background:rgba(0,0,0,.04)}.attendee-number{font-size:14px}.attendee-desc{font-size:13px;color:rgba(0,0,0,.5)}.attendee-item{position:relative;padding:4px 0;overflow:hidden;display:flex;align-items:center}.attendee-item:hover{background:rgba(0,0,0,.04)}.attendee-item:hover .attendee-remove{display:block}.attendee-item .attendee-remove{flex-grow:0;color:rgba(0,0,0,.3);width:24px;height:24px;line-height:24px;cursor:pointer;text-align:center;display:none;font-size:12px}.attendee-avatar{flex-grow:0;width:24px;height:24px;border-radius:50%;margin-right:15px}i.attendee-avatar{text-align:center;line-height:24px;font-size:20px;background:#6c757d;color:#fff}.attendee-content{flex-grow:1;overflow:hidden;font-size:13px;line-height:16px;color:rgba(0,0,0,.5)}.attendee-content b{color:rgba(0,0,0,.7)}.attendee-info{position:absolute;top:50%;left:18px;font-size:8px;width:14px;height:14px;line-height:12px;border-radius:50%;border:1px solid #fff;color:#fff;text-align:center}.attendee-info.accept{background:#28a745}.attendee-info.reject{background:#dc3545}.attendee-info.unknown{background:#6c757d}"]
                    }] }
        ];
        /** @nocollapse */
        CalendarAttendeeListComponent.ctorParameters = function () { return [
            { type: core.IterableDiffers }
        ]; };
        CalendarAttendeeListComponent.propDecorators = {
            attendees: [{ type: core.Input }],
            editable: [{ type: core.Input }],
            expandable: [{ type: core.Input }],
            onDelete: [{ type: core.Output }]
        };
        return CalendarAttendeeListComponent;
    }());
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
    var routes = [
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
    var CalendarRoutingModule = /** @class */ (function () {
        function CalendarRoutingModule() {
        }
        CalendarRoutingModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [router.RouterModule.forChild(routes)],
                        exports: [router.RouterModule]
                    },] }
        ];
        return CalendarRoutingModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var FILES_FORMAT = [
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
    var FILES_EDIT_FORMAT = [
        'doc', 'docx', 'odt', 'ods', 'xls', 'xlsx',
        'ppt', 'pps', 'pptm', 'pptx', 'pot', 'potx',
        'dot', 'dotx', 'docm', 'dotx', 'csv', 'sxw'
    ];
    /** @type {?} */
    var FILES_VIEW_FORMAT = ['pdf', 'png', 'jpg', 'jpeg', 'gif'];
    /** @type {?} */
    var UNKNOWN = 'unknown';
    var FileFormatService = /** @class */ (function () {
        function FileFormatService() {
        }
        /**
         * @return {?}
         */
        FileFormatService.prototype.getImagePath = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var path = iNet.commonImageFolder;
            /** @type {?} */
            var lastIndex = path.lastIndexOf('/');
            if (lastIndex === path.length - 1) {
                return path.substring(0, lastIndex);
            }
            return path;
        };
        /**
         * @return {?}
         */
        FileFormatService.prototype.getFileFormatPath = /**
         * @return {?}
         */
        function () {
            return this.getImagePath() + "/format";
        };
        /**
         * @param {?} ext
         * @return {?}
         */
        FileFormatService.prototype.getUrlByExt = /**
         * @param {?} ext
         * @return {?}
         */
        function (ext) {
            /** @type {?} */
            var path = this.getFileFormatPath();
            if (FILES_FORMAT.indexOf(ext) > -1) {
                return path + "/" + ext.toLowerCase() + ".svg";
            }
            return path + "/" + UNKNOWN + ".svg";
        };
        /**
         * @param {?} name
         * @return {?}
         */
        FileFormatService.prototype.getUrlByName = /**
         * @param {?} name
         * @return {?}
         */
        function (name) {
            return this.getUrlByExt(this.getExtByName(name));
        };
        /**
         * @param {?} name
         * @return {?}
         */
        FileFormatService.prototype.getExtByName = /**
         * @param {?} name
         * @return {?}
         */
        function (name) {
            return name.split('.').pop().toLowerCase() || UNKNOWN;
        };
        /**
         * @return {?}
         */
        FileFormatService.prototype.getEditFormats = /**
         * @return {?}
         */
        function () {
            return FILES_EDIT_FORMAT;
        };
        /**
         * @return {?}
         */
        FileFormatService.prototype.getViewFormats = /**
         * @return {?}
         */
        function () {
            return FILES_VIEW_FORMAT;
        };
        FileFormatService.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        FileFormatService.ctorParameters = function () { return []; };
        return FileFormatService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var FileExtPipe = /** @class */ (function () {
        function FileExtPipe(formatService) {
            this.formatService = formatService;
        }
        /**
         * @param {?} name
         * @return {?}
         */
        FileExtPipe.prototype.transform = /**
         * @param {?} name
         * @return {?}
         */
        function (name) {
            return this.formatService.getExtByName(name);
        };
        FileExtPipe.decorators = [
            { type: core.Pipe, args: [{
                        name: 'fileExt'
                    },] }
        ];
        /** @nocollapse */
        FileExtPipe.ctorParameters = function () { return [
            { type: FileFormatService }
        ]; };
        return FileExtPipe;
    }());
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
    var FileIconPipe = /** @class */ (function () {
        function FileIconPipe(formatService) {
            this.formatService = formatService;
        }
        /**
         * @param {?} name
         * @return {?}
         */
        FileIconPipe.prototype.transform = /**
         * @param {?} name
         * @return {?}
         */
        function (name) {
            return this.formatService.getUrlByName(name);
        };
        FileIconPipe.decorators = [
            { type: core.Pipe, args: [{
                        name: 'fileIcon'
                    },] }
        ];
        /** @nocollapse */
        FileIconPipe.ctorParameters = function () { return [
            { type: FileFormatService }
        ]; };
        return FileIconPipe;
    }());
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
    var FileListModule = /** @class */ (function () {
        function FileListModule() {
        }
        FileListModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule
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
        return FileListModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var TimePickerModalComponent = /** @class */ (function () {
        function TimePickerModalComponent(el) {
            this.el = el;
            this.arrowkeys = true;
            this.hourStep = 1;
            this.minuteStep = 15;
            this.mousewheel = true;
            this.readonlyInput = false;
            this.secondsStep = 10;
            this.showMinutes = true;
            this.showSpinners = true;
            this.onChange = new core.EventEmitter();
        }
        Object.defineProperty(TimePickerModalComponent.prototype, "time", {
            get: /**
             * @return {?}
             */
            function () {
                return this._timeDate;
            },
            set: /**
             * @param {?} date
             * @return {?}
             */
            function (date) {
                this._timeDate = date;
                this.timeStr = TimePickerModalComponent._formatDate(date);
                this.onChange.emit(this.timeStr);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        TimePickerModalComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this.$modal = $(this.el.nativeElement).detach().addClass('modal');
            this.$modalContent = this.$modal.find('.time-picker-modal');
            // Touched close
            this.$modal.on('mousedown click', (/**
             * @param {?} e
             * @return {?}
             */
            function (e) {
                if (e.target.isSameNode(_this.$modal[0])) {
                    _this.close();
                }
            }));
        };
        /**
         * @return {?}
         */
        TimePickerModalComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.$modal.remove();
        };
        /**
         * @return {?}
         */
        TimePickerModalComponent.prototype.close = /**
         * @return {?}
         */
        function () {
            this.$modal.detach();
        };
        /**
         * @param {?} css
         * @return {?}
         */
        TimePickerModalComponent.prototype.open = /**
         * @param {?} css
         * @return {?}
         */
        function (css) {
            this.$modalContent.css(css);
            document.body.appendChild(this.$modal[0]);
        };
        /**
         * @private
         * @param {?} date
         * @return {?}
         */
        TimePickerModalComponent._formatDate = /**
         * @private
         * @param {?} date
         * @return {?}
         */
        function (date) {
            if (!date || !date.getTime()) {
                return '';
            }
            else {
                return ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);
            }
        };
        TimePickerModalComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'time-picker-modal',
                        template: "<div class=\"time-picker-modal\">\n    <timepicker #timePicker [(ngModel)]=\"time\"\n                [arrowkeys]=\"arrowkeys\"\n                [max]=\"max\"\n                [min]=\"min\"\n                [minuteStep]=\"minuteStep\"\n                [mousewheel]=\"mousewheel\"\n                [readonlyInput]=\"readonlyInput\"\n                [secondsStep]=\"secondsStep\"\n                [showMeridian]=\"showMeridian\"\n                [showMinutes]=\"showMinutes\"\n                [showSeconds]=\"showSeconds\"\n                [showSpinners]=\"showSpinners\">\n\n    </timepicker>\n</div>",
                        styles: [":host(.modal){display:block;z-index:1101}.time-picker-modal{position:absolute;border:1px solid rgba(0,0,0,.2);background:#fff;border-radius:4px;padding:10px}"]
                    }] }
        ];
        /** @nocollapse */
        TimePickerModalComponent.ctorParameters = function () { return [
            { type: core.ElementRef }
        ]; };
        TimePickerModalComponent.propDecorators = {
            arrowkeys: [{ type: core.Input }],
            hourStep: [{ type: core.Input }],
            max: [{ type: core.Input }],
            min: [{ type: core.Input }],
            minuteStep: [{ type: core.Input }],
            mousewheel: [{ type: core.Input }],
            readonlyInput: [{ type: core.Input }],
            secondsStep: [{ type: core.Input }],
            showMeridian: [{ type: core.Input }],
            showMinutes: [{ type: core.Input }],
            showSeconds: [{ type: core.Input }],
            showSpinners: [{ type: core.Input }],
            time: [{ type: core.Input }],
            onChange: [{ type: core.Output }],
            timePicker: [{ type: core.ViewChild, args: ['timePicker',] }]
        };
        return TimePickerModalComponent;
    }());
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
    var DEFAULT_VALUE_ACCESSOR = {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: core.forwardRef((/**
         * @return {?}
         */
        function () { return TimePickerModalDirective; })),
        multi: true
    };
    var TimePickerModalDirective = /** @class */ (function () {
        function TimePickerModalDirective(el) {
            this.el = el;
            this.valueChange = new core.EventEmitter();
        }
        /**
         * @return {?}
         */
        TimePickerModalDirective.prototype.onFocus = /**
         * @return {?}
         */
        function () {
            this.open();
            this.onChange();
        };
        /**
         * @return {?}
         */
        TimePickerModalDirective.prototype.onChange = /**
         * @return {?}
         */
        function () {
            this.timePickerModal.time = this.getDateInput();
        };
        /**
         * @return {?}
         */
        TimePickerModalDirective.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            if (!this.timePickerModal) {
                console.error('[TimePickerModalDirective] Missing timePickerModal');
            }
            this.timePickerModal.onChange.subscribe((/**
             * @param {?} timeStr
             * @return {?}
             */
            function (timeStr) {
                _this.writeValue(timeStr);
                if (_this.propagateChange) {
                    _this.propagateChange(timeStr);
                }
            }));
        };
        /**
         * @param {?} value
         * @return {?}
         */
        TimePickerModalDirective.prototype.writeValue = /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.el.nativeElement.value = value;
            this.valueChange.emit(value);
        };
        /**
         * @param {?} fn
         * @return {?}
         */
        TimePickerModalDirective.prototype.registerOnChange = /**
         * @param {?} fn
         * @return {?}
         */
        function (fn) {
            this.propagateChange = fn;
        };
        /**
         * @param {?} fn
         * @return {?}
         */
        TimePickerModalDirective.prototype.registerOnTouched = /**
         * @param {?} fn
         * @return {?}
         */
        function (fn) {
        };
        /**
         * @return {?}
         */
        TimePickerModalDirective.prototype.open = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var bounding = this.el.nativeElement.getBoundingClientRect();
            /** @type {?} */
            var css = {
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
        };
        /**
         * @return {?}
         */
        TimePickerModalDirective.prototype.close = /**
         * @return {?}
         */
        function () {
            this.timePickerModal.close();
        };
        /**
         * @private
         * @return {?}
         */
        TimePickerModalDirective.prototype.getDateInput = /**
         * @private
         * @return {?}
         */
        function () {
            /** @type {?} */
            var value = this.getValue();
            if (!value) {
                return null;
            }
            /** @type {?} */
            var date = new Date();
            date.setMinutes(0);
            // HH:mm:ss format
            /** @type {?} */
            var times;
            if (value.indexOf(':') > -1) {
                times = value.split(':');
            }
            else {
                times = [];
                for (var i = 0; i < value.length + 1; i += 2) {
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
        };
        /**
         * @private
         * @return {?}
         */
        TimePickerModalDirective.prototype.getValue = /**
         * @private
         * @return {?}
         */
        function () {
            return this.el.nativeElement.value.trim();
        };
        TimePickerModalDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[timePicker]',
                        providers: [DEFAULT_VALUE_ACCESSOR]
                    },] }
        ];
        /** @nocollapse */
        TimePickerModalDirective.ctorParameters = function () { return [
            { type: core.ElementRef }
        ]; };
        TimePickerModalDirective.propDecorators = {
            valueChange: [{ type: core.Output }],
            timePickerModal: [{ type: core.Input }],
            onFocus: [{ type: core.HostListener, args: ['focus',] }],
            onChange: [{ type: core.HostListener, args: ['change',] }]
        };
        return TimePickerModalDirective;
    }());
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
    var TimePickerModalModule = /** @class */ (function () {
        function TimePickerModalModule() {
        }
        TimePickerModalModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            ngxBootstrap.TimepickerModule.forRoot(),
                            common.CommonModule,
                            forms.FormsModule
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
        return TimePickerModalModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var CalendarModule = /** @class */ (function () {
        function CalendarModule() {
        }
        CalendarModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            ngxBootstrap.BsDatepickerModule.forRoot(),
                            ngxBootstrap.TimepickerModule.forRoot(),
                            ngxBootstrap.ModalModule.forRoot(),
                            ngxBootstrap.TypeaheadModule.forRoot(),
                            forms.ReactiveFormsModule,
                            common.CommonModule,
                            forms.FormsModule,
                            inetCore.CoreModule,
                            FileListModule,
                            common.CommonModule,
                            TimePickerModalModule,
                            http.HttpClientModule,
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
                            inetCore.ResourceLoaderService,
                            inetCore.SuggestionService
                        ],
                        entryComponents: [
                            CalendarDialogViewComponent
                        ]
                    },] }
        ];
        return CalendarModule;
    }());

    exports.CalendarComponent = CalendarComponent;
    exports.CalendarFormComponent = CalendarFormComponent;
    exports.CalendarMode = CalendarMode;
    exports.CalendarModule = CalendarModule;
    exports.CalendarService = CalendarService;
    exports.CalendarViewMode = CalendarViewMode;
    exports.ɵa = FileListModule;
    exports.ɵb = FileIconPipe;
    exports.ɵc = FileFormatService;
    exports.ɵd = FileExtPipe;
    exports.ɵe = FileListComponent;
    exports.ɵf = TimePickerModalModule;
    exports.ɵg = DEFAULT_VALUE_ACCESSOR;
    exports.ɵh = TimePickerModalDirective;
    exports.ɵi = TimePickerModalComponent;
    exports.ɵj = CalendarRoutingModule;
    exports.ɵk = CalendarTodayComponent;
    exports.ɵl = AttachmentListComponent;
    exports.ɵm = CalendarDialogRepeatComponent;
    exports.ɵn = CalendarWidgetComponent;
    exports.ɵo = CalendarDialogViewComponent;
    exports.ɵp = CalendarAttendeeListComponent;
    exports.ɵq = CalendarDialogDelete;
    exports.ɵr = CalendarViewerComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=inet-calendar.umd.js.map
