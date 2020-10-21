import { OnInit } from '@angular/core';
import { ElementRef } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { OnChanges, SimpleChanges } from '@angular/core';
export declare class AppSelect2Directive implements OnInit, OnChanges {
    private _el;
    initValue: string;
    options: any;
    onChange: EventEmitter<any>;
    element: any;
    constructor(_el: ElementRef);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    updateSelect(): void;
    updateValue(): void;
}
