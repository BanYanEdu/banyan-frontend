/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CalendarComponent } from "./calendar.component";
import { CalendarFormComponent } from "./form/calendar-form.component";
/** @type {?} */
const routes = [
    {
        path: 'calendar/v',
        children: [{
                path: '**',
                component: CalendarComponent
            }]
    },
    {
        path: 'calendar/event',
        children: [
            {
                path: ':id',
                component: CalendarFormComponent
            },
            {
                path: '**',
                redirectTo: 'create',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: 'calendar/create',
        children: [
            {
                path: ':data',
                component: CalendarFormComponent
            },
            {
                path: '**',
                component: CalendarFormComponent
            }
        ]
    },
    {
        path: 'calendar',
        redirectTo: 'calendar/v',
        pathMatch: 'full'
    }
];
export class CalendarRoutingModule {
}
CalendarRoutingModule.decorators = [
    { type: NgModule, args: [{
                imports: [RouterModule.forChild(routes)],
                exports: [RouterModule]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItcm91dGluZy5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbmV0LWNhbGVuZGFyLyIsInNvdXJjZXMiOlsic3JjL2NhbGVuZGFyLXJvdXRpbmcubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZDLE9BQU8sRUFBUyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUNyRCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUN2RCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQzs7TUFFL0QsTUFBTSxHQUFXO0lBQ25CO1FBQ0ksSUFBSSxFQUFFLFlBQVk7UUFDbEIsUUFBUSxFQUFFLENBQUM7Z0JBQ1AsSUFBSSxFQUFFLElBQUk7Z0JBQ1YsU0FBUyxFQUFFLGlCQUFpQjthQUMvQixDQUFDO0tBQ0w7SUFDRDtRQUNJLElBQUksRUFBRSxnQkFBZ0I7UUFDdEIsUUFBUSxFQUFFO1lBQ047Z0JBQ0ksSUFBSSxFQUFFLEtBQUs7Z0JBQ1gsU0FBUyxFQUFFLHFCQUFxQjthQUNuQztZQUNEO2dCQUNJLElBQUksRUFBRSxJQUFJO2dCQUNWLFVBQVUsRUFBRSxRQUFRO2dCQUNwQixTQUFTLEVBQUUsTUFBTTthQUNwQjtTQUNKO0tBQ0o7SUFDRDtRQUNJLElBQUksRUFBRSxpQkFBaUI7UUFDdkIsUUFBUSxFQUFFO1lBQ047Z0JBQ0ksSUFBSSxFQUFFLE9BQU87Z0JBQ2IsU0FBUyxFQUFFLHFCQUFxQjthQUNuQztZQUNEO2dCQUNJLElBQUksRUFBRSxJQUFJO2dCQUNWLFNBQVMsRUFBRSxxQkFBcUI7YUFDbkM7U0FDSjtLQUNKO0lBQ0Q7UUFDSSxJQUFJLEVBQUUsVUFBVTtRQUNoQixVQUFVLEVBQUUsWUFBWTtRQUN4QixTQUFTLEVBQUUsTUFBTTtLQUNwQjtDQUNKO0FBTUQsTUFBTSxPQUFPLHFCQUFxQjs7O1lBSmpDLFFBQVEsU0FBQztnQkFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN4QyxPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7YUFDMUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Um91dGVzLCBSb3V0ZXJNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQge0NhbGVuZGFyQ29tcG9uZW50fSBmcm9tIFwiLi9jYWxlbmRhci5jb21wb25lbnRcIjtcbmltcG9ydCB7Q2FsZW5kYXJGb3JtQ29tcG9uZW50fSBmcm9tIFwiLi9mb3JtL2NhbGVuZGFyLWZvcm0uY29tcG9uZW50XCI7XG5cbmNvbnN0IHJvdXRlczogUm91dGVzID0gW1xuICAgIHtcbiAgICAgICAgcGF0aDogJ2NhbGVuZGFyL3YnLFxuICAgICAgICBjaGlsZHJlbjogW3tcbiAgICAgICAgICAgIHBhdGg6ICcqKicsXG4gICAgICAgICAgICBjb21wb25lbnQ6IENhbGVuZGFyQ29tcG9uZW50XG4gICAgICAgIH1dXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHBhdGg6ICdjYWxlbmRhci9ldmVudCcsXG4gICAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcGF0aDogJzppZCcsXG4gICAgICAgICAgICAgICAgY29tcG9uZW50OiBDYWxlbmRhckZvcm1Db21wb25lbnRcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcGF0aDogJyoqJyxcbiAgICAgICAgICAgICAgICByZWRpcmVjdFRvOiAnY3JlYXRlJyxcbiAgICAgICAgICAgICAgICBwYXRoTWF0Y2g6ICdmdWxsJ1xuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHBhdGg6ICdjYWxlbmRhci9jcmVhdGUnLFxuICAgICAgICBjaGlsZHJlbjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHBhdGg6ICc6ZGF0YScsXG4gICAgICAgICAgICAgICAgY29tcG9uZW50OiBDYWxlbmRhckZvcm1Db21wb25lbnRcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcGF0aDogJyoqJyxcbiAgICAgICAgICAgICAgICBjb21wb25lbnQ6IENhbGVuZGFyRm9ybUNvbXBvbmVudFxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHBhdGg6ICdjYWxlbmRhcicsXG4gICAgICAgIHJlZGlyZWN0VG86ICdjYWxlbmRhci92JyxcbiAgICAgICAgcGF0aE1hdGNoOiAnZnVsbCdcbiAgICB9XG5dO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtSb3V0ZXJNb2R1bGUuZm9yQ2hpbGQocm91dGVzKV0sXG4gICAgZXhwb3J0czogW1JvdXRlck1vZHVsZV1cbn0pXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJSb3V0aW5nTW9kdWxlIHtcbn1cbiJdfQ==