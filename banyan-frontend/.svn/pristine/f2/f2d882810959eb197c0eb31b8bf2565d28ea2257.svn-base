/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component } from '@angular/core';
import { SocialService } from '../../social.service';
export class FriendInvitationComponent {
    /**
     * @param {?} socialService
     */
    constructor(socialService) {
        this.socialService = socialService;
        // Default group
        this.category = 'Friends';
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._loadReceiveInvite();
        this._loadSendInvite();
    }
    /**
     * @param {?} member
     * @return {?}
     */
    acceptInvite(member) {
        this.socialService.invitationAccept({
            member: member.inviter,
            category: member.category
        }, (/**
         * @param {?} response
         * @param {?} error
         * @return {?}
         */
        (response, error) => {
        }));
        this.invitations.splice(this.invitations.indexOf(member), 1);
        this.noInvitation = this.invitations.length < 1;
    }
    /**
     * @param {?} member
     * @return {?}
     */
    rejectInvite(member) {
        this.socialService.invitationReject({
            member: member.inviter,
            category: member.category
        }, (/**
         * @param {?} response
         * @param {?} error
         * @return {?}
         */
        (response, error) => {
        }));
        this.invitations.splice(this.invitations.indexOf(member), 1);
        this.noInvitation = this.invitations.length < 1;
    }
    /**
     * @param {?} member
     * @return {?}
     */
    removeInvite(member) {
        this.socialService.invitationDelete({
            member: member.usercode,
            category: member.category
        }, (/**
         * @param {?} response
         * @param {?} error
         * @return {?}
         */
        (response, error) => {
        }));
        this.invitationsSend.splice(this.invitationsSend.indexOf(member), 1);
        this.noInvitationSend = this.invitationsSend.length < 1;
    }
    /**
     * @private
     * @return {?}
     */
    _loadReceiveInvite() {
        this.socialService.invitationReceiveList({ pageSize: -1 }, (/**
         * @param {?} respone
         * @param {?} error
         * @return {?}
         */
        (respone, error) => {
            this.invitations = respone && respone.items || [];
            this.noInvitation = this.invitations.length < 1;
        }));
    }
    /**
     * @private
     * @return {?}
     */
    _loadSendInvite() {
        this.socialService.invitationSendList({ pageSize: -1 }, (/**
         * @param {?} respone
         * @param {?} error
         * @return {?}
         */
        (respone, error) => {
            this.invitationsSend = respone && respone.items || [];
            this.noInvitationSend = this.invitationsSend.length < 1;
        }));
    }
}
FriendInvitationComponent.decorators = [
    { type: Component, args: [{
                template: "<div class=\"grid-title\">\n  L\u1EDDi m\u1EDDi k\u1EBFt b\u1EA1n\n</div>\n<div class=\"grid-container\">\n  <div class=\"grid-item\" *ngFor=\"let invite of invitations\">\n      <img userAvatar [usercode]=\"invite.usercode\" class=\"grid-item__icon\">\n      <div class=\"grid-item__content\">\n        <div class=\"grid-content__ellipsis\">{{invite.fullname}}</div>\n          <div class=\"grid-content__brief\">{{invite.usercode}}</div>\n      </div>\n      <button (click)=\"acceptInvite(invite)\"\n              class=\"grid-item__btn btn btn-sm btn-primary\"\n              title=\"Th\u00EAm b\u1EA1n\">\n          <i class=\"fa fa-check\"></i>\n      </button>\n      <button (click)=\"rejectInvite(invite)\"\n              class=\"grid-item__btn btn btn-sm btn-danger\"\n              title=\"T\u1EEB ch\u1ED1i\">\n          <i class=\"fa fa-trash\"></i>\n      </button>\n  </div>\n  <div class=\"grid-item grid-item__sm\" *ngIf=\"noInvitation\">\n      <i class=\"grid-item__icon fa fa-bell\"></i>\n      <div class=\"grid-item__content\">Ch\u01B0a c\u00F3 l\u1EDDi m\u1EDDi k\u1EBFt b\u1EA1n m\u1EDBi</div>\n  </div>\n</div>\n\n<div class=\"grid-title\">\n  L\u1EDDi m\u1EDDi \u0111\u00E3 g\u1EEDi\n</div>\n<div class=\"grid-container\">\n  <div class=\"grid-item\" *ngFor=\"let invite of invitationsSend\">\n      <img userAvatar [usercode]=\"invite.usercode\" class=\"grid-item__icon\">\n      <div class=\"grid-item__content\">\n        <div class=\"grid-content__ellipsis\">{{invite.username}}</div>\n        <div class=\"grid-content__brief\">{{invite.usercode}}</div>\n      </div>\n      <button (click)=\"removeInvite(invite)\" class=\"grid-item__btn btn btn-sm btn-danger\">\n          <i class=\"fa fa-trash\"></i>\n      </button>\n  </div>\n  <div class=\"grid-item grid-item__sm\" *ngIf=\"noInvitationSend\">\n      <i class=\"grid-item__icon fa fa-bell\"></i>\n      <div class=\"grid-item__content\">Ch\u01B0a g\u1EEDi l\u1EDDi m\u1EDDi k\u1EBFt b\u1EA1n n\u00E0o</div>\n  </div>\n</div>\n",
                styles: [".grid-title{color:rgba(0,0,0,.54);font-size:14px;margin:8px;font-weight:700}.grid-container{padding-bottom:20px;overflow:hidden}.grid-item{float:left;width:50%;padding:0 15px;margin-right:-1px;margin-bottom:-1px;border:1px solid rgba(0,0,0,.05);cursor:pointer;display:flex;height:90px;align-items:center}.grid-item__sm{height:80px}.grid-item__icon{width:60px;height:60px;line-height:60px;text-align:center;color:rgba(0,0,0,.54);border-radius:50%;font-size:26px;background:rgba(0,0,0,.05)}.grid-item__btn{line-height:20px;margin-left:5px}.grid-item__content{flex-grow:1;padding:0 10px 0 15px;line-height:20px;overflow:hidden;font-size:16px}.grid-content__brief,.grid-content__ellipsis{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.grid-content__brief{font-size:14px;color:rgba(0,0,0,.4)}@media (max-width:767px){.grid-item{width:100%}.grid-item__icon{width:40px;height:40px;line-height:40px}}", ""]
            }] }
];
/** @nocollapse */
FriendInvitationComponent.ctorParameters = () => [
    { type: SocialService }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJpZW5kLWludml0YXRpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC1zb2NpYWwvIiwic291cmNlcyI6WyJzcmMvc29jaWFsLWZyaWVuZC9pbnZpdGF0aW9uL2ZyaWVuZC1pbnZpdGF0aW9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBUyxNQUFNLGVBQWUsQ0FBQztBQUVoRCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFTbkQsTUFBTSxPQUFPLHlCQUF5Qjs7OztJQVdsQyxZQUNZLGFBQTRCO1FBQTVCLGtCQUFhLEdBQWIsYUFBYSxDQUFlOztRQVR4QyxhQUFRLEdBQVcsU0FBUyxDQUFDO0lBVzdCLENBQUM7Ozs7SUFFRCxRQUFRO1FBQ0osSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQzNCLENBQUM7Ozs7O0lBRUQsWUFBWSxDQUFDLE1BQU07UUFDZixJQUFJLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDO1lBQ2hDLE1BQU0sRUFBRSxNQUFNLENBQUMsT0FBTztZQUN0QixRQUFRLEVBQUUsTUFBTSxDQUFDLFFBQVE7U0FDNUI7Ozs7O1FBQUUsQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLEVBQUU7UUFFdkIsQ0FBQyxFQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM3RCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUNwRCxDQUFDOzs7OztJQUVELFlBQVksQ0FBQyxNQUFNO1FBQ2YsSUFBSSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQztZQUNoQyxNQUFNLEVBQUUsTUFBTSxDQUFDLE9BQU87WUFDdEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxRQUFRO1NBQzVCOzs7OztRQUFFLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxFQUFFO1FBRXZCLENBQUMsRUFBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDN0QsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFDcEQsQ0FBQzs7Ozs7SUFFRCxZQUFZLENBQUMsTUFBTTtRQUNmLElBQUksQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUM7WUFDaEMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxRQUFRO1lBQ3ZCLFFBQVEsRUFBRSxNQUFNLENBQUMsUUFBUTtTQUM1Qjs7Ozs7UUFBRSxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsRUFBRTtRQUV2QixDQUFDLEVBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3JFLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFDNUQsQ0FBQzs7Ozs7SUFFTyxrQkFBa0I7UUFDdEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsQ0FBQyxFQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsRUFBQzs7Ozs7UUFBRSxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRTtZQUN4RSxJQUFJLENBQUMsV0FBVyxHQUFHLE9BQU8sSUFBSSxPQUFPLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQztZQUNsRCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUNwRCxDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7Ozs7O0lBRU8sZUFBZTtRQUNuQixJQUFJLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDLEVBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxFQUFDOzs7OztRQUFFLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFO1lBQ3JFLElBQUksQ0FBQyxlQUFlLEdBQUcsT0FBTyxJQUFJLE9BQU8sQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDO1lBQ3RELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDNUQsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7WUF6RUosU0FBUyxTQUFDO2dCQUNQLDIrREFBaUQ7O2FBS3BEOzs7O1lBUk8sYUFBYTs7OztJQVlqQiw2Q0FBNkI7O0lBRTdCLGdEQUE0Qjs7SUFDNUIsaURBQXNCOztJQUV0QixvREFBZ0M7O0lBQ2hDLHFEQUEwQjs7Ozs7SUFHdEIsa0RBQW9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1NvY2lhbEZyaWVuZH0gZnJvbSAnLi4vLi4vbW9kZWwvU29jaWFsRnJpZW5kJztcbmltcG9ydCB7U29jaWFsU2VydmljZX0gZnJvbSAnLi4vLi4vc29jaWFsLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgICB0ZW1wbGF0ZVVybDogJy4vZnJpZW5kLWludml0YXRpb24uY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogW1xuICAgICAgICAnLi4vc3R5bGUuY3NzJyxcbiAgICAgICAgJy4vZnJpZW5kLWludml0YXRpb24uY29tcG9uZW50LmNzcydcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIEZyaWVuZEludml0YXRpb25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgLy8gRGVmYXVsdCBncm91cFxuICAgIGNhdGVnb3J5OiBzdHJpbmcgPSAnRnJpZW5kcyc7XG5cbiAgICBpbnZpdGF0aW9uczogU29jaWFsRnJpZW5kW107XG4gICAgbm9JbnZpdGF0aW9uOiBib29sZWFuO1xuXG4gICAgaW52aXRhdGlvbnNTZW5kOiBTb2NpYWxGcmllbmRbXTtcbiAgICBub0ludml0YXRpb25TZW5kOiBib29sZWFuO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgc29jaWFsU2VydmljZTogU29jaWFsU2VydmljZVxuICAgICkge1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLl9sb2FkUmVjZWl2ZUludml0ZSgpO1xuICAgICAgICB0aGlzLl9sb2FkU2VuZEludml0ZSgpO1xuICAgIH1cblxuICAgIGFjY2VwdEludml0ZShtZW1iZXIpIHtcbiAgICAgICAgdGhpcy5zb2NpYWxTZXJ2aWNlLmludml0YXRpb25BY2NlcHQoe1xuICAgICAgICAgICAgbWVtYmVyOiBtZW1iZXIuaW52aXRlcixcbiAgICAgICAgICAgIGNhdGVnb3J5OiBtZW1iZXIuY2F0ZWdvcnlcbiAgICAgICAgfSwgKHJlc3BvbnNlLCBlcnJvcikgPT4ge1xuXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmludml0YXRpb25zLnNwbGljZSh0aGlzLmludml0YXRpb25zLmluZGV4T2YobWVtYmVyKSwgMSk7XG4gICAgICAgIHRoaXMubm9JbnZpdGF0aW9uID0gdGhpcy5pbnZpdGF0aW9ucy5sZW5ndGggPCAxO1xuICAgIH1cblxuICAgIHJlamVjdEludml0ZShtZW1iZXIpIHtcbiAgICAgICAgdGhpcy5zb2NpYWxTZXJ2aWNlLmludml0YXRpb25SZWplY3Qoe1xuICAgICAgICAgICAgbWVtYmVyOiBtZW1iZXIuaW52aXRlcixcbiAgICAgICAgICAgIGNhdGVnb3J5OiBtZW1iZXIuY2F0ZWdvcnlcbiAgICAgICAgfSwgKHJlc3BvbnNlLCBlcnJvcikgPT4ge1xuXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmludml0YXRpb25zLnNwbGljZSh0aGlzLmludml0YXRpb25zLmluZGV4T2YobWVtYmVyKSwgMSk7XG4gICAgICAgIHRoaXMubm9JbnZpdGF0aW9uID0gdGhpcy5pbnZpdGF0aW9ucy5sZW5ndGggPCAxO1xuICAgIH1cblxuICAgIHJlbW92ZUludml0ZShtZW1iZXIpIHtcbiAgICAgICAgdGhpcy5zb2NpYWxTZXJ2aWNlLmludml0YXRpb25EZWxldGUoe1xuICAgICAgICAgICAgbWVtYmVyOiBtZW1iZXIudXNlcmNvZGUsXG4gICAgICAgICAgICBjYXRlZ29yeTogbWVtYmVyLmNhdGVnb3J5XG4gICAgICAgIH0sIChyZXNwb25zZSwgZXJyb3IpID0+IHtcblxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5pbnZpdGF0aW9uc1NlbmQuc3BsaWNlKHRoaXMuaW52aXRhdGlvbnNTZW5kLmluZGV4T2YobWVtYmVyKSwgMSk7XG4gICAgICAgIHRoaXMubm9JbnZpdGF0aW9uU2VuZCA9IHRoaXMuaW52aXRhdGlvbnNTZW5kLmxlbmd0aCA8IDE7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfbG9hZFJlY2VpdmVJbnZpdGUoKSB7XG4gICAgICAgIHRoaXMuc29jaWFsU2VydmljZS5pbnZpdGF0aW9uUmVjZWl2ZUxpc3Qoe3BhZ2VTaXplOiAtMX0sIChyZXNwb25lLCBlcnJvcikgPT4ge1xuICAgICAgICAgICAgdGhpcy5pbnZpdGF0aW9ucyA9IHJlc3BvbmUgJiYgcmVzcG9uZS5pdGVtcyB8fCBbXTtcbiAgICAgICAgICAgIHRoaXMubm9JbnZpdGF0aW9uID0gdGhpcy5pbnZpdGF0aW9ucy5sZW5ndGggPCAxO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9sb2FkU2VuZEludml0ZSgpIHtcbiAgICAgICAgdGhpcy5zb2NpYWxTZXJ2aWNlLmludml0YXRpb25TZW5kTGlzdCh7cGFnZVNpemU6IC0xfSwgKHJlc3BvbmUsIGVycm9yKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmludml0YXRpb25zU2VuZCA9IHJlc3BvbmUgJiYgcmVzcG9uZS5pdGVtcyB8fCBbXTtcbiAgICAgICAgICAgIHRoaXMubm9JbnZpdGF0aW9uU2VuZCA9IHRoaXMuaW52aXRhdGlvbnNTZW5kLmxlbmd0aCA8IDE7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==