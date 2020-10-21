/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
export class LocalNews {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWxuZXdzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtc29jaWFsLyIsInNvdXJjZXMiOlsic3JjL2xvY2FsbmV3cy9sb2NhbG5ld3MuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBQyxNQUFNLGVBQWUsQ0FBQztBQU8vQyxNQUFNLE9BQU8sU0FBUzs7O1lBTHJCLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsYUFBYTtnQkFDdkIsK1hBQXlDOzthQUUxQzs7O21CQUVFLEtBQUs7Ozs7SUFBTix5QkFBNkI7Ozs7O0FBRy9CLG1DQUtDOzs7SUFKQyw4QkFBYTs7SUFDYiw4QkFBYTs7SUFDYixvQ0FBbUI7O0lBQ25CLDRCQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnW2xvY2FsTmV3c10nLFxuICB0ZW1wbGF0ZVVybDogJy4vbG9jYWxuZXdzLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbG9jYWxuZXdzLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBMb2NhbE5ld3Mge1xuICBASW5wdXQoKSBkYXRhOiBMb2NhbE5ld3NEYXRhO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIExvY2FsTmV3c0RhdGEge1xuICBpbWFnZTogc3RyaW5nXG4gIHRpdGxlOiBzdHJpbmdcbiAgZGVzY3JpcHRpb246IHN0cmluZ1xuICB1cmw/OiBzdHJpbmdcbn0iXX0=