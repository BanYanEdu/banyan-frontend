/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PluginManagerService } from "./plugin-manager.service";
import { CoreService } from "inet-core";
export class CloudPluginComponent {
    /**
     * @param {?} coreService
     * @param {?} pluginManagerService
     */
    constructor(coreService, pluginManagerService) {
        this.coreService = coreService;
        this.pluginManagerService = pluginManagerService;
        this.params = {};
        this.autoHeight = false;
        this.load = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.pluginManagerService.register(this.pluginId, this);
        if (!iNet.isEmptyObject(this.params)) {
            // const __params = this.pluginManagerService.convertToHttpParams(this.params).toString();
            /** @type {?} */
            const __params = this.pluginManagerService.convertToHttpParams({
                application: this.params['application'],
                secrd: this.params['queryStr']
            }).toString();
            this.url = iNet.urlAppend(this.url, __params);
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.pluginManagerService.destroyById(this.pluginId);
        // console.log('[CloudPluginComponent]--ngOnDestroy--', this.pluginId);
    }
    /**
     * @private
     * @return {?}
     */
    getContentWindow() {
        return this.pluginManagerService.getContentWindowById(this.pluginId);
    }
    /**
     * @return {?}
     */
    reload() {
        this.getContentWindow().then((/**
         * @param {?} contentWindow
         * @return {?}
         */
        contentWindow => {
            if (contentWindow && this.coreService.getEnvironment().production) {
                contentWindow['location'].reload(true);
            }
        }));
    }
    /**
     * @return {?}
     */
    resize() {
        // console.log('[resize]');
        if (this.autoHeight && this.coreService.getEnvironment().production) {
            this.getContentWindow().then((/**
             * @param {?} contentWindow
             * @return {?}
             */
            contentWindow => {
                if (contentWindow) {
                    /** @type {?} */
                    const height = contentWindow['document']['body']['offsetHeight'] || contentWindow['document']['body']['scrollHeight'];
                    if (height) {
                        document.getElementById(this.pluginId).style.height = `${height}px`;
                    }
                }
            }));
        }
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onLoad($event) {
        if (document.getElementById(this.pluginId)) {
            this.getContentWindow().then((/**
             * @param {?} contentWindow
             * @return {?}
             */
            contentWindow => {
                if (contentWindow) {
                    this.resize();
                    // The plugin has finished loading
                    // console.log('[onLoad]--pluginId', this.pluginId, contentWindow);
                    // this.pluginManagerService.sendMessageTo({pluginId: this.pluginId, eventName: 'loaded'}, contentWindow);
                    setTimeout((/**
                     * @return {?}
                     */
                    () => {
                        this.pluginManagerService.sendMessageTo({ pluginId: this.pluginId, eventName: 'loaded' }, contentWindow);
                    }), 100);
                }
            }));
        }
    }
}
CloudPluginComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-cloud-plugin',
                template: `<iframe *ngIf="pluginId && url" id="{{pluginId}}" [src]="url | safe" (load)="onLoad($event)"></iframe>`,
                styles: [`
        iframe {
            width: 100%;
            height: 100%;
            border: none;
        }
    `]
            }] }
];
/** @nocollapse */
CloudPluginComponent.ctorParameters = () => [
    { type: CoreService },
    { type: PluginManagerService }
];
CloudPluginComponent.propDecorators = {
    pluginId: [{ type: Input }],
    url: [{ type: Input }],
    params: [{ type: Input }],
    autoHeight: [{ type: Input }],
    load: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    CloudPluginComponent.prototype.pluginId;
    /** @type {?} */
    CloudPluginComponent.prototype.url;
    /** @type {?} */
    CloudPluginComponent.prototype.params;
    /** @type {?} */
    CloudPluginComponent.prototype.autoHeight;
    /** @type {?} */
    CloudPluginComponent.prototype.load;
    /**
     * @type {?}
     * @private
     */
    CloudPluginComponent.prototype.coreService;
    /**
     * @type {?}
     * @private
     */
    CloudPluginComponent.prototype.pluginManagerService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvdWQtcGx1Z2luLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtdWkvIiwic291cmNlcyI6WyJzcmMvcGx1Z2luLW1hbmFnZXIvY2xvdWQtcGx1Z2luLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLFlBQVksRUFBWSxNQUFNLGVBQWUsQ0FBQztBQUN4RixPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUM5RCxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sV0FBVyxDQUFDO0FBY3RDLE1BQU0sT0FBTyxvQkFBb0I7Ozs7O0lBTTdCLFlBQXFCLFdBQXdCLEVBQ3hCLG9CQUEwQztRQUQxQyxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4Qix5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1FBSnRELFdBQU0sR0FBUSxFQUFFLENBQUM7UUFDakIsZUFBVSxHQUFHLEtBQUssQ0FBQztRQUNsQixTQUFJLEdBQUcsSUFBSSxZQUFZLEVBQVEsQ0FBQztJQUcxQyxDQUFDOzs7O0lBQ0QsUUFBUTtRQUNKLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN4RCxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUU7OztrQkFFNUIsUUFBUSxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxtQkFBbUIsQ0FBQztnQkFDM0QsV0FBVyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDO2dCQUN2QyxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUM7YUFDakMsQ0FBQyxDQUFDLFFBQVEsRUFBRTtZQUNiLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFHLFFBQVEsQ0FBQyxDQUFDO1NBQ2xEO0lBQ0wsQ0FBQzs7OztJQUVELFdBQVc7UUFDUCxJQUFJLENBQUMsb0JBQW9CLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNyRCx1RUFBdUU7SUFDM0UsQ0FBQzs7Ozs7SUFFTyxnQkFBZ0I7UUFDcEIsT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3pFLENBQUM7Ozs7SUFFRCxNQUFNO1FBQ0YsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUMsSUFBSTs7OztRQUFDLGFBQWEsQ0FBQyxFQUFFO1lBQ3pDLElBQUksYUFBYSxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxFQUFFLENBQUMsVUFBVSxFQUFFO2dCQUMvRCxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQzFDO1FBQ0wsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7O0lBRUQsTUFBTTtRQUNGLDJCQUEyQjtRQUMzQixJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxVQUFVLEVBQUU7WUFDakUsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUMsSUFBSTs7OztZQUFDLGFBQWEsQ0FBQyxFQUFFO2dCQUN6QyxJQUFJLGFBQWEsRUFBRTs7MEJBQ1QsTUFBTSxHQUFHLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxjQUFjLENBQUMsSUFBSSxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsY0FBYyxDQUFDO29CQUNySCxJQUFJLE1BQU0sRUFBRTt3QkFDUixRQUFRLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEdBQUcsTUFBTSxJQUFJLENBQUM7cUJBQ3ZFO2lCQUNKO1lBQ0wsQ0FBQyxFQUFDLENBQUM7U0FDTjtJQUNMLENBQUM7Ozs7O0lBRUQsTUFBTSxDQUFDLE1BQU07UUFDVCxJQUFJLFFBQVEsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ3hDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLElBQUk7Ozs7WUFBQyxhQUFhLENBQUMsRUFBRTtnQkFDekMsSUFBSSxhQUFhLEVBQUU7b0JBQ2YsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO29CQUNkLGtDQUFrQztvQkFDbEMsbUVBQW1FO29CQUNuRSwwR0FBMEc7b0JBRTFHLFVBQVU7OztvQkFBQyxHQUFHLEVBQUU7d0JBQ1osSUFBSSxDQUFDLG9CQUFvQixDQUFDLGFBQWEsQ0FBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUMsRUFBRSxhQUFhLENBQUMsQ0FBQztvQkFDM0csQ0FBQyxHQUFFLEdBQUcsQ0FBQyxDQUFDO2lCQUNYO1lBQ0wsQ0FBQyxFQUFDLENBQUM7U0FDTjtJQUNMLENBQUM7OztZQTlFSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGtCQUFrQjtnQkFRNUIsUUFBUSxFQUFFLHdHQUF3Rzt5QkFQekc7Ozs7OztLQU1SO2FBRUo7Ozs7WUFiTyxXQUFXO1lBRFgsb0JBQW9COzs7dUJBZ0J2QixLQUFLO2tCQUNMLEtBQUs7cUJBQ0wsS0FBSzt5QkFDTCxLQUFLO21CQUNMLE1BQU07Ozs7SUFKUCx3Q0FBMEI7O0lBQzFCLG1DQUFxQjs7SUFDckIsc0NBQTBCOztJQUMxQiwwQ0FBNEI7O0lBQzVCLG9DQUEwQzs7Ozs7SUFDN0IsMkNBQWdDOzs7OztJQUNoQyxvREFBa0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIE9uRGVzdHJveX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1BsdWdpbk1hbmFnZXJTZXJ2aWNlfSBmcm9tIFwiLi9wbHVnaW4tbWFuYWdlci5zZXJ2aWNlXCI7XG5pbXBvcnQge0NvcmVTZXJ2aWNlfSBmcm9tIFwiaW5ldC1jb3JlXCI7XG5kZWNsYXJlIGxldCBpTmV0OiBhbnk7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXBwLWNsb3VkLXBsdWdpbicsXG4gICAgc3R5bGVzOiBbYFxuICAgICAgICBpZnJhbWUge1xuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgICAgICBib3JkZXI6IG5vbmU7XG4gICAgICAgIH1cbiAgICBgXSxcbiAgICB0ZW1wbGF0ZTogYDxpZnJhbWUgKm5nSWY9XCJwbHVnaW5JZCAmJiB1cmxcIiBpZD1cInt7cGx1Z2luSWR9fVwiIFtzcmNdPVwidXJsIHwgc2FmZVwiIChsb2FkKT1cIm9uTG9hZCgkZXZlbnQpXCI+PC9pZnJhbWU+YFxufSlcbmV4cG9ydCBjbGFzcyBDbG91ZFBsdWdpbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgICBASW5wdXQoKSBwbHVnaW5JZDogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHVybDogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHBhcmFtczogYW55ID0ge307XG4gICAgQElucHV0KCkgYXV0b0hlaWdodCA9IGZhbHNlO1xuICAgIEBPdXRwdXQoKSBsb2FkID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICAgIGNvbnN0cnVjdG9yKCBwcml2YXRlIGNvcmVTZXJ2aWNlOiBDb3JlU2VydmljZSxcbiAgICAgICAgICAgICAgICAgcHJpdmF0ZSBwbHVnaW5NYW5hZ2VyU2VydmljZTogUGx1Z2luTWFuYWdlclNlcnZpY2UpIHtcbiAgICB9XG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMucGx1Z2luTWFuYWdlclNlcnZpY2UucmVnaXN0ZXIodGhpcy5wbHVnaW5JZCwgdGhpcyk7XG4gICAgICAgIGlmICghaU5ldC5pc0VtcHR5T2JqZWN0KHRoaXMucGFyYW1zKSkge1xuICAgICAgICAgICAgLy8gY29uc3QgX19wYXJhbXMgPSB0aGlzLnBsdWdpbk1hbmFnZXJTZXJ2aWNlLmNvbnZlcnRUb0h0dHBQYXJhbXModGhpcy5wYXJhbXMpLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICBjb25zdCBfX3BhcmFtcyA9IHRoaXMucGx1Z2luTWFuYWdlclNlcnZpY2UuY29udmVydFRvSHR0cFBhcmFtcyh7XG4gICAgICAgICAgICAgICAgYXBwbGljYXRpb246IHRoaXMucGFyYW1zWydhcHBsaWNhdGlvbiddLFxuICAgICAgICAgICAgICAgIHNlY3JkOiB0aGlzLnBhcmFtc1sncXVlcnlTdHInXVxuICAgICAgICAgICAgfSkudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIHRoaXMudXJsID0gaU5ldC51cmxBcHBlbmQodGhpcy51cmwgLCBfX3BhcmFtcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5wbHVnaW5NYW5hZ2VyU2VydmljZS5kZXN0cm95QnlJZCh0aGlzLnBsdWdpbklkKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ1tDbG91ZFBsdWdpbkNvbXBvbmVudF0tLW5nT25EZXN0cm95LS0nLCB0aGlzLnBsdWdpbklkKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldENvbnRlbnRXaW5kb3coKTogUHJvbWlzZTxXaW5kb3cgfCBEb2N1bWVudD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5wbHVnaW5NYW5hZ2VyU2VydmljZS5nZXRDb250ZW50V2luZG93QnlJZCh0aGlzLnBsdWdpbklkKTtcbiAgICB9XG5cbiAgICByZWxvYWQoKSB7XG4gICAgICAgIHRoaXMuZ2V0Q29udGVudFdpbmRvdygpLnRoZW4oY29udGVudFdpbmRvdyA9PiB7XG4gICAgICAgICAgICBpZiAoY29udGVudFdpbmRvdyAmJiB0aGlzLmNvcmVTZXJ2aWNlLmdldEVudmlyb25tZW50KCkucHJvZHVjdGlvbikge1xuICAgICAgICAgICAgICAgIGNvbnRlbnRXaW5kb3dbJ2xvY2F0aW9uJ10ucmVsb2FkKHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZXNpemUoKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdbcmVzaXplXScpO1xuICAgICAgICBpZiAodGhpcy5hdXRvSGVpZ2h0ICYmIHRoaXMuY29yZVNlcnZpY2UuZ2V0RW52aXJvbm1lbnQoKS5wcm9kdWN0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLmdldENvbnRlbnRXaW5kb3coKS50aGVuKGNvbnRlbnRXaW5kb3cgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChjb250ZW50V2luZG93KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGhlaWdodCA9IGNvbnRlbnRXaW5kb3dbJ2RvY3VtZW50J11bJ2JvZHknXVsnb2Zmc2V0SGVpZ2h0J10gfHwgY29udGVudFdpbmRvd1snZG9jdW1lbnQnXVsnYm9keSddWydzY3JvbGxIZWlnaHQnXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGhlaWdodCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5wbHVnaW5JZCkuc3R5bGUuaGVpZ2h0ID0gYCR7aGVpZ2h0fXB4YDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Mb2FkKCRldmVudCkge1xuICAgICAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5wbHVnaW5JZCkpIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0Q29udGVudFdpbmRvdygpLnRoZW4oY29udGVudFdpbmRvdyA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGNvbnRlbnRXaW5kb3cpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXNpemUoKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gVGhlIHBsdWdpbiBoYXMgZmluaXNoZWQgbG9hZGluZ1xuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnW29uTG9hZF0tLXBsdWdpbklkJywgdGhpcy5wbHVnaW5JZCwgY29udGVudFdpbmRvdyk7XG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMucGx1Z2luTWFuYWdlclNlcnZpY2Uuc2VuZE1lc3NhZ2VUbyh7cGx1Z2luSWQ6IHRoaXMucGx1Z2luSWQsIGV2ZW50TmFtZTogJ2xvYWRlZCd9LCBjb250ZW50V2luZG93KTtcblxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luTWFuYWdlclNlcnZpY2Uuc2VuZE1lc3NhZ2VUbyh7cGx1Z2luSWQ6IHRoaXMucGx1Z2luSWQsIGV2ZW50TmFtZTogJ2xvYWRlZCd9LCBjb250ZW50V2luZG93KTtcbiAgICAgICAgICAgICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==