/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @return {?}
 */
export function AutoUnsubscribe() {
    return (/**
     * @param {?} constructor
     * @return {?}
     */
    function (constructor) {
        /** @type {?} */
        const original = constructor.prototype.ngOnDestroy;
        constructor.prototype.ngOnDestroy = (/**
         * @return {?}
         */
        function () {
            for (let prop in this) {
                /** @type {?} */
                const property = this[prop];
                if (property && (typeof property.unsubscribe === "function")) {
                    property.unsubscribe();
                }
            }
            original && typeof original === "function" && original.apply(this, arguments);
        });
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0by11bnN1YnNjcmliZS5kZWNvcmF0b3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbmV0LXVpLyIsInNvdXJjZXMiOlsic3JjL2RlY29yYXRvci9hdXRvLXVuc3Vic2NyaWJlLmRlY29yYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsTUFBTSxVQUFVLGVBQWU7SUFDM0I7Ozs7SUFBTyxVQUFVLFdBQWdCOztjQUN2QixRQUFRLEdBQUcsV0FBVyxDQUFDLFNBQVMsQ0FBQyxXQUFXO1FBRWxELFdBQVcsQ0FBQyxTQUFTLENBQUMsV0FBVzs7O1FBQUc7WUFDaEMsS0FBSyxJQUFJLElBQUksSUFBSSxJQUFJLEVBQUU7O3NCQUNiLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUMzQixJQUFJLFFBQVEsSUFBSSxDQUFDLE9BQU8sUUFBUSxDQUFDLFdBQVcsS0FBSyxVQUFVLENBQUMsRUFBRTtvQkFDMUQsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO2lCQUMxQjthQUNKO1lBQ0QsUUFBUSxJQUFJLE9BQU8sUUFBUSxLQUFLLFVBQVUsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztRQUNsRixDQUFDLENBQUEsQ0FBQztJQUNOLENBQUMsRUFBQTtBQUVMLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gQXV0b1Vuc3Vic2NyaWJlKCk6IENsYXNzRGVjb3JhdG9yIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGNvbnN0cnVjdG9yOiBhbnkpIHtcbiAgICAgICAgY29uc3Qgb3JpZ2luYWwgPSBjb25zdHJ1Y3Rvci5wcm90b3R5cGUubmdPbkRlc3Ryb3k7XG5cbiAgICAgICAgY29uc3RydWN0b3IucHJvdG90eXBlLm5nT25EZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZm9yIChsZXQgcHJvcCBpbiB0aGlzKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJvcGVydHkgPSB0aGlzW3Byb3BdO1xuICAgICAgICAgICAgICAgIGlmIChwcm9wZXJ0eSAmJiAodHlwZW9mIHByb3BlcnR5LnVuc3Vic2NyaWJlID09PSBcImZ1bmN0aW9uXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIHByb3BlcnR5LnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3JpZ2luYWwgJiYgdHlwZW9mIG9yaWdpbmFsID09PSBcImZ1bmN0aW9uXCIgJiYgb3JpZ2luYWwuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbn0iXX0=