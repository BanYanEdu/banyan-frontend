/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Input, HostListener, forwardRef, Attribute, ElementRef, EventEmitter, Output } from '@angular/core';
import { NumberUtilsService } from './number-utils.service';
import { NG_VALIDATORS } from '@angular/forms';
export class NumberSeparatorDirective {
    /**
     * @param {?} utilsService
     * @param {?} elementRef
     * @param {?} name
     */
    constructor(utilsService, elementRef, name) {
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
    ngOnInit() { }
    /**
     * @param {?} c
     * @return {?}
     */
    validate(c) {
        // self value
        /** @type {?} */
        let v = c.value;
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
    }
    /**
     * @private
     * @param {?} param
     * @return {?}
     */
    isValidParam(param) {
        return param && this.utilsService.isNumeric(param);
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    getNumber(value) {
        value = value.replace(/[^0-9.,]/g, '');
        return value;
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    checkLength(value) {
        if (this.isValidParam(this.numberLength) && value.length > parseInt(this.numberLength, 10)) {
            value = value.slice(0, parseInt(this.numberLength, 10));
        }
        return value;
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onInput($event) {
        // console.log('onInput[data]', data.target.value);
        /** @type {?} */
        let value = this.utilsService.removeSeparator($event.target.value, this.separator);
        value = this.getNumber(value);
        if (this.utilsService.isNumeric(value)) {
            value = this.checkLength(value);
            $event.target.value = this.utilsService.addSeparator(value, this.separator);
        }
    }
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
    addSeparator(v) {
        /** @type {?} */
        let value = this.utilsService.removeSeparator(v, this.separator);
        value = this.getNumber(value);
        if (this.utilsService.isNumeric(value)) {
            value = this.checkLength(value);
            return this.utilsService.addSeparator(value, this.separator);
        }
        return v;
    }
}
NumberSeparatorDirective.decorators = [
    { type: Directive, args: [{
                selector: '[appNumberSeparator]',
                providers: [
                    { provide: NG_VALIDATORS, useExisting: forwardRef((/**
                         * @return {?}
                         */
                        () => NumberSeparatorDirective)), multi: true }
                ]
                /*
                host: {
                    '(ngModelChange)' : 'onInputChange($event)'
                }
                */
            },] }
];
/** @nocollapse */
NumberSeparatorDirective.ctorParameters = () => [
    { type: NumberUtilsService },
    { type: ElementRef },
    { type: String, decorators: [{ type: Attribute, args: ['name',] }] }
];
NumberSeparatorDirective.propDecorators = {
    separator: [{ type: Input, args: ['separator',] }],
    numberMin: [{ type: Input, args: ['numberMin',] }],
    numberMax: [{ type: Input, args: ['numberMax',] }],
    numberLength: [{ type: Input, args: ['numberLength',] }],
    ngModel: [{ type: Output }],
    onInput: [{ type: HostListener, args: ['input', ['$event'],] }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtYmVyLXNlcGFyYXRvci5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbmV0LXVpLyIsInNvdXJjZXMiOlsic3JjL251bWJlci1mb3JtYXQvbnVtYmVyLXNlcGFyYXRvci5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQ1QsS0FBSyxFQUNMLFlBQVksRUFDWixVQUFVLEVBQ1YsU0FBUyxFQUNULFVBQVUsRUFFVixZQUFZLEVBQ1osTUFBTSxFQUNULE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQzFELE9BQU8sRUFBNkIsYUFBYSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFhekUsTUFBTSxPQUFPLHdCQUF3Qjs7Ozs7O0lBV2pDLFlBQW9CLFlBQWdDLEVBQ2hDLFVBQXNCLEVBRUosSUFBWTtRQUg5QixpQkFBWSxHQUFaLFlBQVksQ0FBb0I7UUFDaEMsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUVKLFNBQUksR0FBSixJQUFJLENBQVE7UUFaOUIsY0FBUyxHQUFHLEdBQUcsQ0FBQztRQU8xQixZQUFPLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFPdEQsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQztRQUN4QyxJQUFJLElBQUksQ0FBQyxFQUFFLEVBQUU7WUFDVCxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7U0FDekI7SUFDTCxDQUFDOzs7O0lBRUQsUUFBUSxLQUFJLENBQUM7Ozs7O0lBRWIsUUFBUSxDQUFDLENBQWtCOzs7WUFFbkIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLO1FBQ2YsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDOUMsSUFBSSxD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dEMsMkNBQTBEOzs7OztJQUU5QyxnREFBd0M7Ozs7O0lBQ3hDLDhDQUE4Qjs7SUFFOUIsd0NBQXNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBEaXJlY3RpdmUsXG4gICAgSW5wdXQsXG4gICAgSG9zdExpc3RlbmVyLFxuICAgIGZvcndhcmRSZWYsXG4gICAgQXR0cmlidXRlLFxuICAgIEVsZW1lbnRSZWYsXG4gICAgT25Jbml0LFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBPdXRwdXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge051bWJlclV0aWxzU2VydmljZX0gZnJvbSAnLi9udW1iZXItdXRpbHMuc2VydmljZSc7XG5pbXBvcnQge1ZhbGlkYXRvciwgQWJzdHJhY3RDb250cm9sLCBOR19WQUxJREFUT1JTfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW2FwcE51bWJlclNlcGFyYXRvcl0nLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7cHJvdmlkZTogTkdfVkFMSURBVE9SUywgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTnVtYmVyU2VwYXJhdG9yRGlyZWN0aXZlKSwgbXVsdGk6IHRydWV9XG4gICAgXVxuICAgIC8qXG4gICAgaG9zdDoge1xuICAgICAgICAnKG5nTW9kZWxDaGFuZ2UpJyA6ICdvbklucHV0Q2hhbmdlKCRldmVudCknXG4gICAgfVxuICAgICovXG59KVxuZXhwb3J0IGNsYXNzIE51bWJlclNlcGFyYXRvckRpcmVjdGl2ZSBpbXBsZW1lbnRzIFZhbGlkYXRvciwgT25Jbml0IHtcblxuICAgIEBJbnB1dCgnc2VwYXJhdG9yJykgc2VwYXJhdG9yID0gJywnO1xuICAgIEBJbnB1dCgnbnVtYmVyTWluJykgbnVtYmVyTWluOiBzdHJpbmc7XG4gICAgQElucHV0KCdudW1iZXJNYXgnKSBudW1iZXJNYXg6IHN0cmluZztcbiAgICBASW5wdXQoJ251bWJlckxlbmd0aCcpIG51bWJlckxlbmd0aDogc3RyaW5nO1xuXG4gICAgcHJpdmF0ZSByZWFkb25seSBlbDogSFRNTElucHV0RWxlbWVudDtcblxuICAgIEBPdXRwdXQoKSBuZ01vZGVsOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgdXRpbHNTZXJ2aWNlOiBOdW1iZXJVdGlsc1NlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICAgICAgICAgIC8vIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yLFxuICAgICAgICAgICAgICAgIEBBdHRyaWJ1dGUoJ25hbWUnKSBwdWJsaWMgbmFtZTogc3RyaW5nKSB7XG5cbiAgICAgICAgdGhpcy5lbCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgICAgICBpZiAodGhpcy5lbCkge1xuICAgICAgICAgICAgdGhpcy5lbC50eXBlID0gJ3RleHQnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7fVxuXG4gICAgdmFsaWRhdGUoYzogQWJzdHJhY3RDb250cm9sKTogeyBba2V5OiBzdHJpbmddOiBhbnkgfSB7XG4gICAgICAgIC8vIHNlbGYgdmFsdWVcbiAgICAgICAgbGV0IHYgPSBjLnZhbHVlO1xuICAgICAgICBpZiAodiA9PSAwICYmICF0aGlzLm51bWJlck1pbiAmJiAhdGhpcy5udW1iZXJNYXgpIHtcbiAgICAgICAgICAgIHRoaXMuZWwudmFsdWUgPSBcIjBcIjtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmICh2KSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygndmFsaWRhdGVbdmFsdWVdJywgdiwgdGhpcy5lbC52YWx1ZSwgdiAhPT0gdGhpcy5lbC52YWx1ZSk7XG5cbiAgICAgICAgICAgIC8vIGZpcnN0IHVwZGF0ZVxuICAgICAgICAgICAgaWYgKHRoaXMuZWwgJiYgKHYgIT09IHRoaXMuZWwudmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbC52YWx1ZSA9IHRoaXMuYWRkU2VwYXJhdG9yKHRoaXMuZWwudmFsdWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBjb250cm9sIHZhbHVlXG4gICAgICAgICAgICB2ID0gcGFyc2VJbnQodi50b1N0cmluZygpLnJlcGxhY2UoL1teMC05LixdL2csICcnKSwgMTApO1xuXG4gICAgICAgICAgICAvLyBudW1iZXIgdmFsaWRhdG9yXG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNWYWxpZFBhcmFtKHYpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbC52YWx1ZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgcGF0dGVybjogdHJ1ZVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIG1pbiB2YWxpZGF0b3JcbiAgICAgICAgICAgIGlmICh2ICYmIHRoaXMuaXNWYWxpZFBhcmFtKHRoaXMubnVtYmVyTWF4KSAmJiB2ID4gcGFyc2VJbnQodGhpcy5udW1iZXJNYXgsIDEwKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIG1heDogZmFsc2VcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBtYXggdmFsaWRhdG9yXG4gICAgICAgICAgICBpZiAodiAmJiB0aGlzLmlzVmFsaWRQYXJhbSh0aGlzLm51bWJlck1pbikgJiYgdiA8IHBhcnNlSW50KHRoaXMubnVtYmVyTWluLCAxMCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBtaW46IGZhbHNlXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHByaXZhdGUgaXNWYWxpZFBhcmFtKHBhcmFtKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBwYXJhbSAmJiB0aGlzLnV0aWxzU2VydmljZS5pc051bWVyaWMocGFyYW0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0TnVtYmVyKHZhbHVlKTogc3RyaW5nIHtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC9bXjAtOS4sXS9nLCAnJyk7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNoZWNrTGVuZ3RoKHZhbHVlKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKHRoaXMuaXNWYWxpZFBhcmFtKHRoaXMubnVtYmVyTGVuZ3RoKSAmJiB2YWx1ZS5sZW5ndGggPiBwYXJzZUludCh0aGlzLm51bWJlckxlbmd0aCwgMTApKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLnNsaWNlKDAsIHBhcnNlSW50KHRoaXMubnVtYmVyTGVuZ3RoLCAxMCkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdpbnB1dCcsIFsnJGV2ZW50J10pXG4gICAgb25JbnB1dCgkZXZlbnQpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ29uSW5wdXRbZGF0YV0nLCBkYXRhLnRhcmdldC52YWx1ZSk7XG4gICAgICAgIGxldCB2YWx1ZSA9IHRoaXMudXRpbHNTZXJ2aWNlLnJlbW92ZVNlcGFyYXRvcigkZXZlbnQudGFyZ2V0LnZhbHVlLCB0aGlzLnNlcGFyYXRvcik7XG4gICAgICAgIHZhbHVlID0gdGhpcy5nZXROdW1iZXIodmFsdWUpO1xuICAgICAgICBpZiAodGhpcy51dGlsc1NlcnZpY2UuaXNOdW1lcmljKHZhbHVlKSkge1xuICAgICAgICAgICAgdmFsdWUgPSB0aGlzLmNoZWNrTGVuZ3RoKHZhbHVlKTtcbiAgICAgICAgICAgICRldmVudC50YXJnZXQudmFsdWUgPSB0aGlzLnV0aWxzU2VydmljZS5hZGRTZXBhcmF0b3IodmFsdWUsIHRoaXMuc2VwYXJhdG9yKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qXG5cbiAgICBASG9zdExpc3RlbmVyKFwiY2hhbmdlXCIsIFtcIiRldmVudC50YXJnZXQudmFsdWVcIl0pXG4gICAgb25DaGFuZ2UodmFsdWUpIHtcbiAgICAgICAgdGhpcy5lbC52YWx1ZSA9IHRoaXMuYWRkU2VwYXJhdG9yKHZhbHVlKTtcbiAgICB9XG5cbiAgICBvbklucHV0Q2hhbmdlKHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IGNvbnRyb2wgPSB0aGlzLmluamVjdG9yLmdldChOZ0NvbnRyb2wpO1xuICAgICAgICBjb25zdCBuZXdWYWx1ZSA9IHRoaXMudXRpbHNTZXJ2aWNlLnJlbW92ZVNlcGFyYXRvcih2YWx1ZSwgdGhpcy5zZXBhcmF0b3IpO1xuICAgICAgICBjb25zb2xlLmxvZygnW25ld1ZhbHVlXScsIG5ld1ZhbHVlKTtcbiAgICAgICAgY29udHJvbC52YWx1ZUFjY2Vzc29yLndyaXRlVmFsdWUobmV3VmFsdWUpO1xuICAgIH1cblxuICAgICovXG5cbiAgICBwcml2YXRlIGFkZFNlcGFyYXRvcih2KTogc3RyaW5nIHtcbiAgICAgICAgbGV0IHZhbHVlID0gdGhpcy51dGlsc1NlcnZpY2UucmVtb3ZlU2VwYXJhdG9yKHYsIHRoaXMuc2VwYXJhdG9yKTtcbiAgICAgICAgdmFsdWUgPSB0aGlzLmdldE51bWJlcih2YWx1ZSk7XG4gICAgICAgIGlmICh0aGlzLnV0aWxzU2VydmljZS5pc051bWVyaWModmFsdWUpKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IHRoaXMuY2hlY2tMZW5ndGgodmFsdWUpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudXRpbHNTZXJ2aWNlLmFkZFNlcGFyYXRvcih2YWx1ZSwgdGhpcy5zZXBhcmF0b3IpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2O1xuICAgIH1cbn1cbiJdfQ==