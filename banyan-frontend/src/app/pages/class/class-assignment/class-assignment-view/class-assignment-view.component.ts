import { Component, ElementRef, Input, OnChanges, OnInit, TemplateRef } from '@angular/core';

import { CommonService } from 'app/shared/services/common.service';
import { BaseComponent } from 'app/shared/components/BaseComponent';
import { ClassAssignment } from 'app/model/class/ClassAssignment';
import { ClassService } from '../../class.service';

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