/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, forwardRef, ChangeDetectorRef, Input, Output, EventEmitter, ContentChild, TemplateRef, ViewEncapsulation, HostListener, HostBinding, ViewChild, ElementRef, ChangeDetectionStrategy, Inject, ContentChildren, QueryList, InjectionToken, Attribute } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { takeUntil, startWith, tap, debounceTime, map, filter } from 'rxjs/operators';
import { Subject, merge } from 'rxjs';
import { NgOptionTemplateDirective, NgLabelTemplateDirective, NgHeaderTemplateDirective, NgFooterTemplateDirective, NgOptgroupTemplateDirective, NgNotFoundTemplateDirective, NgTypeToSearchTemplateDirective, NgLoadingTextTemplateDirective, NgMultiLabelTemplateDirective, NgTagTemplateDirective } from '../../directive/ng-templates.directive';
import { ConsoleService } from '../../service/console.service';
import { isDefined, isFunction, isPromise, isObject } from '../../utils/value-utils';
import { ItemsList } from '../../model/items-list';
import { KeyCode } from '../../model/ng-select.types';
import { newId } from '../../model/id';
import { NgDropdownPanelComponent } from '../dropdown/ng-dropdown-panel.component';
import { NgOptionComponent } from '../option/ng-option.component';
import { NgSelectConfig } from '../../service/config.service';
/** @type {?} */
export const SELECTION_MODEL_FACTORY = new InjectionToken('ng-select-selection-model');
export class NgSelectComponent {
    /**
     * @param {?} classes
     * @param {?} tabIndex
     * @param {?} autoFocus
     * @param {?} config
     * @param {?} newSelectionModel
     * @param {?} _elementRef
     * @param {?} _cd
     * @param {?} _console
     */
    constructor(classes, tabIndex, autoFocus, config, newSelectionModel, _elementRef, _cd, _console) {
        this.classes = classes;
        this.tabIndex = tabIndex;
        this.autoFocus = autoFocus;
        this._cd = _cd;
        this._console = _console;
        this.clearable = true;
        this.markFirst = true;
        this.dropdownPosition = 'auto';
        this.loading = false;
        this.closeOnSelect = true;
        this.hideSelected = false;
        this.selectOnTab = false;
        this.bufferAmount = 4;
        this.selectableGroup = false;
        this.selectableGroupAsModel = true;
        this.searchFn = null;
        this.excludeGroupsFromDefaultSelection = false;
        this.clearOnBackspace = true;
        this.labelForId = null;
        this.autoCorrect = 'off';
        this.autoCapitalize = 'off';
        this.multiple = false;
        this.addTag = false;
        this.searchable = true;
        this.isOpen = false;
        // output events
        this.blurEvent = new EventEmitter();
        this.focusEvent = new EventEmitter();
        this.changeEvent = new EventEmitter();
        this.openEvent = new EventEmitter();
        this.closeEvent = new EventEmitter();
        this.searchEvent = new EventEmitter();
        this.clearEvent = new EventEmitter();
        this.addEvent = new EventEmitter();
        this.removeEvent = new EventEmitter();
        this.scroll = new EventEmitter();
        this.scrollToEnd = new EventEmitter();
        this.disabled = false;
        this.viewPortItems = [];
        this.filterValue = null;
        this.dropdownId = newId();
        this._items = [];
        this._defaultLabel = 'label';
        this._primitive = true;
        this._pressedKeys = [];
        this._destroy$ = new Subject();
        this._keyPress$ = new Subject();
        this._onChange = (/**
         * @param {?} _
         * @return {?}
         */
        (_) => { });
        this._onTouched = (/**
         * @return {?}
         */
        () => { });
        this.clearItem = (/**
         * @param {?} item
         * @return {?}
         */
        (item) => {
            /** @type {?} */
            const option = this.selectedItems.find((/**
             * @param {?} x
             * @return {?}
             */
            x => x.value === item));
            this.unselect(option);
        });
        this._mergeGlobalConfig(config);
        this.itemsList = new ItemsList(this, newSelectionModel());
        this.element = _elementRef.nativeElement;
    }
    /**
     * @return {?}
     */
    get items() { return this._items; }
    ;
    /**
     * @param {?} value
     * @return {?}
     */
    set items(value) {
        this._itemsAreUsed = true;
        this._items = value;
    }
    ;
    /**
     * @return {?}
     */
    get compareWith() { return this._compareWith; }
    /**
     * @param {?} fn
     * @return {?}
     */
    set compareWith(fn) {
        if (!isFunction(fn)) {
            throw Error('`compareWith` must be a function.');
        }
        this._compareWith = fn;
    }
    /**
     * @return {?}
     */
    get clearSearchOnAdd() { return isDefined(this._clearSearchOnAdd) ? this._clearSearchOnAdd : this.closeOnSelect; }
    ;
    /**
     * @param {?} value
     * @return {?}
     */
    set clearSearchOnAdd(value) {
        this._clearSearchOnAdd = value;
    }
    ;
    /**
     * @return {?}
     */
    get filtered() { return !!this.filterValue && this.searchable; }
    ;
    /**
     * @return {?}
     */
    get selectedItems() {
        return this.itemsList.selectedItems;
    }
    /**
     * @return {?}
     */
    get selectedValues() {
        return this.selectedItems.map((/**
         * @param {?} x
         * @return {?}
         */
        x => x.value));
    }
    /**
     * @return {?}
     */
    get hasValue() {
        return this.selectedItems.length > 0;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._handleKeyPresses();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes.multiple) {
            this.itemsList.clearSelected();
        }
        if (changes.items) {
            this._setItems(changes.items.currentValue || []);
        }
        if (changes.isOpen) {
            this._manualOpen = isDefined(changes.isOpen.currentValue);
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        if (!this._itemsAreUsed) {
            this._setItemsFromNgOptions();
        }
        if (isDefined(this.autoFocus)) {
            this.focus();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._destroy$.next();
        this._destroy$.complete();
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    handleKeyDown($event) {
        if (KeyCode[$event.which]) {
            switch ($event.which) {
                case KeyCode.ArrowDown:
                    this._handleArrowDown($event);
                    break;
                case KeyCode.ArrowUp:
                    this._handleArrowUp($event);
                    break;
                case KeyCode.Space:
                    this._handleSpace($event);
                    break;
                case KeyCode.Enter:
                    this._handleEnter($event);
                    break;
                case KeyCode.Tab:
                    this._handleTab($event);
                    break;
                case KeyCode.Esc:
                    this.close();
                    $event.preventDefault();
                    $event.stopPropagation();
                    break;
                case KeyCode.Backspace:
                    this._handleBackspace();
                    break;
            }
        }
        else if ($event.key && $event.key.length === 1) {
            this._keyPress$.next($event.key.toLocaleLowerCase());
        }
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    handleMousedown($event) {
        /** @type {?} */
        const target = (/** @type {?} */ ($event.target));
        if (target.tagName !== 'INPUT') {
            $event.preventDefault();
        }
        $event.stopPropagation();
        if (target.classList.contains('ng-clear-wrapper')) {
            this.handleClearClick();
            return;
        }
        if (target.classList.contains('ng-arrow-wrapper')) {
            this.handleArrowClick();
            return;
        }
        if (target.classList.contains('ng-value-icon')) {
            return;
        }
        if (!this.focused) {
            this.focus();
        }
        if (this.searchable) {
            this.open();
        }
        else {
            this.toggle();
        }
    }
    /**
     * @return {?}
     */
    handleArrowClick() {
        if (this.isOpen) {
            this.close();
        }
        else {
            this.open();
        }
    }
    /**
     * @return {?}
     */
    handleClearClick() {
        if (this.hasValue) {
            this.clearModel();
        }
        this._clearSearch();
        this.focus();
        if (this._isTypeahead) {
            this.typeahead.next(null);
        }
        this.clearEvent.emit();
    }
    /**
     * @return {?}
     */
    clearModel() {
        if (!this.clearable) {
            return;
        }
        this.itemsList.clearSelected();
        this._updateNgModel();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this.itemsList.clearSelected();
        this._handleWriteValue(value);
        this._cd.markForCheck();
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this._onChange = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this._onTouched = fn;
    }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
        this._cd.markForCheck();
    }
    /**
     * @return {?}
     */
    toggle() {
        if (!this.isOpen) {
            this.open();
        }
        else {
            this.close();
        }
    }
    /**
     * @return {?}
     */
    open() {
        if (this.disabled || this.isOpen || this.itemsList.maxItemsSelected || this._manualOpen) {
            return;
        }
        if (!this._isTypeahead && !this.addTag && this.itemsList.noItemsToSelect) {
            return;
        }
        this.isOpen = true;
        this.itemsList.markSelectedOrDefault(this.markFirst);
        this.openEvent.emit();
        if (!this.filterValue) {
            this.focus();
        }
        this.detectChanges();
    }
    /**
     * @return {?}
     */
    close() {
        if (!this.isOpen || this._manualOpen) {
            return;
        }
        this.isOpen = false;
        this._clearSearch();
        this._onTouched();
        this.closeEvent.emit();
        this._cd.markForCheck();
    }
    /**
     * @param {?} item
     * @return {?}
     */
    toggleItem(item) {
        if (!item || item.disabled || this.disabled) {
            return;
        }
        if (this.multiple && item.selected) {
            this.unselect(item);
        }
        else {
            this.select(item);
        }
    }
    /**
     * @param {?} item
     * @return {?}
     */
    select(item) {
        if (!item.selected) {
            this.itemsList.select(item);
            if (this.clearSearchOnAdd) {
                this._clearSearch();
            }
            if (this.multiple) {
                this.addEvent.emit(item.value);
            }
            this._updateNgModel();
        }
        if (this.closeOnSelect || this.itemsList.noItemsToSelect) {
            this.close();
        }
    }
    /**
     * @return {?}
     */
    focus() {
        this.filterInput.nativeElement.focus();
    }
    /**
     * @param {?} item
     * @return {?}
     */
    unselect(item) {
        if (!item) {
            return;
        }
        this.itemsList.unselect(item);
        this.focus();
        this._updateNgModel();
        this.removeEvent.emit(item);
    }
    /**
     * @return {?}
     */
    selectTag() {
        /** @type {?} */
        let tag;
        if (isFunction(this.addTag)) {
            tag = ((/** @type {?} */ (this.addTag)))(this.filterValue);
        }
        else {
            tag = this._primitive ? this.filterValue : { [this.bindLabel]: this.filterValue };
        }
        /** @type {?} */
        const handleTag = (/**
         * @param {?} item
         * @return {?}
         */
        (item) => this._isTypeahead || !this.isOpen ? this.itemsList.mapItem(item, null) : this.itemsList.addItem(item));
        if (isPromise(tag)) {
            tag.then((/**
             * @param {?} item
             * @return {?}
             */
            item => this.select(handleTag(item)))).catch((/**
             * @return {?}
             */
            () => { }));
        }
        else if (tag) {
            this.select(handleTag(tag));
        }
    }
    /**
     * @return {?}
     */
    showClear() {
        return this.clearable && (this.hasValue || this.filterValue) && !this.disabled;
    }
    /**
     * @return {?}
     */
    get showAddTag() {
        if (!this.filterValue) {
            return false;
        }
        /** @type {?} */
        const term = this.filterValue.toLowerCase();
        return this.addTag &&
            (!this.itemsList.filteredItems.some((/**
             * @param {?} x
             * @return {?}
             */
            x => x.label.toLowerCase() === term)) &&
                (!this.hideSelected && this.isOpen || !this.selectedItems.some((/**
                 * @param {?} x
                 * @return {?}
                 */
                x => x.label.toLowerCase() === term)))) &&
            !this.loading;
    }
    /**
     * @return {?}
     */
    showNoItemsFound() {
        /** @type {?} */
        const empty = this.itemsList.filteredItems.length === 0;
        return ((empty && !this._isTypeahead && !this.loading) ||
            (empty && this._isTypeahead && this.filterValue && !this.loading)) &&
            !this.showAddTag;
    }
    /**
     * @return {?}
     */
    showTypeToSearch() {
        /** @type {?} */
        const empty = this.itemsList.filteredItems.length === 0;
        return empty && this._isTypeahead && !this.filterValue && !this.loading;
    }
    /**
     * @param {?} term
     * @return {?}
     */
    filter(term) {
        this.filterValue = term;
        this.open();
        if (this._isTypeahead) {
            this.typeahead.next(this.filterValue);
        }
        else {
            this.itemsList.filter(this.filterValue);
            if (this.isOpen) {
                this.itemsList.markSelectedOrDefault(this.markFirst);
            }
        }
        this.searchEvent.emit(term);
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onInputFocus($event) {
        if (this.focused) {
            return;
        }
        this.element.classList.add('ng-select-focused');
        this.focusEvent.emit($event);
        this.focused = true;
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onInputBlur($event) {
        this.element.classList.remove('ng-select-focused');
        this.blurEvent.emit($event);
        if (!this.isOpen && !this.disabled) {
            this._onTouched();
        }
        this.focused = false;
    }
    /**
     * @param {?} item
     * @return {?}
     */
    onItemHover(item) {
        if (item.disabled) {
            return;
        }
        this.itemsList.markItem(item);
    }
    /**
     * @return {?}
     */
    detectChanges() {
        if (!((/** @type {?} */ (this._cd))).destroyed) {
            this._cd.detectChanges();
        }
    }
    /**
     * @return {?}
     */
    updateDropdownPosition() {
        if (this.dropdownPanel) {
            this.dropdownPanel.updateDropdownPosition();
        }
    }
    /**
     * @private
     * @param {?} items
     * @return {?}
     */
    _setItems(items) {
        /** @type {?} */
        const firstItem = items[0];
        this.bindLabel = this.bindLabel || this._defaultLabel;
        this._primitive = isDefined(firstItem) ? !isObject(firstItem) : this._primitive;
        this.itemsList.setItems(items);
        if (items.length > 0 && this.hasValue) {
            this.itemsList.mapSelectedItems();
        }
        if (this.isOpen && isDefined(this.filterValue) && !this._isTypeahead) {
            this.itemsList.filter(this.filterValue);
        }
        if (this._isTypeahead || this.isOpen) {
            this.itemsList.markSelectedOrDefault(this.markFirst);
        }
    }
    /**
     * @private
     * @return {?}
     */
    _setItemsFromNgOptions() {
        /** @type {?} */
        const handleNgOptions = (/**
         * @param {?} options
         * @return {?}
         */
        (options) => {
            this.items = options.map((/**
             * @param {?} option
             * @return {?}
             */
            option => ({
                $ngOptionValue: option.value,
                $ngOptionLabel: option.elementRef.nativeElement.innerHTML,
                disabled: option.disabled
            })));
            this.itemsList.setItems(this.items);
            if (this.hasValue) {
                this.itemsList.mapSelectedItems();
            }
            this.detectChanges();
        });
        /** @type {?} */
        const handleOptionChange = (/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const changedOrDestroyed = merge(this.ngOptions.changes, this._destroy$);
            merge(...this.ngOptions.map((/**
             * @param {?} option
             * @return {?}
             */
            option => option.stateChange$)))
                .pipe(takeUntil(changedOrDestroyed))
                .subscribe((/**
             * @param {?} option
             * @return {?}
             */
            option => {
                /** @type {?} */
                const item = this.itemsList.findItem(option.value);
                item.disabled = option.disabled;
                this._cd.markForCheck();
            }));
        });
        this.ngOptions.changes
            .pipe(startWith(this.ngOptions), takeUntil(this._destroy$))
            .subscribe((/**
         * @param {?} options
         * @return {?}
         */
        options => {
            this.bindLabel = this._defaultLabel;
            handleNgOptions(options);
            handleOptionChange();
        }));
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    _isValidWriteValue(value) {
        if (!isDefined(value) || (this.multiple && value === '') || Array.isArray(value) && value.length === 0) {
            return false;
        }
        /** @type {?} */
        const validateBinding = (/**
         * @param {?} item
         * @return {?}
         */
        (item) => {
            if (!isDefined(this.compareWith) && isObject(item) && this.bindValue) {
                this._console.warn(`Binding object(${JSON.stringify(item)}) with bindValue is not allowed.`);
                return false;
            }
            return true;
        });
        if (this.multiple) {
            if (!Array.isArray(value)) {
                this._console.warn('Multiple select ngModel should be array.');
                return false;
            }
            return value.every((/**
             * @param {?} item
             * @return {?}
             */
            item => validateBinding(item)));
        }
        else {
            return validateBinding(value);
        }
    }
    /**
     * @private
     * @param {?} ngModel
     * @return {?}
     */
    _handleWriteValue(ngModel) {
        if (!this._isValidWriteValue(ngModel)) {
            return;
        }
        /** @type {?} */
        const select = (/**
         * @param {?} val
         * @return {?}
         */
        (val) => {
            /** @type {?} */
            let item = this.itemsList.findItem(val);
            if (item) {
                this.itemsList.select(item);
            }
            else {
                /** @type {?} */
                const isValObject = isObject(val);
                /** @type {?} */
                const isPrimitive = !isValObject && !this.bindValue;
                if ((isValObject || isPrimitive)) {
                    this.itemsList.select(this.itemsList.mapItem(val, null));
                }
                else if (this.bindValue) {
                    item = {
                        [this.bindLabel]: null,
                        [this.bindValue]: val
                    };
                    this.itemsList.select(this.itemsList.mapItem(item, null));
                }
            }
        });
        if (this.multiple) {
            ((/** @type {?} */ (ngModel))).forEach((/**
             * @param {?} item
             * @return {?}
             */
            item => select(item)));
        }
        else {
            select(ngModel);
        }
    }
    /**
     * @private
     * @return {?}
     */
    _handleKeyPresses() {
        if (this.searchable) {
            return;
        }
        this._keyPress$
            .pipe(takeUntil(this._destroy$), tap((/**
         * @param {?} letter
         * @return {?}
         */
        letter => this._pressedKeys.push(letter))), debounceTime(200), filter((/**
         * @return {?}
         */
        () => this._pressedKeys.length > 0)), map((/**
         * @return {?}
         */
        () => this._pressedKeys.join(''))))
            .subscribe((/**
         * @param {?} term
         * @return {?}
         */
        term => {
            /** @type {?} */
            const item = this.itemsList.findByLabel(term);
            if (item) {
                if (this.isOpen) {
                    this.itemsList.markItem(item);
                    this._cd.markForCheck();
                }
                else {
                    this.select(item);
                }
            }
            this._pressedKeys = [];
        }));
    }
    /**
     * @private
     * @return {?}
     */
    _updateNgModel() {
        /** @type {?} */
        const model = [];
        for (const item of this.selectedItems) {
            if (this.bindValue) {
                /** @type {?} */
                let value = null;
                if (item.children) {
                    value = item.value[(/** @type {?} */ (this.groupBy))];
                }
                else {
                    value = this.itemsList.resolveNested(item.value, this.bindValue);
                }
                model.push(value);
            }
            else {
                model.push(item.value);
            }
        }
        /** @type {?} */
        const selected = this.selectedItems.map((/**
         * @param {?} x
         * @return {?}
         */
        x => x.value));
        if (this.multiple) {
            this._onChange(model);
            this.changeEvent.emit(selected);
        }
        else {
            this._onChange(isDefined(model[0]) ? model[0] : null);
            this.changeEvent.emit(selected[0]);
        }
        this._cd.markForCheck();
    }
    /**
     * @private
     * @return {?}
     */
    _clearSearch() {
        if (!this.filterValue) {
            return;
        }
        this.filterValue = null;
        this.itemsList.resetFilteredItems();
    }
    /**
     * @private
     * @return {?}
     */
    _scrollToMarked() {
        if (!this.isOpen || !this.dropdownPanel) {
            return;
        }
        this.dropdownPanel.scrollInto(this.itemsList.markedItem);
    }
    /**
     * @private
     * @return {?}
     */
    _scrollToTag() {
        if (!this.isOpen || !this.dropdownPanel) {
            return;
        }
        this.dropdownPanel.scrollIntoTag();
    }
    /**
     * @private
     * @param {?} $event
     * @return {?}
     */
    _handleTab($event) {
        if (!this.isOpen) {
            return;
        }
        if (this.selectOnTab) {
            if (this.itemsList.markedItem) {
                this.toggleItem(this.itemsList.markedItem);
                $event.preventDefault();
            }
            else if (this.showAddTag) {
                this.selectTag();
                $event.preventDefault();
            }
            else {
                this.close();
            }
        }
        else {
            this.close();
        }
    }
    /**
     * @private
     * @param {?} $event
     * @return {?}
     */
    _handleEnter($event) {
        if (this.isOpen || this._manualOpen) {
            if (this.itemsList.markedItem) {
                this.toggleItem(this.itemsList.markedItem);
            }
            else if (this.showAddTag) {
                this.selectTag();
            }
        }
        else if (this.openOnEnter) {
            this.open();
        }
        else {
            return;
        }
        $event.preventDefault();
        $event.stopPropagation();
    }
    /**
     * @private
     * @param {?} $event
     * @return {?}
     */
    _handleSpace($event) {
        if (this.isOpen || this._manualOpen) {
            return;
        }
        this.open();
        $event.preventDefault();
    }
    /**
     * @private
     * @param {?} $event
     * @return {?}
     */
    _handleArrowDown($event) {
        if (this._nextItemIsTag(+1)) {
            this.itemsList.unmarkItem();
            this._scrollToTag();
        }
        else {
            this.itemsList.markNextItem();
            this._scrollToMarked();
        }
        this.open();
        $event.preventDefault();
    }
    /**
     * @private
     * @param {?} $event
     * @return {?}
     */
    _handleArrowUp($event) {
        if (!this.isOpen) {
            return;
        }
        if (this._nextItemIsTag(-1)) {
            this.itemsList.unmarkItem();
            this._scrollToTag();
        }
        else {
            this.itemsList.markPreviousItem();
            this._scrollToMarked();
        }
        $event.preventDefault();
    }
    /**
     * @private
     * @param {?} nextStep
     * @return {?}
     */
    _nextItemIsTag(nextStep) {
        /** @type {?} */
        const nextIndex = this.itemsList.markedIndex + nextStep;
        return this.addTag && this.filterValue
            && this.itemsList.markedItem
            && (nextIndex < 0 || nextIndex === this.itemsList.filteredItems.length);
    }
    /**
     * @private
     * @return {?}
     */
    _handleBackspace() {
        if (this.filterValue || !this.clearable || !this.clearOnBackspace || !this.hasValue) {
            return;
        }
        if (this.multiple) {
            this.unselect(this.itemsList.lastSelectedItem);
        }
        else {
            this.clearModel();
        }
    }
    /**
     * @private
     * @return {?}
     */
    get _isTypeahead() {
        return this.typeahead && this.typeahead.observers.length > 0;
    }
    /**
     * @private
     * @param {?} config
     * @return {?}
     */
    _mergeGlobalConfig(config) {
        this.placeholder = this.placeholder || config.placeholder;
        this.notFoundText = this.notFoundText || config.notFoundText;
        this.typeToSearchText = this.typeToSearchText || config.typeToSearchText;
        this.addTagText = this.addTagText || config.addTagText;
        this.loadingText = this.loadingText || config.loadingText;
        this.clearAllText = this.clearAllText || config.clearAllText;
        this.virtualScroll = isDefined(this.virtualScroll)
            ? this.virtualScroll
            : isDefined(config.disableVirtualScroll) ? !config.disableVirtualScroll : false;
        this.openOnEnter = isDefined(this.openOnEnter) ? this.openOnEnter : config.openOnEnter;
    }
}
NgSelectComponent.decorators = [
    { type: Component, args: [{
                selector: 'ng-select',
                template: "<div (mousedown)=\"handleMousedown($event)\" [class.ng-has-value]=\"hasValue\" class=\"ng-select-container\">\n    <div class=\"ng-value-container\">\n        <div class=\"ng-placeholder\">{{placeholder}}</div>\n\n        <ng-container *ngIf=\"!multiLabelTemplate && selectedItems.length > 0\">\n            <div [class.ng-value-disabled]=\"item.disabled\" class=\"ng-value\" *ngFor=\"let item of selectedItems\">\n                <ng-template #defaultLabelTemplate>\n                    <span class=\"ng-value-icon left\" (click)=\"unselect(item);\" aria-hidden=\"true\">\u00D7</span>\n                    <span class=\"ng-value-label\">{{item.label}}</span>\n                </ng-template>\n\n                <ng-template\n                    [ngTemplateOutlet]=\"labelTemplate || defaultLabelTemplate\"\n                    [ngTemplateOutletContext]=\"{ item: item.value, clear: clearItem, label: item.label }\">\n                </ng-template>\n            </div>\n        </ng-container>\n\n        <ng-template *ngIf=\"multiLabelTemplate && selectedValues.length > 0\"\n                [ngTemplateOutlet]=\"multiLabelTemplate\"\n                [ngTemplateOutletContext]=\"{ items: selectedValues, clear: clearItem }\">\n        </ng-template>\n\n        <div class=\"ng-input\">\n            <input #filterInput\n                   type=\"text\"\n                   [attr.autocomplete]=\"labelForId ? 'off' : dropdownId\"\n                   [attr.id]=\"labelForId\"\n                   [attr.tabindex]=\"tabIndex\"\n                   [attr.autocorrect]=\"autoCorrect\"\n                   [attr.autocapitalize]=\"autoCapitalize\"\n                   [readOnly]=\"!searchable\"\n                   [disabled]=\"disabled\"\n                   [value]=\"filterValue ? filterValue : ''\"\n                   (input)=\"filter(filterInput.value)\"\n                   (focus)=\"onInputFocus($event)\"\n                   (blur)=\"onInputBlur($event)\"\n                   (change)=\"$event.stopPropagation()\"\n                   role=\"combobox\"\n                   [attr.aria-expanded]=\"isOpen\"\n                   [attr.aria-owns]=\"isOpen ? dropdownId : null\"\n                   [attr.aria-activedescendant]=\"isOpen ? itemsList?.markedItem?.htmlId : null\">\n        </div>\n    </div>\n\n    <div class=\"ng-spinner-loader\" *ngIf=\"loading\"></div>\n\n    <span *ngIf=\"showClear()\" class=\"ng-clear-wrapper\" title=\"{{clearAllText}}\">\n        <span class=\"ng-clear\" aria-hidden=\"true\">\u00D7</span>\n    </span>\n\n    <span class=\"ng-arrow-wrapper\">\n        <span class=\"ng-arrow\"></span>\n    </span>\n</div>\n\n<ng-dropdown-panel *ngIf=\"isOpen\"\n    class=\"ng-dropdown-panel\"\n    [virtualScroll]=\"virtualScroll\"\n    [bufferAmount]=\"bufferAmount\"\n    [appendTo]=\"appendTo\"\n    [position]=\"dropdownPosition\"\n    [headerTemplate]=\"headerTemplate\"\n    [footerTemplate]=\"footerTemplate\"\n    [filterValue]=\"filterValue\"\n    [items]=\"itemsList.filteredItems\"\n    [markedItem]=\"itemsList.markedItem\"\n    (update)=\"viewPortItems = $event\"\n    (scroll)=\"scroll.emit($event)\"\n    (scrollToEnd)=\"scrollToEnd.emit($event)\"\n    (outsideClick)=\"close()\"\n    [class.ng-select-multiple]=\"multiple\"\n    [ngClass]=\"classes\"\n    [id]=\"dropdownId\">\n\n    <ng-container>\n        <div class=\"ng-option\" [attr.role]=\"item.children ? 'group' : 'option'\" (click)=\"toggleItem(item)\" (mouseover)=\"onItemHover(item)\"\n                *ngFor=\"let item of viewPortItems\"\n                [class.ng-option-disabled]=\"item.disabled\"\n                [class.ng-option-selected]=\"item.selected\"\n                [class.ng-optgroup]=\"item.children\"\n                [class.ng-option]=\"!item.children\"\n                [class.ng-option-child]=\"!!item.parent\"\n                [class.ng-option-marked]=\"item === itemsList.markedItem\"\n                [attr.aria-selected]=\"item.selected\"\n                [attr.id]=\"item?.htmlId\">\n\n            <ng-template #defaultOptionTemplate>\n                <span class=\"ng-option-label\">{{item.label}}</span>\n            </ng-template>\n\n            <ng-template\n                [ngTemplateOutlet]=\"item.children ? (optgroupTemplate || defaultOptionTemplate) : (optionTemplate || defaultOptionTemplate)\"\n                [ngTemplateOutletContext]=\"{ item: item.value, item$:item, index: item.index, searchTerm: filterValue }\">\n            </ng-template>\n        </div>\n\n        <div class=\"ng-option\" [class.ng-option-marked]=\"!itemsList.markedItem\" (mouseover)=\"itemsList.unmarkItem()\" role=\"option\" (click)=\"selectTag()\" *ngIf=\"showAddTag\">\n            <ng-template #defaultTagTemplate>\n                <span><span class=\"ng-tag-label\">{{addTagText}}</span>\"{{filterValue}}\"</span>\n            </ng-template>\n\n            <ng-template\n                [ngTemplateOutlet]=\"tagTemplate || defaultTagTemplate\"\n                [ngTemplateOutletContext]=\"{ searchTerm: filterValue }\">\n            </ng-template>\n        </div>\n    </ng-container>\n\n    <ng-container *ngIf=\"showNoItemsFound()\">\n        <ng-template #defaultNotFoundTemplate>\n            <div class=\"ng-option ng-option-disabled\">{{notFoundText}}</div>\n        </ng-template>\n\n        <ng-template\n            [ngTemplateOutlet]=\"notFoundTemplate || defaultNotFoundTemplate\"\n            [ngTemplateOutletContext]=\"{ searchTerm: filterValue }\">\n        </ng-template>\n    </ng-container>\n\n    <ng-container *ngIf=\"showTypeToSearch()\">\n        <ng-template #defaultTypeToSearchTemplate>\n            <div class=\"ng-option ng-option-disabled\">{{typeToSearchText}}</div>\n        </ng-template>\n\n        <ng-template\n            [ngTemplateOutlet]=\"typeToSearchTemplate || defaultTypeToSearchTemplate\">\n        </ng-template>\n    </ng-container>\n\n    <ng-container *ngIf=\"loading && itemsList.filteredItems.length === 0\">\n        <ng-template #defaultLoadingTextTemplate>\n            <div class=\"ng-option ng-option-disabled\">{{loadingText}}</div>\n        </ng-template>\n\n        <ng-template\n            [ngTemplateOutlet]=\"loadingTextTemplate || defaultLoadingTextTemplate\"\n            [ngTemplateOutletContext]=\"{ searchTerm: filterValue }\">\n        </ng-template>\n    </ng-container>\n\n</ng-dropdown-panel>\n",
                providers: [{
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef((/**
                         * @return {?}
                         */
                        () => NgSelectComponent)),
                        multi: true
                    }],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                host: {
                    'role': 'listbox',
                    'class': 'ng-select',
                    '[class.ng-select-single]': '!multiple',
                },
                styles: [".ng-select{position:relative;display:block;box-sizing:border-box}.ng-select div,.ng-select input,.ng-select span{box-sizing:border-box}.ng-select [hidden]{display:none}.ng-select.ng-select-searchable .ng-select-container .ng-value-container .ng-input{opacity:1}.ng-select.ng-select-opened .ng-select-container{z-index:1001}.ng-select.ng-select-disabled .ng-select-container .ng-value-container .ng-placeholder,.ng-select.ng-select-disabled .ng-select-container .ng-value-container .ng-value{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:default}.ng-select.ng-select-disabled .ng-arrow-wrapper{cursor:default}.ng-select.ng-select-filtered .ng-placeholder{display:none}.ng-select .ng-select-container{color:#333;cursor:default;display:flex;outline:0;overflow:hidden;position:relative;width:100%}.ng-select .ng-select-container .ng-value-container{display:flex;flex:1}.ng-select .ng-select-container .ng-value-container .ng-input{opacity:0}.ng-select .ng-select-container .ng-value-container .ng-input>input{box-sizing:content-box;background:none;border:0;box-shadow:none;outline:0;cursor:default;width:100%}.ng-select .ng-select-container .ng-value-container .ng-input>input::-ms-clear{display:none}.ng-select .ng-select-container .ng-value-container .ng-input>input[readonly]{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;width:0;padding:0}.ng-select.ng-select-single.ng-select-filtered .ng-select-container .ng-value-container .ng-value{visibility:hidden}.ng-select.ng-select-single .ng-select-container .ng-value-container,.ng-select.ng-select-single .ng-select-container .ng-value-container .ng-value{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ng-select.ng-select-single .ng-select-container .ng-value-container .ng-value .ng-value-icon{display:none}.ng-select.ng-select-single .ng-select-container .ng-value-container .ng-input{position:absolute;width:100%;top:5px;left:0;padding-left:10px;padding-right:50px}.ng-select.ng-select-multiple.ng-select-disabled>.ng-select-container .ng-value-container .ng-value .ng-value-icon{display:none}.ng-select.ng-select-multiple .ng-select-container .ng-value-container{flex-wrap:wrap;padding-top:5px;padding-left:7px}.ng-select.ng-select-multiple .ng-select-container .ng-value-container .ng-value.ng-value-disabled .ng-value-icon{display:none}.ng-select.ng-select-multiple .ng-select-container .ng-value-container .ng-value .ng-value-icon{cursor:pointer}.ng-select.ng-select-multiple .ng-select-container .ng-value-container .ng-input{flex:1;z-index:2;padding:0 0 3px 3px}.ng-select.ng-select-multiple .ng-select-container .ng-value-container .ng-placeholder{position:absolute;z-index:1;top:5px;padding-bottom:5px;padding-left:3px}.ng-select .ng-clear-wrapper{cursor:pointer;position:relative;width:17px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;color:#999}.ng-select .ng-clear-wrapper .ng-clear{display:inline-block;font-size:18px;line-height:1;pointer-events:none}.ng-select .ng-spinner-loader{border-radius:50%;width:17px;height:17px;margin-right:5px;font-size:10px;position:relative;text-indent:-9999em;border-top:2px solid rgba(66,66,66,.2);border-right:2px solid rgba(66,66,66,.2);border-bottom:2px solid rgba(66,66,66,.2);border-left:2px solid #424242;transform:translateZ(0);-webkit-animation:.8s linear infinite load8;animation:.8s linear infinite load8}.ng-select .ng-spinner-loader:after{border-radius:50%;width:17px;height:17px}@-webkit-keyframes load8{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}@keyframes load8{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}.ng-select .ng-arrow-wrapper{cursor:pointer;position:relative;text-align:center;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.ng-select .ng-arrow-wrapper .ng-arrow{pointer-events:none;display:inline-block;height:0;width:0;position:relative}.ng-dropdown-panel .ng-dropdown-panel-items{display:block;height:auto;box-sizing:border-box;max-height:240px;overflow-y:auto}.ng-dropdown-panel .ng-dropdown-panel-items .ng-option{box-sizing:border-box;cursor:pointer;display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ng-dropdown-panel .ng-dropdown-panel-items .ng-option .highlighted{font-weight:700;text-decoration:underline}.ng-dropdown-panel .ng-dropdown-panel-items .ng-option.disabled{cursor:default}.ng-dropdown-panel .scroll-host{overflow:hidden;overflow-y:auto;position:relative;display:block;-webkit-overflow-scrolling:touch}.ng-dropdown-panel .scrollable-content{top:0;left:0;width:100%;height:100%;position:absolute}.ng-dropdown-panel .total-padding{width:1px;opacity:0}.ng-select.ng-select-opened>.ng-select-container{background:#fff;border-color:#b3b3b3 #ccc #d9d9d9}.ng-select.ng-select-opened>.ng-select-container:hover{box-shadow:none}.ng-select.ng-select-opened>.ng-select-container .ng-arrow{top:-2px;border-color:transparent transparent #999;border-width:0 5px 5px}.ng-select.ng-select-opened>.ng-select-container .ng-arrow:hover{border-color:transparent transparent #666}.ng-select.ng-select-opened.ng-select-bottom>.ng-select-container{border-bottom-right-radius:0;border-bottom-left-radius:0}.ng-select.ng-select-opened.ng-select-top>.ng-select-container{border-top-right-radius:0;border-top-left-radius:0}.ng-select.ng-select-focused:not(.ng-select-opened)>.ng-select-container{border-color:#007eff;box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 0 3px rgba(0,126,255,.1)}.ng-select.ng-select-disabled>.ng-select-container{background-color:#f9f9f9}.ng-select .ng-has-value .ng-placeholder{display:none}.ng-select .ng-select-container{background-color:#fff;border-radius:4px;border:1px solid #ccc;min-height:36px;align-items:center}.ng-select .ng-select-container:hover{box-shadow:0 1px 0 rgba(0,0,0,.06)}.ng-select .ng-select-container .ng-value-container{align-items:center;padding-left:10px}.ng-select .ng-select-container .ng-value-container .ng-placeholder{color:#aaa}.ng-select.ng-select-single .ng-select-container{height:36px}.ng-select.ng-select-multiple.ng-select-disabled>.ng-select-container .ng-value-container .ng-value{background-color:#f9f9f9;border:1px solid #e3e3e3}.ng-select.ng-select-multiple.ng-select-disabled>.ng-select-container .ng-value-container .ng-value .ng-value-label{padding:0 5px}.ng-select.ng-select-multiple .ng-select-container .ng-value-container .ng-value{white-space:nowrap;font-size:.9em;margin-bottom:5px;background-color:#f5faff;border-radius:2px;border:1px solid #c2e0ff;margin-right:5px}.ng-select.ng-select-multiple .ng-select-container .ng-value-container .ng-value.ng-value-disabled{background-color:#f9f9f9;border:1px solid #e3e3e3}.ng-select.ng-select-multiple .ng-select-container .ng-value-container .ng-value.ng-value-disabled .ng-value-label{padding-left:5px}.ng-select.ng-select-multiple .ng-select-container .ng-value-container .ng-value .ng-value-icon,.ng-select.ng-select-multiple .ng-select-container .ng-value-container .ng-value .ng-value-label{display:inline-block;padding:0 5px}.ng-select.ng-select-multiple .ng-select-container .ng-value-container .ng-value .ng-value-icon:hover{background-color:#d8eafd}.ng-select.ng-select-multiple .ng-select-container .ng-value-container .ng-value .ng-value-icon.left{border-right:1px solid #c2e0ff}.ng-select.ng-select-multiple .ng-select-container .ng-value-container .ng-value .ng-value-icon.right{border-left:1px solid #c2e0ff}.ng-select .ng-clear-wrapper:hover .ng-clear{color:#d0021b}.ng-select .ng-spinner-zone{padding:5px 5px 0 0}.ng-select .ng-arrow-wrapper{width:25px;padding-right:5px}.ng-select .ng-arrow-wrapper:hover .ng-arrow{border-top-color:#666}.ng-select .ng-arrow-wrapper .ng-arrow{border-color:#999 transparent transparent;border-style:solid;border-width:5px 5px 2.5px}.ng-dropdown-panel{box-sizing:border-box;position:absolute;opacity:0;width:100%;z-index:1050;-webkit-overflow-scrolling:touch;background-color:#fff;border:1px solid #ccc;box-shadow:0 1px 0 rgba(0,0,0,.06);left:0}.ng-dropdown-panel.ng-select-bottom{top:100%;border-bottom-right-radius:4px;border-bottom-left-radius:4px;border-top-color:#e6e6e6;margin-top:-1px}.ng-dropdown-panel.ng-select-bottom .ng-dropdown-panel-items .ng-option:last-child{border-bottom-right-radius:4px;border-bottom-left-radius:4px}.ng-dropdown-panel.ng-select-top{bottom:100%;border-top-right-radius:4px;border-top-left-radius:4px;border-bottom-color:#e6e6e6;margin-bottom:-1px}.ng-dropdown-panel.ng-select-top .ng-dropdown-panel-items .ng-option:first-child{border-top-right-radius:4px;border-top-left-radius:4px}.ng-dropdown-panel .ng-dropdown-header{border-bottom:1px solid #ccc;padding:5px 7px}.ng-dropdown-panel .ng-dropdown-footer{border-top:1px solid #ccc;padding:5px 7px}.ng-dropdown-panel .ng-dropdown-panel-items{margin-bottom:1px}.ng-dropdown-panel .ng-dropdown-panel-items .ng-optgroup{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;padding:8px 10px;font-weight:500;color:rgba(0,0,0,.54);cursor:pointer}.ng-dropdown-panel .ng-dropdown-panel-items .ng-optgroup.ng-option-disabled{cursor:default}.ng-dropdown-panel .ng-dropdown-panel-items .ng-optgroup.ng-option-marked{background-color:#ebf5ff}.ng-dropdown-panel .ng-dropdown-panel-items .ng-optgroup.ng-option-selected{background-color:#f5faff;font-weight:600}.ng-dropdown-panel .ng-dropdown-panel-items .ng-option{background-color:#fff;color:rgba(0,0,0,.87);padding:8px 10px}.ng-dropdown-panel .ng-dropdown-panel-items .ng-option.ng-option-selected{color:#333;background-color:#f5faff}.ng-dropdown-panel .ng-dropdown-panel-items .ng-option.ng-option-selected .ng-option-label{font-weight:600}.ng-dropdown-panel .ng-dropdown-panel-items .ng-option.ng-option-marked{background-color:#ebf5ff;color:#333}.ng-dropdown-panel .ng-dropdown-panel-items .ng-option.ng-option-disabled{color:#ccc}.ng-dropdown-panel .ng-dropdown-panel-items .ng-option.ng-option-child{padding-left:22px}.ng-dropdown-panel .ng-dropdown-panel-items .ng-option .ng-tag-label{font-size:80%;font-weight:400;padding-right:5px}"]
            }] }
];
/** @nocollapse */
NgSelectComponent.ctorParameters = () => [
    { type: String, decorators: [{ type: Attribute, args: ['class',] }] },
    { type: String, decorators: [{ type: Attribute, args: ['tabindex',] }] },
    { type: undefined, decorators: [{ type: Attribute, args: ['autofocus',] }] },
    { type: NgSelectConfig },
    { type: undefined, decorators: [{ type: Inject, args: [SELECTION_MODEL_FACTORY,] }] },
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: ConsoleService }
];
NgSelectComponent.propDecorators = {
    bindLabel: [{ type: Input }],
    bindValue: [{ type: Input }],
    clearable: [{ type: Input }],
    markFirst: [{ type: Input }],
    placeholder: [{ type: Input }],
    notFoundText: [{ type: Input }],
    typeToSearchText: [{ type: Input }],
    addTagText: [{ type: Input }],
    loadingText: [{ type: Input }],
    clearAllText: [{ type: Input }],
    dropdownPosition: [{ type: Input }],
    appendTo: [{ type: Input }],
    loading: [{ type: Input }],
    closeOnSelect: [{ type: Input }],
    hideSelected: [{ type: Input }],
    selectOnTab: [{ type: Input }],
    openOnEnter: [{ type: Input }],
    maxSelectedItems: [{ type: Input }],
    groupBy: [{ type: Input }],
    groupValue: [{ type: Input }],
    bufferAmount: [{ type: Input }],
    virtualScroll: [{ type: Input }],
    selectableGroup: [{ type: Input }],
    selectableGroupAsModel: [{ type: Input }],
    searchFn: [{ type: Input }],
    excludeGroupsFromDefaultSelection: [{ type: Input }],
    clearOnBackspace: [{ type: Input }],
    labelForId: [{ type: Input }],
    autoCorrect: [{ type: Input }],
    autoCapitalize: [{ type: Input }],
    typeahead: [{ type: Input }, { type: HostBinding, args: ['class.ng-select-typeahead',] }],
    multiple: [{ type: Input }, { type: HostBinding, args: ['class.ng-select-multiple',] }],
    addTag: [{ type: Input }, { type: HostBinding, args: ['class.ng-select-taggable',] }],
    searchable: [{ type: Input }, { type: HostBinding, args: ['class.ng-select-searchable',] }],
    isOpen: [{ type: Input }, { type: HostBinding, args: ['class.ng-select-opened',] }],
    items: [{ type: Input }],
    compareWith: [{ type: Input }],
    clearSearchOnAdd: [{ type: Input }],
    blurEvent: [{ type: Output, args: ['blur',] }],
    focusEvent: [{ type: Output, args: ['focus',] }],
    changeEvent: [{ type: Output, args: ['change',] }],
    openEvent: [{ type: Output, args: ['open',] }],
    closeEvent: [{ type: Output, args: ['close',] }],
    searchEvent: [{ type: Output, args: ['search',] }],
    clearEvent: [{ type: Output, args: ['clear',] }],
    addEvent: [{ type: Output, args: ['add',] }],
    removeEvent: [{ type: Output, args: ['remove',] }],
    scroll: [{ type: Output, args: ['scroll',] }],
    scrollToEnd: [{ type: Output, args: ['scrollToEnd',] }],
    optionTemplate: [{ type: ContentChild, args: [NgOptionTemplateDirective, { read: TemplateRef },] }],
    optgroupTemplate: [{ type: ContentChild, args: [NgOptgroupTemplateDirective, { read: TemplateRef },] }],
    labelTemplate: [{ type: ContentChild, args: [NgLabelTemplateDirective, { read: TemplateRef },] }],
    multiLabelTemplate: [{ type: ContentChild, args: [NgMultiLabelTemplateDirective, { read: TemplateRef },] }],
    headerTemplate: [{ type: ContentChild, args: [NgHeaderTemplateDirective, { read: TemplateRef },] }],
    footerTemplate: [{ type: ContentChild, args: [NgFooterTemplateDirective, { read: TemplateRef },] }],
    notFoundTemplate: [{ type: ContentChild, args: [NgNotFoundTemplateDirective, { read: TemplateRef },] }],
    typeToSearchTemplate: [{ type: ContentChild, args: [NgTypeToSearchTemplateDirective, { read: TemplateRef },] }],
    loadingTextTemplate: [{ type: ContentChild, args: [NgLoadingTextTemplateDirective, { read: TemplateRef },] }],
    tagTemplate: [{ type: ContentChild, args: [NgTagTemplateDirective, { read: TemplateRef },] }],
    dropdownPanel: [{ type: ViewChild, args: [forwardRef((/**
                 * @return {?}
                 */
                () => NgDropdownPanelComponent)),] }],
    ngOptions: [{ type: ContentChildren, args: [NgOptionComponent, { descendants: true },] }],
    filterInput: [{ type: ViewChild, args: ['filterInput',] }],
    disabled: [{ type: HostBinding, args: ['class.ng-select-disabled',] }],
    filtered: [{ type: HostBinding, args: ['class.ng-select-filtered',] }],
    handleKeyDown: [{ type: HostListener, args: ['keydown', ['$event'],] }]
};
if (false) {
    /** @type {?} */
    NgSelectComponent.prototype.bindLabel;
    /** @type {?} */
    NgSelectComponent.prototype.bindValue;
    /** @type {?} */
    NgSelectComponent.prototype.clearable;
    /** @type {?} */
    NgSelectComponent.prototype.markFirst;
    /** @type {?} */
    NgSelectComponent.prototype.placeholder;
    /** @type {?} */
    NgSelectComponent.prototype.notFoundText;
    /** @type {?} */
    NgSelectComponent.prototype.typeToSearchText;
    /** @type {?} */
    NgSelectComponent.prototype.addTagText;
    /** @type {?} */
    NgSelectComponent.prototype.loadingText;
    /** @type {?} */
    NgSelectComponent.prototype.clearAllText;
    /** @type {?} */
    NgSelectComponent.prototype.dropdownPosition;
    /** @type {?} */
    NgSelectComponent.prototype.appendTo;
    /** @type {?} */
    NgSelectComponent.prototype.loading;
    /** @type {?} */
    NgSelectComponent.prototype.closeOnSelect;
    /** @type {?} */
    NgSelectComponent.prototype.hideSelected;
    /** @type {?} */
    NgSelectComponent.prototype.selectOnTab;
    /** @type {?} */
    NgSelectComponent.prototype.openOnEnter;
    /** @type {?} */
    NgSelectComponent.prototype.maxSelectedItems;
    /** @type {?} */
    NgSelectComponent.prototype.groupBy;
    /** @type {?} */
    NgSelectComponent.prototype.groupValue;
    /** @type {?} */
    NgSelectComponent.prototype.bufferAmount;
    /** @type {?} */
    NgSelectComponent.prototype.virtualScroll;
    /** @type {?} */
    NgSelectComponent.prototype.selectableGroup;
    /** @type {?} */
    NgSelectComponent.prototype.selectableGroupAsModel;
    /** @type {?} */
    NgSelectComponent.prototype.searchFn;
    /** @type {?} */
    NgSelectComponent.prototype.excludeGroupsFromDefaultSelection;
    /** @type {?} */
    NgSelectComponent.prototype.clearOnBackspace;
    /** @type {?} */
    NgSelectComponent.prototype.labelForId;
    /** @type {?} */
    NgSelectComponent.prototype.autoCorrect;
    /** @type {?} */
    NgSelectComponent.prototype.autoCapitalize;
    /** @type {?} */
    NgSelectComponent.prototype.typeahead;
    /** @type {?} */
    NgSelectComponent.prototype.multiple;
    /** @type {?} */
    NgSelectComponent.prototype.addTag;
    /** @type {?} */
    NgSelectComponent.prototype.searchable;
    /** @type {?} */
    NgSelectComponent.prototype.isOpen;
    /** @type {?} */
    NgSelectComponent.prototype.blurEvent;
    /** @type {?} */
    NgSelectComponent.prototype.focusEvent;
    /** @type {?} */
    NgSelectComponent.prototype.changeEvent;
    /** @type {?} */
    NgSelectComponent.prototype.openEvent;
    /** @type {?} */
    NgSelectComponent.prototype.closeEvent;
    /** @type {?} */
    NgSelectComponent.prototype.searchEvent;
    /** @type {?} */
    NgSelectComponent.prototype.clearEvent;
    /** @type {?} */
    NgSelectComponent.prototype.addEvent;
    /** @type {?} */
    NgSelectComponent.prototype.removeEvent;
    /** @type {?} */
    NgSelectComponent.prototype.scroll;
    /** @type {?} */
    NgSelectComponent.prototype.scrollToEnd;
    /** @type {?} */
    NgSelectComponent.prototype.optionTemplate;
    /** @type {?} */
    NgSelectComponent.prototype.optgroupTemplate;
    /** @type {?} */
    NgSelectComponent.prototype.labelTemplate;
    /** @type {?} */
    NgSelectComponent.prototype.multiLabelTemplate;
    /** @type {?} */
    NgSelectComponent.prototype.headerTemplate;
    /** @type {?} */
    NgSelectComponent.prototype.footerTemplate;
    /** @type {?} */
    NgSelectComponent.prototype.notFoundTemplate;
    /** @type {?} */
    NgSelectComponent.prototype.typeToSearchTemplate;
    /** @type {?} */
    NgSelectComponent.prototype.loadingTextTemplate;
    /** @type {?} */
    NgSelectComponent.prototype.tagTemplate;
    /** @type {?} */
    NgSelectComponent.prototype.dropdownPanel;
    /** @type {?} */
    NgSelectComponent.prototype.ngOptions;
    /** @type {?} */
    NgSelectComponent.prototype.filterInput;
    /** @type {?} */
    NgSelectComponent.prototype.disabled;
    /** @type {?} */
    NgSelectComponent.prototype.itemsList;
    /** @type {?} */
    NgSelectComponent.prototype.viewPortItems;
    /** @type {?} */
    NgSelectComponent.prototype.filterValue;
    /** @type {?} */
    NgSelectComponent.prototype.dropdownId;
    /** @type {?} */
    NgSelectComponent.prototype.element;
    /** @type {?} */
    NgSelectComponent.prototype.focused;
    /**
     * @type {?}
     * @private
     */
    NgSelectComponent.prototype._items;
    /**
     * @type {?}
     * @private
     */
    NgSelectComponent.prototype._itemsAreUsed;
    /**
     * @type {?}
     * @private
     */
    NgSelectComponent.prototype._defaultLabel;
    /**
     * @type {?}
     * @private
     */
    NgSelectComponent.prototype._primitive;
    /**
     * @type {?}
     * @private
     */
    NgSelectComponent.prototype._manualOpen;
    /**
     * @type {?}
     * @private
     */
    NgSelectComponent.prototype._pressedKeys;
    /**
     * @type {?}
     * @private
     */
    NgSelectComponent.prototype._compareWith;
    /**
     * @type {?}
     * @private
     */
    NgSelectComponent.prototype._clearSearchOnAdd;
    /**
     * @type {?}
     * @private
     */
    NgSelectComponent.prototype._destroy$;
    /**
     * @type {?}
     * @private
     */
    NgSelectComponent.prototype._keyPress$;
    /**
     * @type {?}
     * @private
     */
    NgSelectComponent.prototype._onChange;
    /**
     * @type {?}
     * @private
     */
    NgSelectComponent.prototype._onTouched;
    /** @type {?} */
    NgSelectComponent.prototype.clearItem;
    /** @type {?} */
    NgSelectComponent.prototype.classes;
    /** @type {?} */
    NgSelectComponent.prototype.tabIndex;
    /**
     * @type {?}
     * @private
     */
    NgSelectComponent.prototype.autoFocus;
    /**
     * @type {?}
     * @private
     */
    NgSelectComponent.prototype._cd;
    /**
     * @type {?}
     * @private
     */
    NgSelectComponent.prototype._console;
    /* Skipping unhandled member: ;*/
    /* Skipping unhandled member: ;*/
    /* Skipping unhandled member: ;*/
    /* Skipping unhandled member: ;*/
    /* Skipping unhandled member: ;*/
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctc2VsZWN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtdWkvIiwic291cmNlcyI6WyJzcmMvbmctc2VsZWN0L2NvbXBvbmVudHMvc2VsZWN0L25nLXNlbGVjdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDSCxTQUFTLEVBSVQsVUFBVSxFQUNWLGlCQUFpQixFQUNqQixLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFDWixZQUFZLEVBQ1osV0FBVyxFQUNYLGlCQUFpQixFQUNqQixZQUFZLEVBQ1osV0FBVyxFQUNYLFNBQVMsRUFDVCxVQUFVLEVBQ1YsdUJBQXVCLEVBQ3ZCLE1BQU0sRUFFTixlQUFlLEVBQ2YsU0FBUyxFQUNULGNBQWMsRUFDZCxTQUFTLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxZQUFZLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3RGLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRXRDLE9BQU8sRUFDSCx5QkFBeUIsRUFDekIsd0JBQXdCLEVBQ3hCLHlCQUF5QixFQUN6Qix5QkFBeUIsRUFDekIsMkJBQTJCLEVBQzNCLDJCQUEyQixFQUMzQiwrQkFBK0IsRUFDL0IsOEJBQThCLEVBQzlCLDZCQUE2QixFQUM3QixzQkFBc0IsRUFDekIsTUFBTSx3Q0FBd0MsQ0FBQztBQUVoRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDL0QsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3JGLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNuRCxPQUFPLEVBQVksT0FBTyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDaEUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3ZDLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ25GLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBRWxFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQzs7QUFFOUQsTUFBTSxPQUFPLHVCQUF1QixHQUFHLElBQUksY0FBYyxDQUF3QiwyQkFBMkIsQ0FBQztBQXlCN0csTUFBTSxPQUFPLGlCQUFpQjs7Ozs7Ozs7Ozs7SUF1SDFCLFlBQytCLE9BQWUsRUFDWixRQUFnQixFQUNkLFNBQWMsRUFDOUMsTUFBc0IsRUFDVyxpQkFBd0MsRUFDekUsV0FBdUIsRUFDZixHQUFzQixFQUN0QixRQUF3QjtRQVBMLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFDWixhQUFRLEdBQVIsUUFBUSxDQUFRO1FBQ2QsY0FBUyxHQUFULFNBQVMsQ0FBSztRQUl0QyxRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQUN0QixhQUFRLEdBQVIsUUFBUSxDQUFnQjtRQTNIM0IsY0FBUyxHQUFHLElBQUksQ0FBQztRQUNqQixjQUFTLEdBQUcsSUFBSSxDQUFDO1FBT2pCLHFCQUFnQixHQUFxQixNQUFNLENBQUM7UUFFNUMsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUNoQixrQkFBYSxHQUFHLElBQUksQ0FBQztRQUNyQixpQkFBWSxHQUFHLEtBQUssQ0FBQztRQUNyQixnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUtwQixpQkFBWSxHQUFHLENBQUMsQ0FBQztRQUVqQixvQkFBZSxHQUFHLEtBQUssQ0FBQztRQUN4QiwyQkFBc0IsR0FBRyxJQUFJLENBQUM7UUFDOUIsYUFBUSxHQUFHLElBQUksQ0FBQztRQUNoQixzQ0FBaUMsR0FBRyxLQUFLLENBQUM7UUFDMUMscUJBQWdCLEdBQUcsSUFBSSxDQUFDO1FBRXhCLGVBQVUsR0FBRyxJQUFJLENBQUM7UUFDbEIsZ0JBQVcsR0FBZ0IsS0FBSyxDQUFDO1FBQ2pDLG1CQUFjLEdBQW1CLEtBQUssQ0FBQztRQUVFLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFDakIsV0FBTSxHQUF1QixLQUFLLENBQUM7UUFDakMsZUFBVSxHQUFHLElBQUksQ0FBQztRQUN0QixXQUFNLEdBQUcsS0FBSyxDQUFDOztRQXlCL0MsY0FBUyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDOUIsZUFBVSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDL0IsZ0JBQVcsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ25DLGNBQVMsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzlCLGVBQVUsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQy9CLGdCQUFXLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNsQyxlQUFVLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNsQyxhQUFRLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUMzQixnQkFBVyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDakMsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFrQyxDQUFDO1FBQ3ZELGdCQUFXLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQWtCZixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBSTFELGtCQUFhLEdBQWUsRUFBRSxDQUFDO1FBQy9CLGdCQUFXLEdBQVcsSUFBSSxDQUFDO1FBQzNCLGVBQVUsR0FBRyxLQUFLLEVBQUUsQ0FBQztRQUliLFdBQU0sR0FBRyxFQUFFLENBQUM7UUFFWixrQkFBYSxHQUFHLE9BQU8sQ0FBQztRQUN4QixlQUFVLEdBQUcsSUFBSSxDQUFDO1FBRWxCLGlCQUFZLEdBQWEsRUFBRSxDQUFDO1FBSW5CLGNBQVMsR0FBRyxJQUFJLE9BQU8sRUFBUSxDQUFDO1FBQ2hDLGVBQVUsR0FBRyxJQUFJLE9BQU8sRUFBVSxDQUFDO1FBQzVDLGNBQVM7Ozs7UUFBRyxDQUFDLENBQU0sRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFDO1FBQzVCLGVBQVU7OztRQUFHLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBQztRQUUvQixjQUFTOzs7O1FBQUcsQ0FBQyxJQUFTLEVBQUUsRUFBRTs7a0JBQ2hCLE1BQU0sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUk7Ozs7WUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLEtBQUssSUFBSSxFQUFDO1lBQzdELElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDMUIsQ0FBQyxFQUFDO1FBWUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxTQUFTLENBQUMsSUFBSSxFQUFFLGlCQUFpQixFQUFFLENBQUMsQ0FBQztRQUMxRCxJQUFJLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FBQyxhQUFhLENBQUM7SUFDN0MsQ0FBQzs7OztJQTdGRCxJQUNJLEtBQUssS0FBSyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUEsQ0FBQyxDQUFDO0lBQUEsQ0FBQzs7Ozs7SUFDbkMsSUFBSSxLQUFLLENBQUMsS0FBWTtRQUNsQixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztRQUMxQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztJQUN4QixDQUFDO0lBQUEsQ0FBQzs7OztJQUVGLElBQ0ksV0FBVyxLQUFLLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7Ozs7O0lBQy9DLElBQUksV0FBVyxDQUFDLEVBQWlCO1FBQzdCLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUU7WUFDakIsTUFBTSxLQUFLLENBQUMsbUNBQW1DLENBQUMsQ0FBQztTQUNwRDtRQUNELElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO0lBQzNCLENBQUM7Ozs7SUFFRCxJQUNJLGdCQUFnQixLQUFLLE9BQU8sU0FBUyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO0lBQUEsQ0FBQzs7Ozs7SUFDbkgsSUFBSSxnQkFBZ0IsQ0FBQyxLQUFLO1FBQ3RCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUM7SUFDbkMsQ0FBQztJQUFBLENBQUM7Ozs7SUFnQ0YsSUFBNkMsUUFBUSxLQUFLLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQSxDQUFDLENBQUM7SUFBQSxDQUFDOzs7O0lBMkN6RyxJQUFJLGFBQWE7UUFDYixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDO0lBQ3hDLENBQUM7Ozs7SUFFRCxJQUFJLGNBQWM7UUFDZCxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRzs7OztRQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBQyxDQUFDO0lBQ2hELENBQUM7Ozs7SUFFRCxJQUFJLFFBQVE7UUFDUixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUN6QyxDQUFDOzs7O0lBRUQsUUFBUTtRQUNKLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQzdCLENBQUM7Ozs7O0lBRUQsV0FBVyxDQUFDLE9BQXNCO1FBQzlCLElBQUksT0FBTyxDQUFDLFFBQVEsRUFBRTtZQUNsQixJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQ2xDO1FBQ0QsSUFBSSxPQUFPLENBQUMsS0FBSyxFQUFFO1lBQ2YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFlBQVksSUFBSSxFQUFFLENBQUMsQ0FBQztTQUNwRDtRQUNELElBQUksT0FBTyxDQUFDLE1BQU0sRUFBRTtZQUNoQixJQUFJLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQzdEO0lBQ0wsQ0FBQzs7OztJQUVELGVBQWU7UUFDWCxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUNyQixJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztTQUNqQztRQUVELElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUMzQixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDaEI7SUFDTCxDQUFDOzs7O0lBRUQsV0FBVztRQUNQLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUM5QixDQUFDOzs7OztJQUdELGFBQWEsQ0FBQyxNQUFxQjtRQUMvQixJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDdkIsUUFBUSxNQUFNLENBQUMsS0FBSyxFQUFFO2dCQUNsQixLQUFLLE9BQU8sQ0FBQyxTQUFTO29CQUNsQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQzlCLE1BQU07Z0JBQ1YsS0FBSyxPQUFPLENBQUMsT0FBTztvQkFDaEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDNUIsTUFBTTtnQkFDVixLQUFLLE9BQU8sQ0FBQyxLQUFLO29CQUNkLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQzFCLE1BQU07Z0JBQ1YsS0FBSyxPQUFPLENBQUMsS0FBSztvQkFDZCxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUMxQixNQUFNO2dCQUNWLEtBQUssT0FBTyxDQUFDLEdBQUc7b0JBQ1osSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDeEIsTUFBTTtnQkFDVixLQUFLLE9BQU8sQ0FBQyxHQUFHO29CQUNaLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztvQkFDYixNQUFNLENBQUMsY0FBYyxFQUFFLENBQUM7b0JBQ3hCLE1BQU0sQ0FBQyxlQUFlLEVBQUUsQ0FBQztvQkFDekIsTUFBTTtnQkFDVixLQUFLLE9BQU8sQ0FBQyxTQUFTO29CQUNsQixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztvQkFDeEIsTUFBTTthQUNiO1NBQ0o7YUFBTSxJQUFJLE1BQU0sQ0FBQyxHQUFHLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQzlDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDO1NBQ3hEO0lBQ0wsQ0FBQzs7Ozs7SUFFRCxlQUFlLENBQUMsTUFBa0I7O2NBQ3hCLE1BQU0sR0FBRyxtQkFBQSxNQUFNLENBQUMsTUFBTSxFQUFlO1FBQzNDLElBQUksTUFBTSxDQUFDLE9BQU8sS0FBSyxPQUFPLEVBQUU7WUFDNUIsTUFBTSxDQUFDLGNBQWMsRUFBRSxDQUFDO1NBQzNCO1FBQ0QsTUFBTSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBRXpCLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsa0JBQWtCLENBQUMsRUFBRTtZQUMvQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUN4QixPQUFPO1NBQ1Y7UUFFRCxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDLEVBQUU7WUFDL0MsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFDeEIsT0FBTztTQUNWO1FBRUQsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsRUFBRTtZQUM1QyxPQUFPO1NBQ1Y7UUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNmLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUNoQjtRQUVELElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNqQixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDZjthQUFNO1lBQ0gsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ2pCO0lBQ0wsQ0FBQzs7OztJQUVELGdCQUFnQjtRQUNaLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNiLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUNoQjthQUFNO1lBQ0gsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ2Y7SUFDTCxDQUFDOzs7O0lBRUQsZ0JBQWdCO1FBQ1osSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2YsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQ3JCO1FBQ0QsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNiLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNuQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUM3QjtRQUNELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDM0IsQ0FBQzs7OztJQUVELFVBQVU7UUFDTixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNqQixPQUFPO1NBQ1Y7UUFDRCxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQy9CLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUMxQixDQUFDOzs7OztJQUVELFVBQVUsQ0FBQyxLQUFrQjtRQUN6QixJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQy9CLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM5QixJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzVCLENBQUM7Ozs7O0lBRUQsZ0JBQWdCLENBQUMsRUFBTztRQUNwQixJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztJQUN4QixDQUFDOzs7OztJQUVELGlCQUFpQixDQUFDLEVBQU87UUFDckIsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7SUFDekIsQ0FBQzs7Ozs7SUFFRCxnQkFBZ0IsQ0FBQyxVQUFtQjtRQUNoQyxJQUFJLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQztRQUMzQixJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzVCLENBQUM7Ozs7SUFFRCxNQUFNO1FBQ0YsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDZCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDZjthQUFNO1lBQ0gsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ2hCO0lBQ0wsQ0FBQzs7OztJQUVELElBQUk7UUFDQSxJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLGdCQUFnQixJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDckYsT0FBTztTQUNWO1FBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxFQUFFO1lBQ3RFLE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ25CLElBQUksQ0FBQyxTQUFTLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDbkIsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ2hCO1FBQ0QsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3pCLENBQUM7Ozs7SUFFRCxLQUFLO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNsQyxPQUFPO1NBQ1Y7UUFDRCxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUM1QixDQUFDOzs7OztJQUVELFVBQVUsQ0FBQyxJQUFjO1FBQ3JCLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ3pDLE9BQU87U0FDVjtRQUVELElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2hDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDdkI7YUFBTTtZQUNILElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDckI7SUFDTCxDQUFDOzs7OztJQUVELE1BQU0sQ0FBQyxJQUFjO1FBQ2pCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2hCLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzVCLElBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFFO2dCQUN2QixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7YUFDdkI7WUFFRCxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ2YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ2xDO1lBQ0QsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1NBQ3pCO1FBRUQsSUFBSSxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxFQUFFO1lBQ3RELElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUNoQjtJQUNMLENBQUM7Ozs7SUFFRCxLQUFLO1FBQ0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDM0MsQ0FBQzs7Ozs7SUFFRCxRQUFRLENBQUMsSUFBYztRQUNuQixJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1AsT0FBTztTQUNWO1FBRUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDOUIsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2IsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hDLENBQUM7Ozs7SUFFRCxTQUFTOztZQUNELEdBQUc7UUFDUCxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDekIsR0FBRyxHQUFHLENBQUMsbUJBQVUsSUFBSSxDQUFDLE1BQU0sRUFBQSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQ25EO2FBQU07WUFDSCxHQUFHLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDckY7O2NBRUssU0FBUzs7OztRQUFHLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUNqSSxJQUFJLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNoQixHQUFHLENBQUMsSUFBSTs7OztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQyxDQUFDLEtBQUs7OztZQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBQyxDQUFDO1NBQ25FO2FBQU0sSUFBSSxHQUFHLEVBQUU7WUFDWixJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQy9CO0lBQ0wsQ0FBQzs7OztJQUVELFNBQVM7UUFDTCxPQUFPLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDbkYsQ0FBQzs7OztJQUVELElBQUksVUFBVTtRQUNWLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ25CLE9BQU8sS0FBSyxDQUFDO1NBQ2hCOztjQUVLLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRTtRQUMzQyxPQUFPLElBQUksQ0FBQyxNQUFNO1lBQ2QsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLElBQUk7Ozs7WUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLEtBQUssSUFBSSxFQUFDO2dCQUNwRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJOzs7O2dCQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsS0FBSyxJQUFJLEVBQUMsQ0FBQyxDQUFDO1lBQ3pHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN0QixDQUFDOzs7O0lBRUQsZ0JBQWdCOztjQUNOLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxNQUFNLEtBQUssQ0FBQztRQUN2RCxPQUFPLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNsRCxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDbEUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ3pCLENBQUM7Ozs7SUFFRCxnQkFBZ0I7O2NBQ04sS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLE1BQU0sS0FBSyxDQUFDO1FBQ3ZELE9BQU8sS0FBSyxJQUFJLElBQUksQ0FBQyxZQUFZLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUM1RSxDQUFDOzs7OztJQUVELE1BQU0sQ0FBQyxJQUFZO1FBQ2YsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFDeEIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBRVosSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ25CLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUN6QzthQUFNO1lBQ0gsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3hDLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDYixJQUFJLENBQUMsU0FBUyxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUN4RDtTQUNKO1FBRUQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEMsQ0FBQzs7Ozs7SUFFRCxZQUFZLENBQUMsTUFBTTtRQUNmLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNkLE9BQU87U0FDVjtRQUVELElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO0lBQ3hCLENBQUM7Ozs7O0lBRUQsV0FBVyxDQUFDLE1BQU07UUFDZCxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUNuRCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM1QixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDaEMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQ3JCO1FBQ0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7SUFDekIsQ0FBQzs7Ozs7SUFFRCxXQUFXLENBQUMsSUFBYztRQUN0QixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDZixPQUFPO1NBQ1Y7UUFDRCxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsQyxDQUFDOzs7O0lBRUQsYUFBYTtRQUNULElBQUksQ0FBQyxDQUFDLG1CQUFLLElBQUksQ0FBQyxHQUFHLEVBQUEsQ0FBQyxDQUFDLFNBQVMsRUFBRTtZQUM1QixJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQzVCO0lBQ0wsQ0FBQzs7OztJQUVELHNCQUFzQjtRQUNsQixJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDcEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1NBQy9DO0lBQ0wsQ0FBQzs7Ozs7O0lBRU8sU0FBUyxDQUFDLEtBQVk7O2NBQ3BCLFNBQVMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQzFCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDO1FBQ3RELElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUNoRixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMvQixJQUFJLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDbkMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1NBQ3JDO1FBQ0QsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ2xFLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUMzQztRQUNELElBQUksSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2xDLElBQUksQ0FBQyxTQUFTLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ3hEO0lBQ0wsQ0FBQzs7Ozs7SUFFTyxzQkFBc0I7O2NBQ3BCLGVBQWU7Ozs7UUFBRyxDQUFDLE9BQXFDLEVBQUUsRUFBRTtZQUM5RCxJQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxHQUFHOzs7O1lBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNoQyxjQUFjLEVBQUUsTUFBTSxDQUFDLEtBQUs7Z0JBQzVCLGNBQWMsRUFBRSxNQUFNLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxTQUFTO2dCQUN6RCxRQUFRLEVBQUUsTUFBTSxDQUFDLFFBQVE7YUFDNUIsQ0FBQyxFQUFDLENBQUM7WUFDSixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDcEMsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNmLElBQUksQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQzthQUNyQztZQUNELElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN6QixDQUFDLENBQUE7O2NBRUssa0JBQWtCOzs7UUFBRyxHQUFHLEVBQUU7O2tCQUN0QixrQkFBa0IsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUN4RSxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUc7Ozs7WUFBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUMsQ0FBQztpQkFDdEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO2lCQUNuQyxTQUFTOzs7O1lBQUMsTUFBTSxDQUFDLEVBQUU7O3NCQUNWLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO2dCQUNsRCxJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUM7Z0JBQ2hDLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDNUIsQ0FBQyxFQUFDLENBQUM7UUFDWCxDQUFDLENBQUE7UUFFRCxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU87YUFDakIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUMxRCxTQUFTOzs7O1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDakIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO1lBQ3BDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN6QixrQkFBa0IsRUFBRSxDQUFDO1FBQ3pCLENBQUMsRUFBQyxDQUFDO0lBQ1gsQ0FBQzs7Ozs7O0lBRU8sa0JBQWtCLENBQUMsS0FBVTtRQUNqQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxLQUFLLEtBQUssRUFBRSxDQUFDLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUNwRyxPQUFPLEtBQUssQ0FBQztTQUNoQjs7Y0FFSyxlQUFlOzs7O1FBQUcsQ0FBQyxJQUFTLEVBQVcsRUFBRTtZQUMzQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtnQkFDbEUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGtDQUFrQyxDQUFDLENBQUM7Z0JBQzdGLE9BQU8sS0FBSyxDQUFDO2FBQ2hCO1lBQ0QsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQyxDQUFBO1FBRUQsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2YsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ3ZCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLDBDQUEwQyxDQUFDLENBQUM7Z0JBQy9ELE9BQU8sS0FBSyxDQUFDO2FBQ2hCO1lBQ0QsT0FBTyxLQUFLLENBQUMsS0FBSzs7OztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxFQUFDLENBQUM7U0FDckQ7YUFBTTtZQUNILE9BQU8sZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2pDO0lBQ0wsQ0FBQzs7Ozs7O0lBRU8saUJBQWlCLENBQUMsT0FBb0I7UUFDMUMsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUNuQyxPQUFNO1NBQ1Q7O2NBRUssTUFBTTs7OztRQUFHLENBQUMsR0FBUSxFQUFFLEVBQUU7O2dCQUNwQixJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDO1lBQ3ZDLElBQUksSUFBSSxFQUFFO2dCQUNOLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQy9CO2lCQUFNOztzQkFDRyxXQUFXLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQzs7c0JBQzNCLFdBQVcsR0FBRyxDQUFDLFdBQVcsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTO2dCQUNuRCxJQUFJLENBQUMsV0FBVyxJQUFJLFdBQVcsQ0FBQyxFQUFFO29CQUM5QixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztpQkFDNUQ7cUJBQU0sSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO29CQUN2QixJQUFJLEdBQUc7d0JBQ0gsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsSUFBSTt3QkFDdEIsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsR0FBRztxQkFDeEIsQ0FBQztvQkFDRixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztpQkFDN0Q7YUFDSjtRQUNMLENBQUMsQ0FBQTtRQUVELElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNmLENBQUMsbUJBQU8sT0FBTyxFQUFBLENBQUMsQ0FBQyxPQUFPOzs7O1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUMsQ0FBQztTQUNsRDthQUFNO1lBQ0gsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ25CO0lBQ0wsQ0FBQzs7Ozs7SUFFTyxpQkFBaUI7UUFDckIsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2pCLE9BQU87U0FDVjtRQUVELElBQUksQ0FBQyxVQUFVO2FBQ1YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQzNCLEdBQUc7Ozs7UUFBQyxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFDLEVBQzdDLFlBQVksQ0FBQyxHQUFHLENBQUMsRUFDakIsTUFBTTs7O1FBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFDLEVBQzFDLEdBQUc7OztRQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUM7YUFDekMsU0FBUzs7OztRQUFDLElBQUksQ0FBQyxFQUFFOztrQkFDUixJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO1lBQzdDLElBQUksSUFBSSxFQUFFO2dCQUNOLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtvQkFDYixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDOUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztpQkFDM0I7cUJBQU07b0JBQ0gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDckI7YUFDSjtZQUNELElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO1FBQzNCLENBQUMsRUFBQyxDQUFDO0lBQ1gsQ0FBQzs7Ozs7SUFFTyxjQUFjOztjQUNaLEtBQUssR0FBRyxFQUFFO1FBQ2hCLEtBQUssTUFBTSxJQUFJLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUNuQyxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7O29CQUNaLEtBQUssR0FBRyxJQUFJO2dCQUNoQixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7b0JBQ2YsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsbUJBQVEsSUFBSSxDQUFDLE9BQU8sRUFBQSxDQUFDLENBQUM7aUJBQzVDO3FCQUFNO29CQUNILEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztpQkFDcEU7Z0JBQ0QsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNyQjtpQkFBTTtnQkFDSCxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUMxQjtTQUNKOztjQUVLLFFBQVEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUc7Ozs7UUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUM7UUFDckQsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN0QixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNuQzthQUFNO1lBQ0gsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDdEM7UUFFRCxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzVCLENBQUM7Ozs7O0lBRU8sWUFBWTtRQUNoQixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNuQixPQUFPO1NBQ1Y7UUFFRCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztRQUN4QixJQUFJLENBQUMsU0FBUyxDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDeEMsQ0FBQzs7Ozs7SUFFTyxlQUFlO1FBQ25CLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUNyQyxPQUFPO1NBQ1Y7UUFDRCxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzdELENBQUM7Ozs7O0lBRU8sWUFBWTtRQUNoQixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDckMsT0FBTztTQUNWO1FBQ0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN2QyxDQUFDOzs7Ozs7SUFFTyxVQUFVLENBQUMsTUFBcUI7UUFDcEMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDZCxPQUFPO1NBQ1Y7UUFDRCxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDbEIsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRTtnQkFDM0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUMzQyxNQUFNLENBQUMsY0FBYyxFQUFFLENBQUM7YUFDM0I7aUJBQU0sSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO2dCQUN4QixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBQ2pCLE1BQU0sQ0FBQyxjQUFjLEVBQUUsQ0FBQzthQUMzQjtpQkFBTTtnQkFDSCxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7YUFDaEI7U0FDSjthQUFNO1lBQ0gsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ2hCO0lBQ0wsQ0FBQzs7Ozs7O0lBRU8sWUFBWSxDQUFDLE1BQXFCO1FBQ3RDLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ2pDLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUU7Z0JBQzNCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUM5QztpQkFBTSxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7Z0JBQ3hCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQzthQUNwQjtTQUNKO2FBQU0sSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ3pCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUNmO2FBQU07WUFDSCxPQUFPO1NBQ1Y7UUFFRCxNQUFNLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDeEIsTUFBTSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQzdCLENBQUM7Ozs7OztJQUVPLFlBQVksQ0FBQyxNQUFxQjtRQUN0QyxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNqQyxPQUFPO1NBQ1Y7UUFDRCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDWixNQUFNLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDNUIsQ0FBQzs7Ozs7O0lBRU8sZ0JBQWdCLENBQUMsTUFBcUI7UUFDMUMsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDekIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUM1QixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDdkI7YUFBTTtZQUNILElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDOUIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1NBQzFCO1FBQ0QsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ1osTUFBTSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzVCLENBQUM7Ozs7OztJQUVPLGNBQWMsQ0FBQyxNQUFxQjtRQUN4QyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNkLE9BQU87U0FDVjtRQUVELElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ3pCLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDNUIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQ3ZCO2FBQU07WUFDSCxJQUFJLENBQUMsU0FBUyxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFDbEMsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1NBQzFCO1FBQ0QsTUFBTSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzVCLENBQUM7Ozs7OztJQUVPLGNBQWMsQ0FBQyxRQUFnQjs7Y0FDN0IsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxHQUFHLFFBQVE7UUFDdkQsT0FBTyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxXQUFXO2VBQy9CLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVTtlQUN6QixDQUFDLFNBQVMsR0FBRyxDQUFDLElBQUksU0FBUyxLQUFLLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQy9FLENBQUM7Ozs7O0lBRU8sZ0JBQWdCO1FBQ3BCLElBQUksSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2pGLE9BQU87U0FDVjtRQUVELElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNmLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1NBQ2xEO2FBQU07WUFDSCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDckI7SUFDTCxDQUFDOzs7OztJQUVELElBQVksWUFBWTtRQUNwQixPQUFPLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUNqRSxDQUFDOzs7Ozs7SUFFTyxrQkFBa0IsQ0FBQyxNQUFzQjtRQUM3QyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLElBQUksTUFBTSxDQUFDLFdBQVcsQ0FBQztRQUMxRCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLElBQUksTUFBTSxDQUFDLFlBQVksQ0FBQztRQUM3RCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixJQUFJLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQztRQUN6RSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQztRQUN2RCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLElBQUksTUFBTSxDQUFDLFdBQVcsQ0FBQztRQUMxRCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLElBQUksTUFBTSxDQUFDLFlBQVksQ0FBQztRQUM3RCxJQUFJLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDO1lBQzlDLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYTtZQUNwQixDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQ3BGLElBQUksQ0FBQyxXQUFXLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQztJQUMzRixDQUFDOzs7WUFud0JKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsV0FBVztnQkFDckIsMHZNQUF5QztnQkFFekMsU0FBUyxFQUFFLENBQUM7d0JBQ1IsT0FBTyxFQUFFLGlCQUFpQjt3QkFDMUIsV0FBVyxFQUFFLFVBQVU7Ozt3QkFBQyxHQUFHLEVBQUUsQ0FBQyxpQkFBaUIsRUFBQzt3QkFDaEQsS0FBSyxFQUFFLElBQUk7cUJBQ2QsQ0FBQztnQkFDRixhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLElBQUksRUFBRTtvQkFDRixNQUFNLEVBQUUsU0FBUztvQkFDakIsT0FBTyxFQUFFLFdBQVc7b0JBQ3BCLDBCQUEwQixFQUFFLFdBQVc7aUJBQzFDOzthQUNKOzs7O3lDQXlIUSxTQUFTLFNBQUMsT0FBTzt5Q0FDakIsU0FBUyxTQUFDLFVBQVU7NENBQ3BCLFNBQVMsU0FBQyxXQUFXO1lBckpyQixjQUFjOzRDQXVKZCxNQUFNLFNBQUMsdUJBQXVCO1lBekxuQyxVQUFVO1lBVlYsaUJBQWlCO1lBb0NaLGNBQWM7Ozt3QkFxQ2xCLEtBQUs7d0JBQ0wsS0FBSzt3QkFDTCxLQUFLO3dCQUNMLEtBQUs7MEJBQ0wsS0FBSzsyQkFDTCxLQUFLOytCQUNMLEtBQUs7eUJBQ0wsS0FBSzswQkFDTCxLQUFLOzJCQUNMLEtBQUs7K0JBQ0wsS0FBSzt1QkFDTCxLQUFLO3NCQUNMLEtBQUs7NEJBQ0wsS0FBSzsyQkFDTCxLQUFLOzBCQUNMLEtBQUs7MEJBQ0wsS0FBSzsrQkFDTCxLQUFLO3NCQUNMLEtBQUs7eUJBQ0wsS0FBSzsyQkFDTCxLQUFLOzRCQUNMLEtBQUs7OEJBQ0wsS0FBSztxQ0FDTCxLQUFLO3VCQUNMLEtBQUs7Z0RBQ0wsS0FBSzsrQkFDTCxLQUFLO3lCQUVMLEtBQUs7MEJBQ0wsS0FBSzs2QkFDTCxLQUFLO3dCQUNMLEtBQUssWUFBSSxXQUFXLFNBQUMsMkJBQTJCO3VCQUNoRCxLQUFLLFlBQUksV0FBVyxTQUFDLDBCQUEwQjtxQkFDL0MsS0FBSyxZQUFJLFdBQVcsU0FBQywwQkFBMEI7eUJBQy9DLEtBQUssWUFBSSxXQUFXLFNBQUMsNEJBQTRCO3FCQUNqRCxLQUFLLFlBQUksV0FBVyxTQUFDLHdCQUF3QjtvQkFFN0MsS0FBSzswQkFPTCxLQUFLOytCQVNMLEtBQUs7d0JBT0wsTUFBTSxTQUFDLE1BQU07eUJBQ2IsTUFBTSxTQUFDLE9BQU87MEJBQ2QsTUFBTSxTQUFDLFFBQVE7d0JBQ2YsTUFBTSxTQUFDLE1BQU07eUJBQ2IsTUFBTSxTQUFDLE9BQU87MEJBQ2QsTUFBTSxTQUFDLFFBQVE7eUJBQ2YsTUFBTSxTQUFDLE9BQU87dUJBQ2QsTUFBTSxTQUFDLEtBQUs7MEJBQ1osTUFBTSxTQUFDLFFBQVE7cUJBQ2YsTUFBTSxTQUFDLFFBQVE7MEJBQ2YsTUFBTSxTQUFDLGFBQWE7NkJBR3BCLFlBQVksU0FBQyx5QkFBeUIsRUFBRSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUU7K0JBQzdELFlBQVksU0FBQywyQkFBMkIsRUFBRSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUU7NEJBQy9ELFlBQVksU0FBQyx3QkFBd0IsRUFBRSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUU7aUNBQzVELFlBQVksU0FBQyw2QkFBNkIsRUFBRSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUU7NkJBQ2pFLFlBQVksU0FBQyx5QkFBeUIsRUFBRSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUU7NkJBQzdELFlBQVksU0FBQyx5QkFBeUIsRUFBRSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUU7K0JBQzdELFlBQVksU0FBQywyQkFBMkIsRUFBRSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUU7bUNBQy9ELFlBQVksU0FBQywrQkFBK0IsRUFBRSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUU7a0NBQ25FLFlBQVksU0FBQyw4QkFBOEIsRUFBRSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUU7MEJBQ2xFLFlBQVksU0FBQyxzQkFBc0IsRUFBRSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUU7NEJBRTFELFNBQVMsU0FBQyxVQUFVOzs7Z0JBQUMsR0FBRyxFQUFFLENBQUMsd0JBQXdCLEVBQUM7d0JBQ3BELGVBQWUsU0FBQyxpQkFBaUIsRUFBRSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUU7MEJBQ3hELFNBQVMsU0FBQyxhQUFhO3VCQUV2QixXQUFXLFNBQUMsMEJBQTBCO3VCQUN0QyxXQUFXLFNBQUMsMEJBQTBCOzRCQXNGdEMsWUFBWSxTQUFDLFNBQVMsRUFBRSxDQUFDLFFBQVEsQ0FBQzs7OztJQS9LbkMsc0NBQTJCOztJQUMzQixzQ0FBMkI7O0lBQzNCLHNDQUEwQjs7SUFDMUIsc0NBQTBCOztJQUMxQix3Q0FBNkI7O0lBQzdCLHlDQUE4Qjs7SUFDOUIsNkNBQWtDOztJQUNsQyx1Q0FBNEI7O0lBQzVCLHdDQUE2Qjs7SUFDN0IseUNBQThCOztJQUM5Qiw2Q0FBcUQ7O0lBQ3JELHFDQUEwQjs7SUFDMUIsb0NBQXlCOztJQUN6QiwwQ0FBOEI7O0lBQzlCLHlDQUE4Qjs7SUFDOUIsd0NBQTZCOztJQUM3Qix3Q0FBOEI7O0lBQzlCLDZDQUFrQzs7SUFDbEMsb0NBQW9DOztJQUNwQyx1Q0FBa0M7O0lBQ2xDLHlDQUEwQjs7SUFDMUIsMENBQWdDOztJQUNoQyw0Q0FBaUM7O0lBQ2pDLG1EQUF1Qzs7SUFDdkMscUNBQXlCOztJQUN6Qiw4REFBbUQ7O0lBQ25ELDZDQUFpQzs7SUFFakMsdUNBQTJCOztJQUMzQix3Q0FBMEM7O0lBQzFDLDJDQUFnRDs7SUFDaEQsc0NBQThFOztJQUM5RSxxQ0FBbUU7O0lBQ25FLG1DQUFxRjs7SUFDckYsdUNBQXNFOztJQUN0RSxtQ0FBK0Q7O0lBeUIvRCxzQ0FBK0M7O0lBQy9DLHVDQUFpRDs7SUFDakQsd0NBQW1EOztJQUNuRCxzQ0FBK0M7O0lBQy9DLHVDQUFpRDs7SUFDakQsd0NBQW1EOztJQUNuRCx1Q0FBaUQ7O0lBQ2pELHFDQUE2Qzs7SUFDN0Msd0NBQW1EOztJQUNuRCxtQ0FBOEU7O0lBQzlFLHdDQUF3RDs7SUFHeEQsMkNBQWlHOztJQUNqRyw2Q0FBcUc7O0lBQ3JHLDBDQUErRjs7SUFDL0YsK0NBQXlHOztJQUN6RywyQ0FBaUc7O0lBQ2pHLDJDQUFpRzs7SUFDakcsNkNBQXFHOztJQUNyRyxpREFBNkc7O0lBQzdHLGdEQUEyRzs7SUFDM0csd0NBQTJGOztJQUUzRiwwQ0FBK0Y7O0lBQy9GLHNDQUFtRzs7SUFDbkcsd0NBQWtEOztJQUVsRCxxQ0FBMEQ7O0lBRzFELHNDQUFxQjs7SUFDckIsMENBQStCOztJQUMvQix3Q0FBMkI7O0lBQzNCLHVDQUFxQjs7SUFDckIsb0NBQXFCOztJQUNyQixvQ0FBaUI7Ozs7O0lBRWpCLG1DQUFvQjs7Ozs7SUFDcEIsMENBQStCOzs7OztJQUMvQiwwQ0FBZ0M7Ozs7O0lBQ2hDLHVDQUEwQjs7Ozs7SUFDMUIsd0NBQTZCOzs7OztJQUM3Qix5Q0FBb0M7Ozs7O0lBQ3BDLHlDQUFvQzs7Ozs7SUFDcEMsOENBQW1DOzs7OztJQUVuQyxzQ0FBaUQ7Ozs7O0lBQ2pELHVDQUFvRDs7Ozs7SUFDcEQsc0NBQW9DOzs7OztJQUNwQyx1Q0FBK0I7O0lBRS9CLHNDQUdFOztJQUdFLG9DQUEwQzs7SUFDMUMscUNBQThDOzs7OztJQUM5QyxzQ0FBOEM7Ozs7O0lBSTlDLGdDQUE4Qjs7Ozs7SUFDOUIscUNBQWdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBDb21wb25lbnQsXG4gICAgT25EZXN0cm95LFxuICAgIE9uQ2hhbmdlcyxcbiAgICBBZnRlclZpZXdJbml0LFxuICAgIGZvcndhcmRSZWYsXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgSW5wdXQsXG4gICAgT3V0cHV0LFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBDb250ZW50Q2hpbGQsXG4gICAgVGVtcGxhdGVSZWYsXG4gICAgVmlld0VuY2Fwc3VsYXRpb24sXG4gICAgSG9zdExpc3RlbmVyLFxuICAgIEhvc3RCaW5kaW5nLFxuICAgIFZpZXdDaGlsZCxcbiAgICBFbGVtZW50UmVmLFxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIEluamVjdCxcbiAgICBTaW1wbGVDaGFuZ2VzLFxuICAgIENvbnRlbnRDaGlsZHJlbixcbiAgICBRdWVyeUxpc3QsXG4gICAgSW5qZWN0aW9uVG9rZW4sXG4gICAgQXR0cmlidXRlXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgdGFrZVVudGlsLCBzdGFydFdpdGgsIHRhcCwgZGVib3VuY2VUaW1lLCBtYXAsIGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFN1YmplY3QsIG1lcmdlIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7XG4gICAgTmdPcHRpb25UZW1wbGF0ZURpcmVjdGl2ZSxcbiAgICBOZ0xhYmVsVGVtcGxhdGVEaXJlY3RpdmUsXG4gICAgTmdIZWFkZXJUZW1wbGF0ZURpcmVjdGl2ZSxcbiAgICBOZ0Zvb3RlclRlbXBsYXRlRGlyZWN0aXZlLFxuICAgIE5nT3B0Z3JvdXBUZW1wbGF0ZURpcmVjdGl2ZSxcbiAgICBOZ05vdEZvdW5kVGVtcGxhdGVEaXJlY3RpdmUsXG4gICAgTmdUeXBlVG9TZWFyY2hUZW1wbGF0ZURpcmVjdGl2ZSxcbiAgICBOZ0xvYWRpbmdUZXh0VGVtcGxhdGVEaXJlY3RpdmUsXG4gICAgTmdNdWx0aUxhYmVsVGVtcGxhdGVEaXJlY3RpdmUsXG4gICAgTmdUYWdUZW1wbGF0ZURpcmVjdGl2ZVxufSBmcm9tICcuLi8uLi9kaXJlY3RpdmUvbmctdGVtcGxhdGVzLmRpcmVjdGl2ZSc7XG5cbmltcG9ydCB7IENvbnNvbGVTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZS9jb25zb2xlLnNlcnZpY2UnO1xuaW1wb3J0IHsgaXNEZWZpbmVkLCBpc0Z1bmN0aW9uLCBpc1Byb21pc2UsIGlzT2JqZWN0IH0gZnJvbSAnLi4vLi4vdXRpbHMvdmFsdWUtdXRpbHMnO1xuaW1wb3J0IHsgSXRlbXNMaXN0IH0gZnJvbSAnLi4vLi4vbW9kZWwvaXRlbXMtbGlzdCc7XG5pbXBvcnQgeyBOZ09wdGlvbiwgS2V5Q29kZSB9IGZyb20gJy4uLy4uL21vZGVsL25nLXNlbGVjdC50eXBlcyc7XG5pbXBvcnQgeyBuZXdJZCB9IGZyb20gJy4uLy4uL21vZGVsL2lkJztcbmltcG9ydCB7IE5nRHJvcGRvd25QYW5lbENvbXBvbmVudCB9IGZyb20gJy4uL2Ryb3Bkb3duL25nLWRyb3Bkb3duLXBhbmVsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOZ09wdGlvbkNvbXBvbmVudCB9IGZyb20gJy4uL29wdGlvbi9uZy1vcHRpb24uY29tcG9uZW50JztcbmltcG9ydCB7IFNlbGVjdGlvbk1vZGVsRmFjdG9yeSB9IGZyb20gJy4uLy4uL21vZGVsL3NlbGVjdGlvbi1tb2RlbCc7XG5pbXBvcnQgeyBOZ1NlbGVjdENvbmZpZyB9IGZyb20gJy4uLy4uL3NlcnZpY2UvY29uZmlnLnNlcnZpY2UnO1xuXG5leHBvcnQgY29uc3QgU0VMRUNUSU9OX01PREVMX0ZBQ1RPUlkgPSBuZXcgSW5qZWN0aW9uVG9rZW48U2VsZWN0aW9uTW9kZWxGYWN0b3J5Pignbmctc2VsZWN0LXNlbGVjdGlvbi1tb2RlbCcpO1xuZXhwb3J0IHR5cGUgRHJvcGRvd25Qb3NpdGlvbiA9ICdib3R0b20nIHwgJ3RvcCcgfCAnYXV0byc7XG5leHBvcnQgdHlwZSBBdXRvQ29ycmVjdCA9ICdvZmYnIHwgJ29uJztcbmV4cG9ydCB0eXBlIEF1dG9DYXBpdGFsaXplID0gJ29mZicgfCAnb24nO1xuZXhwb3J0IHR5cGUgQWRkVGFnRm4gPSAoKHRlcm06IHN0cmluZykgPT4gYW55IHwgUHJvbWlzZTxhbnk+KTtcbmV4cG9ydCB0eXBlIENvbXBhcmVXaXRoRm4gPSAoYTogYW55LCBiOiBhbnkpID0+IGJvb2xlYW47XG5leHBvcnQgdHlwZSBHcm91cFZhbHVlRm4gPSAoa2V5OiBzdHJpbmcgfCBvYmplY3QsIGNoaWxkcmVuOiBhbnlbXSkgPT4gc3RyaW5nIHwgb2JqZWN0O1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ25nLXNlbGVjdCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL25nLXNlbGVjdC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vbmctc2VsZWN0LmNvbXBvbmVudC5jc3MnXSxcbiAgICBwcm92aWRlcnM6IFt7XG4gICAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOZ1NlbGVjdENvbXBvbmVudCksXG4gICAgICAgIG11bHRpOiB0cnVlXG4gICAgfV0sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBob3N0OiB7XG4gICAgICAgICdyb2xlJzogJ2xpc3Rib3gnLFxuICAgICAgICAnY2xhc3MnOiAnbmctc2VsZWN0JyxcbiAgICAgICAgJ1tjbGFzcy5uZy1zZWxlY3Qtc2luZ2xlXSc6ICchbXVsdGlwbGUnLFxuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTmdTZWxlY3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIE9uQ2hhbmdlcywgQWZ0ZXJWaWV3SW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuXG4gICAgQElucHV0KCkgYmluZExhYmVsOiBzdHJpbmc7XG4gICAgQElucHV0KCkgYmluZFZhbHVlOiBzdHJpbmc7XG4gICAgQElucHV0KCkgY2xlYXJhYmxlID0gdHJ1ZTtcbiAgICBASW5wdXQoKSBtYXJrRmlyc3QgPSB0cnVlO1xuICAgIEBJbnB1dCgpIHBsYWNlaG9sZGVyOiBzdHJpbmc7XG4gICAgQElucHV0KCkgbm90Rm91bmRUZXh0OiBzdHJpbmc7XG4gICAgQElucHV0KCkgdHlwZVRvU2VhcmNoVGV4dDogc3RyaW5nO1xuICAgIEBJbnB1dCgpIGFkZFRhZ1RleHQ6IHN0cmluZztcbiAgICBASW5wdXQoKSBsb2FkaW5nVGV4dDogc3RyaW5nO1xuICAgIEBJbnB1dCgpIGNsZWFyQWxsVGV4dDogc3RyaW5nO1xuICAgIEBJbnB1dCgpIGRyb3Bkb3duUG9zaXRpb246IERyb3Bkb3duUG9zaXRpb24gPSAnYXV0byc7XG4gICAgQElucHV0KCkgYXBwZW5kVG86IHN0cmluZztcbiAgICBASW5wdXQoKSBsb2FkaW5nID0gZmFsc2U7XG4gICAgQElucHV0KCkgY2xvc2VPblNlbGVjdCA9IHRydWU7XG4gICAgQElucHV0KCkgaGlkZVNlbGVjdGVkID0gZmFsc2U7XG4gICAgQElucHV0KCkgc2VsZWN0T25UYWIgPSBmYWxzZTtcbiAgICBASW5wdXQoKSBvcGVuT25FbnRlcjogYm9vbGVhbjtcbiAgICBASW5wdXQoKSBtYXhTZWxlY3RlZEl0ZW1zOiBudW1iZXI7XG4gICAgQElucHV0KCkgZ3JvdXBCeTogc3RyaW5nIHwgRnVuY3Rpb247XG4gICAgQElucHV0KCkgZ3JvdXBWYWx1ZTogR3JvdXBWYWx1ZUZuO1xuICAgIEBJbnB1dCgpIGJ1ZmZlckFtb3VudCA9IDQ7XG4gICAgQElucHV0KCkgdmlydHVhbFNjcm9sbDogYm9vbGVhbjtcbiAgICBASW5wdXQoKSBzZWxlY3RhYmxlR3JvdXAgPSBmYWxzZTtcbiAgICBASW5wdXQoKSBzZWxlY3RhYmxlR3JvdXBBc01vZGVsID0gdHJ1ZTtcbiAgICBASW5wdXQoKSBzZWFyY2hGbiA9IG51bGw7XG4gICAgQElucHV0KCkgZXhjbHVkZUdyb3Vwc0Zyb21EZWZhdWx0U2VsZWN0aW9uID0gZmFsc2U7XG4gICAgQElucHV0KCkgY2xlYXJPbkJhY2tzcGFjZSA9IHRydWU7XG5cbiAgICBASW5wdXQoKSBsYWJlbEZvcklkID0gbnVsbDtcbiAgICBASW5wdXQoKSBhdXRvQ29ycmVjdDogQXV0b0NvcnJlY3QgPSAnb2ZmJztcbiAgICBASW5wdXQoKSBhdXRvQ2FwaXRhbGl6ZTogQXV0b0NhcGl0YWxpemUgPSAnb2ZmJztcbiAgICBASW5wdXQoKSBASG9zdEJpbmRpbmcoJ2NsYXNzLm5nLXNlbGVjdC10eXBlYWhlYWQnKSB0eXBlYWhlYWQ6IFN1YmplY3Q8c3RyaW5nPjtcbiAgICBASW5wdXQoKSBASG9zdEJpbmRpbmcoJ2NsYXNzLm5nLXNlbGVjdC1tdWx0aXBsZScpIG11bHRpcGxlID0gZmFsc2U7XG4gICAgQElucHV0KCkgQEhvc3RCaW5kaW5nKCdjbGFzcy5uZy1zZWxlY3QtdGFnZ2FibGUnKSBhZGRUYWc6IGJvb2xlYW4gfCBBZGRUYWdGbiA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIEBIb3N0QmluZGluZygnY2xhc3Mubmctc2VsZWN0LXNlYXJjaGFibGUnKSBzZWFyY2hhYmxlID0gdHJ1ZTtcbiAgICBASW5wdXQoKSBASG9zdEJpbmRpbmcoJ2NsYXNzLm5nLXNlbGVjdC1vcGVuZWQnKSBpc09wZW4gPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGl0ZW1zKCkgeyByZXR1cm4gdGhpcy5faXRlbXMgfTtcbiAgICBzZXQgaXRlbXModmFsdWU6IGFueVtdKSB7XG4gICAgICAgIHRoaXMuX2l0ZW1zQXJlVXNlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuX2l0ZW1zID0gdmFsdWU7XG4gICAgfTtcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IGNvbXBhcmVXaXRoKCkgeyByZXR1cm4gdGhpcy5fY29tcGFyZVdpdGg7IH1cbiAgICBzZXQgY29tcGFyZVdpdGgoZm46IENvbXBhcmVXaXRoRm4pIHtcbiAgICAgICAgaWYgKCFpc0Z1bmN0aW9uKGZuKSkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ2Bjb21wYXJlV2l0aGAgbXVzdCBiZSBhIGZ1bmN0aW9uLicpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2NvbXBhcmVXaXRoID0gZm47XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBnZXQgY2xlYXJTZWFyY2hPbkFkZCgpIHsgcmV0dXJuIGlzRGVmaW5lZCh0aGlzLl9jbGVhclNlYXJjaE9uQWRkKSA/IHRoaXMuX2NsZWFyU2VhcmNoT25BZGQgOiB0aGlzLmNsb3NlT25TZWxlY3Q7IH07XG4gICAgc2V0IGNsZWFyU2VhcmNoT25BZGQodmFsdWUpIHtcbiAgICAgICAgdGhpcy5fY2xlYXJTZWFyY2hPbkFkZCA9IHZhbHVlO1xuICAgIH07XG5cbiAgICAvLyBvdXRwdXQgZXZlbnRzXG4gICAgQE91dHB1dCgnYmx1cicpIGJsdXJFdmVudCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBAT3V0cHV0KCdmb2N1cycpIGZvY3VzRXZlbnQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQE91dHB1dCgnY2hhbmdlJykgY2hhbmdlRXZlbnQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQE91dHB1dCgnb3BlbicpIG9wZW5FdmVudCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBAT3V0cHV0KCdjbG9zZScpIGNsb3NlRXZlbnQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQE91dHB1dCgnc2VhcmNoJykgc2VhcmNoRXZlbnQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQE91dHB1dCgnY2xlYXInKSBjbGVhckV2ZW50ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBPdXRwdXQoJ2FkZCcpIGFkZEV2ZW50ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBPdXRwdXQoJ3JlbW92ZScpIHJlbW92ZUV2ZW50ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBPdXRwdXQoJ3Njcm9sbCcpIHNjcm9sbCA9IG5ldyBFdmVudEVtaXR0ZXI8eyBzdGFydDogbnVtYmVyOyBlbmQ6IG51bWJlciB9PigpO1xuICAgIEBPdXRwdXQoJ3Njcm9sbFRvRW5kJykgc2Nyb2xsVG9FbmQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICAvLyBjdXN0b20gdGVtcGxhdGVzXG4gICAgQENvbnRlbnRDaGlsZChOZ09wdGlvblRlbXBsYXRlRGlyZWN0aXZlLCB7IHJlYWQ6IFRlbXBsYXRlUmVmIH0pIG9wdGlvblRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuICAgIEBDb250ZW50Q2hpbGQoTmdPcHRncm91cFRlbXBsYXRlRGlyZWN0aXZlLCB7IHJlYWQ6IFRlbXBsYXRlUmVmIH0pIG9wdGdyb3VwVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG4gICAgQENvbnRlbnRDaGlsZChOZ0xhYmVsVGVtcGxhdGVEaXJlY3RpdmUsIHsgcmVhZDogVGVtcGxhdGVSZWYgfSkgbGFiZWxUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcbiAgICBAQ29udGVudENoaWxkKE5nTXVsdGlMYWJlbFRlbXBsYXRlRGlyZWN0aXZlLCB7IHJlYWQ6IFRlbXBsYXRlUmVmIH0pIG11bHRpTGFiZWxUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcbiAgICBAQ29udGVudENoaWxkKE5nSGVhZGVyVGVtcGxhdGVEaXJlY3RpdmUsIHsgcmVhZDogVGVtcGxhdGVSZWYgfSkgaGVhZGVyVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG4gICAgQENvbnRlbnRDaGlsZChOZ0Zvb3RlclRlbXBsYXRlRGlyZWN0aXZlLCB7IHJlYWQ6IFRlbXBsYXRlUmVmIH0pIGZvb3RlclRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuICAgIEBDb250ZW50Q2hpbGQoTmdOb3RGb3VuZFRlbXBsYXRlRGlyZWN0aXZlLCB7IHJlYWQ6IFRlbXBsYXRlUmVmIH0pIG5vdEZvdW5kVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG4gICAgQENvbnRlbnRDaGlsZChOZ1R5cGVUb1NlYXJjaFRlbXBsYXRlRGlyZWN0aXZlLCB7IHJlYWQ6IFRlbXBsYXRlUmVmIH0pIHR5cGVUb1NlYXJjaFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuICAgIEBDb250ZW50Q2hpbGQoTmdMb2FkaW5nVGV4dFRlbXBsYXRlRGlyZWN0aXZlLCB7IHJlYWQ6IFRlbXBsYXRlUmVmIH0pIGxvYWRpbmdUZXh0VGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG4gICAgQENvbnRlbnRDaGlsZChOZ1RhZ1RlbXBsYXRlRGlyZWN0aXZlLCB7IHJlYWQ6IFRlbXBsYXRlUmVmIH0pIHRhZ1RlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgQFZpZXdDaGlsZChmb3J3YXJkUmVmKCgpID0+IE5nRHJvcGRvd25QYW5lbENvbXBvbmVudCkpIGRyb3Bkb3duUGFuZWw6IE5nRHJvcGRvd25QYW5lbENvbXBvbmVudDtcbiAgICBAQ29udGVudENoaWxkcmVuKE5nT3B0aW9uQ29tcG9uZW50LCB7IGRlc2NlbmRhbnRzOiB0cnVlIH0pIG5nT3B0aW9uczogUXVlcnlMaXN0PE5nT3B0aW9uQ29tcG9uZW50PjtcbiAgICBAVmlld0NoaWxkKCdmaWx0ZXJJbnB1dCcpIGZpbHRlcklucHV0OiBFbGVtZW50UmVmO1xuXG4gICAgQEhvc3RCaW5kaW5nKCdjbGFzcy5uZy1zZWxlY3QtZGlzYWJsZWQnKSBkaXNhYmxlZCA9IGZhbHNlO1xuICAgIEBIb3N0QmluZGluZygnY2xhc3Mubmctc2VsZWN0LWZpbHRlcmVkJykgZ2V0IGZpbHRlcmVkKCkgeyByZXR1cm4gISF0aGlzLmZpbHRlclZhbHVlICYmIHRoaXMuc2VhcmNoYWJsZSB9O1xuXG4gICAgaXRlbXNMaXN0OiBJdGVtc0xpc3Q7XG4gICAgdmlld1BvcnRJdGVtczogTmdPcHRpb25bXSA9IFtdO1xuICAgIGZpbHRlclZhbHVlOiBzdHJpbmcgPSBudWxsO1xuICAgIGRyb3Bkb3duSWQgPSBuZXdJZCgpO1xuICAgIGVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICAgIGZvY3VzZWQ6IGJvb2xlYW47XG5cbiAgICBwcml2YXRlIF9pdGVtcyA9IFtdO1xuICAgIHByaXZhdGUgX2l0ZW1zQXJlVXNlZDogYm9vbGVhbjtcbiAgICBwcml2YXRlIF9kZWZhdWx0TGFiZWwgPSAnbGFiZWwnO1xuICAgIHByaXZhdGUgX3ByaW1pdGl2ZSA9IHRydWU7XG4gICAgcHJpdmF0ZSBfbWFudWFsT3BlbjogYm9vbGVhbjtcbiAgICBwcml2YXRlIF9wcmVzc2VkS2V5czogc3RyaW5nW10gPSBbXTtcbiAgICBwcml2YXRlIF9jb21wYXJlV2l0aDogQ29tcGFyZVdpdGhGbjtcbiAgICBwcml2YXRlIF9jbGVhclNlYXJjaE9uQWRkOiBib29sZWFuO1xuXG4gICAgcHJpdmF0ZSByZWFkb25seSBfZGVzdHJveSQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgX2tleVByZXNzJCA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcbiAgICBwcml2YXRlIF9vbkNoYW5nZSA9IChfOiBhbnkpID0+IHsgfTtcbiAgICBwcml2YXRlIF9vblRvdWNoZWQgPSAoKSA9PiB7IH07XG5cbiAgICBjbGVhckl0ZW0gPSAoaXRlbTogYW55KSA9PiB7XG4gICAgICAgIGNvbnN0IG9wdGlvbiA9IHRoaXMuc2VsZWN0ZWRJdGVtcy5maW5kKHggPT4geC52YWx1ZSA9PT0gaXRlbSk7XG4gICAgICAgIHRoaXMudW5zZWxlY3Qob3B0aW9uKTtcbiAgICB9O1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIEBBdHRyaWJ1dGUoJ2NsYXNzJykgcHVibGljIGNsYXNzZXM6IHN0cmluZyxcbiAgICAgICAgQEF0dHJpYnV0ZSgndGFiaW5kZXgnKSBwdWJsaWMgdGFiSW5kZXg6IHN0cmluZyxcbiAgICAgICAgQEF0dHJpYnV0ZSgnYXV0b2ZvY3VzJykgcHJpdmF0ZSBhdXRvRm9jdXM6IGFueSxcbiAgICAgICAgY29uZmlnOiBOZ1NlbGVjdENvbmZpZyxcbiAgICAgICAgQEluamVjdChTRUxFQ1RJT05fTU9ERUxfRkFDVE9SWSkgbmV3U2VsZWN0aW9uTW9kZWw6IFNlbGVjdGlvbk1vZGVsRmFjdG9yeSxcbiAgICAgICAgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIHByaXZhdGUgX2NkOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgcHJpdmF0ZSBfY29uc29sZTogQ29uc29sZVNlcnZpY2VcbiAgICApIHtcbiAgICAgICAgdGhpcy5fbWVyZ2VHbG9iYWxDb25maWcoY29uZmlnKTtcbiAgICAgICAgdGhpcy5pdGVtc0xpc3QgPSBuZXcgSXRlbXNMaXN0KHRoaXMsIG5ld1NlbGVjdGlvbk1vZGVsKCkpO1xuICAgICAgICB0aGlzLmVsZW1lbnQgPSBfZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgIH1cblxuICAgIGdldCBzZWxlY3RlZEl0ZW1zKCk6IE5nT3B0aW9uW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5pdGVtc0xpc3Quc2VsZWN0ZWRJdGVtcztcbiAgICB9XG5cbiAgICBnZXQgc2VsZWN0ZWRWYWx1ZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGVkSXRlbXMubWFwKHggPT4geC52YWx1ZSk7XG4gICAgfVxuXG4gICAgZ2V0IGhhc1ZhbHVlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3RlZEl0ZW1zLmxlbmd0aCA+IDA7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuX2hhbmRsZUtleVByZXNzZXMoKTtcbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgICAgIGlmIChjaGFuZ2VzLm11bHRpcGxlKSB7XG4gICAgICAgICAgICB0aGlzLml0ZW1zTGlzdC5jbGVhclNlbGVjdGVkKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNoYW5nZXMuaXRlbXMpIHtcbiAgICAgICAgICAgIHRoaXMuX3NldEl0ZW1zKGNoYW5nZXMuaXRlbXMuY3VycmVudFZhbHVlIHx8IFtdKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2hhbmdlcy5pc09wZW4pIHtcbiAgICAgICAgICAgIHRoaXMuX21hbnVhbE9wZW4gPSBpc0RlZmluZWQoY2hhbmdlcy5pc09wZW4uY3VycmVudFZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9pdGVtc0FyZVVzZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX3NldEl0ZW1zRnJvbU5nT3B0aW9ucygpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzRGVmaW5lZCh0aGlzLmF1dG9Gb2N1cykpIHtcbiAgICAgICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLl9kZXN0cm95JC5uZXh0KCk7XG4gICAgICAgIHRoaXMuX2Rlc3Ryb3kkLmNvbXBsZXRlKCk7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bicsIFsnJGV2ZW50J10pXG4gICAgaGFuZGxlS2V5RG93bigkZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgaWYgKEtleUNvZGVbJGV2ZW50LndoaWNoXSkge1xuICAgICAgICAgICAgc3dpdGNoICgkZXZlbnQud2hpY2gpIHtcbiAgICAgICAgICAgICAgICBjYXNlIEtleUNvZGUuQXJyb3dEb3duOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9oYW5kbGVBcnJvd0Rvd24oJGV2ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBLZXlDb2RlLkFycm93VXA6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2hhbmRsZUFycm93VXAoJGV2ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBLZXlDb2RlLlNwYWNlOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9oYW5kbGVTcGFjZSgkZXZlbnQpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIEtleUNvZGUuRW50ZXI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2hhbmRsZUVudGVyKCRldmVudCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgS2V5Q29kZS5UYWI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2hhbmRsZVRhYigkZXZlbnQpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIEtleUNvZGUuRXNjOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgS2V5Q29kZS5CYWNrc3BhY2U6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2hhbmRsZUJhY2tzcGFjZSgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICgkZXZlbnQua2V5ICYmICRldmVudC5rZXkubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICB0aGlzLl9rZXlQcmVzcyQubmV4dCgkZXZlbnQua2V5LnRvTG9jYWxlTG93ZXJDYXNlKCkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlTW91c2Vkb3duKCRldmVudDogTW91c2VFdmVudCkge1xuICAgICAgICBjb25zdCB0YXJnZXQgPSAkZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50O1xuICAgICAgICBpZiAodGFyZ2V0LnRhZ05hbWUgIT09ICdJTlBVVCcpIHtcbiAgICAgICAgICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbmctY2xlYXItd3JhcHBlcicpKSB7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZUNsZWFyQ2xpY2soKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCduZy1hcnJvdy13cmFwcGVyJykpIHtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlQXJyb3dDbGljaygpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ25nLXZhbHVlLWljb24nKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLmZvY3VzZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnNlYXJjaGFibGUpIHtcbiAgICAgICAgICAgIHRoaXMub3BlbigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy50b2dnbGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUFycm93Q2xpY2soKSB7XG4gICAgICAgIGlmICh0aGlzLmlzT3Blbikge1xuICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5vcGVuKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVDbGVhckNsaWNrKCkge1xuICAgICAgICBpZiAodGhpcy5oYXNWYWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5jbGVhck1vZGVsKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fY2xlYXJTZWFyY2goKTtcbiAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgICAgICBpZiAodGhpcy5faXNUeXBlYWhlYWQpIHtcbiAgICAgICAgICAgIHRoaXMudHlwZWFoZWFkLm5leHQobnVsbCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jbGVhckV2ZW50LmVtaXQoKTtcbiAgICB9XG5cbiAgICBjbGVhck1vZGVsKCkge1xuICAgICAgICBpZiAoIXRoaXMuY2xlYXJhYmxlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pdGVtc0xpc3QuY2xlYXJTZWxlY3RlZCgpO1xuICAgICAgICB0aGlzLl91cGRhdGVOZ01vZGVsKCk7XG4gICAgfVxuXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55IHwgYW55W10pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pdGVtc0xpc3QuY2xlYXJTZWxlY3RlZCgpO1xuICAgICAgICB0aGlzLl9oYW5kbGVXcml0ZVZhbHVlKHZhbHVlKTtcbiAgICAgICAgdGhpcy5fY2QubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XG4gICAgICAgIHRoaXMuX29uQ2hhbmdlID0gZm47XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSk6IHZvaWQge1xuICAgICAgICB0aGlzLl9vblRvdWNoZWQgPSBmbjtcbiAgICB9XG5cbiAgICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XG4gICAgICAgIHRoaXMuX2NkLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIHRvZ2dsZSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzT3Blbikge1xuICAgICAgICAgICAgdGhpcy5vcGVuKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvcGVuKCkge1xuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCB8fCB0aGlzLmlzT3BlbiB8fCB0aGlzLml0ZW1zTGlzdC5tYXhJdGVtc1NlbGVjdGVkIHx8IHRoaXMuX21hbnVhbE9wZW4pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5faXNUeXBlYWhlYWQgJiYgIXRoaXMuYWRkVGFnICYmIHRoaXMuaXRlbXNMaXN0Lm5vSXRlbXNUb1NlbGVjdCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaXNPcGVuID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5pdGVtc0xpc3QubWFya1NlbGVjdGVkT3JEZWZhdWx0KHRoaXMubWFya0ZpcnN0KTtcbiAgICAgICAgdGhpcy5vcGVuRXZlbnQuZW1pdCgpO1xuICAgICAgICBpZiAoIXRoaXMuZmlsdGVyVmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG5cbiAgICBjbG9zZSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzT3BlbiB8fCB0aGlzLl9tYW51YWxPcGVuKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pc09wZW4gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fY2xlYXJTZWFyY2goKTtcbiAgICAgICAgdGhpcy5fb25Ub3VjaGVkKCk7XG4gICAgICAgIHRoaXMuY2xvc2VFdmVudC5lbWl0KCk7XG4gICAgICAgIHRoaXMuX2NkLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIHRvZ2dsZUl0ZW0oaXRlbTogTmdPcHRpb24pIHtcbiAgICAgICAgaWYgKCFpdGVtIHx8IGl0ZW0uZGlzYWJsZWQgfHwgdGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubXVsdGlwbGUgJiYgaXRlbS5zZWxlY3RlZCkge1xuICAgICAgICAgICAgdGhpcy51bnNlbGVjdChpdGVtKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0KGl0ZW0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2VsZWN0KGl0ZW06IE5nT3B0aW9uKSB7XG4gICAgICAgIGlmICghaXRlbS5zZWxlY3RlZCkge1xuICAgICAgICAgICAgdGhpcy5pdGVtc0xpc3Quc2VsZWN0KGl0ZW0pO1xuICAgICAgICAgICAgaWYgKHRoaXMuY2xlYXJTZWFyY2hPbkFkZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NsZWFyU2VhcmNoKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLm11bHRpcGxlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRFdmVudC5lbWl0KGl0ZW0udmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fdXBkYXRlTmdNb2RlbCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuY2xvc2VPblNlbGVjdCB8fCB0aGlzLml0ZW1zTGlzdC5ub0l0ZW1zVG9TZWxlY3QpIHtcbiAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZvY3VzKCkge1xuICAgICAgICB0aGlzLmZpbHRlcklucHV0Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICB9XG5cbiAgICB1bnNlbGVjdChpdGVtOiBOZ09wdGlvbikge1xuICAgICAgICBpZiAoIWl0ZW0pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaXRlbXNMaXN0LnVuc2VsZWN0KGl0ZW0pO1xuICAgICAgICB0aGlzLmZvY3VzKCk7XG4gICAgICAgIHRoaXMuX3VwZGF0ZU5nTW9kZWwoKTtcbiAgICAgICAgdGhpcy5yZW1vdmVFdmVudC5lbWl0KGl0ZW0pO1xuICAgIH1cblxuICAgIHNlbGVjdFRhZygpIHtcbiAgICAgICAgbGV0IHRhZztcbiAgICAgICAgaWYgKGlzRnVuY3Rpb24odGhpcy5hZGRUYWcpKSB7XG4gICAgICAgICAgICB0YWcgPSAoPEFkZFRhZ0ZuPnRoaXMuYWRkVGFnKSh0aGlzLmZpbHRlclZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRhZyA9IHRoaXMuX3ByaW1pdGl2ZSA/IHRoaXMuZmlsdGVyVmFsdWUgOiB7IFt0aGlzLmJpbmRMYWJlbF06IHRoaXMuZmlsdGVyVmFsdWUgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGhhbmRsZVRhZyA9IChpdGVtKSA9PiB0aGlzLl9pc1R5cGVhaGVhZCB8fCAhdGhpcy5pc09wZW4gPyB0aGlzLml0ZW1zTGlzdC5tYXBJdGVtKGl0ZW0sIG51bGwpIDogdGhpcy5pdGVtc0xpc3QuYWRkSXRlbShpdGVtKTtcbiAgICAgICAgaWYgKGlzUHJvbWlzZSh0YWcpKSB7XG4gICAgICAgICAgICB0YWcudGhlbihpdGVtID0+IHRoaXMuc2VsZWN0KGhhbmRsZVRhZyhpdGVtKSkpLmNhdGNoKCgpID0+IHsgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAodGFnKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdChoYW5kbGVUYWcodGFnKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzaG93Q2xlYXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsZWFyYWJsZSAmJiAodGhpcy5oYXNWYWx1ZSB8fCB0aGlzLmZpbHRlclZhbHVlKSAmJiAhdGhpcy5kaXNhYmxlZDtcbiAgICB9XG5cbiAgICBnZXQgc2hvd0FkZFRhZygpIHtcbiAgICAgICAgaWYgKCF0aGlzLmZpbHRlclZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB0ZXJtID0gdGhpcy5maWx0ZXJWYWx1ZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICByZXR1cm4gdGhpcy5hZGRUYWcgJiZcbiAgICAgICAgICAgICghdGhpcy5pdGVtc0xpc3QuZmlsdGVyZWRJdGVtcy5zb21lKHggPT4geC5sYWJlbC50b0xvd2VyQ2FzZSgpID09PSB0ZXJtKSAmJlxuICAgICAgICAgICAgICAgICghdGhpcy5oaWRlU2VsZWN0ZWQgJiYgdGhpcy5pc09wZW4gfHwgIXRoaXMuc2VsZWN0ZWRJdGVtcy5zb21lKHggPT4geC5sYWJlbC50b0xvd2VyQ2FzZSgpID09PSB0ZXJtKSkpICYmXG4gICAgICAgICAgICAhdGhpcy5sb2FkaW5nO1xuICAgIH1cblxuICAgIHNob3dOb0l0ZW1zRm91bmQoKSB7XG4gICAgICAgIGNvbnN0IGVtcHR5ID0gdGhpcy5pdGVtc0xpc3QuZmlsdGVyZWRJdGVtcy5sZW5ndGggPT09IDA7XG4gICAgICAgIHJldHVybiAoKGVtcHR5ICYmICF0aGlzLl9pc1R5cGVhaGVhZCAmJiAhdGhpcy5sb2FkaW5nKSB8fFxuICAgICAgICAgICAgKGVtcHR5ICYmIHRoaXMuX2lzVHlwZWFoZWFkICYmIHRoaXMuZmlsdGVyVmFsdWUgJiYgIXRoaXMubG9hZGluZykpICYmXG4gICAgICAgICAgICAhdGhpcy5zaG93QWRkVGFnO1xuICAgIH1cblxuICAgIHNob3dUeXBlVG9TZWFyY2goKSB7XG4gICAgICAgIGNvbnN0IGVtcHR5ID0gdGhpcy5pdGVtc0xpc3QuZmlsdGVyZWRJdGVtcy5sZW5ndGggPT09IDA7XG4gICAgICAgIHJldHVybiBlbXB0eSAmJiB0aGlzLl9pc1R5cGVhaGVhZCAmJiAhdGhpcy5maWx0ZXJWYWx1ZSAmJiAhdGhpcy5sb2FkaW5nO1xuICAgIH1cblxuICAgIGZpbHRlcih0ZXJtOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5maWx0ZXJWYWx1ZSA9IHRlcm07XG4gICAgICAgIHRoaXMub3BlbigpO1xuXG4gICAgICAgIGlmICh0aGlzLl9pc1R5cGVhaGVhZCkge1xuICAgICAgICAgICAgdGhpcy50eXBlYWhlYWQubmV4dCh0aGlzLmZpbHRlclZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaXRlbXNMaXN0LmZpbHRlcih0aGlzLmZpbHRlclZhbHVlKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzT3Blbikge1xuICAgICAgICAgICAgICAgIHRoaXMuaXRlbXNMaXN0Lm1hcmtTZWxlY3RlZE9yRGVmYXVsdCh0aGlzLm1hcmtGaXJzdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNlYXJjaEV2ZW50LmVtaXQodGVybSk7XG4gICAgfVxuXG4gICAgb25JbnB1dEZvY3VzKCRldmVudCkge1xuICAgICAgICBpZiAodGhpcy5mb2N1c2VkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnbmctc2VsZWN0LWZvY3VzZWQnKTtcbiAgICAgICAgdGhpcy5mb2N1c0V2ZW50LmVtaXQoJGV2ZW50KTtcbiAgICAgICAgdGhpcy5mb2N1c2VkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBvbklucHV0Qmx1cigkZXZlbnQpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ25nLXNlbGVjdC1mb2N1c2VkJyk7XG4gICAgICAgIHRoaXMuYmx1ckV2ZW50LmVtaXQoJGV2ZW50KTtcbiAgICAgICAgaWYgKCF0aGlzLmlzT3BlbiAmJiAhdGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5fb25Ub3VjaGVkKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5mb2N1c2VkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgb25JdGVtSG92ZXIoaXRlbTogTmdPcHRpb24pIHtcbiAgICAgICAgaWYgKGl0ZW0uZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLml0ZW1zTGlzdC5tYXJrSXRlbShpdGVtKTtcbiAgICB9XG5cbiAgICBkZXRlY3RDaGFuZ2VzKCkge1xuICAgICAgICBpZiAoISg8YW55PnRoaXMuX2NkKS5kZXN0cm95ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX2NkLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZURyb3Bkb3duUG9zaXRpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLmRyb3Bkb3duUGFuZWwpIHtcbiAgICAgICAgICAgIHRoaXMuZHJvcGRvd25QYW5lbC51cGRhdGVEcm9wZG93blBvc2l0aW9uKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9zZXRJdGVtcyhpdGVtczogYW55W10pIHtcbiAgICAgICAgY29uc3QgZmlyc3RJdGVtID0gaXRlbXNbMF07XG4gICAgICAgIHRoaXMuYmluZExhYmVsID0gdGhpcy5iaW5kTGFiZWwgfHwgdGhpcy5fZGVmYXVsdExhYmVsO1xuICAgICAgICB0aGlzLl9wcmltaXRpdmUgPSBpc0RlZmluZWQoZmlyc3RJdGVtKSA/ICFpc09iamVjdChmaXJzdEl0ZW0pIDogdGhpcy5fcHJpbWl0aXZlO1xuICAgICAgICB0aGlzLml0ZW1zTGlzdC5zZXRJdGVtcyhpdGVtcyk7XG4gICAgICAgIGlmIChpdGVtcy5sZW5ndGggPiAwICYmIHRoaXMuaGFzVmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuaXRlbXNMaXN0Lm1hcFNlbGVjdGVkSXRlbXMoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5pc09wZW4gJiYgaXNEZWZpbmVkKHRoaXMuZmlsdGVyVmFsdWUpICYmICF0aGlzLl9pc1R5cGVhaGVhZCkge1xuICAgICAgICAgICAgdGhpcy5pdGVtc0xpc3QuZmlsdGVyKHRoaXMuZmlsdGVyVmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9pc1R5cGVhaGVhZCB8fCB0aGlzLmlzT3Blbikge1xuICAgICAgICAgICAgdGhpcy5pdGVtc0xpc3QubWFya1NlbGVjdGVkT3JEZWZhdWx0KHRoaXMubWFya0ZpcnN0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX3NldEl0ZW1zRnJvbU5nT3B0aW9ucygpIHtcbiAgICAgICAgY29uc3QgaGFuZGxlTmdPcHRpb25zID0gKG9wdGlvbnM6IFF1ZXJ5TGlzdDxOZ09wdGlvbkNvbXBvbmVudD4pID0+IHtcbiAgICAgICAgICAgIHRoaXMuaXRlbXMgPSBvcHRpb25zLm1hcChvcHRpb24gPT4gKHtcbiAgICAgICAgICAgICAgICAkbmdPcHRpb25WYWx1ZTogb3B0aW9uLnZhbHVlLFxuICAgICAgICAgICAgICAgICRuZ09wdGlvbkxhYmVsOiBvcHRpb24uZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmlubmVySFRNTCxcbiAgICAgICAgICAgICAgICBkaXNhYmxlZDogb3B0aW9uLmRpc2FibGVkXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB0aGlzLml0ZW1zTGlzdC5zZXRJdGVtcyh0aGlzLml0ZW1zKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmhhc1ZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pdGVtc0xpc3QubWFwU2VsZWN0ZWRJdGVtcygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgaGFuZGxlT3B0aW9uQ2hhbmdlID0gKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY2hhbmdlZE9yRGVzdHJveWVkID0gbWVyZ2UodGhpcy5uZ09wdGlvbnMuY2hhbmdlcywgdGhpcy5fZGVzdHJveSQpO1xuICAgICAgICAgICAgbWVyZ2UoLi4udGhpcy5uZ09wdGlvbnMubWFwKG9wdGlvbiA9PiBvcHRpb24uc3RhdGVDaGFuZ2UkKSlcbiAgICAgICAgICAgICAgICAucGlwZSh0YWtlVW50aWwoY2hhbmdlZE9yRGVzdHJveWVkKSlcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKG9wdGlvbiA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLml0ZW1zTGlzdC5maW5kSXRlbShvcHRpb24udmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBpdGVtLmRpc2FibGVkID0gb3B0aW9uLmRpc2FibGVkO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLm5nT3B0aW9ucy5jaGFuZ2VzXG4gICAgICAgICAgICAucGlwZShzdGFydFdpdGgodGhpcy5uZ09wdGlvbnMpLCB0YWtlVW50aWwodGhpcy5fZGVzdHJveSQpKVxuICAgICAgICAgICAgLnN1YnNjcmliZShvcHRpb25zID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmJpbmRMYWJlbCA9IHRoaXMuX2RlZmF1bHRMYWJlbDtcbiAgICAgICAgICAgICAgICBoYW5kbGVOZ09wdGlvbnMob3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgaGFuZGxlT3B0aW9uQ2hhbmdlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9pc1ZhbGlkV3JpdGVWYWx1ZSh2YWx1ZTogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIGlmICghaXNEZWZpbmVkKHZhbHVlKSB8fCAodGhpcy5tdWx0aXBsZSAmJiB2YWx1ZSA9PT0gJycpIHx8IEFycmF5LmlzQXJyYXkodmFsdWUpICYmIHZhbHVlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdmFsaWRhdGVCaW5kaW5nID0gKGl0ZW06IGFueSk6IGJvb2xlYW4gPT4ge1xuICAgICAgICAgICAgaWYgKCFpc0RlZmluZWQodGhpcy5jb21wYXJlV2l0aCkgJiYgaXNPYmplY3QoaXRlbSkgJiYgdGhpcy5iaW5kVmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jb25zb2xlLndhcm4oYEJpbmRpbmcgb2JqZWN0KCR7SlNPTi5zdHJpbmdpZnkoaXRlbSl9KSB3aXRoIGJpbmRWYWx1ZSBpcyBub3QgYWxsb3dlZC5gKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAodGhpcy5tdWx0aXBsZSkge1xuICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NvbnNvbGUud2FybignTXVsdGlwbGUgc2VsZWN0IG5nTW9kZWwgc2hvdWxkIGJlIGFycmF5LicpO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB2YWx1ZS5ldmVyeShpdGVtID0+IHZhbGlkYXRlQmluZGluZyhpdGVtKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsaWRhdGVCaW5kaW5nKHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX2hhbmRsZVdyaXRlVmFsdWUobmdNb2RlbDogYW55IHwgYW55W10pIHtcbiAgICAgICAgaWYgKCF0aGlzLl9pc1ZhbGlkV3JpdGVWYWx1ZShuZ01vZGVsKSkge1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzZWxlY3QgPSAodmFsOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5pdGVtc0xpc3QuZmluZEl0ZW0odmFsKTtcbiAgICAgICAgICAgIGlmIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pdGVtc0xpc3Quc2VsZWN0KGl0ZW0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpc1ZhbE9iamVjdCA9IGlzT2JqZWN0KHZhbCk7XG4gICAgICAgICAgICAgICAgY29uc3QgaXNQcmltaXRpdmUgPSAhaXNWYWxPYmplY3QgJiYgIXRoaXMuYmluZFZhbHVlO1xuICAgICAgICAgICAgICAgIGlmICgoaXNWYWxPYmplY3QgfHwgaXNQcmltaXRpdmUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbXNMaXN0LnNlbGVjdCh0aGlzLml0ZW1zTGlzdC5tYXBJdGVtKHZhbCwgbnVsbCkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5iaW5kVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLmJpbmRMYWJlbF06IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5iaW5kVmFsdWVdOiB2YWxcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtc0xpc3Quc2VsZWN0KHRoaXMuaXRlbXNMaXN0Lm1hcEl0ZW0oaXRlbSwgbnVsbCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBpZiAodGhpcy5tdWx0aXBsZSkge1xuICAgICAgICAgICAgKDxhbnlbXT5uZ01vZGVsKS5mb3JFYWNoKGl0ZW0gPT4gc2VsZWN0KGl0ZW0pKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNlbGVjdChuZ01vZGVsKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX2hhbmRsZUtleVByZXNzZXMoKSB7XG4gICAgICAgIGlmICh0aGlzLnNlYXJjaGFibGUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2tleVByZXNzJFxuICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuX2Rlc3Ryb3kkKSxcbiAgICAgICAgICAgICAgICB0YXAobGV0dGVyID0+IHRoaXMuX3ByZXNzZWRLZXlzLnB1c2gobGV0dGVyKSksXG4gICAgICAgICAgICAgICAgZGVib3VuY2VUaW1lKDIwMCksXG4gICAgICAgICAgICAgICAgZmlsdGVyKCgpID0+IHRoaXMuX3ByZXNzZWRLZXlzLmxlbmd0aCA+IDApLFxuICAgICAgICAgICAgICAgIG1hcCgoKSA9PiB0aGlzLl9wcmVzc2VkS2V5cy5qb2luKCcnKSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKHRlcm0gPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLml0ZW1zTGlzdC5maW5kQnlMYWJlbCh0ZXJtKTtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc09wZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbXNMaXN0Lm1hcmtJdGVtKGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2QubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdChpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLl9wcmVzc2VkS2V5cyA9IFtdO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfdXBkYXRlTmdNb2RlbCgpIHtcbiAgICAgICAgY29uc3QgbW9kZWwgPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIHRoaXMuc2VsZWN0ZWRJdGVtcykge1xuICAgICAgICAgICAgaWYgKHRoaXMuYmluZFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlID0gbnVsbDtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5jaGlsZHJlbikge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IGl0ZW0udmFsdWVbPHN0cmluZz50aGlzLmdyb3VwQnldO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdGhpcy5pdGVtc0xpc3QucmVzb2x2ZU5lc3RlZChpdGVtLnZhbHVlLCB0aGlzLmJpbmRWYWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG1vZGVsLnB1c2godmFsdWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBtb2RlbC5wdXNoKGl0ZW0udmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc2VsZWN0ZWQgPSB0aGlzLnNlbGVjdGVkSXRlbXMubWFwKHggPT4geC52YWx1ZSk7XG4gICAgICAgIGlmICh0aGlzLm11bHRpcGxlKSB7XG4gICAgICAgICAgICB0aGlzLl9vbkNoYW5nZShtb2RlbCk7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZUV2ZW50LmVtaXQoc2VsZWN0ZWQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fb25DaGFuZ2UoaXNEZWZpbmVkKG1vZGVsWzBdKSA/IG1vZGVsWzBdIDogbnVsbCk7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZUV2ZW50LmVtaXQoc2VsZWN0ZWRbMF0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fY2QubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfY2xlYXJTZWFyY2goKSB7XG4gICAgICAgIGlmICghdGhpcy5maWx0ZXJWYWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5maWx0ZXJWYWx1ZSA9IG51bGw7XG4gICAgICAgIHRoaXMuaXRlbXNMaXN0LnJlc2V0RmlsdGVyZWRJdGVtcygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3Njcm9sbFRvTWFya2VkKCkge1xuICAgICAgICBpZiAoIXRoaXMuaXNPcGVuIHx8ICF0aGlzLmRyb3Bkb3duUGFuZWwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRyb3Bkb3duUGFuZWwuc2Nyb2xsSW50byh0aGlzLml0ZW1zTGlzdC5tYXJrZWRJdGVtKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9zY3JvbGxUb1RhZygpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzT3BlbiB8fCAhdGhpcy5kcm9wZG93blBhbmVsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kcm9wZG93blBhbmVsLnNjcm9sbEludG9UYWcoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9oYW5kbGVUYWIoJGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5pc09wZW4pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zZWxlY3RPblRhYikge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXRlbXNMaXN0Lm1hcmtlZEl0ZW0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRvZ2dsZUl0ZW0odGhpcy5pdGVtc0xpc3QubWFya2VkSXRlbSk7XG4gICAgICAgICAgICAgICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc2hvd0FkZFRhZykge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0VGFnKCk7XG4gICAgICAgICAgICAgICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX2hhbmRsZUVudGVyKCRldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBpZiAodGhpcy5pc09wZW4gfHwgdGhpcy5fbWFudWFsT3Blbikge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXRlbXNMaXN0Lm1hcmtlZEl0ZW0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRvZ2dsZUl0ZW0odGhpcy5pdGVtc0xpc3QubWFya2VkSXRlbSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc2hvd0FkZFRhZykge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0VGFnKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5vcGVuT25FbnRlcikge1xuICAgICAgICAgICAgdGhpcy5vcGVuKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2hhbmRsZVNwYWNlKCRldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBpZiAodGhpcy5pc09wZW4gfHwgdGhpcy5fbWFudWFsT3Blbikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMub3BlbigpO1xuICAgICAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9oYW5kbGVBcnJvd0Rvd24oJGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLl9uZXh0SXRlbUlzVGFnKCsxKSkge1xuICAgICAgICAgICAgdGhpcy5pdGVtc0xpc3QudW5tYXJrSXRlbSgpO1xuICAgICAgICAgICAgdGhpcy5fc2Nyb2xsVG9UYWcoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaXRlbXNMaXN0Lm1hcmtOZXh0SXRlbSgpO1xuICAgICAgICAgICAgdGhpcy5fc2Nyb2xsVG9NYXJrZWQoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm9wZW4oKTtcbiAgICAgICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaGFuZGxlQXJyb3dVcCgkZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzT3Blbikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX25leHRJdGVtSXNUYWcoLTEpKSB7XG4gICAgICAgICAgICB0aGlzLml0ZW1zTGlzdC51bm1hcmtJdGVtKCk7XG4gICAgICAgICAgICB0aGlzLl9zY3JvbGxUb1RhZygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5pdGVtc0xpc3QubWFya1ByZXZpb3VzSXRlbSgpO1xuICAgICAgICAgICAgdGhpcy5fc2Nyb2xsVG9NYXJrZWQoKTtcbiAgICAgICAgfVxuICAgICAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9uZXh0SXRlbUlzVGFnKG5leHRTdGVwOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICAgICAgY29uc3QgbmV4dEluZGV4ID0gdGhpcy5pdGVtc0xpc3QubWFya2VkSW5kZXggKyBuZXh0U3RlcDtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWRkVGFnICYmIHRoaXMuZmlsdGVyVmFsdWVcbiAgICAgICAgICAgICYmIHRoaXMuaXRlbXNMaXN0Lm1hcmtlZEl0ZW1cbiAgICAgICAgICAgICYmIChuZXh0SW5kZXggPCAwIHx8IG5leHRJbmRleCA9PT0gdGhpcy5pdGVtc0xpc3QuZmlsdGVyZWRJdGVtcy5sZW5ndGgpXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaGFuZGxlQmFja3NwYWNlKCkge1xuICAgICAgICBpZiAodGhpcy5maWx0ZXJWYWx1ZSB8fCAhdGhpcy5jbGVhcmFibGUgfHwgIXRoaXMuY2xlYXJPbkJhY2tzcGFjZSB8fCAhdGhpcy5oYXNWYWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubXVsdGlwbGUpIHtcbiAgICAgICAgICAgIHRoaXMudW5zZWxlY3QodGhpcy5pdGVtc0xpc3QubGFzdFNlbGVjdGVkSXRlbSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFyTW9kZWwoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0IF9pc1R5cGVhaGVhZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudHlwZWFoZWFkICYmIHRoaXMudHlwZWFoZWFkLm9ic2VydmVycy5sZW5ndGggPiAwO1xuICAgIH1cblxuICAgIHByaXZhdGUgX21lcmdlR2xvYmFsQ29uZmlnKGNvbmZpZzogTmdTZWxlY3RDb25maWcpIHtcbiAgICAgICAgdGhpcy5wbGFjZWhvbGRlciA9IHRoaXMucGxhY2Vob2xkZXIgfHwgY29uZmlnLnBsYWNlaG9sZGVyO1xuICAgICAgICB0aGlzLm5vdEZvdW5kVGV4dCA9IHRoaXMubm90Rm91bmRUZXh0IHx8IGNvbmZpZy5ub3RGb3VuZFRleHQ7XG4gICAgICAgIHRoaXMudHlwZVRvU2VhcmNoVGV4dCA9IHRoaXMudHlwZVRvU2VhcmNoVGV4dCB8fCBjb25maWcudHlwZVRvU2VhcmNoVGV4dDtcbiAgICAgICAgdGhpcy5hZGRUYWdUZXh0ID0gdGhpcy5hZGRUYWdUZXh0IHx8IGNvbmZpZy5hZGRUYWdUZXh0O1xuICAgICAgICB0aGlzLmxvYWRpbmdUZXh0ID0gdGhpcy5sb2FkaW5nVGV4dCB8fCBjb25maWcubG9hZGluZ1RleHQ7XG4gICAgICAgIHRoaXMuY2xlYXJBbGxUZXh0ID0gdGhpcy5jbGVhckFsbFRleHQgfHwgY29uZmlnLmNsZWFyQWxsVGV4dDtcbiAgICAgICAgdGhpcy52aXJ0dWFsU2Nyb2xsID0gaXNEZWZpbmVkKHRoaXMudmlydHVhbFNjcm9sbClcbiAgICAgICAgICAgID8gdGhpcy52aXJ0dWFsU2Nyb2xsXG4gICAgICAgICAgICA6IGlzRGVmaW5lZChjb25maWcuZGlzYWJsZVZpcnR1YWxTY3JvbGwpID8gIWNvbmZpZy5kaXNhYmxlVmlydHVhbFNjcm9sbCA6IGZhbHNlO1xuICAgICAgICB0aGlzLm9wZW5PbkVudGVyID0gaXNEZWZpbmVkKHRoaXMub3Blbk9uRW50ZXIpID8gdGhpcy5vcGVuT25FbnRlciA6IGNvbmZpZy5vcGVuT25FbnRlcjtcbiAgICB9XG59XG4iXX0=