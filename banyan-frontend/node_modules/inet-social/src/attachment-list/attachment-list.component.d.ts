import { OnChanges, SimpleChanges } from '@angular/core';
import { SocialService } from '../social.service';
import { Attachment } from '../model/Attachment';
import { FileListItem } from "inet-ui";
export declare class AttachmentListComponent implements OnChanges {
    private socialService;
    attachments: Attachment[];
    files: FileListItem[];
    private _images;
    constructor(socialService: SocialService);
    ngOnChanges(changes: SimpleChanges): void;
    viewImage(file: FileListItem, imageEl: HTMLElement): void;
    viewAttachment(data: any): void;
    private _getAttachmentById;
    private _getImageIndex;
    private _indexFiles;
}
