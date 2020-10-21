/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import * as Utils from '../utils/ngx-editor.utils';
var CommandExecutorService = /** @class */ (function () {
    /**
     *
     * @param _http HTTP Client for making http requests
     */
    function CommandExecutorService(_http) {
        this._http = _http;
        /**
         * saves the selection from the editor when focussed out
         */
        this.savedSelection = undefined;
    }
    /**
     * executes command from the toolbar
     *
     * @param command command to be executed
     */
    /**
     * executes command from the toolbar
     *
     * @param {?} command command to be executed
     * @return {?}
     */
    CommandExecutorService.prototype.execute = /**
     * executes command from the toolbar
     *
     * @param {?} command command to be executed
     * @return {?}
     */
    function (command) {
        if (!this.savedSelection && command !== 'enableObjectResizing') {
            throw new Error('Range out of Editor');
        }
        if (command === 'enableObjectResizing') {
            document.execCommand('enableObjectResizing', true);
        }
        if (command === 'blockquote') {
            document.execCommand('formatBlock', false, 'blockquote');
        }
        if (command === 'removeBlockquote') {
            document.execCommand('formatBlock', false, 'div');
        }
        document.execCommand(command, false, null);
    };
    /**
     * inserts image in the editor
     *
     * @param imageURI url of the image to be inserted
     */
    /**
     * inserts image in the editor
     *
     * @param {?} imageURI url of the image to be inserted
     * @return {?}
     */
    CommandExecutorService.prototype.insertImage = /**
     * inserts image in the editor
     *
     * @param {?} imageURI url of the image to be inserted
     * @return {?}
     */
    function (imageURI) {
        if (this.savedSelection) {
            if (imageURI) {
                /** @type {?} */
                var restored = Utils.restoreSelection(this.savedSelection);
                if (restored) {
                    /** @type {?} */
                    var inserted = document.execCommand('insertImage', false, imageURI);
                    if (!inserted) {
                        throw new Error('Invalid URL');
                    }
                }
            }
        }
        else {
            throw new Error('Range out of the editor');
        }
    };
    /**
   * inserts image in the editor
   *
   * @param videParams url of the image to be inserted
   */
    /**
     * inserts image in the editor
     *
     * @param {?} videParams url of the image to be inserted
     * @return {?}
     */
    CommandExecutorService.prototype.insertVideo = /**
     * inserts image in the editor
     *
     * @param {?} videParams url of the image to be inserted
     * @return {?}
     */
    function (videParams) {
        if (this.savedSelection) {
            if (videParams) {
                /** @type {?} */
                var restored = Utils.restoreSelection(this.savedSelection);
                if (restored) {
                    if (this.isYoutubeLink(videParams.videoUrl)) {
                        /** @type {?} */
                        var youtubeURL = '<iframe width="' + videParams.width + '" height="' + videParams.height + '"'
                            + 'src="' + videParams.videoUrl + '"></iframe>';
                        this.insertHtml(youtubeURL);
                    }
                    else if (this.checkTagSupportInBrowser('video')) {
                        if (this.isValidURL(videParams.videoUrl)) {
                            /** @type {?} */
                            var videoSrc = '<video width="' + videParams.width + '" height="' + videParams.height + '"'
                                + ' controls="true"><source src="' + videParams.videoUrl + '"></video>';
                            this.insertHtml(videoSrc);
                        }
                        else {
                            throw new Error('Invalid video URL');
                        }
                    }
                    else {
                        throw new Error('Unable to insert video');
                    }
                }
            }
        }
        else {
            throw new Error('Range out of the editor');
        }
    };
    /**
     * checks the input url is a valid youtube URL or not
     *
     * @param url Youtue URL
     */
    /**
     * checks the input url is a valid youtube URL or not
     *
     * @private
     * @param {?} url Youtue URL
     * @return {?}
     */
    CommandExecutorService.prototype.isYoutubeLink = /**
     * checks the input url is a valid youtube URL or not
     *
     * @private
     * @param {?} url Youtue URL
     * @return {?}
     */
    function (url) {
        /** @type {?} */
        var ytRegExp = /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/;
        return ytRegExp.test(url);
    };
    /**
     * check whether the string is a valid url or not
     * @param url url
     */
    /**
     * check whether the string is a valid url or not
     * @private
     * @param {?} url url
     * @return {?}
     */
    CommandExecutorService.prototype.isValidURL = /**
     * check whether the string is a valid url or not
     * @private
     * @param {?} url url
     * @return {?}
     */
    function (url) {
        /** @type {?} */
        var urlRegExp = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
        return urlRegExp.test(url);
    };
    /**
     * uploads image to the server
     *
     * @param file file that has to be uploaded
     * @param endPoint enpoint to which the image has to be uploaded
     */
    /**
     * uploads image to the server
     *
     * @param {?} file file that has to be uploaded
     * @param {?} endPoint enpoint to which the image has to be uploaded
     * @return {?}
     */
    CommandExecutorService.prototype.uploadImage = /**
     * uploads image to the server
     *
     * @param {?} file file that has to be uploaded
     * @param {?} endPoint enpoint to which the image has to be uploaded
     * @return {?}
     */
    function (file, endPoint) {
        if (!endPoint) {
            throw new Error('Image Endpoint isn`t provided or invalid');
        }
        /** @type {?} */
        var formData = new FormData();
        if (file) {
            formData.append('file', file);
            /** @type {?} */
            var req = new HttpRequest('POST', endPoint, formData, {
                reportProgress: true
            });
            return this._http.request(req);
        }
        else {
            throw new Error('Invalid Image');
        }
    };
    /**
     * inserts link in the editor
     *
     * @param params parameters that holds the information for the link
     */
    /**
     * inserts link in the editor
     *
     * @param {?} params parameters that holds the information for the link
     * @return {?}
     */
    CommandExecutorService.prototype.createLink = /**
     * inserts link in the editor
     *
     * @param {?} params parameters that holds the information for the link
     * @return {?}
     */
    function (params) {
        if (this.savedSelection) {
            /**
             * check whether the saved selection contains a range or plain selection
             */
            if (params.urlNewTab) {
                /** @type {?} */
                var newUrl = '<a href="' + params.urlLink + '" target="_blank">' + params.urlText + '</a>';
                if (document.getSelection().type !== 'Range') {
                    /** @type {?} */
                    var restored = Utils.restoreSelection(this.savedSelection);
                    if (restored) {
                        this.insertHtml(newUrl);
                    }
                }
                else {
                    throw new Error('Only new links can be inserted. You cannot edit URL`s');
                }
            }
            else {
                /** @type {?} */
                var restored = Utils.restoreSelection(this.savedSelection);
                if (restored) {
                    document.execCommand('createLink', false, params.urlLink);
                }
            }
        }
        else {
            throw new Error('Range out of the editor');
        }
    };
    /**
     * insert color either font or background
     *
     * @param color color to be inserted
     * @param where where the color has to be inserted either text/background
     */
    /**
     * insert color either font or background
     *
     * @param {?} color color to be inserted
     * @param {?} where where the color has to be inserted either text/background
     * @return {?}
     */
    CommandExecutorService.prototype.insertColor = /**
     * insert color either font or background
     *
     * @param {?} color color to be inserted
     * @param {?} where where the color has to be inserted either text/background
     * @return {?}
     */
    function (color, where) {
        if (this.savedSelection) {
            /** @type {?} */
            var restored = Utils.restoreSelection(this.savedSelection);
            if (restored && this.checkSelection()) {
                if (where === 'textColor') {
                    document.execCommand('foreColor', false, color);
                }
                else {
                    document.execCommand('hiliteColor', false, color);
                }
            }
        }
        else {
            throw new Error('Range out of the editor');
        }
    };
    /**
     * set email param
     *
     * @param param to be set
     */
    /**
     * set email param
     *
     * @param {?} v
     * @return {?}
     */
    CommandExecutorService.prototype.setEmailParam = /**
     * set email param
     *
     * @param {?} v
     * @return {?}
     */
    function (v) {
        if (this.savedSelection) {
            /** @type {?} */
            var deletedValue = this.deleteAndGetElement();
            if (v) {
                /** @type {?} */
                var restored = Utils.restoreSelection(this.savedSelection);
                if (restored) {
                    /** @type {?} */
                    var paramerter = "<div><b>" + v + "</b></div>";
                    this.insertHtml(paramerter);
                }
            }
        }
        else {
            throw new Error('Range out of the editor');
        }
    };
    /**
     * set font size for text
     *
     * @param fontSize font-size to be set
     */
    /**
     * set font size for text
     *
     * @param {?} fontSize font-size to be set
     * @return {?}
     */
    CommandExecutorService.prototype.setFontSize = /**
     * set font size for text
     *
     * @param {?} fontSize font-size to be set
     * @return {?}
     */
    function (fontSize) {
        if (this.savedSelection && this.checkSelection()) {
            /** @type {?} */
            var deletedValue = this.deleteAndGetElement();
            if (deletedValue) {
                /** @type {?} */
                var restored = Utils.restoreSelection(this.savedSelection);
                if (restored) {
                    if (this.isNumeric(fontSize)) {
                        /** @type {?} */
                        var fontPx = '<span style="font-size: ' + fontSize + 'px;">' + deletedValue + '</span>';
                        this.insertHtml(fontPx);
                    }
                    else {
                        /** @type {?} */
                        var fontPx = '<span style="font-size: ' + fontSize + ';">' + deletedValue + '</span>';
                        this.insertHtml(fontPx);
                    }
                }
            }
        }
        else {
            throw new Error('Range out of the editor');
        }
    };
    /**
     * set font name/family for text
     *
     * @param fontName font-family to be set
     */
    /**
     * set font name/family for text
     *
     * @param {?} fontName font-family to be set
     * @return {?}
     */
    CommandExecutorService.prototype.setFontName = /**
     * set font name/family for text
     *
     * @param {?} fontName font-family to be set
     * @return {?}
     */
    function (fontName) {
        if (this.savedSelection && this.checkSelection()) {
            /** @type {?} */
            var deletedValue = this.deleteAndGetElement();
            if (deletedValue) {
                /** @type {?} */
                var restored = Utils.restoreSelection(this.savedSelection);
                if (restored) {
                    if (this.isNumeric(fontName)) {
                        /** @type {?} */
                        var fontFamily = '<span style="font-family: ' + fontName + 'px;">' + deletedValue + '</span>';
                        this.insertHtml(fontFamily);
                    }
                    else {
                        /** @type {?} */
                        var fontFamily = '<span style="font-family: ' + fontName + ';">' + deletedValue + '</span>';
                        this.insertHtml(fontFamily);
                    }
                }
            }
        }
        else {
            throw new Error('Range out of the editor');
        }
    };
    /** insert HTML */
    /**
     * insert HTML
     * @private
     * @param {?} html
     * @return {?}
     */
    CommandExecutorService.prototype.insertHtml = /**
     * insert HTML
     * @private
     * @param {?} html
     * @return {?}
     */
    function (html) {
        /** @type {?} */
        var isHTMLInserted = document.execCommand('insertHTML', false, html);
        if (!isHTMLInserted) {
            throw new Error('Unable to perform the operation');
        }
    };
    /**
     * check whether the value is a number or string
     * if number return true
     * else return false
     */
    /**
     * check whether the value is a number or string
     * if number return true
     * else return false
     * @private
     * @param {?} value
     * @return {?}
     */
    CommandExecutorService.prototype.isNumeric = /**
     * check whether the value is a number or string
     * if number return true
     * else return false
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return /^-{0,1}\d+$/.test(value);
    };
    /** delete the text at selected range and return the value */
    /**
     * delete the text at selected range and return the value
     * @private
     * @return {?}
     */
    CommandExecutorService.prototype.deleteAndGetElement = /**
     * delete the text at selected range and return the value
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var slectedText;
        if (this.savedSelection) {
            slectedText = this.savedSelection.toString();
            this.savedSelection.deleteContents();
            return slectedText;
        }
        return false;
    };
    /** check any slection is made or not */
    /**
     * check any slection is made or not
     * @private
     * @return {?}
     */
    CommandExecutorService.prototype.checkSelection = /**
     * check any slection is made or not
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var slectedText = this.savedSelection.toString();
        if (slectedText.length === 0) {
            throw new Error('No Selection Made');
        }
        return true;
    };
    /**
     * check tag is supported by browser or not
     *
     * @param tag HTML tag
     */
    /**
     * check tag is supported by browser or not
     *
     * @private
     * @param {?} tag HTML tag
     * @return {?}
     */
    CommandExecutorService.prototype.checkTagSupportInBrowser = /**
     * check tag is supported by browser or not
     *
     * @private
     * @param {?} tag HTML tag
     * @return {?}
     */
    function (tag) {
        return !(document.createElement(tag) instanceof HTMLUnknownElement);
    };
    CommandExecutorService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    CommandExecutorService.ctorParameters = function () { return [
        { type: HttpClient }
    ]; };
    return CommandExecutorService;
}());
export { CommandExecutorService };
if (false) {
    /**
     * saves the selection from the editor when focussed out
     * @type {?}
     */
    CommandExecutorService.prototype.savedSelection;
    /**
     * @type {?}
     * @private
     */
    CommandExecutorService.prototype._http;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWFuZC1leGVjdXRvci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC11aS8iLCJzb3VyY2VzIjpbInNyYy9uZ3gtZWRpdG9yL2NvbW1vbi9zZXJ2aWNlcy9jb21tYW5kLWV4ZWN1dG9yLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMvRCxPQUFPLEtBQUssS0FBSyxNQUFNLDJCQUEyQixDQUFDO0FBRW5EO0lBS0U7OztPQUdHO0lBQ0gsZ0NBQW9CLEtBQWlCO1FBQWpCLFVBQUssR0FBTCxLQUFLLENBQVk7Ozs7UUFOckMsbUJBQWMsR0FBUSxTQUFTLENBQUM7SUFNUyxDQUFDO0lBRTFDOzs7O09BSUc7Ozs7Ozs7SUFDSCx3Q0FBTzs7Ozs7O0lBQVAsVUFBUSxPQUFlO1FBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxJQUFJLE9BQU8sS0FBSyxzQkFBc0IsRUFBRTtZQUM5RCxNQUFNLElBQUksS0FBSyxDQUFDLHFCQUFxQixDQUFDLENBQUM7U0FDeEM7UUFFRCxJQUFJLE9BQU8sS0FBSyxzQkFBc0IsRUFBRTtZQUN0QyxRQUFRLENBQUMsV0FBVyxDQUFDLHNCQUFzQixFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ3BEO1FBRUQsSUFBSSxPQUFPLEtBQUssWUFBWSxFQUFFO1lBQzVCLFFBQVEsQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLEtBQUssRUFBRSxZQUFZLENBQUMsQ0FBQztTQUMxRDtRQUVELElBQUksT0FBTyxLQUFLLGtCQUFrQixFQUFFO1lBQ2xDLFFBQVEsQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztTQUNuRDtRQUNELFFBQVEsQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRUQ7Ozs7T0FJRzs7Ozs7OztJQUNILDRDQUFXOzs7Ozs7SUFBWCxVQUFZLFFBQWdCO1FBQzFCLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUN2QixJQUFJLFFBQVEsRUFBRTs7b0JBQ04sUUFBUSxHQUFHLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDO2dCQUM1RCxJQUFJLFFBQVEsRUFBRTs7d0JBQ04sUUFBUSxHQUFHLFFBQVEsQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLEtBQUssRUFBRSxRQUFRLENBQUM7b0JBQ3JFLElBQUksQ0FBQyxRQUFRLEVBQUU7d0JBQ2IsTUFBTSxJQUFJLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQztxQkFDaEM7aUJBQ0Y7YUFDRjtTQUNGO2FBQU07WUFDTCxNQUFNLElBQUksS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7U0FDNUM7SUFDSCxDQUFDO0lBRUQ7Ozs7S0FJQzs7Ozs7OztJQUNELDRDQUFXOzs7Ozs7SUFBWCxVQUFZLFVBQWU7UUFDekIsSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ3ZCLElBQUksVUFBVSxFQUFFOztvQkFDUixRQUFRLEdBQUcsS0FBSyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxjQUFjLENBQUM7Z0JBQzVELElBQUksUUFBUSxFQUFFO29CQUNaLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUU7OzRCQUNyQyxVQUFVLEdBQUcsaUJBQWlCLEdBQUcsVUFBVSxDQUFDLEtBQUssR0FBRyxZQUFZLEdBQUcsVUFBVSxDQUFDLE1BQU0sR0FBRyxHQUFHOzhCQUM1RixPQUFPLEdBQUcsVUFBVSxDQUFDLFFBQVEsR0FBRyxhQUFhO3dCQUNqRCxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO3FCQUM3Qjt5QkFBTSxJQUFJLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxPQUFPLENBQUMsRUFBRTt3QkFFakQsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBRTs7Z0NBQ2xDLFFBQVEsR0FBRyxnQkFBZ0IsR0FBRyxVQUFVLENBQUMsS0FBSyxHQUFHLFlBQVksR0FBRyxVQUFVLENBQUMsTUFBTSxHQUFHLEdBQUc7a0NBQ3pGLGdDQUFnQyxHQUFHLFVBQVUsQ0FBQyxRQUFRLEdBQUcsWUFBWTs0QkFDekUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQzt5QkFDM0I7NkJBQU07NEJBQ0wsTUFBTSxJQUFJLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO3lCQUN0QztxQkFFRjt5QkFBTTt3QkFDTCxNQUFNLElBQUksS0FBSyxDQUFDLHdCQUF3QixDQUFDLENBQUM7cUJBQzNDO2lCQUNGO2FBQ0Y7U0FDRjthQUFNO1lBQ0wsTUFBTSxJQUFJLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1NBQzVDO0lBQ0gsQ0FBQztJQUVEOzs7O09BSUc7Ozs7Ozs7O0lBQ0ssOENBQWE7Ozs7Ozs7SUFBckIsVUFBc0IsR0FBVzs7WUFDekIsUUFBUSxHQUFHLHVEQUF1RDtRQUN4RSxPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUVEOzs7T0FHRzs7Ozs7OztJQUNLLDJDQUFVOzs7Ozs7SUFBbEIsVUFBbUIsR0FBVzs7WUFDdEIsU0FBUyxHQUFHLDZFQUE2RTtRQUMvRixPQUFPLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVEOzs7OztPQUtHOzs7Ozs7OztJQUNILDRDQUFXOzs7Ozs7O0lBQVgsVUFBWSxJQUFVLEVBQUUsUUFBZ0I7UUFDdEMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNiLE1BQU0sSUFBSSxLQUFLLENBQUMsMENBQTBDLENBQUMsQ0FBQztTQUM3RDs7WUFFSyxRQUFRLEdBQWEsSUFBSSxRQUFRLEVBQUU7UUFFekMsSUFBSSxJQUFJLEVBQUU7WUFFUixRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQzs7Z0JBRXhCLEdBQUcsR0FBRyxJQUFJLFdBQVcsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRTtnQkFDdEQsY0FBYyxFQUFFLElBQUk7YUFDckIsQ0FBQztZQUVGLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7U0FFaEM7YUFBTTtZQUNMLE1BQU0sSUFBSSxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7U0FDbEM7SUFDSCxDQUFDO0lBRUQ7Ozs7T0FJRzs7Ozs7OztJQUNILDJDQUFVOzs7Ozs7SUFBVixVQUFXLE1BQVc7UUFDcEIsSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ3ZCOztlQUVHO1lBQ0gsSUFBSSxNQUFNLENBQUMsU0FBUyxFQUFFOztvQkFDZCxNQUFNLEdBQUcsV0FBVyxHQUFHLE1BQU0sQ0FBQyxPQUFPLEdBQUcsb0JBQW9CLEdBQUcsTUFBTSxDQUFDLE9BQU8sR0FBRyxNQUFNO2dCQUU1RixJQUFJLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxJQUFJLEtBQUssT0FBTyxFQUFFOzt3QkFDdEMsUUFBUSxHQUFHLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDO29CQUM1RCxJQUFJLFFBQVEsRUFBRTt3QkFDWixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO3FCQUN6QjtpQkFDRjtxQkFBTTtvQkFDTCxNQUFNLElBQUksS0FBSyxDQUFDLHVEQUF1RCxDQUFDLENBQUM7aUJBQzFFO2FBQ0Y7aUJBQU07O29CQUNDLFFBQVEsR0FBRyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQztnQkFDNUQsSUFBSSxRQUFRLEVBQUU7b0JBQ1osUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztpQkFDM0Q7YUFDRjtTQUNGO2FBQU07WUFDTCxNQUFNLElBQUksS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7U0FDNUM7SUFDSCxDQUFDO0lBRUQ7Ozs7O09BS0c7Ozs7Ozs7O0lBQ0gsNENBQVc7Ozs7Ozs7SUFBWCxVQUFZLEtBQWEsRUFBRSxLQUFhO1FBQ3RDLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRTs7Z0JBQ2pCLFFBQVEsR0FBRyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQztZQUM1RCxJQUFJLFFBQVEsSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFLEVBQUU7Z0JBQ3JDLElBQUksS0FBSyxLQUFLLFdBQVcsRUFBRTtvQkFDekIsUUFBUSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO2lCQUNqRDtxQkFBTTtvQkFDTCxRQUFRLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7aUJBQ25EO2FBQ0Y7U0FDRjthQUFNO1lBQ0wsTUFBTSxJQUFJLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1NBQzVDO0lBQ0gsQ0FBQztJQUVEOzs7O09BSUc7Ozs7Ozs7SUFDSCw4Q0FBYTs7Ozs7O0lBQWIsVUFBYyxDQUFTO1FBQ25CLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRTs7Z0JBQ2YsWUFBWSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsRUFBRTtZQUMvQyxJQUFJLENBQUMsRUFBRTs7b0JBQ0csUUFBUSxHQUFHLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDO2dCQUM1RCxJQUFJLFFBQVEsRUFBRTs7d0JBQ0osVUFBVSxHQUFHLFVBQVUsR0FBRSxDQUFDLEdBQUUsWUFBWTtvQkFDOUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztpQkFDL0I7YUFDSjtTQUNKO2FBQ0k7WUFDRCxNQUFNLElBQUksS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7U0FDOUM7SUFDTCxDQUFDO0lBQ0Q7Ozs7T0FJRzs7Ozs7OztJQUNILDRDQUFXOzs7Ozs7SUFBWCxVQUFZLFFBQWdCO1FBQzFCLElBQUksSUFBSSxDQUFDLGNBQWMsSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFLEVBQUU7O2dCQUMxQyxZQUFZLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixFQUFFO1lBRS9DLElBQUksWUFBWSxFQUFFOztvQkFDVixRQUFRLEdBQUcsS0FBSyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxjQUFjLENBQUM7Z0JBRTVELElBQUksUUFBUSxFQUFFO29CQUNaLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsRUFBRTs7NEJBQ3RCLE1BQU0sR0FBRywwQkFBMEIsR0FBRyxRQUFRLEdBQUcsT0FBTyxHQUFHLFlBQVksR0FBRyxTQUFTO3dCQUN6RixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO3FCQUN6Qjt5QkFBTTs7NEJBQ0MsTUFBTSxHQUFHLDBCQUEwQixHQUFHLFFBQVEsR0FBRyxLQUFLLEdBQUcsWUFBWSxHQUFHLFNBQVM7d0JBQ3ZGLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7cUJBQ3pCO2lCQUNGO2FBQ0Y7U0FDRjthQUFNO1lBQ0wsTUFBTSxJQUFJLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1NBQzVDO0lBQ0gsQ0FBQztJQUVEOzs7O09BSUc7Ozs7Ozs7SUFDSCw0Q0FBVzs7Ozs7O0lBQVgsVUFBWSxRQUFnQjtRQUMxQixJQUFJLElBQUksQ0FBQyxjQUFjLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRSxFQUFFOztnQkFDMUMsWUFBWSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsRUFBRTtZQUUvQyxJQUFJLFlBQVksRUFBRTs7b0JBQ1YsUUFBUSxHQUFHLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDO2dCQUU1RCxJQUFJLFFBQVEsRUFBRTtvQkFDWixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEVBQUU7OzRCQUN0QixVQUFVLEdBQUcsNEJBQTRCLEdBQUcsUUFBUSxHQUFHLE9BQU8sR0FBRyxZQUFZLEdBQUcsU0FBUzt3QkFDL0YsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztxQkFDN0I7eUJBQU07OzRCQUNDLFVBQVUsR0FBRyw0QkFBNEIsR0FBRyxRQUFRLEdBQUcsS0FBSyxHQUFHLFlBQVksR0FBRyxTQUFTO3dCQUM3RixJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO3FCQUM3QjtpQkFDRjthQUNGO1NBQ0Y7YUFBTTtZQUNMLE1BQU0sSUFBSSxLQUFLLENBQUMseUJBQXlCLENBQUMsQ0FBQztTQUM1QztJQUNILENBQUM7SUFFRCxrQkFBa0I7Ozs7Ozs7SUFDViwyQ0FBVTs7Ozs7O0lBQWxCLFVBQW1CLElBQVk7O1lBQ3ZCLGNBQWMsR0FBRyxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDO1FBQ3RFLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDbkIsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO1NBQ3BEO0lBQ0gsQ0FBQztJQUVEOzs7O09BSUc7Ozs7Ozs7OztJQUNLLDBDQUFTOzs7Ozs7OztJQUFqQixVQUFrQixLQUFVO1FBQzFCLE9BQU8sYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQsNkRBQTZEOzs7Ozs7SUFDckQsb0RBQW1COzs7OztJQUEzQjs7WUFDTSxXQUFXO1FBRWYsSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ3ZCLFdBQVcsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQzdDLElBQUksQ0FBQyxjQUFjLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDckMsT0FBTyxXQUFXLENBQUM7U0FDcEI7UUFFRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFRCx3Q0FBd0M7Ozs7OztJQUNoQywrQ0FBYzs7Ozs7SUFBdEI7O1lBQ1EsV0FBVyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFO1FBRWxELElBQUksV0FBVyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDNUIsTUFBTSxJQUFJLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1NBQ3RDO1FBRUQsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQ7Ozs7T0FJRzs7Ozs7Ozs7SUFDSyx5REFBd0I7Ozs7Ozs7SUFBaEMsVUFBaUMsR0FBVztRQUMxQyxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxZQUFZLGtCQUFrQixDQUFDLENBQUM7SUFDdEUsQ0FBQzs7Z0JBeFRGLFVBQVU7Ozs7Z0JBSEYsVUFBVTs7SUE2VG5CLDZCQUFDO0NBQUEsQUExVEQsSUEwVEM7U0F6VFksc0JBQXNCOzs7Ozs7SUFFakMsZ0RBQWdDOzs7OztJQU1wQix1Q0FBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwUmVxdWVzdCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCAqIGFzIFV0aWxzIGZyb20gJy4uL3V0aWxzL25neC1lZGl0b3IudXRpbHMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ29tbWFuZEV4ZWN1dG9yU2VydmljZSB7XG4gIC8qKiBzYXZlcyB0aGUgc2VsZWN0aW9uIGZyb20gdGhlIGVkaXRvciB3aGVuIGZvY3Vzc2VkIG91dCAqL1xuICBzYXZlZFNlbGVjdGlvbjogYW55ID0gdW5kZWZpbmVkO1xuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0gX2h0dHAgSFRUUCBDbGllbnQgZm9yIG1ha2luZyBodHRwIHJlcXVlc3RzXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9odHRwOiBIdHRwQ2xpZW50KSB7IH1cblxuICAvKipcbiAgICogZXhlY3V0ZXMgY29tbWFuZCBmcm9tIHRoZSB0b29sYmFyXG4gICAqXG4gICAqIEBwYXJhbSBjb21tYW5kIGNvbW1hbmQgdG8gYmUgZXhlY3V0ZWRcbiAgICovXG4gIGV4ZWN1dGUoY29tbWFuZDogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnNhdmVkU2VsZWN0aW9uICYmIGNvbW1hbmQgIT09ICdlbmFibGVPYmplY3RSZXNpemluZycpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUmFuZ2Ugb3V0IG9mIEVkaXRvcicpO1xuICAgIH1cblxuICAgIGlmIChjb21tYW5kID09PSAnZW5hYmxlT2JqZWN0UmVzaXppbmcnKSB7XG4gICAgICBkb2N1bWVudC5leGVjQ29tbWFuZCgnZW5hYmxlT2JqZWN0UmVzaXppbmcnLCB0cnVlKTtcbiAgICB9XG5cbiAgICBpZiAoY29tbWFuZCA9PT0gJ2Jsb2NrcXVvdGUnKSB7XG4gICAgICBkb2N1bWVudC5leGVjQ29tbWFuZCgnZm9ybWF0QmxvY2snLCBmYWxzZSwgJ2Jsb2NrcXVvdGUnKTtcbiAgICB9XG5cbiAgICBpZiAoY29tbWFuZCA9PT0gJ3JlbW92ZUJsb2NrcXVvdGUnKSB7XG4gICAgICBkb2N1bWVudC5leGVjQ29tbWFuZCgnZm9ybWF0QmxvY2snLCBmYWxzZSwgJ2RpdicpO1xuICAgIH1cbiAgICBkb2N1bWVudC5leGVjQ29tbWFuZChjb21tYW5kLCBmYWxzZSwgbnVsbCk7XG4gIH1cblxuICAvKipcbiAgICogaW5zZXJ0cyBpbWFnZSBpbiB0aGUgZWRpdG9yXG4gICAqXG4gICAqIEBwYXJhbSBpbWFnZVVSSSB1cmwgb2YgdGhlIGltYWdlIHRvIGJlIGluc2VydGVkXG4gICAqL1xuICBpbnNlcnRJbWFnZShpbWFnZVVSSTogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuc2F2ZWRTZWxlY3Rpb24pIHtcbiAgICAgIGlmIChpbWFnZVVSSSkge1xuICAgICAgICBjb25zdCByZXN0b3JlZCA9IFV0aWxzLnJlc3RvcmVTZWxlY3Rpb24odGhpcy5zYXZlZFNlbGVjdGlvbik7XG4gICAgICAgIGlmIChyZXN0b3JlZCkge1xuICAgICAgICAgIGNvbnN0IGluc2VydGVkID0gZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2luc2VydEltYWdlJywgZmFsc2UsIGltYWdlVVJJKTtcbiAgICAgICAgICBpZiAoIWluc2VydGVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgVVJMJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUmFuZ2Ugb3V0IG9mIHRoZSBlZGl0b3InKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAqIGluc2VydHMgaW1hZ2UgaW4gdGhlIGVkaXRvclxuICpcbiAqIEBwYXJhbSB2aWRlUGFyYW1zIHVybCBvZiB0aGUgaW1hZ2UgdG8gYmUgaW5zZXJ0ZWRcbiAqL1xuICBpbnNlcnRWaWRlbyh2aWRlUGFyYW1zOiBhbnkpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5zYXZlZFNlbGVjdGlvbikge1xuICAgICAgaWYgKHZpZGVQYXJhbXMpIHtcbiAgICAgICAgY29uc3QgcmVzdG9yZWQgPSBVdGlscy5yZXN0b3JlU2VsZWN0aW9uKHRoaXMuc2F2ZWRTZWxlY3Rpb24pO1xuICAgICAgICBpZiAocmVzdG9yZWQpIHtcbiAgICAgICAgICBpZiAodGhpcy5pc1lvdXR1YmVMaW5rKHZpZGVQYXJhbXMudmlkZW9VcmwpKSB7XG4gICAgICAgICAgICBjb25zdCB5b3V0dWJlVVJMID0gJzxpZnJhbWUgd2lkdGg9XCInICsgdmlkZVBhcmFtcy53aWR0aCArICdcIiBoZWlnaHQ9XCInICsgdmlkZVBhcmFtcy5oZWlnaHQgKyAnXCInXG4gICAgICAgICAgICAgICsgJ3NyYz1cIicgKyB2aWRlUGFyYW1zLnZpZGVvVXJsICsgJ1wiPjwvaWZyYW1lPic7XG4gICAgICAgICAgICB0aGlzLmluc2VydEh0bWwoeW91dHViZVVSTCk7XG4gICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmNoZWNrVGFnU3VwcG9ydEluQnJvd3NlcigndmlkZW8nKSkge1xuXG4gICAgICAgICAgICBpZiAodGhpcy5pc1ZhbGlkVVJMKHZpZGVQYXJhbXMudmlkZW9VcmwpKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHZpZGVvU3JjID0gJzx2aWRlbyB3aWR0aD1cIicgKyB2aWRlUGFyYW1zLndpZHRoICsgJ1wiIGhlaWdodD1cIicgKyB2aWRlUGFyYW1zLmhlaWdodCArICdcIidcbiAgICAgICAgICAgICAgICArICcgY29udHJvbHM9XCJ0cnVlXCI+PHNvdXJjZSBzcmM9XCInICsgdmlkZVBhcmFtcy52aWRlb1VybCArICdcIj48L3ZpZGVvPic7XG4gICAgICAgICAgICAgIHRoaXMuaW5zZXJ0SHRtbCh2aWRlb1NyYyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgdmlkZW8gVVJMJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmFibGUgdG8gaW5zZXJ0IHZpZGVvJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUmFuZ2Ugb3V0IG9mIHRoZSBlZGl0b3InKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogY2hlY2tzIHRoZSBpbnB1dCB1cmwgaXMgYSB2YWxpZCB5b3V0dWJlIFVSTCBvciBub3RcbiAgICpcbiAgICogQHBhcmFtIHVybCBZb3V0dWUgVVJMXG4gICAqL1xuICBwcml2YXRlIGlzWW91dHViZUxpbmsodXJsOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBjb25zdCB5dFJlZ0V4cCA9IC9eKGh0dHAocyk/OlxcL1xcLyk/KCh3KXszfS4pP3lvdXR1KGJlfC5iZSk/KFxcLmNvbSk/XFwvLisvO1xuICAgIHJldHVybiB5dFJlZ0V4cC50ZXN0KHVybCk7XG4gIH1cblxuICAvKipcbiAgICogY2hlY2sgd2hldGhlciB0aGUgc3RyaW5nIGlzIGEgdmFsaWQgdXJsIG9yIG5vdFxuICAgKiBAcGFyYW0gdXJsIHVybFxuICAgKi9cbiAgcHJpdmF0ZSBpc1ZhbGlkVVJMKHVybDogc3RyaW5nKSB7XG4gICAgY29uc3QgdXJsUmVnRXhwID0gLyhodHRwfGh0dHBzKTpcXC9cXC8oXFx3Kzp7MCwxfVxcdyopPyhcXFMrKSg6WzAtOV0rKT8oXFwvfFxcLyhbXFx3IyE6Lj8rPSYlIVxcLVxcL10pKT8vO1xuICAgIHJldHVybiB1cmxSZWdFeHAudGVzdCh1cmwpO1xuICB9XG5cbiAgLyoqXG4gICAqIHVwbG9hZHMgaW1hZ2UgdG8gdGhlIHNlcnZlclxuICAgKlxuICAgKiBAcGFyYW0gZmlsZSBmaWxlIHRoYXQgaGFzIHRvIGJlIHVwbG9hZGVkXG4gICAqIEBwYXJhbSBlbmRQb2ludCBlbnBvaW50IHRvIHdoaWNoIHRoZSBpbWFnZSBoYXMgdG8gYmUgdXBsb2FkZWRcbiAgICovXG4gIHVwbG9hZEltYWdlKGZpbGU6IEZpbGUsIGVuZFBvaW50OiBzdHJpbmcpOiBhbnkge1xuICAgIGlmICghZW5kUG9pbnQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW1hZ2UgRW5kcG9pbnQgaXNuYHQgcHJvdmlkZWQgb3IgaW52YWxpZCcpO1xuICAgIH1cblxuICAgIGNvbnN0IGZvcm1EYXRhOiBGb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuXG4gICAgaWYgKGZpbGUpIHtcblxuICAgICAgZm9ybURhdGEuYXBwZW5kKCdmaWxlJywgZmlsZSk7XG5cbiAgICAgIGNvbnN0IHJlcSA9IG5ldyBIdHRwUmVxdWVzdCgnUE9TVCcsIGVuZFBvaW50LCBmb3JtRGF0YSwge1xuICAgICAgICByZXBvcnRQcm9ncmVzczogdHJ1ZVxuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiB0aGlzLl9odHRwLnJlcXVlc3QocmVxKTtcblxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgSW1hZ2UnKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogaW5zZXJ0cyBsaW5rIGluIHRoZSBlZGl0b3JcbiAgICpcbiAgICogQHBhcmFtIHBhcmFtcyBwYXJhbWV0ZXJzIHRoYXQgaG9sZHMgdGhlIGluZm9ybWF0aW9uIGZvciB0aGUgbGlua1xuICAgKi9cbiAgY3JlYXRlTGluayhwYXJhbXM6IGFueSk6IHZvaWQge1xuICAgIGlmICh0aGlzLnNhdmVkU2VsZWN0aW9uKSB7XG4gICAgICAvKipcbiAgICAgICAqIGNoZWNrIHdoZXRoZXIgdGhlIHNhdmVkIHNlbGVjdGlvbiBjb250YWlucyBhIHJhbmdlIG9yIHBsYWluIHNlbGVjdGlvblxuICAgICAgICovXG4gICAgICBpZiAocGFyYW1zLnVybE5ld1RhYikge1xuICAgICAgICBjb25zdCBuZXdVcmwgPSAnPGEgaHJlZj1cIicgKyBwYXJhbXMudXJsTGluayArICdcIiB0YXJnZXQ9XCJfYmxhbmtcIj4nICsgcGFyYW1zLnVybFRleHQgKyAnPC9hPic7XG5cbiAgICAgICAgaWYgKGRvY3VtZW50LmdldFNlbGVjdGlvbigpLnR5cGUgIT09ICdSYW5nZScpIHtcbiAgICAgICAgICBjb25zdCByZXN0b3JlZCA9IFV0aWxzLnJlc3RvcmVTZWxlY3Rpb24odGhpcy5zYXZlZFNlbGVjdGlvbik7XG4gICAgICAgICAgaWYgKHJlc3RvcmVkKSB7XG4gICAgICAgICAgICB0aGlzLmluc2VydEh0bWwobmV3VXJsKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdPbmx5IG5ldyBsaW5rcyBjYW4gYmUgaW5zZXJ0ZWQuIFlvdSBjYW5ub3QgZWRpdCBVUkxgcycpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCByZXN0b3JlZCA9IFV0aWxzLnJlc3RvcmVTZWxlY3Rpb24odGhpcy5zYXZlZFNlbGVjdGlvbik7XG4gICAgICAgIGlmIChyZXN0b3JlZCkge1xuICAgICAgICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKCdjcmVhdGVMaW5rJywgZmFsc2UsIHBhcmFtcy51cmxMaW5rKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1JhbmdlIG91dCBvZiB0aGUgZWRpdG9yJyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIGluc2VydCBjb2xvciBlaXRoZXIgZm9udCBvciBiYWNrZ3JvdW5kXG4gICAqXG4gICAqIEBwYXJhbSBjb2xvciBjb2xvciB0byBiZSBpbnNlcnRlZFxuICAgKiBAcGFyYW0gd2hlcmUgd2hlcmUgdGhlIGNvbG9yIGhhcyB0byBiZSBpbnNlcnRlZCBlaXRoZXIgdGV4dC9iYWNrZ3JvdW5kXG4gICAqL1xuICBpbnNlcnRDb2xvcihjb2xvcjogc3RyaW5nLCB3aGVyZTogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuc2F2ZWRTZWxlY3Rpb24pIHtcbiAgICAgIGNvbnN0IHJlc3RvcmVkID0gVXRpbHMucmVzdG9yZVNlbGVjdGlvbih0aGlzLnNhdmVkU2VsZWN0aW9uKTtcbiAgICAgIGlmIChyZXN0b3JlZCAmJiB0aGlzLmNoZWNrU2VsZWN0aW9uKCkpIHtcbiAgICAgICAgaWYgKHdoZXJlID09PSAndGV4dENvbG9yJykge1xuICAgICAgICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKCdmb3JlQ29sb3InLCBmYWxzZSwgY29sb3IpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKCdoaWxpdGVDb2xvcicsIGZhbHNlLCBjb2xvcik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdSYW5nZSBvdXQgb2YgdGhlIGVkaXRvcicpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBzZXQgZW1haWwgcGFyYW1cbiAgICpcbiAgICogQHBhcmFtIHBhcmFtIHRvIGJlIHNldFxuICAgKi9cbiAgc2V0RW1haWxQYXJhbSh2OiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgIGlmICh0aGlzLnNhdmVkU2VsZWN0aW9uKSB7XG4gICAgICAgICAgY29uc3QgZGVsZXRlZFZhbHVlID0gdGhpcy5kZWxldGVBbmRHZXRFbGVtZW50KCk7XG4gICAgICAgICAgaWYgKHYpIHtcbiAgICAgICAgICAgICAgY29uc3QgcmVzdG9yZWQgPSBVdGlscy5yZXN0b3JlU2VsZWN0aW9uKHRoaXMuc2F2ZWRTZWxlY3Rpb24pO1xuICAgICAgICAgICAgICBpZiAocmVzdG9yZWQpIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcmFtZXJ0ZXIgPSBgPGRpdj48Yj5gKyB2ICtgPC9iPjwvZGl2PmA7XG4gICAgICAgICAgICAgICAgICB0aGlzLmluc2VydEh0bWwocGFyYW1lcnRlcik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1JhbmdlIG91dCBvZiB0aGUgZWRpdG9yJyk7XG4gICAgICB9XG4gIH1cbiAgLyoqXG4gICAqIHNldCBmb250IHNpemUgZm9yIHRleHRcbiAgICpcbiAgICogQHBhcmFtIGZvbnRTaXplIGZvbnQtc2l6ZSB0byBiZSBzZXRcbiAgICovXG4gIHNldEZvbnRTaXplKGZvbnRTaXplOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5zYXZlZFNlbGVjdGlvbiAmJiB0aGlzLmNoZWNrU2VsZWN0aW9uKCkpIHtcbiAgICAgIGNvbnN0IGRlbGV0ZWRWYWx1ZSA9IHRoaXMuZGVsZXRlQW5kR2V0RWxlbWVudCgpO1xuXG4gICAgICBpZiAoZGVsZXRlZFZhbHVlKSB7XG4gICAgICAgIGNvbnN0IHJlc3RvcmVkID0gVXRpbHMucmVzdG9yZVNlbGVjdGlvbih0aGlzLnNhdmVkU2VsZWN0aW9uKTtcblxuICAgICAgICBpZiAocmVzdG9yZWQpIHtcbiAgICAgICAgICBpZiAodGhpcy5pc051bWVyaWMoZm9udFNpemUpKSB7XG4gICAgICAgICAgICBjb25zdCBmb250UHggPSAnPHNwYW4gc3R5bGU9XCJmb250LXNpemU6ICcgKyBmb250U2l6ZSArICdweDtcIj4nICsgZGVsZXRlZFZhbHVlICsgJzwvc3Bhbj4nO1xuICAgICAgICAgICAgdGhpcy5pbnNlcnRIdG1sKGZvbnRQeCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGZvbnRQeCA9ICc8c3BhbiBzdHlsZT1cImZvbnQtc2l6ZTogJyArIGZvbnRTaXplICsgJztcIj4nICsgZGVsZXRlZFZhbHVlICsgJzwvc3Bhbj4nO1xuICAgICAgICAgICAgdGhpcy5pbnNlcnRIdG1sKGZvbnRQeCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUmFuZ2Ugb3V0IG9mIHRoZSBlZGl0b3InKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogc2V0IGZvbnQgbmFtZS9mYW1pbHkgZm9yIHRleHRcbiAgICpcbiAgICogQHBhcmFtIGZvbnROYW1lIGZvbnQtZmFtaWx5IHRvIGJlIHNldFxuICAgKi9cbiAgc2V0Rm9udE5hbWUoZm9udE5hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgIGlmICh0aGlzLnNhdmVkU2VsZWN0aW9uICYmIHRoaXMuY2hlY2tTZWxlY3Rpb24oKSkge1xuICAgICAgY29uc3QgZGVsZXRlZFZhbHVlID0gdGhpcy5kZWxldGVBbmRHZXRFbGVtZW50KCk7XG5cbiAgICAgIGlmIChkZWxldGVkVmFsdWUpIHtcbiAgICAgICAgY29uc3QgcmVzdG9yZWQgPSBVdGlscy5yZXN0b3JlU2VsZWN0aW9uKHRoaXMuc2F2ZWRTZWxlY3Rpb24pO1xuXG4gICAgICAgIGlmIChyZXN0b3JlZCkge1xuICAgICAgICAgIGlmICh0aGlzLmlzTnVtZXJpYyhmb250TmFtZSkpIHtcbiAgICAgICAgICAgIGNvbnN0IGZvbnRGYW1pbHkgPSAnPHNwYW4gc3R5bGU9XCJmb250LWZhbWlseTogJyArIGZvbnROYW1lICsgJ3B4O1wiPicgKyBkZWxldGVkVmFsdWUgKyAnPC9zcGFuPic7XG4gICAgICAgICAgICB0aGlzLmluc2VydEh0bWwoZm9udEZhbWlseSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGZvbnRGYW1pbHkgPSAnPHNwYW4gc3R5bGU9XCJmb250LWZhbWlseTogJyArIGZvbnROYW1lICsgJztcIj4nICsgZGVsZXRlZFZhbHVlICsgJzwvc3Bhbj4nO1xuICAgICAgICAgICAgdGhpcy5pbnNlcnRIdG1sKGZvbnRGYW1pbHkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1JhbmdlIG91dCBvZiB0aGUgZWRpdG9yJyk7XG4gICAgfVxuICB9XG5cbiAgLyoqIGluc2VydCBIVE1MICovXG4gIHByaXZhdGUgaW5zZXJ0SHRtbChodG1sOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBpc0hUTUxJbnNlcnRlZCA9IGRvY3VtZW50LmV4ZWNDb21tYW5kKCdpbnNlcnRIVE1MJywgZmFsc2UsIGh0bWwpO1xuICAgIGlmICghaXNIVE1MSW5zZXJ0ZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVW5hYmxlIHRvIHBlcmZvcm0gdGhlIG9wZXJhdGlvbicpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBjaGVjayB3aGV0aGVyIHRoZSB2YWx1ZSBpcyBhIG51bWJlciBvciBzdHJpbmdcbiAgICogaWYgbnVtYmVyIHJldHVybiB0cnVlXG4gICAqIGVsc2UgcmV0dXJuIGZhbHNlXG4gICAqL1xuICBwcml2YXRlIGlzTnVtZXJpYyh2YWx1ZTogYW55KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIC9eLXswLDF9XFxkKyQvLnRlc3QodmFsdWUpO1xuICB9XG5cbiAgLyoqIGRlbGV0ZSB0aGUgdGV4dCBhdCBzZWxlY3RlZCByYW5nZSBhbmQgcmV0dXJuIHRoZSB2YWx1ZSAqL1xuICBwcml2YXRlIGRlbGV0ZUFuZEdldEVsZW1lbnQoKTogYW55IHtcbiAgICBsZXQgc2xlY3RlZFRleHQ7XG5cbiAgICBpZiAodGhpcy5zYXZlZFNlbGVjdGlvbikge1xuICAgICAgc2xlY3RlZFRleHQgPSB0aGlzLnNhdmVkU2VsZWN0aW9uLnRvU3RyaW5nKCk7XG4gICAgICB0aGlzLnNhdmVkU2VsZWN0aW9uLmRlbGV0ZUNvbnRlbnRzKCk7XG4gICAgICByZXR1cm4gc2xlY3RlZFRleHQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLyoqIGNoZWNrIGFueSBzbGVjdGlvbiBpcyBtYWRlIG9yIG5vdCAqL1xuICBwcml2YXRlIGNoZWNrU2VsZWN0aW9uKCk6IGFueSB7XG4gICAgY29uc3Qgc2xlY3RlZFRleHQgPSB0aGlzLnNhdmVkU2VsZWN0aW9uLnRvU3RyaW5nKCk7XG5cbiAgICBpZiAoc2xlY3RlZFRleHQubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIFNlbGVjdGlvbiBNYWRlJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvKipcbiAgICogY2hlY2sgdGFnIGlzIHN1cHBvcnRlZCBieSBicm93c2VyIG9yIG5vdFxuICAgKlxuICAgKiBAcGFyYW0gdGFnIEhUTUwgdGFnXG4gICAqL1xuICBwcml2YXRlIGNoZWNrVGFnU3VwcG9ydEluQnJvd3Nlcih0YWc6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKSBpbnN0YW5jZW9mIEhUTUxVbmtub3duRWxlbWVudCk7XG4gIH1cblxufVxuIl19