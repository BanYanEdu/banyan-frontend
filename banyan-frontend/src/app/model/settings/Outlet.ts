import { BaseEditableMdModel } from "app/shared/models/BaseEditableMdModel";
import { ContactInfo } from "app/shared/models/ContactInfo";
import { AddressInfo } from "app/shared/models/AddressInfo";
export class Outlet extends BaseEditableMdModel {
    sortIndex?: number;
    remark?: string;
    workingTimes?: string;
    addressInfo?: AddressInfo;
    contactInfo?: ContactInfo
    // fullAddress?: string;
}