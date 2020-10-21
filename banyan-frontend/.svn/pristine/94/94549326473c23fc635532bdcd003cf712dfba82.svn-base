import { OnChanges, SimpleChanges } from '@angular/core';
import { SocialService } from '../social.service';
import { SocialActivity } from '../model/Activity';
export declare class ActivityViewComponent implements OnChanges {
    private socialService;
    activityId: string;
    activity: SocialActivity;
    notFound: boolean;
    constructor(socialService: SocialService);
    ngOnChanges(changes: SimpleChanges): void;
    activityUpdated(activity: SocialActivity): void;
    private _load;
}
