import { OnDestroy, OnInit } from '@angular/core';
import { NotificationService, SecurityService } from 'inet-core';
import { TranslateService } from '@ngx-translate/core';
import { OrganizationService } from "../../../organization/organization.service";
import { OrganizationInformation } from "../../../model/organization-information";
import { Organization } from "../../../model/organization";
import { OrganizationGeneralInformationComponent } from "../../../organization/organization-general-information/organization-general-information.component";
export declare class BootstrapCompanyProfileComponent implements OnInit, OnDestroy {
    private orgService;
    private notification;
    private securityService;
    private translate;
    orgInfo: OrganizationInformation;
    organization: Organization;
    formValid: boolean;
    roleAccess: boolean;
    private orgTranslations;
    private translateSubscription;
    orgInfoComponent: OrganizationGeneralInformationComponent;
    constructor(orgService: OrganizationService, notification: NotificationService, securityService: SecurityService, translate: TranslateService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    load(): void;
    private setData;
    onUpdate(): void;
    onChange($event: any): void;
}
