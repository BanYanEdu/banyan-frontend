/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, IterableDiffers, Output } from '@angular/core';
import { CalAttendeeState } from "../utils/model/CalAttendeeState";
export class CalendarAttendeeListComponent {
    /**
     * @param {?} differs
     */
    constructor(differs) {
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
    ngDoCheck() {
        /** @type {?} */
        const change = this.differ.diff(this.attendees);
        // Detect push item on array
        if (change) {
            this.generateDetail();
        }
    }
    /**
     * @param {?} attendee
     * @return {?}
     */
    removeAttendee(attendee) {
        /** @type {?} */
        let index = this.attendees.indexOf(attendee);
        if (index > -1) {
            this.attendees.splice(index, 1);
            this.onDelete.emit();
        }
    }
    /**
     * @return {?}
     */
    generateDetail() {
        /** @type {?} */
        let accept = 0;
        /** @type {?} */
        let reject = 0;
        /** @type {?} */
        let unknown = 0;
        /** @type {?} */
        let arr = [];
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
    }
    /**
     * @return {?}
     */
    expandAttendees() {
        if (this.expandEnable) {
            this.expanded = !this.expanded;
        }
    }
    /**
     * @param {?} attendee
     * @return {?}
     */
    getStateIcon(attendee) {
        /** @type {?} */
        let cls;
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
    }
}
CalendarAttendeeListComponent.decorators = [
    { type: Component, args: [{
                selector: 'calendar-attendee-list',
                template: "<div *ngIf=\"attendees?.length\" (click)=\"expandAttendees()\" [ngClass]=\"expandEnable ? 'expandable' : ''\"\n     class=\"attendee-detail\">\n    <span class=\"attendee-number\">{{attendees.length}} kh\u00E1ch</span>\n    <i *ngIf=\"expandEnable\" class=\"fa fa-angle-{{expanded ? 'up' : 'down'}}\" style=\"padding-left: 10px\"></i>\n    <div class=\"attendee-desc\">{{stateText}}</div>\n</div>\n<div [ngClass]=\"{'hide': !expanded}\">\n    <div class=\"attendee-item\" *ngFor=\"let attendee of attendees\">\n        <div>\n            <img *ngIf=\"attendee.username; else aliasAvatar\"\n                 class=\"attendee-avatar\"\n                 userAvatar [usercode]=\"attendee.username\">\n            <ng-template #aliasAvatar>\n                <i class=\"attendee-avatar fa fa-question\"></i>\n            </ng-template>\n        </div>\n        <i *ngIf=\"attendee.state\" [title]=\"attendee._stateText\" [ngClass]=\"getStateIcon(attendee)\"></i>\n        <div class=\"attendee-content\">\n            <b>{{attendee.fullname || attendee.alias}} </b>\n            <span> {{attendee.notes}}</span>\n        </div>\n        <div *ngIf=\"editable\">\n            <i class=\"attendee-remove fa fa-times\" (click)=\"removeAttendee(attendee)\"></i>\n        </div>\n    </div>\n</div>",
                styles: [".attendee-detail{margin-bottom:2px;line-height:16px;display:inline-block}.attendee-detail.expandable{cursor:pointer}.attendee-detail.expandable:hover{background:rgba(0,0,0,.04)}.attendee-number{font-size:14px}.attendee-desc{font-size:13px;color:rgba(0,0,0,.5)}.attendee-item{position:relative;padding:4px 0;overflow:hidden;display:flex;align-items:center}.attendee-item:hover{background:rgba(0,0,0,.04)}.attendee-item:hover .attendee-remove{display:block}.attendee-item .attendee-remove{flex-grow:0;color:rgba(0,0,0,.3);width:24px;height:24px;line-height:24px;cursor:pointer;text-align:center;display:none;font-size:12px}.attendee-avatar{flex-grow:0;width:24px;height:24px;border-radius:50%;margin-right:15px}i.attendee-avatar{text-align:center;line-height:24px;font-size:20px;background:#6c757d;color:#fff}.attendee-content{flex-grow:1;overflow:hidden;font-size:13px;line-height:16px;color:rgba(0,0,0,.5)}.attendee-content b{color:rgba(0,0,0,.7)}.attendee-info{position:absolute;top:50%;left:18px;font-size:8px;width:14px;height:14px;line-height:12px;border-radius:50%;border:1px solid #fff;color:#fff;text-align:center}.attendee-info.accept{background:#28a745}.attendee-info.reject{background:#dc3545}.attendee-info.unknown{background:#6c757d}"]
            }] }
];
/** @nocollapse */
CalendarAttendeeListComponent.ctorParameters = () => [
    { type: IterableDiffers }
];
CalendarAttendeeListComponent.propDecorators = {
    attendees: [{ type: Input }],
    editable: [{ type: Input }],
    expandable: [{ type: Input }],
    onDelete: [{ type: Output }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXR0ZW5kZWUtbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbmV0LWNhbGVuZGFyLyIsInNvdXJjZXMiOlsic3JjL2F0dGVuZGVlLWxpc3QvYXR0ZW5kZWUtbGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQVcsWUFBWSxFQUFFLEtBQUssRUFBRSxlQUFlLEVBQUUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRS9GLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLGlDQUFpQyxDQUFDO0FBUWpFLE1BQU0sT0FBTyw2QkFBNkI7Ozs7SUFXeEMsWUFBWSxPQUF3QjtRQVYzQixjQUFTLEdBQWtCLEVBQUUsQ0FBQztRQUM5QixhQUFRLEdBQVksS0FBSyxDQUFDO1FBQzFCLGVBQVUsR0FBWSxLQUFLLENBQUM7UUFDM0IsYUFBUSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFJeEMsaUJBQVksR0FBWSxJQUFJLENBQUM7UUFDN0IsYUFBUSxHQUFZLElBQUksQ0FBQztRQUd2QixJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlDLENBQUM7Ozs7SUFFRCxTQUFTOztjQUNELE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBRS9DLDRCQUE0QjtRQUM1QixJQUFJLE1BQU0sRUFBRTtZQUNWLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztTQUN2QjtJQUNILENBQUM7Ozs7O0lBRUQsY0FBYyxDQUFDLFFBQVE7O1lBQ2pCLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7UUFDNUMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEVBQUU7WUFDZCxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDaEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUN0QjtJQUNILENBQUM7Ozs7SUFFRCxjQUFjOztZQUNSLE1BQU0sR0FBVyxDQUFDOztZQUNsQixNQUFNLEdBQVcsQ0FBQzs7WUFDbEIsT0FBTyxHQUFXLENBQUM7O1lBQ25CLEdBQUcsR0FBYSxFQUFFO1FBRXRCLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTzs7OztRQUFDLFVBQVUsSUFBSTtZQUNqQyxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssZ0JBQWdCLENBQUMsUUFBUSxFQUFFO2dCQUMxQyxJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztnQkFDNUIsTUFBTSxFQUFFLENBQUM7YUFDWjtpQkFBTSxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssZ0JBQWdCLENBQUMsUUFBUSxFQUFFO2dCQUNqRCxJQUFJLENBQUMsVUFBVSxHQUFHLGVBQWUsQ0FBQztnQkFDbEMsTUFBTSxFQUFFLENBQUM7YUFDWjtpQkFBTSxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssZ0JBQWdCLENBQUMsWUFBWSxFQUFFO2dCQUNyRCxJQUFJLENBQUMsVUFBVSxHQUFHLGlCQUFpQixDQUFDO2dCQUNwQyxPQUFPLEVBQUUsQ0FBQzthQUNiO1FBQ0wsQ0FBQyxFQUFDLENBQUM7UUFFSCxJQUFJLE1BQU0sRUFBRTtZQUNWLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxDQUFDO1NBQzFCO1FBQ0QsSUFBSSxNQUFNLEVBQUU7WUFDVixHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsQ0FBQztTQUM3QjtRQUNELElBQUksT0FBTyxFQUFFO1lBQ1gsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsa0JBQWtCLENBQUMsQ0FBQztTQUN4QztRQUNELElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsQyxDQUFDOzs7O0lBRUQsZUFBZTtRQUNiLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNyQixJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztTQUNoQztJQUNILENBQUM7Ozs7O0lBRUQsWUFBWSxDQUFDLFFBQVE7O1lBQ2YsR0FBRztRQUNQLFFBQU8sUUFBUSxDQUFDLEtBQUssRUFBRTtZQUNyQixLQUFLLFVBQVU7Z0JBQ2IsR0FBRyxHQUFHLGlCQUFpQixDQUFDO2dCQUN4QixNQUFNO1lBQ1IsS0FBSyxVQUFVO2dCQUNiLEdBQUcsR0FBRyxpQkFBaUIsQ0FBQztnQkFDeEIsTUFBTTtZQUNSO2dCQUNFLEdBQUcsR0FBRyxrQkFBa0IsQ0FBQztTQUM1QjtRQUNELE9BQU8sbUJBQW1CLEdBQUcsR0FBRyxDQUFDO0lBQ25DLENBQUM7OztZQXhGRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHdCQUF3QjtnQkFDbEMsbXhDQUE2Qzs7YUFFOUM7Ozs7WUFSZ0QsZUFBZTs7O3dCQVc3RCxLQUFLO3VCQUNMLEtBQUs7eUJBQ0wsS0FBSzt1QkFDTCxNQUFNOzs7O0lBSFAsa0RBQXVDOztJQUN2QyxpREFBbUM7O0lBQ25DLG1EQUFxQzs7SUFDckMsaURBQXdDOztJQUV4QywrQ0FBWTs7SUFDWixrREFBa0I7O0lBQ2xCLHFEQUE2Qjs7SUFDN0IsaURBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIERvQ2hlY2ssIEV2ZW50RW1pdHRlciwgSW5wdXQsIEl0ZXJhYmxlRGlmZmVycywgT3V0cHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q2FsQXR0ZW5kZWV9IGZyb20gXCIuLi91dGlscy9tb2RlbC9DYWxBdHRlbmRlZVwiO1xuaW1wb3J0IHtDYWxBdHRlbmRlZVN0YXRlfSBmcm9tIFwiLi4vdXRpbHMvbW9kZWwvQ2FsQXR0ZW5kZWVTdGF0ZVwiO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjYWxlbmRhci1hdHRlbmRlZS1saXN0JyxcbiAgdGVtcGxhdGVVcmw6ICcuL2F0dGVuZGVlLWxpc3QuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9hdHRlbmRlZS1saXN0LmNvbXBvbmVudC5jc3MnXVxufSlcblxuZXhwb3J0IGNsYXNzIENhbGVuZGFyQXR0ZW5kZWVMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgRG9DaGVjayB7XG4gIEBJbnB1dCgpIGF0dGVuZGVlczogQ2FsQXR0ZW5kZWVbXSA9IFtdO1xuICBASW5wdXQoKSBlZGl0YWJsZTogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBleHBhbmRhYmxlOiBib29sZWFuID0gZmFsc2U7XG4gIEBPdXRwdXQoKSBvbkRlbGV0ZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBkaWZmZXI6IGFueTtcbiAgc3RhdGVUZXh0OiBzdHJpbmc7XG4gIGV4cGFuZEVuYWJsZTogYm9vbGVhbiA9IHRydWU7XG4gIGV4cGFuZGVkOiBib29sZWFuID0gdHJ1ZTtcblxuICBjb25zdHJ1Y3RvcihkaWZmZXJzOiBJdGVyYWJsZURpZmZlcnMpIHtcbiAgICB0aGlzLmRpZmZlciA9IGRpZmZlcnMuZmluZChbXSkuY3JlYXRlKG51bGwpO1xuICB9XG5cbiAgbmdEb0NoZWNrKCkge1xuICAgIGNvbnN0IGNoYW5nZSA9IHRoaXMuZGlmZmVyLmRpZmYodGhpcy5hdHRlbmRlZXMpO1xuXG4gICAgLy8gRGV0ZWN0IHB1c2ggaXRlbSBvbiBhcnJheVxuICAgIGlmIChjaGFuZ2UpIHtcbiAgICAgIHRoaXMuZ2VuZXJhdGVEZXRhaWwoKTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVBdHRlbmRlZShhdHRlbmRlZSkge1xuICAgIGxldCBpbmRleCA9IHRoaXMuYXR0ZW5kZWVzLmluZGV4T2YoYXR0ZW5kZWUpO1xuICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICB0aGlzLmF0dGVuZGVlcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgdGhpcy5vbkRlbGV0ZS5lbWl0KCk7XG4gICAgfVxuICB9XG5cbiAgZ2VuZXJhdGVEZXRhaWwoKSB7XG4gICAgbGV0IGFjY2VwdDogbnVtYmVyID0gMCxcbiAgICAgICAgcmVqZWN0OiBudW1iZXIgPSAwLFxuICAgICAgICB1bmtub3duOiBudW1iZXIgPSAwO1xuICAgIGxldCBhcnI6IHN0cmluZ1tdID0gW107XG5cbiAgICB0aGlzLmF0dGVuZGVlcy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIGlmIChpdGVtLnN0YXRlID09PSBDYWxBdHRlbmRlZVN0YXRlLkFDQ0VQVEVEKSB7XG4gICAgICAgICAgICBpdGVtLl9zdGF0ZVRleHQgPSAnVGhhbSBk4buxJztcbiAgICAgICAgICAgIGFjY2VwdCsrO1xuICAgICAgICB9IGVsc2UgaWYgKGl0ZW0uc3RhdGUgPT09IENhbEF0dGVuZGVlU3RhdGUuREVDTElORUQpIHtcbiAgICAgICAgICAgIGl0ZW0uX3N0YXRlVGV4dCA9ICdLaMO0bmcgdGhhbSBk4buxJztcbiAgICAgICAgICAgIHJlamVjdCsrO1xuICAgICAgICB9IGVsc2UgaWYgKGl0ZW0uc3RhdGUgPT09IENhbEF0dGVuZGVlU3RhdGUuTkVFRFNfQUNUSU9OKSB7XG4gICAgICAgICAgICBpdGVtLl9zdGF0ZVRleHQgPSAnQ2jGsGEgcXV54bq/dCDEkeG7i25oJztcbiAgICAgICAgICAgIHVua25vd24rKztcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKGFjY2VwdCkge1xuICAgICAgYXJyLnB1c2goYWNjZXB0ICsgJyBjw7MnKTtcbiAgICB9XG4gICAgaWYgKHJlamVjdCkge1xuICAgICAgYXJyLnB1c2gocmVqZWN0ICsgJyBraMO0bmcnKTtcbiAgICB9XG4gICAgaWYgKHVua25vd24pIHtcbiAgICAgIGFyci5wdXNoKHVua25vd24gKyAnIGNoxrBhIHF1eeG6v3QgxJHhu4tuaCcpO1xuICAgIH1cbiAgICB0aGlzLnN0YXRlVGV4dCA9IGFyci5qb2luKCcsICcpO1xuICB9XG5cbiAgZXhwYW5kQXR0ZW5kZWVzKCkge1xuICAgIGlmICh0aGlzLmV4cGFuZEVuYWJsZSkge1xuICAgICAgdGhpcy5leHBhbmRlZCA9ICF0aGlzLmV4cGFuZGVkO1xuICAgIH1cbiAgfVxuXG4gIGdldFN0YXRlSWNvbihhdHRlbmRlZSkge1xuICAgIGxldCBjbHM7XG4gICAgc3dpdGNoKGF0dGVuZGVlLnN0YXRlKSB7XG4gICAgICBjYXNlICdBQ0NFUFRFRCc6XG4gICAgICAgIGNscyA9ICdmYS1jaGVjayBhY2NlcHQnO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ0RFQ0xJTkVEJzpcbiAgICAgICAgY2xzID0gJ2ZhLWNoZWNrIGFjY2VwdCc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgY2xzID0gJ2ZhLWNoZWNrIHVua25vd24nO1xuICAgIH1cbiAgICByZXR1cm4gJ2F0dGVuZGVlLWluZm8gZmEgJyArIGNscztcbiAgfVxufVxuIl19