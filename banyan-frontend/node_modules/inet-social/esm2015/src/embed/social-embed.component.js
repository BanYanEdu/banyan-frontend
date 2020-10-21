/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SocialActivity } from "../model/Activity";
import { SocialService } from "../social.service";
export class SocialEmbedComponent {
    /**
     * @param {?} socialService
     */
    constructor(socialService) {
        this.socialService = socialService;
        this.allowComment = true;
        this.onLoad = new EventEmitter();
        this.onError = new EventEmitter();
        this.totalComments = 0;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.activity) {
            this._loaded();
        }
        else {
            this._loadActivity();
        }
    }
    /**
     * @private
     * @return {?}
     */
    _loadActivity() {
        /** @type {?} */
        let params;
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
            (activity, err) => {
                if (err) {
                    this.onError.emit(err);
                }
                else {
                    if (activity.errors) {
                        this.onError.emit(activity);
                    }
                    else {
                        this.activity = activity;
                        this._loaded();
                    }
                }
            }));
        }
        else {
            this.onError.emit({
                message: 'NOT_FOUND'
            });
        }
    }
    /**
     * @private
     * @return {?}
     */
    _loaded() {
        this.onLoad.emit(this.activity);
    }
}
SocialEmbedComponent.decorators = [
    { type: Component, args: [{
                selector: 'social-discussion',
                template: "<div *ngIf=\"activity\" socialCommentList\n     [activity]=\"activity\"\n     [allowComment]=\"allowComment\"\n     (commentLoad)=\"totalComments = $event.total\"></div>\n",
                styles: [""]
            }] }
];
/** @nocollapse */
SocialEmbedComponent.ctorParameters = () => [
    { type: SocialService }
];
SocialEmbedComponent.propDecorators = {
    activityID: [{ type: Input }],
    contextID: [{ type: Input }],
    application: [{ type: Input }],
    activity: [{ type: Input }],
    allowComment: [{ type: Input }],
    onLoad: [{ type: Output }],
    onError: [{ type: Output }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29jaWFsLWVtYmVkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtc29jaWFsLyIsInNvdXJjZXMiOlsic3JjL2VtYmVkL3NvY2lhbC1lbWJlZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxZQUFZLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDN0UsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQ2pELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQVNoRCxNQUFNLE9BQU8sb0JBQW9COzs7O0lBYTdCLFlBQ1ksYUFBNEI7UUFBNUIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFSL0IsaUJBQVksR0FBWSxJQUFJLENBQUM7UUFFNUIsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFDakMsWUFBTyxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFFNUMsa0JBQWEsR0FBVyxDQUFDLENBQUM7SUFJdkIsQ0FBQzs7OztJQUVKLFFBQVE7UUFDSixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDZixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDbEI7YUFBTTtZQUNILElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUN4QjtJQUNMLENBQUM7Ozs7O0lBRU8sYUFBYTs7WUFDYixNQUFXO1FBQ2YsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2pCLE1BQU0sR0FBRztnQkFDTCxRQUFRLEVBQUUsSUFBSSxDQUFDLFVBQVU7YUFDNUIsQ0FBQztTQUNMO2FBQU0sSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDM0MsTUFBTSxHQUFHO2dCQUNMLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUztnQkFDekIsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXO2FBQ2hDLENBQUM7U0FDTDtRQUVELElBQUksTUFBTSxFQUFFO1lBQ1IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsTUFBTTs7Ozs7WUFBRSxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsRUFBRTtnQkFDdEQsSUFBSSxHQUFHLEVBQUU7b0JBQ0wsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7aUJBQzFCO3FCQUFNO29CQUNILElBQUksUUFBUSxDQUFDLE1BQU0sRUFBRTt3QkFDakIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7cUJBQy9CO3lCQUFNO3dCQUNILElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO3dCQUN6QixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7cUJBQ2xCO2lCQUNKO1lBQ0wsQ0FBQyxFQUFDLENBQUM7U0FDTjthQUFNO1lBQ0gsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7Z0JBQ2QsT0FBTyxFQUFFLFdBQVc7YUFDdkIsQ0FBQyxDQUFDO1NBQ047SUFDTCxDQUFDOzs7OztJQUVPLE9BQU87UUFDWCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDcEMsQ0FBQzs7O1lBbkVKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsbUJBQW1CO2dCQUM3Qix1TEFBNEM7O2FBSS9DOzs7O1lBUk8sYUFBYTs7O3lCQVVoQixLQUFLO3dCQUNMLEtBQUs7MEJBQ0wsS0FBSzt1QkFDTCxLQUFLOzJCQUVMLEtBQUs7cUJBRUwsTUFBTTtzQkFDTixNQUFNOzs7O0lBUlAsMENBQTRCOztJQUM1Qix5Q0FBMkI7O0lBQzNCLDJDQUE2Qjs7SUFDN0Isd0NBQWtDOztJQUVsQyw0Q0FBc0M7O0lBRXRDLHNDQUEyQzs7SUFDM0MsdUNBQTRDOztJQUU1Qyw2Q0FBMEI7Ozs7O0lBR3RCLDZDQUFvQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBPdXRwdXQsIEV2ZW50RW1pdHRlcn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1NvY2lhbEFjdGl2aXR5fSBmcm9tIFwiLi4vbW9kZWwvQWN0aXZpdHlcIjtcbmltcG9ydCB7U29jaWFsU2VydmljZX0gZnJvbSBcIi4uL3NvY2lhbC5zZXJ2aWNlXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnc29jaWFsLWRpc2N1c3Npb24nLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9zb2NpYWwtZW1iZWQuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogW1xuICAgICAgICAnLi9zb2NpYWwtZW1iZWQuY29tcG9uZW50LmNzcydcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIFNvY2lhbEVtYmVkQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBASW5wdXQoKSBhY3Rpdml0eUlEOiBzdHJpbmc7XG4gICAgQElucHV0KCkgY29udGV4dElEOiBzdHJpbmc7XG4gICAgQElucHV0KCkgYXBwbGljYXRpb246IHN0cmluZztcbiAgICBASW5wdXQoKSBhY3Rpdml0eTogU29jaWFsQWN0aXZpdHk7XG5cbiAgICBASW5wdXQoKSBhbGxvd0NvbW1lbnQ6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQE91dHB1dCgpIG9uTG9hZCA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAgIEBPdXRwdXQoKSBvbkVycm9yID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgICB0b3RhbENvbW1lbnRzOiBudW1iZXIgPSAwO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgc29jaWFsU2VydmljZTogU29jaWFsU2VydmljZVxuICAgICkge31cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBpZiAodGhpcy5hY3Rpdml0eSkge1xuICAgICAgICAgICAgdGhpcy5fbG9hZGVkKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9sb2FkQWN0aXZpdHkoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX2xvYWRBY3Rpdml0eSgpIHtcbiAgICAgICAgbGV0IHBhcmFtczogYW55O1xuICAgICAgICBpZiAodGhpcy5hY3Rpdml0eUlEKSB7XG4gICAgICAgICAgICBwYXJhbXMgPSB7XG4gICAgICAgICAgICAgICAgYWN0aXZpdHk6IHRoaXMuYWN0aXZpdHlJRFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmNvbnRleHRJRCAmJiB0aGlzLmFwcGxpY2F0aW9uKSB7XG4gICAgICAgICAgICBwYXJhbXMgPSB7XG4gICAgICAgICAgICAgICAgY29udGV4dElEOiB0aGlzLmNvbnRleHRJRCxcbiAgICAgICAgICAgICAgICBhcHBsaWNhdGlvbjogdGhpcy5hcHBsaWNhdGlvblxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwYXJhbXMpIHtcbiAgICAgICAgICAgIHRoaXMuc29jaWFsU2VydmljZS5hY3Rpdml0eUxvYWQocGFyYW1zLCAoYWN0aXZpdHksIGVycikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkVycm9yLmVtaXQoZXJyKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoYWN0aXZpdHkuZXJyb3JzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uRXJyb3IuZW1pdChhY3Rpdml0eSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGl2aXR5ID0gYWN0aXZpdHk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb2FkZWQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5vbkVycm9yLmVtaXQoe1xuICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICdOT1RfRk9VTkQnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX2xvYWRlZCgpIHtcbiAgICAgICAgdGhpcy5vbkxvYWQuZW1pdCh0aGlzLmFjdGl2aXR5KTtcbiAgICB9XG59XG4iXX0=