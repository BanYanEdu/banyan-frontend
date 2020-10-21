import { TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';
export declare class CloudTransLoader implements TranslateLoader {
    private store;
    constructor();
    assign(lang: string, data: any): any;
    defineLocale(lang: string, data: any): void;
    getTranslation(lang: string): Observable<any>;
    getResourceByLang(lang: string): any;
    /**
     * Convert complex js object to dot notation js object
     */
    private dotizeStringToJSON;
    /**
     * Convert Java .properties files data to JSON
     */
    private propertiesToJSON;
    private asciiToNative;
    private native2Ascii;
    /**
     * Convert items from the server to Translation
     */
    convertResourceToObject(items: any[]): any;
    /**
     * Convert Java .properties files data to Translation
     */
    convertPropertiesToObject(str: string): any;
    setResources(lang: string, items: any[]): void;
}
