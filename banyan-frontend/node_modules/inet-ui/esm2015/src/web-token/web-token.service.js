/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { WebTokenSigner } from "./lib/WebTokenSigner";
import { TokenSimulator } from "./lib/TokenSimulator";
import { EXT_HASH_ALG } from "./lib/Constants";
import { Observable } from "rxjs";
export class WebTokenService {
    constructor() {
        this._signer = new WebTokenSigner();
    }
    /**
     * @return {?}
     */
    initForDevMode() {
        console.warn("Init WebTokenSigner for dev mode. Not used it in production mode");
        this._signer.appInstalled = true;
        if (!window["_ExtTokenBridge"]) {
            window["_ExtTokenBridge"] = TokenSimulator;
        }
    }
    /**
     * @return {?}
     */
    ready() {
        return Observable.create((/**
         * @param {?} subscriber
         * @return {?}
         */
        (subscriber) => {
            this._signer.checkReady().then((/**
             * @param {?} supported
             * @return {?}
             */
            (supported) => subscriber.next(supported)));
        }));
    }
    /**
     * @param {?=} forceSelect
     * @return {?}
     */
    selectCert(forceSelect) {
        return Observable.create((/**
         * @param {?} subscriber
         * @return {?}
         */
        (subscriber) => {
            this._signer.selectCert(forceSelect).then((/**
             * @param {?} cert
             * @return {?}
             */
            (cert) => subscriber.next(cert)));
        }));
    }
    /**
     * @param {?} serial
     * @return {?}
     */
    getCertBySerial(serial) {
        return Observable.create((/**
         * @param {?} subscriber
         * @return {?}
         */
        (subscriber) => {
            this.loadCerts().subscribe((/**
             * @param {?} certs
             * @return {?}
             */
            (certs) => {
                for (let i = 0; i < certs.length; i++) {
                    if (certs[i].serial === serial) {
                        return subscriber.next(certs[i]);
                    }
                }
                subscriber.next(null);
            }));
        }));
    }
    /**
     * @param {?=} serial
     * @return {?}
     */
    selectCertUnlock(serial) {
        return Observable.create((/**
         * @param {?} subscriber
         * @return {?}
         */
        (subscriber) => {
            if (serial) {
                this.getCertBySerial(serial).subscribe((/**
                 * @param {?} cert
                 * @return {?}
                 */
                (cert) => this._unlockCert(cert, subscriber)));
            }
            else {
                this.selectCert().subscribe((/**
                 * @param {?} cert
                 * @return {?}
                 */
                (cert) => this._unlockCert(cert, subscriber)));
            }
        }));
    }
    /**
     * @private
     * @param {?} cert
     * @param {?} subscriber
     * @return {?}
     */
    _unlockCert(cert, subscriber) {
        if (cert) {
            this.unlockCert(cert).subscribe((/**
             * @param {?} unlocked
             * @return {?}
             */
            (unlocked) => {
                cert.unlocked = unlocked;
                subscriber.next(cert);
            }));
        }
        else {
            subscriber.next(cert);
        }
    }
    /**
     * @param {?} cert
     * @return {?}
     */
    unlockCert(cert) {
        return Observable.create((/**
         * @param {?} subscriber
         * @return {?}
         */
        (subscriber) => {
            // Sign fake data to unlock token
            /** @type {?} */
            const fakeData = {
                hash: "cA/metLrX7NUOfviDVsGYeRxAIo=",
                hashAlg: EXT_HASH_ALG.SHA1,
                serial: cert.serial
            };
            this.signHash(fakeData).subscribe((/**
             * @param {?} response
             * @return {?}
             */
            (response) => {
                if (response && response.data && response.data.signature) {
                    subscriber.next(true);
                }
                else {
                    subscriber.next(false);
                }
            }));
        }));
    }
    /**
     * @return {?}
     */
    loadCerts() {
        return Observable.create((/**
         * @param {?} subscriber
         * @return {?}
         */
        (subscriber) => {
            this._signer.loadCerts().then((/**
             * @param {?} data
             * @return {?}
             */
            (data) => subscriber.next(data)));
        }));
    }
    /**
     * @param {?} data
     * @return {?}
     */
    signHash(data) {
        return Observable.create((/**
         * @param {?} subscriber
         * @return {?}
         */
        (subscriber) => {
            this._signer.signHash(data).then((/**
             * @param {?} response
             * @return {?}
             */
            (response) => subscriber.next(response)));
        }));
    }
}
WebTokenService.decorators = [
    { type: Injectable }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    WebTokenService.prototype._signer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ViLXRva2VuLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbmV0LXVpLyIsInNvdXJjZXMiOlsic3JjL3dlYi10b2tlbi93ZWItdG9rZW4uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFJcEQsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ3BELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsVUFBVSxFQUFhLE1BQU0sTUFBTSxDQUFDO0FBRzVDLE1BQU0sT0FBTyxlQUFlO0lBRDVCO1FBR1UsWUFBTyxHQUFHLElBQUksY0FBYyxFQUFFLENBQUM7SUFxRnpDLENBQUM7Ozs7SUFuRkMsY0FBYztRQUNaLE9BQU8sQ0FBQyxJQUFJLENBQUMsa0VBQWtFLENBQUMsQ0FBQztRQUNqRixJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7UUFDakMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFO1lBQzlCLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLGNBQWMsQ0FBQztTQUM1QztJQUNILENBQUM7Ozs7SUFFRCxLQUFLO1FBQ0gsT0FBTyxVQUFVLENBQUMsTUFBTTs7OztRQUFDLENBQUMsVUFBK0IsRUFBRSxFQUFFO1lBQzNELElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLENBQUMsSUFBSTs7OztZQUFDLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFDLENBQUM7UUFDNUUsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDOzs7OztJQUVELFVBQVUsQ0FBQyxXQUFxQjtRQUM5QixPQUFPLFVBQVUsQ0FBQyxN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QztRQUNMLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7OztJQUVELFNBQVM7UUFDUCxPQUFPLFVBQVUsQ0FBQyxNQUFNOzs7O1FBQUMsQ0FBQyxVQUFVLEVBQUUsRUFBRTtZQUN0QyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDLElBQUk7Ozs7WUFBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBQyxDQUFDO1FBQ2pFLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7SUFFRCxRQUFRLENBQUMsSUFBcUI7UUFDNUIsT0FBTyxVQUFVLENBQUMsTUFBTTs7OztRQUFDLENBQUMsVUFBaUMsRUFBRSxFQUFFO1lBQzdELElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUk7Ozs7WUFBQyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBQyxDQUFDO1FBQzVFLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7O1lBdkZGLFVBQVU7Ozs7Ozs7SUFHVCxrQ0FBdUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1dlYlRva2VuU2lnbmVyfSBmcm9tIFwiLi9saWIvV2ViVG9rZW5TaWduZXJcIjtcbmltcG9ydCB7Q2VydERhdGF9IGZyb20gXCIuL2xpYi9tb2RlbC9DZXJ0RGF0YVwiO1xuaW1wb3J0IHtNZXNzYWdlU2lnbkhhc2h9IGZyb20gXCIuL2xpYi9tb2RlbC9NZXNzYWdlU2lnbkhhc2hcIjtcbmltcG9ydCB7UmVwbHlEYXRhfSBmcm9tIFwiLi9saWIvbW9kZWwvUmVwbHlEYXRhXCI7XG5pbXBvcnQge1Rva2VuU2ltdWxhdG9yfSBmcm9tIFwiLi9saWIvVG9rZW5TaW11bGF0b3JcIjtcbmltcG9ydCB7RVhUX0hBU0hfQUxHfSBmcm9tIFwiLi9saWIvQ29uc3RhbnRzXCI7XG5pbXBvcnQge09ic2VydmFibGUsIFN1YnNjcmliZXJ9IGZyb20gXCJyeGpzXCI7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBXZWJUb2tlblNlcnZpY2Uge1xuXG4gIHByaXZhdGUgX3NpZ25lciA9IG5ldyBXZWJUb2tlblNpZ25lcigpO1xuXG4gIGluaXRGb3JEZXZNb2RlKCkge1xuICAgIGNvbnNvbGUud2FybihcIkluaXQgV2ViVG9rZW5TaWduZXIgZm9yIGRldiBtb2RlLiBOb3QgdXNlZCBpdCBpbiBwcm9kdWN0aW9uIG1vZGVcIik7XG4gICAgdGhpcy5fc2lnbmVyLmFwcEluc3RhbGxlZCA9IHRydWU7XG4gICAgaWYgKCF3aW5kb3dbXCJfRXh0VG9rZW5CcmlkZ2VcIl0pIHtcbiAgICAgIHdpbmRvd1tcIl9FeHRUb2tlbkJyaWRnZVwiXSA9IFRva2VuU2ltdWxhdG9yO1xuICAgIH1cbiAgfVxuXG4gIHJlYWR5KCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZSgoc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxib29sZWFuPikgPT4ge1xuICAgICAgdGhpcy5fc2lnbmVyLmNoZWNrUmVhZHkoKS50aGVuKChzdXBwb3J0ZWQpID0+IHN1YnNjcmliZXIubmV4dChzdXBwb3J0ZWQpKTtcbiAgICB9KTtcbiAgfVxuXG4gIHNlbGVjdENlcnQoZm9yY2VTZWxlY3Q/OiBib29sZWFuKTogT2JzZXJ2YWJsZTxDZXJ0RGF0YT4ge1xuICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZSgoc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxDZXJ0RGF0YT4pID0+IHtcbiAgICAgIHRoaXMuX3NpZ25lci5zZWxlY3RDZXJ0KGZvcmNlU2VsZWN0KS50aGVuKChjZXJ0OiBDZXJ0RGF0YSkgPT4gc3Vic2NyaWJlci5uZXh0KGNlcnQpKTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldENlcnRCeVNlcmlhbChzZXJpYWw6IHN0cmluZyk6IE9ic2VydmFibGU8Q2VydERhdGE+IHtcbiAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUoKHN1YnNjcmliZXI6IFN1YnNjcmliZXI8Q2VydERhdGE+KSA9PiB7XG4gICAgICB0aGlzLmxvYWRDZXJ0cygpLnN1YnNjcmliZSgoY2VydHM6IENlcnREYXRhW10pID0+IHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjZXJ0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmIChjZXJ0c1tpXS5zZXJpYWwgPT09IHNlcmlhbCkge1xuICAgICAgICAgICAgcmV0dXJuIHN1YnNjcmliZXIubmV4dChjZXJ0c1tpXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHN1YnNjcmliZXIubmV4dChudWxsKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgc2VsZWN0Q2VydFVubG9jayhzZXJpYWw/OiBzdHJpbmcpOiBPYnNlcnZhYmxlPENlcnREYXRhPiB7XG4gICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKChzdWJzY3JpYmVyKSA9PiB7XG4gICAgICBpZiAoc2VyaWFsKSB7XG4gICAgICAgIHRoaXMuZ2V0Q2VydEJ5U2VyaWFsKHNlcmlhbCkuc3Vic2NyaWJlKChjZXJ0OiBDZXJ0RGF0YSkgPT4gdGhpcy5fdW5sb2NrQ2VydChjZXJ0LCBzdWJzY3JpYmVyKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnNlbGVjdENlcnQoKS5zdWJzY3JpYmUoKGNlcnQ6IENlcnREYXRhKSA9PiB0aGlzLl91bmxvY2tDZXJ0KGNlcnQsIHN1YnNjcmliZXIpKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX3VubG9ja0NlcnQoY2VydDogQ2VydERhdGEsIHN1YnNjcmliZXI6IFN1YnNjcmliZXI8Q2VydERhdGE+KSB7XG4gICAgaWYgKGNlcnQpIHtcbiAgICAgIHRoaXMudW5sb2NrQ2VydChjZXJ0KS5zdWJzY3JpYmUoKHVubG9ja2VkOiBib29sZWFuKSA9PiB7XG4gICAgICAgIGNlcnQudW5sb2NrZWQgPSB1bmxvY2tlZDtcbiAgICAgICAgc3Vic2NyaWJlci5uZXh0KGNlcnQpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN1YnNjcmliZXIubmV4dChjZXJ0KTtcbiAgICB9XG4gIH1cblxuICB1bmxvY2tDZXJ0KGNlcnQ6IENlcnREYXRhKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKChzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPGJvb2xlYW4+KSA9PiB7XG4gICAgICAvLyBTaWduIGZha2UgZGF0YSB0byB1bmxvY2sgdG9rZW5cbiAgICAgIGNvbnN0IGZha2VEYXRhOiBNZXNzYWdlU2lnbkhhc2ggPSB7XG4gICAgICAgIGhhc2g6IFwiY0EvbWV0THJYN05VT2Z2aURWc0dZZVJ4QUlvPVwiLFxuICAgICAgICBoYXNoQWxnOiBFWFRfSEFTSF9BTEcuU0hBMSxcbiAgICAgICAgc2VyaWFsOiBjZXJ0LnNlcmlhbFxuICAgICAgfTtcbiAgICAgIHRoaXMuc2lnbkhhc2goZmFrZURhdGEpLnN1YnNjcmliZSgocmVzcG9uc2U6IFJlcGx5RGF0YSkgPT4ge1xuICAgICAgICBpZiAocmVzcG9uc2UgJiYgcmVzcG9uc2UuZGF0YSAmJiByZXNwb25zZS5kYXRhLnNpZ25hdHVyZSkge1xuICAgICAgICAgIHN1YnNjcmliZXIubmV4dCh0cnVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdWJzY3JpYmVyLm5leHQoZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGxvYWRDZXJ0cygpOiBPYnNlcnZhYmxlPENlcnREYXRhW10+IHtcbiAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUoKHN1YnNjcmliZXIpID0+IHtcbiAgICAgIHRoaXMuX3NpZ25lci5sb2FkQ2VydHMoKS50aGVuKChkYXRhKSA9PiBzdWJzY3JpYmVyLm5leHQoZGF0YSkpO1xuICAgIH0pO1xuICB9XG5cbiAgc2lnbkhhc2goZGF0YTogTWVzc2FnZVNpZ25IYXNoKTogT2JzZXJ2YWJsZTxSZXBseURhdGE+IHtcbiAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUoKHN1YnNjcmliZXI6IFN1YnNjcmliZXI8UmVwbHlEYXRhPikgPT4ge1xuICAgICAgdGhpcy5fc2lnbmVyLnNpZ25IYXNoKGRhdGEpLnRoZW4oKHJlc3BvbnNlKSA9PiBzdWJzY3JpYmVyLm5leHQocmVzcG9uc2UpKTtcbiAgICB9KTtcbiAgfVxufVxuIl19