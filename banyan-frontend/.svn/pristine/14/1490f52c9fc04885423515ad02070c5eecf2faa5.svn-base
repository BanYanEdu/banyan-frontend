/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as searchHelper from '../utils/search-helper';
import { isDefined, isFunction, isObject } from '../utils/value-utils';
import { newId } from './id';
export class ItemsList {
    /**
     * @param {?} _ngSelect
     * @param {?} _selectionModel
     */
    constructor(_ngSelect, _selectionModel) {
        this._ngSelect = _ngSelect;
        this._selectionModel = _selectionModel;
        this._items = [];
        this._filteredItems = [];
        this._markedIndex = -1;
    }
    /**
     * @return {?}
     */
    get items() {
        return this._items;
    }
    /**
     * @return {?}
     */
    get filteredItems() {
        return this._filteredItems;
    }
    /**
     * @return {?}
     */
    get markedIndex() {
        return this._markedIndex;
    }
    /**
     * @return {?}
     */
    get selectedItems() {
        return this._selectionModel.value;
    }
    /**
     * @return {?}
     */
    get markedItem() {
        return this._filteredItems[this._markedIndex];
    }
    /**
     * @return {?}
     */
    get noItemsToSelect() {
        return this._ngSelect.hideSelected && this._items.length === this.selectedItems.length;
    }
    /**
     * @return {?}
     */
    get maxItemsSelected() {
        return this._ngSelect.multiple && this._ngSelect.maxSelectedItems <= this.selectedItems.length;
    }
    /**
     * @return {?}
     */
    get lastSelectedItem() {
        /** @type {?} */
        let i = this.selectedItems.length - 1;
        for (; i >= 0; i--) {
            /** @type {?} */
            let item = this.selectedItems[i];
            if (!item.disabled) {
                return item;
            }
        }
        return null;
    }
    /**
     * @param {?} items
     * @return {?}
     */
    setItems(items) {
        this._items = items.map((/**
         * @param {?} item
         * @param {?} index
         * @return {?}
         */
        (item, index) => this.mapItem(item, index)));
        if (this._ngSelect.groupBy) {
            this._groups = this._groupBy(this._items, this._ngSelect.groupBy);
            this._items = this._flatten(this._groups);
        }
        else {
            this._groups = new Map();
            this._groups.set(undefined, this._items);
        }
        this._filteredItems = [...this._items];
    }
    /**
     * @param {?} item
     * @return {?}
     */
    select(item) {
        if (item.selected || this.maxItemsSelected) {
            return;
        }
        /** @type {?} */
        const multiple = this._ngSelect.multiple;
        if (!multiple) {
            this.clearSelected();
        }
        this._selectionModel.select(item, multiple, this._ngSelect.selectableGroupAsModel);
        if (this._ngSelect.hideSelected && multiple) {
            this._hideSelected(item);
        }
    }
    /**
     * @param {?} item
     * @return {?}
     */
    unselect(item) {
        if (!item.selected) {
            return;
        }
        this._selectionModel.unselect(item, this._ngSelect.multiple);
        if (this._ngSelect.hideSelected && isDefined(item.index) && this._ngSelect.multiple) {
            this._showSelected(item);
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    findItem(value) {
        /** @type {?} */
        let findBy;
        if (this._ngSelect.compareWith) {
            findBy = (/**
             * @param {?} item
             * @return {?}
             */
            item => this._ngSelect.compareWith(item.value, value));
        }
        else if (this._ngSelect.bindValue) {
            findBy = (/**
             * @param {?} item
             * @return {?}
             */
            item => !item.children && this.resolveNested(item.value, this._ngSelect.bindValue) === value);
        }
        else {
            findBy = (/**
             * @param {?} item
             * @return {?}
             */
            item => item.value === value ||
                !item.children && item.label && item.label === this.resolveNested(value, this._ngSelect.bindLabel));
        }
        return this._items.find((/**
         * @param {?} item
         * @return {?}
         */
        item => findBy(item)));
    }
    /**
     * @param {?} item
     * @return {?}
     */
    addItem(item) {
        /** @type {?} */
        const option = this.mapItem(item, this._items.length);
        this._items.push(option);
        this._filteredItems.push(option);
        return option;
    }
    /**
     * @return {?}
     */
    clearSelected() {
        this._selectionModel.clear();
        this._items.forEach((/**
         * @param {?} item
         * @return {?}
         */
        (item) => {
            item.selected = false;
            item.marked = false;
        }));
        if (this._ngSelect.hideSelected) {
            this.resetFilteredItems();
        }
    }
    /**
     * @param {?} term
     * @return {?}
     */
    findByLabel(term) {
        term = searchHelper.stripSpecialChars(term).toLocaleLowerCase();
        return this.filteredItems.find((/**
         * @param {?} item
         * @return {?}
         */
        item => {
            /** @type {?} */
            const label = searchHelper.stripSpecialChars(item.label).toLocaleLowerCase();
            return label.substr(0, term.length) === term;
        }));
    }
    /**
     * @param {?} term
     * @return {?}
     */
    filter(term) {
        if (!term) {
            this.resetFilteredItems();
            return;
        }
        this._filteredItems = [];
        term = this._ngSelect.searchFn ? term : searchHelper.stripSpecialChars(term).toLocaleLowerCase();
        /** @type {?} */
        const match = this._ngSelect.searchFn || this._defaultSearchFn;
        /** @type {?} */
        const hideSelected = this._ngSelect.hideSelected;
        for (const key of Array.from(this._groups.keys())) {
            /** @type {?} */
            const matchedItems = [];
            for (const item of this._groups.get(key)) {
                if (hideSelected && (item.parent && item.parent.selected || item.selected)) {
                    continue;
                }
                /** @type {?} */
                const searchItem = this._ngSelect.searchFn ? item.value : item;
                if (match(term, searchItem)) {
                    matchedItems.push(item);
                }
            }
            if (matchedItems.length > 0) {
                const [last] = matchedItems.slice(-1);
                if (last.parent) {
                    /** @type {?} */
                    const head = this._items.find((/**
                     * @param {?} x
                     * @return {?}
                     */
                    x => x === last.parent));
                    this._filteredItems.push(head);
                }
                this._filteredItems.push(...matchedItems);
            }
        }
    }
    /**
     * @return {?}
     */
    resetFilteredItems() {
        if (this._filteredItems.length === this._items.length) {
            return;
        }
        if (this._ngSelect.hideSelected && this.selectedItems.length > 0) {
            this._filteredItems = this._items.filter((/**
             * @param {?} x
             * @return {?}
             */
            x => !x.selected));
        }
        else {
            this._filteredItems = this._items;
        }
    }
    /**
     * @return {?}
     */
    unmarkItem() {
        this._markedIndex = -1;
    }
    /**
     * @return {?}
     */
    markNextItem() {
        this._stepToItem(+1);
    }
    /**
     * @return {?}
     */
    markPreviousItem() {
        this._stepToItem(-1);
    }
    /**
     * @param {?} item
     * @return {?}
     */
    markItem(item) {
        this._markedIndex = this._filteredItems.indexOf(item);
    }
    /**
     * @param {?=} markDefault
     * @return {?}
     */
    markSelectedOrDefault(markDefault) {
        if (this._filteredItems.length === 0) {
            return;
        }
        /** @type {?} */
        const indexOfLastSelected = this._ngSelect.hideSelected ? -1 : this._filteredItems.indexOf(this.lastSelectedItem);
        if (this.lastSelectedItem && indexOfLastSelected > -1) {
            this._markedIndex = indexOfLastSelected;
        }
        else {
            if (this._ngSelect.excludeGroupsFromDefaultSelection) {
                this._markedIndex = markDefault ? this.filteredItems.findIndex((/**
                 * @param {?} x
                 * @return {?}
                 */
                x => !x.disabled && !x.children)) : -1;
            }
            else {
                this._markedIndex = markDefault ? this.filteredItems.findIndex((/**
                 * @param {?} x
                 * @return {?}
                 */
                x => !x.disabled)) : -1;
            }
        }
    }
    /**
     * @param {?} option
     * @param {?} key
     * @return {?}
     */
    resolveNested(option, key) {
        if (!isObject(option)) {
            return option;
        }
        if (key.indexOf('.') === -1) {
            return option[key];
        }
        else {
            /** @type {?} */
            let keys = key.split('.');
            /** @type {?} */
            let value = option;
            for (let i = 0, len = keys.length; i < len; ++i) {
                if (value == null) {
                    return null;
                }
                value = value[keys[i]];
            }
            return value;
        }
    }
    /**
     * @param {?} item
     * @param {?} index
     * @return {?}
     */
    mapItem(item, index) {
        /** @type {?} */
        const label = isDefined(item.$ngOptionLabel) ? item.$ngOptionLabel : this.resolveNested(item, this._ngSelect.bindLabel);
        /** @type {?} */
        const value = isDefined(item.$ngOptionValue) ? item.$ngOptionValue : item;
        return {
            index: index,
            label: isDefined(label) ? label.toString() : '',
            value: value,
            disabled: item.disabled,
            htmlId: newId(),
        };
    }
    /**
     * @return {?}
     */
    mapSelectedItems() {
        /** @type {?} */
        const multiple = this._ngSelect.multiple;
        for (const selected of this.selectedItems) {
            /** @type {?} */
            const value = this._ngSelect.bindValue ? this.resolveNested(selected.value, this._ngSelect.bindValue) : selected.value;
            /** @type {?} */
            const item = isDefined(value) ? this.findItem(value) : null;
            this._selectionModel.unselect(selected, multiple);
            this._selectionModel.select(item || selected, multiple, this._ngSelect.selectableGroupAsModel);
        }
        if (this._ngSelect.hideSelected) {
            this._filteredItems = this.filteredItems.filter((/**
             * @param {?} x
             * @return {?}
             */
            x => this.selectedItems.indexOf(x) === -1));
        }
    }
    /**
     * @private
     * @param {?} item
     * @return {?}
     */
    _showSelected(item) {
        this._filteredItems.push(item);
        if (item.parent) {
            /** @type {?} */
            const parent = item.parent;
            /** @type {?} */
            const parentExists = this._filteredItems.find((/**
             * @param {?} x
             * @return {?}
             */
            x => x === parent));
            if (!parentExists) {
                this._filteredItems.push(parent);
            }
        }
        else if (item.children) {
            for (const child of item.children) {
                child.selected = false;
                this._filteredItems.push(child);
            }
        }
        this._filteredItems = [...this._filteredItems.sort((/**
             * @param {?} a
             * @param {?} b
             * @return {?}
             */
            (a, b) => (a.index - b.index)))];
    }
    /**
     * @private
     * @param {?} item
     * @return {?}
     */
    _hideSelected(item) {
        this._filteredItems = this._filteredItems.filter((/**
         * @param {?} x
         * @return {?}
         */
        x => x !== item));
        if (item.parent) {
            /** @type {?} */
            const children = item.parent.children;
            if (children.every((/**
             * @param {?} x
             * @return {?}
             */
            x => x.selected))) {
                this._filteredItems = this._filteredItems.filter((/**
                 * @param {?} x
                 * @return {?}
                 */
                x => x !== item.parent));
            }
        }
        else if (item.children) {
            this._filteredItems = this.filteredItems.filter((/**
             * @param {?} x
             * @return {?}
             */
            x => x.parent !== item));
        }
    }
    /**
     * @private
     * @param {?} search
     * @param {?} opt
     * @return {?}
     */
    _defaultSearchFn(search, opt) {
        /** @type {?} */
        const label = searchHelper.stripSpecialChars(opt.label).toLocaleLowerCase();
        return label.indexOf(search) > -1;
    }
    /**
     * @private
     * @param {?} steps
     * @return {?}
     */
    _getNextItemIndex(steps) {
        if (steps > 0) {
            return (this._markedIndex === this._filteredItems.length - 1) ? 0 : (this._markedIndex + 1);
        }
        return (this._markedIndex <= 0) ? (this._filteredItems.length - 1) : (this._markedIndex - 1);
    }
    /**
     * @private
     * @param {?} steps
     * @return {?}
     */
    _stepToItem(steps) {
        if (this._filteredItems.length === 0 || this._filteredItems.every((/**
         * @param {?} x
         * @return {?}
         */
        x => x.disabled))) {
            return;
        }
        this._markedIndex = this._getNextItemIndex(steps);
        if (this.markedItem.disabled) {
            this._stepToItem(steps);
        }
    }
    /**
     * @private
     * @param {?} items
     * @param {?} prop
     * @return {?}
     */
    _groupBy(items, prop) {
        /** @type {?} */
        const groups = new Map();
        if (items.length === 0) {
            return groups;
        }
        // Check if items are already grouped by given key.
        if (Array.isArray(items[0].value[(/** @type {?} */ (prop))])) {
            for (const item of items) {
                /** @type {?} */
                const children = (item.value[(/** @type {?} */ (prop))] || []).map((/**
                 * @param {?} x
                 * @param {?} index
                 * @return {?}
                 */
                (x, index) => this.mapItem(x, index)));
                groups.set(item, children);
            }
            return groups;
        }
        /** @type {?} */
        const isFnKey = isFunction(this._ngSelect.groupBy);
        /** @type {?} */
        const keyFn = (/**
         * @param {?} item
         * @return {?}
         */
        (item) => {
            /** @type {?} */
            let key = isFnKey ? ((/** @type {?} */ (prop)))(item.value) : item.value[(/** @type {?} */ (prop))];
            return isDefined(key) ? key : undefined;
        });
        // Group items by key.
        for (const item of items) {
            /** @type {?} */
            let key = keyFn(item);
            /** @type {?} */
            const group = groups.get(key);
            if (group) {
                group.push(item);
            }
            else {
                groups.set(key, [item]);
            }
        }
        return groups;
    }
    /**
     * @private
     * @param {?} groups
     * @return {?}
     */
    _flatten(groups) {
        /** @type {?} */
        const isGroupByFn = isFunction(this._ngSelect.groupBy);
        /** @type {?} */
        const items = [];
        /** @type {?} */
        const withoutGroup = groups.get(undefined) || [];
        items.push(...withoutGroup);
        /** @type {?} */
        let i = withoutGroup.length;
        for (const key of Array.from(groups.keys())) {
            if (!isDefined(key)) {
                continue;
            }
            /** @type {?} */
            const isObjectKey = isObject(key);
            /** @type {?} */
            const parent = {
                label: isObjectKey ? '' : (/** @type {?} */ (key)),
                children: undefined,
                parent: null,
                index: i++,
                disabled: !this._ngSelect.selectableGroup,
                htmlId: newId(),
            };
            /** @type {?} */
            const groupKey = isGroupByFn ? this._ngSelect.bindLabel : (/** @type {?} */ (this._ngSelect.groupBy));
            /** @type {?} */
            const groupValue = this._ngSelect.groupValue || ((/**
             * @return {?}
             */
            () => {
                if (isObjectKey) {
                    return ((/** @type {?} */ (key))).value;
                }
                return { [groupKey]: key };
            }));
            /** @type {?} */
            const children = groups.get(key).map((/**
             * @param {?} x
             * @return {?}
             */
            x => {
                x.parent = parent;
                x.children = undefined;
                x.index = i++;
                return x;
            }));
            parent.children = children;
            parent.value = groupValue(key, children.map((/**
             * @param {?} x
             * @return {?}
             */
            x => x.value)));
            items.push(parent);
            items.push(...children);
        }
        return items;
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    ItemsList.prototype._groups;
    /**
     * @type {?}
     * @private
     */
    ItemsList.prototype._items;
    /**
     * @type {?}
     * @private
     */
    ItemsList.prototype._filteredItems;
    /**
     * @type {?}
     * @private
     */
    ItemsList.prototype._markedIndex;
    /**
     * @type {?}
     * @private
     */
    ItemsList.prototype._ngSelect;
    /**
     * @type {?}
     * @private
     */
    ItemsList.prototype._selectionModel;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbXMtbGlzdC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtdWkvIiwic291cmNlcyI6WyJzcmMvbmctc2VsZWN0L21vZGVsL2l0ZW1zLWxpc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sS0FBSyxZQUFZLE1BQU0sd0JBQXdCLENBQUM7QUFFdkQsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDdkUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUs3QixNQUFNLE9BQU8sU0FBUzs7Ozs7SUFHbEIsWUFDWSxTQUE0QixFQUM1QixlQUErQjtRQUQvQixjQUFTLEdBQVQsU0FBUyxDQUFtQjtRQUM1QixvQkFBZSxHQUFmLGVBQWUsQ0FBZ0I7UUFHbkMsV0FBTSxHQUFlLEVBQUUsQ0FBQztRQU14QixtQkFBYyxHQUFlLEVBQUUsQ0FBQztRQU1oQyxpQkFBWSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBZDFCLENBQUM7Ozs7SUFJRCxJQUFJLEtBQUs7UUFDTCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDdkIsQ0FBQzs7OztJQUlELElBQUksYUFBYTtRQUNiLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQztJQUMvQixDQUFDOzs7O0lBSUQsSUFBSSxXQUFXO1FBQ1gsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzdCLENBQUM7Ozs7SUFFRCxJQUFJLGFBQWE7UUFDYixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDO0lBQ3RDLENBQUM7Ozs7SUFFRCxJQUFJLFVBQVU7UUFDVixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ2xELENBQUM7Ozs7SUFFRCxJQUFJLGVBQWU7UUFDZixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxL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LG1DQUF3Qzs7Ozs7SUFNeEMsaUNBQTBCOzs7OztJQWhCdEIsOEJBQW9DOzs7OztJQUNwQyxvQ0FBdUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ09wdGlvbiB9IGZyb20gJy4vbmctc2VsZWN0LnR5cGVzJztcbmltcG9ydCAqIGFzIHNlYXJjaEhlbHBlciBmcm9tICcuLi91dGlscy9zZWFyY2gtaGVscGVyJztcbmltcG9ydCB7IE5nU2VsZWN0Q29tcG9uZW50IH0gZnJvbSAnLi4vY29tcG9uZW50cy9zZWxlY3Qvbmctc2VsZWN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBpc0RlZmluZWQsIGlzRnVuY3Rpb24sIGlzT2JqZWN0IH0gZnJvbSAnLi4vdXRpbHMvdmFsdWUtdXRpbHMnO1xuaW1wb3J0IHsgbmV3SWQgfSBmcm9tICcuL2lkJztcbmltcG9ydCB7IFNlbGVjdGlvbk1vZGVsIH0gZnJvbSAnLi9zZWxlY3Rpb24tbW9kZWwnO1xuXG50eXBlIE9wdGlvbkdyb3VwcyA9IE1hcDxzdHJpbmcgfCBOZ09wdGlvbiwgTmdPcHRpb25bXT47XG5cbmV4cG9ydCBjbGFzcyBJdGVtc0xpc3Qge1xuICAgIHByaXZhdGUgX2dyb3VwczogT3B0aW9uR3JvdXBzO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgX25nU2VsZWN0OiBOZ1NlbGVjdENvbXBvbmVudCxcbiAgICAgICAgcHJpdmF0ZSBfc2VsZWN0aW9uTW9kZWw6IFNlbGVjdGlvbk1vZGVsKSB7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaXRlbXM6IE5nT3B0aW9uW10gPSBbXTtcblxuICAgIGdldCBpdGVtcygpOiBOZ09wdGlvbltdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2l0ZW1zO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2ZpbHRlcmVkSXRlbXM6IE5nT3B0aW9uW10gPSBbXTtcblxuICAgIGdldCBmaWx0ZXJlZEl0ZW1zKCk6IE5nT3B0aW9uW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5fZmlsdGVyZWRJdGVtcztcbiAgICB9XG5cbiAgICBwcml2YXRlIF9tYXJrZWRJbmRleCA9IC0xO1xuXG4gICAgZ2V0IG1hcmtlZEluZGV4KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXJrZWRJbmRleDtcbiAgICB9XG5cbiAgICBnZXQgc2VsZWN0ZWRJdGVtcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbGVjdGlvbk1vZGVsLnZhbHVlO1xuICAgIH1cblxuICAgIGdldCBtYXJrZWRJdGVtKCk6IE5nT3B0aW9uIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZpbHRlcmVkSXRlbXNbdGhpcy5fbWFya2VkSW5kZXhdO1xuICAgIH1cblxuICAgIGdldCBub0l0ZW1zVG9TZWxlY3QoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9uZ1NlbGVjdC5oaWRlU2VsZWN0ZWQgJiYgdGhpcy5faXRlbXMubGVuZ3RoID09PSB0aGlzLnNlbGVjdGVkSXRlbXMubGVuZ3RoO1xuICAgIH1cblxuICAgIGdldCBtYXhJdGVtc1NlbGVjdGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fbmdTZWxlY3QubXVsdGlwbGUgJiYgdGhpcy5fbmdTZWxlY3QubWF4U2VsZWN0ZWRJdGVtcyA8PSB0aGlzLnNlbGVjdGVkSXRlbXMubGVuZ3RoO1xuICAgIH1cblxuICAgIGdldCBsYXN0U2VsZWN0ZWRJdGVtKCkge1xuICAgICAgICBsZXQgaSA9IHRoaXMuc2VsZWN0ZWRJdGVtcy5sZW5ndGggLSAxO1xuICAgICAgICBmb3IgKDsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5zZWxlY3RlZEl0ZW1zW2ldO1xuICAgICAgICAgICAgaWYgKCFpdGVtLmRpc2FibGVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgc2V0SXRlbXMoaXRlbXM6IGFueVtdKSB7XG4gICAgICAgIHRoaXMuX2l0ZW1zID0gaXRlbXMubWFwKChpdGVtLCBpbmRleCkgPT4gdGhpcy5tYXBJdGVtKGl0ZW0sIGluZGV4KSk7XG4gICAgICAgIGlmICh0aGlzLl9uZ1NlbGVjdC5ncm91cEJ5KSB7XG4gICAgICAgICAgICB0aGlzLl9ncm91cHMgPSB0aGlzLl9ncm91cEJ5KHRoaXMuX2l0ZW1zLCB0aGlzLl9uZ1NlbGVjdC5ncm91cEJ5KTtcbiAgICAgICAgICAgIHRoaXMuX2l0ZW1zID0gdGhpcy5fZmxhdHRlbih0aGlzLl9ncm91cHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fZ3JvdXBzID0gbmV3IE1hcCgpO1xuICAgICAgICAgICAgdGhpcy5fZ3JvdXBzLnNldCh1bmRlZmluZWQsIHRoaXMuX2l0ZW1zKVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2ZpbHRlcmVkSXRlbXMgPSBbLi4udGhpcy5faXRlbXNdO1xuICAgIH1cblxuICAgIHNlbGVjdChpdGVtOiBOZ09wdGlvbikge1xuICAgICAgICBpZiAoaXRlbS5zZWxlY3RlZCB8fCB0aGlzLm1heEl0ZW1zU2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBtdWx0aXBsZSA9IHRoaXMuX25nU2VsZWN0Lm11bHRpcGxlO1xuICAgICAgICBpZiAoIW11bHRpcGxlKSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFyU2VsZWN0ZWQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3NlbGVjdGlvbk1vZGVsLnNlbGVjdChpdGVtLCBtdWx0aXBsZSwgdGhpcy5fbmdTZWxlY3Quc2VsZWN0YWJsZUdyb3VwQXNNb2RlbCk7XG4gICAgICAgIGlmICh0aGlzLl9uZ1NlbGVjdC5oaWRlU2VsZWN0ZWQgJiYgbXVsdGlwbGUpIHtcbiAgICAgICAgICAgIHRoaXMuX2hpZGVTZWxlY3RlZChpdGVtKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVuc2VsZWN0KGl0ZW06IE5nT3B0aW9uKSB7XG4gICAgICAgIGlmICghaXRlbS5zZWxlY3RlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3NlbGVjdGlvbk1vZGVsLnVuc2VsZWN0KGl0ZW0sIHRoaXMuX25nU2VsZWN0Lm11bHRpcGxlKTtcbiAgICAgICAgaWYgKHRoaXMuX25nU2VsZWN0LmhpZGVTZWxlY3RlZCAmJiBpc0RlZmluZWQoaXRlbS5pbmRleCkgJiYgdGhpcy5fbmdTZWxlY3QubXVsdGlwbGUpIHtcbiAgICAgICAgICAgIHRoaXMuX3Nob3dTZWxlY3RlZChpdGVtKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZpbmRJdGVtKHZhbHVlOiBhbnkpOiBOZ09wdGlvbiB7XG4gICAgICAgIGxldCBmaW5kQnk6IChpdGVtOiBOZ09wdGlvbikgPT4gYm9vbGVhbjtcbiAgICAgICAgaWYgKHRoaXMuX25nU2VsZWN0LmNvbXBhcmVXaXRoKSB7XG4gICAgICAgICAgICBmaW5kQnkgPSBpdGVtID0+IHRoaXMuX25nU2VsZWN0LmNvbXBhcmVXaXRoKGl0ZW0udmFsdWUsIHZhbHVlKVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX25nU2VsZWN0LmJpbmRWYWx1ZSkge1xuICAgICAgICAgICAgZmluZEJ5ID0gaXRlbSA9PiAhaXRlbS5jaGlsZHJlbiAmJiB0aGlzLnJlc29sdmVOZXN0ZWQoaXRlbS52YWx1ZSwgdGhpcy5fbmdTZWxlY3QuYmluZFZhbHVlKSA9PT0gdmFsdWVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZpbmRCeSA9IGl0ZW0gPT4gaXRlbS52YWx1ZSA9PT0gdmFsdWUgfHxcbiAgICAgICAgICAgICAgICAhaXRlbS5jaGlsZHJlbiAmJiBpdGVtLmxhYmVsICYmIGl0ZW0ubGFiZWwgPT09IHRoaXMucmVzb2x2ZU5lc3RlZCh2YWx1ZSwgdGhpcy5fbmdTZWxlY3QuYmluZExhYmVsKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9pdGVtcy5maW5kKGl0ZW0gPT4gZmluZEJ5KGl0ZW0pKTtcbiAgICB9XG5cbiAgICBhZGRJdGVtKGl0ZW06IGFueSkge1xuICAgICAgICBjb25zdCBvcHRpb24gPSB0aGlzLm1hcEl0ZW0oaXRlbSwgdGhpcy5faXRlbXMubGVuZ3RoKTtcbiAgICAgICAgdGhpcy5faXRlbXMucHVzaChvcHRpb24pO1xuICAgICAgICB0aGlzLl9maWx0ZXJlZEl0ZW1zLnB1c2gob3B0aW9uKTtcbiAgICAgICAgcmV0dXJuIG9wdGlvbjtcbiAgICB9XG5cbiAgICBjbGVhclNlbGVjdGVkKCkge1xuICAgICAgICB0aGlzLl9zZWxlY3Rpb25Nb2RlbC5jbGVhcigpO1xuICAgICAgICB0aGlzLl9pdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBpdGVtLnNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICBpdGVtLm1hcmtlZCA9IGZhbHNlO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKHRoaXMuX25nU2VsZWN0LmhpZGVTZWxlY3RlZCkge1xuICAgICAgICAgICAgdGhpcy5yZXNldEZpbHRlcmVkSXRlbXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZpbmRCeUxhYmVsKHRlcm06IHN0cmluZykge1xuICAgICAgICB0ZXJtID0gc2VhcmNoSGVscGVyLnN0cmlwU3BlY2lhbENoYXJzKHRlcm0pLnRvTG9jYWxlTG93ZXJDYXNlKCk7XG4gICAgICAgIHJldHVybiB0aGlzLmZpbHRlcmVkSXRlbXMuZmluZChpdGVtID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGxhYmVsID0gc2VhcmNoSGVscGVyLnN0cmlwU3BlY2lhbENoYXJzKGl0ZW0ubGFiZWwpLnRvTG9jYWxlTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICByZXR1cm4gbGFiZWwuc3Vic3RyKDAsIHRlcm0ubGVuZ3RoKSA9PT0gdGVybTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZmlsdGVyKHRlcm06IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBpZiAoIXRlcm0pIHtcbiAgICAgICAgICAgIHRoaXMucmVzZXRGaWx0ZXJlZEl0ZW1zKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9maWx0ZXJlZEl0ZW1zID0gW107XG4gICAgICAgIHRlcm0gPSB0aGlzLl9uZ1NlbGVjdC5zZWFyY2hGbiA/IHRlcm0gOiBzZWFyY2hIZWxwZXIuc3RyaXBTcGVjaWFsQ2hhcnModGVybSkudG9Mb2NhbGVMb3dlckNhc2UoKTtcbiAgICAgICAgY29uc3QgbWF0Y2ggPSB0aGlzLl9uZ1NlbGVjdC5zZWFyY2hGbiB8fCB0aGlzLl9kZWZhdWx0U2VhcmNoRm47XG4gICAgICAgIGNvbnN0IGhpZGVTZWxlY3RlZCA9IHRoaXMuX25nU2VsZWN0LmhpZGVTZWxlY3RlZDtcblxuICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBBcnJheS5mcm9tKHRoaXMuX2dyb3Vwcy5rZXlzKCkpKSB7XG4gICAgICAgICAgICBjb25zdCBtYXRjaGVkSXRlbXMgPSBbXTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiB0aGlzLl9ncm91cHMuZ2V0KGtleSkpIHtcbiAgICAgICAgICAgICAgICBpZiAoaGlkZVNlbGVjdGVkICYmIChpdGVtLnBhcmVudCAmJiBpdGVtLnBhcmVudC5zZWxlY3RlZCB8fCBpdGVtLnNlbGVjdGVkKSkge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3Qgc2VhcmNoSXRlbSA9IHRoaXMuX25nU2VsZWN0LnNlYXJjaEZuID8gaXRlbS52YWx1ZSA6IGl0ZW07XG4gICAgICAgICAgICAgICAgaWYgKG1hdGNoKHRlcm0sIHNlYXJjaEl0ZW0pKSB7XG4gICAgICAgICAgICAgICAgICAgIG1hdGNoZWRJdGVtcy5wdXNoKGl0ZW0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChtYXRjaGVkSXRlbXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IFtsYXN0XSA9IG1hdGNoZWRJdGVtcy5zbGljZSgtMSk7XG4gICAgICAgICAgICAgICAgaWYgKGxhc3QucGFyZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGhlYWQgPSB0aGlzLl9pdGVtcy5maW5kKHggPT4geCA9PT0gbGFzdC5wYXJlbnQpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9maWx0ZXJlZEl0ZW1zLnB1c2goaGVhZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuX2ZpbHRlcmVkSXRlbXMucHVzaCguLi5tYXRjaGVkSXRlbXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVzZXRGaWx0ZXJlZEl0ZW1zKCkge1xuICAgICAgICBpZiAodGhpcy5fZmlsdGVyZWRJdGVtcy5sZW5ndGggPT09IHRoaXMuX2l0ZW1zLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX25nU2VsZWN0LmhpZGVTZWxlY3RlZCAmJiB0aGlzLnNlbGVjdGVkSXRlbXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5fZmlsdGVyZWRJdGVtcyA9IHRoaXMuX2l0ZW1zLmZpbHRlcih4ID0+ICF4LnNlbGVjdGVkKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2ZpbHRlcmVkSXRlbXMgPSB0aGlzLl9pdGVtcztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVubWFya0l0ZW0oKSB7XG4gICAgICAgIHRoaXMuX21hcmtlZEluZGV4ID0gLTE7XG4gICAgfVxuXG4gICAgbWFya05leHRJdGVtKCkge1xuICAgICAgICB0aGlzLl9zdGVwVG9JdGVtKCsxKTtcbiAgICB9XG5cbiAgICBtYXJrUHJldmlvdXNJdGVtKCkge1xuICAgICAgICB0aGlzLl9zdGVwVG9JdGVtKC0xKTtcbiAgICB9XG5cbiAgICBtYXJrSXRlbShpdGVtOiBOZ09wdGlvbikge1xuICAgICAgICB0aGlzLl9tYXJrZWRJbmRleCA9IHRoaXMuX2ZpbHRlcmVkSXRlbXMuaW5kZXhPZihpdGVtKTtcbiAgICB9XG5cbiAgICBtYXJrU2VsZWN0ZWRPckRlZmF1bHQobWFya0RlZmF1bHQ/OiBib29sZWFuKSB7XG4gICAgICAgIGlmICh0aGlzLl9maWx0ZXJlZEl0ZW1zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGluZGV4T2ZMYXN0U2VsZWN0ZWQgPSB0aGlzLl9uZ1NlbGVjdC5oaWRlU2VsZWN0ZWQgPyAtMSA6IHRoaXMuX2ZpbHRlcmVkSXRlbXMuaW5kZXhPZih0aGlzLmxhc3RTZWxlY3RlZEl0ZW0pO1xuICAgICAgICBpZiAodGhpcy5sYXN0U2VsZWN0ZWRJdGVtICYmIGluZGV4T2ZMYXN0U2VsZWN0ZWQgPiAtMSkge1xuICAgICAgICAgICAgdGhpcy5fbWFya2VkSW5kZXggPSBpbmRleE9mTGFzdFNlbGVjdGVkO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMuX25nU2VsZWN0LmV4Y2x1ZGVHcm91cHNGcm9tRGVmYXVsdFNlbGVjdGlvbikge1xuICAgICAgICAgICAgICAgIHRoaXMuX21hcmtlZEluZGV4ID0gbWFya0RlZmF1bHQgPyB0aGlzLmZpbHRlcmVkSXRlbXMuZmluZEluZGV4KHggPT4gIXguZGlzYWJsZWQgJiYgIXguY2hpbGRyZW4pIDogLTE7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX21hcmtlZEluZGV4ID0gbWFya0RlZmF1bHQgPyB0aGlzLmZpbHRlcmVkSXRlbXMuZmluZEluZGV4KHggPT4gIXguZGlzYWJsZWQpIDogLTE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXNvbHZlTmVzdGVkKG9wdGlvbjogYW55LCBrZXk6IHN0cmluZyk6IGFueSB7XG4gICAgICAgIGlmICghaXNPYmplY3Qob3B0aW9uKSkge1xuICAgICAgICAgICAgcmV0dXJuIG9wdGlvbjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoa2V5LmluZGV4T2YoJy4nKSA9PT0gLTEpIHtcbiAgICAgICAgICAgIHJldHVybiBvcHRpb25ba2V5XTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBrZXlzOiBzdHJpbmdbXSA9IGtleS5zcGxpdCgnLicpO1xuICAgICAgICAgICAgbGV0IHZhbHVlID0gb3B0aW9uO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGtleXMubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZVtrZXlzW2ldXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG1hcEl0ZW0oaXRlbTogYW55LCBpbmRleDogbnVtYmVyKTogTmdPcHRpb24ge1xuICAgICAgICBjb25zdCBsYWJlbCA9IGlzRGVmaW5lZChpdGVtLiRuZ09wdGlvbkxhYmVsKSA/IGl0ZW0uJG5nT3B0aW9uTGFiZWwgOiB0aGlzLnJlc29sdmVOZXN0ZWQoaXRlbSwgdGhpcy5fbmdTZWxlY3QuYmluZExhYmVsKTtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBpc0RlZmluZWQoaXRlbS4kbmdPcHRpb25WYWx1ZSkgPyBpdGVtLiRuZ09wdGlvblZhbHVlIDogaXRlbTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgICAgICAgIGxhYmVsOiBpc0RlZmluZWQobGFiZWwpID8gbGFiZWwudG9TdHJpbmcoKSA6ICcnLFxuICAgICAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICAgICAgZGlzYWJsZWQ6IGl0ZW0uZGlzYWJsZWQsXG4gICAgICAgICAgICBodG1sSWQ6IG5ld0lkKCksXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgbWFwU2VsZWN0ZWRJdGVtcygpIHtcbiAgICAgICAgY29uc3QgbXVsdGlwbGUgPSB0aGlzLl9uZ1NlbGVjdC5tdWx0aXBsZTtcbiAgICAgICAgZm9yIChjb25zdCBzZWxlY3RlZCBvZiB0aGlzLnNlbGVjdGVkSXRlbXMpIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5fbmdTZWxlY3QuYmluZFZhbHVlID8gdGhpcy5yZXNvbHZlTmVzdGVkKHNlbGVjdGVkLnZhbHVlLCB0aGlzLl9uZ1NlbGVjdC5iaW5kVmFsdWUpIDogc2VsZWN0ZWQudmFsdWU7XG4gICAgICAgICAgICBjb25zdCBpdGVtID0gaXNEZWZpbmVkKHZhbHVlKSA/IHRoaXMuZmluZEl0ZW0odmFsdWUpIDogbnVsbDtcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGlvbk1vZGVsLnVuc2VsZWN0KHNlbGVjdGVkLCBtdWx0aXBsZSk7XG4gICAgICAgICAgICB0aGlzLl9zZWxlY3Rpb25Nb2RlbC5zZWxlY3QoaXRlbSB8fCBzZWxlY3RlZCwgbXVsdGlwbGUsIHRoaXMuX25nU2VsZWN0LnNlbGVjdGFibGVHcm91cEFzTW9kZWwpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX25nU2VsZWN0LmhpZGVTZWxlY3RlZCkge1xuICAgICAgICAgICAgdGhpcy5fZmlsdGVyZWRJdGVtcyA9IHRoaXMuZmlsdGVyZWRJdGVtcy5maWx0ZXIoeCA9PiB0aGlzLnNlbGVjdGVkSXRlbXMuaW5kZXhPZih4KSA9PT0gLTEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfc2hvd1NlbGVjdGVkKGl0ZW06IE5nT3B0aW9uKSB7XG4gICAgICAgIHRoaXMuX2ZpbHRlcmVkSXRlbXMucHVzaChpdGVtKTtcbiAgICAgICAgaWYgKGl0ZW0ucGFyZW50KSB7XG4gICAgICAgICAgICBjb25zdCBwYXJlbnQgPSBpdGVtLnBhcmVudDtcbiAgICAgICAgICAgIGNvbnN0IHBhcmVudEV4aXN0cyA9IHRoaXMuX2ZpbHRlcmVkSXRlbXMuZmluZCh4ID0+IHggPT09IHBhcmVudCk7XG4gICAgICAgICAgICBpZiAoIXBhcmVudEV4aXN0cykge1xuICAgICAgICAgICAgICAgIHRoaXMuX2ZpbHRlcmVkSXRlbXMucHVzaChwYXJlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGl0ZW0uY2hpbGRyZW4pIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgY2hpbGQgb2YgaXRlbS5jaGlsZHJlbikge1xuICAgICAgICAgICAgICAgIGNoaWxkLnNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5fZmlsdGVyZWRJdGVtcy5wdXNoKGNoaWxkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9maWx0ZXJlZEl0ZW1zID0gWy4uLnRoaXMuX2ZpbHRlcmVkSXRlbXMuc29ydCgoYSwgYikgPT4gKGEuaW5kZXggLSBiLmluZGV4KSldO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2hpZGVTZWxlY3RlZChpdGVtOiBOZ09wdGlvbikge1xuICAgICAgICB0aGlzLl9maWx0ZXJlZEl0ZW1zID0gdGhpcy5fZmlsdGVyZWRJdGVtcy5maWx0ZXIoeCA9PiB4ICE9PSBpdGVtKTtcbiAgICAgICAgaWYgKGl0ZW0ucGFyZW50KSB7XG4gICAgICAgICAgICBjb25zdCBjaGlsZHJlbiA9IGl0ZW0ucGFyZW50LmNoaWxkcmVuO1xuICAgICAgICAgICAgaWYgKGNoaWxkcmVuLmV2ZXJ5KHggPT4geC5zZWxlY3RlZCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9maWx0ZXJlZEl0ZW1zID0gdGhpcy5fZmlsdGVyZWRJdGVtcy5maWx0ZXIoeCA9PiB4ICE9PSBpdGVtLnBhcmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoaXRlbS5jaGlsZHJlbikge1xuICAgICAgICAgICAgdGhpcy5fZmlsdGVyZWRJdGVtcyA9IHRoaXMuZmlsdGVyZWRJdGVtcy5maWx0ZXIoeCA9PiB4LnBhcmVudCAhPT0gaXRlbSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9kZWZhdWx0U2VhcmNoRm4oc2VhcmNoOiBzdHJpbmcsIG9wdDogTmdPcHRpb24pIHtcbiAgICAgICAgY29uc3QgbGFiZWwgPSBzZWFyY2hIZWxwZXIuc3RyaXBTcGVjaWFsQ2hhcnMob3B0LmxhYmVsKS50b0xvY2FsZUxvd2VyQ2FzZSgpO1xuICAgICAgICByZXR1cm4gbGFiZWwuaW5kZXhPZihzZWFyY2gpID4gLTFcbiAgICB9XG5cbiAgICBwcml2YXRlIF9nZXROZXh0SXRlbUluZGV4KHN0ZXBzOiBudW1iZXIpIHtcbiAgICAgICAgaWYgKHN0ZXBzID4gMCkge1xuICAgICAgICAgICAgcmV0dXJuICh0aGlzLl9tYXJrZWRJbmRleCA9PT0gdGhpcy5fZmlsdGVyZWRJdGVtcy5sZW5ndGggLSAxKSA/IDAgOiAodGhpcy5fbWFya2VkSW5kZXggKyAxKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKHRoaXMuX21hcmtlZEluZGV4IDw9IDApID8gKHRoaXMuX2ZpbHRlcmVkSXRlbXMubGVuZ3RoIC0gMSkgOiAodGhpcy5fbWFya2VkSW5kZXggLSAxKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9zdGVwVG9JdGVtKHN0ZXBzOiBudW1iZXIpIHtcbiAgICAgICAgaWYgKHRoaXMuX2ZpbHRlcmVkSXRlbXMubGVuZ3RoID09PSAwIHx8IHRoaXMuX2ZpbHRlcmVkSXRlbXMuZXZlcnkoeCA9PiB4LmRpc2FibGVkKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fbWFya2VkSW5kZXggPSB0aGlzLl9nZXROZXh0SXRlbUluZGV4KHN0ZXBzKTtcbiAgICAgICAgaWYgKHRoaXMubWFya2VkSXRlbS5kaXNhYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5fc3RlcFRvSXRlbShzdGVwcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9ncm91cEJ5KGl0ZW1zOiBOZ09wdGlvbltdLCBwcm9wOiBzdHJpbmcgfCBGdW5jdGlvbik6IE9wdGlvbkdyb3VwcyB7XG4gICAgICAgIGNvbnN0IGdyb3VwcyA9IG5ldyBNYXA8c3RyaW5nIHwgTmdPcHRpb24sIE5nT3B0aW9uW10+KCk7XG4gICAgICAgIGlmIChpdGVtcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBncm91cHM7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDaGVjayBpZiBpdGVtcyBhcmUgYWxyZWFkeSBncm91cGVkIGJ5IGdpdmVuIGtleS5cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoaXRlbXNbMF0udmFsdWVbPHN0cmluZz5wcm9wXSkpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNoaWxkcmVuID0gKGl0ZW0udmFsdWVbPHN0cmluZz5wcm9wXSB8fCBbXSkubWFwKCh4LCBpbmRleCkgPT4gdGhpcy5tYXBJdGVtKHgsIGluZGV4KSk7XG4gICAgICAgICAgICAgICAgZ3JvdXBzLnNldChpdGVtLCBjaGlsZHJlbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZ3JvdXBzO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgaXNGbktleSA9IGlzRnVuY3Rpb24odGhpcy5fbmdTZWxlY3QuZ3JvdXBCeSk7XG4gICAgICAgIGNvbnN0IGtleUZuID0gKGl0ZW06IE5nT3B0aW9uKSA9PiB7XG4gICAgICAgICAgICBsZXQga2V5ID0gaXNGbktleSA/ICg8RnVuY3Rpb24+cHJvcCkoaXRlbS52YWx1ZSkgOiBpdGVtLnZhbHVlWzxzdHJpbmc+cHJvcF07XG4gICAgICAgICAgICByZXR1cm4gaXNEZWZpbmVkKGtleSkgPyBrZXkgOiB1bmRlZmluZWQ7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gR3JvdXAgaXRlbXMgYnkga2V5LlxuICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpIHtcbiAgICAgICAgICAgIGxldCBrZXkgPSBrZXlGbihpdGVtKTtcbiAgICAgICAgICAgIGNvbnN0IGdyb3VwID0gZ3JvdXBzLmdldChrZXkpO1xuICAgICAgICAgICAgaWYgKGdyb3VwKSB7XG4gICAgICAgICAgICAgICAgZ3JvdXAucHVzaChpdGVtKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZ3JvdXBzLnNldChrZXksIFtpdGVtXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGdyb3VwcztcbiAgICB9XG5cbiAgICBwcml2YXRlIF9mbGF0dGVuKGdyb3VwczogT3B0aW9uR3JvdXBzKSB7XG4gICAgICAgIGNvbnN0IGlzR3JvdXBCeUZuID0gaXNGdW5jdGlvbih0aGlzLl9uZ1NlbGVjdC5ncm91cEJ5KTtcbiAgICAgICAgY29uc3QgaXRlbXMgPSBbXTtcbiAgICAgICAgY29uc3Qgd2l0aG91dEdyb3VwID0gZ3JvdXBzLmdldCh1bmRlZmluZWQpIHx8IFtdO1xuICAgICAgICBpdGVtcy5wdXNoKC4uLndpdGhvdXRHcm91cCk7XG4gICAgICAgIGxldCBpID0gd2l0aG91dEdyb3VwLmxlbmd0aDtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgQXJyYXkuZnJvbShncm91cHMua2V5cygpKSkge1xuICAgICAgICAgICAgaWYgKCFpc0RlZmluZWQoa2V5KSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgaXNPYmplY3RLZXkgPSBpc09iamVjdChrZXkpO1xuICAgICAgICAgICAgY29uc3QgcGFyZW50OiBOZ09wdGlvbiA9IHtcbiAgICAgICAgICAgICAgICBsYWJlbDogaXNPYmplY3RLZXkgPyAnJyA6IDxzdHJpbmc+a2V5LFxuICAgICAgICAgICAgICAgIGNoaWxkcmVuOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgcGFyZW50OiBudWxsLFxuICAgICAgICAgICAgICAgIGluZGV4OiBpKyssXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6ICF0aGlzLl9uZ1NlbGVjdC5zZWxlY3RhYmxlR3JvdXAsXG4gICAgICAgICAgICAgICAgaHRtbElkOiBuZXdJZCgpLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNvbnN0IGdyb3VwS2V5ID0gaXNHcm91cEJ5Rm4gPyB0aGlzLl9uZ1NlbGVjdC5iaW5kTGFiZWwgOiA8c3RyaW5nPnRoaXMuX25nU2VsZWN0Lmdyb3VwQnk7XG4gICAgICAgICAgICBjb25zdCBncm91cFZhbHVlID0gdGhpcy5fbmdTZWxlY3QuZ3JvdXBWYWx1ZSB8fCAoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChpc09iamVjdEtleSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKDxOZ09wdGlvbj5rZXkpLnZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4geyBbZ3JvdXBLZXldOiBrZXkgfTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29uc3QgY2hpbGRyZW4gPSBncm91cHMuZ2V0KGtleSkubWFwKHggPT4ge1xuICAgICAgICAgICAgICAgIHgucGFyZW50ID0gcGFyZW50O1xuICAgICAgICAgICAgICAgIHguY2hpbGRyZW4gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgeC5pbmRleCA9IGkrKztcbiAgICAgICAgICAgICAgICByZXR1cm4geDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcGFyZW50LmNoaWxkcmVuID0gY2hpbGRyZW47XG4gICAgICAgICAgICBwYXJlbnQudmFsdWUgPSBncm91cFZhbHVlKGtleSwgY2hpbGRyZW4ubWFwKHggPT4geC52YWx1ZSkpO1xuICAgICAgICAgICAgaXRlbXMucHVzaChwYXJlbnQpO1xuICAgICAgICAgICAgaXRlbXMucHVzaCguLi5jaGlsZHJlbik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGl0ZW1zO1xuICAgIH1cbn1cbiJdfQ==