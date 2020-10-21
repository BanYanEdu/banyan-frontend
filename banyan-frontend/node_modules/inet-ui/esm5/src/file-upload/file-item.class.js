/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { FileLikeObject } from './file-like-object.class';
var FileItem = /** @class */ (function () {
    function FileItem(uploader, some, options) {
        this.url = '/';
        this.headers = [];
        this.withCredentials = true;
        this.formData = [];
        this.isReady = false;
        this.isUploading = false;
        this.isUploaded = false;
        this.isSuccess = false;
        this.isCancel = false;
        this.isError = false;
        this.progress = 0;
        this.index = void 0;
        this.uploader = uploader;
        this.some = some;
        this.options = options;
        this.file = new FileLikeObject(some);
        this._file = some;
        if (uploader.options) {
            this.method = uploader.options.method || 'POST';
            this.alias = uploader.options.itemAlias || 'FileUpload';
        }
        this.url = uploader.options.url;
    }
    /**
     * @return {?}
     */
    FileItem.prototype.upload = /**
     * @return {?}
     */
    function () {
        try {
            this.uploader.uploadItem(this);
        }
        catch (e) {
            this.uploader._onCompleteItem(this, '', 0, {});
            this.uploader._onErrorItem(this, '', 0, {});
        }
    };
    /**
     * @return {?}
     */
    FileItem.prototype.cancel = /**
     * @return {?}
     */
    function () {
        this.uploader.cancelItem(this);
    };
    /**
     * @return {?}
     */
    FileItem.prototype.remove = /**
     * @return {?}
     */
    function () {
        this.uploader.removeFromQueue(this);
    };
    /**
     * @return {?}
     */
    FileItem.prototype.onBeforeUpload = /**
     * @return {?}
     */
    function () {
        return void 0;
    };
    /**
     * @param {?} form
     * @return {?}
     */
    FileItem.prototype.onBuildForm = /**
     * @param {?} form
     * @return {?}
     */
    function (form) {
        return { form: form };
    };
    /**
     * @param {?} progress
     * @return {?}
     */
    FileItem.prototype.onProgress = /**
     * @param {?} progress
     * @return {?}
     */
    function (progress) {
        return { progress: progress };
    };
    /**
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    FileItem.prototype.onSuccess = /**
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    function (response, status, headers) {
        return { response: response, status: status, headers: headers };
    };
    /**
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    FileItem.prototype.onError = /**
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    function (response, status, headers) {
        return { response: response, status: status, headers: headers };
    };
    /**
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    FileItem.prototype.onCancel = /**
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    function (response, status, headers) {
        return { response: response, status: status, headers: headers };
    };
    /**
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    FileItem.prototype.onComplete = /**
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    function (response, status, headers) {
        return { response: response, status: status, headers: headers };
    };
    /**
     * @return {?}
     */
    FileItem.prototype._onBeforeUpload = /**
     * @return {?}
     */
    function () {
        this.isReady = true;
        this.isUploading = true;
        this.isUploaded = false;
        this.isSuccess = false;
        this.isCancel = false;
        this.isError = false;
        this.progress = 0;
        this.onBeforeUpload();
    };
    /**
     * @param {?} form
     * @return {?}
     */
    FileItem.prototype._onBuildForm = /**
     * @param {?} form
     * @return {?}
     */
    function (form) {
        this.onBuildForm(form);
    };
    /**
     * @param {?} progress
     * @return {?}
     */
    FileItem.prototype._onProgress = /**
     * @param {?} progress
     * @return {?}
     */
    function (progress) {
        this.progress = progress;
        this.onProgress(progress);
    };
    /**
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    FileItem.prototype._onSuccess = /**
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    function (response, status, headers) {
        this.isReady = false;
        this.isUploading = false;
        this.isUploaded = true;
        this.isSuccess = true;
        this.isCancel = false;
        this.isError = false;
        this.progress = 100;
        this.index = void 0;
        this.onSuccess(response, status, headers);
    };
    /**
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    FileItem.prototype._onError = /**
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    function (response, status, headers) {
        this.isReady = false;
        this.isUploading = false;
        this.isUploaded = true;
        this.isSuccess = false;
        this.isCancel = false;
        this.isError = true;
        this.progress = 0;
        this.index = void 0;
        this.onError(response, status, headers);
    };
    /**
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    FileItem.prototype._onCancel = /**
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    function (response, status, headers) {
        this.isReady = false;
        this.isUploading = false;
        this.isUploaded = false;
        this.isSuccess = false;
        this.isCancel = true;
        this.isError = false;
        this.progress = 0;
        this.index = void 0;
        this.onCancel(response, status, headers);
    };
    /**
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    FileItem.prototype._onComplete = /**
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    function (response, status, headers) {
        this.onComplete(response, status, headers);
        if (this.uploader.options.removeAfterUpload) {
            this.remove();
        }
    };
    /**
     * @return {?}
     */
    FileItem.prototype._prepareToUploading = /**
     * @return {?}
     */
    function () {
        this.index = this.index || ++this.uploader._nextIndex;
        this.isReady = true;
    };
    return FileItem;
}());
export { FileItem };
if (false) {
    /** @type {?} */
    FileItem.prototype.file;
    /** @type {?} */
    FileItem.prototype._file;
    /** @type {?} */
    FileItem.prototype.alias;
    /** @type {?} */
    FileItem.prototype.url;
    /** @type {?} */
    FileItem.prototype.method;
    /** @type {?} */
    FileItem.prototype.headers;
    /** @type {?} */
    FileItem.prototype.withCredentials;
    /** @type {?} */
    FileItem.prototype.formData;
    /** @type {?} */
    FileItem.prototype.isReady;
    /** @type {?} */
    FileItem.prototype.isUploading;
    /** @type {?} */
    FileItem.prototype.isUploaded;
    /** @type {?} */
    FileItem.prototype.isSuccess;
    /** @type {?} */
    FileItem.prototype.isCancel;
    /** @type {?} */
    FileItem.prototype.isError;
    /** @type {?} */
    FileItem.prototype.progress;
    /** @type {?} */
    FileItem.prototype.index;
    /** @type {?} */
    FileItem.prototype._xhr;
    /** @type {?} */
    FileItem.prototype._form;
    /**
     * @type {?}
     * @protected
     */
    FileItem.prototype.uploader;
    /**
     * @type {?}
     * @protected
     */
    FileItem.prototype.some;
    /**
     * @type {?}
     * @protected
     */
    FileItem.prototype.options;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1pdGVtLmNsYXNzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC11aS8iLCJzb3VyY2VzIjpbInNyYy9maWxlLXVwbG9hZC9maWxlLWl0ZW0uY2xhc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUcxRDtJQXdCRSxrQkFBbUIsUUFBc0IsRUFBRSxJQUFVLEVBQUUsT0FBNEI7UUFwQjVFLFFBQUcsR0FBVyxHQUFHLENBQUM7UUFFbEIsWUFBTyxHQUFRLEVBQUUsQ0FBQztRQUNsQixvQkFBZSxHQUFZLElBQUksQ0FBQztRQUNoQyxhQUFRLEdBQVEsRUFBRSxDQUFDO1FBQ25CLFlBQU8sR0FBWSxLQUFLLENBQUM7UUFDekIsZ0JBQVcsR0FBWSxLQUFLLENBQUM7UUFDN0IsZUFBVSxHQUFZLEtBQUssQ0FBQztRQUM1QixjQUFTLEdBQVksS0FBSyxDQUFDO1FBQzNCLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFDMUIsWUFBTyxHQUFZLEtBQUssQ0FBQztRQUN6QixhQUFRLEdBQVcsQ0FBQyxDQUFDO1FBQ3JCLFVBQUssR0FBVyxLQUFLLENBQUMsQ0FBQztRQVM1QixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksUUFBUSxDQUFDLE9BQU8sRUFBRTtZQUNwQixJQUFJLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQztZQUNoRCxJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsU0FB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OztJQUN6QixtQ0FBdUM7O0lBQ3ZDLDRCQUEwQjs7SUFDMUIsMkJBQWdDOztJQUNoQywrQkFBb0M7O0lBQ3BDLDhCQUFtQzs7SUFDbkMsNkJBQWtDOztJQUNsQyw0QkFBaUM7O0lBQ2pDLDJCQUFnQzs7SUFDaEMsNEJBQTRCOztJQUM1Qix5QkFBOEI7O0lBQzlCLHdCQUE0Qjs7SUFDNUIseUJBQWtCOzs7OztJQUVsQiw0QkFBaUM7Ozs7O0lBQ2pDLHdCQUFxQjs7Ozs7SUFDckIsMkJBQXVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRmlsZUxpa2VPYmplY3QgfSBmcm9tICcuL2ZpbGUtbGlrZS1vYmplY3QuY2xhc3MnO1xuaW1wb3J0IHsgRmlsZVVwbG9hZGVyLCBQYXJzZWRSZXNwb25zZUhlYWRlcnMsIEZpbGVVcGxvYWRlck9wdGlvbnMgfSBmcm9tICcuL2ZpbGUtdXBsb2FkZXIuY2xhc3MnO1xuXG5leHBvcnQgY2xhc3MgRmlsZUl0ZW0ge1xuICBwdWJsaWMgZmlsZTogRmlsZUxpa2VPYmplY3Q7XG4gIHB1YmxpYyBfZmlsZTogRmlsZTtcbiAgcHVibGljIGFsaWFzOiBzdHJpbmc7XG4gIHB1YmxpYyB1cmw6IHN0cmluZyA9ICcvJztcbiAgcHVibGljIG1ldGhvZDogc3RyaW5nO1xuICBwdWJsaWMgaGVhZGVyczogYW55ID0gW107XG4gIHB1YmxpYyB3aXRoQ3JlZGVudGlhbHM6IGJvb2xlYW4gPSB0cnVlO1xuICBwdWJsaWMgZm9ybURhdGE6IGFueSA9IFtdO1xuICBwdWJsaWMgaXNSZWFkeTogYm9vbGVhbiA9IGZhbHNlO1xuICBwdWJsaWMgaXNVcGxvYWRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHVibGljIGlzVXBsb2FkZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHVibGljIGlzU3VjY2VzczogYm9vbGVhbiA9IGZhbHNlO1xuICBwdWJsaWMgaXNDYW5jZWw6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHVibGljIGlzRXJyb3I6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHVibGljIHByb2dyZXNzOiBudW1iZXIgPSAwO1xuICBwdWJsaWMgaW5kZXg6IG51bWJlciA9IHZvaWQgMDtcbiAgcHVibGljIF94aHI6IFhNTEh0dHBSZXF1ZXN0O1xuICBwdWJsaWMgX2Zvcm06IGFueTtcblxuICBwcm90ZWN0ZWQgdXBsb2FkZXI6IEZpbGVVcGxvYWRlcjtcbiAgcHJvdGVjdGVkIHNvbWU6IEZpbGU7XG4gIHByb3RlY3RlZCBvcHRpb25zOiBGaWxlVXBsb2FkZXJPcHRpb25zO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcih1cGxvYWRlcjogRmlsZVVwbG9hZGVyLCBzb21lOiBGaWxlLCBvcHRpb25zOiBGaWxlVXBsb2FkZXJPcHRpb25zKSB7XG4gICAgdGhpcy51cGxvYWRlciA9IHVwbG9hZGVyO1xuICAgIHRoaXMuc29tZSA9IHNvbWU7XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICB0aGlzLmZpbGUgPSBuZXcgRmlsZUxpa2VPYmplY3Qoc29tZSk7XG4gICAgdGhpcy5fZmlsZSA9IHNvbWU7XG4gICAgaWYgKHVwbG9hZGVyLm9wdGlvbnMpIHtcbiAgICAgIHRoaXMubWV0aG9kID0gdXBsb2FkZXIub3B0aW9ucy5tZXRob2QgfHwgJ1BPU1QnO1xuICAgICAgdGhpcy5hbGlhcyA9IHVwbG9hZGVyLm9wdGlvbnMuaXRlbUFsaWFzIHx8ICdGaWxlVXBsb2FkJztcbiAgICB9XG4gICAgdGhpcy51cmwgPSB1cGxvYWRlci5vcHRpb25zLnVybDtcbiAgfVxuXG4gIHB1YmxpYyB1cGxvYWQoKTogdm9pZCB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMudXBsb2FkZXIudXBsb2FkSXRlbSh0aGlzKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aGlzLnVwbG9hZGVyLl9vbkNvbXBsZXRlSXRlbSh0aGlzLCAnJywgMCwge30pO1xuICAgICAgdGhpcy51cGxvYWRlci5fb25FcnJvckl0ZW0odGhpcywgJycsIDAsIHt9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgY2FuY2VsKCk6IHZvaWQge1xuICAgIHRoaXMudXBsb2FkZXIuY2FuY2VsSXRlbSh0aGlzKTtcbiAgfVxuXG4gIHB1YmxpYyByZW1vdmUoKTogdm9pZCB7XG4gICAgdGhpcy51cGxvYWRlci5yZW1vdmVGcm9tUXVldWUodGhpcyk7XG4gIH1cblxuICBwdWJsaWMgb25CZWZvcmVVcGxvYWQoKTogdm9pZCB7XG4gICAgcmV0dXJuIHZvaWQgMDtcbiAgfVxuXG4gIHB1YmxpYyBvbkJ1aWxkRm9ybShmb3JtOiBhbnkpOiBhbnkge1xuICAgIHJldHVybiB7IGZvcm0gfTtcbiAgfVxuXG4gIHB1YmxpYyBvblByb2dyZXNzKHByb2dyZXNzOiBudW1iZXIpOiBhbnkge1xuICAgIHJldHVybiB7IHByb2dyZXNzIH07XG4gIH1cblxuICBwdWJsaWMgb25TdWNjZXNzKHJlc3BvbnNlOiBzdHJpbmcsIHN0YXR1czogbnVtYmVyLCBoZWFkZXJzOiBQYXJzZWRSZXNwb25zZUhlYWRlcnMpOiBhbnkge1xuICAgIHJldHVybiB7IHJlc3BvbnNlLCBzdGF0dXMsIGhlYWRlcnMgfTtcbiAgfVxuXG4gIHB1YmxpYyBvbkVycm9yKHJlc3BvbnNlOiBzdHJpbmcsIHN0YXR1czogbnVtYmVyLCBoZWFkZXJzOiBQYXJzZWRSZXNwb25zZUhlYWRlcnMpOiBhbnkge1xuICAgIHJldHVybiB7IHJlc3BvbnNlLCBzdGF0dXMsIGhlYWRlcnMgfTtcbiAgfVxuXG4gIHB1YmxpYyBvbkNhbmNlbChyZXNwb25zZTogc3RyaW5nLCBzdGF0dXM6IG51bWJlciwgaGVhZGVyczogUGFyc2VkUmVzcG9uc2VIZWFkZXJzKTogYW55IHtcbiAgICByZXR1cm4geyByZXNwb25zZSwgc3RhdHVzLCBoZWFkZXJzIH07XG4gIH1cblxuICBwdWJsaWMgb25Db21wbGV0ZShyZXNwb25zZTogc3RyaW5nLCBzdGF0dXM6IG51bWJlciwgaGVhZGVyczogUGFyc2VkUmVzcG9uc2VIZWFkZXJzKTogYW55IHtcbiAgICByZXR1cm4geyByZXNwb25zZSwgc3RhdHVzLCBoZWFkZXJzIH07XG4gIH1cblxuICBwdWJsaWMgX29uQmVmb3JlVXBsb2FkKCk6IHZvaWQge1xuICAgIHRoaXMuaXNSZWFkeSA9IHRydWU7XG4gICAgdGhpcy5pc1VwbG9hZGluZyA9IHRydWU7XG4gICAgdGhpcy5pc1VwbG9hZGVkID0gZmFsc2U7XG4gICAgdGhpcy5pc1N1Y2Nlc3MgPSBmYWxzZTtcbiAgICB0aGlzLmlzQ2FuY2VsID0gZmFsc2U7XG4gICAgdGhpcy5pc0Vycm9yID0gZmFsc2U7XG4gICAgdGhpcy5wcm9ncmVzcyA9IDA7XG4gICAgdGhpcy5vbkJlZm9yZVVwbG9hZCgpO1xuICB9XG5cbiAgcHVibGljIF9vbkJ1aWxkRm9ybShmb3JtOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLm9uQnVpbGRGb3JtKGZvcm0pO1xuICB9XG5cbiAgcHVibGljIF9vblByb2dyZXNzKHByb2dyZXNzOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLnByb2dyZXNzID0gcHJvZ3Jlc3M7XG4gICAgdGhpcy5vblByb2dyZXNzKHByb2dyZXNzKTtcbiAgfVxuXG4gIHB1YmxpYyBfb25TdWNjZXNzKHJlc3BvbnNlOiBzdHJpbmcsIHN0YXR1czogbnVtYmVyLCBoZWFkZXJzOiBQYXJzZWRSZXNwb25zZUhlYWRlcnMpOiB2b2lkIHtcbiAgICB0aGlzLmlzUmVhZHkgPSBmYWxzZTtcbiAgICB0aGlzLmlzVXBsb2FkaW5nID0gZmFsc2U7XG4gICAgdGhpcy5pc1VwbG9hZGVkID0gdHJ1ZTtcbiAgICB0aGlzLmlzU3VjY2VzcyA9IHRydWU7XG4gICAgdGhpcy5pc0NhbmNlbCA9IGZhbHNlO1xuICAgIHRoaXMuaXNFcnJvciA9IGZhbHNlO1xuICAgIHRoaXMucHJvZ3Jlc3MgPSAxMDA7XG4gICAgdGhpcy5pbmRleCA9IHZvaWQgMDtcbiAgICB0aGlzLm9uU3VjY2VzcyhyZXNwb25zZSwgc3RhdHVzLCBoZWFkZXJzKTtcbiAgfVxuXG4gIHB1YmxpYyBfb25FcnJvcihyZXNwb25zZTogc3RyaW5nLCBzdGF0dXM6IG51bWJlciwgaGVhZGVyczogUGFyc2VkUmVzcG9uc2VIZWFkZXJzKTogdm9pZCB7XG4gICAgdGhpcy5pc1JlYWR5ID0gZmFsc2U7XG4gICAgdGhpcy5pc1VwbG9hZGluZyA9IGZhbHNlO1xuICAgIHRoaXMuaXNVcGxvYWRlZCA9IHRydWU7XG4gICAgdGhpcy5pc1N1Y2Nlc3MgPSBmYWxzZTtcbiAgICB0aGlzLmlzQ2FuY2VsID0gZmFsc2U7XG4gICAgdGhpcy5pc0Vycm9yID0gdHJ1ZTtcbiAgICB0aGlzLnByb2dyZXNzID0gMDtcbiAgICB0aGlzLmluZGV4ID0gdm9pZCAwO1xuICAgIHRoaXMub25FcnJvcihyZXNwb25zZSwgc3RhdHVzLCBoZWFkZXJzKTtcbiAgfVxuXG4gIHB1YmxpYyBfb25DYW5jZWwocmVzcG9uc2U6IHN0cmluZywgc3RhdHVzOiBudW1iZXIsIGhlYWRlcnM6IFBhcnNlZFJlc3BvbnNlSGVhZGVycyk6IHZvaWQge1xuICAgIHRoaXMuaXNSZWFkeSA9IGZhbHNlO1xuICAgIHRoaXMuaXNVcGxvYWRpbmcgPSBmYWxzZTtcbiAgICB0aGlzLmlzVXBsb2FkZWQgPSBmYWxzZTtcbiAgICB0aGlzLmlzU3VjY2VzcyA9IGZhbHNlO1xuICAgIHRoaXMuaXNDYW5jZWwgPSB0cnVlO1xuICAgIHRoaXMuaXNFcnJvciA9IGZhbHNlO1xuICAgIHRoaXMucHJvZ3Jlc3MgPSAwO1xuICAgIHRoaXMuaW5kZXggPSB2b2lkIDA7XG4gICAgdGhpcy5vbkNhbmNlbChyZXNwb25zZSwgc3RhdHVzLCBoZWFkZXJzKTtcbiAgfVxuXG4gIHB1YmxpYyBfb25Db21wbGV0ZShyZXNwb25zZTogc3RyaW5nLCBzdGF0dXM6IG51bWJlciwgaGVhZGVyczogUGFyc2VkUmVzcG9uc2VIZWFkZXJzKTogdm9pZCB7XG4gICAgdGhpcy5vbkNvbXBsZXRlKHJlc3BvbnNlLCBzdGF0dXMsIGhlYWRlcnMpO1xuXG4gICAgaWYgKHRoaXMudXBsb2FkZXIub3B0aW9ucy5yZW1vdmVBZnRlclVwbG9hZCkge1xuICAgICAgdGhpcy5yZW1vdmUoKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgX3ByZXBhcmVUb1VwbG9hZGluZygpOiB2b2lkIHtcbiAgICB0aGlzLmluZGV4ID0gdGhpcy5pbmRleCB8fCArK3RoaXMudXBsb2FkZXIuX25leHRJbmRleDtcbiAgICB0aGlzLmlzUmVhZHkgPSB0cnVlO1xuICB9XG59XG4iXX0=