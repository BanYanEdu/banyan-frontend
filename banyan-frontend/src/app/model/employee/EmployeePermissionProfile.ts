import { BaseEditableModel } from "app/shared/models/BaseEditableModel";

export class EmployeePermissionProfile extends BaseEditableModel {
    employeeId?: string;
    employeeCode?: string;
    employeeName?: string;
    username?: string;
    asSuperAdmin?: boolean = false;
    outletAssignmentType?: string; // E_ALL; E_INCLUDE; E_EXCLUDE
    outlets?: any[] = [];
    roles?: any[] = [];
    outletsStr?: string;
    rolesStr?: string;
}