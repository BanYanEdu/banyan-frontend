import { BaseEditableMdModel } from "app/shared/models/BaseEditableMdModel";

export class Contact extends BaseEditableMdModel {
    remark?: string;
    fullAddress?: string;
}