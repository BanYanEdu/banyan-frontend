import { BaseEditableMdModel } from "app/shared/models/BaseEditableMdModel";
import { ExamSubjectLevel } from "./ExamSubjectLevel";

export class ExamSubject extends BaseEditableMdModel {
    sortIndex?: number;
    remark?: string;
    evaluationType?: string;
    maxScores?: number;
    decimals?: number;
    levels?: ExamSubjectLevel[];
    levelsStr?: string;
    
}