/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { HttpClientService, UserProfileService } from 'inet-core';
import { Contact } from "../model/contact";
export class GlobalContactService {
    /**
     * @param {?} http
     * @param {?} userProfileService
     */
    constructor(http, userProfileService) {
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
    getProfile() {
        return this.userProfileService.getProfile();
    }
    /**
     * @param {?} data
     * @return {?}
     */
    update(data) {
        this.showLoading();
        /** @type {?} */
        const contact = Object.assign(new Contact(), data);
        if (contact.address) {
            contact.addressStr = JSON.stringify(contact.address);
        }
        if (contact.fullDateOfBirth) {
            contact.dateOfBirth = contact.fullDateOfBirth.getTime();
        }
        delete contact.address;
        delete contact.fullName;
        return this.http.postJSON(this.url.update, contact);
    }
    /**
     * @param {?} data
     * @return {?}
     */
    uploadPhoto(data) {
        this.http.showLoading();
        return this.http.post(this.url.upload_photo, data);
    }
    /**
     * @return {?}
     */
    deleteAvatar() {
        this.http.showLoading();
        return this.http.post(this.url.delete_photo, null);
    }
    /**
     * @return {?}
     */
    showLoading() {
        this.http.showLoading();
    }
    /**
     * @param {?} data
     * @return {?}
     */
    uploadSignaturePhoto(data) {
        this.http.showLoading();
        return this.http.post(this.url.update_signature, data);
    }
    /**
     * @return {?}
     */
    getSignatureImageUrl() {
        return this.url.view_signature_photo;
    }
    /**
     * @return {?}
     */
    getAccessRoles() {
        return this.http.postJSON(this.url.access_roles);
    }
}
GlobalContactService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
GlobalContactService.ctorParameters = () => [
    { type: HttpClientService },
    { type: UserProfileService }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFsLWNvbnRhY3Quc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtdWkvIiwic291cmNlcyI6WyJzcmMvdXNlci1wcm9maWxlL2dsb2JhbC1jb250YWN0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFDLGlCQUFpQixFQUFFLGtCQUFrQixFQUFDLE1BQU0sV0FBVyxDQUFDO0FBQ2hFLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQU16QyxNQUFNLE9BQU8sb0JBQW9COzs7OztJQWE3QixZQUFvQixJQUF1QixFQUN2QixrQkFBc0M7UUFEdEMsU0FBSSxHQUFKLElBQUksQ0FBbUI7UUFDdkIsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQVpsRCxRQUFHLEdBQUc7O1lBRVYsTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsMkJBQTJCLENBQUM7WUFDakQsWUFBWSxFQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsZ0NBQWdDLENBQUM7WUFDM0QsWUFBWSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsNkJBQTZCLENBQUM7WUFDekQsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQywrQkFBK0IsQ0FBQztZQUMvRCxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLDRCQUE0QixDQUFDO1lBQzVELG9CQUFvQixFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMscUJBQXFCLENBQUM7WUFDekQsWUFBWSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMseUJBQXlCLENBQUM7U0FDeEQsQ0FBQztJQUlGLENBQUM7Ozs7SUFFRCxVQUFVO1FBQ04sT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDaEQsQ0FBQzs7Ozs7SUFFRCxNQUFNLENBQUMsSUFBYTtRQUNoQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7O2NBQ2IsT0FBTyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxPQUFPLEVBQUUsRUFBRSxJQUFJLENBQUM7UUFDbEQsSUFBSSxPQUFPLENBQUMsT0FBTyxFQUFFO1lBQ2pCLE9BQU8sQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDeEQ7UUFDRCxJQUFJLE9BQU8sQ0FBQyxlQUFlLEVBQUU7WUFDekIsT0FBTyxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQzNEO1FBQ0QsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDO1FBQ3ZCLE9BQU8sT0FBTyxDQUFDLFFBQVEsQ0FBQztRQUN4QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3hELENBQUM7Ozs7O0lBRUQsV0FBVyxDQUFDLElBQWM7UUFDdEIsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN4QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3ZELENBQUM7Ozs7SUFFRCxZQUFZO1FBQ1IsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN4QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3ZELENBQUM7Ozs7SUFFRCxXQUFXO1FBQ1AsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUM1QixDQUFDOzs7OztJQUVELG9CQUFvQixDQUFDLElBQWM7UUFDL0IsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN4QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDM0QsQ0FBQzs7OztJQUVELG9CQUFvQjtRQUNoQixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUM7SUFDekMsQ0FBQzs7OztJQUVELGNBQWM7UUFDVixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDckQsQ0FBQzs7O1lBN0RKLFVBQVU7Ozs7WUFOSCxpQkFBaUI7WUFBRSxrQkFBa0I7Ozs7Ozs7SUFTekMsbUNBU0U7Ozs7O0lBRVUsb0NBQStCOzs7OztJQUMvQixrREFBOEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtIdHRwQ2xpZW50U2VydmljZSwgVXNlclByb2ZpbGVTZXJ2aWNlfSBmcm9tICdpbmV0LWNvcmUnO1xuaW1wb3J0IHtDb250YWN0fSBmcm9tIFwiLi4vbW9kZWwvY29udGFjdFwiO1xuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tIFwicnhqcy9PYnNlcnZhYmxlXCI7XG5cbmRlY2xhcmUgbGV0IGlOZXQ6IGFueTtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEdsb2JhbENvbnRhY3RTZXJ2aWNlIHtcblxuICAgIHByaXZhdGUgdXJsID0ge1xuICAgICAgICAvLyB1cGRhdGU6IGlOZXQuZ2V0UFVybCgnZ2wvY29udGFjdC91cGRhdGUnKSxcbiAgICAgICAgdXBkYXRlOiBpTmV0LmdldFBVcmwoJ3N5c3RlbS91c2VycHJvZmlsZS91cGRhdGUnKSxcbiAgICAgICAgdXBsb2FkX3Bob3RvOmlOZXQuZ2V0UFVybCgnc3lzdGVtL3VzZXJwcm9maWxlL3Bob3RvdXBkYXRlJyksXG4gICAgICAgIGRlbGV0ZV9waG90bzogaU5ldC5nZXRQVXJsKCdzeXN0ZW0vdXNlcnByb2ZpbGUvZGVscGhvdG8nKSxcbiAgICAgICAgdXBkYXRlX3NpZ25hdHVyZTogaU5ldC5nZXRQVXJsKCdzeXN0ZW0vdXNlcnByb2ZpbGUvdXBkYXRlc2lnbicpLFxuICAgICAgICByZW1vdmVfc2lnbmF0dXJlOiBpTmV0LmdldFBVcmwoJ3N5c3RlbS91c2VycHJvZmlsZS9kZWxzaWduJyksXG4gICAgICAgIHZpZXdfc2lnbmF0dXJlX3Bob3RvOiBpTmV0LmdldFBVcmwoJ3VzZXJzaWduYXR1cmUvcGhvdG8nKSxcbiAgICAgICAgYWNjZXNzX3JvbGVzOiBpTmV0LmdldFBVcmwoJ2Nsb3VkL3N1YmZpcm1yb2xlL2dyb3VwJylcbiAgICB9O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50U2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIHVzZXJQcm9maWxlU2VydmljZTogVXNlclByb2ZpbGVTZXJ2aWNlKSB7XG4gICAgfVxuXG4gICAgZ2V0UHJvZmlsZSgpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy51c2VyUHJvZmlsZVNlcnZpY2UuZ2V0UHJvZmlsZSgpO1xuICAgIH1cblxuICAgIHVwZGF0ZShkYXRhOiBDb250YWN0KTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgdGhpcy5zaG93TG9hZGluZygpO1xuICAgICAgICBjb25zdCBjb250YWN0ID0gT2JqZWN0LmFzc2lnbihuZXcgQ29udGFjdCgpLCBkYXRhKTtcbiAgICAgICAgaWYgKGNvbnRhY3QuYWRkcmVzcykge1xuICAgICAgICAgICAgY29udGFjdC5hZGRyZXNzU3RyID0gSlNPTi5zdHJpbmdpZnkoY29udGFjdC5hZGRyZXNzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29udGFjdC5mdWxsRGF0ZU9mQmlydGgpIHtcbiAgICAgICAgICAgIGNvbnRhY3QuZGF0ZU9mQmlydGggPSBjb250YWN0LmZ1bGxEYXRlT2ZCaXJ0aC5nZXRUaW1lKCk7XG4gICAgICAgIH1cbiAgICAgICAgZGVsZXRlIGNvbnRhY3QuYWRkcmVzcztcbiAgICAgICAgZGVsZXRlIGNvbnRhY3QuZnVsbE5hbWU7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdEpTT04odGhpcy51cmwudXBkYXRlLCBjb250YWN0KTtcbiAgICB9XG5cbiAgICB1cGxvYWRQaG90byhkYXRhOiBGb3JtRGF0YSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHRoaXMuaHR0cC5zaG93TG9hZGluZygpO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodGhpcy51cmwudXBsb2FkX3Bob3RvLCBkYXRhKTtcbiAgICB9XG5cbiAgICBkZWxldGVBdmF0YXIoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgdGhpcy5odHRwLnNob3dMb2FkaW5nKCk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCh0aGlzLnVybC5kZWxldGVfcGhvdG8sIG51bGwpO1xuICAgIH1cblxuICAgIHNob3dMb2FkaW5nKCkge1xuICAgICAgICB0aGlzLmh0dHAuc2hvd0xvYWRpbmcoKTtcbiAgICB9XG5cbiAgICB1cGxvYWRTaWduYXR1cmVQaG90byhkYXRhOiBGb3JtRGF0YSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHRoaXMuaHR0cC5zaG93TG9hZGluZygpO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodGhpcy51cmwudXBkYXRlX3NpZ25hdHVyZSwgZGF0YSk7XG4gICAgfVxuXG4gICAgZ2V0U2lnbmF0dXJlSW1hZ2VVcmwoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudXJsLnZpZXdfc2lnbmF0dXJlX3Bob3RvO1xuICAgIH1cblxuICAgIGdldEFjY2Vzc1JvbGVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3RKU09OKHRoaXMudXJsLmFjY2Vzc19yb2xlcyk7XG4gICAgfVxufVxuIl19