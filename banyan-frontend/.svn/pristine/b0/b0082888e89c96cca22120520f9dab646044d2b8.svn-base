import * as tslib_1 from "tslib";
import { Constants } from '../constants';
import { FieldType, } from './../models/index';
import { CollectionService } from '../services/index';
import { charArraysEqual, findOrDefault, getDescendantProperty, htmlEncode, unsubscribeAllObservables } from '../services/utilities';
import * as DOMPurify_ from 'dompurify';
var DOMPurify = DOMPurify_; // patch to fix rollup to work
/**
 * Slickgrid editor class for multiple/single select lists
 */
var SelectEditor = /** @class */ (function () {
    function SelectEditor(args, isMultipleSelect) {
        var _this = this;
        this.args = args;
        this.isMultipleSelect = isMultipleSelect;
        /** Observable Subscriptions */
        this._subscriptions = [];
        // flag to signal that the editor is destroying itself, helps prevent
        // commit changes from being called twice and erroring
        this._destroying = false;
        this.gridOptions = this.args.grid.getOptions();
        var gridOptions = this.gridOptions || this.args.column.params || {};
        this._translate = gridOptions.i18n;
        // provide the name attribute to the DOM element which will be needed to auto-adjust drop position (dropup / dropdown)
        var fieldId = this.columnDef && this.columnDef.id;
        this.elementName = "editor-" + fieldId;
        var libOptions = {
            autoAdjustDropHeight: true,
            autoAdjustDropPosition: true,
            autoAdjustDropWidthByTextSize: true,
            container: 'body',
            filter: false,
            maxHeight: 275,
            name: this.elementName,
            single: true,
            textTemplate: function ($elm) {
                // render HTML code or not, by default it is sanitized and won't be rendered
                var isRenderHtmlEnabled = _this.columnDef && _this.columnDef.internalColumnEditor && _this.columnDef.internalColumnEditor.enableRenderHtml || false;
                return isRenderHtmlEnabled ? $elm.text() : $elm.html();
            },
            onBlur: function () { return _this.destroy(); },
            onClose: function () {
                if (!_this._destroying && _this.hasAutoCommitEdit) {
                    // do not use args.commitChanges() as this sets the focus to the next
                    // row. Also the select list will stay shown when clicking off the grid
                    args.grid.getEditorLock().commitCurrentEdit();
                }
            }
        };
        if (isMultipleSelect) {
            libOptions.single = false;
            libOptions.addTitle = true;
            libOptions.okButton = true;
            libOptions.selectAllDelimiter = ['', ''];
            if (this._translate) {
                libOptions.countSelected = this._translate.instant('X_OF_Y_SELECTED');
                libOptions.allSelected = this._translate.instant('ALL_SELECTED');
                libOptions.selectAllText = this._translate.instant('SELECT_ALL');
            }
        }
        // assign the multiple select lib options
        this.defaultOptions = libOptions;
        this.init();
    }
    Object.defineProperty(SelectEditor.prototype, "collection", {
        /** Get the Collection */
        get: function () {
            return this.columnDef && this.columnDef && this.columnDef.internalColumnEditor.collection || [];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectEditor.prototype, "collectionOptions", {
        /** Getter for the Collection Options */
        get: function () {
            return this.columnDef && this.columnDef.internalColumnEditor && this.columnDef.internalColumnEditor.collectionOptions;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectEditor.prototype, "columnDef", {
        /** Get Column Definition object */
        get: function () {
            return this.args && this.args.column || {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectEditor.prototype, "columnEditor", {
        /** Get Column Editor object */
        get: function () {
            return this.columnDef && this.columnDef.internalColumnEditor && this.columnDef.internalColumnEditor || {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectEditor.prototype, "customStructure", {
        /** Getter for the Custom Structure if exist */
        get: function () {
            return this.columnDef && this.columnDef.internalColumnEditor && this.columnDef.internalColumnEditor.customStructure;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectEditor.prototype, "hasAutoCommitEdit", {
        get: function () {
            return this.args.grid.getOptions().autoCommitEdit;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectEditor.prototype, "currentValues", {
        /**
         * The current selected values (multiple select) from the collection
         */
        get: function () {
            var _this = this;
            // collection of strings, just return the filtered string that are equals
            if (this.collection.every(function (x) { return typeof x === 'string'; })) {
                return this.collection.filter(function (c) { return _this.$editorElm.val().indexOf(c.toString()) !== -1; });
            }
            // collection of label/value pair
            var separatorBetweenLabels = this.collectionOptions && this.collectionOptions.separatorBetweenTextLabels || '';
            var isIncludingPrefixSuffix = this.collectionOptions && this.collectionOptions.includePrefixSuffixToSelectedValues || false;
            return this.collection
                .filter(function (c) { return _this.$editorElm.val().indexOf(c[_this.valueName].toString()) !== -1; })
                .map(function (c) {
                var labelText = c[_this.valueName];
                var prefixText = c[_this.labelPrefixName] || '';
                var suffixText = c[_this.labelSuffixName] || '';
                // when it's a complex object, then pull the object name only, e.g.: "user.firstName" => "user"
                var fieldName = _this.columnDef && _this.columnDef.field;
                var fieldNameFromComplexObject = fieldName.indexOf('.') ? fieldName.substring(0, fieldName.indexOf('.')) : '';
                if (fieldNameFromComplexObject && typeof c === 'object') {
                    return c;
                }
                // also translate prefix/suffix if enableTranslateLabel is true and text is a string
                prefixText = (_this.enableTranslateLabel && prefixText && typeof prefixText === 'string') ? _this._translate.instant(prefixText || ' ') : prefixText;
                suffixText = (_this.enableTranslateLabel && suffixText && typeof suffixText === 'string') ? _this._translate.instant(suffixText || ' ') : suffixText;
                if (isIncludingPrefixSuffix) {
                    var tmpOptionArray = [prefixText, labelText, suffixText].filter(function (text) { return text; }); // add to a temp array for joining purpose and filter out empty text
                    return tmpOptionArray.join(separatorBetweenLabels);
                }
                return labelText;
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectEditor.prototype, "currentValue", {
        /**
         * The current selected values (single select) from the collection
         */
        get: function () {
            var _this = this;
            // collection of strings, just return the filtered string that are equals
            if (this.collection.every(function (x) { return typeof x === 'string'; })) {
                return findOrDefault(this.collection, function (c) { return c.toString() === _this.$editorElm.val(); });
            }
            // collection of label/value pair
            var separatorBetweenLabels = this.collectionOptions && this.collectionOptions.separatorBetweenTextLabels || '';
            var isIncludingPrefixSuffix = this.collectionOptions && this.collectionOptions.includePrefixSuffixToSelectedValues || false;
            var itemFound = findOrDefault(this.collection, function (c) { return c[_this.valueName].toString() === _this.$editorElm.val(); });
            // when it's a complex object, then pull the object name only, e.g.: "user.firstName" => "user"
            var fieldName = this.columnDef && this.columnDef.field;
            var fieldNameFromComplexObject = fieldName.indexOf('.') ? fieldName.substring(0, fieldName.indexOf('.')) : '';
            if (fieldNameFromComplexObject && typeof itemFound === 'object') {
                return itemFound;
            }
            else if (itemFound) {
                var labelText = itemFound[this.valueName];
                if (isIncludingPrefixSuffix) {
                    var prefixText = itemFound[this.labelPrefixName] || '';
                    var suffixText = itemFound[this.labelSuffixName] || '';
                    // also translate prefix/suffix if enableTranslateLabel is true and text is a string
                    prefixText = (this.enableTranslateLabel && prefixText && typeof prefixText === 'string') ? this._translate.instant(prefixText || ' ') : prefixText;
                    suffixText = (this.enableTranslateLabel && suffixText && typeof suffixText === 'string') ? this._translate.instant(suffixText || ' ') : suffixText;
                    // add to a temp array for joining purpose and filter out empty text
                    var tmpOptionArray = [prefixText, labelText, suffixText].filter(function (text) { return text; });
                    return tmpOptionArray.join(separatorBetweenLabels);
                }
                return labelText;
            }
            return '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectEditor.prototype, "validator", {
        /** Get the Validator function, can be passed in Editor property or Column Definition */
        get: function () {
            return this.columnEditor.validator || this.columnDef.validator;
        },
        enumerable: true,
        configurable: true
    });
    SelectEditor.prototype.init = function () {
        if (!this.args) {
            throw new Error('[Angular-SlickGrid] An editor must always have an "init()" with valid arguments.');
        }
        if (!this.columnDef || !this.columnDef.internalColumnEditor || (!this.columnDef.internalColumnEditor.collection && !this.columnDef.internalColumnEditor.collectionAsync)) {
            throw new Error("[Angular-SlickGrid] You need to pass a \"collection\" (or \"collectionAsync\") inside Column Definition Editor for the MultipleSelect/SingleSelect Editor to work correctly.\n      Also each option should include a value/label pair (or value/labelKey when using Locale).\n      For example: { editor: { collection: [{ value: true, label: 'True' },{ value: false, label: 'False'}] } }");
        }
        this._collectionService = new CollectionService(this._translate);
        this.enableTranslateLabel = (this.columnDef.internalColumnEditor.enableTranslateLabel) ? this.columnDef.internalColumnEditor.enableTranslateLabel : false;
        this.labelName = this.customStructure && this.customStructure.label || 'label';
        this.labelPrefixName = this.customStructure && this.customStructure.labelPrefix || 'labelPrefix';
        this.labelSuffixName = this.customStructure && this.customStructure.labelSuffix || 'labelSuffix';
        this.optionLabel = this.customStructure && this.customStructure.optionLabel || 'value';
        this.valueName = this.customStructure && this.customStructure.value || 'value';
        if (this.enableTranslateLabel && (!this._translate || typeof this._translate.instant !== 'function')) {
            throw new Error("[select-editor] The ngx-translate TranslateService is required for the Select Editor to work correctly");
        }
        // always render the Select (dropdown) DOM element, even if user passed a "collectionAsync",
        // if that is the case, the Select will simply be without any options but we still have to render it (else SlickGrid would throw an error)
        this.renderDomElement(this.collection);
    };
    SelectEditor.prototype.applyValue = function (item, state) {
        var fieldName = this.columnDef && this.columnDef.field;
        var fieldType = this.columnDef && this.columnDef.type;
        var newValue = state;
        // when the provided user defined the column field type as a possible number then try parsing the state value as that
        if (fieldType === FieldType.number || fieldType === FieldType.integer || fieldType === FieldType.boolean) {
            newValue = parseFloat(state);
        }
        // when set as a multiple selection, we can assume that the 3rd party lib multiple-select will return a CSV string
        // we need to re-split that into an array to be the same as the original column
        if (this.isMultipleSelect && typeof state === 'string' && state.indexOf(',') >= 0) {
            newValue = state.split(',');
        }
        // when it's a complex object, then pull the object name only, e.g.: "user.firstName" => "user"
        var fieldNameFromComplexObject = fieldName.indexOf('.') ? fieldName.substring(0, fieldName.indexOf('.')) : '';
        var validation = this.validate(newValue);
        item[fieldNameFromComplexObject || fieldName] = (validation && validation.valid) ? newValue : '';
    };
    SelectEditor.prototype.destroy = function () {
        this._destroying = true;
        if (this.$editorElm && typeof this.$editorElm.multipleSelect === 'function') {
            this.$editorElm.multipleSelect('destroy');
            this.$editorElm.remove();
            var elementClassName = this.elementName.toString().replace('.', '\\.'); // make sure to escape any dot "." from CSS class to avoid console error
            $("[name=" + elementClassName + "].ms-drop").remove();
        }
        else if (this.$editorElm && typeof this.$editorElm.remove === 'function') {
            this.$editorElm.remove();
        }
        this._subscriptions = unsubscribeAllObservables(this._subscriptions);
    };
    SelectEditor.prototype.loadValue = function (item) {
        var fieldName = this.columnDef && this.columnDef.field;
        // when it's a complex object, then pull the object name only, e.g.: "user.firstName" => "user"
        var fieldNameFromComplexObject = fieldName.indexOf('.') ? fieldName.substring(0, fieldName.indexOf('.')) : '';
        if (item && this.columnDef && (item.hasOwnProperty(fieldName) || item.hasOwnProperty(fieldNameFromComplexObject))) {
            var currentValue = item[fieldNameFromComplexObject || fieldName];
            var loadValue = fieldNameFromComplexObject && currentValue.hasOwnProperty(this.valueName) ? currentValue[this.valueName] : currentValue;
            if (this.isMultipleSelect && Array.isArray(loadValue)) {
                this.loadMultipleValues(loadValue);
            }
            else {
                this.loadSingleValue(loadValue);
            }
            this.refresh();
        }
    };
    SelectEditor.prototype.loadMultipleValues = function (currentValues) {
        // convert to string because that is how the DOM will return these values
        if (Array.isArray(currentValues)) {
            // keep the default values in memory for references
            this.defaultValue = currentValues.map(function (i) { return i; });
            // compare all the array values but as string type since multiple-select always return string
            var currentStringValues_1 = currentValues.map(function (i) { return i.toString(); });
            this.$editorElm.find('option').each(function (i, $e) {
                $e.selected = (currentStringValues_1.indexOf($e.value) !== -1);
            });
        }
    };
    SelectEditor.prototype.loadSingleValue = function (currentValue) {
        // keep the default value in memory for references
        this.defaultValue = currentValue;
        // make sure the prop exists first
        this.$editorElm.find('option').each(function (i, $e) {
            // check equality after converting defaultValue to string since the DOM value will always be of type string
            $e.selected = (currentValue.toString() === $e.value);
        });
    };
    SelectEditor.prototype.serializeValue = function () {
        return (this.isMultipleSelect) ? this.currentValues : this.currentValue;
    };
    SelectEditor.prototype.focus = function () {
        if (this.$editorElm && this.$editorElm.multipleSelect) {
            this.$editorElm.multipleSelect('focus');
        }
    };
    SelectEditor.prototype.isValueChanged = function () {
        if (this.isMultipleSelect) {
            return !charArraysEqual(this.$editorElm.val(), this.defaultValue);
        }
        return this.$editorElm.val() !== this.defaultValue;
    };
    SelectEditor.prototype.validate = function (inputValue) {
        var isRequired = this.columnEditor.required;
        var elmValue = (inputValue !== undefined) ? inputValue : this.$editorElm && this.$editorElm.val && this.$editorElm.val();
        var errorMsg = this.columnEditor.errorMessage;
        if (this.validator) {
            var value = (inputValue !== undefined) ? inputValue : (this.isMultipleSelect ? this.currentValues : this.currentValue);
            return this.validator(value, this.args);
        }
        // by default the editor is almost always valid (except when it's required but not provided)
        if (isRequired && (elmValue === '' || (Array.isArray(elmValue) && elmValue.length === 0))) {
            return {
                valid: false,
                msg: errorMsg || Constants.VALIDATION_REQUIRED_FIELD
            };
        }
        return {
            valid: true,
            msg: null
        };
    };
    //
    // protected functions
    // ------------------
    /**
     * user might want to filter certain items of the collection
     * @param inputCollection
     * @return outputCollection filtered and/or sorted collection
     */
    SelectEditor.prototype.filterCollection = function (inputCollection) {
        var outputCollection = inputCollection;
        // user might want to filter certain items of the collection
        if (this.columnEditor && this.columnEditor.collectionFilterBy) {
            var filterBy = this.columnEditor.collectionFilterBy;
            var filterCollectionBy = this.columnEditor.collectionOptions && this.columnEditor.collectionOptions.filterResultAfterEachPass || null;
            outputCollection = this._collectionService.filterCollection(outputCollection, filterBy, filterCollectionBy);
        }
        return outputCollection;
    };
    /**
     * user might want to sort the collection in a certain way
     * @param inputCollection
     * @return outputCollection sorted collection
     */
    SelectEditor.prototype.sortCollection = function (inputCollection) {
        var outputCollection = inputCollection;
        // user might want to sort the collection
        if (this.columnDef.internalColumnEditor && this.columnDef.internalColumnEditor.collectionSortBy) {
            var sortBy = this.columnDef.internalColumnEditor.collectionSortBy;
            outputCollection = this._collectionService.sortCollection(this.columnDef, outputCollection, sortBy, this.enableTranslateLabel);
        }
        return outputCollection;
    };
    SelectEditor.prototype.renderDomElement = function (collection) {
        if (!Array.isArray(collection) && this.collectionOptions && this.collectionOptions.collectionInObjectProperty) {
            collection = getDescendantProperty(collection, this.collectionOptions.collectionInObjectProperty);
        }
        if (!Array.isArray(collection)) {
            throw new Error('The "collection" passed to the Select Editor is not a valid array');
        }
        // user can optionally add a blank entry at the beginning of the collection
        if (this.collectionOptions && this.collectionOptions.addBlankEntry) {
            collection.unshift(this.createBlankEntry());
        }
        var newCollection = collection || [];
        // user might want to filter and/or sort certain items of the collection
        newCollection = this.filterCollection(newCollection);
        newCollection = this.sortCollection(newCollection);
        // step 1, create HTML string template
        var editorTemplate = this.buildTemplateHtmlString(newCollection);
        // step 2, create the DOM Element of the editor
        // also subscribe to the onClose event
        this.createDomElement(editorTemplate);
    };
    SelectEditor.prototype.buildTemplateHtmlString = function (collection) {
        var _this = this;
        var options = '';
        var fieldId = this.columnDef && this.columnDef.id;
        var separatorBetweenLabels = this.collectionOptions && this.collectionOptions.separatorBetweenTextLabels || '';
        var isRenderHtmlEnabled = this.columnDef.internalColumnEditor.enableRenderHtml || false;
        var sanitizedOptions = this.gridOptions && this.gridOptions.sanitizeHtmlOptions || {};
        // collection could be an Array of Strings OR Objects
        if (collection.every(function (x) { return typeof x === 'string'; })) {
            collection.forEach(function (option) {
                options += "<option value=\"" + option + "\" label=\"" + option + "\">" + option + "</option>";
            });
        }
        else {
            // array of objects will require a label/value pair unless a customStructure is passed
            collection.forEach(function (option) {
                if (!option || (option[_this.labelName] === undefined && option.labelKey === undefined)) {
                    throw new Error("[select-editor] A collection with value/label (or value/labelKey when using Locale) is required to populate the Select list, for example: { collection: [ { value: '1', label: 'One' } ])");
                }
                var labelKey = (option.labelKey || option[_this.labelName]);
                var labelText = ((option.labelKey || _this.enableTranslateLabel) && labelKey) ? _this._translate.instant(labelKey || ' ') : labelKey;
                var prefixText = option[_this.labelPrefixName] || '';
                var suffixText = option[_this.labelSuffixName] || '';
                var optionLabel = option[_this.optionLabel] || '';
                optionLabel = optionLabel.toString().replace(/\"/g, '\''); // replace double quotes by single quotes to avoid interfering with regular html
                // also translate prefix/suffix if enableTranslateLabel is true and text is a string
                prefixText = (_this.enableTranslateLabel && prefixText && typeof prefixText === 'string') ? _this._translate.instant(prefixText || ' ') : prefixText;
                suffixText = (_this.enableTranslateLabel && suffixText && typeof suffixText === 'string') ? _this._translate.instant(suffixText || ' ') : suffixText;
                optionLabel = (_this.enableTranslateLabel && optionLabel && typeof optionLabel === 'string') ? _this._translate.instant(optionLabel || ' ') : optionLabel;
                // add to a temp array for joining purpose and filter out empty text
                var tmpOptionArray = [prefixText, labelText, suffixText].filter(function (text) { return text; });
                var optionText = tmpOptionArray.join(separatorBetweenLabels);
                // if user specifically wants to render html text, he needs to opt-in else it will stripped out by default
                // also, the 3rd party lib will saninitze any html code unless it's encoded, so we'll do that
                if (isRenderHtmlEnabled) {
                    // sanitize any unauthorized html tags like script and others
                    // for the remaining allowed tags we'll permit all attributes
                    var sanitizedText = DOMPurify.sanitize(optionText, sanitizedOptions);
                    optionText = htmlEncode(sanitizedText);
                }
                options += "<option value=\"" + option[_this.valueName] + "\" label=\"" + optionLabel + "\">" + optionText + "</option>";
            });
        }
        return "<select id=\"" + this.elementName + "\" class=\"ms-filter search-filter editor-" + fieldId + "\" " + (this.isMultipleSelect ? 'multiple="multiple"' : '') + ">" + options + "</select>";
    };
    /** Create a blank entry that can be added to the collection. It will also reuse the same customStructure if need be */
    SelectEditor.prototype.createBlankEntry = function () {
        var _a;
        var blankEntry = (_a = {},
            _a[this.labelName] = '',
            _a[this.valueName] = '',
            _a);
        if (this.labelPrefixName) {
            blankEntry[this.labelPrefixName] = '';
        }
        if (this.labelSuffixName) {
            blankEntry[this.labelSuffixName] = '';
        }
        return blankEntry;
    };
    /** Build the template HTML string */
    SelectEditor.prototype.createDomElement = function (editorTemplate) {
        var _this = this;
        this.$editorElm = $(editorTemplate);
        if (this.$editorElm && typeof this.$editorElm.appendTo === 'function') {
            this.$editorElm.appendTo(this.args.container);
        }
        if (typeof this.$editorElm.multipleSelect !== 'function') {
            // fallback to bootstrap
            this.$editorElm.addClass('form-control');
        }
        else {
            var elementOptions = (this.columnDef.internalColumnEditor) ? this.columnDef.internalColumnEditor.elementOptions : {};
            this.editorElmOptions = tslib_1.__assign({}, this.defaultOptions, elementOptions);
            this.$editorElm = this.$editorElm.multipleSelect(this.editorElmOptions);
            setTimeout(function () {
                if (_this.$editorElm && typeof _this.$editorElm.multipleSelect === 'function') {
                    _this.$editorElm.multipleSelect('open');
                }
            });
        }
    };
    // refresh the jquery object because the selected checkboxes were already set
    // prior to this method being called
    SelectEditor.prototype.refresh = function () {
        if (typeof this.$editorElm.multipleSelect === 'function') {
            this.$editorElm.multipleSelect('refresh');
        }
    };
    return SelectEditor;
}());
export { SelectEditor };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0RWRpdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9lZGl0b3JzL3NlbGVjdEVkaXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN6QyxPQUFPLEVBUUwsU0FBUyxHQUlWLE1BQU0sbUJBQW1CLENBQUM7QUFDM0IsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDdEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxhQUFhLEVBQUUscUJBQXFCLEVBQUUsVUFBVSxFQUFFLHlCQUF5QixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFckksT0FBTyxLQUFLLFVBQVUsTUFBTSxXQUFXLENBQUM7QUFDeEMsSUFBTSxTQUFTLEdBQUcsVUFBVSxDQUFDLENBQUMsOEJBQThCO0FBSzVEOztHQUVHO0FBQ0g7SUFrREUsc0JBQXNCLElBQVMsRUFBWSxnQkFBZ0I7UUFBM0QsaUJBa0RDO1FBbERxQixTQUFJLEdBQUosSUFBSSxDQUFLO1FBQVkscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFBO1FBYjNELCtCQUErQjtRQUMvQixtQkFBYyxHQUFtQixFQUFFLENBQUM7UUFFcEMscUVBQXFFO1FBQ3JFLHNEQUFzRDtRQUM1QyxnQkFBVyxHQUFHLEtBQUssQ0FBQztRQVM1QixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBZ0IsQ0FBQztRQUM3RCxJQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUM7UUFDdEUsSUFBSSxDQUFDLFVBQVUsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDO1FBRW5DLHNIQUFzSDtRQUN0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TUFBTSxDQUFDLENBQUM7aUJBQ3hDO1lBQ0gsQ0FBQyxDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7SUFFRCw2RUFBNkU7SUFDN0Usb0NBQW9DO0lBQzFCLDhCQUFPLEdBQWpCO1FBQ0UsSUFBSSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsY0FBYyxLQUFLLFVBQVUsRUFBRTtZQUN4RCxJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUMzQztJQUNILENBQUM7SUFDSCxtQkFBQztBQUFELENBQUMsQUE5Z0JELElBOGdCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcclxuaW1wb3J0IHsgQ29uc3RhbnRzIH0gZnJvbSAnLi4vY29uc3RhbnRzJztcclxuaW1wb3J0IHtcclxuICBDb2xsZWN0aW9uQ3VzdG9tU3RydWN0dXJlLFxyXG4gIENvbGxlY3Rpb25PcHRpb24sXHJcbiAgQ29sdW1uLFxyXG4gIENvbHVtbkVkaXRvcixcclxuICBFZGl0b3IsXHJcbiAgRWRpdG9yVmFsaWRhdG9yLFxyXG4gIEVkaXRvclZhbGlkYXRvck91dHB1dCxcclxuICBGaWVsZFR5cGUsXHJcbiAgR3JpZE9wdGlvbixcclxuICBNdWx0aXBsZVNlbGVjdE9wdGlvbixcclxuICBTZWxlY3RPcHRpb24sXHJcbn0gZnJvbSAnLi8uLi9tb2RlbHMvaW5kZXgnO1xyXG5pbXBvcnQgeyBDb2xsZWN0aW9uU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2luZGV4JztcclxuaW1wb3J0IHsgY2hhckFycmF5c0VxdWFsLCBmaW5kT3JEZWZhdWx0LCBnZXREZXNjZW5kYW50UHJvcGVydHksIGh0bWxFbmNvZGUsIHVuc3Vic2NyaWJlQWxsT2JzZXJ2YWJsZXMgfSBmcm9tICcuLi9zZXJ2aWNlcy91dGlsaXRpZXMnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuaW1wb3J0ICogYXMgRE9NUHVyaWZ5XyBmcm9tICdkb21wdXJpZnknO1xyXG5jb25zdCBET01QdXJpZnkgPSBET01QdXJpZnlfOyAvLyBwYXRjaCB0byBmaXggcm9sbHVwIHRvIHdvcmtcclxuXHJcbi8vIHVzaW5nIGV4dGVybmFsIG5vbi10eXBlZCBqcyBsaWJyYXJpZXNcclxuZGVjbGFyZSB2YXIgJDogYW55O1xyXG5cclxuLyoqXHJcbiAqIFNsaWNrZ3JpZCBlZGl0b3IgY2xhc3MgZm9yIG11bHRpcGxlL3NpbmdsZSBzZWxlY3QgbGlzdHNcclxuICovXHJcbmV4cG9ydCBjbGFzcyBTZWxlY3RFZGl0b3IgaW1wbGVtZW50cyBFZGl0b3Ige1xyXG4gIC8qKiBUaGUgSlF1ZXJ5IERPTSBlbGVtZW50ICovXHJcbiAgJGVkaXRvckVsbTogYW55O1xyXG5cclxuICAvKiogRWRpdG9yIE11bHRpcGxlLVNlbGVjdCBvcHRpb25zICovXHJcbiAgZWRpdG9yRWxtT3B0aW9uczogTXVsdGlwbGVTZWxlY3RPcHRpb247XHJcblxyXG4gIC8qKiBET00gRWxlbWVudCBOYW1lLCB1c2VmdWwgZm9yIGF1dG8tZGV0ZWN0aW5nIHBvc2l0aW9uaW5nIChkcm9wdXAgLyBkcm9wZG93bikgKi9cclxuICBlbGVtZW50TmFtZTogc3RyaW5nO1xyXG5cclxuICAvKiogVGhlIG11bHRpcGxlLXNlbGVjdCBvcHRpb25zIGZvciBhIG11bHRpcGxlIHNlbGVjdCBsaXN0ICovXHJcbiAgZGVmYXVsdE9wdGlvbnM6IE11bHRpcGxlU2VsZWN0T3B0aW9uO1xyXG5cclxuICAvKiogVGhlIGRlZmF1bHQgaXRlbSB2YWx1ZXMgdGhhdCBhcmUgc2V0ICovXHJcbiAgZGVmYXVsdFZhbHVlOiBhbnlbXTtcclxuXHJcbiAgLyoqIFRoZSBwcm9wZXJ0eSBuYW1lIGZvciB2YWx1ZXMgaW4gdGhlIGNvbGxlY3Rpb24gKi9cclxuICB2YWx1ZU5hbWU6IHN0cmluZztcclxuXHJcbiAgLyoqIFRoZSBwcm9wZXJ0eSBuYW1lIGZvciBsYWJlbHMgaW4gdGhlIGNvbGxlY3Rpb24gKi9cclxuICBsYWJlbE5hbWU6IHN0cmluZztcclxuXHJcbiAgLyoqIFRoZSBwcm9wZXJ0eSBuYW1lIGZvciBhIHByZWZpeCB0aGF0IGNhbiBiZSBhZGRlZCB0byB0aGUgbGFiZWxzIGluIHRoZSBjb2xsZWN0aW9uICovXHJcbiAgbGFiZWxQcmVmaXhOYW1lOiBzdHJpbmc7XHJcblxyXG4gIC8qKiBUaGUgcHJvcGVydHkgbmFtZSBmb3IgYSBzdWZmaXggdGhhdCBjYW4gYmUgYWRkZWQgdG8gdGhlIGxhYmVscyBpbiB0aGUgY29sbGVjdGlvbiAqL1xyXG4gIGxhYmVsU3VmZml4TmFtZTogc3RyaW5nO1xyXG5cclxuICAvKiogQSBsYWJlbCB0aGF0IGNhbiBiZSBhZGRlZCB0byBlYWNoIG9wdGlvbiBhbmQgY2FuIGJlIHVzZWQgYXMgYW4gYWx0ZXJuYXRpdmUgdG8gZGlzcGxheSBzZWxlY3RlZCBvcHRpb25zICovXHJcbiAgb3B0aW9uTGFiZWw6IHN0cmluZztcclxuXHJcbiAgLyoqIEdyaWQgb3B0aW9ucyAqL1xyXG4gIGdyaWRPcHRpb25zOiBHcmlkT3B0aW9uO1xyXG5cclxuICAvKiogRG8gd2UgdHJhbnNsYXRlIHRoZSBsYWJlbD8gKi9cclxuICBlbmFibGVUcmFuc2xhdGVMYWJlbDogYm9vbGVhbjtcclxuXHJcbiAgLyoqIE9ic2VydmFibGUgU3Vic2NyaXB0aW9ucyAqL1xyXG4gIF9zdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xyXG5cclxuICAvLyBmbGFnIHRvIHNpZ25hbCB0aGF0IHRoZSBlZGl0b3IgaXMgZGVzdHJveWluZyBpdHNlbGYsIGhlbHBzIHByZXZlbnRcclxuICAvLyBjb21taXQgY2hhbmdlcyBmcm9tIGJlaW5nIGNhbGxlZCB0d2ljZSBhbmQgZXJyb3JpbmdcclxuICBwcm90ZWN0ZWQgX2Rlc3Ryb3lpbmcgPSBmYWxzZTtcclxuXHJcbiAgLyoqIENvbGxlY3Rpb24gU2VydmljZSAqL1xyXG4gIHByb3RlY3RlZCBfY29sbGVjdGlvblNlcnZpY2U6IENvbGxlY3Rpb25TZXJ2aWNlO1xyXG5cclxuICAvKiogVGhlIHRyYW5zbGF0ZSBsaWJyYXJ5ICovXHJcbiAgcHJvdGVjdGVkIF90cmFuc2xhdGU6IFRyYW5zbGF0ZVNlcnZpY2U7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBhcmdzOiBhbnksIHByb3RlY3RlZCBpc011bHRpcGxlU2VsZWN0KSB7XHJcbiAgICB0aGlzLmdyaWRPcHRpb25zID0gdGhpcy5hcmdzLmdyaWQuZ2V0T3B0aW9ucygpIGFzIEdyaWRPcHRpb247XHJcbiAgICBjb25zdCBncmlkT3B0aW9ucyA9IHRoaXMuZ3JpZE9wdGlvbnMgfHwgdGhpcy5hcmdzLmNvbHVtbi5wYXJhbXMgfHwge307XHJcbiAgICB0aGlzLl90cmFuc2xhdGUgPSBncmlkT3B0aW9ucy5pMThuO1xyXG5cclxuICAgIC8vIHByb3ZpZGUgdGhlIG5hbWUgYXR0cmlidXRlIHRvIHRoZSBET00gZWxlbWVudCB3aGljaCB3aWxsIGJlIG5lZWRlZCB0byBhdXRvLWFkanVzdCBkcm9wIHBvc2l0aW9uIChkcm9wdXAgLyBkcm9wZG93bilcclxuICAgIGNvbnN0IGZpZWxkSWQgPSB0aGlzLmNvbHVtbkRlZiAmJiB0aGlzLmNvbHVtbkRlZi5pZDtcclxuICAgIHRoaXMuZWxlbWVudE5hbWUgPSBgZWRpdG9yLSR7ZmllbGRJZH1gO1xyXG5cclxuICAgIGNvbnN0IGxpYk9wdGlvbnM6IE11bHRpcGxlU2VsZWN0T3B0aW9uID0ge1xyXG4gICAgICBhdXRvQWRqdXN0RHJvcEhlaWdodDogdHJ1ZSxcclxuICAgICAgYXV0b0FkanVzdERyb3BQb3NpdGlvbjogdHJ1ZSxcclxuICAgICAgYXV0b0FkanVzdERyb3BXaWR0aEJ5VGV4dFNpemU6IHRydWUsXHJcbiAgICAgIGNvbnRhaW5lcjogJ2JvZHknLFxyXG4gICAgICBmaWx0ZXI6IGZhbHNlLFxyXG4gICAgICBtYXhIZWlnaHQ6IDI3NSxcclxuICAgICAgbmFtZTogdGhpcy5lbGVtZW50TmFtZSxcclxuICAgICAgc2luZ2xlOiB0cnVlLFxyXG4gICAgICB0ZXh0VGVtcGxhdGU6ICgkZWxtKSA9PiB7XHJcbiAgICAgICAgLy8gcmVuZGVyIEhUTUwgY29kZSBvciBub3QsIGJ5IGRlZmF1bHQgaXQgaXMgc2FuaXRpemVkIGFuZCB3b24ndCBiZSByZW5kZXJlZFxyXG4gICAgICAgIGNvbnN0IGlzUmVuZGVySHRtbEVuYWJsZWQgPSB0aGlzLmNvbHVtbkRlZiAmJiB0aGlzLmNvbHVtbkRlZi5pbnRlcm5hbENvbHVtbkVkaXRvciAmJiB0aGlzLmNvbHVtbkRlZi5pbnRlcm5hbENvbHVtbkVkaXRvci5lbmFibGVSZW5kZXJIdG1sIHx8IGZhbHNlO1xyXG4gICAgICAgIHJldHVybiBpc1JlbmRlckh0bWxFbmFibGVkID8gJGVsbS50ZXh0KCkgOiAkZWxtLmh0bWwoKTtcclxuICAgICAgfSxcclxuICAgICAgb25CbHVyOiAoKSA9PiB0aGlzLmRlc3Ryb3koKSxcclxuICAgICAgb25DbG9zZTogKCkgPT4ge1xyXG4gICAgICAgIGlmICghdGhpcy5fZGVzdHJveWluZyAmJiB0aGlzLmhhc0F1dG9Db21taXRFZGl0KSB7XHJcbiAgICAgICAgICAvLyBkbyBub3QgdXNlIGFyZ3MuY29tbWl0Q2hhbmdlcygpIGFzIHRoaXMgc2V0cyB0aGUgZm9jdXMgdG8gdGhlIG5leHRcclxuICAgICAgICAgIC8vIHJvdy4gQWxzbyB0aGUgc2VsZWN0IGxpc3Qgd2lsbCBzdGF5IHNob3duIHdoZW4gY2xpY2tpbmcgb2ZmIHRoZSBncmlkXHJcbiAgICAgICAgICBhcmdzLmdyaWQuZ2V0RWRpdG9yTG9jaygpLmNvbW1pdEN1cnJlbnRFZGl0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGlmIChpc011bHRpcGxlU2VsZWN0KSB7XHJcbiAgICAgIGxpYk9wdGlvbnMuc2luZ2xlID0gZmFsc2U7XHJcbiAgICAgIGxpYk9wdGlvbnMuYWRkVGl0bGUgPSB0cnVlO1xyXG4gICAgICBsaWJPcHRpb25zLm9rQnV0dG9uID0gdHJ1ZTtcclxuICAgICAgbGliT3B0aW9ucy5zZWxlY3RBbGxEZWxpbWl0ZXIgPSBbJycsICcnXTtcclxuXHJcbiAgICAgIGlmICh0aGlzLl90cmFuc2xhdGUpIHtcclxuICAgICAgICBsaWJPcHRpb25zLmNvdW50U2VsZWN0ZWQgPSB0aGlzLl90cmFuc2xhdGUuaW5zdGFudCgnWF9PRl9ZX1NFTEVDVEVEJyk7XHJcbiAgICAgICAgbGliT3B0aW9ucy5hbGxTZWxlY3RlZCA9IHRoaXMuX3RyYW5zbGF0ZS5pbnN0YW50KCdBTExfU0VMRUNURUQnKTtcclxuICAgICAgICBsaWJPcHRpb25zLnNlbGVjdEFsbFRleHQgPSB0aGlzLl90cmFuc2xhdGUuaW5zdGFudCgnU0VMRUNUX0FMTCcpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gYXNzaWduIHRoZSBtdWx0aXBsZSBzZWxlY3QgbGliIG9wdGlvbnNcclxuICAgIHRoaXMuZGVmYXVsdE9wdGlvbnMgPSBsaWJPcHRpb25zO1xyXG5cclxuICAgIHRoaXMuaW5pdCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqIEdldCB0aGUgQ29sbGVjdGlvbiAqL1xyXG4gIGdldCBjb2xsZWN0aW9uKCk6IGFueVtdIHtcclxuICAgIHJldHVybiB0aGlzLmNvbHVtbkRlZiAmJiB0aGlzLmNvbHVtbkRlZiAmJiB0aGlzLmNvbHVtbkRlZi5pbnRlcm5hbENvbHVtbkVkaXRvci5jb2xsZWN0aW9uIHx8IFtdO1xyXG4gIH1cclxuXHJcbiAgLyoqIEdldHRlciBmb3IgdGhlIENvbGxlY3Rpb24gT3B0aW9ucyAqL1xyXG4gIGdldCBjb2xsZWN0aW9uT3B0aW9ucygpOiBDb2xsZWN0aW9uT3B0aW9uIHtcclxuICAgIHJldHVybiB0aGlzLmNvbHVtbkRlZiAmJiB0aGlzLmNvbHVtbkRlZi5pbnRlcm5hbENvbHVtbkVkaXRvciAmJiB0aGlzLmNvbHVtbkRlZi5pbnRlcm5hbENvbHVtbkVkaXRvci5jb2xsZWN0aW9uT3B0aW9ucztcclxuICB9XHJcblxyXG4gIC8qKiBHZXQgQ29sdW1uIERlZmluaXRpb24gb2JqZWN0ICovXHJcbiAgZ2V0IGNvbHVtbkRlZigpOiBDb2x1bW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuYXJncyAmJiB0aGlzLmFyZ3MuY29sdW1uIHx8IHt9O1xyXG4gIH1cclxuXHJcbiAgLyoqIEdldCBDb2x1bW4gRWRpdG9yIG9iamVjdCAqL1xyXG4gIGdldCBjb2x1bW5FZGl0b3IoKTogQ29sdW1uRWRpdG9yIHtcclxuICAgIHJldHVybiB0aGlzLmNvbHVtbkRlZiAmJiB0aGlzLmNvbHVtbkRlZi5pbnRlcm5hbENvbHVtbkVkaXRvciAmJiB0aGlzLmNvbHVtbkRlZi5pbnRlcm5hbENvbHVtbkVkaXRvciB8fCB7fTtcclxuICB9XHJcblxyXG4gIC8qKiBHZXR0ZXIgZm9yIHRoZSBDdXN0b20gU3RydWN0dXJlIGlmIGV4aXN0ICovXHJcbiAgcHJvdGVjdGVkIGdldCBjdXN0b21TdHJ1Y3R1cmUoKTogQ29sbGVjdGlvbkN1c3RvbVN0cnVjdHVyZSB7XHJcbiAgICByZXR1cm4gdGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYuaW50ZXJuYWxDb2x1bW5FZGl0b3IgJiYgdGhpcy5jb2x1bW5EZWYuaW50ZXJuYWxDb2x1bW5FZGl0b3IuY3VzdG9tU3RydWN0dXJlO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGhhc0F1dG9Db21taXRFZGl0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuYXJncy5ncmlkLmdldE9wdGlvbnMoKS5hdXRvQ29tbWl0RWRpdDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBjdXJyZW50IHNlbGVjdGVkIHZhbHVlcyAobXVsdGlwbGUgc2VsZWN0KSBmcm9tIHRoZSBjb2xsZWN0aW9uXHJcbiAgICovXHJcbiAgZ2V0IGN1cnJlbnRWYWx1ZXMoKSB7XHJcbiAgICAvLyBjb2xsZWN0aW9uIG9mIHN0cmluZ3MsIGp1c3QgcmV0dXJuIHRoZSBmaWx0ZXJlZCBzdHJpbmcgdGhhdCBhcmUgZXF1YWxzXHJcbiAgICBpZiAodGhpcy5jb2xsZWN0aW9uLmV2ZXJ5KHggPT4gdHlwZW9mIHggPT09ICdzdHJpbmcnKSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5jb2xsZWN0aW9uLmZpbHRlcihjID0+IHRoaXMuJGVkaXRvckVsbS52YWwoKS5pbmRleE9mKGMudG9TdHJpbmcoKSkgIT09IC0xKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBjb2xsZWN0aW9uIG9mIGxhYmVsL3ZhbHVlIHBhaXJcclxuICAgIGNvbnN0IHNlcGFyYXRvckJldHdlZW5MYWJlbHMgPSB0aGlzLmNvbGxlY3Rpb25PcHRpb25zICYmIHRoaXMuY29sbGVjdGlvbk9wdGlvbnMuc2VwYXJhdG9yQmV0d2VlblRleHRMYWJlbHMgfHwgJyc7XHJcbiAgICBjb25zdCBpc0luY2x1ZGluZ1ByZWZpeFN1ZmZpeCA9IHRoaXMuY29sbGVjdGlvbk9wdGlvbnMgJiYgdGhpcy5jb2xsZWN0aW9uT3B0aW9ucy5pbmNsdWRlUHJlZml4U3VmZml4VG9TZWxlY3RlZFZhbHVlcyB8fCBmYWxzZTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5jb2xsZWN0aW9uXHJcbiAgICAgIC5maWx0ZXIoYyA9PiB0aGlzLiRlZGl0b3JFbG0udmFsKCkuaW5kZXhPZihjW3RoaXMudmFsdWVOYW1lXS50b1N0cmluZygpKSAhPT0gLTEpXHJcbiAgICAgIC5tYXAoYyA9PiB7XHJcbiAgICAgICAgY29uc3QgbGFiZWxUZXh0ID0gY1t0aGlzLnZhbHVlTmFtZV07XHJcbiAgICAgICAgbGV0IHByZWZpeFRleHQgPSBjW3RoaXMubGFiZWxQcmVmaXhOYW1lXSB8fCAnJztcclxuICAgICAgICBsZXQgc3VmZml4VGV4dCA9IGNbdGhpcy5sYWJlbFN1ZmZpeE5hbWVdIHx8ICcnO1xyXG5cclxuICAgICAgICAvLyB3aGVuIGl0J3MgYSBjb21wbGV4IG9iamVjdCwgdGhlbiBwdWxsIHRoZSBvYmplY3QgbmFtZSBvbmx5LCBlLmcuOiBcInVzZXIuZmlyc3ROYW1lXCIgPT4gXCJ1c2VyXCJcclxuICAgICAgICBjb25zdCBmaWVsZE5hbWUgPSB0aGlzLmNvbHVtbkRlZiAmJiB0aGlzLmNvbHVtbkRlZi5maWVsZDtcclxuICAgICAgICBjb25zdCBmaWVsZE5hbWVGcm9tQ29tcGxleE9iamVjdCA9IGZpZWxkTmFtZS5pbmRleE9mKCcuJykgPyBmaWVsZE5hbWUuc3Vic3RyaW5nKDAsIGZpZWxkTmFtZS5pbmRleE9mKCcuJykpIDogJyc7XHJcbiAgICAgICAgaWYgKGZpZWxkTmFtZUZyb21Db21wbGV4T2JqZWN0ICYmIHR5cGVvZiBjID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgcmV0dXJuIGM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBhbHNvIHRyYW5zbGF0ZSBwcmVmaXgvc3VmZml4IGlmIGVuYWJsZVRyYW5zbGF0ZUxhYmVsIGlzIHRydWUgYW5kIHRleHQgaXMgYSBzdHJpbmdcclxuICAgICAgICBwcmVmaXhUZXh0ID0gKHRoaXMuZW5hYmxlVHJhbnNsYXRlTGFiZWwgJiYgcHJlZml4VGV4dCAmJiB0eXBlb2YgcHJlZml4VGV4dCA9PT0gJ3N0cmluZycpID8gdGhpcy5fdHJhbnNsYXRlLmluc3RhbnQocHJlZml4VGV4dCB8fCAnICcpIDogcHJlZml4VGV4dDtcclxuICAgICAgICBzdWZmaXhUZXh0ID0gKHRoaXMuZW5hYmxlVHJhbnNsYXRlTGFiZWwgJiYgc3VmZml4VGV4dCAmJiB0eXBlb2Ygc3VmZml4VGV4dCA9PT0gJ3N0cmluZycpID8gdGhpcy5fdHJhbnNsYXRlLmluc3RhbnQoc3VmZml4VGV4dCB8fCAnICcpIDogc3VmZml4VGV4dDtcclxuXHJcbiAgICAgICAgaWYgKGlzSW5jbHVkaW5nUHJlZml4U3VmZml4KSB7XHJcbiAgICAgICAgICBjb25zdCB0bXBPcHRpb25BcnJheSA9IFtwcmVmaXhUZXh0LCBsYWJlbFRleHQsIHN1ZmZpeFRleHRdLmZpbHRlcigodGV4dCkgPT4gdGV4dCk7IC8vIGFkZCB0byBhIHRlbXAgYXJyYXkgZm9yIGpvaW5pbmcgcHVycG9zZSBhbmQgZmlsdGVyIG91dCBlbXB0eSB0ZXh0XHJcbiAgICAgICAgICByZXR1cm4gdG1wT3B0aW9uQXJyYXkuam9pbihzZXBhcmF0b3JCZXR3ZWVuTGFiZWxzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGxhYmVsVGV4dDtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGN1cnJlbnQgc2VsZWN0ZWQgdmFsdWVzIChzaW5nbGUgc2VsZWN0KSBmcm9tIHRoZSBjb2xsZWN0aW9uXHJcbiAgICovXHJcbiAgZ2V0IGN1cnJlbnRWYWx1ZSgpIHtcclxuICAgIC8vIGNvbGxlY3Rpb24gb2Ygc3RyaW5ncywganVzdCByZXR1cm4gdGhlIGZpbHRlcmVkIHN0cmluZyB0aGF0IGFyZSBlcXVhbHNcclxuICAgIGlmICh0aGlzLmNvbGxlY3Rpb24uZXZlcnkoeCA9PiB0eXBlb2YgeCA9PT0gJ3N0cmluZycpKSB7XHJcbiAgICAgIHJldHVybiBmaW5kT3JEZWZhdWx0KHRoaXMuY29sbGVjdGlvbiwgKGM6IGFueSkgPT4gYy50b1N0cmluZygpID09PSB0aGlzLiRlZGl0b3JFbG0udmFsKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGNvbGxlY3Rpb24gb2YgbGFiZWwvdmFsdWUgcGFpclxyXG4gICAgY29uc3Qgc2VwYXJhdG9yQmV0d2VlbkxhYmVscyA9IHRoaXMuY29sbGVjdGlvbk9wdGlvbnMgJiYgdGhpcy5jb2xsZWN0aW9uT3B0aW9ucy5zZXBhcmF0b3JCZXR3ZWVuVGV4dExhYmVscyB8fCAnJztcclxuICAgIGNvbnN0IGlzSW5jbHVkaW5nUHJlZml4U3VmZml4ID0gdGhpcy5jb2xsZWN0aW9uT3B0aW9ucyAmJiB0aGlzLmNvbGxlY3Rpb25PcHRpb25zLmluY2x1ZGVQcmVmaXhTdWZmaXhUb1NlbGVjdGVkVmFsdWVzIHx8IGZhbHNlO1xyXG4gICAgY29uc3QgaXRlbUZvdW5kID0gZmluZE9yRGVmYXVsdCh0aGlzLmNvbGxlY3Rpb24sIChjOiBhbnkpID0+IGNbdGhpcy52YWx1ZU5hbWVdLnRvU3RyaW5nKCkgPT09IHRoaXMuJGVkaXRvckVsbS52YWwoKSk7XHJcblxyXG4gICAgLy8gd2hlbiBpdCdzIGEgY29tcGxleCBvYmplY3QsIHRoZW4gcHVsbCB0aGUgb2JqZWN0IG5hbWUgb25seSwgZS5nLjogXCJ1c2VyLmZpcnN0TmFtZVwiID0+IFwidXNlclwiXHJcbiAgICBjb25zdCBmaWVsZE5hbWUgPSB0aGlzLmNvbHVtbkRlZiAmJiB0aGlzLmNvbHVtbkRlZi5maWVsZDtcclxuICAgIGNvbnN0IGZpZWxkTmFtZUZyb21Db21wbGV4T2JqZWN0ID0gZmllbGROYW1lLmluZGV4T2YoJy4nKSA/IGZpZWxkTmFtZS5zdWJzdHJpbmcoMCwgZmllbGROYW1lLmluZGV4T2YoJy4nKSkgOiAnJztcclxuICAgIGlmIChmaWVsZE5hbWVGcm9tQ29tcGxleE9iamVjdCAmJiB0eXBlb2YgaXRlbUZvdW5kID09PSAnb2JqZWN0Jykge1xyXG4gICAgICByZXR1cm4gaXRlbUZvdW5kO1xyXG4gICAgfSBlbHNlIGlmIChpdGVtRm91bmQpIHtcclxuICAgICAgY29uc3QgbGFiZWxUZXh0ID0gaXRlbUZvdW5kW3RoaXMudmFsdWVOYW1lXTtcclxuXHJcbiAgICAgIGlmIChpc0luY2x1ZGluZ1ByZWZpeFN1ZmZpeCkge1xyXG4gICAgICAgIGxldCBwcmVmaXhUZXh0ID0gaXRlbUZvdW5kW3RoaXMubGFiZWxQcmVmaXhOYW1lXSB8fCAnJztcclxuICAgICAgICBsZXQgc3VmZml4VGV4dCA9IGl0ZW1Gb3VuZFt0aGlzLmxhYmVsU3VmZml4TmFtZV0gfHwgJyc7XHJcblxyXG4gICAgICAgIC8vIGFsc28gdHJhbnNsYXRlIHByZWZpeC9zdWZmaXggaWYgZW5hYmxlVHJhbnNsYXRlTGFiZWwgaXMgdHJ1ZSBhbmQgdGV4dCBpcyBhIHN0cmluZ1xyXG4gICAgICAgIHByZWZpeFRleHQgPSAodGhpcy5lbmFibGVUcmFuc2xhdGVMYWJlbCAmJiBwcmVmaXhUZXh0ICYmIHR5cGVvZiBwcmVmaXhUZXh0ID09PSAnc3RyaW5nJykgPyB0aGlzLl90cmFuc2xhdGUuaW5zdGFudChwcmVmaXhUZXh0IHx8ICcgJykgOiBwcmVmaXhUZXh0O1xyXG4gICAgICAgIHN1ZmZpeFRleHQgPSAodGhpcy5lbmFibGVUcmFuc2xhdGVMYWJlbCAmJiBzdWZmaXhUZXh0ICYmIHR5cGVvZiBzdWZmaXhUZXh0ID09PSAnc3RyaW5nJykgPyB0aGlzLl90cmFuc2xhdGUuaW5zdGFudChzdWZmaXhUZXh0IHx8ICcgJykgOiBzdWZmaXhUZXh0O1xyXG5cclxuICAgICAgICAvLyBhZGQgdG8gYSB0ZW1wIGFycmF5IGZvciBqb2luaW5nIHB1cnBvc2UgYW5kIGZpbHRlciBvdXQgZW1wdHkgdGV4dFxyXG4gICAgICAgIGNvbnN0IHRtcE9wdGlvbkFycmF5ID0gW3ByZWZpeFRleHQsIGxhYmVsVGV4dCwgc3VmZml4VGV4dF0uZmlsdGVyKCh0ZXh0KSA9PiB0ZXh0KTtcclxuICAgICAgICByZXR1cm4gdG1wT3B0aW9uQXJyYXkuam9pbihzZXBhcmF0b3JCZXR3ZWVuTGFiZWxzKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIGxhYmVsVGV4dDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gJyc7XHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqIEdldCB0aGUgVmFsaWRhdG9yIGZ1bmN0aW9uLCBjYW4gYmUgcGFzc2VkIGluIEVkaXRvciBwcm9wZXJ0eSBvciBDb2x1bW4gRGVmaW5pdGlvbiAqL1xyXG4gIGdldCB2YWxpZGF0b3IoKTogRWRpdG9yVmFsaWRhdG9yIHtcclxuICAgIHJldHVybiB0aGlzLmNvbHVtbkVkaXRvci52YWxpZGF0b3IgfHwgdGhpcy5jb2x1bW5EZWYudmFsaWRhdG9yO1xyXG4gIH1cclxuXHJcbiAgaW5pdCgpIHtcclxuICAgIGlmICghdGhpcy5hcmdzKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignW0FuZ3VsYXItU2xpY2tHcmlkXSBBbiBlZGl0b3IgbXVzdCBhbHdheXMgaGF2ZSBhbiBcImluaXQoKVwiIHdpdGggdmFsaWQgYXJndW1lbnRzLicpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghdGhpcy5jb2x1bW5EZWYgfHwgIXRoaXMuY29sdW1uRGVmLmludGVybmFsQ29sdW1uRWRpdG9yIHx8ICghdGhpcy5jb2x1bW5EZWYuaW50ZXJuYWxDb2x1bW5FZGl0b3IuY29sbGVjdGlvbiAmJiAhdGhpcy5jb2x1bW5EZWYuaW50ZXJuYWxDb2x1bW5FZGl0b3IuY29sbGVjdGlvbkFzeW5jKSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFtBbmd1bGFyLVNsaWNrR3JpZF0gWW91IG5lZWQgdG8gcGFzcyBhIFwiY29sbGVjdGlvblwiIChvciBcImNvbGxlY3Rpb25Bc3luY1wiKSBpbnNpZGUgQ29sdW1uIERlZmluaXRpb24gRWRpdG9yIGZvciB0aGUgTXVsdGlwbGVTZWxlY3QvU2luZ2xlU2VsZWN0IEVkaXRvciB0byB3b3JrIGNvcnJlY3RseS5cclxuICAgICAgQWxzbyBlYWNoIG9wdGlvbiBzaG91bGQgaW5jbHVkZSBhIHZhbHVlL2xhYmVsIHBhaXIgKG9yIHZhbHVlL2xhYmVsS2V5IHdoZW4gdXNpbmcgTG9jYWxlKS5cclxuICAgICAgRm9yIGV4YW1wbGU6IHsgZWRpdG9yOiB7IGNvbGxlY3Rpb246IFt7IHZhbHVlOiB0cnVlLCBsYWJlbDogJ1RydWUnIH0seyB2YWx1ZTogZmFsc2UsIGxhYmVsOiAnRmFsc2UnfV0gfSB9YCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fY29sbGVjdGlvblNlcnZpY2UgPSBuZXcgQ29sbGVjdGlvblNlcnZpY2UodGhpcy5fdHJhbnNsYXRlKTtcclxuICAgIHRoaXMuZW5hYmxlVHJhbnNsYXRlTGFiZWwgPSAodGhpcy5jb2x1bW5EZWYuaW50ZXJuYWxDb2x1bW5FZGl0b3IuZW5hYmxlVHJhbnNsYXRlTGFiZWwpID8gdGhpcy5jb2x1bW5EZWYuaW50ZXJuYWxDb2x1bW5FZGl0b3IuZW5hYmxlVHJhbnNsYXRlTGFiZWwgOiBmYWxzZTtcclxuICAgIHRoaXMubGFiZWxOYW1lID0gdGhpcy5jdXN0b21TdHJ1Y3R1cmUgJiYgdGhpcy5jdXN0b21TdHJ1Y3R1cmUubGFiZWwgfHwgJ2xhYmVsJztcclxuICAgIHRoaXMubGFiZWxQcmVmaXhOYW1lID0gdGhpcy5jdXN0b21TdHJ1Y3R1cmUgJiYgdGhpcy5jdXN0b21TdHJ1Y3R1cmUubGFiZWxQcmVmaXggfHwgJ2xhYmVsUHJlZml4JztcclxuICAgIHRoaXMubGFiZWxTdWZmaXhOYW1lID0gdGhpcy5jdXN0b21TdHJ1Y3R1cmUgJiYgdGhpcy5jdXN0b21TdHJ1Y3R1cmUubGFiZWxTdWZmaXggfHwgJ2xhYmVsU3VmZml4JztcclxuICAgIHRoaXMub3B0aW9uTGFiZWwgPSB0aGlzLmN1c3RvbVN0cnVjdHVyZSAmJiB0aGlzLmN1c3RvbVN0cnVjdHVyZS5vcHRpb25MYWJlbCB8fCAndmFsdWUnO1xyXG4gICAgdGhpcy52YWx1ZU5hbWUgPSB0aGlzLmN1c3RvbVN0cnVjdHVyZSAmJiB0aGlzLmN1c3RvbVN0cnVjdHVyZS52YWx1ZSB8fCAndmFsdWUnO1xyXG5cclxuICAgIGlmICh0aGlzLmVuYWJsZVRyYW5zbGF0ZUxhYmVsICYmICghdGhpcy5fdHJhbnNsYXRlIHx8IHR5cGVvZiB0aGlzLl90cmFuc2xhdGUuaW5zdGFudCAhPT0gJ2Z1bmN0aW9uJykpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBbc2VsZWN0LWVkaXRvcl0gVGhlIG5neC10cmFuc2xhdGUgVHJhbnNsYXRlU2VydmljZSBpcyByZXF1aXJlZCBmb3IgdGhlIFNlbGVjdCBFZGl0b3IgdG8gd29yayBjb3JyZWN0bHlgKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBhbHdheXMgcmVuZGVyIHRoZSBTZWxlY3QgKGRyb3Bkb3duKSBET00gZWxlbWVudCwgZXZlbiBpZiB1c2VyIHBhc3NlZCBhIFwiY29sbGVjdGlvbkFzeW5jXCIsXHJcbiAgICAvLyBpZiB0aGF0IGlzIHRoZSBjYXNlLCB0aGUgU2VsZWN0IHdpbGwgc2ltcGx5IGJlIHdpdGhvdXQgYW55IG9wdGlvbnMgYnV0IHdlIHN0aWxsIGhhdmUgdG8gcmVuZGVyIGl0IChlbHNlIFNsaWNrR3JpZCB3b3VsZCB0aHJvdyBhbiBlcnJvcilcclxuICAgIHRoaXMucmVuZGVyRG9tRWxlbWVudCh0aGlzLmNvbGxlY3Rpb24pO1xyXG4gIH1cclxuXHJcbiAgYXBwbHlWYWx1ZShpdGVtOiBhbnksIHN0YXRlOiBhbnkpOiB2b2lkIHtcclxuICAgIGNvbnN0IGZpZWxkTmFtZSA9IHRoaXMuY29sdW1uRGVmICYmIHRoaXMuY29sdW1uRGVmLmZpZWxkO1xyXG4gICAgY29uc3QgZmllbGRUeXBlID0gdGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYudHlwZTtcclxuICAgIGxldCBuZXdWYWx1ZSA9IHN0YXRlO1xyXG5cclxuICAgIC8vIHdoZW4gdGhlIHByb3ZpZGVkIHVzZXIgZGVmaW5lZCB0aGUgY29sdW1uIGZpZWxkIHR5cGUgYXMgYSBwb3NzaWJsZSBudW1iZXIgdGhlbiB0cnkgcGFyc2luZyB0aGUgc3RhdGUgdmFsdWUgYXMgdGhhdFxyXG4gICAgaWYgKGZpZWxkVHlwZSA9PT0gRmllbGRUeXBlLm51bWJlciB8fCBmaWVsZFR5cGUgPT09IEZpZWxkVHlwZS5pbnRlZ2VyIHx8IGZpZWxkVHlwZSA9PT0gRmllbGRUeXBlLmJvb2xlYW4pIHtcclxuICAgICAgbmV3VmFsdWUgPSBwYXJzZUZsb2F0KHN0YXRlKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyB3aGVuIHNldCBhcyBhIG11bHRpcGxlIHNlbGVjdGlvbiwgd2UgY2FuIGFzc3VtZSB0aGF0IHRoZSAzcmQgcGFydHkgbGliIG11bHRpcGxlLXNlbGVjdCB3aWxsIHJldHVybiBhIENTViBzdHJpbmdcclxuICAgIC8vIHdlIG5lZWQgdG8gcmUtc3BsaXQgdGhhdCBpbnRvIGFuIGFycmF5IHRvIGJlIHRoZSBzYW1lIGFzIHRoZSBvcmlnaW5hbCBjb2x1bW5cclxuICAgIGlmICh0aGlzLmlzTXVsdGlwbGVTZWxlY3QgJiYgdHlwZW9mIHN0YXRlID09PSAnc3RyaW5nJyAmJiBzdGF0ZS5pbmRleE9mKCcsJykgPj0gMCkge1xyXG4gICAgICBuZXdWYWx1ZSA9IHN0YXRlLnNwbGl0KCcsJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gd2hlbiBpdCdzIGEgY29tcGxleCBvYmplY3QsIHRoZW4gcHVsbCB0aGUgb2JqZWN0IG5hbWUgb25seSwgZS5nLjogXCJ1c2VyLmZpcnN0TmFtZVwiID0+IFwidXNlclwiXHJcbiAgICBjb25zdCBmaWVsZE5hbWVGcm9tQ29tcGxleE9iamVjdCA9IGZpZWxkTmFtZS5pbmRleE9mKCcuJykgPyBmaWVsZE5hbWUuc3Vic3RyaW5nKDAsIGZpZWxkTmFtZS5pbmRleE9mKCcuJykpIDogJyc7XHJcbiAgICBjb25zdCB2YWxpZGF0aW9uID0gdGhpcy52YWxpZGF0ZShuZXdWYWx1ZSk7XHJcbiAgICBpdGVtW2ZpZWxkTmFtZUZyb21Db21wbGV4T2JqZWN0IHx8IGZpZWxkTmFtZV0gPSAodmFsaWRhdGlvbiAmJiB2YWxpZGF0aW9uLnZhbGlkKSA/IG5ld1ZhbHVlIDogJyc7XHJcbiAgfVxyXG5cclxuICBkZXN0cm95KCkge1xyXG4gICAgdGhpcy5fZGVzdHJveWluZyA9IHRydWU7XHJcbiAgICBpZiAodGhpcy4kZWRpdG9yRWxtICYmIHR5cGVvZiB0aGlzLiRlZGl0b3JFbG0ubXVsdGlwbGVTZWxlY3QgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgdGhpcy4kZWRpdG9yRWxtLm11bHRpcGxlU2VsZWN0KCdkZXN0cm95Jyk7XHJcbiAgICAgIHRoaXMuJGVkaXRvckVsbS5yZW1vdmUoKTtcclxuICAgICAgY29uc3QgZWxlbWVudENsYXNzTmFtZSA9IHRoaXMuZWxlbWVudE5hbWUudG9TdHJpbmcoKS5yZXBsYWNlKCcuJywgJ1xcXFwuJyk7IC8vIG1ha2Ugc3VyZSB0byBlc2NhcGUgYW55IGRvdCBcIi5cIiBmcm9tIENTUyBjbGFzcyB0byBhdm9pZCBjb25zb2xlIGVycm9yXHJcbiAgICAgICQoYFtuYW1lPSR7ZWxlbWVudENsYXNzTmFtZX1dLm1zLWRyb3BgKS5yZW1vdmUoKTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy4kZWRpdG9yRWxtICYmIHR5cGVvZiB0aGlzLiRlZGl0b3JFbG0ucmVtb3ZlID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgIHRoaXMuJGVkaXRvckVsbS5yZW1vdmUoKTtcclxuICAgIH1cclxuICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMgPSB1bnN1YnNjcmliZUFsbE9ic2VydmFibGVzKHRoaXMuX3N1YnNjcmlwdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgbG9hZFZhbHVlKGl0ZW06IGFueSk6IHZvaWQge1xyXG4gICAgY29uc3QgZmllbGROYW1lID0gdGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYuZmllbGQ7XHJcblxyXG4gICAgLy8gd2hlbiBpdCdzIGEgY29tcGxleCBvYmplY3QsIHRoZW4gcHVsbCB0aGUgb2JqZWN0IG5hbWUgb25seSwgZS5nLjogXCJ1c2VyLmZpcnN0TmFtZVwiID0+IFwidXNlclwiXHJcbiAgICBjb25zdCBmaWVsZE5hbWVGcm9tQ29tcGxleE9iamVjdCA9IGZpZWxkTmFtZS5pbmRleE9mKCcuJykgPyBmaWVsZE5hbWUuc3Vic3RyaW5nKDAsIGZpZWxkTmFtZS5pbmRleE9mKCcuJykpIDogJyc7XHJcblxyXG4gICAgaWYgKGl0ZW0gJiYgdGhpcy5jb2x1bW5EZWYgJiYgKGl0ZW0uaGFzT3duUHJvcGVydHkoZmllbGROYW1lKSB8fCBpdGVtLmhhc093blByb3BlcnR5KGZpZWxkTmFtZUZyb21Db21wbGV4T2JqZWN0KSkpIHtcclxuICAgICAgY29uc3QgY3VycmVudFZhbHVlID0gaXRlbVtmaWVsZE5hbWVGcm9tQ29tcGxleE9iamVjdCB8fCBmaWVsZE5hbWVdO1xyXG4gICAgICBjb25zdCBsb2FkVmFsdWUgPSBmaWVsZE5hbWVGcm9tQ29tcGxleE9iamVjdCAmJiBjdXJyZW50VmFsdWUuaGFzT3duUHJvcGVydHkodGhpcy52YWx1ZU5hbWUpID8gY3VycmVudFZhbHVlW3RoaXMudmFsdWVOYW1lXSA6IGN1cnJlbnRWYWx1ZTtcclxuICAgICAgaWYgKHRoaXMuaXNNdWx0aXBsZVNlbGVjdCAmJiBBcnJheS5pc0FycmF5KGxvYWRWYWx1ZSkpIHtcclxuICAgICAgICB0aGlzLmxvYWRNdWx0aXBsZVZhbHVlcyhsb2FkVmFsdWUpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMubG9hZFNpbmdsZVZhbHVlKGxvYWRWYWx1ZSk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5yZWZyZXNoKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBsb2FkTXVsdGlwbGVWYWx1ZXMoY3VycmVudFZhbHVlczogYW55W10pIHtcclxuICAgIC8vIGNvbnZlcnQgdG8gc3RyaW5nIGJlY2F1c2UgdGhhdCBpcyBob3cgdGhlIERPTSB3aWxsIHJldHVybiB0aGVzZSB2YWx1ZXNcclxuICAgIGlmIChBcnJheS5pc0FycmF5KGN1cnJlbnRWYWx1ZXMpKSB7XHJcbiAgICAgIC8vIGtlZXAgdGhlIGRlZmF1bHQgdmFsdWVzIGluIG1lbW9yeSBmb3IgcmVmZXJlbmNlc1xyXG4gICAgICB0aGlzLmRlZmF1bHRWYWx1ZSA9IGN1cnJlbnRWYWx1ZXMubWFwKChpOiBhbnkpID0+IGkpO1xyXG5cclxuICAgICAgLy8gY29tcGFyZSBhbGwgdGhlIGFycmF5IHZhbHVlcyBidXQgYXMgc3RyaW5nIHR5cGUgc2luY2UgbXVsdGlwbGUtc2VsZWN0IGFsd2F5cyByZXR1cm4gc3RyaW5nXHJcbiAgICAgIGNvbnN0IGN1cnJlbnRTdHJpbmdWYWx1ZXMgPSBjdXJyZW50VmFsdWVzLm1hcCgoaTogYW55KSA9PiBpLnRvU3RyaW5nKCkpO1xyXG4gICAgICB0aGlzLiRlZGl0b3JFbG0uZmluZCgnb3B0aW9uJykuZWFjaCgoaTogbnVtYmVyLCAkZTogYW55KSA9PiB7XHJcbiAgICAgICAgJGUuc2VsZWN0ZWQgPSAoY3VycmVudFN0cmluZ1ZhbHVlcy5pbmRleE9mKCRlLnZhbHVlKSAhPT0gLTEpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGxvYWRTaW5nbGVWYWx1ZShjdXJyZW50VmFsdWU6IGFueSkge1xyXG4gICAgLy8ga2VlcCB0aGUgZGVmYXVsdCB2YWx1ZSBpbiBtZW1vcnkgZm9yIHJlZmVyZW5jZXNcclxuICAgIHRoaXMuZGVmYXVsdFZhbHVlID0gY3VycmVudFZhbHVlO1xyXG5cclxuICAgIC8vIG1ha2Ugc3VyZSB0aGUgcHJvcCBleGlzdHMgZmlyc3RcclxuICAgIHRoaXMuJGVkaXRvckVsbS5maW5kKCdvcHRpb24nKS5lYWNoKChpOiBudW1iZXIsICRlOiBhbnkpID0+IHtcclxuICAgICAgLy8gY2hlY2sgZXF1YWxpdHkgYWZ0ZXIgY29udmVydGluZyBkZWZhdWx0VmFsdWUgdG8gc3RyaW5nIHNpbmNlIHRoZSBET00gdmFsdWUgd2lsbCBhbHdheXMgYmUgb2YgdHlwZSBzdHJpbmdcclxuICAgICAgJGUuc2VsZWN0ZWQgPSAoY3VycmVudFZhbHVlLnRvU3RyaW5nKCkgPT09ICRlLnZhbHVlKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc2VyaWFsaXplVmFsdWUoKTogYW55IHtcclxuICAgIHJldHVybiAodGhpcy5pc011bHRpcGxlU2VsZWN0KSA/IHRoaXMuY3VycmVudFZhbHVlcyA6IHRoaXMuY3VycmVudFZhbHVlO1xyXG4gIH1cclxuXHJcbiAgZm9jdXMoKSB7XHJcbiAgICBpZiAodGhpcy4kZWRpdG9yRWxtICYmIHRoaXMuJGVkaXRvckVsbS5tdWx0aXBsZVNlbGVjdCkge1xyXG4gICAgICB0aGlzLiRlZGl0b3JFbG0ubXVsdGlwbGVTZWxlY3QoJ2ZvY3VzJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpc1ZhbHVlQ2hhbmdlZCgpOiBib29sZWFuIHtcclxuICAgIGlmICh0aGlzLmlzTXVsdGlwbGVTZWxlY3QpIHtcclxuICAgICAgcmV0dXJuICFjaGFyQXJyYXlzRXF1YWwodGhpcy4kZWRpdG9yRWxtLnZhbCgpLCB0aGlzLmRlZmF1bHRWYWx1ZSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy4kZWRpdG9yRWxtLnZhbCgpICE9PSB0aGlzLmRlZmF1bHRWYWx1ZTtcclxuICB9XHJcblxyXG4gIHZhbGlkYXRlKGlucHV0VmFsdWU/OiBhbnkpOiBFZGl0b3JWYWxpZGF0b3JPdXRwdXQge1xyXG4gICAgY29uc3QgaXNSZXF1aXJlZCA9IHRoaXMuY29sdW1uRWRpdG9yLnJlcXVpcmVkO1xyXG4gICAgY29uc3QgZWxtVmFsdWUgPSAoaW5wdXRWYWx1ZSAhPT0gdW5kZWZpbmVkKSA/IGlucHV0VmFsdWUgOiB0aGlzLiRlZGl0b3JFbG0gJiYgdGhpcy4kZWRpdG9yRWxtLnZhbCAmJiB0aGlzLiRlZGl0b3JFbG0udmFsKCk7XHJcbiAgICBjb25zdCBlcnJvck1zZyA9IHRoaXMuY29sdW1uRWRpdG9yLmVycm9yTWVzc2FnZTtcclxuXHJcbiAgICBpZiAodGhpcy52YWxpZGF0b3IpIHtcclxuICAgICAgY29uc3QgdmFsdWUgPSAoaW5wdXRWYWx1ZSAhPT0gdW5kZWZpbmVkKSA/IGlucHV0VmFsdWUgOiAodGhpcy5pc011bHRpcGxlU2VsZWN0ID8gdGhpcy5jdXJyZW50VmFsdWVzIDogdGhpcy5jdXJyZW50VmFsdWUpO1xyXG4gICAgICByZXR1cm4gdGhpcy52YWxpZGF0b3IodmFsdWUsIHRoaXMuYXJncyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gYnkgZGVmYXVsdCB0aGUgZWRpdG9yIGlzIGFsbW9zdCBhbHdheXMgdmFsaWQgKGV4Y2VwdCB3aGVuIGl0J3MgcmVxdWlyZWQgYnV0IG5vdCBwcm92aWRlZClcclxuICAgIGlmIChpc1JlcXVpcmVkICYmIChlbG1WYWx1ZSA9PT0gJycgfHwgKEFycmF5LmlzQXJyYXkoZWxtVmFsdWUpICYmIGVsbVZhbHVlLmxlbmd0aCA9PT0gMCkpKSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgdmFsaWQ6IGZhbHNlLFxyXG4gICAgICAgIG1zZzogZXJyb3JNc2cgfHwgQ29uc3RhbnRzLlZBTElEQVRJT05fUkVRVUlSRURfRklFTERcclxuICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB2YWxpZDogdHJ1ZSxcclxuICAgICAgbXNnOiBudWxsXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgLy9cclxuICAvLyBwcm90ZWN0ZWQgZnVuY3Rpb25zXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gIC8qKlxyXG4gICAqIHVzZXIgbWlnaHQgd2FudCB0byBmaWx0ZXIgY2VydGFpbiBpdGVtcyBvZiB0aGUgY29sbGVjdGlvblxyXG4gICAqIEBwYXJhbSBpbnB1dENvbGxlY3Rpb25cclxuICAgKiBAcmV0dXJuIG91dHB1dENvbGxlY3Rpb24gZmlsdGVyZWQgYW5kL29yIHNvcnRlZCBjb2xsZWN0aW9uXHJcbiAgICovXHJcbiAgcHJvdGVjdGVkIGZpbHRlckNvbGxlY3Rpb24oaW5wdXRDb2xsZWN0aW9uKSB7XHJcbiAgICBsZXQgb3V0cHV0Q29sbGVjdGlvbiA9IGlucHV0Q29sbGVjdGlvbjtcclxuXHJcbiAgICAvLyB1c2VyIG1pZ2h0IHdhbnQgdG8gZmlsdGVyIGNlcnRhaW4gaXRlbXMgb2YgdGhlIGNvbGxlY3Rpb25cclxuICAgIGlmICh0aGlzLmNvbHVtbkVkaXRvciAmJiB0aGlzLmNvbHVtbkVkaXRvci5jb2xsZWN0aW9uRmlsdGVyQnkpIHtcclxuICAgICAgY29uc3QgZmlsdGVyQnkgPSB0aGlzLmNvbHVtbkVkaXRvci5jb2xsZWN0aW9uRmlsdGVyQnk7XHJcbiAgICAgIGNvbnN0IGZpbHRlckNvbGxlY3Rpb25CeSA9IHRoaXMuY29sdW1uRWRpdG9yLmNvbGxlY3Rpb25PcHRpb25zICYmIHRoaXMuY29sdW1uRWRpdG9yLmNvbGxlY3Rpb25PcHRpb25zLmZpbHRlclJlc3VsdEFmdGVyRWFjaFBhc3MgfHwgbnVsbDtcclxuICAgICAgb3V0cHV0Q29sbGVjdGlvbiA9IHRoaXMuX2NvbGxlY3Rpb25TZXJ2aWNlLmZpbHRlckNvbGxlY3Rpb24ob3V0cHV0Q29sbGVjdGlvbiwgZmlsdGVyQnksIGZpbHRlckNvbGxlY3Rpb25CeSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG91dHB1dENvbGxlY3Rpb247XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiB1c2VyIG1pZ2h0IHdhbnQgdG8gc29ydCB0aGUgY29sbGVjdGlvbiBpbiBhIGNlcnRhaW4gd2F5XHJcbiAgICogQHBhcmFtIGlucHV0Q29sbGVjdGlvblxyXG4gICAqIEByZXR1cm4gb3V0cHV0Q29sbGVjdGlvbiBzb3J0ZWQgY29sbGVjdGlvblxyXG4gICAqL1xyXG4gIHByb3RlY3RlZCBzb3J0Q29sbGVjdGlvbihpbnB1dENvbGxlY3Rpb24pIHtcclxuICAgIGxldCBvdXRwdXRDb2xsZWN0aW9uID0gaW5wdXRDb2xsZWN0aW9uO1xyXG5cclxuICAgIC8vIHVzZXIgbWlnaHQgd2FudCB0byBzb3J0IHRoZSBjb2xsZWN0aW9uXHJcbiAgICBpZiAodGhpcy5jb2x1bW5EZWYuaW50ZXJuYWxDb2x1bW5FZGl0b3IgJiYgdGhpcy5jb2x1bW5EZWYuaW50ZXJuYWxDb2x1bW5FZGl0b3IuY29sbGVjdGlvblNvcnRCeSkge1xyXG4gICAgICBjb25zdCBzb3J0QnkgPSB0aGlzLmNvbHVtbkRlZi5pbnRlcm5hbENvbHVtbkVkaXRvci5jb2xsZWN0aW9uU29ydEJ5O1xyXG4gICAgICBvdXRwdXRDb2xsZWN0aW9uID0gdGhpcy5fY29sbGVjdGlvblNlcnZpY2Uuc29ydENvbGxlY3Rpb24odGhpcy5jb2x1bW5EZWYsIG91dHB1dENvbGxlY3Rpb24sIHNvcnRCeSwgdGhpcy5lbmFibGVUcmFuc2xhdGVMYWJlbCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG91dHB1dENvbGxlY3Rpb247XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgcmVuZGVyRG9tRWxlbWVudChjb2xsZWN0aW9uOiBhbnlbXSkge1xyXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGNvbGxlY3Rpb24pICYmIHRoaXMuY29sbGVjdGlvbk9wdGlvbnMgJiYgdGhpcy5jb2xsZWN0aW9uT3B0aW9ucy5jb2xsZWN0aW9uSW5PYmplY3RQcm9wZXJ0eSkge1xyXG4gICAgICBjb2xsZWN0aW9uID0gZ2V0RGVzY2VuZGFudFByb3BlcnR5KGNvbGxlY3Rpb24sIHRoaXMuY29sbGVjdGlvbk9wdGlvbnMuY29sbGVjdGlvbkluT2JqZWN0UHJvcGVydHkpO1xyXG4gICAgfVxyXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGNvbGxlY3Rpb24pKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIFwiY29sbGVjdGlvblwiIHBhc3NlZCB0byB0aGUgU2VsZWN0IEVkaXRvciBpcyBub3QgYSB2YWxpZCBhcnJheScpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHVzZXIgY2FuIG9wdGlvbmFsbHkgYWRkIGEgYmxhbmsgZW50cnkgYXQgdGhlIGJlZ2lubmluZyBvZiB0aGUgY29sbGVjdGlvblxyXG4gICAgaWYgKHRoaXMuY29sbGVjdGlvbk9wdGlvbnMgJiYgdGhpcy5jb2xsZWN0aW9uT3B0aW9ucy5hZGRCbGFua0VudHJ5KSB7XHJcbiAgICAgIGNvbGxlY3Rpb24udW5zaGlmdCh0aGlzLmNyZWF0ZUJsYW5rRW50cnkoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IG5ld0NvbGxlY3Rpb24gPSBjb2xsZWN0aW9uIHx8IFtdO1xyXG5cclxuICAgIC8vIHVzZXIgbWlnaHQgd2FudCB0byBmaWx0ZXIgYW5kL29yIHNvcnQgY2VydGFpbiBpdGVtcyBvZiB0aGUgY29sbGVjdGlvblxyXG4gICAgbmV3Q29sbGVjdGlvbiA9IHRoaXMuZmlsdGVyQ29sbGVjdGlvbihuZXdDb2xsZWN0aW9uKTtcclxuICAgIG5ld0NvbGxlY3Rpb24gPSB0aGlzLnNvcnRDb2xsZWN0aW9uKG5ld0NvbGxlY3Rpb24pO1xyXG5cclxuICAgIC8vIHN0ZXAgMSwgY3JlYXRlIEhUTUwgc3RyaW5nIHRlbXBsYXRlXHJcbiAgICBjb25zdCBlZGl0b3JUZW1wbGF0ZSA9IHRoaXMuYnVpbGRUZW1wbGF0ZUh0bWxTdHJpbmcobmV3Q29sbGVjdGlvbik7XHJcblxyXG4gICAgLy8gc3RlcCAyLCBjcmVhdGUgdGhlIERPTSBFbGVtZW50IG9mIHRoZSBlZGl0b3JcclxuICAgIC8vIGFsc28gc3Vic2NyaWJlIHRvIHRoZSBvbkNsb3NlIGV2ZW50XHJcbiAgICB0aGlzLmNyZWF0ZURvbUVsZW1lbnQoZWRpdG9yVGVtcGxhdGUpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGJ1aWxkVGVtcGxhdGVIdG1sU3RyaW5nKGNvbGxlY3Rpb246IGFueVtdKSB7XHJcbiAgICBsZXQgb3B0aW9ucyA9ICcnO1xyXG4gICAgY29uc3QgZmllbGRJZCA9IHRoaXMuY29sdW1uRGVmICYmIHRoaXMuY29sdW1uRGVmLmlkO1xyXG4gICAgY29uc3Qgc2VwYXJhdG9yQmV0d2VlbkxhYmVscyA9IHRoaXMuY29sbGVjdGlvbk9wdGlvbnMgJiYgdGhpcy5jb2xsZWN0aW9uT3B0aW9ucy5zZXBhcmF0b3JCZXR3ZWVuVGV4dExhYmVscyB8fCAnJztcclxuICAgIGNvbnN0IGlzUmVuZGVySHRtbEVuYWJsZWQgPSB0aGlzLmNvbHVtbkRlZi5pbnRlcm5hbENvbHVtbkVkaXRvci5lbmFibGVSZW5kZXJIdG1sIHx8IGZhbHNlO1xyXG4gICAgY29uc3Qgc2FuaXRpemVkT3B0aW9ucyA9IHRoaXMuZ3JpZE9wdGlvbnMgJiYgdGhpcy5ncmlkT3B0aW9ucy5zYW5pdGl6ZUh0bWxPcHRpb25zIHx8IHt9O1xyXG5cclxuICAgIC8vIGNvbGxlY3Rpb24gY291bGQgYmUgYW4gQXJyYXkgb2YgU3RyaW5ncyBPUiBPYmplY3RzXHJcbiAgICBpZiAoY29sbGVjdGlvbi5ldmVyeSh4ID0+IHR5cGVvZiB4ID09PSAnc3RyaW5nJykpIHtcclxuICAgICAgY29sbGVjdGlvbi5mb3JFYWNoKChvcHRpb246IHN0cmluZykgPT4ge1xyXG4gICAgICAgIG9wdGlvbnMgKz0gYDxvcHRpb24gdmFsdWU9XCIke29wdGlvbn1cIiBsYWJlbD1cIiR7b3B0aW9ufVwiPiR7b3B0aW9ufTwvb3B0aW9uPmA7XHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gYXJyYXkgb2Ygb2JqZWN0cyB3aWxsIHJlcXVpcmUgYSBsYWJlbC92YWx1ZSBwYWlyIHVubGVzcyBhIGN1c3RvbVN0cnVjdHVyZSBpcyBwYXNzZWRcclxuICAgICAgY29sbGVjdGlvbi5mb3JFYWNoKChvcHRpb246IFNlbGVjdE9wdGlvbikgPT4ge1xyXG4gICAgICAgIGlmICghb3B0aW9uIHx8IChvcHRpb25bdGhpcy5sYWJlbE5hbWVdID09PSB1bmRlZmluZWQgJiYgb3B0aW9uLmxhYmVsS2V5ID09PSB1bmRlZmluZWQpKSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFtzZWxlY3QtZWRpdG9yXSBBIGNvbGxlY3Rpb24gd2l0aCB2YWx1ZS9sYWJlbCAob3IgdmFsdWUvbGFiZWxLZXkgd2hlbiB1c2luZyBMb2NhbGUpIGlzIHJlcXVpcmVkIHRvIHBvcHVsYXRlIHRoZSBTZWxlY3QgbGlzdCwgZm9yIGV4YW1wbGU6IHsgY29sbGVjdGlvbjogWyB7IHZhbHVlOiAnMScsIGxhYmVsOiAnT25lJyB9IF0pYCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGxhYmVsS2V5ID0gKG9wdGlvbi5sYWJlbEtleSB8fCBvcHRpb25bdGhpcy5sYWJlbE5hbWVdKSBhcyBzdHJpbmc7XHJcbiAgICAgICAgY29uc3QgbGFiZWxUZXh0ID0gKChvcHRpb24ubGFiZWxLZXkgfHwgdGhpcy5lbmFibGVUcmFuc2xhdGVMYWJlbCkgJiYgbGFiZWxLZXkpID8gdGhpcy5fdHJhbnNsYXRlLmluc3RhbnQobGFiZWxLZXkgfHwgJyAnKSA6IGxhYmVsS2V5O1xyXG4gICAgICAgIGxldCBwcmVmaXhUZXh0ID0gb3B0aW9uW3RoaXMubGFiZWxQcmVmaXhOYW1lXSB8fCAnJztcclxuICAgICAgICBsZXQgc3VmZml4VGV4dCA9IG9wdGlvblt0aGlzLmxhYmVsU3VmZml4TmFtZV0gfHwgJyc7XHJcbiAgICAgICAgbGV0IG9wdGlvbkxhYmVsID0gb3B0aW9uW3RoaXMub3B0aW9uTGFiZWxdIHx8ICcnO1xyXG4gICAgICAgIG9wdGlvbkxhYmVsID0gb3B0aW9uTGFiZWwudG9TdHJpbmcoKS5yZXBsYWNlKC9cXFwiL2csICdcXCcnKTsgLy8gcmVwbGFjZSBkb3VibGUgcXVvdGVzIGJ5IHNpbmdsZSBxdW90ZXMgdG8gYXZvaWQgaW50ZXJmZXJpbmcgd2l0aCByZWd1bGFyIGh0bWxcclxuXHJcbiAgICAgICAgLy8gYWxzbyB0cmFuc2xhdGUgcHJlZml4L3N1ZmZpeCBpZiBlbmFibGVUcmFuc2xhdGVMYWJlbCBpcyB0cnVlIGFuZCB0ZXh0IGlzIGEgc3RyaW5nXHJcbiAgICAgICAgcHJlZml4VGV4dCA9ICh0aGlzLmVuYWJsZVRyYW5zbGF0ZUxhYmVsICYmIHByZWZpeFRleHQgJiYgdHlwZW9mIHByZWZpeFRleHQgPT09ICdzdHJpbmcnKSA/IHRoaXMuX3RyYW5zbGF0ZS5pbnN0YW50KHByZWZpeFRleHQgfHwgJyAnKSA6IHByZWZpeFRleHQ7XHJcbiAgICAgICAgc3VmZml4VGV4dCA9ICh0aGlzLmVuYWJsZVRyYW5zbGF0ZUxhYmVsICYmIHN1ZmZpeFRleHQgJiYgdHlwZW9mIHN1ZmZpeFRleHQgPT09ICdzdHJpbmcnKSA/IHRoaXMuX3RyYW5zbGF0ZS5pbnN0YW50KHN1ZmZpeFRleHQgfHwgJyAnKSA6IHN1ZmZpeFRleHQ7XHJcbiAgICAgICAgb3B0aW9uTGFiZWwgPSAodGhpcy5lbmFibGVUcmFuc2xhdGVMYWJlbCAmJiBvcHRpb25MYWJlbCAmJiB0eXBlb2Ygb3B0aW9uTGFiZWwgPT09ICdzdHJpbmcnKSA/IHRoaXMuX3RyYW5zbGF0ZS5pbnN0YW50KG9wdGlvbkxhYmVsIHx8ICcgJykgOiBvcHRpb25MYWJlbDtcclxuXHJcbiAgICAgICAgLy8gYWRkIHRvIGEgdGVtcCBhcnJheSBmb3Igam9pbmluZyBwdXJwb3NlIGFuZCBmaWx0ZXIgb3V0IGVtcHR5IHRleHRcclxuICAgICAgICBjb25zdCB0bXBPcHRpb25BcnJheSA9IFtwcmVmaXhUZXh0LCBsYWJlbFRleHQsIHN1ZmZpeFRleHRdLmZpbHRlcigodGV4dCkgPT4gdGV4dCk7XHJcbiAgICAgICAgbGV0IG9wdGlvblRleHQgPSB0bXBPcHRpb25BcnJheS5qb2luKHNlcGFyYXRvckJldHdlZW5MYWJlbHMpO1xyXG5cclxuICAgICAgICAvLyBpZiB1c2VyIHNwZWNpZmljYWxseSB3YW50cyB0byByZW5kZXIgaHRtbCB0ZXh0LCBoZSBuZWVkcyB0byBvcHQtaW4gZWxzZSBpdCB3aWxsIHN0cmlwcGVkIG91dCBieSBkZWZhdWx0XHJcbiAgICAgICAgLy8gYWxzbywgdGhlIDNyZCBwYXJ0eSBsaWIgd2lsbCBzYW5pbml0emUgYW55IGh0bWwgY29kZSB1bmxlc3MgaXQncyBlbmNvZGVkLCBzbyB3ZSdsbCBkbyB0aGF0XHJcbiAgICAgICAgaWYgKGlzUmVuZGVySHRtbEVuYWJsZWQpIHtcclxuICAgICAgICAgIC8vIHNhbml0aXplIGFueSB1bmF1dGhvcml6ZWQgaHRtbCB0YWdzIGxpa2Ugc2NyaXB0IGFuZCBvdGhlcnNcclxuICAgICAgICAgIC8vIGZvciB0aGUgcmVtYWluaW5nIGFsbG93ZWQgdGFncyB3ZSdsbCBwZXJtaXQgYWxsIGF0dHJpYnV0ZXNcclxuICAgICAgICAgIGNvbnN0IHNhbml0aXplZFRleHQgPSBET01QdXJpZnkuc2FuaXRpemUob3B0aW9uVGV4dCwgc2FuaXRpemVkT3B0aW9ucyk7XHJcbiAgICAgICAgICBvcHRpb25UZXh0ID0gaHRtbEVuY29kZShzYW5pdGl6ZWRUZXh0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9wdGlvbnMgKz0gYDxvcHRpb24gdmFsdWU9XCIke29wdGlvblt0aGlzLnZhbHVlTmFtZV19XCIgbGFiZWw9XCIke29wdGlvbkxhYmVsfVwiPiR7b3B0aW9uVGV4dH08L29wdGlvbj5gO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gYDxzZWxlY3QgaWQ9XCIke3RoaXMuZWxlbWVudE5hbWV9XCIgY2xhc3M9XCJtcy1maWx0ZXIgc2VhcmNoLWZpbHRlciBlZGl0b3ItJHtmaWVsZElkfVwiICR7dGhpcy5pc011bHRpcGxlU2VsZWN0ID8gJ211bHRpcGxlPVwibXVsdGlwbGVcIicgOiAnJ30+JHtvcHRpb25zfTwvc2VsZWN0PmA7XHJcbiAgfVxyXG5cclxuICAvKiogQ3JlYXRlIGEgYmxhbmsgZW50cnkgdGhhdCBjYW4gYmUgYWRkZWQgdG8gdGhlIGNvbGxlY3Rpb24uIEl0IHdpbGwgYWxzbyByZXVzZSB0aGUgc2FtZSBjdXN0b21TdHJ1Y3R1cmUgaWYgbmVlZCBiZSAqL1xyXG4gIHByb3RlY3RlZCBjcmVhdGVCbGFua0VudHJ5KCkge1xyXG4gICAgY29uc3QgYmxhbmtFbnRyeSA9IHtcclxuICAgICAgW3RoaXMubGFiZWxOYW1lXTogJycsXHJcbiAgICAgIFt0aGlzLnZhbHVlTmFtZV06ICcnXHJcbiAgICB9O1xyXG4gICAgaWYgKHRoaXMubGFiZWxQcmVmaXhOYW1lKSB7XHJcbiAgICAgIGJsYW5rRW50cnlbdGhpcy5sYWJlbFByZWZpeE5hbWVdID0gJyc7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5sYWJlbFN1ZmZpeE5hbWUpIHtcclxuICAgICAgYmxhbmtFbnRyeVt0aGlzLmxhYmVsU3VmZml4TmFtZV0gPSAnJztcclxuICAgIH1cclxuICAgIHJldHVybiBibGFua0VudHJ5O1xyXG4gIH1cclxuXHJcbiAgLyoqIEJ1aWxkIHRoZSB0ZW1wbGF0ZSBIVE1MIHN0cmluZyAqL1xyXG4gIHByb3RlY3RlZCBjcmVhdGVEb21FbGVtZW50KGVkaXRvclRlbXBsYXRlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuJGVkaXRvckVsbSA9ICQoZWRpdG9yVGVtcGxhdGUpO1xyXG5cclxuICAgIGlmICh0aGlzLiRlZGl0b3JFbG0gJiYgdHlwZW9mIHRoaXMuJGVkaXRvckVsbS5hcHBlbmRUbyA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICB0aGlzLiRlZGl0b3JFbG0uYXBwZW5kVG8odGhpcy5hcmdzLmNvbnRhaW5lcik7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHR5cGVvZiB0aGlzLiRlZGl0b3JFbG0ubXVsdGlwbGVTZWxlY3QgIT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgLy8gZmFsbGJhY2sgdG8gYm9vdHN0cmFwXHJcbiAgICAgIHRoaXMuJGVkaXRvckVsbS5hZGRDbGFzcygnZm9ybS1jb250cm9sJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCBlbGVtZW50T3B0aW9ucyA9ICh0aGlzLmNvbHVtbkRlZi5pbnRlcm5hbENvbHVtbkVkaXRvcikgPyB0aGlzLmNvbHVtbkRlZi5pbnRlcm5hbENvbHVtbkVkaXRvci5lbGVtZW50T3B0aW9ucyA6IHt9O1xyXG4gICAgICB0aGlzLmVkaXRvckVsbU9wdGlvbnMgPSB7IC4uLnRoaXMuZGVmYXVsdE9wdGlvbnMsIC4uLmVsZW1lbnRPcHRpb25zIH07XHJcbiAgICAgIHRoaXMuJGVkaXRvckVsbSA9IHRoaXMuJGVkaXRvckVsbS5tdWx0aXBsZVNlbGVjdCh0aGlzLmVkaXRvckVsbU9wdGlvbnMpO1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICBpZiAodGhpcy4kZWRpdG9yRWxtICYmIHR5cGVvZiB0aGlzLiRlZGl0b3JFbG0ubXVsdGlwbGVTZWxlY3QgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgIHRoaXMuJGVkaXRvckVsbS5tdWx0aXBsZVNlbGVjdCgnb3BlbicpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyByZWZyZXNoIHRoZSBqcXVlcnkgb2JqZWN0IGJlY2F1c2UgdGhlIHNlbGVjdGVkIGNoZWNrYm94ZXMgd2VyZSBhbHJlYWR5IHNldFxyXG4gIC8vIHByaW9yIHRvIHRoaXMgbWV0aG9kIGJlaW5nIGNhbGxlZFxyXG4gIHByb3RlY3RlZCByZWZyZXNoKCkge1xyXG4gICAgaWYgKHR5cGVvZiB0aGlzLiRlZGl0b3JFbG0ubXVsdGlwbGVTZWxlY3QgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgdGhpcy4kZWRpdG9yRWxtLm11bHRpcGxlU2VsZWN0KCdyZWZyZXNoJyk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==