import { BaseEditableMdModel } from "app/shared/models/BaseEditableMdModel";

export class Holiday extends BaseEditableMdModel {
    date?: number;
    remark?: string;
}