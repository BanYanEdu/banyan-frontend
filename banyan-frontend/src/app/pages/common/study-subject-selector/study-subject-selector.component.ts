import { Component, OnInit, Input, Output, EventEmitter, SimpleChange, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SettingsService } from 'app/pages/settings/settings.service';
import { FormMode } from 'app/model/common/FormMode';

@Component({
    selector: 'app-study-subject-selector',
    templateUrl: './study-subject-selector.component.html'
})
export class StudySubjectSelectorComponent implements OnInit, OnChanges {
    @Input() uuid: string;
    @Input() readonly: boolean;
    @Input() mode: FormMode;
    @Output('valueChange') change = new EventEmitter<any>();
    selectedId: string;

    mainForm: FormGroup = new FormGroup({
        'uuid': new FormControl(null, [Validators.required]),
    });
    items: any[];

    constructor(private settingsService: SettingsService) { }

    ngOnInit() {
        if (this.uuid == null) {
            this.uuid = "";
        }
        if (this.uuid != "") {
            this.mainForm.controls['uuid'].setValue(this.uuid);
        } else {
        }
        
        if (this.readonly) {
            this.mainForm.controls['uuid'].disable();
        }
        this.settingsService.studySubjectList({ inactive: false }).subscribe(data => {
            this.items = data['items'];

            if (this.mode == FormMode.E_ADD) {
                this.uuid = "";
                this.mainForm.controls['uuid'].setValue("");
                this.onChanged();
            } else {
                if (this.uuid != "") {
                    this.mainForm.controls['uuid'].setValue(this.uuid);
                    this.onChanged();
                }
            }
        });
    }

    public ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
        for (let propName in changes) {
            if (propName == "uuid") {
                // console.log("UUID changed to: " + this.uuid);
                this.onChangeUUID();
            }
          }
    }

    onChanged() {
        this.selectedId = this.mainForm.controls['uuid'].value;
        if (this.items) {
            if (this.items.filter(c => c.uuid === this.selectedId)[0]) {
                // console.log("SS Selector Emit: ...");
                //  console.log(this.items.filter(c => c.uuid === this.selectedId)[0]);
                this.change.emit([
                    this.selectedId,
                    this.items.filter(c => c.uuid === this.selectedId)[0].code,
                    this.items.filter(c => c.uuid === this.selectedId)[0].name
                ]);
            } else {
                this.change.emit([
                    "",
                    "",
                    ""
                ]);
            }
        }
    }
    onChangeUUID(){
        this.mainForm.get('uuid').setValue(this.uuid);
    }
}