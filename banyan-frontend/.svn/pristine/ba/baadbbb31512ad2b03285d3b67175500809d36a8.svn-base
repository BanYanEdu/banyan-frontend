import { ElementRef, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ViewerService } from '../file/viewer.service';
import { HttpClientService } from "inet-core";
export declare class ViewerComponent implements OnInit, OnDestroy {
    private route;
    private router;
    private location;
    private http;
    private viewerService;
    url: string;
    private sub;
    private docId;
    private ext;
    iframe: ElementRef;
    constructor(route: ActivatedRoute, router: Router, location: Location, http: HttpClientService, viewerService: ViewerService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    back(): void;
    download(): void;
    getParams(): {
        docID: string;
    };
    getViewUrl(viewMode?: string): string;
    onLoad($event: any): void;
}
