export declare class ResourceLoaderService {
    private _loaded;
    private _version;
    constructor();
    load(resources: Resource[], callback: Function): any;
    loadJS(url: string, callback: Function): void;
    loadCSS(url: string, callback: Function): void;
    getFullUrlJS(url: string): string;
    isLoaded(url: string): boolean;
    private _loadResources;
    private _groupResources;
    private _loadGroups;
    private _load;
    private _loadWithTagName;
    private _initScriptVersion;
}
export interface Resource {
    url: string;
    sync?: boolean;
    loaded?: boolean;
    type?: string;
}
