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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1waWNrZXItbW9kYWwubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC1jYWxlbmRhci8iLCJzb3VyY2VzIjpbInNyYy9yZW1vdGUtbW9kdWxlL3RpbWUtcGlja2VyL3RpbWUtcGlja2VyLW1vZGFsLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQy9DLE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLGlEQUFpRCxDQUFDO0FBQ3pGLE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLCtCQUErQixDQUFDO0FBQ3ZFLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7Ozs7QUFVM0M7SUFBQTtJQWVxQyxDQUFDOztnQkFmckMsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUU7d0JBQzFCLFlBQVk7d0JBQ1osV0FBVztxQkFDWjtvQkFDRCxZQUFZLEVBQUU7d0JBQ1osd0JBQXdCO3dCQUN4Qix3QkFBd0I7cUJBQ3pCO29CQUNELE9BQU8sRUFBRTt3QkFDUCx3QkFBd0I7d0JBQ3hCLHdCQUF3QjtxQkFDekI7aUJBQ0Y7O0lBQ29DLDRCQUFDO0NBQUEsQUFmdEMsSUFlc0M7U0FBekIscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1RpbWVwaWNrZXJNb2R1bGV9IGZyb20gXCJuZ3gtYm9vdHN0cmFwXCI7XG5pbXBvcnQge1RpbWVQaWNrZXJNb2RhbENvbXBvbmVudH0gZnJvbSBcIi4vdGltZS1waWNrZXItbW9kYWwvdGltZS1waWNrZXItbW9kYWwuY29tcG9uZW50XCI7XG5pbXBvcnQge1RpbWVQaWNrZXJNb2RhbERpcmVjdGl2ZX0gZnJvbSBcIi4vdGltZS1waWNrZXItbW9kYWwuZGlyZWN0aXZlXCI7XG5pbXBvcnQge0Zvcm1zTW9kdWxlfSBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcblxuLyoqXG4gKiBUaW1lUGlja2VyTW9kYWw6IGh0dHBzOi8vdmFsb3Itc29mdHdhcmUuY29tL25neC1ib290c3RyYXAvIy90aW1lcGlja2VyI3RpbWVwaWNrZXItY29uZmlnXG4gKlxuICogPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiB0aW1lUGlja2VyIFt0aW1lUGlja2VyTW9kYWxdPVwidGltZUVuZE1vZGFsXCIgWyhuZ01vZGVsKV09XCJ0aW1lU3RyXCI+XG4gKiA8dGltZS1waWNrZXItbW9kYWwgI3RpbWVFbmRNb2RhbD48L3RpbWUtcGlja2VyLW1vZGFsPlxuICpcbiAqL1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgVGltZXBpY2tlck1vZHVsZS5mb3JSb290KCksXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIFRpbWVQaWNrZXJNb2RhbERpcmVjdGl2ZSxcbiAgICBUaW1lUGlja2VyTW9kYWxDb21wb25lbnRcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIFRpbWVQaWNrZXJNb2RhbERpcmVjdGl2ZSxcbiAgICBUaW1lUGlja2VyTW9kYWxDb21wb25lbnQsXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgVGltZVBpY2tlck1vZGFsTW9kdWxlIHsgfVxuIl19