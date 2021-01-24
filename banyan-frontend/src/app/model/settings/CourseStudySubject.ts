import { BaseEditableModel } from "app/shared/models/BaseEditableModel";

export class CourseStudySubject extends BaseEditableModel {
    sortIndex?: number;
    studySubjectId?: string;
    studySubjectCode?: string;
    studySubjectName?: string;
    unitCount?: number=0;
    remark?: string;
}