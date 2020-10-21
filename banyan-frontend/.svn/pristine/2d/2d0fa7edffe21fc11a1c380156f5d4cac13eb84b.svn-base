/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?=} hooks
 * @return {?}
 */
export function Logger(hooks = []) {
    return (/**
     * @param {?} constructor
     * @return {?}
     */
    function (constructor) {
        /** @type {?} */
        const component = constructor.name;
        /** @type {?} */
        const log = (/**
         * @param {?} hook
         * @return {?}
         */
        function (hook) {
            try {
                /** @type {?} */
                const original = constructor.prototype[hook];
                if (original && (typeof original === "function")) {
                    constructor.prototype[hook] = (/**
                     * @param {...?} args
                     * @return {?}
                     */
                    function (...args) {
                        console.log(`%c ${component} - ${hook}`, `color: #4CAF50; font-weight: bold`, ...args);
                        /** @type {?} */
                        const result = original && original.apply(this, args);
                        if (result) {
                            console.log(`%c ${component} - ${hook} - return`, `color: #4CAF50; font-weight: bold`, result);
                        }
                    });
                }
            }
            catch (e) {
                console.error(e);
            }
        });
        if (hooks.length > 0) {
            hooks.forEach((/**
             * @param {?} hook
             * @return {?}
             */
            hook => {
                log(hook);
            }));
        }
        else {
            for (let hook in constructor.prototype) {
                log(hook);
            }
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLmRlY29yYXRvci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtdWkvIiwic291cmNlcyI6WyJzcmMvZGVjb3JhdG9yL2xvZ2dlci5kZWNvcmF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSxNQUFNLFVBQVUsTUFBTSxDQUFDLFFBQWtCLEVBQUU7SUFDdkM7Ozs7SUFBTyxVQUFVLFdBQWdCOztjQUN2QixTQUFTLEdBQUcsV0FBVyxDQUFDLElBQUk7O2NBQzVCLEdBQUc7Ozs7UUFBRyxVQUFTLElBQUk7WUFDckIsSUFBSTs7c0JBQ00sUUFBUSxHQUFHLFdBQVcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO2dCQUM1QyxJQUFJLFFBQVEsSUFBSSxDQUFDLE9BQU8sUUFBUSxLQUFLLFVBQVUsQ0FBQyxFQUFFO29CQUM5QyxXQUFXLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQzs7OztvQkFBRyxVQUFVLEdBQUcsSUFBSTt3QkFDM0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLFNBQVMsTUFBTSxJQUFJLEVBQUUsRUFBRSxtQ0FBbUMsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDOzs4QkFDakYsTUFBTSxHQUFHLFFBQVEsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUM7d0JBQ3JELElBQUksTUFBTSxFQUFFOzRCQUNSLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxTQUFTLE1BQU0sSUFBSSxXQUFXLEVBQUUsbUNBQW1DLEVBQUUsTUFBTSxDQUFDLENBQUM7eUJBQ2xHO29CQUNMLENBQUMsQ0FBQSxDQUFBO2lCQUNKO2FBQ0o7WUFBQyxPQUFPLENBQUMsRUFBRTtnQkFDUixPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3BCO1FBQ0wsQ0FBQyxDQUFBO1FBRUQsSUFBRyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUNqQixLQUFLLENBQUMsT0FBTzs7OztZQUFDLElBQUksQ0FBQyxFQUFFO2dCQUNqQixHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDZCxDQUFDLEVBQUMsQ0FBQztTQUNOO2FBQU07WUFDSCxLQUFLLElBQUksSUFBSSxJQUFJLFdBQVcsQ0FBQyxTQUFTLEVBQUU7Z0JBQ3BDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNiO1NBQ0o7SUFDTCxDQUFDLEVBQUE7QUFDTCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIExvZ2dlcihob29rczogc3RyaW5nW10gPSBbXSk6IENsYXNzRGVjb3JhdG9yIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGNvbnN0cnVjdG9yOiBhbnkpIHtcbiAgICAgICAgY29uc3QgY29tcG9uZW50ID0gY29uc3RydWN0b3IubmFtZTtcbiAgICAgICAgY29uc3QgbG9nID0gZnVuY3Rpb24oaG9vayl7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG9yaWdpbmFsID0gY29uc3RydWN0b3IucHJvdG90eXBlW2hvb2tdO1xuICAgICAgICAgICAgICAgIGlmIChvcmlnaW5hbCAmJiAodHlwZW9mIG9yaWdpbmFsID09PSBcImZ1bmN0aW9uXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0cnVjdG9yLnByb3RvdHlwZVtob29rXSA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgJWMgJHtjb21wb25lbnR9IC0gJHtob29rfWAsIGBjb2xvcjogIzRDQUY1MDsgZm9udC13ZWlnaHQ6IGJvbGRgLCAuLi5hcmdzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IG9yaWdpbmFsICYmIG9yaWdpbmFsLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGAlYyAke2NvbXBvbmVudH0gLSAke2hvb2t9IC0gcmV0dXJuYCwgYGNvbG9yOiAjNENBRjUwOyBmb250LXdlaWdodDogYm9sZGAsIHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBpZihob29rcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBob29rcy5mb3JFYWNoKGhvb2sgPT4ge1xuICAgICAgICAgICAgICAgIGxvZyhob29rKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9yIChsZXQgaG9vayBpbiBjb25zdHJ1Y3Rvci5wcm90b3R5cGUpIHtcbiAgICAgICAgICAgICAgICBsb2coaG9vayk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59Il19