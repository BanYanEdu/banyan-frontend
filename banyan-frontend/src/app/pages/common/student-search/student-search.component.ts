import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SettingsService } from 'app/pages/settings/settings.service';
import { FormMode } from 'app/model/common/FormMode';
import { StudentService } from 'app/pages/student/student.service';
import { DataTableResource } from 'inet-ui';

@Component({
    selector: 'app-student-search',
    templateUrl: './student-search.component.html'
})
export class StudentSearchComponent implements OnInit {
    @Input() uuid: string;
    // @Input() mode: FormMode;
    @Output('valueChange') change = new EventEmitter<any>();

    mainForm: FormGroup;
    dataResource = new DataTableResource([]);
    items = [];
    itemCount = 0;
    pageNumber = 1;
    mode: FormMode;
    protected params: any; // to reload data

    constructor(
        private settingsService: SettingsService,
        private studentService: StudentService
        ) { }

    ngOnInit() {
        this.mainForm = new FormGroup({
            'searchField': new FormControl(null),
        });

    }

    load(){
        this.studentService.studentList({inactive: false}).subscribe(data => {
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
}