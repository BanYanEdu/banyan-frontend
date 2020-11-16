import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent } from 'app/shared/components/BaseComponent';
import { CommonService } from 'app/shared/services/common.service';
import { CoreService } from 'inet-core';
import { CloudTranslateService } from 'inet-ui';

@Component({
    selector: 'app-top-menu',
    templateUrl: './menu.component.html'
})
export class TopMenuComponent extends BaseComponent implements OnInit, OnDestroy {
    username: string;
    currentLang: string;

    constructor(
        public coreService: CoreService,
        public commonService: CommonService,
        protected cloudTranslateService: CloudTranslateService,
        protected translate: TranslateService,
    ) {
        super(commonService);
    }

    ngOnInit() {

        this.username = iNet.username;
        // console.log('Load menu ...');
        // console.log(iNet.username);
        console.log(iNet);
        this.currentLang = this.cloudTranslateService.getCurrentLang();
    }

    ngOnDestroy() {}

    onLogout() {
        this.coreService.logout();
    }

    changeLanguage(langCode: string) {

        this.translate.use(langCode).subscribe(
            (v: any) => {
                this.currentLanguage = langCode;
                this.currentLang = langCode;
                this.cloudTranslateService.setCurrentLang(langCode);
                // window.location.reload();

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


}
