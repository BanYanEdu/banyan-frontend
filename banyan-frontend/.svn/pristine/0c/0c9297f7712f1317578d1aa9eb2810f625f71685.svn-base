import { EventEmitter } from '@angular/core';
import { SocialComment } from '../model/Comment';
import { SocialService } from '../social.service';
export declare class CommentComponent {
    private socialService;
    comment: SocialComment;
    editable: boolean;
    onUpdated: EventEmitter<SocialComment>;
    onDeleted: EventEmitter<SocialComment>;
    viewDate: string;
    editing: boolean;
    constructor(socialService: SocialService);
    commentCancelEdit(): void;
    commentEdit(): void;
    commentUpdate(params: any): void;
    commentDelete(): void;
    commentLike(): void;
}
