/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import { shareReplay } from 'rxjs/operators';
import { CoreService } from "./core.service";
/** @type {?} */
var AVATAR_VERSION_KEY = 'avatarVersion';
var UserProfileService = /** @class */ (function () {
    function UserProfileService(http, coreService) {
        this.http = http;
        this.coreService = coreService;
        this.profile = null;
        this.systemProfile = null;
        this.$profileObservableCache = {};
        this.inventory = {};
        this.url = {
            get: iNet.getPUrl('gl/contact/load'),
            view: iNet.getPUrl('system/userprofile/view'),
            update: iNet.getPUrl('system/userprofile/update'),
            change_password: iNet.getPUrl('system/account/passsword'),
            photo: iNet.getPUrl('system/userprofile/photo')
        };
        return UserProfileService.instance = UserProfileService.instance || this;
    }
    /*
    private loadProfile(): Observable<Object> {
        return this.http.postJSON(this.url.get)
            .map((res: UserProfile) => res)
            .do(profile => this.profile = profile);
    }
     */
    /*
        private loadProfile(): Observable<Object> {
            return this.http.postJSON(this.url.get)
                .map((res: UserProfile) => res)
                .do(profile => this.profile = profile);
        }
         */
    /**
     * @private
     * @return {?}
     */
    UserProfileService.prototype.loadSystemProfile = /*
        private loadProfile(): Observable<Object> {
            return this.http.postJSON(this.url.get)
                .map((res: UserProfile) => res)
                .do(profile => this.profile = profile);
        }
         */
    /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        return this.http.postJSON(this.url.view)
            .map((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return res; }))
            .do((/**
         * @param {?} profile
         * @return {?}
         */
        function (profile) {
            _this.systemProfile = profile;
            _this.profile = (/** @type {?} */ (profile.user));
        }));
    };
    /**
     * Gets the currently LDAP profile of user logged
     */
    /**
     * Gets the currently LDAP profile of user logged
     * @return {?}
     */
    UserProfileService.prototype.getSystemProfile = /**
     * Gets the currently LDAP profile of user logged
     * @return {?}
     */
    function () {
        if (this.systemProfile) {
            return Observable.of(this.systemProfile);
        }
        if (!this.$systemProfileCache) {
            this.$systemProfileCache = this.loadSystemProfile().pipe(shareReplay(1));
        }
        return this.$systemProfileCache;
    };
    /**
     * Gets the currently profile of user logged
     */
    /**
     * Gets the currently profile of user logged
     * @return {?}
     */
    UserProfileService.prototype.getProfile = /**
     * Gets the currently profile of user logged
     * @return {?}
     */
    function () {
        if (this.profile) {
            return Observable.of(this.profile);
        }
        /*
        if (!this.$cache) {
            this.$cache = this.loadProfile().pipe(shareReplay(1));
        }
        return this.$cache;
         */
        return this.getSystemProfile().map((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return res.user; }));
    };
    /**
     * @param {?} user
     * @return {?}
     */
    UserProfileService.prototype.update = /**
     * @param {?} user
     * @return {?}
     */
    function (user) {
        this.$cache = null;
        return this.http.postJSON(this.url.update, user);
    };
    /**
     * @param {?} password
     * @return {?}
     */
    UserProfileService.prototype.changePassword = /**
     * @param {?} password
     * @return {?}
     */
    function (password) {
        return this.http.postJSON(this.url.change_password, password);
    };
    /**
     * @param {?} userProfile
     * @return {?}
     */
    UserProfileService.prototype.getAvatarUrlByProfile = /**
     * @param {?} userProfile
     * @return {?}
     */
    function (userProfile) {
        /** @type {?} */
        var avatarUrl;
        avatarUrl = this.coreService.getFileUrl(userProfile.avatar);
        if (this.getAvatarVersion() > 0) {
            avatarUrl = avatarUrl + "?version=" + this.getAvatarVersion();
        }
        return avatarUrl;
    };
    /**
     * @return {?}
     */
    UserProfileService.prototype.getAvatarUrl = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        function (resolve) {
            resolve(_this.url.photo);
            /*
            this.getProfile().subscribe((obj: UserProfile) => {
                // resolve(this.getAvatarUrlByProfile(obj));
            }, (err: HttpErrorResponse) => {
                resolve();
            });

             */
        }));
    };
    /**
     * @return {?}
     */
    UserProfileService.prototype.getFullName = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        function (resolve) {
            if (!window['iNet'] || iNet.isEmpty(iNet.prefix) || !iNet.enableLayout) {
                resolve(window['iNet'] ? iNet.displayName : '');
            }
            else {
                _this.getProfile().subscribe((/**
                 * @param {?} profile
                 * @return {?}
                 */
                function (profile) {
                    /** @type {?} */
                    var fullName = '';
                    if (profile.lastName) {
                        fullName += profile.lastName;
                    }
                    if (profile.middleName) {
                        fullName += ' ' + profile.middleName;
                    }
                    if (profile.firstName) {
                        fullName += ' ' + profile.firstName;
                    }
                    profile.name = fullName || iNet.displayName || iNet.username;
                    resolve(profile.name.trim());
                }), (/**
                 * @param {?} err
                 * @return {?}
                 */
                function (err) {
                    resolve();
                }));
            }
        }));
    };
    /**
     * @return {?}
     */
    UserProfileService.prototype.getSignPictureId = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        function (resolve) {
            _this.getSystemProfile().subscribe((/**
             * @param {?} data
             * @return {?}
             */
            function (data) {
                /** @type {?} */
                var signPictureId = '';
                if (data.user && data.user.signPictureID) {
                    signPictureId = data.user.signPictureID;
                }
                resolve(signPictureId);
            }), (/**
             * @param {?} err
             * @return {?}
             */
            function (err) {
                resolve();
            }));
        }));
    };
    /**
     * @return {?}
     */
    UserProfileService.prototype.getSignVerifyNumber = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        function (resolve) {
            _this.getSystemProfile().subscribe((/**
             * @param {?} data
             * @return {?}
             */
            function (data) {
                /** @type {?} */
                var signVerify = '';
                if (data.user && data.user.signVerify) {
                    signVerify = data.user.signVerify;
                }
                resolve(signVerify);
            }), (/**
             * @param {?} err
             * @return {?}
             */
            function (err) {
                resolve();
            }));
        }));
    };
    /**
     * @return {?}
     */
    UserProfileService.prototype.increaseAvatarVersion = /**
     * @return {?}
     */
    function () {
        localStorage.setItem(AVATAR_VERSION_KEY, (this.getAvatarVersion() + 1).toString());
    };
    /**
     * @return {?}
     */
    UserProfileService.prototype.getAvatarVersion = /**
     * @return {?}
     */
    function () {
        return Number(localStorage.getItem(AVATAR_VERSION_KEY));
    };
    /**
     * Returns the profile associated with the username.
     * @param username - {string} The username variable
     */
    /**
     * Returns the profile associated with the username.
     * @param {?} username - {string} The username variable
     * @return {?}
     */
    UserProfileService.prototype.getProfileByUsername = /**
     * Returns the profile associated with the username.
     * @param {?} username - {string} The username variable
     * @return {?}
     */
    function (username) {
        var _this = this;
        //console.log('[getProfileByUsername]--username, inventory', username, this.inventory);
        if (this.inventory.hasOwnProperty(username)) {
            return Observable.of(this.inventory[username]);
        }
        if (!this.$profileObservableCache[username]) {
            this.$profileObservableCache[username] = this.http.getJSON(this.url.get, { username: username })
                .do((/**
             * @param {?} res
             * @return {?}
             */
            function (res) { return _this.inventory[username] = res; }))
                .pipe(shareReplay(1));
        }
        return this.$profileObservableCache[username];
    };
    /**
     * Returns the avatar URL  with the username.
     * @param username - {string} The username variable
     */
    /**
     * Returns the avatar URL  with the username.
     * @param {?} username - {string} The username variable
     * @return {?}
     */
    UserProfileService.prototype.getAvatarUrlByUsername = /**
     * Returns the avatar URL  with the username.
     * @param {?} username - {string} The username variable
     * @return {?}
     */
    function (username) {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        function (resolve) {
            _this.getProfileByUsername(username).subscribe((/**
             * @param {?} obj
             * @return {?}
             */
            function (obj) {
                if (obj.avatar) {
                    resolve(_this.coreService.getFileUrl(obj.avatar));
                }
                else {
                    resolve();
                }
            }), (/**
             * @param {?} err
             * @return {?}
             */
            function (err) {
                resolve();
            }));
        }));
    };
    /**
     * @return {?}
     */
    UserProfileService.prototype.getDefaultAvatarUrl = /**
     * @return {?}
     */
    function () {
        return UserProfileService.DEFAULT_AVATAR_URL;
    };
    UserProfileService.instance = null;
    UserProfileService.DEFAULT_AVATAR_URL = 'data:image/jpeg;base64,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';
    UserProfileService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    UserProfileService.ctorParameters = function () { return [
        { type: HttpClientService },
        { type: CoreService }
    ]; };
    return UserProfileService;
}());
export { UserProfileService };
if (false) {
    /** @type {?} */
    UserProfileService.instance;
    /** @type {?} */
    UserProfileService.DEFAULT_AVATAR_URL;
    /**
     * @type {?}
     * @private
     */
    UserProfileService.prototype.$cache;
    /**
     * @type {?}
     * @private
     */
    UserProfileService.prototype.profile;
    /**
     * @type {?}
     * @private
     */
    UserProfileService.prototype.$systemProfileCache;
    /**
     * @type {?}
     * @private
     */
    UserProfileService.prototype.systemProfile;
    /**
     * @type {?}
     * @private
     */
    UserProfileService.prototype.$profileObservableCache;
    /**
     * @type {?}
     * @private
     */
    UserProfileService.prototype.inventory;
    /**
     * @type {?}
     * @private
     */
    UserProfileService.prototype.url;
    /**
     * @type {?}
     * @private
     */
    UserProfileService.prototype.http;
    /**
     * @type {?}
     * @private
     */
    UserProfileService.prototype.coreService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1wcm9maWxlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbmV0LWNvcmUvIiwic291cmNlcyI6WyJzcmMvdXNlci1wcm9maWxlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFekMsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDeEQsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUdoQyxPQUFPLHVCQUF1QixDQUFDO0FBQy9CLE9BQU8sd0JBQXdCLENBQUM7QUFDaEMsT0FBTyxzQkFBc0IsQ0FBQztBQUM5QixPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFM0MsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGdCQUFnQixDQUFDOztJQUdyQyxrQkFBa0IsR0FBSSxlQUFlO0FBQzNDO0lBcUJJLDRCQUFvQixJQUF1QixFQUFVLFdBQXdCO1FBQXpELFNBQUksR0FBSixJQUFJLENBQW1CO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFoQnJFLFlBQU8sR0FBZ0IsSUFBSSxDQUFDO1FBRzVCLGtCQUFhLEdBQXFCLElBQUksQ0FBQztRQUV2Qyw0QkFBdUIsR0FBUSxFQUFFLENBQUM7UUFDbEMsY0FBUyxHQUFRLEVBQUUsQ0FBQztRQUVwQixRQUFHLEdBQUc7WUFDVixHQUFHLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQztZQUNwQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyx5QkFBeUIsQ0FBQztZQUM3QyxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQywyQkFBMkIsQ0FBQztZQUNqRCxlQUFlLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQywwQkFBMEIsQ0FBQztZQUN6RCxLQUFLLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQywwQkFBMEIs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QztpQkFDcEQ7cUJBQU07b0JBQ0gsT0FBTyxFQUFFLENBQUM7aUJBQ2I7WUFDTCxDQUFDOzs7O1lBQUUsVUFBQyxHQUFzQjtnQkFDdEIsT0FBTyxFQUFFLENBQUM7WUFDZCxDQUFDLEVBQUMsQ0FBQztRQUNQLENBQUMsRUFBQyxDQUFDO0lBQ1AsQ0FBQzs7OztJQUVELGdEQUFtQjs7O0lBQW5CO1FBQ0ksT0FBTyxrQkFBa0IsQ0FBQyxrQkFBa0IsQ0FBQztJQUNqRCxDQUFDO0lBdE1NLDJCQUFRLEdBQXVCLElBQUksQ0FBQztJQUMzQixxQ0FBa0IsR0FBRyx5L0VBQXkvRSxDQUFDOztnQkFIbGlGLFVBQVU7Ozs7Z0JBYkgsaUJBQWlCO2dCQVNqQixXQUFXOztJQTZNbkIseUJBQUM7Q0FBQSxBQXpNRCxJQXlNQztTQXhNWSxrQkFBa0I7OztJQUMzQiw0QkFBMkM7O0lBQzNDLHNDQUEraEY7Ozs7O0lBQy9oRixvQ0FBbUM7Ozs7O0lBQ25DLHFDQUFvQzs7Ozs7SUFFcEMsaURBQWdEOzs7OztJQUNoRCwyQ0FBK0M7Ozs7O0lBRS9DLHFEQUEwQzs7Ozs7SUFDMUMsdUNBQTRCOzs7OztJQUU1QixpQ0FNRTs7Ozs7SUFFVSxrQ0FBK0I7Ozs7O0lBQUUseUNBQWdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7VXNlclByb2ZpbGV9IGZyb20gJy4vdXNlci1wcm9maWxlJztcbmltcG9ydCB7SHR0cENsaWVudFNlcnZpY2V9IGZyb20gJy4vaHR0cC1jbGllbnQuc2VydmljZSc7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtVc2VyUmVzcG9uc2VEYXRhfSBmcm9tIFwiLi91c2VyLXJlc3BvbnNlLWRhdGFcIjtcbmltcG9ydCB7TmV3UGFzc3dvcmR9IGZyb20gXCIuL25ldy1wYXNzd29yZFwiO1xuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9tYXAnO1xuaW1wb3J0ICdyeGpzL2FkZC9vYnNlcnZhYmxlL29mJztcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvZG8nO1xuaW1wb3J0IHtzaGFyZVJlcGxheX0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtIdHRwRXJyb3JSZXNwb25zZX0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vbi9odHRwXCI7XG5pbXBvcnQge0NvcmVTZXJ2aWNlfSBmcm9tIFwiLi9jb3JlLnNlcnZpY2VcIjtcblxuZGVjbGFyZSBsZXQgaU5ldDogYW55O1xuY29uc3QgQVZBVEFSX1ZFUlNJT05fS0VZID0gICdhdmF0YXJWZXJzaW9uJztcbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBVc2VyUHJvZmlsZVNlcnZpY2Uge1xuICAgIHN0YXRpYyBpbnN0YW5jZTogVXNlclByb2ZpbGVTZXJ2aWNlID0gbnVsbDtcbiAgICBzdGF0aWMgcmVhZG9ubHkgREVGQVVMVF9BVkFUQVJfVVJMID0gJ2RhdGE6aW1hZ2UvanBlZztiYXNlNjQsLzlqLzRBQVFTa1pKUmdBQkFnQUFBUUFCQUFELzJ3Q0VBQWdHQmdjR0JRZ0hCd2NKQ1FnS0RCUU5EQXNMREJrU0V3OFVIUm9mSGgwYUhCd2dKQzRuSUNJc0l4d2NLRGNwTERBeE5EUTBIeWM1UFRneVBDNHpORElCQ1FrSkRBc01HQTBOR0RJaEhDRXlNakl5TWpJeU1qSXlNakl5TWpJeU1qSXlNakl5TWpJeU1qSXlNakl5TWpJeU1qSXlNakl5TWpJeU1qSXlNakl5TXYvQ0FCRUlBT0VBNFFNQklnQUNFUUVERVFIL3hBQWJBQUVBQWdNQkFRQUFBQUFBQUFBQUFBQUFBUUlFQlFZSEEvL2FBQWdCQVFBQUFBRDNrQWtBZ0FUQUVpVW9RUUFtQVNtV3MwV3NwbWRIdUlpRUFtQktablc4UmhBMy9SYldzSUNZSlRhZmg1dDhBR1I2YmF0VUNZSm0wenp2RWdEMGJaUldJZ21FemFaY2x5Z0E5QjI2SzFRbUpXdEp5WEtBRDBmWWtVaUV4TTNrYzF4Z0E5UXlCV2lKTFdrYUxoQUI2YmxpSzFpVTJzSEk4cUFPcTY0S1ZGclNISmNvQU9pN1lLMWd0Y0hPY1VBT3U2b0lyV1ZyQXh2UGNJQm1laDVJS1ZsZVFNVHpJQ2ZTYzRDdFM4Z2ZMeTJBZmIwNzZBVnFtMGdQT3RZRG91MkFWcW0wZ09VNUlIWWROWUN0VTJrRFdlZHdCM2U5QXJVdklWd09LMW9ETTdqWTNDdFMxakU1L25NVUFIMjZQb2M0clNWcDFmT2FQNWdBQzI2NkxjUldmbnplaHdRQUFCbGI3cFB2d2VvQUFBQVozY2VlVUFBQUFOeHFhZ0FBQUdmZ3dBQUFBWG9BQUFBSkFBQUFCLy9FQUJRQkFRQUFBQUFBQUFBQUFBQUFBQUFBQUFELzJnQUlBUUlRQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFILy94QUFVQVFFQUFBQUFBQUFBQUFBQUFBQUFBQUFBLzlvQUNBRURFQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFCLy84UUFQUkFBQVFNQ0FRZ0dDQVVEQlFBQUFBQUFBUUlEQkFBUkJRWVFFaUFoTURGQkUwQlJrYUd4SWpKU1lYR0J3ZEVWSTBKUVV4UTBOVVJpa3VIdy85b0FDQUVCQUFFL0FQMmkxV05hSnF4N0tzYXRxVzZsYWpaSXVTQU8wMU94K0ZCSlNWZElvY2tFSDYxS3l1ZWNKRWRzdGoza0g2VTVqMkpyT3lXNG40R2hqZUpqL1d2ZjhxajVUejJTT2tjTGc1ZzIrMVlkbEZGbnJEWlNXbkNiQUtVTEdyVmFyZFJBb0NzWHhockNtaGZSVzZyMVVYOGFuNHJLeEIzVGRXUUxXMEVrMjd0WUd4dU9OUWNxcE1SaExUalNYZ20vcEtVYjk5WVJqak9LbFNORU51Z1gwTks5L0NyVmJmZ1VCVXlVM0NpcWZjTmtwdFV5VTVNa3JlY055b20yemxmY3daYTRVdEQ2RFlwdU9GTk9CMXBEZzRLU0NQblZxSTNscUFvWnNzSGlqRFdtZ1QrWTV0K1c3d0o0djRVMG8zdUFCNERNUlJHNkZBVUJueXlVYnhrOHJrK0EzZVRYK0hSOGZvTTVGRWJrVUJxWlpKdC9USzk2dklidkJHK2l3cGtkcVFmQWFoRkViZGNVQnE1Wkl2QmpyOWx5M2VOMGVGUVU2TUNPQi9HbnkxVFIxaFExY3JiZmdhcjhla1RiZEdzTWtJa1ljd3RCMkJDUWZqWWFwb2pWRkRXeXlmV1Z4MlQ2bHlyNG13Kys3eU9sS0JmakcxaVFvZHgrMnNSbU9jVU5iTE5GakZYNzFEeTNlU0tTY1FXcmtBTDl4MWpSemJhNTBPRkRXeXhhS3NOWmM5aHpiOHh1OGpHZnlaTHhHMHFDUWZsLzNyR2p4MUJyejRTSjhOY2R3MlNxMjIxN1dOUzhJblFpcnBZemdRQ2JMQXVPOGJtRGhjdkVWNkxEU2lrY1Y4aDMxQWhJZ1JFTU5ra0FDNVBNMnQ5TlkwYVBITU9ORGNZbzJsekM1SVVMMmFVUjhiSGNKRnlCMm1zSWpOUnNMakJ0QVNWTnBVbzIya2tYK3U0T2NjYUc0bEowNGp5UGFiVVBDbEN5aU5lSWd1VEdVRGlwWUhqVWRCYmpOSVBGS0FQRGNIalI0WnVkRGM0M2hTOE1tNkkwbE1yRjBMSTQ5dXZrdmhTMzVTSnpnSVpiSjBUczlKWC9BSStHNU5ITU9ORGM1UTQzQWxSSFlqV200NXMwVmdlaU5vUGJyNFBsRmg4YUd4RFdsMUJUY2FSU05FWEpQYmZuU0ZwY2JTdEJ1bFFCQjdRZHdhT1ljYUc0eHpFMDRiQkt0dlNPQXBSYmtiY2FKdWJuY1pNWW1tWENURlZmcFdFZ0VubUw3TzdadURSemM2R3N0eERTZEp4YVVEdFViVkl4ekRvNE9sS2JLaHlTYitWWTFpeThWbEJaU0V0b3VFQUgzOGR6aG1JT1laTVRJYkFWc0lLU2RoRlJzb2NPa0pUZVFodFovU3EvblRielR3dTA0aFkvMnFCMWpSekNocVNzVGhRdjdpUzJnOE5HOXozRGJXSVpYSkZrd0UzNDNVNG55MjFNeENUUGRMa2h6U1ZhMndBYjJOTGVodXBkWVhvcVNialplc1B5dWNTclJucDBrVzladEcyL2Zhb3VNUUpteG1TalM5bFhvbnh6bWpxQ3IyRnpVM0tHQkJKUXRhbHVja3BUV0laVnlaSUtZb1ZIU2VZSUo4dGxPdk92ckszWEZMVWVKVWJucUtGcmJVRklVVXFIQWcyckQ4cDVzVlFENjFTRzc4RkhiMzJxSGxQQWxsS0NWdE9IOUtoZnhGQmFWaTZUY1VjN3p5R0cxT09LQ1VwRnlTYW1aWGhPa2lLeGZzVW8vYXBlTFRKaWlWdktTQ2ZWU29nZWZWNHVJU29pcnRQS0E5a3FOcWlaWHFCQ0pUQUlKOVpKNGQ5UkpiVXlPbDVwUUtWY3I4S3ZXTzRzNVBsS2FGZ3kyU2tXNTdlUFc4TXhOM0RaQWNSWlNUY0ZKNTErS1JQNVI0L2FuaVMrNFQ3UjY1MHk2V2J1S0o1azljNlZYWlIybS9YT2tWMitINzMvQVAvRUFCUVJBUUFBQUFBQUFBQUFBQUFBQUFBQUFIRC8yZ0FJQVFJQkFUOEFZZi9FQUJRUkFRQUFBQUFBQUFBQUFBQUFBQUFBQUhELzJnQUlBUU1CQVQ4QVlmL1onO1xuICAgIHByaXZhdGUgJGNhY2hlOiBPYnNlcnZhYmxlPE9iamVjdD47XG4gICAgcHJpdmF0ZSBwcm9maWxlOiBVc2VyUHJvZmlsZSA9IG51bGw7XG5cbiAgICBwcml2YXRlICRzeXN0ZW1Qcm9maWxlQ2FjaGU6IE9ic2VydmFibGU8T2JqZWN0PjtcbiAgICBwcml2YXRlIHN5c3RlbVByb2ZpbGU6IFVzZXJSZXNwb25zZURhdGEgPSBudWxsO1xuXG4gICAgcHJpdmF0ZSAkcHJvZmlsZU9ic2VydmFibGVDYWNoZTogYW55ID0ge307XG4gICAgcHJpdmF0ZSBpbnZlbnRvcnk6IGFueSA9IHt9O1xuXG4gICAgcHJpdmF0ZSB1cmwgPSB7XG4gICAgICAgIGdldDogaU5ldC5nZXRQVXJsKCdnbC9jb250YWN0L2xvYWQnKSxcbiAgICAgICAgdmlldzogaU5ldC5nZXRQVXJsKCdzeXN0ZW0vdXNlcnByb2ZpbGUvdmlldycpLFxuICAgICAgICB1cGRhdGU6IGlOZXQuZ2V0UFVybCgnc3lzdGVtL3VzZXJwcm9maWxlL3VwZGF0ZScpLFxuICAgICAgICBjaGFuZ2VfcGFzc3dvcmQ6IGlOZXQuZ2V0UFVybCgnc3lzdGVtL2FjY291bnQvcGFzc3N3b3JkJyksXG4gICAgICAgIHBob3RvOiBpTmV0LmdldFBVcmwoJ3N5c3RlbS91c2VycHJvZmlsZS9waG90bycpXG4gICAgfTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudFNlcnZpY2UsIHByaXZhdGUgY29yZVNlcnZpY2U6IENvcmVTZXJ2aWNlKSB7XG4gICAgICAgIHJldHVybiBVc2VyUHJvZmlsZVNlcnZpY2UuaW5zdGFuY2UgPSBVc2VyUHJvZmlsZVNlcnZpY2UuaW5zdGFuY2UgfHwgdGhpcztcbiAgICB9XG5cbiAgICAvKlxuICAgIHByaXZhdGUgbG9hZFByb2ZpbGUoKTogT2JzZXJ2YWJsZTxPYmplY3Q+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0SlNPTih0aGlzLnVybC5nZXQpXG4gICAgICAgICAgICAubWFwKChyZXM6IFVzZXJQcm9maWxlKSA9PiByZXMpXG4gICAgICAgICAgICAuZG8ocHJvZmlsZSA9PiB0aGlzLnByb2ZpbGUgPSBwcm9maWxlKTtcbiAgICB9XG4gICAgICovXG5cbiAgICBwcml2YXRlIGxvYWRTeXN0ZW1Qcm9maWxlKCk6IE9ic2VydmFibGU8T2JqZWN0PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdEpTT04odGhpcy51cmwudmlldylcbiAgICAgICAgICAgIC5tYXAoKHJlczogVXNlclJlc3BvbnNlRGF0YSkgPT4gcmVzKVxuICAgICAgICAgICAgLmRvKHByb2ZpbGUgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc3lzdGVtUHJvZmlsZSA9IHByb2ZpbGU7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9maWxlID0gcHJvZmlsZS51c2VyIGFzIFVzZXJQcm9maWxlO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgY3VycmVudGx5IExEQVAgcHJvZmlsZSBvZiB1c2VyIGxvZ2dlZFxuICAgICAqL1xuICAgIGdldFN5c3RlbVByb2ZpbGUoKTogT2JzZXJ2YWJsZTxPYmplY3Q+IHtcbiAgICAgICAgaWYgKHRoaXMuc3lzdGVtUHJvZmlsZSkge1xuICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGUub2YodGhpcy5zeXN0ZW1Qcm9maWxlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuJHN5c3RlbVByb2ZpbGVDYWNoZSkge1xuICAgICAgICAgICAgdGhpcy4kc3lzdGVtUHJvZmlsZUNhY2hlID0gdGhpcy5sb2FkU3lzdGVtUHJvZmlsZSgpLnBpcGUoc2hhcmVSZXBsYXkoMSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLiRzeXN0ZW1Qcm9maWxlQ2FjaGU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgY3VycmVudGx5IHByb2ZpbGUgb2YgdXNlciBsb2dnZWRcbiAgICAgKi9cbiAgICBnZXRQcm9maWxlKCk6IE9ic2VydmFibGU8T2JqZWN0PiB7XG4gICAgICAgIGlmICh0aGlzLnByb2ZpbGUpIHtcbiAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlLm9mKHRoaXMucHJvZmlsZSk7XG4gICAgICAgIH1cbiAgICAgICAgLypcbiAgICAgICAgaWYgKCF0aGlzLiRjYWNoZSkge1xuICAgICAgICAgICAgdGhpcy4kY2FjaGUgPSB0aGlzLmxvYWRQcm9maWxlKCkucGlwZShzaGFyZVJlcGxheSgxKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuJGNhY2hlO1xuICAgICAgICAgKi9cbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U3lzdGVtUHJvZmlsZSgpLm1hcCgocmVzOiBVc2VyUmVzcG9uc2VEYXRhKSA9PiByZXMudXNlcik7XG4gICAgfVxuXG4gICAgdXBkYXRlKHVzZXI6IFVzZXJQcm9maWxlKTogT2JzZXJ2YWJsZTxPYmplY3Q+IHtcbiAgICAgICAgdGhpcy4kY2FjaGU9bnVsbDtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0SlNPTih0aGlzLnVybC51cGRhdGUsIHVzZXIpO1xuICAgIH1cblxuICAgIGNoYW5nZVBhc3N3b3JkKHBhc3N3b3JkOiBOZXdQYXNzd29yZCk6IE9ic2VydmFibGU8T2JqZWN0PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdEpTT04odGhpcy51cmwuY2hhbmdlX3Bhc3N3b3JkLCBwYXNzd29yZCk7XG4gICAgfVxuXG4gICAgZ2V0QXZhdGFyVXJsQnlQcm9maWxlKHVzZXJQcm9maWxlOiBVc2VyUHJvZmlsZSk6IHN0cmluZyB7XG4gICAgICAgIGxldCBhdmF0YXJVcmw6IHN0cmluZztcbiAgICAgICAgYXZhdGFyVXJsID0gdGhpcy5jb3JlU2VydmljZS5nZXRGaWxlVXJsKHVzZXJQcm9maWxlLmF2YXRhcik7XG4gICAgICAgIGlmICh0aGlzLmdldEF2YXRhclZlcnNpb24oKSA+IDApIHtcbiAgICAgICAgICAgIGF2YXRhclVybCA9IGAke2F2YXRhclVybH0/dmVyc2lvbj0ke3RoaXMuZ2V0QXZhdGFyVmVyc2lvbigpfWA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGF2YXRhclVybDtcbiAgICB9XG5cbiAgICBnZXRBdmF0YXJVcmwoKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLnVybC5waG90byk7XG4gICAgICAgICAgICAvKlxuICAgICAgICAgICAgdGhpcy5nZXRQcm9maWxlKCkuc3Vic2NyaWJlKChvYmo6IFVzZXJQcm9maWxlKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gcmVzb2x2ZSh0aGlzLmdldEF2YXRhclVybEJ5UHJvZmlsZShvYmopKTtcbiAgICAgICAgICAgIH0sIChlcnI6IEh0dHBFcnJvclJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAqL1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXRGdWxsTmFtZSgpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgICAgICBpZighd2luZG93WydpTmV0J10gfHwgaU5ldC5pc0VtcHR5KGlOZXQucHJlZml4KSB8fCAhaU5ldC5lbmFibGVMYXlvdXQpIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHdpbmRvd1snaU5ldCddID8gaU5ldC5kaXNwbGF5TmFtZTogJycpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdldFByb2ZpbGUoKS5zdWJzY3JpYmUoKHByb2ZpbGU6IFVzZXJQcm9maWxlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBmdWxsTmFtZTogc3RyaW5nID0gJyc7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwcm9maWxlLmxhc3ROYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmdWxsTmFtZSArPSBwcm9maWxlLmxhc3ROYW1lO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChwcm9maWxlLm1pZGRsZU5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bGxOYW1lICs9ICcgJyArIHByb2ZpbGUubWlkZGxlTmFtZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAocHJvZmlsZS5maXJzdE5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bGxOYW1lICs9ICcgJyArIHByb2ZpbGUuZmlyc3ROYW1lO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHByb2ZpbGUubmFtZSA9IGZ1bGxOYW1lIHx8IGlOZXQuZGlzcGxheU5hbWUgfHwgaU5ldC51c2VybmFtZTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShwcm9maWxlLm5hbWUudHJpbSgpKTtcbiAgICAgICAgICAgICAgICB9LCAoZXJyOiBIdHRwRXJyb3JSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldFNpZ25QaWN0dXJlSWQoKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgdGhpcy5nZXRTeXN0ZW1Qcm9maWxlKCkuc3Vic2NyaWJlKChkYXRhOiBVc2VyUmVzcG9uc2VEYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHNpZ25QaWN0dXJlSWQ6IHN0cmluZyA9ICcnO1xuICAgICAgICAgICAgICAgIGlmKGRhdGEudXNlciAmJiBkYXRhLnVzZXIuc2lnblBpY3R1cmVJRCkge1xuICAgICAgICAgICAgICAgICAgICBzaWduUGljdHVyZUlkID0gZGF0YS51c2VyLnNpZ25QaWN0dXJlSUQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJlc29sdmUoc2lnblBpY3R1cmVJZCk7XG4gICAgICAgICAgICB9LCAoZXJyOiBIdHRwRXJyb3JSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXRTaWduVmVyaWZ5TnVtYmVyKCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgICAgIHRoaXMuZ2V0U3lzdGVtUHJvZmlsZSgpLnN1YnNjcmliZSgoZGF0YTogVXNlclJlc3BvbnNlRGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBzaWduVmVyaWZ5OiBzdHJpbmcgPSAnJztcbiAgICAgICAgICAgICAgICBpZihkYXRhLnVzZXIgJiYgZGF0YS51c2VyLnNpZ25WZXJpZnkpIHtcbiAgICAgICAgICAgICAgICAgICAgc2lnblZlcmlmeSA9IGRhdGEudXNlci5zaWduVmVyaWZ5O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXNvbHZlKHNpZ25WZXJpZnkpO1xuICAgICAgICAgICAgfSwgKGVycjogSHR0cEVycm9yUmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaW5jcmVhc2VBdmF0YXJWZXJzaW9uKCkge1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShBVkFUQVJfVkVSU0lPTl9LRVksICh0aGlzLmdldEF2YXRhclZlcnNpb24oKSArIDEpLnRvU3RyaW5nKCkpO1xuICAgIH1cblxuICAgIGdldEF2YXRhclZlcnNpb24oKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIE51bWJlcihsb2NhbFN0b3JhZ2UuZ2V0SXRlbShBVkFUQVJfVkVSU0lPTl9LRVkpKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgcHJvZmlsZSBhc3NvY2lhdGVkIHdpdGggdGhlIHVzZXJuYW1lLlxuICAgICAqIEBwYXJhbSB1c2VybmFtZSAtIHtzdHJpbmd9IFRoZSB1c2VybmFtZSB2YXJpYWJsZVxuICAgICAqL1xuICAgIGdldFByb2ZpbGVCeVVzZXJuYW1lKHVzZXJuYW1lOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICAvL2NvbnNvbGUubG9nKCdbZ2V0UHJvZmlsZUJ5VXNlcm5hbWVdLS11c2VybmFtZSwgaW52ZW50b3J5JywgdXNlcm5hbWUsIHRoaXMuaW52ZW50b3J5KTtcbiAgICAgICAgaWYgKHRoaXMuaW52ZW50b3J5Lmhhc093blByb3BlcnR5KHVzZXJuYW1lKSkge1xuICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGUub2YodGhpcy5pbnZlbnRvcnlbdXNlcm5hbWVdKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuJHByb2ZpbGVPYnNlcnZhYmxlQ2FjaGVbdXNlcm5hbWVdKSB7XG4gICAgICAgICAgICB0aGlzLiRwcm9maWxlT2JzZXJ2YWJsZUNhY2hlW3VzZXJuYW1lXSA9IHRoaXMuaHR0cC5nZXRKU09OKHRoaXMudXJsLmdldCwge3VzZXJuYW1lOiB1c2VybmFtZX0pXG4gICAgICAgICAgICAgICAgLmRvKChyZXMpID0+IHRoaXMuaW52ZW50b3J5W3VzZXJuYW1lXT0gcmVzKVxuICAgICAgICAgICAgICAgIC5waXBlKHNoYXJlUmVwbGF5KDEpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy4kcHJvZmlsZU9ic2VydmFibGVDYWNoZVt1c2VybmFtZV07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgYXZhdGFyIFVSTCAgd2l0aCB0aGUgdXNlcm5hbWUuXG4gICAgICogQHBhcmFtIHVzZXJuYW1lIC0ge3N0cmluZ30gVGhlIHVzZXJuYW1lIHZhcmlhYmxlXG4gICAgICovXG4gICAgZ2V0QXZhdGFyVXJsQnlVc2VybmFtZSh1c2VybmFtZTogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgdGhpcy5nZXRQcm9maWxlQnlVc2VybmFtZSh1c2VybmFtZSkuc3Vic2NyaWJlKChvYmo6IFVzZXJQcm9maWxlKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYob2JqLmF2YXRhcikge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRoaXMuY29yZVNlcnZpY2UuZ2V0RmlsZVVybChvYmouYXZhdGFyKSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIChlcnI6IEh0dHBFcnJvclJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldERlZmF1bHRBdmF0YXJVcmwoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIFVzZXJQcm9maWxlU2VydmljZS5ERUZBVUxUX0FWQVRBUl9VUkw7XG4gICAgfVxufVxuIl19