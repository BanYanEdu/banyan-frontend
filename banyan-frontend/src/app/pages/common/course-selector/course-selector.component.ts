import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SettingsService } from 'app/pages/settings/settings.service';
import { FormMode } from 'app/model/common/FormMode';
import { ClassService } from 'app/pages/class/class.service';

@Component({
    selector: 'app-course-selector',
    templateUrl: './course-selector.component.html'
})
export class CourseSelectorComponent implements OnInit, OnChanges {
    @Input() uuid: string;
    @Input() mode: FormMode;
    @Output('valueChange') change = new EventEmitter<any>();

    mainForm: FormGroup;
    items: any[];

    constructor(private classService: ClassService) { }

    ngOnInit() {
        if (this.uuid == null) {
            this.uuid = "";
        }

        this.mainForm = new FormGroup({
            'uuid': new FormControl(null),
        });

        if (this.uuid != "") {
            this.mainForm.controls['uuid'].setValue(this.uuid);            
        } else {
        }

        this.classService.courseList({}).subscribe(data => {
            this.items = data['items'];
            
            if (this.mode == FormMode.E_ADD) {
                this.uuid = "";
                this.mainForm.controls['uuid'].setValue("");
            } else {
                if (this.uuid != "") {
                    this.mainForm.controls['uuid'].setValue(this.uuid);
                    this.onChanged();
                }
            }
        });
    }

    public ngOnChanges(changes) {
        console.log("changed ...");
        console.log(this.uuid);
    }  

    onChanged() {
        this.uuid = this.mainForm.controls['uuid'].value;
        if (this.items) {
            this.change.emit([
                this.uuid,
                this.items.filter(c => c.uuid === this.uuid)[0].code,
                this.items.filter(c => c.uuid === this.uuid)[0].name
            ]);
        }
    }
}