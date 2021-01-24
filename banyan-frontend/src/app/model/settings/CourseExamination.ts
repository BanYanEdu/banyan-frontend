import { BaseEditableModel } from "app/shared/models/BaseEditableModel";
import { CourseExaminationItem } from "app/model/settings/CourseExaminationItem";

export class CourseExamination extends BaseEditableModel {
    courseId?: string;
    name?: string;
    sortIndex?: number;
    remark?: string;
    examinationItems?: CourseExaminationItem[];
    examinationItemsStr?: string;
}