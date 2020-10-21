/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewerComponent } from './viewer.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { FileModule } from "../file/file.module";
import { CoreModule, HttpClientService } from "inet-core";
import { CloudTranslateModule } from "../translate/cloud-translate.module";
import { SafePipeModule } from "../pipes/safe-pipe.module";
var ViewerModule = /** @class */ (function () {
    function ViewerModule() {
    }
    ViewerModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        CoreModule,
                        CloudTranslateModule,
                        FileModule,
                        SafePipeModule
                    ],
                    declarations: [ViewerComponent, ErrorPageComponent],
                    schemas: [CUSTOM_ELEMENTS_SCHEMA],
                    providers: [HttpClientService]
                },] }
    ];
    return ViewerModule;
}());
export { ViewerModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld2VyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtdWkvIiwic291cmNlcyI6WyJzcmMvdmlld2VyL3ZpZXdlci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxzQkFBc0IsRUFBRSxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDL0QsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUNuRCxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxtQ0FBbUMsQ0FBQztBQUNyRSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDL0MsT0FBTyxFQUFDLFVBQVUsRUFBRSxpQkFBaUIsRUFBQyxNQUFNLFdBQVcsQ0FBQztBQUN4RCxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSxxQ0FBcUMsQ0FBQztBQUN6RSxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFFekQ7SUFBQTtJQWFBLENBQUM7O2dCQWJBLFFBQVEsU0FBQztvQkFDTixPQUFPLEVBQUU7d0JBQ0wsWUFBWTt3QkFDWixVQUFVO3dCQUNWLG9CQUFvQjt3QkFDcEIsVUFBVTt3QkFDVixjQUFjO3FCQUNqQjtvQkFDRCxZQUFZLEVBQUUsQ0FBQyxlQUFlLEVBQUUsa0JBQWtCLENBQUM7b0JBQ25ELE9BQU8sRUFBRSxDQUFDLHNCQUFzQixDQUFDO29CQUNqQyxTQUFTLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQztpQkFDakM7O0lBRUQsbUJBQUM7Q0FBQSxBQWJELElBYUM7U0FEWSxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDVVNUT01fRUxFTUVOVFNfU0NIRU1BLCBOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7Vmlld2VyQ29tcG9uZW50fSBmcm9tICcuL3ZpZXdlci5jb21wb25lbnQnO1xuaW1wb3J0IHtFcnJvclBhZ2VDb21wb25lbnR9IGZyb20gJy4vZXJyb3ItcGFnZS9lcnJvci1wYWdlLmNvbXBvbmVudCc7XG5pbXBvcnQge0ZpbGVNb2R1bGV9IGZyb20gXCIuLi9maWxlL2ZpbGUubW9kdWxlXCI7XG5pbXBvcnQge0NvcmVNb2R1bGUsIEh0dHBDbGllbnRTZXJ2aWNlfSBmcm9tIFwiaW5ldC1jb3JlXCI7XG5pbXBvcnQge0Nsb3VkVHJhbnNsYXRlTW9kdWxlfSBmcm9tIFwiLi4vdHJhbnNsYXRlL2Nsb3VkLXRyYW5zbGF0ZS5tb2R1bGVcIjtcbmltcG9ydCB7U2FmZVBpcGVNb2R1bGV9IGZyb20gXCIuLi9waXBlcy9zYWZlLXBpcGUubW9kdWxlXCI7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIENvcmVNb2R1bGUsXG4gICAgICAgIENsb3VkVHJhbnNsYXRlTW9kdWxlLFxuICAgICAgICBGaWxlTW9kdWxlLFxuICAgICAgICBTYWZlUGlwZU1vZHVsZVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbVmlld2VyQ29tcG9uZW50LCBFcnJvclBhZ2VDb21wb25lbnRdLFxuICAgIHNjaGVtYXM6IFtDVVNUT01fRUxFTUVOVFNfU0NIRU1BXSxcbiAgICBwcm92aWRlcnM6IFtIdHRwQ2xpZW50U2VydmljZV1cbn0pXG5leHBvcnQgY2xhc3MgVmlld2VyTW9kdWxlIHtcbn1cbiJdfQ==