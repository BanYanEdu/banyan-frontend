import { BaseEditableModel } from "./BaseEditableModel";

export class BaseEditableMdModel extends BaseEditableModel {
    code?: string;
    name?: string;    
    inactive?: boolean;
}