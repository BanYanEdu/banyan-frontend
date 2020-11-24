import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormMode } from 'app/model/common/FormMode';
import { ClassService } from 'app/pages/class/class.service';

@Component({
    selector: 'app-course-selector',
    templateUrl: './course-selector.component.html'
})
export class CourseSelectorComponent implements OnInit, OnChanges {
    @Input() courseId: string;
    @Input() programId: string;
    @Input() mode: FormMode;
    @Output('valueChange') change = new EventEmitter<any>();

    mainForm: FormGroup;
    items: any[];
    id: string;

    constructor(private classService: ClassService) { }

    ngOnInit() {
        this.mainForm = new FormGroup({
            'uuid': new FormControl(null),
        });
    }

    public ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
        // console.log("Course Selector: Program changed ...");

        for (let propName in changes) {
            // let changedProp = changes[propName];
            if (propName == "programId") {
                // console.log(this.courseId);
                this.onChangeProgram();
            }
          }
    }  

    onChanged() {
        this.courseId = this.mainForm.controls['uuid'].value;
        if (this.items) {
            this.change.emit([
                this.courseId,
                this.items.filter(c => c.uuid === this.courseId)[0].code,
                this.items.filter(c => c.uuid === this.courseId)[0].name
            ]);
        }
    }

    onChangeProgram() {
        let params: any;

        if (this.programId == "") {
            params = {programId: "zzz"};
        } else {
            params = {programId: this.programId};
        }

        this.classService.courseList(params).subscribe(data => {
            this.items = data['items'];
            this.items.splice(0, 0, {uuid: "SELECTOR", name: "<-- Chọn khóa học -->"});
            if (this.mode == FormMode.E_ADD) {
                this.mainForm.controls['uuid'].setValue("SELECTOR");
            } else {
                this.mainForm.controls['uuid'].setValue(this.courseId);
            }
        });
    }
}