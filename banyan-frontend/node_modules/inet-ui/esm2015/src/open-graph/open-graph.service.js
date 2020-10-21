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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3Blbi1ncmFwaC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC11aS8iLCJzb3VyY2VzIjpbInNyYy9vcGVuLWdyYXBoL29wZW4tZ3JhcGguc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQU0zQyxNQUFNLE9BQU8sZ0JBQWdCO0lBSTNCO1FBRlEsVUFBSyxHQUFHLHFCQUFxQixDQUFDO0lBRXRCLENBQUM7Ozs7OztJQUVqQixlQUFlLENBQUMsSUFBWSxFQUFFLFFBQWtCO1FBQzlDLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDVCxRQUFRLENBQUMsSUFBSSxFQUFFO2dCQUNiLEtBQUssRUFBRSxlQUFlO2FBQ3ZCLENBQUMsQ0FBQztZQUNILE9BQU87U0FDUjtRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3RCLFFBQVEsQ0FBQyxJQUFJLEVBQUU7Z0JBQ2IsS0FBSyxFQUFFLGNBQWM7YUFDdEIsQ0FBQyxDQUFDO1lBQ0gsT0FBTztTQUNSO1FBRUQsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNMLElBQUksRUFBRSxNQUFNO1lBQ1osR0FBRyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUM7WUFDbkMsSUFBSSxFQUFFO2dCQUNMLEdBQUcsRUFBRSxJQUFJO2FBQ1Q7WUFDRCxPQUFPOzs7O1lBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtnQkFDZixRQUFRLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUM5QyxDQUFDLENBQUE7WUFDRCxLQUFLOzs7O1lBQUUsVUFBVSxHQUFHO2dCQUNsQixRQUFRLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ3RCLENBQUMsQ0FBQTtTQUNGLENBQUMsQ0FBQztJQUNMLENBQUM7Ozs7O0lBRUQsTUFBTSxDQUFDLElBQVk7UUFDakIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMvQixDQUFDOzs7Ozs7SUFFRCxhQUFhLENBQUMsR0FBVyxFQUFFLFFBQWtCOztZQUN2QyxHQUFHLEdBQUcsSUFBSSxLQUFLLEVBQUU7UUFDckIsR0FBRyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsT0FBTzs7OztRQUFHLFVBQVUsQ0FBQzs7Z0JBQ2hDLFNBQVMsR0FBdUI7Z0JBQ2xDLEtBQUssRUFBRSxHQUFHLENBQUMsS0FBSztnQkFDaEIsTUFBTSxFQUFFLEdBQUcsQ0FBQyxNQUFNO2FBQ25CO1lBQ0QsSUFBSSxTQUFTLENBQUMsS0FBSyxJQUFJLFNBQVMsQ0FBQyxNQUFNLEVBQUU7Z0JBQ3ZDLFNBQVMsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO2dCQUMzQixTQUFTLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7YUFDaEU7WUFDRCxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdEIsQ0FBQyxDQUFBLENBQUM7UUFDRixHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztJQUNoQixDQUFDOzs7Ozs7O0lBRU8sZUFBZSxDQUFDLFVBQWlCLEVBQUUsR0FBVztRQUNwRCxJQUFJLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ3pCLE9BQU87U0FDUjs7WUFDRyxRQUFRLEdBQUcsbUJBQWUsRUFBRSxFQUFBO1FBRWhDLFVBQVUsQ0FBQyxPQUFPOzs7O1FBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUMxQixRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDekMsQ0FBQyxFQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRTtZQUNqQixRQUFRLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztTQUNwQjtRQUVELE9BQU8sUUFBUSxDQUFDO0lBQ2xCLENBQUM7OztZQXZFRixVQUFVOzs7Ozs7Ozs7SUFHVCxpQ0FBc0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge09wZW5HcmFwaERhdGEsIE9wZW5HcmFwaEltYWdlSW5mb30gZnJvbSBcIi4vbW9kZWwvT3BlbkdyYXBoRGF0YVwiO1xuZGVjbGFyZSBsZXQgaU5ldDogYW55O1xuZGVjbGFyZSBsZXQgJDogYW55O1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgT3BlbkdyYXBoU2VydmljZSB7XG5cbiAgcHJpdmF0ZSByZWdleCA9IC8oaHR0cHM/OlxcL1xcL1teXFxzXSspLztcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIGxvYWRQcmV2aWV3TGluayhsaW5rOiBzdHJpbmcsIGNhbGxiYWNrOiBGdW5jdGlvbikge1xuICAgIGlmICghbGluaykge1xuICAgICAgY2FsbGJhY2sobnVsbCwge1xuICAgICAgICBlcnJvcjogJ0xpbmsgaXMgZW1wdHknXG4gICAgICB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCF0aGlzLmlzTGluayhsaW5rKSkge1xuICAgICAgY2FsbGJhY2sobnVsbCwge1xuICAgICAgICBlcnJvcjogJ0xpbmsgaW52YWxpZCdcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgICQuYWpheCh7XG4gICAgICB0eXBlOiAncG9zdCcsXG4gICAgICB1cmw6IGlOZXQuZ2V0VXJsKCdvcGVuZ3JhcGgvZmV0Y2gnKSxcbiAgICAgIGRhdGE6IHtcbiAgICAgICB1cmw6IGxpbmtcbiAgICAgIH0sXG4gICAgICBzdWNjZXNzOiAoZGF0YSkgPT4ge1xuICAgICAgICAgY2FsbGJhY2sodGhpcy5jb252ZXJ0T3BlbkRhdGEoZGF0YSwgbGluaykpO1xuICAgICAgfSxcbiAgICAgIGVycm9yOiBmdW5jdGlvbiAoeGhyKSB7XG4gICAgICAgIGNhbGxiYWNrKG51bGwsIHhocik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBpc0xpbmsobGluazogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMucmVnZXgudGVzdChsaW5rKTtcbiAgfVxuXG4gIGxvYWRJbWFnZUluZm8oc3JjOiBzdHJpbmcsIGNhbGxiYWNrOiBGdW5jdGlvbikge1xuICAgIGxldCBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICBpbWcub25sb2FkID0gaW1nLm9uZXJyb3IgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgbGV0IGltYWdlSW5mbzogT3BlbkdyYXBoSW1hZ2VJbmZvID0ge1xuICAgICAgICB3aWR0aDogaW1nLndpZHRoLFxuICAgICAgICBoZWlnaHQ6IGltZy5oZWlnaHRcbiAgICAgIH07XG4gICAgICBpZiAoaW1hZ2VJbmZvLndpZHRoICYmIGltYWdlSW5mby5oZWlnaHQpIHtcbiAgICAgICAgaW1hZ2VJbmZvLmF2YWlsYWJsZSA9IHRydWU7XG4gICAgICAgIGltYWdlSW5mby5sYW5kc2NhcGUgPSBpbWFnZUluZm8ud2lkdGggLyBpbWFnZUluZm8uaGVpZ2h0ID4gMS4xO1xuICAgICAgfVxuICAgICAgY2FsbGJhY2soaW1hZ2VJbmZvKTtcbiAgICB9O1xuICAgIGltZy5zcmMgPSBzcmM7XG4gIH1cblxuICBwcml2YXRlIGNvbnZlcnRPcGVuRGF0YShwcm9wZXJ0aWVzOiBhbnlbXSwgdXJsOiBzdHJpbmcpOiBPcGVuR3JhcGhEYXRhIHtcbiAgICBpZiAocHJvcGVydGllcy5sZW5ndGggPCAxKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGxldCBvcGVuRGF0YSA9IDxPcGVuR3JhcGhEYXRhPnt9O1xuXG4gICAgcHJvcGVydGllcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICBvcGVuRGF0YVtpdGVtLnByb3BlcnR5XSA9IGl0ZW0uY29udGVudDtcbiAgICB9KTtcblxuICAgIGlmICghb3BlbkRhdGEudXJsKSB7XG4gICAgICBvcGVuRGF0YS51cmwgPSB1cmw7XG4gICAgfVxuXG4gICAgcmV0dXJuIG9wZW5EYXRhO1xuICB9XG59XG4iXX0=