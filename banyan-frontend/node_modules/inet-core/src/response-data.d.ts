export interface WebResponse {
}
export declare class ErrorResponse {
    errors: any[];
    type: string;
}
export declare class ResponseData extends ErrorResponse implements WebResponse {
    total: number;
    items: any[];
}
export declare class ResponseElementsData extends ErrorResponse implements WebResponse {
    elements: any[];
}
