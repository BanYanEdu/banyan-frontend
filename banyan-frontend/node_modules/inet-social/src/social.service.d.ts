import { OnDestroy } from '@angular/core';
import { SocialActivity } from './model/Activity';
import { ActivityParams } from './model/ActivityParams';
import { Attachment } from './model/Attachment';
import { LikeParams } from './model/LikeParams';
import { PolicyIcon } from './model/Config';
import { InvitationParams } from './model/InvitationParams';
import { SocialComment } from './model/Comment';
import { CoreService, HttpClientService, WebSocketClientService } from 'inet-core';
import { Subject, Subscription } from "rxjs";
import { FrontViewService, Photo, PhotoSwipe, FileFormatService } from "inet-ui";
export declare class SocialService implements OnDestroy {
    private httpClient;
    private coreService;
    private photoSwipe;
    private socketService;
    private fileFormatService;
    private frontViewService;
    viewDate: string;
    activityChange: Subject<string>;
    commentChange: Subject<string>;
    private _removeTags;
    private _socket;
    constructor(httpClient: HttpClientService, coreService: CoreService, photoSwipe: PhotoSwipe, socketService: WebSocketClientService, fileFormatService: FileFormatService, frontViewService: FrontViewService);
    ngOnDestroy(): void;
    listGroups(callback: any): Subscription;
    invitationReceiveList(params: any, callback: any): Subscription;
    invitationSendList(params: any, callback: any): Subscription;
    invitationRejectList(params: any, callback: any): Subscription;
    invitationCreate(params: InvitationParams, callback: any): Subscription;
    invitationDelete(params: InvitationParams, callback: any): Subscription;
    invitationReject(params: InvitationParams, callback: any): Subscription;
    invitationAccept(params: InvitationParams, callback: any): Subscription;
    invitationSearch(params: any, callback: any): Subscription;
    listFriends(params: any, callback: any): Subscription;
    groupMemberCreate(params: any, callback: any): Subscription;
    groupMemberDelete(params: any, callback: any): Subscription;
    searchMember(params: any, callback: any): void;
    favoriteList(params: any, callback: any): Subscription;
    activityWall(params: ActivityParams, callback: any): Subscription;
    activityLoad(params: any, callback: any): Subscription;
    activityPost(params: any, callback: any): Subscription;
    activityUpdate(params: any, callback: any): Subscription;
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
    activityUpdateScope(params: any, callback: any): Subscription;
    activityRemove(params: any, callback: any): Subscription;
    activityRemoveFile(params: any, callback: any): Subscription;
    activityLikeList(params: any, callback: any): Subscription;
    activityLike(params: LikeParams, callback: any): Subscription;
    activityUnLike(params: LikeParams, callback: any): Subscription;
    pollLoad(params: any, callback: any): Subscription;
    pollResult(params: any, callback: any): Subscription;
    pollVote(params: any, callback: any): Subscription;
    pollPost(params: any, callback: any): Subscription;
    pollUpdate(params: any, callback: any): Subscription;
    commentWall(params: any, callback: any): Subscription;
    commentPost(params: any, callback: any): Subscription;
    commentUpdate(params: any, callback: any): Subscription;
    commentRemove(params: any, callback: any): Subscription;
    commentLike(params: LikeParams, callback: any): Subscription;
    commentUnLike(params: LikeParams, callback: any): Subscription;
    activityDownLoadUrl(params: BinaryParams): string;
    activityViewUrl(params: BinaryParams): string;
    activityViewOnlineUrl(params: BinaryParams): string;
    commentDownLoadUrl(params: BinaryParams): string;
    commentViewUrl(params: BinaryParams): string;
    commentViewOnlineUrl(params: BinaryParams): string;
    isCommentApp(application: string): boolean;
    isActivityApp(application: string): boolean;
    viewAttachment(attachment: Attachment): void;
    viewImages(images: Photo[], options?: any): void;
    attachmentToFiles(attachments: Attachment[]): any[];
    private getJSON;
    private postJSON;
    private postForm;
    private buildFormData;
    private indexActivity;
    private _indexAttachments;
    private _isSupportViewOnline;
    private _isPdf;
    private _getExt;
    private indexPolicies;
    getIconByType(policy: string): "" | PolicyIcon.Friend | PolicyIcon.Company;
    private splitPolicies;
    private isAllCompany;
    private isAllFriend;
    private isOnlyMe;
    private isImage;
    /**
     * Remove html tag on message
     */
    private secureMessageHtml;
    /**
     * Format message and open graph data to display
     */
    private formatMessageDisplay;
    createOpenGraphMessage(openGraph: Object): string;
    convertLinks(data: any): {};
    encodeBase64(str: string): string;
    createLocalNewsMessage(localNews: Object): string;
    parseSocialDataMessage(activity: SocialActivity | SocialComment): Object;
    decodeBase64(str: string): string;
    private _createTagMessage;
}
export interface FavoriteParams {
    activity: string;
    remove?: boolean;
}
export interface BinaryParams {
    binary: string;
    activity?: string;
    comment?: string;
}
