export declare class OpenGraphService {
    private regex;
    constructor();
    loadPreviewLink(link: string, callback: Function): void;
    isLink(link: string): boolean;
    loadImageInfo(src: string, callback: Function): void;
    private convertOpenData;
}
