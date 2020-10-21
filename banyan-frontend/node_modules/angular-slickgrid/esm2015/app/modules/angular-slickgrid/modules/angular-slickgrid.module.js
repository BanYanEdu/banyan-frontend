import * as tslib_1 from "tslib";
var AngularSlickgridModule_1;
import { AngularUtilService } from './../services/angularUtilService';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AngularSlickgridComponent } from './../components/angular-slickgrid.component';
import { CollectionService } from './../services/collection.service';
import { FilterFactory } from '../filters/filterFactory';
import { GraphqlService } from './../services/graphql.service';
import { GridOdataService } from './../services/grid-odata.service';
import { SlickPaginationComponent } from './../components/slick-pagination.component';
let AngularSlickgridModule = AngularSlickgridModule_1 = class AngularSlickgridModule {
    static forRoot(config = {}) {
        return {
            ngModule: AngularSlickgridModule_1,
            providers: [
                { provide: 'config', useValue: config },
                AngularUtilService,
                CollectionService,
                FilterFactory,
                GraphqlService,
                GridOdataService
            ]
        };
    }
};
AngularSlickgridModule = AngularSlickgridModule_1 = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            TranslateModule
        ],
        declarations: [
            AngularSlickgridComponent,
            SlickPaginationComponent
        ],
        exports: [
            AngularSlickgridComponent,
            SlickPaginationComponent
        ],
        entryComponents: [AngularSlickgridComponent]
    })
], AngularSlickgridModule);
export { AngularSlickgridModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1zbGlja2dyaWQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUN4RixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNyRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDekQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBRXBFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBa0J0RixJQUFhLHNCQUFzQiw4QkFBbkMsTUFBYSxzQkFBc0I7SUFDakMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFxQixFQUFFO1FBQ3BDLE9BQU87WUFDTCxRQUFRLEVBQUUsd0JBQXNCO1lBQ2hDLFNBQVMsRUFBRTtnQkFDVCxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRTtnQkFDdkMsa0JBQWtCO2dCQUNsQixpQkFBaUI7Z0JBQ2pCLGFBQWE7Z0JBQ2IsY0FBYztnQkFDZCxnQkFBZ0I7YUFDakI7U0FDRixDQUFDO0lBQ0osQ0FBQztDQUNGLENBQUE7QUFkWSxzQkFBc0I7SUFmbEMsUUFBUSxDQUFDO1FBQ1IsT0FBTyxFQUFFO1lBQ1AsWUFBWTtZQUNaLGVBQWU7U0FDaEI7UUFDRCxZQUFZLEVBQUU7WUFDWix5QkFBeUI7WUFDekIsd0JBQXdCO1NBQ3pCO1FBQ0QsT0FBTyxFQUFFO1lBQ1AseUJBQXlCO1lBQ3pCLHdCQUF3QjtTQUN6QjtRQUNELGVBQWUsRUFBRSxDQUFDLHlCQUF5QixDQUFDO0tBQzdDLENBQUM7R0FDVyxzQkFBc0IsQ0FjbEM7U0FkWSxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBbmd1bGFyVXRpbFNlcnZpY2UgfSBmcm9tICcuLy4uL3NlcnZpY2VzL2FuZ3VsYXJVdGlsU2VydmljZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFRyYW5zbGF0ZU1vZHVsZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xyXG5pbXBvcnQgeyBBbmd1bGFyU2xpY2tncmlkQ29tcG9uZW50IH0gZnJvbSAnLi8uLi9jb21wb25lbnRzL2FuZ3VsYXItc2xpY2tncmlkLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IENvbGxlY3Rpb25TZXJ2aWNlIH0gZnJvbSAnLi8uLi9zZXJ2aWNlcy9jb2xsZWN0aW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBGaWx0ZXJGYWN0b3J5IH0gZnJvbSAnLi4vZmlsdGVycy9maWx0ZXJGYWN0b3J5JztcclxuaW1wb3J0IHsgR3JhcGhxbFNlcnZpY2UgfSBmcm9tICcuLy4uL3NlcnZpY2VzL2dyYXBocWwuc2VydmljZSc7XHJcbmltcG9ydCB7IEdyaWRPZGF0YVNlcnZpY2UgfSBmcm9tICcuLy4uL3NlcnZpY2VzL2dyaWQtb2RhdGEuc2VydmljZSc7XHJcbmltcG9ydCB7IEdyaWRPcHRpb24gfSBmcm9tICcuLy4uL21vZGVscy9ncmlkT3B0aW9uLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IFNsaWNrUGFnaW5hdGlvbkNvbXBvbmVudCB9IGZyb20gJy4vLi4vY29tcG9uZW50cy9zbGljay1wYWdpbmF0aW9uLmNvbXBvbmVudCc7XHJcblxyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBUcmFuc2xhdGVNb2R1bGVcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgQW5ndWxhclNsaWNrZ3JpZENvbXBvbmVudCxcclxuICAgIFNsaWNrUGFnaW5hdGlvbkNvbXBvbmVudFxyXG4gIF0sXHJcbiAgZXhwb3J0czogW1xyXG4gICAgQW5ndWxhclNsaWNrZ3JpZENvbXBvbmVudCxcclxuICAgIFNsaWNrUGFnaW5hdGlvbkNvbXBvbmVudFxyXG4gIF0sXHJcbiAgZW50cnlDb21wb25lbnRzOiBbQW5ndWxhclNsaWNrZ3JpZENvbXBvbmVudF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEFuZ3VsYXJTbGlja2dyaWRNb2R1bGUge1xyXG4gIHN0YXRpYyBmb3JSb290KGNvbmZpZzogR3JpZE9wdGlvbiA9IHt9KSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuZ01vZHVsZTogQW5ndWxhclNsaWNrZ3JpZE1vZHVsZSxcclxuICAgICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAgeyBwcm92aWRlOiAnY29uZmlnJywgdXNlVmFsdWU6IGNvbmZpZyB9LFxyXG4gICAgICAgIEFuZ3VsYXJVdGlsU2VydmljZSxcclxuICAgICAgICBDb2xsZWN0aW9uU2VydmljZSxcclxuICAgICAgICBGaWx0ZXJGYWN0b3J5LFxyXG4gICAgICAgIEdyYXBocWxTZXJ2aWNlLFxyXG4gICAgICAgIEdyaWRPZGF0YVNlcnZpY2VcclxuICAgICAgXVxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIl19