import { BaseEditableMdModel } from "app/shared/models/BaseEditableMdModel";
import { SchedulePatternDetail } from "./SchedulePatternDetail";

export class SchedulePattern extends BaseEditableMdModel {
    sortIndex?: number;
    remark?: string;
    doubleUnit?: boolean = false;
    breakDuration?: number = 0;
    details?: SchedulePatternDetail[];
    detailsStr?: string;
}