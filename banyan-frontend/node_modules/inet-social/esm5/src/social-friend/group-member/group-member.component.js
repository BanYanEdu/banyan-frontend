/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ListUserComponent } from '../list-user/list-user.component';
var GroupMemberComponent = /** @class */ (function () {
    function GroupMemberComponent() {
        this.title = 'Thêm thành viên';
        this.onSelect = new EventEmitter();
    }
    /**
     * @return {?}
     */
    GroupMemberComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        document.body.appendChild(this.modal._element.nativeElement);
    };
    /**
     * @return {?}
     */
    GroupMemberComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.modal._element.nativeElement.remove();
    };
    /**
     * @return {?}
     */
    GroupMemberComponent.prototype.open = /**
     * @return {?}
     */
    function () {
        this.listUser.resetData();
        this.modal.show();
    };
    /**
     * @return {?}
     */
    GroupMemberComponent.prototype.onShown = /**
     * @return {?}
     */
    function () {
        this.listUser.focusInput();
        this.listUser.onSearch();
    };
    /**
     * @return {?}
     */
    GroupMemberComponent.prototype.onSave = /**
     * @return {?}
     */
    function () {
        this.onSelect.emit(this.listUser.selectMembers);
        this.modal.hide();
    };
    /**
     * @return {?}
     */
    GroupMemberComponent.prototype.onCancel = /**
     * @return {?}
     */
    function () {
        this.modal.hide();
    };
    GroupMemberComponent.decorators = [
        { type: Component, args: [{
                    selector: '[socialGroupMember]',
                    template: "<div class=\"modal fade\" bsModal #modal=\"bs-modal\" (onShown)=\"onShown()\" tabindex=\"-1\" role=\"dialog\">\n  <div class=\"modal-dialog\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <h5 class=\"modal-title pull-left\">Th\u00EAm th\u00E0nh vi\u00EAn</h5>\n        <button type=\"button\" class=\"close pull-right\" (click)=\"modal.hide()\" tabindex=\"-1\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>\n      <div class=\"modal-body\">\n        <div socialListUser #listUser></div>\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-primary\" (click)=\"onSave()\">L\u01B0u</button>\n        <button type=\"button\" class=\"btn btn-secondary\" (click)=\"onCancel()\">\u0110\u00F3ng</button>\n      </div>\n    </div>\n  </div>\n</div>\n",
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    GroupMemberComponent.ctorParameters = function () { return []; };
    GroupMemberComponent.propDecorators = {
        title: [{ type: Input }],
        onSelect: [{ type: Output }],
        modal: [{ type: ViewChild, args: ['modal',] }],
        listUser: [{ type: ViewChild, args: ['listUser',] }]
    };
    return GroupMemberComponent;
}());
export { GroupMemberComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvdXAtbWVtYmVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtc29jaWFsLyIsInNvdXJjZXMiOlsic3JjL3NvY2lhbC1mcmllbmQvZ3JvdXAtbWVtYmVyL2dyb3VwLW1lbWJlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBcUIsTUFBTSxFQUFFLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNuRyxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxrQ0FBa0MsQ0FBQztBQUVuRTtJQVlJO1FBTlMsVUFBSyxHQUFXLGlCQUFpQixDQUFDO1FBQ2pDLGFBQVEsR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO0lBTTdDLENBQUM7Ozs7SUFFRCx1Q0FBUTs7O0lBQVI7UUFDSSxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNqRSxDQUFDOzs7O0lBRUQsMENBQVc7OztJQUFYO1FBQ0ksSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQy9DLENBQUM7Ozs7SUFFRCxtQ0FBSTs7O0lBQUo7UUFDSSxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQzFCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDdEIsQ0FBQzs7OztJQUVELHNDQUFPOzs7SUFBUDtRQUNJLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDM0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUM3QixDQUFDOzs7O0lBRUQscUNBQU07OztJQUFOO1FBQ0ksSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3RCLENBQUM7Ozs7SUFFRCx1Q0FBUTs7O0lBQVI7UUFDSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3RCLENBQUM7O2dCQXhDSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLHFCQUFxQjtvQkFDL0IsNDJCQUE0Qzs7aUJBRS9DOzs7Ozt3QkFFSSxLQUFLOzJCQUNMLE1BQU07d0JBRU4sU0FBUyxTQUFDLE9BQU87MkJBQ2pCLFNBQVMsU0FBQyxVQUFVOztJQStCekIsMkJBQUM7Q0FBQSxBQXpDRCxJQXlDQztTQXBDWSxvQkFBb0I7OztJQUM3QixxQ0FBMkM7O0lBQzNDLHdDQUE2Qzs7SUFFN0MscUNBQTBCOztJQUMxQix3Q0FBbUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQsIE91dHB1dCwgVmlld0NoaWxkfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TGlzdFVzZXJDb21wb25lbnR9IGZyb20gJy4uL2xpc3QtdXNlci9saXN0LXVzZXIuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdbc29jaWFsR3JvdXBNZW1iZXJdJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vZ3JvdXAtbWVtYmVyLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9ncm91cC1tZW1iZXIuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIEdyb3VwTWVtYmVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAgIEBJbnB1dCgpIHRpdGxlOiBzdHJpbmcgPSAnVGjDqm0gdGjDoG5oIHZpw6puJztcbiAgICBAT3V0cHV0KCkgb25TZWxlY3QgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAgIEBWaWV3Q2hpbGQoJ21vZGFsJykgbW9kYWw7XG4gICAgQFZpZXdDaGlsZCgnbGlzdFVzZXInKSBsaXN0VXNlcjogTGlzdFVzZXJDb21wb25lbnQ7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLm1vZGFsLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLm1vZGFsLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQucmVtb3ZlKCk7XG4gICAgfVxuXG4gICAgb3BlbigpIHtcbiAgICAgICAgdGhpcy5saXN0VXNlci5yZXNldERhdGEoKTtcbiAgICAgICAgdGhpcy5tb2RhbC5zaG93KCk7XG4gICAgfVxuXG4gICAgb25TaG93bigpIHtcbiAgICAgICAgdGhpcy5saXN0VXNlci5mb2N1c0lucHV0KCk7XG4gICAgICAgIHRoaXMubGlzdFVzZXIub25TZWFyY2goKTtcbiAgICB9XG5cbiAgICBvblNhdmUoKSB7XG4gICAgICAgIHRoaXMub25TZWxlY3QuZW1pdCh0aGlzLmxpc3RVc2VyLnNlbGVjdE1lbWJlcnMpO1xuICAgICAgICB0aGlzLm1vZGFsLmhpZGUoKTtcbiAgICB9XG5cbiAgICBvbkNhbmNlbCgpIHtcbiAgICAgICAgdGhpcy5tb2RhbC5oaWRlKCk7XG4gICAgfVxufVxuIl19