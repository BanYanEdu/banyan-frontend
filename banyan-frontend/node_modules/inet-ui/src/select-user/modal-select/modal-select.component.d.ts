import { TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from "ngx-bootstrap";
import { CoreService } from "inet-core";
export declare class ModalSelectComponent {
    private coreService;
    private modalService;
    selectUsers: any[];
    isSingle: boolean;
    selectModal: TemplateRef<any>;
    modalRef: BsModalRef;
    users: any[];
    key: string;
    private timer;
    constructor(coreService: CoreService, modalService: BsModalService);
    setDefault(): void;
    searchUser(): void;
    addUser(item: any): void;
    removeUser(item: any): void;
    show(): void;
    hide(): void;
    private hasUser;
    private setUsers;
}
