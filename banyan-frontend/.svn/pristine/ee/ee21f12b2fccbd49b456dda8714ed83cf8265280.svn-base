import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Constants } from '../constants';
import { ExtensionName } from '../models/index';
import { SharedService } from '../services/shared.service';
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
                case ExtensionName.autoTooltip:
                    require('slickgrid/plugins/slick.autotooltips');
                    break;
                case ExtensionName.cellExternalCopyManager:
                    require('slickgrid/plugins/slick.cellexternalcopymanager');
                    break;
                case ExtensionName.checkboxSelector:
                    require('slickgrid/plugins/slick.checkboxselectcolumn');
                    break;
                case ExtensionName.columnPicker:
                    require('slickgrid/controls/slick.columnpicker');
                    break;
                case ExtensionName.draggableGrouping:
                    require('slickgrid/plugins/slick.draggablegrouping');
                    break;
                case ExtensionName.gridMenu:
                    require('slickgrid/controls/slick.gridmenu');
                    break;
                case ExtensionName.groupItemMetaProvider:
                    require('slickgrid/slick.groupitemmetadataprovider');
                    break;
                case ExtensionName.headerButton:
                    require('slickgrid/plugins/slick.headerbuttons');
                    break;
                case ExtensionName.headerMenu:
                    require('slickgrid/plugins/slick.headermenu');
                    break;
                case ExtensionName.rowSelection:
                    require('slickgrid/plugins/slick.rowselectionmodel');
                    break;
                case ExtensionName.rowDetailView:
                    require('slickgrid/plugins/slick.rowdetailview');
                    break;
                case ExtensionName.rowMoveManager:
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
                for (var items_1 = tslib_1.__values(items), items_1_1 = items_1.next(); !items_1_1.done; items_1_1 = items_1.next()) {
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
    ExtensionUtility = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [SharedService, TranslateService])
    ], ExtensionUtility);
    return ExtensionUtility;
}());
export { ExtensionUtility };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0ZW5zaW9uVXRpbGl0eS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvZXh0ZW5zaW9ucy9leHRlbnNpb25VdGlsaXR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDekMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUszRDtJQUNFLDBCQUFvQixhQUE0QixFQUFVLFNBQTJCO1FBQWpFLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQVUsY0FBUyxHQUFULFNBQVMsQ0FBa0I7SUFBSSxDQUFDO0lBRTFGOzs7O09BSUc7SUFDSCxpREFBc0IsR0FBdEIsVUFBdUIsS0FBWSxFQUFFLEtBQWE7UUFDaEQsT0FBTyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUMsRUFBTyxFQUFFLENBQVMsSUFBSyxPQUFBLEtBQUssS0FBSyxDQUFDLEVBQVgsQ0FBVyxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxtREFBd0IsR0FBeEIsVUFBeUIsYUFBNEI7UUFDbkQsSUFBSTtZQUNGLFFBQVEsYUFBYSxFQUFFO2dCQUNyQixLQUFLLGFBQWEsQ0FBQyxXQUFXO29CQUM1QixPQUFPLENBQUMsc0NBQXNDLENBQUMsQ0FBQztvQkFDaEQsTUFBTTtnQkFDUixLQUFLLGFBQWEsQ0FBQyx1QkFBdUI7b0JBQ3hDLE9BQU8sQ0FBQyxpREFBaUQsQ0FBQyxDQUFDO29CQUMzRCxNQUFNO2dCQUNSLEtBQUssYUFBYSxDQUFDLGdCQUFnQjtv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QztJQTVIVSxnQkFBZ0I7UUFENUIsVUFBVSxFQUFFO2lEQUV3QixhQUFhLEVBQXFCLGdCQUFnQjtPQUQxRSxnQkFBZ0IsQ0E2SDVCO0lBQUQsdUJBQUM7Q0FBQSxBQTdIRCxJQTZIQztTQTdIWSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcclxuaW1wb3J0IHsgQ29uc3RhbnRzIH0gZnJvbSAnLi4vY29uc3RhbnRzJztcclxuaW1wb3J0IHsgRXh0ZW5zaW9uTmFtZSB9IGZyb20gJy4uL21vZGVscy9pbmRleCc7XHJcbmltcG9ydCB7IFNoYXJlZFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9zaGFyZWQuc2VydmljZSc7XHJcblxyXG5kZWNsYXJlIGZ1bmN0aW9uIHJlcXVpcmUobmFtZTogc3RyaW5nKTtcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEV4dGVuc2lvblV0aWxpdHkge1xyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc2hhcmVkU2VydmljZTogU2hhcmVkU2VydmljZSwgcHJpdmF0ZSB0cmFuc2xhdGU6IFRyYW5zbGF0ZVNlcnZpY2UpIHsgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW1vdmUgYSBjb2x1bW4gZnJvbSB0aGUgZ3JpZCBieSBpdCdzIGluZGV4IGluIHRoZSBncmlkXHJcbiAgICogQHBhcmFtIGFycmF5IGlucHV0XHJcbiAgICogQHBhcmFtIGluZGV4XHJcbiAgICovXHJcbiAgYXJyYXlSZW1vdmVJdGVtQnlJbmRleChhcnJheTogYW55W10sIGluZGV4OiBudW1iZXIpIHtcclxuICAgIHJldHVybiBhcnJheS5maWx0ZXIoKGVsOiBhbnksIGk6IG51bWJlcikgPT4gaW5kZXggIT09IGkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTG9hZCBTbGlja0dyaWQgRXh0ZW5zaW9uIChDb250cm9sL1BsdWdpbikgZHluYW1pY2FsbHkgKG9uIGRlbWFuZClcclxuICAgKiBUaGlzIHdpbGwgYmFzaWNhbGx5IG9ubHkgbG9hZCB0aGUgZXh0ZW5zaW9uIHdoZW4gdXNlciBlbmFibGVzIHRoZSBmZWF0dXJlXHJcbiAgICogQHBhcmFtIGV4dGVuc2lvbk5hbWVcclxuICAgKi9cclxuICBsb2FkRXh0ZW5zaW9uRHluYW1pY2FsbHkoZXh0ZW5zaW9uTmFtZTogRXh0ZW5zaW9uTmFtZSk6IGFueSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBzd2l0Y2ggKGV4dGVuc2lvbk5hbWUpIHtcclxuICAgICAgICBjYXNlIEV4dGVuc2lvbk5hbWUuYXV0b1Rvb2x0aXA6XHJcbiAgICAgICAgICByZXF1aXJlKCdzbGlja2dyaWQvcGx1Z2lucy9zbGljay5hdXRvdG9vbHRpcHMnKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgRXh0ZW5zaW9uTmFtZS5jZWxsRXh0ZXJuYWxDb3B5TWFuYWdlcjpcclxuICAgICAgICAgIHJlcXVpcmUoJ3NsaWNrZ3JpZC9wbHVnaW5zL3NsaWNrLmNlbGxleHRlcm5hbGNvcHltYW5hZ2VyJyk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIEV4dGVuc2lvbk5hbWUuY2hlY2tib3hTZWxlY3RvcjpcclxuICAgICAgICAgIHJlcXVpcmUoJ3NsaWNrZ3JpZC9wbHVnaW5zL3NsaWNrLmNoZWNrYm94c2VsZWN0Y29sdW1uJyk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIEV4dGVuc2lvbk5hbWUuY29sdW1uUGlja2VyOlxyXG4gICAgICAgICAgcmVxdWlyZSgnc2xpY2tncmlkL2NvbnRyb2xzL3NsaWNrLmNvbHVtbnBpY2tlcicpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBFeHRlbnNpb25OYW1lLmRyYWdnYWJsZUdyb3VwaW5nOlxyXG4gICAgICAgICAgcmVxdWlyZSgnc2xpY2tncmlkL3BsdWdpbnMvc2xpY2suZHJhZ2dhYmxlZ3JvdXBpbmcnKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgRXh0ZW5zaW9uTmFtZS5ncmlkTWVudTpcclxuICAgICAgICAgIHJlcXVpcmUoJ3NsaWNrZ3JpZC9jb250cm9scy9zbGljay5ncmlkbWVudScpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBFeHRlbnNpb25OYW1lLmdyb3VwSXRlbU1ldGFQcm92aWRlcjpcclxuICAgICAgICAgIHJlcXVpcmUoJ3NsaWNrZ3JpZC9zbGljay5ncm91cGl0ZW1tZXRhZGF0YXByb3ZpZGVyJyk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIEV4dGVuc2lvbk5hbWUuaGVhZGVyQnV0dG9uOlxyXG4gICAgICAgICAgcmVxdWlyZSgnc2xpY2tncmlkL3BsdWdpbnMvc2xpY2suaGVhZGVyYnV0dG9ucycpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBFeHRlbnNpb25OYW1lLmhlYWRlck1lbnU6XHJcbiAgICAgICAgICByZXF1aXJlKCdzbGlja2dyaWQvcGx1Z2lucy9zbGljay5oZWFkZXJtZW51Jyk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIEV4dGVuc2lvbk5hbWUucm93U2VsZWN0aW9uOlxyXG4gICAgICAgICAgcmVxdWlyZSgnc2xpY2tncmlkL3BsdWdpbnMvc2xpY2sucm93c2VsZWN0aW9ubW9kZWwnKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgRXh0ZW5zaW9uTmFtZS5yb3dEZXRhaWxWaWV3OlxyXG4gICAgICAgICAgcmVxdWlyZSgnc2xpY2tncmlkL3BsdWdpbnMvc2xpY2sucm93ZGV0YWlsdmlldycpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBFeHRlbnNpb25OYW1lLnJvd01vdmVNYW5hZ2VyOlxyXG4gICAgICAgICAgcmVxdWlyZSgnc2xpY2tncmlkL3BsdWdpbnMvc2xpY2sucm93bW92ZW1hbmFnZXInKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgIC8vIGRvIG5vdGhpbmcsIHdlIGZhbGwgaGVyZSB3aGVuIHVzaW5nIEFuZ3VsYXIgYW5kIFJlcXVpcmVKU1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRnJvbSBhIEdyaWQgTWVudSBvYmplY3QgcHJvcGVydHkgbmFtZSwgd2Ugd2lsbCByZXR1cm4gdGhlIGNvcnJlY3QgdGl0bGUgb3V0cHV0IHN0cmluZyBmb2xsb3dpbmcgdGhpcyBvcmRlclxyXG4gICAqIDEtIGlmIHVzZXIgcHJvdmlkZWQgYSB0aXRsZSwgdXNlIGl0IGFzIHRoZSBvdXRwdXQgdGl0bGVcclxuICAgKiAyLSBlbHNlIGlmIHVzZXIgcHJvdmlkZWQgYSB0aXRsZSBrZXksIHVzZSBpdCB0byB0cmFuc2xhdGUgdGhlIG91dHB1dCB0aXRsZVxyXG4gICAqIDMtIGVsc2UgaWYgbm90aGluZyBpcyBwcm92aWRlZCB1c2VcclxuICAgKi9cclxuICBnZXRQaWNrZXJUaXRsZU91dHB1dFN0cmluZyhwcm9wTmFtZTogc3RyaW5nLCBwaWNrZXJOYW1lOiAnZ3JpZE1lbnUnIHwgJ2NvbHVtblBpY2tlcicpIHtcclxuICAgIGxldCBvdXRwdXQgPSAnJztcclxuICAgIGNvbnN0IHBpY2tlciA9IHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucyAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnNbcGlja2VyTmFtZV0gfHwge307XHJcbiAgICBjb25zdCBlbmFibGVUcmFuc2xhdGUgPSB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLmVuYWJsZVRyYW5zbGF0ZSB8fCBmYWxzZTtcclxuXHJcbiAgICBjb25zdCB0aXRsZSA9IHBpY2tlciAmJiBwaWNrZXJbcHJvcE5hbWVdO1xyXG4gICAgY29uc3QgdGl0bGVLZXkgPSBwaWNrZXIgJiYgcGlja2VyW2Ake3Byb3BOYW1lfUtleWBdO1xyXG5cclxuICAgIGlmICh0aXRsZUtleSkge1xyXG4gICAgICBvdXRwdXQgPSB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KHRpdGxlS2V5IHx8ICcgJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzd2l0Y2ggKHByb3BOYW1lKSB7XHJcbiAgICAgICAgY2FzZSAnY3VzdG9tVGl0bGUnOlxyXG4gICAgICAgICAgb3V0cHV0ID0gdGl0bGUgfHwgKGVuYWJsZVRyYW5zbGF0ZSA/IHRoaXMudHJhbnNsYXRlLmluc3RhbnQoJ0NPTU1BTkRTJykgOiBDb25zdGFudHMuVEVYVF9DT01NQU5EUyk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdjb2x1bW5UaXRsZSc6XHJcbiAgICAgICAgICBvdXRwdXQgPSB0aXRsZSB8fCAoZW5hYmxlVHJhbnNsYXRlID8gdGhpcy50cmFuc2xhdGUuaW5zdGFudCgnQ09MVU1OUycpIDogQ29uc3RhbnRzLlRFWFRfQ09MVU1OUyk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdmb3JjZUZpdFRpdGxlJzpcclxuICAgICAgICAgIG91dHB1dCA9IHRpdGxlIHx8IChlbmFibGVUcmFuc2xhdGUgPyB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KCdGT1JDRV9GSVRfQ09MVU1OUycpIDogQ29uc3RhbnRzLlRFWFRfRk9SQ0VfRklUX0NPTFVNTlMpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnc3luY1Jlc2l6ZVRpdGxlJzpcclxuICAgICAgICAgIG91dHB1dCA9IHRpdGxlIHx8IChlbmFibGVUcmFuc2xhdGUgPyB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KCdTWU5DSFJPTk9VU19SRVNJWkUnKSA6IENvbnN0YW50cy5URVhUX1NZTkNIUk9OT1VTX1JFU0laRSk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgb3V0cHV0ID0gdGl0bGU7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG91dHB1dDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNvcnQgaXRlbXMgKGJ5IHBvaW50ZXJzKSBpbiBhbiBhcnJheSBieSBhIHByb3BlcnR5IG5hbWVcclxuICAgKiBAcGFyYW1zIGl0ZW1zIGFycmF5XHJcbiAgICogQHBhcmFtIHByb3BlcnR5IG5hbWUgdG8gc29ydCB3aXRoXHJcbiAgICovXHJcbiAgc29ydEl0ZW1zKGl0ZW1zOiBhbnlbXSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpIHtcclxuICAgIC8vIHNvcnQgdGhlIGN1c3RvbSBpdGVtcyBieSB0aGVpciBwb3NpdGlvbiBpbiB0aGUgbGlzdFxyXG4gICAgaXRlbXMuc29ydCgoaXRlbUE6IGFueSwgaXRlbUI6IGFueSkgPT4ge1xyXG4gICAgICBpZiAoaXRlbUEgJiYgaXRlbUIgJiYgaXRlbUEuaGFzT3duUHJvcGVydHkocHJvcGVydHlOYW1lKSAmJiBpdGVtQi5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eU5hbWUpKSB7XHJcbiAgICAgICAgcmV0dXJuIGl0ZW1BW3Byb3BlcnR5TmFtZV0gLSBpdGVtQltwcm9wZXJ0eU5hbWVdO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiAtMTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqIFRyYW5zbGF0ZSB0aGUgYW4gYXJyYXkgb2YgaXRlbXMgZnJvbSBhbiBpbnB1dCBrZXkgYW5kIGFzc2lnbiB0byB0aGUgb3V0cHV0IGtleSAqL1xyXG4gIHRyYW5zbGF0ZUl0ZW1zKGl0ZW1zOiBhbnlbXSwgaW5wdXRLZXk6IHN0cmluZywgb3V0cHV0S2V5OiBzdHJpbmcpIHtcclxuICAgIGlmIChBcnJheS5pc0FycmF5KGl0ZW1zKSkge1xyXG4gICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpIHtcclxuICAgICAgICBpZiAoaXRlbVtpbnB1dEtleV0pIHtcclxuICAgICAgICAgIGl0ZW1bb3V0cHV0S2V5XSA9IHRoaXMudHJhbnNsYXRlLmluc3RhbnQoaXRlbVtpbnB1dEtleV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=