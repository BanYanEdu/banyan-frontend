/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { systemViLocale } from "./system-vi";
import { systemEnLocale } from "./system-en";
export class CloudTransLoader {
    constructor() {
        this.store = {};
        this.defineLocale(systemViLocale.abbr, systemViLocale);
        this.defineLocale(systemEnLocale.abbr, systemEnLocale);
    }
    /**
     * @param {?} lang
     * @param {?} data
     * @return {?}
     */
    assign(lang, data) {
        return Object.assign(this.getResourceByLang(lang), data);
    }
    /**
     * @param {?} lang
     * @param {?} data
     * @return {?}
     */
    defineLocale(lang, data) {
        defineLocale(lang, data);
        this.store[lang] = data;
    }
    /**
     * @param {?} lang
     * @return {?}
     */
    getTranslation(lang) {
        return Observable.of(this.getResourceByLang(lang));
    }
    /**
     * @param {?} lang
     * @return {?}
     */
    getResourceByLang(lang) {
        return this.store[lang] || systemEnLocale;
    }
    /**
     * Convert complex js object to dot notation js object
     * @private
     * @param {?} message
     * @param {?} value
     * @param {?} obj
     * @return {?}
     */
    dotizeStringToJSON(message, value, obj) {
        /** @type {?} */
        const parts = message.split(".");
        /** @type {?} */
        const last = parts.pop();
        /** @type {?} */
        let part;
        while (part = parts.shift()) {
            if (typeof obj[part] !== "object") {
                obj[part] = {};
            }
            obj = obj[part];
        }
        obj[last] = value;
    }
    /**
     * Convert Java .properties files data to JSON
     * @private
     * @param {?} str
     * @return {?}
     */
    propertiesToJSON(str) {
        // Concat lines that end with '\'.
        // Split by line breaks.
        // Remove commented lines
        // Create the JSON
        return str.replace(/\\\n/, "").split("\n")
            .filter((/**
         * @param {?} line
         * @return {?}
         */
        (line) => /(\#|\!)/.test(line.replace(/\s/g, "").slice(0, 1)) ? false : line))
            .reduce((/**
         * @param {?} obj
         * @param {?} line
         * @return {?}
         */
        (obj, line) => {
            /** @type {?} */
            const colonifiedLine = line.replace(/(\=)/, ":");
            /** @type {?} */
            const key = colonifiedLine.substring(0, colonifiedLine.indexOf(":")).trim();
            /** @type {?} */
            const value = this.asciiToNative(colonifiedLine.substring(colonifiedLine.indexOf(":") + 1).trim());
            obj[key] = value;
            return obj;
        }), {});
    }
    /*
        * Convert ASCII value to Native Character
         */
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    asciiToNative(value) {
        /** @type {?} */
        let character = value.split("\\u");
        /** @type {?} */
        let nativeStr = character[0];
        for (let i = 1; i < character.length; i++) {
            /** @type {?} */
            let code = character[i];
            nativeStr += String.fromCharCode(parseInt("0x" + code.substring(0, 4)));
            if (code.length > 4) {
                nativeStr += code.substring(4, code.length);
            }
        }
        return nativeStr;
    }
    /*
        * Convert Native value to ASCII
         */
    /**
     * @private
     * @param {?} value
     * @param {?=} ignoreLatin
     * @return {?}
     */
    native2Ascii(value, ignoreLatin = false) {
        /** @type {?} */
        let character = value.split("");
        /** @type {?} */
        let asciiStr = "";
        for (let i = 0; i < character.length; i++) {
            /** @type {?} */
            const code = Number(character[i].charCodeAt(0));
            if (!ignoreLatin || code > 127) {
                /** @type {?} */
                let charAscii = code.toString(16);
                charAscii = new String("0000").substring(charAscii.length, 4) + charAscii;
                asciiStr += "\\u" + charAscii;
            }
            else {
                asciiStr += character[i];
            }
        }
        return asciiStr;
    }
    /**
     * Convert items from the server to Translation
     * @param {?} items
     * @return {?}
     */
    convertResourceToObject(items) {
        /** @type {?} */
        let translation = {};
        for (const item of items) {
            this.dotizeStringToJSON(item['messageKey'], item['text'], translation);
        }
        return translation;
    }
    /**
     * Convert Java .properties files data to Translation
     * @param {?} str
     * @return {?}
     */
    convertPropertiesToObject(str) {
        /** @type {?} */
        let translation = {};
        /** @type {?} */
        const json = this.propertiesToJSON(str);
        for (const key in json) {
            this.dotizeStringToJSON(key, json[key], translation);
        }
        return translation;
    }
    /**
     * @param {?} lang
     * @param {?} items
     * @return {?}
     */
    setResources(lang, items) {
        this.assign(lang, this.convertResourceToObject(items));
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    CloudTransLoader.prototype.store;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvdWQtdHJhbnMtbG9hZGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC11aS8iLCJzb3VyY2VzIjpbInNyYy90cmFuc2xhdGUvY2xvdWQtdHJhbnMtbG9hZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQ2hDLE9BQU8sd0JBQXdCLENBQUM7QUFFaEMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBRW5ELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFDM0MsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUUzQyxNQUFNLE9BQU8sZ0JBQWdCO0lBSXpCO1FBRlEsVUFBSyxHQUFHLEVBQUUsQ0FBQztRQUdmLElBQUksQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxjQUFjLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsY0FBYyxDQUFDLENBQUM7SUFDM0QsQ0FBQzs7Ozs7O0lBRUQsTUFBTSxDQUFDLElBQVksRUFBRSxJQUFTO1FBQzFCLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDN0QsQ0FBQzs7Ozs7O0lBRUQsWUFBWSxDQUFDLElBQVksRUFBRSxJQUFTO1FBQ2hDLFlBQVksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUM7SUFDNUIsQ0FBQzs7Ozs7SUFFRCxjQUFjLENBQUMsSUFBWTtRQUN2QixPQUFPLFVBQVUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDdkQsQ0FBQzs7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WUFDcEIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsV0FBVyxDQUFDLENBQUM7U0FDeEQ7UUFDRCxPQUFPLFdBQVcsQ0FBQztJQUN2QixDQUFDOzs7Ozs7SUFFRCxZQUFZLENBQUMsSUFBWSxFQUFFLEtBQVk7UUFDbkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLHVCQUF1QixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDM0QsQ0FBQztDQUVKOzs7Ozs7SUF6SEcsaUNBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtUcmFuc2xhdGVMb2FkZXJ9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICdyeGpzJztcbmltcG9ydCAncnhqcy9hZGQvb2JzZXJ2YWJsZS9vZic7XG5cbmltcG9ydCB7ZGVmaW5lTG9jYWxlfSBmcm9tICduZ3gtYm9vdHN0cmFwL2Nocm9ub3MnO1xuXG5pbXBvcnQge3N5c3RlbVZpTG9jYWxlfSBmcm9tIFwiLi9zeXN0ZW0tdmlcIjtcbmltcG9ydCB7c3lzdGVtRW5Mb2NhbGV9IGZyb20gXCIuL3N5c3RlbS1lblwiO1xuXG5leHBvcnQgY2xhc3MgQ2xvdWRUcmFuc0xvYWRlciBpbXBsZW1lbnRzIFRyYW5zbGF0ZUxvYWRlciB7XG5cbiAgICBwcml2YXRlIHN0b3JlID0ge307XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5kZWZpbmVMb2NhbGUoc3lzdGVtVmlMb2NhbGUuYWJiciwgc3lzdGVtVmlMb2NhbGUpO1xuICAgICAgICB0aGlzLmRlZmluZUxvY2FsZShzeXN0ZW1FbkxvY2FsZS5hYmJyLCBzeXN0ZW1FbkxvY2FsZSk7XG4gICAgfVxuXG4gICAgYXNzaWduKGxhbmc6IHN0cmluZywgZGF0YTogYW55KTogYW55IHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24odGhpcy5nZXRSZXNvdXJjZUJ5TGFuZyhsYW5nKSwgZGF0YSk7XG4gICAgfVxuXG4gICAgZGVmaW5lTG9jYWxlKGxhbmc6IHN0cmluZywgZGF0YTogYW55KSB7XG4gICAgICAgIGRlZmluZUxvY2FsZShsYW5nLCBkYXRhKTtcbiAgICAgICAgdGhpcy5zdG9yZVtsYW5nXSA9IGRhdGE7XG4gICAgfVxuXG4gICAgZ2V0VHJhbnNsYXRpb24obGFuZzogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIE9ic2VydmFibGUub2YodGhpcy5nZXRSZXNvdXJjZUJ5TGFuZyhsYW5nKSk7XG4gICAgfVxuXG4gICAgZ2V0UmVzb3VyY2VCeUxhbmcobGFuZzogc3RyaW5nKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RvcmVbbGFuZ10gfHwgc3lzdGVtRW5Mb2NhbGU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29udmVydCBjb21wbGV4IGpzIG9iamVjdCB0byBkb3Qgbm90YXRpb24ganMgb2JqZWN0XG4gICAgICovXG4gICAgcHJpdmF0ZSBkb3RpemVTdHJpbmdUb0pTT04obWVzc2FnZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nLCBvYmo6IGFueSkge1xuICAgICAgICBjb25zdCBwYXJ0cyA9IG1lc3NhZ2Uuc3BsaXQoXCIuXCIpO1xuICAgICAgICBjb25zdCBsYXN0ID0gcGFydHMucG9wKCk7XG4gICAgICAgIGxldCBwYXJ0O1xuICAgICAgICB3aGlsZSAocGFydCA9IHBhcnRzLnNoaWZ0KCkpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb2JqW3BhcnRdICE9PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICAgICAgb2JqW3BhcnRdID0ge307XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvYmogPSBvYmpbcGFydF07XG4gICAgICAgIH1cbiAgICAgICAgb2JqW2xhc3RdID0gdmFsdWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29udmVydCBKYXZhIC5wcm9wZXJ0aWVzIGZpbGVzIGRhdGEgdG8gSlNPTlxuICAgICAqL1xuICAgIHByaXZhdGUgcHJvcGVydGllc1RvSlNPTihzdHI6IHN0cmluZyk6IGFueSB7XG4gICAgICAgIC8vIENvbmNhdCBsaW5lcyB0aGF0IGVuZCB3aXRoICdcXCcuXG4gICAgICAgIC8vIFNwbGl0IGJ5IGxpbmUgYnJlYWtzLlxuICAgICAgICAvLyBSZW1vdmUgY29tbWVudGVkIGxpbmVzXG4gICAgICAgIC8vIENyZWF0ZSB0aGUgSlNPTlxuICAgICAgICByZXR1cm4gc3RyLnJlcGxhY2UoL1xcXFxcXG4vLCBcIlwiKS5zcGxpdChcIlxcblwiKVxuICAgICAgICAgICAgLmZpbHRlcigobGluZSkgPT4gLyhcXCN8XFwhKS8udGVzdChsaW5lLnJlcGxhY2UoL1xccy9nLCBcIlwiKS5zbGljZSgwLCAxKSkgPyBmYWxzZSA6IGxpbmUpXG4gICAgICAgICAgICAucmVkdWNlKChvYmosIGxpbmUpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjb2xvbmlmaWVkTGluZSA9IGxpbmUucmVwbGFjZSgvKFxcPSkvLCBcIjpcIik7XG4gICAgICAgICAgICAgICAgY29uc3Qga2V5ID0gY29sb25pZmllZExpbmUuc3Vic3RyaW5nKDAsIGNvbG9uaWZpZWRMaW5lLmluZGV4T2YoXCI6XCIpKS50cmltKCk7XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLmFzY2lpVG9OYXRpdmUoY29sb25pZmllZExpbmUuc3Vic3RyaW5nKGNvbG9uaWZpZWRMaW5lLmluZGV4T2YoXCI6XCIpICsgMSkudHJpbSgpKTtcbiAgICAgICAgICAgICAgICBvYmpba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgICAgICB9LCB7fSk7XG4gICAgfVxuXG4gICAgLypcbiAgICAqIENvbnZlcnQgQVNDSUkgdmFsdWUgdG8gTmF0aXZlIENoYXJhY3RlclxuICAgICAqL1xuICAgIHByaXZhdGUgYXNjaWlUb05hdGl2ZSh2YWx1ZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgbGV0IGNoYXJhY3RlciA9IHZhbHVlLnNwbGl0KFwiXFxcXHVcIik7XG4gICAgICAgIGxldCBuYXRpdmVTdHIgPSBjaGFyYWN0ZXJbMF07XG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgY2hhcmFjdGVyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgY29kZSA9IGNoYXJhY3RlcltpXTtcbiAgICAgICAgICAgIG5hdGl2ZVN0ciArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKHBhcnNlSW50KFwiMHhcIiArIGNvZGUuc3Vic3RyaW5nKDAsIDQpKSk7XG4gICAgICAgICAgICBpZiAoY29kZS5sZW5ndGggPiA0KSB7XG4gICAgICAgICAgICAgICAgbmF0aXZlU3RyICs9IGNvZGUuc3Vic3RyaW5nKDQsIGNvZGUubGVuZ3RoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmF0aXZlU3RyO1xuICAgIH1cblxuICAgIC8qXG4gICAgKiBDb252ZXJ0IE5hdGl2ZSB2YWx1ZSB0byBBU0NJSVxuICAgICAqL1xuICAgIHByaXZhdGUgbmF0aXZlMkFzY2lpKHZhbHVlOiBzdHJpbmcsIGlnbm9yZUxhdGluOiBib29sZWFuID0gZmFsc2UpOiBzdHJpbmcge1xuICAgICAgICBsZXQgY2hhcmFjdGVyID0gdmFsdWUuc3BsaXQoXCJcIik7XG4gICAgICAgIGxldCBhc2NpaVN0ciA9IFwiXCI7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hhcmFjdGVyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBjb2RlID0gTnVtYmVyKGNoYXJhY3RlcltpXS5jaGFyQ29kZUF0KDApKTtcbiAgICAgICAgICAgIGlmICghaWdub3JlTGF0aW4gfHwgY29kZSA+IDEyNykge1xuICAgICAgICAgICAgICAgIGxldCBjaGFyQXNjaWkgPSBjb2RlLnRvU3RyaW5nKDE2KTtcbiAgICAgICAgICAgICAgICBjaGFyQXNjaWkgPSBuZXcgU3RyaW5nKFwiMDAwMFwiKS5zdWJzdHJpbmcoY2hhckFzY2lpLmxlbmd0aCwgNCkgKyBjaGFyQXNjaWk7XG4gICAgICAgICAgICAgICAgYXNjaWlTdHIgKz0gXCJcXFxcdVwiICsgY2hhckFzY2lpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhc2NpaVN0ciArPSBjaGFyYWN0ZXJbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFzY2lpU3RyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnZlcnQgaXRlbXMgZnJvbSB0aGUgc2VydmVyIHRvIFRyYW5zbGF0aW9uXG4gICAgICovXG4gICAgY29udmVydFJlc291cmNlVG9PYmplY3QoaXRlbXM6IGFueVtdKTogYW55IHtcbiAgICAgICAgbGV0IHRyYW5zbGF0aW9uID0ge307XG4gICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcykge1xuICAgICAgICAgICAgdGhpcy5kb3RpemVTdHJpbmdUb0pTT04oaXRlbVsnbWVzc2FnZUtleSddLCBpdGVtWyd0ZXh0J10sIHRyYW5zbGF0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJhbnNsYXRpb247XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29udmVydCBKYXZhIC5wcm9wZXJ0aWVzIGZpbGVzIGRhdGEgdG8gVHJhbnNsYXRpb25cbiAgICAgKi9cbiAgICBjb252ZXJ0UHJvcGVydGllc1RvT2JqZWN0KHN0cjogc3RyaW5nKTogYW55IHtcbiAgICAgICAgbGV0IHRyYW5zbGF0aW9uID0ge307XG4gICAgICAgIGNvbnN0IGpzb24gPSB0aGlzLnByb3BlcnRpZXNUb0pTT04oc3RyKTtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4ganNvbikge1xuICAgICAgICAgICAgdGhpcy5kb3RpemVTdHJpbmdUb0pTT04oa2V5LCBqc29uW2tleV0sIHRyYW5zbGF0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJhbnNsYXRpb247XG4gICAgfVxuXG4gICAgc2V0UmVzb3VyY2VzKGxhbmc6IHN0cmluZywgaXRlbXM6IGFueVtdKSB7XG4gICAgICAgIHRoaXMuYXNzaWduKGxhbmcsIHRoaXMuY29udmVydFJlc291cmNlVG9PYmplY3QoaXRlbXMpKTtcbiAgICB9XG5cbn1cbiJdfQ==