import { ElementRef } from "@angular/core";
import { delay, switchMap, takeUntil } from "rxjs/operators";
import { Subject, of } from "rxjs";

import { Utils } from "./../Utils";
import { CommonConstants } from "../CommonConstants";

export interface IDefaultModuleFocusParam {
    context: ElementRef;
    selector: string;
    timeout?: number;
}

export class FocusService {
    public focusToElementOfModule = new Subject<IDefaultModuleFocusParam>();

    constructor() {
        this.focusToElementOfModule.pipe(switchMap(x => of(x).pipe(
            delay(CommonConstants.SHORT_TIMEOUT),
            takeUntil(this.focusToElementOfModule)
        ))).subscribe(param => this.setFocusTo(param.context, param.selector, param.timeout));
    }

    public setFocusTo(context: ElementRef, selector: string, timeout = CommonConstants.SHORT_TIMEOUT): Promise<any> {
        if (!context || !context.nativeElement || !selector) {
            return;
        }

        return Utils.subscribeRetry(of(() => context.nativeElement.querySelector(selector)), getElementFunc => {
            let element = getElementFunc();
            if (element) {
                requestAnimationFrame(() => {
                    let focusable = element.querySelector(CommonConstants.InputElementSelector) || element;
                    focusable.focus();
                });
            }
            return Boolean(element);
        }, timeout);
    }

}