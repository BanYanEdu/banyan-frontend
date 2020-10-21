/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { APP_ACTIVITY, APP_COMMENT, PINNEWS, Policy, PolicyIcon, PolicyValueAll, SHARE_COMPANY, SHARE_FRIEND, SHARE_ME, SHARE_PUBLISH, SocialTag } from './model/Config';
import { CoreService, HtmlUtils, HttpClientService, WebSocketClientService } from 'inet-core';
import { Subject } from "rxjs";
import { FrontViewService, PhotoSwipe, FileFormatService } from "inet-ui";
export class SocialService {
    /**
     * @param {?} httpClient
     * @param {?} coreService
     * @param {?} photoSwipe
     * @param {?} socketService
     * @param {?} fileFormatService
     * @param {?} frontViewService
     */
    constructor(httpClient, coreService, photoSwipe, socketService, fileFormatService, frontViewService) {
        this.httpClient = httpClient;
        this.coreService = coreService;
        this.photoSwipe = photoSwipe;
        this.socketService = socketService;
        this.fileFormatService = fileFormatService;
        this.frontViewService = frontViewService;
        this.viewDate = 'dd/MM/yyyy HH:mm';
        this.activityChange = new Subject();
        this.commentChange = new Subject();
        this._removeTags = [
            'link',
            'meta',
            'script',
            'style',
            'open-graph'
        ];
        // Receive activity notify real time
        this._socket = this.socketService.onMessage.subscribe((/**
         * @param {?} message
         * @return {?}
         */
        (message) => {
            /** @type {?} */
            const app = message.application;
            /** @type {?} */
            const activityID = message.message && message.message['msgID'];
            if (app === APP_ACTIVITY) {
                this.activityChange.next(activityID);
            }
            else if (app === APP_COMMENT) {
                this.commentChange.next(activityID);
            }
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._socket.unsubscribe();
    }
    /**
     * @param {?} callback
     * @return {?}
     */
    listGroups(callback) {
        return this.getJSON('social/member/category', null, (/**
         * @param {?} data
         * @param {?} err
         * @return {?}
         */
        (data, err) => {
            callback(data && data.elements || [], err);
        }));
    }
    /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    invitationReceiveList(params, callback) {
        return this.getJSON('social/invitation', params, callback);
    }
    /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    invitationSendList(params, callback) {
        return this.getJSON('social/invitation/mylist', params, callback);
    }
    /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    invitationRejectList(params, callback) {
        return this.getJSON('social/invitation/rejectedlist', params, callback);
    }
    /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    invitationCreate(params, callback) {
        return this.postJSON('social/invitation/create', params, callback);
    }
    /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    invitationDelete(params, callback) {
        return this.postJSON('social/invitation/delete', params, callback);
    }
    /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    invitationReject(params, callback) {
        return this.postJSON('social/invitation/rejected', params, callback);
    }
    /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    invitationAccept(params, callback) {
        return this.postJSON('social/invitation/accepted', params, callback);
    }
    /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    invitationSearch(params, callback) {
        return this.postJSON('social/member/search', params, callback);
    }
    /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    listFriends(params, callback) {
        return this.getJSON('social/member/list', params, (/**
         * @param {?} data
         * @param {?} err
         * @return {?}
         */
        (data, err) => {
            /** @type {?} */
            let members = data && data['items'] || [];
            members.total = data && data.total || 0;
            callback(members, err);
        }));
    }
    /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    groupMemberCreate(params, callback) {
        return this.postJSON('social/member/create', params, (/**
         * @param {?} data
         * @param {?} err
         * @return {?}
         */
        (data, err) => {
            callback(data, err);
        }));
    }
    /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    groupMemberDelete(params, callback) {
        return this.postJSON('social/member/delete', params, (/**
         * @param {?} data
         * @param {?} err
         * @return {?}
         */
        (data, err) => {
            callback(data, err);
        }));
    }
    /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    searchMember(params, callback) {
        this.coreService.searchFirmAccount(params, (/**
         * @param {?} data
         * @param {?} err
         * @return {?}
         */
        (data, err) => {
            /** @type {?} */
            let members = data && data['items'] || [];
            members.total = data && data.total || 0;
            callback(members, err);
        }));
    }
    /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    favoriteList(params, callback) {
        return this.postJSON('social/activity/favorite', params, (/**
         * @param {?} data
         * @param {?} err
         * @return {?}
         */
        (data, err) => {
            if (data && data['items']) {
                data['items'].forEach((/**
                 * @param {?} item
                 * @return {?}
                 */
                (item) => {
                    item._favorite = true;
                    this.indexActivity(item);
                }));
            }
            callback(data, err);
        }));
    }
    /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    activityWall(params, callback) {
        return this.getJSON('social/activity/wall', params, (/**
         * @param {?} data
         * @param {?} err
         * @return {?}
         */
        (data, err) => {
            if (data) {
                if (data['items']) {
                    data['items'].forEach(this.indexActivity.bind(this));
                }
            }
            callback(data, err);
        }));
    }
    /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    activityLoad(params, callback) {
        return this.getJSON('social/activity/load', params, (/**
         * @param {?} data
         * @param {?} error
         * @return {?}
         */
        (data, error) => {
            if (data) {
                this.indexActivity(data);
            }
            callback(data, error);
        }));
    }
    /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    activityPost(params, callback) {
        return this.postForm('social/activity/post', params, (/**
         * @param {?} data
         * @param {?} err
         * @return {?}
         */
        (data, err) => {
            if (data) {
                this.indexActivity(data);
            }
            callback(data, err);
        }));
    }
    /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    activityUpdate(params, callback) {
        return this.postForm('social/activity/update', params, (/**
         * @param {?} data
         * @param {?} err
         * @return {?}
         */
        (data, err) => {
            if (data) {
                this.indexActivity(data);
            }
            callback(data, err);
        }));
    }
    /**
     *
     * @param {?} params
     * {
     *    application: string
     *    contextID: string
     *    element: [{
     *      member: string
     *      display: string
     *      policy: "FRIEND"
     *    }]
     * }
     * @param {?} callback
     *
     * @return {?}
     */
    activityUpdateScope(params, callback) {
        return this.postForm('social/activity/scope', params, callback);
    }
    /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    activityRemove(params, callback) {
        return this.getJSON('social/activity/delete', params, callback);
    }
    /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    activityRemoveFile(params, callback) {
        return this.getJSON('social/activity/binaryremove', params, callback);
    }
    /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    activityLikeList(params, callback) {
        return this.getJSON('social/activity/likelist', params, callback);
    }
    /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    activityLike(params, callback) {
        return this.getJSON('social/activity/like', params, callback);
    }
    /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    activityUnLike(params, callback) {
        return this.getJSON('social/activity/unlike', params, callback);
    }
    /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    pollLoad(params, callback) {
        return this.getJSON('social/poll/load', params, callback);
    }
    /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    pollResult(params, callback) {
        return this.getJSON('social/poll/result', params, callback);
    }
    /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    pollVote(params, callback) {
        return this.getJSON('social/poll/vote', params, callback);
    }
    /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    pollPost(params, callback) {
        return this.postForm('social/activity/pollpost', params, callback);
    }
    /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    pollUpdate(params, callback) {
        return this.postForm('social/poll/update', params, callback);
    }
    /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    commentWall(params, callback) {
        return this.getJSON('social/comment/wall', params, (/**
         * @param {?} data
         * @param {?} err
         * @return {?}
         */
        (data, err) => {
            if (data && data['items']) {
                data['items'].forEach((/**
                 * @param {?} item
                 * @return {?}
                 */
                item => this.indexActivity(item)));
            }
            callback(data, err);
        }));
    }
    /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    commentPost(params, callback) {
        return this.postForm('social/comment/post', params, (/**
         * @param {?} data
         * @param {?} err
         * @return {?}
         */
        (data, err) => {
            if (data) {
                this.indexActivity(data);
            }
            callback(data, err);
        }));
    }
    /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    commentUpdate(params, callback) {
        return this.postForm('social/comment/update', params, (/**
         * @param {?} data
         * @param {?} err
         * @return {?}
         */
        (data, err) => {
            if (data) {
                this.indexActivity(data);
            }
            callback(data, err);
        }));
    }
    /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    commentRemove(params, callback) {
        return this.getJSON('social/comment/delete', params, callback);
    }
    /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    commentLike(params, callback) {
        return this.getJSON('social/comment/like', params, callback);
    }
    /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    commentUnLike(params, callback) {
        return this.getJSON('social/comment/unlike', params, callback);
    }
    // Download / View file
    /**
     * @param {?} params
     * @return {?}
     */
    activityDownLoadUrl(params) {
        return iNet.getPUrl('social/activity/download') + '?' + $.param(params);
    }
    /**
     * @param {?} params
     * @return {?}
     */
    activityViewUrl(params) {
        return iNet.getPUrl('social/activity/inlineview') + '?' + $.param(params);
    }
    /**
     * @param {?} params
     * @return {?}
     */
    activityViewOnlineUrl(params) {
        return iNet.getPUrl('unicorn/page/social/activity-viewer') + '?' + $.param(params);
    }
    /**
     * @param {?} params
     * @return {?}
     */
    commentDownLoadUrl(params) {
        return iNet.getPUrl('social/comment/download') + '?' + $.param(params);
    }
    /**
     * @param {?} params
     * @return {?}
     */
    commentViewUrl(params) {
        return iNet.getPUrl('social/comment/inlineview') + '?' + $.param(params);
    }
    /**
     * @param {?} params
     * @return {?}
     */
    commentViewOnlineUrl(params) {
        return iNet.getPUrl('unicorn/page/social/comment-viewer') + '?' + $.param(params);
    }
    /**
     * @param {?} application
     * @return {?}
     */
    isCommentApp(application) {
        return application === APP_COMMENT;
    }
    /**
     * @param {?} application
     * @return {?}
     */
    isActivityApp(application) {
        return application === APP_ACTIVITY;
    }
    /**
     * @param {?} attachment
     * @return {?}
     */
    viewAttachment(attachment) {
        if ((iNet.hasOnlineEditor && attachment.pathViewOnline) || attachment.pathViewPdf) {
            this.frontViewService.viewInline(attachment.pathViewOnline || attachment.pathViewPdf);
        }
        else {
            window.open(attachment.pathDownLoad, '_blank');
        }
    }
    /**
     * @param {?} images
     * @param {?=} options
     * @return {?}
     */
    viewImages(images, options) {
        this.photoSwipe.open(images, options);
    }
    /**
     * @param {?} attachments
     * @return {?}
     */
    attachmentToFiles(attachments) {
        /** @type {?} */
        const files = [];
        attachments.forEach((/**
         * @param {?} item
         * @return {?}
         */
        item => {
            files.push({
                name: item.file,
                type: item.mimetype,
                size: item.size,
                url: item.pathView,
                id: item.gridfsUUID,
                image: this.isImage(item.mimetype)
            });
        }));
        return files;
    }
    /**
     * @private
     * @param {?} url
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    getJSON(url, params, callback) {
        return this.httpClient.getJSON(iNet.getPUrl(url), params).subscribe(callback, (/**
         * @param {?} err
         * @return {?}
         */
        err => {
            callback(null, err);
        }));
    }
    /**
     * @private
     * @param {?} url
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    postJSON(url, params, callback) {
        return this.httpClient.postJSON(iNet.getPUrl(url), params).subscribe(callback, (/**
         * @param {?} err
         * @return {?}
         */
        err => {
            callback(null, err);
        }));
    }
    /**
     * @private
     * @param {?} url
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    postForm(url, params, callback) {
        return this.httpClient.post(iNet.getPUrl(url), this.buildFormData(params)).subscribe(callback, (/**
         * @param {?} err
         * @return {?}
         */
        err => {
            callback(null, err);
        }));
    }
    /**
     * @private
     * @param {?} data
     * @return {?}
     */
    buildFormData(data) {
        if (!data) {
            return;
        }
        /** @type {?} */
        const form = new FormData();
        Object.keys(data).forEach((/**
         * @param {?} k
         * @return {?}
         */
        k => {
            if (k === 'openGraph') {
                return;
            }
            if (k === 'message') {
                /** @type {?} */
                let message = this.secureMessageHtml(data[k]);
                // append open graph data on message
                if (data.openGraph) {
                    message += this.createOpenGraphMessage(data.openGraph);
                }
                form.append(k, message);
            }
            else {
                form.append(k, data[k]);
            }
        }));
        return form;
    }
    /**
     * @private
     * @param {?} activity
     * @return {?}
     */
    indexActivity(activity) {
        if (!activity || !activity.uuid) {
            return;
        }
        // Get full path
        if (activity.path) {
            activity.path = this.coreService.getSsoRedirect({
                url: activity.path,
                application: activity.application
            });
        }
        if (activity.mpath) {
            activity.mpath = this.coreService.getSsoRedirect({
                url: activity.mpath,
                application: activity.application
            });
        }
        activity.isCreator = activity.creator === iNet.username;
        activity._editable = activity.isCreator && !activity.path;
        activity._localNewsPin = activity.type === PINNEWS;
        this.formatMessageDisplay(activity);
        this._indexAttachments(activity);
        this.indexPolicies(activity);
    }
    /**
     * @private
     * @param {?} activity
     * @return {?}
     */
    _indexAttachments(activity) {
        activity.images = [];
        activity.files = [];
        activity.attachments.forEach((/**
         * @param {?} item
         * @return {?}
         */
        (item) => {
            /** @type {?} */
            let params = {
                binary: item.uuid
            };
            /** @type {?} */
            let isComment = activity.hasOwnProperty('activityID');
            if (isComment) {
                params.activity = activity.activityID;
                params.comment = activity.uuid;
                item.pathView = this.commentViewUrl(params);
                item.pathDownLoad = this.commentDownLoadUrl(params);
            }
            else {
                params.activity = activity.uuid;
                item.pathView = this.activityViewUrl(params);
                item.pathDownLoad = this.activityDownLoadUrl(params);
            }
            if (this.isImage(item.mimetype)) {
                activity.images.push(item);
            }
            else {
                if (this._isSupportViewOnline(item.file)) {
                    if (isComment) {
                        item.pathViewOnline = this.commentViewOnlineUrl(params);
                    }
                    else {
                        item.pathViewOnline = this.activityViewOnlineUrl(params);
                    }
                }
                if (this._isPdf(item.file)) {
                    item.pathViewPdf = item.pathView;
                }
                activity.files.push(item);
            }
        }));
    }
    /**
     * @private
     * @param {?} filename
     * @return {?}
     */
    _isSupportViewOnline(filename) {
        return this.fileFormatService.getEditFormats().indexOf(this._getExt(filename)) > -1;
    }
    /**
     * @private
     * @param {?} filename
     * @return {?}
     */
    _isPdf(filename) {
        return this._getExt(filename) === 'pdf';
    }
    /**
     * @private
     * @param {?} name
     * @return {?}
     */
    _getExt(name) {
        /** @type {?} */
        let temp = name.split('.');
        if (temp.length > 1) {
            return temp[temp.length - 1].toLowerCase();
        }
        else {
            return '';
        }
    }
    /**
     * @private
     * @param {?} activity
     * @return {?}
     */
    indexPolicies(activity) {
        activity._policies = [];
        if (activity.published) {
            // Publish
            activity._policies.push(SHARE_PUBLISH);
        }
        else {
            activity.policies.forEach((/**
             * @param {?} item
             * @return {?}
             */
            item => {
                if (item.inherit) {
                    return;
                }
                /** @type {?} */
                let policy = {
                    member: item.category,
                    display: item.display || item.category,
                    policy: item.policy
                };
                activity._policies.push(policy);
            }));
            activity._policies = this.splitPolicies(activity._policies);
            // Add icon
            activity._policies.forEach((/**
             * @param {?} item
             * @param {?} index
             * @return {?}
             */
            (item, index) => {
                if (!item.hasOwnProperty('icon')) {
                    activity._policies[index] = {
                        id: item.member,
                        display: item.display,
                        icon: this.getIconByType(item.policy),
                        value: [item]
                    };
                }
            }));
        }
        // Policies display
        if (activity._policies.length <= 4) {
            activity._policiesStr = '';
            activity._policies.forEach((/**
             * @param {?} item
             * @return {?}
             */
            item => {
                if (item === SHARE_ME) {
                    return;
                }
                activity._policiesStr += item.display + ', ';
            }));
            activity._policiesStr = activity._policiesStr.slice(0, -2);
        }
        else {
            activity._policiesStr = activity._policies[0].display;
            activity._policiesStr += ' và ' + (activity._policies.length - 2) + ' người khác';
        }
    }
    /**
     * @param {?} policy
     * @return {?}
     */
    getIconByType(policy) {
        switch (policy) {
            case Policy.Company:
                return PolicyIcon.Company;
            case Policy.Friend:
                return PolicyIcon.Friend;
            default:
                return '';
        }
    }
    /**
     * @private
     * @param {?} policies
     * @return {?}
     */
    splitPolicies(policies) {
        if (policies.length > 0) {
            /** @type {?} */
            let allCompany;
            /** @type {?} */
            let allFriend;
            for (let i = 0; i < policies.length; i++) {
                /** @type {?} */
                let item = policies[i];
                if (this.isAllFriend(item)) {
                    allFriend = item;
                }
                else if (this.isAllCompany(item)) {
                    allCompany = item;
                }
                else if (this.isOnlyMe(item)) {
                    policies[i] = SHARE_ME;
                }
            }
            if (allFriend) {
                policies[policies.indexOf(allFriend)] = SHARE_FRIEND;
            }
            else if (allCompany) {
                policies[policies.indexOf(allCompany)] = SHARE_COMPANY;
            }
        }
        return policies;
    }
    /**
     * @private
     * @param {?} policy
     * @return {?}
     */
    isAllCompany(policy) {
        return policy.display === Policy.Company &&
            policy.policy === Policy.Company;
    }
    /**
     * @private
     * @param {?} policy
     * @return {?}
     */
    isAllFriend(policy) {
        return policy.member === PolicyValueAll &&
            policy.policy === Policy.Friend;
    }
    /**
     * @private
     * @param {?} policy
     * @return {?}
     */
    isOnlyMe(policy) {
        return policy.member === iNet.username &&
            policy.policy === Policy.Individual;
    }
    /**
     * @private
     * @param {?} mimeType
     * @return {?}
     */
    isImage(mimeType) {
        return mimeType.indexOf('image') > -1;
    }
    /**
     * Remove html tag on message
     * @private
     * @param {?} message
     * @return {?}
     */
    secureMessageHtml(message) {
        /** @type {?} */
        const $el = $('<div>').html(message);
        $el.find(this._removeTags.join(',')).remove();
        return $el.text();
    }
    /**
     * Format message and open graph data to display
     * @private
     * @param {?} activity
     * @return {?}
     */
    formatMessageDisplay(activity) {
        // Get social data message
        /** @type {?} */
        let dataSocial = this.parseSocialDataMessage(activity);
        // Only get first item
        if (dataSocial[SocialTag.OpenGraph].length > 0) {
            activity._openGraph = dataSocial[SocialTag.OpenGraph][0];
        }
        if (dataSocial[SocialTag.LocalNews].length > 0) {
            activity._localNews = dataSocial[SocialTag.LocalNews][0];
            activity._localNews.url = activity.path;
        }
        // remove script and style
        /** @type {?} */
        let message = activity.message = this.secureMessageHtml(activity.message);
        // Beak line
        message = HtmlUtils.formatHtmlDisplay(message);
        // link
        message = message.replace(/(https?:\/\/[^\s]+)/g, (/**
         * @param {?} url
         * @return {?}
         */
        function (url) {
            return '<a href="' + url + '" target="_blank" rel="nofollow noopener">' + url + '</a>';
        }));
        activity._displayMessage = message;
    }
    /**
     * @param {?} openGraph
     * @return {?}
     */
    createOpenGraphMessage(openGraph) {
        /** @type {?} */
        let value = this.encodeBase64(JSON.stringify(this.convertLinks(openGraph)));
        return 'uri_message:link_preview:' + value;
    }
    /**
     * @param {?} data
     * @return {?}
     */
    convertLinks(data) {
        /** @type {?} */
        let param = {};
        param['title'] = data['title'];
        param['image'] = data['image'];
        param['description'] = data['description'];
        param['url'] = data['url'];
        param['finalUrl'] = data['site_name'].toUpperCase();
        return param;
    }
    /**
     * @param {?} str
     * @return {?}
     */
    encodeBase64(str) {
        return window.btoa(unescape(encodeURIComponent(str)));
    }
    /**
     * @param {?} localNews
     * @return {?}
     */
    createLocalNewsMessage(localNews) {
        return this._createTagMessage(SocialTag.LocalNews, localNews);
    }
    // parseSocialDataMessage(activity: SocialActivity | SocialComment): Object {
    //     let data = {};
    //     let $el = $('<div>').html(activity.message);
    //
    //     for (let tag in SocialTag) {
    //         let tagName = SocialTag[tag];
    //         data[tagName] = [];
    //         $el.find(tagName).each(function () {
    //             try {
    //                 data[tagName].push(JSON.parse(this.innerHTML));
    //             } catch (e) {
    //             }
    //
    //             // Remove tag after extract data
    //             this.remove();
    //         });
    //     }
    //
    //     // Apply message after extract data
    //     activity.message = $el.html();
    //
    //     return data;
    // }
    /**
     * @param {?} activity
     * @return {?}
     */
    parseSocialDataMessage(activity) {
        /** @type {?} */
        let data = {};
        for (let tag in SocialTag) {
            /** @type {?} */
            let tagName = SocialTag[tag];
            data[tagName] = [];
        }
        /** @type {?} */
        let message = activity.message;
        /** @type {?} */
        let index = message.indexOf("uri_message");
        if (index > -1) {
            message = message.substring(index);
            /** @type {?} */
            let typeMessages = message.split(":");
            if (typeMessages.length === 3) {
                if (typeMessages[0] === 'uri_message' && typeMessages[1] === 'link_preview') {
                    try {
                        /** @type {?} */
                        let __messageLink = JSON.parse(this.decodeBase64(typeMessages[2]));
                        data[SocialTag.OpenGraph].push(__messageLink);
                    }
                    catch (e) {
                    }
                }
            }
            // Apply message after extract data
            activity.message = activity.message.substring(0, index);
        }
        return data;
    }
    /**
     * @param {?} str
     * @return {?}
     */
    decodeBase64(str) {
        return decodeURIComponent(escape(window.atob(str)));
    }
    /**
     * @private
     * @param {?} tagName
     * @param {?} data
     * @return {?}
     */
    _createTagMessage(tagName, data) {
        /** @type {?} */
        let tag = document.createElement(tagName);
        tag.innerText = JSON.stringify(data);
        tag.style.display = 'none';
        tag.hidden = true;
        return tag.outerHTML;
    }
}
SocialService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
SocialService.ctorParameters = () => [
    { type: HttpClientService },
    { type: CoreService },
    { type: PhotoSwipe },
    { type: WebSocketClientService },
    { type: FileFormatService },
    { type: FrontViewService }
];
if (false) {
    /** @type {?} */
    SocialService.prototype.viewDate;
    /** @type {?} */
    SocialService.prototype.activityChange;
    /** @type {?} */
    SocialService.prototype.commentChange;
    /**
     * @type {?}
     * @private
     */
    SocialService.prototype._removeTags;
    /**
     * @type {?}
     * @private
     */
    SocialService.prototype._socket;
    /**
     * @type {?}
     * @private
     */
    SocialService.prototype.httpClient;
    /**
     * @type {?}
     * @private
     */
    SocialService.prototype.coreService;
    /**
     * @type {?}
     * @private
     */
    SocialService.prototype.photoSwipe;
    /**
     * @type {?}
     * @private
     */
    SocialService.prototype.socketService;
    /**
     * @type {?}
     * @private
     */
    SocialService.prototype.fileFormatService;
    /**
     * @type {?}
     * @private
     */
    SocialService.prototype.frontViewService;
}
/**
 * @record
 */
