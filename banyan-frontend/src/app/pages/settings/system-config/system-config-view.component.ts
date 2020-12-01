import { Component, OnInit, TemplateRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { SettingsService } from '../settings.service';
import { BaseComponent } from 'app/shared/components/BaseComponent';
import { CommonService } from 'app/shared/services/common.service';

@Component({
    selector: 'app-system-settings-view',
    templateUrl: './system-config-view.component.html',
    // styleUrls: ['./settings-view.component.scss'],
})
export class SystemConfigViewComponent extends BaseComponent implements OnInit {
    systemConfig: any = {};
    epcCodeSample: string;
    cpcCodeSample: string;
    private toolbarTranslations: any;
    private translateSubscription: Subscription;
    modalRef: BsModalRef;
    config = {
        backdrop: false,
        ignoreBackdropClick: true,
        class: 'modal-xl'
    };

    constructor(
        // private mdService: MasterDataService,
        protected commonService: CommonService,
        private settingsService: SettingsService,
        private router: Router,
        private modalService: BsModalService,
    ) {
        super(commonService);
     }

    ngOnInit() {
        this.settingsService.systemConfigList({}).subscribe(data => {
            // if the profile does not exist
            if (data['total'] == 0) {
                // Quick create the uncompleted profile
                this.systemConfig = {
                    uuid: '',
                    organId: iNet.organId
                };
                this.settingsService.systemConfigCreate(this.systemConfig).subscribe(data => {
                    this.loadSettings();
                });
            } else {
                this.loadSettings();
            }
        },
            error => {
                console.log(error);
                this.router.navigate(['home']);
            }
        );
    }

    loadSettings() {
        this.settingsService.systemConfigList({}).subscribe(data => {
            if (data['total'] > 0) {
                this.systemConfig = data['items'][0];
                
                if (this.systemConfig.employeeProfileConfig.codeAutoGenerating == true) {
                    this.epcCodeSample = this.systemConfig.employeeProfileConfig.codePrefix;
                    let codeNextNumber = this.systemConfig.employeeProfileConfig.codeNextNumber.toString();
                    for (var i=0;i<this.systemConfig.employeeProfileConfig.codeNumberLength-codeNextNumber.length;i++) {
                        this.epcCodeSample = this.epcCodeSample + '0';
                    }
                    this.epcCodeSample = this.epcCodeSample + codeNextNumber;
                }
                if (this.systemConfig.contactProfileConfig.codeAutoGenerating == true) {
                    this.cpcCodeSample = this.systemConfig.contactProfileConfig.codePrefix;
                    let codeNextNumber = this.systemConfig.contactProfileConfig.codeNextNumber.toString();
                    for (var i=0;i<this.systemConfig.contactProfileConfig.codeNumberLength-codeNextNumber.length;i++) {
                        this.cpcCodeSample = this.cpcCodeSample + '0';
                    }
                    this.cpcCodeSample = this.cpcCodeSample + codeNextNumber;
                }               
            }
        });
    }
    
    changeEmployeeProfile(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template, this.config);
    }
    showModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template, this.config);
    }
    onChanged() {
        this.modalRef.hide();
        this.loadSettings();
    }

}