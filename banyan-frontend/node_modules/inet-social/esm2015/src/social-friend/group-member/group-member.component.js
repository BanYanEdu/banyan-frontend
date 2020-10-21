/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ListUserComponent } from '../list-user/list-user.component';
export class GroupMemberComponent {
    constructor() {
        this.title = 'Thêm thành viên';
        this.onSelect = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
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
        this.listUser.resetData();
        this.modal.show();
    }
    /**
     * @return {?}
     */
    onShown() {
        this.listUser.focusInput();
        this.listUser.onSearch();
    }
    /**
     * @return {?}
     */
    onSave() {
        this.onSelect.emit(this.listUser.selectMembers);
        this.modal.hide();
    }
    /**
     * @return {?}
     */
    onCancel() {
        this.modal.hide();
    }
}
GroupMemberComponent.decorators = [
    { type: Component, args: [{
                selector: '[socialGroupMember]',
                template: "<div class=\"modal fade\" bsModal #modal=\"bs-modal\" (onShown)=\"onShown()\" tabindex=\"-1\" role=\"dialog\">\n  <div class=\"modal-dialog\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <h5 class=\"modal-title pull-left\">Th\u00EAm th\u00E0nh vi\u00EAn</h5>\n        <button type=\"button\" class=\"close pull-right\" (click)=\"modal.hide()\" tabindex=\"-1\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>\n      <div class=\"modal-body\">\n        <div socialListUser #listUser></div>\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-primary\" (click)=\"onSave()\">L\u01B0u</button>\n        <button type=\"button\" class=\"btn btn-secondary\" (click)=\"onCancel()\">\u0110\u00F3ng</button>\n      </div>\n    </div>\n  </div>\n</div>\n",
                styles: [""]
            }] }
];
/** @nocollapse */
GroupMemberComponent.ctorParameters = () => [];
GroupMemberComponent.propDecorators = {
    title: [{ type: Input }],
    onSelect: [{ type: Output }],
    modal: [{ type: ViewChild, args: ['modal',] }],
    listUser: [{ type: ViewChild, args: ['listUser',] }]
};
if (false) {
    /** @type {?} */
    GroupMemberComponent.prototype.title;
    /** @type {?} */
    GroupMemberComponent.prototype.onSelect;
    /** @type {?} */
    GroupMemberComponent.prototype.modal;
    /** @type {?} */
    GroupMemberComponent.prototype.listUser;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvdXAtbWVtYmVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtc29jaWFsLyIsInNvdXJjZXMiOlsic3JjL3NvY2lhbC1mcmllbmQvZ3JvdXAtbWVtYmVyL2dyb3VwLW1lbWJlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBcUIsTUFBTSxFQUFFLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNuRyxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxrQ0FBa0MsQ0FBQztBQU9uRSxNQUFNLE9BQU8sb0JBQW9CO0lBTzdCO1FBTlMsVUFBSyxHQUFXLGlCQUFpQixDQUFDO1FBQ2pDLGFBQVEsR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO0lBTTdDLENBQUM7Ozs7SUFFRCxRQUFRO1FBQ0osUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDakUsQ0FBQzs7OztJQUVELFdBQVc7UUFDUCxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDL0MsQ0FBQzs7OztJQUVELElBQUk7UUFDQSxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQzFCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDdEIsQ0FBQzs7OztJQUVELE9BQU87UUFDSCxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQzNCLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDN0IsQ0FBQzs7OztJQUVELE1BQU07UUFDRixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDdEIsQ0FBQzs7OztJQUVELFFBQVE7UUFDSixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3RCLENBQUM7OztZQXhDSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHFCQUFxQjtnQkFDL0IsNDJCQUE0Qzs7YUFFL0M7Ozs7O29CQUVJLEtBQUs7dUJBQ0wsTUFBTTtvQkFFTixTQUFTLFNBQUMsT0FBTzt1QkFDakIsU0FBUyxTQUFDLFVBQVU7Ozs7SUFKckIscUNBQTJDOztJQUMzQyx3Q0FBNkM7O0lBRTdDLHFDQUEwQjs7SUFDMUIsd0NBQW1EIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0LCBPdXRwdXQsIFZpZXdDaGlsZH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0xpc3RVc2VyQ29tcG9uZW50fSBmcm9tICcuLi9saXN0LXVzZXIvbGlzdC11c2VyLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnW3NvY2lhbEdyb3VwTWVtYmVyXScsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2dyb3VwLW1lbWJlci5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vZ3JvdXAtbWVtYmVyLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBHcm91cE1lbWJlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgICBASW5wdXQoKSB0aXRsZTogc3RyaW5nID0gJ1Row6ptIHRow6BuaCB2acOqbic7XG4gICAgQE91dHB1dCgpIG9uU2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgICBAVmlld0NoaWxkKCdtb2RhbCcpIG1vZGFsO1xuICAgIEBWaWV3Q2hpbGQoJ2xpc3RVc2VyJykgbGlzdFVzZXI6IExpc3RVc2VyQ29tcG9uZW50O1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5tb2RhbC5fZWxlbWVudC5uYXRpdmVFbGVtZW50KTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5tb2RhbC5fZWxlbWVudC5uYXRpdmVFbGVtZW50LnJlbW92ZSgpO1xuICAgIH1cblxuICAgIG9wZW4oKSB7XG4gICAgICAgIHRoaXMubGlzdFVzZXIucmVzZXREYXRhKCk7XG4gICAgICAgIHRoaXMubW9kYWwuc2hvdygpO1xuICAgIH1cblxuICAgIG9uU2hvd24oKSB7XG4gICAgICAgIHRoaXMubGlzdFVzZXIuZm9jdXNJbnB1dCgpO1xuICAgICAgICB0aGlzLmxpc3RVc2VyLm9uU2VhcmNoKCk7XG4gICAgfVxuXG4gICAgb25TYXZlKCkge1xuICAgICAgICB0aGlzLm9uU2VsZWN0LmVtaXQodGhpcy5saXN0VXNlci5zZWxlY3RNZW1iZXJzKTtcbiAgICAgICAgdGhpcy5tb2RhbC5oaWRlKCk7XG4gICAgfVxuXG4gICAgb25DYW5jZWwoKSB7XG4gICAgICAgIHRoaXMubW9kYWwuaGlkZSgpO1xuICAgIH1cbn1cbiJdfQ==