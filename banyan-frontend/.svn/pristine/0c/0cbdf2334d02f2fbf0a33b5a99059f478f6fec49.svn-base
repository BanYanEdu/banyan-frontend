import { EventEmitter, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ImageCroppedEvent } from "../image-cropper.component";
export declare class CropperAvatarDialogComponent implements OnInit {
    private modalService;
    cropperModal: TemplateRef<any>;
    private modalRef;
    cropperReady: boolean;
    imageChangedEvent: any;
    imageCroppedEvent: ImageCroppedEvent;
    onCropped: EventEmitter<{}>;
    onHide: EventEmitter<{}>;
    onSelectFile: EventEmitter<{}>;
    private isModalShown;
    constructor(modalService: BsModalService);
    ngOnInit(): void;
    imageCropped(event: ImageCroppedEvent): void;
    imageLoaded(): void;
    loadImageFailed(): void;
    setImageChangedEvent($event: any): void;
    hide(): void;
    show($event: any): void;
    select($event: any): void;
    submit(): void;
    getImageBlob(): Blob;
}
