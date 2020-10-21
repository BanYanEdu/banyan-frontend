import { ElementRef, OnInit, EventEmitter } from '@angular/core';
import { NumberUtilsService } from './number-utils.service';
import { Validator, AbstractControl } from '@angular/forms';
export declare class NumberSeparatorDirective implements Validator, OnInit {
    private utilsService;
    private elementRef;
    name: string;
    separator: string;
    numberMin: string;
    numberMax: string;
    numberLength: string;
    private readonly el;
    ngModel: EventEmitter<any>;
    constructor(utilsService: NumberUtilsService, elementRef: ElementRef, name: string);
    ngOnInit(): void;
    validate(c: AbstractControl): {
        [key: string]: any;
    };
    private isValidParam;
    private getNumber;
    private checkLength;
    onInput($event: any): void;
    private addSeparator;
}
