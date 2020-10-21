/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ImageUtils = /** @class */ (function () {
    function ImageUtils() {
    }
    /**
     * @param {?} imageBase64
     * @return {?}
     */
    ImageUtils.getOrientation = /**
     * @param {?} imageBase64
     * @return {?}
     */
    function (imageBase64) {
        /** @type {?} */
        var view = new DataView(this.base64ToArrayBuffer(imageBase64));
        if (view.getUint16(0, false) != 0xFFD8) {
            return -2;
        }
        /** @type {?} */
        var length = view.byteLength;
        /** @type {?} */
        var offset = 2;
        while (offset < length) {
            if (view.getUint16(offset + 2, false) <= 8)
                return -1;
            /** @type {?} */
            var marker = view.getUint16(offset, false);
            offset += 2;
            if (marker == 0xFFE1) {
                if (view.getUint32(offset += 2, false) != 0x45786966) {
                    return -1;
                }
                /** @type {?} */
                var little = view.getUint16(offset += 6, false) == 0x4949;
                offset += view.getUint32(offset + 4, little);
                /** @type {?} */
                var tags = view.getUint16(offset, little);
                offset += 2;
                for (var i = 0; i < tags; i++) {
                    if (view.getUint16(offset + (i * 12), little) == 0x0112) {
                        return view.getUint16(offset + (i * 12) + 8, little);
                    }
                }
            }
            else if ((marker & 0xFF00) != 0xFF00) {
                break;
            }
            else {
                offset += view.getUint16(offset, false);
            }
        }
        return -1;
    };
    /**
     * @private
     * @param {?} imageBase64
     * @return {?}
     */
    ImageUtils.base64ToArrayBuffer = /**
     * @private
     * @param {?} imageBase64
     * @return {?}
     */
    function (imageBase64) {
        imageBase64 = imageBase64.replace(/^data\:([^\;]+)\;base64,/gmi, '');
        /** @type {?} */
        var binaryString = atob(imageBase64);
        /** @type {?} */
        var len = binaryString.length;
        /** @type {?} */
        var bytes = new Uint8Array(len);
        for (var i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes.buffer;
    };
    /**
     * @param {?} srcBase64
     * @param {?} srcOrientation
     * @param {?} callback
     * @return {?}
     */
    ImageUtils.resetOrientation = /**
     * @param {?} srcBase64
     * @param {?} srcOrientation
     * @param {?} callback
     * @return {?}
     */
    function (srcBase64, srcOrientation, callback) {
        /** @type {?} */
        var img = new Image();
        img.onload = (/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var width = img.width;
            /** @type {?} */
            var height = img.height;
            /** @type {?} */
            var canvas = document.createElement('canvas');
            /** @type {?} */
            var ctx = canvas.getContext('2d');
            if (ctx) {
                if (4 < srcOrientation && srcOrientation < 9) {
                    canvas.width = height;
                    canvas.height = width;
                }
                else {
                    canvas.width = width;
                    canvas.height = height;
                }
                ImageUtils.transformCanvas(ctx, srcOrientation, width, height);
                ctx.drawImage(img, 0, 0);
                callback(canvas.toDataURL());
            }
            else {
                callback(srcBase64);
            }
        });
        img.src = srcBase64;
    };
    /**
     * @private
     * @param {?} ctx
     * @param {?} orientation
     * @param {?} width
     * @param {?} height
     * @return {?}
     */
    ImageUtils.transformCanvas = /**
     * @private
     * @param {?} ctx
     * @param {?} orientation
     * @param {?} width
     * @param {?} height
     * @return {?}
     */
    function (ctx, orientation, width, height) {
        switch (orientation) {
            case 2:
                ctx.transform(-1, 0, 0, 1, width, 0);
                break;
            case 3:
                ctx.transform(-1, 0, 0, -1, width, height);
                break;
            case 4:
                ctx.transform(1, 0, 0, -1, 0, height);
                break;
            case 5:
                ctx.transform(0, 1, 1, 0, 0, 0);
                break;
            case 6:
                ctx.transform(0, 1, -1, 0, height, 0);
                break;
            case 7:
                ctx.transform(0, -1, -1, 0, height, width);
                break;
            case 8:
                ctx.transform(0, -1, 1, 0, 0, width);
                break;
            default:
                break;
        }
    };
    return ImageUtils;
}());
export { ImageUtils };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UudXRpbHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbmV0LXVpLyIsInNvdXJjZXMiOlsic3JjL2ltYWdlLWNyb3BwZXIvaW1hZ2UudXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBO0lBQUE7SUFrSEEsQ0FBQzs7Ozs7SUFqSFUseUJBQWM7Ozs7SUFBckIsVUFBc0IsV0FBbUI7O1lBQy9CLElBQUksR0FBRyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDaEUsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsSUFBSSxNQUFNLEVBQUU7WUFDcEMsT0FBTyxDQUFDLENBQUMsQ0FBQztTQUNiOztZQUNLLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVTs7WUFDMUIsTUFBTSxHQUFHLENBQUM7UUFDZCxPQUFPLE1BQU0sR0FBRyxNQUFNLEVBQUU7WUFDcEIsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQztnQkFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDOztnQkFDaEQsTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQztZQUM1QyxNQUFNLElBQUksQ0FBQyxDQUFDO1lBQ1osSUFBSSxNQUFNLElBQUksTUFBTSxFQUFFO2dCQUNsQixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRSxLQUFLLENBQUMsSUFBSSxVQUFVLEVBQUU7b0JBQ2xELE9BQU8sQ0FBQyxDQUFDLENBQUM7aUJBQ2I7O29CQUVLLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUUsS0FBSyxDQUFDLElBQUksTUFBTTtnQkFDM0QsTUFBTSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsRUFB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LEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUNyQyxNQUFNO1lBQ1Y7Z0JBQ0ksTUFBTTtTQUNiO0lBQ0wsQ0FBQztJQWdCTCxpQkFBQztBQUFELENBQUMsQUFsSEQsSUFrSEMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgSW1hZ2VVdGlscyB7XG4gICAgc3RhdGljIGdldE9yaWVudGF0aW9uKGltYWdlQmFzZTY0OiBzdHJpbmcpOiBudW1iZXIge1xuICAgICAgICBjb25zdCB2aWV3ID0gbmV3IERhdGFWaWV3KHRoaXMuYmFzZTY0VG9BcnJheUJ1ZmZlcihpbWFnZUJhc2U2NCkpO1xuICAgICAgICBpZiAodmlldy5nZXRVaW50MTYoMCwgZmFsc2UpICE9IDB4RkZEOCkge1xuICAgICAgICAgICAgcmV0dXJuIC0yO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGxlbmd0aCA9IHZpZXcuYnl0ZUxlbmd0aDtcbiAgICAgICAgbGV0IG9mZnNldCA9IDI7XG4gICAgICAgIHdoaWxlIChvZmZzZXQgPCBsZW5ndGgpIHtcbiAgICAgICAgICAgIGlmICh2aWV3LmdldFVpbnQxNihvZmZzZXQgKyAyLCBmYWxzZSkgPD0gOCkgcmV0dXJuIC0xO1xuICAgICAgICAgICAgY29uc3QgbWFya2VyID0gdmlldy5nZXRVaW50MTYob2Zmc2V0LCBmYWxzZSk7XG4gICAgICAgICAgICBvZmZzZXQgKz0gMjtcbiAgICAgICAgICAgIGlmIChtYXJrZXIgPT0gMHhGRkUxKSB7XG4gICAgICAgICAgICAgICAgaWYgKHZpZXcuZ2V0VWludDMyKG9mZnNldCArPSAyLCBmYWxzZSkgIT0gMHg0NTc4Njk2Nikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY29uc3QgbGl0dGxlID0gdmlldy5nZXRVaW50MTYob2Zmc2V0ICs9IDYsIGZhbHNlKSA9PSAweDQ5NDk7XG4gICAgICAgICAgICAgICAgb2Zmc2V0ICs9IHZpZXcuZ2V0VWludDMyKG9mZnNldCArIDQsIGxpdHRsZSk7XG4gICAgICAgICAgICAgICAgY29uc3QgdGFncyA9IHZpZXcuZ2V0VWludDE2KG9mZnNldCwgbGl0dGxlKTtcbiAgICAgICAgICAgICAgICBvZmZzZXQgKz0gMjtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRhZ3M7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAodmlldy5nZXRVaW50MTYob2Zmc2V0ICsgKGkgKiAxMiksIGxpdHRsZSkgPT0gMHgwMTEyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmlldy5nZXRVaW50MTYob2Zmc2V0ICsgKGkgKiAxMikgKyA4LCBsaXR0bGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmICgobWFya2VyICYgMHhGRjAwKSAhPSAweEZGMDApIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgb2Zmc2V0ICs9IHZpZXcuZ2V0VWludDE2KG9mZnNldCwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAtMTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBiYXNlNjRUb0FycmF5QnVmZmVyKGltYWdlQmFzZTY0OiBzdHJpbmcpIHtcbiAgICAgICAgaW1hZ2VCYXNlNjQgPSBpbWFnZUJhc2U2NC5yZXBsYWNlKC9eZGF0YVxcOihbXlxcO10rKVxcO2Jhc2U2NCwvZ21pLCAnJyk7XG4gICAgICAgIGNvbnN0IGJpbmFyeVN0cmluZyA9IGF0b2IoaW1hZ2VCYXNlNjQpO1xuICAgICAgICBjb25zdCBsZW4gPSBiaW5hcnlTdHJpbmcubGVuZ3RoO1xuICAgICAgICBjb25zdCBieXRlcyA9IG5ldyBVaW50OEFycmF5KGxlbik7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGJ5dGVzW2ldID0gYmluYXJ5U3RyaW5nLmNoYXJDb2RlQXQoaSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJ5dGVzLmJ1ZmZlcjtcbiAgICB9XG5cbiAgICBzdGF0aWMgcmVzZXRPcmllbnRhdGlvbihzcmNCYXNlNjQ6IHN0cmluZywgc3JjT3JpZW50YXRpb246IG51bWJlciwgY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XG4gICAgICAgIGNvbnN0IGltZyA9IG5ldyBJbWFnZSgpO1xuICAgICAgICBpbWcub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY29uc3Qgd2lkdGggPSBpbWcud2lkdGg7XG4gICAgICAgICAgICBjb25zdCBoZWlnaHQgPSBpbWcuaGVpZ2h0O1xuICAgICAgICAgICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgICAgICAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcblxuICAgICAgICAgICAgaWYgKGN0eCkge1xuICAgICAgICAgICAgICAgIGlmICg0IDwgc3JjT3JpZW50YXRpb24gJiYgc3JjT3JpZW50YXRpb24gPCA5KSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbnZhcy53aWR0aCA9IGhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgY2FudmFzLmhlaWdodCA9IHdpZHRoO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbnZhcy53aWR0aCA9IHdpZHRoO1xuICAgICAgICAgICAgICAgICAgICBjYW52YXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBJbWFnZVV0aWxzLnRyYW5zZm9ybUNhbnZhcyhjdHgsIHNyY09yaWVudGF0aW9uLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKGltZywgMCwgMCk7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soY2FudmFzLnRvRGF0YVVSTCgpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soc3JjQmFzZTY0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgaW1nLnNyYyA9IHNyY0Jhc2U2NDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyB0cmFuc2Zvcm1DYW52YXMoY3R4OiBhbnksIG9yaWVudGF0aW9uOiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKSB7XG4gICAgICAgIHN3aXRjaCAob3JpZW50YXRpb24pIHtcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICBjdHgudHJhbnNmb3JtKC0xLCAwLCAwLCAxLCB3aWR0aCwgMCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgY3R4LnRyYW5zZm9ybSgtMSwgMCwgMCwgLTEsIHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgIGN0eC50cmFuc2Zvcm0oMSwgMCwgMCwgLTEsIDAsIGhlaWdodCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgY3R4LnRyYW5zZm9ybSgwLCAxLCAxLCAwLCAwLCAwKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNjpcbiAgICAgICAgICAgICAgICBjdHgudHJhbnNmb3JtKDAsIDEsIC0xLCAwLCBoZWlnaHQsIDApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA3OlxuICAgICAgICAgICAgICAgIGN0eC50cmFuc2Zvcm0oMCwgLTEsIC0xLCAwLCBoZWlnaHQsIHdpZHRoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgODpcbiAgICAgICAgICAgICAgICBjdHgudHJhbnNmb3JtKDAsIC0xLCAxLCAwLCAwLCB3aWR0aCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgKiBDb252ZXJ0cyBkYXRhIHVyaSB0byBCbG9iLiBOZWNlc3NhcnkgZm9yIHVwbG9hZGluZy5cbiAgICAqL1xuICAgIC8qXG4gICAgcHVibGljIHN0YXRpYyBjb252ZXJ0RGF0YVVSSXRvQmxvYihkYXRhVVJJOiBzdHJpbmcpOiBCbG9iIHtcbiAgICAgICAgY29uc3QgYmluYXJ5ID0gYXRvYihkYXRhVVJJLnNwbGl0KCcsJylbMV0pO1xuICAgICAgICBjb25zdCBtaW1lU3RyaW5nID0gZGF0YVVSSS5zcGxpdCgnLCcpWzBdLnNwbGl0KCc6JylbMV0uc3BsaXQoJzsnKVswXTtcbiAgICAgICAgY29uc3QgYXJyYXkgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBiaW5hcnkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFycmF5LnB1c2goYmluYXJ5LmNoYXJDb2RlQXQoaSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgQmxvYihbbmV3IFVpbnQ4QXJyYXkoYXJyYXkpXSwge3R5cGU6IG1pbWVTdHJpbmd9KTtcbiAgICB9O1xuICAgICovXG59XG4iXX0=