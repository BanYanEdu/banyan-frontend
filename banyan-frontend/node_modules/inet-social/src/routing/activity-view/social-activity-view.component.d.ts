import { OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
export declare class SocialActivityViewComponent implements OnInit, OnDestroy {
    private route;
    private router;
    activityId: string;
    private _routerObserver;
    constructor(route: ActivatedRoute, router: Router);
    ngOnInit(): void;
    ngOnDestroy(): void;
    private _updateActivityId;
}
