import { Injectable, Component, ViewChild, Input, ElementRef, EventEmitter, Output, Pipe, NgModule, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HtmlUtils, HttpClientService, CoreService, WebSocketClientService, AccentService, AutoSizeDirective, CacheStorageService, CoreModule } from 'inet-core';
import { Subject } from 'rxjs';
import { PhotoSwipe, FileFormatService as FileFormatService$1, FrontViewService, LinkPreviewComponent, PhotoSwipeModule, OpenGraphModule, AutocompleteModule, FrontViewModule, DateTimeModule, NavigationTabModule } from 'inet-ui';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { BsModalService, BsDropdownModule } from 'ngx-bootstrap';
import { __extends } from 'tslib';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NavigationEnd, Router, ActivatedRoute, RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NgxGalleryAnimation, NgxGalleryModule } from 'ngx-gallery';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {string} */
var SocialTag = {
    OpenGraph: 'open-graph',
    LocalNews: 'localnews',
};
/** @enum {string} */
var Policy = {
    Friend: 'FRIEND',
    Company: 'COMPANY',
    Individual: 'INDIVIDUAL',
};
/** @type {?} */
var PolicyValueAll = 'EVERYONE';
/** @enum {string} */
var PolicyDisplay = {
    Friend: 'Bạn bè',
    Company: 'Công ty',
    Publish: 'Công khai',
    CompanyFriend: 'Công ty và bạn bè',
    OnlyMe: 'Mình tôi',
};
/** @enum {string} */
var PolicyIcon = {
    Friend: 'fa-user',
    Company: 'fa-cube',
    Publish: 'fa-globe',
    category: 'fa-users',
    OnlyMe: 'fa-lock',
};
/**
 * @record
 */
function PolicyItem() { }
if (false) {
    /** @type {?} */
    PolicyItem.prototype.policy;
    /** @type {?} */
    PolicyItem.prototype.display;
    /** @type {?} */
    PolicyItem.prototype.member;
}
/** @type {?} */
var POLICY_COMPANY = {
    policy: Policy.Company,
    display: PolicyDisplay.Company,
    member: PolicyValueAll
};
/** @type {?} */
var POLICY_FRIEND = {
    policy: Policy.Friend,
    display: PolicyDisplay.Friend,
    member: PolicyValueAll
};
/** @type {?} */
var POLICY_ME = {
    policy: Policy.Individual,
    display: PolicyDisplay.OnlyMe,
    member: iNet.username
};
/** @type {?} */
var SHARE_PUBLISH = {
    category: true,
    id: 0,
    icon: PolicyIcon.Publish,
    display: PolicyDisplay.Publish,
    value: []
};
/** @type {?} */
var SHARE_COMPANY_FRIEND = {
    category: true,
    id: 1,
    icon: PolicyIcon.category,
    display: PolicyDisplay.CompanyFriend,
    value: [
        POLICY_COMPANY,
        POLICY_FRIEND
    ]
};
/** @type {?} */
var SHARE_COMPANY = {
    category: true,
    id: 2,
    icon: PolicyIcon.Company,
    display: PolicyDisplay.Company,
    value: [
        POLICY_COMPANY
    ]
};
/** @type {?} */
var SHARE_FRIEND = {
    category: true,
    id: 3,
    icon: PolicyIcon.Friend,
    display: PolicyDisplay.Friend,
    value: [
        POLICY_FRIEND
    ]
};
/** @type {?} */
var SHARE_ME = {
    category: true,
    id: 4,
    icon: PolicyIcon.OnlyMe,
    display: PolicyDisplay.OnlyMe,
    value: [
        POLICY_ME
    ]
};
/**
 * @record
 */
function SocialMember() { }
if (false) {
    /** @type {?} */
    SocialMember.prototype.id;
    /** @type {?} */
    SocialMember.prototype.display;
    /** @type {?} */
    SocialMember.prototype.value;
    /** @type {?} */
    SocialMember.prototype.icon;
    /** @type {?|undefined} */
    SocialMember.prototype.username;
    /** @type {?|undefined} */
    SocialMember.prototype.category;
    /** @type {?|undefined} */
    SocialMember.prototype.group;
    /** @type {?|undefined} */
    SocialMember.prototype.selected;
    /** @type {?|undefined} */
    SocialMember.prototype.active;
    /** @type {?|undefined} */
    SocialMember.prototype._index;
}
/** @type {?} */
var LOCALNEWS = 'LOCALNEWS';
/** @type {?} */
var TASKNOTIFY = 'TASKNOTIFY';
/** @type {?} */
var PINNEWS = 'PINNEWS';
/** @type {?} */
var APP_ACTIVITY = 'iSocial-Activity';
/** @type {?} */
var APP_COMMENT = 'iSocial-Comment';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
        { type: FileFormatService$1 },
        { type: FrontViewService }
    ]; };
    return SocialService;
}());
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
function FavoriteParams() { }
if (false) {
    /** @type {?} */
    FavoriteParams.prototype.activity;
    /** @type {?|undefined} */
    FavoriteParams.prototype.remove;
}
/**
 * @record
 */
