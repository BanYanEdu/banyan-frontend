/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
var OpenGraphService = /** @class */ (function () {
    function OpenGraphService() {
        this.regex = /(https?:\/\/[^\s]+)/;
    }
    /**
     * @param {?} link
     * @param {?} callback
     * @return {?}
     */
    OpenGraphService.prototype.loadPreviewLink = /**
     * @param {?} link
     * @param {?} callback
     * @return {?}
     */
    function (link, callback) {
        var _this = this;
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
            function (data) {
                callback(_this.convertOpenData(data, link));
            }),
            error: (/**
             * @param {?} xhr
             * @return {?}
             */
            function (xhr) {
                callback(null, xhr);
            })
        });
    };
    /**
     * @param {?} link
     * @return {?}
     */
    OpenGraphService.prototype.isLink = /**
     * @param {?} link
     * @return {?}
     */
    function (link) {
        return this.regex.test(link);
    };
    /**
     * @param {?} src
     * @param {?} callback
     * @return {?}
     */
    OpenGraphService.prototype.loadImageInfo = /**
     * @param {?} src
     * @param {?} callback
     * @return {?}
     */
    function (src, callback) {
        /** @type {?} */
        var img = new Image();
        img.onload = img.onerror = (/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            /** @type {?} */
            var imageInfo = {
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
    };
    /**
     * @private
     * @param {?} properties
     * @param {?} url
     * @return {?}
     */
    OpenGraphService.prototype.convertOpenData = /**
     * @private
     * @param {?} properties
     * @param {?} url
     * @return {?}
     */
    function (properties, url) {
        if (properties.length < 1) {
            return;
        }
        /** @type {?} */
        var openData = (/** @type {?} */ ({}));
        properties.forEach((/**
         * @param {?} item
         * @return {?}
         */
        function (item) {
            openData[item.property] = item.content;
        }));
        if (!openData.url) {
            openData.url = url;
        }
        return openData;
    };
    OpenGraphService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    OpenGraphService.ctorParameters = function () { return []; };
    return OpenGraphService;
}());
export { OpenGraphService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    OpenGraphService.prototype.regex;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3Blbi1ncmFwaC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC1jaGF0LyIsInNvdXJjZXMiOlsic3JjL29wZW4tZ3JhcGgvb3Blbi1ncmFwaC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBSzNDO0lBS0U7UUFGUSxVQUFLLEdBQUcscUJBQXFCLENBQUM7SUFFdEIsQ0FBQzs7Ozs7O0lBRWpCLDBDQUFlOzs7OztJQUFmLFVBQWdCLElBQVksRUFBRSxRQUFrQjtRQUFoRCxpQkEyQkM7UUExQkMsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNULFFBQVEsQ0FBQyxJQUFJLEVBQUU7Z0JBQ2IsS0FBSyxFQUFFLGVBQWU7YUFDdkIsQ0FBQyxDQUFDO1lBQ0gsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDdEIsUUFBUSxDQUFDLElBQUksRUFBRTtnQkFDYixLQUFLLEVBQUUsY0FBYzthQUN0QixDQUFDLENBQUM7WUFDSCxPQUFPO1NBQ1I7UUFFRCxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ0wsSUFBSSxFQUFFLE1BQU07WUFDWixHQUFHLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQztZQUNuQyxJQUFJLEVBQUU7Z0JBQ0wsR0FBRyxFQUFFLElBQUk7YUFDVDtZQUNELE9BQU87Ozs7WUFBRSxVQUFDLElBQUk7Z0JBQ1gsUUFBUSxDQUFDLEtBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDOUMsQ0FBQyxDQUFBO1lBQ0QsS0FBSzs7OztZQUFFLFVBQVUsR0FBRztnQkFDbEIsUUFBUSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztZQUN0QixDQUFDLENBQUE7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDOzs7OztJQUVELGlDQUFNOzs7O0lBQU4sVUFBTyxJQUFZO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDL0IsQ0FBQzs7Ozs7O0lBRUQsd0NBQWE7Ozs7O0lBQWIsVUFBYyxHQUFXLEVBQUUsUUFBa0I7O1lBQ3ZDLEdBQUcsR0FBRyxJQUFJLEtBQUssRUFBRTtRQUNyQixHQUFHLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxPQUFPOzs7O1FBQUcsVUFBVSxDQUFDOztnQkFDaEMsU0FBUyxHQUF1QjtnQkFDbEMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxLQUFLO2dCQUNoQixNQUFNLEVBQUUsR0FBRyxDQUFDLE1BQU07YUFDbkI7WUFDRCxJQUFJLFNBQVMsQ0FBQyxLQUFLLElBQUksU0FBUyxDQUFDLE1BQU0sRUFBRTtnQkFDdkMsU0FBUyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7Z0JBQzNCLFNBQVMsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQzthQUNoRTtZQUNELFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN0QixDQUFDLENBQUEsQ0FBQztRQUNGLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0lBQ2hCLENBQUM7Ozs7Ozs7SUFFTywwQ0FBZTs7Ozs7O0lBQXZCLFVBQXdCLFVBQWlCLEVBQUUsR0FBVztRQUNwRCxJQUFJLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ3pCLE9BQU87U0FDUjs7WUFDRyxRQUFRLEdBQUcsbUJBQWUsRUFBRSxFQUFBO1FBRWhDLFVBQVUsQ0FBQyxPQUFPOzs7O1FBQUMsVUFBQyxJQUFJO1lBQ3RCLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUN6QyxDQUFDLEVBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFO1lBQ2pCLFFBQVEsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1NBQ3BCO1FBRUQsT0FBTyxRQUFRLENBQUM7SUFDbEIsQ0FBQzs7Z0JBdkVGLFVBQVU7Ozs7SUF3RVgsdUJBQUM7Q0FBQSxBQXhFRCxJQXdFQztTQXZFWSxnQkFBZ0I7Ozs7OztJQUUzQixpQ0FBc0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge09wZW5HcmFwaERhdGEsIE9wZW5HcmFwaEltYWdlSW5mb30gZnJvbSBcIi4vbW9kZWwvT3BlbkdyYXBoRGF0YVwiO1xuZGVjbGFyZSBsZXQgaU5ldDogYW55O1xuZGVjbGFyZSBsZXQgJDogYW55O1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgT3BlbkdyYXBoU2VydmljZSB7XG5cbiAgcHJpdmF0ZSByZWdleCA9IC8oaHR0cHM/OlxcL1xcL1teXFxzXSspLztcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIGxvYWRQcmV2aWV3TGluayhsaW5rOiBzdHJpbmcsIGNhbGxiYWNrOiBGdW5jdGlvbikge1xuICAgIGlmICghbGluaykge1xuICAgICAgY2FsbGJhY2sobnVsbCwge1xuICAgICAgICBlcnJvcjogJ0xpbmsgaXMgZW1wdHknXG4gICAgICB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCF0aGlzLmlzTGluayhsaW5rKSkge1xuICAgICAgY2FsbGJhY2sobnVsbCwge1xuICAgICAgICBlcnJvcjogJ0xpbmsgaW52YWxpZCdcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgICQuYWpheCh7XG4gICAgICB0eXBlOiAncG9zdCcsXG4gICAgICB1cmw6IGlOZXQuZ2V0VXJsKCdvcGVuZ3JhcGgvZmV0Y2gnKSxcbiAgICAgIGRhdGE6IHtcbiAgICAgICB1cmw6IGxpbmtcbiAgICAgIH0sXG4gICAgICBzdWNjZXNzOiAoZGF0YSkgPT4ge1xuICAgICAgICAgY2FsbGJhY2sodGhpcy5jb252ZXJ0T3BlbkRhdGEoZGF0YSwgbGluaykpO1xuICAgICAgfSxcbiAgICAgIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XG4gICAgICAgIGNhbGxiYWNrKG51bGwsIHhocik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBpc0xpbmsobGluazogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMucmVnZXgudGVzdChsaW5rKTtcbiAgfVxuXG4gIGxvYWRJbWFnZUluZm8oc3JjOiBzdHJpbmcsIGNhbGxiYWNrOiBGdW5jdGlvbikge1xuICAgIGxldCBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICBpbWcub25sb2FkID0gaW1nLm9uZXJyb3IgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgbGV0IGltYWdlSW5mbzogT3BlbkdyYXBoSW1hZ2VJbmZvID0ge1xuICAgICAgICB3aWR0aDogaW1nLndpZHRoLFxuICAgICAgICBoZWlnaHQ6IGltZy5oZWlnaHRcbiAgICAgIH07XG4gICAgICBpZiAoaW1hZ2VJbmZvLndpZHRoICYmIGltYWdlSW5mby5oZWlnaHQpIHtcbiAgICAgICAgaW1hZ2VJbmZvLmF2YWlsYWJsZSA9IHRydWU7XG4gICAgICAgIGltYWdlSW5mby5sYW5kc2NhcGUgPSBpbWFnZUluZm8ud2lkdGggLyBpbWFnZUluZm8uaGVpZ2h0ID4gMS4xO1xuICAgICAgfVxuICAgICAgY2FsbGJhY2soaW1hZ2VJbmZvKTtcbiAgICB9O1xuICAgIGltZy5zcmMgPSBzcmM7XG4gIH1cblxuICBwcml2YXRlIGNvbnZlcnRPcGVuRGF0YShwcm9wZXJ0aWVzOiBhbnlbXSwgdXJsOiBzdHJpbmcpOiBPcGVuR3JhcGhEYXRhIHtcbiAgICBpZiAocHJvcGVydGllcy5sZW5ndGggPCAxKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGxldCBvcGVuRGF0YSA9IDxPcGVuR3JhcGhEYXRhPnt9O1xuXG4gICAgcHJvcGVydGllcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICBvcGVuRGF0YVtpdGVtLnByb3BlcnR5XSA9IGl0ZW0uY29udGVudDtcbiAgICB9KTtcblxuICAgIGlmICghb3BlbkRhdGEudXJsKSB7XG4gICAgICBvcGVuRGF0YS51cmwgPSB1cmw7XG4gICAgfVxuXG4gICAgcmV0dXJuIG9wZW5EYXRhO1xuICB9XG59XG4iXX0=