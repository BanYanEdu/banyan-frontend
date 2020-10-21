/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, } from '@angular/core';
import { VideoConferenceService } from "../../video-conference.service";
export class RoomChatComponent {
    /**
     * @param {?} videoService
     */
    constructor(videoService) {
        this.videoService = videoService;
        this.videoPanelVisible = true;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.joinRoom();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.disposeRoom();
    }
    /**
     * @return {?}
     */
    joinRoom() {
        this.videoPanelVisible = false;
        if (!this.videoService.isExistMeet()) {
            return;
        }
        this.disposeRoom();
        this.videoService.join(document.querySelector('#meetRoom'), this.roomName, false, 600);
        this.videoService.getApi().addEventListener('readyToClose', (/**
         * @return {?}
         */
        () => {
            this.disposeRoom();
        }));
    }
    /**
     * @return {?}
     */
    disposeRoom() {
        this.videoPanelVisible = true;
        this.videoService.dispose();
    }
}
RoomChatComponent.decorators = [
    { type: Component, args: [{
                selector: 'room-chat',
                template: "<div class=\"message-video\">\n    <div *ngIf=\"videoPanelVisible\" class=\"container text-center mb-2\" style=\"background: #000000;min-height: 250px;\">\n        <h5 class=\"text-white\" style=\"padding: 40px;\">Cu\u1ED9c h\u1ECDp c\u00F4ng ty , ai c\u0169ng c\u00F3 th\u1EC3 tham gia</h5>\n        <button class=\"btn btn-success\" (click)=\"joinRoom()\">Tham gia</button>\n    </div>\n    <div id=\"meetRoom\" style=\"width: 100%\" [ngClass]=\"{'hide': videoPanelVisible}\"></div>\n</div>\n",
                styles: [""]
            }] }
];
/** @nocollapse */
RoomChatComponent.ctorParameters = () => [
    { type: VideoConferenceService }
];
RoomChatComponent.propDecorators = {
    roomName: [{ type: Input }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vbS1jaGF0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtY2hhdC8iLCJzb3VyY2VzIjpbInNyYy9jb21wb25lbnQvcm9vbS1jaGF0L3Jvb20tY2hhdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQUUsS0FBSyxHQUNuQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQztBQU90RSxNQUFNLE9BQU8saUJBQWlCOzs7O0lBSTFCLFlBQ1ksWUFBb0M7UUFBcEMsaUJBQVksR0FBWixZQUFZLENBQXdCO1FBSGhELHNCQUFpQixHQUFZLElBQUksQ0FBQztJQU1sQyxDQUFDOzs7O0lBRUQsUUFBUTtRQUNKLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNwQixDQUFDOzs7O0lBRUQsV0FBVztRQUNQLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN2QixDQUFDOzs7O0lBRUQsUUFBUTtRQUNKLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUM7UUFDL0IsSUFBRyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLEVBQUU7WUFDakMsT0FBTztTQUNWO1FBQ0QsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLEVBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDdEYsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjOzs7UUFBRyxHQUFFLEVBQUU7WUFDN0QsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3ZCLENBQUMsRUFBQyxDQUFDO0lBQ1AsQ0FBQzs7OztJQUVELFdBQVc7UUFDUCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO1FBQzlCLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDaEMsQ0FBQzs7O1lBdENKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsV0FBVztnQkFDckIsMGZBQXlDOzthQUU1Qzs7OztZQU5PLHNCQUFzQjs7O3VCQVF6QixLQUFLOzs7O0lBQU4scUNBQTBCOztJQUMxQiw4Q0FBa0M7Ozs7O0lBRzlCLHlDQUE0QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQ29tcG9uZW50LCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtWaWRlb0NvbmZlcmVuY2VTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vdmlkZW8tY29uZmVyZW5jZS5zZXJ2aWNlXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncm9vbS1jaGF0JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vcm9vbS1jaGF0LmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9yb29tLWNoYXQuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIFJvb21DaGF0Q29tcG9uZW50IGltcGxlbWVudHMgIE9uSW5pdCwgT25EZXN0cm95e1xuICAgIEBJbnB1dCgpIHJvb21OYW1lOiBzdHJpbmc7XG4gICAgdmlkZW9QYW5lbFZpc2libGU6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgdmlkZW9TZXJ2aWNlOiBWaWRlb0NvbmZlcmVuY2VTZXJ2aWNlLFxuICAgICkge1xuXG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuam9pblJvb20oKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kaXNwb3NlUm9vbSgpO1xuICAgIH1cblxuICAgIGpvaW5Sb29tKCkge1xuICAgICAgICB0aGlzLnZpZGVvUGFuZWxWaXNpYmxlID0gZmFsc2U7XG4gICAgICAgIGlmKCF0aGlzLnZpZGVvU2VydmljZS5pc0V4aXN0TWVldCgpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kaXNwb3NlUm9vbSgpO1xuICAgICAgICB0aGlzLnZpZGVvU2VydmljZS5qb2luKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtZWV0Um9vbScpLHRoaXMucm9vbU5hbWUsIGZhbHNlLCA2MDApO1xuICAgICAgICB0aGlzLnZpZGVvU2VydmljZS5nZXRBcGkoKS5hZGRFdmVudExpc3RlbmVyKCdyZWFkeVRvQ2xvc2UnLCAgKCk9PiB7XG4gICAgICAgICAgICB0aGlzLmRpc3Bvc2VSb29tKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGRpc3Bvc2VSb29tKCkge1xuICAgICAgICB0aGlzLnZpZGVvUGFuZWxWaXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy52aWRlb1NlcnZpY2UuZGlzcG9zZSgpO1xuICAgIH1cbn1cbiJdfQ==