function BinaryParams() { }
if (false) {
    /** @type {?} */
    BinaryParams.prototype.binary;
    /** @type {?|undefined} */
    BinaryParams.prototype.activity;
    /** @type {?|undefined} */
    BinaryParams.prototype.comment;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var SocialComponent = /** @class */ (function () {
    function SocialComponent() {
    }
    SocialComponent.decorators = [
        { type: Component, args: [{
                    selector: 'social-wall',
                    template: '<div socialActivityList></div>'
                }] }
    ];
    return SocialComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var SocialActivity = /** @class */ (function () {
    function SocialActivity() {
    }
    return SocialActivity;
}());
if (false) {
    /** @type {?} */
    SocialActivity.prototype.activityID;
    /** @type {?} */
    SocialActivity.prototype.alias;
    /** @type {?} */
    SocialActivity.prototype.application;
    /** @type {?} */
    SocialActivity.prototype.contextID;
    /** @type {?} */
    SocialActivity.prototype.mpath;
    /** @type {?} */
    SocialActivity.prototype.path;
    /** @type {?} */
    SocialActivity.prototype.attachments;
    /** @type {?} */
    SocialActivity.prototype.avataUrl;
    /** @type {?} */
    SocialActivity.prototype.count;
    /** @type {?} */
    SocialActivity.prototype.fullname;
    /** @type {?} */
    SocialActivity.prototype.creator;
    /** @type {?} */
    SocialActivity.prototype.external;
    /** @type {?} */
    SocialActivity.prototype.firmContext;
    /** @type {?} */
    SocialActivity.prototype.likeCount;
    /** @type {?} */
    SocialActivity.prototype.likeStatus;
    /** @type {?} */
    SocialActivity.prototype.message;
    /** @type {?} */
    SocialActivity.prototype.organId;
    /** @type {?} */
    SocialActivity.prototype.policies;
    /** @type {?} */
    SocialActivity.prototype.pollAttached;
    /** @type {?} */
    SocialActivity.prototype.posted;
    /** @type {?} */
    SocialActivity.prototype.lastUpdate;
    /** @type {?} */
    SocialActivity.prototype.published;
    /** @type {?} */
    SocialActivity.prototype.type;
    /** @type {?} */
    SocialActivity.prototype.uuid;
    /** @type {?} */
    SocialActivity.prototype.comments;
    /** @type {?} */
    SocialActivity.prototype.images;
    /** @type {?} */
    SocialActivity.prototype.files;
    /** @type {?} */
    SocialActivity.prototype.editing;
    /** @type {?} */
    SocialActivity.prototype.isCreator;
    /** @type {?} */
    SocialActivity.prototype._policies;
    /** @type {?} */
    SocialActivity.prototype._policiesStr;
    /** @type {?} */
    SocialActivity.prototype._displayMessage;
    /** @type {?} */
    SocialActivity.prototype._openGraph;
    /** @type {?} */
    SocialActivity.prototype._localNews;
    /** @type {?} */
    SocialActivity.prototype._editable;
    /** @type {?} */
    SocialActivity.prototype._localNewsPin;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ShareMemberComponent = /** @class */ (function () {
    function ShareMemberComponent(socialService, accentService) {
        this.socialService = socialService;
        this.accentService = accentService;
        this.companyMode = true;
        this.companyCategories = [
            SHARE_COMPANY,
            SHARE_ME
        ];
        this.communityCategories = [
            SHARE_PUBLISH,
            SHARE_FRIEND,
            SHARE_ME
        ];
        this.groups = [];
        // All groups, members
        this.contacts = [];
        // Groups, members active
        this.members = [];
        this.friends = [];
        // Search data
        this.searchContacts = [];
        this.selectContacts = [];
        this.showMenu = false;
        this.policies = [];
        this.customActive = false;
        this._matchContacts = [];
        this._params = {
            pageSize: 10,
            pageNumber: 0,
            loading: false
        };
    }
    /**
     * @return {?}
     */
    ShareMemberComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        document.body.appendChild(this.shareModal._element.nativeElement);
        this.onCloseMenu = this.onCloseMenu.bind(this);
        document.addEventListener('click', this.onCloseMenu);
        this.init();
        setTimeout((/**
         * @return {?}
         */
        function () {
            if (_this.activity) {
                _this.setPolicies(_this.activity._policies);
            }
            else {
                _this.setPolicies();
            }
        }), 100);
    };
    /**
     * @return {?}
     */
    ShareMemberComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        document.removeEventListener('click', this.onCloseMenu);
        this._modalShowObserver.unsubscribe();
    };
    /**
     * @return {?}
     */
    ShareMemberComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._modalShowObserver = this.shareModal.onShown.subscribe((/**
         * @return {?}
         */
        function () {
            _this._focusInputMember();
            _this.searchMember();
        }));
    };
    /**
     * @return {?}
     */
    ShareMemberComponent.prototype.init = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.companyMode) {
            this.categories = this.companyCategories;
            // Load all users company
            /** @type {?} */
            var userAdded = [];
            this.socialService.searchMember({ pageSize: -1 }, (/**
             * @param {?} members
             * @return {?}
             */
            function (members) {
                members.forEach((/**
                 * @param {?} member
                 * @return {?}
                 */
                function (member) {
                    /** @type {?} */
                    var user = (/** @type {?} */ (_this._createSocialMember({
                        member: member.username,
                        display: member.fullname,
                        policy: Policy.Individual
                    })));
                    user.username = member.username;
                    _this.contacts.push(user);
                }));
                _this._sortMembers(_this.contacts);
            }));
        }
        else {
            this.categories = this.communityCategories;
            // Load all groups
            this.socialService.listGroups((/**
             * @param {?} groups
             * @return {?}
             */
            function (groups) {
                groups.forEach((/**
                 * @param {?} group
                 * @return {?}
                 */
                function (group) {
                    /** @type {?} */
                    var member = _this._createSocialMember({
                        display: group,
                        member: group,
                        policy: Policy.Friend
                    });
                    member.group = true;
                    _this.groups.push(member);
                    _this.contacts.push(member);
                }));
                _this._sortMembers(_this.groups);
                _this._sortMembers(_this.contacts);
            }));
            // Load all friends
            this.socialService.listFriends({ pageSize: -1 }, (/**
             * @param {?} members
             * @return {?}
             */
            function (members) {
                members.forEach((/**
                 * @param {?} member
                 * @return {?}
                 */
                function (member) {
                    /** @type {?} */
                    var user = _this._createSocialMember({
                        member: member.usercode,
                        display: member.fullname,
                        policy: Policy.Individual
                    });
                    user.username = member.usercode;
                    _this.friends.push(user);
                    _this.contacts.push(user);
                }));
                _this._sortMembers(_this.friends);
                _this._sortMembers(_this.contacts);
            }));
        }
        this.categories.forEach((/**
         * @param {?} category
         * @return {?}
         */
        function (category) { return category._index = _this._indexKeyToSearch(category.display); }));
        this.contacts = this.categories.slice();
    };
    /**
     * @return {?}
     */
    ShareMemberComponent.prototype.setDefault = /**
     * @return {?}
     */
    function () {
        this._resetActive();
        this._resetModal();
        this.closeMenu();
    };
    /**
     * @param {?=} members
     * @return {?}
     */
    ShareMemberComponent.prototype.setPolicies = /**
     * @param {?=} members
     * @return {?}
     */
    function (members) {
        this.setDefault();
        if (!members || members.length < 1) {
            members = [this.categories[0]];
        }
        // Set active category or group
        if (members.length === 1 && (members[0].category || members[0].group)) {
            members[0].active = true;
        }
        else {
            this.customActive = true;
        }
        /** @type {?} */
        var displays = [];
        /** @type {?} */
        var policies = [];
        for (var i = 0; i < members.length; i++) {
            /** @type {?} */
            var member = members[i];
            displays.push(member.display);
            policies = policies.concat(member.value);
        }
        this.policies = policies;
        this.display = displays.join(', ');
        this.displayIcon = members[0].icon;
        this.members = members;
    };
    /**
     * @param {?} params
     * @return {?}
     */
    ShareMemberComponent.prototype.injectPolicies = /**
     * @param {?} params
     * @return {?}
     */
    function (params) {
        if (this.policies.length < 1) {
            params.published = true;
            // params.element = JSON.stringify('[]');
        }
        else {
            params.element = JSON.stringify(this.policies);
        }
        return params;
    };
    /**
     * @param {?} member
     * @return {?}
     */
    ShareMemberComponent.prototype.selectMember = /**
     * @param {?} member
     * @return {?}
     */
    function (member) {
        this.setPolicies([member]);
        this.closeMenu();
    };
    /**
     * @return {?}
     */
    ShareMemberComponent.prototype.onCloseMenu = /**
     * @return {?}
     */
    function () {
        if (!this.isOpening()) {
            this.showMenu = false;
        }
    };
    /**
     * @return {?}
     */
    ShareMemberComponent.prototype.openSelectCustom = /**
     * @return {?}
     */
    function () {
        this.selectContacts = this.members.slice();
        this.shareModal.show();
        this._updateSelectContacts();
    };
    /**
     * @return {?}
     */
    ShareMemberComponent.prototype.closeMenu = /**
     * @return {?}
     */
    function () {
        this.showMenu = false;
    };
    /**
     * @return {?}
     */
    ShareMemberComponent.prototype.openMenu = /**
     * @return {?}
     */
    function () {
        this.showMenu = true;
    };
    /**
     * @return {?}
     */
    ShareMemberComponent.prototype.searchMember = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var value = this._indexKeyToSearch(this._getSearchKeyword());
        if (value) {
            this._matchContacts = this.contacts.filter((/**
             * @param {?} member
             * @return {?}
             */
            function (member) {
                return member._index.indexOf(value) > -1 ||
                    (typeof member.id === 'string' && member.id.indexOf(value) > -1);
            }));
        }
        else {
            this._matchContacts = this.contacts;
        }
        this._loadContacts(true);
    };
    /**
     * @param {?} member
     * @return {?}
     */
    ShareMemberComponent.prototype.addMember = /**
     * @param {?} member
     * @return {?}
     */
    function (member) {
        member.selected = !member.selected;
        if (member.selected) {
            if (!this.hasSelectedMember(member)) {
                this.selectContacts.push(member);
            }
        }
        else {
            this.removeMember(member);
        }
    };
    /**
     * @param {?} member
     * @return {?}
     */
    ShareMemberComponent.prototype.removeMember = /**
     * @param {?} member
     * @return {?}
     */
    function (member) {
        /** @type {?} */
        var index = this.getIndexMemberSelected(member);
        if (index > -1) {
            member.selected = false;
            this.selectContacts.splice(index, 1);
        }
    };
    /**
     * @param {?} member
     * @return {?}
     */
    ShareMemberComponent.prototype.hasSelectedMember = /**
     * @param {?} member
     * @return {?}
     */
    function (member) {
        return this.getIndexMemberSelected(member) > -1;
    };
    /**
     * @param {?} member
     * @return {?}
     */
    ShareMemberComponent.prototype.getIndexMemberSelected = /**
     * @param {?} member
     * @return {?}
     */
    function (member) {
        for (var i = 0; i < this.selectContacts.length; i++) {
            if (this.selectContacts[i].id === member.id) {
                return i;
            }
        }
        return -1;
    };
    /**
     * @return {?}
     */
    ShareMemberComponent.prototype.isOpening = /**
     * @return {?}
     */
    function () {
        return this.shareModal.isShown;
    };
    /**
     * @param {?} e
     * @return {?}
     */
    ShareMemberComponent.prototype.cancelChanges = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        e.stopPropagation();
        this.shareModal.hide();
    };
    /**
     * @param {?} e
     * @return {?}
     */
    ShareMemberComponent.prototype.saveChanges = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        e.stopPropagation();
        this.setPolicies(this.selectContacts);
        this.shareModal.hide();
        this.closeMenu();
    };
    /**
     * @param {?} e
     * @return {?}
     */
    ShareMemberComponent.prototype.onScrollContact = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        /** @type {?} */
        var node = e.target;
        if (!this._params.loading && node.scrollHeight - (node.scrollTop + node.clientHeight) <= 40) {
            this._loadContacts();
        }
    };
    /**
     * @private
     * @return {?}
     */
    ShareMemberComponent.prototype._scrollTopModal = /**
     * @private
     * @return {?}
     */
    function () {
        this.contactList.nativeElement.scrollTop = 0;
    };
    /**
     * @private
     * @return {?}
     */
    ShareMemberComponent.prototype._updateSelectContacts = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.contacts.forEach((/**
         * @param {?} member
         * @return {?}
         */
        function (member) { return member.selected = _this.hasSelectedMember(member); }));
    };
    /**
     * @private
     * @return {?}
     */
    ShareMemberComponent.prototype._resetActive = /**
     * @private
     * @return {?}
     */
    function () {
        this.categories.forEach((/**
         * @param {?} cat
         * @return {?}
         */
        function (cat) { return cat.active = false; }));
        this.groups.forEach((/**
         * @param {?} group
         * @return {?}
         */
        function (group) { return group.active = false; }));
        this.customActive = false;
    };
    /**
     * @private
     * @return {?}
     */
    ShareMemberComponent.prototype._resetModal = /**
     * @private
     * @return {?}
     */
    function () {
        this._params.loading = false;
        this._params.pageNumber = 0;
        this._matchContacts = [];
        this.selectContacts = [];
        this.searchContacts = [];
        this._setSearchKeyword('');
    };
    /**
     * @private
     * @param {?=} init
     * @return {?}
     */
    ShareMemberComponent.prototype._loadContacts = /**
     * @private
     * @param {?=} init
     * @return {?}
     */
    function (init) {
        this._params.loading = true;
        if (init) {
            this._scrollTopModal();
            this._params.pageNumber = 0;
            this.searchContacts = [];
        }
        this.searchContacts = this.searchContacts.concat(this._matchContacts.slice(this._params.pageNumber * this._params.pageSize, (this._params.pageNumber + 1) * this._params.pageSize));
        this._params.pageNumber += 1;
        this._params.loading = !this._hasContacts();
    };
    /**
     * @private
     * @return {?}
     */
    ShareMemberComponent.prototype._hasContacts = /**
     * @private
     * @return {?}
     */
    function () {
        return this._matchContacts.length > this._params.pageNumber * this._params.pageSize;
    };
    /**
     * @private
     * @param {?} members
     * @return {?}
     */
    ShareMemberComponent.prototype._sortMembers = /**
     * @private
     * @param {?} members
     * @return {?}
     */
    function (members) {
        members.sort((/**
         * @param {?} a
         * @param {?} b
         * @return {?}
         */
        function (a, b) { return a.display.localeCompare(b.display); }));
    };
    /**
     * @private
     * @param {?} str
     * @return {?}
     */
    ShareMemberComponent.prototype._indexKeyToSearch = /**
     * @private
     * @param {?} str
     * @return {?}
     */
    function (str) {
        return this.accentService.viToEn(str).toLowerCase();
    };
    /**
     * @private
     * @param {?} policyItem
     * @return {?}
     */
    ShareMemberComponent.prototype._createSocialMember = /**
     * @private
     * @param {?} policyItem
     * @return {?}
     */
    function (policyItem) {
        return {
            id: policyItem.member,
            display: policyItem.display,
            icon: this.socialService.getIconByType(policyItem.policy),
            value: [policyItem],
            _index: this._indexKeyToSearch(policyItem.display)
        };
    };
    /**
     * @private
     * @return {?}
     */
    ShareMemberComponent.prototype._focusInputMember = /**
     * @private
     * @return {?}
     */
    function () {
        this.inputMember.nativeElement.focus();
    };
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    ShareMemberComponent.prototype._setSearchKeyword = /**
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.inputMember.nativeElement.value = value;
    };
    /**
     * @private
     * @return {?}
     */
    ShareMemberComponent.prototype._getSearchKeyword = /**
     * @private
     * @return {?}
     */
    function () {
        return this.inputMember.nativeElement.value;
    };
    ShareMemberComponent.decorators = [
        { type: Component, args: [{
                    selector: '[socialShareMember]',
                    template: "<div class=\"group-share\">\n    <button (click)=\"$event.stopPropagation(); showMenu = !showMenu\" class=\"share-button btn btn-light active btn-sm\" tabindex=\"-1\" [title]=\"display\">\n        <div class=\"share-button_contain\">\n            <div class=\"share-button__padding\">\n                <i class=\"fa\" [ngClass]=\"displayIcon\"></i>\n            </div>\n            <div class=\"share-button__content\">\n                <div>{{display}}</div>\n            </div>\n            <div>\n                <i class=\"fa fa-caret-down\"></i>\n            </div>\n        </div>\n    </button>\n    <ul (click)=\"$event.stopPropagation()\" class=\"dropdown-menu share-menu\" [ngClass]=\"{'show': showMenu}\">\n        <li class=\"dropdown-header\">\n            Ai s\u1EBD nh\u00ECn th\u1EA5y n\u1ED9i dung n\u00E0y?\n        </li>\n\n        <li class=\"dropdown-item\" *ngFor=\"let category of categories\" (click)=\"selectMember(category)\">\n            <i class=\"fa {{category.icon}} group-share-icon\"></i> {{ category.display }}\n            <i [hidden]=\"!category.active\" class=\"fa fa-check category-check\"></i>\n        </li>\n\n        <li class=\"dropdown-item\" (click)=\"openSelectCustom()\">\n            <i class=\"fa fa-cog group-share-icon\"></i> T\u00F9y ch\u1ECDn...\n            <div *ngIf=\"customActive\">\n                <div class=\"custom-display\">{{display}}</div>\n                <i class=\"fa fa-check category-check\"></i>\n            </div>\n        </li>\n\n        <div *ngIf=\"groups.length\" class=\"seperate\"></div>\n        <li *ngFor=\"let group of groups\" class=\"dropdown-item\" (click)=\"selectMember(group)\">\n            <i class=\"fa group-share-icon\" [ngClass]=\"group.icon\"></i> {{group.display}}\n            <i [hidden]=\"!group.active\" class=\"fa fa-check category-check\"></i>\n        </li>\n    </ul>\n</div>\n\n<div class=\"modal fade\" bsModal #shareModal=\"bs-modal\" tabindex=\"-1\" role=\"dialog\">\n  <div class=\"modal-dialog\">\n    <div class=\"modal-content\">\n        <div class=\"modal-header\">\n            <h5 class=\"modal-title pull-left\">Chia s\u1EBB</h5>\n            <button type=\"button\" class=\"btn btn-primary btn-sm pull-right\" (click)=\"saveChanges($event)\" tabindex=\"-1\">\n                Xong\n            </button>\n        </div>\n        <div class=\"modal-body\">\n            <div class=\"auto-tag form-control contact-search\">\n                <div *ngFor=\"let member of selectContacts\" class=\"auto-tag-item\">\n                    <span>{{member.display}}</span>\n                    <i class=\"fa fa-times\" (click)=\"removeMember(member)\"></i>\n                </div>\n                <input #searchInput (keyup)=\"searchMember()\" type=\"text\" class=\"auto-tag-input\" placeholder=\"T\u00ECm ki\u1EBFm b\u1EA1n b\u00E8...\">\n            </div>\n\n            <div #contactList (scroll)=\"onScrollContact($event)\" class=\"contact-list\">\n                <div class=\"list-item list-avatar\" *ngFor=\"let member of searchContacts\" (click)=\"addMember(member)\">\n                    <img *ngIf=\"member.username; else icon\" userAvatar [usercode]=\"member.username\" class=\"list-item__image\">\n                    <ng-template #icon>\n                        <i class=\"list-item__icon fa\" [ngClass]=\"member.icon\"></i>\n                    </ng-template>\n                    <div class=\"list-item__content\">{{member.display}}</div>\n                    <label class=\"checkbox-container\">\n                        <input type=\"checkbox\" [checked]=\"member.selected\" disabled>\n                        <span class=\"checkmark\"></span>\n                    </label>\n                </div>\n            </div>\n        </div>\n    </div>\n  </div>\n</div>\n",
                    styles: [".auto-tag{display:flex;flex-wrap:wrap;height:auto;padding-bottom:0}.auto-tag .auto-tag-item{display:flex;align-items:center;border-radius:4px;background:#eee;padding:0 10px;white-space:nowrap;margin:0 5px 5px 0}.auto-tag .auto-tag-item i{cursor:pointer;padding:5px;margin-right:-5px}.auto-tag .auto-tag-input{border:0;outline:0}.checkbox-container{display:block;position:relative;cursor:pointer;font-size:22px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;min-width:20px;min-height:20px;margin:0}.checkbox-container input{position:absolute;opacity:0;cursor:pointer}.checkbox-container .checkmark{position:absolute;top:0;left:0;height:20px;width:20px;background-color:#eee;border-radius:4px}.checkbox-container .checkmark:after{content:\"\";position:absolute;display:none;left:8px;top:4px;width:5px;height:10px;border:solid #fff;border-width:0 3px 3px 0;transform:rotate(45deg)}.checkbox-container:hover .checkmark{background-color:#ccc}.checkbox-container input:checked+.checkmark{background-color:#2196f3}.checkbox-container input:checked+.checkmark:after{display:block}.list-avatar{padding:5px 10px;overflow:hidden;cursor:pointer;margin-bottom:5px;display:flex;align-items:center}.list-item__icon,.list-item__image{width:32px;height:32px;border-radius:50%}.list-item__icon{line-height:32px;text-align:center;background:rgba(0,0,0,.05);color:rgba(0,0,0,.5)}.list-item__content{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding:0 15px;line-height:32px;flex-grow:1}", ".share-menu{max-height:300px;max-width:300px;overflow:auto}.seperate{margin:5px 20px;border-top:1px solid #eee}.group-share{position:relative;display:inline-block}.group-share-icon{width:22px}.dropdown-header,.dropdown-item{position:relative;font-size:14px;cursor:pointer;padding-left:32px}.category-check{position:absolute;left:8px;top:7px}.share-button{max-width:300px}.share-button_contain{display:flex}.share-button__content,.share-button__padding{padding-right:5px}.share-button__content{overflow:hidden}.share-button__content div{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.custom-display{font-size:13px;color:rgba(0,0,0,.6);line-height:15px;white-space:normal}.contact-list{height:300px;overflow:auto;margin-top:10px}@media (max-width:480px){.share-button{max-width:220px}.contact-search{max-height:140px;overflow:auto}.contact-list{height:200px}}"]
                }] }
    ];
    /** @nocollapse */
    ShareMemberComponent.ctorParameters = function () { return [
        { type: SocialService },
        { type: AccentService }
    ]; };
    ShareMemberComponent.propDecorators = {
        shareModal: [{ type: ViewChild, args: ['shareModal',] }],
        inputMember: [{ type: ViewChild, args: ['searchInput',] }],
        contactList: [{ type: ViewChild, args: ['contactList',] }],
        companyMode: [{ type: Input }],
        activity: [{ type: Input }]
    };
    return ShareMemberComponent;
}());
if (false) {
    /** @type {?} */
    ShareMemberComponent.prototype.shareModal;
    /** @type {?} */
    ShareMemberComponent.prototype.inputMember;
    /** @type {?} */
    ShareMemberComponent.prototype.contactList;
    /** @type {?} */
    ShareMemberComponent.prototype.companyMode;
    /** @type {?} */
    ShareMemberComponent.prototype.activity;
    /** @type {?} */
    ShareMemberComponent.prototype.categories;
    /** @type {?} */
    ShareMemberComponent.prototype.companyCategories;
    /** @type {?} */
    ShareMemberComponent.prototype.communityCategories;
    /** @type {?} */
    ShareMemberComponent.prototype.groups;
    /** @type {?} */
    ShareMemberComponent.prototype.contacts;
    /** @type {?} */
    ShareMemberComponent.prototype.members;
    /** @type {?} */
    ShareMemberComponent.prototype.friends;
    /** @type {?} */
    ShareMemberComponent.prototype.searchContacts;
    /** @type {?} */
    ShareMemberComponent.prototype.selectContacts;
    /** @type {?} */
    ShareMemberComponent.prototype.showMenu;
    /** @type {?} */
    ShareMemberComponent.prototype.displayIcon;
    /** @type {?} */
    ShareMemberComponent.prototype.display;
    /** @type {?} */
    ShareMemberComponent.prototype.policies;
    /** @type {?} */
    ShareMemberComponent.prototype.customActive;
    /**
     * @type {?}
     * @private
     */
    ShareMemberComponent.prototype._matchContacts;
    /**
     * @type {?}
     * @private
     */
    ShareMemberComponent.prototype._params;
    /**
     * @type {?}
     * @private
     */
    ShareMemberComponent.prototype._modalShowObserver;
    /**
     * @type {?}
     * @private
     */
    ShareMemberComponent.prototype.socialService;
    /**
     * @type {?}
     * @private
     */
    ShareMemberComponent.prototype.accentService;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ProgressComponent = /** @class */ (function () {
    function ProgressComponent(el) {
        this.el = el;
        this.hide();
    }
    /**
     * @return {?}
     */
    ProgressComponent.prototype.show = /**
     * @return {?}
     */
    function () {
        this.el.nativeElement.hidden = false;
    };
    /**
     * @return {?}
     */
    ProgressComponent.prototype.hide = /**
     * @return {?}
     */
    function () {
        this.el.nativeElement.hidden = true;
    };
    ProgressComponent.decorators = [
        { type: Component, args: [{
                    selector: 'progress-indicator',
                    template: "<div class=\"progress-material\">\n    <div class=\"indeterminate\"></div>\n</div>\n",
                    styles: [":host{position:absolute;top:0;right:0;bottom:0;left:0;background:rgba(255,255,255,.5)}.progress,progress[value]{width:100%;border:none;margin:5px 0;height:5px;display:block;-moz-appearance:none;appearance:none;-webkit-appearance:none}.progress::-webkit-progress-bar,progress[value]::-webkit-progress-bar{background-color:#e2ecfe}.progress::-webkit-progress-value,progress[value]::-webkit-progress-value{background-color:#387ef5}.progress-material{position:relative;height:4px;display:block;width:100%;background-color:#e2ecfe;border-radius:2px;overflow:hidden}.progress-material .indeterminate{background-color:#387ef5}.progress-material .indeterminate:before{content:'';position:absolute;background-color:inherit;top:0;left:0;bottom:0;will-change:left,right;-webkit-animation:2.1s cubic-bezier(.65,.815,.735,.395) infinite indeterminate;animation:2.1s cubic-bezier(.65,.815,.735,.395) infinite indeterminate}.progress-material .indeterminate:after{content:'';position:absolute;background-color:inherit;top:0;left:0;bottom:0;will-change:left,right;-webkit-animation:2.1s cubic-bezier(.165,.84,.44,1) infinite indeterminate-short;animation:2.1s cubic-bezier(.165,.84,.44,1) infinite indeterminate-short;-webkit-animation-delay:1.15s;animation-delay:1.15s}@-webkit-keyframes indeterminate{0%{left:-35%;right:100%}100%,60%{left:100%;right:-90%}}@keyframes indeterminate{0%{left:-35%;right:100%}100%,60%{left:100%;right:-90%}}@-webkit-keyframes indeterminate-short{0%{left:-200%;right:100%}100%,60%{left:107%;right:-8%}}@keyframes indeterminate-short{0%{left:-200%;right:100%}100%,60%{left:107%;right:-8%}}"]
                }] }
    ];
    /** @nocollapse */
    ProgressComponent.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    return ProgressComponent;
}());
if (false) {
    /**
     * @type {?}
     * @private
     */
    ProgressComponent.prototype.el;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ActivityPostComponent = /** @class */ (function () {
    function ActivityPostComponent(socialService) {
        this.socialService = socialService;
        this.shareMemberEnable = false;
        this.linkPreviewEnable = false;
        this.enterPost = false;
        this.showWithAnimation = false;
        this.placeHolder = 'Nội dung chia sẻ...';
        this.companyMode = true;
        this.onCancel = new EventEmitter();
        this.onPost = new EventEmitter();
        this.message = '';
        this.files = [];
        this.removeFiles = [];
        // Detect link with space at end "http://innetcloud.vn "
        this.linkRegex = /(https?:\/\/[^\s]+)/;
        this._clickOut = false;
    }
    /**
     * @return {?}
     */
    ActivityPostComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.postEl = this.postElement.nativeElement;
        // on paste detect link
        this.messageEl.nativeElement.addEventListener('paste', (/**
         * @return {?}
         */
        function () {
            setTimeout((/**
             * @return {?}
             */
            function () {
                _this.detectLink();
            }), 0);
        }));
        this.focusOutHideForm = this.focusOutHideForm.bind(this);
        document.addEventListener('click', this.focusOutHideForm);
        if (this.activity) {
            this.editActivity(this.activity);
        }
    };
    /**
     * @return {?}
     */
    ActivityPostComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        document.removeEventListener('click', this.focusOutHideForm);
    };
    /**
     * @param {?} e
     * @return {?}
     */
    ActivityPostComponent.prototype.focusOutHideForm = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        var _this = this;
        // Click inside
        if (e.target.isSameNode(this.postEl) || this.postEl.contains(e.target)) {
            return;
        }
        if (this._clickOut) {
            return;
        }
        this._clickOut = true;
        if (!this.isFocusForm() && !this.hasData() && !this.isShareMemberOpening()) {
            this.closeForm();
        }
        setTimeout((/**
         * @return {?}
         */
        function () {
            _this._clickOut = false;
        }), 500);
    };
    /**
     * @return {?}
     */
    ActivityPostComponent.prototype.isFocusForm = /**
     * @return {?}
     */
    function () {
        return $(this.postEl).find(':focus').length > 0;
    };
    /**
     * @param {?} e
     * @return {?}
     */
    ActivityPostComponent.prototype.enterPostForm = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        if (this.enterPost) {
            e.preventDefault();
            this.postActivity();
        }
    };
    /**
     * @return {?}
     */
    ActivityPostComponent.prototype.postActivity = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var params = this.getData();
        if (!params.message) {
            this.focusMessage();
            return;
        }
        this.onPost.emit(params);
        this.indicator.show();
    };
    /**
     * @return {?}
     */
    ActivityPostComponent.prototype.getData = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var params = {
            message: this.message
        };
        // File upload
        for (var i = 0; i < this.files.length; i++) {
            if (!this.files[i].id) {
                params['file-' + i] = this.files[i];
            }
        }
        // File removed
        /** @type {?} */
        var fileRemoved = this.getUuidFileRemoved();
        if (fileRemoved) {
            params.gridfsUUID = fileRemoved;
        }
        if (this.activity) {
            params.activity = this.activity.uuid;
        }
        if (this.shareMember) {
            this.shareMember.injectPolicies(params);
        }
        if (this.linkPreview && this.linkPreview.getData()) {
            params.openGraph = this.linkPreview.getData();
        }
        return params;
    };
    /**
     * @return {?}
     */
    ActivityPostComponent.prototype.hasData = /**
     * @return {?}
     */
    function () {
        return this.message || this.files.length;
    };
    /**
     * @param {?} activity
     * @return {?}
     */
    ActivityPostComponent.prototype.editActivity = /**
     * @param {?} activity
     * @return {?}
     */
    function (activity) {
        this.resetForm();
        this.activity = activity;
        this.message = activity.message;
        this.files = this.socialService.attachmentToFiles(activity.attachments);
        this.focusMessage();
        // if (this.shareMember) {
        //     this.shareMember.setPolicies(activity._policies);
        // }
        if (activity._openGraph && this.linkPreview) {
            this.linkPreview.setData(activity._openGraph);
        }
        this.showForm(true);
        // Trigger input to adjust size
        this.resizeInput();
    };
    /**
     * @return {?}
     */
    ActivityPostComponent.prototype.resetForm = /**
     * @return {?}
     */
    function () {
        // Clear data
        this.message = '';
        this.files.length = 0;
        this.removeFiles.length = 0;
        if (this.linkPreview) {
            this.linkPreview.clearData();
        }
        if (this.indicator) {
            this.indicator.hide();
        }
        this.resizeInput();
    };
    /**
     * @return {?}
     */
    ActivityPostComponent.prototype.typeMessage = /**
     * @return {?}
     */
    function () {
        if (this.message.trim() && this.message.slice(-1) === ' ') {
            this.detectLink();
        }
    };
    /**
     * @return {?}
     */
    ActivityPostComponent.prototype.closeForm = /**
     * @return {?}
     */
    function () {
        this.resetForm();
        this.hideForm(true);
        if (this.activity) {
            this.onCancel.emit(this.activity);
            this.activity = null;
        }
    };
    /**
     * @param {?=} noTransition
     * @return {?}
     */
    ActivityPostComponent.prototype.showForm = /**
     * @param {?=} noTransition
     * @return {?}
     */
    function (noTransition) {
        var _this = this;
        if (this.postEl.isShow) {
            return;
        }
        if (!this.showWithAnimation && !noTransition) {
            noTransition = true;
        }
        if (noTransition) {
            this.setFormHeight('auto');
            this.postEl.style.overflow = 'visible';
        }
        else {
            this.setPostHeight();
            setTimeout((/**
             * @return {?}
             */
            function () {
                _this.setFormHeight('auto');
                _this.postEl.style.overflow = 'visible';
            }), 400);
        }
        this.focusMessage();
        this.postEl.isShow = true;
    };
    /**
     * @param {?=} noTransition
     * @return {?}
     */
    ActivityPostComponent.prototype.hideForm = /**
     * @param {?=} noTransition
     * @return {?}
     */
    function (noTransition) {
        var _this = this;
        if (!this.postEl.isShow) {
            return;
        }
        if (!this.showWithAnimation && !noTransition) {
            noTransition = true;
        }
        if (noTransition) {
            this.setFormHeight('');
        }
        else {
            this.setPostHeight();
            setTimeout((/**
             * @return {?}
             */
            function () {
                _this.setFormHeight('');
            }), 0);
        }
        this.postEl.style.overflow = 'hidden';
        this.postEl.isShow = false;
    };
    /**
     * @return {?}
     */
    ActivityPostComponent.prototype.isShareMemberOpening = /**
     * @return {?}
     */
    function () {
        return this.shareMember && this.shareMember.isOpening();
    };
    /**
     * @return {?}
     */
    ActivityPostComponent.prototype.focusMessage = /**
     * @return {?}
     */
    function () {
        this.messageEl.nativeElement.focus();
    };
    /**
     * @return {?}
     */
    ActivityPostComponent.prototype.resizeInput = /**
     * @return {?}
     */
    function () {
        var _this = this;
        setTimeout((/**
         * @return {?}
         */
        function () {
            _this.messageAutoSize.adjust();
        }), 0);
    };
    /**
     * @private
     * @return {?}
     */
    ActivityPostComponent.prototype.detectLink = /**
     * @private
     * @return {?}
     */
    function () {
        if (!this.linkPreviewEnable || !this.linkPreview) {
            return;
        }
        // Only one link preview
        if (this.linkPreview.isPreview()) {
            return;
        }
        /** @type {?} */
        var links = this.linkRegex.exec(this.message);
        if (links && links.length > 0) {
            this.linkPreview.setLink(links[0]);
        }
    };
    /**
     * @private
     * @return {?}
     */
    ActivityPostComponent.prototype.setPostHeight = /**
     * @private
     * @return {?}
     */
    function () {
        this.setFormHeight(this.postEl.scrollHeight + 'px');
    };
    /**
     * @private
     * @param {?} height
     * @return {?}
     */
    ActivityPostComponent.prototype.setFormHeight = /**
     * @private
     * @param {?} height
     * @return {?}
     */
    function (height) {
        this.postEl.style.height = height;
    };
    /**
     * @private
     * @return {?}
     */
    ActivityPostComponent.prototype.getUuidFileRemoved = /**
     * @private
     * @return {?}
     */
    function () {
        return this.removeFiles.filter((/**
         * @param {?} file
         * @return {?}
         */
        function (file) { return file.id; })).map((/**
         * @param {?} file
         * @return {?}
         */
        function (file) { return file.id; })).join(',');
    };
    ActivityPostComponent.decorators = [
        { type: Component, args: [{
                    selector: '[activityPost]',
                    template: "<div class=\"message-post\" #postElement>\n    <textarea class=\"text-secondary\"\n            rows=\"1\"\n            [placeholder]=\"placeHolder\"\n            #messageEl\n            appAutoSize\n            (input)=\"typeMessage()\"\n            (keydown.esc)=\"closeForm()\"\n            (keydown.enter)=\"enterPostForm($event)\"\n            [(ngModel)]=\"message\"\n            (click)=\"showForm()\"></textarea>\n\n    <app-link-preview *ngIf=\"linkPreviewEnable\"></app-link-preview>\n\n    <file-list class=\"social-block\" [fileEl]=\"fileEl\" [files]=\"files\" (onRemove)=\"removeFiles.push($event)\"></file-list>\n\n    <div class=\"message-post__bottom\">\n        <button class=\"btn btn-light btn-sm active post-action__btn\" tabindex=\"-1\">\n            <i class=\"fa fa-image\"></i>\n            <input #fileEl type=\"file\" multiple class=\"file-post\">\n        </button>\n\n        <div class=\"message-post__share\" *ngIf=\"shareMemberEnable\"\n             socialShareMember\n             [activity]=\"activity\"\n             [companyMode]=\"companyMode\"></div>\n\n        <div>\n            <button class=\"btn btn-light btn-sm active\" (click)=\"closeForm()\">\u0110\u00D3NG</button>\n            <button class=\"btn btn-primary btn-sm ml-1\" (click)=\"postActivity()\">\n                {{activity ? 'C\u1EACP NH\u1EACT' : '\u0110\u0102NG'}}\n            </button>\n        </div>\n    </div>\n</div>\n\n<progress-indicator></progress-indicator>\n",
                    styles: [".social-block{display:block;margin-top:10px}:host{position:relative}.message-post{overflow:hidden;transition-duration:.3s;height:32px}.message-post__bottom{display:flex;flex-wrap:wrap;margin-top:-10px;margin-bottom:2px}.message-post__bottom>*{margin-top:10px}.message-post__share{margin-left:5px;margin-right:10px;flex-grow:1;display:inline-block}.post-action__btn{position:relative;overflow:hidden;min-width:34px}.post-avatar{float:left;height:40px;width:40px;border-radius:50%;margin-right:10px}textarea{border:0;width:100%;padding:5px 0;outline:0;background:inherit;resize:none;color:#6c757d;min-height:30px}.textarea-comment{padding:7px;background:#e3e5e5;border-radius:4px}file-chooser-list{margin:10px 0;display:block}.file-post{position:absolute;-webkit-appearance:none;-moz-appearance:none;appearance:none;top:0;right:0;bottom:0;left:0;width:100%;height:100%;opacity:0;z-index:100}"]
                }] }
    ];
    /** @nocollapse */
    ActivityPostComponent.ctorParameters = function () { return [
        { type: SocialService }
    ]; };
    ActivityPostComponent.propDecorators = {
        activity: [{ type: Input }],
        shareMemberEnable: [{ type: Input }],
        linkPreviewEnable: [{ type: Input }],
        enterPost: [{ type: Input }],
        showWithAnimation: [{ type: Input }],
        placeHolder: [{ type: Input }],
        companyMode: [{ type: Input }],
        onCancel: [{ type: Output }],
        onPost: [{ type: Output }],
        postElement: [{ type: ViewChild, args: ['postElement',] }],
        messageEl: [{ type: ViewChild, args: ['messageEl',] }],
        shareMember: [{ type: ViewChild, args: [ShareMemberComponent,] }],
        messageAutoSize: [{ type: ViewChild, args: [AutoSizeDirective,] }],
        linkPreview: [{ type: ViewChild, args: [LinkPreviewComponent,] }],
        indicator: [{ type: ViewChild, args: [ProgressComponent,] }]
    };
    return ActivityPostComponent;
}());
if (false) {
    /** @type {?} */
    ActivityPostComponent.prototype.activity;
    /** @type {?} */
    ActivityPostComponent.prototype.shareMemberEnable;
    /** @type {?} */
    ActivityPostComponent.prototype.linkPreviewEnable;
    /** @type {?} */
    ActivityPostComponent.prototype.enterPost;
    /** @type {?} */
    ActivityPostComponent.prototype.showWithAnimation;
    /** @type {?} */
    ActivityPostComponent.prototype.placeHolder;
    /** @type {?} */
    ActivityPostComponent.prototype.companyMode;
    /** @type {?} */
    ActivityPostComponent.prototype.onCancel;
    /** @type {?} */
    ActivityPostComponent.prototype.onPost;
    /** @type {?} */
    ActivityPostComponent.prototype.postElement;
    /** @type {?} */
    ActivityPostComponent.prototype.messageEl;
    /** @type {?} */
    ActivityPostComponent.prototype.shareMember;
    /** @type {?} */
    ActivityPostComponent.prototype.messageAutoSize;
    /** @type {?} */
    ActivityPostComponent.prototype.linkPreview;
    /** @type {?} */
    ActivityPostComponent.prototype.indicator;
    /** @type {?} */
    ActivityPostComponent.prototype.message;
    /** @type {?} */
    ActivityPostComponent.prototype.files;
    /** @type {?} */
    ActivityPostComponent.prototype.removeFiles;
    /**
     * @type {?}
     * @private
     */
    ActivityPostComponent.prototype.linkRegex;
    /**
     * @type {?}
     * @private
     */
    ActivityPostComponent.prototype.postEl;
    /**
     * @type {?}
     * @private
     */
    ActivityPostComponent.prototype._clickOut;
    /**
     * @type {?}
     * @private
     */
    ActivityPostComponent.prototype.socialService;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var SocialEmbedComponent = /** @class */ (function () {
    function SocialEmbedComponent(socialService) {
        this.socialService = socialService;
        this.allowComment = true;
        this.onLoad = new EventEmitter();
        this.onError = new EventEmitter();
        this.totalComments = 0;
    }
    /**
     * @return {?}
     */
    SocialEmbedComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (this.activity) {
            this._loaded();
        }
        else {
            this._loadActivity();
        }
    };
    /**
     * @private
     * @return {?}
     */
    SocialEmbedComponent.prototype._loadActivity = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var params;
        if (this.activityID) {
            params = {
                activity: this.activityID
            };
        }
        else if (this.contextID && this.application) {
            params = {
                contextID: this.contextID,
                application: this.application
            };
        }
        if (params) {
            this.socialService.activityLoad(params, (/**
             * @param {?} activity
             * @param {?} err
             * @return {?}
             */
            function (activity, err) {
                if (err) {
                    _this.onError.emit(err);
                }
                else {
                    if (activity.errors) {
                        _this.onError.emit(activity);
                    }
                    else {
                        _this.activity = activity;
                        _this._loaded();
                    }
                }
            }));
        }
        else {
            this.onError.emit({
                message: 'NOT_FOUND'
            });
        }
    };
    /**
     * @private
     * @return {?}
     */
    SocialEmbedComponent.prototype._loaded = /**
     * @private
     * @return {?}
     */
    function () {
        this.onLoad.emit(this.activity);
    };
    SocialEmbedComponent.decorators = [
        { type: Component, args: [{
                    selector: 'social-discussion',
                    template: "<div *ngIf=\"activity\" socialCommentList\n     [activity]=\"activity\"\n     [allowComment]=\"allowComment\"\n     (commentLoad)=\"totalComments = $event.total\"></div>\n",
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    SocialEmbedComponent.ctorParameters = function () { return [
        { type: SocialService }
    ]; };
    SocialEmbedComponent.propDecorators = {
        activityID: [{ type: Input }],
        contextID: [{ type: Input }],
        application: [{ type: Input }],
        activity: [{ type: Input }],
        allowComment: [{ type: Input }],
        onLoad: [{ type: Output }],
        onError: [{ type: Output }]
    };
    return SocialEmbedComponent;
}());
if (false) {
    /** @type {?} */
    SocialEmbedComponent.prototype.activityID;
    /** @type {?} */
    SocialEmbedComponent.prototype.contextID;
    /** @type {?} */
    SocialEmbedComponent.prototype.application;
    /** @type {?} */
    SocialEmbedComponent.prototype.activity;
    /** @type {?} */
    SocialEmbedComponent.prototype.allowComment;
    /** @type {?} */
    SocialEmbedComponent.prototype.onLoad;
    /** @type {?} */
    SocialEmbedComponent.prototype.onError;
    /** @type {?} */
    SocialEmbedComponent.prototype.totalComments;
    /**
     * @type {?}
     * @private
     */
    SocialEmbedComponent.prototype.socialService;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ActivityComponent = /** @class */ (function () {
    function ActivityComponent(socialService, modalService) {
        this.socialService = socialService;
        this.modalService = modalService;
        this.onUpdated = new EventEmitter();
        this.onDeleted = new EventEmitter();
        this.editing = false;
        this.viewDate = this.socialService.viewDate;
    }
    /**
     * @return {?}
     */
    ActivityComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        if (this.policiesDisplay) {
            /** @type {?} */
            var title = [];
            /** @type {?} */
            var maxDisplay = 8;
            for (var i = 0; i < this.activity._policies.length; i++) {
                title.push(this.activity._policies[i].display);
                if (title.length >= maxDisplay) {
                    title.push('và ' + (this.activity._policies.length - maxDisplay) + ' người khác...');
                    break;
                }
            }
            $(this.policiesDisplay.nativeElement)['tooltip']({
                title: title.join('<br>'),
                html: true
            });
        }
    };
    /**
     * @return {?}
     */
    ActivityComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.declineDelete();
    };
    /**
     * @return {?}
     */
    ActivityComponent.prototype.activityEdit = /**
     * @return {?}
     */
    function () {
        this.editing = true;
    };
    /**
     * @return {?}
     */
    ActivityComponent.prototype.activityCancelEdit = /**
     * @return {?}
     */
    function () {
        this.editing = false;
    };
    /**
     * @return {?}
     */
    ActivityComponent.prototype.activityDelete = /**
     * @return {?}
     */
    function () {
        this._modalRef = this.modalService.show(this.tmpConfirmDelete, { class: 'modal-sm' });
    };
    /**
     * @return {?}
     */
    ActivityComponent.prototype.confirmDelete = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.socialService.activityRemove({ activity: this.activity.uuid }, (/**
         * @param {?} activity
         * @return {?}
         */
        function (activity) {
            if (activity && activity.uuid) {
                _this.onDeleted.emit(activity);
            }
        }));
    };
    /**
     * @return {?}
     */
    ActivityComponent.prototype.declineDelete = /**
     * @return {?}
     */
    function () {
        if (this._modalRef) {
            this._modalRef.hide();
            this._modalRef = null;
        }
    };
    /**
     * @return {?}
     */
    ActivityComponent.prototype.activityLike = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var params = {
            activity: this.activity.uuid
        };
        this.activity.likeStatus = !this.activity.likeStatus;
        if (this.activity.likeStatus) {
            this.activity.likeCount++;
            this.socialService.activityLike(params, (/**
             * @param {?} data
             * @return {?}
             */
            function (data) {
            }));
        }
        else {
            this.activity.likeCount--;
            this.socialService.activityUnLike(params, (/**
             * @param {?} data
             * @return {?}
             */
            function (data) {
            }));
        }
    };
    /**
     * @param {?} data
     * @return {?}
     */
    ActivityComponent.prototype.activityUpdate = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        var _this = this;
        this.socialService.activityUpdate(data, (/**
         * @param {?} activity
         * @return {?}
         */
        function (activity) {
            if (activity && activity.uuid) {
                _this.onUpdated.emit(activity);
                _this.editing = false;
            }
        }));
    };
    ActivityComponent.decorators = [
        { type: Component, args: [{
                    selector: '[socialActivity]',
                    template: "<div class=\"social-card\">\n    <i *ngIf=\"activity._localNewsPin\" class=\"social-mark fa fa-thumb-tack\" title=\"Tin \u0111\u01B0\u1EE3c ghim\"></i>\n    <div>\n        <img userAvatar [usercode]=\"activity.creator\" class=\"activity-info__avatar\">\n\n        <div actionMore dropdown\n             *ngIf=\"activity._editable\"\n             [data]=\"activity\"\n             (onEdit)=\"activityEdit()\"\n             (onDelete)=\"activityDelete()\" class=\"social-action-more\"></div>\n\n        <div style=\"overflow:hidden\">\n            <div class=\"activity-info__name\">\n                <b>{{ activity.fullname }}</b>\n                <span data-placement=\"bottom\" #policiesDisplay *ngIf=\"activity._policiesStr\">\n                    <i class=\"ml-1 fa fa-caret-right\"></i>\n                    {{ activity._policiesStr }}\n                </span>\n            </div>\n            <div class=\"activity-info__time\">\n                <span [title]=\"activity.posted | date:viewDate\">{{ activity.posted | dateShortcut }}</span>\n            </div>\n        </div>\n    </div>\n\n    <div *ngIf=\"!editing; else activityPost\">\n        <div messageBody [feed]=\"activity\" style=\"margin-top:20px\"></div>\n        <div class=\"social-block\">\n            <button class=\"social-flat-btn\" (click)=\"activityLike()\" [ngClass]=\"{'active': activity.likeStatus}\">\n                <i class=\"fa fa-thumbs-up\"></i>\n                <span *ngIf=\"activity.likeCount\">{{activity.likeCount}}</span>\n            </button>\n            <button class=\"social-flat-btn\" (click)=\"commentList.focusForm()\">\n                <i class=\"fa fa-comment\"></i>\n                <span>{{activity.comments?.length || ''}}</span>\n            </button>\n        </div>\n    </div>\n\n    <div class=\"social-block activity-comment\" socialCommentList #commentList [activity]=\"activity\"></div>\n</div>\n\n<ng-template #activityPost>\n    <div activityPost\n         [activity]=\"activity\"\n         [linkPreviewEnable]=\"true\"\n         [shareMemberEnable]=\"true\"\n         (onPost)=\"activityUpdate($event)\"\n         (onCancel)=\"activityCancelEdit()\" class=\"social-block\"></div>\n</ng-template>\n\n<ng-template #tmpConfirmDelete>\n    <div class=\"modal-body text-center\">\n        <p>B\u1EA3n tin s\u1EBD b\u1ECB xo\u00E1 v\u00E0 kh\u00F4ng th\u1EC3 ph\u1EE5c h\u1ED3i</p>\n        <button type=\"button\" class=\"btn btn-secondary m-1\" (click)=\"declineDelete()\" >Hu\u1EF7</button>\n        <button type=\"button\" class=\"btn btn-danger m-1\" (click)=\"confirmDelete()\" >Xo\u00E1</button>\n    </div>\n</ng-template>\n",
                    styles: [".social-action-more{float:right;margin:-5px -10px 0 0}.social-flat-btn{line-height:26px;text-align:center;color:rgba(0,0,0,.5);margin-right:15px;display:inline-block;outline:0!important;border:0;padding:0 7px;background:0 0}.social-flat-btn i{line-height:inherit;font-size:16px}.social-flat-btn span{margin-left:5px}.social-flat-btn.active,.social-flat-btn:hover{color:#2067b0}.social-block{display:block;margin-top:10px}.social-card{position:relative;border-radius:2px;padding:15px;background:#fff;font-size:14px;margin-bottom:15px}.activity-info__avatar{float:left;width:40px;height:40px;border-radius:50%;overflow:hidden;margin-right:10px}.activity-info__name{color:#2067b0}.activity-info__time{font-size:12px;color:#6c757d}.activity-comment{border-top:1px solid rgba(0,0,0,.05);padding-top:5px;margin-bottom:-10px}"]
                }] }
    ];
    /** @nocollapse */
    ActivityComponent.ctorParameters = function () { return [
        { type: SocialService },
        { type: BsModalService }
    ]; };
    ActivityComponent.propDecorators = {
        activity: [{ type: Input }],
        onUpdated: [{ type: Output }],
        onDeleted: [{ type: Output }],
        policiesDisplay: [{ type: ViewChild, args: ['policiesDisplay',] }],
        tmpConfirmDelete: [{ type: ViewChild, args: ['tmpConfirmDelete',] }]
    };
    return ActivityComponent;
}());
if (false) {
    /** @type {?} */
    ActivityComponent.prototype.activity;
    /** @type {?} */
    ActivityComponent.prototype.onUpdated;
    /** @type {?} */
    ActivityComponent.prototype.onDeleted;
    /** @type {?} */
    ActivityComponent.prototype.policiesDisplay;
    /** @type {?} */
    ActivityComponent.prototype.tmpConfirmDelete;
    /** @type {?} */
    ActivityComponent.prototype.viewDate;
    /** @type {?} */
    ActivityComponent.prototype.editing;
    /**
     * @type {?}
     * @private
     */
    ActivityComponent.prototype._modalRef;
    /**
     * @type {?}
     * @private
     */
    ActivityComponent.prototype.socialService;
    /**
     * @type {?}
     * @private
     */
    ActivityComponent.prototype.modalService;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var SocialComment = /** @class */ (function (_super) {
    __extends(SocialComment, _super);
    function SocialComment() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SocialComment;
}(SocialActivity));
if (false) {
    /** @type {?} */
    SocialComment.prototype.activityID;
    /** @type {?} */
    SocialComment.prototype.policyInherit;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var CommentComponent = /** @class */ (function () {
    function CommentComponent(socialService) {
        this.socialService = socialService;
        this.editable = true;
        this.onUpdated = new EventEmitter();
        this.onDeleted = new EventEmitter();
        this.viewDate = this.socialService.viewDate;
    }
    /**
     * @return {?}
     */
    CommentComponent.prototype.commentCancelEdit = /**
     * @return {?}
     */
    function () {
        this.editing = false;
    };
    /**
     * @return {?}
     */
    CommentComponent.prototype.commentEdit = /**
     * @return {?}
     */
    function () {
        this.editing = true;
    };
    /**
     * @param {?} params
     * @return {?}
     */
    CommentComponent.prototype.commentUpdate = /**
     * @param {?} params
     * @return {?}
     */
    function (params) {
        var _this = this;
        this.socialService.commentUpdate(params, (/**
         * @param {?} comment
         * @return {?}
         */
        function (comment) {
            if (comment && comment.uuid) {
                _this.commentCancelEdit();
                _this.onUpdated.emit(comment);
            }
        }));
    };
    /**
     * @return {?}
     */
    CommentComponent.prototype.commentDelete = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.socialService.commentRemove({
            comment: this.comment.uuid,
            activity: this.comment.activityID
        }, (/**
         * @param {?} comment
         * @return {?}
         */
        function (comment) {
            if (comment && comment.uuid) {
                _this.onDeleted.emit(comment);
            }
        }));
    };
    /**
     * @return {?}
     */
    CommentComponent.prototype.commentLike = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var params = {
            activity: this.comment.activityID,
            comment: this.comment.uuid,
        };
        this.comment.likeStatus = !this.comment.likeStatus;
        if (this.comment.likeStatus) {
            this.comment.likeCount++;
            this.socialService.commentLike(params, (/**
             * @param {?} data
             * @return {?}
             */
            function (data) { }));
        }
        else {
            this.comment.likeCount--;
            this.socialService.commentUnLike(params, (/**
             * @param {?} data
             * @return {?}
             */
            function (data) { }));
        }
    };
    CommentComponent.decorators = [
        { type: Component, args: [{
                    selector: '[socialComment]',
                    template: "<div class=\"social-comment\">\n\n    <img userAvatar [usercode]=\"comment.creator\" class=\"social-comment__avatar\">\n\n    <div *ngIf=\"!editing; else commentPost;\">\n        <div actionMore dropdown\n             *ngIf=\"comment._editable\"\n             [data]=\"comment\"\n             (onEdit)=\"commentEdit()\"\n             (onDelete)=\"commentDelete()\" class=\"social-action-more\"></div>\n        <div class=\"social-comment__content\">\n            <b class=\"social-comment__name\">{{ comment.fullname }} </b>\n            <span [innerHTML]=\"comment._displayMessage\"></span>\n            <div *ngIf=\"comment.attachments.length\" attachmentList [attachments]=\"comment.attachments\" class=\"social-block\"></div>\n\n            <div class=\"social-comment__action\">\n            <span [title]=\"comment.posted | date:viewDate\">\n                {{comment.posted | dateShortcut}}\n            </span>\n                <button class=\"social-flat-btn\" (click)=\"commentLike()\" [ngClass]=\"{'active': comment.likeStatus}\">\n                    <i class=\"fa fa-thumbs-up\"></i>\n                    <span *ngIf=\"comment.likeCount\">{{comment.likeCount}}</span>\n                </button>\n            </div>\n        </div>\n    </div>\n\n    <ng-template #commentPost>\n        <div commentPost\n             [commentEdit]=\"comment\"\n             (onPost)=\"commentUpdate($event)\"\n             (onCancel)=\"commentCancelEdit()\" class=\"social-comment__content\"></div>\n    </ng-template>\n\n</div>\n",
                    styles: [".social-block{display:block;margin-top:10px}.social-action-more{float:right;margin:-5px -10px 0 0}.social-flat-btn{line-height:26px;text-align:center;color:rgba(0,0,0,.5);margin-right:15px;display:inline-block;outline:0!important;border:0;padding:0 7px;background:0 0}.social-flat-btn i{line-height:inherit;font-size:16px}.social-flat-btn span{margin-left:5px}.social-flat-btn.active,.social-flat-btn:hover{color:#2067b0}.social-comment{padding:7px 0;color:#212121;font-size:13px}.social-comment__avatar{width:30px;height:30px;border-radius:50%;margin-right:10px;float:left}.social-comment__content{overflow:hidden;line-height:16px}.social-comment__name{color:#2067b0}.social-comment__action{color:#6c757d;font-size:12px}.social-comment__more{cursor:pointer;color:#2067b0;margin-left:40px;padding-bottom:10px}"]
                }] }
    ];
    /** @nocollapse */
    CommentComponent.ctorParameters = function () { return [
        { type: SocialService }
    ]; };
    CommentComponent.propDecorators = {
        comment: [{ type: Input }],
        editable: [{ type: Input }],
        onUpdated: [{ type: Output }],
        onDeleted: [{ type: Output }]
    };
    return CommentComponent;
}());
if (false) {
    /** @type {?} */
    CommentComponent.prototype.comment;
    /** @type {?} */
    CommentComponent.prototype.editable;
    /** @type {?} */
    CommentComponent.prototype.onUpdated;
    /** @type {?} */
    CommentComponent.prototype.onDeleted;
    /** @type {?} */
    CommentComponent.prototype.viewDate;
    /** @type {?} */
    CommentComponent.prototype.editing;
    /**
     * @type {?}
     * @private
     */
    CommentComponent.prototype.socialService;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var SocialModalViewComponent = /** @class */ (function () {
    function SocialModalViewComponent() {
    }
    /**
     * @return {?}
     */
    SocialModalViewComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.$modal = $(this.viewModal.nativeElement);
        this.$modal.on('hidden.bs.modal', (/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            delete _this.activity;
        }));
        $(document.body).append(this.$modal);
    };
    /**
     * @return {?}
     */
    SocialModalViewComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.$modal.remove();
    };
    /**
     * @param {?} activity
     * @return {?}
     */
    SocialModalViewComponent.prototype.viewActivity = /**
     * @param {?} activity
     * @return {?}
     */
    function (activity) {
        var _this = this;
        this.activity = activity;
        setTimeout((/**
         * @return {?}
         */
        function () {
            _this.$modal.modal('show');
        }), 100);
    };
    SocialModalViewComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-social-modal-view',
                    template: "<div #viewModal class=\"modal fade\" tabindex=\"-1\" role=\"dialog\">\n    <div class=\"modal-dialog modal-lg\" role=\"document\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <h5 class=\"modal-title\">Th\u1EA3o lu\u1EADn</h5>\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n                    <span aria-hidden=\"true\">&times;</span>\n                </button>\n            </div>\n            <div class=\"modal-body\">\n                <div *ngIf=\"activity\" socialActivity [activity]=\"activity\"></div>\n            </div>\n        </div>\n    </div>\n</div>\n",
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    SocialModalViewComponent.ctorParameters = function () { return []; };
    SocialModalViewComponent.propDecorators = {
        viewModal: [{ type: ViewChild, args: ['viewModal',] }]
    };
    return SocialModalViewComponent;
}());
if (false) {
    /** @type {?} */
    SocialModalViewComponent.prototype.viewModal;
    /** @type {?} */
    SocialModalViewComponent.prototype.activity;
    /** @type {?} */
    SocialModalViewComponent.prototype.$modal;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ActivityViewComponent = /** @class */ (function () {
    function ActivityViewComponent(socialService) {
        this.socialService = socialService;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ActivityViewComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes.activityId.currentValue !== changes.activityId.previousValue) {
            this._load();
        }
    };
    /**
     * @param {?} activity
     * @return {?}
     */
    ActivityViewComponent.prototype.activityUpdated = /**
     * @param {?} activity
     * @return {?}
     */
    function (activity) {
        this.activity = activity;
    };
    /**
     * @private
     * @return {?}
     */
    ActivityViewComponent.prototype._load = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.notFound = false;
        this.socialService.activityLoad({
            activity: this.activityId
        }, (/**
         * @param {?} activity
         * @return {?}
         */
        function (activity) {
            if (activity && activity.uuid) {
                _this.activity = activity;
            }
            else {
                _this.notFound = true;
            }
        }));
    };
    ActivityViewComponent.decorators = [
        { type: Component, args: [{
                    selector: 'social-activity-view',
                    template: "<div *ngIf=\"activity\" socialActivity [activity]=\"activity\" (onUpdated)=\"activityUpdated($event)\"></div>\n<h4 *ngIf=\"notFound\" class=\"text-center\" style=\"margin-top:70px\">Kh\u00F4ng t\u00ECm th\u1EA5y tin</h4>\n",
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    ActivityViewComponent.ctorParameters = function () { return [
        { type: SocialService }
    ]; };
    ActivityViewComponent.propDecorators = {
        activityId: [{ type: Input }]
    };
    return ActivityViewComponent;
}());
if (false) {
    /** @type {?} */
    ActivityViewComponent.prototype.activityId;
    /** @type {?} */
    ActivityViewComponent.prototype.activity;
    /** @type {?} */
    ActivityViewComponent.prototype.notFound;
    /**
     * @type {?}
     * @private
     */
    ActivityViewComponent.prototype.socialService;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var MessageBodyComponent = /** @class */ (function () {
    function MessageBodyComponent() {
        this.feed = {};
    }
    MessageBodyComponent.decorators = [
        { type: Component, args: [{
                    selector: '[messageBody]',
                    template: "<div *ngIf=\"feed._localNews; else message\"\n  localNews [data]=\"feed._localNews\"></div>\n\n<ng-template #message>\n  <a *ngIf=\"feed.path; else activityMessage;\"\n     [href]=\"feed.path\" target=\"_blank\" rel=\"nofollow noopener\" class=\"activity-path\">\n    {{ feed.message }}\n  </a>\n  <ng-template #activityMessage>\n    <div [innerHTML]=\"feed._displayMessage\" style=\"word-break:break-all\"></div>\n  </ng-template>\n\n  <app-link-preview\n          *ngIf=\"feed._openGraph\"\n          [openGraphData]=\"feed._openGraph\"\n          [removable]=\"false\" class=\"social-block\"></app-link-preview>\n</ng-template>\n\n<div *ngIf=\"feed?.attachments?.length\" attachmentList [attachments]=\"feed.attachments\" class=\"social-block\"></div>\n",
                    styles: [".social-block{display:block;margin-top:10px}.activity-path{display:block;padding:10px;background:rgba(0,0,0,.02);color:#2067b0;border:1px solid rgba(0,0,0,.1)}"]
                }] }
    ];
    MessageBodyComponent.propDecorators = {
        feed: [{ type: Input }]
    };
    return MessageBodyComponent;
}());
if (false) {
    /** @type {?} */
    MessageBodyComponent.prototype.feed;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var LocalNews = /** @class */ (function () {
    function LocalNews() {
    }
    LocalNews.decorators = [
        { type: Component, args: [{
                    selector: '[localNews]',
                    template: "<div *ngIf=\"data\" class=\"local-news\">\n    <h3 class=\"local-news__title\">\n        {{data.title}}\n    </h3>\n    <div class=\"local-news__image\">\n        <img [src]=\"data.image\">\n    </div>\n    <h4 class=\"local-news__description\">\n        {{data.description}}\n    </h4>\n    <a [href]=\"data.url\" target=\"_blank\" class=\"local-news__url\"></a>\n</div>",
                    styles: [".local-news{margin:10px 0;padding:10px 0;position:relative;overflow:hidden;border-top:1px solid rgba(0,0,0,.1);border-bottom:1px solid rgba(0,0,0,.1)}.local-news__title{font:700 14px arial;color:#333;margin-bottom:5px}.local-news__description{color:#333;font:400 13px/16px arial;margin-bottom:5px;overflow:hidden}.local-news__image{position:relative;margin-right:10px;float:left;width:140px}.local-news__image img{width:100%;min-height:70px;border:1px solid rgba(0,0,0,.01)}.local-news__url{position:absolute;top:0;right:0;bottom:0;left:0;z-index:100}"]
                }] }
    ];
    LocalNews.propDecorators = {
        data: [{ type: Input }]
    };
    return LocalNews;
}());
if (false) {
    /** @type {?} */
    LocalNews.prototype.data;
}
/**
 * @record
 */
function LocalNewsData() { }
if (false) {
    /** @type {?} */
    LocalNewsData.prototype.image;
    /** @type {?} */
    LocalNewsData.prototype.title;
    /** @type {?} */
    LocalNewsData.prototype.description;
    /** @type {?|undefined} */
    LocalNewsData.prototype.url;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ActivityActionMoreComponent = /** @class */ (function () {
    function ActivityActionMoreComponent() {
        this.onEdit = new EventEmitter();
        this.onDelete = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ActivityActionMoreComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (!this.data) {
            return;
        }
        this.isActivity = !this.data.activityID;
        this.hasAction = this.isActivity && this.data._editable;
    };
    ActivityActionMoreComponent.decorators = [
        { type: Component, args: [{
                    selector: '[actionMore]',
                    template: "<div class=\"action-more\">\n  <i class=\"fa fa-ellipsis-h\" dropdownToggle></i>\n  <ul *dropdownMenu class=\"dropdown-menu dropdown-menu-right\" role=\"menu\">\n    <li *ngIf=\"data._editable\" role=\"menuitem\" (click)=\"onEdit.emit($event)\">\n      <a class=\"dropdown-item\">\n        <i class=\"action-more-icon fa fa-edit\"></i>\n        <span> Ch\u1EC9nh s\u1EEDa</span>\n      </a>\n    </li>\n    <li *ngIf=\"data._editable\" role=\"menuitem\" (click)=\"onDelete.emit($event)\">\n      <a class=\"dropdown-item\" style=\"color: #dc3545\">\n        <i class=\"action-more-icon fa fa-trash\"></i>\n        <span> X\u00F3a</span>\n      </a>\n    </li>\n  </ul>\n</div>\n",
                    styles: [".action-more{cursor:pointer;color:#6c757d;position:relative;width:30px;height:30px}.action-more ul{margin-top:-20px;font-size:13px;border:1px solid #eef2f4;box-shadow:0 0 34px 0 rgba(63,66,87,.1)}.action-more>i{width:30px;line-height:30px;text-align:center}.action-more-icon{width:20px}"]
                }] }
    ];
    /** @nocollapse */
    ActivityActionMoreComponent.ctorParameters = function () { return []; };
    ActivityActionMoreComponent.propDecorators = {
        data: [{ type: Input }],
        onEdit: [{ type: Output }],
        onDelete: [{ type: Output }]
    };
    return ActivityActionMoreComponent;
}());
if (false) {
    /** @type {?} */
    ActivityActionMoreComponent.prototype.data;
    /** @type {?} */
    ActivityActionMoreComponent.prototype.onEdit;
    /** @type {?} */
    ActivityActionMoreComponent.prototype.onDelete;
    /** @type {?} */
    ActivityActionMoreComponent.prototype.hasAction;
    /** @type {?} */
    ActivityActionMoreComponent.prototype.isActivity;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var FriendBrowseComponent = /** @class */ (function () {
    function FriendBrowseComponent(socialService) {
        this.socialService = socialService;
        this.category = 'All friends';
        this.members = [];
        this.params = {
            pageSize: 20,
            pageNumber: 0
        };
        this.placeholder = 'Tìm kiếm bạn bè...';
    }
    /**
     * @return {?}
     */
    FriendBrowseComponent.prototype.clearSearchValue = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @param {?} value
     * @return {?}
     */
    FriendBrowseComponent.prototype.onSearch = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this._searchMember(value);
    };
    /**
     * @return {?}
     */
    FriendBrowseComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this._searchMember('');
    };
    /**
     * @param {?} friend
     * @return {?}
     */
    FriendBrowseComponent.prototype.inviteFriend = /**
     * @param {?} friend
     * @return {?}
     */
    function (friend) {
        friend.added = true;
        this.socialService.invitationCreate({
            member: friend.username,
            memberName: friend.fullname,
            type: 'FRIEND',
            category: this.category
        }, (/**
         * @param {?} response
         * @param {?} error
         * @return {?}
         */
        function (response, error) {
        }));
    };
    /**
     * @private
     * @param {?} keyword
     * @return {?}
     */
    FriendBrowseComponent.prototype._searchMember = /**
     * @private
     * @param {?} keyword
     * @return {?}
     */
    function (keyword) {
        var _this = this;
        if (this.params.keyword === keyword) {
            return;
        }
        this.params.keyword = keyword;
        this.params.pageNumber = 0;
        clearTimeout(this._timer);
        this._timer = setTimeout((/**
         * @return {?}
         */
        function () {
            _this.socialService.invitationSearch(_this.params, (/**
             * @param {?} respone
             * @param {?} error
             * @return {?}
             */
            function (respone, error) {
                if (_this.params.keyword != keyword) {
                    return;
                }
                /** @type {?} */
                var members = respone || [];
                /** @type {?} */
                var userCodes = [];
                _this.members = [];
                members.forEach((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) {
                    if (userCodes.indexOf(item.username) < 0) {
                        userCodes.push(item.username);
                        if (!item.fullname) {
                            item.fullname = item.username;
                        }
                        _this.members.push(item);
                    }
                }));
            }));
        }), 500);
    };
    FriendBrowseComponent.decorators = [
        { type: Component, args: [{
                    template: "<div class=\"grid-title\">\n    Nh\u1EEFng ng\u01B0\u1EDDi b\u1EA1n c\u00F3 th\u1EC3 bi\u1EBFt\n</div>\n<div class=\"grid-container\">\n    <div class=\"grid-item\" *ngFor=\"let member of members\">\n        <img userAvatar [usercode]=\"member.username\" class=\"grid-item__icon\">\n        <div class=\"grid-item__content\">\n            <div class=\"grid-content__ellipsis\">{{member.fullname}}</div>\n            <div class=\"grid-content__brief\">{{member.username}}</div>\n        </div>\n        <button *ngIf=\"!member.added;else added;\" (click)=\"inviteFriend(member)\" class=\"grid-item__btn btn btn-sm btn-primary\" title=\"Th\u00EAm b\u1EA1n\">\n            <i class=\"fa fa-user-plus\"></i>\n        </button>\n    </div>\n    <ng-template #added>\n        <button class=\"grid-item__btn btn btn-sm btn-success\">\n            <i class=\"fa fa-check\"></i>\n        </button>\n    </ng-template>\n</div>",
                    styles: [".grid-title{color:rgba(0,0,0,.54);font-size:14px;margin:8px;font-weight:700}.grid-container{padding-bottom:20px;overflow:hidden}.grid-item{float:left;width:50%;padding:0 15px;margin-right:-1px;margin-bottom:-1px;border:1px solid rgba(0,0,0,.05);cursor:pointer;display:flex;height:90px;align-items:center}.grid-item__sm{height:80px}.grid-item__icon{width:60px;height:60px;line-height:60px;text-align:center;color:rgba(0,0,0,.54);border-radius:50%;font-size:26px;background:rgba(0,0,0,.05)}.grid-item__btn{line-height:20px;margin-left:5px}.grid-item__content{flex-grow:1;padding:0 10px 0 15px;line-height:20px;overflow:hidden;font-size:16px}.grid-content__brief,.grid-content__ellipsis{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.grid-content__brief{font-size:14px;color:rgba(0,0,0,.4)}@media (max-width:767px){.grid-item{width:100%}.grid-item__icon{width:40px;height:40px;line-height:40px}}", ""]
                }] }
    ];
    /** @nocollapse */
    FriendBrowseComponent.ctorParameters = function () { return [
        { type: SocialService }
    ]; };
    return FriendBrowseComponent;
}());
if (false) {
    /** @type {?} */
    FriendBrowseComponent.prototype.category;
    /** @type {?} */
    FriendBrowseComponent.prototype.members;
    /** @type {?} */
    FriendBrowseComponent.prototype.params;
    /**
     * @type {?}
     * @private
     */
    FriendBrowseComponent.prototype._timer;
    /** @type {?} */
    FriendBrowseComponent.prototype.placeholder;
    /**
     * @type {?}
     * @private
     */
    FriendBrowseComponent.prototype.socialService;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var FriendInvitationComponent = /** @class */ (function () {
    function FriendInvitationComponent(socialService) {
        this.socialService = socialService;
        // Default group
        this.category = 'Friends';
    }
    /**
     * @return {?}
     */
    FriendInvitationComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this._loadReceiveInvite();
        this._loadSendInvite();
    };
    /**
     * @param {?} member
     * @return {?}
     */
    FriendInvitationComponent.prototype.acceptInvite = /**
     * @param {?} member
     * @return {?}
     */
    function (member) {
        this.socialService.invitationAccept({
            member: member.inviter,
            category: member.category
        }, (/**
         * @param {?} response
         * @param {?} error
         * @return {?}
         */
        function (response, error) {
        }));
        this.invitations.splice(this.invitations.indexOf(member), 1);
        this.noInvitation = this.invitations.length < 1;
    };
    /**
     * @param {?} member
     * @return {?}
     */
    FriendInvitationComponent.prototype.rejectInvite = /**
     * @param {?} member
     * @return {?}
     */
    function (member) {
        this.socialService.invitationReject({
            member: member.inviter,
            category: member.category
        }, (/**
         * @param {?} response
         * @param {?} error
         * @return {?}
         */
        function (response, error) {
        }));
        this.invitations.splice(this.invitations.indexOf(member), 1);
        this.noInvitation = this.invitations.length < 1;
    };
    /**
     * @param {?} member
     * @return {?}
     */
    FriendInvitationComponent.prototype.removeInvite = /**
     * @param {?} member
     * @return {?}
     */
    function (member) {
        this.socialService.invitationDelete({
            member: member.usercode,
            category: member.category
        }, (/**
         * @param {?} response
         * @param {?} error
         * @return {?}
         */
        function (response, error) {
        }));
        this.invitationsSend.splice(this.invitationsSend.indexOf(member), 1);
        this.noInvitationSend = this.invitationsSend.length < 1;
    };
    /**
     * @private
     * @return {?}
     */
    FriendInvitationComponent.prototype._loadReceiveInvite = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.socialService.invitationReceiveList({ pageSize: -1 }, (/**
         * @param {?} respone
         * @param {?} error
         * @return {?}
         */
        function (respone, error) {
            _this.invitations = respone && respone.items || [];
            _this.noInvitation = _this.invitations.length < 1;
        }));
    };
    /**
     * @private
     * @return {?}
     */
    FriendInvitationComponent.prototype._loadSendInvite = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.socialService.invitationSendList({ pageSize: -1 }, (/**
         * @param {?} respone
         * @param {?} error
         * @return {?}
         */
        function (respone, error) {
            _this.invitationsSend = respone && respone.items || [];
            _this.noInvitationSend = _this.invitationsSend.length < 1;
        }));
    };
    FriendInvitationComponent.decorators = [
        { type: Component, args: [{
                    template: "<div class=\"grid-title\">\n  L\u1EDDi m\u1EDDi k\u1EBFt b\u1EA1n\n</div>\n<div class=\"grid-container\">\n  <div class=\"grid-item\" *ngFor=\"let invite of invitations\">\n      <img userAvatar [usercode]=\"invite.usercode\" class=\"grid-item__icon\">\n      <div class=\"grid-item__content\">\n        <div class=\"grid-content__ellipsis\">{{invite.fullname}}</div>\n          <div class=\"grid-content__brief\">{{invite.usercode}}</div>\n      </div>\n      <button (click)=\"acceptInvite(invite)\"\n              class=\"grid-item__btn btn btn-sm btn-primary\"\n              title=\"Th\u00EAm b\u1EA1n\">\n          <i class=\"fa fa-check\"></i>\n      </button>\n      <button (click)=\"rejectInvite(invite)\"\n              class=\"grid-item__btn btn btn-sm btn-danger\"\n              title=\"T\u1EEB ch\u1ED1i\">\n          <i class=\"fa fa-trash\"></i>\n      </button>\n  </div>\n  <div class=\"grid-item grid-item__sm\" *ngIf=\"noInvitation\">\n      <i class=\"grid-item__icon fa fa-bell\"></i>\n      <div class=\"grid-item__content\">Ch\u01B0a c\u00F3 l\u1EDDi m\u1EDDi k\u1EBFt b\u1EA1n m\u1EDBi</div>\n  </div>\n</div>\n\n<div class=\"grid-title\">\n  L\u1EDDi m\u1EDDi \u0111\u00E3 g\u1EEDi\n</div>\n<div class=\"grid-container\">\n  <div class=\"grid-item\" *ngFor=\"let invite of invitationsSend\">\n      <img userAvatar [usercode]=\"invite.usercode\" class=\"grid-item__icon\">\n      <div class=\"grid-item__content\">\n        <div class=\"grid-content__ellipsis\">{{invite.username}}</div>\n        <div class=\"grid-content__brief\">{{invite.usercode}}</div>\n      </div>\n      <button (click)=\"removeInvite(invite)\" class=\"grid-item__btn btn btn-sm btn-danger\">\n          <i class=\"fa fa-trash\"></i>\n      </button>\n  </div>\n  <div class=\"grid-item grid-item__sm\" *ngIf=\"noInvitationSend\">\n      <i class=\"grid-item__icon fa fa-bell\"></i>\n      <div class=\"grid-item__content\">Ch\u01B0a g\u1EEDi l\u1EDDi m\u1EDDi k\u1EBFt b\u1EA1n n\u00E0o</div>\n  </div>\n</div>\n",
                    styles: [".grid-title{color:rgba(0,0,0,.54);font-size:14px;margin:8px;font-weight:700}.grid-container{padding-bottom:20px;overflow:hidden}.grid-item{float:left;width:50%;padding:0 15px;margin-right:-1px;margin-bottom:-1px;border:1px solid rgba(0,0,0,.05);cursor:pointer;display:flex;height:90px;align-items:center}.grid-item__sm{height:80px}.grid-item__icon{width:60px;height:60px;line-height:60px;text-align:center;color:rgba(0,0,0,.54);border-radius:50%;font-size:26px;background:rgba(0,0,0,.05)}.grid-item__btn{line-height:20px;margin-left:5px}.grid-item__content{flex-grow:1;padding:0 10px 0 15px;line-height:20px;overflow:hidden;font-size:16px}.grid-content__brief,.grid-content__ellipsis{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.grid-content__brief{font-size:14px;color:rgba(0,0,0,.4)}@media (max-width:767px){.grid-item{width:100%}.grid-item__icon{width:40px;height:40px;line-height:40px}}", ""]
                }] }
    ];
    /** @nocollapse */
    FriendInvitationComponent.ctorParameters = function () { return [
        { type: SocialService }
    ]; };
    return FriendInvitationComponent;
}());
if (false) {
    /** @type {?} */
    FriendInvitationComponent.prototype.category;
    /** @type {?} */
    FriendInvitationComponent.prototype.invitations;
    /** @type {?} */
    FriendInvitationComponent.prototype.noInvitation;
    /** @type {?} */
    FriendInvitationComponent.prototype.invitationsSend;
    /** @type {?} */
    FriendInvitationComponent.prototype.noInvitationSend;
    /**
     * @type {?}
     * @private
     */
    FriendInvitationComponent.prototype.socialService;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ListUserComponent = /** @class */ (function () {
    function ListUserComponent(socialService, accentService, cacheStorage) {
        var _this = this;
        this.socialService = socialService;
        this.accentService = accentService;
        this.cacheStorage = cacheStorage;
        this.placeholder = 'Tìm kiếm...';
        this.height = '240px';
        this.members = [];
        this.selectMembers = [];
        this.showMembers = [];
        this.matchMembers = [];
        this._allEmployees = 'social_employees';
        this._allFriends = 'social_friends';
        /** @type {?} */
        var employees = this.cacheStorage.getData(this._allEmployees);
        // Cache employees on 5 minutes
        if (employees) {
            this._initMembers(JSON.parse(employees));
        }
        else {
            this.cacheStorage.promiseQueue(this._allEmployees, (/**
             * @param {?} key
             * @return {?}
             */
            function (key) {
                _this.socialService.searchMember({ pageSize: -1 }, (/**
                 * @param {?} users
                 * @return {?}
                 */
                function (users) {
                    if (users && users.length > 0) {
                        _this.cacheStorage.setData(key, JSON.stringify(users));
                    }
                    _this.cacheStorage.resolveQueue(key, _this, [users]);
                }));
            }), (/**
             * @param {?} users
             * @return {?}
             */
            function (users) { return _this._initMembers(users); }));
        }
        this.cacheStorage.promiseQueue(this._allFriends, (/**
         * @param {?} key
         * @return {?}
         */
        function (key) {
            _this.socialService.listFriends({ pageSize: -1 }, (/**
             * @param {?} users
             * @return {?}
             */
            function (users) {
                _this.cacheStorage.resolveQueue(key, _this, [users]);
            }));
        }), (/**
         * @param {?} users
         * @return {?}
         */
        function (users) { return _this._initMembers(users); }));
    }
    /**
     * @return {?}
     */
    ListUserComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this._search = this.search.nativeElement;
    };
    /**
     * @return {?}
     */
    ListUserComponent.prototype.resetData = /**
     * @return {?}
     */
    function () {
        this.selectMembers = [];
        this.showMembers = [];
        this.matchMembers = [];
        this._search.value = '';
        this.members.forEach((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return delete item.selected; }));
    };
    /**
     * @return {?}
     */
    ListUserComponent.prototype.focusInput = /**
     * @return {?}
     */
    function () {
        this._search.focus();
    };
    /**
     * @return {?}
     */
    ListUserComponent.prototype.onSearch = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var value = this._search.value.trim();
        if (value) {
            value = this.accentService.viToEn(value.toLowerCase());
            this.matchMembers = this.members.filter((/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return item._index.indexOf(value) > -1; }));
        }
        else {
            this.matchMembers = this.members;
        }
        this.showMembers = this.matchMembers;
    };
    /**
     * @return {?}
     */
    ListUserComponent.prototype.onScroll = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @param {?} member
     * @return {?}
     */
    ListUserComponent.prototype.addMember = /**
     * @param {?} member
     * @return {?}
     */
    function (member) {
        member.selected = !member.selected;
        if (member.selected) {
            this.selectMembers.push(member);
        }
        else {
            this.removeMember(member);
        }
    };
    /**
     * @param {?} member
     * @return {?}
     */
    ListUserComponent.prototype.removeMember = /**
     * @param {?} member
     * @return {?}
     */
    function (member) {
        this.selectMembers.splice(this.selectMembers.indexOf(member), 1);
    };
    /**
     * @private
     * @param {?} users
     * @return {?}
     */
    ListUserComponent.prototype._initMembers = /**
     * @private
     * @param {?} users
     * @return {?}
     */
    function (users) {
        var _this = this;
        users.forEach((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return _this._addMember(item); }));
        this._sortMembers();
    };
    /**
     * @private
     * @param {?} member
     * @return {?}
     */
    ListUserComponent.prototype._addMember = /**
     * @private
     * @param {?} member
     * @return {?}
     */
    function (member) {
        member.username = member.username || member.usercode;
        if (this._hasMember(member)) {
            return;
        }
        member._index = this.accentService.viToEn(member.fullname.toLowerCase()) + ' ' + member.username;
        this.members.push(member);
    };
    /**
     * @private
     * @return {?}
     */
    ListUserComponent.prototype._sortMembers = /**
     * @private
     * @return {?}
     */
    function () {
        this.members.sort((/**
         * @param {?} a
         * @param {?} b
         * @return {?}
         */
        function (a, b) { return a.fullname.localeCompare(b.fullname); }));
    };
    /**
     * @private
     * @param {?} member
     * @return {?}
     */
    ListUserComponent.prototype._hasMember = /**
     * @private
     * @param {?} member
     * @return {?}
     */
    function (member) {
        for (var i = 0; i < this.members.length; i++) {
            if (this.members[i].username === member.username) {
                return true;
            }
        }
    };
    ListUserComponent.decorators = [
        { type: Component, args: [{
                    selector: '[socialListUser]',
                    template: "<div class=\"auto-tag form-control\" style=\"max-height: 140px;overflow: auto;\">\n  <div *ngFor=\"let member of selectMembers\" class=\"auto-tag-item\">\n    <span>{{member.fullname}}</span>\n    <i class=\"fa fa-times\" (click)=\"removeMember(member)\"></i>\n  </div>\n  <input #search (keyup)=\"onSearch()\" type=\"text\" class=\"auto-tag-input\" [placeholder]=\"placeholder\">\n</div>\n<div #contactList (scroll)=\"onScroll()\"\n     style=\"overflow:auto;height: 240px;margin-top:10px\">\n  <div class=\"list-item list-avatar\" *ngFor=\"let member of showMembers\" (click)=\"addMember(member)\">\n    <img userAvatar [usercode]=\"member.username || member.usercode\" class=\"list-item__image\">\n    <div class=\"list-item__content\">{{member.fullname}}</div>\n    <label class=\"checkbox-container\">\n      <input type=\"checkbox\" [checked]=\"member.selected\" disabled>\n      <span class=\"checkmark\"></span>\n    </label>\n  </div>\n</div>",
                    styles: [".auto-tag{display:flex;flex-wrap:wrap;height:auto;padding-bottom:0}.auto-tag .auto-tag-item{display:flex;align-items:center;border-radius:4px;background:#eee;padding:0 10px;white-space:nowrap;margin:0 5px 5px 0}.auto-tag .auto-tag-item i{cursor:pointer;padding:5px;margin-right:-5px}.auto-tag .auto-tag-input{border:0;outline:0}.checkbox-container{display:block;position:relative;cursor:pointer;font-size:22px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;min-width:20px;min-height:20px;margin:0}.checkbox-container input{position:absolute;opacity:0;cursor:pointer}.checkbox-container .checkmark{position:absolute;top:0;left:0;height:20px;width:20px;background-color:#eee;border-radius:4px}.checkbox-container .checkmark:after{content:\"\";position:absolute;display:none;left:8px;top:4px;width:5px;height:10px;border:solid #fff;border-width:0 3px 3px 0;transform:rotate(45deg)}.checkbox-container:hover .checkmark{background-color:#ccc}.checkbox-container input:checked+.checkmark{background-color:#2196f3}.checkbox-container input:checked+.checkmark:after{display:block}.list-avatar{padding:5px 10px;overflow:hidden;cursor:pointer;margin-bottom:5px;display:flex;align-items:center}.list-item__icon,.list-item__image{width:32px;height:32px;border-radius:50%}.list-item__icon{line-height:32px;text-align:center;background:rgba(0,0,0,.05);color:rgba(0,0,0,.5)}.list-item__content{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding:0 15px;line-height:32px;flex-grow:1}"]
                }] }
    ];
    /** @nocollapse */
    ListUserComponent.ctorParameters = function () { return [
        { type: SocialService },
        { type: AccentService },
        { type: CacheStorageService }
    ]; };
    ListUserComponent.propDecorators = {
        placeholder: [{ type: Input }],
        height: [{ type: Input }],
        search: [{ type: ViewChild, args: ['search',] }]
    };
    return ListUserComponent;
}());
if (false) {
    /** @type {?} */
    ListUserComponent.prototype.placeholder;
    /** @type {?} */
    ListUserComponent.prototype.height;
    /** @type {?} */
    ListUserComponent.prototype.search;
    /** @type {?} */
    ListUserComponent.prototype.members;
    /** @type {?} */
    ListUserComponent.prototype.selectMembers;
    /** @type {?} */
    ListUserComponent.prototype.showMembers;
    /** @type {?} */
    ListUserComponent.prototype.matchMembers;
    /**
     * @type {?}
     * @private
     */
    ListUserComponent.prototype._search;
    /**
     * @type {?}
     * @private
     */
    ListUserComponent.prototype._allEmployees;
    /**
     * @type {?}
     * @private
     */
    ListUserComponent.prototype._allFriends;
    /**
     * @type {?}
     * @private
     */
    ListUserComponent.prototype.socialService;
    /**
     * @type {?}
     * @private
     */
    ListUserComponent.prototype.accentService;
    /**
     * @type {?}
     * @private
     */
    ListUserComponent.prototype.cacheStorage;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var GroupMemberComponent = /** @class */ (function () {
    function GroupMemberComponent() {
        this.title = 'Thêm thành viên';
        this.onSelect = new EventEmitter();
    }
    /**
     * @return {?}
     */
    GroupMemberComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        document.body.appendChild(this.modal._element.nativeElement);
    };
    /**
     * @return {?}
     */
    GroupMemberComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.modal._element.nativeElement.remove();
    };
    /**
     * @return {?}
     */
    GroupMemberComponent.prototype.open = /**
     * @return {?}
     */
    function () {
        this.listUser.resetData();
        this.modal.show();
    };
    /**
     * @return {?}
     */
    GroupMemberComponent.prototype.onShown = /**
     * @return {?}
     */
    function () {
        this.listUser.focusInput();
        this.listUser.onSearch();
    };
    /**
     * @return {?}
     */
    GroupMemberComponent.prototype.onSave = /**
     * @return {?}
     */
    function () {
        this.onSelect.emit(this.listUser.selectMembers);
        this.modal.hide();
    };
    /**
     * @return {?}
     */
    GroupMemberComponent.prototype.onCancel = /**
     * @return {?}
     */
    function () {
        this.modal.hide();
    };
    GroupMemberComponent.decorators = [
        { type: Component, args: [{
                    selector: '[socialGroupMember]',
                    template: "<div class=\"modal fade\" bsModal #modal=\"bs-modal\" (onShown)=\"onShown()\" tabindex=\"-1\" role=\"dialog\">\n  <div class=\"modal-dialog\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <h5 class=\"modal-title pull-left\">Th\u00EAm th\u00E0nh vi\u00EAn</h5>\n        <button type=\"button\" class=\"close pull-right\" (click)=\"modal.hide()\" tabindex=\"-1\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>\n      <div class=\"modal-body\">\n        <div socialListUser #listUser></div>\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-primary\" (click)=\"onSave()\">L\u01B0u</button>\n        <button type=\"button\" class=\"btn btn-secondary\" (click)=\"onCancel()\">\u0110\u00F3ng</button>\n      </div>\n    </div>\n  </div>\n</div>\n",
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    GroupMemberComponent.ctorParameters = function () { return []; };
    GroupMemberComponent.propDecorators = {
        title: [{ type: Input }],
        onSelect: [{ type: Output }],
        modal: [{ type: ViewChild, args: ['modal',] }],
        listUser: [{ type: ViewChild, args: ['listUser',] }]
    };
    return GroupMemberComponent;
}());
if (false) {
    /** @type {?} */
    GroupMemberComponent.prototype.title;
    /** @type {?} */
    GroupMemberComponent.prototype.onSelect;
    /** @type {?} */
    GroupMemberComponent.prototype.modal;
    /** @type {?} */
    GroupMemberComponent.prototype.listUser;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var GroupCreateComponent = /** @class */ (function () {
    function GroupCreateComponent(socialService) {
        this.socialService = socialService;
        this.onCreate = new EventEmitter();
    }
    /**
     * @return {?}
     */
    GroupCreateComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this._input = this.inputGroup.nativeElement;
        document.body.appendChild(this.modal._element.nativeElement);
    };
    /**
     * @return {?}
     */
    GroupCreateComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.modal._element.nativeElement.remove();
    };
    /**
     * @return {?}
     */
    GroupCreateComponent.prototype.open = /**
     * @return {?}
     */
    function () {
        this._input.value = '';
        this.listUser.resetData();
        this.modal.show();
    };
    /**
     * @return {?}
     */
    GroupCreateComponent.prototype.onShown = /**
     * @return {?}
     */
    function () {
        this._input.focus();
        this.listUser.onSearch();
    };
    /**
     * @return {?}
     */
    GroupCreateComponent.prototype.onSave = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var params = {
            category: this._input.value.trim(),
            member: this.listUser.selectMembers.map((/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return item.username; })).join(',')
        };
        if (!params.category) {
            this._input.focus();
            return;
        }
        if (!params.member) {
            this.listUser.focusInput();
            return;
        }
        this.socialService.groupMemberCreate(params, (/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            _this.onCreate.emit(data);
        }));
        this.modal.hide();
    };
    /**
     * @return {?}
     */
    GroupCreateComponent.prototype.onCancel = /**
     * @return {?}
     */
    function () {
        this.modal.hide();
    };
    GroupCreateComponent.decorators = [
        { type: Component, args: [{
                    selector: '[socialGroupCreate]',
                    template: "<div class=\"modal fade\" bsModal #modal=\"bs-modal\" (onShown)=\"onShown()\" tabindex=\"-1\" role=\"dialog\">\n  <div class=\"modal-dialog\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <h5 class=\"modal-title pull-left\">T\u1EA1o nh\u00F3m</h5>\n        <button type=\"button\" class=\"close pull-right\" (click)=\"modal.hide()\" tabindex=\"-1\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>\n      <div class=\"modal-body\">\n        <div class=\"form-group\">\n          <label>T\u00EAn nh\u00F3m</label>\n          <input #inputGroup type=\"text\" class=\"form-control\">\n        </div>\n        <div class=\"form-group\">\n          <label>Th\u00EAm th\u00E0nh vi\u00EAn</label>\n          <div socialListUser #listUser></div>\n        </div>\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-primary\" (click)=\"onSave()\">T\u1EA1o nh\u00F3m</button>\n        <button type=\"button\" class=\"btn btn-secondary\" (click)=\"onCancel()\">\u0110\u00F3ng</button>\n      </div>\n    </div>\n  </div>\n</div>\n",
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    GroupCreateComponent.ctorParameters = function () { return [
        { type: SocialService }
    ]; };
    GroupCreateComponent.propDecorators = {
        onCreate: [{ type: Output }],
        modal: [{ type: ViewChild, args: ['modal',] }],
        inputGroup: [{ type: ViewChild, args: ['inputGroup',] }],
        listUser: [{ type: ViewChild, args: ['listUser',] }]
    };
    return GroupCreateComponent;
}());
if (false) {
    /** @type {?} */
    GroupCreateComponent.prototype.onCreate;
    /** @type {?} */
    GroupCreateComponent.prototype.modal;
    /** @type {?} */
    GroupCreateComponent.prototype.inputGroup;
    /** @type {?} */
    GroupCreateComponent.prototype.listUser;
    /**
     * @type {?}
     * @private
     */
    GroupCreateComponent.prototype._input;
    /**
     * @type {?}
     * @private
     */
    GroupCreateComponent.prototype.socialService;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var SocialGroupComponent = /** @class */ (function () {
    function SocialGroupComponent(socialService, accentService, router, modalService) {
        this.socialService = socialService;
        this.accentService = accentService;
        this.router = router;
        this.modalService = modalService;
        this.friends = [];
        this.members = [];
        this._prefix = '/social/friend';
        this.placeholder = 'Tìm kiếm...';
        this._loadAllFriends();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    SocialGroupComponent.prototype.onSearch = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.searching = !!value;
        if (value) {
            value = this.accentService.viToEn(value);
            if (this.viewGroups) {
                this.friends.forEach((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) {
                    item.hidden = item._index.indexOf(value) < 0;
                }));
            }
            else {
                this.members.forEach((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) {
                    item.hidden = item._index.indexOf(value) < 0;
                }));
            }
        }
        else {
            if (this.viewGroups) {
                this.friends.forEach((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) { return delete item.hidden; }));
            }
            else {
                this.members.forEach((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) { return delete item.hidden; }));
            }
        }
    };
    /**
     * @return {?}
     */
    SocialGroupComponent.prototype.clearSearchValue = /**
     * @return {?}
     */
    function () { };
    /**
     * @return {?}
     */
    SocialGroupComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._router = this.router.events
            .pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        function (event) { return event instanceof NavigationEnd; })))
            .subscribe((/**
         * @return {?}
         */
        function () {
            _this._actionView();
        }));
        this._actionView();
    };
    /**
     * @return {?}
     */
    SocialGroupComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._router.unsubscribe();
    };
    /**
     * @return {?}
     */
    SocialGroupComponent.prototype.createGroup = /**
     * @return {?}
     */
    function () {
        this.modalCreateMember.open();
    };
    /**
     * @return {?}
     */
    SocialGroupComponent.prototype.groupCreated = /**
     * @return {?}
     */
    function () {
        this._loadGroups();
        this._loadAllFriends();
    };
    /**
     * @param {?} group
     * @return {?}
     */
    SocialGroupComponent.prototype.viewGroup = /**
     * @param {?} group
     * @return {?}
     */
    function (group) {
        this.router.navigate([this._prefix + '/' + group]);
    };
    /**
     * @param {?} group
     * @param {?} template
     * @return {?}
     */
    SocialGroupComponent.prototype.removeGroup = /**
     * @param {?} group
     * @param {?} template
     * @return {?}
     */
    function (group, template) {
        this.groupActive = group;
        this.modalGroupDeleteRef = this.modalService.show(template);
    };
    // Todo: improve remove group
    // Todo: improve remove group
    /**
     * @return {?}
     */
    SocialGroupComponent.prototype.onDeleteGroup = 
    // Todo: improve remove group
    /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.modalGroupDeleteRef.hide();
        this._loadFriends(this.groupActive, (/**
         * @param {?} members
         * @return {?}
         */
        function (members) {
            _this.socialService.groupMemberDelete({
                category: _this.groupActive,
                member: _this._getMemberStr(members)
            }, (/**
             * @return {?}
             */
            function () {
                _this._loadGroups();
                _this._loadAllFriends();
                if (!_this.viewGroups) {
                    _this.toGroups();
                }
            }));
        }));
        this.groups.splice(this.groups.indexOf(this.groupActive), 1);
    };
    /**
     * @param {?} friend
     * @param {?} template
     * @return {?}
     */
    SocialGroupComponent.prototype.removeFriend = /**
     * @param {?} friend
     * @param {?} template
     * @return {?}
     */
    function (friend, template) {
        this.modalMemberDeleteRef = this.modalService.show(template);
        this.memberActive = friend;
    };
    /**
     * @return {?}
     */
    SocialGroupComponent.prototype.onDeleteMember = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var promises = [];
        if (this.memberActive.categories) {
            // Member on groups
            this.memberActive.categories.forEach((/**
             * @param {?} category
             * @return {?}
             */
            function (category) {
                promises.push(_this._deleteMemberPromise(_this.memberActive.usercode, category));
            }));
        }
        else {
            promises.push(this._deleteMemberPromise(this.memberActive.usercode, this.memberActive.category));
        }
        Promise.all(promises).then((/**
         * @param {?} values
         * @return {?}
         */
        function (values) {
            if (_this.groupView) {
                _this._loadMembers();
            }
            _this._loadAllFriends();
        }));
        this.modalMemberDeleteRef.hide();
    };
    /**
     * @private
     * @param {?} usercode
     * @param {?} category
     * @return {?}
     */
    SocialGroupComponent.prototype._deleteMemberPromise = /**
     * @private
     * @param {?} usercode
     * @param {?} category
     * @return {?}
     */
    function (usercode, category) {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            _this.socialService.groupMemberDelete({
                category: category,
                member: usercode
            }, resolve);
        }));
    };
    /**
     * @return {?}
     */
    SocialGroupComponent.prototype.addMemberGroup = /**
     * @return {?}
     */
    function () {
        this.modalAddMember.open();
    };
    /**
     * @param {?} members
     * @return {?}
     */
    SocialGroupComponent.prototype.saveMemberGroup = /**
     * @param {?} members
     * @return {?}
     */
    function (members) {
        var _this = this;
        this.socialService.groupMemberCreate({
            category: this.groupView,
            member: this._getMemberStr(members)
        }, (/**
         * @return {?}
         */
        function () {
            _this._loadMembers();
            _this._loadAllFriends();
        }));
    };
    /**
     * @return {?}
     */
    SocialGroupComponent.prototype.toGroups = /**
     * @return {?}
     */
    function () {
        this.router.navigate([this._prefix]);
    };
    /**
     * @private
     * @return {?}
     */
    SocialGroupComponent.prototype._viewGroup = /**
     * @private
     * @return {?}
     */
    function () {
        this.viewGroups = true;
        this.groupView = '';
        if (!this.groups) {
            this._loadGroups();
        }
    };
    /**
     * @private
     * @return {?}
     */
    SocialGroupComponent.prototype._loadGroups = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.noGroups = false;
        this.socialService.listGroups((/**
         * @param {?} groups
         * @return {?}
         */
        function (groups) {
            _this.groups = groups;
            _this.noGroups = groups.length < 1;
        }));
    };
    /**
     * @private
     * @param {?} group
     * @return {?}
     */
    SocialGroupComponent.prototype._viewGroupMember = /**
     * @private
     * @param {?} group
     * @return {?}
     */
    function (group) {
        this.viewMembers = true;
        this.members = [];
        this.groupView = group;
        this._loadMembers();
    };
    /**
     * @private
     * @return {?}
     */
    SocialGroupComponent.prototype._loadMembers = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this._loadFriends(this.groupView, (/**
         * @param {?} users
         * @return {?}
         */
        function (users) { return _this.members = users; }));
    };
    /**
     * @private
     * @return {?}
     */
    SocialGroupComponent.prototype._loadAllFriends = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.friends = [];
        this.noFriends = false;
        this._loadFriends('', (/**
         * @param {?} users
         * @return {?}
         */
        function (users) {
            /** @type {?} */
            var tmp = [];
            users.forEach((/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                /** @type {?} */
                var index = tmp.indexOf(item.usercode);
                if (index < 0) {
                    tmp.push(item.usercode);
                    item.categories = [item.category];
                    _this.friends.push(item);
                }
                else {
                    _this.friends[index].categories.push(item.category);
                }
            }));
            _this.noFriends = _this.friends.length < 1;
        }));
    };
    /**
     * @private
     * @param {?} category
     * @param {?} callback
     * @return {?}
     */
    SocialGroupComponent.prototype._loadFriends = /**
     * @private
     * @param {?} category
     * @param {?} callback
     * @return {?}
     */
    function (category, callback) {
        var _this = this;
        this.socialService.listFriends({
            pageSize: -1,
            category: category
        }, (/**
         * @param {?} users
         * @return {?}
         */
        function (users) {
            users.forEach((/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                item._index = _this._indexSearch(item.fullname) + ' ' + item.usercode;
            }));
            callback(users);
        }));
    };
    /**
     * @private
     * @param {?} members
     * @return {?}
     */
    SocialGroupComponent.prototype._getMemberStr = /**
     * @private
     * @param {?} members
     * @return {?}
     */
    function (members) {
        return members.map((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return item.usercode || item.username; })).join(',');
    };
    /**
     * @private
     * @return {?}
     */
    SocialGroupComponent.prototype._actionView = /**
     * @private
     * @return {?}
     */
    function () {
        this.viewGroups = this.viewMembers = false;
        /** @type {?} */
        var group = this.router.url.split('/')[3];
        this.clearSearchValue();
        if (!group) {
            this._viewGroup();
        }
        else {
            this._viewGroupMember(decodeURIComponent(group));
        }
    };
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    SocialGroupComponent.prototype._indexSearch = /**
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return this.accentService.viToEn(value.toLowerCase());
    };
    SocialGroupComponent.decorators = [
        { type: Component, args: [{
                    template: "<div *ngIf=\"viewGroups; else memberTemplate\">\n  <div class=\"group-toolbar\">\n    <button *ngIf=\"viewGroups\" class=\"btn btn-primary btn-sm\" (click)=\"createGroup()\">\n      <i class=\"fa fa-plus\"></i>\n      <span>T\u1EA1o nh\u00F3m</span>\n    </button>\n  </div>\n  <div *ngIf=\"!searching\">\n    <div class=\"grid-title\">Nh\u00F3m</div>\n    <div class=\"grid-container\">\n      <div class=\"grid-item\" *ngFor=\"let group of groups\" (click)=\"viewGroup(group)\">\n        <i class=\"grid-item__icon fa fa-users\"></i>\n        <div class=\"grid-item__content\" [title]=\"group\">\n          <div class=\"grid-content__ellipsis\">{{group}}</div>\n        </div>\n        <button (click)=\"$event.stopPropagation(); removeGroup(group, templateConfirmGroup)\"\n                class=\"btn btn-sm btn-danger grid-item__btn\"\n                title=\"X\u00F3a nh\u00F3m\">\n          <i class=\"fa fa-trash\"></i>\n        </button>\n      </div>\n      <div class=\"grid-item\" *ngIf=\"noGroups\">\n          <i class=\"grid-item__icon fa fa-bell\"></i>\n          <div class=\"grid-item__content\">Ch\u01B0a c\u00F3 nh\u00F3m \u0111\u01B0\u1EE3c t\u1EA1o</div>\n      </div>\n    </div>\n  </div>\n  <div class=\"grid-title\">B\u1EA1n b\u00E8</div>\n  <div class=\"grid-container\">\n    <div class=\"grid-item\" *ngFor=\"let friend of friends\" [hidden]=\"friend.hidden\">\n      <img userAvatar [usercode]=\"friend.usercode\" class=\"grid-item__icon\">\n      <div class=\"grid-item__content\">\n        <div class=\"grid-content__ellipsis\">{{friend.fullname}}</div>\n        <div class=\"grid-content__brief\">{{friend.usercode}}</div>\n        <!--<div>-->\n          <!--<div *ngFor=\"let group of friend.categories\" class=\"group-item\">{{group}}</div>-->\n        <!--</div>-->\n      </div>\n      <button (click)=\"removeFriend(friend, templateConfirmMember)\"\n              class=\"btn btn-sm btn-danger grid-item__btn\"\n              title=\"X\u00F3a b\u1EA1n\">\n        <i class=\"fa fa-trash\"></i>\n      </button>\n    </div>\n    <div class=\"grid-item grid-item__sm\" *ngIf=\"noFriends\">\n      <i class=\"grid-item__icon fa fa-bell\"></i>\n      <div class=\"grid-item__content\">Ch\u01B0a c\u00F3 b\u1EA1n b\u00E8</div>\n    </div>\n  </div>\n</div>\n\n<ng-template #memberTemplate>\n  <div class=\"group-toolbar\">\n    <button class=\"btn btn-primary btn-sm\" (click)=\"toGroups()\">\n      <i class=\"fa fa-arrow-left\"></i>\n      <span>Tr\u1EDF v\u1EC1</span>\n    </button>\n    <button class=\"btn btn-primary btn-sm\" (click)=\"addMemberGroup()\">\n      <i class=\"fa fa-plus\"></i>\n      <span>Th\u00EAm th\u00E0nh vi\u00EAn</span>\n    </button>\n    <button class=\"btn btn-danger btn-sm\" (click)=\"removeGroup(groupView, templateConfirmGroup)\">\n      <i class=\"fa fa-trash\"></i>\n      <span>X\u00F3a nh\u00F3m</span>\n    </button>\n  </div>\n\n  <div class=\"grid-title\">{{groupView}}</div>\n\n  <div class=\"grid-container\">\n    <div class=\"grid-item\" *ngFor=\"let friend of members\" [hidden]=\"friend.hidden\">\n      <img userAvatar [usercode]=\"friend.usercode\" class=\"grid-item__icon\">\n      <div class=\"grid-item__content\">\n        <div class=\"grid-content__ellipsis\">{{friend.fullname}}</div>\n        <div class=\"grid-content__brief\">{{friend.usercode}}</div>\n      </div>\n      <button (click)=\"removeFriend(friend, templateConfirmMember)\"\n              class=\"btn btn-sm btn-danger grid-item__btn\"\n              title=\"X\u00F3a b\u1EA1n\">\n        <i class=\"fa fa-trash\"></i>\n      </button>\n    </div>\n    <div class=\"grid-item grid-item__sm\" *ngIf=\"members && !members.length\">\n        <i class=\"grid-item__icon fa fa-bell\"></i>\n        <div class=\"grid-item__content\">Ch\u01B0a c\u00F3 th\u00E0nh vi\u00EAn trong nh\u00F3m</div>\n    </div>\n  </div>\n\n</ng-template>\n\n<div socialGroupCreate #modalCreateMember (onCreate)=\"groupCreated()\"></div>\n<div socialGroupMember #modalAddMember (onSelect)=\"saveMemberGroup($event)\"></div>\n\n<ng-template #templateConfirmGroup>\n  <div class=\"modal-header\">\n    <h4 class=\"modal-title pull-left\">X\u00F3a nh\u00F3m</h4>\n    <button type=\"button\" class=\"close pull-right\" (click)=\"modalGroupDeleteRef.hide()\">\n      <span aria-hidden=\"true\">&times;</span>\n    </button>\n  </div>\n  <div class=\"modal-body\">\n    X\u00F3a <b>{{groupActive}}</b> kh\u1ECFi danh s\u00E1ch nh\u00F3m?\n  </div>\n  <div class=\"modal-footer\">\n    <button type=\"button\" class=\"btn btn-danger\" (click)=\"onDeleteGroup()\">X\u00F3a nh\u00F3m</button>\n    <button type=\"button\" class=\"btn btn-secondary\" (click)=\"modalGroupDeleteRef.hide()\">H\u1EE7y</button>\n  </div>\n</ng-template>\n<ng-template #templateConfirmMember>\n  <div class=\"modal-header\">\n    <h4 class=\"modal-title pull-left\">X\u00F3a b\u1EA1n b\u00E8</h4>\n    <button type=\"button\" class=\"close pull-right\" (click)=\"modalMemberDeleteRef.hide()\">\n      <span aria-hidden=\"true\">&times;</span>\n    </button>\n  </div>\n  <div class=\"modal-body\">\n    X\u00F3a <b>{{memberActive.fullname}}</b> kh\u1ECFi nh\u00F3m\n    <b>{{memberActive.categories ? memberActive.categories.join(', ') : memberActive.category}}</b>?\n  </div>\n  <div class=\"modal-footer\">\n    <button type=\"button\" class=\"btn btn-danger\" (click)=\"onDeleteMember()\">X\u00F3a b\u1EA1n</button>\n    <button type=\"button\" class=\"btn btn-secondary\" (click)=\"modalMemberDeleteRef.hide()\">H\u1EE7y</button>\n  </div>\n</ng-template>",
                    styles: [".grid-title{color:rgba(0,0,0,.54);font-size:14px;margin:8px;font-weight:700}.grid-container{padding-bottom:20px;overflow:hidden}.grid-item{float:left;width:50%;padding:0 15px;margin-right:-1px;margin-bottom:-1px;border:1px solid rgba(0,0,0,.05);cursor:pointer;display:flex;height:90px;align-items:center}.grid-item__sm{height:80px}.grid-item__icon{width:60px;height:60px;line-height:60px;text-align:center;color:rgba(0,0,0,.54);border-radius:50%;font-size:26px;background:rgba(0,0,0,.05)}.grid-item__btn{line-height:20px;margin-left:5px}.grid-item__content{flex-grow:1;padding:0 10px 0 15px;line-height:20px;overflow:hidden;font-size:16px}.grid-content__brief,.grid-content__ellipsis{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.grid-content__brief{font-size:14px;color:rgba(0,0,0,.4)}@media (max-width:767px){.grid-item{width:100%}.grid-item__icon{width:40px;height:40px;line-height:40px}}", ".group-toolbar{margin:-20px -15px 20px;padding:7px 15px;background:rgba(0,0,0,.03)}.group-item{display:inline-block;margin-top:5px;font-size:12px;line-height:20px;padding:0 5px;overflow:hidden;border-radius:2px;color:#fff;background:#007bff;margin-right:5px}"]
                }] }
    ];
    /** @nocollapse */
    SocialGroupComponent.ctorParameters = function () { return [
        { type: SocialService },
        { type: AccentService },
        { type: Router },
        { type: BsModalService }
    ]; };
    SocialGroupComponent.propDecorators = {
        modalCreateMember: [{ type: ViewChild, args: ['modalCreateMember',] }],
        modalAddMember: [{ type: ViewChild, args: ['modalAddMember',] }]
    };
    return SocialGroupComponent;
}());
if (false) {
    /** @type {?} */
    SocialGroupComponent.prototype.modalCreateMember;
    /** @type {?} */
    SocialGroupComponent.prototype.modalAddMember;
    /** @type {?} */
    SocialGroupComponent.prototype.viewGroups;
    /** @type {?} */
    SocialGroupComponent.prototype.groups;
    /** @type {?} */
    SocialGroupComponent.prototype.friends;
    /** @type {?} */
    SocialGroupComponent.prototype.viewMembers;
    /** @type {?} */
    SocialGroupComponent.prototype.members;
    /** @type {?} */
    SocialGroupComponent.prototype.groupView;
    /** @type {?} */
    SocialGroupComponent.prototype.groupActive;
    /** @type {?} */
    SocialGroupComponent.prototype.memberActive;
    /** @type {?} */
    SocialGroupComponent.prototype.modalGroupDeleteRef;
    /** @type {?} */
    SocialGroupComponent.prototype.modalMemberDeleteRef;
    /** @type {?} */
    SocialGroupComponent.prototype.noGroups;
    /** @type {?} */
    SocialGroupComponent.prototype.noFriends;
    /** @type {?} */
    SocialGroupComponent.prototype.searching;
    /**
     * @type {?}
     * @private
     */
    SocialGroupComponent.prototype._prefix;
    /**
     * @type {?}
     * @private
     */
    SocialGroupComponent.prototype._router;
    /** @type {?} */
    SocialGroupComponent.prototype.placeholder;
    /**
     * @type {?}
     * @private
     */
    SocialGroupComponent.prototype.socialService;
    /**
     * @type {?}
     * @private
     */
    SocialGroupComponent.prototype.accentService;
    /**
     * @type {?}
     * @private
     */
    SocialGroupComponent.prototype.router;
    /**
     * @type {?}
     * @private
     */
    SocialGroupComponent.prototype.modalService;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var CommentPostComponent = /** @class */ (function () {
    function CommentPostComponent(socialService) {
        this.socialService = socialService;
        this.placeholder = 'Nội dung thảo luận..';
        this.onCancel = new EventEmitter();
        this.onPost = new EventEmitter();
        this.message = '';
        this.files = [];
        this.removeFiles = [];
    }
    /**
     * @return {?}
     */
    CommentPostComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (this.commentEdit) {
            this.editComment(this.commentEdit);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    CommentPostComponent.prototype.enterPost = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.preventDefault();
        this.doPost();
    };
    /**
     * @return {?}
     */
    CommentPostComponent.prototype.doPost = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var params = this.getData();
        if (!params.message) {
            return this.focusMessage();
        }
        this.onPost.emit(params);
        this.indicator.show();
    };
    /**
     * @return {?}
     */
    CommentPostComponent.prototype.doCancel = /**
     * @return {?}
     */
    function () {
        this.onCancel.emit(this.commentEdit);
        if (this.commentEdit) {
            this.resetForm();
        }
    };
    /**
     * @return {?}
     */
    CommentPostComponent.prototype.getData = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var params = {
            message: this.message
        };
        for (var i = 0; i < this.files.length; i++) {
            if (!this.files[i].id) {
                params['file-' + i] = this.files[i];
            }
        }
        if (this.commentEdit) {
            params.activity = this.commentEdit.activityID;
            params.comment = this.commentEdit.uuid;
            params.gridfsUUID = this._getRemoveFiles();
        }
        return params;
    };
    /**
     * @param {?} comment
     * @return {?}
     */
    CommentPostComponent.prototype.editComment = /**
     * @param {?} comment
     * @return {?}
     */
    function (comment) {
        this.resetForm();
        this.commentEdit = comment;
        this.files = this.socialService.attachmentToFiles(comment.attachments);
        this.message = comment.message;
        this.focusMessage();
        // Trigger input to adjust size
        this._resizeInput();
    };
    /**
     * @return {?}
     */
    CommentPostComponent.prototype.resetForm = /**
     * @return {?}
     */
    function () {
        // Clear data
        this.message = '';
        this.files.length = 0;
        this.removeFiles.length = 0;
        this._resizeInput();
        if (this.indicator) {
            this.indicator.hide();
        }
    };
    /**
     * @return {?}
     */
    CommentPostComponent.prototype.focusMessage = /**
     * @return {?}
     */
    function () {
        this.messageEl.nativeElement.focus();
    };
    /**
     * @private
     * @return {?}
     */
    CommentPostComponent.prototype._getRemoveFiles = /**
     * @private
     * @return {?}
     */
    function () {
        return this.removeFiles.filter((/**
         * @param {?} file
         * @return {?}
         */
        function (file) { return file.id; })).map((/**
         * @param {?} file
         * @return {?}
         */
        function (file) { return file.id; })).join(',');
    };
    /**
     * @private
     * @return {?}
     */
    CommentPostComponent.prototype._resizeInput = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        setTimeout((/**
         * @return {?}
         */
        function () {
            _this.messageAutoSize.adjust();
        }), 0);
    };
    CommentPostComponent.decorators = [
        { type: Component, args: [{
                    selector: '[commentPost]',
                    template: "<div class=\"comment-input\">\n    <textarea class=\"comment-textarea\"\n              rows=\"1\"\n              [placeholder]=\"placeholder\"\n              #messageEl\n              appAutoSize\n              (keydown.esc)=\"doCancel()\"\n              (keydown.enter)=\"enterPost($event)\"\n              [(ngModel)]=\"message\"></textarea>\n    <i class=\"comment-file__icon fa fa-image\">\n        <input #fileEl type=\"file\" multiple class=\"file-post\">\n    </i>\n</div>\n\n<file-list class=\"social-block\" [files]=\"files\" [fileEl]=\"fileEl\" (onRemove)=\"removeFiles.push($event)\"></file-list>\n\n<div *ngIf=\"commentEdit\">\n    <button class=\"btn btn-primary btn-sm mr-1\" (click)=\"doPost()\">C\u1EACP NH\u1EACT</button>\n    <button class=\"btn btn-light btn-sm active\" (click)=\"doCancel()\">HU\u1EF6</button>\n</div>\n\n<progress-indicator></progress-indicator>\n",
                    styles: [".social-block{display:block;margin-top:10px}:host{position:relative}.comment-input{position:relative;background:#e3e5e5;border-radius:4px;padding:7px 10px 3px;margin-bottom:10px}.comment-textarea{border:0;padding:0 40px 0 0;line-height:16px;margin:0;outline:0!important;width:100%;background:0 0}.comment-file__icon{position:absolute;right:0;top:0;width:30px;height:30px;line-height:30px;text-align:center;cursor:pointer}.file-post{position:absolute;-webkit-appearance:none;-moz-appearance:none;appearance:none;top:0;right:0;bottom:0;left:0;width:100%;height:100%;opacity:0;z-index:100}"]
                }] }
    ];
    /** @nocollapse */
    CommentPostComponent.ctorParameters = function () { return [
        { type: SocialService }
    ]; };
    CommentPostComponent.propDecorators = {
        placeholder: [{ type: Input }],
        commentEdit: [{ type: Input }],
        onCancel: [{ type: Output }],
        onPost: [{ type: Output }],
        messageEl: [{ type: ViewChild, args: ['messageEl',] }],
        messageAutoSize: [{ type: ViewChild, args: [AutoSizeDirective,] }],
        indicator: [{ type: ViewChild, args: [ProgressComponent,] }]
    };
    return CommentPostComponent;
}());
if (false) {
    /** @type {?} */
    CommentPostComponent.prototype.placeholder;
    /** @type {?} */
    CommentPostComponent.prototype.commentEdit;
    /** @type {?} */
    CommentPostComponent.prototype.onCancel;
    /** @type {?} */
    CommentPostComponent.prototype.onPost;
    /** @type {?} */
    CommentPostComponent.prototype.messageEl;
    /** @type {?} */
    CommentPostComponent.prototype.messageAutoSize;
    /** @type {?} */
    CommentPostComponent.prototype.indicator;
    /** @type {?} */
    CommentPostComponent.prototype.message;
    /** @type {?} */
    CommentPostComponent.prototype.files;
    /** @type {?} */
    CommentPostComponent.prototype.removeFiles;
    /**
     * @type {?}
     * @private
     */
    CommentPostComponent.prototype.socialService;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var CommentListComponent = /** @class */ (function () {
    function CommentListComponent(socialService) {
        var _this = this;
        this.socialService = socialService;
        this.allowComment = true;
        this.commentLoad = new EventEmitter();
        this.commentParams = {
            pageSize: 5,
            pageNumber: 0
        };
        this.viewDate = this.socialService.viewDate;
        // Receive comment notify real time
        this._commentChange = this.socialService.commentChange.subscribe((/**
         * @param {?} activityId
         * @return {?}
         */
        function (activityId) {
            if (activityId === _this.activity.uuid) {
                _this.load(true);
            }
        }));
    }
    /**
     * @return {?}
     */
    CommentListComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        // this.load(true);
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    CommentListComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        this.load(true);
    };
    /**
     * @return {?}
     */
    CommentListComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._commentChange.unsubscribe();
    };
    /**
     * @return {?}
     */
    CommentListComponent.prototype.focusForm = /**
     * @return {?}
     */
    function () {
        if (this.commentPost) {
            this.commentPost.focusMessage();
        }
    };
    /**
     * @param {?} params
     * @return {?}
     */
    CommentListComponent.prototype.commentCreate = /**
     * @param {?} params
     * @return {?}
     */
    function (params) {
        params.activity = this.activity.uuid;
        this.socialService.commentPost(params, this.commentPosted.bind(this));
    };
    /**
     * @param {?=} isInit
     * @return {?}
     */
    CommentListComponent.prototype.load = /**
     * @param {?=} isInit
     * @return {?}
     */
    function (isInit) {
        var _this = this;
        if (isInit) {
            this.commentParams.pageNumber = 0;
        }
        else {
            this.commentParams.pageNumber++;
        }
        this.commentParams.activity = this.activity.uuid;
        if (!this.activity.comments) {
            this.activity.comments = [];
        }
        this.socialService.commentWall(this.commentParams, (/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            /** @type {?} */
            var comments = data && data['items'] || [];
            comments.forEach((/**
             * @param {?} comment
             * @return {?}
             */
            function (comment) { return _this.replaceOrAddComment(comment); }));
            _this.activity.comments.sort((/**
             * @param {?} a
             * @param {?} b
             * @return {?}
             */
            function (a, b) {
                return b.posted - a.posted;
            }));
            _this.remainComments =
                (data.total - (_this.commentParams.pageNumber + 1) * _this.commentParams.pageSize) || 0;
            _this.commentLoad.emit(data);
        }));
    };
    /**
     * @param {?} comment
     * @return {?}
     */
    CommentListComponent.prototype.commentUpdated = /**
     * @param {?} comment
     * @return {?}
     */
    function (comment) {
        this.replaceOrAddComment(comment);
    };
    /**
     * @param {?} comment
     * @return {?}
     */
    CommentListComponent.prototype.commentDeleted = /**
     * @param {?} comment
     * @return {?}
     */
    function (comment) {
        this.removeComment(comment.uuid);
    };
    /**
     * @private
     * @param {?} comment
     * @param {?} err
     * @return {?}
     */
    CommentListComponent.prototype.commentPosted = /**
     * @private
     * @param {?} comment
     * @param {?} err
     * @return {?}
     */
    function (comment, err) {
        if (comment && comment.uuid && this.commentPost) {
            this.commentPost.resetForm();
            this.replaceOrAddComment(comment, true);
        }
    };
    /**
     * @private
     * @param {?} uuid
     * @return {?}
     */
    CommentListComponent.prototype.getIndexComment = /**
     * @private
     * @param {?} uuid
     * @return {?}
     */
    function (uuid) {
        for (var i = 0; i < this.activity.comments.length; i++) {
            if (this.activity.comments[i].uuid === uuid) {
                return i;
            }
        }
        return -1;
    };
    /**
     * @private
     * @param {?} comment
     * @param {?=} insertAtFirst
     * @return {?}
     */
    CommentListComponent.prototype.replaceOrAddComment = /**
     * @private
     * @param {?} comment
     * @param {?=} insertAtFirst
     * @return {?}
     */
    function (comment, insertAtFirst) {
        /** @type {?} */
        var index = this.getIndexComment(comment.uuid);
        if (index > -1) {
            this.activity.comments[index] = comment;
        }
        else {
            this.activity.comments[insertAtFirst ? 'unshift' : 'push'](comment);
        }
    };
    /**
     * @protected
     * @param {?} uuid
     * @return {?}
     */
    CommentListComponent.prototype.removeComment = /**
     * @protected
     * @param {?} uuid
     * @return {?}
     */
    function (uuid) {
        /** @type {?} */
        var index = this.getIndexComment(uuid);
        if (index > -1) {
            this.activity.comments.splice(index, 1);
        }
    };
    CommentListComponent.decorators = [
        { type: Component, args: [{
                    selector: '[socialCommentList]',
                    template: "<div *ngIf=\"allowComment\" class=\"social-comment\">\n    <img userAvatar class=\"social-comment__avatar\">\n    <div commentPost (onPost)=\"commentCreate($event)\" class=\"social-comment__content\"></div>\n</div>\n\n<div socialComment\n     *ngFor=\"let comment of activity.comments\"\n     [comment]=\"comment\"\n     (onUpdated)=\"commentUpdated($event)\"\n     (onDeleted)=\"commentDeleted($event)\"\n>\n</div>\n\n<div *ngIf=\"remainComments > 0\" (click)=\"load()\" class=\"social-comment__more\">Xem th\u00EAm..</div>\n",
                    styles: [".social-block{display:block;margin-top:10px}.social-action-more{float:right;margin:-5px -10px 0 0}.social-flat-btn{line-height:26px;text-align:center;color:rgba(0,0,0,.5);margin-right:15px;display:inline-block;outline:0!important;border:0;padding:0 7px;background:0 0}.social-flat-btn i{line-height:inherit;font-size:16px}.social-flat-btn span{margin-left:5px}.social-flat-btn.active,.social-flat-btn:hover{color:#2067b0}.social-comment{padding:7px 0;color:#212121;font-size:13px}.social-comment__avatar{width:30px;height:30px;border-radius:50%;margin-right:10px;float:left}.social-comment__content{overflow:hidden;line-height:16px}.social-comment__name{color:#2067b0}.social-comment__action{color:#6c757d;font-size:12px}.social-comment__more{cursor:pointer;color:#2067b0;margin-left:40px;padding-bottom:10px}"]
                }] }
    ];
    /** @nocollapse */
    CommentListComponent.ctorParameters = function () { return [
        { type: SocialService }
    ]; };
    CommentListComponent.propDecorators = {
        activity: [{ type: Input }],
        allowComment: [{ type: Input }],
        commentLoad: [{ type: Output }],
        commentPost: [{ type: ViewChild, args: [CommentPostComponent,] }]
    };
    return CommentListComponent;
}());
if (false) {
    /** @type {?} */
    CommentListComponent.prototype.activity;
    /** @type {?} */
    CommentListComponent.prototype.allowComment;
    /** @type {?} */
    CommentListComponent.prototype.commentLoad;
    /** @type {?} */
    CommentListComponent.prototype.commentPost;
    /** @type {?} */
    CommentListComponent.prototype.remainComments;
    /** @type {?} */
    CommentListComponent.prototype.viewDate;
    /**
     * @type {?}
     * @private
     */
    CommentListComponent.prototype.commentParams;
    /**
     * @type {?}
     * @private
     */
    CommentListComponent.prototype._commentChange;
    /**
     * @type {?}
     * @protected
     */
    CommentListComponent.prototype.socialService;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ActivityListComponent = /** @class */ (function () {
    function ActivityListComponent(socialService) {
        var _this = this;
        this.socialService = socialService;
        this.postEnable = true;
        this.scroller = document;
        this.type = '';
        this.application = '';
        this.loader = (/**
         * @param {?} params
         * @param {?} callback
         * @return {?}
         */
        function (params, callback) { return _this.doLoadWall(params, callback); });
        this.activities = [];
        this.showLoading = true;
        this.hasMore = false;
        this.params = {
            pageSize: 5,
            pageNumber: 0
        };
        // Receive activity notify real time
        this._activityChange = this.socialService.activityChange.subscribe((/**
         * @param {?} activityId
         * @return {?}
         */
        function (activityId) {
            if (activityId) {
                _this.socialService.activityLoad({
                    activity: activityId
                }, (/**
                 * @param {?} activity
                 * @return {?}
                 */
                function (activity) {
                    if (activity && activity.uuid) {
                        _this._addActivity(activity, true);
                    }
                }));
            }
        }));
    }
    /**
     * @return {?}
     */
    ActivityListComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.initScroller();
        this.loadWall(true);
    };
    /**
     * @return {?}
     */
    ActivityListComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.removeEventScroller();
        this._activityChange.unsubscribe();
    };
    /**
     * @param {?} id
     * @return {?}
     */
    ActivityListComponent.prototype.removeActivityById = /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        for (var i = 0; i < this.activities.length; i++) {
            /** @type {?} */
            var activity = this.activities[i];
            if (activity.uuid === id) {
                this.activities.splice(i, 1);
                return;
            }
        }
    };
    /**
     * @param {?=} init
     * @return {?}
     */
    ActivityListComponent.prototype.loadWall = /**
     * @param {?=} init
     * @return {?}
     */
    function (init) {
        var _this = this;
        if (init) {
            this.clearWall();
            this.params.pageNumber = 0;
            this.showLoading = true;
            if (this.type) {
                this.params.type = this.type;
            }
            if (this.application) {
                this.params.application = this.application;
            }
        }
        this._loading = true;
        this.loader(this.params, (/**
         * @param {?} data
         * @param {?} err
         * @return {?}
         */
        function (data, err) { return _this._renderWall(data); }));
    };
    /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    ActivityListComponent.prototype.doLoadWall = /**
     * @param {?} params
     * @param {?} callback
     * @return {?}
     */
    function (params, callback) {
        this.socialService.activityWall(params, callback);
    };
    /**
     * @return {?}
     */
    ActivityListComponent.prototype.clearWall = /**
     * @return {?}
     */
    function () {
        this.activities.length = 0;
    };
    /**
     * @private
     * @param {?} data
     * @return {?}
     */
    ActivityListComponent.prototype._renderWall = /**
     * @private
     * @param {?} data
     * @return {?}
     */
    function (data) {
        var _this = this;
        if (data) {
            /** @type {?} */
            var activities = data['items'] || [];
            activities.forEach((/**
             * @param {?} activity
             * @return {?}
             */
            function (activity) { return _this._addActivity(activity); }));
            this.hasMore = data['total'] > this.activities.length;
        }
        this.showLoading = false;
        setTimeout((/**
         * @return {?}
         */
        function () {
            _this._loading = false;
            _this._scrollBottomListener();
        }), 1000);
    };
    /**
     * @param {?} params
     * @return {?}
     */
    ActivityListComponent.prototype.activityCreate = /**
     * @param {?} params
     * @return {?}
     */
    function (params) {
        if (params.activity) {
            this.socialService.activityUpdate(params, this._activityPosted.bind(this));
        }
        else {
            this.socialService.activityPost(params, this._activityPosted.bind(this));
        }
    };
    /**
     * @param {?} activity
     * @return {?}
     */
    ActivityListComponent.prototype.activityUpdated = /**
     * @param {?} activity
     * @return {?}
     */
    function (activity) {
        // Replace by activity updated
        for (var i = 0; i < this.activities.length; i++) {
            if (this.activities[i].uuid === activity.uuid) {
                this.activities[i] = activity;
                return;
            }
        }
        this.activities.unshift(activity);
    };
    /**
     * @param {?} activity
     * @return {?}
     */
    ActivityListComponent.prototype.activityDeleted = /**
     * @param {?} activity
     * @return {?}
     */
    function (activity) {
        this.removeActivityById(activity.uuid);
    };
    /**
     * @return {?}
     */
    ActivityListComponent.prototype.initScroller = /**
     * @return {?}
     */
    function () {
        this._scrollBottomListener = this._scrollBottomListener.bind(this);
        if (this.scroller) {
            this.initEventScroller(this.scroller);
        }
    };
    /**
     * @return {?}
     */
    ActivityListComponent.prototype.scrollToTop = /**
     * @return {?}
     */
    function () {
        if (this.scroller) {
            this.scroller.scrollTop = 0;
        }
    };
    /**
     * @param {?} scroller
     * @return {?}
     */
    ActivityListComponent.prototype.initEventScroller = /**
     * @param {?} scroller
     * @return {?}
     */
    function (scroller) {
        this.scroller = scroller;
        this.scroller.addEventListener('scroll', this._scrollBottomListener);
    };
    /**
     * @return {?}
     */
    ActivityListComponent.prototype.removeEventScroller = /**
     * @return {?}
     */
    function () {
        if (this.scroller) {
            this.scroller.removeEventListener('scroll', this._scrollBottomListener);
        }
    };
    /**
     * @private
     * @param {?=} e
     * @return {?}
     */
    ActivityListComponent.prototype._scrollBottomListener = /**
     * @private
     * @param {?=} e
     * @return {?}
     */
    function (e) {
        if (this._loading || !this.hasMore) {
            return;
        }
        /** @type {?} */
        var scroller = e && e.target || this.scroller;
        /** @type {?} */
        var target = scroller.scrollingElement || scroller;
        if (target) {
            // Scroll bottom to load more
            /** @type {?} */
            var bottom = target.scrollHeight - target.scrollTop - target.clientHeight;
            if (bottom < 150) {
                this.params.pageNumber++;
                this.loadWall();
            }
        }
    };
    /**
     * @private
     * @param {?} activity
     * @param {?} err
     * @return {?}
     */
    ActivityListComponent.prototype._activityPosted = /**
     * @private
     * @param {?} activity
     * @param {?} err
     * @return {?}
     */
    function (activity, err) {
        if (activity && activity.uuid) {
            this.activityPost.resetForm();
            this.activityPost.hideForm(true);
            this._addActivity(activity, true);
        }
    };
    /**
     * @private
     * @param {?} activity
     * @param {?=} insertAtFirst
     * @return {?}
     */
    ActivityListComponent.prototype._addActivity = /**
     * @private
     * @param {?} activity
     * @param {?=} insertAtFirst
     * @return {?}
     */
    function (activity, insertAtFirst) {
        this.removeActivityById(activity.uuid);
        if (insertAtFirst) {
            this.activities.unshift(activity);
        }
        else {
            this.activities.push(activity);
        }
    };
    ActivityListComponent.decorators = [
        { type: Component, args: [{
                    selector: '[socialActivityList]',
                    template: "<div *ngIf=\"postEnable\" class=\"social-card\"\n     activityPost\n     #activityPost\n     [shareMemberEnable]=\"true\"\n     [linkPreviewEnable]=\"true\"\n     (onPost)=\"activityCreate($event)\">\n</div>\n\n<div class=\"social-welcome\" *ngIf=\"!showLoading && activities.length < 1\">\n    <i class=\"fa fa-bell-o\"></i>\n    <div>Ch\u01B0a c\u00F3 n\u1ED9i dung n\u00E0o</div>\n</div>\n\n<div class=\"social-loading\" *ngIf=\"showLoading\">\n    <i class=\"fa fa-spinner fa-spin\"></i>\n</div>\n\n<div *ngFor=\"let activity of activities\"\n     socialActivity\n     [activity]=\"activity\"\n     (onDeleted)=\"activityDeleted($event)\"\n     (onUpdated)=\"activityUpdated($event)\">\n</div>\n\n<div class=\"card\" *ngIf=\"hasMore\">\n    <div class=\"card-body text-center\">\n        \u0110ang t\u1EA3i d\u1EEF li\u1EC7u..\n    </div>\n</div>\n",
                    styles: [".social-block{display:block;margin-top:10px}.social-card{position:relative;border-radius:2px;padding:15px;background:#fff;font-size:14px;margin-bottom:15px}.social-mark{position:absolute;top:-2px;left:-2px;padding:7px 9px;color:#fff}.social-mark:before{position:absolute;z-index:1}.social-mark:after{content:'';position:absolute;top:0;left:0;border-bottom:45px solid transparent;border-left:45px solid #faa807}.social-welcome{text-align:center;color:rgba(0,0,0,.54);margin-top:80px}.social-welcome i{font-size:60px;margin-bottom:20px;width:100px;height:100px;line-height:100px;border-radius:50%;background:rgba(0,0,0,.1)}.social-loading{text-align:center;margin-top:40px;color:rgba(0,0,0,.54)}.social-loading i{font-size:40px}.activity-column-active{margin:-7.5px}.activity-column-active .activity-column{float:left;width:50%;padding:0 7.5px}"]
                }] }
    ];
    /** @nocollapse */
    ActivityListComponent.ctorParameters = function () { return [
        { type: SocialService }
    ]; };
    ActivityListComponent.propDecorators = {
        activityPost: [{ type: ViewChild, args: ['activityPost',] }],
        postEnable: [{ type: Input }],
        scroller: [{ type: Input }],
        type: [{ type: Input }],
        application: [{ type: Input }],
        loader: [{ type: Input }]
    };
    return ActivityListComponent;
}());
if (false) {
    /** @type {?} */
    ActivityListComponent.prototype.activityPost;
    /** @type {?} */
    ActivityListComponent.prototype.postEnable;
    /** @type {?} */
    ActivityListComponent.prototype.scroller;
    /** @type {?} */
    ActivityListComponent.prototype.type;
    /** @type {?} */
    ActivityListComponent.prototype.application;
    /** @type {?} */
    ActivityListComponent.prototype.loader;
    /** @type {?} */
    ActivityListComponent.prototype.activities;
    /** @type {?} */
    ActivityListComponent.prototype.showLoading;
    /** @type {?} */
    ActivityListComponent.prototype.hasMore;
    /** @type {?} */
    ActivityListComponent.prototype.params;
    /**
     * @type {?}
     * @private
     */
    ActivityListComponent.prototype._activityChange;
    /**
     * @type {?}
     * @private
     */
    ActivityListComponent.prototype._loading;
    /** @type {?} */
    ActivityListComponent.prototype.socialService;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AttachmentListComponent = /** @class */ (function () {
    function AttachmentListComponent(socialService) {
        this.socialService = socialService;
        this.attachments = [];
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
        if (changes.attachments) {
            this._indexFiles();
        }
    };
    /**
     * @param {?} file
     * @param {?} imageEl
     * @return {?}
     */
    AttachmentListComponent.prototype.viewImage = /**
     * @param {?} file
     * @param {?} imageEl
     * @return {?}
     */
    function (file, imageEl) {
        /** @type {?} */
        var options = {
            index: this._getImageIndex(file.id),
            clickElement: imageEl
        };
        this.socialService.viewImages(this._images, options);
    };
    /**
     * @param {?} data
     * @return {?}
     */
    AttachmentListComponent.prototype.viewAttachment = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        /** @type {?} */
        var file = data.file;
        /** @type {?} */
        var attachment = this._getAttachmentById(file.id);
        if (attachment) {
            if (file.image) {
                /** @type {?} */
                var imageEl = data.event.target;
                if (imageEl.tagName !== 'IMG') {
                    // click on image's parent
                    imageEl = imageEl.getElementsByTagName('img')[0];
                }
                this.viewImage(file, imageEl);
            }
            else {
                this.socialService.viewAttachment(attachment);
            }
        }
    };
    /**
     * @private
     * @param {?} id
     * @return {?}
     */
    AttachmentListComponent.prototype._getAttachmentById = /**
     * @private
     * @param {?} id
     * @return {?}
     */
    function (id) {
        for (var i = 0; i < this.attachments.length; i++) {
            if (this.attachments[i].gridfsUUID === id) {
                return this.attachments[i];
            }
        }
    };
    /**
     * @private
     * @param {?} id
     * @return {?}
     */
    AttachmentListComponent.prototype._getImageIndex = /**
     * @private
     * @param {?} id
     * @return {?}
     */
    function (id) {
        for (var i = 0; i < this._images.length; i++) {
            if (this._images[i].id === id) {
                return i;
            }
        }
        return 0;
    };
    /**
     * @private
     * @return {?}
     */
    AttachmentListComponent.prototype._indexFiles = /**
     * @private
     * @return {?}
     */
    function () {
        this.files = this.socialService.attachmentToFiles(this.attachments);
        // Index images to view later
        this._images = [];
        for (var i = 0; i < this.files.length; i++) {
            if (this.files[i].image) {
                /** @type {?} */
                var attachment = this.attachments[i];
                this._images.push({
                    src: attachment.pathView,
                    id: attachment.gridfsUUID,
                    w: 1,
                    h: 1,
                    sizeDynamic: true
                });
            }
        }
    };
    AttachmentListComponent.decorators = [
        { type: Component, args: [{
                    selector: '[attachmentList]',
                    template: "<file-list [files]=\"files\" [removable]=\"false\" (onClick)=\"viewAttachment($event)\"></file-list>",
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    AttachmentListComponent.ctorParameters = function () { return [
        { type: SocialService }
    ]; };
    AttachmentListComponent.propDecorators = {
        attachments: [{ type: Input }]
    };
    return AttachmentListComponent;
}());
if (false) {
    /** @type {?} */
    AttachmentListComponent.prototype.attachments;
    /** @type {?} */
    AttachmentListComponent.prototype.files;
    /**
     * @type {?}
     * @private
     */
    AttachmentListComponent.prototype._images;
    /**
     * @type {?}
     * @private
     */
    AttachmentListComponent.prototype.socialService;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var SocialLatestComponent = /** @class */ (function () {
    function SocialLatestComponent(socialService, router) {
        this.socialService = socialService;
        this.router = router;
        this.viewMoreEnable = true;
        this.activities = [];
    }
    /**
     * @return {?}
     */
    SocialLatestComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this._loadLatest();
    };
    /**
     * @param {?} activity
     * @return {?}
     */
    SocialLatestComponent.prototype.viewActivity = /**
     * @param {?} activity
     * @return {?}
     */
    function (activity) {
        // this.onViewItem.emit(activity);
        this.router.navigate(['social/activity/' + (activity['activityID'] || activity['uuid'])]);
    };
    /**
     * @return {?}
     */
    SocialLatestComponent.prototype.viewMore = /**
     * @return {?}
     */
    function () {
        // this.onViewMore.emit();
        this.router.navigate(['social']);
    };
    /**
     * @private
     * @return {?}
     */
    SocialLatestComponent.prototype._loadLatest = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.socialService.activityWall({
            pageSize: 3
        }, (/**
         * @param {?} result
         * @return {?}
         */
        function (result) {
            /** @type {?} */
            var items = result && result['items'] || [];
            if (items.length > 0) {
                _this._updateWithCommentLatest(items, (/**
                 * @return {?}
                 */
                function () {
                    items.sort((/**
                     * @param {?} a
                     * @param {?} b
                     * @return {?}
                     */
                    function (a, b) { return (b.lastUpdate || b.posted) - (a.lastUpdate || a.posted); }));
                    _this.activities = items;
                }));
            }
        }));
    };
    /**
     * @private
     * @param {?} activities
     * @param {?} callback
     * @return {?}
     */
    SocialLatestComponent.prototype._updateWithCommentLatest = /**
     * @private
     * @param {?} activities
     * @param {?} callback
     * @return {?}
     */
    function (activities, callback) {
        var _this = this;
        /** @type {?} */
        var promises = [];
        activities.forEach((/**
         * @param {?} activity
         * @param {?} index
         * @return {?}
         */
        function (activity, index) {
            promises.push(new Promise((/**
             * @param {?} resolve
             * @return {?}
             */
            function (resolve) {
                _this.socialService.commentWall({ pageSize: 1, activity: activity.uuid }, (/**
                 * @param {?} result
                 * @return {?}
                 */
                function (result) {
                    /** @type {?} */
                    var items = result && result['items'] || [];
                    if (items.length > 0) {
                        // Replace activity by latest comment
                        activities[index] = items[0];
                    }
                    resolve();
                }));
            })));
        }));
        Promise.all(promises).then((/**
         * @return {?}
         */
        function () { return callback(); }));
    };
    SocialLatestComponent.decorators = [
        { type: Component, args: [{
                    selector: 'social-latest',
                    template: "<div *ngFor=\"let item of activities\" (click)=\"viewActivity(item)\" class=\"social-latest__item\">\n    <img userAvatar [usercode]=\"item.creator\" class=\"social-latest__avatar\">\n    <div class=\"social-latest__content\">\n        <div>\n            <div class=\"social-latest__time\">{{ (item.lastUpdate || item.posted) | dateShortcut }}</div>\n            <b>{{item.fullname}}</b>\n        </div>\n        <div [innerHTML]=\"item._displayMessage\" class=\"social-latest__message\"></div>\n    </div>\n</div>\n<div *ngIf=\"viewMoreEnable && activities.length\" (click)=\"viewMore()\"\n     class=\"social-latest__item text-center text-primary\">Xem th\u00EAm</div>\n",
                    styles: [".social-latest__item{padding:7px 10px;cursor:pointer;border-top:1px solid rgba(0,0,0,.05)}.social-latest__avatar{width:30px;height:30px;border-radius:50%;float:left}.social-latest__content{overflow:hidden;padding-left:10px}.social-latest__time{float:right;font-size:90%;opacity:.7}.social-latest__message{line-height:16px;max-height:32px;overflow:hidden}"]
                }] }
    ];
    /** @nocollapse */
    SocialLatestComponent.ctorParameters = function () { return [
        { type: SocialService },
        { type: Router }
    ]; };
    SocialLatestComponent.propDecorators = {
        viewMoreEnable: [{ type: Input }]
    };
    return SocialLatestComponent;
}());
if (false) {
    /** @type {?} */
    SocialLatestComponent.prototype.viewMoreEnable;
    /** @type {?} */
    SocialLatestComponent.prototype.activities;
    /**
     * @type {?}
     * @private
     */
    SocialLatestComponent.prototype.socialService;
    /**
     * @type {?}
     * @private
     */
    SocialLatestComponent.prototype.router;
}

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
        { type: Injectable }
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
        { type: Pipe, args: [{
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
        { type: Pipe, args: [{
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
var FileListComponent = /** @class */ (function () {
    function FileListComponent() {
        this.files = [];
        this.removable = true;
        this.onClick = new EventEmitter();
        this.onRemove = new EventEmitter();
    }
    /**
     * @return {?}
     */
    FileListComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        console.log('files', this.files.length, this.files);
        this.galleryOptions = [
            {
                width: '600px',
                height: '400px',
                thumbnailsColumns: 4,
                imageAnimation: NgxGalleryAnimation.Slide
            },
            // max-width 800
            {
                breakpoint: 800,
                width: '100%',
                height: '600px',
                imagePercent: 80,
                thumbnailsPercent: 20,
                thumbnailsMargin: 20,
                thumbnailMargin: 20
            },
            // max-width 400
            {
                breakpoint: 400,
                preview: false
            }
        ];
        this.galleryImages = [
            {
                small: 'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max',
                medium: 'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max',
                big: 'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max'
            },
            {
                small: 'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max',
                medium: 'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max',
                big: 'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max'
            },
            {
                small: 'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max',
                medium: 'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max',
                big: 'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max'
            }
        ];
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
        { type: Component, args: [{
                    selector: 'file-list',
                    template: "<ng-container *ngFor=\"let file of files\">\n    <ng-template *ngTemplateOutlet=\"template ? template : fileItem; context: {file: file}\">\n    </ng-template>\n</ng-container>\n<ng-template #fileItem let-file=\"file\">\n    <div class=\"file-item\" [title]=\"file.name\" (click)=\"clickFile(file, $event)\">\n        <img *ngIf=\"file.image; else icon\" [src]=\"file.url\" class=\"file-item__image\">\n        <ngx-gallery [options]=\"galleryOptions\" [images]=\"galleryImages\"></ngx-gallery>\n\n        <ng-template #icon>\n            <img [src]=\"file.name | fileIcon\" class=\"file-item__image_type\">\n            <div class=\"file-item__name\">{{file.name}}</div>\n        </ng-template>\n        <i *ngIf=\"removable\" (click)=\"removeFile(file)\" class=\"fa fa-times file-item__remove\"></i>\n    </div>\n</ng-template>",
                    styles: [":host{display:block}.file-item{display:flex;align-items:center;width:auto;height:100%;border-radius:2px;position:relative;margin-right:5px;margin-bottom:5px;overflow:hidden;padding:0 5px;cursor:pointer}.file-item__image_type{max-width:36px;max-height:36px;margin-bottom:5px;margin-top:5px;margin-right:5px}.file-item__name{font-size:12px;line-height:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.file-item__remove{position:absolute;right:3px;top:3px;cursor:pointer;width:24px;height:24px;line-height:24px;border-radius:50%;background:rgba(0,0,0,.2);color:#fff;text-align:center;font-size:12px}.file-item__remove:hover{background:rgba(0,0,0,.5)}"]
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
    /** @type {?} */
    FileListComponent.prototype.galleryOptions;
    /** @type {?} */
    FileListComponent.prototype.galleryImages;
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
var FileListModule = /** @class */ (function () {
    function FileListModule() {
    }
    FileListModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        NgxGalleryModule
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
var SocialModule = /** @class */ (function () {
    function SocialModule() {
    }
    SocialModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        PhotoSwipeModule,
                        ReactiveFormsModule,
                        OpenGraphModule,
                        AutocompleteModule,
                        BsDropdownModule.forRoot(),
                        ModalModule.forRoot(),
                        FrontViewModule,
                        CoreModule,
                        FileListModule,
                        DateTimeModule
                    ],
                    exports: [
                        ProgressComponent,
                        ActivityPostComponent,
                        ActivityComponent,
                        ActivityListComponent,
                        AttachmentListComponent,
                        CommentComponent,
                        CommentPostComponent,
                        CommentListComponent,
                        ShareMemberComponent,
                        MessageBodyComponent,
                        LocalNews,
                        ActivityActionMoreComponent,
                        SocialModalViewComponent,
                        SocialComponent,
                        SocialEmbedComponent,
                        ActivityViewComponent,
                        FriendBrowseComponent,
                        FriendInvitationComponent,
                        SocialGroupComponent,
                        ListUserComponent,
                        GroupCreateComponent,
                        GroupMemberComponent,
                        SocialLatestComponent
                    ],
                    declarations: [
                        ProgressComponent,
                        ActivityPostComponent,
                        ActivityComponent,
                        ActivityListComponent,
                        AttachmentListComponent,
                        CommentComponent,
                        CommentPostComponent,
                        CommentListComponent,
                        ShareMemberComponent,
                        MessageBodyComponent,
                        LocalNews,
                        ActivityActionMoreComponent,
                        SocialModalViewComponent,
                        SocialComponent,
                        SocialEmbedComponent,
                        ActivityViewComponent,
                        FriendBrowseComponent,
                        FriendInvitationComponent,
                        SocialGroupComponent,
                        ListUserComponent,
                        GroupCreateComponent,
                        GroupMemberComponent,
                        SocialLatestComponent
                    ],
                    entryComponents: [
                        FriendInvitationComponent,
                        FriendBrowseComponent,
                        SocialGroupComponent
                    ],
                    providers: [
                        SocialService,
                        CacheStorageService,
                        AccentService,
                        FileFormatService$1
                    ]
                },] }
    ];
    return SocialModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var SocialHomeComponent = /** @class */ (function () {
    function SocialHomeComponent() {
    }
    /**
     * @return {?}
     */
    SocialHomeComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    SocialHomeComponent.decorators = [
        { type: Component, args: [{
                    template: "<div style=\"padding:15px;height: calc(100vh - 120px);\n    overflow: auto;\" class=\"d-flex\">\n    <div class=\"social-home__left\" socialActivityList></div>\n\n\n    <div style=\"width: 25%;margin-left: 15px;\">\n        <div class=\"card text-white bg-primary mb-3\">\n            <div class=\"card-header p-2 d-flex justify-content-between align-items-center\">\n                <span>M\u1EDDi ng\u01B0\u1EDDi d\u00F9ng</span>\n                <span style=\"font-size: 28px;\"><i class=\"fa fa-plus-circle\" aria-hidden=\"true\"></i></span>\n            </div>\n        </div>\n<!--        <div class=\"card mb-3\">-->\n<!--            <div class=\"card-body\">-->\n<!--                <h5 class=\"card-title\">Card title</h5>-->\n<!--                <h6 class=\"card-subtitle mb-2 text-muted\">Card subtitle</h6>-->\n<!--                <p class=\"card-text\">Some quick example text to build on the card title and make up the bulk of the-->\n<!--                    card's content.</p>-->\n<!--                <a href=\"#\" class=\"card-link\">Card link</a>-->\n<!--                <a href=\"#\" class=\"card-link\">Another link</a>-->\n<!--            </div>-->\n<!--        </div>-->\n        <div class=\"card text-white mb-3\" style=\"max-width: 18rem;\">\n            <div class=\"card-header bg-info p-2 d-flex justify-content-between align-items-center\">\n                <span>T\u00E1c v\u1EE5</span>\n                <span style=\"font-size: 19px;\"><i class=\"fa fa-plus-circle\" aria-hidden=\"true\"></i></span>\n            </div>\n            <div class=\"card-body p-0\">\n                <ul class=\"list-group list-group-flush\">\n                    <li class=\"text-muted list-group-item d-flex justify-content-between align-items-center\">\n                        <span>\u0110ang x\u1EED l\u00FD</span>\n                        <span style=\"font-size: 13px;\" class=\"badge badge-danger\">3</span>\n                    </li>\n                    <li class=\"text-muted list-group-item d-flex justify-content-between align-items-center\">\n                        <span>Thi\u1EBFt l\u1EADp b\u1EDFi t\u00F4i</span>\n                        <span style=\"font-size: 13px;\" class=\"badge badge-primary\">0</span>\n                    </li>\n                    <li class=\"text-muted list-group-item d-flex justify-content-between align-items-center\">\n                        <span>\u0110ang ch\u1EDD</span>\n                        <span style=\"font-size: 13px;\" class=\"badge badge-warning\">5</span>\n                    </li>\n                </ul>\n            </div>\n        </div>\n\n    </div>\n\n</div>\n",
                    styles: [".social-home{padding:15px}.social-home__right{display:none}.social-home__left{width:75%}"]
                }] }
    ];
    /** @nocollapse */
    SocialHomeComponent.ctorParameters = function () { return []; };
    return SocialHomeComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var SocialActivityViewComponent = /** @class */ (function () {
    function SocialActivityViewComponent(route, router) {
        this.route = route;
        this.router = router;
    }
    /**
     * @return {?}
     */
    SocialActivityViewComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._routerObserver = this.router.events
            .pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        function (event) { return event instanceof NavigationEnd; })))
            .subscribe((/**
         * @return {?}
         */
        function () { return _this._updateActivityId(); }));
        this._updateActivityId();
    };
    /**
     * @return {?}
     */
    SocialActivityViewComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._routerObserver.unsubscribe();
    };
    /**
     * @private
     * @return {?}
     */
    SocialActivityViewComponent.prototype._updateActivityId = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var params = this.route.snapshot.paramMap;
        if (params.get('id')) {
            this.activityId = params.get('id');
        }
    };
    SocialActivityViewComponent.decorators = [
        { type: Component, args: [{
                    template: "<div style=\"padding:15px;\">\n    <div class=\"social-home__right\">\n        <social-right-layout></social-right-layout>\n    </div>\n    <div class=\"social-home__left\">\n        <social-activity-view [activityId]=\"activityId\"></social-activity-view>\n    </div>\n</div>\n",
                    styles: [".social-home{padding:15px}.social-home__right{display:none}.social-home__left{width:75%}"]
                }] }
    ];
    /** @nocollapse */
    SocialActivityViewComponent.ctorParameters = function () { return [
        { type: ActivatedRoute },
        { type: Router }
    ]; };
    return SocialActivityViewComponent;
}());
if (false) {
    /** @type {?} */
    SocialActivityViewComponent.prototype.activityId;
    /**
     * @type {?}
     * @private
     */
    SocialActivityViewComponent.prototype._routerObserver;
    /**
     * @type {?}
     * @private
     */
    SocialActivityViewComponent.prototype.route;
    /**
     * @type {?}
     * @private
     */
    SocialActivityViewComponent.prototype.router;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var routes = [
    {
        path: 'activity/social',
        component: SocialHomeComponent
    },
    {
        path: 'activity/social/activity/:id',
        component: SocialActivityViewComponent
    },
    {
        path: 'activity/social/**',
        redirectTo: 'activity/social',
        pathMatch: 'full'
    },
];
var SocialRoutingModule = /** @class */ (function () {
    function SocialRoutingModule() {
    }
    SocialRoutingModule.decorators = [
        { type: NgModule, args: [{
                    imports: [RouterModule.forChild(routes)],
                    exports: [RouterModule]
                },] }
    ];
    return SocialRoutingModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var SocialFriendComponent = /** @class */ (function () {
    function SocialFriendComponent(router) {
        this.router = router;
        this.tabs = [
            {
                name: 'Trang chủ',
                component: '',
                path: ''
            },
            {
                name: 'Bạn bè',
                component: SocialGroupComponent,
                path: '/friend'
            },
            {
                name: 'Lời mời',
                component: FriendInvitationComponent,
                path: '/friend/invitation'
            },
            {
                name: 'Tìm bạn',
                component: FriendBrowseComponent,
                path: '/friend/browse'
            }
        ];
        this.searchValue = '';
        this.search = new FormControl();
        this.prefix = this.router.url.substring(0, this.router.url.indexOf('/friend'));
    }
    /**
     * @return {?}
     */
    SocialFriendComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._searchEl = $(this.searchEl.nativeElement);
        this.search.valueChanges.subscribe((/**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (_this._searchable) {
                _this._activeComponent.instance.onSearch(value.trim());
            }
        }));
    };
    /**
     * @param {?} data
     * @return {?}
     */
    SocialFriendComponent.prototype.changeTab = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        this.searchValue = '';
    };
    /**
     * @param {?} componentRef
     * @return {?}
     */
    SocialFriendComponent.prototype.loadTabComponent = /**
     * @param {?} componentRef
     * @return {?}
     */
    function (componentRef) {
        var _this = this;
        this._activeComponent = componentRef;
        this._searchable = componentRef.instance.onSearch;
        this.placeholder = componentRef.instance.placeholder || 'Tìm kiếm...';
        if (this._searchable) {
            this._searchEl.show();
            componentRef.instance.clearSearchValue = (/**
             * @return {?}
             */
            function () {
                _this.searchValue = '';
            });
        }
        else {
            this._searchEl.hide();
        }
    };
    SocialFriendComponent.decorators = [
        { type: Component, args: [{
                    template: "<div class=\"friend-toolbar\">\n    <div navigationTab\n         [tabs]=\"tabs\"\n         [viewContainerRef]=\"_tabViewContainer\"\n         [prefix]=\"prefix\"\n         (onChange)=\"changeTab($event)\"\n         (onLoad)=\"loadTabComponent($event)\" class=\"friend-tab\"></div>\n\n    <div #searchEl class=\"input-group search-input\">\n        <div class=\"input-group-prepend\">\n            <i class=\"input-group-text fa fa-search\"></i>\n        </div>\n        <input type=\"text\"\n               [formControl]=\"search\"\n               [(ngModel)]=\"searchValue\"\n               class=\"form-control\" [placeholder]=\"placeholder\">\n    </div>\n</div>\n<div class=\"friend-content\">\n    <ng-container #tabViewContainer></ng-container>\n</div>\n",
                    styles: [".friend-toolbar{border-bottom:1px solid rgba(0,0,0,.12);background:#e5e9ee;margin-bottom:20px;padding:10px 15px;min-height:58px}.friend-tab{float:left;margin-right:25px}.friend-content{padding:0 15px}.search-input{width:300px}@media (max-width:767px){.friend-content{padding:0}.friend-tab{margin:0 0 10px}.search-input{width:100%}}"]
                }] }
    ];
    /** @nocollapse */
    SocialFriendComponent.ctorParameters = function () { return [
        { type: Router }
    ]; };
    SocialFriendComponent.propDecorators = {
        _tabViewContainer: [{ type: ViewChild, args: ['tabViewContainer', { read: ViewContainerRef },] }],
        searchEl: [{ type: ViewChild, args: ['searchEl',] }]
    };
    return SocialFriendComponent;
}());
if (false) {
    /** @type {?} */
    SocialFriendComponent.prototype._tabViewContainer;
    /** @type {?} */
    SocialFriendComponent.prototype.searchEl;
    /** @type {?} */
    SocialFriendComponent.prototype.tabs;
    /** @type {?} */
    SocialFriendComponent.prototype.searchValue;
    /** @type {?} */
    SocialFriendComponent.prototype.search;
    /** @type {?} */
    SocialFriendComponent.prototype.placeholder;
    /** @type {?} */
    SocialFriendComponent.prototype.prefix;
    /**
     * @type {?}
     * @private
     */
    SocialFriendComponent.prototype._activeComponent;
    /**
     * @type {?}
     * @private
     */
    SocialFriendComponent.prototype._searchEl;
    /**
     * @type {?}
     * @private
     */
    SocialFriendComponent.prototype._searchable;
    /**
     * @type {?}
     * @private
     */
    SocialFriendComponent.prototype.router;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var SocialRightLayoutComponent = /** @class */ (function () {
    function SocialRightLayoutComponent() {
    }
    SocialRightLayoutComponent.decorators = [
        { type: Component, args: [{
                    selector: 'social-right-layout',
                    template: "<div class=\"social-home__nav\" routerLink=\"/social/friend\">Danh s\u00E1ch b\u1EA1n b\u00E8</div>\n<div class=\"social-home__nav\" routerLink=\"/social/friend/invitation\">L\u1EDDi m\u1EDDi k\u1EBFt b\u1EA1n</div>\n<div class=\"social-home__nav\" routerLink=\"/social/friend/browse\">Th\u00EAm b\u1EA1n</div>\n",
                    styles: [".social-home__nav{cursor:pointer;border-radius:2px;margin-bottom:15px;padding:0 15px;height:50px;line-height:48px;color:rgba(0,0,0,.8);border:1px solid rgba(0,0,0,.1);background:#fff;font-size:18px}.social-home__nav:hover{color:#007bff;border:1px solid #007bff}"]
                }] }
    ];
    return SocialRightLayoutComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var SocialAppModule = /** @class */ (function () {
    function SocialAppModule() {
    }
    SocialAppModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        FormsModule,
                        ReactiveFormsModule,
                        SocialModule,
                        SocialRoutingModule,
                        NavigationTabModule
                    ],
                    declarations: [
                        SocialHomeComponent,
                        SocialFriendComponent,
                        SocialActivityViewComponent,
                        SocialRightLayoutComponent
                    ]
                },] }
    ];
    return SocialAppModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { ActivityComponent, ActivityListComponent, ActivityPostComponent, ActivityViewComponent, FriendBrowseComponent, FriendInvitationComponent, SocialAppModule, SocialComponent, SocialEmbedComponent, SocialGroupComponent, SocialLatestComponent, SocialModule, SocialService, FileListModule as ɵa, FileIconPipe as ɵb, FileFormatService as ɵc, FileExtPipe as ɵd, FileListComponent as ɵe, ProgressComponent as ɵf, ShareMemberComponent as ɵg, AttachmentListComponent as ɵh, CommentComponent as ɵi, CommentPostComponent as ɵj, CommentListComponent as ɵk, MessageBodyComponent as ɵl, LocalNews as ɵm, ActivityActionMoreComponent as ɵn, SocialModalViewComponent as ɵo, ListUserComponent as ɵp, GroupCreateComponent as ɵq, GroupMemberComponent as ɵr, SocialRoutingModule as ɵs, SocialHomeComponent as ɵt, SocialActivityViewComponent as ɵu, SocialFriendComponent as ɵv, SocialRightLayoutComponent as ɵw };
//# sourceMappingURL=inet-social.js.map
