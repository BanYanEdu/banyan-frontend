import { BaseEditableMdModel } from "app/shared/models/BaseEditableMdModel";

export class Contact extends BaseEditableMdModel {
    remark?: string;
    type?: string;
    gender?: string;
    dob?: number;
    outletId?: string;
    outletCode?: string;
    outletName?: string;
    phoneNo?: string;
    email?: string;
    contactAddressFull?: string;
    permanentAddressFull?: string;
    occupationDesc?: string;
    sourceId?: string;
    sourceCode?: string;
    sourceName?: string;
    idCardNo?: string;
    idCardIssueDate?: number;
    idCardIssuePlace?: number;
    codeAutoGenerating?: boolean;
}


/*
    private String jobTitle;        // for E_PERSON
    private String companyName;     // for E_PERSON
    private String companyId;       // for E_PERSON
    private String companyCode;     // for E_PERSON
    private String imageUrl;
    //    private String customerStatus;
//    private String prospectStatus;
    private String ownerId;
    private String ownerCode;
    private String ownerName;
    //    private String industryId;
//    private String industryCode;
//    private String industryName;
    private String originalSource;  // E_LEAD_CONVERSION, E_DATA_ENTRY, E_DATA_IMPORT
    private String leadId;
    private String leadName;
    // Education Management System;
    private String otherName;
    private Boolean asForeigner = false;
    private Long startedDate;

*/