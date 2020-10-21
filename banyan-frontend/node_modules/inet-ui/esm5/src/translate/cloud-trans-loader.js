/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { systemViLocale } from "./system-vi";
import { systemEnLocale } from "./system-en";
var CloudTransLoader = /** @class */ (function () {
    function CloudTransLoader() {
        this.store = {};
        this.defineLocale(systemViLocale.abbr, systemViLocale);
        this.defineLocale(systemEnLocale.abbr, systemEnLocale);
    }
    /**
     * @param {?} lang
     * @param {?} data
     * @return {?}
     */
    CloudTransLoader.prototype.assign = /**
     * @param {?} lang
     * @param {?} data
     * @return {?}
     */
    function (lang, data) {
        return Object.assign(this.getResourceByLang(lang), data);
    };
    /**
     * @param {?} lang
     * @param {?} data
     * @return {?}
     */
    CloudTransLoader.prototype.defineLocale = /**
     * @param {?} lang
     * @param {?} data
     * @return {?}
     */
    function (lang, data) {
        defineLocale(lang, data);
        this.store[lang] = data;
    };
    /**
     * @param {?} lang
     * @return {?}
     */
    CloudTransLoader.prototype.getTranslation = /**
     * @param {?} lang
     * @return {?}
     */
    function (lang) {
        return Observable.of(this.getResourceByLang(lang));
    };
    /**
     * @param {?} lang
     * @return {?}
     */
    CloudTransLoader.prototype.getResourceByLang = /**
     * @param {?} lang
     * @return {?}
     */
    function (lang) {
        return this.store[lang] || systemEnLocale;
    };
    /**
     * Convert complex js object to dot notation js object
     */
    /**
     * Convert complex js object to dot notation js object
     * @private
     * @param {?} message
     * @param {?} value
     * @param {?} obj
     * @return {?}
     */
    CloudTransLoader.prototype.dotizeStringToJSON = /**
     * Convert complex js object to dot notation js object
     * @private
     * @param {?} message
     * @param {?} value
     * @param {?} obj
     * @return {?}
     */
    function (message, value, obj) {
        /** @type {?} */
        var parts = message.split(".");
        /** @type {?} */
        var last = parts.pop();
        /** @type {?} */
        var part;
        while (part = parts.shift()) {
            if (typeof obj[part] !== "object") {
                obj[part] = {};
            }
            obj = obj[part];
        }
        obj[last] = value;
    };
    /**
     * Convert Java .properties files data to JSON
     */
    /**
     * Convert Java .properties files data to JSON
     * @private
     * @param {?} str
     * @return {?}
     */
    CloudTransLoader.prototype.propertiesToJSON = /**
     * Convert Java .properties files data to JSON
     * @private
     * @param {?} str
     * @return {?}
     */
    function (str) {
        var _this = this;
        // Concat lines that end with '\'.
        // Split by line breaks.
        // Remove commented lines
        // Create the JSON
        return str.replace(/\\\n/, "").split("\n")
            .filter((/**
         * @param {?} line
         * @return {?}
         */
        function (line) { return /(\#|\!)/.test(line.replace(/\s/g, "").slice(0, 1)) ? false : line; }))
            .reduce((/**
         * @param {?} obj
         * @param {?} line
         * @return {?}
         */
        function (obj, line) {
            /** @type {?} */
            var colonifiedLine = line.replace(/(\=)/, ":");
            /** @type {?} */
            var key = colonifiedLine.substring(0, colonifiedLine.indexOf(":")).trim();
            /** @type {?} */
            var value = _this.asciiToNative(colonifiedLine.substring(colonifiedLine.indexOf(":") + 1).trim());
            obj[key] = value;
            return obj;
        }), {});
    };
    /*
    * Convert ASCII value to Native Character
     */
    /*
        * Convert ASCII value to Native Character
         */
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    CloudTransLoader.prototype.asciiToNative = /*
        * Convert ASCII value to Native Character
         */
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        /** @type {?} */
        var character = value.split("\\u");
        /** @type {?} */
        var nativeStr = character[0];
        for (var i = 1; i < character.length; i++) {
            /** @type {?} */
            var code = character[i];
            nativeStr += String.fromCharCode(parseInt("0x" + code.substring(0, 4)));
            if (code.length > 4) {
                nativeStr += code.substring(4, code.length);
            }
        }
        return nativeStr;
    };
    /*
    * Convert Native value to ASCII
     */
    /*
        * Convert Native value to ASCII
         */
    /**
     * @private
     * @param {?} value
     * @param {?=} ignoreLatin
     * @return {?}
     */
    CloudTransLoader.prototype.native2Ascii = /*
        * Convert Native value to ASCII
         */
    /**
     * @private
     * @param {?} value
     * @param {?=} ignoreLatin
     * @return {?}
     */
    function (value, ignoreLatin) {
        if (ignoreLatin === void 0) { ignoreLatin = false; }
        /** @type {?} */
        var character = value.split("");
        /** @type {?} */
        var asciiStr = "";
        for (var i = 0; i < character.length; i++) {
            /** @type {?} */
            var code = Number(character[i].charCodeAt(0));
            if (!ignoreLatin || code > 127) {
                /** @type {?} */
                var charAscii = code.toString(16);
                charAscii = new String("0000").substring(charAscii.length, 4) + charAscii;
                asciiStr += "\\u" + charAscii;
            }
            else {
                asciiStr += character[i];
            }
        }
        return asciiStr;
    };
    /**
     * Convert items from the server to Translation
     */
    /**
     * Convert items from the server to Translation
     * @param {?} items
     * @return {?}
     */
    CloudTransLoader.prototype.convertResourceToObject = /**
     * Convert items from the server to Translation
     * @param {?} items
     * @return {?}
     */
    function (items) {
        var e_1, _a;
        /** @type {?} */
        var translation = {};
        try {
            for (var items_1 = tslib_1.__values(items), items_1_1 = items_1.next(); !items_1_1.done; items_1_1 = items_1.next()) {
                var item = items_1_1.value;
                this.dotizeStringToJSON(item['messageKey'], item['text'], translation);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (items_1_1 && !items_1_1.done && (_a = items_1.return)) _a.call(items_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return translation;
    };
    /**
     * Convert Java .properties files data to Translation
     */
    /**
     * Convert Java .properties files data to Translation
     * @param {?} str
     * @return {?}
     */
    CloudTransLoader.prototype.convertPropertiesToObject = /**
     * Convert Java .properties files data to Translation
     * @param {?} str
     * @return {?}
     */
    function (str) {
        /** @type {?} */
        var translation = {};
        /** @type {?} */
        var json = this.propertiesToJSON(str);
        for (var key in json) {
            this.dotizeStringToJSON(key, json[key], translation);
        }
        return translation;
    };
    /**
     * @param {?} lang
     * @param {?} items
     * @return {?}
     */
    CloudTransLoader.prototype.setResources = /**
     * @param {?} lang
     * @param {?} items
     * @return {?}
     */
    function (lang, items) {
        this.assign(lang, this.convertResourceToObject(items));
    };
    return CloudTransLoader;
}());
export { CloudTransLoader };
if (false) {
    /**
     * @type {?}
     * @private
     */
    CloudTransLoader.prototype.store;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvdWQtdHJhbnMtbG9hZGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC11aS8iLCJzb3VyY2VzIjpbInNyYy90cmFuc2xhdGUvY2xvdWQtdHJhbnMtbG9hZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUNoQyxPQUFPLHdCQUF3QixDQUFDO0FBRWhDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUVuRCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBQzNDLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFFM0M7SUFJSTtRQUZRLFVBQUssR0FBRyxFQUFFLENBQUM7UUFHZixJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFDdkQsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLGNBQWMsQ0FBQyxDQUFDO0lBQzNELENBQUM7Ozs7OztJQUVELGlDQUFNOzs7OztJQUFOLFVBQU8sSUFBWSxFQUFFLElBQVM7UUFDMUIsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM3RCxDQUFDOzs7Ozs7SUFFRCx1Q0FBWTs7Ozs7SUFBWixVQUFhLElBQVksRUFBRSxJQUFTO1FBQ2hDLFlBQVksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUM7SUFDNUIsQ0FBQzs7Ozs7SUFFRCx5Q0FBYzs7OztJQUFkLFVBQWUsSUFBWTtRQUN2QixPQUFPLFVBQVUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7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LElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQzthQUMxRTs7Ozs7Ozs7O1FBQ0QsT0FBTyxXQUFXLENBQUM7SUFDdkIsQ0FBQztJQUVEOztPQUVHOzs7Ozs7SUFDSCxvREFBeUI7Ozs7O0lBQXpCLFVBQTBCLEdBQVc7O1lBQzdCLFdBQVcsR0FBRyxFQUFFOztZQUNkLElBQUksR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDO1FBQ3ZDLEtBQUssSUFBTSxHQUFHLElBQUksSUFBSSxFQUFFO1lBQ3BCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1NBQ3hEO1FBQ0QsT0FBTyxXQUFXLENBQUM7SUFDdkIsQ0FBQzs7Ozs7O0lBRUQsdUNBQVk7Ozs7O0lBQVosVUFBYSxJQUFZLEVBQUUsS0FBWTtRQUNuQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsdUJBQXVCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBRUwsdUJBQUM7QUFBRCxDQUFDLEFBM0hELElBMkhDOzs7Ozs7O0lBekhHLGlDQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7VHJhbnNsYXRlTG9hZGVyfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSAncnhqcyc7XG5pbXBvcnQgJ3J4anMvYWRkL29ic2VydmFibGUvb2YnO1xuXG5pbXBvcnQge2RlZmluZUxvY2FsZX0gZnJvbSAnbmd4LWJvb3RzdHJhcC9jaHJvbm9zJztcblxuaW1wb3J0IHtzeXN0ZW1WaUxvY2FsZX0gZnJvbSBcIi4vc3lzdGVtLXZpXCI7XG5pbXBvcnQge3N5c3RlbUVuTG9jYWxlfSBmcm9tIFwiLi9zeXN0ZW0tZW5cIjtcblxuZXhwb3J0IGNsYXNzIENsb3VkVHJhbnNMb2FkZXIgaW1wbGVtZW50cyBUcmFuc2xhdGVMb2FkZXIge1xuXG4gICAgcHJpdmF0ZSBzdG9yZSA9IHt9O1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuZGVmaW5lTG9jYWxlKHN5c3RlbVZpTG9jYWxlLmFiYnIsIHN5c3RlbVZpTG9jYWxlKTtcbiAgICAgICAgdGhpcy5kZWZpbmVMb2NhbGUoc3lzdGVtRW5Mb2NhbGUuYWJiciwgc3lzdGVtRW5Mb2NhbGUpO1xuICAgIH1cblxuICAgIGFzc2lnbihsYW5nOiBzdHJpbmcsIGRhdGE6IGFueSk6IGFueSB7XG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHRoaXMuZ2V0UmVzb3VyY2VCeUxhbmcobGFuZyksIGRhdGEpO1xuICAgIH1cblxuICAgIGRlZmluZUxvY2FsZShsYW5nOiBzdHJpbmcsIGRhdGE6IGFueSkge1xuICAgICAgICBkZWZpbmVMb2NhbGUobGFuZywgZGF0YSk7XG4gICAgICAgIHRoaXMuc3RvcmVbbGFuZ10gPSBkYXRhO1xuICAgIH1cblxuICAgIGdldFRyYW5zbGF0aW9uKGxhbmc6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHJldHVybiBPYnNlcnZhYmxlLm9mKHRoaXMuZ2V0UmVzb3VyY2VCeUxhbmcobGFuZykpO1xuICAgIH1cblxuICAgIGdldFJlc291cmNlQnlMYW5nKGxhbmc6IHN0cmluZyk6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0b3JlW2xhbmddIHx8IHN5c3RlbUVuTG9jYWxlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnZlcnQgY29tcGxleCBqcyBvYmplY3QgdG8gZG90IG5vdGF0aW9uIGpzIG9iamVjdFxuICAgICAqL1xuICAgIHByaXZhdGUgZG90aXplU3RyaW5nVG9KU09OKG1lc3NhZ2U6IHN0cmluZywgdmFsdWU6IHN0cmluZywgb2JqOiBhbnkpIHtcbiAgICAgICAgY29uc3QgcGFydHMgPSBtZXNzYWdlLnNwbGl0KFwiLlwiKTtcbiAgICAgICAgY29uc3QgbGFzdCA9IHBhcnRzLnBvcCgpO1xuICAgICAgICBsZXQgcGFydDtcbiAgICAgICAgd2hpbGUgKHBhcnQgPSBwYXJ0cy5zaGlmdCgpKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIG9ialtwYXJ0XSAhPT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgICAgIG9ialtwYXJ0XSA9IHt9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb2JqID0gb2JqW3BhcnRdO1xuICAgICAgICB9XG4gICAgICAgIG9ialtsYXN0XSA9IHZhbHVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnZlcnQgSmF2YSAucHJvcGVydGllcyBmaWxlcyBkYXRhIHRvIEpTT05cbiAgICAgKi9cbiAgICBwcml2YXRlIHByb3BlcnRpZXNUb0pTT04oc3RyOiBzdHJpbmcpOiBhbnkge1xuICAgICAgICAvLyBDb25jYXQgbGluZXMgdGhhdCBlbmQgd2l0aCAnXFwnLlxuICAgICAgICAvLyBTcGxpdCBieSBsaW5lIGJyZWFrcy5cbiAgICAgICAgLy8gUmVtb3ZlIGNvbW1lbnRlZCBsaW5lc1xuICAgICAgICAvLyBDcmVhdGUgdGhlIEpTT05cbiAgICAgICAgcmV0dXJuIHN0ci5yZXBsYWNlKC9cXFxcXFxuLywgXCJcIikuc3BsaXQoXCJcXG5cIilcbiAgICAgICAgICAgIC5maWx0ZXIoKGxpbmUpID0+IC8oXFwjfFxcISkvLnRlc3QobGluZS5yZXBsYWNlKC9cXHMvZywgXCJcIikuc2xpY2UoMCwgMSkpID8gZmFsc2UgOiBsaW5lKVxuICAgICAgICAgICAgLnJlZHVjZSgob2JqLCBsaW5lKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgY29sb25pZmllZExpbmUgPSBsaW5lLnJlcGxhY2UoLyhcXD0pLywgXCI6XCIpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGtleSA9IGNvbG9uaWZpZWRMaW5lLnN1YnN0cmluZygwLCBjb2xvbmlmaWVkTGluZS5pbmRleE9mKFwiOlwiKSkudHJpbSgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5hc2NpaVRvTmF0aXZlKGNvbG9uaWZpZWRMaW5lLnN1YnN0cmluZyhjb2xvbmlmaWVkTGluZS5pbmRleE9mKFwiOlwiKSArIDEpLnRyaW0oKSk7XG4gICAgICAgICAgICAgICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgICAgICAgfSwge30pO1xuICAgIH1cblxuICAgIC8qXG4gICAgKiBDb252ZXJ0IEFTQ0lJIHZhbHVlIHRvIE5hdGl2ZSBDaGFyYWN0ZXJcbiAgICAgKi9cbiAgICBwcml2YXRlIGFzY2lpVG9OYXRpdmUodmFsdWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIGxldCBjaGFyYWN0ZXIgPSB2YWx1ZS5zcGxpdChcIlxcXFx1XCIpO1xuICAgICAgICBsZXQgbmF0aXZlU3RyID0gY2hhcmFjdGVyWzBdO1xuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IGNoYXJhY3Rlci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGNvZGUgPSBjaGFyYWN0ZXJbaV07XG4gICAgICAgICAgICBuYXRpdmVTdHIgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShwYXJzZUludChcIjB4XCIgKyBjb2RlLnN1YnN0cmluZygwLCA0KSkpO1xuICAgICAgICAgICAgaWYgKGNvZGUubGVuZ3RoID4gNCkge1xuICAgICAgICAgICAgICAgIG5hdGl2ZVN0ciArPSBjb2RlLnN1YnN0cmluZyg0LCBjb2RlLmxlbmd0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5hdGl2ZVN0cjtcbiAgICB9XG5cbiAgICAvKlxuICAgICogQ29udmVydCBOYXRpdmUgdmFsdWUgdG8gQVNDSUlcbiAgICAgKi9cbiAgICBwcml2YXRlIG5hdGl2ZTJBc2NpaSh2YWx1ZTogc3RyaW5nLCBpZ25vcmVMYXRpbjogYm9vbGVhbiA9IGZhbHNlKTogc3RyaW5nIHtcbiAgICAgICAgbGV0IGNoYXJhY3RlciA9IHZhbHVlLnNwbGl0KFwiXCIpO1xuICAgICAgICBsZXQgYXNjaWlTdHIgPSBcIlwiO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoYXJhY3Rlci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgY29kZSA9IE51bWJlcihjaGFyYWN0ZXJbaV0uY2hhckNvZGVBdCgwKSk7XG4gICAgICAgICAgICBpZiAoIWlnbm9yZUxhdGluIHx8IGNvZGUgPiAxMjcpIHtcbiAgICAgICAgICAgICAgICBsZXQgY2hhckFzY2lpID0gY29kZS50b1N0cmluZygxNik7XG4gICAgICAgICAgICAgICAgY2hhckFzY2lpID0gbmV3IFN0cmluZyhcIjAwMDBcIikuc3Vic3RyaW5nKGNoYXJBc2NpaS5sZW5ndGgsIDQpICsgY2hhckFzY2lpO1xuICAgICAgICAgICAgICAgIGFzY2lpU3RyICs9IFwiXFxcXHVcIiArIGNoYXJBc2NpaTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYXNjaWlTdHIgKz0gY2hhcmFjdGVyW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhc2NpaVN0cjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0IGl0ZW1zIGZyb20gdGhlIHNlcnZlciB0byBUcmFuc2xhdGlvblxuICAgICAqL1xuICAgIGNvbnZlcnRSZXNvdXJjZVRvT2JqZWN0KGl0ZW1zOiBhbnlbXSk6IGFueSB7XG4gICAgICAgIGxldCB0cmFuc2xhdGlvbiA9IHt9O1xuICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpIHtcbiAgICAgICAgICAgIHRoaXMuZG90aXplU3RyaW5nVG9KU09OKGl0ZW1bJ21lc3NhZ2VLZXknXSwgaXRlbVsndGV4dCddLCB0cmFuc2xhdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRyYW5zbGF0aW9uO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnZlcnQgSmF2YSAucHJvcGVydGllcyBmaWxlcyBkYXRhIHRvIFRyYW5zbGF0aW9uXG4gICAgICovXG4gICAgY29udmVydFByb3BlcnRpZXNUb09iamVjdChzdHI6IHN0cmluZyk6IGFueSB7XG4gICAgICAgIGxldCB0cmFuc2xhdGlvbiA9IHt9O1xuICAgICAgICBjb25zdCBqc29uID0gdGhpcy5wcm9wZXJ0aWVzVG9KU09OKHN0cik7XG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIGpzb24pIHtcbiAgICAgICAgICAgIHRoaXMuZG90aXplU3RyaW5nVG9KU09OKGtleSwganNvbltrZXldLCB0cmFuc2xhdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRyYW5zbGF0aW9uO1xuICAgIH1cblxuICAgIHNldFJlc291cmNlcyhsYW5nOiBzdHJpbmcsIGl0ZW1zOiBhbnlbXSkge1xuICAgICAgICB0aGlzLmFzc2lnbihsYW5nLCB0aGlzLmNvbnZlcnRSZXNvdXJjZVRvT2JqZWN0KGl0ZW1zKSk7XG4gICAgfVxuXG59XG4iXX0=