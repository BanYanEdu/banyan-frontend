/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { PluginManagerService } from "./plugin-manager.service";
import { CoreService, NotificationService } from "inet-core";
var PluginToolbarDirective = /** @class */ (function () {
    function PluginToolbarDirective(el, renderer, coreService, notifyService, pluginManagerService) {
        this.el = el;
        this.renderer = renderer;
        this.coreService = coreService;
        this.notifyService = notifyService;
        this.pluginManagerService = pluginManagerService;
        this.idProperty = 'toolbar'; // The name of the field, Defaults to 'toolbar'.
        // console.log('[PluginToolbarDirective]constructor');
    }
    /**
     * @return {?}
     */
    PluginToolbarDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // console.log('[PluginToolbarDirective]ngOnInit');
        // subscribe messages
        this.subscription = this.pluginManagerService.getMessage().subscribe((/**
         * @param {?} message
         * @return {?}
         */
        function (message) {
            if (!message) {
                return;
            }
            _this.message = message || {};
            /** @type {?} */
            var data = _this.message['data'] || {};
            // console.log('data', data, this.getIdProperty(), data.hasOwnProperty(this.getIdProperty()));
            if (data.hasOwnProperty(_this.getIdProperty())) {
                /** @type {?} */
                var toolbar_1 = data[_this.getIdProperty()] || [];
                /** @type {?} */
                var pluginId = data['pluginId'];
                // console.log('[PluginToolbarDirective]--pluginId--', pluginId);
                /** @type {?} */
                var container = void 0;
                if (_this.coreService.getEnvironment().production && _this.message.source) { // production
                    if (_this.message.source.frameElement) {
                        pluginId = _this.message.source.frameElement.id;
                        if (pluginId) {
                            container = _this.initContainerById(pluginId);
                            if (window.origin === _this.message.source.origin && _this.pluginManagerService.hasPluginId(pluginId)) {
                                _this.generateToolbar(container, toolbar_1);
                                _this.notificationDetectByData(data);
                            }
                        }
                        else {
                            console.warn("Could not find plugin id");
                        }
                    }
                }
                else { // For testing with localhost
                    if (pluginId && _this.pluginManagerService.hasPluginId(pluginId)) {
                        container = _this.initContainerById(pluginId);
                        _this.generateToolbar(container, toolbar_1);
                    }
                    _this.notificationDetectByData(data);
                }
            }
        }));
    };
    /**
     * @private
     * @param {?=} data
     * @return {?}
     */
    PluginToolbarDirective.prototype.notificationDetectByData = /**
     * @private
     * @param {?=} data
     * @return {?}
     */
    function (data) {
        if (data === void 0) { data = {}; }
        if (data.hasOwnProperty('notify')) {
            var _a = data['notify'], title = _a.title, type = _a.type, msg = _a.msg;
            this.notifyService.showMessage(msg, type, title);
        }
    };
    /**
     * @return {?}
     */
    PluginToolbarDirective.prototype.getIdProperty = /**
     * @return {?}
     */
    function () {
        return this.idProperty;
    };
    /**
     * @return {?}
     */
    PluginToolbarDirective.prototype.clear = /**
     * @return {?}
     */
    function () {
        this.renderer.setProperty(this.el.nativeElement, 'innerHTML', '');
    };
    /**
     * @param {?} pluginId
     * @return {?}
     */
    PluginToolbarDirective.prototype.initContainerById = /**
     * @param {?} pluginId
     * @return {?}
     */
    function (pluginId) {
        /** @type {?} */
        var prefix = "plugin-" + this.getIdProperty() + "-" + pluginId + "-";
        /** @type {?} */
        var containerId = prefix + 'container';
        /** @type {?} */
        var element = document.getElementById(containerId);
        /** @type {?} */
        var exists = false;
        if (element) {
            element.innerHTML = '';
            exists = true;
        }
        else {
            element = this.renderer.createElement('span');
            this.renderer.setProperty(element, 'id', containerId);
            // this.renderer.setProperty(element, 'innerHTML', '');
        }
        return new ToolbarContainer(prefix, pluginId, element, exists);
    };
    /**
     * @param {?} container
     * @param {?=} buttons
     * @return {?}
     */
    PluginToolbarDirective.prototype.generateToolbar = /**
     * @param {?} container
     * @param {?=} buttons
     * @return {?}
     */
    function (container, buttons) {
        var _this = this;
        if (buttons === void 0) { buttons = []; }
        var e_1, _a;
        /** @type {?} */
        var pluginId = container.pluginId;
        /** @type {?} */
        var plugin = this.pluginManagerService.getPluginById(pluginId);
        if (plugin && plugin.resize) {
            plugin.resize();
        }
        var _loop_1 = function (button) {
            var e_2, _a, e_3, _b;
            if (button) {
                /** @type {?} */
                var buttonEl = this_1.renderer.createElement('button');
                /** @type {?} */
                var buttonId_1 = container.prefix + button['id'];
                this_1.renderer.setProperty(buttonEl, 'id', buttonId_1);
                this_1.renderer.addClass(buttonEl, 'btn');
                this_1.renderer.addClass(buttonEl, 'btn-sm');
                this_1.renderer.addClass(buttonEl, 'ml-1');
                /** @type {?} */
                var classes = (button['cls'] || '').split(' ');
                try {
                    for (var classes_1 = tslib_1.__values(classes), classes_1_1 = classes_1.next(); !classes_1_1.done; classes_1_1 = classes_1.next()) {
                        var cls = classes_1_1.value;
                        this_1.renderer.addClass(buttonEl, cls);
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (classes_1_1 && !classes_1_1.done && (_a = classes_1.return)) _a.call(classes_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
                /** @type {?} */
                var iconEl = this_1.renderer.createElement('i');
                /** @type {?} */
                var iconClasses = (button['iconCls'] || '').split(' ');
                try {
                    for (var iconClasses_1 = tslib_1.__values(iconClasses), iconClasses_1_1 = iconClasses_1.next(); !iconClasses_1_1.done; iconClasses_1_1 = iconClasses_1.next()) {
                        var iconCls = iconClasses_1_1.value;
                        this_1.renderer.addClass(iconEl, iconCls);
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (iconClasses_1_1 && !iconClasses_1_1.done && (_b = iconClasses_1.return)) _b.call(iconClasses_1);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
                /** @type {?} */
                var text = this_1.renderer.createText(' ' + button['text'] || '');
                this_1.renderer.listen(buttonEl, 'click', (/**
                 * @param {?} event
                 * @return {?}
                 */
                function (event) {
                    // console.log('[' + pluginId + '] plugin call ' + button['eventName']);
                    _this.pluginManagerService.getContentWindowById(pluginId).then((/**
                     * @param {?} contentWindow
                     * @return {?}
                     */
                    function (contentWindow) {
                        if (contentWindow) {
                            _this.pluginManagerService.sendMessageTo({ id: buttonId_1, pluginId: pluginId, eventName: button['eventName'] }, contentWindow);
                        }
                    }));
                }));
                this_1.renderer.appendChild(buttonEl, iconEl);
                this_1.renderer.appendChild(buttonEl, text);
                this_1.renderer.appendChild(container.element, buttonEl);
            }
        };
        var this_1 = this;
        try {
            for (var buttons_1 = tslib_1.__values(buttons), buttons_1_1 = buttons_1.next(); !buttons_1_1.done; buttons_1_1 = buttons_1.next()) {
                var button = buttons_1_1.value;
                _loop_1(button);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (buttons_1_1 && !buttons_1_1.done && (_a = buttons_1.return)) _a.call(buttons_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        if (!container.exists) {
            this.renderer.appendChild(this.el.nativeElement, container.element);
        }
    };
    /**
     * @return {?}
     */
    PluginToolbarDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.clear();
        // console.log('[PluginToolbarDirective]destroy');
        // unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe();
    };
    PluginToolbarDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[appPluginToolbar]'
                },] }
    ];
    /** @nocollapse */
    PluginToolbarDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: CoreService },
        { type: NotificationService },
        { type: PluginManagerService }
    ]; };
    PluginToolbarDirective.propDecorators = {
        idProperty: [{ type: Input }]
    };
    return PluginToolbarDirective;
}());
export { PluginToolbarDirective };
if (false) {
    /** @type {?} */
    PluginToolbarDirective.prototype.message;
    /** @type {?} */
    PluginToolbarDirective.prototype.subscription;
    /** @type {?} */
    PluginToolbarDirective.prototype.idProperty;
    /**
     * @type {?}
     * @private
     */
    PluginToolbarDirective.prototype.el;
    /**
     * @type {?}
     * @private
     */
    PluginToolbarDirective.prototype.renderer;
    /**
     * @type {?}
     * @private
     */
    PluginToolbarDirective.prototype.coreService;
    /**
     * @type {?}
     * @private
     */
    PluginToolbarDirective.prototype.notifyService;
    /**
     * @type {?}
     * @private
     */
    PluginToolbarDirective.prototype.pluginManagerService;
}
var ToolbarContainer = /** @class */ (function () {
    function ToolbarContainer(prefix, pluginId, element, exists) {
        this.prefix = prefix;
        this.pluginId = pluginId;
        this.element = element;
        this.exists = exists;
    }
    return ToolbarContainer;
}());
export { ToolbarContainer };
if (false) {
    /** @type {?} */
    ToolbarContainer.prototype.pluginId;
    /** @type {?} */
    ToolbarContainer.prototype.element;
    /** @type {?} */
    ToolbarContainer.prototype.prefix;
    /** @type {?} */
    ToolbarContainer.prototype.exists;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGx1Z2luLXRvb2xiYXIuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC11aS8iLCJzb3VyY2VzIjpbInNyYy9wbHVnaW4tbWFuYWdlci9wbHVnaW4tdG9vbGJhci5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQXFCLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6RixPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUU5RCxPQUFPLEVBQUMsV0FBVyxFQUFFLG1CQUFtQixFQUFDLE1BQU0sV0FBVyxDQUFDO0FBRTNEO0lBT0ksZ0NBQ1ksRUFBYyxFQUNkLFFBQW1CLEVBQ25CLFdBQXdCLEVBQ3hCLGFBQWtDLEVBQ2xDLG9CQUEwQztRQUoxQyxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQ2QsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNuQixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixrQkFBYSxHQUFiLGFBQWEsQ0FBcUI7UUFDbEMseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQU43QyxlQUFVLEdBQUcsU0FBUyxDQUFDLENBQUMsZ0RBQWdEO1FBTzdFLHNEQUFzRDtJQUMxRCxDQUFDOzs7O0lBRUQseUNBQVE7OztJQUFSO1FBQUEsaUJBcUNDO1FBcENHLG1EQUFtRDtRQUNuRCxxQkFBcUI7UUFDckIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsVUFBVSxFQUFFLENBQUMsU0FBUzs7OztRQUFDLFVBQUEsT0FBTztZQUN4RSxJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUNWLE9BQU87YUFDVjtZQUNELEtBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxJQUFJLEVBQUUsQ0FBQzs7Z0JBQ3ZCLElBQUksR0FBRyxLQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUU7WUFD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LE9BQVksRUFBRSxNQUFlO1FBQ3ZFLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0lBQ3pCLENBQUM7SUFDTCx1QkFBQztBQUFELENBQUMsQUFaRCxJQVlDOzs7O0lBWEcsb0NBQWlCOztJQUNqQixtQ0FBYTs7SUFDYixrQ0FBZTs7SUFDZixrQ0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0RpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0LCBSZW5kZXJlcjJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtQbHVnaW5NYW5hZ2VyU2VydmljZX0gZnJvbSBcIi4vcGx1Z2luLW1hbmFnZXIuc2VydmljZVwiO1xuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gXCJyeGpzXCI7XG5pbXBvcnQge0NvcmVTZXJ2aWNlLCBOb3RpZmljYXRpb25TZXJ2aWNlfSBmcm9tIFwiaW5ldC1jb3JlXCI7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW2FwcFBsdWdpblRvb2xiYXJdJ1xufSlcbmV4cG9ydCBjbGFzcyBQbHVnaW5Ub29sYmFyRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAgIG1lc3NhZ2U6IGFueTtcbiAgICBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgICBASW5wdXQoKSBpZFByb3BlcnR5ID0gJ3Rvb2xiYXInOyAvLyBUaGUgbmFtZSBvZiB0aGUgZmllbGQsIERlZmF1bHRzIHRvICd0b29sYmFyJy5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBlbDogRWxlbWVudFJlZixcbiAgICAgICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgICAgICBwcml2YXRlIGNvcmVTZXJ2aWNlOiBDb3JlU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBub3RpZnlTZXJ2aWNlOiBOb3RpZmljYXRpb25TZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIHBsdWdpbk1hbmFnZXJTZXJ2aWNlOiBQbHVnaW5NYW5hZ2VyU2VydmljZSkge1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnW1BsdWdpblRvb2xiYXJEaXJlY3RpdmVdY29uc3RydWN0b3InKTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ1tQbHVnaW5Ub29sYmFyRGlyZWN0aXZlXW5nT25Jbml0Jyk7XG4gICAgICAgIC8vIHN1YnNjcmliZSBtZXNzYWdlc1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IHRoaXMucGx1Z2luTWFuYWdlclNlcnZpY2UuZ2V0TWVzc2FnZSgpLnN1YnNjcmliZShtZXNzYWdlID0+IHtcbiAgICAgICAgICAgIGlmICghbWVzc2FnZSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2UgfHwge307XG4gICAgICAgICAgICBjb25zdCBkYXRhID0gdGhpcy5tZXNzYWdlWydkYXRhJ10gfHwge307XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnZGF0YScsIGRhdGEsIHRoaXMuZ2V0SWRQcm9wZXJ0eSgpLCBkYXRhLmhhc093blByb3BlcnR5KHRoaXMuZ2V0SWRQcm9wZXJ0eSgpKSk7XG4gICAgICAgICAgICBpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eSh0aGlzLmdldElkUHJvcGVydHkoKSkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0b29sYmFyID0gZGF0YVt0aGlzLmdldElkUHJvcGVydHkoKV0gfHwgW107XG4gICAgICAgICAgICAgICAgbGV0IHBsdWdpbklkID0gZGF0YVsncGx1Z2luSWQnXTtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnW1BsdWdpblRvb2xiYXJEaXJlY3RpdmVdLS1wbHVnaW5JZC0tJywgcGx1Z2luSWQpO1xuICAgICAgICAgICAgICAgIGxldCBjb250YWluZXI7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY29yZVNlcnZpY2UuZ2V0RW52aXJvbm1lbnQoKS5wcm9kdWN0aW9uICYmIHRoaXMubWVzc2FnZS5zb3VyY2UpIHsgIC8vIHByb2R1Y3Rpb25cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubWVzc2FnZS5zb3VyY2UuZnJhbWVFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwbHVnaW5JZCA9IHRoaXMubWVzc2FnZS5zb3VyY2UuZnJhbWVFbGVtZW50LmlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBsdWdpbklkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyID0gdGhpcy5pbml0Q29udGFpbmVyQnlJZChwbHVnaW5JZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5vcmlnaW4gPT09IHRoaXMubWVzc2FnZS5zb3VyY2Uub3JpZ2luICYmIHRoaXMucGx1Z2luTWFuYWdlclNlcnZpY2UuaGFzUGx1Z2luSWQocGx1Z2luSWQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVUb29sYmFyKGNvbnRhaW5lciwgdG9vbGJhcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uRGV0ZWN0QnlEYXRhKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBDb3VsZCBub3QgZmluZCBwbHVnaW4gaWRgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7IC8vIEZvciB0ZXN0aW5nIHdpdGggbG9jYWxob3N0XG4gICAgICAgICAgICAgICAgICAgIGlmIChwbHVnaW5JZCAmJiB0aGlzLnBsdWdpbk1hbmFnZXJTZXJ2aWNlLmhhc1BsdWdpbklkKHBsdWdpbklkKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyID0gdGhpcy5pbml0Q29udGFpbmVyQnlJZChwbHVnaW5JZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdlbmVyYXRlVG9vbGJhcihjb250YWluZXIsIHRvb2xiYXIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uRGV0ZWN0QnlEYXRhKGRhdGEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBub3RpZmljYXRpb25EZXRlY3RCeURhdGEoZGF0YTogYW55ID0ge30pIHtcbiAgICAgICAgaWYgKGRhdGEuaGFzT3duUHJvcGVydHkoJ25vdGlmeScpKSB7XG4gICAgICAgICAgICBjb25zdCB7dGl0bGUsIHR5cGUsIG1zZ30gPSBkYXRhWydub3RpZnknXTtcbiAgICAgICAgICAgIHRoaXMubm90aWZ5U2VydmljZS5zaG93TWVzc2FnZShtc2csIHR5cGUsIHRpdGxlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldElkUHJvcGVydHkoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaWRQcm9wZXJ0eTtcbiAgICB9XG5cbiAgICBjbGVhcigpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdpbm5lckhUTUwnLCAnJyk7XG4gICAgfVxuXG4gICAgaW5pdENvbnRhaW5lckJ5SWQocGx1Z2luSWQ6IHN0cmluZyk6IFRvb2xiYXJDb250YWluZXIge1xuICAgICAgICBjb25zdCBwcmVmaXggPSBgcGx1Z2luLSR7dGhpcy5nZXRJZFByb3BlcnR5KCl9LSR7cGx1Z2luSWR9LWA7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lcklkID0gcHJlZml4ICsgJ2NvbnRhaW5lcic7XG4gICAgICAgIGxldCBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY29udGFpbmVySWQpO1xuICAgICAgICBsZXQgZXhpc3RzID0gZmFsc2U7XG4gICAgICAgIGlmIChlbGVtZW50KSB7XG4gICAgICAgICAgICBlbGVtZW50LmlubmVySFRNTCA9ICcnO1xuICAgICAgICAgICAgZXhpc3RzID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVsZW1lbnQgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkoZWxlbWVudCwgJ2lkJywgY29udGFpbmVySWQpO1xuICAgICAgICAgICAgLy8gdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eShlbGVtZW50LCAnaW5uZXJIVE1MJywgJycpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgVG9vbGJhckNvbnRhaW5lcihwcmVmaXgsIHBsdWdpbklkLCBlbGVtZW50LCBleGlzdHMpO1xuICAgIH1cblxuICAgIGdlbmVyYXRlVG9vbGJhcihjb250YWluZXI6IFRvb2xiYXJDb250YWluZXIsIGJ1dHRvbnM6IGFueVtdID0gW10pIHtcbiAgICAgICAgY29uc3QgcGx1Z2luSWQgPSBjb250YWluZXIucGx1Z2luSWQ7XG4gICAgICAgIGNvbnN0IHBsdWdpbiA9IHRoaXMucGx1Z2luTWFuYWdlclNlcnZpY2UuZ2V0UGx1Z2luQnlJZChwbHVnaW5JZCk7XG4gICAgICAgIGlmIChwbHVnaW4gJiYgcGx1Z2luLnJlc2l6ZSkge1xuICAgICAgICAgICAgcGx1Z2luLnJlc2l6ZSgpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgYnV0dG9uIG9mIGJ1dHRvbnMpIHtcbiAgICAgICAgICAgIGlmIChidXR0b24pIHtcbiAgICAgICAgICAgICAgICBjb25zdCBidXR0b25FbCA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgICAgICAgICAgY29uc3QgYnV0dG9uSWQgPSBjb250YWluZXIucHJlZml4ICsgYnV0dG9uWydpZCddO1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkoYnV0dG9uRWwsICdpZCcsIGJ1dHRvbklkKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGJ1dHRvbkVsLCAnYnRuJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhidXR0b25FbCwgJ2J0bi1zbScpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoYnV0dG9uRWwsICdtbC0xJyk7XG4gICAgICAgICAgICAgICAgY29uc3QgY2xhc3NlcyA9IChidXR0b25bJ2NscyddIHx8ICcnKS5zcGxpdCgnICcpO1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgY2xzIG9mIGNsYXNzZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhidXR0b25FbCwgY2xzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgaWNvbkVsID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdpJyk7XG4gICAgICAgICAgICAgICAgY29uc3QgaWNvbkNsYXNzZXMgPSAoYnV0dG9uWydpY29uQ2xzJ10gfHwgJycpLnNwbGl0KCcgJyk7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBpY29uQ2xzIG9mIGljb25DbGFzc2VzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoaWNvbkVsLCBpY29uQ2xzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgdGV4dCA9IHRoaXMucmVuZGVyZXIuY3JlYXRlVGV4dCgnICcgKyBidXR0b25bJ3RleHQnXSB8fCAnJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5saXN0ZW4oYnV0dG9uRWwsICdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnWycgKyBwbHVnaW5JZCArICddIHBsdWdpbiBjYWxsICcgKyBidXR0b25bJ2V2ZW50TmFtZSddKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW5NYW5hZ2VyU2VydmljZS5nZXRDb250ZW50V2luZG93QnlJZChwbHVnaW5JZCkudGhlbihjb250ZW50V2luZG93ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb250ZW50V2luZG93KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW5NYW5hZ2VyU2VydmljZS5zZW5kTWVzc2FnZVRvKHtpZDogYnV0dG9uSWQsIHBsdWdpbklkOiBwbHVnaW5JZCwgZXZlbnROYW1lOiBidXR0b25bJ2V2ZW50TmFtZSddfSwgY29udGVudFdpbmRvdyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQoYnV0dG9uRWwsIGljb25FbCk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChidXR0b25FbCwgdGV4dCk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChjb250YWluZXIuZWxlbWVudCwgYnV0dG9uRWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghY29udGFpbmVyLmV4aXN0cykge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZCh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsIGNvbnRhaW5lci5lbGVtZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdbUGx1Z2luVG9vbGJhckRpcmVjdGl2ZV1kZXN0cm95Jyk7XG4gICAgICAgIC8vIHVuc3Vic2NyaWJlIHRvIGVuc3VyZSBubyBtZW1vcnkgbGVha3NcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGNsYXNzIFRvb2xiYXJDb250YWluZXIge1xuICAgIHBsdWdpbklkOiBzdHJpbmc7XG4gICAgZWxlbWVudDogYW55O1xuICAgIHByZWZpeDogc3RyaW5nO1xuICAgIGV4aXN0czogYm9vbGVhbjtcblxuICAgIGNvbnN0cnVjdG9yKHByZWZpeDogc3RyaW5nLCBwbHVnaW5JZDogc3RyaW5nLCBlbGVtZW50OiBhbnksIGV4aXN0czogYm9vbGVhbikge1xuICAgICAgICB0aGlzLnByZWZpeCA9IHByZWZpeDtcbiAgICAgICAgdGhpcy5wbHVnaW5JZCA9IHBsdWdpbklkO1xuICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICB0aGlzLmV4aXN0cyA9IGV4aXN0cztcbiAgICB9XG59XG4iXX0=