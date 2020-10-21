/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Input, HostListener, forwardRef, Attribute, ElementRef, EventEmitter, Output } from '@angular/core';
import { NumberUtilsService } from './number-utils.service';
import { NG_VALIDATORS } from '@angular/forms';
var NumberSeparatorDirective = /** @class */ (function () {
    function NumberSeparatorDirective(utilsService, elementRef, name) {
        this.utilsService = utilsService;
        this.elementRef = elementRef;
        this.name = name;
        this.separator = ',';
        this.ngModel = new EventEmitter();
        this.el = this.elementRef.nativeElement;
        if (this.el) {
            this.el.type = 'text';
        }
    }
    /**
     * @return {?}
     */
    NumberSeparatorDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () { };
    /**
     * @param {?} c
     * @return {?}
     */
    NumberSeparatorDirective.prototype.validate = /**
     * @param {?} c
     * @return {?}
     */
    function (c) {
        // self value
        /** @type {?} */
        var v = c.value;
        if (v == 0 && !this.numberMin && !this.numberMax) {
            this.el.value = "0";
            return null;
        }
        if (v) {
            // console.log('validate[value]', v, this.el.value, v !== this.el.value);
            // first update
            if (this.el && (v !== this.el.value)) {
                this.el.value = this.addSeparator(this.el.value);
            }
            // control value
            v = parseInt(v.toString().replace(/[^0-9.,]/g, ''), 10);
            // number validator
            if (!this.isValidParam(v)) {
                this.el.value = null;
                return {
                    pattern: true
                };
            }
            // min validator
            if (v && this.isValidParam(this.numberMax) && v > parseInt(this.numberMax, 10)) {
                return {
                    max: false
                };
            }
            // max validator
            if (v && this.isValidParam(this.numberMin) && v < parseInt(this.numberMin, 10)) {
                return {
                    min: false
                };
            }
        }
        return null;
    };
    /**
     * @private
     * @param {?} param
     * @return {?}
     */
    NumberSeparatorDirective.prototype.isValidParam = /**
     * @private
     * @param {?} param
     * @return {?}
     */
    function (param) {
        return param && this.utilsService.isNumeric(param);
    };
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    NumberSeparatorDirective.prototype.getNumber = /**
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        value = value.replace(/[^0-9.,]/g, '');
        return value;
    };
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    NumberSeparatorDirective.prototype.checkLength = /**
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (this.isValidParam(this.numberLength) && value.length > parseInt(this.numberLength, 10)) {
            value = value.slice(0, parseInt(this.numberLength, 10));
        }
        return value;
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    NumberSeparatorDirective.prototype.onInput = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        // console.log('onInput[data]', data.target.value);
        /** @type {?} */
        var value = this.utilsService.removeSeparator($event.target.value, this.separator);
        value = this.getNumber(value);
        if (this.utilsService.isNumeric(value)) {
            value = this.checkLength(value);
            $event.target.value = this.utilsService.addSeparator(value, this.separator);
        }
    };
    /*

    @HostListener("change", ["$event.target.value"])
    onChange(value) {
        this.el.value = this.addSeparator(value);
    }

    onInputChange(value) {
        const control = this.injector.get(NgControl);
        const newValue = this.utilsService.removeSeparator(value, this.separator);
        console.log('[newValue]', newValue);
        control.valueAccessor.writeValue(newValue);
    }

    */
    /*
    
        @HostListener("change", ["$event.target.value"])
        onChange(value) {
            this.el.value = this.addSeparator(value);
        }
    
        onInputChange(value) {
            const control = this.injector.get(NgControl);
            const newValue = this.utilsService.removeSeparator(value, this.separator);
            console.log('[newValue]', newValue);
            control.valueAccessor.writeValue(newValue);
        }
    
        */
    /**
     * @private
     * @param {?} v
     * @return {?}
     */
    NumberSeparatorDirective.prototype.addSeparator = /*
    
        @HostListener("change", ["$event.target.value"])
        onChange(value) {
            this.el.value = this.addSeparator(value);
        }
    
        onInputChange(value) {
            const control = this.injector.get(NgControl);
            const newValue = this.utilsService.removeSeparator(value, this.separator);
            console.log('[newValue]', newValue);
            control.valueAccessor.writeValue(newValue);
        }
    
        */
    /**
     * @private
     * @param {?} v
     * @return {?}
     */
    function (v) {
        /** @type {?} */
        var value = this.utilsService.removeSeparator(v, this.separator);
        value = this.getNumber(value);
        if (this.utilsService.isNumeric(value)) {
            value = this.checkLength(value);
            return this.utilsService.addSeparator(value, this.separator);
        }
        return v;
    };
    NumberSeparatorDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[appNumberSeparator]',
                    providers: [
                        { provide: NG_VALIDATORS, useExisting: forwardRef((/**
                             * @return {?}
                             */
                            function () { return NumberSeparatorDirective; })), multi: true }
                    ]
                    /*
                    host: {
                        '(ngModelChange)' : 'onInputChange($event)'
                    }
                    */
                },] }
    ];
    /** @nocollapse */
    NumberSeparatorDirective.ctorParameters = function () { return [
        { type: NumberUtilsService },
        { type: ElementRef },
        { type: String, decorators: [{ type: Attribute, args: ['name',] }] }
    ]; };
    NumberSeparatorDirective.propDecorators = {
        separator: [{ type: Input, args: ['separator',] }],
        numberMin: [{ type: Input, args: ['numberMin',] }],
        numberMax: [{ type: Input, args: ['numberMax',] }],
        numberLength: [{ type: Input, args: ['numberLength',] }],
        ngModel: [{ type: Output }],
        onInput: [{ type: HostListener, args: ['input', ['$event'],] }]
    };
    return NumberSeparatorDirective;
}());
export { NumberSeparatorDirective };
if (false) {
    /** @type {?} */
    NumberSeparatorDirective.prototype.separator;
    /** @type {?} */
    NumberSeparatorDirective.prototype.numberMin;
    /** @type {?} */
    NumberSeparatorDirective.prototype.numberMax;
    /** @type {?} */
    NumberSeparatorDirective.prototype.numberLength;
    /**
     * @type {?}
     * @private
     */
    NumberSeparatorDirective.prototype.el;
    /** @type {?} */
    NumberSeparatorDirective.prototype.ngModel;
    /**
     * @type {?}
     * @private
     */
    NumberSeparatorDirective.prototype.utilsService;
    /**
     * @type {?}
     * @private
     */
    NumberSeparatorDirective.prototype.elementRef;
    /** @type {?} */
    NumberSeparatorDirective.prototype.name;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtYmVyLXNlcGFyYXRvci5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbmV0LXVpLyIsInNvdXJjZXMiOlsic3JjL251bWJlci1mb3JtYXQvbnVtYmVyLXNlcGFyYXRvci5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQ1QsS0FBSyxFQUNMLFlBQVksRUFDWixVQUFVLEVBQ1YsU0FBUyxFQUNULFVBQVUsRUFFVixZQUFZLEVBQ1osTUFBTSxFQUNULE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQzFELE9BQU8sRUFBNkIsYUFBYSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFekU7SUFzQkksa0NBQW9CLFlBQWdDLEVBQ2hDLFVBQXNCLEVBRUosSUFBWTtRQUg5QixpQkFBWSxHQUFaLFlBQVksQ0FBb0I7UUFDaEMsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUVKLFNBQUksR0FBSixJQUFJLENBQVE7UUFaOUIsY0FBUyxHQUFHLEdBQUcsQ0FBQztRQU8xQixZQUFPLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFPdEQsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQztRQUN4QyxJQUFJLElBQUksQ0FBQyxFQUFFLEVBQUU7WUFDVCxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7U0FDekI7SUFDTCxDQUFDOzs7O0lBRUQsMkNBQVE7OztJQUFSLGNBQVksQ0FBQzs7Ozs7SUFFYiwyQ0FBUTs7OztJQUFSLFVBQVMsQ0FBa0I7OztZQUVuQixDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUs7UUFDZixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUM5QyxJQUFJLENBQUMs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RUFBRSxDQUFDLFFBQVEsQ0FBQzs7SUFvQ3JDLCtCQUFDO0NBQUEsQUFuSUQsSUFtSUM7U0F4SFksd0JBQXdCOzs7SUFFakMsNkNBQW9DOztJQUNwQyw2Q0FBc0M7O0lBQ3RDLDZDQUFzQzs7SUFDdEMsZ0RBQTRDOzs7OztJQUU1QyxzQ0FBc0M7O0lBRXRDLDJDQUEwRDs7Ozs7SUFFOUMsZ0RBQXdDOzs7OztJQUN4Qyw4Q0FBOEI7O0lBRTlCLHdDQUFzQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgRGlyZWN0aXZlLFxuICAgIElucHV0LFxuICAgIEhvc3RMaXN0ZW5lcixcbiAgICBmb3J3YXJkUmVmLFxuICAgIEF0dHJpYnV0ZSxcbiAgICBFbGVtZW50UmVmLFxuICAgIE9uSW5pdCxcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgT3V0cHV0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtOdW1iZXJVdGlsc1NlcnZpY2V9IGZyb20gJy4vbnVtYmVyLXV0aWxzLnNlcnZpY2UnO1xuaW1wb3J0IHtWYWxpZGF0b3IsIEFic3RyYWN0Q29udHJvbCwgTkdfVkFMSURBVE9SU30gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1thcHBOdW1iZXJTZXBhcmF0b3JdJyxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge3Byb3ZpZGU6IE5HX1ZBTElEQVRPUlMsIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE51bWJlclNlcGFyYXRvckRpcmVjdGl2ZSksIG11bHRpOiB0cnVlfVxuICAgIF1cbiAgICAvKlxuICAgIGhvc3Q6IHtcbiAgICAgICAgJyhuZ01vZGVsQ2hhbmdlKScgOiAnb25JbnB1dENoYW5nZSgkZXZlbnQpJ1xuICAgIH1cbiAgICAqL1xufSlcbmV4cG9ydCBjbGFzcyBOdW1iZXJTZXBhcmF0b3JEaXJlY3RpdmUgaW1wbGVtZW50cyBWYWxpZGF0b3IsIE9uSW5pdCB7XG5cbiAgICBASW5wdXQoJ3NlcGFyYXRvcicpIHNlcGFyYXRvciA9ICcsJztcbiAgICBASW5wdXQoJ251bWJlck1pbicpIG51bWJlck1pbjogc3RyaW5nO1xuICAgIEBJbnB1dCgnbnVtYmVyTWF4JykgbnVtYmVyTWF4OiBzdHJpbmc7XG4gICAgQElucHV0KCdudW1iZXJMZW5ndGgnKSBudW1iZXJMZW5ndGg6IHN0cmluZztcblxuICAgIHByaXZhdGUgcmVhZG9ubHkgZWw6IEhUTUxJbnB1dEVsZW1lbnQ7XG5cbiAgICBAT3V0cHV0KCkgbmdNb2RlbDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHV0aWxzU2VydmljZTogTnVtYmVyVXRpbHNTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgICAgICAgICAvLyBwcml2YXRlIGluamVjdG9yOiBJbmplY3RvcixcbiAgICAgICAgICAgICAgICBAQXR0cmlidXRlKCduYW1lJykgcHVibGljIG5hbWU6IHN0cmluZykge1xuXG4gICAgICAgIHRoaXMuZWwgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICAgICAgaWYgKHRoaXMuZWwpIHtcbiAgICAgICAgICAgIHRoaXMuZWwudHlwZSA9ICd0ZXh0JztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25Jbml0KCkge31cblxuICAgIHZhbGlkYXRlKGM6IEFic3RyYWN0Q29udHJvbCk6IHsgW2tleTogc3RyaW5nXTogYW55IH0ge1xuICAgICAgICAvLyBzZWxmIHZhbHVlXG4gICAgICAgIGxldCB2ID0gYy52YWx1ZTtcbiAgICAgICAgaWYgKHYgPT0gMCAmJiAhdGhpcy5udW1iZXJNaW4gJiYgIXRoaXMubnVtYmVyTWF4KSB7XG4gICAgICAgICAgICB0aGlzLmVsLnZhbHVlID0gXCIwXCI7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodikge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3ZhbGlkYXRlW3ZhbHVlXScsIHYsIHRoaXMuZWwudmFsdWUsIHYgIT09IHRoaXMuZWwudmFsdWUpO1xuXG4gICAgICAgICAgICAvLyBmaXJzdCB1cGRhdGVcbiAgICAgICAgICAgIGlmICh0aGlzLmVsICYmICh2ICE9PSB0aGlzLmVsLnZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZWwudmFsdWUgPSB0aGlzLmFkZFNlcGFyYXRvcih0aGlzLmVsLnZhbHVlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gY29udHJvbCB2YWx1ZVxuICAgICAgICAgICAgdiA9IHBhcnNlSW50KHYudG9TdHJpbmcoKS5yZXBsYWNlKC9bXjAtOS4sXS9nLCAnJyksIDEwKTtcblxuICAgICAgICAgICAgLy8gbnVtYmVyIHZhbGlkYXRvclxuICAgICAgICAgICAgaWYgKCF0aGlzLmlzVmFsaWRQYXJhbSh2KSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZWwudmFsdWUgPSBudWxsO1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHBhdHRlcm46IHRydWVcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBtaW4gdmFsaWRhdG9yXG4gICAgICAgICAgICBpZiAodiAmJiB0aGlzLmlzVmFsaWRQYXJhbSh0aGlzLm51bWJlck1heCkgJiYgdiA+IHBhcnNlSW50KHRoaXMubnVtYmVyTWF4LCAxMCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBtYXg6IGZhbHNlXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gbWF4IHZhbGlkYXRvclxuICAgICAgICAgICAgaWYgKHYgJiYgdGhpcy5pc1ZhbGlkUGFyYW0odGhpcy5udW1iZXJNaW4pICYmIHYgPCBwYXJzZUludCh0aGlzLm51bWJlck1pbiwgMTApKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgbWluOiBmYWxzZVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGlzVmFsaWRQYXJhbShwYXJhbSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gcGFyYW0gJiYgdGhpcy51dGlsc1NlcnZpY2UuaXNOdW1lcmljKHBhcmFtKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldE51bWJlcih2YWx1ZSk6IHN0cmluZyB7XG4gICAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvW14wLTkuLF0vZywgJycpO1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjaGVja0xlbmd0aCh2YWx1ZSk6IHN0cmluZyB7XG4gICAgICAgIGlmICh0aGlzLmlzVmFsaWRQYXJhbSh0aGlzLm51bWJlckxlbmd0aCkgJiYgdmFsdWUubGVuZ3RoID4gcGFyc2VJbnQodGhpcy5udW1iZXJMZW5ndGgsIDEwKSkge1xuICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS5zbGljZSgwLCBwYXJzZUludCh0aGlzLm51bWJlckxlbmd0aCwgMTApKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcignaW5wdXQnLCBbJyRldmVudCddKVxuICAgIG9uSW5wdXQoJGV2ZW50KSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdvbklucHV0W2RhdGFdJywgZGF0YS50YXJnZXQudmFsdWUpO1xuICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLnV0aWxzU2VydmljZS5yZW1vdmVTZXBhcmF0b3IoJGV2ZW50LnRhcmdldC52YWx1ZSwgdGhpcy5zZXBhcmF0b3IpO1xuICAgICAgICB2YWx1ZSA9IHRoaXMuZ2V0TnVtYmVyKHZhbHVlKTtcbiAgICAgICAgaWYgKHRoaXMudXRpbHNTZXJ2aWNlLmlzTnVtZXJpYyh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHZhbHVlID0gdGhpcy5jaGVja0xlbmd0aCh2YWx1ZSk7XG4gICAgICAgICAgICAkZXZlbnQudGFyZ2V0LnZhbHVlID0gdGhpcy51dGlsc1NlcnZpY2UuYWRkU2VwYXJhdG9yKHZhbHVlLCB0aGlzLnNlcGFyYXRvcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKlxuXG4gICAgQEhvc3RMaXN0ZW5lcihcImNoYW5nZVwiLCBbXCIkZXZlbnQudGFyZ2V0LnZhbHVlXCJdKVxuICAgIG9uQ2hhbmdlKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuZWwudmFsdWUgPSB0aGlzLmFkZFNlcGFyYXRvcih2YWx1ZSk7XG4gICAgfVxuXG4gICAgb25JbnB1dENoYW5nZSh2YWx1ZSkge1xuICAgICAgICBjb25zdCBjb250cm9sID0gdGhpcy5pbmplY3Rvci5nZXQoTmdDb250cm9sKTtcbiAgICAgICAgY29uc3QgbmV3VmFsdWUgPSB0aGlzLnV0aWxzU2VydmljZS5yZW1vdmVTZXBhcmF0b3IodmFsdWUsIHRoaXMuc2VwYXJhdG9yKTtcbiAgICAgICAgY29uc29sZS5sb2coJ1tuZXdWYWx1ZV0nLCBuZXdWYWx1ZSk7XG4gICAgICAgIGNvbnRyb2wudmFsdWVBY2Nlc3Nvci53cml0ZVZhbHVlKG5ld1ZhbHVlKTtcbiAgICB9XG5cbiAgICAqL1xuXG4gICAgcHJpdmF0ZSBhZGRTZXBhcmF0b3Iodik6IHN0cmluZyB7XG4gICAgICAgIGxldCB2YWx1ZSA9IHRoaXMudXRpbHNTZXJ2aWNlLnJlbW92ZVNlcGFyYXRvcih2LCB0aGlzLnNlcGFyYXRvcik7XG4gICAgICAgIHZhbHVlID0gdGhpcy5nZXROdW1iZXIodmFsdWUpO1xuICAgICAgICBpZiAodGhpcy51dGlsc1NlcnZpY2UuaXNOdW1lcmljKHZhbHVlKSkge1xuICAgICAgICAgICAgdmFsdWUgPSB0aGlzLmNoZWNrTGVuZ3RoKHZhbHVlKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnV0aWxzU2VydmljZS5hZGRTZXBhcmF0b3IodmFsdWUsIHRoaXMuc2VwYXJhdG9yKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdjtcbiAgICB9XG59XG4iXX0=