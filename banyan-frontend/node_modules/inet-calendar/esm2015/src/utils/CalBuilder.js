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
const moment = moment_;
window['moment'] = moment;
export class CalBuilder {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FsQnVpbGRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtY2FsZW5kYXIvIiwic291cmNlcyI6WyJzcmMvdXRpbHMvQ2FsQnVpbGRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzFDLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUM3QyxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFFekMsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQ3hELE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFDeEMsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3hDLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUNoRCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDeEQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQ3hELE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUM5QyxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDeEMsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEVBQWlCLGlCQUFpQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDdkUsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFFMUQsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFaEQsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7O01BQzVCLE1BQU0sR0FBRyxPQUFPO0FBQ3RCLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxNQUFNLENBQUM7QUFLMUIsTUFBTSxPQUFPLFVB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cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHt2blRvTGF0aW59IGZyb20gXCIuL2NvbW1vbi9BY2NlbnRcIjtcbmltcG9ydCB7RGF0ZVV0aWxzfSBmcm9tIFwiLi9jb21tb24vRGF0ZVV0aWxzXCI7XG5pbXBvcnQge0FqYXhBUEl9IGZyb20gXCIuL2NvbW1vbi9BamF4QVBJXCI7XG5pbXBvcnQge0NhbEV2ZW50fSBmcm9tIFwiLi9tb2RlbC9DYWxFdmVudFwiO1xuaW1wb3J0IHtDYWxBdHRlbmRlZVR5cGV9IGZyb20gXCIuL21vZGVsL0NhbEF0dGVuZGVlVHlwZVwiO1xuaW1wb3J0IHtDYWxDb25maWdzfSBmcm9tIFwiLi9DYWxDb25maWdzXCI7XG5pbXBvcnQge0NhbFR5cGV9IGZyb20gXCIuL21vZGVsL0NhbFR5cGVcIjtcbmltcG9ydCB7Q2FsQ2F0ZWdvcnl9IGZyb20gXCIuL21vZGVsL0NhbENhdGVnb3J5XCI7XG5pbXBvcnQge0NhbENhdGVnb3J5SWNvbn0gZnJvbSBcIi4vbW9kZWwvQ2FsQ2F0ZWdvcnlJY29uXCI7XG5pbXBvcnQge0NhbEF0dGVuZGVlUm9sZX0gZnJvbSBcIi4vbW9kZWwvQ2FsQXR0ZW5kZWVSb2xlXCI7XG5pbXBvcnQge0NhbFN1YlR5cGV9IGZyb20gXCIuL21vZGVsL0NhbFN1YlR5cGVcIjtcbmltcG9ydCB7Q2FsTW9kZX0gZnJvbSBcIi4vbW9kZWwvQ2FsTW9kZVwiO1xuaW1wb3J0IHtDYWxlbmRhckNhcn0gZnJvbSBcIi4vQ2FsZW5kYXJDYXJcIjtcbmltcG9ydCB7RGljdGlvbmFyeURhdGEsIFN1YkZpcm1EaWN0aW9uYXJ5fSBmcm9tIFwiLi9zdWJmaXJtL0RpY3Rpb25hcnlcIjtcbmltcG9ydCB7Q2FsQXR0ZW5kZWVTdGF0ZX0gZnJvbSBcIi4vbW9kZWwvQ2FsQXR0ZW5kZWVTdGF0ZVwiO1xuaW1wb3J0IHtDYWxBdHRlbmRlZX0gZnJvbSBcIi4vbW9kZWwvQ2FsQXR0ZW5kZWVcIjtcbmltcG9ydCB7TEVBREVSX1JFRkVSRU5DRX0gZnJvbSBcIi4vQ2FsQ29uc3RhbnRzXCI7XG5cbmltcG9ydCAqIGFzIG1vbWVudF8gZnJvbSAnbW9tZW50JztcbmNvbnN0IG1vbWVudCA9IG1vbWVudF87XG53aW5kb3dbJ21vbWVudCddID0gbW9tZW50O1xuXG5kZWNsYXJlIGxldCBpTmV0OiBhbnk7XG5kZWNsYXJlIGxldCAkOiBhbnk7XG5cbmV4cG9ydCBjbGFzcyBDYWxCdWlsZGVyIHtcbiAgICBpc0F1dGg6IGJvb2xlYW47XG4gICAgb3JnaWQ6IHN0cmluZztcbiAgICBUSU1FX05FV19VUERBVEU6IG51bWJlciA9IDEyO1xuICAgIHJvbGVVcmw6IHN0cmluZyA9ICd4c2NoZWR1bGUvcGFnZS9yb2xlJztcblxuICAgIE1PREUgPSBDYWxNb2RlO1xuICAgIFJPTEUgPSBDYWxBdHRlbmRlZVJvbGU7XG4gICAgY2FsU3ViVHlwZSA9IENhbFN1YlR5cGU7XG4gICAgY2FsQ2F0ZWdvcnkgPSBDYWxDYXRlZ29yeTtcbiAgICB2blRvTGF0aW4gPSB2blRvTGF0aW47XG4gICAgZGF0ZVV0aWxzID0gRGF0ZVV0aWxzO1xuICAgIGNhbEF0dGVuZGVlVHlwZSA9IENhbEF0dGVuZGVlVHlwZTtcbiAgICBjYWxBdHRlbmRlZVN0YXRlID0gQ2FsQXR0ZW5kZWVTdGF0ZTtcbiAgICBjYWxUeXBlID0gQ2FsVHlwZTtcblxuICAgIHN1YkZpcm1EaWMgPSBuZXcgU3ViRmlybURpY3Rpb25hcnkoKTtcbiAgICBjYXJVdGlscyA9IG5ldyBDYWxlbmRhckNhcih0aGlzLnN1YkZpcm1EaWMpO1xuXG4gICAgY29uZmlncyA9IENhbENvbmZpZ3M7XG5cbiAgICByZXNvdXJjZXMgPSB7XG4gICAgICAgIGRheXM6IFtcbiAgICAgICAgICAgICdDaOG7pyBuaOG6rXQnLFxuICAgICAgICAgICAgJ1Ro4bupIGhhaScsXG4gICAgICAgICAgICAnVGjhu6kgYmEnLFxuICAgICAgICAgICAgJ1Ro4bupIHTGsCcsXG4gICAgICAgICAgICAnVGjhu6kgbsSDbScsXG4gICAgICAgICAgICAnVGjhu6kgc8OhdScsXG4gICAgICAgICAgICAnVGjhu6kgYuG6o3knXG4gICAgICAgIF0sXG4gICAgICAgIHN0YXR1c2VzOiBbXG4gICAgICAgICAgICAnTeG7m2kgdOG6oW8nLFxuICAgICAgICAgICAgJ0JhbiBow6BuaCcsXG4gICAgICAgICAgICAnQ2jhu50gZHV54buHdCcsXG4gICAgICAgICAgICAnxJDDoyBo4buneScsXG4gICAgICAgICAgICAnVGjDtG5nIHF1YScsXG4gICAgICAgICAgICAnTOG7i2NoIMSRxqFuIHbhu4sga2jDoWMnXG4gICAgICAgIF0sXG4gICAgICAgIGFsbERheTogJ0PhuqMgbmfDoHknLFxuICAgICAgICBob3VyOiAnZ2nhu50nLFxuICAgICAgICBtaW51dGU6ICdwaMO6dCdcbiAgICB9O1xuXG4gICAgX3VzZXJSb2xlcyA9IHt9O1xuICAgIF9tYXBFdmVudHMgPSB7fTtcbiAgICBfY2FjaGVTdG9yZTogYW55O1xuICAgIF9xdWV1ZSA9IHt9O1xuXG4gICAgX29yZ2FuczogYW55W10gPSBbXTtcbiAgICBfbXlPcmdhbnM6IGFueVtdID0gW107XG5cbiAgICBfYXBwbHlDb25maWcoKSB7XG4gICAgICAgIGlOZXQuYXBwbHkodGhpcywgRGF0ZVV0aWxzKTtcblxuICAgICAgICAvLyBBcHBseSBjb25maWdcbiAgICAgICAgaWYgKHdpbmRvd1sneENhbGVuZGFyQ29uZmlnTGlzdCddICYmIHdpbmRvd1sneENhbGVuZGFyQ29uZmlnTGlzdCddLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHdpbmRvd1sneENhbGVuZGFyQ29uZmlnTGlzdCddLmZvckVhY2goKGNvbmZpZykgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBvYmogPSB0aGlzLmdldENvbmZpZ09iaihjb25maWcubmFtZSk7XG4gICAgICAgICAgICAgICAgaWYgKG9iaikge1xuICAgICAgICAgICAgICAgICAgICAkLmV4dGVuZChvYmosIGNvbmZpZyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25maWdzLnB1c2goY29uZmlnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAod2luZG93Wyd4Q2FsZW5kYXJDb25maWdDdXN0b21zJ10pIHtcbiAgICAgICAgICAgIGZvciAobGV0IGsgaW4gd2luZG93Wyd4Q2FsZW5kYXJDb25maWdDdXN0b21zJ10pIHtcbiAgICAgICAgICAgICAgICBsZXQgb2JqID0gdGhpcy5nZXRDb25maWdPYmooayk7XG4gICAgICAgICAgICAgICAgaWYgKG9iaikge1xuICAgICAgICAgICAgICAgICAgICBvYmoudmFsdWUgPSB3aW5kb3dbJ3hDYWxlbmRhckNvbmZpZ0N1c3RvbXMnXVtrXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBBcHBseSByZXNvdXJjZXNcbiAgICAgICAgaWYgKHdpbmRvd1sneGNhbGVuZGFyUmVzb3VyY2VzJ10pIHtcbiAgICAgICAgICAgIHRoaXMucmVzb3VyY2VzID0gd2luZG93Wyd4Y2FsZW5kYXJSZXNvdXJjZXMnXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY29uZmlncy5mb3JFYWNoKGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgICAgIGlmIChvYmoudmFsdWUgPT09ICdmYWxzZScpIHtcbiAgICAgICAgICAgICAgICBvYmoudmFsdWUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdHlwZUlzRGVwYXJ0bWVudCA9ICh0eXBlOiBzdHJpbmcpID0+IHR5cGUgPT09IENhbFR5cGUuREVQQVJUTUVOVDtcblxuICAgIHR5cGVJc0NvbW11bml0eSA9ICh0eXBlOiBzdHJpbmcpID0+ICB0eXBlID09PSBDYWxUeXBlLkNPTU1VTklUWTtcblxuICAgIHR5cGVJc09yZ2FuaXphdGlvbiA9ICh0eXBlOiBzdHJpbmcpID0+ICB0eXBlID09PSBDYWxUeXBlLk9SR0FOSVpBVElPTjtcblxuICAgIGNhdElzSW52aXRhdGlvbiA9IChjYXRlZ29yeTogc3RyaW5nKSA9PiBDYWxDYXRlZ29yeS5JTlZJVEFUSU9OID09PSBjYXRlZ29yeTtcblxuICAgIGNhdElzUGVyc29uYWwgPSAoY2F0ZWdvcnk6IHN0cmluZykgPT4gQ2FsQ2F0ZWdvcnkuUEVSU09OQUwgPT09IGNhdGVnb3J5O1xuXG4gICAgY2F0SXNDYXIgPSAoY2F0ZWdvcnk6IHN0cmluZykgPT4gQ2FsQ2F0ZWdvcnkuQ0FSID09PSBjYXRlZ29yeTtcblxuICAgIGNhdElzSW1wb3J0YW50ID0gKGNhdGVnb3J5OiBzdHJpbmcpID0+IENhbENhdGVnb3J5LklNUE9SVEFOVCA9PT0gY2F0ZWdvcnk7XG5cbiAgICBmb3JtYXREYXRlU3RyID0gKGRhdGUpID0+IHRoaXMuZm9ybWF0RGF0ZShkYXRlLCB0aGlzLmdldENvbmZpZ1ZhbHVlKCdEQVRFX0ZPUk1BVCcpKTtcblxuICAgIGZvcm1hdFRpbWVTdHIgPSAoZGF0ZSkgPT4gdGhpcy5mb3JtYXREYXRlKGRhdGUsIHRoaXMuZ2V0Q29uZmlnVmFsdWUoJ1RJTUVfRk9STUFUJykpO1xuXG4gICAgZm9ybWF0RGF0ZVRpbWVTdHIgPSAoZGF0ZSkgPT4gdGhpcy5mb3JtYXREYXRlKGRhdGUsIHRoaXMuZ2V0Q29uZmlnVmFsdWUoJ0RBVEVfVElNRV9GT1JNQVQnKSk7XG5cbiAgICBmb3JtYXREYXRlID0gKGRhdGUsIGZvcm1hdCkgPT4gbW9tZW50KGRhdGUpLmZvcm1hdChmb3JtYXQpO1xuXG4gICAgZ2V0Q29uZmlnVmFsdWUobmFtZTogc3RyaW5nKSB7XG4gICAgICAgIGxldCBvYmogPSB0aGlzLmdldENvbmZpZ09iaihuYW1lKTtcbiAgICAgICAgcmV0dXJuIG9iaiAmJiBvYmoudmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0Q29uZmlnT2JqKG5hbWU6IHN0cmluZykge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY29uZmlncy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHRoaXMuY29uZmlnc1tpXS5uYW1lID09PSBuYW1lKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnc1tpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFkZFF1ZXVlKG5hbWU6IGFueSwgZXhlY3V0b3I6IGFueSwgY2FsbGJhY2s6IGFueSkge1xuICAgICAgICB0aGlzLl9xdWV1ZVtuYW1lXSA9IHRoaXMuX3F1ZXVlW25hbWVdIHx8IFtdO1xuICAgICAgICB0aGlzLl9xdWV1ZVtuYW1lXS5wdXNoKGNhbGxiYWNrKTtcbiAgICAgICAgaWYgKHRoaXMuX3F1ZXVlW25hbWVdLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgICAgICBleGVjdXRvcihyZXNvbHZlKTtcbiAgICAgICAgICAgIH0pLnRoZW4oKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcXVldWVbbmFtZV0uZm9yRWFjaCgoZm4pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZm4gJiYgZm4odmFsdWUpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9xdWV1ZVtuYW1lXTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVhZHkoY2FsbGJhY2ssIG9wdGlvbnM/OiBhbnkpIHtcbiAgICAgICAgdGhpcy5fbG9hZE9yZ2Fucygob3JnYW5zKSA9PiB7XG4gICAgICAgICAgICBjYWxsYmFjayhvcmdhbnMsIHRoaXMuX2dldE9yZ2FuT25Jbml0KCkpO1xuICAgICAgICB9LCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICAvLyBDYWNoZSBhbGwgb3JnIGluIGEgbWludXRlIGZvciBwZXJmb3JtYW5jZVxuICAgIGNhY2hlU2Vzc2lvblN0b3JhZ2Uoa2V5OiBzdHJpbmcsIHZhbHVlPzogYW55KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoIXZhbHVlKSB7XG4gICAgICAgICAgICAgICAgLy8gQ2FjaGUgZGF0YSBpbiBhIG1pbnV0ZVxuICAgICAgICAgICAgICAgIGxldCB0aW1lQ2FjaGU6IG51bWJlciA9IDUgKiA2MDAwMDtcbiAgICAgICAgICAgICAgICBsZXQgY2FjaGU6IGFueSA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oa2V5KTtcbiAgICAgICAgICAgICAgICBpZiAoY2FjaGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FjaGUgPSBKU09OLnBhcnNlKGNhY2hlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gY2FjaGUudGltZSA8IHRpbWVDYWNoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNhY2hlLmRhdGE7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKGtleSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKGtleSwgSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgICAgICB0aW1lOiBuZXcgRGF0ZSgpLmdldFRpbWUoKSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogdmFsdWVcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIEZpeGVkIHByZXYgdmVyc2lvblxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KTtcbiAgICAgICAgfSBjYXRjaCAoZSkge31cbiAgICB9XG5cbiAgICAvLyBDYWNoZSBkYXRhIG9uIGdsb2JhbCB3aW5kb3csIHJlZnJlc2ggdGFiIHdpbGwgcmVzZXRcbiAgICBjYWNoZURhdGFUZW1wKGtleSwgZGF0YT86IGFueSkge1xuICAgICAgICB0aGlzLl9jYWNoZVN0b3JlID0gdGhpcy5fY2FjaGVTdG9yZSB8fCB7fTtcbiAgICAgICAgaWYgKGRhdGEgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NhY2hlU3RvcmVba2V5XTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2NhY2hlU3RvcmVba2V5XSA9IGRhdGE7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRPcmdJZChvcmdpZDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMub3JnaWQgPSBvcmdpZDtcbiAgICAgICAgdGhpcy5fY2FjaGVPcmdJZChvcmdpZCk7XG4gICAgfVxuXG4gICAgZ2V0T3JnSWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm9yZ2lkIHx8IHRoaXMuX2NhY2hlT3JnSWQoKSB8fCBpTmV0Lm9yZ2FuSWQ7XG4gICAgfVxuXG4gICAgX2NhY2hlT3JnSWQob3JnaWQ/OiBhbnkpIHtcbiAgICAgICAgbGV0IGlkID0gJ3hjYWxlbmRhcl9vcmdpZCc7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoIW9yZ2lkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGxvY2FsU3RvcmFnZS5nZXRJdGVtKGlkKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oaWQsIG9yZ2lkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZSkge31cbiAgICB9XG5cbiAgICBnZXRIb3VyTWludXRlKGRhdGU/OiBhbnkpIHtcbiAgICAgICAgaWYgKGRhdGUuZ2V0VGltZSkge1xuICAgICAgICAgICAgLy8gZGF0ZSBvYmplY3RcbiAgICAgICAgICAgIHJldHVybiBkYXRlLmdldEhvdXJzKCkgKiA2MCArIGRhdGUuZ2V0TWludXRlcygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gc3RyaW5nIGhvdXJcbiAgICAgICAgICAgIGRhdGUgPSBkYXRlLnNwbGl0KCc6Jyk7XG4gICAgICAgICAgICByZXR1cm4gTnVtYmVyKGRhdGVbMF0pICogNjAgKyBOdW1iZXIoZGF0ZVsxXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjcmVhdGUoZm9ybTogYW55LCBzdWNjZXNzLCBvcHRpb25zPzogYW55KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBvc3RGb3JtKHtcbiAgICAgICAgICAgIHVybDogJ2NhbGJ1aWxkZXIvZWxlbWVudC9jcmVhdGUnLFxuICAgICAgICAgICAgZGF0YTogZm9ybSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChldmVudCAmJiBldmVudC51dWlkKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmluZGV4RXZlbnQoZXZlbnQpO1xuICAgICAgICAgICAgICAgIHN1Y2Nlc3MoZXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICB1cGRhdGVFdmVudEJ5Um9sZShwYXJhbXMsIHN1Y2Nlc3MsIG9wdGlvbnM/OiBhbnkpIHtcbiAgICAgICAgbGV0IG9yZ2FuSWQgPSBwYXJhbXMgJiYgcGFyYW1zLm9yZ2lkIHx8IHRoaXMuZ2V0T3JnSWQoKTtcbiAgICAgICAgdGhpcy5sb2FkUm9sZShvcmdhbklkLCgpID0+IHtcbiAgICAgICAgICAgIGxldCBldmVudCA9IHRoaXMuZ2V0RXZlbnRCeU9iamVjdElkKHBhcmFtcyAmJiBwYXJhbXMuZWxlbWVudCk7XG4gICAgICAgICAgICBpZiAodGhpcy5pc1Jldmlld2VyKG9yZ2FuSWQpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXZpZXdVcGRhdGUocGFyYW1zLCBzdWNjZXNzLCBvcHRpb25zKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5pc093blJldmlld2VyKG9yZ2FuSWQpICYmIGV2ZW50ICYmIHRoaXMubWVJc0NyZWF0b3IoZXZlbnQpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vd25lclJldmlld1VwZGF0ZShwYXJhbXMsIHN1Y2Nlc3MsIG9wdGlvbnMpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZShwYXJhbXMsIHN1Y2Nlc3MsIG9wdGlvbnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICB1cGRhdGUoZm9ybSwgc3VjY2Vzcywgb3B0aW9ucz86IGFueSkge1xuICAgICAgICByZXR1cm4gdGhpcy5wb3N0Rm9ybSh7XG4gICAgICAgICAgICB1cmw6ICdjYWxidWlsZGVyL2VsZW1lbnQvdXBkYXRlJyxcbiAgICAgICAgICAgIGRhdGE6IGZvcm0sXG4gICAgICAgICAgICBzdWNjZXNzOiAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQgJiYgZXZlbnQudXVpZClcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmRleEV2ZW50KGV2ZW50KTtcbiAgICAgICAgICAgICAgICBzdWNjZXNzICYmIHN1Y2Nlc3MoZXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICByZXZpZXdVcGRhdGUoZm9ybSwgc3VjY2Vzcywgb3B0aW9ucz86IGFueSkge1xuICAgICAgICByZXR1cm4gdGhpcy5wb3N0Rm9ybSh7XG4gICAgICAgICAgICB1cmw6ICdjYWxidWlsZGVyL3Jldmlld3VwZGF0ZScsXG4gICAgICAgICAgICBkYXRhOiBmb3JtLFxuICAgICAgICAgICAgc3VjY2VzczogKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50ICYmIGV2ZW50LnV1aWQpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5kZXhFdmVudChldmVudCk7XG4gICAgICAgICAgICAgICAgc3VjY2VzcyAmJiBzdWNjZXNzKGV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgb3duZXJSZXZpZXdVcGRhdGUoZm9ybSwgc3VjY2Vzcywgb3B0aW9ucz86IGFueSkge1xuICAgICAgICByZXR1cm4gdGhpcy5wb3N0Rm9ybSh7XG4gICAgICAgICAgICB1cmw6ICdjYWxidWlsZGVyL293bmVyL3Jldmlld3VwZGF0ZScsXG4gICAgICAgICAgICBkYXRhOiBmb3JtLFxuICAgICAgICAgICAgc3VjY2VzczogKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50ICYmIGV2ZW50LnV1aWQpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5kZXhFdmVudChldmVudCk7XG4gICAgICAgICAgICAgICAgc3VjY2VzcyAmJiBzdWNjZXNzKGV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcmVtb3ZlKHBhcmFtcywgY2FsbGJhY2ssIG9wdGlvbnM/OiBhbnkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VuZFJlcXVlc3Qoe1xuICAgICAgICAgICAgdXJsOiAnY2FsYnVpbGRlci9lbGVtZW50L2RlbGV0ZScsXG4gICAgICAgICAgICBkYXRhOiBwYXJhbXMsXG4gICAgICAgICAgICBzdWNjZXNzOiBjYWxsYmFja1xuICAgICAgICB9LCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBjYW5jZWwocGFyYW1zLCBzdWNjZXNzLCBvcHRpb25zPzogYW55KSB7XG4gICAgICAgIGxldCBvcmdhbklkID0gcGFyYW1zICYmIHBhcmFtcy5vcmdpZCB8fCB0aGlzLmdldE9yZ0lkKCk7XG4gICAgICAgIHRoaXMubG9hZFJvbGUob3JnYW5JZCwoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5pc1Jldmlld2VyKG9yZ2FuSWQpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXZpZXdDYW5jZWwocGFyYW1zLCBzdWNjZXNzLCBvcHRpb25zKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5pc093blJldmlld2VyKG9yZ2FuSWQpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vd25lclJldmlld0NhbmNlbChwYXJhbXMsIHN1Y2Nlc3MsIG9wdGlvbnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICAvLyBlbGVtZW50LCBtZW1iZXJzXG4gICAgcmV2aWV3Tm90aWZ5KHBhcmFtcywgc3VjY2Vzcywgb3B0aW9ucz86IGFueSkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZW5kUmVxdWVzdCh7XG4gICAgICAgICAgICB0eXBlOiAncG9zdCcsXG4gICAgICAgICAgICB1cmw6ICdjYWxidWlsZGVyL3Jldmlld25vdGlmeScsXG4gICAgICAgICAgICBkYXRhOiBwYXJhbXMsXG4gICAgICAgICAgICBzdWNjZXNzOiBzdWNjZXNzXG4gICAgICAgIH0sIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHJldmlld0NhbmNlbChwYXJhbXMsIHN1Y2Nlc3MsIG9wdGlvbnM/OiBhbnkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VuZFJlcXVlc3Qoe1xuICAgICAgICAgICAgdXJsOiAnY2FsYnVpbGRlci9yZXZpZXdjYW5jZWwnLFxuICAgICAgICAgICAgZGF0YTogcGFyYW1zLFxuICAgICAgICAgICAgc3VjY2VzczogKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50ICYmIGV2ZW50LnV1aWQpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5kZXhFdmVudChldmVudCk7XG4gICAgICAgICAgICAgICAgc3VjY2VzcyAmJiBzdWNjZXNzKGV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgb3duZXJSZXZpZXdDYW5jZWwocGFyYW1zLCBzdWNjZXNzLCBvcHRpb25zPzogYW55KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbmRSZXF1ZXN0KHtcbiAgICAgICAgICAgIHVybDogJ2NhbGJ1aWxkZXIvb3duZXIvcmV2aWV3Y2FuY2VsJyxcbiAgICAgICAgICAgIGRhdGE6IHBhcmFtcyxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChldmVudCAmJiBldmVudC51dWlkKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmluZGV4RXZlbnQoZXZlbnQpO1xuICAgICAgICAgICAgICAgIHN1Y2Nlc3MgJiYgc3VjY2VzcyhldmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIGRlbGV0ZUF0dGFjaG1lbnQocGFyYW1zLCBzdWNjZXNzLCBvcHRpb25zPzogYW55KSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBmaWxlSUQ6ICdpZDEsaWQyJ1xuICAgICAgICAgKiBlbGVtZW50OiAndXVpZCdcbiAgICAgICAgICovXG4gICAgICAgIHJldHVybiB0aGlzLnNlbmRSZXF1ZXN0KHtcbiAgICAgICAgICAgIHR5cGU6ICdwb3N0JyxcbiAgICAgICAgICAgIHVybDogJ2NhbGJ1aWxkZXIvZmlsZS9kZWxldGUnLFxuICAgICAgICAgICAgZGF0YTogcGFyYW1zLFxuICAgICAgICAgICAgc3VjY2VzczogKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgc3VjY2VzcyAmJiBzdWNjZXNzKHRoaXMuaW5kZXhFdmVudChldmVudCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBvcHRpb25zKTtcbiAgICB9XG5cblxuICAgIGxvYWRPcmdhbk1lbWJlcnMob3JnYW5JZDogc3RyaW5nLCBjYWxsYmFjazogRnVuY3Rpb24sIG9wdGlvbnM/OiBhbnkpIHtcbiAgICAgICAgb3JnYW5JZCA9IG9yZ2FuSWQgfHwgdGhpcy5nZXRPcmdJZCgpO1xuICAgICAgICByZXR1cm4gdGhpcy5zZWFyY2hBdHRlbmRlZSh7b3JnaWQ6IG9yZ2FuSWR9LCBjYWxsYmFjaywgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgc2VhcmNoQXR0ZW5kZWUocGFyYW1zLCBzdWNjZXNzLCBvcHRpb25zPzogYW55KSB7XG4gICAgICAgIHRoaXMuX3NlYXJjaEF0dGVuZGVlKHBhcmFtcywgZnVuY3Rpb24gKG1lbWJlcnMpIHtcbiAgICAgICAgICAgIG1lbWJlcnMuc29ydCgoYSwgYikgPT4gYS5mdWxsbmFtZS5sb2NhbGVDb21wYXJlKGIuZnVsbG5hbWUpKTtcbiAgICAgICAgICAgIHN1Y2Nlc3MobWVtYmVycyk7XG4gICAgICAgIH0sIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIF9zZWFyY2hBdHRlbmRlZShwYXJhbXMsIHN1Y2Nlc3MsIG9wdGlvbnM/OiBhbnkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VuZFJlcXVlc3Qoe1xuICAgICAgICAgICAgdXJsOiAnY2FsYnVpbGRlci9hdHRlbmRlZS9zZWFyY2gnLFxuICAgICAgICAgICAgZGF0YTogcGFyYW1zLFxuICAgICAgICAgICAgc3VjY2VzczogKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgbWVtYmVycyA9IGRhdGEgJiYgZGF0YS5lbGVtZW50cyB8fCBbXTtcbiAgICAgICAgICAgICAgICBtZW1iZXJzID0gbWVtYmVycy5maWx0ZXIoKGl0ZW0pID0+ICFpdGVtLmFsaWFzKTtcbiAgICAgICAgICAgICAgICBtZW1iZXJzLmZvckVhY2goKG1lbWJlcikgPT4gdGhpcy5faW5kZXhBY2NvdW50KG1lbWJlcikpO1xuICAgICAgICAgICAgICAgIHN1Y2Nlc3MobWVtYmVycyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzdWNjZXNzKFtdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgb3B0aW9ucywgdHJ1ZSk7XG4gICAgfVxuXG4gICAgX2luZGV4QWNjb3VudChhY2NvdW50KSB7XG4gICAgICAgIC8vIFJlbW92ZSBzdWZmaXggZW1haWwgYmVmb3JlIHNlYXJjaCB1c2VyIFwiYmluaEBiaW5oZGluaC5nb3Yudm5cIlxuICAgICAgICAvLyBkb24ndCBzZWFyY2ggb24gc3VmZml4IFwiQGJpbmhkaW5oLmdvdi52blwiXG4gICAgICAgIGFjY291bnRbJ19pbmRleCddID0gdm5Ub0xhdGluKGFjY291bnQuZnVsbG5hbWUudG9Mb3dlckNhc2UoKSkgKyAnICcgK1xuICAgICAgICAgICAgYWNjb3VudC51c2VybmFtZS5zcGxpdCgnQCcpWzBdO1xuICAgICAgICBhY2NvdW50LmRpc3BsYXkgPSB0aGlzLmluc2VydFByZWZpeEF0dGVuZGVlKGFjY291bnQuZnVsbG5hbWUgfHwgYWNjb3VudC51c2VybmFtZSk7XG4gICAgICAgIHJldHVybiBhY2NvdW50O1xuICAgIH1cblxuICAgIGxvYWREZXBhcnRtZW50cyhwYXJhbXMsIGNhbGxiYWNrLCBvcHRpb25zPzogYW55KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbmRSZXF1ZXN0KHtcbiAgICAgICAgICAgIHVybDogJ2NhbGJ1aWxkZXIvZGVwYXJ0bWVudC9saXN0JyxcbiAgICAgICAgICAgIGRhdGE6IHBhcmFtcyxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgZGF0YSA9IGRhdGEgJiYgZGF0YS5pdGVtcyB8fCBbXTtcbiAgICAgICAgICAgICAgICBkYXRhLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGEub3JkZXIgLSBiLm9yZGVyO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGRhdGEpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soW10pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBvcHRpb25zLCB0cnVlKTtcbiAgICB9XG5cbiAgICBnZXRNeU9yZyhjYWxsYmFjaywgb3B0aW9ucz86IGFueSkge1xuICAgICAgICBsZXQga2V5Q2FjaGUgPSAnY2FsX215X29yZ2Fucyc7XG5cbiAgICAgICAgLy8gUmVtb3ZlIGRhdGEgdW51c2VkIHByZXYgdmVyc2lvblxuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShrZXlDYWNoZSk7XG5cbiAgICAgICAga2V5Q2FjaGUgKz0gaU5ldC51c2VyY29kZTtcblxuICAgICAgICB0aGlzLl9teU9yZ2FucyA9IHRoaXMuX215T3JnYW5zLmxlbmd0aCAmJiB0aGlzLl9teU9yZ2FucyB8fCB0aGlzLmNhY2hlU2Vzc2lvblN0b3JhZ2Uoa2V5Q2FjaGUpIHx8IFtdO1xuICAgICAgICBpZiAodGhpcy5fbXlPcmdhbnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKHRoaXMuX215T3JnYW5zKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNlbmRSZXF1ZXN0KHtcbiAgICAgICAgICAgIHVybDogJ3BsdWdpbi9vcmdhbml6YXRpb24vbGlzdCcsXG4gICAgICAgICAgICBzdWNjZXNzOiAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBvcmdhbnMgPSB0aGlzLl9jb252ZXJ0T3JnKGRhdGEgJiYgZGF0YS5lbGVtZW50cyB8fCBbXSk7XG4gICAgICAgICAgICAgICAgaWYgKG9yZ2Fucy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIG9yZ2FucyA9IHRoaXMudmlzaWJsZU15T3JnYW5zKG9yZ2Fucyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX215T3JnYW5zID0gb3JnYW5zO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhY2hlU2Vzc2lvblN0b3JhZ2Uoa2V5Q2FjaGUsIG9yZ2Fucyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKG9yZ2Fucyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3I6ICgpID0+IGNhbGxiYWNrKFtdKVxuICAgICAgICB9LCBvcHRpb25zLCB0cnVlKTtcblxuICAgIH1cblxuICAgIHZpc2libGVNeU9yZ2FucyhvcmdhbnMpIHtcbiAgICAgICAgcmV0dXJuIG9yZ2Fucy5maWx0ZXIoKG9yZ2FuKSA9PiB7XG4gICAgICAgICAgICBsZXQgX29yZ2FuID0gdGhpcy5nZXRPcmdCeUlkKG9yZ2FuLmZpcm1VVUlEKTtcbiAgICAgICAgICAgIHJldHVybiBfb3JnYW4gJiYgISFfb3JnYW4uZ3JvdXBUeXBlO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXRBbGxPcmcoY2FsbGJhY2s6IGFueSwgb3B0aW9ucz86IGFueSk6IGFueSB7XG4gICAgICAgIGxldCBrZXlDYWNoZSA9ICdjYWxfb3JnYW5fbGlzdCc7XG5cbiAgICAgICAgLy8gUmVtb3ZlIGRhdGEgdW51c2VkIHByZXYgdmVyc2lvblxuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShrZXlDYWNoZSk7XG5cbiAgICAgICAga2V5Q2FjaGUgKz0gaU5ldC51c2VyY29kZTtcblxuICAgICAgICB0aGlzLl9vcmdhbnMgPSB0aGlzLl9vcmdhbnMubGVuZ3RoICYmIHRoaXMuX29yZ2FucyB8fCB0aGlzLmNhY2hlU2Vzc2lvblN0b3JhZ2Uoa2V5Q2FjaGUpIHx8IFtdO1xuICAgICAgICAvLyBDaGVjayBhbGwgb3JnIGlzIGNhY2hlZFxuICAgICAgICBpZiAodGhpcy5fb3JnYW5zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayh0aGlzLl9vcmdhbnMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnNlbmRSZXF1ZXN0KHtcbiAgICAgICAgICAgIGRhdGE6IHtwYWdlU2l6ZTogLTF9LFxuICAgICAgICAgICAgdXJsOiAncGx1Z2luL29yZ2FuaXphdGlvbi9zZWFyY2gnLFxuICAgICAgICAgICAgc3VjY2VzczogKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgb3JnYW5zID0gdGhpcy5fY29udmVydE9yZyhkYXRhICYmIGRhdGEuaXRlbXMgfHwgW10pO1xuICAgICAgICAgICAgICAgIGlmIChvcmdhbnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBPbmx5IGdldCBvcmdhbiBoYXMgZ3JvdXBUeXBlXG4gICAgICAgICAgICAgICAgICAgIG9yZ2FucyA9IHRoaXMudmlzaWJsZU9yZ2FucyhvcmdhbnMpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9vcmdhbnMgPSBvcmdhbnM7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FjaGVTZXNzaW9uU3RvcmFnZShrZXlDYWNoZSwgdGhpcy5fb3JnYW5zKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sob3JnYW5zKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvcjogKCkgPT4gY2FsbGJhY2soW10pXG4gICAgICAgIH0sIG9wdGlvbnMsIHRydWUpO1xuICAgIH1cblxuICAgIHZpc2libGVPcmdhbnMob3JnYW5zKSB7XG4gICAgICAgIHJldHVybiBvcmdhbnMuZmlsdGVyKChvcmdhbikgPT4gISFvcmdhbi5ncm91cFR5cGUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2xvYWRPcmdhbnMoY2FsbGJhY2ssIG9wdGlvbnM/OiBhbnkpIHtcbiAgICAgICAgaWYgKHRoaXMuX29yZ2FucyAmJiB0aGlzLl9vcmdhbnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY2FsbGJhY2sodGhpcy5fb3JnYW5zLnNsaWNlKCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5nZXRBbGxPcmcoKG9yZ2FucykgPT4ge1xuXG4gICAgICAgICAgICAgICAgLy8gRGV0ZWN0IHVzZXIgbG9naW5cbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRSb2xlKCcnLCAocm9sZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzQXV0aCA9ICEhcm9sZS5pc0F1dGg7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyb2xlLmlzQXV0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRNeU9yZygobXlPcmdhbnMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBNb3ZlIG15IG9yZ2FucyB0byBmaXJzdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSBteU9yZ2Fucy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbXlPcmdhbiA9IG15T3JnYW5zW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IG9yZ2Fucy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG9yZ2FuID0gb3JnYW5zW2pdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9yZ2FuLmZpcm1VVUlEID09PSBteU9yZ2FuLmZpcm1VVUlEKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3JnYW5zLnNwbGljZShqLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcmdhbi5teU9yZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3JnYW5zLnVuc2hpZnQob3JnYW4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKG9yZ2Fucyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sob3JnYW5zKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sIG9wdGlvbnMpO1xuXG4gICAgICAgICAgICB9LCBvcHRpb25zKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldFRyZWVPcmcoY2FsbGJhY2ssIGRvbWFpbj86IGFueSkge1xuICAgICAgICB0aGlzLl9sb2FkT3JnYW5zKChkYXRhKSA9PiB7XG4gICAgICAgICAgICBsZXQgdHJlZTogYW55ID0gW107XG5cbiAgICAgICAgICAgIC8vIFNldCBjaGlsZHJlbiBpcyBlbXB0eVxuICAgICAgICAgICAgZGF0YS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgaXRlbS5jaGlsZHJlbiA9IFtdO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIEJ1aWxkIHRyZWUgb3JnIGxpc3RcbiAgICAgICAgICAgIGRhdGEuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChpdGVtLnBhcmVudElEKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBwYXJlbnRPcmdhbiA9IHRoaXMuZ2V0T3JnQnlJZChpdGVtLnBhcmVudElEKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmVudE9yZ2FuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnRPcmdhbi5jaGlsZHJlbi5wdXNoKGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdHJlZS5wdXNoKGl0ZW0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0cmVlLmRhdGEgPSBkYXRhO1xuICAgICAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2sodHJlZSk7XG4gICAgICAgIH0sIGRvbWFpbik7XG4gICAgfVxuXG4gICAgaW5kZXhPcmdTZWFyY2goaXRlbT86IGFueSkge1xuICAgICAgICBpdGVtLl9pbmRleCA9IHZuVG9MYXRpbihbaXRlbS5maXJtTmFtZSwgaXRlbS5maXJtVVVJRCwgaXRlbS5maXJtUHJlZml4XS5qb2luKCcgJykudG9Mb3dlckNhc2UoKSk7XG4gICAgfVxuXG4gICAgaXNNeU9yZyhvcmdpZD86IHN0cmluZykge1xuICAgICAgICBsZXQgb3JnID0gdGhpcy5nZXRPcmdCeUlkKG9yZ2lkKTtcbiAgICAgICAgcmV0dXJuIG9yZyAmJiBvcmcubXlPcmc7XG4gICAgfVxuXG4gICAgbG9hZEV2ZW50KHBhcmFtcywgY2FsbGJhY2ssIG9wdGlvbnM/OiBhbnkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VuZFJlcXVlc3Qoe1xuICAgICAgICAgICAgdHlwZTogJ3Bvc3QnLFxuICAgICAgICAgICAgdXJsOiAnY2FsYnVpbGRlci9lbGVtZW50L2xvYWQnLFxuICAgICAgICAgICAgZGF0YTogcGFyYW1zLFxuICAgICAgICAgICAgc3VjY2VzczogKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIWRhdGEgfHwgIWRhdGEudXVpZCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBFdmVudCBub3QgZm91bmQsIHRyeSB0byBsb2FkIHJldmlldyBldmVudFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRSb2xlKHBhcmFtcy5vcmdpZCwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNSZXZpZXdlcihwYXJhbXMub3JnaWQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkRXZlbnRSZXZpZXcocGFyYW1zLCBjYWxsYmFjaywgb3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmluZGV4RXZlbnQoZGF0YSk7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHVwZGF0ZVN0YXRlKHBhcmFtcywgY2FsbGJhY2ssIG9wdGlvbnM/OiBhbnkpIHtcbiAgICAgICAgaWYgKHBhcmFtcy5ub3Rlcykge1xuICAgICAgICAgICAgcGFyYW1zLm5vdGVzID0gdGhpcy5mb3JtYXRUZXh0VXBkYXRlKHBhcmFtcy5ub3Rlcyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMubG9hZEV2ZW50KHBhcmFtcywgY2FsbGJhY2ssIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIGxvYWRFdmVudFJldmlldyhwYXJhbXMsIHN1Y2Nlc3MsIG9wdGlvbnM/OiBhbnkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VuZFJlcXVlc3Qoe1xuICAgICAgICAgICAgdXJsOiAnY2FsYnVpbGRlci9yZXZpZXdsb2FkJyxcbiAgICAgICAgICAgIGRhdGE6IHBhcmFtcyxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChldmVudCAmJiBldmVudC51dWlkKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmluZGV4RXZlbnQoZXZlbnQpO1xuICAgICAgICAgICAgICAgIHN1Y2Nlc3MgJiYgc3VjY2VzcyhldmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIGxvYWRHcm91cEV2ZW50KHBhcmFtcywgc3VjY2Vzcywgb3B0aW9ucz86IGFueSkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZW5kUmVxdWVzdCh7XG4gICAgICAgICAgICB1cmw6ICdjYWxidWlsZGVyL2VsZW1lbnQvZ3JvdXAnLFxuICAgICAgICAgICAgZGF0YTogcGFyYW1zLFxuICAgICAgICAgICAgc3VjY2VzczogKGRhdGEpID0+IHN1Y2Nlc3ModGhpcy5tb2RpZnlFdmVudChkYXRhICYmIGRhdGEuaXRlbXMgfHwgW10pKVxuICAgICAgICB9LCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBsb2FkT3JnRXZlbnRzKHBhcmFtcywgY2FsbGJhY2ssIG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5fbG9hZE9uRGlmZmVyWWVhcih0aGlzLl9sb2FkT3JnRXZlbnRzLCBwYXJhbXMsIGNhbGxiYWNrLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBfbG9hZE9yZ0V2ZW50cyhwYXJhbXMsIGNhbGxiYWNrLCBvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbmRSZXF1ZXN0KHtcbiAgICAgICAgICAgIHR5cGU6ICdwb3N0JyxcbiAgICAgICAgICAgIHVybDogJ2NhbGJ1aWxkZXIvbWFpbmJvYXJkL3ZpZXcnLFxuICAgICAgICAgICAgZGF0YTogcGFyYW1zLFxuICAgICAgICAgICAgc3VjY2VzczogKGRhdGEpID0+IGNhbGxiYWNrKHRoaXMubW9kaWZ5RXZlbnQoZGF0YSAmJiBkYXRhLml0ZW1zIHx8IFtdKSlcbiAgICAgICAgfSwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgbG9hZENvbW11bml0eUV2ZW50cyhwYXJhbXMsIGNhbGxiYWNrLCBvcHRpb25zKSB7XG4gICAgICAgIHRoaXMuX2xvYWRPbkRpZmZlclllYXIodGhpcy5fbG9hZENvbW11bml0eUV2ZW50cywgcGFyYW1zLCBjYWxsYmFjaywgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgX2xvYWRDb21tdW5pdHlFdmVudHMocGFyYW1zLCBjYWxsYmFjaywgb3B0aW9ucykge1xuICAgICAgICByZXR1cm4gdGhpcy5zZW5kUmVxdWVzdCh7XG4gICAgICAgICAgICB0eXBlOiAncG9zdCcsXG4gICAgICAgICAgICB1cmw6ICdjYWxidWlsZGVyL21haW5ib2FyZC9wdWJsaXNoZWQnLFxuICAgICAgICAgICAgZGF0YTogcGFyYW1zLFxuICAgICAgICAgICAgc3VjY2VzczogKGRhdGEpID0+IGNhbGxiYWNrKHRoaXMubW9kaWZ5RXZlbnQoZGF0YSAmJiBkYXRhLml0ZW1zIHx8IFtdKSksXG4gICAgICAgICAgICB1c2VPcmdJZDogdHJ1ZVxuICAgICAgICB9LCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBsb2FkQWxsUHVibGlzaEV2ZW50cyhwYXJhbXMsIGNhbGxiYWNrLCBvcHRpb25zKSB7XG4gICAgICAgIHRoaXMuX2xvYWRPbkRpZmZlclllYXIodGhpcy5fbG9hZEFsbFB1Ymxpc2hFdmVudHMsIHBhcmFtcywgY2FsbGJhY2ssIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIF9sb2FkQWxsUHVibGlzaEV2ZW50cyhwYXJhbXMsIGNhbGxiYWNrLCBvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbmRSZXF1ZXN0KHtcbiAgICAgICAgICAgIHR5cGU6ICdwb3N0JyxcbiAgICAgICAgICAgIHVybDogJ2NhbGJ1aWxkZXIvbWFpbmJvYXJkL3B1Ymxpc2hlZCcsXG4gICAgICAgICAgICBkYXRhOiBwYXJhbXMsXG4gICAgICAgICAgICBzdWNjZXNzOiAoZGF0YSkgPT4gY2FsbGJhY2sodGhpcy5tb2RpZnlFdmVudChkYXRhICYmIGRhdGEuaXRlbXMgfHwgW10pKSxcbiAgICAgICAgICAgIHJlbW92ZU9yZ0lkOiB0cnVlXG4gICAgICAgIH0sIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIGxvYWRQdWJsaXNoRXZlbnRzKHBhcmFtcywgY2FsbGJhY2s6IEZ1bmN0aW9uLCBvcHRpb25zPzogYW55KSB7XG4gICAgICAgIC8vIExvYWQgcm9sZVxuICAgICAgICB0aGlzLmxvYWRSb2xlKHBhcmFtcy5vcmdpZCwgICgpID0+IHtcbiAgICAgICAgICAgIC8vIFJldmlld2VyXG4gICAgICAgICAgICBpZiAodGhpcy5pc015T3JnKHBhcmFtcy5vcmdpZCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRPcmdFdmVudHMocGFyYW1zLCBjYWxsYmFjaywgb3B0aW9ucyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZENvbW11bml0eUV2ZW50cyhwYXJhbXMsIGNhbGxiYWNrLCBvcHRpb25zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgZ2V0UmV2aWV3RXZlbnRzKHBhcmFtcywgY2FsbGJhY2ssIG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5fbG9hZE9uRGlmZmVyWWVhcih0aGlzLl9nZXRSZXZpZXdFdmVudHMsIHBhcmFtcywgY2FsbGJhY2ssIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIF9nZXRSZXZpZXdFdmVudHMocGFyYW1zLCBjYWxsYmFjaywgb3B0aW9ucykge1xuICAgICAgICByZXR1cm4gdGhpcy5zZW5kUmVxdWVzdCh7XG4gICAgICAgICAgICB0eXBlOiAncG9zdCcsXG4gICAgICAgICAgICB1cmw6ICdjYWxidWlsZGVyL3Jldmlld2xpc3QnLFxuICAgICAgICAgICAgZGF0YTogcGFyYW1zLFxuICAgICAgICAgICAgc3VjY2VzczogKGRhdGEpID0+IGNhbGxiYWNrKHRoaXMubW9kaWZ5RXZlbnQoZGF0YSAmJiBkYXRhLml0ZW1zIHx8IFtdKSlcbiAgICAgICAgfSwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgZ2V0Vmlld0V2ZW50cyhwYXJhbXMsIGNhbGxiYWNrLCBvcHRpb25zKSB7XG4gICAgICAgIHRoaXMuX2xvYWRPbkRpZmZlclllYXIodGhpcy5fZ2V0Vmlld0V2ZW50cywgcGFyYW1zLCBjYWxsYmFjaywgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgX2dldFZpZXdFdmVudHMocGFyYW1zLCBjYWxsYmFjaywgb3B0aW9ucykge1xuICAgICAgICByZXR1cm4gdGhpcy5zZW5kUmVxdWVzdCh7XG4gICAgICAgICAgICB0eXBlOiAncG9zdCcsXG4gICAgICAgICAgICB1cmw6ICdjYWxidWlsZGVyL3ZpZXdsaXN0JyxcbiAgICAgICAgICAgIGRhdGE6IHBhcmFtcyxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IChkYXRhKSA9PiBjYWxsYmFjayh0aGlzLm1vZGlmeUV2ZW50KGRhdGEgJiYgZGF0YS5pdGVtcyB8fCBbXSkpXG4gICAgICAgIH0sIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHJldmlld1NlYXJjaEV2ZW50cyhwYXJhbXMsIGNhbGxiYWNrLCBvcHRpb25zKSB7XG4gICAgICAgIHRoaXMuX2xvYWRPbkRpZmZlclllYXIodGhpcy5fcmV2aWV3U2VhcmNoRXZlbnRzLCBwYXJhbXMsIGNhbGxiYWNrLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICAvLyBtZW1iZXJzOiBcIiwsXCJcbiAgICBfcmV2aWV3U2VhcmNoRXZlbnRzKHBhcmFtcywgY2FsbGJhY2ssIG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VuZFJlcXVlc3Qoe1xuICAgICAgICAgICAgdHlwZTogJ3Bvc3QnLFxuICAgICAgICAgICAgdXJsOiAnY2FsYnVpbGRlci9yZXZpZXdzZWFyY2gnLFxuICAgICAgICAgICAgZGF0YTogcGFyYW1zLFxuICAgICAgICAgICAgc3VjY2VzczogKGRhdGEpID0+IGNhbGxiYWNrKHRoaXMubW9kaWZ5RXZlbnQoZGF0YSAmJiBkYXRhLml0ZW1zIHx8IFtdKSlcbiAgICAgICAgfSwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgZ2V0T3duRXZlbnRzKHBhcmFtcywgY2FsbGJhY2ssIG9wdGlvbnM/OiBhbnkpIHtcbiAgICAgICAgdGhpcy5fbG9hZE9uRGlmZmVyWWVhcih0aGlzLl9nZXRPd25FdmVudHMsIHBhcmFtcywgY2FsbGJhY2ssIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIF9nZXRPd25FdmVudHMocGFyYW1zLCBjYWxsYmFjaywgb3B0aW9ucykge1xuICAgICAgICByZXR1cm4gdGhpcy5zZW5kUmVxdWVzdCh7XG4gICAgICAgICAgICB0eXBlOiAncG9zdCcsXG4gICAgICAgICAgICB1cmw6ICdjYWxidWlsZGVyL2VsZW1lbnQvbGlzdCcsXG4gICAgICAgICAgICBkYXRhOiBwYXJhbXMsXG4gICAgICAgICAgICBzdWNjZXNzOiAoZGF0YSkgPT4gY2FsbGJhY2sodGhpcy5tb2RpZnlFdmVudChkYXRhICYmIGRhdGEuaXRlbXMgfHwgW10pKVxuICAgICAgICB9LCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBnZXRMaXN0RXZlbnRzKHBhcmFtczogYW55LCBjYWxsYmFjazogYW55LCBvcHRpb25zPzogYW55KTogYW55IHtcbiAgICAgICAgbGV0IHByb21pc2VzID0gW107XG4gICAgICAgIHBhcmFtcy5vcmdpZCA9IHBhcmFtcy5vcmdpZCB8fCB0aGlzLmdldE9yZ0lkKCk7XG5cbiAgICAgICAgLy8gTG9hZCByZXZpZXcgZXZlbnRcbiAgICAgICAgdGhpcy5sb2FkUm9sZShwYXJhbXMub3JnaWQsICgpID0+IHtcbiAgICAgICAgICAgIC8vIE15IGV2ZW50c1xuICAgICAgICAgICAgcHJvbWlzZXMucHVzaChuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBfb3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICBfb3B0aW9ucy5lcnJvciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShbXSk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB0aGlzLmdldE93bkV2ZW50cyhwYXJhbXMsIHJlc29sdmUsIF9vcHRpb25zKTtcbiAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuaXNSZXZpZXdlcihwYXJhbXMub3JnaWQpKSB7XG4gICAgICAgICAgICAgICAgLy8gUmV2aWV3ZXJcbiAgICAgICAgICAgICAgICBwcm9taXNlcy5wdXNoKG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBfb3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICAgICAgX29wdGlvbnMuZXJyb3IgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKFtdKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRSZXZpZXdFdmVudHMocGFyYW1zLCByZXNvbHZlLCBfb3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaXNWaWV3ZXIocGFyYW1zLm9yZ2lkKSkge1xuICAgICAgICAgICAgICAgIC8vIFZpZXdlclxuICAgICAgICAgICAgICAgIHByb21pc2VzLnB1c2gobmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IF9vcHRpb25zID0gJC5leHRlbmQoe30sIG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgICAgICBfb3B0aW9ucy5lcnJvciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoW10pO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFZpZXdFdmVudHMocGFyYW1zLCByZXNvbHZlLCBfb3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIExvYWQgYWxsIHByb21pc2VzXG4gICAgICAgICAgICBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbiggKHZhbHVlcykgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBldmVudHMgPSBbXTtcbiAgICAgICAgICAgICAgICB2YWx1ZXMuZm9yRWFjaCgodmFsdWUpID0+IGV2ZW50cyA9IGV2ZW50cy5jb25jYXQodmFsdWUgfHwgW10pKTtcbiAgICAgICAgICAgICAgICBldmVudHMgPSB0aGlzLnJlbW92ZUV2ZW50RHVwbGljYXRlKGV2ZW50cyk7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sodGhpcy5tb2RpZnlFdmVudChldmVudHMpKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0sIG9wdGlvbnMpO1xuXG4gICAgfVxuXG4gICAgbW9kaWZ5RXZlbnQoZXZlbnRzKSB7XG4gICAgICAgIGlmICghZXZlbnRzKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB0aGlzLnJlbW92ZUV2ZW50RHVwbGljYXRlKGV2ZW50cyk7XG4gICAgICAgIGV2ZW50cy5mb3JFYWNoKChpdGVtKSA9PiB0aGlzLmluZGV4RXZlbnQoaXRlbSkpO1xuICAgICAgICB0aGlzLnNvcnRFdmVudHMoZXZlbnRzKTtcbiAgICAgICAgcmV0dXJuIGV2ZW50cztcbiAgICB9XG5cbiAgICByZW1vdmVFdmVudER1cGxpY2F0ZShldmVudHMpIHtcbiAgICAgICAgaWYgKGV2ZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IGV2ZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSBpIC0gMTsgaiA+PSAwOyBqLS0pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV2ZW50c1tpXS51dWlkID09PSBldmVudHNbal0udXVpZCAmJiBldmVudHNbaV0uZGF5ID09PSBldmVudHNbal0uZGF5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudHMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLS1pO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGV2ZW50cztcbiAgICB9XG5cbiAgICBzb3J0RXZlbnRzKGV2ZW50cykge1xuICAgICAgICAvLyBzb3J0IGJ5IHN0YXJ0IGRhdGVcbiAgICAgICAgdGhpcy5zb3J0RXZlbnRTdGFydChldmVudHMpO1xuICAgICAgICB0aGlzLnNvcnRFdmVudFByaW9yaXR5KGV2ZW50cyk7XG4gICAgICAgIHJldHVybiBldmVudHM7XG4gICAgfVxuXG4gICAgc29ydEV2ZW50U3RhcnQoZXZlbnRzKSB7XG4gICAgICAgIHRoaXMuX3NvcnQoZXZlbnRzLCAnZnJvbScpO1xuICAgICAgICByZXR1cm4gZXZlbnRzO1xuICAgIH1cblxuICAgIHNvcnRFdmVudFByaW9yaXR5KGV2ZW50cykge1xuICAgICAgICAvLyBzb3J0IGJ5IHByaW9yaXR5IG9uIGRheVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGV2ZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGl0ZW0gPSBldmVudHNbaV07XG4gICAgICAgICAgICBpdGVtLl9vcmRlciA9IE51bWJlcihpdGVtLl9vcmRlcikgfHwgMDtcblxuICAgICAgICAgICAgaWYgKGl0ZW0uX29yZGVyID4gMCkge1xuICAgICAgICAgICAgICAgIG1vdmVGaXJzdChpdGVtKTtcbiAgICAgICAgICAgICAgICBpID0gZXZlbnRzLmluZGV4T2YoaXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBtb3ZlRmlyc3QoaXRlbSkge1xuICAgICAgICAgICAgaWYgKGl0ZW0uX29yZGVyICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgbGV0IGluZGV4ID0gZXZlbnRzLmluZGV4T2YoaXRlbSk7XG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgdG1wID0gZXZlbnRzW2luZGV4IC0gMV07XG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLmRheSA9PT0gdG1wLmRheSAmJiAodG1wLl9vcmRlciA9PT0gMCB8fCBpdGVtLl9vcmRlciA8IHRtcC5fb3JkZXIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudHNbaW5kZXhdID0gdG1wO1xuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRzW2luZGV4IC0gMV0gPSBpdGVtO1xuICAgICAgICAgICAgICAgICAgICAgICAgbW92ZUZpcnN0KGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGV2ZW50cztcbiAgICB9XG5cblxuICAgIF9zb3J0KGFyciwgb3JkZXJCeT86IGFueSkge1xuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGkgPT09IDApXG4gICAgICAgICAgICAgICAgY29udGludWU7XG5cbiAgICAgICAgICAgIGxldCBpdGVtID0gYXJyW2ldLFxuICAgICAgICAgICAgICAgIHByZXYgPSBhcnJbaSAtIDFdO1xuXG4gICAgICAgICAgICBpZiAoaXRlbVtvcmRlckJ5XSA8IHByZXZbb3JkZXJCeV0pIHtcbiAgICAgICAgICAgICAgICBhcnJbaV0gPSBwcmV2O1xuICAgICAgICAgICAgICAgIGFycltpIC0gMV0gPSBpdGVtO1xuICAgICAgICAgICAgICAgIGkgLT0gMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGtleXdvcmRzOiBzdHJpbmdbXVxuICAgIHNlYXJjaEV2ZW50c0J5S2V5d29yZHMoZXZlbnRzLCBrZXl3b3Jkcykge1xuICAgICAgICBpZiAoa2V5d29yZHMgJiYga2V5d29yZHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcmV0dXJuIGV2ZW50cy5maWx0ZXIoKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBrZXl3b3Jkcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnQuX2luZGV4LmluZGV4T2Yoa2V5d29yZHNbaV0pIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGV2ZW50cy5zbGljZSgpO1xuICAgIH1cblxuICAgIGluZGV4RXZlbnQoZXZlbnQpIHtcbiAgICAgICAgLy8gU2F2ZSBldmVudCB3aXRoIGxpbmsgdG8gZ2V0IGxhdGVyXG4gICAgICAgIGV2ZW50Lm9iamVjdElkID0gZXZlbnQudXVpZCArIGV2ZW50Lm1vZGUgKyBldmVudC5kYXk7XG4gICAgICAgIHRoaXMuX21hcEV2ZW50c1tldmVudC5vYmplY3RJZF0gPSBldmVudDtcbiAgICAgICAgdGhpcy5fbWFwRXZlbnRzW2V2ZW50LnV1aWRdID0gZXZlbnQ7XG5cbiAgICAgICAgaWYgKCFldmVudC5faW5kZXhlZCkge1xuXG4gICAgICAgICAgICB0aGlzLmluZGV4RXZlbnRNZW1iZXJzKGV2ZW50KTtcblxuICAgICAgICAgICAgaWYgKHdpbmRvd1snYmVmb3JlSW5kZXhFdmVudCddKSB7XG4gICAgICAgICAgICAgICAgd2luZG93WydiZWZvcmVJbmRleEV2ZW50J10oZXZlbnQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBldmVudC5zdWJqZWN0RGlzcGxheSA9IHRoaXMuZm9ybWF0VGV4dERpc3BsYXkoZXZlbnQuc3ViamVjdCB8fCAnJyk7XG4gICAgICAgICAgICBldmVudC5sb2NhdGlvbkRpc3BsYXkgPSB0aGlzLmZvcm1hdFRleHREaXNwbGF5KGV2ZW50LmxvY2F0aW9uIHx8ICcnKTtcblxuICAgICAgICAgICAgdGhpcy5pbmRleFJlcGVhdChldmVudCk7XG4gICAgICAgICAgICB0aGlzLmluZGV4RXZlbnRBdHRyaWJ1dGUoZXZlbnQpO1xuICAgICAgICAgICAgdGhpcy5pbmRleEV2ZW50RGF0ZShldmVudCk7XG4gICAgICAgICAgICB0aGlzLmluZGV4RXZlbnRTZWFyY2goZXZlbnQpO1xuICAgICAgICAgICAgdGhpcy5pbmRleEN1c3RvbShldmVudCk7XG5cbiAgICAgICAgICAgIGV2ZW50LmNhdGVnb3J5ID0gZXZlbnQuY2F0ZWdvcnkgfHwgJyc7XG4gICAgICAgICAgICBldmVudC5jYXRlZ29yeUljb24gPSBDYWxDYXRlZ29yeUljb25bZXZlbnQuY2F0ZWdvcnldO1xuXG4gICAgICAgICAgICBldmVudC5kZXBhcnRtZW50ID0gZXZlbnQuZGVwYXJ0SUQ7XG5cbiAgICAgICAgICAgIGV2ZW50Ll9pbmRleGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZXZlbnQ7XG4gICAgfVxuXG4gICAgaW5kZXhFdmVudE1lbWJlcnMoZXZlbnQpIHtcbiAgICAgICAgbGV0IG9iajogYW55ID0ge307XG5cbiAgICAgICAgZm9yIChsZXQgayBpbiBDYWxBdHRlbmRlZVJvbGUpIHtcbiAgICAgICAgICAgIG9ialtrXSA9IFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgZXZlbnQubWVtYmVycyA9IGV2ZW50Lm1lbWJlcnMgfHwgW107XG4gICAgICAgIGV2ZW50LmF0dGVuZGVlcyA9IFtdO1xuXG4gICAgICAgIGV2ZW50Lm1lbWJlcnMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuXG4gICAgICAgICAgICBpdGVtLm5hbWUgPSB0aGlzLmF0dGVuZGVlRGlzcGxheShpdGVtKTtcbiAgICAgICAgICAgIGl0ZW0udmFsdWUgPSB0aGlzLmF0dGVuZGVlVmFsdWUoaXRlbSk7XG5cbiAgICAgICAgICAgIC8vIFR5cGUgYXR0ZW5kZWVcbiAgICAgICAgICAgIGlmIChpdGVtLmFsaWFzKSB7XG4gICAgICAgICAgICAgICAgaXRlbS50eXBlID0gQ2FsQXR0ZW5kZWVUeXBlLkFMSUFTO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChpdGVtLnVzZXJuYW1lKSB7XG4gICAgICAgICAgICAgICAgaXRlbS50eXBlID0gQ2FsQXR0ZW5kZWVUeXBlLlVTRVI7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGl0ZW0udHlwZSA9IENhbEF0dGVuZGVlVHlwZS5PUkdBTjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgb2JqW2l0ZW0ucm9sZV0gPSBvYmpbaXRlbS5yb2xlXSB8fCBbXTtcbiAgICAgICAgICAgIG9ialtpdGVtLnJvbGVdLnB1c2goaXRlbSk7XG5cbiAgICAgICAgICAgIGlmIChpdGVtLnJvbGUgPT09IENhbEF0dGVuZGVlUm9sZS5DUkVBVE9SKSB7XG4gICAgICAgICAgICAgICAgZXZlbnQuY3JlYXRvciA9IGl0ZW0udXNlcm5hbWU7XG4gICAgICAgICAgICAgICAgZXZlbnQuZnVsbG5hbWUgPSBpdGVtLmZ1bGxuYW1lO1xuICAgICAgICAgICAgICAgIGV2ZW50LmlzQ3JlYXRvciA9IHRoaXMudXNlcm5hbWVJc01lKGV2ZW50LmNyZWF0b3IpO1xuICAgICAgICAgICAgICAgIGV2ZW50LmNyZWF0b3JTdHIgPSBldmVudC5mdWxsbmFtZSArICcoJyArIGV2ZW50LmNyZWF0b3IgKyAnKSc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGV2ZW50LmF0dGVuZGVlcy5wdXNoKGl0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBldmVudC5jaGFpcm1hblN0ciA9IHRoaXMuX2dyb3VwTWVtYmVyMlN0cmluZyhvYmouQ0hBSVJNQU4pO1xuICAgICAgICBldmVudC5tZW1iZXJTdHIgPSB0aGlzLl9ncm91cE1lbWJlcjJTdHJpbmcob2JqLk1FTUJFUik7XG5cbiAgICAgICAgLy8gVG9kbzogdGVzdCBwcmVwYXJlIHN0clxuICAgICAgICBldmVudC5wcmVwYXJlU3RyID0gdGhpcy5fZ3JvdXBNZW1iZXIyU3RyaW5nKG9iai5QUkVQQVJFUik7XG4gICAgICAgIGV2ZW50LndhdGNoZXJTdHIgPSBldmVudC5vYnNlcnZlclN0ciA9IHRoaXMuX2dyb3VwTWVtYmVyMlN0cmluZyhvYmouT0JTRVJWRVIpO1xuXG4gICAgICAgIGV2ZW50Lm1lbWJlcnNEZWNvZGUgPSBvYmo7XG4gICAgfVxuXG4gICAgX2dyb3VwTWVtYmVyMlN0cmluZyhtZW1iZXJzKSB7XG4gICAgICAgIGxldCBzdHIgPSAnJztcbiAgICAgICAgbGV0IGRhdGEgPSB0aGlzLmdyb3VwQXR0ZW5kZWVCeU9yZ2FuKG1lbWJlcnMpO1xuICAgICAgICBmb3IgKGxldCBrIGluIGRhdGEpIHtcbiAgICAgICAgICAgIGxldCBpdGVtcyA9IGRhdGFba107XG4gICAgICAgICAgICBsZXQgb3JnYW4gPSBpdGVtcy5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0udHlwZSA9PT0gQ2FsQXR0ZW5kZWVUeXBlLk9SR0FOKVswXTtcbiAgICAgICAgICAgIGlmIChvcmdhbikge1xuICAgICAgICAgICAgICAgIHN0ciArPSAnPGI+JyArIG9yZ2FuLm9yZ2FuTmFtZSArICc8L2I+OiAnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gVG9kbzogY29uc2lkZXIgdG8gdXNlIHRoaXMuYnVpbGRNZW1iZXJTaG93XG4gICAgICAgICAgICBpdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0udHlwZSAhPT0gQ2FsQXR0ZW5kZWVUeXBlLk9SR0FOKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0ciArPSBpdGVtLm5hbWUgKyAnLCAnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc3RyID0gc3RyLnNsaWNlKDAsIC0yKTtcbiAgICAgICAgICAgIHN0ciArPSAnPGJyPic7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN0ci5zbGljZSgwLCAtNCk7XG4gICAgfVxuXG4gICAgaW5kZXhFdmVudEF0dHJpYnV0ZShldmVudD86IGFueSkge1xuICAgICAgICBmb3IgKGxldCBrIGluIGV2ZW50LmF0dHJpYnV0ZSkge1xuICAgICAgICAgICAgZXZlbnRbJ18nICsga10gPSBldmVudC5hdHRyaWJ1dGVba107XG4gICAgICAgIH1cbiAgICAgICAgZXZlbnQuX29yZGVyID0gTnVtYmVyKGV2ZW50Ll9vcmRlcikgfHwgMDtcblxuICAgICAgICBpZiAoZXZlbnQuX3N1YlR5cGUpIHtcbiAgICAgICAgICAgIGV2ZW50LnR5cGUgPSBldmVudC5fc3ViVHlwZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGluaXRFdmVudChjYWxFdmVudCkge1xuICAgICAgICBjYWxFdmVudCA9ICQuZXh0ZW5kKHt9LCBjYWxFdmVudCk7XG4gICAgICAgIHRoaXMuX2luaXRFdmVudERhdGUoY2FsRXZlbnQpO1xuICAgICAgICBjYWxFdmVudC5zdGFydFRpbWUgPSBjYWxFdmVudC5mcm9tLmZvcm1hdCgnSDppJyk7XG4gICAgICAgIGNhbEV2ZW50LnRvVGltZSA9IGNhbEV2ZW50LnRvLmZvcm1hdCgnSDppJyk7XG4gICAgICAgIHJldHVybiBjYWxFdmVudDtcbiAgICB9XG5cbiAgICBfaW5pdEV2ZW50RGF0ZShldmVudDogQ2FsRXZlbnQgfCBhbnkpIHtcbiAgICAgICAgaWYgKGV2ZW50KSB7XG4gICAgICAgICAgICBsZXQgZGF0ZTtcbiAgICAgICAgICAgIGlmIChldmVudCAmJiBldmVudC51dWlkKSB7XG4gICAgICAgICAgICAgICAgZGF0ZSA9IG5ldyBEYXRlKGV2ZW50LnllYXIsIDAsIGV2ZW50LmRheSk7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGUuZ2V0VGltZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LmZyb20gPSBuZXcgRGF0ZShkYXRlLmdldFRpbWUoKSArIGV2ZW50LnN0YXJ0VGltZSAqIDYwICogMTAwMCk7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnRvID0gbmV3IERhdGUoZGF0ZS5nZXRUaW1lKCkgKyBldmVudC50b1RpbWUgKiA2MCAqIDEwMDApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghZGF0ZSB8fCAhZGF0ZS5nZXRUaW1lKCkpIHtcbiAgICAgICAgICAgICAgICBkYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgICAgICBkYXRlLnNldEhvdXJzKGRhdGUuZ2V0SG91cnMoKSArIDEsIDAsIDAsIDApO1xuICAgICAgICAgICAgICAgIGV2ZW50LmZyb20gPSBkYXRlO1xuICAgICAgICAgICAgICAgIGRhdGUgPSBuZXcgRGF0ZShkYXRlKTtcbiAgICAgICAgICAgICAgICBkYXRlLnNldEhvdXJzKGRhdGUuZ2V0SG91cnMoKSArIDEpO1xuICAgICAgICAgICAgICAgIGV2ZW50LnRvID0gZGF0ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGluZGV4RXZlbnREYXRlKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuX2luaXRFdmVudERhdGUoZXZlbnQpO1xuXG4gICAgICAgIC8vIGFsbCBkYXkgZXZlbnRcbiAgICAgICAgZXZlbnQuYWxsRGF5ID0gZXZlbnQuX2FsbGRheSA9PT0gJ3RydWUnO1xuXG4gICAgICAgIGV2ZW50LnRpbWVTdHIgPSB0aGlzLmZvcm1hdERhdGVTdHIoZXZlbnQuZnJvbSk7XG4gICAgICAgIGlmIChldmVudC5hbGxEYXkpIHtcbiAgICAgICAgICAgIGV2ZW50LnN0YXJ0VGltZVN0ciA9IGV2ZW50LnRvVGltZVN0ciA9IHRoaXMucmVzb3VyY2VzLmFsbERheTtcbiAgICAgICAgICAgIGV2ZW50LmhvdXJTdHIgPSB0aGlzLnJlc291cmNlcy5hbGxEYXk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBldmVudC5zdGFydFRpbWVTdHIgPSB0aGlzLmZvcm1hdFRpbWVTdHIoZXZlbnQuZnJvbSk7XG4gICAgICAgICAgICBldmVudC50b1RpbWVTdHIgPSB0aGlzLmZvcm1hdFRpbWVTdHIoZXZlbnQudG8pO1xuICAgICAgICAgICAgZXZlbnQuaG91clN0ciA9IGV2ZW50LnN0YXJ0VGltZVN0ciArICcgLSAnICsgZXZlbnQudG9UaW1lU3RyO1xuICAgICAgICB9XG5cbiAgICAgICAgZXZlbnQudGltZVN0ciArPSAnOyAnICsgZXZlbnQuaG91clN0cjtcblxuICAgICAgICBldmVudC5zdGFydCA9IGV2ZW50LmZyb207XG4gICAgICAgIGV2ZW50LmVuZCA9IGV2ZW50LnRvO1xuXG4gICAgICAgIC8vIFRpbWUgY3JlYXRlIGFuZCB1cGRhdGVcbiAgICAgICAgaWYgKGV2ZW50LmNyZWF0ZVRpbWUpIHtcbiAgICAgICAgICAgIGV2ZW50LmNyZWF0ZURhdGUgPSBuZXcgRGF0ZShldmVudC5jcmVhdGVUaW1lKTtcbiAgICAgICAgICAgIGV2ZW50LmNyZWF0ZURhdGVTdHIgPSB0aGlzLmZvcm1hdERhdGVUaW1lU3RyKGV2ZW50LmNyZWF0ZURhdGUpO1xuXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGV2ZW50LnVwZGF0ZVRpbWUpIHtcbiAgICAgICAgICAgIGV2ZW50LnVwZGF0ZURhdGUgPSBuZXcgRGF0ZShldmVudC51cGRhdGVUaW1lKTtcbiAgICAgICAgICAgIGV2ZW50LnVwZGF0ZURhdGVTdHIgPSB0aGlzLmZvcm1hdERhdGVUaW1lU3RyKGV2ZW50LnVwZGF0ZURhdGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGhvdXJVcGRhdGVkID0gbmV3IERhdGUoKS5nZXRUaW1lKCkgLSAoZXZlbnQudXBkYXRlVGltZSB8fCBldmVudC5jcmVhdGVUaW1lKTtcbiAgICAgICAgaG91clVwZGF0ZWQgLz0gKDYwICogNjAgKiAxMDAwKTtcbiAgICAgICAgaWYgKGhvdXJVcGRhdGVkIDwgMCkge1xuICAgICAgICAgICAgaG91clVwZGF0ZWQgPSAwO1xuICAgICAgICB9XG4gICAgICAgIGlmIChob3VyVXBkYXRlZCA8PSB0aGlzLlRJTUVfTkVXX1VQREFURSkge1xuICAgICAgICAgICAgZXZlbnQucmVjZW50VXBkYXRlZCA9IHRydWU7XG4gICAgICAgICAgICBldmVudC5sYXN0VXBkYXRlU3RyID0gdGhpcy5nZXRUZXh0Rm9yTWludXRlcyhob3VyVXBkYXRlZCAqIDYwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGluZGV4RXZlbnRTZWFyY2goZXZlbnQpIHtcblxuICAgICAgICAvLyBJbmRleCBkYXRhIHRvIHNlYXJjaFxuICAgICAgICBldmVudC5faW5kZXggPSAnJztcbiAgICAgICAgZXZlbnQuX21lbWJlcnMgPSBbXTtcblxuICAgICAgICBpZiAoZXZlbnQuc3ViamVjdCkge1xuICAgICAgICAgICAgZXZlbnQuX2luZGV4ID0gdm5Ub0xhdGluKGV2ZW50LnN1YmplY3QudG9Mb3dlckNhc2UoKSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJbmRleCBsb2NhdGlvbiB0byBzZWFyY2hcbiAgICAgICAgaWYgKGV2ZW50LmxvY2F0aW9uKSB7XG4gICAgICAgICAgICBldmVudC5faW5kZXggKz0gJyAnICsgdm5Ub0xhdGluKGV2ZW50LmxvY2F0aW9uLnRvTG93ZXJDYXNlKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBldmVudC5tZW1iZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgbWVtYmVyID0gZXZlbnQubWVtYmVyc1tpXTtcbiAgICAgICAgICAgIGlmIChtZW1iZXIuZnVsbG5hbWUpXG4gICAgICAgICAgICAgICAgZXZlbnQuX2luZGV4ICs9ICcgJyArIHZuVG9MYXRpbihtZW1iZXIuZnVsbG5hbWUudG9Mb3dlckNhc2UoKSk7XG4gICAgICAgICAgICBpZiAobWVtYmVyLnVzZXJuYW1lKSB7XG4gICAgICAgICAgICAgICAgZXZlbnQuX2luZGV4ICs9ICcgJyArIG1lbWJlci51c2VybmFtZS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgICAgICAgICAgLy8gYXR0ZW5kZWVcbiAgICAgICAgICAgICAgICBpZiAobWVtYmVyLnJvbGUgIT09IENhbEF0dGVuZGVlUm9sZS5DUkVBVE9SKSB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50Ll9tZW1iZXJzLnB1c2gobWVtYmVyLnVzZXJuYW1lKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBBdHRhY2htZW50c1xuICAgICAgICBpZiAoZXZlbnQuYXR0YWNobWVudHMpIHtcbiAgICAgICAgICAgIGV2ZW50LmF0dGFjaG1lbnRzLmZvckVhY2goKGZpbGUpID0+IHtcbiAgICAgICAgICAgICAgICBmaWxlLm9yZ2lkID0gZXZlbnQuZmlybVVVSUQ7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGluZGV4UmVwZWF0KGV2ZW50OiBhbnkpIHtcbiAgICAgICAgLy9cIkZSRVE9V0VFS0xZO1VOVElMPTIwMTcwNzA3O0lOVEVSVkFMPTE7QllEQVk9TU9cIlxuICAgICAgICBpZiAoZXZlbnQucnJ1bGUpIHtcbiAgICAgICAgICAgIGxldCBvYmo6IGFueSA9IHt9O1xuICAgICAgICAgICAgZXZlbnQucnJ1bGUuc3BsaXQoJzsnKS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgaXRlbSA9IGl0ZW0uc3BsaXQoJz0nKTtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbVswXSA9PT0gJ0ZSRVEnKSB7XG4gICAgICAgICAgICAgICAgICAgIG9iai50eXBlID0gb2JqLnJydWxlID0gb2JqLnJybW9kZSA9IGl0ZW1bMV07XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpdGVtWzBdID09PSAnQllEQVknKSB7XG4gICAgICAgICAgICAgICAgICAgIG9iai53a2RheXMgPSBpdGVtWzFdLnNwbGl0KCcsJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoZXZlbnQubHN0YXJ0KSB7XG4gICAgICAgICAgICAgICAgb2JqLmxzdGFydCA9IG5ldyBEYXRlKGV2ZW50LmxzdGFydCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZXZlbnQudW50aWwpIHtcbiAgICAgICAgICAgICAgICBvYmoudW50aWwgPSBuZXcgRGF0ZShldmVudC51bnRpbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBldmVudC5yZXBlYXQgPSBvYmo7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBDdXN0b20gaW5kZXhcbiAgICBpbmRleEN1c3RvbShldmVudCkge1xuXG4gICAgfVxuXG4gICAgZ2V0RXZlbnRTdGF0dXMgPSAobW9kZSkgPT4gdGhpcy5yZXNvdXJjZXMuc3RhdHVzZXNbbW9kZV07XG5cbiAgICBpc1Jldmlld2VyKG9yZ2lkPzogYW55KSB7XG4gICAgICAgIG9yZ2lkID0gb3JnaWQgfHwgdGhpcy5nZXRPcmdJZCgpO1xuICAgICAgICByZXR1cm4gdGhpcy5fdXNlclJvbGVzW29yZ2lkXSAmJiAhIXRoaXMuX3VzZXJSb2xlc1tvcmdpZF0ucmV2aWV3ZXI7XG4gICAgfVxuXG4gICAgaXNPd25SZXZpZXdlcihvcmdpZD86IGFueSkge1xuICAgICAgICBvcmdpZCA9IG9yZ2lkIHx8IHRoaXMuZ2V0T3JnSWQoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3VzZXJSb2xlc1tvcmdpZF0gJiYgISF0aGlzLl91c2VyUm9sZXNbb3JnaWRdLm93bl9yZXZpZXdlcjtcbiAgICB9XG5cbiAgICBpc1ZpZXdlcihvcmdpZD86IGFueSk6IGFueSB7XG4gICAgICAgIG9yZ2lkID0gb3JnaWQgfHwgdGhpcy5nZXRPcmdJZCgpO1xuICAgICAgICByZXR1cm4gdGhpcy5fdXNlclJvbGVzW29yZ2lkXSAmJiAhIXRoaXMuX3VzZXJSb2xlc1tvcmdpZF0udmlld2VyO1xuICAgIH1cblxuICAgIGdldFF1ZXJ5UGFyYW1zKHF1ZXJ5PzogYW55KSB7XG4gICAgICAgIGxldCBwYXJhbXMgPSB7fTtcbiAgICAgICAgcXVlcnkgPSBxdWVyeSB8fCBsb2NhdGlvbi5zZWFyY2g7XG4gICAgICAgIHF1ZXJ5LnJlcGxhY2UoJz8nLCAnJykuc3BsaXQoJyYnKS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBpZiAoaXRlbSkge1xuICAgICAgICAgICAgICAgIGxldCBlcXVhbEluZGV4ID0gaXRlbS5pbmRleE9mKCc9Jyk7XG4gICAgICAgICAgICAgICAgaWYgKGVxdWFsSW5kZXggPiAtMSlcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zW2l0ZW0uc2xpY2UoMCwgZXF1YWxJbmRleCldID0gaXRlbS5zbGljZShlcXVhbEluZGV4ICsgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcGFyYW1zO1xuICAgIH1cblxuICAgIGJ1aWxkUXVlcnlTdHJpbmcocGFyYW1zPzogYW55KSB7XG4gICAgICAgIGxldCBxdWVyeSA9ICcnO1xuICAgICAgICBmb3IgKGxldCBrIGluIHBhcmFtcykge1xuICAgICAgICAgICAgcXVlcnkgKz0gayArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudChwYXJhbXNba10pICsgJyYnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBxdWVyeS5zbGljZSgwLCAtMSk7XG4gICAgfVxuXG4gICAgZ2V0VXNlckF2YXRhcih1c2VyY29kZSwgZG9tYWluPzogYW55KSB7XG4gICAgICAgIHJldHVybiBBamF4QVBJLmdldFVybCgnc3lzdGVtL3VzZXJwcm9maWxlL3Bob3RvJywgZG9tYWluKSArXG4gICAgICAgICAgICAnP3VzZXJjb2RlPScgKyB1c2VyY29kZSArICcmdGh1bWJuYWlsPTUwJztcbiAgICB9XG5cbiAgICBnZXRQZXJtaXNzaW9uT25FdmVudChldmVudCwgY2FsbGJhY2s6IEZ1bmN0aW9uLCBjdXJyZW50T3JnYW5JZD86IGFueSwgb3B0aW9ucz86IGFueSkge1xuICAgICAgICBsZXQgbW9kZSA9IGV2ZW50Lm1vZGU7XG4gICAgICAgIGlmICh0aGlzLmlzT3RoZXIobW9kZSkpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFldmVudC51dWlkKSB7XG4gICAgICAgICAgICByZXR1cm4gY2FsbGJhY2soe1xuICAgICAgICAgICAgICAgIHNhdmU6IHRydWUsXG4gICAgICAgICAgICAgICAgc2F2ZUNyZWF0ZTogdHJ1ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBjdXJyZW50T3JnYW5JZCA9IGN1cnJlbnRPcmdhbklkIHx8IHRoaXMuZ2V0T3JnSWQoKSB8fCBldmVudC5maXJtVVVJRDtcblxuICAgICAgICB0aGlzLmxvYWRSb2xlKGN1cnJlbnRPcmdhbklkLCAoKSA9PiB7XG5cbiAgICAgICAgICAgIHRoaXMuaW5kZXhFdmVudChldmVudCk7XG5cbiAgICAgICAgICAgIGxldCBwZXJtaXNzaW9ucztcbiAgICAgICAgICAgIGNvbnN0IGNhblJldmlldyA9IHRoaXMuaXNSZXZpZXdlcihjdXJyZW50T3JnYW5JZCkgfHxcbiAgICAgICAgICAgICAgICAodGhpcy5pc093blJldmlld2VyKGN1cnJlbnRPcmdhbklkKSAmJiB0aGlzLmNhbk93blJldmlld0V2ZW50KGV2ZW50KSk7XG4gICAgICAgICAgICBjb25zdCBjYW5SZXZpZXdVcGRhdGUgPSAhdGhpcy5pc0NyZWF0ZShtb2RlKSAmJiAhdGhpcy5pc0NhbmNlbChtb2RlKSAmJiBjYW5SZXZpZXc7XG4gICAgICAgICAgICBpZiAoZXZlbnQuZmlybVVVSUQgPT09IGN1cnJlbnRPcmdhbklkKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaXNFZGl0TXlFdmVudCA9IHRoaXMuY2FuVXBkYXRlT3duRXZlbnQoZXZlbnQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LnR5cGUgPT09IENhbFN1YlR5cGUuUEVSU09OQUwgJiYgIXRoaXMuZ2V0Q29uZmlnVmFsdWUoJ1BFUlNPTkFMX0NBTl9QVUJMSVNIJykpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gUGVyc29uYWwgY2FsZW5kYXJcbiAgICAgICAgICAgICAgICAgICAgcGVybWlzc2lvbnMgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzYXZlOiBpc0VkaXRNeUV2ZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlOiBpc0VkaXRNeUV2ZW50XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICBwZXJtaXNzaW9ucyA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNhdmU6IGlzRWRpdE15RXZlbnQgfHwgY2FuUmV2aWV3VXBkYXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgYXBwcm92ZTogY2FuUmV2aWV3ICYmICh0aGlzLmlzU2VudChtb2RlKSB8fCBpc0VkaXRNeUV2ZW50KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdDogY2FuUmV2aWV3ICYmIHRoaXMuaXNTZW50KG1vZGUpLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2VuZDogaXNFZGl0TXlFdmVudCAmJiAhY2FuUmV2aWV3LFxuICAgICAgICAgICAgICAgICAgICAgICAgcmV2ZXJ0OiAodGhpcy5pc1NlbnQobW9kZSkgJiYgZXZlbnQuaXNDcmVhdG9yKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICgodGhpcy5pc0NhbmNlbChtb2RlKSB8fCB0aGlzLmlzUHVibGlzaChtb2RlKSkgJiYgY2FuUmV2aWV3KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbmNlbDogY2FuUmV2aWV3ICYmIHRoaXMuaXNQdWJsaXNoKG1vZGUpLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlOiBpc0VkaXRNeUV2ZW50XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIEV4dGVybmFsIHVwZGF0ZSBhdHRlbmRlZXNcbiAgICAgICAgICAgICAgICBwZXJtaXNzaW9ucyA9IHt9O1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzUHVibGlzaChldmVudC5tb2RlKSAmJiB0aGlzLmhhc0Zpcm1BdHRlbmRlZShldmVudCwgY3VycmVudE9yZ2FuSWQpICYmXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbkV4dGVybmFsVXBkYXRlRXZlbnQoZXZlbnQsIGN1cnJlbnRPcmdhbklkKSkge1xuICAgICAgICAgICAgICAgICAgICBwZXJtaXNzaW9ucyA9IHt1cGRhdGVBdHRlbmRlZTogdHJ1ZX07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGVybWlzc2lvbnMucHJpbnQgPSB0cnVlO1xuICAgICAgICAgICAgcGVybWlzc2lvbnMuZXhwb3J0SW52aXRhdGlvbiA9IHRoaXMuY2F0SXNJbnZpdGF0aW9uKGV2ZW50LmNhdGVnb3J5KSAmJiBldmVudC5fdGVtcGxhdGVJZDtcblxuICAgICAgICAgICAgY2FsbGJhY2socGVybWlzc2lvbnMpO1xuICAgICAgICB9LCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBjYW5VcGRhdGVPd25FdmVudChldmVudDogQ2FsRXZlbnQpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIGV2ZW50LmlzQ3JlYXRvciAmJiB0aGlzLmlzQ3JlYXRlKGV2ZW50Lm1vZGUpO1xuICAgIH1cblxuICAgIGNhblJldmlld0V2ZW50KGV2ZW50OiBDYWxFdmVudCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5pc1Jldmlld2VyKGV2ZW50LmZpcm1VVUlEKTtcbiAgICB9XG5cbiAgICBjYW5Pd25SZXZpZXdFdmVudChldmVudDogQ2FsRXZlbnQpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNPd25SZXZpZXdlcihldmVudC5maXJtVVVJRCkgJiYgZXZlbnQuaXNDcmVhdG9yO1xuICAgIH1cblxuICAgIGNhblVwZGF0ZUF0dGVuZGVlKGV2ZW50OiBDYWxFdmVudCwgb3duT3JnYW5JZDogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzRmlybUV2ZW50KGV2ZW50LCBvd25PcmdhbklkKSAmJiAodGhpcy5jYW5VcGRhdGVPd25FdmVudChldmVudCkgfHxcbiAgICAgICAgICAgIHRoaXMuY2FuT3duUmV2aWV3RXZlbnQoZXZlbnQpIHx8XG4gICAgICAgICAgICB0aGlzLmNhblJldmlld0V2ZW50KGV2ZW50KSkgO1xuICAgIH1cblxuICAgIGNhbkV4dGVybmFsVXBkYXRlRXZlbnQoZXZlbnQ6IENhbEV2ZW50LCBvcmdhbklkOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNQdWJsaXNoKGV2ZW50Lm1vZGUpICYmICF0aGlzLmlzRmlybUV2ZW50KGV2ZW50LCBvcmdhbklkKSAmJiB0aGlzLmlzUmV2aWV3ZXIob3JnYW5JZCk7XG4gICAgfVxuXG4gICAgaXNGaXJtRXZlbnQoZXZlbnQ6IENhbEV2ZW50LCBvd25PcmdhbklkOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIGV2ZW50LmZpcm1VVUlEID09PSBvd25PcmdhbklkO1xuICAgIH1cblxuICAgIGlzQ3JlYXRlID0gKG1vZGU6IG51bWJlcikgPT4gbW9kZSA9PT0gQ2FsTW9kZS5DUkVBVEU7XG5cbiAgICBpc1B1Ymxpc2ggPSAobW9kZTogbnVtYmVyKSA9PiBtb2RlID09PSBDYWxNb2RlLlBVQkxJU0g7XG5cbiAgICBpc1NlbnQgPSAobW9kZTogbnVtYmVyKSA9PiBtb2RlID09PSBDYWxNb2RlLlNFTlQ7XG5cbiAgICBpc0NhbmNlbCA9IChtb2RlOiBudW1iZXIpID0+IG1vZGUgPT09IENhbE1vZGUuQ0FOQ0VMO1xuXG4gICAgaXNPdGhlciA9IChtb2RlOiBudW1iZXIpID0+IG1vZGUgPT09IENhbE1vZGUuT1RIRVI7XG5cbiAgICBzZWFyY2hBbnlBdHRlbmRlZShwYXJhbXMsIGNhbGxiYWNrLCBvcHRpb25zPzogYW55KSB7XG4gICAgICAgIHRoaXMuc2VhcmNoVXNlckFzQXR0ZW5kZWUocGFyYW1zLCAodXNlcnMpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoT3JnYW5Bc0F0dGVuZGVlKHBhcmFtcywgKG9yZ3MpID0+IHtcbiAgICAgICAgICAgICAgICBvcmdzLmZvckVhY2goKG9yZykgPT4gdXNlcnMucHVzaChvcmcpKTtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayh1c2Vycyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgc2VhcmNoVXNlckFzQXR0ZW5kZWUocGFyYW1zLCBjYWxsYmFjaywgb3B0aW9ucz86IGFueSkge1xuICAgICAgICBsZXQgb3JnYW5JZCA9IHBhcmFtcy5vcmdpZCB8fCB0aGlzLmdldE9yZ0lkKCk7XG4gICAgICAgIGxldCBvcmdhbk5hbWUgPSB0aGlzLmdldE9yZ05hbWVCeUlkKG9yZ2FuSWQpO1xuICAgICAgICB0aGlzLmxvYWRPcmdhbk1lbWJlcnMob3JnYW5JZCwgKG1lbWJlcnMpID0+IHtcbiAgICAgICAgICAgIGxldCBrZXl3b3JkID0gcGFyYW1zLmtleXdvcmQgfHwgJyc7XG4gICAgICAgICAgICBsZXQgbGltaXQgPSBwYXJhbXMubGltaXQgfHwgLTE7XG4gICAgICAgICAgICBsZXQgYXR0ZW5kZWVzID0gW107XG4gICAgICAgICAgICBrZXl3b3JkID0gdm5Ub0xhdGluKGtleXdvcmQpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1lbWJlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgbWVtYmVyID0gbWVtYmVyc1tpXTtcblxuICAgICAgICAgICAgICAgIGlmICgha2V5d29yZCB8fCBtZW1iZXIuX2luZGV4LmluZGV4T2Yoa2V5d29yZCkgPiAtMSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgYXR0ZW5kZWUgPSB0aGlzLm1lbWJlclRvQXR0ZW5kZWUobWVtYmVyKTtcbiAgICAgICAgICAgICAgICAgICAgYXR0ZW5kZWUub3JnYW5JZCA9IG9yZ2FuSWQ7XG4gICAgICAgICAgICAgICAgICAgIGF0dGVuZGVlLm9yZ2FuTmFtZSA9IG9yZ2FuTmFtZTtcbiAgICAgICAgICAgICAgICAgICAgYXR0ZW5kZWVzLnB1c2goYXR0ZW5kZWUpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChsaW1pdCA+IDAgJiYgYXR0ZW5kZWVzLmxlbmd0aCA+PSBsaW1pdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYWxsYmFjayhhdHRlbmRlZXMpO1xuICAgICAgICB9LCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBzZWFyY2hPcmdhbkFzQXR0ZW5kZWUocGFyYW1zLCBjYWxsYmFjaywgb3B0aW9ucz86IGFueSkge1xuICAgICAgICB0aGlzLmxvYWRPcmdCeUtleXdvcmQocGFyYW1zLCAob3JnYW5zKSA9PiB7XG4gICAgICAgICAgICBjYWxsYmFjayhvcmdhbnMubWFwKChvcmdhbikgPT4gdGhpcy5vcmdhblRvQXR0ZW5kZWUob3JnYW4pKSk7XG4gICAgICAgIH0sIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIGluc2VydFByZWZpeEF0dGVuZGVlKGZ1bGxuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHRoaXMuZ2V0Q29uZmlnVmFsdWUoJ1BSRUZJWF9BVFRFTkRFRV9OQU1FJykpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldENvbmZpZ1ZhbHVlKCdQUkVGSVhfQVRURU5ERUVfTkFNRScpICsgZnVsbG5hbWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZ1bGxuYW1lO1xuICAgIH1cblxuICAgIG1lbWJlclRvQXR0ZW5kZWUobWVtYmVyKTogQ2FsQXR0ZW5kZWUge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdXNlcm5hbWU6IG1lbWJlci51c2VybmFtZSxcbiAgICAgICAgICAgIGZ1bGxuYW1lOiBtZW1iZXIuZnVsbG5hbWUsXG4gICAgICAgICAgICBkaXNwbGF5OiB0aGlzLmluc2VydFByZWZpeEF0dGVuZGVlKG1lbWJlci5mdWxsbmFtZSksXG4gICAgICAgICAgICB0eXBlOiBDYWxBdHRlbmRlZVR5cGUuVVNFUlxuICAgICAgICB9XG4gICAgfVxuXG4gICAgb3JnYW5Ub0F0dGVuZGVlKG9yZ2FuKTogQ2FsQXR0ZW5kZWUge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgb3JnYW5JZDogb3JnYW4uZmlybVVVSUQsXG4gICAgICAgICAgICBvcmdhbk5hbWU6IG9yZ2FuLmZpcm1OYW1lLFxuICAgICAgICAgICAgdHlwZTogQ2FsQXR0ZW5kZWVUeXBlLk9SR0FOXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhbGlhc1RvQXR0ZW5kZWUoYWxpYXM6IHN0cmluZywgb3JnYW5JZDogc3RyaW5nKTogQ2FsQXR0ZW5kZWUge1xuICAgICAgICBvcmdhbklkID0gb3JnYW5JZCB8fCB0aGlzLmdldE9yZ0lkKCk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBhbGlhczogYWxpYXMsXG4gICAgICAgICAgICBvcmdhbklkOiBvcmdhbklkLFxuICAgICAgICAgICAgb3JnYW5OYW1lOiB0aGlzLmdldE9yZ05hbWVCeUlkKG9yZ2FuSWQpLFxuICAgICAgICAgICAgdHlwZTogQ2FsQXR0ZW5kZWVUeXBlLkFMSUFTXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBTZWFyY2ggdXNlciBhbmQgb3JncyB0byBzZWxlY3Qgd2hlbiBjcmVhdGUgY2FsZW5kYXJcbiAgICBsb2FkQXR0ZW5kZWVCeU5hbWUocGFyYW1zLCBjYWxsYmFjaywgb3B0aW9ucz86IGFueSk6IGFueSB7XG4gICAgICAgIGlmICghcGFyYW1zIHx8ICFwYXJhbXMua2V5d29yZClcbiAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhbXSk7XG5cbiAgICAgICAgLy8gTGltaXQgdXNlciBzZWFyY2hcbiAgICAgICAgcGFyYW1zLmxpbWl0ID0gcGFyYW1zLmxpbWl0IHx8IDU7XG5cbiAgICAgICAgdGhpcy5sb2FkVXNlckJ5S2V5d29yZChwYXJhbXMsICh1c2VycykgPT4ge1xuICAgICAgICAgICAgdGhpcy5sb2FkT3JnQnlLZXl3b3JkKHBhcmFtcywgKG9yZ3MpID0+IHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayh1c2Vycy5jb25jYXQob3JncykpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIGxvYWRVc2VyQnlLZXl3b3JkKHBhcmFtcywgY2FsbGJhY2ssIG9wdGlvbnM/OiBhbnkpIHtcbiAgICAgICAgLy8gTG9hZCBhbGwgdXNlcnMgYW5kIHNlYXJjaCBvbiBjbGllbnRcbiAgICAgICAgdGhpcy5zZWFyY2hBdHRlbmRlZSh7XG4gICAgICAgICAgICBvcmdpZDogcGFyYW1zLm9yZ2lkXG4gICAgICAgIH0sIChtZW1iZXJzKSA9PiB7XG4gICAgICAgICAgICBsZXQgdXNlcnMgPSBbXTtcbiAgICAgICAgICAgIGxldCBrZXl3b3JkID0gdm5Ub0xhdGluKHBhcmFtcy5rZXl3b3JkLnRvTG93ZXJDYXNlKCkpO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtZW1iZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IHVzZXIgPSBtZW1iZXJzW2ldO1xuICAgICAgICAgICAgICAgIGlmICh1c2VyLl9pbmRleC5pbmRleE9mKGtleXdvcmQpID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdXNlcnMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiB1c2VyLmZ1bGxuYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHVzZXIudXNlcm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBDYWxBdHRlbmRlZVR5cGUuVVNFUixcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lbWJlcjogdXNlclxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodXNlcnMubGVuZ3RoID49IHBhcmFtcy5saW1pdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYWxsYmFjayh1c2Vycyk7XG4gICAgICAgIH0sIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIGxvYWRPcmdCeUtleXdvcmQocGFyYW1zLCBjYWxsYmFjaywgb3B0aW9ucz86IGFueSkge1xuICAgICAgICBsZXQgZGF0YSA9IFtdO1xuICAgICAgICB0aGlzLl9sb2FkT3JnYW5zKChvcmdzKSA9PiB7XG4gICAgICAgICAgICAvLyBGaWx0ZXIgb3JncyBtYXRjaFxuICAgICAgICAgICAgbGV0IGtleSA9IHZuVG9MYXRpbihwYXJhbXMua2V5d29yZCkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb3Jncy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCBpdGVtID0gb3Jnc1tpXTtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5faW5kZXguaW5kZXhPZihrZXkpID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5wdXNoKGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPj0gcGFyYW1zLmxpbWl0KVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FsbGJhY2soZGF0YSk7XG4gICAgICAgIH0sIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIGdldEZpbGVVcmwoaXRlbSwgZG9tYWluPzogc3RyaW5nLCBldmVudD86IENhbEV2ZW50KSB7XG4gICAgICAgIGlmICghaXRlbSlcbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgbGV0IG9yZ2lkID0gaXRlbS5vcmdpZCB8fCB0aGlzLmdldE9yZ0lkKCk7XG4gICAgICAgIGxldCBfcm9sZSA9IHRoaXMuX3VzZXJSb2xlc1tvcmdpZF07XG4gICAgICAgIGxldCB1cmw7XG4gICAgICAgIGlmIChfcm9sZSAmJiBfcm9sZS5pc0F1dGggJiYgdGhpcy5pc015T3JnKG9yZ2lkKSkge1xuICAgICAgICAgICAgdXJsID0gJ2NhbGJ1aWxkZXIvYmluYXJ5L3ZpZXcnO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaGFzRmlybUF0dGVuZGVlKGV2ZW50LCB0aGlzLmdldE9yZ0lkKCkpKSB7XG4gICAgICAgICAgICBvcmdpZCA9IHRoaXMuZ2V0T3JnSWQoKTtcbiAgICAgICAgICAgIHVybCA9ICdjYWxidWlsZGVyL2JpbmFyeS92aWV3JztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHVybCA9ICdjYWxidWlsZGVyL21haW5ib2FyZC9iaW5hcnkvdmlldyc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VXJsQnlPcmdJZCh1cmwsIG9yZ2lkLCBkb21haW4pICsgJz9maWxlSUQ9JyArIGl0ZW0udXVpZCArICcmZWxlbWVudD0nICsgaXRlbS5mb2xkZXIgKyAnJm9yZ2lkPScgKyBvcmdpZDtcbiAgICB9XG5cbiAgICBnZXRGaWxlVmlld1VybChpdGVtLCBkb21haW4/OiBzdHJpbmcsIGV2ZW50PzogQ2FsRXZlbnQpIHtcbiAgICAgICAgbGV0IHVybCA9IHRoaXMuZ2V0RmlsZVVybChpdGVtLCBkb21haW4sIGV2ZW50KTtcbiAgICAgICAgaWYgKGl0ZW0uZmlsZSAmJiBpdGVtLmZpbGUuc2xpY2UoLTMpLnRvTG93ZXJDYXNlKCkgPT09IFwicGRmXCIpIHtcbiAgICAgICAgICAgIHVybCArPSAnJnZpZXc9cGRmJnQ9JyArIG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1cmw7XG4gICAgfVxuXG4gICAgaGFzRmlybUF0dGVuZGVlKGV2ZW50OiBDYWxFdmVudCwgb3JnYW5JZDogc3RyaW5nKSB7XG4gICAgICAgIGlmIChldmVudCAmJiBvcmdhbklkKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGV2ZW50Lm1lbWJlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgbWVtYmVyID0gZXZlbnQubWVtYmVyc1tpXTtcbiAgICAgICAgICAgICAgICBpZiAobWVtYmVyLnR5cGUgPT09IENhbEF0dGVuZGVlVHlwZS5PUkdBTiAmJiBtZW1iZXIub3JnYW5JZCA9PT0gb3JnYW5JZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRPcmdCeVVpZCh1dWlkOiBzdHJpbmcpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9vcmdhbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9vcmdhbnNbaV0udXVpZCA9PT0gdXVpZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9vcmdhbnNbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRPcmdCeUlkKG9yZ0lkOiBzdHJpbmcpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9vcmdhbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9vcmdhbnNbaV0uZmlybVVVSUQgPT09IG9yZ0lkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX29yZ2Fuc1tpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldE9yZ05hbWVCeUlkKG9yZ0lkOiBzdHJpbmcpIHtcbiAgICAgICAgbGV0IG9yZ2FuID0gdGhpcy5nZXRPcmdCeUlkKG9yZ0lkKTtcbiAgICAgICAgcmV0dXJuIG9yZ2FuICYmIG9yZ2FuLmZpcm1OYW1lIHx8ICcnO1xuICAgIH1cblxuICAgIGdldE9yZ0J5UHJlZml4KHByZWZpeDogc3RyaW5nKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fb3JnYW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fb3JnYW5zW2ldLmZpcm1QcmVmaXggPT09IHByZWZpeCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9vcmdhbnNbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRVcmxCeU9yZ0lkKHVybCwgb3JnaWQsIGRvbWFpbj86IGFueSkge1xuICAgICAgICBsZXQgaXRlbSA9IHRoaXMuZ2V0T3JnQnlJZChvcmdpZCk7XG4gICAgICAgIHJldHVybiBBamF4QVBJLmdldFVybCh1cmwsIGRvbWFpbiwgaXRlbSAmJiBpdGVtLmZpcm1QcmVmaXgpO1xuICAgIH1cblxuICAgIGxvYWRSb2xlKG9yZ2lkLCBjYWxsYmFjaywgb3B0aW9ucz86IGFueSkge1xuXG4gICAgICAgIG9yZ2lkID0gb3JnaWQgfHwgdGhpcy5nZXRPcmdJZCgpO1xuXG4gICAgICAgIGlmICh0aGlzLl91c2VyUm9sZXNbb3JnaWRdKSB7XG4gICAgICAgICAgICByZXR1cm4gY2FsbGJhY2sodGhpcy5fdXNlclJvbGVzW29yZ2lkXSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNlbmRSZXF1ZXN0KHtcbiAgICAgICAgICAgIHVybDogdGhpcy5yb2xlVXJsLFxuICAgICAgICAgICAgZGF0YToge29yZ2lkOiBvcmdpZH0sXG4gICAgICAgICAgICBzdWNjZXNzOiAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5pc0F1dGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3VzZXJSb2xlc1tvcmdpZF0gPSBkYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgaU5ldC51c2VyY29kZSA9IGRhdGEudXNlcmNvZGU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soZGF0YSk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayh7fSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soe30pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBvcHRpb25zLCB0cnVlKTtcbiAgICB9XG5cbiAgICBsb2FkUm9sZXMob3JnYW5JZHMsIGNhbGxiYWNrLCBvcHRpb25zPzogYW55KSB7XG4gICAgICAgIGxldCBwcm9taXNlcyA9IFtdO1xuICAgICAgICBvcmdhbklkcy5mb3JFYWNoKChvcmdhbklkKSA9PiB7XG4gICAgICAgICAgICBwcm9taXNlcy5wdXNoKG5ldyBQcm9taXNlKChyZXNvbHZlID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRSb2xlKG9yZ2FuSWQsIHJlc29sdmUsIG9wdGlvbnMpO1xuICAgICAgICAgICAgfSkpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIFByb21pc2UuYWxsKHByb21pc2VzKS50aGVuKCh2YWx1ZXMpID0+IGNhbGxiYWNrKHZhbHVlcykpO1xuICAgIH1cblxuICAgIGdlbmVyYXRlRXZlbnRXZWVrVmlldyhldmVudHMsIGRhdGU/OiBhbnksIGZpcnN0RGF5PzogYW55KSB7XG4gICAgICAgIGxldCBzZWdFdmVudHMgPSBbXTtcbiAgICAgICAgbGV0IHN0YXJ0V2VlayA9IERhdGVVdGlscy5nZXREYXRlU3RhcnRXZWVrKGRhdGUsIGZpcnN0RGF5KTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA3OyBpKyspIHtcbiAgICAgICAgICAgIGxldCBkYXlPZlllYXIgPSBEYXRlVXRpbHMuZGF5T2ZZZWFyKHN0YXJ0V2Vlayk7XG4gICAgICAgICAgICBzZWdFdmVudHMucHVzaCh0aGlzLmdlbmVyYXRlRXZlbnRWaWV3KFxuICAgICAgICAgICAgICAgIGV2ZW50cy5maWx0ZXIoKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBldmVudC5kYXkgPT09IGRheU9mWWVhcjtcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBzdGFydFdlZWtcbiAgICAgICAgICAgICkpO1xuICAgICAgICAgICAgc3RhcnRXZWVrLnNldERhdGUoc3RhcnRXZWVrLmdldERhdGUoKSArIDEpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzZWdFdmVudHM7XG4gICAgfVxuXG4gICAgZ2V0TGFzdFVwZGF0ZVNlZ0V2ZW50cyhzZWdFdmVudHMpIHtcbiAgICAgICAgbGV0IGxhc3RVcGRhdGU7XG4gICAgICAgIHNlZ0V2ZW50cy5mb3JFYWNoKChzZWdFdmVudCkgPT4ge1xuICAgICAgICAgICAgc2VnRXZlbnQuaXRlbXMuZm9yRWFjaCgoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgbGFzdFVwZGF0ZUV2ZW50ID0gZXZlbnQudXBkYXRlRGF0ZSB8fCBldmVudC5jcmVhdGVEYXRlO1xuICAgICAgICAgICAgICAgIGlmICghbGFzdFVwZGF0ZSB8fCBsYXN0VXBkYXRlIDwgbGFzdFVwZGF0ZUV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGxhc3RVcGRhdGUgPSBsYXN0VXBkYXRlRXZlbnQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gbGFzdFVwZGF0ZTtcbiAgICB9XG5cbiAgICBnZW5lcmF0ZUV2ZW50VmlldyhldmVudHMsIGRhdGUpIHtcbiAgICAgICAgZGF0ZSA9IG5ldyBEYXRlKGRhdGUpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZGF5OiBEYXRlVXRpbHMuZGF5T2ZZZWFyKGRhdGUpLFxuICAgICAgICAgICAgZGlzcGxheTogdGhpcy5nZXREaXNwbGF5QnlEYXkoZGF0ZS5nZXREYXkoKSksXG4gICAgICAgICAgICBkYXlTdHI6IHRoaXMuZm9ybWF0RGF0ZVN0cihkYXRlKSxcbiAgICAgICAgICAgIGlzVG9kYXk6IERhdGVVdGlscy5kYXRlSXNUb2RheShkYXRlKSxcbiAgICAgICAgICAgIGRhdGU6IGRhdGUsXG4gICAgICAgICAgICBpdGVtczogZXZlbnRzXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXREaXNwbGF5QnlEYXkoZGF5PzogYW55KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlc291cmNlcy5kYXlzW2RheV07XG4gICAgfVxuXG4gICAgYnVpbGRNZW1iZXJzKG1lbWJlcnM6IGFueSwgcm9sZT86IGFueSkge1xuICAgICAgICBtZW1iZXJzLmZvckVhY2goKG1lbWJlcikgPT4gbWVtYmVyLnJvbGUgPSByb2xlIHx8IENhbEF0dGVuZGVlUm9sZS5NRU1CRVIpO1xuICAgICAgICByZXR1cm4gbWVtYmVycztcbiAgICB9XG5cbiAgICBncm91cEF0dGVuZGVlQnlPcmdhbihhdHRlbmRlZXM6IENhbEF0dGVuZGVlW10pIHtcbiAgICAgICAgbGV0IGRhdGEgPSB7fTtcbiAgICAgICAgYXR0ZW5kZWVzLmZvckVhY2goZnVuY3Rpb24gKGF0dGVuZGVlKSB7XG4gICAgICAgICAgICBkYXRhW2F0dGVuZGVlLm9yZ2FuSWRdID0gZGF0YVthdHRlbmRlZS5vcmdhbklkXSB8fCBbXTtcbiAgICAgICAgICAgIGRhdGFbYXR0ZW5kZWUub3JnYW5JZF0ucHVzaChhdHRlbmRlZSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG5cbiAgICBncm91cEF0dGVuZGVlQnlPcmdhblJvbGUoZXZlbnQ6IENhbEV2ZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRlbmRlZXM6IENhbEF0dGVuZGVlW10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIG93bk9yZ2FuSWQ6IHN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IEZ1bmN0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zPzogYW55KSB7XG4gICAgICAgIGlmIChhdHRlbmRlZXMubGVuZ3RoIDwgMSkge1xuICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKFtdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBncm91cEJ5T3JnYW5zID0gdGhpcy5ncm91cEF0dGVuZGVlQnlPcmdhbihhdHRlbmRlZXMpO1xuICAgICAgICBsZXQgb3JnYW5JZHMgPSBPYmplY3Qua2V5cyhncm91cEJ5T3JnYW5zKTtcbiAgICAgICAgaWYgKG9yZ2FuSWRzLmluZGV4T2Yob3duT3JnYW5JZCkgPCAwKSB7XG4gICAgICAgICAgICBvcmdhbklkcy5wdXNoKG93bk9yZ2FuSWQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubG9hZFJvbGVzKG9yZ2FuSWRzLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgaW50ZXJuYWxVcGRhdGUgPSAhZXZlbnQudXVpZCB8fCB0aGlzLmNhblVwZGF0ZUF0dGVuZGVlKGV2ZW50LCBvd25PcmdhbklkKTtcbiAgICAgICAgICAgIGxldCBkYXRhID0gW107XG5cbiAgICAgICAgICAgIE9iamVjdC5rZXlzKGdyb3VwQnlPcmdhbnMpLmZvckVhY2goKG9yZ2FuSWQpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgaXNNeU9yZ2FuID0gb3JnYW5JZCA9PT0gb3duT3JnYW5JZDtcbiAgICAgICAgICAgICAgICBsZXQgZXh0ZXJuYWxVcGRhdGUgPSBpc015T3JnYW4gJiYgdGhpcy5jYW5FeHRlcm5hbFVwZGF0ZUV2ZW50KGV2ZW50LCBvcmdhbklkKTtcbiAgICAgICAgICAgICAgICBsZXQgYXR0ZW5kZWVzID0gZ3JvdXBCeU9yZ2Fuc1tvcmdhbklkXTtcbiAgICAgICAgICAgICAgICBkYXRhLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBvcmdhbklkOiBvcmdhbklkLFxuICAgICAgICAgICAgICAgICAgICBvcmdhbk5hbWU6IHRoaXMuZ2V0T3JnTmFtZUJ5SWQob3JnYW5JZCksXG4gICAgICAgICAgICAgICAgICAgIGludGVybmFsVXBkYXRlOiBpbnRlcm5hbFVwZGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgZXh0ZXJuYWxVcGRhdGU6IGV4dGVybmFsVXBkYXRlLFxuICAgICAgICAgICAgICAgICAgICB1cGRhdGVBdHRlbmRlZTogaW50ZXJuYWxVcGRhdGUgfHwgZXh0ZXJuYWxVcGRhdGUsXG4gICAgICAgICAgICAgICAgICAgIGF0dGVuZGVlczogYXR0ZW5kZWVzLFxuICAgICAgICAgICAgICAgICAgICBjYW5SZW1vdmVBdHRlbmRlZTogZnVuY3Rpb24gKGF0dGVuZGVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaW50ZXJuYWxVcGRhdGUgfHwgKGV4dGVybmFsVXBkYXRlICYmIGF0dGVuZGVlLnR5cGUgIT09IENhbEF0dGVuZGVlVHlwZS5PUkdBTik7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGNhblVwZGF0ZVN0YXRlOiAoYXR0ZW5kZWUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhdHRlbmRlZS5yZWFkVGltZSAhPT0gdW5kZWZpbmVkICYmIGlzTXlPcmdhbiAmJiB0aGlzLmF0dGVuZGVlSXNNZShhdHRlbmRlZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY2FsbGJhY2soZGF0YSk7XG4gICAgICAgIH0sIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIGJ1aWxkTWVtYmVyU3RyKGl0ZW0/OiBhbnkpIHtcbiAgICAgICAgaXRlbS5tZW1iZXJzID0gaXRlbS5tZW1iZXJzIHx8IFtdO1xuICAgICAgICByZXR1cm4gaXRlbS5tZW1iZXJzLm1hcCgoaXRlbSkgPT4gaXRlbS5uYW1lKS5qb2luKCcsJyk7XG4gICAgfVxuXG4gICAgYnVpbGRNZW1iZXJTaG93KG1lbWJlcnMpIHtcbiAgICAgICAgcmV0dXJuIChtZW1iZXJzIHx8IFtdKS5tYXAoKGl0ZW0pID0+IGl0ZW0ubmFtZSkuam9pbignOycpO1xuICAgIH1cblxuICAgIG1vZGlmeURhdGFVcGRhdGUoZGF0YSwgZXZlbnQ/OiBhbnkpIHtcbiAgICAgICAgbGV0IGF0dGVuZGVlSnNvbiA9IFtdO1xuICAgICAgICAvLyBSZW1vdmUgYWxsIG1lbWJlcnMgYW5kIHJlYnVpbGRcbiAgICAgICAgaWYgKGRhdGEuYXR0ZW5kZWUpIHtcblxuICAgICAgICAgICAgbGV0IG5ld0F0dGVuZGVlcyA9IGRhdGEuYXR0ZW5kZWUuZmlsdGVyKGZ1bmN0aW9uIChhdHRlbmRlZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBhdHRlbmRlZS5yZWFkVGltZSA9PT0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmIChldmVudCAmJiBldmVudC51dWlkKSB7XG4gICAgICAgICAgICAgICAgbGV0IHJlbWFpbkF0dGVuZGVlcyA9IGRhdGEuYXR0ZW5kZWUuZmlsdGVyKGZ1bmN0aW9uIChhdHRlbmRlZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYXR0ZW5kZWUucmVhZFRpbWUgIT09IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBldmVudC5tZW1iZXJzLmZvckVhY2goKG1lbWJlcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAobWVtYmVyLnJvbGUgIT09IENhbEF0dGVuZGVlUm9sZS5DUkVBVE9SKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVtYWluQXR0ZW5kZWVzLmluZGV4T2YobWVtYmVyKSA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRlbmRlZUpzb24ucHVzaCh0aGlzLmF0dGVuZGVlUmVtb3ZlSnNvbihtZW1iZXIpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBuZXdBdHRlbmRlZXMuZm9yRWFjaCgoYXR0ZW5kZWUpID0+IGF0dGVuZGVlSnNvbi5wdXNoKHRoaXMuYXR0ZW5kZWVBZGRKc29uKGF0dGVuZGVlKSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gU2VjdXJlIHRleHQgdXBkYXRlXG4gICAgICAgIGlmIChkYXRhLnN1YmplY3QpIHtcbiAgICAgICAgICAgIGRhdGEuc3ViamVjdCA9IHRoaXMuZm9ybWF0VGV4dFVwZGF0ZShkYXRhLnN1YmplY3QpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLmxvY2F0aW9uKSB7XG4gICAgICAgICAgICBkYXRhLmxvY2F0aW9uID0gdGhpcy5mb3JtYXRUZXh0VXBkYXRlKGRhdGEubG9jYXRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgZGF0YS5hdHRlbmRlZSA9IEpTT04uc3RyaW5naWZ5KGF0dGVuZGVlSnNvbik7XG5cbiAgICAgICAgLy8gUGVyc29uYWwgY2FsZW5kYXJcbiAgICAgICAgaWYgKCF0aGlzLmdldENvbmZpZ1ZhbHVlKCdQRVJTT05BTF9DQU5fUFVCTElTSCcpICYmIGRhdGEudHlwZSA9PT0gQ2FsU3ViVHlwZS5QRVJTT05BTCkge1xuICAgICAgICAgICAgZGF0YS5tb2RlID0gQ2FsTW9kZS5DUkVBVEU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGF0YS50eXBlID09PSBDYWxTdWJUeXBlLk1FRVRfUEVPUExFIHx8IGRhdGEudHlwZSA9PT0gQ2FsU3ViVHlwZS5QRVJTT05BTCkge1xuICAgICAgICAgICAgZGF0YS5fc3ViVHlwZSA9IGRhdGEudHlwZTtcbiAgICAgICAgICAgIGRhdGEudHlwZSA9IGRhdGEudHlwZS5zcGxpdCgnOycpWzBdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGF0YS5fc3ViVHlwZSA9ICcnO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuXG4gICAgYXR0ZW5kZWVBZGRKc29uKGF0dGVuZGVlOiBDYWxBdHRlbmRlZSkge1xuICAgICAgICBsZXQgb2JqOiBhbnkgPSB7XG4gICAgICAgICAgICBvcmdhbklkOiBhdHRlbmRlZS5vcmdhbklkLFxuICAgICAgICAgICAgb3JnYW5OYW1lOiBhdHRlbmRlZS5vcmdhbk5hbWUsXG4gICAgICAgICAgICByb2xlOiBhdHRlbmRlZS5yb2xlIHx8IENhbEF0dGVuZGVlUm9sZS5NRU1CRVJcbiAgICAgICAgfTtcbiAgICAgICAgc3dpdGNoIChhdHRlbmRlZS50eXBlKSB7XG4gICAgICAgICAgICBjYXNlIENhbEF0dGVuZGVlVHlwZS5VU0VSOlxuICAgICAgICAgICAgICAgIG9iai5tZW1iZXJzID0gYXR0ZW5kZWUudXNlcm5hbWUgKyAnOicgKyBhdHRlbmRlZS5mdWxsbmFtZTtcbiAgICAgICAgICAgICAgICBvYmouZGlzcGxheSA9IGF0dGVuZGVlLmRpc3BsYXk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIENhbEF0dGVuZGVlVHlwZS5PUkdBTjpcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5nZXRDb25maWdWYWx1ZSgnRVZFTlRfQkVUV0VFTl9VTklUJykpIHtcbiAgICAgICAgICAgICAgICAgICAgb2JqLmZpcm1zID0gYXR0ZW5kZWUub3JnYW5JZCArICc6JyArIGF0dGVuZGVlLm9yZ2FuTmFtZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIG9iai5hbGlhcyA9IGF0dGVuZGVlLmFsaWFzIHx8IGF0dGVuZGVlLm9yZ2FuTmFtZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb2JqO1xuICAgIH1cblxuICAgIGF0dGVuZGVlUmVtb3ZlSnNvbihhdHRlbmRlZTogQ2FsQXR0ZW5kZWUpIHtcbiAgICAgICAgbGV0IG9iajogYW55ID0ge1xuICAgICAgICAgICAgb3JnYW5JZDogYXR0ZW5kZWUub3JnYW5JZFxuICAgICAgICB9O1xuICAgICAgICBzd2l0Y2ggKGF0dGVuZGVlLnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgQ2FsQXR0ZW5kZWVUeXBlLlVTRVI6XG4gICAgICAgICAgICAgICAgb2JqLm1lbWJlcnMgPSBhdHRlbmRlZS51c2VybmFtZSArICc6UkVNT1ZFJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgQ2FsQXR0ZW5kZWVUeXBlLk9SR0FOOlxuICAgICAgICAgICAgICAgIG9iai5maXJtcyA9IGF0dGVuZGVlLm9yZ2FuSWQgKyAnOlJFTU9WRSc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIG9iai5hbGlhcyA9IGF0dGVuZGVlLmFsaWFzICsgJzpSRU1PVkUnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgfVxuXG4gICAgX2NvbnZlcnRPcmcoZGF0YSkge1xuICAgICAgICBkYXRhID0gZGF0YSB8fCBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgaXRlbSA9IGRhdGFbaV07XG4gICAgICAgICAgICBpdGVtLmZpcm1OYW1lID0gaXRlbS5vcmdOYW1lIHx8IGl0ZW0ubmFtZTtcbiAgICAgICAgICAgIGl0ZW0uZmlybVByZWZpeCA9IGl0ZW0udXJpUHJlZml4IHx8IGl0ZW0ucHJlZml4O1xuICAgICAgICAgICAgaXRlbS5maXJtVVVJRCA9IGl0ZW0ub3JnYW5JZCB8fCBpdGVtLm9yZ2FuaUlkIHx8ICcnO1xuICAgICAgICAgICAgdGhpcy5pbmRleE9yZ1NlYXJjaChpdGVtKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHNvcnQgYnkgbmFtZVxuICAgICAgICBkYXRhLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBhLmZpcm1OYW1lLmxvY2FsZUNvbXBhcmUoYi5maXJtTmFtZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cblxuICAgIHZpZXdFdmVudE9uTW9kYWwob2JqZWN0SWQpIHtcbiAgICAgICAgaWYgKHRoaXMuX21hcEV2ZW50c1tvYmplY3RJZF0pIHtcbiAgICAgICAgICAgIGlOZXQucGx1Z2lucy5yZWFkeSgocGx1Z2lucykgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChwbHVnaW5zLnhjYWxlbmRhcikge1xuICAgICAgICAgICAgICAgICAgICBwbHVnaW5zLnhjYWxlbmRhci5vcGVuVmlldyh0aGlzLl9tYXBFdmVudHNbb2JqZWN0SWRdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIFNhdmUgYW5kIGdldCBldmVudFxuICAgIGdldEV2ZW50QnlPYmplY3RJZChvYmplY3RJZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWFwRXZlbnRzW29iamVjdElkXTtcbiAgICB9XG5cbiAgICBnZXRUZXh0Rm9yTWludXRlcyhtaW51dGVzPzogYW55KSB7XG4gICAgICAgIG1pbnV0ZXMgPSBwYXJzZUludChtaW51dGVzKSB8fCAxO1xuICAgICAgICBpZiAobWludXRlcyA+PSA2MCkge1xuICAgICAgICAgICAgcmV0dXJuIE1hdGgucm91bmQobWludXRlcyAvIDYwKSArICcgJyArIHRoaXMucmVzb3VyY2VzLmhvdXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbWludXRlcyArICcgJyArIHRoaXMucmVzb3VyY2VzLm1pbnV0ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdyb3VwRXZlbnRCeVNlc3Npb24oZXZlbnRzKSB7XG4gICAgICAgIGxldCBkYXRhID0ge1xuICAgICAgICAgICAgYWxsZGF5OiBbXSxcbiAgICAgICAgICAgIG1vcm5pbmc6IFtdLFxuICAgICAgICAgICAgYWZ0ZXJub29uOiBbXSxcbiAgICAgICAgICAgIGV2ZW5pbmc6IFtdXG4gICAgICAgIH07XG4gICAgICAgIGV2ZW50cy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBpZiAoaXRlbS5hbGxEYXkpIHtcbiAgICAgICAgICAgICAgICBkYXRhLmFsbGRheS5wdXNoKGl0ZW0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChpdGVtLmZyb20uZ2V0SG91cnMoKSA8IDEyKSB7XG4gICAgICAgICAgICAgICAgZGF0YS5tb3JuaW5nLnB1c2goaXRlbSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGl0ZW0uZnJvbS5nZXRIb3VycygpIDwgMTgpIHtcbiAgICAgICAgICAgICAgICBkYXRhLmFmdGVybm9vbi5wdXNoKGl0ZW0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkYXRhLmV2ZW5pbmcucHVzaChpdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgZm9yIChsZXQgayBpbiBkYXRhKSB7XG4gICAgICAgICAgICB0aGlzLnNvcnRFdmVudHMoZGF0YVtrXSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG5cbiAgICBncm91cEV2ZW50QnlQZXJzb24oZXZlbnRzLCBwZXJzb25zLCBkYXRlKSB7XG4gICAgICAgIGxldCBkYXRhID0ge1xuICAgICAgICAgICAgcGVyc29uczogW10sXG4gICAgICAgICAgICBzZWdFdmVudHM6IHRoaXMuZ2VuZXJhdGVFdmVudFdlZWtWaWV3KGV2ZW50cywgZGF0ZSlcbiAgICAgICAgfTtcbiAgICAgICAgbGV0IGV2ZW50QnlEYXlzID0gZGF0YS5zZWdFdmVudHMubWFwKGZ1bmN0aW9uIChzZWdFdmVudCkge1xuICAgICAgICAgICAgcmV0dXJuIHNlZ0V2ZW50Lml0ZW1zO1xuICAgICAgICB9KTtcblxuICAgICAgICBwZXJzb25zLmZvckVhY2goKHBlcnNvbikgPT4ge1xuICAgICAgICAgICAgbGV0IGV2ZW50RGF5cyA9IGV2ZW50QnlEYXlzLm1hcCgoZXZlbnRzKSA9PlxuICAgICAgICAgICAgICAgIGV2ZW50cy5maWx0ZXIoZXZlbnQgPT4gdGhpcy5tZW1iZXJJc0F0dGVuZGVlKGV2ZW50LCBwZXJzb24ubmFtZSkpKTtcbiAgICAgICAgICAgIGRhdGEucGVyc29ucy5wdXNoKHtcbiAgICAgICAgICAgICAgICBwZXJzb246IHBlcnNvbixcbiAgICAgICAgICAgICAgICBldmVudERheXM6IGV2ZW50RGF5c1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cblxuICAgIGdyb3VwRXZlbnRCeUxlYWRlcnMoZXZlbnRzOiBDYWxFdmVudFtdLCBvcmdhbklkOiBzdHJpbmcsIGNhbGxiYWNrOiBGdW5jdGlvbiwgb3B0aW9ucz86IGFueSkge1xuICAgICAgICB0aGlzLmxvYWRMZWFkZXJzKG9yZ2FuSWQsIChsZWFkZXJzKSA9PiB7XG4gICAgICAgICAgICBsZXQgZGF0YUxlYWRlcnMgPSBbXTtcbiAgICAgICAgICAgIGxldCBvdGhlckV2ZW50cyA9IFtdO1xuICAgICAgICAgICAgbGVhZGVycy5mb3JFYWNoKChsZWFkZXIpID0+IGRhdGFMZWFkZXJzLnB1c2goe1xuICAgICAgICAgICAgICAgIHVzZXJuYW1lOiBsZWFkZXIubmFtZSxcbiAgICAgICAgICAgICAgICBmdWxsbmFtZTogbGVhZGVyLnZhbHVlLFxuICAgICAgICAgICAgICAgIGV2ZW50czogW11cbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIGV2ZW50cy5mb3JFYWNoKChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBpc0ZvdW5kO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YUxlYWRlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSBkYXRhTGVhZGVyc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubWVtYmVySXNBdHRlbmRlZShldmVudCwgaXRlbS51c2VybmFtZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzRm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5ldmVudHMucHVzaChldmVudCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFpc0ZvdW5kKSB7XG4gICAgICAgICAgICAgICAgICAgIG90aGVyRXZlbnRzLnB1c2goZXZlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY2FsbGJhY2soZGF0YUxlYWRlcnMsIG90aGVyRXZlbnRzKTtcbiAgICAgICAgfSwgb3B0aW9ucywgdHJ1ZSk7XG4gICAgfVxuXG4gICAgbWVJc0NyZWF0b3IoZXZlbnQ6IENhbEV2ZW50KTogYm9vbGVhbiB7XG4gICAgICAgIGZvciAobGV0IGkgPSBldmVudC5tZW1iZXJzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICBpZiAoZXZlbnQubWVtYmVyc1tpXS5yb2xlID09PSBDYWxBdHRlbmRlZVJvbGUuQ1JFQVRPUiAmJiB0aGlzLmF0dGVuZGVlSXNNZShldmVudC5tZW1iZXJzW2ldKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBhdHRlbmRlZUlzTWUoYXR0ZW5kZGU6IENhbEF0dGVuZGVlKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnVzZXJuYW1lSXNNZShhdHRlbmRkZS51c2VybmFtZSk7XG4gICAgfVxuXG4gICAgYXR0ZW5kZWVEaXNwbGF5KGF0dGVuZGRlOiBDYWxBdHRlbmRlZSkge1xuICAgICAgICByZXR1cm4gYXR0ZW5kZGUuYWxpYXMgfHwgYXR0ZW5kZGUuZGlzcGxheSB8fCBhdHRlbmRkZS5mdWxsbmFtZSB8fCBhdHRlbmRkZS51c2VybmFtZSB8fCBhdHRlbmRkZS5vcmdhbk5hbWU7XG4gICAgfVxuXG4gICAgYXR0ZW5kZWVWYWx1ZShhdHRlbmRkZTogQ2FsQXR0ZW5kZWUpIHtcbiAgICAgICAgcmV0dXJuIGF0dGVuZGRlLmFsaWFzIHx8IGF0dGVuZGRlLnVzZXJuYW1lIHx8IGF0dGVuZGRlLm9yZ2FuSWQ7XG4gICAgfVxuXG4gICAgZm9ybWF0VGV4dERpc3BsYXkodGV4dDogc3RyaW5nKSB7XG4gICAgICAgIGxldCBkaXNwbGF5ID0gdGhpcy5mb3JtYXRUZXh0VXBkYXRlKHRleHQpO1xuXG4gICAgICAgIC8vIGJyZWFrIGxpbmVcbiAgICAgICAgZGlzcGxheSA9IGRpc3BsYXkucmVwbGFjZSgvXFxuL2csICc8YnI+Jyk7XG5cbiAgICAgICAgcmV0dXJuIGRpc3BsYXk7XG4gICAgfVxuXG4gICAgZm9ybWF0VGV4dFVwZGF0ZSh0ZXh0OiBzdHJpbmcpIHtcbiAgICAgICAgbGV0ICRmcmFnbWVudCA9ICQoJzxkaXY+JykuaHRtbCh0ZXh0KTtcbiAgICAgICAgJGZyYWdtZW50LmZpbmQoJ3N0eWxlLHNjcmlwdCcpLnJlbW92ZSgpO1xuICAgICAgICByZXR1cm4gJGZyYWdtZW50Lmh0bWwoKTtcbiAgICB9XG5cbiAgICBtZW1iZXJJc0F0dGVuZGVlKGV2ZW50OiBDYWxFdmVudCwgbWVtYmVyOiBzdHJpbmcpIHtcbiAgICAgICAgLy8gZm9yIChsZXQgaSA9IDA7IGkgPCBldmVudC5tZW1iZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIC8vICAgICBpZiAoZXZlbnQubWVtYmVyc1tpXS5yb2xlICE9PSBDYWxBdHRlbmRlZVJvbGUuQ1JFQVRPUiAmJiBldmVudC5tZW1iZXJzW2ldLnVzZXJuYW1lID09PSBtZW1iZXIpIHtcbiAgICAgICAgLy8gICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGV2ZW50Lm1lbWJlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChldmVudC5tZW1iZXJzW2ldLnVzZXJuYW1lID09PSBtZW1iZXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldEF0dGVuZGVlQnlVc2VybmFtZShldmVudDogQ2FsRXZlbnQsIHVzZXJuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBldmVudC5tZW1iZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoZXZlbnQubWVtYmVyc1tpXS51c2VybmFtZSA9PT0gdXNlcm5hbWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZXZlbnQubWVtYmVyc1tpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldEF0dGVuZGVlSXNNZShldmVudDogQ2FsRXZlbnQpOiBDYWxBdHRlbmRlZSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZXZlbnQubWVtYmVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IG1lbWJlciA9IGV2ZW50Lm1lbWJlcnNbaV07XG4gICAgICAgICAgICBpZiAobWVtYmVyLnJvbGUgIT09IENhbEF0dGVuZGVlUm9sZS5DUkVBVE9SICYmIHRoaXMudXNlcm5hbWVJc01lKG1lbWJlci51c2VybmFtZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbWVtYmVyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZXZlbnRJc1ZpZXdlZChldmVudDogQ2FsRXZlbnQpIHtcbiAgICAgICAgbGV0IGF0dGVuZGVlID0gdGhpcy5nZXRBdHRlbmRlZUlzTWUoZXZlbnQpO1xuICAgICAgICByZXR1cm4gIWF0dGVuZGVlIHx8IGF0dGVuZGVlLnJlYWRUaW1lO1xuICAgIH1cblxuICAgIHVzZXJuYW1lSXNNZSh1c2VybmFtZTogU3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB1c2VybmFtZSA9PT0gaU5ldC51c2VyY29kZTtcbiAgICB9XG5cbiAgICBzZW5kUmVxdWVzdChkYXRhOiBhbnksIG9wdGlvbnM/OiBhbnksIGNhY2hlUmVzcG9uc2U/OiBhbnkpIHtcbiAgICAgICAgbGV0IG9wdGlvbiA9IHRoaXMuX2J1aWxkQWpheE9wdGlvbnMoZGF0YSwgb3B0aW9ucyk7XG4gICAgICAgIGlmIChjYWNoZVJlc3BvbnNlKSB7XG4gICAgICAgICAgICBsZXQga2V5Q2FjaGUgPSBvcHRpb24udXJsO1xuICAgICAgICAgICAgaWYgKG9wdGlvbi5kYXRhICYmIE9iamVjdC5rZXlzKG9wdGlvbi5kYXRhKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAga2V5Q2FjaGUgKz0gSlNPTi5zdHJpbmdpZnkob3B0aW9uLmRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IGRhdGFDYWNoZWQgPSB0aGlzLmNhY2hlRGF0YVRlbXAoa2V5Q2FjaGUpO1xuICAgICAgICAgICAgaWYgKGRhdGFDYWNoZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb3B0aW9uLnN1Y2Nlc3MoZGF0YUNhY2hlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmFkZFF1ZXVlKGtleUNhY2hlLCAocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBfb3B0aW9uID0gJC5leHRlbmQoe30sIG9wdGlvbik7XG4gICAgICAgICAgICAgICAgX29wdGlvbi5zdWNjZXNzID0gKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWNoZURhdGFUZW1wKGtleUNhY2hlLCBkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShkYXRhKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIF9vcHRpb24uZXJyb3IgPSAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShudWxsLCBlcnJvcik7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBBamF4QVBJLnNlbmRSZXF1ZXN0KF9vcHRpb24pO1xuICAgICAgICAgICAgfSwgKGRhdGEsIGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbi5lcnJvciAmJiBvcHRpb24uZXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbi5zdWNjZXNzICYmIG9wdGlvbi5zdWNjZXNzKGRhdGEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIEFqYXhBUEkuc2VuZFJlcXVlc3Qob3B0aW9uKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHBvc3RGb3JtKGRhdGE6IGFueSwgb3B0aW9ucz86IGFueSkge1xuICAgICAgICByZXR1cm4gQWpheEFQSS5wb3N0Rm9ybSh0aGlzLl9idWlsZEFqYXhPcHRpb25zKGRhdGEsIG9wdGlvbnMpKTtcbiAgICB9XG5cbiAgICBfYnVpbGRBamF4T3B0aW9ucyhkYXRhLCBvcHRpb25zPzogYW55KSB7XG5cbiAgICAgICAgbGV0IG9wdGlvbiA9ICQuZXh0ZW5kKHt9LCBkYXRhLCBvcHRpb25zKTtcbiAgICAgICAgbGV0IG9yZ2lkID0gb3B0aW9uLmRhdGEgJiYgb3B0aW9uLmRhdGEub3JnaWQgfHwgdGhpcy5nZXRPcmdJZCgpO1xuICAgICAgICBsZXQgb3JnID0gdGhpcy5nZXRPcmdCeUlkKG9yZ2lkKTtcbiAgICAgICAgbGV0IGlzTG9jYWxGaXJtID0gb3JnICYmIG9yZy5maXJtUHJlZml4ID09PSBpTmV0LnBhdGguc2xpY2UoMSk7XG4gICAgICAgIGxldCBpc1VzZU9yZ0lkID0gIW9wdGlvbi5yZW1vdmVPcmdJZCAmJiAoaXNMb2NhbEZpcm0gfHwgb3B0aW9uLnVzZU9yZ0lkKTtcbiAgICAgICAgaWYgKGlzVXNlT3JnSWQpIHtcbiAgICAgICAgICAgIG9wdGlvbi5kYXRhID0gb3B0aW9uLmRhdGEgfHwge307XG4gICAgICAgICAgICBvcHRpb24uZGF0YS5vcmdpZCA9IG9yZ2lkO1xuICAgICAgICB9IGVsc2UgaWYgKG9wdGlvbi5kYXRhKSB7XG4gICAgICAgICAgICBkZWxldGUgb3B0aW9uLmRhdGEub3JnaWQ7XG4gICAgICAgIH1cbiAgICAgICAgb3B0aW9uLnVybCA9IHRoaXMuZ2V0VXJsQnlPcmdJZChvcHRpb24udXJsLCBvcmdpZCwgb3B0aW9uLmRvbWFpbik7XG4gICAgICAgIHJldHVybiBvcHRpb247XG4gICAgfVxuXG4gICAgX2dldE9yZ2FuT25Jbml0KCkge1xuICAgICAgICBsZXQgb3JnYW47XG5cbiAgICAgICAgbGV0IHBhcmFtcyA9IHRoaXMuZ2V0UXVlcnlQYXJhbXMoKTtcblxuICAgICAgICAvLyBHZXQgYnkgdXJsIHF1ZXJ5XG4gICAgICAgIGlmIChwYXJhbXNbJ29yZ2lkJ10pIHtcbiAgICAgICAgICAgIHRoaXMuc2V0T3JnSWQocGFyYW1zWydvcmdpZCddKTtcbiAgICAgICAgICAgIG9yZ2FuID0gdGhpcy5nZXRPcmdCeUlkKHBhcmFtc1snb3JnaWQnXSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBnZXQgb3JnYW4gYnkgZmlybSBwcmVmaXhcbiAgICAgICAgaWYgKCFvcmdhbiAmJiBpTmV0LmZpcm1QcmVmaXggIT09ICdzbWFydGNsb3VkJykge1xuICAgICAgICAgICAgb3JnYW4gPSB0aGlzLmdldE9yZ0J5UHJlZml4KGlOZXQuZmlybVByZWZpeCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBHZXQgb3JnYW4gYWN0aXZlIHJlY2VudGx5XG4gICAgICAgIGlmICghb3JnYW4pIHtcbiAgICAgICAgICAgIGxldCBvcmdhbklkID0gdGhpcy5nZXRPcmdJZCgpIHx8IGlOZXQub3JnYW5JZDtcbiAgICAgICAgICAgIG9yZ2FuID0gdGhpcy5nZXRPcmdCeUlkKG9yZ2FuSWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gR2V0IG9yZ2FuIGxvY2FsXG4gICAgICAgIGlmICghb3JnYW4pIHtcbiAgICAgICAgICAgIG9yZ2FuID0gdGhpcy5nZXRPcmdCeVByZWZpeChpTmV0LnBhdGguc2xpY2UoMSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZ2V0IG9yZ2FuIGZpcnN0XG4gICAgICAgIGlmICghb3JnYW4pIHtcbiAgICAgICAgICAgIG9yZ2FuID0gdGhpcy5fbXlPcmdhbnMgJiYgdGhpcy5fbXlPcmdhbnNbMF0gfHwgdGhpcy5fb3JnYW5zICYmIHRoaXMuX29yZ2Fuc1swXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvcmdhbikge1xuICAgICAgICAgICAgdGhpcy5zZXRPcmdJZChvcmdhbi5maXJtVVVJRCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gb3JnYW47XG4gICAgfVxuXG4gICAgZ3JvdXBFdmVudEJ5Q2FyKGNhcnMsIGV2ZW50cykge1xuICAgICAgICBsZXQgZGF0YSA9IFtdO1xuICAgICAgICBjYXJzLmZvckVhY2goZnVuY3Rpb24gKGNhcikge1xuICAgICAgICAgICAgZGF0YS5wdXNoKHtcbiAgICAgICAgICAgICAgICBjYXI6IGNhcixcbiAgICAgICAgICAgICAgICBldmVudHM6IFtdXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZXZlbnRzLmZvckVhY2goZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBsZXQgY2FyRGF0YSA9IGRhdGFbMF07XG4gICAgICAgICAgICBpZiAoZXZlbnQuX2NhclVVSUQpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGFbaV0uY2FyLnV1aWQgPT09IGV2ZW50Ll9jYXJVVUlEKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXJEYXRhID0gZGF0YVtpXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhckRhdGEuZXZlbnRzLnB1c2goZXZlbnQpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG5cbiAgICBmaWx0ZXJNZWV0UGVvcGxlRXZlbnRzKGV2ZW50cykge1xuICAgICAgICByZXR1cm4gZXZlbnRzLmZpbHRlcihmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIHJldHVybiBldmVudC5fc3ViVHlwZSA9PT0gQ2FsU3ViVHlwZS5NRUVUX1BFT1BMRTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgX2xvYWRPbkRpZmZlclllYXIoZXhlY3V0b3IsIHBhcmFtcywgY2FsbGJhY2ssIG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKCFwYXJhbXMuZnJvbSB8fCAhcGFyYW1zLnRvIHx8IHBhcmFtcy5mcm9tIDw9IHBhcmFtcy50bykge1xuICAgICAgICAgICAgZXhlY3V0b3IuYXBwbHkodGhpcywgW3BhcmFtcywgY2FsbGJhY2ssIG9wdGlvbnNdKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIExvYWQgaW4gZGlmZmVyIHllYXJcbiAgICAgICAgICAgIGxldCBwcm9taXNlcyA9IFtdO1xuICAgICAgICAgICAgbGV0IGVuZE9mWWVhciA9IG5ldyBEYXRlKHBhcmFtcy55ZWFyICsgMSwgMCk7XG4gICAgICAgICAgICBlbmRPZlllYXIuc2V0VGltZShlbmRPZlllYXIuZ2V0VGltZSgpIC0gMSk7XG5cbiAgICAgICAgICAgIGxldCBwYXJhbXMxID0gJC5leHRlbmQoe30sIHBhcmFtcyk7XG4gICAgICAgICAgICBsZXQgb3B0aW9uczEgPSAkLmV4dGVuZCh7fSwgb3B0aW9ucyk7XG4gICAgICAgICAgICBwYXJhbXMxLnRvID0gRGF0ZVV0aWxzLmRheU9mWWVhcihlbmRPZlllYXIpO1xuICAgICAgICAgICAgcHJvbWlzZXMucHVzaChuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgICAgIGV4ZWN1dG9yLmFwcGx5KHRoaXMsIFtwYXJhbXMxLCByZXNvbHZlLCBvcHRpb25zMV0pO1xuICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgICAgICBsZXQgcGFyYW1zMiA9ICQuZXh0ZW5kKHt9LCBwYXJhbXMpO1xuICAgICAgICAgICAgbGV0IG9wdGlvbnMyID0gJC5leHRlbmQoe30sIG9wdGlvbnMpO1xuICAgICAgICAgICAgcGFyYW1zMi55ZWFyID0gcGFyYW1zLnllYXIgKyAxO1xuICAgICAgICAgICAgcGFyYW1zMi5mcm9tID0gMTtcbiAgICAgICAgICAgIHByb21pc2VzLnB1c2gobmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgICAgICBleGVjdXRvci5hcHBseSh0aGlzLCBbcGFyYW1zMiwgcmVzb2x2ZSwgb3B0aW9uczJdKTtcbiAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4oKHZhbHVlcykgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBldmVudHMgPSBbXS5jb25jYXQuYXBwbHkoW10sIHZhbHVlcyk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVFdmVudER1cGxpY2F0ZShldmVudHMpO1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGV2ZW50cyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGxvYWRNb250aEV2ZW50cyhwYXJhbXMsIGRhdGUsIGNhbGxiYWNrLCBvcHRpb25zPzogYW55KSB7XG4gICAgICAgIGxldCBmcm9tLCB0bztcbiAgICAgICAgZGF0ZSA9IG5ldyBEYXRlKGRhdGUpO1xuICAgICAgICAvLyBTdGFydCBtb250aFxuICAgICAgICBkYXRlLnNldERhdGUoMSk7XG5cbiAgICAgICAgLy8gU3RhcnQgZGF0ZSBvZiB3ZWVrXG4gICAgICAgIGZyb20gPSBEYXRlVXRpbHMuZ2V0RGF0ZVN0YXJ0V2VlayhkYXRlKTtcblxuICAgICAgICAvLyBFbmQgbW9udGhcbiAgICAgICAgZGF0ZS5zZXRNb250aChkYXRlLmdldE1vbnRoKCkgKyAxKTtcbiAgICAgICAgZGF0ZS5zZXRUaW1lKGRhdGUuZ2V0VGltZSgpIC0gMSk7XG5cbiAgICAgICAgLy8gRW5kIGRhdGUgb2Ygd2Vla1xuICAgICAgICB0byA9IERhdGVVdGlscy5nZXREYXRlRW5kV2VlayhkYXRlKTtcblxuICAgICAgICBwYXJhbXMgPSAkLmV4dGVuZCh7fSwgcGFyYW1zLCB0aGlzLmdldFJhbmdlUGFyYW1zKGZyb20sIHRvKSk7XG5cbiAgICAgICAgaWYgKHRoaXMuaXNNeU9yZyhwYXJhbXMub3JnaWQpKSB7XG4gICAgICAgICAgICB0aGlzLmdldExpc3RFdmVudHMocGFyYW1zLCBjYWxsYmFjaywgb3B0aW9ucyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmxvYWRQdWJsaXNoRXZlbnRzKHBhcmFtcywgY2FsbGJhY2ssIG9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0RXhwb3J0VXJsKGNhbEV2ZW50LCBkb21haW4pIHtcbiAgICAgICAgaWYgKGNhbEV2ZW50ICYmIGNhbEV2ZW50LnV1aWQgJiYgY2FsRXZlbnQuX3RlbXBsYXRlSWQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFVybEJ5T3JnSWQoJ2NhbGJ1aWxkZXIvaW52aXRhdGlvbi9leHBvcnQnLCBjYWxFdmVudC5maXJtVVVJRCwgZG9tYWluKSArXG4gICAgICAgICAgICAgICAgJz90ZW1wbGF0ZUlEPScgKyBjYWxFdmVudC5fdGVtcGxhdGVJZCArXG4gICAgICAgICAgICAgICAgJyZlbGVtZW50PScgKyBjYWxFdmVudC51dWlkO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0V2Vla1BhcmFtcyhkYXRlKSB7XG4gICAgICAgIGxldCB3ZWVrUmFuZ2UgPSBEYXRlVXRpbHMuZ2V0V2Vla1JhbmdlKGRhdGUpO1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRSYW5nZVBhcmFtcyh3ZWVrUmFuZ2Uuc3RhcnRXZWVrLCB3ZWVrUmFuZ2UuZW5kV2Vlayk7XG4gICAgfVxuXG4gICAgZ2V0UmFuZ2VQYXJhbXMoZnJvbSwgdG8pIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHllYXI6IGZyb20uZ2V0RnVsbFllYXIoKSxcbiAgICAgICAgICAgIGZyb206IERhdGVVdGlscy5kYXlPZlllYXIoZnJvbSksXG4gICAgICAgICAgICB0bzogRGF0ZVV0aWxzLmRheU9mWWVhcih0bylcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRhdGVFcXVhbFdlZWtQYXJhbXMoZGF0ZSwgd2Vla1BhcmFtcykge1xuICAgICAgICBsZXQgcGFyYW1zID0gdGhpcy5nZXRXZWVrUGFyYW1zKGRhdGUpO1xuICAgICAgICByZXR1cm4gZGF0ZSAmJiB3ZWVrUGFyYW1zICYmIHBhcmFtcy55ZWFyID09PSB3ZWVrUGFyYW1zLnllYXIgJiZcbiAgICAgICAgICAgIHBhcmFtcy5mcm9tID09PSB3ZWVrUGFyYW1zLmZyb20gJiZcbiAgICAgICAgICAgIHBhcmFtcy50byA9PT0gd2Vla1BhcmFtcy50bztcbiAgICB9XG5cbiAgICBldmVudElzT25SYW5nZShldmVudDogQ2FsRXZlbnQsIHBhcmFtcz86IGFueSkge1xuICAgICAgICByZXR1cm4gKHBhcmFtcy5zdGFydFRpbWUgPj0gZXZlbnQuc3RhcnRUaW1lICYmIHBhcmFtcy5zdGFydFRpbWUgPCBldmVudC50b1RpbWUpIHx8XG4gICAgICAgICAgICAocGFyYW1zLnRvVGltZSA8PSBldmVudC50b1RpbWUgJiYgcGFyYW1zLnRvVGltZSA+IGV2ZW50LnN0YXJ0VGltZSkgfHxcbiAgICAgICAgICAgIChwYXJhbXMuc3RhcnRUaW1lIDw9IGV2ZW50LnN0YXJ0VGltZSAmJiBwYXJhbXMudG9UaW1lID49IGV2ZW50LnRvVGltZSk7XG4gICAgfVxuXG4gICAgdmVyaWZ5RHVwbGljYXRlRXZlbnRzKHBhcmFtcywgY2FsbGJhY2s6IEZ1bmN0aW9uLCBvcHRpb25zPzogYW55KSB7XG4gICAgICAgIGxldCBkdXBsaWNhdGVFdmVudHMgPSBbXTtcbiAgICAgICAgdGhpcy5sb2FkUHVibGlzaEV2ZW50cyh7XG4gICAgICAgICAgICB5ZWFyOiBwYXJhbXMueWVhcixcbiAgICAgICAgICAgIGRheTogcGFyYW1zLmRheSxcbiAgICAgICAgICAgIG9yZ2lkOiBwYXJhbXMub3JnaWQgfHwgdGhpcy5nZXRPcmdJZCgpXG4gICAgICAgIH0sIChldmVudHMpID0+IHtcbiAgICAgICAgICAgIGxldCBhbGxFdmVudHMgPSBbXTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuY2F0SXNDYXIocGFyYW1zLmNhdGVnb3J5KSkge1xuICAgICAgICAgICAgICAgIGV2ZW50cyA9IGV2ZW50cy5maWx0ZXIoKGV2ZW50KSA9PiB0aGlzLmNhdElzQ2FyKGV2ZW50LmNhdGVnb3J5KSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGV2ZW50cyA9IGV2ZW50cy5maWx0ZXIoKGV2ZW50KSA9PiAhdGhpcy5jYXRJc0NhcihldmVudC5jYXRlZ29yeSkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBkZXRlY3RvciA9ICh1c2VybmFtZSkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBvYmo6IGFueSA9IHtcbiAgICAgICAgICAgICAgICAgICAgdXNlcm5hbWU6IHVzZXJuYW1lLFxuICAgICAgICAgICAgICAgICAgICBldmVudHM6IFtdXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIGV2ZW50cy5mb3JFYWNoKChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgbWVtYmVyID0gdGhpcy5nZXRBdHRlbmRlZUJ5VXNlcm5hbWUoZXZlbnQsIHVzZXJuYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1lbWJlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmZ1bGxuYW1lID0gbWVtYmVyLmZ1bGxuYW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmV2ZW50cy5wdXNoKGV2ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsbEV2ZW50cy5wdXNoKGV2ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgaWYgKG9iai5ldmVudHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBkdXBsaWNhdGVFdmVudHMucHVzaChvYmopO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBldmVudHMgPSBldmVudHMuZmlsdGVyKChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBldmVudC5tb2RlID09PSBDYWxNb2RlLlBVQkxJU0ggJiYgZXZlbnQudXVpZCAhPT0gcGFyYW1zLmVsZW1lbnQgJiZcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ldmVudElzT25SYW5nZShldmVudCwgcGFyYW1zKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKHBhcmFtcy5hdHRlbmRlZSkge1xuICAgICAgICAgICAgICAgIHBhcmFtcy5hdHRlbmRlZS5mb3JFYWNoKChhdHRlbmRlZSkgPT4gZGV0ZWN0b3IoYXR0ZW5kZWUudXNlcm5hbWUpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gVG9kbzogY3JlYXRvciBpcyBhdHRlbmRlZVxuICAgICAgICAgICAgbGV0IGlzRXhpc3QgPSBmYWxzZTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZHVwbGljYXRlRXZlbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGR1cGxpY2F0ZUV2ZW50c1tpXS51c2VybmFtZSA9PT0gaU5ldC51c2VyY29kZSkge1xuICAgICAgICAgICAgICAgICAgICBpc0V4aXN0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFpc0V4aXN0KSB7XG4gICAgICAgICAgICAgICAgZGV0ZWN0b3IoaU5ldC51c2VyY29kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkdXBsaWNhdGVFdmVudHNbJ2FsbEV2ZW50cyddID0gdGhpcy5yZW1vdmVFdmVudER1cGxpY2F0ZShhbGxFdmVudHMpO1xuICAgICAgICAgICAgY2FsbGJhY2soZHVwbGljYXRlRXZlbnRzKTtcbiAgICAgICAgfSwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgbmVlZFZlcmlmeUR1cGxpY2F0ZShwYXJhbXMsIGV2ZW50KSB7XG4gICAgICAgIHZhciBpc0V2ZW50UHVibGlzaGVkID0gZXZlbnQubW9kZSA9PT0gQ2FsTW9kZS5QVUJMSVNIO1xuICAgICAgICB2YXIgYWN0aW9uUHVibGlzaCA9ICFpc0V2ZW50UHVibGlzaGVkICYmIE51bWJlcihwYXJhbXMubW9kZSkgPT09IENhbE1vZGUuUFVCTElTSDtcbiAgICAgICAgdmFyIGlzVGltZUNoYW5nZWQgPSBldmVudC51dWlkICYmIChcbiAgICAgICAgICAgIChwYXJhbXMuc3RhcnRUaW1lICYmIGV2ZW50LnN0YXJ0VGltZSAhPT0gcGFyYW1zLnN0YXJ0VGltZSkgfHxcbiAgICAgICAgICAgIChwYXJhbXMudG9UaW1lICYmIGV2ZW50LnRvVGltZSAhPT0gcGFyYW1zLnRvVGltZSkgfHxcbiAgICAgICAgICAgIChwYXJhbXMuZGF5ICYmIGV2ZW50LmRheSAhPT0gcGFyYW1zLmRheSlcbiAgICAgICAgKSAmJiBpc0V2ZW50UHVibGlzaGVkO1xuICAgICAgICByZXR1cm4gYWN0aW9uUHVibGlzaCB8fCBpc1RpbWVDaGFuZ2VkO1xuICAgIH1cblxuICAgIHN1YmplY3REaXNwbGF5V2l0aE1heExlbmd0aChldmVudCkge1xuICAgICAgICAvLyBTdWJqZWN0IG1heCBsZW5ndGhcbiAgICAgICAgdmFyIG1heExlbmd0aCA9IE51bWJlcih0aGlzLmdldENvbmZpZ1ZhbHVlKCdTVUJKRUNUX0RJU1BMQVlfTUFYX0xFTkdUSCcpKSB8fCAwO1xuICAgICAgICAvLyBEaXNwbGF5IHZpZXcgbW9yZVxuICAgICAgICBpZiAobWF4TGVuZ3RoID4gMCAmJiBtYXhMZW5ndGggPCBldmVudC5zdWJqZWN0Lmxlbmd0aCkge1xuICAgICAgICAgICAgdmFyIHN1YmplY3REaXNwbGF5ID0gZXZlbnQuc3ViamVjdC5zdWJzdHIoMCwgbWF4TGVuZ3RoKTtcbiAgICAgICAgICAgIHN1YmplY3REaXNwbGF5ID0gdGhpcy5mb3JtYXRUZXh0RGlzcGxheShzdWJqZWN0RGlzcGxheSk7XG4gICAgICAgICAgICBzdWJqZWN0RGlzcGxheSArPSAnLi4uJztcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZvcm1hdFRleHREaXNwbGF5KHN1YmplY3REaXNwbGF5KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZXZlbnQuc3ViamVjdERpc3BsYXk7XG4gICAgfVxuXG4gICAgLy8gU3ViRmlybSBEaWN0aW9uYXJ5IFV0aWxzXG4gICAgZGljdENyZWF0ZShkYXRhOiBEaWN0aW9uYXJ5RGF0YSwgY2FsbGJhY2s6IEZ1bmN0aW9uLCBvcHRpb25zPzogYW55KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbmRSZXF1ZXN0KHtcbiAgICAgICAgICAgIHR5cGU6ICdwb3N0JyxcbiAgICAgICAgICAgIHVybDogJ3N1YmZpcm0vZGljdGlvbmFyeS9jcmVhdGUnLFxuICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGNhbGxiYWNrXG4gICAgICAgIH0sIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIGRpY3RVcGRhdGUoZGF0YTogRGljdGlvbmFyeURhdGEsIGNhbGxiYWNrOiBGdW5jdGlvbiwgb3B0aW9ucz86IGFueSkge1xuICAgICAgICBkYXRhLmRpY3RJRCA9IGRhdGEuZGljdElEIHx8IGRhdGEudXVpZDtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VuZFJlcXVlc3Qoe1xuICAgICAgICAgICAgdHlwZTogJ3Bvc3QnLFxuICAgICAgICAgICAgdXJsOiAnc3ViZmlybS9kaWN0aW9uYXJ5L3VwZGF0ZScsXG4gICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgc3VjY2VzczogY2FsbGJhY2tcbiAgICAgICAgfSwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgZGljdFJlbW92ZShkYXRhOiBEaWN0aW9uYXJ5RGF0YSwgY2FsbGJhY2s6IEZ1bmN0aW9uLCBvcHRpb25zPzogYW55KSB7XG4gICAgICAgIGRhdGEuZGljdElEID0gZGF0YS5kaWN0SUQgfHwgZGF0YS51dWlkO1xuICAgICAgICByZXR1cm4gdGhpcy5zZW5kUmVxdWVzdCh7XG4gICAgICAgICAgICB0eXBlOiAncG9zdCcsXG4gICAgICAgICAgICB1cmw6ICdzdWJmaXJtL2RpY3Rpb25hcnkvcmVtb3ZlJyxcbiAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICBzdWNjZXNzOiBjYWxsYmFja1xuICAgICAgICB9LCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBkaWN0TGlzdChwYXJhbXMsIGNhbGxiYWNrOiBGdW5jdGlvbiwgb3B0aW9ucz86IGFueSwgY2FjaGVSZXNwb25zZT86IGJvb2xlYW4pIHtcbiAgICAgICAgLy8gcmVmZXJlbmNlOiByZXF1aXJlZFxuICAgICAgICByZXR1cm4gdGhpcy5zZW5kUmVxdWVzdCh7XG4gICAgICAgICAgICB0eXBlOiAncG9zdCcsXG4gICAgICAgICAgICB1cmw6ICdzdWJmaXJtL2RpY3Rpb25hcnkvbGlzdCcsXG4gICAgICAgICAgICBkYXRhOiBwYXJhbXMsXG4gICAgICAgICAgICBzdWNjZXNzOiAoZGF0YSkgPT4gY2FsbGJhY2soZGF0YSAmJiBkYXRhLml0ZW1zIHx8IFtdKSxcbiAgICAgICAgICAgIGVycm9yOiAoKSA9PiBjYWxsYmFjayhbXSlcbiAgICAgICAgfSwgb3B0aW9ucywgY2FjaGVSZXNwb25zZSk7XG4gICAgfVxuXG4gICAgLy8gTGVhZGVyXG4gICAgbG9hZExlYWRlcnMob3JnYW5JZDogc3RyaW5nLCBjYWxsYmFjazogRnVuY3Rpb24sIG9wdGlvbnM/OiBhbnksIGNhY2hlUmVzcG9uc2U/OiBib29sZWFuKSB7XG4gICAgICAgIGxldCBwYXJhbXMgPSB7XG4gICAgICAgICAgICBvcmdpZDogb3JnYW5JZCB8fCB0aGlzLmdldE9yZ0lkKCksXG4gICAgICAgICAgICByZWZlcmVuY2U6IExFQURFUl9SRUZFUkVOQ0VcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5kaWN0TGlzdChwYXJhbXMsIGZ1bmN0aW9uIChsZWFkZXJzKSB7XG4gICAgICAgICAgICBsZWFkZXJzLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYi5vcmRlciAtIGEub3JkZXI7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNhbGxiYWNrKGxlYWRlcnMpO1xuICAgICAgICB9LCBvcHRpb25zLCBjYWNoZVJlc3BvbnNlKTtcbiAgICB9XG5cbiAgICBsZWFkZXJDcmVhdGVPclVwZGF0ZShkYXRhOiBEaWN0aW9uYXJ5RGF0YSwgY2FsbGJhY2s6IEZ1bmN0aW9uLCBvcHRpb25zPzogYW55KSB7XG4gICAgICAgIGlmICghZGF0YS51dWlkKSB7XG4gICAgICAgICAgICBkYXRhLnJlZmVyZW5jZSA9IExFQURFUl9SRUZFUkVOQ0U7XG4gICAgICAgICAgICB0aGlzLmRpY3RDcmVhdGUoZGF0YSwgY2FsbGJhY2ssIG9wdGlvbnMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5kaWN0VXBkYXRlKGRhdGEsIGNhbGxiYWNrLCBvcHRpb25zKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGxlYWRlclJlbW92ZShkYXRhOiBEaWN0aW9uYXJ5RGF0YSwgY2FsbGJhY2s6IEZ1bmN0aW9uLCBvcHRpb25zPzogYW55KSB7XG4gICAgICAgIHRoaXMuZGljdFJlbW92ZShkYXRhLCBjYWxsYmFjaywgb3B0aW9ucyk7XG4gICAgfVxufVxuIl19