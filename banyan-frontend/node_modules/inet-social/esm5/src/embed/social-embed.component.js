/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SocialActivity } from "../model/Activity";
import { SocialService } from "../social.service";
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
export { SocialEmbedComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29jaWFsLWVtYmVkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtc29jaWFsLyIsInNvdXJjZXMiOlsic3JjL2VtYmVkL3NvY2lhbC1lbWJlZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxZQUFZLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDN0UsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQ2pELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUVoRDtJQW9CSSw4QkFDWSxhQUE0QjtRQUE1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQVIvQixpQkFBWSxHQUFZLElBQUksQ0FBQztRQUU1QixXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUNqQyxZQUFPLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUU1QyxrQkFBYSxHQUFXLENBQUMsQ0FBQztJQUl2QixDQUFDOzs7O0lBRUosdUNBQVE7OztJQUFSO1FBQ0ksSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2YsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ2xCO2FBQU07WUFDSCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDeEI7SUFDTCxDQUFDOzs7OztJQUVPLDRDQUFhOzs7O0lBQXJCO1FBQUEsaUJBK0JDOztZQTlCTyxNQUFXO1FBQ2YsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2pCLE1BQU0sR0FBRztnQkFDTCxRQUFRLEVBQUUsSUFBSSxDQUFDLFVBQVU7YUFDNUIsQ0FBQztTQUNMO2FBQU0sSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDM0MsTUFBTSxHQUFHO2dCQUNMLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUztnQkFDekIsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXO2FBQ2hDLENBQUM7U0FDTDtRQUVELElBQUksTUFBTSxFQUFFO1lBQ1IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsTUFBTTs7Ozs7WUFBRSxVQUFDLFFBQVEsRUFBRSxHQUFHO2dCQUNsRCxJQUFJLEdBQUcsRUFBRTtvQkFDTCxLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDMUI7cUJBQU07b0JBQ0gsSUFBSSxRQUFRLENBQUMsTUFBTSxFQUFFO3dCQUNqQixLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztxQkFDL0I7eUJBQU07d0JBQ0gsS0FBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7d0JBQ3pCLEtBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztxQkFDbEI7aUJBQ0o7WUFDTCxDQUFDLEVBQUMsQ0FBQztTQUNOO2FBQU07WUFDSCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztnQkFDZCxPQUFPLEVBQUUsV0FBVzthQUN2QixDQUFDLENBQUM7U0FDTjtJQUNMLENBQUM7Ozs7O0lBRU8sc0NBQU87Ozs7SUFBZjtRQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNwQyxDQUFDOztnQkFuRUosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxtQkFBbUI7b0JBQzdCLHVMQUE0Qzs7aUJBSS9DOzs7O2dCQVJPLGFBQWE7Ozs2QkFVaEIsS0FBSzs0QkFDTCxLQUFLOzhCQUNMLEtBQUs7MkJBQ0wsS0FBSzsrQkFFTCxLQUFLO3lCQUVMLE1BQU07MEJBQ04sTUFBTTs7SUFvRFgsMkJBQUM7Q0FBQSxBQXBFRCxJQW9FQztTQTdEWSxvQkFBb0I7OztJQUM3QiwwQ0FBNEI7O0lBQzVCLHlDQUEyQjs7SUFDM0IsMkNBQTZCOztJQUM3Qix3Q0FBa0M7O0lBRWxDLDRDQUFzQzs7SUFFdEMsc0NBQTJDOztJQUMzQyx1Q0FBNEM7O0lBRTVDLDZDQUEwQjs7Ozs7SUFHdEIsNkNBQW9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBPbkluaXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7U29jaWFsQWN0aXZpdHl9IGZyb20gXCIuLi9tb2RlbC9BY3Rpdml0eVwiO1xuaW1wb3J0IHtTb2NpYWxTZXJ2aWNlfSBmcm9tIFwiLi4vc29jaWFsLnNlcnZpY2VcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdzb2NpYWwtZGlzY3Vzc2lvbicsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3NvY2lhbC1lbWJlZC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbXG4gICAgICAgICcuL3NvY2lhbC1lbWJlZC5jb21wb25lbnQuY3NzJ1xuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgU29jaWFsRW1iZWRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIEBJbnB1dCgpIGFjdGl2aXR5SUQ6IHN0cmluZztcbiAgICBASW5wdXQoKSBjb250ZXh0SUQ6IHN0cmluZztcbiAgICBASW5wdXQoKSBhcHBsaWNhdGlvbjogc3RyaW5nO1xuICAgIEBJbnB1dCgpIGFjdGl2aXR5OiBTb2NpYWxBY3Rpdml0eTtcblxuICAgIEBJbnB1dCgpIGFsbG93Q29tbWVudDogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBAT3V0cHV0KCkgb25Mb2FkID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gICAgQE91dHB1dCgpIG9uRXJyb3IgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAgIHRvdGFsQ29tbWVudHM6IG51bWJlciA9IDA7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBzb2NpYWxTZXJ2aWNlOiBTb2NpYWxTZXJ2aWNlXG4gICAgKSB7fVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGlmICh0aGlzLmFjdGl2aXR5KSB7XG4gICAgICAgICAgICB0aGlzLl9sb2FkZWQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2xvYWRBY3Rpdml0eSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfbG9hZEFjdGl2aXR5KCkge1xuICAgICAgICBsZXQgcGFyYW1zOiBhbnk7XG4gICAgICAgIGlmICh0aGlzLmFjdGl2aXR5SUQpIHtcbiAgICAgICAgICAgIHBhcmFtcyA9IHtcbiAgICAgICAgICAgICAgICBhY3Rpdml0eTogdGhpcy5hY3Rpdml0eUlEXG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY29udGV4dElEICYmIHRoaXMuYXBwbGljYXRpb24pIHtcbiAgICAgICAgICAgIHBhcmFtcyA9IHtcbiAgICAgICAgICAgICAgICBjb250ZXh0SUQ6IHRoaXMuY29udGV4dElELFxuICAgICAgICAgICAgICAgIGFwcGxpY2F0aW9uOiB0aGlzLmFwcGxpY2F0aW9uXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBhcmFtcykge1xuICAgICAgICAgICAgdGhpcy5zb2NpYWxTZXJ2aWNlLmFjdGl2aXR5TG9hZChwYXJhbXMsIChhY3Rpdml0eSwgZXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uRXJyb3IuZW1pdChlcnIpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChhY3Rpdml0eS5lcnJvcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25FcnJvci5lbWl0KGFjdGl2aXR5KTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZpdHkgPSBhY3Rpdml0eTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvYWRlZCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm9uRXJyb3IuZW1pdCh7XG4gICAgICAgICAgICAgICAgbWVzc2FnZTogJ05PVF9GT1VORCdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfbG9hZGVkKCkge1xuICAgICAgICB0aGlzLm9uTG9hZC5lbWl0KHRoaXMuYWN0aXZpdHkpO1xuICAgIH1cbn1cbiJdfQ==