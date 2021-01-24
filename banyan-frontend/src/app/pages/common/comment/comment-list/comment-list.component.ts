import { Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, TemplateRef } from '@angular/core';

import { CommonService } from 'app/shared/services/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { BaseComponent } from 'app/shared/components/BaseComponent';
import { FormMode } from 'app/model/common/FormMode';
import { BaseEditableModel } from 'app/shared/models/BaseEditableModel';
import { CommentService } from '../comment.service';

@Component({
    selector: 'app-comment-list',
    templateUrl: './comment-list.component.html'
})
export class CommentListComponent extends BaseComponent implements OnInit, OnChanges, OnDestroy {
    @Input() ownerType: string;
    @Input() ownerId: string;
    itemCount = 0;
    pageNumber = 1;
    protected params: any; // to reload data
    mode: FormMode = FormMode.E_EDIT;
    modalRef: BsModalRef = new BsModalRef();
    config = {
        backdrop: false,
        ignoreBackdropClick: true,
        class: 'modal-lg'
    };
    items: any[];
    selectedItem: any;

    constructor(
        element: ElementRef,
        protected modalService: BsModalService,
        protected commentService: CommentService,
        protected commonService: CommonService,
        protected route: ActivatedRoute,
        protected router: Router
    ) { super(commonService) }

    ngOnInit() {
        this.load();
    }

    ngOnChanges() {
        this.load();
    }

    load() {
        this.params = { 
            ownerId: this.ownerId, 
            ownerType: this.ownerType
        };

        this.commentService.commentList(this.params).subscribe(data => {
            this.items = data.items;
            this.itemCount = data['total'];
        })
    }

    onChanged($event) {
        this.modalRef.hide();
        this.load();
    }

    onAdd(template: TemplateRef<any>) {
        // this.onEdit(template, null);
        this.mode = FormMode.E_ADD;
        this.config.class = "modal-medium";
        this.modalRef = this.modalService.show(template, this.config);
    }
    onEdit(template: TemplateRef<any>, item: BaseEditableModel) {
        this.mode = FormMode.E_EDIT;
        this.config.class = "modal-medium";
        this.selectedItem = item;
        this.modalRef = this.modalService.show(template, this.config);
    }
    ngOnDestroy() {
        // this.modalRef.hide();
    }
    
}