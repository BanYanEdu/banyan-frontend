/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { DialogAction } from "../dialog-action";
import { TranslateService } from "@ngx-translate/core";
var ConfirmDialogComponent = /** @class */ (function () {
    function ConfirmDialogComponent(modalService, translate) {
        var _this = this;
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
        function (res) {
            var TOOLBAR = (res || { 'TOOLBAR': { 'CLOSE': 'Close' } }).TOOLBAR;
            _this.toolbarTranslations = TOOLBAR;
        }));
    }
    /**
     * @return {?}
     */
    ConfirmDialogComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (this.getActions().length < 1) {
            var CLOSE = this.toolbarTranslations.CLOSE;
            /** @type {?} */
            var closeAction = new DialogAction(CLOSE, 'btn-danger', 'fa fa-check', this.hide);
            this.setActions([closeAction]);
        }
    };
    /**
     * @return {?}
     */
    ConfirmDialogComponent.prototype.hide = /**
     * @return {?}
     */
    function () {
        this.modalRef.hide();
    };
    /**
     * @return {?}
     */
    ConfirmDialogComponent.prototype.show = /**
     * @return {?}
     */
    function () {
        this.modalRef = this.modalService.show(this.confirmModal);
    };
    /**
     * @param {?} action
     * @return {?}
     */
    ConfirmDialogComponent.prototype.pushAction = /**
     * @param {?} action
     * @return {?}
     */
    function (action) {
        this.actions.push(action);
    };
    /**
     * @param {?} actions
     * @return {?}
     */
    ConfirmDialogComponent.prototype.setActions = /**
     * @param {?} actions
     * @return {?}
     */
    function (actions) {
        this.actions = actions;
    };
    /**
     * @return {?}
     */
    ConfirmDialogComponent.prototype.getActions = /**
     * @return {?}
     */
    function () {
        return this.actions;
    };
    /**
     * @param {?} v
     * @return {?}
     */
    ConfirmDialogComponent.prototype.setData = /**
     * @param {?} v
     * @return {?}
     */
    function (v) {
        this.data = v;
    };
    /**
     * @return {?}
     */
    ConfirmDialogComponent.prototype.getData = /**
     * @return {?}
     */
    function () {
        return this.data;
    };
    /**
     * @return {?}
     */
    ConfirmDialogComponent.prototype.getId = /**
     * @return {?}
     */
    function () {
        return this.id;
    };
    ConfirmDialogComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-confirm-dialog',
                    template: "<ng-template #confirmModal>\n    <div class=\"modal-header\">\n        <h4 class=\"modal-title pull-left\"><i class=\"{{iconCls}}\"></i> {{title}}</h4>\n        <button type=\"button\" class=\"close pull-right\" (click)=\"hide()\">\n            <span aria-hidden=\"true\">&times;</span>\n        </button>\n    </div>\n    <div class=\"modal-body\" [innerHTML]=\"content\"></div>\n    <div class=\"modal-footer text-right\">\n        <button type=\"button\" *ngFor=\"let action of actions\" class=\"btn btn-sm {{action.cls}}\"\n                (click)=\"action?.fn.bind(this)()\"><i class=\"{{action.iconCls}}\"></i> {{action.title}}</button>\n    </div>\n</ng-template>\n"
                }] }
    ];
    /** @nocollapse */
    ConfirmDialogComponent.ctorParameters = function () { return [
        { type: BsModalService },
        { type: TranslateService }
    ]; };
    ConfirmDialogComponent.propDecorators = {
        confirmModal: [{ type: ViewChild, args: ['confirmModal',] }],
        id: [{ type: Input, args: ['id',] }],
        iconCls: [{ type: Input, args: ['iconCls',] }],
        title: [{ type: Input, args: ['title',] }],
        content: [{ type: Input, args: ['content',] }],
        cls: [{ type: Input, args: ['cls',] }],
        actions: [{ type: Input, args: ['actions',] }]
    };
    return ConfirmDialogComponent;
}());
export { ConfirmDialogComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlybS1kaWFsb2cuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC11aS8iLCJzb3VyY2VzIjpbInNyYy9kaWFsb2cvY29uZmlybS1kaWFsb2cvY29uZmlybS1kaWFsb2cuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBVSxXQUFXLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQy9FLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUVuRCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFFOUMsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFJckQ7SUFvQkksZ0NBQW9CLFlBQTRCLEVBQVUsU0FBMkI7UUFBckYsaUJBS0M7UUFMbUIsaUJBQVksR0FBWixZQUFZLENBQWdCO1FBQVUsY0FBUyxHQUFULFNBQVMsQ0FBa0I7UUFaeEUsT0FBRSxHQUFXLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUMxQixZQUFPLEdBQVcsRUFBRSxDQUFDO1FBQ3ZCLFVBQUssR0FBVyxFQUFFLENBQUM7UUFDakIsWUFBTyxHQUFXLEVBQUUsQ0FBQztRQUN6QixRQUFHLEdBQVcsRUFBRSxDQUFDO1FBQ2IsWUFBTyxHQUF3QixFQUFFLENBQUM7UUFRaEQsSUFBSSxDQUFDLHFCQUFxQixHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFNBQVM7Ozs7UUFBQyxVQUFBLEdBQUc7WUFDMUQsSUFBQSw4REFBTztZQUNkLEtBQUksQ0FBQyxtQkFBbUIsR0FBRyxPQUFPLENBQUM7UUFDdkMsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7O0lBRUQseUNBQVE7OztJQUFSO1FBQ0ksSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUN2QixJQUFBLHNDQUFLOztnQkFDUixXQUFXLEdBQUcsSUFBSSxZQUFZLENBQUMsS0FBSyxFQUFFLFlBQVksRUFBRSxhQUFhLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNqRixJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztTQUNsQztJQUNMLENBQUM7Ozs7SUFFTSxxQ0FBSTs7O0lBQVg7UUFDSSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3pCLENBQUM7Ozs7SUFFRCxxQ0FBSTs7O0lBQUo7UUFDSSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUM5RCxDQUFDOzs7OztJQUVELDJDQUFVOzs7O0lBQVYsVUFBVyxNQUFvQjtRQUMzQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUM3QixDQUFDOzs7OztJQUVELDJDQUFVOzs7O0lBQVYsVUFBVyxPQUE0QjtRQUNuQyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUMzQixDQUFDOzs7O0lBRUQsMkNBQVU7OztJQUFWO1FBQ0ksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3hCLENBQUM7Ozs7O0lBRUQsd0NBQU87Ozs7SUFBUCxVQUFRLENBQU07UUFDVixJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztJQUNsQixDQUFDOzs7O0lBRUQsd0NBQU87OztJQUFQO1FBQ0ksT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ3JCLENBQUM7Ozs7SUFFRCxzQ0FBSzs7O0lBQUw7UUFDSSxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUM7SUFDbkIsQ0FBQzs7Z0JBakVKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsb0JBQW9CO29CQUM5Qiw0cUJBQThDO2lCQUNqRDs7OztnQkFYTyxjQUFjO2dCQUlkLGdCQUFnQjs7OytCQVVuQixTQUFTLFNBQUMsY0FBYztxQkFFeEIsS0FBSyxTQUFDLElBQUk7MEJBQ1YsS0FBSyxTQUFDLFNBQVM7d0JBQ2YsS0FBSyxTQUFDLE9BQU87MEJBQ2IsS0FBSyxTQUFDLFNBQVM7c0JBQ2YsS0FBSyxTQUFDLEtBQUs7MEJBQ1gsS0FBSyxTQUFDLFNBQVM7O0lBcURwQiw2QkFBQztDQUFBLEFBbEVELElBa0VDO1NBOURZLHNCQUFzQjs7O0lBRS9CLDhDQUEwRDs7SUFFMUQsb0NBQTRDOztJQUM1Qyx5Q0FBdUM7O0lBQ3ZDLHVDQUFtQzs7SUFDbkMseUNBQXVDOztJQUN2QyxxQ0FBK0I7O0lBQy9CLHlDQUFvRDs7Ozs7SUFFcEQsMENBQTZCOzs7OztJQUM3QixzQ0FBa0I7Ozs7O0lBQ2xCLHFEQUFpQzs7Ozs7SUFDakMsdURBQXFEOzs7OztJQUV6Qyw4Q0FBb0M7Ozs7O0lBQUUsMkNBQW1DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBPbkluaXQsIFRlbXBsYXRlUmVmLCBWaWV3Q2hpbGR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtCc01vZGFsU2VydmljZX0gZnJvbSAnbmd4LWJvb3RzdHJhcC9tb2RhbCc7XG5pbXBvcnQge0JzTW9kYWxSZWZ9IGZyb20gJ25neC1ib290c3RyYXAvbW9kYWwvYnMtbW9kYWwtcmVmLnNlcnZpY2UnO1xuaW1wb3J0IHtEaWFsb2dBY3Rpb259IGZyb20gXCIuLi9kaWFsb2ctYWN0aW9uXCI7XG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSBcInJ4anNcIjtcbmltcG9ydCB7VHJhbnNsYXRlU2VydmljZX0gZnJvbSBcIkBuZ3gtdHJhbnNsYXRlL2NvcmVcIjtcblxuZGVjbGFyZSBsZXQgaU5ldDogYW55O1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2FwcC1jb25maXJtLWRpYWxvZycsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2NvbmZpcm0tZGlhbG9nLmNvbXBvbmVudC5odG1sJ1xufSlcbmV4cG9ydCBjbGFzcyBDb25maXJtRGlhbG9nQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIEBWaWV3Q2hpbGQoJ2NvbmZpcm1Nb2RhbCcpIGNvbmZpcm1Nb2RhbDogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIEBJbnB1dCgnaWQnKSBpZDogc3RyaW5nID0gaU5ldC5nZW5lcmF0ZUlkKCk7XG4gICAgQElucHV0KCdpY29uQ2xzJykgaWNvbkNsczogc3RyaW5nID0gJyc7XG4gICAgQElucHV0KCd0aXRsZScpIHRpdGxlOiBzdHJpbmcgPSAnJztcbiAgICBASW5wdXQoJ2NvbnRlbnQnKSBjb250ZW50OiBzdHJpbmcgPSAnJztcbiAgICBASW5wdXQoJ2NscycpIGNsczogc3RyaW5nID0gJyc7XG4gICAgQElucHV0KCdhY3Rpb25zJykgYWN0aW9uczogQXJyYXk8RGlhbG9nQWN0aW9uPiA9IFtdO1xuXG4gICAgcHJpdmF0ZSBtb2RhbFJlZjogQnNNb2RhbFJlZjtcbiAgICBwcml2YXRlIGRhdGE6IGFueTtcbiAgICBwcml2YXRlIHRvb2xiYXJUcmFuc2xhdGlvbnM6IGFueTtcbiAgICBwcml2YXRlIHJlYWRvbmx5IHRyYW5zbGF0ZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBtb2RhbFNlcnZpY2U6IEJzTW9kYWxTZXJ2aWNlLCBwcml2YXRlIHRyYW5zbGF0ZTogVHJhbnNsYXRlU2VydmljZSkge1xuICAgICAgICB0aGlzLnRyYW5zbGF0ZVN1YnNjcmlwdGlvbiA9IHRyYW5zbGF0ZS5nZXQoWydUT09MQkFSJ10pLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgICAgICAgY29uc3Qge1RPT0xCQVJ9ID0gcmVzIHx8IHsnVE9PTEJBUic6IHsnQ0xPU0UnOiAnQ2xvc2UnfX07XG4gICAgICAgICAgICB0aGlzLnRvb2xiYXJUcmFuc2xhdGlvbnMgPSBUT09MQkFSO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuZ2V0QWN0aW9ucygpLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgICAgIGNvbnN0IHtDTE9TRX0gPSB0aGlzLnRvb2xiYXJUcmFuc2xhdGlvbnM7XG4gICAgICAgICAgICBsZXQgY2xvc2VBY3Rpb24gPSBuZXcgRGlhbG9nQWN0aW9uKENMT1NFLCAnYnRuLWRhbmdlcicsICdmYSBmYS1jaGVjaycsIHRoaXMuaGlkZSk7XG4gICAgICAgICAgICB0aGlzLnNldEFjdGlvbnMoW2Nsb3NlQWN0aW9uXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgaGlkZSgpIHtcbiAgICAgICAgdGhpcy5tb2RhbFJlZi5oaWRlKCk7XG4gICAgfVxuXG4gICAgc2hvdygpIHtcbiAgICAgICAgdGhpcy5tb2RhbFJlZiA9IHRoaXMubW9kYWxTZXJ2aWNlLnNob3codGhpcy5jb25maXJtTW9kYWwpO1xuICAgIH1cblxuICAgIHB1c2hBY3Rpb24oYWN0aW9uOiBEaWFsb2dBY3Rpb24pIHtcbiAgICAgICAgdGhpcy5hY3Rpb25zLnB1c2goYWN0aW9uKVxuICAgIH1cblxuICAgIHNldEFjdGlvbnMoYWN0aW9uczogQXJyYXk8RGlhbG9nQWN0aW9uPikge1xuICAgICAgICB0aGlzLmFjdGlvbnMgPSBhY3Rpb25zO1xuICAgIH1cblxuICAgIGdldEFjdGlvbnMoKTogQXJyYXk8RGlhbG9nQWN0aW9uPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmFjdGlvbnM7XG4gICAgfVxuXG4gICAgc2V0RGF0YSh2OiBhbnkpIHtcbiAgICAgICAgdGhpcy5kYXRhID0gdjtcbiAgICB9XG5cbiAgICBnZXREYXRhKCk6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGE7XG4gICAgfVxuXG4gICAgZ2V0SWQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaWQ7XG4gICAgfVxufVxuIl19