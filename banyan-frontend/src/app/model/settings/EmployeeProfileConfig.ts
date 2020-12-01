import { BaseEditableMdModel } from "app/shared/models/BaseEditableMdModel";
export class EmployeeProfileConfig extends BaseEditableMdModel {
    codeAutoGenerating?: boolean;
    codePrefix?: string;
    codeNumberLength?: number;
    codeNextNumber?: number;
}