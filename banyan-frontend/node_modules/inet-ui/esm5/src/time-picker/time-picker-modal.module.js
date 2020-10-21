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
var TimePickerModalModule = /** @class */ (function () {
    function TimePickerModalModule() {
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
    return TimePickerModalModule;
}());
export { TimePickerModalModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1waWNrZXItbW9kYWwubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC11aS8iLCJzb3VyY2VzIjpbInNyYy90aW1lLXBpY2tlci90aW1lLXBpY2tlci1tb2RhbC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMvQyxPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSxpREFBaUQsQ0FBQztBQUN6RixPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSwrQkFBK0IsQ0FBQztBQUN2RSxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7Ozs7Ozs7O0FBVTNDO0lBQUE7SUFlcUMsQ0FBQzs7Z0JBZnJDLFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsZ0JBQWdCLENBQUMsT0FBTyxFQUFFO3dCQUMxQixZQUFZO3dCQUNaLFdBQVc7cUJBQ1o7b0JBQ0QsWUFBWSxFQUFFO3dCQUNaLHdCQUF3Qjt3QkFDeEIsd0JBQXdCO3FCQUN6QjtvQkFDRCxPQUFPLEVBQUU7d0JBQ1Asd0JBQXdCO3dCQUN4Qix3QkFBd0I7cUJBQ3pCO2lCQUNGOztJQUNvQyw0QkFBQztDQUFBLEFBZnRDLElBZXNDO1NBQXpCLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtUaW1lcGlja2VyTW9kdWxlfSBmcm9tIFwibmd4LWJvb3RzdHJhcFwiO1xuaW1wb3J0IHtUaW1lUGlja2VyTW9kYWxDb21wb25lbnR9IGZyb20gXCIuL3RpbWUtcGlja2VyLW1vZGFsL3RpbWUtcGlja2VyLW1vZGFsLmNvbXBvbmVudFwiO1xuaW1wb3J0IHtUaW1lUGlja2VyTW9kYWxEaXJlY3RpdmV9IGZyb20gXCIuL3RpbWUtcGlja2VyLW1vZGFsLmRpcmVjdGl2ZVwiO1xuaW1wb3J0IHtGb3Jtc01vZHVsZX0gZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XG5cbi8qKlxuICogVGltZVBpY2tlck1vZGFsOiBodHRwczovL3ZhbG9yLXNvZnR3YXJlLmNvbS9uZ3gtYm9vdHN0cmFwLyMvdGltZXBpY2tlciN0aW1lcGlja2VyLWNvbmZpZ1xuICpcbiAqIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgdGltZVBpY2tlciBbdGltZVBpY2tlck1vZGFsXT1cInRpbWVFbmRNb2RhbFwiIFsobmdNb2RlbCldPVwidGltZVN0clwiPlxuICogPHRpbWUtcGlja2VyLW1vZGFsICN0aW1lRW5kTW9kYWw+PC90aW1lLXBpY2tlci1tb2RhbD5cbiAqXG4gKi9cblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIFRpbWVwaWNrZXJNb2R1bGUuZm9yUm9vdCgpLFxuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBUaW1lUGlja2VyTW9kYWxEaXJlY3RpdmUsXG4gICAgVGltZVBpY2tlck1vZGFsQ29tcG9uZW50XG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBUaW1lUGlja2VyTW9kYWxEaXJlY3RpdmUsXG4gICAgVGltZVBpY2tlck1vZGFsQ29tcG9uZW50LFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFRpbWVQaWNrZXJNb2RhbE1vZHVsZSB7IH1cbiJdfQ==