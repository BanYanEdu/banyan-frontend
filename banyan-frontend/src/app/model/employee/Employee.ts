import { BaseEditableMdModel } from "app/shared/models/BaseEditableMdModel";

export class Employee extends BaseEditableMdModel {
    remark?: string;
    fullAddress?: string;
    phoneNo?: string;
    email?: string;
    contactAddressFull?: string;
    jobTitle?: string;
    orgUnitName?: string;
    outletId?: string;
    outletCode?: string;
    outletName?: string;
    asForeigner?: boolean;
    dob?: number;
    gender?: string;
    otherName?: string;
    asLecturer?: string;
    codeAutoGenerating?: boolean;
    idCardNo?: string;
    idCardIssueDate?: number;
    idCardIssuePlace?: string;
    startedDate?: number;
    terminatedDate?: number;
    employmentStatus?: string;
    workingType?: string;
    eduLevel?: string;
    hasService?: boolean;
    serviceQualificationRemark?: string;
    yearsOfServiceExperiences?: number;
    username?: string;
}