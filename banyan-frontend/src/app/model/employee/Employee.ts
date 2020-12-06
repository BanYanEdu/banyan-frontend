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
    gender?: string;
    otherName?: string;
    asLecturer?: string;
    codeAutoGenerating?: boolean;
}

/*
private String otherName;
    private String gender;
    private Long dob;
    private Boolean asForeigner = false;
    private String jobTitle;
    private String orgUnitName;
    private String outletId;
    private String outletCode;
    private String outletName;
    private Long startedDate;
    private Long terminatedDate;
    private String phoneNo;
    private String email;
    private String contactAddressFull;
    private String idCardNo;
    private Long idCardIssueDate;
    private Long idCardIssuePlace;
    private String employmentStatus;
    private String workingType;
    private String eduLevel;
    private Boolean hasService = false;
    private String serviceQualificationRemark;
    private Double yearsOfServiceExperiences;






*/