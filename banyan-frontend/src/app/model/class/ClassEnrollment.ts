import { BaseEditableModel } from "app/shared/models/BaseEditableModel";

export class ClassEnrollment extends BaseEditableModel {
    contactId?: string;
    contactCode?: string;
    contactName?: string;
    classId?: string;
    classCode?: string;
    className?: string;
    outletId?: string;
    outletCode?: string;
    outletName?: string;
    programId?: string;
    programCode?: string;
    programName?: string;
    courseId?: string;
    courseCode?: string;
    courseName?: string;
    enrollmentDate?: number;
    status?: string;
    remark?: string;
    hasDebt?: boolean;
    debtAmount?: number;
    fromClassId?: string;
    toClassId?: string;
}

/*
 private String contactId;
    private String contactCode;
    private String contactName;
    private String classId;
    private String classCode;
    private String className;
    private Long enrollmentDate;
    private String status;
    private String remark;

*/