import * as tslib_1 from "tslib";
import { OperatorType, } from './../models/index';
import { castToPromise, getDescendantProperty, htmlEncode, unsubscribeAllObservables } from '../services/utilities';
import { Subject } from 'rxjs';
import * as DOMPurify_ from 'dompurify';
const DOMPurify = DOMPurify_; // patch to fix rollup to work
export class SelectFilter {
    /**
     * Initialize the Filter
     */
    constructor(translate, collectionService, isMultipleSelect = true) {
        this.translate = translate;
        this.collectionService = collectionService;
        this.isMultipleSelect = isMultipleSelect;
        this._isFilterFirstRender = true;
        this._shouldTriggerQuery = true;
        this.isFilled = false;
        this.enableTranslateLabel = false;
        this.subscriptions = [];
        // default options used by this Filter, user can overwrite any of these by passing "otions"
        const options = {
            autoAdjustDropHeight: true,
            autoAdjustDropPosition: true,
            autoAdjustDropWidthByTextSize: true,
            container: 'body',
            filter: false,
            maxHeight: 275,
            single: true,
            textTemplate: ($elm) => {
                // render HTML code or not, by default it is sanitized and won't be rendered
                const isRenderHtmlEnabled = this.columnDef && this.columnDef.filter && this.columnDef.filter.enableRenderHtml || false;
                return isRenderHtmlEnabled ? $elm.text() : $elm.html();
            },
            onClose: () => {
                // we will subscribe to the onClose event for triggering our callback
                // also add/remove "filled" class for styling purposes
                const selectedItems = this.$filterElm.multipleSelect('getSelects');
                if (Array.isArray(selectedItems) && selectedItems.length > 1 || (selectedItems.length === 1 && selectedItems[0] !== '')) {
                    this.isFilled = true;
                    this.$filterElm.addClass('filled').siblings('div .search-filter').addClass('filled');
                }
                else {
                    this.isFilled = false;
                    this.$filterElm.removeClass('filled');
                    this.$filterElm.siblings('div .search-filter').removeClass('filled');
                }
                this.callback(undefined, { columnDef: this.columnDef, operator: this.operator, searchTerms: selectedItems, shouldTriggerQuery: this._shouldTriggerQuery });
                // reset flag for next use
                this._shouldTriggerQuery = true;
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
    /** Getter for the Column Filter itself */
    get columnFilter() {
        return this.columnDef && this.columnDef.filter;
    }
    /** Getter for the Collection Options */
    get collectionOptions() {
        return this.columnDef && this.columnDef.filter && this.columnDef.filter.collectionOptions;
    }
    /** Getter for the Custom Structure if exist */
    get customStructure() {
        return this.columnDef && this.columnDef.filter && this.columnDef.filter.customStructure;
    }
    /** Getter for the Grid Options pulled through the Grid Object */
    get gridOptions() {
        return (this.grid && this.grid.getOptions) ? this.grid.getOptions() : {};
    }
    /** Getter for the filter operator */
    get operator() {
        if (this.columnDef && this.columnDef.filter && this.columnDef.filter.operator) {
            return this.columnDef && this.columnDef.filter && this.columnDef.filter.operator;
        }
        return this.isMultipleSelect ? OperatorType.in : OperatorType.equal;
    }
    /**
     * Initialize the filter template
     */
    init(args, isFilterFirstRender) {
        this._isFilterFirstRender = isFilterFirstRender;
        this.grid = args.grid;
        this.callback = args.callback;
        this.columnDef = args.columnDef;
        this.searchTerms = args.searchTerms || [];
        if (!this.grid || !this.columnDef || !this.columnFilter || (!this.columnFilter.collection && !this.columnFilter.collectionAsync)) {
            throw new Error(`[Angular-SlickGrid] You need to pass a "collection" (or "collectionAsync") for the MultipleSelect/SingleSelect Filter to work correctly. Also each option should include a value/label pair (or value/labelKey when using Locale). For example:: { filter: model: Filters.multipleSelect, collection: [{ value: true, label: 'True' }, { value: false, label: 'False'}] }`);
        }
        this.enableTranslateLabel = this.columnFilter.enableTranslateLabel;
        this.labelName = this.customStructure && this.customStructure.label || 'label';
        this.labelPrefixName = this.customStructure && this.customStructure.labelPrefix || 'labelPrefix';
        this.labelSuffixName = this.customStructure && this.customStructure.labelSuffix || 'labelSuffix';
        this.optionLabel = this.customStructure && this.customStructure.optionLabel || 'value';
        this.valueName = this.customStructure && this.customStructure.value || 'value';
        if (this.enableTranslateLabel && (!this.translate || typeof this.translate.instant !== 'function')) {
            throw new Error(`[select-editor] The ngx-translate TranslateService is required for the Select Filter to work correctly`);
        }
        // always render the Select (dropdown) DOM element, even if user passed a "collectionAsync",
        // if that is the case, the Select will simply be without any options but we still have to render it (else SlickGrid would throw an error)
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
     * Clear the filter values
     */
    clear(shouldTriggerQuery = true) {
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
    }
    /**
     * destroy the filter
     */
    destroy() {
        if (this.$filterElm) {
            // remove event watcher
            this.$filterElm.off().remove();
            const elementClassName = this.elementName.toString().replace('.', '\\.'); // make sure to escape any dot "." from CSS class to avoid console error
            $(`[name=${elementClassName}].ms-drop`).remove();
        }
        // also dispose of all Subscriptions
        this.subscriptions = unsubscribeAllObservables(this.subscriptions);
    }
    /**
     * Set value(s) on the DOM element
     */
    setValues(values) {
        if (values) {
            values = Array.isArray(values) ? values : [values];
            this.$filterElm.multipleSelect('setSelects', values);
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
        if (this.columnDef && this.columnFilter && this.columnFilter.collectionFilterBy) {
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
        if (this.columnDef && this.columnFilter && this.columnFilter.collectionSortBy) {
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
            throw new Error('Something went wrong while trying to pull the collection from the "collectionAsync" call in the Select Filter, the collection is not a valid array.');
        }
        // copy over the array received from the async call to the "collection" as the new collection to use
        // this has to be BEFORE the `collectionObserver().subscribe` to avoid going into an infinite loop
        this.columnFilter.collection = collection;
        // recreate Multiple Select after getting async collection
        this.renderDomElement(collection);
    }
    renderDomElement(collection) {
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
        let newCollection = collection;
        // user might want to filter and/or sort certain items of the collection
        newCollection = this.filterCollection(newCollection);
        newCollection = this.sortCollection(newCollection);
        // step 1, create HTML string template
        const filterTemplate = this.buildTemplateHtmlString(newCollection, this.searchTerms);
        // step 2, create the DOM Element of the filter & pre-load search terms
        // also subscribe to the onClose event
        this.createDomElement(filterTemplate);
    }
    /**
     * Create the HTML template as a string
     */
    buildTemplateHtmlString(optionCollection, searchTerms) {
        let options = '';
        const fieldId = this.columnDef && this.columnDef.id;
        const separatorBetweenLabels = this.collectionOptions && this.collectionOptions.separatorBetweenTextLabels || '';
        const isRenderHtmlEnabled = this.columnFilter && this.columnFilter.enableRenderHtml || false;
        const sanitizedOptions = this.gridOptions && this.gridOptions.sanitizeHtmlOptions || {};
        // collection could be an Array of Strings OR Objects
        if (optionCollection.every(x => typeof x === 'string')) {
            optionCollection.forEach((option) => {
                const selected = (searchTerms.findIndex((term) => term === option) >= 0) ? 'selected' : '';
                options += `<option value="${option}" label="${option}" ${selected}>${option}</option>`;
                // if there's at least 1 search term found, we will add the "filled" class for styling purposes
                if (selected) {
                    this.isFilled = true;
                }
            });
        }
        else {
            // array of objects will require a label/value pair unless a customStructure is passed
            optionCollection.forEach((option) => {
                if (!option || (option[this.labelName] === undefined && option.labelKey === undefined)) {
                    throw new Error(`[select-filter] A collection with value/label (or value/labelKey when using Locale) is required to populate the Select list, for example:: { filter: model: Filters.multipleSelect, collection: [ { value: '1', label: 'One' } ]')`);
                }
                const labelKey = (option.labelKey || option[this.labelName]);
                const selected = (searchTerms.findIndex((term) => term === option[this.valueName]) >= 0) ? 'selected' : '';
                const labelText = ((option.labelKey || this.enableTranslateLabel) && labelKey) ? this.translate.instant(labelKey || ' ') : labelKey;
                let prefixText = option[this.labelPrefixName] || '';
                let suffixText = option[this.labelSuffixName] || '';
                let optionLabel = option[this.optionLabel] || '';
                optionLabel = optionLabel.toString().replace(/\"/g, '\''); // replace double quotes by single quotes to avoid interfering with regular html
                // also translate prefix/suffix if enableTranslateLabel is true and text is a string
                prefixText = (this.enableTranslateLabel && prefixText && typeof prefixText === 'string') ? this.translate.instant(prefixText || ' ') : prefixText;
                suffixText = (this.enableTranslateLabel && suffixText && typeof suffixText === 'string') ? this.translate.instant(suffixText || ' ') : suffixText;
                optionLabel = (this.enableTranslateLabel && optionLabel && typeof optionLabel === 'string') ? this.translate.instant(optionLabel || ' ') : optionLabel;
                // add to a temp array for joining purpose and filter out empty text
                const tmpOptionArray = [prefixText, labelText, suffixText].filter((text) => text);
                let optionText = tmpOptionArray.join(separatorBetweenLabels);
                // if user specifically wants to render html text, he needs to opt-in else it will stripped out by default
                // also, the 3rd party lib will saninitze any html code unless it's encoded, so we'll do that
                if (isRenderHtmlEnabled) {
                    // sanitize any unauthorized html tags like script and others
                    // for the remaining allowed tags we'll permit all attributes
                    const sanitizedText = DOMPurify.sanitize(optionText, sanitizedOptions);
                    optionText = htmlEncode(sanitizedText);
                }
                // html text of each select option
                options += `<option value="${option[this.valueName]}" label="${optionLabel}" ${selected}>${optionText}</option>`;
                // if there's at least 1 search term found, we will add the "filled" class for styling purposes
                if (selected) {
                    this.isFilled = true;
                }
            });
        }
        return `<select class="ms-filter search-filter filter-${fieldId}" ${this.isMultipleSelect ? 'multiple="multiple"' : ''}>${options}</select>`;
    }
    /** Create a blank entry that can be added to the collection. It will also reuse the same customStructure if need be */
    createBlankEntry() {
        const blankEntry = {
            [this.labelName]: '',
            [this.valueName]: ''
        };
        if (this.labelPrefixName) {
            blankEntry[this.labelPrefixName] = '';
        }
        if (this.labelSuffixName) {
            blankEntry[this.labelSuffixName] = '';
        }
        return blankEntry;
    }
    /**
     * From the html template string, create a DOM element
     * Subscribe to the onClose event and run the callback when that happens
     * @param filterTemplate
     */
    createDomElement(filterTemplate) {
        const fieldId = this.columnDef && this.columnDef.id;
        // provide the name attribute to the DOM element which will be needed to auto-adjust drop position (dropup / dropdown)
        this.elementName = `filter-${fieldId}`;
        this.defaultOptions.name = this.elementName;
        const $headerElm = this.grid.getHeaderRowColumn(fieldId);
        $($headerElm).empty();
        // create the DOM element & add an ID and filter class
        this.$filterElm = $(filterTemplate);
        if (typeof this.$filterElm.multipleSelect !== 'function') {
            throw new Error(`multiple-select.js was not found, make sure to modify your "angular-cli.json" file and include "../node_modules/angular-slickgrid/lib/multiple-select/multiple-select.js" and it's css or SASS file`);
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
        const elementOptions = Object.assign({}, this.defaultOptions, this.columnFilter.filterOptions);
        this.filterElmOptions = Object.assign({}, this.defaultOptions, elementOptions);
        this.$filterElm = this.$filterElm.multipleSelect(this.filterElmOptions);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0RmlsdGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9maWx0ZXJzL3NlbGVjdEZpbHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsT0FBTyxFQVVMLFlBQVksR0FJYixNQUFNLG1CQUFtQixDQUFDO0FBRTNCLE9BQU8sRUFBRSxhQUFhLEVBQUUscUJBQXFCLEVBQUUsVUFBVSxFQUFFLHlCQUF5QixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDcEgsT0FBTyxFQUFjLE9BQU8sRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFDekQsT0FBTyxLQUFLLFVBQVUsTUFBTSxXQUFXLENBQUM7QUFDeEMsTUFBTSxTQUFTLEdBQUcsVUFBVSxDQUFDLENBQUMsOEJBQThCO0FBSzVELE1BQU0sT0FBTyxZQUFZO0lBMkJ2Qjs7T0FFRztJQUNILFlBQXNCLFNBQTJCLEVBQVksaUJBQW9DLEVBQVksbUJBQW1CLElBQUk7UUFBOUcsY0FBUyxHQUFULFNBQVMsQ0FBa0I7UUFBWSxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQVkscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFPO1FBN0I1SCx5QkFBb0IsR0FBRyxJQUFJLENBQUM7UUFDNUIsd0JBQW1CLEdBQUcsSUFBSSxDQUFDO1FBZ0JuQyxhQUFRLEdBQUcsS0FBSyxDQUFDO1FBTWpCLHlCQUFvQixHQUFHLEtBQUssQ0FBQztRQUM3QixrQkFBYSxHQUFtQixFQUFFLENBQUM7UUFNakMsMkZBQTJGO1FBQzNGLE1BQU0sT0FBTyxHQUF5QjtZQUNwQyxvQkFBb0IsRUFBRSxJQUFJO1lBQzFCLHNCQUFzQixFQUFFLElBQUk7WUFDNUIsNkJBQTZCLEVBQUUsSUFBSTtZQUNuQyxTQUFTLEVBQUUsTUFBTTtZQUNqQixNQUFNLEVBQUUsS0FBSztZQUNiLFNBQVMsRUFBRSxHQUFHO1lBQ2QsTUFBTSxFQUFFLElB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QUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFMUMsZ0ZBQWdGO1FBQ2hGLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNqQixJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNwQztRQUVELCtDQUErQztRQUMvQyxJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsS0FBSyxVQUFVLEVBQUU7WUFDckUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDdEM7UUFFRCxxQ0FBcUM7UUFDckMsTUFBTSxjQUFjLHFCQUE4QixJQUFJLENBQUMsY0FBYyxFQUFLLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFFLENBQUM7UUFDNUcsSUFBSSxDQUFDLGdCQUFnQixxQkFBUSxJQUFJLENBQUMsY0FBYyxFQUFLLGNBQWMsQ0FBRSxDQUFDO1FBQ3RFLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDMUUsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xyXG5pbXBvcnQge1xyXG4gIENvbGxlY3Rpb25DdXN0b21TdHJ1Y3R1cmUsXHJcbiAgQ29sbGVjdGlvbk9wdGlvbixcclxuICBDb2x1bW4sXHJcbiAgQ29sdW1uRmlsdGVyLFxyXG4gIEZpbHRlcixcclxuICBGaWx0ZXJBcmd1bWVudHMsXHJcbiAgRmlsdGVyQ2FsbGJhY2ssXHJcbiAgR3JpZE9wdGlvbixcclxuICBNdWx0aXBsZVNlbGVjdE9wdGlvbixcclxuICBPcGVyYXRvclR5cGUsXHJcbiAgT3BlcmF0b3JTdHJpbmcsXHJcbiAgU2VhcmNoVGVybSxcclxuICBTZWxlY3RPcHRpb24sXHJcbn0gZnJvbSAnLi8uLi9tb2RlbHMvaW5kZXgnO1xyXG5pbXBvcnQgeyBDb2xsZWN0aW9uU2VydmljZSB9IGZyb20gJy4vLi4vc2VydmljZXMvY29sbGVjdGlvbi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgY2FzdFRvUHJvbWlzZSwgZ2V0RGVzY2VuZGFudFByb3BlcnR5LCBodG1sRW5jb2RlLCB1bnN1YnNjcmliZUFsbE9ic2VydmFibGVzIH0gZnJvbSAnLi4vc2VydmljZXMvdXRpbGl0aWVzJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCAqIGFzIERPTVB1cmlmeV8gZnJvbSAnZG9tcHVyaWZ5JztcclxuY29uc3QgRE9NUHVyaWZ5ID0gRE9NUHVyaWZ5XzsgLy8gcGF0Y2ggdG8gZml4IHJvbGx1cCB0byB3b3JrXHJcblxyXG4vLyB1c2luZyBleHRlcm5hbCBub24tdHlwZWQganMgbGlicmFyaWVzXHJcbmRlY2xhcmUgdmFyICQ6IGFueTtcclxuXHJcbmV4cG9ydCBjbGFzcyBTZWxlY3RGaWx0ZXIgaW1wbGVtZW50cyBGaWx0ZXIge1xyXG4gIHByaXZhdGUgX2lzRmlsdGVyRmlyc3RSZW5kZXIgPSB0cnVlO1xyXG4gIHByaXZhdGUgX3Nob3VsZFRyaWdnZXJRdWVyeSA9IHRydWU7XHJcblxyXG4gIC8qKiBET00gRWxlbWVudCBOYW1lLCB1c2VmdWwgZm9yIGF1dG8tZGV0ZWN0aW5nIHBvc2l0aW9uaW5nIChkcm9wdXAgLyBkcm9wZG93bikgKi9cclxuICBlbGVtZW50TmFtZTogc3RyaW5nO1xyXG5cclxuICAvKiogRmlsdGVyIE11bHRpcGxlLVNlbGVjdCBvcHRpb25zICovXHJcbiAgZmlsdGVyRWxtT3B0aW9uczogTXVsdGlwbGVTZWxlY3RPcHRpb247XHJcblxyXG4gIC8qKiBUaGUgSlF1ZXJ5IERPTSBlbGVtZW50ICovXHJcbiAgJGZpbHRlckVsbTogYW55O1xyXG5cclxuICBncmlkOiBhbnk7XHJcbiAgc2VhcmNoVGVybXM6IFNlYXJjaFRlcm1bXTtcclxuICBjb2x1bW5EZWY6IENvbHVtbjtcclxuICBjYWxsYmFjazogRmlsdGVyQ2FsbGJhY2s7XHJcbiAgZGVmYXVsdE9wdGlvbnM6IE11bHRpcGxlU2VsZWN0T3B0aW9uO1xyXG4gIGlzRmlsbGVkID0gZmFsc2U7XHJcbiAgbGFiZWxOYW1lOiBzdHJpbmc7XHJcbiAgbGFiZWxQcmVmaXhOYW1lOiBzdHJpbmc7XHJcbiAgbGFiZWxTdWZmaXhOYW1lOiBzdHJpbmc7XHJcbiAgb3B0aW9uTGFiZWw6IHN0cmluZztcclxuICB2YWx1ZU5hbWU6IHN0cmluZztcclxuICBlbmFibGVUcmFuc2xhdGVMYWJlbCA9IGZhbHNlO1xyXG4gIHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XHJcblxyXG4gIC8qKlxyXG4gICAqIEluaXRpYWxpemUgdGhlIEZpbHRlclxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCB0cmFuc2xhdGU6IFRyYW5zbGF0ZVNlcnZpY2UsIHByb3RlY3RlZCBjb2xsZWN0aW9uU2VydmljZTogQ29sbGVjdGlvblNlcnZpY2UsIHByb3RlY3RlZCBpc011bHRpcGxlU2VsZWN0ID0gdHJ1ZSkge1xyXG4gICAgLy8gZGVmYXVsdCBvcHRpb25zIHVzZWQgYnkgdGhpcyBGaWx0ZXIsIHVzZXIgY2FuIG92ZXJ3cml0ZSBhbnkgb2YgdGhlc2UgYnkgcGFzc2luZyBcIm90aW9uc1wiXHJcbiAgICBjb25zdCBvcHRpb25zOiBNdWx0aXBsZVNlbGVjdE9wdGlvbiA9IHtcclxuICAgICAgYXV0b0FkanVzdERyb3BIZWlnaHQ6IHRydWUsXHJcbiAgICAgIGF1dG9BZGp1c3REcm9wUG9zaXRpb246IHRydWUsXHJcbiAgICAgIGF1dG9BZGp1c3REcm9wV2lkdGhCeVRleHRTaXplOiB0cnVlLFxyXG4gICAgICBjb250YWluZXI6ICdib2R5JyxcclxuICAgICAgZmlsdGVyOiBmYWxzZSwgIC8vIGlucHV0IHNlYXJjaCB0ZXJtIG9uIHRvcCBvZiB0aGUgc2VsZWN0IG9wdGlvbiBsaXN0XHJcbiAgICAgIG1heEhlaWdodDogMjc1LFxyXG4gICAgICBzaW5nbGU6IHRydWUsXHJcblxyXG4gICAgICB0ZXh0VGVtcGxhdGU6ICgkZWxtKSA9PiB7XHJcbiAgICAgICAgLy8gcmVuZGVyIEhUTUwgY29kZSBvciBub3QsIGJ5IGRlZmF1bHQgaXQgaXMgc2FuaXRpemVkIGFuZCB3b24ndCBiZSByZW5kZXJlZFxyXG4gICAgICAgIGNvbnN0IGlzUmVuZGVySHRtbEVuYWJsZWQgPSB0aGlzLmNvbHVtbkRlZiAmJiB0aGlzLmNvbHVtbkRlZi5maWx0ZXIgJiYgdGhpcy5jb2x1bW5EZWYuZmlsdGVyLmVuYWJsZVJlbmRlckh0bWwgfHwgZmFsc2U7XHJcbiAgICAgICAgcmV0dXJuIGlzUmVuZGVySHRtbEVuYWJsZWQgPyAkZWxtLnRleHQoKSA6ICRlbG0uaHRtbCgpO1xyXG4gICAgICB9LFxyXG4gICAgICBvbkNsb3NlOiAoKSA9PiB7XHJcbiAgICAgICAgLy8gd2Ugd2lsbCBzdWJzY3JpYmUgdG8gdGhlIG9uQ2xvc2UgZXZlbnQgZm9yIHRyaWdnZXJpbmcgb3VyIGNhbGxiYWNrXHJcbiAgICAgICAgLy8gYWxzbyBhZGQvcmVtb3ZlIFwiZmlsbGVkXCIgY2xhc3MgZm9yIHN0eWxpbmcgcHVycG9zZXNcclxuICAgICAgICBjb25zdCBzZWxlY3RlZEl0ZW1zID0gdGhpcy4kZmlsdGVyRWxtLm11bHRpcGxlU2VsZWN0KCdnZXRTZWxlY3RzJyk7XHJcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoc2VsZWN0ZWRJdGVtcykgJiYgc2VsZWN0ZWRJdGVtcy5sZW5ndGggPiAxIHx8IChzZWxlY3RlZEl0ZW1zLmxlbmd0aCA9PT0gMSAmJiBzZWxlY3RlZEl0ZW1zWzBdICE9PSAnJykpIHtcclxuICAgICAgICAgIHRoaXMuaXNGaWxsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgdGhpcy4kZmlsdGVyRWxtLmFkZENsYXNzKCdmaWxsZWQnKS5zaWJsaW5ncygnZGl2IC5zZWFyY2gtZmlsdGVyJykuYWRkQ2xhc3MoJ2ZpbGxlZCcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLmlzRmlsbGVkID0gZmFsc2U7XHJcbiAgICAgICAgICB0aGlzLiRmaWx0ZXJFbG0ucmVtb3ZlQ2xhc3MoJ2ZpbGxlZCcpO1xyXG4gICAgICAgICAgdGhpcy4kZmlsdGVyRWxtLnNpYmxpbmdzKCdkaXYgLnNlYXJjaC1maWx0ZXInKS5yZW1vdmVDbGFzcygnZmlsbGVkJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmNhbGxiYWNrKHVuZGVmaW5lZCwgeyBjb2x1bW5EZWY6IHRoaXMuY29sdW1uRGVmLCBvcGVyYXRvcjogdGhpcy5vcGVyYXRvciwgc2VhcmNoVGVybXM6IHNlbGVjdGVkSXRlbXMsIHNob3VsZFRyaWdnZXJRdWVyeTogdGhpcy5fc2hvdWxkVHJpZ2dlclF1ZXJ5IH0pO1xyXG4gICAgICAgIC8vIHJlc2V0IGZsYWcgZm9yIG5leHQgdXNlXHJcbiAgICAgICAgdGhpcy5fc2hvdWxkVHJpZ2dlclF1ZXJ5ID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBpZiAodGhpcy5pc011bHRpcGxlU2VsZWN0KSB7XHJcbiAgICAgIG9wdGlvbnMuc2luZ2xlID0gZmFsc2U7XHJcbiAgICAgIG9wdGlvbnMub2tCdXR0b24gPSB0cnVlO1xyXG4gICAgICBvcHRpb25zLmFkZFRpdGxlID0gdHJ1ZTsgLy8gc2hvdyB0b29sdGlwIG9mIGFsbCBzZWxlY3RlZCBpdGVtcyB3aGlsZSBob3ZlcmluZyB0aGUgZmlsdGVyXHJcbiAgICAgIG9wdGlvbnMuY291bnRTZWxlY3RlZCA9IHRoaXMudHJhbnNsYXRlLmluc3RhbnQoJ1hfT0ZfWV9TRUxFQ1RFRCcpO1xyXG4gICAgICBvcHRpb25zLmFsbFNlbGVjdGVkID0gdGhpcy50cmFuc2xhdGUuaW5zdGFudCgnQUxMX1NFTEVDVEVEJyk7XHJcbiAgICAgIG9wdGlvbnMuc2VsZWN0QWxsVGV4dCA9IHRoaXMudHJhbnNsYXRlLmluc3RhbnQoJ1NFTEVDVF9BTEwnKTtcclxuICAgICAgb3B0aW9ucy5zZWxlY3RBbGxEZWxpbWl0ZXIgPSBbJycsICcnXTsgLy8gcmVtb3ZlIGRlZmF1bHQgc3F1YXJlIGJyYWNrZXRzIG9mIGRlZmF1bHQgdGV4dCBcIltTZWxlY3QgQWxsXVwiID0+IFwiU2VsZWN0IEFsbFwiXHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5kZWZhdWx0T3B0aW9ucyA9IG9wdGlvbnM7XHJcbiAgfVxyXG5cclxuICAvKiogR2V0dGVyIGZvciB0aGUgQ29sdW1uIEZpbHRlciBpdHNlbGYgKi9cclxuICBwcm90ZWN0ZWQgZ2V0IGNvbHVtbkZpbHRlcigpOiBDb2x1bW5GaWx0ZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuY29sdW1uRGVmICYmIHRoaXMuY29sdW1uRGVmLmZpbHRlcjtcclxuICB9XHJcblxyXG4gIC8qKiBHZXR0ZXIgZm9yIHRoZSBDb2xsZWN0aW9uIE9wdGlvbnMgKi9cclxuICBwcm90ZWN0ZWQgZ2V0IGNvbGxlY3Rpb25PcHRpb25zKCk6IENvbGxlY3Rpb25PcHRpb24ge1xyXG4gICAgcmV0dXJuIHRoaXMuY29sdW1uRGVmICYmIHRoaXMuY29sdW1uRGVmLmZpbHRlciAmJiB0aGlzLmNvbHVtbkRlZi5maWx0ZXIuY29sbGVjdGlvbk9wdGlvbnM7XHJcbiAgfVxyXG5cclxuICAvKiogR2V0dGVyIGZvciB0aGUgQ3VzdG9tIFN0cnVjdHVyZSBpZiBleGlzdCAqL1xyXG4gIHByb3RlY3RlZCBnZXQgY3VzdG9tU3RydWN0dXJlKCk6IENvbGxlY3Rpb25DdXN0b21TdHJ1Y3R1cmUge1xyXG4gICAgcmV0dXJuIHRoaXMuY29sdW1uRGVmICYmIHRoaXMuY29sdW1uRGVmLmZpbHRlciAmJiB0aGlzLmNvbHVtbkRlZi5maWx0ZXIuY3VzdG9tU3RydWN0dXJlO1xyXG4gIH1cclxuXHJcbiAgLyoqIEdldHRlciBmb3IgdGhlIEdyaWQgT3B0aW9ucyBwdWxsZWQgdGhyb3VnaCB0aGUgR3JpZCBPYmplY3QgKi9cclxuICBwcm90ZWN0ZWQgZ2V0IGdyaWRPcHRpb25zKCk6IEdyaWRPcHRpb24ge1xyXG4gICAgcmV0dXJuICh0aGlzLmdyaWQgJiYgdGhpcy5ncmlkLmdldE9wdGlvbnMpID8gdGhpcy5ncmlkLmdldE9wdGlvbnMoKSA6IHt9O1xyXG4gIH1cclxuXHJcbiAgLyoqIEdldHRlciBmb3IgdGhlIGZpbHRlciBvcGVyYXRvciAqL1xyXG4gIGdldCBvcGVyYXRvcigpOiBPcGVyYXRvclR5cGUgfCBPcGVyYXRvclN0cmluZyB7XHJcbiAgICBpZiAodGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYuZmlsdGVyICYmIHRoaXMuY29sdW1uRGVmLmZpbHRlci5vcGVyYXRvcikge1xyXG4gICAgICByZXR1cm4gdGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYuZmlsdGVyICYmIHRoaXMuY29sdW1uRGVmLmZpbHRlci5vcGVyYXRvcjtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLmlzTXVsdGlwbGVTZWxlY3QgPyBPcGVyYXRvclR5cGUuaW4gOiBPcGVyYXRvclR5cGUuZXF1YWw7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbml0aWFsaXplIHRoZSBmaWx0ZXIgdGVtcGxhdGVcclxuICAgKi9cclxuICBpbml0KGFyZ3M6IEZpbHRlckFyZ3VtZW50cywgaXNGaWx0ZXJGaXJzdFJlbmRlcjogYm9vbGVhbikge1xyXG4gICAgdGhpcy5faXNGaWx0ZXJGaXJzdFJlbmRlciA9IGlzRmlsdGVyRmlyc3RSZW5kZXI7XHJcbiAgICB0aGlzLmdyaWQgPSBhcmdzLmdyaWQ7XHJcbiAgICB0aGlzLmNhbGxiYWNrID0gYXJncy5jYWxsYmFjaztcclxuICAgIHRoaXMuY29sdW1uRGVmID0gYXJncy5jb2x1bW5EZWY7XHJcbiAgICB0aGlzLnNlYXJjaFRlcm1zID0gYXJncy5zZWFyY2hUZXJtcyB8fCBbXTtcclxuXHJcbiAgICBpZiAoIXRoaXMuZ3JpZCB8fCAhdGhpcy5jb2x1bW5EZWYgfHwgIXRoaXMuY29sdW1uRmlsdGVyIHx8ICghdGhpcy5jb2x1bW5GaWx0ZXIuY29sbGVjdGlvbiAmJiAhdGhpcy5jb2x1bW5GaWx0ZXIuY29sbGVjdGlvbkFzeW5jKSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFtBbmd1bGFyLVNsaWNrR3JpZF0gWW91IG5lZWQgdG8gcGFzcyBhIFwiY29sbGVjdGlvblwiIChvciBcImNvbGxlY3Rpb25Bc3luY1wiKSBmb3IgdGhlIE11bHRpcGxlU2VsZWN0L1NpbmdsZVNlbGVjdCBGaWx0ZXIgdG8gd29yayBjb3JyZWN0bHkuIEFsc28gZWFjaCBvcHRpb24gc2hvdWxkIGluY2x1ZGUgYSB2YWx1ZS9sYWJlbCBwYWlyIChvciB2YWx1ZS9sYWJlbEtleSB3aGVuIHVzaW5nIExvY2FsZSkuIEZvciBleGFtcGxlOjogeyBmaWx0ZXI6IG1vZGVsOiBGaWx0ZXJzLm11bHRpcGxlU2VsZWN0LCBjb2xsZWN0aW9uOiBbeyB2YWx1ZTogdHJ1ZSwgbGFiZWw6ICdUcnVlJyB9LCB7IHZhbHVlOiBmYWxzZSwgbGFiZWw6ICdGYWxzZSd9XSB9YCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5lbmFibGVUcmFuc2xhdGVMYWJlbCA9IHRoaXMuY29sdW1uRmlsdGVyLmVuYWJsZVRyYW5zbGF0ZUxhYmVsO1xyXG4gICAgdGhpcy5sYWJlbE5hbWUgPSB0aGlzLmN1c3RvbVN0cnVjdHVyZSAmJiB0aGlzLmN1c3RvbVN0cnVjdHVyZS5sYWJlbCB8fCAnbGFiZWwnO1xyXG4gICAgdGhpcy5sYWJlbFByZWZpeE5hbWUgPSB0aGlzLmN1c3RvbVN0cnVjdHVyZSAmJiB0aGlzLmN1c3RvbVN0cnVjdHVyZS5sYWJlbFByZWZpeCB8fCAnbGFiZWxQcmVmaXgnO1xyXG4gICAgdGhpcy5sYWJlbFN1ZmZpeE5hbWUgPSB0aGlzLmN1c3RvbVN0cnVjdHVyZSAmJiB0aGlzLmN1c3RvbVN0cnVjdHVyZS5sYWJlbFN1ZmZpeCB8fCAnbGFiZWxTdWZmaXgnO1xyXG4gICAgdGhpcy5vcHRpb25MYWJlbCA9IHRoaXMuY3VzdG9tU3RydWN0dXJlICYmIHRoaXMuY3VzdG9tU3RydWN0dXJlLm9wdGlvbkxhYmVsIHx8ICd2YWx1ZSc7XHJcbiAgICB0aGlzLnZhbHVlTmFtZSA9IHRoaXMuY3VzdG9tU3RydWN0dXJlICYmIHRoaXMuY3VzdG9tU3RydWN0dXJlLnZhbHVlIHx8ICd2YWx1ZSc7XHJcblxyXG4gICAgaWYgKHRoaXMuZW5hYmxlVHJhbnNsYXRlTGFiZWwgJiYgKCF0aGlzLnRyYW5zbGF0ZSB8fCB0eXBlb2YgdGhpcy50cmFuc2xhdGUuaW5zdGFudCAhPT0gJ2Z1bmN0aW9uJykpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBbc2VsZWN0LWVkaXRvcl0gVGhlIG5neC10cmFuc2xhdGUgVHJhbnNsYXRlU2VydmljZSBpcyByZXF1aXJlZCBmb3IgdGhlIFNlbGVjdCBGaWx0ZXIgdG8gd29yayBjb3JyZWN0bHlgKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBhbHdheXMgcmVuZGVyIHRoZSBTZWxlY3QgKGRyb3Bkb3duKSBET00gZWxlbWVudCwgZXZlbiBpZiB1c2VyIHBhc3NlZCBhIFwiY29sbGVjdGlvbkFzeW5jXCIsXHJcbiAgICAvLyBpZiB0aGF0IGlzIHRoZSBjYXNlLCB0aGUgU2VsZWN0IHdpbGwgc2ltcGx5IGJlIHdpdGhvdXQgYW55IG9wdGlvbnMgYnV0IHdlIHN0aWxsIGhhdmUgdG8gcmVuZGVyIGl0IChlbHNlIFNsaWNrR3JpZCB3b3VsZCB0aHJvdyBhbiBlcnJvcilcclxuICAgIGNvbnN0IG5ld0NvbGxlY3Rpb24gPSB0aGlzLmNvbHVtbkZpbHRlci5jb2xsZWN0aW9uIHx8IFtdO1xyXG4gICAgdGhpcy5yZW5kZXJEb21FbGVtZW50KG5ld0NvbGxlY3Rpb24pO1xyXG5cclxuICAgIC8vIG9uIGV2ZXJ5IEZpbHRlciB3aGljaCBoYXZlIGEgXCJjb2xsZWN0aW9uXCIgb3IgYSBcImNvbGxlY3Rpb25Bc3luY1wiXHJcbiAgICAvLyB3ZSB3aWxsIGFkZCAob3IgcmVwbGFjZSkgYSBTdWJqZWN0IHRvIHRoZSBcImNvbGxlY3Rpb25Bc3luY1wiIHByb3BlcnR5IHNvIHRoYXQgdXNlciBoYXMgcG9zc2liaWxpdHkgdG8gY2hhbmdlIHRoZSBjb2xsZWN0aW9uXHJcbiAgICAvLyBpZiBcImNvbGxlY3Rpb25Bc3luY1wiIGlzIGFscmVhZHkgc2V0IGJ5IHRoZSB1c2VyLCBpdCB3aWxsIHJlc29sdmUgaXQgZmlyc3QgdGhlbiBhZnRlciBpdCB3aWxsIHJlcGxhY2UgaXQgd2l0aCBhIFN1YmplY3RcclxuICAgIGNvbnN0IGNvbGxlY3Rpb25Bc3luYyA9IHRoaXMuY29sdW1uRmlsdGVyICYmIHRoaXMuY29sdW1uRmlsdGVyLmNvbGxlY3Rpb25Bc3luYztcclxuICAgIGlmIChjb2xsZWN0aW9uQXN5bmMpIHtcclxuICAgICAgdGhpcy5yZW5kZXJPcHRpb25zQXN5bmMoY29sbGVjdGlvbkFzeW5jKTsgLy8gY3JlYXRlIFN1YmplY3QgYWZ0ZXIgcmVzb2x2ZSAoY3JlYXRlQ29sbGVjdGlvbkFzeW5jU3ViamVjdClcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENsZWFyIHRoZSBmaWx0ZXIgdmFsdWVzXHJcbiAgICovXHJcbiAgY2xlYXIoc2hvdWxkVHJpZ2dlclF1ZXJ5ID0gdHJ1ZSkge1xyXG4gICAgaWYgKHRoaXMuJGZpbHRlckVsbSAmJiB0aGlzLiRmaWx0ZXJFbG0ubXVsdGlwbGVTZWxlY3QpIHtcclxuICAgICAgLy8gcmVsb2FkIHRoZSBmaWx0ZXIgZWxlbWVudCBieSBpdCdzIGlkLCB0byBtYWtlIHN1cmUgaXQncyBzdGlsbCBhIHZhbGlkIGVsZW1lbnQgKGJlY2F1c2Ugb2Ygc29tZSBpc3N1ZSBpbiB0aGUgR3JhcGhRTCBleGFtcGxlKVxyXG4gICAgICB0aGlzLiRmaWx0ZXJFbG0ubXVsdGlwbGVTZWxlY3QoJ3NldFNlbGVjdHMnLCBbXSk7XHJcbiAgICAgIHRoaXMuJGZpbHRlckVsbS5yZW1vdmVDbGFzcygnZmlsbGVkJyk7XHJcbiAgICAgIHRoaXMuJGZpbHRlckVsbS5zaWJsaW5ncygnZGl2IC5zZWFyY2gtZmlsdGVyJykucmVtb3ZlQ2xhc3MoJ2ZpbGxlZCcpO1xyXG4gICAgICB0aGlzLnNlYXJjaFRlcm1zID0gW107XHJcbiAgICAgIHRoaXMuX3Nob3VsZFRyaWdnZXJRdWVyeSA9IHNob3VsZFRyaWdnZXJRdWVyeTtcclxuICAgICAgdGhpcy5jYWxsYmFjayh1bmRlZmluZWQsIHsgY29sdW1uRGVmOiB0aGlzLmNvbHVtbkRlZiwgY2xlYXJGaWx0ZXJUcmlnZ2VyZWQ6IHRydWUsIHNob3VsZFRyaWdnZXJRdWVyeTogdGhpcy5fc2hvdWxkVHJpZ2dlclF1ZXJ5IH0pO1xyXG4gICAgICAvLyByZXNldCBib3RoIGZsYWdzIGZvciBuZXh0IHVzZVxyXG4gICAgICB0aGlzLl9zaG91bGRUcmlnZ2VyUXVlcnkgPSB0cnVlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogZGVzdHJveSB0aGUgZmlsdGVyXHJcbiAgICovXHJcbiAgZGVzdHJveSgpIHtcclxuICAgIGlmICh0aGlzLiRmaWx0ZXJFbG0pIHtcclxuICAgICAgLy8gcmVtb3ZlIGV2ZW50IHdhdGNoZXJcclxuICAgICAgdGhpcy4kZmlsdGVyRWxtLm9mZigpLnJlbW92ZSgpO1xyXG4gICAgICBjb25zdCBlbGVtZW50Q2xhc3NOYW1lID0gdGhpcy5lbGVtZW50TmFtZS50b1N0cmluZygpLnJlcGxhY2UoJy4nLCAnXFxcXC4nKTsgLy8gbWFrZSBzdXJlIHRvIGVzY2FwZSBhbnkgZG90IFwiLlwiIGZyb20gQ1NTIGNsYXNzIHRvIGF2b2lkIGNvbnNvbGUgZXJyb3JcclxuICAgICAgJChgW25hbWU9JHtlbGVtZW50Q2xhc3NOYW1lfV0ubXMtZHJvcGApLnJlbW92ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGFsc28gZGlzcG9zZSBvZiBhbGwgU3Vic2NyaXB0aW9uc1xyXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zID0gdW5zdWJzY3JpYmVBbGxPYnNlcnZhYmxlcyh0aGlzLnN1YnNjcmlwdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0IHZhbHVlKHMpIG9uIHRoZSBET00gZWxlbWVudFxyXG4gICAqL1xyXG4gIHNldFZhbHVlcyh2YWx1ZXM6IFNlYXJjaFRlcm0gfCBTZWFyY2hUZXJtW10pIHtcclxuICAgIGlmICh2YWx1ZXMpIHtcclxuICAgICAgdmFsdWVzID0gQXJyYXkuaXNBcnJheSh2YWx1ZXMpID8gdmFsdWVzIDogW3ZhbHVlc107XHJcbiAgICAgIHRoaXMuJGZpbHRlckVsbS5tdWx0aXBsZVNlbGVjdCgnc2V0U2VsZWN0cycsIHZhbHVlcyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvL1xyXG4gIC8vIHByb3RlY3RlZCBmdW5jdGlvbnNcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgLyoqXHJcbiAgICogdXNlciBtaWdodCB3YW50IHRvIGZpbHRlciBjZXJ0YWluIGl0ZW1zIG9mIHRoZSBjb2xsZWN0aW9uXHJcbiAgICogQHBhcmFtIGlucHV0Q29sbGVjdGlvblxyXG4gICAqIEByZXR1cm4gb3V0cHV0Q29sbGVjdGlvbiBmaWx0ZXJlZCBhbmQvb3Igc29ydGVkIGNvbGxlY3Rpb25cclxuICAgKi9cclxuICBwcm90ZWN0ZWQgZmlsdGVyQ29sbGVjdGlvbihpbnB1dENvbGxlY3Rpb24pIHtcclxuICAgIGxldCBvdXRwdXRDb2xsZWN0aW9uID0gaW5wdXRDb2xsZWN0aW9uO1xyXG5cclxuICAgIC8vIHVzZXIgbWlnaHQgd2FudCB0byBmaWx0ZXIgY2VydGFpbiBpdGVtcyBvZiB0aGUgY29sbGVjdGlvblxyXG4gICAgaWYgKHRoaXMuY29sdW1uRGVmICYmIHRoaXMuY29sdW1uRmlsdGVyICYmIHRoaXMuY29sdW1uRmlsdGVyLmNvbGxlY3Rpb25GaWx0ZXJCeSkge1xyXG4gICAgICBjb25zdCBmaWx0ZXJCeSA9IHRoaXMuY29sdW1uRmlsdGVyLmNvbGxlY3Rpb25GaWx0ZXJCeTtcclxuICAgICAgY29uc3QgZmlsdGVyQ29sbGVjdGlvbkJ5ID0gdGhpcy5jb2x1bW5GaWx0ZXIuY29sbGVjdGlvbk9wdGlvbnMgJiYgdGhpcy5jb2x1bW5GaWx0ZXIuY29sbGVjdGlvbk9wdGlvbnMuZmlsdGVyUmVzdWx0QWZ0ZXJFYWNoUGFzcyB8fCBudWxsO1xyXG4gICAgICBvdXRwdXRDb2xsZWN0aW9uID0gdGhpcy5jb2xsZWN0aW9uU2VydmljZS5maWx0ZXJDb2xsZWN0aW9uKG91dHB1dENvbGxlY3Rpb24sIGZpbHRlckJ5LCBmaWx0ZXJDb2xsZWN0aW9uQnkpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBvdXRwdXRDb2xsZWN0aW9uO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogdXNlciBtaWdodCB3YW50IHRvIHNvcnQgdGhlIGNvbGxlY3Rpb24gaW4gYSBjZXJ0YWluIHdheVxyXG4gICAqIEBwYXJhbSBpbnB1dENvbGxlY3Rpb25cclxuICAgKiBAcmV0dXJuIG91dHB1dENvbGxlY3Rpb24gZmlsdGVyZWQgYW5kL29yIHNvcnRlZCBjb2xsZWN0aW9uXHJcbiAgICovXHJcbiAgcHJvdGVjdGVkIHNvcnRDb2xsZWN0aW9uKGlucHV0Q29sbGVjdGlvbikge1xyXG4gICAgbGV0IG91dHB1dENvbGxlY3Rpb24gPSBpbnB1dENvbGxlY3Rpb247XHJcblxyXG4gICAgLy8gdXNlciBtaWdodCB3YW50IHRvIHNvcnQgdGhlIGNvbGxlY3Rpb25cclxuICAgIGlmICh0aGlzLmNvbHVtbkRlZiAmJiB0aGlzLmNvbHVtbkZpbHRlciAmJiB0aGlzLmNvbHVtbkZpbHRlci5jb2xsZWN0aW9uU29ydEJ5KSB7XHJcbiAgICAgIGNvbnN0IHNvcnRCeSA9IHRoaXMuY29sdW1uRmlsdGVyLmNvbGxlY3Rpb25Tb3J0Qnk7XHJcbiAgICAgIG91dHB1dENvbGxlY3Rpb24gPSB0aGlzLmNvbGxlY3Rpb25TZXJ2aWNlLnNvcnRDb2xsZWN0aW9uKHRoaXMuY29sdW1uRGVmLCBvdXRwdXRDb2xsZWN0aW9uLCBzb3J0QnksIHRoaXMuZW5hYmxlVHJhbnNsYXRlTGFiZWwpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBvdXRwdXRDb2xsZWN0aW9uO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGFzeW5jIHJlbmRlck9wdGlvbnNBc3luYyhjb2xsZWN0aW9uQXN5bmM6IFByb21pc2U8YW55PiB8IE9ic2VydmFibGU8YW55PiB8IFN1YmplY3Q8YW55Pikge1xyXG4gICAgbGV0IGF3YWl0ZWRDb2xsZWN0aW9uOiBhbnkgPSBbXTtcclxuXHJcbiAgICBpZiAoY29sbGVjdGlvbkFzeW5jKSB7XHJcbiAgICAgIGF3YWl0ZWRDb2xsZWN0aW9uID0gYXdhaXQgY2FzdFRvUHJvbWlzZShjb2xsZWN0aW9uQXN5bmMpO1xyXG4gICAgICB0aGlzLnJlbmRlckRvbUVsZW1lbnRGcm9tQ29sbGVjdGlvbkFzeW5jKGF3YWl0ZWRDb2xsZWN0aW9uKTtcclxuXHJcbiAgICAgIC8vIGJlY2F1c2Ugd2UgYWNjZXB0IFByb21pc2VzICYgSHR0cENsaWVudCBPYnNlcnZhYmxlIG9ubHkgZXhlY3V0ZSBvbmNlXHJcbiAgICAgIC8vIHdlIHdpbGwgcmUtY3JlYXRlIGFuIFJ4SnMgU3ViamVjdCB3aGljaCB3aWxsIHJlcGxhY2UgdGhlIFwiY29sbGVjdGlvbkFzeW5jXCIgd2hpY2ggZ290IGV4ZWN1dGVkIG9uY2UgYW55d2F5XHJcbiAgICAgIC8vIGRvaW5nIHRoaXMgcHJvdmlkZSB0aGUgdXNlciBhIHdheSB0byBjYWxsIGEgXCJjb2xsZWN0aW9uQXN5bmMubmV4dCgpXCJcclxuICAgICAgdGhpcy5jcmVhdGVDb2xsZWN0aW9uQXN5bmNTdWJqZWN0KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKiogQ3JlYXRlIG9yIHJlY3JlYXRlIGFuIE9ic2VydmFibGUgU3ViamVjdCBhbmQgcmVhc3NpZ24gaXQgdG8gdGhlIFwiY29sbGVjdGlvbkFzeW5jXCIgb2JqZWN0IHNvIHVzZXIgY2FuIGNhbGwgYSBcImNvbGxlY3Rpb25Bc3luYy5uZXh0KClcIiBvbiBpdCAqL1xyXG4gIHByb3RlY3RlZCBjcmVhdGVDb2xsZWN0aW9uQXN5bmNTdWJqZWN0KCkge1xyXG4gICAgY29uc3QgbmV3Q29sbGVjdGlvbkFzeW5jID0gbmV3IFN1YmplY3Q8YW55PigpO1xyXG4gICAgdGhpcy5jb2x1bW5GaWx0ZXIuY29sbGVjdGlvbkFzeW5jID0gbmV3Q29sbGVjdGlvbkFzeW5jO1xyXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goXHJcbiAgICAgIG5ld0NvbGxlY3Rpb25Bc3luYy5zdWJzY3JpYmUoY29sbGVjdGlvbiA9PiB0aGlzLnJlbmRlckRvbUVsZW1lbnRGcm9tQ29sbGVjdGlvbkFzeW5jKGNvbGxlY3Rpb24pKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZW4gdXNlciB1c2UgYSBDb2xsZWN0aW9uQXN5bmMgd2Ugd2lsbCB1c2UgdGhlIHJldHVybmVkIGNvbGxlY3Rpb24gdG8gcmVuZGVyIHRoZSBmaWx0ZXIgRE9NIGVsZW1lbnRcclxuICAgKiBhbmQgcmVpbml0aWFsaXplIGZpbHRlciBjb2xsZWN0aW9uIHdpdGggdGhpcyBuZXcgY29sbGVjdGlvblxyXG4gICAqL1xyXG4gIHByb3RlY3RlZCByZW5kZXJEb21FbGVtZW50RnJvbUNvbGxlY3Rpb25Bc3luYyhjb2xsZWN0aW9uKSB7XHJcbiAgICBpZiAodGhpcy5jb2xsZWN0aW9uT3B0aW9ucyAmJiB0aGlzLmNvbGxlY3Rpb25PcHRpb25zLmNvbGxlY3Rpb25Jbk9iamVjdFByb3BlcnR5KSB7XHJcbiAgICAgIGNvbGxlY3Rpb24gPSBnZXREZXNjZW5kYW50UHJvcGVydHkoY29sbGVjdGlvbiwgdGhpcy5jb2xsZWN0aW9uT3B0aW9ucy5jb2xsZWN0aW9uSW5PYmplY3RQcm9wZXJ0eSk7XHJcbiAgICB9XHJcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoY29sbGVjdGlvbikpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdTb21ldGhpbmcgd2VudCB3cm9uZyB3aGlsZSB0cnlpbmcgdG8gcHVsbCB0aGUgY29sbGVjdGlvbiBmcm9tIHRoZSBcImNvbGxlY3Rpb25Bc3luY1wiIGNhbGwgaW4gdGhlIFNlbGVjdCBGaWx0ZXIsIHRoZSBjb2xsZWN0aW9uIGlzIG5vdCBhIHZhbGlkIGFycmF5LicpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGNvcHkgb3ZlciB0aGUgYXJyYXkgcmVjZWl2ZWQgZnJvbSB0aGUgYXN5bmMgY2FsbCB0byB0aGUgXCJjb2xsZWN0aW9uXCIgYXMgdGhlIG5ldyBjb2xsZWN0aW9uIHRvIHVzZVxyXG4gICAgLy8gdGhpcyBoYXMgdG8gYmUgQkVGT1JFIHRoZSBgY29sbGVjdGlvbk9ic2VydmVyKCkuc3Vic2NyaWJlYCB0byBhdm9pZCBnb2luZyBpbnRvIGFuIGluZmluaXRlIGxvb3BcclxuICAgIHRoaXMuY29sdW1uRmlsdGVyLmNvbGxlY3Rpb24gPSBjb2xsZWN0aW9uO1xyXG5cclxuICAgIC8vIHJlY3JlYXRlIE11bHRpcGxlIFNlbGVjdCBhZnRlciBnZXR0aW5nIGFzeW5jIGNvbGxlY3Rpb25cclxuICAgIHRoaXMucmVuZGVyRG9tRWxlbWVudChjb2xsZWN0aW9uKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCByZW5kZXJEb21FbGVtZW50KGNvbGxlY3Rpb24pIHtcclxuICAgIGlmICghQXJyYXkuaXNBcnJheShjb2xsZWN0aW9uKSAmJiB0aGlzLmNvbGxlY3Rpb25PcHRpb25zICYmIHRoaXMuY29sbGVjdGlvbk9wdGlvbnMuY29sbGVjdGlvbkluT2JqZWN0UHJvcGVydHkpIHtcclxuICAgICAgY29sbGVjdGlvbiA9IGdldERlc2NlbmRhbnRQcm9wZXJ0eShjb2xsZWN0aW9uLCB0aGlzLmNvbGxlY3Rpb25PcHRpb25zLmNvbGxlY3Rpb25Jbk9iamVjdFByb3BlcnR5KTtcclxuICAgIH1cclxuICAgIGlmICghQXJyYXkuaXNBcnJheShjb2xsZWN0aW9uKSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBcImNvbGxlY3Rpb25cIiBwYXNzZWQgdG8gdGhlIFNlbGVjdCBGaWx0ZXIgaXMgbm90IGEgdmFsaWQgYXJyYXknKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyB1c2VyIGNhbiBvcHRpb25hbGx5IGFkZCBhIGJsYW5rIGVudHJ5IGF0IHRoZSBiZWdpbm5pbmcgb2YgdGhlIGNvbGxlY3Rpb25cclxuICAgIGlmICh0aGlzLmNvbGxlY3Rpb25PcHRpb25zICYmIHRoaXMuY29sbGVjdGlvbk9wdGlvbnMuYWRkQmxhbmtFbnRyeSAmJiB0aGlzLl9pc0ZpbHRlckZpcnN0UmVuZGVyKSB7XHJcbiAgICAgIGNvbGxlY3Rpb24udW5zaGlmdCh0aGlzLmNyZWF0ZUJsYW5rRW50cnkoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IG5ld0NvbGxlY3Rpb24gPSBjb2xsZWN0aW9uO1xyXG5cclxuICAgIC8vIHVzZXIgbWlnaHQgd2FudCB0byBmaWx0ZXIgYW5kL29yIHNvcnQgY2VydGFpbiBpdGVtcyBvZiB0aGUgY29sbGVjdGlvblxyXG4gICAgbmV3Q29sbGVjdGlvbiA9IHRoaXMuZmlsdGVyQ29sbGVjdGlvbihuZXdDb2xsZWN0aW9uKTtcclxuICAgIG5ld0NvbGxlY3Rpb24gPSB0aGlzLnNvcnRDb2xsZWN0aW9uKG5ld0NvbGxlY3Rpb24pO1xyXG5cclxuICAgIC8vIHN0ZXAgMSwgY3JlYXRlIEhUTUwgc3RyaW5nIHRlbXBsYXRlXHJcbiAgICBjb25zdCBmaWx0ZXJUZW1wbGF0ZSA9IHRoaXMuYnVpbGRUZW1wbGF0ZUh0bWxTdHJpbmcobmV3Q29sbGVjdGlvbiwgdGhpcy5zZWFyY2hUZXJtcyk7XHJcblxyXG4gICAgLy8gc3RlcCAyLCBjcmVhdGUgdGhlIERPTSBFbGVtZW50IG9mIHRoZSBmaWx0ZXIgJiBwcmUtbG9hZCBzZWFyY2ggdGVybXNcclxuICAgIC8vIGFsc28gc3Vic2NyaWJlIHRvIHRoZSBvbkNsb3NlIGV2ZW50XHJcbiAgICB0aGlzLmNyZWF0ZURvbUVsZW1lbnQoZmlsdGVyVGVtcGxhdGUpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlIHRoZSBIVE1MIHRlbXBsYXRlIGFzIGEgc3RyaW5nXHJcbiAgICovXHJcbiAgcHJvdGVjdGVkIGJ1aWxkVGVtcGxhdGVIdG1sU3RyaW5nKG9wdGlvbkNvbGxlY3Rpb246IGFueVtdLCBzZWFyY2hUZXJtczogU2VhcmNoVGVybVtdKSB7XHJcbiAgICBsZXQgb3B0aW9ucyA9ICcnO1xyXG4gICAgY29uc3QgZmllbGRJZCA9IHRoaXMuY29sdW1uRGVmICYmIHRoaXMuY29sdW1uRGVmLmlkO1xyXG4gICAgY29uc3Qgc2VwYXJhdG9yQmV0d2VlbkxhYmVscyA9IHRoaXMuY29sbGVjdGlvbk9wdGlvbnMgJiYgdGhpcy5jb2xsZWN0aW9uT3B0aW9ucy5zZXBhcmF0b3JCZXR3ZWVuVGV4dExhYmVscyB8fCAnJztcclxuICAgIGNvbnN0IGlzUmVuZGVySHRtbEVuYWJsZWQgPSB0aGlzLmNvbHVtbkZpbHRlciAmJiB0aGlzLmNvbHVtbkZpbHRlci5lbmFibGVSZW5kZXJIdG1sIHx8IGZhbHNlO1xyXG4gICAgY29uc3Qgc2FuaXRpemVkT3B0aW9ucyA9IHRoaXMuZ3JpZE9wdGlvbnMgJiYgdGhpcy5ncmlkT3B0aW9ucy5zYW5pdGl6ZUh0bWxPcHRpb25zIHx8IHt9O1xyXG5cclxuICAgIC8vIGNvbGxlY3Rpb24gY291bGQgYmUgYW4gQXJyYXkgb2YgU3RyaW5ncyBPUiBPYmplY3RzXHJcbiAgICBpZiAob3B0aW9uQ29sbGVjdGlvbi5ldmVyeSh4ID0+IHR5cGVvZiB4ID09PSAnc3RyaW5nJykpIHtcclxuICAgICAgb3B0aW9uQ29sbGVjdGlvbi5mb3JFYWNoKChvcHRpb246IHN0cmluZykgPT4ge1xyXG4gICAgICAgIGNvbnN0IHNlbGVjdGVkID0gKHNlYXJjaFRlcm1zLmZpbmRJbmRleCgodGVybSkgPT4gdGVybSA9PT0gb3B0aW9uKSA+PSAwKSA/ICdzZWxlY3RlZCcgOiAnJztcclxuICAgICAgICBvcHRpb25zICs9IGA8b3B0aW9uIHZhbHVlPVwiJHtvcHRpb259XCIgbGFiZWw9XCIke29wdGlvbn1cIiAke3NlbGVjdGVkfT4ke29wdGlvbn08L29wdGlvbj5gO1xyXG5cclxuICAgICAgICAvLyBpZiB0aGVyZSdzIGF0IGxlYXN0IDEgc2VhcmNoIHRlcm0gZm91bmQsIHdlIHdpbGwgYWRkIHRoZSBcImZpbGxlZFwiIGNsYXNzIGZvciBzdHlsaW5nIHB1cnBvc2VzXHJcbiAgICAgICAgaWYgKHNlbGVjdGVkKSB7XHJcbiAgICAgICAgICB0aGlzLmlzRmlsbGVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gYXJyYXkgb2Ygb2JqZWN0cyB3aWxsIHJlcXVpcmUgYSBsYWJlbC92YWx1ZSBwYWlyIHVubGVzcyBhIGN1c3RvbVN0cnVjdHVyZSBpcyBwYXNzZWRcclxuICAgICAgb3B0aW9uQ29sbGVjdGlvbi5mb3JFYWNoKChvcHRpb246IFNlbGVjdE9wdGlvbikgPT4ge1xyXG4gICAgICAgIGlmICghb3B0aW9uIHx8IChvcHRpb25bdGhpcy5sYWJlbE5hbWVdID09PSB1bmRlZmluZWQgJiYgb3B0aW9uLmxhYmVsS2V5ID09PSB1bmRlZmluZWQpKSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFtzZWxlY3QtZmlsdGVyXSBBIGNvbGxlY3Rpb24gd2l0aCB2YWx1ZS9sYWJlbCAob3IgdmFsdWUvbGFiZWxLZXkgd2hlbiB1c2luZyBMb2NhbGUpIGlzIHJlcXVpcmVkIHRvIHBvcHVsYXRlIHRoZSBTZWxlY3QgbGlzdCwgZm9yIGV4YW1wbGU6OiB7IGZpbHRlcjogbW9kZWw6IEZpbHRlcnMubXVsdGlwbGVTZWxlY3QsIGNvbGxlY3Rpb246IFsgeyB2YWx1ZTogJzEnLCBsYWJlbDogJ09uZScgfSBdJylgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgbGFiZWxLZXkgPSAob3B0aW9uLmxhYmVsS2V5IHx8IG9wdGlvblt0aGlzLmxhYmVsTmFtZV0pIGFzIHN0cmluZztcclxuICAgICAgICBjb25zdCBzZWxlY3RlZCA9IChzZWFyY2hUZXJtcy5maW5kSW5kZXgoKHRlcm0pID0+IHRlcm0gPT09IG9wdGlvblt0aGlzLnZhbHVlTmFtZV0pID49IDApID8gJ3NlbGVjdGVkJyA6ICcnO1xyXG4gICAgICAgIGNvbnN0IGxhYmVsVGV4dCA9ICgob3B0aW9uLmxhYmVsS2V5IHx8IHRoaXMuZW5hYmxlVHJhbnNsYXRlTGFiZWwpICYmIGxhYmVsS2V5KSA/IHRoaXMudHJhbnNsYXRlLmluc3RhbnQobGFiZWxLZXkgfHwgJyAnKSA6IGxhYmVsS2V5O1xyXG4gICAgICAgIGxldCBwcmVmaXhUZXh0ID0gb3B0aW9uW3RoaXMubGFiZWxQcmVmaXhOYW1lXSB8fCAnJztcclxuICAgICAgICBsZXQgc3VmZml4VGV4dCA9IG9wdGlvblt0aGlzLmxhYmVsU3VmZml4TmFtZV0gfHwgJyc7XHJcbiAgICAgICAgbGV0IG9wdGlvbkxhYmVsID0gb3B0aW9uW3RoaXMub3B0aW9uTGFiZWxdIHx8ICcnO1xyXG4gICAgICAgIG9wdGlvbkxhYmVsID0gb3B0aW9uTGFiZWwudG9TdHJpbmcoKS5yZXBsYWNlKC9cXFwiL2csICdcXCcnKTsgLy8gcmVwbGFjZSBkb3VibGUgcXVvdGVzIGJ5IHNpbmdsZSBxdW90ZXMgdG8gYXZvaWQgaW50ZXJmZXJpbmcgd2l0aCByZWd1bGFyIGh0bWxcclxuXHJcbiAgICAgICAgLy8gYWxzbyB0cmFuc2xhdGUgcHJlZml4L3N1ZmZpeCBpZiBlbmFibGVUcmFuc2xhdGVMYWJlbCBpcyB0cnVlIGFuZCB0ZXh0IGlzIGEgc3RyaW5nXHJcbiAgICAgICAgcHJlZml4VGV4dCA9ICh0aGlzLmVuYWJsZVRyYW5zbGF0ZUxhYmVsICYmIHByZWZpeFRleHQgJiYgdHlwZW9mIHByZWZpeFRleHQgPT09ICdzdHJpbmcnKSA/IHRoaXMudHJhbnNsYXRlLmluc3RhbnQocHJlZml4VGV4dCB8fCAnICcpIDogcHJlZml4VGV4dDtcclxuICAgICAgICBzdWZmaXhUZXh0ID0gKHRoaXMuZW5hYmxlVHJhbnNsYXRlTGFiZWwgJiYgc3VmZml4VGV4dCAmJiB0eXBlb2Ygc3VmZml4VGV4dCA9PT0gJ3N0cmluZycpID8gdGhpcy50cmFuc2xhdGUuaW5zdGFudChzdWZmaXhUZXh0IHx8ICcgJykgOiBzdWZmaXhUZXh0O1xyXG4gICAgICAgIG9wdGlvbkxhYmVsID0gKHRoaXMuZW5hYmxlVHJhbnNsYXRlTGFiZWwgJiYgb3B0aW9uTGFiZWwgJiYgdHlwZW9mIG9wdGlvbkxhYmVsID09PSAnc3RyaW5nJykgPyB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KG9wdGlvbkxhYmVsIHx8ICcgJykgOiBvcHRpb25MYWJlbDtcclxuXHJcbiAgICAgICAgLy8gYWRkIHRvIGEgdGVtcCBhcnJheSBmb3Igam9pbmluZyBwdXJwb3NlIGFuZCBmaWx0ZXIgb3V0IGVtcHR5IHRleHRcclxuICAgICAgICBjb25zdCB0bXBPcHRpb25BcnJheSA9IFtwcmVmaXhUZXh0LCBsYWJlbFRleHQsIHN1ZmZpeFRleHRdLmZpbHRlcigodGV4dCkgPT4gdGV4dCk7XHJcbiAgICAgICAgbGV0IG9wdGlvblRleHQgPSB0bXBPcHRpb25BcnJheS5qb2luKHNlcGFyYXRvckJldHdlZW5MYWJlbHMpO1xyXG5cclxuICAgICAgICAvLyBpZiB1c2VyIHNwZWNpZmljYWxseSB3YW50cyB0byByZW5kZXIgaHRtbCB0ZXh0LCBoZSBuZWVkcyB0byBvcHQtaW4gZWxzZSBpdCB3aWxsIHN0cmlwcGVkIG91dCBieSBkZWZhdWx0XHJcbiAgICAgICAgLy8gYWxzbywgdGhlIDNyZCBwYXJ0eSBsaWIgd2lsbCBzYW5pbml0emUgYW55IGh0bWwgY29kZSB1bmxlc3MgaXQncyBlbmNvZGVkLCBzbyB3ZSdsbCBkbyB0aGF0XHJcbiAgICAgICAgaWYgKGlzUmVuZGVySHRtbEVuYWJsZWQpIHtcclxuICAgICAgICAgIC8vIHNhbml0aXplIGFueSB1bmF1dGhvcml6ZWQgaHRtbCB0YWdzIGxpa2Ugc2NyaXB0IGFuZCBvdGhlcnNcclxuICAgICAgICAgIC8vIGZvciB0aGUgcmVtYWluaW5nIGFsbG93ZWQgdGFncyB3ZSdsbCBwZXJtaXQgYWxsIGF0dHJpYnV0ZXNcclxuICAgICAgICAgIGNvbnN0IHNhbml0aXplZFRleHQgPSBET01QdXJpZnkuc2FuaXRpemUob3B0aW9uVGV4dCwgc2FuaXRpemVkT3B0aW9ucyk7XHJcbiAgICAgICAgICBvcHRpb25UZXh0ID0gaHRtbEVuY29kZShzYW5pdGl6ZWRUZXh0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGh0bWwgdGV4dCBvZiBlYWNoIHNlbGVjdCBvcHRpb25cclxuICAgICAgICBvcHRpb25zICs9IGA8b3B0aW9uIHZhbHVlPVwiJHtvcHRpb25bdGhpcy52YWx1ZU5hbWVdfVwiIGxhYmVsPVwiJHtvcHRpb25MYWJlbH1cIiAke3NlbGVjdGVkfT4ke29wdGlvblRleHR9PC9vcHRpb24+YDtcclxuXHJcbiAgICAgICAgLy8gaWYgdGhlcmUncyBhdCBsZWFzdCAxIHNlYXJjaCB0ZXJtIGZvdW5kLCB3ZSB3aWxsIGFkZCB0aGUgXCJmaWxsZWRcIiBjbGFzcyBmb3Igc3R5bGluZyBwdXJwb3Nlc1xyXG4gICAgICAgIGlmIChzZWxlY3RlZCkge1xyXG4gICAgICAgICAgdGhpcy5pc0ZpbGxlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gYDxzZWxlY3QgY2xhc3M9XCJtcy1maWx0ZXIgc2VhcmNoLWZpbHRlciBmaWx0ZXItJHtmaWVsZElkfVwiICR7dGhpcy5pc011bHRpcGxlU2VsZWN0ID8gJ211bHRpcGxlPVwibXVsdGlwbGVcIicgOiAnJ30+JHtvcHRpb25zfTwvc2VsZWN0PmA7XHJcbiAgfVxyXG5cclxuICAvKiogQ3JlYXRlIGEgYmxhbmsgZW50cnkgdGhhdCBjYW4gYmUgYWRkZWQgdG8gdGhlIGNvbGxlY3Rpb24uIEl0IHdpbGwgYWxzbyByZXVzZSB0aGUgc2FtZSBjdXN0b21TdHJ1Y3R1cmUgaWYgbmVlZCBiZSAqL1xyXG4gIHByb3RlY3RlZCBjcmVhdGVCbGFua0VudHJ5KCkge1xyXG4gICAgY29uc3QgYmxhbmtFbnRyeSA9IHtcclxuICAgICAgW3RoaXMubGFiZWxOYW1lXTogJycsXHJcbiAgICAgIFt0aGlzLnZhbHVlTmFtZV06ICcnXHJcbiAgICB9O1xyXG4gICAgaWYgKHRoaXMubGFiZWxQcmVmaXhOYW1lKSB7XHJcbiAgICAgIGJsYW5rRW50cnlbdGhpcy5sYWJlbFByZWZpeE5hbWVdID0gJyc7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5sYWJlbFN1ZmZpeE5hbWUpIHtcclxuICAgICAgYmxhbmtFbnRyeVt0aGlzLmxhYmVsU3VmZml4TmFtZV0gPSAnJztcclxuICAgIH1cclxuICAgIHJldHVybiBibGFua0VudHJ5O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRnJvbSB0aGUgaHRtbCB0ZW1wbGF0ZSBzdHJpbmcsIGNyZWF0ZSBhIERPTSBlbGVtZW50XHJcbiAgICogU3Vic2NyaWJlIHRvIHRoZSBvbkNsb3NlIGV2ZW50IGFuZCBydW4gdGhlIGNhbGxiYWNrIHdoZW4gdGhhdCBoYXBwZW5zXHJcbiAgICogQHBhcmFtIGZpbHRlclRlbXBsYXRlXHJcbiAgICovXHJcbiAgcHJvdGVjdGVkIGNyZWF0ZURvbUVsZW1lbnQoZmlsdGVyVGVtcGxhdGU6IHN0cmluZykge1xyXG4gICAgY29uc3QgZmllbGRJZCA9IHRoaXMuY29sdW1uRGVmICYmIHRoaXMuY29sdW1uRGVmLmlkO1xyXG5cclxuICAgIC8vIHByb3ZpZGUgdGhlIG5hbWUgYXR0cmlidXRlIHRvIHRoZSBET00gZWxlbWVudCB3aGljaCB3aWxsIGJlIG5lZWRlZCB0byBhdXRvLWFkanVzdCBkcm9wIHBvc2l0aW9uIChkcm9wdXAgLyBkcm9wZG93bilcclxuICAgIHRoaXMuZWxlbWVudE5hbWUgPSBgZmlsdGVyLSR7ZmllbGRJZH1gO1xyXG4gICAgdGhpcy5kZWZhdWx0T3B0aW9ucy5uYW1lID0gdGhpcy5lbGVtZW50TmFtZTtcclxuXHJcbiAgICBjb25zdCAkaGVhZGVyRWxtID0gdGhpcy5ncmlkLmdldEhlYWRlclJvd0NvbHVtbihmaWVsZElkKTtcclxuICAgICQoJGhlYWRlckVsbSkuZW1wdHkoKTtcclxuXHJcbiAgICAvLyBjcmVhdGUgdGhlIERPTSBlbGVtZW50ICYgYWRkIGFuIElEIGFuZCBmaWx0ZXIgY2xhc3NcclxuICAgIHRoaXMuJGZpbHRlckVsbSA9ICQoZmlsdGVyVGVtcGxhdGUpO1xyXG4gICAgaWYgKHR5cGVvZiB0aGlzLiRmaWx0ZXJFbG0ubXVsdGlwbGVTZWxlY3QgIT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBtdWx0aXBsZS1zZWxlY3QuanMgd2FzIG5vdCBmb3VuZCwgbWFrZSBzdXJlIHRvIG1vZGlmeSB5b3VyIFwiYW5ndWxhci1jbGkuanNvblwiIGZpbGUgYW5kIGluY2x1ZGUgXCIuLi9ub2RlX21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvbGliL211bHRpcGxlLXNlbGVjdC9tdWx0aXBsZS1zZWxlY3QuanNcIiBhbmQgaXQncyBjc3Mgb3IgU0FTUyBmaWxlYCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLiRmaWx0ZXJFbG0uYXR0cignaWQnLCB0aGlzLmVsZW1lbnROYW1lKTtcclxuICAgIHRoaXMuJGZpbHRlckVsbS5hdHRyKCduYW1lJywgdGhpcy5lbGVtZW50TmFtZSk7XHJcbiAgICB0aGlzLiRmaWx0ZXJFbG0uZGF0YSgnY29sdW1uSWQnLCBmaWVsZElkKTtcclxuXHJcbiAgICAvLyBpZiB0aGVyZSdzIGEgc2VhcmNoIHRlcm0sIHdlIHdpbGwgYWRkIHRoZSBcImZpbGxlZFwiIGNsYXNzIGZvciBzdHlsaW5nIHB1cnBvc2VzXHJcbiAgICBpZiAodGhpcy5pc0ZpbGxlZCkge1xyXG4gICAgICB0aGlzLiRmaWx0ZXJFbG0uYWRkQ2xhc3MoJ2ZpbGxlZCcpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGFwcGVuZCB0aGUgbmV3IERPTSBlbGVtZW50IHRvIHRoZSBoZWFkZXIgcm93XHJcbiAgICBpZiAodGhpcy4kZmlsdGVyRWxtICYmIHR5cGVvZiB0aGlzLiRmaWx0ZXJFbG0uYXBwZW5kVG8gPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgdGhpcy4kZmlsdGVyRWxtLmFwcGVuZFRvKCRoZWFkZXJFbG0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIG1lcmdlIG9wdGlvbnMgJiBhdHRhY2ggbXVsdGlTZWxlY3RcclxuICAgIGNvbnN0IGVsZW1lbnRPcHRpb25zOiBNdWx0aXBsZVNlbGVjdE9wdGlvbiA9IHsgLi4udGhpcy5kZWZhdWx0T3B0aW9ucywgLi4udGhpcy5jb2x1bW5GaWx0ZXIuZmlsdGVyT3B0aW9ucyB9O1xyXG4gICAgdGhpcy5maWx0ZXJFbG1PcHRpb25zID0geyAuLi50aGlzLmRlZmF1bHRPcHRpb25zLCAuLi5lbGVtZW50T3B0aW9ucyB9O1xyXG4gICAgdGhpcy4kZmlsdGVyRWxtID0gdGhpcy4kZmlsdGVyRWxtLm11bHRpcGxlU2VsZWN0KHRoaXMuZmlsdGVyRWxtT3B0aW9ucyk7XHJcbiAgfVxyXG59XHJcbiJdfQ==