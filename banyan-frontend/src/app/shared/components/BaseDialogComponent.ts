import { CommonService } from "../services/common.service";
import { ElementRef, Output, EventEmitter, AfterViewInit } from "@angular/core";
import { CommonConstants } from "../CommonConstants";
import { Observable } from "rxjs";
import { BaseComponent } from "./BaseComponent"

export abstract class BaseDialogComponent extends BaseComponent implements AfterViewInit {
    @Output() initialized = new EventEmitter<any>();

    protected autoFocusElementSelector = CommonConstants.InputElementSelector;

    constructor(protected elementRef: ElementRef, protected commonService: CommonService) {
        super(commonService);

        // this.subscribeOne(this.initialized, () => this.autoFocusToFirstElement());
    }

    protected autoFocusToFirstElement(): void {
        this.commonService.focusService.focusToElementOfModule.next({ context: this.elementRef, selector: this.autoFocusElementSelector });
    }

    protected focusTo(selector: string): Promise<void> {
        return this.commonService.focusService.setFocusTo(this.elementRef, selector);
    }

    protected subscribeOne<T>(observable: Observable<T>, handler: { (data: T): void }): void {
        observable.take(1).subscribe((data) => handler(data));
    }

    public ngAfterViewInit(): void {
        this.initialized.emit(this);
    }

}