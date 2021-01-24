import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BaseAddDialogComponent } from "app/shared/components/BaseAddDialogComponent"
import { CommonService } from 'app/shared/services/common.service';
import { BaseEditableMdModel } from 'app/shared/models/BaseEditableMdModel';
import { Comment } from 'app/model/common/Comment';
import { CommentService } from '../comment.service';

@Component({
    selector: 'app-comment-add',
    templateUrl: './comment-add.component.html'
})
export class CommentAddComponent extends BaseAddDialogComponent<Comment>{
    @Input() ownerType: string;
    @Input() ownerId: string;
    @ViewChild("content") contentField: ElementRef;
    
    constructor(
        element: ElementRef,
        private commentService: CommentService,
        protected commonService: CommonService
    ) {
        super(element, commonService);
    }
    protected createMainFormGroup(): FormGroup {
        return new FormGroup({
            'content': new FormControl(null, [Validators.required]),
        });
    }
    patchInitializedMainForm() {
        this.contentField.nativeElement.focus();
    }
    populateAdditionalFormValue(){
        this.requestItem.ownerType = this.ownerType;
        this.requestItem.ownerId = this.ownerId;
        this.requestItem.commentType = "E_COMMENT";
    }
    protected callSearch(input: {code:string}, callbackFn: Function): void{
        this.commentService.commentList(input).subscribe(data => callbackFn(data));
    }
    protected callAddItem(requestItem: BaseEditableMdModel, callbackFn: Function): void{
        this.commentService.commentCreate(requestItem).subscribe(data => callbackFn(data));
    }
    protected callUpdateItem(requestItem: BaseEditableMdModel, callbackFn: Function): void{
        this.commentService.commentUpdate(requestItem).subscribe(data => callbackFn(data));
    }
}