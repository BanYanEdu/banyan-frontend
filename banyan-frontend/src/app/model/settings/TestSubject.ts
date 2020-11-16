import { BaseEditableMdModel } from "app/shared/models/BaseEditableMdModel";
import { TestSubjectLevel } from "./TestSubjectLevel";

export class TestSubject extends BaseEditableMdModel {
    sortIndex?: number;
    remark?: string;
    evaluationType?: string;
    maxScores?: number;
    decimals?: number;
    levels?: TestSubjectLevel[];
    levelsStr?: string;
    
}