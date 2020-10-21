import { HttpClientService } from './http-client.service';
import { Subscription } from 'rxjs';
export declare class SuggestionService {
    private http;
    static instance: SuggestionService;
    constructor(http: HttpClientService);
    saveSuggestion(params: SuggestionParamData, callback?: Function): Subscription;
    loadSuggestion(params: SuggestionParamData, callback: Function): Subscription;
}
export interface SuggestionParamData {
    content: string;
    keyword: string;
}
export interface SuggestionResponse {
    items: SuggestionItem[];
    total: number;
}
export interface SuggestionItem {
    content: string;
    keyword: string;
    ownercode: string;
    usage: number;
    uuid: string;
}
