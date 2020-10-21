import { AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { SocialActivity } from '../model/Activity';
export declare class SocialModalViewComponent implements AfterViewInit, OnDestroy {
    viewModal: ElementRef;
    activity: SocialActivity;
    $modal: any;
    constructor();
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    viewActivity(activity: SocialActivity): void;
}
