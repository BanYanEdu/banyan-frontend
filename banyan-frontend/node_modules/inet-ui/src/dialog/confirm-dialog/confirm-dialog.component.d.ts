import { OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { DialogAction } from "../dialog-action";
import { TranslateService } from "@ngx-translate/core";
export declare class ConfirmDialogComponent implements OnInit {
    private modalService;
    private translate;
    confirmModal: TemplateRef<any>;
    id: string;
    iconCls: string;
    title: string;
    content: string;
    cls: string;
    actions: Array<DialogAction>;
    private modalRef;
    private data;
    private toolbarTranslations;
    private readonly translateSubscription;
    constructor(modalService: BsModalService, translate: TranslateService);
    ngOnInit(): void;
    hide(): void;
    show(): void;
    pushAction(action: DialogAction): void;
    setActions(actions: Array<DialogAction>): void;
    getActions(): Array<DialogAction>;
    setData(v: any): void;
    getData(): any;
    getId(): string;
}
