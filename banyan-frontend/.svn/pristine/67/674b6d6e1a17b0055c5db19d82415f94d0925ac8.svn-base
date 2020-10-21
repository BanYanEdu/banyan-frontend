/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsLocaleService } from "ngx-bootstrap/datepicker";
import { TranslateLoader, TranslateModule, TranslateService } from "@ngx-translate/core";
import { listLocales } from "ngx-bootstrap";
import { CloudTransLoader } from "./cloud-trans-loader";
import { CoreService, HttpClientService } from "inet-core";
import { CloudTranslateService } from "./cloud-translate.service";
export class CloudTranslateModule {
    /**
     * @param {?} translate
     * @param {?} localeService
     * @param {?} coreService
     * @param {?} cloudTranslate
     */
    constructor(translate, localeService, coreService, cloudTranslate) {
        this.translate = translate;
        this.localeService = localeService;
        this.coreService = coreService;
        this.cloudTranslate = cloudTranslate;
        /** @type {?} */
        let languages = listLocales();
        translate.addLangs(languages);
        /** @type {?} */
        let lang = cloudTranslate.getCurrentLang() || languages[0];
        translate.use(lang);
        //Change a locale
        this.localeService.use(lang);
        translate.get([CloudTranslateService.GRID_KEY]).subscribe((/**
         * @param {?} res
         * @return {?}
         */
        res => {
            if (iNet.ui.grid.Grid && res) {
                iNet.applyIf(iNet.ui.grid.Grid.prototype, res[CloudTranslateService.GRID_KEY]);
            }
        }));
    }
    /**
     * @param {?=} config
     * @return {?}
     */
    static forRoot(config = {}) {
        return TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useClass: config.loader || CloudTransLoader,
                deps: [HttpClientService]
            }
        });
    }
}
CloudTranslateModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    TranslateModule.forRoot({
                        loader: { provide: TranslateLoader, useClass: CloudTransLoader }
                    })
                ],
                declarations: [],
                exports: [TranslateModule],
                providers: [BsLocaleService, TranslateService, CloudTranslateService, HttpClientService]
            },] }
];
/** @nocollapse */
CloudTranslateModule.ctorParameters = () => [
    { type: TranslateService },
    { type: BsLocaleService },
    { type: CoreService },
    { type: CloudTranslateService }
];
if (false) {
    /** @type {?} */
    CloudTranslateModule.prototype.translate;
    /** @type {?} */
    CloudTranslateModule.prototype.localeService;
    /** @type {?} */
    CloudTranslateModule.prototype.coreService;
    /**
     * @type {?}
     * @private
     */
    CloudTranslateModule.prototype.cloudTranslate;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvdWQtdHJhbnNsYXRlLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtdWkvIiwic291cmNlcyI6WyJzcmMvdHJhbnNsYXRlL2Nsb3VkLXRyYW5zbGF0ZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBc0IsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzVELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDekQsT0FBTyxFQUFDLGVBQWUsRUFBRSxlQUFlLEVBQUUsZ0JBQWdCLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUN2RixPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ3RELE9BQU8sRUFBQyxXQUFXLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFDekQsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFlaEUsTUFBTSxPQUFPLG9CQUFvQjs7Ozs7OztJQVk3QixZQUNXLFNBQTJCLEVBQzNCLGFBQThCLEVBQzlCLFdBQXdCLEVBQ3ZCLGNBQXFDO1FBSHRDLGNBQVMsR0FBVCxTQUFTLENBQWtCO1FBQzNCLGtCQUFhLEdBQWIsYUFBYSxDQUFpQjtRQUM5QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN2QixtQkFBYyxHQUFkLGNBQWMsQ0FBdUI7O1lBRXpDLFNBQVMsR0FBRyxXQUFXLEVBQUU7UUFDN0IsU0FBUyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQzs7WUFFMUIsSUFBSSxHQUFHLGNBQWMsQ0FBQyxjQUFjLEVBQUUsSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQzFELFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFcEIsaUJBQWlCO1FBQ2pCLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRTdCLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFNBQVM7Ozs7UUFBQyxHQUFHLENBQUMsRUFBRTtZQUM1RCxJQUFJLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxHQUFHLEVBQUU7Z0JBQzFCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMscUJBQXFCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzthQUNsRjtRQUNMLENBQUMsRUFBQyxDQUFDO0lBRVAsQ0FBQzs7Ozs7SUEvQkQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFjLEVBQUU7UUFDM0IsT0FBTyxlQUFlLENBQUMsT0FBTyxDQUFDO1lBQzNCLE1BQU0sRUFBRTtnQkFDSixPQUFPLEVBQUUsZUFBZTtnQkFDeEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxNQUFNLElBQUksZ0JBQWdCO2dCQUMzQyxJQUFJLEVBQUMsQ0FBQyxpQkFBaUIsQ0FBQzthQUMzQjtTQUNKLENBQUMsQ0FBQztJQUNQLENBQUM7OztZQXJCSixRQUFRLFNBQUM7Z0JBQ04sT0FBTyxFQUFFO29CQUNMLFlBQVk7b0JBQ1osZUFBZSxDQUFDLE9BQU8sQ0FBQzt3QkFDcEIsTUFBTSxFQUFFLEVBQUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxRQUFRLEVBQUUsZ0JBQWdCLEVBQUM7cUJBQ2pFLENBQUM7aUJBQ0w7Z0JBQ0QsWUFBWSxFQUFFLEVBQUU7Z0JBQ2hCLE9BQU8sRUFBRSxDQUFDLGVBQWUsQ0FBQztnQkFDMUIsU0FBUyxFQUFFLENBQUMsZUFBZSxFQUFFLGdCQUFnQixFQUFFLHFCQUFxQixFQUFFLGlCQUFpQixDQUFDO2FBQzNGOzs7O1lBbEJ5QyxnQkFBZ0I7WUFEbEQsZUFBZTtZQUlmLFdBQVc7WUFDWCxxQkFBcUI7Ozs7SUE0QnJCLHlDQUFrQzs7SUFDbEMsNkNBQXFDOztJQUNyQywyQ0FBK0I7Ozs7O0lBQy9CLDhDQUE2QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0JzTG9jYWxlU2VydmljZX0gZnJvbSBcIm5neC1ib290c3RyYXAvZGF0ZXBpY2tlclwiO1xuaW1wb3J0IHtUcmFuc2xhdGVMb2FkZXIsIFRyYW5zbGF0ZU1vZHVsZSwgVHJhbnNsYXRlU2VydmljZX0gZnJvbSBcIkBuZ3gtdHJhbnNsYXRlL2NvcmVcIjtcbmltcG9ydCB7bGlzdExvY2FsZXN9IGZyb20gXCJuZ3gtYm9vdHN0cmFwXCI7XG5pbXBvcnQge0Nsb3VkVHJhbnNMb2FkZXJ9IGZyb20gXCIuL2Nsb3VkLXRyYW5zLWxvYWRlclwiO1xuaW1wb3J0IHtDb3JlU2VydmljZSwgSHR0cENsaWVudFNlcnZpY2V9IGZyb20gXCJpbmV0LWNvcmVcIjtcbmltcG9ydCB7Q2xvdWRUcmFuc2xhdGVTZXJ2aWNlfSBmcm9tIFwiLi9jbG91ZC10cmFuc2xhdGUuc2VydmljZVwiO1xuXG5kZWNsYXJlIGxldCBpTmV0OiBhbnk7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIFRyYW5zbGF0ZU1vZHVsZS5mb3JSb290KHtcbiAgICAgICAgICAgIGxvYWRlcjoge3Byb3ZpZGU6IFRyYW5zbGF0ZUxvYWRlciwgdXNlQ2xhc3M6IENsb3VkVHJhbnNMb2FkZXJ9XG4gICAgICAgIH0pXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtdLFxuICAgIGV4cG9ydHM6IFtUcmFuc2xhdGVNb2R1bGVdLFxuICAgIHByb3ZpZGVyczogW0JzTG9jYWxlU2VydmljZSwgVHJhbnNsYXRlU2VydmljZSwgQ2xvdWRUcmFuc2xhdGVTZXJ2aWNlLCBIdHRwQ2xpZW50U2VydmljZV1cbn0pXG5leHBvcnQgY2xhc3MgQ2xvdWRUcmFuc2xhdGVNb2R1bGUge1xuXG4gICAgc3RhdGljIGZvclJvb3QoY29uZmlnOiBhbnkgPSB7fSk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgICAgICByZXR1cm4gVHJhbnNsYXRlTW9kdWxlLmZvclJvb3Qoe1xuICAgICAgICAgICAgbG9hZGVyOiB7XG4gICAgICAgICAgICAgICAgcHJvdmlkZTogVHJhbnNsYXRlTG9hZGVyLFxuICAgICAgICAgICAgICAgIHVzZUNsYXNzOiBjb25maWcubG9hZGVyIHx8IENsb3VkVHJhbnNMb2FkZXIsXG4gICAgICAgICAgICAgICAgZGVwczpbSHR0cENsaWVudFNlcnZpY2VdXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgdHJhbnNsYXRlOiBUcmFuc2xhdGVTZXJ2aWNlLFxuICAgICAgICBwdWJsaWMgbG9jYWxlU2VydmljZTogQnNMb2NhbGVTZXJ2aWNlLFxuICAgICAgICBwdWJsaWMgY29yZVNlcnZpY2U6IENvcmVTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGNsb3VkVHJhbnNsYXRlOiBDbG91ZFRyYW5zbGF0ZVNlcnZpY2VcbiAgICApIHtcbiAgICAgICAgbGV0IGxhbmd1YWdlcyA9IGxpc3RMb2NhbGVzKCk7XG4gICAgICAgIHRyYW5zbGF0ZS5hZGRMYW5ncyhsYW5ndWFnZXMpO1xuXG4gICAgICAgIGxldCBsYW5nID0gY2xvdWRUcmFuc2xhdGUuZ2V0Q3VycmVudExhbmcoKSB8fCBsYW5ndWFnZXNbMF07XG4gICAgICAgIHRyYW5zbGF0ZS51c2UobGFuZyk7XG5cbiAgICAgICAgLy9DaGFuZ2UgYSBsb2NhbGVcbiAgICAgICAgdGhpcy5sb2NhbGVTZXJ2aWNlLnVzZShsYW5nKTtcblxuICAgICAgICB0cmFuc2xhdGUuZ2V0KFtDbG91ZFRyYW5zbGF0ZVNlcnZpY2UuR1JJRF9LRVldKS5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgICAgICAgIGlmIChpTmV0LnVpLmdyaWQuR3JpZCAmJiByZXMpIHtcbiAgICAgICAgICAgICAgICBpTmV0LmFwcGx5SWYoaU5ldC51aS5ncmlkLkdyaWQucHJvdG90eXBlLCByZXNbQ2xvdWRUcmFuc2xhdGVTZXJ2aWNlLkdSSURfS0VZXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgfVxufVxuIl19