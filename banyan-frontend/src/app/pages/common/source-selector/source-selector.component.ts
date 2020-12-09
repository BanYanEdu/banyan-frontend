import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SettingsService } from 'app/pages/settings/settings.service';
import { FormMode } from 'app/model/common/FormMode';

@Component({
    selector: 'app-source-selector',
    templateUrl: './source-selector.component.html'
})
export class SourceSelectorComponent implements OnInit {
    @Input() uuid: string;
    @Input() mode: FormMode;
    @Output('valueChange') change = new EventEmitter<any>();

    mainForm: FormGroup;
    items: any[];
    // colorCode: string;

    constructor(private settingsService: SettingsService) { }

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

        this.settingsService.sourceList({}).subscribe(data => {
            this.items = data['items'];
            // this.items.splice(0, 0, {uuid: "", name: "<-- Chọn chi nhánh -->"});
            
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
            if (this.uuid != "") {
                this.change.emit([
                    this.uuid,
                    this.items.filter(c => c.uuid === this.uuid)[0].code,
                    this.items.filter(c => c.uuid === this.uuid)[0].name
                ]);
            } else {
                this.change.emit([
                    this.uuid,
                    "",
                    ""
                ]);
            }
        }
    }
}