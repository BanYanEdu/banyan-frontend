import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { OperatorType } from './../models/index';
import { CollectionService } from '../services/collection.service';
import { getDescendantProperty, castToPromise } from '../services/utilities';
import { Subject } from 'rxjs';
let AutoCompleteFilter = class AutoCompleteFilter {
    /**
     * Initialize the Filter
     */
    constructor(translate, collectionService) {
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
    /** Getter for the Collection Options */
    get collectionOptions() {
        return this.columnDef && this.columnDef.filter && this.columnDef.filter.collectionOptions || {};
    }
    /** Getter for the Column Filter */
    get columnFilter() {
        return this.columnDef && this.columnDef.filter || {};
    }
    /** Getter for the Custom Structure if exist */
    get customStructure() {
        return this.columnDef && this.columnDef.filter && this.columnDef.filter.customStructure;
    }
    /** Getter for the Grid Options pulled through the Grid Object */
    get gridOptions() {
        return (this.grid && this.grid.getOptions) ? this.grid.getOptions() : {};
    }
    /** Getter of the Operator to use when doing the filter comparing */
    get operator() {
        return this.columnDef && this.columnDef.filter && this.columnDef.filter.operator || OperatorType.equal;
    }
    /**
     * Initialize the filter template
     */
    init(args) {
        if (!args) {
            throw new Error('[Angular-SlickGrid] A filter must always have an "init()" with valid arguments.');
        }
        this.grid = args.grid;
        this.callback = args.callback;
        this.columnDef = args.columnDef;
        this.searchTerms = args.searchTerms || [];
        if (!this.grid || !this.columnDef || !this.columnFilter || (!this.columnFilter.collection && !this.columnFilter.collectionAsync && !this.columnFilter.filterOptions)) {
            throw new Error(`[Angular-SlickGrid] You need to pass a "collection" (or "collectionAsync") for the AutoComplete Filter to work correctly. Also each option should include a value/label pair (or value/labelKey when using Locale). For example:: { filter: model: Filters.autoComplete, collection: [{ value: true, label: 'True' }, { value: false, label: 'False'}] }`);
        }
        this.enableTranslateLabel = this.columnFilter && this.columnFilter.enableTranslateLabel || false;
        this.labelName = this.customStructure && this.customStructure.label || 'label';
        this.valueName = this.customStructure && this.customStructure.value || 'value';
        // always render the DOM element, even if user passed a "collectionAsync",
        const newCollection = this.columnFilter.collection || [];
        this.renderDomElement(newCollection);
        // on every Filter which have a "collection" or a "collectionAsync"
        // we will add (or replace) a Subject to the "collectionAsync" property so that user has possibility to change the collection
        // if "collectionAsync" is already set by the user, it will resolve it first then after it will replace it with a Subject
        const collectionAsync = this.columnFilter && this.columnFilter.collectionAsync;
        if (collectionAsync) {
            this.renderOptionsAsync(collectionAsync); // create Subject after resolve (createCollectionAsyncSubject)
        }
    }
    /**
     * Clear the filter value
     */
    clear(shouldTriggerQuery = true) {
        if (this.$filterElm) {
            this._clearFilterTriggered = true;
            this._shouldTriggerQuery = shouldTriggerQuery;
            this.searchTerms = [];
            this.$filterElm.val('');
            this.$filterElm.trigger('keyup');
        }
    }
    /**
     * destroy the filter
     */
    destroy() {
        if (this.$filterElm) {
            this.$filterElm.off('keyup input change').remove();
        }
    }
    /**
     * Set value(s) on the DOM element
     */
    setValues(values) {
        if (values) {
            this.$filterElm.val(values);
        }
    }
    //
    // protected functions
    // ------------------
    /**
     * user might want to filter certain items of the collection
     * @param inputCollection
     * @return outputCollection filtered and/or sorted collection
     */
    filterCollection(inputCollection) {
        let outputCollection = inputCollection;
        // user might want to filter certain items of the collection
        if (this.columnFilter && this.columnFilter.collectionFilterBy) {
            const filterBy = this.columnFilter.collectionFilterBy;
            const filterCollectionBy = this.columnFilter.collectionOptions && this.columnFilter.collectionOptions.filterResultAfterEachPass || null;
            outputCollection = this.collectionService.filterCollection(outputCollection, filterBy, filterCollectionBy);
        }
        return outputCollection;
    }
    /**
     * user might want to sort the collection in a certain way
     * @param inputCollection
     * @return outputCollection filtered and/or sorted collection
     */
    sortCollection(inputCollection) {
        let outputCollection = inputCollection;
        // user might want to sort the collection
        if (this.columnFilter && this.columnFilter.collectionSortBy) {
            const sortBy = this.columnFilter.collectionSortBy;
            outputCollection = this.collectionService.sortCollection(this.columnDef, outputCollection, sortBy, this.enableTranslateLabel);
        }
        return outputCollection;
    }
    renderOptionsAsync(collectionAsync) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let awaitedCollection = [];
            if (collectionAsync) {
                awaitedCollection = yield castToPromise(collectionAsync);
                this.renderDomElementFromCollectionAsync(awaitedCollection);
                // because we accept Promises & HttpClient Observable only execute once
                // we will re-create an RxJs Subject which will replace the "collectionAsync" which got executed once anyway
                // doing this provide the user a way to call a "collectionAsync.next()"
                this.createCollectionAsyncSubject();
            }
        });
    }
    /** Create or recreate an Observable Subject and reassign it to the "collectionAsync" object so user can call a "collectionAsync.next()" on it */
    createCollectionAsyncSubject() {
        const newCollectionAsync = new Subject();
        this.columnFilter.collectionAsync = newCollectionAsync;
        this.subscriptions.push(newCollectionAsync.subscribe(collection => this.renderDomElementFromCollectionAsync(collection)));
    }
    /**
     * When user use a CollectionAsync we will use the returned collection to render the filter DOM element
     * and reinitialize filter collection with this new collection
     */
    renderDomElementFromCollectionAsync(collection) {
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
    }
    renderDomElement(collection) {
        if (!Array.isArray(collection) && this.collectionOptions && this.collectionOptions.collectionInObjectProperty) {
            collection = getDescendantProperty(collection, this.collectionOptions.collectionInObjectProperty);
        }
        if (!Array.isArray(collection)) {
            throw new Error('The "collection" passed to the Autocomplete Filter is not a valid array');
        }
        // assign the collection to a temp variable before filtering/sorting the collection
        let newCollection = collection;
        // user might want to filter and/or sort certain items of the collection
        newCollection = this.filterCollection(newCollection);
        newCollection = this.sortCollection(newCollection);
        // filter input can only have 1 search term, so we will use the 1st array index if it exist
        const searchTerm = (Array.isArray(this.searchTerms) && this.searchTerms[0]) || '';
        // step 1, create HTML string template
        const filterTemplate = this.buildTemplateHtmlString();
        // step 2, create the DOM Element of the filter & pre-load search term
        // also subscribe to the onClose event
        this.$filterElm = this.createDomElement(filterTemplate, newCollection, searchTerm);
        // step 3, subscribe to the keyup event and run the callback when that happens
        // also add/remove "filled" class for styling purposes
        this.$filterElm.on('keyup input change', (e) => {
            let value = e && e.target && e.target.value || '';
            const enableWhiteSpaceTrim = this.gridOptions.enableFilterTrimWhiteSpace || this.columnFilter.enableTrimWhiteSpace;
            if (typeof value === 'string' && enableWhiteSpaceTrim) {
                value = value.trim();
            }
            if (this._clearFilterTriggered) {
                this.callback(e, { columnDef: this.columnDef, clearFilterTriggered: this._clearFilterTriggered, shouldTriggerQuery: this._shouldTriggerQuery });
                this.$filterElm.removeClass('filled');
            }
            else {
                if (value === '') {
                    this.$filterElm.removeClass('filled');
                    this.callback(e, { columnDef: this.columnDef, operator: this.operator, searchTerms: [value], shouldTriggerQuery: this._shouldTriggerQuery });
                }
                else {
                    this.$filterElm.addClass('filled');
                }
            }
            // reset both flags for next use
            this._clearFilterTriggered = false;
            this._shouldTriggerQuery = true;
        });
    }
    /**
     * Create the HTML template as a string
     */
    buildTemplateHtmlString() {
        const columnId = this.columnDef && this.columnDef.id;
        let placeholder = (this.gridOptions) ? (this.gridOptions.defaultFilterPlaceholder || '') : '';
        if (this.columnFilter && this.columnFilter.placeholder) {
            placeholder = this.columnFilter.placeholder;
        }
        return `<input type="text" role="presentation" autocomplete="off" class="form-control autocomplete search-filter filter-${columnId}" placeholder="${placeholder}">`;
    }
    /**
     * From the html template string, create a DOM element
     * @param filterTemplate
     */
    createDomElement(filterTemplate, collection, searchTerm) {
        const columnId = this.columnDef && this.columnDef.id;
        const $headerElm = this.grid.getHeaderRowColumn(columnId);
        $($headerElm).empty();
        // create the DOM element & add an ID and filter class
        const $filterElm = $(filterTemplate);
        const searchTermInput = searchTerm;
        // user might provide his own custom structure
        // jQuery UI autocomplete requires a label/value pair, so we must remap them when user provide different ones
        if (Array.isArray(collection) && this.customStructure) {
            collection = collection.map((item) => {
                return { label: item[this.labelName], value: item[this.valueName] };
            });
        }
        // user might pass his own autocomplete options
        const autoCompleteOptions = this.columnFilter.filterOptions;
        // when user passes it's own autocomplete options
        // we still need to provide our own "select" callback implementation
        if (autoCompleteOptions) {
            autoCompleteOptions.select = (event, ui) => this.onSelect(event, ui);
            $filterElm.autocomplete(autoCompleteOptions);
        }
        else {
            if (!Array.isArray(collection)) {
                throw new Error('AutoComplete default implementation requires a "collection" or "collectionAsync" to be provided for the filter to work properly');
            }
            $filterElm.autocomplete({
                minLength: 0,
                source: collection,
                select: (event, ui) => this.onSelect(event, ui),
            });
        }
        $filterElm.val(searchTermInput);
        $filterElm.attr('id', `filter-${columnId}`);
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
    }
    //
    // private functions
    // ------------------
    onSelect(event, ui) {
        if (ui && ui.item) {
            const itemLabel = typeof ui.item === 'string' ? ui.item : ui.item.label;
            const itemValue = typeof ui.item === 'string' ? ui.item : ui.item.value;
            this.$filterElm.val(itemLabel);
            this.callback(event, { columnDef: this.columnDef, operator: this.operator, searchTerms: [itemValue], shouldTriggerQuery: this._shouldTriggerQuery });
            // reset both flags for next use
            this._clearFilterTriggered = false;
            this._shouldTriggerQuery = true;
        }
        return false;
    }
};
AutoCompleteFilter = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [TranslateService, CollectionService])
], AutoCompleteFilter);
export { AutoCompleteFilter };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b0NvbXBsZXRlRmlsdGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9maWx0ZXJzL2F1dG9Db21wbGV0ZUZpbHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN2RCxPQUFPLEVBU0wsWUFBWSxFQUdiLE1BQU0sbUJBQW1CLENBQUM7QUFDM0IsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDbkUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLGFBQWEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzdFLE9BQU8sRUFBZ0IsT0FBTyxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBTXpELElBQWEsa0JBQWtCLEdBQS9CLE1BQWEsa0JBQWtCO0lBNEI3Qjs7T0FFRztJQUNILFlBQXNCLFNBQTJCLEVBQVksaUJBQW9DO1FBQTNFLGNBQVMsR0FBVCxTQUFTLENBQWtCO1FBQVksc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQTlCekYsMEJBQXFCLEdBQUcsS0FBSyxDQUFDO1FBQzlCLHdCQUFtQixHQUFHLElBQUksQ0FBQztRQVluQyxhQUFRLEdBQUcsS0FBSyxDQUFDO1FBUWpCLHFEQUFxRDtRQUNyRCxjQUFTLEdBQUcsT0FBTyxDQUFDO1FBRXBCLHlCQUFvQixHQUFHLEtBQUssQ0FBQztRQUM3QixrQkFBYSxHQUFtQixFQUFFLENBQUM7SUFLa0UsQ0FBQztJQUV0Ryx3Q0FBd0M7SUFDeEMsSUFBYyxpQkFBaUI7UUFDN0IsT0FBTyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGlC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Q3hFLE1BQU0sU0FBUyxHQUFHLE9BQU8sRUFBRSxDQUFDLElBQUksS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ3hFLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQy9CLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsV0FBVyxFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUUsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUMsQ0FBQztZQUNySixnQ0FBZ0M7WUFDaEMsSUFBSSxDQUFDLHFCQUFxQixHQUFHLEtBQUssQ0FBQztZQUNuQyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDO1NBQ2pDO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0NBQ0YsQ0FBQTtBQXJWWSxrQkFBa0I7SUFEOUIsVUFBVSxFQUFFOzZDQWdDc0IsZ0JBQWdCLEVBQStCLGlCQUFpQjtHQS9CdEYsa0JBQWtCLENBcVY5QjtTQXJWWSxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5pbXBvcnQge1xuICBDb2xsZWN0aW9uQ3VzdG9tU3RydWN0dXJlLFxuICBDb2xsZWN0aW9uT3B0aW9uLFxuICBDb2x1bW4sXG4gIENvbHVtbkZpbHRlcixcbiAgRmlsdGVyLFxuICBGaWx0ZXJBcmd1bWVudHMsXG4gIEZpbHRlckNhbGxiYWNrLFxuICBHcmlkT3B0aW9uLFxuICBPcGVyYXRvclR5cGUsXG4gIE9wZXJhdG9yU3RyaW5nLFxuICBTZWFyY2hUZXJtXG59IGZyb20gJy4vLi4vbW9kZWxzL2luZGV4JztcbmltcG9ydCB7IENvbGxlY3Rpb25TZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvY29sbGVjdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IGdldERlc2NlbmRhbnRQcm9wZXJ0eSwgY2FzdFRvUHJvbWlzZSB9IGZyb20gJy4uL3NlcnZpY2VzL3V0aWxpdGllcyc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIFN1YmplY3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuLy8gdXNpbmcgZXh0ZXJuYWwgbm9uLXR5cGVkIGpzIGxpYnJhcmllc1xuZGVjbGFyZSB2YXIgJDogYW55O1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQXV0b0NvbXBsZXRlRmlsdGVyIGltcGxlbWVudHMgRmlsdGVyIHtcbiAgcHJpdmF0ZSBfY2xlYXJGaWx0ZXJUcmlnZ2VyZWQgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfc2hvdWxkVHJpZ2dlclF1ZXJ5ID0gdHJ1ZTtcblxuICAvKiogRE9NIEVsZW1lbnQgTmFtZSwgdXNlZnVsIGZvciBhdXRvLWRldGVjdGluZyBwb3NpdGlvbmluZyAoZHJvcHVwIC8gZHJvcGRvd24pICovXG4gIGVsZW1lbnROYW1lOiBzdHJpbmc7XG5cbiAgLyoqIFRoZSBKUXVlcnkgRE9NIGVsZW1lbnQgKi9cbiAgJGZpbHRlckVsbTogYW55O1xuXG4gIGdyaWQ6IGFueTtcbiAgc2VhcmNoVGVybXM6IFNlYXJjaFRlcm1bXTtcbiAgY29sdW1uRGVmOiBDb2x1bW47XG4gIGNhbGxiYWNrOiBGaWx0ZXJDYWxsYmFjaztcbiAgaXNGaWxsZWQgPSBmYWxzZTtcblxuICAvKiogVGhlIHByb3BlcnR5IG5hbWUgZm9yIGxhYmVscyBpbiB0aGUgY29sbGVjdGlvbiAqL1xuICBsYWJlbE5hbWU6IHN0cmluZztcblxuICAvKiogVGhlIHByb3BlcnR5IG5hbWUgZm9yIHZhbHVlcyBpbiB0aGUgY29sbGVjdGlvbiAqL1xuICBvcHRpb25MYWJlbDogc3RyaW5nO1xuXG4gIC8qKiBUaGUgcHJvcGVydHkgbmFtZSBmb3IgdmFsdWVzIGluIHRoZSBjb2xsZWN0aW9uICovXG4gIHZhbHVlTmFtZSA9ICdsYWJlbCc7XG5cbiAgZW5hYmxlVHJhbnNsYXRlTGFiZWwgPSBmYWxzZTtcbiAgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcblxuICAvKipcbiAgICogSW5pdGlhbGl6ZSB0aGUgRmlsdGVyXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgdHJhbnNsYXRlOiBUcmFuc2xhdGVTZXJ2aWNlLCBwcm90ZWN0ZWQgY29sbGVjdGlvblNlcnZpY2U6IENvbGxlY3Rpb25TZXJ2aWNlKSB7IH1cblxuICAvKiogR2V0dGVyIGZvciB0aGUgQ29sbGVjdGlvbiBPcHRpb25zICovXG4gIHByb3RlY3RlZCBnZXQgY29sbGVjdGlvbk9wdGlvbnMoKTogQ29sbGVjdGlvbk9wdGlvbiB7XG4gICAgcmV0dXJuIHRoaXMuY29sdW1uRGVmICYmIHRoaXMuY29sdW1uRGVmLmZpbHRlciAmJiB0aGlzLmNvbHVtbkRlZi5maWx0ZXIuY29sbGVjdGlvbk9wdGlvbnMgfHwge307XG4gIH1cblxuICAvKiogR2V0dGVyIGZvciB0aGUgQ29sdW1uIEZpbHRlciAqL1xuICBnZXQgY29sdW1uRmlsdGVyKCk6IENvbHVtbkZpbHRlciB7XG4gICAgcmV0dXJuIHRoaXMuY29sdW1uRGVmICYmIHRoaXMuY29sdW1uRGVmLmZpbHRlciB8fCB7fTtcbiAgfVxuXG4gIC8qKiBHZXR0ZXIgZm9yIHRoZSBDdXN0b20gU3RydWN0dXJlIGlmIGV4aXN0ICovXG4gIGdldCBjdXN0b21TdHJ1Y3R1cmUoKTogQ29sbGVjdGlvbkN1c3RvbVN0cnVjdHVyZSB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuY29sdW1uRGVmICYmIHRoaXMuY29sdW1uRGVmLmZpbHRlciAmJiB0aGlzLmNvbHVtbkRlZi5maWx0ZXIuY3VzdG9tU3RydWN0dXJlO1xuICB9XG5cbiAgLyoqIEdldHRlciBmb3IgdGhlIEdyaWQgT3B0aW9ucyBwdWxsZWQgdGhyb3VnaCB0aGUgR3JpZCBPYmplY3QgKi9cbiAgZ2V0IGdyaWRPcHRpb25zKCk6IEdyaWRPcHRpb24ge1xuICAgIHJldHVybiAodGhpcy5ncmlkICYmIHRoaXMuZ3JpZC5nZXRPcHRpb25zKSA/IHRoaXMuZ3JpZC5nZXRPcHRpb25zKCkgOiB7fTtcbiAgfVxuXG4gIC8qKiBHZXR0ZXIgb2YgdGhlIE9wZXJhdG9yIHRvIHVzZSB3aGVuIGRvaW5nIHRoZSBmaWx0ZXIgY29tcGFyaW5nICovXG4gIGdldCBvcGVyYXRvcigpOiBPcGVyYXRvclR5cGUgfCBPcGVyYXRvclN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuY29sdW1uRGVmICYmIHRoaXMuY29sdW1uRGVmLmZpbHRlciAmJiB0aGlzLmNvbHVtbkRlZi5maWx0ZXIub3BlcmF0b3IgfHwgT3BlcmF0b3JUeXBlLmVxdWFsO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemUgdGhlIGZpbHRlciB0ZW1wbGF0ZVxuICAgKi9cbiAgaW5pdChhcmdzOiBGaWx0ZXJBcmd1bWVudHMpIHtcbiAgICBpZiAoIWFyZ3MpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignW0FuZ3VsYXItU2xpY2tHcmlkXSBBIGZpbHRlciBtdXN0IGFsd2F5cyBoYXZlIGFuIFwiaW5pdCgpXCIgd2l0aCB2YWxpZCBhcmd1bWVudHMuJyk7XG4gICAgfVxuICAgIHRoaXMuZ3JpZCA9IGFyZ3MuZ3JpZDtcbiAgICB0aGlzLmNhbGxiYWNrID0gYXJncy5jYWxsYmFjaztcbiAgICB0aGlzLmNvbHVtbkRlZiA9IGFyZ3MuY29sdW1uRGVmO1xuICAgIHRoaXMuc2VhcmNoVGVybXMgPSBhcmdzLnNlYXJjaFRlcm1zIHx8IFtdO1xuXG4gICAgaWYgKCF0aGlzLmdyaWQgfHwgIXRoaXMuY29sdW1uRGVmIHx8ICF0aGlzLmNvbHVtbkZpbHRlciB8fCAoIXRoaXMuY29sdW1uRmlsdGVyLmNvbGxlY3Rpb24gJiYgIXRoaXMuY29sdW1uRmlsdGVyLmNvbGxlY3Rpb25Bc3luYyAmJiAhdGhpcy5jb2x1bW5GaWx0ZXIuZmlsdGVyT3B0aW9ucykpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgW0FuZ3VsYXItU2xpY2tHcmlkXSBZb3UgbmVlZCB0byBwYXNzIGEgXCJjb2xsZWN0aW9uXCIgKG9yIFwiY29sbGVjdGlvbkFzeW5jXCIpIGZvciB0aGUgQXV0b0NvbXBsZXRlIEZpbHRlciB0byB3b3JrIGNvcnJlY3RseS4gQWxzbyBlYWNoIG9wdGlvbiBzaG91bGQgaW5jbHVkZSBhIHZhbHVlL2xhYmVsIHBhaXIgKG9yIHZhbHVlL2xhYmVsS2V5IHdoZW4gdXNpbmcgTG9jYWxlKS4gRm9yIGV4YW1wbGU6OiB7IGZpbHRlcjogbW9kZWw6IEZpbHRlcnMuYXV0b0NvbXBsZXRlLCBjb2xsZWN0aW9uOiBbeyB2YWx1ZTogdHJ1ZSwgbGFiZWw6ICdUcnVlJyB9LCB7IHZhbHVlOiBmYWxzZSwgbGFiZWw6ICdGYWxzZSd9XSB9YCk7XG4gICAgfVxuXG4gICAgdGhpcy5lbmFibGVUcmFuc2xhdGVMYWJlbCA9IHRoaXMuY29sdW1uRmlsdGVyICYmIHRoaXMuY29sdW1uRmlsdGVyLmVuYWJsZVRyYW5zbGF0ZUxhYmVsIHx8IGZhbHNlO1xuICAgIHRoaXMubGFiZWxOYW1lID0gdGhpcy5jdXN0b21TdHJ1Y3R1cmUgJiYgdGhpcy5jdXN0b21TdHJ1Y3R1cmUubGFiZWwgfHwgJ2xhYmVsJztcbiAgICB0aGlzLnZhbHVlTmFtZSA9IHRoaXMuY3VzdG9tU3RydWN0dXJlICYmIHRoaXMuY3VzdG9tU3RydWN0dXJlLnZhbHVlIHx8ICd2YWx1ZSc7XG5cbiAgICAvLyBhbHdheXMgcmVuZGVyIHRoZSBET00gZWxlbWVudCwgZXZlbiBpZiB1c2VyIHBhc3NlZCBhIFwiY29sbGVjdGlvbkFzeW5jXCIsXG4gICAgY29uc3QgbmV3Q29sbGVjdGlvbiA9IHRoaXMuY29sdW1uRmlsdGVyLmNvbGxlY3Rpb24gfHwgW107XG4gICAgdGhpcy5yZW5kZXJEb21FbGVtZW50KG5ld0NvbGxlY3Rpb24pO1xuXG4gICAgLy8gb24gZXZlcnkgRmlsdGVyIHdoaWNoIGhhdmUgYSBcImNvbGxlY3Rpb25cIiBvciBhIFwiY29sbGVjdGlvbkFzeW5jXCJcbiAgICAvLyB3ZSB3aWxsIGFkZCAob3IgcmVwbGFjZSkgYSBTdWJqZWN0IHRvIHRoZSBcImNvbGxlY3Rpb25Bc3luY1wiIHByb3BlcnR5IHNvIHRoYXQgdXNlciBoYXMgcG9zc2liaWxpdHkgdG8gY2hhbmdlIHRoZSBjb2xsZWN0aW9uXG4gICAgLy8gaWYgXCJjb2xsZWN0aW9uQXN5bmNcIiBpcyBhbHJlYWR5IHNldCBieSB0aGUgdXNlciwgaXQgd2lsbCByZXNvbHZlIGl0IGZpcnN0IHRoZW4gYWZ0ZXIgaXQgd2lsbCByZXBsYWNlIGl0IHdpdGggYSBTdWJqZWN0XG4gICAgY29uc3QgY29sbGVjdGlvbkFzeW5jID0gdGhpcy5jb2x1bW5GaWx0ZXIgJiYgdGhpcy5jb2x1bW5GaWx0ZXIuY29sbGVjdGlvbkFzeW5jO1xuICAgIGlmIChjb2xsZWN0aW9uQXN5bmMpIHtcbiAgICAgIHRoaXMucmVuZGVyT3B0aW9uc0FzeW5jKGNvbGxlY3Rpb25Bc3luYyk7IC8vIGNyZWF0ZSBTdWJqZWN0IGFmdGVyIHJlc29sdmUgKGNyZWF0ZUNvbGxlY3Rpb25Bc3luY1N1YmplY3QpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENsZWFyIHRoZSBmaWx0ZXIgdmFsdWVcbiAgICovXG4gIGNsZWFyKHNob3VsZFRyaWdnZXJRdWVyeSA9IHRydWUpIHtcbiAgICBpZiAodGhpcy4kZmlsdGVyRWxtKSB7XG4gICAgICB0aGlzLl9jbGVhckZpbHRlclRyaWdnZXJlZCA9IHRydWU7XG4gICAgICB0aGlzLl9zaG91bGRUcmlnZ2VyUXVlcnkgPSBzaG91bGRUcmlnZ2VyUXVlcnk7XG4gICAgICB0aGlzLnNlYXJjaFRlcm1zID0gW107XG4gICAgICB0aGlzLiRmaWx0ZXJFbG0udmFsKCcnKTtcbiAgICAgIHRoaXMuJGZpbHRlckVsbS50cmlnZ2VyKCdrZXl1cCcpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBkZXN0cm95IHRoZSBmaWx0ZXJcbiAgICovXG4gIGRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuJGZpbHRlckVsbSkge1xuICAgICAgdGhpcy4kZmlsdGVyRWxtLm9mZigna2V5dXAgaW5wdXQgY2hhbmdlJykucmVtb3ZlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNldCB2YWx1ZShzKSBvbiB0aGUgRE9NIGVsZW1lbnRcbiAgICovXG4gIHNldFZhbHVlcyh2YWx1ZXM6IFNlYXJjaFRlcm0gfCBTZWFyY2hUZXJtW10pIHtcbiAgICBpZiAodmFsdWVzKSB7XG4gICAgICB0aGlzLiRmaWx0ZXJFbG0udmFsKHZhbHVlcyk7XG4gICAgfVxuICB9XG5cbiAgLy9cbiAgLy8gcHJvdGVjdGVkIGZ1bmN0aW9uc1xuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS1cblxuICAvKipcbiAgICogdXNlciBtaWdodCB3YW50IHRvIGZpbHRlciBjZXJ0YWluIGl0ZW1zIG9mIHRoZSBjb2xsZWN0aW9uXG4gICAqIEBwYXJhbSBpbnB1dENvbGxlY3Rpb25cbiAgICogQHJldHVybiBvdXRwdXRDb2xsZWN0aW9uIGZpbHRlcmVkIGFuZC9vciBzb3J0ZWQgY29sbGVjdGlvblxuICAgKi9cbiAgcHJvdGVjdGVkIGZpbHRlckNvbGxlY3Rpb24oaW5wdXRDb2xsZWN0aW9uOiBhbnlbXSk6IGFueVtdIHtcbiAgICBsZXQgb3V0cHV0Q29sbGVjdGlvbiA9IGlucHV0Q29sbGVjdGlvbjtcblxuICAgIC8vIHVzZXIgbWlnaHQgd2FudCB0byBmaWx0ZXIgY2VydGFpbiBpdGVtcyBvZiB0aGUgY29sbGVjdGlvblxuICAgIGlmICh0aGlzLmNvbHVtbkZpbHRlciAmJiB0aGlzLmNvbHVtbkZpbHRlci5jb2xsZWN0aW9uRmlsdGVyQnkpIHtcbiAgICAgIGNvbnN0IGZpbHRlckJ5ID0gdGhpcy5jb2x1bW5GaWx0ZXIuY29sbGVjdGlvbkZpbHRlckJ5O1xuICAgICAgY29uc3QgZmlsdGVyQ29sbGVjdGlvbkJ5ID0gdGhpcy5jb2x1bW5GaWx0ZXIuY29sbGVjdGlvbk9wdGlvbnMgJiYgdGhpcy5jb2x1bW5GaWx0ZXIuY29sbGVjdGlvbk9wdGlvbnMuZmlsdGVyUmVzdWx0QWZ0ZXJFYWNoUGFzcyB8fCBudWxsO1xuICAgICAgb3V0cHV0Q29sbGVjdGlvbiA9IHRoaXMuY29sbGVjdGlvblNlcnZpY2UuZmlsdGVyQ29sbGVjdGlvbihvdXRwdXRDb2xsZWN0aW9uLCBmaWx0ZXJCeSwgZmlsdGVyQ29sbGVjdGlvbkJ5KTtcbiAgICB9XG5cbiAgICByZXR1cm4gb3V0cHV0Q29sbGVjdGlvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiB1c2VyIG1pZ2h0IHdhbnQgdG8gc29ydCB0aGUgY29sbGVjdGlvbiBpbiBhIGNlcnRhaW4gd2F5XG4gICAqIEBwYXJhbSBpbnB1dENvbGxlY3Rpb25cbiAgICogQHJldHVybiBvdXRwdXRDb2xsZWN0aW9uIGZpbHRlcmVkIGFuZC9vciBzb3J0ZWQgY29sbGVjdGlvblxuICAgKi9cbiAgcHJvdGVjdGVkIHNvcnRDb2xsZWN0aW9uKGlucHV0Q29sbGVjdGlvbjogYW55W10pOiBhbnlbXSB7XG4gICAgbGV0IG91dHB1dENvbGxlY3Rpb24gPSBpbnB1dENvbGxlY3Rpb247XG5cbiAgICAvLyB1c2VyIG1pZ2h0IHdhbnQgdG8gc29ydCB0aGUgY29sbGVjdGlvblxuICAgIGlmICh0aGlzLmNvbHVtbkZpbHRlciAmJiB0aGlzLmNvbHVtbkZpbHRlci5jb2xsZWN0aW9uU29ydEJ5KSB7XG4gICAgICBjb25zdCBzb3J0QnkgPSB0aGlzLmNvbHVtbkZpbHRlci5jb2xsZWN0aW9uU29ydEJ5O1xuICAgICAgb3V0cHV0Q29sbGVjdGlvbiA9IHRoaXMuY29sbGVjdGlvblNlcnZpY2Uuc29ydENvbGxlY3Rpb24odGhpcy5jb2x1bW5EZWYsIG91dHB1dENvbGxlY3Rpb24sIHNvcnRCeSwgdGhpcy5lbmFibGVUcmFuc2xhdGVMYWJlbCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG91dHB1dENvbGxlY3Rpb247XG4gIH1cblxuICBwcm90ZWN0ZWQgYXN5bmMgcmVuZGVyT3B0aW9uc0FzeW5jKGNvbGxlY3Rpb25Bc3luYzogUHJvbWlzZTxhbnk+IHwgT2JzZXJ2YWJsZTxhbnk+IHwgU3ViamVjdDxhbnk+KSB7XG4gICAgbGV0IGF3YWl0ZWRDb2xsZWN0aW9uOiBhbnkgPSBbXTtcblxuICAgIGlmIChjb2xsZWN0aW9uQXN5bmMpIHtcbiAgICAgIGF3YWl0ZWRDb2xsZWN0aW9uID0gYXdhaXQgY2FzdFRvUHJvbWlzZShjb2xsZWN0aW9uQXN5bmMpO1xuICAgICAgdGhpcy5yZW5kZXJEb21FbGVtZW50RnJvbUNvbGxlY3Rpb25Bc3luYyhhd2FpdGVkQ29sbGVjdGlvbik7XG5cbiAgICAgIC8vIGJlY2F1c2Ugd2UgYWNjZXB0IFByb21pc2VzICYgSHR0cENsaWVudCBPYnNlcnZhYmxlIG9ubHkgZXhlY3V0ZSBvbmNlXG4gICAgICAvLyB3ZSB3aWxsIHJlLWNyZWF0ZSBhbiBSeEpzIFN1YmplY3Qgd2hpY2ggd2lsbCByZXBsYWNlIHRoZSBcImNvbGxlY3Rpb25Bc3luY1wiIHdoaWNoIGdvdCBleGVjdXRlZCBvbmNlIGFueXdheVxuICAgICAgLy8gZG9pbmcgdGhpcyBwcm92aWRlIHRoZSB1c2VyIGEgd2F5IHRvIGNhbGwgYSBcImNvbGxlY3Rpb25Bc3luYy5uZXh0KClcIlxuICAgICAgdGhpcy5jcmVhdGVDb2xsZWN0aW9uQXN5bmNTdWJqZWN0KCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIENyZWF0ZSBvciByZWNyZWF0ZSBhbiBPYnNlcnZhYmxlIFN1YmplY3QgYW5kIHJlYXNzaWduIGl0IHRvIHRoZSBcImNvbGxlY3Rpb25Bc3luY1wiIG9iamVjdCBzbyB1c2VyIGNhbiBjYWxsIGEgXCJjb2xsZWN0aW9uQXN5bmMubmV4dCgpXCIgb24gaXQgKi9cbiAgcHJvdGVjdGVkIGNyZWF0ZUNvbGxlY3Rpb25Bc3luY1N1YmplY3QoKSB7XG4gICAgY29uc3QgbmV3Q29sbGVjdGlvbkFzeW5jID0gbmV3IFN1YmplY3Q8YW55PigpO1xuICAgIHRoaXMuY29sdW1uRmlsdGVyLmNvbGxlY3Rpb25Bc3luYyA9IG5ld0NvbGxlY3Rpb25Bc3luYztcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIG5ld0NvbGxlY3Rpb25Bc3luYy5zdWJzY3JpYmUoY29sbGVjdGlvbiA9PiB0aGlzLnJlbmRlckRvbUVsZW1lbnRGcm9tQ29sbGVjdGlvbkFzeW5jKGNvbGxlY3Rpb24pKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogV2hlbiB1c2VyIHVzZSBhIENvbGxlY3Rpb25Bc3luYyB3ZSB3aWxsIHVzZSB0aGUgcmV0dXJuZWQgY29sbGVjdGlvbiB0byByZW5kZXIgdGhlIGZpbHRlciBET00gZWxlbWVudFxuICAgKiBhbmQgcmVpbml0aWFsaXplIGZpbHRlciBjb2xsZWN0aW9uIHdpdGggdGhpcyBuZXcgY29sbGVjdGlvblxuICAgKi9cbiAgcHJvdGVjdGVkIHJlbmRlckRvbUVsZW1lbnRGcm9tQ29sbGVjdGlvbkFzeW5jKGNvbGxlY3Rpb24pIHtcbiAgICBpZiAodGhpcy5jb2xsZWN0aW9uT3B0aW9ucyAmJiB0aGlzLmNvbGxlY3Rpb25PcHRpb25zLmNvbGxlY3Rpb25Jbk9iamVjdFByb3BlcnR5KSB7XG4gICAgICBjb2xsZWN0aW9uID0gZ2V0RGVzY2VuZGFudFByb3BlcnR5KGNvbGxlY3Rpb24sIHRoaXMuY29sbGVjdGlvbk9wdGlvbnMuY29sbGVjdGlvbkluT2JqZWN0UHJvcGVydHkpO1xuICAgIH1cbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoY29sbGVjdGlvbikpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignU29tZXRoaW5nIHdlbnQgd3Jvbmcgd2hpbGUgdHJ5aW5nIHRvIHB1bGwgdGhlIGNvbGxlY3Rpb24gZnJvbSB0aGUgXCJjb2xsZWN0aW9uQXN5bmNcIiBjYWxsIGluIHRoZSBBdXRvQ29tcGxldGUgRmlsdGVyLCB0aGUgY29sbGVjdGlvbiBpcyBub3QgYSB2YWxpZCBhcnJheS4nKTtcbiAgICB9XG5cbiAgICAvLyBjb3B5IG92ZXIgdGhlIGFycmF5IHJlY2VpdmVkIGZyb20gdGhlIGFzeW5jIGNhbGwgdG8gdGhlIFwiY29sbGVjdGlvblwiIGFzIHRoZSBuZXcgY29sbGVjdGlvbiB0byB1c2VcbiAgICAvLyB0aGlzIGhhcyB0byBiZSBCRUZPUkUgdGhlIGBjb2xsZWN0aW9uT2JzZXJ2ZXIoKS5zdWJzY3JpYmVgIHRvIGF2b2lkIGdvaW5nIGludG8gYW4gaW5maW5pdGUgbG9vcFxuICAgIHRoaXMuY29sdW1uRmlsdGVyLmNvbGxlY3Rpb24gPSBjb2xsZWN0aW9uO1xuXG4gICAgLy8gcmVjcmVhdGUgRmlsdGVyIERPTSBlbGVtZW50IGFmdGVyIGdldHRpbmcgYXN5bmMgY29sbGVjdGlvblxuICAgIHRoaXMucmVuZGVyRG9tRWxlbWVudChjb2xsZWN0aW9uKTtcbiAgfVxuXG4gIHByb3RlY3RlZCByZW5kZXJEb21FbGVtZW50KGNvbGxlY3Rpb246IGFueVtdKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGNvbGxlY3Rpb24pICYmIHRoaXMuY29sbGVjdGlvbk9wdGlvbnMgJiYgdGhpcy5jb2xsZWN0aW9uT3B0aW9ucy5jb2xsZWN0aW9uSW5PYmplY3RQcm9wZXJ0eSkge1xuICAgICAgY29sbGVjdGlvbiA9IGdldERlc2NlbmRhbnRQcm9wZXJ0eShjb2xsZWN0aW9uLCB0aGlzLmNvbGxlY3Rpb25PcHRpb25zLmNvbGxlY3Rpb25Jbk9iamVjdFByb3BlcnR5KTtcbiAgICB9XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGNvbGxlY3Rpb24pKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBcImNvbGxlY3Rpb25cIiBwYXNzZWQgdG8gdGhlIEF1dG9jb21wbGV0ZSBGaWx0ZXIgaXMgbm90IGEgdmFsaWQgYXJyYXknKTtcbiAgICB9XG5cbiAgICAvLyBhc3NpZ24gdGhlIGNvbGxlY3Rpb24gdG8gYSB0ZW1wIHZhcmlhYmxlIGJlZm9yZSBmaWx0ZXJpbmcvc29ydGluZyB0aGUgY29sbGVjdGlvblxuICAgIGxldCBuZXdDb2xsZWN0aW9uID0gY29sbGVjdGlvbjtcblxuICAgIC8vIHVzZXIgbWlnaHQgd2FudCB0byBmaWx0ZXIgYW5kL29yIHNvcnQgY2VydGFpbiBpdGVtcyBvZiB0aGUgY29sbGVjdGlvblxuICAgIG5ld0NvbGxlY3Rpb24gPSB0aGlzLmZpbHRlckNvbGxlY3Rpb24obmV3Q29sbGVjdGlvbik7XG4gICAgbmV3Q29sbGVjdGlvbiA9IHRoaXMuc29ydENvbGxlY3Rpb24obmV3Q29sbGVjdGlvbik7XG5cbiAgICAvLyBmaWx0ZXIgaW5wdXQgY2FuIG9ubHkgaGF2ZSAxIHNlYXJjaCB0ZXJtLCBzbyB3ZSB3aWxsIHVzZSB0aGUgMXN0IGFycmF5IGluZGV4IGlmIGl0IGV4aXN0XG4gICAgY29uc3Qgc2VhcmNoVGVybSA9IChBcnJheS5pc0FycmF5KHRoaXMuc2VhcmNoVGVybXMpICYmIHRoaXMuc2VhcmNoVGVybXNbMF0pIHx8ICcnO1xuXG4gICAgLy8gc3RlcCAxLCBjcmVhdGUgSFRNTCBzdHJpbmcgdGVtcGxhdGVcbiAgICBjb25zdCBmaWx0ZXJUZW1wbGF0ZSA9IHRoaXMuYnVpbGRUZW1wbGF0ZUh0bWxTdHJpbmcoKTtcblxuICAgIC8vIHN0ZXAgMiwgY3JlYXRlIHRoZSBET00gRWxlbWVudCBvZiB0aGUgZmlsdGVyICYgcHJlLWxvYWQgc2VhcmNoIHRlcm1cbiAgICAvLyBhbHNvIHN1YnNjcmliZSB0byB0aGUgb25DbG9zZSBldmVudFxuICAgIHRoaXMuJGZpbHRlckVsbSA9IHRoaXMuY3JlYXRlRG9tRWxlbWVudChmaWx0ZXJUZW1wbGF0ZSwgbmV3Q29sbGVjdGlvbiwgc2VhcmNoVGVybSk7XG5cbiAgICAvLyBzdGVwIDMsIHN1YnNjcmliZSB0byB0aGUga2V5dXAgZXZlbnQgYW5kIHJ1biB0aGUgY2FsbGJhY2sgd2hlbiB0aGF0IGhhcHBlbnNcbiAgICAvLyBhbHNvIGFkZC9yZW1vdmUgXCJmaWxsZWRcIiBjbGFzcyBmb3Igc3R5bGluZyBwdXJwb3Nlc1xuICAgIHRoaXMuJGZpbHRlckVsbS5vbigna2V5dXAgaW5wdXQgY2hhbmdlJywgKGU6IGFueSkgPT4ge1xuICAgICAgbGV0IHZhbHVlID0gZSAmJiBlLnRhcmdldCAmJiBlLnRhcmdldC52YWx1ZSB8fCAnJztcbiAgICAgIGNvbnN0IGVuYWJsZVdoaXRlU3BhY2VUcmltID0gdGhpcy5ncmlkT3B0aW9ucy5lbmFibGVGaWx0ZXJUcmltV2hpdGVTcGFjZSB8fCB0aGlzLmNvbHVtbkZpbHRlci5lbmFibGVUcmltV2hpdGVTcGFjZTtcbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnICYmIGVuYWJsZVdoaXRlU3BhY2VUcmltKSB7XG4gICAgICAgIHZhbHVlID0gdmFsdWUudHJpbSgpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5fY2xlYXJGaWx0ZXJUcmlnZ2VyZWQpIHtcbiAgICAgICAgdGhpcy5jYWxsYmFjayhlLCB7IGNvbHVtbkRlZjogdGhpcy5jb2x1bW5EZWYsIGNsZWFyRmlsdGVyVHJpZ2dlcmVkOiB0aGlzLl9jbGVhckZpbHRlclRyaWdnZXJlZCwgc2hvdWxkVHJpZ2dlclF1ZXJ5OiB0aGlzLl9zaG91bGRUcmlnZ2VyUXVlcnkgfSk7XG4gICAgICAgIHRoaXMuJGZpbHRlckVsbS5yZW1vdmVDbGFzcygnZmlsbGVkJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodmFsdWUgPT09ICcnKSB7XG4gICAgICAgICAgdGhpcy4kZmlsdGVyRWxtLnJlbW92ZUNsYXNzKCdmaWxsZWQnKTtcbiAgICAgICAgICB0aGlzLmNhbGxiYWNrKGUsIHsgY29sdW1uRGVmOiB0aGlzLmNvbHVtbkRlZiwgb3BlcmF0b3I6IHRoaXMub3BlcmF0b3IsIHNlYXJjaFRlcm1zOiBbdmFsdWVdLCBzaG91bGRUcmlnZ2VyUXVlcnk6IHRoaXMuX3Nob3VsZFRyaWdnZXJRdWVyeSB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLiRmaWx0ZXJFbG0uYWRkQ2xhc3MoJ2ZpbGxlZCcpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvLyByZXNldCBib3RoIGZsYWdzIGZvciBuZXh0IHVzZVxuICAgICAgdGhpcy5fY2xlYXJGaWx0ZXJUcmlnZ2VyZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMuX3Nob3VsZFRyaWdnZXJRdWVyeSA9IHRydWU7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIHRoZSBIVE1MIHRlbXBsYXRlIGFzIGEgc3RyaW5nXG4gICAqL1xuICBwcml2YXRlIGJ1aWxkVGVtcGxhdGVIdG1sU3RyaW5nKCkge1xuICAgIGNvbnN0IGNvbHVtbklkID0gdGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYuaWQ7XG4gICAgbGV0IHBsYWNlaG9sZGVyID0gKHRoaXMuZ3JpZE9wdGlvbnMpID8gKHRoaXMuZ3JpZE9wdGlvbnMuZGVmYXVsdEZpbHRlclBsYWNlaG9sZGVyIHx8ICcnKSA6ICcnO1xuICAgIGlmICh0aGlzLmNvbHVtbkZpbHRlciAmJiB0aGlzLmNvbHVtbkZpbHRlci5wbGFjZWhvbGRlcikge1xuICAgICAgcGxhY2Vob2xkZXIgPSB0aGlzLmNvbHVtbkZpbHRlci5wbGFjZWhvbGRlcjtcbiAgICB9XG4gICAgcmV0dXJuIGA8aW5wdXQgdHlwZT1cInRleHRcIiByb2xlPVwicHJlc2VudGF0aW9uXCIgYXV0b2NvbXBsZXRlPVwib2ZmXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2wgYXV0b2NvbXBsZXRlIHNlYXJjaC1maWx0ZXIgZmlsdGVyLSR7Y29sdW1uSWR9XCIgcGxhY2Vob2xkZXI9XCIke3BsYWNlaG9sZGVyfVwiPmA7XG4gIH1cblxuICAvKipcbiAgICogRnJvbSB0aGUgaHRtbCB0ZW1wbGF0ZSBzdHJpbmcsIGNyZWF0ZSBhIERPTSBlbGVtZW50XG4gICAqIEBwYXJhbSBmaWx0ZXJUZW1wbGF0ZVxuICAgKi9cbiAgcHJpdmF0ZSBjcmVhdGVEb21FbGVtZW50KGZpbHRlclRlbXBsYXRlOiBzdHJpbmcsIGNvbGxlY3Rpb246IGFueVtdLCBzZWFyY2hUZXJtPzogU2VhcmNoVGVybSkge1xuICAgIGNvbnN0IGNvbHVtbklkID0gdGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYuaWQ7XG4gICAgY29uc3QgJGhlYWRlckVsbSA9IHRoaXMuZ3JpZC5nZXRIZWFkZXJSb3dDb2x1bW4oY29sdW1uSWQpO1xuICAgICQoJGhlYWRlckVsbSkuZW1wdHkoKTtcblxuICAgIC8vIGNyZWF0ZSB0aGUgRE9NIGVsZW1lbnQgJiBhZGQgYW4gSUQgYW5kIGZpbHRlciBjbGFzc1xuICAgIGNvbnN0ICRmaWx0ZXJFbG0gPSAkKGZpbHRlclRlbXBsYXRlKSBhcyBhbnk7XG4gICAgY29uc3Qgc2VhcmNoVGVybUlucHV0ID0gc2VhcmNoVGVybSBhcyBzdHJpbmc7XG5cbiAgICAvLyB1c2VyIG1pZ2h0IHByb3ZpZGUgaGlzIG93biBjdXN0b20gc3RydWN0dXJlXG4gICAgLy8galF1ZXJ5IFVJIGF1dG9jb21wbGV0ZSByZXF1aXJlcyBhIGxhYmVsL3ZhbHVlIHBhaXIsIHNvIHdlIG11c3QgcmVtYXAgdGhlbSB3aGVuIHVzZXIgcHJvdmlkZSBkaWZmZXJlbnQgb25lc1xuICAgIGlmIChBcnJheS5pc0FycmF5KGNvbGxlY3Rpb24pICYmIHRoaXMuY3VzdG9tU3RydWN0dXJlKSB7XG4gICAgICBjb2xsZWN0aW9uID0gY29sbGVjdGlvbi5tYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgcmV0dXJuIHsgbGFiZWw6IGl0ZW1bdGhpcy5sYWJlbE5hbWVdLCB2YWx1ZTogaXRlbVt0aGlzLnZhbHVlTmFtZV0gfTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIHVzZXIgbWlnaHQgcGFzcyBoaXMgb3duIGF1dG9jb21wbGV0ZSBvcHRpb25zXG4gICAgY29uc3QgYXV0b0NvbXBsZXRlT3B0aW9ucyA9IHRoaXMuY29sdW1uRmlsdGVyLmZpbHRlck9wdGlvbnM7XG5cbiAgICAvLyB3aGVuIHVzZXIgcGFzc2VzIGl0J3Mgb3duIGF1dG9jb21wbGV0ZSBvcHRpb25zXG4gICAgLy8gd2Ugc3RpbGwgbmVlZCB0byBwcm92aWRlIG91ciBvd24gXCJzZWxlY3RcIiBjYWxsYmFjayBpbXBsZW1lbnRhdGlvblxuICAgIGlmIChhdXRvQ29tcGxldGVPcHRpb25zKSB7XG4gICAgICBhdXRvQ29tcGxldGVPcHRpb25zLnNlbGVjdCA9IChldmVudDogRXZlbnQsIHVpOiBhbnkpID0+IHRoaXMub25TZWxlY3QoZXZlbnQsIHVpKTtcbiAgICAgICRmaWx0ZXJFbG0uYXV0b2NvbXBsZXRlKGF1dG9Db21wbGV0ZU9wdGlvbnMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoIUFycmF5LmlzQXJyYXkoY29sbGVjdGlvbikpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBdXRvQ29tcGxldGUgZGVmYXVsdCBpbXBsZW1lbnRhdGlvbiByZXF1aXJlcyBhIFwiY29sbGVjdGlvblwiIG9yIFwiY29sbGVjdGlvbkFzeW5jXCIgdG8gYmUgcHJvdmlkZWQgZm9yIHRoZSBmaWx0ZXIgdG8gd29yayBwcm9wZXJseScpO1xuICAgICAgfVxuXG4gICAgICAkZmlsdGVyRWxtLmF1dG9jb21wbGV0ZSh7XG4gICAgICAgIG1pbkxlbmd0aDogMCxcbiAgICAgICAgc291cmNlOiBjb2xsZWN0aW9uLFxuICAgICAgICBzZWxlY3Q6IChldmVudDogRXZlbnQsIHVpOiBhbnkpID0+IHRoaXMub25TZWxlY3QoZXZlbnQsIHVpKSxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgICRmaWx0ZXJFbG0udmFsKHNlYXJjaFRlcm1JbnB1dCk7XG4gICAgJGZpbHRlckVsbS5hdHRyKCdpZCcsIGBmaWx0ZXItJHtjb2x1bW5JZH1gKTtcbiAgICAkZmlsdGVyRWxtLmRhdGEoJ2NvbHVtbklkJywgY29sdW1uSWQpO1xuXG4gICAgLy8gaWYgdGhlcmUncyBhIHNlYXJjaCB0ZXJtLCB3ZSB3aWxsIGFkZCB0aGUgXCJmaWxsZWRcIiBjbGFzcyBmb3Igc3R5bGluZyBwdXJwb3Nlc1xuICAgIGlmIChzZWFyY2hUZXJtKSB7XG4gICAgICAkZmlsdGVyRWxtLmFkZENsYXNzKCdmaWxsZWQnKTtcbiAgICB9XG5cbiAgICAvLyBhcHBlbmQgdGhlIG5ldyBET00gZWxlbWVudCB0byB0aGUgaGVhZGVyIHJvd1xuICAgIGlmICgkZmlsdGVyRWxtICYmIHR5cGVvZiAkZmlsdGVyRWxtLmFwcGVuZFRvID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAkZmlsdGVyRWxtLmFwcGVuZFRvKCRoZWFkZXJFbG0pO1xuICAgIH1cblxuICAgIHJldHVybiAkZmlsdGVyRWxtO1xuICB9XG5cbiAgLy9cbiAgLy8gcHJpdmF0ZSBmdW5jdGlvbnNcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgcHJpdmF0ZSBvblNlbGVjdChldmVudDogRXZlbnQsIHVpOiBhbnkpIHtcbiAgICBpZiAodWkgJiYgdWkuaXRlbSkge1xuICAgICAgY29uc3QgaXRlbUxhYmVsID0gdHlwZW9mIHVpLml0ZW0gPT09ICdzdHJpbmcnID8gdWkuaXRlbSA6IHVpLml0ZW0ubGFiZWw7XG4gICAgICBjb25zdCBpdGVtVmFsdWUgPSB0eXBlb2YgdWkuaXRlbSA9PT0gJ3N0cmluZycgPyB1aS5pdGVtIDogdWkuaXRlbS52YWx1ZTtcbiAgICAgIHRoaXMuJGZpbHRlckVsbS52YWwoaXRlbUxhYmVsKTtcbiAgICAgIHRoaXMuY2FsbGJhY2soZXZlbnQsIHsgY29sdW1uRGVmOiB0aGlzLmNvbHVtbkRlZiwgb3BlcmF0b3I6IHRoaXMub3BlcmF0b3IsIHNlYXJjaFRlcm1zOiBbaXRlbVZhbHVlXSwgc2hvdWxkVHJpZ2dlclF1ZXJ5OiB0aGlzLl9zaG91bGRUcmlnZ2VyUXVlcnkgfSk7XG4gICAgICAvLyByZXNldCBib3RoIGZsYWdzIGZvciBuZXh0IHVzZVxuICAgICAgdGhpcy5fY2xlYXJGaWx0ZXJUcmlnZ2VyZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMuX3Nob3VsZFRyaWdnZXJRdWVyeSA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuIl19