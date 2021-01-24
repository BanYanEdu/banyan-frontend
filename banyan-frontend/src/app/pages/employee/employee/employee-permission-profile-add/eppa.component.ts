import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BaseAddDialogComponent } from "app/shared/components/BaseAddDialogComponent"
import { CommonService } from 'app/shared/services/common.service';
import { BaseEditableMdModel } from 'app/shared/models/BaseEditableMdModel';
import { EmployeePermissionProfile } from 'app/model/employee/EmployeePermissionProfile';
import { EmployeeService } from '../../employee.service';
import { Employee } from 'app/model/employee/Employee';
import { FormMode } from 'app/model/common/FormMode';
import { Outlet } from 'app/model/settings/Outlet';
import { SettingsService } from 'app/pages/settings/settings.service';
import { NotificationType } from 'app/shared/models/NotificationType';
import { IncludingTypes } from 'app/data/global/IncludingTypes';
import { RoleTypes } from 'app/data/global/RoleTypes';

@Component({
    selector: 'app-employee-permission-profile-add',
    templateUrl: './eppa.component.html'
})
export class EmployeePermissionProfileAddComponent extends BaseAddDialogComponent<EmployeePermissionProfile>{
    @Input() employee: Employee;
    
    outletAssignmentTypeValues: string[] = IncludingTypes;
    outlets: Outlet[] = [];
    selectedOutlets: any[] = [];
    finalSelectedOutlets: any[] = [];
    outletSelection: boolean = false;
    
    roleTypes: string[] = RoleTypes;
    selectedRoles: any[] = [];
    finalSelectedRoles: any[] = [];
    
    @ViewChild("username") usernameField: ElementRef;
    
    constructor(
        element: ElementRef,
        private employeeService: EmployeeService,
        private settingsService: SettingsService,
        protected commonService: CommonService
    ) {
        super(element, commonService);
    }
    protected createMainFormGroup(): FormGroup {
        return new FormGroup({
            'username': new FormControl(null, [Validators.required]),
            'selectedRoles': new FormControl(null, [Validators.required]) ,
            'outletAssignmentType': new FormControl(null, [Validators.required]),
            'selectedOutlets': new FormControl(null),
        });
    }
    patchInitializedMainForm() {
        this.settingsService.outletList({}).subscribe( data =>
            {
                this.outlets = data['items'];
                if (this.mode == FormMode.E_EDIT) {
                    if (this.item.outlets.length > 0) {
                        for (let i=0;i<this.item.outlets.length;i++) {
                            this.selectedOutlets.push(this.item.outlets[i].outletId);
                        }
                    }
                    this.mainForm.get('selectedOutlets').setValue(this.selectedOutlets);
                    this.onChangeOutlet();
                    this.onChangeOutletAssignmentType();
                }
            }
        );

        if (this.mode == FormMode.E_EDIT) {
            if (this.item.roles.length > 0) {
                for (let i=0;i<this.item.roles.length;i++) {
                    this.selectedRoles.push(this.item.roles[i].roleCode);
                }
            }
            this.mainForm.get('selectedRoles').setValue(this.selectedRoles);
            this.onChangeRole();
        }

        this.usernameField.nativeElement.focus();
    }
    populateAdditionalFormValue(){
        this.requestItem.employeeId = this.employee.uuid;
        this.requestItem.employeeCode = this.employee.code;
        this.requestItem.employeeName = this.employee.name;
        if (!this.outletSelection) {
            this.finalSelectedOutlets = [];
        }
        this.requestItem.outletsStr = JSON.stringify(this.finalSelectedOutlets);
        this.requestItem.rolesStr = JSON.stringify(this.finalSelectedRoles);
    }
    protected callSearch(input: {code:string}, callbackFn: Function): void{
        this.employeeService.employeePermissionProfileList(input).subscribe(data => callbackFn(data));
    }
    protected callAddItem(requestItem: BaseEditableMdModel, callbackFn: Function): void{
        console.log(requestItem);        
        this.employeeService.employeePermissionProfileCreate(requestItem).subscribe(data => callbackFn(data));
    }
    protected callUpdateItem(requestItem: BaseEditableMdModel, callbackFn: Function): void{
        console.log(requestItem); 
        this.employeeService.employeePermissionProfileUpdate(requestItem).subscribe(data => callbackFn(data));
    }

    onChangeOutlet(){
        // console.log(this.mainForm.get('selectedOutlets').value);
        this.selectedOutlets = this.mainForm.get('selectedOutlets').value;
        this.finalSelectedOutlets = [];
        for (let i=0;i<this.selectedOutlets.length;i++) {
            var item:any = {};
            item.outletId = this.selectedOutlets[i];
            item.outletCode = this.outlets.filter(c => c.uuid === this.selectedOutlets[i])[0].code;
            item.outletName = this.outlets.filter(c => c.uuid === this.selectedOutlets[i])[0].name;
            this.finalSelectedOutlets.push(item);
        }
        // console.log(this.finalSelectedOutlets);
    }
    onChangeOutletAssignmentType(){
        if (this.mainForm.get('outletAssignmentType').value == "E_ALL") {
            this.outletSelection = false;
        } else {
            this.outletSelection = true;
        } 
    }
    onChangeRole(){
        this.selectedRoles = this.mainForm.get('selectedRoles').value;
        this.finalSelectedRoles = [];
        for (let i=0;i<this.selectedRoles.length;i++) {
            var item:any = {};
            item.roleId = "";
            item.roleCode = this.selectedRoles[i];
            item.roleName = "";
            this.finalSelectedRoles.push(item);
        }
    }
    startSave() {
        // Check outlets selected
        if (this.outletSelection) {
            if (this.selectedOutlets.length == 0) {
                this.showMessage("Chưa có chi nhánh nào được chọn", "Thông báo", NotificationType.WARNING);
                return;
            }
        }

        this.onSave();
    }
}