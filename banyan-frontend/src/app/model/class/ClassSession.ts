import { BaseEditableModel } from "app/shared/models/BaseEditableModel";
import { ClassInfo } from "./ClassInfo";

export class ClassSession extends BaseEditableModel {
    classInfo?: ClassInfo = new ClassInfo();
    classInfoStr?: string;
    date?: number;
    dateFrom?: number;
    dateTo?: number;
    hourFrom?: string;
    minuteFrom?: string;
    hourTo?: string;
    minuteTo?: string;
    status?: string;
    remark?: string;
}