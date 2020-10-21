/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { FileLikeObject } from './file-like-object.class';
export class FileItem {
    /**
     * @param {?} uploader
     * @param {?} some
     * @param {?} options
     */
    constructor(uploader, some, options) {
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
    upload() {
        try {
            this.uploader.uploadItem(this);
        }
        catch (e) {
            this.uploader._onCompleteItem(this, '', 0, {});
            this.uploader._onErrorItem(this, '', 0, {});
        }
    }
    /**
     * @return {?}
     */
    cancel() {
        this.uploader.cancelItem(this);
    }
    /**
     * @return {?}
     */
    remove() {
        this.uploader.removeFromQueue(this);
    }
    /**
     * @return {?}
     */
    onBeforeUpload() {
        return void 0;
    }
    /**
     * @param {?} form
     * @return {?}
     */
    onBuildForm(form) {
        return { form };
    }
    /**
     * @param {?} progress
     * @return {?}
     */
    onProgress(progress) {
        return { progress };
    }
    /**
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    onSuccess(response, status, headers) {
        return { response, status, headers };
    }
    /**
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    onError(response, status, headers) {
        return { response, status, headers };
    }
    /**
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    onCancel(response, status, headers) {
        return { response, status, headers };
    }
    /**
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    onComplete(response, status, headers) {
        return { response, status, headers };
    }
    /**
     * @return {?}
     */
    _onBeforeUpload() {
        this.isReady = true;
        this.isUploading = true;
        this.isUploaded = false;
        this.isSuccess = false;
        this.isCancel = false;
        this.isError = false;
        this.progress = 0;
        this.onBeforeUpload();
    }
    /**
     * @param {?} form
     * @return {?}
     */
    _onBuildForm(form) {
        this.onBuildForm(form);
    }
    /**
     * @param {?} progress
     * @return {?}
     */
    _onProgress(progress) {
        this.progress = progress;
        this.onProgress(progress);
    }
    /**
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    _onSuccess(response, status, headers) {
        this.isReady = false;
        this.isUploading = false;
        this.isUploaded = true;
        this.isSuccess = true;
        this.isCancel = false;
        this.isError = false;
        this.progress = 100;
        this.index = void 0;
        this.onSuccess(response, status, headers);
    }
    /**
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    _onError(response, status, headers) {
        this.isReady = false;
        this.isUploading = false;
        this.isUploaded = true;
        this.isSuccess = false;
        this.isCancel = false;
        this.isError = true;
        this.progress = 0;
        this.index = void 0;
        this.onError(response, status, headers);
    }
    /**
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    _onCancel(response, status, headers) {
        this.isReady = false;
        this.isUploading = false;
        this.isUploaded = false;
        this.isSuccess = false;
        this.isCancel = true;
        this.isError = false;
        this.progress = 0;
        this.index = void 0;
        this.onCancel(response, status, headers);
    }
    /**
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    _onComplete(response, status, headers) {
        this.onComplete(response, status, headers);
        if (this.uploader.options.removeAfterUpload) {
            this.remove();
        }
    }
    /**
     * @return {?}
     */
    _prepareToUploading() {
        this.index = this.index || ++this.uploader._nextIndex;
        this.isReady = true;
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1pdGVtLmNsYXNzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC11aS8iLCJzb3VyY2VzIjpbInNyYy9maWxlLXVwbG9hZC9maWxlLWl0ZW0uY2xhc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUcxRCxNQUFNLE9BQU8sUUFBUTs7Ozs7O0lBd0JuQixZQUFtQixRQUFzQixFQUFFLElBQVUsRUFBRSxPQUE0QjtRQXBCNUUsUUFBRyxHQUFXLEdBQUcsQ0FBQztRQUVsQixZQUFPLEdBQVEsRUFBRSxDQUFDO1FBQ2xCLG9CQUFlLEdBQVksSUFBSSxDQUFDO1FBQ2hDLGFBQVEsR0FBUSxFQUFFLENBQUM7UUFDbkIsWUFBTyxHQUFZLEtBQUssQ0FBQztRQUN6QixnQkFBVyxHQUFZLEtBQUssQ0FBQztRQUM3QixlQUFVLEdBQVksS0FBSyxDQUFDO1FBQzVCLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFDM0IsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUMxQixZQUFPLEdBQVksS0FBSyxDQUFDO1FBQ3pCLGFBQVEsR0FBVyxDQUFDLENBQUM7UUFDckIsVUFBSyxHQUFXLEtBQUssQ0FBQyxDQUFDO1FBUzVCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDbEIsSUFBSSxRQUFRLENBQUMsT0FBTyxFQUFFO1lBQ3BCLElBQUksQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDO1lBQ2hELElBQUksQ0FBQyxLQUFLLEdBQUcsUUFB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bSAnLi9maWxlLWxpa2Utb2JqZWN0LmNsYXNzJztcbmltcG9ydCB7IEZpbGVVcGxvYWRlciwgUGFyc2VkUmVzcG9uc2VIZWFkZXJzLCBGaWxlVXBsb2FkZXJPcHRpb25zIH0gZnJvbSAnLi9maWxlLXVwbG9hZGVyLmNsYXNzJztcblxuZXhwb3J0IGNsYXNzIEZpbGVJdGVtIHtcbiAgcHVibGljIGZpbGU6IEZpbGVMaWtlT2JqZWN0O1xuICBwdWJsaWMgX2ZpbGU6IEZpbGU7XG4gIHB1YmxpYyBhbGlhczogc3RyaW5nO1xuICBwdWJsaWMgdXJsOiBzdHJpbmcgPSAnLyc7XG4gIHB1YmxpYyBtZXRob2Q6IHN0cmluZztcbiAgcHVibGljIGhlYWRlcnM6IGFueSA9IFtdO1xuICBwdWJsaWMgd2l0aENyZWRlbnRpYWxzOiBib29sZWFuID0gdHJ1ZTtcbiAgcHVibGljIGZvcm1EYXRhOiBhbnkgPSBbXTtcbiAgcHVibGljIGlzUmVhZHk6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHVibGljIGlzVXBsb2FkaW5nOiBib29sZWFuID0gZmFsc2U7XG4gIHB1YmxpYyBpc1VwbG9hZGVkOiBib29sZWFuID0gZmFsc2U7XG4gIHB1YmxpYyBpc1N1Y2Nlc3M6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHVibGljIGlzQ2FuY2VsOiBib29sZWFuID0gZmFsc2U7XG4gIHB1YmxpYyBpc0Vycm9yOiBib29sZWFuID0gZmFsc2U7XG4gIHB1YmxpYyBwcm9ncmVzczogbnVtYmVyID0gMDtcbiAgcHVibGljIGluZGV4OiBudW1iZXIgPSB2b2lkIDA7XG4gIHB1YmxpYyBfeGhyOiBYTUxIdHRwUmVxdWVzdDtcbiAgcHVibGljIF9mb3JtOiBhbnk7XG5cbiAgcHJvdGVjdGVkIHVwbG9hZGVyOiBGaWxlVXBsb2FkZXI7XG4gIHByb3RlY3RlZCBzb21lOiBGaWxlO1xuICBwcm90ZWN0ZWQgb3B0aW9uczogRmlsZVVwbG9hZGVyT3B0aW9ucztcblxuICBwdWJsaWMgY29uc3RydWN0b3IodXBsb2FkZXI6IEZpbGVVcGxvYWRlciwgc29tZTogRmlsZSwgb3B0aW9uczogRmlsZVVwbG9hZGVyT3B0aW9ucykge1xuICAgIHRoaXMudXBsb2FkZXIgPSB1cGxvYWRlcjtcbiAgICB0aGlzLnNvbWUgPSBzb21lO1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgdGhpcy5maWxlID0gbmV3IEZpbGVMaWtlT2JqZWN0KHNvbWUpO1xuICAgIHRoaXMuX2ZpbGUgPSBzb21lO1xuICAgIGlmICh1cGxvYWRlci5vcHRpb25zKSB7XG4gICAgICB0aGlzLm1ldGhvZCA9IHVwbG9hZGVyLm9wdGlvbnMubWV0aG9kIHx8ICdQT1NUJztcbiAgICAgIHRoaXMuYWxpYXMgPSB1cGxvYWRlci5vcHRpb25zLml0ZW1BbGlhcyB8fCAnRmlsZVVwbG9hZCc7XG4gICAgfVxuICAgIHRoaXMudXJsID0gdXBsb2FkZXIub3B0aW9ucy51cmw7XG4gIH1cblxuICBwdWJsaWMgdXBsb2FkKCk6IHZvaWQge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLnVwbG9hZGVyLnVwbG9hZEl0ZW0odGhpcyk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdGhpcy51cGxvYWRlci5fb25Db21wbGV0ZUl0ZW0odGhpcywgJycsIDAsIHt9KTtcbiAgICAgIHRoaXMudXBsb2FkZXIuX29uRXJyb3JJdGVtKHRoaXMsICcnLCAwLCB7fSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGNhbmNlbCgpOiB2b2lkIHtcbiAgICB0aGlzLnVwbG9hZGVyLmNhbmNlbEl0ZW0odGhpcyk7XG4gIH1cblxuICBwdWJsaWMgcmVtb3ZlKCk6IHZvaWQge1xuICAgIHRoaXMudXBsb2FkZXIucmVtb3ZlRnJvbVF1ZXVlKHRoaXMpO1xuICB9XG5cbiAgcHVibGljIG9uQmVmb3JlVXBsb2FkKCk6IHZvaWQge1xuICAgIHJldHVybiB2b2lkIDA7XG4gIH1cblxuICBwdWJsaWMgb25CdWlsZEZvcm0oZm9ybTogYW55KTogYW55IHtcbiAgICByZXR1cm4geyBmb3JtIH07XG4gIH1cblxuICBwdWJsaWMgb25Qcm9ncmVzcyhwcm9ncmVzczogbnVtYmVyKTogYW55IHtcbiAgICByZXR1cm4geyBwcm9ncmVzcyB9O1xuICB9XG5cbiAgcHVibGljIG9uU3VjY2VzcyhyZXNwb25zZTogc3RyaW5nLCBzdGF0dXM6IG51bWJlciwgaGVhZGVyczogUGFyc2VkUmVzcG9uc2VIZWFkZXJzKTogYW55IHtcbiAgICByZXR1cm4geyByZXNwb25zZSwgc3RhdHVzLCBoZWFkZXJzIH07XG4gIH1cblxuICBwdWJsaWMgb25FcnJvcihyZXNwb25zZTogc3RyaW5nLCBzdGF0dXM6IG51bWJlciwgaGVhZGVyczogUGFyc2VkUmVzcG9uc2VIZWFkZXJzKTogYW55IHtcbiAgICByZXR1cm4geyByZXNwb25zZSwgc3RhdHVzLCBoZWFkZXJzIH07XG4gIH1cblxuICBwdWJsaWMgb25DYW5jZWwocmVzcG9uc2U6IHN0cmluZywgc3RhdHVzOiBudW1iZXIsIGhlYWRlcnM6IFBhcnNlZFJlc3BvbnNlSGVhZGVycyk6IGFueSB7XG4gICAgcmV0dXJuIHsgcmVzcG9uc2UsIHN0YXR1cywgaGVhZGVycyB9O1xuICB9XG5cbiAgcHVibGljIG9uQ29tcGxldGUocmVzcG9uc2U6IHN0cmluZywgc3RhdHVzOiBudW1iZXIsIGhlYWRlcnM6IFBhcnNlZFJlc3BvbnNlSGVhZGVycyk6IGFueSB7XG4gICAgcmV0dXJuIHsgcmVzcG9uc2UsIHN0YXR1cywgaGVhZGVycyB9O1xuICB9XG5cbiAgcHVibGljIF9vbkJlZm9yZVVwbG9hZCgpOiB2b2lkIHtcbiAgICB0aGlzLmlzUmVhZHkgPSB0cnVlO1xuICAgIHRoaXMuaXNVcGxvYWRpbmcgPSB0cnVlO1xuICAgIHRoaXMuaXNVcGxvYWRlZCA9IGZhbHNlO1xuICAgIHRoaXMuaXNTdWNjZXNzID0gZmFsc2U7XG4gICAgdGhpcy5pc0NhbmNlbCA9IGZhbHNlO1xuICAgIHRoaXMuaXNFcnJvciA9IGZhbHNlO1xuICAgIHRoaXMucHJvZ3Jlc3MgPSAwO1xuICAgIHRoaXMub25CZWZvcmVVcGxvYWQoKTtcbiAgfVxuXG4gIHB1YmxpYyBfb25CdWlsZEZvcm0oZm9ybTogYW55KTogdm9pZCB7XG4gICAgdGhpcy5vbkJ1aWxkRm9ybShmb3JtKTtcbiAgfVxuXG4gIHB1YmxpYyBfb25Qcm9ncmVzcyhwcm9ncmVzczogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5wcm9ncmVzcyA9IHByb2dyZXNzO1xuICAgIHRoaXMub25Qcm9ncmVzcyhwcm9ncmVzcyk7XG4gIH1cblxuICBwdWJsaWMgX29uU3VjY2VzcyhyZXNwb25zZTogc3RyaW5nLCBzdGF0dXM6IG51bWJlciwgaGVhZGVyczogUGFyc2VkUmVzcG9uc2VIZWFkZXJzKTogdm9pZCB7XG4gICAgdGhpcy5pc1JlYWR5ID0gZmFsc2U7XG4gICAgdGhpcy5pc1VwbG9hZGluZyA9IGZhbHNlO1xuICAgIHRoaXMuaXNVcGxvYWRlZCA9IHRydWU7XG4gICAgdGhpcy5pc1N1Y2Nlc3MgPSB0cnVlO1xuICAgIHRoaXMuaXNDYW5jZWwgPSBmYWxzZTtcbiAgICB0aGlzLmlzRXJyb3IgPSBmYWxzZTtcbiAgICB0aGlzLnByb2dyZXNzID0gMTAwO1xuICAgIHRoaXMuaW5kZXggPSB2b2lkIDA7XG4gICAgdGhpcy5vblN1Y2Nlc3MocmVzcG9uc2UsIHN0YXR1cywgaGVhZGVycyk7XG4gIH1cblxuICBwdWJsaWMgX29uRXJyb3IocmVzcG9uc2U6IHN0cmluZywgc3RhdHVzOiBudW1iZXIsIGhlYWRlcnM6IFBhcnNlZFJlc3BvbnNlSGVhZGVycyk6IHZvaWQge1xuICAgIHRoaXMuaXNSZWFkeSA9IGZhbHNlO1xuICAgIHRoaXMuaXNVcGxvYWRpbmcgPSBmYWxzZTtcbiAgICB0aGlzLmlzVXBsb2FkZWQgPSB0cnVlO1xuICAgIHRoaXMuaXNTdWNjZXNzID0gZmFsc2U7XG4gICAgdGhpcy5pc0NhbmNlbCA9IGZhbHNlO1xuICAgIHRoaXMuaXNFcnJvciA9IHRydWU7XG4gICAgdGhpcy5wcm9ncmVzcyA9IDA7XG4gICAgdGhpcy5pbmRleCA9IHZvaWQgMDtcbiAgICB0aGlzLm9uRXJyb3IocmVzcG9uc2UsIHN0YXR1cywgaGVhZGVycyk7XG4gIH1cblxuICBwdWJsaWMgX29uQ2FuY2VsKHJlc3BvbnNlOiBzdHJpbmcsIHN0YXR1czogbnVtYmVyLCBoZWFkZXJzOiBQYXJzZWRSZXNwb25zZUhlYWRlcnMpOiB2b2lkIHtcbiAgICB0aGlzLmlzUmVhZHkgPSBmYWxzZTtcbiAgICB0aGlzLmlzVXBsb2FkaW5nID0gZmFsc2U7XG4gICAgdGhpcy5pc1VwbG9hZGVkID0gZmFsc2U7XG4gICAgdGhpcy5pc1N1Y2Nlc3MgPSBmYWxzZTtcbiAgICB0aGlzLmlzQ2FuY2VsID0gdHJ1ZTtcbiAgICB0aGlzLmlzRXJyb3IgPSBmYWxzZTtcbiAgICB0aGlzLnByb2dyZXNzID0gMDtcbiAgICB0aGlzLmluZGV4ID0gdm9pZCAwO1xuICAgIHRoaXMub25DYW5jZWwocmVzcG9uc2UsIHN0YXR1cywgaGVhZGVycyk7XG4gIH1cblxuICBwdWJsaWMgX29uQ29tcGxldGUocmVzcG9uc2U6IHN0cmluZywgc3RhdHVzOiBudW1iZXIsIGhlYWRlcnM6IFBhcnNlZFJlc3BvbnNlSGVhZGVycyk6IHZvaWQge1xuICAgIHRoaXMub25Db21wbGV0ZShyZXNwb25zZSwgc3RhdHVzLCBoZWFkZXJzKTtcblxuICAgIGlmICh0aGlzLnVwbG9hZGVyLm9wdGlvbnMucmVtb3ZlQWZ0ZXJVcGxvYWQpIHtcbiAgICAgIHRoaXMucmVtb3ZlKCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIF9wcmVwYXJlVG9VcGxvYWRpbmcoKTogdm9pZCB7XG4gICAgdGhpcy5pbmRleCA9IHRoaXMuaW5kZXggfHwgKyt0aGlzLnVwbG9hZGVyLl9uZXh0SW5kZXg7XG4gICAgdGhpcy5pc1JlYWR5ID0gdHJ1ZTtcbiAgfVxufVxuIl19