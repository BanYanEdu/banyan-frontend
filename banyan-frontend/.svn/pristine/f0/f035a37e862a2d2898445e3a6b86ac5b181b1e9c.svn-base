/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { EventEmitter } from '@angular/core';
import { FileLikeObject } from './file-like-object.class';
import { FileItem } from './file-item.class';
import { FileType } from './file-type.class';
/**
 * @param {?} value
 * @return {?}
 */
function isFile(value) {
    return (File && value instanceof File);
}
/**
 * @record
 */
export function Headers() { }
if (false) {
    /** @type {?} */
    Headers.prototype.name;
    /** @type {?} */
    Headers.prototype.value;
}
/**
 * @record
 */
export function FileUploaderOptions() { }
if (false) {
    /** @type {?|undefined} */
    FileUploaderOptions.prototype.allowedMimeType;
    /** @type {?|undefined} */
    FileUploaderOptions.prototype.allowedFileType;
    /** @type {?|undefined} */
    FileUploaderOptions.prototype.autoUpload;
    /** @type {?|undefined} */
    FileUploaderOptions.prototype.isHTML5;
    /** @type {?|undefined} */
    FileUploaderOptions.prototype.filters;
    /** @type {?|undefined} */
    FileUploaderOptions.prototype.headers;
    /** @type {?|undefined} */
    FileUploaderOptions.prototype.method;
    /** @type {?|undefined} */
    FileUploaderOptions.prototype.authToken;
    /** @type {?|undefined} */
    FileUploaderOptions.prototype.maxFileSize;
    /** @type {?|undefined} */
    FileUploaderOptions.prototype.queueLimit;
    /** @type {?|undefined} */
    FileUploaderOptions.prototype.removeAfterUpload;
    /** @type {?|undefined} */
    FileUploaderOptions.prototype.url;
    /** @type {?|undefined} */
    FileUploaderOptions.prototype.disableMultipart;
    /** @type {?|undefined} */
    FileUploaderOptions.prototype.itemAlias;
    /** @type {?|undefined} */
    FileUploaderOptions.prototype.authTokenHeader;
    /** @type {?|undefined} */
    FileUploaderOptions.prototype.additionalParameter;
    /** @type {?|undefined} */
    FileUploaderOptions.prototype.parametersBeforeFiles;
    /** @type {?|undefined} */
    FileUploaderOptions.prototype.formatDataFunction;
    /** @type {?|undefined} */
    FileUploaderOptions.prototype.formatDataFunctionIsAsync;
}
export class FileUploader {
    /**
     * @param {?} options
     */
    constructor(options) {
        this.isUploading = false;
        this.queue = [];
        this.progress = 0;
        this._nextIndex = 0;
        this.options = {
            autoUpload: false,
            isHTML5: true,
            filters: [],
            removeAfterUpload: false,
            disableMultipart: false,
            formatDataFunction: (/**
             * @param {?} item
             * @return {?}
             */
            (item) => item._file),
            formatDataFunctionIsAsync: false
        };
        this.setOptions(options);
        this.response = new EventEmitter();
    }
    /**
     * @param {?} options
     * @return {?}
     */
    setOptions(options) {
        this.options = Object.assign(this.options, options);
        this.authToken = this.options.authToken;
        this.authTokenHeader = this.options.authTokenHeader || 'Authorization';
        this.autoUpload = this.options.autoUpload;
        this.options.filters.unshift({ name: 'queueLimit', fn: this._queueLimitFilter });
        if (this.options.maxFileSize) {
            this.options.filters.unshift({ name: 'fileSize', fn: this._fileSizeFilter });
        }
        if (this.options.allowedFileType) {
            this.options.filters.unshift({ name: 'fileType', fn: this._fileTypeFilter });
        }
        if (this.options.allowedMimeType) {
            this.options.filters.unshift({ name: 'mimeType', fn: this._mimeTypeFilter });
        }
        for (let i = 0; i < this.queue.length; i++) {
            this.queue[i].url = this.options.url;
        }
    }
    /**
     * @param {?} files
     * @param {?=} options
     * @param {?=} filters
     * @return {?}
     */
    addToQueue(files, options, filters) {
        /** @type {?} */
        let list = [];
        for (let file of files) {
            list.push(file);
        }
        /** @type {?} */
        let arrayOfFilters = this._getFilters(filters);
        /** @type {?} */
        let count = this.queue.length;
        /** @type {?} */
        let addedFileItems = [];
        list.map((/**
         * @param {?} some
         * @return {?}
         */
        (some) => {
            if (!options) {
                options = this.options;
            }
            /** @type {?} */
            let temp = new FileLikeObject(some);
            if (this._isValidFile(temp, arrayOfFilters, options)) {
                /** @type {?} */
                let fileItem = new FileItem(this, some, options);
                addedFileItems.push(fileItem);
                this.queue.push(fileItem);
                this._onAfterAddingFile(fileItem);
            }
            else {
                /** @type {?} */
                let filter = arrayOfFilters[this._failFilterIndex];
                this._onWhenAddingFileFailed(temp, filter, options);
            }
        }));
        if (this.queue.length !== count) {
            this._onAfterAddingAll(addedFileItems);
            this.progress = this._getTotalProgress();
        }
        this._render();
        if (this.options.autoUpload) {
            this.uploadAll();
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    removeFromQueue(value) {
        /** @type {?} */
        let index = this.getIndexOfItem(value);
        /** @type {?} */
        let item = this.queue[index];
        if (item.isUploading) {
            item.cancel();
        }
        this.queue.splice(index, 1);
        this.progress = this._getTotalProgress();
    }
    /**
     * @return {?}
     */
    clearQueue() {
        while (this.queue.length) {
            this.queue[0].remove();
        }
        this.progress = 0;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    uploadItem(value) {
        /** @type {?} */
        let index = this.getIndexOfItem(value);
        /** @type {?} */
        let item = this.queue[index];
        /** @type {?} */
        let transport = this.options.isHTML5 ? '_xhrTransport' : '_iframeTransport';
        item._prepareToUploading();
        if (this.isUploading) {
            return;
        }
        this.isUploading = true;
        ((/** @type {?} */ (this)))[transport](item);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    cancelItem(value) {
        /** @type {?} */
        let index = this.getIndexOfItem(value);
        /** @type {?} */
        let item = this.queue[index];
        /** @type {?} */
        let prop = this.options.isHTML5 ? item._xhr : item._form;
        if (item && item.isUploading) {
            prop.abort();
        }
    }
    /**
     * @return {?}
     */
    uploadAll() {
        /** @type {?} */
        let items = this.getNotUploadedItems().filter((/**
         * @param {?} item
         * @return {?}
         */
        (item) => !item.isUploading));
        if (!items.length) {
            return;
        }
        items.map((/**
         * @param {?} item
         * @return {?}
         */
        (item) => item._prepareToUploading()));
        items[0].upload();
    }
    /**
     * @return {?}
     */
    cancelAll() {
        /** @type {?} */
        let items = this.getNotUploadedItems();
        items.map((/**
         * @param {?} item
         * @return {?}
         */
        (item) => item.cancel()));
    }
    /**
     * @param {?} value
     * @return {?}
     */
    isFile(value) {
        return isFile(value);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    isFileLikeObject(value) {
        return value instanceof FileLikeObject;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    getIndexOfItem(value) {
        return typeof value === 'number' ? value : this.queue.indexOf(value);
    }
    /**
     * @return {?}
     */
    getNotUploadedItems() {
        return this.queue.filter((/**
         * @param {?} item
         * @return {?}
         */
        (item) => !item.isUploaded));
    }
    /**
     * @return {?}
     */
    getReadyItems() {
        return this.queue
            .filter((/**
         * @param {?} item
         * @return {?}
         */
        (item) => (item.isReady && !item.isUploading)))
            .sort((/**
         * @param {?} item1
         * @param {?} item2
         * @return {?}
         */
        (item1, item2) => item1.index - item2.index));
    }
    /**
     * @return {?}
     */
    destroy() {
        return void 0;
    }
    /**
     * @param {?} fileItems
     * @return {?}
     */
    onAfterAddingAll(fileItems) {
        return { fileItems };
    }
    /**
     * @param {?} fileItem
     * @param {?} form
     * @return {?}
     */
    onBuildItemForm(fileItem, form) {
        return { fileItem, form };
    }
    /**
     * @param {?} fileItem
     * @return {?}
     */
    onAfterAddingFile(fileItem) {
        return { fileItem };
    }
    /**
     * @param {?} item
     * @param {?} filter
     * @param {?} options
     * @return {?}
     */
    onWhenAddingFileFailed(item, filter, options) {
        return { item, filter, options };
    }
    /**
     * @param {?} fileItem
     * @return {?}
     */
    onBeforeUploadItem(fileItem) {
        return { fileItem };
    }
    /**
     * @param {?} fileItem
     * @param {?} progress
     * @return {?}
     */
    onProgressItem(fileItem, progress) {
        return { fileItem, progress };
    }
    /**
     * @param {?} progress
     * @return {?}
     */
    onProgressAll(progress) {
        return { progress };
    }
    /**
     * @param {?} item
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    onSuccessItem(item, response, status, headers) {
        return { item, response, status, headers };
    }
    /**
     * @param {?} item
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    onErrorItem(item, response, status, headers) {
        return { item, response, status, headers };
    }
    /**
     * @param {?} item
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    onCancelItem(item, response, status, headers) {
        return { item, response, status, headers };
    }
    /**
     * @param {?} item
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    onCompleteItem(item, response, status, headers) {
        return { item, response, status, headers };
    }
    /**
     * @return {?}
     */
    onCompleteAll() {
        return void 0;
    }
    /**
     * @param {?} item
     * @return {?}
     */
    _mimeTypeFilter(item) {
        return !(this.options.allowedMimeType && this.options.allowedMimeType.indexOf(item.type) === -1);
    }
    /**
     * @param {?} item
     * @return {?}
     */
    _fileSizeFilter(item) {
        return !(this.options.maxFileSize && item.size > this.options.maxFileSize);
    }
    /**
     * @param {?} item
     * @return {?}
     */
    _fileTypeFilter(item) {
        return !(this.options.allowedFileType &&
            this.options.allowedFileType.indexOf(FileType.getMimeClass(item)) === -1);
    }
    /**
     * @param {?} item
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    _onErrorItem(item, response, status, headers) {
        item._onError(response, status, headers);
        this.onErrorItem(item, response, status, headers);
    }
    /**
     * @param {?} item
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    _onCompleteItem(item, response, status, headers) {
        item._onComplete(response, status, headers);
        this.onCompleteItem(item, response, status, headers);
        /** @type {?} */
        let nextItem = this.getReadyItems()[0];
        this.isUploading = false;
        if (nextItem) {
            nextItem.upload();
            return;
        }
        this.onCompleteAll();
        this.progress = this._getTotalProgress();
        this._render();
    }
    /**
     * @protected
     * @param {?} parsedHeaders
     * @return {?}
     */
    _headersGetter(parsedHeaders) {
        return (/**
         * @param {?} name
         * @return {?}
         */
        (name) => {
            if (name) {
                return parsedHeaders[name.toLowerCase()] || void 0;
            }
            return parsedHeaders;
        });
    }
    /**
     * @protected
     * @param {?} item
     * @return {?}
     */
    _xhrTransport(item) {
        /** @type {?} */
        let that = this;
        /** @type {?} */
        let xhr = item._xhr = new XMLHttpRequest();
        /** @type {?} */
        let sendable;
        this._onBeforeUploadItem(item);
        if (typeof item._file.size !== 'number') {
            throw new TypeError('The file specified is no longer valid');
        }
        if (!this.options.disableMultipart) {
            sendable = new FormData();
            this._onBuildItemForm(item, sendable);
            /** @type {?} */
            const appendFile = (/**
             * @return {?}
             */
            () => sendable.append(item.alias, item._file, item.file.name));
            if (!this.options.parametersBeforeFiles) {
                appendFile();
            }
            // For AWS, Additional Parameters must come BEFORE Files
            if (this.options.additionalParameter !== undefined) {
                Object.keys(this.options.additionalParameter).forEach((/**
                 * @param {?} key
                 * @return {?}
                 */
                (key) => {
                    /** @type {?} */
                    let paramVal = this.options.additionalParameter[key];
                    // Allow an additional parameter to include the filename
                    if (typeof paramVal === 'string' && paramVal.indexOf('{{file_name}}') >= 0) {
                        paramVal = paramVal.replace('{{file_name}}', item.file.name);
                    }
                    sendable.append(key, paramVal);
                }));
            }
            if (this.options.parametersBeforeFiles) {
                appendFile();
            }
        }
        else {
            sendable = this.options.formatDataFunction(item);
        }
        xhr.upload.onprogress = (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            /** @type {?} */
            let progress = Math.round(event.lengthComputable ? event.loaded * 100 / event.total : 0);
            this._onProgressItem(item, progress);
        });
        xhr.onload = (/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            let headers = this._parseHeaders(xhr.getAllResponseHeaders());
            /** @type {?} */
            let response = this._transformResponse(xhr.response, headers);
            /** @type {?} */
            let gist = this._isSuccessCode(xhr.status) ? 'Success' : 'Error';
            /** @type {?} */
            let method = '_on' + gist + 'Item';
            ((/** @type {?} */ (this)))[method](item, response, xhr.status, headers);
            this._onCompleteItem(item, response, xhr.status, headers);
        });
        xhr.onerror = (/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            let headers = this._parseHeaders(xhr.getAllResponseHeaders());
            /** @type {?} */
            let response = this._transformResponse(xhr.response, headers);
            this._onErrorItem(item, response, xhr.status, headers);
            this._onCompleteItem(item, response, xhr.status, headers);
        });
        xhr.onabort = (/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            let headers = this._parseHeaders(xhr.getAllResponseHeaders());
            /** @type {?} */
            let response = this._transformResponse(xhr.response, headers);
            this._onCancelItem(item, response, xhr.status, headers);
            this._onCompleteItem(item, response, xhr.status, headers);
        });
        xhr.open(item.method, item.url, true);
        xhr.withCredentials = item.withCredentials;
        if (this.options.headers) {
            for (let header of this.options.headers) {
                xhr.setRequestHeader(header.name, header.value);
            }
        }
        if (item.headers.length) {
            for (let header of item.headers) {
                xhr.setRequestHeader(header.name, header.value);
            }
        }
        if (this.authToken) {
            xhr.setRequestHeader(this.authTokenHeader, this.authToken);
        }
        xhr.onreadystatechange = (/**
         * @return {?}
         */
        function () {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                that.response.emit(xhr.responseText);
            }
        });
        if (this.options.formatDataFunctionIsAsync) {
            sendable.then((/**
             * @param {?} result
             * @return {?}
             */
            (result) => xhr.send(JSON.stringify(result))));
        }
        else {
            xhr.send(sendable);
        }
        this._render();
    }
    /**
     * @protected
     * @param {?=} value
     * @return {?}
     */
    _getTotalProgress(value = 0) {
        if (this.options.removeAfterUpload) {
            return value;
        }
        /** @type {?} */
        let notUploaded = this.getNotUploadedItems().length;
        /** @type {?} */
        let uploaded = notUploaded ? this.queue.length - notUploaded : this.queue.length;
        /** @type {?} */
        let ratio = 100 / this.queue.length;
        /** @type {?} */
        let current = value * ratio / 100;
        return Math.round(uploaded * ratio + current);
    }
    /**
     * @protected
     * @param {?} filters
     * @return {?}
     */
    _getFilters(filters) {
        if (!filters) {
            return this.options.filters;
        }
        if (Array.isArray(filters)) {
            return filters;
        }
        if (typeof filters === 'string') {
            /** @type {?} */
            let names = filters.match(/[^\s,]+/g);
            return this.options.filters
                .filter((/**
             * @param {?} filter
             * @return {?}
             */
            (filter) => names.indexOf(filter.name) !== -1));
        }
        return this.options.filters;
    }
    /**
     * @protected
     * @return {?}
     */
    _render() {
        return void 0;
    }
    /**
     * @protected
     * @return {?}
     */
    _queueLimitFilter() {
        return this.options.queueLimit === undefined || this.queue.length < this.options.queueLimit;
    }
    /**
     * @protected
     * @param {?} file
     * @param {?} filters
     * @param {?} options
     * @return {?}
     */
    _isValidFile(file, filters, options) {
        this._failFilterIndex = -1;
        return !filters.length ? true : filters.every((/**
         * @param {?} filter
         * @return {?}
         */
        (filter) => {
            this._failFilterIndex++;
            return filter.fn.call(this, file, options);
        }));
    }
    /**
     * @protected
     * @param {?} status
     * @return {?}
     */
    _isSuccessCode(status) {
        return (status >= 200 && status < 300) || status === 304;
    }
    /**
     * @protected
     * @param {?} response
     * @param {?} headers
     * @return {?}
     */
    _transformResponse(response, headers) {
        return response;
    }
    /**
     * @protected
     * @param {?} headers
     * @return {?}
     */
    _parseHeaders(headers) {
        /** @type {?} */
        let parsed = {};
        /** @type {?} */
        let key;
        /** @type {?} */
        let val;
        /** @type {?} */
        let i;
        if (!headers) {
            return parsed;
        }
        headers.split('\n').map((/**
         * @param {?} line
         * @return {?}
         */
        (line) => {
            i = line.indexOf(':');
            key = line.slice(0, i).trim().toLowerCase();
            val = line.slice(i + 1).trim();
            if (key) {
                parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
            }
        }));
        return parsed;
    }
    /**
     * @protected
     * @param {?} item
     * @param {?} filter
     * @param {?} options
     * @return {?}
     */
    _onWhenAddingFileFailed(item, filter, options) {
        this.onWhenAddingFileFailed(item, filter, options);
    }
    /**
     * @protected
     * @param {?} item
     * @return {?}
     */
    _onAfterAddingFile(item) {
        this.onAfterAddingFile(item);
    }
    /**
     * @protected
     * @param {?} items
     * @return {?}
     */
    _onAfterAddingAll(items) {
        this.onAfterAddingAll(items);
    }
    /**
     * @protected
     * @param {?} item
     * @return {?}
     */
    _onBeforeUploadItem(item) {
        item._onBeforeUpload();
        this.onBeforeUploadItem(item);
    }
    /**
     * @protected
     * @param {?} item
     * @param {?} form
     * @return {?}
     */
    _onBuildItemForm(item, form) {
        item._onBuildForm(form);
        this.onBuildItemForm(item, form);
    }
    /**
     * @protected
     * @param {?} item
     * @param {?} progress
     * @return {?}
     */
    _onProgressItem(item, progress) {
        /** @type {?} */
        let total = this._getTotalProgress(progress);
        this.progress = total;
        item._onProgress(progress);
        this.onProgressItem(item, progress);
        this.onProgressAll(total);
        this._render();
    }
    /**
     * @protected
     * @param {?} item
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    _onSuccessItem(item, response, status, headers) {
        item._onSuccess(response, status, headers);
        this.onSuccessItem(item, response, status, headers);
    }
    /**
     * @protected
     * @param {?} item
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    _onCancelItem(item, response, status, headers) {
        item._onCancel(response, status, headers);
        this.onCancelItem(item, response, status, headers);
    }
}
if (false) {
    /** @type {?} */
    FileUploader.prototype.authToken;
    /** @type {?} */
    FileUploader.prototype.isUploading;
    /** @type {?} */
    FileUploader.prototype.queue;
    /** @type {?} */
    FileUploader.prototype.progress;
    /** @type {?} */
    FileUploader.prototype._nextIndex;
    /** @type {?} */
    FileUploader.prototype.autoUpload;
    /** @type {?} */
    FileUploader.prototype.authTokenHeader;
    /** @type {?} */
    FileUploader.prototype.response;
    /** @type {?} */
    FileUploader.prototype.options;
    /**
     * @type {?}
     * @protected
     */
    FileUploader.prototype._failFilterIndex;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS11cGxvYWRlci5jbGFzcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtdWkvIiwic291cmNlcyI6WyJzcmMvZmlsZS11cGxvYWQvZmlsZS11cGxvYWRlci5jbGFzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDMUQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQzs7Ozs7QUFFN0MsU0FBUyxNQUFNLENBQUMsS0FBVTtJQUN4QixPQUFPLENBQUMsSUFBSSxJQUFJLEtBQUssWUFBWSxJQUFJLENBQUMsQ0FBQztBQUN6QyxDQUFDOzs7O0FBRUQsNkJBR0M7OztJQUZDLHVCQUFhOztJQUNiLHdCQUFjOzs7OztBQVVoQix5Q0FvQkM7OztJQW5CQyw4Q0FBMkI7O0lBQzNCLDhDQUEyQjs7SUFDM0IseUNBQXFCOztJQUNyQixzQ0FBa0I7O0lBQ2xCLHNDQUEyQjs7SUFDM0Isc0NBQW9COztJQUNwQixxQ0FBZ0I7O0lBQ2hCLHdDQUFtQjs7SUFDbkIsMENBQXFCOztJQUNyQix5Q0FBb0I7O0lBQ3BCLGdEQUE0Qjs7SUFDNUIsa0NBQWE7O0lBQ2IsK0NBQTJCOztJQUMzQix3Q0FBbUI7O0lBQ25CLDhDQUF5Qjs7SUFDekIsa0RBQStDOztJQUMvQyxvREFBZ0M7O0lBQ2hDLGlEQUE4Qjs7SUFDOUIsd0RBQW9DOztBQUd0QyxNQUFNLE9BQU8sWUFBWTs7OztJQXVCdkIsWUFBbUIsT0FBNEI7UUFwQnhDLGdCQUFXLEdBQVksS0FBSyxDQUFDO1FBQzdCLFVBQUssR0FBZSxFQUFFLENBQUM7UUFDdkIsYUFBUSxHQUFXLENBQUMsQ0FBQztRQUNyQixlQUFVLEdBQVcsQ0FBQyxDQUFDO1FBS3ZCLFlBQU8sR0FB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O1FBQ3RHLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztRQUMxQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3JELENBQUM7Q0FDRjs7O0lBcGNDLGlDQUF5Qjs7SUFDekIsbUNBQW9DOztJQUNwQyw2QkFBOEI7O0lBQzlCLGdDQUE0Qjs7SUFDNUIsa0NBQThCOztJQUM5QixrQ0FBdUI7O0lBQ3ZCLHVDQUErQjs7SUFDL0IsZ0NBQW1DOztJQUVuQywrQkFRRTs7Ozs7SUFFRix3Q0FBbUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZpbGVMaWtlT2JqZWN0IH0gZnJvbSAnLi9maWxlLWxpa2Utb2JqZWN0LmNsYXNzJztcbmltcG9ydCB7IEZpbGVJdGVtIH0gZnJvbSAnLi9maWxlLWl0ZW0uY2xhc3MnO1xuaW1wb3J0IHsgRmlsZVR5cGUgfSBmcm9tICcuL2ZpbGUtdHlwZS5jbGFzcyc7XG5cbmZ1bmN0aW9uIGlzRmlsZSh2YWx1ZTogYW55KTogYm9vbGVhbiB7XG4gIHJldHVybiAoRmlsZSAmJiB2YWx1ZSBpbnN0YW5jZW9mIEZpbGUpO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEhlYWRlcnMge1xuICBuYW1lOiBzdHJpbmc7XG4gIHZhbHVlOiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIFBhcnNlZFJlc3BvbnNlSGVhZGVycyA9IHsgWyBoZWFkZXJGaWVsZE5hbWU6IHN0cmluZyBdOiBzdHJpbmcgfTtcblxuZXhwb3J0IHR5cGUgRmlsdGVyRnVuY3Rpb24gPSB7XG4gIG5hbWU6IHN0cmluZyxcbiAgZm46IChpdGVtPzogRmlsZUxpa2VPYmplY3QsIG9wdGlvbnM/OiBGaWxlVXBsb2FkZXJPcHRpb25zKSA9PiBib29sZWFuXG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIEZpbGVVcGxvYWRlck9wdGlvbnMge1xuICBhbGxvd2VkTWltZVR5cGU/OiBzdHJpbmdbXTtcbiAgYWxsb3dlZEZpbGVUeXBlPzogc3RyaW5nW107XG4gIGF1dG9VcGxvYWQ/OiBib29sZWFuO1xuICBpc0hUTUw1PzogYm9vbGVhbjtcbiAgZmlsdGVycz86IEZpbHRlckZ1bmN0aW9uW107XG4gIGhlYWRlcnM/OiBIZWFkZXJzW107XG4gIG1ldGhvZD86IHN0cmluZztcbiAgYXV0aFRva2VuPzogc3RyaW5nO1xuICBtYXhGaWxlU2l6ZT86IG51bWJlcjtcbiAgcXVldWVMaW1pdD86IG51bWJlcjtcbiAgcmVtb3ZlQWZ0ZXJVcGxvYWQ/OiBib29sZWFuO1xuICB1cmw/OiBzdHJpbmc7XG4gIGRpc2FibGVNdWx0aXBhcnQ/OiBib29sZWFuO1xuICBpdGVtQWxpYXM/OiBzdHJpbmc7XG4gIGF1dGhUb2tlbkhlYWRlcj86IHN0cmluZztcbiAgYWRkaXRpb25hbFBhcmFtZXRlcj86IHsgWyBrZXk6IHN0cmluZyBdOiBhbnkgfTtcbiAgcGFyYW1ldGVyc0JlZm9yZUZpbGVzPzogYm9vbGVhbjtcbiAgZm9ybWF0RGF0YUZ1bmN0aW9uPzogRnVuY3Rpb247XG4gIGZvcm1hdERhdGFGdW5jdGlvbklzQXN5bmM/OiBib29sZWFuO1xufVxuXG5leHBvcnQgY2xhc3MgRmlsZVVwbG9hZGVyIHtcblxuICBwdWJsaWMgYXV0aFRva2VuOiBzdHJpbmc7XG4gIHB1YmxpYyBpc1VwbG9hZGluZzogYm9vbGVhbiA9IGZhbHNlO1xuICBwdWJsaWMgcXVldWU6IEZpbGVJdGVtW10gPSBbXTtcbiAgcHVibGljIHByb2dyZXNzOiBudW1iZXIgPSAwO1xuICBwdWJsaWMgX25leHRJbmRleDogbnVtYmVyID0gMDtcbiAgcHVibGljIGF1dG9VcGxvYWQ6IGFueTtcbiAgcHVibGljIGF1dGhUb2tlbkhlYWRlcjogc3RyaW5nO1xuICBwdWJsaWMgcmVzcG9uc2U6IEV2ZW50RW1pdHRlcjxhbnk+O1xuXG4gIHB1YmxpYyBvcHRpb25zOiBGaWxlVXBsb2FkZXJPcHRpb25zID0ge1xuICAgIGF1dG9VcGxvYWQ6IGZhbHNlLFxuICAgIGlzSFRNTDU6IHRydWUsXG4gICAgZmlsdGVyczogW10sXG4gICAgcmVtb3ZlQWZ0ZXJVcGxvYWQ6IGZhbHNlLFxuICAgIGRpc2FibGVNdWx0aXBhcnQ6IGZhbHNlLFxuICAgIGZvcm1hdERhdGFGdW5jdGlvbjogKGl0ZW06IEZpbGVJdGVtKSA9PiBpdGVtLl9maWxlLFxuICAgIGZvcm1hdERhdGFGdW5jdGlvbklzQXN5bmM6IGZhbHNlXG4gIH07XG5cbiAgcHJvdGVjdGVkIF9mYWlsRmlsdGVySW5kZXg6IG51bWJlcjtcblxuICBwdWJsaWMgY29uc3RydWN0b3Iob3B0aW9uczogRmlsZVVwbG9hZGVyT3B0aW9ucykge1xuICAgIHRoaXMuc2V0T3B0aW9ucyhvcHRpb25zKTtcbiAgICB0aGlzLnJlc3BvbnNlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIH1cblxuICBwdWJsaWMgc2V0T3B0aW9ucyhvcHRpb25zOiBGaWxlVXBsb2FkZXJPcHRpb25zKTogdm9pZCB7XG4gICAgdGhpcy5vcHRpb25zID0gT2JqZWN0LmFzc2lnbih0aGlzLm9wdGlvbnMsIG9wdGlvbnMpO1xuXG4gICAgdGhpcy5hdXRoVG9rZW4gPSB0aGlzLm9wdGlvbnMuYXV0aFRva2VuO1xuICAgIHRoaXMuYXV0aFRva2VuSGVhZGVyID0gdGhpcy5vcHRpb25zLmF1dGhUb2tlbkhlYWRlciB8fCAnQXV0aG9yaXphdGlvbic7XG4gICAgdGhpcy5hdXRvVXBsb2FkID0gdGhpcy5vcHRpb25zLmF1dG9VcGxvYWQ7XG4gICAgdGhpcy5vcHRpb25zLmZpbHRlcnMudW5zaGlmdCh7IG5hbWU6ICdxdWV1ZUxpbWl0JywgZm46IHRoaXMuX3F1ZXVlTGltaXRGaWx0ZXIgfSk7XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLm1heEZpbGVTaXplKSB7XG4gICAgICB0aGlzLm9wdGlvbnMuZmlsdGVycy51bnNoaWZ0KHsgbmFtZTogJ2ZpbGVTaXplJywgZm46IHRoaXMuX2ZpbGVTaXplRmlsdGVyIH0pO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMuYWxsb3dlZEZpbGVUeXBlKSB7XG4gICAgICB0aGlzLm9wdGlvbnMuZmlsdGVycy51bnNoaWZ0KHsgbmFtZTogJ2ZpbGVUeXBlJywgZm46IHRoaXMuX2ZpbGVUeXBlRmlsdGVyIH0pO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnMuYWxsb3dlZE1pbWVUeXBlKSB7XG4gICAgICB0aGlzLm9wdGlvbnMuZmlsdGVycy51bnNoaWZ0KHsgbmFtZTogJ21pbWVUeXBlJywgZm46IHRoaXMuX21pbWVUeXBlRmlsdGVyIH0pO1xuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5xdWV1ZS5sZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy5xdWV1ZVsgaSBdLnVybCA9IHRoaXMub3B0aW9ucy51cmw7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFkZFRvUXVldWUoZmlsZXM6IEZpbGVbXSwgb3B0aW9ucz86IEZpbGVVcGxvYWRlck9wdGlvbnMsIGZpbHRlcnM/OiBGaWx0ZXJGdW5jdGlvbltdIHwgc3RyaW5nKTogdm9pZCB7XG4gICAgbGV0IGxpc3Q6IEZpbGVbXSA9IFtdO1xuICAgIGZvciAobGV0IGZpbGUgb2YgZmlsZXMpIHtcbiAgICAgIGxpc3QucHVzaChmaWxlKTtcbiAgICB9XG4gICAgbGV0IGFycmF5T2ZGaWx0ZXJzID0gdGhpcy5fZ2V0RmlsdGVycyhmaWx0ZXJzKTtcbiAgICBsZXQgY291bnQgPSB0aGlzLnF1ZXVlLmxlbmd0aDtcbiAgICBsZXQgYWRkZWRGaWxlSXRlbXM6IEZpbGVJdGVtW10gPSBbXTtcbiAgICBsaXN0Lm1hcCgoc29tZTogRmlsZSkgPT4ge1xuICAgICAgaWYgKCFvcHRpb25zKSB7XG4gICAgICAgIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG4gICAgICB9XG5cbiAgICAgIGxldCB0ZW1wID0gbmV3IEZpbGVMaWtlT2JqZWN0KHNvbWUpO1xuICAgICAgaWYgKHRoaXMuX2lzVmFsaWRGaWxlKHRlbXAsIGFycmF5T2ZGaWx0ZXJzLCBvcHRpb25zKSkge1xuICAgICAgICBsZXQgZmlsZUl0ZW0gPSBuZXcgRmlsZUl0ZW0odGhpcywgc29tZSwgb3B0aW9ucyk7XG4gICAgICAgIGFkZGVkRmlsZUl0ZW1zLnB1c2goZmlsZUl0ZW0pO1xuICAgICAgICB0aGlzLnF1ZXVlLnB1c2goZmlsZUl0ZW0pO1xuICAgICAgICB0aGlzLl9vbkFmdGVyQWRkaW5nRmlsZShmaWxlSXRlbSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgZmlsdGVyID0gYXJyYXlPZkZpbHRlcnNbIHRoaXMuX2ZhaWxGaWx0ZXJJbmRleCBdO1xuICAgICAgICB0aGlzLl9vbldoZW5BZGRpbmdGaWxlRmFpbGVkKHRlbXAsIGZpbHRlciwgb3B0aW9ucyk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKHRoaXMucXVldWUubGVuZ3RoICE9PSBjb3VudCkge1xuICAgICAgdGhpcy5fb25BZnRlckFkZGluZ0FsbChhZGRlZEZpbGVJdGVtcyk7XG4gICAgICB0aGlzLnByb2dyZXNzID0gdGhpcy5fZ2V0VG90YWxQcm9ncmVzcygpO1xuICAgIH1cbiAgICB0aGlzLl9yZW5kZXIoKTtcbiAgICBpZiAodGhpcy5vcHRpb25zLmF1dG9VcGxvYWQpIHtcbiAgICAgIHRoaXMudXBsb2FkQWxsKCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHJlbW92ZUZyb21RdWV1ZSh2YWx1ZTogRmlsZUl0ZW0pOiB2b2lkIHtcbiAgICBsZXQgaW5kZXggPSB0aGlzLmdldEluZGV4T2ZJdGVtKHZhbHVlKTtcbiAgICBsZXQgaXRlbSA9IHRoaXMucXVldWVbIGluZGV4IF07XG4gICAgaWYgKGl0ZW0uaXNVcGxvYWRpbmcpIHtcbiAgICAgIGl0ZW0uY2FuY2VsKCk7XG4gICAgfVxuICAgIHRoaXMucXVldWUuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB0aGlzLnByb2dyZXNzID0gdGhpcy5fZ2V0VG90YWxQcm9ncmVzcygpO1xuICB9XG5cbiAgcHVibGljIGNsZWFyUXVldWUoKTogdm9pZCB7XG4gICAgd2hpbGUgKHRoaXMucXVldWUubGVuZ3RoKSB7XG4gICAgICB0aGlzLnF1ZXVlWyAwIF0ucmVtb3ZlKCk7XG4gICAgfVxuICAgIHRoaXMucHJvZ3Jlc3MgPSAwO1xuICB9XG5cbiAgcHVibGljIHVwbG9hZEl0ZW0odmFsdWU6IEZpbGVJdGVtKTogdm9pZCB7XG4gICAgbGV0IGluZGV4ID0gdGhpcy5nZXRJbmRleE9mSXRlbSh2YWx1ZSk7XG4gICAgbGV0IGl0ZW0gPSB0aGlzLnF1ZXVlWyBpbmRleCBdO1xuICAgIGxldCB0cmFuc3BvcnQgPSB0aGlzLm9wdGlvbnMuaXNIVE1MNSA/ICdfeGhyVHJhbnNwb3J0JyA6ICdfaWZyYW1lVHJhbnNwb3J0JztcbiAgICBpdGVtLl9wcmVwYXJlVG9VcGxvYWRpbmcoKTtcbiAgICBpZiAodGhpcy5pc1VwbG9hZGluZykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmlzVXBsb2FkaW5nID0gdHJ1ZTtcbiAgICAodGhpcyBhcyBhbnkpWyB0cmFuc3BvcnQgXShpdGVtKTtcbiAgfVxuXG4gIHB1YmxpYyBjYW5jZWxJdGVtKHZhbHVlOiBGaWxlSXRlbSk6IHZvaWQge1xuICAgIGxldCBpbmRleCA9IHRoaXMuZ2V0SW5kZXhPZkl0ZW0odmFsdWUpO1xuICAgIGxldCBpdGVtID0gdGhpcy5xdWV1ZVsgaW5kZXggXTtcbiAgICBsZXQgcHJvcCA9IHRoaXMub3B0aW9ucy5pc0hUTUw1ID8gaXRlbS5feGhyIDogaXRlbS5fZm9ybTtcbiAgICBpZiAoaXRlbSAmJiBpdGVtLmlzVXBsb2FkaW5nKSB7XG4gICAgICBwcm9wLmFib3J0KCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHVwbG9hZEFsbCgpOiB2b2lkIHtcbiAgICBsZXQgaXRlbXMgPSB0aGlzLmdldE5vdFVwbG9hZGVkSXRlbXMoKS5maWx0ZXIoKGl0ZW06IEZpbGVJdGVtKSA9PiAhaXRlbS5pc1VwbG9hZGluZyk7XG4gICAgaWYgKCFpdGVtcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaXRlbXMubWFwKChpdGVtOiBGaWxlSXRlbSkgPT4gaXRlbS5fcHJlcGFyZVRvVXBsb2FkaW5nKCkpO1xuICAgIGl0ZW1zWyAwIF0udXBsb2FkKCk7XG4gIH1cblxuICBwdWJsaWMgY2FuY2VsQWxsKCk6IHZvaWQge1xuICAgIGxldCBpdGVtcyA9IHRoaXMuZ2V0Tm90VXBsb2FkZWRJdGVtcygpO1xuICAgIGl0ZW1zLm1hcCgoaXRlbTogRmlsZUl0ZW0pID0+IGl0ZW0uY2FuY2VsKCkpO1xuICB9XG5cbiAgcHVibGljIGlzRmlsZSh2YWx1ZTogYW55KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGlzRmlsZSh2YWx1ZSk7XG4gIH1cblxuICBwdWJsaWMgaXNGaWxlTGlrZU9iamVjdCh2YWx1ZTogYW55KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgRmlsZUxpa2VPYmplY3Q7XG4gIH1cblxuICBwdWJsaWMgZ2V0SW5kZXhPZkl0ZW0odmFsdWU6IGFueSk6IG51bWJlciB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgPyB2YWx1ZSA6IHRoaXMucXVldWUuaW5kZXhPZih2YWx1ZSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0Tm90VXBsb2FkZWRJdGVtcygpOiBhbnlbXSB7XG4gICAgcmV0dXJuIHRoaXMucXVldWUuZmlsdGVyKChpdGVtOiBGaWxlSXRlbSkgPT4gIWl0ZW0uaXNVcGxvYWRlZCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0UmVhZHlJdGVtcygpOiBhbnlbXSB7XG4gICAgcmV0dXJuIHRoaXMucXVldWVcbiAgICAgIC5maWx0ZXIoKGl0ZW06IEZpbGVJdGVtKSA9PiAoaXRlbS5pc1JlYWR5ICYmICFpdGVtLmlzVXBsb2FkaW5nKSlcbiAgICAgIC5zb3J0KChpdGVtMTogYW55LCBpdGVtMjogYW55KSA9PiBpdGVtMS5pbmRleCAtIGl0ZW0yLmluZGV4KTtcbiAgfVxuXG4gIHB1YmxpYyBkZXN0cm95KCk6IHZvaWQge1xuICAgIHJldHVybiB2b2lkIDA7XG4gIH1cblxuICBwdWJsaWMgb25BZnRlckFkZGluZ0FsbChmaWxlSXRlbXM6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIHsgZmlsZUl0ZW1zIH07XG4gIH1cblxuICBwdWJsaWMgb25CdWlsZEl0ZW1Gb3JtKGZpbGVJdGVtOiBGaWxlSXRlbSwgZm9ybTogYW55KTogYW55IHtcbiAgICByZXR1cm4geyBmaWxlSXRlbSwgZm9ybSB9O1xuICB9XG5cbiAgcHVibGljIG9uQWZ0ZXJBZGRpbmdGaWxlKGZpbGVJdGVtOiBGaWxlSXRlbSk6IGFueSB7XG4gICAgcmV0dXJuIHsgZmlsZUl0ZW0gfTtcbiAgfVxuXG4gIHB1YmxpYyBvbldoZW5BZGRpbmdGaWxlRmFpbGVkKGl0ZW06IEZpbGVMaWtlT2JqZWN0LCBmaWx0ZXI6IGFueSwgb3B0aW9uczogYW55KTogYW55IHtcbiAgICByZXR1cm4geyBpdGVtLCBmaWx0ZXIsIG9wdGlvbnMgfTtcbiAgfVxuXG4gIHB1YmxpYyBvbkJlZm9yZVVwbG9hZEl0ZW0oZmlsZUl0ZW06IEZpbGVJdGVtKTogYW55IHtcbiAgICByZXR1cm4geyBmaWxlSXRlbSB9O1xuICB9XG5cbiAgcHVibGljIG9uUHJvZ3Jlc3NJdGVtKGZpbGVJdGVtOiBGaWxlSXRlbSwgcHJvZ3Jlc3M6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIHsgZmlsZUl0ZW0sIHByb2dyZXNzIH07XG4gIH1cblxuICBwdWJsaWMgb25Qcm9ncmVzc0FsbChwcm9ncmVzczogYW55KTogYW55IHtcbiAgICByZXR1cm4geyBwcm9ncmVzcyB9O1xuICB9XG5cbiAgcHVibGljIG9uU3VjY2Vzc0l0ZW0oaXRlbTogRmlsZUl0ZW0sIHJlc3BvbnNlOiBzdHJpbmcsIHN0YXR1czogbnVtYmVyLCBoZWFkZXJzOiBQYXJzZWRSZXNwb25zZUhlYWRlcnMpOiBhbnkge1xuICAgIHJldHVybiB7IGl0ZW0sIHJlc3BvbnNlLCBzdGF0dXMsIGhlYWRlcnMgfTtcbiAgfVxuXG4gIHB1YmxpYyBvbkVycm9ySXRlbShpdGVtOiBGaWxlSXRlbSwgcmVzcG9uc2U6IHN0cmluZywgc3RhdHVzOiBudW1iZXIsIGhlYWRlcnM6IFBhcnNlZFJlc3BvbnNlSGVhZGVycyk6IGFueSB7XG4gICAgcmV0dXJuIHsgaXRlbSwgcmVzcG9uc2UsIHN0YXR1cywgaGVhZGVycyB9O1xuICB9XG5cbiAgcHVibGljIG9uQ2FuY2VsSXRlbShpdGVtOiBGaWxlSXRlbSwgcmVzcG9uc2U6IHN0cmluZywgc3RhdHVzOiBudW1iZXIsIGhlYWRlcnM6IFBhcnNlZFJlc3BvbnNlSGVhZGVycyk6IGFueSB7XG4gICAgcmV0dXJuIHsgaXRlbSwgcmVzcG9uc2UsIHN0YXR1cywgaGVhZGVycyB9O1xuICB9XG5cbiAgcHVibGljIG9uQ29tcGxldGVJdGVtKGl0ZW06IEZpbGVJdGVtLCByZXNwb25zZTogc3RyaW5nLCBzdGF0dXM6IG51bWJlciwgaGVhZGVyczogUGFyc2VkUmVzcG9uc2VIZWFkZXJzKTogYW55IHtcbiAgICByZXR1cm4geyBpdGVtLCByZXNwb25zZSwgc3RhdHVzLCBoZWFkZXJzIH07XG4gIH1cblxuICBwdWJsaWMgb25Db21wbGV0ZUFsbCgpOiBhbnkge1xuICAgIHJldHVybiB2b2lkIDA7XG4gIH1cblxuICBwdWJsaWMgX21pbWVUeXBlRmlsdGVyKGl0ZW06IEZpbGVMaWtlT2JqZWN0KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEodGhpcy5vcHRpb25zLmFsbG93ZWRNaW1lVHlwZSAmJiB0aGlzLm9wdGlvbnMuYWxsb3dlZE1pbWVUeXBlLmluZGV4T2YoaXRlbS50eXBlKSA9PT0gLTEpO1xuICB9XG5cbiAgcHVibGljIF9maWxlU2l6ZUZpbHRlcihpdGVtOiBGaWxlTGlrZU9iamVjdCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhKHRoaXMub3B0aW9ucy5tYXhGaWxlU2l6ZSAmJiBpdGVtLnNpemUgPiB0aGlzLm9wdGlvbnMubWF4RmlsZVNpemUpO1xuICB9XG5cbiAgcHVibGljIF9maWxlVHlwZUZpbHRlcihpdGVtOiBGaWxlTGlrZU9iamVjdCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhKHRoaXMub3B0aW9ucy5hbGxvd2VkRmlsZVR5cGUgJiZcbiAgICAgIHRoaXMub3B0aW9ucy5hbGxvd2VkRmlsZVR5cGUuaW5kZXhPZihGaWxlVHlwZS5nZXRNaW1lQ2xhc3MoaXRlbSkpID09PSAtMSk7XG4gIH1cblxuICBwdWJsaWMgX29uRXJyb3JJdGVtKGl0ZW06IEZpbGVJdGVtLCByZXNwb25zZTogc3RyaW5nLCBzdGF0dXM6IG51bWJlciwgaGVhZGVyczogUGFyc2VkUmVzcG9uc2VIZWFkZXJzKTogdm9pZCB7XG4gICAgaXRlbS5fb25FcnJvcihyZXNwb25zZSwgc3RhdHVzLCBoZWFkZXJzKTtcbiAgICB0aGlzLm9uRXJyb3JJdGVtKGl0ZW0sIHJlc3BvbnNlLCBzdGF0dXMsIGhlYWRlcnMpO1xuICB9XG5cbiAgcHVibGljIF9vbkNvbXBsZXRlSXRlbShpdGVtOiBGaWxlSXRlbSwgcmVzcG9uc2U6IHN0cmluZywgc3RhdHVzOiBudW1iZXIsIGhlYWRlcnM6IFBhcnNlZFJlc3BvbnNlSGVhZGVycyk6IHZvaWQge1xuICAgIGl0ZW0uX29uQ29tcGxldGUocmVzcG9uc2UsIHN0YXR1cywgaGVhZGVycyk7XG4gICAgdGhpcy5vbkNvbXBsZXRlSXRlbShpdGVtLCByZXNwb25zZSwgc3RhdHVzLCBoZWFkZXJzKTtcbiAgICBsZXQgbmV4dEl0ZW0gPSB0aGlzLmdldFJlYWR5SXRlbXMoKVsgMCBdO1xuICAgIHRoaXMuaXNVcGxvYWRpbmcgPSBmYWxzZTtcbiAgICBpZiAobmV4dEl0ZW0pIHtcbiAgICAgIG5leHRJdGVtLnVwbG9hZCgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLm9uQ29tcGxldGVBbGwoKTtcbiAgICB0aGlzLnByb2dyZXNzID0gdGhpcy5fZ2V0VG90YWxQcm9ncmVzcygpO1xuICAgIHRoaXMuX3JlbmRlcigpO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9oZWFkZXJzR2V0dGVyKHBhcnNlZEhlYWRlcnM6IFBhcnNlZFJlc3BvbnNlSGVhZGVycyk6IGFueSB7XG4gICAgcmV0dXJuIChuYW1lOiBhbnkpOiBhbnkgPT4ge1xuICAgICAgaWYgKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHBhcnNlZEhlYWRlcnNbIG5hbWUudG9Mb3dlckNhc2UoKSBdIHx8IHZvaWQgMDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBwYXJzZWRIZWFkZXJzO1xuICAgIH07XG4gIH1cblxuICBwcm90ZWN0ZWQgX3hoclRyYW5zcG9ydChpdGVtOiBGaWxlSXRlbSk6IGFueSB7XG4gICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgIGxldCB4aHIgPSBpdGVtLl94aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICBsZXQgc2VuZGFibGU6IGFueTtcbiAgICB0aGlzLl9vbkJlZm9yZVVwbG9hZEl0ZW0oaXRlbSk7XG5cbiAgICBpZiAodHlwZW9mIGl0ZW0uX2ZpbGUuc2l6ZSAhPT0gJ251bWJlcicpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBmaWxlIHNwZWNpZmllZCBpcyBubyBsb25nZXIgdmFsaWQnKTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLm9wdGlvbnMuZGlzYWJsZU11bHRpcGFydCkge1xuICAgICAgc2VuZGFibGUgPSBuZXcgRm9ybURhdGEoKTtcbiAgICAgIHRoaXMuX29uQnVpbGRJdGVtRm9ybShpdGVtLCBzZW5kYWJsZSk7XG5cbiAgICAgIGNvbnN0IGFwcGVuZEZpbGUgPSAoKSA9PiBzZW5kYWJsZS5hcHBlbmQoaXRlbS5hbGlhcywgaXRlbS5fZmlsZSwgaXRlbS5maWxlLm5hbWUpO1xuICAgICAgaWYgKCF0aGlzLm9wdGlvbnMucGFyYW1ldGVyc0JlZm9yZUZpbGVzKSB7XG4gICAgICAgIGFwcGVuZEZpbGUoKTtcbiAgICAgIH1cblxuICAgICAgLy8gRm9yIEFXUywgQWRkaXRpb25hbCBQYXJhbWV0ZXJzIG11c3QgY29tZSBCRUZPUkUgRmlsZXNcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuYWRkaXRpb25hbFBhcmFtZXRlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMub3B0aW9ucy5hZGRpdGlvbmFsUGFyYW1ldGVyKS5mb3JFYWNoKChrZXk6IHN0cmluZykgPT4ge1xuICAgICAgICAgIGxldCBwYXJhbVZhbCA9IHRoaXMub3B0aW9ucy5hZGRpdGlvbmFsUGFyYW1ldGVyWyBrZXkgXTtcbiAgICAgICAgICAvLyBBbGxvdyBhbiBhZGRpdGlvbmFsIHBhcmFtZXRlciB0byBpbmNsdWRlIHRoZSBmaWxlbmFtZVxuICAgICAgICAgIGlmICh0eXBlb2YgcGFyYW1WYWwgPT09ICdzdHJpbmcnICYmIHBhcmFtVmFsLmluZGV4T2YoJ3t7ZmlsZV9uYW1lfX0nKSA+PSAwKSB7XG4gICAgICAgICAgICBwYXJhbVZhbCA9IHBhcmFtVmFsLnJlcGxhY2UoJ3t7ZmlsZV9uYW1lfX0nLCBpdGVtLmZpbGUubmFtZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHNlbmRhYmxlLmFwcGVuZChrZXksIHBhcmFtVmFsKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLm9wdGlvbnMucGFyYW1ldGVyc0JlZm9yZUZpbGVzKSB7XG4gICAgICAgIGFwcGVuZEZpbGUoKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgc2VuZGFibGUgPSB0aGlzLm9wdGlvbnMuZm9ybWF0RGF0YUZ1bmN0aW9uKGl0ZW0pO1xuICAgIH1cblxuICAgIHhoci51cGxvYWQub25wcm9ncmVzcyA9IChldmVudDogYW55KSA9PiB7XG4gICAgICBsZXQgcHJvZ3Jlc3MgPSBNYXRoLnJvdW5kKGV2ZW50Lmxlbmd0aENvbXB1dGFibGUgPyBldmVudC5sb2FkZWQgKiAxMDAgLyBldmVudC50b3RhbCA6IDApO1xuICAgICAgdGhpcy5fb25Qcm9ncmVzc0l0ZW0oaXRlbSwgcHJvZ3Jlc3MpO1xuICAgIH07XG4gICAgeGhyLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgIGxldCBoZWFkZXJzID0gdGhpcy5fcGFyc2VIZWFkZXJzKHhoci5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKSk7XG4gICAgICBsZXQgcmVzcG9uc2UgPSB0aGlzLl90cmFuc2Zvcm1SZXNwb25zZSh4aHIucmVzcG9uc2UsIGhlYWRlcnMpO1xuICAgICAgbGV0IGdpc3QgPSB0aGlzLl9pc1N1Y2Nlc3NDb2RlKHhoci5zdGF0dXMpID8gJ1N1Y2Nlc3MnIDogJ0Vycm9yJztcbiAgICAgIGxldCBtZXRob2QgPSAnX29uJyArIGdpc3QgKyAnSXRlbSc7XG4gICAgICAodGhpcyBhcyBhbnkpWyBtZXRob2QgXShpdGVtLCByZXNwb25zZSwgeGhyLnN0YXR1cywgaGVhZGVycyk7XG4gICAgICB0aGlzLl9vbkNvbXBsZXRlSXRlbShpdGVtLCByZXNwb25zZSwgeGhyLnN0YXR1cywgaGVhZGVycyk7XG4gICAgfTtcbiAgICB4aHIub25lcnJvciA9ICgpID0+IHtcbiAgICAgIGxldCBoZWFkZXJzID0gdGhpcy5fcGFyc2VIZWFkZXJzKHhoci5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKSk7XG4gICAgICBsZXQgcmVzcG9uc2UgPSB0aGlzLl90cmFuc2Zvcm1SZXNwb25zZSh4aHIucmVzcG9uc2UsIGhlYWRlcnMpO1xuICAgICAgdGhpcy5fb25FcnJvckl0ZW0oaXRlbSwgcmVzcG9uc2UsIHhoci5zdGF0dXMsIGhlYWRlcnMpO1xuICAgICAgdGhpcy5fb25Db21wbGV0ZUl0ZW0oaXRlbSwgcmVzcG9uc2UsIHhoci5zdGF0dXMsIGhlYWRlcnMpO1xuICAgIH07XG4gICAgeGhyLm9uYWJvcnQgPSAoKSA9PiB7XG4gICAgICBsZXQgaGVhZGVycyA9IHRoaXMuX3BhcnNlSGVhZGVycyh4aHIuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkpO1xuICAgICAgbGV0IHJlc3BvbnNlID0gdGhpcy5fdHJhbnNmb3JtUmVzcG9uc2UoeGhyLnJlc3BvbnNlLCBoZWFkZXJzKTtcbiAgICAgIHRoaXMuX29uQ2FuY2VsSXRlbShpdGVtLCByZXNwb25zZSwgeGhyLnN0YXR1cywgaGVhZGVycyk7XG4gICAgICB0aGlzLl9vbkNvbXBsZXRlSXRlbShpdGVtLCByZXNwb25zZSwgeGhyLnN0YXR1cywgaGVhZGVycyk7XG4gICAgfTtcbiAgICB4aHIub3BlbihpdGVtLm1ldGhvZCwgaXRlbS51cmwsIHRydWUpO1xuICAgIHhoci53aXRoQ3JlZGVudGlhbHMgPSBpdGVtLndpdGhDcmVkZW50aWFscztcbiAgICBpZiAodGhpcy5vcHRpb25zLmhlYWRlcnMpIHtcbiAgICAgIGZvciAobGV0IGhlYWRlciBvZiB0aGlzLm9wdGlvbnMuaGVhZGVycykge1xuICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihoZWFkZXIubmFtZSwgaGVhZGVyLnZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGl0ZW0uaGVhZGVycy5sZW5ndGgpIHtcbiAgICAgIGZvciAobGV0IGhlYWRlciBvZiBpdGVtLmhlYWRlcnMpIHtcbiAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoaGVhZGVyLm5hbWUsIGhlYWRlci52YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLmF1dGhUb2tlbikge1xuICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIodGhpcy5hdXRoVG9rZW5IZWFkZXIsIHRoaXMuYXV0aFRva2VuKTtcbiAgICB9XG4gICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSA9PSBYTUxIdHRwUmVxdWVzdC5ET05FKSB7XG4gICAgICAgIHRoYXQucmVzcG9uc2UuZW1pdCh4aHIucmVzcG9uc2VUZXh0KVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhpcy5vcHRpb25zLmZvcm1hdERhdGFGdW5jdGlvbklzQXN5bmMpIHtcbiAgICAgIHNlbmRhYmxlLnRoZW4oXG4gICAgICAgIChyZXN1bHQ6IGFueSkgPT4geGhyLnNlbmQoSlNPTi5zdHJpbmdpZnkocmVzdWx0KSlcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHhoci5zZW5kKHNlbmRhYmxlKTtcbiAgICB9XG4gICAgdGhpcy5fcmVuZGVyKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX2dldFRvdGFsUHJvZ3Jlc3ModmFsdWU6IG51bWJlciA9IDApOiBudW1iZXIge1xuICAgIGlmICh0aGlzLm9wdGlvbnMucmVtb3ZlQWZ0ZXJVcGxvYWQpIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgbGV0IG5vdFVwbG9hZGVkID0gdGhpcy5nZXROb3RVcGxvYWRlZEl0ZW1zKCkubGVuZ3RoO1xuICAgIGxldCB1cGxvYWRlZCA9IG5vdFVwbG9hZGVkID8gdGhpcy5xdWV1ZS5sZW5ndGggLSBub3RVcGxvYWRlZCA6IHRoaXMucXVldWUubGVuZ3RoO1xuICAgIGxldCByYXRpbyA9IDEwMCAvIHRoaXMucXVldWUubGVuZ3RoO1xuICAgIGxldCBjdXJyZW50ID0gdmFsdWUgKiByYXRpbyAvIDEwMDtcbiAgICByZXR1cm4gTWF0aC5yb3VuZCh1cGxvYWRlZCAqIHJhdGlvICsgY3VycmVudCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX2dldEZpbHRlcnMoZmlsdGVyczogRmlsdGVyRnVuY3Rpb25bXSB8IHN0cmluZyk6IEZpbHRlckZ1bmN0aW9uW10ge1xuICAgIGlmICghZmlsdGVycykge1xuICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5maWx0ZXJzO1xuICAgIH1cbiAgICBpZiAoQXJyYXkuaXNBcnJheShmaWx0ZXJzKSkge1xuICAgICAgcmV0dXJuIGZpbHRlcnM7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgZmlsdGVycyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGxldCBuYW1lcyA9IGZpbHRlcnMubWF0Y2goL1teXFxzLF0rL2cpO1xuICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5maWx0ZXJzXG4gICAgICAgIC5maWx0ZXIoKGZpbHRlcjogYW55KSA9PiBuYW1lcy5pbmRleE9mKGZpbHRlci5uYW1lKSAhPT0gLTEpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLmZpbHRlcnM7XG4gIH1cblxuICBwcm90ZWN0ZWQgX3JlbmRlcigpOiBhbnkge1xuICAgIHJldHVybiB2b2lkIDA7XG4gIH1cblxuICBwcm90ZWN0ZWQgX3F1ZXVlTGltaXRGaWx0ZXIoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5xdWV1ZUxpbWl0ID09PSB1bmRlZmluZWQgfHwgdGhpcy5xdWV1ZS5sZW5ndGggPCB0aGlzLm9wdGlvbnMucXVldWVMaW1pdDtcbiAgfVxuXG4gIHByb3RlY3RlZCBfaXNWYWxpZEZpbGUoZmlsZTogRmlsZUxpa2VPYmplY3QsIGZpbHRlcnM6IEZpbHRlckZ1bmN0aW9uW10sIG9wdGlvbnM6IEZpbGVVcGxvYWRlck9wdGlvbnMpOiBib29sZWFuIHtcbiAgICB0aGlzLl9mYWlsRmlsdGVySW5kZXggPSAtMTtcbiAgICByZXR1cm4gIWZpbHRlcnMubGVuZ3RoID8gdHJ1ZSA6IGZpbHRlcnMuZXZlcnkoKGZpbHRlcjogRmlsdGVyRnVuY3Rpb24pID0+IHtcbiAgICAgIHRoaXMuX2ZhaWxGaWx0ZXJJbmRleCsrO1xuICAgICAgcmV0dXJuIGZpbHRlci5mbi5jYWxsKHRoaXMsIGZpbGUsIG9wdGlvbnMpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9pc1N1Y2Nlc3NDb2RlKHN0YXR1czogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIChzdGF0dXMgPj0gMjAwICYmIHN0YXR1cyA8IDMwMCkgfHwgc3RhdHVzID09PSAzMDQ7XG4gIH1cblxuICBwcm90ZWN0ZWQgX3RyYW5zZm9ybVJlc3BvbnNlKHJlc3BvbnNlOiBzdHJpbmcsIGhlYWRlcnM6IFBhcnNlZFJlc3BvbnNlSGVhZGVycyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHJlc3BvbnNlO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9wYXJzZUhlYWRlcnMoaGVhZGVyczogc3RyaW5nKTogUGFyc2VkUmVzcG9uc2VIZWFkZXJzIHtcbiAgICBsZXQgcGFyc2VkOiBhbnkgPSB7fTtcbiAgICBsZXQga2V5OiBhbnk7XG4gICAgbGV0IHZhbDogYW55O1xuICAgIGxldCBpOiBhbnk7XG4gICAgaWYgKCFoZWFkZXJzKSB7XG4gICAgICByZXR1cm4gcGFyc2VkO1xuICAgIH1cbiAgICBoZWFkZXJzLnNwbGl0KCdcXG4nKS5tYXAoKGxpbmU6IGFueSkgPT4ge1xuICAgICAgaSA9IGxpbmUuaW5kZXhPZignOicpO1xuICAgICAga2V5ID0gbGluZS5zbGljZSgwLCBpKS50cmltKCkudG9Mb3dlckNhc2UoKTtcbiAgICAgIHZhbCA9IGxpbmUuc2xpY2UoaSArIDEpLnRyaW0oKTtcbiAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgcGFyc2VkWyBrZXkgXSA9IHBhcnNlZFsga2V5IF0gPyBwYXJzZWRbIGtleSBdICsgJywgJyArIHZhbCA6IHZhbDtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gcGFyc2VkO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9vbldoZW5BZGRpbmdGaWxlRmFpbGVkKGl0ZW06IEZpbGVMaWtlT2JqZWN0LCBmaWx0ZXI6IGFueSwgb3B0aW9uczogYW55KTogdm9pZCB7XG4gICAgdGhpcy5vbldoZW5BZGRpbmdGaWxlRmFpbGVkKGl0ZW0sIGZpbHRlciwgb3B0aW9ucyk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX29uQWZ0ZXJBZGRpbmdGaWxlKGl0ZW06IEZpbGVJdGVtKTogdm9pZCB7XG4gICAgdGhpcy5vbkFmdGVyQWRkaW5nRmlsZShpdGVtKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfb25BZnRlckFkZGluZ0FsbChpdGVtczogYW55KTogdm9pZCB7XG4gICAgdGhpcy5vbkFmdGVyQWRkaW5nQWxsKGl0ZW1zKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfb25CZWZvcmVVcGxvYWRJdGVtKGl0ZW06IEZpbGVJdGVtKTogdm9pZCB7XG4gICAgaXRlbS5fb25CZWZvcmVVcGxvYWQoKTtcbiAgICB0aGlzLm9uQmVmb3JlVXBsb2FkSXRlbShpdGVtKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfb25CdWlsZEl0ZW1Gb3JtKGl0ZW06IEZpbGVJdGVtLCBmb3JtOiBhbnkpOiB2b2lkIHtcbiAgICBpdGVtLl9vbkJ1aWxkRm9ybShmb3JtKTtcbiAgICB0aGlzLm9uQnVpbGRJdGVtRm9ybShpdGVtLCBmb3JtKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfb25Qcm9ncmVzc0l0ZW0oaXRlbTogRmlsZUl0ZW0sIHByb2dyZXNzOiBhbnkpOiB2b2lkIHtcbiAgICBsZXQgdG90YWwgPSB0aGlzLl9nZXRUb3RhbFByb2dyZXNzKHByb2dyZXNzKTtcbiAgICB0aGlzLnByb2dyZXNzID0gdG90YWw7XG4gICAgaXRlbS5fb25Qcm9ncmVzcyhwcm9ncmVzcyk7XG4gICAgdGhpcy5vblByb2dyZXNzSXRlbShpdGVtLCBwcm9ncmVzcyk7XG4gICAgdGhpcy5vblByb2dyZXNzQWxsKHRvdGFsKTtcbiAgICB0aGlzLl9yZW5kZXIoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfb25TdWNjZXNzSXRlbShpdGVtOiBGaWxlSXRlbSwgcmVzcG9uc2U6IHN0cmluZywgc3RhdHVzOiBudW1iZXIsIGhlYWRlcnM6IFBhcnNlZFJlc3BvbnNlSGVhZGVycyk6IHZvaWQge1xuICAgIGl0ZW0uX29uU3VjY2VzcyhyZXNwb25zZSwgc3RhdHVzLCBoZWFkZXJzKTtcbiAgICB0aGlzLm9uU3VjY2Vzc0l0ZW0oaXRlbSwgcmVzcG9uc2UsIHN0YXR1cywgaGVhZGVycyk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX29uQ2FuY2VsSXRlbShpdGVtOiBGaWxlSXRlbSwgcmVzcG9uc2U6IHN0cmluZywgc3RhdHVzOiBudW1iZXIsIGhlYWRlcnM6IFBhcnNlZFJlc3BvbnNlSGVhZGVycyk6IHZvaWQge1xuICAgIGl0ZW0uX29uQ2FuY2VsKHJlc3BvbnNlLCBzdGF0dXMsIGhlYWRlcnMpO1xuICAgIHRoaXMub25DYW5jZWxJdGVtKGl0ZW0sIHJlc3BvbnNlLCBzdGF0dXMsIGhlYWRlcnMpO1xuICB9XG59XG4iXX0=