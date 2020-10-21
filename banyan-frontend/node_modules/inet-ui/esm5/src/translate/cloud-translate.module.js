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
var CloudTranslateModule = /** @class */ (function () {
    function CloudTranslateModule(translate, localeService, coreService, cloudTranslate) {
        this.translate = translate;
        this.localeService = localeService;
        this.coreService = coreService;
        this.cloudTranslate = cloudTranslate;
        /** @type {?} */
        var languages = listLocales();
        translate.addLangs(languages);
        /** @type {?} */
        var lang = cloudTranslate.getCurrentLang() || languages[0];
        translate.use(lang);
        //Change a locale
        this.localeService.use(lang);
        translate.get([CloudTranslateService.GRID_KEY]).subscribe((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            if (iNet.ui.grid.Grid && res) {
                iNet.applyIf(iNet.ui.grid.Grid.prototype, res[CloudTranslateService.GRID_KEY]);
            }
        }));
    }
    /**
     * @param {?=} config
     * @return {?}
     */
    CloudTranslateModule.forRoot = /**
     * @param {?=} config
     * @return {?}
     */
    function (config) {
        if (config === void 0) { config = {}; }
        return TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useClass: config.loader || CloudTransLoader,
                deps: [HttpClientService]
            }
        });
    };
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
    CloudTranslateModule.ctorParameters = function () { return [
        { type: TranslateService },
        { type: BsLocaleService },
        { type: CoreService },
        { type: CloudTranslateService }
    ]; };
    return CloudTranslateModule;
}());
export { CloudTranslateModule };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvdWQtdHJhbnNsYXRlLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtdWkvIiwic291cmNlcyI6WyJzcmMvdHJhbnNsYXRlL2Nsb3VkLXRyYW5zbGF0ZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBc0IsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzVELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDekQsT0FBTyxFQUFDLGVBQWUsRUFBRSxlQUFlLEVBQUUsZ0JBQWdCLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUN2RixPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ3RELE9BQU8sRUFBQyxXQUFXLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFDekQsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFJaEU7SUF1QkksOEJBQ1csU0FBMkIsRUFDM0IsYUFBOEIsRUFDOUIsV0FBd0IsRUFDdkIsY0FBcUM7UUFIdEMsY0FBUyxHQUFULFNBQVMsQ0FBa0I7UUFDM0Isa0JBQWEsR0FBYixhQUFhLENBQWlCO1FBQzlCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3ZCLG1CQUFjLEdBQWQsY0FBYyxDQUF1Qjs7WUFFekMsU0FBUyxHQUFHLFdBQVcsRUFBRTtRQUM3QixTQUFTLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDOztZQUUxQixJQUFJLEdBQUcsY0FBYyxDQUFDLGNBQWMsRUFBRSxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFDMUQsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVwQixpQkFBaUI7UUFDakIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFN0IsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsU0FBUzs7OztRQUFDLFVBQUEsR0FBRztZQUN6RCxJQUFJLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxHQUFHLEVBQUU7Z0JBQzFCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMscUJBQXFCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzthQUNsRjtRQUNMLENBQUMsRUFBQyxDQUFDO0lBRVAsQ0FBQzs7Ozs7SUEvQk0sNEJBQU87Ozs7SUFBZCxVQUFlLE1BQWdCO1FBQWhCLHVCQUFBLEVBQUEsV0FBZ0I7UUFDM0IsT0FBTyxlQUFlLENBQUMsT0FBTyxDQUFDO1lBQzNCLE1BQU0sRUFBRTtnQkFDSixPQUFPLEVBQUUsZUFBZTtnQkFDeEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxNQUFNLElBQUksZ0JBQWdCO2dCQUMzQyxJQUFJLEVBQUMsQ0FBQyxpQkFBaUIsQ0FBQzthQUMzQjtTQUNKLENBQUMsQ0FBQztJQUNQLENBQUM7O2dCQXJCSixRQUFRLFNBQUM7b0JBQ04sT0FBTyxFQUFFO3dCQUNMLFlBQVk7d0JBQ1osZUFBZSxDQUFDLE9BQU8sQ0FBQzs0QkFDcEIsTUFBTSxFQUFFLEVBQUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxRQUFRLEVBQUUsZ0JBQWdCLEVBQUM7eUJBQ2pFLENBQUM7cUJBQ0w7b0JBQ0QsWUFBWSxFQUFFLEVBQUU7b0JBQ2hCLE9BQU8sRUFBRSxDQUFDLGVBQWUsQ0FBQztvQkFDMUIsU0FBUyxFQUFFLENBQUMsZUFBZSxFQUFFLGdCQUFnQixFQUFFLHFCQUFxQixFQUFFLGlCQUFpQixDQUFDO2lCQUMzRjs7OztnQkFsQnlDLGdCQUFnQjtnQkFEbEQsZUFBZTtnQkFJZixXQUFXO2dCQUNYLHFCQUFxQjs7SUFpRDdCLDJCQUFDO0NBQUEsQUE3Q0QsSUE2Q0M7U0FsQ1ksb0JBQW9COzs7SUFhekIseUNBQWtDOztJQUNsQyw2Q0FBcUM7O0lBQ3JDLDJDQUErQjs7Ozs7SUFDL0IsOENBQTZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7QnNMb2NhbGVTZXJ2aWNlfSBmcm9tIFwibmd4LWJvb3RzdHJhcC9kYXRlcGlja2VyXCI7XG5pbXBvcnQge1RyYW5zbGF0ZUxvYWRlciwgVHJhbnNsYXRlTW9kdWxlLCBUcmFuc2xhdGVTZXJ2aWNlfSBmcm9tIFwiQG5neC10cmFuc2xhdGUvY29yZVwiO1xuaW1wb3J0IHtsaXN0TG9jYWxlc30gZnJvbSBcIm5neC1ib290c3RyYXBcIjtcbmltcG9ydCB7Q2xvdWRUcmFuc0xvYWRlcn0gZnJvbSBcIi4vY2xvdWQtdHJhbnMtbG9hZGVyXCI7XG5pbXBvcnQge0NvcmVTZXJ2aWNlLCBIdHRwQ2xpZW50U2VydmljZX0gZnJvbSBcImluZXQtY29yZVwiO1xuaW1wb3J0IHtDbG91ZFRyYW5zbGF0ZVNlcnZpY2V9IGZyb20gXCIuL2Nsb3VkLXRyYW5zbGF0ZS5zZXJ2aWNlXCI7XG5cbmRlY2xhcmUgbGV0IGlOZXQ6IGFueTtcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgVHJhbnNsYXRlTW9kdWxlLmZvclJvb3Qoe1xuICAgICAgICAgICAgbG9hZGVyOiB7cHJvdmlkZTogVHJhbnNsYXRlTG9hZGVyLCB1c2VDbGFzczogQ2xvdWRUcmFuc0xvYWRlcn1cbiAgICAgICAgfSlcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW10sXG4gICAgZXhwb3J0czogW1RyYW5zbGF0ZU1vZHVsZV0sXG4gICAgcHJvdmlkZXJzOiBbQnNMb2NhbGVTZXJ2aWNlLCBUcmFuc2xhdGVTZXJ2aWNlLCBDbG91ZFRyYW5zbGF0ZVNlcnZpY2UsIEh0dHBDbGllbnRTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBDbG91ZFRyYW5zbGF0ZU1vZHVsZSB7XG5cbiAgICBzdGF0aWMgZm9yUm9vdChjb25maWc6IGFueSA9IHt9KTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgICAgIHJldHVybiBUcmFuc2xhdGVNb2R1bGUuZm9yUm9vdCh7XG4gICAgICAgICAgICBsb2FkZXI6IHtcbiAgICAgICAgICAgICAgICBwcm92aWRlOiBUcmFuc2xhdGVMb2FkZXIsXG4gICAgICAgICAgICAgICAgdXNlQ2xhc3M6IGNvbmZpZy5sb2FkZXIgfHwgQ2xvdWRUcmFuc0xvYWRlcixcbiAgICAgICAgICAgICAgICBkZXBzOltIdHRwQ2xpZW50U2VydmljZV1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyB0cmFuc2xhdGU6IFRyYW5zbGF0ZVNlcnZpY2UsXG4gICAgICAgIHB1YmxpYyBsb2NhbGVTZXJ2aWNlOiBCc0xvY2FsZVNlcnZpY2UsXG4gICAgICAgIHB1YmxpYyBjb3JlU2VydmljZTogQ29yZVNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgY2xvdWRUcmFuc2xhdGU6IENsb3VkVHJhbnNsYXRlU2VydmljZVxuICAgICkge1xuICAgICAgICBsZXQgbGFuZ3VhZ2VzID0gbGlzdExvY2FsZXMoKTtcbiAgICAgICAgdHJhbnNsYXRlLmFkZExhbmdzKGxhbmd1YWdlcyk7XG5cbiAgICAgICAgbGV0IGxhbmcgPSBjbG91ZFRyYW5zbGF0ZS5nZXRDdXJyZW50TGFuZygpIHx8IGxhbmd1YWdlc1swXTtcbiAgICAgICAgdHJhbnNsYXRlLnVzZShsYW5nKTtcblxuICAgICAgICAvL0NoYW5nZSBhIGxvY2FsZVxuICAgICAgICB0aGlzLmxvY2FsZVNlcnZpY2UudXNlKGxhbmcpO1xuXG4gICAgICAgIHRyYW5zbGF0ZS5nZXQoW0Nsb3VkVHJhbnNsYXRlU2VydmljZS5HUklEX0tFWV0pLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgICAgICAgaWYgKGlOZXQudWkuZ3JpZC5HcmlkICYmIHJlcykge1xuICAgICAgICAgICAgICAgIGlOZXQuYXBwbHlJZihpTmV0LnVpLmdyaWQuR3JpZC5wcm90b3R5cGUsIHJlc1tDbG91ZFRyYW5zbGF0ZVNlcnZpY2UuR1JJRF9LRVldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICB9XG59XG4iXX0=