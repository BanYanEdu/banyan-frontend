import { BaseEditableMdModel } from "app/shared/models/BaseEditableMdModel";
import { SchedulePatternDetail } from "./SchedulePatternDetail";

export class SchedulePattern extends BaseEditableMdModel {
    sortIndex?: number;
    remark?: string;
    details?: SchedulePatternDetail[];
    detailsStr?: string;
}