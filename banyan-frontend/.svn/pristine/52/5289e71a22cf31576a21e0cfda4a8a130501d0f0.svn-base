import { AfterViewInit, ElementRef, EventEmitter, OnDestroy, TemplateRef } from '@angular/core';
import { SocialService } from '../social.service';
import { SocialActivity } from '../model/Activity';
import { BsModalService } from "ngx-bootstrap";
export declare class ActivityComponent implements AfterViewInit, OnDestroy {
    private socialService;
    private modalService;
    activity: SocialActivity;
    onUpdated: EventEmitter<any>;
    onDeleted: EventEmitter<any>;
    policiesDisplay: ElementRef;
    tmpConfirmDelete: TemplateRef<any>;
    viewDate: string;
    editing: boolean;
    private _modalRef;
    constructor(socialService: SocialService, modalService: BsModalService);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    activityEdit(): void;
    activityCancelEdit(): void;
    activityDelete(): void;
    confirmDelete(): void;
    declineDelete(): void;
    activityLike(): void;
    activityUpdate(data: any): void;
}
