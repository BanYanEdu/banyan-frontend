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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3Blbi1ncmFwaC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC11aS8iLCJzb3VyY2VzIjpbInNyYy9vcGVuLWdyYXBoL29wZW4tZ3JhcGguc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUszQztJQUtFO1FBRlEsVUFBSyxHQUFHLHFCQUFxQixDQUFDO0lBRXRCLENBQUM7Ozs7OztJQUVqQiwwQ0FBZTs7Ozs7SUFBZixVQUFnQixJQUFZLEVBQUUsUUFBa0I7UUFBaEQsaUJBMkJDO1FBMUJDLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDVCxRQUFRLENBQUMsSUFBSSxFQUFFO2dCQUNiLEtBQUssRUFBRSxlQUFlO2FBQ3ZCLENBQUMsQ0FBQztZQUNILE9BQU87U0FDUjtRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3RCLFFBQVEsQ0FBQyxJQUFJLEVBQUU7Z0JBQ2IsS0FBSyxFQUFFLGNBQWM7YUFDdEIsQ0FBQyxDQUFDO1lBQ0gsT0FBTztTQUNSO1FBRUQsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNMLElBQUksRUFBRSxNQUFNO1lBQ1osR0FBRyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUM7WUFDbkMsSUFBSSxFQUFFO2dCQUNMLEdBQUcsRUFBRSxJQUFJO2FBQ1Q7WUFDRCxPQUFPOzs7O1lBQUUsVUFBQyxJQUFJO2dCQUNYLFFBQVEsQ0FBQyxLQUFJLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzlDLENBQUMsQ0FBQTtZQUNELEtBQUs7Ozs7WUFBRSxVQUFVLEdBQUc7Z0JBQ2xCLFFBQVEsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDdEIsQ0FBQyxDQUFBO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7SUFFRCxpQ0FBTTs7OztJQUFOLFVBQU8sSUFBWTtRQUNqQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9CLENBQUM7Ozs7OztJQUVELHdDQUFhOzs7OztJQUFiLFVBQWMsR0FBVyxFQUFFLFFBQWtCOztZQUN2QyxHQUFHLEdBQUcsSUFBSSxLQUFLLEVBQUU7UUFDckIsR0FBRyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsT0FBTzs7OztRQUFHLFVBQVUsQ0FBQzs7Z0JBQ2hDLFNBQVMsR0FBdUI7Z0JBQ2xDLEtBQUssRUFBRSxHQUFHLENBQUMsS0FBSztnQkFDaEIsTUFBTSxFQUFFLEdBQUcsQ0FBQyxNQUFNO2FBQ25CO1lBQ0QsSUFBSSxTQUFTLENBQUMsS0FBSyxJQUFJLFNBQVMsQ0FBQyxNQUFNLEVBQUU7Z0JBQ3ZDLFNBQVMsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO2dCQUMzQixTQUFTLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7YUFDaEU7WUFDRCxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdEIsQ0FBQyxDQUFBLENBQUM7UUFDRixHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztJQUNoQixDQUFDOzs7Ozs7O0lBRU8sMENBQWU7Ozs7OztJQUF2QixVQUF3QixVQUFpQixFQUFFLEdBQVc7UUFDcEQsSUFBSSxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUN6QixPQUFPO1NBQ1I7O1lBQ0csUUFBUSxHQUFHLG1CQUFlLEVBQUUsRUFBQTtRQUVoQyxVQUFVLENBQUMsT0FBTzs7OztRQUFDLFVBQUMsSUFBSTtZQUN0QixRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDekMsQ0FBQyxFQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRTtZQUNqQixRQUFRLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztTQUNwQjtRQUVELE9BQU8sUUFBUSxDQUFDO0lBQ2xCLENBQUM7O2dCQXZFRixVQUFVOzs7O0lBd0VYLHVCQUFDO0NBQUEsQUF4RUQsSUF3RUM7U0F2RVksZ0JBQWdCOzs7Ozs7SUFFM0IsaUNBQXNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtPcGVuR3JhcGhEYXRhLCBPcGVuR3JhcGhJbWFnZUluZm99IGZyb20gXCIuL21vZGVsL09wZW5HcmFwaERhdGFcIjtcbmRlY2xhcmUgbGV0IGlOZXQ6IGFueTtcbmRlY2xhcmUgbGV0ICQ6IGFueTtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE9wZW5HcmFwaFNlcnZpY2Uge1xuXG4gIHByaXZhdGUgcmVnZXggPSAvKGh0dHBzPzpcXC9cXC9bXlxcc10rKS87XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBsb2FkUHJldmlld0xpbmsobGluazogc3RyaW5nLCBjYWxsYmFjazogRnVuY3Rpb24pIHtcbiAgICBpZiAoIWxpbmspIHtcbiAgICAgIGNhbGxiYWNrKG51bGwsIHtcbiAgICAgICAgZXJyb3I6ICdMaW5rIGlzIGVtcHR5J1xuICAgICAgfSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghdGhpcy5pc0xpbmsobGluaykpIHtcbiAgICAgIGNhbGxiYWNrKG51bGwsIHtcbiAgICAgICAgZXJyb3I6ICdMaW5rIGludmFsaWQnXG4gICAgICB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAkLmFqYXgoe1xuICAgICAgdHlwZTogJ3Bvc3QnLFxuICAgICAgdXJsOiBpTmV0LmdldFVybCgnb3BlbmdyYXBoL2ZldGNoJyksXG4gICAgICBkYXRhOiB7XG4gICAgICAgdXJsOiBsaW5rXG4gICAgICB9LFxuICAgICAgc3VjY2VzczogKGRhdGEpID0+IHtcbiAgICAgICAgIGNhbGxiYWNrKHRoaXMuY29udmVydE9wZW5EYXRhKGRhdGEsIGxpbmspKTtcbiAgICAgIH0sXG4gICAgICBlcnJvcjogZnVuY3Rpb24gKHhocikge1xuICAgICAgICBjYWxsYmFjayhudWxsLCB4aHIpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgaXNMaW5rKGxpbms6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnJlZ2V4LnRlc3QobGluayk7XG4gIH1cblxuICBsb2FkSW1hZ2VJbmZvKHNyYzogc3RyaW5nLCBjYWxsYmFjazogRnVuY3Rpb24pIHtcbiAgICBsZXQgaW1nID0gbmV3IEltYWdlKCk7XG4gICAgaW1nLm9ubG9hZCA9IGltZy5vbmVycm9yID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgIGxldCBpbWFnZUluZm86IE9wZW5HcmFwaEltYWdlSW5mbyA9IHtcbiAgICAgICAgd2lkdGg6IGltZy53aWR0aCxcbiAgICAgICAgaGVpZ2h0OiBpbWcuaGVpZ2h0XG4gICAgICB9O1xuICAgICAgaWYgKGltYWdlSW5mby53aWR0aCAmJiBpbWFnZUluZm8uaGVpZ2h0KSB7XG4gICAgICAgIGltYWdlSW5mby5hdmFpbGFibGUgPSB0cnVlO1xuICAgICAgICBpbWFnZUluZm8ubGFuZHNjYXBlID0gaW1hZ2VJbmZvLndpZHRoIC8gaW1hZ2VJbmZvLmhlaWdodCA+IDEuMTtcbiAgICAgIH1cbiAgICAgIGNhbGxiYWNrKGltYWdlSW5mbyk7XG4gICAgfTtcbiAgICBpbWcuc3JjID0gc3JjO1xuICB9XG5cbiAgcHJpdmF0ZSBjb252ZXJ0T3BlbkRhdGEocHJvcGVydGllczogYW55W10sIHVybDogc3RyaW5nKTogT3BlbkdyYXBoRGF0YSB7XG4gICAgaWYgKHByb3BlcnRpZXMubGVuZ3RoIDwgMSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgb3BlbkRhdGEgPSA8T3BlbkdyYXBoRGF0YT57fTtcblxuICAgIHByb3BlcnRpZXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgb3BlbkRhdGFbaXRlbS5wcm9wZXJ0eV0gPSBpdGVtLmNvbnRlbnQ7XG4gICAgfSk7XG5cbiAgICBpZiAoIW9wZW5EYXRhLnVybCkge1xuICAgICAgb3BlbkRhdGEudXJsID0gdXJsO1xuICAgIH1cblxuICAgIHJldHVybiBvcGVuRGF0YTtcbiAgfVxufVxuIl19