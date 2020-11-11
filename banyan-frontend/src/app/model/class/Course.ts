import { BaseEditableMdModel } from "app/shared/models/BaseEditableMdModel";

export class Course extends BaseEditableMdModel {
    remark?: string;
    sortIndex?: number;
}