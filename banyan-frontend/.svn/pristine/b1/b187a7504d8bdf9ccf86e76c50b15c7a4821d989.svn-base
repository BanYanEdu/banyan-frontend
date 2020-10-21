import { EventEmitter, OnInit } from '@angular/core';
import { OpenGraphService } from "../open-graph.service";
import { OpenGraphData } from "../model/OpenGraphData";
export declare class LinkPreviewComponent implements OnInit {
    private openGraphService;
    link: string;
    openGraphData: OpenGraphData;
    removable: boolean;
    onLoad: EventEmitter<{}>;
    onDelete: EventEmitter<{}>;
    _hidden: boolean;
    constructor(openGraphService: OpenGraphService);
    ngOnInit(): void;
    isPreview(): boolean;
    setData(data: OpenGraphData): void;
    getData(): OpenGraphData;
    setLink(link: string): void;
    removePreView(): void;
    getDomain(url: string): string;
    clearData(): void;
    private loadPreview;
    private loadImageInfo;
    private setHidden;
    private isHidden;
}
