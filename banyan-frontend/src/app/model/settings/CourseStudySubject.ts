import { BaseEditableModel } from "app/shared/models/BaseEditableModel";

export class CourseStudySubject extends BaseEditableModel {
    studySubjectId?: string;
    studySubjectCode?: string;
    studySubjectName?: string;
    unitCount?: number=0;
    remark?: string;
}