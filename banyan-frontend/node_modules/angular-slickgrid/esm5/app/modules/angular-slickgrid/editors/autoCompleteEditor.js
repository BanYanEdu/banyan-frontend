import { KeyCode, FieldType } from './../models/index';
import { Constants } from './../constants';
import { findOrDefault } from '../services/utilities';
/*
 * An example of a 'detached' editor.
 * KeyDown events are also handled to provide handling for Tab, Shift-Tab, Esc and Ctrl-Enter.
 */
var AutoCompleteEditor = /** @class */ (function () {
    function AutoCompleteEditor(args) {
        this.args = args;
        this.init();
    }
    Object.defineProperty(AutoCompleteEditor.prototype, "collection", {
        /** Get the Collection */
        get: function () {
            return this.columnDef && this.columnDef && this.columnDef.internalColumnEditor.collection || [];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutoCompleteEditor.prototype, "columnDef", {
        /** Get Column Definition object */
        get: function () {
            return this.args && this.args.column || {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutoCompleteEditor.prototype, "columnEditor", {
        /** Get Column Editor object */
        get: function () {
            return this.columnDef && this.columnDef.internalColumnEditor || {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutoCompleteEditor.prototype, "customStructure", {
        /** Getter for the Custom Structure if exist */
        get: function () {
            return this.columnDef && this.columnDef.internalColumnEditor && this.columnDef.internalColumnEditor.customStructure;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutoCompleteEditor.prototype, "hasAutoCommitEdit", {
        get: function () {
            return this.args.grid.getOptions().autoCommitEdit;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutoCompleteEditor.prototype, "validator", {
        /** Get the Validator function, can be passed in Editor property or Column Definition */
        get: function () {
            return this.columnEditor.validator || this.columnDef.validator;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutoCompleteEditor.prototype, "editorOptions", {
        get: function () {
            return this.columnEditor && this.columnEditor.editorOptions || {};
        },
        enumerable: true,
        configurable: true
    });
    AutoCompleteEditor.prototype.init = function () {
        var _this = this;
        var columnId = this.columnDef && this.columnDef.id;
        var placeholder = this.columnEditor && this.columnEditor.placeholder || '';
        var title = this.columnEditor && this.columnEditor.title || '';
        this.labelName = this.customStructure && this.customStructure.label || 'label';
        this.valueName = this.customStructure && this.customStructure.value || 'value';
        this.$input = $("<input type=\"text\" role=\"presentation\" autocomplete=\"off\" class=\"autocomplete editor-text editor-" + columnId + "\" placeholder=\"" + placeholder + "\" title=\"" + title + "\" />")
            .appendTo(this.args.container)
            .on('keydown.nav', function (event) {
            _this._lastInputEvent = event;
            if (event.keyCode === KeyCode.LEFT || event.keyCode === KeyCode.RIGHT) {
                event.stopImmediatePropagation();
            }
        });
        // user might pass his own autocomplete options
        var autoCompleteOptions = this.columnDef && this.columnDef.internalColumnEditor && this.columnDef.internalColumnEditor.editorOptions;
        // user might provide his own custom structure
        // jQuery UI autocomplete requires a label/value pair, so we must remap them when user provide different ones
        var collection = this.collection;
        if (Array.isArray(collection) && this.customStructure) {
            collection = collection.map(function (item) {
                return { label: item[_this.labelName], value: item[_this.valueName] };
            });
        }
        // when user passes it's own autocomplete options
        // we still need to provide our own "select" callback implementation
        if (autoCompleteOptions) {
            autoCompleteOptions.select = function (event, ui) { return _this.onClose(event, ui); };
            this.$input.autocomplete(autoCompleteOptions);
        }
        else {
            this.$input.autocomplete({
                source: collection,
                minLength: 0,
                select: function (event, ui) { return _this.onClose(event, ui); },
            });
        }
        setTimeout(function () {
            _this.$input.focus().select();
        }, 50);
    };
    AutoCompleteEditor.prototype.destroy = function () {
        this.$input.off('keydown.nav').remove();
    };
    AutoCompleteEditor.prototype.focus = function () {
        this.$input.focus();
    };
    AutoCompleteEditor.prototype.getValue = function () {
        return this.$input.val();
    };
    AutoCompleteEditor.prototype.setValue = function (val) {
        this.$input.val(val);
    };
    AutoCompleteEditor.prototype.loadValue = function (item) {
        var fieldName = this.columnDef && this.columnDef.field;
        // when it's a complex object, then pull the object name only, e.g.: "user.firstName" => "user"
        var fieldNameFromComplexObject = fieldName.indexOf('.') ? fieldName.substring(0, fieldName.indexOf('.')) : '';
        if (item && this.columnDef && (item.hasOwnProperty(fieldName) || item.hasOwnProperty(fieldNameFromComplexObject))) {
            var data = item[fieldNameFromComplexObject || fieldName];
            this._currentValue = data;
            this._defaultTextValue = typeof data === 'string' ? data : data[this.labelName];
            this.$input.val(this._defaultTextValue);
            this.$input[0].defaultValue = this._defaultTextValue;
            this.$input.select();
        }
    };
    AutoCompleteEditor.prototype.save = function () {
        var validation = this.validate();
        if (validation && validation.valid) {
            if (this.hasAutoCommitEdit) {
                this.args.grid.getEditorLock().commitCurrentEdit();
            }
            else {
                this.args.commitChanges();
            }
        }
    };
    AutoCompleteEditor.prototype.serializeValue = function () {
        var _a;
        // if user provided a custom structure, we will serialize the value returned from the object with custom structure
        var minLength = typeof this.editorOptions.minLength !== 'undefined' ? this.editorOptions.minLength : 3;
        if (this.editorOptions.forceUserInput) {
            this._currentValue = this.$input.val().length >= minLength ? this.$input.val() : this._currentValue;
        }
        if (this.customStructure && this._currentValue.hasOwnProperty(this.labelName)) {
            return this._currentValue[this.labelName];
        }
        else if (this._currentValue.label) {
            if (this.columnDef.type === FieldType.object) {
                return _a = {},
                    _a[this.labelName] = this._currentValue.label,
                    _a[this.valueName] = this._currentValue.value,
                    _a;
            }
            return this._currentValue.label;
        }
        return this._currentValue;
    };
    AutoCompleteEditor.prototype.applyValue = function (item, state) {
        var _this = this;
        var newValue = state;
        var fieldName = this.columnDef && this.columnDef.field;
        // if we have a collection defined, we will try to find the string within the collection and return it
        if (Array.isArray(this.collection) && this.collection.length > 0) {
            newValue = findOrDefault(this.collection, function (collectionItem) {
                if (collectionItem && collectionItem.hasOwnProperty(_this.labelName)) {
                    return collectionItem[_this.labelName].toString() === state;
                }
                return collectionItem.toString() === state;
            });
        }
        // when it's a complex object, then pull the object name only, e.g.: "user.firstName" => "user"
        var fieldNameFromComplexObject = fieldName.indexOf('.') ? fieldName.substring(0, fieldName.indexOf('.')) : '';
        var validation = this.validate(newValue);
        item[fieldNameFromComplexObject || fieldName] = (validation && validation.valid) ? newValue : '';
    };
    AutoCompleteEditor.prototype.isValueChanged = function () {
        var lastEvent = this._lastInputEvent && this._lastInputEvent.keyCode;
        if (this.columnEditor && this.columnEditor.alwaysSaveOnEnterKey && lastEvent === KeyCode.ENTER) {
            return true;
        }
        return (!(this.$input.val() === '' && this._defaultTextValue === null)) && (this.$input.val() !== this._defaultTextValue);
    };
    AutoCompleteEditor.prototype.validate = function (inputValue) {
        var isRequired = this.columnEditor.required;
        var elmValue = (inputValue !== undefined) ? inputValue : this.$input && this.$input.val && this.$input.val();
        var errorMsg = this.columnEditor.errorMessage;
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
    };
    //
    // private functions
    // ------------------
    AutoCompleteEditor.prototype.onClose = function (event, ui) {
        if (ui && ui.item) {
            this._currentValue = ui && ui.item;
            var itemLabel = typeof ui.item === 'string' ? ui.item : ui.item.label;
            this.setValue(itemLabel);
            if (this.args.grid.getOptions().autoCommitEdit) {
                // do not use args.commitChanges() as this sets the focus to the next row.
                var validation = this.validate();
                if (validation && validation.valid) {
                    this.args.grid.getEditorLock().commitCurrentEdit();
                }
            }
        }
        return false;
    };
    return AutoCompleteEditor;
}());
export { AutoCompleteEditor };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b0NvbXBsZXRlRWRpdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9lZGl0b3JzL2F1dG9Db21wbGV0ZUVkaXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBTUwsT0FBTyxFQUVQLFNBQVMsRUFDVixNQUFNLG1CQUFtQixDQUFDO0FBQzNCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFLdEQ7OztHQUdHO0FBQ0g7SUFjRSw0QkFBb0IsSUFBUztRQUFULFNBQUksR0FBSixJQUFJLENBQUs7UUFDM0IsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2QsQ0FBQztJQUdELHNCQUFJLDBDQUFVO1FBRGQseUJBQXlCO2FBQ3pCO1lBQ0UsT0FBTyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxVQUFVLElBQUksRUFBRSxDQUFDO1FBQ2xHLENBQUM7OztPQUFBO0lBR0Qsc0JBQUkseUNBQVM7UUFEYixtQ0FBbUM7YUFDbkM7WUFDRSxPQUFPLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDO1FBQzdDLENBQUM7OztPQUFBO0lBR0Qsc0JBQUksNENBQVk7UUFEaEIsK0JBQStCO2FBQy9CO1lBQ0UsT0FBTyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsb0JBQW9CLElBQUksRUFBRSxDQUFDO1FBQ3JFLENBQUM7OztPQUFBO0lBR0Qsc0JBQUksK0NBQWU7UUFEbkIsK0NBQStDO2FBQy9DO1lBQ0UsT0FBTyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxT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Q0osQ0FBQztJQUVELEVBQUU7SUFDRixvQkFBb0I7SUFDcEIscUJBQXFCO0lBRWIsb0NBQU8sR0FBZixVQUFnQixLQUFZLEVBQUUsRUFBTztRQUNuQyxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFO1lBQ2pCLElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUM7WUFDbkMsSUFBTSxTQUFTLEdBQUcsT0FBTyxFQUFFLENBQUMsSUFBSSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDeEUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUV6QixJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLGNBQWMsRUFBRTtnQkFDOUMsMEVBQTBFO2dCQUMxRSxJQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQ25DLElBQUksVUFBVSxJQUFJLFVBQVUsQ0FBQyxLQUFLLEVBQUU7b0JBQ2xDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLGlCQUFpQixFQUFFLENBQUM7aUJBQ3BEO2FBQ0Y7U0FDRjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUNILHlCQUFDO0FBQUQsQ0FBQyxBQXZPRCxJQXVPQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29sdW1uLFxyXG4gIENvbHVtbkVkaXRvcixcclxuICBFZGl0b3IsXHJcbiAgRWRpdG9yVmFsaWRhdG9yLFxyXG4gIEVkaXRvclZhbGlkYXRvck91dHB1dCxcclxuICBLZXlDb2RlLFxyXG4gIENvbGxlY3Rpb25DdXN0b21TdHJ1Y3R1cmUsXHJcbiAgRmllbGRUeXBlXHJcbn0gZnJvbSAnLi8uLi9tb2RlbHMvaW5kZXgnO1xyXG5pbXBvcnQgeyBDb25zdGFudHMgfSBmcm9tICcuLy4uL2NvbnN0YW50cyc7XHJcbmltcG9ydCB7IGZpbmRPckRlZmF1bHQgfSBmcm9tICcuLi9zZXJ2aWNlcy91dGlsaXRpZXMnO1xyXG5cclxuLy8gdXNpbmcgZXh0ZXJuYWwgbm9uLXR5cGVkIGpzIGxpYnJhcmllc1xyXG5kZWNsYXJlIHZhciAkOiBhbnk7XHJcblxyXG4vKlxyXG4gKiBBbiBleGFtcGxlIG9mIGEgJ2RldGFjaGVkJyBlZGl0b3IuXHJcbiAqIEtleURvd24gZXZlbnRzIGFyZSBhbHNvIGhhbmRsZWQgdG8gcHJvdmlkZSBoYW5kbGluZyBmb3IgVGFiLCBTaGlmdC1UYWIsIEVzYyBhbmQgQ3RybC1FbnRlci5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBBdXRvQ29tcGxldGVFZGl0b3IgaW1wbGVtZW50cyBFZGl0b3Ige1xyXG4gIHByaXZhdGUgX2N1cnJlbnRWYWx1ZTogYW55O1xyXG4gIHByaXZhdGUgX2RlZmF1bHRUZXh0VmFsdWU6IHN0cmluZztcclxuICBwcml2YXRlIF9sYXN0SW5wdXRFdmVudDogS2V5Ym9hcmRFdmVudDtcclxuICAkaW5wdXQ6IGFueTtcclxuXHJcbiAgLyoqIFRoZSBwcm9wZXJ0eSBuYW1lIGZvciBsYWJlbHMgaW4gdGhlIGNvbGxlY3Rpb24gKi9cclxuICBsYWJlbE5hbWU6IHN0cmluZztcclxuXHJcbiAgLyoqIFRoZSBwcm9wZXJ0eSBuYW1lIGZvciB2YWx1ZXMgaW4gdGhlIGNvbGxlY3Rpb24gKi9cclxuICB2YWx1ZU5hbWU6IHN0cmluZztcclxuXHJcbiAgZm9yY2VVc2VySW5wdXQ6IGJvb2xlYW47XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYXJnczogYW55KSB7XHJcbiAgICB0aGlzLmluaXQoKTtcclxuICB9XHJcblxyXG4gIC8qKiBHZXQgdGhlIENvbGxlY3Rpb24gKi9cclxuICBnZXQgY29sbGVjdGlvbigpOiBhbnlbXSB7XHJcbiAgICByZXR1cm4gdGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYuaW50ZXJuYWxDb2x1bW5FZGl0b3IuY29sbGVjdGlvbiB8fCBbXTtcclxuICB9XHJcblxyXG4gIC8qKiBHZXQgQ29sdW1uIERlZmluaXRpb24gb2JqZWN0ICovXHJcbiAgZ2V0IGNvbHVtbkRlZigpOiBDb2x1bW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuYXJncyAmJiB0aGlzLmFyZ3MuY29sdW1uIHx8IHt9O1xyXG4gIH1cclxuXHJcbiAgLyoqIEdldCBDb2x1bW4gRWRpdG9yIG9iamVjdCAqL1xyXG4gIGdldCBjb2x1bW5FZGl0b3IoKTogQ29sdW1uRWRpdG9yIHtcclxuICAgIHJldHVybiB0aGlzLmNvbHVtbkRlZiAmJiB0aGlzLmNvbHVtbkRlZi5pbnRlcm5hbENvbHVtbkVkaXRvciB8fCB7fTtcclxuICB9XHJcblxyXG4gIC8qKiBHZXR0ZXIgZm9yIHRoZSBDdXN0b20gU3RydWN0dXJlIGlmIGV4aXN0ICovXHJcbiAgZ2V0IGN1c3RvbVN0cnVjdHVyZSgpOiBDb2xsZWN0aW9uQ3VzdG9tU3RydWN0dXJlIHtcclxuICAgIHJldHVybiB0aGlzLmNvbHVtbkRlZiAmJiB0aGlzLmNvbHVtbkRlZi5pbnRlcm5hbENvbHVtbkVkaXRvciAmJiB0aGlzLmNvbHVtbkRlZi5pbnRlcm5hbENvbHVtbkVkaXRvci5jdXN0b21TdHJ1Y3R1cmU7XHJcbiAgfVxyXG5cclxuICBnZXQgaGFzQXV0b0NvbW1pdEVkaXQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5hcmdzLmdyaWQuZ2V0T3B0aW9ucygpLmF1dG9Db21taXRFZGl0O1xyXG4gIH1cclxuXHJcbiAgLyoqIEdldCB0aGUgVmFsaWRhdG9yIGZ1bmN0aW9uLCBjYW4gYmUgcGFzc2VkIGluIEVkaXRvciBwcm9wZXJ0eSBvciBDb2x1bW4gRGVmaW5pdGlvbiAqL1xyXG4gIGdldCB2YWxpZGF0b3IoKTogRWRpdG9yVmFsaWRhdG9yIHtcclxuICAgIHJldHVybiB0aGlzLmNvbHVtbkVkaXRvci52YWxpZGF0b3IgfHwgdGhpcy5jb2x1bW5EZWYudmFsaWRhdG9yO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGVkaXRvck9wdGlvbnMoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5jb2x1bW5FZGl0b3IgJiYgdGhpcy5jb2x1bW5FZGl0b3IuZWRpdG9yT3B0aW9ucyB8fCB7fTtcclxuICB9XHJcblxyXG4gIGluaXQoKTogdm9pZCB7XHJcbiAgICBjb25zdCBjb2x1bW5JZCA9IHRoaXMuY29sdW1uRGVmICYmIHRoaXMuY29sdW1uRGVmLmlkO1xyXG4gICAgY29uc3QgcGxhY2Vob2xkZXIgPSB0aGlzLmNvbHVtbkVkaXRvciAmJiB0aGlzLmNvbHVtbkVkaXRvci5wbGFjZWhvbGRlciB8fCAnJztcclxuICAgIGNvbnN0IHRpdGxlID0gdGhpcy5jb2x1bW5FZGl0b3IgJiYgdGhpcy5jb2x1bW5FZGl0b3IudGl0bGUgfHwgJyc7XHJcbiAgICB0aGlzLmxhYmVsTmFtZSA9IHRoaXMuY3VzdG9tU3RydWN0dXJlICYmIHRoaXMuY3VzdG9tU3RydWN0dXJlLmxhYmVsIHx8ICdsYWJlbCc7XHJcbiAgICB0aGlzLnZhbHVlTmFtZSA9IHRoaXMuY3VzdG9tU3RydWN0dXJlICYmIHRoaXMuY3VzdG9tU3RydWN0dXJlLnZhbHVlIHx8ICd2YWx1ZSc7XHJcbiAgICB0aGlzLiRpbnB1dCA9ICQoYDxpbnB1dCB0eXBlPVwidGV4dFwiIHJvbGU9XCJwcmVzZW50YXRpb25cIiBhdXRvY29tcGxldGU9XCJvZmZcIiBjbGFzcz1cImF1dG9jb21wbGV0ZSBlZGl0b3ItdGV4dCBlZGl0b3ItJHtjb2x1bW5JZH1cIiBwbGFjZWhvbGRlcj1cIiR7cGxhY2Vob2xkZXJ9XCIgdGl0bGU9XCIke3RpdGxlfVwiIC8+YClcclxuICAgICAgLmFwcGVuZFRvKHRoaXMuYXJncy5jb250YWluZXIpXHJcbiAgICAgIC5vbigna2V5ZG93bi5uYXYnLCAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpID0+IHtcclxuICAgICAgICB0aGlzLl9sYXN0SW5wdXRFdmVudCA9IGV2ZW50O1xyXG4gICAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSBLZXlDb2RlLkxFRlQgfHwgZXZlbnQua2V5Q29kZSA9PT0gS2V5Q29kZS5SSUdIVCkge1xyXG4gICAgICAgICAgZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAvLyB1c2VyIG1pZ2h0IHBhc3MgaGlzIG93biBhdXRvY29tcGxldGUgb3B0aW9uc1xyXG4gICAgY29uc3QgYXV0b0NvbXBsZXRlT3B0aW9ucyA9IHRoaXMuY29sdW1uRGVmICYmIHRoaXMuY29sdW1uRGVmLmludGVybmFsQ29sdW1uRWRpdG9yICYmIHRoaXMuY29sdW1uRGVmLmludGVybmFsQ29sdW1uRWRpdG9yLmVkaXRvck9wdGlvbnM7XHJcblxyXG4gICAgLy8gdXNlciBtaWdodCBwcm92aWRlIGhpcyBvd24gY3VzdG9tIHN0cnVjdHVyZVxyXG4gICAgLy8galF1ZXJ5IFVJIGF1dG9jb21wbGV0ZSByZXF1aXJlcyBhIGxhYmVsL3ZhbHVlIHBhaXIsIHNvIHdlIG11c3QgcmVtYXAgdGhlbSB3aGVuIHVzZXIgcHJvdmlkZSBkaWZmZXJlbnQgb25lc1xyXG4gICAgbGV0IGNvbGxlY3Rpb24gPSB0aGlzLmNvbGxlY3Rpb247XHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheShjb2xsZWN0aW9uKSAmJiB0aGlzLmN1c3RvbVN0cnVjdHVyZSkge1xyXG4gICAgICBjb2xsZWN0aW9uID0gY29sbGVjdGlvbi5tYXAoKGl0ZW0pID0+IHtcclxuICAgICAgICByZXR1cm4geyBsYWJlbDogaXRlbVt0aGlzLmxhYmVsTmFtZV0sIHZhbHVlOiBpdGVtW3RoaXMudmFsdWVOYW1lXSB9O1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyB3aGVuIHVzZXIgcGFzc2VzIGl0J3Mgb3duIGF1dG9jb21wbGV0ZSBvcHRpb25zXHJcbiAgICAvLyB3ZSBzdGlsbCBuZWVkIHRvIHByb3ZpZGUgb3VyIG93biBcInNlbGVjdFwiIGNhbGxiYWNrIGltcGxlbWVudGF0aW9uXHJcbiAgICBpZiAoYXV0b0NvbXBsZXRlT3B0aW9ucykge1xyXG4gICAgICBhdXRvQ29tcGxldGVPcHRpb25zLnNlbGVjdCA9IChldmVudDogRXZlbnQsIHVpOiBhbnkpID0+IHRoaXMub25DbG9zZShldmVudCwgdWkpO1xyXG4gICAgICB0aGlzLiRpbnB1dC5hdXRvY29tcGxldGUoYXV0b0NvbXBsZXRlT3B0aW9ucyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLiRpbnB1dC5hdXRvY29tcGxldGUoe1xyXG4gICAgICAgIHNvdXJjZTogY29sbGVjdGlvbixcclxuICAgICAgICBtaW5MZW5ndGg6IDAsXHJcbiAgICAgICAgc2VsZWN0OiAoZXZlbnQ6IEV2ZW50LCB1aTogYW55KSA9PiB0aGlzLm9uQ2xvc2UoZXZlbnQsIHVpKSxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIHRoaXMuJGlucHV0LmZvY3VzKCkuc2VsZWN0KCk7XHJcbiAgICB9LCA1MCk7XHJcbiAgfVxyXG5cclxuICBkZXN0cm95KCkge1xyXG4gICAgdGhpcy4kaW5wdXQub2ZmKCdrZXlkb3duLm5hdicpLnJlbW92ZSgpO1xyXG4gIH1cclxuXHJcbiAgZm9jdXMoKSB7XHJcbiAgICB0aGlzLiRpbnB1dC5mb2N1cygpO1xyXG4gIH1cclxuXHJcbiAgZ2V0VmFsdWUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy4kaW5wdXQudmFsKCk7XHJcbiAgfVxyXG5cclxuICBzZXRWYWx1ZSh2YWw6IHN0cmluZykge1xyXG4gICAgdGhpcy4kaW5wdXQudmFsKHZhbCk7XHJcbiAgfVxyXG5cclxuICBsb2FkVmFsdWUoaXRlbTogYW55KSB7XHJcbiAgICBjb25zdCBmaWVsZE5hbWUgPSB0aGlzLmNvbHVtbkRlZiAmJiB0aGlzLmNvbHVtbkRlZi5maWVsZDtcclxuXHJcbiAgICAvLyB3aGVuIGl0J3MgYSBjb21wbGV4IG9iamVjdCwgdGhlbiBwdWxsIHRoZSBvYmplY3QgbmFtZSBvbmx5LCBlLmcuOiBcInVzZXIuZmlyc3ROYW1lXCIgPT4gXCJ1c2VyXCJcclxuICAgIGNvbnN0IGZpZWxkTmFtZUZyb21Db21wbGV4T2JqZWN0ID0gZmllbGROYW1lLmluZGV4T2YoJy4nKSA/IGZpZWxkTmFtZS5zdWJzdHJpbmcoMCwgZmllbGROYW1lLmluZGV4T2YoJy4nKSkgOiAnJztcclxuXHJcbiAgICBpZiAoaXRlbSAmJiB0aGlzLmNvbHVtbkRlZiAmJiAoaXRlbS5oYXNPd25Qcm9wZXJ0eShmaWVsZE5hbWUpIHx8IGl0ZW0uaGFzT3duUHJvcGVydHkoZmllbGROYW1lRnJvbUNvbXBsZXhPYmplY3QpKSkge1xyXG4gICAgICBjb25zdCBkYXRhID0gaXRlbVtmaWVsZE5hbWVGcm9tQ29tcGxleE9iamVjdCB8fCBmaWVsZE5hbWVdO1xyXG4gICAgICB0aGlzLl9jdXJyZW50VmFsdWUgPSBkYXRhO1xyXG4gICAgICB0aGlzLl9kZWZhdWx0VGV4dFZhbHVlID0gdHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnID8gZGF0YSA6IGRhdGFbdGhpcy5sYWJlbE5hbWVdO1xyXG4gICAgICB0aGlzLiRpbnB1dC52YWwodGhpcy5fZGVmYXVsdFRleHRWYWx1ZSk7XHJcbiAgICAgIHRoaXMuJGlucHV0WzBdLmRlZmF1bHRWYWx1ZSA9IHRoaXMuX2RlZmF1bHRUZXh0VmFsdWU7XHJcbiAgICAgIHRoaXMuJGlucHV0LnNlbGVjdCgpO1xyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG4gIHNhdmUoKSB7XHJcbiAgICBjb25zdCB2YWxpZGF0aW9uID0gdGhpcy52YWxpZGF0ZSgpO1xyXG4gICAgaWYgKHZhbGlkYXRpb24gJiYgdmFsaWRhdGlvbi52YWxpZCkge1xyXG4gICAgICBpZiAodGhpcy5oYXNBdXRvQ29tbWl0RWRpdCkge1xyXG4gICAgICAgIHRoaXMuYXJncy5ncmlkLmdldEVkaXRvckxvY2soKS5jb21taXRDdXJyZW50RWRpdCgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuYXJncy5jb21taXRDaGFuZ2VzKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNlcmlhbGl6ZVZhbHVlKCkge1xyXG4gICAgLy8gaWYgdXNlciBwcm92aWRlZCBhIGN1c3RvbSBzdHJ1Y3R1cmUsIHdlIHdpbGwgc2VyaWFsaXplIHRoZSB2YWx1ZSByZXR1cm5lZCBmcm9tIHRoZSBvYmplY3Qgd2l0aCBjdXN0b20gc3RydWN0dXJlXHJcbiAgICBjb25zdCBtaW5MZW5ndGggPSB0eXBlb2YgdGhpcy5lZGl0b3JPcHRpb25zLm1pbkxlbmd0aCAhPT0gJ3VuZGVmaW5lZCcgPyB0aGlzLmVkaXRvck9wdGlvbnMubWluTGVuZ3RoIDogMztcclxuICAgIGlmICh0aGlzLmVkaXRvck9wdGlvbnMuZm9yY2VVc2VySW5wdXQpIHtcclxuICAgICAgdGhpcy5fY3VycmVudFZhbHVlID0gdGhpcy4kaW5wdXQudmFsKCkubGVuZ3RoID49IG1pbkxlbmd0aCA/IHRoaXMuJGlucHV0LnZhbCgpIDogdGhpcy5fY3VycmVudFZhbHVlO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuY3VzdG9tU3RydWN0dXJlICYmIHRoaXMuX2N1cnJlbnRWYWx1ZS5oYXNPd25Qcm9wZXJ0eSh0aGlzLmxhYmVsTmFtZSkpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRWYWx1ZVt0aGlzLmxhYmVsTmFtZV07XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuX2N1cnJlbnRWYWx1ZS5sYWJlbCkge1xyXG4gICAgICBpZiAodGhpcy5jb2x1bW5EZWYudHlwZSA9PT0gRmllbGRUeXBlLm9iamVjdCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICBbdGhpcy5sYWJlbE5hbWVdOiB0aGlzLl9jdXJyZW50VmFsdWUubGFiZWwsXHJcbiAgICAgICAgICBbdGhpcy52YWx1ZU5hbWVdOiB0aGlzLl9jdXJyZW50VmFsdWUudmFsdWVcclxuICAgICAgICB9O1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB0aGlzLl9jdXJyZW50VmFsdWUubGFiZWw7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudFZhbHVlO1xyXG4gIH1cclxuXHJcbiAgYXBwbHlWYWx1ZShpdGVtOiBhbnksIHN0YXRlOiBhbnkpIHtcclxuICAgIGxldCBuZXdWYWx1ZSA9IHN0YXRlO1xyXG4gICAgY29uc3QgZmllbGROYW1lID0gdGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYuZmllbGQ7XHJcblxyXG4gICAgLy8gaWYgd2UgaGF2ZSBhIGNvbGxlY3Rpb24gZGVmaW5lZCwgd2Ugd2lsbCB0cnkgdG8gZmluZCB0aGUgc3RyaW5nIHdpdGhpbiB0aGUgY29sbGVjdGlvbiBhbmQgcmV0dXJuIGl0XHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh0aGlzLmNvbGxlY3Rpb24pICYmIHRoaXMuY29sbGVjdGlvbi5sZW5ndGggPiAwKSB7XHJcbiAgICAgIG5ld1ZhbHVlID0gZmluZE9yRGVmYXVsdCh0aGlzLmNvbGxlY3Rpb24sIChjb2xsZWN0aW9uSXRlbTogYW55KSA9PiB7XHJcbiAgICAgICAgaWYgKGNvbGxlY3Rpb25JdGVtICYmIGNvbGxlY3Rpb25JdGVtLmhhc093blByb3BlcnR5KHRoaXMubGFiZWxOYW1lKSkge1xyXG4gICAgICAgICAgcmV0dXJuIGNvbGxlY3Rpb25JdGVtW3RoaXMubGFiZWxOYW1lXS50b1N0cmluZygpID09PSBzdGF0ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNvbGxlY3Rpb25JdGVtLnRvU3RyaW5nKCkgPT09IHN0YXRlO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyB3aGVuIGl0J3MgYSBjb21wbGV4IG9iamVjdCwgdGhlbiBwdWxsIHRoZSBvYmplY3QgbmFtZSBvbmx5LCBlLmcuOiBcInVzZXIuZmlyc3ROYW1lXCIgPT4gXCJ1c2VyXCJcclxuICAgIGNvbnN0IGZpZWxkTmFtZUZyb21Db21wbGV4T2JqZWN0ID0gZmllbGROYW1lLmluZGV4T2YoJy4nKSA/IGZpZWxkTmFtZS5zdWJzdHJpbmcoMCwgZmllbGROYW1lLmluZGV4T2YoJy4nKSkgOiAnJztcclxuICAgIGNvbnN0IHZhbGlkYXRpb24gPSB0aGlzLnZhbGlkYXRlKG5ld1ZhbHVlKTtcclxuICAgIGl0ZW1bZmllbGROYW1lRnJvbUNvbXBsZXhPYmplY3QgfHwgZmllbGROYW1lXSA9ICh2YWxpZGF0aW9uICYmIHZhbGlkYXRpb24udmFsaWQpID8gbmV3VmFsdWUgOiAnJztcclxuICB9XHJcblxyXG4gIGlzVmFsdWVDaGFuZ2VkKCkge1xyXG4gICAgY29uc3QgbGFzdEV2ZW50ID0gdGhpcy5fbGFzdElucHV0RXZlbnQgJiYgdGhpcy5fbGFzdElucHV0RXZlbnQua2V5Q29kZTtcclxuICAgIGlmICh0aGlzLmNvbHVtbkVkaXRvciAmJiB0aGlzLmNvbHVtbkVkaXRvci5hbHdheXNTYXZlT25FbnRlcktleSAmJiBsYXN0RXZlbnQgPT09IEtleUNvZGUuRU5URVIpIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gKCEodGhpcy4kaW5wdXQudmFsKCkgPT09ICcnICYmIHRoaXMuX2RlZmF1bHRUZXh0VmFsdWUgPT09IG51bGwpKSAmJiAodGhpcy4kaW5wdXQudmFsKCkgIT09IHRoaXMuX2RlZmF1bHRUZXh0VmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgdmFsaWRhdGUoaW5wdXRWYWx1ZT86IGFueSk6IEVkaXRvclZhbGlkYXRvck91dHB1dCB7XHJcbiAgICBjb25zdCBpc1JlcXVpcmVkID0gdGhpcy5jb2x1bW5FZGl0b3IucmVxdWlyZWQ7XHJcbiAgICBjb25zdCBlbG1WYWx1ZSA9IChpbnB1dFZhbHVlICE9PSB1bmRlZmluZWQpID8gaW5wdXRWYWx1ZSA6IHRoaXMuJGlucHV0ICYmIHRoaXMuJGlucHV0LnZhbCAmJiB0aGlzLiRpbnB1dC52YWwoKTtcclxuICAgIGNvbnN0IGVycm9yTXNnID0gdGhpcy5jb2x1bW5FZGl0b3IuZXJyb3JNZXNzYWdlO1xyXG5cclxuICAgIGlmICh0aGlzLnZhbGlkYXRvcikge1xyXG4gICAgICByZXR1cm4gdGhpcy52YWxpZGF0b3IoZWxtVmFsdWUsIHRoaXMuYXJncyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gYnkgZGVmYXVsdCB0aGUgZWRpdG9yIGlzIGFsbW9zdCBhbHdheXMgdmFsaWQgKGV4Y2VwdCB3aGVuIGl0J3MgcmVxdWlyZWQgYnV0IG5vdCBwcm92aWRlZClcclxuICAgIGlmIChpc1JlcXVpcmVkICYmIGVsbVZhbHVlID09PSAnJykge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHZhbGlkOiBmYWxzZSxcclxuICAgICAgICBtc2c6IGVycm9yTXNnIHx8IENvbnN0YW50cy5WQUxJREFUSU9OX1JFUVVJUkVEX0ZJRUxEXHJcbiAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdmFsaWQ6IHRydWUsXHJcbiAgICAgIG1zZzogbnVsbFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8vXHJcbiAgLy8gcHJpdmF0ZSBmdW5jdGlvbnNcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgcHJpdmF0ZSBvbkNsb3NlKGV2ZW50OiBFdmVudCwgdWk6IGFueSkge1xyXG4gICAgaWYgKHVpICYmIHVpLml0ZW0pIHtcclxuICAgICAgdGhpcy5fY3VycmVudFZhbHVlID0gdWkgJiYgdWkuaXRlbTtcclxuICAgICAgY29uc3QgaXRlbUxhYmVsID0gdHlwZW9mIHVpLml0ZW0gPT09ICdzdHJpbmcnID8gdWkuaXRlbSA6IHVpLml0ZW0ubGFiZWw7XHJcbiAgICAgIHRoaXMuc2V0VmFsdWUoaXRlbUxhYmVsKTtcclxuXHJcbiAgICAgIGlmICh0aGlzLmFyZ3MuZ3JpZC5nZXRPcHRpb25zKCkuYXV0b0NvbW1pdEVkaXQpIHtcclxuICAgICAgICAvLyBkbyBub3QgdXNlIGFyZ3MuY29tbWl0Q2hhbmdlcygpIGFzIHRoaXMgc2V0cyB0aGUgZm9jdXMgdG8gdGhlIG5leHQgcm93LlxyXG4gICAgICAgIGNvbnN0IHZhbGlkYXRpb24gPSB0aGlzLnZhbGlkYXRlKCk7XHJcbiAgICAgICAgaWYgKHZhbGlkYXRpb24gJiYgdmFsaWRhdGlvbi52YWxpZCkge1xyXG4gICAgICAgICAgdGhpcy5hcmdzLmdyaWQuZ2V0RWRpdG9yTG9jaygpLmNvbW1pdEN1cnJlbnRFZGl0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG59XHJcbiJdfQ==