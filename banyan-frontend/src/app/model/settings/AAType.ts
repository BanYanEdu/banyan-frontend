import { BaseEditableMdModel } from "app/shared/models/BaseEditableMdModel";

export class AAType extends BaseEditableMdModel {
    symbol?: string;
    sortIndex?: number;
    defaultValue?: number;
    forEmloyee?: boolean;
    forContact?: boolean;
    remark?: string;
}