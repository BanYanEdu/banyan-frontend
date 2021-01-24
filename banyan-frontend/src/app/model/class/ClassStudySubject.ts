import { BaseEditableModel } from "app/shared/models/BaseEditableModel";
import { ClassInfo } from "./ClassInfo";

export class ClassStudySubject extends BaseEditableModel {
    classInfo?: ClassInfo;
    classInfoStr?: string;
    studySubjectId?: string;
    studySubjectCode?: string;
    studySubjectName?: string;
    unitCount?: number=0;
    sortIndex?: number=10;
    remark?: string;
}