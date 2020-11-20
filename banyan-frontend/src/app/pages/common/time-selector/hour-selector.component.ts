import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SettingsService } from 'app/pages/settings/settings.service';
import { FormMode } from 'app/model/common/FormMode';

@Component({
    selector: 'app-hour-selector',
    templateUrl: './hour-selector.component.html'
})
export class HourSelectorComponent implements OnInit {
    @Input() value: string;
    @Output('valueChange') change = new EventEmitter<any>();

    mainForm: FormGroup;
    items: any[] = [
        {value: '00'},
        {value: '01'},
        {value: '03'},
        {value: '04'},
        {value: '05'},
        {value: '06'},
        {value: '07'},
        {value: '08'},
        {value: '09'},
        {value: '10'},
        {value: '11'},
        {value: '12'},
        {value: '13'},
        {value: '14'},
        {value: '15'},
        {value: '16'},
        {value: '17'},
        {value: '18'},
        {value: '19'},
        {value: '20'},
        {value: '21'},
        {value: '22'},
        {value: '23'}        
    ];

    constructor() { }

    ngOnInit() {
        if (this.value == null) {
            this.value = "";
        }

        this.mainForm = new FormGroup({
            'value': new FormControl(null),
        });


        if (this.value != "") {
            this.mainForm.controls['value'].setValue(this.value);             
        } else {}
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