import { BaseEditableMdModel } from "app/shared/models/BaseEditableMdModel";

export class Employee extends BaseEditableMdModel {
    remark?: string;
    fullAddress?: string;
}