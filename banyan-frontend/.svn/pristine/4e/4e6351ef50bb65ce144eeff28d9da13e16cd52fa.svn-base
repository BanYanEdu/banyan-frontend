/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
var FileUploader = /** @class */ (function () {
    function FileUploader(options) {
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
            function (item) { return item._file; }),
            formatDataFunctionIsAsync: false
        };
        this.setOptions(options);
        this.response = new EventEmitter();
    }
    /**
     * @param {?} options
     * @return {?}
     */
    FileUploader.prototype.setOptions = /**
     * @param {?} options
     * @return {?}
     */
    function (options) {
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
        for (var i = 0; i < this.queue.length; i++) {
            this.queue[i].url = this.options.url;
        }
    };
    /**
     * @param {?} files
     * @param {?=} options
     * @param {?=} filters
     * @return {?}
     */
    FileUploader.prototype.addToQueue = /**
     * @param {?} files
     * @param {?=} options
     * @param {?=} filters
     * @return {?}
     */
    function (files, options, filters) {
        var _this = this;
        var e_1, _a;
        /** @type {?} */
        var list = [];
        try {
            for (var files_1 = tslib_1.__values(files), files_1_1 = files_1.next(); !files_1_1.done; files_1_1 = files_1.next()) {
                var file = files_1_1.value;
                list.push(file);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (files_1_1 && !files_1_1.done && (_a = files_1.return)) _a.call(files_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        /** @type {?} */
        var arrayOfFilters = this._getFilters(filters);
        /** @type {?} */
        var count = this.queue.length;
        /** @type {?} */
        var addedFileItems = [];
        list.map((/**
         * @param {?} some
         * @return {?}
         */
        function (some) {
            if (!options) {
                options = _this.options;
            }
            /** @type {?} */
            var temp = new FileLikeObject(some);
            if (_this._isValidFile(temp, arrayOfFilters, options)) {
                /** @type {?} */
                var fileItem = new FileItem(_this, some, options);
                addedFileItems.push(fileItem);
                _this.queue.push(fileItem);
                _this._onAfterAddingFile(fileItem);
            }
            else {
                /** @type {?} */
                var filter = arrayOfFilters[_this._failFilterIndex];
                _this._onWhenAddingFileFailed(temp, filter, options);
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
    };
    /**
     * @param {?} value
     * @return {?}
     */
    FileUploader.prototype.removeFromQueue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        /** @type {?} */
        var index = this.getIndexOfItem(value);
        /** @type {?} */
        var item = this.queue[index];
        if (item.isUploading) {
            item.cancel();
        }
        this.queue.splice(index, 1);
        this.progress = this._getTotalProgress();
    };
    /**
     * @return {?}
     */
    FileUploader.prototype.clearQueue = /**
     * @return {?}
     */
    function () {
        while (this.queue.length) {
            this.queue[0].remove();
        }
        this.progress = 0;
    };
    /**
     * @param {?} value
     * @return {?}
     */
    FileUploader.prototype.uploadItem = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        /** @type {?} */
        var index = this.getIndexOfItem(value);
        /** @type {?} */
        var item = this.queue[index];
        /** @type {?} */
        var transport = this.options.isHTML5 ? '_xhrTransport' : '_iframeTransport';
        item._prepareToUploading();
        if (this.isUploading) {
            return;
        }
        this.isUploading = true;
        ((/** @type {?} */ (this)))[transport](item);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    FileUploader.prototype.cancelItem = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        /** @type {?} */
        var index = this.getIndexOfItem(value);
        /** @type {?} */
        var item = this.queue[index];
        /** @type {?} */
        var prop = this.options.isHTML5 ? item._xhr : item._form;
        if (item && item.isUploading) {
            prop.abort();
        }
    };
    /**
     * @return {?}
     */
    FileUploader.prototype.uploadAll = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var items = this.getNotUploadedItems().filter((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return !item.isUploading; }));
        if (!items.length) {
            return;
        }
        items.map((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return item._prepareToUploading(); }));
        items[0].upload();
    };
    /**
     * @return {?}
     */
    FileUploader.prototype.cancelAll = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var items = this.getNotUploadedItems();
        items.map((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return item.cancel(); }));
    };
    /**
     * @param {?} value
     * @return {?}
     */
    FileUploader.prototype.isFile = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return isFile(value);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    FileUploader.prototype.isFileLikeObject = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return value instanceof FileLikeObject;
    };
    /**
     * @param {?} value
     * @return {?}
     */
    FileUploader.prototype.getIndexOfItem = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return typeof value === 'number' ? value : this.queue.indexOf(value);
    };
    /**
     * @return {?}
     */
    FileUploader.prototype.getNotUploadedItems = /**
     * @return {?}
     */
    function () {
        return this.queue.filter((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return !item.isUploaded; }));
    };
    /**
     * @return {?}
     */
    FileUploader.prototype.getReadyItems = /**
     * @return {?}
     */
    function () {
        return this.queue
            .filter((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return (item.isReady && !item.isUploading); }))
            .sort((/**
         * @param {?} item1
         * @param {?} item2
         * @return {?}
         */
        function (item1, item2) { return item1.index - item2.index; }));
    };
    /**
     * @return {?}
     */
    FileUploader.prototype.destroy = /**
     * @return {?}
     */
    function () {
        return void 0;
    };
    /**
     * @param {?} fileItems
     * @return {?}
     */
    FileUploader.prototype.onAfterAddingAll = /**
     * @param {?} fileItems
     * @return {?}
     */
    function (fileItems) {
        return { fileItems: fileItems };
    };
    /**
     * @param {?} fileItem
     * @param {?} form
     * @return {?}
     */
    FileUploader.prototype.onBuildItemForm = /**
     * @param {?} fileItem
     * @param {?} form
     * @return {?}
     */
    function (fileItem, form) {
        return { fileItem: fileItem, form: form };
    };
    /**
     * @param {?} fileItem
     * @return {?}
     */
    FileUploader.prototype.onAfterAddingFile = /**
     * @param {?} fileItem
     * @return {?}
     */
    function (fileItem) {
        return { fileItem: fileItem };
    };
    /**
     * @param {?} item
     * @param {?} filter
     * @param {?} options
     * @return {?}
     */
    FileUploader.prototype.onWhenAddingFileFailed = /**
     * @param {?} item
     * @param {?} filter
     * @param {?} options
     * @return {?}
     */
    function (item, filter, options) {
        return { item: item, filter: filter, options: options };
    };
    /**
     * @param {?} fileItem
     * @return {?}
     */
    FileUploader.prototype.onBeforeUploadItem = /**
     * @param {?} fileItem
     * @return {?}
     */
    function (fileItem) {
        return { fileItem: fileItem };
    };
    /**
     * @param {?} fileItem
     * @param {?} progress
     * @return {?}
     */
    FileUploader.prototype.onProgressItem = /**
     * @param {?} fileItem
     * @param {?} progress
     * @return {?}
     */
    function (fileItem, progress) {
        return { fileItem: fileItem, progress: progress };
    };
    /**
     * @param {?} progress
     * @return {?}
     */
    FileUploader.prototype.onProgressAll = /**
     * @param {?} progress
     * @return {?}
     */
    function (progress) {
        return { progress: progress };
    };
    /**
     * @param {?} item
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    FileUploader.prototype.onSuccessItem = /**
     * @param {?} item
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    function (item, response, status, headers) {
        return { item: item, response: response, status: status, headers: headers };
    };
    /**
     * @param {?} item
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    FileUploader.prototype.onErrorItem = /**
     * @param {?} item
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    function (item, response, status, headers) {
        return { item: item, response: response, status: status, headers: headers };
    };
    /**
     * @param {?} item
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    FileUploader.prototype.onCancelItem = /**
     * @param {?} item
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    function (item, response, status, headers) {
        return { item: item, response: response, status: status, headers: headers };
    };
    /**
     * @param {?} item
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    FileUploader.prototype.onCompleteItem = /**
     * @param {?} item
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    function (item, response, status, headers) {
        return { item: item, response: response, status: status, headers: headers };
    };
    /**
     * @return {?}
     */
    FileUploader.prototype.onCompleteAll = /**
     * @return {?}
     */
    function () {
        return void 0;
    };
    /**
     * @param {?} item
     * @return {?}
     */
    FileUploader.prototype._mimeTypeFilter = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        return !(this.options.allowedMimeType && this.options.allowedMimeType.indexOf(item.type) === -1);
    };
    /**
     * @param {?} item
     * @return {?}
     */
    FileUploader.prototype._fileSizeFilter = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        return !(this.options.maxFileSize && item.size > this.options.maxFileSize);
    };
    /**
     * @param {?} item
     * @return {?}
     */
    FileUploader.prototype._fileTypeFilter = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        return !(this.options.allowedFileType &&
            this.options.allowedFileType.indexOf(FileType.getMimeClass(item)) === -1);
    };
    /**
     * @param {?} item
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    FileUploader.prototype._onErrorItem = /**
     * @param {?} item
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    function (item, response, status, headers) {
        item._onError(response, status, headers);
        this.onErrorItem(item, response, status, headers);
    };
    /**
     * @param {?} item
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    FileUploader.prototype._onCompleteItem = /**
     * @param {?} item
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    function (item, response, status, headers) {
        item._onComplete(response, status, headers);
        this.onCompleteItem(item, response, status, headers);
        /** @type {?} */
        var nextItem = this.getReadyItems()[0];
        this.isUploading = false;
        if (nextItem) {
            nextItem.upload();
            return;
        }
        this.onCompleteAll();
        this.progress = this._getTotalProgress();
        this._render();
    };
    /**
     * @protected
     * @param {?} parsedHeaders
     * @return {?}
     */
    FileUploader.prototype._headersGetter = /**
     * @protected
     * @param {?} parsedHeaders
     * @return {?}
     */
    function (parsedHeaders) {
        return (/**
         * @param {?} name
         * @return {?}
         */
        function (name) {
            if (name) {
                return parsedHeaders[name.toLowerCase()] || void 0;
            }
            return parsedHeaders;
        });
    };
    /**
     * @protected
     * @param {?} item
     * @return {?}
     */
    FileUploader.prototype._xhrTransport = /**
     * @protected
     * @param {?} item
     * @return {?}
     */
    function (item) {
        var _this = this;
        var e_2, _a, e_3, _b;
        /** @type {?} */
        var that = this;
        /** @type {?} */
        var xhr = item._xhr = new XMLHttpRequest();
        /** @type {?} */
        var sendable;
        this._onBeforeUploadItem(item);
        if (typeof item._file.size !== 'number') {
            throw new TypeError('The file specified is no longer valid');
        }
        if (!this.options.disableMultipart) {
            sendable = new FormData();
            this._onBuildItemForm(item, sendable);
            /** @type {?} */
            var appendFile = (/**
             * @return {?}
             */
            function () { return sendable.append(item.alias, item._file, item.file.name); });
            if (!this.options.parametersBeforeFiles) {
                appendFile();
            }
            // For AWS, Additional Parameters must come BEFORE Files
            if (this.options.additionalParameter !== undefined) {
                Object.keys(this.options.additionalParameter).forEach((/**
                 * @param {?} key
                 * @return {?}
                 */
                function (key) {
                    /** @type {?} */
                    var paramVal = _this.options.additionalParameter[key];
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
        function (event) {
            /** @type {?} */
            var progress = Math.round(event.lengthComputable ? event.loaded * 100 / event.total : 0);
            _this._onProgressItem(item, progress);
        });
        xhr.onload = (/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var headers = _this._parseHeaders(xhr.getAllResponseHeaders());
            /** @type {?} */
            var response = _this._transformResponse(xhr.response, headers);
            /** @type {?} */
            var gist = _this._isSuccessCode(xhr.status) ? 'Success' : 'Error';
            /** @type {?} */
            var method = '_on' + gist + 'Item';
            ((/** @type {?} */ (_this)))[method](item, response, xhr.status, headers);
            _this._onCompleteItem(item, response, xhr.status, headers);
        });
        xhr.onerror = (/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var headers = _this._parseHeaders(xhr.getAllResponseHeaders());
            /** @type {?} */
            var response = _this._transformResponse(xhr.response, headers);
            _this._onErrorItem(item, response, xhr.status, headers);
            _this._onCompleteItem(item, response, xhr.status, headers);
        });
        xhr.onabort = (/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var headers = _this._parseHeaders(xhr.getAllResponseHeaders());
            /** @type {?} */
            var response = _this._transformResponse(xhr.response, headers);
            _this._onCancelItem(item, response, xhr.status, headers);
            _this._onCompleteItem(item, response, xhr.status, headers);
        });
        xhr.open(item.method, item.url, true);
        xhr.withCredentials = item.withCredentials;
        if (this.options.headers) {
            try {
                for (var _c = tslib_1.__values(this.options.headers), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var header = _d.value;
                    xhr.setRequestHeader(header.name, header.value);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
        if (item.headers.length) {
            try {
                for (var _e = tslib_1.__values(item.headers), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var header = _f.value;
                    xhr.setRequestHeader(header.name, header.value);
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                }
                finally { if (e_3) throw e_3.error; }
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
            function (result) { return xhr.send(JSON.stringify(result)); }));
        }
        else {
            xhr.send(sendable);
        }
        this._render();
    };
    /**
     * @protected
     * @param {?=} value
     * @return {?}
     */
    FileUploader.prototype._getTotalProgress = /**
     * @protected
     * @param {?=} value
     * @return {?}
     */
    function (value) {
        if (value === void 0) { value = 0; }
        if (this.options.removeAfterUpload) {
            return value;
        }
        /** @type {?} */
        var notUploaded = this.getNotUploadedItems().length;
        /** @type {?} */
        var uploaded = notUploaded ? this.queue.length - notUploaded : this.queue.length;
        /** @type {?} */
        var ratio = 100 / this.queue.length;
        /** @type {?} */
        var current = value * ratio / 100;
        return Math.round(uploaded * ratio + current);
    };
    /**
     * @protected
     * @param {?} filters
     * @return {?}
     */
    FileUploader.prototype._getFilters = /**
     * @protected
     * @param {?} filters
     * @return {?}
     */
    function (filters) {
        if (!filters) {
            return this.options.filters;
        }
        if (Array.isArray(filters)) {
            return filters;
        }
        if (typeof filters === 'string') {
            /** @type {?} */
            var names_1 = filters.match(/[^\s,]+/g);
            return this.options.filters
                .filter((/**
             * @param {?} filter
             * @return {?}
             */
            function (filter) { return names_1.indexOf(filter.name) !== -1; }));
        }
        return this.options.filters;
    };
    /**
     * @protected
     * @return {?}
     */
    FileUploader.prototype._render = /**
     * @protected
     * @return {?}
     */
    function () {
        return void 0;
    };
    /**
     * @protected
     * @return {?}
     */
    FileUploader.prototype._queueLimitFilter = /**
     * @protected
     * @return {?}
     */
    function () {
        return this.options.queueLimit === undefined || this.queue.length < this.options.queueLimit;
    };
    /**
     * @protected
     * @param {?} file
     * @param {?} filters
     * @param {?} options
     * @return {?}
     */
    FileUploader.prototype._isValidFile = /**
     * @protected
     * @param {?} file
     * @param {?} filters
     * @param {?} options
     * @return {?}
     */
    function (file, filters, options) {
        var _this = this;
        this._failFilterIndex = -1;
        return !filters.length ? true : filters.every((/**
         * @param {?} filter
         * @return {?}
         */
        function (filter) {
            _this._failFilterIndex++;
            return filter.fn.call(_this, file, options);
        }));
    };
    /**
     * @protected
     * @param {?} status
     * @return {?}
     */
    FileUploader.prototype._isSuccessCode = /**
     * @protected
     * @param {?} status
     * @return {?}
     */
    function (status) {
        return (status >= 200 && status < 300) || status === 304;
    };
    /**
     * @protected
     * @param {?} response
     * @param {?} headers
     * @return {?}
     */
    FileUploader.prototype._transformResponse = /**
     * @protected
     * @param {?} response
     * @param {?} headers
     * @return {?}
     */
    function (response, headers) {
        return response;
    };
    /**
     * @protected
     * @param {?} headers
     * @return {?}
     */
    FileUploader.prototype._parseHeaders = /**
     * @protected
     * @param {?} headers
     * @return {?}
     */
    function (headers) {
        /** @type {?} */
        var parsed = {};
        /** @type {?} */
        var key;
        /** @type {?} */
        var val;
        /** @type {?} */
        var i;
        if (!headers) {
            return parsed;
        }
        headers.split('\n').map((/**
         * @param {?} line
         * @return {?}
         */
        function (line) {
            i = line.indexOf(':');
            key = line.slice(0, i).trim().toLowerCase();
            val = line.slice(i + 1).trim();
            if (key) {
                parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
            }
        }));
        return parsed;
    };
    /**
     * @protected
     * @param {?} item
     * @param {?} filter
     * @param {?} options
     * @return {?}
     */
    FileUploader.prototype._onWhenAddingFileFailed = /**
     * @protected
     * @param {?} item
     * @param {?} filter
     * @param {?} options
     * @return {?}
     */
    function (item, filter, options) {
        this.onWhenAddingFileFailed(item, filter, options);
    };
    /**
     * @protected
     * @param {?} item
     * @return {?}
     */
    FileUploader.prototype._onAfterAddingFile = /**
     * @protected
     * @param {?} item
     * @return {?}
     */
    function (item) {
        this.onAfterAddingFile(item);
    };
    /**
     * @protected
     * @param {?} items
     * @return {?}
     */
    FileUploader.prototype._onAfterAddingAll = /**
     * @protected
     * @param {?} items
     * @return {?}
     */
    function (items) {
        this.onAfterAddingAll(items);
    };
    /**
     * @protected
     * @param {?} item
     * @return {?}
     */
    FileUploader.prototype._onBeforeUploadItem = /**
     * @protected
     * @param {?} item
     * @return {?}
     */
    function (item) {
        item._onBeforeUpload();
        this.onBeforeUploadItem(item);
    };
    /**
     * @protected
     * @param {?} item
     * @param {?} form
     * @return {?}
     */
    FileUploader.prototype._onBuildItemForm = /**
     * @protected
     * @param {?} item
     * @param {?} form
     * @return {?}
     */
    function (item, form) {
        item._onBuildForm(form);
        this.onBuildItemForm(item, form);
    };
    /**
     * @protected
     * @param {?} item
     * @param {?} progress
     * @return {?}
     */
    FileUploader.prototype._onProgressItem = /**
     * @protected
     * @param {?} item
     * @param {?} progress
     * @return {?}
     */
    function (item, progress) {
        /** @type {?} */
        var total = this._getTotalProgress(progress);
        this.progress = total;
        item._onProgress(progress);
        this.onProgressItem(item, progress);
        this.onProgressAll(total);
        this._render();
    };
    /**
     * @protected
     * @param {?} item
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    FileUploader.prototype._onSuccessItem = /**
     * @protected
     * @param {?} item
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    function (item, response, status, headers) {
        item._onSuccess(response, status, headers);
        this.onSuccessItem(item, response, status, headers);
    };
    /**
     * @protected
     * @param {?} item
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    FileUploader.prototype._onCancelItem = /**
     * @protected
     * @param {?} item
     * @param {?} response
     * @param {?} status
     * @param {?} headers
     * @return {?}
     */
    function (item, response, status, headers) {
        item._onCancel(response, status, headers);
        this.onCancelItem(item, response, status, headers);
    };
    return FileUploader;
}());
export { FileUploader };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS11cGxvYWRlci5jbGFzcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtdWkvIiwic291cmNlcyI6WyJzcmMvZmlsZS11cGxvYWQvZmlsZS11cGxvYWRlci5jbGFzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzFELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM3QyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7Ozs7O0FBRTdDLFNBQVMsTUFBTSxDQUFDLEtBQVU7SUFDeEIsT0FBTyxDQUFDLElBQUksSUFBSSxLQUFLLFlBQVksSUFBSSxDQUFDLENBQUM7QUFDekMsQ0FBQzs7OztBQUVELDZCQUdDOzs7SUFGQyx1QkFBYTs7SUFDYix3QkFBYzs7Ozs7QUFVaEIseUNBb0JDOzs7SUFuQkMsOENBQTJCOztJQUMzQiw4Q0FBMkI7O0lBQzNCLHlDQUFxQjs7SUFDckIsc0NBQWtCOztJQUNsQixzQ0FBMkI7O0lBQzNCLHNDQUFvQjs7SUFDcEIscUNBQWdCOztJQUNoQix3Q0FBbUI7O0lBQ25CLDBDQUFxQjs7SUFDckIseUNBQW9COztJQUNwQixnREFBNEI7O0lBQzVCLGtDQUFhOztJQUNiLCtDQUEyQjs7SUFDM0Isd0NBQW1COztJQUNuQiw4Q0FBeUI7O0lBQ3pCLGtEQUErQzs7SUFDL0Msb0RBQWdDOztJQUNoQyxpREFBOEI7O0lBQzlCLHdEQUFvQzs7QUFHdEM7SUF1QkUsc0JBQW1CLE9BQTRCO1FBcEJ4QyxnQkFBVyxHQUFZLEtBQUssQ0FBQztRQUM3QixVQUFLLEdBQWUsRUFBRSxDQUFDO1FBQ3ZCLGFBQVEsR0FBVyxDQUFDLENBQUM7UUFDckIsZUFBVSxHQUFXLENBQUMsQ0FBQztRQUt2QixZQUFPLEdBQXdCO1lBQ3BDLFVBQVUsRUFB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Q0FBQztRQUMxQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFDSCxtQkFBQztBQUFELENBQUMsQUF0Y0QsSUFzY0M7Ozs7SUFwY0MsaUNBQXlCOztJQUN6QixtQ0FBb0M7O0lBQ3BDLDZCQUE4Qjs7SUFDOUIsZ0NBQTRCOztJQUM1QixrQ0FBOEI7O0lBQzlCLGtDQUF1Qjs7SUFDdkIsdUNBQStCOztJQUMvQixnQ0FBbUM7O0lBRW5DLCtCQVFFOzs7OztJQUVGLHdDQUFtQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRmlsZUxpa2VPYmplY3QgfSBmcm9tICcuL2ZpbGUtbGlrZS1vYmplY3QuY2xhc3MnO1xuaW1wb3J0IHsgRmlsZUl0ZW0gfSBmcm9tICcuL2ZpbGUtaXRlbS5jbGFzcyc7XG5pbXBvcnQgeyBGaWxlVHlwZSB9IGZyb20gJy4vZmlsZS10eXBlLmNsYXNzJztcblxuZnVuY3Rpb24gaXNGaWxlKHZhbHVlOiBhbnkpOiBib29sZWFuIHtcbiAgcmV0dXJuIChGaWxlICYmIHZhbHVlIGluc3RhbmNlb2YgRmlsZSk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSGVhZGVycyB7XG4gIG5hbWU6IHN0cmluZztcbiAgdmFsdWU6IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgUGFyc2VkUmVzcG9uc2VIZWFkZXJzID0geyBbIGhlYWRlckZpZWxkTmFtZTogc3RyaW5nIF06IHN0cmluZyB9O1xuXG5leHBvcnQgdHlwZSBGaWx0ZXJGdW5jdGlvbiA9IHtcbiAgbmFtZTogc3RyaW5nLFxuICBmbjogKGl0ZW0/OiBGaWxlTGlrZU9iamVjdCwgb3B0aW9ucz86IEZpbGVVcGxvYWRlck9wdGlvbnMpID0+IGJvb2xlYW5cbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmlsZVVwbG9hZGVyT3B0aW9ucyB7XG4gIGFsbG93ZWRNaW1lVHlwZT86IHN0cmluZ1tdO1xuICBhbGxvd2VkRmlsZVR5cGU/OiBzdHJpbmdbXTtcbiAgYXV0b1VwbG9hZD86IGJvb2xlYW47XG4gIGlzSFRNTDU/OiBib29sZWFuO1xuICBmaWx0ZXJzPzogRmlsdGVyRnVuY3Rpb25bXTtcbiAgaGVhZGVycz86IEhlYWRlcnNbXTtcbiAgbWV0aG9kPzogc3RyaW5nO1xuICBhdXRoVG9rZW4/OiBzdHJpbmc7XG4gIG1heEZpbGVTaXplPzogbnVtYmVyO1xuICBxdWV1ZUxpbWl0PzogbnVtYmVyO1xuICByZW1vdmVBZnRlclVwbG9hZD86IGJvb2xlYW47XG4gIHVybD86IHN0cmluZztcbiAgZGlzYWJsZU11bHRpcGFydD86IGJvb2xlYW47XG4gIGl0ZW1BbGlhcz86IHN0cmluZztcbiAgYXV0aFRva2VuSGVhZGVyPzogc3RyaW5nO1xuICBhZGRpdGlvbmFsUGFyYW1ldGVyPzogeyBbIGtleTogc3RyaW5nIF06IGFueSB9O1xuICBwYXJhbWV0ZXJzQmVmb3JlRmlsZXM/OiBib29sZWFuO1xuICBmb3JtYXREYXRhRnVuY3Rpb24/OiBGdW5jdGlvbjtcbiAgZm9ybWF0RGF0YUZ1bmN0aW9uSXNBc3luYz86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBjbGFzcyBGaWxlVXBsb2FkZXIge1xuXG4gIHB1YmxpYyBhdXRoVG9rZW46IHN0cmluZztcbiAgcHVibGljIGlzVXBsb2FkaW5nOiBib29sZWFuID0gZmFsc2U7XG4gIHB1YmxpYyBxdWV1ZTogRmlsZUl0ZW1bXSA9IFtdO1xuICBwdWJsaWMgcHJvZ3Jlc3M6IG51bWJlciA9IDA7XG4gIHB1YmxpYyBfbmV4dEluZGV4OiBudW1iZXIgPSAwO1xuICBwdWJsaWMgYXV0b1VwbG9hZDogYW55O1xuICBwdWJsaWMgYXV0aFRva2VuSGVhZGVyOiBzdHJpbmc7XG4gIHB1YmxpYyByZXNwb25zZTogRXZlbnRFbWl0dGVyPGFueT47XG5cbiAgcHVibGljIG9wdGlvbnM6IEZpbGVVcGxvYWRlck9wdGlvbnMgPSB7XG4gICAgYXV0b1VwbG9hZDogZmFsc2UsXG4gICAgaXNIVE1MNTogdHJ1ZSxcbiAgICBmaWx0ZXJzOiBbXSxcbiAgICByZW1vdmVBZnRlclVwbG9hZDogZmFsc2UsXG4gICAgZGlzYWJsZU11bHRpcGFydDogZmFsc2UsXG4gICAgZm9ybWF0RGF0YUZ1bmN0aW9uOiAoaXRlbTogRmlsZUl0ZW0pID0+IGl0ZW0uX2ZpbGUsXG4gICAgZm9ybWF0RGF0YUZ1bmN0aW9uSXNBc3luYzogZmFsc2VcbiAgfTtcblxuICBwcm90ZWN0ZWQgX2ZhaWxGaWx0ZXJJbmRleDogbnVtYmVyO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihvcHRpb25zOiBGaWxlVXBsb2FkZXJPcHRpb25zKSB7XG4gICAgdGhpcy5zZXRPcHRpb25zKG9wdGlvbnMpO1xuICAgIHRoaXMucmVzcG9uc2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRPcHRpb25zKG9wdGlvbnM6IEZpbGVVcGxvYWRlck9wdGlvbnMpOiB2b2lkIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHRoaXMub3B0aW9ucywgb3B0aW9ucyk7XG5cbiAgICB0aGlzLmF1dGhUb2tlbiA9IHRoaXMub3B0aW9ucy5hdXRoVG9rZW47XG4gICAgdGhpcy5hdXRoVG9rZW5IZWFkZXIgPSB0aGlzLm9wdGlvbnMuYXV0aFRva2VuSGVhZGVyIHx8ICdBdXRob3JpemF0aW9uJztcbiAgICB0aGlzLmF1dG9VcGxvYWQgPSB0aGlzLm9wdGlvbnMuYXV0b1VwbG9hZDtcbiAgICB0aGlzLm9wdGlvbnMuZmlsdGVycy51bnNoaWZ0KHsgbmFtZTogJ3F1ZXVlTGltaXQnLCBmbjogdGhpcy5fcXVldWVMaW1pdEZpbHRlciB9KTtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMubWF4RmlsZVNpemUpIHtcbiAgICAgIHRoaXMub3B0aW9ucy5maWx0ZXJzLnVuc2hpZnQoeyBuYW1lOiAnZmlsZVNpemUnLCBmbjogdGhpcy5fZmlsZVNpemVGaWx0ZXIgfSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5hbGxvd2VkRmlsZVR5cGUpIHtcbiAgICAgIHRoaXMub3B0aW9ucy5maWx0ZXJzLnVuc2hpZnQoeyBuYW1lOiAnZmlsZVR5cGUnLCBmbjogdGhpcy5fZmlsZVR5cGVGaWx0ZXIgfSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5hbGxvd2VkTWltZVR5cGUpIHtcbiAgICAgIHRoaXMub3B0aW9ucy5maWx0ZXJzLnVuc2hpZnQoeyBuYW1lOiAnbWltZVR5cGUnLCBmbjogdGhpcy5fbWltZVR5cGVGaWx0ZXIgfSk7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnF1ZXVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLnF1ZXVlWyBpIF0udXJsID0gdGhpcy5vcHRpb25zLnVybDtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYWRkVG9RdWV1ZShmaWxlczogRmlsZVtdLCBvcHRpb25zPzogRmlsZVVwbG9hZGVyT3B0aW9ucywgZmlsdGVycz86IEZpbHRlckZ1bmN0aW9uW10gfCBzdHJpbmcpOiB2b2lkIHtcbiAgICBsZXQgbGlzdDogRmlsZVtdID0gW107XG4gICAgZm9yIChsZXQgZmlsZSBvZiBmaWxlcykge1xuICAgICAgbGlzdC5wdXNoKGZpbGUpO1xuICAgIH1cbiAgICBsZXQgYXJyYXlPZkZpbHRlcnMgPSB0aGlzLl9nZXRGaWx0ZXJzKGZpbHRlcnMpO1xuICAgIGxldCBjb3VudCA9IHRoaXMucXVldWUubGVuZ3RoO1xuICAgIGxldCBhZGRlZEZpbGVJdGVtczogRmlsZUl0ZW1bXSA9IFtdO1xuICAgIGxpc3QubWFwKChzb21lOiBGaWxlKSA9PiB7XG4gICAgICBpZiAoIW9wdGlvbnMpIHtcbiAgICAgICAgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcbiAgICAgIH1cblxuICAgICAgbGV0IHRlbXAgPSBuZXcgRmlsZUxpa2VPYmplY3Qoc29tZSk7XG4gICAgICBpZiAodGhpcy5faXNWYWxpZEZpbGUodGVtcCwgYXJyYXlPZkZpbHRlcnMsIG9wdGlvbnMpKSB7XG4gICAgICAgIGxldCBmaWxlSXRlbSA9IG5ldyBGaWxlSXRlbSh0aGlzLCBzb21lLCBvcHRpb25zKTtcbiAgICAgICAgYWRkZWRGaWxlSXRlbXMucHVzaChmaWxlSXRlbSk7XG4gICAgICAgIHRoaXMucXVldWUucHVzaChmaWxlSXRlbSk7XG4gICAgICAgIHRoaXMuX29uQWZ0ZXJBZGRpbmdGaWxlKGZpbGVJdGVtKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCBmaWx0ZXIgPSBhcnJheU9mRmlsdGVyc1sgdGhpcy5fZmFpbEZpbHRlckluZGV4IF07XG4gICAgICAgIHRoaXMuX29uV2hlbkFkZGluZ0ZpbGVGYWlsZWQodGVtcCwgZmlsdGVyLCBvcHRpb25zKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAodGhpcy5xdWV1ZS5sZW5ndGggIT09IGNvdW50KSB7XG4gICAgICB0aGlzLl9vbkFmdGVyQWRkaW5nQWxsKGFkZGVkRmlsZUl0ZW1zKTtcbiAgICAgIHRoaXMucHJvZ3Jlc3MgPSB0aGlzLl9nZXRUb3RhbFByb2dyZXNzKCk7XG4gICAgfVxuICAgIHRoaXMuX3JlbmRlcigpO1xuICAgIGlmICh0aGlzLm9wdGlvbnMuYXV0b1VwbG9hZCkge1xuICAgICAgdGhpcy51cGxvYWRBbGwoKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgcmVtb3ZlRnJvbVF1ZXVlKHZhbHVlOiBGaWxlSXRlbSk6IHZvaWQge1xuICAgIGxldCBpbmRleCA9IHRoaXMuZ2V0SW5kZXhPZkl0ZW0odmFsdWUpO1xuICAgIGxldCBpdGVtID0gdGhpcy5xdWV1ZVsgaW5kZXggXTtcbiAgICBpZiAoaXRlbS5pc1VwbG9hZGluZykge1xuICAgICAgaXRlbS5jYW5jZWwoKTtcbiAgICB9XG4gICAgdGhpcy5xdWV1ZS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIHRoaXMucHJvZ3Jlc3MgPSB0aGlzLl9nZXRUb3RhbFByb2dyZXNzKCk7XG4gIH1cblxuICBwdWJsaWMgY2xlYXJRdWV1ZSgpOiB2b2lkIHtcbiAgICB3aGlsZSAodGhpcy5xdWV1ZS5sZW5ndGgpIHtcbiAgICAgIHRoaXMucXVldWVbIDAgXS5yZW1vdmUoKTtcbiAgICB9XG4gICAgdGhpcy5wcm9ncmVzcyA9IDA7XG4gIH1cblxuICBwdWJsaWMgdXBsb2FkSXRlbSh2YWx1ZTogRmlsZUl0ZW0pOiB2b2lkIHtcbiAgICBsZXQgaW5kZXggPSB0aGlzLmdldEluZGV4T2ZJdGVtKHZhbHVlKTtcbiAgICBsZXQgaXRlbSA9IHRoaXMucXVldWVbIGluZGV4IF07XG4gICAgbGV0IHRyYW5zcG9ydCA9IHRoaXMub3B0aW9ucy5pc0hUTUw1ID8gJ194aHJUcmFuc3BvcnQnIDogJ19pZnJhbWVUcmFuc3BvcnQnO1xuICAgIGl0ZW0uX3ByZXBhcmVUb1VwbG9hZGluZygpO1xuICAgIGlmICh0aGlzLmlzVXBsb2FkaW5nKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuaXNVcGxvYWRpbmcgPSB0cnVlO1xuICAgICh0aGlzIGFzIGFueSlbIHRyYW5zcG9ydCBdKGl0ZW0pO1xuICB9XG5cbiAgcHVibGljIGNhbmNlbEl0ZW0odmFsdWU6IEZpbGVJdGVtKTogdm9pZCB7XG4gICAgbGV0IGluZGV4ID0gdGhpcy5nZXRJbmRleE9mSXRlbSh2YWx1ZSk7XG4gICAgbGV0IGl0ZW0gPSB0aGlzLnF1ZXVlWyBpbmRleCBdO1xuICAgIGxldCBwcm9wID0gdGhpcy5vcHRpb25zLmlzSFRNTDUgPyBpdGVtLl94aHIgOiBpdGVtLl9mb3JtO1xuICAgIGlmIChpdGVtICYmIGl0ZW0uaXNVcGxvYWRpbmcpIHtcbiAgICAgIHByb3AuYWJvcnQoKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgdXBsb2FkQWxsKCk6IHZvaWQge1xuICAgIGxldCBpdGVtcyA9IHRoaXMuZ2V0Tm90VXBsb2FkZWRJdGVtcygpLmZpbHRlcigoaXRlbTogRmlsZUl0ZW0pID0+ICFpdGVtLmlzVXBsb2FkaW5nKTtcbiAgICBpZiAoIWl0ZW1zLmxlbmd0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpdGVtcy5tYXAoKGl0ZW06IEZpbGVJdGVtKSA9PiBpdGVtLl9wcmVwYXJlVG9VcGxvYWRpbmcoKSk7XG4gICAgaXRlbXNbIDAgXS51cGxvYWQoKTtcbiAgfVxuXG4gIHB1YmxpYyBjYW5jZWxBbGwoKTogdm9pZCB7XG4gICAgbGV0IGl0ZW1zID0gdGhpcy5nZXROb3RVcGxvYWRlZEl0ZW1zKCk7XG4gICAgaXRlbXMubWFwKChpdGVtOiBGaWxlSXRlbSkgPT4gaXRlbS5jYW5jZWwoKSk7XG4gIH1cblxuICBwdWJsaWMgaXNGaWxlKHZhbHVlOiBhbnkpOiBib29sZWFuIHtcbiAgICByZXR1cm4gaXNGaWxlKHZhbHVlKTtcbiAgfVxuXG4gIHB1YmxpYyBpc0ZpbGVMaWtlT2JqZWN0KHZhbHVlOiBhbnkpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBGaWxlTGlrZU9iamVjdDtcbiAgfVxuXG4gIHB1YmxpYyBnZXRJbmRleE9mSXRlbSh2YWx1ZTogYW55KTogbnVtYmVyIHtcbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyA/IHZhbHVlIDogdGhpcy5xdWV1ZS5pbmRleE9mKHZhbHVlKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXROb3RVcGxvYWRlZEl0ZW1zKCk6IGFueVtdIHtcbiAgICByZXR1cm4gdGhpcy5xdWV1ZS5maWx0ZXIoKGl0ZW06IEZpbGVJdGVtKSA9PiAhaXRlbS5pc1VwbG9hZGVkKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRSZWFkeUl0ZW1zKCk6IGFueVtdIHtcbiAgICByZXR1cm4gdGhpcy5xdWV1ZVxuICAgICAgLmZpbHRlcigoaXRlbTogRmlsZUl0ZW0pID0+IChpdGVtLmlzUmVhZHkgJiYgIWl0ZW0uaXNVcGxvYWRpbmcpKVxuICAgICAgLnNvcnQoKGl0ZW0xOiBhbnksIGl0ZW0yOiBhbnkpID0+IGl0ZW0xLmluZGV4IC0gaXRlbTIuaW5kZXgpO1xuICB9XG5cbiAgcHVibGljIGRlc3Ryb3koKTogdm9pZCB7XG4gICAgcmV0dXJuIHZvaWQgMDtcbiAgfVxuXG4gIHB1YmxpYyBvbkFmdGVyQWRkaW5nQWxsKGZpbGVJdGVtczogYW55KTogYW55IHtcbiAgICByZXR1cm4geyBmaWxlSXRlbXMgfTtcbiAgfVxuXG4gIHB1YmxpYyBvbkJ1aWxkSXRlbUZvcm0oZmlsZUl0ZW06IEZpbGVJdGVtLCBmb3JtOiBhbnkpOiBhbnkge1xuICAgIHJldHVybiB7IGZpbGVJdGVtLCBmb3JtIH07XG4gIH1cblxuICBwdWJsaWMgb25BZnRlckFkZGluZ0ZpbGUoZmlsZUl0ZW06IEZpbGVJdGVtKTogYW55IHtcbiAgICByZXR1cm4geyBmaWxlSXRlbSB9O1xuICB9XG5cbiAgcHVibGljIG9uV2hlbkFkZGluZ0ZpbGVGYWlsZWQoaXRlbTogRmlsZUxpa2VPYmplY3QsIGZpbHRlcjogYW55LCBvcHRpb25zOiBhbnkpOiBhbnkge1xuICAgIHJldHVybiB7IGl0ZW0sIGZpbHRlciwgb3B0aW9ucyB9O1xuICB9XG5cbiAgcHVibGljIG9uQmVmb3JlVXBsb2FkSXRlbShmaWxlSXRlbTogRmlsZUl0ZW0pOiBhbnkge1xuICAgIHJldHVybiB7IGZpbGVJdGVtIH07XG4gIH1cblxuICBwdWJsaWMgb25Qcm9ncmVzc0l0ZW0oZmlsZUl0ZW06IEZpbGVJdGVtLCBwcm9ncmVzczogYW55KTogYW55IHtcbiAgICByZXR1cm4geyBmaWxlSXRlbSwgcHJvZ3Jlc3MgfTtcbiAgfVxuXG4gIHB1YmxpYyBvblByb2dyZXNzQWxsKHByb2dyZXNzOiBhbnkpOiBhbnkge1xuICAgIHJldHVybiB7IHByb2dyZXNzIH07XG4gIH1cblxuICBwdWJsaWMgb25TdWNjZXNzSXRlbShpdGVtOiBGaWxlSXRlbSwgcmVzcG9uc2U6IHN0cmluZywgc3RhdHVzOiBudW1iZXIsIGhlYWRlcnM6IFBhcnNlZFJlc3BvbnNlSGVhZGVycyk6IGFueSB7XG4gICAgcmV0dXJuIHsgaXRlbSwgcmVzcG9uc2UsIHN0YXR1cywgaGVhZGVycyB9O1xuICB9XG5cbiAgcHVibGljIG9uRXJyb3JJdGVtKGl0ZW06IEZpbGVJdGVtLCByZXNwb25zZTogc3RyaW5nLCBzdGF0dXM6IG51bWJlciwgaGVhZGVyczogUGFyc2VkUmVzcG9uc2VIZWFkZXJzKTogYW55IHtcbiAgICByZXR1cm4geyBpdGVtLCByZXNwb25zZSwgc3RhdHVzLCBoZWFkZXJzIH07XG4gIH1cblxuICBwdWJsaWMgb25DYW5jZWxJdGVtKGl0ZW06IEZpbGVJdGVtLCByZXNwb25zZTogc3RyaW5nLCBzdGF0dXM6IG51bWJlciwgaGVhZGVyczogUGFyc2VkUmVzcG9uc2VIZWFkZXJzKTogYW55IHtcbiAgICByZXR1cm4geyBpdGVtLCByZXNwb25zZSwgc3RhdHVzLCBoZWFkZXJzIH07XG4gIH1cblxuICBwdWJsaWMgb25Db21wbGV0ZUl0ZW0oaXRlbTogRmlsZUl0ZW0sIHJlc3BvbnNlOiBzdHJpbmcsIHN0YXR1czogbnVtYmVyLCBoZWFkZXJzOiBQYXJzZWRSZXNwb25zZUhlYWRlcnMpOiBhbnkge1xuICAgIHJldHVybiB7IGl0ZW0sIHJlc3BvbnNlLCBzdGF0dXMsIGhlYWRlcnMgfTtcbiAgfVxuXG4gIHB1YmxpYyBvbkNvbXBsZXRlQWxsKCk6IGFueSB7XG4gICAgcmV0dXJuIHZvaWQgMDtcbiAgfVxuXG4gIHB1YmxpYyBfbWltZVR5cGVGaWx0ZXIoaXRlbTogRmlsZUxpa2VPYmplY3QpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISh0aGlzLm9wdGlvbnMuYWxsb3dlZE1pbWVUeXBlICYmIHRoaXMub3B0aW9ucy5hbGxvd2VkTWltZVR5cGUuaW5kZXhPZihpdGVtLnR5cGUpID09PSAtMSk7XG4gIH1cblxuICBwdWJsaWMgX2ZpbGVTaXplRmlsdGVyKGl0ZW06IEZpbGVMaWtlT2JqZWN0KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEodGhpcy5vcHRpb25zLm1heEZpbGVTaXplICYmIGl0ZW0uc2l6ZSA+IHRoaXMub3B0aW9ucy5tYXhGaWxlU2l6ZSk7XG4gIH1cblxuICBwdWJsaWMgX2ZpbGVUeXBlRmlsdGVyKGl0ZW06IEZpbGVMaWtlT2JqZWN0KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEodGhpcy5vcHRpb25zLmFsbG93ZWRGaWxlVHlwZSAmJlxuICAgICAgdGhpcy5vcHRpb25zLmFsbG93ZWRGaWxlVHlwZS5pbmRleE9mKEZpbGVUeXBlLmdldE1pbWVDbGFzcyhpdGVtKSkgPT09IC0xKTtcbiAgfVxuXG4gIHB1YmxpYyBfb25FcnJvckl0ZW0oaXRlbTogRmlsZUl0ZW0sIHJlc3BvbnNlOiBzdHJpbmcsIHN0YXR1czogbnVtYmVyLCBoZWFkZXJzOiBQYXJzZWRSZXNwb25zZUhlYWRlcnMpOiB2b2lkIHtcbiAgICBpdGVtLl9vbkVycm9yKHJlc3BvbnNlLCBzdGF0dXMsIGhlYWRlcnMpO1xuICAgIHRoaXMub25FcnJvckl0ZW0oaXRlbSwgcmVzcG9uc2UsIHN0YXR1cywgaGVhZGVycyk7XG4gIH1cblxuICBwdWJsaWMgX29uQ29tcGxldGVJdGVtKGl0ZW06IEZpbGVJdGVtLCByZXNwb25zZTogc3RyaW5nLCBzdGF0dXM6IG51bWJlciwgaGVhZGVyczogUGFyc2VkUmVzcG9uc2VIZWFkZXJzKTogdm9pZCB7XG4gICAgaXRlbS5fb25Db21wbGV0ZShyZXNwb25zZSwgc3RhdHVzLCBoZWFkZXJzKTtcbiAgICB0aGlzLm9uQ29tcGxldGVJdGVtKGl0ZW0sIHJlc3BvbnNlLCBzdGF0dXMsIGhlYWRlcnMpO1xuICAgIGxldCBuZXh0SXRlbSA9IHRoaXMuZ2V0UmVhZHlJdGVtcygpWyAwIF07XG4gICAgdGhpcy5pc1VwbG9hZGluZyA9IGZhbHNlO1xuICAgIGlmIChuZXh0SXRlbSkge1xuICAgICAgbmV4dEl0ZW0udXBsb2FkKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMub25Db21wbGV0ZUFsbCgpO1xuICAgIHRoaXMucHJvZ3Jlc3MgPSB0aGlzLl9nZXRUb3RhbFByb2dyZXNzKCk7XG4gICAgdGhpcy5fcmVuZGVyKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX2hlYWRlcnNHZXR0ZXIocGFyc2VkSGVhZGVyczogUGFyc2VkUmVzcG9uc2VIZWFkZXJzKTogYW55IHtcbiAgICByZXR1cm4gKG5hbWU6IGFueSk6IGFueSA9PiB7XG4gICAgICBpZiAobmFtZSkge1xuICAgICAgICByZXR1cm4gcGFyc2VkSGVhZGVyc1sgbmFtZS50b0xvd2VyQ2FzZSgpIF0gfHwgdm9pZCAwO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHBhcnNlZEhlYWRlcnM7XG4gICAgfTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfeGhyVHJhbnNwb3J0KGl0ZW06IEZpbGVJdGVtKTogYW55IHtcbiAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgbGV0IHhociA9IGl0ZW0uX3hociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgIGxldCBzZW5kYWJsZTogYW55O1xuICAgIHRoaXMuX29uQmVmb3JlVXBsb2FkSXRlbShpdGVtKTtcblxuICAgIGlmICh0eXBlb2YgaXRlbS5fZmlsZS5zaXplICE9PSAnbnVtYmVyJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIGZpbGUgc3BlY2lmaWVkIGlzIG5vIGxvbmdlciB2YWxpZCcpO1xuICAgIH1cbiAgICBpZiAoIXRoaXMub3B0aW9ucy5kaXNhYmxlTXVsdGlwYXJ0KSB7XG4gICAgICBzZW5kYWJsZSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgICAgdGhpcy5fb25CdWlsZEl0ZW1Gb3JtKGl0ZW0sIHNlbmRhYmxlKTtcblxuICAgICAgY29uc3QgYXBwZW5kRmlsZSA9ICgpID0+IHNlbmRhYmxlLmFwcGVuZChpdGVtLmFsaWFzLCBpdGVtLl9maWxlLCBpdGVtLmZpbGUubmFtZSk7XG4gICAgICBpZiAoIXRoaXMub3B0aW9ucy5wYXJhbWV0ZXJzQmVmb3JlRmlsZXMpIHtcbiAgICAgICAgYXBwZW5kRmlsZSgpO1xuICAgICAgfVxuXG4gICAgICAvLyBGb3IgQVdTLCBBZGRpdGlvbmFsIFBhcmFtZXRlcnMgbXVzdCBjb21lIEJFRk9SRSBGaWxlc1xuICAgICAgaWYgKHRoaXMub3B0aW9ucy5hZGRpdGlvbmFsUGFyYW1ldGVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgT2JqZWN0LmtleXModGhpcy5vcHRpb25zLmFkZGl0aW9uYWxQYXJhbWV0ZXIpLmZvckVhY2goKGtleTogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgbGV0IHBhcmFtVmFsID0gdGhpcy5vcHRpb25zLmFkZGl0aW9uYWxQYXJhbWV0ZXJbIGtleSBdO1xuICAgICAgICAgIC8vIEFsbG93IGFuIGFkZGl0aW9uYWwgcGFyYW1ldGVyIHRvIGluY2x1ZGUgdGhlIGZpbGVuYW1lXG4gICAgICAgICAgaWYgKHR5cGVvZiBwYXJhbVZhbCA9PT0gJ3N0cmluZycgJiYgcGFyYW1WYWwuaW5kZXhPZigne3tmaWxlX25hbWV9fScpID49IDApIHtcbiAgICAgICAgICAgIHBhcmFtVmFsID0gcGFyYW1WYWwucmVwbGFjZSgne3tmaWxlX25hbWV9fScsIGl0ZW0uZmlsZS5uYW1lKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgc2VuZGFibGUuYXBwZW5kKGtleSwgcGFyYW1WYWwpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMub3B0aW9ucy5wYXJhbWV0ZXJzQmVmb3JlRmlsZXMpIHtcbiAgICAgICAgYXBwZW5kRmlsZSgpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBzZW5kYWJsZSA9IHRoaXMub3B0aW9ucy5mb3JtYXREYXRhRnVuY3Rpb24oaXRlbSk7XG4gICAgfVxuXG4gICAgeGhyLnVwbG9hZC5vbnByb2dyZXNzID0gKGV2ZW50OiBhbnkpID0+IHtcbiAgICAgIGxldCBwcm9ncmVzcyA9IE1hdGgucm91bmQoZXZlbnQubGVuZ3RoQ29tcHV0YWJsZSA/IGV2ZW50LmxvYWRlZCAqIDEwMCAvIGV2ZW50LnRvdGFsIDogMCk7XG4gICAgICB0aGlzLl9vblByb2dyZXNzSXRlbShpdGVtLCBwcm9ncmVzcyk7XG4gICAgfTtcbiAgICB4aHIub25sb2FkID0gKCkgPT4ge1xuICAgICAgbGV0IGhlYWRlcnMgPSB0aGlzLl9wYXJzZUhlYWRlcnMoeGhyLmdldEFsbFJlc3BvbnNlSGVhZGVycygpKTtcbiAgICAgIGxldCByZXNwb25zZSA9IHRoaXMuX3RyYW5zZm9ybVJlc3BvbnNlKHhoci5yZXNwb25zZSwgaGVhZGVycyk7XG4gICAgICBsZXQgZ2lzdCA9IHRoaXMuX2lzU3VjY2Vzc0NvZGUoeGhyLnN0YXR1cykgPyAnU3VjY2VzcycgOiAnRXJyb3InO1xuICAgICAgbGV0IG1ldGhvZCA9ICdfb24nICsgZ2lzdCArICdJdGVtJztcbiAgICAgICh0aGlzIGFzIGFueSlbIG1ldGhvZCBdKGl0ZW0sIHJlc3BvbnNlLCB4aHIuc3RhdHVzLCBoZWFkZXJzKTtcbiAgICAgIHRoaXMuX29uQ29tcGxldGVJdGVtKGl0ZW0sIHJlc3BvbnNlLCB4aHIuc3RhdHVzLCBoZWFkZXJzKTtcbiAgICB9O1xuICAgIHhoci5vbmVycm9yID0gKCkgPT4ge1xuICAgICAgbGV0IGhlYWRlcnMgPSB0aGlzLl9wYXJzZUhlYWRlcnMoeGhyLmdldEFsbFJlc3BvbnNlSGVhZGVycygpKTtcbiAgICAgIGxldCByZXNwb25zZSA9IHRoaXMuX3RyYW5zZm9ybVJlc3BvbnNlKHhoci5yZXNwb25zZSwgaGVhZGVycyk7XG4gICAgICB0aGlzLl9vbkVycm9ySXRlbShpdGVtLCByZXNwb25zZSwgeGhyLnN0YXR1cywgaGVhZGVycyk7XG4gICAgICB0aGlzLl9vbkNvbXBsZXRlSXRlbShpdGVtLCByZXNwb25zZSwgeGhyLnN0YXR1cywgaGVhZGVycyk7XG4gICAgfTtcbiAgICB4aHIub25hYm9ydCA9ICgpID0+IHtcbiAgICAgIGxldCBoZWFkZXJzID0gdGhpcy5fcGFyc2VIZWFkZXJzKHhoci5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKSk7XG4gICAgICBsZXQgcmVzcG9uc2UgPSB0aGlzLl90cmFuc2Zvcm1SZXNwb25zZSh4aHIucmVzcG9uc2UsIGhlYWRlcnMpO1xuICAgICAgdGhpcy5fb25DYW5jZWxJdGVtKGl0ZW0sIHJlc3BvbnNlLCB4aHIuc3RhdHVzLCBoZWFkZXJzKTtcbiAgICAgIHRoaXMuX29uQ29tcGxldGVJdGVtKGl0ZW0sIHJlc3BvbnNlLCB4aHIuc3RhdHVzLCBoZWFkZXJzKTtcbiAgICB9O1xuICAgIHhoci5vcGVuKGl0ZW0ubWV0aG9kLCBpdGVtLnVybCwgdHJ1ZSk7XG4gICAgeGhyLndpdGhDcmVkZW50aWFscyA9IGl0ZW0ud2l0aENyZWRlbnRpYWxzO1xuICAgIGlmICh0aGlzLm9wdGlvbnMuaGVhZGVycykge1xuICAgICAgZm9yIChsZXQgaGVhZGVyIG9mIHRoaXMub3B0aW9ucy5oZWFkZXJzKSB7XG4gICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKGhlYWRlci5uYW1lLCBoZWFkZXIudmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoaXRlbS5oZWFkZXJzLmxlbmd0aCkge1xuICAgICAgZm9yIChsZXQgaGVhZGVyIG9mIGl0ZW0uaGVhZGVycykge1xuICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihoZWFkZXIubmFtZSwgaGVhZGVyLnZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRoaXMuYXV0aFRva2VuKSB7XG4gICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcih0aGlzLmF1dGhUb2tlbkhlYWRlciwgdGhpcy5hdXRoVG9rZW4pO1xuICAgIH1cbiAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09IFhNTEh0dHBSZXF1ZXN0LkRPTkUpIHtcbiAgICAgICAgdGhhdC5yZXNwb25zZS5lbWl0KHhoci5yZXNwb25zZVRleHQpXG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLm9wdGlvbnMuZm9ybWF0RGF0YUZ1bmN0aW9uSXNBc3luYykge1xuICAgICAgc2VuZGFibGUudGhlbihcbiAgICAgICAgKHJlc3VsdDogYW55KSA9PiB4aHIuc2VuZChKU09OLnN0cmluZ2lmeShyZXN1bHQpKVxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgeGhyLnNlbmQoc2VuZGFibGUpO1xuICAgIH1cbiAgICB0aGlzLl9yZW5kZXIoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfZ2V0VG90YWxQcm9ncmVzcyh2YWx1ZTogbnVtYmVyID0gMCk6IG51bWJlciB7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5yZW1vdmVBZnRlclVwbG9hZCkge1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgICBsZXQgbm90VXBsb2FkZWQgPSB0aGlzLmdldE5vdFVwbG9hZGVkSXRlbXMoKS5sZW5ndGg7XG4gICAgbGV0IHVwbG9hZGVkID0gbm90VXBsb2FkZWQgPyB0aGlzLnF1ZXVlLmxlbmd0aCAtIG5vdFVwbG9hZGVkIDogdGhpcy5xdWV1ZS5sZW5ndGg7XG4gICAgbGV0IHJhdGlvID0gMTAwIC8gdGhpcy5xdWV1ZS5sZW5ndGg7XG4gICAgbGV0IGN1cnJlbnQgPSB2YWx1ZSAqIHJhdGlvIC8gMTAwO1xuICAgIHJldHVybiBNYXRoLnJvdW5kKHVwbG9hZGVkICogcmF0aW8gKyBjdXJyZW50KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfZ2V0RmlsdGVycyhmaWx0ZXJzOiBGaWx0ZXJGdW5jdGlvbltdIHwgc3RyaW5nKTogRmlsdGVyRnVuY3Rpb25bXSB7XG4gICAgaWYgKCFmaWx0ZXJzKSB7XG4gICAgICByZXR1cm4gdGhpcy5vcHRpb25zLmZpbHRlcnM7XG4gICAgfVxuICAgIGlmIChBcnJheS5pc0FycmF5KGZpbHRlcnMpKSB7XG4gICAgICByZXR1cm4gZmlsdGVycztcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBmaWx0ZXJzID09PSAnc3RyaW5nJykge1xuICAgICAgbGV0IG5hbWVzID0gZmlsdGVycy5tYXRjaCgvW15cXHMsXSsvZyk7XG4gICAgICByZXR1cm4gdGhpcy5vcHRpb25zLmZpbHRlcnNcbiAgICAgICAgLmZpbHRlcigoZmlsdGVyOiBhbnkpID0+IG5hbWVzLmluZGV4T2YoZmlsdGVyLm5hbWUpICE9PSAtMSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLm9wdGlvbnMuZmlsdGVycztcbiAgfVxuXG4gIHByb3RlY3RlZCBfcmVuZGVyKCk6IGFueSB7XG4gICAgcmV0dXJuIHZvaWQgMDtcbiAgfVxuXG4gIHByb3RlY3RlZCBfcXVldWVMaW1pdEZpbHRlcigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLnF1ZXVlTGltaXQgPT09IHVuZGVmaW5lZCB8fCB0aGlzLnF1ZXVlLmxlbmd0aCA8IHRoaXMub3B0aW9ucy5xdWV1ZUxpbWl0O1xuICB9XG5cbiAgcHJvdGVjdGVkIF9pc1ZhbGlkRmlsZShmaWxlOiBGaWxlTGlrZU9iamVjdCwgZmlsdGVyczogRmlsdGVyRnVuY3Rpb25bXSwgb3B0aW9uczogRmlsZVVwbG9hZGVyT3B0aW9ucyk6IGJvb2xlYW4ge1xuICAgIHRoaXMuX2ZhaWxGaWx0ZXJJbmRleCA9IC0xO1xuICAgIHJldHVybiAhZmlsdGVycy5sZW5ndGggPyB0cnVlIDogZmlsdGVycy5ldmVyeSgoZmlsdGVyOiBGaWx0ZXJGdW5jdGlvbikgPT4ge1xuICAgICAgdGhpcy5fZmFpbEZpbHRlckluZGV4Kys7XG4gICAgICByZXR1cm4gZmlsdGVyLmZuLmNhbGwodGhpcywgZmlsZSwgb3B0aW9ucyk7XG4gICAgfSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX2lzU3VjY2Vzc0NvZGUoc3RhdHVzOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKHN0YXR1cyA+PSAyMDAgJiYgc3RhdHVzIDwgMzAwKSB8fCBzdGF0dXMgPT09IDMwNDtcbiAgfVxuXG4gIHByb3RlY3RlZCBfdHJhbnNmb3JtUmVzcG9uc2UocmVzcG9uc2U6IHN0cmluZywgaGVhZGVyczogUGFyc2VkUmVzcG9uc2VIZWFkZXJzKTogc3RyaW5nIHtcbiAgICByZXR1cm4gcmVzcG9uc2U7XG4gIH1cblxuICBwcm90ZWN0ZWQgX3BhcnNlSGVhZGVycyhoZWFkZXJzOiBzdHJpbmcpOiBQYXJzZWRSZXNwb25zZUhlYWRlcnMge1xuICAgIGxldCBwYXJzZWQ6IGFueSA9IHt9O1xuICAgIGxldCBrZXk6IGFueTtcbiAgICBsZXQgdmFsOiBhbnk7XG4gICAgbGV0IGk6IGFueTtcbiAgICBpZiAoIWhlYWRlcnMpIHtcbiAgICAgIHJldHVybiBwYXJzZWQ7XG4gICAgfVxuICAgIGhlYWRlcnMuc3BsaXQoJ1xcbicpLm1hcCgobGluZTogYW55KSA9PiB7XG4gICAgICBpID0gbGluZS5pbmRleE9mKCc6Jyk7XG4gICAgICBrZXkgPSBsaW5lLnNsaWNlKDAsIGkpLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgdmFsID0gbGluZS5zbGljZShpICsgMSkudHJpbSgpO1xuICAgICAgaWYgKGtleSkge1xuICAgICAgICBwYXJzZWRbIGtleSBdID0gcGFyc2VkWyBrZXkgXSA/IHBhcnNlZFsga2V5IF0gKyAnLCAnICsgdmFsIDogdmFsO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBwYXJzZWQ7XG4gIH1cblxuICBwcm90ZWN0ZWQgX29uV2hlbkFkZGluZ0ZpbGVGYWlsZWQoaXRlbTogRmlsZUxpa2VPYmplY3QsIGZpbHRlcjogYW55LCBvcHRpb25zOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLm9uV2hlbkFkZGluZ0ZpbGVGYWlsZWQoaXRlbSwgZmlsdGVyLCBvcHRpb25zKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfb25BZnRlckFkZGluZ0ZpbGUoaXRlbTogRmlsZUl0ZW0pOiB2b2lkIHtcbiAgICB0aGlzLm9uQWZ0ZXJBZGRpbmdGaWxlKGl0ZW0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9vbkFmdGVyQWRkaW5nQWxsKGl0ZW1zOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLm9uQWZ0ZXJBZGRpbmdBbGwoaXRlbXMpO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9vbkJlZm9yZVVwbG9hZEl0ZW0oaXRlbTogRmlsZUl0ZW0pOiB2b2lkIHtcbiAgICBpdGVtLl9vbkJlZm9yZVVwbG9hZCgpO1xuICAgIHRoaXMub25CZWZvcmVVcGxvYWRJdGVtKGl0ZW0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9vbkJ1aWxkSXRlbUZvcm0oaXRlbTogRmlsZUl0ZW0sIGZvcm06IGFueSk6IHZvaWQge1xuICAgIGl0ZW0uX29uQnVpbGRGb3JtKGZvcm0pO1xuICAgIHRoaXMub25CdWlsZEl0ZW1Gb3JtKGl0ZW0sIGZvcm0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9vblByb2dyZXNzSXRlbShpdGVtOiBGaWxlSXRlbSwgcHJvZ3Jlc3M6IGFueSk6IHZvaWQge1xuICAgIGxldCB0b3RhbCA9IHRoaXMuX2dldFRvdGFsUHJvZ3Jlc3MocHJvZ3Jlc3MpO1xuICAgIHRoaXMucHJvZ3Jlc3MgPSB0b3RhbDtcbiAgICBpdGVtLl9vblByb2dyZXNzKHByb2dyZXNzKTtcbiAgICB0aGlzLm9uUHJvZ3Jlc3NJdGVtKGl0ZW0sIHByb2dyZXNzKTtcbiAgICB0aGlzLm9uUHJvZ3Jlc3NBbGwodG90YWwpO1xuICAgIHRoaXMuX3JlbmRlcigpO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9vblN1Y2Nlc3NJdGVtKGl0ZW06IEZpbGVJdGVtLCByZXNwb25zZTogc3RyaW5nLCBzdGF0dXM6IG51bWJlciwgaGVhZGVyczogUGFyc2VkUmVzcG9uc2VIZWFkZXJzKTogdm9pZCB7XG4gICAgaXRlbS5fb25TdWNjZXNzKHJlc3BvbnNlLCBzdGF0dXMsIGhlYWRlcnMpO1xuICAgIHRoaXMub25TdWNjZXNzSXRlbShpdGVtLCByZXNwb25zZSwgc3RhdHVzLCBoZWFkZXJzKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfb25DYW5jZWxJdGVtKGl0ZW06IEZpbGVJdGVtLCByZXNwb25zZTogc3RyaW5nLCBzdGF0dXM6IG51bWJlciwgaGVhZGVyczogUGFyc2VkUmVzcG9uc2VIZWFkZXJzKTogdm9pZCB7XG4gICAgaXRlbS5fb25DYW5jZWwocmVzcG9uc2UsIHN0YXR1cywgaGVhZGVycyk7XG4gICAgdGhpcy5vbkNhbmNlbEl0ZW0oaXRlbSwgcmVzcG9uc2UsIHN0YXR1cywgaGVhZGVycyk7XG4gIH1cbn1cbiJdfQ==