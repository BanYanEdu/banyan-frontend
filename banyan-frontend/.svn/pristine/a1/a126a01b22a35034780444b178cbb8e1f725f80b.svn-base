/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, } from '@angular/core';
import { VideoConferenceService } from "../../video-conference.service";
var RoomChatComponent = /** @class */ (function () {
    function RoomChatComponent(videoService) {
        this.videoService = videoService;
        this.videoPanelVisible = true;
    }
    /**
     * @return {?}
     */
    RoomChatComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.joinRoom();
    };
    /**
     * @return {?}
     */
    RoomChatComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.disposeRoom();
    };
    /**
     * @return {?}
     */
    RoomChatComponent.prototype.joinRoom = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.videoPanelVisible = false;
        if (!this.videoService.isExistMeet()) {
            return;
        }
        this.disposeRoom();
        this.videoService.join(document.querySelector('#meetRoom'), this.roomName, false, 600);
        this.videoService.getApi().addEventListener('readyToClose', (/**
         * @return {?}
         */
        function () {
            _this.disposeRoom();
        }));
    };
    /**
     * @return {?}
     */
    RoomChatComponent.prototype.disposeRoom = /**
     * @return {?}
     */
    function () {
        this.videoPanelVisible = true;
        this.videoService.dispose();
    };
    RoomChatComponent.decorators = [
        { type: Component, args: [{
                    selector: 'room-chat',
                    template: "<div class=\"message-video\">\n    <div *ngIf=\"videoPanelVisible\" class=\"container text-center mb-2\" style=\"background: #000000;min-height: 250px;\">\n        <h5 class=\"text-white\" style=\"padding: 40px;\">Cu\u1ED9c h\u1ECDp c\u00F4ng ty , ai c\u0169ng c\u00F3 th\u1EC3 tham gia</h5>\n        <button class=\"btn btn-success\" (click)=\"joinRoom()\">Tham gia</button>\n    </div>\n    <div id=\"meetRoom\" style=\"width: 100%\" [ngClass]=\"{'hide': videoPanelVisible}\"></div>\n</div>\n",
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    RoomChatComponent.ctorParameters = function () { return [
        { type: VideoConferenceService }
    ]; };
    RoomChatComponent.propDecorators = {
        roomName: [{ type: Input }]
    };
    return RoomChatComponent;
}());
export { RoomChatComponent };
if (false) {
    /** @type {?} */
    RoomChatComponent.prototype.roomName;
    /** @type {?} */
    RoomChatComponent.prototype.videoPanelVisible;
    /**
     * @type {?}
     * @private
     */
    RoomChatComponent.prototype.videoService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vbS1jaGF0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtY2hhdC8iLCJzb3VyY2VzIjpbInNyYy9jb21wb25lbnQvcm9vbS1jaGF0L3Jvb20tY2hhdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQUUsS0FBSyxHQUNuQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQztBQUV0RTtJQVNJLDJCQUNZLFlBQW9DO1FBQXBDLGlCQUFZLEdBQVosWUFBWSxDQUF3QjtRQUhoRCxzQkFBaUIsR0FBWSxJQUFJLENBQUM7SUFNbEMsQ0FBQzs7OztJQUVELG9DQUFROzs7SUFBUjtRQUNJLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNwQixDQUFDOzs7O0lBRUQsdUNBQVc7OztJQUFYO1FBQ0ksSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7Ozs7SUFFRCxvQ0FBUTs7O0lBQVI7UUFBQSxpQkFVQztRQVRHLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUM7UUFDL0IsSUFBRyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLEVBQUU7WUFDakMsT0FBTztTQUNWO1FBQ0QsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLEVBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDdEYsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjOzs7UUFBRztZQUN6RCxLQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdkIsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7O0lBRUQsdUNBQVc7OztJQUFYO1FBQ0ksSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQztRQUM5QixJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2hDLENBQUM7O2dCQXRDSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLFdBQVc7b0JBQ3JCLDBmQUF5Qzs7aUJBRTVDOzs7O2dCQU5PLHNCQUFzQjs7OzJCQVF6QixLQUFLOztJQWlDVix3QkFBQztDQUFBLEFBdkNELElBdUNDO1NBbENZLGlCQUFpQjs7O0lBQzFCLHFDQUEwQjs7SUFDMUIsOENBQWtDOzs7OztJQUc5Qix5Q0FBNEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENvbXBvbmVudCwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7VmlkZW9Db25mZXJlbmNlU2VydmljZX0gZnJvbSBcIi4uLy4uL3ZpZGVvLWNvbmZlcmVuY2Uuc2VydmljZVwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Jvb20tY2hhdCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3Jvb20tY2hhdC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vcm9vbS1jaGF0LmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBSb29tQ2hhdENvbXBvbmVudCBpbXBsZW1lbnRzICBPbkluaXQsIE9uRGVzdHJveXtcbiAgICBASW5wdXQoKSByb29tTmFtZTogc3RyaW5nO1xuICAgIHZpZGVvUGFuZWxWaXNpYmxlOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIHZpZGVvU2VydmljZTogVmlkZW9Db25mZXJlbmNlU2VydmljZSxcbiAgICApIHtcblxuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmpvaW5Sb29tKCk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGlzcG9zZVJvb20oKTtcbiAgICB9XG5cbiAgICBqb2luUm9vbSgpIHtcbiAgICAgICAgdGhpcy52aWRlb1BhbmVsVmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICBpZighdGhpcy52aWRlb1NlcnZpY2UuaXNFeGlzdE1lZXQoKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGlzcG9zZVJvb20oKTtcbiAgICAgICAgdGhpcy52aWRlb1NlcnZpY2Uuam9pbihkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbWVldFJvb20nKSx0aGlzLnJvb21OYW1lLCBmYWxzZSwgNjAwKTtcbiAgICAgICAgdGhpcy52aWRlb1NlcnZpY2UuZ2V0QXBpKCkuYWRkRXZlbnRMaXN0ZW5lcigncmVhZHlUb0Nsb3NlJywgICgpPT4ge1xuICAgICAgICAgICAgdGhpcy5kaXNwb3NlUm9vbSgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBkaXNwb3NlUm9vbSgpIHtcbiAgICAgICAgdGhpcy52aWRlb1BhbmVsVmlzaWJsZSA9IHRydWU7XG4gICAgICAgIHRoaXMudmlkZW9TZXJ2aWNlLmRpc3Bvc2UoKTtcbiAgICB9XG59XG4iXX0=