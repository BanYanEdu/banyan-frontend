import { Component, OnInit, OnDestroy } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseListComponent } from 'app/shared/components/BaseListComponent';
import { CommonService } from 'app/shared/services/common.service';
import { Course } from 'app/model/class/Course';
import { ClassService } from '../class.service';

@Component({
    selector: 'app-course-list',
    templateUrl: './course-list.component.html'
})
export class CourseListComponent extends BaseListComponent<Course> implements OnInit, OnDestroy {
    
    constructor(
        commonService: CommonService,
        protected classService: ClassService,
        protected modalService: BsModalService,
        protected router: Router,
        protected route: ActivatedRoute
    ) {
        super(commonService, modalService, router);
    }

    ngOnInit() {
        
    }

    protected callDeleteItem(id: string, callbackFn: Function): void {
        // this.settingsService.outletDelete(id).subscribe(res => callbackFn(res));
    }

    protected callCheckItemInUse(id: string, callbackFn: Function): void {
        // this.mdService.checkSourceInUse(id, null).subscribe(inUse => callbackFn(inUse));
    }

    protected callLoadList(callbackFn: Function, errorFn: Function): void {
        var criteria: any = this.params;
        
        this.classService.courseList(criteria).subscribe(data => callbackFn(data), error => errorFn(error));
    }

    ngOnDestroy() {

    }

}
