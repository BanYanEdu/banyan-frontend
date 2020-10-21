import { HttpClientService, UserProfileService } from 'inet-core';
import { Contact } from "../model/contact";
import { Observable } from "rxjs/Observable";
export declare class GlobalContactService {
    private http;
    private userProfileService;
    private url;
    constructor(http: HttpClientService, userProfileService: UserProfileService);
    getProfile(): Observable<any>;
    update(data: Contact): Observable<any>;
    uploadPhoto(data: FormData): Observable<any>;
    deleteAvatar(): Observable<any>;
    showLoading(): void;
    uploadSignaturePhoto(data: FormData): Observable<any>;
    getSignatureImageUrl(): string;
    getAccessRoles(): Observable<any>;
}
