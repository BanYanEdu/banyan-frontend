/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { APP_ACTIVITY, APP_COMMENT, PINNEWS, Policy, PolicyIcon, PolicyValueAll, SHARE_COMPANY, SHARE_FRIEND, SHARE_ME, SHARE_PUBLISH, SocialTag } from './model/Config';
import { CoreService, HtmlUtils, HttpClientService, WebSocketClientService } from 'inet-core';
import { Subject } from "rxjs";
import { FrontViewService, PhotoSwipe, FileFormatService } from "inet-ui";
var SocialService = /** @class */ (function () {
    function SocialService(httpClient, coreService, photoSwipe, socketService, fileFormatService, frontViewService) {
        var _this = this;
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
        function (message) {
            /** @type {?} */
            var app = message.application;
            /** @type {?} */
            var activityID = message.message && message.message['msgID'];
            if (app === APP_ACTIVITY) {
                _this.activityChange.next(activityID);
            }
            else if (app === APP_COMMENT) {
                _this.commentChange.next(activityID);
            }
        }));
    }
    /**
     * @return {?}
     */
    SocialService.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._socket.unsubscribe();
    };
    /**
     * @param {?} callback
     * @return {?}
     */
    SocialService.prototype.listGroups = /**
     * @param {?} callback
     * @return {?}
     */
    function (callback) {
        return this.getJSON('social/member/category', null, (/**
         * @param {?} data
         * @param {?} err
         * @return {?}
         */
        function (data, err) {
            callback(data && data.elements || [], err);
        }));
    };
    /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    SocialService.prototype.invitationReceiveList = /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    function (params, callback) {
        return this.getJSON('social/invitation', params, callback);
    };
    /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    SocialService.prototype.invitationSendList = /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    function (params, callback) {
        return this.getJSON('social/invitation/mylist', params, callback);
    };
    /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    SocialService.prototype.invitationRejectList = /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    function (params, callback) {
        return this.getJSON('social/invitation/rejectedlist', params, callback);
    };
    /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    SocialService.prototype.invitationCreate = /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    function (params, callback) {
        return this.postJSON('social/invitation/create', params, callback);
    };
    /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    SocialService.prototype.invitationDelete = /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    function (params, callback) {
        return this.postJSON('social/invitation/delete', params, callback);
    };
    /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    SocialService.prototype.invitationReject = /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    function (params, callback) {
        return this.postJSON('social/invitation/rejected', params, callback);
    };
    /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    SocialService.prototype.invitationAccept = /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    function (params, callback) {
        return this.postJSON('social/invitation/accepted', params, callback);
    };
    /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    SocialService.prototype.invitationSearch = /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    function (params, callback) {
        return this.postJSON('social/member/search', params, callback);
    };
    /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    SocialService.prototype.listFriends = /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    function (params, callback) {
        return this.getJSON('social/member/list', params, (/**
         * @param {?} data
         * @param {?} err
         * @return {?}
         */
        function (data, err) {
            /** @type {?} */
            var members = data && data['items'] || [];
            members.total = data && data.total || 0;
            callback(members, err);
        }));
    };
    /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    SocialService.prototype.groupMemberCreate = /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    function (params, callback) {
        return this.postJSON('social/member/create', params, (/**
         * @param {?} data
         * @param {?} err
         * @return {?}
         */
        function (data, err) {
            callback(data, err);
        }));
    };
    /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    SocialService.prototype.groupMemberDelete = /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    function (params, callback) {
        return this.postJSON('social/member/delete', params, (/**
         * @param {?} data
         * @param {?} err
         * @return {?}
         */
        function (data, err) {
            callback(data, err);
        }));
    };
    /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    SocialService.prototype.searchMember = /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    function (params, callback) {
        this.coreService.searchFirmAccount(params, (/**
         * @param {?} data
         * @param {?} err
         * @return {?}
         */
        function (data, err) {
            /** @type {?} */
            var members = data && data['items'] || [];
            members.total = data && data.total || 0;
            callback(members, err);
        }));
    };
    /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    SocialService.prototype.favoriteList = /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    function (params, callback) {
        var _this = this;
        return this.postJSON('social/activity/favorite', params, (/**
         * @param {?} data
         * @param {?} err
         * @return {?}
         */
        function (data, err) {
            if (data && data['items']) {
                data['items'].forEach((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) {
                    item._favorite = true;
                    _this.indexActivity(item);
                }));
            }
            callback(data, err);
        }));
    };
    /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    SocialService.prototype.activityWall = /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    function (params, callback) {
        var _this = this;
        return this.getJSON('social/activity/wall', params, (/**
         * @param {?} data
         * @param {?} err
         * @return {?}
         */
        function (data, err) {
            if (data) {
                if (data['items']) {
                    data['items'].forEach(_this.indexActivity.bind(_this));
                }
            }
            callback(data, err);
        }));
    };
    /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    SocialService.prototype.activityLoad = /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    function (params, callback) {
        var _this = this;
        return this.getJSON('social/activity/load', params, (/**
         * @param {?} data
         * @param {?} error
         * @return {?}
         */
        function (data, error) {
            if (data) {
                _this.indexActivity(data);
            }
            callback(data, error);
        }));
    };
    /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    SocialService.prototype.activityPost = /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    function (params, callback) {
        var _this = this;
        return this.postForm('social/activity/post', params, (/**
         * @param {?} data
         * @param {?} err
         * @return {?}
         */
        function (data, err) {
            if (data) {
                _this.indexActivity(data);
            }
            callback(data, err);
        }));
    };
    /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    SocialService.prototype.activityUpdate = /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    function (params, callback) {
        var _this = this;
        return this.postForm('social/activity/update', params, (/**
         * @param {?} data
         * @param {?} err
         * @return {?}
         */
        function (data, err) {
            if (data) {
                _this.indexActivity(data);
            }
            callback(data, err);
        }));
    };
    /**
     *
     * @param params
     * {
     *    application: string
     *    contextID: string
     *    element: [{
     *      member: string
     *      display: string
     *      policy: "FRIEND"
     *    }]
     * }
     * @param callback
     *
     */
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
    SocialService.prototype.activityUpdateScope = /**
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
    function (params, callback) {
        return this.postForm('social/activity/scope', params, callback);
    };
    /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    SocialService.prototype.activityRemove = /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    function (params, callback) {
        return this.getJSON('social/activity/delete', params, callback);
    };
    /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    SocialService.prototype.activityRemoveFile = /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    function (params, callback) {
        return this.getJSON('social/activity/binaryremove', params, callback);
    };
    /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    SocialService.prototype.activityLikeList = /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    function (params, callback) {
        return this.getJSON('social/activity/likelist', params, callback);
    };
    /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    SocialService.prototype.activityLike = /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    function (params, callback) {
        return this.getJSON('social/activity/like', params, callback);
    };
    /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    SocialService.prototype.activityUnLike = /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    function (params, callback) {
        return this.getJSON('social/activity/unlike', params, callback);
    };
    /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    SocialService.prototype.pollLoad = /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    function (params, callback) {
        return this.getJSON('social/poll/load', params, callback);
    };
    /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    SocialService.prototype.pollResult = /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    function (params, callback) {
        return this.getJSON('social/poll/result', params, callback);
    };
    /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    SocialService.prototype.pollVote = /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    function (params, callback) {
        return this.getJSON('social/poll/vote', params, callback);
    };
    /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    SocialService.prototype.pollPost = /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    function (params, callback) {
        return this.postForm('social/activity/pollpost', params, callback);
    };
    /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    SocialService.prototype.pollUpdate = /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    function (params, callback) {
        return this.postForm('social/poll/update', params, callback);
    };
    /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    SocialService.prototype.commentWall = /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    function (params, callback) {
        var _this = this;
        return this.getJSON('social/comment/wall', params, (/**
         * @param {?} data
         * @param {?} err
         * @return {?}
         */
        function (data, err) {
            if (data && data['items']) {
                data['items'].forEach((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) { return _this.indexActivity(item); }));
            }
            callback(data, err);
        }));
    };
    /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    SocialService.prototype.commentPost = /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    function (params, callback) {
        var _this = this;
        return this.postForm('social/comment/post', params, (/**
         * @param {?} data
         * @param {?} err
         * @return {?}
         */
        function (data, err) {
            if (data) {
                _this.indexActivity(data);
            }
            callback(data, err);
        }));
    };
    /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    SocialService.prototype.commentUpdate = /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    function (params, callback) {
        var _this = this;
        return this.postForm('social/comment/update', params, (/**
         * @param {?} data
         * @param {?} err
         * @return {?}
         */
        function (data, err) {
            if (data) {
                _this.indexActivity(data);
            }
            callback(data, err);
        }));
    };
    /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    SocialService.prototype.commentRemove = /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    function (params, callback) {
        return this.getJSON('social/comment/delete', params, callback);
    };
    /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    SocialService.prototype.commentLike = /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    function (params, callback) {
        return this.getJSON('social/comment/like', params, callback);
    };
    /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    SocialService.prototype.commentUnLike = /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    function (params, callback) {
        return this.getJSON('social/comment/unlike', params, callback);
    };
    // Download / View file
    // Download / View file
    /**
     * @param {?} params
     * @return {?}
     */
    SocialService.prototype.activityDownLoadUrl = 
    // Download / View file
    /**
     * @param {?} params
     * @return {?}
     */
    function (params) {
        return iNet.getPUrl('social/activity/download') + '?' + $.param(params);
    };
    /**
     * @param {?} params
     * @return {?}
     */
    SocialService.prototype.activityViewUrl = /**
     * @param {?} params
     * @return {?}
     */
    function (params) {
        return iNet.getPUrl('social/activity/inlineview') + '?' + $.param(params);
    };
    /**
     * @param {?} params
     * @return {?}
     */
    SocialService.prototype.activityViewOnlineUrl = /**
     * @param {?} params
     * @return {?}
     */
    function (params) {
        return iNet.getPUrl('unicorn/page/social/activity-viewer') + '?' + $.param(params);
    };
    /**
     * @param {?} params
     * @return {?}
     */
    SocialService.prototype.commentDownLoadUrl = /**
     * @param {?} params
     * @return {?}
     */
    function (params) {
        return iNet.getPUrl('social/comment/download') + '?' + $.param(params);
    };
    /**
     * @param {?} params
     * @return {?}
     */
    SocialService.prototype.commentViewUrl = /**
     * @param {?} params
     * @return {?}
     */
    function (params) {
        return iNet.getPUrl('social/comment/inlineview') + '?' + $.param(params);
    };
    /**
     * @param {?} params
     * @return {?}
     */
    SocialService.prototype.commentViewOnlineUrl = /**
     * @param {?} params
     * @return {?}
     */
    function (params) {
        return iNet.getPUrl('unicorn/page/social/comment-viewer') + '?' + $.param(params);
    };
    /**
     * @param {?} application
     * @return {?}
     */
    SocialService.prototype.isCommentApp = /**
     * @param {?} application
     * @return {?}
     */
    function (application) {
        return application === APP_COMMENT;
    };
    /**
     * @param {?} application
     * @return {?}
     */
    SocialService.prototype.isActivityApp = /**
     * @param {?} application
     * @return {?}
     */
    function (application) {
        return application === APP_ACTIVITY;
    };
    /**
     * @param {?} attachment
     * @return {?}
     */
    SocialService.prototype.viewAttachment = /**
     * @param {?} attachment
     * @return {?}
     */
    function (attachment) {
        if ((iNet.hasOnlineEditor && attachment.pathViewOnline) || attachment.pathViewPdf) {
            this.frontViewService.viewInline(attachment.pathViewOnline || attachment.pathViewPdf);
        }
        else {
            window.open(attachment.pathDownLoad, '_blank');
        }
    };
    /**
     * @param {?} images
     * @param {?=} options
     * @return {?}
     */
    SocialService.prototype.viewImages = /**
     * @param {?} images
     * @param {?=} options
     * @return {?}
     */
    function (images, options) {
        this.photoSwipe.open(images, options);
    };
    /**
     * @param {?} attachments
     * @return {?}
     */
    SocialService.prototype.attachmentToFiles = /**
     * @param {?} attachments
     * @return {?}
     */
    function (attachments) {
        var _this = this;
        /** @type {?} */
        var files = [];
        attachments.forEach((/**
         * @param {?} item
         * @return {?}
         */
        function (item) {
            files.push({
                name: item.file,
                type: item.mimetype,
                size: item.size,
                url: item.pathView,
                id: item.gridfsUUID,
                image: _this.isImage(item.mimetype)
            });
        }));
        return files;
    };
    /**
     * @private
     * @param {?} url
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    SocialService.prototype.getJSON = /**
     * @private
     * @param {?} url
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    function (url, params, callback) {
        return this.httpClient.getJSON(iNet.getPUrl(url), params).subscribe(callback, (/**
         * @param {?} err
         * @return {?}
         */
        function (err) {
            callback(null, err);
        }));
    };
    /**
     * @private
     * @param {?} url
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    SocialService.prototype.postJSON = /**
     * @private
     * @param {?} url
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    function (url, params, callback) {
        return this.httpClient.postJSON(iNet.getPUrl(url), params).subscribe(callback, (/**
         * @param {?} err
         * @return {?}
         */
        function (err) {
            callback(null, err);
        }));
    };
    /**
     * @private
     * @param {?} url
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    SocialService.prototype.postForm = /**
     * @private
     * @param {?} url
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    function (url, params, callback) {
        return this.httpClient.post(iNet.getPUrl(url), this.buildFormData(params)).subscribe(callback, (/**
         * @param {?} err
         * @return {?}
         */
        function (err) {
            callback(null, err);
        }));
    };
    /**
     * @private
     * @param {?} data
     * @return {?}
     */
    SocialService.prototype.buildFormData = /**
     * @private
     * @param {?} data
     * @return {?}
     */
    function (data) {
        var _this = this;
        if (!data) {
            return;
        }
        /** @type {?} */
        var form = new FormData();
        Object.keys(data).forEach((/**
         * @param {?} k
         * @return {?}
         */
        function (k) {
            if (k === 'openGraph') {
                return;
            }
            if (k === 'message') {
                /** @type {?} */
                var message = _this.secureMessageHtml(data[k]);
                // append open graph data on message
                if (data.openGraph) {
                    message += _this.createOpenGraphMessage(data.openGraph);
                }
                form.append(k, message);
            }
            else {
                form.append(k, data[k]);
            }
        }));
        return form;
    };
    /**
     * @private
     * @param {?} activity
     * @return {?}
     */
    SocialService.prototype.indexActivity = /**
     * @private
     * @param {?} activity
     * @return {?}
     */
    function (activity) {
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
    };
    /**
     * @private
     * @param {?} activity
     * @return {?}
     */
    SocialService.prototype._indexAttachments = /**
     * @private
     * @param {?} activity
     * @return {?}
     */
    function (activity) {
        var _this = this;
        activity.images = [];
        activity.files = [];
        activity.attachments.forEach((/**
         * @param {?} item
         * @return {?}
         */
        function (item) {
            /** @type {?} */
            var params = {
                binary: item.uuid
            };
            /** @type {?} */
            var isComment = activity.hasOwnProperty('activityID');
            if (isComment) {
                params.activity = activity.activityID;
                params.comment = activity.uuid;
                item.pathView = _this.commentViewUrl(params);
                item.pathDownLoad = _this.commentDownLoadUrl(params);
            }
            else {
                params.activity = activity.uuid;
                item.pathView = _this.activityViewUrl(params);
                item.pathDownLoad = _this.activityDownLoadUrl(params);
            }
            if (_this.isImage(item.mimetype)) {
                activity.images.push(item);
            }
            else {
                if (_this._isSupportViewOnline(item.file)) {
                    if (isComment) {
                        item.pathViewOnline = _this.commentViewOnlineUrl(params);
                    }
                    else {
                        item.pathViewOnline = _this.activityViewOnlineUrl(params);
                    }
                }
                if (_this._isPdf(item.file)) {
                    item.pathViewPdf = item.pathView;
                }
                activity.files.push(item);
            }
        }));
    };
    /**
     * @private
     * @param {?} filename
     * @return {?}
     */
    SocialService.prototype._isSupportViewOnline = /**
     * @private
     * @param {?} filename
     * @return {?}
     */
    function (filename) {
        return this.fileFormatService.getEditFormats().indexOf(this._getExt(filename)) > -1;
    };
    /**
     * @private
     * @param {?} filename
     * @return {?}
     */
    SocialService.prototype._isPdf = /**
     * @private
     * @param {?} filename
     * @return {?}
     */
    function (filename) {
        return this._getExt(filename) === 'pdf';
    };
    /**
     * @private
     * @param {?} name
     * @return {?}
     */
    SocialService.prototype._getExt = /**
     * @private
     * @param {?} name
     * @return {?}
     */
    function (name) {
        /** @type {?} */
        var temp = name.split('.');
        if (temp.length > 1) {
            return temp[temp.length - 1].toLowerCase();
        }
        else {
            return '';
        }
    };
    /**
     * @private
     * @param {?} activity
     * @return {?}
     */
    SocialService.prototype.indexPolicies = /**
     * @private
     * @param {?} activity
     * @return {?}
     */
    function (activity) {
        var _this = this;
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
            function (item) {
                if (item.inherit) {
                    return;
                }
                /** @type {?} */
                var policy = {
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
            function (item, index) {
                if (!item.hasOwnProperty('icon')) {
                    activity._policies[index] = {
                        id: item.member,
                        display: item.display,
                        icon: _this.getIconByType(item.policy),
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
            function (item) {
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
    };
    /**
     * @param {?} policy
     * @return {?}
     */
    SocialService.prototype.getIconByType = /**
     * @param {?} policy
     * @return {?}
     */
    function (policy) {
        switch (policy) {
            case Policy.Company:
                return PolicyIcon.Company;
            case Policy.Friend:
                return PolicyIcon.Friend;
            default:
                return '';
        }
    };
    /**
     * @private
     * @param {?} policies
     * @return {?}
     */
    SocialService.prototype.splitPolicies = /**
     * @private
     * @param {?} policies
     * @return {?}
     */
    function (policies) {
        if (policies.length > 0) {
            /** @type {?} */
            var allCompany = void 0;
            /** @type {?} */
            var allFriend = void 0;
            for (var i = 0; i < policies.length; i++) {
                /** @type {?} */
                var item = policies[i];
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
    };
    /**
     * @private
     * @param {?} policy
     * @return {?}
     */
    SocialService.prototype.isAllCompany = /**
     * @private
     * @param {?} policy
     * @return {?}
     */
    function (policy) {
        return policy.display === Policy.Company &&
            policy.policy === Policy.Company;
    };
    /**
     * @private
     * @param {?} policy
     * @return {?}
     */
    SocialService.prototype.isAllFriend = /**
     * @private
     * @param {?} policy
     * @return {?}
     */
    function (policy) {
        return policy.member === PolicyValueAll &&
            policy.policy === Policy.Friend;
    };
    /**
     * @private
     * @param {?} policy
     * @return {?}
     */
    SocialService.prototype.isOnlyMe = /**
     * @private
     * @param {?} policy
     * @return {?}
     */
    function (policy) {
        return policy.member === iNet.username &&
            policy.policy === Policy.Individual;
    };
    /**
     * @private
     * @param {?} mimeType
     * @return {?}
     */
    SocialService.prototype.isImage = /**
     * @private
     * @param {?} mimeType
     * @return {?}
     */
    function (mimeType) {
        return mimeType.indexOf('image') > -1;
    };
    /**
     * Remove html tag on message
     */
    /**
     * Remove html tag on message
     * @private
     * @param {?} message
     * @return {?}
     */
    SocialService.prototype.secureMessageHtml = /**
     * Remove html tag on message
     * @private
     * @param {?} message
     * @return {?}
     */
    function (message) {
        /** @type {?} */
        var $el = $('<div>').html(message);
        $el.find(this._removeTags.join(',')).remove();
        return $el.text();
    };
    /**
     * Format message and open graph data to display
     */
    /**
     * Format message and open graph data to display
     * @private
     * @param {?} activity
     * @return {?}
     */
    SocialService.prototype.formatMessageDisplay = /**
     * Format message and open graph data to display
     * @private
     * @param {?} activity
     * @return {?}
     */
    function (activity) {
        // Get social data message
        /** @type {?} */
        var dataSocial = this.parseSocialDataMessage(activity);
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
        var message = activity.message = this.secureMessageHtml(activity.message);
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
    };
    /**
     * @param {?} openGraph
     * @return {?}
     */
    SocialService.prototype.createOpenGraphMessage = /**
     * @param {?} openGraph
     * @return {?}
     */
    function (openGraph) {
        /** @type {?} */
        var value = this.encodeBase64(JSON.stringify(this.convertLinks(openGraph)));
        return 'uri_message:link_preview:' + value;
    };
    /**
     * @param {?} data
     * @return {?}
     */
    SocialService.prototype.convertLinks = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        /** @type {?} */
        var param = {};
        param['title'] = data['title'];
        param['image'] = data['image'];
        param['description'] = data['description'];
        param['url'] = data['url'];
        param['finalUrl'] = data['site_name'].toUpperCase();
        return param;
    };
    /**
     * @param {?} str
     * @return {?}
     */
    SocialService.prototype.encodeBase64 = /**
     * @param {?} str
     * @return {?}
     */
    function (str) {
        return window.btoa(unescape(encodeURIComponent(str)));
    };
    /**
     * @param {?} localNews
     * @return {?}
     */
    SocialService.prototype.createLocalNewsMessage = /**
     * @param {?} localNews
     * @return {?}
     */
    function (localNews) {
        return this._createTagMessage(SocialTag.LocalNews, localNews);
    };
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
    SocialService.prototype.parseSocialDataMessage = 
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
    function (activity) {
        /** @type {?} */
        var data = {};
        for (var tag in SocialTag) {
            /** @type {?} */
            var tagName = SocialTag[tag];
            data[tagName] = [];
        }
        /** @type {?} */
        var message = activity.message;
        /** @type {?} */
        var index = message.indexOf("uri_message");
        if (index > -1) {
            message = message.substring(index);
            /** @type {?} */
            var typeMessages = message.split(":");
            if (typeMessages.length === 3) {
                if (typeMessages[0] === 'uri_message' && typeMessages[1] === 'link_preview') {
                    try {
                        /** @type {?} */
                        var __messageLink = JSON.parse(this.decodeBase64(typeMessages[2]));
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
    };
    /**
     * @param {?} str
     * @return {?}
     */
    SocialService.prototype.decodeBase64 = /**
     * @param {?} str
     * @return {?}
     */
    function (str) {
        return decodeURIComponent(escape(window.atob(str)));
    };
    /**
     * @private
     * @param {?} tagName
     * @param {?} data
     * @return {?}
     */
    SocialService.prototype._createTagMessage = /**
     * @private
     * @param {?} tagName
     * @param {?} data
     * @return {?}
     */
    function (tagName, data) {
        /** @type {?} */
        var tag = document.createElement(tagName);
        tag.innerText = JSON.stringify(data);
        tag.style.display = 'none';
        tag.hidden = true;
        return tag.outerHTML;
    };
    SocialService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    SocialService.ctorParameters = function () { return [
        { type: HttpClientService },
        { type: CoreService },
        { type: PhotoSwipe },
        { type: WebSocketClientService },
        { type: FileFormatService },
        { type: FrontViewService }
    ]; };
    return SocialService;
}());
export { SocialService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29jaWFsLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbmV0LXNvY2lhbC8iLCJzb3VyY2VzIjpbInNyYy9zb2NpYWwuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBWSxNQUFNLGVBQWUsQ0FBQztBQUtwRCxPQUFPLEVBQ0gsWUFBWSxFQUFFLFdBQVcsRUFDekIsT0FBTyxFQUNQLE1BQU0sRUFBRSxVQUFVLEVBQUUsY0FBYyxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUN6RSxhQUFhLEVBQUUsU0FBUyxFQUMzQixNQUFNLGdCQUFnQixDQUFDO0FBR3hCLE9BQU8sRUFBQyxXQUFXLEVBQUUsU0FBUyxFQUFFLGlCQUFpQixFQUFFLHNCQUFzQixFQUFjLE1BQU0sV0FBVyxDQUFDO0FBQ3pHLE9BQU8sRUFBQyxPQUFPLEVBQWUsTUFBTSxNQUFNLENBQUM7QUFDM0MsT0FBTyxFQUFDLGdCQUFnQixFQUFTLFVBQVUsRUFBRSxpQkFBaUIsRUFBQyxNQUFNLFNBQVMsQ0FBQztBQUsvRTtJQWtCSSx1QkFDWSxVQUE2QixFQUM3QixXQUF3QixFQUN4QixVQUFzQixFQUN0QixhQUFxQyxFQUNyQyxpQkFBb0MsRUFDcEMsZ0JBQWtDO1FBTjlDLGlCQWtCQztRQWpCVyxlQUFVLEdBQVYsVUFBVSxDQUFtQjtRQUM3QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLGtCQUFhLEdBQWIsYUFBYSxDQUF3QjtRQUNyQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3BDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFyQjlDLGFBQVEsR0FBVyxrQkFBa0IsQ0FBQztRQUV0QyxtQkFBYyxHQUFHLElBQUksT0FBTyxFQUFVLENBQUM7UUFDdkMsa0JBQWEsR0FBRyxJQUFJLE9BQU8sRUFBVSxDQUFDO1FBRTlCLGdCQUFXLEdBQUc7WUFDbEIs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a0IsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDeEQsQ0FBQzs7Ozs7OztJQUNPLHlDQUFpQjs7Ozs7O0lBQXpCLFVBQTBCLE9BQWUsRUFBRSxJQUFZOztZQUMvQyxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUM7UUFDekMsR0FBRyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3JDLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztRQUMzQixHQUFHLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNsQixPQUFPLEdBQUcsQ0FBQyxTQUFTLENBQUM7SUFDekIsQ0FBQzs7Z0JBcnJCSixVQUFVOzs7O2dCQVBxQixpQkFBaUI7Z0JBQXpDLFdBQVc7Z0JBRWMsVUFBVTtnQkFGUSxzQkFBc0I7Z0JBRTVCLGlCQUFpQjtnQkFBdEQsZ0JBQWdCOztJQTJyQnhCLG9CQUFDO0NBQUEsQUF0ckJELElBc3JCQztTQXJyQlksYUFBYTs7O0lBRXRCLGlDQUFzQzs7SUFFdEMsdUNBQXVDOztJQUN2QyxzQ0FBc0M7Ozs7O0lBRXRDLG9DQU1FOzs7OztJQUVGLGdDQUE4Qjs7Ozs7SUFHMUIsbUNBQXFDOzs7OztJQUNyQyxvQ0FBZ0M7Ozs7O0lBQ2hDLG1DQUE4Qjs7Ozs7SUFDOUIsc0NBQTZDOzs7OztJQUM3QywwQ0FBNEM7Ozs7O0lBQzVDLHlDQUEwQzs7Ozs7QUFncUJsRCxvQ0FHQzs7O0lBRkcsa0NBQWlCOztJQUNqQixnQ0FBaUI7Ozs7O0FBR3JCLGtDQUlDOzs7SUFIRyw4QkFBZTs7SUFDZixnQ0FBa0I7O0lBQ2xCLCtCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZSwgT25EZXN0cm95fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7U29jaWFsQWN0aXZpdHl9IGZyb20gJy4vbW9kZWwvQWN0aXZpdHknO1xuaW1wb3J0IHtBY3Rpdml0eVBhcmFtc30gZnJvbSAnLi9tb2RlbC9BY3Rpdml0eVBhcmFtcyc7XG5pbXBvcnQge0F0dGFjaG1lbnR9IGZyb20gJy4vbW9kZWwvQXR0YWNobWVudCc7XG5pbXBvcnQge0xpa2VQYXJhbXN9IGZyb20gJy4vbW9kZWwvTGlrZVBhcmFtcyc7XG5pbXBvcnQge1xuICAgIEFQUF9BQ1RJVklUWSwgQVBQX0NPTU1FTlQsXG4gICAgUElOTkVXUyxcbiAgICBQb2xpY3ksIFBvbGljeUljb24sIFBvbGljeVZhbHVlQWxsLCBTSEFSRV9DT01QQU5ZLCBTSEFSRV9GUklFTkQsIFNIQVJFX01FLFxuICAgIFNIQVJFX1BVQkxJU0gsIFNvY2lhbFRhZ1xufSBmcm9tICcuL21vZGVsL0NvbmZpZyc7XG5pbXBvcnQge0ludml0YXRpb25QYXJhbXN9IGZyb20gJy4vbW9kZWwvSW52aXRhdGlvblBhcmFtcyc7XG5pbXBvcnQge1NvY2lhbENvbW1lbnR9IGZyb20gJy4vbW9kZWwvQ29tbWVudCc7XG5pbXBvcnQge0NvcmVTZXJ2aWNlLCBIdG1sVXRpbHMsIEh0dHBDbGllbnRTZXJ2aWNlLCBXZWJTb2NrZXRDbGllbnRTZXJ2aWNlLCBFbnZlbG9wQm9keX0gZnJvbSAnaW5ldC1jb3JlJztcbmltcG9ydCB7U3ViamVjdCwgU3Vic2NyaXB0aW9ufSBmcm9tIFwicnhqc1wiO1xuaW1wb3J0IHtGcm9udFZpZXdTZXJ2aWNlLCBQaG90bywgUGhvdG9Td2lwZSwgRmlsZUZvcm1hdFNlcnZpY2V9IGZyb20gXCJpbmV0LXVpXCI7XG5cbmRlY2xhcmUgbGV0IGlOZXQ6IGFueTtcbmRlY2xhcmUgbGV0ICQ6IGFueTtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNvY2lhbFNlcnZpY2UgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gICAgdmlld0RhdGU6IHN0cmluZyA9ICdkZC9NTS95eXl5IEhIOm1tJztcblxuICAgIGFjdGl2aXR5Q2hhbmdlID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xuICAgIGNvbW1lbnRDaGFuZ2UgPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XG5cbiAgICBwcml2YXRlIF9yZW1vdmVUYWdzID0gW1xuICAgICAgICAnbGluaycsXG4gICAgICAgICdtZXRhJyxcbiAgICAgICAgJ3NjcmlwdCcsXG4gICAgICAgICdzdHlsZScsXG4gICAgICAgICdvcGVuLWdyYXBoJ1xuICAgIF07XG5cbiAgICBwcml2YXRlIF9zb2NrZXQ6IFN1YnNjcmlwdGlvbjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGh0dHBDbGllbnQ6IEh0dHBDbGllbnRTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGNvcmVTZXJ2aWNlOiBDb3JlU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBwaG90b1N3aXBlOiBQaG90b1N3aXBlLFxuICAgICAgICBwcml2YXRlIHNvY2tldFNlcnZpY2U6IFdlYlNvY2tldENsaWVudFNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgZmlsZUZvcm1hdFNlcnZpY2U6IEZpbGVGb3JtYXRTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGZyb250Vmlld1NlcnZpY2U6IEZyb250Vmlld1NlcnZpY2VcbiAgICApIHtcbiAgICAgICAgLy8gUmVjZWl2ZSBhY3Rpdml0eSBub3RpZnkgcmVhbCB0aW1lXG4gICAgICAgIHRoaXMuX3NvY2tldCA9IHRoaXMuc29ja2V0U2VydmljZS5vbk1lc3NhZ2Uuc3Vic2NyaWJlKChtZXNzYWdlOiBFbnZlbG9wQm9keSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgYXBwID0gbWVzc2FnZS5hcHBsaWNhdGlvbjtcbiAgICAgICAgICAgIGNvbnN0IGFjdGl2aXR5SUQgPSBtZXNzYWdlLm1lc3NhZ2UgJiYgbWVzc2FnZS5tZXNzYWdlWydtc2dJRCddO1xuICAgICAgICAgICAgaWYgKGFwcCA9PT0gQVBQX0FDVElWSVRZKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpdml0eUNoYW5nZS5uZXh0KGFjdGl2aXR5SUQpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChhcHAgPT09IEFQUF9DT01NRU5UKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb21tZW50Q2hhbmdlLm5leHQoYWN0aXZpdHlJRCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLl9zb2NrZXQudW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cblxuICAgIGxpc3RHcm91cHMoY2FsbGJhY2s6IGFueSkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRKU09OKCdzb2NpYWwvbWVtYmVyL2NhdGVnb3J5JywgbnVsbCwgKGRhdGEsIGVycikgPT4ge1xuICAgICAgICAgICAgY2FsbGJhY2soZGF0YSAmJiBkYXRhLmVsZW1lbnRzIHx8IFtdLCBlcnIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpbnZpdGF0aW9uUmVjZWl2ZUxpc3QocGFyYW1zLCBjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRKU09OKCdzb2NpYWwvaW52aXRhdGlvbicsIHBhcmFtcywgY2FsbGJhY2spO1xuICAgIH1cblxuICAgIGludml0YXRpb25TZW5kTGlzdChwYXJhbXMsIGNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEpTT04oJ3NvY2lhbC9pbnZpdGF0aW9uL215bGlzdCcsIHBhcmFtcywgY2FsbGJhY2spO1xuICAgIH1cblxuICAgIGludml0YXRpb25SZWplY3RMaXN0KHBhcmFtcywgY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0SlNPTignc29jaWFsL2ludml0YXRpb24vcmVqZWN0ZWRsaXN0JywgcGFyYW1zLCBjYWxsYmFjayk7XG4gICAgfVxuXG4gICAgaW52aXRhdGlvbkNyZWF0ZShwYXJhbXM6IEludml0YXRpb25QYXJhbXMsIGNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBvc3RKU09OKCdzb2NpYWwvaW52aXRhdGlvbi9jcmVhdGUnLCBwYXJhbXMsIGNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICBpbnZpdGF0aW9uRGVsZXRlKHBhcmFtczogSW52aXRhdGlvblBhcmFtcywgY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zdEpTT04oJ3NvY2lhbC9pbnZpdGF0aW9uL2RlbGV0ZScsIHBhcmFtcywgY2FsbGJhY2spO1xuICAgIH1cblxuICAgIGludml0YXRpb25SZWplY3QocGFyYW1zOiBJbnZpdGF0aW9uUGFyYW1zLCBjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gdGhpcy5wb3N0SlNPTignc29jaWFsL2ludml0YXRpb24vcmVqZWN0ZWQnLCBwYXJhbXMsIGNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICBpbnZpdGF0aW9uQWNjZXB0KHBhcmFtczogSW52aXRhdGlvblBhcmFtcywgY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zdEpTT04oJ3NvY2lhbC9pbnZpdGF0aW9uL2FjY2VwdGVkJywgcGFyYW1zLCBjYWxsYmFjayk7XG4gICAgfVxuXG4gICAgaW52aXRhdGlvblNlYXJjaChwYXJhbXMsIGNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBvc3RKU09OKCdzb2NpYWwvbWVtYmVyL3NlYXJjaCcsIHBhcmFtcywgY2FsbGJhY2spO1xuICAgIH1cblxuICAgIGxpc3RGcmllbmRzKHBhcmFtcywgY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0SlNPTignc29jaWFsL21lbWJlci9saXN0JywgcGFyYW1zLCAoZGF0YSwgZXJyKSA9PiB7XG4gICAgICAgICAgICBsZXQgbWVtYmVycyA9IGRhdGEgJiYgZGF0YVsnaXRlbXMnXSB8fCBbXTtcbiAgICAgICAgICAgIG1lbWJlcnMudG90YWwgPSBkYXRhICYmIGRhdGEudG90YWwgfHwgMDtcbiAgICAgICAgICAgIGNhbGxiYWNrKG1lbWJlcnMsIGVycik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdyb3VwTWVtYmVyQ3JlYXRlKHBhcmFtcywgY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zdEpTT04oJ3NvY2lhbC9tZW1iZXIvY3JlYXRlJywgcGFyYW1zLCAoZGF0YSwgZXJyKSA9PiB7XG4gICAgICAgICAgICBjYWxsYmFjayhkYXRhLCBlcnIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBncm91cE1lbWJlckRlbGV0ZShwYXJhbXMsIGNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBvc3RKU09OKCdzb2NpYWwvbWVtYmVyL2RlbGV0ZScsIHBhcmFtcywgKGRhdGEsIGVycikgPT4ge1xuICAgICAgICAgICAgY2FsbGJhY2soZGF0YSwgZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2VhcmNoTWVtYmVyKHBhcmFtcywgY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5jb3JlU2VydmljZS5zZWFyY2hGaXJtQWNjb3VudChwYXJhbXMsIChkYXRhLCBlcnIpID0+IHtcbiAgICAgICAgICAgIGxldCBtZW1iZXJzID0gZGF0YSAmJiBkYXRhWydpdGVtcyddIHx8IFtdO1xuICAgICAgICAgICAgbWVtYmVycy50b3RhbCA9IGRhdGEgJiYgZGF0YS50b3RhbCB8fCAwO1xuICAgICAgICAgICAgY2FsbGJhY2sobWVtYmVycywgZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZmF2b3JpdGVMaXN0KHBhcmFtcywgY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zdEpTT04oJ3NvY2lhbC9hY3Rpdml0eS9mYXZvcml0ZScsIHBhcmFtcywgKGRhdGEsIGVycikgPT4ge1xuICAgICAgICAgICAgaWYgKGRhdGEgJiYgZGF0YVsnaXRlbXMnXSkge1xuICAgICAgICAgICAgICAgIGRhdGFbJ2l0ZW1zJ10uZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpdGVtLl9mYXZvcml0ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5kZXhBY3Rpdml0eShpdGVtKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhbGxiYWNrKGRhdGEsIGVycik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGFjdGl2aXR5V2FsbChwYXJhbXM6IEFjdGl2aXR5UGFyYW1zLCBjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRKU09OKCdzb2NpYWwvYWN0aXZpdHkvd2FsbCcsIHBhcmFtcyxcbiAgICAgICAgICAgIChkYXRhLCBlcnIpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YVsnaXRlbXMnXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVsnaXRlbXMnXS5mb3JFYWNoKHRoaXMuaW5kZXhBY3Rpdml0eS5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYWxsYmFjayhkYXRhLCBlcnIpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYWN0aXZpdHlMb2FkKHBhcmFtcywgY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0SlNPTignc29jaWFsL2FjdGl2aXR5L2xvYWQnLCBwYXJhbXMsIChkYXRhOiBTb2NpYWxBY3Rpdml0eSwgZXJyb3IpID0+IHtcbiAgICAgICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbmRleEFjdGl2aXR5KGRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FsbGJhY2soZGF0YSwgZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBhY3Rpdml0eVBvc3QocGFyYW1zLCBjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gdGhpcy5wb3N0Rm9ybSgnc29jaWFsL2FjdGl2aXR5L3Bvc3QnLCBwYXJhbXMsIChkYXRhLCBlcnIpID0+IHtcbiAgICAgICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbmRleEFjdGl2aXR5KGRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FsbGJhY2soZGF0YSwgZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYWN0aXZpdHlVcGRhdGUocGFyYW1zLCBjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gdGhpcy5wb3N0Rm9ybSgnc29jaWFsL2FjdGl2aXR5L3VwZGF0ZScsIHBhcmFtcywgKGRhdGEsIGVycikgPT4ge1xuICAgICAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmluZGV4QWN0aXZpdHkoZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYWxsYmFjayhkYXRhLCBlcnIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBwYXJhbXNcbiAgICAgKiB7XG4gICAgICogICAgYXBwbGljYXRpb246IHN0cmluZ1xuICAgICAqICAgIGNvbnRleHRJRDogc3RyaW5nXG4gICAgICogICAgZWxlbWVudDogW3tcbiAgICAgKiAgICAgIG1lbWJlcjogc3RyaW5nXG4gICAgICogICAgICBkaXNwbGF5OiBzdHJpbmdcbiAgICAgKiAgICAgIHBvbGljeTogXCJGUklFTkRcIlxuICAgICAqICAgIH1dXG4gICAgICogfVxuICAgICAqIEBwYXJhbSBjYWxsYmFja1xuICAgICAqXG4gICAgICovXG4gICAgYWN0aXZpdHlVcGRhdGVTY29wZShwYXJhbXMsIGNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBvc3RGb3JtKCdzb2NpYWwvYWN0aXZpdHkvc2NvcGUnLCBwYXJhbXMsIGNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICBhY3Rpdml0eVJlbW92ZShwYXJhbXMsIGNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEpTT04oJ3NvY2lhbC9hY3Rpdml0eS9kZWxldGUnLCBwYXJhbXMsIGNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICBhY3Rpdml0eVJlbW92ZUZpbGUocGFyYW1zLCBjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRKU09OKCdzb2NpYWwvYWN0aXZpdHkvYmluYXJ5cmVtb3ZlJywgcGFyYW1zLCBjYWxsYmFjayk7XG4gICAgfVxuXG4gICAgYWN0aXZpdHlMaWtlTGlzdChwYXJhbXMsIGNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEpTT04oJ3NvY2lhbC9hY3Rpdml0eS9saWtlbGlzdCcsIHBhcmFtcywgY2FsbGJhY2spO1xuICAgIH1cblxuICAgIGFjdGl2aXR5TGlrZShwYXJhbXM6IExpa2VQYXJhbXMsIGNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEpTT04oJ3NvY2lhbC9hY3Rpdml0eS9saWtlJywgcGFyYW1zLCBjYWxsYmFjayk7XG4gICAgfVxuXG4gICAgYWN0aXZpdHlVbkxpa2UocGFyYW1zOiBMaWtlUGFyYW1zLCBjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRKU09OKCdzb2NpYWwvYWN0aXZpdHkvdW5saWtlJywgcGFyYW1zLCBjYWxsYmFjayk7XG4gICAgfVxuXG4gICAgcG9sbExvYWQocGFyYW1zLCBjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRKU09OKCdzb2NpYWwvcG9sbC9sb2FkJywgcGFyYW1zLCBjYWxsYmFjayk7XG4gICAgfVxuXG4gICAgcG9sbFJlc3VsdChwYXJhbXMsIGNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEpTT04oJ3NvY2lhbC9wb2xsL3Jlc3VsdCcsIHBhcmFtcywgY2FsbGJhY2spO1xuICAgIH1cblxuICAgIHBvbGxWb3RlKHBhcmFtcywgY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0SlNPTignc29jaWFsL3BvbGwvdm90ZScsIHBhcmFtcywgY2FsbGJhY2spO1xuICAgIH1cblxuICAgIHBvbGxQb3N0KHBhcmFtcywgY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zdEZvcm0oJ3NvY2lhbC9hY3Rpdml0eS9wb2xscG9zdCcsIHBhcmFtcywgY2FsbGJhY2spO1xuICAgIH1cblxuICAgIHBvbGxVcGRhdGUocGFyYW1zLCBjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gdGhpcy5wb3N0Rm9ybSgnc29jaWFsL3BvbGwvdXBkYXRlJywgcGFyYW1zLCBjYWxsYmFjayk7XG4gICAgfVxuXG4gICAgY29tbWVudFdhbGwocGFyYW1zLCBjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRKU09OKCdzb2NpYWwvY29tbWVudC93YWxsJywgcGFyYW1zLCAoZGF0YSwgZXJyKSA9PiB7XG4gICAgICAgICAgICBpZiAoZGF0YSAmJiBkYXRhWydpdGVtcyddKSB7XG4gICAgICAgICAgICAgICAgZGF0YVsnaXRlbXMnXS5mb3JFYWNoKGl0ZW0gPT4gdGhpcy5pbmRleEFjdGl2aXR5KGl0ZW0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhbGxiYWNrKGRhdGEsIGVycik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbW1lbnRQb3N0KHBhcmFtcywgY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zdEZvcm0oJ3NvY2lhbC9jb21tZW50L3Bvc3QnLCBwYXJhbXMsIChkYXRhLCBlcnIpID0+IHtcbiAgICAgICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbmRleEFjdGl2aXR5KGRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FsbGJhY2soZGF0YSwgZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29tbWVudFVwZGF0ZShwYXJhbXMsIGNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBvc3RGb3JtKCdzb2NpYWwvY29tbWVudC91cGRhdGUnLCBwYXJhbXMsIChkYXRhLCBlcnIpID0+IHtcbiAgICAgICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbmRleEFjdGl2aXR5KGRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FsbGJhY2soZGF0YSwgZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29tbWVudFJlbW92ZShwYXJhbXMsIGNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEpTT04oJ3NvY2lhbC9jb21tZW50L2RlbGV0ZScsIHBhcmFtcywgY2FsbGJhY2spO1xuICAgIH1cblxuICAgIGNvbW1lbnRMaWtlKHBhcmFtczogTGlrZVBhcmFtcywgY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0SlNPTignc29jaWFsL2NvbW1lbnQvbGlrZScsIHBhcmFtcywgY2FsbGJhY2spO1xuICAgIH1cblxuICAgIGNvbW1lbnRVbkxpa2UocGFyYW1zOiBMaWtlUGFyYW1zLCBjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRKU09OKCdzb2NpYWwvY29tbWVudC91bmxpa2UnLCBwYXJhbXMsIGNhbGxiYWNrKTtcbiAgICB9XG5cblxuICAgIC8vIERvd25sb2FkIC8gVmlldyBmaWxlXG5cbiAgICBhY3Rpdml0eURvd25Mb2FkVXJsKHBhcmFtczogQmluYXJ5UGFyYW1zKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGlOZXQuZ2V0UFVybCgnc29jaWFsL2FjdGl2aXR5L2Rvd25sb2FkJykgKyAnPycgKyAkLnBhcmFtKHBhcmFtcyk7XG4gICAgfVxuXG4gICAgYWN0aXZpdHlWaWV3VXJsKHBhcmFtczogQmluYXJ5UGFyYW1zKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGlOZXQuZ2V0UFVybCgnc29jaWFsL2FjdGl2aXR5L2lubGluZXZpZXcnKSArICc/JyArICQucGFyYW0ocGFyYW1zKTtcbiAgICB9XG5cbiAgICBhY3Rpdml0eVZpZXdPbmxpbmVVcmwocGFyYW1zOiBCaW5hcnlQYXJhbXMpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gaU5ldC5nZXRQVXJsKCd1bmljb3JuL3BhZ2Uvc29jaWFsL2FjdGl2aXR5LXZpZXdlcicpICsgJz8nICsgJC5wYXJhbShwYXJhbXMpO1xuICAgIH1cblxuICAgIGNvbW1lbnREb3duTG9hZFVybChwYXJhbXM6IEJpbmFyeVBhcmFtcyk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBpTmV0LmdldFBVcmwoJ3NvY2lhbC9jb21tZW50L2Rvd25sb2FkJykgKyAnPycgKyAkLnBhcmFtKHBhcmFtcyk7XG4gICAgfVxuXG4gICAgY29tbWVudFZpZXdVcmwocGFyYW1zOiBCaW5hcnlQYXJhbXMpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gaU5ldC5nZXRQVXJsKCdzb2NpYWwvY29tbWVudC9pbmxpbmV2aWV3JykgKyAnPycgKyAkLnBhcmFtKHBhcmFtcyk7XG4gICAgfVxuXG4gICAgY29tbWVudFZpZXdPbmxpbmVVcmwocGFyYW1zOiBCaW5hcnlQYXJhbXMpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gaU5ldC5nZXRQVXJsKCd1bmljb3JuL3BhZ2Uvc29jaWFsL2NvbW1lbnQtdmlld2VyJykgKyAnPycgKyAkLnBhcmFtKHBhcmFtcyk7XG4gICAgfVxuXG4gICAgaXNDb21tZW50QXBwKGFwcGxpY2F0aW9uOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIGFwcGxpY2F0aW9uID09PSBBUFBfQ09NTUVOVDtcbiAgICB9XG5cbiAgICBpc0FjdGl2aXR5QXBwKGFwcGxpY2F0aW9uOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIGFwcGxpY2F0aW9uID09PSBBUFBfQUNUSVZJVFk7XG4gICAgfVxuXG4gICAgdmlld0F0dGFjaG1lbnQoYXR0YWNobWVudDogQXR0YWNobWVudCkge1xuICAgICAgICBpZiAoKGlOZXQuaGFzT25saW5lRWRpdG9yICYmIGF0dGFjaG1lbnQucGF0aFZpZXdPbmxpbmUpIHx8IGF0dGFjaG1lbnQucGF0aFZpZXdQZGYpIHtcbiAgICAgICAgICAgIHRoaXMuZnJvbnRWaWV3U2VydmljZS52aWV3SW5saW5lKGF0dGFjaG1lbnQucGF0aFZpZXdPbmxpbmUgfHwgYXR0YWNobWVudC5wYXRoVmlld1BkZik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3aW5kb3cub3BlbihhdHRhY2htZW50LnBhdGhEb3duTG9hZCwgJ19ibGFuaycpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmlld0ltYWdlcyhpbWFnZXM6IFBob3RvW10sIG9wdGlvbnM/OiBhbnkpIHtcbiAgICAgICAgdGhpcy5waG90b1N3aXBlLm9wZW4oaW1hZ2VzLCBvcHRpb25zKTtcbiAgICB9XG5cblxuICAgIGF0dGFjaG1lbnRUb0ZpbGVzKGF0dGFjaG1lbnRzOiBBdHRhY2htZW50W10pIHtcbiAgICAgICAgY29uc3QgZmlsZXMgPSBbXTtcbiAgICAgICAgYXR0YWNobWVudHMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgIGZpbGVzLnB1c2goe1xuICAgICAgICAgICAgICAgIG5hbWU6IGl0ZW0uZmlsZSxcbiAgICAgICAgICAgICAgICB0eXBlOiBpdGVtLm1pbWV0eXBlLFxuICAgICAgICAgICAgICAgIHNpemU6IGl0ZW0uc2l6ZSxcbiAgICAgICAgICAgICAgICB1cmw6IGl0ZW0ucGF0aFZpZXcsXG4gICAgICAgICAgICAgICAgaWQ6IGl0ZW0uZ3JpZGZzVVVJRCxcbiAgICAgICAgICAgICAgICBpbWFnZTogdGhpcy5pc0ltYWdlKGl0ZW0ubWltZXR5cGUpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBmaWxlcztcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldEpTT04odXJsOiBzdHJpbmcsIHBhcmFtczogYW55LCBjYWxsYmFjazogYW55KTogU3Vic2NyaXB0aW9uIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cENsaWVudC5nZXRKU09OKGlOZXQuZ2V0UFVybCh1cmwpLCBwYXJhbXMpLnN1YnNjcmliZShcbiAgICAgICAgICAgIGNhbGxiYWNrLFxuICAgICAgICAgICAgZXJyID0+IHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhudWxsLCBlcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHByaXZhdGUgcG9zdEpTT04odXJsOiBzdHJpbmcsIHBhcmFtczogYW55LCBjYWxsYmFjazogYW55KTogU3Vic2NyaXB0aW9uIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cENsaWVudC5wb3N0SlNPTihpTmV0LmdldFBVcmwodXJsKSwgcGFyYW1zKS5zdWJzY3JpYmUoXG4gICAgICAgICAgICBjYWxsYmFjayxcbiAgICAgICAgICAgIGVyciA9PiB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sobnVsbCwgZXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHBvc3RGb3JtKHVybDogc3RyaW5nLCBwYXJhbXM6IGFueSwgY2FsbGJhY2s6IGFueSkge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwQ2xpZW50LnBvc3QoaU5ldC5nZXRQVXJsKHVybCksIHRoaXMuYnVpbGRGb3JtRGF0YShwYXJhbXMpKS5zdWJzY3JpYmUoXG4gICAgICAgICAgICBjYWxsYmFjayxcbiAgICAgICAgICAgIGVyciA9PiB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sobnVsbCwgZXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGJ1aWxkRm9ybURhdGEoZGF0YSkge1xuICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGZvcm0gPSBuZXcgRm9ybURhdGEoKTtcblxuICAgICAgICBPYmplY3Qua2V5cyhkYXRhKS5mb3JFYWNoKGsgPT4ge1xuICAgICAgICAgICAgaWYgKGsgPT09ICdvcGVuR3JhcGgnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGsgPT09ICdtZXNzYWdlJykge1xuICAgICAgICAgICAgICAgIGxldCBtZXNzYWdlID0gdGhpcy5zZWN1cmVNZXNzYWdlSHRtbChkYXRhW2tdKTtcblxuICAgICAgICAgICAgICAgIC8vIGFwcGVuZCBvcGVuIGdyYXBoIGRhdGEgb24gbWVzc2FnZVxuICAgICAgICAgICAgICAgIGlmIChkYXRhLm9wZW5HcmFwaCkge1xuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlICs9IHRoaXMuY3JlYXRlT3BlbkdyYXBoTWVzc2FnZShkYXRhLm9wZW5HcmFwaCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZm9ybS5hcHBlbmQoaywgbWVzc2FnZSk7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZm9ybS5hcHBlbmQoaywgZGF0YVtrXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBmb3JtO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5kZXhBY3Rpdml0eShhY3Rpdml0eTogU29jaWFsQWN0aXZpdHkgfCBTb2NpYWxDb21tZW50KSB7XG5cbiAgICAgICAgaWYgKCFhY3Rpdml0eSB8fCAhYWN0aXZpdHkudXVpZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gR2V0IGZ1bGwgcGF0aFxuICAgICAgICBpZiAoYWN0aXZpdHkucGF0aCkge1xuICAgICAgICAgICAgYWN0aXZpdHkucGF0aCA9IHRoaXMuY29yZVNlcnZpY2UuZ2V0U3NvUmVkaXJlY3Qoe1xuICAgICAgICAgICAgICAgIHVybDogYWN0aXZpdHkucGF0aCxcbiAgICAgICAgICAgICAgICBhcHBsaWNhdGlvbjogYWN0aXZpdHkuYXBwbGljYXRpb25cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhY3Rpdml0eS5tcGF0aCkge1xuICAgICAgICAgICAgYWN0aXZpdHkubXBhdGggPSB0aGlzLmNvcmVTZXJ2aWNlLmdldFNzb1JlZGlyZWN0KHtcbiAgICAgICAgICAgICAgICB1cmw6IGFjdGl2aXR5Lm1wYXRoLFxuICAgICAgICAgICAgICAgIGFwcGxpY2F0aW9uOiBhY3Rpdml0eS5hcHBsaWNhdGlvblxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBhY3Rpdml0eS5pc0NyZWF0b3IgPSBhY3Rpdml0eS5jcmVhdG9yID09PSBpTmV0LnVzZXJuYW1lO1xuICAgICAgICBhY3Rpdml0eS5fZWRpdGFibGUgPSBhY3Rpdml0eS5pc0NyZWF0b3IgJiYgIWFjdGl2aXR5LnBhdGg7XG4gICAgICAgIGFjdGl2aXR5Ll9sb2NhbE5ld3NQaW4gPSBhY3Rpdml0eS50eXBlID09PSBQSU5ORVdTO1xuXG4gICAgICAgIHRoaXMuZm9ybWF0TWVzc2FnZURpc3BsYXkoYWN0aXZpdHkpO1xuICAgICAgICB0aGlzLl9pbmRleEF0dGFjaG1lbnRzKGFjdGl2aXR5KTtcbiAgICAgICAgdGhpcy5pbmRleFBvbGljaWVzKGFjdGl2aXR5KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9pbmRleEF0dGFjaG1lbnRzKGFjdGl2aXR5KSB7XG4gICAgICAgIGFjdGl2aXR5LmltYWdlcyA9IFtdO1xuICAgICAgICBhY3Rpdml0eS5maWxlcyA9IFtdO1xuICAgICAgICBhY3Rpdml0eS5hdHRhY2htZW50cy5mb3JFYWNoKChpdGVtOiBBdHRhY2htZW50KSA9PiB7XG4gICAgICAgICAgICBsZXQgcGFyYW1zOiBhbnkgPSB7XG4gICAgICAgICAgICAgICAgYmluYXJ5OiBpdGVtLnV1aWRcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBsZXQgaXNDb21tZW50ID0gYWN0aXZpdHkuaGFzT3duUHJvcGVydHkoJ2FjdGl2aXR5SUQnKTtcbiAgICAgICAgICAgIGlmIChpc0NvbW1lbnQpIHtcbiAgICAgICAgICAgICAgICBwYXJhbXMuYWN0aXZpdHkgPSBhY3Rpdml0eS5hY3Rpdml0eUlEO1xuICAgICAgICAgICAgICAgIHBhcmFtcy5jb21tZW50ID0gYWN0aXZpdHkudXVpZDtcbiAgICAgICAgICAgICAgICBpdGVtLnBhdGhWaWV3ID0gdGhpcy5jb21tZW50Vmlld1VybChwYXJhbXMpO1xuICAgICAgICAgICAgICAgIGl0ZW0ucGF0aERvd25Mb2FkID0gdGhpcy5jb21tZW50RG93bkxvYWRVcmwocGFyYW1zKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcGFyYW1zLmFjdGl2aXR5ID0gYWN0aXZpdHkudXVpZDtcbiAgICAgICAgICAgICAgICBpdGVtLnBhdGhWaWV3ID0gdGhpcy5hY3Rpdml0eVZpZXdVcmwocGFyYW1zKTtcbiAgICAgICAgICAgICAgICBpdGVtLnBhdGhEb3duTG9hZCA9IHRoaXMuYWN0aXZpdHlEb3duTG9hZFVybChwYXJhbXMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5pc0ltYWdlKGl0ZW0ubWltZXR5cGUpKSB7XG4gICAgICAgICAgICAgICAgYWN0aXZpdHkuaW1hZ2VzLnB1c2goaXRlbSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2lzU3VwcG9ydFZpZXdPbmxpbmUoaXRlbS5maWxlKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXNDb21tZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLnBhdGhWaWV3T25saW5lID0gdGhpcy5jb21tZW50Vmlld09ubGluZVVybChwYXJhbXMpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5wYXRoVmlld09ubGluZSA9IHRoaXMuYWN0aXZpdHlWaWV3T25saW5lVXJsKHBhcmFtcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5faXNQZGYoaXRlbS5maWxlKSkge1xuICAgICAgICAgICAgICAgICAgICBpdGVtLnBhdGhWaWV3UGRmID0gaXRlbS5wYXRoVmlldztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBhY3Rpdml0eS5maWxlcy5wdXNoKGl0ZW0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2lzU3VwcG9ydFZpZXdPbmxpbmUoZmlsZW5hbWU6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5maWxlRm9ybWF0U2VydmljZS5nZXRFZGl0Rm9ybWF0cygpLmluZGV4T2YodGhpcy5fZ2V0RXh0KGZpbGVuYW1lKSkgPiAtMTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9pc1BkZihmaWxlbmFtZTogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9nZXRFeHQoZmlsZW5hbWUpID09PSAncGRmJztcbiAgICB9XG5cbiAgICBwcml2YXRlIF9nZXRFeHQobmFtZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgbGV0IHRlbXAgPSBuYW1lLnNwbGl0KCcuJyk7XG4gICAgICAgIGlmICh0ZW1wLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIHJldHVybiB0ZW1wW3RlbXAubGVuZ3RoIC0gMV0udG9Mb3dlckNhc2UoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgaW5kZXhQb2xpY2llcyhhY3Rpdml0eSkge1xuICAgICAgICBhY3Rpdml0eS5fcG9saWNpZXMgPSBbXTtcblxuICAgICAgICBpZiAoYWN0aXZpdHkucHVibGlzaGVkKSB7XG4gICAgICAgICAgICAvLyBQdWJsaXNoXG4gICAgICAgICAgICBhY3Rpdml0eS5fcG9saWNpZXMucHVzaChTSEFSRV9QVUJMSVNIKTtcbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgYWN0aXZpdHkucG9saWNpZXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5pbmhlcml0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IHBvbGljeSA9IHtcbiAgICAgICAgICAgICAgICAgICAgbWVtYmVyOiBpdGVtLmNhdGVnb3J5LFxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBpdGVtLmRpc3BsYXkgfHwgaXRlbS5jYXRlZ29yeSxcbiAgICAgICAgICAgICAgICAgICAgcG9saWN5OiBpdGVtLnBvbGljeVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgYWN0aXZpdHkuX3BvbGljaWVzLnB1c2gocG9saWN5KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBhY3Rpdml0eS5fcG9saWNpZXMgPSB0aGlzLnNwbGl0UG9saWNpZXMoYWN0aXZpdHkuX3BvbGljaWVzKTtcblxuICAgICAgICAgICAgLy8gQWRkIGljb25cbiAgICAgICAgICAgIGFjdGl2aXR5Ll9wb2xpY2llcy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghaXRlbS5oYXNPd25Qcm9wZXJ0eSgnaWNvbicpKSB7XG4gICAgICAgICAgICAgICAgICAgIGFjdGl2aXR5Ll9wb2xpY2llc1tpbmRleF0gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogaXRlbS5tZW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBpdGVtLmRpc3BsYXksXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uOiB0aGlzLmdldEljb25CeVR5cGUoaXRlbS5wb2xpY3kpLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFtpdGVtXVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gUG9saWNpZXMgZGlzcGxheVxuICAgICAgICBpZiAoYWN0aXZpdHkuX3BvbGljaWVzLmxlbmd0aCA8PSA0KSB7XG4gICAgICAgICAgICBhY3Rpdml0eS5fcG9saWNpZXNTdHIgPSAnJztcbiAgICAgICAgICAgIGFjdGl2aXR5Ll9wb2xpY2llcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgIGlmIChpdGVtID09PSBTSEFSRV9NRSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGFjdGl2aXR5Ll9wb2xpY2llc1N0ciArPSBpdGVtLmRpc3BsYXkgKyAnLCAnO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBhY3Rpdml0eS5fcG9saWNpZXNTdHIgPSBhY3Rpdml0eS5fcG9saWNpZXNTdHIuc2xpY2UoMCwgLTIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWN0aXZpdHkuX3BvbGljaWVzU3RyID0gYWN0aXZpdHkuX3BvbGljaWVzWzBdLmRpc3BsYXk7XG4gICAgICAgICAgICBhY3Rpdml0eS5fcG9saWNpZXNTdHIgKz0gJyB2w6AgJyArIChhY3Rpdml0eS5fcG9saWNpZXMubGVuZ3RoIC0gMikgKyAnIG5nxrDhu51pIGtow6FjJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldEljb25CeVR5cGUocG9saWN5OiBzdHJpbmcpIHtcbiAgICAgICAgc3dpdGNoIChwb2xpY3kpIHtcbiAgICAgICAgICAgIGNhc2UgUG9saWN5LkNvbXBhbnk6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFBvbGljeUljb24uQ29tcGFueTtcbiAgICAgICAgICAgIGNhc2UgUG9saWN5LkZyaWVuZDpcbiAgICAgICAgICAgICAgICByZXR1cm4gUG9saWN5SWNvbi5GcmllbmQ7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgc3BsaXRQb2xpY2llcyhwb2xpY2llcykge1xuICAgICAgICBpZiAocG9saWNpZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbGV0IGFsbENvbXBhbnksIGFsbEZyaWVuZDtcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwb2xpY2llcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCBpdGVtID0gcG9saWNpZXNbaV07XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNBbGxGcmllbmQoaXRlbSkpIHtcbiAgICAgICAgICAgICAgICAgICAgYWxsRnJpZW5kID0gaXRlbTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaXNBbGxDb21wYW55KGl0ZW0pKSB7XG4gICAgICAgICAgICAgICAgICAgIGFsbENvbXBhbnkgPSBpdGVtO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5pc09ubHlNZShpdGVtKSkge1xuICAgICAgICAgICAgICAgICAgICBwb2xpY2llc1tpXSA9IFNIQVJFX01FO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGFsbEZyaWVuZCkge1xuICAgICAgICAgICAgICAgIHBvbGljaWVzW3BvbGljaWVzLmluZGV4T2YoYWxsRnJpZW5kKV0gPSBTSEFSRV9GUklFTkQ7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGFsbENvbXBhbnkpIHtcbiAgICAgICAgICAgICAgICBwb2xpY2llc1twb2xpY2llcy5pbmRleE9mKGFsbENvbXBhbnkpXSA9IFNIQVJFX0NPTVBBTlk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBvbGljaWVzO1xuICAgIH1cblxuICAgIHByaXZhdGUgaXNBbGxDb21wYW55KHBvbGljeSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gcG9saWN5LmRpc3BsYXkgPT09IFBvbGljeS5Db21wYW55ICYmXG4gICAgICAgICAgICBwb2xpY3kucG9saWN5ID09PSBQb2xpY3kuQ29tcGFueTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGlzQWxsRnJpZW5kKHBvbGljeSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gcG9saWN5Lm1lbWJlciA9PT0gUG9saWN5VmFsdWVBbGwgJiZcbiAgICAgICAgICAgIHBvbGljeS5wb2xpY3kgPT09IFBvbGljeS5GcmllbmQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc09ubHlNZShwb2xpY3kpOiBib29sZWFuIHtcblxuICAgICAgICByZXR1cm4gcG9saWN5Lm1lbWJlciA9PT0gaU5ldC51c2VybmFtZSAmJlxuICAgICAgICAgICAgcG9saWN5LnBvbGljeSA9PT0gUG9saWN5LkluZGl2aWR1YWw7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc0ltYWdlKG1pbWVUeXBlOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIG1pbWVUeXBlLmluZGV4T2YoJ2ltYWdlJykgPiAtMTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgaHRtbCB0YWcgb24gbWVzc2FnZVxuICAgICAqL1xuICAgIHByaXZhdGUgc2VjdXJlTWVzc2FnZUh0bWwobWVzc2FnZTogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0ICRlbCA9ICQoJzxkaXY+JykuaHRtbChtZXNzYWdlKTtcbiAgICAgICAgJGVsLmZpbmQodGhpcy5fcmVtb3ZlVGFncy5qb2luKCcsJykpLnJlbW92ZSgpO1xuICAgICAgICByZXR1cm4gJGVsLnRleHQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGb3JtYXQgbWVzc2FnZSBhbmQgb3BlbiBncmFwaCBkYXRhIHRvIGRpc3BsYXlcbiAgICAgKi9cbiAgICBwcml2YXRlIGZvcm1hdE1lc3NhZ2VEaXNwbGF5KGFjdGl2aXR5OiBTb2NpYWxBY3Rpdml0eSkge1xuXG4gICAgICAgIC8vIEdldCBzb2NpYWwgZGF0YSBtZXNzYWdlXG4gICAgICAgIGxldCBkYXRhU29jaWFsID0gdGhpcy5wYXJzZVNvY2lhbERhdGFNZXNzYWdlKGFjdGl2aXR5KTtcblxuICAgICAgICAvLyBPbmx5IGdldCBmaXJzdCBpdGVtXG4gICAgICAgIGlmIChkYXRhU29jaWFsW1NvY2lhbFRhZy5PcGVuR3JhcGhdLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGFjdGl2aXR5Ll9vcGVuR3JhcGggPSBkYXRhU29jaWFsW1NvY2lhbFRhZy5PcGVuR3JhcGhdWzBdO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhU29jaWFsW1NvY2lhbFRhZy5Mb2NhbE5ld3NdLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGFjdGl2aXR5Ll9sb2NhbE5ld3MgPSBkYXRhU29jaWFsW1NvY2lhbFRhZy5Mb2NhbE5ld3NdWzBdO1xuICAgICAgICAgICAgYWN0aXZpdHkuX2xvY2FsTmV3cy51cmwgPSBhY3Rpdml0eS5wYXRoO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcmVtb3ZlIHNjcmlwdCBhbmQgc3R5bGVcbiAgICAgICAgbGV0IG1lc3NhZ2UgPSBhY3Rpdml0eS5tZXNzYWdlID0gdGhpcy5zZWN1cmVNZXNzYWdlSHRtbChhY3Rpdml0eS5tZXNzYWdlKTtcblxuICAgICAgICAvLyBCZWFrIGxpbmVcbiAgICAgICAgbWVzc2FnZSA9IEh0bWxVdGlscy5mb3JtYXRIdG1sRGlzcGxheShtZXNzYWdlKTtcblxuICAgICAgICAvLyBsaW5rXG4gICAgICAgIG1lc3NhZ2UgPSBtZXNzYWdlLnJlcGxhY2UoLyhodHRwcz86XFwvXFwvW15cXHNdKykvZywgZnVuY3Rpb24gKHVybCkge1xuICAgICAgICAgICAgcmV0dXJuICc8YSBocmVmPVwiJyArIHVybCArICdcIiB0YXJnZXQ9XCJfYmxhbmtcIiByZWw9XCJub2ZvbGxvdyBub29wZW5lclwiPicgKyB1cmwgKyAnPC9hPic7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGFjdGl2aXR5Ll9kaXNwbGF5TWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgfVxuXG4gICAgY3JlYXRlT3BlbkdyYXBoTWVzc2FnZShvcGVuR3JhcGg6IE9iamVjdCk6IHN0cmluZyB7XG4gICAgICAgIGxldCB2YWx1ZSA9IHRoaXMuZW5jb2RlQmFzZTY0KEpTT04uc3RyaW5naWZ5KHRoaXMuY29udmVydExpbmtzKG9wZW5HcmFwaCkpKVxuICAgICAgICByZXR1cm4gJ3VyaV9tZXNzYWdlOmxpbmtfcHJldmlldzonICsgdmFsdWU7XG4gICAgfVxuXG4gICAgY29udmVydExpbmtzKGRhdGEpIHtcbiAgICAgICAgbGV0IHBhcmFtID0ge307XG4gICAgICAgIHBhcmFtWyd0aXRsZSddID0gZGF0YVsndGl0bGUnXTtcbiAgICAgICAgcGFyYW1bJ2ltYWdlJ10gPSBkYXRhWydpbWFnZSddO1xuICAgICAgICBwYXJhbVsnZGVzY3JpcHRpb24nXSA9IGRhdGFbJ2Rlc2NyaXB0aW9uJ107XG4gICAgICAgIHBhcmFtWyd1cmwnXSA9IGRhdGFbJ3VybCddO1xuICAgICAgICBwYXJhbVsnZmluYWxVcmwnXSA9IGRhdGFbJ3NpdGVfbmFtZSddLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgIHJldHVybiBwYXJhbTtcbiAgICB9XG5cbiAgICBlbmNvZGVCYXNlNjQoc3RyOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5idG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChzdHIpKSk7XG4gICAgfVxuXG5cbiAgICBjcmVhdGVMb2NhbE5ld3NNZXNzYWdlKGxvY2FsTmV3czogT2JqZWN0KTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NyZWF0ZVRhZ01lc3NhZ2UoU29jaWFsVGFnLkxvY2FsTmV3cywgbG9jYWxOZXdzKTtcbiAgICB9XG5cbiAgICAvLyBwYXJzZVNvY2lhbERhdGFNZXNzYWdlKGFjdGl2aXR5OiBTb2NpYWxBY3Rpdml0eSB8IFNvY2lhbENvbW1lbnQpOiBPYmplY3Qge1xuICAgIC8vICAgICBsZXQgZGF0YSA9IHt9O1xuICAgIC8vICAgICBsZXQgJGVsID0gJCgnPGRpdj4nKS5odG1sKGFjdGl2aXR5Lm1lc3NhZ2UpO1xuICAgIC8vXG4gICAgLy8gICAgIGZvciAobGV0IHRhZyBpbiBTb2NpYWxUYWcpIHtcbiAgICAvLyAgICAgICAgIGxldCB0YWdOYW1lID0gU29jaWFsVGFnW3RhZ107XG4gICAgLy8gICAgICAgICBkYXRhW3RhZ05hbWVdID0gW107XG4gICAgLy8gICAgICAgICAkZWwuZmluZCh0YWdOYW1lKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAvLyAgICAgICAgICAgICB0cnkge1xuICAgIC8vICAgICAgICAgICAgICAgICBkYXRhW3RhZ05hbWVdLnB1c2goSlNPTi5wYXJzZSh0aGlzLmlubmVySFRNTCkpO1xuICAgIC8vICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAvLyAgICAgICAgICAgICB9XG4gICAgLy9cbiAgICAvLyAgICAgICAgICAgICAvLyBSZW1vdmUgdGFnIGFmdGVyIGV4dHJhY3QgZGF0YVxuICAgIC8vICAgICAgICAgICAgIHRoaXMucmVtb3ZlKCk7XG4gICAgLy8gICAgICAgICB9KTtcbiAgICAvLyAgICAgfVxuICAgIC8vXG4gICAgLy8gICAgIC8vIEFwcGx5IG1lc3NhZ2UgYWZ0ZXIgZXh0cmFjdCBkYXRhXG4gICAgLy8gICAgIGFjdGl2aXR5Lm1lc3NhZ2UgPSAkZWwuaHRtbCgpO1xuICAgIC8vXG4gICAgLy8gICAgIHJldHVybiBkYXRhO1xuICAgIC8vIH1cbiAgICBwYXJzZVNvY2lhbERhdGFNZXNzYWdlKGFjdGl2aXR5OiBTb2NpYWxBY3Rpdml0eSB8IFNvY2lhbENvbW1lbnQpOiBPYmplY3Qge1xuICAgICAgICBsZXQgZGF0YSA9IHt9O1xuICAgICAgICBmb3IgKGxldCB0YWcgaW4gU29jaWFsVGFnKSB7XG4gICAgICAgICAgICBsZXQgdGFnTmFtZSA9IFNvY2lhbFRhZ1t0YWddO1xuICAgICAgICAgICAgZGF0YVt0YWdOYW1lXSA9IFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG1lc3NhZ2UgPSBhY3Rpdml0eS5tZXNzYWdlO1xuICAgICAgICBsZXQgaW5kZXggPSBtZXNzYWdlLmluZGV4T2YoXCJ1cmlfbWVzc2FnZVwiKTtcbiAgICAgICAgaWYoaW5kZXggPiAtMSl7XG4gICAgICAgICAgICBtZXNzYWdlID0gbWVzc2FnZS5zdWJzdHJpbmcoaW5kZXgpO1xuICAgICAgICAgICAgbGV0IHR5cGVNZXNzYWdlcyA9IG1lc3NhZ2Uuc3BsaXQoXCI6XCIpO1xuICAgICAgICAgICAgaWYodHlwZU1lc3NhZ2VzLmxlbmd0aCA9PT0gMyl7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVNZXNzYWdlc1swXSA9PT0gJ3VyaV9tZXNzYWdlJyAmJiB0eXBlTWVzc2FnZXNbMV0gPT09ICdsaW5rX3ByZXZpZXcnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgX19tZXNzYWdlTGluayA9IEpTT04ucGFyc2UodGhpcy5kZWNvZGVCYXNlNjQodHlwZU1lc3NhZ2VzWzJdKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhW1NvY2lhbFRhZy5PcGVuR3JhcGhdLnB1c2goX19tZXNzYWdlTGluayApO1xuICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIEFwcGx5IG1lc3NhZ2UgYWZ0ZXIgZXh0cmFjdCBkYXRhXG4gICAgICAgICAgICBhY3Rpdml0eS5tZXNzYWdlID0gYWN0aXZpdHkubWVzc2FnZS5zdWJzdHJpbmcoMCxpbmRleCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuICAgIGRlY29kZUJhc2U2NChzdHI6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KGVzY2FwZSh3aW5kb3cuYXRvYihzdHIpKSk7XG4gICAgfVxuICAgIHByaXZhdGUgX2NyZWF0ZVRhZ01lc3NhZ2UodGFnTmFtZTogc3RyaW5nLCBkYXRhOiBPYmplY3QpOiBzdHJpbmcge1xuICAgICAgICBsZXQgdGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWdOYW1lKTtcbiAgICAgICAgdGFnLmlubmVyVGV4dCA9IEpTT04uc3RyaW5naWZ5KGRhdGEpO1xuICAgICAgICB0YWcuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgdGFnLmhpZGRlbiA9IHRydWU7XG4gICAgICAgIHJldHVybiB0YWcub3V0ZXJIVE1MO1xuICAgIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBGYXZvcml0ZVBhcmFtcyB7XG4gICAgYWN0aXZpdHk6IHN0cmluZztcbiAgICByZW1vdmU/OiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEJpbmFyeVBhcmFtcyB7XG4gICAgYmluYXJ5OiBzdHJpbmc7XG4gICAgYWN0aXZpdHk/OiBzdHJpbmc7XG4gICAgY29tbWVudD86IHN0cmluZztcbn1cbiJdfQ==