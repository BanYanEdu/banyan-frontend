/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @return {?}
 */
export function DefaultSelectionModelFactory() {
    return new DefaultSelectionModel();
}
/**
 * @record
 */
export function SelectionModel() { }
if (false) {
    /** @type {?} */
    SelectionModel.prototype.value;
    /**
     * @param {?} item
     * @param {?} multiple
     * @param {?} selectableGroupAsModel
     * @return {?}
     */
    SelectionModel.prototype.select = function (item, multiple, selectableGroupAsModel) { };
    /**
     * @param {?} item
     * @param {?} multiple
     * @return {?}
     */
    SelectionModel.prototype.unselect = function (item, multiple) { };
    /**
     * @return {?}
     */
    SelectionModel.prototype.clear = function () { };
}
export class DefaultSelectionModel {
    constructor() {
        this._selected = [];
    }
    /**
     * @return {?}
     */
    get value() {
        return this._selected;
    }
    /**
     * @param {?} item
     * @param {?} multiple
     * @param {?} groupAsModel
     * @return {?}
     */
    select(item, multiple, groupAsModel) {
        item.selected = true;
        if (groupAsModel || !item.children) {
            this._selected.push(item);
        }
        if (multiple) {
            if (item.parent) {
                /** @type {?} */
                const childrenCount = item.parent.children.length;
                /** @type {?} */
                const selectedCount = item.parent.children.filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                x => x.selected)).length;
                item.parent.selected = childrenCount === selectedCount;
            }
            else if (item.children) {
                this._setChildrenSelectedState(item.children, true);
                this._removeChildren(item);
                if (!groupAsModel) {
                    this._selected = [...this._selected, ...item.children];
                }
            }
        }
    }
    /**
     * @param {?} item
     * @param {?} multiple
     * @return {?}
     */
    unselect(item, multiple) {
        this._selected = this._selected.filter((/**
         * @param {?} x
         * @return {?}
         */
        x => x !== item));
        item.selected = false;
        if (multiple) {
            if (item.parent && item.parent.selected) {
                /** @type {?} */
                const children = item.parent.children;
                this._removeParent(item.parent);
                this._removeChildren(item.parent);
                this._selected.push(...children.filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                x => x !== item)));
                item.parent.selected = false;
            }
            else if (item.children) {
                this._setChildrenSelectedState(item.children, false);
                this._removeChildren(item);
            }
        }
    }
    /**
     * @return {?}
     */
    clear() {
        this._selected = this._selected.filter((/**
         * @param {?} x
         * @return {?}
         */
        x => x.disabled));
    }
    /**
     * @private
     * @param {?} children
     * @param {?} selected
     * @return {?}
     */
    _setChildrenSelectedState(children, selected) {
        children.forEach((/**
         * @param {?} x
         * @return {?}
         */
        x => x.selected = selected));
    }
    /**
     * @private
     * @param {?} parent
     * @return {?}
     */
    _removeChildren(parent) {
        this._selected = this._selected.filter((/**
         * @param {?} x
         * @return {?}
         */
        x => x.parent !== parent));
    }
    /**
     * @private
     * @param {?} parent
     * @return {?}
     */
    _removeParent(parent) {
        this._selected = this._selected.filter((/**
         * @param {?} x
         * @return {?}
         */
        x => x !== parent));
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    DefaultSelectionModel.prototype._selected;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLW1vZGVsLmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC11aS8iLCJzb3VyY2VzIjpbInNyYy9uZy1zZWxlY3QvbW9kZWwvc2VsZWN0aW9uLW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFJQSxNQUFNLFVBQVUsNEJBQTRCO0lBQ3hDLE9BQU8sSUFBSSxxQkFBcUIsRUFBRSxDQUFDO0FBQ3ZDLENBQUM7Ozs7QUFFRCxvQ0FLQzs7O0lBSkcsK0JBQWtCOzs7Ozs7O0lBQ2xCLHdGQUEyRTs7Ozs7O0lBQzNFLGtFQUE0Qzs7OztJQUM1QyxpREFBUTs7QUFHWixNQUFNLE9BQU8scUJBQXFCO0lBQWxDO1FBQ1ksY0FBUyxHQUFlLEVBQUUsQ0FBQztJQTBEdkMsQ0FBQzs7OztJQXhERyxJQUFJLEtBQUs7UUFDTCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQzs7Ozs7OztJQUVELE1BQU0sQ0FBQyxJQUFjLEVBQUUsUUFBaUIsRUFBRSxZQUFxQjtRQUMzRCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNyQixJQUFJLFlBQVksSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDaEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDN0I7UUFDRCxJQUFJLFFBQVEsRUFBRTtZQUNWLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTs7c0JBQ1AsYUFBYSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU07O3NCQUMzQyxhQUFhLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTTs7OztnQkFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUMsQ0FBQyxNQUFNO2dCQUN6RSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsR0FBRyxhQUFhLEtBQUssYUFBYSxDQUFDO2FBQzFEO2lCQUFNLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDdEIsSUFBSSxDQUFDLHlCQUF5QixDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQ3BELElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzNCLElBQUksQ0FBQyxZQUFZLEVBQUU7b0JBQ2YsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztpQkFDMUQ7YUFDSjtTQUNKO0lBQ0wsQ0FBQzs7Ozs7O0lBRUQsUUFBUSxDQUFDLElBQWMsRUFBRSxRQUFpQjtRQUN0QyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTTs7OztRQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksRUFBQyxDQUFDO1FBQ3hELElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLElBQUksUUFBUSxFQUFFO1lBQ1YsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFOztzQkFDL0IsUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUTtnQkFDckMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ2hDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNsQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNOzs7O2dCQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksRUFBQyxDQUFDLENBQUM7Z0JBQ3pELElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQzthQUNoQztpQkFBTSxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ3RCLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUNyRCxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQzlCO1NBQ0o7SUFDTCxDQUFDOzs7O0lBRUQsS0FBSztRQUNELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNOzs7O1FBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFDLENBQUM7SUFDNUQsQ0FBQzs7Ozs7OztJQUVPLHlCQUF5QixDQUFDLFFBQW9CLEVBQUUsUUFBaUI7UUFDckUsUUFBUSxDQUFDLE9BQU87Ozs7UUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLEdBQUcsUUFBUSxFQUFDLENBQUM7SUFDakQsQ0FBQzs7Ozs7O0lBRU8sZUFBZSxDQUFDLE1BQWdCO1FBQ3BDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNOzs7O1FBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxLQUFLLE1BQU0sRUFBQyxDQUFDO0lBQ3JFLENBQUM7Ozs7OztJQUVPLGFBQWEsQ0FBQyxNQUFnQjtRQUNsQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTTs7OztRQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLE1BQU0sRUFBQyxDQUFBO0lBQzdELENBQUM7Q0FDSjs7Ozs7O0lBMURHLDBDQUFtQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nT3B0aW9uIH0gZnJvbSAnLi9uZy1zZWxlY3QudHlwZXMnO1xuXG5leHBvcnQgdHlwZSBTZWxlY3Rpb25Nb2RlbEZhY3RvcnkgPSAoKSA9PiBTZWxlY3Rpb25Nb2RlbDtcblxuZXhwb3J0IGZ1bmN0aW9uIERlZmF1bHRTZWxlY3Rpb25Nb2RlbEZhY3RvcnkoKSB7XG4gICAgcmV0dXJuIG5ldyBEZWZhdWx0U2VsZWN0aW9uTW9kZWwoKTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTZWxlY3Rpb25Nb2RlbCB7XG4gICAgdmFsdWU6IE5nT3B0aW9uW107XG4gICAgc2VsZWN0KGl0ZW06IE5nT3B0aW9uLCBtdWx0aXBsZTogYm9vbGVhbiwgc2VsZWN0YWJsZUdyb3VwQXNNb2RlbDogYm9vbGVhbik7XG4gICAgdW5zZWxlY3QoaXRlbTogTmdPcHRpb24sIG11bHRpcGxlOiBib29sZWFuKTtcbiAgICBjbGVhcigpO1xufVxuXG5leHBvcnQgY2xhc3MgRGVmYXVsdFNlbGVjdGlvbk1vZGVsIGltcGxlbWVudHMgU2VsZWN0aW9uTW9kZWwge1xuICAgIHByaXZhdGUgX3NlbGVjdGVkOiBOZ09wdGlvbltdID0gW107XG5cbiAgICBnZXQgdmFsdWUoKTogTmdPcHRpb25bXSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZDtcbiAgICB9XG5cbiAgICBzZWxlY3QoaXRlbTogTmdPcHRpb24sIG11bHRpcGxlOiBib29sZWFuLCBncm91cEFzTW9kZWw6IGJvb2xlYW4pIHtcbiAgICAgICAgaXRlbS5zZWxlY3RlZCA9IHRydWU7XG4gICAgICAgIGlmIChncm91cEFzTW9kZWwgfHwgIWl0ZW0uY2hpbGRyZW4pIHtcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkLnB1c2goaXRlbSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG11bHRpcGxlKSB7XG4gICAgICAgICAgICBpZiAoaXRlbS5wYXJlbnQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjaGlsZHJlbkNvdW50ID0gaXRlbS5wYXJlbnQuY2hpbGRyZW4ubGVuZ3RoO1xuICAgICAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkQ291bnQgPSBpdGVtLnBhcmVudC5jaGlsZHJlbi5maWx0ZXIoeCA9PiB4LnNlbGVjdGVkKS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgaXRlbS5wYXJlbnQuc2VsZWN0ZWQgPSBjaGlsZHJlbkNvdW50ID09PSBzZWxlY3RlZENvdW50O1xuICAgICAgICAgICAgfSBlbHNlIGlmIChpdGVtLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2V0Q2hpbGRyZW5TZWxlY3RlZFN0YXRlKGl0ZW0uY2hpbGRyZW4sIHRydWUpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbW92ZUNoaWxkcmVuKGl0ZW0pO1xuICAgICAgICAgICAgICAgIGlmICghZ3JvdXBBc01vZGVsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkID0gWy4uLnRoaXMuX3NlbGVjdGVkLCAuLi5pdGVtLmNoaWxkcmVuXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1bnNlbGVjdChpdGVtOiBOZ09wdGlvbiwgbXVsdGlwbGU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fc2VsZWN0ZWQgPSB0aGlzLl9zZWxlY3RlZC5maWx0ZXIoeCA9PiB4ICE9PSBpdGVtKTtcbiAgICAgICAgaXRlbS5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICBpZiAobXVsdGlwbGUpIHtcbiAgICAgICAgICAgIGlmIChpdGVtLnBhcmVudCAmJiBpdGVtLnBhcmVudC5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNoaWxkcmVuID0gaXRlbS5wYXJlbnQuY2hpbGRyZW47XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVtb3ZlUGFyZW50KGl0ZW0ucGFyZW50KTtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW1vdmVDaGlsZHJlbihpdGVtLnBhcmVudCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWQucHVzaCguLi5jaGlsZHJlbi5maWx0ZXIoeCA9PiB4ICE9PSBpdGVtKSk7XG4gICAgICAgICAgICAgICAgaXRlbS5wYXJlbnQuc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXRlbS5jaGlsZHJlbikge1xuICAgICAgICAgICAgICAgIHRoaXMuX3NldENoaWxkcmVuU2VsZWN0ZWRTdGF0ZShpdGVtLmNoaWxkcmVuLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVtb3ZlQ2hpbGRyZW4oaXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGVhcigpIHtcbiAgICAgICAgdGhpcy5fc2VsZWN0ZWQgPSB0aGlzLl9zZWxlY3RlZC5maWx0ZXIoeCA9PiB4LmRpc2FibGVkKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9zZXRDaGlsZHJlblNlbGVjdGVkU3RhdGUoY2hpbGRyZW46IE5nT3B0aW9uW10sIHNlbGVjdGVkOiBib29sZWFuKSB7XG4gICAgICAgIGNoaWxkcmVuLmZvckVhY2goeCA9PiB4LnNlbGVjdGVkID0gc2VsZWN0ZWQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3JlbW92ZUNoaWxkcmVuKHBhcmVudDogTmdPcHRpb24pIHtcbiAgICAgICAgdGhpcy5fc2VsZWN0ZWQgPSB0aGlzLl9zZWxlY3RlZC5maWx0ZXIoeCA9PiB4LnBhcmVudCAhPT0gcGFyZW50KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9yZW1vdmVQYXJlbnQocGFyZW50OiBOZ09wdGlvbikge1xuICAgICAgICB0aGlzLl9zZWxlY3RlZCA9IHRoaXMuX3NlbGVjdGVkLmZpbHRlcih4ID0+IHggIT09IHBhcmVudClcbiAgICB9XG59XG4iXX0=