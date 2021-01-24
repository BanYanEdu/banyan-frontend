import { BaseEditableModel } from "app/shared/models/BaseEditableModel";
import { ClassInfo } from "../class/ClassInfo";

export class Examination extends BaseEditableModel {
    classInfo?: ClassInfo;
    classInfoStr?: string;
    name?: string;
    sortIndex?: number;
    startDate?: number;
    endDate?: number;
    status?: string;
    remark?: string;
}
