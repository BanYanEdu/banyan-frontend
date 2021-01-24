import { BaseEditableMdModel } from "app/shared/models/BaseEditableMdModel";

export class Holiday extends BaseEditableMdModel {
    year?: number;
    date?: number;
    remark?: string;
    type?: string = "E_HOLIDAY";
}