/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ListViewRow = /** @class */ (function () {
    function ListViewRow($implicit, index, count) {
        if (index === void 0) { index = 0; }
        if (count === void 0) { count = 0; }
        this.$implicit = $implicit;
        this.index = index;
        this.count = count;
        this.selected = false;
        this.active = false;
    }
    Object.defineProperty(ListViewRow.prototype, "first", {
        get: /**
         * @return {?}
         */
        function () { return this.index === 0; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListViewRow.prototype, "last", {
        get: /**
         * @return {?}
         */
        function () { return this.index === this.count - 1; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListViewRow.prototype, "even", {
        get: /**
         * @return {?}
         */
        function () { return this.index % 2 === 0; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListViewRow.prototype, "odd", {
        get: /**
         * @return {?}
         */
        function () { return !this.even; },
        enumerable: true,
        configurable: true
    });
    return ListViewRow;
}());
export { ListViewRow };
if (false) {
    /** @type {?} */
    ListViewRow.prototype.selected;
    /** @type {?} */
    ListViewRow.prototype.active;
    /** @type {?} */
    ListViewRow.prototype.$implicit;
    /** @type {?} */
    ListViewRow.prototype.index;
    /** @type {?} */
    ListViewRow.prototype.count;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC12aWV3LXJvdy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtdWkvIiwic291cmNlcyI6WyJzcmMvbGlzdC12aWV3L2xpc3Qtdmlldy1yb3cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBO0lBSUUscUJBQW1CLFNBQWMsRUFBUyxLQUFpQixFQUFTLEtBQWlCO1FBQTNDLHNCQUFBLEVBQUEsU0FBaUI7UUFBUyxzQkFBQSxFQUFBLFNBQWlCO1FBQWxFLGNBQVMsR0FBVCxTQUFTLENBQUs7UUFBUyxVQUFLLEdBQUwsS0FBSyxDQUFZO1FBQVMsVUFBSyxHQUFMLEtBQUssQ0FBWTtRQUg5RSxhQUFRLEdBQVksS0FBSyxDQUFDO1FBQzFCLFdBQU0sR0FBWSxLQUFLLENBQUM7SUFFMEQsQ0FBQztJQUUxRixzQkFBSSw4QkFBSzs7OztRQUFULGNBQXVCLE9BQU8sSUFBSSxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQUVqRCxzQkFBSSw2QkFBSTs7OztRQUFSLGNBQXNCLE9BQU8sSUFBSSxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBRTdELHNCQUFJLDZCQUFJOzs7O1FBQVIsY0FBc0IsT0FBTyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQUVwRCxzQkFBSSw0QkFBRzs7OztRQUFQLGNBQXFCLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFDM0Msa0JBQUM7QUFBRCxDQUFDLEFBYkQsSUFhQzs7OztJQVpDLCtCQUFpQzs7SUFDakMsNkJBQStCOztJQUVuQixnQ0FBcUI7O0lBQUUsNEJBQXdCOztJQUFFLDRCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBMaXN0Vmlld1JvdyB7XG4gIHB1YmxpYyBzZWxlY3RlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBwdWJsaWMgYWN0aXZlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IocHVibGljICRpbXBsaWNpdDogYW55LCBwdWJsaWMgaW5kZXg6IG51bWJlciA9IDAsIHB1YmxpYyBjb3VudDogbnVtYmVyID0gMCkgeyB9XG5cbiAgZ2V0IGZpcnN0KCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5pbmRleCA9PT0gMDsgfVxuXG4gIGdldCBsYXN0KCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5pbmRleCA9PT0gdGhpcy5jb3VudCAtIDE7IH1cblxuICBnZXQgZXZlbigpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuaW5kZXggJSAyID09PSAwOyB9XG5cbiAgZ2V0IG9kZCgpOiBib29sZWFuIHsgcmV0dXJuICF0aGlzLmV2ZW47IH1cbn0iXX0=