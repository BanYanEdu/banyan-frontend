import { Component, ElementRef, Input, OnChanges, OnInit, TemplateRef } from '@angular/core';

import { CommonService } from 'app/shared/services/common.service';
import { BaseComponent } from 'app/shared/components/BaseComponent';
import { ClassService } from '../class.service';
import { ClassAssignment } from 'app/model/class/ClassAssignment';

@Component({
    selector: 'app-class-assignment-view',
    templateUrl: './class-assignment-view.component.html'
})
export class ClassAssignmentViewComponent extends BaseComponent implements OnInit {
    @Input() classId: string;
    protected params: any; // to reload data
    items: ClassAssignment[];

    constructor(
        private classService: ClassService,
        protected commonService: CommonService,
    ) { super(commonService) }

    ngOnInit() {
        this.load();
    }

    load() {
        this.classService.assignmentList({ classId: this.classId }).subscribe(data => {
            this.items = data.items;
        })
    }
}