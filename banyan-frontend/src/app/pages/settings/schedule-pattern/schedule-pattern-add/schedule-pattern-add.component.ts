import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BaseAddDialogComponent } from "app/shared/components/BaseAddDialogComponent"
import { CommonService } from 'app/shared/services/common.service';
import { BaseEditableMdModel } from 'app/shared/models/BaseEditableMdModel';
import { SchedulePattern } from 'app/model/settings/SchedulePattern';
import { SchedulePatternDetail } from 'app/model/settings/SchedulePatternDetail';
import { FormMode } from 'app/model/common/FormMode';
import { NotificationType } from 'app/shared/models/NotificationType';
import { SettingsService } from '../../settings.service';

@Component({
    selector: 'app-schedule-pattern-add',
    templateUrl: './schedule-pattern-add.component.html'
})
export class SchedulePaternAddComponent extends BaseAddDialogComponent<SchedulePattern>{
    details: SchedulePatternDetail[] = [];
    @ViewChild("code") codeField: ElementRef;
    @ViewChild("name") nameField: ElementRef;

    constructor(
        element: ElementRef,
        private settingsService: SettingsService,
        protected commonService: CommonService
    ) {
        super(element, commonService);
    }
    protected createMainFormGroup(): FormGroup {
        return new FormGroup({
            'code': new FormControl(null, [Validators.required]),
            'name': new FormControl(null, [Validators.required]),
            'sortIndex': new FormControl(null, [Validators.required]),
            'inactive': new FormControl(null),
            'doubleUnit': new FormControl(null),
            'breakDuration': new FormControl(null, [Validators.required]),
        });
    }
    protected callSearch(input: { code: string }, callbackFn: Function): void {
        this.settingsService.schedulePatternList(input).subscribe(data => callbackFn(data));
    }
    protected callAddItem(requestItem: BaseEditableMdModel, callbackFn: Function): void {
        this.settingsService.schedulePatternCreate(requestItem).subscribe(data => callbackFn(data));
    }
    protected callUpdateItem(requestItem: BaseEditableMdModel, callbackFn: Function): void {
        this.settingsService.schedulePatternUpdate(requestItem).subscribe(data => callbackFn(data));
    }

    protected patchInitializedMainForm() {
        if (this.mode == FormMode.E_ADD) {
            this.codeField.nativeElement.focus();
            this.mainForm.get('doubleUnit').setValue(true);
            this.mainForm.get('breakDuration').setValue(15);
        } else {
            this.details = this.requestItem.details;
            this.nameField.nativeElement.focus();
        }
    };

    populateAdditionalFormValue() {
        this.requestItem.detailsStr = JSON.stringify(this.details);
    }

    startSave() {
        // let ok = true;
        // must check at least one day
        for (let i = 0; i < this.details.length; i++) {
            // At least one week day should be selected
            if (this.details[i].onMon || this.details[i].onTue || this.details[i].onWed || this.details[i].onThu || this.details[i].onFri || this.details[i].onSat || this.details[i].onSun) {
            } else {
                this.showMessage('Bạn chưa chọn ngày ở trên lưới.', 'Cảnh báo', NotificationType.ERROR);
                return;
            }
            // Check From <= To
            let hourFrom = Number(this.details[i].hourFrom);
            let minuteFrom = Number(this.details[i].minuteFrom);
            let hourTo = Number(this.details[i].hourTo);
            let minuteTo = Number(this.details[i].minuteTo);
            if ((hourTo * 60 + minuteTo) < (hourFrom * 60 + minuteFrom)) {
                this.showMessage('Thời gian từ phải nhỏ hơn hoặc bằng thời gian đến.', 'Cảnh báo', NotificationType.ERROR);
                return;
            }
            // Check Unit Count
            if (!this.details[i].unitCount || this.details[i].unitCount == 0) {
                this.showMessage('Số tiết phải lớn hơn 0.', 'Cảnh báo', NotificationType.WARNING);
                return;
            }
            if (this.details[i].unitCount > 10) {
                this.showMessage('Số tiết không được vượt quá 10.', 'Cảnh báo', NotificationType.WARNING);
                return;
            }
        }

        // console.log(this.requestItem)
        this.onSave();
    }

    onAddRow() {
        this.details.push({
            onMon: false,
            onTue: false,
            onWed: false,
            onThu: false,
            onFri: false,
            onSat: false,
            onSun: false,
            unitCount: 2,
            hourFrom: '08',
            minuteFrom: '00',
            // hourTo: hourTo,
            // minuteTo: minuteTo
        });
    }
    onDeleteRow(i: number) {
        this.details.splice(i, 1);
    }
    onChangeHour(data: string, i: number, params: any) {
        if (data == "E_FROM") {
            this.details[i].hourFrom = params[0];
        } else {
            this.details[i].hourTo = params[0];
        }
    }
    onChangeMinute(data: string, i: number, params: any) {
        if (data == "E_FROM") {
            this.details[i].minuteFrom = params[0];
        } else {
            this.details[i].minuteTo = params[0];
        }
    }
}