import { BaseEditableModel } from "app/shared/models/BaseEditableModel";

export class ClassTransfer extends BaseEditableModel {
    transferDate?: number;
    fromEnrollmentId?: string;
    toClassId?: string;
    transferRemark?: string;
}
