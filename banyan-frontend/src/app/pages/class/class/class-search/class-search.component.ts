import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormMode } from 'app/model/common/FormMode';
import { StudentService } from 'app/pages/student/student.service';
import { BaseComponent } from 'app/shared/components/BaseComponent';
import { NotificationType } from 'app/shared/models/NotificationType';
import { CommonService } from 'app/shared/services/common.service';
import { DataTableResource, DataTable } from 'inet-ui';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ClassService } from '../../class.service';

@Component({
    selector: 'app-class-search',
    templateUrl: './class-search.component.html'
})
export class ClassSearchComponent extends BaseComponent implements OnInit {
    @Input() classId: string;
    // @Input() mode: FormMode;
    @Output('valueChange') change = new EventEmitter<any>();
    @ViewChild("searchValue") searchValue: ElementRef;

    mainForm: FormGroup;
    dataResource = new DataTableResource([]);
    items = [];
    itemCount = 0;
    pageNumber = 1;
    limit = 5;
    mode: FormMode;
    protected params: any; // to reload data
    modalRef: BsModalRef;
    config = {
        backdrop: false,
        ignoreBackdropClick: true,
        class: 'modal-xl'
    };

    constructor(
        private classService: ClassService,
        private studentService: StudentService,
        protected modalService: BsModalService,
        protected commonService: CommonService
        ) { super(commonService)}

    ngOnInit() {
        this.mainForm = new FormGroup({
            'searchValue': new FormControl(null),
        });
        this.searchValue.nativeElement.focus();
    }

    load(params){
        // var criteria: any = params;
        this.classService.classList(params).subscribe(data => {
            this.items = data['items'];
            const items = data['items'];
            this.itemCount = data['total'];
            this.dataResource = new DataTableResource(items);
        });
    }

    // onSelected(item: any) {
    //     this.change.emit([
    //         item
    //     ]);
    // }

    onSearch() {
        let searchValue = this.mainForm.get('searchValue').value;
        this.params.searchValue = searchValue;
        this.params.limit = 10;
        this.params.excludeId = this.classId;
        this.load(this.params);
    }

    onRowClick(params){
        if (params.row.item.uuid == this.classId) {
            this.showMessage("Trùng lớp", "Thông báo", NotificationType.ERROR);
            return;
        }
        this.change.emit([
            params.row.item
        ]);
    }
}