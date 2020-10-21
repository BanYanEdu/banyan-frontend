/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { EXT_ACTION, EXT_CHROME_URL, EXT_FIREFOX_URL, EXT_HASH_ALG, NATIVE_APP_URL } from "./Constants";
import { CertUtils } from "./CertUtils";
export class WebTokenSigner {
    constructor() {
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
        this.textExtNotInstalled = `
    Cần cài đặt extension <a href="${this.isChrome ? EXT_CHROME_URL : EXT_FIREFOX_URL}" target="_blank">TokenSigner</a> trên trình duyệt Web
    `;
        this.textAppNotInstalled = `
    Cần cài đặt ứng dụng ký <a href="${NATIVE_APP_URL}" target="_blank">TokenSigner</a> trên máy tính
    `;
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
    /**
     * @return {?}
     */
    get extInstalled() {
        return !!window['_ExtTokenBridge'];
    }
    ;
    /**
     * @param {?=} silent
     * @return {?}
     */
    checkReady(silent) {
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        resolve => {
            if (this.appInstalled) {
                return resolve(true);
            }
            if (!this.osSupported) {
                if (!silent) {
                    this._createCertDialog(null, this.textOsUnSupport);
                }
                return resolve(false);
            }
            if (!this.browserSupported) {
                if (!silent) {
                    this._createCertDialog(null, this.textBrowserUnSupport);
                }
                return resolve(false);
            }
            if (!this.extInstalled) {
                if (!silent) {
                    this._createCertDialog(null, this.textExtNotInstalled);
                }
                return resolve(false);
            }
            this._loadAppInfo().then((/**
             * @return {?}
             */
            () => {
                if (!this.appInstalled && !silent) {
                    this._createCertDialog(null, this.textAppNotInstalled);
                }
                resolve(this.appInstalled);
            }));
        }));
    }
    /**
     * @return {?}
     */
    checkNativeUpdate() {
        return this.appInstalled && this.appInfo.nativeVersion < this.appInfo.nativeLatestVersion;
    }
    /**
     * @return {?}
     */
    loadCerts() {
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        resolve => {
            this.checkReady(true).then((/**
             * @param {?} ready
             * @return {?}
             */
            (ready) => {
                if (ready) {
                    this._postExt(EXT_ACTION.GET_CERTS).then((/**
                     * @param {?} data
                     * @return {?}
                     */
                    (data) => {
                        /** @type {?} */
                        const certs = data && data.data || [];
                        certs.forEach((/**
                         * @param {?} cert
                         * @return {?}
                         */
                        cert => {
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
    }
    /**
     * @param {?} data
     * @return {?}
     */
    signHash(data) {
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        resolve => {
            if (data && (data.hash || data.hashs)) {
                this.checkReady().then((/**
                 * @param {?} ready
                 * @return {?}
                 */
                (ready) => {
                    if (ready) {
                        data.hashAlg = data.hashAlg || EXT_HASH_ALG.SHA1;
                        this._postExt(EXT_ACTION.SIGN_HASH, data).then(resolve);
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
    }
    /**
     * @param {?=} forceSelect
     * @return {?}
     */
    selectCert(forceSelect) {
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        resolve => {
            this.checkReady().then((/**
             * @param {?} ready
             * @return {?}
             */
            (ready) => {
                if (ready) {
                    this.loadCerts().then((/**
                     * @param {?} certs
                     * @return {?}
                     */
                    (certs) => {
                        if (certs.length > 1 || forceSelect) {
                            this._certCallback = resolve;
                            this._createCertDialog(certs);
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
    }
    /**
     * @param {?} dateStr
     * @return {?}
     */
    dateDisplay(dateStr) {
        /** @type {?} */
        const date = new Date(dateStr);
        return [date.getDate(), date.getMonth() + 1, date.getFullYear()].join('/');
    }
    /**
     * @private
     * @param {?} action
     * @param {?=} data
     * @return {?}
     */
    _postExt(action, data) {
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        resolve => {
            if (this.extInstalled) {
                window["_ExtTokenBridge"].postToExtension(action, data).then((/**
                 * @param {?} response
                 * @return {?}
                 */
                (response) => {
                    resolve(response);
                }));
            }
            else {
                resolve({
                    error: "EXTENSION_NOT_INSTALL"
                });
            }
        }));
    }
    /**
     * @private
     * @return {?}
     */
    _loadAppInfo() {
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        resolve => {
            this._postExt(EXT_ACTION.GET_INFO).then((/**
             * @param {?} reply
             * @return {?}
             */
            (reply) => {
                if (reply && reply.data) {
                    Object.assign(this.appInfo, reply.data);
                }
                this.appInstalled = !!this.appInfo.nativeVersion;
                resolve();
            }));
        }));
    }
    /**
     * @private
     * @param {?} certs
     * @param {?=} message
     * @return {?}
     */
    _createCertDialog(certs, message) {
        if (this._dialog) {
            return;
        }
        this._dialog = document.createElement('div');
        this._dialog.classList.add('webtoken-dialog');
        this._dialog.style.zIndex = this.zIndex;
        this._certs = certs;
        /** @type {?} */
        let msg;
        if (message) {
            msg = '<div class="webtoken-dialog__message">' + message + '</div>';
        }
        else {
            msg = certs.length < 1 ? `<div class="webtoken-dialog__message">${this.certNotFound}</div>` : this._buildCertHtml(certs);
        }
        this._dialog.innerHTML = `
        <style>
        .webtoken-dialog {
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            background: rgba(0, 0, 0, .3);
        }
        .webtoken-dialog__container {
            width: 400px;
            margin: auto;
            background: #fff;
            overflow: hidden;
            color: #333;
            position: absolute;
            transform: translate(-50%, -50%);
            top: 50%;
            left: 50%;
            border-radius: 4px;
        }
        .webtoken-dialog__header {
            padding: 10px 15px;
            border-bottom: 1px solid #ddd;
        }
        .webtoken-dialog__title {
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 5px;
        }
        .webtoken-dialog__desc {
            font-size: 14px;
            line-height: 20px;
        }
        .webtoken-dialog__close {
            float: right;
            width: 30px;
            cursor: pointer;
            text-align: center;
            line-height: 30px;
            margin: -5px 0;
            font-size: 20px;
        }
        .webtoken-dialog__body {
            max-height: 250px;
            overflow: auto;
            font-size: 14px;
            line-height: 20px;
        }
        .webtoken-dialog__message {
            padding: 20px;            
        }
        .webtoken-cert__item {
            padding: 10px 20px;
            cursor: pointer;
            line-height: 20px;
        }
        .webtoken-cert__item.active {
            background: #ddd !important;
        }
        .webtoken-cert__item:hover {
            background: #f5f5f5;
        }
        .webtoken-cert__title {
            font-size: 18px;
            margin-bottom: 2px;
        }
        .webtoken-cert__text {
            font-size: 14px;
        }
        .webtoken-dialog__footer {
            padding: 10px 20px;
            border-top: 1px solid #ddd;
            text-align: right;
        }
        .webtoken-dialog__button {
            height: 30px;
            line-height: 30px;
            padding: 0 10px;
            min-width: 60px;
            margin-left: 10px;
            cursor: pointer;
            border-radius: 4px;
            font-weight: bold;
            background: #fff;
            border: 1px solid #ddd;
        }
        .webtoken-dialog__button:hover {
            opacity: 8;
        }
        .btn-ok {
            background: #007bff;
            border-color: #007bff;
            color: #fff;
        }
        </style>
        <div class="webtoken-dialog__container">
        <div class="webtoken-dialog__header">
        <div class="webtoken-dialog__close">×</div>
        <div class="webtoken-dialog__title">${this.title}</div>
        ${message ? '' : `<div class="webtoken-dialog__desc">${this.description}</div>`}
        </div>
        <div class="webtoken-dialog__body">${msg}</div>
        <div class="webtoken-dialog__footer">
        <button class="btn-close webtoken-dialog__button">${this.textCancel}</button>
        ${message ? '' : `<button class="btn-ok webtoken-dialog__button">${this.textOk}</button>`}
        </div>
        </div>
        `;
        /** @type {?} */
        const certEl = this._dialog.getElementsByClassName('webtoken-cert__item');
        // Close dialog
        this._dialog.addEventListener('click', (/**
         * @return {?}
         */
        () => this._closeDialog()));
        this._dialog.getElementsByClassName('webtoken-dialog__close')[0].addEventListener('click', (/**
         * @return {?}
         */
        () => this._closeDialog()));
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
        () => this._closeDialog()));
        if (certs && certs.length > 0) {
            // Ok select
            this._dialog.getElementsByClassName('btn-ok')[0].addEventListener('click', (/**
             * @return {?}
             */
            () => {
                if (this._certEl) {
                    /** @type {?} */
                    let index = Number(this._certEl.getAttribute('index'));
                    if (this._certs[index]) {
                        this._certCallback(this._certs[index]);
                    }
                }
                else {
                    this._certCallback(null);
                }
                this._closeDialog();
            }));
            // On click cert item
            for (let i = 0; i < certEl.length; i++) {
                certEl[i].addEventListener('click', (/**
                 * @param {?} e
                 * @return {?}
                 */
                (e) => this._onClickCertEl(e)));
            }
            // Select first cert
            certEl[0].click();
        }
        // Esc key close dialog
        document.addEventListener('keydown', this._onEscapeKey);
        document.body.appendChild(this._dialog);
    }
    /**
     * @private
     * @param {?} certs
     * @return {?}
     */
    _buildCertHtml(certs) {
        /** @type {?} */
        let html = '';
        certs.forEach((/**
         * @param {?} cert
         * @param {?} index
         * @return {?}
         */
        (cert, index) => {
            html += `
            <div class="webtoken-cert__item" index="${index}">
            <div class="webtoken-cert__title">${cert.subjectData.CN}</div>
            <div class="webtoken-cert__text">${this.textIssuer}: ${cert.issuerData.CN}</div>
            <div class="webtoken-cert__text">${this.textValid}: ${this.dateDisplay(cert.validFrom)} - ${this.dateDisplay(cert.validTo)}</div>
            </div>
            `;
        }));
        return html;
    }
    /**
     * @private
     * @param {?} e
     * @return {?}
     */
    _onClickCertEl(e) {
        /** @type {?} */
        let certEl = this._findCerEl(e.target);
        if (certEl.classList.contains('active')) {
            return;
        }
        if (this._certEl) {
            this._certEl.classList.remove('active');
        }
        certEl.classList.add('active');
        this._certEl = certEl;
    }
    /**
     * @private
     * @param {?} certEl
     * @return {?}
     */
    _findCerEl(certEl) {
        if (!certEl.classList.contains('webtoken-cert__item')) {
            return this._findCerEl(certEl.parentNode);
        }
        return certEl;
    }
    /**
     * @private
     * @return {?}
     */
    _closeDialog() {
        document.body.removeChild(this._dialog);
        document.removeEventListener('keydown', this._onEscapeKey);
        this._dialog = null;
        this._certEl = null;
        this._certCallback = null;
    }
    /**
     * @private
     * @param {?} e
     * @return {?}
     */
    _onEscapeKey(e) {
        if (e.which === 27) {
            this._closeDialog();
        }
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2ViVG9rZW5TaWduZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbmV0LXVpLyIsInNvdXJjZXMiOlsic3JjL3dlYi10b2tlbi9saWIvV2ViVG9rZW5TaWduZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBQyxVQUFVLEVBQUUsY0FBYyxFQUFFLGVBQWUsRUFBRSxZQUFZLEVBQUUsY0FBYyxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBR3RHLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFFdEMsTUFBTSxPQUFPLGNBQWM7SUF5Q3ZCO1FBeENBLGFBQVEsR0FBWSxZQUFZLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN4RCxjQUFTLEdBQVksU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDekQsY0FBUyxHQUFZLFNBQVMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBRTVELGdCQUFXLEdBQVksSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUN0QyxxQkFBZ0IsR0FBWSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDNUQsaUJBQVksR0FBWSxLQUFLLENBQUM7UUFLOUIsWUFBTyxHQUFHO1lBQ04sT0FBTyxFQUFFLElBQUk7WUFDYixhQUFhLEVBQUUsSUFBSTtZQUNuQixtQkFBbUIsRUFBRSxJQUFJO1NBQzVCLENBQUM7UUFFRixvQkFBZSxHQUFXLGlEQUFpRCxDQUFDO1FBQzVFLHlCQUFvQixHQUFXLDZDQUE2QyxDQUFDO1FBQzdFLHdCQUFtQixHQUFXO3FDQUNHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsZUFBZTtLQUNoRixDQUFDO1FBQ0Ysd0JBQW1CLEdBQVc7dUNBQ0ssY0FBYztLQUNoRCxDQUFDO1FBRUYsVUFB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LHNDQUFxRDs7SUFDckQsb0NBQW9DOztJQUNwQyxtQ0FBK0I7O0lBQy9CLGdDQUFzQjs7Ozs7SUFFdEIsaUNBQWdCOzs7OztJQUNoQixpQ0FBZ0I7Ozs7O0lBQ2hCLGdDQUEyQjs7Ozs7SUFDM0IsdUNBQWdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtNZXNzYWdlU2lnbkhhc2h9IGZyb20gXCIuL21vZGVsL01lc3NhZ2VTaWduSGFzaFwiO1xuaW1wb3J0IHtFWFRfQUNUSU9OLCBFWFRfQ0hST01FX1VSTCwgRVhUX0ZJUkVGT1hfVVJMLCBFWFRfSEFTSF9BTEcsIE5BVElWRV9BUFBfVVJMfSBmcm9tIFwiLi9Db25zdGFudHNcIjtcbmltcG9ydCB7Q2VydERhdGF9IGZyb20gXCIuL21vZGVsL0NlcnREYXRhXCI7XG5pbXBvcnQge1JlcGx5RGF0YX0gZnJvbSBcIi4vbW9kZWwvUmVwbHlEYXRhXCI7XG5pbXBvcnQge0NlcnRVdGlsc30gZnJvbSBcIi4vQ2VydFV0aWxzXCI7XG5cbmV4cG9ydCBjbGFzcyBXZWJUb2tlblNpZ25lciB7XG4gICAgaXNDaHJvbWU6IGJvb2xlYW4gPSAvR29vZ2xlIEluYy8udGVzdChuYXZpZ2F0b3IudmVuZG9yKTtcbiAgICBpc0ZpcmVmb3g6IGJvb2xlYW4gPSAvRmlyZWZveC8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcbiAgICBpc1dpbmRvd3M6IGJvb2xlYW4gPSBuYXZpZ2F0b3IucGxhdGZvcm0uaW5kZXhPZignV2luJykgPiAtMTtcblxuICAgIG9zU3VwcG9ydGVkOiBib29sZWFuID0gdGhpcy5pc1dpbmRvd3M7XG4gICAgYnJvd3NlclN1cHBvcnRlZDogYm9vbGVhbiA9IHRoaXMuaXNDaHJvbWUgfHwgdGhpcy5pc0ZpcmVmb3g7XG4gICAgYXBwSW5zdGFsbGVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgZ2V0IGV4dEluc3RhbGxlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICEhd2luZG93WydfRXh0VG9rZW5CcmlkZ2UnXTtcbiAgICB9O1xuXG4gICAgYXBwSW5mbyA9IHtcbiAgICAgICAgdmVyc2lvbjogbnVsbCxcbiAgICAgICAgbmF0aXZlVmVyc2lvbjogbnVsbCxcbiAgICAgICAgbmF0aXZlTGF0ZXN0VmVyc2lvbjogbnVsbFxuICAgIH07XG5cbiAgICB0ZXh0T3NVblN1cHBvcnQ6IHN0cmluZyA9ICdUw61uaCBuxINuZyDEkWFuZyBo4buXIHRy4bujIGNobyBtw6F5IHTDrW5oIGTDuW5nIFdpbmRvd3MnO1xuICAgIHRleHRCcm93c2VyVW5TdXBwb3J0OiBzdHJpbmcgPSAnVMOtbmggbsSDbmcgxJFhbmcgaOG7lyB0cuG7oyBjaG8gQ2hyb21lIHbDoCBGaXJlRm94JztcbiAgICB0ZXh0RXh0Tm90SW5zdGFsbGVkOiBzdHJpbmcgPSBgXG4gICAgQ+G6p24gY8OgaSDEkeG6t3QgZXh0ZW5zaW9uIDxhIGhyZWY9XCIke3RoaXMuaXNDaHJvbWUgPyBFWFRfQ0hST01FX1VSTCA6IEVYVF9GSVJFRk9YX1VSTH1cIiB0YXJnZXQ9XCJfYmxhbmtcIj5Ub2tlblNpZ25lcjwvYT4gdHLDqm4gdHLDrG5oIGR1eeG7h3QgV2ViXG4gICAgYDtcbiAgICB0ZXh0QXBwTm90SW5zdGFsbGVkOiBzdHJpbmcgPSBgXG4gICAgQ+G6p24gY8OgaSDEkeG6t3Qg4bupbmcgZOG7pW5nIGvDvSA8YSBocmVmPVwiJHtOQVRJVkVfQVBQX1VSTH1cIiB0YXJnZXQ9XCJfYmxhbmtcIj5Ub2tlblNpZ25lcjwvYT4gdHLDqm4gbcOheSB0w61uaFxuICAgIGA7XG5cbiAgICB0aXRsZTogc3RyaW5nID0gXCJDaOG7qW5nIHRoxrAgc+G7kVwiO1xuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmcgPSBcIkNo4buNbiBjaOG7qW5nIHRoxrAgc+G7kSDEkeG7gyBrw71cIjtcbiAgICB0ZXh0T2s6IHN0cmluZyA9ICfEkOG7k25nIMO9JztcbiAgICB0ZXh0Q2FuY2VsOiBzdHJpbmcgPSAnxJDDs25nJztcbiAgICBjZXJ0Tm90Rm91bmQ6IHN0cmluZyA9ICdLaMO0bmcgdMOsbSB0aOG6pXkgY2jhu6luZyB0aMawIHPhu5EnO1xuICAgIHRleHRJc3N1ZXI6IHN0cmluZyA9ICdOaMOgIGN1bmcgY+G6pXAnO1xuICAgIHRleHRWYWxpZDogc3RyaW5nID0gJ0hp4buHdSBs4buxYyc7XG4gICAgekluZGV4OiBudW1iZXIgPSAxMTAwO1xuXG4gICAgcHJpdmF0ZSBfZGlhbG9nO1xuICAgIHByaXZhdGUgX2NlcnRFbDtcbiAgICBwcml2YXRlIF9jZXJ0czogQ2VydERhdGFbXTtcbiAgICBwcml2YXRlIF9jZXJ0Q2FsbGJhY2s6IEZ1bmN0aW9uO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuX29uRXNjYXBlS2V5ID0gdGhpcy5fb25Fc2NhcGVLZXkuYmluZCh0aGlzKTtcbiAgICB9XG5cbiAgICBjaGVja1JlYWR5KHNpbGVudD86IGJvb2xlYW4pOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuYXBwSW5zdGFsbGVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5vc1N1cHBvcnRlZCkge1xuICAgICAgICAgICAgICAgIGlmICghc2lsZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NyZWF0ZUNlcnREaWFsb2cobnVsbCwgdGhpcy50ZXh0T3NVblN1cHBvcnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShmYWxzZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5icm93c2VyU3VwcG9ydGVkKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFzaWxlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3JlYXRlQ2VydERpYWxvZyhudWxsLCB0aGlzLnRleHRCcm93c2VyVW5TdXBwb3J0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoZmFsc2UpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIXRoaXMuZXh0SW5zdGFsbGVkKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFzaWxlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3JlYXRlQ2VydERpYWxvZyhudWxsLCB0aGlzLnRleHRFeHROb3RJbnN0YWxsZWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShmYWxzZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX2xvYWRBcHBJbmZvKCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmFwcEluc3RhbGxlZCAmJiAhc2lsZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NyZWF0ZUNlcnREaWFsb2cobnVsbCwgdGhpcy50ZXh0QXBwTm90SW5zdGFsbGVkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLmFwcEluc3RhbGxlZCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY2hlY2tOYXRpdmVVcGRhdGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFwcEluc3RhbGxlZCAmJiB0aGlzLmFwcEluZm8ubmF0aXZlVmVyc2lvbiA8IHRoaXMuYXBwSW5mby5uYXRpdmVMYXRlc3RWZXJzaW9uO1xuICAgIH1cblxuICAgIGxvYWRDZXJ0cygpOiBQcm9taXNlPENlcnREYXRhW10+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgdGhpcy5jaGVja1JlYWR5KHRydWUpLnRoZW4oKHJlYWR5KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlYWR5KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Bvc3RFeHQoRVhUX0FDVElPTi5HRVRfQ0VSVFMpLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNlcnRzID0gZGF0YSAmJiBkYXRhLmRhdGEgfHwgW107XG4gICAgICAgICAgICAgICAgICAgICAgICBjZXJ0cy5mb3JFYWNoKGNlcnQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNlcnQuc3ViamVjdERhdGEgPSBDZXJ0VXRpbHMucGFyc2VDZXJ0U3RyaW5nKGNlcnQuc3ViamVjdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2VydC5pc3N1ZXJEYXRhID0gQ2VydFV0aWxzLnBhcnNlQ2VydFN0cmluZyhjZXJ0Lmlzc3Vlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoY2VydHMpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKFtdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2lnbkhhc2goZGF0YTogTWVzc2FnZVNpZ25IYXNoKTogUHJvbWlzZTxSZXBseURhdGE+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgaWYgKGRhdGEgJiYgKGRhdGEuaGFzaCB8fCBkYXRhLmhhc2hzKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tSZWFkeSgpLnRoZW4oKHJlYWR5KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZWFkeSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5oYXNoQWxnID0gZGF0YS5oYXNoQWxnIHx8IEVYVF9IQVNIX0FMRy5TSEExO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcG9zdEV4dChFWFRfQUNUSU9OLlNJR05fSEFTSCwgZGF0YSkudGhlbihyZXNvbHZlKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh7XG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiBcIkhBU0hfTUlTU0lOR1wiXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNlbGVjdENlcnQoZm9yY2VTZWxlY3Q/OiBib29sZWFuKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tSZWFkeSgpLnRoZW4oKHJlYWR5KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlYWR5KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZENlcnRzKCkudGhlbigoY2VydHMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjZXJ0cy5sZW5ndGggPiAxIHx8IGZvcmNlU2VsZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2VydENhbGxiYWNrID0gcmVzb2x2ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jcmVhdGVDZXJ0RGlhbG9nKGNlcnRzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShjZXJ0c1swXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGRhdGVEaXNwbGF5KGRhdGVTdHI6IHN0cmluZykge1xuICAgICAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoZGF0ZVN0cik7XG4gICAgICAgIHJldHVybiBbZGF0ZS5nZXREYXRlKCksIGRhdGUuZ2V0TW9udGgoKSArIDEsIGRhdGUuZ2V0RnVsbFllYXIoKV0uam9pbignLycpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3Bvc3RFeHQoYWN0aW9uOiBFWFRfQUNUSU9OLCBkYXRhPzogYW55KTogUHJvbWlzZTxSZXBseURhdGE+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuZXh0SW5zdGFsbGVkKSB7XG4gICAgICAgICAgICAgICAgd2luZG93W1wiX0V4dFRva2VuQnJpZGdlXCJdLnBvc3RUb0V4dGVuc2lvbihhY3Rpb24sIGRhdGEpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHtcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6IFwiRVhURU5TSU9OX05PVF9JTlNUQUxMXCJcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfbG9hZEFwcEluZm8oKTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgdGhpcy5fcG9zdEV4dChFWFRfQUNUSU9OLkdFVF9JTkZPKS50aGVuKChyZXBseTogUmVwbHlEYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlcGx5ICYmIHJlcGx5LmRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLmFwcEluZm8sIHJlcGx5LmRhdGEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmFwcEluc3RhbGxlZCA9ICEhdGhpcy5hcHBJbmZvLm5hdGl2ZVZlcnNpb247XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2NyZWF0ZUNlcnREaWFsb2coY2VydHM6IENlcnREYXRhW10sIG1lc3NhZ2U/OiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHRoaXMuX2RpYWxvZykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2RpYWxvZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLl9kaWFsb2cuY2xhc3NMaXN0LmFkZCgnd2VidG9rZW4tZGlhbG9nJyk7XG4gICAgICAgIHRoaXMuX2RpYWxvZy5zdHlsZS56SW5kZXggPSB0aGlzLnpJbmRleDtcblxuICAgICAgICB0aGlzLl9jZXJ0cyA9IGNlcnRzO1xuXG4gICAgICAgIGxldCBtc2c7XG5cbiAgICAgICAgaWYgKG1lc3NhZ2UpIHtcbiAgICAgICAgICAgIG1zZyA9ICc8ZGl2IGNsYXNzPVwid2VidG9rZW4tZGlhbG9nX19tZXNzYWdlXCI+JyArIG1lc3NhZ2UgKyAnPC9kaXY+JztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1zZyA9IGNlcnRzLmxlbmd0aCA8IDEgPyBgPGRpdiBjbGFzcz1cIndlYnRva2VuLWRpYWxvZ19fbWVzc2FnZVwiPiR7dGhpcy5jZXJ0Tm90Rm91bmR9PC9kaXY+YCA6IHRoaXMuX2J1aWxkQ2VydEh0bWwoY2VydHMpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fZGlhbG9nLmlubmVySFRNTCA9IGBcbiAgICAgICAgPHN0eWxlPlxuICAgICAgICAud2VidG9rZW4tZGlhbG9nIHtcbiAgICAgICAgICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICAgICAgICAgIHRvcDogMDtcbiAgICAgICAgICAgIHJpZ2h0OiAwO1xuICAgICAgICAgICAgYm90dG9tOiAwO1xuICAgICAgICAgICAgbGVmdDogMDtcbiAgICAgICAgICAgIGJhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgLjMpO1xuICAgICAgICB9XG4gICAgICAgIC53ZWJ0b2tlbi1kaWFsb2dfX2NvbnRhaW5lciB7XG4gICAgICAgICAgICB3aWR0aDogNDAwcHg7XG4gICAgICAgICAgICBtYXJnaW46IGF1dG87XG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAjZmZmO1xuICAgICAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgICAgICAgIGNvbG9yOiAjMzMzO1xuICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XG4gICAgICAgICAgICB0b3A6IDUwJTtcbiAgICAgICAgICAgIGxlZnQ6IDUwJTtcbiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgICAgICAgfVxuICAgICAgICAud2VidG9rZW4tZGlhbG9nX19oZWFkZXIge1xuICAgICAgICAgICAgcGFkZGluZzogMTBweCAxNXB4O1xuICAgICAgICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNkZGQ7XG4gICAgICAgIH1cbiAgICAgICAgLndlYnRva2VuLWRpYWxvZ19fdGl0bGUge1xuICAgICAgICAgICAgZm9udC1zaXplOiAyMHB4O1xuICAgICAgICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgICAgICAgICBtYXJnaW4tYm90dG9tOiA1cHg7XG4gICAgICAgIH1cbiAgICAgICAgLndlYnRva2VuLWRpYWxvZ19fZGVzYyB7XG4gICAgICAgICAgICBmb250LXNpemU6IDE0cHg7XG4gICAgICAgICAgICBsaW5lLWhlaWdodDogMjBweDtcbiAgICAgICAgfVxuICAgICAgICAud2VidG9rZW4tZGlhbG9nX19jbG9zZSB7XG4gICAgICAgICAgICBmbG9hdDogcmlnaHQ7XG4gICAgICAgICAgICB3aWR0aDogMzBweDtcbiAgICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgICAgICAgIGxpbmUtaGVpZ2h0OiAzMHB4O1xuICAgICAgICAgICAgbWFyZ2luOiAtNXB4IDA7XG4gICAgICAgICAgICBmb250LXNpemU6IDIwcHg7XG4gICAgICAgIH1cbiAgICAgICAgLndlYnRva2VuLWRpYWxvZ19fYm9keSB7XG4gICAgICAgICAgICBtYXgtaGVpZ2h0OiAyNTBweDtcbiAgICAgICAgICAgIG92ZXJmbG93OiBhdXRvO1xuICAgICAgICAgICAgZm9udC1zaXplOiAxNHB4O1xuICAgICAgICAgICAgbGluZS1oZWlnaHQ6IDIwcHg7XG4gICAgICAgIH1cbiAgICAgICAgLndlYnRva2VuLWRpYWxvZ19fbWVzc2FnZSB7XG4gICAgICAgICAgICBwYWRkaW5nOiAyMHB4OyAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgIC53ZWJ0b2tlbi1jZXJ0X19pdGVtIHtcbiAgICAgICAgICAgIHBhZGRpbmc6IDEwcHggMjBweDtcbiAgICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgICAgICAgIGxpbmUtaGVpZ2h0OiAyMHB4O1xuICAgICAgICB9XG4gICAgICAgIC53ZWJ0b2tlbi1jZXJ0X19pdGVtLmFjdGl2ZSB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAjZGRkICFpbXBvcnRhbnQ7XG4gICAgICAgIH1cbiAgICAgICAgLndlYnRva2VuLWNlcnRfX2l0ZW06aG92ZXIge1xuICAgICAgICAgICAgYmFja2dyb3VuZDogI2Y1ZjVmNTtcbiAgICAgICAgfVxuICAgICAgICAud2VidG9rZW4tY2VydF9fdGl0bGUge1xuICAgICAgICAgICAgZm9udC1zaXplOiAxOHB4O1xuICAgICAgICAgICAgbWFyZ2luLWJvdHRvbTogMnB4O1xuICAgICAgICB9XG4gICAgICAgIC53ZWJ0b2tlbi1jZXJ0X190ZXh0IHtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICAgICAgfVxuICAgICAgICAud2VidG9rZW4tZGlhbG9nX19mb290ZXIge1xuICAgICAgICAgICAgcGFkZGluZzogMTBweCAyMHB4O1xuICAgICAgICAgICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNkZGQ7XG4gICAgICAgICAgICB0ZXh0LWFsaWduOiByaWdodDtcbiAgICAgICAgfVxuICAgICAgICAud2VidG9rZW4tZGlhbG9nX19idXR0b24ge1xuICAgICAgICAgICAgaGVpZ2h0OiAzMHB4O1xuICAgICAgICAgICAgbGluZS1oZWlnaHQ6IDMwcHg7XG4gICAgICAgICAgICBwYWRkaW5nOiAwIDEwcHg7XG4gICAgICAgICAgICBtaW4td2lkdGg6IDYwcHg7XG4gICAgICAgICAgICBtYXJnaW4tbGVmdDogMTBweDtcbiAgICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgICAgICAgICAgYmFja2dyb3VuZDogI2ZmZjtcbiAgICAgICAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNkZGQ7XG4gICAgICAgIH1cbiAgICAgICAgLndlYnRva2VuLWRpYWxvZ19fYnV0dG9uOmhvdmVyIHtcbiAgICAgICAgICAgIG9wYWNpdHk6IDg7XG4gICAgICAgIH1cbiAgICAgICAgLmJ0bi1vayB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAjMDA3YmZmO1xuICAgICAgICAgICAgYm9yZGVyLWNvbG9yOiAjMDA3YmZmO1xuICAgICAgICAgICAgY29sb3I6ICNmZmY7XG4gICAgICAgIH1cbiAgICAgICAgPC9zdHlsZT5cbiAgICAgICAgPGRpdiBjbGFzcz1cIndlYnRva2VuLWRpYWxvZ19fY29udGFpbmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ3ZWJ0b2tlbi1kaWFsb2dfX2hlYWRlclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwid2VidG9rZW4tZGlhbG9nX19jbG9zZVwiPsOXPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ3ZWJ0b2tlbi1kaWFsb2dfX3RpdGxlXCI+JHt0aGlzLnRpdGxlfTwvZGl2PlxuICAgICAgICAke21lc3NhZ2UgPyAnJyA6IGA8ZGl2IGNsYXNzPVwid2VidG9rZW4tZGlhbG9nX19kZXNjXCI+JHt0aGlzLmRlc2NyaXB0aW9ufTwvZGl2PmB9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwid2VidG9rZW4tZGlhbG9nX19ib2R5XCI+JHttc2d9PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ3ZWJ0b2tlbi1kaWFsb2dfX2Zvb3RlclwiPlxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuLWNsb3NlIHdlYnRva2VuLWRpYWxvZ19fYnV0dG9uXCI+JHt0aGlzLnRleHRDYW5jZWx9PC9idXR0b24+XG4gICAgICAgICR7bWVzc2FnZSA/ICcnIDogYDxidXR0b24gY2xhc3M9XCJidG4tb2sgd2VidG9rZW4tZGlhbG9nX19idXR0b25cIj4ke3RoaXMudGV4dE9rfTwvYnV0dG9uPmB9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgYDtcblxuICAgICAgICBjb25zdCBjZXJ0RWwgPSB0aGlzLl9kaWFsb2cuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnd2VidG9rZW4tY2VydF9faXRlbScpO1xuXG4gICAgICAgIC8vIENsb3NlIGRpYWxvZ1xuICAgICAgICB0aGlzLl9kaWFsb2cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0aGlzLl9jbG9zZURpYWxvZygpKTtcbiAgICAgICAgdGhpcy5fZGlhbG9nLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3dlYnRva2VuLWRpYWxvZ19fY2xvc2UnKVswXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMuX2Nsb3NlRGlhbG9nKCkpO1xuXG4gICAgICAgIC8vIFByZXZlbnQgY2xvc2UgZGlhbG9nXG4gICAgICAgIHRoaXMuX2RpYWxvZy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCd3ZWJ0b2tlbi1kaWFsb2dfX2NvbnRhaW5lcicpWzBdLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuX2RpYWxvZy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdidG4tY2xvc2UnKVswXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMuX2Nsb3NlRGlhbG9nKCkpO1xuXG4gICAgICAgIGlmIChjZXJ0cyAmJiBjZXJ0cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAvLyBPayBzZWxlY3RcbiAgICAgICAgICAgIHRoaXMuX2RpYWxvZy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdidG4tb2snKVswXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fY2VydEVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IE51bWJlcih0aGlzLl9jZXJ0RWwuZ2V0QXR0cmlidXRlKCdpbmRleCcpKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2NlcnRzW2luZGV4XSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2VydENhbGxiYWNrKHRoaXMuX2NlcnRzW2luZGV4XSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jZXJ0Q2FsbGJhY2sobnVsbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuX2Nsb3NlRGlhbG9nKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gT24gY2xpY2sgY2VydCBpdGVtXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNlcnRFbC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGNlcnRFbFtpXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB0aGlzLl9vbkNsaWNrQ2VydEVsKGUpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gU2VsZWN0IGZpcnN0IGNlcnRcbiAgICAgICAgICAgIGNlcnRFbFswXS5jbGljaygpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRXNjIGtleSBjbG9zZSBkaWFsb2dcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuX29uRXNjYXBlS2V5KTtcblxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuX2RpYWxvZyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfYnVpbGRDZXJ0SHRtbChjZXJ0czogQ2VydERhdGFbXSkge1xuICAgICAgICBsZXQgaHRtbCA9ICcnO1xuICAgICAgICBjZXJ0cy5mb3JFYWNoKChjZXJ0OiBDZXJ0RGF0YSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGh0bWwgKz0gYFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIndlYnRva2VuLWNlcnRfX2l0ZW1cIiBpbmRleD1cIiR7aW5kZXh9XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwid2VidG9rZW4tY2VydF9fdGl0bGVcIj4ke2NlcnQuc3ViamVjdERhdGEuQ059PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwid2VidG9rZW4tY2VydF9fdGV4dFwiPiR7dGhpcy50ZXh0SXNzdWVyfTogJHtjZXJ0Lmlzc3VlckRhdGEuQ059PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwid2VidG9rZW4tY2VydF9fdGV4dFwiPiR7dGhpcy50ZXh0VmFsaWR9OiAke3RoaXMuZGF0ZURpc3BsYXkoY2VydC52YWxpZEZyb20pfSAtICR7dGhpcy5kYXRlRGlzcGxheShjZXJ0LnZhbGlkVG8pfTwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICBgO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGh0bWw7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfb25DbGlja0NlcnRFbChlKSB7XG4gICAgICAgIGxldCBjZXJ0RWwgPSB0aGlzLl9maW5kQ2VyRWwoZS50YXJnZXQpO1xuICAgICAgICBpZiAoY2VydEVsLmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fY2VydEVsKSB7XG4gICAgICAgICAgICB0aGlzLl9jZXJ0RWwuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgICAgIH1cbiAgICAgICAgY2VydEVsLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgICB0aGlzLl9jZXJ0RWwgPSBjZXJ0RWw7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZmluZENlckVsKGNlcnRFbCkge1xuICAgICAgICBpZiAoIWNlcnRFbC5jbGFzc0xpc3QuY29udGFpbnMoJ3dlYnRva2VuLWNlcnRfX2l0ZW0nKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2ZpbmRDZXJFbChjZXJ0RWwucGFyZW50Tm9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNlcnRFbDtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9jbG9zZURpYWxvZygpIHtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZCh0aGlzLl9kaWFsb2cpO1xuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5fb25Fc2NhcGVLZXkpO1xuICAgICAgICB0aGlzLl9kaWFsb2cgPSBudWxsO1xuICAgICAgICB0aGlzLl9jZXJ0RWwgPSBudWxsO1xuICAgICAgICB0aGlzLl9jZXJ0Q2FsbGJhY2sgPSBudWxsO1xuICAgIH1cblxuICAgIHByaXZhdGUgX29uRXNjYXBlS2V5KGUpIHtcbiAgICAgICAgaWYgKGUud2hpY2ggPT09IDI3KSB7XG4gICAgICAgICAgICB0aGlzLl9jbG9zZURpYWxvZygpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19