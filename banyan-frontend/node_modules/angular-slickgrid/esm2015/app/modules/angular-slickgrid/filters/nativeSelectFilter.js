import { OperatorType, } from './../models/index';
export class NativeSelectFilter {
    constructor(translate) {
        this.translate = translate;
        this._clearFilterTriggered = false;
        this._shouldTriggerQuery = true;
    }
    get operator() {
        return (this.columnDef && this.columnDef.filter && this.columnDef.filter.operator) || OperatorType.equal;
    }
    /**
     * Initialize the Filter
     */
    init(args) {
        this.grid = args.grid;
        this.callback = args.callback;
        this.columnDef = args.columnDef;
        this.searchTerms = args.searchTerms || [];
        // filter input can only have 1 search term, so we will use the 1st array index if it exist
        let searchTerm = (Array.isArray(this.searchTerms) && this.searchTerms[0]) || '';
        if (typeof searchTerm === 'boolean' || typeof searchTerm === 'number') {
            searchTerm = `${searchTerm}`;
        }
        // step 1, create HTML string template
        const filterTemplate = this.buildTemplateHtmlString();
        // step 2, create the DOM Element of the filter & initialize it if searchTerm is filled
        this.$filterElm = this.createDomElement(filterTemplate, searchTerm);
        // step 3, subscribe to the change event and run the callback when that happens
        // also add/remove "filled" class for styling purposes
        this.$filterElm.change((e) => {
            const value = e && e.target && e.target.value || '';
            if (this._clearFilterTriggered) {
                this.callback(e, { columnDef: this.columnDef, clearFilterTriggered: this._clearFilterTriggered, shouldTriggerQuery: this._shouldTriggerQuery });
                this.$filterElm.removeClass('filled');
            }
            else {
                value === '' ? this.$filterElm.removeClass('filled') : this.$filterElm.addClass('filled');
                this.callback(e, { columnDef: this.columnDef, operator: this.operator, searchTerms: [value], shouldTriggerQuery: this._shouldTriggerQuery });
            }
            // reset both flags for next use
            this._clearFilterTriggered = false;
            this._shouldTriggerQuery = true;
        });
    }
    /**
     * Clear the filter values
     */
    clear(shouldTriggerQuery = true) {
        if (this.$filterElm) {
            this._clearFilterTriggered = true;
            this._shouldTriggerQuery = shouldTriggerQuery;
            this.searchTerms = [];
            this.$filterElm.val('');
            this.$filterElm.trigger('change');
        }
    }
    /**
     * destroy the filter
     */
    destroy() {
        if (this.$filterElm) {
            this.$filterElm.off('change').remove();
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
    // private functions
    // ------------------
    buildTemplateHtmlString() {
        if (!this.columnDef || !this.columnDef.filter || !this.columnDef.filter.collection) {
            throw new Error(`[Angular-SlickGrid] You need to pass a "collection" for the Select Filter to work correctly. Also each option should include a value/label pair (or value/labelKey when using Locale). For example:: { filter: model: Filters.select, collection: [{ value: true, label: 'True' }, { value: false, label: 'False'}] }`);
        }
        const fieldId = this.columnDef && this.columnDef.id;
        const optionCollection = this.columnDef.filter.collection || [];
        const labelName = (this.columnDef.filter.customStructure) ? this.columnDef.filter.customStructure.label : 'label';
        const valueName = (this.columnDef.filter.customStructure) ? this.columnDef.filter.customStructure.value : 'value';
        let options = '';
        // collection could be an Array of Strings OR Objects
        if (optionCollection.every(x => typeof x === 'string')) {
            optionCollection.forEach((option) => {
                options += `<option value="${option}" label="${option}">${option}</option>`;
            });
        }
        else {
            optionCollection.forEach((option) => {
                if (!option || (option[labelName] === undefined && option.labelKey === undefined)) {
                    throw new Error(`A collection with value/label (or value/labelKey when using Locale) is required to populate the Select list, for example:: { filter: model: Filters.select, collection: [ { value: '1', label: 'One' } ]')`);
                }
                const labelKey = option.labelKey || option[labelName];
                const textLabel = ((option.labelKey || this.columnDef.filter.enableTranslateLabel) && this.translate && typeof this.translate.instant === 'function') ? this.translate.instant(labelKey || ' ') : labelKey;
                options += `<option value="${option[valueName]}">${textLabel}</option>`;
            });
        }
        return `<select class="form-control search-filter filter-${fieldId}">${options}</select>`;
    }
    /**
     * From the html template string, create a DOM element
     * @param filterTemplate
     */
    createDomElement(filterTemplate, searchTerm) {
        const fieldId = this.columnDef && this.columnDef.id;
        const $headerElm = this.grid.getHeaderRowColumn(fieldId);
        $($headerElm).empty();
        // create the DOM element & add an ID and filter class
        const $filterElm = $(filterTemplate);
        const searchTermInput = (searchTerm || '');
        $filterElm.val(searchTermInput);
        $filterElm.attr('id', `filter-${fieldId}`);
        $filterElm.data('columnId', fieldId);
        // append the new DOM element to the header row
        if ($filterElm && typeof $filterElm.appendTo === 'function') {
            $filterElm.appendTo($headerElm);
        }
        return $filterElm;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF0aXZlU2VsZWN0RmlsdGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9maWx0ZXJzL25hdGl2ZVNlbGVjdEZpbHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBS0wsWUFBWSxHQUdiLE1BQU0sbUJBQW1CLENBQUM7QUFLM0IsTUFBTSxPQUFPLGtCQUFrQjtJQVM3QixZQUFvQixTQUEyQjtRQUEzQixjQUFTLEdBQVQsU0FBUyxDQUFrQjtRQVJ2QywwQkFBcUIsR0FBRyxLQUFLLENBQUM7UUFDOUIsd0JBQW1CLEdBQUcsSUFBSSxDQUFDO0lBT2dCLENBQUM7SUFFcEQsSUFBSSxRQUFRO1FBQ1YsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksWUFBWSxDQUFDLEtBQUssQ0FBQztJQUMzRyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxJQUFJLENBQUMsSUFBcUI7UUFDeEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUM5QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDaEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxJQUFJLEVBQUUsQ0FBQztRQUUxQywyRkFBMkY7UUFDM0YsSUFBSSxVQUFVLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2hGLElBQUksT0FBTyxVQUFVLEtBQUss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Q0FBQztRQUNoQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxVQUFVLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFDM0MsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFckMsK0NBQStDO1FBQy9DLElBQUksVUFBVSxJQUFJLE9BQU8sVUFBVSxDQUFDLFFBQVEsS0FBSyxVQUFVLEVBQUU7WUFDM0QsVUFBVSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUNqQztRQUVELE9BQU8sVUFBVSxDQUFDO0lBQ3BCLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcclxuaW1wb3J0IHtcclxuICBDb2x1bW4sXHJcbiAgRmlsdGVyLFxyXG4gIEZpbHRlckFyZ3VtZW50cyxcclxuICBGaWx0ZXJDYWxsYmFjayxcclxuICBPcGVyYXRvclR5cGUsXHJcbiAgT3BlcmF0b3JTdHJpbmcsXHJcbiAgU2VhcmNoVGVybSxcclxufSBmcm9tICcuLy4uL21vZGVscy9pbmRleCc7XHJcblxyXG4vLyB1c2luZyBleHRlcm5hbCBub24tdHlwZWQganMgbGlicmFyaWVzXHJcbmRlY2xhcmUgdmFyICQ6IGFueTtcclxuXHJcbmV4cG9ydCBjbGFzcyBOYXRpdmVTZWxlY3RGaWx0ZXIgaW1wbGVtZW50cyBGaWx0ZXIge1xyXG4gIHByaXZhdGUgX2NsZWFyRmlsdGVyVHJpZ2dlcmVkID0gZmFsc2U7XHJcbiAgcHJpdmF0ZSBfc2hvdWxkVHJpZ2dlclF1ZXJ5ID0gdHJ1ZTtcclxuICAkZmlsdGVyRWxtOiBhbnk7XHJcbiAgZ3JpZDogYW55O1xyXG4gIHNlYXJjaFRlcm1zOiBTZWFyY2hUZXJtW107XHJcbiAgY29sdW1uRGVmOiBDb2x1bW47XHJcbiAgY2FsbGJhY2s6IEZpbHRlckNhbGxiYWNrO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHRyYW5zbGF0ZTogVHJhbnNsYXRlU2VydmljZSkgeyB9XHJcblxyXG4gIGdldCBvcGVyYXRvcigpOiBPcGVyYXRvclR5cGUgfCBPcGVyYXRvclN0cmluZyB7XHJcbiAgICByZXR1cm4gKHRoaXMuY29sdW1uRGVmICYmIHRoaXMuY29sdW1uRGVmLmZpbHRlciAmJiB0aGlzLmNvbHVtbkRlZi5maWx0ZXIub3BlcmF0b3IpIHx8IE9wZXJhdG9yVHlwZS5lcXVhbDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEluaXRpYWxpemUgdGhlIEZpbHRlclxyXG4gICAqL1xyXG4gIGluaXQoYXJnczogRmlsdGVyQXJndW1lbnRzKSB7XHJcbiAgICB0aGlzLmdyaWQgPSBhcmdzLmdyaWQ7XHJcbiAgICB0aGlzLmNhbGxiYWNrID0gYXJncy5jYWxsYmFjaztcclxuICAgIHRoaXMuY29sdW1uRGVmID0gYXJncy5jb2x1bW5EZWY7XHJcbiAgICB0aGlzLnNlYXJjaFRlcm1zID0gYXJncy5zZWFyY2hUZXJtcyB8fCBbXTtcclxuXHJcbiAgICAvLyBmaWx0ZXIgaW5wdXQgY2FuIG9ubHkgaGF2ZSAxIHNlYXJjaCB0ZXJtLCBzbyB3ZSB3aWxsIHVzZSB0aGUgMXN0IGFycmF5IGluZGV4IGlmIGl0IGV4aXN0XHJcbiAgICBsZXQgc2VhcmNoVGVybSA9IChBcnJheS5pc0FycmF5KHRoaXMuc2VhcmNoVGVybXMpICYmIHRoaXMuc2VhcmNoVGVybXNbMF0pIHx8ICcnO1xyXG4gICAgaWYgKHR5cGVvZiBzZWFyY2hUZXJtID09PSAnYm9vbGVhbicgfHwgdHlwZW9mIHNlYXJjaFRlcm0gPT09ICdudW1iZXInKSB7XHJcbiAgICAgIHNlYXJjaFRlcm0gPSBgJHtzZWFyY2hUZXJtfWA7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gc3RlcCAxLCBjcmVhdGUgSFRNTCBzdHJpbmcgdGVtcGxhdGVcclxuICAgIGNvbnN0IGZpbHRlclRlbXBsYXRlID0gdGhpcy5idWlsZFRlbXBsYXRlSHRtbFN0cmluZygpO1xyXG5cclxuICAgIC8vIHN0ZXAgMiwgY3JlYXRlIHRoZSBET00gRWxlbWVudCBvZiB0aGUgZmlsdGVyICYgaW5pdGlhbGl6ZSBpdCBpZiBzZWFyY2hUZXJtIGlzIGZpbGxlZFxyXG4gICAgdGhpcy4kZmlsdGVyRWxtID0gdGhpcy5jcmVhdGVEb21FbGVtZW50KGZpbHRlclRlbXBsYXRlLCBzZWFyY2hUZXJtKTtcclxuXHJcbiAgICAvLyBzdGVwIDMsIHN1YnNjcmliZSB0byB0aGUgY2hhbmdlIGV2ZW50IGFuZCBydW4gdGhlIGNhbGxiYWNrIHdoZW4gdGhhdCBoYXBwZW5zXHJcbiAgICAvLyBhbHNvIGFkZC9yZW1vdmUgXCJmaWxsZWRcIiBjbGFzcyBmb3Igc3R5bGluZyBwdXJwb3Nlc1xyXG4gICAgdGhpcy4kZmlsdGVyRWxtLmNoYW5nZSgoZTogYW55KSA9PiB7XHJcbiAgICAgIGNvbnN0IHZhbHVlID0gZSAmJiBlLnRhcmdldCAmJiBlLnRhcmdldC52YWx1ZSB8fCAnJztcclxuICAgICAgaWYgKHRoaXMuX2NsZWFyRmlsdGVyVHJpZ2dlcmVkKSB7XHJcbiAgICAgICAgdGhpcy5jYWxsYmFjayhlLCB7IGNvbHVtbkRlZjogdGhpcy5jb2x1bW5EZWYsIGNsZWFyRmlsdGVyVHJpZ2dlcmVkOiB0aGlzLl9jbGVhckZpbHRlclRyaWdnZXJlZCwgc2hvdWxkVHJpZ2dlclF1ZXJ5OiB0aGlzLl9zaG91bGRUcmlnZ2VyUXVlcnkgfSk7XHJcbiAgICAgICAgdGhpcy4kZmlsdGVyRWxtLnJlbW92ZUNsYXNzKCdmaWxsZWQnKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB2YWx1ZSA9PT0gJycgPyB0aGlzLiRmaWx0ZXJFbG0ucmVtb3ZlQ2xhc3MoJ2ZpbGxlZCcpIDogdGhpcy4kZmlsdGVyRWxtLmFkZENsYXNzKCdmaWxsZWQnKTtcclxuICAgICAgICB0aGlzLmNhbGxiYWNrKGUsIHsgY29sdW1uRGVmOiB0aGlzLmNvbHVtbkRlZiwgb3BlcmF0b3I6IHRoaXMub3BlcmF0b3IsIHNlYXJjaFRlcm1zOiBbdmFsdWVdLCBzaG91bGRUcmlnZ2VyUXVlcnk6IHRoaXMuX3Nob3VsZFRyaWdnZXJRdWVyeSB9KTtcclxuICAgICAgfVxyXG4gICAgICAvLyByZXNldCBib3RoIGZsYWdzIGZvciBuZXh0IHVzZVxyXG4gICAgICB0aGlzLl9jbGVhckZpbHRlclRyaWdnZXJlZCA9IGZhbHNlO1xyXG4gICAgICB0aGlzLl9zaG91bGRUcmlnZ2VyUXVlcnkgPSB0cnVlO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDbGVhciB0aGUgZmlsdGVyIHZhbHVlc1xyXG4gICAqL1xyXG4gIGNsZWFyKHNob3VsZFRyaWdnZXJRdWVyeSA9IHRydWUpIHtcclxuICAgIGlmICh0aGlzLiRmaWx0ZXJFbG0pIHtcclxuICAgICAgdGhpcy5fY2xlYXJGaWx0ZXJUcmlnZ2VyZWQgPSB0cnVlO1xyXG4gICAgICB0aGlzLl9zaG91bGRUcmlnZ2VyUXVlcnkgPSBzaG91bGRUcmlnZ2VyUXVlcnk7XHJcbiAgICAgIHRoaXMuc2VhcmNoVGVybXMgPSBbXTtcclxuICAgICAgdGhpcy4kZmlsdGVyRWxtLnZhbCgnJyk7XHJcbiAgICAgIHRoaXMuJGZpbHRlckVsbS50cmlnZ2VyKCdjaGFuZ2UnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGRlc3Ryb3kgdGhlIGZpbHRlclxyXG4gICAqL1xyXG4gIGRlc3Ryb3koKSB7XHJcbiAgICBpZiAodGhpcy4kZmlsdGVyRWxtKSB7XHJcbiAgICAgIHRoaXMuJGZpbHRlckVsbS5vZmYoJ2NoYW5nZScpLnJlbW92ZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0IHZhbHVlKHMpIG9uIHRoZSBET00gZWxlbWVudFxyXG4gICAqL1xyXG4gIHNldFZhbHVlcyh2YWx1ZXM6IFNlYXJjaFRlcm0gfCBTZWFyY2hUZXJtW10pIHtcclxuICAgIGlmICh2YWx1ZXMpIHtcclxuICAgICAgdGhpcy4kZmlsdGVyRWxtLnZhbCh2YWx1ZXMpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy9cclxuICAvLyBwcml2YXRlIGZ1bmN0aW9uc1xyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICBwcml2YXRlIGJ1aWxkVGVtcGxhdGVIdG1sU3RyaW5nKCkge1xyXG4gICAgaWYgKCF0aGlzLmNvbHVtbkRlZiB8fCAhdGhpcy5jb2x1bW5EZWYuZmlsdGVyIHx8ICF0aGlzLmNvbHVtbkRlZi5maWx0ZXIuY29sbGVjdGlvbikge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFtBbmd1bGFyLVNsaWNrR3JpZF0gWW91IG5lZWQgdG8gcGFzcyBhIFwiY29sbGVjdGlvblwiIGZvciB0aGUgU2VsZWN0IEZpbHRlciB0byB3b3JrIGNvcnJlY3RseS4gQWxzbyBlYWNoIG9wdGlvbiBzaG91bGQgaW5jbHVkZSBhIHZhbHVlL2xhYmVsIHBhaXIgKG9yIHZhbHVlL2xhYmVsS2V5IHdoZW4gdXNpbmcgTG9jYWxlKS4gRm9yIGV4YW1wbGU6OiB7IGZpbHRlcjogbW9kZWw6IEZpbHRlcnMuc2VsZWN0LCBjb2xsZWN0aW9uOiBbeyB2YWx1ZTogdHJ1ZSwgbGFiZWw6ICdUcnVlJyB9LCB7IHZhbHVlOiBmYWxzZSwgbGFiZWw6ICdGYWxzZSd9XSB9YCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZmllbGRJZCA9IHRoaXMuY29sdW1uRGVmICYmIHRoaXMuY29sdW1uRGVmLmlkO1xyXG4gICAgY29uc3Qgb3B0aW9uQ29sbGVjdGlvbiA9IHRoaXMuY29sdW1uRGVmLmZpbHRlci5jb2xsZWN0aW9uIHx8IFtdO1xyXG4gICAgY29uc3QgbGFiZWxOYW1lID0gKHRoaXMuY29sdW1uRGVmLmZpbHRlci5jdXN0b21TdHJ1Y3R1cmUpID8gdGhpcy5jb2x1bW5EZWYuZmlsdGVyLmN1c3RvbVN0cnVjdHVyZS5sYWJlbCA6ICdsYWJlbCc7XHJcbiAgICBjb25zdCB2YWx1ZU5hbWUgPSAodGhpcy5jb2x1bW5EZWYuZmlsdGVyLmN1c3RvbVN0cnVjdHVyZSkgPyB0aGlzLmNvbHVtbkRlZi5maWx0ZXIuY3VzdG9tU3RydWN0dXJlLnZhbHVlIDogJ3ZhbHVlJztcclxuXHJcbiAgICBsZXQgb3B0aW9ucyA9ICcnO1xyXG5cclxuICAgIC8vIGNvbGxlY3Rpb24gY291bGQgYmUgYW4gQXJyYXkgb2YgU3RyaW5ncyBPUiBPYmplY3RzXHJcbiAgICBpZiAob3B0aW9uQ29sbGVjdGlvbi5ldmVyeSh4ID0+IHR5cGVvZiB4ID09PSAnc3RyaW5nJykpIHtcclxuICAgICAgb3B0aW9uQ29sbGVjdGlvbi5mb3JFYWNoKChvcHRpb246IHN0cmluZykgPT4ge1xyXG4gICAgICAgIG9wdGlvbnMgKz0gYDxvcHRpb24gdmFsdWU9XCIke29wdGlvbn1cIiBsYWJlbD1cIiR7b3B0aW9ufVwiPiR7b3B0aW9ufTwvb3B0aW9uPmA7XHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgb3B0aW9uQ29sbGVjdGlvbi5mb3JFYWNoKChvcHRpb246IGFueSkgPT4ge1xyXG4gICAgICAgIGlmICghb3B0aW9uIHx8IChvcHRpb25bbGFiZWxOYW1lXSA9PT0gdW5kZWZpbmVkICYmIG9wdGlvbi5sYWJlbEtleSA9PT0gdW5kZWZpbmVkKSkge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBBIGNvbGxlY3Rpb24gd2l0aCB2YWx1ZS9sYWJlbCAob3IgdmFsdWUvbGFiZWxLZXkgd2hlbiB1c2luZyBMb2NhbGUpIGlzIHJlcXVpcmVkIHRvIHBvcHVsYXRlIHRoZSBTZWxlY3QgbGlzdCwgZm9yIGV4YW1wbGU6OiB7IGZpbHRlcjogbW9kZWw6IEZpbHRlcnMuc2VsZWN0LCBjb2xsZWN0aW9uOiBbIHsgdmFsdWU6ICcxJywgbGFiZWw6ICdPbmUnIH0gXScpYCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGxhYmVsS2V5ID0gb3B0aW9uLmxhYmVsS2V5IHx8IG9wdGlvbltsYWJlbE5hbWVdO1xyXG4gICAgICAgIGNvbnN0IHRleHRMYWJlbCA9ICgob3B0aW9uLmxhYmVsS2V5IHx8IHRoaXMuY29sdW1uRGVmLmZpbHRlci5lbmFibGVUcmFuc2xhdGVMYWJlbCkgJiYgdGhpcy50cmFuc2xhdGUgJiYgdHlwZW9mIHRoaXMudHJhbnNsYXRlLmluc3RhbnQgPT09ICdmdW5jdGlvbicpID8gdGhpcy50cmFuc2xhdGUuaW5zdGFudChsYWJlbEtleSB8fCAnICcpIDogbGFiZWxLZXk7XHJcbiAgICAgICAgb3B0aW9ucyArPSBgPG9wdGlvbiB2YWx1ZT1cIiR7b3B0aW9uW3ZhbHVlTmFtZV19XCI+JHt0ZXh0TGFiZWx9PC9vcHRpb24+YDtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYDxzZWxlY3QgY2xhc3M9XCJmb3JtLWNvbnRyb2wgc2VhcmNoLWZpbHRlciBmaWx0ZXItJHtmaWVsZElkfVwiPiR7b3B0aW9uc308L3NlbGVjdD5gO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRnJvbSB0aGUgaHRtbCB0ZW1wbGF0ZSBzdHJpbmcsIGNyZWF0ZSBhIERPTSBlbGVtZW50XHJcbiAgICogQHBhcmFtIGZpbHRlclRlbXBsYXRlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjcmVhdGVEb21FbGVtZW50KGZpbHRlclRlbXBsYXRlOiBzdHJpbmcsIHNlYXJjaFRlcm0/OiBTZWFyY2hUZXJtKSB7XHJcbiAgICBjb25zdCBmaWVsZElkID0gdGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYuaWQ7XHJcbiAgICBjb25zdCAkaGVhZGVyRWxtID0gdGhpcy5ncmlkLmdldEhlYWRlclJvd0NvbHVtbihmaWVsZElkKTtcclxuICAgICQoJGhlYWRlckVsbSkuZW1wdHkoKTtcclxuXHJcbiAgICAvLyBjcmVhdGUgdGhlIERPTSBlbGVtZW50ICYgYWRkIGFuIElEIGFuZCBmaWx0ZXIgY2xhc3NcclxuICAgIGNvbnN0ICRmaWx0ZXJFbG0gPSAkKGZpbHRlclRlbXBsYXRlKTtcclxuICAgIGNvbnN0IHNlYXJjaFRlcm1JbnB1dCA9IChzZWFyY2hUZXJtIHx8ICcnKSBhcyBzdHJpbmc7XHJcblxyXG4gICAgJGZpbHRlckVsbS52YWwoc2VhcmNoVGVybUlucHV0KTtcclxuICAgICRmaWx0ZXJFbG0uYXR0cignaWQnLCBgZmlsdGVyLSR7ZmllbGRJZH1gKTtcclxuICAgICRmaWx0ZXJFbG0uZGF0YSgnY29sdW1uSWQnLCBmaWVsZElkKTtcclxuXHJcbiAgICAvLyBhcHBlbmQgdGhlIG5ldyBET00gZWxlbWVudCB0byB0aGUgaGVhZGVyIHJvd1xyXG4gICAgaWYgKCRmaWx0ZXJFbG0gJiYgdHlwZW9mICRmaWx0ZXJFbG0uYXBwZW5kVG8gPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgJGZpbHRlckVsbS5hcHBlbmRUbygkaGVhZGVyRWxtKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gJGZpbHRlckVsbTtcclxuICB9XHJcbn1cclxuIl19