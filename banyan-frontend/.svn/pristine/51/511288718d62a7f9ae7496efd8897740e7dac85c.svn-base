export declare class CacheStorageService {
    timeCache: number;
    private __storage;
    private __queue;
    constructor();
    promiseQueue(name: string, promise: Function, resovle: Function): void;
    resolveQueue(name: string, context: any, args?: any[]): void;
    getData(key: string): any;
    setData(key: string, data: any, options?: CacheStorageOptions): void;
    removeData(key: string): void;
    clearData(): void;
}
export interface CacheStorageOptions {
    timeCache?: number;
    resolveData?: boolean;
}
export interface CacheStorageItem {
    time: number;
    timeCache: number;
    value: any;
}
