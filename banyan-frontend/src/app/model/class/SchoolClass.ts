import { BaseEditableMdModel } from "app/shared/models/BaseEditableMdModel";
import { CourseStudySubject } from "./CourseStudySubject";

export class SchoolClass extends BaseEditableMdModel {
    outletId?: string;
    outletCode?: string;
    outletName?: string;
    programId?: string;
    programCode?: string;
    programName?: string;
    courseId?: string;
    courseCode?: string;
    courseName?: string;
    checkingRequired?: boolean;
    unitCount?: number;
    weekCount?: number;
    curriculum?: string;
    plannedStartDate?: number;
    plannedEndDate?: number;
    actualStartDate?: number;
    actualEndDate?: number;
    schedulePatternId?: string;
    schedulePatternCode?: string;
    schedulePatternName?: string;
    minHeadCount?: number;
    maxHeadCount?: number;
    defaultFee?: number;
    remark?: string;
    studySubjects?: CourseStudySubject[];
}

  