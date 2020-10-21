export declare class FileFormatService {
    constructor();
    getImagePath(): string;
    getFileFormatPath(): string;
    getUrlByExt(ext: string): string;
    getUrlByName(name: string): string;
    getExtByName(name: string): string;
    getEditFormats(): string[];
    getViewFormats(): string[];
}
