/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
export class ListViewRow {
    /**
     * @param {?} $implicit
     * @param {?=} index
     * @param {?=} count
     */
    constructor($implicit, index = 0, count = 0) {
        this.$implicit = $implicit;
        this.index = index;
        this.count = count;
        this.selected = false;
        this.active = false;
    }
    /**
     * @return {?}
     */
    get first() { return this.index === 0; }
    /**
     * @return {?}
     */
    get last() { return this.index === this.count - 1; }
    /**
     * @return {?}
     */
    get even() { return this.index % 2 === 0; }
    /**
     * @return {?}
     */
    get odd() { return !this.even; }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC12aWV3LXJvdy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtdWkvIiwic291cmNlcyI6WyJzcmMvbGlzdC12aWV3L2xpc3Qtdmlldy1yb3cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE1BQU0sT0FBTyxXQUFXOzs7Ozs7SUFJdEIsWUFBbUIsU0FBYyxFQUFTLFFBQWdCLENBQUMsRUFBUyxRQUFnQixDQUFDO1FBQWxFLGNBQVMsR0FBVCxTQUFTLENBQUs7UUFBUyxVQUFLLEdBQUwsS0FBSyxDQUFZO1FBQVMsVUFBSyxHQUFMLEtBQUssQ0FBWTtRQUg5RSxhQUFRLEdBQVksS0FBSyxDQUFDO1FBQzFCLFdBQU0sR0FBWSxLQUFLLENBQUM7SUFFMEQsQ0FBQzs7OztJQUUxRixJQUFJLEtBQUssS0FBYyxPQUFPLElBQUksQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzs7OztJQUVqRCxJQUFJLElBQUksS0FBYyxPQUFPLElBQUksQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7O0lBRTdELElBQUksSUFBSSxLQUFjLE9BQU8sSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzs7OztJQUVwRCxJQUFJLEdBQUcsS0FBYyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Q0FDMUM7OztJQVpDLCtCQUFpQzs7SUFDakMsNkJBQStCOztJQUVuQixnQ0FBcUI7O0lBQUUsNEJBQXdCOztJQUFFLDRCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBMaXN0Vmlld1JvdyB7XG4gIHB1YmxpYyBzZWxlY3RlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBwdWJsaWMgYWN0aXZlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IocHVibGljICRpbXBsaWNpdDogYW55LCBwdWJsaWMgaW5kZXg6IG51bWJlciA9IDAsIHB1YmxpYyBjb3VudDogbnVtYmVyID0gMCkgeyB9XG5cbiAgZ2V0IGZpcnN0KCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5pbmRleCA9PT0gMDsgfVxuXG4gIGdldCBsYXN0KCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5pbmRleCA9PT0gdGhpcy5jb3VudCAtIDE7IH1cblxuICBnZXQgZXZlbigpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuaW5kZXggJSAyID09PSAwOyB9XG5cbiAgZ2V0IG9kZCgpOiBib29sZWFuIHsgcmV0dXJuICF0aGlzLmV2ZW47IH1cbn0iXX0=