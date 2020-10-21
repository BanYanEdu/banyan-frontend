/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
export class ResourceLoaderService {
    constructor() {
        this._loaded = [];
        this._version = '';
        // this._initScriptVersion();
    }
    /**
     * @param {?} resources
     * @param {?} callback
     * @return {?}
     */
    load(resources, callback) {
        if (resources.length < 1) {
            return callback();
        }
        this._loadResources(resources, callback);
    }
    /**
     * @param {?} url
     * @param {?} callback
     * @return {?}
     */
    loadJS(url, callback) {
        this._loadWithTagName('script', {
            type: 'text/javascript',
            src: this.getFullUrlJS(url)
        }, callback);
    }
    /**
     * @param {?} url
     * @param {?} callback
     * @return {?}
     */
    loadCSS(url, callback) {
        this._loadWithTagName('link', {
            type: 'text/css',
            rel: 'stylesheet',
            href: url
        }, callback);
    }
    /**
     * @param {?} url
     * @return {?}
     */
    getFullUrlJS(url) {
        if (url.indexOf('//') < 0 && iNet.fileServer) {
            if (url.startsWith('/')) {
                url = url.substr(1, url.length);
            }
            return iNet.fileServer + url;
        }
        return url;
    }
    /**
     * @param {?} url
     * @return {?}
     */
    isLoaded(url) {
        return this._loaded.indexOf(url) > -1;
    }
    /**
     * @private
     * @param {?} resources
     * @param {?} callback
     * @return {?}
     */
    _loadResources(resources, callback) {
        /** @type {?} */
        let splitGroups = this._groupResources(resources);
        /** @type {?} */
        let fn = (/**
         * @return {?}
         */
        () => {
            if (splitGroups.length < 1) {
                return callback();
            }
            this._loadGroups(splitGroups.splice(0, 1)[0], fn);
        });
        fn();
    }
    //  Split group resources by sync/async
    /**
     * @private
     * @param {?} resources
     * @return {?}
     */
    _groupResources(resources) {
        /** @type {?} */
        let splitGroups = [];
        /** @type {?} */
        let groups;
        //  Split group resources by sync/async
        for (let i = 0; i < resources.length; i++) {
            if (!groups) {
                groups = [];
                splitGroups.push(groups);
            }
            groups.push(resources[i]);
            if (resources[i].sync) {
                groups = null;
            }
        }
        return splitGroups;
    }
    /**
     * @private
     * @param {?} resources
     * @param {?} callback
     * @return {?}
     */
    _loadGroups(resources, callback) {
        /** @type {?} */
        let promises = [];
        resources.forEach((/**
         * @param {?} item
         * @return {?}
         */
        item => promises.push(this._load(item))));
        Promise.all(promises).then((/**
         * @return {?}
         */
        () => {
            callback();
        }));
    }
    /**
     * @private
     * @param {?} resource
     * @return {?}
     */
    _load(resource) {
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        (resolve) => {
            if (resource.type === 'css') {
                this.loadCSS(resource.url, resolve);
            }
            else {
                this.loadJS(resource.url, resolve);
            }
        }));
    }
    /**
     * @private
     * @param {?} tagName
     * @param {?} properties
     * @param {?} callback
     * @return {?}
     */
    _loadWithTagName(tagName, properties, callback) {
        /** @type {?} */
        let url = properties.src || properties.href;
        // Loaded
        if (this.isLoaded(url)) {
            return callback();
        }
        /** @type {?} */
        let tagEl = document.createElement(tagName);
        for (let k in properties) {
            tagEl[k] = properties[k];
        }
        tagEl.onload = (/**
         * @return {?}
         */
        () => {
            this._loaded.push(url);
            callback();
        });
        tagEl.onerror = (/**
         * @param {?} e
         * @return {?}
         */
        (e) => {
            console.warn("Load resource error: " + url);
            console.warn(e);
            this._loaded.push(url);
            callback();
        });
        document.head.appendChild(tagEl);
    }
    /**
     * @private
     * @return {?}
     */
    _initScriptVersion() {
        /** @type {?} */
        let $script = $('script');
        for (let i = 0; i < $script.length; i++) {
            /** @type {?} */
            let src = $script[i]['src'];
            /** @type {?} */
            let index = src.indexOf('?version=');
            if (index > -1) {
                this._version = src.substr(index + 1, src.length);
                break;
            }
        }
    }
}
ResourceLoaderService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
ResourceLoaderService.ctorParameters = () => [];
if (false) {
    /**
     * @type {?}
     * @private
     */
    ResourceLoaderService.prototype._loaded;
    /**
     * @type {?}
     * @private
     */
    ResourceLoaderService.prototype._version;
}
/**
 * @record
 */
