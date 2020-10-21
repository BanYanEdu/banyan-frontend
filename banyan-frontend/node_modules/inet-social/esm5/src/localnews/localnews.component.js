/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
var LocalNews = /** @class */ (function () {
    function LocalNews() {
    }
    LocalNews.decorators = [
        { type: Component, args: [{
                    selector: '[localNews]',
                    template: "<div *ngIf=\"data\" class=\"local-news\">\n    <h3 class=\"local-news__title\">\n        {{data.title}}\n    </h3>\n    <div class=\"local-news__image\">\n        <img [src]=\"data.image\">\n    </div>\n    <h4 class=\"local-news__description\">\n        {{data.description}}\n    </h4>\n    <a [href]=\"data.url\" target=\"_blank\" class=\"local-news__url\"></a>\n</div>",
                    styles: [".local-news{margin:10px 0;padding:10px 0;position:relative;overflow:hidden;border-top:1px solid rgba(0,0,0,.1);border-bottom:1px solid rgba(0,0,0,.1)}.local-news__title{font:700 14px arial;color:#333;margin-bottom:5px}.local-news__description{color:#333;font:400 13px/16px arial;margin-bottom:5px;overflow:hidden}.local-news__image{position:relative;margin-right:10px;float:left;width:140px}.local-news__image img{width:100%;min-height:70px;border:1px solid rgba(0,0,0,.01)}.local-news__url{position:absolute;top:0;right:0;bottom:0;left:0;z-index:100}"]
                }] }
    ];
    LocalNews.propDecorators = {
        data: [{ type: Input }]
    };
    return LocalNews;
}());
export { LocalNews };
if (false) {
    /** @type {?} */
    LocalNews.prototype.data;
}
/**
 * @record
 */
export function LocalNewsData() { }
if (false) {
    /** @type {?} */
    LocalNewsData.prototype.image;
    /** @type {?} */
    LocalNewsData.prototype.title;
    /** @type {?} */
    LocalNewsData.prototype.description;
    /** @type {?|undefined} */
    LocalNewsData.prototype.url;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWxuZXdzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtc29jaWFsLyIsInNvdXJjZXMiOlsic3JjL2xvY2FsbmV3cy9sb2NhbG5ld3MuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUUvQztJQUFBO0lBT0EsQ0FBQzs7Z0JBUEEsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxhQUFhO29CQUN2QiwrWEFBeUM7O2lCQUUxQzs7O3VCQUVFLEtBQUs7O0lBQ1IsZ0JBQUM7Q0FBQSxBQVBELElBT0M7U0FGWSxTQUFTOzs7SUFDcEIseUJBQTZCOzs7OztBQUcvQixtQ0FLQzs7O0lBSkMsOEJBQWE7O0lBQ2IsOEJBQWE7O0lBQ2Isb0NBQW1COztJQUNuQiw0QkFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ1tsb2NhbE5ld3NdJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2xvY2FsbmV3cy5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2xvY2FsbmV3cy5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgTG9jYWxOZXdzIHtcbiAgQElucHV0KCkgZGF0YTogTG9jYWxOZXdzRGF0YTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBMb2NhbE5ld3NEYXRhIHtcbiAgaW1hZ2U6IHN0cmluZ1xuICB0aXRsZTogc3RyaW5nXG4gIGRlc2NyaXB0aW9uOiBzdHJpbmdcbiAgdXJsPzogc3RyaW5nXG59Il19