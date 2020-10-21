import { FieldType } from './../models/index';
import { OperatorType, } from './../models/index';
var CompoundInputFilter = /** @class */ (function () {
    function CompoundInputFilter(translate) {
        this.translate = translate;
        this._clearFilterTriggered = false;
        this._shouldTriggerQuery = true;
        this._inputType = 'text';
    }
    Object.defineProperty(CompoundInputFilter.prototype, "gridOptions", {
        /** Getter for the Grid Options pulled through the Grid Object */
        get: function () {
            return (this.grid && this.grid.getOptions) ? this.grid.getOptions() : {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompoundInputFilter.prototype, "columnFilter", {
        /** Getter for the Column Filter */
        get: function () {
            return this.columnDef && this.columnDef.filter || {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompoundInputFilter.prototype, "inputType", {
        /** Getter of input type (text, number, password) */
        get: function () {
            return this._inputType;
        },
        /** Setter of input type (text, number, password) */
        set: function (type) {
            this._inputType = type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompoundInputFilter.prototype, "operator", {
        /** Getter of the Operator to use when doing the filter comparing */
        get: function () {
            return this._operator || OperatorType.empty;
        },
        /** Getter of the Operator to use when doing the filter comparing */
        set: function (op) {
            this._operator = op;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Initialize the Filter
     */
    CompoundInputFilter.prototype.init = function (args) {
        var _this = this;
        this.grid = args.grid;
        this.callback = args.callback;
        this.columnDef = args.columnDef;
        this.operator = args.operator;
        this.searchTerms = args.searchTerms || [];
        // filter input can only have 1 search term, so we will use the 1st array index if it exist
        var searchTerm = (Array.isArray(this.searchTerms) && this.searchTerms[0]) || '';
        // step 1, create the DOM Element of the filter which contain the compound Operator+Input
        // and initialize it if searchTerms is filled
        this.$filterElm = this.createDomElement(searchTerm);
        // step 3, subscribe to the keyup event and run the callback when that happens
        // also add/remove "filled" class for styling purposes
        this.$filterInputElm.on('keyup input change', function (e) {
            _this.onTriggerEvent(e);
        });
        this.$selectOperatorElm.on('change', function (e) {
            _this.onTriggerEvent(e);
        });
    };
    /**
     * Clear the filter value
     */
    CompoundInputFilter.prototype.clear = function (shouldTriggerQuery) {
        if (shouldTriggerQuery === void 0) { shouldTriggerQuery = true; }
        if (this.$filterElm && this.$selectOperatorElm) {
            this._clearFilterTriggered = true;
            this._shouldTriggerQuery = shouldTriggerQuery;
            this.searchTerms = [];
            this.$selectOperatorElm.val(0);
            this.$filterInputElm.val('');
            this.onTriggerEvent(null);
        }
    };
    /**
     * destroy the filter
     */
    CompoundInputFilter.prototype.destroy = function () {
        if (this.$filterElm && this.$selectOperatorElm) {
            this.$filterElm.off('keyup input change').remove();
            this.$selectOperatorElm.off('change');
        }
    };
    /**
     * Set value(s) on the DOM element
     */
    CompoundInputFilter.prototype.setValues = function (values) {
        if (values && Array.isArray(values)) {
            this.$filterElm.val(values[0]);
        }
    };
    //
    // private functions
    // ------------------
    CompoundInputFilter.prototype.buildInputHtmlString = function () {
        var placeholder = (this.gridOptions) ? (this.gridOptions.defaultFilterPlaceholder || '') : '';
        if (this.columnFilter && this.columnFilter.placeholder) {
            placeholder = this.columnFilter.placeholder;
        }
        return "<input type=\"" + (this._inputType || 'text') + "\" role=\"presentation\"  autocomplete=\"off\" class=\"form-control\" placeholder=\"" + placeholder + "\" /><span></span>";
    };
    CompoundInputFilter.prototype.buildSelectOperatorHtmlString = function () {
        var optionValues = this.getOptionValues();
        var optionValueString = '';
        optionValues.forEach(function (option) {
            optionValueString += "<option value=\"" + option.operator + "\" title=\"" + option.description + "\">" + option.operator + "</option>";
        });
        return "<select class=\"form-control\">" + optionValueString + "</select>";
    };
    CompoundInputFilter.prototype.getOptionValues = function () {
        var type = (this.columnDef.type && this.columnDef.type) ? this.columnDef.type : FieldType.string;
        var optionValues = [];
        switch (type) {
            case FieldType.string:
                optionValues = [
                    { operator: '', description: this.translate.instant('CONTAINS') },
                    { operator: '=', description: this.translate.instant('EQUALS') },
                    { operator: 'a*', description: this.translate.instant('STARTS_WITH') },
                    { operator: '*z', description: this.translate.instant('ENDS_WITH') },
                ];
                break;
            default:
                optionValues = [
                    { operator: '', description: this.translate.instant('CONTAINS') },
                    { operator: '=', description: '' },
                    { operator: '<', description: '' },
                    { operator: '<=', description: '' },
                    { operator: '>', description: '' },
                    { operator: '>=', description: '' },
                    { operator: '<>', description: '' }
                ];
                break;
        }
        return optionValues;
    };
    /**
     * Create the DOM element
     */
    CompoundInputFilter.prototype.createDomElement = function (searchTerm) {
        var fieldId = this.columnDef && this.columnDef.id;
        var $headerElm = this.grid.getHeaderRowColumn(fieldId);
        $($headerElm).empty();
        // create the DOM Select dropdown for the Operator
        this.$selectOperatorElm = $(this.buildSelectOperatorHtmlString());
        this.$filterInputElm = $(this.buildInputHtmlString());
        var $filterContainerElm = $("<div class=\"form-group search-filter filter-" + fieldId + "\"></div>");
        var $containerInputGroup = $("<div class=\"input-group\"></div>");
        var $operatorInputGroupAddon = $("<div class=\"input-group-addon input-group-prepend operator\"></div>");
        /* the DOM element final structure will be
          <div class="input-group">
            <div class="input-group-addon input-group-prepend operator">
              <select class="form-control"></select>
            </div>
            <input class="form-control" type="text" />
          </div>
        */
        $operatorInputGroupAddon.append(this.$selectOperatorElm);
        $containerInputGroup.append($operatorInputGroupAddon);
        $containerInputGroup.append(this.$filterInputElm);
        // create the DOM element & add an ID and filter class
        $filterContainerElm.append($containerInputGroup);
        $filterContainerElm.attr('id', "filter-" + fieldId);
        this.$filterInputElm.val(searchTerm);
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
    };
    CompoundInputFilter.prototype.onTriggerEvent = function (e) {
        if (this._clearFilterTriggered) {
            this.callback(e, { columnDef: this.columnDef, clearFilterTriggered: this._clearFilterTriggered, shouldTriggerQuery: this._shouldTriggerQuery });
            this.$filterElm.removeClass('filled');
        }
        else {
            var selectedOperator = this.$selectOperatorElm.find('option:selected').text();
            var value = this.$filterInputElm.val();
            var enableWhiteSpaceTrim = this.gridOptions.enableFilterTrimWhiteSpace || this.columnFilter.enableTrimWhiteSpace;
            if (typeof value === 'string' && enableWhiteSpaceTrim) {
                value = value.trim();
            }
            (value !== null && value !== undefined && value !== '') ? this.$filterElm.addClass('filled') : this.$filterElm.removeClass('filled');
            this.callback(e, { columnDef: this.columnDef, searchTerms: (value ? [value] : null), operator: selectedOperator || '', shouldTriggerQuery: this._shouldTriggerQuery });
        }
        // reset both flags for next use
        this._clearFilterTriggered = false;
        this._shouldTriggerQuery = true;
    };
    return CompoundInputFilter;
}());
export { CompoundInputFilter };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG91bmRJbnB1dEZpbHRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvZmlsdGVycy9jb21wb3VuZElucHV0RmlsdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM5QyxPQUFPLEVBUUwsWUFBWSxHQUViLE1BQU0sbUJBQW1CLENBQUM7QUFLM0I7SUFhRSw2QkFBc0IsU0FBMkI7UUFBM0IsY0FBUyxHQUFULFNBQVMsQ0FBa0I7UUFaekMsMEJBQXFCLEdBQUcsS0FBSyxDQUFDO1FBQzlCLHdCQUFtQixHQUFHLElBQUksQ0FBQztRQUMzQixlQUFVLEdBQUcsTUFBTSxDQUFDO0lBVXlCLENBQUM7SUFHdEQsc0JBQVksNENBQVc7UUFEdkIsaUVBQWlFO2FBQ2pFO1lBQ0UsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQzNFLENBQUM7OztPQUFBO0lBR0Qsc0JBQUksNkNBQVk7UUFEaEIsbUNBQW1DO2FBQ25DO1lBQ0UsT0FBTyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQztRQUN2RCxDQUFDOzs7T0FBQTtJQUdELHNCQUFJLDBDQUFTO1FBRGIsb0RBQW9EO2FBQ3BEO1lBQ0UsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ3pCLENBQUM7UUFFRCxvREFBb0Q7YUFDcEQsVUFBYyxJQUFZO1lBQ3hCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLENBQUM7OztPQUxBO0lBUUQsc0JBQUkseUNBQVE7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Q0FBQyxLQUFLLEtBQUssSUFBSSxJQUFJLEtBQUssS0FBSyxTQUFTLElBQUksS0FBSyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDckksSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxXQUFXLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLFFBQVEsRUFBRSxnQkFBZ0IsSUFBSSxFQUFFLEVBQUUsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUMsQ0FBQztTQUN4SztRQUNELGdDQUFnQztRQUNoQyxJQUFJLENBQUMscUJBQXFCLEdBQUcsS0FBSyxDQUFDO1FBQ25DLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUM7SUFDbEMsQ0FBQztJQUNILDBCQUFDO0FBQUQsQ0FBQyxBQXJPRCxJQXFPQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcbmltcG9ydCB7IEZpZWxkVHlwZSB9IGZyb20gJy4vLi4vbW9kZWxzL2luZGV4JztcbmltcG9ydCB7XG4gIENvbHVtbixcbiAgQ29sdW1uRmlsdGVyLFxuICBGaWx0ZXIsXG4gIEZpbHRlckFyZ3VtZW50cyxcbiAgRmlsdGVyQ2FsbGJhY2ssXG4gIEdyaWRPcHRpb24sXG4gIE9wZXJhdG9yU3RyaW5nLFxuICBPcGVyYXRvclR5cGUsXG4gIFNlYXJjaFRlcm0sXG59IGZyb20gJy4vLi4vbW9kZWxzL2luZGV4JztcblxuLy8gdXNpbmcgZXh0ZXJuYWwgbm9uLXR5cGVkIGpzIGxpYnJhcmllc1xuZGVjbGFyZSB2YXIgJDogYW55O1xuXG5leHBvcnQgY2xhc3MgQ29tcG91bmRJbnB1dEZpbHRlciBpbXBsZW1lbnRzIEZpbHRlciB7XG4gIHByaXZhdGUgX2NsZWFyRmlsdGVyVHJpZ2dlcmVkID0gZmFsc2U7XG4gIHByaXZhdGUgX3Nob3VsZFRyaWdnZXJRdWVyeSA9IHRydWU7XG4gIHByaXZhdGUgX2lucHV0VHlwZSA9ICd0ZXh0JztcbiAgcHJpdmF0ZSAkZmlsdGVyRWxtOiBhbnk7XG4gIHByaXZhdGUgJGZpbHRlcklucHV0RWxtOiBhbnk7XG4gIHByaXZhdGUgJHNlbGVjdE9wZXJhdG9yRWxtOiBhbnk7XG4gIHByaXZhdGUgX29wZXJhdG9yOiBPcGVyYXRvclR5cGUgfCBPcGVyYXRvclN0cmluZztcbiAgZ3JpZDogYW55O1xuICBzZWFyY2hUZXJtczogU2VhcmNoVGVybVtdO1xuICBjb2x1bW5EZWY6IENvbHVtbjtcbiAgY2FsbGJhY2s6IEZpbHRlckNhbGxiYWNrO1xuXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCB0cmFuc2xhdGU6IFRyYW5zbGF0ZVNlcnZpY2UpIHsgfVxuXG4gIC8qKiBHZXR0ZXIgZm9yIHRoZSBHcmlkIE9wdGlvbnMgcHVsbGVkIHRocm91Z2ggdGhlIEdyaWQgT2JqZWN0ICovXG4gIHByaXZhdGUgZ2V0IGdyaWRPcHRpb25zKCk6IEdyaWRPcHRpb24ge1xuICAgIHJldHVybiAodGhpcy5ncmlkICYmIHRoaXMuZ3JpZC5nZXRPcHRpb25zKSA/IHRoaXMuZ3JpZC5nZXRPcHRpb25zKCkgOiB7fTtcbiAgfVxuXG4gIC8qKiBHZXR0ZXIgZm9yIHRoZSBDb2x1bW4gRmlsdGVyICovXG4gIGdldCBjb2x1bW5GaWx0ZXIoKTogQ29sdW1uRmlsdGVyIHtcbiAgICByZXR1cm4gdGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYuZmlsdGVyIHx8IHt9O1xuICB9XG5cbiAgLyoqIEdldHRlciBvZiBpbnB1dCB0eXBlICh0ZXh0LCBudW1iZXIsIHBhc3N3b3JkKSAqL1xuICBnZXQgaW5wdXRUeXBlKCkge1xuICAgIHJldHVybiB0aGlzLl9pbnB1dFR5cGU7XG4gIH1cblxuICAvKiogU2V0dGVyIG9mIGlucHV0IHR5cGUgKHRleHQsIG51bWJlciwgcGFzc3dvcmQpICovXG4gIHNldCBpbnB1dFR5cGUodHlwZTogc3RyaW5nKSB7XG4gICAgdGhpcy5faW5wdXRUeXBlID0gdHlwZTtcbiAgfVxuXG4gIC8qKiBHZXR0ZXIgb2YgdGhlIE9wZXJhdG9yIHRvIHVzZSB3aGVuIGRvaW5nIHRoZSBmaWx0ZXIgY29tcGFyaW5nICovXG4gIGdldCBvcGVyYXRvcigpOiBPcGVyYXRvclR5cGUgfCBPcGVyYXRvclN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX29wZXJhdG9yIHx8IE9wZXJhdG9yVHlwZS5lbXB0eTtcbiAgfVxuXG4gIC8qKiBHZXR0ZXIgb2YgdGhlIE9wZXJhdG9yIHRvIHVzZSB3aGVuIGRvaW5nIHRoZSBmaWx0ZXIgY29tcGFyaW5nICovXG4gIHNldCBvcGVyYXRvcihvcDogT3BlcmF0b3JUeXBlIHwgT3BlcmF0b3JTdHJpbmcpIHtcbiAgICB0aGlzLl9vcGVyYXRvciA9IG9wO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemUgdGhlIEZpbHRlclxuICAgKi9cbiAgaW5pdChhcmdzOiBGaWx0ZXJBcmd1bWVudHMpIHtcbiAgICB0aGlzLmdyaWQgPSBhcmdzLmdyaWQ7XG4gICAgdGhpcy5jYWxsYmFjayA9IGFyZ3MuY2FsbGJhY2s7XG4gICAgdGhpcy5jb2x1bW5EZWYgPSBhcmdzLmNvbHVtbkRlZjtcbiAgICB0aGlzLm9wZXJhdG9yID0gYXJncy5vcGVyYXRvcjtcbiAgICB0aGlzLnNlYXJjaFRlcm1zID0gYXJncy5zZWFyY2hUZXJtcyB8fCBbXTtcblxuICAgIC8vIGZpbHRlciBpbnB1dCBjYW4gb25seSBoYXZlIDEgc2VhcmNoIHRlcm0sIHNvIHdlIHdpbGwgdXNlIHRoZSAxc3QgYXJyYXkgaW5kZXggaWYgaXQgZXhpc3RcbiAgICBjb25zdCBzZWFyY2hUZXJtID0gKEFycmF5LmlzQXJyYXkodGhpcy5zZWFyY2hUZXJtcykgJiYgdGhpcy5zZWFyY2hUZXJtc1swXSkgfHwgJyc7XG5cbiAgICAvLyBzdGVwIDEsIGNyZWF0ZSB0aGUgRE9NIEVsZW1lbnQgb2YgdGhlIGZpbHRlciB3aGljaCBjb250YWluIHRoZSBjb21wb3VuZCBPcGVyYXRvcitJbnB1dFxuICAgIC8vIGFuZCBpbml0aWFsaXplIGl0IGlmIHNlYXJjaFRlcm1zIGlzIGZpbGxlZFxuICAgIHRoaXMuJGZpbHRlckVsbSA9IHRoaXMuY3JlYXRlRG9tRWxlbWVudChzZWFyY2hUZXJtKTtcblxuICAgIC8vIHN0ZXAgMywgc3Vic2NyaWJlIHRvIHRoZSBrZXl1cCBldmVudCBhbmQgcnVuIHRoZSBjYWxsYmFjayB3aGVuIHRoYXQgaGFwcGVuc1xuICAgIC8vIGFsc28gYWRkL3JlbW92ZSBcImZpbGxlZFwiIGNsYXNzIGZvciBzdHlsaW5nIHB1cnBvc2VzXG4gICAgdGhpcy4kZmlsdGVySW5wdXRFbG0ub24oJ2tleXVwIGlucHV0IGNoYW5nZScsIChlOiBhbnkpID0+IHtcbiAgICAgIHRoaXMub25UcmlnZ2VyRXZlbnQoZSk7XG4gICAgfSk7XG4gICAgdGhpcy4kc2VsZWN0T3BlcmF0b3JFbG0ub24oJ2NoYW5nZScsIChlOiBhbnkpID0+IHtcbiAgICAgIHRoaXMub25UcmlnZ2VyRXZlbnQoZSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ2xlYXIgdGhlIGZpbHRlciB2YWx1ZVxuICAgKi9cbiAgY2xlYXIoc2hvdWxkVHJpZ2dlclF1ZXJ5ID0gdHJ1ZSkge1xuICAgIGlmICh0aGlzLiRmaWx0ZXJFbG0gJiYgdGhpcy4kc2VsZWN0T3BlcmF0b3JFbG0pIHtcbiAgICAgIHRoaXMuX2NsZWFyRmlsdGVyVHJpZ2dlcmVkID0gdHJ1ZTtcbiAgICAgIHRoaXMuX3Nob3VsZFRyaWdnZXJRdWVyeSA9IHNob3VsZFRyaWdnZXJRdWVyeTtcbiAgICAgIHRoaXMuc2VhcmNoVGVybXMgPSBbXTtcbiAgICAgIHRoaXMuJHNlbGVjdE9wZXJhdG9yRWxtLnZhbCgwKTtcbiAgICAgIHRoaXMuJGZpbHRlcklucHV0RWxtLnZhbCgnJyk7XG4gICAgICB0aGlzLm9uVHJpZ2dlckV2ZW50KG51bGwpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBkZXN0cm95IHRoZSBmaWx0ZXJcbiAgICovXG4gIGRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuJGZpbHRlckVsbSAmJiB0aGlzLiRzZWxlY3RPcGVyYXRvckVsbSkge1xuICAgICAgdGhpcy4kZmlsdGVyRWxtLm9mZigna2V5dXAgaW5wdXQgY2hhbmdlJykucmVtb3ZlKCk7XG4gICAgICB0aGlzLiRzZWxlY3RPcGVyYXRvckVsbS5vZmYoJ2NoYW5nZScpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdmFsdWUocykgb24gdGhlIERPTSBlbGVtZW50XG4gICAqL1xuICBzZXRWYWx1ZXModmFsdWVzOiBTZWFyY2hUZXJtW10pIHtcbiAgICBpZiAodmFsdWVzICYmIEFycmF5LmlzQXJyYXkodmFsdWVzKSkge1xuICAgICAgdGhpcy4kZmlsdGVyRWxtLnZhbCh2YWx1ZXNbMF0pO1xuICAgIH1cbiAgfVxuXG4gIC8vXG4gIC8vIHByaXZhdGUgZnVuY3Rpb25zXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gIHByaXZhdGUgYnVpbGRJbnB1dEh0bWxTdHJpbmcoKSB7XG4gICAgbGV0IHBsYWNlaG9sZGVyID0gKHRoaXMuZ3JpZE9wdGlvbnMpID8gKHRoaXMuZ3JpZE9wdGlvbnMuZGVmYXVsdEZpbHRlclBsYWNlaG9sZGVyIHx8ICcnKSA6ICcnO1xuICAgIGlmICh0aGlzLmNvbHVtbkZpbHRlciAmJiB0aGlzLmNvbHVtbkZpbHRlci5wbGFjZWhvbGRlcikge1xuICAgICAgcGxhY2Vob2xkZXIgPSB0aGlzLmNvbHVtbkZpbHRlci5wbGFjZWhvbGRlcjtcbiAgICB9XG4gICAgcmV0dXJuIGA8aW5wdXQgdHlwZT1cIiR7dGhpcy5faW5wdXRUeXBlIHx8ICd0ZXh0J31cIiByb2xlPVwicHJlc2VudGF0aW9uXCIgIGF1dG9jb21wbGV0ZT1cIm9mZlwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgcGxhY2Vob2xkZXI9XCIke3BsYWNlaG9sZGVyfVwiIC8+PHNwYW4+PC9zcGFuPmA7XG4gIH1cblxuICBwcml2YXRlIGJ1aWxkU2VsZWN0T3BlcmF0b3JIdG1sU3RyaW5nKCkge1xuICAgIGNvbnN0IG9wdGlvblZhbHVlcyA9IHRoaXMuZ2V0T3B0aW9uVmFsdWVzKCk7XG4gICAgbGV0IG9wdGlvblZhbHVlU3RyaW5nID0gJyc7XG4gICAgb3B0aW9uVmFsdWVzLmZvckVhY2goKG9wdGlvbikgPT4ge1xuICAgICAgb3B0aW9uVmFsdWVTdHJpbmcgKz0gYDxvcHRpb24gdmFsdWU9XCIke29wdGlvbi5vcGVyYXRvcn1cIiB0aXRsZT1cIiR7b3B0aW9uLmRlc2NyaXB0aW9ufVwiPiR7b3B0aW9uLm9wZXJhdG9yfTwvb3B0aW9uPmA7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gYDxzZWxlY3QgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIj4ke29wdGlvblZhbHVlU3RyaW5nfTwvc2VsZWN0PmA7XG4gIH1cblxuICBwcml2YXRlIGdldE9wdGlvblZhbHVlcygpOiB7IG9wZXJhdG9yOiBPcGVyYXRvclN0cmluZywgZGVzY3JpcHRpb246IHN0cmluZyB9W10ge1xuICAgIGNvbnN0IHR5cGUgPSAodGhpcy5jb2x1bW5EZWYudHlwZSAmJiB0aGlzLmNvbHVtbkRlZi50eXBlKSA/IHRoaXMuY29sdW1uRGVmLnR5cGUgOiBGaWVsZFR5cGUuc3RyaW5nO1xuICAgIGxldCBvcHRpb25WYWx1ZXMgPSBbXTtcblxuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSBGaWVsZFR5cGUuc3RyaW5nOlxuICAgICAgICBvcHRpb25WYWx1ZXMgPSBbXG4gICAgICAgICAgeyBvcGVyYXRvcjogJycgYXMgT3BlcmF0b3JTdHJpbmcsIGRlc2NyaXB0aW9uOiB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KCdDT05UQUlOUycpIH0sXG4gICAgICAgICAgeyBvcGVyYXRvcjogJz0nIGFzIE9wZXJhdG9yU3RyaW5nLCBkZXNjcmlwdGlvbjogdGhpcy50cmFuc2xhdGUuaW5zdGFudCgnRVFVQUxTJykgfSxcbiAgICAgICAgICB7IG9wZXJhdG9yOiAnYSonIGFzIE9wZXJhdG9yU3RyaW5nLCBkZXNjcmlwdGlvbjogdGhpcy50cmFuc2xhdGUuaW5zdGFudCgnU1RBUlRTX1dJVEgnKSB9LFxuICAgICAgICAgIHsgb3BlcmF0b3I6ICcqeicgYXMgT3BlcmF0b3JTdHJpbmcsIGRlc2NyaXB0aW9uOiB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KCdFTkRTX1dJVEgnKSB9LFxuICAgICAgICAgIC8qXG4gICAgICAgICAgeyBvcGVyYXRvcjogJ0lOJyBhcyBPcGVyYXRvclN0cmluZywgZGVzY3JpcHRpb246IHRoaXMudHJhbnNsYXRlLmluc3RhbnQoJ0lOX0NPTExFQ1RJT05fU0VQRVJBVEVEX0JZX0NPTU1BJykgfSxcbiAgICAgICAgICB7IG9wZXJhdG9yOiAnTklOJyBhcyBPcGVyYXRvclN0cmluZywgZGVzY3JpcHRpb246IHRoaXMudHJhbnNsYXRlLmluc3RhbnQoJ05PVF9JTl9DT0xMRUNUSU9OX1NFUEVSQVRFRF9CWV9DT01NQScpIH0sXG4gICAgICAgICAgKi9cbiAgICAgICAgXTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBvcHRpb25WYWx1ZXMgPSBbXG4gICAgICAgICAgeyBvcGVyYXRvcjogJycgYXMgT3BlcmF0b3JTdHJpbmcsIGRlc2NyaXB0aW9uOiB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KCdDT05UQUlOUycpIH0sXG4gICAgICAgICAgeyBvcGVyYXRvcjogJz0nIGFzIE9wZXJhdG9yU3RyaW5nLCBkZXNjcmlwdGlvbjogJycgfSxcbiAgICAgICAgICB7IG9wZXJhdG9yOiAnPCcgYXMgT3BlcmF0b3JTdHJpbmcsIGRlc2NyaXB0aW9uOiAnJyB9LFxuICAgICAgICAgIHsgb3BlcmF0b3I6ICc8PScgYXMgT3BlcmF0b3JTdHJpbmcsIGRlc2NyaXB0aW9uOiAnJyB9LFxuICAgICAgICAgIHsgb3BlcmF0b3I6ICc+JyBhcyBPcGVyYXRvclN0cmluZywgZGVzY3JpcHRpb246ICcnIH0sXG4gICAgICAgICAgeyBvcGVyYXRvcjogJz49JyBhcyBPcGVyYXRvclN0cmluZywgZGVzY3JpcHRpb246ICcnIH0sXG4gICAgICAgICAgeyBvcGVyYXRvcjogJzw+JyBhcyBPcGVyYXRvclN0cmluZywgZGVzY3JpcHRpb246ICcnIH1dO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICByZXR1cm4gb3B0aW9uVmFsdWVzO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSB0aGUgRE9NIGVsZW1lbnRcbiAgICovXG4gIHByaXZhdGUgY3JlYXRlRG9tRWxlbWVudChzZWFyY2hUZXJtPzogU2VhcmNoVGVybSkge1xuICAgIGNvbnN0IGZpZWxkSWQgPSB0aGlzLmNvbHVtbkRlZiAmJiB0aGlzLmNvbHVtbkRlZi5pZDtcbiAgICBjb25zdCAkaGVhZGVyRWxtID0gdGhpcy5ncmlkLmdldEhlYWRlclJvd0NvbHVtbihmaWVsZElkKTtcbiAgICAkKCRoZWFkZXJFbG0pLmVtcHR5KCk7XG5cbiAgICAvLyBjcmVhdGUgdGhlIERPTSBTZWxlY3QgZHJvcGRvd24gZm9yIHRoZSBPcGVyYXRvclxuICAgIHRoaXMuJHNlbGVjdE9wZXJhdG9yRWxtID0gJCh0aGlzLmJ1aWxkU2VsZWN0T3BlcmF0b3JIdG1sU3RyaW5nKCkpO1xuICAgIHRoaXMuJGZpbHRlcklucHV0RWxtID0gJCh0aGlzLmJ1aWxkSW5wdXRIdG1sU3RyaW5nKCkpO1xuICAgIGNvbnN0ICRmaWx0ZXJDb250YWluZXJFbG0gPSAkKGA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCBzZWFyY2gtZmlsdGVyIGZpbHRlci0ke2ZpZWxkSWR9XCI+PC9kaXY+YCk7XG4gICAgY29uc3QgJGNvbnRhaW5lcklucHV0R3JvdXAgPSAkKGA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXBcIj48L2Rpdj5gKTtcbiAgICBjb25zdCAkb3BlcmF0b3JJbnB1dEdyb3VwQWRkb24gPSAkKGA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAtYWRkb24gaW5wdXQtZ3JvdXAtcHJlcGVuZCBvcGVyYXRvclwiPjwvZGl2PmApO1xuXG4gICAgLyogdGhlIERPTSBlbGVtZW50IGZpbmFsIHN0cnVjdHVyZSB3aWxsIGJlXG4gICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXBcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwLWFkZG9uIGlucHV0LWdyb3VwLXByZXBlbmQgb3BlcmF0b3JcIj5cbiAgICAgICAgICA8c2VsZWN0IGNsYXNzPVwiZm9ybS1jb250cm9sXCI+PC9zZWxlY3Q+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8aW5wdXQgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiB0eXBlPVwidGV4dFwiIC8+XG4gICAgICA8L2Rpdj5cbiAgICAqL1xuICAgICRvcGVyYXRvcklucHV0R3JvdXBBZGRvbi5hcHBlbmQodGhpcy4kc2VsZWN0T3BlcmF0b3JFbG0pO1xuICAgICRjb250YWluZXJJbnB1dEdyb3VwLmFwcGVuZCgkb3BlcmF0b3JJbnB1dEdyb3VwQWRkb24pO1xuICAgICRjb250YWluZXJJbnB1dEdyb3VwLmFwcGVuZCh0aGlzLiRmaWx0ZXJJbnB1dEVsbSk7XG5cbiAgICAvLyBjcmVhdGUgdGhlIERPTSBlbGVtZW50ICYgYWRkIGFuIElEIGFuZCBmaWx0ZXIgY2xhc3NcbiAgICAkZmlsdGVyQ29udGFpbmVyRWxtLmFwcGVuZCgkY29udGFpbmVySW5wdXRHcm91cCk7XG4gICAgJGZpbHRlckNvbnRhaW5lckVsbS5hdHRyKCdpZCcsIGBmaWx0ZXItJHtmaWVsZElkfWApO1xuXG4gICAgdGhpcy4kZmlsdGVySW5wdXRFbG0udmFsKHNlYXJjaFRlcm0pO1xuICAgIHRoaXMuJGZpbHRlcklucHV0RWxtLmRhdGEoJ2NvbHVtbklkJywgZmllbGRJZCk7XG5cbiAgICBpZiAodGhpcy5vcGVyYXRvcikge1xuICAgICAgdGhpcy4kc2VsZWN0T3BlcmF0b3JFbG0udmFsKHRoaXMub3BlcmF0b3IpO1xuICAgIH1cblxuICAgIC8vIGlmIHRoZXJlJ3MgYSBzZWFyY2ggdGVybSwgd2Ugd2lsbCBhZGQgdGhlIFwiZmlsbGVkXCIgY2xhc3MgZm9yIHN0eWxpbmcgcHVycG9zZXNcbiAgICBpZiAoc2VhcmNoVGVybSkge1xuICAgICAgJGZpbHRlckNvbnRhaW5lckVsbS5hZGRDbGFzcygnZmlsbGVkJyk7XG4gICAgfVxuXG4gICAgLy8gYXBwZW5kIHRoZSBuZXcgRE9NIGVsZW1lbnQgdG8gdGhlIGhlYWRlciByb3dcbiAgICBpZiAoJGZpbHRlckNvbnRhaW5lckVsbSAmJiB0eXBlb2YgJGZpbHRlckNvbnRhaW5lckVsbS5hcHBlbmRUbyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgJGZpbHRlckNvbnRhaW5lckVsbS5hcHBlbmRUbygkaGVhZGVyRWxtKTtcbiAgICB9XG5cbiAgICByZXR1cm4gJGZpbHRlckNvbnRhaW5lckVsbTtcbiAgfVxuXG4gIHByaXZhdGUgb25UcmlnZ2VyRXZlbnQoZTogRXZlbnQgfCB1bmRlZmluZWQpIHtcbiAgICBpZiAodGhpcy5fY2xlYXJGaWx0ZXJUcmlnZ2VyZWQpIHtcbiAgICAgIHRoaXMuY2FsbGJhY2soZSwgeyBjb2x1bW5EZWY6IHRoaXMuY29sdW1uRGVmLCBjbGVhckZpbHRlclRyaWdnZXJlZDogdGhpcy5fY2xlYXJGaWx0ZXJUcmlnZ2VyZWQsIHNob3VsZFRyaWdnZXJRdWVyeTogdGhpcy5fc2hvdWxkVHJpZ2dlclF1ZXJ5IH0pO1xuICAgICAgdGhpcy4kZmlsdGVyRWxtLnJlbW92ZUNsYXNzKCdmaWxsZWQnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qgc2VsZWN0ZWRPcGVyYXRvciA9IHRoaXMuJHNlbGVjdE9wZXJhdG9yRWxtLmZpbmQoJ29wdGlvbjpzZWxlY3RlZCcpLnRleHQoKTtcbiAgICAgIGxldCB2YWx1ZSA9IHRoaXMuJGZpbHRlcklucHV0RWxtLnZhbCgpO1xuICAgICAgY29uc3QgZW5hYmxlV2hpdGVTcGFjZVRyaW0gPSB0aGlzLmdyaWRPcHRpb25zLmVuYWJsZUZpbHRlclRyaW1XaGl0ZVNwYWNlIHx8IHRoaXMuY29sdW1uRmlsdGVyLmVuYWJsZVRyaW1XaGl0ZVNwYWNlO1xuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgJiYgZW5hYmxlV2hpdGVTcGFjZVRyaW0pIHtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZS50cmltKCk7XG4gICAgICB9XG5cbiAgICAgICh2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSAnJykgPyB0aGlzLiRmaWx0ZXJFbG0uYWRkQ2xhc3MoJ2ZpbGxlZCcpIDogdGhpcy4kZmlsdGVyRWxtLnJlbW92ZUNsYXNzKCdmaWxsZWQnKTtcbiAgICAgIHRoaXMuY2FsbGJhY2soZSwgeyBjb2x1bW5EZWY6IHRoaXMuY29sdW1uRGVmLCBzZWFyY2hUZXJtczogKHZhbHVlID8gW3ZhbHVlXSA6IG51bGwpLCBvcGVyYXRvcjogc2VsZWN0ZWRPcGVyYXRvciB8fCAnJywgc2hvdWxkVHJpZ2dlclF1ZXJ5OiB0aGlzLl9zaG91bGRUcmlnZ2VyUXVlcnkgfSk7XG4gICAgfVxuICAgIC8vIHJlc2V0IGJvdGggZmxhZ3MgZm9yIG5leHQgdXNlXG4gICAgdGhpcy5fY2xlYXJGaWx0ZXJUcmlnZ2VyZWQgPSBmYWxzZTtcbiAgICB0aGlzLl9zaG91bGRUcmlnZ2VyUXVlcnkgPSB0cnVlO1xuICB9XG59XG4iXX0=