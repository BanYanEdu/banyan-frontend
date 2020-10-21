/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { HttpClientService } from "./http-client.service";
export class SecurityService {
    /**
     * @param {?} http
     */
    constructor(http) {
        this.http = http;
        this.roles = [];
        if (!SecurityService.instance) {
            this.roles = this.parserRoleFrom(iNet.permission || {});
        }
        return SecurityService.instance = SecurityService.instance || this;
    }
    /**
     * @return {?}
     */
    load() {
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        resolve => {
            if (!window['iNet'] || iNet.isEmpty(iNet.prefix) || !iNet.enableLayout) {
                resolve();
            }
            else {
                this.http.postJSON(iNet.getPUrl('system/userrole/list'))
                    .subscribe((/**
                 * @param {?} obj
                 * @return {?}
                 */
                (obj) => {
                    for (let key in obj) {
                        this.append(obj[key]);
                    }
                    resolve(obj);
                }), (/**
                 * @param {?} err
                 * @return {?}
                 */
                (err) => {
                    resolve();
                }));
            }
        }));
    }
    /**
     * @private
     * @param {?} obj
     * @return {?}
     */
    parserRoleFrom(obj) {
        /** @type {?} */
        let roles = [];
        for (let key in obj) {
            if (obj[key] === "true" || obj[key] === true) {
                roles.push(key);
            }
        }
        return roles;
    }
    /**
     * @private
     * @param {?} arrArg
     * @return {?}
     */
    uniqueArray(arrArg) {
        return arrArg.filter((/**
         * @param {?} elem
         * @param {?} pos
         * @param {?} arr
         * @return {?}
         */
        function (elem, pos, arr) {
            return arr.indexOf(elem) == pos;
        }));
    }
    ;
    /**
     * @private
     * @param {?} v
     * @return {?}
     */
    append(v) {
        //console.log('[append]roles', v);
        this.roles = this.uniqueArray(this.roles.concat(v));
        return this.roles;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    hasRole(v) {
        //console.log('[checkRole]=', v);
        /** @type {?} */
        let roles = v.split(',');
        if (roles.length > 1) {
            /** @type {?} */
            let __items = roles.filter((/**
             * @param {?} role
             * @return {?}
             */
            role => this.roles.indexOf(role) > -1));
            return (__items.length > 0);
        }
        return (this.roles.indexOf(v) > -1);
    }
    /**
     * Check session timeout when system is idle
     * @return {?}
     */
    ping() {
        if (iNet.isEmpty(iNet.username) || !iNet.enableLayout) {
            return;
        }
        /** @type {?} */
        let iframe = document.createElement('iframe');
        iframe.style.display = "none";
        iframe.setAttribute("src", iNet.getPUrl('common/page/ping'));
        iframe.onload = (/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            const __loginUrl = 'cas/login';
            try {
                /** @type {?} */
                let __path = iframe.contentWindow.location.pathname || '';
                /** @type {?} */
                let __isLogin = (__loginUrl.match(__path) || []).length > 0;
                if (__isLogin) {
                    window.location.reload();
                }
            }
            catch (ex) {
                window.location.reload();
            }
            document.body.removeChild(iframe);
        });
        document.body.appendChild(iframe);
    }
}
SecurityService.instance = null;
SecurityService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
SecurityService.ctorParameters = () => [
    { type: HttpClientService }
];
if (false) {
    /** @type {?} */
    SecurityService.instance;
    /**
     * @type {?}
     * @private
     */
    SecurityService.prototype.roles;
    /**
     * @type {?}
     * @private
     */
    SecurityService.prototype.http;
    /* Skipping unhandled member: ;*/
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VjdXJpdHkuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtY29yZS8iLCJzb3VyY2VzIjpbInNyYy9zZWN1cml0eS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBTXhELE1BQU0sT0FBTyxlQUFlOzs7O0lBSXhCLFlBQW9CLElBQXVCO1FBQXZCLFNBQUksR0FBSixJQUFJLENBQW1CO1FBRm5DLFVBQUssR0FBa0IsRUFBRSxDQUFDO1FBRzlCLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxFQUFFO1lBQzNCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1NBQzNEO1FBQ0QsT0FBTyxlQUFlLENBQUMsUUFBUSxHQUFHLGVBQWUsQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDO0lBQ3ZFLENBQUM7Ozs7SUFFTSxJQUFJO1FBQ1AsT0FBTyxJQUFJLE9BQU87Ozs7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUN6QixJQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtnQkFDbkUsT0FBTyxFQUFFLENBQUM7YUFDYjtpQkFBTTtnQkFDSCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQUM7cUJBQ25ELFNBQVM7Ozs7Z0JBQUMsQ0FBQyxHQUFRLEVBQUUsRUFBRTtvQkFDcEIsS0FBSyxJQUFJLEdBQUcsSUFBSSxHQUFHLEVBQUU7d0JBQ2pCLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFD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YUFDNUI7WUFDRCxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN0QyxDQUFDLENBQUEsQ0FBQztRQUNGLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3RDLENBQUM7O0FBcEZNLHdCQUFRLEdBQW9CLElBQUksQ0FBQzs7WUFGM0MsVUFBVTs7OztZQUxILGlCQUFpQjs7OztJQU9yQix5QkFBd0M7Ozs7O0lBQ3hDLGdDQUFrQzs7Ozs7SUFFdEIsK0JBQStCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7SHR0cENsaWVudFNlcnZpY2V9IGZyb20gXCIuL2h0dHAtY2xpZW50LnNlcnZpY2VcIjtcbmltcG9ydCB7SHR0cEVycm9yUmVzcG9uc2V9IGZyb20gXCJAYW5ndWxhci9jb21tb24vaHR0cFwiO1xuXG5kZWNsYXJlIGxldCBpTmV0OiBhbnk7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTZWN1cml0eVNlcnZpY2Uge1xuICAgIHN0YXRpYyBpbnN0YW5jZTogU2VjdXJpdHlTZXJ2aWNlID0gbnVsbDtcbiAgICBwcml2YXRlIHJvbGVzOiBBcnJheTxzdHJpbmc+ID0gW107XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnRTZXJ2aWNlKSB7XG4gICAgICAgIGlmICghU2VjdXJpdHlTZXJ2aWNlLmluc3RhbmNlKSB7XG4gICAgICAgICAgICB0aGlzLnJvbGVzID0gdGhpcy5wYXJzZXJSb2xlRnJvbShpTmV0LnBlcm1pc3Npb24gfHwge30pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBTZWN1cml0eVNlcnZpY2UuaW5zdGFuY2UgPSBTZWN1cml0eVNlcnZpY2UuaW5zdGFuY2UgfHwgdGhpcztcbiAgICB9XG5cbiAgICBwdWJsaWMgbG9hZCgpOiBQcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgICAgICBpZighd2luZG93WydpTmV0J10gfHwgaU5ldC5pc0VtcHR5KGlOZXQucHJlZml4KSB8fCAhaU5ldC5lbmFibGVMYXlvdXQpIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuaHR0cC5wb3N0SlNPTihpTmV0LmdldFBVcmwoJ3N5c3RlbS91c2Vycm9sZS9saXN0JykpXG4gICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKG9iajogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBrZXkgaW4gb2JqKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hcHBlbmQob2JqW2tleV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShvYmopO1xuICAgICAgICAgICAgICAgICAgICB9LCAoZXJyOiBIdHRwRXJyb3JSZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwYXJzZXJSb2xlRnJvbShvYmo6IE9iamVjdCk6IEFycmF5PHN0cmluZz4ge1xuICAgICAgICBsZXQgcm9sZXM6IEFycmF5PHN0cmluZz4gPSBbXTtcbiAgICAgICAgZm9yIChsZXQga2V5IGluIG9iaikge1xuICAgICAgICAgICAgaWYgKG9ialtrZXldID09PSBcInRydWVcIiB8fCBvYmpba2V5XSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHJvbGVzLnB1c2goa2V5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcm9sZXM7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1bmlxdWVBcnJheShhcnJBcmcpIHtcbiAgICAgICAgcmV0dXJuIGFyckFyZy5maWx0ZXIoZnVuY3Rpb24oZWxlbSwgcG9zLGFycikge1xuICAgICAgICAgICAgcmV0dXJuIGFyci5pbmRleE9mKGVsZW0pID09IHBvcztcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHByaXZhdGUgYXBwZW5kKHY6IEFycmF5PHN0cmluZz4pOiBBcnJheTxzdHJpbmc+IHtcbiAgICAgICAgLy9jb25zb2xlLmxvZygnW2FwcGVuZF1yb2xlcycsIHYpO1xuICAgICAgICB0aGlzLnJvbGVzID0gdGhpcy51bmlxdWVBcnJheSh0aGlzLnJvbGVzLmNvbmNhdCh2KSk7XG4gICAgICAgIHJldHVybiB0aGlzLnJvbGVzO1xuICAgIH1cblxuICAgIGhhc1JvbGUodjogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIC8vY29uc29sZS5sb2coJ1tjaGVja1JvbGVdPScsIHYpO1xuICAgICAgICBsZXQgcm9sZXMgPSB2LnNwbGl0KCcsJyk7XG4gICAgICAgIGlmIChyb2xlcy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICBsZXQgX19pdGVtcyA9IHJvbGVzLmZpbHRlcihyb2xlID0+IHRoaXMucm9sZXMuaW5kZXhPZihyb2xlKSA+IC0xKTtcbiAgICAgICAgICAgIHJldHVybiAoX19pdGVtcy5sZW5ndGggPiAwKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKHRoaXMucm9sZXMuaW5kZXhPZih2KSA+IC0xKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVjayBzZXNzaW9uIHRpbWVvdXQgd2hlbiBzeXN0ZW0gaXMgaWRsZVxuICAgICAqL1xuICAgIHBpbmcoKSB7XG4gICAgICAgIGlmKGlOZXQuaXNFbXB0eShpTmV0LnVzZXJuYW1lKSB8fCAhaU5ldC5lbmFibGVMYXlvdXQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgaWZyYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaWZyYW1lJyk7XG4gICAgICAgIGlmcmFtZS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIGlmcmFtZS5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgaU5ldC5nZXRQVXJsKCdjb21tb24vcGFnZS9waW5nJykpO1xuICAgICAgICBpZnJhbWUub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY29uc3QgX19sb2dpblVybCA9ICdjYXMvbG9naW4nO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBsZXQgX19wYXRoID0gaWZyYW1lLmNvbnRlbnRXaW5kb3cubG9jYXRpb24ucGF0aG5hbWUgfHwgJyc7XG4gICAgICAgICAgICAgICAgbGV0IF9faXNMb2dpbiA9IChfX2xvZ2luVXJsLm1hdGNoKF9fcGF0aCkgfHwgW10pLmxlbmd0aCA+IDA7XG4gICAgICAgICAgICAgICAgaWYgKF9faXNMb2dpbikge1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGlmcmFtZSk7XG4gICAgICAgIH07XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoaWZyYW1lKTtcbiAgICB9XG5cbn1cbiJdfQ==