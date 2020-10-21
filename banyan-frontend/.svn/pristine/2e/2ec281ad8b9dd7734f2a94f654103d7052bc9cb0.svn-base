import { OnInit, EventEmitter } from '@angular/core';
import { SocialActivity } from "../model/Activity";
import { SocialService } from "../social.service";
export declare class SocialEmbedComponent implements OnInit {
    private socialService;
    activityID: string;
    contextID: string;
    application: string;
    activity: SocialActivity;
    allowComment: boolean;
    onLoad: EventEmitter<any>;
    onError: EventEmitter<any>;
    totalComments: number;
    constructor(socialService: SocialService);
    ngOnInit(): void;
    private _loadActivity;
    private _loaded;
}
