import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SettingsService } from 'app/pages/settings/settings.service';
import { FormMode } from 'app/model/common/FormMode';
import { StudentService } from 'app/pages/student/student.service';
import { DataTableResource } from 'inet-ui';
import { BaseListComponent } from 'app/shared/components/BaseListComponent';
import { Contact } from 'app/model/student/Contact';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
    selector: 'app-student-search',
    templateUrl: './student-search.component.html'
})
export class StudentSearchComponent implements OnInit {
    @Input() uuid: string;
    // @Input() mode: FormMode;
    @Output('valueChange') change = new EventEmitter<any>();
    @ViewChild("searchValue") searchValue: ElementRef;

    mainForm: FormGroup;
    dataResource = new DataTableResource([]);
    items = [];
    itemCount = 0;
    pageNumber = 1;
    limit = 10;
    mode: FormMode;
    protected params: any = {}; // to reload data
    modalRef: BsModalRef;
    config = {
        backdrop: false,
        ignoreBackdropClick: true,
        class: 'modal-xl'
    };

    constructor(
        private settingsService: SettingsService,
        private studentService: StudentService,
        protected modalService: BsModalService,
        ) { }

    ngOnInit() {
        this.mainForm = new FormGroup({
            'searchValue': new FormControl(null),
        });
        this.searchValue.nativeElement.focus();

        this.params.limit = 10;
        this.params.activeStatus = "E_ACTIVE";
    }

    load(params){
        // var criteria: any = params;
        this.studentService.studentList(this.params).subscribe(data => {
            
            this.items = data['items'];
            const items = data['items'];
            this.itemCount = data['total'];
            this.dataResource = new DataTableResource(items);
        });
    }

    onSelected(item: any) {
        this.change.emit([
            item,
            ""
        ]);
    }

    onSearch() {
        // let searchValue = this.mainForm.get('searchValue').value;
        this.params.searchValue = this.mainForm.get('searchValue').value;
        this.load(this.params);
    }
    onAdd(template: TemplateRef<any>){
        this.mode = FormMode.E_ADD;
        this.modalRef = this.modalService.show(template, this.config);
    }
    onAdded($event) {
        // console.log($event);
        this.modalRef.hide();
        this.mainForm.get('searchValue').setValue($event[1]);
        this.onSearch();
    }
    onRowClick(params){
        this.change.emit([
            params.row.item
        ]);
    }
}