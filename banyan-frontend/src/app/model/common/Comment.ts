import { BaseEditableModel } from "app/shared/models/BaseEditableModel";

export class Comment extends BaseEditableModel {
    ownerType?: string;
    ownerId?: string;
    content?: string;
    title?: number;
    important?: boolean;
    commentType?: string;
}
