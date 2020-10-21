import * as tslib_1 from "tslib";
import { InputFilter } from './inputFilter';
var InputMaskFilter = /** @class */ (function (_super) {
    tslib_1.__extends(InputMaskFilter, _super);
    /** Initialize the Filter */
    function InputMaskFilter() {
        var _this = _super.call(this) || this;
        _this.inputType = 'text';
        return _this;
    }
    Object.defineProperty(InputMaskFilter.prototype, "inputMask", {
        /** Getter of the input mask, when provided */
        get: function () {
            return this.columnDef.params && this.columnDef.params && this.columnDef.params.mask;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Override the Filter init used by SlickGrid
     */
    InputMaskFilter.prototype.init = function (args) {
        var _this = this;
        if (!args) {
            throw new Error('[Angular-SlickGrid] A filter must always have an "init()" with valid arguments.');
        }
        this.grid = args.grid;
        this.callback = args.callback;
        this.columnDef = args.columnDef;
        this.searchTerms = args.searchTerms || [];
        // filter input can only have 1 search term, so we will use the 1st array index if it exist
        var searchTerm = (Array.isArray(this.searchTerms) && this.searchTerms[0]) || '';
        // step 1, create HTML string template
        var filterTemplate = this.buildTemplateHtmlString();
        // step 2, create the DOM Element of the filter & initialize it if searchTerm is filled
        this.$filterElm = this.createDomElement(filterTemplate, searchTerm);
        // step 3, subscribe to the keyup event and run the callback when that happens
        // also add/remove "filled" class for styling purposes
        this.$filterElm.on('keyup input change', function (e) {
            var value = '';
            if (e && e.target && e.target.value) {
                var targetValue = e.target.value;
                var enableWhiteSpaceTrim = _this.gridOptions.enableFilterTrimWhiteSpace || _this.columnFilter.enableTrimWhiteSpace;
                if (typeof targetValue === 'string' && enableWhiteSpaceTrim) {
                    targetValue = targetValue.trim();
                }
                // if it has a mask, we need to do a bit more work
                // and replace the filter string by the masked output without triggering an event
                var unmaskedValue = _this.unmaskValue(targetValue);
                var maskedValue = _this.maskValue(unmaskedValue);
                value = unmaskedValue;
                if (e.keyCode >= 48) {
                    _this.$filterElm.val(maskedValue); // replace filter string with masked string
                    e.preventDefault();
                }
            }
            if (_this._clearFilterTriggered) {
                _this.callback(e, { columnDef: _this.columnDef, clearFilterTriggered: _this._clearFilterTriggered, shouldTriggerQuery: _this._shouldTriggerQuery });
                _this.$filterElm.removeClass('filled');
            }
            else {
                _this.$filterElm.addClass('filled');
                _this.callback(e, { columnDef: _this.columnDef, operator: _this.operator, searchTerms: [value], shouldTriggerQuery: _this._shouldTriggerQuery });
            }
            // reset both flags for next use
            _this._clearFilterTriggered = false;
            _this._shouldTriggerQuery = true;
        });
    };
    /** From a regular string, we will use the mask to output a new string */
    InputMaskFilter.prototype.maskValue = function (inputValue) {
        var i = 0;
        var maskedValue = '';
        if (this.inputMask) {
            maskedValue = this.inputMask.replace(/[09A]/gi, function (match) {
                // only replace the char when the mask is a 0 or 9 for a digit OR the mask is "A" and the char is a non-digit meaning a string char
                if (((match === '0' || match === '9') && /\d+/g.test(inputValue[i])) // mask is 0 or 9 and value is a digit
                    || (match.toUpperCase() === 'A' && /[^\d]+/gi.test(inputValue[i])) // OR mask is an "A" and value is non-digit
                ) {
                    return inputValue[i++] || '';
                }
                return '';
            });
        }
        return maskedValue;
    };
    /** From a masked string, we will remove the mask and make a regular string again */
    InputMaskFilter.prototype.unmaskValue = function (maskedValue) {
        // remove anything else but digits and chars from both the input mask and the input masked value for later comparison
        // e.g. (000) 000-0000 would return 0000000000
        var valueWithoutSymbols = maskedValue.replace(/[^0-9a-z]*/gi, '');
        var maskWithoutSymbols = this.inputMask.replace(/[^0-9a-z]*/gi, '');
        // then we can analyze if each char on each indexes equals what the mask requires, if not the char will be disregarded from the output
        // basically, if our mask is "0A0" and input value is "2ab", then only "2a" will be returned since the last char "b" is not part of the mask and is invalid
        var output = '';
        for (var i = 0; i < maskWithoutSymbols.length; i++) {
            if (valueWithoutSymbols[i]) {
                if (((maskWithoutSymbols[i] === '0' || maskWithoutSymbols[i] === '9') && /\d+/g.test(valueWithoutSymbols[i])) // mask is 0 or 9 and value is a digit
                    || (maskWithoutSymbols[i].toUpperCase() === 'A' && /[^\d]+/gi.test(valueWithoutSymbols[i])) // OR mask is an "A" and value is non-digit
                ) {
                    output += valueWithoutSymbols[i]; // valid and matches the Mask, so we can add it up to the string output
                }
            }
        }
        return output;
    };
    return InputMaskFilter;
}(InputFilter));
export { InputMaskFilter };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXRNYXNrRmlsdGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9maWx0ZXJzL2lucHV0TWFza0ZpbHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUc1QztJQUFxQywyQ0FBVztJQUM5Qyw0QkFBNEI7SUFDNUI7UUFBQSxZQUNFLGlCQUFPLFNBRVI7UUFEQyxLQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQzs7SUFDMUIsQ0FBQztJQUdELHNCQUFJLHNDQUFTO1FBRGIsOENBQThDO2FBQzlDO1lBQ0UsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDdEYsQ0FBQzs7O09BQUE7SUFFRDs7T0FFRztJQUNILDhCQUFJLEdBQUosVUFBSyxJQUFxQjtRQUExQixpQkFxREM7UUFwREMsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNULE1BQU0sSUFBSSxLQUFLLENBQUMsaUZBQWlGLENBQUMsQ0FBQztTQUNwRztRQUNELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDOUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsSUFBSSxFQUFFLENBQUM7UUFFMUMsMkZBQTJGO1FBQzNGLElBQU0sVUFBVSxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUVsRixzQ0FBc0M7UUFDdEMsSUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7UUFFdEQsdUZBQXVGO1FBQ3ZGLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGNBQWMsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUVwRSw4RUFBOEU7UUFDOUUsc0RBQXNEO1FBRXRELElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLG9CQUFvQixFQUFFLFVBQUMsQ0FBTTtZQUM5QyxJQUFJLEtBQUssR0FBRyxFQUFFLENBQUM7WUFDZixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFO2dCQUNuQyxJQUFJLFdBQVcsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztnQkFDakMsSUFBTSxvQkFBb0IsR0FBRyxLQUFJLENBQUMsV0FBVyxDQUFDLDBCQUEwQixJQUFJLEtBQUksQ0FBQyxZQUFZLENBQUMsb0JBQW9CLENBQUM7Z0JBQ25ILElBQUksT0FBTyxXQUFXLEtBQUssUUFBUSxJQUFJLG9CQUFvQixFQUFFO29CQUMzRCxXQUFXLEdBQUcsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO2lCQUNsQztnQkFFRCxrREFBa0Q7Z0JBQ2xELGlGQUFpRjtnQkFDakYsSUFBTSxhQUFhLEdBQUcsS0FBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDcEQsSUFBTSxXQUFXLEdBQUcsS0FBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFDbEQsS0FBSyxHQUFHLGFBQWEsQ0FBQztnQkFFdEIsSUFBSSxDQUFDLENBQUMsT0FBTyxJQUFJLEVBQUUsRUFBRTtvQkFDbkIsS0FBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQywyQ0FBMkM7b0JBQzdFLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztpQkFDcEI7YUFDRjtZQUVELElBQUksS0FBSSxDQUFDLHFCQUFxQixFQUFFO2dCQUM5QixLQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxFQUFFLFNBQVMsRUFBRSxLQUFJLENBQUMsU0FBUyxFQUFFLG9CQUFvQixFQUFFLEtBQUksQ0FBQyxxQkFBcUIsRUFBRSxrQkFBa0IsRUFBRSxLQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxDQUFDO2dCQUNoSixLQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUN2QztpQkFBTTtnQkFDTCxLQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDbkMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsRUFBRSxTQUFTLEVBQUUsS0FBSSxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsS0FBSSxDQUFDLFFBQVEsRUFBRSxXQUFXLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxrQkFBa0IsRUFBRSxLQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxDQUFDO2FBQzlJO1lBQ0QsZ0NBQWdDO1lBQ2hDLEtBQUksQ0FBQyxxQkFBcUIsR0FBRyxLQUFLLENBQUM7WUFDbkMsS0FBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQztRQUNsQyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCx5RUFBeUU7SUFDakUsbUNBQVMsR0FBakIsVUFBa0IsVUFBa0I7UUFDbEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ1YsSUFBSSxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBRXJCLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNsQixXQUFXLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLFVBQUMsS0FBSztnQkFDcEQsbUlBQW1JO2dCQUNuSSxJQUNFLENBQUMsQ0FBQyxLQUFLLEtBQUssR0FBRyxJQUFJLEtBQUssS0FBSyxHQUFHLENBQUMsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUksc0NBQXNDO3VCQUN2RyxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsS0FBSyxHQUFHLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFFLDJDQUEyQztrQkFDL0c7b0JBQ0EsT0FBTyxVQUFVLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7aUJBQzlCO2dCQUNELE9BQU8sRUFBRSxDQUFDO1lBQ1osQ0FBQyxDQUFDLENBQUM7U0FDSjtRQUVELE9BQU8sV0FBVyxDQUFDO0lBQ3JCLENBQUM7SUFFRCxvRkFBb0Y7SUFDNUUscUNBQVcsR0FBbkIsVUFBb0IsV0FBbUI7UUFDckMscUhBQXFIO1FBQ3JILDhDQUE4QztRQUM5QyxJQUFNLG1CQUFtQixHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3BFLElBQU0sa0JBQWtCLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRXRFLHNJQUFzSTtRQUN0SSwySkFBMko7UUFDM0osSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDbEQsSUFBSSxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDMUIsSUFDRSxDQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFJLHNDQUFzQzt1QkFDaEosQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsS0FBSyxHQUFHLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUUsMkNBQTJDO2tCQUN4STtvQkFDQSxNQUFNLElBQUksbUJBQW1CLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyx1RUFBdUU7aUJBQzFHO2FBQ0Y7U0FDRjtRQUVELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFDSCxzQkFBQztBQUFELENBQUMsQUFsSEQsQ0FBcUMsV0FBVyxHQWtIL0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbnB1dEZpbHRlciB9IGZyb20gJy4vaW5wdXRGaWx0ZXInO1xyXG5pbXBvcnQgeyBGaWx0ZXJBcmd1bWVudHMgfSBmcm9tICcuLi9tb2RlbHMvZmlsdGVyQXJndW1lbnRzLmludGVyZmFjZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgSW5wdXRNYXNrRmlsdGVyIGV4dGVuZHMgSW5wdXRGaWx0ZXIge1xyXG4gIC8qKiBJbml0aWFsaXplIHRoZSBGaWx0ZXIgKi9cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICB0aGlzLmlucHV0VHlwZSA9ICd0ZXh0JztcclxuICB9XHJcblxyXG4gIC8qKiBHZXR0ZXIgb2YgdGhlIGlucHV0IG1hc2ssIHdoZW4gcHJvdmlkZWQgKi9cclxuICBnZXQgaW5wdXRNYXNrKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5jb2x1bW5EZWYucGFyYW1zICYmIHRoaXMuY29sdW1uRGVmLnBhcmFtcyAmJiB0aGlzLmNvbHVtbkRlZi5wYXJhbXMubWFzaztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE92ZXJyaWRlIHRoZSBGaWx0ZXIgaW5pdCB1c2VkIGJ5IFNsaWNrR3JpZFxyXG4gICAqL1xyXG4gIGluaXQoYXJnczogRmlsdGVyQXJndW1lbnRzKSB7XHJcbiAgICBpZiAoIWFyZ3MpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdbQW5ndWxhci1TbGlja0dyaWRdIEEgZmlsdGVyIG11c3QgYWx3YXlzIGhhdmUgYW4gXCJpbml0KClcIiB3aXRoIHZhbGlkIGFyZ3VtZW50cy4nKTtcclxuICAgIH1cclxuICAgIHRoaXMuZ3JpZCA9IGFyZ3MuZ3JpZDtcclxuICAgIHRoaXMuY2FsbGJhY2sgPSBhcmdzLmNhbGxiYWNrO1xyXG4gICAgdGhpcy5jb2x1bW5EZWYgPSBhcmdzLmNvbHVtbkRlZjtcclxuICAgIHRoaXMuc2VhcmNoVGVybXMgPSBhcmdzLnNlYXJjaFRlcm1zIHx8IFtdO1xyXG5cclxuICAgIC8vIGZpbHRlciBpbnB1dCBjYW4gb25seSBoYXZlIDEgc2VhcmNoIHRlcm0sIHNvIHdlIHdpbGwgdXNlIHRoZSAxc3QgYXJyYXkgaW5kZXggaWYgaXQgZXhpc3RcclxuICAgIGNvbnN0IHNlYXJjaFRlcm0gPSAoQXJyYXkuaXNBcnJheSh0aGlzLnNlYXJjaFRlcm1zKSAmJiB0aGlzLnNlYXJjaFRlcm1zWzBdKSB8fCAnJztcclxuXHJcbiAgICAvLyBzdGVwIDEsIGNyZWF0ZSBIVE1MIHN0cmluZyB0ZW1wbGF0ZVxyXG4gICAgY29uc3QgZmlsdGVyVGVtcGxhdGUgPSB0aGlzLmJ1aWxkVGVtcGxhdGVIdG1sU3RyaW5nKCk7XHJcblxyXG4gICAgLy8gc3RlcCAyLCBjcmVhdGUgdGhlIERPTSBFbGVtZW50IG9mIHRoZSBmaWx0ZXIgJiBpbml0aWFsaXplIGl0IGlmIHNlYXJjaFRlcm0gaXMgZmlsbGVkXHJcbiAgICB0aGlzLiRmaWx0ZXJFbG0gPSB0aGlzLmNyZWF0ZURvbUVsZW1lbnQoZmlsdGVyVGVtcGxhdGUsIHNlYXJjaFRlcm0pO1xyXG5cclxuICAgIC8vIHN0ZXAgMywgc3Vic2NyaWJlIHRvIHRoZSBrZXl1cCBldmVudCBhbmQgcnVuIHRoZSBjYWxsYmFjayB3aGVuIHRoYXQgaGFwcGVuc1xyXG4gICAgLy8gYWxzbyBhZGQvcmVtb3ZlIFwiZmlsbGVkXCIgY2xhc3MgZm9yIHN0eWxpbmcgcHVycG9zZXNcclxuXHJcbiAgICB0aGlzLiRmaWx0ZXJFbG0ub24oJ2tleXVwIGlucHV0IGNoYW5nZScsIChlOiBhbnkpID0+IHtcclxuICAgICAgbGV0IHZhbHVlID0gJyc7XHJcbiAgICAgIGlmIChlICYmIGUudGFyZ2V0ICYmIGUudGFyZ2V0LnZhbHVlKSB7XHJcbiAgICAgICAgbGV0IHRhcmdldFZhbHVlID0gZS50YXJnZXQudmFsdWU7XHJcbiAgICAgICAgY29uc3QgZW5hYmxlV2hpdGVTcGFjZVRyaW0gPSB0aGlzLmdyaWRPcHRpb25zLmVuYWJsZUZpbHRlclRyaW1XaGl0ZVNwYWNlIHx8IHRoaXMuY29sdW1uRmlsdGVyLmVuYWJsZVRyaW1XaGl0ZVNwYWNlO1xyXG4gICAgICAgIGlmICh0eXBlb2YgdGFyZ2V0VmFsdWUgPT09ICdzdHJpbmcnICYmIGVuYWJsZVdoaXRlU3BhY2VUcmltKSB7XHJcbiAgICAgICAgICB0YXJnZXRWYWx1ZSA9IHRhcmdldFZhbHVlLnRyaW0oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGlmIGl0IGhhcyBhIG1hc2ssIHdlIG5lZWQgdG8gZG8gYSBiaXQgbW9yZSB3b3JrXHJcbiAgICAgICAgLy8gYW5kIHJlcGxhY2UgdGhlIGZpbHRlciBzdHJpbmcgYnkgdGhlIG1hc2tlZCBvdXRwdXQgd2l0aG91dCB0cmlnZ2VyaW5nIGFuIGV2ZW50XHJcbiAgICAgICAgY29uc3QgdW5tYXNrZWRWYWx1ZSA9IHRoaXMudW5tYXNrVmFsdWUodGFyZ2V0VmFsdWUpO1xyXG4gICAgICAgIGNvbnN0IG1hc2tlZFZhbHVlID0gdGhpcy5tYXNrVmFsdWUodW5tYXNrZWRWYWx1ZSk7XHJcbiAgICAgICAgdmFsdWUgPSB1bm1hc2tlZFZhbHVlO1xyXG5cclxuICAgICAgICBpZiAoZS5rZXlDb2RlID49IDQ4KSB7XHJcbiAgICAgICAgICB0aGlzLiRmaWx0ZXJFbG0udmFsKG1hc2tlZFZhbHVlKTsgLy8gcmVwbGFjZSBmaWx0ZXIgc3RyaW5nIHdpdGggbWFza2VkIHN0cmluZ1xyXG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHRoaXMuX2NsZWFyRmlsdGVyVHJpZ2dlcmVkKSB7XHJcbiAgICAgICAgdGhpcy5jYWxsYmFjayhlLCB7IGNvbHVtbkRlZjogdGhpcy5jb2x1bW5EZWYsIGNsZWFyRmlsdGVyVHJpZ2dlcmVkOiB0aGlzLl9jbGVhckZpbHRlclRyaWdnZXJlZCwgc2hvdWxkVHJpZ2dlclF1ZXJ5OiB0aGlzLl9zaG91bGRUcmlnZ2VyUXVlcnkgfSk7XHJcbiAgICAgICAgdGhpcy4kZmlsdGVyRWxtLnJlbW92ZUNsYXNzKCdmaWxsZWQnKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLiRmaWx0ZXJFbG0uYWRkQ2xhc3MoJ2ZpbGxlZCcpO1xyXG4gICAgICAgIHRoaXMuY2FsbGJhY2soZSwgeyBjb2x1bW5EZWY6IHRoaXMuY29sdW1uRGVmLCBvcGVyYXRvcjogdGhpcy5vcGVyYXRvciwgc2VhcmNoVGVybXM6IFt2YWx1ZV0sIHNob3VsZFRyaWdnZXJRdWVyeTogdGhpcy5fc2hvdWxkVHJpZ2dlclF1ZXJ5IH0pO1xyXG4gICAgICB9XHJcbiAgICAgIC8vIHJlc2V0IGJvdGggZmxhZ3MgZm9yIG5leHQgdXNlXHJcbiAgICAgIHRoaXMuX2NsZWFyRmlsdGVyVHJpZ2dlcmVkID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuX3Nob3VsZFRyaWdnZXJRdWVyeSA9IHRydWU7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKiBGcm9tIGEgcmVndWxhciBzdHJpbmcsIHdlIHdpbGwgdXNlIHRoZSBtYXNrIHRvIG91dHB1dCBhIG5ldyBzdHJpbmcgKi9cclxuICBwcml2YXRlIG1hc2tWYWx1ZShpbnB1dFZhbHVlOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgbGV0IGkgPSAwO1xyXG4gICAgbGV0IG1hc2tlZFZhbHVlID0gJyc7XHJcblxyXG4gICAgaWYgKHRoaXMuaW5wdXRNYXNrKSB7XHJcbiAgICAgIG1hc2tlZFZhbHVlID0gdGhpcy5pbnB1dE1hc2sucmVwbGFjZSgvWzA5QV0vZ2ksIChtYXRjaCkgPT4ge1xyXG4gICAgICAgIC8vIG9ubHkgcmVwbGFjZSB0aGUgY2hhciB3aGVuIHRoZSBtYXNrIGlzIGEgMCBvciA5IGZvciBhIGRpZ2l0IE9SIHRoZSBtYXNrIGlzIFwiQVwiIGFuZCB0aGUgY2hhciBpcyBhIG5vbi1kaWdpdCBtZWFuaW5nIGEgc3RyaW5nIGNoYXJcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICAoKG1hdGNoID09PSAnMCcgfHwgbWF0Y2ggPT09ICc5JykgJiYgL1xcZCsvZy50ZXN0KGlucHV0VmFsdWVbaV0pKSAgICAvLyBtYXNrIGlzIDAgb3IgOSBhbmQgdmFsdWUgaXMgYSBkaWdpdFxyXG4gICAgICAgICAgfHwgKG1hdGNoLnRvVXBwZXJDYXNlKCkgPT09ICdBJyAmJiAvW15cXGRdKy9naS50ZXN0KGlucHV0VmFsdWVbaV0pKSAgLy8gT1IgbWFzayBpcyBhbiBcIkFcIiBhbmQgdmFsdWUgaXMgbm9uLWRpZ2l0XHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICByZXR1cm4gaW5wdXRWYWx1ZVtpKytdIHx8ICcnO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBtYXNrZWRWYWx1ZTtcclxuICB9XHJcblxyXG4gIC8qKiBGcm9tIGEgbWFza2VkIHN0cmluZywgd2Ugd2lsbCByZW1vdmUgdGhlIG1hc2sgYW5kIG1ha2UgYSByZWd1bGFyIHN0cmluZyBhZ2FpbiAqL1xyXG4gIHByaXZhdGUgdW5tYXNrVmFsdWUobWFza2VkVmFsdWU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAvLyByZW1vdmUgYW55dGhpbmcgZWxzZSBidXQgZGlnaXRzIGFuZCBjaGFycyBmcm9tIGJvdGggdGhlIGlucHV0IG1hc2sgYW5kIHRoZSBpbnB1dCBtYXNrZWQgdmFsdWUgZm9yIGxhdGVyIGNvbXBhcmlzb25cclxuICAgIC8vIGUuZy4gKDAwMCkgMDAwLTAwMDAgd291bGQgcmV0dXJuIDAwMDAwMDAwMDBcclxuICAgIGNvbnN0IHZhbHVlV2l0aG91dFN5bWJvbHMgPSBtYXNrZWRWYWx1ZS5yZXBsYWNlKC9bXjAtOWEtel0qL2dpLCAnJyk7XHJcbiAgICBjb25zdCBtYXNrV2l0aG91dFN5bWJvbHMgPSB0aGlzLmlucHV0TWFzay5yZXBsYWNlKC9bXjAtOWEtel0qL2dpLCAnJyk7XHJcblxyXG4gICAgLy8gdGhlbiB3ZSBjYW4gYW5hbHl6ZSBpZiBlYWNoIGNoYXIgb24gZWFjaCBpbmRleGVzIGVxdWFscyB3aGF0IHRoZSBtYXNrIHJlcXVpcmVzLCBpZiBub3QgdGhlIGNoYXIgd2lsbCBiZSBkaXNyZWdhcmRlZCBmcm9tIHRoZSBvdXRwdXRcclxuICAgIC8vIGJhc2ljYWxseSwgaWYgb3VyIG1hc2sgaXMgXCIwQTBcIiBhbmQgaW5wdXQgdmFsdWUgaXMgXCIyYWJcIiwgdGhlbiBvbmx5IFwiMmFcIiB3aWxsIGJlIHJldHVybmVkIHNpbmNlIHRoZSBsYXN0IGNoYXIgXCJiXCIgaXMgbm90IHBhcnQgb2YgdGhlIG1hc2sgYW5kIGlzIGludmFsaWRcclxuICAgIGxldCBvdXRwdXQgPSAnJztcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWFza1dpdGhvdXRTeW1ib2xzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlmICh2YWx1ZVdpdGhvdXRTeW1ib2xzW2ldKSB7XHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgKChtYXNrV2l0aG91dFN5bWJvbHNbaV0gPT09ICcwJyB8fCBtYXNrV2l0aG91dFN5bWJvbHNbaV0gPT09ICc5JykgJiYgL1xcZCsvZy50ZXN0KHZhbHVlV2l0aG91dFN5bWJvbHNbaV0pKSAgICAvLyBtYXNrIGlzIDAgb3IgOSBhbmQgdmFsdWUgaXMgYSBkaWdpdFxyXG4gICAgICAgICAgfHwgKG1hc2tXaXRob3V0U3ltYm9sc1tpXS50b1VwcGVyQ2FzZSgpID09PSAnQScgJiYgL1teXFxkXSsvZ2kudGVzdCh2YWx1ZVdpdGhvdXRTeW1ib2xzW2ldKSkgIC8vIE9SIG1hc2sgaXMgYW4gXCJBXCIgYW5kIHZhbHVlIGlzIG5vbi1kaWdpdFxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgb3V0cHV0ICs9IHZhbHVlV2l0aG91dFN5bWJvbHNbaV07IC8vIHZhbGlkIGFuZCBtYXRjaGVzIHRoZSBNYXNrLCBzbyB3ZSBjYW4gYWRkIGl0IHVwIHRvIHRoZSBzdHJpbmcgb3V0cHV0XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG91dHB1dDtcclxuICB9XHJcbn1cclxuIl19