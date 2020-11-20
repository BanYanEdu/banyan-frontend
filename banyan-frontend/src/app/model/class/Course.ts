import { BaseEditableMdModel } from "app/shared/models/BaseEditableMdModel";
import { CourseStudySubject } from "./CourseStudySubject";

export class Course extends BaseEditableMdModel {
    remark?: string;
    sortIndex?: number;
    programId?: string;
    programCode?: string;
    programName?: string;
    unitCount?: number;
    curriculum?: string;
    checkingRequired?: boolean;
    studySubjects?: CourseStudySubject[];
}