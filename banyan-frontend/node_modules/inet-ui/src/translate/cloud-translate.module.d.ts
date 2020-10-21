import { ModuleWithProviders } from '@angular/core';
import { BsLocaleService } from "ngx-bootstrap/datepicker";
import { TranslateService } from "@ngx-translate/core";
import { CoreService } from "inet-core";
import { CloudTranslateService } from "./cloud-translate.service";
export declare class CloudTranslateModule {
    translate: TranslateService;
    localeService: BsLocaleService;
    coreService: CoreService;
    private cloudTranslate;
    static forRoot(config?: any): ModuleWithProviders;
    constructor(translate: TranslateService, localeService: BsLocaleService, coreService: CoreService, cloudTranslate: CloudTranslateService);
}
