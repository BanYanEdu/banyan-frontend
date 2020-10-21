import { SimpleChanges, ElementRef } from '@angular/core';
import { NotifyMessageService } from "../../../common/notify-message.service";
import { NotifyMessage } from "../../../model/notify-message";
import { AbstractSideNavComponent } from "../abstract-side-nav.component";
export declare class MessageSideNavComponent extends AbstractSideNavComponent {
    private service;
    elementRef: ElementRef;
    keyword: string;
    loaded: boolean;
    messages: NotifyMessage[];
    totalMessage: number;
    pageNumber: number;
    pageSize: number;
    constructor(service: NotifyMessageService, elementRef: ElementRef);
    ngOnChanges(changes: SimpleChanges): void;
    listMessage(params: any): void;
    loadMessageMore(): void;
    clearMessage(): void;
    openMessage(msg: NotifyMessage): void;
}
