/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
/**
 * @param {?=} hooks
 * @return {?}
 */
export function Logger(hooks) {
    if (hooks === void 0) { hooks = []; }
    return (/**
     * @param {?} constructor
     * @return {?}
     */
    function (constructor) {
        /** @type {?} */
        var component = constructor.name;
        /** @type {?} */
        var log = (/**
         * @param {?} hook
         * @return {?}
         */
        function (hook) {
            try {
                /** @type {?} */
                var original_1 = constructor.prototype[hook];
                if (original_1 && (typeof original_1 === "function")) {
                    constructor.prototype[hook] = (/**
                     * @param {...?} args
                     * @return {?}
                     */
                    function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        console.log.apply(console, tslib_1.__spread(["%c " + component + " - " + hook, "color: #4CAF50; font-weight: bold"], args));
                        /** @type {?} */
                        var result = original_1 && original_1.apply(this, args);
                        if (result) {
                            console.log("%c " + component + " - " + hook + " - return", "color: #4CAF50; font-weight: bold", result);
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
            function (hook) {
                log(hook);
            }));
        }
        else {
            for (var hook in constructor.prototype) {
                log(hook);
            }
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLmRlY29yYXRvci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtdWkvIiwic291cmNlcyI6WyJzcmMvZGVjb3JhdG9yL2xvZ2dlci5kZWNvcmF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsTUFBTSxVQUFVLE1BQU0sQ0FBQyxLQUFvQjtJQUFwQixzQkFBQSxFQUFBLFVBQW9CO0lBQ3ZDOzs7O0lBQU8sVUFBVSxXQUFnQjs7WUFDdkIsU0FBUyxHQUFHLFdBQVcsQ0FBQyxJQUFJOztZQUM1QixHQUFHOzs7O1FBQUcsVUFBUyxJQUFJO1lBQ3JCLElBQUk7O29CQUNNLFVBQVEsR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQztnQkFDNUMsSUFBSSxVQUFRLElBQUksQ0FBQyxPQUFPLFVBQVEsS0FBSyxVQUFVLENBQUMsRUFBRTtvQkFDOUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7Ozs7b0JBQUc7d0JBQVUsY0FBTzs2QkFBUCxVQUFPLEVBQVAscUJBQU8sRUFBUCxJQUFPOzRCQUFQLHlCQUFPOzt3QkFDM0MsT0FBTyxDQUFDLEdBQUcsT0FBWCxPQUFPLG9CQUFLLFFBQU0sU0FBUyxXQUFNLElBQU0sRUFBRSxtQ0FBbUMsR0FBSyxJQUFJLEdBQUU7OzRCQUNqRixNQUFNLEdBQUcsVUFBUSxJQUFJLFVBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQzt3QkFDckQsSUFBSSxNQUFNLEVBQUU7NEJBQ1IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFNLFNBQVMsV0FBTSxJQUFJLGNBQVcsRUFBRSxtQ0FBbUMsRUFBRSxNQUFNLENBQUMsQ0FBQzt5QkFDbEc7b0JBQ0wsQ0FBQyxDQUFBLENBQUE7aUJBQ0o7YUFDSjtZQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNSLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDcEI7UUFDTCxDQUFDLENBQUE7UUFFRCxJQUFHLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ2pCLEtBQUssQ0FBQyxPQUFPOzs7O1lBQUMsVUFBQSxJQUFJO2dCQUNkLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNkLENBQUMsRUFBQyxDQUFDO1NBQ047YUFBTTtZQUNILEtBQUssSUFBSSxJQUFJLElBQUksV0FBVyxDQUFDLFNBQVMsRUFBRTtnQkFDcEMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ2I7U0FDSjtJQUNMLENBQUMsRUFBQTtBQUNMLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gTG9nZ2VyKGhvb2tzOiBzdHJpbmdbXSA9IFtdKTogQ2xhc3NEZWNvcmF0b3Ige1xuICAgIHJldHVybiBmdW5jdGlvbiAoY29uc3RydWN0b3I6IGFueSkge1xuICAgICAgICBjb25zdCBjb21wb25lbnQgPSBjb25zdHJ1Y3Rvci5uYW1lO1xuICAgICAgICBjb25zdCBsb2cgPSBmdW5jdGlvbihob29rKXtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgb3JpZ2luYWwgPSBjb25zdHJ1Y3Rvci5wcm90b3R5cGVbaG9va107XG4gICAgICAgICAgICAgICAgaWYgKG9yaWdpbmFsICYmICh0eXBlb2Ygb3JpZ2luYWwgPT09IFwiZnVuY3Rpb25cIikpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3RydWN0b3IucHJvdG90eXBlW2hvb2tdID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGAlYyAke2NvbXBvbmVudH0gLSAke2hvb2t9YCwgYGNvbG9yOiAjNENBRjUwOyBmb250LXdlaWdodDogYm9sZGAsIC4uLmFyZ3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gb3JpZ2luYWwgJiYgb3JpZ2luYWwuYXBwbHkodGhpcywgYXJncyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYCVjICR7Y29tcG9uZW50fSAtICR7aG9va30gLSByZXR1cm5gLCBgY29sb3I6ICM0Q0FGNTA7IGZvbnQtd2VpZ2h0OiBib2xkYCwgcmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGlmKGhvb2tzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGhvb2tzLmZvckVhY2goaG9vayA9PiB7XG4gICAgICAgICAgICAgICAgbG9nKGhvb2spO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb3IgKGxldCBob29rIGluIGNvbnN0cnVjdG9yLnByb3RvdHlwZSkge1xuICAgICAgICAgICAgICAgIGxvZyhob29rKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn0iXX0=