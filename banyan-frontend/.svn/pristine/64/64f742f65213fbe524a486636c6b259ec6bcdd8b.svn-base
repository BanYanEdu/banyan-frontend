import { OnChanges, OnDestroy, SimpleChanges, TemplateRef } from '@angular/core';
import { CalEvent } from "../utils/model/CalEvent";
import { CalendarService } from "../calendar.service";
import { BsModalRef, BsModalService } from "ngx-bootstrap";
import { FileListComponent } from "../remote-module/filelist/list/file-list.component";
export declare class AttachmentListComponent implements OnChanges, OnDestroy {
    private calendarService;
    private modalService;
    calEvent: CalEvent;
    fileEl: HTMLInputElement;
    removable: boolean;
    fileList: FileListComponent;
    files: any[];
    modalRef: BsModalRef;
    confirmMessage: string;
    private _file;
    constructor(calendarService: CalendarService, modalService: BsModalService);
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    viewAttachment(file: any, event: CalEvent): void;
    removeAttachment(file: any, template: TemplateRef<any>): void;
    removeFile(): void;
    private _attachmentToFiles;
}
