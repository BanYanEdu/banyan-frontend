import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SettingsService } from 'app/pages/settings/settings.service';
import { FormMode } from 'app/model/common/FormMode';

@Component({
    selector: 'app-minute-selector',
    templateUrl: './minute-selector.component.html'
})
export class MinuteSelectorComponent implements OnInit {
    @Input() value: string;
    @Input() mode: FormMode;
    @Output('valueChange') change = new EventEmitter<any>();

    mainForm: FormGroup;
    items: any[] = [
        {value: '00'},
        {value: '05'},
        {value: '10'},
        {value: '15'},
        {value: '20'},
        {value: '25'},
        {value: '30'},
        {value: '35'},
        {value: '40'},
        {value: '45'},
        {value: '50'},
        {value: '55'},     
    ];
    
    constructor(private settingsService: SettingsService) { }

    ngOnInit() {
        if (this.value == null) {
            this.value = "";
        }

        this.mainForm = new FormGroup({
            'value': new FormControl(null),
        });

        if (this.value != "") {
            this.mainForm.controls['value'].setValue(this.value);     
        } else {
        }
    }

    onChanged() {
        this.value = this.mainForm.controls['value'].value;
        if (this.items) {
            this.change.emit([
                this.value
            ]);
        }
    }
}