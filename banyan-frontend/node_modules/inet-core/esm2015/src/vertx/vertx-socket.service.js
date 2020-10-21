/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { VertxSocketState } from "./VertxSocket";
import { VertxSocketManager } from "./VertxSocketManager";
export class SocketService {
    constructor() {
        this.onStateChange = new Subject();
        this.onMessage = new Subject();
        this.onMemberStateChange = new Subject();
        this.init();
    }
    /**
     * @return {?}
     */
    get readyState() {
        return this.socket && this.socket.readyState || VertxSocketState.UNSET;
    }
    /**
     * @return {?}
     */
    get status() {
        return this.readyState;
    }
    /**
     * @return {?}
     */
    get connecting() {
        return this.socket ? this.socket.connecting : false;
    }
    /**
     * @return {?}
     */
    get connected() {
        return this.socket ? this.socket.connected : false;
    }
    /**
     * @return {?}
     */
    get closed() {
        return this.socket ? this.socket.closed : false;
    }
    /**
     * @return {?}
     */
    get reconnecting() {
        return this.socket ? this.socket.reconnecting : false;
    }
    /**
     * @return {?}
     */
    get unavailable() {
        return this.socket ? this.socket.unavailable : false;
    }
    /**
     * @return {?}
     */
    init() {
        if (!this.socket) {
            this.socket = new VertxSocketManager();
            this.socket.onStateChange.subscribe((/**
             * @return {?}
             */
            () => this.onStateChange.next(this.readyState)));
            this.socket.onMessage.subscribe((/**
             * @param {?} message
             * @return {?}
             */
            (message) => this.onMessage.next(message)));
            this.socket.onMessageOnline.subscribe((/**
             * @param {?} message
             * @return {?}
             */
            (message) => this.onMemberStateChange.next(message)));
        }
    }
    /**
     * @return {?}
     */
    connect() {
        this.init();
    }
    /**
     * @return {?}
     */
    disconnect() {
        if (this.socket) {
            this.socket.close();
            this.socket = null;
        }
    }
    /**
     * @param {?} address
     * @param {?} message
     * @return {?}
     */
    publish(address, message) {
        return this.send(address, message);
    }
    /**
     * @param {?} address
     * @param {?} message
     * @return {?}
     */
    send(address, message) {
        this.init();
        return this.socket.send(address, message);
    }
    /**
     * @param {?} app
     * @param {?} message
     * @return {?}
     */
    createMessagePackage(app, message) {
        return {
            message: {
                application: app,
                alert: message,
                sender: iNet.username,
                content: message
            },
            application: app,
            sender: iNet.username,
            sent: new Date().getTime()
        };
    }
    // @deprecated
    /**
     * @param {?} groupCode
     * @param {?} message
     * @return {?}
     */
    sendGroup(groupCode, message) {
        // Prepend # into groupCode
        this.send('#' + groupCode, message);
    }
}
SocketService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
SocketService.ctorParameters = () => [];
if (false) {
    /** @type {?} */
    SocketService.prototype.onStateChange;
    /** @type {?} */
    SocketService.prototype.onMessage;
    /** @type {?} */
    SocketService.prototype.onMemberStateChange;
    /**
     * @type {?}
     * @private
     */
    SocketService.prototype.socket;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVydHgtc29ja2V0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbmV0LWNvcmUvIiwic291cmNlcyI6WyJzcmMvdmVydHgvdmVydHgtc29ja2V0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFhLE9BQU8sRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUN6QyxPQUFPLEVBQWdDLGdCQUFnQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzlFLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBSXhELE1BQU0sT0FBTyxhQUFhO0lBbUN0QjtRQWxDQSxrQkFBYSxHQUFHLElBQUksT0FBTyxFQUFvQixDQUFDO1FBQ2hELGNBQVMsR0FBRyxJQUFJLE9BQU8sRUFBZ0IsQ0FBQztRQUN4Qyx3QkFBbUIsR0FBRyxJQUFJLE9BQU8sRUFBbUIsQ0FBQztRQWlDakQsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2hCLENBQUM7Ozs7SUFoQ0QsSUFBSSxVQUFVO1FBQ1YsT0FBTyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxJQUFJLGdCQUFnQixDQUFDLEtBQUssQ0FBQztJQUMzRSxDQUFDOzs7O0lBRUQsSUFBSSxNQUFNO1FBQ04sT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQzNCLENBQUM7Ozs7SUFFRCxJQUFJLFVBQVU7UUFDVixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFDeEQsQ0FBQzs7OztJQUVELElBQUksU0FBUztRQUNULE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEtBQUss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SW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtPYnNlcnZhYmxlLCBTdWJqZWN0fSBmcm9tICdyeGpzJztcbmltcG9ydCB7VmVydHhNZXNzYWdlLCBWZXJ0eE9ubGluZURhdGEsIFZlcnR4U29ja2V0U3RhdGV9IGZyb20gXCIuL1ZlcnR4U29ja2V0XCI7XG5pbXBvcnQge1ZlcnR4U29ja2V0TWFuYWdlcn0gZnJvbSBcIi4vVmVydHhTb2NrZXRNYW5hZ2VyXCI7XG5kZWNsYXJlIGxldCBpTmV0OiBhbnk7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTb2NrZXRTZXJ2aWNlIHtcbiAgICBvblN0YXRlQ2hhbmdlID0gbmV3IFN1YmplY3Q8VmVydHhTb2NrZXRTdGF0ZT4oKTtcbiAgICBvbk1lc3NhZ2UgPSBuZXcgU3ViamVjdDxWZXJ0eE1lc3NhZ2U+KCk7XG4gICAgb25NZW1iZXJTdGF0ZUNoYW5nZSA9IG5ldyBTdWJqZWN0PFZlcnR4T25saW5lRGF0YT4oKTtcblxuICAgIGdldCByZWFkeVN0YXRlKCk6IFZlcnR4U29ja2V0U3RhdGUge1xuICAgICAgICByZXR1cm4gdGhpcy5zb2NrZXQgJiYgdGhpcy5zb2NrZXQucmVhZHlTdGF0ZSB8fCBWZXJ0eFNvY2tldFN0YXRlLlVOU0VUO1xuICAgIH1cblxuICAgIGdldCBzdGF0dXMoKTogVmVydHhTb2NrZXRTdGF0ZSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlYWR5U3RhdGU7XG4gICAgfVxuXG4gICAgZ2V0IGNvbm5lY3RpbmcoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnNvY2tldCA/IHRoaXMuc29ja2V0LmNvbm5lY3RpbmcgOiBmYWxzZTtcbiAgICB9XG5cbiAgICBnZXQgY29ubmVjdGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zb2NrZXQgPyB0aGlzLnNvY2tldC5jb25uZWN0ZWQgOiBmYWxzZTtcbiAgICB9XG5cbiAgICBnZXQgY2xvc2VkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zb2NrZXQgPyB0aGlzLnNvY2tldC5jbG9zZWQgOiBmYWxzZTtcbiAgICB9XG5cbiAgICBnZXQgcmVjb25uZWN0aW5nKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zb2NrZXQgPyB0aGlzLnNvY2tldC5yZWNvbm5lY3RpbmcgOiBmYWxzZTtcbiAgICB9XG5cbiAgICBnZXQgdW5hdmFpbGFibGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnNvY2tldCA/IHRoaXMuc29ja2V0LnVuYXZhaWxhYmxlIDogZmFsc2U7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzb2NrZXQ6IFZlcnR4U29ja2V0TWFuYWdlcjtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICB9XG5cbiAgICBpbml0KCkge1xuICAgICAgICBpZiAoIXRoaXMuc29ja2V0KSB7XG4gICAgICAgICAgICB0aGlzLnNvY2tldCA9IG5ldyBWZXJ0eFNvY2tldE1hbmFnZXIoKTtcbiAgICAgICAgICAgIHRoaXMuc29ja2V0Lm9uU3RhdGVDaGFuZ2Uuc3Vic2NyaWJlKCgpID0+IHRoaXMub25TdGF0ZUNoYW5nZS5uZXh0KHRoaXMucmVhZHlTdGF0ZSkpO1xuICAgICAgICAgICAgdGhpcy5zb2NrZXQub25NZXNzYWdlLnN1YnNjcmliZSgobWVzc2FnZSkgPT4gdGhpcy5vbk1lc3NhZ2UubmV4dChtZXNzYWdlKSk7XG4gICAgICAgICAgICB0aGlzLnNvY2tldC5vbk1lc3NhZ2VPbmxpbmUuc3Vic2NyaWJlKChtZXNzYWdlKSA9PiB0aGlzLm9uTWVtYmVyU3RhdGVDaGFuZ2UubmV4dChtZXNzYWdlKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25uZWN0KCkge1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICB9XG5cbiAgICBkaXNjb25uZWN0KCkge1xuICAgICAgICBpZiAodGhpcy5zb2NrZXQpIHtcbiAgICAgICAgICAgIHRoaXMuc29ja2V0LmNsb3NlKCk7XG4gICAgICAgICAgICB0aGlzLnNvY2tldCA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaXNoKGFkZHJlc3M6IHN0cmluZywgbWVzc2FnZTogYW55KTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbmQoYWRkcmVzcywgbWVzc2FnZSk7XG4gICAgfVxuXG4gICAgc2VuZChhZGRyZXNzOiBzdHJpbmcsIG1lc3NhZ2U6IGFueSk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuc29ja2V0LnNlbmQoYWRkcmVzcywgbWVzc2FnZSk7XG4gICAgfVxuXG4gICAgY3JlYXRlTWVzc2FnZVBhY2thZ2UoYXBwOiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZykge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbWVzc2FnZToge1xuICAgICAgICAgICAgICAgIGFwcGxpY2F0aW9uOiBhcHAsXG4gICAgICAgICAgICAgICAgYWxlcnQ6IG1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgc2VuZGVyOiBpTmV0LnVzZXJuYW1lLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IG1lc3NhZ2VcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhcHBsaWNhdGlvbjogYXBwLFxuICAgICAgICAgICAgc2VuZGVyOiBpTmV0LnVzZXJuYW1lLFxuICAgICAgICAgICAgc2VudDogbmV3IERhdGUoKS5nZXRUaW1lKClcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBAZGVwcmVjYXRlZFxuICAgIHNlbmRHcm91cChncm91cENvZGU6IHN0cmluZywgbWVzc2FnZTogYW55KSB7XG4gICAgICAgIC8vIFByZXBlbmQgIyBpbnRvIGdyb3VwQ29kZVxuICAgICAgICB0aGlzLnNlbmQoJyMnICsgZ3JvdXBDb2RlLCBtZXNzYWdlKTtcbiAgICB9XG59Il19