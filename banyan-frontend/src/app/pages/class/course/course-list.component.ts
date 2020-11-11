import { Component, OnInit, OnDestroy } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseListComponent } from 'app/shared/components/BaseListComponent';
import { CommonService } from 'app/shared/services/common.service';
import { DataTableResource } from 'inet-ui';
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
        var criteria: any;
        var mockedData = {
            items: [
                {code: "R01-101", name:"Room 101 (CN01)", sortIndex: 10, inactive: false},
                {code: "R01-102", name:"Room 102 (CN01)", sortIndex: 20, inactive: false},
                {code: "R02-111", name:"Room 111 (CN2)", sortIndex:30, inactive: false},
                {code: "R04-201", name:"Room 201 (CN04)", sortIndex:40, inactive: false},
                {code: "R04-301", name:"Room 301 (CN04)", sortIndex:50, inactive: true},
            ], 
            total: 5
            }
        
        // this.dataResource = new DataTableResource([]);
        this.classService.courseList(criteria).subscribe(data => callbackFn(mockedData), error => errorFn(error));
    }

    ngOnDestroy() {

    }

}
