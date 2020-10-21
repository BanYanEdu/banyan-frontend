import { ElementRef, EventEmitter, OnInit } from '@angular/core';
import { TimePickerModalComponent } from "./time-picker-modal/time-picker-modal.component";
import { ControlValueAccessor } from "@angular/forms";
export declare const DEFAULT_VALUE_ACCESSOR: any;
export declare class TimePickerModalDirective implements OnInit, ControlValueAccessor {
    private el;
    valueChange: EventEmitter<string>;
    timePickerModal: TimePickerModalComponent;
    onFocus(): void;
    onChange(): void;
    private propagateChange;
    constructor(el: ElementRef);
    ngOnInit(): void;
    writeValue(value: string): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    open(): void;
    close(): void;
    private getDateInput;
    private getValue;
}
