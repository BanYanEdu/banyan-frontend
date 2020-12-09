import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormMode } from 'app/model/common/FormMode';
import { SettingsService } from '../settings.service';

@Component({
    selector: 'app-facility-selector',
    templateUrl: './facility-selector.component.html'
})
export class FacilitySelectorComponent implements OnInit, OnChanges {
    @Input() facilityId: string;
    @Input() outletId: string;
    @Input() mode: FormMode;
    @Output('valueChange') change = new EventEmitter<any>();

    mainForm: FormGroup;
    items: any[];
    id: string;

    constructor(private settingsService: SettingsService) { }

    ngOnInit() {
        this.mainForm = new FormGroup({
            'uuid': new FormControl(null),
        });
    }

    public ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
        for (let propName in changes) {
            // let changedProp = changes[propName];
            if (propName == "outletId") {
                // console.log(this.courseId);
                this.onChangeOutlet();
            }
          }
    }  

    onChanged() {
        this.facilityId = this.mainForm.controls['uuid'].value;
        if (this.items) {
            if (this.facilityId != "") {
                this.change.emit([
                    this.facilityId,
                    this.items.filter(c => c.uuid === this.facilityId)[0].code,
                    this.items.filter(c => c.uuid === this.facilityId)[0].name,
                    this.items.filter(c => c.uuid === this.facilityId)[0].facilityNo,
                ]);
            } else {
                this.change.emit([
                    this.facilityId,
                    "",
                    "",
                    ""
                ]);
            }
        }
    }

    onChangeOutlet() {
        let params: any;

        if (this.outletId == "") {
            params = {outletId: "zzz"};
        } else {
            params = {outletId: this.outletId};
        }

        this.settingsService.facilityList(params).subscribe(data => {
            this.items = data['items'];
            if (this.mode == FormMode.E_ADD) {
                this.mainForm.controls['uuid'].setValue("");
            } else {
                this.mainForm.controls['uuid'].setValue(this.facilityId);
            }
        });
    }
}