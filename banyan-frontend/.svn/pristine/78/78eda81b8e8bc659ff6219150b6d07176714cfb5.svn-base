import { Constants } from './../constants';
import { KeyCode } from './../models/index';
/*
 * An example of a 'detached' editor.
 * The UI is added onto document BODY and .position(), .show() and .hide() are implemented.
 * KeyDown events are also handled to provide handling for Tab, Shift-Tab, Esc and Ctrl-Enter.
 */
var LongTextEditor = /** @class */ (function () {
    function LongTextEditor(args) {
        this.args = args;
        this.gridOptions = this.args.grid.getOptions();
        var options = this.gridOptions || this.args.column.params || {};
        this._translate = options.i18n;
        this.init();
    }
    Object.defineProperty(LongTextEditor.prototype, "columnDef", {
        /** Get Column Definition object */
        get: function () {
            return this.args && this.args.column || {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LongTextEditor.prototype, "columnEditor", {
        /** Get Column Editor object */
        get: function () {
            return this.columnDef && this.columnDef.internalColumnEditor && this.columnDef.internalColumnEditor || {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LongTextEditor.prototype, "validator", {
        /** Get the Validator function, can be passed in Editor property or Column Definition */
        get: function () {
            return this.columnEditor.validator || this.columnDef.validator;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LongTextEditor.prototype, "hasAutoCommitEdit", {
        get: function () {
            return this.args.grid.getOptions().autoCommitEdit;
        },
        enumerable: true,
        configurable: true
    });
    LongTextEditor.prototype.init = function () {
        var _this = this;
        var columnId = this.columnDef && this.columnDef.id;
        var placeholder = this.columnEditor && this.columnEditor.placeholder || '';
        var title = this.columnEditor && this.columnEditor.title || '';
        var cancelText = this._translate && this._translate.instant('CANCEL') || Constants.TEXT_CANCEL;
        var saveText = this._translate && this._translate.instant('SAVE') || Constants.TEXT_SAVE;
        var $container = $('body');
        this.$wrapper = $("<div class=\"slick-large-editor-text editor-" + columnId + "\" />").appendTo($container);
        this.$textarea = $("<textarea hidefocus rows=\"5\" placeholder=\"" + placeholder + "\" title=\"" + title + "\">").appendTo(this.$wrapper);
        // the lib does not get the focus out event for some reason
        // so register it here
        if (this.hasAutoCommitEdit) {
            this.$textarea.on('focusout', function () { return _this.save(); });
        }
        $("<div class=\"editor-footer\">\n          <button class=\"btn btn-primary btn-xs\">" + saveText + "</button>\n          <button class=\"btn btn-default btn-xs\">" + cancelText + "</button>\n      </div>").appendTo(this.$wrapper);
        this.$wrapper.find('button:first').on('click', function () { return _this.save(); });
        this.$wrapper.find('button:last').on('click', function () { return _this.cancel(); });
        this.$textarea.on('keydown', this.handleKeyDown.bind(this));
        this.position(this.args && this.args.position);
        this.$textarea.focus().select();
    };
    LongTextEditor.prototype.handleKeyDown = function (event) {
        if (event.which === KeyCode.ENTER && event.ctrlKey) {
            this.save();
        }
        else if (event.which === KeyCode.ESCAPE) {
            event.preventDefault();
            this.cancel();
        }
        else if (event.which === KeyCode.TAB && event.shiftKey) {
            event.preventDefault();
            if (this.args && this.args.grid) {
                this.args.grid.navigatePrev();
            }
        }
        else if (event.which === KeyCode.TAB) {
            event.preventDefault();
            if (this.args && this.args.grid) {
                this.args.grid.navigateNext();
            }
        }
    };
    LongTextEditor.prototype.cancel = function () {
        this.$textarea.val(this.defaultValue);
        if (this.args && this.args.cancelChanges) {
            this.args.cancelChanges();
        }
    };
    LongTextEditor.prototype.hide = function () {
        this.$wrapper.hide();
    };
    LongTextEditor.prototype.show = function () {
        this.$wrapper.show();
    };
    LongTextEditor.prototype.position = function (position) {
        this.$wrapper
            .css('top', (position.top || 0) - 5)
            .css('left', (position.left || 0) - 5);
    };
    LongTextEditor.prototype.destroy = function () {
        this.$wrapper.off('keydown focusout').remove();
    };
    LongTextEditor.prototype.focus = function () {
        this.$textarea.focus();
    };
    LongTextEditor.prototype.getValue = function () {
        return this.$textarea.val();
    };
    LongTextEditor.prototype.setValue = function (val) {
        this.$textarea.val(val);
    };
    LongTextEditor.prototype.getColumnEditor = function () {
        return this.args && this.args.column && this.args.column.internalColumnEditor && this.args.column.internalColumnEditor;
    };
    LongTextEditor.prototype.loadValue = function (item) {
        var fieldName = this.columnDef && this.columnDef.field;
        // when it's a complex object, then pull the object name only, e.g.: "user.firstName" => "user"
        var fieldNameFromComplexObject = fieldName.indexOf('.') ? fieldName.substring(0, fieldName.indexOf('.')) : '';
        if (item && this.columnDef && (item.hasOwnProperty(fieldName) || item.hasOwnProperty(fieldNameFromComplexObject))) {
            this.defaultValue = item[fieldNameFromComplexObject || fieldName];
            this.$textarea.val(this.defaultValue);
            this.$textarea.select();
        }
    };
    LongTextEditor.prototype.serializeValue = function () {
        return this.$textarea.val();
    };
    LongTextEditor.prototype.applyValue = function (item, state) {
        var fieldName = this.columnDef && this.columnDef.field;
        // when it's a complex object, then pull the object name only, e.g.: "user.firstName" => "user"
        var fieldNameFromComplexObject = fieldName.indexOf('.') ? fieldName.substring(0, fieldName.indexOf('.')) : '';
        var validation = this.validate(state);
        item[fieldNameFromComplexObject || fieldName] = (validation && validation.valid) ? state : '';
    };
    LongTextEditor.prototype.isValueChanged = function () {
        return (!(this.$textarea.val() === '' && this.defaultValue === null)) && (this.$textarea.val() !== this.defaultValue);
    };
    LongTextEditor.prototype.save = function () {
        var validation = this.validate();
        if (validation && validation.valid) {
            if (this.hasAutoCommitEdit) {
                this.args.grid.getEditorLock().commitCurrentEdit();
            }
            else {
                this.args.commitChanges();
            }
        }
        else {
            this.args.commitChanges();
        }
    };
    LongTextEditor.prototype.validate = function (inputValue) {
        var isRequired = this.columnEditor.required;
        var elmValue = (inputValue !== undefined) ? inputValue : this.$textarea && this.$textarea.val && this.$textarea.val();
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
    return LongTextEditor;
}());
export { LongTextEditor };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9uZ1RleHRFZGl0b3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL2VkaXRvcnMvbG9uZ1RleHRFZGl0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFRTCxPQUFPLEVBQ1IsTUFBTSxtQkFBbUIsQ0FBQztBQUszQjs7OztHQUlHO0FBQ0g7SUFXRSx3QkFBb0IsSUFBUztRQUFULFNBQUksR0FBSixJQUFJLENBQUs7UUFDM0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQWdCLENBQUM7UUFDN0QsSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDO1FBQ2xFLElBQUksQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztRQUUvQixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDZCxDQUFDO0lBR0Qsc0JBQUkscUNBQVM7UUFEYixtQ0FBbUM7YUFDbkM7WUFDRSxPQUFPLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDO1FBQzdDLENBQUM7OztPQUFBO0lBR0Qsc0JBQUksd0NBQVk7UUFEaEIsK0JBQStCO2FBQy9CO1lBQ0UsT0FBTyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsb0JBQW9CLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsSUFBSSxFQUFFLENBQUM7UUFDNUcsQ0FBQzs7O09BQUE7SUFHRCxzQkFBSSxxQ0FBUztRQURiLHdGQUF3RjthQUN4RjtZQUNFLE9BQU8sSUFBSSxD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QUVELDRGQUE0RjtRQUM1RixJQUFJLFVBQVUsSUFBSSxRQUFRLEtBQUssRUFBRSxFQUFFO1lBQ2pDLE9BQU87Z0JBQ0wsS0FBSyxFQUFFLEtBQUs7Z0JBQ1osR0FBRyxFQUFFLFFBQVEsSUFBSSxTQUFTLENBQUMseUJBQXlCO2FBQ3JELENBQUM7U0FDSDtRQUVELE9BQU87WUFDTCxLQUFLLEVBQUUsSUFBSTtZQUNYLEdBQUcsRUFBRSxJQUFJO1NBQ1YsQ0FBQztJQUNKLENBQUM7SUFDSCxxQkFBQztBQUFELENBQUMsQUFqTUQsSUFpTUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XHJcbmltcG9ydCB7IENvbnN0YW50cyB9IGZyb20gJy4vLi4vY29uc3RhbnRzJztcclxuaW1wb3J0IHtcclxuICBDb2x1bW4sXHJcbiAgQ29sdW1uRWRpdG9yLFxyXG4gIEVkaXRvcixcclxuICBFZGl0b3JWYWxpZGF0b3IsXHJcbiAgRWRpdG9yVmFsaWRhdG9yT3V0cHV0LFxyXG4gIEdyaWRPcHRpb24sXHJcbiAgSHRtbEVsZW1lbnRQb3NpdGlvbixcclxuICBLZXlDb2RlXHJcbn0gZnJvbSAnLi8uLi9tb2RlbHMvaW5kZXgnO1xyXG5cclxuLy8gdXNpbmcgZXh0ZXJuYWwgbm9uLXR5cGVkIGpzIGxpYnJhcmllc1xyXG5kZWNsYXJlIHZhciAkOiBhbnk7XHJcblxyXG4vKlxyXG4gKiBBbiBleGFtcGxlIG9mIGEgJ2RldGFjaGVkJyBlZGl0b3IuXHJcbiAqIFRoZSBVSSBpcyBhZGRlZCBvbnRvIGRvY3VtZW50IEJPRFkgYW5kIC5wb3NpdGlvbigpLCAuc2hvdygpIGFuZCAuaGlkZSgpIGFyZSBpbXBsZW1lbnRlZC5cclxuICogS2V5RG93biBldmVudHMgYXJlIGFsc28gaGFuZGxlZCB0byBwcm92aWRlIGhhbmRsaW5nIGZvciBUYWIsIFNoaWZ0LVRhYiwgRXNjIGFuZCBDdHJsLUVudGVyLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIExvbmdUZXh0RWRpdG9yIGltcGxlbWVudHMgRWRpdG9yIHtcclxuICAkdGV4dGFyZWE6IGFueTtcclxuICAkd3JhcHBlcjogYW55O1xyXG4gIGRlZmF1bHRWYWx1ZTogYW55O1xyXG5cclxuICAvKiogR3JpZCBvcHRpb25zICovXHJcbiAgZ3JpZE9wdGlvbnM6IEdyaWRPcHRpb247XHJcblxyXG4gIC8qKiBUaGUgdHJhbnNsYXRlIGxpYnJhcnkgKi9cclxuICBwcml2YXRlIF90cmFuc2xhdGU6IFRyYW5zbGF0ZVNlcnZpY2U7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYXJnczogYW55KSB7XHJcbiAgICB0aGlzLmdyaWRPcHRpb25zID0gdGhpcy5hcmdzLmdyaWQuZ2V0T3B0aW9ucygpIGFzIEdyaWRPcHRpb247XHJcbiAgICBjb25zdCBvcHRpb25zID0gdGhpcy5ncmlkT3B0aW9ucyB8fCB0aGlzLmFyZ3MuY29sdW1uLnBhcmFtcyB8fCB7fTtcclxuICAgIHRoaXMuX3RyYW5zbGF0ZSA9IG9wdGlvbnMuaTE4bjtcclxuXHJcbiAgICB0aGlzLmluaXQoKTtcclxuICB9XHJcblxyXG4gIC8qKiBHZXQgQ29sdW1uIERlZmluaXRpb24gb2JqZWN0ICovXHJcbiAgZ2V0IGNvbHVtbkRlZigpOiBDb2x1bW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuYXJncyAmJiB0aGlzLmFyZ3MuY29sdW1uIHx8IHt9O1xyXG4gIH1cclxuXHJcbiAgLyoqIEdldCBDb2x1bW4gRWRpdG9yIG9iamVjdCAqL1xyXG4gIGdldCBjb2x1bW5FZGl0b3IoKTogQ29sdW1uRWRpdG9yIHtcclxuICAgIHJldHVybiB0aGlzLmNvbHVtbkRlZiAmJiB0aGlzLmNvbHVtbkRlZi5pbnRlcm5hbENvbHVtbkVkaXRvciAmJiB0aGlzLmNvbHVtbkRlZi5pbnRlcm5hbENvbHVtbkVkaXRvciB8fCB7fTtcclxuICB9XHJcblxyXG4gIC8qKiBHZXQgdGhlIFZhbGlkYXRvciBmdW5jdGlvbiwgY2FuIGJlIHBhc3NlZCBpbiBFZGl0b3IgcHJvcGVydHkgb3IgQ29sdW1uIERlZmluaXRpb24gKi9cclxuICBnZXQgdmFsaWRhdG9yKCk6IEVkaXRvclZhbGlkYXRvciB7XHJcbiAgICByZXR1cm4gdGhpcy5jb2x1bW5FZGl0b3IudmFsaWRhdG9yIHx8IHRoaXMuY29sdW1uRGVmLnZhbGlkYXRvcjtcclxuICB9XHJcblxyXG4gIGdldCBoYXNBdXRvQ29tbWl0RWRpdCgpIHtcclxuICAgIHJldHVybiB0aGlzLmFyZ3MuZ3JpZC5nZXRPcHRpb25zKCkuYXV0b0NvbW1pdEVkaXQ7XHJcbiAgfVxyXG5cclxuICBpbml0KCk6IHZvaWQge1xyXG4gICAgY29uc3QgY29sdW1uSWQgPSB0aGlzLmNvbHVtbkRlZiAmJiB0aGlzLmNvbHVtbkRlZi5pZDtcclxuICAgIGNvbnN0IHBsYWNlaG9sZGVyID0gdGhpcy5jb2x1bW5FZGl0b3IgJiYgdGhpcy5jb2x1bW5FZGl0b3IucGxhY2Vob2xkZXIgfHwgJyc7XHJcbiAgICBjb25zdCB0aXRsZSA9IHRoaXMuY29sdW1uRWRpdG9yICYmIHRoaXMuY29sdW1uRWRpdG9yLnRpdGxlIHx8ICcnO1xyXG4gICAgY29uc3QgY2FuY2VsVGV4dCA9IHRoaXMuX3RyYW5zbGF0ZSAmJiB0aGlzLl90cmFuc2xhdGUuaW5zdGFudCgnQ0FOQ0VMJykgfHwgQ29uc3RhbnRzLlRFWFRfQ0FOQ0VMO1xyXG4gICAgY29uc3Qgc2F2ZVRleHQgPSB0aGlzLl90cmFuc2xhdGUgJiYgdGhpcy5fdHJhbnNsYXRlLmluc3RhbnQoJ1NBVkUnKSB8fCBDb25zdGFudHMuVEVYVF9TQVZFO1xyXG4gICAgY29uc3QgJGNvbnRhaW5lciA9ICQoJ2JvZHknKTtcclxuXHJcbiAgICB0aGlzLiR3cmFwcGVyID0gJChgPGRpdiBjbGFzcz1cInNsaWNrLWxhcmdlLWVkaXRvci10ZXh0IGVkaXRvci0ke2NvbHVtbklkfVwiIC8+YCkuYXBwZW5kVG8oJGNvbnRhaW5lcik7XHJcbiAgICB0aGlzLiR0ZXh0YXJlYSA9ICQoYDx0ZXh0YXJlYSBoaWRlZm9jdXMgcm93cz1cIjVcIiBwbGFjZWhvbGRlcj1cIiR7cGxhY2Vob2xkZXJ9XCIgdGl0bGU9XCIke3RpdGxlfVwiPmApLmFwcGVuZFRvKHRoaXMuJHdyYXBwZXIpO1xyXG5cclxuICAgIC8vIHRoZSBsaWIgZG9lcyBub3QgZ2V0IHRoZSBmb2N1cyBvdXQgZXZlbnQgZm9yIHNvbWUgcmVhc29uXHJcbiAgICAvLyBzbyByZWdpc3RlciBpdCBoZXJlXHJcbiAgICBpZiAodGhpcy5oYXNBdXRvQ29tbWl0RWRpdCkge1xyXG4gICAgICB0aGlzLiR0ZXh0YXJlYS5vbignZm9jdXNvdXQnLCAoKSA9PiB0aGlzLnNhdmUoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgJChgPGRpdiBjbGFzcz1cImVkaXRvci1mb290ZXJcIj5cclxuICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXByaW1hcnkgYnRuLXhzXCI+JHtzYXZlVGV4dH08L2J1dHRvbj5cclxuICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgYnRuLXhzXCI+JHtjYW5jZWxUZXh0fTwvYnV0dG9uPlxyXG4gICAgICA8L2Rpdj5gKS5hcHBlbmRUbyh0aGlzLiR3cmFwcGVyKTtcclxuXHJcbiAgICB0aGlzLiR3cmFwcGVyLmZpbmQoJ2J1dHRvbjpmaXJzdCcpLm9uKCdjbGljaycsICgpID0+IHRoaXMuc2F2ZSgpKTtcclxuICAgIHRoaXMuJHdyYXBwZXIuZmluZCgnYnV0dG9uOmxhc3QnKS5vbignY2xpY2snLCAoKSA9PiB0aGlzLmNhbmNlbCgpKTtcclxuICAgIHRoaXMuJHRleHRhcmVhLm9uKCdrZXlkb3duJywgdGhpcy5oYW5kbGVLZXlEb3duLmJpbmQodGhpcykpO1xyXG5cclxuICAgIHRoaXMucG9zaXRpb24odGhpcy5hcmdzICYmIHRoaXMuYXJncy5wb3NpdGlvbik7XHJcbiAgICB0aGlzLiR0ZXh0YXJlYS5mb2N1cygpLnNlbGVjdCgpO1xyXG4gIH1cclxuXHJcbiAgaGFuZGxlS2V5RG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xyXG4gICAgaWYgKGV2ZW50LndoaWNoID09PSBLZXlDb2RlLkVOVEVSICYmIGV2ZW50LmN0cmxLZXkpIHtcclxuICAgICAgdGhpcy5zYXZlKCk7XHJcbiAgICB9IGVsc2UgaWYgKGV2ZW50LndoaWNoID09PSBLZXlDb2RlLkVTQ0FQRSkge1xyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICB0aGlzLmNhbmNlbCgpO1xyXG4gICAgfSBlbHNlIGlmIChldmVudC53aGljaCA9PT0gS2V5Q29kZS5UQUIgJiYgZXZlbnQuc2hpZnRLZXkpIHtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgaWYgKHRoaXMuYXJncyAmJiB0aGlzLmFyZ3MuZ3JpZCkge1xyXG4gICAgICAgIHRoaXMuYXJncy5ncmlkLm5hdmlnYXRlUHJldigpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKGV2ZW50LndoaWNoID09PSBLZXlDb2RlLlRBQikge1xyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBpZiAodGhpcy5hcmdzICYmIHRoaXMuYXJncy5ncmlkKSB7XHJcbiAgICAgICAgdGhpcy5hcmdzLmdyaWQubmF2aWdhdGVOZXh0KCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNhbmNlbCgpIHtcclxuICAgIHRoaXMuJHRleHRhcmVhLnZhbCh0aGlzLmRlZmF1bHRWYWx1ZSk7XHJcbiAgICBpZiAodGhpcy5hcmdzICYmIHRoaXMuYXJncy5jYW5jZWxDaGFuZ2VzKSB7XHJcbiAgICAgIHRoaXMuYXJncy5jYW5jZWxDaGFuZ2VzKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBoaWRlKCkge1xyXG4gICAgdGhpcy4kd3JhcHBlci5oaWRlKCk7XHJcbiAgfVxyXG5cclxuICBzaG93KCkge1xyXG4gICAgdGhpcy4kd3JhcHBlci5zaG93KCk7XHJcbiAgfVxyXG5cclxuICBwb3NpdGlvbihwb3NpdGlvbjogSHRtbEVsZW1lbnRQb3NpdGlvbikge1xyXG4gICAgdGhpcy4kd3JhcHBlclxyXG4gICAgICAuY3NzKCd0b3AnLCAocG9zaXRpb24udG9wIHx8IDApIC0gNSlcclxuICAgICAgLmNzcygnbGVmdCcsIChwb3NpdGlvbi5sZWZ0IHx8IDApIC0gNSk7XHJcbiAgfVxyXG5cclxuICBkZXN0cm95KCkge1xyXG4gICAgdGhpcy4kd3JhcHBlci5vZmYoJ2tleWRvd24gZm9jdXNvdXQnKS5yZW1vdmUoKTtcclxuICB9XHJcblxyXG4gIGZvY3VzKCkge1xyXG4gICAgdGhpcy4kdGV4dGFyZWEuZm9jdXMoKTtcclxuICB9XHJcblxyXG4gIGdldFZhbHVlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuJHRleHRhcmVhLnZhbCgpO1xyXG4gIH1cclxuXHJcbiAgc2V0VmFsdWUodmFsOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuJHRleHRhcmVhLnZhbCh2YWwpO1xyXG4gIH1cclxuXHJcbiAgZ2V0Q29sdW1uRWRpdG9yKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuYXJncyAmJiB0aGlzLmFyZ3MuY29sdW1uICYmIHRoaXMuYXJncy5jb2x1bW4uaW50ZXJuYWxDb2x1bW5FZGl0b3IgJiYgdGhpcy5hcmdzLmNvbHVtbi5pbnRlcm5hbENvbHVtbkVkaXRvcjtcclxuICB9XHJcblxyXG4gIGxvYWRWYWx1ZShpdGVtOiBhbnkpIHtcclxuICAgIGNvbnN0IGZpZWxkTmFtZSA9IHRoaXMuY29sdW1uRGVmICYmIHRoaXMuY29sdW1uRGVmLmZpZWxkO1xyXG5cclxuICAgIC8vIHdoZW4gaXQncyBhIGNvbXBsZXggb2JqZWN0LCB0aGVuIHB1bGwgdGhlIG9iamVjdCBuYW1lIG9ubHksIGUuZy46IFwidXNlci5maXJzdE5hbWVcIiA9PiBcInVzZXJcIlxyXG4gICAgY29uc3QgZmllbGROYW1lRnJvbUNvbXBsZXhPYmplY3QgPSBmaWVsZE5hbWUuaW5kZXhPZignLicpID8gZmllbGROYW1lLnN1YnN0cmluZygwLCBmaWVsZE5hbWUuaW5kZXhPZignLicpKSA6ICcnO1xyXG5cclxuICAgIGlmIChpdGVtICYmIHRoaXMuY29sdW1uRGVmICYmIChpdGVtLmhhc093blByb3BlcnR5KGZpZWxkTmFtZSkgfHwgaXRlbS5oYXNPd25Qcm9wZXJ0eShmaWVsZE5hbWVGcm9tQ29tcGxleE9iamVjdCkpKSB7XHJcbiAgICAgIHRoaXMuZGVmYXVsdFZhbHVlID0gaXRlbVtmaWVsZE5hbWVGcm9tQ29tcGxleE9iamVjdCB8fCBmaWVsZE5hbWVdO1xyXG4gICAgICB0aGlzLiR0ZXh0YXJlYS52YWwodGhpcy5kZWZhdWx0VmFsdWUpO1xyXG4gICAgICB0aGlzLiR0ZXh0YXJlYS5zZWxlY3QoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNlcmlhbGl6ZVZhbHVlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuJHRleHRhcmVhLnZhbCgpO1xyXG4gIH1cclxuXHJcbiAgYXBwbHlWYWx1ZShpdGVtOiBhbnksIHN0YXRlOiBhbnkpIHtcclxuICAgIGNvbnN0IGZpZWxkTmFtZSA9IHRoaXMuY29sdW1uRGVmICYmIHRoaXMuY29sdW1uRGVmLmZpZWxkO1xyXG4gICAgLy8gd2hlbiBpdCdzIGEgY29tcGxleCBvYmplY3QsIHRoZW4gcHVsbCB0aGUgb2JqZWN0IG5hbWUgb25seSwgZS5nLjogXCJ1c2VyLmZpcnN0TmFtZVwiID0+IFwidXNlclwiXHJcbiAgICBjb25zdCBmaWVsZE5hbWVGcm9tQ29tcGxleE9iamVjdCA9IGZpZWxkTmFtZS5pbmRleE9mKCcuJykgPyBmaWVsZE5hbWUuc3Vic3RyaW5nKDAsIGZpZWxkTmFtZS5pbmRleE9mKCcuJykpIDogJyc7XHJcbiAgICBjb25zdCB2YWxpZGF0aW9uID0gdGhpcy52YWxpZGF0ZShzdGF0ZSk7XHJcbiAgICBpdGVtW2ZpZWxkTmFtZUZyb21Db21wbGV4T2JqZWN0IHx8IGZpZWxkTmFtZV0gPSAodmFsaWRhdGlvbiAmJiB2YWxpZGF0aW9uLnZhbGlkKSA/IHN0YXRlIDogJyc7XHJcbiAgfVxyXG5cclxuXHJcbiAgaXNWYWx1ZUNoYW5nZWQoKSB7XHJcbiAgICByZXR1cm4gKCEodGhpcy4kdGV4dGFyZWEudmFsKCkgPT09ICcnICYmIHRoaXMuZGVmYXVsdFZhbHVlID09PSBudWxsKSkgJiYgKHRoaXMuJHRleHRhcmVhLnZhbCgpICE9PSB0aGlzLmRlZmF1bHRWYWx1ZSk7XHJcbiAgfVxyXG5cclxuICBzYXZlKCkge1xyXG4gICAgY29uc3QgdmFsaWRhdGlvbiA9IHRoaXMudmFsaWRhdGUoKTtcclxuICAgIGlmICh2YWxpZGF0aW9uICYmIHZhbGlkYXRpb24udmFsaWQpIHtcclxuICAgICAgaWYgKHRoaXMuaGFzQXV0b0NvbW1pdEVkaXQpIHtcclxuICAgICAgICB0aGlzLmFyZ3MuZ3JpZC5nZXRFZGl0b3JMb2NrKCkuY29tbWl0Q3VycmVudEVkaXQoKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmFyZ3MuY29tbWl0Q2hhbmdlcygpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmFyZ3MuY29tbWl0Q2hhbmdlcygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdmFsaWRhdGUoaW5wdXRWYWx1ZT86IGFueSk6IEVkaXRvclZhbGlkYXRvck91dHB1dCB7XHJcbiAgICBjb25zdCBpc1JlcXVpcmVkID0gdGhpcy5jb2x1bW5FZGl0b3IucmVxdWlyZWQ7XHJcbiAgICBjb25zdCBlbG1WYWx1ZSA9IChpbnB1dFZhbHVlICE9PSB1bmRlZmluZWQpID8gaW5wdXRWYWx1ZSA6IHRoaXMuJHRleHRhcmVhICYmIHRoaXMuJHRleHRhcmVhLnZhbCAmJiB0aGlzLiR0ZXh0YXJlYS52YWwoKTtcclxuICAgIGNvbnN0IGVycm9yTXNnID0gdGhpcy5jb2x1bW5FZGl0b3IuZXJyb3JNZXNzYWdlO1xyXG5cclxuICAgIGlmICh0aGlzLnZhbGlkYXRvcikge1xyXG4gICAgICByZXR1cm4gdGhpcy52YWxpZGF0b3IoZWxtVmFsdWUsIHRoaXMuYXJncyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gYnkgZGVmYXVsdCB0aGUgZWRpdG9yIGlzIGFsbW9zdCBhbHdheXMgdmFsaWQgKGV4Y2VwdCB3aGVuIGl0J3MgcmVxdWlyZWQgYnV0IG5vdCBwcm92aWRlZClcclxuICAgIGlmIChpc1JlcXVpcmVkICYmIGVsbVZhbHVlID09PSAnJykge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHZhbGlkOiBmYWxzZSxcclxuICAgICAgICBtc2c6IGVycm9yTXNnIHx8IENvbnN0YW50cy5WQUxJREFUSU9OX1JFUVVJUkVEX0ZJRUxEXHJcbiAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdmFsaWQ6IHRydWUsXHJcbiAgICAgIG1zZzogbnVsbFxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIl19