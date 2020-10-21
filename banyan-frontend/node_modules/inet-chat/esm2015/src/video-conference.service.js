/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { ErrorMessage, HttpClientService } from "inet-core";
export class VideoConferenceService {
    /**
     * @param {?} httpService
     */
    constructor(httpService) {
        this.httpService = httpService;
        this.domain = 'jitsi.inetcloud.vn';
        this.messageJoin = { app: 'iChat', conferenceID: '', sender: '', joined: '', inAccess: '' };
        return VideoConferenceService.instance = VideoConferenceService.instance || this;
    }
    /**
     * @param {?} parentNode
     * @param {?} roomName
     * @param {?=} audioOnly
     * @param {?=} height
     * @param {?=} callback
     * @return {?}
     */
    join(parentNode, roomName, audioOnly = false, height = 350, callback) {
        if (!JitsiMeetExternalAPI) {
            return;
        }
        /** @type {?} */
        let tokenId = '';
        this.httpService.postJSON(iNet.getPUrl('conference/authorized'), { roomID: roomName }).subscribe((/**
         * @param {?} data
         * @return {?}
         */
        (data) => {
            tokenId = data.webdata || '';
            this.dispose();
            /** @type {?} */
            const options = {
                roomName: roomName,
                width: '100%',
                height: '100%',
                parentNode: parentNode,
                jwt: tokenId
            };
            if (audioOnly) {
                options.height = '100%';
                options['configOverwrite'] = {
                    startAudioOnly: true,
                    startWithVideoMuted: true
                };
            }
            this.api = new JitsiMeetExternalAPI(this.domain, options);
            if (callback) {
                callback(this.api);
            }
            this.api.executeCommand('sendTones', {
                tones: '12345#',
                // The dial pad touch tones to play. For example, '12345#'.
                duration: 200,
                // Optional. The number of milliseconds each tone should play. The default is 200.
                pause: 200 // Optional. The number of milliseconds between each tone. The default is 200.
            });
            // this.api.executeCommand('displayName', iNet.displayName);
            // this.api.executeCommand('email', iNet.username);
            // this.api.executeCommand('setVideoQuality', 720);
        }));
        /*
        this.api.addEventListener('readyToClose',  ()=> {
            this.dispose();
        });

         */
    }
    /**
     * @param {?} parentNode
     * @param {?} userName
     * @param {?=} audioOnly
     * @param {?=} height
     * @param {?=} callback
     * @return {?}
     */
    callTo(parentNode, userName, audioOnly = false, height = 350, callback) {
        /** @type {?} */
        let conferenceID = '';
        this.httpService.postJSON(iNet.getPUrl('conference/end2end'), { callTo: userName }).subscribe((/**
         * @param {?} data
         * @return {?}
         */
        (data) => {
            if (data.type !== ErrorMessage.TYPE) {
                conferenceID = data.conferenceID || '';
                if (!iNet.isEmpty(conferenceID)) {
                    if (!JitsiMeetExternalAPI) {
                        return;
                    }
                    /** @type {?} */
                    let tokenId = '';
                    /** @type {?} */
                    let messageJSON = { sender: iNet.username, conferenceID: conferenceID };
                    /** @type {?} */
                    let __messageStr = 'uri_message:video_conference:' + this.encodeBase64(JSON.stringify(messageJSON)) || '';
                    // this.chatMessageService.send(userName,__messageStr);
                    this.httpService.postJSON(iNet.getPUrl('conference/authorized'), { roomID: conferenceID }).subscribe((/**
                     * @param {?} data
                     * @return {?}
                     */
                    (data) => {
                        tokenId = data.webdata || '';
                        this.dispose();
                        /** @type {?} */
                        const options = {
                            roomName: conferenceID,
                            width: '100%',
                            height: '100%',
                            parentNode: parentNode,
                            jwt: tokenId
                        };
                        if (audioOnly) {
                            options.height = '100%';
                            options['configOverwrite'] = {
                                startAudioOnly: true,
                                startWithVideoMuted: true
                            };
                        }
                        this.api = new JitsiMeetExternalAPI(this.domain, options);
                        this.messageJoin.sender = iNet.username;
                        this.messageJoin.conferenceID = conferenceID;
                        if (callback) {
                            callback(this.api, __messageStr);
                        }
                        this.api.executeCommand('sendTones', {
                            tones: '12345#',
                            // The dial pad touch tones to play. For example, '12345#'.
                            duration: 200,
                            // Optional. The number of milliseconds each tone should play. The default is 200.
                            pause: 200 // Optional. The number of milliseconds between each tone. The default is 200.
                        });
                        // this.api.executeCommand('displayName', iNet.displayName);
                        // this.api.executeCommand('email', iNet.username);
                        // this.api.executeCommand('setVideoQuality', 720);
                    }));
                }
            }
        }));
        /*
        this.api.addEventListener('readyToClose',  ()=> {
            this.dispose();
        });

         */
    }
    /**
     * @return {?}
     */
    getApi() {
        return this.api;
    }
    /**
     * @return {?}
     */
    dispose() {
        if (this.api) {
            this.api.dispose();
            delete this.api;
        }
    }
    /**
     * @return {?}
     */
    getMessageJoin() {
        return this.messageJoin;
    }
    /**
     * @param {?} receiver
     * @return {?}
     */
    getRoomNameByReceiver(receiver) {
        return iNet.username.split('@')[0] + '_' + receiver.split('@')[0];
    }
    /**
     * @return {?}
     */
    isExistMeet() {
        return !!JitsiMeetExternalAPI;
    }
    /**
     * @param {?} str
     * @return {?}
     */
    encodeBase64(str) {
        return window.btoa(unescape(encodeURIComponent(str)));
    }
}
VideoConferenceService.instance = null;
VideoConferenceService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
VideoConferenceService.ctorParameters = () => [
    { type: HttpClientService }
];
if (false) {
    /** @type {?} */
    VideoConferenceService.instance;
    /** @type {?} */
    VideoConferenceService.prototype.api;
    /** @type {?} */
    VideoConferenceService.prototype.domain;
    /** @type {?} */
    VideoConferenceService.prototype.messageJoin;
    /**
     * @type {?}
     * @private
     */
    VideoConferenceService.prototype.httpService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlkZW8tY29uZmVyZW5jZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC1jaGF0LyIsInNvdXJjZXMiOlsic3JjL3ZpZGVvLWNvbmZlcmVuY2Uuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUMsWUFBWSxFQUFFLGlCQUFpQixFQUFDLE1BQU0sV0FBVyxDQUFDO0FBSzFELE1BQU0sT0FBTyxzQkFBc0I7Ozs7SUFNL0IsWUFBb0IsV0FBOEI7UUFBOUIsZ0JBQVcsR0FBWCxXQUFXLENBQW1CO1FBSmxELFdBQU0sR0FBRyxvQkFBb0IsQ0FBQztRQUM5QixnQkFBVyxHQUFHLEVBQUMsR0FBRyxFQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUMsRUFBRSxFQUFFLE1BQU0sRUFBRyxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFDLENBQUM7UUFJaEYsT0FBTyxzQkFBc0IsQ0FBQyxRQUFRLEdBQUcsc0JBQXNCLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQztJQUNyRixDQUFDOzs7Ozs7Ozs7SUFFRCxJQUFJLENBQUMsVUFBZSxFQUFFLFFBQWdCLEVBQUUsWUFBcUIsS0FBSyxFQUFFLFNBQWlCLEdBQUcsRUFBQyxRQUFtQjtRQUN4RyxJQUFHLENBQUMsb0JBQW9CLEVBQUU7WUFDdEIsT0FBTztTQUNWOztZQUNHLE9BQU8sR0FBRSxFQUFFO1FBQ2YsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQyxFQUFFLEVBQUMsTUFBTSxFQUFHLFFBQVEsRUFBQyxDQUFDLENBQUMsU0FBUzs7OztRQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDckcsT0FBTyxHQUFJLElBQUksQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDO1lBQzlCLElBQUksQ0FBQyxP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QyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN0RSxDQUFDOzs7O0lBRUQsV0FBVztRQUNSLE9BQU8sQ0FBQyxDQUFDLG9CQUFvQixDQUFDO0lBQ2pDLENBQUM7Ozs7O0lBQ0QsWUFBWSxDQUFDLEdBQVc7UUFDcEIsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDMUQsQ0FBQzs7QUExSU0sK0JBQVEsR0FBMkIsSUFBSSxDQUFDOztZQU5sRCxVQUFVOzs7O1lBSlcsaUJBQWlCOzs7O0lBVW5DLGdDQUErQzs7SUFKL0MscUNBQVM7O0lBQ1Qsd0NBQThCOztJQUM5Qiw2Q0FBb0Y7Ozs7O0lBR3hFLDZDQUFzQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Vycm9yTWVzc2FnZSwgSHR0cENsaWVudFNlcnZpY2V9IGZyb20gXCJpbmV0LWNvcmVcIjtcbmRlY2xhcmUgdmFyIEppdHNpTWVldEV4dGVybmFsQVBJOiBhbnk7XG5kZWNsYXJlIGxldCBpTmV0OiBhbnk7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBWaWRlb0NvbmZlcmVuY2VTZXJ2aWNlIHtcbiAgICBhcGk6IGFueTtcbiAgICBkb21haW49ICAnaml0c2kuaW5ldGNsb3VkLnZuJztcbiAgICBtZXNzYWdlSm9pbiA9IHthcHA6J2lDaGF0JywgY29uZmVyZW5jZUlEOicnLCBzZW5kZXIgOiAnJywgam9pbmVkOiAnJywgaW5BY2Nlc3M6ICcnfTtcblxuICAgIHN0YXRpYyBpbnN0YW5jZTogVmlkZW9Db25mZXJlbmNlU2VydmljZSA9IG51bGw7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwU2VydmljZTogSHR0cENsaWVudFNlcnZpY2UpIHtcbiAgICAgICAgcmV0dXJuIFZpZGVvQ29uZmVyZW5jZVNlcnZpY2UuaW5zdGFuY2UgPSBWaWRlb0NvbmZlcmVuY2VTZXJ2aWNlLmluc3RhbmNlIHx8IHRoaXM7XG4gICAgfVxuXG4gICAgam9pbihwYXJlbnROb2RlOiBhbnksIHJvb21OYW1lOiBzdHJpbmcsIGF1ZGlvT25seTogYm9vbGVhbiA9IGZhbHNlLCBoZWlnaHQ6IG51bWJlciA9IDM1MCxjYWxsYmFjaz86IEZ1bmN0aW9uKSB7XG4gICAgICAgIGlmKCFKaXRzaU1lZXRFeHRlcm5hbEFQSSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCB0b2tlbklkID0nJztcbiAgICAgICAgdGhpcy5odHRwU2VydmljZS5wb3N0SlNPTihpTmV0LmdldFBVcmwoJ2NvbmZlcmVuY2UvYXV0aG9yaXplZCcpLCB7cm9vbUlEIDogcm9vbU5hbWV9KS5zdWJzY3JpYmUoKGRhdGEpID0+IHtcbiAgICAgICAgICAgIHRva2VuSWQgPSAgZGF0YS53ZWJkYXRhIHx8ICcnO1xuICAgICAgICAgICAgdGhpcy5kaXNwb3NlKCk7XG4gICAgICAgICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICAgICAgICAgIHJvb21OYW1lOiByb29tTmFtZSxcbiAgICAgICAgICAgICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgICAgICAgICAgIGhlaWdodDogJzEwMCUnLFxuICAgICAgICAgICAgICAgIHBhcmVudE5vZGU6IHBhcmVudE5vZGUsXG4gICAgICAgICAgICAgICAgand0OiB0b2tlbklkXG5cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZihhdWRpb09ubHkpIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zLmhlaWdodCA9ICcxMDAlJztcbiAgICAgICAgICAgICAgICBvcHRpb25zWydjb25maWdPdmVyd3JpdGUnXSA9IHtcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRBdWRpb09ubHk6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0V2l0aFZpZGVvTXV0ZWQ6IHRydWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuYXBpID0gbmV3IEppdHNpTWVldEV4dGVybmFsQVBJKCB0aGlzLmRvbWFpbiwgb3B0aW9ucyk7XG4gICAgICAgICAgICBpZihjYWxsYmFjayl7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sodGhpcy5hcGkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5hcGkuZXhlY3V0ZUNvbW1hbmQoJ3NlbmRUb25lcycsIHtcbiAgICAgICAgICAgICAgICB0b25lczogJzEyMzQ1IycsIC8vIFRoZSBkaWFsIHBhZCB0b3VjaCB0b25lcyB0byBwbGF5LiBGb3IgZXhhbXBsZSwgJzEyMzQ1IycuXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IDIwMCwgLy8gT3B0aW9uYWwuIFRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIGVhY2ggdG9uZSBzaG91bGQgcGxheS4gVGhlIGRlZmF1bHQgaXMgMjAwLlxuICAgICAgICAgICAgICAgIHBhdXNlOiAyMDAgLy8gT3B0aW9uYWwuIFRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIGJldHdlZW4gZWFjaCB0b25lLiBUaGUgZGVmYXVsdCBpcyAyMDAuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gdGhpcy5hcGkuZXhlY3V0ZUNvbW1hbmQoJ2Rpc3BsYXlOYW1lJywgaU5ldC5kaXNwbGF5TmFtZSk7XG4gICAgICAgICAgICAvLyB0aGlzLmFwaS5leGVjdXRlQ29tbWFuZCgnZW1haWwnLCBpTmV0LnVzZXJuYW1lKTtcbiAgICAgICAgICAgIC8vIHRoaXMuYXBpLmV4ZWN1dGVDb21tYW5kKCdzZXRWaWRlb1F1YWxpdHknLCA3MjApO1xuICAgICAgICB9KTtcblxuXG4gICAgICAgIC8qXG4gICAgICAgIHRoaXMuYXBpLmFkZEV2ZW50TGlzdGVuZXIoJ3JlYWR5VG9DbG9zZScsICAoKT0+IHtcbiAgICAgICAgICAgIHRoaXMuZGlzcG9zZSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICAgKi9cbiAgICB9XG4gICAgY2FsbFRvKHBhcmVudE5vZGU6IGFueSx1c2VyTmFtZTogc3RyaW5nLGF1ZGlvT25seTogYm9vbGVhbiA9IGZhbHNlLCBoZWlnaHQ6IG51bWJlciA9IDM1MCxjYWxsYmFjaz86IEZ1bmN0aW9uKSB7XG4gICAgICAgIGxldCBjb25mZXJlbmNlSUQgPScnO1xuICAgICAgICB0aGlzLmh0dHBTZXJ2aWNlLnBvc3RKU09OKGlOZXQuZ2V0UFVybCgnY29uZmVyZW5jZS9lbmQyZW5kJyksIHtjYWxsVG8gOiB1c2VyTmFtZX0pLnN1YnNjcmliZSgoZGF0YSkgPT4ge1xuICAgICAgICAgICAgaWYoZGF0YS50eXBlICE9PSBFcnJvck1lc3NhZ2UuVFlQRSl7XG4gICAgICAgICAgICAgICAgY29uZmVyZW5jZUlEID0gIGRhdGEuY29uZmVyZW5jZUlEIHx8ICcnO1xuICAgICAgICAgICAgICAgIGlmICghaU5ldC5pc0VtcHR5KGNvbmZlcmVuY2VJRCkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYoIUppdHNpTWVldEV4dGVybmFsQVBJKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbGV0IHRva2VuSWQgPScnO1xuICAgICAgICAgICAgICAgICAgICBsZXQgbWVzc2FnZUpTT04gPXtzZW5kZXIgOiBpTmV0LnVzZXJuYW1lLGNvbmZlcmVuY2VJRDpjb25mZXJlbmNlSUR9O1xuICAgICAgICAgICAgICAgICAgICBsZXQgX19tZXNzYWdlU3RyID0gJ3VyaV9tZXNzYWdlOnZpZGVvX2NvbmZlcmVuY2U6Jyt0aGlzLmVuY29kZUJhc2U2NChKU09OLnN0cmluZ2lmeShtZXNzYWdlSlNPTikpIHx8ICcnO1xuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLmNoYXRNZXNzYWdlU2VydmljZS5zZW5kKHVzZXJOYW1lLF9fbWVzc2FnZVN0cik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaHR0cFNlcnZpY2UucG9zdEpTT04oaU5ldC5nZXRQVXJsKCdjb25mZXJlbmNlL2F1dGhvcml6ZWQnKSwge3Jvb21JRCA6IGNvbmZlcmVuY2VJRH0pLnN1YnNjcmliZSgoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW5JZCA9ICBkYXRhLndlYmRhdGEgfHwgJyc7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9vbU5hbWU6IGNvbmZlcmVuY2VJRCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogJzEwMCUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudE5vZGU6IHBhcmVudE5vZGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgand0OiB0b2tlbklkXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihhdWRpb09ubHkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zLmhlaWdodCA9ICcxMDAlJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zWydjb25maWdPdmVyd3JpdGUnXSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRBdWRpb09ubHk6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0V2l0aFZpZGVvTXV0ZWQ6IHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXBpID0gbmV3IEppdHNpTWVldEV4dGVybmFsQVBJKCB0aGlzLmRvbWFpbiwgb3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1lc3NhZ2VKb2luLnNlbmRlciA9aU5ldC51c2VybmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWVzc2FnZUpvaW4uY29uZmVyZW5jZUlEID0gIGNvbmZlcmVuY2VJRDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoY2FsbGJhY2spe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKHRoaXMuYXBpLCBfX21lc3NhZ2VTdHIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hcGkuZXhlY3V0ZUNvbW1hbmQoJ3NlbmRUb25lcycsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b25lczogJzEyMzQ1IycsIC8vIFRoZSBkaWFsIHBhZCB0b3VjaCB0b25lcyB0byBwbGF5LiBGb3IgZXhhbXBsZSwgJzEyMzQ1IycuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDIwMCwgLy8gT3B0aW9uYWwuIFRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIGVhY2ggdG9uZSBzaG91bGQgcGxheS4gVGhlIGRlZmF1bHQgaXMgMjAwLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhdXNlOiAyMDAgLy8gT3B0aW9uYWwuIFRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIGJldHdlZW4gZWFjaCB0b25lLiBUaGUgZGVmYXVsdCBpcyAyMDAuXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuYXBpLmV4ZWN1dGVDb21tYW5kKCdkaXNwbGF5TmFtZScsIGlOZXQuZGlzcGxheU5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5hcGkuZXhlY3V0ZUNvbW1hbmQoJ2VtYWlsJywgaU5ldC51c2VybmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLmFwaS5leGVjdXRlQ29tbWFuZCgnc2V0VmlkZW9RdWFsaXR5JywgNzIwKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuXG4gICAgICAgIC8qXG4gICAgICAgIHRoaXMuYXBpLmFkZEV2ZW50TGlzdGVuZXIoJ3JlYWR5VG9DbG9zZScsICAoKT0+IHtcbiAgICAgICAgICAgIHRoaXMuZGlzcG9zZSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICAgKi9cbiAgICB9XG5cblxuICAgIGdldEFwaSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXBpO1xuICAgIH1cblxuICAgIGRpc3Bvc2UoKXtcbiAgICAgICAgaWYgKHRoaXMuYXBpKSB7XG4gICAgICAgICAgICB0aGlzLmFwaS5kaXNwb3NlKCk7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5hcGk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRNZXNzYWdlSm9pbigpe1xuICAgICAgICByZXR1cm4gdGhpcy5tZXNzYWdlSm9pbjtcbiAgICB9XG5cbiAgICBnZXRSb29tTmFtZUJ5UmVjZWl2ZXIocmVjZWl2ZXI6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBpTmV0LnVzZXJuYW1lLnNwbGl0KCdAJylbMF0gKyAnXycgKyByZWNlaXZlci5zcGxpdCgnQCcpWzBdO1xuICAgIH1cblxuICAgIGlzRXhpc3RNZWV0KCkge1xuICAgICAgIHJldHVybiAhIUppdHNpTWVldEV4dGVybmFsQVBJO1xuICAgIH1cbiAgICBlbmNvZGVCYXNlNjQoc3RyOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5idG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChzdHIpKSk7XG4gICAgfVxufVxuXG4iXX0=