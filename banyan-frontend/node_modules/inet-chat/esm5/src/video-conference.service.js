/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { ErrorMessage, HttpClientService } from "inet-core";
var VideoConferenceService = /** @class */ (function () {
    function VideoConferenceService(httpService) {
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
    VideoConferenceService.prototype.join = /**
     * @param {?} parentNode
     * @param {?} roomName
     * @param {?=} audioOnly
     * @param {?=} height
     * @param {?=} callback
     * @return {?}
     */
    function (parentNode, roomName, audioOnly, height, callback) {
        var _this = this;
        if (audioOnly === void 0) { audioOnly = false; }
        if (height === void 0) { height = 350; }
        if (!JitsiMeetExternalAPI) {
            return;
        }
        /** @type {?} */
        var tokenId = '';
        this.httpService.postJSON(iNet.getPUrl('conference/authorized'), { roomID: roomName }).subscribe((/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            tokenId = data.webdata || '';
            _this.dispose();
            /** @type {?} */
            var options = {
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
            _this.api = new JitsiMeetExternalAPI(_this.domain, options);
            if (callback) {
                callback(_this.api);
            }
            _this.api.executeCommand('sendTones', {
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
    };
    /**
     * @param {?} parentNode
     * @param {?} userName
     * @param {?=} audioOnly
     * @param {?=} height
     * @param {?=} callback
     * @return {?}
     */
    VideoConferenceService.prototype.callTo = /**
     * @param {?} parentNode
     * @param {?} userName
     * @param {?=} audioOnly
     * @param {?=} height
     * @param {?=} callback
     * @return {?}
     */
    function (parentNode, userName, audioOnly, height, callback) {
        var _this = this;
        if (audioOnly === void 0) { audioOnly = false; }
        if (height === void 0) { height = 350; }
        /** @type {?} */
        var conferenceID = '';
        this.httpService.postJSON(iNet.getPUrl('conference/end2end'), { callTo: userName }).subscribe((/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            if (data.type !== ErrorMessage.TYPE) {
                conferenceID = data.conferenceID || '';
                if (!iNet.isEmpty(conferenceID)) {
                    if (!JitsiMeetExternalAPI) {
                        return;
                    }
                    /** @type {?} */
                    var tokenId_1 = '';
                    /** @type {?} */
                    var messageJSON = { sender: iNet.username, conferenceID: conferenceID };
                    /** @type {?} */
                    var __messageStr_1 = 'uri_message:video_conference:' + _this.encodeBase64(JSON.stringify(messageJSON)) || '';
                    // this.chatMessageService.send(userName,__messageStr);
                    _this.httpService.postJSON(iNet.getPUrl('conference/authorized'), { roomID: conferenceID }).subscribe((/**
                     * @param {?} data
                     * @return {?}
                     */
                    function (data) {
                        tokenId_1 = data.webdata || '';
                        _this.dispose();
                        /** @type {?} */
                        var options = {
                            roomName: conferenceID,
                            width: '100%',
                            height: '100%',
                            parentNode: parentNode,
                            jwt: tokenId_1
                        };
                        if (audioOnly) {
                            options.height = '100%';
                            options['configOverwrite'] = {
                                startAudioOnly: true,
                                startWithVideoMuted: true
                            };
                        }
                        _this.api = new JitsiMeetExternalAPI(_this.domain, options);
                        _this.messageJoin.sender = iNet.username;
                        _this.messageJoin.conferenceID = conferenceID;
                        if (callback) {
                            callback(_this.api, __messageStr_1);
                        }
                        _this.api.executeCommand('sendTones', {
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
    };
    /**
     * @return {?}
     */
    VideoConferenceService.prototype.getApi = /**
     * @return {?}
     */
    function () {
        return this.api;
    };
    /**
     * @return {?}
     */
    VideoConferenceService.prototype.dispose = /**
     * @return {?}
     */
    function () {
        if (this.api) {
            this.api.dispose();
            delete this.api;
        }
    };
    /**
     * @return {?}
     */
    VideoConferenceService.prototype.getMessageJoin = /**
     * @return {?}
     */
    function () {
        return this.messageJoin;
    };
    /**
     * @param {?} receiver
     * @return {?}
     */
    VideoConferenceService.prototype.getRoomNameByReceiver = /**
     * @param {?} receiver
     * @return {?}
     */
    function (receiver) {
        return iNet.username.split('@')[0] + '_' + receiver.split('@')[0];
    };
    /**
     * @return {?}
     */
    VideoConferenceService.prototype.isExistMeet = /**
     * @return {?}
     */
    function () {
        return !!JitsiMeetExternalAPI;
    };
    /**
     * @param {?} str
     * @return {?}
     */
    VideoConferenceService.prototype.encodeBase64 = /**
     * @param {?} str
     * @return {?}
     */
    function (str) {
        return window.btoa(unescape(encodeURIComponent(str)));
    };
    VideoConferenceService.instance = null;
    VideoConferenceService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    VideoConferenceService.ctorParameters = function () { return [
        { type: HttpClientService }
    ]; };
    return VideoConferenceService;
}());
export { VideoConferenceService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlkZW8tY29uZmVyZW5jZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC1jaGF0LyIsInNvdXJjZXMiOlsic3JjL3ZpZGVvLWNvbmZlcmVuY2Uuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUMsWUFBWSxFQUFFLGlCQUFpQixFQUFDLE1BQU0sV0FBVyxDQUFDO0FBSTFEO0lBT0ksZ0NBQW9CLFdBQThCO1FBQTlCLGdCQUFXLEdBQVgsV0FBVyxDQUFtQjtRQUpsRCxXQUFNLEdBQUcsb0JBQW9CLENBQUM7UUFDOUIsZ0JBQVcsR0FBRyxFQUFDLEdBQUcsRUFBQyxPQUFPLEVBQUUsWUFBWSxFQUFDLEVBQUUsRUFBRSxNQUFNLEVBQUcsRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBQyxDQUFDO1FBSWhGLE9BQU8sc0JBQXNCLENBQUMsUUFBUSxHQUFHLHNCQUFzQixDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUM7SUFDckYsQ0FBQzs7Ozs7Ozs7O0lBRUQscUNBQUk7Ozs7Ozs7O0lBQUosVUFBSyxVQUFlLEVBQUUsUUFBZ0IsRUFBRSxTQUEwQixFQUFFLE1BQW9CLEVBQUMsUUFBbUI7UUFBNUcsaUJBOENDO1FBOUN1QywwQkFBQSxFQUFBLGlCQUEwQjtRQUFFLHVCQUFBLEVBQUEsWUFBb0I7UUFDcEYsSUFBRyxDQUFDLG9CQUFvQixFQUFFO1lBQ3RCLE9BQU87U0FDVjs7WUFDRyxPQUFPLEdBQUUsRUFBRTtRQUNmLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsdUJBQXVCLENBQUMsRUFBRSxFQUFDLE1BQU0sRUFBRyxRQUFRLEVBQUMsQ0FBQyxDQUFDLFNBQVM7Ozs7UUFBQyxVQUFDLElBQUk7WUFDakcsT0FBTyxHQUFJLElBQUksQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDO1lBQzlCLEtBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQzs7Z0JBQ1QsT0FBTyxHQUFHO2dCQUNaLFFBQVEsRUFBRSxRQUFRO2dCQUNsQixLQUFLLEVBQUUsTUFBTTtnQkFDYixNQUFNLEVBQUUsTUFBTTtnQkFDZCxVQUFVLEVBQUUsVUFBVTtnQkFDdEIsR0FBRyxFQUFFLE9BQU87YUFFZjtZQUNELElBQUcsU0FBUyxFQUFFO2dCQUNWLE9BQU8sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO2dCQUN4QixPQUFPLENBQUMsaUJBQWlCLENBQUMsR0FBRztvQkFDekIsY0FBYyxFQUFFLElBQUk7b0JBQ3BCLG1CQUFtQixFQUFFLElBQUk7aUJBQzVCLENBQUE7YUFDSjtZQUVELEtBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxvQkFBb0IsQ0FBRSxLQUFJLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQzNELElBQUcsUUFBUSxFQUFDO2dCQUNSLFFBQVEsQ0FBQyxLQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDdEI7WUFDRCxLQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxXQUFXLEVBQUU7Z0JBQ2pDLEtBQUssRUFBRSxRQUFROztnQkFDZixRQUFRLEVBQUUsR0FBRzs7Z0JBQ2IsS0FBSyxFQUFFLEdBQUcsQ0FBQyw4RUFBOEU7YUFDNUYsQ0FBQyxDQUFDO1lBRUgsNERBQTREO1lBQzVELG1EQUFtRDtZQUNuRCxtREFBbUQ7UUFDdkQsQ0FBQyxFQUFDLENBQUM7UUFHSDs7Ozs7V0FLRztJQUNQLENBQUM7Ozs7Ozs7OztJQUNELHVDQUFNOzs7Ozs7OztJQUFOLFVBQU8sVUFBZSxFQUFDLFFBQWdCLEVBQUMsU0FBMEIsRUFBRSxNQUFvQixFQUFDLFFBQW1CO1FBQTVHLGlCQTJEQztRQTNEdUMsMEJBQUEsRUFBQSxpQkFBMEI7UUFBRSx1QkFBQSxFQUFBLFlBQW9COztZQUNoRixZQUFZLEdBQUUsRUFBRTtRQUNwQixJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLG9CQUFvQixDQUFDLEVBQUUsRUFBQyxNQUFNLEVBQUcsUUFBUSxFQUFDLENBQUMsQ0FBQyxTQUFTOzs7O1FBQUMsVUFBQyxJQUFJO1lBQzlGLElBQUcsSUFBSSxDQUFDLElBQUksS0FBSyxZQUFZLENBQUMsSUFBSSxFQUFDO2dCQUMvQixZQUFZLEdBQUksSUFBSSxDQUFDLFlBQVksSUFBSSxFQUFFLENBQUM7Z0JBQ3hDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxFQUFFO29CQUM3QixJQUFHLENBQUMsb0JBQW9CLEVBQUU7d0JBQ3RCLE9BQU87cUJBQ1Y7O3dCQUNHLFNBQU8sR0FBRSxFQUFFOzt3QkFDWCxXQUFXLEdBQUUsRUFBQyxNQUFNLEVBQUcsSUFBSSxDQUFDLFFBQVEsRUFBQyxZQUFZLEVBQUMsWUFBWSxFQUFDOzt3QkFDL0QsY0FBWSxHQUFHLCtCQUErQixHQUFDLEtBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLEVBQUU7b0JBQ3ZHLHVEQUF1RDtvQkFDdkQsS0FBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQyxFQUFFLEVBQUMsTUFBTSxFQUFHLFlBQVksRUFBQyxDQUFDLENBQUMsU0FBUzs7OztvQkFBQyxVQUFDLElBQUk7d0JBQ3JHLFNBQU8sR0FBSSxJQUFJLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQzt3QkFDOUIsS0FBSSxDQUFDLE9BQU8sRUFBRSxDQUFDOzs0QkFDVCxPQUFPLEdBQUc7NEJBQ1osUUFBUSxFQUFFLFlBQVk7NEJBQ3RCLEtBQUssRUFBRSxNQUFNOzRCQUNiLE1BQU0sRUFBRSxNQUFNOzRCQUNkLFVBQVUsRUFBRSxVQUFVOzRCQUN0QixHQUFHLEVBQUUsU0FBTzt5QkFFZjt3QkFDRCxJQUFHLFNBQVMsRUFBRTs0QkFDVixPQUFPLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQzs0QkFDeEIsT0FBTyxDQUFDLGlCQUFpQixDQUFDLEdBQUc7Z0NBQ3pCLGNBQWMsRUFBRSxJQUFJO2dDQUNwQixtQkFBbUIsRUFBRSxJQUFJOzZCQUM1QixDQUFBO3lCQUNKO3dCQUVELEtBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxvQkFBb0IsQ0FBRSxLQUFJLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO3dCQUMzRCxLQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRSxJQUFJLENBQUMsUUFBUSxDQUFDO3dCQUN2QyxLQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksR0FBSSxZQUFZLENBQUM7d0JBRTlDLElBQUcsUUFBUSxFQUFDOzRCQUNSLFFBQVEsQ0FBQyxLQUFJLENBQUMsR0FBRyxFQUFFLGNBQVksQ0FBQyxDQUFDO3lCQUNwQzt3QkFDRCxLQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxXQUFXLEVBQUU7NEJBQ2pDLEtBQUssRUFBRSxRQUFROzs0QkFDZixRQUFRLEVBQUUsR0FBRzs7NEJBQ2IsS0FBSyxFQUFFLEdBQUcsQ0FBQyw4RUFBOEU7eUJBQzVGLENBQUMsQ0FBQzt3QkFDSCw0REFBNEQ7d0JBQzVELG1EQUFtRDt3QkFDbkQsbURBQW1EO29CQUN2RCxDQUFDLEVBQUMsQ0FBQztpQkFDTjthQUNKO1FBQ0wsQ0FBQyxFQUFDLENBQUM7UUFHSDs7Ozs7V0FLRztJQUNQLENBQUM7Ozs7SUFHRCx1Q0FBTTs7O0lBQU47UUFDSSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDcEIsQ0FBQzs7OztJQUVELHdDQUFPOzs7SUFBUDtRQUNJLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNWLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDbkIsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDO1NBQ25CO0lBQ0wsQ0FBQzs7OztJQUVELCtDQUFjOzs7SUFBZDtRQUNJLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUM1QixDQUFDOzs7OztJQUVELHNEQUFxQjs7OztJQUFyQixVQUFzQixRQUFnQjtRQUNsQyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3RFLENBQUM7Ozs7SUFFRCw0Q0FBVzs7O0lBQVg7UUFDRyxPQUFPLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQztJQUNqQyxDQUFDOzs7OztJQUNELDZDQUFZOzs7O0lBQVosVUFBYSxHQUFXO1FBQ3BCLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUExSU0sK0JBQVEsR0FBMkIsSUFBSSxDQUFDOztnQkFObEQsVUFBVTs7OztnQkFKVyxpQkFBaUI7O0lBcUp2Qyw2QkFBQztDQUFBLEFBakpELElBaUpDO1NBaEpZLHNCQUFzQjs7O0lBSy9CLGdDQUErQzs7SUFKL0MscUNBQVM7O0lBQ1Qsd0NBQThCOztJQUM5Qiw2Q0FBb0Y7Ozs7O0lBR3hFLDZDQUFzQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Vycm9yTWVzc2FnZSwgSHR0cENsaWVudFNlcnZpY2V9IGZyb20gXCJpbmV0LWNvcmVcIjtcbmRlY2xhcmUgdmFyIEppdHNpTWVldEV4dGVybmFsQVBJOiBhbnk7XG5kZWNsYXJlIGxldCBpTmV0OiBhbnk7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBWaWRlb0NvbmZlcmVuY2VTZXJ2aWNlIHtcbiAgICBhcGk6IGFueTtcbiAgICBkb21haW49ICAnaml0c2kuaW5ldGNsb3VkLnZuJztcbiAgICBtZXNzYWdlSm9pbiA9IHthcHA6J2lDaGF0JywgY29uZmVyZW5jZUlEOicnLCBzZW5kZXIgOiAnJywgam9pbmVkOiAnJywgaW5BY2Nlc3M6ICcnfTtcblxuICAgIHN0YXRpYyBpbnN0YW5jZTogVmlkZW9Db25mZXJlbmNlU2VydmljZSA9IG51bGw7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwU2VydmljZTogSHR0cENsaWVudFNlcnZpY2UpIHtcbiAgICAgICAgcmV0dXJuIFZpZGVvQ29uZmVyZW5jZVNlcnZpY2UuaW5zdGFuY2UgPSBWaWRlb0NvbmZlcmVuY2VTZXJ2aWNlLmluc3RhbmNlIHx8IHRoaXM7XG4gICAgfVxuXG4gICAgam9pbihwYXJlbnROb2RlOiBhbnksIHJvb21OYW1lOiBzdHJpbmcsIGF1ZGlvT25seTogYm9vbGVhbiA9IGZhbHNlLCBoZWlnaHQ6IG51bWJlciA9IDM1MCxjYWxsYmFjaz86IEZ1bmN0aW9uKSB7XG4gICAgICAgIGlmKCFKaXRzaU1lZXRFeHRlcm5hbEFQSSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCB0b2tlbklkID0nJztcbiAgICAgICAgdGhpcy5odHRwU2VydmljZS5wb3N0SlNPTihpTmV0LmdldFBVcmwoJ2NvbmZlcmVuY2UvYXV0aG9yaXplZCcpLCB7cm9vbUlEIDogcm9vbU5hbWV9KS5zdWJzY3JpYmUoKGRhdGEpID0+IHtcbiAgICAgICAgICAgIHRva2VuSWQgPSAgZGF0YS53ZWJkYXRhIHx8ICcnO1xuICAgICAgICAgICAgdGhpcy5kaXNwb3NlKCk7XG4gICAgICAgICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICAgICAgICAgIHJvb21OYW1lOiByb29tTmFtZSxcbiAgICAgICAgICAgICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgICAgICAgICAgIGhlaWdodDogJzEwMCUnLFxuICAgICAgICAgICAgICAgIHBhcmVudE5vZGU6IHBhcmVudE5vZGUsXG4gICAgICAgICAgICAgICAgand0OiB0b2tlbklkXG5cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZihhdWRpb09ubHkpIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zLmhlaWdodCA9ICcxMDAlJztcbiAgICAgICAgICAgICAgICBvcHRpb25zWydjb25maWdPdmVyd3JpdGUnXSA9IHtcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRBdWRpb09ubHk6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0V2l0aFZpZGVvTXV0ZWQ6IHRydWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuYXBpID0gbmV3IEppdHNpTWVldEV4dGVybmFsQVBJKCB0aGlzLmRvbWFpbiwgb3B0aW9ucyk7XG4gICAgICAgICAgICBpZihjYWxsYmFjayl7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sodGhpcy5hcGkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5hcGkuZXhlY3V0ZUNvbW1hbmQoJ3NlbmRUb25lcycsIHtcbiAgICAgICAgICAgICAgICB0b25lczogJzEyMzQ1IycsIC8vIFRoZSBkaWFsIHBhZCB0b3VjaCB0b25lcyB0byBwbGF5LiBGb3IgZXhhbXBsZSwgJzEyMzQ1IycuXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IDIwMCwgLy8gT3B0aW9uYWwuIFRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIGVhY2ggdG9uZSBzaG91bGQgcGxheS4gVGhlIGRlZmF1bHQgaXMgMjAwLlxuICAgICAgICAgICAgICAgIHBhdXNlOiAyMDAgLy8gT3B0aW9uYWwuIFRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIGJldHdlZW4gZWFjaCB0b25lLiBUaGUgZGVmYXVsdCBpcyAyMDAuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gdGhpcy5hcGkuZXhlY3V0ZUNvbW1hbmQoJ2Rpc3BsYXlOYW1lJywgaU5ldC5kaXNwbGF5TmFtZSk7XG4gICAgICAgICAgICAvLyB0aGlzLmFwaS5leGVjdXRlQ29tbWFuZCgnZW1haWwnLCBpTmV0LnVzZXJuYW1lKTtcbiAgICAgICAgICAgIC8vIHRoaXMuYXBpLmV4ZWN1dGVDb21tYW5kKCdzZXRWaWRlb1F1YWxpdHknLCA3MjApO1xuICAgICAgICB9KTtcblxuXG4gICAgICAgIC8qXG4gICAgICAgIHRoaXMuYXBpLmFkZEV2ZW50TGlzdGVuZXIoJ3JlYWR5VG9DbG9zZScsICAoKT0+IHtcbiAgICAgICAgICAgIHRoaXMuZGlzcG9zZSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICAgKi9cbiAgICB9XG4gICAgY2FsbFRvKHBhcmVudE5vZGU6IGFueSx1c2VyTmFtZTogc3RyaW5nLGF1ZGlvT25seTogYm9vbGVhbiA9IGZhbHNlLCBoZWlnaHQ6IG51bWJlciA9IDM1MCxjYWxsYmFjaz86IEZ1bmN0aW9uKSB7XG4gICAgICAgIGxldCBjb25mZXJlbmNlSUQgPScnO1xuICAgICAgICB0aGlzLmh0dHBTZXJ2aWNlLnBvc3RKU09OKGlOZXQuZ2V0UFVybCgnY29uZmVyZW5jZS9lbmQyZW5kJyksIHtjYWxsVG8gOiB1c2VyTmFtZX0pLnN1YnNjcmliZSgoZGF0YSkgPT4ge1xuICAgICAgICAgICAgaWYoZGF0YS50eXBlICE9PSBFcnJvck1lc3NhZ2UuVFlQRSl7XG4gICAgICAgICAgICAgICAgY29uZmVyZW5jZUlEID0gIGRhdGEuY29uZmVyZW5jZUlEIHx8ICcnO1xuICAgICAgICAgICAgICAgIGlmICghaU5ldC5pc0VtcHR5KGNvbmZlcmVuY2VJRCkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYoIUppdHNpTWVldEV4dGVybmFsQVBJKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbGV0IHRva2VuSWQgPScnO1xuICAgICAgICAgICAgICAgICAgICBsZXQgbWVzc2FnZUpTT04gPXtzZW5kZXIgOiBpTmV0LnVzZXJuYW1lLGNvbmZlcmVuY2VJRDpjb25mZXJlbmNlSUR9O1xuICAgICAgICAgICAgICAgICAgICBsZXQgX19tZXNzYWdlU3RyID0gJ3VyaV9tZXNzYWdlOnZpZGVvX2NvbmZlcmVuY2U6Jyt0aGlzLmVuY29kZUJhc2U2NChKU09OLnN0cmluZ2lmeShtZXNzYWdlSlNPTikpIHx8ICcnO1xuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLmNoYXRNZXNzYWdlU2VydmljZS5zZW5kKHVzZXJOYW1lLF9fbWVzc2FnZVN0cik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaHR0cFNlcnZpY2UucG9zdEpTT04oaU5ldC5nZXRQVXJsKCdjb25mZXJlbmNlL2F1dGhvcml6ZWQnKSwge3Jvb21JRCA6IGNvbmZlcmVuY2VJRH0pLnN1YnNjcmliZSgoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW5JZCA9ICBkYXRhLndlYmRhdGEgfHwgJyc7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9vbU5hbWU6IGNvbmZlcmVuY2VJRCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogJzEwMCUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudE5vZGU6IHBhcmVudE5vZGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgand0OiB0b2tlbklkXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihhdWRpb09ubHkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zLmhlaWdodCA9ICcxMDAlJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zWydjb25maWdPdmVyd3JpdGUnXSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRBdWRpb09ubHk6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0V2l0aFZpZGVvTXV0ZWQ6IHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXBpID0gbmV3IEppdHNpTWVldEV4dGVybmFsQVBJKCB0aGlzLmRvbWFpbiwgb3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1lc3NhZ2VKb2luLnNlbmRlciA9aU5ldC51c2VybmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWVzc2FnZUpvaW4uY29uZmVyZW5jZUlEID0gIGNvbmZlcmVuY2VJRDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoY2FsbGJhY2spe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKHRoaXMuYXBpLCBfX21lc3NhZ2VTdHIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hcGkuZXhlY3V0ZUNvbW1hbmQoJ3NlbmRUb25lcycsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b25lczogJzEyMzQ1IycsIC8vIFRoZSBkaWFsIHBhZCB0b3VjaCB0b25lcyB0byBwbGF5LiBGb3IgZXhhbXBsZSwgJzEyMzQ1IycuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDIwMCwgLy8gT3B0aW9uYWwuIFRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIGVhY2ggdG9uZSBzaG91bGQgcGxheS4gVGhlIGRlZmF1bHQgaXMgMjAwLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhdXNlOiAyMDAgLy8gT3B0aW9uYWwuIFRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIGJldHdlZW4gZWFjaCB0b25lLiBUaGUgZGVmYXVsdCBpcyAyMDAuXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuYXBpLmV4ZWN1dGVDb21tYW5kKCdkaXNwbGF5TmFtZScsIGlOZXQuZGlzcGxheU5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5hcGkuZXhlY3V0ZUNvbW1hbmQoJ2VtYWlsJywgaU5ldC51c2VybmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLmFwaS5leGVjdXRlQ29tbWFuZCgnc2V0VmlkZW9RdWFsaXR5JywgNzIwKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuXG4gICAgICAgIC8qXG4gICAgICAgIHRoaXMuYXBpLmFkZEV2ZW50TGlzdGVuZXIoJ3JlYWR5VG9DbG9zZScsICAoKT0+IHtcbiAgICAgICAgICAgIHRoaXMuZGlzcG9zZSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICAgKi9cbiAgICB9XG5cblxuICAgIGdldEFwaSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXBpO1xuICAgIH1cblxuICAgIGRpc3Bvc2UoKXtcbiAgICAgICAgaWYgKHRoaXMuYXBpKSB7XG4gICAgICAgICAgICB0aGlzLmFwaS5kaXNwb3NlKCk7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5hcGk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRNZXNzYWdlSm9pbigpe1xuICAgICAgICByZXR1cm4gdGhpcy5tZXNzYWdlSm9pbjtcbiAgICB9XG5cbiAgICBnZXRSb29tTmFtZUJ5UmVjZWl2ZXIocmVjZWl2ZXI6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBpTmV0LnVzZXJuYW1lLnNwbGl0KCdAJylbMF0gKyAnXycgKyByZWNlaXZlci5zcGxpdCgnQCcpWzBdO1xuICAgIH1cblxuICAgIGlzRXhpc3RNZWV0KCkge1xuICAgICAgIHJldHVybiAhIUppdHNpTWVldEV4dGVybmFsQVBJO1xuICAgIH1cbiAgICBlbmNvZGVCYXNlNjQoc3RyOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5idG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChzdHIpKSk7XG4gICAgfVxufVxuXG4iXX0=