import { BaseEditableModel } from "app/shared/models/BaseEditableModel";
import { ClassInfo } from "./ClassInfo";

export class ClassUnitAssignment extends BaseEditableModel {
    employeeId?: string;
    employeeCode?: string;
    employeeName?: string;
    status?: string;
    role?: string;
    remark?: string;
}