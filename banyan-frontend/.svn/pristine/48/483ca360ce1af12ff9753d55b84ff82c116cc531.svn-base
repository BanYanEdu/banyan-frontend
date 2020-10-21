import { OnInit } from '@angular/core';
import { SocialActivity } from "../model/Activity";
import { SocialService } from "../social.service";
import { Router } from "@angular/router";
export declare class SocialLatestComponent implements OnInit {
    private socialService;
    private router;
    viewMoreEnable: boolean;
    activities: SocialActivity[];
    constructor(socialService: SocialService, router: Router);
    ngOnInit(): void;
    viewActivity(activity: SocialActivity): void;
    viewMore(): void;
    private _loadLatest;
    private _updateWithCommentLatest;
}
