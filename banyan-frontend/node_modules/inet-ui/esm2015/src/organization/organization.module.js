/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationGeneralInformationComponent } from './organization-general-information/organization-general-information.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrganizationInformationComponent } from './organization-information/organization-information.component';
import { LocationService } from "../common/location.service";
import { OrganizationService } from './organization.service';
import { TabsModule } from 'ngx-bootstrap';
import { TranslateModule } from "@ngx-translate/core";
import { HttpClientModule } from "@angular/common/http";
import { CoreModule } from "inet-core";
import { DictionaryService } from "../common/dictionary.service";
export class OrganizationModule {
}
OrganizationModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    CoreModule,
                    ReactiveFormsModule,
                    TranslateModule,
                    HttpClientModule,
                    TabsModule.forRoot()
                ],
                declarations: [OrganizationGeneralInformationComponent, OrganizationInformationComponent],
                exports: [OrganizationGeneralInformationComponent, OrganizationInformationComponent],
                providers: [
                    FormsModule, ReactiveFormsModule, TabsModule,
                    LocationService, OrganizationService, DictionaryService
                ]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JnYW5pemF0aW9uLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtdWkvIiwic291cmNlcyI6WyJzcmMvb3JnYW5pemF0aW9uL29yZ2FuaXphdGlvbi5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyx1Q0FBdUMsRUFBQyxNQUFNLCtFQUErRSxDQUFDO0FBQ3RJLE9BQU8sRUFBQyxXQUFXLEVBQUUsbUJBQW1CLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNoRSxPQUFPLEVBQUMsZ0NBQWdDLEVBQUMsTUFBTSwrREFBK0QsQ0FBQztBQUMvRyxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFDM0QsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDM0QsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDcEQsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDdEQsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLFdBQVcsQ0FBQztBQUNyQyxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQW1CL0QsTUFBTSxPQUFPLGtCQUFrQjs7O1lBakI5QixRQUFRLFNBQUM7Z0JBQ04sT0FBTyxFQUFFO29CQUNMLFlBQVk7b0JBQ1osV0FBVztvQkFDWCxVQUFVO29CQUNWLG1CQUFtQjtvQkFDbkIsZUFBZTtvQkFDZixnQkFBZ0I7b0JBQ2hCLFVBQVUsQ0FBQyxPQUFPLEVBQUU7aUJBQ3ZCO2dCQUNELFlBQVksRUFBRSxDQUFDLHVDQUF1QyxFQUFFLGdDQUFnQyxDQUFDO2dCQUN6RixPQUFPLEVBQUUsQ0FBQyx1Q0FBdUMsRUFBRSxnQ0FBZ0MsQ0FBQztnQkFDcEYsU0FBUyxFQUFFO29CQUNQLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxVQUFVO29CQUM1QyxlQUFlLEVBQUUsbUJBQW1CLEVBQUUsaUJBQWlCO2lCQUMxRDthQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7T3JnYW5pemF0aW9uR2VuZXJhbEluZm9ybWF0aW9uQ29tcG9uZW50fSBmcm9tICcuL29yZ2FuaXphdGlvbi1nZW5lcmFsLWluZm9ybWF0aW9uL29yZ2FuaXphdGlvbi1nZW5lcmFsLWluZm9ybWF0aW9uLmNvbXBvbmVudCc7XG5pbXBvcnQge0Zvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge09yZ2FuaXphdGlvbkluZm9ybWF0aW9uQ29tcG9uZW50fSBmcm9tICcuL29yZ2FuaXphdGlvbi1pbmZvcm1hdGlvbi9vcmdhbml6YXRpb24taW5mb3JtYXRpb24uY29tcG9uZW50JztcbmltcG9ydCB7TG9jYXRpb25TZXJ2aWNlfSBmcm9tIFwiLi4vY29tbW9uL2xvY2F0aW9uLnNlcnZpY2VcIjtcbmltcG9ydCB7T3JnYW5pemF0aW9uU2VydmljZX0gZnJvbSAnLi9vcmdhbml6YXRpb24uc2VydmljZSc7XG5pbXBvcnQge1RhYnNNb2R1bGV9IGZyb20gJ25neC1ib290c3RyYXAnO1xuaW1wb3J0IHtUcmFuc2xhdGVNb2R1bGV9IGZyb20gXCJAbmd4LXRyYW5zbGF0ZS9jb3JlXCI7XG5pbXBvcnQge0h0dHBDbGllbnRNb2R1bGV9IGZyb20gXCJAYW5ndWxhci9jb21tb24vaHR0cFwiO1xuaW1wb3J0IHtDb3JlTW9kdWxlfSBmcm9tIFwiaW5ldC1jb3JlXCI7XG5pbXBvcnQge0RpY3Rpb25hcnlTZXJ2aWNlfSBmcm9tIFwiLi4vY29tbW9uL2RpY3Rpb25hcnkuc2VydmljZVwiO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBGb3Jtc01vZHVsZSxcbiAgICAgICAgQ29yZU1vZHVsZSxcbiAgICAgICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICAgICAgVHJhbnNsYXRlTW9kdWxlLFxuICAgICAgICBIdHRwQ2xpZW50TW9kdWxlLFxuICAgICAgICBUYWJzTW9kdWxlLmZvclJvb3QoKVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbT3JnYW5pemF0aW9uR2VuZXJhbEluZm9ybWF0aW9uQ29tcG9uZW50LCBPcmdhbml6YXRpb25JbmZvcm1hdGlvbkNvbXBvbmVudF0sXG4gICAgZXhwb3J0czogW09yZ2FuaXphdGlvbkdlbmVyYWxJbmZvcm1hdGlvbkNvbXBvbmVudCwgT3JnYW5pemF0aW9uSW5mb3JtYXRpb25Db21wb25lbnRdLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSwgVGFic01vZHVsZSxcbiAgICAgICAgTG9jYXRpb25TZXJ2aWNlLCBPcmdhbml6YXRpb25TZXJ2aWNlLCBEaWN0aW9uYXJ5U2VydmljZVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgT3JnYW5pemF0aW9uTW9kdWxlIHtcbn1cbiJdfQ==