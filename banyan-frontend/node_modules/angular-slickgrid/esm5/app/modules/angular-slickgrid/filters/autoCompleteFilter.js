import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { OperatorType } from './../models/index';
import { CollectionService } from '../services/collection.service';
import { getDescendantProperty, castToPromise } from '../services/utilities';
import { Subject } from 'rxjs';
var AutoCompleteFilter = /** @class */ (function () {
    /**
     * Initialize the Filter
     */
    function AutoCompleteFilter(translate, collectionService) {
        this.translate = translate;
        this.collectionService = collectionService;
        this._clearFilterTriggered = false;
        this._shouldTriggerQuery = true;
        this.isFilled = false;
        /** The property name for values in the collection */
        this.valueName = 'label';
        this.enableTranslateLabel = false;
        this.subscriptions = [];
    }
    Object.defineProperty(AutoCompleteFilter.prototype, "collectionOptions", {
        /** Getter for the Collection Options */
        get: function () {
            return this.columnDef && this.columnDef.filter && this.columnDef.filter.collectionOptions || {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutoCompleteFilter.prototype, "columnFilter", {
        /** Getter for the Column Filter */
        get: function () {
            return this.columnDef && this.columnDef.filter || {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutoCompleteFilter.prototype, "customStructure", {
        /** Getter for the Custom Structure if exist */
        get: function () {
            return this.columnDef && this.columnDef.filter && this.columnDef.filter.customStructure;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutoCompleteFilter.prototype, "gridOptions", {
        /** Getter for the Grid Options pulled through the Grid Object */
        get: function () {
            return (this.grid && this.grid.getOptions) ? this.grid.getOptions() : {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutoCompleteFilter.prototype, "operator", {
        /** Getter of the Operator to use when doing the filter comparing */
        get: function () {
            return this.columnDef && this.columnDef.filter && this.columnDef.filter.operator || OperatorType.equal;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Initialize the filter template
     */
    AutoCompleteFilter.prototype.init = function (args) {
        if (!args) {
            throw new Error('[Angular-SlickGrid] A filter must always have an "init()" with valid arguments.');
        }
        this.grid = args.grid;
        this.callback = args.callback;
        this.columnDef = args.columnDef;
        this.searchTerms = args.searchTerms || [];
        if (!this.grid || !this.columnDef || !this.columnFilter || (!this.columnFilter.collection && !this.columnFilter.collectionAsync && !this.columnFilter.filterOptions)) {
            throw new Error("[Angular-SlickGrid] You need to pass a \"collection\" (or \"collectionAsync\") for the AutoComplete Filter to work correctly. Also each option should include a value/label pair (or value/labelKey when using Locale). For example:: { filter: model: Filters.autoComplete, collection: [{ value: true, label: 'True' }, { value: false, label: 'False'}] }");
        }
        this.enableTranslateLabel = this.columnFilter && this.columnFilter.enableTranslateLabel || false;
        this.labelName = this.customStructure && this.customStructure.label || 'label';
        this.valueName = this.customStructure && this.customStructure.value || 'value';
        // always render the DOM element, even if user passed a "collectionAsync",
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
     * Clear the filter value
     */
    AutoCompleteFilter.prototype.clear = function (shouldTriggerQuery) {
        if (shouldTriggerQuery === void 0) { shouldTriggerQuery = true; }
        if (this.$filterElm) {
            this._clearFilterTriggered = true;
            this._shouldTriggerQuery = shouldTriggerQuery;
            this.searchTerms = [];
            this.$filterElm.val('');
            this.$filterElm.trigger('keyup');
        }
    };
    /**
     * destroy the filter
     */
    AutoCompleteFilter.prototype.destroy = function () {
        if (this.$filterElm) {
            this.$filterElm.off('keyup input change').remove();
        }
    };
    /**
     * Set value(s) on the DOM element
     */
    AutoCompleteFilter.prototype.setValues = function (values) {
        if (values) {
            this.$filterElm.val(values);
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
    AutoCompleteFilter.prototype.filterCollection = function (inputCollection) {
        var outputCollection = inputCollection;
        // user might want to filter certain items of the collection
        if (this.columnFilter && this.columnFilter.collectionFilterBy) {
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
    AutoCompleteFilter.prototype.sortCollection = function (inputCollection) {
        var outputCollection = inputCollection;
        // user might want to sort the collection
        if (this.columnFilter && this.columnFilter.collectionSortBy) {
            var sortBy = this.columnFilter.collectionSortBy;
            outputCollection = this.collectionService.sortCollection(this.columnDef, outputCollection, sortBy, this.enableTranslateLabel);
        }
        return outputCollection;
    };
    AutoCompleteFilter.prototype.renderOptionsAsync = function (collectionAsync) {
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
    AutoCompleteFilter.prototype.createCollectionAsyncSubject = function () {
        var _this = this;
        var newCollectionAsync = new Subject();
        this.columnFilter.collectionAsync = newCollectionAsync;
        this.subscriptions.push(newCollectionAsync.subscribe(function (collection) { return _this.renderDomElementFromCollectionAsync(collection); }));
    };
    /**
     * When user use a CollectionAsync we will use the returned collection to render the filter DOM element
     * and reinitialize filter collection with this new collection
     */
    AutoCompleteFilter.prototype.renderDomElementFromCollectionAsync = function (collection) {
        if (this.collectionOptions && this.collectionOptions.collectionInObjectProperty) {
            collection = getDescendantProperty(collection, this.collectionOptions.collectionInObjectProperty);
        }
        if (!Array.isArray(collection)) {
            throw new Error('Something went wrong while trying to pull the collection from the "collectionAsync" call in the AutoComplete Filter, the collection is not a valid array.');
        }
        // copy over the array received from the async call to the "collection" as the new collection to use
        // this has to be BEFORE the `collectionObserver().subscribe` to avoid going into an infinite loop
        this.columnFilter.collection = collection;
        // recreate Filter DOM element after getting async collection
        this.renderDomElement(collection);
    };
    AutoCompleteFilter.prototype.renderDomElement = function (collection) {
        var _this = this;
        if (!Array.isArray(collection) && this.collectionOptions && this.collectionOptions.collectionInObjectProperty) {
            collection = getDescendantProperty(collection, this.collectionOptions.collectionInObjectProperty);
        }
        if (!Array.isArray(collection)) {
            throw new Error('The "collection" passed to the Autocomplete Filter is not a valid array');
        }
        // assign the collection to a temp variable before filtering/sorting the collection
        var newCollection = collection;
        // user might want to filter and/or sort certain items of the collection
        newCollection = this.filterCollection(newCollection);
        newCollection = this.sortCollection(newCollection);
        // filter input can only have 1 search term, so we will use the 1st array index if it exist
        var searchTerm = (Array.isArray(this.searchTerms) && this.searchTerms[0]) || '';
        // step 1, create HTML string template
        var filterTemplate = this.buildTemplateHtmlString();
        // step 2, create the DOM Element of the filter & pre-load search term
        // also subscribe to the onClose event
        this.$filterElm = this.createDomElement(filterTemplate, newCollection, searchTerm);
        // step 3, subscribe to the keyup event and run the callback when that happens
        // also add/remove "filled" class for styling purposes
        this.$filterElm.on('keyup input change', function (e) {
            var value = e && e.target && e.target.value || '';
            var enableWhiteSpaceTrim = _this.gridOptions.enableFilterTrimWhiteSpace || _this.columnFilter.enableTrimWhiteSpace;
            if (typeof value === 'string' && enableWhiteSpaceTrim) {
                value = value.trim();
            }
            if (_this._clearFilterTriggered) {
                _this.callback(e, { columnDef: _this.columnDef, clearFilterTriggered: _this._clearFilterTriggered, shouldTriggerQuery: _this._shouldTriggerQuery });
                _this.$filterElm.removeClass('filled');
            }
            else {
                if (value === '') {
                    _this.$filterElm.removeClass('filled');
                    _this.callback(e, { columnDef: _this.columnDef, operator: _this.operator, searchTerms: [value], shouldTriggerQuery: _this._shouldTriggerQuery });
                }
                else {
                    _this.$filterElm.addClass('filled');
                }
            }
            // reset both flags for next use
            _this._clearFilterTriggered = false;
            _this._shouldTriggerQuery = true;
        });
    };
    /**
     * Create the HTML template as a string
     */
    AutoCompleteFilter.prototype.buildTemplateHtmlString = function () {
        var columnId = this.columnDef && this.columnDef.id;
        var placeholder = (this.gridOptions) ? (this.gridOptions.defaultFilterPlaceholder || '') : '';
        if (this.columnFilter && this.columnFilter.placeholder) {
            placeholder = this.columnFilter.placeholder;
        }
        return "<input type=\"text\" role=\"presentation\" autocomplete=\"off\" class=\"form-control autocomplete search-filter filter-" + columnId + "\" placeholder=\"" + placeholder + "\">";
    };
    /**
     * From the html template string, create a DOM element
     * @param filterTemplate
     */
    AutoCompleteFilter.prototype.createDomElement = function (filterTemplate, collection, searchTerm) {
        var _this = this;
        var columnId = this.columnDef && this.columnDef.id;
        var $headerElm = this.grid.getHeaderRowColumn(columnId);
        $($headerElm).empty();
        // create the DOM element & add an ID and filter class
        var $filterElm = $(filterTemplate);
        var searchTermInput = searchTerm;
        // user might provide his own custom structure
        // jQuery UI autocomplete requires a label/value pair, so we must remap them when user provide different ones
        if (Array.isArray(collection) && this.customStructure) {
            collection = collection.map(function (item) {
                return { label: item[_this.labelName], value: item[_this.valueName] };
            });
        }
        // user might pass his own autocomplete options
        var autoCompleteOptions = this.columnFilter.filterOptions;
        // when user passes it's own autocomplete options
        // we still need to provide our own "select" callback implementation
        if (autoCompleteOptions) {
            autoCompleteOptions.select = function (event, ui) { return _this.onSelect(event, ui); };
            $filterElm.autocomplete(autoCompleteOptions);
        }
        else {
            if (!Array.isArray(collection)) {
                throw new Error('AutoComplete default implementation requires a "collection" or "collectionAsync" to be provided for the filter to work properly');
            }
            $filterElm.autocomplete({
                minLength: 0,
                source: collection,
                select: function (event, ui) { return _this.onSelect(event, ui); },
            });
        }
        $filterElm.val(searchTermInput);
        $filterElm.attr('id', "filter-" + columnId);
        $filterElm.data('columnId', columnId);
        // if there's a search term, we will add the "filled" class for styling purposes
        if (searchTerm) {
            $filterElm.addClass('filled');
        }
        // append the new DOM element to the header row
        if ($filterElm && typeof $filterElm.appendTo === 'function') {
            $filterElm.appendTo($headerElm);
        }
        return $filterElm;
    };
    //
    // private functions
    // ------------------
    AutoCompleteFilter.prototype.onSelect = function (event, ui) {
        if (ui && ui.item) {
            var itemLabel = typeof ui.item === 'string' ? ui.item : ui.item.label;
            var itemValue = typeof ui.item === 'string' ? ui.item : ui.item.value;
            this.$filterElm.val(itemLabel);
            this.callback(event, { columnDef: this.columnDef, operator: this.operator, searchTerms: [itemValue], shouldTriggerQuery: this._shouldTriggerQuery });
            // reset both flags for next use
            this._clearFilterTriggered = false;
            this._shouldTriggerQuery = true;
        }
        return false;
    };
    AutoCompleteFilter = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [TranslateService, CollectionService])
    ], AutoCompleteFilter);
    return AutoCompleteFilter;
}());
export { AutoCompleteFilter };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b0NvbXBsZXRlRmlsdGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9maWx0ZXJzL2F1dG9Db21wbGV0ZUZpbHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN2RCxPQUFPLEVBU0wsWUFBWSxFQUdiLE1BQU0sbUJBQW1CLENBQUM7QUFDM0IsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDbkUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLGFBQWEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzdFLE9BQU8sRUFBZ0IsT0FBTyxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBTXpEO0lBNEJFOztPQUVHO0lBQ0gsNEJBQXNCLFNBQTJCLEVBQVksaUJBQW9DO1FBQTNFLGNBQVMsR0FBVCxTQUFTLENBQWtCO1FBQVksc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQTlCekYsMEJBQXFCLEdBQUcsS0FBSyxDQUFDO1FBQzlCLHdCQUFtQixHQUFHLElBQUksQ0FBQztRQVluQyxhQUFRLEdBQUcsS0FBSyxDQUFDO1FBUWpCLHFEQUFxRDtRQUNyRCxjQUFTLEdBQUcsT0FBTyxDQUFDO1FBRXBCLHlCQUFvQixHQUFHLEtBQUssQ0FBQztRQUM3QixrQkFBYSxHQUFtQixFQUFFLENBQUM7SUFLa0UsQ0FBQztJQUd0RyxzQkFBYyxpREFBaUI7UUFEL0Isd0NBQXdDO2FBQ3hDO1lBQ0UsT0FBTyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGlCQUFpQixJQUFJLEVBQUUsQ0FBQztRQUNs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QWlCLEtBQVksRUFBRSxFQUFPO1FBQ3BDLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUU7WUFDakIsSUFBTSxTQUFTLEdBQUcsT0FBTyxFQUFFLENBQUMsSUFBSSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDeEUsSUFBTSxTQUFTLEdBQUcsT0FBTyxFQUFFLENBQUMsSUFBSSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDeEUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDL0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxXQUFXLEVBQUUsQ0FBQyxTQUFTLENBQUMsRUFBRSxrQkFBa0IsRUFBRSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxDQUFDO1lBQ3JKLGdDQUFnQztZQUNoQyxJQUFJLENBQUMscUJBQXFCLEdBQUcsS0FBSyxDQUFDO1lBQ25DLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUM7U0FDakM7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFwVlUsa0JBQWtCO1FBRDlCLFVBQVUsRUFBRTtpREFnQ3NCLGdCQUFnQixFQUErQixpQkFBaUI7T0EvQnRGLGtCQUFrQixDQXFWOUI7SUFBRCx5QkFBQztDQUFBLEFBclZELElBcVZDO1NBclZZLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcbmltcG9ydCB7XG4gIENvbGxlY3Rpb25DdXN0b21TdHJ1Y3R1cmUsXG4gIENvbGxlY3Rpb25PcHRpb24sXG4gIENvbHVtbixcbiAgQ29sdW1uRmlsdGVyLFxuICBGaWx0ZXIsXG4gIEZpbHRlckFyZ3VtZW50cyxcbiAgRmlsdGVyQ2FsbGJhY2ssXG4gIEdyaWRPcHRpb24sXG4gIE9wZXJhdG9yVHlwZSxcbiAgT3BlcmF0b3JTdHJpbmcsXG4gIFNlYXJjaFRlcm1cbn0gZnJvbSAnLi8uLi9tb2RlbHMvaW5kZXgnO1xuaW1wb3J0IHsgQ29sbGVjdGlvblNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9jb2xsZWN0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgZ2V0RGVzY2VuZGFudFByb3BlcnR5LCBjYXN0VG9Qcm9taXNlIH0gZnJvbSAnLi4vc2VydmljZXMvdXRpbGl0aWVzJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgU3ViamVjdCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG4vLyB1c2luZyBleHRlcm5hbCBub24tdHlwZWQganMgbGlicmFyaWVzXG5kZWNsYXJlIHZhciAkOiBhbnk7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBdXRvQ29tcGxldGVGaWx0ZXIgaW1wbGVtZW50cyBGaWx0ZXIge1xuICBwcml2YXRlIF9jbGVhckZpbHRlclRyaWdnZXJlZCA9IGZhbHNlO1xuICBwcml2YXRlIF9zaG91bGRUcmlnZ2VyUXVlcnkgPSB0cnVlO1xuXG4gIC8qKiBET00gRWxlbWVudCBOYW1lLCB1c2VmdWwgZm9yIGF1dG8tZGV0ZWN0aW5nIHBvc2l0aW9uaW5nIChkcm9wdXAgLyBkcm9wZG93bikgKi9cbiAgZWxlbWVudE5hbWU6IHN0cmluZztcblxuICAvKiogVGhlIEpRdWVyeSBET00gZWxlbWVudCAqL1xuICAkZmlsdGVyRWxtOiBhbnk7XG5cbiAgZ3JpZDogYW55O1xuICBzZWFyY2hUZXJtczogU2VhcmNoVGVybVtdO1xuICBjb2x1bW5EZWY6IENvbHVtbjtcbiAgY2FsbGJhY2s6IEZpbHRlckNhbGxiYWNrO1xuICBpc0ZpbGxlZCA9IGZhbHNlO1xuXG4gIC8qKiBUaGUgcHJvcGVydHkgbmFtZSBmb3IgbGFiZWxzIGluIHRoZSBjb2xsZWN0aW9uICovXG4gIGxhYmVsTmFtZTogc3RyaW5nO1xuXG4gIC8qKiBUaGUgcHJvcGVydHkgbmFtZSBmb3IgdmFsdWVzIGluIHRoZSBjb2xsZWN0aW9uICovXG4gIG9wdGlvbkxhYmVsOiBzdHJpbmc7XG5cbiAgLyoqIFRoZSBwcm9wZXJ0eSBuYW1lIGZvciB2YWx1ZXMgaW4gdGhlIGNvbGxlY3Rpb24gKi9cbiAgdmFsdWVOYW1lID0gJ2xhYmVsJztcblxuICBlbmFibGVUcmFuc2xhdGVMYWJlbCA9IGZhbHNlO1xuICBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIHRoZSBGaWx0ZXJcbiAgICovXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCB0cmFuc2xhdGU6IFRyYW5zbGF0ZVNlcnZpY2UsIHByb3RlY3RlZCBjb2xsZWN0aW9uU2VydmljZTogQ29sbGVjdGlvblNlcnZpY2UpIHsgfVxuXG4gIC8qKiBHZXR0ZXIgZm9yIHRoZSBDb2xsZWN0aW9uIE9wdGlvbnMgKi9cbiAgcHJvdGVjdGVkIGdldCBjb2xsZWN0aW9uT3B0aW9ucygpOiBDb2xsZWN0aW9uT3B0aW9uIHtcbiAgICByZXR1cm4gdGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYuZmlsdGVyICYmIHRoaXMuY29sdW1uRGVmLmZpbHRlci5jb2xsZWN0aW9uT3B0aW9ucyB8fCB7fTtcbiAgfVxuXG4gIC8qKiBHZXR0ZXIgZm9yIHRoZSBDb2x1bW4gRmlsdGVyICovXG4gIGdldCBjb2x1bW5GaWx0ZXIoKTogQ29sdW1uRmlsdGVyIHtcbiAgICByZXR1cm4gdGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYuZmlsdGVyIHx8IHt9O1xuICB9XG5cbiAgLyoqIEdldHRlciBmb3IgdGhlIEN1c3RvbSBTdHJ1Y3R1cmUgaWYgZXhpc3QgKi9cbiAgZ2V0IGN1c3RvbVN0cnVjdHVyZSgpOiBDb2xsZWN0aW9uQ3VzdG9tU3RydWN0dXJlIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYuZmlsdGVyICYmIHRoaXMuY29sdW1uRGVmLmZpbHRlci5jdXN0b21TdHJ1Y3R1cmU7XG4gIH1cblxuICAvKiogR2V0dGVyIGZvciB0aGUgR3JpZCBPcHRpb25zIHB1bGxlZCB0aHJvdWdoIHRoZSBHcmlkIE9iamVjdCAqL1xuICBnZXQgZ3JpZE9wdGlvbnMoKTogR3JpZE9wdGlvbiB7XG4gICAgcmV0dXJuICh0aGlzLmdyaWQgJiYgdGhpcy5ncmlkLmdldE9wdGlvbnMpID8gdGhpcy5ncmlkLmdldE9wdGlvbnMoKSA6IHt9O1xuICB9XG5cbiAgLyoqIEdldHRlciBvZiB0aGUgT3BlcmF0b3IgdG8gdXNlIHdoZW4gZG9pbmcgdGhlIGZpbHRlciBjb21wYXJpbmcgKi9cbiAgZ2V0IG9wZXJhdG9yKCk6IE9wZXJhdG9yVHlwZSB8IE9wZXJhdG9yU3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYuZmlsdGVyICYmIHRoaXMuY29sdW1uRGVmLmZpbHRlci5vcGVyYXRvciB8fCBPcGVyYXRvclR5cGUuZXF1YWw7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZSB0aGUgZmlsdGVyIHRlbXBsYXRlXG4gICAqL1xuICBpbml0KGFyZ3M6IEZpbHRlckFyZ3VtZW50cykge1xuICAgIGlmICghYXJncykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdbQW5ndWxhci1TbGlja0dyaWRdIEEgZmlsdGVyIG11c3QgYWx3YXlzIGhhdmUgYW4gXCJpbml0KClcIiB3aXRoIHZhbGlkIGFyZ3VtZW50cy4nKTtcbiAgICB9XG4gICAgdGhpcy5ncmlkID0gYXJncy5ncmlkO1xuICAgIHRoaXMuY2FsbGJhY2sgPSBhcmdzLmNhbGxiYWNrO1xuICAgIHRoaXMuY29sdW1uRGVmID0gYXJncy5jb2x1bW5EZWY7XG4gICAgdGhpcy5zZWFyY2hUZXJtcyA9IGFyZ3Muc2VhcmNoVGVybXMgfHwgW107XG5cbiAgICBpZiAoIXRoaXMuZ3JpZCB8fCAhdGhpcy5jb2x1bW5EZWYgfHwgIXRoaXMuY29sdW1uRmlsdGVyIHx8ICghdGhpcy5jb2x1bW5GaWx0ZXIuY29sbGVjdGlvbiAmJiAhdGhpcy5jb2x1bW5GaWx0ZXIuY29sbGVjdGlvbkFzeW5jICYmICF0aGlzLmNvbHVtbkZpbHRlci5maWx0ZXJPcHRpb25zKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBbQW5ndWxhci1TbGlja0dyaWRdIFlvdSBuZWVkIHRvIHBhc3MgYSBcImNvbGxlY3Rpb25cIiAob3IgXCJjb2xsZWN0aW9uQXN5bmNcIikgZm9yIHRoZSBBdXRvQ29tcGxldGUgRmlsdGVyIHRvIHdvcmsgY29ycmVjdGx5LiBBbHNvIGVhY2ggb3B0aW9uIHNob3VsZCBpbmNsdWRlIGEgdmFsdWUvbGFiZWwgcGFpciAob3IgdmFsdWUvbGFiZWxLZXkgd2hlbiB1c2luZyBMb2NhbGUpLiBGb3IgZXhhbXBsZTo6IHsgZmlsdGVyOiBtb2RlbDogRmlsdGVycy5hdXRvQ29tcGxldGUsIGNvbGxlY3Rpb246IFt7IHZhbHVlOiB0cnVlLCBsYWJlbDogJ1RydWUnIH0sIHsgdmFsdWU6IGZhbHNlLCBsYWJlbDogJ0ZhbHNlJ31dIH1gKTtcbiAgICB9XG5cbiAgICB0aGlzLmVuYWJsZVRyYW5zbGF0ZUxhYmVsID0gdGhpcy5jb2x1bW5GaWx0ZXIgJiYgdGhpcy5jb2x1bW5GaWx0ZXIuZW5hYmxlVHJhbnNsYXRlTGFiZWwgfHwgZmFsc2U7XG4gICAgdGhpcy5sYWJlbE5hbWUgPSB0aGlzLmN1c3RvbVN0cnVjdHVyZSAmJiB0aGlzLmN1c3RvbVN0cnVjdHVyZS5sYWJlbCB8fCAnbGFiZWwnO1xuICAgIHRoaXMudmFsdWVOYW1lID0gdGhpcy5jdXN0b21TdHJ1Y3R1cmUgJiYgdGhpcy5jdXN0b21TdHJ1Y3R1cmUudmFsdWUgfHwgJ3ZhbHVlJztcblxuICAgIC8vIGFsd2F5cyByZW5kZXIgdGhlIERPTSBlbGVtZW50LCBldmVuIGlmIHVzZXIgcGFzc2VkIGEgXCJjb2xsZWN0aW9uQXN5bmNcIixcbiAgICBjb25zdCBuZXdDb2xsZWN0aW9uID0gdGhpcy5jb2x1bW5GaWx0ZXIuY29sbGVjdGlvbiB8fCBbXTtcbiAgICB0aGlzLnJlbmRlckRvbUVsZW1lbnQobmV3Q29sbGVjdGlvbik7XG5cbiAgICAvLyBvbiBldmVyeSBGaWx0ZXIgd2hpY2ggaGF2ZSBhIFwiY29sbGVjdGlvblwiIG9yIGEgXCJjb2xsZWN0aW9uQXN5bmNcIlxuICAgIC8vIHdlIHdpbGwgYWRkIChvciByZXBsYWNlKSBhIFN1YmplY3QgdG8gdGhlIFwiY29sbGVjdGlvbkFzeW5jXCIgcHJvcGVydHkgc28gdGhhdCB1c2VyIGhhcyBwb3NzaWJpbGl0eSB0byBjaGFuZ2UgdGhlIGNvbGxlY3Rpb25cbiAgICAvLyBpZiBcImNvbGxlY3Rpb25Bc3luY1wiIGlzIGFscmVhZHkgc2V0IGJ5IHRoZSB1c2VyLCBpdCB3aWxsIHJlc29sdmUgaXQgZmlyc3QgdGhlbiBhZnRlciBpdCB3aWxsIHJlcGxhY2UgaXQgd2l0aCBhIFN1YmplY3RcbiAgICBjb25zdCBjb2xsZWN0aW9uQXN5bmMgPSB0aGlzLmNvbHVtbkZpbHRlciAmJiB0aGlzLmNvbHVtbkZpbHRlci5jb2xsZWN0aW9uQXN5bmM7XG4gICAgaWYgKGNvbGxlY3Rpb25Bc3luYykge1xuICAgICAgdGhpcy5yZW5kZXJPcHRpb25zQXN5bmMoY29sbGVjdGlvbkFzeW5jKTsgLy8gY3JlYXRlIFN1YmplY3QgYWZ0ZXIgcmVzb2x2ZSAoY3JlYXRlQ29sbGVjdGlvbkFzeW5jU3ViamVjdClcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2xlYXIgdGhlIGZpbHRlciB2YWx1ZVxuICAgKi9cbiAgY2xlYXIoc2hvdWxkVHJpZ2dlclF1ZXJ5ID0gdHJ1ZSkge1xuICAgIGlmICh0aGlzLiRmaWx0ZXJFbG0pIHtcbiAgICAgIHRoaXMuX2NsZWFyRmlsdGVyVHJpZ2dlcmVkID0gdHJ1ZTtcbiAgICAgIHRoaXMuX3Nob3VsZFRyaWdnZXJRdWVyeSA9IHNob3VsZFRyaWdnZXJRdWVyeTtcbiAgICAgIHRoaXMuc2VhcmNoVGVybXMgPSBbXTtcbiAgICAgIHRoaXMuJGZpbHRlckVsbS52YWwoJycpO1xuICAgICAgdGhpcy4kZmlsdGVyRWxtLnRyaWdnZXIoJ2tleXVwJyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIGRlc3Ryb3kgdGhlIGZpbHRlclxuICAgKi9cbiAgZGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy4kZmlsdGVyRWxtKSB7XG4gICAgICB0aGlzLiRmaWx0ZXJFbG0ub2ZmKCdrZXl1cCBpbnB1dCBjaGFuZ2UnKS5yZW1vdmUoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2V0IHZhbHVlKHMpIG9uIHRoZSBET00gZWxlbWVudFxuICAgKi9cbiAgc2V0VmFsdWVzKHZhbHVlczogU2VhcmNoVGVybSB8IFNlYXJjaFRlcm1bXSkge1xuICAgIGlmICh2YWx1ZXMpIHtcbiAgICAgIHRoaXMuJGZpbHRlckVsbS52YWwodmFsdWVzKTtcbiAgICB9XG4gIH1cblxuICAvL1xuICAvLyBwcm90ZWN0ZWQgZnVuY3Rpb25zXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gIC8qKlxuICAgKiB1c2VyIG1pZ2h0IHdhbnQgdG8gZmlsdGVyIGNlcnRhaW4gaXRlbXMgb2YgdGhlIGNvbGxlY3Rpb25cbiAgICogQHBhcmFtIGlucHV0Q29sbGVjdGlvblxuICAgKiBAcmV0dXJuIG91dHB1dENvbGxlY3Rpb24gZmlsdGVyZWQgYW5kL29yIHNvcnRlZCBjb2xsZWN0aW9uXG4gICAqL1xuICBwcm90ZWN0ZWQgZmlsdGVyQ29sbGVjdGlvbihpbnB1dENvbGxlY3Rpb246IGFueVtdKTogYW55W10ge1xuICAgIGxldCBvdXRwdXRDb2xsZWN0aW9uID0gaW5wdXRDb2xsZWN0aW9uO1xuXG4gICAgLy8gdXNlciBtaWdodCB3YW50IHRvIGZpbHRlciBjZXJ0YWluIGl0ZW1zIG9mIHRoZSBjb2xsZWN0aW9uXG4gICAgaWYgKHRoaXMuY29sdW1uRmlsdGVyICYmIHRoaXMuY29sdW1uRmlsdGVyLmNvbGxlY3Rpb25GaWx0ZXJCeSkge1xuICAgICAgY29uc3QgZmlsdGVyQnkgPSB0aGlzLmNvbHVtbkZpbHRlci5jb2xsZWN0aW9uRmlsdGVyQnk7XG4gICAgICBjb25zdCBmaWx0ZXJDb2xsZWN0aW9uQnkgPSB0aGlzLmNvbHVtbkZpbHRlci5jb2xsZWN0aW9uT3B0aW9ucyAmJiB0aGlzLmNvbHVtbkZpbHRlci5jb2xsZWN0aW9uT3B0aW9ucy5maWx0ZXJSZXN1bHRBZnRlckVhY2hQYXNzIHx8IG51bGw7XG4gICAgICBvdXRwdXRDb2xsZWN0aW9uID0gdGhpcy5jb2xsZWN0aW9uU2VydmljZS5maWx0ZXJDb2xsZWN0aW9uKG91dHB1dENvbGxlY3Rpb24sIGZpbHRlckJ5LCBmaWx0ZXJDb2xsZWN0aW9uQnkpO1xuICAgIH1cblxuICAgIHJldHVybiBvdXRwdXRDb2xsZWN0aW9uO1xuICB9XG5cbiAgLyoqXG4gICAqIHVzZXIgbWlnaHQgd2FudCB0byBzb3J0IHRoZSBjb2xsZWN0aW9uIGluIGEgY2VydGFpbiB3YXlcbiAgICogQHBhcmFtIGlucHV0Q29sbGVjdGlvblxuICAgKiBAcmV0dXJuIG91dHB1dENvbGxlY3Rpb24gZmlsdGVyZWQgYW5kL29yIHNvcnRlZCBjb2xsZWN0aW9uXG4gICAqL1xuICBwcm90ZWN0ZWQgc29ydENvbGxlY3Rpb24oaW5wdXRDb2xsZWN0aW9uOiBhbnlbXSk6IGFueVtdIHtcbiAgICBsZXQgb3V0cHV0Q29sbGVjdGlvbiA9IGlucHV0Q29sbGVjdGlvbjtcblxuICAgIC8vIHVzZXIgbWlnaHQgd2FudCB0byBzb3J0IHRoZSBjb2xsZWN0aW9uXG4gICAgaWYgKHRoaXMuY29sdW1uRmlsdGVyICYmIHRoaXMuY29sdW1uRmlsdGVyLmNvbGxlY3Rpb25Tb3J0QnkpIHtcbiAgICAgIGNvbnN0IHNvcnRCeSA9IHRoaXMuY29sdW1uRmlsdGVyLmNvbGxlY3Rpb25Tb3J0Qnk7XG4gICAgICBvdXRwdXRDb2xsZWN0aW9uID0gdGhpcy5jb2xsZWN0aW9uU2VydmljZS5zb3J0Q29sbGVjdGlvbih0aGlzLmNvbHVtbkRlZiwgb3V0cHV0Q29sbGVjdGlvbiwgc29ydEJ5LCB0aGlzLmVuYWJsZVRyYW5zbGF0ZUxhYmVsKTtcbiAgICB9XG5cbiAgICByZXR1cm4gb3V0cHV0Q29sbGVjdGlvbjtcbiAgfVxuXG4gIHByb3RlY3RlZCBhc3luYyByZW5kZXJPcHRpb25zQXN5bmMoY29sbGVjdGlvbkFzeW5jOiBQcm9taXNlPGFueT4gfCBPYnNlcnZhYmxlPGFueT4gfCBTdWJqZWN0PGFueT4pIHtcbiAgICBsZXQgYXdhaXRlZENvbGxlY3Rpb246IGFueSA9IFtdO1xuXG4gICAgaWYgKGNvbGxlY3Rpb25Bc3luYykge1xuICAgICAgYXdhaXRlZENvbGxlY3Rpb24gPSBhd2FpdCBjYXN0VG9Qcm9taXNlKGNvbGxlY3Rpb25Bc3luYyk7XG4gICAgICB0aGlzLnJlbmRlckRvbUVsZW1lbnRGcm9tQ29sbGVjdGlvbkFzeW5jKGF3YWl0ZWRDb2xsZWN0aW9uKTtcblxuICAgICAgLy8gYmVjYXVzZSB3ZSBhY2NlcHQgUHJvbWlzZXMgJiBIdHRwQ2xpZW50IE9ic2VydmFibGUgb25seSBleGVjdXRlIG9uY2VcbiAgICAgIC8vIHdlIHdpbGwgcmUtY3JlYXRlIGFuIFJ4SnMgU3ViamVjdCB3aGljaCB3aWxsIHJlcGxhY2UgdGhlIFwiY29sbGVjdGlvbkFzeW5jXCIgd2hpY2ggZ290IGV4ZWN1dGVkIG9uY2UgYW55d2F5XG4gICAgICAvLyBkb2luZyB0aGlzIHByb3ZpZGUgdGhlIHVzZXIgYSB3YXkgdG8gY2FsbCBhIFwiY29sbGVjdGlvbkFzeW5jLm5leHQoKVwiXG4gICAgICB0aGlzLmNyZWF0ZUNvbGxlY3Rpb25Bc3luY1N1YmplY3QoKTtcbiAgICB9XG4gIH1cblxuICAvKiogQ3JlYXRlIG9yIHJlY3JlYXRlIGFuIE9ic2VydmFibGUgU3ViamVjdCBhbmQgcmVhc3NpZ24gaXQgdG8gdGhlIFwiY29sbGVjdGlvbkFzeW5jXCIgb2JqZWN0IHNvIHVzZXIgY2FuIGNhbGwgYSBcImNvbGxlY3Rpb25Bc3luYy5uZXh0KClcIiBvbiBpdCAqL1xuICBwcm90ZWN0ZWQgY3JlYXRlQ29sbGVjdGlvbkFzeW5jU3ViamVjdCgpIHtcbiAgICBjb25zdCBuZXdDb2xsZWN0aW9uQXN5bmMgPSBuZXcgU3ViamVjdDxhbnk+KCk7XG4gICAgdGhpcy5jb2x1bW5GaWx0ZXIuY29sbGVjdGlvbkFzeW5jID0gbmV3Q29sbGVjdGlvbkFzeW5jO1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKFxuICAgICAgbmV3Q29sbGVjdGlvbkFzeW5jLnN1YnNjcmliZShjb2xsZWN0aW9uID0+IHRoaXMucmVuZGVyRG9tRWxlbWVudEZyb21Db2xsZWN0aW9uQXN5bmMoY29sbGVjdGlvbikpXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBXaGVuIHVzZXIgdXNlIGEgQ29sbGVjdGlvbkFzeW5jIHdlIHdpbGwgdXNlIHRoZSByZXR1cm5lZCBjb2xsZWN0aW9uIHRvIHJlbmRlciB0aGUgZmlsdGVyIERPTSBlbGVtZW50XG4gICAqIGFuZCByZWluaXRpYWxpemUgZmlsdGVyIGNvbGxlY3Rpb24gd2l0aCB0aGlzIG5ldyBjb2xsZWN0aW9uXG4gICAqL1xuICBwcm90ZWN0ZWQgcmVuZGVyRG9tRWxlbWVudEZyb21Db2xsZWN0aW9uQXN5bmMoY29sbGVjdGlvbikge1xuICAgIGlmICh0aGlzLmNvbGxlY3Rpb25PcHRpb25zICYmIHRoaXMuY29sbGVjdGlvbk9wdGlvbnMuY29sbGVjdGlvbkluT2JqZWN0UHJvcGVydHkpIHtcbiAgICAgIGNvbGxlY3Rpb24gPSBnZXREZXNjZW5kYW50UHJvcGVydHkoY29sbGVjdGlvbiwgdGhpcy5jb2xsZWN0aW9uT3B0aW9ucy5jb2xsZWN0aW9uSW5PYmplY3RQcm9wZXJ0eSk7XG4gICAgfVxuICAgIGlmICghQXJyYXkuaXNBcnJheShjb2xsZWN0aW9uKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdTb21ldGhpbmcgd2VudCB3cm9uZyB3aGlsZSB0cnlpbmcgdG8gcHVsbCB0aGUgY29sbGVjdGlvbiBmcm9tIHRoZSBcImNvbGxlY3Rpb25Bc3luY1wiIGNhbGwgaW4gdGhlIEF1dG9Db21wbGV0ZSBGaWx0ZXIsIHRoZSBjb2xsZWN0aW9uIGlzIG5vdCBhIHZhbGlkIGFycmF5LicpO1xuICAgIH1cblxuICAgIC8vIGNvcHkgb3ZlciB0aGUgYXJyYXkgcmVjZWl2ZWQgZnJvbSB0aGUgYXN5bmMgY2FsbCB0byB0aGUgXCJjb2xsZWN0aW9uXCIgYXMgdGhlIG5ldyBjb2xsZWN0aW9uIHRvIHVzZVxuICAgIC8vIHRoaXMgaGFzIHRvIGJlIEJFRk9SRSB0aGUgYGNvbGxlY3Rpb25PYnNlcnZlcigpLnN1YnNjcmliZWAgdG8gYXZvaWQgZ29pbmcgaW50byBhbiBpbmZpbml0ZSBsb29wXG4gICAgdGhpcy5jb2x1bW5GaWx0ZXIuY29sbGVjdGlvbiA9IGNvbGxlY3Rpb247XG5cbiAgICAvLyByZWNyZWF0ZSBGaWx0ZXIgRE9NIGVsZW1lbnQgYWZ0ZXIgZ2V0dGluZyBhc3luYyBjb2xsZWN0aW9uXG4gICAgdGhpcy5yZW5kZXJEb21FbGVtZW50KGNvbGxlY3Rpb24pO1xuICB9XG5cbiAgcHJvdGVjdGVkIHJlbmRlckRvbUVsZW1lbnQoY29sbGVjdGlvbjogYW55W10pIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoY29sbGVjdGlvbikgJiYgdGhpcy5jb2xsZWN0aW9uT3B0aW9ucyAmJiB0aGlzLmNvbGxlY3Rpb25PcHRpb25zLmNvbGxlY3Rpb25Jbk9iamVjdFByb3BlcnR5KSB7XG4gICAgICBjb2xsZWN0aW9uID0gZ2V0RGVzY2VuZGFudFByb3BlcnR5KGNvbGxlY3Rpb24sIHRoaXMuY29sbGVjdGlvbk9wdGlvbnMuY29sbGVjdGlvbkluT2JqZWN0UHJvcGVydHkpO1xuICAgIH1cbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoY29sbGVjdGlvbikpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIFwiY29sbGVjdGlvblwiIHBhc3NlZCB0byB0aGUgQXV0b2NvbXBsZXRlIEZpbHRlciBpcyBub3QgYSB2YWxpZCBhcnJheScpO1xuICAgIH1cblxuICAgIC8vIGFzc2lnbiB0aGUgY29sbGVjdGlvbiB0byBhIHRlbXAgdmFyaWFibGUgYmVmb3JlIGZpbHRlcmluZy9zb3J0aW5nIHRoZSBjb2xsZWN0aW9uXG4gICAgbGV0IG5ld0NvbGxlY3Rpb24gPSBjb2xsZWN0aW9uO1xuXG4gICAgLy8gdXNlciBtaWdodCB3YW50IHRvIGZpbHRlciBhbmQvb3Igc29ydCBjZXJ0YWluIGl0ZW1zIG9mIHRoZSBjb2xsZWN0aW9uXG4gICAgbmV3Q29sbGVjdGlvbiA9IHRoaXMuZmlsdGVyQ29sbGVjdGlvbihuZXdDb2xsZWN0aW9uKTtcbiAgICBuZXdDb2xsZWN0aW9uID0gdGhpcy5zb3J0Q29sbGVjdGlvbihuZXdDb2xsZWN0aW9uKTtcblxuICAgIC8vIGZpbHRlciBpbnB1dCBjYW4gb25seSBoYXZlIDEgc2VhcmNoIHRlcm0sIHNvIHdlIHdpbGwgdXNlIHRoZSAxc3QgYXJyYXkgaW5kZXggaWYgaXQgZXhpc3RcbiAgICBjb25zdCBzZWFyY2hUZXJtID0gKEFycmF5LmlzQXJyYXkodGhpcy5zZWFyY2hUZXJtcykgJiYgdGhpcy5zZWFyY2hUZXJtc1swXSkgfHwgJyc7XG5cbiAgICAvLyBzdGVwIDEsIGNyZWF0ZSBIVE1MIHN0cmluZyB0ZW1wbGF0ZVxuICAgIGNvbnN0IGZpbHRlclRlbXBsYXRlID0gdGhpcy5idWlsZFRlbXBsYXRlSHRtbFN0cmluZygpO1xuXG4gICAgLy8gc3RlcCAyLCBjcmVhdGUgdGhlIERPTSBFbGVtZW50IG9mIHRoZSBmaWx0ZXIgJiBwcmUtbG9hZCBzZWFyY2ggdGVybVxuICAgIC8vIGFsc28gc3Vic2NyaWJlIHRvIHRoZSBvbkNsb3NlIGV2ZW50XG4gICAgdGhpcy4kZmlsdGVyRWxtID0gdGhpcy5jcmVhdGVEb21FbGVtZW50KGZpbHRlclRlbXBsYXRlLCBuZXdDb2xsZWN0aW9uLCBzZWFyY2hUZXJtKTtcblxuICAgIC8vIHN0ZXAgMywgc3Vic2NyaWJlIHRvIHRoZSBrZXl1cCBldmVudCBhbmQgcnVuIHRoZSBjYWxsYmFjayB3aGVuIHRoYXQgaGFwcGVuc1xuICAgIC8vIGFsc28gYWRkL3JlbW92ZSBcImZpbGxlZFwiIGNsYXNzIGZvciBzdHlsaW5nIHB1cnBvc2VzXG4gICAgdGhpcy4kZmlsdGVyRWxtLm9uKCdrZXl1cCBpbnB1dCBjaGFuZ2UnLCAoZTogYW55KSA9PiB7XG4gICAgICBsZXQgdmFsdWUgPSBlICYmIGUudGFyZ2V0ICYmIGUudGFyZ2V0LnZhbHVlIHx8ICcnO1xuICAgICAgY29uc3QgZW5hYmxlV2hpdGVTcGFjZVRyaW0gPSB0aGlzLmdyaWRPcHRpb25zLmVuYWJsZUZpbHRlclRyaW1XaGl0ZVNwYWNlIHx8IHRoaXMuY29sdW1uRmlsdGVyLmVuYWJsZVRyaW1XaGl0ZVNwYWNlO1xuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgJiYgZW5hYmxlV2hpdGVTcGFjZVRyaW0pIHtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZS50cmltKCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLl9jbGVhckZpbHRlclRyaWdnZXJlZCkge1xuICAgICAgICB0aGlzLmNhbGxiYWNrKGUsIHsgY29sdW1uRGVmOiB0aGlzLmNvbHVtbkRlZiwgY2xlYXJGaWx0ZXJUcmlnZ2VyZWQ6IHRoaXMuX2NsZWFyRmlsdGVyVHJpZ2dlcmVkLCBzaG91bGRUcmlnZ2VyUXVlcnk6IHRoaXMuX3Nob3VsZFRyaWdnZXJRdWVyeSB9KTtcbiAgICAgICAgdGhpcy4kZmlsdGVyRWxtLnJlbW92ZUNsYXNzKCdmaWxsZWQnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gJycpIHtcbiAgICAgICAgICB0aGlzLiRmaWx0ZXJFbG0ucmVtb3ZlQ2xhc3MoJ2ZpbGxlZCcpO1xuICAgICAgICAgIHRoaXMuY2FsbGJhY2soZSwgeyBjb2x1bW5EZWY6IHRoaXMuY29sdW1uRGVmLCBvcGVyYXRvcjogdGhpcy5vcGVyYXRvciwgc2VhcmNoVGVybXM6IFt2YWx1ZV0sIHNob3VsZFRyaWdnZXJRdWVyeTogdGhpcy5fc2hvdWxkVHJpZ2dlclF1ZXJ5IH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuJGZpbHRlckVsbS5hZGRDbGFzcygnZmlsbGVkJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vIHJlc2V0IGJvdGggZmxhZ3MgZm9yIG5leHQgdXNlXG4gICAgICB0aGlzLl9jbGVhckZpbHRlclRyaWdnZXJlZCA9IGZhbHNlO1xuICAgICAgdGhpcy5fc2hvdWxkVHJpZ2dlclF1ZXJ5ID0gdHJ1ZTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgdGhlIEhUTUwgdGVtcGxhdGUgYXMgYSBzdHJpbmdcbiAgICovXG4gIHByaXZhdGUgYnVpbGRUZW1wbGF0ZUh0bWxTdHJpbmcoKSB7XG4gICAgY29uc3QgY29sdW1uSWQgPSB0aGlzLmNvbHVtbkRlZiAmJiB0aGlzLmNvbHVtbkRlZi5pZDtcbiAgICBsZXQgcGxhY2Vob2xkZXIgPSAodGhpcy5ncmlkT3B0aW9ucykgPyAodGhpcy5ncmlkT3B0aW9ucy5kZWZhdWx0RmlsdGVyUGxhY2Vob2xkZXIgfHwgJycpIDogJyc7XG4gICAgaWYgKHRoaXMuY29sdW1uRmlsdGVyICYmIHRoaXMuY29sdW1uRmlsdGVyLnBsYWNlaG9sZGVyKSB7XG4gICAgICBwbGFjZWhvbGRlciA9IHRoaXMuY29sdW1uRmlsdGVyLnBsYWNlaG9sZGVyO1xuICAgIH1cbiAgICByZXR1cm4gYDxpbnB1dCB0eXBlPVwidGV4dFwiIHJvbGU9XCJwcmVzZW50YXRpb25cIiBhdXRvY29tcGxldGU9XCJvZmZcIiBjbGFzcz1cImZvcm0tY29udHJvbCBhdXRvY29tcGxldGUgc2VhcmNoLWZpbHRlciBmaWx0ZXItJHtjb2x1bW5JZH1cIiBwbGFjZWhvbGRlcj1cIiR7cGxhY2Vob2xkZXJ9XCI+YDtcbiAgfVxuXG4gIC8qKlxuICAgKiBGcm9tIHRoZSBodG1sIHRlbXBsYXRlIHN0cmluZywgY3JlYXRlIGEgRE9NIGVsZW1lbnRcbiAgICogQHBhcmFtIGZpbHRlclRlbXBsYXRlXG4gICAqL1xuICBwcml2YXRlIGNyZWF0ZURvbUVsZW1lbnQoZmlsdGVyVGVtcGxhdGU6IHN0cmluZywgY29sbGVjdGlvbjogYW55W10sIHNlYXJjaFRlcm0/OiBTZWFyY2hUZXJtKSB7XG4gICAgY29uc3QgY29sdW1uSWQgPSB0aGlzLmNvbHVtbkRlZiAmJiB0aGlzLmNvbHVtbkRlZi5pZDtcbiAgICBjb25zdCAkaGVhZGVyRWxtID0gdGhpcy5ncmlkLmdldEhlYWRlclJvd0NvbHVtbihjb2x1bW5JZCk7XG4gICAgJCgkaGVhZGVyRWxtKS5lbXB0eSgpO1xuXG4gICAgLy8gY3JlYXRlIHRoZSBET00gZWxlbWVudCAmIGFkZCBhbiBJRCBhbmQgZmlsdGVyIGNsYXNzXG4gICAgY29uc3QgJGZpbHRlckVsbSA9ICQoZmlsdGVyVGVtcGxhdGUpIGFzIGFueTtcbiAgICBjb25zdCBzZWFyY2hUZXJtSW5wdXQgPSBzZWFyY2hUZXJtIGFzIHN0cmluZztcblxuICAgIC8vIHVzZXIgbWlnaHQgcHJvdmlkZSBoaXMgb3duIGN1c3RvbSBzdHJ1Y3R1cmVcbiAgICAvLyBqUXVlcnkgVUkgYXV0b2NvbXBsZXRlIHJlcXVpcmVzIGEgbGFiZWwvdmFsdWUgcGFpciwgc28gd2UgbXVzdCByZW1hcCB0aGVtIHdoZW4gdXNlciBwcm92aWRlIGRpZmZlcmVudCBvbmVzXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoY29sbGVjdGlvbikgJiYgdGhpcy5jdXN0b21TdHJ1Y3R1cmUpIHtcbiAgICAgIGNvbGxlY3Rpb24gPSBjb2xsZWN0aW9uLm1hcCgoaXRlbSkgPT4ge1xuICAgICAgICByZXR1cm4geyBsYWJlbDogaXRlbVt0aGlzLmxhYmVsTmFtZV0sIHZhbHVlOiBpdGVtW3RoaXMudmFsdWVOYW1lXSB9O1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gdXNlciBtaWdodCBwYXNzIGhpcyBvd24gYXV0b2NvbXBsZXRlIG9wdGlvbnNcbiAgICBjb25zdCBhdXRvQ29tcGxldGVPcHRpb25zID0gdGhpcy5jb2x1bW5GaWx0ZXIuZmlsdGVyT3B0aW9ucztcblxuICAgIC8vIHdoZW4gdXNlciBwYXNzZXMgaXQncyBvd24gYXV0b2NvbXBsZXRlIG9wdGlvbnNcbiAgICAvLyB3ZSBzdGlsbCBuZWVkIHRvIHByb3ZpZGUgb3VyIG93biBcInNlbGVjdFwiIGNhbGxiYWNrIGltcGxlbWVudGF0aW9uXG4gICAgaWYgKGF1dG9Db21wbGV0ZU9wdGlvbnMpIHtcbiAgICAgIGF1dG9Db21wbGV0ZU9wdGlvbnMuc2VsZWN0ID0gKGV2ZW50OiBFdmVudCwgdWk6IGFueSkgPT4gdGhpcy5vblNlbGVjdChldmVudCwgdWkpO1xuICAgICAgJGZpbHRlckVsbS5hdXRvY29tcGxldGUoYXV0b0NvbXBsZXRlT3B0aW9ucyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICghQXJyYXkuaXNBcnJheShjb2xsZWN0aW9uKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0F1dG9Db21wbGV0ZSBkZWZhdWx0IGltcGxlbWVudGF0aW9uIHJlcXVpcmVzIGEgXCJjb2xsZWN0aW9uXCIgb3IgXCJjb2xsZWN0aW9uQXN5bmNcIiB0byBiZSBwcm92aWRlZCBmb3IgdGhlIGZpbHRlciB0byB3b3JrIHByb3Blcmx5Jyk7XG4gICAgICB9XG5cbiAgICAgICRmaWx0ZXJFbG0uYXV0b2NvbXBsZXRlKHtcbiAgICAgICAgbWluTGVuZ3RoOiAwLFxuICAgICAgICBzb3VyY2U6IGNvbGxlY3Rpb24sXG4gICAgICAgIHNlbGVjdDogKGV2ZW50OiBFdmVudCwgdWk6IGFueSkgPT4gdGhpcy5vblNlbGVjdChldmVudCwgdWkpLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgJGZpbHRlckVsbS52YWwoc2VhcmNoVGVybUlucHV0KTtcbiAgICAkZmlsdGVyRWxtLmF0dHIoJ2lkJywgYGZpbHRlci0ke2NvbHVtbklkfWApO1xuICAgICRmaWx0ZXJFbG0uZGF0YSgnY29sdW1uSWQnLCBjb2x1bW5JZCk7XG5cbiAgICAvLyBpZiB0aGVyZSdzIGEgc2VhcmNoIHRlcm0sIHdlIHdpbGwgYWRkIHRoZSBcImZpbGxlZFwiIGNsYXNzIGZvciBzdHlsaW5nIHB1cnBvc2VzXG4gICAgaWYgKHNlYXJjaFRlcm0pIHtcbiAgICAgICRmaWx0ZXJFbG0uYWRkQ2xhc3MoJ2ZpbGxlZCcpO1xuICAgIH1cblxuICAgIC8vIGFwcGVuZCB0aGUgbmV3IERPTSBlbGVtZW50IHRvIHRoZSBoZWFkZXIgcm93XG4gICAgaWYgKCRmaWx0ZXJFbG0gJiYgdHlwZW9mICRmaWx0ZXJFbG0uYXBwZW5kVG8gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICRmaWx0ZXJFbG0uYXBwZW5kVG8oJGhlYWRlckVsbSk7XG4gICAgfVxuXG4gICAgcmV0dXJuICRmaWx0ZXJFbG07XG4gIH1cblxuICAvL1xuICAvLyBwcml2YXRlIGZ1bmN0aW9uc1xuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS1cblxuICBwcml2YXRlIG9uU2VsZWN0KGV2ZW50OiBFdmVudCwgdWk6IGFueSkge1xuICAgIGlmICh1aSAmJiB1aS5pdGVtKSB7XG4gICAgICBjb25zdCBpdGVtTGFiZWwgPSB0eXBlb2YgdWkuaXRlbSA9PT0gJ3N0cmluZycgPyB1aS5pdGVtIDogdWkuaXRlbS5sYWJlbDtcbiAgICAgIGNvbnN0IGl0ZW1WYWx1ZSA9IHR5cGVvZiB1aS5pdGVtID09PSAnc3RyaW5nJyA/IHVpLml0ZW0gOiB1aS5pdGVtLnZhbHVlO1xuICAgICAgdGhpcy4kZmlsdGVyRWxtLnZhbChpdGVtTGFiZWwpO1xuICAgICAgdGhpcy5jYWxsYmFjayhldmVudCwgeyBjb2x1bW5EZWY6IHRoaXMuY29sdW1uRGVmLCBvcGVyYXRvcjogdGhpcy5vcGVyYXRvciwgc2VhcmNoVGVybXM6IFtpdGVtVmFsdWVdLCBzaG91bGRUcmlnZ2VyUXVlcnk6IHRoaXMuX3Nob3VsZFRyaWdnZXJRdWVyeSB9KTtcbiAgICAgIC8vIHJlc2V0IGJvdGggZmxhZ3MgZm9yIG5leHQgdXNlXG4gICAgICB0aGlzLl9jbGVhckZpbHRlclRyaWdnZXJlZCA9IGZhbHNlO1xuICAgICAgdGhpcy5fc2hvdWxkVHJpZ2dlclF1ZXJ5ID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG4iXX0=