import { Constants } from '../constants';
import { KeyCode } from './../models/index';
var defaultDecimalPlaces = 0;
/*
 * An example of a 'detached' editor.
 * KeyDown events are also handled to provide handling for Tab, Shift-Tab, Esc and Ctrl-Enter.
 */
var FloatEditor = /** @class */ (function () {
    function FloatEditor(args) {
        this.args = args;
        this.init();
    }
    Object.defineProperty(FloatEditor.prototype, "columnDef", {
        /** Get Column Definition object */
        get: function () {
            return this.args && this.args.column || {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FloatEditor.prototype, "columnEditor", {
        /** Get Column Editor object */
        get: function () {
            return this.columnDef && this.columnDef.internalColumnEditor || {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FloatEditor.prototype, "hasAutoCommitEdit", {
        get: function () {
            return this.args && this.args.grid && this.args.grid.getOptions && this.args.grid.getOptions().autoCommitEdit;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FloatEditor.prototype, "validator", {
        /** Get the Validator function, can be passed in Editor property or Column Definition */
        get: function () {
            return this.columnEditor.validator || this.columnDef.validator;
        },
        enumerable: true,
        configurable: true
    });
    FloatEditor.prototype.init = function () {
        var _this = this;
        var columnId = this.columnDef && this.columnDef.id;
        var placeholder = this.columnEditor && this.columnEditor.placeholder || '';
        var title = this.columnEditor && this.columnEditor.title || '';
        this.$input = $("<input type=\"number\" role=\"presentation\"  autocomplete=\"off\" class=\"editor-text editor-" + columnId + "\" placeholder=\"" + placeholder + "\" title=\"" + title + "\" step=\"" + this.getInputDecimalSteps() + "\" />")
            .appendTo(this.args.container)
            .on('keydown.nav', function (event) {
            _this._lastInputEvent = event;
            if (event.keyCode === KeyCode.LEFT || event.keyCode === KeyCode.RIGHT) {
                event.stopImmediatePropagation();
            }
        });
        // the lib does not get the focus out event for some reason
        // so register it here
        if (this.hasAutoCommitEdit) {
            this.$input.on('focusout', function () { return _this.save(); });
        }
        setTimeout(function () {
            _this.$input.focus().select();
        }, 50);
    };
    FloatEditor.prototype.destroy = function () {
        this.$input.off('keydown.nav focusout').remove();
    };
    FloatEditor.prototype.focus = function () {
        this.$input.focus();
    };
    FloatEditor.prototype.getColumnEditor = function () {
        return this.args && this.args.column && this.args.column.internalColumnEditor;
    };
    FloatEditor.prototype.getDecimalPlaces = function () {
        // returns the number of fixed decimal places or null
        var rtn = (this.columnEditor.params && this.columnEditor.params.hasOwnProperty('decimalPlaces')) ? this.columnEditor.params.decimalPlaces : undefined;
        if (rtn === undefined) {
            rtn = defaultDecimalPlaces;
        }
        return (!rtn && rtn !== 0 ? null : rtn);
    };
    FloatEditor.prototype.getInputDecimalSteps = function () {
        var decimals = this.getDecimalPlaces();
        var zeroString = '';
        for (var i = 1; i < decimals; i++) {
            zeroString += '0';
        }
        if (decimals > 0) {
            return "0." + zeroString + "1";
        }
        return '1';
    };
    FloatEditor.prototype.loadValue = function (item) {
        var fieldName = this.columnDef && this.columnDef.field;
        // when it's a complex object, then pull the object name only, e.g.: "user.firstName" => "user"
        var fieldNameFromComplexObject = fieldName.indexOf('.') ? fieldName.substring(0, fieldName.indexOf('.')) : '';
        if (item && this.columnDef && (item.hasOwnProperty(fieldName) || item.hasOwnProperty(fieldNameFromComplexObject))) {
            this.defaultValue = item[fieldNameFromComplexObject || fieldName];
            var decPlaces = this.getDecimalPlaces();
            if (decPlaces !== null
                && (this.defaultValue || this.defaultValue === 0)
                && this.defaultValue.toFixed) {
                this.defaultValue = this.defaultValue.toFixed(decPlaces);
            }
            this.$input.val(this.defaultValue);
            this.$input[0].defaultValue = this.defaultValue;
            this.$input.select();
        }
    };
    FloatEditor.prototype.serializeValue = function () {
        var elmValue = this.$input.val();
        if (elmValue === '' || isNaN(elmValue)) {
            return elmValue;
        }
        var rtn = parseFloat(elmValue);
        var decPlaces = this.getDecimalPlaces();
        if (decPlaces !== null
            && (rtn || rtn === 0)
            && rtn.toFixed) {
            rtn = parseFloat(rtn.toFixed(decPlaces));
        }
        return rtn;
    };
    FloatEditor.prototype.applyValue = function (item, state) {
        var fieldName = this.columnDef && this.columnDef.field;
        // when it's a complex object, then pull the object name only, e.g.: "user.firstName" => "user"
        var fieldNameFromComplexObject = fieldName.indexOf('.') ? fieldName.substring(0, fieldName.indexOf('.')) : '';
        var validation = this.validate(state);
        item[fieldNameFromComplexObject || fieldName] = (validation && validation.valid) ? state : '';
    };
    FloatEditor.prototype.isValueChanged = function () {
        var elmValue = this.$input.val();
        var lastEvent = this._lastInputEvent && this._lastInputEvent.keyCode;
        if (this.columnEditor && this.columnEditor.alwaysSaveOnEnterKey && lastEvent === KeyCode.ENTER) {
            return true;
        }
        return (!(elmValue === '' && this.defaultValue === null)) && (elmValue !== this.defaultValue);
    };
    FloatEditor.prototype.save = function () {
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
    FloatEditor.prototype.validate = function (inputValue) {
        var elmValue = (inputValue !== undefined) ? inputValue : this.$input && this.$input.val && this.$input.val();
        var floatNumber = !isNaN(elmValue) ? parseFloat(elmValue) : null;
        var decPlaces = this.getDecimalPlaces();
        var isRequired = this.columnEditor.required;
        var minValue = this.columnEditor.minValue;
        var maxValue = this.columnEditor.maxValue;
        var errorMsg = this.columnEditor.errorMessage;
        var mapValidation = {
            '{{minValue}}': minValue,
            '{{maxValue}}': maxValue,
            '{{minDecimal}}': 0,
            '{{maxDecimal}}': decPlaces
        };
        var isValid = true;
        var outputMsg = '';
        if (this.validator) {
            return this.validator(elmValue, this.args);
        }
        else if (isRequired && elmValue === '') {
            isValid = false;
            outputMsg = errorMsg || Constants.VALIDATION_REQUIRED_FIELD;
        }
        else if (isNaN(elmValue) || (decPlaces === 0 && !/^[-+]?(\d+(\.)?(\d)*)$/.test(elmValue))) {
            // when decimal value is 0 (which is the default), we accept 0 or more decimal values
            isValid = false;
            outputMsg = errorMsg || Constants.VALIDATION_EDITOR_VALID_NUMBER;
        }
        else if (minValue !== undefined && maxValue !== undefined && floatNumber !== null && (floatNumber < minValue || floatNumber > maxValue)) {
            // MIN & MAX Values provided
            // when decimal value is bigger than 0, we only accept the decimal values as that value set
            // for example if we set decimalPlaces to 2, we will only accept numbers between 0 and 2 decimals
            isValid = false;
            outputMsg = errorMsg || Constants.VALIDATION_EDITOR_NUMBER_BETWEEN.replace(/{{minValue}}|{{maxValue}}/gi, function (matched) { return mapValidation[matched]; });
        }
        else if (minValue !== undefined && floatNumber !== null && floatNumber <= minValue) {
            // MIN VALUE ONLY
            // when decimal value is bigger than 0, we only accept the decimal values as that value set
            // for example if we set decimalPlaces to 2, we will only accept numbers between 0 and 2 decimals
            isValid = false;
            outputMsg = errorMsg || Constants.VALIDATION_EDITOR_NUMBER_MIN.replace(/{{minValue}}/gi, function (matched) { return mapValidation[matched]; });
        }
        else if (maxValue !== undefined && floatNumber !== null && floatNumber >= maxValue) {
            // MAX VALUE ONLY
            // when decimal value is bigger than 0, we only accept the decimal values as that value set
            // for example if we set decimalPlaces to 2, we will only accept numbers between 0 and 2 decimals
            isValid = false;
            outputMsg = errorMsg || Constants.VALIDATION_EDITOR_NUMBER_MAX.replace(/{{maxValue}}/gi, function (matched) { return mapValidation[matched]; });
        }
        else if ((decPlaces > 0 && !new RegExp("^(\\d*(\\.)?(\\d){0," + decPlaces + "})$").test(elmValue))) {
            // when decimal value is bigger than 0, we only accept the decimal values as that value set
            // for example if we set decimalPlaces to 2, we will only accept numbers between 0 and 2 decimals
            isValid = false;
            outputMsg = errorMsg || Constants.VALIDATION_EDITOR_DECIMAL_BETWEEN.replace(/{{minDecimal}}|{{maxDecimal}}/gi, function (matched) { return mapValidation[matched]; });
        }
        return {
            valid: isValid,
            msg: outputMsg
        };
    };
    return FloatEditor;
}());
export { FloatEditor };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxvYXRFZGl0b3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL2VkaXRvcnMvZmxvYXRFZGl0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN6QyxPQUFPLEVBQXdFLE9BQU8sRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBS2xILElBQU0sb0JBQW9CLEdBQUcsQ0FBQyxDQUFDO0FBRS9COzs7R0FHRztBQUNIO0lBS0UscUJBQW9CLElBQVM7UUFBVCxTQUFJLEdBQUosSUFBSSxDQUFLO1FBQzNCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNkLENBQUM7SUFHRCxzQkFBSSxrQ0FBUztRQURiLG1DQUFtQzthQUNuQztZQUNFLE9BQU8sSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUM7UUFDN0MsQ0FBQzs7O09BQUE7SUFHRCxzQkFBSSxxQ0FBWTtRQURoQiwrQkFBK0I7YUFDL0I7WUFDRSxPQUFPLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsSUFBSSxFQUFFLENBQUM7UUFDckUsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSwwQ0FBaUI7YUFBckI7WUFDRSxPQUFPLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLGNBQWMsQ0FBQztRQUNoSCxDQUFDOzs7T0FBQTtJQUdELHNCQUFJLGtDQUFTO1FBRGIsd0ZBQXdGO2FBQ3hGO1lBQ0UsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMs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QUM7WUFDaEIsU0FBUyxHQUFHLFFBQVEsSUFBSSxTQUFTLENBQUMsNEJBQTRCLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLFVBQUMsT0FBTyxJQUFLLE9BQUEsYUFBYSxDQUFDLE9BQU8sQ0FBQyxFQUF0QixDQUFzQixDQUFDLENBQUM7U0FDL0g7YUFBTSxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksTUFBTSxDQUFDLHlCQUF1QixTQUFTLFFBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFO1lBQy9GLDJGQUEyRjtZQUMzRixpR0FBaUc7WUFDakcsT0FBTyxHQUFHLEtBQUssQ0FBQztZQUNoQixTQUFTLEdBQUcsUUFBUSxJQUFJLFNBQVMsQ0FBQyxpQ0FBaUMsQ0FBQyxPQUFPLENBQUMsaUNBQWlDLEVBQUUsVUFBQyxPQUFPLElBQUssT0FBQSxhQUFhLENBQUMsT0FBTyxDQUFDLEVBQXRCLENBQXNCLENBQUMsQ0FBQztTQUNySjtRQUVELE9BQU87WUFDTCxLQUFLLEVBQUUsT0FBTztZQUNkLEdBQUcsRUFBRSxTQUFTO1NBQ2YsQ0FBQztJQUNKLENBQUM7SUFDSCxrQkFBQztBQUFELENBQUMsQUFsTkQsSUFrTkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb25zdGFudHMgfSBmcm9tICcuLi9jb25zdGFudHMnO1xyXG5pbXBvcnQgeyBDb2x1bW4sIENvbHVtbkVkaXRvciwgRWRpdG9yLCBFZGl0b3JWYWxpZGF0b3IsIEVkaXRvclZhbGlkYXRvck91dHB1dCwgS2V5Q29kZSB9IGZyb20gJy4vLi4vbW9kZWxzL2luZGV4JztcclxuXHJcbi8vIHVzaW5nIGV4dGVybmFsIG5vbi10eXBlZCBqcyBsaWJyYXJpZXNcclxuZGVjbGFyZSB2YXIgJDogYW55O1xyXG5cclxuY29uc3QgZGVmYXVsdERlY2ltYWxQbGFjZXMgPSAwO1xyXG5cclxuLypcclxuICogQW4gZXhhbXBsZSBvZiBhICdkZXRhY2hlZCcgZWRpdG9yLlxyXG4gKiBLZXlEb3duIGV2ZW50cyBhcmUgYWxzbyBoYW5kbGVkIHRvIHByb3ZpZGUgaGFuZGxpbmcgZm9yIFRhYiwgU2hpZnQtVGFiLCBFc2MgYW5kIEN0cmwtRW50ZXIuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRmxvYXRFZGl0b3IgaW1wbGVtZW50cyBFZGl0b3Ige1xyXG4gIHByaXZhdGUgX2xhc3RJbnB1dEV2ZW50OiBLZXlib2FyZEV2ZW50O1xyXG4gICRpbnB1dDogYW55O1xyXG4gIGRlZmF1bHRWYWx1ZTogYW55O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFyZ3M6IGFueSkge1xyXG4gICAgdGhpcy5pbml0KCk7XHJcbiAgfVxyXG5cclxuICAvKiogR2V0IENvbHVtbiBEZWZpbml0aW9uIG9iamVjdCAqL1xyXG4gIGdldCBjb2x1bW5EZWYoKTogQ29sdW1uIHtcclxuICAgIHJldHVybiB0aGlzLmFyZ3MgJiYgdGhpcy5hcmdzLmNvbHVtbiB8fCB7fTtcclxuICB9XHJcblxyXG4gIC8qKiBHZXQgQ29sdW1uIEVkaXRvciBvYmplY3QgKi9cclxuICBnZXQgY29sdW1uRWRpdG9yKCk6IENvbHVtbkVkaXRvciB7XHJcbiAgICByZXR1cm4gdGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYuaW50ZXJuYWxDb2x1bW5FZGl0b3IgfHwge307XHJcbiAgfVxyXG5cclxuICBnZXQgaGFzQXV0b0NvbW1pdEVkaXQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5hcmdzICYmIHRoaXMuYXJncy5ncmlkICYmIHRoaXMuYXJncy5ncmlkLmdldE9wdGlvbnMgJiYgdGhpcy5hcmdzLmdyaWQuZ2V0T3B0aW9ucygpLmF1dG9Db21taXRFZGl0O1xyXG4gIH1cclxuXHJcbiAgLyoqIEdldCB0aGUgVmFsaWRhdG9yIGZ1bmN0aW9uLCBjYW4gYmUgcGFzc2VkIGluIEVkaXRvciBwcm9wZXJ0eSBvciBDb2x1bW4gRGVmaW5pdGlvbiAqL1xyXG4gIGdldCB2YWxpZGF0b3IoKTogRWRpdG9yVmFsaWRhdG9yIHtcclxuICAgIHJldHVybiB0aGlzLmNvbHVtbkVkaXRvci52YWxpZGF0b3IgfHwgdGhpcy5jb2x1bW5EZWYudmFsaWRhdG9yO1xyXG4gIH1cclxuXHJcbiAgaW5pdCgpOiB2b2lkIHtcclxuICAgIGNvbnN0IGNvbHVtbklkID0gdGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYuaWQ7XHJcbiAgICBjb25zdCBwbGFjZWhvbGRlciA9IHRoaXMuY29sdW1uRWRpdG9yICYmIHRoaXMuY29sdW1uRWRpdG9yLnBsYWNlaG9sZGVyIHx8ICcnO1xyXG4gICAgY29uc3QgdGl0bGUgPSB0aGlzLmNvbHVtbkVkaXRvciAmJiB0aGlzLmNvbHVtbkVkaXRvci50aXRsZSB8fCAnJztcclxuXHJcbiAgICB0aGlzLiRpbnB1dCA9ICQoYDxpbnB1dCB0eXBlPVwibnVtYmVyXCIgcm9sZT1cInByZXNlbnRhdGlvblwiICBhdXRvY29tcGxldGU9XCJvZmZcIiBjbGFzcz1cImVkaXRvci10ZXh0IGVkaXRvci0ke2NvbHVtbklkfVwiIHBsYWNlaG9sZGVyPVwiJHtwbGFjZWhvbGRlcn1cIiB0aXRsZT1cIiR7dGl0bGV9XCIgc3RlcD1cIiR7dGhpcy5nZXRJbnB1dERlY2ltYWxTdGVwcygpfVwiIC8+YClcclxuICAgICAgLmFwcGVuZFRvKHRoaXMuYXJncy5jb250YWluZXIpXHJcbiAgICAgIC5vbigna2V5ZG93bi5uYXYnLCAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpID0+IHtcclxuICAgICAgICB0aGlzLl9sYXN0SW5wdXRFdmVudCA9IGV2ZW50O1xyXG4gICAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSBLZXlDb2RlLkxFRlQgfHwgZXZlbnQua2V5Q29kZSA9PT0gS2V5Q29kZS5SSUdIVCkge1xyXG4gICAgICAgICAgZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAvLyB0aGUgbGliIGRvZXMgbm90IGdldCB0aGUgZm9jdXMgb3V0IGV2ZW50IGZvciBzb21lIHJlYXNvblxyXG4gICAgLy8gc28gcmVnaXN0ZXIgaXQgaGVyZVxyXG4gICAgaWYgKHRoaXMuaGFzQXV0b0NvbW1pdEVkaXQpIHtcclxuICAgICAgdGhpcy4kaW5wdXQub24oJ2ZvY3Vzb3V0JywgKCkgPT4gdGhpcy5zYXZlKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICB0aGlzLiRpbnB1dC5mb2N1cygpLnNlbGVjdCgpO1xyXG4gICAgfSwgNTApO1xyXG4gIH1cclxuXHJcbiAgZGVzdHJveSgpIHtcclxuICAgIHRoaXMuJGlucHV0Lm9mZigna2V5ZG93bi5uYXYgZm9jdXNvdXQnKS5yZW1vdmUoKTtcclxuICB9XHJcblxyXG4gIGZvY3VzKCkge1xyXG4gICAgdGhpcy4kaW5wdXQuZm9jdXMoKTtcclxuICB9XHJcblxyXG4gIGdldENvbHVtbkVkaXRvcigpIHtcclxuICAgIHJldHVybiB0aGlzLmFyZ3MgJiYgdGhpcy5hcmdzLmNvbHVtbiAmJiB0aGlzLmFyZ3MuY29sdW1uLmludGVybmFsQ29sdW1uRWRpdG9yO1xyXG4gIH1cclxuXHJcbiAgZ2V0RGVjaW1hbFBsYWNlcygpOiBudW1iZXIge1xyXG4gICAgLy8gcmV0dXJucyB0aGUgbnVtYmVyIG9mIGZpeGVkIGRlY2ltYWwgcGxhY2VzIG9yIG51bGxcclxuICAgIGxldCBydG4gPSAodGhpcy5jb2x1bW5FZGl0b3IucGFyYW1zICYmIHRoaXMuY29sdW1uRWRpdG9yLnBhcmFtcy5oYXNPd25Qcm9wZXJ0eSgnZGVjaW1hbFBsYWNlcycpKSA/IHRoaXMuY29sdW1uRWRpdG9yLnBhcmFtcy5kZWNpbWFsUGxhY2VzIDogdW5kZWZpbmVkO1xyXG5cclxuICAgIGlmIChydG4gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBydG4gPSBkZWZhdWx0RGVjaW1hbFBsYWNlcztcclxuICAgIH1cclxuICAgIHJldHVybiAoIXJ0biAmJiBydG4gIT09IDAgPyBudWxsIDogcnRuKTtcclxuICB9XHJcblxyXG4gIGdldElucHV0RGVjaW1hbFN0ZXBzKCk6IHN0cmluZyB7XHJcbiAgICBjb25zdCBkZWNpbWFscyA9IHRoaXMuZ2V0RGVjaW1hbFBsYWNlcygpO1xyXG4gICAgbGV0IHplcm9TdHJpbmcgPSAnJztcclxuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgZGVjaW1hbHM7IGkrKykge1xyXG4gICAgICB6ZXJvU3RyaW5nICs9ICcwJztcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZGVjaW1hbHMgPiAwKSB7XHJcbiAgICAgIHJldHVybiBgMC4ke3plcm9TdHJpbmd9MWA7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gJzEnO1xyXG4gIH1cclxuXHJcbiAgbG9hZFZhbHVlKGl0ZW06IGFueSkge1xyXG4gICAgY29uc3QgZmllbGROYW1lID0gdGhpcy5jb2x1bW5EZWYgJiYgdGhpcy5jb2x1bW5EZWYuZmllbGQ7XHJcblxyXG4gICAgLy8gd2hlbiBpdCdzIGEgY29tcGxleCBvYmplY3QsIHRoZW4gcHVsbCB0aGUgb2JqZWN0IG5hbWUgb25seSwgZS5nLjogXCJ1c2VyLmZpcnN0TmFtZVwiID0+IFwidXNlclwiXHJcbiAgICBjb25zdCBmaWVsZE5hbWVGcm9tQ29tcGxleE9iamVjdCA9IGZpZWxkTmFtZS5pbmRleE9mKCcuJykgPyBmaWVsZE5hbWUuc3Vic3RyaW5nKDAsIGZpZWxkTmFtZS5pbmRleE9mKCcuJykpIDogJyc7XHJcblxyXG4gICAgaWYgKGl0ZW0gJiYgdGhpcy5jb2x1bW5EZWYgJiYgKGl0ZW0uaGFzT3duUHJvcGVydHkoZmllbGROYW1lKSB8fCBpdGVtLmhhc093blByb3BlcnR5KGZpZWxkTmFtZUZyb21Db21wbGV4T2JqZWN0KSkpIHtcclxuICAgICAgdGhpcy5kZWZhdWx0VmFsdWUgPSBpdGVtW2ZpZWxkTmFtZUZyb21Db21wbGV4T2JqZWN0IHx8IGZpZWxkTmFtZV07XHJcbiAgICAgIGNvbnN0IGRlY1BsYWNlcyA9IHRoaXMuZ2V0RGVjaW1hbFBsYWNlcygpO1xyXG4gICAgICBpZiAoZGVjUGxhY2VzICE9PSBudWxsXHJcbiAgICAgICAgJiYgKHRoaXMuZGVmYXVsdFZhbHVlIHx8IHRoaXMuZGVmYXVsdFZhbHVlID09PSAwKVxyXG4gICAgICAgICYmIHRoaXMuZGVmYXVsdFZhbHVlLnRvRml4ZWQpIHtcclxuICAgICAgICB0aGlzLmRlZmF1bHRWYWx1ZSA9IHRoaXMuZGVmYXVsdFZhbHVlLnRvRml4ZWQoZGVjUGxhY2VzKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy4kaW5wdXQudmFsKHRoaXMuZGVmYXVsdFZhbHVlKTtcclxuICAgICAgdGhpcy4kaW5wdXRbMF0uZGVmYXVsdFZhbHVlID0gdGhpcy5kZWZhdWx0VmFsdWU7XHJcbiAgICAgIHRoaXMuJGlucHV0LnNlbGVjdCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2VyaWFsaXplVmFsdWUoKSB7XHJcbiAgICBjb25zdCBlbG1WYWx1ZSA9IHRoaXMuJGlucHV0LnZhbCgpO1xyXG4gICAgaWYgKGVsbVZhbHVlID09PSAnJyB8fCBpc05hTihlbG1WYWx1ZSkpIHtcclxuICAgICAgcmV0dXJuIGVsbVZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBydG4gPSBwYXJzZUZsb2F0KGVsbVZhbHVlKTtcclxuICAgIGNvbnN0IGRlY1BsYWNlcyA9IHRoaXMuZ2V0RGVjaW1hbFBsYWNlcygpO1xyXG4gICAgaWYgKGRlY1BsYWNlcyAhPT0gbnVsbFxyXG4gICAgICAmJiAocnRuIHx8IHJ0biA9PT0gMClcclxuICAgICAgJiYgcnRuLnRvRml4ZWQpIHtcclxuICAgICAgcnRuID0gcGFyc2VGbG9hdChydG4udG9GaXhlZChkZWNQbGFjZXMpKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcnRuO1xyXG4gIH1cclxuXHJcbiAgYXBwbHlWYWx1ZShpdGVtOiBhbnksIHN0YXRlOiBhbnkpIHtcclxuICAgIGNvbnN0IGZpZWxkTmFtZSA9IHRoaXMuY29sdW1uRGVmICYmIHRoaXMuY29sdW1uRGVmLmZpZWxkO1xyXG4gICAgLy8gd2hlbiBpdCdzIGEgY29tcGxleCBvYmplY3QsIHRoZW4gcHVsbCB0aGUgb2JqZWN0IG5hbWUgb25seSwgZS5nLjogXCJ1c2VyLmZpcnN0TmFtZVwiID0+IFwidXNlclwiXHJcbiAgICBjb25zdCBmaWVsZE5hbWVGcm9tQ29tcGxleE9iamVjdCA9IGZpZWxkTmFtZS5pbmRleE9mKCcuJykgPyBmaWVsZE5hbWUuc3Vic3RyaW5nKDAsIGZpZWxkTmFtZS5pbmRleE9mKCcuJykpIDogJyc7XHJcbiAgICBjb25zdCB2YWxpZGF0aW9uID0gdGhpcy52YWxpZGF0ZShzdGF0ZSk7XHJcbiAgICBpdGVtW2ZpZWxkTmFtZUZyb21Db21wbGV4T2JqZWN0IHx8IGZpZWxkTmFtZV0gPSAodmFsaWRhdGlvbiAmJiB2YWxpZGF0aW9uLnZhbGlkKSA/IHN0YXRlIDogJyc7XHJcbiAgfVxyXG5cclxuICBpc1ZhbHVlQ2hhbmdlZCgpIHtcclxuICAgIGNvbnN0IGVsbVZhbHVlID0gdGhpcy4kaW5wdXQudmFsKCk7XHJcbiAgICBjb25zdCBsYXN0RXZlbnQgPSB0aGlzLl9sYXN0SW5wdXRFdmVudCAmJiB0aGlzLl9sYXN0SW5wdXRFdmVudC5rZXlDb2RlO1xyXG4gICAgaWYgKHRoaXMuY29sdW1uRWRpdG9yICYmIHRoaXMuY29sdW1uRWRpdG9yLmFsd2F5c1NhdmVPbkVudGVyS2V5ICYmIGxhc3RFdmVudCA9PT0gS2V5Q29kZS5FTlRFUikge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiAoIShlbG1WYWx1ZSA9PT0gJycgJiYgdGhpcy5kZWZhdWx0VmFsdWUgPT09IG51bGwpKSAmJiAoZWxtVmFsdWUgIT09IHRoaXMuZGVmYXVsdFZhbHVlKTtcclxuICB9XHJcblxyXG4gIHNhdmUoKSB7XHJcbiAgICBjb25zdCB2YWxpZGF0aW9uID0gdGhpcy52YWxpZGF0ZSgpO1xyXG4gICAgaWYgKHZhbGlkYXRpb24gJiYgdmFsaWRhdGlvbi52YWxpZCkge1xyXG4gICAgICBpZiAodGhpcy5oYXNBdXRvQ29tbWl0RWRpdCkge1xyXG4gICAgICAgIHRoaXMuYXJncy5ncmlkLmdldEVkaXRvckxvY2soKS5jb21taXRDdXJyZW50RWRpdCgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuYXJncy5jb21taXRDaGFuZ2VzKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHZhbGlkYXRlKGlucHV0VmFsdWU/OiBhbnkpOiBFZGl0b3JWYWxpZGF0b3JPdXRwdXQge1xyXG4gICAgY29uc3QgZWxtVmFsdWUgPSAoaW5wdXRWYWx1ZSAhPT0gdW5kZWZpbmVkKSA/IGlucHV0VmFsdWUgOiB0aGlzLiRpbnB1dCAmJiB0aGlzLiRpbnB1dC52YWwgJiYgdGhpcy4kaW5wdXQudmFsKCk7XHJcbiAgICBjb25zdCBmbG9hdE51bWJlciA9ICFpc05hTihlbG1WYWx1ZSBhcyBudW1iZXIpID8gcGFyc2VGbG9hdChlbG1WYWx1ZSkgOiBudWxsO1xyXG4gICAgY29uc3QgZGVjUGxhY2VzID0gdGhpcy5nZXREZWNpbWFsUGxhY2VzKCk7XHJcbiAgICBjb25zdCBpc1JlcXVpcmVkID0gdGhpcy5jb2x1bW5FZGl0b3IucmVxdWlyZWQ7XHJcbiAgICBjb25zdCBtaW5WYWx1ZSA9IHRoaXMuY29sdW1uRWRpdG9yLm1pblZhbHVlO1xyXG4gICAgY29uc3QgbWF4VmFsdWUgPSB0aGlzLmNvbHVtbkVkaXRvci5tYXhWYWx1ZTtcclxuICAgIGNvbnN0IGVycm9yTXNnID0gdGhpcy5jb2x1bW5FZGl0b3IuZXJyb3JNZXNzYWdlO1xyXG4gICAgY29uc3QgbWFwVmFsaWRhdGlvbiA9IHtcclxuICAgICAgJ3t7bWluVmFsdWV9fSc6IG1pblZhbHVlLFxyXG4gICAgICAne3ttYXhWYWx1ZX19JzogbWF4VmFsdWUsXHJcbiAgICAgICd7e21pbkRlY2ltYWx9fSc6IDAsXHJcbiAgICAgICd7e21heERlY2ltYWx9fSc6IGRlY1BsYWNlc1xyXG4gICAgfTtcclxuICAgIGxldCBpc1ZhbGlkID0gdHJ1ZTtcclxuICAgIGxldCBvdXRwdXRNc2cgPSAnJztcclxuXHJcbiAgICBpZiAodGhpcy52YWxpZGF0b3IpIHtcclxuICAgICAgcmV0dXJuIHRoaXMudmFsaWRhdG9yKGVsbVZhbHVlLCB0aGlzLmFyZ3MpO1xyXG4gICAgfSBlbHNlIGlmIChpc1JlcXVpcmVkICYmIGVsbVZhbHVlID09PSAnJykge1xyXG4gICAgICBpc1ZhbGlkID0gZmFsc2U7XHJcbiAgICAgIG91dHB1dE1zZyA9IGVycm9yTXNnIHx8IENvbnN0YW50cy5WQUxJREFUSU9OX1JFUVVJUkVEX0ZJRUxEO1xyXG4gICAgfSBlbHNlIGlmIChpc05hTihlbG1WYWx1ZSBhcyBudW1iZXIpIHx8IChkZWNQbGFjZXMgPT09IDAgJiYgIS9eWy0rXT8oXFxkKyhcXC4pPyhcXGQpKikkLy50ZXN0KGVsbVZhbHVlKSkpIHtcclxuICAgICAgLy8gd2hlbiBkZWNpbWFsIHZhbHVlIGlzIDAgKHdoaWNoIGlzIHRoZSBkZWZhdWx0KSwgd2UgYWNjZXB0IDAgb3IgbW9yZSBkZWNpbWFsIHZhbHVlc1xyXG4gICAgICBpc1ZhbGlkID0gZmFsc2U7XHJcbiAgICAgIG91dHB1dE1zZyA9IGVycm9yTXNnIHx8IENvbnN0YW50cy5WQUxJREFUSU9OX0VESVRPUl9WQUxJRF9OVU1CRVI7XHJcbiAgICB9IGVsc2UgaWYgKG1pblZhbHVlICE9PSB1bmRlZmluZWQgJiYgbWF4VmFsdWUgIT09IHVuZGVmaW5lZCAmJiBmbG9hdE51bWJlciAhPT0gbnVsbCAmJiAoZmxvYXROdW1iZXIgPCBtaW5WYWx1ZSB8fCBmbG9hdE51bWJlciA+IG1heFZhbHVlKSkge1xyXG4gICAgICAvLyBNSU4gJiBNQVggVmFsdWVzIHByb3ZpZGVkXHJcbiAgICAgIC8vIHdoZW4gZGVjaW1hbCB2YWx1ZSBpcyBiaWdnZXIgdGhhbiAwLCB3ZSBvbmx5IGFjY2VwdCB0aGUgZGVjaW1hbCB2YWx1ZXMgYXMgdGhhdCB2YWx1ZSBzZXRcclxuICAgICAgLy8gZm9yIGV4YW1wbGUgaWYgd2Ugc2V0IGRlY2ltYWxQbGFjZXMgdG8gMiwgd2Ugd2lsbCBvbmx5IGFjY2VwdCBudW1iZXJzIGJldHdlZW4gMCBhbmQgMiBkZWNpbWFsc1xyXG4gICAgICBpc1ZhbGlkID0gZmFsc2U7XHJcbiAgICAgIG91dHB1dE1zZyA9IGVycm9yTXNnIHx8IENvbnN0YW50cy5WQUxJREFUSU9OX0VESVRPUl9OVU1CRVJfQkVUV0VFTi5yZXBsYWNlKC97e21pblZhbHVlfX18e3ttYXhWYWx1ZX19L2dpLCAobWF0Y2hlZCkgPT4gbWFwVmFsaWRhdGlvblttYXRjaGVkXSk7XHJcbiAgICB9IGVsc2UgaWYgKG1pblZhbHVlICE9PSB1bmRlZmluZWQgJiYgZmxvYXROdW1iZXIgIT09IG51bGwgJiYgZmxvYXROdW1iZXIgPD0gbWluVmFsdWUpIHtcclxuICAgICAgLy8gTUlOIFZBTFVFIE9OTFlcclxuICAgICAgLy8gd2hlbiBkZWNpbWFsIHZhbHVlIGlzIGJpZ2dlciB0aGFuIDAsIHdlIG9ubHkgYWNjZXB0IHRoZSBkZWNpbWFsIHZhbHVlcyBhcyB0aGF0IHZhbHVlIHNldFxyXG4gICAgICAvLyBmb3IgZXhhbXBsZSBpZiB3ZSBzZXQgZGVjaW1hbFBsYWNlcyB0byAyLCB3ZSB3aWxsIG9ubHkgYWNjZXB0IG51bWJlcnMgYmV0d2VlbiAwIGFuZCAyIGRlY2ltYWxzXHJcbiAgICAgIGlzVmFsaWQgPSBmYWxzZTtcclxuICAgICAgb3V0cHV0TXNnID0gZXJyb3JNc2cgfHwgQ29uc3RhbnRzLlZBTElEQVRJT05fRURJVE9SX05VTUJFUl9NSU4ucmVwbGFjZSgve3ttaW5WYWx1ZX19L2dpLCAobWF0Y2hlZCkgPT4gbWFwVmFsaWRhdGlvblttYXRjaGVkXSk7XHJcbiAgICB9IGVsc2UgaWYgKG1heFZhbHVlICE9PSB1bmRlZmluZWQgJiYgZmxvYXROdW1iZXIgIT09IG51bGwgJiYgZmxvYXROdW1iZXIgPj0gbWF4VmFsdWUpIHtcclxuICAgICAgLy8gTUFYIFZBTFVFIE9OTFlcclxuICAgICAgLy8gd2hlbiBkZWNpbWFsIHZhbHVlIGlzIGJpZ2dlciB0aGFuIDAsIHdlIG9ubHkgYWNjZXB0IHRoZSBkZWNpbWFsIHZhbHVlcyBhcyB0aGF0IHZhbHVlIHNldFxyXG4gICAgICAvLyBmb3IgZXhhbXBsZSBpZiB3ZSBzZXQgZGVjaW1hbFBsYWNlcyB0byAyLCB3ZSB3aWxsIG9ubHkgYWNjZXB0IG51bWJlcnMgYmV0d2VlbiAwIGFuZCAyIGRlY2ltYWxzXHJcbiAgICAgIGlzVmFsaWQgPSBmYWxzZTtcclxuICAgICAgb3V0cHV0TXNnID0gZXJyb3JNc2cgfHwgQ29uc3RhbnRzLlZBTElEQVRJT05fRURJVE9SX05VTUJFUl9NQVgucmVwbGFjZSgve3ttYXhWYWx1ZX19L2dpLCAobWF0Y2hlZCkgPT4gbWFwVmFsaWRhdGlvblttYXRjaGVkXSk7XHJcbiAgICB9IGVsc2UgaWYgKChkZWNQbGFjZXMgPiAwICYmICFuZXcgUmVnRXhwKGBeKFxcXFxkKihcXFxcLik/KFxcXFxkKXswLCR7ZGVjUGxhY2VzfX0pJGApLnRlc3QoZWxtVmFsdWUpKSkge1xyXG4gICAgICAvLyB3aGVuIGRlY2ltYWwgdmFsdWUgaXMgYmlnZ2VyIHRoYW4gMCwgd2Ugb25seSBhY2NlcHQgdGhlIGRlY2ltYWwgdmFsdWVzIGFzIHRoYXQgdmFsdWUgc2V0XHJcbiAgICAgIC8vIGZvciBleGFtcGxlIGlmIHdlIHNldCBkZWNpbWFsUGxhY2VzIHRvIDIsIHdlIHdpbGwgb25seSBhY2NlcHQgbnVtYmVycyBiZXR3ZWVuIDAgYW5kIDIgZGVjaW1hbHNcclxuICAgICAgaXNWYWxpZCA9IGZhbHNlO1xyXG4gICAgICBvdXRwdXRNc2cgPSBlcnJvck1zZyB8fCBDb25zdGFudHMuVkFMSURBVElPTl9FRElUT1JfREVDSU1BTF9CRVRXRUVOLnJlcGxhY2UoL3t7bWluRGVjaW1hbH19fHt7bWF4RGVjaW1hbH19L2dpLCAobWF0Y2hlZCkgPT4gbWFwVmFsaWRhdGlvblttYXRjaGVkXSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdmFsaWQ6IGlzVmFsaWQsXHJcbiAgICAgIG1zZzogb3V0cHV0TXNnXHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iXX0=