/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { EXT_ACTION, EXT_CHROME_URL, EXT_FIREFOX_URL, EXT_HASH_ALG, NATIVE_APP_URL } from "./Constants";
import { CertUtils } from "./CertUtils";
var WebTokenSigner = /** @class */ (function () {
    function WebTokenSigner() {
        this.isChrome = /Google Inc/.test(navigator.vendor);
        this.isFirefox = /Firefox/.test(navigator.userAgent);
        this.isWindows = navigator.platform.indexOf('Win') > -1;
        this.osSupported = this.isWindows;
        this.browserSupported = this.isChrome || this.isFirefox;
        this.appInstalled = false;
        this.appInfo = {
            version: null,
            nativeVersion: null,
            nativeLatestVersion: null
        };
        this.textOsUnSupport = 'Tính năng đang hỗ trợ cho máy tính dùng Windows';
        this.textBrowserUnSupport = 'Tính năng đang hỗ trợ cho Chrome và FireFox';
        this.textExtNotInstalled = "\n    C\u1EA7n c\u00E0i \u0111\u1EB7t extension <a href=\"" + (this.isChrome ? EXT_CHROME_URL : EXT_FIREFOX_URL) + "\" target=\"_blank\">TokenSigner</a> tr\u00EAn tr\u00ECnh duy\u1EC7t Web\n    ";
        this.textAppNotInstalled = "\n    C\u1EA7n c\u00E0i \u0111\u1EB7t \u1EE9ng d\u1EE5ng k\u00FD <a href=\"" + NATIVE_APP_URL + "\" target=\"_blank\">TokenSigner</a> tr\u00EAn m\u00E1y t\u00EDnh\n    ";
        this.title = "Chứng thư số";
        this.description = "Chọn chứng thư số để ký";
        this.textOk = 'Đồng ý';
        this.textCancel = 'Đóng';
        this.certNotFound = 'Không tìm thấy chứng thư số';
        this.textIssuer = 'Nhà cung cấp';
        this.textValid = 'Hiệu lực';
        this.zIndex = 1100;
        this._onEscapeKey = this._onEscapeKey.bind(this);
    }
    Object.defineProperty(WebTokenSigner.prototype, "extInstalled", {
        get: /**
         * @return {?}
         */
        function () {
            return !!window['_ExtTokenBridge'];
        },
        enumerable: true,
        configurable: true
    });
    ;
    /**
     * @param {?=} silent
     * @return {?}
     */
    WebTokenSigner.prototype.checkReady = /**
     * @param {?=} silent
     * @return {?}
     */
    function (silent) {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        function (resolve) {
            if (_this.appInstalled) {
                return resolve(true);
            }
            if (!_this.osSupported) {
                if (!silent) {
                    _this._createCertDialog(null, _this.textOsUnSupport);
                }
                return resolve(false);
            }
            if (!_this.browserSupported) {
                if (!silent) {
                    _this._createCertDialog(null, _this.textBrowserUnSupport);
                }
                return resolve(false);
            }
            if (!_this.extInstalled) {
                if (!silent) {
                    _this._createCertDialog(null, _this.textExtNotInstalled);
                }
                return resolve(false);
            }
            _this._loadAppInfo().then((/**
             * @return {?}
             */
            function () {
                if (!_this.appInstalled && !silent) {
                    _this._createCertDialog(null, _this.textAppNotInstalled);
                }
                resolve(_this.appInstalled);
            }));
        }));
    };
    /**
     * @return {?}
     */
    WebTokenSigner.prototype.checkNativeUpdate = /**
     * @return {?}
     */
    function () {
        return this.appInstalled && this.appInfo.nativeVersion < this.appInfo.nativeLatestVersion;
    };
    /**
     * @return {?}
     */
    WebTokenSigner.prototype.loadCerts = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        function (resolve) {
            _this.checkReady(true).then((/**
             * @param {?} ready
             * @return {?}
             */
            function (ready) {
                if (ready) {
                    _this._postExt(EXT_ACTION.GET_CERTS).then((/**
                     * @param {?} data
                     * @return {?}
                     */
                    function (data) {
                        /** @type {?} */
                        var certs = data && data.data || [];
                        certs.forEach((/**
                         * @param {?} cert
                         * @return {?}
                         */
                        function (cert) {
                            cert.subjectData = CertUtils.parseCertString(cert.subject);
                            cert.issuerData = CertUtils.parseCertString(cert.issuer);
                        }));
                        resolve(certs);
                    }));
                }
                else {
                    resolve([]);
                }
            }));
        }));
    };
    /**
     * @param {?} data
     * @return {?}
     */
    WebTokenSigner.prototype.signHash = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        function (resolve) {
            if (data && (data.hash || data.hashs)) {
                _this.checkReady().then((/**
                 * @param {?} ready
                 * @return {?}
                 */
                function (ready) {
                    if (ready) {
                        data.hashAlg = data.hashAlg || EXT_HASH_ALG.SHA1;
                        _this._postExt(EXT_ACTION.SIGN_HASH, data).then(resolve);
                    }
                    else {
                        resolve(null);
                    }
                }));
            }
            else {
                resolve({
                    error: "HASH_MISSING"
                });
            }
        }));
    };
    /**
     * @param {?=} forceSelect
     * @return {?}
     */
    WebTokenSigner.prototype.selectCert = /**
     * @param {?=} forceSelect
     * @return {?}
     */
    function (forceSelect) {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        function (resolve) {
            _this.checkReady().then((/**
             * @param {?} ready
             * @return {?}
             */
            function (ready) {
                if (ready) {
                    _this.loadCerts().then((/**
                     * @param {?} certs
                     * @return {?}
                     */
                    function (certs) {
                        if (certs.length > 1 || forceSelect) {
                            _this._certCallback = resolve;
                            _this._createCertDialog(certs);
                        }
                        else {
                            resolve(certs[0]);
                        }
                    }));
                }
                else {
                    resolve(null);
                }
            }));
        }));
    };
    /**
     * @param {?} dateStr
     * @return {?}
     */
    WebTokenSigner.prototype.dateDisplay = /**
     * @param {?} dateStr
     * @return {?}
     */
    function (dateStr) {
        /** @type {?} */
        var date = new Date(dateStr);
        return [date.getDate(), date.getMonth() + 1, date.getFullYear()].join('/');
    };
    /**
     * @private
     * @param {?} action
     * @param {?=} data
     * @return {?}
     */
    WebTokenSigner.prototype._postExt = /**
     * @private
     * @param {?} action
     * @param {?=} data
     * @return {?}
     */
    function (action, data) {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        function (resolve) {
            if (_this.extInstalled) {
                window["_ExtTokenBridge"].postToExtension(action, data).then((/**
                 * @param {?} response
                 * @return {?}
                 */
                function (response) {
                    resolve(response);
                }));
            }
            else {
                resolve({
                    error: "EXTENSION_NOT_INSTALL"
                });
            }
        }));
    };
    /**
     * @private
     * @return {?}
     */
    WebTokenSigner.prototype._loadAppInfo = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        function (resolve) {
            _this._postExt(EXT_ACTION.GET_INFO).then((/**
             * @param {?} reply
             * @return {?}
             */
            function (reply) {
                if (reply && reply.data) {
                    Object.assign(_this.appInfo, reply.data);
                }
                _this.appInstalled = !!_this.appInfo.nativeVersion;
                resolve();
            }));
        }));
    };
    /**
     * @private
     * @param {?} certs
     * @param {?=} message
     * @return {?}
     */
    WebTokenSigner.prototype._createCertDialog = /**
     * @private
     * @param {?} certs
     * @param {?=} message
     * @return {?}
     */
    function (certs, message) {
        var _this = this;
        if (this._dialog) {
            return;
        }
        this._dialog = document.createElement('div');
        this._dialog.classList.add('webtoken-dialog');
        this._dialog.style.zIndex = this.zIndex;
        this._certs = certs;
        /** @type {?} */
        var msg;
        if (message) {
            msg = '<div class="webtoken-dialog__message">' + message + '</div>';
        }
        else {
            msg = certs.length < 1 ? "<div class=\"webtoken-dialog__message\">" + this.certNotFound + "</div>" : this._buildCertHtml(certs);
        }
        this._dialog.innerHTML = "\n        <style>\n        .webtoken-dialog {\n            position: fixed;\n            top: 0;\n            right: 0;\n            bottom: 0;\n            left: 0;\n            background: rgba(0, 0, 0, .3);\n        }\n        .webtoken-dialog__container {\n            width: 400px;\n            margin: auto;\n            background: #fff;\n            overflow: hidden;\n            color: #333;\n            position: absolute;\n            transform: translate(-50%, -50%);\n            top: 50%;\n            left: 50%;\n            border-radius: 4px;\n        }\n        .webtoken-dialog__header {\n            padding: 10px 15px;\n            border-bottom: 1px solid #ddd;\n        }\n        .webtoken-dialog__title {\n            font-size: 20px;\n            font-weight: bold;\n            margin-bottom: 5px;\n        }\n        .webtoken-dialog__desc {\n            font-size: 14px;\n            line-height: 20px;\n        }\n        .webtoken-dialog__close {\n            float: right;\n            width: 30px;\n            cursor: pointer;\n            text-align: center;\n            line-height: 30px;\n            margin: -5px 0;\n            font-size: 20px;\n        }\n        .webtoken-dialog__body {\n            max-height: 250px;\n            overflow: auto;\n            font-size: 14px;\n            line-height: 20px;\n        }\n        .webtoken-dialog__message {\n            padding: 20px;            \n        }\n        .webtoken-cert__item {\n            padding: 10px 20px;\n            cursor: pointer;\n            line-height: 20px;\n        }\n        .webtoken-cert__item.active {\n            background: #ddd !important;\n        }\n        .webtoken-cert__item:hover {\n            background: #f5f5f5;\n        }\n        .webtoken-cert__title {\n            font-size: 18px;\n            margin-bottom: 2px;\n        }\n        .webtoken-cert__text {\n            font-size: 14px;\n        }\n        .webtoken-dialog__footer {\n            padding: 10px 20px;\n            border-top: 1px solid #ddd;\n            text-align: right;\n        }\n        .webtoken-dialog__button {\n            height: 30px;\n            line-height: 30px;\n            padding: 0 10px;\n            min-width: 60px;\n            margin-left: 10px;\n            cursor: pointer;\n            border-radius: 4px;\n            font-weight: bold;\n            background: #fff;\n            border: 1px solid #ddd;\n        }\n        .webtoken-dialog__button:hover {\n            opacity: 8;\n        }\n        .btn-ok {\n            background: #007bff;\n            border-color: #007bff;\n            color: #fff;\n        }\n        </style>\n        <div class=\"webtoken-dialog__container\">\n        <div class=\"webtoken-dialog__header\">\n        <div class=\"webtoken-dialog__close\">\u00D7</div>\n        <div class=\"webtoken-dialog__title\">" + this.title + "</div>\n        " + (message ? '' : "<div class=\"webtoken-dialog__desc\">" + this.description + "</div>") + "\n        </div>\n        <div class=\"webtoken-dialog__body\">" + msg + "</div>\n        <div class=\"webtoken-dialog__footer\">\n        <button class=\"btn-close webtoken-dialog__button\">" + this.textCancel + "</button>\n        " + (message ? '' : "<button class=\"btn-ok webtoken-dialog__button\">" + this.textOk + "</button>") + "\n        </div>\n        </div>\n        ";
        /** @type {?} */
        var certEl = this._dialog.getElementsByClassName('webtoken-cert__item');
        // Close dialog
        this._dialog.addEventListener('click', (/**
         * @return {?}
         */
        function () { return _this._closeDialog(); }));
        this._dialog.getElementsByClassName('webtoken-dialog__close')[0].addEventListener('click', (/**
         * @return {?}
         */
        function () { return _this._closeDialog(); }));
        // Prevent close dialog
        this._dialog.getElementsByClassName('webtoken-dialog__container')[0].addEventListener('click', (/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            e.stopPropagation();
        }));
        this._dialog.getElementsByClassName('btn-close')[0].addEventListener('click', (/**
         * @return {?}
         */
        function () { return _this._closeDialog(); }));
        if (certs && certs.length > 0) {
            // Ok select
            this._dialog.getElementsByClassName('btn-ok')[0].addEventListener('click', (/**
             * @return {?}
             */
            function () {
                if (_this._certEl) {
                    /** @type {?} */
                    var index = Number(_this._certEl.getAttribute('index'));
                    if (_this._certs[index]) {
                        _this._certCallback(_this._certs[index]);
                    }
                }
                else {
                    _this._certCallback(null);
                }
                _this._closeDialog();
            }));
            // On click cert item
            for (var i = 0; i < certEl.length; i++) {
                certEl[i].addEventListener('click', (/**
                 * @param {?} e
                 * @return {?}
                 */
                function (e) { return _this._onClickCertEl(e); }));
            }
            // Select first cert
            certEl[0].click();
        }
        // Esc key close dialog
        document.addEventListener('keydown', this._onEscapeKey);
        document.body.appendChild(this._dialog);
    };
    /**
     * @private
     * @param {?} certs
     * @return {?}
     */
    WebTokenSigner.prototype._buildCertHtml = /**
     * @private
     * @param {?} certs
     * @return {?}
     */
    function (certs) {
        var _this = this;
        /** @type {?} */
        var html = '';
        certs.forEach((/**
         * @param {?} cert
         * @param {?} index
         * @return {?}
         */
        function (cert, index) {
            html += "\n            <div class=\"webtoken-cert__item\" index=\"" + index + "\">\n            <div class=\"webtoken-cert__title\">" + cert.subjectData.CN + "</div>\n            <div class=\"webtoken-cert__text\">" + _this.textIssuer + ": " + cert.issuerData.CN + "</div>\n            <div class=\"webtoken-cert__text\">" + _this.textValid + ": " + _this.dateDisplay(cert.validFrom) + " - " + _this.dateDisplay(cert.validTo) + "</div>\n            </div>\n            ";
        }));
        return html;
    };
    /**
     * @private
     * @param {?} e
     * @return {?}
     */
    WebTokenSigner.prototype._onClickCertEl = /**
     * @private
     * @param {?} e
     * @return {?}
     */
    function (e) {
        /** @type {?} */
        var certEl = this._findCerEl(e.target);
        if (certEl.classList.contains('active')) {
            return;
        }
        if (this._certEl) {
            this._certEl.classList.remove('active');
        }
        certEl.classList.add('active');
        this._certEl = certEl;
    };
    /**
     * @private
     * @param {?} certEl
     * @return {?}
     */
    WebTokenSigner.prototype._findCerEl = /**
     * @private
     * @param {?} certEl
     * @return {?}
     */
    function (certEl) {
        if (!certEl.classList.contains('webtoken-cert__item')) {
            return this._findCerEl(certEl.parentNode);
        }
        return certEl;
    };
    /**
     * @private
     * @return {?}
     */
    WebTokenSigner.prototype._closeDialog = /**
     * @private
     * @return {?}
     */
    function () {
        document.body.removeChild(this._dialog);
        document.removeEventListener('keydown', this._onEscapeKey);
        this._dialog = null;
        this._certEl = null;
        this._certCallback = null;
    };
    /**
     * @private
     * @param {?} e
     * @return {?}
     */
    WebTokenSigner.prototype._onEscapeKey = /**
     * @private
     * @param {?} e
     * @return {?}
     */
    function (e) {
        if (e.which === 27) {
            this._closeDialog();
        }
    };
    return WebTokenSigner;
}());
export { WebTokenSigner };
if (false) {
    /** @type {?} */
    WebTokenSigner.prototype.isChrome;
    /** @type {?} */
    WebTokenSigner.prototype.isFirefox;
    /** @type {?} */
    WebTokenSigner.prototype.isWindows;
    /** @type {?} */
    WebTokenSigner.prototype.osSupported;
    /** @type {?} */
    WebTokenSigner.prototype.browserSupported;
    /** @type {?} */
    WebTokenSigner.prototype.appInstalled;
    /** @type {?} */
    WebTokenSigner.prototype.appInfo;
    /** @type {?} */
    WebTokenSigner.prototype.textOsUnSupport;
    /** @type {?} */
    WebTokenSigner.prototype.textBrowserUnSupport;
    /** @type {?} */
    WebTokenSigner.prototype.textExtNotInstalled;
    /** @type {?} */
    WebTokenSigner.prototype.textAppNotInstalled;
    /** @type {?} */
    WebTokenSigner.prototype.title;
    /** @type {?} */
    WebTokenSigner.prototype.description;
    /** @type {?} */
    WebTokenSigner.prototype.textOk;
    /** @type {?} */
    WebTokenSigner.prototype.textCancel;
    /** @type {?} */
    WebTokenSigner.prototype.certNotFound;
    /** @type {?} */
    WebTokenSigner.prototype.textIssuer;
    /** @type {?} */
    WebTokenSigner.prototype.textValid;
    /** @type {?} */
    WebTokenSigner.prototype.zIndex;
    /**
     * @type {?}
     * @private
     */
    WebTokenSigner.prototype._dialog;
    /**
     * @type {?}
     * @private
     */
    WebTokenSigner.prototype._certEl;
    /**
     * @type {?}
     * @private
     */
    WebTokenSigner.prototype._certs;
    /**
     * @type {?}
     * @private
     */
    WebTokenSigner.prototype._certCallback;
    /* Skipping unhandled member: ;*/
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2ViVG9rZW5TaWduZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbmV0LXVpLyIsInNvdXJjZXMiOlsic3JjL3dlYi10b2tlbi9saWIvV2ViVG9rZW5TaWduZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBQyxVQUFVLEVBQUUsY0FBYyxFQUFFLGVBQWUsRUFBRSxZQUFZLEVBQUUsY0FBYyxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBR3RHLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFFdEM7SUF5Q0k7UUF4Q0EsYUFBUSxHQUFZLFlBQVksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3hELGNBQVMsR0FBWSxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN6RCxjQUFTLEdBQVksU0FBUyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFFNUQsZ0JBQVcsR0FBWSxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ3RDLHFCQUFnQixHQUFZLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUM1RCxpQkFBWSxHQUFZLEtBQUssQ0FBQztRQUs5QixZQUFPLEdBQUc7WUFDTixPQUFPLEVBQUUsSUFBSTtZQUNiLGFBQWEsRUFBRSxJQUFJO1lBQ25CLG1CQUFtQixFQUFFLElBQUk7U0FDNUIsQ0FBQztRQUVGLG9CQUFlLEdBQVcsaURBQWlELENBQUM7UUFDNUUseUJBQW9CLEdBQVcsNkNBQTZDLENBQUM7UUFDN0Usd0JBQW1CLEdBQVcsZ0VBQ0csSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxlQUFlLG9GQUNoRixDQUFDO1FBQ0Ysd0JBQW1CLEdBQVcsZ0ZBQ0ssY0FBYyw0RUFDaEQsQ0FBQztRQUVGLFVBQUssR0FBVyxjQUFjLENB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RUU7O0lBRUYsK0JBQStCOztJQUMvQixxQ0FBZ0Q7O0lBQ2hELGdDQUEwQjs7SUFDMUIsb0NBQTRCOztJQUM1QixzQ0FBcUQ7O0lBQ3JELG9DQUFvQzs7SUFDcEMsbUNBQStCOztJQUMvQixnQ0FBc0I7Ozs7O0lBRXRCLGlDQUFnQjs7Ozs7SUFDaEIsaUNBQWdCOzs7OztJQUNoQixnQ0FBMkI7Ozs7O0lBQzNCLHVDQUFnQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TWVzc2FnZVNpZ25IYXNofSBmcm9tIFwiLi9tb2RlbC9NZXNzYWdlU2lnbkhhc2hcIjtcbmltcG9ydCB7RVhUX0FDVElPTiwgRVhUX0NIUk9NRV9VUkwsIEVYVF9GSVJFRk9YX1VSTCwgRVhUX0hBU0hfQUxHLCBOQVRJVkVfQVBQX1VSTH0gZnJvbSBcIi4vQ29uc3RhbnRzXCI7XG5pbXBvcnQge0NlcnREYXRhfSBmcm9tIFwiLi9tb2RlbC9DZXJ0RGF0YVwiO1xuaW1wb3J0IHtSZXBseURhdGF9IGZyb20gXCIuL21vZGVsL1JlcGx5RGF0YVwiO1xuaW1wb3J0IHtDZXJ0VXRpbHN9IGZyb20gXCIuL0NlcnRVdGlsc1wiO1xuXG5leHBvcnQgY2xhc3MgV2ViVG9rZW5TaWduZXIge1xuICAgIGlzQ2hyb21lOiBib29sZWFuID0gL0dvb2dsZSBJbmMvLnRlc3QobmF2aWdhdG9yLnZlbmRvcik7XG4gICAgaXNGaXJlZm94OiBib29sZWFuID0gL0ZpcmVmb3gvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG4gICAgaXNXaW5kb3dzOiBib29sZWFuID0gbmF2aWdhdG9yLnBsYXRmb3JtLmluZGV4T2YoJ1dpbicpID4gLTE7XG5cbiAgICBvc1N1cHBvcnRlZDogYm9vbGVhbiA9IHRoaXMuaXNXaW5kb3dzO1xuICAgIGJyb3dzZXJTdXBwb3J0ZWQ6IGJvb2xlYW4gPSB0aGlzLmlzQ2hyb21lIHx8IHRoaXMuaXNGaXJlZm94O1xuICAgIGFwcEluc3RhbGxlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGdldCBleHRJbnN0YWxsZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhIXdpbmRvd1snX0V4dFRva2VuQnJpZGdlJ107XG4gICAgfTtcblxuICAgIGFwcEluZm8gPSB7XG4gICAgICAgIHZlcnNpb246IG51bGwsXG4gICAgICAgIG5hdGl2ZVZlcnNpb246IG51bGwsXG4gICAgICAgIG5hdGl2ZUxhdGVzdFZlcnNpb246IG51bGxcbiAgICB9O1xuXG4gICAgdGV4dE9zVW5TdXBwb3J0OiBzdHJpbmcgPSAnVMOtbmggbsSDbmcgxJFhbmcgaOG7lyB0cuG7oyBjaG8gbcOheSB0w61uaCBkw7luZyBXaW5kb3dzJztcbiAgICB0ZXh0QnJvd3NlclVuU3VwcG9ydDogc3RyaW5nID0gJ1TDrW5oIG7Eg25nIMSRYW5nIGjhu5cgdHLhu6MgY2hvIENocm9tZSB2w6AgRmlyZUZveCc7XG4gICAgdGV4dEV4dE5vdEluc3RhbGxlZDogc3RyaW5nID0gYFxuICAgIEPhuqduIGPDoGkgxJHhurd0IGV4dGVuc2lvbiA8YSBocmVmPVwiJHt0aGlzLmlzQ2hyb21lID8gRVhUX0NIUk9NRV9VUkwgOiBFWFRfRklSRUZPWF9VUkx9XCIgdGFyZ2V0PVwiX2JsYW5rXCI+VG9rZW5TaWduZXI8L2E+IHRyw6puIHRyw6xuaCBkdXnhu4d0IFdlYlxuICAgIGA7XG4gICAgdGV4dEFwcE5vdEluc3RhbGxlZDogc3RyaW5nID0gYFxuICAgIEPhuqduIGPDoGkgxJHhurd0IOG7qW5nIGThu6VuZyBrw70gPGEgaHJlZj1cIiR7TkFUSVZFX0FQUF9VUkx9XCIgdGFyZ2V0PVwiX2JsYW5rXCI+VG9rZW5TaWduZXI8L2E+IHRyw6puIG3DoXkgdMOtbmhcbiAgICBgO1xuXG4gICAgdGl0bGU6IHN0cmluZyA9IFwiQ2jhu6luZyB0aMawIHPhu5FcIjtcbiAgICBkZXNjcmlwdGlvbjogc3RyaW5nID0gXCJDaOG7jW4gY2jhu6luZyB0aMawIHPhu5EgxJHhu4Mga8O9XCI7XG4gICAgdGV4dE9rOiBzdHJpbmcgPSAnxJDhu5NuZyDDvSc7XG4gICAgdGV4dENhbmNlbDogc3RyaW5nID0gJ8SQw7NuZyc7XG4gICAgY2VydE5vdEZvdW5kOiBzdHJpbmcgPSAnS2jDtG5nIHTDrG0gdGjhuqV5IGNo4bupbmcgdGjGsCBz4buRJztcbiAgICB0ZXh0SXNzdWVyOiBzdHJpbmcgPSAnTmjDoCBjdW5nIGPhuqVwJztcbiAgICB0ZXh0VmFsaWQ6IHN0cmluZyA9ICdIaeG7h3UgbOG7sWMnO1xuICAgIHpJbmRleDogbnVtYmVyID0gMTEwMDtcblxuICAgIHByaXZhdGUgX2RpYWxvZztcbiAgICBwcml2YXRlIF9jZXJ0RWw7XG4gICAgcHJpdmF0ZSBfY2VydHM6IENlcnREYXRhW107XG4gICAgcHJpdmF0ZSBfY2VydENhbGxiYWNrOiBGdW5jdGlvbjtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLl9vbkVzY2FwZUtleSA9IHRoaXMuX29uRXNjYXBlS2V5LmJpbmQodGhpcyk7XG4gICAgfVxuXG4gICAgY2hlY2tSZWFkeShzaWxlbnQ/OiBib29sZWFuKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmFwcEluc3RhbGxlZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHRydWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIXRoaXMub3NTdXBwb3J0ZWQpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXNpbGVudCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jcmVhdGVDZXJ0RGlhbG9nKG51bGwsIHRoaXMudGV4dE9zVW5TdXBwb3J0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoZmFsc2UpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIXRoaXMuYnJvd3NlclN1cHBvcnRlZCkge1xuICAgICAgICAgICAgICAgIGlmICghc2lsZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NyZWF0ZUNlcnREaWFsb2cobnVsbCwgdGhpcy50ZXh0QnJvd3NlclVuU3VwcG9ydCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKGZhbHNlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCF0aGlzLmV4dEluc3RhbGxlZCkge1xuICAgICAgICAgICAgICAgIGlmICghc2lsZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NyZWF0ZUNlcnREaWFsb2cobnVsbCwgdGhpcy50ZXh0RXh0Tm90SW5zdGFsbGVkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoZmFsc2UpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl9sb2FkQXBwSW5mbygpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5hcHBJbnN0YWxsZWQgJiYgIXNpbGVudCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jcmVhdGVDZXJ0RGlhbG9nKG51bGwsIHRoaXMudGV4dEFwcE5vdEluc3RhbGxlZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJlc29sdmUodGhpcy5hcHBJbnN0YWxsZWQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNoZWNrTmF0aXZlVXBkYXRlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hcHBJbnN0YWxsZWQgJiYgdGhpcy5hcHBJbmZvLm5hdGl2ZVZlcnNpb24gPCB0aGlzLmFwcEluZm8ubmF0aXZlTGF0ZXN0VmVyc2lvbjtcbiAgICB9XG5cbiAgICBsb2FkQ2VydHMoKTogUHJvbWlzZTxDZXJ0RGF0YVtdPiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tSZWFkeSh0cnVlKS50aGVuKChyZWFkeSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZWFkeSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9wb3N0RXh0KEVYVF9BQ1RJT04uR0VUX0NFUlRTKS50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjZXJ0cyA9IGRhdGEgJiYgZGF0YS5kYXRhIHx8IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2VydHMuZm9yRWFjaChjZXJ0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjZXJ0LnN1YmplY3REYXRhID0gQ2VydFV0aWxzLnBhcnNlQ2VydFN0cmluZyhjZXJ0LnN1YmplY3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNlcnQuaXNzdWVyRGF0YSA9IENlcnRVdGlscy5wYXJzZUNlcnRTdHJpbmcoY2VydC5pc3N1ZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGNlcnRzKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShbXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNpZ25IYXNoKGRhdGE6IE1lc3NhZ2VTaWduSGFzaCk6IFByb21pc2U8UmVwbHlEYXRhPiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgICAgIGlmIChkYXRhICYmIChkYXRhLmhhc2ggfHwgZGF0YS5oYXNocykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrUmVhZHkoKS50aGVuKChyZWFkeSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVhZHkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuaGFzaEFsZyA9IGRhdGEuaGFzaEFsZyB8fCBFWFRfSEFTSF9BTEcuU0hBMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3Bvc3RFeHQoRVhUX0FDVElPTi5TSUdOX0hBU0gsIGRhdGEpLnRoZW4ocmVzb2x2ZSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlc29sdmUoe1xuICAgICAgICAgICAgICAgICAgICBlcnJvcjogXCJIQVNIX01JU1NJTkdcIlxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzZWxlY3RDZXJ0KGZvcmNlU2VsZWN0PzogYm9vbGVhbikge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNoZWNrUmVhZHkoKS50aGVuKChyZWFkeSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZWFkeSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRDZXJ0cygpLnRoZW4oKGNlcnRzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2VydHMubGVuZ3RoID4gMSB8fCBmb3JjZVNlbGVjdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NlcnRDYWxsYmFjayA9IHJlc29sdmU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3JlYXRlQ2VydERpYWxvZyhjZXJ0cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoY2VydHNbMF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBkYXRlRGlzcGxheShkYXRlU3RyOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKGRhdGVTdHIpO1xuICAgICAgICByZXR1cm4gW2RhdGUuZ2V0RGF0ZSgpLCBkYXRlLmdldE1vbnRoKCkgKyAxLCBkYXRlLmdldEZ1bGxZZWFyKCldLmpvaW4oJy8nKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9wb3N0RXh0KGFjdGlvbjogRVhUX0FDVElPTiwgZGF0YT86IGFueSk6IFByb21pc2U8UmVwbHlEYXRhPiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmV4dEluc3RhbGxlZCkge1xuICAgICAgICAgICAgICAgIHdpbmRvd1tcIl9FeHRUb2tlbkJyaWRnZVwiXS5wb3N0VG9FeHRlbnNpb24oYWN0aW9uLCBkYXRhKS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh7XG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiBcIkVYVEVOU0lPTl9OT1RfSU5TVEFMTFwiXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2xvYWRBcHBJbmZvKCk6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgICAgIHRoaXMuX3Bvc3RFeHQoRVhUX0FDVElPTi5HRVRfSU5GTykudGhlbigocmVwbHk6IFJlcGx5RGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXBseSAmJiByZXBseS5kYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5hcHBJbmZvLCByZXBseS5kYXRhKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5hcHBJbnN0YWxsZWQgPSAhIXRoaXMuYXBwSW5mby5uYXRpdmVWZXJzaW9uO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9jcmVhdGVDZXJ0RGlhbG9nKGNlcnRzOiBDZXJ0RGF0YVtdLCBtZXNzYWdlPzogc3RyaW5nKSB7XG4gICAgICAgIGlmICh0aGlzLl9kaWFsb2cpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9kaWFsb2cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGhpcy5fZGlhbG9nLmNsYXNzTGlzdC5hZGQoJ3dlYnRva2VuLWRpYWxvZycpO1xuICAgICAgICB0aGlzLl9kaWFsb2cuc3R5bGUuekluZGV4ID0gdGhpcy56SW5kZXg7XG5cbiAgICAgICAgdGhpcy5fY2VydHMgPSBjZXJ0cztcblxuICAgICAgICBsZXQgbXNnO1xuXG4gICAgICAgIGlmIChtZXNzYWdlKSB7XG4gICAgICAgICAgICBtc2cgPSAnPGRpdiBjbGFzcz1cIndlYnRva2VuLWRpYWxvZ19fbWVzc2FnZVwiPicgKyBtZXNzYWdlICsgJzwvZGl2Pic7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtc2cgPSBjZXJ0cy5sZW5ndGggPCAxID8gYDxkaXYgY2xhc3M9XCJ3ZWJ0b2tlbi1kaWFsb2dfX21lc3NhZ2VcIj4ke3RoaXMuY2VydE5vdEZvdW5kfTwvZGl2PmAgOiB0aGlzLl9idWlsZENlcnRIdG1sKGNlcnRzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2RpYWxvZy5pbm5lckhUTUwgPSBgXG4gICAgICAgIDxzdHlsZT5cbiAgICAgICAgLndlYnRva2VuLWRpYWxvZyB7XG4gICAgICAgICAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgICAgICAgICB0b3A6IDA7XG4gICAgICAgICAgICByaWdodDogMDtcbiAgICAgICAgICAgIGJvdHRvbTogMDtcbiAgICAgICAgICAgIGxlZnQ6IDA7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIC4zKTtcbiAgICAgICAgfVxuICAgICAgICAud2VidG9rZW4tZGlhbG9nX19jb250YWluZXIge1xuICAgICAgICAgICAgd2lkdGg6IDQwMHB4O1xuICAgICAgICAgICAgbWFyZ2luOiBhdXRvO1xuICAgICAgICAgICAgYmFja2dyb3VuZDogI2ZmZjtcbiAgICAgICAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICAgICAgICBjb2xvcjogIzMzMztcbiAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xuICAgICAgICAgICAgdG9wOiA1MCU7XG4gICAgICAgICAgICBsZWZ0OiA1MCU7XG4gICAgICAgICAgICBib3JkZXItcmFkaXVzOiA0cHg7XG4gICAgICAgIH1cbiAgICAgICAgLndlYnRva2VuLWRpYWxvZ19faGVhZGVyIHtcbiAgICAgICAgICAgIHBhZGRpbmc6IDEwcHggMTVweDtcbiAgICAgICAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZGRkO1xuICAgICAgICB9XG4gICAgICAgIC53ZWJ0b2tlbi1kaWFsb2dfX3RpdGxlIHtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMjBweDtcbiAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgICAgICAgICAgbWFyZ2luLWJvdHRvbTogNXB4O1xuICAgICAgICB9XG4gICAgICAgIC53ZWJ0b2tlbi1kaWFsb2dfX2Rlc2Mge1xuICAgICAgICAgICAgZm9udC1zaXplOiAxNHB4O1xuICAgICAgICAgICAgbGluZS1oZWlnaHQ6IDIwcHg7XG4gICAgICAgIH1cbiAgICAgICAgLndlYnRva2VuLWRpYWxvZ19fY2xvc2Uge1xuICAgICAgICAgICAgZmxvYXQ6IHJpZ2h0O1xuICAgICAgICAgICAgd2lkdGg6IDMwcHg7XG4gICAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICAgICAgICBsaW5lLWhlaWdodDogMzBweDtcbiAgICAgICAgICAgIG1hcmdpbjogLTVweCAwO1xuICAgICAgICAgICAgZm9udC1zaXplOiAyMHB4O1xuICAgICAgICB9XG4gICAgICAgIC53ZWJ0b2tlbi1kaWFsb2dfX2JvZHkge1xuICAgICAgICAgICAgbWF4LWhlaWdodDogMjUwcHg7XG4gICAgICAgICAgICBvdmVyZmxvdzogYXV0bztcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICAgICAgICAgIGxpbmUtaGVpZ2h0OiAyMHB4O1xuICAgICAgICB9XG4gICAgICAgIC53ZWJ0b2tlbi1kaWFsb2dfX21lc3NhZ2Uge1xuICAgICAgICAgICAgcGFkZGluZzogMjBweDsgICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICAud2VidG9rZW4tY2VydF9faXRlbSB7XG4gICAgICAgICAgICBwYWRkaW5nOiAxMHB4IDIwcHg7XG4gICAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAgICAgICBsaW5lLWhlaWdodDogMjBweDtcbiAgICAgICAgfVxuICAgICAgICAud2VidG9rZW4tY2VydF9faXRlbS5hY3RpdmUge1xuICAgICAgICAgICAgYmFja2dyb3VuZDogI2RkZCAhaW1wb3J0YW50O1xuICAgICAgICB9XG4gICAgICAgIC53ZWJ0b2tlbi1jZXJ0X19pdGVtOmhvdmVyIHtcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICNmNWY1ZjU7XG4gICAgICAgIH1cbiAgICAgICAgLndlYnRva2VuLWNlcnRfX3RpdGxlIHtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMThweDtcbiAgICAgICAgICAgIG1hcmdpbi1ib3R0b206IDJweDtcbiAgICAgICAgfVxuICAgICAgICAud2VidG9rZW4tY2VydF9fdGV4dCB7XG4gICAgICAgICAgICBmb250LXNpemU6IDE0cHg7XG4gICAgICAgIH1cbiAgICAgICAgLndlYnRva2VuLWRpYWxvZ19fZm9vdGVyIHtcbiAgICAgICAgICAgIHBhZGRpbmc6IDEwcHggMjBweDtcbiAgICAgICAgICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCAjZGRkO1xuICAgICAgICAgICAgdGV4dC1hbGlnbjogcmlnaHQ7XG4gICAgICAgIH1cbiAgICAgICAgLndlYnRva2VuLWRpYWxvZ19fYnV0dG9uIHtcbiAgICAgICAgICAgIGhlaWdodDogMzBweDtcbiAgICAgICAgICAgIGxpbmUtaGVpZ2h0OiAzMHB4O1xuICAgICAgICAgICAgcGFkZGluZzogMCAxMHB4O1xuICAgICAgICAgICAgbWluLXdpZHRoOiA2MHB4O1xuICAgICAgICAgICAgbWFyZ2luLWxlZnQ6IDEwcHg7XG4gICAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAgICAgICBib3JkZXItcmFkaXVzOiA0cHg7XG4gICAgICAgICAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICNmZmY7XG4gICAgICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAjZGRkO1xuICAgICAgICB9XG4gICAgICAgIC53ZWJ0b2tlbi1kaWFsb2dfX2J1dHRvbjpob3ZlciB7XG4gICAgICAgICAgICBvcGFjaXR5OiA4O1xuICAgICAgICB9XG4gICAgICAgIC5idG4tb2sge1xuICAgICAgICAgICAgYmFja2dyb3VuZDogIzAwN2JmZjtcbiAgICAgICAgICAgIGJvcmRlci1jb2xvcjogIzAwN2JmZjtcbiAgICAgICAgICAgIGNvbG9yOiAjZmZmO1xuICAgICAgICB9XG4gICAgICAgIDwvc3R5bGU+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ3ZWJ0b2tlbi1kaWFsb2dfX2NvbnRhaW5lclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwid2VidG9rZW4tZGlhbG9nX19oZWFkZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIndlYnRva2VuLWRpYWxvZ19fY2xvc2VcIj7DlzwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwid2VidG9rZW4tZGlhbG9nX190aXRsZVwiPiR7dGhpcy50aXRsZX08L2Rpdj5cbiAgICAgICAgJHttZXNzYWdlID8gJycgOiBgPGRpdiBjbGFzcz1cIndlYnRva2VuLWRpYWxvZ19fZGVzY1wiPiR7dGhpcy5kZXNjcmlwdGlvbn08L2Rpdj5gfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIndlYnRva2VuLWRpYWxvZ19fYm9keVwiPiR7bXNnfTwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwid2VidG9rZW4tZGlhbG9nX19mb290ZXJcIj5cbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0bi1jbG9zZSB3ZWJ0b2tlbi1kaWFsb2dfX2J1dHRvblwiPiR7dGhpcy50ZXh0Q2FuY2VsfTwvYnV0dG9uPlxuICAgICAgICAke21lc3NhZ2UgPyAnJyA6IGA8YnV0dG9uIGNsYXNzPVwiYnRuLW9rIHdlYnRva2VuLWRpYWxvZ19fYnV0dG9uXCI+JHt0aGlzLnRleHRPa308L2J1dHRvbj5gfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIGA7XG5cbiAgICAgICAgY29uc3QgY2VydEVsID0gdGhpcy5fZGlhbG9nLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3dlYnRva2VuLWNlcnRfX2l0ZW0nKTtcblxuICAgICAgICAvLyBDbG9zZSBkaWFsb2dcbiAgICAgICAgdGhpcy5fZGlhbG9nLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy5fY2xvc2VEaWFsb2coKSk7XG4gICAgICAgIHRoaXMuX2RpYWxvZy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCd3ZWJ0b2tlbi1kaWFsb2dfX2Nsb3NlJylbMF0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0aGlzLl9jbG9zZURpYWxvZygpKTtcblxuICAgICAgICAvLyBQcmV2ZW50IGNsb3NlIGRpYWxvZ1xuICAgICAgICB0aGlzLl9kaWFsb2cuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnd2VidG9rZW4tZGlhbG9nX19jb250YWluZXInKVswXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLl9kaWFsb2cuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYnRuLWNsb3NlJylbMF0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0aGlzLl9jbG9zZURpYWxvZygpKTtcblxuICAgICAgICBpZiAoY2VydHMgJiYgY2VydHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgLy8gT2sgc2VsZWN0XG4gICAgICAgICAgICB0aGlzLl9kaWFsb2cuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYnRuLW9rJylbMF0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2NlcnRFbCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSBOdW1iZXIodGhpcy5fY2VydEVsLmdldEF0dHJpYnV0ZSgnaW5kZXgnKSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9jZXJ0c1tpbmRleF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NlcnRDYWxsYmFjayh0aGlzLl9jZXJ0c1tpbmRleF0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2VydENhbGxiYWNrKG51bGwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLl9jbG9zZURpYWxvZygpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIE9uIGNsaWNrIGNlcnQgaXRlbVxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjZXJ0RWwubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjZXJ0RWxbaV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4gdGhpcy5fb25DbGlja0NlcnRFbChlKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFNlbGVjdCBmaXJzdCBjZXJ0XG4gICAgICAgICAgICBjZXJ0RWxbMF0uY2xpY2soKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEVzYyBrZXkgY2xvc2UgZGlhbG9nXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLl9vbkVzY2FwZUtleSk7XG5cbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLl9kaWFsb2cpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2J1aWxkQ2VydEh0bWwoY2VydHM6IENlcnREYXRhW10pIHtcbiAgICAgICAgbGV0IGh0bWwgPSAnJztcbiAgICAgICAgY2VydHMuZm9yRWFjaCgoY2VydDogQ2VydERhdGEsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBodG1sICs9IGBcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ3ZWJ0b2tlbi1jZXJ0X19pdGVtXCIgaW5kZXg9XCIke2luZGV4fVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIndlYnRva2VuLWNlcnRfX3RpdGxlXCI+JHtjZXJ0LnN1YmplY3REYXRhLkNOfTwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIndlYnRva2VuLWNlcnRfX3RleHRcIj4ke3RoaXMudGV4dElzc3Vlcn06ICR7Y2VydC5pc3N1ZXJEYXRhLkNOfTwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIndlYnRva2VuLWNlcnRfX3RleHRcIj4ke3RoaXMudGV4dFZhbGlkfTogJHt0aGlzLmRhdGVEaXNwbGF5KGNlcnQudmFsaWRGcm9tKX0gLSAke3RoaXMuZGF0ZURpc3BsYXkoY2VydC52YWxpZFRvKX08L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgYDtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBodG1sO1xuICAgIH1cblxuICAgIHByaXZhdGUgX29uQ2xpY2tDZXJ0RWwoZSkge1xuICAgICAgICBsZXQgY2VydEVsID0gdGhpcy5fZmluZENlckVsKGUudGFyZ2V0KTtcbiAgICAgICAgaWYgKGNlcnRFbC5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2NlcnRFbCkge1xuICAgICAgICAgICAgdGhpcy5fY2VydEVsLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgICAgICB9XG4gICAgICAgIGNlcnRFbC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgICAgdGhpcy5fY2VydEVsID0gY2VydEVsO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2ZpbmRDZXJFbChjZXJ0RWwpIHtcbiAgICAgICAgaWYgKCFjZXJ0RWwuY2xhc3NMaXN0LmNvbnRhaW5zKCd3ZWJ0b2tlbi1jZXJ0X19pdGVtJykpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9maW5kQ2VyRWwoY2VydEVsLnBhcmVudE5vZGUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjZXJ0RWw7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfY2xvc2VEaWFsb2coKSB7XG4gICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQodGhpcy5fZGlhbG9nKTtcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuX29uRXNjYXBlS2V5KTtcbiAgICAgICAgdGhpcy5fZGlhbG9nID0gbnVsbDtcbiAgICAgICAgdGhpcy5fY2VydEVsID0gbnVsbDtcbiAgICAgICAgdGhpcy5fY2VydENhbGxiYWNrID0gbnVsbDtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9vbkVzY2FwZUtleShlKSB7XG4gICAgICAgIGlmIChlLndoaWNoID09PSAyNykge1xuICAgICAgICAgICAgdGhpcy5fY2xvc2VEaWFsb2coKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==