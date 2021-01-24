import { BaseEditableModel } from "app/shared/models/BaseEditableModel";
import { ClassInfo } from "./ClassInfo";

export class ClassEnrollment extends BaseEditableModel {
    contactId?: string;
    contactCode?: string;
    contactName?: string;
    classInfo?: ClassInfo = new ClassInfo();
    classInfoStr?: string;
    enrollmentDate?: number;
    status?: string;
    remark?: string;
    hasDebt?: boolean;
    debtAmount?: number;
    studyMaterialStatus?: string;
    fromClassId?: string;
    toClassId?: string;
}