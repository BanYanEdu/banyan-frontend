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
export class ViewerModule {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld2VyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtdWkvIiwic291cmNlcyI6WyJzcmMvdmlld2VyL3ZpZXdlci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxzQkFBc0IsRUFBRSxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDL0QsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUNuRCxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxtQ0FBbUMsQ0FBQztBQUNyRSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDL0MsT0FBTyxFQUFDLFVBQVUsRUFBRSxpQkFBaUIsRUFBQyxNQUFNLFdBQVcsQ0FBQztBQUN4RCxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSxxQ0FBcUMsQ0FBQztBQUN6RSxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFjekQsTUFBTSxPQUFPLFlBQVk7OztZQVp4QixRQUFRLFNBQUM7Z0JBQ04sT0FBTyxFQUFFO29CQUNMLFlBQVk7b0JBQ1osVUFBVTtvQkFDVixvQkFBb0I7b0JBQ3BCLFVBQVU7b0JBQ1YsY0FBYztpQkFDakI7Z0JBQ0QsWUFBWSxFQUFFLENBQUMsZUFBZSxFQUFFLGtCQUFrQixDQUFDO2dCQUNuRCxPQUFPLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztnQkFDakMsU0FBUyxFQUFFLENBQUMsaUJBQWlCLENBQUM7YUFDakMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NVU1RPTV9FTEVNRU5UU19TQ0hFTUEsIE5nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtWaWV3ZXJDb21wb25lbnR9IGZyb20gJy4vdmlld2VyLmNvbXBvbmVudCc7XG5pbXBvcnQge0Vycm9yUGFnZUNvbXBvbmVudH0gZnJvbSAnLi9lcnJvci1wYWdlL2Vycm9yLXBhZ2UuY29tcG9uZW50JztcbmltcG9ydCB7RmlsZU1vZHVsZX0gZnJvbSBcIi4uL2ZpbGUvZmlsZS5tb2R1bGVcIjtcbmltcG9ydCB7Q29yZU1vZHVsZSwgSHR0cENsaWVudFNlcnZpY2V9IGZyb20gXCJpbmV0LWNvcmVcIjtcbmltcG9ydCB7Q2xvdWRUcmFuc2xhdGVNb2R1bGV9IGZyb20gXCIuLi90cmFuc2xhdGUvY2xvdWQtdHJhbnNsYXRlLm1vZHVsZVwiO1xuaW1wb3J0IHtTYWZlUGlwZU1vZHVsZX0gZnJvbSBcIi4uL3BpcGVzL3NhZmUtcGlwZS5tb2R1bGVcIjtcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgQ29yZU1vZHVsZSxcbiAgICAgICAgQ2xvdWRUcmFuc2xhdGVNb2R1bGUsXG4gICAgICAgIEZpbGVNb2R1bGUsXG4gICAgICAgIFNhZmVQaXBlTW9kdWxlXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtWaWV3ZXJDb21wb25lbnQsIEVycm9yUGFnZUNvbXBvbmVudF0sXG4gICAgc2NoZW1hczogW0NVU1RPTV9FTEVNRU5UU19TQ0hFTUFdLFxuICAgIHByb3ZpZGVyczogW0h0dHBDbGllbnRTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBWaWV3ZXJNb2R1bGUge1xufVxuIl19