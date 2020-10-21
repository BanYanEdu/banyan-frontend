/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimepickerModule } from "ngx-bootstrap";
import { TimePickerModalComponent } from "./time-picker-modal/time-picker-modal.component";
import { TimePickerModalDirective } from "./time-picker-modal.directive";
import { FormsModule } from "@angular/forms";
/**
 * TimePickerModal: https://valor-software.com/ngx-bootstrap/#/timepicker#timepicker-config
 *
 * <input type="text" class="form-control" timePicker [timePickerModal]="timeEndModal" [(ngModel)]="timeStr">
 * <time-picker-modal #timeEndModal></time-picker-modal>
 *
 */
export class TimePickerModalModule {
}
TimePickerModalModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    TimepickerModule.forRoot(),
                    CommonModule,
                    FormsModule
                ],
                declarations: [
                    TimePickerModalDirective,
                    TimePickerModalComponent
                ],
                exports: [
                    TimePickerModalDirective,
                    TimePickerModalComponent,
                ]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1waWNrZXItbW9kYWwubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC11aS8iLCJzb3VyY2VzIjpbInNyYy90aW1lLXBpY2tlci90aW1lLXBpY2tlci1tb2RhbC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMvQyxPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSxpREFBaUQsQ0FBQztBQUN6RixPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSwrQkFBK0IsQ0FBQztBQUN2RSxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7Ozs7Ozs7O0FBeUIzQyxNQUFNLE9BQU8scUJBQXFCOzs7WUFmakMsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRTtvQkFDUCxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUU7b0JBQzFCLFlBQVk7b0JBQ1osV0FBVztpQkFDWjtnQkFDRCxZQUFZLEVBQUU7b0JBQ1osd0JBQXdCO29CQUN4Qix3QkFBd0I7aUJBQ3pCO2dCQUNELE9BQU8sRUFBRTtvQkFDUCx3QkFBd0I7b0JBQ3hCLHdCQUF3QjtpQkFDekI7YUFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtUaW1lcGlja2VyTW9kdWxlfSBmcm9tIFwibmd4LWJvb3RzdHJhcFwiO1xuaW1wb3J0IHtUaW1lUGlja2VyTW9kYWxDb21wb25lbnR9IGZyb20gXCIuL3RpbWUtcGlja2VyLW1vZGFsL3RpbWUtcGlja2VyLW1vZGFsLmNvbXBvbmVudFwiO1xuaW1wb3J0IHtUaW1lUGlja2VyTW9kYWxEaXJlY3RpdmV9IGZyb20gXCIuL3RpbWUtcGlja2VyLW1vZGFsLmRpcmVjdGl2ZVwiO1xuaW1wb3J0IHtGb3Jtc01vZHVsZX0gZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XG5cbi8qKlxuICogVGltZVBpY2tlck1vZGFsOiBodHRwczovL3ZhbG9yLXNvZnR3YXJlLmNvbS9uZ3gtYm9vdHN0cmFwLyMvdGltZXBpY2tlciN0aW1lcGlja2VyLWNvbmZpZ1xuICpcbiAqIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgdGltZVBpY2tlciBbdGltZVBpY2tlck1vZGFsXT1cInRpbWVFbmRNb2RhbFwiIFsobmdNb2RlbCldPVwidGltZVN0clwiPlxuICogPHRpbWUtcGlja2VyLW1vZGFsICN0aW1lRW5kTW9kYWw+PC90aW1lLXBpY2tlci1tb2RhbD5cbiAqXG4gKi9cblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIFRpbWVwaWNrZXJNb2R1bGUuZm9yUm9vdCgpLFxuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBUaW1lUGlja2VyTW9kYWxEaXJlY3RpdmUsXG4gICAgVGltZVBpY2tlck1vZGFsQ29tcG9uZW50XG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBUaW1lUGlja2VyTW9kYWxEaXJlY3RpdmUsXG4gICAgVGltZVBpY2tlck1vZGFsQ29tcG9uZW50LFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFRpbWVQaWNrZXJNb2RhbE1vZHVsZSB7IH1cbiJdfQ==