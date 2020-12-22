import { BaseEditableModel } from "app/shared/models/BaseEditableModel";
import { CourseTestTestSubject } from "app/model/settings/CourseTestTestSubject";

export class CourseTest extends BaseEditableModel {
    courseId?: string;
    name?: string;
    sortIndex?: number;
    remark?: string;
    testSubjects?: CourseTestTestSubject[];
    testSubjectsStr?: string;
}