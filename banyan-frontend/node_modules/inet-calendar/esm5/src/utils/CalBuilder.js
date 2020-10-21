/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { vnToLatin } from "./common/Accent";
import { DateUtils } from "./common/DateUtils";
import { AjaxAPI } from "./common/AjaxAPI";
import { CalAttendeeType } from "./model/CalAttendeeType";
import { CalConfigs } from "./CalConfigs";
import { CalType } from "./model/CalType";
import { CalCategory } from "./model/CalCategory";
import { CalCategoryIcon } from "./model/CalCategoryIcon";
import { CalAttendeeRole } from "./model/CalAttendeeRole";
import { CalSubType } from "./model/CalSubType";
import { CalMode } from "./model/CalMode";
import { CalendarCar } from "./CalendarCar";
import { SubFirmDictionary } from "./subfirm/Dictionary";
import { CalAttendeeState } from "./model/CalAttendeeState";
import { LEADER_REFERENCE } from "./CalConstants";
import * as moment_ from 'moment';
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
export { CalBuilder };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FsQnVpbGRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtY2FsZW5kYXIvIiwic291cmNlcyI6WyJzcmMvdXRpbHMvQ2FsQnVpbGRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzFDLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUM3QyxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFFekMsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQ3hELE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFDeEMsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3hDLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUNoRCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDeEQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQ3hELE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUM5QyxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDeEMsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEVBQWlCLGlCQUFpQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDdkUsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFFMUQsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFaEQsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7O0lBQzVCLE1BQU0sR0FBRyxPQUFPO0FBQ3RCLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxNQUFNLENBQUM7QUFLMUI7SUFBQTtRQUFBLGlC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QUU5RCxvQ0FBMEU7O0lBRTFFLG1DQUFvRjs7SUFFcEYsbUNBQW9GOztJQUVwRix1Q0FBNkY7O0lBRTdGLGdDQUEyRDs7SUFvOUIzRCxvQ0FBeUQ7O0lBa0l6RCw4QkFBcUQ7O0lBRXJELCtCQUF1RDs7SUFFdkQsNEJBQWlEOztJQUVqRCw4QkFBcUQ7O0lBRXJELDZCQUFtRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7dm5Ub0xhdGlufSBmcm9tIFwiLi9jb21tb24vQWNjZW50XCI7XG5pbXBvcnQge0RhdGVVdGlsc30gZnJvbSBcIi4vY29tbW9uL0RhdGVVdGlsc1wiO1xuaW1wb3J0IHtBamF4QVBJfSBmcm9tIFwiLi9jb21tb24vQWpheEFQSVwiO1xuaW1wb3J0IHtDYWxFdmVudH0gZnJvbSBcIi4vbW9kZWwvQ2FsRXZlbnRcIjtcbmltcG9ydCB7Q2FsQXR0ZW5kZWVUeXBlfSBmcm9tIFwiLi9tb2RlbC9DYWxBdHRlbmRlZVR5cGVcIjtcbmltcG9ydCB7Q2FsQ29uZmlnc30gZnJvbSBcIi4vQ2FsQ29uZmlnc1wiO1xuaW1wb3J0IHtDYWxUeXBlfSBmcm9tIFwiLi9tb2RlbC9DYWxUeXBlXCI7XG5pbXBvcnQge0NhbENhdGVnb3J5fSBmcm9tIFwiLi9tb2RlbC9DYWxDYXRlZ29yeVwiO1xuaW1wb3J0IHtDYWxDYXRlZ29yeUljb259IGZyb20gXCIuL21vZGVsL0NhbENhdGVnb3J5SWNvblwiO1xuaW1wb3J0IHtDYWxBdHRlbmRlZVJvbGV9IGZyb20gXCIuL21vZGVsL0NhbEF0dGVuZGVlUm9sZVwiO1xuaW1wb3J0IHtDYWxTdWJUeXBlfSBmcm9tIFwiLi9tb2RlbC9DYWxTdWJUeXBlXCI7XG5pbXBvcnQge0NhbE1vZGV9IGZyb20gXCIuL21vZGVsL0NhbE1vZGVcIjtcbmltcG9ydCB7Q2FsZW5kYXJDYXJ9IGZyb20gXCIuL0NhbGVuZGFyQ2FyXCI7XG5pbXBvcnQge0RpY3Rpb25hcnlEYXRhLCBTdWJGaXJtRGljdGlvbmFyeX0gZnJvbSBcIi4vc3ViZmlybS9EaWN0aW9uYXJ5XCI7XG5pbXBvcnQge0NhbEF0dGVuZGVlU3RhdGV9IGZyb20gXCIuL21vZGVsL0NhbEF0dGVuZGVlU3RhdGVcIjtcbmltcG9ydCB7Q2FsQXR0ZW5kZWV9IGZyb20gXCIuL21vZGVsL0NhbEF0dGVuZGVlXCI7XG5pbXBvcnQge0xFQURFUl9SRUZFUkVOQ0V9IGZyb20gXCIuL0NhbENvbnN0YW50c1wiO1xuXG5pbXBvcnQgKiBhcyBtb21lbnRfIGZyb20gJ21vbWVudCc7XG5jb25zdCBtb21lbnQgPSBtb21lbnRfO1xud2luZG93Wydtb21lbnQnXSA9IG1vbWVudDtcblxuZGVjbGFyZSBsZXQgaU5ldDogYW55O1xuZGVjbGFyZSBsZXQgJDogYW55O1xuXG5leHBvcnQgY2xhc3MgQ2FsQnVpbGRlciB7XG4gICAgaXNBdXRoOiBib29sZWFuO1xuICAgIG9yZ2lkOiBzdHJpbmc7XG4gICAgVElNRV9ORVdfVVBEQVRFOiBudW1iZXIgPSAxMjtcbiAgICByb2xlVXJsOiBzdHJpbmcgPSAneHNjaGVkdWxlL3BhZ2Uvcm9sZSc7XG5cbiAgICBNT0RFID0gQ2FsTW9kZTtcbiAgICBST0xFID0gQ2FsQXR0ZW5kZWVSb2xlO1xuICAgIGNhbFN1YlR5cGUgPSBDYWxTdWJUeXBlO1xuICAgIGNhbENhdGVnb3J5ID0gQ2FsQ2F0ZWdvcnk7XG4gICAgdm5Ub0xhdGluID0gdm5Ub0xhdGluO1xuICAgIGRhdGVVdGlscyA9IERhdGVVdGlscztcbiAgICBjYWxBdHRlbmRlZVR5cGUgPSBDYWxBdHRlbmRlZVR5cGU7XG4gICAgY2FsQXR0ZW5kZWVTdGF0ZSA9IENhbEF0dGVuZGVlU3RhdGU7XG4gICAgY2FsVHlwZSA9IENhbFR5cGU7XG5cbiAgICBzdWJGaXJtRGljID0gbmV3IFN1YkZpcm1EaWN0aW9uYXJ5KCk7XG4gICAgY2FyVXRpbHMgPSBuZXcgQ2FsZW5kYXJDYXIodGhpcy5zdWJGaXJtRGljKTtcblxuICAgIGNvbmZpZ3MgPSBDYWxDb25maWdzO1xuXG4gICAgcmVzb3VyY2VzID0ge1xuICAgICAgICBkYXlzOiBbXG4gICAgICAgICAgICAnQ2jhu6cgbmjhuq10JyxcbiAgICAgICAgICAgICdUaOG7qSBoYWknLFxuICAgICAgICAgICAgJ1Ro4bupIGJhJyxcbiAgICAgICAgICAgICdUaOG7qSB0xrAnLFxuICAgICAgICAgICAgJ1Ro4bupIG7Eg20nLFxuICAgICAgICAgICAgJ1Ro4bupIHPDoXUnLFxuICAgICAgICAgICAgJ1Ro4bupIGLhuqN5J1xuICAgICAgICBdLFxuICAgICAgICBzdGF0dXNlczogW1xuICAgICAgICAgICAgJ03hu5tpIHThuqFvJyxcbiAgICAgICAgICAgICdCYW4gaMOgbmgnLFxuICAgICAgICAgICAgJ0No4budIGR1eeG7h3QnLFxuICAgICAgICAgICAgJ8SQw6MgaOG7p3knLFxuICAgICAgICAgICAgJ1Row7RuZyBxdWEnLFxuICAgICAgICAgICAgJ0zhu4tjaCDEkcahbiB24buLIGtow6FjJ1xuICAgICAgICBdLFxuICAgICAgICBhbGxEYXk6ICdD4bqjIG5nw6B5JyxcbiAgICAgICAgaG91cjogJ2dp4budJyxcbiAgICAgICAgbWludXRlOiAncGjDunQnXG4gICAgfTtcblxuICAgIF91c2VyUm9sZXMgPSB7fTtcbiAgICBfbWFwRXZlbnRzID0ge307XG4gICAgX2NhY2hlU3RvcmU6IGFueTtcbiAgICBfcXVldWUgPSB7fTtcblxuICAgIF9vcmdhbnM6IGFueVtdID0gW107XG4gICAgX215T3JnYW5zOiBhbnlbXSA9IFtdO1xuXG4gICAgX2FwcGx5Q29uZmlnKCkge1xuICAgICAgICBpTmV0LmFwcGx5KHRoaXMsIERhdGVVdGlscyk7XG5cbiAgICAgICAgLy8gQXBwbHkgY29uZmlnXG4gICAgICAgIGlmICh3aW5kb3dbJ3hDYWxlbmRhckNvbmZpZ0xpc3QnXSAmJiB3aW5kb3dbJ3hDYWxlbmRhckNvbmZpZ0xpc3QnXS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB3aW5kb3dbJ3hDYWxlbmRhckNvbmZpZ0xpc3QnXS5mb3JFYWNoKChjb25maWcpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgb2JqID0gdGhpcy5nZXRDb25maWdPYmooY29uZmlnLm5hbWUpO1xuICAgICAgICAgICAgICAgIGlmIChvYmopIHtcbiAgICAgICAgICAgICAgICAgICAgJC5leHRlbmQob2JqLCBjb25maWcpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29uZmlncy5wdXNoKGNvbmZpZyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHdpbmRvd1sneENhbGVuZGFyQ29uZmlnQ3VzdG9tcyddKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBrIGluIHdpbmRvd1sneENhbGVuZGFyQ29uZmlnQ3VzdG9tcyddKSB7XG4gICAgICAgICAgICAgICAgbGV0IG9iaiA9IHRoaXMuZ2V0Q29uZmlnT2JqKGspO1xuICAgICAgICAgICAgICAgIGlmIChvYmopIHtcbiAgICAgICAgICAgICAgICAgICAgb2JqLnZhbHVlID0gd2luZG93Wyd4Q2FsZW5kYXJDb25maWdDdXN0b21zJ11ba107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gQXBwbHkgcmVzb3VyY2VzXG4gICAgICAgIGlmICh3aW5kb3dbJ3hjYWxlbmRhclJlc291cmNlcyddKSB7XG4gICAgICAgICAgICB0aGlzLnJlc291cmNlcyA9IHdpbmRvd1sneGNhbGVuZGFyUmVzb3VyY2VzJ107XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNvbmZpZ3MuZm9yRWFjaChmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgICBpZiAob2JqLnZhbHVlID09PSAnZmFsc2UnKSB7XG4gICAgICAgICAgICAgICAgb2JqLnZhbHVlID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHR5cGVJc0RlcGFydG1lbnQgPSAodHlwZTogc3RyaW5nKSA9PiB0eXBlID09PSBDYWxUeXBlLkRFUEFSVE1FTlQ7XG5cbiAgICB0eXBlSXNDb21tdW5pdHkgPSAodHlwZTogc3RyaW5nKSA9PiAgdHlwZSA9PT0gQ2FsVHlwZS5DT01NVU5JVFk7XG5cbiAgICB0eXBlSXNPcmdhbml6YXRpb24gPSAodHlwZTogc3RyaW5nKSA9PiAgdHlwZSA9PT0gQ2FsVHlwZS5PUkdBTklaQVRJT047XG5cbiAgICBjYXRJc0ludml0YXRpb24gPSAoY2F0ZWdvcnk6IHN0cmluZykgPT4gQ2FsQ2F0ZWdvcnkuSU5WSVRBVElPTiA9PT0gY2F0ZWdvcnk7XG5cbiAgICBjYXRJc1BlcnNvbmFsID0gKGNhdGVnb3J5OiBzdHJpbmcpID0+IENhbENhdGVnb3J5LlBFUlNPTkFMID09PSBjYXRlZ29yeTtcblxuICAgIGNhdElzQ2FyID0gKGNhdGVnb3J5OiBzdHJpbmcpID0+IENhbENhdGVnb3J5LkNBUiA9PT0gY2F0ZWdvcnk7XG5cbiAgICBjYXRJc0ltcG9ydGFudCA9IChjYXRlZ29yeTogc3RyaW5nKSA9PiBDYWxDYXRlZ29yeS5JTVBPUlRBTlQgPT09IGNhdGVnb3J5O1xuXG4gICAgZm9ybWF0RGF0ZVN0ciA9IChkYXRlKSA9PiB0aGlzLmZvcm1hdERhdGUoZGF0ZSwgdGhpcy5nZXRDb25maWdWYWx1ZSgnREFURV9GT1JNQVQnKSk7XG5cbiAgICBmb3JtYXRUaW1lU3RyID0gKGRhdGUpID0+IHRoaXMuZm9ybWF0RGF0ZShkYXRlLCB0aGlzLmdldENvbmZpZ1ZhbHVlKCdUSU1FX0ZPUk1BVCcpKTtcblxuICAgIGZvcm1hdERhdGVUaW1lU3RyID0gKGRhdGUpID0+IHRoaXMuZm9ybWF0RGF0ZShkYXRlLCB0aGlzLmdldENvbmZpZ1ZhbHVlKCdEQVRFX1RJTUVfRk9STUFUJykpO1xuXG4gICAgZm9ybWF0RGF0ZSA9IChkYXRlLCBmb3JtYXQpID0+IG1vbWVudChkYXRlKS5mb3JtYXQoZm9ybWF0KTtcblxuICAgIGdldENvbmZpZ1ZhbHVlKG5hbWU6IHN0cmluZykge1xuICAgICAgICBsZXQgb2JqID0gdGhpcy5nZXRDb25maWdPYmoobmFtZSk7XG4gICAgICAgIHJldHVybiBvYmogJiYgb2JqLnZhbHVlO1xuICAgIH1cblxuICAgIGdldENvbmZpZ09iaihuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNvbmZpZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbmZpZ3NbaV0ubmFtZSA9PT0gbmFtZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbmZpZ3NbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhZGRRdWV1ZShuYW1lOiBhbnksIGV4ZWN1dG9yOiBhbnksIGNhbGxiYWNrOiBhbnkpIHtcbiAgICAgICAgdGhpcy5fcXVldWVbbmFtZV0gPSB0aGlzLl9xdWV1ZVtuYW1lXSB8fCBbXTtcbiAgICAgICAgdGhpcy5fcXVldWVbbmFtZV0ucHVzaChjYWxsYmFjayk7XG4gICAgICAgIGlmICh0aGlzLl9xdWV1ZVtuYW1lXS5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICAgICAgZXhlY3V0b3IocmVzb2x2ZSk7XG4gICAgICAgICAgICB9KS50aGVuKCh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX3F1ZXVlW25hbWVdLmZvckVhY2goKGZuKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGZuICYmIGZuKHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5fcXVldWVbbmFtZV07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlYWR5KGNhbGxiYWNrLCBvcHRpb25zPzogYW55KSB7XG4gICAgICAgIHRoaXMuX2xvYWRPcmdhbnMoKG9yZ2FucykgPT4ge1xuICAgICAgICAgICAgY2FsbGJhY2sob3JnYW5zLCB0aGlzLl9nZXRPcmdhbk9uSW5pdCgpKTtcbiAgICAgICAgfSwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgLy8gQ2FjaGUgYWxsIG9yZyBpbiBhIG1pbnV0ZSBmb3IgcGVyZm9ybWFuY2VcbiAgICBjYWNoZVNlc3Npb25TdG9yYWdlKGtleTogc3RyaW5nLCB2YWx1ZT86IGFueSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICAgICAgICAgIC8vIENhY2hlIGRhdGEgaW4gYSBtaW51dGVcbiAgICAgICAgICAgICAgICBsZXQgdGltZUNhY2hlOiBudW1iZXIgPSA1ICogNjAwMDA7XG4gICAgICAgICAgICAgICAgbGV0IGNhY2hlOiBhbnkgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKGtleSk7XG4gICAgICAgICAgICAgICAgaWYgKGNhY2hlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhY2hlID0gSlNPTi5wYXJzZShjYWNoZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIGNhY2hlLnRpbWUgPCB0aW1lQ2FjaGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjYWNoZS5kYXRhO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShrZXksIEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICAgICAgdGltZTogbmV3IERhdGUoKS5nZXRUaW1lKCksXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHZhbHVlXG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBGaXhlZCBwcmV2IHZlcnNpb25cbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGtleSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgfVxuXG4gICAgLy8gQ2FjaGUgZGF0YSBvbiBnbG9iYWwgd2luZG93LCByZWZyZXNoIHRhYiB3aWxsIHJlc2V0XG4gICAgY2FjaGVEYXRhVGVtcChrZXksIGRhdGE/OiBhbnkpIHtcbiAgICAgICAgdGhpcy5fY2FjaGVTdG9yZSA9IHRoaXMuX2NhY2hlU3RvcmUgfHwge307XG4gICAgICAgIGlmIChkYXRhID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jYWNoZVN0b3JlW2tleV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9jYWNoZVN0b3JlW2tleV0gPSBkYXRhO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0T3JnSWQob3JnaWQ6IHN0cmluZykge1xuICAgICAgICB0aGlzLm9yZ2lkID0gb3JnaWQ7XG4gICAgICAgIHRoaXMuX2NhY2hlT3JnSWQob3JnaWQpO1xuICAgIH1cblxuICAgIGdldE9yZ0lkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5vcmdpZCB8fCB0aGlzLl9jYWNoZU9yZ0lkKCkgfHwgaU5ldC5vcmdhbklkO1xuICAgIH1cblxuICAgIF9jYWNoZU9yZ0lkKG9yZ2lkPzogYW55KSB7XG4gICAgICAgIGxldCBpZCA9ICd4Y2FsZW5kYXJfb3JnaWQnO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKCFvcmdpZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShpZCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGlkLCBvcmdpZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgfVxuXG4gICAgZ2V0SG91ck1pbnV0ZShkYXRlPzogYW55KSB7XG4gICAgICAgIGlmIChkYXRlLmdldFRpbWUpIHtcbiAgICAgICAgICAgIC8vIGRhdGUgb2JqZWN0XG4gICAgICAgICAgICByZXR1cm4gZGF0ZS5nZXRIb3VycygpICogNjAgKyBkYXRlLmdldE1pbnV0ZXMoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIHN0cmluZyBob3VyXG4gICAgICAgICAgICBkYXRlID0gZGF0ZS5zcGxpdCgnOicpO1xuICAgICAgICAgICAgcmV0dXJuIE51bWJlcihkYXRlWzBdKSAqIDYwICsgTnVtYmVyKGRhdGVbMV0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY3JlYXRlKGZvcm06IGFueSwgc3VjY2Vzcywgb3B0aW9ucz86IGFueSkge1xuICAgICAgICByZXR1cm4gdGhpcy5wb3N0Rm9ybSh7XG4gICAgICAgICAgICB1cmw6ICdjYWxidWlsZGVyL2VsZW1lbnQvY3JlYXRlJyxcbiAgICAgICAgICAgIGRhdGE6IGZvcm0sXG4gICAgICAgICAgICBzdWNjZXNzOiAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQgJiYgZXZlbnQudXVpZClcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmRleEV2ZW50KGV2ZW50KTtcbiAgICAgICAgICAgICAgICBzdWNjZXNzKGV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgdXBkYXRlRXZlbnRCeVJvbGUocGFyYW1zLCBzdWNjZXNzLCBvcHRpb25zPzogYW55KSB7XG4gICAgICAgIGxldCBvcmdhbklkID0gcGFyYW1zICYmIHBhcmFtcy5vcmdpZCB8fCB0aGlzLmdldE9yZ0lkKCk7XG4gICAgICAgIHRoaXMubG9hZFJvbGUob3JnYW5JZCwoKSA9PiB7XG4gICAgICAgICAgICBsZXQgZXZlbnQgPSB0aGlzLmdldEV2ZW50QnlPYmplY3RJZChwYXJhbXMgJiYgcGFyYW1zLmVsZW1lbnQpO1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNSZXZpZXdlcihvcmdhbklkKSkge1xuICAgICAgICAgICAgICAgIHRoaXMucmV2aWV3VXBkYXRlKHBhcmFtcywgc3VjY2Vzcywgb3B0aW9ucyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaXNPd25SZXZpZXdlcihvcmdhbklkKSAmJiBldmVudCAmJiB0aGlzLm1lSXNDcmVhdG9yKGV2ZW50KSkge1xuICAgICAgICAgICAgICAgIHRoaXMub3duZXJSZXZpZXdVcGRhdGUocGFyYW1zLCBzdWNjZXNzLCBvcHRpb25zKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGUocGFyYW1zLCBzdWNjZXNzLCBvcHRpb25zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgdXBkYXRlKGZvcm0sIHN1Y2Nlc3MsIG9wdGlvbnM/OiBhbnkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zdEZvcm0oe1xuICAgICAgICAgICAgdXJsOiAnY2FsYnVpbGRlci9lbGVtZW50L3VwZGF0ZScsXG4gICAgICAgICAgICBkYXRhOiBmb3JtLFxuICAgICAgICAgICAgc3VjY2VzczogKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50ICYmIGV2ZW50LnV1aWQpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5kZXhFdmVudChldmVudCk7XG4gICAgICAgICAgICAgICAgc3VjY2VzcyAmJiBzdWNjZXNzKGV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcmV2aWV3VXBkYXRlKGZvcm0sIHN1Y2Nlc3MsIG9wdGlvbnM/OiBhbnkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zdEZvcm0oe1xuICAgICAgICAgICAgdXJsOiAnY2FsYnVpbGRlci9yZXZpZXd1cGRhdGUnLFxuICAgICAgICAgICAgZGF0YTogZm9ybSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChldmVudCAmJiBldmVudC51dWlkKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmluZGV4RXZlbnQoZXZlbnQpO1xuICAgICAgICAgICAgICAgIHN1Y2Nlc3MgJiYgc3VjY2VzcyhldmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIG93bmVyUmV2aWV3VXBkYXRlKGZvcm0sIHN1Y2Nlc3MsIG9wdGlvbnM/OiBhbnkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zdEZvcm0oe1xuICAgICAgICAgICAgdXJsOiAnY2FsYnVpbGRlci9vd25lci9yZXZpZXd1cGRhdGUnLFxuICAgICAgICAgICAgZGF0YTogZm9ybSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChldmVudCAmJiBldmVudC51dWlkKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmluZGV4RXZlbnQoZXZlbnQpO1xuICAgICAgICAgICAgICAgIHN1Y2Nlc3MgJiYgc3VjY2VzcyhldmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHJlbW92ZShwYXJhbXMsIGNhbGxiYWNrLCBvcHRpb25zPzogYW55KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbmRSZXF1ZXN0KHtcbiAgICAgICAgICAgIHVybDogJ2NhbGJ1aWxkZXIvZWxlbWVudC9kZWxldGUnLFxuICAgICAgICAgICAgZGF0YTogcGFyYW1zLFxuICAgICAgICAgICAgc3VjY2VzczogY2FsbGJhY2tcbiAgICAgICAgfSwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgY2FuY2VsKHBhcmFtcywgc3VjY2Vzcywgb3B0aW9ucz86IGFueSkge1xuICAgICAgICBsZXQgb3JnYW5JZCA9IHBhcmFtcyAmJiBwYXJhbXMub3JnaWQgfHwgdGhpcy5nZXRPcmdJZCgpO1xuICAgICAgICB0aGlzLmxvYWRSb2xlKG9yZ2FuSWQsKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNSZXZpZXdlcihvcmdhbklkKSkge1xuICAgICAgICAgICAgICAgIHRoaXMucmV2aWV3Q2FuY2VsKHBhcmFtcywgc3VjY2Vzcywgb3B0aW9ucyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaXNPd25SZXZpZXdlcihvcmdhbklkKSkge1xuICAgICAgICAgICAgICAgIHRoaXMub3duZXJSZXZpZXdDYW5jZWwocGFyYW1zLCBzdWNjZXNzLCBvcHRpb25zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgLy8gZWxlbWVudCwgbWVtYmVyc1xuICAgIHJldmlld05vdGlmeShwYXJhbXMsIHN1Y2Nlc3MsIG9wdGlvbnM/OiBhbnkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VuZFJlcXVlc3Qoe1xuICAgICAgICAgICAgdHlwZTogJ3Bvc3QnLFxuICAgICAgICAgICAgdXJsOiAnY2FsYnVpbGRlci9yZXZpZXdub3RpZnknLFxuICAgICAgICAgICAgZGF0YTogcGFyYW1zLFxuICAgICAgICAgICAgc3VjY2Vzczogc3VjY2Vzc1xuICAgICAgICB9LCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICByZXZpZXdDYW5jZWwocGFyYW1zLCBzdWNjZXNzLCBvcHRpb25zPzogYW55KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbmRSZXF1ZXN0KHtcbiAgICAgICAgICAgIHVybDogJ2NhbGJ1aWxkZXIvcmV2aWV3Y2FuY2VsJyxcbiAgICAgICAgICAgIGRhdGE6IHBhcmFtcyxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChldmVudCAmJiBldmVudC51dWlkKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmluZGV4RXZlbnQoZXZlbnQpO1xuICAgICAgICAgICAgICAgIHN1Y2Nlc3MgJiYgc3VjY2VzcyhldmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIG93bmVyUmV2aWV3Q2FuY2VsKHBhcmFtcywgc3VjY2Vzcywgb3B0aW9ucz86IGFueSkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZW5kUmVxdWVzdCh7XG4gICAgICAgICAgICB1cmw6ICdjYWxidWlsZGVyL293bmVyL3Jldmlld2NhbmNlbCcsXG4gICAgICAgICAgICBkYXRhOiBwYXJhbXMsXG4gICAgICAgICAgICBzdWNjZXNzOiAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQgJiYgZXZlbnQudXVpZClcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmRleEV2ZW50KGV2ZW50KTtcbiAgICAgICAgICAgICAgICBzdWNjZXNzICYmIHN1Y2Nlc3MoZXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBkZWxldGVBdHRhY2htZW50KHBhcmFtcywgc3VjY2Vzcywgb3B0aW9ucz86IGFueSkge1xuICAgICAgICAvKipcbiAgICAgICAgICogZmlsZUlEOiAnaWQxLGlkMidcbiAgICAgICAgICogZWxlbWVudDogJ3V1aWQnXG4gICAgICAgICAqL1xuICAgICAgICByZXR1cm4gdGhpcy5zZW5kUmVxdWVzdCh7XG4gICAgICAgICAgICB0eXBlOiAncG9zdCcsXG4gICAgICAgICAgICB1cmw6ICdjYWxidWlsZGVyL2ZpbGUvZGVsZXRlJyxcbiAgICAgICAgICAgIGRhdGE6IHBhcmFtcyxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIHN1Y2Nlc3MgJiYgc3VjY2Vzcyh0aGlzLmluZGV4RXZlbnQoZXZlbnQpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgb3B0aW9ucyk7XG4gICAgfVxuXG5cbiAgICBsb2FkT3JnYW5NZW1iZXJzKG9yZ2FuSWQ6IHN0cmluZywgY2FsbGJhY2s6IEZ1bmN0aW9uLCBvcHRpb25zPzogYW55KSB7XG4gICAgICAgIG9yZ2FuSWQgPSBvcmdhbklkIHx8IHRoaXMuZ2V0T3JnSWQoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VhcmNoQXR0ZW5kZWUoe29yZ2lkOiBvcmdhbklkfSwgY2FsbGJhY2ssIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHNlYXJjaEF0dGVuZGVlKHBhcmFtcywgc3VjY2Vzcywgb3B0aW9ucz86IGFueSkge1xuICAgICAgICB0aGlzLl9zZWFyY2hBdHRlbmRlZShwYXJhbXMsIGZ1bmN0aW9uIChtZW1iZXJzKSB7XG4gICAgICAgICAgICBtZW1iZXJzLnNvcnQoKGEsIGIpID0+IGEuZnVsbG5hbWUubG9jYWxlQ29tcGFyZShiLmZ1bGxuYW1lKSk7XG4gICAgICAgICAgICBzdWNjZXNzKG1lbWJlcnMpO1xuICAgICAgICB9LCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBfc2VhcmNoQXR0ZW5kZWUocGFyYW1zLCBzdWNjZXNzLCBvcHRpb25zPzogYW55KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbmRSZXF1ZXN0KHtcbiAgICAgICAgICAgIHVybDogJ2NhbGJ1aWxkZXIvYXR0ZW5kZWUvc2VhcmNoJyxcbiAgICAgICAgICAgIGRhdGE6IHBhcmFtcyxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IG1lbWJlcnMgPSBkYXRhICYmIGRhdGEuZWxlbWVudHMgfHwgW107XG4gICAgICAgICAgICAgICAgbWVtYmVycyA9IG1lbWJlcnMuZmlsdGVyKChpdGVtKSA9PiAhaXRlbS5hbGlhcyk7XG4gICAgICAgICAgICAgICAgbWVtYmVycy5mb3JFYWNoKChtZW1iZXIpID0+IHRoaXMuX2luZGV4QWNjb3VudChtZW1iZXIpKTtcbiAgICAgICAgICAgICAgICBzdWNjZXNzKG1lbWJlcnMpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc3VjY2VzcyhbXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIG9wdGlvbnMsIHRydWUpO1xuICAgIH1cblxuICAgIF9pbmRleEFjY291bnQoYWNjb3VudCkge1xuICAgICAgICAvLyBSZW1vdmUgc3VmZml4IGVtYWlsIGJlZm9yZSBzZWFyY2ggdXNlciBcImJpbmhAYmluaGRpbmguZ292LnZuXCJcbiAgICAgICAgLy8gZG9uJ3Qgc2VhcmNoIG9uIHN1ZmZpeCBcIkBiaW5oZGluaC5nb3Yudm5cIlxuICAgICAgICBhY2NvdW50WydfaW5kZXgnXSA9IHZuVG9MYXRpbihhY2NvdW50LmZ1bGxuYW1lLnRvTG93ZXJDYXNlKCkpICsgJyAnICtcbiAgICAgICAgICAgIGFjY291bnQudXNlcm5hbWUuc3BsaXQoJ0AnKVswXTtcbiAgICAgICAgYWNjb3VudC5kaXNwbGF5ID0gdGhpcy5pbnNlcnRQcmVmaXhBdHRlbmRlZShhY2NvdW50LmZ1bGxuYW1lIHx8IGFjY291bnQudXNlcm5hbWUpO1xuICAgICAgICByZXR1cm4gYWNjb3VudDtcbiAgICB9XG5cbiAgICBsb2FkRGVwYXJ0bWVudHMocGFyYW1zLCBjYWxsYmFjaywgb3B0aW9ucz86IGFueSkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZW5kUmVxdWVzdCh7XG4gICAgICAgICAgICB1cmw6ICdjYWxidWlsZGVyL2RlcGFydG1lbnQvbGlzdCcsXG4gICAgICAgICAgICBkYXRhOiBwYXJhbXMsXG4gICAgICAgICAgICBzdWNjZXNzOiAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgIGRhdGEgPSBkYXRhICYmIGRhdGEuaXRlbXMgfHwgW107XG4gICAgICAgICAgICAgICAgZGF0YS5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhLm9yZGVyIC0gYi5vcmRlcjtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhkYXRhKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvcjogKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKFtdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgb3B0aW9ucywgdHJ1ZSk7XG4gICAgfVxuXG4gICAgZ2V0TXlPcmcoY2FsbGJhY2ssIG9wdGlvbnM/OiBhbnkpIHtcbiAgICAgICAgbGV0IGtleUNhY2hlID0gJ2NhbF9teV9vcmdhbnMnO1xuXG4gICAgICAgIC8vIFJlbW92ZSBkYXRhIHVudXNlZCBwcmV2IHZlcnNpb25cbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oa2V5Q2FjaGUpO1xuXG4gICAgICAgIGtleUNhY2hlICs9IGlOZXQudXNlcmNvZGU7XG5cbiAgICAgICAgdGhpcy5fbXlPcmdhbnMgPSB0aGlzLl9teU9yZ2Fucy5sZW5ndGggJiYgdGhpcy5fbXlPcmdhbnMgfHwgdGhpcy5jYWNoZVNlc3Npb25TdG9yYWdlKGtleUNhY2hlKSB8fCBbXTtcbiAgICAgICAgaWYgKHRoaXMuX215T3JnYW5zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayh0aGlzLl9teU9yZ2Fucyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZW5kUmVxdWVzdCh7XG4gICAgICAgICAgICB1cmw6ICdwbHVnaW4vb3JnYW5pemF0aW9uL2xpc3QnLFxuICAgICAgICAgICAgc3VjY2VzczogKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgb3JnYW5zID0gdGhpcy5fY29udmVydE9yZyhkYXRhICYmIGRhdGEuZWxlbWVudHMgfHwgW10pO1xuICAgICAgICAgICAgICAgIGlmIChvcmdhbnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBvcmdhbnMgPSB0aGlzLnZpc2libGVNeU9yZ2FucyhvcmdhbnMpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9teU9yZ2FucyA9IG9yZ2FucztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWNoZVNlc3Npb25TdG9yYWdlKGtleUNhY2hlLCBvcmdhbnMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYWxsYmFjayhvcmdhbnMpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yOiAoKSA9PiBjYWxsYmFjayhbXSlcbiAgICAgICAgfSwgb3B0aW9ucywgdHJ1ZSk7XG5cbiAgICB9XG5cbiAgICB2aXNpYmxlTXlPcmdhbnMob3JnYW5zKSB7XG4gICAgICAgIHJldHVybiBvcmdhbnMuZmlsdGVyKChvcmdhbikgPT4ge1xuICAgICAgICAgICAgbGV0IF9vcmdhbiA9IHRoaXMuZ2V0T3JnQnlJZChvcmdhbi5maXJtVVVJRCk7XG4gICAgICAgICAgICByZXR1cm4gX29yZ2FuICYmICEhX29yZ2FuLmdyb3VwVHlwZTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0QWxsT3JnKGNhbGxiYWNrOiBhbnksIG9wdGlvbnM/OiBhbnkpOiBhbnkge1xuICAgICAgICBsZXQga2V5Q2FjaGUgPSAnY2FsX29yZ2FuX2xpc3QnO1xuXG4gICAgICAgIC8vIFJlbW92ZSBkYXRhIHVudXNlZCBwcmV2IHZlcnNpb25cbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oa2V5Q2FjaGUpO1xuXG4gICAgICAgIGtleUNhY2hlICs9IGlOZXQudXNlcmNvZGU7XG5cbiAgICAgICAgdGhpcy5fb3JnYW5zID0gdGhpcy5fb3JnYW5zLmxlbmd0aCAmJiB0aGlzLl9vcmdhbnMgfHwgdGhpcy5jYWNoZVNlc3Npb25TdG9yYWdlKGtleUNhY2hlKSB8fCBbXTtcbiAgICAgICAgLy8gQ2hlY2sgYWxsIG9yZyBpcyBjYWNoZWRcbiAgICAgICAgaWYgKHRoaXMuX29yZ2Fucy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4gY2FsbGJhY2sodGhpcy5fb3JnYW5zKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5zZW5kUmVxdWVzdCh7XG4gICAgICAgICAgICBkYXRhOiB7cGFnZVNpemU6IC0xfSxcbiAgICAgICAgICAgIHVybDogJ3BsdWdpbi9vcmdhbml6YXRpb24vc2VhcmNoJyxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IG9yZ2FucyA9IHRoaXMuX2NvbnZlcnRPcmcoZGF0YSAmJiBkYXRhLml0ZW1zIHx8IFtdKTtcbiAgICAgICAgICAgICAgICBpZiAob3JnYW5zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gT25seSBnZXQgb3JnYW4gaGFzIGdyb3VwVHlwZVxuICAgICAgICAgICAgICAgICAgICBvcmdhbnMgPSB0aGlzLnZpc2libGVPcmdhbnMob3JnYW5zKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fb3JnYW5zID0gb3JnYW5zO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhY2hlU2Vzc2lvblN0b3JhZ2Uoa2V5Q2FjaGUsIHRoaXMuX29yZ2Fucyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKG9yZ2Fucyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3I6ICgpID0+IGNhbGxiYWNrKFtdKVxuICAgICAgICB9LCBvcHRpb25zLCB0cnVlKTtcbiAgICB9XG5cbiAgICB2aXNpYmxlT3JnYW5zKG9yZ2Fucykge1xuICAgICAgICByZXR1cm4gb3JnYW5zLmZpbHRlcigob3JnYW4pID0+ICEhb3JnYW4uZ3JvdXBUeXBlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9sb2FkT3JnYW5zKGNhbGxiYWNrLCBvcHRpb25zPzogYW55KSB7XG4gICAgICAgIGlmICh0aGlzLl9vcmdhbnMgJiYgdGhpcy5fb3JnYW5zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKHRoaXMuX29yZ2Fucy5zbGljZSgpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0QWxsT3JnKChvcmdhbnMpID0+IHtcblxuICAgICAgICAgICAgICAgIC8vIERldGVjdCB1c2VyIGxvZ2luXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkUm9sZSgnJywgKHJvbGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0F1dGggPSAhIXJvbGUuaXNBdXRoO1xuICAgICAgICAgICAgICAgICAgICBpZiAocm9sZS5pc0F1dGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0TXlPcmcoKG15T3JnYW5zKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gTW92ZSBteSBvcmdhbnMgdG8gZmlyc3RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gbXlPcmdhbnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG15T3JnYW4gPSBteU9yZ2Fuc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBvcmdhbnMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvcmdhbiA9IG9yZ2Fuc1tqXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcmdhbi5maXJtVVVJRCA9PT0gbXlPcmdhbi5maXJtVVVJRCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9yZ2Fucy5zcGxpY2UoaiwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3JnYW4ubXlPcmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9yZ2Fucy51bnNoaWZ0KG9yZ2FuKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhvcmdhbnMpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKG9yZ2Fucyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCBvcHRpb25zKTtcblxuICAgICAgICAgICAgfSwgb3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRUcmVlT3JnKGNhbGxiYWNrLCBkb21haW4/OiBhbnkpIHtcbiAgICAgICAgdGhpcy5fbG9hZE9yZ2FucygoZGF0YSkgPT4ge1xuICAgICAgICAgICAgbGV0IHRyZWU6IGFueSA9IFtdO1xuXG4gICAgICAgICAgICAvLyBTZXQgY2hpbGRyZW4gaXMgZW1wdHlcbiAgICAgICAgICAgIGRhdGEuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgIGl0ZW0uY2hpbGRyZW4gPSBbXTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBCdWlsZCB0cmVlIG9yZyBsaXN0XG4gICAgICAgICAgICBkYXRhLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5wYXJlbnRJRCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcGFyZW50T3JnYW4gPSB0aGlzLmdldE9yZ0J5SWQoaXRlbS5wYXJlbnRJRCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJlbnRPcmdhbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50T3JnYW4uY2hpbGRyZW4ucHVzaChpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRyZWUucHVzaChpdGVtKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdHJlZS5kYXRhID0gZGF0YTtcbiAgICAgICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKHRyZWUpO1xuICAgICAgICB9LCBkb21haW4pO1xuICAgIH1cblxuICAgIGluZGV4T3JnU2VhcmNoKGl0ZW0/OiBhbnkpIHtcbiAgICAgICAgaXRlbS5faW5kZXggPSB2blRvTGF0aW4oW2l0ZW0uZmlybU5hbWUsIGl0ZW0uZmlybVVVSUQsIGl0ZW0uZmlybVByZWZpeF0uam9pbignICcpLnRvTG93ZXJDYXNlKCkpO1xuICAgIH1cblxuICAgIGlzTXlPcmcob3JnaWQ/OiBzdHJpbmcpIHtcbiAgICAgICAgbGV0IG9yZyA9IHRoaXMuZ2V0T3JnQnlJZChvcmdpZCk7XG4gICAgICAgIHJldHVybiBvcmcgJiYgb3JnLm15T3JnO1xuICAgIH1cblxuICAgIGxvYWRFdmVudChwYXJhbXMsIGNhbGxiYWNrLCBvcHRpb25zPzogYW55KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbmRSZXF1ZXN0KHtcbiAgICAgICAgICAgIHR5cGU6ICdwb3N0JyxcbiAgICAgICAgICAgIHVybDogJ2NhbGJ1aWxkZXIvZWxlbWVudC9sb2FkJyxcbiAgICAgICAgICAgIGRhdGE6IHBhcmFtcyxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFkYXRhIHx8ICFkYXRhLnV1aWQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gRXZlbnQgbm90IGZvdW5kLCB0cnkgdG8gbG9hZCByZXZpZXcgZXZlbnRcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkUm9sZShwYXJhbXMub3JnaWQsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzUmV2aWV3ZXIocGFyYW1zLm9yZ2lkKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZEV2ZW50UmV2aWV3KHBhcmFtcywgY2FsbGJhY2ssIG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjayhkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5pbmRleEV2ZW50KGRhdGEpO1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKGRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICB1cGRhdGVTdGF0ZShwYXJhbXMsIGNhbGxiYWNrLCBvcHRpb25zPzogYW55KSB7XG4gICAgICAgIGlmIChwYXJhbXMubm90ZXMpIHtcbiAgICAgICAgICAgIHBhcmFtcy5ub3RlcyA9IHRoaXMuZm9ybWF0VGV4dFVwZGF0ZShwYXJhbXMubm90ZXMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmxvYWRFdmVudChwYXJhbXMsIGNhbGxiYWNrLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBsb2FkRXZlbnRSZXZpZXcocGFyYW1zLCBzdWNjZXNzLCBvcHRpb25zPzogYW55KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbmRSZXF1ZXN0KHtcbiAgICAgICAgICAgIHVybDogJ2NhbGJ1aWxkZXIvcmV2aWV3bG9hZCcsXG4gICAgICAgICAgICBkYXRhOiBwYXJhbXMsXG4gICAgICAgICAgICBzdWNjZXNzOiAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQgJiYgZXZlbnQudXVpZClcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmRleEV2ZW50KGV2ZW50KTtcbiAgICAgICAgICAgICAgICBzdWNjZXNzICYmIHN1Y2Nlc3MoZXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBsb2FkR3JvdXBFdmVudChwYXJhbXMsIHN1Y2Nlc3MsIG9wdGlvbnM/OiBhbnkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VuZFJlcXVlc3Qoe1xuICAgICAgICAgICAgdXJsOiAnY2FsYnVpbGRlci9lbGVtZW50L2dyb3VwJyxcbiAgICAgICAgICAgIGRhdGE6IHBhcmFtcyxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IChkYXRhKSA9PiBzdWNjZXNzKHRoaXMubW9kaWZ5RXZlbnQoZGF0YSAmJiBkYXRhLml0ZW1zIHx8IFtdKSlcbiAgICAgICAgfSwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgbG9hZE9yZ0V2ZW50cyhwYXJhbXMsIGNhbGxiYWNrLCBvcHRpb25zKSB7XG4gICAgICAgIHRoaXMuX2xvYWRPbkRpZmZlclllYXIodGhpcy5fbG9hZE9yZ0V2ZW50cywgcGFyYW1zLCBjYWxsYmFjaywgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgX2xvYWRPcmdFdmVudHMocGFyYW1zLCBjYWxsYmFjaywgb3B0aW9ucykge1xuICAgICAgICByZXR1cm4gdGhpcy5zZW5kUmVxdWVzdCh7XG4gICAgICAgICAgICB0eXBlOiAncG9zdCcsXG4gICAgICAgICAgICB1cmw6ICdjYWxidWlsZGVyL21haW5ib2FyZC92aWV3JyxcbiAgICAgICAgICAgIGRhdGE6IHBhcmFtcyxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IChkYXRhKSA9PiBjYWxsYmFjayh0aGlzLm1vZGlmeUV2ZW50KGRhdGEgJiYgZGF0YS5pdGVtcyB8fCBbXSkpXG4gICAgICAgIH0sIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIGxvYWRDb21tdW5pdHlFdmVudHMocGFyYW1zLCBjYWxsYmFjaywgb3B0aW9ucykge1xuICAgICAgICB0aGlzLl9sb2FkT25EaWZmZXJZZWFyKHRoaXMuX2xvYWRDb21tdW5pdHlFdmVudHMsIHBhcmFtcywgY2FsbGJhY2ssIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIF9sb2FkQ29tbXVuaXR5RXZlbnRzKHBhcmFtcywgY2FsbGJhY2ssIG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VuZFJlcXVlc3Qoe1xuICAgICAgICAgICAgdHlwZTogJ3Bvc3QnLFxuICAgICAgICAgICAgdXJsOiAnY2FsYnVpbGRlci9tYWluYm9hcmQvcHVibGlzaGVkJyxcbiAgICAgICAgICAgIGRhdGE6IHBhcmFtcyxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IChkYXRhKSA9PiBjYWxsYmFjayh0aGlzLm1vZGlmeUV2ZW50KGRhdGEgJiYgZGF0YS5pdGVtcyB8fCBbXSkpLFxuICAgICAgICAgICAgdXNlT3JnSWQ6IHRydWVcbiAgICAgICAgfSwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgbG9hZEFsbFB1Ymxpc2hFdmVudHMocGFyYW1zLCBjYWxsYmFjaywgb3B0aW9ucykge1xuICAgICAgICB0aGlzLl9sb2FkT25EaWZmZXJZZWFyKHRoaXMuX2xvYWRBbGxQdWJsaXNoRXZlbnRzLCBwYXJhbXMsIGNhbGxiYWNrLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBfbG9hZEFsbFB1Ymxpc2hFdmVudHMocGFyYW1zLCBjYWxsYmFjaywgb3B0aW9ucykge1xuICAgICAgICByZXR1cm4gdGhpcy5zZW5kUmVxdWVzdCh7XG4gICAgICAgICAgICB0eXBlOiAncG9zdCcsXG4gICAgICAgICAgICB1cmw6ICdjYWxidWlsZGVyL21haW5ib2FyZC9wdWJsaXNoZWQnLFxuICAgICAgICAgICAgZGF0YTogcGFyYW1zLFxuICAgICAgICAgICAgc3VjY2VzczogKGRhdGEpID0+IGNhbGxiYWNrKHRoaXMubW9kaWZ5RXZlbnQoZGF0YSAmJiBkYXRhLml0ZW1zIHx8IFtdKSksXG4gICAgICAgICAgICByZW1vdmVPcmdJZDogdHJ1ZVxuICAgICAgICB9LCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBsb2FkUHVibGlzaEV2ZW50cyhwYXJhbXMsIGNhbGxiYWNrOiBGdW5jdGlvbiwgb3B0aW9ucz86IGFueSkge1xuICAgICAgICAvLyBMb2FkIHJvbGVcbiAgICAgICAgdGhpcy5sb2FkUm9sZShwYXJhbXMub3JnaWQsICAoKSA9PiB7XG4gICAgICAgICAgICAvLyBSZXZpZXdlclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNNeU9yZyhwYXJhbXMub3JnaWQpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkT3JnRXZlbnRzKHBhcmFtcywgY2FsbGJhY2ssIG9wdGlvbnMpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRDb21tdW5pdHlFdmVudHMocGFyYW1zLCBjYWxsYmFjaywgb3B0aW9ucyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIGdldFJldmlld0V2ZW50cyhwYXJhbXMsIGNhbGxiYWNrLCBvcHRpb25zKSB7XG4gICAgICAgIHRoaXMuX2xvYWRPbkRpZmZlclllYXIodGhpcy5fZ2V0UmV2aWV3RXZlbnRzLCBwYXJhbXMsIGNhbGxiYWNrLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBfZ2V0UmV2aWV3RXZlbnRzKHBhcmFtcywgY2FsbGJhY2ssIG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VuZFJlcXVlc3Qoe1xuICAgICAgICAgICAgdHlwZTogJ3Bvc3QnLFxuICAgICAgICAgICAgdXJsOiAnY2FsYnVpbGRlci9yZXZpZXdsaXN0JyxcbiAgICAgICAgICAgIGRhdGE6IHBhcmFtcyxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IChkYXRhKSA9PiBjYWxsYmFjayh0aGlzLm1vZGlmeUV2ZW50KGRhdGEgJiYgZGF0YS5pdGVtcyB8fCBbXSkpXG4gICAgICAgIH0sIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIGdldFZpZXdFdmVudHMocGFyYW1zLCBjYWxsYmFjaywgb3B0aW9ucykge1xuICAgICAgICB0aGlzLl9sb2FkT25EaWZmZXJZZWFyKHRoaXMuX2dldFZpZXdFdmVudHMsIHBhcmFtcywgY2FsbGJhY2ssIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIF9nZXRWaWV3RXZlbnRzKHBhcmFtcywgY2FsbGJhY2ssIG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VuZFJlcXVlc3Qoe1xuICAgICAgICAgICAgdHlwZTogJ3Bvc3QnLFxuICAgICAgICAgICAgdXJsOiAnY2FsYnVpbGRlci92aWV3bGlzdCcsXG4gICAgICAgICAgICBkYXRhOiBwYXJhbXMsXG4gICAgICAgICAgICBzdWNjZXNzOiAoZGF0YSkgPT4gY2FsbGJhY2sodGhpcy5tb2RpZnlFdmVudChkYXRhICYmIGRhdGEuaXRlbXMgfHwgW10pKVxuICAgICAgICB9LCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICByZXZpZXdTZWFyY2hFdmVudHMocGFyYW1zLCBjYWxsYmFjaywgb3B0aW9ucykge1xuICAgICAgICB0aGlzLl9sb2FkT25EaWZmZXJZZWFyKHRoaXMuX3Jldmlld1NlYXJjaEV2ZW50cywgcGFyYW1zLCBjYWxsYmFjaywgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgLy8gbWVtYmVyczogXCIsLFwiXG4gICAgX3Jldmlld1NlYXJjaEV2ZW50cyhwYXJhbXMsIGNhbGxiYWNrLCBvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbmRSZXF1ZXN0KHtcbiAgICAgICAgICAgIHR5cGU6ICdwb3N0JyxcbiAgICAgICAgICAgIHVybDogJ2NhbGJ1aWxkZXIvcmV2aWV3c2VhcmNoJyxcbiAgICAgICAgICAgIGRhdGE6IHBhcmFtcyxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IChkYXRhKSA9PiBjYWxsYmFjayh0aGlzLm1vZGlmeUV2ZW50KGRhdGEgJiYgZGF0YS5pdGVtcyB8fCBbXSkpXG4gICAgICAgIH0sIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIGdldE93bkV2ZW50cyhwYXJhbXMsIGNhbGxiYWNrLCBvcHRpb25zPzogYW55KSB7XG4gICAgICAgIHRoaXMuX2xvYWRPbkRpZmZlclllYXIodGhpcy5fZ2V0T3duRXZlbnRzLCBwYXJhbXMsIGNhbGxiYWNrLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBfZ2V0T3duRXZlbnRzKHBhcmFtcywgY2FsbGJhY2ssIG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VuZFJlcXVlc3Qoe1xuICAgICAgICAgICAgdHlwZTogJ3Bvc3QnLFxuICAgICAgICAgICAgdXJsOiAnY2FsYnVpbGRlci9lbGVtZW50L2xpc3QnLFxuICAgICAgICAgICAgZGF0YTogcGFyYW1zLFxuICAgICAgICAgICAgc3VjY2VzczogKGRhdGEpID0+IGNhbGxiYWNrKHRoaXMubW9kaWZ5RXZlbnQoZGF0YSAmJiBkYXRhLml0ZW1zIHx8IFtdKSlcbiAgICAgICAgfSwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgZ2V0TGlzdEV2ZW50cyhwYXJhbXM6IGFueSwgY2FsbGJhY2s6IGFueSwgb3B0aW9ucz86IGFueSk6IGFueSB7XG4gICAgICAgIGxldCBwcm9taXNlcyA9IFtdO1xuICAgICAgICBwYXJhbXMub3JnaWQgPSBwYXJhbXMub3JnaWQgfHwgdGhpcy5nZXRPcmdJZCgpO1xuXG4gICAgICAgIC8vIExvYWQgcmV2aWV3IGV2ZW50XG4gICAgICAgIHRoaXMubG9hZFJvbGUocGFyYW1zLm9yZ2lkLCAoKSA9PiB7XG4gICAgICAgICAgICAvLyBNeSBldmVudHNcbiAgICAgICAgICAgIHByb21pc2VzLnB1c2gobmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgX29wdGlvbnMgPSAkLmV4dGVuZCh7fSwgb3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgX29wdGlvbnMuZXJyb3IgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoW10pO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRPd25FdmVudHMocGFyYW1zLCByZXNvbHZlLCBfb3B0aW9ucyk7XG4gICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmlzUmV2aWV3ZXIocGFyYW1zLm9yZ2lkKSkge1xuICAgICAgICAgICAgICAgIC8vIFJldmlld2VyXG4gICAgICAgICAgICAgICAgcHJvbWlzZXMucHVzaChuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgX29wdGlvbnMgPSAkLmV4dGVuZCh7fSwgb3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgIF9vcHRpb25zLmVycm9yID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShbXSk7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0UmV2aWV3RXZlbnRzKHBhcmFtcywgcmVzb2x2ZSwgX29wdGlvbnMpO1xuICAgICAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlzVmlld2VyKHBhcmFtcy5vcmdpZCkpIHtcbiAgICAgICAgICAgICAgICAvLyBWaWV3ZXJcbiAgICAgICAgICAgICAgICBwcm9taXNlcy5wdXNoKG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBfb3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICAgICAgX29wdGlvbnMuZXJyb3IgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKFtdKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRWaWV3RXZlbnRzKHBhcmFtcywgcmVzb2x2ZSwgX29wdGlvbnMpO1xuICAgICAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBMb2FkIGFsbCBwcm9taXNlc1xuICAgICAgICAgICAgUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4oICh2YWx1ZXMpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgZXZlbnRzID0gW107XG4gICAgICAgICAgICAgICAgdmFsdWVzLmZvckVhY2goKHZhbHVlKSA9PiBldmVudHMgPSBldmVudHMuY29uY2F0KHZhbHVlIHx8IFtdKSk7XG4gICAgICAgICAgICAgICAgZXZlbnRzID0gdGhpcy5yZW1vdmVFdmVudER1cGxpY2F0ZShldmVudHMpO1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHRoaXMubW9kaWZ5RXZlbnQoZXZlbnRzKSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9LCBvcHRpb25zKTtcblxuICAgIH1cblxuICAgIG1vZGlmeUV2ZW50KGV2ZW50cykge1xuICAgICAgICBpZiAoIWV2ZW50cylcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdGhpcy5yZW1vdmVFdmVudER1cGxpY2F0ZShldmVudHMpO1xuICAgICAgICBldmVudHMuZm9yRWFjaCgoaXRlbSkgPT4gdGhpcy5pbmRleEV2ZW50KGl0ZW0pKTtcbiAgICAgICAgdGhpcy5zb3J0RXZlbnRzKGV2ZW50cyk7XG4gICAgICAgIHJldHVybiBldmVudHM7XG4gICAgfVxuXG4gICAgcmVtb3ZlRXZlbnREdXBsaWNhdGUoZXZlbnRzKSB7XG4gICAgICAgIGlmIChldmVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBldmVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gaSAtIDE7IGogPj0gMDsgai0tKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChldmVudHNbaV0udXVpZCA9PT0gZXZlbnRzW2pdLnV1aWQgJiYgZXZlbnRzW2ldLmRheSA9PT0gZXZlbnRzW2pdLmRheSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC0taTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBldmVudHM7XG4gICAgfVxuXG4gICAgc29ydEV2ZW50cyhldmVudHMpIHtcbiAgICAgICAgLy8gc29ydCBieSBzdGFydCBkYXRlXG4gICAgICAgIHRoaXMuc29ydEV2ZW50U3RhcnQoZXZlbnRzKTtcbiAgICAgICAgdGhpcy5zb3J0RXZlbnRQcmlvcml0eShldmVudHMpO1xuICAgICAgICByZXR1cm4gZXZlbnRzO1xuICAgIH1cblxuICAgIHNvcnRFdmVudFN0YXJ0KGV2ZW50cykge1xuICAgICAgICB0aGlzLl9zb3J0KGV2ZW50cywgJ2Zyb20nKTtcbiAgICAgICAgcmV0dXJuIGV2ZW50cztcbiAgICB9XG5cbiAgICBzb3J0RXZlbnRQcmlvcml0eShldmVudHMpIHtcbiAgICAgICAgLy8gc29ydCBieSBwcmlvcml0eSBvbiBkYXlcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBldmVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBpdGVtID0gZXZlbnRzW2ldO1xuICAgICAgICAgICAgaXRlbS5fb3JkZXIgPSBOdW1iZXIoaXRlbS5fb3JkZXIpIHx8IDA7XG5cbiAgICAgICAgICAgIGlmIChpdGVtLl9vcmRlciA+IDApIHtcbiAgICAgICAgICAgICAgICBtb3ZlRmlyc3QoaXRlbSk7XG4gICAgICAgICAgICAgICAgaSA9IGV2ZW50cy5pbmRleE9mKGl0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gbW92ZUZpcnN0KGl0ZW0pIHtcbiAgICAgICAgICAgIGlmIChpdGVtLl9vcmRlciAhPT0gMCkge1xuICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IGV2ZW50cy5pbmRleE9mKGl0ZW0pO1xuICAgICAgICAgICAgICAgIGlmIChpbmRleCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRtcCA9IGV2ZW50c1tpbmRleCAtIDFdO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5kYXkgPT09IHRtcC5kYXkgJiYgKHRtcC5fb3JkZXIgPT09IDAgfHwgaXRlbS5fb3JkZXIgPCB0bXAuX29yZGVyKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRzW2luZGV4XSA9IHRtcDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50c1tpbmRleCAtIDFdID0gaXRlbTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vdmVGaXJzdChpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBldmVudHM7XG4gICAgfVxuXG5cbiAgICBfc29ydChhcnIsIG9yZGVyQnk/OiBhbnkpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChpID09PSAwKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICBsZXQgaXRlbSA9IGFycltpXSxcbiAgICAgICAgICAgICAgICBwcmV2ID0gYXJyW2kgLSAxXTtcblxuICAgICAgICAgICAgaWYgKGl0ZW1bb3JkZXJCeV0gPCBwcmV2W29yZGVyQnldKSB7XG4gICAgICAgICAgICAgICAgYXJyW2ldID0gcHJldjtcbiAgICAgICAgICAgICAgICBhcnJbaSAtIDFdID0gaXRlbTtcbiAgICAgICAgICAgICAgICBpIC09IDI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBrZXl3b3Jkczogc3RyaW5nW11cbiAgICBzZWFyY2hFdmVudHNCeUtleXdvcmRzKGV2ZW50cywga2V5d29yZHMpIHtcbiAgICAgICAgaWYgKGtleXdvcmRzICYmIGtleXdvcmRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHJldHVybiBldmVudHMuZmlsdGVyKChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwga2V5d29yZHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV2ZW50Ll9pbmRleC5pbmRleE9mKGtleXdvcmRzW2ldKSA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBldmVudHMuc2xpY2UoKTtcbiAgICB9XG5cbiAgICBpbmRleEV2ZW50KGV2ZW50KSB7XG4gICAgICAgIC8vIFNhdmUgZXZlbnQgd2l0aCBsaW5rIHRvIGdldCBsYXRlclxuICAgICAgICBldmVudC5vYmplY3RJZCA9IGV2ZW50LnV1aWQgKyBldmVudC5tb2RlICsgZXZlbnQuZGF5O1xuICAgICAgICB0aGlzLl9tYXBFdmVudHNbZXZlbnQub2JqZWN0SWRdID0gZXZlbnQ7XG4gICAgICAgIHRoaXMuX21hcEV2ZW50c1tldmVudC51dWlkXSA9IGV2ZW50O1xuXG4gICAgICAgIGlmICghZXZlbnQuX2luZGV4ZWQpIHtcblxuICAgICAgICAgICAgdGhpcy5pbmRleEV2ZW50TWVtYmVycyhldmVudCk7XG5cbiAgICAgICAgICAgIGlmICh3aW5kb3dbJ2JlZm9yZUluZGV4RXZlbnQnXSkge1xuICAgICAgICAgICAgICAgIHdpbmRvd1snYmVmb3JlSW5kZXhFdmVudCddKGV2ZW50KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZXZlbnQuc3ViamVjdERpc3BsYXkgPSB0aGlzLmZvcm1hdFRleHREaXNwbGF5KGV2ZW50LnN1YmplY3QgfHwgJycpO1xuICAgICAgICAgICAgZXZlbnQubG9jYXRpb25EaXNwbGF5ID0gdGhpcy5mb3JtYXRUZXh0RGlzcGxheShldmVudC5sb2NhdGlvbiB8fCAnJyk7XG5cbiAgICAgICAgICAgIHRoaXMuaW5kZXhSZXBlYXQoZXZlbnQpO1xuICAgICAgICAgICAgdGhpcy5pbmRleEV2ZW50QXR0cmlidXRlKGV2ZW50KTtcbiAgICAgICAgICAgIHRoaXMuaW5kZXhFdmVudERhdGUoZXZlbnQpO1xuICAgICAgICAgICAgdGhpcy5pbmRleEV2ZW50U2VhcmNoKGV2ZW50KTtcbiAgICAgICAgICAgIHRoaXMuaW5kZXhDdXN0b20oZXZlbnQpO1xuXG4gICAgICAgICAgICBldmVudC5jYXRlZ29yeSA9IGV2ZW50LmNhdGVnb3J5IHx8ICcnO1xuICAgICAgICAgICAgZXZlbnQuY2F0ZWdvcnlJY29uID0gQ2FsQ2F0ZWdvcnlJY29uW2V2ZW50LmNhdGVnb3J5XTtcblxuICAgICAgICAgICAgZXZlbnQuZGVwYXJ0bWVudCA9IGV2ZW50LmRlcGFydElEO1xuXG4gICAgICAgICAgICBldmVudC5faW5kZXhlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGV2ZW50O1xuICAgIH1cblxuICAgIGluZGV4RXZlbnRNZW1iZXJzKGV2ZW50KSB7XG4gICAgICAgIGxldCBvYmo6IGFueSA9IHt9O1xuXG4gICAgICAgIGZvciAobGV0IGsgaW4gQ2FsQXR0ZW5kZWVSb2xlKSB7XG4gICAgICAgICAgICBvYmpba10gPSBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGV2ZW50Lm1lbWJlcnMgPSBldmVudC5tZW1iZXJzIHx8IFtdO1xuICAgICAgICBldmVudC5hdHRlbmRlZXMgPSBbXTtcblxuICAgICAgICBldmVudC5tZW1iZXJzLmZvckVhY2goKGl0ZW0pID0+IHtcblxuICAgICAgICAgICAgaXRlbS5uYW1lID0gdGhpcy5hdHRlbmRlZURpc3BsYXkoaXRlbSk7XG4gICAgICAgICAgICBpdGVtLnZhbHVlID0gdGhpcy5hdHRlbmRlZVZhbHVlKGl0ZW0pO1xuXG4gICAgICAgICAgICAvLyBUeXBlIGF0dGVuZGVlXG4gICAgICAgICAgICBpZiAoaXRlbS5hbGlhcykge1xuICAgICAgICAgICAgICAgIGl0ZW0udHlwZSA9IENhbEF0dGVuZGVlVHlwZS5BTElBUztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXRlbS51c2VybmFtZSkge1xuICAgICAgICAgICAgICAgIGl0ZW0udHlwZSA9IENhbEF0dGVuZGVlVHlwZS5VU0VSO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpdGVtLnR5cGUgPSBDYWxBdHRlbmRlZVR5cGUuT1JHQU47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG9ialtpdGVtLnJvbGVdID0gb2JqW2l0ZW0ucm9sZV0gfHwgW107XG4gICAgICAgICAgICBvYmpbaXRlbS5yb2xlXS5wdXNoKGl0ZW0pO1xuXG4gICAgICAgICAgICBpZiAoaXRlbS5yb2xlID09PSBDYWxBdHRlbmRlZVJvbGUuQ1JFQVRPUikge1xuICAgICAgICAgICAgICAgIGV2ZW50LmNyZWF0b3IgPSBpdGVtLnVzZXJuYW1lO1xuICAgICAgICAgICAgICAgIGV2ZW50LmZ1bGxuYW1lID0gaXRlbS5mdWxsbmFtZTtcbiAgICAgICAgICAgICAgICBldmVudC5pc0NyZWF0b3IgPSB0aGlzLnVzZXJuYW1lSXNNZShldmVudC5jcmVhdG9yKTtcbiAgICAgICAgICAgICAgICBldmVudC5jcmVhdG9yU3RyID0gZXZlbnQuZnVsbG5hbWUgKyAnKCcgKyBldmVudC5jcmVhdG9yICsgJyknO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBldmVudC5hdHRlbmRlZXMucHVzaChpdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgZXZlbnQuY2hhaXJtYW5TdHIgPSB0aGlzLl9ncm91cE1lbWJlcjJTdHJpbmcob2JqLkNIQUlSTUFOKTtcbiAgICAgICAgZXZlbnQubWVtYmVyU3RyID0gdGhpcy5fZ3JvdXBNZW1iZXIyU3RyaW5nKG9iai5NRU1CRVIpO1xuXG4gICAgICAgIC8vIFRvZG86IHRlc3QgcHJlcGFyZSBzdHJcbiAgICAgICAgZXZlbnQucHJlcGFyZVN0ciA9IHRoaXMuX2dyb3VwTWVtYmVyMlN0cmluZyhvYmouUFJFUEFSRVIpO1xuICAgICAgICBldmVudC53YXRjaGVyU3RyID0gZXZlbnQub2JzZXJ2ZXJTdHIgPSB0aGlzLl9ncm91cE1lbWJlcjJTdHJpbmcob2JqLk9CU0VSVkVSKTtcblxuICAgICAgICBldmVudC5tZW1iZXJzRGVjb2RlID0gb2JqO1xuICAgIH1cblxuICAgIF9ncm91cE1lbWJlcjJTdHJpbmcobWVtYmVycykge1xuICAgICAgICBsZXQgc3RyID0gJyc7XG4gICAgICAgIGxldCBkYXRhID0gdGhpcy5ncm91cEF0dGVuZGVlQnlPcmdhbihtZW1iZXJzKTtcbiAgICAgICAgZm9yIChsZXQgayBpbiBkYXRhKSB7XG4gICAgICAgICAgICBsZXQgaXRlbXMgPSBkYXRhW2tdO1xuICAgICAgICAgICAgbGV0IG9yZ2FuID0gaXRlbXMuZmlsdGVyKChpdGVtKSA9PiBpdGVtLnR5cGUgPT09IENhbEF0dGVuZGVlVHlwZS5PUkdBTilbMF07XG4gICAgICAgICAgICBpZiAob3JnYW4pIHtcbiAgICAgICAgICAgICAgICBzdHIgKz0gJzxiPicgKyBvcmdhbi5vcmdhbk5hbWUgKyAnPC9iPjogJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFRvZG86IGNvbnNpZGVyIHRvIHVzZSB0aGlzLmJ1aWxkTWVtYmVyU2hvd1xuICAgICAgICAgICAgaXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChpdGVtLnR5cGUgIT09IENhbEF0dGVuZGVlVHlwZS5PUkdBTikge1xuICAgICAgICAgICAgICAgICAgICBzdHIgKz0gaXRlbS5uYW1lICsgJywgJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHN0ciA9IHN0ci5zbGljZSgwLCAtMik7XG4gICAgICAgICAgICBzdHIgKz0gJzxicj4nO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdHIuc2xpY2UoMCwgLTQpO1xuICAgIH1cblxuICAgIGluZGV4RXZlbnRBdHRyaWJ1dGUoZXZlbnQ/OiBhbnkpIHtcbiAgICAgICAgZm9yIChsZXQgayBpbiBldmVudC5hdHRyaWJ1dGUpIHtcbiAgICAgICAgICAgIGV2ZW50WydfJyArIGtdID0gZXZlbnQuYXR0cmlidXRlW2tdO1xuICAgICAgICB9XG4gICAgICAgIGV2ZW50Ll9vcmRlciA9IE51bWJlcihldmVudC5fb3JkZXIpIHx8IDA7XG5cbiAgICAgICAgaWYgKGV2ZW50Ll9zdWJUeXBlKSB7XG4gICAgICAgICAgICBldmVudC50eXBlID0gZXZlbnQuX3N1YlR5cGU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbml0RXZlbnQoY2FsRXZlbnQpIHtcbiAgICAgICAgY2FsRXZlbnQgPSAkLmV4dGVuZCh7fSwgY2FsRXZlbnQpO1xuICAgICAgICB0aGlzLl9pbml0RXZlbnREYXRlKGNhbEV2ZW50KTtcbiAgICAgICAgY2FsRXZlbnQuc3RhcnRUaW1lID0gY2FsRXZlbnQuZnJvbS5mb3JtYXQoJ0g6aScpO1xuICAgICAgICBjYWxFdmVudC50b1RpbWUgPSBjYWxFdmVudC50by5mb3JtYXQoJ0g6aScpO1xuICAgICAgICByZXR1cm4gY2FsRXZlbnQ7XG4gICAgfVxuXG4gICAgX2luaXRFdmVudERhdGUoZXZlbnQ6IENhbEV2ZW50IHwgYW55KSB7XG4gICAgICAgIGlmIChldmVudCkge1xuICAgICAgICAgICAgbGV0IGRhdGU7XG4gICAgICAgICAgICBpZiAoZXZlbnQgJiYgZXZlbnQudXVpZCkge1xuICAgICAgICAgICAgICAgIGRhdGUgPSBuZXcgRGF0ZShldmVudC55ZWFyLCAwLCBldmVudC5kYXkpO1xuICAgICAgICAgICAgICAgIGlmIChkYXRlLmdldFRpbWUoKSkge1xuICAgICAgICAgICAgICAgICAgICBldmVudC5mcm9tID0gbmV3IERhdGUoZGF0ZS5nZXRUaW1lKCkgKyBldmVudC5zdGFydFRpbWUgKiA2MCAqIDEwMDApO1xuICAgICAgICAgICAgICAgICAgICBldmVudC50byA9IG5ldyBEYXRlKGRhdGUuZ2V0VGltZSgpICsgZXZlbnQudG9UaW1lICogNjAgKiAxMDAwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWRhdGUgfHwgIWRhdGUuZ2V0VGltZSgpKSB7XG4gICAgICAgICAgICAgICAgZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgICAgICAgICAgZGF0ZS5zZXRIb3VycyhkYXRlLmdldEhvdXJzKCkgKyAxLCAwLCAwLCAwKTtcbiAgICAgICAgICAgICAgICBldmVudC5mcm9tID0gZGF0ZTtcbiAgICAgICAgICAgICAgICBkYXRlID0gbmV3IERhdGUoZGF0ZSk7XG4gICAgICAgICAgICAgICAgZGF0ZS5zZXRIb3VycyhkYXRlLmdldEhvdXJzKCkgKyAxKTtcbiAgICAgICAgICAgICAgICBldmVudC50byA9IGRhdGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbmRleEV2ZW50RGF0ZShldmVudCkge1xuICAgICAgICB0aGlzLl9pbml0RXZlbnREYXRlKGV2ZW50KTtcblxuICAgICAgICAvLyBhbGwgZGF5IGV2ZW50XG4gICAgICAgIGV2ZW50LmFsbERheSA9IGV2ZW50Ll9hbGxkYXkgPT09ICd0cnVlJztcblxuICAgICAgICBldmVudC50aW1lU3RyID0gdGhpcy5mb3JtYXREYXRlU3RyKGV2ZW50LmZyb20pO1xuICAgICAgICBpZiAoZXZlbnQuYWxsRGF5KSB7XG4gICAgICAgICAgICBldmVudC5zdGFydFRpbWVTdHIgPSBldmVudC50b1RpbWVTdHIgPSB0aGlzLnJlc291cmNlcy5hbGxEYXk7XG4gICAgICAgICAgICBldmVudC5ob3VyU3RyID0gdGhpcy5yZXNvdXJjZXMuYWxsRGF5O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZXZlbnQuc3RhcnRUaW1lU3RyID0gdGhpcy5mb3JtYXRUaW1lU3RyKGV2ZW50LmZyb20pO1xuICAgICAgICAgICAgZXZlbnQudG9UaW1lU3RyID0gdGhpcy5mb3JtYXRUaW1lU3RyKGV2ZW50LnRvKTtcbiAgICAgICAgICAgIGV2ZW50LmhvdXJTdHIgPSBldmVudC5zdGFydFRpbWVTdHIgKyAnIC0gJyArIGV2ZW50LnRvVGltZVN0cjtcbiAgICAgICAgfVxuXG4gICAgICAgIGV2ZW50LnRpbWVTdHIgKz0gJzsgJyArIGV2ZW50LmhvdXJTdHI7XG5cbiAgICAgICAgZXZlbnQuc3RhcnQgPSBldmVudC5mcm9tO1xuICAgICAgICBldmVudC5lbmQgPSBldmVudC50bztcblxuICAgICAgICAvLyBUaW1lIGNyZWF0ZSBhbmQgdXBkYXRlXG4gICAgICAgIGlmIChldmVudC5jcmVhdGVUaW1lKSB7XG4gICAgICAgICAgICBldmVudC5jcmVhdGVEYXRlID0gbmV3IERhdGUoZXZlbnQuY3JlYXRlVGltZSk7XG4gICAgICAgICAgICBldmVudC5jcmVhdGVEYXRlU3RyID0gdGhpcy5mb3JtYXREYXRlVGltZVN0cihldmVudC5jcmVhdGVEYXRlKTtcblxuICAgICAgICB9XG4gICAgICAgIGlmIChldmVudC51cGRhdGVUaW1lKSB7XG4gICAgICAgICAgICBldmVudC51cGRhdGVEYXRlID0gbmV3IERhdGUoZXZlbnQudXBkYXRlVGltZSk7XG4gICAgICAgICAgICBldmVudC51cGRhdGVEYXRlU3RyID0gdGhpcy5mb3JtYXREYXRlVGltZVN0cihldmVudC51cGRhdGVEYXRlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBob3VyVXBkYXRlZCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gKGV2ZW50LnVwZGF0ZVRpbWUgfHwgZXZlbnQuY3JlYXRlVGltZSk7XG4gICAgICAgIGhvdXJVcGRhdGVkIC89ICg2MCAqIDYwICogMTAwMCk7XG4gICAgICAgIGlmIChob3VyVXBkYXRlZCA8IDApIHtcbiAgICAgICAgICAgIGhvdXJVcGRhdGVkID0gMDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaG91clVwZGF0ZWQgPD0gdGhpcy5USU1FX05FV19VUERBVEUpIHtcbiAgICAgICAgICAgIGV2ZW50LnJlY2VudFVwZGF0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgZXZlbnQubGFzdFVwZGF0ZVN0ciA9IHRoaXMuZ2V0VGV4dEZvck1pbnV0ZXMoaG91clVwZGF0ZWQgKiA2MCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbmRleEV2ZW50U2VhcmNoKGV2ZW50KSB7XG5cbiAgICAgICAgLy8gSW5kZXggZGF0YSB0byBzZWFyY2hcbiAgICAgICAgZXZlbnQuX2luZGV4ID0gJyc7XG4gICAgICAgIGV2ZW50Ll9tZW1iZXJzID0gW107XG5cbiAgICAgICAgaWYgKGV2ZW50LnN1YmplY3QpIHtcbiAgICAgICAgICAgIGV2ZW50Ll9pbmRleCA9IHZuVG9MYXRpbihldmVudC5zdWJqZWN0LnRvTG93ZXJDYXNlKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSW5kZXggbG9jYXRpb24gdG8gc2VhcmNoXG4gICAgICAgIGlmIChldmVudC5sb2NhdGlvbikge1xuICAgICAgICAgICAgZXZlbnQuX2luZGV4ICs9ICcgJyArIHZuVG9MYXRpbihldmVudC5sb2NhdGlvbi50b0xvd2VyQ2FzZSgpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZXZlbnQubWVtYmVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IG1lbWJlciA9IGV2ZW50Lm1lbWJlcnNbaV07XG4gICAgICAgICAgICBpZiAobWVtYmVyLmZ1bGxuYW1lKVxuICAgICAgICAgICAgICAgIGV2ZW50Ll9pbmRleCArPSAnICcgKyB2blRvTGF0aW4obWVtYmVyLmZ1bGxuYW1lLnRvTG93ZXJDYXNlKCkpO1xuICAgICAgICAgICAgaWYgKG1lbWJlci51c2VybmFtZSkge1xuICAgICAgICAgICAgICAgIGV2ZW50Ll9pbmRleCArPSAnICcgKyBtZW1iZXIudXNlcm5hbWUudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICAgICAgICAgIC8vIGF0dGVuZGVlXG4gICAgICAgICAgICAgICAgaWYgKG1lbWJlci5yb2xlICE9PSBDYWxBdHRlbmRlZVJvbGUuQ1JFQVRPUikge1xuICAgICAgICAgICAgICAgICAgICBldmVudC5fbWVtYmVycy5wdXNoKG1lbWJlci51c2VybmFtZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gQXR0YWNobWVudHNcbiAgICAgICAgaWYgKGV2ZW50LmF0dGFjaG1lbnRzKSB7XG4gICAgICAgICAgICBldmVudC5hdHRhY2htZW50cy5mb3JFYWNoKChmaWxlKSA9PiB7XG4gICAgICAgICAgICAgICAgZmlsZS5vcmdpZCA9IGV2ZW50LmZpcm1VVUlEO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbmRleFJlcGVhdChldmVudDogYW55KSB7XG4gICAgICAgIC8vXCJGUkVRPVdFRUtMWTtVTlRJTD0yMDE3MDcwNztJTlRFUlZBTD0xO0JZREFZPU1PXCJcbiAgICAgICAgaWYgKGV2ZW50LnJydWxlKSB7XG4gICAgICAgICAgICBsZXQgb2JqOiBhbnkgPSB7fTtcbiAgICAgICAgICAgIGV2ZW50LnJydWxlLnNwbGl0KCc7JykuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgIGl0ZW0gPSBpdGVtLnNwbGl0KCc9Jyk7XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW1bMF0gPT09ICdGUkVRJykge1xuICAgICAgICAgICAgICAgICAgICBvYmoudHlwZSA9IG9iai5ycnVsZSA9IG9iai5ycm1vZGUgPSBpdGVtWzFdO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaXRlbVswXSA9PT0gJ0JZREFZJykge1xuICAgICAgICAgICAgICAgICAgICBvYmoud2tkYXlzID0gaXRlbVsxXS5zcGxpdCgnLCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKGV2ZW50LmxzdGFydCkge1xuICAgICAgICAgICAgICAgIG9iai5sc3RhcnQgPSBuZXcgRGF0ZShldmVudC5sc3RhcnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGV2ZW50LnVudGlsKSB7XG4gICAgICAgICAgICAgICAgb2JqLnVudGlsID0gbmV3IERhdGUoZXZlbnQudW50aWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZXZlbnQucmVwZWF0ID0gb2JqO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gQ3VzdG9tIGluZGV4XG4gICAgaW5kZXhDdXN0b20oZXZlbnQpIHtcblxuICAgIH1cblxuICAgIGdldEV2ZW50U3RhdHVzID0gKG1vZGUpID0+IHRoaXMucmVzb3VyY2VzLnN0YXR1c2VzW21vZGVdO1xuXG4gICAgaXNSZXZpZXdlcihvcmdpZD86IGFueSkge1xuICAgICAgICBvcmdpZCA9IG9yZ2lkIHx8IHRoaXMuZ2V0T3JnSWQoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3VzZXJSb2xlc1tvcmdpZF0gJiYgISF0aGlzLl91c2VyUm9sZXNbb3JnaWRdLnJldmlld2VyO1xuICAgIH1cblxuICAgIGlzT3duUmV2aWV3ZXIob3JnaWQ/OiBhbnkpIHtcbiAgICAgICAgb3JnaWQgPSBvcmdpZCB8fCB0aGlzLmdldE9yZ0lkKCk7XG4gICAgICAgIHJldHVybiB0aGlzLl91c2VyUm9sZXNbb3JnaWRdICYmICEhdGhpcy5fdXNlclJvbGVzW29yZ2lkXS5vd25fcmV2aWV3ZXI7XG4gICAgfVxuXG4gICAgaXNWaWV3ZXIob3JnaWQ/OiBhbnkpOiBhbnkge1xuICAgICAgICBvcmdpZCA9IG9yZ2lkIHx8IHRoaXMuZ2V0T3JnSWQoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3VzZXJSb2xlc1tvcmdpZF0gJiYgISF0aGlzLl91c2VyUm9sZXNbb3JnaWRdLnZpZXdlcjtcbiAgICB9XG5cbiAgICBnZXRRdWVyeVBhcmFtcyhxdWVyeT86IGFueSkge1xuICAgICAgICBsZXQgcGFyYW1zID0ge307XG4gICAgICAgIHF1ZXJ5ID0gcXVlcnkgfHwgbG9jYXRpb24uc2VhcmNoO1xuICAgICAgICBxdWVyeS5yZXBsYWNlKCc/JywgJycpLnNwbGl0KCcmJykuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgaWYgKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICBsZXQgZXF1YWxJbmRleCA9IGl0ZW0uaW5kZXhPZignPScpO1xuICAgICAgICAgICAgICAgIGlmIChlcXVhbEluZGV4ID4gLTEpXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtc1tpdGVtLnNsaWNlKDAsIGVxdWFsSW5kZXgpXSA9IGl0ZW0uc2xpY2UoZXF1YWxJbmRleCArIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHBhcmFtcztcbiAgICB9XG5cbiAgICBidWlsZFF1ZXJ5U3RyaW5nKHBhcmFtcz86IGFueSkge1xuICAgICAgICBsZXQgcXVlcnkgPSAnJztcbiAgICAgICAgZm9yIChsZXQgayBpbiBwYXJhbXMpIHtcbiAgICAgICAgICAgIHF1ZXJ5ICs9IGsgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQocGFyYW1zW2tdKSArICcmJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcXVlcnkuc2xpY2UoMCwgLTEpO1xuICAgIH1cblxuICAgIGdldFVzZXJBdmF0YXIodXNlcmNvZGUsIGRvbWFpbj86IGFueSkge1xuICAgICAgICByZXR1cm4gQWpheEFQSS5nZXRVcmwoJ3N5c3RlbS91c2VycHJvZmlsZS9waG90bycsIGRvbWFpbikgK1xuICAgICAgICAgICAgJz91c2VyY29kZT0nICsgdXNlcmNvZGUgKyAnJnRodW1ibmFpbD01MCc7XG4gICAgfVxuXG4gICAgZ2V0UGVybWlzc2lvbk9uRXZlbnQoZXZlbnQsIGNhbGxiYWNrOiBGdW5jdGlvbiwgY3VycmVudE9yZ2FuSWQ/OiBhbnksIG9wdGlvbnM/OiBhbnkpIHtcbiAgICAgICAgbGV0IG1vZGUgPSBldmVudC5tb2RlO1xuICAgICAgICBpZiAodGhpcy5pc090aGVyKG1vZGUpKSB7XG4gICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICghZXZlbnQudXVpZCkge1xuICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKHtcbiAgICAgICAgICAgICAgICBzYXZlOiB0cnVlLFxuICAgICAgICAgICAgICAgIHNhdmVDcmVhdGU6IHRydWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgY3VycmVudE9yZ2FuSWQgPSBjdXJyZW50T3JnYW5JZCB8fCB0aGlzLmdldE9yZ0lkKCkgfHwgZXZlbnQuZmlybVVVSUQ7XG5cbiAgICAgICAgdGhpcy5sb2FkUm9sZShjdXJyZW50T3JnYW5JZCwgKCkgPT4ge1xuXG4gICAgICAgICAgICB0aGlzLmluZGV4RXZlbnQoZXZlbnQpO1xuXG4gICAgICAgICAgICBsZXQgcGVybWlzc2lvbnM7XG4gICAgICAgICAgICBjb25zdCBjYW5SZXZpZXcgPSB0aGlzLmlzUmV2aWV3ZXIoY3VycmVudE9yZ2FuSWQpIHx8XG4gICAgICAgICAgICAgICAgKHRoaXMuaXNPd25SZXZpZXdlcihjdXJyZW50T3JnYW5JZCkgJiYgdGhpcy5jYW5Pd25SZXZpZXdFdmVudChldmVudCkpO1xuICAgICAgICAgICAgY29uc3QgY2FuUmV2aWV3VXBkYXRlID0gIXRoaXMuaXNDcmVhdGUobW9kZSkgJiYgIXRoaXMuaXNDYW5jZWwobW9kZSkgJiYgY2FuUmV2aWV3O1xuICAgICAgICAgICAgaWYgKGV2ZW50LmZpcm1VVUlEID09PSBjdXJyZW50T3JnYW5JZCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGlzRWRpdE15RXZlbnQgPSB0aGlzLmNhblVwZGF0ZU93bkV2ZW50KGV2ZW50KTtcblxuICAgICAgICAgICAgICAgIGlmIChldmVudC50eXBlID09PSBDYWxTdWJUeXBlLlBFUlNPTkFMICYmICF0aGlzLmdldENvbmZpZ1ZhbHVlKCdQRVJTT05BTF9DQU5fUFVCTElTSCcpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFBlcnNvbmFsIGNhbGVuZGFyXG4gICAgICAgICAgICAgICAgICAgIHBlcm1pc3Npb25zID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2F2ZTogaXNFZGl0TXlFdmVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZTogaXNFZGl0TXlFdmVudFxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgcGVybWlzc2lvbnMgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzYXZlOiBpc0VkaXRNeUV2ZW50IHx8IGNhblJldmlld1VwZGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFwcHJvdmU6IGNhblJldmlldyAmJiAodGhpcy5pc1NlbnQobW9kZSkgfHwgaXNFZGl0TXlFdmVudCksXG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3Q6IGNhblJldmlldyAmJiB0aGlzLmlzU2VudChtb2RlKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbmQ6IGlzRWRpdE15RXZlbnQgJiYgIWNhblJldmlldyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldmVydDogKHRoaXMuaXNTZW50KG1vZGUpICYmIGV2ZW50LmlzQ3JlYXRvcikgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoKHRoaXMuaXNDYW5jZWwobW9kZSkgfHwgdGhpcy5pc1B1Ymxpc2gobW9kZSkpICYmIGNhblJldmlldyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjYW5jZWw6IGNhblJldmlldyAmJiB0aGlzLmlzUHVibGlzaChtb2RlKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZTogaXNFZGl0TXlFdmVudFxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBFeHRlcm5hbCB1cGRhdGUgYXR0ZW5kZWVzXG4gICAgICAgICAgICAgICAgcGVybWlzc2lvbnMgPSB7fTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1B1Ymxpc2goZXZlbnQubW9kZSkgJiYgdGhpcy5oYXNGaXJtQXR0ZW5kZWUoZXZlbnQsIGN1cnJlbnRPcmdhbklkKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jYW5FeHRlcm5hbFVwZGF0ZUV2ZW50KGV2ZW50LCBjdXJyZW50T3JnYW5JZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcGVybWlzc2lvbnMgPSB7dXBkYXRlQXR0ZW5kZWU6IHRydWV9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBlcm1pc3Npb25zLnByaW50ID0gdHJ1ZTtcbiAgICAgICAgICAgIHBlcm1pc3Npb25zLmV4cG9ydEludml0YXRpb24gPSB0aGlzLmNhdElzSW52aXRhdGlvbihldmVudC5jYXRlZ29yeSkgJiYgZXZlbnQuX3RlbXBsYXRlSWQ7XG5cbiAgICAgICAgICAgIGNhbGxiYWNrKHBlcm1pc3Npb25zKTtcbiAgICAgICAgfSwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgY2FuVXBkYXRlT3duRXZlbnQoZXZlbnQ6IENhbEV2ZW50KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBldmVudC5pc0NyZWF0b3IgJiYgdGhpcy5pc0NyZWF0ZShldmVudC5tb2RlKTtcbiAgICB9XG5cbiAgICBjYW5SZXZpZXdFdmVudChldmVudDogQ2FsRXZlbnQpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNSZXZpZXdlcihldmVudC5maXJtVVVJRCk7XG4gICAgfVxuXG4gICAgY2FuT3duUmV2aWV3RXZlbnQoZXZlbnQ6IENhbEV2ZW50KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzT3duUmV2aWV3ZXIoZXZlbnQuZmlybVVVSUQpICYmIGV2ZW50LmlzQ3JlYXRvcjtcbiAgICB9XG5cbiAgICBjYW5VcGRhdGVBdHRlbmRlZShldmVudDogQ2FsRXZlbnQsIG93bk9yZ2FuSWQ6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5pc0Zpcm1FdmVudChldmVudCwgb3duT3JnYW5JZCkgJiYgKHRoaXMuY2FuVXBkYXRlT3duRXZlbnQoZXZlbnQpIHx8XG4gICAgICAgICAgICB0aGlzLmNhbk93blJldmlld0V2ZW50KGV2ZW50KSB8fFxuICAgICAgICAgICAgdGhpcy5jYW5SZXZpZXdFdmVudChldmVudCkpIDtcbiAgICB9XG5cbiAgICBjYW5FeHRlcm5hbFVwZGF0ZUV2ZW50KGV2ZW50OiBDYWxFdmVudCwgb3JnYW5JZDogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzUHVibGlzaChldmVudC5tb2RlKSAmJiAhdGhpcy5pc0Zpcm1FdmVudChldmVudCwgb3JnYW5JZCkgJiYgdGhpcy5pc1Jldmlld2VyKG9yZ2FuSWQpO1xuICAgIH1cblxuICAgIGlzRmlybUV2ZW50KGV2ZW50OiBDYWxFdmVudCwgb3duT3JnYW5JZDogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBldmVudC5maXJtVVVJRCA9PT0gb3duT3JnYW5JZDtcbiAgICB9XG5cbiAgICBpc0NyZWF0ZSA9IChtb2RlOiBudW1iZXIpID0+IG1vZGUgPT09IENhbE1vZGUuQ1JFQVRFO1xuXG4gICAgaXNQdWJsaXNoID0gKG1vZGU6IG51bWJlcikgPT4gbW9kZSA9PT0gQ2FsTW9kZS5QVUJMSVNIO1xuXG4gICAgaXNTZW50ID0gKG1vZGU6IG51bWJlcikgPT4gbW9kZSA9PT0gQ2FsTW9kZS5TRU5UO1xuXG4gICAgaXNDYW5jZWwgPSAobW9kZTogbnVtYmVyKSA9PiBtb2RlID09PSBDYWxNb2RlLkNBTkNFTDtcblxuICAgIGlzT3RoZXIgPSAobW9kZTogbnVtYmVyKSA9PiBtb2RlID09PSBDYWxNb2RlLk9USEVSO1xuXG4gICAgc2VhcmNoQW55QXR0ZW5kZWUocGFyYW1zLCBjYWxsYmFjaywgb3B0aW9ucz86IGFueSkge1xuICAgICAgICB0aGlzLnNlYXJjaFVzZXJBc0F0dGVuZGVlKHBhcmFtcywgKHVzZXJzKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNlYXJjaE9yZ2FuQXNBdHRlbmRlZShwYXJhbXMsIChvcmdzKSA9PiB7XG4gICAgICAgICAgICAgICAgb3Jncy5mb3JFYWNoKChvcmcpID0+IHVzZXJzLnB1c2gob3JnKSk7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sodXNlcnMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHNlYXJjaFVzZXJBc0F0dGVuZGVlKHBhcmFtcywgY2FsbGJhY2ssIG9wdGlvbnM/OiBhbnkpIHtcbiAgICAgICAgbGV0IG9yZ2FuSWQgPSBwYXJhbXMub3JnaWQgfHwgdGhpcy5nZXRPcmdJZCgpO1xuICAgICAgICBsZXQgb3JnYW5OYW1lID0gdGhpcy5nZXRPcmdOYW1lQnlJZChvcmdhbklkKTtcbiAgICAgICAgdGhpcy5sb2FkT3JnYW5NZW1iZXJzKG9yZ2FuSWQsIChtZW1iZXJzKSA9PiB7XG4gICAgICAgICAgICBsZXQga2V5d29yZCA9IHBhcmFtcy5rZXl3b3JkIHx8ICcnO1xuICAgICAgICAgICAgbGV0IGxpbWl0ID0gcGFyYW1zLmxpbWl0IHx8IC0xO1xuICAgICAgICAgICAgbGV0IGF0dGVuZGVlcyA9IFtdO1xuICAgICAgICAgICAga2V5d29yZCA9IHZuVG9MYXRpbihrZXl3b3JkKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtZW1iZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IG1lbWJlciA9IG1lbWJlcnNbaV07XG5cbiAgICAgICAgICAgICAgICBpZiAoIWtleXdvcmQgfHwgbWVtYmVyLl9pbmRleC5pbmRleE9mKGtleXdvcmQpID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGF0dGVuZGVlID0gdGhpcy5tZW1iZXJUb0F0dGVuZGVlKG1lbWJlcik7XG4gICAgICAgICAgICAgICAgICAgIGF0dGVuZGVlLm9yZ2FuSWQgPSBvcmdhbklkO1xuICAgICAgICAgICAgICAgICAgICBhdHRlbmRlZS5vcmdhbk5hbWUgPSBvcmdhbk5hbWU7XG4gICAgICAgICAgICAgICAgICAgIGF0dGVuZGVlcy5wdXNoKGF0dGVuZGVlKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAobGltaXQgPiAwICYmIGF0dGVuZGVlcy5sZW5ndGggPj0gbGltaXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FsbGJhY2soYXR0ZW5kZWVzKTtcbiAgICAgICAgfSwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgc2VhcmNoT3JnYW5Bc0F0dGVuZGVlKHBhcmFtcywgY2FsbGJhY2ssIG9wdGlvbnM/OiBhbnkpIHtcbiAgICAgICAgdGhpcy5sb2FkT3JnQnlLZXl3b3JkKHBhcmFtcywgKG9yZ2FucykgPT4ge1xuICAgICAgICAgICAgY2FsbGJhY2sob3JnYW5zLm1hcCgob3JnYW4pID0+IHRoaXMub3JnYW5Ub0F0dGVuZGVlKG9yZ2FuKSkpO1xuICAgICAgICB9LCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBpbnNlcnRQcmVmaXhBdHRlbmRlZShmdWxsbmFtZTogc3RyaW5nKSB7XG4gICAgICAgIGlmICh0aGlzLmdldENvbmZpZ1ZhbHVlKCdQUkVGSVhfQVRURU5ERUVfTkFNRScpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRDb25maWdWYWx1ZSgnUFJFRklYX0FUVEVOREVFX05BTUUnKSArIGZ1bGxuYW1lO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmdWxsbmFtZTtcbiAgICB9XG5cbiAgICBtZW1iZXJUb0F0dGVuZGVlKG1lbWJlcik6IENhbEF0dGVuZGVlIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHVzZXJuYW1lOiBtZW1iZXIudXNlcm5hbWUsXG4gICAgICAgICAgICBmdWxsbmFtZTogbWVtYmVyLmZ1bGxuYW1lLFxuICAgICAgICAgICAgZGlzcGxheTogdGhpcy5pbnNlcnRQcmVmaXhBdHRlbmRlZShtZW1iZXIuZnVsbG5hbWUpLFxuICAgICAgICAgICAgdHlwZTogQ2FsQXR0ZW5kZWVUeXBlLlVTRVJcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9yZ2FuVG9BdHRlbmRlZShvcmdhbik6IENhbEF0dGVuZGVlIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG9yZ2FuSWQ6IG9yZ2FuLmZpcm1VVUlELFxuICAgICAgICAgICAgb3JnYW5OYW1lOiBvcmdhbi5maXJtTmFtZSxcbiAgICAgICAgICAgIHR5cGU6IENhbEF0dGVuZGVlVHlwZS5PUkdBTlxuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWxpYXNUb0F0dGVuZGVlKGFsaWFzOiBzdHJpbmcsIG9yZ2FuSWQ6IHN0cmluZyk6IENhbEF0dGVuZGVlIHtcbiAgICAgICAgb3JnYW5JZCA9IG9yZ2FuSWQgfHwgdGhpcy5nZXRPcmdJZCgpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYWxpYXM6IGFsaWFzLFxuICAgICAgICAgICAgb3JnYW5JZDogb3JnYW5JZCxcbiAgICAgICAgICAgIG9yZ2FuTmFtZTogdGhpcy5nZXRPcmdOYW1lQnlJZChvcmdhbklkKSxcbiAgICAgICAgICAgIHR5cGU6IENhbEF0dGVuZGVlVHlwZS5BTElBU1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gU2VhcmNoIHVzZXIgYW5kIG9yZ3MgdG8gc2VsZWN0IHdoZW4gY3JlYXRlIGNhbGVuZGFyXG4gICAgbG9hZEF0dGVuZGVlQnlOYW1lKHBhcmFtcywgY2FsbGJhY2ssIG9wdGlvbnM/OiBhbnkpOiBhbnkge1xuICAgICAgICBpZiAoIXBhcmFtcyB8fCAhcGFyYW1zLmtleXdvcmQpXG4gICAgICAgICAgICByZXR1cm4gY2FsbGJhY2soW10pO1xuXG4gICAgICAgIC8vIExpbWl0IHVzZXIgc2VhcmNoXG4gICAgICAgIHBhcmFtcy5saW1pdCA9IHBhcmFtcy5saW1pdCB8fCA1O1xuXG4gICAgICAgIHRoaXMubG9hZFVzZXJCeUtleXdvcmQocGFyYW1zLCAodXNlcnMpID0+IHtcbiAgICAgICAgICAgIHRoaXMubG9hZE9yZ0J5S2V5d29yZChwYXJhbXMsIChvcmdzKSA9PiB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sodXNlcnMuY29uY2F0KG9yZ3MpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBsb2FkVXNlckJ5S2V5d29yZChwYXJhbXMsIGNhbGxiYWNrLCBvcHRpb25zPzogYW55KSB7XG4gICAgICAgIC8vIExvYWQgYWxsIHVzZXJzIGFuZCBzZWFyY2ggb24gY2xpZW50XG4gICAgICAgIHRoaXMuc2VhcmNoQXR0ZW5kZWUoe1xuICAgICAgICAgICAgb3JnaWQ6IHBhcmFtcy5vcmdpZFxuICAgICAgICB9LCAobWVtYmVycykgPT4ge1xuICAgICAgICAgICAgbGV0IHVzZXJzID0gW107XG4gICAgICAgICAgICBsZXQga2V5d29yZCA9IHZuVG9MYXRpbihwYXJhbXMua2V5d29yZC50b0xvd2VyQ2FzZSgpKTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWVtYmVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCB1c2VyID0gbWVtYmVyc1tpXTtcbiAgICAgICAgICAgICAgICBpZiAodXNlci5faW5kZXguaW5kZXhPZihrZXl3b3JkKSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHVzZXJzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogdXNlci5mdWxsbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB1c2VyLnVzZXJuYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogQ2FsQXR0ZW5kZWVUeXBlLlVTRVIsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZW1iZXI6IHVzZXJcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHVzZXJzLmxlbmd0aCA+PSBwYXJhbXMubGltaXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FsbGJhY2sodXNlcnMpO1xuICAgICAgICB9LCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBsb2FkT3JnQnlLZXl3b3JkKHBhcmFtcywgY2FsbGJhY2ssIG9wdGlvbnM/OiBhbnkpIHtcbiAgICAgICAgbGV0IGRhdGEgPSBbXTtcbiAgICAgICAgdGhpcy5fbG9hZE9yZ2Fucygob3JncykgPT4ge1xuICAgICAgICAgICAgLy8gRmlsdGVyIG9yZ3MgbWF0Y2hcbiAgICAgICAgICAgIGxldCBrZXkgPSB2blRvTGF0aW4ocGFyYW1zLmtleXdvcmQpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9yZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IG9yZ3NbaV07XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uX2luZGV4LmluZGV4T2Yoa2V5KSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGEucHVzaChpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoID49IHBhcmFtcy5saW1pdClcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhbGxiYWNrKGRhdGEpO1xuICAgICAgICB9LCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBnZXRGaWxlVXJsKGl0ZW0sIGRvbWFpbj86IHN0cmluZywgZXZlbnQ/OiBDYWxFdmVudCkge1xuICAgICAgICBpZiAoIWl0ZW0pXG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIGxldCBvcmdpZCA9IGl0ZW0ub3JnaWQgfHwgdGhpcy5nZXRPcmdJZCgpO1xuICAgICAgICBsZXQgX3JvbGUgPSB0aGlzLl91c2VyUm9sZXNbb3JnaWRdO1xuICAgICAgICBsZXQgdXJsO1xuICAgICAgICBpZiAoX3JvbGUgJiYgX3JvbGUuaXNBdXRoICYmIHRoaXMuaXNNeU9yZyhvcmdpZCkpIHtcbiAgICAgICAgICAgIHVybCA9ICdjYWxidWlsZGVyL2JpbmFyeS92aWV3JztcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmhhc0Zpcm1BdHRlbmRlZShldmVudCwgdGhpcy5nZXRPcmdJZCgpKSkge1xuICAgICAgICAgICAgb3JnaWQgPSB0aGlzLmdldE9yZ0lkKCk7XG4gICAgICAgICAgICB1cmwgPSAnY2FsYnVpbGRlci9iaW5hcnkvdmlldyc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB1cmwgPSAnY2FsYnVpbGRlci9tYWluYm9hcmQvYmluYXJ5L3ZpZXcnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmdldFVybEJ5T3JnSWQodXJsLCBvcmdpZCwgZG9tYWluKSArICc/ZmlsZUlEPScgKyBpdGVtLnV1aWQgKyAnJmVsZW1lbnQ9JyArIGl0ZW0uZm9sZGVyICsgJyZvcmdpZD0nICsgb3JnaWQ7XG4gICAgfVxuXG4gICAgZ2V0RmlsZVZpZXdVcmwoaXRlbSwgZG9tYWluPzogc3RyaW5nLCBldmVudD86IENhbEV2ZW50KSB7XG4gICAgICAgIGxldCB1cmwgPSB0aGlzLmdldEZpbGVVcmwoaXRlbSwgZG9tYWluLCBldmVudCk7XG4gICAgICAgIGlmIChpdGVtLmZpbGUgJiYgaXRlbS5maWxlLnNsaWNlKC0zKS50b0xvd2VyQ2FzZSgpID09PSBcInBkZlwiKSB7XG4gICAgICAgICAgICB1cmwgKz0gJyZ2aWV3PXBkZiZ0PScgKyBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdXJsO1xuICAgIH1cblxuICAgIGhhc0Zpcm1BdHRlbmRlZShldmVudDogQ2FsRXZlbnQsIG9yZ2FuSWQ6IHN0cmluZykge1xuICAgICAgICBpZiAoZXZlbnQgJiYgb3JnYW5JZCkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBldmVudC5tZW1iZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IG1lbWJlciA9IGV2ZW50Lm1lbWJlcnNbaV07XG4gICAgICAgICAgICAgICAgaWYgKG1lbWJlci50eXBlID09PSBDYWxBdHRlbmRlZVR5cGUuT1JHQU4gJiYgbWVtYmVyLm9yZ2FuSWQgPT09IG9yZ2FuSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0T3JnQnlVaWQodXVpZDogc3RyaW5nKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fb3JnYW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fb3JnYW5zW2ldLnV1aWQgPT09IHV1aWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fb3JnYW5zW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0T3JnQnlJZChvcmdJZDogc3RyaW5nKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fb3JnYW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fb3JnYW5zW2ldLmZpcm1VVUlEID09PSBvcmdJZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9vcmdhbnNbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRPcmdOYW1lQnlJZChvcmdJZDogc3RyaW5nKSB7XG4gICAgICAgIGxldCBvcmdhbiA9IHRoaXMuZ2V0T3JnQnlJZChvcmdJZCk7XG4gICAgICAgIHJldHVybiBvcmdhbiAmJiBvcmdhbi5maXJtTmFtZSB8fCAnJztcbiAgICB9XG5cbiAgICBnZXRPcmdCeVByZWZpeChwcmVmaXg6IHN0cmluZykge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX29yZ2Fucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHRoaXMuX29yZ2Fuc1tpXS5maXJtUHJlZml4ID09PSBwcmVmaXgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fb3JnYW5zW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0VXJsQnlPcmdJZCh1cmwsIG9yZ2lkLCBkb21haW4/OiBhbnkpIHtcbiAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLmdldE9yZ0J5SWQob3JnaWQpO1xuICAgICAgICByZXR1cm4gQWpheEFQSS5nZXRVcmwodXJsLCBkb21haW4sIGl0ZW0gJiYgaXRlbS5maXJtUHJlZml4KTtcbiAgICB9XG5cbiAgICBsb2FkUm9sZShvcmdpZCwgY2FsbGJhY2ssIG9wdGlvbnM/OiBhbnkpIHtcblxuICAgICAgICBvcmdpZCA9IG9yZ2lkIHx8IHRoaXMuZ2V0T3JnSWQoKTtcblxuICAgICAgICBpZiAodGhpcy5fdXNlclJvbGVzW29yZ2lkXSkge1xuICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKHRoaXMuX3VzZXJSb2xlc1tvcmdpZF0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZW5kUmVxdWVzdCh7XG4gICAgICAgICAgICB1cmw6IHRoaXMucm9sZVVybCxcbiAgICAgICAgICAgIGRhdGE6IHtvcmdpZDogb3JnaWR9LFxuICAgICAgICAgICAgc3VjY2VzczogKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBkYXRhID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuaXNBdXRoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl91c2VyUm9sZXNbb3JnaWRdID0gZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlOZXQudXNlcmNvZGUgPSBkYXRhLnVzZXJjb2RlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKGRhdGEpO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soe30pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvcjogKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHt9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgb3B0aW9ucywgdHJ1ZSk7XG4gICAgfVxuXG4gICAgbG9hZFJvbGVzKG9yZ2FuSWRzLCBjYWxsYmFjaywgb3B0aW9ucz86IGFueSkge1xuICAgICAgICBsZXQgcHJvbWlzZXMgPSBbXTtcbiAgICAgICAgb3JnYW5JZHMuZm9yRWFjaCgob3JnYW5JZCkgPT4ge1xuICAgICAgICAgICAgcHJvbWlzZXMucHVzaChuZXcgUHJvbWlzZSgocmVzb2x2ZSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkUm9sZShvcmdhbklkLCByZXNvbHZlLCBvcHRpb25zKTtcbiAgICAgICAgICAgIH0pKSk7XG4gICAgICAgIH0pO1xuICAgICAgICBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbigodmFsdWVzKSA9PiBjYWxsYmFjayh2YWx1ZXMpKTtcbiAgICB9XG5cbiAgICBnZW5lcmF0ZUV2ZW50V2Vla1ZpZXcoZXZlbnRzLCBkYXRlPzogYW55LCBmaXJzdERheT86IGFueSkge1xuICAgICAgICBsZXQgc2VnRXZlbnRzID0gW107XG4gICAgICAgIGxldCBzdGFydFdlZWsgPSBEYXRlVXRpbHMuZ2V0RGF0ZVN0YXJ0V2VlayhkYXRlLCBmaXJzdERheSk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNzsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgZGF5T2ZZZWFyID0gRGF0ZVV0aWxzLmRheU9mWWVhcihzdGFydFdlZWspO1xuICAgICAgICAgICAgc2VnRXZlbnRzLnB1c2godGhpcy5nZW5lcmF0ZUV2ZW50VmlldyhcbiAgICAgICAgICAgICAgICBldmVudHMuZmlsdGVyKChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXZlbnQuZGF5ID09PSBkYXlPZlllYXI7XG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgc3RhcnRXZWVrXG4gICAgICAgICAgICApKTtcbiAgICAgICAgICAgIHN0YXJ0V2Vlay5zZXREYXRlKHN0YXJ0V2Vlay5nZXREYXRlKCkgKyAxKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc2VnRXZlbnRzO1xuICAgIH1cblxuICAgIGdldExhc3RVcGRhdGVTZWdFdmVudHMoc2VnRXZlbnRzKSB7XG4gICAgICAgIGxldCBsYXN0VXBkYXRlO1xuICAgICAgICBzZWdFdmVudHMuZm9yRWFjaCgoc2VnRXZlbnQpID0+IHtcbiAgICAgICAgICAgIHNlZ0V2ZW50Lml0ZW1zLmZvckVhY2goKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGxhc3RVcGRhdGVFdmVudCA9IGV2ZW50LnVwZGF0ZURhdGUgfHwgZXZlbnQuY3JlYXRlRGF0ZTtcbiAgICAgICAgICAgICAgICBpZiAoIWxhc3RVcGRhdGUgfHwgbGFzdFVwZGF0ZSA8IGxhc3RVcGRhdGVFdmVudCkge1xuICAgICAgICAgICAgICAgICAgICBsYXN0VXBkYXRlID0gbGFzdFVwZGF0ZUV2ZW50O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGxhc3RVcGRhdGU7XG4gICAgfVxuXG4gICAgZ2VuZXJhdGVFdmVudFZpZXcoZXZlbnRzLCBkYXRlKSB7XG4gICAgICAgIGRhdGUgPSBuZXcgRGF0ZShkYXRlKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGRheTogRGF0ZVV0aWxzLmRheU9mWWVhcihkYXRlKSxcbiAgICAgICAgICAgIGRpc3BsYXk6IHRoaXMuZ2V0RGlzcGxheUJ5RGF5KGRhdGUuZ2V0RGF5KCkpLFxuICAgICAgICAgICAgZGF5U3RyOiB0aGlzLmZvcm1hdERhdGVTdHIoZGF0ZSksXG4gICAgICAgICAgICBpc1RvZGF5OiBEYXRlVXRpbHMuZGF0ZUlzVG9kYXkoZGF0ZSksXG4gICAgICAgICAgICBkYXRlOiBkYXRlLFxuICAgICAgICAgICAgaXRlbXM6IGV2ZW50c1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0RGlzcGxheUJ5RGF5KGRheT86IGFueSkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXNvdXJjZXMuZGF5c1tkYXldO1xuICAgIH1cblxuICAgIGJ1aWxkTWVtYmVycyhtZW1iZXJzOiBhbnksIHJvbGU/OiBhbnkpIHtcbiAgICAgICAgbWVtYmVycy5mb3JFYWNoKChtZW1iZXIpID0+IG1lbWJlci5yb2xlID0gcm9sZSB8fCBDYWxBdHRlbmRlZVJvbGUuTUVNQkVSKTtcbiAgICAgICAgcmV0dXJuIG1lbWJlcnM7XG4gICAgfVxuXG4gICAgZ3JvdXBBdHRlbmRlZUJ5T3JnYW4oYXR0ZW5kZWVzOiBDYWxBdHRlbmRlZVtdKSB7XG4gICAgICAgIGxldCBkYXRhID0ge307XG4gICAgICAgIGF0dGVuZGVlcy5mb3JFYWNoKGZ1bmN0aW9uIChhdHRlbmRlZSkge1xuICAgICAgICAgICAgZGF0YVthdHRlbmRlZS5vcmdhbklkXSA9IGRhdGFbYXR0ZW5kZWUub3JnYW5JZF0gfHwgW107XG4gICAgICAgICAgICBkYXRhW2F0dGVuZGVlLm9yZ2FuSWRdLnB1c2goYXR0ZW5kZWUpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuXG4gICAgZ3JvdXBBdHRlbmRlZUJ5T3JnYW5Sb2xlKGV2ZW50OiBDYWxFdmVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0ZW5kZWVzOiBDYWxBdHRlbmRlZVtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvd25PcmdhbklkOiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBGdW5jdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucz86IGFueSkge1xuICAgICAgICBpZiAoYXR0ZW5kZWVzLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhbXSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZ3JvdXBCeU9yZ2FucyA9IHRoaXMuZ3JvdXBBdHRlbmRlZUJ5T3JnYW4oYXR0ZW5kZWVzKTtcbiAgICAgICAgbGV0IG9yZ2FuSWRzID0gT2JqZWN0LmtleXMoZ3JvdXBCeU9yZ2Fucyk7XG4gICAgICAgIGlmIChvcmdhbklkcy5pbmRleE9mKG93bk9yZ2FuSWQpIDwgMCkge1xuICAgICAgICAgICAgb3JnYW5JZHMucHVzaChvd25PcmdhbklkKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxvYWRSb2xlcyhvcmdhbklkcywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGludGVybmFsVXBkYXRlID0gIWV2ZW50LnV1aWQgfHwgdGhpcy5jYW5VcGRhdGVBdHRlbmRlZShldmVudCwgb3duT3JnYW5JZCk7XG4gICAgICAgICAgICBsZXQgZGF0YSA9IFtdO1xuXG4gICAgICAgICAgICBPYmplY3Qua2V5cyhncm91cEJ5T3JnYW5zKS5mb3JFYWNoKChvcmdhbklkKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGlzTXlPcmdhbiA9IG9yZ2FuSWQgPT09IG93bk9yZ2FuSWQ7XG4gICAgICAgICAgICAgICAgbGV0IGV4dGVybmFsVXBkYXRlID0gaXNNeU9yZ2FuICYmIHRoaXMuY2FuRXh0ZXJuYWxVcGRhdGVFdmVudChldmVudCwgb3JnYW5JZCk7XG4gICAgICAgICAgICAgICAgbGV0IGF0dGVuZGVlcyA9IGdyb3VwQnlPcmdhbnNbb3JnYW5JZF07XG4gICAgICAgICAgICAgICAgZGF0YS5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgb3JnYW5JZDogb3JnYW5JZCxcbiAgICAgICAgICAgICAgICAgICAgb3JnYW5OYW1lOiB0aGlzLmdldE9yZ05hbWVCeUlkKG9yZ2FuSWQpLFxuICAgICAgICAgICAgICAgICAgICBpbnRlcm5hbFVwZGF0ZTogaW50ZXJuYWxVcGRhdGUsXG4gICAgICAgICAgICAgICAgICAgIGV4dGVybmFsVXBkYXRlOiBleHRlcm5hbFVwZGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlQXR0ZW5kZWU6IGludGVybmFsVXBkYXRlIHx8IGV4dGVybmFsVXBkYXRlLFxuICAgICAgICAgICAgICAgICAgICBhdHRlbmRlZXM6IGF0dGVuZGVlcyxcbiAgICAgICAgICAgICAgICAgICAgY2FuUmVtb3ZlQXR0ZW5kZWU6IGZ1bmN0aW9uIChhdHRlbmRlZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGludGVybmFsVXBkYXRlIHx8IChleHRlcm5hbFVwZGF0ZSAmJiBhdHRlbmRlZS50eXBlICE9PSBDYWxBdHRlbmRlZVR5cGUuT1JHQU4pO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBjYW5VcGRhdGVTdGF0ZTogKGF0dGVuZGVlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYXR0ZW5kZWUucmVhZFRpbWUgIT09IHVuZGVmaW5lZCAmJiBpc015T3JnYW4gJiYgdGhpcy5hdHRlbmRlZUlzTWUoYXR0ZW5kZWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNhbGxiYWNrKGRhdGEpO1xuICAgICAgICB9LCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBidWlsZE1lbWJlclN0cihpdGVtPzogYW55KSB7XG4gICAgICAgIGl0ZW0ubWVtYmVycyA9IGl0ZW0ubWVtYmVycyB8fCBbXTtcbiAgICAgICAgcmV0dXJuIGl0ZW0ubWVtYmVycy5tYXAoKGl0ZW0pID0+IGl0ZW0ubmFtZSkuam9pbignLCcpO1xuICAgIH1cblxuICAgIGJ1aWxkTWVtYmVyU2hvdyhtZW1iZXJzKSB7XG4gICAgICAgIHJldHVybiAobWVtYmVycyB8fCBbXSkubWFwKChpdGVtKSA9PiBpdGVtLm5hbWUpLmpvaW4oJzsnKTtcbiAgICB9XG5cbiAgICBtb2RpZnlEYXRhVXBkYXRlKGRhdGEsIGV2ZW50PzogYW55KSB7XG4gICAgICAgIGxldCBhdHRlbmRlZUpzb24gPSBbXTtcbiAgICAgICAgLy8gUmVtb3ZlIGFsbCBtZW1iZXJzIGFuZCByZWJ1aWxkXG4gICAgICAgIGlmIChkYXRhLmF0dGVuZGVlKSB7XG5cbiAgICAgICAgICAgIGxldCBuZXdBdHRlbmRlZXMgPSBkYXRhLmF0dGVuZGVlLmZpbHRlcihmdW5jdGlvbiAoYXR0ZW5kZWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYXR0ZW5kZWUucmVhZFRpbWUgPT09IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAoZXZlbnQgJiYgZXZlbnQudXVpZCkge1xuICAgICAgICAgICAgICAgIGxldCByZW1haW5BdHRlbmRlZXMgPSBkYXRhLmF0dGVuZGVlLmZpbHRlcihmdW5jdGlvbiAoYXR0ZW5kZWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGF0dGVuZGVlLnJlYWRUaW1lICE9PSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgZXZlbnQubWVtYmVycy5mb3JFYWNoKChtZW1iZXIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1lbWJlci5yb2xlICE9PSBDYWxBdHRlbmRlZVJvbGUuQ1JFQVRPUikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlbWFpbkF0dGVuZGVlcy5pbmRleE9mKG1lbWJlcikgPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0ZW5kZWVKc29uLnB1c2godGhpcy5hdHRlbmRlZVJlbW92ZUpzb24obWVtYmVyKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbmV3QXR0ZW5kZWVzLmZvckVhY2goKGF0dGVuZGVlKSA9PiBhdHRlbmRlZUpzb24ucHVzaCh0aGlzLmF0dGVuZGVlQWRkSnNvbihhdHRlbmRlZSkpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFNlY3VyZSB0ZXh0IHVwZGF0ZVxuICAgICAgICBpZiAoZGF0YS5zdWJqZWN0KSB7XG4gICAgICAgICAgICBkYXRhLnN1YmplY3QgPSB0aGlzLmZvcm1hdFRleHRVcGRhdGUoZGF0YS5zdWJqZWN0KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS5sb2NhdGlvbikge1xuICAgICAgICAgICAgZGF0YS5sb2NhdGlvbiA9IHRoaXMuZm9ybWF0VGV4dFVwZGF0ZShkYXRhLmxvY2F0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRhdGEuYXR0ZW5kZWUgPSBKU09OLnN0cmluZ2lmeShhdHRlbmRlZUpzb24pO1xuXG4gICAgICAgIC8vIFBlcnNvbmFsIGNhbGVuZGFyXG4gICAgICAgIGlmICghdGhpcy5nZXRDb25maWdWYWx1ZSgnUEVSU09OQUxfQ0FOX1BVQkxJU0gnKSAmJiBkYXRhLnR5cGUgPT09IENhbFN1YlR5cGUuUEVSU09OQUwpIHtcbiAgICAgICAgICAgIGRhdGEubW9kZSA9IENhbE1vZGUuQ1JFQVRFO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRhdGEudHlwZSA9PT0gQ2FsU3ViVHlwZS5NRUVUX1BFT1BMRSB8fCBkYXRhLnR5cGUgPT09IENhbFN1YlR5cGUuUEVSU09OQUwpIHtcbiAgICAgICAgICAgIGRhdGEuX3N1YlR5cGUgPSBkYXRhLnR5cGU7XG4gICAgICAgICAgICBkYXRhLnR5cGUgPSBkYXRhLnR5cGUuc3BsaXQoJzsnKVswXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRhdGEuX3N1YlR5cGUgPSAnJztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cblxuICAgIGF0dGVuZGVlQWRkSnNvbihhdHRlbmRlZTogQ2FsQXR0ZW5kZWUpIHtcbiAgICAgICAgbGV0IG9iajogYW55ID0ge1xuICAgICAgICAgICAgb3JnYW5JZDogYXR0ZW5kZWUub3JnYW5JZCxcbiAgICAgICAgICAgIG9yZ2FuTmFtZTogYXR0ZW5kZWUub3JnYW5OYW1lLFxuICAgICAgICAgICAgcm9sZTogYXR0ZW5kZWUucm9sZSB8fCBDYWxBdHRlbmRlZVJvbGUuTUVNQkVSXG4gICAgICAgIH07XG4gICAgICAgIHN3aXRjaCAoYXR0ZW5kZWUudHlwZSkge1xuICAgICAgICAgICAgY2FzZSBDYWxBdHRlbmRlZVR5cGUuVVNFUjpcbiAgICAgICAgICAgICAgICBvYmoubWVtYmVycyA9IGF0dGVuZGVlLnVzZXJuYW1lICsgJzonICsgYXR0ZW5kZWUuZnVsbG5hbWU7XG4gICAgICAgICAgICAgICAgb2JqLmRpc3BsYXkgPSBhdHRlbmRlZS5kaXNwbGF5O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBDYWxBdHRlbmRlZVR5cGUuT1JHQU46XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2V0Q29uZmlnVmFsdWUoJ0VWRU5UX0JFVFdFRU5fVU5JVCcpKSB7XG4gICAgICAgICAgICAgICAgICAgIG9iai5maXJtcyA9IGF0dGVuZGVlLm9yZ2FuSWQgKyAnOicgKyBhdHRlbmRlZS5vcmdhbk5hbWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBvYmouYWxpYXMgPSBhdHRlbmRlZS5hbGlhcyB8fCBhdHRlbmRlZS5vcmdhbk5hbWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICB9XG5cbiAgICBhdHRlbmRlZVJlbW92ZUpzb24oYXR0ZW5kZWU6IENhbEF0dGVuZGVlKSB7XG4gICAgICAgIGxldCBvYmo6IGFueSA9IHtcbiAgICAgICAgICAgIG9yZ2FuSWQ6IGF0dGVuZGVlLm9yZ2FuSWRcbiAgICAgICAgfTtcbiAgICAgICAgc3dpdGNoIChhdHRlbmRlZS50eXBlKSB7XG4gICAgICAgICAgICBjYXNlIENhbEF0dGVuZGVlVHlwZS5VU0VSOlxuICAgICAgICAgICAgICAgIG9iai5tZW1iZXJzID0gYXR0ZW5kZWUudXNlcm5hbWUgKyAnOlJFTU9WRSc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIENhbEF0dGVuZGVlVHlwZS5PUkdBTjpcbiAgICAgICAgICAgICAgICBvYmouZmlybXMgPSBhdHRlbmRlZS5vcmdhbklkICsgJzpSRU1PVkUnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBvYmouYWxpYXMgPSBhdHRlbmRlZS5hbGlhcyArICc6UkVNT1ZFJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb2JqO1xuICAgIH1cblxuICAgIF9jb252ZXJ0T3JnKGRhdGEpIHtcbiAgICAgICAgZGF0YSA9IGRhdGEgfHwgW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGl0ZW0gPSBkYXRhW2ldO1xuICAgICAgICAgICAgaXRlbS5maXJtTmFtZSA9IGl0ZW0ub3JnTmFtZSB8fCBpdGVtLm5hbWU7XG4gICAgICAgICAgICBpdGVtLmZpcm1QcmVmaXggPSBpdGVtLnVyaVByZWZpeCB8fCBpdGVtLnByZWZpeDtcbiAgICAgICAgICAgIGl0ZW0uZmlybVVVSUQgPSBpdGVtLm9yZ2FuSWQgfHwgaXRlbS5vcmdhbmlJZCB8fCAnJztcbiAgICAgICAgICAgIHRoaXMuaW5kZXhPcmdTZWFyY2goaXRlbSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBzb3J0IGJ5IG5hbWVcbiAgICAgICAgZGF0YS5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYS5maXJtTmFtZS5sb2NhbGVDb21wYXJlKGIuZmlybU5hbWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG5cbiAgICB2aWV3RXZlbnRPbk1vZGFsKG9iamVjdElkKSB7XG4gICAgICAgIGlmICh0aGlzLl9tYXBFdmVudHNbb2JqZWN0SWRdKSB7XG4gICAgICAgICAgICBpTmV0LnBsdWdpbnMucmVhZHkoKHBsdWdpbnMpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocGx1Z2lucy54Y2FsZW5kYXIpIHtcbiAgICAgICAgICAgICAgICAgICAgcGx1Z2lucy54Y2FsZW5kYXIub3BlblZpZXcodGhpcy5fbWFwRXZlbnRzW29iamVjdElkXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBTYXZlIGFuZCBnZXQgZXZlbnRcbiAgICBnZXRFdmVudEJ5T2JqZWN0SWQob2JqZWN0SWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcEV2ZW50c1tvYmplY3RJZF07XG4gICAgfVxuXG4gICAgZ2V0VGV4dEZvck1pbnV0ZXMobWludXRlcz86IGFueSkge1xuICAgICAgICBtaW51dGVzID0gcGFyc2VJbnQobWludXRlcykgfHwgMTtcbiAgICAgICAgaWYgKG1pbnV0ZXMgPj0gNjApIHtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLnJvdW5kKG1pbnV0ZXMgLyA2MCkgKyAnICcgKyB0aGlzLnJlc291cmNlcy5ob3VyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG1pbnV0ZXMgKyAnICcgKyB0aGlzLnJlc291cmNlcy5taW51dGU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBncm91cEV2ZW50QnlTZXNzaW9uKGV2ZW50cykge1xuICAgICAgICBsZXQgZGF0YSA9IHtcbiAgICAgICAgICAgIGFsbGRheTogW10sXG4gICAgICAgICAgICBtb3JuaW5nOiBbXSxcbiAgICAgICAgICAgIGFmdGVybm9vbjogW10sXG4gICAgICAgICAgICBldmVuaW5nOiBbXVxuICAgICAgICB9O1xuICAgICAgICBldmVudHMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgaWYgKGl0ZW0uYWxsRGF5KSB7XG4gICAgICAgICAgICAgICAgZGF0YS5hbGxkYXkucHVzaChpdGVtKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXRlbS5mcm9tLmdldEhvdXJzKCkgPCAxMikge1xuICAgICAgICAgICAgICAgIGRhdGEubW9ybmluZy5wdXNoKGl0ZW0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChpdGVtLmZyb20uZ2V0SG91cnMoKSA8IDE4KSB7XG4gICAgICAgICAgICAgICAgZGF0YS5hZnRlcm5vb24ucHVzaChpdGVtKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZGF0YS5ldmVuaW5nLnB1c2goaXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGZvciAobGV0IGsgaW4gZGF0YSkge1xuICAgICAgICAgICAgdGhpcy5zb3J0RXZlbnRzKGRhdGFba10pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuXG4gICAgZ3JvdXBFdmVudEJ5UGVyc29uKGV2ZW50cywgcGVyc29ucywgZGF0ZSkge1xuICAgICAgICBsZXQgZGF0YSA9IHtcbiAgICAgICAgICAgIHBlcnNvbnM6IFtdLFxuICAgICAgICAgICAgc2VnRXZlbnRzOiB0aGlzLmdlbmVyYXRlRXZlbnRXZWVrVmlldyhldmVudHMsIGRhdGUpXG4gICAgICAgIH07XG4gICAgICAgIGxldCBldmVudEJ5RGF5cyA9IGRhdGEuc2VnRXZlbnRzLm1hcChmdW5jdGlvbiAoc2VnRXZlbnQpIHtcbiAgICAgICAgICAgIHJldHVybiBzZWdFdmVudC5pdGVtcztcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcGVyc29ucy5mb3JFYWNoKChwZXJzb24pID0+IHtcbiAgICAgICAgICAgIGxldCBldmVudERheXMgPSBldmVudEJ5RGF5cy5tYXAoKGV2ZW50cykgPT5cbiAgICAgICAgICAgICAgICBldmVudHMuZmlsdGVyKGV2ZW50ID0+IHRoaXMubWVtYmVySXNBdHRlbmRlZShldmVudCwgcGVyc29uLm5hbWUpKSk7XG4gICAgICAgICAgICBkYXRhLnBlcnNvbnMucHVzaCh7XG4gICAgICAgICAgICAgICAgcGVyc29uOiBwZXJzb24sXG4gICAgICAgICAgICAgICAgZXZlbnREYXlzOiBldmVudERheXNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG5cbiAgICBncm91cEV2ZW50QnlMZWFkZXJzKGV2ZW50czogQ2FsRXZlbnRbXSwgb3JnYW5JZDogc3RyaW5nLCBjYWxsYmFjazogRnVuY3Rpb24sIG9wdGlvbnM/OiBhbnkpIHtcbiAgICAgICAgdGhpcy5sb2FkTGVhZGVycyhvcmdhbklkLCAobGVhZGVycykgPT4ge1xuICAgICAgICAgICAgbGV0IGRhdGFMZWFkZXJzID0gW107XG4gICAgICAgICAgICBsZXQgb3RoZXJFdmVudHMgPSBbXTtcbiAgICAgICAgICAgIGxlYWRlcnMuZm9yRWFjaCgobGVhZGVyKSA9PiBkYXRhTGVhZGVycy5wdXNoKHtcbiAgICAgICAgICAgICAgICB1c2VybmFtZTogbGVhZGVyLm5hbWUsXG4gICAgICAgICAgICAgICAgZnVsbG5hbWU6IGxlYWRlci52YWx1ZSxcbiAgICAgICAgICAgICAgICBldmVudHM6IFtdXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICBldmVudHMuZm9yRWFjaCgoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgaXNGb3VuZDtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGFMZWFkZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBpdGVtID0gZGF0YUxlYWRlcnNbaV07XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm1lbWJlcklzQXR0ZW5kZWUoZXZlbnQsIGl0ZW0udXNlcm5hbWUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpc0ZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uZXZlbnRzLnB1c2goZXZlbnQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghaXNGb3VuZCkge1xuICAgICAgICAgICAgICAgICAgICBvdGhlckV2ZW50cy5wdXNoKGV2ZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNhbGxiYWNrKGRhdGFMZWFkZXJzLCBvdGhlckV2ZW50cyk7XG4gICAgICAgIH0sIG9wdGlvbnMsIHRydWUpO1xuICAgIH1cblxuICAgIG1lSXNDcmVhdG9yKGV2ZW50OiBDYWxFdmVudCk6IGJvb2xlYW4ge1xuICAgICAgICBmb3IgKGxldCBpID0gZXZlbnQubWVtYmVycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgaWYgKGV2ZW50Lm1lbWJlcnNbaV0ucm9sZSA9PT0gQ2FsQXR0ZW5kZWVSb2xlLkNSRUFUT1IgJiYgdGhpcy5hdHRlbmRlZUlzTWUoZXZlbnQubWVtYmVyc1tpXSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgYXR0ZW5kZWVJc01lKGF0dGVuZGRlOiBDYWxBdHRlbmRlZSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy51c2VybmFtZUlzTWUoYXR0ZW5kZGUudXNlcm5hbWUpO1xuICAgIH1cblxuICAgIGF0dGVuZGVlRGlzcGxheShhdHRlbmRkZTogQ2FsQXR0ZW5kZWUpIHtcbiAgICAgICAgcmV0dXJuIGF0dGVuZGRlLmFsaWFzIHx8IGF0dGVuZGRlLmRpc3BsYXkgfHwgYXR0ZW5kZGUuZnVsbG5hbWUgfHwgYXR0ZW5kZGUudXNlcm5hbWUgfHwgYXR0ZW5kZGUub3JnYW5OYW1lO1xuICAgIH1cblxuICAgIGF0dGVuZGVlVmFsdWUoYXR0ZW5kZGU6IENhbEF0dGVuZGVlKSB7XG4gICAgICAgIHJldHVybiBhdHRlbmRkZS5hbGlhcyB8fCBhdHRlbmRkZS51c2VybmFtZSB8fCBhdHRlbmRkZS5vcmdhbklkO1xuICAgIH1cblxuICAgIGZvcm1hdFRleHREaXNwbGF5KHRleHQ6IHN0cmluZykge1xuICAgICAgICBsZXQgZGlzcGxheSA9IHRoaXMuZm9ybWF0VGV4dFVwZGF0ZSh0ZXh0KTtcblxuICAgICAgICAvLyBicmVhayBsaW5lXG4gICAgICAgIGRpc3BsYXkgPSBkaXNwbGF5LnJlcGxhY2UoL1xcbi9nLCAnPGJyPicpO1xuXG4gICAgICAgIHJldHVybiBkaXNwbGF5O1xuICAgIH1cblxuICAgIGZvcm1hdFRleHRVcGRhdGUodGV4dDogc3RyaW5nKSB7XG4gICAgICAgIGxldCAkZnJhZ21lbnQgPSAkKCc8ZGl2PicpLmh0bWwodGV4dCk7XG4gICAgICAgICRmcmFnbWVudC5maW5kKCdzdHlsZSxzY3JpcHQnKS5yZW1vdmUoKTtcbiAgICAgICAgcmV0dXJuICRmcmFnbWVudC5odG1sKCk7XG4gICAgfVxuXG4gICAgbWVtYmVySXNBdHRlbmRlZShldmVudDogQ2FsRXZlbnQsIG1lbWJlcjogc3RyaW5nKSB7XG4gICAgICAgIC8vIGZvciAobGV0IGkgPSAwOyBpIDwgZXZlbnQubWVtYmVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAvLyAgICAgaWYgKGV2ZW50Lm1lbWJlcnNbaV0ucm9sZSAhPT0gQ2FsQXR0ZW5kZWVSb2xlLkNSRUFUT1IgJiYgZXZlbnQubWVtYmVyc1tpXS51c2VybmFtZSA9PT0gbWVtYmVyKSB7XG4gICAgICAgIC8vICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH1cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBldmVudC5tZW1iZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoZXZlbnQubWVtYmVyc1tpXS51c2VybmFtZSA9PT0gbWVtYmVyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRBdHRlbmRlZUJ5VXNlcm5hbWUoZXZlbnQ6IENhbEV2ZW50LCB1c2VybmFtZTogc3RyaW5nKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZXZlbnQubWVtYmVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGV2ZW50Lm1lbWJlcnNbaV0udXNlcm5hbWUgPT09IHVzZXJuYW1lKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGV2ZW50Lm1lbWJlcnNbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRBdHRlbmRlZUlzTWUoZXZlbnQ6IENhbEV2ZW50KTogQ2FsQXR0ZW5kZWUge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGV2ZW50Lm1lbWJlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBtZW1iZXIgPSBldmVudC5tZW1iZXJzW2ldO1xuICAgICAgICAgICAgaWYgKG1lbWJlci5yb2xlICE9PSBDYWxBdHRlbmRlZVJvbGUuQ1JFQVRPUiAmJiB0aGlzLnVzZXJuYW1lSXNNZShtZW1iZXIudXNlcm5hbWUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1lbWJlcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGV2ZW50SXNWaWV3ZWQoZXZlbnQ6IENhbEV2ZW50KSB7XG4gICAgICAgIGxldCBhdHRlbmRlZSA9IHRoaXMuZ2V0QXR0ZW5kZWVJc01lKGV2ZW50KTtcbiAgICAgICAgcmV0dXJuICFhdHRlbmRlZSB8fCBhdHRlbmRlZS5yZWFkVGltZTtcbiAgICB9XG5cbiAgICB1c2VybmFtZUlzTWUodXNlcm5hbWU6IFN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdXNlcm5hbWUgPT09IGlOZXQudXNlcmNvZGU7XG4gICAgfVxuXG4gICAgc2VuZFJlcXVlc3QoZGF0YTogYW55LCBvcHRpb25zPzogYW55LCBjYWNoZVJlc3BvbnNlPzogYW55KSB7XG4gICAgICAgIGxldCBvcHRpb24gPSB0aGlzLl9idWlsZEFqYXhPcHRpb25zKGRhdGEsIG9wdGlvbnMpO1xuICAgICAgICBpZiAoY2FjaGVSZXNwb25zZSkge1xuICAgICAgICAgICAgbGV0IGtleUNhY2hlID0gb3B0aW9uLnVybDtcbiAgICAgICAgICAgIGlmIChvcHRpb24uZGF0YSAmJiBPYmplY3Qua2V5cyhvcHRpb24uZGF0YSkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGtleUNhY2hlICs9IEpTT04uc3RyaW5naWZ5KG9wdGlvbi5kYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBkYXRhQ2FjaGVkID0gdGhpcy5jYWNoZURhdGFUZW1wKGtleUNhY2hlKTtcbiAgICAgICAgICAgIGlmIChkYXRhQ2FjaGVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9wdGlvbi5zdWNjZXNzKGRhdGFDYWNoZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5hZGRRdWV1ZShrZXlDYWNoZSwgKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgX29wdGlvbiA9ICQuZXh0ZW5kKHt9LCBvcHRpb24pO1xuICAgICAgICAgICAgICAgIF9vcHRpb24uc3VjY2VzcyA9IChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FjaGVEYXRhVGVtcChrZXlDYWNoZSwgZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZGF0YSk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBfb3B0aW9uLmVycm9yID0gKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUobnVsbCwgZXJyb3IpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgQWpheEFQSS5zZW5kUmVxdWVzdChfb3B0aW9uKTtcbiAgICAgICAgICAgIH0sIChkYXRhLCBlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICBvcHRpb24uZXJyb3IgJiYgb3B0aW9uLmVycm9yKGVycm9yKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBvcHRpb24uc3VjY2VzcyAmJiBvcHRpb24uc3VjY2VzcyhkYXRhKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBBamF4QVBJLnNlbmRSZXF1ZXN0KG9wdGlvbik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwb3N0Rm9ybShkYXRhOiBhbnksIG9wdGlvbnM/OiBhbnkpIHtcbiAgICAgICAgcmV0dXJuIEFqYXhBUEkucG9zdEZvcm0odGhpcy5fYnVpbGRBamF4T3B0aW9ucyhkYXRhLCBvcHRpb25zKSk7XG4gICAgfVxuXG4gICAgX2J1aWxkQWpheE9wdGlvbnMoZGF0YSwgb3B0aW9ucz86IGFueSkge1xuXG4gICAgICAgIGxldCBvcHRpb24gPSAkLmV4dGVuZCh7fSwgZGF0YSwgb3B0aW9ucyk7XG4gICAgICAgIGxldCBvcmdpZCA9IG9wdGlvbi5kYXRhICYmIG9wdGlvbi5kYXRhLm9yZ2lkIHx8IHRoaXMuZ2V0T3JnSWQoKTtcbiAgICAgICAgbGV0IG9yZyA9IHRoaXMuZ2V0T3JnQnlJZChvcmdpZCk7XG4gICAgICAgIGxldCBpc0xvY2FsRmlybSA9IG9yZyAmJiBvcmcuZmlybVByZWZpeCA9PT0gaU5ldC5wYXRoLnNsaWNlKDEpO1xuICAgICAgICBsZXQgaXNVc2VPcmdJZCA9ICFvcHRpb24ucmVtb3ZlT3JnSWQgJiYgKGlzTG9jYWxGaXJtIHx8IG9wdGlvbi51c2VPcmdJZCk7XG4gICAgICAgIGlmIChpc1VzZU9yZ0lkKSB7XG4gICAgICAgICAgICBvcHRpb24uZGF0YSA9IG9wdGlvbi5kYXRhIHx8IHt9O1xuICAgICAgICAgICAgb3B0aW9uLmRhdGEub3JnaWQgPSBvcmdpZDtcbiAgICAgICAgfSBlbHNlIGlmIChvcHRpb24uZGF0YSkge1xuICAgICAgICAgICAgZGVsZXRlIG9wdGlvbi5kYXRhLm9yZ2lkO1xuICAgICAgICB9XG4gICAgICAgIG9wdGlvbi51cmwgPSB0aGlzLmdldFVybEJ5T3JnSWQob3B0aW9uLnVybCwgb3JnaWQsIG9wdGlvbi5kb21haW4pO1xuICAgICAgICByZXR1cm4gb3B0aW9uO1xuICAgIH1cblxuICAgIF9nZXRPcmdhbk9uSW5pdCgpIHtcbiAgICAgICAgbGV0IG9yZ2FuO1xuXG4gICAgICAgIGxldCBwYXJhbXMgPSB0aGlzLmdldFF1ZXJ5UGFyYW1zKCk7XG5cbiAgICAgICAgLy8gR2V0IGJ5IHVybCBxdWVyeVxuICAgICAgICBpZiAocGFyYW1zWydvcmdpZCddKSB7XG4gICAgICAgICAgICB0aGlzLnNldE9yZ0lkKHBhcmFtc1snb3JnaWQnXSk7XG4gICAgICAgICAgICBvcmdhbiA9IHRoaXMuZ2V0T3JnQnlJZChwYXJhbXNbJ29yZ2lkJ10pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZ2V0IG9yZ2FuIGJ5IGZpcm0gcHJlZml4XG4gICAgICAgIGlmICghb3JnYW4gJiYgaU5ldC5maXJtUHJlZml4ICE9PSAnc21hcnRjbG91ZCcpIHtcbiAgICAgICAgICAgIG9yZ2FuID0gdGhpcy5nZXRPcmdCeVByZWZpeChpTmV0LmZpcm1QcmVmaXgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gR2V0IG9yZ2FuIGFjdGl2ZSByZWNlbnRseVxuICAgICAgICBpZiAoIW9yZ2FuKSB7XG4gICAgICAgICAgICBsZXQgb3JnYW5JZCA9IHRoaXMuZ2V0T3JnSWQoKSB8fCBpTmV0Lm9yZ2FuSWQ7XG4gICAgICAgICAgICBvcmdhbiA9IHRoaXMuZ2V0T3JnQnlJZChvcmdhbklkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEdldCBvcmdhbiBsb2NhbFxuICAgICAgICBpZiAoIW9yZ2FuKSB7XG4gICAgICAgICAgICBvcmdhbiA9IHRoaXMuZ2V0T3JnQnlQcmVmaXgoaU5ldC5wYXRoLnNsaWNlKDEpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGdldCBvcmdhbiBmaXJzdFxuICAgICAgICBpZiAoIW9yZ2FuKSB7XG4gICAgICAgICAgICBvcmdhbiA9IHRoaXMuX215T3JnYW5zICYmIHRoaXMuX215T3JnYW5zWzBdIHx8IHRoaXMuX29yZ2FucyAmJiB0aGlzLl9vcmdhbnNbMF07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAob3JnYW4pIHtcbiAgICAgICAgICAgIHRoaXMuc2V0T3JnSWQob3JnYW4uZmlybVVVSUQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG9yZ2FuO1xuICAgIH1cblxuICAgIGdyb3VwRXZlbnRCeUNhcihjYXJzLCBldmVudHMpIHtcbiAgICAgICAgbGV0IGRhdGEgPSBbXTtcbiAgICAgICAgY2Fycy5mb3JFYWNoKGZ1bmN0aW9uIChjYXIpIHtcbiAgICAgICAgICAgIGRhdGEucHVzaCh7XG4gICAgICAgICAgICAgICAgY2FyOiBjYXIsXG4gICAgICAgICAgICAgICAgZXZlbnRzOiBbXVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGV2ZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgbGV0IGNhckRhdGEgPSBkYXRhWzBdO1xuICAgICAgICAgICAgaWYgKGV2ZW50Ll9jYXJVVUlEKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhW2ldLmNhci51dWlkID09PSBldmVudC5fY2FyVVVJRCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FyRGF0YSA9IGRhdGFbaV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXJEYXRhLmV2ZW50cy5wdXNoKGV2ZW50KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuXG4gICAgZmlsdGVyTWVldFBlb3BsZUV2ZW50cyhldmVudHMpIHtcbiAgICAgICAgcmV0dXJuIGV2ZW50cy5maWx0ZXIoZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gZXZlbnQuX3N1YlR5cGUgPT09IENhbFN1YlR5cGUuTUVFVF9QRU9QTEU7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIF9sb2FkT25EaWZmZXJZZWFyKGV4ZWN1dG9yLCBwYXJhbXMsIGNhbGxiYWNrLCBvcHRpb25zKSB7XG4gICAgICAgIGlmICghcGFyYW1zLmZyb20gfHwgIXBhcmFtcy50byB8fCBwYXJhbXMuZnJvbSA8PSBwYXJhbXMudG8pIHtcbiAgICAgICAgICAgIGV4ZWN1dG9yLmFwcGx5KHRoaXMsIFtwYXJhbXMsIGNhbGxiYWNrLCBvcHRpb25zXSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBMb2FkIGluIGRpZmZlciB5ZWFyXG4gICAgICAgICAgICBsZXQgcHJvbWlzZXMgPSBbXTtcbiAgICAgICAgICAgIGxldCBlbmRPZlllYXIgPSBuZXcgRGF0ZShwYXJhbXMueWVhciArIDEsIDApO1xuICAgICAgICAgICAgZW5kT2ZZZWFyLnNldFRpbWUoZW5kT2ZZZWFyLmdldFRpbWUoKSAtIDEpO1xuXG4gICAgICAgICAgICBsZXQgcGFyYW1zMSA9ICQuZXh0ZW5kKHt9LCBwYXJhbXMpO1xuICAgICAgICAgICAgbGV0IG9wdGlvbnMxID0gJC5leHRlbmQoe30sIG9wdGlvbnMpO1xuICAgICAgICAgICAgcGFyYW1zMS50byA9IERhdGVVdGlscy5kYXlPZlllYXIoZW5kT2ZZZWFyKTtcbiAgICAgICAgICAgIHByb21pc2VzLnB1c2gobmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgICAgICBleGVjdXRvci5hcHBseSh0aGlzLCBbcGFyYW1zMSwgcmVzb2x2ZSwgb3B0aW9uczFdKTtcbiAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgbGV0IHBhcmFtczIgPSAkLmV4dGVuZCh7fSwgcGFyYW1zKTtcbiAgICAgICAgICAgIGxldCBvcHRpb25zMiA9ICQuZXh0ZW5kKHt9LCBvcHRpb25zKTtcbiAgICAgICAgICAgIHBhcmFtczIueWVhciA9IHBhcmFtcy55ZWFyICsgMTtcbiAgICAgICAgICAgIHBhcmFtczIuZnJvbSA9IDE7XG4gICAgICAgICAgICBwcm9taXNlcy5wdXNoKG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICAgICAgZXhlY3V0b3IuYXBwbHkodGhpcywgW3BhcmFtczIsIHJlc29sdmUsIG9wdGlvbnMyXSk7XG4gICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgICAgIFByb21pc2UuYWxsKHByb21pc2VzKS50aGVuKCh2YWx1ZXMpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgZXZlbnRzID0gW10uY29uY2F0LmFwcGx5KFtdLCB2YWx1ZXMpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlRXZlbnREdXBsaWNhdGUoZXZlbnRzKTtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhldmVudHMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBsb2FkTW9udGhFdmVudHMocGFyYW1zLCBkYXRlLCBjYWxsYmFjaywgb3B0aW9ucz86IGFueSkge1xuICAgICAgICBsZXQgZnJvbSwgdG87XG4gICAgICAgIGRhdGUgPSBuZXcgRGF0ZShkYXRlKTtcbiAgICAgICAgLy8gU3RhcnQgbW9udGhcbiAgICAgICAgZGF0ZS5zZXREYXRlKDEpO1xuXG4gICAgICAgIC8vIFN0YXJ0IGRhdGUgb2Ygd2Vla1xuICAgICAgICBmcm9tID0gRGF0ZVV0aWxzLmdldERhdGVTdGFydFdlZWsoZGF0ZSk7XG5cbiAgICAgICAgLy8gRW5kIG1vbnRoXG4gICAgICAgIGRhdGUuc2V0TW9udGgoZGF0ZS5nZXRNb250aCgpICsgMSk7XG4gICAgICAgIGRhdGUuc2V0VGltZShkYXRlLmdldFRpbWUoKSAtIDEpO1xuXG4gICAgICAgIC8vIEVuZCBkYXRlIG9mIHdlZWtcbiAgICAgICAgdG8gPSBEYXRlVXRpbHMuZ2V0RGF0ZUVuZFdlZWsoZGF0ZSk7XG5cbiAgICAgICAgcGFyYW1zID0gJC5leHRlbmQoe30sIHBhcmFtcywgdGhpcy5nZXRSYW5nZVBhcmFtcyhmcm9tLCB0bykpO1xuXG4gICAgICAgIGlmICh0aGlzLmlzTXlPcmcocGFyYW1zLm9yZ2lkKSkge1xuICAgICAgICAgICAgdGhpcy5nZXRMaXN0RXZlbnRzKHBhcmFtcywgY2FsbGJhY2ssIG9wdGlvbnMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5sb2FkUHVibGlzaEV2ZW50cyhwYXJhbXMsIGNhbGxiYWNrLCBvcHRpb25zKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldEV4cG9ydFVybChjYWxFdmVudCwgZG9tYWluKSB7XG4gICAgICAgIGlmIChjYWxFdmVudCAmJiBjYWxFdmVudC51dWlkICYmIGNhbEV2ZW50Ll90ZW1wbGF0ZUlkKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRVcmxCeU9yZ0lkKCdjYWxidWlsZGVyL2ludml0YXRpb24vZXhwb3J0JywgY2FsRXZlbnQuZmlybVVVSUQsIGRvbWFpbikgK1xuICAgICAgICAgICAgICAgICc/dGVtcGxhdGVJRD0nICsgY2FsRXZlbnQuX3RlbXBsYXRlSWQgK1xuICAgICAgICAgICAgICAgICcmZWxlbWVudD0nICsgY2FsRXZlbnQudXVpZDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldFdlZWtQYXJhbXMoZGF0ZSkge1xuICAgICAgICBsZXQgd2Vla1JhbmdlID0gRGF0ZVV0aWxzLmdldFdlZWtSYW5nZShkYXRlKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UmFuZ2VQYXJhbXMod2Vla1JhbmdlLnN0YXJ0V2Vlaywgd2Vla1JhbmdlLmVuZFdlZWspO1xuICAgIH1cblxuICAgIGdldFJhbmdlUGFyYW1zKGZyb20sIHRvKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB5ZWFyOiBmcm9tLmdldEZ1bGxZZWFyKCksXG4gICAgICAgICAgICBmcm9tOiBEYXRlVXRpbHMuZGF5T2ZZZWFyKGZyb20pLFxuICAgICAgICAgICAgdG86IERhdGVVdGlscy5kYXlPZlllYXIodG8pXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkYXRlRXF1YWxXZWVrUGFyYW1zKGRhdGUsIHdlZWtQYXJhbXMpIHtcbiAgICAgICAgbGV0IHBhcmFtcyA9IHRoaXMuZ2V0V2Vla1BhcmFtcyhkYXRlKTtcbiAgICAgICAgcmV0dXJuIGRhdGUgJiYgd2Vla1BhcmFtcyAmJiBwYXJhbXMueWVhciA9PT0gd2Vla1BhcmFtcy55ZWFyICYmXG4gICAgICAgICAgICBwYXJhbXMuZnJvbSA9PT0gd2Vla1BhcmFtcy5mcm9tICYmXG4gICAgICAgICAgICBwYXJhbXMudG8gPT09IHdlZWtQYXJhbXMudG87XG4gICAgfVxuXG4gICAgZXZlbnRJc09uUmFuZ2UoZXZlbnQ6IENhbEV2ZW50LCBwYXJhbXM/OiBhbnkpIHtcbiAgICAgICAgcmV0dXJuIChwYXJhbXMuc3RhcnRUaW1lID49IGV2ZW50LnN0YXJ0VGltZSAmJiBwYXJhbXMuc3RhcnRUaW1lIDwgZXZlbnQudG9UaW1lKSB8fFxuICAgICAgICAgICAgKHBhcmFtcy50b1RpbWUgPD0gZXZlbnQudG9UaW1lICYmIHBhcmFtcy50b1RpbWUgPiBldmVudC5zdGFydFRpbWUpIHx8XG4gICAgICAgICAgICAocGFyYW1zLnN0YXJ0VGltZSA8PSBldmVudC5zdGFydFRpbWUgJiYgcGFyYW1zLnRvVGltZSA+PSBldmVudC50b1RpbWUpO1xuICAgIH1cblxuICAgIHZlcmlmeUR1cGxpY2F0ZUV2ZW50cyhwYXJhbXMsIGNhbGxiYWNrOiBGdW5jdGlvbiwgb3B0aW9ucz86IGFueSkge1xuICAgICAgICBsZXQgZHVwbGljYXRlRXZlbnRzID0gW107XG4gICAgICAgIHRoaXMubG9hZFB1Ymxpc2hFdmVudHMoe1xuICAgICAgICAgICAgeWVhcjogcGFyYW1zLnllYXIsXG4gICAgICAgICAgICBkYXk6IHBhcmFtcy5kYXksXG4gICAgICAgICAgICBvcmdpZDogcGFyYW1zLm9yZ2lkIHx8IHRoaXMuZ2V0T3JnSWQoKVxuICAgICAgICB9LCAoZXZlbnRzKSA9PiB7XG4gICAgICAgICAgICBsZXQgYWxsRXZlbnRzID0gW107XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmNhdElzQ2FyKHBhcmFtcy5jYXRlZ29yeSkpIHtcbiAgICAgICAgICAgICAgICBldmVudHMgPSBldmVudHMuZmlsdGVyKChldmVudCkgPT4gdGhpcy5jYXRJc0NhcihldmVudC5jYXRlZ29yeSkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBldmVudHMgPSBldmVudHMuZmlsdGVyKChldmVudCkgPT4gIXRoaXMuY2F0SXNDYXIoZXZlbnQuY2F0ZWdvcnkpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgZGV0ZWN0b3IgPSAodXNlcm5hbWUpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgb2JqOiBhbnkgPSB7XG4gICAgICAgICAgICAgICAgICAgIHVzZXJuYW1lOiB1c2VybmFtZSxcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRzOiBbXVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBldmVudHMuZm9yRWFjaCgoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1lbWJlciA9IHRoaXMuZ2V0QXR0ZW5kZWVCeVVzZXJuYW1lKGV2ZW50LCB1c2VybmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtZW1iZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iai5mdWxsbmFtZSA9IG1lbWJlci5mdWxsbmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iai5ldmVudHMucHVzaChldmVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbGxFdmVudHMucHVzaChldmVudCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGlmIChvYmouZXZlbnRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgZHVwbGljYXRlRXZlbnRzLnB1c2gob2JqKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZXZlbnRzID0gZXZlbnRzLmZpbHRlcigoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZXZlbnQubW9kZSA9PT0gQ2FsTW9kZS5QVUJMSVNIICYmIGV2ZW50LnV1aWQgIT09IHBhcmFtcy5lbGVtZW50ICYmXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRJc09uUmFuZ2UoZXZlbnQsIHBhcmFtcyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChwYXJhbXMuYXR0ZW5kZWUpIHtcbiAgICAgICAgICAgICAgICBwYXJhbXMuYXR0ZW5kZWUuZm9yRWFjaCgoYXR0ZW5kZWUpID0+IGRldGVjdG9yKGF0dGVuZGVlLnVzZXJuYW1lKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFRvZG86IGNyZWF0b3IgaXMgYXR0ZW5kZWVcbiAgICAgICAgICAgIGxldCBpc0V4aXN0ID0gZmFsc2U7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGR1cGxpY2F0ZUV2ZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChkdXBsaWNhdGVFdmVudHNbaV0udXNlcm5hbWUgPT09IGlOZXQudXNlcmNvZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgaXNFeGlzdCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghaXNFeGlzdCkge1xuICAgICAgICAgICAgICAgIGRldGVjdG9yKGlOZXQudXNlcmNvZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZHVwbGljYXRlRXZlbnRzWydhbGxFdmVudHMnXSA9IHRoaXMucmVtb3ZlRXZlbnREdXBsaWNhdGUoYWxsRXZlbnRzKTtcbiAgICAgICAgICAgIGNhbGxiYWNrKGR1cGxpY2F0ZUV2ZW50cyk7XG4gICAgICAgIH0sIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIG5lZWRWZXJpZnlEdXBsaWNhdGUocGFyYW1zLCBldmVudCkge1xuICAgICAgICB2YXIgaXNFdmVudFB1Ymxpc2hlZCA9IGV2ZW50Lm1vZGUgPT09IENhbE1vZGUuUFVCTElTSDtcbiAgICAgICAgdmFyIGFjdGlvblB1Ymxpc2ggPSAhaXNFdmVudFB1Ymxpc2hlZCAmJiBOdW1iZXIocGFyYW1zLm1vZGUpID09PSBDYWxNb2RlLlBVQkxJU0g7XG4gICAgICAgIHZhciBpc1RpbWVDaGFuZ2VkID0gZXZlbnQudXVpZCAmJiAoXG4gICAgICAgICAgICAocGFyYW1zLnN0YXJ0VGltZSAmJiBldmVudC5zdGFydFRpbWUgIT09IHBhcmFtcy5zdGFydFRpbWUpIHx8XG4gICAgICAgICAgICAocGFyYW1zLnRvVGltZSAmJiBldmVudC50b1RpbWUgIT09IHBhcmFtcy50b1RpbWUpIHx8XG4gICAgICAgICAgICAocGFyYW1zLmRheSAmJiBldmVudC5kYXkgIT09IHBhcmFtcy5kYXkpXG4gICAgICAgICkgJiYgaXNFdmVudFB1Ymxpc2hlZDtcbiAgICAgICAgcmV0dXJuIGFjdGlvblB1Ymxpc2ggfHwgaXNUaW1lQ2hhbmdlZDtcbiAgICB9XG5cbiAgICBzdWJqZWN0RGlzcGxheVdpdGhNYXhMZW5ndGgoZXZlbnQpIHtcbiAgICAgICAgLy8gU3ViamVjdCBtYXggbGVuZ3RoXG4gICAgICAgIHZhciBtYXhMZW5ndGggPSBOdW1iZXIodGhpcy5nZXRDb25maWdWYWx1ZSgnU1VCSkVDVF9ESVNQTEFZX01BWF9MRU5HVEgnKSkgfHwgMDtcbiAgICAgICAgLy8gRGlzcGxheSB2aWV3IG1vcmVcbiAgICAgICAgaWYgKG1heExlbmd0aCA+IDAgJiYgbWF4TGVuZ3RoIDwgZXZlbnQuc3ViamVjdC5sZW5ndGgpIHtcbiAgICAgICAgICAgIHZhciBzdWJqZWN0RGlzcGxheSA9IGV2ZW50LnN1YmplY3Quc3Vic3RyKDAsIG1heExlbmd0aCk7XG4gICAgICAgICAgICBzdWJqZWN0RGlzcGxheSA9IHRoaXMuZm9ybWF0VGV4dERpc3BsYXkoc3ViamVjdERpc3BsYXkpO1xuICAgICAgICAgICAgc3ViamVjdERpc3BsYXkgKz0gJy4uLic7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5mb3JtYXRUZXh0RGlzcGxheShzdWJqZWN0RGlzcGxheSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGV2ZW50LnN1YmplY3REaXNwbGF5O1xuICAgIH1cblxuICAgIC8vIFN1YkZpcm0gRGljdGlvbmFyeSBVdGlsc1xuICAgIGRpY3RDcmVhdGUoZGF0YTogRGljdGlvbmFyeURhdGEsIGNhbGxiYWNrOiBGdW5jdGlvbiwgb3B0aW9ucz86IGFueSkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZW5kUmVxdWVzdCh7XG4gICAgICAgICAgICB0eXBlOiAncG9zdCcsXG4gICAgICAgICAgICB1cmw6ICdzdWJmaXJtL2RpY3Rpb25hcnkvY3JlYXRlJyxcbiAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICBzdWNjZXNzOiBjYWxsYmFja1xuICAgICAgICB9LCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBkaWN0VXBkYXRlKGRhdGE6IERpY3Rpb25hcnlEYXRhLCBjYWxsYmFjazogRnVuY3Rpb24sIG9wdGlvbnM/OiBhbnkpIHtcbiAgICAgICAgZGF0YS5kaWN0SUQgPSBkYXRhLmRpY3RJRCB8fCBkYXRhLnV1aWQ7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbmRSZXF1ZXN0KHtcbiAgICAgICAgICAgIHR5cGU6ICdwb3N0JyxcbiAgICAgICAgICAgIHVybDogJ3N1YmZpcm0vZGljdGlvbmFyeS91cGRhdGUnLFxuICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGNhbGxiYWNrXG4gICAgICAgIH0sIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIGRpY3RSZW1vdmUoZGF0YTogRGljdGlvbmFyeURhdGEsIGNhbGxiYWNrOiBGdW5jdGlvbiwgb3B0aW9ucz86IGFueSkge1xuICAgICAgICBkYXRhLmRpY3RJRCA9IGRhdGEuZGljdElEIHx8IGRhdGEudXVpZDtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VuZFJlcXVlc3Qoe1xuICAgICAgICAgICAgdHlwZTogJ3Bvc3QnLFxuICAgICAgICAgICAgdXJsOiAnc3ViZmlybS9kaWN0aW9uYXJ5L3JlbW92ZScsXG4gICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgc3VjY2VzczogY2FsbGJhY2tcbiAgICAgICAgfSwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgZGljdExpc3QocGFyYW1zLCBjYWxsYmFjazogRnVuY3Rpb24sIG9wdGlvbnM/OiBhbnksIGNhY2hlUmVzcG9uc2U/OiBib29sZWFuKSB7XG4gICAgICAgIC8vIHJlZmVyZW5jZTogcmVxdWlyZWRcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VuZFJlcXVlc3Qoe1xuICAgICAgICAgICAgdHlwZTogJ3Bvc3QnLFxuICAgICAgICAgICAgdXJsOiAnc3ViZmlybS9kaWN0aW9uYXJ5L2xpc3QnLFxuICAgICAgICAgICAgZGF0YTogcGFyYW1zLFxuICAgICAgICAgICAgc3VjY2VzczogKGRhdGEpID0+IGNhbGxiYWNrKGRhdGEgJiYgZGF0YS5pdGVtcyB8fCBbXSksXG4gICAgICAgICAgICBlcnJvcjogKCkgPT4gY2FsbGJhY2soW10pXG4gICAgICAgIH0sIG9wdGlvbnMsIGNhY2hlUmVzcG9uc2UpO1xuICAgIH1cblxuICAgIC8vIExlYWRlclxuICAgIGxvYWRMZWFkZXJzKG9yZ2FuSWQ6IHN0cmluZywgY2FsbGJhY2s6IEZ1bmN0aW9uLCBvcHRpb25zPzogYW55LCBjYWNoZVJlc3BvbnNlPzogYm9vbGVhbikge1xuICAgICAgICBsZXQgcGFyYW1zID0ge1xuICAgICAgICAgICAgb3JnaWQ6IG9yZ2FuSWQgfHwgdGhpcy5nZXRPcmdJZCgpLFxuICAgICAgICAgICAgcmVmZXJlbmNlOiBMRUFERVJfUkVGRVJFTkNFXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZGljdExpc3QocGFyYW1zLCBmdW5jdGlvbiAobGVhZGVycykge1xuICAgICAgICAgICAgbGVhZGVycy5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGIub3JkZXIgLSBhLm9yZGVyO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjYWxsYmFjayhsZWFkZXJzKTtcbiAgICAgICAgfSwgb3B0aW9ucywgY2FjaGVSZXNwb25zZSk7XG4gICAgfVxuXG4gICAgbGVhZGVyQ3JlYXRlT3JVcGRhdGUoZGF0YTogRGljdGlvbmFyeURhdGEsIGNhbGxiYWNrOiBGdW5jdGlvbiwgb3B0aW9ucz86IGFueSkge1xuICAgICAgICBpZiAoIWRhdGEudXVpZCkge1xuICAgICAgICAgICAgZGF0YS5yZWZlcmVuY2UgPSBMRUFERVJfUkVGRVJFTkNFO1xuICAgICAgICAgICAgdGhpcy5kaWN0Q3JlYXRlKGRhdGEsIGNhbGxiYWNrLCBvcHRpb25zKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZGljdFVwZGF0ZShkYXRhLCBjYWxsYmFjaywgb3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBsZWFkZXJSZW1vdmUoZGF0YTogRGljdGlvbmFyeURhdGEsIGNhbGxiYWNrOiBGdW5jdGlvbiwgb3B0aW9ucz86IGFueSkge1xuICAgICAgICB0aGlzLmRpY3RSZW1vdmUoZGF0YSwgY2FsbGJhY2ssIG9wdGlvbnMpO1xuICAgIH1cbn1cbiJdfQ==