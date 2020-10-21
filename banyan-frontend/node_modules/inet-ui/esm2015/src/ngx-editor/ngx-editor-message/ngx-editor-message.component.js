/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component } from '@angular/core';
import { MessageService } from '../common/services/message.service';
export class NgxEditorMessageComponent {
    /**
     * @param {?} _messageService service to send message to the editor
     */
    constructor(_messageService) {
        this._messageService = _messageService;
        /**
         * property that holds the message to be displayed on the editor
         */
        this.ngxMessage = undefined;
        this._messageService.getMessage().subscribe((/**
         * @param {?} message
         * @return {?}
         */
        (message) => this.ngxMessage = message));
    }
    /**
     * clears editor message
     * @return {?}
     */
    clearMessage() {
        this.ngxMessage = undefined;
    }
}
NgxEditorMessageComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-ngx-editor-message',
                template: "<div class=\"ngx-editor-message\" *ngIf=\"ngxMessage\" (dblclick)=\"clearMessage()\">\n  {{ ngxMessage }}\n</div>\n",
                styles: [".ngx-editor-message{font-size:80%;background-color:#f1f1f1;border:1px solid #ddd;border-top:transparent;padding:0 .5rem .1rem;transition:.5s ease-in}"]
            }] }
];
/** @nocollapse */
NgxEditorMessageComponent.ctorParameters = () => [
    { type: MessageService }
];
if (false) {
    /**
     * property that holds the message to be displayed on the editor
     * @type {?}
     */
    NgxEditorMessageComponent.prototype.ngxMessage;
    /**
     * @type {?}
     * @private
     */
    NgxEditorMessageComponent.prototype._messageService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWVkaXRvci1tZXNzYWdlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtdWkvIiwic291cmNlcyI6WyJzcmMvbmd4LWVkaXRvci9uZ3gtZWRpdG9yLW1lc3NhZ2Uvbmd4LWVkaXRvci1tZXNzYWdlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUxQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFRcEUsTUFBTSxPQUFPLHlCQUF5Qjs7OztJQU9wQyxZQUFvQixlQUErQjtRQUEvQixvQkFBZSxHQUFmLGVBQWUsQ0FBZ0I7Ozs7UUFMbkQsZUFBVSxHQUFHLFNBQVMsQ0FBQztRQU1yQixJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsRUFBRSxDQUFDLFNBQVM7Ozs7UUFBQyxDQUFDLE9BQWUsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxPQUFPLEVBQUMsQ0FBQztJQUM5RixDQUFDOzs7OztJQUtELFlBQVk7UUFDVixJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztJQUM5QixDQUFDOzs7WUF0QkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx3QkFBd0I7Z0JBQ2xDLCtIQUFrRDs7YUFFbkQ7Ozs7WUFOUSxjQUFjOzs7Ozs7O0lBVXJCLCtDQUF1Qjs7Ozs7SUFLWCxvREFBdUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTWVzc2FnZVNlcnZpY2UgfSBmcm9tICcuLi9jb21tb24vc2VydmljZXMvbWVzc2FnZS5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXBwLW5neC1lZGl0b3ItbWVzc2FnZScsXG4gIHRlbXBsYXRlVXJsOiAnLi9uZ3gtZWRpdG9yLW1lc3NhZ2UuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9uZ3gtZWRpdG9yLW1lc3NhZ2UuY29tcG9uZW50LmNzcyddXG59KVxuXG5leHBvcnQgY2xhc3MgTmd4RWRpdG9yTWVzc2FnZUNvbXBvbmVudCB7XG4gIC8qKiBwcm9wZXJ0eSB0aGF0IGhvbGRzIHRoZSBtZXNzYWdlIHRvIGJlIGRpc3BsYXllZCBvbiB0aGUgZWRpdG9yICovXG4gIG5neE1lc3NhZ2UgPSB1bmRlZmluZWQ7XG5cbiAgLyoqXG4gICAqIEBwYXJhbSBfbWVzc2FnZVNlcnZpY2Ugc2VydmljZSB0byBzZW5kIG1lc3NhZ2UgdG8gdGhlIGVkaXRvclxuICAgKi9cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfbWVzc2FnZVNlcnZpY2U6IE1lc3NhZ2VTZXJ2aWNlKSB7XG4gICAgdGhpcy5fbWVzc2FnZVNlcnZpY2UuZ2V0TWVzc2FnZSgpLnN1YnNjcmliZSgobWVzc2FnZTogc3RyaW5nKSA9PiB0aGlzLm5neE1lc3NhZ2UgPSBtZXNzYWdlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBjbGVhcnMgZWRpdG9yIG1lc3NhZ2VcbiAgICovXG4gIGNsZWFyTWVzc2FnZSgpOiB2b2lkIHtcbiAgICB0aGlzLm5neE1lc3NhZ2UgPSB1bmRlZmluZWQ7XG4gIH1cbn1cbiJdfQ==