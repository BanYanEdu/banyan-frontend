import { Component, OnInit, OnDestroy } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseListComponent } from 'app/shared/components/BaseListComponent';
import { CommonService } from 'app/shared/services/common.service';
import { DataTableResource } from 'inet-ui';
import { StudentService } from '../student.service';
import { Contact } from 'app/model/student/Contact';

@Component({
    selector: 'app-student-list',
    templateUrl: './student-list.component.html'
})
export class StudentListComponent extends BaseListComponent<Contact> implements OnInit, OnDestroy {
    
    constructor(
        commonService: CommonService,
        protected studentService: StudentService,
        protected modalService: BsModalService,
        protected router: Router,
        protected route: ActivatedRoute
    ) {
        super(commonService, modalService, router);
    }

    ngOnInit() {

        // this.items = [
        //     {
        //         code: "HV001",
        //         name: "Nguyễn Văn A"
        //     }
        // ];
        
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
                {uuid: "001", code: "001", name:"Nguyễn Duy Tân"},
                {uuid: "002", code: "002", name:"Nguyễn Lê Duy"},
            ], 
            total:1}
        
        // this.dataResource = new DataTableResource([]);
        // this.studentService.studentList(criteria).subscribe(data => callbackFn(data), error => errorFn(error));
        this.studentService.studentList(criteria).subscribe(data => callbackFn(mockedData), error => errorFn(error));
    }

    ngOnDestroy() {

    }

}