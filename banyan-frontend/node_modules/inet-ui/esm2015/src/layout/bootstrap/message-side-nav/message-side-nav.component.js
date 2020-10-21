/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef } from '@angular/core';
import { NotifyMessageService } from "../../../common/notify-message.service";
import { AbstractSideNavComponent } from "../abstract-side-nav.component";
export class MessageSideNavComponent extends AbstractSideNavComponent {
    /**
     * @param {?} service
     * @param {?} elementRef
     */
    constructor(service, elementRef) {
        super(elementRef);
        this.service = service;
        this.elementRef = elementRef;
        this.loaded = false;
        this.messages = [];
        this.pageNumber = 0;
        this.pageSize = 10;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        /** @type {?} */
        const currentValue = changes['opened']["currentValue"];
        setTimeout((/**
         * @return {?}
         */
        () => {
            if (currentValue) {
                this.open();
                if (!this.loaded) {
                    this.pageNumber = 0;
                    this.listMessage({ pageSize: this.pageSize, pageNumber: this.pageNumber, notifylist: true });
                }
            }
            else {
                this.close();
            }
        }), 1);
    }
    /**
     * @param {?} params
     * @return {?}
     */
    listMessage(params) {
        this.service.getMessages(params).subscribe((/**
         * @param {?} response
         * @return {?}
         */
        (response) => {
            this.messages = (/** @type {?} */ (response.items));
            this.totalMessage = response.total;
            this.loaded = true;
        }));
    }
    /**
     * @return {?}
     */
    loadMessageMore() {
        this.pageNumber += 1;
        this.service.getMessages({ pageSize: this.pageSize, pageNumber: this.pageNumber, notifylist: true }).subscribe((/**
         * @param {?} response
         * @return {?}
         */
        (response) => {
            this.messages = [...this.messages, ...(/** @type {?} */ (response.items))];
        }));
    }
    /**
     * @return {?}
     */
    clearMessage() {
        this.service.clearAll().subscribe((/**
         * @param {?} response
         * @return {?}
         */
        response => {
            this.messages = [];
            this.totalMessage = 0;
            this.onClear.emit(true);
        }));
    }
    /**
     * @param {?} msg
     * @return {?}
     */
    openMessage(msg) {
        if (!msg.read) {
            this.service.loadNotify(msg.application, msg.activityID).subscribe((/**
             * @param {?} message
             * @return {?}
             */
            (message) => {
                msg.read = true;
                this.onLoad.emit(true);
            }));
        }
    }
}
MessageSideNavComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-admin-message-side-nav',
                template: "<div class=\"slide-nav\" [ngClass]=\"{'opened': opened}\">\n    <div class=\"list-header\">\n        <span class=\"font-weight-bold\"><i class=\"fa fa-bell\"></i> {{'COMMON.NOTIFICATION.TITLE' | translate}}</span>\n        <button (click)=\"close()\" class=\"close\" type=\"button\"><i class=\"fa fa-times\"></i></button>\n    </div>\n    <ul class=\"list-box\">\n        <li *ngFor=\"let item of messages\">\n            <a href=\"javascript:;\" (click)=\"openMessage(item)\">\n                <div class=\"list-item\">\n                    <div class=\"list-left\">\n                        <img userAvatar [usercode]=\"item.sender\" class=\"user-avatar mt-0 mr-2 rounded-circle\">\n                    </div>\n                    <div class=\"list-body\">\n                        <div class=\"media-body ml-2\">\n                            <p class=\"mb-1 message-item p-2\" [ngClass]=\"{'unread': !item.read}\">\n                                <b>{{item.fullname}}</b> {{item.message}}\n                            </p>\n                            <!--div class=\"px-2\">{{item.created | date}}</div-->\n                        </div>\n                    </div>\n                </div>\n            </a>\n        </li>\n        <li *ngIf=\"!messages?.length\">\n            <div class=\"empty-msg-container\">\n                <i>{{'COMMON.NOTIFICATION.EMPTY_MSG' | translate}}</i>\n            </div>\n        </li>\n        <div *ngIf=\"messages?.length && totalMessage!=messages?.length\" class=\"mt-1 text-center\">\n            <a (click)=\"loadMessageMore()\" href=\"javascript:;\">\n                {{'COMMON.NOTIFICATION.LOAD_MORE' | translate}} {{totalMessage-messages?.length}} {{'COMMON.NOTIFICATION.ITEMS' | translate}}\n            </a>\n        </div>\n    </ul>\n    <div class=\"list-footer\">\n        <a *ngIf=\"messages?.length\" (click)=\"clearMessage()\" href=\"javascript:;\"><i class=\"fa fa-eraser text-danger\"></i> {{'COMMON.NOTIFICATION.CLEAR_ALL' | translate}}</a>\n    </div>\n</div>\n",
                styles: [":host a{text-decoration:none}:host .list-body{padding:0 0 0 2rem}:host .list-left{height:2rem;width:2rem;position:absolute}:host .user-avatar{height:2rem;width:2rem}:host .message-item{background-color:#edf2f9;border-radius:.375rem!important}:host .unread{border:1px dotted #999}:host .pr-2,:host .px-2{padding-right:.5rem!important}:host .empty-msg-container{text-align:center;line-height:30px;padding-top:15%;color:#999}"]
            }] }
];
/** @nocollapse */
MessageSideNavComponent.ctorParameters = () => [
    { type: NotifyMessageService },
    { type: ElementRef }
];
if (false) {
    /** @type {?} */
    MessageSideNavComponent.prototype.keyword;
    /** @type {?} */
    MessageSideNavComponent.prototype.loaded;
    /** @type {?} */
    MessageSideNavComponent.prototype.messages;
    /** @type {?} */
    MessageSideNavComponent.prototype.totalMessage;
    /** @type {?} */
    MessageSideNavComponent.prototype.pageNumber;
    /** @type {?} */
    MessageSideNavComponent.prototype.pageSize;
    /**
     * @type {?}
     * @private
     */
    MessageSideNavComponent.prototype.service;
    /** @type {?} */
    MessageSideNavComponent.prototype.elementRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS1zaWRlLW5hdi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbmV0LXVpLyIsInNvdXJjZXMiOlsic3JjL2xheW91dC9ib290c3RyYXAvbWVzc2FnZS1zaWRlLW5hdi9tZXNzYWdlLXNpZGUtbmF2LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNILFNBQVMsRUFBaUIsVUFBVSxFQUN2QyxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSx3Q0FBd0MsQ0FBQztBQUc1RSxPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQztBQU94RSxNQUFNLE9BQU8sdUJBQXlCLFNBQVEsd0JBQXdCOzs7OztJQU9sRSxZQUFvQixPQUE2QixFQUFTLFVBQXNCO1FBQzVFLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztRQURGLFlBQU8sR0FBUCxPQUFPLENBQXNCO1FBQVMsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUxoRixXQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ2YsYUFBUSxHQUFvQixFQUFFLENBQUM7UUFFL0IsZUFBVSxHQUFFLENBQUMsQ0FBQztRQUNkLGFBQVEsR0FBRyxFQUFFLENBQUM7SUFHZCxDQUFDOzs7OztJQUVELFdBQVcsQ0FBQyxPQUFzQjs7Y0FDeEIsWUFBWSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxjQUFjLENBQUM7UUFDdEQsVUFBVTs7O1FBQUMsR0FBRyxFQUFFO1lBQ1osSUFBSSxZQUFZLEVBQUU7Z0JBQ2QsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUNaLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO29CQUNkLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO29CQUNwQixJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7aUJBQzlGO2FBQ0o7aUJBQU07Z0JBQ0gsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO2FBQ2hCO1FBQ0wsQ0FBQyxHQUFFLENBQUMsQ0FBQyxDQUFBO0lBRVQsQ0FBQzs7Ozs7SUFFRCxXQUFXLENBQUMsTUFBVztRQUNuQixJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxTQUFTOzs7O1FBQUUsQ0FBQyxRQUFzQixFQUFFLEVBQUU7WUFDbkUsSUFBSSxDQUFDLFFBQVEsR0FBRyxtQkFBQSxRQUFRLENBQUMsS0FBSyxFQUF3QixDQUFDO1lBQ3ZELElBQUksQ0FBQyxZQUFZLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQztZQUNuQyxJQUFJLENBQUMsTUFBTSxHQUFFLElBQUksQ0FBQztRQUN0QixDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7Ozs7SUFFRCxlQUFlO1FBQ1gsSUFBSSxDQUFDLFVBQVUsSUFBRSxDQUFDLENBQUM7UUFDbkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQyxTQUFTOzs7O1FBQUUsQ0FBQyxRQUFzQixFQUFFLEVBQUU7WUFDckksSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLG1CQUFBLFFBQVEsQ0FBQyxLQUFLLEVBQXdCLENBQUMsQ0FBQztRQUNsRixDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7Ozs7SUFFRCxZQUFZO1FBQ1IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxTQUFTOzs7O1FBQUMsUUFBUSxDQUFDLEVBQUU7WUFDekMsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7WUFDbkIsSUFBSSxDQUFDLFlBQVksR0FBRSxDQUFDLENBQUM7WUFDckIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUIsQ0FBQyxFQUFDLENBQUE7SUFDTixDQUFDOzs7OztJQUVELFdBQVcsQ0FBQyxHQUFrQjtRQUMxQixJQUFHLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRTtZQUNWLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLFNBQVM7Ozs7WUFBQyxDQUFDLE9BQXNCLEVBQUUsRUFBRTtnQkFDMUYsR0FBRyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7Z0JBQ2hCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzNCLENBQUMsRUFBQyxDQUFDO1NBQ047SUFDTCxDQUFDOzs7WUE5REosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSw0QkFBNEI7Z0JBQ3RDLG0vREFBZ0Q7O2FBRW5EOzs7O1lBVE8sb0JBQW9CO1lBRkUsVUFBVTs7OztJQWFwQywwQ0FBZ0I7O0lBQ2hCLHlDQUFlOztJQUNmLDJDQUErQjs7SUFDL0IsK0NBQXFCOztJQUNyQiw2Q0FBYzs7SUFDZCwyQ0FBYzs7Ozs7SUFDRiwwQ0FBcUM7O0lBQUUsNkNBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBDb21wb25lbnQsIFNpbXBsZUNoYW5nZXMsIEVsZW1lbnRSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge05vdGlmeU1lc3NhZ2VTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL25vdGlmeS1tZXNzYWdlLnNlcnZpY2VcIjtcbmltcG9ydCB7UmVzcG9uc2VEYXRhfSBmcm9tIFwiaW5ldC1jb3JlXCI7XG5pbXBvcnQge05vdGlmeU1lc3NhZ2V9IGZyb20gXCIuLi8uLi8uLi9tb2RlbC9ub3RpZnktbWVzc2FnZVwiO1xuaW1wb3J0IHtBYnN0cmFjdFNpZGVOYXZDb21wb25lbnR9IGZyb20gXCIuLi9hYnN0cmFjdC1zaWRlLW5hdi5jb21wb25lbnRcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhcHAtYWRtaW4tbWVzc2FnZS1zaWRlLW5hdicsXG4gICAgdGVtcGxhdGVVcmw6ICcuL21lc3NhZ2Utc2lkZS1uYXYuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL21lc3NhZ2Utc2lkZS1uYXYuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIE1lc3NhZ2VTaWRlTmF2Q29tcG9uZW50ICBleHRlbmRzIEFic3RyYWN0U2lkZU5hdkNvbXBvbmVudCAgIHtcbiAgICBrZXl3b3JkOiBzdHJpbmc7XG4gICAgbG9hZGVkID0gZmFsc2U7XG4gICAgbWVzc2FnZXM6IE5vdGlmeU1lc3NhZ2VbXSA9IFtdO1xuICAgIHRvdGFsTWVzc2FnZTogbnVtYmVyO1xuICAgIHBhZ2VOdW1iZXI9IDA7XG4gICAgcGFnZVNpemUgPSAxMDtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNlcnZpY2U6IE5vdGlmeU1lc3NhZ2VTZXJ2aWNlLCBwdWJsaWMgZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICAgICAgICBzdXBlcihlbGVtZW50UmVmKTtcbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9IGNoYW5nZXNbJ29wZW5lZCddW1wiY3VycmVudFZhbHVlXCJdO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50VmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9wZW4oKTtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMubG9hZGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFnZU51bWJlciA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGlzdE1lc3NhZ2Uoe3BhZ2VTaXplOiB0aGlzLnBhZ2VTaXplLCBwYWdlTnVtYmVyOiB0aGlzLnBhZ2VOdW1iZXIsIG5vdGlmeWxpc3Q6IHRydWV9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgMSlcblxuICAgIH1cblxuICAgIGxpc3RNZXNzYWdlKHBhcmFtczogYW55KSB7XG4gICAgICAgIHRoaXMuc2VydmljZS5nZXRNZXNzYWdlcyhwYXJhbXMpLnN1YnNjcmliZSggKHJlc3BvbnNlOiBSZXNwb25zZURhdGEpID0+IHtcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZXMgPSByZXNwb25zZS5pdGVtcyBhcyBBcnJheTxOb3RpZnlNZXNzYWdlPjtcbiAgICAgICAgICAgIHRoaXMudG90YWxNZXNzYWdlID0gcmVzcG9uc2UudG90YWw7XG4gICAgICAgICAgICB0aGlzLmxvYWRlZD0gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbG9hZE1lc3NhZ2VNb3JlKCkge1xuICAgICAgICB0aGlzLnBhZ2VOdW1iZXIrPTE7XG4gICAgICAgIHRoaXMuc2VydmljZS5nZXRNZXNzYWdlcyh7cGFnZVNpemU6IHRoaXMucGFnZVNpemUsIHBhZ2VOdW1iZXI6IHRoaXMucGFnZU51bWJlciwgbm90aWZ5bGlzdDogdHJ1ZX0pLnN1YnNjcmliZSggKHJlc3BvbnNlOiBSZXNwb25zZURhdGEpID0+IHtcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZXMgPSBbLi4udGhpcy5tZXNzYWdlcywgLi4ucmVzcG9uc2UuaXRlbXMgYXMgQXJyYXk8Tm90aWZ5TWVzc2FnZT5dO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjbGVhck1lc3NhZ2UoKXtcbiAgICAgICAgdGhpcy5zZXJ2aWNlLmNsZWFyQWxsKCkuc3Vic2NyaWJlKHJlc3BvbnNlID0+e1xuICAgICAgICAgICAgdGhpcy5tZXNzYWdlcyA9IFtdO1xuICAgICAgICAgICAgdGhpcy50b3RhbE1lc3NhZ2U9IDA7XG4gICAgICAgICAgICB0aGlzLm9uQ2xlYXIuZW1pdCh0cnVlKTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBvcGVuTWVzc2FnZShtc2c6IE5vdGlmeU1lc3NhZ2UpIHtcbiAgICAgICAgaWYoIW1zZy5yZWFkKSB7XG4gICAgICAgICAgICB0aGlzLnNlcnZpY2UubG9hZE5vdGlmeShtc2cuYXBwbGljYXRpb24sIG1zZy5hY3Rpdml0eUlEKS5zdWJzY3JpYmUoKG1lc3NhZ2U6IE5vdGlmeU1lc3NhZ2UpID0+e1xuICAgICAgICAgICAgICAgIG1zZy5yZWFkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLm9uTG9hZC5lbWl0KHRydWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=