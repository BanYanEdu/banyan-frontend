/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { WebTokenSigner } from "./lib/WebTokenSigner";
import { TokenSimulator } from "./lib/TokenSimulator";
import { EXT_HASH_ALG } from "./lib/Constants";
import { Observable } from "rxjs";
var WebTokenService = /** @class */ (function () {
    function WebTokenService() {
        this._signer = new WebTokenSigner();
    }
    /**
     * @return {?}
     */
    WebTokenService.prototype.initForDevMode = /**
     * @return {?}
     */
    function () {
        console.warn("Init WebTokenSigner for dev mode. Not used it in production mode");
        this._signer.appInstalled = true;
        if (!window["_ExtTokenBridge"]) {
            window["_ExtTokenBridge"] = TokenSimulator;
        }
    };
    /**
     * @return {?}
     */
    WebTokenService.prototype.ready = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return Observable.create((/**
         * @param {?} subscriber
         * @return {?}
         */
        function (subscriber) {
            _this._signer.checkReady().then((/**
             * @param {?} supported
             * @return {?}
             */
            function (supported) { return subscriber.next(supported); }));
        }));
    };
    /**
     * @param {?=} forceSelect
     * @return {?}
     */
    WebTokenService.prototype.selectCert = /**
     * @param {?=} forceSelect
     * @return {?}
     */
    function (forceSelect) {
        var _this = this;
        return Observable.create((/**
         * @param {?} subscriber
         * @return {?}
         */
        function (subscriber) {
            _this._signer.selectCert(forceSelect).then((/**
             * @param {?} cert
             * @return {?}
             */
            function (cert) { return subscriber.next(cert); }));
        }));
    };
    /**
     * @param {?} serial
     * @return {?}
     */
    WebTokenService.prototype.getCertBySerial = /**
     * @param {?} serial
     * @return {?}
     */
    function (serial) {
        var _this = this;
        return Observable.create((/**
         * @param {?} subscriber
         * @return {?}
         */
        function (subscriber) {
            _this.loadCerts().subscribe((/**
             * @param {?} certs
             * @return {?}
             */
            function (certs) {
                for (var i = 0; i < certs.length; i++) {
                    if (certs[i].serial === serial) {
                        return subscriber.next(certs[i]);
                    }
                }
                subscriber.next(null);
            }));
        }));
    };
    /**
     * @param {?=} serial
     * @return {?}
     */
    WebTokenService.prototype.selectCertUnlock = /**
     * @param {?=} serial
     * @return {?}
     */
    function (serial) {
        var _this = this;
        return Observable.create((/**
         * @param {?} subscriber
         * @return {?}
         */
        function (subscriber) {
            if (serial) {
                _this.getCertBySerial(serial).subscribe((/**
                 * @param {?} cert
                 * @return {?}
                 */
                function (cert) { return _this._unlockCert(cert, subscriber); }));
            }
            else {
                _this.selectCert().subscribe((/**
                 * @param {?} cert
                 * @return {?}
                 */
                function (cert) { return _this._unlockCert(cert, subscriber); }));
            }
        }));
    };
    /**
     * @private
     * @param {?} cert
     * @param {?} subscriber
     * @return {?}
     */
    WebTokenService.prototype._unlockCert = /**
     * @private
     * @param {?} cert
     * @param {?} subscriber
     * @return {?}
     */
    function (cert, subscriber) {
        if (cert) {
            this.unlockCert(cert).subscribe((/**
             * @param {?} unlocked
             * @return {?}
             */
            function (unlocked) {
                cert.unlocked = unlocked;
                subscriber.next(cert);
            }));
        }
        else {
            subscriber.next(cert);
        }
    };
    /**
     * @param {?} cert
     * @return {?}
     */
    WebTokenService.prototype.unlockCert = /**
     * @param {?} cert
     * @return {?}
     */
    function (cert) {
        var _this = this;
        return Observable.create((/**
         * @param {?} subscriber
         * @return {?}
         */
        function (subscriber) {
            // Sign fake data to unlock token
            /** @type {?} */
            var fakeData = {
                hash: "cA/metLrX7NUOfviDVsGYeRxAIo=",
                hashAlg: EXT_HASH_ALG.SHA1,
                serial: cert.serial
            };
            _this.signHash(fakeData).subscribe((/**
             * @param {?} response
             * @return {?}
             */
            function (response) {
                if (response && response.data && response.data.signature) {
                    subscriber.next(true);
                }
                else {
                    subscriber.next(false);
                }
            }));
        }));
    };
    /**
     * @return {?}
     */
    WebTokenService.prototype.loadCerts = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return Observable.create((/**
         * @param {?} subscriber
         * @return {?}
         */
        function (subscriber) {
            _this._signer.loadCerts().then((/**
             * @param {?} data
             * @return {?}
             */
            function (data) { return subscriber.next(data); }));
        }));
    };
    /**
     * @param {?} data
     * @return {?}
     */
    WebTokenService.prototype.signHash = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        var _this = this;
        return Observable.create((/**
         * @param {?} subscriber
         * @return {?}
         */
        function (subscriber) {
            _this._signer.signHash(data).then((/**
             * @param {?} response
             * @return {?}
             */
            function (response) { return subscriber.next(response); }));
        }));
    };
    WebTokenService.decorators = [
        { type: Injectable }
    ];
    return WebTokenService;
}());
export { WebTokenService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    WebTokenService.prototype._signer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ViLXRva2VuLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbmV0LXVpLyIsInNvdXJjZXMiOlsic3JjL3dlYi10b2tlbi93ZWItdG9rZW4uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFJcEQsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ3BELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsVUFBVSxFQUFhLE1BQU0sTUFBTSxDQUFDO0FBRTVDO0lBQUE7UUFHVSxZQUFPLEdBQUcsSUFBSSxjQUFjLEVBQUUsQ0FBQztJQXFGekMsQ0FBQzs7OztJQW5GQyx3Q0FBYzs7O0lBQWQ7UUFDRSxPQUFPLENBQUMsSUFBSSxDQUFDLGtFQUFrRSxDQUFDLENBQUM7UUFDakYsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsRUFBRTtZQUM5QixNQUFNLENBQUMsaUJBQWlCLENBQUMsR0FBRyxjQUFjLENBQUM7U0FDNUM7SUFDSCxDQUFDOzs7O0lBRUQsK0JBQUs7OztJQUFMO1FBQUEsaUJBSUM7UUFIQyxPQUFPLFVBQVUsQ0FBQyxNQUFNOzs7O1FBQUMsVUFBQyxVQUErQjtZQUN2RCxLQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxDQUFDLElBQUk7Ozs7WUFBQyxVQUFDLFNBQVMsSUFBSyxPQUFBLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQTFCLENBQTBCLEVBQUMsQ0FBQztRQUM1RSxDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7Ozs7O0lBRUQsb0NBQVU7Ozs7SUFBVixVQUFXLFdBQXFCO1FBQWhD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Q0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ3hCO1lBQ0gsQ0FBQyxFQUFDLENBQUM7UUFDTCxDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7Ozs7SUFFRCxtQ0FBUzs7O0lBQVQ7UUFBQSxpQkFJQztRQUhDLE9BQU8sVUFBVSxDQUFDLE1BQU07Ozs7UUFBQyxVQUFDLFVBQVU7WUFDbEMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxJQUFJOzs7O1lBQUMsVUFBQyxJQUFJLElBQUssT0FBQSxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFyQixDQUFxQixFQUFDLENBQUM7UUFDakUsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDOzs7OztJQUVELGtDQUFROzs7O0lBQVIsVUFBUyxJQUFxQjtRQUE5QixpQkFJQztRQUhDLE9BQU8sVUFBVSxDQUFDLE1BQU07Ozs7UUFBQyxVQUFDLFVBQWlDO1lBQ3pELEtBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUk7Ozs7WUFBQyxVQUFDLFFBQVEsSUFBSyxPQUFBLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQXpCLENBQXlCLEVBQUMsQ0FBQztRQUM1RSxDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7O2dCQXZGRixVQUFVOztJQXdGWCxzQkFBQztDQUFBLEFBeEZELElBd0ZDO1NBdkZZLGVBQWU7Ozs7OztJQUUxQixrQ0FBdUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1dlYlRva2VuU2lnbmVyfSBmcm9tIFwiLi9saWIvV2ViVG9rZW5TaWduZXJcIjtcbmltcG9ydCB7Q2VydERhdGF9IGZyb20gXCIuL2xpYi9tb2RlbC9DZXJ0RGF0YVwiO1xuaW1wb3J0IHtNZXNzYWdlU2lnbkhhc2h9IGZyb20gXCIuL2xpYi9tb2RlbC9NZXNzYWdlU2lnbkhhc2hcIjtcbmltcG9ydCB7UmVwbHlEYXRhfSBmcm9tIFwiLi9saWIvbW9kZWwvUmVwbHlEYXRhXCI7XG5pbXBvcnQge1Rva2VuU2ltdWxhdG9yfSBmcm9tIFwiLi9saWIvVG9rZW5TaW11bGF0b3JcIjtcbmltcG9ydCB7RVhUX0hBU0hfQUxHfSBmcm9tIFwiLi9saWIvQ29uc3RhbnRzXCI7XG5pbXBvcnQge09ic2VydmFibGUsIFN1YnNjcmliZXJ9IGZyb20gXCJyeGpzXCI7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBXZWJUb2tlblNlcnZpY2Uge1xuXG4gIHByaXZhdGUgX3NpZ25lciA9IG5ldyBXZWJUb2tlblNpZ25lcigpO1xuXG4gIGluaXRGb3JEZXZNb2RlKCkge1xuICAgIGNvbnNvbGUud2FybihcIkluaXQgV2ViVG9rZW5TaWduZXIgZm9yIGRldiBtb2RlLiBOb3QgdXNlZCBpdCBpbiBwcm9kdWN0aW9uIG1vZGVcIik7XG4gICAgdGhpcy5fc2lnbmVyLmFwcEluc3RhbGxlZCA9IHRydWU7XG4gICAgaWYgKCF3aW5kb3dbXCJfRXh0VG9rZW5CcmlkZ2VcIl0pIHtcbiAgICAgIHdpbmRvd1tcIl9FeHRUb2tlbkJyaWRnZVwiXSA9IFRva2VuU2ltdWxhdG9yO1xuICAgIH1cbiAgfVxuXG4gIHJlYWR5KCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZSgoc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxib29sZWFuPikgPT4ge1xuICAgICAgdGhpcy5fc2lnbmVyLmNoZWNrUmVhZHkoKS50aGVuKChzdXBwb3J0ZWQpID0+IHN1YnNjcmliZXIubmV4dChzdXBwb3J0ZWQpKTtcbiAgICB9KTtcbiAgfVxuXG4gIHNlbGVjdENlcnQoZm9yY2VTZWxlY3Q/OiBib29sZWFuKTogT2JzZXJ2YWJsZTxDZXJ0RGF0YT4ge1xuICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZSgoc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxDZXJ0RGF0YT4pID0+IHtcbiAgICAgIHRoaXMuX3NpZ25lci5zZWxlY3RDZXJ0KGZvcmNlU2VsZWN0KS50aGVuKChjZXJ0OiBDZXJ0RGF0YSkgPT4gc3Vic2NyaWJlci5uZXh0KGNlcnQpKTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldENlcnRCeVNlcmlhbChzZXJpYWw6IHN0cmluZyk6IE9ic2VydmFibGU8Q2VydERhdGE+IHtcbiAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUoKHN1YnNjcmliZXI6IFN1YnNjcmliZXI8Q2VydERhdGE+KSA9PiB7XG4gICAgICB0aGlzLmxvYWRDZXJ0cygpLnN1YnNjcmliZSgoY2VydHM6IENlcnREYXRhW10pID0+IHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjZXJ0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmIChjZXJ0c1tpXS5zZXJpYWwgPT09IHNlcmlhbCkge1xuICAgICAgICAgICAgcmV0dXJuIHN1YnNjcmliZXIubmV4dChjZXJ0c1tpXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHN1YnNjcmliZXIubmV4dChudWxsKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgc2VsZWN0Q2VydFVubG9jayhzZXJpYWw/OiBzdHJpbmcpOiBPYnNlcnZhYmxlPENlcnREYXRhPiB7XG4gICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKChzdWJzY3JpYmVyKSA9PiB7XG4gICAgICBpZiAoc2VyaWFsKSB7XG4gICAgICAgIHRoaXMuZ2V0Q2VydEJ5U2VyaWFsKHNlcmlhbCkuc3Vic2NyaWJlKChjZXJ0OiBDZXJ0RGF0YSkgPT4gdGhpcy5fdW5sb2NrQ2VydChjZXJ0LCBzdWJzY3JpYmVyKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnNlbGVjdENlcnQoKS5zdWJzY3JpYmUoKGNlcnQ6IENlcnREYXRhKSA9PiB0aGlzLl91bmxvY2tDZXJ0KGNlcnQsIHN1YnNjcmliZXIpKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX3VubG9ja0NlcnQoY2VydDogQ2VydERhdGEsIHN1YnNjcmliZXI6IFN1YnNjcmliZXI8Q2VydERhdGE+KSB7XG4gICAgaWYgKGNlcnQpIHtcbiAgICAgIHRoaXMudW5sb2NrQ2VydChjZXJ0KS5zdWJzY3JpYmUoKHVubG9ja2VkOiBib29sZWFuKSA9PiB7XG4gICAgICAgIGNlcnQudW5sb2NrZWQgPSB1bmxvY2tlZDtcbiAgICAgICAgc3Vic2NyaWJlci5uZXh0KGNlcnQpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN1YnNjcmliZXIubmV4dChjZXJ0KTtcbiAgICB9XG4gIH1cblxuICB1bmxvY2tDZXJ0KGNlcnQ6IENlcnREYXRhKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKChzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPGJvb2xlYW4+KSA9PiB7XG4gICAgICAvLyBTaWduIGZha2UgZGF0YSB0byB1bmxvY2sgdG9rZW5cbiAgICAgIGNvbnN0IGZha2VEYXRhOiBNZXNzYWdlU2lnbkhhc2ggPSB7XG4gICAgICAgIGhhc2g6IFwiY0EvbWV0THJYN05VT2Z2aURWc0dZZVJ4QUlvPVwiLFxuICAgICAgICBoYXNoQWxnOiBFWFRfSEFTSF9BTEcuU0hBMSxcbiAgICAgICAgc2VyaWFsOiBjZXJ0LnNlcmlhbFxuICAgICAgfTtcbiAgICAgIHRoaXMuc2lnbkhhc2goZmFrZURhdGEpLnN1YnNjcmliZSgocmVzcG9uc2U6IFJlcGx5RGF0YSkgPT4ge1xuICAgICAgICBpZiAocmVzcG9uc2UgJiYgcmVzcG9uc2UuZGF0YSAmJiByZXNwb25zZS5kYXRhLnNpZ25hdHVyZSkge1xuICAgICAgICAgIHN1YnNjcmliZXIubmV4dCh0cnVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdWJzY3JpYmVyLm5leHQoZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGxvYWRDZXJ0cygpOiBPYnNlcnZhYmxlPENlcnREYXRhW10+IHtcbiAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUoKHN1YnNjcmliZXIpID0+IHtcbiAgICAgIHRoaXMuX3NpZ25lci5sb2FkQ2VydHMoKS50aGVuKChkYXRhKSA9PiBzdWJzY3JpYmVyLm5leHQoZGF0YSkpO1xuICAgIH0pO1xuICB9XG5cbiAgc2lnbkhhc2goZGF0YTogTWVzc2FnZVNpZ25IYXNoKTogT2JzZXJ2YWJsZTxSZXBseURhdGE+IHtcbiAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUoKHN1YnNjcmliZXI6IFN1YnNjcmliZXI8UmVwbHlEYXRhPikgPT4ge1xuICAgICAgdGhpcy5fc2lnbmVyLnNpZ25IYXNoKGRhdGEpLnRoZW4oKHJlc3BvbnNlKSA9PiBzdWJzY3JpYmVyLm5leHQocmVzcG9uc2UpKTtcbiAgICB9KTtcbiAgfVxufVxuIl19