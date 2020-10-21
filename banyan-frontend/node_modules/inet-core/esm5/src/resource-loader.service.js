/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
var ResourceLoaderService = /** @class */ (function () {
    function ResourceLoaderService() {
        this._loaded = [];
        this._version = '';
        // this._initScriptVersion();
    }
    /**
     * @param {?} resources
     * @param {?} callback
     * @return {?}
     */
    ResourceLoaderService.prototype.load = /**
     * @param {?} resources
     * @param {?} callback
     * @return {?}
     */
    function (resources, callback) {
        if (resources.length < 1) {
            return callback();
        }
        this._loadResources(resources, callback);
    };
    /**
     * @param {?} url
     * @param {?} callback
     * @return {?}
     */
    ResourceLoaderService.prototype.loadJS = /**
     * @param {?} url
     * @param {?} callback
     * @return {?}
     */
    function (url, callback) {
        this._loadWithTagName('script', {
            type: 'text/javascript',
            src: this.getFullUrlJS(url)
        }, callback);
    };
    /**
     * @param {?} url
     * @param {?} callback
     * @return {?}
     */
    ResourceLoaderService.prototype.loadCSS = /**
     * @param {?} url
     * @param {?} callback
     * @return {?}
     */
    function (url, callback) {
        this._loadWithTagName('link', {
            type: 'text/css',
            rel: 'stylesheet',
            href: url
        }, callback);
    };
    /**
     * @param {?} url
     * @return {?}
     */
    ResourceLoaderService.prototype.getFullUrlJS = /**
     * @param {?} url
     * @return {?}
     */
    function (url) {
        if (url.indexOf('//') < 0 && iNet.fileServer) {
            if (url.startsWith('/')) {
                url = url.substr(1, url.length);
            }
            return iNet.fileServer + url;
        }
        return url;
    };
    /**
     * @param {?} url
     * @return {?}
     */
    ResourceLoaderService.prototype.isLoaded = /**
     * @param {?} url
     * @return {?}
     */
    function (url) {
        return this._loaded.indexOf(url) > -1;
    };
    /**
     * @private
     * @param {?} resources
     * @param {?} callback
     * @return {?}
     */
    ResourceLoaderService.prototype._loadResources = /**
     * @private
     * @param {?} resources
     * @param {?} callback
     * @return {?}
     */
    function (resources, callback) {
        var _this = this;
        /** @type {?} */
        var splitGroups = this._groupResources(resources);
        /** @type {?} */
        var fn = (/**
         * @return {?}
         */
        function () {
            if (splitGroups.length < 1) {
                return callback();
            }
            _this._loadGroups(splitGroups.splice(0, 1)[0], fn);
        });
        fn();
    };
    //  Split group resources by sync/async
    //  Split group resources by sync/async
    /**
     * @private
     * @param {?} resources
     * @return {?}
     */
    ResourceLoaderService.prototype._groupResources = 
    //  Split group resources by sync/async
    /**
     * @private
     * @param {?} resources
     * @return {?}
     */
    function (resources) {
        /** @type {?} */
        var splitGroups = [];
        /** @type {?} */
        var groups;
        //  Split group resources by sync/async
        for (var i = 0; i < resources.length; i++) {
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
    };
    /**
     * @private
     * @param {?} resources
     * @param {?} callback
     * @return {?}
     */
    ResourceLoaderService.prototype._loadGroups = /**
     * @private
     * @param {?} resources
     * @param {?} callback
     * @return {?}
     */
    function (resources, callback) {
        var _this = this;
        /** @type {?} */
        var promises = [];
        resources.forEach((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return promises.push(_this._load(item)); }));
        Promise.all(promises).then((/**
         * @return {?}
         */
        function () {
            callback();
        }));
    };
    /**
     * @private
     * @param {?} resource
     * @return {?}
     */
    ResourceLoaderService.prototype._load = /**
     * @private
     * @param {?} resource
     * @return {?}
     */
    function (resource) {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        function (resolve) {
            if (resource.type === 'css') {
                _this.loadCSS(resource.url, resolve);
            }
            else {
                _this.loadJS(resource.url, resolve);
            }
        }));
    };
    /**
     * @private
     * @param {?} tagName
     * @param {?} properties
     * @param {?} callback
     * @return {?}
     */
    ResourceLoaderService.prototype._loadWithTagName = /**
     * @private
     * @param {?} tagName
     * @param {?} properties
     * @param {?} callback
     * @return {?}
     */
    function (tagName, properties, callback) {
        var _this = this;
        /** @type {?} */
        var url = properties.src || properties.href;
        // Loaded
        if (this.isLoaded(url)) {
            return callback();
        }
        /** @type {?} */
        var tagEl = document.createElement(tagName);
        for (var k in properties) {
            tagEl[k] = properties[k];
        }
        tagEl.onload = (/**
         * @return {?}
         */
        function () {
            _this._loaded.push(url);
            callback();
        });
        tagEl.onerror = (/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            console.warn("Load resource error: " + url);
            console.warn(e);
            _this._loaded.push(url);
            callback();
        });
        document.head.appendChild(tagEl);
    };
    /**
     * @private
     * @return {?}
     */
    ResourceLoaderService.prototype._initScriptVersion = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var $script = $('script');
        for (var i = 0; i < $script.length; i++) {
            /** @type {?} */
            var src = $script[i]['src'];
            /** @type {?} */
            var index = src.indexOf('?version=');
            if (index > -1) {
                this._version = src.substr(index + 1, src.length);
                break;
            }
        }
    };
    ResourceLoaderService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    ResourceLoaderService.ctorParameters = function () { return []; };
    return ResourceLoaderService;
}());
export { ResourceLoaderService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb3VyY2UtbG9hZGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbmV0LWNvcmUvIiwic291cmNlcyI6WyJzcmMvcmVzb3VyY2UtbG9hZGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFLekM7SUFNSTtRQUhRLFlBQU8sR0FBRyxFQUFFLENBQUM7UUFDYixhQUFRLEdBQVcsRUFBRSxDQUFDO1FBRzFCLDZCQUE2QjtJQUNqQyxDQUFDOzs7Ozs7SUFFRCxvQ0FBSTs7Ozs7SUFBSixVQUFLLFNBQXFCLEVBQUUsUUFBa0I7UUFDMUMsSUFBSSxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUN0QixPQUFPLFFBQVEsRUFBRSxDQUFDO1NBQ3JCO1FBQ0QsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDN0MsQ0FBQzs7Ozs7O0lBRUQsc0NBQU07Ozs7O0lBQU4sVUFBTyxHQUFXLEVBQUUsUUFBa0I7UUFDbEMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRTtZQUM1QixJQUFJLEVBQUUsaUJBQWlCO1lBQ3ZCLEdBQUcsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQztTQUM5QixFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ2pCLENBQUM7Ozs7OztJQUVELHVDQUFPOzs7OztJQUFQLFVBQVEsR0FBVyxFQUFFLFFBQWtCO1FBQ25DLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUU7WUFDMUIsSUFBSSxFQUFFLFVBQVU7WUFDaEIsR0FBRyxFQUFFLFlBQVk7WUFDakIsSUFBSSxFQUFFLEdBQUc7U0FDWixFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ2pCLENBQUM7Ozs7O0lBRUQsNENBQVk7Ozs7SUFBWixVQUFhLEdBQVc7UUFDcEIsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUks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LENBQUMsQ0FBQyxLQUFLLENBQUM7O2dCQUN2QixLQUFLLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUM7WUFDcEMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEVBQUU7Z0JBQ1osSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNsRCxNQUFNO2FBQ1Q7U0FDSjtJQUNMLENBQUM7O2dCQXJJSixVQUFVOzs7O0lBc0lYLDRCQUFDO0NBQUEsQUF0SUQsSUFzSUM7U0FySVkscUJBQXFCOzs7Ozs7SUFFOUIsd0NBQXFCOzs7OztJQUNyQix5Q0FBOEI7Ozs7O0FBb0lsQyw4QkFLQzs7O0lBSkcsdUJBQVk7O0lBQ1osd0JBQWU7O0lBQ2YsMEJBQWlCOztJQUNqQix3QkFBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmRlY2xhcmUgbGV0IGlOZXQ6IGFueTtcbmRlY2xhcmUgbGV0ICQ6IGFueTtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFJlc291cmNlTG9hZGVyU2VydmljZSB7XG5cbiAgICBwcml2YXRlIF9sb2FkZWQgPSBbXTtcbiAgICBwcml2YXRlIF92ZXJzaW9uOiBzdHJpbmcgPSAnJztcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAvLyB0aGlzLl9pbml0U2NyaXB0VmVyc2lvbigpO1xuICAgIH1cblxuICAgIGxvYWQocmVzb3VyY2VzOiBSZXNvdXJjZVtdLCBjYWxsYmFjazogRnVuY3Rpb24pIHtcbiAgICAgICAgaWYgKHJlc291cmNlcy5sZW5ndGggPCAxKSB7XG4gICAgICAgICAgICByZXR1cm4gY2FsbGJhY2soKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9sb2FkUmVzb3VyY2VzKHJlc291cmNlcywgY2FsbGJhY2spO1xuICAgIH1cblxuICAgIGxvYWRKUyh1cmw6IHN0cmluZywgY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XG4gICAgICAgIHRoaXMuX2xvYWRXaXRoVGFnTmFtZSgnc2NyaXB0Jywge1xuICAgICAgICAgICAgdHlwZTogJ3RleHQvamF2YXNjcmlwdCcsXG4gICAgICAgICAgICBzcmM6IHRoaXMuZ2V0RnVsbFVybEpTKHVybClcbiAgICAgICAgfSwgY2FsbGJhY2spO1xuICAgIH1cblxuICAgIGxvYWRDU1ModXJsOiBzdHJpbmcsIGNhbGxiYWNrOiBGdW5jdGlvbikge1xuICAgICAgICB0aGlzLl9sb2FkV2l0aFRhZ05hbWUoJ2xpbmsnLCB7XG4gICAgICAgICAgICB0eXBlOiAndGV4dC9jc3MnLFxuICAgICAgICAgICAgcmVsOiAnc3R5bGVzaGVldCcsXG4gICAgICAgICAgICBocmVmOiB1cmxcbiAgICAgICAgfSwgY2FsbGJhY2spO1xuICAgIH1cblxuICAgIGdldEZ1bGxVcmxKUyh1cmw6IHN0cmluZykge1xuICAgICAgICBpZiAodXJsLmluZGV4T2YoJy8vJykgPCAwICYmIGlOZXQuZmlsZVNlcnZlcikge1xuICAgICAgICAgICAgaWYgKHVybC5zdGFydHNXaXRoKCcvJykpIHtcbiAgICAgICAgICAgICAgICB1cmwgPSB1cmwuc3Vic3RyKDEsIHVybC5sZW5ndGgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGlOZXQuZmlsZVNlcnZlciArIHVybDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdXJsO1xuICAgIH1cblxuICAgIGlzTG9hZGVkKHVybDogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9sb2FkZWQuaW5kZXhPZih1cmwpID4gLTE7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfbG9hZFJlc291cmNlcyhyZXNvdXJjZXM6IFJlc291cmNlW10sIGNhbGxiYWNrOiBGdW5jdGlvbikge1xuICAgICAgICBsZXQgc3BsaXRHcm91cHMgPSB0aGlzLl9ncm91cFJlc291cmNlcyhyZXNvdXJjZXMpO1xuICAgICAgICBsZXQgZm4gPSAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoc3BsaXRHcm91cHMubGVuZ3RoIDwgMSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjYWxsYmFjaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fbG9hZEdyb3VwcyhzcGxpdEdyb3Vwcy5zcGxpY2UoMCwgMSlbMF0sIGZuKTtcbiAgICAgICAgfTtcbiAgICAgICAgZm4oKTtcbiAgICB9XG5cbiAgICAvLyAgU3BsaXQgZ3JvdXAgcmVzb3VyY2VzIGJ5IHN5bmMvYXN5bmNcbiAgICBwcml2YXRlIF9ncm91cFJlc291cmNlcyhyZXNvdXJjZXM6IFJlc291cmNlW10pIHtcbiAgICAgICAgbGV0IHNwbGl0R3JvdXBzID0gW107XG4gICAgICAgIGxldCBncm91cHM7XG5cbiAgICAgICAgLy8gIFNwbGl0IGdyb3VwIHJlc291cmNlcyBieSBzeW5jL2FzeW5jXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVzb3VyY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoIWdyb3Vwcykge1xuICAgICAgICAgICAgICAgIGdyb3VwcyA9IFtdO1xuICAgICAgICAgICAgICAgIHNwbGl0R3JvdXBzLnB1c2goZ3JvdXBzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZ3JvdXBzLnB1c2gocmVzb3VyY2VzW2ldKTtcblxuICAgICAgICAgICAgaWYgKHJlc291cmNlc1tpXS5zeW5jKSB7XG4gICAgICAgICAgICAgICAgZ3JvdXBzID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3BsaXRHcm91cHM7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfbG9hZEdyb3VwcyhyZXNvdXJjZXM6IFJlc291cmNlW10sIGNhbGxiYWNrOiBGdW5jdGlvbikge1xuICAgICAgICBsZXQgcHJvbWlzZXMgPSBbXTtcbiAgICAgICAgcmVzb3VyY2VzLmZvckVhY2goaXRlbSA9PiBwcm9taXNlcy5wdXNoKHRoaXMuX2xvYWQoaXRlbSkpKTtcbiAgICAgICAgUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfbG9hZChyZXNvdXJjZTogUmVzb3VyY2UpOiBQcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgIGlmIChyZXNvdXJjZS50eXBlID09PSAnY3NzJykge1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZENTUyhyZXNvdXJjZS51cmwsIHJlc29sdmUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRKUyhyZXNvdXJjZS51cmwsIHJlc29sdmUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9sb2FkV2l0aFRhZ05hbWUodGFnTmFtZTogc3RyaW5nLCBwcm9wZXJ0aWVzLCBjYWxsYmFjazogRnVuY3Rpb24pIHtcbiAgICAgICAgbGV0IHVybCA9IHByb3BlcnRpZXMuc3JjIHx8IHByb3BlcnRpZXMuaHJlZjtcbiAgICAgICAgLy8gTG9hZGVkXG4gICAgICAgIGlmICh0aGlzLmlzTG9hZGVkKHVybCkpIHtcbiAgICAgICAgICAgIHJldHVybiBjYWxsYmFjaygpO1xuICAgICAgICB9XG5cblxuICAgICAgICBsZXQgdGFnRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZ05hbWUpO1xuICAgICAgICBmb3IgKGxldCBrIGluIHByb3BlcnRpZXMpIHtcbiAgICAgICAgICAgIHRhZ0VsW2tdID0gcHJvcGVydGllc1trXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRhZ0VsLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX2xvYWRlZC5wdXNoKHVybCk7XG4gICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICB9O1xuICAgICAgICB0YWdFbC5vbmVycm9yID0gKGUpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcIkxvYWQgcmVzb3VyY2UgZXJyb3I6IFwiICsgdXJsKTtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihlKTtcbiAgICAgICAgICAgIHRoaXMuX2xvYWRlZC5wdXNoKHVybCk7XG4gICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQodGFnRWwpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2luaXRTY3JpcHRWZXJzaW9uKCkge1xuICAgICAgICBsZXQgJHNjcmlwdCA9ICQoJ3NjcmlwdCcpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8ICRzY3JpcHQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBzcmMgPSAkc2NyaXB0W2ldWydzcmMnXSxcbiAgICAgICAgICAgICAgICBpbmRleCA9IHNyYy5pbmRleE9mKCc/dmVyc2lvbj0nKTtcbiAgICAgICAgICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdmVyc2lvbiA9IHNyYy5zdWJzdHIoaW5kZXggKyAxLCBzcmMubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBSZXNvdXJjZSB7XG4gICAgdXJsOiBzdHJpbmc7XG4gICAgc3luYz86IGJvb2xlYW47XG4gICAgbG9hZGVkPzogYm9vbGVhbjtcbiAgICB0eXBlPzogc3RyaW5nO1xufVxuIl19