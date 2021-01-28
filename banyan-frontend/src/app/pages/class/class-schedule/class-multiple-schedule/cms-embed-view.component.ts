import { Component, ElementRef, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { CommonService } from 'app/shared/services/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { BaseComponent } from 'app/shared/components/BaseComponent';
import { FormMode } from 'app/model/common/FormMode';
import { ClassUnit } from 'app/model/class/ClassUnit';
import { ClassService } from '../../class.service';
import { SchoolClass } from 'app/model/class/SchoolClass';
import { ConfirmDialogComponent, DialogAction } from 'inet-ui';

@Component({
    selector: 'app-class-multiple-schedule-embed-view',
    templateUrl: './cms-embed-view.component.html'
})
export class ClassMultipleScheduleEmbedViewComponent extends BaseComponent {
    @Input() classUnit: ClassUnit;

    constructor(
        element: ElementRef,
        protected commonService: CommonService,
        protected route: ActivatedRoute,
        protected router: Router
    ) { super(commonService) }

    ngOnInit() {
    }

}