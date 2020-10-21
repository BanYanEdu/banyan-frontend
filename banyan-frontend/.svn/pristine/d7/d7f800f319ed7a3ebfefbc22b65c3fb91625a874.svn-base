/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} node
 * @return {?}
 */
function isElement(node) {
    return !!(node && (node.nodeName || node.prop && node.attr && node.find));
}
var FileLikeObject = /** @class */ (function () {
    function FileLikeObject(fileOrInput) {
        this.rawFile = fileOrInput;
        /** @type {?} */
        var isInput = isElement(fileOrInput);
        /** @type {?} */
        var fakePathOrObject = isInput ? fileOrInput.value : fileOrInput;
        /** @type {?} */
        var postfix = typeof fakePathOrObject === 'string' ? 'FakePath' : 'Object';
        /** @type {?} */
        var method = '_createFrom' + postfix;
        ((/** @type {?} */ (this)))[method](fakePathOrObject);
    }
    /**
     * @param {?} path
     * @return {?}
     */
    FileLikeObject.prototype._createFromFakePath = /**
     * @param {?} path
     * @return {?}
     */
    function (path) {
        this.lastModifiedDate = void 0;
        this.size = void 0;
        this.type = 'like/' + path.slice(path.lastIndexOf('.') + 1).toLowerCase();
        this.name = path.slice(path.lastIndexOf('/') + path.lastIndexOf('\\') + 2);
    };
    /**
     * @param {?} object
     * @return {?}
     */
    FileLikeObject.prototype._createFromObject = /**
     * @param {?} object
     * @return {?}
     */
    function (object) {
        this.size = object.size;
        this.type = object.type;
        this.name = object.name;
    };
    return FileLikeObject;
}());
export { FileLikeObject };
if (false) {
    /** @type {?} */
    FileLikeObject.prototype.lastModifiedDate;
    /** @type {?} */
    FileLikeObject.prototype.size;
    /** @type {?} */
    FileLikeObject.prototype.type;
    /** @type {?} */
    FileLikeObject.prototype.name;
    /** @type {?} */
    FileLikeObject.prototype.rawFile;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1saWtlLW9iamVjdC5jbGFzcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtdWkvIiwic291cmNlcyI6WyJzcmMvZmlsZS11cGxvYWQvZmlsZS1saWtlLW9iamVjdC5jbGFzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLFNBQVMsU0FBUyxDQUFDLElBQVM7SUFDMUIsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztBQUM1RSxDQUFDO0FBRUQ7SUFPRSx3QkFBbUIsV0FBZ0I7UUFDakMsSUFBSSxDQUFDLE9BQU8sR0FBRyxXQUFXLENBQUM7O1lBQ3ZCLE9BQU8sR0FBRyxTQUFTLENBQUMsV0FBVyxDQUFDOztZQUNoQyxnQkFBZ0IsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFdBQVc7O1lBQzVELE9BQU8sR0FBRyxPQUFPLGdCQUFnQixLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxRQUFROztZQUN0RSxNQUFNLEdBQUcsYUFBYSxHQUFHLE9BQU87UUFDcEMsQ0FBQyxtQkFBQSxJQUFJLEVBQU8sQ0FBQyxDQUFFLE1BQU0sQ0FBRSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDNUMsQ0FBQzs7Ozs7SUFFTSw0Q0FBbUI7Ozs7SUFBMUIsVUFBMkIsSUFBWTtRQUNyQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDLENBQUM7UUFDL0IsSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQztRQUNuQixJQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDMUUsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUM3RSxDQUFDOzs7OztJQUVNLDBDQUFpQjs7OztJQUF4QixVQUF5QixNQUFvRDtRQUMzRSxJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDeEIsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztJQUMxQixDQUFDO0lBQ0gscUJBQUM7QUFBRCxDQUFDLEFBNUJELElBNEJDOzs7O0lBM0JDLDBDQUE2Qjs7SUFDN0IsOEJBQWlCOztJQUNqQiw4QkFBb0I7O0lBQ3BCLDhCQUFvQjs7SUFDcEIsaUNBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gaXNFbGVtZW50KG5vZGU6IGFueSk6IGJvb2xlYW4ge1xuICByZXR1cm4gISEobm9kZSAmJiAobm9kZS5ub2RlTmFtZSB8fCBub2RlLnByb3AgJiYgbm9kZS5hdHRyICYmIG5vZGUuZmluZCkpO1xufVxuXG5leHBvcnQgY2xhc3MgRmlsZUxpa2VPYmplY3Qge1xuICBwdWJsaWMgbGFzdE1vZGlmaWVkRGF0ZTogYW55O1xuICBwdWJsaWMgc2l6ZTogYW55O1xuICBwdWJsaWMgdHlwZTogc3RyaW5nO1xuICBwdWJsaWMgbmFtZTogc3RyaW5nO1xuICBwdWJsaWMgcmF3RmlsZTogc3RyaW5nO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihmaWxlT3JJbnB1dDogYW55KSB7XG4gICAgdGhpcy5yYXdGaWxlID0gZmlsZU9ySW5wdXQ7XG4gICAgbGV0IGlzSW5wdXQgPSBpc0VsZW1lbnQoZmlsZU9ySW5wdXQpO1xuICAgIGxldCBmYWtlUGF0aE9yT2JqZWN0ID0gaXNJbnB1dCA/IGZpbGVPcklucHV0LnZhbHVlIDogZmlsZU9ySW5wdXQ7XG4gICAgbGV0IHBvc3RmaXggPSB0eXBlb2YgZmFrZVBhdGhPck9iamVjdCA9PT0gJ3N0cmluZycgPyAnRmFrZVBhdGgnIDogJ09iamVjdCc7XG4gICAgbGV0IG1ldGhvZCA9ICdfY3JlYXRlRnJvbScgKyBwb3N0Zml4O1xuICAgICh0aGlzIGFzIGFueSlbIG1ldGhvZCBdKGZha2VQYXRoT3JPYmplY3QpO1xuICB9XG5cbiAgcHVibGljIF9jcmVhdGVGcm9tRmFrZVBhdGgocGF0aDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5sYXN0TW9kaWZpZWREYXRlID0gdm9pZCAwO1xuICAgIHRoaXMuc2l6ZSA9IHZvaWQgMDtcbiAgICB0aGlzLnR5cGUgPSAnbGlrZS8nICsgcGF0aC5zbGljZShwYXRoLmxhc3RJbmRleE9mKCcuJykgKyAxKS50b0xvd2VyQ2FzZSgpO1xuICAgIHRoaXMubmFtZSA9IHBhdGguc2xpY2UocGF0aC5sYXN0SW5kZXhPZignLycpICsgcGF0aC5sYXN0SW5kZXhPZignXFxcXCcpICsgMik7XG4gIH1cblxuICBwdWJsaWMgX2NyZWF0ZUZyb21PYmplY3Qob2JqZWN0OiB7IHNpemU6IG51bWJlciwgdHlwZTogc3RyaW5nLCBuYW1lOiBzdHJpbmcgfSk6IHZvaWQge1xuICAgIHRoaXMuc2l6ZSA9IG9iamVjdC5zaXplO1xuICAgIHRoaXMudHlwZSA9IG9iamVjdC50eXBlO1xuICAgIHRoaXMubmFtZSA9IG9iamVjdC5uYW1lO1xuICB9XG59XG4iXX0=