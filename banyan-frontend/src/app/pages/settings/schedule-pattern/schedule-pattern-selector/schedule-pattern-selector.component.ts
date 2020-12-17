import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormMode } from 'app/model/common/FormMode';
import { SettingsService } from '../../settings.service';

@Component({
    selector: 'app-schedule-pattern-selector',
    templateUrl: './schedule-pattern-selector.component.html'
})
export class SchedulePatternSelectorComponent implements OnInit {
    @Input() uuid: string;
    @Input() mode: FormMode;
    @Output('valueChange') change = new EventEmitter<any>();

    mainForm: FormGroup;
    items: any[];

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

        this.settingsService.schedulePatternList({}).subscribe(data => {
            this.items = data['items'];
            // this.items.splice(0, 0, {uuid: "SELECTOR", name: "<-- Chọn lịch học -->"});
            
            if (this.mode == FormMode.E_ADD) {
                this.uuid = "";
                this.mainForm.controls['uuid'].setValue("SELECTOR");
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