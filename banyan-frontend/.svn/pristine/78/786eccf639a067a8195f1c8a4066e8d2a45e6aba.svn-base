import { OperatorType } from './../models/index';
const DEFAULT_MIN_VALUE = 0;
const DEFAULT_MAX_VALUE = 100;
const DEFAULT_STEP = 1;
export class CompoundSliderFilter {
    constructor() {
        this._clearFilterTriggered = false;
        this._shouldTriggerQuery = true;
    }
    /** Getter for the Grid Options pulled through the Grid Object */
    get gridOptions() {
        return (this.grid && this.grid.getOptions) ? this.grid.getOptions() : {};
    }
    /** Getter for the Filter Generic Params */
    get filterParams() {
        return this.columnDef && this.columnDef.filter && this.columnDef.filter.params || {};
    }
    /** Getter for the `filter` properties */
    get filterProperties() {
        return this.columnDef && this.columnDef.filter;
    }
    set operator(op) {
        this._operator = op;
    }
    get operator() {
        return this._operator || OperatorType.empty;
    }
    /**
     * Initialize the Filter
     */
    init(args) {
        if (args) {
            this.grid = args.grid;
            this.callback = args.callback;
            this.columnDef = args.columnDef;
            this.operator = args.operator || '';
            this.searchTerms = args.searchTerms || [];
            // define the input & slider number IDs
            this._elementRangeInputId = `rangeInput_${this.columnDef.field}`;
            this._elementRangeOutputId = `rangeOutput_${this.columnDef.field}`;
            // filter input can only have 1 search term, so we will use the 1st array index if it exist
            const searchTerm = (Array.isArray(this.searchTerms) && this.searchTerms[0]) || '';
            // step 1, create the DOM Element of the filter which contain the compound Operator+Input
            // and initialize it if searchTerm is filled
            this.$filterElm = this.createDomElement(searchTerm);
            // step 3, subscribe to the keyup event and run the callback when that happens
            // also add/remove "filled" class for styling purposes
            this.$filterInputElm.change((e) => {
                this.onTriggerEvent(e);
            });
            this.$selectOperatorElm.change((e) => {
                this.onTriggerEvent(e);
            });
            // if user chose to display the slider number on the right side, then update it every time it changes
            // we need to use both "input" and "change" event to be all cross-browser
            if (!this.filterParams.hideSliderNumber) {
                this.$filterInputElm.on('input change', (e) => {
                    const value = e && e.target && e.target.value || '';
                    if (value) {
                        document.getElementById(this._elementRangeOutputId).innerHTML = value;
                    }
                });
            }
        }
    }
    /**
     * Clear the filter value
     */
    clear(shouldTriggerQuery = true) {
        if (this.$filterElm && this.$selectOperatorElm) {
            this._clearFilterTriggered = true;
            this._shouldTriggerQuery = shouldTriggerQuery;
            this.searchTerms = [];
            const clearedValue = this.filterParams.hasOwnProperty('sliderStartValue') ? this.filterParams.sliderStartValue : DEFAULT_MIN_VALUE;
            this.$selectOperatorElm.val(0);
            this.$filterInputElm.val(clearedValue);
            if (!this.filterParams.hideSliderNumber) {
                this.$containerInputGroupElm.children('div.input-group-addon.input-group-append').children().last().html(clearedValue);
            }
            this.onTriggerEvent(undefined);
            this.$filterElm.removeClass('filled');
        }
    }
    /**
     * destroy the filter
     */
    destroy() {
        if (this.$filterElm) {
            this.$filterElm.off('input change').remove();
        }
    }
    /**
     * Set value(s) on the DOM element
     */
    setValues(values) {
        if (values && Array.isArray(values)) {
            this.$filterInputElm.val(values[0]);
            this.$containerInputGroupElm.children('div.input-group-addon.input-group-append').children().last().html(values[0]);
        }
    }
    //
    // private functions
    // ------------------
    /** Build HTML Template for the input range (slider) */
    buildTemplateHtmlString() {
        const minValue = this.filterProperties.hasOwnProperty('minValue') ? this.filterProperties.minValue : DEFAULT_MIN_VALUE;
        const maxValue = this.filterProperties.hasOwnProperty('maxValue') ? this.filterProperties.maxValue : DEFAULT_MAX_VALUE;
        const defaultValue = this.filterParams.hasOwnProperty('sliderStartValue') ? this.filterParams.sliderStartValue : minValue;
        const step = this.filterProperties.hasOwnProperty('valueStep') ? this.filterProperties.valueStep : DEFAULT_STEP;
        return `<input type="range" id="${this._elementRangeInputId}"
              name="${this._elementRangeInputId}"
              defaultValue="${defaultValue}" min="${minValue}" max="${maxValue}" step="${step}"
              class="form-control slider-filter-input range compound-slider" />`;
    }
    /** Build HTML Template for the text (number) that is shown appended to the slider */
    buildTemplateSliderTextHtmlString() {
        const minValue = this.filterProperties.hasOwnProperty('minValue') ? this.filterProperties.minValue : DEFAULT_MIN_VALUE;
        const defaultValue = this.filterParams.hasOwnProperty('sliderStartValue') ? this.filterParams.sliderStartValue : minValue;
        return `<div class="input-group-addon input-group-append slider-value"><span class="input-group-text" id="${this._elementRangeOutputId}">${defaultValue}</span></div>`;
    }
    /** Build HTML Template select dropdown (operator) */
    buildSelectOperatorHtmlString() {
        const optionValues = this.getOptionValues();
        let optionValueString = '';
        optionValues.forEach((option) => {
            optionValueString += `<option value="${option.operator}" title="${option.description}">${option.operator}</option>`;
        });
        return `<select class="form-control">${optionValueString}</select>`;
    }
    /** Get the available operator option values */
    getOptionValues() {
        return [
            { operator: '', description: '' },
            { operator: '=', description: '' },
            { operator: '<', description: '' },
            { operator: '<=', description: '' },
            { operator: '>', description: '' },
            { operator: '>=', description: '' },
            { operator: '<>', description: '' }
        ];
    }
    /**
     * Create the DOM element
     */
    createDomElement(searchTerm) {
        const fieldId = this.columnDef && this.columnDef.id;
        const searchTermInput = (searchTerm || '0');
        const $headerElm = this.grid.getHeaderRowColumn(this.columnDef.id);
        $($headerElm).empty();
        // create the DOM Select dropdown for the Operator
        this.$selectOperatorElm = $(this.buildSelectOperatorHtmlString());
        this.$filterInputElm = $(this.buildTemplateHtmlString());
        const $filterContainerElm = $(`<div class="form-group search-filter filter-${fieldId}"></div>`);
        this.$containerInputGroupElm = $(`<div class="input-group search-filter filter-${fieldId}"></div>`);
        const $operatorInputGroupAddon = $(`<span class="input-group-addon input-group-prepend operator"></span>`);
        /* the DOM element final structure will be
          <div class="input-group">
            <div class="input-group-addon input-group-prepend operator">
              <select class="form-control"></select>
            </div>
            <input class="form-control" type="text" />
            <div class="input-group-addon input-group-prepend" id="rangeOuput_percentComplete"><span class="input-group-text">0</span></div>
          </div>
        */
        $operatorInputGroupAddon.append(this.$selectOperatorElm);
        this.$containerInputGroupElm.append($operatorInputGroupAddon);
        this.$containerInputGroupElm.append(this.$filterInputElm);
        if (!this.filterParams.hideSliderNumber) {
            const $sliderTextInputAppendAddon = $(this.buildTemplateSliderTextHtmlString());
            $sliderTextInputAppendAddon.children().html(searchTermInput);
            this.$containerInputGroupElm.append($sliderTextInputAppendAddon);
        }
        // create the DOM element & add an ID and filter class
        $filterContainerElm.append(this.$containerInputGroupElm);
        $filterContainerElm.attr('id', `filter-${fieldId}`);
        this.$filterInputElm.val(searchTermInput);
        this.$filterInputElm.data('columnId', fieldId);
        if (this.operator) {
            this.$selectOperatorElm.val(this.operator);
        }
        // if there's a search term, we will add the "filled" class for styling purposes
        if (searchTerm) {
            $filterContainerElm.addClass('filled');
        }
        // append the new DOM element to the header row
        if ($filterContainerElm && typeof $filterContainerElm.appendTo === 'function') {
            $filterContainerElm.appendTo($headerElm);
        }
        return $filterContainerElm;
    }
    onTriggerEvent(e) {
        if (this._clearFilterTriggered) {
            this.callback(e, { columnDef: this.columnDef, clearFilterTriggered: this._clearFilterTriggered, shouldTriggerQuery: this._shouldTriggerQuery });
        }
        else {
            const selectedOperator = this.$selectOperatorElm.find('option:selected').text();
            const value = this.$filterInputElm.val();
            (value) ? this.$filterElm.addClass('filled') : this.$filterElm.removeClass('filled');
            this.callback(e, { columnDef: this.columnDef, searchTerms: (value ? [value] : null), operator: selectedOperator || '', shouldTriggerQuery: this._shouldTriggerQuery });
        }
        // reset both flags for next use
        this._clearFilterTriggered = false;
        this._shouldTriggerQuery = true;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG91bmRTbGlkZXJGaWx0ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL2ZpbHRlcnMvY29tcG91bmRTbGlkZXJGaWx0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQVFMLFlBQVksRUFFYixNQUFNLG1CQUFtQixDQUFDO0FBSzNCLE1BQU0saUJBQWlCLEdBQUcsQ0FBQyxDQUFDO0FBQzVCLE1BQU0saUJBQWlCLEdBQUcsR0FBRyxDQUFDO0FBQzlCLE1BQU0sWUFBWSxHQUFHLENBQUMsQ0FBQztBQUV2QixNQUFNLE9BQU8sb0JBQW9CO0lBZS9CO1FBZFEsMEJBQXFCLEdBQUcsS0FBSyxDQUFDO1FBQzlCLHdCQUFtQixHQUFHLElBQUksQ0FBQztJQWFuQixDQUFDO0lBRWpCLGlFQUFpRTtJQUNqRSxJQUFZLFdBQVc7UUFDckIsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQzNFLENBQUM7SUFFRCwyQ0FBMkM7SUFDM0MsSUFBWSxZQUFZO1FBQ3RCLE9BQU8sSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDO0lBQ3ZGLENBQUM7SUFFRCx5Q0FBeUM7SUFDekMsSUFBWSxnQkFBZ0I7UUFDMUIsT0FBTyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDO0lBQ2pELENBQUM7SUFFRCxJQUFJLFFBQVEsQ0FBQyxFQUFpQztRQUM1QyxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRUQsSUFBSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsU0FBUyxJQUFJLFlBQVksQ0FBQyxLQUFLLENBQUM7SUFDOUMsQ0FBQztJQUVEOztPQUVHO0lBQ0gsSUFBSSxDQUFDLElBQXFCO1FBQ3hCLElBQUksSUFBSSxFQUFFO1lBQ1IsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ3RCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUM5QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDaEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQztZQUNwQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLElBQUksRUFBRSxDQUFDO1lBRTFDLHVDQUF1QztZQUN2QyxJQUFJLENBQUMsb0JBQW9CLEdBQUcsY0FBYyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2pFLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxlQUFlLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7WUFFbkUsMkZBQTJGO1lBQzNGLE1BQU0sVUFBVSxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUVsRix5RkFBeUY7WUFDekYsNENBQTRDO1lBQzVDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBRXBELDhFQUE4RTtZQUM5RSxzREFBc0Q7WUFDdEQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFNLEVBQUUsRUFBRTtnQkFDckMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6QixDQUFDLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFNLEVBQUUsRUFBRTtnQkFDeEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6QixDQUFDLENBQUMsQ0FBQztZQUVILHFHQUFxRztZQUNyRyx5RUFBeUU7WUFDekUsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLEVBQUU7Z0JBQ3ZDLElBQUksQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQStCLEVBQUUsRUFBRTtvQkFDMUUsTUFBTSxLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDO29CQUNwRCxJQUFJLEtBQUssRUFBRTt3QkFDVCxRQUFRLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7cUJBQ3ZFO2dCQUNILENBQUMsQ0FBQyxDQUFDO2FBQ0o7U0FDRjtJQUNILENBQUM7SUFFRDs7T0FFRztJQUNILEtBQUssQ0FBQyxrQkFBa0IsR0FBRyxJQUFJO1FBQzdCLElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsa0JBQWtCLEVBQUU7WUFDOUMsSUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQztZQUNsQyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsa0JBQWtCLENBQUM7WUFDOUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7WUFDdEIsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUM7WUFDbkksSUFBSSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMvQixJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUN2QyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsRUFBRTtnQkFDdkMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFFBQVEsQ0FBQywwQ0FBMEMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUN4SDtZQUNELElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDL0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDdkM7SUFDSCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxPQUFPO1FBQ0wsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ25CLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQzlDO0lBQ0gsQ0FBQztJQUVEOztPQUVHO0lBQ0gsU0FBUyxDQUFDLE1BQW9CO1FBQzVCLElBQUksTUFBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDbkMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFFBQVEsQ0FBQywwQ0FBMEMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNySDtJQUNILENBQUM7SUFFRCxFQUFFO0lBQ0Ysb0JBQW9CO0lBQ3BCLHFCQUFxQjtJQUVyQix1REFBdUQ7SUFDL0MsdUJBQXVCO1FBQzdCLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDO1FBQ3ZILE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDO1FBQ3ZILE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztRQUMxSCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUM7UUFFaEgsT0FBTywyQkFBMkIsSUFBSSxDQUFDLG9CQUFvQjtzQkFDekMsSUFBSSxDQUFDLG9CQUFvQjs4QkFDakIsWUFBWSxVQUFVLFFBQVEsVUFBVSxRQUFRLFdBQVcsSUFBSTtnRkFDYixDQUFDO0lBQy9FLENBQUM7SUFFRCxxRkFBcUY7SUFDN0UsaUNBQWlDO1FBQ3ZDLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDO1FBQ3ZILE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztRQUUxSCxPQUFPLHFHQUFxRyxJQUFJLENBQUMscUJBQXFCLEtBQUssWUFBWSxlQUFlLENBQUM7SUFDekssQ0FBQztJQUVELHFEQUFxRDtJQUM3Qyw2QkFBNkI7UUFDbkMsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQzVDLElBQUksaUJBQWlCLEdBQUcsRUFBRSxDQUFDO1FBQzNCLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUM5QixpQkFBaUIsSUFBSSxrQkFBa0IsTUFBTSxDQUFDLFFBQVEsWUFBWSxNQUFNLENBQUMsV0FBVyxLQUFLLE1BQU0sQ0FBQyxRQUFRLFdBQVcsQ0FBQztRQUN0SCxDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sZ0NBQWdDLGlCQUFpQixXQUFXLENBQUM7SUFDdEUsQ0FBQztJQUVELCtDQUErQztJQUN2QyxlQUFlO1FBQ3JCLE9BQU87WUFDTCxFQUFFLFFBQVEsRUFBRSxFQUFvQixFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUU7WUFDbkQsRUFBRSxRQUFRLEVBQUUsR0FBcUIsRUFBRSxXQUFXLEVBQUUsRUFBRSxFQUFFO1lBQ3BELEVBQUUsUUFBUSxFQUFFLEdBQXFCLEVBQUUsV0FBVyxFQUFFLEVBQUUsRUFBRTtZQUNwRCxFQUFFLFFBQVEsRUFBRSxJQUFzQixFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUU7WUFDckQsRUFBRSxRQUFRLEVBQUUsR0FBcUIsRUFBRSxXQUFXLEVBQUUsRUFBRSxFQUFFO1lBQ3BELEVBQUUsUUFBUSxFQUFFLElBQXNCLEVBQUUsV0FBVyxFQUFFLEVBQUUsRUFBRTtZQUNyRCxFQUFFLFFBQVEsRUFBRSxJQUFzQixFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUU7U0FDdEQsQ0FBQztJQUNKLENBQUM7SUFFRDs7T0FFRztJQUNLLGdCQUFnQixDQUFDLFVBQXVCO1FBQzlDLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUM7UUFDcEQsTUFBTSxlQUFlLEdBQUcsQ0FBQyxVQUFVLElBQUksR0FBRyxDQUFXLENBQUM7UUFDdEQsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ25FLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUV0QixrREFBa0Q7UUFDbEQsSUFBSSxDQUFDLGtCQUFrQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsNkJBQTZCLEVBQUUsQ0FBQyxDQUFDO1FBQ2xFLElBQUksQ0FBQyxlQUFlLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDLENBQUM7UUFDekQsTUFBTSxtQkFBbUIsR0FBRyxDQUFDLENBQUMsK0NBQStDLE9BQU8sVUFBVSxDQUFDLENBQUM7UUFDaEcsSUFBSSxDQUFDLHVCQUF1QixHQUFHLENBQUMsQ0FBQyxnREFBZ0QsT0FBTyxVQUFVLENBQUMsQ0FBQztRQUNwRyxNQUFNLHdCQUF3QixHQUFHLENBQUMsQ0FBQyxzRUFBc0UsQ0FBQyxDQUFDO1FBRTNHOzs7Ozs7OztVQVFFO1FBQ0Ysd0JBQXdCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxNQUFNLENBQUMsd0JBQXdCLENBQUMsQ0FBQztRQUM5RCxJQUFJLENBQUMsdUJBQXVCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUMxRCxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsRUFBRTtZQUN2QyxNQUFNLDJCQUEyQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsaUNBQWlDLEVBQUUsQ0FBQyxDQUFDO1lBQ2hGLDJCQUEyQixDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUM3RCxJQUFJLENBQUMsdUJBQXVCLENBQUMsTUFBTSxDQUFDLDJCQUEyQixDQUFDLENBQUM7U0FDbEU7UUFFRCxzREFBc0Q7UUFDdEQsbUJBQW1CLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1FBQ3pELG1CQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsVUFBVSxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBRXBELElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQzFDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUUvQyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDNUM7UUFFRCxnRkFBZ0Y7UUFDaEYsSUFBSSxVQUFVLEVBQUU7WUFDZCxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDeEM7UUFFRCwrQ0FBK0M7UUFDL0MsSUFBSSxtQkFBbUIsSUFBSSxPQUFPLG1CQUFtQixDQUFDLFFBQVEsS0FBSyxVQUFVLEVBQUU7WUFDN0UsbUJBQW1CLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQzFDO1FBRUQsT0FBTyxtQkFBbUIsQ0FBQztJQUM3QixDQUFDO0lBRU8sY0FBYyxDQUFDLENBQW9CO1FBQ3pDLElBQUksSUFBSSxDQUFDLHFCQUFxQixFQUFFO1lBQzlCLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsb0JBQW9CLEVBQUUsSUFBSSxDQUFDLHFCQUFxQixFQUFFLGtCQUFrQixFQUFFLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLENBQUM7U0FDako7YUFBTTtZQUNMLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2hGLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDekMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3JGLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsV0FBVyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxRQUFRLEVBQUUsZ0JBQWdCLElBQUksRUFBRSxFQUFFLGtCQUFrQixFQUFFLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLENBQUM7U0FDeEs7UUFDRCxnQ0FBZ0M7UUFDaEMsSUFBSSxDQUFDLHFCQUFxQixHQUFHLEtBQUssQ0FBQztRQUNuQyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDO0lBQ2xDLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29sdW1uLFxyXG4gIENvbHVtbkZpbHRlcixcclxuICBGaWx0ZXIsXHJcbiAgRmlsdGVyQXJndW1lbnRzLFxyXG4gIEZpbHRlckNhbGxiYWNrLFxyXG4gIEdyaWRPcHRpb24sXHJcbiAgT3BlcmF0b3JTdHJpbmcsXHJcbiAgT3BlcmF0b3JUeXBlLFxyXG4gIFNlYXJjaFRlcm1cclxufSBmcm9tICcuLy4uL21vZGVscy9pbmRleCc7XHJcblxyXG4vLyB1c2luZyBleHRlcm5hbCBub24tdHlwZWQganMgbGlicmFyaWVzXHJcbmRlY2xhcmUgdmFyICQ6IGFueTtcclxuXHJcbmNvbnN0IERFRkFVTFRfTUlOX1ZBTFVFID0gMDtcclxuY29uc3QgREVGQVVMVF9NQVhfVkFMVUUgPSAxMDA7XHJcbmNvbnN0IERFRkFVTFRfU1RFUCA9IDE7XHJcblxyXG5leHBvcnQgY2xhc3MgQ29tcG91bmRTbGlkZXJGaWx0ZXIgaW1wbGVtZW50cyBGaWx0ZXIge1xyXG4gIHByaXZhdGUgX2NsZWFyRmlsdGVyVHJpZ2dlcmVkID0gZmFsc2U7XHJcbiAgcHJpdmF0ZSBfc2hvdWxkVHJpZ2dlclF1ZXJ5ID0gdHJ1ZTtcclxuICBwcml2YXRlIF9lbGVtZW50UmFuZ2VJbnB1dElkOiBzdHJpbmc7XHJcbiAgcHJpdmF0ZSBfZWxlbWVudFJhbmdlT3V0cHV0SWQ6IHN0cmluZztcclxuICBwcml2YXRlIF9vcGVyYXRvcjogT3BlcmF0b3JUeXBlIHwgT3BlcmF0b3JTdHJpbmc7XHJcbiAgcHJpdmF0ZSAkY29udGFpbmVySW5wdXRHcm91cEVsbTogYW55O1xyXG4gIHByaXZhdGUgJGZpbHRlckVsbTogYW55O1xyXG4gIHByaXZhdGUgJGZpbHRlcklucHV0RWxtOiBhbnk7XHJcbiAgcHJpdmF0ZSAkc2VsZWN0T3BlcmF0b3JFbG06IGFueTtcclxuICBncmlkOiBhbnk7XHJcbiAgc2VhcmNoVGVybXM6IFNlYXJjaFRlcm1bXTtcclxuICBjb2x1bW5EZWY6IENvbHVtbjtcclxuICBjYWxsYmFjazogRmlsdGVyQ2FsbGJhY2s7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkgeyB9XHJcblxyXG4gIC8qKiBHZXR0ZXIgZm9yIHRoZSBHcmlkIE9wdGlvbnMgcHVsbGVkIHRocm91Z2ggdGhlIEdyaWQgT2JqZWN0ICovXHJcbiAgcHJpdmF0ZSBnZXQgZ3JpZE9wdGlvbnMoKTogR3JpZE9wdGlvbiB7XHJcbiAgICByZXR1cm4gKHRoaXMuZ3JpZCAmJiB0aGlzLmdyaWQuZ2V0T3B0aW9ucykgPyB0aGlzLmdyaWQuZ2V0T3B0aW9ucygpIDoge307XHJcbiAgfVxyXG5cclxuICAvKiogR2V0dGVyIGZvciB0aGUgRmlsdGVyIEdlbmVyaWMgUGFyYW1zICovXHJcbiAgcHJpdmF0ZSBnZXQgZmlsdGVyUGFyYW1zKCk6IGFueSB7XHJcbiAgICByZXR1cm4gdGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYuZmlsdGVyICYmIHRoaXMuY29sdW1uRGVmLmZpbHRlci5wYXJhbXMgfHwge307XHJcbiAgfVxyXG5cclxuICAvKiogR2V0dGVyIGZvciB0aGUgYGZpbHRlcmAgcHJvcGVydGllcyAqL1xyXG4gIHByaXZhdGUgZ2V0IGZpbHRlclByb3BlcnRpZXMoKTogQ29sdW1uRmlsdGVyIHtcclxuICAgIHJldHVybiB0aGlzLmNvbHVtbkRlZiAmJiB0aGlzLmNvbHVtbkRlZi5maWx0ZXI7XHJcbiAgfVxyXG5cclxuICBzZXQgb3BlcmF0b3Iob3A6IE9wZXJhdG9yVHlwZSB8IE9wZXJhdG9yU3RyaW5nKSB7XHJcbiAgICB0aGlzLl9vcGVyYXRvciA9IG9wO1xyXG4gIH1cclxuXHJcbiAgZ2V0IG9wZXJhdG9yKCk6IE9wZXJhdG9yVHlwZSB8IE9wZXJhdG9yU3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLl9vcGVyYXRvciB8fCBPcGVyYXRvclR5cGUuZW1wdHk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbml0aWFsaXplIHRoZSBGaWx0ZXJcclxuICAgKi9cclxuICBpbml0KGFyZ3M6IEZpbHRlckFyZ3VtZW50cykge1xyXG4gICAgaWYgKGFyZ3MpIHtcclxuICAgICAgdGhpcy5ncmlkID0gYXJncy5ncmlkO1xyXG4gICAgICB0aGlzLmNhbGxiYWNrID0gYXJncy5jYWxsYmFjaztcclxuICAgICAgdGhpcy5jb2x1bW5EZWYgPSBhcmdzLmNvbHVtbkRlZjtcclxuICAgICAgdGhpcy5vcGVyYXRvciA9IGFyZ3Mub3BlcmF0b3IgfHwgJyc7XHJcbiAgICAgIHRoaXMuc2VhcmNoVGVybXMgPSBhcmdzLnNlYXJjaFRlcm1zIHx8IFtdO1xyXG5cclxuICAgICAgLy8gZGVmaW5lIHRoZSBpbnB1dCAmIHNsaWRlciBudW1iZXIgSURzXHJcbiAgICAgIHRoaXMuX2VsZW1lbnRSYW5nZUlucHV0SWQgPSBgcmFuZ2VJbnB1dF8ke3RoaXMuY29sdW1uRGVmLmZpZWxkfWA7XHJcbiAgICAgIHRoaXMuX2VsZW1lbnRSYW5nZU91dHB1dElkID0gYHJhbmdlT3V0cHV0XyR7dGhpcy5jb2x1bW5EZWYuZmllbGR9YDtcclxuXHJcbiAgICAgIC8vIGZpbHRlciBpbnB1dCBjYW4gb25seSBoYXZlIDEgc2VhcmNoIHRlcm0sIHNvIHdlIHdpbGwgdXNlIHRoZSAxc3QgYXJyYXkgaW5kZXggaWYgaXQgZXhpc3RcclxuICAgICAgY29uc3Qgc2VhcmNoVGVybSA9IChBcnJheS5pc0FycmF5KHRoaXMuc2VhcmNoVGVybXMpICYmIHRoaXMuc2VhcmNoVGVybXNbMF0pIHx8ICcnO1xyXG5cclxuICAgICAgLy8gc3RlcCAxLCBjcmVhdGUgdGhlIERPTSBFbGVtZW50IG9mIHRoZSBmaWx0ZXIgd2hpY2ggY29udGFpbiB0aGUgY29tcG91bmQgT3BlcmF0b3IrSW5wdXRcclxuICAgICAgLy8gYW5kIGluaXRpYWxpemUgaXQgaWYgc2VhcmNoVGVybSBpcyBmaWxsZWRcclxuICAgICAgdGhpcy4kZmlsdGVyRWxtID0gdGhpcy5jcmVhdGVEb21FbGVtZW50KHNlYXJjaFRlcm0pO1xyXG5cclxuICAgICAgLy8gc3RlcCAzLCBzdWJzY3JpYmUgdG8gdGhlIGtleXVwIGV2ZW50IGFuZCBydW4gdGhlIGNhbGxiYWNrIHdoZW4gdGhhdCBoYXBwZW5zXHJcbiAgICAgIC8vIGFsc28gYWRkL3JlbW92ZSBcImZpbGxlZFwiIGNsYXNzIGZvciBzdHlsaW5nIHB1cnBvc2VzXHJcbiAgICAgIHRoaXMuJGZpbHRlcklucHV0RWxtLmNoYW5nZSgoZTogYW55KSA9PiB7XHJcbiAgICAgICAgdGhpcy5vblRyaWdnZXJFdmVudChlKTtcclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMuJHNlbGVjdE9wZXJhdG9yRWxtLmNoYW5nZSgoZTogYW55KSA9PiB7XHJcbiAgICAgICAgdGhpcy5vblRyaWdnZXJFdmVudChlKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICAvLyBpZiB1c2VyIGNob3NlIHRvIGRpc3BsYXkgdGhlIHNsaWRlciBudW1iZXIgb24gdGhlIHJpZ2h0IHNpZGUsIHRoZW4gdXBkYXRlIGl0IGV2ZXJ5IHRpbWUgaXQgY2hhbmdlc1xyXG4gICAgICAvLyB3ZSBuZWVkIHRvIHVzZSBib3RoIFwiaW5wdXRcIiBhbmQgXCJjaGFuZ2VcIiBldmVudCB0byBiZSBhbGwgY3Jvc3MtYnJvd3NlclxyXG4gICAgICBpZiAoIXRoaXMuZmlsdGVyUGFyYW1zLmhpZGVTbGlkZXJOdW1iZXIpIHtcclxuICAgICAgICB0aGlzLiRmaWx0ZXJJbnB1dEVsbS5vbignaW5wdXQgY2hhbmdlJywgKGU6IHsgdGFyZ2V0OiBIVE1MSW5wdXRFbGVtZW50IH0pID0+IHtcclxuICAgICAgICAgIGNvbnN0IHZhbHVlID0gZSAmJiBlLnRhcmdldCAmJiBlLnRhcmdldC52YWx1ZSB8fCAnJztcclxuICAgICAgICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLl9lbGVtZW50UmFuZ2VPdXRwdXRJZCkuaW5uZXJIVE1MID0gdmFsdWU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENsZWFyIHRoZSBmaWx0ZXIgdmFsdWVcclxuICAgKi9cclxuICBjbGVhcihzaG91bGRUcmlnZ2VyUXVlcnkgPSB0cnVlKSB7XHJcbiAgICBpZiAodGhpcy4kZmlsdGVyRWxtICYmIHRoaXMuJHNlbGVjdE9wZXJhdG9yRWxtKSB7XHJcbiAgICAgIHRoaXMuX2NsZWFyRmlsdGVyVHJpZ2dlcmVkID0gdHJ1ZTtcclxuICAgICAgdGhpcy5fc2hvdWxkVHJpZ2dlclF1ZXJ5ID0gc2hvdWxkVHJpZ2dlclF1ZXJ5O1xyXG4gICAgICB0aGlzLnNlYXJjaFRlcm1zID0gW107XHJcbiAgICAgIGNvbnN0IGNsZWFyZWRWYWx1ZSA9IHRoaXMuZmlsdGVyUGFyYW1zLmhhc093blByb3BlcnR5KCdzbGlkZXJTdGFydFZhbHVlJykgPyB0aGlzLmZpbHRlclBhcmFtcy5zbGlkZXJTdGFydFZhbHVlIDogREVGQVVMVF9NSU5fVkFMVUU7XHJcbiAgICAgIHRoaXMuJHNlbGVjdE9wZXJhdG9yRWxtLnZhbCgwKTtcclxuICAgICAgdGhpcy4kZmlsdGVySW5wdXRFbG0udmFsKGNsZWFyZWRWYWx1ZSk7XHJcbiAgICAgIGlmICghdGhpcy5maWx0ZXJQYXJhbXMuaGlkZVNsaWRlck51bWJlcikge1xyXG4gICAgICAgIHRoaXMuJGNvbnRhaW5lcklucHV0R3JvdXBFbG0uY2hpbGRyZW4oJ2Rpdi5pbnB1dC1ncm91cC1hZGRvbi5pbnB1dC1ncm91cC1hcHBlbmQnKS5jaGlsZHJlbigpLmxhc3QoKS5odG1sKGNsZWFyZWRWYWx1ZSk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5vblRyaWdnZXJFdmVudCh1bmRlZmluZWQpO1xyXG4gICAgICB0aGlzLiRmaWx0ZXJFbG0ucmVtb3ZlQ2xhc3MoJ2ZpbGxlZCcpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogZGVzdHJveSB0aGUgZmlsdGVyXHJcbiAgICovXHJcbiAgZGVzdHJveSgpIHtcclxuICAgIGlmICh0aGlzLiRmaWx0ZXJFbG0pIHtcclxuICAgICAgdGhpcy4kZmlsdGVyRWxtLm9mZignaW5wdXQgY2hhbmdlJykucmVtb3ZlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXQgdmFsdWUocykgb24gdGhlIERPTSBlbGVtZW50XHJcbiAgICovXHJcbiAgc2V0VmFsdWVzKHZhbHVlczogU2VhcmNoVGVybVtdKSB7XHJcbiAgICBpZiAodmFsdWVzICYmIEFycmF5LmlzQXJyYXkodmFsdWVzKSkge1xyXG4gICAgICB0aGlzLiRmaWx0ZXJJbnB1dEVsbS52YWwodmFsdWVzWzBdKTtcclxuICAgICAgdGhpcy4kY29udGFpbmVySW5wdXRHcm91cEVsbS5jaGlsZHJlbignZGl2LmlucHV0LWdyb3VwLWFkZG9uLmlucHV0LWdyb3VwLWFwcGVuZCcpLmNoaWxkcmVuKCkubGFzdCgpLmh0bWwodmFsdWVzWzBdKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vXHJcbiAgLy8gcHJpdmF0ZSBmdW5jdGlvbnNcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgLyoqIEJ1aWxkIEhUTUwgVGVtcGxhdGUgZm9yIHRoZSBpbnB1dCByYW5nZSAoc2xpZGVyKSAqL1xyXG4gIHByaXZhdGUgYnVpbGRUZW1wbGF0ZUh0bWxTdHJpbmcoKSB7XHJcbiAgICBjb25zdCBtaW5WYWx1ZSA9IHRoaXMuZmlsdGVyUHJvcGVydGllcy5oYXNPd25Qcm9wZXJ0eSgnbWluVmFsdWUnKSA/IHRoaXMuZmlsdGVyUHJvcGVydGllcy5taW5WYWx1ZSA6IERFRkFVTFRfTUlOX1ZBTFVFO1xyXG4gICAgY29uc3QgbWF4VmFsdWUgPSB0aGlzLmZpbHRlclByb3BlcnRpZXMuaGFzT3duUHJvcGVydHkoJ21heFZhbHVlJykgPyB0aGlzLmZpbHRlclByb3BlcnRpZXMubWF4VmFsdWUgOiBERUZBVUxUX01BWF9WQUxVRTtcclxuICAgIGNvbnN0IGRlZmF1bHRWYWx1ZSA9IHRoaXMuZmlsdGVyUGFyYW1zLmhhc093blByb3BlcnR5KCdzbGlkZXJTdGFydFZhbHVlJykgPyB0aGlzLmZpbHRlclBhcmFtcy5zbGlkZXJTdGFydFZhbHVlIDogbWluVmFsdWU7XHJcbiAgICBjb25zdCBzdGVwID0gdGhpcy5maWx0ZXJQcm9wZXJ0aWVzLmhhc093blByb3BlcnR5KCd2YWx1ZVN0ZXAnKSA/IHRoaXMuZmlsdGVyUHJvcGVydGllcy52YWx1ZVN0ZXAgOiBERUZBVUxUX1NURVA7XHJcblxyXG4gICAgcmV0dXJuIGA8aW5wdXQgdHlwZT1cInJhbmdlXCIgaWQ9XCIke3RoaXMuX2VsZW1lbnRSYW5nZUlucHV0SWR9XCJcclxuICAgICAgICAgICAgICBuYW1lPVwiJHt0aGlzLl9lbGVtZW50UmFuZ2VJbnB1dElkfVwiXHJcbiAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlPVwiJHtkZWZhdWx0VmFsdWV9XCIgbWluPVwiJHttaW5WYWx1ZX1cIiBtYXg9XCIke21heFZhbHVlfVwiIHN0ZXA9XCIke3N0ZXB9XCJcclxuICAgICAgICAgICAgICBjbGFzcz1cImZvcm0tY29udHJvbCBzbGlkZXItZmlsdGVyLWlucHV0IHJhbmdlIGNvbXBvdW5kLXNsaWRlclwiIC8+YDtcclxuICB9XHJcblxyXG4gIC8qKiBCdWlsZCBIVE1MIFRlbXBsYXRlIGZvciB0aGUgdGV4dCAobnVtYmVyKSB0aGF0IGlzIHNob3duIGFwcGVuZGVkIHRvIHRoZSBzbGlkZXIgKi9cclxuICBwcml2YXRlIGJ1aWxkVGVtcGxhdGVTbGlkZXJUZXh0SHRtbFN0cmluZygpIHtcclxuICAgIGNvbnN0IG1pblZhbHVlID0gdGhpcy5maWx0ZXJQcm9wZXJ0aWVzLmhhc093blByb3BlcnR5KCdtaW5WYWx1ZScpID8gdGhpcy5maWx0ZXJQcm9wZXJ0aWVzLm1pblZhbHVlIDogREVGQVVMVF9NSU5fVkFMVUU7XHJcbiAgICBjb25zdCBkZWZhdWx0VmFsdWUgPSB0aGlzLmZpbHRlclBhcmFtcy5oYXNPd25Qcm9wZXJ0eSgnc2xpZGVyU3RhcnRWYWx1ZScpID8gdGhpcy5maWx0ZXJQYXJhbXMuc2xpZGVyU3RhcnRWYWx1ZSA6IG1pblZhbHVlO1xyXG5cclxuICAgIHJldHVybiBgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwLWFkZG9uIGlucHV0LWdyb3VwLWFwcGVuZCBzbGlkZXItdmFsdWVcIj48c3BhbiBjbGFzcz1cImlucHV0LWdyb3VwLXRleHRcIiBpZD1cIiR7dGhpcy5fZWxlbWVudFJhbmdlT3V0cHV0SWR9XCI+JHtkZWZhdWx0VmFsdWV9PC9zcGFuPjwvZGl2PmA7XHJcbiAgfVxyXG5cclxuICAvKiogQnVpbGQgSFRNTCBUZW1wbGF0ZSBzZWxlY3QgZHJvcGRvd24gKG9wZXJhdG9yKSAqL1xyXG4gIHByaXZhdGUgYnVpbGRTZWxlY3RPcGVyYXRvckh0bWxTdHJpbmcoKSB7XHJcbiAgICBjb25zdCBvcHRpb25WYWx1ZXMgPSB0aGlzLmdldE9wdGlvblZhbHVlcygpO1xyXG4gICAgbGV0IG9wdGlvblZhbHVlU3RyaW5nID0gJyc7XHJcbiAgICBvcHRpb25WYWx1ZXMuZm9yRWFjaCgob3B0aW9uKSA9PiB7XHJcbiAgICAgIG9wdGlvblZhbHVlU3RyaW5nICs9IGA8b3B0aW9uIHZhbHVlPVwiJHtvcHRpb24ub3BlcmF0b3J9XCIgdGl0bGU9XCIke29wdGlvbi5kZXNjcmlwdGlvbn1cIj4ke29wdGlvbi5vcGVyYXRvcn08L29wdGlvbj5gO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIGA8c2VsZWN0IGNsYXNzPVwiZm9ybS1jb250cm9sXCI+JHtvcHRpb25WYWx1ZVN0cmluZ308L3NlbGVjdD5gO1xyXG4gIH1cclxuXHJcbiAgLyoqIEdldCB0aGUgYXZhaWxhYmxlIG9wZXJhdG9yIG9wdGlvbiB2YWx1ZXMgKi9cclxuICBwcml2YXRlIGdldE9wdGlvblZhbHVlcygpOiB7IG9wZXJhdG9yOiBPcGVyYXRvclN0cmluZywgZGVzY3JpcHRpb246IHN0cmluZyB9W10ge1xyXG4gICAgcmV0dXJuIFtcclxuICAgICAgeyBvcGVyYXRvcjogJycgYXMgT3BlcmF0b3JTdHJpbmcsIGRlc2NyaXB0aW9uOiAnJyB9LFxyXG4gICAgICB7IG9wZXJhdG9yOiAnPScgYXMgT3BlcmF0b3JTdHJpbmcsIGRlc2NyaXB0aW9uOiAnJyB9LFxyXG4gICAgICB7IG9wZXJhdG9yOiAnPCcgYXMgT3BlcmF0b3JTdHJpbmcsIGRlc2NyaXB0aW9uOiAnJyB9LFxyXG4gICAgICB7IG9wZXJhdG9yOiAnPD0nIGFzIE9wZXJhdG9yU3RyaW5nLCBkZXNjcmlwdGlvbjogJycgfSxcclxuICAgICAgeyBvcGVyYXRvcjogJz4nIGFzIE9wZXJhdG9yU3RyaW5nLCBkZXNjcmlwdGlvbjogJycgfSxcclxuICAgICAgeyBvcGVyYXRvcjogJz49JyBhcyBPcGVyYXRvclN0cmluZywgZGVzY3JpcHRpb246ICcnIH0sXHJcbiAgICAgIHsgb3BlcmF0b3I6ICc8PicgYXMgT3BlcmF0b3JTdHJpbmcsIGRlc2NyaXB0aW9uOiAnJyB9XHJcbiAgICBdO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlIHRoZSBET00gZWxlbWVudFxyXG4gICAqL1xyXG4gIHByaXZhdGUgY3JlYXRlRG9tRWxlbWVudChzZWFyY2hUZXJtPzogU2VhcmNoVGVybSkge1xyXG4gICAgY29uc3QgZmllbGRJZCA9IHRoaXMuY29sdW1uRGVmICYmIHRoaXMuY29sdW1uRGVmLmlkO1xyXG4gICAgY29uc3Qgc2VhcmNoVGVybUlucHV0ID0gKHNlYXJjaFRlcm0gfHwgJzAnKSBhcyBzdHJpbmc7XHJcbiAgICBjb25zdCAkaGVhZGVyRWxtID0gdGhpcy5ncmlkLmdldEhlYWRlclJvd0NvbHVtbih0aGlzLmNvbHVtbkRlZi5pZCk7XHJcbiAgICAkKCRoZWFkZXJFbG0pLmVtcHR5KCk7XHJcblxyXG4gICAgLy8gY3JlYXRlIHRoZSBET00gU2VsZWN0IGRyb3Bkb3duIGZvciB0aGUgT3BlcmF0b3JcclxuICAgIHRoaXMuJHNlbGVjdE9wZXJhdG9yRWxtID0gJCh0aGlzLmJ1aWxkU2VsZWN0T3BlcmF0b3JIdG1sU3RyaW5nKCkpO1xyXG4gICAgdGhpcy4kZmlsdGVySW5wdXRFbG0gPSAkKHRoaXMuYnVpbGRUZW1wbGF0ZUh0bWxTdHJpbmcoKSk7XHJcbiAgICBjb25zdCAkZmlsdGVyQ29udGFpbmVyRWxtID0gJChgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXAgc2VhcmNoLWZpbHRlciBmaWx0ZXItJHtmaWVsZElkfVwiPjwvZGl2PmApO1xyXG4gICAgdGhpcy4kY29udGFpbmVySW5wdXRHcm91cEVsbSA9ICQoYDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cCBzZWFyY2gtZmlsdGVyIGZpbHRlci0ke2ZpZWxkSWR9XCI+PC9kaXY+YCk7XHJcbiAgICBjb25zdCAkb3BlcmF0b3JJbnB1dEdyb3VwQWRkb24gPSAkKGA8c3BhbiBjbGFzcz1cImlucHV0LWdyb3VwLWFkZG9uIGlucHV0LWdyb3VwLXByZXBlbmQgb3BlcmF0b3JcIj48L3NwYW4+YCk7XHJcblxyXG4gICAgLyogdGhlIERPTSBlbGVtZW50IGZpbmFsIHN0cnVjdHVyZSB3aWxsIGJlXHJcbiAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cFwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cC1hZGRvbiBpbnB1dC1ncm91cC1wcmVwZW5kIG9wZXJhdG9yXCI+XHJcbiAgICAgICAgICA8c2VsZWN0IGNsYXNzPVwiZm9ybS1jb250cm9sXCI+PC9zZWxlY3Q+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGlucHV0IGNsYXNzPVwiZm9ybS1jb250cm9sXCIgdHlwZT1cInRleHRcIiAvPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cC1hZGRvbiBpbnB1dC1ncm91cC1wcmVwZW5kXCIgaWQ9XCJyYW5nZU91cHV0X3BlcmNlbnRDb21wbGV0ZVwiPjxzcGFuIGNsYXNzPVwiaW5wdXQtZ3JvdXAtdGV4dFwiPjA8L3NwYW4+PC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKi9cclxuICAgICRvcGVyYXRvcklucHV0R3JvdXBBZGRvbi5hcHBlbmQodGhpcy4kc2VsZWN0T3BlcmF0b3JFbG0pO1xyXG4gICAgdGhpcy4kY29udGFpbmVySW5wdXRHcm91cEVsbS5hcHBlbmQoJG9wZXJhdG9ySW5wdXRHcm91cEFkZG9uKTtcclxuICAgIHRoaXMuJGNvbnRhaW5lcklucHV0R3JvdXBFbG0uYXBwZW5kKHRoaXMuJGZpbHRlcklucHV0RWxtKTtcclxuICAgIGlmICghdGhpcy5maWx0ZXJQYXJhbXMuaGlkZVNsaWRlck51bWJlcikge1xyXG4gICAgICBjb25zdCAkc2xpZGVyVGV4dElucHV0QXBwZW5kQWRkb24gPSAkKHRoaXMuYnVpbGRUZW1wbGF0ZVNsaWRlclRleHRIdG1sU3RyaW5nKCkpO1xyXG4gICAgICAkc2xpZGVyVGV4dElucHV0QXBwZW5kQWRkb24uY2hpbGRyZW4oKS5odG1sKHNlYXJjaFRlcm1JbnB1dCk7XHJcbiAgICAgIHRoaXMuJGNvbnRhaW5lcklucHV0R3JvdXBFbG0uYXBwZW5kKCRzbGlkZXJUZXh0SW5wdXRBcHBlbmRBZGRvbik7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gY3JlYXRlIHRoZSBET00gZWxlbWVudCAmIGFkZCBhbiBJRCBhbmQgZmlsdGVyIGNsYXNzXHJcbiAgICAkZmlsdGVyQ29udGFpbmVyRWxtLmFwcGVuZCh0aGlzLiRjb250YWluZXJJbnB1dEdyb3VwRWxtKTtcclxuICAgICRmaWx0ZXJDb250YWluZXJFbG0uYXR0cignaWQnLCBgZmlsdGVyLSR7ZmllbGRJZH1gKTtcclxuXHJcbiAgICB0aGlzLiRmaWx0ZXJJbnB1dEVsbS52YWwoc2VhcmNoVGVybUlucHV0KTtcclxuICAgIHRoaXMuJGZpbHRlcklucHV0RWxtLmRhdGEoJ2NvbHVtbklkJywgZmllbGRJZCk7XHJcblxyXG4gICAgaWYgKHRoaXMub3BlcmF0b3IpIHtcclxuICAgICAgdGhpcy4kc2VsZWN0T3BlcmF0b3JFbG0udmFsKHRoaXMub3BlcmF0b3IpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGlmIHRoZXJlJ3MgYSBzZWFyY2ggdGVybSwgd2Ugd2lsbCBhZGQgdGhlIFwiZmlsbGVkXCIgY2xhc3MgZm9yIHN0eWxpbmcgcHVycG9zZXNcclxuICAgIGlmIChzZWFyY2hUZXJtKSB7XHJcbiAgICAgICRmaWx0ZXJDb250YWluZXJFbG0uYWRkQ2xhc3MoJ2ZpbGxlZCcpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGFwcGVuZCB0aGUgbmV3IERPTSBlbGVtZW50IHRvIHRoZSBoZWFkZXIgcm93XHJcbiAgICBpZiAoJGZpbHRlckNvbnRhaW5lckVsbSAmJiB0eXBlb2YgJGZpbHRlckNvbnRhaW5lckVsbS5hcHBlbmRUbyA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAkZmlsdGVyQ29udGFpbmVyRWxtLmFwcGVuZFRvKCRoZWFkZXJFbG0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAkZmlsdGVyQ29udGFpbmVyRWxtO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBvblRyaWdnZXJFdmVudChlOiBFdmVudCB8IHVuZGVmaW5lZCkge1xyXG4gICAgaWYgKHRoaXMuX2NsZWFyRmlsdGVyVHJpZ2dlcmVkKSB7XHJcbiAgICAgIHRoaXMuY2FsbGJhY2soZSwgeyBjb2x1bW5EZWY6IHRoaXMuY29sdW1uRGVmLCBjbGVhckZpbHRlclRyaWdnZXJlZDogdGhpcy5fY2xlYXJGaWx0ZXJUcmlnZ2VyZWQsIHNob3VsZFRyaWdnZXJRdWVyeTogdGhpcy5fc2hvdWxkVHJpZ2dlclF1ZXJ5IH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3Qgc2VsZWN0ZWRPcGVyYXRvciA9IHRoaXMuJHNlbGVjdE9wZXJhdG9yRWxtLmZpbmQoJ29wdGlvbjpzZWxlY3RlZCcpLnRleHQoKTtcclxuICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLiRmaWx0ZXJJbnB1dEVsbS52YWwoKTtcclxuICAgICAgKHZhbHVlKSA/IHRoaXMuJGZpbHRlckVsbS5hZGRDbGFzcygnZmlsbGVkJykgOiB0aGlzLiRmaWx0ZXJFbG0ucmVtb3ZlQ2xhc3MoJ2ZpbGxlZCcpO1xyXG4gICAgICB0aGlzLmNhbGxiYWNrKGUsIHsgY29sdW1uRGVmOiB0aGlzLmNvbHVtbkRlZiwgc2VhcmNoVGVybXM6ICh2YWx1ZSA/IFt2YWx1ZV0gOiBudWxsKSwgb3BlcmF0b3I6IHNlbGVjdGVkT3BlcmF0b3IgfHwgJycsIHNob3VsZFRyaWdnZXJRdWVyeTogdGhpcy5fc2hvdWxkVHJpZ2dlclF1ZXJ5IH0pO1xyXG4gICAgfVxyXG4gICAgLy8gcmVzZXQgYm90aCBmbGFncyBmb3IgbmV4dCB1c2VcclxuICAgIHRoaXMuX2NsZWFyRmlsdGVyVHJpZ2dlcmVkID0gZmFsc2U7XHJcbiAgICB0aGlzLl9zaG91bGRUcmlnZ2VyUXVlcnkgPSB0cnVlO1xyXG4gIH1cclxufVxyXG4iXX0=