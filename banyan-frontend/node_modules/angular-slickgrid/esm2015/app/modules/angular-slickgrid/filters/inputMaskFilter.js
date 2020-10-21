import { InputFilter } from './inputFilter';
export class InputMaskFilter extends InputFilter {
    /** Initialize the Filter */
    constructor() {
        super();
        this.inputType = 'text';
    }
    /** Getter of the input mask, when provided */
    get inputMask() {
        return this.columnDef.params && this.columnDef.params && this.columnDef.params.mask;
    }
    /**
     * Override the Filter init used by SlickGrid
     */
    init(args) {
        if (!args) {
            throw new Error('[Angular-SlickGrid] A filter must always have an "init()" with valid arguments.');
        }
        this.grid = args.grid;
        this.callback = args.callback;
        this.columnDef = args.columnDef;
        this.searchTerms = args.searchTerms || [];
        // filter input can only have 1 search term, so we will use the 1st array index if it exist
        const searchTerm = (Array.isArray(this.searchTerms) && this.searchTerms[0]) || '';
        // step 1, create HTML string template
        const filterTemplate = this.buildTemplateHtmlString();
        // step 2, create the DOM Element of the filter & initialize it if searchTerm is filled
        this.$filterElm = this.createDomElement(filterTemplate, searchTerm);
        // step 3, subscribe to the keyup event and run the callback when that happens
        // also add/remove "filled" class for styling purposes
        this.$filterElm.on('keyup input change', (e) => {
            let value = '';
            if (e && e.target && e.target.value) {
                let targetValue = e.target.value;
                const enableWhiteSpaceTrim = this.gridOptions.enableFilterTrimWhiteSpace || this.columnFilter.enableTrimWhiteSpace;
                if (typeof targetValue === 'string' && enableWhiteSpaceTrim) {
                    targetValue = targetValue.trim();
                }
                // if it has a mask, we need to do a bit more work
                // and replace the filter string by the masked output without triggering an event
                const unmaskedValue = this.unmaskValue(targetValue);
                const maskedValue = this.maskValue(unmaskedValue);
                value = unmaskedValue;
                if (e.keyCode >= 48) {
                    this.$filterElm.val(maskedValue); // replace filter string with masked string
                    e.preventDefault();
                }
            }
            if (this._clearFilterTriggered) {
                this.callback(e, { columnDef: this.columnDef, clearFilterTriggered: this._clearFilterTriggered, shouldTriggerQuery: this._shouldTriggerQuery });
                this.$filterElm.removeClass('filled');
            }
            else {
                this.$filterElm.addClass('filled');
                this.callback(e, { columnDef: this.columnDef, operator: this.operator, searchTerms: [value], shouldTriggerQuery: this._shouldTriggerQuery });
            }
            // reset both flags for next use
            this._clearFilterTriggered = false;
            this._shouldTriggerQuery = true;
        });
    }
    /** From a regular string, we will use the mask to output a new string */
    maskValue(inputValue) {
        let i = 0;
        let maskedValue = '';
        if (this.inputMask) {
            maskedValue = this.inputMask.replace(/[09A]/gi, (match) => {
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
    }
    /** From a masked string, we will remove the mask and make a regular string again */
    unmaskValue(maskedValue) {
        // remove anything else but digits and chars from both the input mask and the input masked value for later comparison
        // e.g. (000) 000-0000 would return 0000000000
        const valueWithoutSymbols = maskedValue.replace(/[^0-9a-z]*/gi, '');
        const maskWithoutSymbols = this.inputMask.replace(/[^0-9a-z]*/gi, '');
        // then we can analyze if each char on each indexes equals what the mask requires, if not the char will be disregarded from the output
        // basically, if our mask is "0A0" and input value is "2ab", then only "2a" will be returned since the last char "b" is not part of the mask and is invalid
        let output = '';
        for (let i = 0; i < maskWithoutSymbols.length; i++) {
            if (valueWithoutSymbols[i]) {
                if (((maskWithoutSymbols[i] === '0' || maskWithoutSymbols[i] === '9') && /\d+/g.test(valueWithoutSymbols[i])) // mask is 0 or 9 and value is a digit
                    || (maskWithoutSymbols[i].toUpperCase() === 'A' && /[^\d]+/gi.test(valueWithoutSymbols[i])) // OR mask is an "A" and value is non-digit
                ) {
                    output += valueWithoutSymbols[i]; // valid and matches the Mask, so we can add it up to the string output
                }
            }
        }
        return output;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXRNYXNrRmlsdGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9maWx0ZXJzL2lucHV0TWFza0ZpbHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzVDLE1BQU0sT0FBTyxlQUFnQixTQUFRLFdBQVc7SUFDOUMsNEJBQTRCO0lBQzVCO1FBQ0UsS0FBSyxFQUFFLENBQUM7UUFDUixJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQztJQUMxQixDQUFDO0lBRUQsOENBQThDO0lBQzlDLElBQUksU0FBUztRQUNYLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ3RGLENBQUM7SUFFRDs7T0FFRztJQUNILElBQUksQ0FBQyxJQUFxQjtRQUN4QixJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1QsTUFBTSxJQUFJLEtBQUssQ0FBQyxpRkFBaUYsQ0FBQyxDQUFDO1NBQ3BHO1FBQ0QsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUM5QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDaEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxJQUFJLEVBQUUsQ0FBQztRQUUxQywyRkFBMkY7UUFDM0YsTUFBTSxVQUFVLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLElB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QUUsS0FBSyxHQUFHLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUUsMkNBQTJDO2tCQUN4STtvQkFDQSxNQUFNLElBQUksbUJBQW1CLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyx1RUFBdUU7aUJBQzFHO2FBQ0Y7U0FDRjtRQUVELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElucHV0RmlsdGVyIH0gZnJvbSAnLi9pbnB1dEZpbHRlcic7XHJcbmltcG9ydCB7IEZpbHRlckFyZ3VtZW50cyB9IGZyb20gJy4uL21vZGVscy9maWx0ZXJBcmd1bWVudHMuaW50ZXJmYWNlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBJbnB1dE1hc2tGaWx0ZXIgZXh0ZW5kcyBJbnB1dEZpbHRlciB7XHJcbiAgLyoqIEluaXRpYWxpemUgdGhlIEZpbHRlciAqL1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgc3VwZXIoKTtcclxuICAgIHRoaXMuaW5wdXRUeXBlID0gJ3RleHQnO1xyXG4gIH1cclxuXHJcbiAgLyoqIEdldHRlciBvZiB0aGUgaW5wdXQgbWFzaywgd2hlbiBwcm92aWRlZCAqL1xyXG4gIGdldCBpbnB1dE1hc2soKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLmNvbHVtbkRlZi5wYXJhbXMgJiYgdGhpcy5jb2x1bW5EZWYucGFyYW1zICYmIHRoaXMuY29sdW1uRGVmLnBhcmFtcy5tYXNrO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogT3ZlcnJpZGUgdGhlIEZpbHRlciBpbml0IHVzZWQgYnkgU2xpY2tHcmlkXHJcbiAgICovXHJcbiAgaW5pdChhcmdzOiBGaWx0ZXJBcmd1bWVudHMpIHtcclxuICAgIGlmICghYXJncykge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1tBbmd1bGFyLVNsaWNrR3JpZF0gQSBmaWx0ZXIgbXVzdCBhbHdheXMgaGF2ZSBhbiBcImluaXQoKVwiIHdpdGggdmFsaWQgYXJndW1lbnRzLicpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5ncmlkID0gYXJncy5ncmlkO1xyXG4gICAgdGhpcy5jYWxsYmFjayA9IGFyZ3MuY2FsbGJhY2s7XHJcbiAgICB0aGlzLmNvbHVtbkRlZiA9IGFyZ3MuY29sdW1uRGVmO1xyXG4gICAgdGhpcy5zZWFyY2hUZXJtcyA9IGFyZ3Muc2VhcmNoVGVybXMgfHwgW107XHJcblxyXG4gICAgLy8gZmlsdGVyIGlucHV0IGNhbiBvbmx5IGhhdmUgMSBzZWFyY2ggdGVybSwgc28gd2Ugd2lsbCB1c2UgdGhlIDFzdCBhcnJheSBpbmRleCBpZiBpdCBleGlzdFxyXG4gICAgY29uc3Qgc2VhcmNoVGVybSA9IChBcnJheS5pc0FycmF5KHRoaXMuc2VhcmNoVGVybXMpICYmIHRoaXMuc2VhcmNoVGVybXNbMF0pIHx8ICcnO1xyXG5cclxuICAgIC8vIHN0ZXAgMSwgY3JlYXRlIEhUTUwgc3RyaW5nIHRlbXBsYXRlXHJcbiAgICBjb25zdCBmaWx0ZXJUZW1wbGF0ZSA9IHRoaXMuYnVpbGRUZW1wbGF0ZUh0bWxTdHJpbmcoKTtcclxuXHJcbiAgICAvLyBzdGVwIDIsIGNyZWF0ZSB0aGUgRE9NIEVsZW1lbnQgb2YgdGhlIGZpbHRlciAmIGluaXRpYWxpemUgaXQgaWYgc2VhcmNoVGVybSBpcyBmaWxsZWRcclxuICAgIHRoaXMuJGZpbHRlckVsbSA9IHRoaXMuY3JlYXRlRG9tRWxlbWVudChmaWx0ZXJUZW1wbGF0ZSwgc2VhcmNoVGVybSk7XHJcblxyXG4gICAgLy8gc3RlcCAzLCBzdWJzY3JpYmUgdG8gdGhlIGtleXVwIGV2ZW50IGFuZCBydW4gdGhlIGNhbGxiYWNrIHdoZW4gdGhhdCBoYXBwZW5zXHJcbiAgICAvLyBhbHNvIGFkZC9yZW1vdmUgXCJmaWxsZWRcIiBjbGFzcyBmb3Igc3R5bGluZyBwdXJwb3Nlc1xyXG5cclxuICAgIHRoaXMuJGZpbHRlckVsbS5vbigna2V5dXAgaW5wdXQgY2hhbmdlJywgKGU6IGFueSkgPT4ge1xyXG4gICAgICBsZXQgdmFsdWUgPSAnJztcclxuICAgICAgaWYgKGUgJiYgZS50YXJnZXQgJiYgZS50YXJnZXQudmFsdWUpIHtcclxuICAgICAgICBsZXQgdGFyZ2V0VmFsdWUgPSBlLnRhcmdldC52YWx1ZTtcclxuICAgICAgICBjb25zdCBlbmFibGVXaGl0ZVNwYWNlVHJpbSA9IHRoaXMuZ3JpZE9wdGlvbnMuZW5hYmxlRmlsdGVyVHJpbVdoaXRlU3BhY2UgfHwgdGhpcy5jb2x1bW5GaWx0ZXIuZW5hYmxlVHJpbVdoaXRlU3BhY2U7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB0YXJnZXRWYWx1ZSA9PT0gJ3N0cmluZycgJiYgZW5hYmxlV2hpdGVTcGFjZVRyaW0pIHtcclxuICAgICAgICAgIHRhcmdldFZhbHVlID0gdGFyZ2V0VmFsdWUudHJpbSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gaWYgaXQgaGFzIGEgbWFzaywgd2UgbmVlZCB0byBkbyBhIGJpdCBtb3JlIHdvcmtcclxuICAgICAgICAvLyBhbmQgcmVwbGFjZSB0aGUgZmlsdGVyIHN0cmluZyBieSB0aGUgbWFza2VkIG91dHB1dCB3aXRob3V0IHRyaWdnZXJpbmcgYW4gZXZlbnRcclxuICAgICAgICBjb25zdCB1bm1hc2tlZFZhbHVlID0gdGhpcy51bm1hc2tWYWx1ZSh0YXJnZXRWYWx1ZSk7XHJcbiAgICAgICAgY29uc3QgbWFza2VkVmFsdWUgPSB0aGlzLm1hc2tWYWx1ZSh1bm1hc2tlZFZhbHVlKTtcclxuICAgICAgICB2YWx1ZSA9IHVubWFza2VkVmFsdWU7XHJcblxyXG4gICAgICAgIGlmIChlLmtleUNvZGUgPj0gNDgpIHtcclxuICAgICAgICAgIHRoaXMuJGZpbHRlckVsbS52YWwobWFza2VkVmFsdWUpOyAvLyByZXBsYWNlIGZpbHRlciBzdHJpbmcgd2l0aCBtYXNrZWQgc3RyaW5nXHJcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAodGhpcy5fY2xlYXJGaWx0ZXJUcmlnZ2VyZWQpIHtcclxuICAgICAgICB0aGlzLmNhbGxiYWNrKGUsIHsgY29sdW1uRGVmOiB0aGlzLmNvbHVtbkRlZiwgY2xlYXJGaWx0ZXJUcmlnZ2VyZWQ6IHRoaXMuX2NsZWFyRmlsdGVyVHJpZ2dlcmVkLCBzaG91bGRUcmlnZ2VyUXVlcnk6IHRoaXMuX3Nob3VsZFRyaWdnZXJRdWVyeSB9KTtcclxuICAgICAgICB0aGlzLiRmaWx0ZXJFbG0ucmVtb3ZlQ2xhc3MoJ2ZpbGxlZCcpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuJGZpbHRlckVsbS5hZGRDbGFzcygnZmlsbGVkJyk7XHJcbiAgICAgICAgdGhpcy5jYWxsYmFjayhlLCB7IGNvbHVtbkRlZjogdGhpcy5jb2x1bW5EZWYsIG9wZXJhdG9yOiB0aGlzLm9wZXJhdG9yLCBzZWFyY2hUZXJtczogW3ZhbHVlXSwgc2hvdWxkVHJpZ2dlclF1ZXJ5OiB0aGlzLl9zaG91bGRUcmlnZ2VyUXVlcnkgfSk7XHJcbiAgICAgIH1cclxuICAgICAgLy8gcmVzZXQgYm90aCBmbGFncyBmb3IgbmV4dCB1c2VcclxuICAgICAgdGhpcy5fY2xlYXJGaWx0ZXJUcmlnZ2VyZWQgPSBmYWxzZTtcclxuICAgICAgdGhpcy5fc2hvdWxkVHJpZ2dlclF1ZXJ5ID0gdHJ1ZTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqIEZyb20gYSByZWd1bGFyIHN0cmluZywgd2Ugd2lsbCB1c2UgdGhlIG1hc2sgdG8gb3V0cHV0IGEgbmV3IHN0cmluZyAqL1xyXG4gIHByaXZhdGUgbWFza1ZhbHVlKGlucHV0VmFsdWU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICBsZXQgaSA9IDA7XHJcbiAgICBsZXQgbWFza2VkVmFsdWUgPSAnJztcclxuXHJcbiAgICBpZiAodGhpcy5pbnB1dE1hc2spIHtcclxuICAgICAgbWFza2VkVmFsdWUgPSB0aGlzLmlucHV0TWFzay5yZXBsYWNlKC9bMDlBXS9naSwgKG1hdGNoKSA9PiB7XHJcbiAgICAgICAgLy8gb25seSByZXBsYWNlIHRoZSBjaGFyIHdoZW4gdGhlIG1hc2sgaXMgYSAwIG9yIDkgZm9yIGEgZGlnaXQgT1IgdGhlIG1hc2sgaXMgXCJBXCIgYW5kIHRoZSBjaGFyIGlzIGEgbm9uLWRpZ2l0IG1lYW5pbmcgYSBzdHJpbmcgY2hhclxyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgICgobWF0Y2ggPT09ICcwJyB8fCBtYXRjaCA9PT0gJzknKSAmJiAvXFxkKy9nLnRlc3QoaW5wdXRWYWx1ZVtpXSkpICAgIC8vIG1hc2sgaXMgMCBvciA5IGFuZCB2YWx1ZSBpcyBhIGRpZ2l0XHJcbiAgICAgICAgICB8fCAobWF0Y2gudG9VcHBlckNhc2UoKSA9PT0gJ0EnICYmIC9bXlxcZF0rL2dpLnRlc3QoaW5wdXRWYWx1ZVtpXSkpICAvLyBPUiBtYXNrIGlzIGFuIFwiQVwiIGFuZCB2YWx1ZSBpcyBub24tZGlnaXRcclxuICAgICAgICApIHtcclxuICAgICAgICAgIHJldHVybiBpbnB1dFZhbHVlW2krK10gfHwgJyc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAnJztcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG1hc2tlZFZhbHVlO1xyXG4gIH1cclxuXHJcbiAgLyoqIEZyb20gYSBtYXNrZWQgc3RyaW5nLCB3ZSB3aWxsIHJlbW92ZSB0aGUgbWFzayBhbmQgbWFrZSBhIHJlZ3VsYXIgc3RyaW5nIGFnYWluICovXHJcbiAgcHJpdmF0ZSB1bm1hc2tWYWx1ZShtYXNrZWRWYWx1ZTogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIC8vIHJlbW92ZSBhbnl0aGluZyBlbHNlIGJ1dCBkaWdpdHMgYW5kIGNoYXJzIGZyb20gYm90aCB0aGUgaW5wdXQgbWFzayBhbmQgdGhlIGlucHV0IG1hc2tlZCB2YWx1ZSBmb3IgbGF0ZXIgY29tcGFyaXNvblxyXG4gICAgLy8gZS5nLiAoMDAwKSAwMDAtMDAwMCB3b3VsZCByZXR1cm4gMDAwMDAwMDAwMFxyXG4gICAgY29uc3QgdmFsdWVXaXRob3V0U3ltYm9scyA9IG1hc2tlZFZhbHVlLnJlcGxhY2UoL1teMC05YS16XSovZ2ksICcnKTtcclxuICAgIGNvbnN0IG1hc2tXaXRob3V0U3ltYm9scyA9IHRoaXMuaW5wdXRNYXNrLnJlcGxhY2UoL1teMC05YS16XSovZ2ksICcnKTtcclxuXHJcbiAgICAvLyB0aGVuIHdlIGNhbiBhbmFseXplIGlmIGVhY2ggY2hhciBvbiBlYWNoIGluZGV4ZXMgZXF1YWxzIHdoYXQgdGhlIG1hc2sgcmVxdWlyZXMsIGlmIG5vdCB0aGUgY2hhciB3aWxsIGJlIGRpc3JlZ2FyZGVkIGZyb20gdGhlIG91dHB1dFxyXG4gICAgLy8gYmFzaWNhbGx5LCBpZiBvdXIgbWFzayBpcyBcIjBBMFwiIGFuZCBpbnB1dCB2YWx1ZSBpcyBcIjJhYlwiLCB0aGVuIG9ubHkgXCIyYVwiIHdpbGwgYmUgcmV0dXJuZWQgc2luY2UgdGhlIGxhc3QgY2hhciBcImJcIiBpcyBub3QgcGFydCBvZiB0aGUgbWFzayBhbmQgaXMgaW52YWxpZFxyXG4gICAgbGV0IG91dHB1dCA9ICcnO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYXNrV2l0aG91dFN5bWJvbHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgaWYgKHZhbHVlV2l0aG91dFN5bWJvbHNbaV0pIHtcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICAoKG1hc2tXaXRob3V0U3ltYm9sc1tpXSA9PT0gJzAnIHx8IG1hc2tXaXRob3V0U3ltYm9sc1tpXSA9PT0gJzknKSAmJiAvXFxkKy9nLnRlc3QodmFsdWVXaXRob3V0U3ltYm9sc1tpXSkpICAgIC8vIG1hc2sgaXMgMCBvciA5IGFuZCB2YWx1ZSBpcyBhIGRpZ2l0XHJcbiAgICAgICAgICB8fCAobWFza1dpdGhvdXRTeW1ib2xzW2ldLnRvVXBwZXJDYXNlKCkgPT09ICdBJyAmJiAvW15cXGRdKy9naS50ZXN0KHZhbHVlV2l0aG91dFN5bWJvbHNbaV0pKSAgLy8gT1IgbWFzayBpcyBhbiBcIkFcIiBhbmQgdmFsdWUgaXMgbm9uLWRpZ2l0XHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICBvdXRwdXQgKz0gdmFsdWVXaXRob3V0U3ltYm9sc1tpXTsgLy8gdmFsaWQgYW5kIG1hdGNoZXMgdGhlIE1hc2ssIHNvIHdlIGNhbiBhZGQgaXQgdXAgdG8gdGhlIHN0cmluZyBvdXRwdXRcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gb3V0cHV0O1xyXG4gIH1cclxufVxyXG4iXX0=