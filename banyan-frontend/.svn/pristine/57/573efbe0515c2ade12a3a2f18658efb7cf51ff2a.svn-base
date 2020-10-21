import { CoreService, HttpClientService } from 'inet-core';
import { Observable } from 'rxjs/Rx';
import { Organization } from '../model/organization';
import { OrganizationInformation } from '../model/organization-information';
export declare class OrganizationService {
    private http;
    private coreService;
    private $orgCache;
    private url;
    constructor(http: HttpClientService, coreService: CoreService);
    firmLoad(): Observable<OrganizationInformation>;
    firmUpdate(orgInfo: OrganizationInformation): Observable<any>;
    updateLogo(data: FormData): Observable<any>;
    removeLogo(params: any): Observable<any>;
    load(): Observable<Organization>;
    loadInfo(): Observable<any>;
    update(data: Organization): Observable<any>;
    searchOrganization(params?: any): Observable<any>;
    getLogoUrlByOrganization(orgInfo: Organization): string;
    getLogoUrl(): string;
    viewInfo(): Observable<any>;
}
