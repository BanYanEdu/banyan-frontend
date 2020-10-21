/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf, } from '@angular/core';
import { Overlay } from '../overlay/overlay';
import { OverlayContainer } from '../overlay/overlay-container';
import { DefaultGlobalConfig } from './default-config';
import { TOAST_CONFIG } from './toast-token';
import { Toast } from './toast.component';
import { ToastrService } from './toastr.service';
export class ToastrModule {
    /**
     * @param {?} parentModule
     */
    constructor(parentModule) {
        if (parentModule) {
            throw new Error('ToastrModule is already loaded. It should only be imported in your application\'s main module.');
        }
    }
    /**
     * @param {?=} config
     * @return {?}
     */
    static forRoot(config = {}) {
        return {
            ngModule: ToastrModule,
            providers: [
                { provide: TOAST_CONFIG, useValue: { config, defaults: DefaultGlobalConfig } },
                OverlayContainer,
                Overlay,
                ToastrService
            ],
        };
    }
}
ToastrModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                exports: [Toast],
                declarations: [Toast],
                entryComponents: [Toast],
            },] }
];
/** @nocollapse */
ToastrModule.ctorParameters = () => [
    { type: ToastrModule, decorators: [{ type: Optional }, { type: SkipSelf }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3RyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtdWkvIiwic291cmNlcyI6WyJzcmMvbm90aWZ5L3RvYXN0ci90b2FzdHIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUVMLFFBQVEsRUFDUixRQUFRLEVBQ1IsUUFBUSxHQUNULE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdDLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUUxQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFTakQsTUFBTSxPQUFPLFlBQVk7Ozs7SUFDdkIsWUFBb0MsWUFBMEI7UUFDNUQsSUFBSSxZQUFZLEVBQUU7WUFDaEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxnR0FBZ0csQ0FBQyxDQUFDO1NBQ25IO0lBQ0gsQ0FBQzs7Ozs7SUFDRCxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQWdDLEVBQUU7UUFDL0MsT0FBTztZQUNMLFFBQVEsRUFBRSxZQUFZO1lBQ3RCLFNBQVMsRUFBRTtnQkFDVCxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxtQkFBbUIsRUFBRSxFQUFFO2dCQUM5RSxnQkFBZ0I7Z0JBQ2hCLE9BQU87Z0JBQ1AsYUFBYTthQUNkO1NBQ0YsQ0FBQztJQUNKLENBQUM7OztZQXRCRixRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO2dCQUN2QixPQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUM7Z0JBQ2hCLFlBQVksRUFBRSxDQUFDLEtBQUssQ0FBQztnQkFDckIsZUFBZSxFQUFFLENBQUMsS0FBSyxDQUFDO2FBQ3pCOzs7O1lBRW1ELFlBQVksdUJBQWpELFFBQVEsWUFBSSxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gIE1vZHVsZVdpdGhQcm92aWRlcnMsXG4gIE5nTW9kdWxlLFxuICBPcHRpb25hbCxcbiAgU2tpcFNlbGYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBPdmVybGF5IH0gZnJvbSAnLi4vb3ZlcmxheS9vdmVybGF5JztcbmltcG9ydCB7IE92ZXJsYXlDb250YWluZXIgfSBmcm9tICcuLi9vdmVybGF5L292ZXJsYXktY29udGFpbmVyJztcbmltcG9ydCB7IERlZmF1bHRHbG9iYWxDb25maWcgfSBmcm9tICcuL2RlZmF1bHQtY29uZmlnJztcbmltcG9ydCB7IFRPQVNUX0NPTkZJRyB9IGZyb20gJy4vdG9hc3QtdG9rZW4nO1xuaW1wb3J0IHsgVG9hc3QgfSBmcm9tICcuL3RvYXN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBHbG9iYWxDb25maWcgfSBmcm9tICcuL3RvYXN0ci1jb25maWcnO1xuaW1wb3J0IHsgVG9hc3RyU2VydmljZSB9IGZyb20gJy4vdG9hc3RyLnNlcnZpY2UnO1xuXG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICBleHBvcnRzOiBbVG9hc3RdLFxuICBkZWNsYXJhdGlvbnM6IFtUb2FzdF0sXG4gIGVudHJ5Q29tcG9uZW50czogW1RvYXN0XSxcbn0pXG5leHBvcnQgY2xhc3MgVG9hc3RyTW9kdWxlIHtcbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgQFNraXBTZWxmKCkgcGFyZW50TW9kdWxlOiBUb2FzdHJNb2R1bGUpIHtcbiAgICBpZiAocGFyZW50TW9kdWxlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RvYXN0ck1vZHVsZSBpcyBhbHJlYWR5IGxvYWRlZC4gSXQgc2hvdWxkIG9ubHkgYmUgaW1wb3J0ZWQgaW4geW91ciBhcHBsaWNhdGlvblxcJ3MgbWFpbiBtb2R1bGUuJyk7XG4gICAgfVxuICB9XG4gIHN0YXRpYyBmb3JSb290KGNvbmZpZzogUGFydGlhbDxHbG9iYWxDb25maWc+ID0ge30pOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IFRvYXN0ck1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7IHByb3ZpZGU6IFRPQVNUX0NPTkZJRywgdXNlVmFsdWU6IHsgY29uZmlnLCBkZWZhdWx0czogRGVmYXVsdEdsb2JhbENvbmZpZyB9IH0sXG4gICAgICAgIE92ZXJsYXlDb250YWluZXIsXG4gICAgICAgIE92ZXJsYXksXG4gICAgICAgIFRvYXN0clNlcnZpY2VcbiAgICAgIF0sXG4gICAgfTtcbiAgfVxufVxuIl19