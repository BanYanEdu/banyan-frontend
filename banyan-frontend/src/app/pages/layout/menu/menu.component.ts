import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { EmployeeService } from 'app/pages/employee/employee.service';
import { SettingsService } from 'app/pages/settings/settings.service';
import { SystemService } from 'app/pages/system/system.service';
import { BaseComponent } from 'app/shared/components/BaseComponent';
import { NotificationType } from 'app/shared/models/NotificationType';
import { CommonService } from 'app/shared/services/common.service';
import { CoreService } from 'inet-core';
import { CloudTranslateService } from 'inet-ui';

@Component({
    selector: 'app-top-menu',
    templateUrl: './menu.component.html'
})
export class TopMenuComponent extends BaseComponent implements OnInit, OnDestroy {
    username: string;
    userDisplayName: string;
    orgName: string;
    currentLang: string;
    companyPrefix: string;
    logoUrl: string;
    employeePortalUrl: string;
    currentOutletId: string;
    currentOutletCode: string;
    currentOutletName: string;
    outlets: any[];
    myProfileUrl: string;

    // "https://calista-dev.inetcloud.vn/hrm/vinaco/banyan-lp/page/index.cpx#/home"

    constructor(
        public coreService: CoreService,
        public commonService: CommonService,
        public systemService: SystemService,
        public employeeService: EmployeeService,
        public settingsService: SettingsService,
        protected cloudTranslateService: CloudTranslateService,
        public router: Router,
        protected translate: TranslateService,
    ) {
        super(commonService);
    }

    ngOnInit() {
        this.username = iNet.username;
        this.userDisplayName = iNet.displayName;
        this.companyPrefix = iNet.firmPrefix;
        this.companyPrefix = this.companyPrefix.toUpperCase();
        this.orgName = iNet.orgName;
        this.logoUrl = this.systemService.url.calista_firm_logo_view;

        this.employeePortalUrl = "https://calista-dev.inetcloud.vn/hrm/" + iNet.firmPrefix + "/banyan-lp/page/index.cpx#/home";
        this.myProfileUrl = "https://calista-dev.inetcloud.vn/collaboration/" + iNet.firmPrefix + "/page/index.cpx#/user-profile";

        this.currentLang = this.cloudTranslateService.getCurrentLang();
        this.getUserEmployeeInfo();
    }

    ngOnDestroy() { }

    onLogout() {
        this.coreService.logout();
    }

    changeLanguage(langCode: string) {

        this.translate.use(langCode).subscribe(
            (v: any) => {
                this.currentLanguage = langCode;
                this.currentLang = langCode;
                this.cloudTranslateService.setCurrentLang(langCode);

                if (this.coreService.getEnvironment()['production']) {
                    this.coreService.updateLanguage(langCode, function () {
                        window.location.reload();
                    });
                } else {
                    console.log("Not production");
                    this.coreService.updateLanguage(langCode, function () {
                        window.location.reload();
                    });
                    // window.location.reload();
                }
            }

        );

        // this.translateService.setCurrentLang(lang);
        // console.log(this.translateService.getCurrentLang());
        // window.location.reload();
    }

    getUserEmployeeInfo() {
        if (!iNet.username) return;

        localStorage.clear();

        this.employeeService.employeePermissionProfileList({ organId: iNet.organId, username: iNet.username }).subscribe(data => {
            var items = data['items'];
            if (items) {
                var item = items[0];
                if (item) {
                    // Set Global Variable
                    localStorage.setItem("employeeId", item.employeeId);
                    if (item.outlets.length > 0) {
                        localStorage.setItem("outlets", JSON.stringify(item.outlets));
                        this.outlets = item.outlets;

                        this.setDefaultOutlet();
                    } else {
                        // Get full outlet list
                        this.settingsService.outletList({}).subscribe(data => {
                            let outletList = data['items'];
                            this.outlets = [];
                            for (let i = 0; i < outletList.length; i++) {
                                this.outlets.push(
                                    {
                                        outletId: outletList[i].uuid,
                                        outletCode: outletList[i].code,
                                        outletName: outletList[i].name,
                                    }
                                );
                            }
                            this.setDefaultOutlet();
                        });
                    }
                    // Permission Roles
                    if (item.roles.length > 0) {
                        for (let j = 0; j < item.roles.length; j++) {
                            localStorage.setItem("ROLE." + item.roles[j].roleCode, "true");
                        }
                    }

                    this.userDisplayName = item.employeeName;
                } else {
                    this.showMessage("No matching with employee profile.", "Notification", NotificationType.WARNING);
                }
            }
        });
    }

    onOutletSelected(outlet) {
        if (outlet.outletId !== this.currentOutletId) {
            localStorage.setItem("currentOutletId", outlet.outletId);
            localStorage.setItem("currentOutletCode", outlet.outletCode);
            localStorage.setItem("currentOutletName", outlet.outletName);
            this.currentOutletId = outlet.outletId;
            this.currentOutletCode = outlet.outletCode;
            this.currentOutletName = outlet.outletName;

            // return to home 
            this.router.navigate(['/home/']);
        }
    }

    setDefaultOutlet() {
        localStorage.setItem("currentOutletId", this.outlets[0].outletId);
        localStorage.setItem("currentOutletCode", this.outlets[0].outletCode);
        localStorage.setItem("currentOutletName", this.outlets[0].outletName);
        this.currentOutletId = this.outlets[0].outletId;
        this.currentOutletCode = this.outlets[0].outletCode;
        this.currentOutletName = this.outlets[0].outletName;
    }
}
