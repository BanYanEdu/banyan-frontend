/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Address } from './address';
export class Contact {
    constructor() {
        this.address = new Address();
    }
}
if (false) {
    /** @type {?} */
    Contact.prototype.salutationType;
    /** @type {?} */
    Contact.prototype.sex;
    /** @type {?} */
    Contact.prototype.firstName;
    /** @type {?} */
    Contact.prototype.lastName;
    /** @type {?} */
    Contact.prototype.middleName;
    /** @type {?} */
    Contact.prototype.fullName;
    /** @type {?} */
    Contact.prototype.primaryEmail;
    /** @type {?} */
    Contact.prototype.officePhone;
    /** @type {?} */
    Contact.prototype.mobilePhone;
    /** @type {?} */
    Contact.prototype.homePhone;
    /** @type {?} */
    Contact.prototype.fax;
    /** @type {?} */
    Contact.prototype.dateOfBirth;
    /** @type {?} */
    Contact.prototype.fullDateOfBirth;
    /** @type {?} */
    Contact.prototype.organId;
    /** @type {?} */
    Contact.prototype.organName;
    /** @type {?} */
    Contact.prototype.title;
    /** @type {?} */
    Contact.prototype.department;
    /** @type {?} */
    Contact.prototype.contactType;
    /** @type {?} */
    Contact.prototype.leadSource;
    /** @type {?} */
    Contact.prototype.address;
    /** @type {?} */
    Contact.prototype.addressStr;
    /** @type {?} */
    Contact.prototype.description;
    /** @type {?} */
    Contact.prototype.status;
    /** @type {?} */
    Contact.prototype.uuid;
    /** @type {?} */
    Contact.prototype.type;
    /** @type {?} */
    Contact.prototype.avatar;
    /** @type {?} */
    Contact.prototype.userCode;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGFjdC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtdWkvIiwic291cmNlcyI6WyJzcmMvbW9kZWwvY29udGFjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLFdBQVcsQ0FBQztBQUVsQyxNQUFNLE9BQU8sT0FBTztJQTZCaEI7UUFDSSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFDakMsQ0FBQztDQUdKOzs7SUFqQ0csaUNBQXVCOztJQUN2QixzQkFBWTs7SUFDWiw0QkFBa0I7O0lBQ2xCLDJCQUFpQjs7SUFDakIsNkJBQW1COztJQUNuQiwyQkFBaUI7O0lBQ2pCLCtCQUFxQjs7SUFDckIsOEJBQW9COztJQUNwQiw4QkFBb0I7O0lBQ3BCLDRCQUFrQjs7SUFDbEIsc0JBQVk7O0lBQ1osOEJBQW9COztJQUNwQixrQ0FBc0I7O0lBQ3RCLDBCQUFnQjs7SUFDaEIsNEJBQWtCOztJQUNsQix3QkFBYzs7SUFDZCw2QkFBbUI7O0lBQ25CLDhCQUFvQjs7SUFDcEIsNkJBQW1COztJQUNuQiwwQkFBaUI7O0lBQ2pCLDZCQUFtQjs7SUFDbkIsOEJBQW9COztJQUNwQix5QkFBZTs7SUFDZix1QkFBYTs7SUFDYix1QkFBYTs7SUFDYix5QkFBZTs7SUFDZiwyQkFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0FkZHJlc3N9IGZyb20gJy4vYWRkcmVzcyc7XG5cbmV4cG9ydCBjbGFzcyBDb250YWN0IHtcbiAgICBzYWx1dGF0aW9uVHlwZTogc3RyaW5nO1xuICAgIHNleDogc3RyaW5nO1xuICAgIGZpcnN0TmFtZTogc3RyaW5nO1xuICAgIGxhc3ROYW1lOiBzdHJpbmc7XG4gICAgbWlkZGxlTmFtZTogc3RyaW5nO1xuICAgIGZ1bGxOYW1lOiBzdHJpbmc7XG4gICAgcHJpbWFyeUVtYWlsOiBzdHJpbmc7XG4gICAgb2ZmaWNlUGhvbmU6IG51bWJlcjtcbiAgICBtb2JpbGVQaG9uZTogc3RyaW5nO1xuICAgIGhvbWVQaG9uZTogc3RyaW5nO1xuICAgIGZheDogbnVtYmVyO1xuICAgIGRhdGVPZkJpcnRoOiBudW1iZXI7XG4gICAgZnVsbERhdGVPZkJpcnRoPzogYW55O1xuICAgIG9yZ2FuSWQ6IHN0cmluZztcbiAgICBvcmdhbk5hbWU6IHN0cmluZztcbiAgICB0aXRsZTogc3RyaW5nO1xuICAgIGRlcGFydG1lbnQ6IHN0cmluZztcbiAgICBjb250YWN0VHlwZTogc3RyaW5nO1xuICAgIGxlYWRTb3VyY2U6IHN0cmluZztcbiAgICBhZGRyZXNzOiBBZGRyZXNzO1xuICAgIGFkZHJlc3NTdHI6IHN0cmluZztcbiAgICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICAgIHN0YXR1czogc3RyaW5nO1xuICAgIHV1aWQ6IHN0cmluZztcbiAgICB0eXBlOiBzdHJpbmc7XG4gICAgYXZhdGFyOiBzdHJpbmc7XG4gICAgcmVhZG9ubHkgdXNlckNvZGU6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmFkZHJlc3MgPSBuZXcgQWRkcmVzcygpO1xuICAgIH1cblxuXG59XG4iXX0=