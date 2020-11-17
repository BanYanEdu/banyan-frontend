import { BaseEditableMdModel } from "app/shared/models/BaseEditableMdModel";

export class Facility extends BaseEditableMdModel {
    sortIndex?: number;
    remark?: string;
    seatCount?: number;
    outletId?: string;
    outletCode?: string;
    outletName?: string;
    facilityNo?: string;
}