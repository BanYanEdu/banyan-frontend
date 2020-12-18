import { BaseEditableModel } from "app/shared/models/BaseEditableModel";

export class ClassAssignment extends BaseEditableModel {
    employeeId?: string;
    employeeCode?: string;
    employeeName?: string;
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
    assignDate?: number;
    status?: string;
    role?: string;
    remark?: string;
}

/*
    private String classId;
    private String classCode;
    private String className;
    private String courseId;
    private String courseCode;
    private String courseName;
    private String programId;
    private String programCode;
    private String programName;
    private String outletId;
    private String outletCod;
    private String outletName;
    private String employeeId;
    private String employeeCode;
    private String employeeName;
    private String status;
    private Long validDateFrom;
    private Boolean asPrimary;
    private String role;
    private String remark;

*/