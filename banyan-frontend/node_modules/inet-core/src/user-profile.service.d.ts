import { UserProfile } from './user-profile';
import { HttpClientService } from './http-client.service';
import { Observable } from 'rxjs';
import { NewPassword } from "./new-password";
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import { CoreService } from "./core.service";
export declare class UserProfileService {
    private http;
    private coreService;
    static instance: UserProfileService;
    static readonly DEFAULT_AVATAR_URL = "data:image/jpeg;base64,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";
    private $cache;
    private profile;
    private $systemProfileCache;
    private systemProfile;
    private $profileObservableCache;
    private inventory;
    private url;
    constructor(http: HttpClientService, coreService: CoreService);
    private loadSystemProfile;
    /**
     * Gets the currently LDAP profile of user logged
     */
    getSystemProfile(): Observable<Object>;
    /**
     * Gets the currently profile of user logged
     */
    getProfile(): Observable<Object>;
    update(user: UserProfile): Observable<Object>;
    changePassword(password: NewPassword): Observable<Object>;
    getAvatarUrlByProfile(userProfile: UserProfile): string;
    getAvatarUrl(): Promise<string>;
    getFullName(): Promise<string>;
    getSignPictureId(): Promise<string>;
    getSignVerifyNumber(): Promise<string>;
    increaseAvatarVersion(): void;
    getAvatarVersion(): number;
    /**
     * Returns the profile associated with the username.
     * @param username - {string} The username variable
     */
    getProfileByUsername(username: string): Observable<any>;
    /**
     * Returns the avatar URL  with the username.
     * @param username - {string} The username variable
     */
    getAvatarUrlByUsername(username: string): Promise<string>;
    getDefaultAvatarUrl(): string;
}
