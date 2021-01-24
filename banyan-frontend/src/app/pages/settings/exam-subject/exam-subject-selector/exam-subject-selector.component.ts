import { Component, OnInit, Input, Output, EventEmitter, SimpleChange, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SettingsService } from 'app/pages/settings/settings.service';
import { FormMode } from 'app/model/common/FormMode';

@Component({
    selector: 'app-exam-subject-selector',
    templateUrl: './exam-subject-selector.component.html'
})
export class ExamSubjectSelectorComponent implements OnInit, OnChanges {
    @Input() uuid: string;
    @Input() readonly: boolean;
    @Input() mode: FormMode;
    @Output('valueChange') change = new EventEmitter<any>();

    mainForm: FormGroup = new FormGroup({
        'uuid': new FormControl(null, [Validators.required]),
    });
    items: any[];

    constructor(private settingsService: SettingsService) {
     }

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
        this.settingsService.examSubjectList({ inactive: false }).subscribe(data => {
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

    public ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
        for (let propName in changes) {
            if (propName == "uuid") {
                this.onChangeUUID();
            }
          }
    }

    onChangeUUID(){
        this.mainForm.get('uuid').setValue(this.uuid);
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