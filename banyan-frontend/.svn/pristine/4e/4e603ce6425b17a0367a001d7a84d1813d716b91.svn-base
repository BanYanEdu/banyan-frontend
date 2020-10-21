/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { HttpParams } from "@angular/common/http";
import { Subject } from 'rxjs/Subject';
var PluginManagerService = /** @class */ (function () {
    function PluginManagerService() {
        this.loaded = false;
        this.pluginManager = iNet.PluginManager;
        this.plugins = {};
        // Observable sources
        this.subject = new Subject();
        return PluginManagerService.instance = PluginManagerService.instance || this;
    }
    /**
     * @param {?} pluginId
     * @param {?} component
     * @return {?}
     */
    PluginManagerService.prototype.register = /**
     * @param {?} pluginId
     * @param {?} component
     * @return {?}
     */
    function (pluginId, component) {
        this.plugins[pluginId] = component;
    };
    /**
     * @param {?} pluginId
     * @return {?}
     */
    PluginManagerService.prototype.destroyById = /**
     * @param {?} pluginId
     * @return {?}
     */
    function (pluginId) {
        this.clearMessage(); // clear all
        delete this.plugins[pluginId];
    };
    /**
     * @return {?}
     */
    PluginManagerService.prototype.getPlugins = /**
     * @return {?}
     */
    function () {
        return this.plugins;
    };
    /**
     * @param {?} pluginId
     * @return {?}
     */
    PluginManagerService.prototype.hasPluginId = /**
     * @param {?} pluginId
     * @return {?}
     */
    function (pluginId) {
        return this.plugins.hasOwnProperty(pluginId);
    };
    /**
     * @param {?} pluginId
     * @return {?}
     */
    PluginManagerService.prototype.getPluginById = /**
     * @param {?} pluginId
     * @return {?}
     */
    function (pluginId) {
        return this.plugins[pluginId];
    };
    /**
     * @param {?} message
     * @param {?} contentWindow
     * @return {?}
     */
    PluginManagerService.prototype.sendMessageTo = /**
     * @param {?} message
     * @param {?} contentWindow
     * @return {?}
     */
    function (message, contentWindow) {
        if (this.pluginManager) {
            this.pluginManager.sendMessageTo(message, contentWindow);
            // console.log('[PluginManagerService]--sendMessage--', message);
        }
    };
    /**
     * @return {?}
     */
    PluginManagerService.prototype.listen = /**
     * @return {?}
     */
    function () {
        if (!this.pluginManager) {
            console.warn("\tCould not find PluginManager, plugins may not work as expected. Please update to the latest version of iNet Core.\n            For more info refer to: http://cdn.inetcloud.vn/data/api/lib/inet-core.min.js");
        }
        else if (!this.loaded) {
            // console.log('Listen to message from window of Unicorn');
            console.log('PluginManager is listening on ' + window.origin);
            this.pluginManager.bindEvent(window, 'message', (/**
             * @param {?} e
             * @return {?}
             */
            function (e) {
                console.log('[PluginManager Recieve]--message--', e);
                this.sendMessage(e); // call to feed values
            }).bind(this));
            this.loaded = true;
        }
    };
    /**
     * @return {?}
     */
    PluginManagerService.prototype.getMessage = /**
     * @return {?}
     */
    function () {
        return this.subject.asObservable();
    };
    /**
     * @return {?}
     */
    PluginManagerService.prototype.clearMessage = /**
     * @return {?}
     */
    function () {
        this.subject.next();
    };
    /**
     * @param {?} pluginId
     * @return {?}
     */
    PluginManagerService.prototype.getContentWindowById = /**
     * @param {?} pluginId
     * @return {?}
     */
    function (pluginId) {
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            setTimeout((/**
             * @return {?}
             */
            function () {
                /** @type {?} */
                var iframe = document.getElementById(pluginId);
                resolve(iframe ? iframe['contentWindow'] || iframe['contentDocument'] : null);
            }));
        }));
    };
    /**
     * @private
     * @param {?} message
     * @return {?}
     */
    PluginManagerService.prototype.sendMessage = /**
     * @private
     * @param {?} message
     * @return {?}
     */
    function (message) {
        // console.log('[PluginManager Send messages to component]--message--', message);
        this.subject.next(message);
    };
    /**
     * @param {?} obj
     * @return {?}
     */
    PluginManagerService.prototype.convertToHttpParams = /**
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
        if (!obj) {
            return null;
        }
        return Object.getOwnPropertyNames(obj).reduce((/**
         * @param {?} p
         * @param {?} key
         * @return {?}
         */
        function (p, key) { return p.set(key, (obj[key] === undefined || iNet.isObject(obj[key])) ? '' : obj[key]); }), new HttpParams());
    };
    /*
       loadById(pluginId: string, targetId: string, params?: any | null) {

           const me = this;
           let url = iNet.getPUrl(`common/page/plugins/${pluginId}`);
           if (params) {
               url = iNet.urlAppend(url, this.convertToHttpParams(params).toString());
           }
           const client = new XMLHttpRequest();
           client.onload = function () {
               if (!!this.responseText) {
                   // console.log(this.responseText, me);
                   me.createDynamicPluginTemplate(pluginId, this.responseText, targetId);
               }
           };
           client.open('GET', url, true);
           client.send();

    }
    */
    /*
    executeScripts(html: string) {
        const $el = $('<template></template>').html(html);
        const $scripts = $el.find('script');
        for (let i = 0; i < $scripts.length; i++) {
            const $script = $($scripts[i]);
            const newScript = document.createElement('script');
            if (!!$script.attr('src')) { // external scripts
                newScript.src = $script.attr('src');
            } else { // inline script
                const inlineScript = document.createTextNode($script[0].innerHTML);
                newScript.appendChild(inlineScript);
            }
            document.documentElement.appendChild(newScript);
        }
    }
    */
    /*
           loadById(pluginId: string, targetId: string, params?: any | null) {
    
               const me = this;
               let url = iNet.getPUrl(`common/page/plugins/${pluginId}`);
               if (params) {
                   url = iNet.urlAppend(url, this.convertToHttpParams(params).toString());
               }
               const client = new XMLHttpRequest();
               client.onload = function () {
                   if (!!this.responseText) {
                       // console.log(this.responseText, me);
                       me.createDynamicPluginTemplate(pluginId, this.responseText, targetId);
                   }
               };
               client.open('GET', url, true);
               client.send();
    
        }
        */
    /*
        executeScripts(html: string) {
            const $el = $('<template></template>').html(html);
            const $scripts = $el.find('script');
            for (let i = 0; i < $scripts.length; i++) {
                const $script = $($scripts[i]);
                const newScript = document.createElement('script');
                if (!!$script.attr('src')) { // external scripts
                    newScript.src = $script.attr('src');
                } else { // inline script
                    const inlineScript = document.createTextNode($script[0].innerHTML);
                    newScript.appendChild(inlineScript);
                }
                document.documentElement.appendChild(newScript);
            }
        }
        */
    /**
     * @param {?} pluginId
     * @param {?} targetId
     * @return {?}
     */
    PluginManagerService.prototype.testCreatePluginTemplate = /*
           loadById(pluginId: string, targetId: string, params?: any | null) {
    
               const me = this;
               let url = iNet.getPUrl(`common/page/plugins/${pluginId}`);
               if (params) {
                   url = iNet.urlAppend(url, this.convertToHttpParams(params).toString());
               }
               const client = new XMLHttpRequest();
               client.onload = function () {
                   if (!!this.responseText) {
                       // console.log(this.responseText, me);
                       me.createDynamicPluginTemplate(pluginId, this.responseText, targetId);
                   }
               };
               client.open('GET', url, true);
               client.send();
    
        }
        */
    /*
        executeScripts(html: string) {
            const $el = $('<template></template>').html(html);
            const $scripts = $el.find('script');
            for (let i = 0; i < $scripts.length; i++) {
                const $script = $($scripts[i]);
                const newScript = document.createElement('script');
                if (!!$script.attr('src')) { // external scripts
                    newScript.src = $script.attr('src');
                } else { // inline script
                    const inlineScript = document.createTextNode($script[0].innerHTML);
                    newScript.appendChild(inlineScript);
                }
                document.documentElement.appendChild(newScript);
            }
        }
        */
    /**
     * @param {?} pluginId
     * @param {?} targetId
     * @return {?}
     */
    function (pluginId, targetId) {
        /*
        const html = `
            <script>console.log("execute inline script");</script>
            <b>HTML and Javascript Content</b>
            <script src="http://cdn.inetcloud.vn/data/api/lib/test/test.js"></script>
        `;

        this.createDynamicPluginTemplate(pluginId, html, targetId);
        */
        // this.executeScripts(html);
    };
    PluginManagerService.instance = null;
    PluginManagerService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    PluginManagerService.ctorParameters = function () { return []; };
    return PluginManagerService;
}());
export { PluginManagerService };
if (false) {
    /** @type {?} */
    PluginManagerService.instance;
    /**
     * @type {?}
     * @private
     */
    PluginManagerService.prototype.loaded;
    /** @type {?} */
    PluginManagerService.prototype.pluginManager;
    /**
     * @type {?}
     * @private
     */
    PluginManagerService.prototype.plugins;
    /**
     * @type {?}
     * @private
     */
    PluginManagerService.prototype.subject;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGx1Z2luLW1hbmFnZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtdWkvIiwic291cmNlcyI6WyJzcmMvcGx1Z2luLW1hbmFnZXIvcGx1Z2luLW1hbmFnZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDaEQsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUtyQztJQVNJO1FBTlEsV0FBTSxHQUFHLEtBQUssQ0FBQztRQUN2QixrQkFBYSxHQUFRLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDaEMsWUFBTyxHQUFHLEVBQUUsQ0FBQzs7UUFFYixZQUFPLEdBQUcsSUFBSSxPQUFPLEVBQU8sQ0FBQztRQUdqQyxPQUFPLG9CQUFvQixDQUFDLFFBQVEsR0FBRyxvQkFBb0IsQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDO0lBQ2pGLENBQUM7Ozs7OztJQUVELHVDQUFROzs7OztJQUFSLFVBQVMsUUFBZ0IsRUFBRSxTQUFjO1FBQ3JDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsU0FBUyxDQUFDO0lBQ3ZDLENBQUM7Ozs7O0lBRUQsMENBQVc7Ozs7SUFBWCxVQUFZLFFBQWdCO1FBQ3hCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLFlBQVk7UUFDakMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7Ozs7SUFFRCx5Q0FBVTs7O0lBQVY7UUFDSSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDeEIsQ0FBQzs7Ozs7SUFFRCwwQ0FBVzs7OztJQUFYLFVBQVksUUFBZ0I7UUFDeEIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNqRCxDQUFD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Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFRix1REFBd0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUF4QixVQUF5QixRQUFnQixFQUFFLFFBQWdCO1FBQ3ZEOzs7Ozs7OztVQVFFO1FBQ0YsNkJBQTZCO0lBQ2pDLENBQUM7SUF0SU0sNkJBQVEsR0FBeUIsSUFBSSxDQUFDOztnQkFGaEQsVUFBVTs7OztJQXFNWCwyQkFBQztDQUFBLEFBck1ELElBcU1DO1NBcE1ZLG9CQUFvQjs7O0lBQzdCLDhCQUE2Qzs7Ozs7SUFDN0Msc0NBQXVCOztJQUN2Qiw2Q0FBd0M7Ozs7O0lBQ3hDLHVDQUFxQjs7Ozs7SUFFckIsdUNBQXFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7SHR0cFBhcmFtc30gZnJvbSBcIkBhbmd1bGFyL2NvbW1vbi9odHRwXCI7XG5pbXBvcnQge1N1YmplY3R9IGZyb20gJ3J4anMvU3ViamVjdCc7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gXCJyeGpzXCI7XG5pbXBvcnQge0Nsb3VkUGx1Z2luQ29tcG9uZW50fSBmcm9tIFwiLi9jbG91ZC1wbHVnaW4uY29tcG9uZW50XCI7XG5kZWNsYXJlIGxldCBpTmV0OiBhbnk7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBQbHVnaW5NYW5hZ2VyU2VydmljZSB7XG4gICAgc3RhdGljIGluc3RhbmNlOiBQbHVnaW5NYW5hZ2VyU2VydmljZSA9IG51bGw7XG4gICAgcHJpdmF0ZSBsb2FkZWQgPSBmYWxzZTtcbiAgICBwbHVnaW5NYW5hZ2VyOiBhbnkgPSBpTmV0LlBsdWdpbk1hbmFnZXI7XG4gICAgcHJpdmF0ZSBwbHVnaW5zID0ge307XG4gICAgLy8gT2JzZXJ2YWJsZSBzb3VyY2VzXG4gICAgcHJpdmF0ZSBzdWJqZWN0ID0gbmV3IFN1YmplY3Q8YW55PigpO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHJldHVybiBQbHVnaW5NYW5hZ2VyU2VydmljZS5pbnN0YW5jZSA9IFBsdWdpbk1hbmFnZXJTZXJ2aWNlLmluc3RhbmNlIHx8IHRoaXM7XG4gICAgfVxuXG4gICAgcmVnaXN0ZXIocGx1Z2luSWQ6IHN0cmluZywgY29tcG9uZW50OiBhbnkpIHtcbiAgICAgICAgdGhpcy5wbHVnaW5zW3BsdWdpbklkXSA9IGNvbXBvbmVudDtcbiAgICB9XG5cbiAgICBkZXN0cm95QnlJZChwbHVnaW5JZDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuY2xlYXJNZXNzYWdlKCk7IC8vIGNsZWFyIGFsbFxuICAgICAgICBkZWxldGUgdGhpcy5wbHVnaW5zW3BsdWdpbklkXTtcbiAgICB9XG5cbiAgICBnZXRQbHVnaW5zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wbHVnaW5zO1xuICAgIH1cblxuICAgIGhhc1BsdWdpbklkKHBsdWdpbklkOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGx1Z2lucy5oYXNPd25Qcm9wZXJ0eShwbHVnaW5JZCk7XG4gICAgfVxuXG4gICAgZ2V0UGx1Z2luQnlJZChwbHVnaW5JZDogc3RyaW5nKTogQ2xvdWRQbHVnaW5Db21wb25lbnQge1xuICAgICAgICByZXR1cm4gdGhpcy5wbHVnaW5zW3BsdWdpbklkXTtcbiAgICB9XG5cbiAgICBzZW5kTWVzc2FnZVRvKG1lc3NhZ2U6IGFueSwgY29udGVudFdpbmRvdykge1xuICAgICAgICBpZiAodGhpcy5wbHVnaW5NYW5hZ2VyKSB7XG4gICAgICAgICAgICB0aGlzLnBsdWdpbk1hbmFnZXIuc2VuZE1lc3NhZ2VUbyhtZXNzYWdlLCBjb250ZW50V2luZG93KTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdbUGx1Z2luTWFuYWdlclNlcnZpY2VdLS1zZW5kTWVzc2FnZS0tJywgbWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBsaXN0ZW4oKSB7XG4gICAgICAgIGlmICghdGhpcy5wbHVnaW5NYW5hZ2VyKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYFxcdENvdWxkIG5vdCBmaW5kIFBsdWdpbk1hbmFnZXIsIHBsdWdpbnMgbWF5IG5vdCB3b3JrIGFzIGV4cGVjdGVkLiBQbGVhc2UgdXBkYXRlIHRvIHRoZSBsYXRlc3QgdmVyc2lvbiBvZiBpTmV0IENvcmUuXG4gICAgICAgICAgICBGb3IgbW9yZSBpbmZvIHJlZmVyIHRvOiBodHRwOi8vY2RuLmluZXRjbG91ZC52bi9kYXRhL2FwaS9saWIvaW5ldC1jb3JlLm1pbi5qc2ApO1xuICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLmxvYWRlZCkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ0xpc3RlbiB0byBtZXNzYWdlIGZyb20gd2luZG93IG9mIFVuaWNvcm4nKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdQbHVnaW5NYW5hZ2VyIGlzIGxpc3RlbmluZyBvbiAnICsgd2luZG93Lm9yaWdpbik7XG4gICAgICAgICAgICB0aGlzLnBsdWdpbk1hbmFnZXIuYmluZEV2ZW50KHdpbmRvdywgJ21lc3NhZ2UnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdbUGx1Z2luTWFuYWdlciBSZWNpZXZlXS0tbWVzc2FnZS0tJywgZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZW5kTWVzc2FnZShlKTsgLy8gY2FsbCB0byBmZWVkIHZhbHVlc1xuICAgICAgICAgICAgfS5iaW5kKHRoaXMpKTtcblxuICAgICAgICAgICAgdGhpcy5sb2FkZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0TWVzc2FnZSgpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zdWJqZWN0LmFzT2JzZXJ2YWJsZSgpO1xuICAgIH1cblxuICAgIGNsZWFyTWVzc2FnZSgpIHtcbiAgICAgICAgdGhpcy5zdWJqZWN0Lm5leHQoKTtcbiAgICB9XG5cbiAgICBnZXRDb250ZW50V2luZG93QnlJZChwbHVnaW5JZDogc3RyaW5nKTogUHJvbWlzZTxXaW5kb3cgfCBEb2N1bWVudD4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgaWZyYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocGx1Z2luSWQpO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoaWZyYW1lID8gaWZyYW1lWydjb250ZW50V2luZG93J10gfHwgaWZyYW1lWydjb250ZW50RG9jdW1lbnQnXSA6IG51bGwpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2VuZE1lc3NhZ2UobWVzc2FnZTogYW55KSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdbUGx1Z2luTWFuYWdlciBTZW5kIG1lc3NhZ2VzIHRvIGNvbXBvbmVudF0tLW1lc3NhZ2UtLScsIG1lc3NhZ2UpO1xuICAgICAgICB0aGlzLnN1YmplY3QubmV4dChtZXNzYWdlKTtcbiAgICB9XG5cbiAgICBjb252ZXJ0VG9IdHRwUGFyYW1zKG9iajogT2JqZWN0KTogSHR0cFBhcmFtcyB7XG4gICAgICAgIGlmICghb2JqKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMob2JqKS5yZWR1Y2UoKHAsIGtleSkgPT4gcC5zZXQoa2V5LCAob2JqW2tleV0gPT09IHVuZGVmaW5lZCB8fCBpTmV0LmlzT2JqZWN0KG9ialtrZXldKSkgPyAnJyA6IG9ialtrZXldKSwgbmV3IEh0dHBQYXJhbXMoKSk7XG4gICAgfVxuXG4gICAgLypcbiAgICAgICBsb2FkQnlJZChwbHVnaW5JZDogc3RyaW5nLCB0YXJnZXRJZDogc3RyaW5nLCBwYXJhbXM/OiBhbnkgfCBudWxsKSB7XG5cbiAgICAgICAgICAgY29uc3QgbWUgPSB0aGlzO1xuICAgICAgICAgICBsZXQgdXJsID0gaU5ldC5nZXRQVXJsKGBjb21tb24vcGFnZS9wbHVnaW5zLyR7cGx1Z2luSWR9YCk7XG4gICAgICAgICAgIGlmIChwYXJhbXMpIHtcbiAgICAgICAgICAgICAgIHVybCA9IGlOZXQudXJsQXBwZW5kKHVybCwgdGhpcy5jb252ZXJ0VG9IdHRwUGFyYW1zKHBhcmFtcykudG9TdHJpbmcoKSk7XG4gICAgICAgICAgIH1cbiAgICAgICAgICAgY29uc3QgY2xpZW50ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgICAgIGNsaWVudC5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICBpZiAoISF0aGlzLnJlc3BvbnNlVGV4dCkge1xuICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMucmVzcG9uc2VUZXh0LCBtZSk7XG4gICAgICAgICAgICAgICAgICAgbWUuY3JlYXRlRHluYW1pY1BsdWdpblRlbXBsYXRlKHBsdWdpbklkLCB0aGlzLnJlc3BvbnNlVGV4dCwgdGFyZ2V0SWQpO1xuICAgICAgICAgICAgICAgfVxuICAgICAgICAgICB9O1xuICAgICAgICAgICBjbGllbnQub3BlbignR0VUJywgdXJsLCB0cnVlKTtcbiAgICAgICAgICAgY2xpZW50LnNlbmQoKTtcblxuICAgIH1cbiAgICAqL1xuXG4gICAgLypcbiAgICBleGVjdXRlU2NyaXB0cyhodG1sOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgJGVsID0gJCgnPHRlbXBsYXRlPjwvdGVtcGxhdGU+JykuaHRtbChodG1sKTtcbiAgICAgICAgY29uc3QgJHNjcmlwdHMgPSAkZWwuZmluZCgnc2NyaXB0Jyk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgJHNjcmlwdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0ICRzY3JpcHQgPSAkKCRzY3JpcHRzW2ldKTtcbiAgICAgICAgICAgIGNvbnN0IG5ld1NjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgICAgICAgICAgaWYgKCEhJHNjcmlwdC5hdHRyKCdzcmMnKSkgeyAvLyBleHRlcm5hbCBzY3JpcHRzXG4gICAgICAgICAgICAgICAgbmV3U2NyaXB0LnNyYyA9ICRzY3JpcHQuYXR0cignc3JjJyk7XG4gICAgICAgICAgICB9IGVsc2UgeyAvLyBpbmxpbmUgc2NyaXB0XG4gICAgICAgICAgICAgICAgY29uc3QgaW5saW5lU2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJHNjcmlwdFswXS5pbm5lckhUTUwpO1xuICAgICAgICAgICAgICAgIG5ld1NjcmlwdC5hcHBlbmRDaGlsZChpbmxpbmVTY3JpcHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmFwcGVuZENoaWxkKG5ld1NjcmlwdCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgKi9cblxuICAgIHRlc3RDcmVhdGVQbHVnaW5UZW1wbGF0ZShwbHVnaW5JZDogc3RyaW5nLCB0YXJnZXRJZDogc3RyaW5nKSB7XG4gICAgICAgIC8qXG4gICAgICAgIGNvbnN0IGh0bWwgPSBgXG4gICAgICAgICAgICA8c2NyaXB0PmNvbnNvbGUubG9nKFwiZXhlY3V0ZSBpbmxpbmUgc2NyaXB0XCIpOzwvc2NyaXB0PlxuICAgICAgICAgICAgPGI+SFRNTCBhbmQgSmF2YXNjcmlwdCBDb250ZW50PC9iPlxuICAgICAgICAgICAgPHNjcmlwdCBzcmM9XCJodHRwOi8vY2RuLmluZXRjbG91ZC52bi9kYXRhL2FwaS9saWIvdGVzdC90ZXN0LmpzXCI+PC9zY3JpcHQ+XG4gICAgICAgIGA7XG5cbiAgICAgICAgdGhpcy5jcmVhdGVEeW5hbWljUGx1Z2luVGVtcGxhdGUocGx1Z2luSWQsIGh0bWwsIHRhcmdldElkKTtcbiAgICAgICAgKi9cbiAgICAgICAgLy8gdGhpcy5leGVjdXRlU2NyaXB0cyhodG1sKTtcbiAgICB9XG5cbiAgICAvKlxuICAgICAgICBjcmVhdGVEeW5hbWljUGx1Z2luVGVtcGxhdGUocGx1Z2luSWQ6IHN0cmluZywgaHRtbDogc3RyaW5nLCB0YXJnZXRJZDogc3RyaW5nKSB7XG4gICAgICAgICAgICAvLyBodG1sID0gaHRtbC5yZXBsYWNlKC88c2NyaXB0XFxiW148XSooPzooPyE8XFwvc2NyaXB0Pik8W148XSopKjxcXC9zY3JpcHQ+L2dpLCAnJyk7XG4gICAgICAgICAgICBjb25zdCB0ZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RlbXBsYXRlJyk7XG4gICAgICAgICAgICB0ZW1wbGF0ZS5pZCA9IHBsdWdpbklkO1xuICAgICAgICAgICAgdGVtcGxhdGUuaW5uZXJIVE1MID0gaHRtbDtcblxuICAgICAgICAgICAgLy8gVXNpbmcgalF1ZXJ5IHRvIGFkZCBzY3JpcHRzXG4gICAgICAgICAgICBjb25zdCAkZWwgPSAkKCc8dGVtcGxhdGU+PC90ZW1wbGF0ZT4nKS5odG1sKGh0bWwpO1xuICAgICAgICAgICAgY29uc3QgJHNjcmlwdHMgPSAkZWwuZmluZCgnc2NyaXB0Jyk7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8ICRzY3JpcHRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgJHNjcmlwdCA9ICQoJHNjcmlwdHNbaV0pO1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld1NjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgICAgICAgICAgICAgIGlmICghISRzY3JpcHQuYXR0cignc3JjJykpIHsgLy8gZXh0ZXJuYWwgc2NyaXB0c1xuICAgICAgICAgICAgICAgICAgICBuZXdTY3JpcHQuc3JjID0gJHNjcmlwdC5hdHRyKCdzcmMnKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgeyAvLyBpbmxpbmUgc2NyaXB0XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGlubGluZVNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCRzY3JpcHRbMF0uaW5uZXJIVE1MKTtcbiAgICAgICAgICAgICAgICAgICAgbmV3U2NyaXB0LmFwcGVuZENoaWxkKGlubGluZVNjcmlwdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRlbXBsYXRlLmFwcGVuZENoaWxkKG5ld1NjcmlwdCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5hcHBlbmRDaGlsZCh0ZW1wbGF0ZSk7XG5cbiAgICB9XG5cbiAgICBwcml2YXRlIGdldERvY3VtZW50RnJhZ21lbnRCeUlkKHBsdWdpbklkOiBzdHJpbmcsIHRlbXBsYXRlSWQ6IHN0cmluZyk6IERvY3VtZW50RnJhZ21lbnQge1xuICAgICAgICBjb25zdCBwbHVnaW5Eb2N1bWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHBsdWdpbklkKVsnY29udGVudFdpbmRvdyddLmRvY3VtZW50O1xuICAgICAgICBsZXQgdGVtcGxhdGU6IERvY3VtZW50RnJhZ21lbnQgPSBudWxsO1xuICAgICAgICBpZiAocGx1Z2luRG9jdW1lbnQpIHtcbiAgICAgICAgICAgIHRlbXBsYXRlID0gcGx1Z2luRG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGVtcGxhdGVJZCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRlbXBsYXRlO1xuICAgIH1cblxuICAgIHByaXZhdGUgYWRkVGVtcGxhdGVUb0VsZW1lbnQodGVtcGxhdGU6IERvY3VtZW50RnJhZ21lbnQsIGNvbnRlbnRTZWxlY3RvcjogRWxlbWVudCk6IERvY3VtZW50RnJhZ21lbnQge1xuICAgICAgICBsZXQgc2hhZG93Um9vdDogRG9jdW1lbnRGcmFnbWVudCA9IGNvbnRlbnRTZWxlY3Rvci5zaGFkb3dSb290O1xuICAgICAgICBpZiAoY29udGVudFNlbGVjdG9yKSB7XG4gICAgICAgICAgICBpZiAoIXNoYWRvd1Jvb3QpIHtcbiAgICAgICAgICAgICAgICBzaGFkb3dSb290ID0gY29udGVudFNlbGVjdG9yLmF0dGFjaFNoYWRvdyh7bW9kZTogJ29wZW4nfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc2hhZG93Um9vdCAmJiB0ZW1wbGF0ZSkge1xuICAgICAgICAgICAgICAgIHNoYWRvd1Jvb3RbJ2lubmVySFRNTCddID0gJyc7XG4gICAgICAgICAgICAgICAgY29uc3QgaHRtbENvbnRlbnQgPSBkb2N1bWVudC5pbXBvcnROb2RlKHRlbXBsYXRlWydjb250ZW50J10sIHRydWUpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdbYWRkVGVtcGxhdGVdLS1jb250ZW50LS0nLCB0ZW1wbGF0ZVsnY29udGVudCddKTtcbiAgICAgICAgICAgICAgICBzaGFkb3dSb290LmFwcGVuZENoaWxkKGh0bWxDb250ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgIHJldHVybiBzaGFkb3dSb290O1xuICAgIH1cblxuICAgIGFkZFBsdWdpblRvKHBsdWdpbklkOiBzdHJpbmcsIHRlbXBsYXRlSWQ6IHN0cmluZywgZWxlbWVudDogRWxlbWVudCk6IERvY3VtZW50RnJhZ21lbnQge1xuICAgICAgICBjb25zdCB0ZW1wbGF0ZSA9IHRoaXMuZ2V0RG9jdW1lbnRGcmFnbWVudEJ5SWQocGx1Z2luSWQsIHRlbXBsYXRlSWQpO1xuICAgICAgICBpZiAodGVtcGxhdGUgJiYgZWxlbWVudCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYWRkVGVtcGxhdGVUb0VsZW1lbnQodGVtcGxhdGUsIGVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICAqL1xufVxuIl19