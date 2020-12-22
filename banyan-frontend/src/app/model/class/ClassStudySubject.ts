import { BaseEditableModel } from "app/shared/models/BaseEditableModel";

export class ClassStudySubject extends BaseEditableModel {
    classId?: string;
    studySubjectId?: string;
    studySubjectCode?: string;
    studySubjectName?: string;
    unitCount?: number=0;
    sortIndex?: number=10;
    remark?: string;
}