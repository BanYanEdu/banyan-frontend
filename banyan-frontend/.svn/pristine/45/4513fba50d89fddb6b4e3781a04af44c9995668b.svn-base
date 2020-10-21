/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { DialogAction } from "../dialog-action";
import { TranslateService } from "@ngx-translate/core";
export class ConfirmDialogComponent {
    /**
     * @param {?} modalService
     * @param {?} translate
     */
    constructor(modalService, translate) {
        this.modalService = modalService;
        this.translate = translate;
        this.id = iNet.generateId();
        this.iconCls = '';
        this.title = '';
        this.content = '';
        this.cls = '';
        this.actions = [];
        this.translateSubscription = translate.get(['TOOLBAR']).subscribe((/**
         * @param {?} res
         * @return {?}
         */
        res => {
            const { TOOLBAR } = res || { 'TOOLBAR': { 'CLOSE': 'Close' } };
            this.toolbarTranslations = TOOLBAR;
        }));
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.getActions().length < 1) {
            const { CLOSE } = this.toolbarTranslations;
            /** @type {?} */
            let closeAction = new DialogAction(CLOSE, 'btn-danger', 'fa fa-check', this.hide);
            this.setActions([closeAction]);
        }
    }
    /**
     * @return {?}
     */
    hide() {
        this.modalRef.hide();
    }
    /**
     * @return {?}
     */
    show() {
        this.modalRef = this.modalService.show(this.confirmModal);
    }
    /**
     * @param {?} action
     * @return {?}
     */
    pushAction(action) {
        this.actions.push(action);
    }
    /**
     * @param {?} actions
     * @return {?}
     */
    setActions(actions) {
        this.actions = actions;
    }
    /**
     * @return {?}
     */
    getActions() {
        return this.actions;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    setData(v) {
        this.data = v;
    }
    /**
     * @return {?}
     */
    getData() {
        return this.data;
    }
    /**
     * @return {?}
     */
    getId() {
        return this.id;
    }
}
ConfirmDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-confirm-dialog',
                template: "<ng-template #confirmModal>\n    <div class=\"modal-header\">\n        <h4 class=\"modal-title pull-left\"><i class=\"{{iconCls}}\"></i> {{title}}</h4>\n        <button type=\"button\" class=\"close pull-right\" (click)=\"hide()\">\n            <span aria-hidden=\"true\">&times;</span>\n        </button>\n    </div>\n    <div class=\"modal-body\" [innerHTML]=\"content\"></div>\n    <div class=\"modal-footer text-right\">\n        <button type=\"button\" *ngFor=\"let action of actions\" class=\"btn btn-sm {{action.cls}}\"\n                (click)=\"action?.fn.bind(this)()\"><i class=\"{{action.iconCls}}\"></i> {{action.title}}</button>\n    </div>\n</ng-template>\n"
            }] }
];
/** @nocollapse */
ConfirmDialogComponent.ctorParameters = () => [
    { type: BsModalService },
    { type: TranslateService }
];
ConfirmDialogComponent.propDecorators = {
    confirmModal: [{ type: ViewChild, args: ['confirmModal',] }],
    id: [{ type: Input, args: ['id',] }],
    iconCls: [{ type: Input, args: ['iconCls',] }],
    title: [{ type: Input, args: ['title',] }],
    content: [{ type: Input, args: ['content',] }],
    cls: [{ type: Input, args: ['cls',] }],
    actions: [{ type: Input, args: ['actions',] }]
};
if (false) {
    /** @type {?} */
    ConfirmDialogComponent.prototype.confirmModal;
    /** @type {?} */
    ConfirmDialogComponent.prototype.id;
    /** @type {?} */
    ConfirmDialogComponent.prototype.iconCls;
    /** @type {?} */
    ConfirmDialogComponent.prototype.title;
    /** @type {?} */
    ConfirmDialogComponent.prototype.content;
    /** @type {?} */
    ConfirmDialogComponent.prototype.cls;
    /** @type {?} */
    ConfirmDialogComponent.prototype.actions;
    /**
     * @type {?}
     * @private
     */
    ConfirmDialogComponent.prototype.modalRef;
    /**
     * @type {?}
     * @private
     */
    ConfirmDialogComponent.prototype.data;
    /**
     * @type {?}
     * @private
     */
    ConfirmDialogComponent.prototype.toolbarTranslations;
    /**
     * @type {?}
     * @private
     */
    ConfirmDialogComponent.prototype.translateSubscription;
    /**
     * @type {?}
     * @private
     */
    ConfirmDialogComponent.prototype.modalService;
    /**
     * @type {?}
     * @private
     */
    ConfirmDialogComponent.prototype.translate;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlybS1kaWFsb2cuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC11aS8iLCJzb3VyY2VzIjpbInNyYy9kaWFsb2cvY29uZmlybS1kaWFsb2cvY29uZmlybS1kaWFsb2cuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBVSxXQUFXLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQy9FLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUVuRCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFFOUMsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFRckQsTUFBTSxPQUFPLHNCQUFzQjs7Ozs7SUFnQi9CLFlBQW9CLFlBQTRCLEVBQVUsU0FBMkI7UUFBakUsaUJBQVksR0FBWixZQUFZLENBQWdCO1FBQVUsY0FBUyxHQUFULFNBQVMsQ0FBa0I7UUFaeEUsT0FBRSxHQUFXLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUMxQixZQUFPLEdBQVcsRUFBRSxDQUFDO1FBQ3ZCLFVBQUssR0FBVyxFQUFFLENBQUM7UUFDakIsWUFBTyxHQUFXLEVBQUUsQ0FBQztRQUN6QixRQUFHLEdBQVcsRUFBRSxDQUFDO1FBQ2IsWUFBTyxHQUF3QixFQUFFLENBQUM7UUFRaEQsSUFBSSxDQUFDLHFCQUFxQixHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFNBQVM7Ozs7UUFBQyxHQUFHLENBQUMsRUFBRTtrQkFDOUQsRUFBQyxPQUFPLEVBQUMsR0FBRyxHQUFHLElBQUksRUFBQyxTQUFTLEVBQUUsRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFDLEVBQUM7WUFDeEQsSUFBSSxDQUFDLG1CQUFtQixHQUFHLE9BQU8sQ0FBQztRQUN2QyxDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7Ozs7SUFFRCxRQUFRO1FBQ0osSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtrQkFDeEIsRUFBQyxLQUFLLEVBQUMsR0FBRyxJQUFJLENBQUMsbUJBQW1COztnQkFDcEMsV0FBVyxHQUFHLElBQUksWUFBWSxDQUFDLEtBQUssRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDakYsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7U0FDbEM7SUFDTCxDQUFDOzs7O0lBRU0sSUFBSTtRQUNQLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDekIsQ0FBQzs7OztJQUVELElBQUk7UUFDQSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUM5RCxDQUFDOzs7OztJQUVELFVBQVUsQ0FBQyxNQUFvQjtRQUMzQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUM3QixDQUFDOzs7OztJQUVELFVBQVUsQ0FBQyxPQUE0QjtRQUNuQyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUMzQixDQUFDOzs7O0lBRUQsVUFBVTtRQUNOLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN4QixDQUFDOzs7OztJQUVELE9BQU8sQ0FBQyxDQUFNO1FBQ1YsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUM7SUFDbEIsQ0FBQzs7OztJQUVELE9BQU87UUFDSCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDckIsQ0FBQzs7OztJQUVELEtBQUs7UUFDRCxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUM7SUFDbkIsQ0FBQzs7O1lBakVKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsb0JBQW9CO2dCQUM5Qiw0cUJBQThDO2FBQ2pEOzs7O1lBWE8sY0FBYztZQUlkLGdCQUFnQjs7OzJCQVVuQixTQUFTLFNBQUMsY0FBYztpQkFFeEIsS0FBSyxTQUFDLElBQUk7c0JBQ1YsS0FBSyxTQUFDLFNBQVM7b0JBQ2YsS0FBSyxTQUFDLE9BQU87c0JBQ2IsS0FBSyxTQUFDLFNBQVM7a0JBQ2YsS0FBSyxTQUFDLEtBQUs7c0JBQ1gsS0FBSyxTQUFDLFNBQVM7Ozs7SUFQaEIsOENBQTBEOztJQUUxRCxvQ0FBNEM7O0lBQzVDLHlDQUF1Qzs7SUFDdkMsdUNBQW1DOztJQUNuQyx5Q0FBdUM7O0lBQ3ZDLHFDQUErQjs7SUFDL0IseUNBQW9EOzs7OztJQUVwRCwwQ0FBNkI7Ozs7O0lBQzdCLHNDQUFrQjs7Ozs7SUFDbEIscURBQWlDOzs7OztJQUNqQyx1REFBcUQ7Ozs7O0lBRXpDLDhDQUFvQzs7Ozs7SUFBRSwyQ0FBbUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgVGVtcGxhdGVSZWYsIFZpZXdDaGlsZH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0JzTW9kYWxTZXJ2aWNlfSBmcm9tICduZ3gtYm9vdHN0cmFwL21vZGFsJztcbmltcG9ydCB7QnNNb2RhbFJlZn0gZnJvbSAnbmd4LWJvb3RzdHJhcC9tb2RhbC9icy1tb2RhbC1yZWYuc2VydmljZSc7XG5pbXBvcnQge0RpYWxvZ0FjdGlvbn0gZnJvbSBcIi4uL2RpYWxvZy1hY3Rpb25cIjtcbmltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tIFwicnhqc1wiO1xuaW1wb3J0IHtUcmFuc2xhdGVTZXJ2aWNlfSBmcm9tIFwiQG5neC10cmFuc2xhdGUvY29yZVwiO1xuXG5kZWNsYXJlIGxldCBpTmV0OiBhbnk7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXBwLWNvbmZpcm0tZGlhbG9nJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vY29uZmlybS1kaWFsb2cuY29tcG9uZW50Lmh0bWwnXG59KVxuZXhwb3J0IGNsYXNzIENvbmZpcm1EaWFsb2dDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgQFZpZXdDaGlsZCgnY29uZmlybU1vZGFsJykgY29uZmlybU1vZGFsOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgQElucHV0KCdpZCcpIGlkOiBzdHJpbmcgPSBpTmV0LmdlbmVyYXRlSWQoKTtcbiAgICBASW5wdXQoJ2ljb25DbHMnKSBpY29uQ2xzOiBzdHJpbmcgPSAnJztcbiAgICBASW5wdXQoJ3RpdGxlJykgdGl0bGU6IHN0cmluZyA9ICcnO1xuICAgIEBJbnB1dCgnY29udGVudCcpIGNvbnRlbnQ6IHN0cmluZyA9ICcnO1xuICAgIEBJbnB1dCgnY2xzJykgY2xzOiBzdHJpbmcgPSAnJztcbiAgICBASW5wdXQoJ2FjdGlvbnMnKSBhY3Rpb25zOiBBcnJheTxEaWFsb2dBY3Rpb24+ID0gW107XG5cbiAgICBwcml2YXRlIG1vZGFsUmVmOiBCc01vZGFsUmVmO1xuICAgIHByaXZhdGUgZGF0YTogYW55O1xuICAgIHByaXZhdGUgdG9vbGJhclRyYW5zbGF0aW9uczogYW55O1xuICAgIHByaXZhdGUgcmVhZG9ubHkgdHJhbnNsYXRlU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIG1vZGFsU2VydmljZTogQnNNb2RhbFNlcnZpY2UsIHByaXZhdGUgdHJhbnNsYXRlOiBUcmFuc2xhdGVTZXJ2aWNlKSB7XG4gICAgICAgIHRoaXMudHJhbnNsYXRlU3Vic2NyaXB0aW9uID0gdHJhbnNsYXRlLmdldChbJ1RPT0xCQVInXSkuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICAgICAgICBjb25zdCB7VE9PTEJBUn0gPSByZXMgfHwgeydUT09MQkFSJzogeydDTE9TRSc6ICdDbG9zZSd9fTtcbiAgICAgICAgICAgIHRoaXMudG9vbGJhclRyYW5zbGF0aW9ucyA9IFRPT0xCQVI7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBpZiAodGhpcy5nZXRBY3Rpb25zKCkubGVuZ3RoIDwgMSkge1xuICAgICAgICAgICAgY29uc3Qge0NMT1NFfSA9IHRoaXMudG9vbGJhclRyYW5zbGF0aW9ucztcbiAgICAgICAgICAgIGxldCBjbG9zZUFjdGlvbiA9IG5ldyBEaWFsb2dBY3Rpb24oQ0xPU0UsICdidG4tZGFuZ2VyJywgJ2ZhIGZhLWNoZWNrJywgdGhpcy5oaWRlKTtcbiAgICAgICAgICAgIHRoaXMuc2V0QWN0aW9ucyhbY2xvc2VBY3Rpb25dKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBoaWRlKCkge1xuICAgICAgICB0aGlzLm1vZGFsUmVmLmhpZGUoKTtcbiAgICB9XG5cbiAgICBzaG93KCkge1xuICAgICAgICB0aGlzLm1vZGFsUmVmID0gdGhpcy5tb2RhbFNlcnZpY2Uuc2hvdyh0aGlzLmNvbmZpcm1Nb2RhbCk7XG4gICAgfVxuXG4gICAgcHVzaEFjdGlvbihhY3Rpb246IERpYWxvZ0FjdGlvbikge1xuICAgICAgICB0aGlzLmFjdGlvbnMucHVzaChhY3Rpb24pXG4gICAgfVxuXG4gICAgc2V0QWN0aW9ucyhhY3Rpb25zOiBBcnJheTxEaWFsb2dBY3Rpb24+KSB7XG4gICAgICAgIHRoaXMuYWN0aW9ucyA9IGFjdGlvbnM7XG4gICAgfVxuXG4gICAgZ2V0QWN0aW9ucygpOiBBcnJheTxEaWFsb2dBY3Rpb24+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWN0aW9ucztcbiAgICB9XG5cbiAgICBzZXREYXRhKHY6IGFueSkge1xuICAgICAgICB0aGlzLmRhdGEgPSB2O1xuICAgIH1cblxuICAgIGdldERhdGEoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YTtcbiAgICB9XG5cbiAgICBnZXRJZCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5pZDtcbiAgICB9XG59XG4iXX0=