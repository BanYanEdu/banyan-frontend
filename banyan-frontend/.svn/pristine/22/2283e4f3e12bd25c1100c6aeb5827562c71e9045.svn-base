import { TranslateService } from '@ngx-translate/core';
import { Constants } from './../constants';
import { mapFlatpickrDateFormatWithFieldType, mapMomentDateFormatWithFieldType } from './../services/utilities';
import { FieldType } from './../models/index';
import * as moment_ from 'moment-mini';
const moment = moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
require('flatpickr');
/*
 * An example of a date picker editor using Flatpickr
 * https://chmln.github.io/flatpickr
 */
export class DateEditor {
    constructor(args) {
        this.args = args;
        this.init();
    }
    /** Get Column Definition object */
    get columnDef() {
        return this.args && this.args.column || {};
    }
    /** Get Column Editor object */
    get columnEditor() {
        return this.columnDef && this.columnDef.internalColumnEditor && this.columnDef.internalColumnEditor || {};
    }
    /** Get Flatpickr options passed to the editor by the user */
    get editorOptions() {
        return this.columnEditor.editorOptions || {};
    }
    /** Get the Validator function, can be passed in Editor property or Column Definition */
    get validator() {
        return this.columnEditor.validator || this.columnDef.validator;
    }
    init() {
        if (this.args && this.args.column) {
            const columnId = this.columnDef && this.columnDef.id;
            const placeholder = this.columnEditor && this.columnEditor.placeholder || '';
            const title = this.columnEditor && this.columnEditor.title || '';
            const gridOptions = this.args.grid.getOptions();
            this.defaultDate = (this.args.item) ? this.args.item[this.args.column.field] : null;
            const inputFormat = mapFlatpickrDateFormatWithFieldType(this.columnDef.type || FieldType.dateIso);
            const outputFormat = mapFlatpickrDateFormatWithFieldType(this.columnDef.outputType || FieldType.dateUtc);
            let currentLocale = this.getCurrentLocale(this.columnDef, gridOptions);
            if (currentLocale.length > 2) {
                currentLocale = currentLocale.substring(0, 2);
            }
            const pickerOptions = {
                defaultDate: this.defaultDate,
                altInput: true,
                altInputClass: 'flatpickr-alt-input',
                altFormat: inputFormat,
                dateFormat: outputFormat,
                closeOnSelect: false,
                locale: (currentLocale !== 'en') ? this.loadFlatpickrLocale(currentLocale) : 'en',
                onChange: (selectedDates, dateStr, instance) => {
                    this.save();
                },
            };
            // merge options with optional user's custom options
            const pickerMergedOptions = Object.assign({}, pickerOptions, this.editorOptions);
            const inputCssClasses = `.editor-text.editor-${columnId}.flatpickr`;
            this.$input = $(`<input type="text" data-defaultDate="${this.defaultDate}" class="${inputCssClasses.replace(/\./g, ' ')}" placeholder="${placeholder}" title="${title}" />`);
            this.$input.appendTo(this.args.container);
            this.flatInstance = (this.$input[0] && typeof this.$input[0].flatpickr === 'function') ? this.$input[0].flatpickr(pickerMergedOptions) : null;
            // when we're using an alternate input to display data, we'll consider this input as the one to do the focus later on
            // else just use the top one
            this._$inputWithData = (pickerMergedOptions && pickerMergedOptions.altInput) ? $(`${inputCssClasses}.flatpickr-alt-input`) : this.$input;
        }
    }
    getCurrentLocale(columnDef, gridOptions) {
        const options = gridOptions || columnDef.params || {};
        if (options.i18n && options.i18n instanceof TranslateService) {
            return options.i18n.currentLang;
        }
        return 'en';
    }
    loadFlatpickrLocale(locale) {
        // change locale if needed, Flatpickr reference: https://chmln.github.io/flatpickr/localization/
        const gridOptions = this.args && this.args.grid && this.args.grid.getOptions();
        if (gridOptions && gridOptions.params && gridOptions.params.flapickrLocale) {
            return gridOptions.params.flapickrLocale;
        }
        else if (locale !== 'en') {
            const localeDefault = require(`flatpickr/dist/l10n/${locale}.js`).default;
            return (localeDefault && localeDefault[locale]) ? localeDefault[locale] : 'en';
        }
        return 'en';
    }
    destroy() {
        this.hide();
        this.$input.remove();
        if (this._$inputWithData && typeof this._$inputWithData.remove === 'function') {
            this._$inputWithData.remove();
        }
    }
    show() {
        if (this.flatInstance && typeof this.flatInstance.open === 'function') {
            this.flatInstance.open();
        }
    }
    hide() {
        if (this.flatInstance && typeof this.flatInstance.close === 'function') {
            this.flatInstance.close();
        }
    }
    focus() {
        if (this._$inputWithData && this._$inputWithData.focus) {
            this._$inputWithData.focus().select();
        }
        else if (this.$input && this.$input.focus) {
            this.$input.focus().select();
        }
    }
    save() {
        // autocommit will not focus the next editor
        const validation = this.validate();
        if (validation && validation.valid) {
            if (this.args.grid.getOptions().autoCommitEdit) {
                this.args.grid.getEditorLock().commitCurrentEdit();
            }
            else {
                this.args.commitChanges();
            }
        }
    }
    getColumnEditor() {
        return this.args && this.args.column && this.args.column.internalColumnEditor && this.args.column.internalColumnEditor;
    }
    loadValue(item) {
        const fieldName = this.columnDef && this.columnDef.field;
        // when it's a complex object, then pull the object name only, e.g.: "user.firstName" => "user"
        const fieldNameFromComplexObject = fieldName.indexOf('.') ? fieldName.substring(0, fieldName.indexOf('.')) : '';
        if (item && this.columnDef && (item.hasOwnProperty(fieldName) || item.hasOwnProperty(fieldNameFromComplexObject))) {
            this.defaultDate = item[fieldNameFromComplexObject || fieldName];
            this.flatInstance.setDate(item[this.args.column.field]);
            this.focus();
        }
    }
    serializeValue() {
        const domValue = this.$input.val();
        if (!domValue) {
            return '';
        }
        const outputFormat = mapMomentDateFormatWithFieldType(this.args.column.type || FieldType.dateIso);
        const value = moment(domValue).format(outputFormat);
        return value;
    }
    applyValue(item, state) {
        const fieldName = this.columnDef && this.columnDef.field;
        const outputFormat = mapMomentDateFormatWithFieldType(this.args.column.type || FieldType.dateIso);
        // when it's a complex object, then pull the object name only, e.g.: "user.firstName" => "user"
        const fieldNameFromComplexObject = fieldName.indexOf('.') ? fieldName.substring(0, fieldName.indexOf('.')) : '';
        const newValue = state ? moment(state, outputFormat).toDate() : '';
        const validation = this.validate(newValue);
        item[fieldNameFromComplexObject || fieldName] = (validation && validation.valid) ? newValue : '';
    }
    isValueChanged() {
        return (!(this.$input.val() === '' && this.defaultDate == null)) && (this.$input.val() !== this.defaultDate);
    }
    validate(inputValue) {
        const isRequired = this.columnEditor.required;
        const elmValue = (inputValue !== undefined) ? inputValue : this.$input && this.$input.val && this.$input.val();
        const errorMsg = this.columnEditor.errorMessage;
        if (this.validator) {
            return this.validator(elmValue, this.args);
        }
        // by default the editor is almost always valid (except when it's required but not provided)
        if (isRequired && elmValue === '') {
            return {
                valid: false,
                msg: errorMsg || Constants.VALIDATION_REQUIRED_FIELD
            };
        }
        return {
            valid: true,
            msg: null
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZUVkaXRvci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvZWRpdG9ycy9kYXRlRWRpdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUUsbUNBQW1DLEVBQUUsZ0NBQWdDLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNoSCxPQUFPLEVBQXdFLFNBQVMsRUFBdUIsTUFBTSxtQkFBbUIsQ0FBQztBQUN6SSxPQUFPLEtBQUssT0FBTyxNQUFNLGFBQWEsQ0FBQztBQUN2QyxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsQ0FBQyxzSEFBc0g7QUFHOUksT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBS3JCOzs7R0FHRztBQUNILE1BQU0sT0FBTyxVQUFVO0lBTXJCLFlBQW9CLElBQVM7UUFBVCxTQUFJLEdBQUosSUFBSSxDQUFLO1FBQzNCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNkLENBQUM7SUFFRCxtQ0FBbUM7SUFDbkMsSUFBSSxTQUFTO1FBQ1gsT0FBTyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQztJQUM3QyxDQUFDO0lBRUQsK0JBQStCO0lBQy9CLElBQUksWUFBWTtRQUNkLE9BQU8sSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLG9CQUFvQixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsb0JBQW9CLElBQUksRUFBRSxDQUFDO0lBQzVHLENBQUM7SUFFRCw2REFBNkQ7SUFDN0QsSUFBSSxhQUFhO1FBQ2YsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsSUFBSSxF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QUFDO1NBQzVDO1FBRUQsNEZBQTRGO1FBQzVGLElBQUksVUFBVSxJQUFJLFFBQVEsS0FBSyxFQUFFLEVBQUU7WUFDakMsT0FBTztnQkFDTCxLQUFLLEVBQUUsS0FBSztnQkFDWixHQUFHLEVBQUUsUUFBUSxJQUFJLFNBQVMsQ0FBQyx5QkFBeUI7YUFDckQsQ0FBQztTQUNIO1FBRUQsT0FBTztZQUNMLEtBQUssRUFBRSxJQUFJO1lBQ1gsR0FBRyxFQUFFLElBQUk7U0FDVixDQUFDO0lBQ0osQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xyXG5pbXBvcnQgeyBDb25zdGFudHMgfSBmcm9tICcuLy4uL2NvbnN0YW50cyc7XHJcbmltcG9ydCB7IG1hcEZsYXRwaWNrckRhdGVGb3JtYXRXaXRoRmllbGRUeXBlLCBtYXBNb21lbnREYXRlRm9ybWF0V2l0aEZpZWxkVHlwZSB9IGZyb20gJy4vLi4vc2VydmljZXMvdXRpbGl0aWVzJztcclxuaW1wb3J0IHsgQ29sdW1uLCBDb2x1bW5FZGl0b3IsIEVkaXRvciwgRWRpdG9yVmFsaWRhdG9yLCBFZGl0b3JWYWxpZGF0b3JPdXRwdXQsIEZpZWxkVHlwZSwgR3JpZE9wdGlvbiwgS2V5Q29kZSB9IGZyb20gJy4vLi4vbW9kZWxzL2luZGV4JztcclxuaW1wb3J0ICogYXMgbW9tZW50XyBmcm9tICdtb21lbnQtbWluaSc7XHJcbmNvbnN0IG1vbWVudCA9IG1vbWVudF87IC8vIHBhdGNoIHRvIGZpeCByb2xsdXAgXCJtb21lbnQgaGFzIG5vIGRlZmF1bHQgZXhwb3J0XCIgaXNzdWUsIGRvY3VtZW50IGhlcmUgaHR0cHM6Ly9naXRodWIuY29tL3JvbGx1cC9yb2xsdXAvaXNzdWVzLzY3MFxyXG5cclxuZGVjbGFyZSBmdW5jdGlvbiByZXF1aXJlKG5hbWU6IHN0cmluZyk7XHJcbnJlcXVpcmUoJ2ZsYXRwaWNrcicpO1xyXG5cclxuLy8gdXNpbmcgZXh0ZXJuYWwgbm9uLXR5cGVkIGpzIGxpYnJhcmllc1xyXG5kZWNsYXJlIHZhciAkOiBhbnk7XHJcblxyXG4vKlxyXG4gKiBBbiBleGFtcGxlIG9mIGEgZGF0ZSBwaWNrZXIgZWRpdG9yIHVzaW5nIEZsYXRwaWNrclxyXG4gKiBodHRwczovL2NobWxuLmdpdGh1Yi5pby9mbGF0cGlja3JcclxuICovXHJcbmV4cG9ydCBjbGFzcyBEYXRlRWRpdG9yIGltcGxlbWVudHMgRWRpdG9yIHtcclxuICBwcml2YXRlIF8kaW5wdXRXaXRoRGF0YTogYW55O1xyXG4gICRpbnB1dDogYW55O1xyXG4gIGZsYXRJbnN0YW5jZTogYW55O1xyXG4gIGRlZmF1bHREYXRlOiBzdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYXJnczogYW55KSB7XHJcbiAgICB0aGlzLmluaXQoKTtcclxuICB9XHJcblxyXG4gIC8qKiBHZXQgQ29sdW1uIERlZmluaXRpb24gb2JqZWN0ICovXHJcbiAgZ2V0IGNvbHVtbkRlZigpOiBDb2x1bW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuYXJncyAmJiB0aGlzLmFyZ3MuY29sdW1uIHx8IHt9O1xyXG4gIH1cclxuXHJcbiAgLyoqIEdldCBDb2x1bW4gRWRpdG9yIG9iamVjdCAqL1xyXG4gIGdldCBjb2x1bW5FZGl0b3IoKTogQ29sdW1uRWRpdG9yIHtcclxuICAgIHJldHVybiB0aGlzLmNvbHVtbkRlZiAmJiB0aGlzLmNvbHVtbkRlZi5pbnRlcm5hbENvbHVtbkVkaXRvciAmJiB0aGlzLmNvbHVtbkRlZi5pbnRlcm5hbENvbHVtbkVkaXRvciB8fCB7fTtcclxuICB9XHJcblxyXG4gIC8qKiBHZXQgRmxhdHBpY2tyIG9wdGlvbnMgcGFzc2VkIHRvIHRoZSBlZGl0b3IgYnkgdGhlIHVzZXIgKi9cclxuICBnZXQgZWRpdG9yT3B0aW9ucygpOiBhbnkge1xyXG4gICAgcmV0dXJuIHRoaXMuY29sdW1uRWRpdG9yLmVkaXRvck9wdGlvbnMgfHwge307XHJcbiAgfVxyXG5cclxuICAvKiogR2V0IHRoZSBWYWxpZGF0b3IgZnVuY3Rpb24sIGNhbiBiZSBwYXNzZWQgaW4gRWRpdG9yIHByb3BlcnR5IG9yIENvbHVtbiBEZWZpbml0aW9uICovXHJcbiAgZ2V0IHZhbGlkYXRvcigpOiBFZGl0b3JWYWxpZGF0b3Ige1xyXG4gICAgcmV0dXJuIHRoaXMuY29sdW1uRWRpdG9yLnZhbGlkYXRvciB8fCB0aGlzLmNvbHVtbkRlZi52YWxpZGF0b3I7XHJcbiAgfVxyXG5cclxuICBpbml0KCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuYXJncyAmJiB0aGlzLmFyZ3MuY29sdW1uKSB7XHJcbiAgICAgIGNvbnN0IGNvbHVtbklkID0gdGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYuaWQ7XHJcbiAgICAgIGNvbnN0IHBsYWNlaG9sZGVyID0gdGhpcy5jb2x1bW5FZGl0b3IgJiYgdGhpcy5jb2x1bW5FZGl0b3IucGxhY2Vob2xkZXIgfHwgJyc7XHJcbiAgICAgIGNvbnN0IHRpdGxlID0gdGhpcy5jb2x1bW5FZGl0b3IgJiYgdGhpcy5jb2x1bW5FZGl0b3IudGl0bGUgfHwgJyc7XHJcbiAgICAgIGNvbnN0IGdyaWRPcHRpb25zID0gdGhpcy5hcmdzLmdyaWQuZ2V0T3B0aW9ucygpIGFzIEdyaWRPcHRpb247XHJcbiAgICAgIHRoaXMuZGVmYXVsdERhdGUgPSAodGhpcy5hcmdzLml0ZW0pID8gdGhpcy5hcmdzLml0ZW1bdGhpcy5hcmdzLmNvbHVtbi5maWVsZF0gOiBudWxsO1xyXG4gICAgICBjb25zdCBpbnB1dEZvcm1hdCA9IG1hcEZsYXRwaWNrckRhdGVGb3JtYXRXaXRoRmllbGRUeXBlKHRoaXMuY29sdW1uRGVmLnR5cGUgfHwgRmllbGRUeXBlLmRhdGVJc28pO1xyXG4gICAgICBjb25zdCBvdXRwdXRGb3JtYXQgPSBtYXBGbGF0cGlja3JEYXRlRm9ybWF0V2l0aEZpZWxkVHlwZSh0aGlzLmNvbHVtbkRlZi5vdXRwdXRUeXBlIHx8IEZpZWxkVHlwZS5kYXRlVXRjKTtcclxuICAgICAgbGV0IGN1cnJlbnRMb2NhbGUgPSB0aGlzLmdldEN1cnJlbnRMb2NhbGUodGhpcy5jb2x1bW5EZWYsIGdyaWRPcHRpb25zKTtcclxuICAgICAgaWYgKGN1cnJlbnRMb2NhbGUubGVuZ3RoID4gMikge1xyXG4gICAgICAgIGN1cnJlbnRMb2NhbGUgPSBjdXJyZW50TG9jYWxlLnN1YnN0cmluZygwLCAyKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgcGlja2VyT3B0aW9uczogYW55ID0ge1xyXG4gICAgICAgIGRlZmF1bHREYXRlOiB0aGlzLmRlZmF1bHREYXRlLFxyXG4gICAgICAgIGFsdElucHV0OiB0cnVlLFxyXG4gICAgICAgIGFsdElucHV0Q2xhc3M6ICdmbGF0cGlja3ItYWx0LWlucHV0JyxcclxuICAgICAgICBhbHRGb3JtYXQ6IGlucHV0Rm9ybWF0LFxyXG4gICAgICAgIGRhdGVGb3JtYXQ6IG91dHB1dEZvcm1hdCxcclxuICAgICAgICBjbG9zZU9uU2VsZWN0OiBmYWxzZSxcclxuICAgICAgICBsb2NhbGU6IChjdXJyZW50TG9jYWxlICE9PSAnZW4nKSA/IHRoaXMubG9hZEZsYXRwaWNrckxvY2FsZShjdXJyZW50TG9jYWxlKSA6ICdlbicsXHJcbiAgICAgICAgb25DaGFuZ2U6IChzZWxlY3RlZERhdGVzOiBhbnlbXSB8IGFueSwgZGF0ZVN0cjogc3RyaW5nLCBpbnN0YW5jZTogYW55KSA9PiB7XHJcbiAgICAgICAgICB0aGlzLnNhdmUoKTtcclxuICAgICAgICB9LFxyXG4gICAgICB9O1xyXG5cclxuICAgICAgLy8gbWVyZ2Ugb3B0aW9ucyB3aXRoIG9wdGlvbmFsIHVzZXIncyBjdXN0b20gb3B0aW9uc1xyXG4gICAgICBjb25zdCBwaWNrZXJNZXJnZWRPcHRpb25zID0geyAuLi5waWNrZXJPcHRpb25zLCAuLi50aGlzLmVkaXRvck9wdGlvbnMgfTtcclxuICAgICAgY29uc3QgaW5wdXRDc3NDbGFzc2VzID0gYC5lZGl0b3ItdGV4dC5lZGl0b3ItJHtjb2x1bW5JZH0uZmxhdHBpY2tyYDtcclxuXHJcbiAgICAgIHRoaXMuJGlucHV0ID0gJChgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgZGF0YS1kZWZhdWx0RGF0ZT1cIiR7dGhpcy5kZWZhdWx0RGF0ZX1cIiBjbGFzcz1cIiR7aW5wdXRDc3NDbGFzc2VzLnJlcGxhY2UoL1xcLi9nLCAnICcpfVwiIHBsYWNlaG9sZGVyPVwiJHtwbGFjZWhvbGRlcn1cIiB0aXRsZT1cIiR7dGl0bGV9XCIgLz5gKTtcclxuICAgICAgdGhpcy4kaW5wdXQuYXBwZW5kVG8odGhpcy5hcmdzLmNvbnRhaW5lcik7XHJcbiAgICAgIHRoaXMuZmxhdEluc3RhbmNlID0gKHRoaXMuJGlucHV0WzBdICYmIHR5cGVvZiB0aGlzLiRpbnB1dFswXS5mbGF0cGlja3IgPT09ICdmdW5jdGlvbicpID8gdGhpcy4kaW5wdXRbMF0uZmxhdHBpY2tyKHBpY2tlck1lcmdlZE9wdGlvbnMpIDogbnVsbDtcclxuXHJcbiAgICAgIC8vIHdoZW4gd2UncmUgdXNpbmcgYW4gYWx0ZXJuYXRlIGlucHV0IHRvIGRpc3BsYXkgZGF0YSwgd2UnbGwgY29uc2lkZXIgdGhpcyBpbnB1dCBhcyB0aGUgb25lIHRvIGRvIHRoZSBmb2N1cyBsYXRlciBvblxyXG4gICAgICAvLyBlbHNlIGp1c3QgdXNlIHRoZSB0b3Agb25lXHJcbiAgICAgIHRoaXMuXyRpbnB1dFdpdGhEYXRhID0gKHBpY2tlck1lcmdlZE9wdGlvbnMgJiYgcGlja2VyTWVyZ2VkT3B0aW9ucy5hbHRJbnB1dCkgPyAkKGAke2lucHV0Q3NzQ2xhc3Nlc30uZmxhdHBpY2tyLWFsdC1pbnB1dGApIDogdGhpcy4kaW5wdXQ7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXRDdXJyZW50TG9jYWxlKGNvbHVtbkRlZjogQ29sdW1uLCBncmlkT3B0aW9uczogR3JpZE9wdGlvbikge1xyXG4gICAgY29uc3Qgb3B0aW9ucyA9IGdyaWRPcHRpb25zIHx8IGNvbHVtbkRlZi5wYXJhbXMgfHwge307XHJcbiAgICBpZiAob3B0aW9ucy5pMThuICYmIG9wdGlvbnMuaTE4biBpbnN0YW5jZW9mIFRyYW5zbGF0ZVNlcnZpY2UpIHtcclxuICAgICAgcmV0dXJuIG9wdGlvbnMuaTE4bi5jdXJyZW50TGFuZztcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gJ2VuJztcclxuICB9XHJcblxyXG4gIGxvYWRGbGF0cGlja3JMb2NhbGUobG9jYWxlOiBzdHJpbmcpIHtcclxuICAgIC8vIGNoYW5nZSBsb2NhbGUgaWYgbmVlZGVkLCBGbGF0cGlja3IgcmVmZXJlbmNlOiBodHRwczovL2NobWxuLmdpdGh1Yi5pby9mbGF0cGlja3IvbG9jYWxpemF0aW9uL1xyXG4gICAgY29uc3QgZ3JpZE9wdGlvbnMgPSB0aGlzLmFyZ3MgJiYgdGhpcy5hcmdzLmdyaWQgJiYgdGhpcy5hcmdzLmdyaWQuZ2V0T3B0aW9ucygpO1xyXG4gICAgaWYgKGdyaWRPcHRpb25zICYmIGdyaWRPcHRpb25zLnBhcmFtcyAmJiBncmlkT3B0aW9ucy5wYXJhbXMuZmxhcGlja3JMb2NhbGUpIHtcclxuICAgICAgcmV0dXJuIGdyaWRPcHRpb25zLnBhcmFtcy5mbGFwaWNrckxvY2FsZTtcclxuICAgIH0gZWxzZSBpZiAobG9jYWxlICE9PSAnZW4nKSB7XHJcbiAgICAgIGNvbnN0IGxvY2FsZURlZmF1bHQ6IGFueSA9IHJlcXVpcmUoYGZsYXRwaWNrci9kaXN0L2wxMG4vJHtsb2NhbGV9LmpzYCkuZGVmYXVsdDtcclxuICAgICAgcmV0dXJuIChsb2NhbGVEZWZhdWx0ICYmIGxvY2FsZURlZmF1bHRbbG9jYWxlXSkgPyBsb2NhbGVEZWZhdWx0W2xvY2FsZV0gOiAnZW4nO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuICdlbic7XHJcbiAgfVxyXG5cclxuICBkZXN0cm95KCkge1xyXG4gICAgdGhpcy5oaWRlKCk7XHJcbiAgICB0aGlzLiRpbnB1dC5yZW1vdmUoKTtcclxuICAgIGlmICh0aGlzLl8kaW5wdXRXaXRoRGF0YSAmJiB0eXBlb2YgdGhpcy5fJGlucHV0V2l0aERhdGEucmVtb3ZlID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgIHRoaXMuXyRpbnB1dFdpdGhEYXRhLnJlbW92ZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2hvdygpIHtcclxuICAgIGlmICh0aGlzLmZsYXRJbnN0YW5jZSAmJiB0eXBlb2YgdGhpcy5mbGF0SW5zdGFuY2Uub3BlbiA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICB0aGlzLmZsYXRJbnN0YW5jZS5vcGVuKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBoaWRlKCkge1xyXG4gICAgaWYgKHRoaXMuZmxhdEluc3RhbmNlICYmIHR5cGVvZiB0aGlzLmZsYXRJbnN0YW5jZS5jbG9zZSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICB0aGlzLmZsYXRJbnN0YW5jZS5jbG9zZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZm9jdXMoKSB7XHJcbiAgICBpZiAodGhpcy5fJGlucHV0V2l0aERhdGEgJiYgdGhpcy5fJGlucHV0V2l0aERhdGEuZm9jdXMpIHtcclxuICAgICAgdGhpcy5fJGlucHV0V2l0aERhdGEuZm9jdXMoKS5zZWxlY3QoKTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy4kaW5wdXQgJiYgdGhpcy4kaW5wdXQuZm9jdXMpIHtcclxuICAgICAgdGhpcy4kaW5wdXQuZm9jdXMoKS5zZWxlY3QoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNhdmUoKSB7XHJcbiAgICAvLyBhdXRvY29tbWl0IHdpbGwgbm90IGZvY3VzIHRoZSBuZXh0IGVkaXRvclxyXG4gICAgY29uc3QgdmFsaWRhdGlvbiA9IHRoaXMudmFsaWRhdGUoKTtcclxuICAgIGlmICh2YWxpZGF0aW9uICYmIHZhbGlkYXRpb24udmFsaWQpIHtcclxuICAgICAgaWYgKHRoaXMuYXJncy5ncmlkLmdldE9wdGlvbnMoKS5hdXRvQ29tbWl0RWRpdCkge1xyXG4gICAgICAgIHRoaXMuYXJncy5ncmlkLmdldEVkaXRvckxvY2soKS5jb21taXRDdXJyZW50RWRpdCgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuYXJncy5jb21taXRDaGFuZ2VzKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldENvbHVtbkVkaXRvcigpIHtcclxuICAgIHJldHVybiB0aGlzLmFyZ3MgJiYgdGhpcy5hcmdzLmNvbHVtbiAmJiB0aGlzLmFyZ3MuY29sdW1uLmludGVybmFsQ29sdW1uRWRpdG9yICYmIHRoaXMuYXJncy5jb2x1bW4uaW50ZXJuYWxDb2x1bW5FZGl0b3I7XHJcbiAgfVxyXG5cclxuICBsb2FkVmFsdWUoaXRlbTogYW55KSB7XHJcbiAgICBjb25zdCBmaWVsZE5hbWUgPSB0aGlzLmNvbHVtbkRlZiAmJiB0aGlzLmNvbHVtbkRlZi5maWVsZDtcclxuXHJcbiAgICAvLyB3aGVuIGl0J3MgYSBjb21wbGV4IG9iamVjdCwgdGhlbiBwdWxsIHRoZSBvYmplY3QgbmFtZSBvbmx5LCBlLmcuOiBcInVzZXIuZmlyc3ROYW1lXCIgPT4gXCJ1c2VyXCJcclxuICAgIGNvbnN0IGZpZWxkTmFtZUZyb21Db21wbGV4T2JqZWN0ID0gZmllbGROYW1lLmluZGV4T2YoJy4nKSA/IGZpZWxkTmFtZS5zdWJzdHJpbmcoMCwgZmllbGROYW1lLmluZGV4T2YoJy4nKSkgOiAnJztcclxuXHJcbiAgICBpZiAoaXRlbSAmJiB0aGlzLmNvbHVtbkRlZiAmJiAoaXRlbS5oYXNPd25Qcm9wZXJ0eShmaWVsZE5hbWUpIHx8IGl0ZW0uaGFzT3duUHJvcGVydHkoZmllbGROYW1lRnJvbUNvbXBsZXhPYmplY3QpKSkge1xyXG4gICAgICB0aGlzLmRlZmF1bHREYXRlID0gaXRlbVtmaWVsZE5hbWVGcm9tQ29tcGxleE9iamVjdCB8fCBmaWVsZE5hbWVdO1xyXG4gICAgICB0aGlzLmZsYXRJbnN0YW5jZS5zZXREYXRlKGl0ZW1bdGhpcy5hcmdzLmNvbHVtbi5maWVsZF0pO1xyXG4gICAgICB0aGlzLmZvY3VzKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzZXJpYWxpemVWYWx1ZSgpIHtcclxuICAgIGNvbnN0IGRvbVZhbHVlOiBzdHJpbmcgPSB0aGlzLiRpbnB1dC52YWwoKTtcclxuXHJcbiAgICBpZiAoIWRvbVZhbHVlKSB7XHJcbiAgICAgIHJldHVybiAnJztcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBvdXRwdXRGb3JtYXQgPSBtYXBNb21lbnREYXRlRm9ybWF0V2l0aEZpZWxkVHlwZSh0aGlzLmFyZ3MuY29sdW1uLnR5cGUgfHwgRmllbGRUeXBlLmRhdGVJc28pO1xyXG4gICAgY29uc3QgdmFsdWUgPSBtb21lbnQoZG9tVmFsdWUpLmZvcm1hdChvdXRwdXRGb3JtYXQpO1xyXG5cclxuICAgIHJldHVybiB2YWx1ZTtcclxuICB9XHJcblxyXG4gIGFwcGx5VmFsdWUoaXRlbTogYW55LCBzdGF0ZTogYW55KSB7XHJcbiAgICBjb25zdCBmaWVsZE5hbWUgPSB0aGlzLmNvbHVtbkRlZiAmJiB0aGlzLmNvbHVtbkRlZi5maWVsZDtcclxuICAgIGNvbnN0IG91dHB1dEZvcm1hdCA9IG1hcE1vbWVudERhdGVGb3JtYXRXaXRoRmllbGRUeXBlKHRoaXMuYXJncy5jb2x1bW4udHlwZSB8fCBGaWVsZFR5cGUuZGF0ZUlzbyk7XHJcblxyXG4gICAgLy8gd2hlbiBpdCdzIGEgY29tcGxleCBvYmplY3QsIHRoZW4gcHVsbCB0aGUgb2JqZWN0IG5hbWUgb25seSwgZS5nLjogXCJ1c2VyLmZpcnN0TmFtZVwiID0+IFwidXNlclwiXHJcbiAgICBjb25zdCBmaWVsZE5hbWVGcm9tQ29tcGxleE9iamVjdCA9IGZpZWxkTmFtZS5pbmRleE9mKCcuJykgPyBmaWVsZE5hbWUuc3Vic3RyaW5nKDAsIGZpZWxkTmFtZS5pbmRleE9mKCcuJykpIDogJyc7XHJcbiAgICBjb25zdCBuZXdWYWx1ZSA9IHN0YXRlID8gbW9tZW50KHN0YXRlLCBvdXRwdXRGb3JtYXQpLnRvRGF0ZSgpIDogJyc7XHJcbiAgICBjb25zdCB2YWxpZGF0aW9uID0gdGhpcy52YWxpZGF0ZShuZXdWYWx1ZSk7XHJcbiAgICBpdGVtW2ZpZWxkTmFtZUZyb21Db21wbGV4T2JqZWN0IHx8IGZpZWxkTmFtZV0gPSAodmFsaWRhdGlvbiAmJiB2YWxpZGF0aW9uLnZhbGlkKSA/IG5ld1ZhbHVlIDogJyc7XHJcbiAgfVxyXG5cclxuICBpc1ZhbHVlQ2hhbmdlZCgpIHtcclxuICAgIHJldHVybiAoISh0aGlzLiRpbnB1dC52YWwoKSA9PT0gJycgJiYgdGhpcy5kZWZhdWx0RGF0ZSA9PSBudWxsKSkgJiYgKHRoaXMuJGlucHV0LnZhbCgpICE9PSB0aGlzLmRlZmF1bHREYXRlKTtcclxuICB9XHJcblxyXG4gIHZhbGlkYXRlKGlucHV0VmFsdWU/OiBhbnkpOiBFZGl0b3JWYWxpZGF0b3JPdXRwdXQge1xyXG4gICAgY29uc3QgaXNSZXF1aXJlZCA9IHRoaXMuY29sdW1uRWRpdG9yLnJlcXVpcmVkO1xyXG4gICAgY29uc3QgZWxtVmFsdWUgPSAoaW5wdXRWYWx1ZSAhPT0gdW5kZWZpbmVkKSA/IGlucHV0VmFsdWUgOiB0aGlzLiRpbnB1dCAmJiB0aGlzLiRpbnB1dC52YWwgJiYgdGhpcy4kaW5wdXQudmFsKCk7XHJcbiAgICBjb25zdCBlcnJvck1zZyA9IHRoaXMuY29sdW1uRWRpdG9yLmVycm9yTWVzc2FnZTtcclxuXHJcbiAgICBpZiAodGhpcy52YWxpZGF0b3IpIHtcclxuICAgICAgcmV0dXJuIHRoaXMudmFsaWRhdG9yKGVsbVZhbHVlLCB0aGlzLmFyZ3MpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGJ5IGRlZmF1bHQgdGhlIGVkaXRvciBpcyBhbG1vc3QgYWx3YXlzIHZhbGlkIChleGNlcHQgd2hlbiBpdCdzIHJlcXVpcmVkIGJ1dCBub3QgcHJvdmlkZWQpXHJcbiAgICBpZiAoaXNSZXF1aXJlZCAmJiBlbG1WYWx1ZSA9PT0gJycpIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICB2YWxpZDogZmFsc2UsXHJcbiAgICAgICAgbXNnOiBlcnJvck1zZyB8fCBDb25zdGFudHMuVkFMSURBVElPTl9SRVFVSVJFRF9GSUVMRFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIHZhbGlkOiB0cnVlLFxyXG4gICAgICBtc2c6IG51bGxcclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdfQ==