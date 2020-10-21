import { HttpClientService } from 'inet-core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
export declare class LocationService {
    private http;
    static instance: LocationService;
    private url;
    private $countryCache;
    private $provinceCache;
    private $districtCache;
    private countries;
    private provinceData;
    private districtData;
    constructor(http: HttpClientService);
    private getCountry;
    private _getProvinceByCountryCode;
    private _getDistrictByCode;
    listCountry(): Observable<Object>;
    getProvinceByCountryId(countryId: string): Observable<any>;
    getDistrictByProvinceId(uuid: string): Observable<any>;
    getProvinceByCountryCode(countryCode: string): Observable<any>;
    getDistrictByCode(countryCode: string, provinceCode: string): Observable<any>;
}
