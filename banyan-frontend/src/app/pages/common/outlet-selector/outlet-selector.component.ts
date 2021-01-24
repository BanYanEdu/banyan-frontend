import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SettingsService } from 'app/pages/settings/settings.service';
import { FormMode } from 'app/model/common/FormMode';

@Component({
    selector: 'app-outlet-selector',
    templateUrl: './outlet-selector.component.html'
})
export class OutletSelectorComponent implements OnInit {
    @Input() uuid: string;
    @Input() firstValue: string;
    @Input() mode: FormMode;
    @Output('valueChange') change = new EventEmitter<any>();

    // defaultOutletId: string;

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

        // this.defaultOutletId = localStorage.getItem("currentOutletId");
        // console.log(this.defaultOutletId);

        this.settingsService.outletList({}).subscribe(data => {
            this.items = data['items'];
            if (this.firstValue == "E_ALL") {
                this.items.splice(0, 0, { uuid: "E_ALL", name: "<<-- Tất cả -->>", code: "" });
            }
            if (this.firstValue == "E_BLANK") {
                this.items.splice(0, 0, { uuid: "", name: "<<-- Chọn -->>", code: "" });
            }
            if (this.uuid != "") {
                this.mainForm.controls['uuid'].setValue(this.uuid);
                this.onChanged();
            } else {
            }
            if (this.mode == FormMode.E_ADD) {
                this.mainForm.controls['uuid'].setValue("");
            } 

            // this.onChanged();

        });
    }

    onChanged() {
        this.uuid = this.mainForm.controls['uuid'].value;
        // console.log("outletId: " + this.uuid);
        
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