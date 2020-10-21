/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { ListUserComponent } from '../list-user/list-user.component';
import { SocialService } from '../../social.service';
export class GroupCreateComponent {
    /**
     * @param {?} socialService
     */
    constructor(socialService) {
        this.socialService = socialService;
        this.onCreate = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._input = this.inputGroup.nativeElement;
        document.body.appendChild(this.modal._element.nativeElement);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.modal._element.nativeElement.remove();
    }
    /**
     * @return {?}
     */
    open() {
        this._input.value = '';
        this.listUser.resetData();
        this.modal.show();
    }
    /**
     * @return {?}
     */
    onShown() {
        this._input.focus();
        this.listUser.onSearch();
    }
    /**
     * @return {?}
     */
    onSave() {
        /** @type {?} */
        let params = {
            category: this._input.value.trim(),
            member: this.listUser.selectMembers.map((/**
             * @param {?} item
             * @return {?}
             */
            item => item.username)).join(',')
        };
        if (!params.category) {
            this._input.focus();
            return;
        }
        if (!params.member) {
            this.listUser.focusInput();
            return;
        }
        this.socialService.groupMemberCreate(params, (/**
         * @param {?} data
         * @return {?}
         */
        (data) => {
            this.onCreate.emit(data);
        }));
        this.modal.hide();
    }
    /**
     * @return {?}
     */
    onCancel() {
        this.modal.hide();
    }
}
GroupCreateComponent.decorators = [
    { type: Component, args: [{
                selector: '[socialGroupCreate]',
                template: "<div class=\"modal fade\" bsModal #modal=\"bs-modal\" (onShown)=\"onShown()\" tabindex=\"-1\" role=\"dialog\">\n  <div class=\"modal-dialog\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <h5 class=\"modal-title pull-left\">T\u1EA1o nh\u00F3m</h5>\n        <button type=\"button\" class=\"close pull-right\" (click)=\"modal.hide()\" tabindex=\"-1\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>\n      <div class=\"modal-body\">\n        <div class=\"form-group\">\n          <label>T\u00EAn nh\u00F3m</label>\n          <input #inputGroup type=\"text\" class=\"form-control\">\n        </div>\n        <div class=\"form-group\">\n          <label>Th\u00EAm th\u00E0nh vi\u00EAn</label>\n          <div socialListUser #listUser></div>\n        </div>\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-primary\" (click)=\"onSave()\">T\u1EA1o nh\u00F3m</button>\n        <button type=\"button\" class=\"btn btn-secondary\" (click)=\"onCancel()\">\u0110\u00F3ng</button>\n      </div>\n    </div>\n  </div>\n</div>\n",
                styles: [""]
            }] }
];
/** @nocollapse */
GroupCreateComponent.ctorParameters = () => [
    { type: SocialService }
];
GroupCreateComponent.propDecorators = {
    onCreate: [{ type: Output }],
    modal: [{ type: ViewChild, args: ['modal',] }],
    inputGroup: [{ type: ViewChild, args: ['inputGroup',] }],
    listUser: [{ type: ViewChild, args: ['listUser',] }]
};
if (false) {
    /** @type {?} */
    GroupCreateComponent.prototype.onCreate;
    /** @type {?} */
    GroupCreateComponent.prototype.modal;
    /** @type {?} */
    GroupCreateComponent.prototype.inputGroup;
    /** @type {?} */
    GroupCreateComponent.prototype.listUser;
    /**
     * @type {?}
     * @private
     */
    GroupCreateComponent.prototype._input;
    /**
     * @type {?}
     * @private
     */
    GroupCreateComponent.prototype.socialService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvdXAtY3JlYXRlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtc29jaWFsLyIsInNvdXJjZXMiOlsic3JjL3NvY2lhbC1mcmllbmQvZ3JvdXAtY3JlYXRlL2dyb3VwLWNyZWF0ZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBNEIsTUFBTSxFQUFFLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMvRyxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxrQ0FBa0MsQ0FBQztBQUNuRSxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFPbkQsTUFBTSxPQUFPLG9CQUFvQjs7OztJQVM3QixZQUNZLGFBQTRCO1FBQTVCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBVDlCLGFBQVEsR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO0lBVzdDLENBQUM7Ozs7SUFFRCxRQUFRO1FBQ0osSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQztRQUM1QyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNqRSxDQUFDOzs7O0lBRUQsV0FBVztRQUNQLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUMvQyxDQUFDOzs7O0lBRUQsSUFBSTtRQUNBLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQzFCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDdEIsQ0FBQzs7OztJQUVELE9BQU87UUFDSCxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDN0IsQ0FBQzs7OztJQUVELE1BQU07O1lBQ0UsTUFBTSxHQUFHO1lBQ1QsUUFBUSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRTtZQUNsQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRzs7OztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7U0FDM0U7UUFDRCxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRTtZQUNsQixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3BCLE9BQU87U0FDVjtRQUVELElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFO1lBQ2hCLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDM0IsT0FBTztTQUNWO1FBRUQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNOzs7O1FBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUNsRCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QixDQUFDLEVBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDdEIsQ0FBQzs7OztJQUVELFFBQVE7UUFDSixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3RCLENBQUM7OztZQS9ESixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHFCQUFxQjtnQkFDL0IsOG5DQUE0Qzs7YUFFL0M7Ozs7WUFOTyxhQUFhOzs7dUJBUWhCLE1BQU07b0JBRU4sU0FBUyxTQUFDLE9BQU87eUJBQ2pCLFNBQVMsU0FBQyxZQUFZO3VCQUN0QixTQUFTLFNBQUMsVUFBVTs7OztJQUpyQix3Q0FBNkM7O0lBRTdDLHFDQUEwQjs7SUFDMUIsMENBQWdEOztJQUNoRCx3Q0FBbUQ7Ozs7O0lBRW5ELHNDQUFlOzs7OztJQUdYLDZDQUFvQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3V0cHV0LCBWaWV3Q2hpbGR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtMaXN0VXNlckNvbXBvbmVudH0gZnJvbSAnLi4vbGlzdC11c2VyL2xpc3QtdXNlci5jb21wb25lbnQnO1xuaW1wb3J0IHtTb2NpYWxTZXJ2aWNlfSBmcm9tICcuLi8uLi9zb2NpYWwuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnW3NvY2lhbEdyb3VwQ3JlYXRlXScsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2dyb3VwLWNyZWF0ZS5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vZ3JvdXAtY3JlYXRlLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBHcm91cENyZWF0ZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgICBAT3V0cHV0KCkgb25DcmVhdGUgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAgIEBWaWV3Q2hpbGQoJ21vZGFsJykgbW9kYWw7XG4gICAgQFZpZXdDaGlsZCgnaW5wdXRHcm91cCcpIGlucHV0R3JvdXA6IEVsZW1lbnRSZWY7XG4gICAgQFZpZXdDaGlsZCgnbGlzdFVzZXInKSBsaXN0VXNlcjogTGlzdFVzZXJDb21wb25lbnQ7XG5cbiAgICBwcml2YXRlIF9pbnB1dDtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIHNvY2lhbFNlcnZpY2U6IFNvY2lhbFNlcnZpY2VcbiAgICApIHtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5faW5wdXQgPSB0aGlzLmlucHV0R3JvdXAubmF0aXZlRWxlbWVudDtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLm1vZGFsLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLm1vZGFsLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQucmVtb3ZlKCk7XG4gICAgfVxuXG4gICAgb3BlbigpIHtcbiAgICAgICAgdGhpcy5faW5wdXQudmFsdWUgPSAnJztcbiAgICAgICAgdGhpcy5saXN0VXNlci5yZXNldERhdGEoKTtcbiAgICAgICAgdGhpcy5tb2RhbC5zaG93KCk7XG4gICAgfVxuXG4gICAgb25TaG93bigpIHtcbiAgICAgICAgdGhpcy5faW5wdXQuZm9jdXMoKTtcbiAgICAgICAgdGhpcy5saXN0VXNlci5vblNlYXJjaCgpO1xuICAgIH1cblxuICAgIG9uU2F2ZSgpIHtcbiAgICAgICAgbGV0IHBhcmFtcyA9IHtcbiAgICAgICAgICAgIGNhdGVnb3J5OiB0aGlzLl9pbnB1dC52YWx1ZS50cmltKCksXG4gICAgICAgICAgICBtZW1iZXI6IHRoaXMubGlzdFVzZXIuc2VsZWN0TWVtYmVycy5tYXAoaXRlbSA9PiBpdGVtLnVzZXJuYW1lKS5qb2luKCcsJylcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKCFwYXJhbXMuY2F0ZWdvcnkpIHtcbiAgICAgICAgICAgIHRoaXMuX2lucHV0LmZvY3VzKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXBhcmFtcy5tZW1iZXIpIHtcbiAgICAgICAgICAgIHRoaXMubGlzdFVzZXIuZm9jdXNJbnB1dCgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zb2NpYWxTZXJ2aWNlLmdyb3VwTWVtYmVyQ3JlYXRlKHBhcmFtcywgKGRhdGEpID0+IHtcbiAgICAgICAgICAgIHRoaXMub25DcmVhdGUuZW1pdChkYXRhKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5tb2RhbC5oaWRlKCk7XG4gICAgfVxuXG4gICAgb25DYW5jZWwoKSB7XG4gICAgICAgIHRoaXMubW9kYWwuaGlkZSgpO1xuICAgIH1cbn1cbiJdfQ==