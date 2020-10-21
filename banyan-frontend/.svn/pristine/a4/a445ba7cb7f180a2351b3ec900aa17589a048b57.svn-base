import { EventEmitter, OnInit, TemplateRef } from '@angular/core';
import { NgxGalleryImage, NgxGalleryOptions } from "ngx-gallery";
export declare class FileListComponent implements OnInit {
    fileEl: HTMLInputElement;
    files: FileListItem[];
    removable: boolean;
    template: TemplateRef<any>;
    onClick: EventEmitter<any>;
    onRemove: EventEmitter<FileListItem>;
    galleryOptions: NgxGalleryOptions[];
    galleryImages: NgxGalleryImage[];
    ngOnInit(): void;
    clickFile(file: FileListItem, event: any): void;
    removeFile(file: FileListItem): void;
    addFiles(files: FileList | File[]): void;
    private _initFileEl;
    private _readImageBase64;
    private _fileIsImage;
}
export interface FileListItem extends File {
    id?: string;
    url?: string;
    image?: boolean;
}
