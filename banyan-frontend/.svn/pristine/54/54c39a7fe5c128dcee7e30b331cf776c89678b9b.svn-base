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
export class FileLikeObject {
    /**
     * @param {?} fileOrInput
     */
    constructor(fileOrInput) {
        this.rawFile = fileOrInput;
        /** @type {?} */
        let isInput = isElement(fileOrInput);
        /** @type {?} */
        let fakePathOrObject = isInput ? fileOrInput.value : fileOrInput;
        /** @type {?} */
        let postfix = typeof fakePathOrObject === 'string' ? 'FakePath' : 'Object';
        /** @type {?} */
        let method = '_createFrom' + postfix;
        ((/** @type {?} */ (this)))[method](fakePathOrObject);
    }
    /**
     * @param {?} path
     * @return {?}
     */
    _createFromFakePath(path) {
        this.lastModifiedDate = void 0;
        this.size = void 0;
        this.type = 'like/' + path.slice(path.lastIndexOf('.') + 1).toLowerCase();
        this.name = path.slice(path.lastIndexOf('/') + path.lastIndexOf('\\') + 2);
    }
    /**
     * @param {?} object
     * @return {?}
     */
    _createFromObject(object) {
        this.size = object.size;
        this.type = object.type;
        this.name = object.name;
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1saWtlLW9iamVjdC5jbGFzcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtdWkvIiwic291cmNlcyI6WyJzcmMvZmlsZS11cGxvYWQvZmlsZS1saWtlLW9iamVjdC5jbGFzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLFNBQVMsU0FBUyxDQUFDLElBQVM7SUFDMUIsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztBQUM1RSxDQUFDO0FBRUQsTUFBTSxPQUFPLGNBQWM7Ozs7SUFPekIsWUFBbUIsV0FBZ0I7UUFDakMsSUFBSSxDQUFDLE9BQU8sR0FBRyxXQUFXLENBQUM7O1lBQ3ZCLE9BQU8sR0FBRyxTQUFTLENBQUMsV0FBVyxDQUFDOztZQUNoQyxnQkFBZ0IsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFdBQVc7O1lBQzVELE9BQU8sR0FBRyxPQUFPLGdCQUFnQixLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxRQUFROztZQUN0RSxNQUFNLEdBQUcsYUFBYSxHQUFHLE9BQU87UUFDcEMsQ0FBQyxtQkFBQSxJQUFJLEVBQU8sQ0FBQyxDQUFFLE1BQU0sQ0FBRSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDNUMsQ0FBQzs7Ozs7SUFFTSxtQkFBbUIsQ0FBQyxJQUFZO1FBQ3JDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUMsQ0FBQztRQUMvQixJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDO1FBQ25CLElBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUMxRSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzdFLENBQUM7Ozs7O0lBRU0saUJBQWlCLENBQUMsTUFBb0Q7UUFDM0UsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztRQUN4QixJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDMUIsQ0FBQztDQUNGOzs7SUEzQkMsMENBQTZCOztJQUM3Qiw4QkFBaUI7O0lBQ2pCLDhCQUFvQjs7SUFDcEIsOEJBQW9COztJQUNwQixpQ0FBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBpc0VsZW1lbnQobm9kZTogYW55KTogYm9vbGVhbiB7XG4gIHJldHVybiAhIShub2RlICYmIChub2RlLm5vZGVOYW1lIHx8IG5vZGUucHJvcCAmJiBub2RlLmF0dHIgJiYgbm9kZS5maW5kKSk7XG59XG5cbmV4cG9ydCBjbGFzcyBGaWxlTGlrZU9iamVjdCB7XG4gIHB1YmxpYyBsYXN0TW9kaWZpZWREYXRlOiBhbnk7XG4gIHB1YmxpYyBzaXplOiBhbnk7XG4gIHB1YmxpYyB0eXBlOiBzdHJpbmc7XG4gIHB1YmxpYyBuYW1lOiBzdHJpbmc7XG4gIHB1YmxpYyByYXdGaWxlOiBzdHJpbmc7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKGZpbGVPcklucHV0OiBhbnkpIHtcbiAgICB0aGlzLnJhd0ZpbGUgPSBmaWxlT3JJbnB1dDtcbiAgICBsZXQgaXNJbnB1dCA9IGlzRWxlbWVudChmaWxlT3JJbnB1dCk7XG4gICAgbGV0IGZha2VQYXRoT3JPYmplY3QgPSBpc0lucHV0ID8gZmlsZU9ySW5wdXQudmFsdWUgOiBmaWxlT3JJbnB1dDtcbiAgICBsZXQgcG9zdGZpeCA9IHR5cGVvZiBmYWtlUGF0aE9yT2JqZWN0ID09PSAnc3RyaW5nJyA/ICdGYWtlUGF0aCcgOiAnT2JqZWN0JztcbiAgICBsZXQgbWV0aG9kID0gJ19jcmVhdGVGcm9tJyArIHBvc3RmaXg7XG4gICAgKHRoaXMgYXMgYW55KVsgbWV0aG9kIF0oZmFrZVBhdGhPck9iamVjdCk7XG4gIH1cblxuICBwdWJsaWMgX2NyZWF0ZUZyb21GYWtlUGF0aChwYXRoOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLmxhc3RNb2RpZmllZERhdGUgPSB2b2lkIDA7XG4gICAgdGhpcy5zaXplID0gdm9pZCAwO1xuICAgIHRoaXMudHlwZSA9ICdsaWtlLycgKyBwYXRoLnNsaWNlKHBhdGgubGFzdEluZGV4T2YoJy4nKSArIDEpLnRvTG93ZXJDYXNlKCk7XG4gICAgdGhpcy5uYW1lID0gcGF0aC5zbGljZShwYXRoLmxhc3RJbmRleE9mKCcvJykgKyBwYXRoLmxhc3RJbmRleE9mKCdcXFxcJykgKyAyKTtcbiAgfVxuXG4gIHB1YmxpYyBfY3JlYXRlRnJvbU9iamVjdChvYmplY3Q6IHsgc2l6ZTogbnVtYmVyLCB0eXBlOiBzdHJpbmcsIG5hbWU6IHN0cmluZyB9KTogdm9pZCB7XG4gICAgdGhpcy5zaXplID0gb2JqZWN0LnNpemU7XG4gICAgdGhpcy50eXBlID0gb2JqZWN0LnR5cGU7XG4gICAgdGhpcy5uYW1lID0gb2JqZWN0Lm5hbWU7XG4gIH1cbn1cbiJdfQ==