export function Resource() { }
if (false) {
    /** @type {?} */
    Resource.prototype.url;
    /** @type {?|undefined} */
    Resource.prototype.sync;
    /** @type {?|undefined} */
    Resource.prototype.loaded;
    /** @type {?|undefined} */
    Resource.prototype.type;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb3VyY2UtbG9hZGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbmV0LWNvcmUvIiwic291cmNlcyI6WyJzcmMvcmVzb3VyY2UtbG9hZGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFNekMsTUFBTSxPQUFPLHFCQUFxQjtJQUs5QjtRQUhRLFlBQU8sR0FBRyxFQUFFLENBQUM7UUFDYixhQUFRLEdBQVcsRUFBRSxDQUFDO1FBRzFCLDZCQUE2QjtJQUNqQyxDQUFDOzs7Ozs7SUFFRCxJQUFJLENBQUMsU0FBcUIsRUFBRSxRQUFrQjtRQUMxQyxJQUFJLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ3RCLE9BQU8sUUFBUSxFQUFFLENBQUM7U0FDckI7UUFDRCxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUM3QyxDQUFDOzs7Ozs7SUFFRCxNQUFNLENBQUMsR0FBVyxFQUFFLFFBQWtCO1FBQ2xDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUU7WUFDNUIsSUFBSSxFQUFFLGlCQUFpQjtZQUN2QixHQUFHLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUM7U0FDOUIsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNqQixDQUFDOzs7Ozs7SUFFRCxPQUFPLENBQUMsR0FBVyxFQUFFLFFBQWtCO1FBQ25DLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUU7WUFDMUIsSUFBSSxFQUFFLFVBQVU7WUFDaEIsR0FBRyxFQUFFLFlBQVk7WUFDakIsSUFBSSxFQUFFLEdBQUc7U0FDWixFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ2pCLENBQUM7Ozs7O0lBRUQsWUFBWSxDQUFDLEdBQVc7UUFDcEIsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxJ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LFFBQVEsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNsRCxNQUFNO2FBQ1Q7U0FDSjtJQUNMLENBQUM7OztZQXJJSixVQUFVOzs7Ozs7Ozs7SUFHUCx3Q0FBcUI7Ozs7O0lBQ3JCLHlDQUE4Qjs7Ozs7QUFvSWxDLDhCQUtDOzs7SUFKRyx1QkFBWTs7SUFDWix3QkFBZTs7SUFDZiwwQkFBaUI7O0lBQ2pCLHdCQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuZGVjbGFyZSBsZXQgaU5ldDogYW55O1xuZGVjbGFyZSBsZXQgJDogYW55O1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUmVzb3VyY2VMb2FkZXJTZXJ2aWNlIHtcblxuICAgIHByaXZhdGUgX2xvYWRlZCA9IFtdO1xuICAgIHByaXZhdGUgX3ZlcnNpb246IHN0cmluZyA9ICcnO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIC8vIHRoaXMuX2luaXRTY3JpcHRWZXJzaW9uKCk7XG4gICAgfVxuXG4gICAgbG9hZChyZXNvdXJjZXM6IFJlc291cmNlW10sIGNhbGxiYWNrOiBGdW5jdGlvbikge1xuICAgICAgICBpZiAocmVzb3VyY2VzLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgICAgIHJldHVybiBjYWxsYmFjaygpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2xvYWRSZXNvdXJjZXMocmVzb3VyY2VzLCBjYWxsYmFjayk7XG4gICAgfVxuXG4gICAgbG9hZEpTKHVybDogc3RyaW5nLCBjYWxsYmFjazogRnVuY3Rpb24pIHtcbiAgICAgICAgdGhpcy5fbG9hZFdpdGhUYWdOYW1lKCdzY3JpcHQnLCB7XG4gICAgICAgICAgICB0eXBlOiAndGV4dC9qYXZhc2NyaXB0JyxcbiAgICAgICAgICAgIHNyYzogdGhpcy5nZXRGdWxsVXJsSlModXJsKVxuICAgICAgICB9LCBjYWxsYmFjayk7XG4gICAgfVxuXG4gICAgbG9hZENTUyh1cmw6IHN0cmluZywgY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XG4gICAgICAgIHRoaXMuX2xvYWRXaXRoVGFnTmFtZSgnbGluaycsIHtcbiAgICAgICAgICAgIHR5cGU6ICd0ZXh0L2NzcycsXG4gICAgICAgICAgICByZWw6ICdzdHlsZXNoZWV0JyxcbiAgICAgICAgICAgIGhyZWY6IHVybFxuICAgICAgICB9LCBjYWxsYmFjayk7XG4gICAgfVxuXG4gICAgZ2V0RnVsbFVybEpTKHVybDogc3RyaW5nKSB7XG4gICAgICAgIGlmICh1cmwuaW5kZXhPZignLy8nKSA8IDAgJiYgaU5ldC5maWxlU2VydmVyKSB7XG4gICAgICAgICAgICBpZiAodXJsLnN0YXJ0c1dpdGgoJy8nKSkge1xuICAgICAgICAgICAgICAgIHVybCA9IHVybC5zdWJzdHIoMSwgdXJsLmxlbmd0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gaU5ldC5maWxlU2VydmVyICsgdXJsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1cmw7XG4gICAgfVxuXG4gICAgaXNMb2FkZWQodXJsOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xvYWRlZC5pbmRleE9mKHVybCkgPiAtMTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9sb2FkUmVzb3VyY2VzKHJlc291cmNlczogUmVzb3VyY2VbXSwgY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XG4gICAgICAgIGxldCBzcGxpdEdyb3VwcyA9IHRoaXMuX2dyb3VwUmVzb3VyY2VzKHJlc291cmNlcyk7XG4gICAgICAgIGxldCBmbiA9ICgpID0+IHtcbiAgICAgICAgICAgIGlmIChzcGxpdEdyb3Vwcy5sZW5ndGggPCAxKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9sb2FkR3JvdXBzKHNwbGl0R3JvdXBzLnNwbGljZSgwLCAxKVswXSwgZm4pO1xuICAgICAgICB9O1xuICAgICAgICBmbigpO1xuICAgIH1cblxuICAgIC8vICBTcGxpdCBncm91cCByZXNvdXJjZXMgYnkgc3luYy9hc3luY1xuICAgIHByaXZhdGUgX2dyb3VwUmVzb3VyY2VzKHJlc291cmNlczogUmVzb3VyY2VbXSkge1xuICAgICAgICBsZXQgc3BsaXRHcm91cHMgPSBbXTtcbiAgICAgICAgbGV0IGdyb3VwcztcblxuICAgICAgICAvLyAgU3BsaXQgZ3JvdXAgcmVzb3VyY2VzIGJ5IHN5bmMvYXN5bmNcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXNvdXJjZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICghZ3JvdXBzKSB7XG4gICAgICAgICAgICAgICAgZ3JvdXBzID0gW107XG4gICAgICAgICAgICAgICAgc3BsaXRHcm91cHMucHVzaChncm91cHMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBncm91cHMucHVzaChyZXNvdXJjZXNbaV0pO1xuXG4gICAgICAgICAgICBpZiAocmVzb3VyY2VzW2ldLnN5bmMpIHtcbiAgICAgICAgICAgICAgICBncm91cHMgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzcGxpdEdyb3VwcztcbiAgICB9XG5cbiAgICBwcml2YXRlIF9sb2FkR3JvdXBzKHJlc291cmNlczogUmVzb3VyY2VbXSwgY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XG4gICAgICAgIGxldCBwcm9taXNlcyA9IFtdO1xuICAgICAgICByZXNvdXJjZXMuZm9yRWFjaChpdGVtID0+IHByb21pc2VzLnB1c2godGhpcy5fbG9hZChpdGVtKSkpO1xuICAgICAgICBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9sb2FkKHJlc291cmNlOiBSZXNvdXJjZSk6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgaWYgKHJlc291cmNlLnR5cGUgPT09ICdjc3MnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkQ1NTKHJlc291cmNlLnVybCwgcmVzb2x2ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZEpTKHJlc291cmNlLnVybCwgcmVzb2x2ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2xvYWRXaXRoVGFnTmFtZSh0YWdOYW1lOiBzdHJpbmcsIHByb3BlcnRpZXMsIGNhbGxiYWNrOiBGdW5jdGlvbikge1xuICAgICAgICBsZXQgdXJsID0gcHJvcGVydGllcy5zcmMgfHwgcHJvcGVydGllcy5ocmVmO1xuICAgICAgICAvLyBMb2FkZWRcbiAgICAgICAgaWYgKHRoaXMuaXNMb2FkZWQodXJsKSkge1xuICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKCk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGxldCB0YWdFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnTmFtZSk7XG4gICAgICAgIGZvciAobGV0IGsgaW4gcHJvcGVydGllcykge1xuICAgICAgICAgICAgdGFnRWxba10gPSBwcm9wZXJ0aWVzW2tdO1xuICAgICAgICB9XG5cbiAgICAgICAgdGFnRWwub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5fbG9hZGVkLnB1c2godXJsKTtcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgIH07XG4gICAgICAgIHRhZ0VsLm9uZXJyb3IgPSAoZSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKFwiTG9hZCByZXNvdXJjZSBlcnJvcjogXCIgKyB1cmwpO1xuICAgICAgICAgICAgY29uc29sZS53YXJuKGUpO1xuICAgICAgICAgICAgdGhpcy5fbG9hZGVkLnB1c2godXJsKTtcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZCh0YWdFbCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaW5pdFNjcmlwdFZlcnNpb24oKSB7XG4gICAgICAgIGxldCAkc2NyaXB0ID0gJCgnc2NyaXB0Jyk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgJHNjcmlwdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IHNyYyA9ICRzY3JpcHRbaV1bJ3NyYyddLFxuICAgICAgICAgICAgICAgIGluZGV4ID0gc3JjLmluZGV4T2YoJz92ZXJzaW9uPScpO1xuICAgICAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl92ZXJzaW9uID0gc3JjLnN1YnN0cihpbmRleCArIDEsIHNyYy5sZW5ndGgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJlc291cmNlIHtcbiAgICB1cmw6IHN0cmluZztcbiAgICBzeW5jPzogYm9vbGVhbjtcbiAgICBsb2FkZWQ/OiBib29sZWFuO1xuICAgIHR5cGU/OiBzdHJpbmc7XG59XG4iXX0=