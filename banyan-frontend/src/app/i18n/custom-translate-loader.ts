import {CloudTransLoader} from 'inet-ui';
import {HttpClientService} from "inet-core";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpHeaders} from "@angular/common/http";
export class CustomTranslateLoader extends CloudTransLoader {
    static instance: CustomTranslateLoader = null;
    private translation: any;
    private storageKey = 'unicorn_translation';
    constructor(private http: HttpClientService) {
        super();
        return CustomTranslateLoader.instance = CustomTranslateLoader.instance || this;
    }
    /**
     * Gets the translations from the server
     */
    getTranslation(lang: string): Observable<any> {
        if (this.translation) {
            return Observable.of(this.translation);
        }
        this.storageKey = `${this.storageKey}_${lang}`;
        if (sessionStorage && sessionStorage.getItem(this.storageKey)) {
            this.translation = JSON.parse(sessionStorage.getItem(this.storageKey));
            return Observable.of(this.translation);
        }

        if (environment.production) {
            return this.http.getJSON(iNet.getPUrl('message/keys'), {group: 'unicorn'}).map((response: any) => {
                this.translation = {...this.getResourceByLang(lang), ...this.convertResourceToObject(response['items'] || [])};
                if (sessionStorage) {
                    sessionStorage.setItem(this.storageKey, JSON.stringify(this.translation));
                }
                return this.translation;
            });
        } else {
            const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
            return this.http.get(`./assets/i18n/common_${lang}.properties`,  { headers, responseType: 'text'}).map((response: any) => {
                this.translation = {...this.getResourceByLang(lang), ...this.convertPropertiesToObject(response)};
                return this.translation;
            });
        }
    }
}
