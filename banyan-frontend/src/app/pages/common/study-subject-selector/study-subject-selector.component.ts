import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SettingsService } from 'app/pages/settings/settings.service';
import { FormMode } from 'app/model/common/FormMode';

@Component({
    selector: 'app-study-subject-selector',
    templateUrl: './study-subject-selector.component.html'
})
export class StudySubjectSelectorComponent implements OnInit {
    @Input() uuid: string;
    @Input() readonly: boolean;
    @Input() mode: FormMode;
    @Output('valueChange') change = new EventEmitter<any>();

    mainForm: FormGroup;
    items: any[];

    constructor(private settingsService: SettingsService) { }

    ngOnInit() {
        this.mainForm = new FormGroup({
            'uuid': new FormControl(null, [Validators.required]),
        });

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
            } else {
                if (this.uuid != "") {
                    this.mainForm.controls['uuid'].setValue(this.uuid);
                    this.onChanged();
                }
            }
        });
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