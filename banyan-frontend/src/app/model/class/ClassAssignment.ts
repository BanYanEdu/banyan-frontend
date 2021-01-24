import { BaseEditableModel } from "app/shared/models/BaseEditableModel";
import { ClassInfo } from "./ClassInfo";

export class ClassAssignment extends BaseEditableModel {
    employeeId?: string;
    employeeCode?: string;
    employeeName?: string;
    classInfo?: ClassInfo = new ClassInfo();
    classInfoStr?: string;
    assignDate?: number;
    status?: string;
    role?: string;
    remark?: string;
}
