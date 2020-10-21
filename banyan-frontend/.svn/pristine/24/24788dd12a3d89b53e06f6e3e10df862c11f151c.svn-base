import * as tslib_1 from "tslib";
import { OperatorType, } from './../models/index';
import { castToPromise, getDescendantProperty, htmlEncode, unsubscribeAllObservables } from '../services/utilities';
import { Subject } from 'rxjs';
import * as DOMPurify_ from 'dompurify';
var DOMPurify = DOMPurify_; // patch to fix rollup to work
var SelectFilter = /** @class */ (function () {
    /**
     * Initialize the Filter
     */
    function SelectFilter(translate, collectionService, isMultipleSelect) {
        if (isMultipleSelect === void 0) { isMultipleSelect = true; }
        var _this = this;
        this.translate = translate;
        this.collectionService = collectionService;
        this.isMultipleSelect = isMultipleSelect;
        this._isFilterFirstRender = true;
        this._shouldTriggerQuery = true;
        this.isFilled = false;
        this.enableTranslateLabel = false;
        this.subscriptions = [];
        // default options used by this Filter, user can overwrite any of these by passing "otions"
        var options = {
            autoAdjustDropHeight: true,
            autoAdjustDropPosition: true,
            autoAdjustDropWidthByTextSize: true,
            container: 'body',
            filter: false,
            maxHeight: 275,
            single: true,
            textTemplate: function ($elm) {
                // render HTML code or not, by default it is sanitized and won't be rendered
                var isRenderHtmlEnabled = _this.columnDef && _this.columnDef.filter && _this.columnDef.filter.enableRenderHtml || false;
                return isRenderHtmlEnabled ? $elm.text() : $elm.html();
            },
            onClose: function () {
                // we will subscribe to the onClose event for triggering our callback
                // also add/remove "filled" class for styling purposes
                var selectedItems = _this.$filterElm.multipleSelect('getSelects');
                if (Array.isArray(selectedItems) && selectedItems.length > 1 || (selectedItems.length === 1 && selectedItems[0] !== '')) {
                    _this.isFilled = true;
                    _this.$filterElm.addClass('filled').siblings('div .search-filter').addClass('filled');
                }
                else {
                    _this.isFilled = false;
                    _this.$filterElm.removeClass('filled');
                    _this.$filterElm.siblings('div .search-filter').removeClass('filled');
                }
                _this.callback(undefined, { columnDef: _this.columnDef, operator: _this.operator, searchTerms: selectedItems, shouldTriggerQuery: _this._shouldTriggerQuery });
                // reset flag for next use
                _this._shouldTriggerQuery = true;
            }
        };
        if (this.isMultipleSelect) {
            options.single = false;
            options.okButton = true;
            options.addTitle = true; // show tooltip of all selected items while hovering the filter
            options.countSelected = this.translate.instant('X_OF_Y_SELECTED');
            options.allSelected = this.translate.instant('ALL_SELECTED');
            options.selectAllText = this.translate.instant('SELECT_ALL');
            options.selectAllDelimiter = ['', '']; // remove default square brackets of default text "[Select All]" => "Select All"
        }
        this.defaultOptions = options;
    }
    Object.defineProperty(SelectFilter.prototype, "columnFilter", {
        /** Getter for the Column Filter itself */
        get: function () {
            return this.columnDef && this.columnDef.filter;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectFilter.prototype, "collectionOptions", {
        /** Getter for the Collection Options */
        get: function () {
            return this.columnDef && this.columnDef.filter && this.columnDef.filter.collectionOptions;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectFilter.prototype, "customStructure", {
        /** Getter for the Custom Structure if exist */
        get: function () {
            return this.columnDef && this.columnDef.filter && this.columnDef.filter.customStructure;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectFilter.prototype, "gridOptions", {
        /** Getter for the Grid Options pulled through the Grid Object */
        get: function () {
            return (this.grid && this.grid.getOptions) ? this.grid.getOptions() : {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectFilter.prototype, "operator", {
        /** Getter for the filter operator */
        get: function () {
            if (this.columnDef && this.columnDef.filter && this.columnDef.filter.operator) {
                return this.columnDef && this.columnDef.filter && this.columnDef.filter.operator;
            }
            return this.isMultipleSelect ? OperatorType.in : OperatorType.equal;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Initialize the filter template
     */
    SelectFilter.prototype.init = function (args, isFilterFirstRender) {
        this._isFilterFirstRender = isFilterFirstRender;
        this.grid = args.grid;
        this.callback = args.callback;
        this.columnDef = args.columnDef;
        this.searchTerms = args.searchTerms || [];
        if (!this.grid || !this.columnDef || !this.columnFilter || (!this.columnFilter.collection && !this.columnFilter.collectionAsync)) {
            throw new Error("[Angular-SlickGrid] You need to pass a \"collection\" (or \"collectionAsync\") for the MultipleSelect/SingleSelect Filter to work correctly. Also each option should include a value/label pair (or value/labelKey when using Locale). For example:: { filter: model: Filters.multipleSelect, collection: [{ value: true, label: 'True' }, { value: false, label: 'False'}] }");
        }
        this.enableTranslateLabel = this.columnFilter.enableTranslateLabel;
        this.labelName = this.customStructure && this.customStructure.label || 'label';
        this.labelPrefixName = this.customStructure && this.customStructure.labelPrefix || 'labelPrefix';
        this.labelSuffixName = this.customStructure && this.customStructure.labelSuffix || 'labelSuffix';
        this.optionLabel = this.customStructure && this.customStructure.optionLabel || 'value';
        this.valueName = this.customStructure && this.customStructure.value || 'value';
        if (this.enableTranslateLabel && (!this.translate || typeof this.translate.instant !== 'function')) {
            throw new Error("[select-editor] The ngx-translate TranslateService is required for the Select Filter to work correctly");
        }
        // always render the Select (dropdown) DOM element, even if user passed a "collectionAsync",
        // if that is the case, the Select will simply be without any options but we still have to render it (else SlickGrid would throw an error)
        var newCollection = this.columnFilter.collection || [];
        this.renderDomElement(newCollection);
        // on every Filter which have a "collection" or a "collectionAsync"
        // we will add (or replace) a Subject to the "collectionAsync" property so that user has possibility to change the collection
        // if "collectionAsync" is already set by the user, it will resolve it first then after it will replace it with a Subject
        var collectionAsync = this.columnFilter && this.columnFilter.collectionAsync;
        if (collectionAsync) {
            this.renderOptionsAsync(collectionAsync); // create Subject after resolve (createCollectionAsyncSubject)
        }
    };
    /**
     * Clear the filter values
     */
    SelectFilter.prototype.clear = function (shouldTriggerQuery) {
        if (shouldTriggerQuery === void 0) { shouldTriggerQuery = true; }
        if (this.$filterElm && this.$filterElm.multipleSelect) {
            // reload the filter element by it's id, to make sure it's still a valid element (because of some issue in the GraphQL example)
            this.$filterElm.multipleSelect('setSelects', []);
            this.$filterElm.removeClass('filled');
            this.$filterElm.siblings('div .search-filter').removeClass('filled');
            this.searchTerms = [];
            this._shouldTriggerQuery = shouldTriggerQuery;
            this.callback(undefined, { columnDef: this.columnDef, clearFilterTriggered: true, shouldTriggerQuery: this._shouldTriggerQuery });
            // reset both flags for next use
            this._shouldTriggerQuery = true;
        }
    };
    /**
     * destroy the filter
     */
    SelectFilter.prototype.destroy = function () {
        if (this.$filterElm) {
            // remove event watcher
            this.$filterElm.off().remove();
            var elementClassName = this.elementName.toString().replace('.', '\\.'); // make sure to escape any dot "." from CSS class to avoid console error
            $("[name=" + elementClassName + "].ms-drop").remove();
        }
        // also dispose of all Subscriptions
        this.subscriptions = unsubscribeAllObservables(this.subscriptions);
    };
    /**
     * Set value(s) on the DOM element
     */
    SelectFilter.prototype.setValues = function (values) {
        if (values) {
            values = Array.isArray(values) ? values : [values];
            this.$filterElm.multipleSelect('setSelects', values);
        }
    };
    //
    // protected functions
    // ------------------
    /**
     * user might want to filter certain items of the collection
     * @param inputCollection
     * @return outputCollection filtered and/or sorted collection
     */
    SelectFilter.prototype.filterCollection = function (inputCollection) {
        var outputCollection = inputCollection;
        // user might want to filter certain items of the collection
        if (this.columnDef && this.columnFilter && this.columnFilter.collectionFilterBy) {
            var filterBy = this.columnFilter.collectionFilterBy;
            var filterCollectionBy = this.columnFilter.collectionOptions && this.columnFilter.collectionOptions.filterResultAfterEachPass || null;
            outputCollection = this.collectionService.filterCollection(outputCollection, filterBy, filterCollectionBy);
        }
        return outputCollection;
    };
    /**
     * user might want to sort the collection in a certain way
     * @param inputCollection
     * @return outputCollection filtered and/or sorted collection
     */
    SelectFilter.prototype.sortCollection = function (inputCollection) {
        var outputCollection = inputCollection;
        // user might want to sort the collection
        if (this.columnDef && this.columnFilter && this.columnFilter.collectionSortBy) {
            var sortBy = this.columnFilter.collectionSortBy;
            outputCollection = this.collectionService.sortCollection(this.columnDef, outputCollection, sortBy, this.enableTranslateLabel);
        }
        return outputCollection;
    };
    SelectFilter.prototype.renderOptionsAsync = function (collectionAsync) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var awaitedCollection;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        awaitedCollection = [];
                        if (!collectionAsync) return [3 /*break*/, 2];
                        return [4 /*yield*/, castToPromise(collectionAsync)];
                    case 1:
                        awaitedCollection = _a.sent();
                        this.renderDomElementFromCollectionAsync(awaitedCollection);
                        // because we accept Promises & HttpClient Observable only execute once
                        // we will re-create an RxJs Subject which will replace the "collectionAsync" which got executed once anyway
                        // doing this provide the user a way to call a "collectionAsync.next()"
                        this.createCollectionAsyncSubject();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    /** Create or recreate an Observable Subject and reassign it to the "collectionAsync" object so user can call a "collectionAsync.next()" on it */
    SelectFilter.prototype.createCollectionAsyncSubject = function () {
        var _this = this;
        var newCollectionAsync = new Subject();
        this.columnFilter.collectionAsync = newCollectionAsync;
        this.subscriptions.push(newCollectionAsync.subscribe(function (collection) { return _this.renderDomElementFromCollectionAsync(collection); }));
    };
    /**
     * When user use a CollectionAsync we will use the returned collection to render the filter DOM element
     * and reinitialize filter collection with this new collection
     */
    SelectFilter.prototype.renderDomElementFromCollectionAsync = function (collection) {
        if (this.collectionOptions && this.collectionOptions.collectionInObjectProperty) {
            collection = getDescendantProperty(collection, this.collectionOptions.collectionInObjectProperty);
        }
        if (!Array.isArray(collection)) {
            throw new Error('Something went wrong while trying to pull the collection from the "collectionAsync" call in the Select Filter, the collection is not a valid array.');
        }
        // copy over the array received from the async call to the "collection" as the new collection to use
        // this has to be BEFORE the `collectionObserver().subscribe` to avoid going into an infinite loop
        this.columnFilter.collection = collection;
        // recreate Multiple Select after getting async collection
        this.renderDomElement(collection);
    };
    SelectFilter.prototype.renderDomElement = function (collection) {
        if (!Array.isArray(collection) && this.collectionOptions && this.collectionOptions.collectionInObjectProperty) {
            collection = getDescendantProperty(collection, this.collectionOptions.collectionInObjectProperty);
        }
        if (!Array.isArray(collection)) {
            throw new Error('The "collection" passed to the Select Filter is not a valid array');
        }
        // user can optionally add a blank entry at the beginning of the collection
        if (this.collectionOptions && this.collectionOptions.addBlankEntry && this._isFilterFirstRender) {
            collection.unshift(this.createBlankEntry());
        }
        var newCollection = collection;
        // user might want to filter and/or sort certain items of the collection
        newCollection = this.filterCollection(newCollection);
        newCollection = this.sortCollection(newCollection);
        // step 1, create HTML string template
        var filterTemplate = this.buildTemplateHtmlString(newCollection, this.searchTerms);
        // step 2, create the DOM Element of the filter & pre-load search terms
        // also subscribe to the onClose event
        this.createDomElement(filterTemplate);
    };
    /**
     * Create the HTML template as a string
     */
    SelectFilter.prototype.buildTemplateHtmlString = function (optionCollection, searchTerms) {
        var _this = this;
        var options = '';
        var fieldId = this.columnDef && this.columnDef.id;
        var separatorBetweenLabels = this.collectionOptions && this.collectionOptions.separatorBetweenTextLabels || '';
        var isRenderHtmlEnabled = this.columnFilter && this.columnFilter.enableRenderHtml || false;
        var sanitizedOptions = this.gridOptions && this.gridOptions.sanitizeHtmlOptions || {};
        // collection could be an Array of Strings OR Objects
        if (optionCollection.every(function (x) { return typeof x === 'string'; })) {
            optionCollection.forEach(function (option) {
                var selected = (searchTerms.findIndex(function (term) { return term === option; }) >= 0) ? 'selected' : '';
                options += "<option value=\"" + option + "\" label=\"" + option + "\" " + selected + ">" + option + "</option>";
                // if there's at least 1 search term found, we will add the "filled" class for styling purposes
                if (selected) {
                    _this.isFilled = true;
                }
            });
        }
        else {
            // array of objects will require a label/value pair unless a customStructure is passed
            optionCollection.forEach(function (option) {
                if (!option || (option[_this.labelName] === undefined && option.labelKey === undefined)) {
                    throw new Error("[select-filter] A collection with value/label (or value/labelKey when using Locale) is required to populate the Select list, for example:: { filter: model: Filters.multipleSelect, collection: [ { value: '1', label: 'One' } ]')");
                }
                var labelKey = (option.labelKey || option[_this.labelName]);
                var selected = (searchTerms.findIndex(function (term) { return term === option[_this.valueName]; }) >= 0) ? 'selected' : '';
                var labelText = ((option.labelKey || _this.enableTranslateLabel) && labelKey) ? _this.translate.instant(labelKey || ' ') : labelKey;
                var prefixText = option[_this.labelPrefixName] || '';
                var suffixText = option[_this.labelSuffixName] || '';
                var optionLabel = option[_this.optionLabel] || '';
                optionLabel = optionLabel.toString().replace(/\"/g, '\''); // replace double quotes by single quotes to avoid interfering with regular html
                // also translate prefix/suffix if enableTranslateLabel is true and text is a string
                prefixText = (_this.enableTranslateLabel && prefixText && typeof prefixText === 'string') ? _this.translate.instant(prefixText || ' ') : prefixText;
                suffixText = (_this.enableTranslateLabel && suffixText && typeof suffixText === 'string') ? _this.translate.instant(suffixText || ' ') : suffixText;
                optionLabel = (_this.enableTranslateLabel && optionLabel && typeof optionLabel === 'string') ? _this.translate.instant(optionLabel || ' ') : optionLabel;
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
                // html text of each select option
                options += "<option value=\"" + option[_this.valueName] + "\" label=\"" + optionLabel + "\" " + selected + ">" + optionText + "</option>";
                // if there's at least 1 search term found, we will add the "filled" class for styling purposes
                if (selected) {
                    _this.isFilled = true;
                }
            });
        }
        return "<select class=\"ms-filter search-filter filter-" + fieldId + "\" " + (this.isMultipleSelect ? 'multiple="multiple"' : '') + ">" + options + "</select>";
    };
    /** Create a blank entry that can be added to the collection. It will also reuse the same customStructure if need be */
    SelectFilter.prototype.createBlankEntry = function () {
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
    /**
     * From the html template string, create a DOM element
     * Subscribe to the onClose event and run the callback when that happens
     * @param filterTemplate
     */
    SelectFilter.prototype.createDomElement = function (filterTemplate) {
        var fieldId = this.columnDef && this.columnDef.id;
        // provide the name attribute to the DOM element which will be needed to auto-adjust drop position (dropup / dropdown)
        this.elementName = "filter-" + fieldId;
        this.defaultOptions.name = this.elementName;
        var $headerElm = this.grid.getHeaderRowColumn(fieldId);
        $($headerElm).empty();
        // create the DOM element & add an ID and filter class
        this.$filterElm = $(filterTemplate);
        if (typeof this.$filterElm.multipleSelect !== 'function') {
            throw new Error("multiple-select.js was not found, make sure to modify your \"angular-cli.json\" file and include \"../node_modules/angular-slickgrid/lib/multiple-select/multiple-select.js\" and it's css or SASS file");
        }
        this.$filterElm.attr('id', this.elementName);
        this.$filterElm.attr('name', this.elementName);
        this.$filterElm.data('columnId', fieldId);
        // if there's a search term, we will add the "filled" class for styling purposes
        if (this.isFilled) {
            this.$filterElm.addClass('filled');
        }
        // append the new DOM element to the header row
        if (this.$filterElm && typeof this.$filterElm.appendTo === 'function') {
            this.$filterElm.appendTo($headerElm);
        }
        // merge options & attach multiSelect
        var elementOptions = tslib_1.__assign({}, this.defaultOptions, this.columnFilter.filterOptions);
        this.filterElmOptions = tslib_1.__assign({}, this.defaultOptions, elementOptions);
        this.$filterElm = this.$filterElm.multipleSelect(this.filterElmOptions);
    };
    return SelectFilter;
}());
export { SelectFilter };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0RmlsdGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9maWx0ZXJzL3NlbGVjdEZpbHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsT0FBTyxFQVVMLFlBQVksR0FJYixNQUFNLG1CQUFtQixDQUFDO0FBRTNCLE9BQU8sRUFBRSxhQUFhLEVBQUUscUJBQXFCLEVBQUUsVUFBVSxFQUFFLHlCQUF5QixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDcEgsT0FBTyxFQUFjLE9BQU8sRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFDekQsT0FBTyxLQUFLLFVBQVUsTUFBTSxXQUFXLENBQUM7QUFDeEMsSUFBTSxTQUFTLEdBQUcsVUFBVSxDQUFDLENBQUMsOEJBQThCO0FBSzVEO0lBMkJFOztPQUVHO0lBQ0gsc0JBQXNCLFNBQTJCLEVBQVksaUJBQW9DLEVBQVksZ0JBQXVCO1FBQXZCLGlDQUFBLEVBQUEsdUJBQXVCO1FBQXBJLGlCQThDQztRQTlDcUIsY0FBUyxHQUFULFNBQVMsQ0FBa0I7UUFBWSxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQVkscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFPO1FBN0I1SCx5QkFBb0IsR0FBRyxJQUFJLENBQUM7UUFDNUIsd0JBQW1CLEdBQUcsSUFBSSxDQUFDO1FBZ0JuQyxhQUFRLEdBQUcsS0FBSyxDQUFDO1FBTWpCLHlCQUFvQixHQUFHLEtBQUssQ0FBQztRQUM3QixrQkFBYSxHQUFtQixFQUFFLENBQUM7UUFNakMsMkZBQTJGO1FBQzNGLElBQU0sT0FBTyxHQUF5QjtZQUNwQyxvQkFBb0IsRUFBRSxJQUFJO1lBQzFCLHNCQUFzQixFQUFFLElBQUk7WUFDNUIsNkJBQTZCLEVBQUUsSUFBSTtZQUNuQyxTQUFTLEVBQUUsTUFBTTtZQUNqQixNQUFNLEVBQUUsS0FBSztZQUNiLFNBQVMsRUFBRSxHQUFH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QUFDO0FBQUQsQ0FBQyxBQWhhRCxJQWdhQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcclxuaW1wb3J0IHtcclxuICBDb2xsZWN0aW9uQ3VzdG9tU3RydWN0dXJlLFxyXG4gIENvbGxlY3Rpb25PcHRpb24sXHJcbiAgQ29sdW1uLFxyXG4gIENvbHVtbkZpbHRlcixcclxuICBGaWx0ZXIsXHJcbiAgRmlsdGVyQXJndW1lbnRzLFxyXG4gIEZpbHRlckNhbGxiYWNrLFxyXG4gIEdyaWRPcHRpb24sXHJcbiAgTXVsdGlwbGVTZWxlY3RPcHRpb24sXHJcbiAgT3BlcmF0b3JUeXBlLFxyXG4gIE9wZXJhdG9yU3RyaW5nLFxyXG4gIFNlYXJjaFRlcm0sXHJcbiAgU2VsZWN0T3B0aW9uLFxyXG59IGZyb20gJy4vLi4vbW9kZWxzL2luZGV4JztcclxuaW1wb3J0IHsgQ29sbGVjdGlvblNlcnZpY2UgfSBmcm9tICcuLy4uL3NlcnZpY2VzL2NvbGxlY3Rpb24uc2VydmljZSc7XHJcbmltcG9ydCB7IGNhc3RUb1Byb21pc2UsIGdldERlc2NlbmRhbnRQcm9wZXJ0eSwgaHRtbEVuY29kZSwgdW5zdWJzY3JpYmVBbGxPYnNlcnZhYmxlcyB9IGZyb20gJy4uL3NlcnZpY2VzL3V0aWxpdGllcyc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgKiBhcyBET01QdXJpZnlfIGZyb20gJ2RvbXB1cmlmeSc7XHJcbmNvbnN0IERPTVB1cmlmeSA9IERPTVB1cmlmeV87IC8vIHBhdGNoIHRvIGZpeCByb2xsdXAgdG8gd29ya1xyXG5cclxuLy8gdXNpbmcgZXh0ZXJuYWwgbm9uLXR5cGVkIGpzIGxpYnJhcmllc1xyXG5kZWNsYXJlIHZhciAkOiBhbnk7XHJcblxyXG5leHBvcnQgY2xhc3MgU2VsZWN0RmlsdGVyIGltcGxlbWVudHMgRmlsdGVyIHtcclxuICBwcml2YXRlIF9pc0ZpbHRlckZpcnN0UmVuZGVyID0gdHJ1ZTtcclxuICBwcml2YXRlIF9zaG91bGRUcmlnZ2VyUXVlcnkgPSB0cnVlO1xyXG5cclxuICAvKiogRE9NIEVsZW1lbnQgTmFtZSwgdXNlZnVsIGZvciBhdXRvLWRldGVjdGluZyBwb3NpdGlvbmluZyAoZHJvcHVwIC8gZHJvcGRvd24pICovXHJcbiAgZWxlbWVudE5hbWU6IHN0cmluZztcclxuXHJcbiAgLyoqIEZpbHRlciBNdWx0aXBsZS1TZWxlY3Qgb3B0aW9ucyAqL1xyXG4gIGZpbHRlckVsbU9wdGlvbnM6IE11bHRpcGxlU2VsZWN0T3B0aW9uO1xyXG5cclxuICAvKiogVGhlIEpRdWVyeSBET00gZWxlbWVudCAqL1xyXG4gICRmaWx0ZXJFbG06IGFueTtcclxuXHJcbiAgZ3JpZDogYW55O1xyXG4gIHNlYXJjaFRlcm1zOiBTZWFyY2hUZXJtW107XHJcbiAgY29sdW1uRGVmOiBDb2x1bW47XHJcbiAgY2FsbGJhY2s6IEZpbHRlckNhbGxiYWNrO1xyXG4gIGRlZmF1bHRPcHRpb25zOiBNdWx0aXBsZVNlbGVjdE9wdGlvbjtcclxuICBpc0ZpbGxlZCA9IGZhbHNlO1xyXG4gIGxhYmVsTmFtZTogc3RyaW5nO1xyXG4gIGxhYmVsUHJlZml4TmFtZTogc3RyaW5nO1xyXG4gIGxhYmVsU3VmZml4TmFtZTogc3RyaW5nO1xyXG4gIG9wdGlvbkxhYmVsOiBzdHJpbmc7XHJcbiAgdmFsdWVOYW1lOiBzdHJpbmc7XHJcbiAgZW5hYmxlVHJhbnNsYXRlTGFiZWwgPSBmYWxzZTtcclxuICBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xyXG5cclxuICAvKipcclxuICAgKiBJbml0aWFsaXplIHRoZSBGaWx0ZXJcclxuICAgKi9cclxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgdHJhbnNsYXRlOiBUcmFuc2xhdGVTZXJ2aWNlLCBwcm90ZWN0ZWQgY29sbGVjdGlvblNlcnZpY2U6IENvbGxlY3Rpb25TZXJ2aWNlLCBwcm90ZWN0ZWQgaXNNdWx0aXBsZVNlbGVjdCA9IHRydWUpIHtcclxuICAgIC8vIGRlZmF1bHQgb3B0aW9ucyB1c2VkIGJ5IHRoaXMgRmlsdGVyLCB1c2VyIGNhbiBvdmVyd3JpdGUgYW55IG9mIHRoZXNlIGJ5IHBhc3NpbmcgXCJvdGlvbnNcIlxyXG4gICAgY29uc3Qgb3B0aW9uczogTXVsdGlwbGVTZWxlY3RPcHRpb24gPSB7XHJcbiAgICAgIGF1dG9BZGp1c3REcm9wSGVpZ2h0OiB0cnVlLFxyXG4gICAgICBhdXRvQWRqdXN0RHJvcFBvc2l0aW9uOiB0cnVlLFxyXG4gICAgICBhdXRvQWRqdXN0RHJvcFdpZHRoQnlUZXh0U2l6ZTogdHJ1ZSxcclxuICAgICAgY29udGFpbmVyOiAnYm9keScsXHJcbiAgICAgIGZpbHRlcjogZmFsc2UsICAvLyBpbnB1dCBzZWFyY2ggdGVybSBvbiB0b3Agb2YgdGhlIHNlbGVjdCBvcHRpb24gbGlzdFxyXG4gICAgICBtYXhIZWlnaHQ6IDI3NSxcclxuICAgICAgc2luZ2xlOiB0cnVlLFxyXG5cclxuICAgICAgdGV4dFRlbXBsYXRlOiAoJGVsbSkgPT4ge1xyXG4gICAgICAgIC8vIHJlbmRlciBIVE1MIGNvZGUgb3Igbm90LCBieSBkZWZhdWx0IGl0IGlzIHNhbml0aXplZCBhbmQgd29uJ3QgYmUgcmVuZGVyZWRcclxuICAgICAgICBjb25zdCBpc1JlbmRlckh0bWxFbmFibGVkID0gdGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYuZmlsdGVyICYmIHRoaXMuY29sdW1uRGVmLmZpbHRlci5lbmFibGVSZW5kZXJIdG1sIHx8IGZhbHNlO1xyXG4gICAgICAgIHJldHVybiBpc1JlbmRlckh0bWxFbmFibGVkID8gJGVsbS50ZXh0KCkgOiAkZWxtLmh0bWwoKTtcclxuICAgICAgfSxcclxuICAgICAgb25DbG9zZTogKCkgPT4ge1xyXG4gICAgICAgIC8vIHdlIHdpbGwgc3Vic2NyaWJlIHRvIHRoZSBvbkNsb3NlIGV2ZW50IGZvciB0cmlnZ2VyaW5nIG91ciBjYWxsYmFja1xyXG4gICAgICAgIC8vIGFsc28gYWRkL3JlbW92ZSBcImZpbGxlZFwiIGNsYXNzIGZvciBzdHlsaW5nIHB1cnBvc2VzXHJcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRJdGVtcyA9IHRoaXMuJGZpbHRlckVsbS5tdWx0aXBsZVNlbGVjdCgnZ2V0U2VsZWN0cycpO1xyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHNlbGVjdGVkSXRlbXMpICYmIHNlbGVjdGVkSXRlbXMubGVuZ3RoID4gMSB8fCAoc2VsZWN0ZWRJdGVtcy5sZW5ndGggPT09IDEgJiYgc2VsZWN0ZWRJdGVtc1swXSAhPT0gJycpKSB7XHJcbiAgICAgICAgICB0aGlzLmlzRmlsbGVkID0gdHJ1ZTtcclxuICAgICAgICAgIHRoaXMuJGZpbHRlckVsbS5hZGRDbGFzcygnZmlsbGVkJykuc2libGluZ3MoJ2RpdiAuc2VhcmNoLWZpbHRlcicpLmFkZENsYXNzKCdmaWxsZWQnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5pc0ZpbGxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgdGhpcy4kZmlsdGVyRWxtLnJlbW92ZUNsYXNzKCdmaWxsZWQnKTtcclxuICAgICAgICAgIHRoaXMuJGZpbHRlckVsbS5zaWJsaW5ncygnZGl2IC5zZWFyY2gtZmlsdGVyJykucmVtb3ZlQ2xhc3MoJ2ZpbGxlZCcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5jYWxsYmFjayh1bmRlZmluZWQsIHsgY29sdW1uRGVmOiB0aGlzLmNvbHVtbkRlZiwgb3BlcmF0b3I6IHRoaXMub3BlcmF0b3IsIHNlYXJjaFRlcm1zOiBzZWxlY3RlZEl0ZW1zLCBzaG91bGRUcmlnZ2VyUXVlcnk6IHRoaXMuX3Nob3VsZFRyaWdnZXJRdWVyeSB9KTtcclxuICAgICAgICAvLyByZXNldCBmbGFnIGZvciBuZXh0IHVzZVxyXG4gICAgICAgIHRoaXMuX3Nob3VsZFRyaWdnZXJRdWVyeSA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgaWYgKHRoaXMuaXNNdWx0aXBsZVNlbGVjdCkge1xyXG4gICAgICBvcHRpb25zLnNpbmdsZSA9IGZhbHNlO1xyXG4gICAgICBvcHRpb25zLm9rQnV0dG9uID0gdHJ1ZTtcclxuICAgICAgb3B0aW9ucy5hZGRUaXRsZSA9IHRydWU7IC8vIHNob3cgdG9vbHRpcCBvZiBhbGwgc2VsZWN0ZWQgaXRlbXMgd2hpbGUgaG92ZXJpbmcgdGhlIGZpbHRlclxyXG4gICAgICBvcHRpb25zLmNvdW50U2VsZWN0ZWQgPSB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KCdYX09GX1lfU0VMRUNURUQnKTtcclxuICAgICAgb3B0aW9ucy5hbGxTZWxlY3RlZCA9IHRoaXMudHJhbnNsYXRlLmluc3RhbnQoJ0FMTF9TRUxFQ1RFRCcpO1xyXG4gICAgICBvcHRpb25zLnNlbGVjdEFsbFRleHQgPSB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KCdTRUxFQ1RfQUxMJyk7XHJcbiAgICAgIG9wdGlvbnMuc2VsZWN0QWxsRGVsaW1pdGVyID0gWycnLCAnJ107IC8vIHJlbW92ZSBkZWZhdWx0IHNxdWFyZSBicmFja2V0cyBvZiBkZWZhdWx0IHRleHQgXCJbU2VsZWN0IEFsbF1cIiA9PiBcIlNlbGVjdCBBbGxcIlxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZGVmYXVsdE9wdGlvbnMgPSBvcHRpb25zO1xyXG4gIH1cclxuXHJcbiAgLyoqIEdldHRlciBmb3IgdGhlIENvbHVtbiBGaWx0ZXIgaXRzZWxmICovXHJcbiAgcHJvdGVjdGVkIGdldCBjb2x1bW5GaWx0ZXIoKTogQ29sdW1uRmlsdGVyIHtcclxuICAgIHJldHVybiB0aGlzLmNvbHVtbkRlZiAmJiB0aGlzLmNvbHVtbkRlZi5maWx0ZXI7XHJcbiAgfVxyXG5cclxuICAvKiogR2V0dGVyIGZvciB0aGUgQ29sbGVjdGlvbiBPcHRpb25zICovXHJcbiAgcHJvdGVjdGVkIGdldCBjb2xsZWN0aW9uT3B0aW9ucygpOiBDb2xsZWN0aW9uT3B0aW9uIHtcclxuICAgIHJldHVybiB0aGlzLmNvbHVtbkRlZiAmJiB0aGlzLmNvbHVtbkRlZi5maWx0ZXIgJiYgdGhpcy5jb2x1bW5EZWYuZmlsdGVyLmNvbGxlY3Rpb25PcHRpb25zO1xyXG4gIH1cclxuXHJcbiAgLyoqIEdldHRlciBmb3IgdGhlIEN1c3RvbSBTdHJ1Y3R1cmUgaWYgZXhpc3QgKi9cclxuICBwcm90ZWN0ZWQgZ2V0IGN1c3RvbVN0cnVjdHVyZSgpOiBDb2xsZWN0aW9uQ3VzdG9tU3RydWN0dXJlIHtcclxuICAgIHJldHVybiB0aGlzLmNvbHVtbkRlZiAmJiB0aGlzLmNvbHVtbkRlZi5maWx0ZXIgJiYgdGhpcy5jb2x1bW5EZWYuZmlsdGVyLmN1c3RvbVN0cnVjdHVyZTtcclxuICB9XHJcblxyXG4gIC8qKiBHZXR0ZXIgZm9yIHRoZSBHcmlkIE9wdGlvbnMgcHVsbGVkIHRocm91Z2ggdGhlIEdyaWQgT2JqZWN0ICovXHJcbiAgcHJvdGVjdGVkIGdldCBncmlkT3B0aW9ucygpOiBHcmlkT3B0aW9uIHtcclxuICAgIHJldHVybiAodGhpcy5ncmlkICYmIHRoaXMuZ3JpZC5nZXRPcHRpb25zKSA/IHRoaXMuZ3JpZC5nZXRPcHRpb25zKCkgOiB7fTtcclxuICB9XHJcblxyXG4gIC8qKiBHZXR0ZXIgZm9yIHRoZSBmaWx0ZXIgb3BlcmF0b3IgKi9cclxuICBnZXQgb3BlcmF0b3IoKTogT3BlcmF0b3JUeXBlIHwgT3BlcmF0b3JTdHJpbmcge1xyXG4gICAgaWYgKHRoaXMuY29sdW1uRGVmICYmIHRoaXMuY29sdW1uRGVmLmZpbHRlciAmJiB0aGlzLmNvbHVtbkRlZi5maWx0ZXIub3BlcmF0b3IpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuY29sdW1uRGVmICYmIHRoaXMuY29sdW1uRGVmLmZpbHRlciAmJiB0aGlzLmNvbHVtbkRlZi5maWx0ZXIub3BlcmF0b3I7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5pc011bHRpcGxlU2VsZWN0ID8gT3BlcmF0b3JUeXBlLmluIDogT3BlcmF0b3JUeXBlLmVxdWFsO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSW5pdGlhbGl6ZSB0aGUgZmlsdGVyIHRlbXBsYXRlXHJcbiAgICovXHJcbiAgaW5pdChhcmdzOiBGaWx0ZXJBcmd1bWVudHMsIGlzRmlsdGVyRmlyc3RSZW5kZXI6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuX2lzRmlsdGVyRmlyc3RSZW5kZXIgPSBpc0ZpbHRlckZpcnN0UmVuZGVyO1xyXG4gICAgdGhpcy5ncmlkID0gYXJncy5ncmlkO1xyXG4gICAgdGhpcy5jYWxsYmFjayA9IGFyZ3MuY2FsbGJhY2s7XHJcbiAgICB0aGlzLmNvbHVtbkRlZiA9IGFyZ3MuY29sdW1uRGVmO1xyXG4gICAgdGhpcy5zZWFyY2hUZXJtcyA9IGFyZ3Muc2VhcmNoVGVybXMgfHwgW107XHJcblxyXG4gICAgaWYgKCF0aGlzLmdyaWQgfHwgIXRoaXMuY29sdW1uRGVmIHx8ICF0aGlzLmNvbHVtbkZpbHRlciB8fCAoIXRoaXMuY29sdW1uRmlsdGVyLmNvbGxlY3Rpb24gJiYgIXRoaXMuY29sdW1uRmlsdGVyLmNvbGxlY3Rpb25Bc3luYykpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBbQW5ndWxhci1TbGlja0dyaWRdIFlvdSBuZWVkIHRvIHBhc3MgYSBcImNvbGxlY3Rpb25cIiAob3IgXCJjb2xsZWN0aW9uQXN5bmNcIikgZm9yIHRoZSBNdWx0aXBsZVNlbGVjdC9TaW5nbGVTZWxlY3QgRmlsdGVyIHRvIHdvcmsgY29ycmVjdGx5LiBBbHNvIGVhY2ggb3B0aW9uIHNob3VsZCBpbmNsdWRlIGEgdmFsdWUvbGFiZWwgcGFpciAob3IgdmFsdWUvbGFiZWxLZXkgd2hlbiB1c2luZyBMb2NhbGUpLiBGb3IgZXhhbXBsZTo6IHsgZmlsdGVyOiBtb2RlbDogRmlsdGVycy5tdWx0aXBsZVNlbGVjdCwgY29sbGVjdGlvbjogW3sgdmFsdWU6IHRydWUsIGxhYmVsOiAnVHJ1ZScgfSwgeyB2YWx1ZTogZmFsc2UsIGxhYmVsOiAnRmFsc2UnfV0gfWApO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZW5hYmxlVHJhbnNsYXRlTGFiZWwgPSB0aGlzLmNvbHVtbkZpbHRlci5lbmFibGVUcmFuc2xhdGVMYWJlbDtcclxuICAgIHRoaXMubGFiZWxOYW1lID0gdGhpcy5jdXN0b21TdHJ1Y3R1cmUgJiYgdGhpcy5jdXN0b21TdHJ1Y3R1cmUubGFiZWwgfHwgJ2xhYmVsJztcclxuICAgIHRoaXMubGFiZWxQcmVmaXhOYW1lID0gdGhpcy5jdXN0b21TdHJ1Y3R1cmUgJiYgdGhpcy5jdXN0b21TdHJ1Y3R1cmUubGFiZWxQcmVmaXggfHwgJ2xhYmVsUHJlZml4JztcclxuICAgIHRoaXMubGFiZWxTdWZmaXhOYW1lID0gdGhpcy5jdXN0b21TdHJ1Y3R1cmUgJiYgdGhpcy5jdXN0b21TdHJ1Y3R1cmUubGFiZWxTdWZmaXggfHwgJ2xhYmVsU3VmZml4JztcclxuICAgIHRoaXMub3B0aW9uTGFiZWwgPSB0aGlzLmN1c3RvbVN0cnVjdHVyZSAmJiB0aGlzLmN1c3RvbVN0cnVjdHVyZS5vcHRpb25MYWJlbCB8fCAndmFsdWUnO1xyXG4gICAgdGhpcy52YWx1ZU5hbWUgPSB0aGlzLmN1c3RvbVN0cnVjdHVyZSAmJiB0aGlzLmN1c3RvbVN0cnVjdHVyZS52YWx1ZSB8fCAndmFsdWUnO1xyXG5cclxuICAgIGlmICh0aGlzLmVuYWJsZVRyYW5zbGF0ZUxhYmVsICYmICghdGhpcy50cmFuc2xhdGUgfHwgdHlwZW9mIHRoaXMudHJhbnNsYXRlLmluc3RhbnQgIT09ICdmdW5jdGlvbicpKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgW3NlbGVjdC1lZGl0b3JdIFRoZSBuZ3gtdHJhbnNsYXRlIFRyYW5zbGF0ZVNlcnZpY2UgaXMgcmVxdWlyZWQgZm9yIHRoZSBTZWxlY3QgRmlsdGVyIHRvIHdvcmsgY29ycmVjdGx5YCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gYWx3YXlzIHJlbmRlciB0aGUgU2VsZWN0IChkcm9wZG93bikgRE9NIGVsZW1lbnQsIGV2ZW4gaWYgdXNlciBwYXNzZWQgYSBcImNvbGxlY3Rpb25Bc3luY1wiLFxyXG4gICAgLy8gaWYgdGhhdCBpcyB0aGUgY2FzZSwgdGhlIFNlbGVjdCB3aWxsIHNpbXBseSBiZSB3aXRob3V0IGFueSBvcHRpb25zIGJ1dCB3ZSBzdGlsbCBoYXZlIHRvIHJlbmRlciBpdCAoZWxzZSBTbGlja0dyaWQgd291bGQgdGhyb3cgYW4gZXJyb3IpXHJcbiAgICBjb25zdCBuZXdDb2xsZWN0aW9uID0gdGhpcy5jb2x1bW5GaWx0ZXIuY29sbGVjdGlvbiB8fCBbXTtcclxuICAgIHRoaXMucmVuZGVyRG9tRWxlbWVudChuZXdDb2xsZWN0aW9uKTtcclxuXHJcbiAgICAvLyBvbiBldmVyeSBGaWx0ZXIgd2hpY2ggaGF2ZSBhIFwiY29sbGVjdGlvblwiIG9yIGEgXCJjb2xsZWN0aW9uQXN5bmNcIlxyXG4gICAgLy8gd2Ugd2lsbCBhZGQgKG9yIHJlcGxhY2UpIGEgU3ViamVjdCB0byB0aGUgXCJjb2xsZWN0aW9uQXN5bmNcIiBwcm9wZXJ0eSBzbyB0aGF0IHVzZXIgaGFzIHBvc3NpYmlsaXR5IHRvIGNoYW5nZSB0aGUgY29sbGVjdGlvblxyXG4gICAgLy8gaWYgXCJjb2xsZWN0aW9uQXN5bmNcIiBpcyBhbHJlYWR5IHNldCBieSB0aGUgdXNlciwgaXQgd2lsbCByZXNvbHZlIGl0IGZpcnN0IHRoZW4gYWZ0ZXIgaXQgd2lsbCByZXBsYWNlIGl0IHdpdGggYSBTdWJqZWN0XHJcbiAgICBjb25zdCBjb2xsZWN0aW9uQXN5bmMgPSB0aGlzLmNvbHVtbkZpbHRlciAmJiB0aGlzLmNvbHVtbkZpbHRlci5jb2xsZWN0aW9uQXN5bmM7XHJcbiAgICBpZiAoY29sbGVjdGlvbkFzeW5jKSB7XHJcbiAgICAgIHRoaXMucmVuZGVyT3B0aW9uc0FzeW5jKGNvbGxlY3Rpb25Bc3luYyk7IC8vIGNyZWF0ZSBTdWJqZWN0IGFmdGVyIHJlc29sdmUgKGNyZWF0ZUNvbGxlY3Rpb25Bc3luY1N1YmplY3QpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDbGVhciB0aGUgZmlsdGVyIHZhbHVlc1xyXG4gICAqL1xyXG4gIGNsZWFyKHNob3VsZFRyaWdnZXJRdWVyeSA9IHRydWUpIHtcclxuICAgIGlmICh0aGlzLiRmaWx0ZXJFbG0gJiYgdGhpcy4kZmlsdGVyRWxtLm11bHRpcGxlU2VsZWN0KSB7XHJcbiAgICAgIC8vIHJlbG9hZCB0aGUgZmlsdGVyIGVsZW1lbnQgYnkgaXQncyBpZCwgdG8gbWFrZSBzdXJlIGl0J3Mgc3RpbGwgYSB2YWxpZCBlbGVtZW50IChiZWNhdXNlIG9mIHNvbWUgaXNzdWUgaW4gdGhlIEdyYXBoUUwgZXhhbXBsZSlcclxuICAgICAgdGhpcy4kZmlsdGVyRWxtLm11bHRpcGxlU2VsZWN0KCdzZXRTZWxlY3RzJywgW10pO1xyXG4gICAgICB0aGlzLiRmaWx0ZXJFbG0ucmVtb3ZlQ2xhc3MoJ2ZpbGxlZCcpO1xyXG4gICAgICB0aGlzLiRmaWx0ZXJFbG0uc2libGluZ3MoJ2RpdiAuc2VhcmNoLWZpbHRlcicpLnJlbW92ZUNsYXNzKCdmaWxsZWQnKTtcclxuICAgICAgdGhpcy5zZWFyY2hUZXJtcyA9IFtdO1xyXG4gICAgICB0aGlzLl9zaG91bGRUcmlnZ2VyUXVlcnkgPSBzaG91bGRUcmlnZ2VyUXVlcnk7XHJcbiAgICAgIHRoaXMuY2FsbGJhY2sodW5kZWZpbmVkLCB7IGNvbHVtbkRlZjogdGhpcy5jb2x1bW5EZWYsIGNsZWFyRmlsdGVyVHJpZ2dlcmVkOiB0cnVlLCBzaG91bGRUcmlnZ2VyUXVlcnk6IHRoaXMuX3Nob3VsZFRyaWdnZXJRdWVyeSB9KTtcclxuICAgICAgLy8gcmVzZXQgYm90aCBmbGFncyBmb3IgbmV4dCB1c2VcclxuICAgICAgdGhpcy5fc2hvdWxkVHJpZ2dlclF1ZXJ5ID0gdHJ1ZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGRlc3Ryb3kgdGhlIGZpbHRlclxyXG4gICAqL1xyXG4gIGRlc3Ryb3koKSB7XHJcbiAgICBpZiAodGhpcy4kZmlsdGVyRWxtKSB7XHJcbiAgICAgIC8vIHJlbW92ZSBldmVudCB3YXRjaGVyXHJcbiAgICAgIHRoaXMuJGZpbHRlckVsbS5vZmYoKS5yZW1vdmUoKTtcclxuICAgICAgY29uc3QgZWxlbWVudENsYXNzTmFtZSA9IHRoaXMuZWxlbWVudE5hbWUudG9TdHJpbmcoKS5yZXBsYWNlKCcuJywgJ1xcXFwuJyk7IC8vIG1ha2Ugc3VyZSB0byBlc2NhcGUgYW55IGRvdCBcIi5cIiBmcm9tIENTUyBjbGFzcyB0byBhdm9pZCBjb25zb2xlIGVycm9yXHJcbiAgICAgICQoYFtuYW1lPSR7ZWxlbWVudENsYXNzTmFtZX1dLm1zLWRyb3BgKS5yZW1vdmUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBhbHNvIGRpc3Bvc2Ugb2YgYWxsIFN1YnNjcmlwdGlvbnNcclxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucyA9IHVuc3Vic2NyaWJlQWxsT2JzZXJ2YWJsZXModGhpcy5zdWJzY3JpcHRpb25zKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldCB2YWx1ZShzKSBvbiB0aGUgRE9NIGVsZW1lbnRcclxuICAgKi9cclxuICBzZXRWYWx1ZXModmFsdWVzOiBTZWFyY2hUZXJtIHwgU2VhcmNoVGVybVtdKSB7XHJcbiAgICBpZiAodmFsdWVzKSB7XHJcbiAgICAgIHZhbHVlcyA9IEFycmF5LmlzQXJyYXkodmFsdWVzKSA/IHZhbHVlcyA6IFt2YWx1ZXNdO1xyXG4gICAgICB0aGlzLiRmaWx0ZXJFbG0ubXVsdGlwbGVTZWxlY3QoJ3NldFNlbGVjdHMnLCB2YWx1ZXMpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy9cclxuICAvLyBwcm90ZWN0ZWQgZnVuY3Rpb25zXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gIC8qKlxyXG4gICAqIHVzZXIgbWlnaHQgd2FudCB0byBmaWx0ZXIgY2VydGFpbiBpdGVtcyBvZiB0aGUgY29sbGVjdGlvblxyXG4gICAqIEBwYXJhbSBpbnB1dENvbGxlY3Rpb25cclxuICAgKiBAcmV0dXJuIG91dHB1dENvbGxlY3Rpb24gZmlsdGVyZWQgYW5kL29yIHNvcnRlZCBjb2xsZWN0aW9uXHJcbiAgICovXHJcbiAgcHJvdGVjdGVkIGZpbHRlckNvbGxlY3Rpb24oaW5wdXRDb2xsZWN0aW9uKSB7XHJcbiAgICBsZXQgb3V0cHV0Q29sbGVjdGlvbiA9IGlucHV0Q29sbGVjdGlvbjtcclxuXHJcbiAgICAvLyB1c2VyIG1pZ2h0IHdhbnQgdG8gZmlsdGVyIGNlcnRhaW4gaXRlbXMgb2YgdGhlIGNvbGxlY3Rpb25cclxuICAgIGlmICh0aGlzLmNvbHVtbkRlZiAmJiB0aGlzLmNvbHVtbkZpbHRlciAmJiB0aGlzLmNvbHVtbkZpbHRlci5jb2xsZWN0aW9uRmlsdGVyQnkpIHtcclxuICAgICAgY29uc3QgZmlsdGVyQnkgPSB0aGlzLmNvbHVtbkZpbHRlci5jb2xsZWN0aW9uRmlsdGVyQnk7XHJcbiAgICAgIGNvbnN0IGZpbHRlckNvbGxlY3Rpb25CeSA9IHRoaXMuY29sdW1uRmlsdGVyLmNvbGxlY3Rpb25PcHRpb25zICYmIHRoaXMuY29sdW1uRmlsdGVyLmNvbGxlY3Rpb25PcHRpb25zLmZpbHRlclJlc3VsdEFmdGVyRWFjaFBhc3MgfHwgbnVsbDtcclxuICAgICAgb3V0cHV0Q29sbGVjdGlvbiA9IHRoaXMuY29sbGVjdGlvblNlcnZpY2UuZmlsdGVyQ29sbGVjdGlvbihvdXRwdXRDb2xsZWN0aW9uLCBmaWx0ZXJCeSwgZmlsdGVyQ29sbGVjdGlvbkJ5KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gb3V0cHV0Q29sbGVjdGlvbjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHVzZXIgbWlnaHQgd2FudCB0byBzb3J0IHRoZSBjb2xsZWN0aW9uIGluIGEgY2VydGFpbiB3YXlcclxuICAgKiBAcGFyYW0gaW5wdXRDb2xsZWN0aW9uXHJcbiAgICogQHJldHVybiBvdXRwdXRDb2xsZWN0aW9uIGZpbHRlcmVkIGFuZC9vciBzb3J0ZWQgY29sbGVjdGlvblxyXG4gICAqL1xyXG4gIHByb3RlY3RlZCBzb3J0Q29sbGVjdGlvbihpbnB1dENvbGxlY3Rpb24pIHtcclxuICAgIGxldCBvdXRwdXRDb2xsZWN0aW9uID0gaW5wdXRDb2xsZWN0aW9uO1xyXG5cclxuICAgIC8vIHVzZXIgbWlnaHQgd2FudCB0byBzb3J0IHRoZSBjb2xsZWN0aW9uXHJcbiAgICBpZiAodGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5GaWx0ZXIgJiYgdGhpcy5jb2x1bW5GaWx0ZXIuY29sbGVjdGlvblNvcnRCeSkge1xyXG4gICAgICBjb25zdCBzb3J0QnkgPSB0aGlzLmNvbHVtbkZpbHRlci5jb2xsZWN0aW9uU29ydEJ5O1xyXG4gICAgICBvdXRwdXRDb2xsZWN0aW9uID0gdGhpcy5jb2xsZWN0aW9uU2VydmljZS5zb3J0Q29sbGVjdGlvbih0aGlzLmNvbHVtbkRlZiwgb3V0cHV0Q29sbGVjdGlvbiwgc29ydEJ5LCB0aGlzLmVuYWJsZVRyYW5zbGF0ZUxhYmVsKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gb3V0cHV0Q29sbGVjdGlvbjtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBhc3luYyByZW5kZXJPcHRpb25zQXN5bmMoY29sbGVjdGlvbkFzeW5jOiBQcm9taXNlPGFueT4gfCBPYnNlcnZhYmxlPGFueT4gfCBTdWJqZWN0PGFueT4pIHtcclxuICAgIGxldCBhd2FpdGVkQ29sbGVjdGlvbjogYW55ID0gW107XHJcblxyXG4gICAgaWYgKGNvbGxlY3Rpb25Bc3luYykge1xyXG4gICAgICBhd2FpdGVkQ29sbGVjdGlvbiA9IGF3YWl0IGNhc3RUb1Byb21pc2UoY29sbGVjdGlvbkFzeW5jKTtcclxuICAgICAgdGhpcy5yZW5kZXJEb21FbGVtZW50RnJvbUNvbGxlY3Rpb25Bc3luYyhhd2FpdGVkQ29sbGVjdGlvbik7XHJcblxyXG4gICAgICAvLyBiZWNhdXNlIHdlIGFjY2VwdCBQcm9taXNlcyAmIEh0dHBDbGllbnQgT2JzZXJ2YWJsZSBvbmx5IGV4ZWN1dGUgb25jZVxyXG4gICAgICAvLyB3ZSB3aWxsIHJlLWNyZWF0ZSBhbiBSeEpzIFN1YmplY3Qgd2hpY2ggd2lsbCByZXBsYWNlIHRoZSBcImNvbGxlY3Rpb25Bc3luY1wiIHdoaWNoIGdvdCBleGVjdXRlZCBvbmNlIGFueXdheVxyXG4gICAgICAvLyBkb2luZyB0aGlzIHByb3ZpZGUgdGhlIHVzZXIgYSB3YXkgdG8gY2FsbCBhIFwiY29sbGVjdGlvbkFzeW5jLm5leHQoKVwiXHJcbiAgICAgIHRoaXMuY3JlYXRlQ29sbGVjdGlvbkFzeW5jU3ViamVjdCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIENyZWF0ZSBvciByZWNyZWF0ZSBhbiBPYnNlcnZhYmxlIFN1YmplY3QgYW5kIHJlYXNzaWduIGl0IHRvIHRoZSBcImNvbGxlY3Rpb25Bc3luY1wiIG9iamVjdCBzbyB1c2VyIGNhbiBjYWxsIGEgXCJjb2xsZWN0aW9uQXN5bmMubmV4dCgpXCIgb24gaXQgKi9cclxuICBwcm90ZWN0ZWQgY3JlYXRlQ29sbGVjdGlvbkFzeW5jU3ViamVjdCgpIHtcclxuICAgIGNvbnN0IG5ld0NvbGxlY3Rpb25Bc3luYyA9IG5ldyBTdWJqZWN0PGFueT4oKTtcclxuICAgIHRoaXMuY29sdW1uRmlsdGVyLmNvbGxlY3Rpb25Bc3luYyA9IG5ld0NvbGxlY3Rpb25Bc3luYztcclxuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxyXG4gICAgICBuZXdDb2xsZWN0aW9uQXN5bmMuc3Vic2NyaWJlKGNvbGxlY3Rpb24gPT4gdGhpcy5yZW5kZXJEb21FbGVtZW50RnJvbUNvbGxlY3Rpb25Bc3luYyhjb2xsZWN0aW9uKSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGVuIHVzZXIgdXNlIGEgQ29sbGVjdGlvbkFzeW5jIHdlIHdpbGwgdXNlIHRoZSByZXR1cm5lZCBjb2xsZWN0aW9uIHRvIHJlbmRlciB0aGUgZmlsdGVyIERPTSBlbGVtZW50XHJcbiAgICogYW5kIHJlaW5pdGlhbGl6ZSBmaWx0ZXIgY29sbGVjdGlvbiB3aXRoIHRoaXMgbmV3IGNvbGxlY3Rpb25cclxuICAgKi9cclxuICBwcm90ZWN0ZWQgcmVuZGVyRG9tRWxlbWVudEZyb21Db2xsZWN0aW9uQXN5bmMoY29sbGVjdGlvbikge1xyXG4gICAgaWYgKHRoaXMuY29sbGVjdGlvbk9wdGlvbnMgJiYgdGhpcy5jb2xsZWN0aW9uT3B0aW9ucy5jb2xsZWN0aW9uSW5PYmplY3RQcm9wZXJ0eSkge1xyXG4gICAgICBjb2xsZWN0aW9uID0gZ2V0RGVzY2VuZGFudFByb3BlcnR5KGNvbGxlY3Rpb24sIHRoaXMuY29sbGVjdGlvbk9wdGlvbnMuY29sbGVjdGlvbkluT2JqZWN0UHJvcGVydHkpO1xyXG4gICAgfVxyXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGNvbGxlY3Rpb24pKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignU29tZXRoaW5nIHdlbnQgd3Jvbmcgd2hpbGUgdHJ5aW5nIHRvIHB1bGwgdGhlIGNvbGxlY3Rpb24gZnJvbSB0aGUgXCJjb2xsZWN0aW9uQXN5bmNcIiBjYWxsIGluIHRoZSBTZWxlY3QgRmlsdGVyLCB0aGUgY29sbGVjdGlvbiBpcyBub3QgYSB2YWxpZCBhcnJheS4nKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBjb3B5IG92ZXIgdGhlIGFycmF5IHJlY2VpdmVkIGZyb20gdGhlIGFzeW5jIGNhbGwgdG8gdGhlIFwiY29sbGVjdGlvblwiIGFzIHRoZSBuZXcgY29sbGVjdGlvbiB0byB1c2VcclxuICAgIC8vIHRoaXMgaGFzIHRvIGJlIEJFRk9SRSB0aGUgYGNvbGxlY3Rpb25PYnNlcnZlcigpLnN1YnNjcmliZWAgdG8gYXZvaWQgZ29pbmcgaW50byBhbiBpbmZpbml0ZSBsb29wXHJcbiAgICB0aGlzLmNvbHVtbkZpbHRlci5jb2xsZWN0aW9uID0gY29sbGVjdGlvbjtcclxuXHJcbiAgICAvLyByZWNyZWF0ZSBNdWx0aXBsZSBTZWxlY3QgYWZ0ZXIgZ2V0dGluZyBhc3luYyBjb2xsZWN0aW9uXHJcbiAgICB0aGlzLnJlbmRlckRvbUVsZW1lbnQoY29sbGVjdGlvbik7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgcmVuZGVyRG9tRWxlbWVudChjb2xsZWN0aW9uKSB7XHJcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoY29sbGVjdGlvbikgJiYgdGhpcy5jb2xsZWN0aW9uT3B0aW9ucyAmJiB0aGlzLmNvbGxlY3Rpb25PcHRpb25zLmNvbGxlY3Rpb25Jbk9iamVjdFByb3BlcnR5KSB7XHJcbiAgICAgIGNvbGxlY3Rpb24gPSBnZXREZXNjZW5kYW50UHJvcGVydHkoY29sbGVjdGlvbiwgdGhpcy5jb2xsZWN0aW9uT3B0aW9ucy5jb2xsZWN0aW9uSW5PYmplY3RQcm9wZXJ0eSk7XHJcbiAgICB9XHJcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoY29sbGVjdGlvbikpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgXCJjb2xsZWN0aW9uXCIgcGFzc2VkIHRvIHRoZSBTZWxlY3QgRmlsdGVyIGlzIG5vdCBhIHZhbGlkIGFycmF5Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gdXNlciBjYW4gb3B0aW9uYWxseSBhZGQgYSBibGFuayBlbnRyeSBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoZSBjb2xsZWN0aW9uXHJcbiAgICBpZiAodGhpcy5jb2xsZWN0aW9uT3B0aW9ucyAmJiB0aGlzLmNvbGxlY3Rpb25PcHRpb25zLmFkZEJsYW5rRW50cnkgJiYgdGhpcy5faXNGaWx0ZXJGaXJzdFJlbmRlcikge1xyXG4gICAgICBjb2xsZWN0aW9uLnVuc2hpZnQodGhpcy5jcmVhdGVCbGFua0VudHJ5KCkpO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBuZXdDb2xsZWN0aW9uID0gY29sbGVjdGlvbjtcclxuXHJcbiAgICAvLyB1c2VyIG1pZ2h0IHdhbnQgdG8gZmlsdGVyIGFuZC9vciBzb3J0IGNlcnRhaW4gaXRlbXMgb2YgdGhlIGNvbGxlY3Rpb25cclxuICAgIG5ld0NvbGxlY3Rpb24gPSB0aGlzLmZpbHRlckNvbGxlY3Rpb24obmV3Q29sbGVjdGlvbik7XHJcbiAgICBuZXdDb2xsZWN0aW9uID0gdGhpcy5zb3J0Q29sbGVjdGlvbihuZXdDb2xsZWN0aW9uKTtcclxuXHJcbiAgICAvLyBzdGVwIDEsIGNyZWF0ZSBIVE1MIHN0cmluZyB0ZW1wbGF0ZVxyXG4gICAgY29uc3QgZmlsdGVyVGVtcGxhdGUgPSB0aGlzLmJ1aWxkVGVtcGxhdGVIdG1sU3RyaW5nKG5ld0NvbGxlY3Rpb24sIHRoaXMuc2VhcmNoVGVybXMpO1xyXG5cclxuICAgIC8vIHN0ZXAgMiwgY3JlYXRlIHRoZSBET00gRWxlbWVudCBvZiB0aGUgZmlsdGVyICYgcHJlLWxvYWQgc2VhcmNoIHRlcm1zXHJcbiAgICAvLyBhbHNvIHN1YnNjcmliZSB0byB0aGUgb25DbG9zZSBldmVudFxyXG4gICAgdGhpcy5jcmVhdGVEb21FbGVtZW50KGZpbHRlclRlbXBsYXRlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZSB0aGUgSFRNTCB0ZW1wbGF0ZSBhcyBhIHN0cmluZ1xyXG4gICAqL1xyXG4gIHByb3RlY3RlZCBidWlsZFRlbXBsYXRlSHRtbFN0cmluZyhvcHRpb25Db2xsZWN0aW9uOiBhbnlbXSwgc2VhcmNoVGVybXM6IFNlYXJjaFRlcm1bXSkge1xyXG4gICAgbGV0IG9wdGlvbnMgPSAnJztcclxuICAgIGNvbnN0IGZpZWxkSWQgPSB0aGlzLmNvbHVtbkRlZiAmJiB0aGlzLmNvbHVtbkRlZi5pZDtcclxuICAgIGNvbnN0IHNlcGFyYXRvckJldHdlZW5MYWJlbHMgPSB0aGlzLmNvbGxlY3Rpb25PcHRpb25zICYmIHRoaXMuY29sbGVjdGlvbk9wdGlvbnMuc2VwYXJhdG9yQmV0d2VlblRleHRMYWJlbHMgfHwgJyc7XHJcbiAgICBjb25zdCBpc1JlbmRlckh0bWxFbmFibGVkID0gdGhpcy5jb2x1bW5GaWx0ZXIgJiYgdGhpcy5jb2x1bW5GaWx0ZXIuZW5hYmxlUmVuZGVySHRtbCB8fCBmYWxzZTtcclxuICAgIGNvbnN0IHNhbml0aXplZE9wdGlvbnMgPSB0aGlzLmdyaWRPcHRpb25zICYmIHRoaXMuZ3JpZE9wdGlvbnMuc2FuaXRpemVIdG1sT3B0aW9ucyB8fCB7fTtcclxuXHJcbiAgICAvLyBjb2xsZWN0aW9uIGNvdWxkIGJlIGFuIEFycmF5IG9mIFN0cmluZ3MgT1IgT2JqZWN0c1xyXG4gICAgaWYgKG9wdGlvbkNvbGxlY3Rpb24uZXZlcnkoeCA9PiB0eXBlb2YgeCA9PT0gJ3N0cmluZycpKSB7XHJcbiAgICAgIG9wdGlvbkNvbGxlY3Rpb24uZm9yRWFjaCgob3B0aW9uOiBzdHJpbmcpID0+IHtcclxuICAgICAgICBjb25zdCBzZWxlY3RlZCA9IChzZWFyY2hUZXJtcy5maW5kSW5kZXgoKHRlcm0pID0+IHRlcm0gPT09IG9wdGlvbikgPj0gMCkgPyAnc2VsZWN0ZWQnIDogJyc7XHJcbiAgICAgICAgb3B0aW9ucyArPSBgPG9wdGlvbiB2YWx1ZT1cIiR7b3B0aW9ufVwiIGxhYmVsPVwiJHtvcHRpb259XCIgJHtzZWxlY3RlZH0+JHtvcHRpb259PC9vcHRpb24+YDtcclxuXHJcbiAgICAgICAgLy8gaWYgdGhlcmUncyBhdCBsZWFzdCAxIHNlYXJjaCB0ZXJtIGZvdW5kLCB3ZSB3aWxsIGFkZCB0aGUgXCJmaWxsZWRcIiBjbGFzcyBmb3Igc3R5bGluZyBwdXJwb3Nlc1xyXG4gICAgICAgIGlmIChzZWxlY3RlZCkge1xyXG4gICAgICAgICAgdGhpcy5pc0ZpbGxlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIGFycmF5IG9mIG9iamVjdHMgd2lsbCByZXF1aXJlIGEgbGFiZWwvdmFsdWUgcGFpciB1bmxlc3MgYSBjdXN0b21TdHJ1Y3R1cmUgaXMgcGFzc2VkXHJcbiAgICAgIG9wdGlvbkNvbGxlY3Rpb24uZm9yRWFjaCgob3B0aW9uOiBTZWxlY3RPcHRpb24pID0+IHtcclxuICAgICAgICBpZiAoIW9wdGlvbiB8fCAob3B0aW9uW3RoaXMubGFiZWxOYW1lXSA9PT0gdW5kZWZpbmVkICYmIG9wdGlvbi5sYWJlbEtleSA9PT0gdW5kZWZpbmVkKSkge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBbc2VsZWN0LWZpbHRlcl0gQSBjb2xsZWN0aW9uIHdpdGggdmFsdWUvbGFiZWwgKG9yIHZhbHVlL2xhYmVsS2V5IHdoZW4gdXNpbmcgTG9jYWxlKSBpcyByZXF1aXJlZCB0byBwb3B1bGF0ZSB0aGUgU2VsZWN0IGxpc3QsIGZvciBleGFtcGxlOjogeyBmaWx0ZXI6IG1vZGVsOiBGaWx0ZXJzLm11bHRpcGxlU2VsZWN0LCBjb2xsZWN0aW9uOiBbIHsgdmFsdWU6ICcxJywgbGFiZWw6ICdPbmUnIH0gXScpYCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGxhYmVsS2V5ID0gKG9wdGlvbi5sYWJlbEtleSB8fCBvcHRpb25bdGhpcy5sYWJlbE5hbWVdKSBhcyBzdHJpbmc7XHJcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWQgPSAoc2VhcmNoVGVybXMuZmluZEluZGV4KCh0ZXJtKSA9PiB0ZXJtID09PSBvcHRpb25bdGhpcy52YWx1ZU5hbWVdKSA+PSAwKSA/ICdzZWxlY3RlZCcgOiAnJztcclxuICAgICAgICBjb25zdCBsYWJlbFRleHQgPSAoKG9wdGlvbi5sYWJlbEtleSB8fCB0aGlzLmVuYWJsZVRyYW5zbGF0ZUxhYmVsKSAmJiBsYWJlbEtleSkgPyB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KGxhYmVsS2V5IHx8ICcgJykgOiBsYWJlbEtleTtcclxuICAgICAgICBsZXQgcHJlZml4VGV4dCA9IG9wdGlvblt0aGlzLmxhYmVsUHJlZml4TmFtZV0gfHwgJyc7XHJcbiAgICAgICAgbGV0IHN1ZmZpeFRleHQgPSBvcHRpb25bdGhpcy5sYWJlbFN1ZmZpeE5hbWVdIHx8ICcnO1xyXG4gICAgICAgIGxldCBvcHRpb25MYWJlbCA9IG9wdGlvblt0aGlzLm9wdGlvbkxhYmVsXSB8fCAnJztcclxuICAgICAgICBvcHRpb25MYWJlbCA9IG9wdGlvbkxhYmVsLnRvU3RyaW5nKCkucmVwbGFjZSgvXFxcIi9nLCAnXFwnJyk7IC8vIHJlcGxhY2UgZG91YmxlIHF1b3RlcyBieSBzaW5nbGUgcXVvdGVzIHRvIGF2b2lkIGludGVyZmVyaW5nIHdpdGggcmVndWxhciBodG1sXHJcblxyXG4gICAgICAgIC8vIGFsc28gdHJhbnNsYXRlIHByZWZpeC9zdWZmaXggaWYgZW5hYmxlVHJhbnNsYXRlTGFiZWwgaXMgdHJ1ZSBhbmQgdGV4dCBpcyBhIHN0cmluZ1xyXG4gICAgICAgIHByZWZpeFRleHQgPSAodGhpcy5lbmFibGVUcmFuc2xhdGVMYWJlbCAmJiBwcmVmaXhUZXh0ICYmIHR5cGVvZiBwcmVmaXhUZXh0ID09PSAnc3RyaW5nJykgPyB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KHByZWZpeFRleHQgfHwgJyAnKSA6IHByZWZpeFRleHQ7XHJcbiAgICAgICAgc3VmZml4VGV4dCA9ICh0aGlzLmVuYWJsZVRyYW5zbGF0ZUxhYmVsICYmIHN1ZmZpeFRleHQgJiYgdHlwZW9mIHN1ZmZpeFRleHQgPT09ICdzdHJpbmcnKSA/IHRoaXMudHJhbnNsYXRlLmluc3RhbnQoc3VmZml4VGV4dCB8fCAnICcpIDogc3VmZml4VGV4dDtcclxuICAgICAgICBvcHRpb25MYWJlbCA9ICh0aGlzLmVuYWJsZVRyYW5zbGF0ZUxhYmVsICYmIG9wdGlvbkxhYmVsICYmIHR5cGVvZiBvcHRpb25MYWJlbCA9PT0gJ3N0cmluZycpID8gdGhpcy50cmFuc2xhdGUuaW5zdGFudChvcHRpb25MYWJlbCB8fCAnICcpIDogb3B0aW9uTGFiZWw7XHJcblxyXG4gICAgICAgIC8vIGFkZCB0byBhIHRlbXAgYXJyYXkgZm9yIGpvaW5pbmcgcHVycG9zZSBhbmQgZmlsdGVyIG91dCBlbXB0eSB0ZXh0XHJcbiAgICAgICAgY29uc3QgdG1wT3B0aW9uQXJyYXkgPSBbcHJlZml4VGV4dCwgbGFiZWxUZXh0LCBzdWZmaXhUZXh0XS5maWx0ZXIoKHRleHQpID0+IHRleHQpO1xyXG4gICAgICAgIGxldCBvcHRpb25UZXh0ID0gdG1wT3B0aW9uQXJyYXkuam9pbihzZXBhcmF0b3JCZXR3ZWVuTGFiZWxzKTtcclxuXHJcbiAgICAgICAgLy8gaWYgdXNlciBzcGVjaWZpY2FsbHkgd2FudHMgdG8gcmVuZGVyIGh0bWwgdGV4dCwgaGUgbmVlZHMgdG8gb3B0LWluIGVsc2UgaXQgd2lsbCBzdHJpcHBlZCBvdXQgYnkgZGVmYXVsdFxyXG4gICAgICAgIC8vIGFsc28sIHRoZSAzcmQgcGFydHkgbGliIHdpbGwgc2FuaW5pdHplIGFueSBodG1sIGNvZGUgdW5sZXNzIGl0J3MgZW5jb2RlZCwgc28gd2UnbGwgZG8gdGhhdFxyXG4gICAgICAgIGlmIChpc1JlbmRlckh0bWxFbmFibGVkKSB7XHJcbiAgICAgICAgICAvLyBzYW5pdGl6ZSBhbnkgdW5hdXRob3JpemVkIGh0bWwgdGFncyBsaWtlIHNjcmlwdCBhbmQgb3RoZXJzXHJcbiAgICAgICAgICAvLyBmb3IgdGhlIHJlbWFpbmluZyBhbGxvd2VkIHRhZ3Mgd2UnbGwgcGVybWl0IGFsbCBhdHRyaWJ1dGVzXHJcbiAgICAgICAgICBjb25zdCBzYW5pdGl6ZWRUZXh0ID0gRE9NUHVyaWZ5LnNhbml0aXplKG9wdGlvblRleHQsIHNhbml0aXplZE9wdGlvbnMpO1xyXG4gICAgICAgICAgb3B0aW9uVGV4dCA9IGh0bWxFbmNvZGUoc2FuaXRpemVkVGV4dCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBodG1sIHRleHQgb2YgZWFjaCBzZWxlY3Qgb3B0aW9uXHJcbiAgICAgICAgb3B0aW9ucyArPSBgPG9wdGlvbiB2YWx1ZT1cIiR7b3B0aW9uW3RoaXMudmFsdWVOYW1lXX1cIiBsYWJlbD1cIiR7b3B0aW9uTGFiZWx9XCIgJHtzZWxlY3RlZH0+JHtvcHRpb25UZXh0fTwvb3B0aW9uPmA7XHJcblxyXG4gICAgICAgIC8vIGlmIHRoZXJlJ3MgYXQgbGVhc3QgMSBzZWFyY2ggdGVybSBmb3VuZCwgd2Ugd2lsbCBhZGQgdGhlIFwiZmlsbGVkXCIgY2xhc3MgZm9yIHN0eWxpbmcgcHVycG9zZXNcclxuICAgICAgICBpZiAoc2VsZWN0ZWQpIHtcclxuICAgICAgICAgIHRoaXMuaXNGaWxsZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGA8c2VsZWN0IGNsYXNzPVwibXMtZmlsdGVyIHNlYXJjaC1maWx0ZXIgZmlsdGVyLSR7ZmllbGRJZH1cIiAke3RoaXMuaXNNdWx0aXBsZVNlbGVjdCA/ICdtdWx0aXBsZT1cIm11bHRpcGxlXCInIDogJyd9PiR7b3B0aW9uc308L3NlbGVjdD5gO1xyXG4gIH1cclxuXHJcbiAgLyoqIENyZWF0ZSBhIGJsYW5rIGVudHJ5IHRoYXQgY2FuIGJlIGFkZGVkIHRvIHRoZSBjb2xsZWN0aW9uLiBJdCB3aWxsIGFsc28gcmV1c2UgdGhlIHNhbWUgY3VzdG9tU3RydWN0dXJlIGlmIG5lZWQgYmUgKi9cclxuICBwcm90ZWN0ZWQgY3JlYXRlQmxhbmtFbnRyeSgpIHtcclxuICAgIGNvbnN0IGJsYW5rRW50cnkgPSB7XHJcbiAgICAgIFt0aGlzLmxhYmVsTmFtZV06ICcnLFxyXG4gICAgICBbdGhpcy52YWx1ZU5hbWVdOiAnJ1xyXG4gICAgfTtcclxuICAgIGlmICh0aGlzLmxhYmVsUHJlZml4TmFtZSkge1xyXG4gICAgICBibGFua0VudHJ5W3RoaXMubGFiZWxQcmVmaXhOYW1lXSA9ICcnO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMubGFiZWxTdWZmaXhOYW1lKSB7XHJcbiAgICAgIGJsYW5rRW50cnlbdGhpcy5sYWJlbFN1ZmZpeE5hbWVdID0gJyc7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYmxhbmtFbnRyeTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEZyb20gdGhlIGh0bWwgdGVtcGxhdGUgc3RyaW5nLCBjcmVhdGUgYSBET00gZWxlbWVudFxyXG4gICAqIFN1YnNjcmliZSB0byB0aGUgb25DbG9zZSBldmVudCBhbmQgcnVuIHRoZSBjYWxsYmFjayB3aGVuIHRoYXQgaGFwcGVuc1xyXG4gICAqIEBwYXJhbSBmaWx0ZXJUZW1wbGF0ZVxyXG4gICAqL1xyXG4gIHByb3RlY3RlZCBjcmVhdGVEb21FbGVtZW50KGZpbHRlclRlbXBsYXRlOiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IGZpZWxkSWQgPSB0aGlzLmNvbHVtbkRlZiAmJiB0aGlzLmNvbHVtbkRlZi5pZDtcclxuXHJcbiAgICAvLyBwcm92aWRlIHRoZSBuYW1lIGF0dHJpYnV0ZSB0byB0aGUgRE9NIGVsZW1lbnQgd2hpY2ggd2lsbCBiZSBuZWVkZWQgdG8gYXV0by1hZGp1c3QgZHJvcCBwb3NpdGlvbiAoZHJvcHVwIC8gZHJvcGRvd24pXHJcbiAgICB0aGlzLmVsZW1lbnROYW1lID0gYGZpbHRlci0ke2ZpZWxkSWR9YDtcclxuICAgIHRoaXMuZGVmYXVsdE9wdGlvbnMubmFtZSA9IHRoaXMuZWxlbWVudE5hbWU7XHJcblxyXG4gICAgY29uc3QgJGhlYWRlckVsbSA9IHRoaXMuZ3JpZC5nZXRIZWFkZXJSb3dDb2x1bW4oZmllbGRJZCk7XHJcbiAgICAkKCRoZWFkZXJFbG0pLmVtcHR5KCk7XHJcblxyXG4gICAgLy8gY3JlYXRlIHRoZSBET00gZWxlbWVudCAmIGFkZCBhbiBJRCBhbmQgZmlsdGVyIGNsYXNzXHJcbiAgICB0aGlzLiRmaWx0ZXJFbG0gPSAkKGZpbHRlclRlbXBsYXRlKTtcclxuICAgIGlmICh0eXBlb2YgdGhpcy4kZmlsdGVyRWxtLm11bHRpcGxlU2VsZWN0ICE9PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihgbXVsdGlwbGUtc2VsZWN0LmpzIHdhcyBub3QgZm91bmQsIG1ha2Ugc3VyZSB0byBtb2RpZnkgeW91ciBcImFuZ3VsYXItY2xpLmpzb25cIiBmaWxlIGFuZCBpbmNsdWRlIFwiLi4vbm9kZV9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL2xpYi9tdWx0aXBsZS1zZWxlY3QvbXVsdGlwbGUtc2VsZWN0LmpzXCIgYW5kIGl0J3MgY3NzIG9yIFNBU1MgZmlsZWApO1xyXG4gICAgfVxyXG4gICAgdGhpcy4kZmlsdGVyRWxtLmF0dHIoJ2lkJywgdGhpcy5lbGVtZW50TmFtZSk7XHJcbiAgICB0aGlzLiRmaWx0ZXJFbG0uYXR0cignbmFtZScsIHRoaXMuZWxlbWVudE5hbWUpO1xyXG4gICAgdGhpcy4kZmlsdGVyRWxtLmRhdGEoJ2NvbHVtbklkJywgZmllbGRJZCk7XHJcblxyXG4gICAgLy8gaWYgdGhlcmUncyBhIHNlYXJjaCB0ZXJtLCB3ZSB3aWxsIGFkZCB0aGUgXCJmaWxsZWRcIiBjbGFzcyBmb3Igc3R5bGluZyBwdXJwb3Nlc1xyXG4gICAgaWYgKHRoaXMuaXNGaWxsZWQpIHtcclxuICAgICAgdGhpcy4kZmlsdGVyRWxtLmFkZENsYXNzKCdmaWxsZWQnKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBhcHBlbmQgdGhlIG5ldyBET00gZWxlbWVudCB0byB0aGUgaGVhZGVyIHJvd1xyXG4gICAgaWYgKHRoaXMuJGZpbHRlckVsbSAmJiB0eXBlb2YgdGhpcy4kZmlsdGVyRWxtLmFwcGVuZFRvID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgIHRoaXMuJGZpbHRlckVsbS5hcHBlbmRUbygkaGVhZGVyRWxtKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBtZXJnZSBvcHRpb25zICYgYXR0YWNoIG11bHRpU2VsZWN0XHJcbiAgICBjb25zdCBlbGVtZW50T3B0aW9uczogTXVsdGlwbGVTZWxlY3RPcHRpb24gPSB7IC4uLnRoaXMuZGVmYXVsdE9wdGlvbnMsIC4uLnRoaXMuY29sdW1uRmlsdGVyLmZpbHRlck9wdGlvbnMgfTtcclxuICAgIHRoaXMuZmlsdGVyRWxtT3B0aW9ucyA9IHsgLi4udGhpcy5kZWZhdWx0T3B0aW9ucywgLi4uZWxlbWVudE9wdGlvbnMgfTtcclxuICAgIHRoaXMuJGZpbHRlckVsbSA9IHRoaXMuJGZpbHRlckVsbS5tdWx0aXBsZVNlbGVjdCh0aGlzLmZpbHRlckVsbU9wdGlvbnMpO1xyXG4gIH1cclxufVxyXG4iXX0=