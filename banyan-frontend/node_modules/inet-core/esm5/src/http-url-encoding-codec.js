/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var HttpUrlEncodingCodec = /** @class */ (function () {
    function HttpUrlEncodingCodec() {
    }
    /**
     * @param {?} k
     * @return {?}
     */
    HttpUrlEncodingCodec.prototype.encodeKey = /**
     * @param {?} k
     * @return {?}
     */
    function (k) { return standardEncoding(k); };
    /**
     * @param {?} v
     * @return {?}
     */
    HttpUrlEncodingCodec.prototype.encodeValue = /**
     * @param {?} v
     * @return {?}
     */
    function (v) { return standardEncoding(v); };
    /**
     * @param {?} k
     * @return {?}
     */
    HttpUrlEncodingCodec.prototype.decodeKey = /**
     * @param {?} k
     * @return {?}
     */
    function (k) { return decodeURIComponent(k); };
    /**
     * @param {?} v
     * @return {?}
     */
    HttpUrlEncodingCodec.prototype.decodeValue = /**
     * @param {?} v
     * @return {?}
     */
    function (v) { return decodeURIComponent(v); };
    return HttpUrlEncodingCodec;
}());
export { HttpUrlEncodingCodec };
/**
 * @param {?} v
 * @return {?}
 */
function standardEncoding(v) {
    return encodeURIComponent(v);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC11cmwtZW5jb2RpbmctY29kZWMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbmV0LWNvcmUvIiwic291cmNlcyI6WyJzcmMvaHR0cC11cmwtZW5jb2RpbmctY29kZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQU9BO0lBQUE7SUFLQSxDQUFDOzs7OztJQUpHLHdDQUFTOzs7O0lBQVQsVUFBVSxDQUFTLElBQVksT0FBTyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Ozs7O0lBQzVELDBDQUFXOzs7O0lBQVgsVUFBWSxDQUFTLElBQVksT0FBTyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Ozs7O0lBQzlELHdDQUFTOzs7O0lBQVQsVUFBVSxDQUFTLElBQVksT0FBTyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Ozs7O0lBQzlELDBDQUFXOzs7O0lBQVgsVUFBWSxDQUFTLElBQUksT0FBTyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDNUQsMkJBQUM7QUFBRCxDQUFDLEFBTEQsSUFLQzs7Ozs7O0FBQ0QsU0FBUyxnQkFBZ0IsQ0FBQyxDQUFTO0lBQy9CLE9BQU8sa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDakMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE5IGJ5IFZ5IE5ndXllbiAobnR2eUBpbmV0Y2xvdWQudm4pXG4gKlxuICogQ3JlYXRlZCBieSBudHZ5IG9uIDE0OjIxIDI4LzAyLzIwMTlcbiAqXG4gKi9cbmltcG9ydCB7SHR0cFBhcmFtZXRlckNvZGVjfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uL2h0dHBcIjtcbmV4cG9ydCBjbGFzcyBIdHRwVXJsRW5jb2RpbmdDb2RlYyBpbXBsZW1lbnRzIEh0dHBQYXJhbWV0ZXJDb2RlYyB7XG4gICAgZW5jb2RlS2V5KGs6IHN0cmluZyk6IHN0cmluZyB7IHJldHVybiBzdGFuZGFyZEVuY29kaW5nKGspOyB9XG4gICAgZW5jb2RlVmFsdWUodjogc3RyaW5nKTogc3RyaW5nIHsgcmV0dXJuIHN0YW5kYXJkRW5jb2Rpbmcodik7IH1cbiAgICBkZWNvZGVLZXkoazogc3RyaW5nKTogc3RyaW5nIHsgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChrKTsgfVxuICAgIGRlY29kZVZhbHVlKHY6IHN0cmluZykgeyByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KHYpOyB9XG59XG5mdW5jdGlvbiBzdGFuZGFyZEVuY29kaW5nKHY6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudCh2KTtcbn1cbiJdfQ==