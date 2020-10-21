/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { HttpClientService, UserProfileService } from 'inet-core';
import { Contact } from "../model/contact";
var GlobalContactService = /** @class */ (function () {
    function GlobalContactService(http, userProfileService) {
        this.http = http;
        this.userProfileService = userProfileService;
        this.url = {
            // update: iNet.getPUrl('gl/contact/update'),
            update: iNet.getPUrl('system/userprofile/update'),
            upload_photo: iNet.getPUrl('system/userprofile/photoupdate'),
            delete_photo: iNet.getPUrl('system/userprofile/delphoto'),
            update_signature: iNet.getPUrl('system/userprofile/updatesign'),
            remove_signature: iNet.getPUrl('system/userprofile/delsign'),
            view_signature_photo: iNet.getPUrl('usersignature/photo'),
            access_roles: iNet.getPUrl('cloud/subfirmrole/group')
        };
    }
    /**
     * @return {?}
     */
    GlobalContactService.prototype.getProfile = /**
     * @return {?}
     */
    function () {
        return this.userProfileService.getProfile();
    };
    /**
     * @param {?} data
     * @return {?}
     */
    GlobalContactService.prototype.update = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        this.showLoading();
        /** @type {?} */
        var contact = Object.assign(new Contact(), data);
        if (contact.address) {
            contact.addressStr = JSON.stringify(contact.address);
        }
        if (contact.fullDateOfBirth) {
            contact.dateOfBirth = contact.fullDateOfBirth.getTime();
        }
        delete contact.address;
        delete contact.fullName;
        return this.http.postJSON(this.url.update, contact);
    };
    /**
     * @param {?} data
     * @return {?}
     */
    GlobalContactService.prototype.uploadPhoto = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        this.http.showLoading();
        return this.http.post(this.url.upload_photo, data);
    };
    /**
     * @return {?}
     */
    GlobalContactService.prototype.deleteAvatar = /**
     * @return {?}
     */
    function () {
        this.http.showLoading();
        return this.http.post(this.url.delete_photo, null);
    };
    /**
     * @return {?}
     */
    GlobalContactService.prototype.showLoading = /**
     * @return {?}
     */
    function () {
        this.http.showLoading();
    };
    /**
     * @param {?} data
     * @return {?}
     */
    GlobalContactService.prototype.uploadSignaturePhoto = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        this.http.showLoading();
        return this.http.post(this.url.update_signature, data);
    };
    /**
     * @return {?}
     */
    GlobalContactService.prototype.getSignatureImageUrl = /**
     * @return {?}
     */
    function () {
        return this.url.view_signature_photo;
    };
    /**
     * @return {?}
     */
    GlobalContactService.prototype.getAccessRoles = /**
     * @return {?}
     */
    function () {
        return this.http.postJSON(this.url.access_roles);
    };
    GlobalContactService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    GlobalContactService.ctorParameters = function () { return [
        { type: HttpClientService },
        { type: UserProfileService }
    ]; };
    return GlobalContactService;
}());
export { GlobalContactService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    GlobalContactService.prototype.url;
    /**
     * @type {?}
     * @private
     */
    GlobalContactService.prototype.http;
    /**
     * @type {?}
     * @private
     */
    GlobalContactService.prototype.userProfileService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFsLWNvbnRhY3Quc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtdWkvIiwic291cmNlcyI6WyJzcmMvdXNlci1wcm9maWxlL2dsb2JhbC1jb250YWN0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFDLGlCQUFpQixFQUFFLGtCQUFrQixFQUFDLE1BQU0sV0FBVyxDQUFDO0FBQ2hFLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUt6QztJQWNJLDhCQUFvQixJQUF1QixFQUN2QixrQkFBc0M7UUFEdEMsU0FBSSxHQUFKLElBQUksQ0FBbUI7UUFDdkIsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQVpsRCxRQUFHLEdBQUc7O1lBRVYsTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsMkJBQTJCLENBQUM7WUFDakQsWUFBWSxFQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsZ0NBQWdDLENBQUM7WUFDM0QsWUFBWSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsNkJBQTZCLENBQUM7WUFDekQsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQywrQkFBK0IsQ0FBQztZQUMvRCxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLDRCQUE0QixDQUFDO1lBQzVELG9CQUFvQixFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMscUJBQXFCLENBQUM7WUFDekQsWUFBWSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMseUJBQXlCLENBQUM7U0FDeEQsQ0FBQztJQUlGLENBQUM7Ozs7SUFFRCx5Q0FBVTs7O0lBQVY7UUFDSSxPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNoRCxDQUFDOzs7OztJQUVELHFDQUFNOzs7O0lBQU4sVUFBTyxJQUFhO1FBQ2hCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQzs7WUFDYixPQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLE9BQU8sRUFBRSxFQUFFLElBQUksQ0FBQztRQUNsRCxJQUFJLE9BQU8sQ0FBQyxPQUFPLEVBQUU7WUFDakIsT0FBTyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUN4RDtRQUNELElBQUksT0FBTyxDQUFDLGVBQWUsRUFBRTtZQUN6QixPQUFPLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDM0Q7UUFDRCxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUM7UUFDdkIsT0FBTyxPQUFPLENBQUMsUUFBUSxDQUFDO1FBQ3hCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDeEQsQ0FBQzs7Ozs7SUFFRCwwQ0FBVzs7OztJQUFYLFVBQVksSUFBYztRQUN0QixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3hCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDdkQsQ0FBQzs7OztJQUVELDJDQUFZOzs7SUFBWjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDeEIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN2RCxDQUFDOzs7O0lBRUQsMENBQVc7OztJQUFYO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUM1QixDQUFDOzs7OztJQUVELG1EQUFvQjs7OztJQUFwQixVQUFxQixJQUFjO1FBQy9CLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDeEIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzNELENBQUM7Ozs7SUFFRCxtREFBb0I7OztJQUFwQjtRQUNJLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQztJQUN6QyxDQUFDOzs7O0lBRUQsNkNBQWM7OztJQUFkO1FBQ0ksT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3JELENBQUM7O2dCQTdESixVQUFVOzs7O2dCQU5ILGlCQUFpQjtnQkFBRSxrQkFBa0I7O0lBb0U3QywyQkFBQztDQUFBLEFBOURELElBOERDO1NBN0RZLG9CQUFvQjs7Ozs7O0lBRTdCLG1DQVNFOzs7OztJQUVVLG9DQUErQjs7Ozs7SUFDL0Isa0RBQThDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7SHR0cENsaWVudFNlcnZpY2UsIFVzZXJQcm9maWxlU2VydmljZX0gZnJvbSAnaW5ldC1jb3JlJztcbmltcG9ydCB7Q29udGFjdH0gZnJvbSBcIi4uL21vZGVsL2NvbnRhY3RcIjtcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSBcInJ4anMvT2JzZXJ2YWJsZVwiO1xuXG5kZWNsYXJlIGxldCBpTmV0OiBhbnk7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBHbG9iYWxDb250YWN0U2VydmljZSB7XG5cbiAgICBwcml2YXRlIHVybCA9IHtcbiAgICAgICAgLy8gdXBkYXRlOiBpTmV0LmdldFBVcmwoJ2dsL2NvbnRhY3QvdXBkYXRlJyksXG4gICAgICAgIHVwZGF0ZTogaU5ldC5nZXRQVXJsKCdzeXN0ZW0vdXNlcnByb2ZpbGUvdXBkYXRlJyksXG4gICAgICAgIHVwbG9hZF9waG90bzppTmV0LmdldFBVcmwoJ3N5c3RlbS91c2VycHJvZmlsZS9waG90b3VwZGF0ZScpLFxuICAgICAgICBkZWxldGVfcGhvdG86IGlOZXQuZ2V0UFVybCgnc3lzdGVtL3VzZXJwcm9maWxlL2RlbHBob3RvJyksXG4gICAgICAgIHVwZGF0ZV9zaWduYXR1cmU6IGlOZXQuZ2V0UFVybCgnc3lzdGVtL3VzZXJwcm9maWxlL3VwZGF0ZXNpZ24nKSxcbiAgICAgICAgcmVtb3ZlX3NpZ25hdHVyZTogaU5ldC5nZXRQVXJsKCdzeXN0ZW0vdXNlcnByb2ZpbGUvZGVsc2lnbicpLFxuICAgICAgICB2aWV3X3NpZ25hdHVyZV9waG90bzogaU5ldC5nZXRQVXJsKCd1c2Vyc2lnbmF0dXJlL3Bob3RvJyksXG4gICAgICAgIGFjY2Vzc19yb2xlczogaU5ldC5nZXRQVXJsKCdjbG91ZC9zdWJmaXJtcm9sZS9ncm91cCcpXG4gICAgfTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudFNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSB1c2VyUHJvZmlsZVNlcnZpY2U6IFVzZXJQcm9maWxlU2VydmljZSkge1xuICAgIH1cblxuICAgIGdldFByb2ZpbGUoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMudXNlclByb2ZpbGVTZXJ2aWNlLmdldFByb2ZpbGUoKTtcbiAgICB9XG5cbiAgICB1cGRhdGUoZGF0YTogQ29udGFjdCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHRoaXMuc2hvd0xvYWRpbmcoKTtcbiAgICAgICAgY29uc3QgY29udGFjdCA9IE9iamVjdC5hc3NpZ24obmV3IENvbnRhY3QoKSwgZGF0YSk7XG4gICAgICAgIGlmIChjb250YWN0LmFkZHJlc3MpIHtcbiAgICAgICAgICAgIGNvbnRhY3QuYWRkcmVzc1N0ciA9IEpTT04uc3RyaW5naWZ5KGNvbnRhY3QuYWRkcmVzcyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvbnRhY3QuZnVsbERhdGVPZkJpcnRoKSB7XG4gICAgICAgICAgICBjb250YWN0LmRhdGVPZkJpcnRoID0gY29udGFjdC5mdWxsRGF0ZU9mQmlydGguZ2V0VGltZSgpO1xuICAgICAgICB9XG4gICAgICAgIGRlbGV0ZSBjb250YWN0LmFkZHJlc3M7XG4gICAgICAgIGRlbGV0ZSBjb250YWN0LmZ1bGxOYW1lO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3RKU09OKHRoaXMudXJsLnVwZGF0ZSwgY29udGFjdCk7XG4gICAgfVxuXG4gICAgdXBsb2FkUGhvdG8oZGF0YTogRm9ybURhdGEpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICB0aGlzLmh0dHAuc2hvd0xvYWRpbmcoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHRoaXMudXJsLnVwbG9hZF9waG90bywgZGF0YSk7XG4gICAgfVxuXG4gICAgZGVsZXRlQXZhdGFyKCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHRoaXMuaHR0cC5zaG93TG9hZGluZygpO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodGhpcy51cmwuZGVsZXRlX3Bob3RvLCBudWxsKTtcbiAgICB9XG5cbiAgICBzaG93TG9hZGluZygpIHtcbiAgICAgICAgdGhpcy5odHRwLnNob3dMb2FkaW5nKCk7XG4gICAgfVxuXG4gICAgdXBsb2FkU2lnbmF0dXJlUGhvdG8oZGF0YTogRm9ybURhdGEpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICB0aGlzLmh0dHAuc2hvd0xvYWRpbmcoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHRoaXMudXJsLnVwZGF0ZV9zaWduYXR1cmUsIGRhdGEpO1xuICAgIH1cblxuICAgIGdldFNpZ25hdHVyZUltYWdlVXJsKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLnVybC52aWV3X3NpZ25hdHVyZV9waG90bztcbiAgICB9XG5cbiAgICBnZXRBY2Nlc3NSb2xlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0SlNPTih0aGlzLnVybC5hY2Nlc3Nfcm9sZXMpO1xuICAgIH1cbn1cbiJdfQ==