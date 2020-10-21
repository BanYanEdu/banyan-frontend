/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
export class OpenGraphService {
    constructor() {
        this.regex = /(https?:\/\/[^\s]+)/;
    }
    /**
     * @param {?} link
     * @param {?} callback
     * @return {?}
     */
    loadPreviewLink(link, callback) {
        if (!link) {
            callback(null, {
                error: 'Link is empty'
            });
            return;
        }
        if (!this.isLink(link)) {
            callback(null, {
                error: 'Link invalid'
            });
            return;
        }
        $.ajax({
            type: 'post',
            url: iNet.getUrl('opengraph/fetch'),
            data: {
                url: link
            },
            success: (/**
             * @param {?} data
             * @return {?}
             */
            (data) => {
                callback(this.convertOpenData(data, link));
            }),
            error: (/**
             * @param {?} xhr
             * @return {?}
             */
            function (xhr) {
                callback(null, xhr);
            })
        });
    }
    /**
     * @param {?} link
     * @return {?}
     */
    isLink(link) {
        return this.regex.test(link);
    }
    /**
     * @param {?} src
     * @param {?} callback
     * @return {?}
     */
    loadImageInfo(src, callback) {
        /** @type {?} */
        let img = new Image();
        img.onload = img.onerror = (/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            /** @type {?} */
            let imageInfo = {
                width: img.width,
                height: img.height
            };
            if (imageInfo.width && imageInfo.height) {
                imageInfo.available = true;
                imageInfo.landscape = imageInfo.width / imageInfo.height > 1.1;
            }
            callback(imageInfo);
        });
        img.src = src;
    }
    /**
     * @private
     * @param {?} properties
     * @param {?} url
     * @return {?}
     */
    convertOpenData(properties, url) {
        if (properties.length < 1) {
            return;
        }
        /** @type {?} */
        let openData = (/** @type {?} */ ({}));
        properties.forEach((/**
         * @param {?} item
         * @return {?}
         */
        (item) => {
            openData[item.property] = item.content;
        }));
        if (!openData.url) {
            openData.url = url;
        }
        return openData;
    }
}
OpenGraphService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
OpenGraphService.ctorParameters = () => [];
if (false) {
    /**
     * @type {?}
     * @private
     */
    OpenGraphService.prototype.regex;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3Blbi1ncmFwaC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC1jaGF0LyIsInNvdXJjZXMiOlsic3JjL29wZW4tZ3JhcGgvb3Blbi1ncmFwaC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBTTNDLE1BQU0sT0FBTyxnQkFBZ0I7SUFJM0I7UUFGUSxVQUFLLEdBQUcscUJBQXFCLENBQUM7SUFFdEIsQ0FBQzs7Ozs7O0lBRWpCLGVBQWUsQ0FBQyxJQUFZLEVBQUUsUUFBa0I7UUFDOUMsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNULFFBQVEsQ0FBQyxJQUFJLEVBQUU7Z0JBQ2IsS0FBSyxFQUFFLGVBQWU7YUFDdkIsQ0FBQyxDQUFDO1lBQ0gsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDdEIsUUFBUSxDQUFDLElBQUksRUFBRTtnQkFDYixLQUFLLEVBQUUsY0FBYzthQUN0QixDQUFDLENBQUM7WUFDSCxPQUFPO1NBQ1I7UUFFRCxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ0wsSUFBSSxFQUFFLE1BQU07WUFDWixHQUFHLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQztZQUNuQyxJQUFJLEVBQUU7Z0JBQ0wsR0FBRyxFQUFFLElBQUk7YUFDVDtZQUNELE9BQU87Ozs7WUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUNmLFFBQVEsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzlDLENBQUMsQ0FBQTtZQUNELEtBQUs7Ozs7WUFBRSxVQUFVLEdBQUc7Z0JBQ2xCLFFBQVEsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDdEIsQ0FBQyxDQUFBO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7SUFFRCxNQUFNLENBQUMsSUFBWTtRQUNqQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9CLENBQUM7Ozs7OztJQUVELGFBQWEsQ0FBQyxHQUFXLEVBQUUsUUFBa0I7O1lBQ3ZDLEdBQUcsR0FBRyxJQUFJLEtBQUssRUFBRTtRQUNyQixHQUFHLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxPQUFPOzs7O1FBQUcsVUFBVSxDQUFDOztnQkFDaEMsU0FBUyxHQUF1QjtnQkFDbEMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxLQUFLO2dCQUNoQixNQUFNLEVBQUUsR0FBRyxDQUFDLE1BQU07YUFDbkI7WUFDRCxJQUFJLFNBQVMsQ0FBQyxLQUFLLElBQUksU0FBUyxDQUFDLE1BQU0sRUFBRTtnQkFDdkMsU0FBUyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7Z0JBQzNCLFNBQVMsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQzthQUNoRTtZQUNELFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN0QixDQUFDLENBQUEsQ0FBQztRQUNGLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0lBQ2hCLENBQUM7Ozs7Ozs7SUFFTyxlQUFlLENBQUMsVUFBaUIsRUFBRSxHQUFXO1FBQ3BELElBQUksVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDekIsT0FBTztTQUNSOztZQUNHLFFBQVEsR0FBRyxtQkFBZSxFQUFFLEVBQUE7UUFFaEMsVUFBVSxDQUFDLE9BQU87Ozs7UUFBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQzFCLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUN6QyxDQUFDLEVBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFO1lBQ2pCLFFBQVEsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1NBQ3BCO1FBRUQsT0FBTyxRQUFRLENBQUM7SUFDbEIsQ0FBQzs7O1lBdkVGLFVBQVU7Ozs7Ozs7OztJQUdULGlDQUFzQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7T3BlbkdyYXBoRGF0YSwgT3BlbkdyYXBoSW1hZ2VJbmZvfSBmcm9tIFwiLi9tb2RlbC9PcGVuR3JhcGhEYXRhXCI7XG5kZWNsYXJlIGxldCBpTmV0OiBhbnk7XG5kZWNsYXJlIGxldCAkOiBhbnk7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBPcGVuR3JhcGhTZXJ2aWNlIHtcblxuICBwcml2YXRlIHJlZ2V4ID0gLyhodHRwcz86XFwvXFwvW15cXHNdKykvO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbG9hZFByZXZpZXdMaW5rKGxpbms6IHN0cmluZywgY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XG4gICAgaWYgKCFsaW5rKSB7XG4gICAgICBjYWxsYmFjayhudWxsLCB7XG4gICAgICAgIGVycm9yOiAnTGluayBpcyBlbXB0eSdcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIXRoaXMuaXNMaW5rKGxpbmspKSB7XG4gICAgICBjYWxsYmFjayhudWxsLCB7XG4gICAgICAgIGVycm9yOiAnTGluayBpbnZhbGlkJ1xuICAgICAgfSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgJC5hamF4KHtcbiAgICAgIHR5cGU6ICdwb3N0JyxcbiAgICAgIHVybDogaU5ldC5nZXRVcmwoJ29wZW5ncmFwaC9mZXRjaCcpLFxuICAgICAgZGF0YToge1xuICAgICAgIHVybDogbGlua1xuICAgICAgfSxcbiAgICAgIHN1Y2Nlc3M6IChkYXRhKSA9PiB7XG4gICAgICAgICBjYWxsYmFjayh0aGlzLmNvbnZlcnRPcGVuRGF0YShkYXRhLCBsaW5rKSk7XG4gICAgICB9LFxuICAgICAgZXJyb3I6IGZ1bmN0aW9uICh4aHIpIHtcbiAgICAgICAgY2FsbGJhY2sobnVsbCwgeGhyKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGlzTGluayhsaW5rOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5yZWdleC50ZXN0KGxpbmspO1xuICB9XG5cbiAgbG9hZEltYWdlSW5mbyhzcmM6IHN0cmluZywgY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XG4gICAgbGV0IGltZyA9IG5ldyBJbWFnZSgpO1xuICAgIGltZy5vbmxvYWQgPSBpbWcub25lcnJvciA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICBsZXQgaW1hZ2VJbmZvOiBPcGVuR3JhcGhJbWFnZUluZm8gPSB7XG4gICAgICAgIHdpZHRoOiBpbWcud2lkdGgsXG4gICAgICAgIGhlaWdodDogaW1nLmhlaWdodFxuICAgICAgfTtcbiAgICAgIGlmIChpbWFnZUluZm8ud2lkdGggJiYgaW1hZ2VJbmZvLmhlaWdodCkge1xuICAgICAgICBpbWFnZUluZm8uYXZhaWxhYmxlID0gdHJ1ZTtcbiAgICAgICAgaW1hZ2VJbmZvLmxhbmRzY2FwZSA9IGltYWdlSW5mby53aWR0aCAvIGltYWdlSW5mby5oZWlnaHQgPiAxLjE7XG4gICAgICB9XG4gICAgICBjYWxsYmFjayhpbWFnZUluZm8pO1xuICAgIH07XG4gICAgaW1nLnNyYyA9IHNyYztcbiAgfVxuXG4gIHByaXZhdGUgY29udmVydE9wZW5EYXRhKHByb3BlcnRpZXM6IGFueVtdLCB1cmw6IHN0cmluZyk6IE9wZW5HcmFwaERhdGEge1xuICAgIGlmIChwcm9wZXJ0aWVzLmxlbmd0aCA8IDEpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbGV0IG9wZW5EYXRhID0gPE9wZW5HcmFwaERhdGE+e307XG5cbiAgICBwcm9wZXJ0aWVzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIG9wZW5EYXRhW2l0ZW0ucHJvcGVydHldID0gaXRlbS5jb250ZW50O1xuICAgIH0pO1xuXG4gICAgaWYgKCFvcGVuRGF0YS51cmwpIHtcbiAgICAgIG9wZW5EYXRhLnVybCA9IHVybDtcbiAgICB9XG5cbiAgICByZXR1cm4gb3BlbkRhdGE7XG4gIH1cbn1cbiJdfQ==