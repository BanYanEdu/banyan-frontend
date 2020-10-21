/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { PluginManagerService } from "./plugin-manager.service";
import { CoreService, NotificationService } from "inet-core";
export class PluginToolbarDirective {
    // The name of the field, Defaults to 'toolbar'.
    /**
     * @param {?} el
     * @param {?} renderer
     * @param {?} coreService
     * @param {?} notifyService
     * @param {?} pluginManagerService
     */
    constructor(el, renderer, coreService, notifyService, pluginManagerService) {
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
    ngOnInit() {
        // console.log('[PluginToolbarDirective]ngOnInit');
        // subscribe messages
        this.subscription = this.pluginManagerService.getMessage().subscribe((/**
         * @param {?} message
         * @return {?}
         */
        message => {
            if (!message) {
                return;
            }
            this.message = message || {};
            /** @type {?} */
            const data = this.message['data'] || {};
            // console.log('data', data, this.getIdProperty(), data.hasOwnProperty(this.getIdProperty()));
            if (data.hasOwnProperty(this.getIdProperty())) {
                /** @type {?} */
                const toolbar = data[this.getIdProperty()] || [];
                /** @type {?} */
                let pluginId = data['pluginId'];
                // console.log('[PluginToolbarDirective]--pluginId--', pluginId);
                /** @type {?} */
                let container;
                if (this.coreService.getEnvironment().production && this.message.source) { // production
                    if (this.message.source.frameElement) {
                        pluginId = this.message.source.frameElement.id;
                        if (pluginId) {
                            container = this.initContainerById(pluginId);
                            if (window.origin === this.message.source.origin && this.pluginManagerService.hasPluginId(pluginId)) {
                                this.generateToolbar(container, toolbar);
                                this.notificationDetectByData(data);
                            }
                        }
                        else {
                            console.warn(`Could not find plugin id`);
                        }
                    }
                }
                else { // For testing with localhost
                    if (pluginId && this.pluginManagerService.hasPluginId(pluginId)) {
                        container = this.initContainerById(pluginId);
                        this.generateToolbar(container, toolbar);
                    }
                    this.notificationDetectByData(data);
                }
            }
        }));
    }
    /**
     * @private
     * @param {?=} data
     * @return {?}
     */
    notificationDetectByData(data = {}) {
        if (data.hasOwnProperty('notify')) {
            const { title, type, msg } = data['notify'];
            this.notifyService.showMessage(msg, type, title);
        }
    }
    /**
     * @return {?}
     */
    getIdProperty() {
        return this.idProperty;
    }
    /**
     * @return {?}
     */
    clear() {
        this.renderer.setProperty(this.el.nativeElement, 'innerHTML', '');
    }
    /**
     * @param {?} pluginId
     * @return {?}
     */
    initContainerById(pluginId) {
        /** @type {?} */
        const prefix = `plugin-${this.getIdProperty()}-${pluginId}-`;
        /** @type {?} */
        const containerId = prefix + 'container';
        /** @type {?} */
        let element = document.getElementById(containerId);
        /** @type {?} */
        let exists = false;
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
    }
    /**
     * @param {?} container
     * @param {?=} buttons
     * @return {?}
     */
    generateToolbar(container, buttons = []) {
        /** @type {?} */
        const pluginId = container.pluginId;
        /** @type {?} */
        const plugin = this.pluginManagerService.getPluginById(pluginId);
        if (plugin && plugin.resize) {
            plugin.resize();
        }
        for (const button of buttons) {
            if (button) {
                /** @type {?} */
                const buttonEl = this.renderer.createElement('button');
                /** @type {?} */
                const buttonId = container.prefix + button['id'];
                this.renderer.setProperty(buttonEl, 'id', buttonId);
                this.renderer.addClass(buttonEl, 'btn');
                this.renderer.addClass(buttonEl, 'btn-sm');
                this.renderer.addClass(buttonEl, 'ml-1');
                /** @type {?} */
                const classes = (button['cls'] || '').split(' ');
                for (const cls of classes) {
                    this.renderer.addClass(buttonEl, cls);
                }
                /** @type {?} */
                const iconEl = this.renderer.createElement('i');
                /** @type {?} */
                const iconClasses = (button['iconCls'] || '').split(' ');
                for (const iconCls of iconClasses) {
                    this.renderer.addClass(iconEl, iconCls);
                }
                /** @type {?} */
                const text = this.renderer.createText(' ' + button['text'] || '');
                this.renderer.listen(buttonEl, 'click', (/**
                 * @param {?} event
                 * @return {?}
                 */
                (event) => {
                    // console.log('[' + pluginId + '] plugin call ' + button['eventName']);
                    this.pluginManagerService.getContentWindowById(pluginId).then((/**
                     * @param {?} contentWindow
                     * @return {?}
                     */
                    contentWindow => {
                        if (contentWindow) {
                            this.pluginManagerService.sendMessageTo({ id: buttonId, pluginId: pluginId, eventName: button['eventName'] }, contentWindow);
                        }
                    }));
                }));
                this.renderer.appendChild(buttonEl, iconEl);
                this.renderer.appendChild(buttonEl, text);
                this.renderer.appendChild(container.element, buttonEl);
            }
        }
        if (!container.exists) {
            this.renderer.appendChild(this.el.nativeElement, container.element);
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.clear();
        // console.log('[PluginToolbarDirective]destroy');
        // unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe();
    }
}
PluginToolbarDirective.decorators = [
    { type: Directive, args: [{
                selector: '[appPluginToolbar]'
            },] }
];
/** @nocollapse */
PluginToolbarDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: CoreService },
    { type: NotificationService },
    { type: PluginManagerService }
];
PluginToolbarDirective.propDecorators = {
    idProperty: [{ type: Input }]
};
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
export class ToolbarContainer {
    /**
     * @param {?} prefix
     * @param {?} pluginId
     * @param {?} element
     * @param {?} exists
     */
    constructor(prefix, pluginId, element, exists) {
        this.prefix = prefix;
        this.pluginId = pluginId;
        this.element = element;
        this.exists = exists;
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGx1Z2luLXRvb2xiYXIuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC11aS8iLCJzb3VyY2VzIjpbInNyYy9wbHVnaW4tbWFuYWdlci9wbHVnaW4tdG9vbGJhci5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBcUIsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pGLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBRTlELE9BQU8sRUFBQyxXQUFXLEVBQUUsbUJBQW1CLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFLM0QsTUFBTSxPQUFPLHNCQUFzQjs7Ozs7Ozs7O0lBSS9CLFlBQ1ksRUFBYyxFQUNkLFFBQW1CLEVBQ25CLFdBQXdCLEVBQ3hCLGFBQWtDLEVBQ2xDLG9CQUEwQztRQUoxQyxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQ2QsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNuQixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixrQkFBYSxHQUFiLGFBQWEsQ0FBcUI7UUFDbEMseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQU43QyxlQUFVLEdBQUcsU0FBUyxDQUFDLENBQUMsZ0RBQWdEO1FBTzdFLHNEQUFzRDtJQUMxRCxDQUFDOzs7O0lBRUQsUUFBUTtRQUNKLG1EQUFtRDtRQUNuRCxxQkFBcUI7UUFDckIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsVUFBVSxFQUFFLENBQUMsU0FBUzs7OztRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQzNFLElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQ1YsT0FBTzthQUNWO1lBQ0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLElBQUksRUFBRSxDQUFDOztrQkFDdkIsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUks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O0lBQ2pCLG1DQUFhOztJQUNiLGtDQUFlOztJQUNmLGtDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQsIFJlbmRlcmVyMn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1BsdWdpbk1hbmFnZXJTZXJ2aWNlfSBmcm9tIFwiLi9wbHVnaW4tbWFuYWdlci5zZXJ2aWNlXCI7XG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSBcInJ4anNcIjtcbmltcG9ydCB7Q29yZVNlcnZpY2UsIE5vdGlmaWNhdGlvblNlcnZpY2V9IGZyb20gXCJpbmV0LWNvcmVcIjtcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbYXBwUGx1Z2luVG9vbGJhcl0nXG59KVxuZXhwb3J0IGNsYXNzIFBsdWdpblRvb2xiYXJEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gICAgbWVzc2FnZTogYW55O1xuICAgIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICAgIEBJbnB1dCgpIGlkUHJvcGVydHkgPSAndG9vbGJhcic7IC8vIFRoZSBuYW1lIG9mIHRoZSBmaWVsZCwgRGVmYXVsdHMgdG8gJ3Rvb2xiYXInLlxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGVsOiBFbGVtZW50UmVmLFxuICAgICAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgICAgIHByaXZhdGUgY29yZVNlcnZpY2U6IENvcmVTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIG5vdGlmeVNlcnZpY2U6IE5vdGlmaWNhdGlvblNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgcGx1Z2luTWFuYWdlclNlcnZpY2U6IFBsdWdpbk1hbmFnZXJTZXJ2aWNlKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdbUGx1Z2luVG9vbGJhckRpcmVjdGl2ZV1jb25zdHJ1Y3RvcicpO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnW1BsdWdpblRvb2xiYXJEaXJlY3RpdmVdbmdPbkluaXQnKTtcbiAgICAgICAgLy8gc3Vic2NyaWJlIG1lc3NhZ2VzXG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gdGhpcy5wbHVnaW5NYW5hZ2VyU2VydmljZS5nZXRNZXNzYWdlKCkuc3Vic2NyaWJlKG1lc3NhZ2UgPT4ge1xuICAgICAgICAgICAgaWYgKCFtZXNzYWdlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZSB8fCB7fTtcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLm1lc3NhZ2VbJ2RhdGEnXSB8fCB7fTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdkYXRhJywgZGF0YSwgdGhpcy5nZXRJZFByb3BlcnR5KCksIGRhdGEuaGFzT3duUHJvcGVydHkodGhpcy5nZXRJZFByb3BlcnR5KCkpKTtcbiAgICAgICAgICAgIGlmIChkYXRhLmhhc093blByb3BlcnR5KHRoaXMuZ2V0SWRQcm9wZXJ0eSgpKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRvb2xiYXIgPSBkYXRhW3RoaXMuZ2V0SWRQcm9wZXJ0eSgpXSB8fCBbXTtcbiAgICAgICAgICAgICAgICBsZXQgcGx1Z2luSWQgPSBkYXRhWydwbHVnaW5JZCddO1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdbUGx1Z2luVG9vbGJhckRpcmVjdGl2ZV0tLXBsdWdpbklkLS0nLCBwbHVnaW5JZCk7XG4gICAgICAgICAgICAgICAgbGV0IGNvbnRhaW5lcjtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jb3JlU2VydmljZS5nZXRFbnZpcm9ubWVudCgpLnByb2R1Y3Rpb24gJiYgdGhpcy5tZXNzYWdlLnNvdXJjZSkgeyAgLy8gcHJvZHVjdGlvblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5tZXNzYWdlLnNvdXJjZS5mcmFtZUVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsdWdpbklkID0gdGhpcy5tZXNzYWdlLnNvdXJjZS5mcmFtZUVsZW1lbnQuaWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocGx1Z2luSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIgPSB0aGlzLmluaXRDb250YWluZXJCeUlkKHBsdWdpbklkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAod2luZG93Lm9yaWdpbiA9PT0gdGhpcy5tZXNzYWdlLnNvdXJjZS5vcmlnaW4gJiYgdGhpcy5wbHVnaW5NYW5hZ2VyU2VydmljZS5oYXNQbHVnaW5JZChwbHVnaW5JZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZW5lcmF0ZVRvb2xiYXIoY29udGFpbmVyLCB0b29sYmFyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25EZXRlY3RCeURhdGEoZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYENvdWxkIG5vdCBmaW5kIHBsdWdpbiBpZGApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHsgLy8gRm9yIHRlc3Rpbmcgd2l0aCBsb2NhbGhvc3RcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBsdWdpbklkICYmIHRoaXMucGx1Z2luTWFuYWdlclNlcnZpY2UuaGFzUGx1Z2luSWQocGx1Z2luSWQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIgPSB0aGlzLmluaXRDb250YWluZXJCeUlkKHBsdWdpbklkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVUb29sYmFyKGNvbnRhaW5lciwgdG9vbGJhcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25EZXRlY3RCeURhdGEoZGF0YSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG5vdGlmaWNhdGlvbkRldGVjdEJ5RGF0YShkYXRhOiBhbnkgPSB7fSkge1xuICAgICAgICBpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eSgnbm90aWZ5JykpIHtcbiAgICAgICAgICAgIGNvbnN0IHt0aXRsZSwgdHlwZSwgbXNnfSA9IGRhdGFbJ25vdGlmeSddO1xuICAgICAgICAgICAgdGhpcy5ub3RpZnlTZXJ2aWNlLnNob3dNZXNzYWdlKG1zZywgdHlwZSwgdGl0bGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0SWRQcm9wZXJ0eSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5pZFByb3BlcnR5O1xuICAgIH1cblxuICAgIGNsZWFyKCkge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ2lubmVySFRNTCcsICcnKTtcbiAgICB9XG5cbiAgICBpbml0Q29udGFpbmVyQnlJZChwbHVnaW5JZDogc3RyaW5nKTogVG9vbGJhckNvbnRhaW5lciB7XG4gICAgICAgIGNvbnN0IHByZWZpeCA9IGBwbHVnaW4tJHt0aGlzLmdldElkUHJvcGVydHkoKX0tJHtwbHVnaW5JZH0tYDtcbiAgICAgICAgY29uc3QgY29udGFpbmVySWQgPSBwcmVmaXggKyAnY29udGFpbmVyJztcbiAgICAgICAgbGV0IGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjb250YWluZXJJZCk7XG4gICAgICAgIGxldCBleGlzdHMgPSBmYWxzZTtcbiAgICAgICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgICAgICBleGlzdHMgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZWxlbWVudCA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eShlbGVtZW50LCAnaWQnLCBjb250YWluZXJJZCk7XG4gICAgICAgICAgICAvLyB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KGVsZW1lbnQsICdpbm5lckhUTUwnLCAnJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBUb29sYmFyQ29udGFpbmVyKHByZWZpeCwgcGx1Z2luSWQsIGVsZW1lbnQsIGV4aXN0cyk7XG4gICAgfVxuXG4gICAgZ2VuZXJhdGVUb29sYmFyKGNvbnRhaW5lcjogVG9vbGJhckNvbnRhaW5lciwgYnV0dG9uczogYW55W10gPSBbXSkge1xuICAgICAgICBjb25zdCBwbHVnaW5JZCA9IGNvbnRhaW5lci5wbHVnaW5JZDtcbiAgICAgICAgY29uc3QgcGx1Z2luID0gdGhpcy5wbHVnaW5NYW5hZ2VyU2VydmljZS5nZXRQbHVnaW5CeUlkKHBsdWdpbklkKTtcbiAgICAgICAgaWYgKHBsdWdpbiAmJiBwbHVnaW4ucmVzaXplKSB7XG4gICAgICAgICAgICBwbHVnaW4ucmVzaXplKCk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBidXR0b24gb2YgYnV0dG9ucykge1xuICAgICAgICAgICAgaWYgKGJ1dHRvbikge1xuICAgICAgICAgICAgICAgIGNvbnN0IGJ1dHRvbkVsID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgICAgICAgICBjb25zdCBidXR0b25JZCA9IGNvbnRhaW5lci5wcmVmaXggKyBidXR0b25bJ2lkJ107XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eShidXR0b25FbCwgJ2lkJywgYnV0dG9uSWQpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoYnV0dG9uRWwsICdidG4nKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGJ1dHRvbkVsLCAnYnRuLXNtJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhidXR0b25FbCwgJ21sLTEnKTtcbiAgICAgICAgICAgICAgICBjb25zdCBjbGFzc2VzID0gKGJ1dHRvblsnY2xzJ10gfHwgJycpLnNwbGl0KCcgJyk7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBjbHMgb2YgY2xhc3Nlcykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGJ1dHRvbkVsLCBjbHMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBpY29uRWwgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ2knKTtcbiAgICAgICAgICAgICAgICBjb25zdCBpY29uQ2xhc3NlcyA9IChidXR0b25bJ2ljb25DbHMnXSB8fCAnJykuc3BsaXQoJyAnKTtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGljb25DbHMgb2YgaWNvbkNsYXNzZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhpY29uRWwsIGljb25DbHMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCB0ZXh0ID0gdGhpcy5yZW5kZXJlci5jcmVhdGVUZXh0KCcgJyArIGJ1dHRvblsndGV4dCddIHx8ICcnKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyLmxpc3RlbihidXR0b25FbCwgJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdbJyArIHBsdWdpbklkICsgJ10gcGx1Z2luIGNhbGwgJyArIGJ1dHRvblsnZXZlbnROYW1lJ10pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbk1hbmFnZXJTZXJ2aWNlLmdldENvbnRlbnRXaW5kb3dCeUlkKHBsdWdpbklkKS50aGVuKGNvbnRlbnRXaW5kb3cgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRlbnRXaW5kb3cpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbk1hbmFnZXJTZXJ2aWNlLnNlbmRNZXNzYWdlVG8oe2lkOiBidXR0b25JZCwgcGx1Z2luSWQ6IHBsdWdpbklkLCBldmVudE5hbWU6IGJ1dHRvblsnZXZlbnROYW1lJ119LCBjb250ZW50V2luZG93KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChidXR0b25FbCwgaWNvbkVsKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKGJ1dHRvbkVsLCB0ZXh0KTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKGNvbnRhaW5lci5lbGVtZW50LCBidXR0b25FbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFjb250YWluZXIuZXhpc3RzKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgY29udGFpbmVyLmVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ1tQbHVnaW5Ub29sYmFyRGlyZWN0aXZlXWRlc3Ryb3knKTtcbiAgICAgICAgLy8gdW5zdWJzY3JpYmUgdG8gZW5zdXJlIG5vIG1lbW9yeSBsZWFrc1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cblxufVxuXG5leHBvcnQgY2xhc3MgVG9vbGJhckNvbnRhaW5lciB7XG4gICAgcGx1Z2luSWQ6IHN0cmluZztcbiAgICBlbGVtZW50OiBhbnk7XG4gICAgcHJlZml4OiBzdHJpbmc7XG4gICAgZXhpc3RzOiBib29sZWFuO1xuXG4gICAgY29uc3RydWN0b3IocHJlZml4OiBzdHJpbmcsIHBsdWdpbklkOiBzdHJpbmcsIGVsZW1lbnQ6IGFueSwgZXhpc3RzOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMucHJlZml4ID0gcHJlZml4O1xuICAgICAgICB0aGlzLnBsdWdpbklkID0gcGx1Z2luSWQ7XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgIHRoaXMuZXhpc3RzID0gZXhpc3RzO1xuICAgIH1cbn1cbiJdfQ==