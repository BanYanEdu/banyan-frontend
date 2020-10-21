import { ElementRef, OnInit } from '@angular/core';
import { Subject } from "rxjs";
import { SharingInformationService } from "../sharing-information.service";
import { NotificationService } from "inet-core";
export declare class SharingInformationTemplateComponent implements OnInit {
    private sharingInformationService;
    private notification;
    total: number;
    page: number;
    limit: number;
    keyword: string;
    finishLoading: boolean;
    subItem: any;
    dataTables: any[];
    searchData: any[];
    dataTableInfo: any;
    searchTerm$: Subject<string>;
    destroy$: Subject<boolean>;
    private __userOnAdd;
    suggestElement: ElementRef;
    constructor(sharingInformationService: SharingInformationService, notification: NotificationService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    mapApplicationData(val: any): {
        "appName": any;
        "appIcon": any;
    };
    loadTableData(): void;
    onToggleTable(subItem: any): void;
    onSetSubItem(subItem: any): void;
    mergeValueInArray(arr: any[]): any[];
    onCheckUserRight(user: any, subItem: any, $event: any): void;
    onKeyUp($event: any, subItem: any): void;
    onSearchUsers(): void;
    onChooseUser(subItem: any, user: any): void;
    onFocusSearchOut(subItem: any): void;
    onDocumentClick(event: MouseEvent): void;
    scrollMouse($event: any): void;
}
