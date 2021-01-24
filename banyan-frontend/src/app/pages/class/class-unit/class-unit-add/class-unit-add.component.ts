import { Component, ElementRef, Input, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BaseAddDialogComponent } from "app/shared/components/BaseAddDialogComponent"
import { CommonService } from 'app/shared/services/common.service';
import { BaseEditableMdModel } from 'app/shared/models/BaseEditableMdModel';
import { FormMode } from 'app/model/common/FormMode';
import { Router } from '@angular/router';
import { ClassService } from '../../class.service';
import { ClassInfo } from 'app/model/class/ClassInfo';
import { ClassUnit } from 'app/model/class/ClassUnit';
import { ClassUnitStatuses } from 'app/data/global/ClassUnitStatuses';
import { ClassUnitAssignment } from 'app/model/class/ClassUnitAssignment';
import { SchoolClass } from 'app/model/class/SchoolClass';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
    selector: 'app-class-unit-add',
    templateUrl: './class-unit-add.component.html'
})
export class ClassUnitAddComponent extends BaseAddDialogComponent<ClassUnit> {
    @Input() classId: string;
    @Input() inputItem: ClassUnit;
    @Input() class: SchoolClass;
    @Input() classStudySubjects: any[];
    @Input() classLecturers: any[];

    classInfo: ClassInfo = new ClassInfo();
    statuses: any[] = ClassUnitStatuses;
    assignment: ClassUnitAssignment = new ClassUnitAssignment();
    classUnitAssignments: ClassUnitAssignment[] = [];
    classUnitAssignmentsStr: string;

    modalRef: BsModalRef;
    config = {
        backdrop: false,
        ignoreBackdropClick: true,
        class: 'modal-xl'
    };

    constructor(
        element: ElementRef,
        private classService: ClassService,
        private modalService: BsModalService,
        protected commonService: CommonService,
        protected router: Router
    ) {
        super(element, commonService);
    }
    protected createMainFormGroup(): FormGroup {
        return new FormGroup({
            'studySubjectId': new FormControl(null, [Validators.required]),
            'employeeId': new FormControl(null),
            'status': new FormControl(null, [Validators.required]),
            'remark': new FormControl(null),
        });
    }

    protected patchInitializedMainForm() {
        if (this.mode == FormMode.E_ADD) {
        } else {
            // this.item = this.inputItem;
            this.item = new ClassUnit();
            Object.assign(this.item, this.inputItem);

            this.requestItem = this.item;
            this.mainForm.patchValue(this.item);
            this.classInfo = this.item.classInfo;
            this.assignment = this.item.assignments[0];
            if (this.assignment) {
                this.mainForm.get('employeeId').setValue(this.assignment.employeeId);
            }
            if (this.inputItem.status == "E_PLANNING") {
                this.mainForm.get('status').setValue("E_PLANNED");
            }
        }
    }
    protected populateAdditionalFormValue() {
        // this.requestItem.organId = iNet.organId;
        this.requestItem.classInfoStr = JSON.stringify(this.classInfo);
        this.classUnitAssignments.push(this.assignment);
        this.requestItem.assignmentsStr = JSON.stringify(this.classUnitAssignments);
    }
    protected callSearch(input: { code: string }, callbackFn: Function): void {
        this.classService.unitList(input).subscribe(data => callbackFn(data));
    }
    protected callAddItem(requestItem: BaseEditableMdModel, callbackFn: Function): void {
        this.classService.unitCreate(requestItem).subscribe(data => callbackFn(data));
    }
    protected callUpdateItem(requestItem: BaseEditableMdModel, callbackFn: Function): void {
        this.classService.unitUpdate(requestItem).subscribe(data => callbackFn(data));
    }

    onStudySubjectChanged() {
        this.requestItem.studySubjectCode = this.classStudySubjects.filter(c => c.studySubjectId === this.mainForm.get('studySubjectId').value)[0].studySubjectCode;
        this.requestItem.studySubjectName = this.classStudySubjects.filter(c => c.studySubjectId === this.mainForm.get('studySubjectId').value)[0].studySubjectName;
    }

    onStatusChanged() {
    }

    onLecturerChanged() {
        this.assignment = {
            employeeId: this.mainForm.get('employeeId').value,
            employeeCode: this.classLecturers.filter(c => c.employeeId === this.mainForm.get('employeeId').value)[0].employeeCode,
            employeeName: this.classLecturers.filter(c => c.employeeId === this.mainForm.get('employeeId').value)[0].employeeName,
            role: this.classLecturers.filter(c => c.employeeId === this.mainForm.get('employeeId').value)[0].role,
        }
    }

    onSubjectSelected(subject: any) {
        this.mainForm.get('studySubjectId').setValue(subject.studySubjectId);

        this.requestItem.studySubjectCode = subject.studySubjectCode;
        this.requestItem.studySubjectName = subject.studySubjectName;
    }
    onLecturerSelected(lecturer: any) {
        this.mainForm.get('employeeId').setValue(lecturer.employeeId);

        this.assignment = {
            employeeId: lecturer.employeeId,
            employeeCode: lecturer.employeeCode,
            employeeName: lecturer.employeeName,
            role: lecturer.role
        }
    }
    searchEmployee(template: TemplateRef<any>) {
        this.config.class = "modal-search";
        this.modalRef = this.modalService.show(template, this.config);
    }
    onEmployeeSelected(event) {
        this.mainForm.get('employeeId').setValue(event[0].uuid);

        this.assignment = {
            employeeId: event[0].uuid,
            employeeCode: event[0].code,
            employeeName: event[0].name,
            role: 'E_TEMP'
        }

        this.modalRef.hide();
    }
}