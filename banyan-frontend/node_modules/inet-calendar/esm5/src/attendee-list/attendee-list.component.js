/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, IterableDiffers, Output } from '@angular/core';
import { CalAttendeeState } from "../utils/model/CalAttendeeState";
var CalendarAttendeeListComponent = /** @class */ (function () {
    function CalendarAttendeeListComponent(differs) {
        this.attendees = [];
        this.editable = false;
        this.expandable = false;
        this.onDelete = new EventEmitter();
        this.expandEnable = true;
        this.expanded = true;
        this.differ = differs.find([]).create(null);
    }
    /**
     * @return {?}
     */
    CalendarAttendeeListComponent.prototype.ngDoCheck = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var change = this.differ.diff(this.attendees);
        // Detect push item on array
        if (change) {
            this.generateDetail();
        }
    };
    /**
     * @param {?} attendee
     * @return {?}
     */
    CalendarAttendeeListComponent.prototype.removeAttendee = /**
     * @param {?} attendee
     * @return {?}
     */
    function (attendee) {
        /** @type {?} */
        var index = this.attendees.indexOf(attendee);
        if (index > -1) {
            this.attendees.splice(index, 1);
            this.onDelete.emit();
        }
    };
    /**
     * @return {?}
     */
    CalendarAttendeeListComponent.prototype.generateDetail = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var accept = 0;
        /** @type {?} */
        var reject = 0;
        /** @type {?} */
        var unknown = 0;
        /** @type {?} */
        var arr = [];
        this.attendees.forEach((/**
         * @param {?} item
         * @return {?}
         */
        function (item) {
            if (item.state === CalAttendeeState.ACCEPTED) {
                item._stateText = 'Tham dự';
                accept++;
            }
            else if (item.state === CalAttendeeState.DECLINED) {
                item._stateText = 'Không tham dự';
                reject++;
            }
            else if (item.state === CalAttendeeState.NEEDS_ACTION) {
                item._stateText = 'Chưa quyết định';
                unknown++;
            }
        }));
        if (accept) {
            arr.push(accept + ' có');
        }
        if (reject) {
            arr.push(reject + ' không');
        }
        if (unknown) {
            arr.push(unknown + ' chưa quyết định');
        }
        this.stateText = arr.join(', ');
    };
    /**
     * @return {?}
     */
    CalendarAttendeeListComponent.prototype.expandAttendees = /**
     * @return {?}
     */
    function () {
        if (this.expandEnable) {
            this.expanded = !this.expanded;
        }
    };
    /**
     * @param {?} attendee
     * @return {?}
     */
    CalendarAttendeeListComponent.prototype.getStateIcon = /**
     * @param {?} attendee
     * @return {?}
     */
    function (attendee) {
        /** @type {?} */
        var cls;
        switch (attendee.state) {
            case 'ACCEPTED':
                cls = 'fa-check accept';
                break;
            case 'DECLINED':
                cls = 'fa-check accept';
                break;
            default:
                cls = 'fa-check unknown';
        }
        return 'attendee-info fa ' + cls;
    };
    CalendarAttendeeListComponent.decorators = [
        { type: Component, args: [{
                    selector: 'calendar-attendee-list',
                    template: "<div *ngIf=\"attendees?.length\" (click)=\"expandAttendees()\" [ngClass]=\"expandEnable ? 'expandable' : ''\"\n     class=\"attendee-detail\">\n    <span class=\"attendee-number\">{{attendees.length}} kh\u00E1ch</span>\n    <i *ngIf=\"expandEnable\" class=\"fa fa-angle-{{expanded ? 'up' : 'down'}}\" style=\"padding-left: 10px\"></i>\n    <div class=\"attendee-desc\">{{stateText}}</div>\n</div>\n<div [ngClass]=\"{'hide': !expanded}\">\n    <div class=\"attendee-item\" *ngFor=\"let attendee of attendees\">\n        <div>\n            <img *ngIf=\"attendee.username; else aliasAvatar\"\n                 class=\"attendee-avatar\"\n                 userAvatar [usercode]=\"attendee.username\">\n            <ng-template #aliasAvatar>\n                <i class=\"attendee-avatar fa fa-question\"></i>\n            </ng-template>\n        </div>\n        <i *ngIf=\"attendee.state\" [title]=\"attendee._stateText\" [ngClass]=\"getStateIcon(attendee)\"></i>\n        <div class=\"attendee-content\">\n            <b>{{attendee.fullname || attendee.alias}} </b>\n            <span> {{attendee.notes}}</span>\n        </div>\n        <div *ngIf=\"editable\">\n            <i class=\"attendee-remove fa fa-times\" (click)=\"removeAttendee(attendee)\"></i>\n        </div>\n    </div>\n</div>",
                    styles: [".attendee-detail{margin-bottom:2px;line-height:16px;display:inline-block}.attendee-detail.expandable{cursor:pointer}.attendee-detail.expandable:hover{background:rgba(0,0,0,.04)}.attendee-number{font-size:14px}.attendee-desc{font-size:13px;color:rgba(0,0,0,.5)}.attendee-item{position:relative;padding:4px 0;overflow:hidden;display:flex;align-items:center}.attendee-item:hover{background:rgba(0,0,0,.04)}.attendee-item:hover .attendee-remove{display:block}.attendee-item .attendee-remove{flex-grow:0;color:rgba(0,0,0,.3);width:24px;height:24px;line-height:24px;cursor:pointer;text-align:center;display:none;font-size:12px}.attendee-avatar{flex-grow:0;width:24px;height:24px;border-radius:50%;margin-right:15px}i.attendee-avatar{text-align:center;line-height:24px;font-size:20px;background:#6c757d;color:#fff}.attendee-content{flex-grow:1;overflow:hidden;font-size:13px;line-height:16px;color:rgba(0,0,0,.5)}.attendee-content b{color:rgba(0,0,0,.7)}.attendee-info{position:absolute;top:50%;left:18px;font-size:8px;width:14px;height:14px;line-height:12px;border-radius:50%;border:1px solid #fff;color:#fff;text-align:center}.attendee-info.accept{background:#28a745}.attendee-info.reject{background:#dc3545}.attendee-info.unknown{background:#6c757d}"]
                }] }
    ];
    /** @nocollapse */
    CalendarAttendeeListComponent.ctorParameters = function () { return [
        { type: IterableDiffers }
    ]; };
    CalendarAttendeeListComponent.propDecorators = {
        attendees: [{ type: Input }],
        editable: [{ type: Input }],
        expandable: [{ type: Input }],
        onDelete: [{ type: Output }]
    };
    return CalendarAttendeeListComponent;
}());
export { CalendarAttendeeListComponent };
if (false) {
    /** @type {?} */
    CalendarAttendeeListComponent.prototype.attendees;
    /** @type {?} */
    CalendarAttendeeListComponent.prototype.editable;
    /** @type {?} */
    CalendarAttendeeListComponent.prototype.expandable;
    /** @type {?} */
    CalendarAttendeeListComponent.prototype.onDelete;
    /** @type {?} */
    CalendarAttendeeListComponent.prototype.differ;
    /** @type {?} */
    CalendarAttendeeListComponent.prototype.stateText;
    /** @type {?} */
    CalendarAttendeeListComponent.prototype.expandEnable;
    /** @type {?} */
    CalendarAttendeeListComponent.prototype.expanded;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXR0ZW5kZWUtbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbmV0LWNhbGVuZGFyLyIsInNvdXJjZXMiOlsic3JjL2F0dGVuZGVlLWxpc3QvYXR0ZW5kZWUtbGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQVcsWUFBWSxFQUFFLEtBQUssRUFBRSxlQUFlLEVBQUUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRS9GLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLGlDQUFpQyxDQUFDO0FBRWpFO0lBaUJFLHVDQUFZLE9BQXdCO1FBVjNCLGNBQVMsR0FBa0IsRUFBRSxDQUFDO1FBQzlCLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFDMUIsZUFBVSxHQUFZLEtBQUssQ0FBQztRQUMzQixhQUFRLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUl4QyxpQkFBWSxHQUFZLElBQUksQ0FBQztRQUM3QixhQUFRLEdBQVksSUFBSSxDQUFDO1FBR3ZCLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUMsQ0FBQzs7OztJQUVELGlEQUFTOzs7SUFBVDs7WUFDUSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUUvQyw0QkFBNEI7UUFDNUIsSUFBSSxNQUFNLEVBQUU7WUFDVixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDdkI7SUFDSCxDQUFDOzs7OztJQUVELHNEQUFjOzs7O0lBQWQsVUFBZSxRQUFROztZQUNqQixLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO1FBQzVDLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxFQUFFO1lBQ2QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDdEI7SUFDSCxDQUFDOzs7O0lBRUQsc0RBQWM7OztJQUFkOztZQUNNLE1BQU0sR0FBVyxDQUFDOztZQUNsQixNQUFNLEdBQVcsQ0FBQzs7WUFDbEIsT0FBTyxHQUFXLENBQUM7O1lBQ25CLEdBQUcsR0FBYSxFQUFFO1FBRXRCLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTzs7OztRQUFDLFVBQVUsSUFBSTtZQUNqQyxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssZ0JBQWdCLENBQUMsUUFBUSxFQUFFO2dCQUMxQyxJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztnQkFDNUIsTUFBTSxFQUFFLENBQUM7YUFDWjtpQkFBTSxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssZ0JBQWdCLENBQUMsUUFBUSxFQUFFO2dCQUNqRCxJQUFJLENBQUMsVUFBVSxHQUFHLGVBQWUsQ0FBQztnQkFDbEMsTUFBTSxFQUFFLENBQUM7YUFDWjtpQkFBTSxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssZ0JBQWdCLENBQUMsWUFBWSxFQUFFO2dCQUNyRCxJQUFJLENBQUMsVUFBVSxHQUFHLGlCQUFpQixDQUFDO2dCQUNwQyxPQUFPLEVBQUUsQ0FBQzthQUNiO1FBQ0wsQ0FBQyxFQUFDLENBQUM7UUFFSCxJQUFJLE1BQU0sRUFBRTtZQUNWLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxDQUFDO1NBQzFCO1FBQ0QsSUFBSSxNQUFNLEVBQUU7WUFDVixHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsQ0FBQztTQUM3QjtRQUNELElBQUksT0FBTyxFQUFFO1lBQ1gsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsa0JBQWtCLENBQUMsQ0FBQztTQUN4QztRQUNELElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsQyxDQUFDOzs7O0lBRUQsdURBQWU7OztJQUFmO1FBQ0UsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1NBQ2hDO0lBQ0gsQ0FBQzs7Ozs7SUFFRCxvREFBWTs7OztJQUFaLFVBQWEsUUFBUTs7WUFDZixHQUFHO1FBQ1AsUUFBTyxRQUFRLENBQUMsS0FBSyxFQUFFO1lBQ3JCLEtBQUssVUFBVTtnQkFDYixHQUFHLEdBQUcsaUJBQWlCLENBQUM7Z0JBQ3hCLE1BQU07WUFDUixLQUFLLFVBQVU7Z0JBQ2IsR0FBRyxHQUFHLGlCQUFpQixDQUFDO2dCQUN4QixNQUFNO1lBQ1I7Z0JBQ0UsR0FBRyxHQUFHLGtCQUFrQixDQUFDO1NBQzVCO1FBQ0QsT0FBTyxtQkFBbUIsR0FBRyxHQUFHLENBQUM7SUFDbkMsQ0FBQzs7Z0JBeEZGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsd0JBQXdCO29CQUNsQyxteENBQTZDOztpQkFFOUM7Ozs7Z0JBUmdELGVBQWU7Ozs0QkFXN0QsS0FBSzsyQkFDTCxLQUFLOzZCQUNMLEtBQUs7MkJBQ0wsTUFBTTs7SUErRVQsb0NBQUM7Q0FBQSxBQXpGRCxJQXlGQztTQW5GWSw2QkFBNkI7OztJQUN4QyxrREFBdUM7O0lBQ3ZDLGlEQUFtQzs7SUFDbkMsbURBQXFDOztJQUNyQyxpREFBd0M7O0lBRXhDLCtDQUFZOztJQUNaLGtEQUFrQjs7SUFDbEIscURBQTZCOztJQUM3QixpREFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgRG9DaGVjaywgRXZlbnRFbWl0dGVyLCBJbnB1dCwgSXRlcmFibGVEaWZmZXJzLCBPdXRwdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDYWxBdHRlbmRlZX0gZnJvbSBcIi4uL3V0aWxzL21vZGVsL0NhbEF0dGVuZGVlXCI7XG5pbXBvcnQge0NhbEF0dGVuZGVlU3RhdGV9IGZyb20gXCIuLi91dGlscy9tb2RlbC9DYWxBdHRlbmRlZVN0YXRlXCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2NhbGVuZGFyLWF0dGVuZGVlLWxpc3QnLFxuICB0ZW1wbGF0ZVVybDogJy4vYXR0ZW5kZWUtbGlzdC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2F0dGVuZGVlLWxpc3QuY29tcG9uZW50LmNzcyddXG59KVxuXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJBdHRlbmRlZUxpc3RDb21wb25lbnQgaW1wbGVtZW50cyBEb0NoZWNrIHtcbiAgQElucHV0KCkgYXR0ZW5kZWVzOiBDYWxBdHRlbmRlZVtdID0gW107XG4gIEBJbnB1dCgpIGVkaXRhYmxlOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIGV4cGFuZGFibGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQE91dHB1dCgpIG9uRGVsZXRlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGRpZmZlcjogYW55O1xuICBzdGF0ZVRleHQ6IHN0cmluZztcbiAgZXhwYW5kRW5hYmxlOiBib29sZWFuID0gdHJ1ZTtcbiAgZXhwYW5kZWQ6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIGNvbnN0cnVjdG9yKGRpZmZlcnM6IEl0ZXJhYmxlRGlmZmVycykge1xuICAgIHRoaXMuZGlmZmVyID0gZGlmZmVycy5maW5kKFtdKS5jcmVhdGUobnVsbCk7XG4gIH1cblxuICBuZ0RvQ2hlY2soKSB7XG4gICAgY29uc3QgY2hhbmdlID0gdGhpcy5kaWZmZXIuZGlmZih0aGlzLmF0dGVuZGVlcyk7XG5cbiAgICAvLyBEZXRlY3QgcHVzaCBpdGVtIG9uIGFycmF5XG4gICAgaWYgKGNoYW5nZSkge1xuICAgICAgdGhpcy5nZW5lcmF0ZURldGFpbCgpO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZUF0dGVuZGVlKGF0dGVuZGVlKSB7XG4gICAgbGV0IGluZGV4ID0gdGhpcy5hdHRlbmRlZXMuaW5kZXhPZihhdHRlbmRlZSk7XG4gICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgIHRoaXMuYXR0ZW5kZWVzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICB0aGlzLm9uRGVsZXRlLmVtaXQoKTtcbiAgICB9XG4gIH1cblxuICBnZW5lcmF0ZURldGFpbCgpIHtcbiAgICBsZXQgYWNjZXB0OiBudW1iZXIgPSAwLFxuICAgICAgICByZWplY3Q6IG51bWJlciA9IDAsXG4gICAgICAgIHVua25vd246IG51bWJlciA9IDA7XG4gICAgbGV0IGFycjogc3RyaW5nW10gPSBbXTtcblxuICAgIHRoaXMuYXR0ZW5kZWVzLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgaWYgKGl0ZW0uc3RhdGUgPT09IENhbEF0dGVuZGVlU3RhdGUuQUNDRVBURUQpIHtcbiAgICAgICAgICAgIGl0ZW0uX3N0YXRlVGV4dCA9ICdUaGFtIGThu7EnO1xuICAgICAgICAgICAgYWNjZXB0Kys7XG4gICAgICAgIH0gZWxzZSBpZiAoaXRlbS5zdGF0ZSA9PT0gQ2FsQXR0ZW5kZWVTdGF0ZS5ERUNMSU5FRCkge1xuICAgICAgICAgICAgaXRlbS5fc3RhdGVUZXh0ID0gJ0tow7RuZyB0aGFtIGThu7EnO1xuICAgICAgICAgICAgcmVqZWN0Kys7XG4gICAgICAgIH0gZWxzZSBpZiAoaXRlbS5zdGF0ZSA9PT0gQ2FsQXR0ZW5kZWVTdGF0ZS5ORUVEU19BQ1RJT04pIHtcbiAgICAgICAgICAgIGl0ZW0uX3N0YXRlVGV4dCA9ICdDaMawYSBxdXnhur90IMSR4buLbmgnO1xuICAgICAgICAgICAgdW5rbm93bisrO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAoYWNjZXB0KSB7XG4gICAgICBhcnIucHVzaChhY2NlcHQgKyAnIGPDsycpO1xuICAgIH1cbiAgICBpZiAocmVqZWN0KSB7XG4gICAgICBhcnIucHVzaChyZWplY3QgKyAnIGtow7RuZycpO1xuICAgIH1cbiAgICBpZiAodW5rbm93bikge1xuICAgICAgYXJyLnB1c2godW5rbm93biArICcgY2jGsGEgcXV54bq/dCDEkeG7i25oJyk7XG4gICAgfVxuICAgIHRoaXMuc3RhdGVUZXh0ID0gYXJyLmpvaW4oJywgJyk7XG4gIH1cblxuICBleHBhbmRBdHRlbmRlZXMoKSB7XG4gICAgaWYgKHRoaXMuZXhwYW5kRW5hYmxlKSB7XG4gICAgICB0aGlzLmV4cGFuZGVkID0gIXRoaXMuZXhwYW5kZWQ7XG4gICAgfVxuICB9XG5cbiAgZ2V0U3RhdGVJY29uKGF0dGVuZGVlKSB7XG4gICAgbGV0IGNscztcbiAgICBzd2l0Y2goYXR0ZW5kZWUuc3RhdGUpIHtcbiAgICAgIGNhc2UgJ0FDQ0VQVEVEJzpcbiAgICAgICAgY2xzID0gJ2ZhLWNoZWNrIGFjY2VwdCc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnREVDTElORUQnOlxuICAgICAgICBjbHMgPSAnZmEtY2hlY2sgYWNjZXB0JztcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBjbHMgPSAnZmEtY2hlY2sgdW5rbm93bic7XG4gICAgfVxuICAgIHJldHVybiAnYXR0ZW5kZWUtaW5mbyBmYSAnICsgY2xzO1xuICB9XG59XG4iXX0=