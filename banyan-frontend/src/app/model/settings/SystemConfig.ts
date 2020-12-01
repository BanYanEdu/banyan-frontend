import { BaseEditableMdModel } from "app/shared/models/BaseEditableMdModel";
import { ContactProfileConfig } from "./ContactProfileConfig";
import { EmployeeProfileConfig } from "./EmployeeProfileConfig";
export class SystemConfig extends BaseEditableMdModel {
    employeeProfleConfig?: EmployeeProfileConfig;
    contactProfileConfig?: ContactProfileConfig;
}