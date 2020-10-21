/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component } from '@angular/core';
import { SocialService } from '../../social.service';
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
export { FriendInvitationComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJpZW5kLWludml0YXRpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC1zb2NpYWwvIiwic291cmNlcyI6WyJzcmMvc29jaWFsLWZyaWVuZC9pbnZpdGF0aW9uL2ZyaWVuZC1pbnZpdGF0aW9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBUyxNQUFNLGVBQWUsQ0FBQztBQUVoRCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFFbkQ7SUFrQkksbUNBQ1ksYUFBNEI7UUFBNUIsa0JBQWEsR0FBYixhQUFhLENBQWU7O1FBVHhDLGFBQVEsR0FBVyxTQUFTLENBQUM7SUFXN0IsQ0FBQzs7OztJQUVELDRDQUFROzs7SUFBUjtRQUNJLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQzFCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUMzQixDQUFDOzs7OztJQUVELGdEQUFZOzs7O0lBQVosVUFBYSxNQUFNO1FBQ2YsSUFBSSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQztZQUNoQyxNQUFNLEVBQUUsTUFBTSxDQUFDLE9BQU87WUFDdEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxRQUFRO1NBQzVCOzs7OztRQUFFLFVBQUMsUUFBUSxFQUFFLEtBQUs7UUFFbkIsQ0FBQyxFQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM3RCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUNwRCxDQUFDOzs7OztJQUVELGdEQUFZOzs7O0lBQVosVUFBYSxNQUFNO1FBQ2YsSUFBSSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQztZQUNoQyxNQUFNLEVBQUUsTUFBTSxDQUFDLE9BQU87WUFDdEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxRQUFRO1NBQzVCOzs7OztRQUFFLFVBQUMsUUFBUSxFQUFFLEtBQUs7UUFFbkIsQ0FBQyxFQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM3RCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUNwRCxDQUFDOzs7OztJQUVELGdEQUFZOzs7O0lBQVosVUFBYSxNQUFNO1FBQ2YsSUFBSSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQztZQUNoQyxNQUFNLEVBQUUsTUFBTSxDQUFDLFFBQVE7WUFDdkIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxRQUFRO1NBQzVCOzs7OztRQUFFLFVBQUMsUUFBUSxFQUFFLEtBQUs7UUFFbkIsQ0FBQyxFQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNyRSxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQzVELENBQUM7Ozs7O0lBRU8sc0RBQWtCOzs7O0lBQTFCO1FBQUEsaUJBS0M7UUFKRyxJQUFJLENBQUMsYUFBYSxDQUFDLHFCQUFxQixDQUFDLEVBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxFQUFDOzs7OztRQUFFLFVBQUMsT0FBTyxFQUFFLEtBQUs7WUFDcEUsS0FBSSxDQUFDLFdBQVcsR0FBRyxPQUFPLElBQUksT0FBTyxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUM7WUFDbEQsS0FBSSxDQUFDLFlBQVksR0FBRyxLQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDcEQsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7OztJQUVPLG1EQUFlOzs7O0lBQXZCO1FBQUEsaUJBS0M7UUFKRyxJQUFJLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDLEVBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxFQUFDOzs7OztRQUFFLFVBQUMsT0FBTyxFQUFFLEtBQUs7WUFDakUsS0FBSSxDQUFDLGVBQWUsR0FBRyxPQUFPLElBQUksT0FBTyxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUM7WUFDdEQsS0FBSSxDQUFDLGdCQUFnQixHQUFHLEtBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUM1RCxDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7O2dCQXpFSixTQUFTLFNBQUM7b0JBQ1AsMitEQUFpRDs7aUJBS3BEOzs7O2dCQVJPLGFBQWE7O0lBNEVyQixnQ0FBQztDQUFBLEFBMUVELElBMEVDO1NBbkVZLHlCQUF5Qjs7O0lBR2xDLDZDQUE2Qjs7SUFFN0IsZ0RBQTRCOztJQUM1QixpREFBc0I7O0lBRXRCLG9EQUFnQzs7SUFDaEMscURBQTBCOzs7OztJQUd0QixrREFBb0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7U29jaWFsRnJpZW5kfSBmcm9tICcuLi8uLi9tb2RlbC9Tb2NpYWxGcmllbmQnO1xuaW1wb3J0IHtTb2NpYWxTZXJ2aWNlfSBmcm9tICcuLi8uLi9zb2NpYWwuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHRlbXBsYXRlVXJsOiAnLi9mcmllbmQtaW52aXRhdGlvbi5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbXG4gICAgICAgICcuLi9zdHlsZS5jc3MnLFxuICAgICAgICAnLi9mcmllbmQtaW52aXRhdGlvbi5jb21wb25lbnQuY3NzJ1xuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgRnJpZW5kSW52aXRhdGlvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICAvLyBEZWZhdWx0IGdyb3VwXG4gICAgY2F0ZWdvcnk6IHN0cmluZyA9ICdGcmllbmRzJztcblxuICAgIGludml0YXRpb25zOiBTb2NpYWxGcmllbmRbXTtcbiAgICBub0ludml0YXRpb246IGJvb2xlYW47XG5cbiAgICBpbnZpdGF0aW9uc1NlbmQ6IFNvY2lhbEZyaWVuZFtdO1xuICAgIG5vSW52aXRhdGlvblNlbmQ6IGJvb2xlYW47XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBzb2NpYWxTZXJ2aWNlOiBTb2NpYWxTZXJ2aWNlXG4gICAgKSB7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuX2xvYWRSZWNlaXZlSW52aXRlKCk7XG4gICAgICAgIHRoaXMuX2xvYWRTZW5kSW52aXRlKCk7XG4gICAgfVxuXG4gICAgYWNjZXB0SW52aXRlKG1lbWJlcikge1xuICAgICAgICB0aGlzLnNvY2lhbFNlcnZpY2UuaW52aXRhdGlvbkFjY2VwdCh7XG4gICAgICAgICAgICBtZW1iZXI6IG1lbWJlci5pbnZpdGVyLFxuICAgICAgICAgICAgY2F0ZWdvcnk6IG1lbWJlci5jYXRlZ29yeVxuICAgICAgICB9LCAocmVzcG9uc2UsIGVycm9yKSA9PiB7XG5cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuaW52aXRhdGlvbnMuc3BsaWNlKHRoaXMuaW52aXRhdGlvbnMuaW5kZXhPZihtZW1iZXIpLCAxKTtcbiAgICAgICAgdGhpcy5ub0ludml0YXRpb24gPSB0aGlzLmludml0YXRpb25zLmxlbmd0aCA8IDE7XG4gICAgfVxuXG4gICAgcmVqZWN0SW52aXRlKG1lbWJlcikge1xuICAgICAgICB0aGlzLnNvY2lhbFNlcnZpY2UuaW52aXRhdGlvblJlamVjdCh7XG4gICAgICAgICAgICBtZW1iZXI6IG1lbWJlci5pbnZpdGVyLFxuICAgICAgICAgICAgY2F0ZWdvcnk6IG1lbWJlci5jYXRlZ29yeVxuICAgICAgICB9LCAocmVzcG9uc2UsIGVycm9yKSA9PiB7XG5cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuaW52aXRhdGlvbnMuc3BsaWNlKHRoaXMuaW52aXRhdGlvbnMuaW5kZXhPZihtZW1iZXIpLCAxKTtcbiAgICAgICAgdGhpcy5ub0ludml0YXRpb24gPSB0aGlzLmludml0YXRpb25zLmxlbmd0aCA8IDE7XG4gICAgfVxuXG4gICAgcmVtb3ZlSW52aXRlKG1lbWJlcikge1xuICAgICAgICB0aGlzLnNvY2lhbFNlcnZpY2UuaW52aXRhdGlvbkRlbGV0ZSh7XG4gICAgICAgICAgICBtZW1iZXI6IG1lbWJlci51c2VyY29kZSxcbiAgICAgICAgICAgIGNhdGVnb3J5OiBtZW1iZXIuY2F0ZWdvcnlcbiAgICAgICAgfSwgKHJlc3BvbnNlLCBlcnJvcikgPT4ge1xuXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmludml0YXRpb25zU2VuZC5zcGxpY2UodGhpcy5pbnZpdGF0aW9uc1NlbmQuaW5kZXhPZihtZW1iZXIpLCAxKTtcbiAgICAgICAgdGhpcy5ub0ludml0YXRpb25TZW5kID0gdGhpcy5pbnZpdGF0aW9uc1NlbmQubGVuZ3RoIDwgMTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9sb2FkUmVjZWl2ZUludml0ZSgpIHtcbiAgICAgICAgdGhpcy5zb2NpYWxTZXJ2aWNlLmludml0YXRpb25SZWNlaXZlTGlzdCh7cGFnZVNpemU6IC0xfSwgKHJlc3BvbmUsIGVycm9yKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmludml0YXRpb25zID0gcmVzcG9uZSAmJiByZXNwb25lLml0ZW1zIHx8IFtdO1xuICAgICAgICAgICAgdGhpcy5ub0ludml0YXRpb24gPSB0aGlzLmludml0YXRpb25zLmxlbmd0aCA8IDE7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2xvYWRTZW5kSW52aXRlKCkge1xuICAgICAgICB0aGlzLnNvY2lhbFNlcnZpY2UuaW52aXRhdGlvblNlbmRMaXN0KHtwYWdlU2l6ZTogLTF9LCAocmVzcG9uZSwgZXJyb3IpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaW52aXRhdGlvbnNTZW5kID0gcmVzcG9uZSAmJiByZXNwb25lLml0ZW1zIHx8IFtdO1xuICAgICAgICAgICAgdGhpcy5ub0ludml0YXRpb25TZW5kID0gdGhpcy5pbnZpdGF0aW9uc1NlbmQubGVuZ3RoIDwgMTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIl19