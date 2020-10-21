/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
export class HtmlUtils {
    // Escape html to display
    /**
     * @param {?} html
     * @return {?}
     */
    static formatHtmlDisplay(html) {
        return html.replace(HtmlUtils.formatPattern, '<br>');
    }
}
HtmlUtils.formatPattern = new RegExp('(\\n)|(\\\\n)|(\\\\\\\\n)|↵', 'g');
if (false) {
    /** @type {?} */
    HtmlUtils.formatPattern;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSHRtbFV0aWxzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC1jb3JlLyIsInNvdXJjZXMiOlsic3JjL3V0aWxzL0h0bWxVdGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsTUFBTSxPQUFPLFNBQVM7Ozs7OztJQUtsQixNQUFNLENBQUMsaUJBQWlCLENBQUMsSUFBWTtRQUNqQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLGFBQWEsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUN6RCxDQUFDOztBQUxNLHVCQUFhLEdBQVcsSUFBSSxNQUFNLENBQUMsNkJBQTZCLEVBQUUsR0FBRyxDQUFDLENBQUM7OztJQUE5RSx3QkFBOEUiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgSHRtbFV0aWxzIHtcblxuICAgIHN0YXRpYyBmb3JtYXRQYXR0ZXJuOiBSZWdFeHAgPSBuZXcgUmVnRXhwKCcoXFxcXG4pfChcXFxcXFxcXG4pfChcXFxcXFxcXFxcXFxcXFxcbil84oa1JywgJ2cnKTtcblxuICAgIC8vIEVzY2FwZSBodG1sIHRvIGRpc3BsYXlcbiAgICBzdGF0aWMgZm9ybWF0SHRtbERpc3BsYXkoaHRtbDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGh0bWwucmVwbGFjZShIdG1sVXRpbHMuZm9ybWF0UGF0dGVybiwgJzxicj4nKTtcbiAgICB9XG59Il19