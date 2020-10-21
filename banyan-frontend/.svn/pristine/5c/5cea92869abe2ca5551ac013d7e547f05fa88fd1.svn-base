import { EventEmitter, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { SocialService } from '../social.service';
import { SocialActivity } from '../model/Activity';
import { SocialComment } from '../model/Comment';
import { CommentPostComponent } from "../comment-post/comment-post.component";
export declare class CommentListComponent implements OnInit, OnChanges, OnDestroy {
    protected socialService: SocialService;
    activity: SocialActivity;
    allowComment: boolean;
    commentLoad: EventEmitter<any>;
    commentPost: CommentPostComponent;
    remainComments: number;
    viewDate: string;
    private commentParams;
    private _commentChange;
    constructor(socialService: SocialService);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    focusForm(): void;
    commentCreate(params: any): void;
    load(isInit?: boolean): void;
    commentUpdated(comment: SocialComment): void;
    commentDeleted(comment: SocialComment): void;
    private commentPosted;
    private getIndexComment;
    private replaceOrAddComment;
    protected removeComment(uuid: string): void;
}
