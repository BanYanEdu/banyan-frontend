/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, HostListener, Input } from '@angular/core';
import { ViewerService } from './viewer.service';
export class ViewerDirective {
    /**
     * @param {?} viewerService
     */
    constructor(viewerService) {
        this.viewerService = viewerService;
    }
    /**
     * @return {?}
     */
    onClick() {
        this.viewerService.setFiles(this.files);
        this.viewerService.open(this.ext, this.docId, this.extras);
    }
}
ViewerDirective.decorators = [
    { type: Directive, args: [{
                selector: '[appViewer]'
            },] }
];
/** @nocollapse */
ViewerDirective.ctorParameters = () => [
    { type: ViewerService }
];
ViewerDirective.propDecorators = {
    ext: [{ type: Input, args: ['ext',] }],
    docId: [{ type: Input, args: ['docId',] }],
    files: [{ type: Input, args: ['files',] }],
    extras: [{ type: Input, args: ['extras',] }],
    onClick: [{ type: HostListener, args: ['click',] }]
};
if (false) {
    /** @type {?} */
    ViewerDirective.prototype.ext;
    /** @type {?} */
    ViewerDirective.prototype.docId;
    /** @type {?} */
    ViewerDirective.prototype.files;
    /** @type {?} */
    ViewerDirective.prototype.extras;
    /**
     * @type {?}
     * @private
     */
    ViewerDirective.prototype.viewerService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld2VyLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtdWkvIiwic291cmNlcyI6WyJzcmMvZmlsZS92aWV3ZXIuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDN0QsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBTS9DLE1BQU0sT0FBTyxlQUFlOzs7O0lBTXhCLFlBQW9CLGFBQTRCO1FBQTVCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO0lBQ2hELENBQUM7Ozs7SUFFc0IsT0FBTztRQUMxQixJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMvRCxDQUFDOzs7WUFmSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGFBQWE7YUFDMUI7Ozs7WUFMTyxhQUFhOzs7a0JBUWhCLEtBQUssU0FBQyxLQUFLO29CQUNYLEtBQUssU0FBQyxPQUFPO29CQUNiLEtBQUssU0FBQyxPQUFPO3FCQUNiLEtBQUssU0FBQyxRQUFRO3NCQUlkLFlBQVksU0FBQyxPQUFPOzs7O0lBUHJCLDhCQUEwQjs7SUFDMUIsZ0NBQThCOztJQUM5QixnQ0FBbUM7O0lBQ25DLGlDQUEyQzs7Ozs7SUFDL0Isd0NBQW9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEaXJlY3RpdmUsIEhvc3RMaXN0ZW5lciwgSW5wdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtWaWV3ZXJTZXJ2aWNlfSBmcm9tICcuL3ZpZXdlci5zZXJ2aWNlJztcbmltcG9ydCB7TmF2aWdhdGlvbkV4dHJhc30gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1thcHBWaWV3ZXJdJ1xufSlcbmV4cG9ydCBjbGFzcyBWaWV3ZXJEaXJlY3RpdmUge1xuXG4gICAgQElucHV0KCdleHQnKSBleHQ6IHN0cmluZztcbiAgICBASW5wdXQoJ2RvY0lkJykgZG9jSWQ6IHN0cmluZztcbiAgICBASW5wdXQoJ2ZpbGVzJykgZmlsZXM/OiBBcnJheTxhbnk+O1xuICAgIEBJbnB1dCgnZXh0cmFzJykgZXh0cmFzPzogTmF2aWdhdGlvbkV4dHJhcztcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHZpZXdlclNlcnZpY2U6IFZpZXdlclNlcnZpY2UpIHtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdjbGljaycpIG9uQ2xpY2soKSB7XG4gICAgICAgIHRoaXMudmlld2VyU2VydmljZS5zZXRGaWxlcyh0aGlzLmZpbGVzKTtcbiAgICAgICAgdGhpcy52aWV3ZXJTZXJ2aWNlLm9wZW4odGhpcy5leHQsIHRoaXMuZG9jSWQsIHRoaXMuZXh0cmFzKTtcbiAgICB9XG5cbn1cbiJdfQ==