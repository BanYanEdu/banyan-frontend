import { BaseEditableModel } from "app/shared/models/BaseEditableModel";
import { ClassInfo } from "./ClassInfo";
import { ClassUnitAssignment } from "./ClassUnitAssignment";

export class ClassUnit extends BaseEditableModel {
    classInfo?: ClassInfo = new ClassInfo();
    classInfoStr?: string;
    date?: number;
    dateFrom?: number;
    dateTo?: number;
    hourFrom?: string;
    minuteFrom?: string;
    hourTo?: string;
    minuteTo?: string;
    status?: string;
    remark?: string;
    checkAttendance?: boolean;
    studySubjectId?: string;
    studySubjectCode?: string;
    studySubjectName?: string;
    facilityId?: string;
    facilityCode?: string;
    facilityName?: string;
    facilityNo?: string;
    assignments?: ClassUnitAssignment[];
    assignmentsStr?: string;
}