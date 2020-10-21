/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, ViewChild, EventEmitter, Renderer2, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommandExecutorService } from './common/services/command-executor.service';
import { MessageService } from './common/services/message.service';
import { ngxEditorConfig } from './common/ngx-editor.defaults';
import * as Utils from './common/utils/ngx-editor.utils';
var NgxEditorComponent = /** @class */ (function () {
    /**
     * @param _messageService service to send message to the editor message component
     * @param _commandExecutor executes command from the toolbar
     * @param _renderer access and manipulate the dom element
     */
    function NgxEditorComponent(_messageService, _commandExecutor, _renderer) {
        this._messageService = _messageService;
        this._commandExecutor = _commandExecutor;
        this._renderer = _renderer;
        /**
         * The editor can be resized vertically.
         *
         * `basic` resizer enables the html5 reszier. Check here https://www.w3schools.com/cssref/css3_pr_resize.asp
         *
         * `stack` resizer enable a resizer that looks like as if in https://stackoverflow.com
         */
        this.resizer = 'stack';
        /**
         * The config property is a JSON object
         *
         * All avaibale inputs inputs can be provided in the configuration as JSON
         * inputs provided directly are considered as top priority
         */
        this.config = ngxEditorConfig;
        /**
         * emits `blur` event when focused out from the textarea
         */
        this.blur = new EventEmitter();
        /**
         * emits `focus` event when focused in to the textarea
         */
        this.focus = new EventEmitter();
        this.Utils = Utils;
    }
    /**
     * events
     */
    /**
     * events
     * @return {?}
     */
    NgxEditorComponent.prototype.onTextAreaFocus = /**
     * events
     * @return {?}
     */
    function () {
        this.focus.emit('focus');
    };
    /** focus the text area when the editor is focussed */
    /**
     * focus the text area when the editor is focussed
     * @return {?}
     */
    NgxEditorComponent.prototype.onEditorFocus = /**
     * focus the text area when the editor is focussed
     * @return {?}
     */
    function () {
        this.textArea.nativeElement.focus();
    };
    /**
     * Executed from the contenteditable section while the input property changes
     * @param html html string from contenteditable
     */
    /**
     * Executed from the contenteditable section while the input property changes
     * @param {?} innerHTML
     * @return {?}
     */
    NgxEditorComponent.prototype.onContentChange = /**
     * Executed from the contenteditable section while the input property changes
     * @param {?} innerHTML
     * @return {?}
     */
    function (innerHTML) {
        if (typeof this.onChange === 'function') {
            this.onChange(innerHTML);
            this.togglePlaceholder(innerHTML);
        }
    };
    /**
     * @return {?}
     */
    NgxEditorComponent.prototype.onTextAreaBlur = /**
     * @return {?}
     */
    function () {
        /** save selection if focussed out */
        this._commandExecutor.savedSelection = Utils.saveSelection();
        if (typeof this.onTouched === 'function') {
            this.onTouched();
        }
        this.blur.emit('blur');
    };
    /**
     * resizing text area
     *
     * @param offsetY vertical height of the eidtable portion of the editor
     */
    /**
     * resizing text area
     *
     * @param {?} offsetY vertical height of the eidtable portion of the editor
     * @return {?}
     */
    NgxEditorComponent.prototype.resizeTextArea = /**
     * resizing text area
     *
     * @param {?} offsetY vertical height of the eidtable portion of the editor
     * @return {?}
     */
    function (offsetY) {
        /** @type {?} */
        var newHeight = parseInt(this.height, 10);
        newHeight += offsetY;
        this.height = newHeight + 'px';
        this.textArea.nativeElement.style.height = this.height;
    };
    /**
     * editor actions, i.e., executes command from toolbar
     *
     * @param commandName name of the command to be executed
     */
    /**
     * editor actions, i.e., executes command from toolbar
     *
     * @param {?} commandName name of the command to be executed
     * @return {?}
     */
    NgxEditorComponent.prototype.executeCommand = /**
     * editor actions, i.e., executes command from toolbar
     *
     * @param {?} commandName name of the command to be executed
     * @return {?}
     */
    function (commandName) {
        try {
            this._commandExecutor.execute(commandName);
        }
        catch (error) {
            this._messageService.sendMessage(error.message);
        }
    };
    /**
     * Write a new value to the element.
     *
     * @param value value to be executed when there is a change in contenteditable
     */
    /**
     * Write a new value to the element.
     *
     * @param {?} value value to be executed when there is a change in contenteditable
     * @return {?}
     */
    NgxEditorComponent.prototype.writeValue = /**
     * Write a new value to the element.
     *
     * @param {?} value value to be executed when there is a change in contenteditable
     * @return {?}
     */
    function (value) {
        this.togglePlaceholder(value);
        if (value === null || value === undefined || value === '' || value === '<br>') {
            value = null;
        }
        this.refreshView(value);
    };
    /**
     * Set the function to be called
     * when the control receives a change event.
     *
     * @param fn a function
     */
    /**
     * Set the function to be called
     * when the control receives a change event.
     *
     * @param {?} fn a function
     * @return {?}
     */
    NgxEditorComponent.prototype.registerOnChange = /**
     * Set the function to be called
     * when the control receives a change event.
     *
     * @param {?} fn a function
     * @return {?}
     */
    function (fn) {
        this.onChange = fn;
    };
    /**
     * Set the function to be called
     * when the control receives a touch event.
     *
     * @param fn a function
     */
    /**
     * Set the function to be called
     * when the control receives a touch event.
     *
     * @param {?} fn a function
     * @return {?}
     */
    NgxEditorComponent.prototype.registerOnTouched = /**
     * Set the function to be called
     * when the control receives a touch event.
     *
     * @param {?} fn a function
     * @return {?}
     */
    function (fn) {
        this.onTouched = fn;
    };
    /**
     * refresh view/HTML of the editor
     *
     * @param value html string from the editor
     */
    /**
     * refresh view/HTML of the editor
     *
     * @param {?} value html string from the editor
     * @return {?}
     */
    NgxEditorComponent.prototype.refreshView = /**
     * refresh view/HTML of the editor
     *
     * @param {?} value html string from the editor
     * @return {?}
     */
    function (value) {
        /** @type {?} */
        var normalizedValue = value === null ? '' : value;
        this._renderer.setProperty(this.textArea.nativeElement, 'innerHTML', normalizedValue);
    };
    /**
     * toggles placeholder based on input string
     *
     * @param value A HTML string from the editor
     */
    /**
     * toggles placeholder based on input string
     *
     * @param {?} value A HTML string from the editor
     * @return {?}
     */
    NgxEditorComponent.prototype.togglePlaceholder = /**
     * toggles placeholder based on input string
     *
     * @param {?} value A HTML string from the editor
     * @return {?}
     */
    function (value) {
        if (!value || value === '<br>' || value === '') {
            this._renderer.addClass(this.ngxWrapper.nativeElement, 'show-placeholder');
        }
        else {
            this._renderer.removeClass(this.ngxWrapper.nativeElement, 'show-placeholder');
        }
    };
    /**
     * returns a json containing input params
     */
    /**
     * returns a json containing input params
     * @return {?}
     */
    NgxEditorComponent.prototype.getCollectiveParams = /**
     * returns a json containing input params
     * @return {?}
     */
    function () {
        return {
            editable: this.editable,
            spellcheck: this.spellcheck,
            placeholder: this.placeholder,
            translate: this.translate,
            height: this.height,
            minHeight: this.minHeight,
            width: this.width,
            minWidth: this.minWidth,
            enableToolbar: this.enableToolbar,
            showToolbar: this.showToolbar,
            imageEndPoint: this.imageEndPoint,
            toolbar: this.toolbar
        };
    };
    /**
     * @return {?}
     */
    NgxEditorComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        /**
         * set configuartion
         */
        this.config = this.Utils.getEditorConfiguration(this.config, ngxEditorConfig, this.getCollectiveParams());
        this.height = this.height || this.textArea.nativeElement.offsetHeight;
        this.executeCommand('enableObjectResizing');
    };
    NgxEditorComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-ngx-editor',
                    template: "<div class=\"ngx-editor\" id=\"ngxEditor\" [style.width]=\"config['width']\" [style.minWidth]=\"config['minWidth']\" tabindex=\"0\"\n  (focus)=\"onEditorFocus()\">\n\n  <app-ngx-editor-toolbar [emailParams]=\"emailParams\" [config]=\"config\" (execute)=\"executeCommand($event)\"></app-ngx-editor-toolbar>\n\n  <!-- text area -->\n  <div class=\"ngx-wrapper\" #ngxWrapper>\n    <div class=\"ngx-editor-textarea\" [attr.contenteditable]=\"config['editable']\" (input)=\"onContentChange($event.target['innerHTML'])\"\n      [attr.translate]=\"config['translate']\" [attr.spellcheck]=\"config['spellcheck']\" [style.height]=\"config['height']\"\n      [style.minHeight]=\"config['minHeight']\" [style.resize]=\"Utils?.canResize(resizer)\" (focus)=\"onTextAreaFocus()\"\n      (blur)=\"onTextAreaBlur()\" #ngxTextArea></div>\n\n    <span class=\"ngx-editor-placeholder\">{{ placeholder || config['placeholder'] }}</span>\n  </div>\n\n  <app-ngx-editor-message></app-ngx-editor-message>\n  <app-ngx-grippie *ngIf=\"resizer === 'stack'\"></app-ngx-grippie>\n\n</div>\n",
                    providers: [{
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef((/**
                             * @return {?}
                             */
                            function () { return NgxEditorComponent; })),
                            multi: true
                        }],
                    styles: [".ngx-editor{position:relative}.ngx-editor ::ng-deep [contenteditable=true]:empty:before{content:attr(placeholder);display:block;color:#868e96;opacity:1}.ngx-editor .ngx-wrapper{position:relative}.ngx-editor .ngx-wrapper .ngx-editor-textarea{min-height:5rem;padding:.5rem .8rem 1rem;border:1px solid #ddd;background-color:transparent;overflow-x:hidden;overflow-y:auto;z-index:2;position:relative}.ngx-editor .ngx-wrapper .ngx-editor-textarea.focus,.ngx-editor .ngx-wrapper .ngx-editor-textarea:focus{outline:0}.ngx-editor .ngx-wrapper .ngx-editor-textarea ::ng-deep blockquote{margin-left:1rem;border-left:.2em solid #dfe2e5;padding-left:.5rem}.ngx-editor .ngx-wrapper ::ng-deep p{margin-bottom:0}.ngx-editor .ngx-wrapper .ngx-editor-placeholder{display:none;position:absolute;top:0;padding:.5rem .8rem 1rem .9rem;z-index:1;color:#6c757d;opacity:1}.ngx-editor .ngx-wrapper.show-placeholder .ngx-editor-placeholder{display:block}"]
                }] }
    ];
    /** @nocollapse */
    NgxEditorComponent.ctorParameters = function () { return [
        { type: MessageService },
        { type: CommandExecutorService },
        { type: Renderer2 }
    ]; };
    NgxEditorComponent.propDecorators = {
        editable: [{ type: Input }],
        spellcheck: [{ type: Input }],
        placeholder: [{ type: Input }],
        translate: [{ type: Input }],
        height: [{ type: Input }],
        minHeight: [{ type: Input }],
        width: [{ type: Input }],
        minWidth: [{ type: Input }],
        toolbar: [{ type: Input }],
        resizer: [{ type: Input }],
        config: [{ type: Input }],
        showToolbar: [{ type: Input }],
        enableToolbar: [{ type: Input }],
        imageEndPoint: [{ type: Input }],
        emailParams: [{ type: Input }],
        blur: [{ type: Output }],
        focus: [{ type: Output }],
        textArea: [{ type: ViewChild, args: ['ngxTextArea',] }],
        ngxWrapper: [{ type: ViewChild, args: ['ngxWrapper',] }]
    };
    return NgxEditorComponent;
}());
export { NgxEditorComponent };
if (false) {
    /**
     * Specifies weather the textarea to be editable or not
     * @type {?}
     */
    NgxEditorComponent.prototype.editable;
    /**
     * The spellcheck property specifies whether the element is to have its spelling and grammar checked or not.
     * @type {?}
     */
    NgxEditorComponent.prototype.spellcheck;
    /**
     * Placeholder for the textArea
     * @type {?}
     */
    NgxEditorComponent.prototype.placeholder;
    /**
     * The translate property specifies whether the content of an element should be translated or not.
     *
     * Check https://www.w3schools.com/tags/att_global_translate.asp for more information and browser support
     * @type {?}
     */
    NgxEditorComponent.prototype.translate;
    /**
     * Sets height of the editor
     * @type {?}
     */
    NgxEditorComponent.prototype.height;
    /**
     * Sets minimum height for the editor
     * @type {?}
     */
    NgxEditorComponent.prototype.minHeight;
    /**
     * Sets Width of the editor
     * @type {?}
     */
    NgxEditorComponent.prototype.width;
    /**
     * Sets minimum width of the editor
     * @type {?}
     */
    NgxEditorComponent.prototype.minWidth;
    /**
     * Toolbar accepts an array which specifies the options to be enabled for the toolbar
     *
     * Check ngxEditorConfig for toolbar configuration
     *
     * Passing an empty array will enable all toolbar
     * @type {?}
     */
    NgxEditorComponent.prototype.toolbar;
    /**
     * The editor can be resized vertically.
     *
     * `basic` resizer enables the html5 reszier. Check here https://www.w3schools.com/cssref/css3_pr_resize.asp
     *
     * `stack` resizer enable a resizer that looks like as if in https://stackoverflow.com
     * @type {?}
     */
    NgxEditorComponent.prototype.resizer;
    /**
     * The config property is a JSON object
     *
     * All avaibale inputs inputs can be provided in the configuration as JSON
     * inputs provided directly are considered as top priority
     * @type {?}
     */
    NgxEditorComponent.prototype.config;
    /**
     * Weather to show or hide toolbar
     * @type {?}
     */
    NgxEditorComponent.prototype.showToolbar;
    /**
     * Weather to enable or disable the toolbar
     * @type {?}
     */
    NgxEditorComponent.prototype.enableToolbar;
    /**
     * Endpoint for which the image to be uploaded
     * @type {?}
     */
    NgxEditorComponent.prototype.imageEndPoint;
    /** @type {?} */
    NgxEditorComponent.prototype.emailParams;
    /**
     * emits `blur` event when focused out from the textarea
     * @type {?}
     */
    NgxEditorComponent.prototype.blur;
    /**
     * emits `focus` event when focused in to the textarea
     * @type {?}
     */
    NgxEditorComponent.prototype.focus;
    /** @type {?} */
    NgxEditorComponent.prototype.textArea;
    /** @type {?} */
    NgxEditorComponent.prototype.ngxWrapper;
    /** @type {?} */
    NgxEditorComponent.prototype.Utils;
    /**
     * @type {?}
     * @private
     */
    NgxEditorComponent.prototype.onChange;
    /**
     * @type {?}
     * @private
     */
    NgxEditorComponent.prototype.onTouched;
    /**
     * @type {?}
     * @private
     */
    NgxEditorComponent.prototype._messageService;
    /**
     * @type {?}
     * @private
     */
    NgxEditorComponent.prototype._commandExecutor;
    /**
     * @type {?}
     * @private
     */
    NgxEditorComponent.prototype._renderer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWVkaXRvci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbmV0LXVpLyIsInNvdXJjZXMiOlsic3JjL25neC1lZGl0b3Ivbmd4LWVkaXRvci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQVUsS0FBSyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQzNDLFlBQVksRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUN0QyxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsaUJBQWlCLEVBQXdCLE1BQU0sZ0JBQWdCLENBQUM7QUFFekUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFDcEYsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBRW5FLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMvRCxPQUFPLEtBQUssS0FBSyxNQUFNLGlDQUFpQyxDQUFDO0FBRXpEO0lBNkVFOzs7O09BSUc7SUFDSCw0QkFDVSxlQUErQixFQUMvQixnQkFBd0MsRUFDeEMsU0FBb0I7UUFGcEIsb0JBQWUsR0FBZixlQUFlLENBQWdCO1FBQy9CLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBd0I7UUFDeEMsY0FBUyxHQUFULFNBQVMsQ0FBVzs7Ozs7Ozs7UUF0Q3JCLFlBQU8sR0FBRyxPQUFPLENBQUM7Ozs7Ozs7UUFPbEIsV0FBTSxHQUFHLGVBQWUsQ0FBQzs7OztRQVd4QixTQUFJLEdBQXlCLElBQUksWUFBWSxFQUFVLENBQUM7Ozs7UUFFeEQsVUFBSyxHQUF5QixJQUFJLFlBQVksRUFBVSxDQUFDO1FBS25FLFVBQUssR0FBUSxLQUFLLENBQUM7SUFhZSxDQUFDO0lBRW5DOztPQUVHOzs7OztJQUNILDRDQUFlOzs7O0lBQWY7UUFDRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBRUQsc0RBQXNEOzs7OztJQUN0RCwwQ0FBYTs7OztJQUFiO1FBQ0UsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDdEMsQ0FBQztJQUVEOzs7T0FHRzs7Ozs7O0lBQ0gsNENBQWU7Ozs7O0lBQWYsVUFBZ0IsU0FBaUI7UUFDL0IsSUFBSSxPQUFPLElBQUksQ0FBQyxRQUFRLEtBQUssVUFBVSxFQUFFO1lBQ3ZDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDekIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ25DO0lBQ0gsQ0FBQzs7OztJQUdELDJDQUFjOzs7SUFBZDtRQUNFLHFDQUFxQztRQUNyQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUU3RCxJQUFJLE9BQU8sSUFBSSxDQUFDLFNBQVMsS0FBSyxVQUFVLEVBQUU7WUFDeEMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1NBQ2xCO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDekIsQ0FBQztJQUVEOzs7O09BSUc7Ozs7Ozs7SUFDSCwyQ0FBYzs7Ozs7O0lBQWQsVUFBZSxPQUFlOztZQUN4QixTQUFTLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDO1FBQ3pDLFNBQVMsSUFBSSxPQUFPLENBQUM7UUFDckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQy9CLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUN6RCxDQUFDO0lBRUQ7Ozs7T0FJRzs7Ozs7OztJQUNILDJDQUFjOzs7Ozs7SUFBZCxVQUFlLFdBQW1CO1FBQ2hDLElBQUk7WUFDRixJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQzVDO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDakQ7SUFDSCxDQUFDO0lBRUQ7Ozs7T0FJRzs7Ozs7OztJQUNILHVDQUFVOzs7Ozs7SUFBVixVQUFXLEtBQVU7UUFDbkIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRTlCLElBQUksS0FBSyxLQUFLLElBQUksSUFBSSxLQUFLLEtBQUssU0FBUyxJQUFJLEtBQUssS0FBSyxFQUFFLElBQUksS0FBSyxLQUFLLE1BQU0sRUFBRTtZQUM3RSxLQUFLLEdBQUcsSUFBSSxDQUFDO1NBQ2Q7UUFFRCxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFRDs7Ozs7T0FLRzs7Ozs7Ozs7SUFDSCw2Q0FBZ0I7Ozs7Ozs7SUFBaEIsVUFBaUIsRUFBTztRQUN0QixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRUQ7Ozs7O09BS0c7Ozs7Ozs7O0lBQ0gsOENBQWlCOzs7Ozs7O0lBQWpCLFVBQWtCLEVBQU87UUFDdkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVEOzs7O09BSUc7Ozs7Ozs7SUFDSCx3Q0FBVzs7Ozs7O0lBQVgsVUFBWSxLQUFhOztZQUNqQixlQUFlLEdBQUcsS0FBSyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLO1FBQ25ELElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFLFdBQVcsRUFBRSxlQUFlLENBQUMsQ0FBQztJQUN4RixDQUFDO0lBRUQ7Ozs7T0FJRzs7Ozs7OztJQUNILDhDQUFpQjs7Ozs7O0lBQWpCLFVBQWtCLEtBQVU7UUFDMUIsSUFBSSxDQUFDLEtBQUssSUFBSSxLQUFLLEtBQUssTUFBTSxJQUFJLEtBQUssS0FBSyxFQUFFLEVBQUU7WUFDOUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztTQUM1RTthQUFNO1lBQ0wsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztTQUMvRTtJQUNILENBQUM7SUFFRDs7T0FFRzs7Ozs7SUFDSCxnREFBbUI7Ozs7SUFBbkI7UUFDRSxPQUFPO1lBQ0wsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3ZCLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVTtZQUMzQixXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVc7WUFDN0IsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTO1lBQ3pCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtZQUNuQixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVM7WUFDekIsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1lBQ2pCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN2QixhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWE7WUFDakMsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXO1lBQzdCLGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYTtZQUNqQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87U0FDdEIsQ0FBQztJQUNKLENBQUM7Ozs7SUFFRCxxQ0FBUTs7O0lBQVI7UUFDRTs7V0FFRztRQUNILElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLGVBQWUsRUFBRSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxDQUFDO1FBRTFHLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUM7UUFFdEUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0lBQzlDLENBQUM7O2dCQXpPRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtvQkFDMUIsa2pDQUEwQztvQkFFMUMsU0FBUyxFQUFFLENBQUM7NEJBQ1YsT0FBTyxFQUFFLGlCQUFpQjs0QkFDMUIsV0FBVyxFQUFFLFVBQVU7Ozs0QkFBQyxjQUFNLE9BQUEsa0JBQWtCLEVBQWxCLENBQWtCLEVBQUM7NEJBQ2pELEtBQUssRUFBRSxJQUFJO3lCQUNaLENBQUM7O2lCQUNIOzs7O2dCQWRRLGNBQWM7Z0JBRGQsc0JBQXNCO2dCQUpiLFNBQVM7OzsyQkF1QnhCLEtBQUs7NkJBRUwsS0FBSzs4QkFFTCxLQUFLOzRCQU1MLEtBQUs7eUJBRUwsS0FBSzs0QkFFTCxLQUFLO3dCQUVMLEtBQUs7MkJBRUwsS0FBSzswQkFRTCxLQUFLOzBCQVFMLEtBQUs7eUJBT0wsS0FBSzs4QkFFTCxLQUFLO2dDQUVMLEtBQUs7Z0NBRUwsS0FBSzs4QkFFTCxLQUFLO3VCQUdMLE1BQU07d0JBRU4sTUFBTTsyQkFFTixTQUFTLFNBQUMsYUFBYTs2QkFDdkIsU0FBUyxTQUFDLFlBQVk7O0lBc0t6Qix5QkFBQztDQUFBLEFBNU9ELElBNE9DO1NBak9ZLGtCQUFrQjs7Ozs7O0lBRTdCLHNDQUEyQjs7Ozs7SUFFM0Isd0NBQTZCOzs7OztJQUU3Qix5Q0FBNkI7Ozs7Ozs7SUFNN0IsdUNBQTJCOzs7OztJQUUzQixvQ0FBd0I7Ozs7O0lBRXhCLHVDQUEyQjs7Ozs7SUFFM0IsbUNBQXVCOzs7OztJQUV2QixzQ0FBMEI7Ozs7Ozs7OztJQVExQixxQ0FBeUI7Ozs7Ozs7OztJQVF6QixxQ0FBMkI7Ozs7Ozs7O0lBTzNCLG9DQUFrQzs7Ozs7SUFFbEMseUNBQThCOzs7OztJQUU5QiwyQ0FBZ0M7Ozs7O0lBRWhDLDJDQUErQjs7SUFFL0IseUNBQTBCOzs7OztJQUcxQixrQ0FBa0U7Ozs7O0lBRWxFLG1DQUFtRTs7SUFFbkUsc0NBQXdDOztJQUN4Qyx3Q0FBeUM7O0lBRXpDLG1DQUFtQjs7Ozs7SUFFbkIsc0NBQTBDOzs7OztJQUMxQyx1Q0FBOEI7Ozs7O0lBUTVCLDZDQUF1Qzs7Ozs7SUFDdkMsOENBQWdEOzs7OztJQUNoRCx1Q0FBNEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT3V0cHV0LCBWaWV3Q2hpbGQsXG4gICAgRXZlbnRFbWl0dGVyLCBSZW5kZXJlcjIsIGZvcndhcmRSZWYsIE9uQ2hhbmdlc1xufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SLCBDb250cm9sVmFsdWVBY2Nlc3NvciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgQ29tbWFuZEV4ZWN1dG9yU2VydmljZSB9IGZyb20gJy4vY29tbW9uL3NlcnZpY2VzL2NvbW1hbmQtZXhlY3V0b3Iuc2VydmljZSc7XG5pbXBvcnQgeyBNZXNzYWdlU2VydmljZSB9IGZyb20gJy4vY29tbW9uL3NlcnZpY2VzL21lc3NhZ2Uuc2VydmljZSc7XG5cbmltcG9ydCB7IG5neEVkaXRvckNvbmZpZyB9IGZyb20gJy4vY29tbW9uL25neC1lZGl0b3IuZGVmYXVsdHMnO1xuaW1wb3J0ICogYXMgVXRpbHMgZnJvbSAnLi9jb21tb24vdXRpbHMvbmd4LWVkaXRvci51dGlscyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FwcC1uZ3gtZWRpdG9yJyxcbiAgdGVtcGxhdGVVcmw6ICcuL25neC1lZGl0b3IuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9uZ3gtZWRpdG9yLmNvbXBvbmVudC5jc3MnXSxcbiAgcHJvdmlkZXJzOiBbe1xuICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5neEVkaXRvckNvbXBvbmVudCksXG4gICAgbXVsdGk6IHRydWVcbiAgfV1cbn0pXG5cbmV4cG9ydCBjbGFzcyBOZ3hFZGl0b3JDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgLyoqIFNwZWNpZmllcyB3ZWF0aGVyIHRoZSB0ZXh0YXJlYSB0byBiZSBlZGl0YWJsZSBvciBub3QgKi9cbiAgQElucHV0KCkgZWRpdGFibGU6IGJvb2xlYW47XG4gIC8qKiBUaGUgc3BlbGxjaGVjayBwcm9wZXJ0eSBzcGVjaWZpZXMgd2hldGhlciB0aGUgZWxlbWVudCBpcyB0byBoYXZlIGl0cyBzcGVsbGluZyBhbmQgZ3JhbW1hciBjaGVja2VkIG9yIG5vdC4gKi9cbiAgQElucHV0KCkgc3BlbGxjaGVjazogYm9vbGVhbjtcbiAgLyoqIFBsYWNlaG9sZGVyIGZvciB0aGUgdGV4dEFyZWEgKi9cbiAgQElucHV0KCkgcGxhY2Vob2xkZXI6IHN0cmluZztcbiAgLyoqXG4gICAqIFRoZSB0cmFuc2xhdGUgcHJvcGVydHkgc3BlY2lmaWVzIHdoZXRoZXIgdGhlIGNvbnRlbnQgb2YgYW4gZWxlbWVudCBzaG91bGQgYmUgdHJhbnNsYXRlZCBvciBub3QuXG4gICAqXG4gICAqIENoZWNrIGh0dHBzOi8vd3d3Lnczc2Nob29scy5jb20vdGFncy9hdHRfZ2xvYmFsX3RyYW5zbGF0ZS5hc3AgZm9yIG1vcmUgaW5mb3JtYXRpb24gYW5kIGJyb3dzZXIgc3VwcG9ydFxuICAgKi9cbiAgQElucHV0KCkgdHJhbnNsYXRlOiBzdHJpbmc7XG4gIC8qKiBTZXRzIGhlaWdodCBvZiB0aGUgZWRpdG9yICovXG4gIEBJbnB1dCgpIGhlaWdodDogc3RyaW5nO1xuICAvKiogU2V0cyBtaW5pbXVtIGhlaWdodCBmb3IgdGhlIGVkaXRvciAqL1xuICBASW5wdXQoKSBtaW5IZWlnaHQ6IHN0cmluZztcbiAgLyoqIFNldHMgV2lkdGggb2YgdGhlIGVkaXRvciAqL1xuICBASW5wdXQoKSB3aWR0aDogc3RyaW5nO1xuICAvKiogU2V0cyBtaW5pbXVtIHdpZHRoIG9mIHRoZSBlZGl0b3IgKi9cbiAgQElucHV0KCkgbWluV2lkdGg6IHN0cmluZztcbiAgLyoqXG4gICAqIFRvb2xiYXIgYWNjZXB0cyBhbiBhcnJheSB3aGljaCBzcGVjaWZpZXMgdGhlIG9wdGlvbnMgdG8gYmUgZW5hYmxlZCBmb3IgdGhlIHRvb2xiYXJcbiAgICpcbiAgICogQ2hlY2sgbmd4RWRpdG9yQ29uZmlnIGZvciB0b29sYmFyIGNvbmZpZ3VyYXRpb25cbiAgICpcbiAgICogUGFzc2luZyBhbiBlbXB0eSBhcnJheSB3aWxsIGVuYWJsZSBhbGwgdG9vbGJhclxuICAgKi9cbiAgQElucHV0KCkgdG9vbGJhcjogT2JqZWN0O1xuICAvKipcbiAgICogVGhlIGVkaXRvciBjYW4gYmUgcmVzaXplZCB2ZXJ0aWNhbGx5LlxuICAgKlxuICAgKiBgYmFzaWNgIHJlc2l6ZXIgZW5hYmxlcyB0aGUgaHRtbDUgcmVzemllci4gQ2hlY2sgaGVyZSBodHRwczovL3d3dy53M3NjaG9vbHMuY29tL2Nzc3JlZi9jc3MzX3ByX3Jlc2l6ZS5hc3BcbiAgICpcbiAgICogYHN0YWNrYCByZXNpemVyIGVuYWJsZSBhIHJlc2l6ZXIgdGhhdCBsb29rcyBsaWtlIGFzIGlmIGluIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb21cbiAgICovXG4gIEBJbnB1dCgpIHJlc2l6ZXIgPSAnc3RhY2snO1xuICAvKipcbiAgICogVGhlIGNvbmZpZyBwcm9wZXJ0eSBpcyBhIEpTT04gb2JqZWN0XG4gICAqXG4gICAqIEFsbCBhdmFpYmFsZSBpbnB1dHMgaW5wdXRzIGNhbiBiZSBwcm92aWRlZCBpbiB0aGUgY29uZmlndXJhdGlvbiBhcyBKU09OXG4gICAqIGlucHV0cyBwcm92aWRlZCBkaXJlY3RseSBhcmUgY29uc2lkZXJlZCBhcyB0b3AgcHJpb3JpdHlcbiAgICovXG4gIEBJbnB1dCgpIGNvbmZpZyA9IG5neEVkaXRvckNvbmZpZztcbiAgLyoqIFdlYXRoZXIgdG8gc2hvdyBvciBoaWRlIHRvb2xiYXIgKi9cbiAgQElucHV0KCkgc2hvd1Rvb2xiYXI6IGJvb2xlYW47XG4gIC8qKiBXZWF0aGVyIHRvIGVuYWJsZSBvciBkaXNhYmxlIHRoZSB0b29sYmFyICovXG4gIEBJbnB1dCgpIGVuYWJsZVRvb2xiYXI6IGJvb2xlYW47XG4gIC8qKiBFbmRwb2ludCBmb3Igd2hpY2ggdGhlIGltYWdlIHRvIGJlIHVwbG9hZGVkICovXG4gIEBJbnB1dCgpIGltYWdlRW5kUG9pbnQ6IHN0cmluZztcblxuICBASW5wdXQoKSBlbWFpbFBhcmFtczogYW55O1xuXG4gICAgLyoqIGVtaXRzIGBibHVyYCBldmVudCB3aGVuIGZvY3VzZWQgb3V0IGZyb20gdGhlIHRleHRhcmVhICovXG4gIEBPdXRwdXQoKSBibHVyOiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuICAvKiogZW1pdHMgYGZvY3VzYCBldmVudCB3aGVuIGZvY3VzZWQgaW4gdG8gdGhlIHRleHRhcmVhICovXG4gIEBPdXRwdXQoKSBmb2N1czogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuICBAVmlld0NoaWxkKCduZ3hUZXh0QXJlYScpIHRleHRBcmVhOiBhbnk7XG4gIEBWaWV3Q2hpbGQoJ25neFdyYXBwZXInKSBuZ3hXcmFwcGVyOiBhbnk7XG5cbiAgVXRpbHM6IGFueSA9IFV0aWxzO1xuXG4gIHByaXZhdGUgb25DaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBwcml2YXRlIG9uVG91Y2hlZDogKCkgPT4gdm9pZDtcblxuICAvKipcbiAgICogQHBhcmFtIF9tZXNzYWdlU2VydmljZSBzZXJ2aWNlIHRvIHNlbmQgbWVzc2FnZSB0byB0aGUgZWRpdG9yIG1lc3NhZ2UgY29tcG9uZW50XG4gICAqIEBwYXJhbSBfY29tbWFuZEV4ZWN1dG9yIGV4ZWN1dGVzIGNvbW1hbmQgZnJvbSB0aGUgdG9vbGJhclxuICAgKiBAcGFyYW0gX3JlbmRlcmVyIGFjY2VzcyBhbmQgbWFuaXB1bGF0ZSB0aGUgZG9tIGVsZW1lbnRcbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX21lc3NhZ2VTZXJ2aWNlOiBNZXNzYWdlU2VydmljZSxcbiAgICBwcml2YXRlIF9jb21tYW5kRXhlY3V0b3I6IENvbW1hbmRFeGVjdXRvclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMikgeyB9XG5cbiAgLyoqXG4gICAqIGV2ZW50c1xuICAgKi9cbiAgb25UZXh0QXJlYUZvY3VzKCk6IHZvaWQge1xuICAgIHRoaXMuZm9jdXMuZW1pdCgnZm9jdXMnKTtcbiAgfVxuXG4gIC8qKiBmb2N1cyB0aGUgdGV4dCBhcmVhIHdoZW4gdGhlIGVkaXRvciBpcyBmb2N1c3NlZCAqL1xuICBvbkVkaXRvckZvY3VzKCkge1xuICAgIHRoaXMudGV4dEFyZWEubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEV4ZWN1dGVkIGZyb20gdGhlIGNvbnRlbnRlZGl0YWJsZSBzZWN0aW9uIHdoaWxlIHRoZSBpbnB1dCBwcm9wZXJ0eSBjaGFuZ2VzXG4gICAqIEBwYXJhbSBodG1sIGh0bWwgc3RyaW5nIGZyb20gY29udGVudGVkaXRhYmxlXG4gICAqL1xuICBvbkNvbnRlbnRDaGFuZ2UoaW5uZXJIVE1MOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAodHlwZW9mIHRoaXMub25DaGFuZ2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRoaXMub25DaGFuZ2UoaW5uZXJIVE1MKTtcbiAgICAgIHRoaXMudG9nZ2xlUGxhY2Vob2xkZXIoaW5uZXJIVE1MKTtcbiAgICB9XG4gIH1cblxuXG4gIG9uVGV4dEFyZWFCbHVyKCk6IHZvaWQge1xuICAgIC8qKiBzYXZlIHNlbGVjdGlvbiBpZiBmb2N1c3NlZCBvdXQgKi9cbiAgICB0aGlzLl9jb21tYW5kRXhlY3V0b3Iuc2F2ZWRTZWxlY3Rpb24gPSBVdGlscy5zYXZlU2VsZWN0aW9uKCk7XG5cbiAgICBpZiAodHlwZW9mIHRoaXMub25Ub3VjaGVkID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aGlzLm9uVG91Y2hlZCgpO1xuICAgIH1cbiAgICB0aGlzLmJsdXIuZW1pdCgnYmx1cicpO1xuICB9XG5cbiAgLyoqXG4gICAqIHJlc2l6aW5nIHRleHQgYXJlYVxuICAgKlxuICAgKiBAcGFyYW0gb2Zmc2V0WSB2ZXJ0aWNhbCBoZWlnaHQgb2YgdGhlIGVpZHRhYmxlIHBvcnRpb24gb2YgdGhlIGVkaXRvclxuICAgKi9cbiAgcmVzaXplVGV4dEFyZWEob2Zmc2V0WTogbnVtYmVyKTogdm9pZCB7XG4gICAgbGV0IG5ld0hlaWdodCA9IHBhcnNlSW50KHRoaXMuaGVpZ2h0LCAxMCk7XG4gICAgbmV3SGVpZ2h0ICs9IG9mZnNldFk7XG4gICAgdGhpcy5oZWlnaHQgPSBuZXdIZWlnaHQgKyAncHgnO1xuICAgIHRoaXMudGV4dEFyZWEubmF0aXZlRWxlbWVudC5zdHlsZS5oZWlnaHQgPSB0aGlzLmhlaWdodDtcbiAgfVxuXG4gIC8qKlxuICAgKiBlZGl0b3IgYWN0aW9ucywgaS5lLiwgZXhlY3V0ZXMgY29tbWFuZCBmcm9tIHRvb2xiYXJcbiAgICpcbiAgICogQHBhcmFtIGNvbW1hbmROYW1lIG5hbWUgb2YgdGhlIGNvbW1hbmQgdG8gYmUgZXhlY3V0ZWRcbiAgICovXG4gIGV4ZWN1dGVDb21tYW5kKGNvbW1hbmROYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5fY29tbWFuZEV4ZWN1dG9yLmV4ZWN1dGUoY29tbWFuZE5hbWUpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICB0aGlzLl9tZXNzYWdlU2VydmljZS5zZW5kTWVzc2FnZShlcnJvci5tZXNzYWdlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogV3JpdGUgYSBuZXcgdmFsdWUgdG8gdGhlIGVsZW1lbnQuXG4gICAqXG4gICAqIEBwYXJhbSB2YWx1ZSB2YWx1ZSB0byBiZSBleGVjdXRlZCB3aGVuIHRoZXJlIGlzIGEgY2hhbmdlIGluIGNvbnRlbnRlZGl0YWJsZVxuICAgKi9cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgdGhpcy50b2dnbGVQbGFjZWhvbGRlcih2YWx1ZSk7XG5cbiAgICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gJycgfHwgdmFsdWUgPT09ICc8YnI+Jykge1xuICAgICAgdmFsdWUgPSBudWxsO1xuICAgIH1cblxuICAgIHRoaXMucmVmcmVzaFZpZXcodmFsdWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgZnVuY3Rpb24gdG8gYmUgY2FsbGVkXG4gICAqIHdoZW4gdGhlIGNvbnRyb2wgcmVjZWl2ZXMgYSBjaGFuZ2UgZXZlbnQuXG4gICAqXG4gICAqIEBwYXJhbSBmbiBhIGZ1bmN0aW9uXG4gICAqL1xuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLm9uQ2hhbmdlID0gZm47XG4gIH1cblxuICAvKipcbiAgICogU2V0IHRoZSBmdW5jdGlvbiB0byBiZSBjYWxsZWRcbiAgICogd2hlbiB0aGUgY29udHJvbCByZWNlaXZlcyBhIHRvdWNoIGV2ZW50LlxuICAgKlxuICAgKiBAcGFyYW0gZm4gYSBmdW5jdGlvblxuICAgKi9cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSk6IHZvaWQge1xuICAgIHRoaXMub25Ub3VjaGVkID0gZm47XG4gIH1cblxuICAvKipcbiAgICogcmVmcmVzaCB2aWV3L0hUTUwgb2YgdGhlIGVkaXRvclxuICAgKlxuICAgKiBAcGFyYW0gdmFsdWUgaHRtbCBzdHJpbmcgZnJvbSB0aGUgZWRpdG9yXG4gICAqL1xuICByZWZyZXNoVmlldyh2YWx1ZTogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3Qgbm9ybWFsaXplZFZhbHVlID0gdmFsdWUgPT09IG51bGwgPyAnJyA6IHZhbHVlO1xuICAgIHRoaXMuX3JlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMudGV4dEFyZWEubmF0aXZlRWxlbWVudCwgJ2lubmVySFRNTCcsIG5vcm1hbGl6ZWRWYWx1ZSk7XG4gIH1cblxuICAvKipcbiAgICogdG9nZ2xlcyBwbGFjZWhvbGRlciBiYXNlZCBvbiBpbnB1dCBzdHJpbmdcbiAgICpcbiAgICogQHBhcmFtIHZhbHVlIEEgSFRNTCBzdHJpbmcgZnJvbSB0aGUgZWRpdG9yXG4gICAqL1xuICB0b2dnbGVQbGFjZWhvbGRlcih2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgaWYgKCF2YWx1ZSB8fCB2YWx1ZSA9PT0gJzxicj4nIHx8IHZhbHVlID09PSAnJykge1xuICAgICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5uZ3hXcmFwcGVyLm5hdGl2ZUVsZW1lbnQsICdzaG93LXBsYWNlaG9sZGVyJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMubmd4V3JhcHBlci5uYXRpdmVFbGVtZW50LCAnc2hvdy1wbGFjZWhvbGRlcicpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiByZXR1cm5zIGEganNvbiBjb250YWluaW5nIGlucHV0IHBhcmFtc1xuICAgKi9cbiAgZ2V0Q29sbGVjdGl2ZVBhcmFtcygpOiBhbnkge1xuICAgIHJldHVybiB7XG4gICAgICBlZGl0YWJsZTogdGhpcy5lZGl0YWJsZSxcbiAgICAgIHNwZWxsY2hlY2s6IHRoaXMuc3BlbGxjaGVjayxcbiAgICAgIHBsYWNlaG9sZGVyOiB0aGlzLnBsYWNlaG9sZGVyLFxuICAgICAgdHJhbnNsYXRlOiB0aGlzLnRyYW5zbGF0ZSxcbiAgICAgIGhlaWdodDogdGhpcy5oZWlnaHQsXG4gICAgICBtaW5IZWlnaHQ6IHRoaXMubWluSGVpZ2h0LFxuICAgICAgd2lkdGg6IHRoaXMud2lkdGgsXG4gICAgICBtaW5XaWR0aDogdGhpcy5taW5XaWR0aCxcbiAgICAgIGVuYWJsZVRvb2xiYXI6IHRoaXMuZW5hYmxlVG9vbGJhcixcbiAgICAgIHNob3dUb29sYmFyOiB0aGlzLnNob3dUb29sYmFyLFxuICAgICAgaW1hZ2VFbmRQb2ludDogdGhpcy5pbWFnZUVuZFBvaW50LFxuICAgICAgdG9vbGJhcjogdGhpcy50b29sYmFyXG4gICAgfTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIC8qKlxuICAgICAqIHNldCBjb25maWd1YXJ0aW9uXG4gICAgICovXG4gICAgdGhpcy5jb25maWcgPSB0aGlzLlV0aWxzLmdldEVkaXRvckNvbmZpZ3VyYXRpb24odGhpcy5jb25maWcsIG5neEVkaXRvckNvbmZpZywgdGhpcy5nZXRDb2xsZWN0aXZlUGFyYW1zKCkpO1xuXG4gICAgdGhpcy5oZWlnaHQgPSB0aGlzLmhlaWdodCB8fCB0aGlzLnRleHRBcmVhLm5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xuXG4gICAgdGhpcy5leGVjdXRlQ29tbWFuZCgnZW5hYmxlT2JqZWN0UmVzaXppbmcnKTtcbiAgfVxuXG5cbn1cbiJdfQ==