export function FavoriteParams() { }
if (false) {
    /** @type {?} */
    FavoriteParams.prototype.activity;
    /** @type {?|undefined} */
    FavoriteParams.prototype.remove;
}
/**
 * @record
 */
export function BinaryParams() { }
if (false) {
    /** @type {?} */
    BinaryParams.prototype.binary;
    /** @type {?|undefined} */
    BinaryParams.prototype.activity;
    /** @type {?|undefined} */
    BinaryParams.prototype.comment;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29jaWFsLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbmV0LXNvY2lhbC8iLCJzb3VyY2VzIjpbInNyYy9zb2NpYWwuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBWSxNQUFNLGVBQWUsQ0FBQztBQUtwRCxPQUFPLEVBQ0gsWUFBWSxFQUFFLFdBQVcsRUFDekIsT0FBTyxFQUNQLE1BQU0sRUFBRSxVQUFVLEVBQUUsY0FBYyxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUN6RSxhQUFhLEVBQUUsU0FBUyxFQUMzQixNQUFNLGdCQUFnQixDQUFDO0FBR3hCLE9BQU8sRUFBQyxXQUFXLEVBQUUsU0FBUyxFQUFFLGlCQUFpQixFQUFFLHNCQUFzQixFQUFjLE1BQU0sV0FBVyxDQUFDO0FBQ3pHLE9BQU8sRUFBQyxPQUFPLEVBQWUsTUFBTSxNQUFNLENBQUM7QUFDM0MsT0FBTyxFQUFDLGdCQUFnQixFQUFTLFVBQVUsRUFBRSxpQkFBaUIsRUFBQyxNQUFNLFNBQVMsQ0FBQztBQU0vRSxNQUFNLE9BQU8sYUFBYTs7Ozs7Ozs7O0lBaUJ0QixZQUNZLFVBQTZCLEVBQzdCLFdBQXdCLEVBQ3hCLFVBQXNCLEVBQ3RCLGFBQXFDLEVBQ3JDLGlCQUFvQyxFQUNwQyxnQkFBa0M7UUFMbEMsZUFBVSxHQUFWLFVBQVUsQ0FBbUI7UUFDN0IsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixrQkFBYSxHQUFiLGFBQWEsQ0FBd0I7UUFDckMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBckI5QyxhQUFRLEdBQVcsa0JBQWtCLENBQUM7UUFFdEMsbUJBQWMsR0FBRyxJQUFJLE9BQU8sRUFBVSxDQUFDO1FBQ3ZDLGtCQUFhLEdBQUcsSUFBSSxPQUFPLEVBQVUsQ0FBQztRQUU5QixnQkFBVyxH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Q3pDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyQyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFDM0IsR0FBRyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDbEIsT0FBTyxHQUFHLENBQUMsU0FBUyxDQUFDO0lBQ3pCLENBQUM7OztZQXJyQkosVUFBVTs7OztZQVBxQixpQkFBaUI7WUFBekMsV0FBVztZQUVjLFVBQVU7WUFGUSxzQkFBc0I7WUFFNUIsaUJBQWlCO1lBQXRELGdCQUFnQjs7OztJQVFwQixpQ0FBc0M7O0lBRXRDLHVDQUF1Qzs7SUFDdkMsc0NBQXNDOzs7OztJQUV0QyxvQ0FNRTs7Ozs7SUFFRixnQ0FBOEI7Ozs7O0lBRzFCLG1DQUFxQzs7Ozs7SUFDckMsb0NBQWdDOzs7OztJQUNoQyxtQ0FBOEI7Ozs7O0lBQzlCLHNDQUE2Qzs7Ozs7SUFDN0MsMENBQTRDOzs7OztJQUM1Qyx5Q0FBMEM7Ozs7O0FBZ3FCbEQsb0NBR0M7OztJQUZHLGtDQUFpQjs7SUFDakIsZ0NBQWlCOzs7OztBQUdyQixrQ0FJQzs7O0lBSEcsOEJBQWU7O0lBQ2YsZ0NBQWtCOztJQUNsQiwrQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGUsIE9uRGVzdHJveX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1NvY2lhbEFjdGl2aXR5fSBmcm9tICcuL21vZGVsL0FjdGl2aXR5JztcbmltcG9ydCB7QWN0aXZpdHlQYXJhbXN9IGZyb20gJy4vbW9kZWwvQWN0aXZpdHlQYXJhbXMnO1xuaW1wb3J0IHtBdHRhY2htZW50fSBmcm9tICcuL21vZGVsL0F0dGFjaG1lbnQnO1xuaW1wb3J0IHtMaWtlUGFyYW1zfSBmcm9tICcuL21vZGVsL0xpa2VQYXJhbXMnO1xuaW1wb3J0IHtcbiAgICBBUFBfQUNUSVZJVFksIEFQUF9DT01NRU5ULFxuICAgIFBJTk5FV1MsXG4gICAgUG9saWN5LCBQb2xpY3lJY29uLCBQb2xpY3lWYWx1ZUFsbCwgU0hBUkVfQ09NUEFOWSwgU0hBUkVfRlJJRU5ELCBTSEFSRV9NRSxcbiAgICBTSEFSRV9QVUJMSVNILCBTb2NpYWxUYWdcbn0gZnJvbSAnLi9tb2RlbC9Db25maWcnO1xuaW1wb3J0IHtJbnZpdGF0aW9uUGFyYW1zfSBmcm9tICcuL21vZGVsL0ludml0YXRpb25QYXJhbXMnO1xuaW1wb3J0IHtTb2NpYWxDb21tZW50fSBmcm9tICcuL21vZGVsL0NvbW1lbnQnO1xuaW1wb3J0IHtDb3JlU2VydmljZSwgSHRtbFV0aWxzLCBIdHRwQ2xpZW50U2VydmljZSwgV2ViU29ja2V0Q2xpZW50U2VydmljZSwgRW52ZWxvcEJvZHl9IGZyb20gJ2luZXQtY29yZSc7XG5pbXBvcnQge1N1YmplY3QsIFN1YnNjcmlwdGlvbn0gZnJvbSBcInJ4anNcIjtcbmltcG9ydCB7RnJvbnRWaWV3U2VydmljZSwgUGhvdG8sIFBob3RvU3dpcGUsIEZpbGVGb3JtYXRTZXJ2aWNlfSBmcm9tIFwiaW5ldC11aVwiO1xuXG5kZWNsYXJlIGxldCBpTmV0OiBhbnk7XG5kZWNsYXJlIGxldCAkOiBhbnk7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTb2NpYWxTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICAgIHZpZXdEYXRlOiBzdHJpbmcgPSAnZGQvTU0veXl5eSBISDptbSc7XG5cbiAgICBhY3Rpdml0eUNoYW5nZSA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcbiAgICBjb21tZW50Q2hhbmdlID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xuXG4gICAgcHJpdmF0ZSBfcmVtb3ZlVGFncyA9IFtcbiAgICAgICAgJ2xpbmsnLFxuICAgICAgICAnbWV0YScsXG4gICAgICAgICdzY3JpcHQnLFxuICAgICAgICAnc3R5bGUnLFxuICAgICAgICAnb3Blbi1ncmFwaCdcbiAgICBdO1xuXG4gICAgcHJpdmF0ZSBfc29ja2V0OiBTdWJzY3JpcHRpb247XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBodHRwQ2xpZW50OiBIdHRwQ2xpZW50U2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBjb3JlU2VydmljZTogQ29yZVNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgcGhvdG9Td2lwZTogUGhvdG9Td2lwZSxcbiAgICAgICAgcHJpdmF0ZSBzb2NrZXRTZXJ2aWNlOiBXZWJTb2NrZXRDbGllbnRTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGZpbGVGb3JtYXRTZXJ2aWNlOiBGaWxlRm9ybWF0U2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBmcm9udFZpZXdTZXJ2aWNlOiBGcm9udFZpZXdTZXJ2aWNlXG4gICAgKSB7XG4gICAgICAgIC8vIFJlY2VpdmUgYWN0aXZpdHkgbm90aWZ5IHJlYWwgdGltZVxuICAgICAgICB0aGlzLl9zb2NrZXQgPSB0aGlzLnNvY2tldFNlcnZpY2Uub25NZXNzYWdlLnN1YnNjcmliZSgobWVzc2FnZTogRW52ZWxvcEJvZHkpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGFwcCA9IG1lc3NhZ2UuYXBwbGljYXRpb247XG4gICAgICAgICAgICBjb25zdCBhY3Rpdml0eUlEID0gbWVzc2FnZS5tZXNzYWdlICYmIG1lc3NhZ2UubWVzc2FnZVsnbXNnSUQnXTtcbiAgICAgICAgICAgIGlmIChhcHAgPT09IEFQUF9BQ1RJVklUWSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZpdHlDaGFuZ2UubmV4dChhY3Rpdml0eUlEKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYXBwID09PSBBUFBfQ09NTUVOVCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29tbWVudENoYW5nZS5uZXh0KGFjdGl2aXR5SUQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5fc29ja2V0LnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG5cbiAgICBsaXN0R3JvdXBzKGNhbGxiYWNrOiBhbnkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0SlNPTignc29jaWFsL21lbWJlci9jYXRlZ29yeScsIG51bGwsIChkYXRhLCBlcnIpID0+IHtcbiAgICAgICAgICAgIGNhbGxiYWNrKGRhdGEgJiYgZGF0YS5lbGVtZW50cyB8fCBbXSwgZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaW52aXRhdGlvblJlY2VpdmVMaXN0KHBhcmFtcywgY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0SlNPTignc29jaWFsL2ludml0YXRpb24nLCBwYXJhbXMsIGNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICBpbnZpdGF0aW9uU2VuZExpc3QocGFyYW1zLCBjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRKU09OKCdzb2NpYWwvaW52aXRhdGlvbi9teWxpc3QnLCBwYXJhbXMsIGNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICBpbnZpdGF0aW9uUmVqZWN0TGlzdChwYXJhbXMsIGNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEpTT04oJ3NvY2lhbC9pbnZpdGF0aW9uL3JlamVjdGVkbGlzdCcsIHBhcmFtcywgY2FsbGJhY2spO1xuICAgIH1cblxuICAgIGludml0YXRpb25DcmVhdGUocGFyYW1zOiBJbnZpdGF0aW9uUGFyYW1zLCBjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gdGhpcy5wb3N0SlNPTignc29jaWFsL2ludml0YXRpb24vY3JlYXRlJywgcGFyYW1zLCBjYWxsYmFjayk7XG4gICAgfVxuXG4gICAgaW52aXRhdGlvbkRlbGV0ZShwYXJhbXM6IEludml0YXRpb25QYXJhbXMsIGNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBvc3RKU09OKCdzb2NpYWwvaW52aXRhdGlvbi9kZWxldGUnLCBwYXJhbXMsIGNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICBpbnZpdGF0aW9uUmVqZWN0KHBhcmFtczogSW52aXRhdGlvblBhcmFtcywgY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zdEpTT04oJ3NvY2lhbC9pbnZpdGF0aW9uL3JlamVjdGVkJywgcGFyYW1zLCBjYWxsYmFjayk7XG4gICAgfVxuXG4gICAgaW52aXRhdGlvbkFjY2VwdChwYXJhbXM6IEludml0YXRpb25QYXJhbXMsIGNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBvc3RKU09OKCdzb2NpYWwvaW52aXRhdGlvbi9hY2NlcHRlZCcsIHBhcmFtcywgY2FsbGJhY2spO1xuICAgIH1cblxuICAgIGludml0YXRpb25TZWFyY2gocGFyYW1zLCBjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gdGhpcy5wb3N0SlNPTignc29jaWFsL21lbWJlci9zZWFyY2gnLCBwYXJhbXMsIGNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICBsaXN0RnJpZW5kcyhwYXJhbXMsIGNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEpTT04oJ3NvY2lhbC9tZW1iZXIvbGlzdCcsIHBhcmFtcywgKGRhdGEsIGVycikgPT4ge1xuICAgICAgICAgICAgbGV0IG1lbWJlcnMgPSBkYXRhICYmIGRhdGFbJ2l0ZW1zJ10gfHwgW107XG4gICAgICAgICAgICBtZW1iZXJzLnRvdGFsID0gZGF0YSAmJiBkYXRhLnRvdGFsIHx8IDA7XG4gICAgICAgICAgICBjYWxsYmFjayhtZW1iZXJzLCBlcnIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBncm91cE1lbWJlckNyZWF0ZShwYXJhbXMsIGNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBvc3RKU09OKCdzb2NpYWwvbWVtYmVyL2NyZWF0ZScsIHBhcmFtcywgKGRhdGEsIGVycikgPT4ge1xuICAgICAgICAgICAgY2FsbGJhY2soZGF0YSwgZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ3JvdXBNZW1iZXJEZWxldGUocGFyYW1zLCBjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gdGhpcy5wb3N0SlNPTignc29jaWFsL21lbWJlci9kZWxldGUnLCBwYXJhbXMsIChkYXRhLCBlcnIpID0+IHtcbiAgICAgICAgICAgIGNhbGxiYWNrKGRhdGEsIGVycik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNlYXJjaE1lbWJlcihwYXJhbXMsIGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMuY29yZVNlcnZpY2Uuc2VhcmNoRmlybUFjY291bnQocGFyYW1zLCAoZGF0YSwgZXJyKSA9PiB7XG4gICAgICAgICAgICBsZXQgbWVtYmVycyA9IGRhdGEgJiYgZGF0YVsnaXRlbXMnXSB8fCBbXTtcbiAgICAgICAgICAgIG1lbWJlcnMudG90YWwgPSBkYXRhICYmIGRhdGEudG90YWwgfHwgMDtcbiAgICAgICAgICAgIGNhbGxiYWNrKG1lbWJlcnMsIGVycik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZhdm9yaXRlTGlzdChwYXJhbXMsIGNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBvc3RKU09OKCdzb2NpYWwvYWN0aXZpdHkvZmF2b3JpdGUnLCBwYXJhbXMsIChkYXRhLCBlcnIpID0+IHtcbiAgICAgICAgICAgIGlmIChkYXRhICYmIGRhdGFbJ2l0ZW1zJ10pIHtcbiAgICAgICAgICAgICAgICBkYXRhWydpdGVtcyddLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5fZmF2b3JpdGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluZGV4QWN0aXZpdHkoaXRlbSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYWxsYmFjayhkYXRhLCBlcnIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBhY3Rpdml0eVdhbGwocGFyYW1zOiBBY3Rpdml0eVBhcmFtcywgY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0SlNPTignc29jaWFsL2FjdGl2aXR5L3dhbGwnLCBwYXJhbXMsXG4gICAgICAgICAgICAoZGF0YSwgZXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGFbJ2l0ZW1zJ10pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFbJ2l0ZW1zJ10uZm9yRWFjaCh0aGlzLmluZGV4QWN0aXZpdHkuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soZGF0YSwgZXJyKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGFjdGl2aXR5TG9hZChwYXJhbXMsIGNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEpTT04oJ3NvY2lhbC9hY3Rpdml0eS9sb2FkJywgcGFyYW1zLCAoZGF0YTogU29jaWFsQWN0aXZpdHksIGVycm9yKSA9PiB7XG4gICAgICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5kZXhBY3Rpdml0eShkYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhbGxiYWNrKGRhdGEsIGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYWN0aXZpdHlQb3N0KHBhcmFtcywgY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zdEZvcm0oJ3NvY2lhbC9hY3Rpdml0eS9wb3N0JywgcGFyYW1zLCAoZGF0YSwgZXJyKSA9PiB7XG4gICAgICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5kZXhBY3Rpdml0eShkYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhbGxiYWNrKGRhdGEsIGVycik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGFjdGl2aXR5VXBkYXRlKHBhcmFtcywgY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zdEZvcm0oJ3NvY2lhbC9hY3Rpdml0eS91cGRhdGUnLCBwYXJhbXMsIChkYXRhLCBlcnIpID0+IHtcbiAgICAgICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbmRleEFjdGl2aXR5KGRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FsbGJhY2soZGF0YSwgZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcGFyYW1zXG4gICAgICoge1xuICAgICAqICAgIGFwcGxpY2F0aW9uOiBzdHJpbmdcbiAgICAgKiAgICBjb250ZXh0SUQ6IHN0cmluZ1xuICAgICAqICAgIGVsZW1lbnQ6IFt7XG4gICAgICogICAgICBtZW1iZXI6IHN0cmluZ1xuICAgICAqICAgICAgZGlzcGxheTogc3RyaW5nXG4gICAgICogICAgICBwb2xpY3k6IFwiRlJJRU5EXCJcbiAgICAgKiAgICB9XVxuICAgICAqIH1cbiAgICAgKiBAcGFyYW0gY2FsbGJhY2tcbiAgICAgKlxuICAgICAqL1xuICAgIGFjdGl2aXR5VXBkYXRlU2NvcGUocGFyYW1zLCBjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gdGhpcy5wb3N0Rm9ybSgnc29jaWFsL2FjdGl2aXR5L3Njb3BlJywgcGFyYW1zLCBjYWxsYmFjayk7XG4gICAgfVxuXG4gICAgYWN0aXZpdHlSZW1vdmUocGFyYW1zLCBjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRKU09OKCdzb2NpYWwvYWN0aXZpdHkvZGVsZXRlJywgcGFyYW1zLCBjYWxsYmFjayk7XG4gICAgfVxuXG4gICAgYWN0aXZpdHlSZW1vdmVGaWxlKHBhcmFtcywgY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0SlNPTignc29jaWFsL2FjdGl2aXR5L2JpbmFyeXJlbW92ZScsIHBhcmFtcywgY2FsbGJhY2spO1xuICAgIH1cblxuICAgIGFjdGl2aXR5TGlrZUxpc3QocGFyYW1zLCBjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRKU09OKCdzb2NpYWwvYWN0aXZpdHkvbGlrZWxpc3QnLCBwYXJhbXMsIGNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICBhY3Rpdml0eUxpa2UocGFyYW1zOiBMaWtlUGFyYW1zLCBjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRKU09OKCdzb2NpYWwvYWN0aXZpdHkvbGlrZScsIHBhcmFtcywgY2FsbGJhY2spO1xuICAgIH1cblxuICAgIGFjdGl2aXR5VW5MaWtlKHBhcmFtczogTGlrZVBhcmFtcywgY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0SlNPTignc29jaWFsL2FjdGl2aXR5L3VubGlrZScsIHBhcmFtcywgY2FsbGJhY2spO1xuICAgIH1cblxuICAgIHBvbGxMb2FkKHBhcmFtcywgY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0SlNPTignc29jaWFsL3BvbGwvbG9hZCcsIHBhcmFtcywgY2FsbGJhY2spO1xuICAgIH1cblxuICAgIHBvbGxSZXN1bHQocGFyYW1zLCBjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRKU09OKCdzb2NpYWwvcG9sbC9yZXN1bHQnLCBwYXJhbXMsIGNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICBwb2xsVm90ZShwYXJhbXMsIGNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEpTT04oJ3NvY2lhbC9wb2xsL3ZvdGUnLCBwYXJhbXMsIGNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICBwb2xsUG9zdChwYXJhbXMsIGNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBvc3RGb3JtKCdzb2NpYWwvYWN0aXZpdHkvcG9sbHBvc3QnLCBwYXJhbXMsIGNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICBwb2xsVXBkYXRlKHBhcmFtcywgY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zdEZvcm0oJ3NvY2lhbC9wb2xsL3VwZGF0ZScsIHBhcmFtcywgY2FsbGJhY2spO1xuICAgIH1cblxuICAgIGNvbW1lbnRXYWxsKHBhcmFtcywgY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0SlNPTignc29jaWFsL2NvbW1lbnQvd2FsbCcsIHBhcmFtcywgKGRhdGEsIGVycikgPT4ge1xuICAgICAgICAgICAgaWYgKGRhdGEgJiYgZGF0YVsnaXRlbXMnXSkge1xuICAgICAgICAgICAgICAgIGRhdGFbJ2l0ZW1zJ10uZm9yRWFjaChpdGVtID0+IHRoaXMuaW5kZXhBY3Rpdml0eShpdGVtKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYWxsYmFjayhkYXRhLCBlcnIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjb21tZW50UG9zdChwYXJhbXMsIGNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBvc3RGb3JtKCdzb2NpYWwvY29tbWVudC9wb3N0JywgcGFyYW1zLCAoZGF0YSwgZXJyKSA9PiB7XG4gICAgICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5kZXhBY3Rpdml0eShkYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhbGxiYWNrKGRhdGEsIGVycik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbW1lbnRVcGRhdGUocGFyYW1zLCBjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gdGhpcy5wb3N0Rm9ybSgnc29jaWFsL2NvbW1lbnQvdXBkYXRlJywgcGFyYW1zLCAoZGF0YSwgZXJyKSA9PiB7XG4gICAgICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5kZXhBY3Rpdml0eShkYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhbGxiYWNrKGRhdGEsIGVycik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbW1lbnRSZW1vdmUocGFyYW1zLCBjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRKU09OKCdzb2NpYWwvY29tbWVudC9kZWxldGUnLCBwYXJhbXMsIGNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICBjb21tZW50TGlrZShwYXJhbXM6IExpa2VQYXJhbXMsIGNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEpTT04oJ3NvY2lhbC9jb21tZW50L2xpa2UnLCBwYXJhbXMsIGNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICBjb21tZW50VW5MaWtlKHBhcmFtczogTGlrZVBhcmFtcywgY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0SlNPTignc29jaWFsL2NvbW1lbnQvdW5saWtlJywgcGFyYW1zLCBjYWxsYmFjayk7XG4gICAgfVxuXG5cbiAgICAvLyBEb3dubG9hZCAvIFZpZXcgZmlsZVxuXG4gICAgYWN0aXZpdHlEb3duTG9hZFVybChwYXJhbXM6IEJpbmFyeVBhcmFtcyk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBpTmV0LmdldFBVcmwoJ3NvY2lhbC9hY3Rpdml0eS9kb3dubG9hZCcpICsgJz8nICsgJC5wYXJhbShwYXJhbXMpO1xuICAgIH1cblxuICAgIGFjdGl2aXR5Vmlld1VybChwYXJhbXM6IEJpbmFyeVBhcmFtcyk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBpTmV0LmdldFBVcmwoJ3NvY2lhbC9hY3Rpdml0eS9pbmxpbmV2aWV3JykgKyAnPycgKyAkLnBhcmFtKHBhcmFtcyk7XG4gICAgfVxuXG4gICAgYWN0aXZpdHlWaWV3T25saW5lVXJsKHBhcmFtczogQmluYXJ5UGFyYW1zKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGlOZXQuZ2V0UFVybCgndW5pY29ybi9wYWdlL3NvY2lhbC9hY3Rpdml0eS12aWV3ZXInKSArICc/JyArICQucGFyYW0ocGFyYW1zKTtcbiAgICB9XG5cbiAgICBjb21tZW50RG93bkxvYWRVcmwocGFyYW1zOiBCaW5hcnlQYXJhbXMpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gaU5ldC5nZXRQVXJsKCdzb2NpYWwvY29tbWVudC9kb3dubG9hZCcpICsgJz8nICsgJC5wYXJhbShwYXJhbXMpO1xuICAgIH1cblxuICAgIGNvbW1lbnRWaWV3VXJsKHBhcmFtczogQmluYXJ5UGFyYW1zKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGlOZXQuZ2V0UFVybCgnc29jaWFsL2NvbW1lbnQvaW5saW5ldmlldycpICsgJz8nICsgJC5wYXJhbShwYXJhbXMpO1xuICAgIH1cblxuICAgIGNvbW1lbnRWaWV3T25saW5lVXJsKHBhcmFtczogQmluYXJ5UGFyYW1zKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGlOZXQuZ2V0UFVybCgndW5pY29ybi9wYWdlL3NvY2lhbC9jb21tZW50LXZpZXdlcicpICsgJz8nICsgJC5wYXJhbShwYXJhbXMpO1xuICAgIH1cblxuICAgIGlzQ29tbWVudEFwcChhcHBsaWNhdGlvbjogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBhcHBsaWNhdGlvbiA9PT0gQVBQX0NPTU1FTlQ7XG4gICAgfVxuXG4gICAgaXNBY3Rpdml0eUFwcChhcHBsaWNhdGlvbjogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBhcHBsaWNhdGlvbiA9PT0gQVBQX0FDVElWSVRZO1xuICAgIH1cblxuICAgIHZpZXdBdHRhY2htZW50KGF0dGFjaG1lbnQ6IEF0dGFjaG1lbnQpIHtcbiAgICAgICAgaWYgKChpTmV0Lmhhc09ubGluZUVkaXRvciAmJiBhdHRhY2htZW50LnBhdGhWaWV3T25saW5lKSB8fCBhdHRhY2htZW50LnBhdGhWaWV3UGRmKSB7XG4gICAgICAgICAgICB0aGlzLmZyb250Vmlld1NlcnZpY2Uudmlld0lubGluZShhdHRhY2htZW50LnBhdGhWaWV3T25saW5lIHx8IGF0dGFjaG1lbnQucGF0aFZpZXdQZGYpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgd2luZG93Lm9wZW4oYXR0YWNobWVudC5wYXRoRG93bkxvYWQsICdfYmxhbmsnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZpZXdJbWFnZXMoaW1hZ2VzOiBQaG90b1tdLCBvcHRpb25zPzogYW55KSB7XG4gICAgICAgIHRoaXMucGhvdG9Td2lwZS5vcGVuKGltYWdlcywgb3B0aW9ucyk7XG4gICAgfVxuXG5cbiAgICBhdHRhY2htZW50VG9GaWxlcyhhdHRhY2htZW50czogQXR0YWNobWVudFtdKSB7XG4gICAgICAgIGNvbnN0IGZpbGVzID0gW107XG4gICAgICAgIGF0dGFjaG1lbnRzLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICBmaWxlcy5wdXNoKHtcbiAgICAgICAgICAgICAgICBuYW1lOiBpdGVtLmZpbGUsXG4gICAgICAgICAgICAgICAgdHlwZTogaXRlbS5taW1ldHlwZSxcbiAgICAgICAgICAgICAgICBzaXplOiBpdGVtLnNpemUsXG4gICAgICAgICAgICAgICAgdXJsOiBpdGVtLnBhdGhWaWV3LFxuICAgICAgICAgICAgICAgIGlkOiBpdGVtLmdyaWRmc1VVSUQsXG4gICAgICAgICAgICAgICAgaW1hZ2U6IHRoaXMuaXNJbWFnZShpdGVtLm1pbWV0eXBlKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZmlsZXM7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRKU09OKHVybDogc3RyaW5nLCBwYXJhbXM6IGFueSwgY2FsbGJhY2s6IGFueSk6IFN1YnNjcmlwdGlvbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBDbGllbnQuZ2V0SlNPTihpTmV0LmdldFBVcmwodXJsKSwgcGFyYW1zKS5zdWJzY3JpYmUoXG4gICAgICAgICAgICBjYWxsYmFjayxcbiAgICAgICAgICAgIGVyciA9PiB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sobnVsbCwgZXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHBvc3RKU09OKHVybDogc3RyaW5nLCBwYXJhbXM6IGFueSwgY2FsbGJhY2s6IGFueSk6IFN1YnNjcmlwdGlvbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBDbGllbnQucG9zdEpTT04oaU5ldC5nZXRQVXJsKHVybCksIHBhcmFtcykuc3Vic2NyaWJlKFxuICAgICAgICAgICAgY2FsbGJhY2ssXG4gICAgICAgICAgICBlcnIgPT4ge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwsIGVycik7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwb3N0Rm9ybSh1cmw6IHN0cmluZywgcGFyYW1zOiBhbnksIGNhbGxiYWNrOiBhbnkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cENsaWVudC5wb3N0KGlOZXQuZ2V0UFVybCh1cmwpLCB0aGlzLmJ1aWxkRm9ybURhdGEocGFyYW1zKSkuc3Vic2NyaWJlKFxuICAgICAgICAgICAgY2FsbGJhY2ssXG4gICAgICAgICAgICBlcnIgPT4ge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwsIGVycik7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBidWlsZEZvcm1EYXRhKGRhdGEpIHtcbiAgICAgICAgaWYgKCFkYXRhKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBmb3JtID0gbmV3IEZvcm1EYXRhKCk7XG5cbiAgICAgICAgT2JqZWN0LmtleXMoZGF0YSkuZm9yRWFjaChrID0+IHtcbiAgICAgICAgICAgIGlmIChrID09PSAnb3BlbkdyYXBoJykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChrID09PSAnbWVzc2FnZScpIHtcbiAgICAgICAgICAgICAgICBsZXQgbWVzc2FnZSA9IHRoaXMuc2VjdXJlTWVzc2FnZUh0bWwoZGF0YVtrXSk7XG5cbiAgICAgICAgICAgICAgICAvLyBhcHBlbmQgb3BlbiBncmFwaCBkYXRhIG9uIG1lc3NhZ2VcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5vcGVuR3JhcGgpIHtcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZSArPSB0aGlzLmNyZWF0ZU9wZW5HcmFwaE1lc3NhZ2UoZGF0YS5vcGVuR3JhcGgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGZvcm0uYXBwZW5kKGssIG1lc3NhZ2UpO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGZvcm0uYXBwZW5kKGssIGRhdGFba10pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZm9ybTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluZGV4QWN0aXZpdHkoYWN0aXZpdHk6IFNvY2lhbEFjdGl2aXR5IHwgU29jaWFsQ29tbWVudCkge1xuXG4gICAgICAgIGlmICghYWN0aXZpdHkgfHwgIWFjdGl2aXR5LnV1aWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEdldCBmdWxsIHBhdGhcbiAgICAgICAgaWYgKGFjdGl2aXR5LnBhdGgpIHtcbiAgICAgICAgICAgIGFjdGl2aXR5LnBhdGggPSB0aGlzLmNvcmVTZXJ2aWNlLmdldFNzb1JlZGlyZWN0KHtcbiAgICAgICAgICAgICAgICB1cmw6IGFjdGl2aXR5LnBhdGgsXG4gICAgICAgICAgICAgICAgYXBwbGljYXRpb246IGFjdGl2aXR5LmFwcGxpY2F0aW9uXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYWN0aXZpdHkubXBhdGgpIHtcbiAgICAgICAgICAgIGFjdGl2aXR5Lm1wYXRoID0gdGhpcy5jb3JlU2VydmljZS5nZXRTc29SZWRpcmVjdCh7XG4gICAgICAgICAgICAgICAgdXJsOiBhY3Rpdml0eS5tcGF0aCxcbiAgICAgICAgICAgICAgICBhcHBsaWNhdGlvbjogYWN0aXZpdHkuYXBwbGljYXRpb25cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgYWN0aXZpdHkuaXNDcmVhdG9yID0gYWN0aXZpdHkuY3JlYXRvciA9PT0gaU5ldC51c2VybmFtZTtcbiAgICAgICAgYWN0aXZpdHkuX2VkaXRhYmxlID0gYWN0aXZpdHkuaXNDcmVhdG9yICYmICFhY3Rpdml0eS5wYXRoO1xuICAgICAgICBhY3Rpdml0eS5fbG9jYWxOZXdzUGluID0gYWN0aXZpdHkudHlwZSA9PT0gUElOTkVXUztcblxuICAgICAgICB0aGlzLmZvcm1hdE1lc3NhZ2VEaXNwbGF5KGFjdGl2aXR5KTtcbiAgICAgICAgdGhpcy5faW5kZXhBdHRhY2htZW50cyhhY3Rpdml0eSk7XG4gICAgICAgIHRoaXMuaW5kZXhQb2xpY2llcyhhY3Rpdml0eSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaW5kZXhBdHRhY2htZW50cyhhY3Rpdml0eSkge1xuICAgICAgICBhY3Rpdml0eS5pbWFnZXMgPSBbXTtcbiAgICAgICAgYWN0aXZpdHkuZmlsZXMgPSBbXTtcbiAgICAgICAgYWN0aXZpdHkuYXR0YWNobWVudHMuZm9yRWFjaCgoaXRlbTogQXR0YWNobWVudCkgPT4ge1xuICAgICAgICAgICAgbGV0IHBhcmFtczogYW55ID0ge1xuICAgICAgICAgICAgICAgIGJpbmFyeTogaXRlbS51dWlkXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgbGV0IGlzQ29tbWVudCA9IGFjdGl2aXR5Lmhhc093blByb3BlcnR5KCdhY3Rpdml0eUlEJyk7XG4gICAgICAgICAgICBpZiAoaXNDb21tZW50KSB7XG4gICAgICAgICAgICAgICAgcGFyYW1zLmFjdGl2aXR5ID0gYWN0aXZpdHkuYWN0aXZpdHlJRDtcbiAgICAgICAgICAgICAgICBwYXJhbXMuY29tbWVudCA9IGFjdGl2aXR5LnV1aWQ7XG4gICAgICAgICAgICAgICAgaXRlbS5wYXRoVmlldyA9IHRoaXMuY29tbWVudFZpZXdVcmwocGFyYW1zKTtcbiAgICAgICAgICAgICAgICBpdGVtLnBhdGhEb3duTG9hZCA9IHRoaXMuY29tbWVudERvd25Mb2FkVXJsKHBhcmFtcyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHBhcmFtcy5hY3Rpdml0eSA9IGFjdGl2aXR5LnV1aWQ7XG4gICAgICAgICAgICAgICAgaXRlbS5wYXRoVmlldyA9IHRoaXMuYWN0aXZpdHlWaWV3VXJsKHBhcmFtcyk7XG4gICAgICAgICAgICAgICAgaXRlbS5wYXRoRG93bkxvYWQgPSB0aGlzLmFjdGl2aXR5RG93bkxvYWRVcmwocGFyYW1zKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuaXNJbWFnZShpdGVtLm1pbWV0eXBlKSkge1xuICAgICAgICAgICAgICAgIGFjdGl2aXR5LmltYWdlcy5wdXNoKGl0ZW0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9pc1N1cHBvcnRWaWV3T25saW5lKGl0ZW0uZmlsZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzQ29tbWVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5wYXRoVmlld09ubGluZSA9IHRoaXMuY29tbWVudFZpZXdPbmxpbmVVcmwocGFyYW1zKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0ucGF0aFZpZXdPbmxpbmUgPSB0aGlzLmFjdGl2aXR5Vmlld09ubGluZVVybChwYXJhbXMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2lzUGRmKGl0ZW0uZmlsZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5wYXRoVmlld1BkZiA9IGl0ZW0ucGF0aFZpZXc7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYWN0aXZpdHkuZmlsZXMucHVzaChpdGVtKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9pc1N1cHBvcnRWaWV3T25saW5lKGZpbGVuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmlsZUZvcm1hdFNlcnZpY2UuZ2V0RWRpdEZvcm1hdHMoKS5pbmRleE9mKHRoaXMuX2dldEV4dChmaWxlbmFtZSkpID4gLTE7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaXNQZGYoZmlsZW5hbWU6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0RXh0KGZpbGVuYW1lKSA9PT0gJ3BkZic7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZ2V0RXh0KG5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIGxldCB0ZW1wID0gbmFtZS5zcGxpdCgnLicpO1xuICAgICAgICBpZiAodGVtcC5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICByZXR1cm4gdGVtcFt0ZW1wLmxlbmd0aCAtIDFdLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGluZGV4UG9saWNpZXMoYWN0aXZpdHkpIHtcbiAgICAgICAgYWN0aXZpdHkuX3BvbGljaWVzID0gW107XG5cbiAgICAgICAgaWYgKGFjdGl2aXR5LnB1Ymxpc2hlZCkge1xuICAgICAgICAgICAgLy8gUHVibGlzaFxuICAgICAgICAgICAgYWN0aXZpdHkuX3BvbGljaWVzLnB1c2goU0hBUkVfUFVCTElTSCk7XG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIGFjdGl2aXR5LnBvbGljaWVzLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uaW5oZXJpdCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxldCBwb2xpY3kgPSB7XG4gICAgICAgICAgICAgICAgICAgIG1lbWJlcjogaXRlbS5jYXRlZ29yeSxcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogaXRlbS5kaXNwbGF5IHx8IGl0ZW0uY2F0ZWdvcnksXG4gICAgICAgICAgICAgICAgICAgIHBvbGljeTogaXRlbS5wb2xpY3lcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGFjdGl2aXR5Ll9wb2xpY2llcy5wdXNoKHBvbGljeSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgYWN0aXZpdHkuX3BvbGljaWVzID0gdGhpcy5zcGxpdFBvbGljaWVzKGFjdGl2aXR5Ll9wb2xpY2llcyk7XG5cbiAgICAgICAgICAgIC8vIEFkZCBpY29uXG4gICAgICAgICAgICBhY3Rpdml0eS5fcG9saWNpZXMuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIWl0ZW0uaGFzT3duUHJvcGVydHkoJ2ljb24nKSkge1xuICAgICAgICAgICAgICAgICAgICBhY3Rpdml0eS5fcG9saWNpZXNbaW5kZXhdID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IGl0ZW0ubWVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogaXRlbS5kaXNwbGF5LFxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogdGhpcy5nZXRJY29uQnlUeXBlKGl0ZW0ucG9saWN5KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBbaXRlbV1cbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFBvbGljaWVzIGRpc3BsYXlcbiAgICAgICAgaWYgKGFjdGl2aXR5Ll9wb2xpY2llcy5sZW5ndGggPD0gNCkge1xuICAgICAgICAgICAgYWN0aXZpdHkuX3BvbGljaWVzU3RyID0gJyc7XG4gICAgICAgICAgICBhY3Rpdml0eS5fcG9saWNpZXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbSA9PT0gU0hBUkVfTUUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBhY3Rpdml0eS5fcG9saWNpZXNTdHIgKz0gaXRlbS5kaXNwbGF5ICsgJywgJztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgYWN0aXZpdHkuX3BvbGljaWVzU3RyID0gYWN0aXZpdHkuX3BvbGljaWVzU3RyLnNsaWNlKDAsIC0yKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFjdGl2aXR5Ll9wb2xpY2llc1N0ciA9IGFjdGl2aXR5Ll9wb2xpY2llc1swXS5kaXNwbGF5O1xuICAgICAgICAgICAgYWN0aXZpdHkuX3BvbGljaWVzU3RyICs9ICcgdsOgICcgKyAoYWN0aXZpdHkuX3BvbGljaWVzLmxlbmd0aCAtIDIpICsgJyBuZ8aw4budaSBraMOhYyc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRJY29uQnlUeXBlKHBvbGljeTogc3RyaW5nKSB7XG4gICAgICAgIHN3aXRjaCAocG9saWN5KSB7XG4gICAgICAgICAgICBjYXNlIFBvbGljeS5Db21wYW55OlxuICAgICAgICAgICAgICAgIHJldHVybiBQb2xpY3lJY29uLkNvbXBhbnk7XG4gICAgICAgICAgICBjYXNlIFBvbGljeS5GcmllbmQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFBvbGljeUljb24uRnJpZW5kO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHNwbGl0UG9saWNpZXMocG9saWNpZXMpIHtcbiAgICAgICAgaWYgKHBvbGljaWVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGxldCBhbGxDb21wYW55LCBhbGxGcmllbmQ7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcG9saWNpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IHBvbGljaWVzW2ldO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzQWxsRnJpZW5kKGl0ZW0pKSB7XG4gICAgICAgICAgICAgICAgICAgIGFsbEZyaWVuZCA9IGl0ZW07XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlzQWxsQ29tcGFueShpdGVtKSkge1xuICAgICAgICAgICAgICAgICAgICBhbGxDb21wYW55ID0gaXRlbTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaXNPbmx5TWUoaXRlbSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcG9saWNpZXNbaV0gPSBTSEFSRV9NRTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChhbGxGcmllbmQpIHtcbiAgICAgICAgICAgICAgICBwb2xpY2llc1twb2xpY2llcy5pbmRleE9mKGFsbEZyaWVuZCldID0gU0hBUkVfRlJJRU5EO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChhbGxDb21wYW55KSB7XG4gICAgICAgICAgICAgICAgcG9saWNpZXNbcG9saWNpZXMuaW5kZXhPZihhbGxDb21wYW55KV0gPSBTSEFSRV9DT01QQU5ZO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwb2xpY2llcztcbiAgICB9XG5cbiAgICBwcml2YXRlIGlzQWxsQ29tcGFueShwb2xpY3kpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHBvbGljeS5kaXNwbGF5ID09PSBQb2xpY3kuQ29tcGFueSAmJlxuICAgICAgICAgICAgcG9saWN5LnBvbGljeSA9PT0gUG9saWN5LkNvbXBhbnk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc0FsbEZyaWVuZChwb2xpY3kpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHBvbGljeS5tZW1iZXIgPT09IFBvbGljeVZhbHVlQWxsICYmXG4gICAgICAgICAgICBwb2xpY3kucG9saWN5ID09PSBQb2xpY3kuRnJpZW5kO1xuICAgIH1cblxuICAgIHByaXZhdGUgaXNPbmx5TWUocG9saWN5KTogYm9vbGVhbiB7XG5cbiAgICAgICAgcmV0dXJuIHBvbGljeS5tZW1iZXIgPT09IGlOZXQudXNlcm5hbWUgJiZcbiAgICAgICAgICAgIHBvbGljeS5wb2xpY3kgPT09IFBvbGljeS5JbmRpdmlkdWFsO1xuICAgIH1cblxuICAgIHByaXZhdGUgaXNJbWFnZShtaW1lVHlwZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBtaW1lVHlwZS5pbmRleE9mKCdpbWFnZScpID4gLTE7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlIGh0bWwgdGFnIG9uIG1lc3NhZ2VcbiAgICAgKi9cbiAgICBwcml2YXRlIHNlY3VyZU1lc3NhZ2VIdG1sKG1lc3NhZ2U6IHN0cmluZykge1xuICAgICAgICBjb25zdCAkZWwgPSAkKCc8ZGl2PicpLmh0bWwobWVzc2FnZSk7XG4gICAgICAgICRlbC5maW5kKHRoaXMuX3JlbW92ZVRhZ3Muam9pbignLCcpKS5yZW1vdmUoKTtcbiAgICAgICAgcmV0dXJuICRlbC50ZXh0KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRm9ybWF0IG1lc3NhZ2UgYW5kIG9wZW4gZ3JhcGggZGF0YSB0byBkaXNwbGF5XG4gICAgICovXG4gICAgcHJpdmF0ZSBmb3JtYXRNZXNzYWdlRGlzcGxheShhY3Rpdml0eTogU29jaWFsQWN0aXZpdHkpIHtcblxuICAgICAgICAvLyBHZXQgc29jaWFsIGRhdGEgbWVzc2FnZVxuICAgICAgICBsZXQgZGF0YVNvY2lhbCA9IHRoaXMucGFyc2VTb2NpYWxEYXRhTWVzc2FnZShhY3Rpdml0eSk7XG5cbiAgICAgICAgLy8gT25seSBnZXQgZmlyc3QgaXRlbVxuICAgICAgICBpZiAoZGF0YVNvY2lhbFtTb2NpYWxUYWcuT3BlbkdyYXBoXS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBhY3Rpdml0eS5fb3BlbkdyYXBoID0gZGF0YVNvY2lhbFtTb2NpYWxUYWcuT3BlbkdyYXBoXVswXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YVNvY2lhbFtTb2NpYWxUYWcuTG9jYWxOZXdzXS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBhY3Rpdml0eS5fbG9jYWxOZXdzID0gZGF0YVNvY2lhbFtTb2NpYWxUYWcuTG9jYWxOZXdzXVswXTtcbiAgICAgICAgICAgIGFjdGl2aXR5Ll9sb2NhbE5ld3MudXJsID0gYWN0aXZpdHkucGF0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHJlbW92ZSBzY3JpcHQgYW5kIHN0eWxlXG4gICAgICAgIGxldCBtZXNzYWdlID0gYWN0aXZpdHkubWVzc2FnZSA9IHRoaXMuc2VjdXJlTWVzc2FnZUh0bWwoYWN0aXZpdHkubWVzc2FnZSk7XG5cbiAgICAgICAgLy8gQmVhayBsaW5lXG4gICAgICAgIG1lc3NhZ2UgPSBIdG1sVXRpbHMuZm9ybWF0SHRtbERpc3BsYXkobWVzc2FnZSk7XG5cbiAgICAgICAgLy8gbGlua1xuICAgICAgICBtZXNzYWdlID0gbWVzc2FnZS5yZXBsYWNlKC8oaHR0cHM/OlxcL1xcL1teXFxzXSspL2csIGZ1bmN0aW9uICh1cmwpIHtcbiAgICAgICAgICAgIHJldHVybiAnPGEgaHJlZj1cIicgKyB1cmwgKyAnXCIgdGFyZ2V0PVwiX2JsYW5rXCIgcmVsPVwibm9mb2xsb3cgbm9vcGVuZXJcIj4nICsgdXJsICsgJzwvYT4nO1xuICAgICAgICB9KTtcblxuICAgICAgICBhY3Rpdml0eS5fZGlzcGxheU1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgIH1cblxuICAgIGNyZWF0ZU9wZW5HcmFwaE1lc3NhZ2Uob3BlbkdyYXBoOiBPYmplY3QpOiBzdHJpbmcge1xuICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLmVuY29kZUJhc2U2NChKU09OLnN0cmluZ2lmeSh0aGlzLmNvbnZlcnRMaW5rcyhvcGVuR3JhcGgpKSlcbiAgICAgICAgcmV0dXJuICd1cmlfbWVzc2FnZTpsaW5rX3ByZXZpZXc6JyArIHZhbHVlO1xuICAgIH1cblxuICAgIGNvbnZlcnRMaW5rcyhkYXRhKSB7XG4gICAgICAgIGxldCBwYXJhbSA9IHt9O1xuICAgICAgICBwYXJhbVsndGl0bGUnXSA9IGRhdGFbJ3RpdGxlJ107XG4gICAgICAgIHBhcmFtWydpbWFnZSddID0gZGF0YVsnaW1hZ2UnXTtcbiAgICAgICAgcGFyYW1bJ2Rlc2NyaXB0aW9uJ10gPSBkYXRhWydkZXNjcmlwdGlvbiddO1xuICAgICAgICBwYXJhbVsndXJsJ10gPSBkYXRhWyd1cmwnXTtcbiAgICAgICAgcGFyYW1bJ2ZpbmFsVXJsJ10gPSBkYXRhWydzaXRlX25hbWUnXS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICByZXR1cm4gcGFyYW07XG4gICAgfVxuXG4gICAgZW5jb2RlQmFzZTY0KHN0cjogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB3aW5kb3cuYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoc3RyKSkpO1xuICAgIH1cblxuXG4gICAgY3JlYXRlTG9jYWxOZXdzTWVzc2FnZShsb2NhbE5ld3M6IE9iamVjdCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jcmVhdGVUYWdNZXNzYWdlKFNvY2lhbFRhZy5Mb2NhbE5ld3MsIGxvY2FsTmV3cyk7XG4gICAgfVxuXG4gICAgLy8gcGFyc2VTb2NpYWxEYXRhTWVzc2FnZShhY3Rpdml0eTogU29jaWFsQWN0aXZpdHkgfCBTb2NpYWxDb21tZW50KTogT2JqZWN0IHtcbiAgICAvLyAgICAgbGV0IGRhdGEgPSB7fTtcbiAgICAvLyAgICAgbGV0ICRlbCA9ICQoJzxkaXY+JykuaHRtbChhY3Rpdml0eS5tZXNzYWdlKTtcbiAgICAvL1xuICAgIC8vICAgICBmb3IgKGxldCB0YWcgaW4gU29jaWFsVGFnKSB7XG4gICAgLy8gICAgICAgICBsZXQgdGFnTmFtZSA9IFNvY2lhbFRhZ1t0YWddO1xuICAgIC8vICAgICAgICAgZGF0YVt0YWdOYW1lXSA9IFtdO1xuICAgIC8vICAgICAgICAgJGVsLmZpbmQodGFnTmFtZSkuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgLy8gICAgICAgICAgICAgdHJ5IHtcbiAgICAvLyAgICAgICAgICAgICAgICAgZGF0YVt0YWdOYW1lXS5wdXNoKEpTT04ucGFyc2UodGhpcy5pbm5lckhUTUwpKTtcbiAgICAvLyAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgLy8gICAgICAgICAgICAgfVxuICAgIC8vXG4gICAgLy8gICAgICAgICAgICAgLy8gUmVtb3ZlIHRhZyBhZnRlciBleHRyYWN0IGRhdGFcbiAgICAvLyAgICAgICAgICAgICB0aGlzLnJlbW92ZSgpO1xuICAgIC8vICAgICAgICAgfSk7XG4gICAgLy8gICAgIH1cbiAgICAvL1xuICAgIC8vICAgICAvLyBBcHBseSBtZXNzYWdlIGFmdGVyIGV4dHJhY3QgZGF0YVxuICAgIC8vICAgICBhY3Rpdml0eS5tZXNzYWdlID0gJGVsLmh0bWwoKTtcbiAgICAvL1xuICAgIC8vICAgICByZXR1cm4gZGF0YTtcbiAgICAvLyB9XG4gICAgcGFyc2VTb2NpYWxEYXRhTWVzc2FnZShhY3Rpdml0eTogU29jaWFsQWN0aXZpdHkgfCBTb2NpYWxDb21tZW50KTogT2JqZWN0IHtcbiAgICAgICAgbGV0IGRhdGEgPSB7fTtcbiAgICAgICAgZm9yIChsZXQgdGFnIGluIFNvY2lhbFRhZykge1xuICAgICAgICAgICAgbGV0IHRhZ05hbWUgPSBTb2NpYWxUYWdbdGFnXTtcbiAgICAgICAgICAgIGRhdGFbdGFnTmFtZV0gPSBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBtZXNzYWdlID0gYWN0aXZpdHkubWVzc2FnZTtcbiAgICAgICAgbGV0IGluZGV4ID0gbWVzc2FnZS5pbmRleE9mKFwidXJpX21lc3NhZ2VcIik7XG4gICAgICAgIGlmKGluZGV4ID4gLTEpe1xuICAgICAgICAgICAgbWVzc2FnZSA9IG1lc3NhZ2Uuc3Vic3RyaW5nKGluZGV4KTtcbiAgICAgICAgICAgIGxldCB0eXBlTWVzc2FnZXMgPSBtZXNzYWdlLnNwbGl0KFwiOlwiKTtcbiAgICAgICAgICAgIGlmKHR5cGVNZXNzYWdlcy5sZW5ndGggPT09IDMpe1xuICAgICAgICAgICAgICAgIGlmICh0eXBlTWVzc2FnZXNbMF0gPT09ICd1cmlfbWVzc2FnZScgJiYgdHlwZU1lc3NhZ2VzWzFdID09PSAnbGlua19wcmV2aWV3Jykge1xuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IF9fbWVzc2FnZUxpbmsgPSBKU09OLnBhcnNlKHRoaXMuZGVjb2RlQmFzZTY0KHR5cGVNZXNzYWdlc1syXSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVtTb2NpYWxUYWcuT3BlbkdyYXBoXS5wdXNoKF9fbWVzc2FnZUxpbmsgKTtcbiAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBBcHBseSBtZXNzYWdlIGFmdGVyIGV4dHJhY3QgZGF0YVxuICAgICAgICAgICAgYWN0aXZpdHkubWVzc2FnZSA9IGFjdGl2aXR5Lm1lc3NhZ2Uuc3Vic3RyaW5nKDAsaW5kZXgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cbiAgICBkZWNvZGVCYXNlNjQoc3RyOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChlc2NhcGUod2luZG93LmF0b2Ioc3RyKSkpO1xuICAgIH1cbiAgICBwcml2YXRlIF9jcmVhdGVUYWdNZXNzYWdlKHRhZ05hbWU6IHN0cmluZywgZGF0YTogT2JqZWN0KTogc3RyaW5nIHtcbiAgICAgICAgbGV0IHRhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnTmFtZSk7XG4gICAgICAgIHRhZy5pbm5lclRleHQgPSBKU09OLnN0cmluZ2lmeShkYXRhKTtcbiAgICAgICAgdGFnLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIHRhZy5oaWRkZW4gPSB0cnVlO1xuICAgICAgICByZXR1cm4gdGFnLm91dGVySFRNTDtcbiAgICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmF2b3JpdGVQYXJhbXMge1xuICAgIGFjdGl2aXR5OiBzdHJpbmc7XG4gICAgcmVtb3ZlPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBCaW5hcnlQYXJhbXMge1xuICAgIGJpbmFyeTogc3RyaW5nO1xuICAgIGFjdGl2aXR5Pzogc3RyaW5nO1xuICAgIGNvbW1lbnQ/OiBzdHJpbmc7XG59XG4iXX0=