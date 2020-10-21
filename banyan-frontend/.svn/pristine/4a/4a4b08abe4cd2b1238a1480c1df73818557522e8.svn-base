(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@ngx-translate/core'), require('rxjs'), require('rxjs/operators'), require('moment-mini'), require('text-encoding-utf-8'), require('slickgrid/plugins/slick.cellrangedecorator'), require('slickgrid/plugins/slick.cellrangeselector'), require('slickgrid/plugins/slick.cellselectionmodel'), require('flatpickr'), require('dompurify'), require('lodash.isequal'), require('jquery-ui-dist/jquery-ui'), require('slickgrid/lib/jquery.event.drag-2.3.0'), require('slickgrid/slick.core'), require('slickgrid/slick.grid'), require('slickgrid/slick.dataview'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('angular-slickgrid', ['exports', '@angular/core', '@ngx-translate/core', 'rxjs', 'rxjs/operators', 'moment-mini', 'text-encoding-utf-8', 'slickgrid/plugins/slick.cellrangedecorator', 'slickgrid/plugins/slick.cellrangeselector', 'slickgrid/plugins/slick.cellselectionmodel', 'flatpickr', 'dompurify', 'lodash.isequal', 'jquery-ui-dist/jquery-ui', 'slickgrid/lib/jquery.event.drag-2.3.0', 'slickgrid/slick.core', 'slickgrid/slick.grid', 'slickgrid/slick.dataview', '@angular/common'], factory) :
    (global = global || self, factory(global['angular-slickgrid'] = {}, global.ng.core, global['ngx-translate-core'], global.rxjs, global.rxjs.operators, global.moment, global.textEncodingUtf8, null, null, null, global.flatpickr, global.dompurify, global.lodash.isequal, null, null, null, null, null, global.ng.common));
}(this, function (exports, core, core$1, rxjs, operators, moment_, textEncodingUtf8, slick_cellrangedecorator, slick_cellrangeselector, slick_cellselectionmodel, Flatpickr, DOMPurify_, isequal_, jqueryUi, jquery_event_drag2_3_0, slick_core, slick_grid, slick_dataview, common) { 'use strict';

    Flatpickr = Flatpickr && Flatpickr.hasOwnProperty('default') ? Flatpickr['default'] : Flatpickr;

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    (function (CaseType) {
        CaseType[CaseType["camelCase"] = 0] = "camelCase";
        CaseType[CaseType["pascalCase"] = 1] = "pascalCase";
        CaseType[CaseType["snakeCase"] = 2] = "snakeCase";
    })(exports.CaseType || (exports.CaseType = {}));


    (function (DelimiterType) {
        DelimiterType["colon"] = ":";
        DelimiterType["comma"] = ",";
        DelimiterType["equalSign"] = "=";
        DelimiterType["pipe"] = "|";
        DelimiterType["semicolon"] = ";";
        DelimiterType["space"] = " ";
        DelimiterType["tab"] = "\t";
        DelimiterType["doubleColon"] = "::";
        DelimiterType["doublePipe"] = "||";
        DelimiterType["doubleSemicolon"] = ";;";
    })(exports.DelimiterType || (exports.DelimiterType = {}));


    (function (EmitterType) {
        EmitterType["local"] = "local";
        EmitterType["remote"] = "remote";
    })(exports.EmitterType || (exports.EmitterType = {}));

    /** List of available SlickGrid Extensions (Controls & Plugins) */

    (function (ExtensionName) {
        ExtensionName["autoTooltip"] = "autoTooltip";
        ExtensionName["cellExternalCopyManager"] = "cellExternalCopyManager";
        ExtensionName["checkboxSelector"] = "checkboxSelector";
        ExtensionName["columnPicker"] = "columnPicker";
        ExtensionName["draggableGrouping"] = "draggableGrouping";
        ExtensionName["groupItemMetaProvider"] = "groupItemMetaProvider";
        ExtensionName["gridMenu"] = "gridMenu";
        ExtensionName["headerButton"] = "headerButton";
        ExtensionName["headerMenu"] = "headerMenu";
        ExtensionName["noname"] = "noname";
        ExtensionName["rowDetailView"] = "rowDetailView";
        ExtensionName["rowMoveManager"] = "rowMoveManager";
        ExtensionName["rowSelection"] = "rowSelection";
    })(exports.ExtensionName || (exports.ExtensionName = {}));


    (function (FieldType) {
        FieldType[FieldType["unknown"] = 0] = "unknown";
        FieldType[FieldType["string"] = 1] = "string";
        FieldType[FieldType["boolean"] = 2] = "boolean";
        FieldType[FieldType["integer"] = 3] = "integer";
        FieldType[FieldType["float"] = 4] = "float";
        /** number includes Integer and Float */
        FieldType[FieldType["number"] = 5] = "number";
        /** new Date(), javascript Date object */
        FieldType[FieldType["date"] = 6] = "date";
        /** Format: 'YYYY-MM-DD' => 2001-01-01 */
        FieldType[FieldType["dateIso"] = 7] = "dateIso";
        /** Format: 'YYYY-MM-DDTHH:mm:ss.SSSZ' => 2001-01-01T14:00:00.123Z */
        FieldType[FieldType["dateUtc"] = 8] = "dateUtc";
        /** new Date(), javacript Date Object with Time */
        FieldType[FieldType["dateTime"] = 9] = "dateTime";
        /** Format: 'YYYY-MM-DD HH:mm:ss' => 2001-01-01 14:01:01 */
        FieldType[FieldType["dateTimeIso"] = 10] = "dateTimeIso";
        /** Format: 'YYYY-MM-DD h:mm:ss a' => 2001-01-01 11:01:01 pm */
        FieldType[FieldType["dateTimeIsoAmPm"] = 11] = "dateTimeIsoAmPm";
        /** Format: 'YYYY-MM-DD h:mm:ss A' => 2001-01-01 11:01:01 PM */
        FieldType[FieldType["dateTimeIsoAM_PM"] = 12] = "dateTimeIsoAM_PM";
        /** Format: 'YYYY-MM-DD HH:mm' => 2001-01-01 14:01 */
        FieldType[FieldType["dateTimeShortIso"] = 13] = "dateTimeShortIso";
        /** Format (Euro): 'DD/MM/YYYY' => 02/28/2001 */
        FieldType[FieldType["dateEuro"] = 14] = "dateEuro";
        /** Format (Euro): 'D/M/YY' => 2/28/12 */
        FieldType[FieldType["dateEuroShort"] = 15] = "dateEuroShort";
        /** Format (Euro): 'DD/MM/YYYY HH:mm' => 02/28/2001 13:01 */
        FieldType[FieldType["dateTimeShortEuro"] = 16] = "dateTimeShortEuro";
        /** Format (Euro): 'DD/MM/YYYY HH:mm:ss' => 02/28/2001 13:01:01 */
        FieldType[FieldType["dateTimeEuro"] = 17] = "dateTimeEuro";
        /** Format (Euro): 'DD/MM/YYYY hh:mm:ss a' => 02/28/2001 11:01:01 pm */
        FieldType[FieldType["dateTimeEuroAmPm"] = 18] = "dateTimeEuroAmPm";
        /** Format (Euro): 'DD/MM/YYYY hh:mm:ss A' => 02/28/2001 11:01:01 PM */
        FieldType[FieldType["dateTimeEuroAM_PM"] = 19] = "dateTimeEuroAM_PM";
        /** Format (Euro): 'D/M/YY H:m:s' => 2/28/14 14:1:2 */
        FieldType[FieldType["dateTimeEuroShort"] = 20] = "dateTimeEuroShort";
        /** Format (Euro): 'D/M/YY h:m:s a' => 2/28/14 1:2:10 pm */
        FieldType[FieldType["dateTimeEuroShortAmPm"] = 21] = "dateTimeEuroShortAmPm";
        /** Format (Euro): 'D/M/YY h:m:s A' => 2/28/14 14:1:1 PM */
        FieldType[FieldType["dateTimeEuroShortAM_PM"] = 22] = "dateTimeEuroShortAM_PM";
        /** Format: 'MM/DD/YYYY' => 02/28/2001 */
        FieldType[FieldType["dateUs"] = 23] = "dateUs";
        /** Format: 'M/D/YY' => 2/28/12 */
        FieldType[FieldType["dateUsShort"] = 24] = "dateUsShort";
        /** Format: 'MM/DD/YYYY HH:mm' => 02/28/2001 13:01 */
        FieldType[FieldType["dateTimeShortUs"] = 25] = "dateTimeShortUs";
        /** Format: 'MM/DD/YYYY HH:mm:ss' => 02/28/2001 13:01:01 */
        FieldType[FieldType["dateTimeUs"] = 26] = "dateTimeUs";
        /** Format: 'MM/DD/YYYY hh:mm:ss a' => 02/28/2001 11:01:01 pm */
        FieldType[FieldType["dateTimeUsAmPm"] = 27] = "dateTimeUsAmPm";
        /** Format: 'MM/DD/YYYY hh:mm:ss A' => 02/28/2001 11:01:01 PM */
        FieldType[FieldType["dateTimeUsAM_PM"] = 28] = "dateTimeUsAM_PM";
        /** Format: 'M/D/YY H:m:s' => 2/28/14 14:1:2 */
        FieldType[FieldType["dateTimeUsShort"] = 29] = "dateTimeUsShort";
        /** Format: 'M/D/YY h:m:s a' => 2/28/14 1:2:10 pm */
        FieldType[FieldType["dateTimeUsShortAmPm"] = 30] = "dateTimeUsShortAmPm";
        /** Format: 'M/D/YY h:m:s A' => 2/28/14 14:1:1 PM */
        FieldType[FieldType["dateTimeUsShortAM_PM"] = 31] = "dateTimeUsShortAM_PM";
        /** complex object with various properties */
        FieldType[FieldType["object"] = 32] = "object";
    })(exports.FieldType || (exports.FieldType = {}));


    (function (FileType) {
        FileType["csv"] = "csv";
        FileType["doc"] = "doc";
        FileType["docx"] = "docx";
        FileType["pdf"] = "pdf";
        FileType["txt"] = "txt";
        FileType["xls"] = "xls";
        FileType["xlsx"] = "xlsx";
    })(exports.FileType || (exports.FileType = {}));


    (function (FilterMultiplePassType) {
        FilterMultiplePassType["merge"] = "merge";
        FilterMultiplePassType["chain"] = "chain";
    })(exports.FilterMultiplePassType || (exports.FilterMultiplePassType = {}));


    (function (GridStateType) {
        GridStateType["columns"] = "columns";
        GridStateType["filter"] = "filter";
        GridStateType["pagination"] = "pagination";
        GridStateType["sorter"] = "sorter";
    })(exports.GridStateType || (exports.GridStateType = {}));


    (function (KeyCode) {
        KeyCode[KeyCode["BACKSPACE"] = 8] = "BACKSPACE";
        KeyCode[KeyCode["DELETE"] = 46] = "DELETE";
        KeyCode[KeyCode["DOWN"] = 40] = "DOWN";
        KeyCode[KeyCode["END"] = 35] = "END";
        KeyCode[KeyCode["ENTER"] = 13] = "ENTER";
        KeyCode[KeyCode["ESCAPE"] = 27] = "ESCAPE";
        KeyCode[KeyCode["HOME"] = 36] = "HOME";
        KeyCode[KeyCode["INSERT"] = 45] = "INSERT";
        KeyCode[KeyCode["LEFT"] = 37] = "LEFT";
        KeyCode[KeyCode["PAGE_DOWN"] = 34] = "PAGE_DOWN";
        KeyCode[KeyCode["PAGE_UP"] = 33] = "PAGE_UP";
        KeyCode[KeyCode["RIGHT"] = 39] = "RIGHT";
        KeyCode[KeyCode["TAB"] = 9] = "TAB";
        KeyCode[KeyCode["UP"] = 38] = "UP";
    })(exports.KeyCode || (exports.KeyCode = {}));


    (function (OperatorType) {
        /** value is empty */
        OperatorType["empty"] = "";
        /** value contains x */
        OperatorType["contains"] = "Contains";
        /** value not contains x (inversed of contains) */
        OperatorType["notContains"] = "Not_Contains";
        /** value less than x */
        OperatorType["lessThan"] = "LT";
        /** value less than or equal to x */
        OperatorType["lessThanOrEqual"] = "LE";
        /** value greater than x */
        OperatorType["greaterThan"] = "GT";
        /** value great than or equal to x */
        OperatorType["greaterThanOrEqual"] = "GE";
        /** value not equal to x */
        OperatorType["notEqual"] = "NE";
        /** value equal to x */
        OperatorType["equal"] = "EQ";
        /** String ends with value */
        OperatorType["endsWith"] = "EndsWith";
        /** String starts with value */
        OperatorType["startsWith"] = "StartsWith";
        /** Find an equal match inside a collection */
        OperatorType["in"] = "IN";
        /** Inverse (Not In) of an equal match inside a collection */
        OperatorType["notIn"] = "NOT_IN";
        /**
         * Find a substring contained inside a collection
         * For example, this condition would return True with "IN_CONTAINS":: value='Task2,Task3', collection=['Task2','Task3']
         * This would have returned False with "IN" because 'Task2' does not equal 'Task2,Task3'. However 'Task2' is contained in 'Task2,Task3'
         */
        OperatorType["inContains"] = "IN_CONTAINS";
        /** Inversed (Not In) of substring contained inside a collection */
        OperatorType["notInContains"] = "NOT_IN_CONTAINS";
    })(exports.OperatorType || (exports.OperatorType = {}));


    (function (SortDirection) {
        SortDirection["asc"] = "asc";
        SortDirection["ASC"] = "ASC";
        SortDirection["desc"] = "desc";
        SortDirection["DESC"] = "DESC";
    })(exports.SortDirection || (exports.SortDirection = {}));


    (function (SortDirectionNumber) {
        SortDirectionNumber[SortDirectionNumber["asc"] = 1] = "asc";
        SortDirectionNumber[SortDirectionNumber["desc"] = -1] = "desc";
        SortDirectionNumber[SortDirectionNumber["neutral"] = 0] = "neutral";
    })(exports.SortDirectionNumber || (exports.SortDirectionNumber = {}));

    var AngularUtilService = /** @class */ (function () {
        function AngularUtilService(compFactoryResolver, appRef, injector) {
            this.compFactoryResolver = compFactoryResolver;
            this.appRef = appRef;
            this.injector = injector;
        }
        // ref https://hackernoon.com/angular-pro-tip-how-to-dynamically-create-components-in-body-ba200cc289e6
        AngularUtilService.prototype.createAngularComponent = function (component) {
            // Create a component reference from the component
            var componentRef = this.compFactoryResolver
                .resolveComponentFactory(component)
                .create(this.injector);
            // Attach component to the appRef so that it's inside the ng component tree
            this.appRef.attachView(componentRef.hostView);
            // Get DOM element from component
            var domElem;
            var viewRef = componentRef.hostView;
            if (viewRef && Array.isArray(viewRef.rootNodes) && viewRef.rootNodes[0]) {
                domElem = viewRef.rootNodes[0];
            }
            return { componentRef: componentRef, domElement: domElem };
        };
        // ref https://hackernoon.com/angular-pro-tip-how-to-dynamically-create-components-in-body-ba200cc289e6
        AngularUtilService.prototype.createAngularComponentAppendToDom = function (component, targetElement, clearTargetContent) {
            if (clearTargetContent === void 0) { clearTargetContent = false; }
            var componentOutput = this.createAngularComponent(component);
            // Append DOM element to the HTML element specified
            if (targetElement && targetElement.appendChild) {
                if (clearTargetContent && targetElement.innerHTML) {
                    targetElement.innerHTML = '';
                }
                targetElement.appendChild(componentOutput.domElement);
            }
            else {
                document.body.appendChild(componentOutput.domElement); // when no target provided, we'll simply add it to the HTML Body
            }
            return componentOutput;
        };
        AngularUtilService = __decorate([
            core.Injectable(),
            __metadata("design:paramtypes", [core.ComponentFactoryResolver,
                core.ApplicationRef,
                core.Injector])
        ], AngularUtilService);
        return AngularUtilService;
    }());

    /** Execute the Backend Processes Callback, that could come from an Observable or a Promise callback */
    function executeBackendProcessesCallback(startTime, processResult, backendApi, gridOptions) {
        var endTime = new Date();
        // define what our internal Post Process callback, only available for GraphQL Service for now
        // it will basically refresh the Dataset & Pagination without having the user to create his own PostProcess every time
        if (processResult && backendApi && backendApi.internalPostProcess) {
            backendApi.internalPostProcess(processResult);
        }
        // send the response process to the postProcess callback
        if (backendApi.postProcess) {
            if (processResult instanceof Object) {
                processResult.statistics = {
                    startTime: startTime,
                    endTime: endTime,
                    executionTime: endTime.valueOf() - startTime.valueOf(),
                    itemCount: gridOptions && gridOptions.pagination && gridOptions.pagination.totalItems,
                    totalItemCount: gridOptions && gridOptions.pagination && gridOptions.pagination.totalItems
                };
            }
            backendApi.postProcess(processResult);
        }
    }
    /** On a backend service api error, we will run the "onError" if there is 1 provided or just throw back the error when nothing is provided */
    function onBackendError(e, backendApi) {
        if (backendApi && backendApi.onError) {
            backendApi.onError(e);
        }
        else {
            throw e;
        }
    }

    var moment = moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
    /**
     * Add an item to an array only when the item does not exists, when the item is an object we will be using their "id" to compare
     * @param inputArray
     * @param inputItem
     */
    function addToArrayWhenNotExists(inputArray, inputItem) {
        var arrayRowIndex = -1;
        if (typeof inputItem === 'object' && inputItem.hasOwnProperty('id')) {
            arrayRowIndex = inputArray.findIndex(function (item) { return item.id === inputItem.id; });
        }
        else {
            arrayRowIndex = inputArray.findIndex(function (item) { return item === inputItem; });
        }
        if (arrayRowIndex < 0) {
            inputArray.push(inputItem);
        }
    }
    /**
     * Simple function to which will loop and create as demanded the number of white spaces,
     * this is used in the CSV export
     * @param int nbSpaces: number of white spaces to create
     */
    function addWhiteSpaces(nbSpaces) {
        var result = '';
        for (var i = 0; i < nbSpaces; i++) {
            result += ' ';
        }
        return result;
    }
    /** HTML decode using jQuery with a <div>
     * Create a in-memory div, set it's inner text(which jQuery automatically encodes)
     * then grab the encoded contents back out.  The div never exists on the page.
    */
    function htmlDecode(encodedStr) {
        var parser = DOMParser && new DOMParser;
        if (parser && parser.parseFromString) {
            var dom = parser.parseFromString('<!doctype html><body>' + encodedStr, 'text/html');
            return dom && dom.body && dom.body.textContent;
        }
        else {
            // for some browsers that might not support DOMParser, use jQuery instead
            return $('<div/>').html(encodedStr).text();
        }
    }
    /** HTML encode using jQuery with a <div>
     * Create a in-memory div, set it's inner text(which jQuery automatically encodes)
     * then grab the encoded contents back out.  The div never exists on the page.
    */
    function htmlEncode(inputValue) {
        var entityMap = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            '\'': '&#39;',
        };
        // all symbols::  /[&<>"'`=\/]/g
        return inputValue.replace(/[&<>"']/g, function (s) {
            return entityMap[s];
        });
    }
    /** decode text into html entity
     * @param string text: input text
     * @param string text: output text
     */
    function htmlEntityDecode(input) {
        return input.replace(/&#(\d+);/g, function (match, dec) {
            return String.fromCharCode(dec);
        });
    }
    /** decode text into html entity
     * @param string text: input text
     * @param string text: output text
     */
    function htmlEntityEncode(input) {
        var buf = [];
        for (var i = input.length - 1; i >= 0; i--) {
            buf.unshift(['&#', input[i].charCodeAt(), ';'].join(''));
        }
        return buf.join('');
    }
    /**
     * Compares two arrays of characters to determine if all the items are equal
     * @param a first array
     * @param b second array to compare with a
     * @param [orderMatters=false] flag if the order matters, if not arrays will be sorted before comparison
     * @return boolean true if equal, else false
     */
    function charArraysEqual(a, b, orderMatters) {
        if (orderMatters === void 0) { orderMatters = false; }
        if (!Array.isArray(a) || !Array.isArray(a)) {
            return false;
        }
        if (a.length !== b.length) {
            return false;
        }
        if (!orderMatters) {
            a.sort();
            b.sort();
        }
        for (var i = 0; i < a.length; ++i) {
            if (a[i] !== b[i]) {
                return false;
            }
        }
        return true;
    }
    /**
     * Try casting an input of type Promise | Observable into a Promise type.
     * @param object which could be of type Promise or Observable
     * @param fromServiceName string representing the caller service name and will be used if we throw a casting problem error
     */
    function castToPromise(input, fromServiceName) {
        if (fromServiceName === void 0) { fromServiceName = ''; }
        var promise = input;
        if (input instanceof Promise) {
            // if it's already a Promise then return it
            return input;
        }
        else if (input instanceof rxjs.Observable) {
            promise = input.pipe(operators.first()).toPromise();
        }
        if (!(promise instanceof Promise)) {
            throw new Error("Something went wrong, Angular-Slickgrid " + fromServiceName + " is not able to convert the Observable into a Promise.\n      If you are using Angular HttpClient, you could try converting your http call to a Promise with \".toPromise()\"\n      for example::  this.http.post('graphql', { query: graphqlQuery }).toPromise()\n      ");
        }
        return promise;
    }
    /**
     * Uses the logic function to find an item in an array or returns the default
     * value provided (empty object by default)
     * @param any[] array the array to filter
     * @param function logic the logic to find the item
     * @param any [defaultVal={}] the default value to return
     * @return object the found object or default value
     */
    function findOrDefault(array, logic, defaultVal) {
        if (defaultVal === void 0) { defaultVal = {}; }
        return array.find(logic) || defaultVal;
    }
    /**
      * Take a number (or a string) and display it as a formatted decimal string with defined minimum and maximum decimals
      * @param input
      * @param minDecimal
      * @param maxDecimal
      */
    function decimalFormatted(input, minDecimal, maxDecimal) {
        if (isNaN(+input)) {
            return input;
        }
        var minDec = (minDecimal === undefined) ? 2 : minDecimal;
        var maxDec = (maxDecimal === undefined) ? 2 : maxDecimal;
        var amount = String(Math.round(+input * Math.pow(10, maxDec)) / Math.pow(10, maxDec));
        if ((amount.indexOf('.') < 0) && (minDec > 0)) {
            amount += '.';
        }
        while ((amount.length - amount.indexOf('.')) <= minDec) {
            amount += '0';
        }
        return amount;
    }
    function formatNumber(input, minDecimal, maxDecimal, displayNegativeNumberWithParentheses, symbolPrefix, symbolSuffix) {
        if (symbolPrefix === void 0) { symbolPrefix = ''; }
        if (symbolSuffix === void 0) { symbolSuffix = ''; }
        if (isNaN(+input)) {
            return input;
        }
        var calculatedValue = ((Math.round(parseFloat(input) * 1000000) / 1000000));
        if (calculatedValue < 0) {
            var absValue = Math.abs(calculatedValue);
            if (displayNegativeNumberWithParentheses) {
                if (!isNaN(minDecimal) || !isNaN(maxDecimal)) {
                    return "(" + symbolPrefix + decimalFormatted(absValue, minDecimal, maxDecimal) + symbolSuffix + ")";
                }
                return "(" + symbolPrefix + absValue + symbolSuffix + ")";
            }
            else {
                if (!isNaN(minDecimal) || !isNaN(maxDecimal)) {
                    return "-" + symbolPrefix + decimalFormatted(absValue, minDecimal, maxDecimal) + symbolSuffix;
                }
                return "-" + symbolPrefix + absValue + symbolSuffix;
            }
        }
        else {
            if (!isNaN(minDecimal) || !isNaN(maxDecimal)) {
                return "" + symbolPrefix + decimalFormatted(input, minDecimal, maxDecimal) + symbolSuffix;
            }
            return "" + symbolPrefix + input + symbolSuffix;
        }
    }
    /** From a dot (.) notation find and return a property within an object given a path */
    function getDescendantProperty(obj, path) {
        return path.split('.').reduce(function (acc, part) { return acc && acc[part]; }, obj);
    }
    /** Get the browser's scrollbar width, this is different to each browser */
    function getScrollBarWidth() {
        var $outer = $('<div>').css({ visibility: 'hidden', width: 100, overflow: 'scroll' }).appendTo('body');
        var widthWithScroll = $('<div>').css({ width: '100%' }).appendTo($outer).outerWidth();
        $outer.remove();
        return Math.ceil(100 - widthWithScroll);
    }
    /**
     * From a Date FieldType, return it's equivalent moment.js format
     * refer to moment.js for the format standard used: https://momentjs.com/docs/#/parsing/string-format/
     * @param fieldType
     */
    function mapMomentDateFormatWithFieldType(fieldType) {
        var map;
        switch (fieldType) {
            case exports.FieldType.dateTime:
            case exports.FieldType.dateTimeIso:
                map = 'YYYY-MM-DD HH:mm:ss';
                break;
            case exports.FieldType.dateTimeShortIso:
                map = 'YYYY-MM-DD HH:mm';
                break;
            case exports.FieldType.dateTimeIsoAmPm:
                map = 'YYYY-MM-DD hh:mm:ss a';
                break;
            case exports.FieldType.dateTimeIsoAM_PM:
                map = 'YYYY-MM-DD hh:mm:ss A';
                break;
            // all Euro Formats (date/month/year)
            case exports.FieldType.dateEuro:
                map = 'DD/MM/YYYY';
                break;
            case exports.FieldType.dateEuroShort:
                map = 'D/M/YY';
                break;
            case exports.FieldType.dateTimeEuro:
                map = 'DD/MM/YYYY HH:mm:ss';
                break;
            case exports.FieldType.dateTimeShortEuro:
                map = 'DD/MM/YYYY HH:mm';
                break;
            case exports.FieldType.dateTimeEuroAmPm:
                map = 'DD/MM/YYYY hh:mm:ss a';
                break;
            case exports.FieldType.dateTimeEuroAM_PM:
                map = 'DD/MM/YYYY hh:mm:ss A';
                break;
            case exports.FieldType.dateTimeEuroShort:
                map = 'D/M/YY H:m:s';
                break;
            case exports.FieldType.dateTimeEuroShortAmPm:
                map = 'D/M/YY h:m:s a';
                break;
            // all US Formats (month/date/year)
            case exports.FieldType.dateUs:
                map = 'MM/DD/YYYY';
                break;
            case exports.FieldType.dateUsShort:
                map = 'M/D/YY';
                break;
            case exports.FieldType.dateTimeUs:
                map = 'MM/DD/YYYY HH:mm:ss';
                break;
            case exports.FieldType.dateTimeShortUs:
                map = 'MM/DD/YYYY HH:mm';
                break;
            case exports.FieldType.dateTimeUsAmPm:
                map = 'MM/DD/YYYY hh:mm:ss a';
                break;
            case exports.FieldType.dateTimeUsAM_PM:
                map = 'MM/DD/YYYY hh:mm:ss A';
                break;
            case exports.FieldType.dateTimeUsShort:
                map = 'M/D/YY H:m:s';
                break;
            case exports.FieldType.dateTimeUsShortAmPm:
                map = 'M/D/YY h:m:s a';
                break;
            case exports.FieldType.dateUtc:
                map = 'YYYY-MM-DDTHH:mm:ss.SSSZ';
                break;
            case exports.FieldType.date:
            case exports.FieldType.dateIso:
            default:
                map = 'YYYY-MM-DD';
                break;
        }
        return map;
    }
    /**
     * From a Date FieldType, return it's equivalent Flatpickr format
     * refer to Flatpickr for the format standard used: https://chmln.github.io/flatpickr/formatting/#date-formatting-tokens
     * also note that they seem very similar to PHP format (except for am/pm): http://php.net/manual/en/function.date.php
     * @param fieldType
     */
    function mapFlatpickrDateFormatWithFieldType(fieldType) {
        /*
          d: Day of the month, 2 digits with leading zeros	01 to 31
          D: A textual representation of a day	Mon through Sun
          l: (lowercase 'L')	A full textual representation of the day of the week	Sunday through Saturday
          j: Day of the month without leading zeros	1 to 31
          J: Day of the month without leading zeros and ordinal suffix	1st, 2nd, to 31st
          w: Numeric representation of the day of the week	0 (for Sunday) through 6 (for Saturday)
          F: A full textual representation of a month	January through December
          m: Numeric representation of a month, with leading zero	01 through 12
          n: Numeric representation of a month, without leading zeros	1 through 12
          M: A short textual representation of a month	Jan through Dec
          U: The number of seconds since the Unix Epoch	1413704993
          y: A two digit representation of a year	99 or 03
          Y: A full numeric representation of a year, 4 digits	1999 or 2003
          H: Hours (24 hours)	00 to 23
          h: Hours	1 to 12
          i: Minutes	00 to 59
          S: Seconds, 2 digits	00 to 59
          s: Seconds	0, 1 to 59
          K: AM/PM	AM or PM
        */
        var map;
        switch (fieldType) {
            case exports.FieldType.dateTime:
            case exports.FieldType.dateTimeIso:
                map = 'Y-m-d H:i:S';
                break;
            case exports.FieldType.dateTimeShortIso:
                map = 'Y-m-d H:i';
                break;
            case exports.FieldType.dateTimeIsoAmPm:
            case exports.FieldType.dateTimeIsoAM_PM:
                map = 'Y-m-d h:i:S K'; // there is no lowercase in Flatpickr :(
                break;
            // all Euro Formats (date/month/year)
            case exports.FieldType.dateEuro:
                map = 'd/m/Y';
                break;
            case exports.FieldType.dateEuroShort:
                map = 'd/m/y';
                break;
            case exports.FieldType.dateTimeEuro:
                map = 'd/m/Y H:i:S';
                break;
            case exports.FieldType.dateTimeShortEuro:
                map = 'd/m/y H:i';
                break;
            case exports.FieldType.dateTimeEuroAmPm:
                map = 'd/m/Y h:i:S K'; // there is no lowercase in Flatpickr :(
                break;
            case exports.FieldType.dateTimeEuroAM_PM:
                map = 'd/m/Y h:i:s K';
                break;
            case exports.FieldType.dateTimeEuroShort:
                map = 'd/m/y H:i:s';
                break;
            case exports.FieldType.dateTimeEuroShortAmPm:
                map = 'd/m/y h:i:s K'; // there is no lowercase in Flatpickr :(
                break;
            // all US Formats (month/date/year)
            case exports.FieldType.dateUs:
                map = 'm/d/Y';
                break;
            case exports.FieldType.dateUsShort:
                map = 'm/d/y';
                break;
            case exports.FieldType.dateTimeUs:
                map = 'm/d/Y H:i:S';
                break;
            case exports.FieldType.dateTimeShortUs:
                map = 'm/d/y H:i';
                break;
            case exports.FieldType.dateTimeUsAmPm:
                map = 'm/d/Y h:i:S K'; // there is no lowercase in Flatpickr :(
                break;
            case exports.FieldType.dateTimeUsAM_PM:
                map = 'm/d/Y h:i:s K';
                break;
            case exports.FieldType.dateTimeUsShort:
                map = 'm/d/y H:i:s';
                break;
            case exports.FieldType.dateTimeUsShortAmPm:
                map = 'm/d/y h:i:s K'; // there is no lowercase in Flatpickr :(
                break;
            case exports.FieldType.dateUtc:
                map = 'Z';
                break;
            case exports.FieldType.date:
            case exports.FieldType.dateIso:
            default:
                map = 'Y-m-d';
                break;
        }
        return map;
    }
    /**
     * Mapper for query operators (ex.: <= is "le", > is "gt")
     * @param string operator
     * @returns string map
     */
    function mapOperatorType(operator) {
        var map;
        switch (operator) {
            case '<':
                map = exports.OperatorType.lessThan;
                break;
            case '<=':
                map = exports.OperatorType.lessThanOrEqual;
                break;
            case '>':
                map = exports.OperatorType.greaterThan;
                break;
            case '>=':
                map = exports.OperatorType.greaterThanOrEqual;
                break;
            case '<>':
            case '!=':
            case 'neq':
            case 'NEQ':
                map = exports.OperatorType.notEqual;
                break;
            case '*':
            case '.*':
            case 'startsWith':
                map = exports.OperatorType.startsWith;
                break;
            case '*.':
            case 'endsWith':
                map = exports.OperatorType.endsWith;
                break;
            case '=':
            case '==':
            case 'eq':
            case 'EQ':
                map = exports.OperatorType.equal;
                break;
            case 'in':
            case 'IN':
                map = exports.OperatorType.in;
                break;
            case 'notIn':
            case 'NIN':
            case 'NOT_IN':
                map = exports.OperatorType.notIn;
                break;
            default:
                map = exports.OperatorType.contains;
                break;
        }
        return map;
    }
    /**
     * Mapper for query operator by a Filter Type
     * For example a multiple-select typically uses 'IN' operator
     * @param operator
     * @returns string map
     */
    function mapOperatorByFieldType(fieldType) {
        var map;
        switch (fieldType) {
            case exports.FieldType.string:
            case exports.FieldType.unknown:
                map = exports.OperatorType.contains;
                break;
            case exports.FieldType.float:
            case exports.FieldType.number:
            case exports.FieldType.date:
            case exports.FieldType.dateIso:
            case exports.FieldType.date:
            case exports.FieldType.dateUtc:
            case exports.FieldType.dateTime:
            case exports.FieldType.dateTimeIso:
            case exports.FieldType.dateTimeIsoAmPm:
            case exports.FieldType.dateTimeIsoAM_PM:
            case exports.FieldType.dateEuro:
            case exports.FieldType.dateEuroShort:
            case exports.FieldType.dateTimeEuro:
            case exports.FieldType.dateTimeEuroAmPm:
            case exports.FieldType.dateTimeEuroAM_PM:
            case exports.FieldType.dateTimeEuroShort:
            case exports.FieldType.dateTimeEuroShortAmPm:
            case exports.FieldType.dateTimeEuroShortAM_PM:
            case exports.FieldType.dateUs:
            case exports.FieldType.dateUsShort:
            case exports.FieldType.dateTimeUs:
            case exports.FieldType.dateTimeUsAmPm:
            case exports.FieldType.dateTimeUsAM_PM:
            case exports.FieldType.dateTimeUsShort:
            case exports.FieldType.dateTimeUsShortAmPm:
            case exports.FieldType.dateTimeUsShortAM_PM:
            default:
                map = exports.OperatorType.equal;
                break;
        }
        return map;
    }
    /** Parse any input (bool, number, string) and return a boolean or False when not possible */
    function parseBoolean(input) {
        return /(true|1)/i.test(input + '');
    }
    /**
     * Parse a date passed as a string (Date only, without time) and return a Date object (if valid)
     * @param inputDateString
     * @returns string date formatted
     */
    function parseUtcDate(inputDateString, useUtc) {
        var date = null;
        if (/^[0-9\-\/]*$/.test(inputDateString)) {
            // get the UTC datetime with moment.js but we need to decode the value so that it's valid text
            var dateString = decodeURIComponent(inputDateString);
            var dateMoment = moment(new Date(dateString));
            if (dateMoment.isValid() && dateMoment.year().toString().length === 4) {
                date = (useUtc) ? dateMoment.utc().format() : dateMoment.format();
            }
        }
        return date;
    }
    /**
     * Sanitize, return only the text without HTML tags
     * @input htmlString
     * @return text
     */
    function sanitizeHtmlToText(htmlString) {
        var temp = document.createElement('div');
        temp.innerHTML = htmlString;
        return temp.textContent || temp.innerText || '';
    }
    /**
     * Title case (or capitalize) first char of a string
     * Optionall title case the complete sentence (upper case first char of each word while changing everything else to lower case)
     * @param inputStr
     * @returns string
     */
    function titleCase(inputStr, caseEveryWords) {
        if (caseEveryWords === void 0) { caseEveryWords = false; }
        if (typeof inputStr === 'string') {
            if (caseEveryWords) {
                return inputStr.replace(/\w\S*/g, function (outputStr) {
                    return outputStr.charAt(0).toUpperCase() + outputStr.substr(1).toLowerCase();
                });
            }
            return inputStr.charAt(0).toUpperCase() + inputStr.slice(1);
        }
        return inputStr;
    }
    /**
     * Converts a string to camel case (camelCase)
     * @param inputStr the string to convert
     * @return the string in camel case
     */
    function toCamelCase(inputStr) {
        if (typeof inputStr === 'string') {
            return inputStr.replace(/(?:^\w|[A-Z]|\b\w|[\s+\-_\/])/g, function (match, offset) {
                // remove white space or hypens or underscores
                if (/[\s+\-_\/]/.test(match)) {
                    return '';
                }
                return offset === 0 ? match.toLowerCase() : match.toUpperCase();
            });
        }
        return inputStr;
    }
    /**
     * Converts a string to kebab (hypen) case
     * @param str the string to convert
     * @return the string in kebab case
     */
    function toKebabCase(inputStr) {
        if (typeof inputStr === 'string') {
            return toCamelCase(inputStr).replace(/([A-Z])/g, '-$1').toLowerCase();
        }
        return inputStr;
    }
    /**
     * Converts a string from camelCase to snake_case (underscore) case
     * @param str the string to convert
     * @return the string in kebab case
     */
    function toSnakeCase(inputStr) {
        if (typeof inputStr === 'string') {
            return toCamelCase(inputStr).replace(/([A-Z])/g, '_$1').toLowerCase();
        }
        return inputStr;
    }
    /**
     * Takes an input array and makes sure the array has unique values by removing duplicates
     * @param array input with possible duplicates
     * @param objectProperty optionally provide an object property to compare (example: 'id')
     * @return array output without duplicates
     */
    function uniqueArray(arr) {
        if (Array.isArray(arr) && arr.length > 0) {
            return arr.filter(function (item, index) {
                return arr.indexOf(item) >= index;
            });
        }
        return arr;
    }
    /**
     * Takes an input array of objects and makes sure the array has unique object values by removing duplicates
     * it will loop through the array using a property name (or "id" when is not provided) to compare uniqueness
     * @param array input with possible duplicates
     * @param propertyName defaults to "id"
     * @return array output without duplicates
     */
    function uniqueObjectArray(arr, propertyName) {
        if (propertyName === void 0) { propertyName = 'id'; }
        var e_1, _a;
        if (Array.isArray(arr) && arr.length > 0) {
            var result = [];
            var map = new Map();
            try {
                for (var arr_1 = __values(arr), arr_1_1 = arr_1.next(); !arr_1_1.done; arr_1_1 = arr_1.next()) {
                    var item = arr_1_1.value;
                    if (!map.has(item[propertyName])) {
                        map.set(item[propertyName], true); // set any value to Map
                        result.push({
                            id: item[propertyName],
                            name: item.name
                        });
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (arr_1_1 && !arr_1_1.done && (_a = arr_1.return)) _a.call(arr_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return result;
        }
        return arr;
    }
    /**
     * Unsubscribe all Observables Subscriptions
     * It will return an empty array if it all went well
     * @param subscriptions
     */
    function unsubscribeAllObservables(subscriptions) {
        if (Array.isArray(subscriptions)) {
            subscriptions.forEach(function (subscription) {
                if (subscription && subscription.unsubscribe) {
                    subscription.unsubscribe();
                }
            });
            subscriptions = [];
        }
        return subscriptions;
    }

    var moment$1 = moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
    function compareDates(value1, value2, format, sortDirection, strict) {
        var diff = 0;
        if (value1 === null || value1 === '' || !moment$1(value1, format, strict).isValid()) {
            diff = -1;
        }
        else if (value2 === null || value2 === '' || !moment$1(value2, format, strict).isValid()) {
            diff = 1;
        }
        else {
            var date1 = moment$1(value1, format, strict);
            var date2 = moment$1(value2, format, strict);
            diff = parseInt(date1.format('X'), 10) - parseInt(date2.format('X'), 10);
        }
        return sortDirection * (diff === 0 ? 0 : (diff > 0 ? 1 : -1));
    }

    var FORMAT = mapMomentDateFormatWithFieldType(exports.FieldType.dateEuroShort);
    var dateEuroShortSorter = function (value1, value2, sortDirection) {
        return compareDates(value1, value2, FORMAT, sortDirection, true);
    };

    var FORMAT$1 = mapMomentDateFormatWithFieldType(exports.FieldType.dateEuro);
    var dateEuroSorter = function (value1, value2, sortDirection) {
        return compareDates(value1, value2, FORMAT$1, sortDirection, true);
    };

    var FORMAT$2 = mapMomentDateFormatWithFieldType(exports.FieldType.dateIso);
    var dateIsoSorter = function (value1, value2, sortDirection) {
        return compareDates(value1, value2, FORMAT$2, sortDirection, true);
    };

    var moment$2 = moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
    var dateSorter = function (value1, value2, sortDirection) {
        return compareDates(value1, value2, moment$2.ISO_8601, sortDirection);
    };

    var FORMAT$3 = mapMomentDateFormatWithFieldType(exports.FieldType.dateUsShort);
    var dateUsShortSorter = function (value1, value2, sortDirection) {
        return compareDates(value1, value2, FORMAT$3, sortDirection, true);
    };

    var FORMAT$4 = mapMomentDateFormatWithFieldType(exports.FieldType.dateUs);
    var dateUsSorter = function (value1, value2, sortDirection) {
        return compareDates(value1, value2, FORMAT$4, sortDirection, true);
    };

    var numericSorter = function (value1, value2, sortDirection) {
        var x = (isNaN(value1) || value1 === '' || value1 === null) ? -99e+10 : parseFloat(value1);
        var y = (isNaN(value2) || value2 === '' || value2 === null) ? -99e+10 : parseFloat(value2);
        return sortDirection * (x === y ? 0 : (x > y ? 1 : -1));
    };

    var objectStringSorter = function (value1, value2, sortDirection, sortColumn) {
        if (!sortColumn || !sortColumn.dataKey) {
            throw new Error('Sorting a "FieldType.object" requires you to provide the "dataKey" (object property name) of the object so that we can use it to sort correctly');
        }
        var stringValue1 = value1.hasOwnProperty(sortColumn.dataKey) ? value1[sortColumn.dataKey] : value1;
        var stringValue2 = value2.hasOwnProperty(sortColumn.dataKey) ? value2[sortColumn.dataKey] : value2;
        if (sortDirection === undefined || sortDirection === null) {
            sortDirection = exports.SortDirectionNumber.neutral;
        }
        var position = 0;
        if (typeof value1 !== 'object') {
            position = -99e+10;
        }
        else if (typeof value2 !== 'object') {
            position = 99e+10;
        }
        else if (!stringValue1) {
            position = -1;
        }
        else if (!stringValue2) {
            position = 1;
        }
        else if (stringValue1 === stringValue2) {
            position = 0;
        }
        else if (sortDirection) {
            position = stringValue1 < stringValue2 ? -1 : 1;
        }
        else {
            position = stringValue1 < stringValue2 ? 1 : -1;
        }
        return sortDirection * position;
    };

    var stringSorter = function (value1, value2, sortDirection) {
        if (sortDirection === undefined || sortDirection === null) {
            sortDirection = exports.SortDirectionNumber.neutral;
        }
        var position = 0;
        if (value1 === null) {
            position = -1;
        }
        else if (value2 === null) {
            position = 1;
        }
        else if (value1 === value2) {
            position = 0;
        }
        else if (sortDirection) {
            position = value1 < value2 ? -1 : 1;
        }
        else {
            position = value1 < value2 ? 1 : -1;
        }
        return sortDirection * position;
    };

    var Sorters = {
        /** Sorter method to sort values by Date object type (uses Moment.js ISO_8601 standard format, optionally include time) */
        date: dateSorter,
        /**
         * Sorter method to sort values by Date formatted as ISO date (excluding time),
         * If you wish to optionally include time simply use the "Sorters.date" which work with/without time
         */
        dateIso: dateIsoSorter,
        /** Sorter method to sort values by Date formatted as Euro date (dd/mm/yyyy) */
        dateEuro: dateEuroSorter,
        /** Sorter method to sort values by Date formatted as Euro short date (d/m/yy) */
        dateEuroShort: dateEuroShortSorter,
        /** Sorter method to sort values by Date formatted as US date (mm/dd/yyyy) */
        dateUs: dateUsSorter,
        /** Sorter method to sort values by Date formatted as US short date (m/d/yy) */
        dateUsShort: dateUsShortSorter,
        /** Sorter method to sort values as numeric fields */
        numeric: numericSorter,
        /**
         * Sorter method to sort object values with a "dataKey" provided in your column definition, it's data content must be of type string
         * Example:
         * columnDef = { id='user', field: 'user', ..., dataKey: 'firstName', sorter: Sorters.objectString }
         * collection = [{ firstName: 'John', lastName: 'Doe' }, { firstName: 'Bob', lastName: 'Cash' }]
         */
        objectString: objectStringSorter,
        /** Sorter method to sort values as regular strings */
        string: stringSorter
    };

    function sortByFieldType(value1, value2, fieldType, sortDirection, sortColumn) {
        var sortResult = 0;
        switch (fieldType) {
            case exports.FieldType.number:
                sortResult = Sorters.numeric(value1, value2, sortDirection);
                break;
            case exports.FieldType.date:
                sortResult = Sorters.date(value1, value2, sortDirection);
                break;
            case exports.FieldType.dateIso:
                sortResult = Sorters.dateIso(value1, value2, sortDirection);
                break;
            // all Euro Formats (date/month/year)
            case exports.FieldType.dateEuro:
                sortResult = Sorters.dateEuro(value1, value2, sortDirection);
                break;
            case exports.FieldType.dateEuroShort:
                sortResult = Sorters.dateEuroShort(value1, value2, sortDirection);
                break;
            // all US Formats (month/date/year)
            case exports.FieldType.dateUs:
                sortResult = Sorters.dateUs(value1, value2, sortDirection);
                break;
            case exports.FieldType.dateUsShort:
                sortResult = Sorters.dateUsShort(value1, value2, sortDirection);
                break;
            case exports.FieldType.object:
                sortResult = Sorters.objectString(value1, value2, sortDirection, sortColumn);
                break;
            default:
                sortResult = Sorters.string(value1, value2, sortDirection);
                break;
        }
        return sortResult;
    }

    var CollectionService = /** @class */ (function () {
        function CollectionService(translate) {
            this.translate = translate;
        }
        /**
         * Filter 1 or more items from a collection
         * @param collection
         * @param filterByOptions
         */
        CollectionService.prototype.filterCollection = function (collection, filterByOptions, filterResultBy) {
            if (filterResultBy === void 0) { filterResultBy = exports.FilterMultiplePassType.chain; }
            var e_1, _a;
            var filteredCollection = [];
            // when it's array, we will use the new filtered collection after every pass
            // basically if input collection has 10 items on 1st pass and 1 item is filtered out, then on 2nd pass the input collection will be 9 items
            if (Array.isArray(filterByOptions)) {
                filteredCollection = (filterResultBy === exports.FilterMultiplePassType.merge) ? [] : collection;
                try {
                    for (var filterByOptions_1 = __values(filterByOptions), filterByOptions_1_1 = filterByOptions_1.next(); !filterByOptions_1_1.done; filterByOptions_1_1 = filterByOptions_1.next()) {
                        var filter = filterByOptions_1_1.value;
                        if (filterResultBy === exports.FilterMultiplePassType.merge) {
                            var filteredPass = this.singleFilterCollection(collection, filter);
                            filteredCollection = uniqueArray(__spread(filteredCollection, filteredPass));
                        }
                        else {
                            filteredCollection = this.singleFilterCollection(filteredCollection, filter);
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (filterByOptions_1_1 && !filterByOptions_1_1.done && (_a = filterByOptions_1.return)) _a.call(filterByOptions_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            else {
                filteredCollection = this.singleFilterCollection(collection, filterByOptions);
            }
            return filteredCollection;
        };
        /**
         * Filter an item from a collection
         * @param collection
         * @param filterBy
         */
        CollectionService.prototype.singleFilterCollection = function (collection, filterBy) {
            var filteredCollection = [];
            if (filterBy && filterBy.property) {
                var property_1 = filterBy.property;
                var operator = filterBy.operator || exports.OperatorType.equal;
                // just check for undefined since the filter value could be null, 0, '', false etc
                var value_1 = typeof filterBy.value === 'undefined' ? '' : filterBy.value;
                switch (operator) {
                    case exports.OperatorType.equal:
                        filteredCollection = collection.filter(function (item) { return item[property_1] === value_1; });
                        break;
                    case exports.OperatorType.contains:
                        filteredCollection = collection.filter(function (item) { return item[property_1].toString().indexOf(value_1.toString()) !== -1; });
                        break;
                    case exports.OperatorType.notContains:
                        filteredCollection = collection.filter(function (item) { return item[property_1].toString().indexOf(value_1.toString()) === -1; });
                        break;
                    case exports.OperatorType.notEqual:
                    default:
                        filteredCollection = collection.filter(function (item) { return item[property_1] !== value_1; });
                }
            }
            return filteredCollection;
        };
        /**
         * Sort 1 or more items in a collection
         * @param column definition
         * @param collection
         * @param sortByOptions
         * @param enableTranslateLabel
         */
        CollectionService.prototype.sortCollection = function (columnDef, collection, sortByOptions, enableTranslateLabel) {
            var _this = this;
            var sortedCollection = [];
            if (sortByOptions) {
                if (Array.isArray(sortByOptions)) {
                    // multi-sort
                    sortedCollection = collection.sort(function (dataRow1, dataRow2) {
                        for (var i = 0, l = sortByOptions.length; i < l; i++) {
                            var sortBy = sortByOptions[i];
                            if (sortBy && sortBy.property) {
                                var sortDirection = sortBy.sortDesc ? exports.SortDirectionNumber.desc : exports.SortDirectionNumber.asc;
                                var propertyName = sortBy.property;
                                var fieldType = sortBy.fieldType || exports.FieldType.string;
                                var value1 = (enableTranslateLabel) ? _this.translate.instant(dataRow1[propertyName] || ' ') : dataRow1[propertyName];
                                var value2 = (enableTranslateLabel) ? _this.translate.instant(dataRow2[propertyName] || ' ') : dataRow2[propertyName];
                                var sortResult = sortByFieldType(value1, value2, fieldType, sortDirection, columnDef);
                                if (sortResult !== exports.SortDirectionNumber.neutral) {
                                    return sortResult;
                                }
                            }
                        }
                        return exports.SortDirectionNumber.neutral;
                    });
                }
                else if (sortByOptions && sortByOptions.property) {
                    // single sort
                    var propertyName_1 = sortByOptions.property;
                    var sortDirection_1 = sortByOptions.sortDesc ? exports.SortDirectionNumber.desc : exports.SortDirectionNumber.asc;
                    var fieldType_1 = sortByOptions.fieldType || exports.FieldType.string;
                    sortedCollection = collection.sort(function (dataRow1, dataRow2) {
                        var value1 = (enableTranslateLabel) ? _this.translate.instant(dataRow1[propertyName_1] || ' ') : dataRow1[propertyName_1];
                        var value2 = (enableTranslateLabel) ? _this.translate.instant(dataRow2[propertyName_1] || ' ') : dataRow2[propertyName_1];
                        var sortResult = sortByFieldType(value1, value2, fieldType_1, sortDirection_1, columnDef);
                        if (sortResult !== exports.SortDirectionNumber.neutral) {
                            return sortResult;
                        }
                        return exports.SortDirectionNumber.neutral;
                    });
                }
                else if (sortByOptions && !sortByOptions.property) {
                    var sortDirection_2 = sortByOptions.sortDesc ? exports.SortDirectionNumber.desc : exports.SortDirectionNumber.asc;
                    var fieldType_2 = sortByOptions.fieldType || exports.FieldType.string;
                    sortedCollection = collection.sort(function (dataRow1, dataRow2) {
                        var value1 = (enableTranslateLabel) ? _this.translate.instant(dataRow1 || ' ') : dataRow1;
                        var value2 = (enableTranslateLabel) ? _this.translate.instant(dataRow2 || ' ') : dataRow2;
                        var sortResult = sortByFieldType(value1, value2, fieldType_2, sortDirection_2, columnDef);
                        if (sortResult !== exports.SortDirectionNumber.neutral) {
                            return sortResult;
                        }
                        return exports.SortDirectionNumber.neutral;
                    });
                }
            }
            return sortedCollection;
        };
        CollectionService = __decorate([
            core.Injectable(),
            __metadata("design:paramtypes", [core$1.TranslateService])
        ], CollectionService);
        return CollectionService;
    }());

    var ExportService = /** @class */ (function () {
        function ExportService(translate) {
            this.translate = translate;
            this._lineCarriageReturn = '\n';
            this._hasGroupedItems = false;
            this.onGridBeforeExportToFile = new rxjs.Subject();
            this.onGridAfterExportToFile = new rxjs.Subject();
        }
        Object.defineProperty(ExportService.prototype, "datasetIdName", {
            get: function () {
                return this._gridOptions && this._gridOptions.datasetIdPropertyName || 'id';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ExportService.prototype, "_gridOptions", {
            /** Getter for the Grid Options pulled through the Grid Object */
            get: function () {
                return (this._grid && this._grid.getOptions) ? this._grid.getOptions() : {};
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Initialize the Export Service
         * @param grid
         * @param gridOptions
         * @param dataView
         */
        ExportService.prototype.init = function (grid, dataView) {
            this._grid = grid;
            this._dataView = dataView;
        };
        /**
         * Function to export the Grid result to an Excel CSV format using javascript for it to produce the CSV file.
         * This is a WYSIWYG export to file output (What You See is What You Get)
         *
         * NOTES: The column position needs to match perfectly the JSON Object position because of the way we are pulling the data,
         * which means that if any column(s) got moved in the UI, it has to be reflected in the JSON array output as well
         *
         * Example: exportToFile({ format: FileType.csv, delimiter: DelimiterType.comma })
         */
        ExportService.prototype.exportToFile = function (options) {
            var _this = this;
            this.onGridBeforeExportToFile.next(true);
            this._exportOptions = $.extend(true, {}, this._gridOptions.exportOptions, options);
            // get the CSV output from the grid data
            var dataOutput = this.getDataOutput();
            // trigger a download file
            // wrap it into a setTimeout so that the EventAggregator has enough time to start a pre-process like showing a spinner
            setTimeout(function () {
                var downloadOptions = {
                    filename: _this._exportOptions.filename + "." + _this._exportOptions.format,
                    csvContent: dataOutput,
                    format: _this._exportOptions.format,
                    useUtf8WithBom: _this._exportOptions.useUtf8WithBom
                };
                _this.startDownloadFile(downloadOptions);
                _this.onGridAfterExportToFile.next({ options: downloadOptions });
            }, 0);
        };
        // -----------------------
        // Private functions
        // -----------------------
        ExportService.prototype.getDataOutput = function () {
            var _this = this;
            var columns = this._grid.getColumns() || [];
            var delimiter = this._exportOptions.delimiter || '';
            var format = this._exportOptions.format || '';
            var groupByColumnHeader = this._exportOptions.groupingColumnHeaderTitle || this.translate.instant('GROUP_BY');
            // a CSV needs double quotes wrapper, the other types do not need any wrapper
            this._exportQuoteWrapper = (format === exports.FileType.csv) ? '"' : '';
            // data variable which will hold all the fields data of a row
            var outputDataString = '';
            // get grouped column titles and if found, we will add a "Group by" column at the first column index
            var grouping = this._dataView.getGrouping();
            if (grouping && Array.isArray(grouping) && grouping.length > 0) {
                this._hasGroupedItems = true;
                outputDataString += "" + groupByColumnHeader + delimiter;
            }
            else {
                this._hasGroupedItems = false;
            }
            // get all column headers
            this._columnHeaders = this.getColumnHeaders(columns) || [];
            if (this._columnHeaders && Array.isArray(this._columnHeaders) && this._columnHeaders.length > 0) {
                // add the header row + add a new line at the end of the row
                var outputHeaderTitles = this._columnHeaders.map(function (header) {
                    return _this._exportQuoteWrapper + header.title + _this._exportQuoteWrapper;
                });
                outputDataString += (outputHeaderTitles.join(delimiter) + this._lineCarriageReturn);
            }
            // Populate the rest of the Grid Data
            outputDataString += this.getAllGridRowData(columns, this._lineCarriageReturn);
            return outputDataString;
        };
        /**
         * Get all the grid row data and return that as an output string
         */
        ExportService.prototype.getAllGridRowData = function (columns, lineCarriageReturn) {
            var outputDataStrings = [];
            var lineCount = this._dataView.getLength();
            // loop through all the grid rows of data
            for (var rowNumber = 0; rowNumber < lineCount; rowNumber++) {
                var itemObj = this._dataView.getItem(rowNumber);
                if (itemObj != null) {
                    // Normal row (not grouped by anything) would have an ID which was predefined in the Grid Columns definition
                    if (itemObj[this.datasetIdName] != null) {
                        // get regular row item data
                        outputDataStrings.push(this.readRegularRowData(columns, rowNumber, itemObj));
                    }
                    else if (this._hasGroupedItems && itemObj.__groupTotals === undefined) {
                        // get the group row
                        outputDataStrings.push(this.readGroupedTitleRow(itemObj));
                    }
                    else if (itemObj.__groupTotals) {
                        // else if the row is a Group By and we have agreggators, then a property of '__groupTotals' would exist under that object
                        outputDataStrings.push(this.readGroupedTotalRow(columns, itemObj));
                    }
                }
            }
            return outputDataStrings.join(this._lineCarriageReturn);
        };
        /**
         * Get all header titles and their keys, translate the title when required.
         * @param columns of the grid
         */
        ExportService.prototype.getColumnHeaders = function (columns) {
            var _this = this;
            if (!columns || !Array.isArray(columns) || columns.length === 0) {
                return null;
            }
            var columnHeaders = [];
            // Populate the Column Header, pull the name defined
            columns.forEach(function (columnDef) {
                var fieldName = (columnDef.headerKey) ? _this.translate.instant(columnDef.headerKey) : columnDef.name;
                var skippedField = columnDef.excludeFromExport || false;
                // if column width is 0 then it's not evaluated since that field is considered hidden should not be part of the export
                if ((columnDef.width === undefined || columnDef.width > 0) && !skippedField) {
                    columnHeaders.push({
                        key: columnDef.field || columnDef.id,
                        title: fieldName
                    });
                }
            });
            return columnHeaders;
        };
        /**
         * Get the data of a regular row (a row without grouping)
         * @param row
         * @param itemObj
         */
        ExportService.prototype.readRegularRowData = function (columns, row, itemObj) {
            var idx = 0;
            var rowOutputStrings = [];
            var delimiter = this._exportOptions.delimiter;
            var format = this._exportOptions.format;
            var exportQuoteWrapper = this._exportQuoteWrapper || '';
            for (var col = 0, ln = columns.length; col < ln; col++) {
                var columnDef = columns[col];
                var fieldId = columnDef.field || columnDef.id || '';
                // skip excluded column
                if (columnDef.excludeFromExport) {
                    continue;
                }
                // if we are grouping and are on 1st column index, we need to skip this column since it will be used later by the grouping text:: Group by [columnX]
                if (this._hasGroupedItems && idx === 0) {
                    rowOutputStrings.push("\"\"");
                }
                // does the user want to evaluate current column Formatter?
                var isEvaluatingFormatter = (columnDef.exportWithFormatter !== undefined) ? columnDef.exportWithFormatter : this._exportOptions.exportWithFormatter;
                // did the user provide a Custom Formatter for the export
                var exportCustomFormatter = (columnDef.exportCustomFormatter !== undefined) ? columnDef.exportCustomFormatter : undefined;
                var itemData = '';
                if (itemObj && itemObj[fieldId] && exportCustomFormatter !== undefined && exportCustomFormatter !== null) {
                    var formattedData = exportCustomFormatter(row, col, itemObj[fieldId], columnDef, itemObj, this._grid);
                    itemData = formattedData;
                    if (formattedData && typeof formattedData === 'object' && formattedData.hasOwnProperty('text')) {
                        itemData = formattedData.text;
                    }
                    if (itemData === null) {
                        itemData = '';
                    }
                }
                else if (isEvaluatingFormatter && columnDef.formatter !== undefined && columnDef.formatter !== null) {
                    var formattedData = columnDef.formatter(row, col, itemObj[fieldId], columnDef, itemObj, this._grid);
                    itemData = formattedData;
                    if (formattedData && typeof formattedData === 'object' && formattedData.hasOwnProperty('text')) {
                        itemData = formattedData.text;
                    }
                    if (itemData === null) {
                        itemData = '';
                    }
                }
                else {
                    itemData = (itemObj[fieldId] === null || itemObj[fieldId] === undefined) ? '' : itemObj[fieldId];
                    if (itemData === null) {
                        itemData = '';
                    }
                }
                // does the user want to sanitize the output data (remove HTML tags)?
                if (columnDef.sanitizeDataExport || this._exportOptions.sanitizeDataExport) {
                    itemData = sanitizeHtmlToText(itemData);
                }
                // when CSV we also need to escape double quotes twice, so " becomes ""
                if (format === exports.FileType.csv && itemData) {
                    itemData = itemData.toString().replace(/"/gi, "\"\"");
                }
                // do we have a wrapper to keep as a string? in certain cases like "1E06", we don't want excel to transform it into exponential (1.0E06)
                // to cancel that effect we can had = in front, ex: ="1E06"
                var keepAsStringWrapper = (columnDef && columnDef.exportCsvForceToKeepAsString) ? '=' : '';
                rowOutputStrings.push(keepAsStringWrapper + exportQuoteWrapper + itemData + exportQuoteWrapper);
                idx++;
            }
            return rowOutputStrings.join(delimiter);
        };
        /**
         * Get the grouped title(s), for example if we grouped by salesRep, the returned result would be:: 'Sales Rep'
         * @param itemObj
         */
        ExportService.prototype.readGroupedTitleRow = function (itemObj) {
            var groupName = sanitizeHtmlToText(itemObj.title);
            var exportQuoteWrapper = this._exportQuoteWrapper || '';
            var format = this._exportOptions.format;
            groupName = addWhiteSpaces(5 * itemObj.level) + groupName;
            if (format === exports.FileType.csv) {
                // when CSV we also need to escape double quotes twice, so " becomes ""
                groupName = groupName.toString().replace(/"/gi, "\"\"");
            }
            return exportQuoteWrapper + ' ' + groupName + exportQuoteWrapper;
        };
        /**
         * Get the grouped totals, these are set by Slick Aggregators.
         * For example if we grouped by "salesRep" and we have a Sum Aggregator on "sales", then the returned output would be:: ["Sum 123$"]
         * @param itemObj
         */
        ExportService.prototype.readGroupedTotalRow = function (columns, itemObj) {
            var _this = this;
            var delimiter = this._exportOptions.delimiter;
            var format = this._exportOptions.format;
            var groupingAggregatorRowText = this._exportOptions.groupingAggregatorRowText || '';
            var exportQuoteWrapper = this._exportQuoteWrapper || '';
            var outputStrings = ["" + exportQuoteWrapper + groupingAggregatorRowText + exportQuoteWrapper];
            columns.forEach(function (columnDef) {
                var itemData = '';
                // if there's a groupTotalsFormatter, we will re-run it to get the exact same output as what is shown in UI
                if (columnDef.groupTotalsFormatter) {
                    itemData = columnDef.groupTotalsFormatter(itemObj, columnDef);
                }
                // does the user want to sanitize the output data (remove HTML tags)?
                if (columnDef.sanitizeDataExport || _this._exportOptions.sanitizeDataExport) {
                    itemData = sanitizeHtmlToText(itemData);
                }
                if (format === exports.FileType.csv) {
                    // when CSV we also need to escape double quotes twice, so a double quote " becomes 2x double quotes ""
                    itemData = itemData.toString().replace(/"/gi, "\"\"");
                }
                outputStrings.push(exportQuoteWrapper + itemData + exportQuoteWrapper);
            });
            return outputStrings.join(delimiter);
        };
        /**
         * Triggers download file with file format.
         * IE(6-10) are not supported
         * All other browsers will use plain javascript on client side to produce a file download.
         * @param options
         */
        ExportService.prototype.startDownloadFile = function (options) {
            // IE(6-10) don't support javascript download and our service doesn't support either so throw an error, we have to make a round trip to the Web Server for exporting
            if (navigator.appName === 'Microsoft Internet Explorer') {
                throw new Error('Microsoft Internet Explorer 6 to 10 do not support javascript export to CSV. Please upgrade your browser.');
            }
            // set the correct MIME type
            var mimeType = (options.format === exports.FileType.csv) ? 'text/csv' : 'text/plain';
            // make sure no html entities exist in the data
            var csvContent = htmlEntityDecode(options.csvContent);
            // dealing with Excel CSV export and UTF-8 is a little tricky.. We will use Option #2 to cover older Excel versions
            // Option #1: we need to make Excel knowing that it's dealing with an UTF-8, A correctly formatted UTF8 file can have a Byte Order Mark as its first three octets
            // reference: http://stackoverflow.com/questions/155097/microsoft-excel-mangles-diacritics-in-csv-files
            // Option#2: use a 3rd party extension to javascript encode into UTF-16
            var outputData;
            if (options.format === exports.FileType.csv) {
                outputData = new textEncodingUtf8.TextEncoder('utf-8').encode(csvContent);
            }
            else {
                outputData = csvContent;
            }
            // create a Blob object for the download
            var blob = new Blob([options.useUtf8WithBom ? '\uFEFF' : '', outputData], {
                type: mimeType + ";charset=utf-8;"
            });
            // when using IE/Edge, then use different download call
            if (typeof navigator.msSaveOrOpenBlob === 'function') {
                navigator.msSaveOrOpenBlob(blob, options.filename);
            }
            else {
                // this trick will generate a temp <a /> tag
                // the code will then trigger a hidden click for it to start downloading
                var link = document.createElement('a');
                var csvUrl = URL.createObjectURL(blob);
                link.textContent = 'download';
                link.href = csvUrl;
                link.setAttribute('download', options.filename);
                // set the visibility to hidden so there is no effect on your web-layout
                link.style.visibility = 'hidden';
                // this part will append the anchor tag, trigger a click (for download to start) and finally remove the tag once completed
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        };
        ExportService = __decorate([
            core.Injectable(),
            __metadata("design:paramtypes", [core$1.TranslateService])
        ], ExportService);
        return ExportService;
    }());

    var Constants = /** @class */ (function () {
        function Constants() {
        }
        Constants.TEXT_CANCEL = 'Cancel';
        Constants.TEXT_CLEAR_ALL_FILTERS = 'Clear All Filters';
        Constants.TEXT_CLEAR_ALL_SORTING = 'Clear All Sorting';
        Constants.TEXT_COLUMNS = 'Columns';
        Constants.TEXT_COMMANDS = 'Commands';
        Constants.TEXT_EXPORT_IN_CSV_FORMAT = 'Export in CSV format';
        Constants.TEXT_EXPORT_IN_TEXT_FORMAT = 'Export in Text format (Tab delimited)';
        Constants.TEXT_FORCE_FIT_COLUMNS = 'Force fit columns';
        Constants.TEXT_HIDE_COLUMN = 'Hide Column';
        Constants.TEXT_REFRESH_DATASET = 'Refresh Dataset';
        Constants.TEXT_REMOVE_FILTER = 'Remove Filter';
        Constants.TEXT_REMOVE_SORT = 'Remove Sort';
        Constants.TEXT_SAVE = 'Save';
        Constants.TEXT_SYNCHRONOUS_RESIZE = 'Synchronous resize';
        Constants.TEXT_SORT_ASCENDING = 'Sort Ascending';
        Constants.TEXT_SORT_DESCENDING = 'Sort Descending';
        Constants.TEXT_TOGGLE_FILTER_ROW = 'Toggle Filter Row';
        Constants.TEXT_TOGGLE_PRE_HEADER_ROW = 'Toggle Pre-Header Row';
        Constants.VALIDATION_REQUIRED_FIELD = 'Field is required';
        Constants.VALIDATION_EDITOR_VALID_NUMBER = 'Please enter a valid number';
        Constants.VALIDATION_EDITOR_VALID_INTEGER = 'Please enter a valid integer number';
        Constants.VALIDATION_EDITOR_INTEGER_BETWEEN = 'Please enter a valid integer number between {{minValue}} and {{maxValue}}';
        Constants.VALIDATION_EDITOR_INTEGER_MAX = 'Please enter a valid integer number that is lower than {{maxValue}}';
        Constants.VALIDATION_EDITOR_INTEGER_MIN = 'Please enter a valid integer number that is greater than {{minValue}}';
        Constants.VALIDATION_EDITOR_NUMBER_BETWEEN = 'Please enter a valid number between {{minValue}} and {{maxValue}}';
        Constants.VALIDATION_EDITOR_NUMBER_MAX = 'Please enter a valid number that is lower than {{maxValue}}';
        Constants.VALIDATION_EDITOR_NUMBER_MIN = 'Please enter a valid number that is greater than {{minValue}}';
        Constants.VALIDATION_EDITOR_DECIMAL_BETWEEN = 'Please enter a valid number with a maximum of {{maxDecimal}} decimals';
        return Constants;
    }());

    var SharedService = /** @class */ (function () {
        function SharedService() {
        }
        Object.defineProperty(SharedService.prototype, "allColumns", {
            // --
            // public
            /** Getter for All Columns  in the grid (hidden/visible) */
            get: function () {
                return this._allColumns;
            },
            /** Setter for All Columns  in the grid (hidden/visible) */
            set: function (allColumns) {
                this._allColumns = allColumns;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SharedService.prototype, "columnDefinitions", {
            /** Getter for the Column Definitions pulled through the Grid Object */
            get: function () {
                return (this._grid && this._grid.getColumns) ? this._grid.getColumns() : [];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SharedService.prototype, "dataView", {
            /** Getter for SlickGrid DataView object */
            get: function () {
                return this._dataView;
            },
            /** Setter for SlickGrid DataView object */
            set: function (dataView) {
                this._dataView = dataView;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SharedService.prototype, "grid", {
            /** Getter for SlickGrid Grid object */
            get: function () {
                return this._grid;
            },
            /** Setter for SlickGrid Grid object */
            set: function (grid) {
                this._grid = grid;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SharedService.prototype, "gridOptions", {
            /** Getter for the Grid Options pulled through the Grid Object */
            get: function () {
                return this._gridOptions || this._grid && this._grid.getOptions && this._grid.getOptions() || {};
            },
            /** Setter for the Grid Options pulled through the Grid Object */
            set: function (gridOptions) {
                this._gridOptions = gridOptions;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SharedService.prototype, "groupItemMetadataProvider", {
            /** Getter for the Grid Options */
            get: function () {
                return this._groupItemMetadataProvider;
            },
            /** Setter for the Grid Options */
            set: function (groupItemMetadataProvider) {
                this._groupItemMetadataProvider = groupItemMetadataProvider;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SharedService.prototype, "visibleColumns", {
            /** Getter for the Visible Columns in the grid */
            get: function () {
                return this._visibleColumns;
            },
            /** Setter for the Visible Columns in the grid */
            set: function (visibleColumns) {
                this._visibleColumns = visibleColumns;
            },
            enumerable: true,
            configurable: true
        });
        return SharedService;
    }());

    var ExtensionUtility = /** @class */ (function () {
        function ExtensionUtility(sharedService, translate) {
            this.sharedService = sharedService;
            this.translate = translate;
        }
        /**
         * Remove a column from the grid by it's index in the grid
         * @param array input
         * @param index
         */
        ExtensionUtility.prototype.arrayRemoveItemByIndex = function (array, index) {
            return array.filter(function (el, i) { return index !== i; });
        };
        /**
         * Load SlickGrid Extension (Control/Plugin) dynamically (on demand)
         * This will basically only load the extension when user enables the feature
         * @param extensionName
         */
        ExtensionUtility.prototype.loadExtensionDynamically = function (extensionName) {
            try {
                switch (extensionName) {
                    case exports.ExtensionName.autoTooltip:
                        require('slickgrid/plugins/slick.autotooltips');
                        break;
                    case exports.ExtensionName.cellExternalCopyManager:
                        require('slickgrid/plugins/slick.cellexternalcopymanager');
                        break;
                    case exports.ExtensionName.checkboxSelector:
                        require('slickgrid/plugins/slick.checkboxselectcolumn');
                        break;
                    case exports.ExtensionName.columnPicker:
                        require('slickgrid/controls/slick.columnpicker');
                        break;
                    case exports.ExtensionName.draggableGrouping:
                        require('slickgrid/plugins/slick.draggablegrouping');
                        break;
                    case exports.ExtensionName.gridMenu:
                        require('slickgrid/controls/slick.gridmenu');
                        break;
                    case exports.ExtensionName.groupItemMetaProvider:
                        require('slickgrid/slick.groupitemmetadataprovider');
                        break;
                    case exports.ExtensionName.headerButton:
                        require('slickgrid/plugins/slick.headerbuttons');
                        break;
                    case exports.ExtensionName.headerMenu:
                        require('slickgrid/plugins/slick.headermenu');
                        break;
                    case exports.ExtensionName.rowSelection:
                        require('slickgrid/plugins/slick.rowselectionmodel');
                        break;
                    case exports.ExtensionName.rowDetailView:
                        require('slickgrid/plugins/slick.rowdetailview');
                        break;
                    case exports.ExtensionName.rowMoveManager:
                        require('slickgrid/plugins/slick.rowmovemanager');
                        break;
                }
            }
            catch (e) {
                // do nothing, we fall here when using Angular and RequireJS
            }
        };
        /**
         * From a Grid Menu object property name, we will return the correct title output string following this order
         * 1- if user provided a title, use it as the output title
         * 2- else if user provided a title key, use it to translate the output title
         * 3- else if nothing is provided use
         */
        ExtensionUtility.prototype.getPickerTitleOutputString = function (propName, pickerName) {
            var output = '';
            var picker = this.sharedService.gridOptions && this.sharedService.gridOptions[pickerName] || {};
            var enableTranslate = this.sharedService.gridOptions && this.sharedService.gridOptions.enableTranslate || false;
            var title = picker && picker[propName];
            var titleKey = picker && picker[propName + "Key"];
            if (titleKey) {
                output = this.translate.instant(titleKey || ' ');
            }
            else {
                switch (propName) {
                    case 'customTitle':
                        output = title || (enableTranslate ? this.translate.instant('COMMANDS') : Constants.TEXT_COMMANDS);
                        break;
                    case 'columnTitle':
                        output = title || (enableTranslate ? this.translate.instant('COLUMNS') : Constants.TEXT_COLUMNS);
                        break;
                    case 'forceFitTitle':
                        output = title || (enableTranslate ? this.translate.instant('FORCE_FIT_COLUMNS') : Constants.TEXT_FORCE_FIT_COLUMNS);
                        break;
                    case 'syncResizeTitle':
                        output = title || (enableTranslate ? this.translate.instant('SYNCHRONOUS_RESIZE') : Constants.TEXT_SYNCHRONOUS_RESIZE);
                        break;
                    default:
                        output = title;
                        break;
                }
            }
            return output;
        };
        /**
         * Sort items (by pointers) in an array by a property name
         * @params items array
         * @param property name to sort with
         */
        ExtensionUtility.prototype.sortItems = function (items, propertyName) {
            // sort the custom items by their position in the list
            items.sort(function (itemA, itemB) {
                if (itemA && itemB && itemA.hasOwnProperty(propertyName) && itemB.hasOwnProperty(propertyName)) {
                    return itemA[propertyName] - itemB[propertyName];
                }
                return -1;
            });
        };
        /** Translate the an array of items from an input key and assign to the output key */
        ExtensionUtility.prototype.translateItems = function (items, inputKey, outputKey) {
            var e_1, _a;
            if (Array.isArray(items)) {
                try {
                    for (var items_1 = __values(items), items_1_1 = items_1.next(); !items_1_1.done; items_1_1 = items_1.next()) {
                        var item = items_1_1.value;
                        if (item[inputKey]) {
                            item[outputKey] = this.translate.instant(item[inputKey]);
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (items_1_1 && !items_1_1.done && (_a = items_1.return)) _a.call(items_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
        };
        ExtensionUtility = __decorate([
            core.Injectable(),
            __metadata("design:paramtypes", [SharedService, core$1.TranslateService])
        ], ExtensionUtility);
        return ExtensionUtility;
    }());

    var AutoTooltipExtension = /** @class */ (function () {
        function AutoTooltipExtension(extensionUtility, sharedService) {
            this.extensionUtility = extensionUtility;
            this.sharedService = sharedService;
        }
        AutoTooltipExtension.prototype.dispose = function () {
            if (this._addon && this._addon.destroy) {
                this._addon.destroy();
            }
        };
        AutoTooltipExtension.prototype.register = function () {
            if (this.sharedService && this.sharedService.grid && this.sharedService.gridOptions) {
                // dynamically import the SlickGrid plugin (addon) with RequireJS
                this.extensionUtility.loadExtensionDynamically(exports.ExtensionName.autoTooltip);
                this._addon = new Slick.AutoTooltips(this.sharedService.gridOptions.autoTooltipOptions || {});
                this.sharedService.grid.registerPlugin(this._addon);
                return this._addon;
            }
            return null;
        };
        AutoTooltipExtension = __decorate([
            core.Injectable(),
            __metadata("design:paramtypes", [ExtensionUtility, SharedService])
        ], AutoTooltipExtension);
        return AutoTooltipExtension;
    }());

    var CellExternalCopyManagerExtension = /** @class */ (function () {
        function CellExternalCopyManagerExtension(extensionUtility, sharedService) {
            this.extensionUtility = extensionUtility;
            this.sharedService = sharedService;
            this._eventHandler = new Slick.EventHandler();
        }
        Object.defineProperty(CellExternalCopyManagerExtension.prototype, "addonOptions", {
            get: function () {
                return this._addonOptions;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CellExternalCopyManagerExtension.prototype, "eventHandler", {
            get: function () {
                return this._eventHandler;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CellExternalCopyManagerExtension.prototype, "commandQueue", {
            get: function () {
                return this._commandQueue;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CellExternalCopyManagerExtension.prototype, "undoRedoBuffer", {
            get: function () {
                return this._undoRedoBuffer;
            },
            enumerable: true,
            configurable: true
        });
        CellExternalCopyManagerExtension.prototype.dispose = function () {
            // unsubscribe all SlickGrid events
            this._eventHandler.unsubscribeAll();
            if (this._addon && this._addon.destroy) {
                this._addon.destroy();
            }
        };
        CellExternalCopyManagerExtension.prototype.register = function () {
            var _this = this;
            if (this.sharedService && this.sharedService.grid && this.sharedService.gridOptions) {
                // dynamically import the SlickGrid plugin (addon) with RequireJS
                this.extensionUtility.loadExtensionDynamically(exports.ExtensionName.cellExternalCopyManager);
                this.createUndoRedoBuffer();
                this.hookUndoShortcutKey();
                this._addonOptions = __assign({}, this.getDefaultOptions(), this.sharedService.gridOptions.excelCopyBufferOptions);
                this.sharedService.grid.setSelectionModel(new Slick.CellSelectionModel());
                this._addon = new Slick.CellExternalCopyManager(this._addonOptions);
                this.sharedService.grid.registerPlugin(this._addon);
                // hook to all possible events
                if (this.sharedService.grid && this.sharedService.gridOptions.excelCopyBufferOptions) {
                    if (this.sharedService.gridOptions.excelCopyBufferOptions.onExtensionRegistered) {
                        this.sharedService.gridOptions.excelCopyBufferOptions.onExtensionRegistered(this._addon);
                    }
                    this._eventHandler.subscribe(this._addon.onCopyCells, function (e, args) {
                        if (_this.sharedService.gridOptions.excelCopyBufferOptions && typeof _this.sharedService.gridOptions.excelCopyBufferOptions.onCopyCells === 'function') {
                            _this.sharedService.gridOptions.excelCopyBufferOptions.onCopyCells(e, args);
                        }
                    });
                    this._eventHandler.subscribe(this._addon.onCopyCancelled, function (e, args) {
                        if (_this.sharedService.gridOptions.excelCopyBufferOptions && typeof _this.sharedService.gridOptions.excelCopyBufferOptions.onCopyCancelled === 'function') {
                            _this.sharedService.gridOptions.excelCopyBufferOptions.onCopyCancelled(e, args);
                        }
                    });
                    this._eventHandler.subscribe(this._addon.onPasteCells, function (e, args) {
                        if (_this.sharedService.gridOptions.excelCopyBufferOptions && typeof _this.sharedService.gridOptions.excelCopyBufferOptions.onPasteCells === 'function') {
                            _this.sharedService.gridOptions.excelCopyBufferOptions.onPasteCells(e, args);
                        }
                    });
                }
                return this._addon;
            }
            return null;
        };
        /** Create an undo redo buffer used by the Excel like copy */
        CellExternalCopyManagerExtension.prototype.createUndoRedoBuffer = function () {
            var _this = this;
            var commandCtr = 0;
            this._commandQueue = [];
            this._undoRedoBuffer = {
                queueAndExecuteCommand: function (editCommand) {
                    _this._commandQueue[commandCtr] = editCommand;
                    commandCtr++;
                    editCommand.execute();
                },
                undo: function () {
                    if (commandCtr === 0) {
                        return;
                    }
                    commandCtr--;
                    var command = _this._commandQueue[commandCtr];
                    if (command && Slick.GlobalEditorLock.cancelCurrentEdit()) {
                        command.undo();
                    }
                },
                redo: function () {
                    if (commandCtr >= _this._commandQueue.length) {
                        return;
                    }
                    var command = _this._commandQueue[commandCtr];
                    commandCtr++;
                    if (command && Slick.GlobalEditorLock.cancelCurrentEdit()) {
                        command.execute();
                    }
                }
            };
        };
        /** @return default plugin (addon) options */
        CellExternalCopyManagerExtension.prototype.getDefaultOptions = function () {
            var _this = this;
            var newRowIds = 0;
            return {
                clipboardCommandHandler: function (editCommand) {
                    _this._undoRedoBuffer.queueAndExecuteCommand.call(_this._undoRedoBuffer, editCommand);
                },
                dataItemColumnValueExtractor: function (item, columnDef) {
                    // when grid or cell is not editable, we will possibly evaluate the Formatter if it was passed
                    // to decide if we evaluate the Formatter, we will use the same flag from Export which is "exportWithFormatter"
                    if (!_this.sharedService.gridOptions.editable || !columnDef.editor) {
                        var isEvaluatingFormatter = (columnDef.exportWithFormatter !== undefined) ? columnDef.exportWithFormatter : (_this.sharedService.gridOptions.exportOptions && _this.sharedService.gridOptions.exportOptions.exportWithFormatter);
                        if (columnDef.formatter && isEvaluatingFormatter) {
                            var formattedOutput = columnDef.formatter(0, 0, item[columnDef.field], columnDef, item, _this.sharedService.grid);
                            if (columnDef.sanitizeDataExport || (_this.sharedService.gridOptions.exportOptions && _this.sharedService.gridOptions.exportOptions.sanitizeDataExport)) {
                                var outputString = formattedOutput;
                                if (formattedOutput && typeof formattedOutput === 'object' && formattedOutput.hasOwnProperty('text')) {
                                    outputString = formattedOutput.text;
                                }
                                if (outputString === null) {
                                    outputString = '';
                                }
                                return sanitizeHtmlToText(outputString);
                            }
                            return formattedOutput;
                        }
                    }
                    // else use the default "dataItemColumnValueExtractor" from the plugin itself
                    // we can do that by setting back the getter with null
                    return null;
                },
                readOnlyMode: false,
                includeHeaderWhenCopying: false,
                newRowCreator: function (count) {
                    for (var i = 0; i < count; i++) {
                        var item = {
                            id: 'newRow_' + newRowIds++
                        };
                        _this.sharedService.grid.getData().addItem(item);
                    }
                }
            };
        };
        /** Attach an undo shortcut key hook that will redo/undo the copy buffer using Ctrl+(Shift)+Z keyboard events */
        CellExternalCopyManagerExtension.prototype.hookUndoShortcutKey = function () {
            var _this = this;
            document.addEventListener('keydown', function (e) {
                var keyCode = e.keyCode || e.code;
                if (keyCode === 90 && (e.ctrlKey || e.metaKey)) {
                    if (e.shiftKey) {
                        _this._undoRedoBuffer.redo(); // Ctrl + Shift + Z
                    }
                    else {
                        _this._undoRedoBuffer.undo(); // Ctrl + Z
                    }
                }
            });
        };
        CellExternalCopyManagerExtension = __decorate([
            core.Injectable(),
            __metadata("design:paramtypes", [ExtensionUtility, SharedService])
        ], CellExternalCopyManagerExtension);
        return CellExternalCopyManagerExtension;
    }());

    var CheckboxSelectorExtension = /** @class */ (function () {
        function CheckboxSelectorExtension(extensionUtility, sharedService) {
            this.extensionUtility = extensionUtility;
            this.sharedService = sharedService;
        }
        CheckboxSelectorExtension.prototype.dispose = function () {
            if (this._addon && this._addon.destroy) {
                this._addon.destroy();
            }
        };
        /**
         * Create the plugin before the Grid creation, else it will behave oddly.
         * Mostly because the column definitions might change after the grid creation
         */
        CheckboxSelectorExtension.prototype.create = function (columnDefinitions, gridOptions) {
            if (Array.isArray(columnDefinitions) && gridOptions) {
                // dynamically import the SlickGrid plugin (addon) with RequireJS
                this.extensionUtility.loadExtensionDynamically(exports.ExtensionName.checkboxSelector);
                if (!this._addon) {
                    this._addon = new Slick.CheckboxSelectColumn(gridOptions.checkboxSelector || {});
                }
                var selectionColumn = this._addon.getColumnDefinition();
                if (typeof selectionColumn === 'object') {
                    selectionColumn.excludeFromExport = true;
                    selectionColumn.excludeFromColumnPicker = true;
                    selectionColumn.excludeFromGridMenu = true;
                    selectionColumn.excludeFromQuery = true;
                    selectionColumn.excludeFromHeaderMenu = true;
                    columnDefinitions.unshift(selectionColumn);
                }
                return this._addon;
            }
            return null;
        };
        CheckboxSelectorExtension.prototype.register = function (rowSelectionPlugin) {
            var _this = this;
            if (this.sharedService && this.sharedService.grid && this.sharedService.gridOptions) {
                // the plugin has to be created BEFORE the grid (else it behaves oddly), but we can only watch grid events AFTER the grid is created
                this.sharedService.grid.registerPlugin(this._addon);
                // this also requires the Row Selection Model to be registered as well
                if (!rowSelectionPlugin || !this.sharedService.grid.getSelectionModel()) {
                    this.extensionUtility.loadExtensionDynamically(exports.ExtensionName.rowSelection);
                    rowSelectionPlugin = new Slick.RowSelectionModel(this.sharedService.gridOptions.rowSelectionOptions || {});
                    this.sharedService.grid.setSelectionModel(rowSelectionPlugin);
                }
                // user might want to pre-select some rows
                // the setTimeout is because of timing issue with styling (row selection happen but rows aren't highlighted properly)
                if (this.sharedService.gridOptions.preselectedRows && rowSelectionPlugin && this.sharedService.grid.getSelectionModel()) {
                    setTimeout(function () { return _this._addon.selectRows(_this.sharedService.gridOptions.preselectedRows); }, 0);
                }
                return rowSelectionPlugin;
            }
            return null;
        };
        CheckboxSelectorExtension = __decorate([
            core.Injectable(),
            __metadata("design:paramtypes", [ExtensionUtility, SharedService])
        ], CheckboxSelectorExtension);
        return CheckboxSelectorExtension;
    }());

    var ColumnPickerExtension = /** @class */ (function () {
        function ColumnPickerExtension(extensionUtility, sharedService) {
            this.extensionUtility = extensionUtility;
            this.sharedService = sharedService;
            this._eventHandler = new Slick.EventHandler();
        }
        Object.defineProperty(ColumnPickerExtension.prototype, "eventHandler", {
            get: function () {
                return this._eventHandler;
            },
            enumerable: true,
            configurable: true
        });
        ColumnPickerExtension.prototype.dispose = function () {
            // unsubscribe all SlickGrid events
            this._eventHandler.unsubscribeAll();
            if (this._addon && this._addon.destroy) {
                this._addon.destroy();
            }
        };
        ColumnPickerExtension.prototype.register = function () {
            var _this = this;
            if (this.sharedService && this.sharedService.grid && this.sharedService.gridOptions) {
                // dynamically import the SlickGrid plugin (addon) with RequireJS
                this.extensionUtility.loadExtensionDynamically(exports.ExtensionName.columnPicker);
                // localization support for the picker
                var columnTitle = this.extensionUtility.getPickerTitleOutputString('columnTitle', 'columnPicker');
                var forceFitTitle = this.extensionUtility.getPickerTitleOutputString('forceFitTitle', 'columnPicker');
                var syncResizeTitle = this.extensionUtility.getPickerTitleOutputString('syncResizeTitle', 'columnPicker');
                this.sharedService.gridOptions.columnPicker = this.sharedService.gridOptions.columnPicker || {};
                this.sharedService.gridOptions.columnPicker.columnTitle = this.sharedService.gridOptions.columnPicker.columnTitle || columnTitle;
                this.sharedService.gridOptions.columnPicker.forceFitTitle = this.sharedService.gridOptions.columnPicker.forceFitTitle || forceFitTitle;
                this.sharedService.gridOptions.columnPicker.syncResizeTitle = this.sharedService.gridOptions.columnPicker.syncResizeTitle || syncResizeTitle;
                this._addon = new Slick.Controls.ColumnPicker(this.sharedService.columnDefinitions, this.sharedService.grid, this.sharedService.gridOptions);
                if (this.sharedService.grid && this.sharedService.gridOptions.enableColumnPicker) {
                    if (this.sharedService.gridOptions.columnPicker.onExtensionRegistered) {
                        this.sharedService.gridOptions.columnPicker.onExtensionRegistered(this._addon);
                    }
                    this._eventHandler.subscribe(this._addon.onColumnsChanged, function (e, args) {
                        if (_this.sharedService.gridOptions.columnPicker && typeof _this.sharedService.gridOptions.columnPicker.onColumnsChanged === 'function') {
                            _this.sharedService.gridOptions.columnPicker.onColumnsChanged(e, args);
                        }
                    });
                }
                return this._addon;
            }
            return null;
        };
        /** Translate the Column Picker headers and also the last 2 checkboxes */
        ColumnPickerExtension.prototype.translateColumnPicker = function () {
            if (this.sharedService && this.sharedService.grid && this.sharedService.gridOptions) {
                // update the properties by pointers, that is the only way to get Column Picker Control to see the new values
                if (this.sharedService.gridOptions.columnPicker) {
                    this.emptyColumnPickerTitles();
                    this.sharedService.gridOptions.columnPicker.columnTitle = this.extensionUtility.getPickerTitleOutputString('columnTitle', 'columnPicker');
                    this.sharedService.gridOptions.columnPicker.forceFitTitle = this.extensionUtility.getPickerTitleOutputString('forceFitTitle', 'columnPicker');
                    this.sharedService.gridOptions.columnPicker.syncResizeTitle = this.extensionUtility.getPickerTitleOutputString('syncResizeTitle', 'columnPicker');
                }
                // translate all columns (including hidden columns)
                this.extensionUtility.translateItems(this.sharedService.allColumns, 'headerKey', 'name');
                // re-initialize the Column Picker, that will recreate all the list
                // doing an "init()" won't drop any existing command attached
                if (this._addon.init) {
                    this._addon.init(this.sharedService.grid);
                }
            }
        };
        ColumnPickerExtension.prototype.emptyColumnPickerTitles = function () {
            if (this.sharedService && this.sharedService.gridOptions && this.sharedService.gridOptions.columnPicker) {
                this.sharedService.gridOptions.columnPicker.columnTitle = '';
                this.sharedService.gridOptions.columnPicker.forceFitTitle = '';
                this.sharedService.gridOptions.columnPicker.syncResizeTitle = '';
            }
        };
        ColumnPickerExtension = __decorate([
            core.Injectable(),
            __metadata("design:paramtypes", [ExtensionUtility, SharedService])
        ], ColumnPickerExtension);
        return ColumnPickerExtension;
    }());

    var DraggableGroupingExtension = /** @class */ (function () {
        function DraggableGroupingExtension(extensionUtility, sharedService) {
            this.extensionUtility = extensionUtility;
            this.sharedService = sharedService;
            this._eventHandler = new Slick.EventHandler();
        }
        Object.defineProperty(DraggableGroupingExtension.prototype, "eventHandler", {
            get: function () {
                return this._eventHandler;
            },
            enumerable: true,
            configurable: true
        });
        DraggableGroupingExtension.prototype.dispose = function () {
            // unsubscribe all SlickGrid events
            this._eventHandler.unsubscribeAll();
            if (this._addon && this._addon.destroy) {
                this._addon.destroy();
            }
        };
        /**
         * Attach/Create different plugins before the Grid creation.
         * For example the multi-select have to be added to the column definition before the grid is created to work properly
         */
        DraggableGroupingExtension.prototype.create = function (gridOptions) {
            if (gridOptions) {
                // dynamically import the SlickGrid plugin (addon) with RequireJS
                this.extensionUtility.loadExtensionDynamically(exports.ExtensionName.draggableGrouping);
                if (!this._addon) {
                    this._addon = new Slick.DraggableGrouping(gridOptions.draggableGrouping || {});
                }
                return this._addon;
            }
            return null;
        };
        DraggableGroupingExtension.prototype.register = function () {
            var _this = this;
            if (this.sharedService && this.sharedService.grid && this.sharedService.gridOptions) {
                this.sharedService.grid.registerPlugin(this._addon);
                // Events
                if (this.sharedService.grid && this.sharedService.gridOptions.draggableGrouping) {
                    if (this.sharedService.gridOptions.draggableGrouping.onExtensionRegistered) {
                        this.sharedService.gridOptions.draggableGrouping.onExtensionRegistered(this._addon);
                    }
                    this._eventHandler.subscribe(this._addon.onGroupChanged, function (e, args) {
                        if (_this.sharedService.gridOptions.draggableGrouping && typeof _this.sharedService.gridOptions.draggableGrouping.onGroupChanged === 'function') {
                            _this.sharedService.gridOptions.draggableGrouping.onGroupChanged(e, args);
                        }
                    });
                }
                return this._addon;
            }
            return null;
        };
        DraggableGroupingExtension = __decorate([
            core.Injectable(),
            __metadata("design:paramtypes", [ExtensionUtility, SharedService])
        ], DraggableGroupingExtension);
        return DraggableGroupingExtension;
    }());

    function parseBoolean$1(str) {
        return /(true|1)/i.test(str + '');
    }
    var booleanFilterCondition = function (options) {
        var searchTerm = Array.isArray(options.searchTerms) && options.searchTerms[0] || '';
        return parseBoolean$1(options.cellValue) === parseBoolean$1(searchTerm);
    };

    /**
     * Compare 2 objects,
     * we will loop through all properties of the object to compare the entire content of both objects
     * Optionally we can compare by a property key, when that is provided we will compare the object content
     * @param o1
     * @param o2
     * @param compareKey optional
     */
    var compareObjects = function (o1, o2, compareKey) {
        // if user provided an object compare key then compare directly both objects by that key
        if (compareKey && (o1.hasOwnProperty(compareKey) || o2.hasOwnProperty(compareKey))) {
            return o1[compareKey] === o2 || o1 === o2[compareKey] || o1[compareKey] === o2[compareKey];
        }
        // loop through all object properties to compare the full content of the object
        for (var p in o1) {
            if (o1.hasOwnProperty(p)) {
                if (o1[p] !== o2[p]) {
                    return false;
                }
            }
        }
        for (var p in o2) {
            if (o2.hasOwnProperty(p)) {
                if (o1[p] !== o2[p]) {
                    return false;
                }
            }
        }
        return true;
    };
    var testFilterCondition = function (operator, value1, value2) {
        switch (operator) {
            case '<':
            case 'LT': return (value1 < value2);
            case '<=':
            case 'LE': return (value1 <= value2);
            case '>':
            case 'GT': return (value1 > value2);
            case '>=':
            case 'GE': return (value1 >= value2);
            case '!=':
            case '<>':
            case 'NE': return (value1 !== value2);
            case '=':
            case '==':
            case 'EQ': return (value1 === value2);
            case 'IN': return ((value2 && value2.includes) ? (value2.includes(value1)) : false);
            case 'NIN':
            case 'NOT_IN':
                return ((value2 && value2.includes) ? (!value2.includes(value1)) : false);
            case 'IN_CONTAINS':
                if (value2 && Array.isArray(value2) && value2.findIndex) {
                    return ((value2.findIndex(function (val) { return value1.indexOf(val) > -1; })) > -1);
                }
                return false;
            case 'NIN_CONTAINS':
            case 'NOT_IN_CONTAINS':
                if (value2 && Array.isArray(value2) && value2.findIndex) {
                    return !((value2.findIndex(function (val) { return value1.indexOf(val) > -1; })) > -1);
                }
                return false;
        }
        return true;
    };

    var moment$3 = moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
    var FORMAT$5 = mapMomentDateFormatWithFieldType(exports.FieldType.dateEuro);
    var dateEuroFilterCondition = function (options) {
        var searchTerm = Array.isArray(options.searchTerms) && options.searchTerms[0] || '';
        if (searchTerm === null || searchTerm === '' || !moment$3(options.cellValue, FORMAT$5, true).isValid() || !moment$3(searchTerm, FORMAT$5, true).isValid()) {
            return false;
        }
        var dateCell = moment$3(options.cellValue, FORMAT$5, true);
        var dateSearch = moment$3(searchTerm, FORMAT$5, true);
        // run the filter condition with date in Unix Timestamp format
        return testFilterCondition(options.operator || '==', parseInt(dateCell.format('X'), 10), parseInt(dateSearch.format('X'), 10));
    };

    var moment$4 = moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
    var FORMAT$6 = mapMomentDateFormatWithFieldType(exports.FieldType.dateEuroShort);
    var dateEuroShortFilterCondition = function (options) {
        var searchTerm = Array.isArray(options.searchTerms) && options.searchTerms[0] || '';
        if (searchTerm === null || searchTerm === '' || !moment$4(options.cellValue, FORMAT$6, true).isValid() || !moment$4(searchTerm, FORMAT$6, true).isValid()) {
            return false;
        }
        var dateCell = moment$4(options.cellValue, FORMAT$6, true);
        var dateSearch = moment$4(searchTerm, FORMAT$6, true);
        // run the filter condition with date in Unix Timestamp format
        return testFilterCondition(options.operator || '==', parseInt(dateCell.format('X'), 10), parseInt(dateSearch.format('X'), 10));
    };

    var moment$5 = moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
    var dateFilterCondition = function (options) {
        var searchTerm = Array.isArray(options.searchTerms) && options.searchTerms[0] || '';
        var filterSearchType = options.filterSearchType || exports.FieldType.dateIso;
        var searchDateFormat = mapMomentDateFormatWithFieldType(filterSearchType);
        if (searchTerm === null || searchTerm === '' || !moment$5(options.cellValue, moment$5.ISO_8601).isValid() || !moment$5(searchTerm, searchDateFormat, true).isValid()) {
            return false;
        }
        var dateCell = moment$5(options.cellValue);
        var dateSearch = moment$5(searchTerm);
        // run the filter condition with date in Unix Timestamp format
        return testFilterCondition(options.operator || '==', parseInt(dateCell.format('X'), 10), parseInt(dateSearch.format('X'), 10));
    };

    var moment$6 = moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
    var FORMAT$7 = mapMomentDateFormatWithFieldType(exports.FieldType.dateIso);
    var dateIsoFilterCondition = function (options) {
        var searchTerm = Array.isArray(options.searchTerms) && options.searchTerms[0] || '';
        if (searchTerm === null || searchTerm === '' || !moment$6(options.cellValue, FORMAT$7, true).isValid() || !moment$6(searchTerm, FORMAT$7, true).isValid()) {
            return false;
        }
        var dateCell = moment$6(options.cellValue, FORMAT$7, true);
        var dateSearch = moment$6(searchTerm, FORMAT$7, true);
        // run the filter condition with date in Unix Timestamp format
        return testFilterCondition(options.operator || '==', parseInt(dateCell.format('X'), 10), parseInt(dateSearch.format('X'), 10));
    };

    var moment$7 = moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
    var FORMAT$8 = mapMomentDateFormatWithFieldType(exports.FieldType.dateUs);
    var dateUsFilterCondition = function (options) {
        var searchTerm = Array.isArray(options.searchTerms) && options.searchTerms[0] || '';
        if (searchTerm === null || searchTerm === '' || !moment$7(options.cellValue, FORMAT$8, true).isValid() || !moment$7(searchTerm, FORMAT$8, true).isValid()) {
            return false;
        }
        var dateCell = moment$7(options.cellValue, FORMAT$8, true);
        var dateSearch = moment$7(searchTerm, FORMAT$8, true);
        // run the filter condition with date in Unix Timestamp format
        return testFilterCondition(options.operator || '==', parseInt(dateCell.format('X'), 10), parseInt(dateSearch.format('X'), 10));
    };

    var moment$8 = moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
    var FORMAT$9 = mapMomentDateFormatWithFieldType(exports.FieldType.dateUsShort);
    var dateUsShortFilterCondition = function (options) {
        var searchTerm = Array.isArray(options.searchTerms) && options.searchTerms[0] || '';
        if (searchTerm === null || searchTerm === '' || !moment$8(options.cellValue, FORMAT$9, true).isValid() || !moment$8(searchTerm, FORMAT$9, true).isValid()) {
            return false;
        }
        var dateCell = moment$8(options.cellValue, FORMAT$9, true);
        var dateSearch = moment$8(searchTerm, FORMAT$9, true);
        // run the filter condition with date in Unix Timestamp format
        return testFilterCondition(options.operator || '==', parseInt(dateCell.format('X'), 10), parseInt(dateSearch.format('X'), 10));
    };

    var moment$9 = moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
    var dateUtcFilterCondition = function (options) {
        var searchTerm = Array.isArray(options.searchTerms) && options.searchTerms[0] || '';
        var searchDateFormat = mapMomentDateFormatWithFieldType(options.filterSearchType || options.fieldType);
        if (!moment$9(options.cellValue, moment$9.ISO_8601).isValid() || !moment$9(searchTerm, searchDateFormat, true).isValid()) {
            return false;
        }
        var dateCell = moment$9(options.cellValue, moment$9.ISO_8601, true);
        var dateSearch = moment$9(searchTerm, searchDateFormat, true);
        // run the filter condition with date in Unix Timestamp format
        return testFilterCondition(options.operator || '==', parseInt(dateCell.format('X'), 10), parseInt(dateSearch.format('X'), 10));
    };

    var collectionSearchFilterCondition = function (options) {
        // multiple-select will always return text, so we should make our cell values text as well
        var cellValue = options.cellValue + '';
        return testFilterCondition(options.operator || 'IN', cellValue, options.searchTerms || []);
    };

    var numberFilterCondition = function (options) {
        var cellValue = parseFloat(options.cellValue);
        var searchTerm = (Array.isArray(options.searchTerms) && options.searchTerms[0]) || 0;
        if (typeof searchTerm === 'string') {
            searchTerm = parseFloat(searchTerm);
        }
        if (!searchTerm && (!options.operator || options.operator === '')) {
            return true;
        }
        return testFilterCondition(options.operator || '==', cellValue, searchTerm);
    };

    var objectFilterCondition = function (options) {
        var searchTerm = (Array.isArray(options.searchTerms) && options.searchTerms[0] || '');
        if (!searchTerm && (!options.operator || options.operator === '')) {
            return true;
        }
        return compareObjects(options.cellValue, searchTerm, options.dataKey);
    };

    var stringFilterCondition = function (options) {
        // make sure the cell value is a string by casting it when possible
        options.cellValue = (options.cellValue === undefined || options.cellValue === null) ? '' : options.cellValue.toString();
        // make both the cell value and search value lower for case insensitive comparison
        var cellValue = options.cellValue.toLowerCase();
        var searchTerm = (Array.isArray(options.searchTerms) && options.searchTerms[0]) || '';
        if (typeof searchTerm === 'string') {
            searchTerm = searchTerm.toLowerCase();
        }
        if (options.operator === '*' || options.operator === exports.OperatorType.endsWith) {
            return cellValue.endsWith(searchTerm);
        }
        else if ((options.operator === '' && options.cellValueLastChar === '*') || options.operator === exports.OperatorType.startsWith) {
            return cellValue.startsWith(searchTerm);
        }
        else if (options.operator === '') {
            return cellValue.includes(searchTerm);
        }
        return testFilterCondition(options.operator || '==', cellValue, searchTerm);
    };

    var executeMappedCondition = function (options) {
        // when using a multi-select ('IN' operator) we will not use the field type but instead go directly with a collection search
        var operator = options && options.operator && options.operator.toUpperCase();
        if (operator === 'IN' || operator === 'NIN' || operator === 'IN_CONTAINS' || operator === 'NIN_CONTAINS') {
            return collectionSearchFilterCondition(options);
        }
        // execute the mapped type, or default to String condition check
        switch (options.fieldType) {
            case exports.FieldType.boolean:
                return booleanFilterCondition(options);
            case exports.FieldType.date:
                return dateFilterCondition(options);
            case exports.FieldType.dateUtc:
                return dateUtcFilterCondition(options);
            case exports.FieldType.dateIso:
                return dateIsoFilterCondition(options);
            // all Euro Formats (date/month/year)
            case exports.FieldType.dateEuro:
            case exports.FieldType.dateTimeEuro:
                return dateEuroFilterCondition(options);
            case exports.FieldType.dateEuroShort:
            case exports.FieldType.dateTimeEuroShort:
                return dateEuroShortFilterCondition(options);
            // all US Formats (month/date/year)
            case exports.FieldType.dateUs:
            case exports.FieldType.dateTimeUs:
                return dateUsFilterCondition(options);
            case exports.FieldType.dateUsShort:
            case exports.FieldType.dateTimeUsShort:
                return dateUsShortFilterCondition(options);
            case exports.FieldType.number:
                return numberFilterCondition(options);
            case exports.FieldType.object:
                return objectFilterCondition(options);
            case exports.FieldType.string:
            default:
                return stringFilterCondition(options);
        }
    };

    var FilterConditions = {
        executeMappedCondition: executeMappedCondition,
        booleanFilter: booleanFilterCondition,
        collectionSearchFilter: collectionSearchFilterCondition,
        dateEuroFilter: dateEuroFilterCondition,
        dateEuroShortFilter: dateEuroShortFilterCondition,
        dateFilter: dateFilterCondition,
        dateIsoFilter: dateIsoFilterCondition,
        dateUtcFilter: dateUtcFilterCondition,
        dateUsFilter: dateUsFilterCondition,
        dateUsShortFilter: dateUsShortFilterCondition,
        numberFilter: numberFilterCondition,
        stringFilter: stringFilterCondition,
        testFilter: testFilterCondition
    };

    var AutoCompleteFilter = /** @class */ (function () {
        /**
         * Initialize the Filter
         */
        function AutoCompleteFilter(translate, collectionService) {
            this.translate = translate;
            this.collectionService = collectionService;
            this._clearFilterTriggered = false;
            this._shouldTriggerQuery = true;
            this.isFilled = false;
            /** The property name for values in the collection */
            this.valueName = 'label';
            this.enableTranslateLabel = false;
            this.subscriptions = [];
        }
        Object.defineProperty(AutoCompleteFilter.prototype, "collectionOptions", {
            /** Getter for the Collection Options */
            get: function () {
                return this.columnDef && this.columnDef.filter && this.columnDef.filter.collectionOptions || {};
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AutoCompleteFilter.prototype, "columnFilter", {
            /** Getter for the Column Filter */
            get: function () {
                return this.columnDef && this.columnDef.filter || {};
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AutoCompleteFilter.prototype, "customStructure", {
            /** Getter for the Custom Structure if exist */
            get: function () {
                return this.columnDef && this.columnDef.filter && this.columnDef.filter.customStructure;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AutoCompleteFilter.prototype, "gridOptions", {
            /** Getter for the Grid Options pulled through the Grid Object */
            get: function () {
                return (this.grid && this.grid.getOptions) ? this.grid.getOptions() : {};
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AutoCompleteFilter.prototype, "operator", {
            /** Getter of the Operator to use when doing the filter comparing */
            get: function () {
                return this.columnDef && this.columnDef.filter && this.columnDef.filter.operator || exports.OperatorType.equal;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Initialize the filter template
         */
        AutoCompleteFilter.prototype.init = function (args) {
            if (!args) {
                throw new Error('[Angular-SlickGrid] A filter must always have an "init()" with valid arguments.');
            }
            this.grid = args.grid;
            this.callback = args.callback;
            this.columnDef = args.columnDef;
            this.searchTerms = args.searchTerms || [];
            if (!this.grid || !this.columnDef || !this.columnFilter || (!this.columnFilter.collection && !this.columnFilter.collectionAsync && !this.columnFilter.filterOptions)) {
                throw new Error("[Angular-SlickGrid] You need to pass a \"collection\" (or \"collectionAsync\") for the AutoComplete Filter to work correctly. Also each option should include a value/label pair (or value/labelKey when using Locale). For example:: { filter: model: Filters.autoComplete, collection: [{ value: true, label: 'True' }, { value: false, label: 'False'}] }");
            }
            this.enableTranslateLabel = this.columnFilter && this.columnFilter.enableTranslateLabel || false;
            this.labelName = this.customStructure && this.customStructure.label || 'label';
            this.valueName = this.customStructure && this.customStructure.value || 'value';
            // always render the DOM element, even if user passed a "collectionAsync",
            var newCollection = this.columnFilter.collection || [];
            this.renderDomElement(newCollection);
            // on every Filter which have a "collection" or a "collectionAsync"
            // we will add (or replace) a Subject to the "collectionAsync" property so that user has possibility to change the collection
            // if "collectionAsync" is already set by the user, it will resolve it first then after it will replace it with a Subject
            var collectionAsync = this.columnFilter && this.columnFilter.collectionAsync;
            if (collectionAsync) {
                this.renderOptionsAsync(collectionAsync); // create Subject after resolve (createCollectionAsyncSubject)
            }
        };
        /**
         * Clear the filter value
         */
        AutoCompleteFilter.prototype.clear = function (shouldTriggerQuery) {
            if (shouldTriggerQuery === void 0) { shouldTriggerQuery = true; }
            if (this.$filterElm) {
                this._clearFilterTriggered = true;
                this._shouldTriggerQuery = shouldTriggerQuery;
                this.searchTerms = [];
                this.$filterElm.val('');
                this.$filterElm.trigger('keyup');
            }
        };
        /**
         * destroy the filter
         */
        AutoCompleteFilter.prototype.destroy = function () {
            if (this.$filterElm) {
                this.$filterElm.off('keyup input change').remove();
            }
        };
        /**
         * Set value(s) on the DOM element
         */
        AutoCompleteFilter.prototype.setValues = function (values) {
            if (values) {
                this.$filterElm.val(values);
            }
        };
        //
        // protected functions
        // ------------------
        /**
         * user might want to filter certain items of the collection
         * @param inputCollection
         * @return outputCollection filtered and/or sorted collection
         */
        AutoCompleteFilter.prototype.filterCollection = function (inputCollection) {
            var outputCollection = inputCollection;
            // user might want to filter certain items of the collection
            if (this.columnFilter && this.columnFilter.collectionFilterBy) {
                var filterBy = this.columnFilter.collectionFilterBy;
                var filterCollectionBy = this.columnFilter.collectionOptions && this.columnFilter.collectionOptions.filterResultAfterEachPass || null;
                outputCollection = this.collectionService.filterCollection(outputCollection, filterBy, filterCollectionBy);
            }
            return outputCollection;
        };
        /**
         * user might want to sort the collection in a certain way
         * @param inputCollection
         * @return outputCollection filtered and/or sorted collection
         */
        AutoCompleteFilter.prototype.sortCollection = function (inputCollection) {
            var outputCollection = inputCollection;
            // user might want to sort the collection
            if (this.columnFilter && this.columnFilter.collectionSortBy) {
                var sortBy = this.columnFilter.collectionSortBy;
                outputCollection = this.collectionService.sortCollection(this.columnDef, outputCollection, sortBy, this.enableTranslateLabel);
            }
            return outputCollection;
        };
        AutoCompleteFilter.prototype.renderOptionsAsync = function (collectionAsync) {
            return __awaiter(this, void 0, void 0, function () {
                var awaitedCollection;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            awaitedCollection = [];
                            if (!collectionAsync) return [3 /*break*/, 2];
                            return [4 /*yield*/, castToPromise(collectionAsync)];
                        case 1:
                            awaitedCollection = _a.sent();
                            this.renderDomElementFromCollectionAsync(awaitedCollection);
                            // because we accept Promises & HttpClient Observable only execute once
                            // we will re-create an RxJs Subject which will replace the "collectionAsync" which got executed once anyway
                            // doing this provide the user a way to call a "collectionAsync.next()"
                            this.createCollectionAsyncSubject();
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        };
        /** Create or recreate an Observable Subject and reassign it to the "collectionAsync" object so user can call a "collectionAsync.next()" on it */
        AutoCompleteFilter.prototype.createCollectionAsyncSubject = function () {
            var _this = this;
            var newCollectionAsync = new rxjs.Subject();
            this.columnFilter.collectionAsync = newCollectionAsync;
            this.subscriptions.push(newCollectionAsync.subscribe(function (collection) { return _this.renderDomElementFromCollectionAsync(collection); }));
        };
        /**
         * When user use a CollectionAsync we will use the returned collection to render the filter DOM element
         * and reinitialize filter collection with this new collection
         */
        AutoCompleteFilter.prototype.renderDomElementFromCollectionAsync = function (collection) {
            if (this.collectionOptions && this.collectionOptions.collectionInObjectProperty) {
                collection = getDescendantProperty(collection, this.collectionOptions.collectionInObjectProperty);
            }
            if (!Array.isArray(collection)) {
                throw new Error('Something went wrong while trying to pull the collection from the "collectionAsync" call in the AutoComplete Filter, the collection is not a valid array.');
            }
            // copy over the array received from the async call to the "collection" as the new collection to use
            // this has to be BEFORE the `collectionObserver().subscribe` to avoid going into an infinite loop
            this.columnFilter.collection = collection;
            // recreate Filter DOM element after getting async collection
            this.renderDomElement(collection);
        };
        AutoCompleteFilter.prototype.renderDomElement = function (collection) {
            var _this = this;
            if (!Array.isArray(collection) && this.collectionOptions && this.collectionOptions.collectionInObjectProperty) {
                collection = getDescendantProperty(collection, this.collectionOptions.collectionInObjectProperty);
            }
            if (!Array.isArray(collection)) {
                throw new Error('The "collection" passed to the Autocomplete Filter is not a valid array');
            }
            // assign the collection to a temp variable before filtering/sorting the collection
            var newCollection = collection;
            // user might want to filter and/or sort certain items of the collection
            newCollection = this.filterCollection(newCollection);
            newCollection = this.sortCollection(newCollection);
            // filter input can only have 1 search term, so we will use the 1st array index if it exist
            var searchTerm = (Array.isArray(this.searchTerms) && this.searchTerms[0]) || '';
            // step 1, create HTML string template
            var filterTemplate = this.buildTemplateHtmlString();
            // step 2, create the DOM Element of the filter & pre-load search term
            // also subscribe to the onClose event
            this.$filterElm = this.createDomElement(filterTemplate, newCollection, searchTerm);
            // step 3, subscribe to the keyup event and run the callback when that happens
            // also add/remove "filled" class for styling purposes
            this.$filterElm.on('keyup input change', function (e) {
                var value = e && e.target && e.target.value || '';
                var enableWhiteSpaceTrim = _this.gridOptions.enableFilterTrimWhiteSpace || _this.columnFilter.enableTrimWhiteSpace;
                if (typeof value === 'string' && enableWhiteSpaceTrim) {
                    value = value.trim();
                }
                if (_this._clearFilterTriggered) {
                    _this.callback(e, { columnDef: _this.columnDef, clearFilterTriggered: _this._clearFilterTriggered, shouldTriggerQuery: _this._shouldTriggerQuery });
                    _this.$filterElm.removeClass('filled');
                }
                else {
                    if (value === '') {
                        _this.$filterElm.removeClass('filled');
                        _this.callback(e, { columnDef: _this.columnDef, operator: _this.operator, searchTerms: [value], shouldTriggerQuery: _this._shouldTriggerQuery });
                    }
                    else {
                        _this.$filterElm.addClass('filled');
                    }
                }
                // reset both flags for next use
                _this._clearFilterTriggered = false;
                _this._shouldTriggerQuery = true;
            });
        };
        /**
         * Create the HTML template as a string
         */
        AutoCompleteFilter.prototype.buildTemplateHtmlString = function () {
            var columnId = this.columnDef && this.columnDef.id;
            var placeholder = (this.gridOptions) ? (this.gridOptions.defaultFilterPlaceholder || '') : '';
            if (this.columnFilter && this.columnFilter.placeholder) {
                placeholder = this.columnFilter.placeholder;
            }
            return "<input type=\"text\" role=\"presentation\" autocomplete=\"off\" class=\"form-control autocomplete search-filter filter-" + columnId + "\" placeholder=\"" + placeholder + "\">";
        };
        /**
         * From the html template string, create a DOM element
         * @param filterTemplate
         */
        AutoCompleteFilter.prototype.createDomElement = function (filterTemplate, collection, searchTerm) {
            var _this = this;
            var columnId = this.columnDef && this.columnDef.id;
            var $headerElm = this.grid.getHeaderRowColumn(columnId);
            $($headerElm).empty();
            // create the DOM element & add an ID and filter class
            var $filterElm = $(filterTemplate);
            var searchTermInput = searchTerm;
            // user might provide his own custom structure
            // jQuery UI autocomplete requires a label/value pair, so we must remap them when user provide different ones
            if (Array.isArray(collection) && this.customStructure) {
                collection = collection.map(function (item) {
                    return { label: item[_this.labelName], value: item[_this.valueName] };
                });
            }
            // user might pass his own autocomplete options
            var autoCompleteOptions = this.columnFilter.filterOptions;
            // when user passes it's own autocomplete options
            // we still need to provide our own "select" callback implementation
            if (autoCompleteOptions) {
                autoCompleteOptions.select = function (event, ui) { return _this.onSelect(event, ui); };
                $filterElm.autocomplete(autoCompleteOptions);
            }
            else {
                if (!Array.isArray(collection)) {
                    throw new Error('AutoComplete default implementation requires a "collection" or "collectionAsync" to be provided for the filter to work properly');
                }
                $filterElm.autocomplete({
                    minLength: 0,
                    source: collection,
                    select: function (event, ui) { return _this.onSelect(event, ui); },
                });
            }
            $filterElm.val(searchTermInput);
            $filterElm.attr('id', "filter-" + columnId);
            $filterElm.data('columnId', columnId);
            // if there's a search term, we will add the "filled" class for styling purposes
            if (searchTerm) {
                $filterElm.addClass('filled');
            }
            // append the new DOM element to the header row
            if ($filterElm && typeof $filterElm.appendTo === 'function') {
                $filterElm.appendTo($headerElm);
            }
            return $filterElm;
        };
        //
        // private functions
        // ------------------
        AutoCompleteFilter.prototype.onSelect = function (event, ui) {
            if (ui && ui.item) {
                var itemLabel = typeof ui.item === 'string' ? ui.item : ui.item.label;
                var itemValue = typeof ui.item === 'string' ? ui.item : ui.item.value;
                this.$filterElm.val(itemLabel);
                this.callback(event, { columnDef: this.columnDef, operator: this.operator, searchTerms: [itemValue], shouldTriggerQuery: this._shouldTriggerQuery });
                // reset both flags for next use
                this._clearFilterTriggered = false;
                this._shouldTriggerQuery = true;
            }
            return false;
        };
        AutoCompleteFilter = __decorate([
            core.Injectable(),
            __metadata("design:paramtypes", [core$1.TranslateService, CollectionService])
        ], AutoCompleteFilter);
        return AutoCompleteFilter;
    }());

    require('flatpickr');
    var CompoundDateFilter = /** @class */ (function () {
        function CompoundDateFilter(translate) {
            this.translate = translate;
            this._clearFilterTriggered = false;
            this._shouldTriggerQuery = true;
        }
        Object.defineProperty(CompoundDateFilter.prototype, "gridOptions", {
            /** Getter for the Grid Options pulled through the Grid Object */
            get: function () {
                return (this.grid && this.grid.getOptions) ? this.grid.getOptions() : {};
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CompoundDateFilter.prototype, "columnFilter", {
            /** Getter for the Column Filter */
            get: function () {
                return this.columnDef && this.columnDef.filter || {};
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CompoundDateFilter.prototype, "operator", {
            /** Getter for the Filter Operator */
            get: function () {
                return this._operator || exports.OperatorType.empty;
            },
            /** Setter for the Filter Operator */
            set: function (op) {
                this._operator = op;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Initialize the Filter
         */
        CompoundDateFilter.prototype.init = function (args) {
            var _this = this;
            if (args) {
                this.grid = args.grid;
                this.callback = args.callback;
                this.columnDef = args.columnDef;
                this.operator = args.operator || '';
                this.searchTerms = args.searchTerms || [];
                // date input can only have 1 search term, so we will use the 1st array index if it exist
                var searchTerm = (Array.isArray(this.searchTerms) && this.searchTerms[0]) || '';
                // step 1, create the DOM Element of the filter which contain the compound Operator+Input
                // and initialize it if searchTerm is filled
                this.$filterElm = this.createDomElement(searchTerm);
                // step 3, subscribe to the keyup event and run the callback when that happens
                // also add/remove "filled" class for styling purposes
                this.$filterInputElm.keyup(function (e) {
                    _this.onTriggerEvent(e);
                });
                this.$selectOperatorElm.change(function (e) {
                    _this.onTriggerEvent(e);
                });
            }
        };
        /**
         * Clear the filter value
         */
        CompoundDateFilter.prototype.clear = function (shouldTriggerQuery) {
            if (shouldTriggerQuery === void 0) { shouldTriggerQuery = true; }
            if (this.flatInstance && this.$selectOperatorElm) {
                this._clearFilterTriggered = true;
                this._shouldTriggerQuery = shouldTriggerQuery;
                this.searchTerms = [];
                this.$selectOperatorElm.val(0);
                this.flatInstance.clear();
            }
        };
        /**
         * destroy the filter
         */
        CompoundDateFilter.prototype.destroy = function () {
            if (this.$filterElm) {
                this.$filterElm.off('keyup').remove();
            }
        };
        /**
         * Set value(s) on the DOM element
         */
        CompoundDateFilter.prototype.setValues = function (values) {
            if (this.flatInstance && values && Array.isArray(values)) {
                this.flatInstance.setDate(values[0]);
            }
        };
        //
        // private functions
        // ------------------
        CompoundDateFilter.prototype.buildDatePickerInput = function (searchTerm) {
            var _this = this;
            var inputFormat = mapFlatpickrDateFormatWithFieldType(this.columnDef.type || exports.FieldType.dateIso);
            var outputFormat = mapFlatpickrDateFormatWithFieldType(this.columnDef.outputType || this.columnDef.type || exports.FieldType.dateUtc);
            var currentLocale = this.translate.currentLang || 'en';
            if (currentLocale.length > 2) {
                currentLocale = currentLocale.substring(0, 2);
            }
            var pickerOptions = {
                defaultDate: searchTerm || '',
                altInput: true,
                altFormat: outputFormat,
                dateFormat: inputFormat,
                wrap: true,
                closeOnSelect: true,
                locale: (currentLocale !== 'en') ? this.loadFlatpickrLocale(currentLocale) : 'en',
                onChange: function (selectedDates, dateStr, instance) {
                    _this._currentValue = dateStr;
                    // when using the time picker, we can simulate a keyup event to avoid multiple backend request
                    // since backend request are only executed after user start typing, changing the time should be treated the same way
                    if (pickerOptions.enableTime) {
                        _this.onTriggerEvent(new CustomEvent('keyup'));
                    }
                    else {
                        _this.onTriggerEvent(undefined);
                    }
                }
            };
            // add the time picker when format is UTC (Z) or has the 'h' (meaning hours)
            if (outputFormat && (outputFormat === 'Z' || outputFormat.toLowerCase().includes('h'))) {
                pickerOptions.enableTime = true;
            }
            // merge options with optional user's custom options
            var pickerMergedOptions = __assign({}, pickerOptions, this.columnFilter.filterOptions);
            var placeholder = (this.gridOptions) ? (this.gridOptions.defaultFilterPlaceholder || '') : '';
            if (this.columnFilter && this.columnFilter.placeholder) {
                placeholder = this.columnFilter.placeholder;
            }
            var $filterInputElm = $("<div class=\"flatpickr\"><input type=\"text\" class=\"form-control\" data-input placeholder=\"" + placeholder + "\"></div>");
            this.flatInstance = ($filterInputElm[0] && typeof $filterInputElm[0].flatpickr === 'function') ? $filterInputElm[0].flatpickr(pickerMergedOptions) : Flatpickr($filterInputElm, pickerMergedOptions);
            return $filterInputElm;
        };
        CompoundDateFilter.prototype.buildSelectOperatorHtmlString = function () {
            var optionValues = this.getOptionValues();
            var optionValueString = '';
            optionValues.forEach(function (option) {
                optionValueString += "<option value=\"" + option.operator + "\" title=\"" + option.description + "\">" + option.operator + "</option>";
            });
            return "<select class=\"form-control\">" + optionValueString + "</select>";
        };
        CompoundDateFilter.prototype.getOptionValues = function () {
            return [
                { operator: '', description: '' },
                { operator: '=', description: '' },
                { operator: '<', description: '' },
                { operator: '<=', description: '' },
                { operator: '>', description: '' },
                { operator: '>=', description: '' },
                { operator: '<>', description: '' }
            ];
        };
        /**
         * Create the DOM element
         */
        CompoundDateFilter.prototype.createDomElement = function (searchTerm) {
            var fieldId = this.columnDef && this.columnDef.id;
            var $headerElm = this.grid.getHeaderRowColumn(fieldId);
            $($headerElm).empty();
            // create the DOM Select dropdown for the Operator
            this.$selectOperatorElm = $(this.buildSelectOperatorHtmlString());
            this.$filterInputElm = this.buildDatePickerInput(searchTerm);
            var $filterContainerElm = $("<div class=\"form-group search-filter filter-" + fieldId + "\"></div>");
            var $containerInputGroup = $("<div class=\"input-group flatpickr\"></div>");
            var $operatorInputGroupAddon = $("<div class=\"input-group-addon input-group-prepend operator\"></div>");
            /* the DOM element final structure will be
              <div class="input-group">
                <div class="input-group-addon input-group-prepend operator">
                  <select class="form-control"></select>
                </div>
                <div class=flatpickr>
                  <input type="text" class="form-control" data-input>
                </div>
              </div>
            */
            $operatorInputGroupAddon.append(this.$selectOperatorElm);
            $containerInputGroup.append($operatorInputGroupAddon);
            $containerInputGroup.append(this.$filterInputElm);
            // create the DOM element & add an ID and filter class
            $filterContainerElm.append($containerInputGroup);
            $filterContainerElm.attr('id', "filter-" + fieldId);
            this.$filterInputElm.data('columnId', fieldId);
            if (this.operator) {
                this.$selectOperatorElm.val(this.operator);
            }
            // if there's a search term, we will add the "filled" class for styling purposes
            if (searchTerm) {
                $filterContainerElm.addClass('filled');
                this._currentValue = searchTerm;
            }
            // append the new DOM element to the header row
            if ($filterContainerElm && typeof $filterContainerElm.appendTo === 'function') {
                $filterContainerElm.appendTo($headerElm);
            }
            return $filterContainerElm;
        };
        CompoundDateFilter.prototype.loadFlatpickrLocale = function (locale) {
            // change locale if needed, Flatpickr reference: https://chmln.github.io/flatpickr/localization/
            if (this.gridOptions && this.gridOptions.params && this.gridOptions.params.flapickrLocale) {
                return this.gridOptions.params.flapickrLocale;
            }
            else if (locale !== 'en') {
                var localeDefault = require("flatpickr/dist/l10n/" + locale + ".js").default;
                return (localeDefault && localeDefault[locale]) ? localeDefault[locale] : 'en';
            }
            return 'en';
        };
        CompoundDateFilter.prototype.onTriggerEvent = function (e) {
            if (this._clearFilterTriggered) {
                this.callback(e, { columnDef: this.columnDef, clearFilterTriggered: this._clearFilterTriggered, shouldTriggerQuery: this._shouldTriggerQuery });
                this.$filterElm.removeClass('filled');
            }
            else {
                var selectedOperator = this.$selectOperatorElm.find('option:selected').text();
                (this._currentValue) ? this.$filterElm.addClass('filled') : this.$filterElm.removeClass('filled');
                this.callback(e, { columnDef: this.columnDef, searchTerms: (this._currentValue ? [this._currentValue] : null), operator: selectedOperator || '', shouldTriggerQuery: this._shouldTriggerQuery });
            }
            // reset both flags for next use
            this._clearFilterTriggered = false;
            this._shouldTriggerQuery = true;
        };
        CompoundDateFilter.prototype.hide = function () {
            if (this.flatInstance && typeof this.flatInstance.close === 'function') {
                this.flatInstance.close();
            }
        };
        CompoundDateFilter.prototype.show = function () {
            if (this.flatInstance && typeof this.flatInstance.open === 'function') {
                this.flatInstance.open();
            }
        };
        return CompoundDateFilter;
    }());

    var CompoundInputFilter = /** @class */ (function () {
        function CompoundInputFilter(translate) {
            this.translate = translate;
            this._clearFilterTriggered = false;
            this._shouldTriggerQuery = true;
            this._inputType = 'text';
        }
        Object.defineProperty(CompoundInputFilter.prototype, "gridOptions", {
            /** Getter for the Grid Options pulled through the Grid Object */
            get: function () {
                return (this.grid && this.grid.getOptions) ? this.grid.getOptions() : {};
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CompoundInputFilter.prototype, "columnFilter", {
            /** Getter for the Column Filter */
            get: function () {
                return this.columnDef && this.columnDef.filter || {};
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CompoundInputFilter.prototype, "inputType", {
            /** Getter of input type (text, number, password) */
            get: function () {
                return this._inputType;
            },
            /** Setter of input type (text, number, password) */
            set: function (type) {
                this._inputType = type;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CompoundInputFilter.prototype, "operator", {
            /** Getter of the Operator to use when doing the filter comparing */
            get: function () {
                return this._operator || exports.OperatorType.empty;
            },
            /** Getter of the Operator to use when doing the filter comparing */
            set: function (op) {
                this._operator = op;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Initialize the Filter
         */
        CompoundInputFilter.prototype.init = function (args) {
            var _this = this;
            this.grid = args.grid;
            this.callback = args.callback;
            this.columnDef = args.columnDef;
            this.operator = args.operator;
            this.searchTerms = args.searchTerms || [];
            // filter input can only have 1 search term, so we will use the 1st array index if it exist
            var searchTerm = (Array.isArray(this.searchTerms) && this.searchTerms[0]) || '';
            // step 1, create the DOM Element of the filter which contain the compound Operator+Input
            // and initialize it if searchTerms is filled
            this.$filterElm = this.createDomElement(searchTerm);
            // step 3, subscribe to the keyup event and run the callback when that happens
            // also add/remove "filled" class for styling purposes
            this.$filterInputElm.on('keyup input change', function (e) {
                _this.onTriggerEvent(e);
            });
            this.$selectOperatorElm.on('change', function (e) {
                _this.onTriggerEvent(e);
            });
        };
        /**
         * Clear the filter value
         */
        CompoundInputFilter.prototype.clear = function (shouldTriggerQuery) {
            if (shouldTriggerQuery === void 0) { shouldTriggerQuery = true; }
            if (this.$filterElm && this.$selectOperatorElm) {
                this._clearFilterTriggered = true;
                this._shouldTriggerQuery = shouldTriggerQuery;
                this.searchTerms = [];
                this.$selectOperatorElm.val(0);
                this.$filterInputElm.val('');
                this.onTriggerEvent(null);
            }
        };
        /**
         * destroy the filter
         */
        CompoundInputFilter.prototype.destroy = function () {
            if (this.$filterElm && this.$selectOperatorElm) {
                this.$filterElm.off('keyup input change').remove();
                this.$selectOperatorElm.off('change');
            }
        };
        /**
         * Set value(s) on the DOM element
         */
        CompoundInputFilter.prototype.setValues = function (values) {
            if (values && Array.isArray(values)) {
                this.$filterElm.val(values[0]);
            }
        };
        //
        // private functions
        // ------------------
        CompoundInputFilter.prototype.buildInputHtmlString = function () {
            var placeholder = (this.gridOptions) ? (this.gridOptions.defaultFilterPlaceholder || '') : '';
            if (this.columnFilter && this.columnFilter.placeholder) {
                placeholder = this.columnFilter.placeholder;
            }
            return "<input type=\"" + (this._inputType || 'text') + "\" role=\"presentation\"  autocomplete=\"off\" class=\"form-control\" placeholder=\"" + placeholder + "\" /><span></span>";
        };
        CompoundInputFilter.prototype.buildSelectOperatorHtmlString = function () {
            var optionValues = this.getOptionValues();
            var optionValueString = '';
            optionValues.forEach(function (option) {
                optionValueString += "<option value=\"" + option.operator + "\" title=\"" + option.description + "\">" + option.operator + "</option>";
            });
            return "<select class=\"form-control\">" + optionValueString + "</select>";
        };
        CompoundInputFilter.prototype.getOptionValues = function () {
            var type = (this.columnDef.type && this.columnDef.type) ? this.columnDef.type : exports.FieldType.string;
            var optionValues = [];
            switch (type) {
                case exports.FieldType.string:
                    optionValues = [
                        { operator: '', description: this.translate.instant('CONTAINS') },
                        { operator: '=', description: this.translate.instant('EQUALS') },
                        { operator: 'a*', description: this.translate.instant('STARTS_WITH') },
                        { operator: '*z', description: this.translate.instant('ENDS_WITH') },
                    ];
                    break;
                default:
                    optionValues = [
                        { operator: '', description: this.translate.instant('CONTAINS') },
                        { operator: '=', description: '' },
                        { operator: '<', description: '' },
                        { operator: '<=', description: '' },
                        { operator: '>', description: '' },
                        { operator: '>=', description: '' },
                        { operator: '<>', description: '' }
                    ];
                    break;
            }
            return optionValues;
        };
        /**
         * Create the DOM element
         */
        CompoundInputFilter.prototype.createDomElement = function (searchTerm) {
            var fieldId = this.columnDef && this.columnDef.id;
            var $headerElm = this.grid.getHeaderRowColumn(fieldId);
            $($headerElm).empty();
            // create the DOM Select dropdown for the Operator
            this.$selectOperatorElm = $(this.buildSelectOperatorHtmlString());
            this.$filterInputElm = $(this.buildInputHtmlString());
            var $filterContainerElm = $("<div class=\"form-group search-filter filter-" + fieldId + "\"></div>");
            var $containerInputGroup = $("<div class=\"input-group\"></div>");
            var $operatorInputGroupAddon = $("<div class=\"input-group-addon input-group-prepend operator\"></div>");
            /* the DOM element final structure will be
              <div class="input-group">
                <div class="input-group-addon input-group-prepend operator">
                  <select class="form-control"></select>
                </div>
                <input class="form-control" type="text" />
              </div>
            */
            $operatorInputGroupAddon.append(this.$selectOperatorElm);
            $containerInputGroup.append($operatorInputGroupAddon);
            $containerInputGroup.append(this.$filterInputElm);
            // create the DOM element & add an ID and filter class
            $filterContainerElm.append($containerInputGroup);
            $filterContainerElm.attr('id', "filter-" + fieldId);
            this.$filterInputElm.val(searchTerm);
            this.$filterInputElm.data('columnId', fieldId);
            if (this.operator) {
                this.$selectOperatorElm.val(this.operator);
            }
            // if there's a search term, we will add the "filled" class for styling purposes
            if (searchTerm) {
                $filterContainerElm.addClass('filled');
            }
            // append the new DOM element to the header row
            if ($filterContainerElm && typeof $filterContainerElm.appendTo === 'function') {
                $filterContainerElm.appendTo($headerElm);
            }
            return $filterContainerElm;
        };
        CompoundInputFilter.prototype.onTriggerEvent = function (e) {
            if (this._clearFilterTriggered) {
                this.callback(e, { columnDef: this.columnDef, clearFilterTriggered: this._clearFilterTriggered, shouldTriggerQuery: this._shouldTriggerQuery });
                this.$filterElm.removeClass('filled');
            }
            else {
                var selectedOperator = this.$selectOperatorElm.find('option:selected').text();
                var value = this.$filterInputElm.val();
                var enableWhiteSpaceTrim = this.gridOptions.enableFilterTrimWhiteSpace || this.columnFilter.enableTrimWhiteSpace;
                if (typeof value === 'string' && enableWhiteSpaceTrim) {
                    value = value.trim();
                }
                (value !== null && value !== undefined && value !== '') ? this.$filterElm.addClass('filled') : this.$filterElm.removeClass('filled');
                this.callback(e, { columnDef: this.columnDef, searchTerms: (value ? [value] : null), operator: selectedOperator || '', shouldTriggerQuery: this._shouldTriggerQuery });
            }
            // reset both flags for next use
            this._clearFilterTriggered = false;
            this._shouldTriggerQuery = true;
        };
        return CompoundInputFilter;
    }());

    var CompoundInputNumberFilter = /** @class */ (function (_super) {
        __extends(CompoundInputNumberFilter, _super);
        /** Initialize the Filter */
        function CompoundInputNumberFilter(translate) {
            var _this = _super.call(this, translate) || this;
            _this.translate = translate;
            _this.inputType = 'number';
            return _this;
        }
        return CompoundInputNumberFilter;
    }(CompoundInputFilter));

    var CompoundInputPasswordFilter = /** @class */ (function (_super) {
        __extends(CompoundInputPasswordFilter, _super);
        /** Initialize the Filter */
        function CompoundInputPasswordFilter(translate) {
            var _this = _super.call(this, translate) || this;
            _this.translate = translate;
            _this.inputType = 'password';
            return _this;
        }
        return CompoundInputPasswordFilter;
    }(CompoundInputFilter));

    var DEFAULT_MIN_VALUE = 0;
    var DEFAULT_MAX_VALUE = 100;
    var DEFAULT_STEP = 1;
    var CompoundSliderFilter = /** @class */ (function () {
        function CompoundSliderFilter() {
            this._clearFilterTriggered = false;
            this._shouldTriggerQuery = true;
        }
        Object.defineProperty(CompoundSliderFilter.prototype, "gridOptions", {
            /** Getter for the Grid Options pulled through the Grid Object */
            get: function () {
                return (this.grid && this.grid.getOptions) ? this.grid.getOptions() : {};
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CompoundSliderFilter.prototype, "filterParams", {
            /** Getter for the Filter Generic Params */
            get: function () {
                return this.columnDef && this.columnDef.filter && this.columnDef.filter.params || {};
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CompoundSliderFilter.prototype, "filterProperties", {
            /** Getter for the `filter` properties */
            get: function () {
                return this.columnDef && this.columnDef.filter;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CompoundSliderFilter.prototype, "operator", {
            get: function () {
                return this._operator || exports.OperatorType.empty;
            },
            set: function (op) {
                this._operator = op;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Initialize the Filter
         */
        CompoundSliderFilter.prototype.init = function (args) {
            var _this = this;
            if (args) {
                this.grid = args.grid;
                this.callback = args.callback;
                this.columnDef = args.columnDef;
                this.operator = args.operator || '';
                this.searchTerms = args.searchTerms || [];
                // define the input & slider number IDs
                this._elementRangeInputId = "rangeInput_" + this.columnDef.field;
                this._elementRangeOutputId = "rangeOutput_" + this.columnDef.field;
                // filter input can only have 1 search term, so we will use the 1st array index if it exist
                var searchTerm = (Array.isArray(this.searchTerms) && this.searchTerms[0]) || '';
                // step 1, create the DOM Element of the filter which contain the compound Operator+Input
                // and initialize it if searchTerm is filled
                this.$filterElm = this.createDomElement(searchTerm);
                // step 3, subscribe to the keyup event and run the callback when that happens
                // also add/remove "filled" class for styling purposes
                this.$filterInputElm.change(function (e) {
                    _this.onTriggerEvent(e);
                });
                this.$selectOperatorElm.change(function (e) {
                    _this.onTriggerEvent(e);
                });
                // if user chose to display the slider number on the right side, then update it every time it changes
                // we need to use both "input" and "change" event to be all cross-browser
                if (!this.filterParams.hideSliderNumber) {
                    this.$filterInputElm.on('input change', function (e) {
                        var value = e && e.target && e.target.value || '';
                        if (value) {
                            document.getElementById(_this._elementRangeOutputId).innerHTML = value;
                        }
                    });
                }
            }
        };
        /**
         * Clear the filter value
         */
        CompoundSliderFilter.prototype.clear = function (shouldTriggerQuery) {
            if (shouldTriggerQuery === void 0) { shouldTriggerQuery = true; }
            if (this.$filterElm && this.$selectOperatorElm) {
                this._clearFilterTriggered = true;
                this._shouldTriggerQuery = shouldTriggerQuery;
                this.searchTerms = [];
                var clearedValue = this.filterParams.hasOwnProperty('sliderStartValue') ? this.filterParams.sliderStartValue : DEFAULT_MIN_VALUE;
                this.$selectOperatorElm.val(0);
                this.$filterInputElm.val(clearedValue);
                if (!this.filterParams.hideSliderNumber) {
                    this.$containerInputGroupElm.children('div.input-group-addon.input-group-append').children().last().html(clearedValue);
                }
                this.onTriggerEvent(undefined);
                this.$filterElm.removeClass('filled');
            }
        };
        /**
         * destroy the filter
         */
        CompoundSliderFilter.prototype.destroy = function () {
            if (this.$filterElm) {
                this.$filterElm.off('input change').remove();
            }
        };
        /**
         * Set value(s) on the DOM element
         */
        CompoundSliderFilter.prototype.setValues = function (values) {
            if (values && Array.isArray(values)) {
                this.$filterInputElm.val(values[0]);
                this.$containerInputGroupElm.children('div.input-group-addon.input-group-append').children().last().html(values[0]);
            }
        };
        //
        // private functions
        // ------------------
        /** Build HTML Template for the input range (slider) */
        CompoundSliderFilter.prototype.buildTemplateHtmlString = function () {
            var minValue = this.filterProperties.hasOwnProperty('minValue') ? this.filterProperties.minValue : DEFAULT_MIN_VALUE;
            var maxValue = this.filterProperties.hasOwnProperty('maxValue') ? this.filterProperties.maxValue : DEFAULT_MAX_VALUE;
            var defaultValue = this.filterParams.hasOwnProperty('sliderStartValue') ? this.filterParams.sliderStartValue : minValue;
            var step = this.filterProperties.hasOwnProperty('valueStep') ? this.filterProperties.valueStep : DEFAULT_STEP;
            return "<input type=\"range\" id=\"" + this._elementRangeInputId + "\"\n              name=\"" + this._elementRangeInputId + "\"\n              defaultValue=\"" + defaultValue + "\" min=\"" + minValue + "\" max=\"" + maxValue + "\" step=\"" + step + "\"\n              class=\"form-control slider-filter-input range compound-slider\" />";
        };
        /** Build HTML Template for the text (number) that is shown appended to the slider */
        CompoundSliderFilter.prototype.buildTemplateSliderTextHtmlString = function () {
            var minValue = this.filterProperties.hasOwnProperty('minValue') ? this.filterProperties.minValue : DEFAULT_MIN_VALUE;
            var defaultValue = this.filterParams.hasOwnProperty('sliderStartValue') ? this.filterParams.sliderStartValue : minValue;
            return "<div class=\"input-group-addon input-group-append slider-value\"><span class=\"input-group-text\" id=\"" + this._elementRangeOutputId + "\">" + defaultValue + "</span></div>";
        };
        /** Build HTML Template select dropdown (operator) */
        CompoundSliderFilter.prototype.buildSelectOperatorHtmlString = function () {
            var optionValues = this.getOptionValues();
            var optionValueString = '';
            optionValues.forEach(function (option) {
                optionValueString += "<option value=\"" + option.operator + "\" title=\"" + option.description + "\">" + option.operator + "</option>";
            });
            return "<select class=\"form-control\">" + optionValueString + "</select>";
        };
        /** Get the available operator option values */
        CompoundSliderFilter.prototype.getOptionValues = function () {
            return [
                { operator: '', description: '' },
                { operator: '=', description: '' },
                { operator: '<', description: '' },
                { operator: '<=', description: '' },
                { operator: '>', description: '' },
                { operator: '>=', description: '' },
                { operator: '<>', description: '' }
            ];
        };
        /**
         * Create the DOM element
         */
        CompoundSliderFilter.prototype.createDomElement = function (searchTerm) {
            var fieldId = this.columnDef && this.columnDef.id;
            var searchTermInput = (searchTerm || '0');
            var $headerElm = this.grid.getHeaderRowColumn(this.columnDef.id);
            $($headerElm).empty();
            // create the DOM Select dropdown for the Operator
            this.$selectOperatorElm = $(this.buildSelectOperatorHtmlString());
            this.$filterInputElm = $(this.buildTemplateHtmlString());
            var $filterContainerElm = $("<div class=\"form-group search-filter filter-" + fieldId + "\"></div>");
            this.$containerInputGroupElm = $("<div class=\"input-group search-filter filter-" + fieldId + "\"></div>");
            var $operatorInputGroupAddon = $("<span class=\"input-group-addon input-group-prepend operator\"></span>");
            /* the DOM element final structure will be
              <div class="input-group">
                <div class="input-group-addon input-group-prepend operator">
                  <select class="form-control"></select>
                </div>
                <input class="form-control" type="text" />
                <div class="input-group-addon input-group-prepend" id="rangeOuput_percentComplete"><span class="input-group-text">0</span></div>
              </div>
            */
            $operatorInputGroupAddon.append(this.$selectOperatorElm);
            this.$containerInputGroupElm.append($operatorInputGroupAddon);
            this.$containerInputGroupElm.append(this.$filterInputElm);
            if (!this.filterParams.hideSliderNumber) {
                var $sliderTextInputAppendAddon = $(this.buildTemplateSliderTextHtmlString());
                $sliderTextInputAppendAddon.children().html(searchTermInput);
                this.$containerInputGroupElm.append($sliderTextInputAppendAddon);
            }
            // create the DOM element & add an ID and filter class
            $filterContainerElm.append(this.$containerInputGroupElm);
            $filterContainerElm.attr('id', "filter-" + fieldId);
            this.$filterInputElm.val(searchTermInput);
            this.$filterInputElm.data('columnId', fieldId);
            if (this.operator) {
                this.$selectOperatorElm.val(this.operator);
            }
            // if there's a search term, we will add the "filled" class for styling purposes
            if (searchTerm) {
                $filterContainerElm.addClass('filled');
            }
            // append the new DOM element to the header row
            if ($filterContainerElm && typeof $filterContainerElm.appendTo === 'function') {
                $filterContainerElm.appendTo($headerElm);
            }
            return $filterContainerElm;
        };
        CompoundSliderFilter.prototype.onTriggerEvent = function (e) {
            if (this._clearFilterTriggered) {
                this.callback(e, { columnDef: this.columnDef, clearFilterTriggered: this._clearFilterTriggered, shouldTriggerQuery: this._shouldTriggerQuery });
            }
            else {
                var selectedOperator = this.$selectOperatorElm.find('option:selected').text();
                var value = this.$filterInputElm.val();
                (value) ? this.$filterElm.addClass('filled') : this.$filterElm.removeClass('filled');
                this.callback(e, { columnDef: this.columnDef, searchTerms: (value ? [value] : null), operator: selectedOperator || '', shouldTriggerQuery: this._shouldTriggerQuery });
            }
            // reset both flags for next use
            this._clearFilterTriggered = false;
            this._shouldTriggerQuery = true;
        };
        return CompoundSliderFilter;
    }());

    var InputFilter = /** @class */ (function () {
        function InputFilter() {
            this._clearFilterTriggered = false;
            this._shouldTriggerQuery = true;
            this._inputType = 'text';
        }
        Object.defineProperty(InputFilter.prototype, "columnFilter", {
            /** Getter for the Column Filter */
            get: function () {
                return this.columnDef && this.columnDef.filter || {};
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(InputFilter.prototype, "inputType", {
            /** Getter of input type (text, number, password) */
            get: function () {
                return this._inputType;
            },
            /** Setter of input type (text, number, password) */
            set: function (type) {
                this._inputType = type;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(InputFilter.prototype, "operator", {
            /** Getter of the Operator to use when doing the filter comparing */
            get: function () {
                return this.columnDef && this.columnDef.filter && this.columnDef.filter.operator || '';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(InputFilter.prototype, "gridOptions", {
            /** Getter for the Grid Options pulled through the Grid Object */
            get: function () {
                return (this.grid && this.grid.getOptions) ? this.grid.getOptions() : {};
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Initialize the Filter
         */
        InputFilter.prototype.init = function (args) {
            var _this = this;
            this.grid = args.grid;
            this.callback = args.callback;
            this.columnDef = args.columnDef;
            this.searchTerms = args.searchTerms || [];
            // filter input can only have 1 search term, so we will use the 1st array index if it exist
            var searchTerm = (Array.isArray(this.searchTerms) && this.searchTerms[0]) || '';
            // step 1, create HTML string template
            var filterTemplate = this.buildTemplateHtmlString();
            // step 2, create the DOM Element of the filter & initialize it if searchTerm is filled
            this.$filterElm = this.createDomElement(filterTemplate, searchTerm);
            // step 3, subscribe to the keyup event and run the callback when that happens
            // also add/remove "filled" class for styling purposes
            this.$filterElm.on('keyup input change', function (e) {
                var value = e && e.target && e.target.value || '';
                var enableWhiteSpaceTrim = _this.gridOptions.enableFilterTrimWhiteSpace || _this.columnFilter.enableTrimWhiteSpace;
                if (typeof value === 'string' && enableWhiteSpaceTrim) {
                    value = value.trim();
                }
                if (_this._clearFilterTriggered) {
                    _this.callback(e, { columnDef: _this.columnDef, clearFilterTriggered: _this._clearFilterTriggered, shouldTriggerQuery: _this._shouldTriggerQuery });
                    _this.$filterElm.removeClass('filled');
                }
                else {
                    value === '' ? _this.$filterElm.removeClass('filled') : _this.$filterElm.addClass('filled');
                    _this.callback(e, { columnDef: _this.columnDef, operator: _this.operator, searchTerms: [value], shouldTriggerQuery: _this._shouldTriggerQuery });
                }
                // reset both flags for next use
                _this._clearFilterTriggered = false;
                _this._shouldTriggerQuery = true;
            });
        };
        /**
         * Clear the filter value
         */
        InputFilter.prototype.clear = function (shouldTriggerQuery) {
            if (shouldTriggerQuery === void 0) { shouldTriggerQuery = true; }
            if (this.$filterElm) {
                this._clearFilterTriggered = true;
                this._shouldTriggerQuery = shouldTriggerQuery;
                this.searchTerms = [];
                this.$filterElm.val('');
                this.$filterElm.trigger('keyup');
            }
        };
        /**
         * destroy the filter
         */
        InputFilter.prototype.destroy = function () {
            if (this.$filterElm) {
                this.$filterElm.off('keyup input change').remove();
            }
        };
        /**
         * Set value(s) on the DOM element
         */
        InputFilter.prototype.setValues = function (values) {
            if (values) {
                this.$filterElm.val(values);
            }
        };
        //
        // protected functions
        // ------------------
        /**
         * Create the HTML template as a string
         */
        InputFilter.prototype.buildTemplateHtmlString = function () {
            var fieldId = this.columnDef && this.columnDef.id;
            var placeholder = (this.gridOptions) ? (this.gridOptions.defaultFilterPlaceholder || '') : '';
            if (this.columnFilter && this.columnFilter.placeholder) {
                placeholder = this.columnFilter.placeholder;
            }
            return "<input type=\"" + (this._inputType || 'text') + "\" role=\"presentation\"  autocomplete=\"off\" class=\"form-control search-filter filter-" + fieldId + "\" placeholder=\"" + placeholder + "\"><span></span>";
        };
        /**
         * From the html template string, create a DOM element
         * @param filterTemplate
         */
        InputFilter.prototype.createDomElement = function (filterTemplate, searchTerm) {
            var fieldId = this.columnDef && this.columnDef.id;
            var $headerElm = this.grid.getHeaderRowColumn(fieldId);
            $($headerElm).empty();
            // create the DOM element & add an ID and filter class
            var $filterElm = $(filterTemplate);
            $filterElm.val(searchTerm);
            $filterElm.attr('id', "filter-" + fieldId);
            $filterElm.data('columnId', fieldId);
            // if there's a search term, we will add the "filled" class for styling purposes
            if (searchTerm) {
                $filterElm.addClass('filled');
            }
            // append the new DOM element to the header row
            if ($filterElm && typeof $filterElm.appendTo === 'function') {
                $filterElm.appendTo($headerElm);
            }
            return $filterElm;
        };
        return InputFilter;
    }());

    var InputMaskFilter = /** @class */ (function (_super) {
        __extends(InputMaskFilter, _super);
        /** Initialize the Filter */
        function InputMaskFilter() {
            var _this = _super.call(this) || this;
            _this.inputType = 'text';
            return _this;
        }
        Object.defineProperty(InputMaskFilter.prototype, "inputMask", {
            /** Getter of the input mask, when provided */
            get: function () {
                return this.columnDef.params && this.columnDef.params && this.columnDef.params.mask;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Override the Filter init used by SlickGrid
         */
        InputMaskFilter.prototype.init = function (args) {
            var _this = this;
            if (!args) {
                throw new Error('[Angular-SlickGrid] A filter must always have an "init()" with valid arguments.');
            }
            this.grid = args.grid;
            this.callback = args.callback;
            this.columnDef = args.columnDef;
            this.searchTerms = args.searchTerms || [];
            // filter input can only have 1 search term, so we will use the 1st array index if it exist
            var searchTerm = (Array.isArray(this.searchTerms) && this.searchTerms[0]) || '';
            // step 1, create HTML string template
            var filterTemplate = this.buildTemplateHtmlString();
            // step 2, create the DOM Element of the filter & initialize it if searchTerm is filled
            this.$filterElm = this.createDomElement(filterTemplate, searchTerm);
            // step 3, subscribe to the keyup event and run the callback when that happens
            // also add/remove "filled" class for styling purposes
            this.$filterElm.on('keyup input change', function (e) {
                var value = '';
                if (e && e.target && e.target.value) {
                    var targetValue = e.target.value;
                    var enableWhiteSpaceTrim = _this.gridOptions.enableFilterTrimWhiteSpace || _this.columnFilter.enableTrimWhiteSpace;
                    if (typeof targetValue === 'string' && enableWhiteSpaceTrim) {
                        targetValue = targetValue.trim();
                    }
                    // if it has a mask, we need to do a bit more work
                    // and replace the filter string by the masked output without triggering an event
                    var unmaskedValue = _this.unmaskValue(targetValue);
                    var maskedValue = _this.maskValue(unmaskedValue);
                    value = unmaskedValue;
                    if (e.keyCode >= 48) {
                        _this.$filterElm.val(maskedValue); // replace filter string with masked string
                        e.preventDefault();
                    }
                }
                if (_this._clearFilterTriggered) {
                    _this.callback(e, { columnDef: _this.columnDef, clearFilterTriggered: _this._clearFilterTriggered, shouldTriggerQuery: _this._shouldTriggerQuery });
                    _this.$filterElm.removeClass('filled');
                }
                else {
                    _this.$filterElm.addClass('filled');
                    _this.callback(e, { columnDef: _this.columnDef, operator: _this.operator, searchTerms: [value], shouldTriggerQuery: _this._shouldTriggerQuery });
                }
                // reset both flags for next use
                _this._clearFilterTriggered = false;
                _this._shouldTriggerQuery = true;
            });
        };
        /** From a regular string, we will use the mask to output a new string */
        InputMaskFilter.prototype.maskValue = function (inputValue) {
            var i = 0;
            var maskedValue = '';
            if (this.inputMask) {
                maskedValue = this.inputMask.replace(/[09A]/gi, function (match) {
                    // only replace the char when the mask is a 0 or 9 for a digit OR the mask is "A" and the char is a non-digit meaning a string char
                    if (((match === '0' || match === '9') && /\d+/g.test(inputValue[i])) // mask is 0 or 9 and value is a digit
                        || (match.toUpperCase() === 'A' && /[^\d]+/gi.test(inputValue[i])) // OR mask is an "A" and value is non-digit
                    ) {
                        return inputValue[i++] || '';
                    }
                    return '';
                });
            }
            return maskedValue;
        };
        /** From a masked string, we will remove the mask and make a regular string again */
        InputMaskFilter.prototype.unmaskValue = function (maskedValue) {
            // remove anything else but digits and chars from both the input mask and the input masked value for later comparison
            // e.g. (000) 000-0000 would return 0000000000
            var valueWithoutSymbols = maskedValue.replace(/[^0-9a-z]*/gi, '');
            var maskWithoutSymbols = this.inputMask.replace(/[^0-9a-z]*/gi, '');
            // then we can analyze if each char on each indexes equals what the mask requires, if not the char will be disregarded from the output
            // basically, if our mask is "0A0" and input value is "2ab", then only "2a" will be returned since the last char "b" is not part of the mask and is invalid
            var output = '';
            for (var i = 0; i < maskWithoutSymbols.length; i++) {
                if (valueWithoutSymbols[i]) {
                    if (((maskWithoutSymbols[i] === '0' || maskWithoutSymbols[i] === '9') && /\d+/g.test(valueWithoutSymbols[i])) // mask is 0 or 9 and value is a digit
                        || (maskWithoutSymbols[i].toUpperCase() === 'A' && /[^\d]+/gi.test(valueWithoutSymbols[i])) // OR mask is an "A" and value is non-digit
                    ) {
                        output += valueWithoutSymbols[i]; // valid and matches the Mask, so we can add it up to the string output
                    }
                }
            }
            return output;
        };
        return InputMaskFilter;
    }(InputFilter));

    var InputNumberFilter = /** @class */ (function (_super) {
        __extends(InputNumberFilter, _super);
        /** Initialize the Filter */
        function InputNumberFilter() {
            var _this = _super.call(this) || this;
            _this.inputType = 'number';
            return _this;
        }
        return InputNumberFilter;
    }(InputFilter));

    var InputPasswordFilter = /** @class */ (function (_super) {
        __extends(InputPasswordFilter, _super);
        /** Initialize the Filter */
        function InputPasswordFilter() {
            var _this = _super.call(this) || this;
            _this.inputType = 'password';
            return _this;
        }
        return InputPasswordFilter;
    }(InputFilter));

    var DOMPurify = DOMPurify_; // patch to fix rollup to work
    var SelectFilter = /** @class */ (function () {
        /**
         * Initialize the Filter
         */
        function SelectFilter(translate, collectionService, isMultipleSelect) {
            if (isMultipleSelect === void 0) { isMultipleSelect = true; }
            var _this = this;
            this.translate = translate;
            this.collectionService = collectionService;
            this.isMultipleSelect = isMultipleSelect;
            this._isFilterFirstRender = true;
            this._shouldTriggerQuery = true;
            this.isFilled = false;
            this.enableTranslateLabel = false;
            this.subscriptions = [];
            // default options used by this Filter, user can overwrite any of these by passing "otions"
            var options = {
                autoAdjustDropHeight: true,
                autoAdjustDropPosition: true,
                autoAdjustDropWidthByTextSize: true,
                container: 'body',
                filter: false,
                maxHeight: 275,
                single: true,
                textTemplate: function ($elm) {
                    // render HTML code or not, by default it is sanitized and won't be rendered
                    var isRenderHtmlEnabled = _this.columnDef && _this.columnDef.filter && _this.columnDef.filter.enableRenderHtml || false;
                    return isRenderHtmlEnabled ? $elm.text() : $elm.html();
                },
                onClose: function () {
                    // we will subscribe to the onClose event for triggering our callback
                    // also add/remove "filled" class for styling purposes
                    var selectedItems = _this.$filterElm.multipleSelect('getSelects');
                    if (Array.isArray(selectedItems) && selectedItems.length > 1 || (selectedItems.length === 1 && selectedItems[0] !== '')) {
                        _this.isFilled = true;
                        _this.$filterElm.addClass('filled').siblings('div .search-filter').addClass('filled');
                    }
                    else {
                        _this.isFilled = false;
                        _this.$filterElm.removeClass('filled');
                        _this.$filterElm.siblings('div .search-filter').removeClass('filled');
                    }
                    _this.callback(undefined, { columnDef: _this.columnDef, operator: _this.operator, searchTerms: selectedItems, shouldTriggerQuery: _this._shouldTriggerQuery });
                    // reset flag for next use
                    _this._shouldTriggerQuery = true;
                }
            };
            if (this.isMultipleSelect) {
                options.single = false;
                options.okButton = true;
                options.addTitle = true; // show tooltip of all selected items while hovering the filter
                options.countSelected = this.translate.instant('X_OF_Y_SELECTED');
                options.allSelected = this.translate.instant('ALL_SELECTED');
                options.selectAllText = this.translate.instant('SELECT_ALL');
                options.selectAllDelimiter = ['', '']; // remove default square brackets of default text "[Select All]" => "Select All"
            }
            this.defaultOptions = options;
        }
        Object.defineProperty(SelectFilter.prototype, "columnFilter", {
            /** Getter for the Column Filter itself */
            get: function () {
                return this.columnDef && this.columnDef.filter;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectFilter.prototype, "collectionOptions", {
            /** Getter for the Collection Options */
            get: function () {
                return this.columnDef && this.columnDef.filter && this.columnDef.filter.collectionOptions;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectFilter.prototype, "customStructure", {
            /** Getter for the Custom Structure if exist */
            get: function () {
                return this.columnDef && this.columnDef.filter && this.columnDef.filter.customStructure;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectFilter.prototype, "gridOptions", {
            /** Getter for the Grid Options pulled through the Grid Object */
            get: function () {
                return (this.grid && this.grid.getOptions) ? this.grid.getOptions() : {};
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectFilter.prototype, "operator", {
            /** Getter for the filter operator */
            get: function () {
                if (this.columnDef && this.columnDef.filter && this.columnDef.filter.operator) {
                    return this.columnDef && this.columnDef.filter && this.columnDef.filter.operator;
                }
                return this.isMultipleSelect ? exports.OperatorType.in : exports.OperatorType.equal;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Initialize the filter template
         */
        SelectFilter.prototype.init = function (args, isFilterFirstRender) {
            this._isFilterFirstRender = isFilterFirstRender;
            this.grid = args.grid;
            this.callback = args.callback;
            this.columnDef = args.columnDef;
            this.searchTerms = args.searchTerms || [];
            if (!this.grid || !this.columnDef || !this.columnFilter || (!this.columnFilter.collection && !this.columnFilter.collectionAsync)) {
                throw new Error("[Angular-SlickGrid] You need to pass a \"collection\" (or \"collectionAsync\") for the MultipleSelect/SingleSelect Filter to work correctly. Also each option should include a value/label pair (or value/labelKey when using Locale). For example:: { filter: model: Filters.multipleSelect, collection: [{ value: true, label: 'True' }, { value: false, label: 'False'}] }");
            }
            this.enableTranslateLabel = this.columnFilter.enableTranslateLabel;
            this.labelName = this.customStructure && this.customStructure.label || 'label';
            this.labelPrefixName = this.customStructure && this.customStructure.labelPrefix || 'labelPrefix';
            this.labelSuffixName = this.customStructure && this.customStructure.labelSuffix || 'labelSuffix';
            this.optionLabel = this.customStructure && this.customStructure.optionLabel || 'value';
            this.valueName = this.customStructure && this.customStructure.value || 'value';
            if (this.enableTranslateLabel && (!this.translate || typeof this.translate.instant !== 'function')) {
                throw new Error("[select-editor] The ngx-translate TranslateService is required for the Select Filter to work correctly");
            }
            // always render the Select (dropdown) DOM element, even if user passed a "collectionAsync",
            // if that is the case, the Select will simply be without any options but we still have to render it (else SlickGrid would throw an error)
            var newCollection = this.columnFilter.collection || [];
            this.renderDomElement(newCollection);
            // on every Filter which have a "collection" or a "collectionAsync"
            // we will add (or replace) a Subject to the "collectionAsync" property so that user has possibility to change the collection
            // if "collectionAsync" is already set by the user, it will resolve it first then after it will replace it with a Subject
            var collectionAsync = this.columnFilter && this.columnFilter.collectionAsync;
            if (collectionAsync) {
                this.renderOptionsAsync(collectionAsync); // create Subject after resolve (createCollectionAsyncSubject)
            }
        };
        /**
         * Clear the filter values
         */
        SelectFilter.prototype.clear = function (shouldTriggerQuery) {
            if (shouldTriggerQuery === void 0) { shouldTriggerQuery = true; }
            if (this.$filterElm && this.$filterElm.multipleSelect) {
                // reload the filter element by it's id, to make sure it's still a valid element (because of some issue in the GraphQL example)
                this.$filterElm.multipleSelect('setSelects', []);
                this.$filterElm.removeClass('filled');
                this.$filterElm.siblings('div .search-filter').removeClass('filled');
                this.searchTerms = [];
                this._shouldTriggerQuery = shouldTriggerQuery;
                this.callback(undefined, { columnDef: this.columnDef, clearFilterTriggered: true, shouldTriggerQuery: this._shouldTriggerQuery });
                // reset both flags for next use
                this._shouldTriggerQuery = true;
            }
        };
        /**
         * destroy the filter
         */
        SelectFilter.prototype.destroy = function () {
            if (this.$filterElm) {
                // remove event watcher
                this.$filterElm.off().remove();
                var elementClassName = this.elementName.toString().replace('.', '\\.'); // make sure to escape any dot "." from CSS class to avoid console error
                $("[name=" + elementClassName + "].ms-drop").remove();
            }
            // also dispose of all Subscriptions
            this.subscriptions = unsubscribeAllObservables(this.subscriptions);
        };
        /**
         * Set value(s) on the DOM element
         */
        SelectFilter.prototype.setValues = function (values) {
            if (values) {
                values = Array.isArray(values) ? values : [values];
                this.$filterElm.multipleSelect('setSelects', values);
            }
        };
        //
        // protected functions
        // ------------------
        /**
         * user might want to filter certain items of the collection
         * @param inputCollection
         * @return outputCollection filtered and/or sorted collection
         */
        SelectFilter.prototype.filterCollection = function (inputCollection) {
            var outputCollection = inputCollection;
            // user might want to filter certain items of the collection
            if (this.columnDef && this.columnFilter && this.columnFilter.collectionFilterBy) {
                var filterBy = this.columnFilter.collectionFilterBy;
                var filterCollectionBy = this.columnFilter.collectionOptions && this.columnFilter.collectionOptions.filterResultAfterEachPass || null;
                outputCollection = this.collectionService.filterCollection(outputCollection, filterBy, filterCollectionBy);
            }
            return outputCollection;
        };
        /**
         * user might want to sort the collection in a certain way
         * @param inputCollection
         * @return outputCollection filtered and/or sorted collection
         */
        SelectFilter.prototype.sortCollection = function (inputCollection) {
            var outputCollection = inputCollection;
            // user might want to sort the collection
            if (this.columnDef && this.columnFilter && this.columnFilter.collectionSortBy) {
                var sortBy = this.columnFilter.collectionSortBy;
                outputCollection = this.collectionService.sortCollection(this.columnDef, outputCollection, sortBy, this.enableTranslateLabel);
            }
            return outputCollection;
        };
        SelectFilter.prototype.renderOptionsAsync = function (collectionAsync) {
            return __awaiter(this, void 0, void 0, function () {
                var awaitedCollection;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            awaitedCollection = [];
                            if (!collectionAsync) return [3 /*break*/, 2];
                            return [4 /*yield*/, castToPromise(collectionAsync)];
                        case 1:
                            awaitedCollection = _a.sent();
                            this.renderDomElementFromCollectionAsync(awaitedCollection);
                            // because we accept Promises & HttpClient Observable only execute once
                            // we will re-create an RxJs Subject which will replace the "collectionAsync" which got executed once anyway
                            // doing this provide the user a way to call a "collectionAsync.next()"
                            this.createCollectionAsyncSubject();
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        };
        /** Create or recreate an Observable Subject and reassign it to the "collectionAsync" object so user can call a "collectionAsync.next()" on it */
        SelectFilter.prototype.createCollectionAsyncSubject = function () {
            var _this = this;
            var newCollectionAsync = new rxjs.Subject();
            this.columnFilter.collectionAsync = newCollectionAsync;
            this.subscriptions.push(newCollectionAsync.subscribe(function (collection) { return _this.renderDomElementFromCollectionAsync(collection); }));
        };
        /**
         * When user use a CollectionAsync we will use the returned collection to render the filter DOM element
         * and reinitialize filter collection with this new collection
         */
        SelectFilter.prototype.renderDomElementFromCollectionAsync = function (collection) {
            if (this.collectionOptions && this.collectionOptions.collectionInObjectProperty) {
                collection = getDescendantProperty(collection, this.collectionOptions.collectionInObjectProperty);
            }
            if (!Array.isArray(collection)) {
                throw new Error('Something went wrong while trying to pull the collection from the "collectionAsync" call in the Select Filter, the collection is not a valid array.');
            }
            // copy over the array received from the async call to the "collection" as the new collection to use
            // this has to be BEFORE the `collectionObserver().subscribe` to avoid going into an infinite loop
            this.columnFilter.collection = collection;
            // recreate Multiple Select after getting async collection
            this.renderDomElement(collection);
        };
        SelectFilter.prototype.renderDomElement = function (collection) {
            if (!Array.isArray(collection) && this.collectionOptions && this.collectionOptions.collectionInObjectProperty) {
                collection = getDescendantProperty(collection, this.collectionOptions.collectionInObjectProperty);
            }
            if (!Array.isArray(collection)) {
                throw new Error('The "collection" passed to the Select Filter is not a valid array');
            }
            // user can optionally add a blank entry at the beginning of the collection
            if (this.collectionOptions && this.collectionOptions.addBlankEntry && this._isFilterFirstRender) {
                collection.unshift(this.createBlankEntry());
            }
            var newCollection = collection;
            // user might want to filter and/or sort certain items of the collection
            newCollection = this.filterCollection(newCollection);
            newCollection = this.sortCollection(newCollection);
            // step 1, create HTML string template
            var filterTemplate = this.buildTemplateHtmlString(newCollection, this.searchTerms);
            // step 2, create the DOM Element of the filter & pre-load search terms
            // also subscribe to the onClose event
            this.createDomElement(filterTemplate);
        };
        /**
         * Create the HTML template as a string
         */
        SelectFilter.prototype.buildTemplateHtmlString = function (optionCollection, searchTerms) {
            var _this = this;
            var options = '';
            var fieldId = this.columnDef && this.columnDef.id;
            var separatorBetweenLabels = this.collectionOptions && this.collectionOptions.separatorBetweenTextLabels || '';
            var isRenderHtmlEnabled = this.columnFilter && this.columnFilter.enableRenderHtml || false;
            var sanitizedOptions = this.gridOptions && this.gridOptions.sanitizeHtmlOptions || {};
            // collection could be an Array of Strings OR Objects
            if (optionCollection.every(function (x) { return typeof x === 'string'; })) {
                optionCollection.forEach(function (option) {
                    var selected = (searchTerms.findIndex(function (term) { return term === option; }) >= 0) ? 'selected' : '';
                    options += "<option value=\"" + option + "\" label=\"" + option + "\" " + selected + ">" + option + "</option>";
                    // if there's at least 1 search term found, we will add the "filled" class for styling purposes
                    if (selected) {
                        _this.isFilled = true;
                    }
                });
            }
            else {
                // array of objects will require a label/value pair unless a customStructure is passed
                optionCollection.forEach(function (option) {
                    if (!option || (option[_this.labelName] === undefined && option.labelKey === undefined)) {
                        throw new Error("[select-filter] A collection with value/label (or value/labelKey when using Locale) is required to populate the Select list, for example:: { filter: model: Filters.multipleSelect, collection: [ { value: '1', label: 'One' } ]')");
                    }
                    var labelKey = (option.labelKey || option[_this.labelName]);
                    var selected = (searchTerms.findIndex(function (term) { return term === option[_this.valueName]; }) >= 0) ? 'selected' : '';
                    var labelText = ((option.labelKey || _this.enableTranslateLabel) && labelKey) ? _this.translate.instant(labelKey || ' ') : labelKey;
                    var prefixText = option[_this.labelPrefixName] || '';
                    var suffixText = option[_this.labelSuffixName] || '';
                    var optionLabel = option[_this.optionLabel] || '';
                    optionLabel = optionLabel.toString().replace(/\"/g, '\''); // replace double quotes by single quotes to avoid interfering with regular html
                    // also translate prefix/suffix if enableTranslateLabel is true and text is a string
                    prefixText = (_this.enableTranslateLabel && prefixText && typeof prefixText === 'string') ? _this.translate.instant(prefixText || ' ') : prefixText;
                    suffixText = (_this.enableTranslateLabel && suffixText && typeof suffixText === 'string') ? _this.translate.instant(suffixText || ' ') : suffixText;
                    optionLabel = (_this.enableTranslateLabel && optionLabel && typeof optionLabel === 'string') ? _this.translate.instant(optionLabel || ' ') : optionLabel;
                    // add to a temp array for joining purpose and filter out empty text
                    var tmpOptionArray = [prefixText, labelText, suffixText].filter(function (text) { return text; });
                    var optionText = tmpOptionArray.join(separatorBetweenLabels);
                    // if user specifically wants to render html text, he needs to opt-in else it will stripped out by default
                    // also, the 3rd party lib will saninitze any html code unless it's encoded, so we'll do that
                    if (isRenderHtmlEnabled) {
                        // sanitize any unauthorized html tags like script and others
                        // for the remaining allowed tags we'll permit all attributes
                        var sanitizedText = DOMPurify.sanitize(optionText, sanitizedOptions);
                        optionText = htmlEncode(sanitizedText);
                    }
                    // html text of each select option
                    options += "<option value=\"" + option[_this.valueName] + "\" label=\"" + optionLabel + "\" " + selected + ">" + optionText + "</option>";
                    // if there's at least 1 search term found, we will add the "filled" class for styling purposes
                    if (selected) {
                        _this.isFilled = true;
                    }
                });
            }
            return "<select class=\"ms-filter search-filter filter-" + fieldId + "\" " + (this.isMultipleSelect ? 'multiple="multiple"' : '') + ">" + options + "</select>";
        };
        /** Create a blank entry that can be added to the collection. It will also reuse the same customStructure if need be */
        SelectFilter.prototype.createBlankEntry = function () {
            var _a;
            var blankEntry = (_a = {},
                _a[this.labelName] = '',
                _a[this.valueName] = '',
                _a);
            if (this.labelPrefixName) {
                blankEntry[this.labelPrefixName] = '';
            }
            if (this.labelSuffixName) {
                blankEntry[this.labelSuffixName] = '';
            }
            return blankEntry;
        };
        /**
         * From the html template string, create a DOM element
         * Subscribe to the onClose event and run the callback when that happens
         * @param filterTemplate
         */
        SelectFilter.prototype.createDomElement = function (filterTemplate) {
            var fieldId = this.columnDef && this.columnDef.id;
            // provide the name attribute to the DOM element which will be needed to auto-adjust drop position (dropup / dropdown)
            this.elementName = "filter-" + fieldId;
            this.defaultOptions.name = this.elementName;
            var $headerElm = this.grid.getHeaderRowColumn(fieldId);
            $($headerElm).empty();
            // create the DOM element & add an ID and filter class
            this.$filterElm = $(filterTemplate);
            if (typeof this.$filterElm.multipleSelect !== 'function') {
                throw new Error("multiple-select.js was not found, make sure to modify your \"angular-cli.json\" file and include \"../node_modules/angular-slickgrid/lib/multiple-select/multiple-select.js\" and it's css or SASS file");
            }
            this.$filterElm.attr('id', this.elementName);
            this.$filterElm.attr('name', this.elementName);
            this.$filterElm.data('columnId', fieldId);
            // if there's a search term, we will add the "filled" class for styling purposes
            if (this.isFilled) {
                this.$filterElm.addClass('filled');
            }
            // append the new DOM element to the header row
            if (this.$filterElm && typeof this.$filterElm.appendTo === 'function') {
                this.$filterElm.appendTo($headerElm);
            }
            // merge options & attach multiSelect
            var elementOptions = __assign({}, this.defaultOptions, this.columnFilter.filterOptions);
            this.filterElmOptions = __assign({}, this.defaultOptions, elementOptions);
            this.$filterElm = this.$filterElm.multipleSelect(this.filterElmOptions);
        };
        return SelectFilter;
    }());

    var MultipleSelectFilter = /** @class */ (function (_super) {
        __extends(MultipleSelectFilter, _super);
        /**
         * Initialize the Filter
         */
        function MultipleSelectFilter(translate, collectionService) {
            var _this = _super.call(this, translate, collectionService, true) || this;
            _this.translate = translate;
            _this.collectionService = collectionService;
            return _this;
        }
        return MultipleSelectFilter;
    }(SelectFilter));

    var NativeSelectFilter = /** @class */ (function () {
        function NativeSelectFilter(translate) {
            this.translate = translate;
            this._clearFilterTriggered = false;
            this._shouldTriggerQuery = true;
        }
        Object.defineProperty(NativeSelectFilter.prototype, "operator", {
            get: function () {
                return (this.columnDef && this.columnDef.filter && this.columnDef.filter.operator) || exports.OperatorType.equal;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Initialize the Filter
         */
        NativeSelectFilter.prototype.init = function (args) {
            var _this = this;
            this.grid = args.grid;
            this.callback = args.callback;
            this.columnDef = args.columnDef;
            this.searchTerms = args.searchTerms || [];
            // filter input can only have 1 search term, so we will use the 1st array index if it exist
            var searchTerm = (Array.isArray(this.searchTerms) && this.searchTerms[0]) || '';
            if (typeof searchTerm === 'boolean' || typeof searchTerm === 'number') {
                searchTerm = "" + searchTerm;
            }
            // step 1, create HTML string template
            var filterTemplate = this.buildTemplateHtmlString();
            // step 2, create the DOM Element of the filter & initialize it if searchTerm is filled
            this.$filterElm = this.createDomElement(filterTemplate, searchTerm);
            // step 3, subscribe to the change event and run the callback when that happens
            // also add/remove "filled" class for styling purposes
            this.$filterElm.change(function (e) {
                var value = e && e.target && e.target.value || '';
                if (_this._clearFilterTriggered) {
                    _this.callback(e, { columnDef: _this.columnDef, clearFilterTriggered: _this._clearFilterTriggered, shouldTriggerQuery: _this._shouldTriggerQuery });
                    _this.$filterElm.removeClass('filled');
                }
                else {
                    value === '' ? _this.$filterElm.removeClass('filled') : _this.$filterElm.addClass('filled');
                    _this.callback(e, { columnDef: _this.columnDef, operator: _this.operator, searchTerms: [value], shouldTriggerQuery: _this._shouldTriggerQuery });
                }
                // reset both flags for next use
                _this._clearFilterTriggered = false;
                _this._shouldTriggerQuery = true;
            });
        };
        /**
         * Clear the filter values
         */
        NativeSelectFilter.prototype.clear = function (shouldTriggerQuery) {
            if (shouldTriggerQuery === void 0) { shouldTriggerQuery = true; }
            if (this.$filterElm) {
                this._clearFilterTriggered = true;
                this._shouldTriggerQuery = shouldTriggerQuery;
                this.searchTerms = [];
                this.$filterElm.val('');
                this.$filterElm.trigger('change');
            }
        };
        /**
         * destroy the filter
         */
        NativeSelectFilter.prototype.destroy = function () {
            if (this.$filterElm) {
                this.$filterElm.off('change').remove();
            }
        };
        /**
         * Set value(s) on the DOM element
         */
        NativeSelectFilter.prototype.setValues = function (values) {
            if (values) {
                this.$filterElm.val(values);
            }
        };
        //
        // private functions
        // ------------------
        NativeSelectFilter.prototype.buildTemplateHtmlString = function () {
            var _this = this;
            if (!this.columnDef || !this.columnDef.filter || !this.columnDef.filter.collection) {
                throw new Error("[Angular-SlickGrid] You need to pass a \"collection\" for the Select Filter to work correctly. Also each option should include a value/label pair (or value/labelKey when using Locale). For example:: { filter: model: Filters.select, collection: [{ value: true, label: 'True' }, { value: false, label: 'False'}] }");
            }
            var fieldId = this.columnDef && this.columnDef.id;
            var optionCollection = this.columnDef.filter.collection || [];
            var labelName = (this.columnDef.filter.customStructure) ? this.columnDef.filter.customStructure.label : 'label';
            var valueName = (this.columnDef.filter.customStructure) ? this.columnDef.filter.customStructure.value : 'value';
            var options = '';
            // collection could be an Array of Strings OR Objects
            if (optionCollection.every(function (x) { return typeof x === 'string'; })) {
                optionCollection.forEach(function (option) {
                    options += "<option value=\"" + option + "\" label=\"" + option + "\">" + option + "</option>";
                });
            }
            else {
                optionCollection.forEach(function (option) {
                    if (!option || (option[labelName] === undefined && option.labelKey === undefined)) {
                        throw new Error("A collection with value/label (or value/labelKey when using Locale) is required to populate the Select list, for example:: { filter: model: Filters.select, collection: [ { value: '1', label: 'One' } ]')");
                    }
                    var labelKey = option.labelKey || option[labelName];
                    var textLabel = ((option.labelKey || _this.columnDef.filter.enableTranslateLabel) && _this.translate && typeof _this.translate.instant === 'function') ? _this.translate.instant(labelKey || ' ') : labelKey;
                    options += "<option value=\"" + option[valueName] + "\">" + textLabel + "</option>";
                });
            }
            return "<select class=\"form-control search-filter filter-" + fieldId + "\">" + options + "</select>";
        };
        /**
         * From the html template string, create a DOM element
         * @param filterTemplate
         */
        NativeSelectFilter.prototype.createDomElement = function (filterTemplate, searchTerm) {
            var fieldId = this.columnDef && this.columnDef.id;
            var $headerElm = this.grid.getHeaderRowColumn(fieldId);
            $($headerElm).empty();
            // create the DOM element & add an ID and filter class
            var $filterElm = $(filterTemplate);
            var searchTermInput = (searchTerm || '');
            $filterElm.val(searchTermInput);
            $filterElm.attr('id', "filter-" + fieldId);
            $filterElm.data('columnId', fieldId);
            // append the new DOM element to the header row
            if ($filterElm && typeof $filterElm.appendTo === 'function') {
                $filterElm.appendTo($headerElm);
            }
            return $filterElm;
        };
        return NativeSelectFilter;
    }());

    var SingleSelectFilter = /** @class */ (function (_super) {
        __extends(SingleSelectFilter, _super);
        /**
         * Initialize the Filter
         */
        function SingleSelectFilter(translate, collectionService) {
            var _this = _super.call(this, translate, collectionService, false) || this;
            _this.translate = translate;
            _this.collectionService = collectionService;
            return _this;
        }
        return SingleSelectFilter;
    }(SelectFilter));

    var DEFAULT_MIN_VALUE$1 = 0;
    var DEFAULT_MAX_VALUE$1 = 100;
    var DEFAULT_STEP$1 = 1;
    var SliderFilter = /** @class */ (function () {
        function SliderFilter() {
            this._clearFilterTriggered = false;
            this._shouldTriggerQuery = true;
        }
        Object.defineProperty(SliderFilter.prototype, "filterParams", {
            /** Getter for the Filter Generic Params */
            get: function () {
                return this.columnDef && this.columnDef.filter && this.columnDef.filter.params || {};
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SliderFilter.prototype, "filterProperties", {
            /** Getter for the `filter` properties */
            get: function () {
                return this.columnDef && this.columnDef.filter;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SliderFilter.prototype, "operator", {
            get: function () {
                return (this.columnDef && this.columnDef.filter && this.columnDef.filter.operator) || exports.OperatorType.equal;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Initialize the Filter
         */
        SliderFilter.prototype.init = function (args) {
            var _this = this;
            if (!args) {
                throw new Error('[Angular-SlickGrid] A filter must always have an "init()" with valid arguments.');
            }
            this.grid = args.grid;
            this.callback = args.callback;
            this.columnDef = args.columnDef;
            this.searchTerms = args.searchTerms || [];
            // define the input & slider number IDs
            this._elementRangeInputId = "rangeInput_" + this.columnDef.field;
            this._elementRangeOutputId = "rangeOutput_" + this.columnDef.field;
            // filter input can only have 1 search term, so we will use the 1st array index if it exist
            var searchTerm = (Array.isArray(this.searchTerms) && this.searchTerms[0]) || '';
            // step 1, create HTML string template
            var filterTemplate = this.buildTemplateHtmlString();
            // step 2, create the DOM Element of the filter & initialize it if searchTerm is filled
            this.$filterElm = this.createDomElement(filterTemplate, searchTerm);
            // step 3, subscribe to the change event and run the callback when that happens
            // also add/remove "filled" class for styling purposes
            this.$filterElm.change(function (e) {
                var value = e && e.target && e.target.value || '';
                if (_this._clearFilterTriggered) {
                    _this.callback(e, { columnDef: _this.columnDef, clearFilterTriggered: _this._clearFilterTriggered, shouldTriggerQuery: _this._shouldTriggerQuery });
                    _this.$filterElm.removeClass('filled');
                }
                else {
                    value === '' ? _this.$filterElm.removeClass('filled') : _this.$filterElm.addClass('filled');
                    _this.callback(e, { columnDef: _this.columnDef, operator: _this.operator, searchTerms: [value], shouldTriggerQuery: _this._shouldTriggerQuery });
                }
                // reset both flags for next use
                _this._clearFilterTriggered = false;
                _this._shouldTriggerQuery = true;
            });
            // if user chose to display the slider number on the right side, then update it every time it changes
            // we need to use both "input" and "change" event to be all cross-browser
            if (!this.filterParams.hideSliderNumber) {
                this.$filterElm.on('input change', function (e) {
                    var value = e && e.target && e.target.value || '';
                    if (value) {
                        document.getElementById(_this._elementRangeOutputId).innerHTML = value;
                    }
                });
            }
        };
        /**
         * Clear the filter value
         */
        SliderFilter.prototype.clear = function (shouldTriggerQuery) {
            if (shouldTriggerQuery === void 0) { shouldTriggerQuery = true; }
            if (this.$filterElm) {
                this._clearFilterTriggered = true;
                this._shouldTriggerQuery = shouldTriggerQuery;
                this.searchTerms = [];
                var clearedValue = this.filterParams.hasOwnProperty('sliderStartValue') ? this.filterParams.sliderStartValue : DEFAULT_MIN_VALUE$1;
                this.$filterElm.children('input').val(clearedValue);
                this.$filterElm.children('div.input-group-addon.input-group-append').children().html(clearedValue);
                this.$filterElm.trigger('change');
            }
        };
        /**
         * destroy the filter
         */
        SliderFilter.prototype.destroy = function () {
            if (this.$filterElm) {
                this.$filterElm.off('change').remove();
            }
        };
        /**
         * Set value(s) on the DOM element
         */
        SliderFilter.prototype.setValues = function (values) {
            if (values) {
                this.$filterElm.val(values);
            }
        };
        //
        // private functions
        // ------------------
        /**
         * Create the HTML template as a string
         */
        SliderFilter.prototype.buildTemplateHtmlString = function () {
            var fieldId = this.columnDef && this.columnDef.id;
            var minValue = this.filterProperties.hasOwnProperty('minValue') ? this.filterProperties.minValue : DEFAULT_MIN_VALUE$1;
            var maxValue = this.filterProperties.hasOwnProperty('maxValue') ? this.filterProperties.maxValue : DEFAULT_MAX_VALUE$1;
            var defaultValue = this.filterParams.hasOwnProperty('sliderStartValue') ? this.filterParams.sliderStartValue : minValue;
            var step = this.filterProperties.hasOwnProperty('valueStep') ? this.filterProperties.valueStep : DEFAULT_STEP$1;
            if (this.filterParams.hideSliderNumber) {
                return "\n      <div class=\"search-filter filter-" + fieldId + "\">\n        <input type=\"range\" id=\"" + this._elementRangeInputId + "\"\n          name=\"" + this._elementRangeInputId + "\"\n          defaultValue=\"" + defaultValue + "\" min=\"" + minValue + "\" max=\"" + maxValue + "\" step=\"" + step + "\"\n          class=\"form-control slider-filter-input range\" />\n      </div>";
            }
            return "\n      <div class=\"input-group search-filter filter-" + fieldId + "\">\n        <input type=\"range\" id=\"" + this._elementRangeInputId + "\"\n          name=\"" + this._elementRangeInputId + "\"\n          defaultValue=\"" + defaultValue + "\" min=\"" + minValue + "\" max=\"" + maxValue + "\" step=\"" + step + "\"\n          class=\"form-control slider-filter-input range\" />\n        <div class=\"input-group-addon input-group-append slider-value\">\n          <span class=\"input-group-text\" id=\"" + this._elementRangeOutputId + "\">" + defaultValue + "</span>\n        </div>\n      </div>";
        };
        /**
         * From the html template string, create a DOM element
         * @param filterTemplate
         */
        SliderFilter.prototype.createDomElement = function (filterTemplate, searchTerm) {
            var fieldId = this.columnDef && this.columnDef.id;
            var $headerElm = this.grid.getHeaderRowColumn(fieldId);
            $($headerElm).empty();
            // create the DOM element & add an ID and filter class
            var $filterElm = $(filterTemplate);
            var searchTermInput = (searchTerm || '0');
            $filterElm.children('input').val(searchTermInput);
            $filterElm.children('div.input-group-addon.input-group-append').children().html(searchTermInput);
            $filterElm.attr('id', "filter-" + fieldId);
            $filterElm.data('columnId', fieldId);
            // if there's a search term, we will add the "filled" class for styling purposes
            if (searchTerm) {
                $filterElm.addClass('filled');
            }
            // append the new DOM element to the header row
            if ($filterElm && typeof $filterElm.appendTo === 'function') {
                $filterElm.appendTo($headerElm);
            }
            return $filterElm;
        };
        return SliderFilter;
    }());

    var Filters = {
        /** AutoComplete Filter (using jQuery UI autocomplete feature) */
        autoComplete: AutoCompleteFilter,
        /** Compound Date Filter (compound of Operator + Date picker) */
        compoundDate: CompoundDateFilter,
        /** Alias to compoundInputText to Compound Input Filter (compound of Operator + Input Text) */
        compoundInput: CompoundInputFilter,
        /** Compound Input Number Filter (compound of Operator + Input of type Number) */
        compoundInputNumber: CompoundInputNumberFilter,
        /** Compound Input Password Filter (compound of Operator + Input of type Password, also note that only the text shown in the UI will be masked, filter query is still plain text) */
        compoundInputPassword: CompoundInputPasswordFilter,
        /** Compound Input Text Filter (compound of Operator + Input Text) */
        compoundInputText: CompoundInputFilter,
        /** Compound Slider Filter (compound of Operator + Slider) */
        compoundSlider: CompoundSliderFilter,
        /** Alias to inputText, input type text filter */
        input: InputFilter,
        /**
         * Input Filter of type text that will be formatted with a mask output
         * e.g.: column: { filter: { model: Filters.inputMask }, params: { mask: '(000) 000-0000' }}
         */
        inputMask: InputMaskFilter,
        /** Input Filter of type Number */
        inputNumber: InputNumberFilter,
        /** Input Filter of type Password (note that only the text shown in the UI will be masked, filter query is still plain text) */
        inputPassword: InputPasswordFilter,
        /** Default Filter, input type text filter */
        inputText: InputFilter,
        /** Multiple Select filter, which uses 3rd party lib "multiple-select.js" */
        multipleSelect: MultipleSelectFilter,
        /** Select filter, which uses native DOM element select */
        select: NativeSelectFilter,
        /** Single Select filter, which uses 3rd party lib "multiple-select.js" */
        singleSelect: SingleSelectFilter,
        /** Slider Filter */
        slider: SliderFilter,
    };

    /**
     * Options that can be passed to the Bootstrap-Datetimepicker directly
     */
    var GlobalGridOptions = {
        alwaysShowVerticalScroll: true,
        autoEdit: false,
        asyncEditorLoading: false,
        autoFitColumnsOnFirstLoad: true,
        autoResize: {
            calculateAvailableSizeBy: 'window',
            bottomPadding: 20,
            minHeight: 180,
            minWidth: 300,
            sidePadding: 0
        },
        cellHighlightCssClass: 'slick-cell-modified',
        checkboxSelector: {
            cssClass: 'slick-cell-checkboxsel'
        },
        columnPicker: {
            hideForceFitButton: false,
            hideSyncResizeButton: true
        },
        datasetIdPropertyName: 'id',
        defaultFilter: Filters.input,
        enableFilterTrimWhiteSpace: false,
        defaultFilterPlaceholder: '&#128269;',
        editable: false,
        enableAutoResize: true,
        enableAutoSizeColumns: true,
        enableCellNavigation: false,
        enableColumnPicker: true,
        enableColumnReorder: true,
        enableExport: true,
        enableGridMenu: true,
        enableHeaderMenu: true,
        enableMouseHoverHighlightRow: true,
        enableSorting: true,
        enableTextSelectionOnCells: true,
        explicitInitialization: true,
        exportOptions: {
            delimiter: exports.DelimiterType.comma,
            exportWithFormatter: false,
            filename: 'export',
            format: exports.FileType.csv,
            groupingAggregatorRowText: '',
            sanitizeDataExport: false,
            useUtf8WithBom: true
        },
        forceFitColumns: false,
        gridMenu: {
            hideClearAllFiltersCommand: false,
            hideClearAllSortingCommand: false,
            hideExportCsvCommand: false,
            hideExportTextDelimitedCommand: true,
            hideForceFitButton: false,
            hideRefreshDatasetCommand: false,
            hideSyncResizeButton: true,
            hideToggleFilterCommand: false,
            hideTogglePreHeaderCommand: false,
            iconCssClass: 'fa fa-bars',
            iconClearAllFiltersCommand: 'fa fa-filter text-danger',
            iconClearAllSortingCommand: 'fa fa-unsorted text-danger',
            iconExportCsvCommand: 'fa fa-download',
            iconExportTextDelimitedCommand: 'fa fa-download',
            iconRefreshDatasetCommand: 'fa fa-refresh',
            iconToggleFilterCommand: 'fa fa-random',
            iconTogglePreHeaderCommand: 'fa fa-random',
            menuWidth: 16,
            resizeOnShowHeaderRow: true
        },
        headerMenu: {
            autoAlign: true,
            autoAlignOffset: 12,
            minWidth: 140,
            iconClearFilterCommand: 'fa fa-filter text-danger',
            iconClearSortCommand: 'fa fa-unsorted',
            iconSortAscCommand: 'fa fa-sort-amount-asc',
            iconSortDescCommand: 'fa fa-sort-amount-desc',
            iconColumnHideCommand: 'fa fa-times',
            hideColumnHideCommand: false,
            hideClearFilterCommand: false,
            hideClearSortCommand: false,
            hideSortCommands: false
        },
        headerRowHeight: 35,
        multiColumnSort: true,
        numberedMultiColumnSort: true,
        tristateMultiColumnSort: false,
        sortColNumberInSeparateSpan: true,
        suppressActiveCellChangeOnEdit: true,
        pagination: {
            pageSizes: [10, 15, 20, 25, 30, 40, 50, 75, 100],
            pageSize: 25,
            totalItems: 0
        },
        rowDetailView: {
            cssClass: 'detail-view-toggle',
            panelRows: 1,
            keyPrefix: '__',
            useRowClick: true,
            useSimpleViewportCalc: true,
            saveDetailViewOnScroll: false,
            // the following 2 property/method should always be override by the user
            process: function () { return new Promise(function (resolve) { return resolve(''); }); },
            viewComponent: null
        },
        rowHeight: 35,
        topPanelHeight: 35
    };

    var SlickgridConfig = /** @class */ (function () {
        function SlickgridConfig() {
            this.options = GlobalGridOptions;
        }
        return SlickgridConfig;
    }());

    var FilterFactory = /** @class */ (function () {
        function FilterFactory(config, translate, collectionService) {
            this.config = config;
            this.translate = translate;
            this.collectionService = collectionService;
            this._options = this.config.options;
        }
        // Uses the User model to create a new User
        FilterFactory.prototype.createFilter = function (columnFilter) {
            var filter;
            if (columnFilter && columnFilter.model) {
                filter = typeof columnFilter.model === 'function' ? new columnFilter.model(this.translate, this.collectionService) : columnFilter.model;
            }
            // fallback to the default filter
            if (!filter && this._options.defaultFilter) {
                filter = new this._options.defaultFilter(this.translate, this.collectionService);
            }
            return filter;
        };
        FilterFactory = __decorate([
            core.Injectable(),
            __metadata("design:paramtypes", [SlickgridConfig, core$1.TranslateService, CollectionService])
        ], FilterFactory);
        return FilterFactory;
    }());

    var isequal = isequal_; // patch to fix rollup to work
    // timer for keeping track of user typing waits
    var timer;
    var DEFAULT_FILTER_TYPING_DEBOUNCE = 500;
    var FilterService = /** @class */ (function () {
        function FilterService(filterFactory) {
            this.filterFactory = filterFactory;
            this._eventHandler = new Slick.EventHandler();
            this._isFilterFirstRender = true;
            this._firstColumnIdRendered = '';
            this._filters = [];
            this._columnFilters = {};
            this.onFilterChanged = new rxjs.Subject();
            this.onFilterCleared = new rxjs.Subject();
        }
        Object.defineProperty(FilterService.prototype, "_gridOptions", {
            /** Getter for the Grid Options pulled through the Grid Object */
            get: function () {
                return (this._grid && this._grid.getOptions) ? this._grid.getOptions() : {};
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FilterService.prototype, "_columnDefinitions", {
            /** Getter for the Column Definitions pulled through the Grid Object */
            get: function () {
                return (this._grid && this._grid.getColumns) ? this._grid.getColumns() : [];
            },
            enumerable: true,
            configurable: true
        });
        FilterService.prototype.init = function (grid) {
            this._grid = grid;
        };
        /**
         * Attach a backend filter hook to the grid
         * @param grid SlickGrid Grid object
         */
        FilterService.prototype.attachBackendOnFilter = function (grid, dataView) {
            var _this = this;
            this._dataView = dataView;
            this._filters = [];
            this._slickSubscriber = new Slick.Event();
            // subscribe to the SlickGrid event and call the backend execution
            this._slickSubscriber.subscribe(this.onBackendFilterChange.bind(this));
            // subscribe to SlickGrid onHeaderRowCellRendered event to create filter template
            this._eventHandler.subscribe(grid.onHeaderRowCellRendered, function (e, args) {
                // firstColumnIdRendered is null at first, so if it changes to being filled and equal then we know it was already rendered
                if (args.column.id === _this._firstColumnIdRendered) {
                    _this._isFilterFirstRender = false;
                }
                _this.addFilterTemplateToHeaderRow(args, _this._isFilterFirstRender);
                if (_this._firstColumnIdRendered === '') {
                    _this._firstColumnIdRendered = args.column.id;
                }
            });
        };
        FilterService.prototype.onBackendFilterChange = function (event, args) {
            var _this = this;
            if (!args || !args.grid) {
                throw new Error('Something went wrong when trying to attach the "attachBackendOnFilterSubscribe(event, args)" function, it seems that "args" is not populated correctly');
            }
            var backendApi = this._gridOptions.backendServiceApi;
            if (!backendApi || !backendApi.process || !backendApi.service) {
                throw new Error("BackendServiceApi requires at least a \"process\" function and a \"service\" defined");
            }
            try {
                // keep start time & end timestamps & return it after process execution
                var startTime_1 = new Date();
                // run a preProcess callback if defined
                if (backendApi.preProcess) {
                    backendApi.preProcess();
                }
                // only add a delay when user is typing, on select dropdown filter (or "Clear Filter") it will execute right away
                var debounceTypingDelay = 0;
                var isTriggeredByClearFilter = args && args.clearFilterTriggered; // was it trigger by a "Clear Filter" command?
                if (!isTriggeredByClearFilter && event && event.keyCode !== exports.KeyCode.ENTER && (event.type === 'input' || event.type === 'keyup' || event.type === 'keydown')) {
                    debounceTypingDelay = backendApi.filterTypingDebounce || DEFAULT_FILTER_TYPING_DEBOUNCE;
                }
                // query backend, except when it's called by a ClearFilters then we won't
                if (args && args.shouldTriggerQuery) {
                    // call the service to get a query back
                    if (debounceTypingDelay > 0) {
                        clearTimeout(timer);
                        timer = setTimeout(function () { return _this.executeBackendCallback(event, args, startTime_1, backendApi); }, debounceTypingDelay);
                    }
                    else {
                        this.executeBackendCallback(event, args, startTime_1, backendApi);
                    }
                }
            }
            catch (error) {
                onBackendError(error, backendApi);
            }
        };
        FilterService.prototype.executeBackendCallback = function (event, args, startTime, backendApi) {
            return __awaiter(this, void 0, void 0, function () {
                var query, process;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, backendApi.service.processOnFilterChanged(event, args)];
                        case 1:
                            query = _a.sent();
                            // emit an onFilterChanged event when it's not called by a clear filter
                            if (args && !args.clearFilterTriggered) {
                                this.emitFilterChanged(exports.EmitterType.remote);
                            }
                            process = backendApi.process(query);
                            if (process instanceof Promise && process.then) {
                                process.then(function (processResult) { return executeBackendProcessesCallback(startTime, processResult, backendApi, _this._gridOptions); });
                            }
                            else if (rxjs.isObservable(process)) {
                                process.subscribe(function (processResult) { return executeBackendProcessesCallback(startTime, processResult, backendApi, _this._gridOptions); }, function (error) { return onBackendError(error, backendApi); });
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Attach a local filter hook to the grid
         * @param grid SlickGrid Grid object
         * @param dataView
         */
        FilterService.prototype.attachLocalOnFilter = function (grid, dataView) {
            var _this = this;
            this._filters = [];
            this._dataView = dataView;
            this._slickSubscriber = new Slick.Event();
            dataView.setFilterArgs({ columnFilters: this._columnFilters, grid: this._grid });
            dataView.setFilter(this.customLocalFilter.bind(this, dataView));
            this._slickSubscriber.subscribe(function (e, args) {
                var columnId = args.columnId;
                if (columnId != null) {
                    dataView.refresh();
                }
                // emit an onFilterChanged event when it's not called by a clear filter
                if (args && !args.clearFilterTriggered) {
                    _this.emitFilterChanged(exports.EmitterType.local);
                }
            });
            // subscribe to SlickGrid onHeaderRowCellRendered event to create filter template
            this._eventHandler.subscribe(grid.onHeaderRowCellRendered, function (e, args) {
                _this.addFilterTemplateToHeaderRow(args);
            });
        };
        FilterService.prototype.clearFilterByColumnId = function (event, columnId) {
            var colFilter = this._filters.find(function (filter) { return filter.columnDef.id === columnId; });
            if (colFilter && colFilter.clear) {
                colFilter.clear(true);
            }
            // we need to loop through all columnFilters and delete the filter found
            // only trying to clear columnFilter (without looping through) would not trigger a dataset change
            for (var colId in this._columnFilters) {
                if (colId === columnId && this._columnFilters[colId]) {
                    delete this._columnFilters[colId];
                }
            }
            var emitter = exports.EmitterType.local;
            var isBackendApi = this._gridOptions && this._gridOptions.backendServiceApi || false;
            // when using a backend service, we need to manually trigger a filter change
            if (isBackendApi) {
                emitter = exports.EmitterType.remote;
                this.onBackendFilterChange(event, { grid: this._grid, columnFilters: this._columnFilters });
            }
            // emit an event when filter is cleared
            this.emitFilterChanged(emitter);
        };
        /** Clear the search filters (below the column titles) */
        FilterService.prototype.clearFilters = function () {
            this._filters.forEach(function (filter) {
                if (filter && filter.clear) {
                    // clear element and trigger a change
                    filter.clear(false);
                }
            });
            // we need to loop through all columnFilters and delete them 1 by 1
            // only trying to clear columnFilter (without looping through) would not trigger a dataset change
            for (var columnId in this._columnFilters) {
                if (columnId && this._columnFilters[columnId]) {
                    delete this._columnFilters[columnId];
                }
            }
            // we also need to refresh the dataView and optionally the grid (it's optional since we use DataView)
            if (this._dataView && this._grid) {
                this._dataView.refresh();
                this._grid.invalidate();
            }
            // when using backend service, we need to query only once so it's better to do it here
            if (this._gridOptions && this._gridOptions.backendServiceApi) {
                var callbackArgs = { clearFilterTriggered: true, shouldTriggerQuery: true, grid: this._grid, columnFilters: this._columnFilters };
                this.executeBackendCallback(undefined, callbackArgs, new Date(), this._gridOptions.backendServiceApi);
            }
            // emit an event when filters are all cleared
            this.onFilterCleared.next(true);
        };
        FilterService.prototype.customLocalFilter = function (dataView, item, args) {
            var e_1, _a;
            try {
                for (var _b = __values(Object.keys(args.columnFilters)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var columnId = _c.value;
                    var columnFilter = args.columnFilters[columnId];
                    var columnIndex = args.grid.getColumnIndex(columnId);
                    var columnDef = args.grid.getColumns()[columnIndex];
                    if (!columnDef) {
                        return false;
                    }
                    // Row Detail View plugin, if the row is padding we just get the value we're filtering on from it's parent
                    if (this._gridOptions.enableRowDetailView) {
                        var metadataPrefix = this._gridOptions.rowDetailView && this._gridOptions.rowDetailView.keyPrefix || '__';
                        if (item[metadataPrefix + "isPadding"] && item[metadataPrefix + "parent"]) {
                            item = item[metadataPrefix + "parent"];
                        }
                    }
                    var dataKey = columnDef.dataKey;
                    var fieldName = columnDef.queryField || columnDef.queryFieldFilter || columnDef.field;
                    var fieldType = columnDef.type || exports.FieldType.string;
                    var filterSearchType = (columnDef.filterSearchType) ? columnDef.filterSearchType : null;
                    var cellValue = item[fieldName];
                    // when item is a complex object (dot "." notation), we need to filter the value contained in the object tree
                    if (fieldName.indexOf('.') >= 0) {
                        cellValue = getDescendantProperty(item, fieldName);
                    }
                    // if we find searchTerms use them but make a deep copy so that we don't affect original array
                    // we might have to overwrite the value(s) locally that are returned
                    // e.g: we don't want to operator within the search value, since it will fail filter condition check trigger afterward
                    var searchValues = (columnFilter && columnFilter.searchTerms) ? $.extend(true, [], columnFilter.searchTerms) : null;
                    var fieldSearchValue = (Array.isArray(searchValues) && searchValues.length === 1) ? searchValues[0] : '';
                    var matches = null;
                    if (fieldType !== exports.FieldType.object) {
                        fieldSearchValue = '' + fieldSearchValue; // make sure it's a string
                        matches = fieldSearchValue.match(/^([<>!=\*]{0,2})(.*[^<>!=\*])([\*]?)$/); // group 1: Operator, 2: searchValue, 3: last char is '*' (meaning starts with, ex.: abc*)
                    }
                    var operator = columnFilter.operator || ((matches) ? matches[1] : '');
                    var searchTerm = (!!matches) ? matches[2] : '';
                    var lastValueChar = (!!matches) ? matches[3] : (operator === '*z' ? '*' : '');
                    if (searchValues && searchValues.length > 1) {
                        fieldSearchValue = searchValues.join(',');
                    }
                    else if (typeof fieldSearchValue === 'string') {
                        // escaping the search value
                        fieldSearchValue = fieldSearchValue.replace("'", "''"); // escape single quotes by doubling them
                        if (operator === '*' || operator === 'a*' || operator === '*z' || lastValueChar === '*') {
                            operator = (operator === '*' || operator === '*z') ? exports.OperatorType.endsWith : exports.OperatorType.startsWith;
                        }
                    }
                    // no need to query if search value is empty
                    if (searchTerm === '' && (!searchValues || (Array.isArray(searchValues) && searchValues.length === 0))) {
                        return true;
                    }
                    // if search value has a regex match we will only keep the value without the operator
                    // in this case we need to overwrite the returned search values to truncate operator from the string search
                    if (Array.isArray(matches) && matches.length >= 1 && (Array.isArray(searchValues) && searchValues.length === 1)) {
                        searchValues[0] = searchTerm;
                    }
                    // filter search terms should always be string type (even though we permit the end user to input numbers)
                    // so make sure each term are strings, if user has some default search terms, we will cast them to string
                    if (searchValues && Array.isArray(searchValues) && fieldType !== exports.FieldType.object) {
                        for (var k = 0, ln = searchValues.length; k < ln; k++) {
                            // make sure all search terms are strings
                            searchValues[k] = ((searchValues[k] === undefined || searchValues[k] === null) ? '' : searchValues[k]) + '';
                        }
                    }
                    // when using localization (i18n), we should use the formatter output to search as the new cell value
                    if (columnDef && columnDef.params && columnDef.params.useFormatterOuputToFilter) {
                        var rowIndex = (dataView && typeof dataView.getIdxById === 'function') ? dataView.getIdxById(item.id) : 0;
                        cellValue = columnDef.formatter(rowIndex, columnIndex, cellValue, columnDef, item, this._grid);
                    }
                    // make sure cell value is always a string
                    if (typeof cellValue === 'number') {
                        cellValue = cellValue.toString();
                    }
                    var conditionOptions = {
                        dataKey: dataKey,
                        fieldType: fieldType,
                        searchTerms: searchValues,
                        cellValue: cellValue,
                        operator: operator,
                        cellValueLastChar: lastValueChar,
                        filterSearchType: filterSearchType
                    };
                    if (!FilterConditions.executeMappedCondition(conditionOptions)) {
                        return false;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return true;
        };
        FilterService.prototype.dispose = function () {
            this.disposeColumnFilters();
            // unsubscribe all SlickGrid events
            this._eventHandler.unsubscribeAll();
            // unsubscribe local event
            if (this._slickSubscriber && typeof this._slickSubscriber.unsubscribe === 'function') {
                this._slickSubscriber.unsubscribe();
            }
        };
        /**
         * Dispose of the filters, since it's a singleton, we don't want to affect other grids with same columns
         */
        FilterService.prototype.disposeColumnFilters = function () {
            // we need to loop through all columnFilters and delete them 1 by 1
            // only trying to make columnFilter an empty (without looping) would not trigger a dataset change
            for (var columnId in this._columnFilters) {
                if (columnId && this._columnFilters[columnId]) {
                    delete this._columnFilters[columnId];
                }
            }
            // also destroy each Filter instances
            this._filters.forEach(function (filter, index) {
                if (filter && filter.destroy) {
                    filter.destroy(true);
                }
            });
        };
        FilterService.prototype.getColumnFilters = function () {
            return this._columnFilters;
        };
        FilterService.prototype.getCurrentLocalFilters = function () {
            var e_2, _a;
            var currentFilters = [];
            if (this._columnFilters) {
                try {
                    for (var _b = __values(Object.keys(this._columnFilters)), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var colId = _c.value;
                        var columnFilter = this._columnFilters[colId];
                        var filter = { columnId: colId || '' };
                        if (columnFilter && columnFilter.searchTerms) {
                            filter.searchTerms = columnFilter.searchTerms;
                        }
                        if (columnFilter.operator) {
                            filter.operator = columnFilter.operator;
                        }
                        if (Array.isArray(filter.searchTerms) && filter.searchTerms.length > 0 && filter.searchTerms[0] !== '') {
                            currentFilters.push(filter);
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
            return currentFilters;
        };
        FilterService.prototype.callbackSearchEvent = function (e, args) {
            if (args) {
                var searchTerm = ((e && e.target) ? e.target.value : undefined);
                var searchTerms = (args.searchTerms && Array.isArray(args.searchTerms)) ? args.searchTerms : (searchTerm ? [searchTerm] : undefined);
                var columnDef = args.columnDef || null;
                var columnId = columnDef ? (columnDef.id || '') : '';
                var operator = args.operator || undefined;
                var hasSearchTerms = searchTerms && Array.isArray(searchTerms);
                var termsCount = hasSearchTerms && searchTerms.length;
                var oldColumnFilters = __assign({}, this._columnFilters);
                if (!hasSearchTerms || termsCount === 0 || (termsCount === 1 && searchTerms[0] === '')) {
                    // delete the property from the columnFilters when it becomes empty
                    // without doing this, it would leave an incorrect state of the previous column filters when filtering on another column
                    delete this._columnFilters[columnId];
                }
                else {
                    var colId = '' + columnId;
                    var colFilter = {
                        columnId: colId,
                        columnDef: columnDef,
                        searchTerms: searchTerms,
                    };
                    if (operator) {
                        colFilter.operator = operator;
                    }
                    this._columnFilters[colId] = colFilter;
                }
                // trigger an event only if Filters changed or if ENTER key was pressed
                var eventKeyCode = e && e.keyCode;
                if (eventKeyCode === exports.KeyCode.ENTER || !isequal(oldColumnFilters, this._columnFilters)) {
                    this.triggerEvent(this._slickSubscriber, {
                        clearFilterTriggered: args.clearFilterTriggered,
                        shouldTriggerQuery: args.shouldTriggerQuery,
                        columnId: columnId,
                        columnDef: args.columnDef || null,
                        columnFilters: this._columnFilters,
                        operator: operator,
                        searchTerms: searchTerms,
                        serviceOptions: this._onFilterChangedOptions,
                        grid: this._grid
                    }, e);
                }
            }
        };
        FilterService.prototype.addFilterTemplateToHeaderRow = function (args, isFilterFirstRender) {
            if (isFilterFirstRender === void 0) { isFilterFirstRender = true; }
            var columnDef = args.column;
            var columnId = columnDef.id || '';
            if (columnDef && columnId !== 'selector' && columnDef.filterable) {
                var searchTerms = void 0;
                var operator = void 0;
                var filter_1 = this.filterFactory.createFilter(args.column.filter);
                operator = (columnDef && columnDef.filter && columnDef.filter.operator) || (filter_1 && filter_1.operator) || undefined;
                if (this._columnFilters[columnDef.id]) {
                    searchTerms = this._columnFilters[columnDef.id].searchTerms || undefined;
                    operator = this._columnFilters[columnDef.id].operator || undefined;
                }
                else if (columnDef.filter) {
                    // when hiding/showing (with Column Picker or Grid Menu), it will try to re-create yet again the filters (since SlickGrid does a re-render)
                    // because of that we need to first get searchTerm(s) from the columnFilters (that is what the user last entered)
                    searchTerms = columnDef.filter.searchTerms || undefined;
                    this.updateColumnFilters(searchTerms, columnDef, operator);
                }
                var filterArguments = {
                    grid: this._grid,
                    operator: operator,
                    searchTerms: searchTerms,
                    columnDef: columnDef,
                    callback: this.callbackSearchEvent.bind(this)
                };
                if (filter_1) {
                    filter_1.init(filterArguments, isFilterFirstRender);
                    var filterExistIndex = this._filters.findIndex(function (filt) { return filter_1.columnDef.name === filt.columnDef.name; });
                    // add to the filters arrays or replace it when found
                    if (filterExistIndex === -1) {
                        this._filters.push(filter_1);
                    }
                    else {
                        this._filters[filterExistIndex] = filter_1;
                    }
                    // when hiding/showing (with Column Picker or Grid Menu), it will try to re-create yet again the filters (since SlickGrid does a re-render)
                    // we need to also set again the values in the DOM elements if the values were set by a searchTerm(s)
                    if (searchTerms && filter_1.setValues) {
                        filter_1.setValues(searchTerms);
                    }
                }
            }
        };
        /**
         * A simple function that is attached to the subscriber and emit a change when the filter is called.
         * Other services, like Pagination, can then subscribe to it.
         * @param caller
         */
        FilterService.prototype.emitFilterChanged = function (caller) {
            if (caller === exports.EmitterType.remote && this._gridOptions && this._gridOptions.backendServiceApi) {
                var currentFilters = [];
                var backendService = this._gridOptions.backendServiceApi.service;
                if (backendService && backendService.getCurrentFilters) {
                    currentFilters = backendService.getCurrentFilters();
                }
                this.onFilterChanged.next(currentFilters);
            }
            else if (caller === exports.EmitterType.local) {
                this.onFilterChanged.next(this.getCurrentLocalFilters());
            }
        };
        /**
         * When user passes an array of preset filters, we need to pre-populate each column filter searchTerm(s)
         * The process is to loop through the preset filters array, find the associated column from columnDefinitions and fill in the filter object searchTerm(s)
         * This is basically the same as if we would manually add searchTerm(s) to a column filter object in the column definition, but we do it programmatically.
         * At the end of the day, when creating the Filter (DOM Element), it will use these searchTerm(s) so we can take advantage of that without recoding each Filter type (DOM element)
         */
        FilterService.prototype.populateColumnFilterSearchTerms = function () {
            if (this._gridOptions.presets && Array.isArray(this._gridOptions.presets.filters) && this._gridOptions.presets.filters.length > 0) {
                var filters_1 = this._gridOptions.presets.filters;
                this._columnDefinitions.forEach(function (columnDef) {
                    // clear any columnDef searchTerms before applying Presets
                    if (columnDef.filter && columnDef.filter.searchTerms) {
                        delete columnDef.filter.searchTerms;
                    }
                    // from each presets, we will find the associated columnDef and apply the preset searchTerms & operator if there is
                    var columnPreset = filters_1.find(function (presetFilter) {
                        return presetFilter.columnId === columnDef.id;
                    });
                    if (columnPreset && columnPreset.searchTerms && Array.isArray(columnPreset.searchTerms)) {
                        columnDef.filter = columnDef.filter || {};
                        columnDef.filter.operator = columnPreset.operator || columnDef.filter.operator || '';
                        columnDef.filter.searchTerms = columnPreset.searchTerms;
                    }
                });
            }
        };
        FilterService.prototype.updateColumnFilters = function (searchTerms, columnDef, operator) {
            if (searchTerms && columnDef) {
                // this._columnFilters.searchTerms = searchTerms;
                this._columnFilters[columnDef.id] = {
                    columnId: columnDef.id,
                    columnDef: columnDef,
                    searchTerms: searchTerms,
                    operator: operator
                };
            }
        };
        FilterService.prototype.triggerEvent = function (slickEvent, args, e) {
            slickEvent = slickEvent || new Slick.Event();
            // event might have been created as a CustomEvent (e.g. CompoundDateFilter), without being a valid Slick.EventData.
            // if so we will create a new Slick.EventData and merge it with that CustomEvent to avoid having SlickGrid errors
            var event = e;
            if (e && typeof e.isPropagationStopped !== 'function') {
                event = $.extend({}, new Slick.EventData(), e);
            }
            slickEvent.notify(args, event, args.grid);
        };
        FilterService = __decorate([
            core.Injectable(),
            __metadata("design:paramtypes", [FilterFactory])
        ], FilterService);
        return FilterService;
    }());

    var SortService = /** @class */ (function () {
        function SortService() {
            this._currentLocalSorters = [];
            this._eventHandler = new Slick.EventHandler();
            this._isBackendGrid = false;
            this.onSortChanged = new rxjs.Subject();
            this.onSortCleared = new rxjs.Subject();
        }
        Object.defineProperty(SortService.prototype, "_gridOptions", {
            /** Getter for the Grid Options pulled through the Grid Object */
            get: function () {
                return (this._grid && this._grid.getOptions) ? this._grid.getOptions() : {};
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SortService.prototype, "_columnDefinitions", {
            /** Getter for the Column Definitions pulled through the Grid Object */
            get: function () {
                return (this._grid && this._grid.getColumns) ? this._grid.getColumns() : [];
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Attach a backend sort (single/multi) hook to the grid
         * @param grid SlickGrid Grid object
         * @param dataView SlickGrid DataView object
         */
        SortService.prototype.attachBackendOnSort = function (grid, dataView) {
            this._isBackendGrid = true;
            this._grid = grid;
            this._dataView = dataView;
            this._slickSubscriber = grid.onSort;
            // subscribe to the SlickGrid event and call the backend execution
            this._slickSubscriber.subscribe(this.onBackendSortChanged.bind(this));
        };
        SortService.prototype.onBackendSortChanged = function (event, args) {
            var _this = this;
            if (!args || !args.grid) {
                throw new Error('Something went wrong when trying to attach the "onBackendSortChanged(event, args)" function, it seems that "args" is not populated correctly');
            }
            var gridOptions = args.grid.getOptions() || {};
            var backendApi = gridOptions.backendServiceApi;
            if (!backendApi || !backendApi.process || !backendApi.service) {
                throw new Error("BackendServiceApi requires at least a \"process\" function and a \"service\" defined");
            }
            try {
                // keep start time & end timestamps & return it after process execution
                var startTime_1 = new Date();
                if (backendApi.preProcess) {
                    backendApi.preProcess();
                }
                var query = backendApi.service.processOnSortChanged(event, args);
                this.emitSortChanged(exports.EmitterType.remote);
                // the processes can be Observables (like HttpClient) or Promises
                var process_1 = backendApi.process(query);
                if (process_1 instanceof Promise && process_1.then) {
                    process_1.then(function (processResult) { return executeBackendProcessesCallback(startTime_1, processResult, backendApi, _this._gridOptions); });
                }
                else if (rxjs.isObservable(process_1)) {
                    process_1.subscribe(function (processResult) { return executeBackendProcessesCallback(startTime_1, processResult, backendApi, _this._gridOptions); }, function (error) { return onBackendError(error, backendApi); });
                }
            }
            catch (error) {
                onBackendError(error, backendApi);
            }
        };
        /**
         * Attach a local sort (single/multi) hook to the grid
         * @param grid SlickGrid Grid object
         * @param gridOptions Grid Options object
         * @param dataView
         */
        SortService.prototype.attachLocalOnSort = function (grid, dataView) {
            var _this = this;
            this._isBackendGrid = false;
            this._grid = grid;
            this._dataView = dataView;
            this._slickSubscriber = grid.onSort;
            this._slickSubscriber.subscribe(function (e, args) {
                // multiSort and singleSort are not exactly the same, but we want to structure it the same for the (for loop) after
                // also to avoid having to rewrite the for loop in the sort, we will make the singleSort an array of 1 object
                var sortColumns = (args.multiColumnSort) ? args.sortCols : new Array({ sortAsc: args.sortAsc, sortCol: args.sortCol });
                // keep current sorters
                _this._currentLocalSorters = []; // reset current local sorters
                if (Array.isArray(sortColumns)) {
                    sortColumns.forEach(function (sortColumn) {
                        if (sortColumn.sortCol) {
                            _this._currentLocalSorters.push({
                                columnId: sortColumn.sortCol.id,
                                direction: sortColumn.sortAsc ? exports.SortDirection.ASC : exports.SortDirection.DESC
                            });
                        }
                    });
                }
                _this.onLocalSortChanged(grid, dataView, sortColumns);
                _this.emitSortChanged(exports.EmitterType.local);
            });
        };
        SortService.prototype.clearSorting = function (triggerQueryEvent) {
            if (triggerQueryEvent === void 0) { triggerQueryEvent = true; }
            if (this._grid && this._gridOptions && this._dataView) {
                // remove any sort icons (this setSortColumns function call really does only that)
                this._grid.setSortColumns([]);
                // we also need to trigger a sort change
                // for a backend grid, we will trigger a backend sort changed with an empty sort columns array
                // however for a local grid, we need to pass a sort column and so we will sort by the 1st column
                if (triggerQueryEvent) {
                    if (this._isBackendGrid) {
                        this.onBackendSortChanged(undefined, { grid: this._grid, sortCols: [] });
                    }
                    else {
                        if (this._columnDefinitions && Array.isArray(this._columnDefinitions)) {
                            this.onLocalSortChanged(this._grid, this._dataView, new Array({ sortAsc: true, sortCol: this._columnDefinitions[0] }));
                        }
                    }
                }
                else if (this._isBackendGrid) {
                    var backendService = this._gridOptions && this._gridOptions.backendServiceApi && this._gridOptions.backendServiceApi.service;
                    if (backendService && backendService.clearSorters) {
                        backendService.clearSorters();
                    }
                }
            }
            // set current sorter to empty & emit a sort changed event
            this._currentLocalSorters = [];
            // emit an event when sorts are all cleared
            this.onSortCleared.next(true);
        };
        SortService.prototype.getCurrentLocalSorters = function () {
            return this._currentLocalSorters;
        };
        /**
         * Get column sorts,
         * If a column is passed as an argument, we won't add this column to our output array since it is already in the array
         * We want to know the sort prior to calling the next sorting command
         */
        SortService.prototype.getPreviousColumnSorts = function (columnId) {
            var _this = this;
            // getSortColumns() only returns sortAsc & columnId, we want the entire column definition
            var oldSortColumns = this._grid && this._grid.getSortColumns();
            // get the column definition but only keep column which are not equal to our current column
            if (Array.isArray(oldSortColumns)) {
                var sortedCols = oldSortColumns.reduce(function (cols, col) {
                    if (!columnId || col.columnId !== columnId) {
                        cols.push({ sortCol: _this._columnDefinitions[_this._grid.getColumnIndex(col.columnId)], sortAsc: col.sortAsc });
                    }
                    return cols;
                }, []);
                return sortedCols;
            }
            return [];
        };
        /**
         * load any presets if there are any
         * @param grid
         * @param dataView
         */
        SortService.prototype.loadLocalPresets = function (grid, dataView) {
            var _this = this;
            var sortCols = [];
            this._currentLocalSorters = []; // reset current local sorters
            if (this._gridOptions && this._gridOptions.presets && this._gridOptions.presets.sorters) {
                var sorters = this._gridOptions.presets.sorters;
                sorters.forEach(function (presetSorting) {
                    var gridColumn = _this._columnDefinitions.find(function (col) { return col.id === presetSorting.columnId; });
                    if (gridColumn) {
                        sortCols.push({
                            columnId: gridColumn.id,
                            sortAsc: ((presetSorting.direction.toUpperCase() === exports.SortDirection.ASC) ? true : false),
                            sortCol: gridColumn
                        });
                        // keep current sorters
                        _this._currentLocalSorters.push({
                            columnId: gridColumn.id + '',
                            direction: presetSorting.direction.toUpperCase()
                        });
                    }
                });
                if (sortCols.length > 0) {
                    this.onLocalSortChanged(grid, dataView, sortCols);
                    grid.setSortColumns(sortCols); // use this to add sort icon(s) in UI
                }
            }
        };
        SortService.prototype.onLocalSortChanged = function (grid, dataView, sortColumns, forceReSort) {
            if (forceReSort === void 0) { forceReSort = false; }
            if (grid && dataView) {
                if (forceReSort) {
                    dataView.reSort();
                }
                dataView.sort(function (dataRow1, dataRow2) {
                    for (var i = 0, l = sortColumns.length; i < l; i++) {
                        var columnSortObj = sortColumns[i];
                        if (columnSortObj && columnSortObj.sortCol) {
                            var sortDirection = columnSortObj.sortAsc ? exports.SortDirectionNumber.asc : exports.SortDirectionNumber.desc;
                            var sortField = columnSortObj.sortCol.queryField || columnSortObj.sortCol.queryFieldSorter || columnSortObj.sortCol.field;
                            var fieldType = columnSortObj.sortCol.type || exports.FieldType.string;
                            var value1 = dataRow1[sortField];
                            var value2 = dataRow2[sortField];
                            // when item is a complex object (dot "." notation), we need to filter the value contained in the object tree
                            if (sortField && sortField.indexOf('.') >= 0) {
                                value1 = getDescendantProperty(dataRow1, sortField);
                                value2 = getDescendantProperty(dataRow2, sortField);
                            }
                            // user could provide his own custom Sorter
                            if (columnSortObj.sortCol && columnSortObj.sortCol.sorter) {
                                var customSortResult = columnSortObj.sortCol.sorter(value1, value2, sortDirection, columnSortObj.sortCol);
                                if (customSortResult !== exports.SortDirectionNumber.neutral) {
                                    return customSortResult;
                                }
                            }
                            var sortResult = sortByFieldType(value1, value2, fieldType, sortDirection, columnSortObj.sortCol);
                            if (sortResult !== exports.SortDirectionNumber.neutral) {
                                return sortResult;
                            }
                        }
                    }
                    return exports.SortDirectionNumber.neutral;
                });
                grid.invalidate();
                grid.render();
            }
        };
        SortService.prototype.dispose = function () {
            // unsubscribe local event
            if (this._slickSubscriber && typeof this._slickSubscriber.unsubscribe === 'function') {
                this._slickSubscriber.unsubscribe();
            }
            // unsubscribe all SlickGrid events
            this._eventHandler.unsubscribeAll();
        };
        /**
         * A simple function that is attached to the subscriber and emit a change when the sort is called.
         * Other services, like Pagination, can then subscribe to it.
         * @param sender
         */
        SortService.prototype.emitSortChanged = function (sender) {
            if (sender === exports.EmitterType.remote && this._gridOptions && this._gridOptions.backendServiceApi) {
                var currentSorters = [];
                var backendService = this._gridOptions.backendServiceApi.service;
                if (backendService && backendService.getCurrentSorters) {
                    currentSorters = backendService.getCurrentSorters();
                }
                this.onSortChanged.next(currentSorters);
            }
            else if (sender === exports.EmitterType.local) {
                this.onSortChanged.next(this.getCurrentLocalSorters());
            }
        };
        return SortService;
    }());

    var GridMenuExtension = /** @class */ (function () {
        function GridMenuExtension(exportService, extensionUtility, filterService, sharedService, sortService, translate) {
            this.exportService = exportService;
            this.extensionUtility = extensionUtility;
            this.filterService = filterService;
            this.sharedService = sharedService;
            this.sortService = sortService;
            this.translate = translate;
            this._areVisibleColumnDifferent = false;
            this._eventHandler = new Slick.EventHandler();
        }
        Object.defineProperty(GridMenuExtension.prototype, "eventHandler", {
            get: function () {
                return this._eventHandler;
            },
            enumerable: true,
            configurable: true
        });
        GridMenuExtension.prototype.dispose = function () {
            // unsubscribe all SlickGrid events
            this._eventHandler.unsubscribeAll();
            if (this._addon && this._addon.destroy) {
                this._addon.destroy();
            }
        };
        GridMenuExtension.prototype.showGridMenu = function (e) {
            this._addon.showGridMenu(e);
        };
        /** Create the Header Menu and expose all the available hooks that user can subscribe (onCommand, onBeforeMenuShow, ...) */
        GridMenuExtension.prototype.register = function () {
            var _this = this;
            // keep original user grid menu, useful when switching locale to translate
            this._userOriginalGridMenu = __assign({}, this.sharedService.gridOptions.gridMenu);
            if (this.sharedService.gridOptions && this.sharedService.gridOptions.gridMenu) {
                // dynamically import the SlickGrid plugin (addon) with RequireJS
                this.extensionUtility.loadExtensionDynamically(exports.ExtensionName.gridMenu);
                this.sharedService.gridOptions.gridMenu = __assign({}, this.getDefaultGridMenuOptions(), this.sharedService.gridOptions.gridMenu);
                // merge original user grid menu items with internal items
                // then sort all Grid Menu Custom Items (sorted by pointer, no need to use the return)
                this.sharedService.gridOptions.gridMenu.customItems = __spread(this._userOriginalGridMenu.customItems || [], this.addGridMenuCustomCommands());
                this.extensionUtility.translateItems(this.sharedService.gridOptions.gridMenu.customItems, 'titleKey', 'title');
                this.extensionUtility.sortItems(this.sharedService.gridOptions.gridMenu.customItems, 'positionOrder');
                this._addon = new Slick.Controls.GridMenu(this.sharedService.columnDefinitions, this.sharedService.grid, this.sharedService.gridOptions);
                // hook all events
                if (this.sharedService.grid && this.sharedService.gridOptions.gridMenu) {
                    if (this.sharedService.gridOptions.gridMenu.onExtensionRegistered) {
                        this.sharedService.gridOptions.gridMenu.onExtensionRegistered(this._addon);
                    }
                    this._eventHandler.subscribe(this._addon.onBeforeMenuShow, function (e, args) {
                        if (_this.sharedService.gridOptions.gridMenu && typeof _this.sharedService.gridOptions.gridMenu.onBeforeMenuShow === 'function') {
                            _this.sharedService.gridOptions.gridMenu.onBeforeMenuShow(e, args);
                        }
                    });
                    this._eventHandler.subscribe(this._addon.onColumnsChanged, function (e, args) {
                        _this._areVisibleColumnDifferent = true;
                        if (_this.sharedService.gridOptions.gridMenu && typeof _this.sharedService.gridOptions.gridMenu.onColumnsChanged === 'function') {
                            _this.sharedService.gridOptions.gridMenu.onColumnsChanged(e, args);
                        }
                    });
                    this._eventHandler.subscribe(this._addon.onCommand, function (e, args) {
                        _this.executeGridMenuInternalCustomCommands(e, args);
                        if (_this.sharedService.gridOptions.gridMenu && typeof _this.sharedService.gridOptions.gridMenu.onCommand === 'function') {
                            _this.sharedService.gridOptions.gridMenu.onCommand(e, args);
                        }
                    });
                    this._eventHandler.subscribe(this._addon.onMenuClose, function (e, args) {
                        if (_this.sharedService.gridOptions.gridMenu && typeof _this.sharedService.gridOptions.gridMenu.onMenuClose === 'function') {
                            _this.sharedService.gridOptions.gridMenu.onMenuClose(e, args);
                        }
                        // we also want to resize the columns if the user decided to hide certain column(s)
                        if (_this.sharedService.grid && typeof _this.sharedService.grid.autosizeColumns === 'function') {
                            // make sure that the grid still exist (by looking if the Grid UID is found in the DOM tree)
                            var gridUid = _this.sharedService.grid.getUID();
                            if (_this._areVisibleColumnDifferent && gridUid && $("." + gridUid).length > 0) {
                                if (_this.sharedService.gridOptions && _this.sharedService.gridOptions.enableAutoSizeColumns) {
                                    _this.sharedService.grid.autosizeColumns();
                                }
                                _this._areVisibleColumnDifferent = false;
                            }
                        }
                    });
                }
                return this._addon;
            }
            return null;
        };
        /** Refresh the dataset through the Backend Service */
        GridMenuExtension.prototype.refreshBackendDataset = function (gridOptions) {
            var _this = this;
            var query = '';
            // user can pass new set of grid options which will override current ones
            if (gridOptions) {
                this.sharedService.gridOptions = __assign({}, this.sharedService.gridOptions, gridOptions);
            }
            var backendApi = this.sharedService.gridOptions.backendServiceApi;
            if (!backendApi || !backendApi.service || !backendApi.process) {
                throw new Error("BackendServiceApi requires at least a \"process\" function and a \"service\" defined");
            }
            if (backendApi.service) {
                query = backendApi.service.buildQuery();
            }
            if (query && query !== '') {
                // keep start time & end timestamps & return it after process execution
                var startTime_1 = new Date();
                if (backendApi.preProcess) {
                    backendApi.preProcess();
                }
                // the process could be an Observable (like HttpClient) or a Promise
                // in any case, we need to have a Promise so that we can await on it (if an Observable, convert it to Promise)
                var observableOrPromise = backendApi.process(query);
                castToPromise(observableOrPromise).then(function (processResult) {
                    var endTime = new Date();
                    // from the result, call our internal post process to update the Dataset and Pagination info
                    if (processResult && backendApi && backendApi.internalPostProcess) {
                        backendApi.internalPostProcess(processResult);
                    }
                    // send the response process to the postProcess callback
                    if (backendApi && backendApi.postProcess) {
                        if (processResult instanceof Object) {
                            processResult.statistics = {
                                startTime: startTime_1,
                                endTime: endTime,
                                executionTime: endTime.valueOf() - startTime_1.valueOf(),
                                totalItemCount: _this.sharedService.gridOptions && _this.sharedService.gridOptions.pagination && _this.sharedService.gridOptions.pagination.totalItems
                            };
                        }
                        backendApi.postProcess(processResult);
                    }
                });
            }
        };
        /** Translate the Grid Menu titles and column picker */
        GridMenuExtension.prototype.translateGridMenu = function () {
            // update the properties by pointers, that is the only way to get Grid Menu Control to see the new values
            // we also need to call the control init so that it takes the new Grid object with latest values
            if (this.sharedService.gridOptions && this.sharedService.gridOptions.gridMenu) {
                this.sharedService.gridOptions.gridMenu.customItems = [];
                this.emptyGridMenuTitles();
                // merge original user grid menu items with internal items
                // then sort all Grid Menu Custom Items (sorted by pointer, no need to use the return)
                this.sharedService.gridOptions.gridMenu.customItems = __spread(this._userOriginalGridMenu.customItems || [], this.addGridMenuCustomCommands());
                this.extensionUtility.translateItems(this.sharedService.gridOptions.gridMenu.customItems, 'titleKey', 'title');
                this.extensionUtility.sortItems(this.sharedService.gridOptions.gridMenu.customItems, 'positionOrder');
                this.sharedService.gridOptions.gridMenu.columnTitle = this.extensionUtility.getPickerTitleOutputString('columnTitle', 'gridMenu');
                this.sharedService.gridOptions.gridMenu.forceFitTitle = this.extensionUtility.getPickerTitleOutputString('forceFitTitle', 'gridMenu');
                this.sharedService.gridOptions.gridMenu.syncResizeTitle = this.extensionUtility.getPickerTitleOutputString('syncResizeTitle', 'gridMenu');
                // translate all columns (including non-visible)
                this.extensionUtility.translateItems(this.sharedService.allColumns, 'headerKey', 'name');
                // re-initialize the Grid Menu, that will recreate all the menus & list
                // doing an "init()" won't drop any existing command attached
                if (this._addon.init) {
                    this._addon.init(this.sharedService.grid);
                }
            }
        };
        // --
        // private functions
        // ------------------
        /** Create Grid Menu with Custom Commands if user has enabled Filters and/or uses a Backend Service (OData, GraphQL) */
        GridMenuExtension.prototype.addGridMenuCustomCommands = function () {
            var backendApi = this.sharedService.gridOptions.backendServiceApi || null;
            var gridMenuCustomItems = [];
            if (this.sharedService.gridOptions && this.sharedService.gridOptions.enableFiltering) {
                // show grid menu: clear all filters
                if (this.sharedService.gridOptions && this.sharedService.gridOptions.gridMenu && !this.sharedService.gridOptions.gridMenu.hideClearAllFiltersCommand) {
                    gridMenuCustomItems.push({
                        iconCssClass: this.sharedService.gridOptions.gridMenu.iconClearAllFiltersCommand || 'fa fa-filter text-danger',
                        title: this.sharedService.gridOptions.enableTranslate ? this.translate.instant('CLEAR_ALL_FILTERS') : Constants.TEXT_CLEAR_ALL_FILTERS,
                        disabled: false,
                        command: 'clear-filter',
                        positionOrder: 50
                    });
                }
                // show grid menu: toggle filter row
                if (this.sharedService.gridOptions && this.sharedService.gridOptions.gridMenu && !this.sharedService.gridOptions.gridMenu.hideToggleFilterCommand) {
                    gridMenuCustomItems.push({
                        iconCssClass: this.sharedService.gridOptions.gridMenu.iconToggleFilterCommand || 'fa fa-random',
                        title: this.sharedService.gridOptions.enableTranslate ? this.translate.instant('TOGGLE_FILTER_ROW') : Constants.TEXT_TOGGLE_FILTER_ROW,
                        disabled: false,
                        command: 'toggle-filter',
                        positionOrder: 52
                    });
                }
                // show grid menu: refresh dataset
                if (this.sharedService.gridOptions && this.sharedService.gridOptions.gridMenu && !this.sharedService.gridOptions.gridMenu.hideRefreshDatasetCommand && backendApi) {
                    gridMenuCustomItems.push({
                        iconCssClass: this.sharedService.gridOptions.gridMenu.iconRefreshDatasetCommand || 'fa fa-refresh',
                        title: this.sharedService.gridOptions.enableTranslate ? this.translate.instant('REFRESH_DATASET') : Constants.TEXT_REFRESH_DATASET,
                        disabled: false,
                        command: 'refresh-dataset',
                        positionOrder: 54
                    });
                }
            }
            if (this.sharedService.gridOptions.showPreHeaderPanel) {
                // show grid menu: toggle pre-header row
                if (this.sharedService.gridOptions && this.sharedService.gridOptions.gridMenu && !this.sharedService.gridOptions.gridMenu.hideTogglePreHeaderCommand) {
                    gridMenuCustomItems.push({
                        iconCssClass: this.sharedService.gridOptions.gridMenu.iconTogglePreHeaderCommand || 'fa fa-random',
                        title: this.sharedService.gridOptions.enableTranslate ? this.translate.instant('TOGGLE_PRE_HEADER_ROW') : Constants.TEXT_TOGGLE_PRE_HEADER_ROW,
                        disabled: false,
                        command: 'toggle-preheader',
                        positionOrder: 52
                    });
                }
            }
            if (this.sharedService.gridOptions.enableSorting) {
                // show grid menu: clear all sorting
                if (this.sharedService.gridOptions && this.sharedService.gridOptions.gridMenu && !this.sharedService.gridOptions.gridMenu.hideClearAllSortingCommand) {
                    gridMenuCustomItems.push({
                        iconCssClass: this.sharedService.gridOptions.gridMenu.iconClearAllSortingCommand || 'fa fa-unsorted text-danger',
                        title: this.sharedService.gridOptions.enableTranslate ? this.translate.instant('CLEAR_ALL_SORTING') : Constants.TEXT_CLEAR_ALL_SORTING,
                        disabled: false,
                        command: 'clear-sorting',
                        positionOrder: 51
                    });
                }
            }
            // show grid menu: export to file
            if (this.sharedService.gridOptions && this.sharedService.gridOptions.enableExport && this.sharedService.gridOptions.gridMenu && !this.sharedService.gridOptions.gridMenu.hideExportCsvCommand) {
                gridMenuCustomItems.push({
                    iconCssClass: this.sharedService.gridOptions.gridMenu.iconExportCsvCommand || 'fa fa-download',
                    title: this.sharedService.gridOptions.enableTranslate ? this.translate.instant('EXPORT_TO_CSV') : Constants.TEXT_EXPORT_IN_CSV_FORMAT,
                    disabled: false,
                    command: 'export-csv',
                    positionOrder: 53
                });
            }
            // show grid menu: export to text file as tab delimited
            if (this.sharedService.gridOptions && this.sharedService.gridOptions.enableExport && this.sharedService.gridOptions.gridMenu && !this.sharedService.gridOptions.gridMenu.hideExportTextDelimitedCommand) {
                gridMenuCustomItems.push({
                    iconCssClass: this.sharedService.gridOptions.gridMenu.iconExportTextDelimitedCommand || 'fa fa-download',
                    title: this.sharedService.gridOptions.enableTranslate ? this.translate.instant('EXPORT_TO_TAB_DELIMITED') : Constants.TEXT_EXPORT_IN_TEXT_FORMAT,
                    disabled: false,
                    command: 'export-text-delimited',
                    positionOrder: 54
                });
            }
            // add the custom "Commands" title if there are any commands
            if (this.sharedService.gridOptions && this.sharedService.gridOptions.gridMenu && (gridMenuCustomItems.length > 0 || (this.sharedService.gridOptions.gridMenu.customItems && this.sharedService.gridOptions.gridMenu.customItems.length > 0))) {
                this.sharedService.gridOptions.gridMenu.customTitle = this.sharedService.gridOptions.gridMenu.customTitle || this.extensionUtility.getPickerTitleOutputString('customTitle', 'gridMenu');
            }
            return gridMenuCustomItems;
        };
        /**
         * Execute the Grid Menu Custom command callback that was triggered by the onCommand subscribe
         * These are the default internal custom commands
         * @param event
         * @param GridMenuItem args
         */
        GridMenuExtension.prototype.executeGridMenuInternalCustomCommands = function (e, args) {
            if (args && args.command) {
                switch (args.command) {
                    case 'clear-filter':
                        this.filterService.clearFilters();
                        this.sharedService.dataView.refresh();
                        break;
                    case 'clear-sorting':
                        this.sortService.clearSorting();
                        this.sharedService.dataView.refresh();
                        break;
                    case 'export-csv':
                        this.exportService.exportToFile({
                            delimiter: exports.DelimiterType.comma,
                            filename: 'export',
                            format: exports.FileType.csv,
                            useUtf8WithBom: true
                        });
                        break;
                    case 'export-text-delimited':
                        this.exportService.exportToFile({
                            delimiter: exports.DelimiterType.tab,
                            filename: 'export',
                            format: exports.FileType.txt,
                            useUtf8WithBom: true
                        });
                        break;
                    case 'toggle-filter':
                        var showHeaderRow = this.sharedService && this.sharedService.gridOptions && this.sharedService.gridOptions.showHeaderRow || false;
                        this.sharedService.grid.setHeaderRowVisibility(!showHeaderRow);
                        break;
                    case 'toggle-toppanel':
                        var showTopPanel = this.sharedService && this.sharedService.gridOptions && this.sharedService.gridOptions.showTopPanel || false;
                        this.sharedService.grid.setTopPanelVisibility(!showTopPanel);
                        break;
                    case 'toggle-preheader':
                        var showPreHeaderPanel = this.sharedService && this.sharedService.gridOptions && this.sharedService.gridOptions.showPreHeaderPanel || false;
                        this.sharedService.grid.setPreHeaderPanelVisibility(!showPreHeaderPanel);
                        break;
                    case 'refresh-dataset':
                        this.refreshBackendDataset();
                        break;
                    default:
                        break;
                }
            }
        };
        GridMenuExtension.prototype.emptyGridMenuTitles = function () {
            if (this.sharedService && this.sharedService.gridOptions && this.sharedService.gridOptions.gridMenu) {
                this.sharedService.gridOptions.gridMenu.customTitle = '';
                this.sharedService.gridOptions.gridMenu.columnTitle = '';
                this.sharedService.gridOptions.gridMenu.forceFitTitle = '';
                this.sharedService.gridOptions.gridMenu.syncResizeTitle = '';
            }
        };
        /** @return default Grid Menu options */
        GridMenuExtension.prototype.getDefaultGridMenuOptions = function () {
            return {
                customTitle: undefined,
                columnTitle: this.extensionUtility.getPickerTitleOutputString('columnTitle', 'gridMenu'),
                forceFitTitle: this.extensionUtility.getPickerTitleOutputString('forceFitTitle', 'gridMenu'),
                syncResizeTitle: this.extensionUtility.getPickerTitleOutputString('syncResizeTitle', 'gridMenu'),
                iconCssClass: 'fa fa-bars',
                menuWidth: 18,
                customItems: [],
                hideClearAllFiltersCommand: false,
                hideRefreshDatasetCommand: false,
                hideToggleFilterCommand: false,
            };
        };
        GridMenuExtension = __decorate([
            core.Injectable(),
            __metadata("design:paramtypes", [ExportService,
                ExtensionUtility,
                FilterService,
                SharedService,
                SortService,
                core$1.TranslateService])
        ], GridMenuExtension);
        return GridMenuExtension;
    }());

    var GroupItemMetaProviderExtension = /** @class */ (function () {
        function GroupItemMetaProviderExtension(sharedService) {
            this.sharedService = sharedService;
        }
        GroupItemMetaProviderExtension.prototype.dispose = function () {
            if (this._addon && this._addon.destroy) {
                this._addon.destroy();
            }
        };
        /** register the group item metadata provider to add expand/collapse group handlers */
        GroupItemMetaProviderExtension.prototype.register = function () {
            if (this.sharedService && this.sharedService.grid) {
                this._addon = this.sharedService.groupItemMetadataProvider || {};
                this.sharedService.grid.registerPlugin(this._addon);
                return this._addon;
            }
            return null;
        };
        GroupItemMetaProviderExtension = __decorate([
            core.Injectable(),
            __metadata("design:paramtypes", [SharedService])
        ], GroupItemMetaProviderExtension);
        return GroupItemMetaProviderExtension;
    }());

    var HeaderButtonExtension = /** @class */ (function () {
        function HeaderButtonExtension(extensionUtility, sharedService) {
            this.extensionUtility = extensionUtility;
            this.sharedService = sharedService;
            this._eventHandler = new Slick.EventHandler();
        }
        Object.defineProperty(HeaderButtonExtension.prototype, "eventHandler", {
            get: function () {
                return this._eventHandler;
            },
            enumerable: true,
            configurable: true
        });
        HeaderButtonExtension.prototype.dispose = function () {
            // unsubscribe all SlickGrid events
            this._eventHandler.unsubscribeAll();
            if (this._addon && this._addon.destroy) {
                this._addon.destroy();
            }
        };
        // Header Button Plugin
        HeaderButtonExtension.prototype.register = function () {
            var _this = this;
            if (this.sharedService && this.sharedService.grid && this.sharedService.gridOptions) {
                // dynamically import the SlickGrid plugin (addon) with RequireJS
                this.extensionUtility.loadExtensionDynamically(exports.ExtensionName.headerButton);
                this._addon = new Slick.Plugins.HeaderButtons(this.sharedService.gridOptions.headerButton || {});
                this.sharedService.grid.registerPlugin(this._addon);
                // hook all events
                if (this.sharedService.grid && this.sharedService.gridOptions.headerButton) {
                    if (this.sharedService.gridOptions.headerButton.onExtensionRegistered) {
                        this.sharedService.gridOptions.headerButton.onExtensionRegistered(this._addon);
                    }
                    this._eventHandler.subscribe(this._addon.onCommand, function (e, args) {
                        if (_this.sharedService.gridOptions.headerButton && typeof _this.sharedService.gridOptions.headerButton.onCommand === 'function') {
                            _this.sharedService.gridOptions.headerButton.onCommand(e, args);
                        }
                    });
                }
                return this._addon;
            }
            return null;
        };
        HeaderButtonExtension = __decorate([
            core.Injectable(),
            __metadata("design:paramtypes", [ExtensionUtility, SharedService])
        ], HeaderButtonExtension);
        return HeaderButtonExtension;
    }());

    var HeaderMenuExtension = /** @class */ (function () {
        function HeaderMenuExtension(extensionUtility, filterService, sharedService, sortService, translate) {
            this.extensionUtility = extensionUtility;
            this.filterService = filterService;
            this.sharedService = sharedService;
            this.sortService = sortService;
            this.translate = translate;
            this._eventHandler = new Slick.EventHandler();
        }
        Object.defineProperty(HeaderMenuExtension.prototype, "eventHandler", {
            get: function () {
                return this._eventHandler;
            },
            enumerable: true,
            configurable: true
        });
        HeaderMenuExtension.prototype.dispose = function () {
            // unsubscribe all SlickGrid events
            this._eventHandler.unsubscribeAll();
            if (this._addon && this._addon.destroy) {
                this._addon.destroy();
            }
        };
        /**
        * Create the Header Menu and expose all the available hooks that user can subscribe (onCommand, onBeforeMenuShow, ...)
        * @param grid
        * @param dataView
        * @param columnDefinitions
        */
        HeaderMenuExtension.prototype.register = function () {
            var _this = this;
            if (this.sharedService && this.sharedService.grid && this.sharedService.gridOptions) {
                // dynamically import the SlickGrid plugin (addon) with RequireJS
                this.extensionUtility.loadExtensionDynamically(exports.ExtensionName.headerMenu);
                this.sharedService.gridOptions.headerMenu = __assign({}, this.getDefaultHeaderMenuOptions(), this.sharedService.gridOptions.headerMenu);
                if (this.sharedService.gridOptions.enableHeaderMenu) {
                    this.sharedService.gridOptions.headerMenu = this.addHeaderMenuCustomCommands(this.sharedService.gridOptions, this.sharedService.columnDefinitions);
                }
                this._addon = new Slick.Plugins.HeaderMenu(this.sharedService.gridOptions.headerMenu);
                this.sharedService.grid.registerPlugin(this._addon);
                // hook all events
                if (this.sharedService.grid && this.sharedService.gridOptions.headerMenu) {
                    if (this.sharedService.gridOptions.headerMenu.onExtensionRegistered) {
                        this.sharedService.gridOptions.headerMenu.onExtensionRegistered(this._addon);
                    }
                    this._eventHandler.subscribe(this._addon.onCommand, function (e, args) {
                        _this.executeHeaderMenuInternalCommands(e, args);
                        if (_this.sharedService.gridOptions.headerMenu && typeof _this.sharedService.gridOptions.headerMenu.onCommand === 'function') {
                            _this.sharedService.gridOptions.headerMenu.onCommand(e, args);
                        }
                    });
                    this._eventHandler.subscribe(this._addon.onBeforeMenuShow, function (e, args) {
                        if (_this.sharedService.gridOptions.headerMenu && typeof _this.sharedService.gridOptions.headerMenu.onBeforeMenuShow === 'function') {
                            _this.sharedService.gridOptions.headerMenu.onBeforeMenuShow(e, args);
                        }
                    });
                }
                return this._addon;
            }
            return null;
        };
        /**
         * Create Header Menu with Custom Commands if user has enabled Header Menu
         * @param options
         * @param columnDefinitions
         * @return header menu
         */
        HeaderMenuExtension.prototype.addHeaderMenuCustomCommands = function (options, columnDefinitions) {
            var _this = this;
            var headerMenuOptions = options.headerMenu || {};
            if (columnDefinitions && Array.isArray(columnDefinitions) && options.enableHeaderMenu) {
                columnDefinitions.forEach(function (columnDef) {
                    if (columnDef && !columnDef.excludeFromHeaderMenu) {
                        if (!columnDef.header || !columnDef.header.menu) {
                            columnDef.header = {
                                menu: {
                                    items: []
                                }
                            };
                        }
                        var columnHeaderMenuItems = columnDef && columnDef.header && columnDef.header.menu && columnDef.header.menu.items || [];
                        // Sorting Commands
                        if (options.enableSorting && columnDef.sortable && headerMenuOptions && !headerMenuOptions.hideSortCommands) {
                            if (columnHeaderMenuItems.filter(function (item) { return item.command === 'sort-asc'; }).length === 0) {
                                columnHeaderMenuItems.push({
                                    iconCssClass: headerMenuOptions.iconSortAscCommand || 'fa fa-sort-asc',
                                    title: options.enableTranslate ? _this.translate.instant('SORT_ASCENDING') : Constants.TEXT_SORT_ASCENDING,
                                    command: 'sort-asc',
                                    positionOrder: 50
                                });
                            }
                            if (columnHeaderMenuItems.filter(function (item) { return item.command === 'sort-desc'; }).length === 0) {
                                columnHeaderMenuItems.push({
                                    iconCssClass: headerMenuOptions.iconSortDescCommand || 'fa fa-sort-desc',
                                    title: options.enableTranslate ? _this.translate.instant('SORT_DESCENDING') : Constants.TEXT_SORT_DESCENDING,
                                    command: 'sort-desc',
                                    positionOrder: 51
                                });
                            }
                            // add a divider (separator) between the top sort commands and the other clear commands
                            if (columnHeaderMenuItems.filter(function (item) { return item.positionOrder === 52; }).length === 0) {
                                columnHeaderMenuItems.push({ divider: true, command: '', positionOrder: 52 });
                            }
                            if (!headerMenuOptions.hideClearSortCommand && columnHeaderMenuItems.filter(function (item) { return item.command === 'clear-sort'; }).length === 0) {
                                columnHeaderMenuItems.push({
                                    iconCssClass: headerMenuOptions.iconClearSortCommand || 'fa fa-unsorted',
                                    title: options.enableTranslate ? _this.translate.instant('REMOVE_SORT') : Constants.TEXT_REMOVE_SORT,
                                    command: 'clear-sort',
                                    positionOrder: 54
                                });
                            }
                        }
                        // Filtering Commands
                        if (options.enableFiltering && columnDef.filterable && headerMenuOptions && !headerMenuOptions.hideFilterCommands) {
                            if (!headerMenuOptions.hideClearFilterCommand && columnHeaderMenuItems.filter(function (item) { return item.command === 'clear-filter'; }).length === 0) {
                                columnHeaderMenuItems.push({
                                    iconCssClass: headerMenuOptions.iconClearFilterCommand || 'fa fa-filter',
                                    title: options.enableTranslate ? _this.translate.instant('REMOVE_FILTER') : Constants.TEXT_REMOVE_FILTER,
                                    command: 'clear-filter',
                                    positionOrder: 53
                                });
                            }
                        }
                        // Hide Column Command
                        if (headerMenuOptions && !headerMenuOptions.hideColumnHideCommand && columnHeaderMenuItems.filter(function (item) { return item.command === 'hide'; }).length === 0) {
                            columnHeaderMenuItems.push({
                                iconCssClass: headerMenuOptions.iconColumnHideCommand || 'fa fa-times',
                                title: options.enableTranslate ? _this.translate.instant('HIDE_COLUMN') : Constants.TEXT_HIDE_COLUMN,
                                command: 'hide',
                                positionOrder: 55
                            });
                        }
                        _this.extensionUtility.translateItems(columnHeaderMenuItems, 'titleKey', 'title');
                        _this.extensionUtility.sortItems(columnHeaderMenuItems, 'positionOrder');
                    }
                });
            }
            return headerMenuOptions;
        };
        /** Hide a column from the grid */
        HeaderMenuExtension.prototype.hideColumn = function (column) {
            if (this.sharedService.grid && this.sharedService.grid.getColumns && this.sharedService.grid.setColumns && this.sharedService.grid.getColumnIndex) {
                var columnIndex = this.sharedService.grid.getColumnIndex(column.id);
                var currentColumns = this.sharedService.grid.getColumns();
                var visibleColumns = this.extensionUtility.arrayRemoveItemByIndex(currentColumns, columnIndex);
                this.sharedService.visibleColumns = visibleColumns;
                this.sharedService.grid.setColumns(visibleColumns);
            }
        };
        /**
         * Translate the Header Menu titles, we need to loop through all column definition to re-translate them
         */
        HeaderMenuExtension.prototype.translateHeaderMenu = function () {
            if (this.sharedService.gridOptions && this.sharedService.gridOptions.headerMenu) {
                this.resetHeaderMenuTranslations(this.sharedService.visibleColumns);
            }
        };
        // --
        // private functions
        // ------------------
        /** @return default Header Menu options */
        HeaderMenuExtension.prototype.getDefaultHeaderMenuOptions = function () {
            return {
                autoAlignOffset: 12,
                minWidth: 140,
                hideColumnHideCommand: false,
                hideSortCommands: false,
                title: ''
            };
        };
        /**
         * Reset all the Grid Menu options which have text to translate
         * @param grid menu object
         */
        HeaderMenuExtension.prototype.resetHeaderMenuTranslations = function (columnDefinitions) {
            var _this = this;
            columnDefinitions.forEach(function (columnDef) {
                if (columnDef && columnDef.header && columnDef.header && columnDef.header.menu && columnDef.header.menu.items) {
                    if (!columnDef.excludeFromHeaderMenu) {
                        var columnHeaderMenuItems_1 = columnDef.header.menu.items || [];
                        columnHeaderMenuItems_1.forEach(function (item) {
                            switch (item.command) {
                                case 'clear-filter':
                                    item.title = _this.translate.instant('REMOVE_FILTER') || Constants.TEXT_REMOVE_FILTER;
                                    break;
                                case 'clear-sort':
                                    item.title = _this.translate.instant('REMOVE_SORT') || Constants.TEXT_REMOVE_SORT;
                                    break;
                                case 'sort-asc':
                                    item.title = _this.translate.instant('SORT_ASCENDING') || Constants.TEXT_SORT_ASCENDING;
                                    break;
                                case 'sort-desc':
                                    item.title = _this.translate.instant('SORT_DESCENDING') || Constants.TEXT_SORT_DESCENDING;
                                    break;
                                case 'hide':
                                    item.title = _this.translate.instant('HIDE_COLUMN') || Constants.TEXT_HIDE_COLUMN;
                                    break;
                            }
                            // re-translate if there's a "titleKey"
                            if (_this.sharedService.gridOptions && _this.sharedService.gridOptions.enableTranslate) {
                                _this.extensionUtility.translateItems(columnHeaderMenuItems_1, 'titleKey', 'title');
                            }
                        });
                    }
                }
            });
        };
        /** Clear the Filter on the current column (if it's actually filtered) */
        HeaderMenuExtension.prototype.clearColumnFilter = function (event, args) {
            if (args && args.column) {
                this.filterService.clearFilterByColumnId(event, args.column.id);
            }
        };
        /** Clear the Sort on the current column (if it's actually sorted) */
        HeaderMenuExtension.prototype.clearColumnSort = function (event, args) {
            if (args && args.column && this.sharedService) {
                // get previously sorted columns
                var allSortedCols = this.sortService.getPreviousColumnSorts();
                var sortedColsWithoutCurrent = this.sortService.getPreviousColumnSorts(args.column.id + '');
                if (Array.isArray(allSortedCols) && Array.isArray(sortedColsWithoutCurrent) && allSortedCols.length !== sortedColsWithoutCurrent.length) {
                    if (this.sharedService.gridOptions && this.sharedService.gridOptions.backendServiceApi) {
                        this.sortService.onBackendSortChanged(event, { multiColumnSort: true, sortCols: sortedColsWithoutCurrent, grid: this.sharedService.grid });
                    }
                    else if (this.sharedService.dataView) {
                        this.sortService.onLocalSortChanged(this.sharedService.grid, this.sharedService.dataView, sortedColsWithoutCurrent, true);
                    }
                    else {
                        // when using customDataView, we will simply send it as a onSort event with notify
                        var isMultiSort = this.sharedService.gridOptions && this.sharedService.gridOptions.multiColumnSort || false;
                        var sortOutput = isMultiSort ? sortedColsWithoutCurrent : sortedColsWithoutCurrent[0];
                        args.grid.onSort.notify(sortOutput);
                    }
                    // update the this.sharedService.gridObj sortColumns array which will at the same add the visual sort icon(s) on the UI
                    var updatedSortColumns = sortedColsWithoutCurrent.map(function (col) {
                        return {
                            columnId: col && col.sortCol && col.sortCol.id,
                            sortAsc: col && col.sortAsc
                        };
                    });
                    this.sharedService.grid.setSortColumns(updatedSortColumns); // add sort icon in UI
                }
            }
        };
        /** Execute the Header Menu Commands that was triggered by the onCommand subscribe */
        HeaderMenuExtension.prototype.executeHeaderMenuInternalCommands = function (event, args) {
            if (args && args.command) {
                switch (args.command) {
                    case 'hide':
                        this.hideColumn(args.column);
                        if (this.sharedService.gridOptions && this.sharedService.gridOptions.enableAutoSizeColumns) {
                            this.sharedService.grid.autosizeColumns();
                        }
                        break;
                    case 'clear-filter':
                        this.clearColumnFilter(event, args);
                        break;
                    case 'clear-sort':
                        this.clearColumnSort(event, args);
                        break;
                    case 'sort-asc':
                    case 'sort-desc':
                        var isSortingAsc = (args.command === 'sort-asc');
                        this.sortColumn(event, args, isSortingAsc);
                        break;
                    default:
                        break;
                }
            }
        };
        /** Sort the current column */
        HeaderMenuExtension.prototype.sortColumn = function (event, args, isSortingAsc) {
            if (isSortingAsc === void 0) { isSortingAsc = true; }
            if (args && args.column) {
                // get previously sorted columns
                var sortedColsWithoutCurrent = this.sortService.getPreviousColumnSorts(args.column.id + '');
                // add to the column array, the column sorted by the header menu
                sortedColsWithoutCurrent.push({ sortCol: args.column, sortAsc: isSortingAsc });
                if (this.sharedService.gridOptions.backendServiceApi) {
                    this.sortService.onBackendSortChanged(event, { multiColumnSort: true, sortCols: sortedColsWithoutCurrent, grid: this.sharedService.grid });
                }
                else if (this.sharedService.dataView) {
                    this.sortService.onLocalSortChanged(this.sharedService.grid, this.sharedService.dataView, sortedColsWithoutCurrent);
                }
                else {
                    // when using customDataView, we will simply send it as a onSort event with notify
                    var isMultiSort = this.sharedService && this.sharedService.gridOptions && this.sharedService.gridOptions.multiColumnSort || false;
                    var sortOutput = isMultiSort ? sortedColsWithoutCurrent : sortedColsWithoutCurrent[0];
                    args.grid.onSort.notify(sortOutput);
                }
                // update the this.sharedService.gridObj sortColumns array which will at the same add the visual sort icon(s) on the UI
                var newSortColumns = sortedColsWithoutCurrent.map(function (col) {
                    return {
                        columnId: col && col.sortCol && col.sortCol.id,
                        sortAsc: col && col.sortAsc
                    };
                });
                this.sharedService.grid.setSortColumns(newSortColumns); // add sort icon in UI
            }
        };
        HeaderMenuExtension = __decorate([
            core.Injectable(),
            __metadata("design:paramtypes", [ExtensionUtility,
                FilterService,
                SharedService,
                SortService,
                core$1.TranslateService])
        ], HeaderMenuExtension);
        return HeaderMenuExtension;
    }());

    var DOMPurify$1 = DOMPurify_; // patch to fix rollup to work
    var ROW_DETAIL_CONTAINER_PREFIX = 'container_';
    var PRELOAD_CONTAINER_PREFIX = 'container_loading';
    var RowDetailViewExtension = /** @class */ (function () {
        function RowDetailViewExtension(angularUtilService, appRef, extensionUtility, filterService, sharedService) {
            this.angularUtilService = angularUtilService;
            this.appRef = appRef;
            this.extensionUtility = extensionUtility;
            this.filterService = filterService;
            this.sharedService = sharedService;
            this._views = [];
            this._subscriptions = [];
            this._eventHandler = new Slick.EventHandler();
        }
        Object.defineProperty(RowDetailViewExtension.prototype, "eventHandler", {
            get: function () {
                return this._eventHandler;
            },
            enumerable: true,
            configurable: true
        });
        /** Dispose of the RowDetailView Extension */
        RowDetailViewExtension.prototype.dispose = function () {
            // unsubscribe all SlickGrid events
            this._eventHandler.unsubscribeAll();
            if (this._addon && this._addon.destroy) {
                this._addon.destroy();
            }
            // also unsubscribe all RxJS subscriptions
            this._subscriptions = unsubscribeAllObservables(this._subscriptions);
            this.disposeAllViewComponents();
        };
        /** Dispose of all the opened Row Detail Panels Angular View Components */
        RowDetailViewExtension.prototype.disposeAllViewComponents = function () {
            var _this = this;
            this._views.forEach(function (compRef) { return _this.disposeViewComponent(compRef); });
            this._views = [];
        };
        /**
         * Create the plugin before the Grid creation, else it will behave oddly.
         * Mostly because the column definitions might change after the grid creation
         */
        RowDetailViewExtension.prototype.create = function (columnDefinitions, gridOptions) {
            var _this = this;
            if (columnDefinitions && gridOptions) {
                // dynamically import the SlickGrid plugin (addon) with RequireJS
                this.extensionUtility.loadExtensionDynamically(exports.ExtensionName.rowDetailView);
                if (!gridOptions.rowDetailView) {
                    throw new Error('The Row Detail View requires options to be passed via the "rowDetailView" property of the Grid Options');
                }
                if (gridOptions && gridOptions.rowDetailView) {
                    if (!this._addon) {
                        if (typeof gridOptions.rowDetailView.process === 'function') {
                            // we need to keep the user "process" method and replace it with our own execution method
                            // we do this because when we get the item detail, we need to call "onAsyncResponse.notify" for the plugin to work
                            this._userProcessFn = gridOptions.rowDetailView.process; // keep user's process method
                            gridOptions.rowDetailView.process = function (item) { return _this.onProcessing(item); }; // replace process method & run our internal one
                        }
                        else {
                            throw new Error('You need to provide a "process" function for the Row Detail Extension to work properly');
                        }
                        // load the Preload & RowDetail Templates (could be straight HTML or Angular View/ViewModel)
                        // when those are Angular View/ViewModel, we need to create View Component & provide the html containers to the Plugin (preTemplate/postTemplate methods)
                        if (!gridOptions.rowDetailView.preTemplate) {
                            this._preloadComponent = gridOptions && gridOptions.rowDetailView && gridOptions.rowDetailView.preloadComponent;
                            gridOptions.rowDetailView.preTemplate = function () { return DOMPurify$1.sanitize("<div class=\"" + PRELOAD_CONTAINER_PREFIX + "\"></div>"); };
                        }
                        if (!gridOptions.rowDetailView.postTemplate) {
                            this._viewComponent = gridOptions && gridOptions.rowDetailView && gridOptions.rowDetailView.viewComponent;
                            gridOptions.rowDetailView.postTemplate = function (itemDetail) { return DOMPurify$1.sanitize("<div class=\"" + ROW_DETAIL_CONTAINER_PREFIX + itemDetail.id + "\"></div>"); };
                        }
                        // finally register the Row Detail View Plugin
                        this._addon = new Slick.Plugins.RowDetailView(gridOptions.rowDetailView);
                    }
                    var selectionColumn = this._addon.getColumnDefinition();
                    if (typeof selectionColumn === 'object') {
                        selectionColumn.excludeFromExport = true;
                        selectionColumn.excludeFromColumnPicker = true;
                        selectionColumn.excludeFromGridMenu = true;
                        selectionColumn.excludeFromQuery = true;
                        selectionColumn.excludeFromHeaderMenu = true;
                        columnDefinitions.unshift(selectionColumn);
                    }
                }
                return this._addon;
            }
            return null;
        };
        RowDetailViewExtension.prototype.register = function (rowSelectionPlugin) {
            var _this = this;
            if (this.sharedService && this.sharedService.grid && this.sharedService.gridOptions) {
                // the plugin has to be created BEFORE the grid (else it behaves oddly), but we can only watch grid events AFTER the grid is created
                this.sharedService.grid.registerPlugin(this._addon);
                // this also requires the Row Selection Model to be registered as well
                if (!rowSelectionPlugin || !this.sharedService.grid.getSelectionModel()) {
                    this.extensionUtility.loadExtensionDynamically(exports.ExtensionName.rowSelection);
                    rowSelectionPlugin = new Slick.RowSelectionModel(this.sharedService.gridOptions.rowSelectionOptions || { selectActiveRow: true });
                    this.sharedService.grid.setSelectionModel(rowSelectionPlugin);
                }
                // hook all events
                if (this.sharedService.grid && this.sharedService.gridOptions.rowDetailView) {
                    if (this.sharedService.gridOptions.rowDetailView.onExtensionRegistered) {
                        this.sharedService.gridOptions.rowDetailView.onExtensionRegistered(this._addon);
                    }
                    this._eventHandler.subscribe(this._addon.onAsyncResponse, function (e, args) {
                        if (_this.sharedService.gridOptions.rowDetailView && typeof _this.sharedService.gridOptions.rowDetailView.onAsyncResponse === 'function') {
                            _this.sharedService.gridOptions.rowDetailView.onAsyncResponse(e, args);
                        }
                    });
                    this._eventHandler.subscribe(this._addon.onAsyncEndUpdate, function (e, args) {
                        // triggers after backend called "onAsyncResponse.notify()"
                        _this.renderViewModel(args && args.item);
                        if (_this.sharedService.gridOptions.rowDetailView && typeof _this.sharedService.gridOptions.rowDetailView.onAsyncEndUpdate === 'function') {
                            _this.sharedService.gridOptions.rowDetailView.onAsyncEndUpdate(e, args);
                        }
                    });
                    this._eventHandler.subscribe(this._addon.onAfterRowDetailToggle, function (e, args) {
                        // display preload template & re-render all the other Detail Views after toggling
                        // the preload View will eventually go away once the data gets loaded after the "onAsyncEndUpdate" event
                        _this.renderPreloadView();
                        _this.renderAllViewComponents();
                        if (_this.sharedService.gridOptions.rowDetailView && typeof _this.sharedService.gridOptions.rowDetailView.onAfterRowDetailToggle === 'function') {
                            _this.sharedService.gridOptions.rowDetailView.onAfterRowDetailToggle(e, args);
                        }
                    });
                    this._eventHandler.subscribe(this._addon.onBeforeRowDetailToggle, function (e, args) {
                        // before toggling row detail, we need to create View Component if it doesn't exist
                        _this.onBeforeRowDetailToggle(e, args);
                        if (_this.sharedService.gridOptions.rowDetailView && typeof _this.sharedService.gridOptions.rowDetailView.onBeforeRowDetailToggle === 'function') {
                            _this.sharedService.gridOptions.rowDetailView.onBeforeRowDetailToggle(e, args);
                        }
                    });
                    this._eventHandler.subscribe(this._addon.onRowBackToViewportRange, function (e, args) {
                        // when row is back to viewport range, we will re-render the View Component(s)
                        _this.onRowBackToViewportRange(e, args);
                        if (_this.sharedService.gridOptions.rowDetailView && typeof _this.sharedService.gridOptions.rowDetailView.onRowBackToViewportRange === 'function') {
                            _this.sharedService.gridOptions.rowDetailView.onRowBackToViewportRange(e, args);
                        }
                    });
                    this._eventHandler.subscribe(this._addon.onRowOutOfViewportRange, function (e, args) {
                        if (_this.sharedService.gridOptions.rowDetailView && typeof _this.sharedService.gridOptions.rowDetailView.onRowOutOfViewportRange === 'function') {
                            _this.sharedService.gridOptions.rowDetailView.onRowOutOfViewportRange(e, args);
                        }
                    });
                    // --
                    // hook some events needed by the Plugin itself
                    this._eventHandler.subscribe(this.sharedService.grid.onColumnsReordered, function () { return _this.redrawAllViewComponents(); });
                    // on sort, all row detail are collapsed so we can dispose of all the Views as well
                    this._eventHandler.subscribe(this.sharedService.grid.onSort, function () { return _this.disposeAllViewComponents(); });
                    // on filter changed, we need to re-render all Views
                    this._subscriptions.push(this.filterService.onFilterChanged.subscribe(function () { return _this.redrawAllViewComponents(); }));
                }
                return this._addon;
            }
            return null;
        };
        // --
        // private functions
        // ------------------
        RowDetailViewExtension.prototype.disposeViewComponent = function (expandedView) {
            var compRef = expandedView && expandedView.componentRef;
            if (compRef) {
                this.appRef.detachView(compRef.hostView);
                compRef.destroy();
                return expandedView;
            }
            return null;
        };
        /**
         * notify the onAsyncResponse with the "args.item" (required property)
         * the plugin will then use item to populate the row detail panel with the "postTemplate"
         * @param item
         */
        RowDetailViewExtension.prototype.notifyTemplate = function (item) {
            if (this._addon) {
                this._addon.onAsyncResponse.notify({ item: item }, undefined, this);
            }
        };
        /**
         * On Processing, we will notify the plugin with the new item detail once backend server call completes
         * @param item
         */
        RowDetailViewExtension.prototype.onProcessing = function (item) {
            return __awaiter(this, void 0, void 0, function () {
                var awaitedItemDetail, userProcessFn, response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(item && typeof this._userProcessFn === 'function')) return [3 /*break*/, 5];
                            awaitedItemDetail = void 0;
                            userProcessFn = this._userProcessFn(item);
                            return [4 /*yield*/, userProcessFn];
                        case 1:
                            response = _a.sent();
                            if (!response.hasOwnProperty('id')) return [3 /*break*/, 2];
                            awaitedItemDetail = response; // from Promise
                            return [3 /*break*/, 4];
                        case 2:
                            if (!(response && response instanceof rxjs.Observable || response instanceof Promise)) return [3 /*break*/, 4];
                            return [4 /*yield*/, castToPromise(response)];
                        case 3:
                            awaitedItemDetail = _a.sent(); // from Angular-http-client
                            _a.label = 4;
                        case 4:
                            if (!awaitedItemDetail || !awaitedItemDetail.hasOwnProperty('id')) {
                                throw new Error("[Angular-Slickgrid] could not process the Row Detail, you must make sure that your \"process\" callback\n          (a Promise or an HttpClient call returning an Observable) returns an item object that has an \"id\" property");
                            }
                            // notify the plugin with the new item details
                            this.notifyTemplate(awaitedItemDetail || {});
                            _a.label = 5;
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Just before the row get expanded or collapsed we will do the following
         * First determine if the row is expanding or collapsing,
         * if it's expanding we will add it to our View Components reference array if we don't already have it
         * or if it's collapsing we will remove it from our View Components reference array
         */
        RowDetailViewExtension.prototype.onBeforeRowDetailToggle = function (e, args) {
            // expanding
            if (args && args.item && args.item.__collapsed) {
                // expanding row detail
                var viewInfo = {
                    id: args.item.id,
                    dataContext: args.item
                };
                addToArrayWhenNotExists(this._views, viewInfo);
            }
            else {
                // collapsing, so dispose of the View/Component
                var foundViewIndex = this._views.findIndex(function (view) { return view.id === args.item.id; });
                if (foundViewIndex >= 0 && this._views.hasOwnProperty(foundViewIndex)) {
                    var compRef = this._views[foundViewIndex].componentRef;
                    this.appRef.detachView(compRef.hostView);
                    compRef.destroy();
                    this._views.splice(foundViewIndex, 1);
                }
            }
        };
        /** When Row comes back to Viewport Range, we need to redraw the View */
        RowDetailViewExtension.prototype.onRowBackToViewportRange = function (e, args) {
            var _this = this;
            if (args && args.item) {
                this._views.forEach(function (view) {
                    if (view.id === args.item.id) {
                        _this.redrawViewComponent(view);
                    }
                });
            }
        };
        /** Redraw (re-render) all the expanded row detail View Components */
        RowDetailViewExtension.prototype.redrawAllViewComponents = function () {
            var _this = this;
            this._views.forEach(function (compRef) {
                _this.redrawViewComponent(compRef);
            });
        };
        /** Render all the expanded row detail View Components */
        RowDetailViewExtension.prototype.renderAllViewComponents = function () {
            var _this = this;
            this._views.forEach(function (view) {
                if (view && view.dataContext) {
                    _this.renderViewModel(view.dataContext);
                }
            });
        };
        /** Redraw the necessary View Component */
        RowDetailViewExtension.prototype.redrawViewComponent = function (createdView) {
            var containerElements = document.getElementsByClassName("" + ROW_DETAIL_CONTAINER_PREFIX + createdView.id);
            if (containerElements && containerElements.length) {
                this.renderViewModel(createdView.dataContext);
            }
        };
        /** Render (or rerender) the View Component (Row Detail) */
        RowDetailViewExtension.prototype.renderPreloadView = function () {
            var containerElements = document.getElementsByClassName("" + PRELOAD_CONTAINER_PREFIX);
            if (containerElements && containerElements.length) {
                this.angularUtilService.createAngularComponentAppendToDom(this._preloadComponent, containerElements[0], true);
            }
        };
        /** Render (or rerender) the View Component (Row Detail) */
        RowDetailViewExtension.prototype.renderViewModel = function (item) {
            var containerElements = document.getElementsByClassName("" + ROW_DETAIL_CONTAINER_PREFIX + item.id);
            if (containerElements && containerElements.length) {
                var componentOutput = this.angularUtilService.createAngularComponentAppendToDom(this._viewComponent, containerElements[0], true);
                if (componentOutput && componentOutput.componentRef && componentOutput.componentRef.instance) {
                    Object.assign(componentOutput.componentRef.instance, { model: item });
                    var viewObj = this._views.find(function (obj) { return obj.id === item.id; });
                    if (viewObj) {
                        viewObj.componentRef = componentOutput.componentRef;
                    }
                }
            }
        };
        RowDetailViewExtension = __decorate([
            core.Injectable(),
            __metadata("design:paramtypes", [AngularUtilService,
                core.ApplicationRef,
                ExtensionUtility,
                FilterService,
                SharedService])
        ], RowDetailViewExtension);
        return RowDetailViewExtension;
    }());

    var RowMoveManagerExtension = /** @class */ (function () {
        function RowMoveManagerExtension(extensionUtility, sharedService) {
            this.extensionUtility = extensionUtility;
            this.sharedService = sharedService;
            this._eventHandler = new Slick.EventHandler();
        }
        Object.defineProperty(RowMoveManagerExtension.prototype, "eventHandler", {
            get: function () {
                return this._eventHandler;
            },
            enumerable: true,
            configurable: true
        });
        RowMoveManagerExtension.prototype.dispose = function () {
            // unsubscribe all SlickGrid events
            this._eventHandler.unsubscribeAll();
            if (this._addon && this._addon.destroy) {
                this._addon.destroy();
            }
        };
        RowMoveManagerExtension.prototype.register = function (rowSelectionPlugin) {
            var _this = this;
            if (this.sharedService && this.sharedService.grid && this.sharedService.gridOptions) {
                // dynamically import the SlickGrid plugin (addon) with RequireJS
                this.extensionUtility.loadExtensionDynamically(exports.ExtensionName.rowMoveManager);
                // this also requires the Row Selection Model to be registered as well
                if (!rowSelectionPlugin || !this.sharedService.grid.getSelectionModel()) {
                    this.extensionUtility.loadExtensionDynamically(exports.ExtensionName.rowSelection);
                    rowSelectionPlugin = new Slick.RowSelectionModel(this.sharedService.gridOptions.rowSelectionOptions || {});
                    this.sharedService.grid.setSelectionModel(rowSelectionPlugin);
                }
                this._addon = new Slick.RowMoveManager(this.sharedService.gridOptions.rowMoveManager || { cancelEditOnDrag: true });
                this.sharedService.grid.registerPlugin(this._addon);
                // hook all events
                if (this.sharedService.grid && this.sharedService.gridOptions.rowMoveManager) {
                    if (this.sharedService.gridOptions.rowMoveManager.onExtensionRegistered) {
                        this.sharedService.gridOptions.rowMoveManager.onExtensionRegistered(this._addon);
                    }
                    this._eventHandler.subscribe(this._addon.onBeforeMoveRows, function (e, args) {
                        if (_this.sharedService.gridOptions.rowMoveManager && typeof _this.sharedService.gridOptions.rowMoveManager.onBeforeMoveRows === 'function') {
                            _this.sharedService.gridOptions.rowMoveManager.onBeforeMoveRows(e, args);
                        }
                    });
                    this._eventHandler.subscribe(this._addon.onMoveRows, function (e, args) {
                        if (_this.sharedService.gridOptions.rowMoveManager && typeof _this.sharedService.gridOptions.rowMoveManager.onMoveRows === 'function') {
                            _this.sharedService.gridOptions.rowMoveManager.onMoveRows(e, args);
                        }
                    });
                }
                return this._addon;
            }
            return null;
        };
        RowMoveManagerExtension = __decorate([
            core.Injectable(),
            __metadata("design:paramtypes", [ExtensionUtility, SharedService])
        ], RowMoveManagerExtension);
        return RowMoveManagerExtension;
    }());

    var RowSelectionExtension = /** @class */ (function () {
        function RowSelectionExtension(extensionUtility, sharedService) {
            this.extensionUtility = extensionUtility;
            this.sharedService = sharedService;
        }
        RowSelectionExtension.prototype.dispose = function () {
            if (this._addon && this._addon.destroy) {
                this._addon.destroy();
            }
        };
        RowSelectionExtension.prototype.register = function () {
            if (this.sharedService && this.sharedService.grid && this.sharedService.gridOptions) {
                // dynamically import the SlickGrid plugin (addon) with RequireJS
                this.extensionUtility.loadExtensionDynamically(exports.ExtensionName.rowSelection);
                this._addon = new Slick.RowSelectionModel(this.sharedService.gridOptions.rowSelectionOptions || {});
                this.sharedService.grid.setSelectionModel(this._addon);
                return this._addon;
            }
            return null;
        };
        RowSelectionExtension = __decorate([
            core.Injectable(),
            __metadata("design:paramtypes", [ExtensionUtility, SharedService])
        ], RowSelectionExtension);
        return RowSelectionExtension;
    }());

    var ExtensionService = /** @class */ (function () {
        function ExtensionService(autoTooltipExtension, cellExternalCopyExtension, checkboxSelectorExtension, columnPickerExtension, draggableGroupingExtension, gridMenuExtension, groupItemMetaExtension, headerButtonExtension, headerMenuExtension, rowDetailViewExtension, rowMoveManagerExtension, rowSelectionExtension, sharedService, translate) {
            this.autoTooltipExtension = autoTooltipExtension;
            this.cellExternalCopyExtension = cellExternalCopyExtension;
            this.checkboxSelectorExtension = checkboxSelectorExtension;
            this.columnPickerExtension = columnPickerExtension;
            this.draggableGroupingExtension = draggableGroupingExtension;
            this.gridMenuExtension = gridMenuExtension;
            this.groupItemMetaExtension = groupItemMetaExtension;
            this.headerButtonExtension = headerButtonExtension;
            this.headerMenuExtension = headerMenuExtension;
            this.rowDetailViewExtension = rowDetailViewExtension;
            this.rowMoveManagerExtension = rowMoveManagerExtension;
            this.rowSelectionExtension = rowSelectionExtension;
            this.sharedService = sharedService;
            this.translate = translate;
            this._extensionList = [];
        }
        /** Dispose of all the controls & plugins */
        ExtensionService.prototype.dispose = function () {
            this.sharedService.grid = null;
            this.sharedService.visibleColumns = [];
            // dispose of each control/plugin & reset the list
            this._extensionList.forEach(function (item) {
                if (item && item.class && item.class.dispose) {
                    item.class.dispose();
                }
            });
            this._extensionList = [];
        };
        /** Get all columns (includes visible and non-visible) */
        ExtensionService.prototype.getAllColumns = function () {
            return this.sharedService.allColumns || [];
        };
        /** Get only visible columns */
        ExtensionService.prototype.getVisibleColumns = function () {
            return this.sharedService.visibleColumns || [];
        };
        /** Get all Extensions */
        ExtensionService.prototype.getAllExtensions = function () {
            return this._extensionList;
        };
        /**
         * Get an Extension by it's name
         *  @param name
         */
        ExtensionService.prototype.getExtensionByName = function (name) {
            return this._extensionList.find(function (p) { return p.name === name; });
        };
        /**
         * Get the instance of the SlickGrid addon (control or plugin).
         * This is the raw addon coming directly from SlickGrid itself, not to confuse with Angular-Slickgrid extension
         *  @param name
         */
        ExtensionService.prototype.getSlickgridAddonInstance = function (name) {
            var extension = this.getExtensionByName(name);
            if (extension && (extension.instance || extension.addon)) {
                return extension.instance;
            }
            return null;
        };
        /** Auto-resize all the column in the grid to fit the grid width */
        ExtensionService.prototype.autoResizeColumns = function () {
            this.sharedService.grid.autosizeColumns();
        };
        /** Attach/Create different Controls or Plugins after the Grid is created */
        ExtensionService.prototype.bindDifferentExtensions = function () {
            var _this = this;
            if (this.sharedService && this.sharedService.gridOptions) {
                // make sure all columns are translated before creating ColumnPicker/GridMenu Controls
                // this is to avoid having hidden columns not being translated on first load
                if (this.sharedService.gridOptions.enableTranslate) {
                    this.translateItems(this.sharedService.allColumns, 'headerKey', 'name');
                }
                // Auto Tooltip Plugin
                if (this.sharedService.gridOptions.enableAutoTooltip) {
                    if (this.autoTooltipExtension && this.autoTooltipExtension.register) {
                        var instance = this.autoTooltipExtension.register();
                        this._extensionList.push({ name: exports.ExtensionName.autoTooltip, class: this.autoTooltipExtension, addon: instance, instance: instance });
                    }
                }
                // Cell External Copy Manager Plugin (Excel Like)
                if (this.sharedService.gridOptions.enableExcelCopyBuffer) {
                    if (this.cellExternalCopyExtension && this.cellExternalCopyExtension.register) {
                        var instance = this.cellExternalCopyExtension.register();
                        this._extensionList.push({ name: exports.ExtensionName.cellExternalCopyManager, class: this.cellExternalCopyExtension, addon: instance, instance: instance });
                    }
                }
                // Checkbox Selector Plugin
                if (this.sharedService.gridOptions.enableCheckboxSelector) {
                    if (this.checkboxSelectorExtension && this.checkboxSelectorExtension.register) {
                        var rowSelectionExtension = this.getExtensionByName(exports.ExtensionName.rowSelection);
                        var instance = this.checkboxSelectorExtension.register(rowSelectionExtension);
                        this._extensionList.push({ name: exports.ExtensionName.checkboxSelector, class: this.checkboxSelectorExtension, addon: instance, instance: instance });
                    }
                }
                // Column Picker Control
                if (this.sharedService.gridOptions.enableColumnPicker) {
                    if (this.columnPickerExtension && this.columnPickerExtension.register) {
                        var instance = this.columnPickerExtension.register();
                        this._extensionList.push({ name: exports.ExtensionName.columnPicker, class: this.columnPickerExtension, addon: instance, instance: instance });
                    }
                }
                // Draggable Grouping Plugin
                if (this.sharedService.gridOptions.enableDraggableGrouping) {
                    if (this.draggableGroupingExtension && this.draggableGroupingExtension.register) {
                        var instance = this.draggableGroupingExtension.register();
                        this._extensionList.push({ name: exports.ExtensionName.draggableGrouping, class: this.draggableGroupingExtension, addon: instance, instance: instance });
                    }
                }
                // Grid Menu Control
                if (this.sharedService.gridOptions.enableGridMenu) {
                    if (this.gridMenuExtension && this.gridMenuExtension.register) {
                        var instance = this.gridMenuExtension.register();
                        this._extensionList.push({ name: exports.ExtensionName.gridMenu, class: this.gridMenuExtension, addon: instance, instance: instance });
                    }
                }
                // Grouping Plugin
                // register the group item metadata provider to add expand/collapse group handlers
                if (this.sharedService.gridOptions.enableDraggableGrouping || this.sharedService.gridOptions.enableGrouping) {
                    if (this.groupItemMetaExtension && this.groupItemMetaExtension.register) {
                        var instance = this.groupItemMetaExtension.register();
                        this._extensionList.push({ name: exports.ExtensionName.groupItemMetaProvider, class: this.groupItemMetaExtension, addon: instance, instance: instance });
                    }
                }
                // Header Button Plugin
                if (this.sharedService.gridOptions.enableHeaderButton) {
                    if (this.headerButtonExtension && this.headerButtonExtension.register) {
                        var instance = this.headerButtonExtension.register();
                        this._extensionList.push({ name: exports.ExtensionName.headerButton, class: this.headerButtonExtension, addon: instance, instance: instance });
                    }
                }
                // Header Menu Plugin
                if (this.sharedService.gridOptions.enableHeaderMenu) {
                    if (this.headerMenuExtension && this.headerMenuExtension.register) {
                        var instance = this.headerMenuExtension.register();
                        this._extensionList.push({ name: exports.ExtensionName.headerMenu, class: this.headerMenuExtension, addon: instance, instance: instance });
                    }
                }
                // Row Detail View Plugin
                if (this.sharedService.gridOptions.enableRowDetailView) {
                    if (this.rowDetailViewExtension && this.rowDetailViewExtension.register) {
                        var rowSelectionExtension = this.getExtensionByName(exports.ExtensionName.rowSelection);
                        var instance = this.rowDetailViewExtension.register(rowSelectionExtension);
                        this._extensionList.push({ name: exports.ExtensionName.rowDetailView, class: this.rowDetailViewExtension, addon: instance, instance: instance });
                    }
                }
                // Row Move Manager Plugin
                if (this.sharedService.gridOptions.enableRowMoveManager) {
                    if (this.rowMoveManagerExtension && this.rowMoveManagerExtension.register) {
                        var instance = this.rowMoveManagerExtension.register();
                        this._extensionList.push({ name: exports.ExtensionName.rowMoveManager, class: this.rowMoveManagerExtension, addon: instance, instance: instance });
                    }
                }
                // Row Selection Plugin
                if (!this.sharedService.gridOptions.enableCheckboxSelector && this.sharedService.gridOptions.enableRowSelection) {
                    if (this.rowSelectionExtension && this.rowSelectionExtension.register) {
                        var instance = this.rowSelectionExtension.register();
                        this._extensionList.push({ name: exports.ExtensionName.rowSelection, class: this.rowSelectionExtension, addon: instance, instance: instance });
                    }
                }
                // manually register other plugins
                if (this.sharedService.gridOptions.registerPlugins !== undefined) {
                    if (Array.isArray(this.sharedService.gridOptions.registerPlugins)) {
                        this.sharedService.gridOptions.registerPlugins.forEach(function (plugin) {
                            var instance = _this.sharedService.grid.registerPlugin(plugin);
                            _this._extensionList.push({ name: exports.ExtensionName.noname, class: null, addon: instance, instance: instance });
                        });
                    }
                    else {
                        this.sharedService.grid.registerPlugin(this.sharedService.gridOptions.registerPlugins);
                        var plugin = this.sharedService.gridOptions.registerPlugins;
                        var instance = this.sharedService.grid.registerPlugin(plugin);
                        this._extensionList.push({ name: exports.ExtensionName.noname, class: null, addon: instance, instance: instance });
                    }
                }
            }
        };
        /**
         * Attach/Create certain plugins before the Grid creation, else they might behave oddly.
         * Mostly because the column definitions might change after the grid creation
         * @param columnDefinitions
         * @param options
         */
        ExtensionService.prototype.createExtensionsBeforeGridCreation = function (columnDefinitions, options) {
            if (options.enableCheckboxSelector) {
                this.checkboxSelectorExtension.create(columnDefinitions, options);
            }
            if (options.enableRowDetailView) {
                this.rowDetailViewExtension.create(columnDefinitions, options);
            }
            if (options.enableDraggableGrouping) {
                var plugin = this.draggableGroupingExtension.create(options);
                options.enableColumnReorder = plugin.getSetupColumnReorder;
            }
        };
        /** Hide a column from the grid */
        ExtensionService.prototype.hideColumn = function (column) {
            if (this.sharedService && this.sharedService.grid && this.sharedService.grid.getColumns && this.sharedService.grid.setColumns) {
                var columnIndex = this.sharedService.grid.getColumnIndex(column.id);
                this.sharedService.visibleColumns = this.removeColumnByIndex(this.sharedService.grid.getColumns(), columnIndex);
                this.sharedService.grid.setColumns(this.sharedService.visibleColumns);
            }
        };
        /** Refresh the dataset through the Backend Service */
        ExtensionService.prototype.refreshBackendDataset = function (gridOptions) {
            this.gridMenuExtension.refreshBackendDataset(gridOptions);
        };
        /**
         * Remove a column from the grid by it's index in the grid
         * @param columns input
         * @param index
         */
        ExtensionService.prototype.removeColumnByIndex = function (columns, index) {
            if (Array.isArray(columns)) {
                return columns.filter(function (el, i) { return index !== i; });
            }
            return columns;
        };
        /** Translate the Column Picker and it's last 2 checkboxes */
        ExtensionService.prototype.translateColumnPicker = function () {
            if (this.columnPickerExtension && this.columnPickerExtension.translateColumnPicker) {
                this.columnPickerExtension.translateColumnPicker();
            }
        };
        /**
         * Translate the Header Menu titles, we need to loop through all column definition to re-translate them
         */
        ExtensionService.prototype.translateGridMenu = function () {
            if (this.gridMenuExtension && this.gridMenuExtension.translateGridMenu) {
                this.gridMenuExtension.translateGridMenu();
            }
        };
        /**
         * Translate the Header Menu titles, we need to loop through all column definition to re-translate them
         */
        ExtensionService.prototype.translateHeaderMenu = function () {
            if (this.headerMenuExtension && this.headerMenuExtension.translateHeaderMenu) {
                this.headerMenuExtension.translateHeaderMenu();
            }
        };
        /**
         * Translate manually the header titles.
         * We could optionally pass a locale (that will change currently loaded locale), else it will use current locale
         * @param locale to use
         * @param new column definitions (optional)
         */
        ExtensionService.prototype.translateColumnHeaders = function (locale, newColumnDefinitions) {
            if (locale) {
                this.translate.use(locale);
            }
            var columnDefinitions = newColumnDefinitions;
            if (!columnDefinitions) {
                columnDefinitions = this.sharedService.columnDefinitions;
            }
            this.translateItems(columnDefinitions, 'headerKey', 'name');
            this.translateItems(this.sharedService.allColumns, 'headerKey', 'name');
            // re-render the column headers
            this.renderColumnHeaders(columnDefinitions);
        };
        /**
         * Render (or re-render) the column headers from column definitions.
         * calling setColumns() will trigger a grid re-render
         */
        ExtensionService.prototype.renderColumnHeaders = function (newColumnDefinitions) {
            var collection = newColumnDefinitions;
            if (!collection) {
                collection = this.sharedService.columnDefinitions;
            }
            if (Array.isArray(collection) && this.sharedService.grid && this.sharedService.grid.setColumns) {
                this.sharedService.grid.setColumns(collection);
            }
        };
        /** Translate an array of items from an input key and assign translated value to the output key */
        ExtensionService.prototype.translateItems = function (items, inputKey, outputKey) {
            var e_1, _a;
            if (Array.isArray(items)) {
                try {
                    for (var items_1 = __values(items), items_1_1 = items_1.next(); !items_1_1.done; items_1_1 = items_1.next()) {
                        var item = items_1_1.value;
                        if (item[inputKey]) {
                            item[outputKey] = this.translate.instant(item[inputKey]);
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (items_1_1 && !items_1_1.done && (_a = items_1.return)) _a.call(items_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
        };
        ExtensionService = __decorate([
            core.Injectable(),
            __metadata("design:paramtypes", [AutoTooltipExtension,
                CellExternalCopyManagerExtension,
                CheckboxSelectorExtension,
                ColumnPickerExtension,
                DraggableGroupingExtension,
                GridMenuExtension,
                GroupItemMetaProviderExtension,
                HeaderButtonExtension,
                HeaderMenuExtension,
                RowDetailViewExtension,
                RowMoveManagerExtension,
                RowSelectionExtension,
                SharedService,
                core$1.TranslateService])
        ], ExtensionService);
        return ExtensionService;
    }());

    /**
     * This GraphqlQueryBuilder class is a lib that already exist
     * but was causing issues with TypeScript, RequireJS and other bundler/packagers
     * and so I rewrote it in pure TypeScript.
     *
     * The previous lib can be viewed here at this Github
     * https://github.com/codemeasandwich/graphql-query-builder
     */
    var GraphqlQueryBuilder = /** @class */ (function () {
        /* Constructor, query/mutator you wish to use, and an alias or filter arguments. */
        function GraphqlQueryBuilder(queryFnName, aliasOrFilter) {
            this.queryFnName = queryFnName;
            this.head = [];
            if (typeof aliasOrFilter === 'function') {
                this.alias = aliasOrFilter;
            }
            else if (typeof aliasOrFilter === 'object') {
                this.filter(aliasOrFilter);
            }
            else if (undefined === aliasOrFilter && 2 === arguments.length) {
                throw new TypeError("You have passed undefined as Second argument to \"Query\"");
            }
            else if (undefined !== aliasOrFilter) {
                throw new TypeError("Second argument to \"Query\" should be an alias name(String) or filter arguments(Object). was passed " + aliasOrFilter);
            }
        }
        /**
         * The parameters to run the query against.
         * @param filters An object mapping attribute to values
         */
        GraphqlQueryBuilder.prototype.filter = function (filters) {
            var e_1, _a;
            try {
                for (var _b = __values(Object.keys(filters)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var prop = _c.value;
                    if (typeof filters[prop] === 'function') {
                        continue;
                    }
                    var val = this.getGraphQLValue(filters[prop]);
                    if (val === '{}') {
                        continue;
                    }
                    this.head.push(prop + ":" + val);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return this;
        };
        /**
         * Outlines the properties you wish to be returned from the query.
         * @param properties representing each attribute you want Returned
         */
        GraphqlQueryBuilder.prototype.find = function () {
            var searches = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                searches[_i] = arguments[_i];
            }
            if (!searches) {
                throw new TypeError("find value can not be >>falsy<<");
            }
            // if its a string.. it may have other values
            // else it sould be an Object or Array of maped values
            var searchKeys = (searches.length === 1 && Array.isArray(searches[0])) ? searches[0] : searches;
            this.body = this.parceFind(searchKeys);
            return this;
        };
        /**
         * set an alias for this result.
         * @param alias
         */
        GraphqlQueryBuilder.prototype.setAlias = function (alias) {
            this.alias = alias;
        };
        /**
         * Return to the formatted query string
         * @return
         */
        GraphqlQueryBuilder.prototype.toString = function () {
            if (this.body === undefined) {
                throw new ReferenceError("return properties are not defined. use the 'find' function to defined them");
            }
            return ((this.alias) ? (this.alias + ':') : '') + " " + this.queryFnName + " " + ((this.head.length > 0) ? '(' + this.head.join(',') + ')' : '') + "  { " + this.body + " }";
        };
        // --
        // PRIVATE FUNCTIONS
        // -----------------
        GraphqlQueryBuilder.prototype.parceFind = function (_levelA) {
            var propsA = _levelA.map(function (currentValue, index) {
                var itemX = _levelA[index];
                if (itemX instanceof GraphqlQueryBuilder) {
                    return itemX.toString();
                }
                else if (!Array.isArray(itemX) && typeof itemX === 'object') {
                    var propsAA = Object.keys(itemX);
                    if (1 !== propsAA.length) {
                        throw new RangeError("Alias objects should only have one value. was passed: " + JSON.stringify(itemX));
                    }
                    var propS = propsAA[0];
                    var item = itemX[propS];
                    if (Array.isArray(item)) {
                        return new GraphqlQueryBuilder(propS).find(item);
                    }
                    return propS + " : " + item + " ";
                }
                else if (typeof itemX === 'string') {
                    return itemX;
                }
                else {
                    throw new RangeError("cannot handle Find value of " + itemX);
                }
            });
            return propsA.join(',');
        };
        GraphqlQueryBuilder.prototype.getGraphQLValue = function (value) {
            var _this = this;
            if (typeof value === 'string') {
                value = JSON.stringify(value);
            }
            else if (Array.isArray(value)) {
                value = value.map(function (item) {
                    return _this.getGraphQLValue(item);
                }).join();
                value = "[" + value + "]";
            }
            else if (value instanceof Date) {
                value = JSON.stringify(value);
            }
            else if (value !== null && typeof value === 'object') {
                value = this.objectToString(value);
            }
            return value;
        };
        GraphqlQueryBuilder.prototype.objectToString = function (obj) {
            var e_2, _a;
            var sourceA = [];
            try {
                for (var _b = __values(Object.keys(obj)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var prop = _c.value;
                    if (typeof obj[prop] === 'function') {
                        continue;
                    }
                    sourceA.push(prop + ":" + this.getGraphQLValue(obj[prop]));
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return "{" + sourceA.join() + "}";
        };
        return GraphqlQueryBuilder;
    }());

    var DEFAULT_ITEMS_PER_PAGE = 25;
    var DEFAULT_PAGE_SIZE = 20;
    var GraphqlService = /** @class */ (function () {
        function GraphqlService() {
            this._currentFilters = [];
            this._currentSorters = [];
            this.defaultPaginationOptions = {
                first: DEFAULT_ITEMS_PER_PAGE,
                offset: 0
            };
        }
        Object.defineProperty(GraphqlService.prototype, "_gridOptions", {
            /** Getter for the Grid Options pulled through the Grid Object */
            get: function () {
                return (this._grid && this._grid.getOptions) ? this._grid.getOptions() : {};
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Build the GraphQL query, since the service include/exclude cursor, the output query will be different.
         * @param serviceOptions GraphqlServiceOption
         */
        GraphqlService.prototype.buildQuery = function () {
            var e_1, _a, e_2, _b;
            if (!this.options || !this.options.datasetName || (!this._columnDefinitions && !this.options.columnDefinitions)) {
                throw new Error('GraphQL Service requires "datasetName" & "columnDefinitions" properties for it to work');
            }
            // get the column definitions and exclude some if they were tagged as excluded
            var columnDefinitions = this._columnDefinitions || this.options.columnDefinitions;
            columnDefinitions = columnDefinitions.filter(function (column) { return !column.excludeFromQuery; });
            var queryQb = new GraphqlQueryBuilder('query');
            var datasetQb = new GraphqlQueryBuilder(this.options.datasetName);
            var dataQb = (this.options.isWithCursor) ? new GraphqlQueryBuilder('edges') : new GraphqlQueryBuilder('nodes');
            // get all the columnds Ids for the filters to work
            var columnIds = [];
            if (columnDefinitions && Array.isArray(columnDefinitions)) {
                try {
                    for (var columnDefinitions_1 = __values(columnDefinitions), columnDefinitions_1_1 = columnDefinitions_1.next(); !columnDefinitions_1_1.done; columnDefinitions_1_1 = columnDefinitions_1.next()) {
                        var column = columnDefinitions_1_1.value;
                        columnIds.push(column.field);
                        // if extra "fields" are passed, also push them to columnIds
                        if (column.fields) {
                            columnIds.push.apply(columnIds, __spread(column.fields));
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (columnDefinitions_1_1 && !columnDefinitions_1_1.done && (_a = columnDefinitions_1.return)) _a.call(columnDefinitions_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                // columnIds = columnDefinitions.map((column) => column.field);
            }
            else {
                columnIds = this.options.columnIds || [];
            }
            // Slickgrid also requires the "id" field to be part of DataView
            // add it to the GraphQL query if it wasn't already part of the list
            if (columnIds.indexOf('id') === -1) {
                columnIds.unshift('id');
            }
            var filters = this.buildFilterQuery(columnIds);
            if (this.options.isWithCursor) {
                // ...pageInfo { hasNextPage, endCursor }, edges { cursor, node { _filters_ } }
                var pageInfoQb = new GraphqlQueryBuilder('pageInfo');
                pageInfoQb.find('hasNextPage', 'endCursor');
                dataQb.find(['cursor', { node: filters }]);
                datasetQb.find(['totalCount', pageInfoQb, dataQb]);
            }
            else {
                // ...nodes { _filters_ }
                dataQb.find(filters);
                datasetQb.find(['totalCount', dataQb]);
            }
            // add dataset filters, could be Pagination and SortingFilters and/or FieldFilters
            var datasetFilters = {};
            // only add pagination if it's enabled in the grid options
            if (this._gridOptions.enablePagination !== false) {
                datasetFilters = __assign({}, this.options.paginationOptions, { first: ((this.options.paginationOptions && this.options.paginationOptions.first) ? this.options.paginationOptions.first : ((this.pagination && this.pagination.pageSize) ? this.pagination.pageSize : null)) || this.defaultPaginationOptions.first });
                if (!this.options.isWithCursor) {
                    datasetFilters.offset = ((this.options.paginationOptions && this.options.paginationOptions.hasOwnProperty('offset')) ? +this.options.paginationOptions['offset'] : 0);
                }
            }
            if (this.options.sortingOptions && Array.isArray(this.options.sortingOptions) && this.options.sortingOptions.length > 0) {
                // orderBy: [{ field:x, direction: 'ASC' }]
                datasetFilters.orderBy = this.options.sortingOptions;
            }
            if (this.options.filteringOptions && Array.isArray(this.options.filteringOptions) && this.options.filteringOptions.length > 0) {
                // filterBy: [{ field: date, operator: '>', value: '2000-10-10' }]
                datasetFilters.filterBy = this.options.filteringOptions;
            }
            if (this.options.addLocaleIntoQuery) {
                // first: 20, ... locale: "en-CA"
                datasetFilters.locale = this._gridOptions && this._gridOptions.i18n && this._gridOptions.i18n.currentLang || 'en';
            }
            if (this.options.extraQueryArguments) {
                try {
                    // first: 20, ... userId: 123
                    for (var _c = __values(this.options.extraQueryArguments), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var queryArgument = _d.value;
                        datasetFilters[queryArgument.field] = queryArgument.value;
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
            // query { users(first: 20, orderBy: [], filterBy: [])}
            datasetQb.filter(datasetFilters);
            queryQb.find(datasetQb);
            var enumSearchProperties = ['direction:', 'field:', 'operator:'];
            return this.trimDoubleQuotesOnEnumField(queryQb.toString(), enumSearchProperties, this.options.keepArgumentFieldDoubleQuotes || false);
        };
        /**
         * From an input array of strings, we want to build a GraphQL query string.
         * The process has to take the dot notation and parse it into a valid GraphQL query
         * Following this SO answer https://stackoverflow.com/a/47705476/1212166
         *
         * INPUT
         *  ['firstName', 'lastName', 'billing.address.street', 'billing.address.zip']
         * OUTPUT
         * firstName, lastName, billing{address{street, zip}}
         * @param inputArray
         */
        GraphqlService.prototype.buildFilterQuery = function (inputArray) {
            var set = function (o, a) {
                if (o === void 0) { o = {}; }
                var k = a.shift();
                o[k] = a.length ? set(o[k], a) : null;
                return o;
            };
            var output = inputArray.reduce(function (o, a) { return set(o, a.split('.')); }, {});
            return JSON.stringify(output)
                .replace(/\"|\:|null/g, '')
                .replace(/^\{/, '')
                .replace(/\}$/, '');
        };
        GraphqlService.prototype.clearFilters = function () {
            this._currentFilters = [];
            this.updateOptions({ filteringOptions: [] });
        };
        GraphqlService.prototype.clearSorters = function () {
            this._currentSorters = [];
            this.updateOptions({ sortingOptions: [] });
        };
        GraphqlService.prototype.init = function (serviceOptions, pagination, grid) {
            this._grid = grid;
            this.options = serviceOptions || {};
            this.pagination = pagination;
            if (grid && grid.getColumns) {
                this._columnDefinitions = serviceOptions.columnDefinitions || grid.getColumns();
            }
        };
        /**
         * Get an initialization of Pagination options
         * @return Pagination Options
         */
        GraphqlService.prototype.getInitPaginationOptions = function () {
            return (this.options.isWithCursor) ? { first: (this.pagination ? this.pagination.pageSize : DEFAULT_ITEMS_PER_PAGE) } : { first: (this.pagination ? this.pagination.pageSize : DEFAULT_ITEMS_PER_PAGE), offset: 0 };
        };
        /** Get the GraphQL dataset name */
        GraphqlService.prototype.getDatasetName = function () {
            return this.options.datasetName || '';
        };
        /** Get the Filters that are currently used by the grid */
        GraphqlService.prototype.getCurrentFilters = function () {
            return this._currentFilters;
        };
        /** Get the Pagination that is currently used by the grid */
        GraphqlService.prototype.getCurrentPagination = function () {
            return this._currentPagination;
        };
        /** Get the Sorters that are currently used by the grid */
        GraphqlService.prototype.getCurrentSorters = function () {
            return this._currentSorters;
        };
        /*
         * Reset the pagination options
         */
        GraphqlService.prototype.resetPaginationOptions = function () {
            var paginationOptions;
            if (this.options.isWithCursor) {
                // first, last, after, before
                paginationOptions = {
                    after: '',
                    before: undefined,
                    last: undefined
                };
            }
            else {
                // first, last, offset
                paginationOptions = (this.options.paginationOptions || this.getInitPaginationOptions());
                paginationOptions.offset = 0;
            }
            // save current pagination as Page 1 and page size as "first" set size
            this._currentPagination = {
                pageNumber: 1,
                pageSize: paginationOptions.first
            };
            this.updateOptions({ paginationOptions: paginationOptions });
        };
        GraphqlService.prototype.updateOptions = function (serviceOptions) {
            this.options = __assign({}, this.options, serviceOptions);
        };
        /*
         * FILTERING
         */
        GraphqlService.prototype.processOnFilterChanged = function (event, args) {
            var _this = this;
            var gridOptions = this._gridOptions || args.grid.getOptions();
            var backendApi = gridOptions.backendServiceApi;
            if (backendApi === undefined) {
                throw new Error('Something went wrong in the GraphqlService, "backendServiceApi" is not initialized');
            }
            // keep current filters & always save it as an array (columnFilters can be an object when it is dealt by SlickGrid Filter)
            this._currentFilters = this.castFilterToColumnFilter(args.columnFilters);
            var promise = new Promise(function (resolve, reject) {
                if (!args || !args.grid) {
                    throw new Error('Something went wrong when trying create the GraphQL Backend Service, it seems that "args" is not populated correctly');
                }
                // loop through all columns to inspect filters & set the query
                _this.updateFilters(args.columnFilters, false);
                _this.resetPaginationOptions();
                resolve(_this.buildQuery());
            });
            return promise;
        };
        /*
         * PAGINATION
         * With cursor, the query can have 4 arguments (first, after, last, before), for example:
         *   users (first:20, after:"YXJyYXljb25uZWN0aW9uOjM=") {
         *     totalCount
         *     pageInfo {
         *       hasNextPage
         *       endCursor
         *     }
         *     edges {
         *       cursor
         *       node {
         *         name
         *         gender
         *       }
         *     }
         *   }
         * Without cursor, the query can have 3 arguments (first, last, offset), for example:
         *   users (first:20, offset: 10) {
         *     totalCount
         *     nodes {
         *       name
         *       gender
         *     }
         *   }
         */
        GraphqlService.prototype.processOnPaginationChanged = function (event, args) {
            var pageSize = +(args.pageSize || ((this.pagination) ? this.pagination.pageSize : DEFAULT_PAGE_SIZE));
            this.updatePagination(args.newPage, pageSize);
            // build the GraphQL query which we will use in the WebAPI callback
            return this.buildQuery();
        };
        /*
         * SORTING
         * we will use sorting as per a Facebook suggestion on a Github issue (with some small changes)
         * https://github.com/graphql/graphql-relay-js/issues/20#issuecomment-220494222
         */
        GraphqlService.prototype.processOnSortChanged = function (event, args) {
            var sortColumns = (args.multiColumnSort) ? args.sortCols : new Array({ sortCol: args.sortCol, sortAsc: args.sortAsc });
            // loop through all columns to inspect sorters & set the query
            this.updateSorters(sortColumns);
            // build the GraphQL query which we will use in the WebAPI callback
            return this.buildQuery();
        };
        /**
         * loop through all columns to inspect filters & update backend service filteringOptions
         * @param columnFilters
         */
        GraphqlService.prototype.updateFilters = function (columnFilters, isUpdatedByPreset) {
            var searchByArray = [];
            var searchValue;
            // on filter preset load, we need to keep current filters
            if (isUpdatedByPreset) {
                this._currentFilters = this.castFilterToColumnFilter(columnFilters);
            }
            var _loop_1 = function (columnId) {
                if (columnFilters.hasOwnProperty(columnId)) {
                    var columnFilter_1 = columnFilters[columnId];
                    // if user defined some "presets", then we need to find the filters from the column definitions instead
                    var columnDef = void 0;
                    if (isUpdatedByPreset && Array.isArray(this_1._columnDefinitions)) {
                        columnDef = this_1._columnDefinitions.find(function (column) { return column.id === columnFilter_1.columnId; });
                    }
                    else {
                        columnDef = columnFilter_1.columnDef;
                    }
                    if (!columnDef) {
                        throw new Error('[Backend Service API]: Something went wrong in trying to get the column definition of the specified filter (or preset filters). Did you make a typo on the filter columnId?');
                    }
                    var fieldName = columnDef.queryField || columnDef.queryFieldFilter || columnDef.field || columnDef.name || '';
                    var searchTerms = (columnFilter_1 ? columnFilter_1.searchTerms : null) || [];
                    var fieldSearchValue = (Array.isArray(searchTerms) && searchTerms.length === 1) ? searchTerms[0] : '';
                    if (typeof fieldSearchValue === 'undefined') {
                        fieldSearchValue = '';
                    }
                    if (typeof fieldSearchValue !== 'string' && !searchTerms) {
                        throw new Error("GraphQL filter searchTerm property must be provided as type \"string\", if you use filter with options then make sure your IDs are also string. For example: filter: {model: Filters.select, collection: [{ id: \"0\", value: \"0\" }, { id: \"1\", value: \"1\" }]");
                    }
                    fieldSearchValue = '' + fieldSearchValue; // make sure it's a string
                    var matches = fieldSearchValue.match(/^([<>!=\*]{0,2})(.*[^<>!=\*])([\*]?)$/); // group 1: Operator, 2: searchValue, 3: last char is '*' (meaning starts with, ex.: abc*)
                    var operator = columnFilter_1.operator || ((matches) ? matches[1] : '');
                    searchValue = (!!matches) ? matches[2] : '';
                    var lastValueChar = (!!matches) ? matches[3] : (operator === '*z' ? '*' : '');
                    // no need to query if search value is empty
                    if (fieldName && searchValue === '' && searchTerms.length === 0) {
                        return "continue";
                    }
                    // when having more than 1 search term (we need to create a CSV string for GraphQL "IN" or "NOT IN" filter search)
                    if (searchTerms && searchTerms.length > 1) {
                        searchValue = searchTerms.join(',');
                    }
                    else if (typeof searchValue === 'string') {
                        // escaping the search value
                        searchValue = searchValue.replace("'", "''"); // escape single quotes by doubling them
                        if (operator === '*' || operator === 'a*' || operator === '*z' || lastValueChar === '*') {
                            operator = (operator === '*' || operator === '*z') ? 'endsWith' : 'startsWith';
                        }
                    }
                    // if we didn't find an Operator but we have a Filter Type, we should use default Operator
                    // multipleSelect is "IN", while singleSelect is "EQ", else don't map any operator
                    if (!operator && columnDef.filter) {
                        operator = columnDef.filter.operator;
                    }
                    // if we still don't have an operator find the proper Operator to use by it's field type
                    if (!operator) {
                        operator = mapOperatorByFieldType(columnDef.type || exports.FieldType.string);
                    }
                    searchByArray.push({
                        field: fieldName,
                        operator: mapOperatorType(operator),
                        value: searchValue
                    });
                }
            };
            var this_1 = this;
            for (var columnId in columnFilters) {
                _loop_1(columnId);
            }
            // update the service options with filters for the buildQuery() to work later
            this.updateOptions({ filteringOptions: searchByArray });
        };
        /**
         * Update the pagination component with it's new page number and size
         * @param newPage
         * @param pageSize
         */
        GraphqlService.prototype.updatePagination = function (newPage, pageSize) {
            this._currentPagination = {
                pageNumber: newPage,
                pageSize: pageSize
            };
            var paginationOptions;
            if (this.options.isWithCursor) {
                paginationOptions = {
                    first: pageSize
                };
            }
            else {
                paginationOptions = {
                    first: pageSize,
                    offset: (newPage - 1) * pageSize
                };
            }
            this.updateOptions({ paginationOptions: paginationOptions });
        };
        /**
         * loop through all columns to inspect sorters & update backend service sortingOptions
         * @param columnFilters
         */
        GraphqlService.prototype.updateSorters = function (sortColumns, presetSorters) {
            var _this = this;
            var e_3, _a;
            var currentSorters = [];
            var graphqlSorters = [];
            if (!sortColumns && presetSorters) {
                // make the presets the current sorters, also make sure that all direction are in uppercase for GraphQL
                currentSorters = presetSorters;
                currentSorters.forEach(function (sorter) { return sorter.direction = sorter.direction.toUpperCase(); });
                // display the correct sorting icons on the UI, for that it requires (columnId, sortAsc) properties
                var tmpSorterArray = currentSorters.map(function (sorter) {
                    var columnDef = _this._columnDefinitions.find(function (column) { return column.id === sorter.columnId; });
                    graphqlSorters.push({
                        field: columnDef ? ((columnDef.queryField || columnDef.queryFieldSorter || columnDef.field || columnDef.id) + '') : (sorter.columnId + ''),
                        direction: sorter.direction
                    });
                    // return only the column(s) found in the Column Definitions ELSE null
                    if (columnDef) {
                        return {
                            columnId: sorter.columnId,
                            sortAsc: sorter.direction.toUpperCase() === exports.SortDirection.ASC
                        };
                    }
                    return null;
                });
                // set the sort icons, but also make sure to filter out null values (happens when no columnDef found)
                if (Array.isArray(tmpSorterArray)) {
                    this._grid.setSortColumns(tmpSorterArray.filter(function (sorter) { return sorter; }));
                }
            }
            else if (sortColumns && !presetSorters) {
                // build the orderBy array, it could be multisort, example
                // orderBy:[{field: lastName, direction: ASC}, {field: firstName, direction: DESC}]
                if (Array.isArray(sortColumns) && sortColumns.length > 0) {
                    try {
                        for (var sortColumns_1 = __values(sortColumns), sortColumns_1_1 = sortColumns_1.next(); !sortColumns_1_1.done; sortColumns_1_1 = sortColumns_1.next()) {
                            var column = sortColumns_1_1.value;
                            if (column && column.sortCol) {
                                currentSorters.push({
                                    columnId: column.sortCol.id + '',
                                    direction: column.sortAsc ? exports.SortDirection.ASC : exports.SortDirection.DESC
                                });
                                graphqlSorters.push({
                                    field: (column.sortCol.queryField || column.sortCol.queryFieldSorter || column.sortCol.field || column.sortCol.id) + '',
                                    direction: column.sortAsc ? exports.SortDirection.ASC : exports.SortDirection.DESC
                                });
                            }
                        }
                    }
                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                    finally {
                        try {
                            if (sortColumns_1_1 && !sortColumns_1_1.done && (_a = sortColumns_1.return)) _a.call(sortColumns_1);
                        }
                        finally { if (e_3) throw e_3.error; }
                    }
                }
            }
            // keep current Sorters and update the service options with the new sorting
            this._currentSorters = currentSorters;
            this.updateOptions({ sortingOptions: graphqlSorters });
        };
        /**
         * A function which takes an input string and removes double quotes only
         * on certain fields are identified as GraphQL enums (except fields with dot notation)
         * For example let say we identified ("direction:", "sort") as word which are GraphQL enum fields
         * then the result will be:
         * FROM
         * query { users (orderBy:[{field:"firstName", direction:"ASC"} }]) }
         * TO
         * query { users (orderBy:[{field: firstName, direction: ASC}})}
         *
         * EXCEPTIONS (fields with dot notation "." which are inside a "field:")
         * these fields will keep double quotes while everything else will be stripped of double quotes
         * query { users (orderBy:[{field:"billing.street.name", direction: "ASC"} }
         * TO
         * query { users (orderBy:[{field:"billing.street.name", direction: ASC}}
         * @param inputStr input string
         * @param enumSearchWords array of enum words to filter
         * @returns outputStr output string
         */
        GraphqlService.prototype.trimDoubleQuotesOnEnumField = function (inputStr, enumSearchWords, keepArgumentFieldDoubleQuotes) {
            var patternWordInQuotes = "s?((field:s*)?\".*?\")";
            var patternRegex = enumSearchWords.join(patternWordInQuotes + '|');
            patternRegex += patternWordInQuotes; // the last one should also have the pattern but without the pipe "|"
            // example with (field: & direction:):  /field:s?(".*?")|direction:s?(".*?")/
            var reg = new RegExp(patternRegex, 'g');
            return inputStr.replace(reg, function (group1, group2, group3) {
                // remove double quotes except when the string starts with a "field:"
                var removeDoubleQuotes = true;
                if (group1.startsWith('field:') && keepArgumentFieldDoubleQuotes) {
                    removeDoubleQuotes = false;
                }
                var rep = removeDoubleQuotes ? group1.replace(/"/g, '') : group1;
                return rep;
            });
        };
        //
        // private functions
        // -------------------
        /**
         * Cast provided filters (could be in multiple format) into an array of ColumnFilter
         * @param columnFilters
         */
        GraphqlService.prototype.castFilterToColumnFilter = function (columnFilters) {
            // keep current filters & always save it as an array (columnFilters can be an object when it is dealt by SlickGrid Filter)
            var filtersArray = (typeof columnFilters === 'object') ? Object.keys(columnFilters).map(function (key) { return columnFilters[key]; }) : columnFilters;
            return filtersArray.map(function (filter) {
                var tmpFilter = { columnId: filter.columnId || '' };
                if (filter.operator) {
                    tmpFilter.operator = filter.operator;
                }
                if (Array.isArray(filter.searchTerms)) {
                    tmpFilter.searchTerms = filter.searchTerms;
                }
                return tmpFilter;
            });
        };
        return GraphqlService;
    }());

    String.format = function (format, args) {
        // const args = (Array.isArray(arguments[1])) ? arguments[1] : Array.prototype.slice.call(arguments, 1);
        return format.replace(/{(\d+)}/g, function (match, number) {
            return (typeof args[number] !== 'undefined') ? args[number] : match;
        });
    };
    String.padZero = function (length) {
        var s = this;
        while (s.length < length) {
            s = '0' + s;
        }
        return s;
    };
    /**
     * Trim any extra white space from the string
     * @param string inputStr
     * @returns string outputStr
     */
    String.trim = function (inputStr) {
        return inputStr ? inputStr.replace(/\s+/g, ' ') : inputStr;
    };
    /**
     * Title case the complete sentence (upper case first char of each word while changing everything else to lower case)
     * @param string inputStr
     * @returns string outputStr
     */
    String.allTitleCase = function (inputStr) {
        return inputStr.replace(/\w\S*/g, function (outputStr) {
            return outputStr.charAt(0).toUpperCase() + outputStr.substr(1).toLowerCase();
        });
    };
    /**
     * Title case the complete sentence (upper case first char of each word while changing everything else to lower case)
     * @param string inputStr
     * @returns string outputStr
    */
    String.titleCase = function (inputStr) {
        return inputStr.charAt(0).toUpperCase() + inputStr.slice(1);
    };

    var OdataService = /** @class */ (function () {
        function OdataService() {
            this._odataOptions = {
                filterQueue: [],
                orderBy: ''
            };
            this._defaultSortBy = '';
            this._columnFilters = {};
        }
        /*
          * Build the OData query string from all the options provided
          * @return string OData query
          */
        OdataService.prototype.buildQuery = function () {
            this._odataOptions.filterQueue = [];
            var queryTmpArray = [];
            if (this._odataOptions.top) {
                queryTmpArray.push("$top=" + this._odataOptions.top);
            }
            if (this._odataOptions.skip) {
                queryTmpArray.push("$skip=" + this._odataOptions.skip);
            }
            if (this._odataOptions.orderBy) {
                var argument = '';
                if (Array.isArray(this._odataOptions.orderBy)) {
                    argument = this._odataOptions.orderBy.join(','); // csv, that will form a query example like: $orderby=RoleName asc, Id desc
                }
                else {
                    argument = this._odataOptions.orderBy;
                }
                queryTmpArray.push("$orderby=" + argument);
            }
            if (this._odataOptions.filterBy || this._odataOptions.filter) {
                if (this._odataOptions.filter) {
                    this._odataOptions.filterQueue = [];
                    var filterStr = this._odataOptions.filter;
                    if (Array.isArray(this._odataOptions.filter)) {
                        filterStr = this._odataOptions.filter.join(" " + (this._odataOptions.filterBySeparator || 'and') + " ");
                    }
                    this._odataOptions.filterQueue.push("(" + filterStr + ")");
                }
                // filterBy are passed manually by the user, however we will only add it if the column wasn't yet filtered
                if (!!this._odataOptions.filterBy && !!this._odataOptions.filterBy.fieldName && !this._columnFilters[this._odataOptions.filterBy.fieldName.toLowerCase()]) {
                    if (this._odataOptions.filterBy.searchTerm !== '') {
                        this.saveColumnFilter(this._odataOptions.filterBy.fieldName.toLowerCase(), this._odataOptions.filterBy.searchTerm, this._odataOptions.filterBy.searchTerms);
                        this.updateFilterFromListTerms(this._odataOptions.filterBy);
                    }
                }
            }
            if (this._odataOptions.filterQueue.length > 0) {
                var query = this._odataOptions.filterQueue.join(" " + (this._odataOptions.filterBySeparator || 'and') + " ");
                this._odataOptions.filter = query; // overwrite with
                queryTmpArray.push("$filter=" + query);
            }
            // join all the odata functions by a '&'
            return queryTmpArray.join('&');
        };
        OdataService.prototype.getFilterByColumn = function (columnName) {
            return (!!this._columnFilters[columnName]) ? this._columnFilters[columnName] : null;
        };
        OdataService.prototype.getFilterCount = function () {
            return (this._odataOptions.filterQueue) ? this._odataOptions.filterQueue.length : 0;
        };
        Object.defineProperty(OdataService.prototype, "columnFilters", {
            get: function () {
                return this._columnFilters;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OdataService.prototype, "options", {
            get: function () {
                return this._odataOptions;
            },
            set: function (options) {
                this._odataOptions = options;
            },
            enumerable: true,
            configurable: true
        });
        OdataService.prototype.removeColumnFilter = function (fieldName) {
            delete this._columnFilters[fieldName];
        };
        OdataService.prototype.saveColumnFilter = function (fieldName, value, searchTerms) {
            this._columnFilters[fieldName] = {
                search: searchTerms,
                value: value
            };
        };
        /**
         * Update the filter by a list of terms usually passed manually by the user as default filters
         * @param filterOptions
         * @returns
         */
        OdataService.prototype.updateFilterFromListTerms = function (filterOptions) {
            var _this = this;
            // build the filter query
            if (Array.isArray(filterOptions)) {
                filterOptions.forEach(function (filterOptionObject) {
                    _this.updateFilterFromTerm(filterOptionObject);
                });
            }
            else {
                this.updateFilterFromTerm(filterOptions);
            }
        };
        OdataService.prototype.updateFilterFromTerm = function (filterOptions) {
            var searchBy = '';
            var tmpSearchByArray = [];
            var fieldName = filterOptions.fieldName;
            var fieldSearchTerms = filterOptions.searchTerms;
            var operator = filterOptions.operator;
            // when having more than 1 search term (then check if we have a "IN" or "NOT IN" filter search)
            if (!!fieldSearchTerms && fieldSearchTerms.length > 0) {
                var tmpSearchTerms = [];
                if (operator === 'IN') {
                    // example:: (Stage eq "Expired" or Stage eq "Renewal")
                    for (var j = 0, lnj = fieldSearchTerms.length; j < lnj; j++) {
                        tmpSearchTerms.push(fieldName + " eq '" + fieldSearchTerms[j] + "'");
                    }
                    searchBy = tmpSearchTerms.join(' or ');
                    searchBy = "$(" + searchBy + ")";
                }
                else if (operator === 'NIN' || operator === 'NOTIN' || operator === 'NOT IN') {
                    // example:: (Stage ne "Expired" and Stage ne "Renewal")
                    for (var k = 0, lnk = fieldSearchTerms.length; k < lnk; k++) {
                        tmpSearchTerms.push(fieldName + " ne '" + fieldSearchTerms[k] + "'");
                    }
                    searchBy = tmpSearchTerms.join(' and ');
                    searchBy = "$(" + searchBy + ")";
                }
            }
            // push to our temp array and also trim white spaces
            tmpSearchByArray.push(String.trim(searchBy));
            // add to the filter queue only if it doesn't exist in the queue
            var filter = (tmpSearchByArray.length > 0) ? tmpSearchByArray.join(' and ') : '';
            if (this._odataOptions.filterQueue && this._odataOptions.filterQueue.indexOf(filter) === -1) {
                this._odataOptions.filterQueue.push(filter);
            }
        };
        /**
         * Change any OData options that will be used to build the query
         * @param object options
         */
        OdataService.prototype.updateOptions = function (options) {
            var e_1, _a;
            try {
                for (var _b = __values(Object.keys(options)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var property = _c.value;
                    if (options.hasOwnProperty(property)) {
                        this._odataOptions[property] = options[property]; // replace of the property
                    }
                    // we need to keep the defaultSortBy for references whenever the user removes his Sorting
                    // then we would revert to the defaultSortBy and the only way is to keep a hard copy here
                    if (property === 'orderBy' || property === 'sortBy') {
                        var sortBy = options[property];
                        // make sure first char of each orderBy field is capitalize
                        if (this._odataOptions.caseType === exports.CaseType.pascalCase) {
                            if (Array.isArray(sortBy)) {
                                sortBy.forEach(function (field, index, inputArray) {
                                    inputArray[index] = String.titleCase(field);
                                });
                            }
                            else {
                                sortBy = String.titleCase(options[property]);
                            }
                        }
                        this._odataOptions.orderBy = sortBy;
                        this._defaultSortBy = sortBy;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        };
        return OdataService;
    }());

    var DEFAULT_ITEMS_PER_PAGE$1 = 25;
    var DEFAULT_PAGE_SIZE$1 = 20;
    var GridOdataService = /** @class */ (function () {
        function GridOdataService() {
            this._currentFilters = [];
            this._currentSorters = [];
            this.defaultOptions = {
                top: DEFAULT_ITEMS_PER_PAGE$1,
                orderBy: '',
                caseType: exports.CaseType.pascalCase
            };
            this.odataService = new OdataService();
        }
        Object.defineProperty(GridOdataService.prototype, "_gridOptions", {
            /** Getter for the Grid Options pulled through the Grid Object */
            get: function () {
                return (this._grid && this._grid.getOptions) ? this._grid.getOptions() : {};
            },
            enumerable: true,
            configurable: true
        });
        GridOdataService.prototype.buildQuery = function () {
            return this.odataService.buildQuery();
        };
        GridOdataService.prototype.clearFilters = function () {
            this._currentFilters = [];
            this.updateOptions({ filteringOptions: [] });
        };
        GridOdataService.prototype.clearSorters = function () {
            this._currentSorters = [];
            this.updateOptions({ sortingOptions: [] });
        };
        GridOdataService.prototype.init = function (options, pagination, grid) {
            this._grid = grid;
            var mergedOptions = __assign({}, this.defaultOptions, options);
            if (pagination && pagination.pageSize) {
                mergedOptions.top = pagination.pageSize;
            }
            this.odataService.options = __assign({}, mergedOptions, { top: mergedOptions.top || this.defaultOptions.top });
            this.options = this.odataService.options;
            this.pagination = pagination;
            // save current pagination as Page 1 and page size as "top"
            this._currentPagination = {
                pageNumber: 1,
                pageSize: this.odataService.options.top || this.defaultOptions.top
            };
            if (grid && grid.getColumns) {
                this._columnDefinitions = (options && options.columnDefinitions) || grid.getColumns();
                this._columnDefinitions = this._columnDefinitions.filter(function (column) { return !column.excludeFromQuery; });
            }
        };
        GridOdataService.prototype.updateOptions = function (serviceOptions) {
            this.options = __assign({}, this.options, serviceOptions);
        };
        GridOdataService.prototype.removeColumnFilter = function (fieldName) {
            this.odataService.removeColumnFilter(fieldName);
        };
        /** Get the Filters that are currently used by the grid */
        GridOdataService.prototype.getCurrentFilters = function () {
            return this._currentFilters;
        };
        /** Get the Pagination that is currently used by the grid */
        GridOdataService.prototype.getCurrentPagination = function () {
            return this._currentPagination;
        };
        /** Get the Sorters that are currently used by the grid */
        GridOdataService.prototype.getCurrentSorters = function () {
            return this._currentSorters;
        };
        /*
         * Reset the pagination options
         */
        GridOdataService.prototype.resetPaginationOptions = function () {
            this.odataService.updateOptions({
                skip: 0
            });
        };
        GridOdataService.prototype.saveColumnFilter = function (fieldName, value, terms) {
            this.odataService.saveColumnFilter(fieldName, value, terms);
        };
        /*
         * FILTERING
         */
        GridOdataService.prototype.processOnFilterChanged = function (event, args) {
            var _this = this;
            var serviceOptions = args.grid.getOptions();
            var backendApi = serviceOptions.backendServiceApi;
            if (backendApi === undefined) {
                throw new Error('Something went wrong in the GridOdataService, "backendServiceApi" is not initialized');
            }
            // keep current filters & always save it as an array (columnFilters can be an object when it is dealt by SlickGrid Filter)
            this._currentFilters = this.castFilterToColumnFilter(args.columnFilters);
            var promise = new Promise(function (resolve, reject) {
                // loop through all columns to inspect filters & set the query
                _this.updateFilters(args.columnFilters);
                _this.resetPaginationOptions();
                resolve(_this.odataService.buildQuery());
            });
            return promise;
        };
        /*
         * PAGINATION
         */
        GridOdataService.prototype.processOnPaginationChanged = function (event, args) {
            var pageSize = +(args.pageSize || DEFAULT_PAGE_SIZE$1);
            this.updatePagination(args.newPage, pageSize);
            // build the OData query which we will use in the WebAPI callback
            return this.odataService.buildQuery();
        };
        /*
         * SORTING
         */
        GridOdataService.prototype.processOnSortChanged = function (event, args) {
            var sortColumns = (args.multiColumnSort) ? args.sortCols : new Array({ sortCol: args.sortCol, sortAsc: args.sortAsc });
            // loop through all columns to inspect sorters & set the query
            this.updateSorters(sortColumns);
            // build the OData query which we will use in the WebAPI callback
            return this.odataService.buildQuery();
        };
        /**
         * loop through all columns to inspect filters & update backend service filteringOptions
         * @param columnFilters
         */
        GridOdataService.prototype.updateFilters = function (columnFilters, isUpdatedByPreset) {
            var searchBy = '';
            var searchByArray = [];
            // on filter preset load, we need to keep current filters
            if (isUpdatedByPreset) {
                this._currentFilters = this.castFilterToColumnFilter(columnFilters);
            }
            var _loop_1 = function (columnId) {
                if (columnFilters.hasOwnProperty(columnId)) {
                    var columnFilter_1 = columnFilters[columnId];
                    // if user defined some "presets", then we need to find the filters from the column definitions instead
                    var columnDef = void 0;
                    if (isUpdatedByPreset && Array.isArray(this_1._columnDefinitions)) {
                        columnDef = this_1._columnDefinitions.find(function (column) {
                            return column.id === columnFilter_1.columnId;
                        });
                    }
                    else {
                        columnDef = columnFilter_1.columnDef;
                    }
                    if (!columnDef) {
                        throw new Error('[Backend Service API]: Something went wrong in trying to get the column definition of the specified filter (or preset filters). Did you make a typo on the filter columnId?');
                    }
                    var fieldName = columnDef.queryField || columnDef.queryFieldFilter || columnDef.field || columnDef.name || '';
                    var fieldType = columnDef.type || 'string';
                    var searchTerms = (columnFilter_1 ? columnFilter_1.searchTerms : null) || [];
                    var fieldSearchValue = (Array.isArray(searchTerms) && searchTerms.length === 1) ? searchTerms[0] : '';
                    if (typeof fieldSearchValue === 'undefined') {
                        fieldSearchValue = '';
                    }
                    if (typeof fieldSearchValue !== 'string' && !searchTerms) {
                        throw new Error("ODdata filter searchTerm property must be provided as type \"string\", if you use filter with options then make sure your IDs are also string. For example: filter: {model: Filters.select, collection: [{ id: \"0\", value: \"0\" }, { id: \"1\", value: \"1\" }]");
                    }
                    fieldSearchValue = '' + fieldSearchValue; // make sure it's a string
                    var matches = fieldSearchValue.match(/^([<>!=\*]{0,2})(.*[^<>!=\*])([\*]?)$/); // group 1: Operator, 2: searchValue, 3: last char is '*' (meaning starts with, ex.: abc*)
                    var operator = columnFilter_1.operator || ((matches) ? matches[1] : '');
                    var searchValue = (!!matches) ? matches[2] : '';
                    var lastValueChar = (!!matches) ? matches[3] : (operator === '*z' ? '*' : '');
                    var bypassOdataQuery = columnFilter_1.bypassBackendQuery || false;
                    // no need to query if search value is empty
                    if (fieldName && searchValue === '' && searchTerms.length === 0) {
                        this_1.removeColumnFilter(fieldName);
                        return "continue";
                    }
                    // escaping the search value
                    searchValue = searchValue.replace("'", "''"); // escape single quotes by doubling them
                    searchValue = encodeURIComponent(searchValue); // encode URI of the final search value
                    // extra query arguments
                    if (bypassOdataQuery) {
                        // push to our temp array and also trim white spaces
                        if (fieldName) {
                            this_1.saveColumnFilter(fieldName, fieldSearchValue, searchTerms);
                        }
                    }
                    else {
                        searchBy = '';
                        // titleCase the fieldName so that it matches the WebApi names
                        if (this_1.odataService.options.caseType === exports.CaseType.pascalCase) {
                            fieldName = String.titleCase(fieldName || '');
                        }
                        // when having more than 1 search term (then check if we have a "IN" or "NOT IN" filter search)
                        if (searchTerms && searchTerms.length > 1) {
                            var tmpSearchTerms = [];
                            if (operator === 'IN') {
                                // example:: (Stage eq "Expired" or Stage eq "Renewal")
                                for (var j = 0, lnj = searchTerms.length; j < lnj; j++) {
                                    tmpSearchTerms.push(fieldName + " eq '" + searchTerms[j] + "'");
                                }
                                searchBy = tmpSearchTerms.join(' or ');
                                searchBy = "(" + searchBy + ")";
                            }
                            else if (operator === 'NIN' || operator === 'NOTIN' || operator === 'NOT IN') {
                                // example:: (Stage ne "Expired" and Stage ne "Renewal")
                                for (var k = 0, lnk = searchTerms.length; k < lnk; k++) {
                                    tmpSearchTerms.push(fieldName + " ne '" + searchTerms[k] + "'");
                                }
                                searchBy = tmpSearchTerms.join(' and ');
                                searchBy = "(" + searchBy + ")";
                            }
                        }
                        else if (operator === '*' || operator === 'a*' || operator === '*z' || lastValueChar !== '') {
                            // first/last character is a '*' will be a startsWith or endsWith
                            searchBy = (operator === '*' || operator === '*z')
                                ? "endswith(" + fieldName + ", '" + searchValue + "')"
                                : "startswith(" + fieldName + ", '" + searchValue + "')";
                        }
                        else if (fieldType === exports.FieldType.date) {
                            // date field needs to be UTC and within DateTime function
                            var dateFormatted = parseUtcDate(searchValue, true);
                            if (dateFormatted) {
                                searchBy = fieldName + " " + this_1.mapOdataOperator(operator) + " DateTime'" + dateFormatted + "'";
                            }
                        }
                        else if (fieldType === exports.FieldType.string) {
                            // string field needs to be in single quotes
                            if (operator === '') {
                                searchBy = "substringof('" + searchValue + "', " + fieldName + ")";
                            }
                            else {
                                // searchBy = `substringof('${searchValue}', ${fieldNameCased}) ${this.mapOdataOperator(operator)} true`;
                                searchBy = fieldName + " " + this_1.mapOdataOperator(operator) + " '" + searchValue + "'";
                            }
                        }
                        else {
                            // any other field type (or undefined type)
                            searchValue = fieldType === exports.FieldType.number ? searchValue : "'" + searchValue + "'";
                            searchBy = fieldName + " " + this_1.mapOdataOperator(operator) + " " + searchValue;
                        }
                        // push to our temp array and also trim white spaces
                        if (searchBy !== '') {
                            searchByArray.push(String.trim(searchBy));
                            this_1.saveColumnFilter(fieldName || '', fieldSearchValue, searchTerms);
                        }
                    }
                }
            };
            var this_1 = this;
            // loop through all columns to inspect filters
            for (var columnId in columnFilters) {
                _loop_1(columnId);
            }
            // update the service options with filters for the buildQuery() to work later
            this.odataService.updateOptions({
                filter: (searchByArray.length > 0) ? searchByArray.join(' and ') : '',
                skip: undefined
            });
        };
        /**
         * Update the pagination component with it's new page number and size
         * @param newPage
         * @param pageSize
         */
        GridOdataService.prototype.updatePagination = function (newPage, pageSize) {
            this._currentPagination = {
                pageNumber: newPage,
                pageSize: pageSize
            };
            this.odataService.updateOptions({
                top: pageSize,
                skip: (newPage - 1) * pageSize
            });
        };
        /**
         * loop through all columns to inspect sorters & update backend service orderBy
         * @param columnFilters
         */
        GridOdataService.prototype.updateSorters = function (sortColumns, presetSorters) {
            var _this = this;
            var e_1, _a;
            var sortByArray = [];
            var sorterArray = [];
            if (!sortColumns && presetSorters) {
                // make the presets the current sorters, also make sure that all direction are in lowercase for OData
                sortByArray = presetSorters;
                sortByArray.forEach(function (sorter) { return sorter.direction = sorter.direction.toLowerCase(); });
                // display the correct sorting icons on the UI, for that it requires (columnId, sortAsc) properties
                var tmpSorterArray = sortByArray.map(function (sorter) {
                    var columnDef = _this._columnDefinitions.find(function (column) { return column.id === sorter.columnId; });
                    sorterArray.push({
                        columnId: columnDef ? ((columnDef.queryField || columnDef.queryFieldSorter || columnDef.field || columnDef.id) + '') : (sorter.columnId + ''),
                        direction: sorter.direction
                    });
                    // return only the column(s) found in the Column Definitions ELSE null
                    if (columnDef) {
                        return {
                            columnId: sorter.columnId,
                            sortAsc: sorter.direction.toUpperCase() === exports.SortDirection.ASC
                        };
                    }
                    return null;
                });
                this._grid.setSortColumns(tmpSorterArray);
            }
            else if (sortColumns && !presetSorters) {
                // build the SortBy string, it could be multisort, example: customerNo asc, purchaserName desc
                if (sortColumns && sortColumns.length === 0) {
                    sortByArray = new Array(this.defaultOptions.orderBy); // when empty, use the default sort
                }
                else {
                    if (sortColumns) {
                        try {
                            for (var sortColumns_1 = __values(sortColumns), sortColumns_1_1 = sortColumns_1.next(); !sortColumns_1_1.done; sortColumns_1_1 = sortColumns_1.next()) {
                                var columnDef = sortColumns_1_1.value;
                                if (columnDef.sortCol) {
                                    var fieldName = (columnDef.sortCol.queryField || columnDef.sortCol.queryFieldSorter || columnDef.sortCol.field || columnDef.sortCol.id) + '';
                                    var columnFieldName = (columnDef.sortCol.field || columnDef.sortCol.id) + '';
                                    if (this.odataService.options.caseType === exports.CaseType.pascalCase) {
                                        fieldName = String.titleCase(fieldName);
                                        columnFieldName = String.titleCase(columnFieldName);
                                    }
                                    sorterArray.push({
                                        columnId: columnFieldName,
                                        direction: columnDef.sortAsc ? 'asc' : 'desc'
                                    });
                                }
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (sortColumns_1_1 && !sortColumns_1_1.done && (_a = sortColumns_1.return)) _a.call(sortColumns_1);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                        sortByArray = sorterArray;
                    }
                }
            }
            // transform the sortby array into a CSV string for OData
            sortByArray = sortByArray || [];
            var csvString = sortByArray.map(function (sorter) {
                if (sorter && sorter.columnId) {
                    return sorter.columnId + " " + (sorter && sorter.direction && sorter.direction.toLowerCase() || '');
                }
                return '';
            }).join(',');
            this.odataService.updateOptions({
                orderBy: (this.odataService.options.caseType === exports.CaseType.pascalCase) ? String.titleCase(csvString) : csvString
            });
            // keep current Sorters and update the service options with the new sorting
            this._currentSorters = sortByArray;
            // build the OData query which we will use in the WebAPI callback
            return this.odataService.buildQuery();
        };
        //
        // private functions
        // -------------------
        /**
         * Cast provided filters (could be in multiple format) into an array of ColumnFilter
         * @param columnFilters
         */
        GridOdataService.prototype.castFilterToColumnFilter = function (columnFilters) {
            // keep current filters & always save it as an array (columnFilters can be an object when it is dealt by SlickGrid Filter)
            var filtersArray = ((typeof columnFilters === 'object') ? Object.keys(columnFilters).map(function (key) { return columnFilters[key]; }) : columnFilters);
            return filtersArray.map(function (filter) {
                var columnDef = filter.columnDef;
                var tmpFilter = { columnId: filter.columnId || '' };
                if (filter.operator) {
                    tmpFilter.operator = filter.operator;
                }
                if (Array.isArray(filter.searchTerms)) {
                    tmpFilter.searchTerms = filter.searchTerms;
                }
                return tmpFilter;
            });
        };
        /**
         * Mapper for mathematical operators (ex.: <= is "le", > is "gt")
         * @param string operator
         * @returns string map
         */
        GridOdataService.prototype.mapOdataOperator = function (operator) {
            var map = '';
            switch (operator) {
                case '<':
                    map = 'lt';
                    break;
                case '<=':
                    map = 'le';
                    break;
                case '>':
                    map = 'gt';
                    break;
                case '>=':
                    map = 'ge';
                    break;
                case '<>':
                case '!=':
                    map = 'ne';
                    break;
                case '=':
                case '==':
                default:
                    map = 'eq';
                    break;
            }
            return map;
        };
        GridOdataService = __decorate([
            core.Injectable(),
            __metadata("design:paramtypes", [])
        ], GridOdataService);
        return GridOdataService;
    }());

    var GridEventService = /** @class */ (function () {
        function GridEventService() {
            this._eventHandler = new Slick.EventHandler();
        }
        /* OnCellChange Event */
        GridEventService.prototype.attachOnCellChange = function (grid, dataView) {
            // subscribe to this Slickgrid event of onCellChange
            this._eventHandler.subscribe(grid.onCellChange, function (e, args) {
                if (!e || !args || !grid || args.cell === undefined || !grid.getColumns || !grid.getDataItem) {
                    return;
                }
                var column = grid.getColumns()[args.cell];
                // if the column definition has a onCellChange property (a callback function), then run it
                if (typeof column.onCellChange === 'function') {
                    // add to the output gridOptions & dataView since we'll need them inside the AJAX column.onCellChange
                    var returnedArgs = {
                        row: args.row,
                        cell: args.cell,
                        dataView: dataView,
                        grid: grid,
                        columnDef: column,
                        dataContext: grid.getDataItem(args.row)
                    };
                    // finally call up the Slick.column.onCellChanges.... function
                    column.onCellChange(e, returnedArgs);
                }
            });
        };
        /* OnClick Event */
        GridEventService.prototype.attachOnClick = function (grid, dataView) {
            this._eventHandler.subscribe(grid.onClick, function (e, args) {
                if (!e || !args || !grid || args.cell === undefined || !grid.getColumns || !grid.getDataItem) {
                    return;
                }
                var column = grid.getColumns()[args.cell];
                var gridOptions = grid.getOptions();
                // only when using autoCommitEdit, we will make the cell active (in focus) when clicked
                // setting the cell as active as a side effect and if autoCommitEdit is set to false then the Editors won't save correctly
                if (gridOptions && gridOptions.enableCellNavigation && !gridOptions.editable || (gridOptions.editable && gridOptions.autoCommitEdit)) {
                    grid.setActiveCell(args.row, args.cell);
                }
                // if the column definition has a onCellClick property (a callback function), then run it
                if (typeof column.onCellClick === 'function') {
                    // add to the output gridOptions & dataView since we'll need them inside the AJAX column.onClick
                    var returnedArgs = {
                        row: args.row,
                        cell: args.cell,
                        dataView: dataView,
                        grid: grid,
                        columnDef: column,
                        dataContext: grid.getDataItem(args.row)
                    };
                    // finally call up the Slick.column.onCellClick.... function
                    column.onCellClick(e, returnedArgs);
                }
            });
        };
        GridEventService.prototype.dispose = function () {
            this._eventHandler.unsubscribeAll();
        };
        return GridEventService;
    }());

    var GridStateService = /** @class */ (function () {
        function GridStateService() {
            this._eventHandler = new Slick.EventHandler();
            this._columns = [];
            this._currentColumns = [];
            this.subscriptions = [];
            this.onGridStateChanged = new rxjs.Subject();
        }
        Object.defineProperty(GridStateService.prototype, "_gridOptions", {
            /** Getter for the Grid Options pulled through the Grid Object */
            get: function () {
                return (this._grid && this._grid.getOptions) ? this._grid.getOptions() : {};
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Initialize the Export Service
         * @param grid
         * @param filterService
         * @param sortService
         * @param dataView
         */
        GridStateService.prototype.init = function (grid, extensionService, filterService, sortService) {
            this._grid = grid;
            this.extensionService = extensionService;
            this.filterService = filterService;
            this.sortService = sortService;
            this.subscribeToAllGridChanges(grid);
        };
        /** Dispose of all the SlickGrid & Angular subscriptions */
        GridStateService.prototype.dispose = function () {
            // unsubscribe all SlickGrid events
            this._eventHandler.unsubscribeAll();
            // also unsubscribe all Angular Subscriptions
            this.subscriptions.forEach(function (subscription) {
                if (subscription && subscription.unsubscribe) {
                    subscription.unsubscribe();
                }
            });
            this.subscriptions = [];
            this._currentColumns = [];
            this._columns = [];
        };
        /**
         * Get the current grid state (filters/sorters/pagination)
         * @return grid state
         */
        GridStateService.prototype.getCurrentGridState = function () {
            var gridState = {
                columns: this.getCurrentColumns(),
                filters: this.getCurrentFilters(),
                sorters: this.getCurrentSorters()
            };
            var currentPagination = this.getCurrentPagination();
            if (currentPagination) {
                gridState.pagination = currentPagination;
            }
            return gridState;
        };
        /**
         * Get the Columns (and their state: visibility/position) that are currently applied in the grid
         * @return current columns
         */
        GridStateService.prototype.getColumns = function () {
            return this._columns;
        };
        /**
         * From an array of Grid Column Definitions, get the associated Current Columns
         * @param gridColumns
         */
        GridStateService.prototype.getAssociatedCurrentColumns = function (gridColumns) {
            var currentColumns = [];
            if (gridColumns && Array.isArray(gridColumns)) {
                gridColumns.forEach(function (column, index) {
                    if (column && column.id) {
                        currentColumns.push({
                            columnId: column.id,
                            cssClass: column.cssClass || '',
                            headerCssClass: column.headerCssClass || '',
                            width: column.width || 0
                        });
                    }
                });
            }
            this._currentColumns = currentColumns;
            return currentColumns;
        };
        /**
         * From an array of Current Columns, get the associated Grid Column Definitions
         * @param grid
         * @param currentColumns
         */
        GridStateService.prototype.getAssociatedGridColumns = function (grid, currentColumns) {
            var columns = [];
            var gridColumns = grid.getColumns();
            if (currentColumns && Array.isArray(currentColumns)) {
                currentColumns.forEach(function (currentColumn, index) {
                    var gridColumn = gridColumns.find(function (c) { return c.id === currentColumn.columnId; });
                    if (gridColumn && gridColumn.id) {
                        columns.push(__assign({}, gridColumn, { cssClass: currentColumn.cssClass, headerCssClass: currentColumn.headerCssClass, width: currentColumn.width }));
                    }
                });
            }
            this._columns = columns;
            return columns;
        };
        /**
         * Get the Columns (and their state: visibility/position) that are currently applied in the grid
         * @return current columns
         */
        GridStateService.prototype.getCurrentColumns = function () {
            var currentColumns = [];
            if (this._currentColumns && Array.isArray(this._currentColumns) && this._currentColumns.length > 0) {
                currentColumns = this._currentColumns;
            }
            else {
                currentColumns = this.getAssociatedCurrentColumns(this._grid.getColumns());
            }
            return currentColumns;
        };
        /**
         * Get the Filters (and their state, columnId, searchTerm(s)) that are currently applied in the grid
         * @return current filters
         */
        GridStateService.prototype.getCurrentFilters = function () {
            if (this._gridOptions && this._gridOptions.backendServiceApi) {
                var backendService = this._gridOptions.backendServiceApi.service;
                if (backendService && backendService.getCurrentFilters) {
                    return backendService.getCurrentFilters();
                }
            }
            else if (this.filterService && this.filterService.getCurrentLocalFilters) {
                return this.filterService.getCurrentLocalFilters();
            }
            return null;
        };
        /**
         * Get current Pagination (and it's state, pageNumber, pageSize) that are currently applied in the grid
         * @return current pagination state
         */
        GridStateService.prototype.getCurrentPagination = function () {
            if (this._gridOptions && this._gridOptions.backendServiceApi) {
                var backendService = this._gridOptions.backendServiceApi.service;
                if (backendService && backendService.getCurrentPagination) {
                    return backendService.getCurrentPagination();
                }
            }
            return null;
        };
        /**
         * Get the current Sorters (and their state, columnId, direction) that are currently applied in the grid
         * @return current sorters
         */
        GridStateService.prototype.getCurrentSorters = function () {
            if (this._gridOptions && this._gridOptions.backendServiceApi) {
                var backendService = this._gridOptions.backendServiceApi.service;
                if (backendService && backendService.getCurrentSorters) {
                    return backendService.getCurrentSorters();
                }
            }
            else if (this.sortService && this.sortService.getCurrentLocalSorters) {
                return this.sortService.getCurrentLocalSorters();
            }
            return null;
        };
        GridStateService.prototype.resetColumns = function (columnDefinitions) {
            var columns = columnDefinitions || this._columns;
            var currentColumns = this.getAssociatedCurrentColumns(columns);
            this.onGridStateChanged.next({ change: { newValues: currentColumns, type: exports.GridStateType.columns }, gridState: this.getCurrentGridState() });
        };
        /** if we use Row Selection or the Checkbox Selector, we need to reset any selection */
        GridStateService.prototype.resetRowSelection = function () {
            if (this._gridOptions.enableRowSelection || this._gridOptions.enableCheckboxSelector) {
                // this also requires the Row Selection Model to be registered as well
                var rowSelectionExtension = this.extensionService && this.extensionService.getExtensionByName && this.extensionService.getExtensionByName(exports.ExtensionName.rowSelection);
                if (rowSelectionExtension && rowSelectionExtension.instance) {
                    this._grid.setSelectedRows([]);
                }
            }
        };
        /**
         * Subscribe to all necessary SlickGrid or Service Events that deals with a Grid change,
         * when triggered, we will publish a Grid State Event with current Grid State
         */
        GridStateService.prototype.subscribeToAllGridChanges = function (grid) {
            var _this = this;
            // Subscribe to Event Emitter of Filter changed
            this.subscriptions.push(this.filterService.onFilterChanged.subscribe(function (currentFilters) {
                _this.resetRowSelection();
                _this.onGridStateChanged.next({ change: { newValues: currentFilters, type: exports.GridStateType.filter }, gridState: _this.getCurrentGridState() });
            }));
            // Subscribe to Event Emitter of Filter cleared
            this.subscriptions.push(this.filterService.onFilterCleared.subscribe(function () {
                _this.resetRowSelection();
                _this.onGridStateChanged.next({ change: { newValues: [], type: exports.GridStateType.filter }, gridState: _this.getCurrentGridState() });
            }));
            // Subscribe to Event Emitter of Sort changed
            this.subscriptions.push(this.sortService.onSortChanged.subscribe(function (currentSorters) {
                _this.resetRowSelection();
                _this.onGridStateChanged.next({ change: { newValues: currentSorters, type: exports.GridStateType.sorter }, gridState: _this.getCurrentGridState() });
            }));
            // Subscribe to Event Emitter of Sort cleared
            this.subscriptions.push(this.sortService.onSortCleared.subscribe(function () {
                _this.resetRowSelection();
                _this.onGridStateChanged.next({ change: { newValues: [], type: exports.GridStateType.sorter }, gridState: _this.getCurrentGridState() });
            }));
            // Subscribe to ColumnPicker and/or GridMenu for show/hide Columns visibility changes
            this.bindExtensionAddonEventToGridStateChange(exports.ExtensionName.columnPicker, 'onColumnsChanged');
            this.bindExtensionAddonEventToGridStateChange(exports.ExtensionName.gridMenu, 'onColumnsChanged');
            // subscribe to Column Resize & Reordering
            this.bindSlickGridEventToGridStateChange('onColumnsReordered', grid);
            this.bindSlickGridEventToGridStateChange('onColumnsResized', grid);
        };
        // --
        // private methods
        // ------------------
        /**
         * Bind a SlickGrid Extension Event to a Grid State change event
         * @param extension name
         * @param grid
         */
        GridStateService.prototype.bindExtensionAddonEventToGridStateChange = function (extensionName, eventName) {
            var _this = this;
            var extension = this.extensionService && this.extensionService.getExtensionByName && this.extensionService.getExtensionByName(extensionName);
            var slickEvent = extension && extension.instance && extension.instance[eventName];
            if (slickEvent && slickEvent.subscribe) {
                this._eventHandler.subscribe(slickEvent, function (e, args) {
                    var columns = args && args.columns;
                    var currentColumns = _this.getAssociatedCurrentColumns(columns);
                    _this.onGridStateChanged.next({ change: { newValues: currentColumns, type: exports.GridStateType.columns }, gridState: _this.getCurrentGridState() });
                });
            }
        };
        /**
         * Bind a Grid Event to a Grid State change event
         * @param event name
         * @param grid
         */
        GridStateService.prototype.bindSlickGridEventToGridStateChange = function (eventName, grid) {
            var _this = this;
            var slickGridEvent = grid && grid[eventName];
            if (slickGridEvent && slickGridEvent.subscribe) {
                this._eventHandler.subscribe(slickGridEvent, function (e, args) {
                    var columns = grid.getColumns();
                    var currentColumns = _this.getAssociatedCurrentColumns(columns);
                    _this.onGridStateChanged.next({ change: { newValues: currentColumns, type: exports.GridStateType.columns }, gridState: _this.getCurrentGridState() });
                });
            }
        };
        return GridStateService;
    }());

    var highlightTimerEnd;
    var GridServiceDeleteOptionDefaults = { triggerEvent: true };
    var GridServiceInsertOptionDefaults = { highlightRow: true, resortGrid: false, selectRow: false, triggerEvent: true };
    var GridServiceUpdateOptionDefaults = { highlightRow: true, selectRow: false, triggerEvent: true };
    var GridService = /** @class */ (function () {
        function GridService(extensionService, filterService, gridStateService, sortService) {
            this.extensionService = extensionService;
            this.filterService = filterService;
            this.gridStateService = gridStateService;
            this.sortService = sortService;
            this.onItemAdded = new rxjs.Subject();
            this.onItemDeleted = new rxjs.Subject();
            this.onItemUpdated = new rxjs.Subject();
            this.onItemUpserted = new rxjs.Subject();
        }
        Object.defineProperty(GridService.prototype, "_gridOptions", {
            /** Getter for the Grid Options pulled through the Grid Object */
            get: function () {
                return (this._grid && this._grid.getOptions) ? this._grid.getOptions() : {};
            },
            enumerable: true,
            configurable: true
        });
        GridService.prototype.init = function (grid, dataView) {
            this._grid = grid;
            this._dataView = dataView;
        };
        /** Clear all Filters & Sorts */
        GridService.prototype.clearAllFiltersAndSorts = function () {
            // call both clear Filters & Sort but only trigger the last one to avoid sending multiple backend queries
            if (this.sortService && this.sortService.clearSorting) {
                this.sortService.clearSorting(false); // skip event trigger on this one
            }
            if (this.filterService && this.filterService.clearFilters) {
                this.filterService.clearFilters();
            }
        };
        /**
         * From a SlickGrid Event triggered get the Column Definition and Item Data Context
         *
         * For example the SlickGrid onClick will return cell arguments when subscribing to it.
         * From these cellArgs, we want to get the Column Definition and Item Data
         * @param cell event args
         * @return object with columnDef and dataContext
         */
        GridService.prototype.getColumnFromEventArguments = function (args) {
            if (!args || !args.grid || !args.grid.getColumns || !args.grid.getDataItem) {
                throw new Error('To get the column definition and data, we need to have these arguments passed as objects (row, cell, grid)');
            }
            return {
                row: args.row,
                cell: args.cell,
                columnDef: args.grid.getColumns()[args.cell],
                dataContext: args.grid.getDataItem(args.row),
                dataView: this._dataView,
                grid: this._grid
            };
        };
        /** Get data item by it's row index number */
        GridService.prototype.getDataItemByRowNumber = function (rowNumber) {
            if (!this._grid || typeof this._grid.getDataItem !== 'function') {
                throw new Error("We could not find SlickGrid Grid object or it's \"getDataItem\" method");
            }
            return this._grid.getDataItem(rowNumber);
        };
        /** Chain the item Metadata with our implementation of Metadata at given row index */
        GridService.prototype.getItemRowMetadataToHighlight = function (previousItemMetadata) {
            var _this = this;
            return function (rowNumber) {
                var item = _this._dataView.getItem(rowNumber);
                var meta = { cssClasses: '' };
                if (typeof previousItemMetadata === 'function') {
                    meta = previousItemMetadata(rowNumber);
                }
                if (!meta) {
                    meta = { cssClasses: '' };
                }
                if (item && item._dirty) {
                    meta.cssClasses = (meta && meta.cssClasses || '') + ' dirty';
                }
                if (item && item.rowClass && meta) {
                    meta.cssClasses += " " + item.rowClass;
                    meta.cssClasses += " row" + rowNumber;
                }
                return meta;
            };
        };
        /**
         * Highlight then fade a row for x seconds.
         * The implementation follows this SO answer: https://stackoverflow.com/a/19985148/1212166
         * @param rowNumber
         * @param fadeDelay
         */
        GridService.prototype.highlightRow = function (rowNumber, fadeDelay, fadeOutDelay) {
            var _this = this;
            if (fadeDelay === void 0) { fadeDelay = 1500; }
            if (fadeOutDelay === void 0) { fadeOutDelay = 300; }
            // create a SelectionModel if there's not one yet
            if (!this._grid.getSelectionModel()) {
                var rowSelectionPlugin = new Slick.RowSelectionModel(this._gridOptions.rowSelectionOptions || {});
                this._grid.setSelectionModel(rowSelectionPlugin);
            }
            if (Array.isArray(rowNumber)) {
                rowNumber.forEach(function (row) { return _this.highlightRowByMetadata(row, fadeDelay, fadeOutDelay); });
            }
            else {
                this.highlightRowByMetadata(rowNumber, fadeDelay, fadeOutDelay);
            }
        };
        GridService.prototype.highlightRowByMetadata = function (rowNumber, fadeDelay, fadeOutDelay) {
            var _this = this;
            if (fadeDelay === void 0) { fadeDelay = 1500; }
            if (fadeOutDelay === void 0) { fadeOutDelay = 300; }
            this._dataView.getItemMetadata = this.getItemRowMetadataToHighlight(this._dataView.getItemMetadata);
            var item = this._dataView.getItem(rowNumber);
            if (item && item.id) {
                item.rowClass = 'highlight';
                this._dataView.updateItem(item.id, item);
                this.renderGrid();
                // fade out
                clearTimeout(highlightTimerEnd);
                highlightTimerEnd = setTimeout(function () {
                    item.rowClass = 'highlight-end';
                    _this._dataView.updateItem(item.id, item);
                    _this.renderGrid();
                }, fadeOutDelay);
                // delete the row's CSS highlight classes once the delay is passed
                setTimeout(function () {
                    if (item && item.id) {
                        delete item.rowClass;
                        if (_this._dataView.getIdxById(item.id) !== undefined) {
                            _this._dataView.updateItem(item.id, item);
                            _this.renderGrid();
                        }
                    }
                }, fadeDelay + fadeOutDelay);
            }
        };
        /** Get the Data Item from a grid row index */
        GridService.prototype.getDataItemByRowIndex = function (index) {
            if (!this._grid || typeof this._grid.getDataItem !== 'function') {
                throw new Error('We could not find SlickGrid Grid object and/or "getDataItem" method');
            }
            return this._grid.getDataItem(index);
        };
        /** Get the Data Item from an array of grid row indexes */
        GridService.prototype.getDataItemByRowIndexes = function (indexes) {
            var _this = this;
            if (!this._grid || typeof this._grid.getDataItem !== 'function') {
                throw new Error('We could not find SlickGrid Grid object and/or "getDataItem" method');
            }
            var dataItems = [];
            if (Array.isArray(indexes)) {
                indexes.forEach(function (idx) {
                    dataItems.push(_this._grid.getDataItem(idx));
                });
            }
            return dataItems;
        };
        /** Get the currently selected row indexes */
        GridService.prototype.getSelectedRows = function () {
            if (!this._grid || typeof this._grid.getSelectedRows !== 'function') {
                throw new Error('We could not find SlickGrid Grid object and/or "getSelectedRows" method');
            }
            return this._grid.getSelectedRows();
        };
        /** Get the currently selected rows item data */
        GridService.prototype.getSelectedRowsDataItem = function () {
            if (!this._grid || typeof this._grid.getSelectedRows !== 'function') {
                throw new Error('We could not find SlickGrid Grid object and/or "getSelectedRows" method');
            }
            var selectedRowIndexes = this._grid.getSelectedRows();
            return this.getDataItemByRowIndexes(selectedRowIndexes);
        };
        /** Select the selected row by a row index */
        GridService.prototype.setSelectedRow = function (rowIndex) {
            if (this._grid && this._grid.setSelectedRows) {
                this._grid.setSelectedRows([rowIndex]);
            }
        };
        /** Set selected rows with provided array of row indexes */
        GridService.prototype.setSelectedRows = function (rowIndexes) {
            if (this._grid && this._grid.setSelectedRows) {
                this._grid.setSelectedRows(rowIndexes);
            }
        };
        /** Re-Render the Grid */
        GridService.prototype.renderGrid = function () {
            if (this._grid && typeof this._grid.invalidate === 'function') {
                this._grid.invalidate();
                this._grid.render();
            }
        };
        /**
         * Reset the grid to it's original state (clear any filters, sorting & pagination if exists) .
         * The column definitions could be passed as argument to reset (this can be used after a Grid State reset)
         * The reset will clear the Filters & Sort, then will reset the Columns to their original state
         */
        GridService.prototype.resetGrid = function (columnDefinitions) {
            // reset columns to original states & refresh the grid
            if (this._grid && this._dataView) {
                var originalColumns = this.extensionService.getAllColumns();
                if (Array.isArray(originalColumns) && originalColumns.length > 0) {
                    // set the grid columns to it's original column definitions
                    this._grid.setColumns(originalColumns);
                    if (this._gridOptions && this._gridOptions.enableAutoSizeColumns) {
                        this._grid.autosizeColumns();
                    }
                    this.gridStateService.resetColumns(columnDefinitions);
                }
            }
            if (this.filterService && this.filterService.clearFilters) {
                this.filterService.clearFilters();
            }
            if (this.sortService && this.sortService.clearSorting) {
                this.sortService.clearSorting();
            }
        };
        /** @deprecated please use "addItem" method instead */
        GridService.prototype.addItemToDatagrid = function (item, shouldHighlightRow, shouldResortGrid, shouldTriggerEvent, shouldSelectRow) {
            if (shouldHighlightRow === void 0) { shouldHighlightRow = true; }
            if (shouldResortGrid === void 0) { shouldResortGrid = false; }
            if (shouldTriggerEvent === void 0) { shouldTriggerEvent = true; }
            if (shouldSelectRow === void 0) { shouldSelectRow = true; }
            return this.addItem(item, { highlightRow: shouldHighlightRow, resortGrid: shouldResortGrid, triggerEvent: shouldTriggerEvent, selectRow: shouldSelectRow });
        };
        /** @deprecated please use "addItems" method instead */
        GridService.prototype.addItemsToDatagrid = function (items, shouldHighlightRow, shouldResortGrid, shouldTriggerEvent, shouldSelectRow) {
            if (shouldHighlightRow === void 0) { shouldHighlightRow = true; }
            if (shouldResortGrid === void 0) { shouldResortGrid = false; }
            if (shouldTriggerEvent === void 0) { shouldTriggerEvent = true; }
            if (shouldSelectRow === void 0) { shouldSelectRow = true; }
            return this.addItems(items, { highlightRow: shouldHighlightRow, resortGrid: shouldResortGrid, triggerEvent: shouldTriggerEvent, selectRow: shouldSelectRow });
        };
        /**
         * Add an item (data item) to the datagrid, by default it will highlight (flashing) the inserted row but we can disable it too
         * @param item object which must contain a unique "id" property and any other suitable properties
         * @param options: provide the possibility to do certain actions after or during the upsert (highlightRow, resortGrid, selectRow, triggerEvent)
         * @return rowIndex: typically index 0
         */
        GridService.prototype.addItem = function (item, options) {
            options = __assign({}, GridServiceInsertOptionDefaults, options);
            if (!this._grid || !this._gridOptions || !this._dataView) {
                throw new Error('We could not find SlickGrid Grid, DataView objects');
            }
            if (!item || !item.hasOwnProperty('id')) {
                throw new Error("Adding an item requires the item to include an \"id\" property");
            }
            this._dataView.insertItem(0, item); // insert at index 0
            // row number in the grid, by default it will be on first row
            var rowNumber = 0;
            // do we want the item to be sorted in the grid, when set to False it will insert on first row (defaults to false)
            if (options.resortGrid) {
                this._dataView.reSort();
                // find the row number in the grid and if user wanted to see highlighted row
                // we need to do it here after resort and get each row number because it possibly changes after the sort
                rowNumber = this._dataView.getRowById(item.id);
            }
            else {
                this._grid.scrollRowIntoView(rowNumber); // scroll to row 0
            }
            // highlight the row we just added, if highlight is defined
            if (options.highlightRow) {
                this.highlightRow(rowNumber);
            }
            // select the row in the grid
            if (options.selectRow && this._gridOptions && (this._gridOptions.enableCheckboxSelector || this._gridOptions.enableRowSelection)) {
                this._grid.setSelectedRows(rowNumber);
            }
            // do we want to trigger an event after adding the item
            if (options.triggerEvent) {
                this.onItemAdded.next(item);
            }
            return rowNumber;
        };
        /**
         * Add item array (data item) to the datagrid, by default it will highlight (flashing) the inserted row but we can disable it too
         * @param item object arrays, which must contain unique "id" property and any other suitable properties
         * @param options: provide the possibility to do certain actions after or during the upsert (highlightRow, resortGrid, selectRow, triggerEvent)
         */
        GridService.prototype.addItems = function (items, options) {
            var _this = this;
            options = __assign({}, GridServiceInsertOptionDefaults, options);
            var rowNumbers = [];
            // loop through all items to add
            if (!Array.isArray(items)) {
                return [this.addItem(items, options)];
            }
            else {
                items.forEach(function (item) { return _this.addItem(item, { highlightRow: false, resortGrid: false, selectRow: false, triggerEvent: false }); });
            }
            // do we want the item to be sorted in the grid, when set to False it will insert on first row (defaults to false)
            if (options.resortGrid) {
                this._dataView.reSort();
                // if user wanted to see highlighted row
                // we need to do it here after resort and get each row number because it possibly changes after the sort
                if (options.highlightRow) {
                    items.forEach(function (item) {
                        var rowNumber = _this._dataView.getRowById(item.id);
                        rowNumbers.push(rowNumber);
                    });
                }
            }
            else if (options.highlightRow) {
                var ln = items.length;
                for (var i = 0; i < ln; i++) {
                    rowNumbers.push(i);
                }
            }
            // do user want to highlight the rows
            if (options.highlightRow) {
                this.highlightRow(rowNumbers);
            }
            // select the row in the grid
            if (options.selectRow && this._gridOptions && (this._gridOptions.enableCheckboxSelector || this._gridOptions.enableRowSelection)) {
                this._grid.setSelectedRows(rowNumbers);
            }
            // do we want to trigger an event after adding the item
            if (options.triggerEvent) {
                this.onItemAdded.next(items);
            }
            return rowNumbers;
        };
        /** @deprecated please use "deleteItem" method instead */
        GridService.prototype.deleteDataGridItem = function (item, shouldTriggerEvent) {
            if (shouldTriggerEvent === void 0) { shouldTriggerEvent = true; }
            this.deleteItem(item, { triggerEvent: shouldTriggerEvent });
        };
        /** @deprecated please use "deleteItems" method instead */
        GridService.prototype.deleteDataGridItems = function (items, shouldTriggerEvent) {
            if (shouldTriggerEvent === void 0) { shouldTriggerEvent = true; }
            this.deleteItems(items, { triggerEvent: shouldTriggerEvent });
        };
        /** @deprecated please use "deleteItemById" method instead */
        GridService.prototype.deleteDataGridItemById = function (itemId, shouldTriggerEvent) {
            if (shouldTriggerEvent === void 0) { shouldTriggerEvent = true; }
            this.deleteItemById(itemId, { triggerEvent: shouldTriggerEvent });
        };
        /** @deprecated please use "deleteItemByIds" method instead */
        GridService.prototype.deleteDataGridItemByIds = function (itemIds, shouldTriggerEvent) {
            if (shouldTriggerEvent === void 0) { shouldTriggerEvent = true; }
            this.deleteItemByIds(itemIds, { triggerEvent: shouldTriggerEvent });
        };
        /**
         * Delete an existing item from the datagrid (dataView)
         * @param item object which must contain a unique "id" property and any other suitable properties
         * @param options: provide the possibility to do certain actions after or during the upsert (triggerEvent)
         * @return item id deleted
         */
        GridService.prototype.deleteItem = function (item, options) {
            options = __assign({}, GridServiceDeleteOptionDefaults, options);
            if (!item || !item.hasOwnProperty('id')) {
                throw new Error("Deleting an item requires the item to include an \"id\" property");
            }
            return this.deleteItemById(item.id, options);
        };
        /**
         * Delete an array of existing items from the datagrid
         * @param item object which must contain a unique "id" property and any other suitable properties
         * @param options: provide the possibility to do certain actions after or during the upsert (triggerEvent)
         * @return item id deleted
         */
        GridService.prototype.deleteItems = function (items, options) {
            var _this = this;
            options = __assign({}, GridServiceDeleteOptionDefaults, options);
            // when it's not an array, we can call directly the single item delete
            if (!Array.isArray(items)) {
                this.deleteItem(items, options);
                return [items.id];
            }
            var itemIds = [];
            items.forEach(function (item) {
                if (item && item.id !== undefined) {
                    itemIds.push(item.id);
                }
                _this.deleteItem(item, { triggerEvent: false });
            });
            // do we want to trigger an event after deleting the item
            if (options.triggerEvent) {
                this.onItemDeleted.next(items);
            }
            return itemIds;
        };
        /**
         * Delete an existing item from the datagrid (dataView) by it's id
         * @param itemId: item unique id
         * @param options: provide the possibility to do certain actions after or during the upsert (triggerEvent)
         * @return item id deleted
         */
        GridService.prototype.deleteItemById = function (itemId, options) {
            options = __assign({}, GridServiceDeleteOptionDefaults, options);
            if (itemId === null || itemId === undefined) {
                throw new Error("Cannot delete a row without a valid \"id\"");
            }
            // when user has row selection enabled, we should clear any selection to avoid confusion after a delete
            if (this._grid && this._gridOptions && (this._gridOptions.enableCheckboxSelector || this._gridOptions.enableRowSelection)) {
                this._grid.setSelectedRows([]);
            }
            // delete the item from the dataView
            this._dataView.deleteItem(itemId);
            // do we want to trigger an event after deleting the item
            if (options.triggerEvent) {
                this.onItemDeleted.next(itemId);
            }
            return itemId;
        };
        /**
         * Delete an array of existing items from the datagrid
         * @param itemIds array of item unique IDs
         * @param options: provide the possibility to do certain actions after or during the upsert (triggerEvent)
         */
        GridService.prototype.deleteItemByIds = function (itemIds, options) {
            options = __assign({}, GridServiceDeleteOptionDefaults, options);
            // when it's not an array, we can call directly the single item delete
            if (Array.isArray(itemIds)) {
                for (var i = 0; i < itemIds.length; i++) {
                    if (itemIds[i] !== null) {
                        this.deleteItemById(itemIds[i], { triggerEvent: false });
                    }
                }
                // do we want to trigger an event after deleting the item
                if (options.triggerEvent) {
                    this.onItemDeleted.next(itemIds);
                }
                return itemIds;
            }
            return [];
        };
        /** @deprecated please use "updateItem" method instead */
        GridService.prototype.updateDataGridItem = function (item, shouldHighlightRow, shouldTriggerEvent, shouldSelectRow) {
            if (shouldHighlightRow === void 0) { shouldHighlightRow = true; }
            if (shouldTriggerEvent === void 0) { shouldTriggerEvent = true; }
            if (shouldSelectRow === void 0) { shouldSelectRow = true; }
            return this.updateItem(item, { highlightRow: shouldHighlightRow, triggerEvent: shouldTriggerEvent, selectRow: shouldSelectRow });
        };
        /** @deprecated please use "updateItems" method instead */
        GridService.prototype.updateDataGridItems = function (items, shouldHighlightRow, shouldTriggerEvent, shouldSelectRow) {
            if (shouldHighlightRow === void 0) { shouldHighlightRow = true; }
            if (shouldTriggerEvent === void 0) { shouldTriggerEvent = true; }
            if (shouldSelectRow === void 0) { shouldSelectRow = true; }
            return this.updateItems(items, { highlightRow: shouldHighlightRow, triggerEvent: shouldTriggerEvent, selectRow: shouldSelectRow });
        };
        /** @deprecated please use "updateItemById" method instead */
        GridService.prototype.updateDataGridItemById = function (itemId, item, shouldHighlightRow, shouldTriggerEvent, shouldSelectRow) {
            if (shouldHighlightRow === void 0) { shouldHighlightRow = true; }
            if (shouldTriggerEvent === void 0) { shouldTriggerEvent = true; }
            if (shouldSelectRow === void 0) { shouldSelectRow = true; }
            return this.updateItemById(itemId, item, { highlightRow: shouldHighlightRow, triggerEvent: shouldTriggerEvent, selectRow: shouldSelectRow });
        };
        /**
         * Update an existing item with new properties inside the datagrid
         * @param item object which must contain a unique "id" property and any other suitable properties
         * @param options: provide the possibility to do certain actions after or during the upsert (highlightRow, selectRow, triggerEvent)
         * @return grid row index
         */
        GridService.prototype.updateItem = function (item, options) {
            options = __assign({}, GridServiceUpdateOptionDefaults, options);
            var itemId = (!item || !item.hasOwnProperty('id')) ? undefined : item.id;
            if (itemId === undefined) {
                throw new Error("Calling Update of an item requires the item to include an \"id\" property");
            }
            return this.updateItemById(itemId, item, options);
        };
        /**
         * Update an array of existing items with new properties inside the datagrid
         * @param item object arrays, which must contain unique "id" property and any other suitable properties
         * @param options: provide the possibility to do certain actions after or during the upsert (highlightRow, selectRow, triggerEvent)
         * @return grid row indexes
         */
        GridService.prototype.updateItems = function (items, options) {
            var _this = this;
            options = __assign({}, GridServiceUpdateOptionDefaults, options);
            // when it's not an array, we can call directly the single item update
            if (!Array.isArray(items)) {
                return [this.updateItem(items, options)];
            }
            var gridRowNumbers = [];
            items.forEach(function (item) {
                gridRowNumbers.push(_this.updateItem(item, { highlightRow: false, selectRow: false, triggerEvent: false }));
            });
            // only highlight at the end, all at once
            // we have to do this because doing highlight 1 by 1 would only re-select the last highlighted row which is wrong behavior
            if (options.highlightRow) {
                this.highlightRow(gridRowNumbers);
            }
            // select the row in the grid
            if (options.selectRow && this._gridOptions && (this._gridOptions.enableCheckboxSelector || this._gridOptions.enableRowSelection)) {
                this._grid.setSelectedRows(gridRowNumbers);
            }
            // do we want to trigger an event after updating the item
            if (options.triggerEvent) {
                this.onItemUpdated.next(items);
            }
            return gridRowNumbers;
        };
        /**
         * Update an existing item in the datagrid by it's id and new properties
         * @param itemId: item unique id
         * @param item object which must contain a unique "id" property and any other suitable properties
         * @param options: provide the possibility to do certain actions after or during the upsert (highlightRow, selectRow, triggerEvent)
         * @return grid row number
         */
        GridService.prototype.updateItemById = function (itemId, item, options) {
            options = __assign({}, GridServiceUpdateOptionDefaults, options);
            if (itemId === undefined) {
                throw new Error("Cannot update a row without a valid \"id\"");
            }
            var rowNumber = this._dataView.getRowById(itemId);
            if (!item || rowNumber === undefined) {
                throw new Error("The item to update in the grid was not found with id: " + itemId);
            }
            if (this._dataView.getIdxById(itemId) !== undefined) {
                // Update the item itself inside the dataView
                this._dataView.updateItem(itemId, item);
                this._grid.updateRow(rowNumber);
                // highlight the row we just updated, if defined
                if (options.highlightRow) {
                    this.highlightRow(rowNumber);
                }
                // select the row in the grid
                if (options.selectRow && this._gridOptions && (this._gridOptions.enableCheckboxSelector || this._gridOptions.enableRowSelection)) {
                    this._grid.setSelectedRows(rowNumber);
                }
                // do we want to trigger an event after updating the item
                if (options.triggerEvent) {
                    this.onItemUpdated.next(item);
                }
            }
            return rowNumber;
        };
        /**
         * Insert a row into the grid if it doesn't already exist or update if it does.
         * @param item object which must contain a unique "id" property and any other suitable properties
         * @param options: provide the possibility to do certain actions after or during the upsert (highlightRow, resortGrid, selectRow, triggerEvent)
         */
        GridService.prototype.upsertItem = function (item, options) {
            options = __assign({}, GridServiceInsertOptionDefaults, options);
            var itemId = (!item || !item.hasOwnProperty('id')) ? undefined : item.id;
            if (itemId === undefined) {
                throw new Error("Calling Upsert of an item requires the item to include an \"id\" property");
            }
            return this.upsertItemById(itemId, item, options);
        };
        /**
         * Update an array of existing items with new properties inside the datagrid
         * @param item object arrays, which must contain unique "id" property and any other suitable properties
         * @param options: provide the possibility to do certain actions after or during the upsert (highlightRow, resortGrid, selectRow, triggerEvent)
         * @return row numbers in the grid
         */
        GridService.prototype.upsertItems = function (items, options) {
            var _this = this;
            options = __assign({}, GridServiceInsertOptionDefaults, options);
            // when it's not an array, we can call directly the single item update
            if (!Array.isArray(items)) {
                return [this.upsertItem(items, options)];
            }
            var gridRowNumbers = [];
            items.forEach(function (item) {
                gridRowNumbers.push(_this.upsertItem(item, { highlightRow: false, resortGrid: false, selectRow: false, triggerEvent: false }));
            });
            // only highlight at the end, all at once
            // we have to do this because doing highlight 1 by 1 would only re-select the last highlighted row which is wrong behavior
            if (options.highlightRow) {
                this.highlightRow(gridRowNumbers);
            }
            // select the row in the grid
            if (options.selectRow && this._gridOptions && (this._gridOptions.enableCheckboxSelector || this._gridOptions.enableRowSelection)) {
                this._grid.setSelectedRows(gridRowNumbers);
            }
            // do we want to trigger an event after updating the item
            if (options.triggerEvent) {
                this.onItemUpserted.next(items);
            }
            return gridRowNumbers;
        };
        /**
         * Update an existing item in the datagrid by it's id and new properties
         * @param itemId: item unique id
         * @param item object which must contain a unique "id" property and any other suitable properties
         * @param options: provide the possibility to do certain actions after or during the upsert (highlightRow, resortGrid, selectRow, triggerEvent)
         * @return grid row number in the grid
         */
        GridService.prototype.upsertItemById = function (itemId, item, options) {
            options = __assign({}, GridServiceInsertOptionDefaults, options);
            if (itemId === undefined) {
                throw new Error("Calling Upsert of an item requires the item to include a valid and unique \"id\" property");
            }
            var rowNumber;
            if (this._dataView.getRowById(itemId) === undefined) {
                rowNumber = this.addItem(item, options);
            }
            else {
                rowNumber = this.updateItem(item, { highlightRow: options.highlightRow, selectRow: options.selectRow, triggerEvent: options.triggerEvent });
            }
            // do we want to trigger an event after updating the item
            if (options.triggerEvent) {
                this.onItemUpserted.next(item);
            }
            return rowNumber;
        };
        GridService = __decorate([
            core.Injectable(),
            __metadata("design:paramtypes", [ExtensionService,
                FilterService,
                GridStateService,
                SortService])
        ], GridService);
        return GridService;
    }());

    var GroupingAndColspanService = /** @class */ (function () {
        function GroupingAndColspanService() {
            this._eventHandler = new Slick.EventHandler();
        }
        Object.defineProperty(GroupingAndColspanService.prototype, "_gridOptions", {
            /** Getter for the Grid Options pulled through the Grid Object */
            get: function () {
                return (this._grid && this._grid.getOptions) ? this._grid.getOptions() : {};
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GroupingAndColspanService.prototype, "_columnDefinitions", {
            /** Getter for the Column Definitions pulled through the Grid Object */
            get: function () {
                return (this._grid && this._grid.getColumns) ? this._grid.getColumns() : [];
            },
            enumerable: true,
            configurable: true
        });
        GroupingAndColspanService.prototype.init = function (grid, dataView) {
            var _this = this;
            this._grid = grid;
            this._dataView = dataView;
            if (grid && this._gridOptions) {
                // When dealing with Pre-Header Grouping colspan, we need to re-create the pre-header in multiple occasions
                // for all these occasions, we have to trigger a re-create
                if (this._gridOptions.createPreHeaderPanel) {
                    this._eventHandler.subscribe(grid.onSort, function (e, args) {
                        _this.createPreHeaderRowGroupingTitle();
                    });
                    this._eventHandler.subscribe(grid.onColumnsResized, function (e, args) {
                        _this.createPreHeaderRowGroupingTitle();
                    });
                    this._eventHandler.subscribe(dataView.onRowCountChanged, function (e, args) {
                        _this.createPreHeaderRowGroupingTitle();
                    });
                    // also not sure why at this point, but it seems that I need to call the 1st create in a delayed execution
                    // probably some kind of timing issues and delaying it until the grid is fully ready does help
                    setTimeout(function () {
                        _this.createPreHeaderRowGroupingTitle();
                    }, 50);
                }
            }
        };
        GroupingAndColspanService.prototype.dispose = function () {
            // unsubscribe all SlickGrid events
            this._eventHandler.unsubscribeAll();
        };
        GroupingAndColspanService.prototype.createPreHeaderRowGroupingTitle = function () {
            var $preHeaderPanel = $(this._grid.getPreHeaderPanel())
                .empty()
                .addClass('slick-header-columns')
                .css('left', '-1000px')
                .width(this._grid.getHeadersWidth());
            $preHeaderPanel.parent().addClass('slick-header');
            var headerColumnWidthDiff = this._grid.getHeaderColumnWidthDiff();
            var m;
            var header;
            var lastColumnGroup = '';
            var widthTotal = 0;
            for (var i = 0; i < this._columnDefinitions.length; i++) {
                m = this._columnDefinitions[i];
                if (lastColumnGroup === m.columnGroup && i > 0) {
                    widthTotal += m.width;
                    header.width(widthTotal - headerColumnWidthDiff);
                }
                else {
                    widthTotal = m.width;
                    header = $("<div class=\"ui-state-default slick-header-column\" />")
                        .html("<span class=\"slick-column-name\">" + (m.columnGroup || '') + "</span>")
                        .width(m.width - headerColumnWidthDiff)
                        .appendTo($preHeaderPanel);
                }
                lastColumnGroup = m.columnGroup;
            }
        };
        return GroupingAndColspanService;
    }());

    // global constants, height/width are in pixels
    var DATAGRID_MIN_HEIGHT = 180;
    var DATAGRID_MIN_WIDTH = 300;
    var DATAGRID_BOTTOM_PADDING = 20;
    var DATAGRID_PAGINATION_HEIGHT = 35;
    var ResizerService = /** @class */ (function () {
        function ResizerService() {
            this._resizePaused = false;
            this.onGridAfterResize = new rxjs.Subject();
            this.onGridBeforeResize = new rxjs.Subject();
        }
        Object.defineProperty(ResizerService.prototype, "_gridOptions", {
            /** Getter for the Grid Options pulled through the Grid Object */
            get: function () {
                return (this._grid && this._grid.getOptions) ? this._grid.getOptions() : {};
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ResizerService.prototype, "_gridUid", {
            get: function () {
                return (this._grid && this._grid.getUID) ? this._grid.getUID() : this._gridOptions && this._gridOptions.gridId;
            },
            enumerable: true,
            configurable: true
        });
        ResizerService.prototype.init = function (grid, fixedDimensions) {
            this._grid = grid;
            if (fixedDimensions) {
                this._fixedHeight = fixedDimensions.height;
                this._fixedWidth = fixedDimensions.width;
            }
        };
        /** Attach an auto resize trigger on the datagrid, if that is enable then it will resize itself to the available space
         * Options: we could also provide a % factor to resize on each height/width independently
         */
        ResizerService.prototype.bindAutoResizeDataGrid = function (newSizes) {
            var _this = this;
            // if we can't find the grid to resize, return without attaching anything
            var gridDomElm = $("#" + (this._gridOptions && this._gridOptions.gridId ? this._gridOptions.gridId : 'grid1'));
            if (gridDomElm === undefined || gridDomElm.offset() === undefined) {
                return null;
            }
            // -- 1st resize the datagrid size at first load (we need this because the .on event is not triggered on first load)
            // -- also we add a slight delay (in ms) so that we resize after the grid render is done
            this.resizeGrid(10, newSizes);
            // -- 2nd attach a trigger on the Window DOM element, so that it happens also when resizing after first load
            // -- attach auto-resize to Window object only if it exist
            $(window).on("resize.grid." + this._gridUid, function (event) {
                _this.onGridBeforeResize.next(event);
                if (!_this._resizePaused) {
                    _this.resizeGrid(0, newSizes);
                }
            });
        };
        /**
         * Calculate the datagrid new height/width from the available space, also consider that a % factor might be applied to calculation
         * object gridOptions
         */
        ResizerService.prototype.calculateGridNewDimensions = function (gridOptions) {
            var gridDomElm = $("#" + gridOptions.gridId);
            var autoResizeOptions = gridOptions && gridOptions.autoResize || {};
            var containerElm = (autoResizeOptions && autoResizeOptions.containerId) ? $("#" + autoResizeOptions.containerId) : $("#" + gridOptions.gridContainerId);
            if (!window || containerElm === undefined || gridDomElm === undefined) {
                return null;
            }
            // calculate bottom padding
            // if using pagination, we need to add the pagination height to this bottom padding
            var bottomPadding = (autoResizeOptions && autoResizeOptions.bottomPadding) ? autoResizeOptions.bottomPadding : DATAGRID_BOTTOM_PADDING;
            if (bottomPadding && (gridOptions.enablePagination || this._gridOptions.backendServiceApi)) {
                bottomPadding += DATAGRID_PAGINATION_HEIGHT;
            }
            var gridHeight = 0;
            var gridOffsetTop = 0;
            // which DOM element are we using to calculate the available size for the grid?
            if (autoResizeOptions.calculateAvailableSizeBy === 'container') {
                // uses the container's height to calculate grid height without any top offset
                gridHeight = containerElm.height() || 0;
            }
            else {
                // uses the browser's window height with its top offset to calculate grid height
                gridHeight = window.innerHeight || 0;
                var coordOffsetTop = gridDomElm.offset();
                gridOffsetTop = (coordOffsetTop !== undefined) ? coordOffsetTop.top : 0;
            }
            var availableHeight = gridHeight - gridOffsetTop - bottomPadding;
            var availableWidth = containerElm.width() || 0;
            var maxHeight = autoResizeOptions && autoResizeOptions.maxHeight || undefined;
            var minHeight = autoResizeOptions && autoResizeOptions.minHeight || DATAGRID_MIN_HEIGHT;
            var maxWidth = autoResizeOptions && autoResizeOptions.maxWidth || undefined;
            var minWidth = autoResizeOptions && autoResizeOptions.minWidth || DATAGRID_MIN_WIDTH;
            var newHeight = availableHeight;
            var newWidth = (autoResizeOptions && autoResizeOptions.sidePadding) ? availableWidth - autoResizeOptions.sidePadding : availableWidth;
            // optionally (when defined), make sure that grid height & width are within their thresholds
            if (newHeight < minHeight) {
                newHeight = minHeight;
            }
            if (maxHeight && newHeight > maxHeight) {
                newHeight = maxHeight;
            }
            if (newWidth < minWidth) {
                newWidth = minWidth;
            }
            if (maxWidth && newWidth > maxWidth) {
                newWidth = maxWidth;
            }
            // return the new dimensions unless a fixed height/width was defined
            return {
                height: this._fixedHeight || newHeight,
                width: this._fixedWidth || newWidth
            };
        };
        /**
         * Dispose function when element is destroyed
         */
        ResizerService.prototype.dispose = function () {
            $(window).off("resize.grid." + this._gridUid);
        };
        /**
         * For some reason this only seems to happen in Chrome and is sometime miscalculated by SlickGrid measureSrollbar() method
         * When that happens we will compensate and resize the Grid Viewport to avoid seeing horizontal scrollbar
         * Most of the time it happens, it's a tiny offset calculation of usually 3px (enough to show scrollbar)
         * GitHub issue reference: https://github.com/6pac/SlickGrid/issues/275
         */
        ResizerService.prototype.compensateHorizontalScroll = function (grid, gridOptions) {
            var gridElm = $("#" + gridOptions.gridId);
            var scrollbarDimensions = grid && grid.getScrollbarDimensions();
            var slickGridScrollbarWidth = scrollbarDimensions && scrollbarDimensions.width;
            var calculatedScrollbarWidth = getScrollBarWidth();
            // if scrollbar width is different from SlickGrid calculation to our custom calculation
            // then resize the grid with the missing pixels to remove scroll (usually only 3px)
            if (slickGridScrollbarWidth < calculatedScrollbarWidth) {
                gridElm.width(gridElm.width() + (calculatedScrollbarWidth - slickGridScrollbarWidth));
            }
        };
        /**
         * Return the last resize dimensions used by the service
         * @return last dimensions
         */
        ResizerService.prototype.getLastResizeDimensions = function () {
            return this._lastDimensions;
        };
        /** Provide the possibility to pause the resizer for some time, until user decides to re-enabled it later if he wish to. */
        ResizerService.prototype.pauseResizer = function (isResizePaused) {
            this._resizePaused = isResizePaused;
        };
        /** Resize the datagrid to fit the browser height & width */
        ResizerService.prototype.resizeGrid = function (delay, newSizes) {
            var _this = this;
            if (delay === void 0) { delay = 10; }
            if (!this._grid || !this._gridOptions) {
                throw new Error("\n      Angular-Slickgrid resizer requires a valid Grid object and Grid Options defined.\n      You can fix this by setting your gridOption to use \"enableAutoResize\" or create an instance of the ResizerService by calling bindAutoResizeDataGrid()");
            }
            return new Promise(function (resolve) {
                // because of the javascript async nature, we might want to delay the resize a little bit
                delay = delay || 0;
                if (delay > 0) {
                    clearTimeout(_this._timer);
                    _this._timer = setTimeout(function () { return resolve(_this.resizeGridCallback(newSizes)); }, delay);
                }
                else {
                    resolve(_this.resizeGridCallback(newSizes));
                }
            });
        };
        ResizerService.prototype.resizeGridCallback = function (newSizes) {
            var lastDimensions = this.resizeGridWithDimensions(newSizes);
            this.onGridAfterResize.next(lastDimensions);
            return lastDimensions;
        };
        ResizerService.prototype.resizeGridWithDimensions = function (newSizes) {
            // calculate the available sizes with minimum height defined as a constant
            var availableDimensions = this.calculateGridNewDimensions(this._gridOptions);
            var gridElm = $("#" + this._gridOptions.gridId) || {};
            var gridContainerElm = $("#" + this._gridOptions.gridContainerId) || {};
            if ((newSizes || availableDimensions) && gridElm.length > 0) {
                // get the new sizes, if new sizes are passed (not 0), we will use them else use available space
                // basically if user passes 1 of the dimension, let say he passes just the height,
                // we will use the height as a fixed height but the width will be resized by it's available space
                var newHeight = (newSizes && newSizes.height) ? newSizes.height : availableDimensions.height;
                var newWidth = (newSizes && newSizes.width) ? newSizes.width : availableDimensions.width;
                // apply these new height/width to the datagrid
                if (!this._gridOptions.autoHeight) {
                    gridElm.height(newHeight);
                    gridContainerElm.height(newHeight);
                }
                gridElm.width(newWidth);
                gridContainerElm.width(newWidth);
                // resize the slickgrid canvas on all browser except some IE versions
                // exclude all IE below IE11
                // IE11 wants to be a better standard (W3C) follower (finally) they even changed their appName output to also have 'Netscape'
                if (new RegExp('MSIE [6-8]').exec(navigator.userAgent) === null && this._grid && this._grid.resizeCanvas) {
                    this._grid.resizeCanvas();
                }
                // also call the grid auto-size columns so that it takes available when going bigger
                if (this._gridOptions && this._gridOptions.enableAutoSizeColumns && this._grid.autosizeColumns) {
                    // make sure that the grid still exist (by looking if the Grid UID is found in the DOM tree) to avoid SlickGrid error "missing stylesheet"
                    if (this._gridUid && $("." + this._gridUid).length > 0) {
                        this._grid.autosizeColumns();
                    }
                    // compensate anytime SlickGrid measureScrollbar is incorrect
                    this.compensateHorizontalScroll(this._grid, this._gridOptions);
                }
                // keep last resized dimensions & resolve them to the Promise
                this._lastDimensions = {
                    height: newHeight,
                    width: newWidth
                };
                if ((this._gridOptions.enablePagination || this._gridOptions.backendServiceApi)) {
                    this._lastDimensions.heightWithPagination = newHeight + DATAGRID_PAGINATION_HEIGHT;
                }
            }
            return this._lastDimensions;
        };
        return ResizerService;
    }());

    var AvgAggregator = /** @class */ (function () {
        function AvgAggregator(field) {
            this._count = 0;
            this._field = field;
        }
        AvgAggregator.prototype.init = function () {
            this._count = 0;
            this._nonNullCount = 0;
            this._sum = 0;
        };
        AvgAggregator.prototype.accumulate = function (item) {
            var val = (item && item.hasOwnProperty(this._field)) ? item[this._field] : null;
            this._count++;
            if (val != null && val !== '' && !isNaN(val)) {
                this._nonNullCount++;
                this._sum += parseFloat(val);
            }
        };
        AvgAggregator.prototype.storeResult = function (groupTotals) {
            if (!groupTotals || groupTotals.avg === undefined) {
                groupTotals.avg = {};
            }
            if (this._nonNullCount !== 0) {
                groupTotals.avg[this._field] = this._sum / this._nonNullCount;
            }
        };
        return AvgAggregator;
    }());

    var MinAggregator = /** @class */ (function () {
        function MinAggregator(field) {
            this._field = field;
        }
        MinAggregator.prototype.init = function () {
            this._min = null;
        };
        MinAggregator.prototype.accumulate = function (item) {
            var val = (item && item.hasOwnProperty(this._field)) ? item[this._field] : null;
            if (val != null && val !== '' && !isNaN(val)) {
                if (this._min == null || val < this._min) {
                    this._min = parseFloat(val);
                }
            }
        };
        MinAggregator.prototype.storeResult = function (groupTotals) {
            if (!groupTotals || groupTotals.min === undefined) {
                groupTotals.min = {};
            }
            groupTotals.min[this._field] = this._min;
        };
        return MinAggregator;
    }());

    var MaxAggregator = /** @class */ (function () {
        function MaxAggregator(field) {
            this._field = field;
        }
        MaxAggregator.prototype.init = function () {
            this._max = null;
        };
        MaxAggregator.prototype.accumulate = function (item) {
            var val = (item && item.hasOwnProperty(this._field)) ? item[this._field] : null;
            if (val != null && val !== '' && !isNaN(val)) {
                if (this._max == null || val > this._max) {
                    this._max = parseFloat(val);
                }
            }
        };
        MaxAggregator.prototype.storeResult = function (groupTotals) {
            if (!groupTotals || groupTotals.max === undefined) {
                groupTotals.max = {};
            }
            groupTotals.max[this._field] = this._max;
        };
        return MaxAggregator;
    }());

    var SumAggregator = /** @class */ (function () {
        function SumAggregator(field) {
            this._sum = 0;
            this._field = field;
        }
        SumAggregator.prototype.init = function () {
            this._sum = 0;
        };
        SumAggregator.prototype.accumulate = function (item) {
            var val = (item && item.hasOwnProperty(this._field)) ? item[this._field] : null;
            if (val != null && val !== '' && !isNaN(val)) {
                this._sum += parseFloat(val);
            }
        };
        SumAggregator.prototype.storeResult = function (groupTotals) {
            if (!groupTotals || groupTotals.sum === undefined) {
                groupTotals.sum = {};
            }
            groupTotals.sum[this._field] = this._sum;
        };
        return SumAggregator;
    }());

    /** Provides a list of different Aggregators for the Group Formatter */
    var Aggregators = {
        Avg: AvgAggregator,
        Min: MinAggregator,
        Max: MaxAggregator,
        Sum: SumAggregator
    };

    /*
     * An example of a 'detached' editor.
     * KeyDown events are also handled to provide handling for Tab, Shift-Tab, Esc and Ctrl-Enter.
     */
    var AutoCompleteEditor = /** @class */ (function () {
        function AutoCompleteEditor(args) {
            this.args = args;
            this.init();
        }
        Object.defineProperty(AutoCompleteEditor.prototype, "collection", {
            /** Get the Collection */
            get: function () {
                return this.columnDef && this.columnDef && this.columnDef.internalColumnEditor.collection || [];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AutoCompleteEditor.prototype, "columnDef", {
            /** Get Column Definition object */
            get: function () {
                return this.args && this.args.column || {};
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AutoCompleteEditor.prototype, "columnEditor", {
            /** Get Column Editor object */
            get: function () {
                return this.columnDef && this.columnDef.internalColumnEditor || {};
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AutoCompleteEditor.prototype, "customStructure", {
            /** Getter for the Custom Structure if exist */
            get: function () {
                return this.columnDef && this.columnDef.internalColumnEditor && this.columnDef.internalColumnEditor.customStructure;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AutoCompleteEditor.prototype, "hasAutoCommitEdit", {
            get: function () {
                return this.args.grid.getOptions().autoCommitEdit;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AutoCompleteEditor.prototype, "validator", {
            /** Get the Validator function, can be passed in Editor property or Column Definition */
            get: function () {
                return this.columnEditor.validator || this.columnDef.validator;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AutoCompleteEditor.prototype, "editorOptions", {
            get: function () {
                return this.columnEditor && this.columnEditor.editorOptions || {};
            },
            enumerable: true,
            configurable: true
        });
        AutoCompleteEditor.prototype.init = function () {
            var _this = this;
            var columnId = this.columnDef && this.columnDef.id;
            var placeholder = this.columnEditor && this.columnEditor.placeholder || '';
            var title = this.columnEditor && this.columnEditor.title || '';
            this.labelName = this.customStructure && this.customStructure.label || 'label';
            this.valueName = this.customStructure && this.customStructure.value || 'value';
            this.$input = $("<input type=\"text\" role=\"presentation\" autocomplete=\"off\" class=\"autocomplete editor-text editor-" + columnId + "\" placeholder=\"" + placeholder + "\" title=\"" + title + "\" />")
                .appendTo(this.args.container)
                .on('keydown.nav', function (event) {
                _this._lastInputEvent = event;
                if (event.keyCode === exports.KeyCode.LEFT || event.keyCode === exports.KeyCode.RIGHT) {
                    event.stopImmediatePropagation();
                }
            });
            // user might pass his own autocomplete options
            var autoCompleteOptions = this.columnDef && this.columnDef.internalColumnEditor && this.columnDef.internalColumnEditor.editorOptions;
            // user might provide his own custom structure
            // jQuery UI autocomplete requires a label/value pair, so we must remap them when user provide different ones
            var collection = this.collection;
            if (Array.isArray(collection) && this.customStructure) {
                collection = collection.map(function (item) {
                    return { label: item[_this.labelName], value: item[_this.valueName] };
                });
            }
            // when user passes it's own autocomplete options
            // we still need to provide our own "select" callback implementation
            if (autoCompleteOptions) {
                autoCompleteOptions.select = function (event, ui) { return _this.onClose(event, ui); };
                this.$input.autocomplete(autoCompleteOptions);
            }
            else {
                this.$input.autocomplete({
                    source: collection,
                    minLength: 0,
                    select: function (event, ui) { return _this.onClose(event, ui); },
                });
            }
            setTimeout(function () {
                _this.$input.focus().select();
            }, 50);
        };
        AutoCompleteEditor.prototype.destroy = function () {
            this.$input.off('keydown.nav').remove();
        };
        AutoCompleteEditor.prototype.focus = function () {
            this.$input.focus();
        };
        AutoCompleteEditor.prototype.getValue = function () {
            return this.$input.val();
        };
        AutoCompleteEditor.prototype.setValue = function (val) {
            this.$input.val(val);
        };
        AutoCompleteEditor.prototype.loadValue = function (item) {
            var fieldName = this.columnDef && this.columnDef.field;
            // when it's a complex object, then pull the object name only, e.g.: "user.firstName" => "user"
            var fieldNameFromComplexObject = fieldName.indexOf('.') ? fieldName.substring(0, fieldName.indexOf('.')) : '';
            if (item && this.columnDef && (item.hasOwnProperty(fieldName) || item.hasOwnProperty(fieldNameFromComplexObject))) {
                var data = item[fieldNameFromComplexObject || fieldName];
                this._currentValue = data;
                this._defaultTextValue = typeof data === 'string' ? data : data[this.labelName];
                this.$input.val(this._defaultTextValue);
                this.$input[0].defaultValue = this._defaultTextValue;
                this.$input.select();
            }
        };
        AutoCompleteEditor.prototype.save = function () {
            var validation = this.validate();
            if (validation && validation.valid) {
                if (this.hasAutoCommitEdit) {
                    this.args.grid.getEditorLock().commitCurrentEdit();
                }
                else {
                    this.args.commitChanges();
                }
            }
        };
        AutoCompleteEditor.prototype.serializeValue = function () {
            var _a;
            // if user provided a custom structure, we will serialize the value returned from the object with custom structure
            var minLength = typeof this.editorOptions.minLength !== 'undefined' ? this.editorOptions.minLength : 3;
            if (this.editorOptions.forceUserInput) {
                this._currentValue = this.$input.val().length >= minLength ? this.$input.val() : this._currentValue;
            }
            if (this.customStructure && this._currentValue.hasOwnProperty(this.labelName)) {
                return this._currentValue[this.labelName];
            }
            else if (this._currentValue.label) {
                if (this.columnDef.type === exports.FieldType.object) {
                    return _a = {},
                        _a[this.labelName] = this._currentValue.label,
                        _a[this.valueName] = this._currentValue.value,
                        _a;
                }
                return this._currentValue.label;
            }
            return this._currentValue;
        };
        AutoCompleteEditor.prototype.applyValue = function (item, state) {
            var _this = this;
            var newValue = state;
            var fieldName = this.columnDef && this.columnDef.field;
            // if we have a collection defined, we will try to find the string within the collection and return it
            if (Array.isArray(this.collection) && this.collection.length > 0) {
                newValue = findOrDefault(this.collection, function (collectionItem) {
                    if (collectionItem && collectionItem.hasOwnProperty(_this.labelName)) {
                        return collectionItem[_this.labelName].toString() === state;
                    }
                    return collectionItem.toString() === state;
                });
            }
            // when it's a complex object, then pull the object name only, e.g.: "user.firstName" => "user"
            var fieldNameFromComplexObject = fieldName.indexOf('.') ? fieldName.substring(0, fieldName.indexOf('.')) : '';
            var validation = this.validate(newValue);
            item[fieldNameFromComplexObject || fieldName] = (validation && validation.valid) ? newValue : '';
        };
        AutoCompleteEditor.prototype.isValueChanged = function () {
            var lastEvent = this._lastInputEvent && this._lastInputEvent.keyCode;
            if (this.columnEditor && this.columnEditor.alwaysSaveOnEnterKey && lastEvent === exports.KeyCode.ENTER) {
                return true;
            }
            return (!(this.$input.val() === '' && this._defaultTextValue === null)) && (this.$input.val() !== this._defaultTextValue);
        };
        AutoCompleteEditor.prototype.validate = function (inputValue) {
            var isRequired = this.columnEditor.required;
            var elmValue = (inputValue !== undefined) ? inputValue : this.$input && this.$input.val && this.$input.val();
            var errorMsg = this.columnEditor.errorMessage;
            if (this.validator) {
                return this.validator(elmValue, this.args);
            }
            // by default the editor is almost always valid (except when it's required but not provided)
            if (isRequired && elmValue === '') {
                return {
                    valid: false,
                    msg: errorMsg || Constants.VALIDATION_REQUIRED_FIELD
                };
            }
            return {
                valid: true,
                msg: null
            };
        };
        //
        // private functions
        // ------------------
        AutoCompleteEditor.prototype.onClose = function (event, ui) {
            if (ui && ui.item) {
                this._currentValue = ui && ui.item;
                var itemLabel = typeof ui.item === 'string' ? ui.item : ui.item.label;
                this.setValue(itemLabel);
                if (this.args.grid.getOptions().autoCommitEdit) {
                    // do not use args.commitChanges() as this sets the focus to the next row.
                    var validation = this.validate();
                    if (validation && validation.valid) {
                        this.args.grid.getEditorLock().commitCurrentEdit();
                    }
                }
            }
            return false;
        };
        return AutoCompleteEditor;
    }());

    /*
     * An example of a 'detached' editor.
     * KeyDown events are also handled to provide handling for Tab, Shift-Tab, Esc and Ctrl-Enter.
     */
    var CheckboxEditor = /** @class */ (function () {
        function CheckboxEditor(args) {
            this.args = args;
            this.init();
        }
        Object.defineProperty(CheckboxEditor.prototype, "columnDef", {
            /** Get Column Definition object */
            get: function () {
                return this.args && this.args.column || {};
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CheckboxEditor.prototype, "columnEditor", {
            /** Get Column Editor object */
            get: function () {
                return this.columnDef && this.columnDef.internalColumnEditor && this.columnDef.internalColumnEditor || {};
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CheckboxEditor.prototype, "validator", {
            /** Get the Validator function, can be passed in Editor property or Column Definition */
            get: function () {
                return this.columnEditor.validator || this.columnDef.validator;
            },
            enumerable: true,
            configurable: true
        });
        CheckboxEditor.prototype.init = function () {
            var _this = this;
            var fieldId = this.columnDef && this.columnDef.id;
            var title = this.columnEditor && this.columnEditor.title || '';
            this.$input = $("<input type=\"checkbox\" value=\"true\" class=\"editor-checkbox editor-" + fieldId + "\" title=\"" + title + "\" />");
            this.$input.appendTo(this.args.container);
            this.$input.focus();
            // make the checkbox editor act like a regular checkbox that commit the value on click
            if (this.args.grid.getOptions().autoCommitEdit) {
                this.$input.click(function () { return _this.args.grid.getEditorLock().commitCurrentEdit(); });
            }
        };
        CheckboxEditor.prototype.destroy = function () {
            this.$input.remove();
        };
        CheckboxEditor.prototype.focus = function () {
            this.$input.focus();
        };
        CheckboxEditor.prototype.hide = function () {
            this.$input.hide();
        };
        CheckboxEditor.prototype.show = function () {
            this.$input.show();
        };
        CheckboxEditor.prototype.loadValue = function (item) {
            var fieldName = this.columnDef && this.columnDef.field;
            // when it's a complex object, then pull the object name only, e.g.: "user.firstName" => "user"
            var fieldNameFromComplexObject = fieldName.indexOf('.') ? fieldName.substring(0, fieldName.indexOf('.')) : '';
            if (item && this.columnDef && (item.hasOwnProperty(fieldName) || item.hasOwnProperty(fieldNameFromComplexObject))) {
                this.defaultValue = !!item[fieldNameFromComplexObject || fieldName];
                if (this.defaultValue) {
                    this.$input.prop('checked', true);
                }
                else {
                    this.$input.prop('checked', false);
                }
            }
        };
        CheckboxEditor.prototype.preClick = function () {
            this.$input.prop('checked', !this.$input.prop('checked'));
        };
        CheckboxEditor.prototype.serializeValue = function () {
            return this.$input.prop('checked');
        };
        CheckboxEditor.prototype.applyValue = function (item, state) {
            var fieldName = this.columnDef && this.columnDef.field;
            // when it's a complex object, then pull the object name only, e.g.: "user.firstName" => "user"
            var fieldNameFromComplexObject = fieldName.indexOf('.') ? fieldName.substring(0, fieldName.indexOf('.')) : '';
            var validation = this.validate(state);
            item[fieldNameFromComplexObject || fieldName] = (validation && validation.valid) ? state : '';
        };
        CheckboxEditor.prototype.isValueChanged = function () {
            return (this.serializeValue() !== this.defaultValue);
        };
        CheckboxEditor.prototype.validate = function (inputValue) {
            var isRequired = this.columnEditor.required;
            var isChecked = (inputValue !== undefined) ? inputValue : this.$input && this.$input.prop && this.$input.prop('checked');
            var errorMsg = this.columnEditor.errorMessage;
            if (this.validator) {
                return this.validator(isChecked, this.args);
            }
            // by default the editor is almost always valid (except when it's required but not provided)
            if (isRequired && !isChecked) {
                return {
                    valid: false,
                    msg: errorMsg || Constants.VALIDATION_REQUIRED_FIELD
                };
            }
            return {
                valid: true,
                msg: null
            };
        };
        return CheckboxEditor;
    }());

    var moment$a = moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
    require('flatpickr');
    /*
     * An example of a date picker editor using Flatpickr
     * https://chmln.github.io/flatpickr
     */
    var DateEditor = /** @class */ (function () {
        function DateEditor(args) {
            this.args = args;
            this.init();
        }
        Object.defineProperty(DateEditor.prototype, "columnDef", {
            /** Get Column Definition object */
            get: function () {
                return this.args && this.args.column || {};
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DateEditor.prototype, "columnEditor", {
            /** Get Column Editor object */
            get: function () {
                return this.columnDef && this.columnDef.internalColumnEditor && this.columnDef.internalColumnEditor || {};
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DateEditor.prototype, "editorOptions", {
            /** Get Flatpickr options passed to the editor by the user */
            get: function () {
                return this.columnEditor.editorOptions || {};
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DateEditor.prototype, "validator", {
            /** Get the Validator function, can be passed in Editor property or Column Definition */
            get: function () {
                return this.columnEditor.validator || this.columnDef.validator;
            },
            enumerable: true,
            configurable: true
        });
        DateEditor.prototype.init = function () {
            var _this = this;
            if (this.args && this.args.column) {
                var columnId = this.columnDef && this.columnDef.id;
                var placeholder = this.columnEditor && this.columnEditor.placeholder || '';
                var title = this.columnEditor && this.columnEditor.title || '';
                var gridOptions = this.args.grid.getOptions();
                this.defaultDate = (this.args.item) ? this.args.item[this.args.column.field] : null;
                var inputFormat = mapFlatpickrDateFormatWithFieldType(this.columnDef.type || exports.FieldType.dateIso);
                var outputFormat = mapFlatpickrDateFormatWithFieldType(this.columnDef.outputType || exports.FieldType.dateUtc);
                var currentLocale = this.getCurrentLocale(this.columnDef, gridOptions);
                if (currentLocale.length > 2) {
                    currentLocale = currentLocale.substring(0, 2);
                }
                var pickerOptions = {
                    defaultDate: this.defaultDate,
                    altInput: true,
                    altInputClass: 'flatpickr-alt-input',
                    altFormat: inputFormat,
                    dateFormat: outputFormat,
                    closeOnSelect: false,
                    locale: (currentLocale !== 'en') ? this.loadFlatpickrLocale(currentLocale) : 'en',
                    onChange: function (selectedDates, dateStr, instance) {
                        _this.save();
                    },
                };
                // merge options with optional user's custom options
                var pickerMergedOptions = __assign({}, pickerOptions, this.editorOptions);
                var inputCssClasses = ".editor-text.editor-" + columnId + ".flatpickr";
                this.$input = $("<input type=\"text\" data-defaultDate=\"" + this.defaultDate + "\" class=\"" + inputCssClasses.replace(/\./g, ' ') + "\" placeholder=\"" + placeholder + "\" title=\"" + title + "\" />");
                this.$input.appendTo(this.args.container);
                this.flatInstance = (this.$input[0] && typeof this.$input[0].flatpickr === 'function') ? this.$input[0].flatpickr(pickerMergedOptions) : null;
                // when we're using an alternate input to display data, we'll consider this input as the one to do the focus later on
                // else just use the top one
                this._$inputWithData = (pickerMergedOptions && pickerMergedOptions.altInput) ? $(inputCssClasses + ".flatpickr-alt-input") : this.$input;
            }
        };
        DateEditor.prototype.getCurrentLocale = function (columnDef, gridOptions) {
            var options = gridOptions || columnDef.params || {};
            if (options.i18n && options.i18n instanceof core$1.TranslateService) {
                return options.i18n.currentLang;
            }
            return 'en';
        };
        DateEditor.prototype.loadFlatpickrLocale = function (locale) {
            // change locale if needed, Flatpickr reference: https://chmln.github.io/flatpickr/localization/
            var gridOptions = this.args && this.args.grid && this.args.grid.getOptions();
            if (gridOptions && gridOptions.params && gridOptions.params.flapickrLocale) {
                return gridOptions.params.flapickrLocale;
            }
            else if (locale !== 'en') {
                var localeDefault = require("flatpickr/dist/l10n/" + locale + ".js").default;
                return (localeDefault && localeDefault[locale]) ? localeDefault[locale] : 'en';
            }
            return 'en';
        };
        DateEditor.prototype.destroy = function () {
            this.hide();
            this.$input.remove();
            if (this._$inputWithData && typeof this._$inputWithData.remove === 'function') {
                this._$inputWithData.remove();
            }
        };
        DateEditor.prototype.show = function () {
            if (this.flatInstance && typeof this.flatInstance.open === 'function') {
                this.flatInstance.open();
            }
        };
        DateEditor.prototype.hide = function () {
            if (this.flatInstance && typeof this.flatInstance.close === 'function') {
                this.flatInstance.close();
            }
        };
        DateEditor.prototype.focus = function () {
            if (this._$inputWithData && this._$inputWithData.focus) {
                this._$inputWithData.focus().select();
            }
            else if (this.$input && this.$input.focus) {
                this.$input.focus().select();
            }
        };
        DateEditor.prototype.save = function () {
            // autocommit will not focus the next editor
            var validation = this.validate();
            if (validation && validation.valid) {
                if (this.args.grid.getOptions().autoCommitEdit) {
                    this.args.grid.getEditorLock().commitCurrentEdit();
                }
                else {
                    this.args.commitChanges();
                }
            }
        };
        DateEditor.prototype.getColumnEditor = function () {
            return this.args && this.args.column && this.args.column.internalColumnEditor && this.args.column.internalColumnEditor;
        };
        DateEditor.prototype.loadValue = function (item) {
            var fieldName = this.columnDef && this.columnDef.field;
            // when it's a complex object, then pull the object name only, e.g.: "user.firstName" => "user"
            var fieldNameFromComplexObject = fieldName.indexOf('.') ? fieldName.substring(0, fieldName.indexOf('.')) : '';
            if (item && this.columnDef && (item.hasOwnProperty(fieldName) || item.hasOwnProperty(fieldNameFromComplexObject))) {
                this.defaultDate = item[fieldNameFromComplexObject || fieldName];
                this.flatInstance.setDate(item[this.args.column.field]);
                this.focus();
            }
        };
        DateEditor.prototype.serializeValue = function () {
            var domValue = this.$input.val();
            if (!domValue) {
                return '';
            }
            var outputFormat = mapMomentDateFormatWithFieldType(this.args.column.type || exports.FieldType.dateIso);
            var value = moment$a(domValue).format(outputFormat);
            return value;
        };
        DateEditor.prototype.applyValue = function (item, state) {
            var fieldName = this.columnDef && this.columnDef.field;
            var outputFormat = mapMomentDateFormatWithFieldType(this.args.column.type || exports.FieldType.dateIso);
            // when it's a complex object, then pull the object name only, e.g.: "user.firstName" => "user"
            var fieldNameFromComplexObject = fieldName.indexOf('.') ? fieldName.substring(0, fieldName.indexOf('.')) : '';
            var newValue = state ? moment$a(state, outputFormat).toDate() : '';
            var validation = this.validate(newValue);
            item[fieldNameFromComplexObject || fieldName] = (validation && validation.valid) ? newValue : '';
        };
        DateEditor.prototype.isValueChanged = function () {
            return (!(this.$input.val() === '' && this.defaultDate == null)) && (this.$input.val() !== this.defaultDate);
        };
        DateEditor.prototype.validate = function (inputValue) {
            var isRequired = this.columnEditor.required;
            var elmValue = (inputValue !== undefined) ? inputValue : this.$input && this.$input.val && this.$input.val();
            var errorMsg = this.columnEditor.errorMessage;
            if (this.validator) {
                return this.validator(elmValue, this.args);
            }
            // by default the editor is almost always valid (except when it's required but not provided)
            if (isRequired && elmValue === '') {
                return {
                    valid: false,
                    msg: errorMsg || Constants.VALIDATION_REQUIRED_FIELD
                };
            }
            return {
                valid: true,
                msg: null
            };
        };
        return DateEditor;
    }());

    var defaultDecimalPlaces = 0;
    /*
     * An example of a 'detached' editor.
     * KeyDown events are also handled to provide handling for Tab, Shift-Tab, Esc and Ctrl-Enter.
     */
    var FloatEditor = /** @class */ (function () {
        function FloatEditor(args) {
            this.args = args;
            this.init();
        }
        Object.defineProperty(FloatEditor.prototype, "columnDef", {
            /** Get Column Definition object */
            get: function () {
                return this.args && this.args.column || {};
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FloatEditor.prototype, "columnEditor", {
            /** Get Column Editor object */
            get: function () {
                return this.columnDef && this.columnDef.internalColumnEditor || {};
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FloatEditor.prototype, "hasAutoCommitEdit", {
            get: function () {
                return this.args && this.args.grid && this.args.grid.getOptions && this.args.grid.getOptions().autoCommitEdit;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FloatEditor.prototype, "validator", {
            /** Get the Validator function, can be passed in Editor property or Column Definition */
            get: function () {
                return this.columnEditor.validator || this.columnDef.validator;
            },
            enumerable: true,
            configurable: true
        });
        FloatEditor.prototype.init = function () {
            var _this = this;
            var columnId = this.columnDef && this.columnDef.id;
            var placeholder = this.columnEditor && this.columnEditor.placeholder || '';
            var title = this.columnEditor && this.columnEditor.title || '';
            this.$input = $("<input type=\"number\" role=\"presentation\"  autocomplete=\"off\" class=\"editor-text editor-" + columnId + "\" placeholder=\"" + placeholder + "\" title=\"" + title + "\" step=\"" + this.getInputDecimalSteps() + "\" />")
                .appendTo(this.args.container)
                .on('keydown.nav', function (event) {
                _this._lastInputEvent = event;
                if (event.keyCode === exports.KeyCode.LEFT || event.keyCode === exports.KeyCode.RIGHT) {
                    event.stopImmediatePropagation();
                }
            });
            // the lib does not get the focus out event for some reason
            // so register it here
            if (this.hasAutoCommitEdit) {
                this.$input.on('focusout', function () { return _this.save(); });
            }
            setTimeout(function () {
                _this.$input.focus().select();
            }, 50);
        };
        FloatEditor.prototype.destroy = function () {
            this.$input.off('keydown.nav focusout').remove();
        };
        FloatEditor.prototype.focus = function () {
            this.$input.focus();
        };
        FloatEditor.prototype.getColumnEditor = function () {
            return this.args && this.args.column && this.args.column.internalColumnEditor;
        };
        FloatEditor.prototype.getDecimalPlaces = function () {
            // returns the number of fixed decimal places or null
            var rtn = (this.columnEditor.params && this.columnEditor.params.hasOwnProperty('decimalPlaces')) ? this.columnEditor.params.decimalPlaces : undefined;
            if (rtn === undefined) {
                rtn = defaultDecimalPlaces;
            }
            return (!rtn && rtn !== 0 ? null : rtn);
        };
        FloatEditor.prototype.getInputDecimalSteps = function () {
            var decimals = this.getDecimalPlaces();
            var zeroString = '';
            for (var i = 1; i < decimals; i++) {
                zeroString += '0';
            }
            if (decimals > 0) {
                return "0." + zeroString + "1";
            }
            return '1';
        };
        FloatEditor.prototype.loadValue = function (item) {
            var fieldName = this.columnDef && this.columnDef.field;
            // when it's a complex object, then pull the object name only, e.g.: "user.firstName" => "user"
            var fieldNameFromComplexObject = fieldName.indexOf('.') ? fieldName.substring(0, fieldName.indexOf('.')) : '';
            if (item && this.columnDef && (item.hasOwnProperty(fieldName) || item.hasOwnProperty(fieldNameFromComplexObject))) {
                this.defaultValue = item[fieldNameFromComplexObject || fieldName];
                var decPlaces = this.getDecimalPlaces();
                if (decPlaces !== null
                    && (this.defaultValue || this.defaultValue === 0)
                    && this.defaultValue.toFixed) {
                    this.defaultValue = this.defaultValue.toFixed(decPlaces);
                }
                this.$input.val(this.defaultValue);
                this.$input[0].defaultValue = this.defaultValue;
                this.$input.select();
            }
        };
        FloatEditor.prototype.serializeValue = function () {
            var elmValue = this.$input.val();
            if (elmValue === '' || isNaN(elmValue)) {
                return elmValue;
            }
            var rtn = parseFloat(elmValue);
            var decPlaces = this.getDecimalPlaces();
            if (decPlaces !== null
                && (rtn || rtn === 0)
                && rtn.toFixed) {
                rtn = parseFloat(rtn.toFixed(decPlaces));
            }
            return rtn;
        };
        FloatEditor.prototype.applyValue = function (item, state) {
            var fieldName = this.columnDef && this.columnDef.field;
            // when it's a complex object, then pull the object name only, e.g.: "user.firstName" => "user"
            var fieldNameFromComplexObject = fieldName.indexOf('.') ? fieldName.substring(0, fieldName.indexOf('.')) : '';
            var validation = this.validate(state);
            item[fieldNameFromComplexObject || fieldName] = (validation && validation.valid) ? state : '';
        };
        FloatEditor.prototype.isValueChanged = function () {
            var elmValue = this.$input.val();
            var lastEvent = this._lastInputEvent && this._lastInputEvent.keyCode;
            if (this.columnEditor && this.columnEditor.alwaysSaveOnEnterKey && lastEvent === exports.KeyCode.ENTER) {
                return true;
            }
            return (!(elmValue === '' && this.defaultValue === null)) && (elmValue !== this.defaultValue);
        };
        FloatEditor.prototype.save = function () {
            var validation = this.validate();
            if (validation && validation.valid) {
                if (this.hasAutoCommitEdit) {
                    this.args.grid.getEditorLock().commitCurrentEdit();
                }
                else {
                    this.args.commitChanges();
                }
            }
        };
        FloatEditor.prototype.validate = function (inputValue) {
            var elmValue = (inputValue !== undefined) ? inputValue : this.$input && this.$input.val && this.$input.val();
            var floatNumber = !isNaN(elmValue) ? parseFloat(elmValue) : null;
            var decPlaces = this.getDecimalPlaces();
            var isRequired = this.columnEditor.required;
            var minValue = this.columnEditor.minValue;
            var maxValue = this.columnEditor.maxValue;
            var errorMsg = this.columnEditor.errorMessage;
            var mapValidation = {
                '{{minValue}}': minValue,
                '{{maxValue}}': maxValue,
                '{{minDecimal}}': 0,
                '{{maxDecimal}}': decPlaces
            };
            var isValid = true;
            var outputMsg = '';
            if (this.validator) {
                return this.validator(elmValue, this.args);
            }
            else if (isRequired && elmValue === '') {
                isValid = false;
                outputMsg = errorMsg || Constants.VALIDATION_REQUIRED_FIELD;
            }
            else if (isNaN(elmValue) || (decPlaces === 0 && !/^[-+]?(\d+(\.)?(\d)*)$/.test(elmValue))) {
                // when decimal value is 0 (which is the default), we accept 0 or more decimal values
                isValid = false;
                outputMsg = errorMsg || Constants.VALIDATION_EDITOR_VALID_NUMBER;
            }
            else if (minValue !== undefined && maxValue !== undefined && floatNumber !== null && (floatNumber < minValue || floatNumber > maxValue)) {
                // MIN & MAX Values provided
                // when decimal value is bigger than 0, we only accept the decimal values as that value set
                // for example if we set decimalPlaces to 2, we will only accept numbers between 0 and 2 decimals
                isValid = false;
                outputMsg = errorMsg || Constants.VALIDATION_EDITOR_NUMBER_BETWEEN.replace(/{{minValue}}|{{maxValue}}/gi, function (matched) { return mapValidation[matched]; });
            }
            else if (minValue !== undefined && floatNumber !== null && floatNumber <= minValue) {
                // MIN VALUE ONLY
                // when decimal value is bigger than 0, we only accept the decimal values as that value set
                // for example if we set decimalPlaces to 2, we will only accept numbers between 0 and 2 decimals
                isValid = false;
                outputMsg = errorMsg || Constants.VALIDATION_EDITOR_NUMBER_MIN.replace(/{{minValue}}/gi, function (matched) { return mapValidation[matched]; });
            }
            else if (maxValue !== undefined && floatNumber !== null && floatNumber >= maxValue) {
                // MAX VALUE ONLY
                // when decimal value is bigger than 0, we only accept the decimal values as that value set
                // for example if we set decimalPlaces to 2, we will only accept numbers between 0 and 2 decimals
                isValid = false;
                outputMsg = errorMsg || Constants.VALIDATION_EDITOR_NUMBER_MAX.replace(/{{maxValue}}/gi, function (matched) { return mapValidation[matched]; });
            }
            else if ((decPlaces > 0 && !new RegExp("^(\\d*(\\.)?(\\d){0," + decPlaces + "})$").test(elmValue))) {
                // when decimal value is bigger than 0, we only accept the decimal values as that value set
                // for example if we set decimalPlaces to 2, we will only accept numbers between 0 and 2 decimals
                isValid = false;
                outputMsg = errorMsg || Constants.VALIDATION_EDITOR_DECIMAL_BETWEEN.replace(/{{minDecimal}}|{{maxDecimal}}/gi, function (matched) { return mapValidation[matched]; });
            }
            return {
                valid: isValid,
                msg: outputMsg
            };
        };
        return FloatEditor;
    }());

    /*
     * An example of a 'detached' editor.
     * KeyDown events are also handled to provide handling for Tab, Shift-Tab, Esc and Ctrl-Enter.
     */
    var IntegerEditor = /** @class */ (function () {
        function IntegerEditor(args) {
            this.args = args;
            this.init();
        }
        Object.defineProperty(IntegerEditor.prototype, "columnDef", {
            /** Get Column Definition object */
            get: function () {
                return this.args && this.args.column || {};
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(IntegerEditor.prototype, "columnEditor", {
            /** Get Column Editor object */
            get: function () {
                return this.columnDef && this.columnDef.internalColumnEditor && this.columnDef.internalColumnEditor || {};
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(IntegerEditor.prototype, "hasAutoCommitEdit", {
            get: function () {
                return this.args && this.args.grid && this.args.grid.getOptions && this.args.grid.getOptions().autoCommitEdit;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(IntegerEditor.prototype, "validator", {
            /** Get the Validator function, can be passed in Editor property or Column Definition */
            get: function () {
                return this.columnEditor.validator || this.columnDef.validator;
            },
            enumerable: true,
            configurable: true
        });
        IntegerEditor.prototype.init = function () {
            var _this = this;
            var columnId = this.columnDef && this.columnDef.id;
            var placeholder = this.columnEditor && this.columnEditor.placeholder || '';
            var title = this.columnEditor && this.columnEditor.title || '';
            this.$input = $("<input type=\"number\" role=\"presentation\"  autocomplete=\"off\" class=\"editor-text editor-" + columnId + "\" placeholder=\"" + placeholder + "\" title=\"" + title + "\" />")
                .appendTo(this.args.container)
                .on('keydown.nav', function (event) {
                _this._lastInputEvent = event;
                if (event.keyCode === exports.KeyCode.LEFT || event.keyCode === exports.KeyCode.RIGHT) {
                    event.stopImmediatePropagation();
                }
            });
            // the lib does not get the focus out event for some reason
            // so register it here
            if (this.hasAutoCommitEdit) {
                this.$input.on('focusout', function () { return _this.save(); });
            }
            setTimeout(function () {
                _this.$input.focus().select();
            }, 50);
        };
        IntegerEditor.prototype.destroy = function () {
            this.$input.off('keydown.nav focusout').remove();
        };
        IntegerEditor.prototype.focus = function () {
            this.$input.focus();
        };
        IntegerEditor.prototype.getColumnEditor = function () {
            return this.args && this.args.column && this.args.column.internalColumnEditor;
        };
        IntegerEditor.prototype.loadValue = function (item) {
            var fieldName = this.columnDef && this.columnDef.field;
            // when it's a complex object, then pull the object name only, e.g.: "user.firstName" => "user"
            var fieldNameFromComplexObject = fieldName.indexOf('.') ? fieldName.substring(0, fieldName.indexOf('.')) : '';
            if (item && this.columnDef && (item.hasOwnProperty(fieldName) || item.hasOwnProperty(fieldNameFromComplexObject))) {
                this.defaultValue = item[fieldNameFromComplexObject || fieldName];
                this.$input.val(this.defaultValue);
                this.$input[0].defaultValue = this.defaultValue;
                this.$input.select();
            }
        };
        IntegerEditor.prototype.serializeValue = function () {
            var elmValue = this.$input.val();
            if (elmValue === '' || isNaN(elmValue)) {
                return elmValue;
            }
            return isNaN(elmValue) ? elmValue : parseInt(elmValue, 10);
        };
        IntegerEditor.prototype.applyValue = function (item, state) {
            var fieldName = this.columnDef && this.columnDef.field;
            // when it's a complex object, then pull the object name only, e.g.: "user.firstName" => "user"
            var fieldNameFromComplexObject = fieldName.indexOf('.') ? fieldName.substring(0, fieldName.indexOf('.')) : '';
            var validation = this.validate(state);
            item[fieldNameFromComplexObject || fieldName] = (validation && validation.valid) ? state : '';
        };
        IntegerEditor.prototype.isValueChanged = function () {
            var elmValue = this.$input.val();
            var lastEvent = this._lastInputEvent && this._lastInputEvent.keyCode;
            if (this.columnEditor && this.columnEditor.alwaysSaveOnEnterKey && lastEvent === exports.KeyCode.ENTER) {
                return true;
            }
            return (!(elmValue === '' && this.defaultValue === null)) && (elmValue !== this.defaultValue);
        };
        IntegerEditor.prototype.save = function () {
            var validation = this.validate();
            if (validation && validation.valid) {
                if (this.hasAutoCommitEdit) {
                    this.args.grid.getEditorLock().commitCurrentEdit();
                }
                else {
                    this.args.commitChanges();
                }
            }
        };
        IntegerEditor.prototype.validate = function (inputValue) {
            var elmValue = (inputValue !== undefined) ? inputValue : this.$input && this.$input.val && this.$input.val();
            var intNumber = !isNaN(elmValue) ? parseInt(elmValue, 10) : null;
            var errorMsg = this.columnEditor.errorMessage;
            var isRequired = this.columnEditor.required;
            var minValue = this.columnEditor.minValue;
            var maxValue = this.columnEditor.maxValue;
            var mapValidation = {
                '{{minValue}}': minValue,
                '{{maxValue}}': maxValue
            };
            var isValid = true;
            var outputMsg = '';
            if (this.validator) {
                return this.validator(elmValue, this.args);
            }
            else if (isRequired && elmValue === '') {
                isValid = false;
                outputMsg = errorMsg || Constants.VALIDATION_REQUIRED_FIELD;
            }
            else if (isNaN(elmValue) || !/^[+-]?\d+$/.test(elmValue)) {
                isValid = false;
                outputMsg = errorMsg || Constants.VALIDATION_EDITOR_VALID_INTEGER;
            }
            else if (minValue !== undefined && maxValue !== undefined && intNumber !== null && (intNumber < minValue || intNumber > maxValue)) {
                // MIN & MAX Values provided
                // when decimal value is bigger than 0, we only accept the decimal values as that value set
                // for example if we set decimalPlaces to 2, we will only accept numbers between 0 and 2 decimals
                isValid = false;
                outputMsg = errorMsg || Constants.VALIDATION_EDITOR_INTEGER_BETWEEN.replace(/{{minValue}}|{{maxValue}}/gi, function (matched) { return mapValidation[matched]; });
            }
            else if (minValue !== undefined && intNumber !== null && intNumber <= minValue) {
                // MIN VALUE ONLY
                // when decimal value is bigger than 0, we only accept the decimal values as that value set
                // for example if we set decimalPlaces to 2, we will only accept numbers between 0 and 2 decimals
                isValid = false;
                outputMsg = errorMsg || Constants.VALIDATION_EDITOR_INTEGER_MIN.replace(/{{minValue}}/gi, function (matched) { return mapValidation[matched]; });
            }
            else if (maxValue !== undefined && intNumber !== null && intNumber >= maxValue) {
                // MAX VALUE ONLY
                // when decimal value is bigger than 0, we only accept the decimal values as that value set
                // for example if we set decimalPlaces to 2, we will only accept numbers between 0 and 2 decimals
                isValid = false;
                outputMsg = errorMsg || Constants.VALIDATION_EDITOR_INTEGER_MAX.replace(/{{maxValue}}/gi, function (matched) { return mapValidation[matched]; });
            }
            return {
                valid: isValid,
                msg: outputMsg
            };
        };
        return IntegerEditor;
    }());

    /*
     * An example of a 'detached' editor.
     * The UI is added onto document BODY and .position(), .show() and .hide() are implemented.
     * KeyDown events are also handled to provide handling for Tab, Shift-Tab, Esc and Ctrl-Enter.
     */
    var LongTextEditor = /** @class */ (function () {
        function LongTextEditor(args) {
            this.args = args;
            this.gridOptions = this.args.grid.getOptions();
            var options = this.gridOptions || this.args.column.params || {};
            this._translate = options.i18n;
            this.init();
        }
        Object.defineProperty(LongTextEditor.prototype, "columnDef", {
            /** Get Column Definition object */
            get: function () {
                return this.args && this.args.column || {};
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LongTextEditor.prototype, "columnEditor", {
            /** Get Column Editor object */
            get: function () {
                return this.columnDef && this.columnDef.internalColumnEditor && this.columnDef.internalColumnEditor || {};
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LongTextEditor.prototype, "validator", {
            /** Get the Validator function, can be passed in Editor property or Column Definition */
            get: function () {
                return this.columnEditor.validator || this.columnDef.validator;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LongTextEditor.prototype, "hasAutoCommitEdit", {
            get: function () {
                return this.args.grid.getOptions().autoCommitEdit;
            },
            enumerable: true,
            configurable: true
        });
        LongTextEditor.prototype.init = function () {
            var _this = this;
            var columnId = this.columnDef && this.columnDef.id;
            var placeholder = this.columnEditor && this.columnEditor.placeholder || '';
            var title = this.columnEditor && this.columnEditor.title || '';
            var cancelText = this._translate && this._translate.instant('CANCEL') || Constants.TEXT_CANCEL;
            var saveText = this._translate && this._translate.instant('SAVE') || Constants.TEXT_SAVE;
            var $container = $('body');
            this.$wrapper = $("<div class=\"slick-large-editor-text editor-" + columnId + "\" />").appendTo($container);
            this.$textarea = $("<textarea hidefocus rows=\"5\" placeholder=\"" + placeholder + "\" title=\"" + title + "\">").appendTo(this.$wrapper);
            // the lib does not get the focus out event for some reason
            // so register it here
            if (this.hasAutoCommitEdit) {
                this.$textarea.on('focusout', function () { return _this.save(); });
            }
            $("<div class=\"editor-footer\">\n          <button class=\"btn btn-primary btn-xs\">" + saveText + "</button>\n          <button class=\"btn btn-default btn-xs\">" + cancelText + "</button>\n      </div>").appendTo(this.$wrapper);
            this.$wrapper.find('button:first').on('click', function () { return _this.save(); });
            this.$wrapper.find('button:last').on('click', function () { return _this.cancel(); });
            this.$textarea.on('keydown', this.handleKeyDown.bind(this));
            this.position(this.args && this.args.position);
            this.$textarea.focus().select();
        };
        LongTextEditor.prototype.handleKeyDown = function (event) {
            if (event.which === exports.KeyCode.ENTER && event.ctrlKey) {
                this.save();
            }
            else if (event.which === exports.KeyCode.ESCAPE) {
                event.preventDefault();
                this.cancel();
            }
            else if (event.which === exports.KeyCode.TAB && event.shiftKey) {
                event.preventDefault();
                if (this.args && this.args.grid) {
                    this.args.grid.navigatePrev();
                }
            }
            else if (event.which === exports.KeyCode.TAB) {
                event.preventDefault();
                if (this.args && this.args.grid) {
                    this.args.grid.navigateNext();
                }
            }
        };
        LongTextEditor.prototype.cancel = function () {
            this.$textarea.val(this.defaultValue);
            if (this.args && this.args.cancelChanges) {
                this.args.cancelChanges();
            }
        };
        LongTextEditor.prototype.hide = function () {
            this.$wrapper.hide();
        };
        LongTextEditor.prototype.show = function () {
            this.$wrapper.show();
        };
        LongTextEditor.prototype.position = function (position) {
            this.$wrapper
                .css('top', (position.top || 0) - 5)
                .css('left', (position.left || 0) - 5);
        };
        LongTextEditor.prototype.destroy = function () {
            this.$wrapper.off('keydown focusout').remove();
        };
        LongTextEditor.prototype.focus = function () {
            this.$textarea.focus();
        };
        LongTextEditor.prototype.getValue = function () {
            return this.$textarea.val();
        };
        LongTextEditor.prototype.setValue = function (val) {
            this.$textarea.val(val);
        };
        LongTextEditor.prototype.getColumnEditor = function () {
            return this.args && this.args.column && this.args.column.internalColumnEditor && this.args.column.internalColumnEditor;
        };
        LongTextEditor.prototype.loadValue = function (item) {
            var fieldName = this.columnDef && this.columnDef.field;
            // when it's a complex object, then pull the object name only, e.g.: "user.firstName" => "user"
            var fieldNameFromComplexObject = fieldName.indexOf('.') ? fieldName.substring(0, fieldName.indexOf('.')) : '';
            if (item && this.columnDef && (item.hasOwnProperty(fieldName) || item.hasOwnProperty(fieldNameFromComplexObject))) {
                this.defaultValue = item[fieldNameFromComplexObject || fieldName];
                this.$textarea.val(this.defaultValue);
                this.$textarea.select();
            }
        };
        LongTextEditor.prototype.serializeValue = function () {
            return this.$textarea.val();
        };
        LongTextEditor.prototype.applyValue = function (item, state) {
            var fieldName = this.columnDef && this.columnDef.field;
            // when it's a complex object, then pull the object name only, e.g.: "user.firstName" => "user"
            var fieldNameFromComplexObject = fieldName.indexOf('.') ? fieldName.substring(0, fieldName.indexOf('.')) : '';
            var validation = this.validate(state);
            item[fieldNameFromComplexObject || fieldName] = (validation && validation.valid) ? state : '';
        };
        LongTextEditor.prototype.isValueChanged = function () {
            return (!(this.$textarea.val() === '' && this.defaultValue === null)) && (this.$textarea.val() !== this.defaultValue);
        };
        LongTextEditor.prototype.save = function () {
            var validation = this.validate();
            if (validation && validation.valid) {
                if (this.hasAutoCommitEdit) {
                    this.args.grid.getEditorLock().commitCurrentEdit();
                }
                else {
                    this.args.commitChanges();
                }
            }
            else {
                this.args.commitChanges();
            }
        };
        LongTextEditor.prototype.validate = function (inputValue) {
            var isRequired = this.columnEditor.required;
            var elmValue = (inputValue !== undefined) ? inputValue : this.$textarea && this.$textarea.val && this.$textarea.val();
            var errorMsg = this.columnEditor.errorMessage;
            if (this.validator) {
                return this.validator(elmValue, this.args);
            }
            // by default the editor is almost always valid (except when it's required but not provided)
            if (isRequired && elmValue === '') {
                return {
                    valid: false,
                    msg: errorMsg || Constants.VALIDATION_REQUIRED_FIELD
                };
            }
            return {
                valid: true,
                msg: null
            };
        };
        return LongTextEditor;
    }());

    var DOMPurify$2 = DOMPurify_; // patch to fix rollup to work
    /**
     * Slickgrid editor class for multiple/single select lists
     */
    var SelectEditor = /** @class */ (function () {
        function SelectEditor(args, isMultipleSelect) {
            var _this = this;
            this.args = args;
            this.isMultipleSelect = isMultipleSelect;
            /** Observable Subscriptions */
            this._subscriptions = [];
            // flag to signal that the editor is destroying itself, helps prevent
            // commit changes from being called twice and erroring
            this._destroying = false;
            this.gridOptions = this.args.grid.getOptions();
            var gridOptions = this.gridOptions || this.args.column.params || {};
            this._translate = gridOptions.i18n;
            // provide the name attribute to the DOM element which will be needed to auto-adjust drop position (dropup / dropdown)
            var fieldId = this.columnDef && this.columnDef.id;
            this.elementName = "editor-" + fieldId;
            var libOptions = {
                autoAdjustDropHeight: true,
                autoAdjustDropPosition: true,
                autoAdjustDropWidthByTextSize: true,
                container: 'body',
                filter: false,
                maxHeight: 275,
                name: this.elementName,
                single: true,
                textTemplate: function ($elm) {
                    // render HTML code or not, by default it is sanitized and won't be rendered
                    var isRenderHtmlEnabled = _this.columnDef && _this.columnDef.internalColumnEditor && _this.columnDef.internalColumnEditor.enableRenderHtml || false;
                    return isRenderHtmlEnabled ? $elm.text() : $elm.html();
                },
                onBlur: function () { return _this.destroy(); },
                onClose: function () {
                    if (!_this._destroying && _this.hasAutoCommitEdit) {
                        // do not use args.commitChanges() as this sets the focus to the next
                        // row. Also the select list will stay shown when clicking off the grid
                        args.grid.getEditorLock().commitCurrentEdit();
                    }
                }
            };
            if (isMultipleSelect) {
                libOptions.single = false;
                libOptions.addTitle = true;
                libOptions.okButton = true;
                libOptions.selectAllDelimiter = ['', ''];
                if (this._translate) {
                    libOptions.countSelected = this._translate.instant('X_OF_Y_SELECTED');
                    libOptions.allSelected = this._translate.instant('ALL_SELECTED');
                    libOptions.selectAllText = this._translate.instant('SELECT_ALL');
                }
            }
            // assign the multiple select lib options
            this.defaultOptions = libOptions;
            this.init();
        }
        Object.defineProperty(SelectEditor.prototype, "collection", {
            /** Get the Collection */
            get: function () {
                return this.columnDef && this.columnDef && this.columnDef.internalColumnEditor.collection || [];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectEditor.prototype, "collectionOptions", {
            /** Getter for the Collection Options */
            get: function () {
                return this.columnDef && this.columnDef.internalColumnEditor && this.columnDef.internalColumnEditor.collectionOptions;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectEditor.prototype, "columnDef", {
            /** Get Column Definition object */
            get: function () {
                return this.args && this.args.column || {};
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectEditor.prototype, "columnEditor", {
            /** Get Column Editor object */
            get: function () {
                return this.columnDef && this.columnDef.internalColumnEditor && this.columnDef.internalColumnEditor || {};
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectEditor.prototype, "customStructure", {
            /** Getter for the Custom Structure if exist */
            get: function () {
                return this.columnDef && this.columnDef.internalColumnEditor && this.columnDef.internalColumnEditor.customStructure;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectEditor.prototype, "hasAutoCommitEdit", {
            get: function () {
                return this.args.grid.getOptions().autoCommitEdit;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectEditor.prototype, "currentValues", {
            /**
             * The current selected values (multiple select) from the collection
             */
            get: function () {
                var _this = this;
                // collection of strings, just return the filtered string that are equals
                if (this.collection.every(function (x) { return typeof x === 'string'; })) {
                    return this.collection.filter(function (c) { return _this.$editorElm.val().indexOf(c.toString()) !== -1; });
                }
                // collection of label/value pair
                var separatorBetweenLabels = this.collectionOptions && this.collectionOptions.separatorBetweenTextLabels || '';
                var isIncludingPrefixSuffix = this.collectionOptions && this.collectionOptions.includePrefixSuffixToSelectedValues || false;
                return this.collection
                    .filter(function (c) { return _this.$editorElm.val().indexOf(c[_this.valueName].toString()) !== -1; })
                    .map(function (c) {
                    var labelText = c[_this.valueName];
                    var prefixText = c[_this.labelPrefixName] || '';
                    var suffixText = c[_this.labelSuffixName] || '';
                    // when it's a complex object, then pull the object name only, e.g.: "user.firstName" => "user"
                    var fieldName = _this.columnDef && _this.columnDef.field;
                    var fieldNameFromComplexObject = fieldName.indexOf('.') ? fieldName.substring(0, fieldName.indexOf('.')) : '';
                    if (fieldNameFromComplexObject && typeof c === 'object') {
                        return c;
                    }
                    // also translate prefix/suffix if enableTranslateLabel is true and text is a string
                    prefixText = (_this.enableTranslateLabel && prefixText && typeof prefixText === 'string') ? _this._translate.instant(prefixText || ' ') : prefixText;
                    suffixText = (_this.enableTranslateLabel && suffixText && typeof suffixText === 'string') ? _this._translate.instant(suffixText || ' ') : suffixText;
                    if (isIncludingPrefixSuffix) {
                        var tmpOptionArray = [prefixText, labelText, suffixText].filter(function (text) { return text; }); // add to a temp array for joining purpose and filter out empty text
                        return tmpOptionArray.join(separatorBetweenLabels);
                    }
                    return labelText;
                });
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectEditor.prototype, "currentValue", {
            /**
             * The current selected values (single select) from the collection
             */
            get: function () {
                var _this = this;
                // collection of strings, just return the filtered string that are equals
                if (this.collection.every(function (x) { return typeof x === 'string'; })) {
                    return findOrDefault(this.collection, function (c) { return c.toString() === _this.$editorElm.val(); });
                }
                // collection of label/value pair
                var separatorBetweenLabels = this.collectionOptions && this.collectionOptions.separatorBetweenTextLabels || '';
                var isIncludingPrefixSuffix = this.collectionOptions && this.collectionOptions.includePrefixSuffixToSelectedValues || false;
                var itemFound = findOrDefault(this.collection, function (c) { return c[_this.valueName].toString() === _this.$editorElm.val(); });
                // when it's a complex object, then pull the object name only, e.g.: "user.firstName" => "user"
                var fieldName = this.columnDef && this.columnDef.field;
                var fieldNameFromComplexObject = fieldName.indexOf('.') ? fieldName.substring(0, fieldName.indexOf('.')) : '';
                if (fieldNameFromComplexObject && typeof itemFound === 'object') {
                    return itemFound;
                }
                else if (itemFound) {
                    var labelText = itemFound[this.valueName];
                    if (isIncludingPrefixSuffix) {
                        var prefixText = itemFound[this.labelPrefixName] || '';
                        var suffixText = itemFound[this.labelSuffixName] || '';
                        // also translate prefix/suffix if enableTranslateLabel is true and text is a string
                        prefixText = (this.enableTranslateLabel && prefixText && typeof prefixText === 'string') ? this._translate.instant(prefixText || ' ') : prefixText;
                        suffixText = (this.enableTranslateLabel && suffixText && typeof suffixText === 'string') ? this._translate.instant(suffixText || ' ') : suffixText;
                        // add to a temp array for joining purpose and filter out empty text
                        var tmpOptionArray = [prefixText, labelText, suffixText].filter(function (text) { return text; });
                        return tmpOptionArray.join(separatorBetweenLabels);
                    }
                    return labelText;
                }
                return '';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SelectEditor.prototype, "validator", {
            /** Get the Validator function, can be passed in Editor property or Column Definition */
            get: function () {
                return this.columnEditor.validator || this.columnDef.validator;
            },
            enumerable: true,
            configurable: true
        });
        SelectEditor.prototype.init = function () {
            if (!this.args) {
                throw new Error('[Angular-SlickGrid] An editor must always have an "init()" with valid arguments.');
            }
            if (!this.columnDef || !this.columnDef.internalColumnEditor || (!this.columnDef.internalColumnEditor.collection && !this.columnDef.internalColumnEditor.collectionAsync)) {
                throw new Error("[Angular-SlickGrid] You need to pass a \"collection\" (or \"collectionAsync\") inside Column Definition Editor for the MultipleSelect/SingleSelect Editor to work correctly.\n      Also each option should include a value/label pair (or value/labelKey when using Locale).\n      For example: { editor: { collection: [{ value: true, label: 'True' },{ value: false, label: 'False'}] } }");
            }
            this._collectionService = new CollectionService(this._translate);
            this.enableTranslateLabel = (this.columnDef.internalColumnEditor.enableTranslateLabel) ? this.columnDef.internalColumnEditor.enableTranslateLabel : false;
            this.labelName = this.customStructure && this.customStructure.label || 'label';
            this.labelPrefixName = this.customStructure && this.customStructure.labelPrefix || 'labelPrefix';
            this.labelSuffixName = this.customStructure && this.customStructure.labelSuffix || 'labelSuffix';
            this.optionLabel = this.customStructure && this.customStructure.optionLabel || 'value';
            this.valueName = this.customStructure && this.customStructure.value || 'value';
            if (this.enableTranslateLabel && (!this._translate || typeof this._translate.instant !== 'function')) {
                throw new Error("[select-editor] The ngx-translate TranslateService is required for the Select Editor to work correctly");
            }
            // always render the Select (dropdown) DOM element, even if user passed a "collectionAsync",
            // if that is the case, the Select will simply be without any options but we still have to render it (else SlickGrid would throw an error)
            this.renderDomElement(this.collection);
        };
        SelectEditor.prototype.applyValue = function (item, state) {
            var fieldName = this.columnDef && this.columnDef.field;
            var fieldType = this.columnDef && this.columnDef.type;
            var newValue = state;
            // when the provided user defined the column field type as a possible number then try parsing the state value as that
            if (fieldType === exports.FieldType.number || fieldType === exports.FieldType.integer || fieldType === exports.FieldType.boolean) {
                newValue = parseFloat(state);
            }
            // when set as a multiple selection, we can assume that the 3rd party lib multiple-select will return a CSV string
            // we need to re-split that into an array to be the same as the original column
            if (this.isMultipleSelect && typeof state === 'string' && state.indexOf(',') >= 0) {
                newValue = state.split(',');
            }
            // when it's a complex object, then pull the object name only, e.g.: "user.firstName" => "user"
            var fieldNameFromComplexObject = fieldName.indexOf('.') ? fieldName.substring(0, fieldName.indexOf('.')) : '';
            var validation = this.validate(newValue);
            item[fieldNameFromComplexObject || fieldName] = (validation && validation.valid) ? newValue : '';
        };
        SelectEditor.prototype.destroy = function () {
            this._destroying = true;
            if (this.$editorElm && typeof this.$editorElm.multipleSelect === 'function') {
                this.$editorElm.multipleSelect('destroy');
                this.$editorElm.remove();
                var elementClassName = this.elementName.toString().replace('.', '\\.'); // make sure to escape any dot "." from CSS class to avoid console error
                $("[name=" + elementClassName + "].ms-drop").remove();
            }
            else if (this.$editorElm && typeof this.$editorElm.remove === 'function') {
                this.$editorElm.remove();
            }
            this._subscriptions = unsubscribeAllObservables(this._subscriptions);
        };
        SelectEditor.prototype.loadValue = function (item) {
            var fieldName = this.columnDef && this.columnDef.field;
            // when it's a complex object, then pull the object name only, e.g.: "user.firstName" => "user"
            var fieldNameFromComplexObject = fieldName.indexOf('.') ? fieldName.substring(0, fieldName.indexOf('.')) : '';
            if (item && this.columnDef && (item.hasOwnProperty(fieldName) || item.hasOwnProperty(fieldNameFromComplexObject))) {
                var currentValue = item[fieldNameFromComplexObject || fieldName];
                var loadValue = fieldNameFromComplexObject && currentValue.hasOwnProperty(this.valueName) ? currentValue[this.valueName] : currentValue;
                if (this.isMultipleSelect && Array.isArray(loadValue)) {
                    this.loadMultipleValues(loadValue);
                }
                else {
                    this.loadSingleValue(loadValue);
                }
                this.refresh();
            }
        };
        SelectEditor.prototype.loadMultipleValues = function (currentValues) {
            // convert to string because that is how the DOM will return these values
            if (Array.isArray(currentValues)) {
                // keep the default values in memory for references
                this.defaultValue = currentValues.map(function (i) { return i; });
                // compare all the array values but as string type since multiple-select always return string
                var currentStringValues_1 = currentValues.map(function (i) { return i.toString(); });
                this.$editorElm.find('option').each(function (i, $e) {
                    $e.selected = (currentStringValues_1.indexOf($e.value) !== -1);
                });
            }
        };
        SelectEditor.prototype.loadSingleValue = function (currentValue) {
            // keep the default value in memory for references
            this.defaultValue = currentValue;
            // make sure the prop exists first
            this.$editorElm.find('option').each(function (i, $e) {
                // check equality after converting defaultValue to string since the DOM value will always be of type string
                $e.selected = (currentValue.toString() === $e.value);
            });
        };
        SelectEditor.prototype.serializeValue = function () {
            return (this.isMultipleSelect) ? this.currentValues : this.currentValue;
        };
        SelectEditor.prototype.focus = function () {
            if (this.$editorElm && this.$editorElm.multipleSelect) {
                this.$editorElm.multipleSelect('focus');
            }
        };
        SelectEditor.prototype.isValueChanged = function () {
            if (this.isMultipleSelect) {
                return !charArraysEqual(this.$editorElm.val(), this.defaultValue);
            }
            return this.$editorElm.val() !== this.defaultValue;
        };
        SelectEditor.prototype.validate = function (inputValue) {
            var isRequired = this.columnEditor.required;
            var elmValue = (inputValue !== undefined) ? inputValue : this.$editorElm && this.$editorElm.val && this.$editorElm.val();
            var errorMsg = this.columnEditor.errorMessage;
            if (this.validator) {
                var value = (inputValue !== undefined) ? inputValue : (this.isMultipleSelect ? this.currentValues : this.currentValue);
                return this.validator(value, this.args);
            }
            // by default the editor is almost always valid (except when it's required but not provided)
            if (isRequired && (elmValue === '' || (Array.isArray(elmValue) && elmValue.length === 0))) {
                return {
                    valid: false,
                    msg: errorMsg || Constants.VALIDATION_REQUIRED_FIELD
                };
            }
            return {
                valid: true,
                msg: null
            };
        };
        //
        // protected functions
        // ------------------
        /**
         * user might want to filter certain items of the collection
         * @param inputCollection
         * @return outputCollection filtered and/or sorted collection
         */
        SelectEditor.prototype.filterCollection = function (inputCollection) {
            var outputCollection = inputCollection;
            // user might want to filter certain items of the collection
            if (this.columnEditor && this.columnEditor.collectionFilterBy) {
                var filterBy = this.columnEditor.collectionFilterBy;
                var filterCollectionBy = this.columnEditor.collectionOptions && this.columnEditor.collectionOptions.filterResultAfterEachPass || null;
                outputCollection = this._collectionService.filterCollection(outputCollection, filterBy, filterCollectionBy);
            }
            return outputCollection;
        };
        /**
         * user might want to sort the collection in a certain way
         * @param inputCollection
         * @return outputCollection sorted collection
         */
        SelectEditor.prototype.sortCollection = function (inputCollection) {
            var outputCollection = inputCollection;
            // user might want to sort the collection
            if (this.columnDef.internalColumnEditor && this.columnDef.internalColumnEditor.collectionSortBy) {
                var sortBy = this.columnDef.internalColumnEditor.collectionSortBy;
                outputCollection = this._collectionService.sortCollection(this.columnDef, outputCollection, sortBy, this.enableTranslateLabel);
            }
            return outputCollection;
        };
        SelectEditor.prototype.renderDomElement = function (collection) {
            if (!Array.isArray(collection) && this.collectionOptions && this.collectionOptions.collectionInObjectProperty) {
                collection = getDescendantProperty(collection, this.collectionOptions.collectionInObjectProperty);
            }
            if (!Array.isArray(collection)) {
                throw new Error('The "collection" passed to the Select Editor is not a valid array');
            }
            // user can optionally add a blank entry at the beginning of the collection
            if (this.collectionOptions && this.collectionOptions.addBlankEntry) {
                collection.unshift(this.createBlankEntry());
            }
            var newCollection = collection || [];
            // user might want to filter and/or sort certain items of the collection
            newCollection = this.filterCollection(newCollection);
            newCollection = this.sortCollection(newCollection);
            // step 1, create HTML string template
            var editorTemplate = this.buildTemplateHtmlString(newCollection);
            // step 2, create the DOM Element of the editor
            // also subscribe to the onClose event
            this.createDomElement(editorTemplate);
        };
        SelectEditor.prototype.buildTemplateHtmlString = function (collection) {
            var _this = this;
            var options = '';
            var fieldId = this.columnDef && this.columnDef.id;
            var separatorBetweenLabels = this.collectionOptions && this.collectionOptions.separatorBetweenTextLabels || '';
            var isRenderHtmlEnabled = this.columnDef.internalColumnEditor.enableRenderHtml || false;
            var sanitizedOptions = this.gridOptions && this.gridOptions.sanitizeHtmlOptions || {};
            // collection could be an Array of Strings OR Objects
            if (collection.every(function (x) { return typeof x === 'string'; })) {
                collection.forEach(function (option) {
                    options += "<option value=\"" + option + "\" label=\"" + option + "\">" + option + "</option>";
                });
            }
            else {
                // array of objects will require a label/value pair unless a customStructure is passed
                collection.forEach(function (option) {
                    if (!option || (option[_this.labelName] === undefined && option.labelKey === undefined)) {
                        throw new Error("[select-editor] A collection with value/label (or value/labelKey when using Locale) is required to populate the Select list, for example: { collection: [ { value: '1', label: 'One' } ])");
                    }
                    var labelKey = (option.labelKey || option[_this.labelName]);
                    var labelText = ((option.labelKey || _this.enableTranslateLabel) && labelKey) ? _this._translate.instant(labelKey || ' ') : labelKey;
                    var prefixText = option[_this.labelPrefixName] || '';
                    var suffixText = option[_this.labelSuffixName] || '';
                    var optionLabel = option[_this.optionLabel] || '';
                    optionLabel = optionLabel.toString().replace(/\"/g, '\''); // replace double quotes by single quotes to avoid interfering with regular html
                    // also translate prefix/suffix if enableTranslateLabel is true and text is a string
                    prefixText = (_this.enableTranslateLabel && prefixText && typeof prefixText === 'string') ? _this._translate.instant(prefixText || ' ') : prefixText;
                    suffixText = (_this.enableTranslateLabel && suffixText && typeof suffixText === 'string') ? _this._translate.instant(suffixText || ' ') : suffixText;
                    optionLabel = (_this.enableTranslateLabel && optionLabel && typeof optionLabel === 'string') ? _this._translate.instant(optionLabel || ' ') : optionLabel;
                    // add to a temp array for joining purpose and filter out empty text
                    var tmpOptionArray = [prefixText, labelText, suffixText].filter(function (text) { return text; });
                    var optionText = tmpOptionArray.join(separatorBetweenLabels);
                    // if user specifically wants to render html text, he needs to opt-in else it will stripped out by default
                    // also, the 3rd party lib will saninitze any html code unless it's encoded, so we'll do that
                    if (isRenderHtmlEnabled) {
                        // sanitize any unauthorized html tags like script and others
                        // for the remaining allowed tags we'll permit all attributes
                        var sanitizedText = DOMPurify$2.sanitize(optionText, sanitizedOptions);
                        optionText = htmlEncode(sanitizedText);
                    }
                    options += "<option value=\"" + option[_this.valueName] + "\" label=\"" + optionLabel + "\">" + optionText + "</option>";
                });
            }
            return "<select id=\"" + this.elementName + "\" class=\"ms-filter search-filter editor-" + fieldId + "\" " + (this.isMultipleSelect ? 'multiple="multiple"' : '') + ">" + options + "</select>";
        };
        /** Create a blank entry that can be added to the collection. It will also reuse the same customStructure if need be */
        SelectEditor.prototype.createBlankEntry = function () {
            var _a;
            var blankEntry = (_a = {},
                _a[this.labelName] = '',
                _a[this.valueName] = '',
                _a);
            if (this.labelPrefixName) {
                blankEntry[this.labelPrefixName] = '';
            }
            if (this.labelSuffixName) {
                blankEntry[this.labelSuffixName] = '';
            }
            return blankEntry;
        };
        /** Build the template HTML string */
        SelectEditor.prototype.createDomElement = function (editorTemplate) {
            var _this = this;
            this.$editorElm = $(editorTemplate);
            if (this.$editorElm && typeof this.$editorElm.appendTo === 'function') {
                this.$editorElm.appendTo(this.args.container);
            }
            if (typeof this.$editorElm.multipleSelect !== 'function') {
                // fallback to bootstrap
                this.$editorElm.addClass('form-control');
            }
            else {
                var elementOptions = (this.columnDef.internalColumnEditor) ? this.columnDef.internalColumnEditor.elementOptions : {};
                this.editorElmOptions = __assign({}, this.defaultOptions, elementOptions);
                this.$editorElm = this.$editorElm.multipleSelect(this.editorElmOptions);
                setTimeout(function () {
                    if (_this.$editorElm && typeof _this.$editorElm.multipleSelect === 'function') {
                        _this.$editorElm.multipleSelect('open');
                    }
                });
            }
        };
        // refresh the jquery object because the selected checkboxes were already set
        // prior to this method being called
        SelectEditor.prototype.refresh = function () {
            if (typeof this.$editorElm.multipleSelect === 'function') {
                this.$editorElm.multipleSelect('refresh');
            }
        };
        return SelectEditor;
    }());

    var MultipleSelectEditor = /** @class */ (function (_super) {
        __extends(MultipleSelectEditor, _super);
        /**
         * Initialize the Editor
         */
        function MultipleSelectEditor(args) {
            var _this = _super.call(this, args, true) || this;
            _this.args = args;
            return _this;
        }
        return MultipleSelectEditor;
    }(SelectEditor));

    var SingleSelectEditor = /** @class */ (function (_super) {
        __extends(SingleSelectEditor, _super);
        /**
         * Initialize the Editor
         */
        function SingleSelectEditor(args) {
            var _this = _super.call(this, args, false) || this;
            _this.args = args;
            return _this;
        }
        return SingleSelectEditor;
    }(SelectEditor));

    var DEFAULT_MIN_VALUE$2 = 0;
    var DEFAULT_MAX_VALUE$2 = 100;
    var DEFAULT_STEP$2 = 1;
    var SliderEditor = /** @class */ (function () {
        function SliderEditor(args) {
            this.args = args;
            this.init();
        }
        Object.defineProperty(SliderEditor.prototype, "columnDef", {
            /** Get Column Definition object */
            get: function () {
                return this.args && this.args.column || {};
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SliderEditor.prototype, "columnEditor", {
            /** Get Column Editor object */
            get: function () {
                return this.columnDef && this.columnDef.internalColumnEditor || {};
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SliderEditor.prototype, "editorParams", {
            /** Getter for the Editor Generic Params */
            get: function () {
                return this.columnEditor.params || {};
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SliderEditor.prototype, "validator", {
            /** Get the Validator function, can be passed in Editor property or Column Definition */
            get: function () {
                return this.columnEditor.validator || this.columnDef.validator;
            },
            enumerable: true,
            configurable: true
        });
        SliderEditor.prototype.init = function () {
            var _this = this;
            var container = this.args && this.args.container;
            // define the input & slider number IDs
            var itemId = this.args && this.args.item && this.args.item.id;
            this._elementRangeInputId = "rangeInput_" + this.columnDef.field + "_" + itemId;
            this._elementRangeOutputId = "rangeOutput_" + this.columnDef.field + "_" + itemId;
            // create HTML string template
            var editorTemplate = this.buildTemplateHtmlString();
            this.$editorElm = $(editorTemplate);
            this.$input = this.$editorElm.children('input');
            this.$sliderNumber = this.$editorElm.children('div.input-group-addon.input-group-append').children();
            // watch on change event
            this.$editorElm
                .appendTo(container)
                .on('mouseup', function () { return _this.save(); });
            // if user chose to display the slider number on the right side, then update it every time it changes
            // we need to use both "input" and "change" event to be all cross-browser
            if (!this.editorParams.hideSliderNumber) {
                this.$editorElm.on('input change', function (event) {
                    _this._lastInputEvent = event;
                    var value = event && event.target && event.target.value || '';
                    if (value) {
                        document.getElementById(_this._elementRangeOutputId).innerHTML = event.target.value;
                    }
                });
            }
        };
        SliderEditor.prototype.destroy = function () {
            this.$editorElm.off('input change mouseup').remove();
        };
        SliderEditor.prototype.focus = function () {
            this.$editorElm.focus();
        };
        SliderEditor.prototype.save = function () {
            var validation = this.validate();
            if (validation && validation.valid) {
                if (this.args.grid.getOptions().autoCommitEdit) {
                    this.args.grid.getEditorLock().commitCurrentEdit();
                }
                else {
                    this.args.commitChanges();
                }
            }
        };
        SliderEditor.prototype.cancel = function () {
            this.$input.val(this.defaultValue);
            this.args.cancelChanges();
        };
        SliderEditor.prototype.loadValue = function (item) {
            var fieldName = this.columnDef && this.columnDef.field;
            // when it's a complex object, then pull the object name only, e.g.: "user.firstName" => "user"
            var fieldNameFromComplexObject = fieldName.indexOf('.') ? fieldName.substring(0, fieldName.indexOf('.')) : '';
            if (item && this.columnDef && (item.hasOwnProperty(fieldName) || item.hasOwnProperty(fieldNameFromComplexObject))) {
                this.defaultValue = item[fieldNameFromComplexObject || fieldName];
                this.$input.val(this.defaultValue);
                this.$input[0].defaultValue = this.defaultValue;
                this.$sliderNumber.html(this.defaultValue);
            }
        };
        SliderEditor.prototype.serializeValue = function () {
            return parseInt(this.$input.val(), 10) || 0;
        };
        SliderEditor.prototype.applyValue = function (item, state) {
            var fieldName = this.columnDef && this.columnDef.field;
            // when it's a complex object, then pull the object name only, e.g.: "user.firstName" => "user"
            var fieldNameFromComplexObject = fieldName.indexOf('.') ? fieldName.substring(0, fieldName.indexOf('.')) : '';
            var validation = this.validate(state);
            item[fieldNameFromComplexObject || fieldName] = (validation && validation.valid) ? state : '';
        };
        SliderEditor.prototype.isValueChanged = function () {
            var elmValue = this.$input.val();
            var lastEvent = this._lastInputEvent && this._lastInputEvent.keyCode;
            if (this.columnEditor && this.columnEditor.alwaysSaveOnEnterKey && lastEvent === exports.KeyCode.ENTER) {
                return true;
            }
            return (!(elmValue === '' && this.defaultValue === null)) && (elmValue !== this.defaultValue);
        };
        SliderEditor.prototype.validate = function (inputValue) {
            var elmValue = (inputValue !== undefined) ? inputValue : this.$input && this.$input.val && this.$input.val();
            var isRequired = this.columnEditor.required;
            var minValue = this.columnEditor.minValue;
            var maxValue = this.columnEditor.maxValue;
            var errorMsg = this.columnEditor.errorMessage;
            var mapValidation = {
                '{{minValue}}': minValue,
                '{{maxValue}}': maxValue
            };
            if (this.validator) {
                return this.validator(elmValue, this.args);
            }
            else if (isRequired && elmValue === '') {
                return {
                    valid: false,
                    msg: errorMsg || Constants.VALIDATION_REQUIRED_FIELD
                };
            }
            else if (minValue !== undefined && (elmValue < minValue || elmValue > maxValue)) {
                // when decimal value is bigger than 0, we only accept the decimal values as that value set
                // for example if we set decimalPlaces to 2, we will only accept numbers between 0 and 2 decimals
                return {
                    valid: false,
                    msg: errorMsg || Constants.VALIDATION_EDITOR_NUMBER_BETWEEN.replace(/{{minValue}}|{{maxValue}}/gi, function (matched) {
                        return mapValidation[matched];
                    })
                };
            }
            return {
                valid: true,
                msg: null
            };
        };
        //
        // private functions
        // ------------------
        /**
         * Create the HTML template as a string
         */
        SliderEditor.prototype.buildTemplateHtmlString = function () {
            var fieldId = this.columnDef && this.columnDef.id;
            var title = this.columnEditor && this.columnEditor.title || '';
            var minValue = this.columnEditor.hasOwnProperty('minValue') ? this.columnEditor.minValue : DEFAULT_MIN_VALUE$2;
            var maxValue = this.columnEditor.hasOwnProperty('maxValue') ? this.columnEditor.maxValue : DEFAULT_MAX_VALUE$2;
            var defaultValue = this.editorParams.hasOwnProperty('sliderStartValue') ? this.editorParams.sliderStartValue : minValue;
            var step = this.columnEditor.hasOwnProperty('valueStep') ? this.columnEditor.valueStep : DEFAULT_STEP$2;
            if (this.editorParams.hideSliderNumber) {
                return "\n      <div class=\"slider-editor\">\n        <input type=\"range\" id=\"" + this._elementRangeInputId + "\"\n          name=\"" + this._elementRangeInputId + "\"\n          title=\"" + title + "\"\n          defaultValue=\"" + defaultValue + "\" min=\"" + minValue + "\" max=\"" + maxValue + "\" step=\"" + step + "\"\n          class=\"form-control slider-editor-input editor-" + fieldId + " range\" />\n      </div>";
            }
            return "\n      <div class=\"input-group slider-editor\">\n        <input type=\"range\" id=\"" + this._elementRangeInputId + "\"\n          name=\"" + this._elementRangeInputId + "\"\n          title=\"" + title + "\"\n          defaultValue=\"" + defaultValue + "\" min=\"" + minValue + "\" max=\"" + maxValue + "\" step=\"" + step + "\"\n          class=\"form-control slider-editor-input editor-" + fieldId + " range\" />\n        <div class=\"input-group-addon input-group-append slider-value\"><span class=\"input-group-text\" id=\"" + this._elementRangeOutputId + "\">" + defaultValue + "</span></div>\n      </div>";
        };
        return SliderEditor;
    }());

    /*
     * An example of a 'detached' editor.
     * KeyDown events are also handled to provide handling for Tab, Shift-Tab, Esc and Ctrl-Enter.
     */
    var TextEditor = /** @class */ (function () {
        function TextEditor(args) {
            this.args = args;
            this.init();
        }
        Object.defineProperty(TextEditor.prototype, "columnDef", {
            /** Get Column Definition object */
            get: function () {
                return this.args && this.args.column || {};
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextEditor.prototype, "columnEditor", {
            /** Get Column Editor object */
            get: function () {
                return this.columnDef && this.columnDef.internalColumnEditor && this.columnDef.internalColumnEditor || {};
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextEditor.prototype, "hasAutoCommitEdit", {
            get: function () {
                return this.args.grid.getOptions().autoCommitEdit;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextEditor.prototype, "validator", {
            /** Get the Validator function, can be passed in Editor property or Column Definition */
            get: function () {
                return this.columnEditor.validator || this.columnDef.validator;
            },
            enumerable: true,
            configurable: true
        });
        TextEditor.prototype.init = function () {
            var _this = this;
            var columnId = this.columnDef && this.columnDef.id;
            var placeholder = this.columnEditor && this.columnEditor.placeholder || '';
            var title = this.columnEditor && this.columnEditor.title || '';
            this.$input = $("<input type=\"text\" role=\"presentation\"  autocomplete=\"off\" class=\"editor-text editor-" + columnId + "\" placeholder=\"" + placeholder + "\" title=\"" + title + "\" />")
                .appendTo(this.args.container)
                .on('keydown.nav', function (event) {
                _this._lastInputEvent = event;
                if (event.keyCode === exports.KeyCode.LEFT || event.keyCode === exports.KeyCode.RIGHT) {
                    event.stopImmediatePropagation();
                }
            });
            // the lib does not get the focus out event for some reason
            // so register it here
            if (this.hasAutoCommitEdit) {
                this.$input.on('focusout', function () { return _this.save(); });
            }
            setTimeout(function () {
                _this.$input.focus().select();
            }, 50);
        };
        TextEditor.prototype.destroy = function () {
            this.$input.off('keydown.nav focusout').remove();
        };
        TextEditor.prototype.focus = function () {
            this.$input.focus();
        };
        TextEditor.prototype.getValue = function () {
            return this.$input.val();
        };
        TextEditor.prototype.setValue = function (val) {
            this.$input.val(val);
        };
        TextEditor.prototype.loadValue = function (item) {
            var fieldName = this.columnDef && this.columnDef.field;
            // when it's a complex object, then pull the object name only, e.g.: "user.firstName" => "user"
            var fieldNameFromComplexObject = fieldName.indexOf('.') ? fieldName.substring(0, fieldName.indexOf('.')) : '';
            if (item && this.columnDef && (item.hasOwnProperty(fieldName) || item.hasOwnProperty(fieldNameFromComplexObject))) {
                this.defaultValue = item[fieldNameFromComplexObject || fieldName] || '';
                this.$input.val(this.defaultValue);
                this.$input[0].defaultValue = this.defaultValue;
                this.$input.select();
            }
        };
        TextEditor.prototype.serializeValue = function () {
            return this.$input.val();
        };
        TextEditor.prototype.applyValue = function (item, state) {
            var fieldName = this.columnDef && this.columnDef.field;
            // when it's a complex object, then pull the object name only, e.g.: "user.firstName" => "user"
            var fieldNameFromComplexObject = fieldName.indexOf('.') ? fieldName.substring(0, fieldName.indexOf('.')) : '';
            var validation = this.validate(state);
            item[fieldNameFromComplexObject || fieldName] = (validation && validation.valid) ? state : '';
        };
        TextEditor.prototype.isValueChanged = function () {
            var lastEvent = this._lastInputEvent && this._lastInputEvent.keyCode;
            if (this.columnEditor && this.columnEditor.alwaysSaveOnEnterKey && lastEvent === exports.KeyCode.ENTER) {
                return true;
            }
            return (!(this.$input.val() === '' && this.defaultValue === null)) && (this.$input.val() !== this.defaultValue);
        };
        TextEditor.prototype.save = function () {
            var validation = this.validate();
            if (validation && validation.valid) {
                if (this.hasAutoCommitEdit) {
                    this.args.grid.getEditorLock().commitCurrentEdit();
                }
                else {
                    this.args.commitChanges();
                }
            }
        };
        TextEditor.prototype.validate = function (inputValue) {
            var isRequired = this.columnEditor.required;
            var elmValue = (inputValue !== undefined) ? inputValue : this.$input && this.$input.val && this.$input.val();
            var errorMsg = this.columnEditor.errorMessage;
            if (this.validator) {
                var value = this.$input && this.$input.val && this.$input.val();
                return this.validator(value, this.args);
            }
            // by default the editor is almost always valid (except when it's required but not provided)
            if (isRequired && elmValue === '') {
                return {
                    valid: false,
                    msg: errorMsg || Constants.VALIDATION_REQUIRED_FIELD
                };
            }
            return {
                valid: true,
                msg: null
            };
        };
        return TextEditor;
    }());

    var Editors = {
        /** AutoComplete Editor (using jQuery UI autocomplete feature) */
        autoComplete: AutoCompleteEditor,
        /** Checkbox Editor (uses native checkbox DOM element) */
        checkbox: CheckboxEditor,
        /** Date Picker Editor (which uses 3rd party lib "flatpickr") */
        date: DateEditor,
        /** Float Number Editor */
        float: FloatEditor,
        /** Integer Editor */
        integer: IntegerEditor,
        /** Long Text Editor (uses a textarea) */
        longText: LongTextEditor,
        /** Multiple Select editor (which uses 3rd party lib "multiple-select.js") */
        multipleSelect: MultipleSelectEditor,
        /** Single Select editor (which uses 3rd party lib "multiple-select.js") */
        singleSelect: SingleSelectEditor,
        /** Slider Editor */
        slider: SliderEditor,
        /** Text Editor */
        text: TextEditor
    };

    var moment$b = moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
    /**
     * Find the option value from the following (in order of execution)
     * 1- Column Definition "params"
     * 2- Grid Options "formatterOptions"
     * 3- nothing found, return default value provided
     */
    function getValueFromParamsOrGridOptions(optionName, columnDef, grid, defaultValue) {
        var gridOptions = ((grid && typeof grid.getOptions === 'function') ? grid.getOptions() : {});
        var params = columnDef && columnDef.params;
        if (params && params.hasOwnProperty(optionName)) {
            return params[optionName];
        }
        else if (gridOptions.formatterOptions && gridOptions.formatterOptions.hasOwnProperty(optionName)) {
            return gridOptions.formatterOptions[optionName];
        }
        return defaultValue;
    }
    /** From a FieldType, return the associated date Formatter */
    function getAssociatedDateFormatter(fieldType, defaultSeparator) {
        var defaultDateFormat = mapMomentDateFormatWithFieldType(fieldType);
        return function (row, cell, value, columnDef, dataContext, grid) {
            var gridOptions = ((grid && typeof grid.getOptions === 'function') ? grid.getOptions() : {});
            var customSeparator = gridOptions && gridOptions.formatterOptions && gridOptions.formatterOptions.dateSeparator || defaultSeparator;
            var isDateValid = moment$b(value, defaultDateFormat, false).isValid();
            var outputDate = (value && isDateValid) ? moment$b(value).format(defaultDateFormat) : value;
            // user can customize the separator through the "formatterOptions"
            // if that is the case we need to replace the default "/" to the new separator
            if (outputDate && customSeparator !== defaultSeparator) {
                var regex = new RegExp(defaultSeparator, 'ig'); // find separator globally
                outputDate = outputDate.replace(regex, customSeparator);
            }
            return outputDate;
        };
    }

    var arrayObjectToCsvFormatter = function (row, cell, value, columnDef, dataContext) {
        var columnParams = columnDef && columnDef.params || {};
        var propertyNames = columnParams.propertyNames;
        var parentObjectKeyName = columnParams.dataContextProperty;
        if (!parentObjectKeyName) {
            parentObjectKeyName = columnDef && columnDef.field && columnDef.field.split('.')[0]; // e.g. "users.roles" would be "users"
        }
        if (!propertyNames || !Array.isArray(propertyNames) || !parentObjectKeyName) {
            throw new Error("Formatters.arrayObjectToCsv requires you to pass an array of \"propertyNames\" (declared in \"params\") that you want to pull the data from.\n      For example, if we have an array of user objects that have the property of firstName & lastName then we need to pass in your column definition:: { params: { propertyNames: ['firtName'] }}.\n      Optionally, you can also pass the \"dataContextProperty\" if you wish to run this on another completely different field of the dataContext object.");
        }
        // the dataContext holds all the data, so we can find the values we want even when "value" argument might be null
        // e.g. if we want to use the propertyNames of ['firstName', 'lastName'] from the "users" array of objects
        if (dataContext[parentObjectKeyName] && Array.isArray(dataContext[parentObjectKeyName])) {
            // we will 1st get the object from the dataContext, then
            if (Array.isArray(dataContext[parentObjectKeyName]) && dataContext[parentObjectKeyName].length > 0) {
                var outputStrings_1 = [];
                dataContext[parentObjectKeyName].forEach(function (data) {
                    var strings = [];
                    // 2nd from that data loop through all propertyNames we want to use (e.g.: ['firstName', 'lastName'])
                    propertyNames.forEach(function (prop) {
                        strings.push(data[prop]);
                    });
                    // we will join these strings with spaces (e.g. 'John Doe' where 'John' was firstName and 'Doe' was lastName)
                    outputStrings_1.push(strings.join(' '));
                });
                // finally join all the output strings by CSV (e.g.: 'John Doe, Jane Doe')
                var output = outputStrings_1.join(', ');
                return "<span title=\"" + output + "\">" + output + "</span>";
            }
        }
        return value;
    };

    var arrayToCsvFormatter = function (row, cell, value, columnDef, dataContext) {
        if (value && Array.isArray(value) && value.length > 0) {
            var values = value.join(', ');
            return "<span title=\"" + values + "\">" + values + "</span>";
        }
        return value;
    };

    var boldFormatter = function (row, cell, value, columnDef, dataContext) {
        return value ? "<b>" + value + "</b>" : '';
    };

    var checkboxFormatter = function (row, cell, value, columnDef, dataContext) {
        return value ? '&#x2611;' : '';
    };

    var checkmarkFormatter = function (row, cell, value, columnDef, dataContext) {
        return parseBoolean(value) ? "<i class=\"fa fa-check checkmark-icon\" aria-hidden=\"true\"></i>" : '';
    };

    /**
     * A formatter to show the label property value of a params collection
     */
    var collectionFormatter = function (row, cell, value, columnDef, dataContext) {
        if (!value || !columnDef || !columnDef.params || !columnDef.params.collection
            || !columnDef.params.collection.length) {
            return value;
        }
        var params = columnDef.params, collection = columnDef.params.collection;
        var labelName = (params.customStructure) ? params.customStructure.label : 'label';
        var valueName = (params.customStructure) ? params.customStructure.value : 'value';
        if (Array.isArray(value)) {
            return arrayToCsvFormatter(row, cell, value.map(function (v) { return findOrDefault(collection, function (c) { return c[valueName] === v; })[labelName]; }), columnDef, dataContext);
        }
        return findOrDefault(collection, function (c) { return c[valueName] === value; })[labelName] || '';
    };

    /**
     * A formatter to show the label property value of an editor collection
     */
    var collectionEditorFormatter = function (row, cell, value, columnDef, dataContext) {
        if (!value || !columnDef || !columnDef.internalColumnEditor || !columnDef.internalColumnEditor.collection
            || !columnDef.internalColumnEditor.collection.length) {
            return value;
        }
        var internalColumnEditor = columnDef.internalColumnEditor, collection = columnDef.internalColumnEditor.collection;
        var labelName = (internalColumnEditor.customStructure) ? internalColumnEditor.customStructure.label : 'label';
        var valueName = (internalColumnEditor.customStructure) ? internalColumnEditor.customStructure.value : 'value';
        if (Array.isArray(value)) {
            if (collection.every(function (x) { return typeof x === 'string'; })) {
                return arrayToCsvFormatter(row, cell, value.map(function (v) { return findOrDefault(collection, function (c) { return c === v; }); }), columnDef, dataContext);
            }
            else {
                return arrayToCsvFormatter(row, cell, value.map(function (v) { return findOrDefault(collection, function (c) { return c[valueName] === v; })[labelName]; }), columnDef, dataContext);
            }
        }
        return findOrDefault(collection, function (c) { return c[valueName] === value; })[labelName] || '';
    };

    var complexObjectFormatter = function (row, cell, cellValue, columnDef, dataContext) {
        if (!columnDef) {
            return '';
        }
        var columnParams = columnDef.params || {};
        var complexFieldLabel = columnParams && columnParams.complexFieldLabel || columnDef.field;
        if (!complexFieldLabel) {
            throw new Error("For the Formatters.complexObject to work properly, you need to tell it which property of the complex object to use.\n      There are 3 ways to provide it:\n      1- via the generic \"params\" with a \"complexFieldLabel\" property on your Column Definition, example: this.columnDefs = [{ id: 'user', field: 'user', params: { complexFieldLabel: 'user.firstName' } }]\n      2- via the generic \"params\" with a \"complexFieldLabel\" and a \"labelKey\" property on your Column Definition, example: this.columnDefs = [{ id: 'user', field: 'user', labelKey: 'firstName' params: { complexFieldLabel: 'user' } }]\n      3- via the field name that includes a dot notation, example: this.columnDefs = [{ id: 'user', field: 'user.firstName'}] ");
        }
        if (columnDef.labelKey && dataContext.hasOwnProperty(complexFieldLabel)) {
            return dataContext[complexFieldLabel] && dataContext[complexFieldLabel][columnDef.labelKey];
        }
        // when complexFieldLabel includes the dot ".", we will do the split and get the value from the complex object
        // however we also need to make sure that the complex objet exist, else we'll return the cell value (original value)
        if (typeof complexFieldLabel === 'string' && complexFieldLabel.indexOf('.') > 0) {
            return complexFieldLabel.split('.').reduce(function (obj, i) { return (obj && obj.hasOwnProperty(i) ? obj[i] : cellValue); }, dataContext);
        }
        return cellValue;
    };

    var decimalFormatter = function (row, cell, value, columnDef, dataContext, grid) {
        var isNumber = (value === null || value === undefined || value === '') ? false : !isNaN(+value);
        var params = columnDef.params || {};
        var minDecimal = getValueFromParamsOrGridOptions('minDecimal', columnDef, grid, 2);
        var maxDecimal = getValueFromParamsOrGridOptions('maxDecimal', columnDef, grid, 2);
        var displayNegativeNumberWithParentheses = getValueFromParamsOrGridOptions('displayNegativeNumberWithParentheses', columnDef, grid, false);
        // @deprecated: decimalPlaces, minDecimalPlaces, maxDecimalPlaces
        // add these extra checks to support previous way of passing the decimal count
        if ((params.minDecimalPlaces !== null && params.minDecimalPlaces) || (params.decimalPlaces !== null && params.decimalPlaces)) {
            minDecimal = (params.minDecimalPlaces !== null && params.minDecimalPlaces) || (params.decimalPlaces !== null && params.decimalPlaces);
        }
        if (params.maxDecimalPlaces !== null && params.maxDecimalPlaces) {
            maxDecimal = (params.maxDecimalPlaces !== null && params.maxDecimalPlaces);
        }
        if (isNumber) {
            return formatNumber(value, minDecimal, maxDecimal, displayNegativeNumberWithParentheses);
        }
        return value;
    };

    var deleteIconFormatter = function (row, cell, value, columnDef, dataContext) {
        return "<i class=\"fa fa-trash pointer delete-icon\" aria-hidden=\"true\"></i>";
    };

    var dollarColoredBoldFormatter = function (row, cell, value, columnDef, dataContext, grid) {
        var isNumber = (value === null || value === undefined || value === '') ? false : !isNaN(+value);
        var minDecimal = getValueFromParamsOrGridOptions('minDecimal', columnDef, grid, 2);
        var maxDecimal = getValueFromParamsOrGridOptions('maxDecimal', columnDef, grid, 4);
        var displayNegativeNumberWithParentheses = getValueFromParamsOrGridOptions('displayNegativeNumberWithParentheses', columnDef, grid, false);
        if (isNumber) {
            var colorStyle = (value >= 0) ? 'green' : 'red';
            var formattedNumber = formatNumber(value, minDecimal, maxDecimal, displayNegativeNumberWithParentheses, '$');
            return "<span style=\"color:" + colorStyle + "; font-weight:bold;\">" + formattedNumber + "</span>";
        }
        return value;
    };

    var dollarColoredFormatter = function (row, cell, value, columnDef, dataContext, grid) {
        var isNumber = (value === null || value === undefined || value === '') ? false : !isNaN(+value);
        var minDecimal = getValueFromParamsOrGridOptions('minDecimal', columnDef, grid, 2);
        var maxDecimal = getValueFromParamsOrGridOptions('maxDecimal', columnDef, grid, 4);
        var displayNegativeNumberWithParentheses = getValueFromParamsOrGridOptions('displayNegativeNumberWithParentheses', columnDef, grid, false);
        if (isNumber) {
            var colorStyle = (value >= 0) ? 'green' : 'red';
            var formattedNumber = formatNumber(value, minDecimal, maxDecimal, displayNegativeNumberWithParentheses, '$');
            return "<span style=\"color:" + colorStyle + "\">" + formattedNumber + "</span>";
        }
        return value;
    };

    var dollarFormatter = function (row, cell, value, columnDef, dataContext, grid) {
        var isNumber = (value === null || value === undefined || value === '') ? false : !isNaN(+value);
        var minDecimal = getValueFromParamsOrGridOptions('minDecimal', columnDef, grid, 2);
        var maxDecimal = getValueFromParamsOrGridOptions('maxDecimal', columnDef, grid, 4);
        var displayNegativeNumberWithParentheses = getValueFromParamsOrGridOptions('displayNegativeNumberWithParentheses', columnDef, grid, false);
        if (isNumber) {
            return formatNumber(value, minDecimal, maxDecimal, displayNegativeNumberWithParentheses, '$');
        }
        return value;
    };

    var editIconFormatter = function (row, cell, value, columnDef, dataContext) {
        return "<i class=\"fa fa-pencil pointer edit-icon\" aria-hidden=\"true\"></i>";
    };

    var DOMPurify$3 = DOMPurify_; // patch to fix rollup to work
    /**
     * Takes an hyperlink cell value and transforms it into a real hyperlink, given that the value starts with 1 of these (http|ftp|https).
     * The structure will be "<a href="hyperlink">hyperlink</a>"
     *
     * You can optionally change the hyperlink text displayed by using the generic params "hyperlinkText" in the column definition
     * For example: { id: 'link', field: 'link', params: { hyperlinkText: 'Company Website' } } will display "<a href="link">Company Website</a>"
     *
     * You can also optionally provide the hyperlink URL by using the generic params "hyperlinkUrl" in the column definition
     * For example: { id: 'link', field: 'link', params: {  hyperlinkText: 'Company Website', hyperlinkUrl: 'http://www.somewhere.com' } } will display "<a href="http://www.somewhere.com">Company Website</a>"
     */
    var hyperlinkFormatter = function (row, cell, value, columnDef, dataContext) {
        var columnParams = columnDef && columnDef.params || {};
        var displayedText = columnParams.hyperlinkText ? columnParams.hyperlinkText : value;
        displayedText = DOMPurify$3.sanitize(displayedText || '');
        var outputLink = columnParams.hyperlinkUrl ? columnParams.hyperlinkUrl : value;
        outputLink = DOMPurify$3.sanitize(outputLink || '');
        var matchUrl = outputLink.match(/^(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:\/~\+#]*[\w\-\@?^=%&amp;\/~\+#])?/i);
        if (matchUrl && Array.isArray(matchUrl) && matchUrl.length > 0) {
            var finalUrl = matchUrl[0];
            return "<a href=\"" + finalUrl + "\">" + displayedText + "</a>";
        }
        return value;
    };

    var iconFormatter = function (row, cell, value, columnDef, dataContext) {
        var columnParams = columnDef && columnDef.params || {};
        var icon = columnParams.icon || columnParams.formatterIcon;
        if (!icon) {
            throw new Error("You must provide the \"icon\" or \"formatterIcon\" via the generic \"params\" options (e.g.: { formatter: Formatters.icon, params: { formatterIcon: 'fa fa-search' }}");
        }
        return "<i class=\"" + icon + "\" aria-hidden=\"true\"></i>";
    };

    var infoIconFormatter = function (row, cell, value, columnDef, dataContext) {
        return "<i class=\"fa fa-info-circle pointer info-icon\" aria-hidden=\"true\"></i>";
    };

    var italicFormatter = function (row, cell, value, columnDef, dataContext) {
        return value ? "<i>" + value + "</i>" : '';
    };

    var lowercaseFormatter = function (row, cell, value, columnDef, dataContext) {
        // make sure the value is a string
        if (value !== undefined && typeof value !== 'string') {
            value = value + '';
        }
        return value ? value.toLowerCase() : '';
    };

    /**
     * Takes a value display it according to a mask provided
     * e.: 1234567890 with mask "(000) 000-0000" will display "(123) 456-7890"
     */
    var maskFormatter = function (row, cell, value, columnDef, dataContext) {
        var params = columnDef.params || {};
        var mask = params.mask;
        if (!mask) {
            throw new Error("You must provide a \"mask\" via the generic \"params\" options (e.g.: { formatter: Formatters.mask, params: { mask: '000-000' }}");
        }
        if (value) {
            var i_1 = 0;
            var v_1 = value.toString();
            return mask.replace(/[09A]/gi, function () { return v_1[i_1++] || ''; });
        }
        return value;
    };

    var multipleFormatter = function (row, cell, value, columnDef, dataContext, grid) {
        var e_1, _a;
        var params = columnDef.params || {};
        if (!params.formatters || !Array.isArray(params.formatters)) {
            throw new Error("The multiple formatter requires the \"formatters\" to be provided as a column params.\n    For example: this.columnDefinitions = [{ id: title, field: title, formatter: Formatters.multiple, params: { formatters: [Formatters.lowercase, Formatters.uppercase] }");
        }
        var formatters = params.formatters;
        // loop through all Formatters, the value of 1st formatter will be used by 2nd formatter and so on.
        // they are piped and executed in sequences
        var currentValue = value;
        try {
            for (var formatters_1 = __values(formatters), formatters_1_1 = formatters_1.next(); !formatters_1_1.done; formatters_1_1 = formatters_1.next()) {
                var formatter = formatters_1_1.value;
                currentValue = formatter(row, cell, currentValue, columnDef, dataContext, grid);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (formatters_1_1 && !formatters_1_1.done && (_a = formatters_1.return)) _a.call(formatters_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return currentValue;
    };

    var percentFormatter = function (row, cell, value, columnDef, dataContext, grid) {
        var isNumber = (value === null || value === undefined || value === '') ? false : !isNaN(+value);
        var minDecimal = getValueFromParamsOrGridOptions('minDecimal', columnDef, grid);
        var maxDecimal = getValueFromParamsOrGridOptions('maxDecimal', columnDef, grid);
        var displayNegativeNumberWithParentheses = getValueFromParamsOrGridOptions('displayNegativeNumberWithParentheses', columnDef, grid, false);
        if (isNumber) {
            var percentValue = value * 100;
            return formatNumber(percentValue, minDecimal, maxDecimal, displayNegativeNumberWithParentheses, '', '%');
        }
        return value;
    };

    var percentCompleteBarFormatter = function (row, cell, value, columnDef, dataContext) {
        var isNumber = (value === null || value === undefined || value === '') ? false : !isNaN(+value);
        if (!isNumber) {
            return '';
        }
        var color = '';
        var inputNumber = parseFloat(value);
        if (inputNumber > 100) {
            inputNumber = 100;
        }
        if (inputNumber < 30) {
            color = 'red';
        }
        else if (inputNumber < 70) {
            color = 'silver';
        }
        else {
            color = 'green';
        }
        return "<span class=\"percent-complete-bar\" style=\"background:" + color + "; width:" + inputNumber + "%\"></span>";
    };

    var percentCompleteFormatter = function (row, cell, value, columnDef, dataContext, grid) {
        var isNumber = (value === null || value === undefined || value === '') ? false : !isNaN(+value);
        var minDecimal = getValueFromParamsOrGridOptions('minDecimal', columnDef, grid);
        var maxDecimal = getValueFromParamsOrGridOptions('maxDecimal', columnDef, grid);
        var displayNegativeNumberWithParentheses = getValueFromParamsOrGridOptions('displayNegativeNumberWithParentheses', columnDef, grid, false);
        if (isNumber) {
            var colorStyle = (value < 50) ? 'red' : 'green';
            var formattedNumber = formatNumber(value, minDecimal, maxDecimal, displayNegativeNumberWithParentheses, '', '%');
            var outputFormattedValue = value > 100 ? '100%' : formattedNumber;
            return "<span style='color:" + colorStyle + "'>" + outputFormattedValue + "</span>";
        }
        return value;
    };

    var percentSymbolFormatter = function (row, cell, value, columnDef, dataContext, grid) {
        var isNumber = (value === null || value === undefined || value === '') ? false : !isNaN(+value);
        var minDecimal = getValueFromParamsOrGridOptions('minDecimal', columnDef, grid);
        var maxDecimal = getValueFromParamsOrGridOptions('maxDecimal', columnDef, grid);
        var displayNegativeNumberWithParentheses = getValueFromParamsOrGridOptions('displayNegativeNumberWithParentheses', columnDef, grid, false);
        if (isNumber) {
            return formatNumber(value, minDecimal, maxDecimal, displayNegativeNumberWithParentheses, '', '%');
        }
        return value;
    };

    var progressBarFormatter = function (row, cell, value, columnDef, dataContext) {
        var isNumber = (value === null || value === undefined || value === '') ? false : !isNaN(+value);
        if (!isNumber) {
            return '';
        }
        var color = '';
        var inputNumber = parseFloat(value);
        if (inputNumber > 100) {
            inputNumber = 100;
        }
        if (inputNumber < 30) {
            color = 'danger';
        }
        else if (inputNumber < 70) {
            color = 'warning';
        }
        else {
            color = 'success';
        }
        var output = "<div class=\"progress\">\n    <div class=\"progress-bar progress-bar-" + color + " bg-" + color + "\" role=\"progressbar\" aria-valuenow=\"" + inputNumber + "\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"min-width: 2em; width: " + inputNumber + "%;\">\n    " + inputNumber + "%\n    </div>\n  </div>";
        return output.replace(/\s{2,}/g, ' ').trim();
    };

    /** Takes a cell value and translates it with the "ngx-translate" service */
    var translateFormatter = function (row, cell, value, columnDef, dataContext, grid) {
        var gridOptions = (grid && typeof grid.getOptions === 'function') ? grid.getOptions() : {};
        var translate = gridOptions.i18n || (columnDef && columnDef.params && columnDef.params.i18n);
        if (!translate || typeof translate.instant !== 'function') {
            throw new Error("The translate formatter requires the \"ngx-translate\" Service to be provided as a Grid Options or Column Definition \"i18n\".\n    For example: this.gridOptions = { enableTranslate: true, i18n: this.translate }");
        }
        // make sure the value is a string (for example a boolean value would throw an error)
        if (value !== undefined && value !== null && typeof value !== 'string') {
            value = value + '';
        }
        return value ? translate.instant(value) : '';
    };

    /** Takes a boolean value, cast it to upperCase string and finally translates it with the "ngx-translate" service */
    var translateBooleanFormatter = function (row, cell, value, columnDef, dataContext, grid) {
        var gridOptions = (grid && typeof grid.getOptions === 'function') ? grid.getOptions() : {};
        var translate = gridOptions.i18n || (columnDef && columnDef.params && columnDef.params.i18n);
        if (!translate || typeof translate.instant !== 'function') {
            throw new Error("The translate formatter requires the \"ngx-translate\" Service to be provided as a Grid Options or Column Definition \"i18n\".\n    For example: this.gridOptions = { enableTranslate: true, i18n: this.translate }");
        }
        // make sure the value is a string (for example a boolean value would throw an error)
        if (value !== undefined && value !== null && typeof value !== 'string') {
            value = value + '';
        }
        return value ? translate.instant(value.toUpperCase()) : '';
    };

    var uppercaseFormatter = function (row, cell, value, columnDef, dataContext) {
        // make sure the value is a string
        if (value !== undefined && typeof value !== 'string') {
            value = value + '';
        }
        return value ? value.toUpperCase() : '';
    };

    var yesNoFormatter = function (row, cell, value, columnDef, dataContext) {
        return value ? 'Yes' : 'No';
    };

    /** Provides a list of different Formatters that will change the cell value displayed in the UI */
    var Formatters = {
        /**
         * Takes an array of complex objects converts it to a comma delimited string.
         * Requires to pass an array of "propertyNames" in the column definition the generic "params" property
         * For example, if we have an array of user objects that have the property of firstName & lastName then we need to pass in your column definition::
         * { params: { propertyNames: ['firtName'] }}
         */
        arrayObjectToCsv: arrayObjectToCsvFormatter,
        /** Takes an array of string and converts it to a comma delimited string */
        arrayToCsv: arrayToCsvFormatter,
        /** show value in bold font weight */
        bold: boldFormatter,
        /** When value is filled (true), it will display a checkbox Unicode icon */
        checkbox: checkboxFormatter,
        /** When value is filled (true), it will display a Font-Awesome icon (fa-check) */
        checkmark: checkmarkFormatter,
        /**
         * Takes a complex data object and return the data under that property (for example: "user.firstName" will return the first name "John")
         * You can pass the complex structure in the "field" or the "params: { complexField: string }" properties.
         * For example::
         * this.columnDefs = [{ id: 'username', field: 'user.firstName', ... }]
         * OR this.columnDefs = [{ id: 'username', field: 'user', params: { complexField: 'user.firstName' }, ... }]
         */
        complexObject: complexObjectFormatter,
        /**
         * Looks up values from the columnDefinition.params.collection property and displays the label in CSV or string format
         * @example
         * // the grid will display 'foo' and 'bar' and not 1 and 2 from your dataset
         * { params: { collection: [{ value: 1, label: 'foo'}, {value: 2, label: 'bar' }] }}
         * const dataset = [1, 2];
         */
        collection: collectionFormatter,
        /**
         * Roughly the same as the "collectionFormatter" except that it
         * looks up values from the columnDefinition.editor.collection (instead of params) property and displays the label in CSV or string format
         * @example
         * // the grid will display 'foo' and 'bar' and not 1 and 2 from your dataset
         * { editor: { collection: [{ value: 1, label: 'foo'}, {value: 2, label: 'bar' }] }}
         * const dataset = [1, 2];
         */
        collectionEditor: collectionEditorFormatter,
        /** Takes a Date object and displays it as an ISO Date format (YYYY-MM-DD) */
        dateIso: getAssociatedDateFormatter(exports.FieldType.dateIso, '-'),
        /** Takes a Date object and displays it as an ISO Date+Time format (YYYY-MM-DD HH:mm:ss) */
        dateTimeIso: getAssociatedDateFormatter(exports.FieldType.dateTimeIso, '-'),
        /** Takes a Date object and displays it as an ISO Date+Time (without seconds) format (YYYY-MM-DD HH:mm) */
        dateTimeShortIso: getAssociatedDateFormatter(exports.FieldType.dateTimeShortIso, '-'),
        /** Takes a Date object and displays it as an ISO Date+Time+(am/pm) format (YYYY-MM-DD h:mm:ss a) */
        dateTimeIsoAmPm: getAssociatedDateFormatter(exports.FieldType.dateTimeIsoAmPm, '-'),
        /** Takes a Date object and displays it as an Euro Date format (DD/MM/YYYY) */
        dateEuro: getAssociatedDateFormatter(exports.FieldType.dateEuro, '/'),
        /** Takes a Date object and displays it as an Euro Date+Time format (DD/MM/YYYY HH:mm:ss) */
        dateTimeEuro: getAssociatedDateFormatter(exports.FieldType.dateTimeEuro, '/'),
        /** Takes a Date object and displays it as an Euro Date+Time (without seconds) format (DD/MM/YYYY HH:mm) */
        dateTimeShortEuro: getAssociatedDateFormatter(exports.FieldType.dateTimeShortEuro, '/'),
        /** Takes a Date object and displays it as an Euro Date+Time+(am/pm) format (DD/MM/YYYY hh:mm:ss a) */
        dateTimeEuroAmPm: getAssociatedDateFormatter(exports.FieldType.dateTimeEuroAmPm, '/'),
        /** Takes a Date object and displays it as an US Date format (MM/DD/YYYY) */
        dateUs: getAssociatedDateFormatter(exports.FieldType.dateUs, '/'),
        /** Takes a Date object and displays it as an US Date+Time format (MM/DD/YYYY HH:mm:ss) */
        dateTimeUs: getAssociatedDateFormatter(exports.FieldType.dateTimeUs, '/'),
        /** Takes a Date object and displays it as an US Date+Time (without seconds) format (MM/DD/YYYY HH:mm:ss) */
        dateTimeShortUs: getAssociatedDateFormatter(exports.FieldType.dateTimeShortUs, '/'),
        /** Takes a Date object and displays it as an US Date+Time+(am/pm) format (MM/DD/YYYY hh:mm:ss a) */
        dateTimeUsAmPm: getAssociatedDateFormatter(exports.FieldType.dateTimeUsAmPm, '/'),
        /** Displays a Font-Awesome delete icon (fa-trash) */
        deleteIcon: deleteIconFormatter,
        /**
         * Display the value as x decimals formatted, defaults to 2 decimals.
         * You can pass "decimalPlaces" or "minDecimalPlaces" and/or "maxDecimalPlaces" to the "params" property.
         * For example:: `{ formatter: Formatters.decimal, params: { decimalPlaces: 3 }}`
         * The property "decimalPlaces" is an alias of "minDecimalPlaces"
         */
        decimal: decimalFormatter,
        /** Display the value as 2 decimals formatted with dollar sign '$' at the end of of the value */
        dollar: dollarFormatter,
        /** Display the value as 2 decimals formatted with dollar sign '$' at the end of of the value, change color of text to red/green on negative/positive value */
        dollarColored: dollarColoredFormatter,
        /** Display the value as 2 decimals formatted with dollar sign '$' at the end of of the value, change color of text to red/green on negative/positive value, show it in bold font weight as well */
        dollarColoredBold: dollarColoredBoldFormatter,
        /** Displays a Font-Awesome edit icon (fa-pencil) */
        editIcon: editIconFormatter,
        /**
         * Takes an hyperlink cell value and transforms it into a real hyperlink, given that the value starts with 1 of these (http|ftp|https).
         * The structure will be "<a href="hyperlink">hyperlink</a>"
         * You can optionally change the hyperlink text displayed by using the generic params "hyperlinkText" in the column definition
         * For example: { id: 'link', field: 'link', params: { hyperlinkText: 'Company Website' } } will display "<a href="link">Company Website</a>"
         */
        hyperlink: hyperlinkFormatter,
        /** Display whichever icon you want (library agnostic, it could be Font-Awesome or any other) */
        icon: iconFormatter,
        /** Displays a Font-Awesome edit icon (fa-info-circle) */
        infoIcon: infoIconFormatter,
        /** show input text value as italic text */
        italic: italicFormatter,
        /** Takes a value and displays it all lowercase */
        lowercase: lowercaseFormatter,
        /**
         * Takes a value display it according to a mask provided
         * e.: 1234567890 with mask "(000) 000-0000" will display "(123) 456-7890"
         */
        mask: maskFormatter,
        /**
         * You can pipe multiple formatters (executed in sequence), use params to pass the list of formatters.
         * Requires to pass an array of "formatters" in the column definition the generic "params" property
         * For example::
         * { field: 'title', formatter: Formatters.multiple, params: { formatters: [ Formatters.lowercase, Formatters.uppercase ] }
         */
        multiple: multipleFormatter,
        /** Takes a cell value number (between 0.0-1.0) and displays a red (<50) or green (>=50) bar */
        percent: percentFormatter,
        /** Takes a cell value number (between 0.0-100) and displays a red (<50) or green (>=50) bar */
        percentComplete: percentCompleteFormatter,
        /** Takes a cell value number (between 0-100) and displays Bootstrap "percent-complete-bar" a red (<30), silver (>30 & <70) or green (>=70) bar */
        percentCompleteBar: percentCompleteBarFormatter,
        /** Takes a cell value number (between 0-100) and add the "%" after the number */
        percentSymbol: percentSymbolFormatter,
        /** Takes a cell value number (between 0-100) and displays Bootstrap "progress-bar" a red (<30), silver (>30 & <70) or green (>=70) bar */
        progressBar: progressBarFormatter,
        /** Takes a cell value and translates it (i18n). Requires an instance of the Translate Service:: `i18n: this.translate */
        translate: translateFormatter,
        /** Takes a boolean value, cast it to upperCase string and finally translates it (i18n). */
        translateBoolean: translateBooleanFormatter,
        /** Takes a value and displays it all uppercase */
        uppercase: uppercaseFormatter,
        /** Takes a boolean value and display a string 'Yes' or 'No' */
        yesNo: yesNoFormatter
    };

    var avgTotalsPercentageFormatter = function (totals, columnDef, grid) {
        var field = columnDef.field || '';
        var val = totals.avg && totals.avg[field];
        var params = columnDef && columnDef.params;
        var prefix = params && params.groupFormatterPrefix || '';
        var suffix = params && params.groupFormatterSuffix || '';
        var minDecimal = getValueFromParamsOrGridOptions('minDecimal', columnDef, grid);
        var maxDecimal = getValueFromParamsOrGridOptions('maxDecimal', columnDef, grid);
        var displayNegativeNumberWithParentheses = getValueFromParamsOrGridOptions('displayNegativeNumberWithParentheses', columnDef, grid, false);
        if (val != null && !isNaN(+val)) {
            if (val < 0) {
                val = Math.abs(val);
                if (!displayNegativeNumberWithParentheses) {
                    prefix += '-';
                }
                else {
                    if (isNaN(minDecimal) && isNaN(maxDecimal)) {
                        return prefix + "(" + Math.round(val) + "%)" + suffix;
                    }
                    return prefix + "(" + decimalFormatted(val, minDecimal, maxDecimal) + "%)" + suffix;
                }
            }
            if (isNaN(minDecimal) && isNaN(maxDecimal)) {
                return "" + prefix + Math.round(val) + "%" + suffix;
            }
            return "" + prefix + decimalFormatted(val, minDecimal, maxDecimal) + "%" + suffix;
        }
        return '';
    };

    var avgTotalsDollarFormatter = function (totals, columnDef, grid) {
        var field = columnDef.field || '';
        var val = totals.avg && totals.avg[field];
        var params = columnDef && columnDef.params;
        var prefix = params && params.groupFormatterPrefix || '';
        var suffix = params && params.groupFormatterSuffix || '';
        var minDecimal = getValueFromParamsOrGridOptions('minDecimal', columnDef, grid, 2);
        var maxDecimal = getValueFromParamsOrGridOptions('maxDecimal', columnDef, grid, 4);
        var displayNegativeNumberWithParentheses = getValueFromParamsOrGridOptions('displayNegativeNumberWithParentheses', columnDef, grid, false);
        if (val != null && !isNaN(+val)) {
            var formattedNumber = formatNumber(val, minDecimal, maxDecimal, displayNegativeNumberWithParentheses, '$');
            return "" + prefix + formattedNumber + suffix;
        }
        return '';
    };

    var avgTotalsFormatter = function (totals, columnDef, grid) {
        var field = columnDef.field || '';
        var val = totals.avg && totals.avg[field];
        var params = columnDef && columnDef.params;
        var prefix = params && params.groupFormatterPrefix || '';
        var suffix = params && params.groupFormatterSuffix || '';
        var minDecimal = getValueFromParamsOrGridOptions('minDecimal', columnDef, grid);
        var maxDecimal = getValueFromParamsOrGridOptions('maxDecimal', columnDef, grid);
        var displayNegativeNumberWithParentheses = getValueFromParamsOrGridOptions('displayNegativeNumberWithParentheses', columnDef, grid, false);
        if (val != null && !isNaN(+val)) {
            if (val < 0) {
                val = Math.abs(val);
                if (!displayNegativeNumberWithParentheses) {
                    prefix += '-';
                }
                else {
                    if (isNaN(minDecimal) && isNaN(maxDecimal)) {
                        return prefix + "(" + Math.round(val) + ")" + suffix;
                    }
                    return prefix + "(" + decimalFormatted(val, minDecimal, maxDecimal) + ")" + suffix;
                }
            }
            if (isNaN(minDecimal) && isNaN(maxDecimal)) {
                return "" + prefix + Math.round(val) + suffix;
            }
            return "" + prefix + decimalFormatted(val, minDecimal, maxDecimal) + suffix;
        }
        return '';
    };

    var minTotalsFormatter = function (totals, columnDef, grid) {
        var field = columnDef.field || '';
        var val = totals.min && totals.min[field];
        var params = columnDef && columnDef.params;
        var prefix = params && params.groupFormatterPrefix || '';
        var suffix = params && params.groupFormatterSuffix || '';
        var minDecimal = getValueFromParamsOrGridOptions('minDecimal', columnDef, grid);
        var maxDecimal = getValueFromParamsOrGridOptions('maxDecimal', columnDef, grid);
        var displayNegativeNumberWithParentheses = getValueFromParamsOrGridOptions('displayNegativeNumberWithParentheses', columnDef, grid, false);
        if (val != null && !isNaN(+val)) {
            var formattedNumber = formatNumber(val, minDecimal, maxDecimal, displayNegativeNumberWithParentheses);
            return "" + prefix + formattedNumber + suffix;
        }
        return '';
    };

    var maxTotalsFormatter = function (totals, columnDef, grid) {
        var field = columnDef.field || '';
        var val = totals.max && totals.max[field];
        var params = columnDef && columnDef.params;
        var prefix = params && params.groupFormatterPrefix || '';
        var suffix = params && params.groupFormatterSuffix || '';
        var minDecimal = getValueFromParamsOrGridOptions('minDecimal', columnDef, grid);
        var maxDecimal = getValueFromParamsOrGridOptions('maxDecimal', columnDef, grid);
        var displayNegativeNumberWithParentheses = getValueFromParamsOrGridOptions('displayNegativeNumberWithParentheses', columnDef, grid, false);
        if (val != null && !isNaN(+val)) {
            var formattedNumber = formatNumber(val, minDecimal, maxDecimal, displayNegativeNumberWithParentheses);
            return "" + prefix + formattedNumber + suffix;
        }
        return '';
    };

    var sumTotalsColoredFormatter = function (totals, columnDef, grid) {
        var field = columnDef.field || '';
        var val = totals.sum && totals.sum[field];
        var params = columnDef && columnDef.params;
        var prefix = params && params.groupFormatterPrefix || '';
        var suffix = params && params.groupFormatterSuffix || '';
        var minDecimal = getValueFromParamsOrGridOptions('minDecimal', columnDef, grid);
        var maxDecimal = getValueFromParamsOrGridOptions('maxDecimal', columnDef, grid);
        var displayNegativeNumberWithParentheses = getValueFromParamsOrGridOptions('displayNegativeNumberWithParentheses', columnDef, grid, false);
        if (val != null && !isNaN(+val)) {
            var colorStyle = (val >= 0) ? 'green' : 'red';
            var formattedNumber = formatNumber(val, minDecimal, maxDecimal, displayNegativeNumberWithParentheses);
            return "<span style=\"color:" + colorStyle + "\">" + prefix + formattedNumber + suffix + "</span>";
        }
        return '';
    };

    var sumTotalsDollarColoredBoldFormatter = function (totals, columnDef, grid) {
        var field = columnDef.field || '';
        var val = totals.sum && totals.sum[field];
        var params = columnDef && columnDef.params;
        var prefix = params && params.groupFormatterPrefix || '';
        var suffix = params && params.groupFormatterSuffix || '';
        var minDecimal = getValueFromParamsOrGridOptions('minDecimal', columnDef, grid, 2);
        var maxDecimal = getValueFromParamsOrGridOptions('maxDecimal', columnDef, grid, 4);
        var displayNegativeNumberWithParentheses = getValueFromParamsOrGridOptions('displayNegativeNumberWithParentheses', columnDef, grid, false);
        if (val != null && !isNaN(+val)) {
            var colorStyle = (val >= 0) ? 'green' : 'red';
            var formattedNumber = formatNumber(val, minDecimal, maxDecimal, displayNegativeNumberWithParentheses, '$');
            return "<span style=\"color:" + colorStyle + "; font-weight: bold;\">" + prefix + formattedNumber + suffix + "</span>";
        }
        return '';
    };

    var sumTotalsDollarColoredFormatter = function (totals, columnDef, grid) {
        var field = columnDef.field || '';
        var val = totals.sum && totals.sum[field];
        var params = columnDef && columnDef.params;
        var prefix = params && params.groupFormatterPrefix || '';
        var suffix = params && params.groupFormatterSuffix || '';
        var minDecimal = getValueFromParamsOrGridOptions('minDecimal', columnDef, grid, 2);
        var maxDecimal = getValueFromParamsOrGridOptions('maxDecimal', columnDef, grid, 4);
        var displayNegativeNumberWithParentheses = getValueFromParamsOrGridOptions('displayNegativeNumberWithParentheses', columnDef, grid, false);
        if (val != null && !isNaN(+val)) {
            var colorStyle = (val >= 0) ? 'green' : 'red';
            var formattedNumber = formatNumber(val, minDecimal, maxDecimal, displayNegativeNumberWithParentheses, '$');
            return "<span style=\"color:" + colorStyle + "\">" + prefix + formattedNumber + suffix + "</span>";
        }
        return '';
    };

    var sumTotalsDollarBoldFormatter = function (totals, columnDef, grid) {
        var field = columnDef.field || '';
        var val = totals.sum && totals.sum[field];
        var params = columnDef && columnDef.params;
        var prefix = params && params.groupFormatterPrefix || '';
        var suffix = params && params.groupFormatterSuffix || '';
        var minDecimal = getValueFromParamsOrGridOptions('minDecimal', columnDef, grid, 2);
        var maxDecimal = getValueFromParamsOrGridOptions('maxDecimal', columnDef, grid, 4);
        var displayNegativeNumberWithParentheses = getValueFromParamsOrGridOptions('displayNegativeNumberWithParentheses', columnDef, grid, false);
        if (val != null && !isNaN(+val)) {
            var formattedNumber = formatNumber(val, minDecimal, maxDecimal, displayNegativeNumberWithParentheses, '$');
            return "<b>" + prefix + formattedNumber + suffix + "</b>";
        }
        return '';
    };

    var sumTotalsDollarFormatter = function (totals, columnDef, grid) {
        var field = columnDef.field || '';
        var val = totals.sum && totals.sum[field];
        var params = columnDef && columnDef.params;
        var prefix = params && params.groupFormatterPrefix || '';
        var suffix = params && params.groupFormatterSuffix || '';
        var minDecimal = getValueFromParamsOrGridOptions('minDecimal', columnDef, grid, 2);
        var maxDecimal = getValueFromParamsOrGridOptions('maxDecimal', columnDef, grid, 4);
        var displayNegativeNumberWithParentheses = getValueFromParamsOrGridOptions('displayNegativeNumberWithParentheses', columnDef, grid, false);
        if (val != null && !isNaN(+val)) {
            var formattedNumber = formatNumber(val, minDecimal, maxDecimal, displayNegativeNumberWithParentheses, '$');
            return "" + prefix + formattedNumber + suffix;
        }
        return '';
    };

    var sumTotalsFormatter = function (totals, columnDef, grid) {
        var field = columnDef.field || '';
        var val = totals.sum && totals.sum[field];
        var params = columnDef && columnDef.params;
        var prefix = params && params.groupFormatterPrefix || '';
        var suffix = params && params.groupFormatterSuffix || '';
        var minDecimal = getValueFromParamsOrGridOptions('minDecimal', columnDef, grid);
        var maxDecimal = getValueFromParamsOrGridOptions('maxDecimal', columnDef, grid);
        var displayNegativeNumberWithParentheses = getValueFromParamsOrGridOptions('displayNegativeNumberWithParentheses', columnDef, grid, false);
        if (val != null && !isNaN(+val)) {
            var formattedNumber = formatNumber(val, minDecimal, maxDecimal, displayNegativeNumberWithParentheses);
            return "" + prefix + formattedNumber + suffix;
        }
        return '';
    };

    var sumTotalsBoldFormatter = function (totals, columnDef, grid) {
        var field = columnDef.field || '';
        var val = totals.sum && totals.sum[field];
        var params = columnDef && columnDef.params;
        var prefix = params && params.groupFormatterPrefix || '';
        var suffix = params && params.groupFormatterSuffix || '';
        var minDecimal = getValueFromParamsOrGridOptions('minDecimal', columnDef, grid);
        var maxDecimal = getValueFromParamsOrGridOptions('maxDecimal', columnDef, grid);
        var displayNegativeNumberWithParentheses = getValueFromParamsOrGridOptions('displayNegativeNumberWithParentheses', columnDef, grid, false);
        if (val != null && !isNaN(+val)) {
            var formattedNumber = formatNumber(val, minDecimal, maxDecimal, displayNegativeNumberWithParentheses);
            return "<b>" + prefix + formattedNumber + suffix + "</b>";
        }
        return '';
    };

    /** Provides a list of different Formatters that will change the cell value displayed in the UI */
    var GroupTotalFormatters = {
        /**
         * Average all the column totals
         * Extra options available in "params":: "groupFormatterPrefix" and "groupFormatterSuffix", e.g.: params: { groupFormatterPrefix: '<i>Total</i>: ', groupFormatterSuffix: '$' }
         */
        avgTotals: avgTotalsFormatter,
        /**
         * Average all the column totals and display '$' at the end of the value
         * Extra options available in "params":: "groupFormatterPrefix" and "groupFormatterSuffix", e.g.: params: { groupFormatterPrefix: '<i>Total</i>: ', groupFormatterSuffix: '$' }
         */
        avgTotalsDollar: avgTotalsDollarFormatter,
        /**
         * Average all the column totals and display '%' at the end of the value
         * Extra options available in "params":: "groupFormatterPrefix" and "groupFormatterSuffix", e.g.: params: { groupFormatterPrefix: '<i>Total</i>: ', groupFormatterSuffix: '$' }
         */
        avgTotalsPercentage: avgTotalsPercentageFormatter,
        /**
         * Show max value of all the column totals
         * Extra options available in "params":: "groupFormatterPrefix" and "groupFormatterSuffix", e.g.: params: { groupFormatterPrefix: '<i>Total</i>: ', groupFormatterSuffix: '$' }
         */
        maxTotals: maxTotalsFormatter,
        /**
         * Show min value of all the column totals
         * Extra options available in "params":: "groupFormatterPrefix" and "groupFormatterSuffix", e.g.: params: { groupFormatterPrefix: '<i>Total</i>: ', groupFormatterSuffix: '$' }
         */
        minTotals: minTotalsFormatter,
        /**
         * Sums up all the column totals
         * Extra options available in "params":: "groupFormatterPrefix" and "groupFormatterSuffix", e.g.: params: { groupFormatterPrefix: '<i>Total</i>: ', groupFormatterSuffix: '$' }
         */
        sumTotals: sumTotalsFormatter,
        /**
         * Sums up all the column totals and display it in bold font weight
         * Extra options available in "params":: "groupFormatterPrefix" and "groupFormatterSuffix", e.g: params: { groupFormatterPrefix: '<i>Total</i>: ', groupFormatterSuffix: '$' }
         */
        sumTotalsBold: sumTotalsBoldFormatter,
        /**
         * Sums up all the column totals, change color of text to red/green on negative/positive value
         * Extra options available in "params":: "groupFormatterPrefix" and "groupFormatterSuffix", e.g: params: { groupFormatterPrefix: '<i>Total</i>: ', groupFormatterSuffix: '$' }
         */
        sumTotalsColored: sumTotalsColoredFormatter,
        /**
         * Sums up all the column totals and display dollar sign
         * Extra options available in "params":: "groupFormatterPrefix" and "groupFormatterSuffix", e.g: params: { groupFormatterPrefix: '<i>Total</i>: ', groupFormatterSuffix: '$' }
         */
        sumTotalsDollar: sumTotalsDollarFormatter,
        /**
         * Sums up all the column totals and display dollar sign and show it in bold font weight
         * Extra options available in "params":: "groupFormatterPrefix" and "groupFormatterSuffix", e.g: params: { groupFormatterPrefix: '<i>Total</i>: ', groupFormatterSuffix: '$' }
         */
        sumTotalsDollarBold: sumTotalsDollarBoldFormatter,
        /**
         * Sums up all the column totals, change color of text to red/green on negative/positive value
         * Extra options available in "params":: "groupFormatterPrefix" and "groupFormatterSuffix", e.g: params: { groupFormatterPrefix: '<i>Total</i>: ', groupFormatterSuffix: '$' }
         */
        sumTotalsDollarColored: sumTotalsDollarColoredFormatter,
        /**
         * Sums up all the column totals, change color of text to red/green on negative/positive value, show it in bold font weight as well
         * Extra options available in "params":: "groupFormatterPrefix" and "groupFormatterSuffix", e.g: params: { groupFormatterPrefix: '<i>Total</i>: ', groupFormatterSuffix: '$' }
         */
        sumTotalsDollarColoredBold: sumTotalsDollarColoredBoldFormatter,
    };

    var SlickPaginationComponent = /** @class */ (function () {
        /** Constructor */
        function SlickPaginationComponent(filterService, gridService) {
            this.filterService = filterService;
            this.gridService = gridService;
            this._eventHandler = new Slick.EventHandler();
            this._isFirstRender = true;
            this.onPaginationChanged = new core.EventEmitter();
            this.dataFrom = 1;
            this.dataTo = 1;
            this.pageCount = 0;
            this.pageNumber = 1;
            this.totalItems = 0;
            this.paginationPageSizes = [25, 75, 100];
            this.fromToParams = { from: this.dataFrom, to: this.dataTo, totalItems: this.totalItems };
        }
        Object.defineProperty(SlickPaginationComponent.prototype, "gridPaginationOptions", {
            get: function () {
                return this._gridPaginationOptions;
            },
            set: function (gridPaginationOptions) {
                this._gridPaginationOptions = gridPaginationOptions;
                if (this._isFirstRender || !gridPaginationOptions || !gridPaginationOptions.pagination || (gridPaginationOptions.pagination.totalItems !== this.totalItems)) {
                    this.refreshPagination();
                    this._isFirstRender = false;
                }
            },
            enumerable: true,
            configurable: true
        });
        SlickPaginationComponent.prototype.ngOnDestroy = function () {
            this.dispose();
        };
        SlickPaginationComponent.prototype.ngAfterViewInit = function () {
            var _this = this;
            this._gridPaginationOptions = this._gridPaginationOptions;
            if (!this._gridPaginationOptions || !this._gridPaginationOptions.pagination || (this._gridPaginationOptions.pagination.totalItems !== this.totalItems)) {
                this.refreshPagination();
            }
            // Subscribe to Filter Clear & Changed and go back to page 1 when that happen
            this._filterSubcription = this.filterService.onFilterChanged.subscribe(function () { return _this.refreshPagination(true); });
            this._filterSubcription = this.filterService.onFilterCleared.subscribe(function () { return _this.refreshPagination(true); });
            // Subscribe to any dataview row count changed so that when Adding/Deleting item(s) through the DataView
            // that would trigger a refresh of the pagination numbers
            if (this.dataView) {
                this.gridService.onItemAdded.subscribe(function (items) { return _this.onItemAddedOrRemoved(items, true); });
                this.gridService.onItemDeleted.subscribe(function (items) { return _this.onItemAddedOrRemoved(items, false); });
            }
        };
        SlickPaginationComponent.prototype.ceil = function (number) {
            return Math.ceil(number);
        };
        SlickPaginationComponent.prototype.changeToFirstPage = function (event) {
            this.pageNumber = 1;
            this.onPageChanged(event, this.pageNumber);
        };
        SlickPaginationComponent.prototype.changeToLastPage = function (event) {
            this.pageNumber = this.pageCount;
            this.onPageChanged(event, this.pageNumber);
        };
        SlickPaginationComponent.prototype.changeToNextPage = function (event) {
            if (this.pageNumber < this.pageCount) {
                this.pageNumber++;
                this.onPageChanged(event, this.pageNumber);
            }
        };
        SlickPaginationComponent.prototype.changeToPreviousPage = function (event) {
            if (this.pageNumber > 0) {
                this.pageNumber--;
                this.onPageChanged(event, this.pageNumber);
            }
        };
        SlickPaginationComponent.prototype.changeToCurrentPage = function (event) {
            this.pageNumber = +event.currentTarget.value;
            if (this.pageNumber < 1) {
                this.pageNumber = 1;
            }
            else if (this.pageNumber > this.pageCount) {
                this.pageNumber = this.pageCount;
            }
            this.onPageChanged(event, this.pageNumber);
        };
        SlickPaginationComponent.prototype.dispose = function () {
            this.onPaginationChanged.unsubscribe();
            if (this._filterSubcription) {
                this._filterSubcription.unsubscribe();
            }
            // unsubscribe all SlickGrid events
            this._eventHandler.unsubscribeAll();
        };
        SlickPaginationComponent.prototype.onChangeItemPerPage = function (event) {
            var itemsPerPage = +event.target.value;
            this.pageCount = Math.ceil(this.totalItems / itemsPerPage);
            this.pageNumber = (this.totalItems > 0) ? 1 : 0;
            this.itemsPerPage = itemsPerPage;
            this.onPageChanged(event, this.pageNumber);
        };
        SlickPaginationComponent.prototype.refreshPagination = function (isPageNumberReset) {
            if (isPageNumberReset === void 0) { isPageNumberReset = false; }
            var backendApi = this._gridPaginationOptions.backendServiceApi;
            if (!backendApi || !backendApi.service || !backendApi.process) {
                throw new Error("BackendServiceApi requires at least a \"process\" function and a \"service\" defined");
            }
            if (this._gridPaginationOptions && this._gridPaginationOptions.pagination) {
                var pagination = this._gridPaginationOptions.pagination;
                // set the number of items per page if not already set
                if (!this.itemsPerPage) {
                    this.itemsPerPage = +((backendApi && backendApi.options && backendApi.options.paginationOptions && backendApi.options.paginationOptions.first) ? backendApi.options.paginationOptions.first : this._gridPaginationOptions.pagination.pageSize);
                }
                // if totalItems changed, we should always go back to the first page and recalculation the From-To indexes
                if (isPageNumberReset || this.totalItems !== pagination.totalItems) {
                    if (this._isFirstRender && pagination.pageNumber && pagination.pageNumber > 1) {
                        this.pageNumber = pagination.pageNumber || 1;
                    }
                    else {
                        this.pageNumber = 1;
                    }
                    // when page number is set to 1 then also reset the "offset" of backend service
                    if (this.pageNumber === 1) {
                        backendApi.service.resetPaginationOptions();
                    }
                }
                // calculate and refresh the multiple properties of the pagination UI
                this.paginationPageSizes = this._gridPaginationOptions.pagination.pageSizes;
                this.totalItems = this._gridPaginationOptions.pagination.totalItems;
                this.recalculateFromToIndexes();
            }
            this.pageCount = Math.ceil(this.totalItems / this.itemsPerPage);
        };
        SlickPaginationComponent.prototype.onPageChanged = function (event, pageNumber) {
            var _this = this;
            this.recalculateFromToIndexes();
            var backendApi = this._gridPaginationOptions.backendServiceApi;
            if (!backendApi || !backendApi.service || !backendApi.process) {
                throw new Error("BackendServiceApi requires at least a \"process\" function and a \"service\" defined");
            }
            if (this.dataTo > this.totalItems) {
                this.dataTo = this.totalItems;
            }
            else if (this.totalItems < this.itemsPerPage) {
                this.dataTo = this.totalItems;
            }
            if (backendApi) {
                try {
                    var itemsPerPage = +this.itemsPerPage;
                    // keep start time & end timestamps & return it after process execution
                    var startTime_1 = new Date();
                    // run any pre-process, if defined, for example a spinner
                    if (backendApi.preProcess) {
                        backendApi.preProcess();
                    }
                    var query = backendApi.service.processOnPaginationChanged(event, { newPage: pageNumber, pageSize: itemsPerPage });
                    // the processes can be Observables (like HttpClient) or Promises
                    var process_1 = backendApi.process(query);
                    if (process_1 instanceof Promise && process_1.then) {
                        process_1.then(function (processResult) { return executeBackendProcessesCallback(startTime_1, processResult, backendApi, _this._gridPaginationOptions); });
                    }
                    else if (rxjs.isObservable(process_1)) {
                        process_1.subscribe(function (processResult) { return executeBackendProcessesCallback(startTime_1, processResult, backendApi, _this._gridPaginationOptions); }, function (error) { return onBackendError(error, backendApi); });
                    }
                }
                catch (error) {
                    onBackendError(error, backendApi);
                }
            }
            else {
                throw new Error('Pagination with a backend service requires "BackendServiceApi" to be defined in your grid options');
            }
            // emit the changes to the parent component
            this.onPaginationChanged.emit({
                pageNumber: this.pageNumber,
                pageSizes: this.paginationPageSizes,
                pageSize: this.itemsPerPage,
                totalItems: this.totalItems
            });
        };
        SlickPaginationComponent.prototype.recalculateFromToIndexes = function () {
            if (this.totalItems === 0) {
                this.dataFrom = 0;
                this.dataTo = 0;
                this.pageNumber = 0;
            }
            else {
                this.dataFrom = (this.pageNumber * this.itemsPerPage) - this.itemsPerPage + 1;
                this.dataTo = (this.totalItems < this.itemsPerPage) ? this.totalItems : (this.pageNumber * this.itemsPerPage);
            }
        };
        /**
         * When item is added or removed, we will refresh the numbers on the pagination however we won't trigger a backend change
         * This will have a side effect though, which is that the "To" count won't be matching the "items per page" count,
         * that is a necessary side effect to avoid triggering a backend query just to refresh the paging,
         * basically we assume that this offset is fine for the time being,
         * until user does an action which will refresh the data hence the pagination which will then become normal again
         */
        SlickPaginationComponent.prototype.onItemAddedOrRemoved = function (items, isItemAdded) {
            if (isItemAdded === void 0) { isItemAdded = true; }
            if (items !== null) {
                var previousDataTo = this.dataTo;
                var itemCount = Array.isArray(items) ? items.length : 1;
                var itemCountWithDirection = isItemAdded ? +itemCount : -itemCount;
                // refresh the total count in the pagination and in the UI
                this.totalItems += itemCountWithDirection;
                this.recalculateFromToIndexes();
                // finally refresh the "To" count and we know it might be different than the "items per page" count
                // but this is necessary since we don't want an actual backend refresh
                this.dataTo = previousDataTo + itemCountWithDirection;
            }
        };
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], SlickPaginationComponent.prototype, "onPaginationChanged", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], SlickPaginationComponent.prototype, "dataView", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object),
            __metadata("design:paramtypes", [Object])
        ], SlickPaginationComponent.prototype, "gridPaginationOptions", null);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], SlickPaginationComponent.prototype, "grid", void 0);
        SlickPaginationComponent = __decorate([
            core.Component({
                selector: 'slick-pagination',
                template: "<div class=\"slick-pagination\">\n    <div class=\"slick-pagination-nav\">\n        <nav aria-label=\"Page navigation\">\n        <ul class=\"pagination\">\n            <li class=\"page-item\" [ngClass]=\"(pageNumber === 1 || totalItems === 0) ? 'disabled' : ''\">\n            <a class=\"page-link icon-seek-first fa fa-angle-double-left\" aria-label=\"First\" (click)=\"changeToFirstPage($event)\">\n            </a>\n            </li>\n            <li class=\"page-item\" [ngClass]=\"(pageNumber === 1 || totalItems === 0) ? 'disabled' : ''\">\n            <a class=\"page-link icon-seek-prev fa fa-angle-left\" aria-label=\"Previous\" (click)=\"changeToPreviousPage($event)\">\n            </a>\n            </li>\n        </ul>\n        </nav>\n\n        <div class=\"slick-page-number\">\n            <span [translate]=\"'PAGE'\"></span>\n            <input type=\"text\" class=\"form-control\" [value]=\"pageNumber\" size=\"1\" [readOnly]=\"totalItems === 0\" (change)=\"changeToCurrentPage($event)\">\n            <span [translate]=\"'OF'\"></span><span> {{pageCount}}</span>\n        </div>\n\n        <nav aria-label=\"Page navigation\">\n        <ul class=\"pagination\">\n            <li class=\"page-item\" [ngClass]=\"(pageNumber === pageCount || totalItems === 0) ? 'disabled' : ''\">\n            <a class=\"page-link icon-seek-next text-center fa fa-lg fa-angle-right\" aria-label=\"Next\" (click)=\"changeToNextPage($event)\">\n            </a>\n            </li>\n            <li class=\"page-item\" [ngClass]=\"(pageNumber === pageCount || totalItems === 0) ? 'disabled' : ''\">\n            <a class=\"page-link icon-seek-end fa fa-lg fa-angle-double-right\" aria-label=\"Last\" (click)=\"changeToLastPage($event)\">\n            </a>\n            </li>\n        </ul>\n        </nav>\n    </div>\n    <span class=\"slick-pagination-settings\">\n        <select id=\"items-per-page-label\" [value]=\"itemsPerPage\" (change)=\"onChangeItemPerPage($event)\">\n        <option value=\"{{pageSize}}\" *ngFor=\"let pageSize of paginationPageSizes;\">{{pageSize}}</option>\n        </select>\n        <span [translate]=\"'ITEMS_PER_PAGE'\"></span>,\n        <span class=\"slick-pagination-count\">\n            <span [translate]=\"'FROM_TO_OF_TOTAL_ITEMS'\" [translateParams]=\"{ from: dataFrom, to: dataTo, totalItems: totalItems }\"></span>\n        </span>\n    </span>\n    </div>\n"
            }),
            core.Injectable(),
            __metadata("design:paramtypes", [FilterService, GridService])
        ], SlickPaginationComponent);
        return SlickPaginationComponent;
    }());

    var slickgridEventPrefix = 'sg';
    var AngularSlickgridComponent = /** @class */ (function () {
        function AngularSlickgridComponent(elm, exportService, extensionService, extensionUtility, filterService, gridService, gridEventService, gridStateService, groupingAndColspanService, resizer, sharedService, sortService, translate, forRootConfig) {
            this.elm = elm;
            this.exportService = exportService;
            this.extensionService = extensionService;
            this.extensionUtility = extensionUtility;
            this.filterService = filterService;
            this.gridService = gridService;
            this.gridEventService = gridEventService;
            this.gridStateService = gridStateService;
            this.groupingAndColspanService = groupingAndColspanService;
            this.resizer = resizer;
            this.sharedService = sharedService;
            this.sortService = sortService;
            this.translate = translate;
            this.forRootConfig = forRootConfig;
            this._eventHandler = new Slick.EventHandler();
            this._hideHeaderRowAfterPageLoad = false;
            this.groupingDefinition = {};
            this.showPagination = false;
            this.isGridInitialized = false;
            this.subscriptions = [];
            this.onAngularGridCreated = new core.EventEmitter();
            this.onDataviewCreated = new core.EventEmitter();
            this.onGridCreated = new core.EventEmitter();
            this.onGridInitialized = new core.EventEmitter();
            this.onBeforeGridCreate = new core.EventEmitter();
            this.onBeforeGridDestroy = new core.EventEmitter();
            this.onAfterGridDestroyed = new core.EventEmitter();
            this.onGridStateChanged = new core.EventEmitter();
        }
        Object.defineProperty(AngularSlickgridComponent.prototype, "gridHeight", {
            set: function (height) {
                this._fixedHeight = height;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AngularSlickgridComponent.prototype, "gridWidth", {
            set: function (width) {
                this._fixedWidth = width;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AngularSlickgridComponent.prototype, "columnDefinitions", {
            get: function () {
                return this._columnDefinitions;
            },
            set: function (columnDefinitions) {
                this._columnDefinitions = columnDefinitions;
                if (this.isGridInitialized) {
                    this.updateColumnDefinitionsList(columnDefinitions);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AngularSlickgridComponent.prototype, "dataset", {
            get: function () {
                return this.dataView.getItems();
            },
            set: function (dataset) {
                this._dataset = dataset;
                this.refreshGridData(dataset);
            },
            enumerable: true,
            configurable: true
        });
        AngularSlickgridComponent.prototype.ngOnInit = function () {
            this.onBeforeGridCreate.emit(true);
            if (this.gridOptions && !this.gridOptions.enableAutoResize && (this._fixedHeight || this._fixedWidth)) {
                this.gridHeightString = this._fixedHeight + "px";
                this.gridWidthString = this._fixedWidth + "px";
            }
        };
        AngularSlickgridComponent.prototype.ngOnDestroy = function () {
            this.onBeforeGridDestroy.emit(this.grid);
            this.destroy();
            this.onAfterGridDestroyed.emit(true);
        };
        AngularSlickgridComponent.prototype.destroy = function (emptyDomElementContainer) {
            if (emptyDomElementContainer === void 0) { emptyDomElementContainer = false; }
            var gridContainerId = this.gridOptions && this.gridOptions.gridContainerId;
            this.dataView = undefined;
            this.gridOptions = {};
            this.extensionService.dispose();
            this.filterService.dispose();
            this.gridEventService.dispose();
            this.gridStateService.dispose();
            this.groupingAndColspanService.dispose();
            this.resizer.dispose();
            this.sortService.dispose();
            if (this._eventHandler && this._eventHandler.unsubscribeAll) {
                this._eventHandler.unsubscribeAll();
            }
            if (this.grid && this.grid.destroy) {
                this.grid.destroy();
            }
            if (emptyDomElementContainer) {
                $(gridContainerId).empty();
            }
            // also unsubscribe all RxJS subscriptions
            this.subscriptions = unsubscribeAllObservables(this.subscriptions);
        };
        AngularSlickgridComponent.prototype.ngAfterViewInit = function () {
            this.initialization();
            this.isGridInitialized = true;
            // user must provide a "gridHeight" or use "autoResize: true" in the grid options
            if (!this._fixedHeight && !this.gridOptions.enableAutoResize) {
                throw new Error("[Angular-Slickgrid] requires a \"grid-height\" or the \"enableAutoResize\" grid option to be enabled.\n        Without that the grid will seem empty while in fact it just does not have any height define.");
            }
        };
        AngularSlickgridComponent.prototype.initialization = function () {
            // make sure the dataset is initialized (if not it will throw an error that it cannot getLength of null)
            this._dataset = this._dataset || [];
            this.gridOptions = this.mergeGridOptions(this.gridOptions);
            this.createBackendApiInternalPostProcessCallback(this.gridOptions);
            if (!this.customDataView) {
                if (this.gridOptions.draggableGrouping || this.gridOptions.enableGrouping) {
                    this.extensionUtility.loadExtensionDynamically(exports.ExtensionName.groupItemMetaProvider);
                    this.groupItemMetadataProvider = new Slick.Data.GroupItemMetadataProvider();
                    this.sharedService.groupItemMetadataProvider = this.groupItemMetadataProvider;
                    this.dataView = new Slick.Data.DataView({ groupItemMetadataProvider: this.groupItemMetadataProvider });
                }
                else {
                    this.dataView = new Slick.Data.DataView();
                }
            }
            // for convenience to the user, we provide the property "editor" as an Angular-Slickgrid editor complex object
            // however "editor" is used internally by SlickGrid for it's own Editor Factory
            // so in our lib we will swap "editor" and copy it into a new property called "internalColumnEditor"
            // then take back "editor.model" and make it the new "editor" so that SlickGrid Editor Factory still works
            this._columnDefinitions = this.swapInternalEditorToSlickGridFactoryEditor(this._columnDefinitions);
            // save reference for all columns before they optionally become hidden/visible
            this.sharedService.allColumns = this._columnDefinitions;
            this.sharedService.visibleColumns = this._columnDefinitions;
            this.extensionService.createExtensionsBeforeGridCreation(this._columnDefinitions, this.gridOptions);
            // build SlickGrid Grid, also user might optionally pass a custom dataview (e.g. remote model)
            this.grid = new Slick.Grid("#" + this.gridId, this.customDataView || this.dataView, this._columnDefinitions, this.gridOptions);
            this.sharedService.dataView = this.dataView;
            this.sharedService.grid = this.grid;
            this.extensionService.bindDifferentExtensions();
            this.attachDifferentHooks(this.grid, this.gridOptions, this.dataView);
            // emit the Grid & DataView object to make them available in parent component
            this.onGridCreated.emit(this.grid);
            // initialize the SlickGrid grid
            this.grid.init();
            if (!this.customDataView && (this.dataView && this.dataView.beginUpdate && this.dataView.setItems && this.dataView.endUpdate)) {
                this.onDataviewCreated.emit(this.dataView);
                this.dataView.beginUpdate();
                this.dataView.setItems(this._dataset, this.gridOptions.datasetIdPropertyName);
                this.dataView.endUpdate();
                // if you don't want the items that are not visible (due to being filtered out or being on a different page)
                // to stay selected, pass 'false' to the second arg
                if (this.gridOptions && this.gridOptions.dataView && this.gridOptions.dataView.hasOwnProperty('syncGridSelection')) {
                    var syncGridSelection = this.gridOptions.dataView.syncGridSelection;
                    if (typeof syncGridSelection === 'boolean') {
                        this.dataView.syncGridSelection(this.grid, this.gridOptions.dataView.syncGridSelection);
                    }
                    else {
                        this.dataView.syncGridSelection(this.grid, syncGridSelection.preserveHidden, syncGridSelection.preserveHiddenOnSelectionChange);
                    }
                }
            }
            // user might want to hide the header row on page load but still have `enableFiltering: true`
            // if that is the case, we need to hide the headerRow ONLY AFTER all filters got created & dataView exist
            if (this._hideHeaderRowAfterPageLoad) {
                this.showHeaderRow(false);
            }
            // after the DataView is created & updated execute some processes
            this.executeAfterDataviewCreated(this.grid, this.gridOptions, this.dataView);
            // attach resize ONLY after the dataView is ready
            this.attachResizeHook(this.grid, this.gridOptions);
            // attach grouping and header grouping colspan service
            if (this.gridOptions.createPreHeaderPanel && !this.gridOptions.enableDraggableGrouping) {
                this.groupingAndColspanService.init(this.grid, this.dataView);
            }
            // attach grid  service
            this.gridService.init(this.grid, this.dataView);
            // when user enables translation, we need to translate Headers on first pass & subsequently in the attachDifferentHooks
            if (this.gridOptions.enableTranslate) {
                this.extensionService.translateColumnHeaders();
            }
            // if Export is enabled, initialize the service with the necessary grid and other objects
            if (this.gridOptions.enableExport) {
                this.exportService.init(this.grid, this.dataView);
            }
            // once all hooks are in placed and the grid is initialized, we can emit an event
            this.onGridInitialized.emit(this.grid);
            // attach the Backend Service API callback functions only after the grid is initialized
            // because the preProcess() and onInit() might get triggered
            if (this.gridOptions && this.gridOptions.backendServiceApi) {
                this.attachBackendCallbackFunctions(this.gridOptions);
            }
            this.gridStateService.init(this.grid, this.extensionService, this.filterService, this.sortService);
            this.onAngularGridCreated.emit({
                // Slick Grid & DataView objects
                dataView: this.dataView,
                slickGrid: this.grid,
                // public methods
                destroy: this.destroy.bind(this),
                // return all available Services (non-singleton)
                backendService: this.gridOptions && this.gridOptions.backendServiceApi && this.gridOptions.backendServiceApi.service,
                exportService: this.exportService,
                extensionService: this.extensionService,
                filterService: this.filterService,
                gridEventService: this.gridEventService,
                gridStateService: this.gridStateService,
                gridService: this.gridService,
                groupingService: this.groupingAndColspanService,
                resizerService: this.resizer,
                sortService: this.sortService,
                /** @deprecated please use "extensionService" instead */
                pluginService: this.extensionService,
            });
        };
        /**
         * Commits the current edit to the grid
         */
        AngularSlickgridComponent.prototype.commitEdit = function (target) {
            var _this = this;
            if (this.grid.getOptions().autoCommitEdit) {
                var activeNode_1 = this.grid.getActiveCellNode();
                // a timeout must be set or this could come into conflict when slickgrid
                // tries to commit the edit when going from one editor to another on the grid
                // through the click event. If the timeout was not here it would
                // try to commit/destroy the editor twice, which would throw a jquery
                // error about the element not being in the DOM
                setTimeout(function () {
                    // make sure the target is the active editor so we do not
                    // commit prematurely
                    if (activeNode_1 && activeNode_1.contains(target) && _this.grid.getEditorLock().isActive()) {
                        _this.grid.getEditorLock().commitCurrentEdit();
                    }
                });
            }
        };
        /**
         * Define our internal Post Process callback, it will execute internally after we get back result from the Process backend call
         * For now, this is GraphQL Service ONLY feature and it will basically refresh the Dataset & Pagination without having the user to create his own PostProcess every time
         */
        AngularSlickgridComponent.prototype.createBackendApiInternalPostProcessCallback = function (gridOptions) {
            var _this = this;
            if (gridOptions && gridOptions.backendServiceApi) {
                var backendApi_1 = gridOptions.backendServiceApi;
                // internalPostProcess only works with a GraphQL Service, so make sure it is that type
                if (backendApi_1 && backendApi_1.service && backendApi_1.service instanceof GraphqlService) {
                    backendApi_1.internalPostProcess = function (processResult) {
                        var datasetName = (backendApi_1 && backendApi_1.service && typeof backendApi_1.service.getDatasetName === 'function') ? backendApi_1.service.getDatasetName() : '';
                        if (processResult && processResult.data && processResult.data[datasetName]) {
                            _this._dataset = processResult.data[datasetName].nodes;
                            _this.refreshGridData(_this._dataset, processResult.data[datasetName].totalCount);
                        }
                        else {
                            _this._dataset = [];
                        }
                    };
                }
            }
        };
        AngularSlickgridComponent.prototype.attachDifferentHooks = function (grid, gridOptions, dataView) {
            var _this = this;
            // on locale change, we have to manually translate the Headers, GridMenu
            this.subscriptions.push(this.translate.onLangChange.subscribe(function (event) {
                if (gridOptions.enableTranslate) {
                    _this.extensionService.translateColumnHeaders();
                    _this.extensionService.translateColumnPicker();
                    _this.extensionService.translateGridMenu();
                    _this.extensionService.translateHeaderMenu();
                }
            }));
            // if user entered some Columns "presets", we need to reflect them all in the grid
            if (gridOptions.presets && Array.isArray(gridOptions.presets.columns) && gridOptions.presets.columns.length > 0) {
                var gridColumns = this.gridStateService.getAssociatedGridColumns(grid, gridOptions.presets.columns);
                if (gridColumns && Array.isArray(gridColumns) && gridColumns.length > 0) {
                    // make sure that the checkbox selector is also visible if it is enabled
                    if (gridOptions.enableCheckboxSelector) {
                        var checkboxColumn = (Array.isArray(this._columnDefinitions) && this._columnDefinitions.length > 0) ? this._columnDefinitions[0] : null;
                        if (checkboxColumn && checkboxColumn.id === '_checkbox_selector' && gridColumns[0].id !== '_checkbox_selector') {
                            gridColumns.unshift(checkboxColumn);
                        }
                    }
                    // finally set the new presets columns (including checkbox selector if need be)
                    grid.setColumns(gridColumns);
                }
            }
            // attach external sorting (backend) when available or default onSort (dataView)
            if (gridOptions.enableSorting && !this.customDataView) {
                gridOptions.backendServiceApi ? this.sortService.attachBackendOnSort(grid, dataView) : this.sortService.attachLocalOnSort(grid, dataView);
            }
            // attach external filter (backend) when available or default onFilter (dataView)
            if (gridOptions.enableFiltering && !this.customDataView) {
                this.filterService.init(grid);
                // if user entered some Filter "presets", we need to reflect them all in the DOM
                if (gridOptions.presets && Array.isArray(gridOptions.presets.filters) && gridOptions.presets.filters.length > 0) {
                    this.filterService.populateColumnFilterSearchTerms();
                }
                gridOptions.backendServiceApi ? this.filterService.attachBackendOnFilter(grid, this.dataView) : this.filterService.attachLocalOnFilter(grid, this.dataView);
            }
            // if user set an onInit Backend, we'll run it right away (and if so, we also need to run preProcess, internalPostProcess & postProcess)
            if (gridOptions.backendServiceApi) {
                var backendApi = gridOptions.backendServiceApi;
                if (backendApi && backendApi.service && backendApi.service.init) {
                    backendApi.service.init(backendApi.options, gridOptions.pagination, this.grid);
                }
            }
            var _loop_1 = function (prop) {
                if (grid.hasOwnProperty(prop) && prop.startsWith('on')) {
                    this_1._eventHandler.subscribe(grid[prop], function (e, args) {
                        return _this.dispatchCustomEvent("" + slickgridEventPrefix + titleCase(prop), { eventData: e, args: args });
                    });
                }
            };
            var this_1 = this;
            // expose all Slick Grid Events through dispatch
            for (var prop in grid) {
                _loop_1(prop);
            }
            var _loop_2 = function (prop) {
                if (dataView.hasOwnProperty(prop) && prop.startsWith('on')) {
                    this_2._eventHandler.subscribe(dataView[prop], function (e, args) {
                        return _this.dispatchCustomEvent("" + slickgridEventPrefix + titleCase(prop), { eventData: e, args: args });
                    });
                }
            };
            var this_2 = this;
            // expose all Slick DataView Events through dispatch
            for (var prop in dataView) {
                _loop_2(prop);
            }
            // expose GridState Service changes event through dispatch
            this.subscriptions.push(this.gridStateService.onGridStateChanged.subscribe(function (gridStateChange) {
                _this.onGridStateChanged.emit(gridStateChange);
            }));
            // on cell click, mainly used with the columnDef.action callback
            this.gridEventService.attachOnCellChange(grid, dataView);
            this.gridEventService.attachOnClick(grid, dataView);
            if (dataView && grid) {
                this._eventHandler.subscribe(dataView.onRowCountChanged, function (e, args) {
                    grid.invalidate();
                });
                // without this, filtering data with local dataset will not always show correctly
                // also don't use "invalidateRows" since it destroys the entire row and as bad user experience when updating a row
                // see commit: https://github.com/ghiscoding/Angular-Slickgrid/commit/bb62c0aa2314a5d61188ff005ccb564577f08805
                if (gridOptions && gridOptions.enableFiltering && !gridOptions.enableRowDetailView) {
                    this._eventHandler.subscribe(dataView.onRowsChanged, function (e, args) {
                        if (args && args.rows && Array.isArray(args.rows)) {
                            args.rows.forEach(function (row) { return grid.updateRow(row); });
                            grid.render();
                        }
                    });
                }
            }
            // does the user have a colspan callback?
            if (gridOptions.colspanCallback) {
                this.dataView.getItemMetadata = function (rowNumber) {
                    var item = _this.dataView.getItem(rowNumber);
                    return gridOptions.colspanCallback(item);
                };
            }
        };
        AngularSlickgridComponent.prototype.attachBackendCallbackFunctions = function (gridOptions) {
            var _this = this;
            var backendApi = gridOptions.backendServiceApi;
            var serviceOptions = (backendApi && backendApi.service && backendApi.service.options) ? backendApi.service.options : {};
            var isExecuteCommandOnInit = (!serviceOptions) ? false : ((serviceOptions && serviceOptions.hasOwnProperty('executeProcessCommandOnInit')) ? serviceOptions['executeProcessCommandOnInit'] : true);
            // update backend filters (if need be) before the query runs
            if (backendApi) {
                var backendService = backendApi.service;
                // if user entered some any "presets", we need to reflect them all in the grid
                if (gridOptions && gridOptions.presets) {
                    // Filters "presets"
                    if (backendService && backendService.updateFilters && Array.isArray(gridOptions.presets.filters) && gridOptions.presets.filters.length > 0) {
                        backendService.updateFilters(gridOptions.presets.filters, true);
                    }
                    // Sorters "presets"
                    if (backendService && backendService.updateSorters && Array.isArray(gridOptions.presets.sorters) && gridOptions.presets.sorters.length > 0) {
                        backendService.updateSorters(undefined, gridOptions.presets.sorters);
                    }
                    // Pagination "presets"
                    if (backendService && backendService.updatePagination && gridOptions.presets.pagination) {
                        backendService.updatePagination(gridOptions.presets.pagination.pageNumber, gridOptions.presets.pagination.pageSize);
                    }
                }
                else {
                    var columnFilters = this.filterService.getColumnFilters();
                    if (columnFilters && backendService && backendService.updateFilters) {
                        backendService.updateFilters(columnFilters, false);
                    }
                }
            }
            if (backendApi && backendApi.service && (backendApi.onInit || isExecuteCommandOnInit)) {
                var query = (typeof backendApi.service.buildQuery === 'function') ? backendApi.service.buildQuery() : '';
                var process_1 = (isExecuteCommandOnInit) ? backendApi.process(query) : backendApi.onInit(query);
                // wrap this inside a setTimeout to avoid timing issue since the gridOptions needs to be ready before running this onInit
                setTimeout(function () {
                    // keep start time & end timestamps & return it after process execution
                    var startTime = new Date();
                    // run any pre-process, if defined, for example a spinner
                    if (backendApi.preProcess) {
                        backendApi.preProcess();
                    }
                    try {
                        // the processes can be Observables (like HttpClient) or Promises
                        if (process_1 instanceof Promise && process_1.then) {
                            process_1.then(function (processResult) { return executeBackendProcessesCallback(startTime, processResult, backendApi, _this.gridOptions); });
                        }
                        else if (rxjs.isObservable(process_1)) {
                            process_1.subscribe(function (processResult) { return executeBackendProcessesCallback(startTime, processResult, backendApi, _this.gridOptions); }, function (error) { return onBackendError(error, backendApi); });
                        }
                    }
                    catch (error) {
                        onBackendError(error, backendApi);
                    }
                });
            }
        };
        AngularSlickgridComponent.prototype.attachResizeHook = function (grid, options) {
            // expand/autofit columns on first page load
            if (grid && options.autoFitColumnsOnFirstLoad && options.enableAutoSizeColumns) {
                grid.autosizeColumns();
                // compensate anytime SlickGrid measureScrollbar is incorrect (only seems to happen in Chrome 1/5 computers)
                this.resizer.compensateHorizontalScroll(this.grid, this.gridOptions);
            }
            // auto-resize grid on browser resize
            if (this._fixedHeight || this._fixedWidth) {
                this.resizer.init(grid, { height: this._fixedHeight, width: this._fixedWidth });
            }
            else {
                this.resizer.init(grid);
            }
            if (options.enableAutoResize) {
                this.resizer.bindAutoResizeDataGrid();
                if (grid && options.autoFitColumnsOnFirstLoad && options.enableAutoSizeColumns) {
                    grid.autosizeColumns();
                }
            }
        };
        AngularSlickgridComponent.prototype.executeAfterDataviewCreated = function (grid, gridOptions, dataView) {
            // if user entered some Sort "presets", we need to reflect them all in the DOM
            if (gridOptions.enableSorting) {
                if (gridOptions.presets && Array.isArray(gridOptions.presets.sorters) && gridOptions.presets.sorters.length > 0) {
                    this.sortService.loadLocalPresets(grid, dataView);
                }
            }
        };
        AngularSlickgridComponent.prototype.mergeGridOptions = function (gridOptions) {
            gridOptions.gridId = this.gridId;
            gridOptions.gridContainerId = "slickGridContainer-" + this.gridId;
            // use jquery extend to deep merge & copy to avoid immutable properties being changed in GlobalGridOptions after a route change
            var options = $.extend(true, {}, GlobalGridOptions, this.forRootConfig, gridOptions);
            // using jQuery extend to do a deep clone has an unwanted side on objects and pageSizes but ES6 spread has other worst side effects
            // so we will just overwrite the pageSizes when needed, this is the only one causing issues so far.
            // jQuery wrote this on their docs:: On a deep extend, Object and Array are extended, but object wrappers on primitive types such as String, Boolean, and Number are not.
            if (gridOptions && gridOptions.backendServiceApi) {
                if (gridOptions.pagination && Array.isArray(gridOptions.pagination.pageSizes) && gridOptions.pagination.pageSizes.length > 0) {
                    options.pagination.pageSizes = gridOptions.pagination.pageSizes;
                }
            }
            // also make sure to show the header row if user have enabled filtering
            this._hideHeaderRowAfterPageLoad = (options.showHeaderRow === false);
            if (options.enableFiltering && !options.showHeaderRow) {
                options.showHeaderRow = options.enableFiltering;
            }
            return options;
        };
        /**
         * On a Pagination changed, we will trigger a Grid State changed with the new pagination info
         * Also if we use Row Selection or the Checkbox Selector, we need to reset any selection
         */
        AngularSlickgridComponent.prototype.paginationChanged = function (pagination) {
            if (this.gridOptions.enableRowSelection || this.gridOptions.enableCheckboxSelector) {
                this.gridService.setSelectedRows([]);
            }
            this.gridStateService.onGridStateChanged.next({
                change: { newValues: pagination, type: exports.GridStateType.pagination },
                gridState: this.gridStateService.getCurrentGridState()
            });
        };
        /**
         * When dataset changes, we need to refresh the entire grid UI & possibly resize it as well
         * @param dataset
         */
        AngularSlickgridComponent.prototype.refreshGridData = function (dataset, totalCount) {
            if (Array.isArray(dataset) && this.grid && this.dataView && typeof this.dataView.setItems === 'function') {
                this.dataView.setItems(dataset, this.gridOptions.datasetIdPropertyName);
                if (!this.gridOptions.backendServiceApi) {
                    this.dataView.reSort();
                }
                if (dataset) {
                    this.grid.invalidate();
                    this.grid.render();
                }
                if (this.gridOptions.backendServiceApi) {
                    // do we want to show pagination?
                    // if we have a backendServiceApi and the enablePagination is undefined, we'll assume that we do want to see it, else get that defined value
                    this.showPagination = ((this.gridOptions.backendServiceApi && this.gridOptions.enablePagination === undefined) ? true : this.gridOptions.enablePagination) || false;
                    // before merging the grid options, make sure that it has the totalItems count
                    // once we have that, we can merge and pass all these options to the pagination component
                    if (!this.gridOptions.pagination) {
                        this.gridOptions.pagination = (this.gridOptions.pagination) ? this.gridOptions.pagination : undefined;
                    }
                    if (this.gridOptions.pagination && totalCount !== undefined) {
                        this.gridOptions.pagination.totalItems = totalCount;
                    }
                    if (this.gridOptions.presets && this.gridOptions.presets.pagination && this.gridOptions.pagination) {
                        this.gridOptions.pagination.pageSize = this.gridOptions.presets.pagination.pageSize;
                        this.gridOptions.pagination.pageNumber = this.gridOptions.presets.pagination.pageNumber;
                    }
                    this.gridPaginationOptions = this.mergeGridOptions(this.gridOptions);
                }
                // resize the grid inside a slight timeout, in case other DOM element changed prior to the resize (like a filter/pagination changed)
                if (this.grid && this.gridOptions.enableAutoResize) {
                    var delay = this.gridOptions.autoResize && this.gridOptions.autoResize.delay;
                    this.resizer.resizeGrid(delay || 10);
                }
            }
        };
        /**
         * Dynamically change or update the column definitions list.
         * We will re-render the grid so that the new header and data shows up correctly.
         * If using i18n, we also need to trigger a re-translate of the column headers
         */
        AngularSlickgridComponent.prototype.updateColumnDefinitionsList = function (newColumnDefinitions) {
            // map/swap the internal library Editor to the SlickGrid Editor factory
            newColumnDefinitions = this.swapInternalEditorToSlickGridFactoryEditor(newColumnDefinitions);
            if (this.gridOptions.enableTranslate) {
                this.extensionService.translateColumnHeaders(false, newColumnDefinitions);
            }
            else {
                this.extensionService.renderColumnHeaders(newColumnDefinitions);
            }
            if (this.gridOptions && this.gridOptions.enableAutoSizeColumns) {
                this.grid.autosizeColumns();
            }
        };
        /** Toggle the filter row displayed on first row
         * @param isShowing
         */
        AngularSlickgridComponent.prototype.showHeaderRow = function (isShowing) {
            this.grid.setHeaderRowVisibility(isShowing);
            return isShowing;
        };
        /** Toggle the filter row displayed on first row */
        AngularSlickgridComponent.prototype.toggleHeaderRow = function () {
            var isShowing = !this.grid.getOptions().showHeaderRow;
            this.grid.setHeaderRowVisibility(isShowing);
            return isShowing;
        };
        //
        // private functions
        // ------------------
        /** Dispatch of Custom Event, which by default will bubble & is cancelable */
        AngularSlickgridComponent.prototype.dispatchCustomEvent = function (eventName, data, isBubbling, isCancelable) {
            if (isBubbling === void 0) { isBubbling = true; }
            if (isCancelable === void 0) { isCancelable = true; }
            var eventInit = { bubbles: isBubbling, cancelable: isCancelable };
            if (data) {
                eventInit.detail = data;
            }
            return this.elm.nativeElement.dispatchEvent(new CustomEvent(eventName, eventInit));
        };
        /** Load the Editor Collection asynchronously and replace the "collection" property when Observable resolves */
        AngularSlickgridComponent.prototype.loadEditorCollectionAsync = function (column) {
            var _this = this;
            var collectionAsync = column && column.editor && column.editor.collectionAsync;
            if (collectionAsync instanceof rxjs.Observable) {
                this.subscriptions.push(collectionAsync.subscribe(function (resolvedCollection) { return _this.updateEditorCollection(column, resolvedCollection); }));
            }
        };
        /**
         * For convenience to the user, we provide the property "editor" as an Angular-Slickgrid editor complex object
         * however "editor" is used internally by SlickGrid for it's own Editor Factory
         * so in our lib we will swap "editor" and copy it into a new property called "internalColumnEditor"
         * then take back "editor.model" and make it the new "editor" so that SlickGrid Editor Factory still works
         */
        AngularSlickgridComponent.prototype.swapInternalEditorToSlickGridFactoryEditor = function (columnDefinitions) {
            var _this = this;
            return columnDefinitions.map(function (column) {
                // on every Editor that have a "collectionAsync", resolve the data and assign it to the "collection" property
                if (column.editor && column.editor.collectionAsync) {
                    _this.loadEditorCollectionAsync(column);
                }
                return __assign({}, column, { editor: column.editor && column.editor.model, internalColumnEditor: __assign({}, column.editor) });
            });
        };
        /**
         * Update the Editor "collection" property from an async call resolved
         * Since this is called after the async call resolves, the pointer will not be the same as the "column" argument passed.
         * Once we found the new pointer, we will reassign the "editor" and "collection" to the "internalColumnEditor" so it has newest collection
         */
        AngularSlickgridComponent.prototype.updateEditorCollection = function (column, newCollection) {
            column.editor.collection = newCollection;
            // find the new column reference pointer
            var columns = this.grid.getColumns();
            if (Array.isArray(columns)) {
                var columnRef = columns.find(function (col) { return col.id === column.id; });
                columnRef.internalColumnEditor = column.editor;
            }
        };
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], AngularSlickgridComponent.prototype, "onAngularGridCreated", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], AngularSlickgridComponent.prototype, "onDataviewCreated", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], AngularSlickgridComponent.prototype, "onGridCreated", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], AngularSlickgridComponent.prototype, "onGridInitialized", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], AngularSlickgridComponent.prototype, "onBeforeGridCreate", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], AngularSlickgridComponent.prototype, "onBeforeGridDestroy", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], AngularSlickgridComponent.prototype, "onAfterGridDestroyed", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], AngularSlickgridComponent.prototype, "onGridStateChanged", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AngularSlickgridComponent.prototype, "customDataView", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], AngularSlickgridComponent.prototype, "gridId", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AngularSlickgridComponent.prototype, "gridOptions", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Number),
            __metadata("design:paramtypes", [Number])
        ], AngularSlickgridComponent.prototype, "gridHeight", null);
        __decorate([
            core.Input(),
            __metadata("design:type", Number),
            __metadata("design:paramtypes", [Number])
        ], AngularSlickgridComponent.prototype, "gridWidth", null);
        __decorate([
            core.Input(),
            __metadata("design:type", Array),
            __metadata("design:paramtypes", [Array])
        ], AngularSlickgridComponent.prototype, "columnDefinitions", null);
        __decorate([
            core.Input(),
            __metadata("design:type", Array),
            __metadata("design:paramtypes", [Array])
        ], AngularSlickgridComponent.prototype, "dataset", null);
        AngularSlickgridComponent = __decorate([
            core.Injectable(),
            core.Component({
                selector: 'angular-slickgrid',
                template: "<div id=\"slickGridContainer-{{gridId}}\" class=\"gridPane\" [style.width]=\"gridWidthString\">\r\n    <div attr.id='{{gridId}}' class=\"slickgrid-container\" style=\"width: 100%\" [style.height]=\"gridHeightString\">\r\n    </div>\r\n\r\n    <slick-pagination id=\"slickPagingContainer-{{gridId}}\"\r\n        *ngIf=\"showPagination\"\r\n        (onPaginationChanged)=\"paginationChanged($event)\"\r\n        [dataView]=\"dataView\"\r\n        [gridPaginationOptions]=\"gridPaginationOptions\">\r\n    </slick-pagination>\r\n</div>\r\n",
                providers: [
                    // make everything transient (non-singleton)
                    AngularUtilService,
                    AutoTooltipExtension,
                    CellExternalCopyManagerExtension,
                    CheckboxSelectorExtension,
                    ColumnPickerExtension,
                    DraggableGroupingExtension,
                    ExtensionService,
                    ExportService,
                    ExtensionUtility,
                    FilterFactory,
                    FilterService,
                    GraphqlService,
                    GridEventService,
                    GridMenuExtension,
                    GridService,
                    GridStateService,
                    GroupingAndColspanService,
                    GroupItemMetaProviderExtension,
                    HeaderButtonExtension,
                    HeaderMenuExtension,
                    ResizerService,
                    RowDetailViewExtension,
                    RowMoveManagerExtension,
                    RowSelectionExtension,
                    SharedService,
                    SortService,
                    SlickgridConfig
                ]
            }),
            __param(13, core.Inject('config')),
            __metadata("design:paramtypes", [core.ElementRef,
                ExportService,
                ExtensionService,
                ExtensionUtility,
                FilterService,
                GridService,
                GridEventService,
                GridStateService,
                GroupingAndColspanService,
                ResizerService,
                SharedService,
                SortService,
                core$1.TranslateService, Object])
        ], AngularSlickgridComponent);
        return AngularSlickgridComponent;
    }());

    var AngularSlickgridModule = /** @class */ (function () {
        function AngularSlickgridModule() {
        }
        AngularSlickgridModule_1 = AngularSlickgridModule;
        AngularSlickgridModule.forRoot = function (config) {
            if (config === void 0) { config = {}; }
            return {
                ngModule: AngularSlickgridModule_1,
                providers: [
                    { provide: 'config', useValue: config },
                    AngularUtilService,
                    CollectionService,
                    FilterFactory,
                    GraphqlService,
                    GridOdataService
                ]
            };
        };
        var AngularSlickgridModule_1;
        AngularSlickgridModule = AngularSlickgridModule_1 = __decorate([
            core.NgModule({
                imports: [
                    common.CommonModule,
                    core$1.TranslateModule
                ],
                declarations: [
                    AngularSlickgridComponent,
                    SlickPaginationComponent
                ],
                exports: [
                    AngularSlickgridComponent,
                    SlickPaginationComponent
                ],
                entryComponents: [AngularSlickgridComponent]
            })
        ], AngularSlickgridModule);
        return AngularSlickgridModule;
    }());

    exports.Aggregators = Aggregators;
    exports.AngularSlickgridComponent = AngularSlickgridComponent;
    exports.AngularSlickgridModule = AngularSlickgridModule;
    exports.AngularUtilService = AngularUtilService;
    exports.AutoTooltipExtension = AutoTooltipExtension;
    exports.CellExternalCopyManagerExtension = CellExternalCopyManagerExtension;
    exports.CheckboxSelectorExtension = CheckboxSelectorExtension;
    exports.CollectionService = CollectionService;
    exports.ColumnPickerExtension = ColumnPickerExtension;
    exports.DraggableGroupingExtension = DraggableGroupingExtension;
    exports.Editors = Editors;
    exports.ExportService = ExportService;
    exports.ExtensionService = ExtensionService;
    exports.ExtensionUtility = ExtensionUtility;
    exports.FilterConditions = FilterConditions;
    exports.FilterFactory = FilterFactory;
    exports.FilterService = FilterService;
    exports.Filters = Filters;
    exports.Formatters = Formatters;
    exports.GraphqlService = GraphqlService;
    exports.GridEventService = GridEventService;
    exports.GridMenuExtension = GridMenuExtension;
    exports.GridOdataService = GridOdataService;
    exports.GridService = GridService;
    exports.GridStateService = GridStateService;
    exports.GroupItemMetaProviderExtension = GroupItemMetaProviderExtension;
    exports.GroupTotalFormatters = GroupTotalFormatters;
    exports.GroupingAndColspanService = GroupingAndColspanService;
    exports.HeaderButtonExtension = HeaderButtonExtension;
    exports.HeaderMenuExtension = HeaderMenuExtension;
    exports.OdataService = OdataService;
    exports.ResizerService = ResizerService;
    exports.RowDetailViewExtension = RowDetailViewExtension;
    exports.RowMoveManagerExtension = RowMoveManagerExtension;
    exports.RowSelectionExtension = RowSelectionExtension;
    exports.SharedService = SharedService;
    exports.SlickPaginationComponent = SlickPaginationComponent;
    exports.SlickgridConfig = SlickgridConfig;
    exports.SortService = SortService;
    exports.Sorters = Sorters;
    exports.addToArrayWhenNotExists = addToArrayWhenNotExists;
    exports.addWhiteSpaces = addWhiteSpaces;
    exports.castToPromise = castToPromise;
    exports.charArraysEqual = charArraysEqual;
    exports.decimalFormatted = decimalFormatted;
    exports.executeBackendProcessesCallback = executeBackendProcessesCallback;
    exports.findOrDefault = findOrDefault;
    exports.formatNumber = formatNumber;
    exports.getDescendantProperty = getDescendantProperty;
    exports.getScrollBarWidth = getScrollBarWidth;
    exports.htmlDecode = htmlDecode;
    exports.htmlEncode = htmlEncode;
    exports.htmlEntityDecode = htmlEntityDecode;
    exports.htmlEntityEncode = htmlEntityEncode;
    exports.mapFlatpickrDateFormatWithFieldType = mapFlatpickrDateFormatWithFieldType;
    exports.mapMomentDateFormatWithFieldType = mapMomentDateFormatWithFieldType;
    exports.mapOperatorByFieldType = mapOperatorByFieldType;
    exports.mapOperatorType = mapOperatorType;
    exports.onBackendError = onBackendError;
    exports.parseBoolean = parseBoolean;
    exports.parseUtcDate = parseUtcDate;
    exports.sanitizeHtmlToText = sanitizeHtmlToText;
    exports.titleCase = titleCase;
    exports.toCamelCase = toCamelCase;
    exports.toKebabCase = toKebabCase;
    exports.toSnakeCase = toSnakeCase;
    exports.uniqueArray = uniqueArray;
    exports.uniqueObjectArray = uniqueObjectArray;
    exports.unsubscribeAllObservables = unsubscribeAllObservables;
    exports.ɵa = AvgAggregator;
    exports.ɵb = MinAggregator;
    exports.ɵba = stringFilterCondition;
    exports.ɵbb = testFilterCondition;
    exports.ɵbc = AutoCompleteFilter;
    exports.ɵbd = CompoundDateFilter;
    exports.ɵbe = CompoundInputFilter;
    exports.ɵbf = CompoundInputNumberFilter;
    exports.ɵbg = CompoundInputPasswordFilter;
    exports.ɵbh = CompoundSliderFilter;
    exports.ɵbi = InputFilter;
    exports.ɵbj = InputMaskFilter;
    exports.ɵbk = InputNumberFilter;
    exports.ɵbl = InputPasswordFilter;
    exports.ɵbm = MultipleSelectFilter;
    exports.ɵbn = SelectFilter;
    exports.ɵbo = NativeSelectFilter;
    exports.ɵbp = SingleSelectFilter;
    exports.ɵbq = SliderFilter;
    exports.ɵbr = arrayObjectToCsvFormatter;
    exports.ɵbs = arrayToCsvFormatter;
    exports.ɵbt = boldFormatter;
    exports.ɵbu = checkboxFormatter;
    exports.ɵbv = checkmarkFormatter;
    exports.ɵbw = complexObjectFormatter;
    exports.ɵbx = collectionFormatter;
    exports.ɵby = collectionEditorFormatter;
    exports.ɵbz = getAssociatedDateFormatter;
    exports.ɵc = MaxAggregator;
    exports.ɵca = deleteIconFormatter;
    exports.ɵcb = decimalFormatter;
    exports.ɵcc = dollarFormatter;
    exports.ɵcd = dollarColoredFormatter;
    exports.ɵce = dollarColoredBoldFormatter;
    exports.ɵcf = editIconFormatter;
    exports.ɵcg = hyperlinkFormatter;
    exports.ɵch = iconFormatter;
    exports.ɵci = infoIconFormatter;
    exports.ɵcj = italicFormatter;
    exports.ɵck = lowercaseFormatter;
    exports.ɵcl = maskFormatter;
    exports.ɵcm = multipleFormatter;
    exports.ɵcn = percentFormatter;
    exports.ɵco = percentCompleteFormatter;
    exports.ɵcp = percentCompleteBarFormatter;
    exports.ɵcq = percentSymbolFormatter;
    exports.ɵcr = progressBarFormatter;
    exports.ɵcs = translateFormatter;
    exports.ɵct = translateBooleanFormatter;
    exports.ɵcu = uppercaseFormatter;
    exports.ɵcv = yesNoFormatter;
    exports.ɵcw = avgTotalsFormatter;
    exports.ɵcx = avgTotalsDollarFormatter;
    exports.ɵcy = avgTotalsPercentageFormatter;
    exports.ɵcz = maxTotalsFormatter;
    exports.ɵd = SumAggregator;
    exports.ɵda = minTotalsFormatter;
    exports.ɵdb = sumTotalsFormatter;
    exports.ɵdc = sumTotalsBoldFormatter;
    exports.ɵdd = sumTotalsColoredFormatter;
    exports.ɵde = sumTotalsDollarFormatter;
    exports.ɵdf = sumTotalsDollarBoldFormatter;
    exports.ɵdg = sumTotalsDollarColoredFormatter;
    exports.ɵdh = sumTotalsDollarColoredBoldFormatter;
    exports.ɵdi = dateSorter;
    exports.ɵdj = dateIsoSorter;
    exports.ɵdk = dateEuroSorter;
    exports.ɵdl = dateEuroShortSorter;
    exports.ɵdm = dateUsSorter;
    exports.ɵdn = dateUsShortSorter;
    exports.ɵdo = numericSorter;
    exports.ɵdp = objectStringSorter;
    exports.ɵdq = stringSorter;
    exports.ɵe = AutoCompleteEditor;
    exports.ɵf = CheckboxEditor;
    exports.ɵg = DateEditor;
    exports.ɵh = FloatEditor;
    exports.ɵi = IntegerEditor;
    exports.ɵj = LongTextEditor;
    exports.ɵk = MultipleSelectEditor;
    exports.ɵl = SelectEditor;
    exports.ɵm = SingleSelectEditor;
    exports.ɵn = SliderEditor;
    exports.ɵo = TextEditor;
    exports.ɵp = executeMappedCondition;
    exports.ɵq = booleanFilterCondition;
    exports.ɵr = collectionSearchFilterCondition;
    exports.ɵs = dateEuroFilterCondition;
    exports.ɵt = dateEuroShortFilterCondition;
    exports.ɵu = dateFilterCondition;
    exports.ɵv = dateIsoFilterCondition;
    exports.ɵw = dateUtcFilterCondition;
    exports.ɵx = dateUsFilterCondition;
    exports.ɵy = dateUsShortFilterCondition;
    exports.ɵz = numberFilterCondition;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=angular-slickgrid.umd.js.map
