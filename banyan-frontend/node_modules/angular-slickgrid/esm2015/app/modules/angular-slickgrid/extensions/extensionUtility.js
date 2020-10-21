import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Constants } from '../constants';
import { ExtensionName } from '../models/index';
import { SharedService } from '../services/shared.service';
let ExtensionUtility = class ExtensionUtility {
    constructor(sharedService, translate) {
        this.sharedService = sharedService;
        this.translate = translate;
    }
    /**
     * Remove a column from the grid by it's index in the grid
     * @param array input
     * @param index
     */
    arrayRemoveItemByIndex(array, index) {
        return array.filter((el, i) => index !== i);
    }
    /**
     * Load SlickGrid Extension (Control/Plugin) dynamically (on demand)
     * This will basically only load the extension when user enables the feature
     * @param extensionName
     */
    loadExtensionDynamically(extensionName) {
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
    }
    /**
     * From a Grid Menu object property name, we will return the correct title output string following this order
     * 1- if user provided a title, use it as the output title
     * 2- else if user provided a title key, use it to translate the output title
     * 3- else if nothing is provided use
     */
    getPickerTitleOutputString(propName, pickerName) {
        let output = '';
        const picker = this.sharedService.gridOptions && this.sharedService.gridOptions[pickerName] || {};
        const enableTranslate = this.sharedService.gridOptions && this.sharedService.gridOptions.enableTranslate || false;
        const title = picker && picker[propName];
        const titleKey = picker && picker[`${propName}Key`];
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
    }
    /**
     * Sort items (by pointers) in an array by a property name
     * @params items array
     * @param property name to sort with
     */
    sortItems(items, propertyName) {
        // sort the custom items by their position in the list
        items.sort((itemA, itemB) => {
            if (itemA && itemB && itemA.hasOwnProperty(propertyName) && itemB.hasOwnProperty(propertyName)) {
                return itemA[propertyName] - itemB[propertyName];
            }
            return -1;
        });
    }
    /** Translate the an array of items from an input key and assign to the output key */
    translateItems(items, inputKey, outputKey) {
        if (Array.isArray(items)) {
            for (const item of items) {
                if (item[inputKey]) {
                    item[outputKey] = this.translate.instant(item[inputKey]);
                }
            }
        }
    }
};
ExtensionUtility = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [SharedService, TranslateService])
], ExtensionUtility);
export { ExtensionUtility };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0ZW5zaW9uVXRpbGl0eS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvZXh0ZW5zaW9ucy9leHRlbnNpb25VdGlsaXR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDekMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUszRCxJQUFhLGdCQUFnQixHQUE3QixNQUFhLGdCQUFnQjtJQUMzQixZQUFvQixhQUE0QixFQUFVLFNBQTJCO1FBQWpFLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQVUsY0FBUyxHQUFULFNBQVMsQ0FBa0I7SUFBSSxDQUFDO0lBRTFGOzs7O09BSUc7SUFDSCxzQkFBc0IsQ0FBQyxLQUFZLEVBQUUsS0FBYTtRQUNoRCxPQUFPLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFPLEVBQUUsQ0FBUyxFQUFFLEVBQUUsQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCx3QkFBd0IsQ0FBQyxhQUE0QjtRQUNuRCxJQUFJO1lBQ0YsUUFBUSxhQUFhLEVBQUU7Z0JBQ3JCLEtBQUssYUFBYSxDQUFDLFdBQVc7b0JBQzVCLE9BQU8sQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDO29CQUNoRCxNQUFNO2dCQUNSLEtBQUssYUFBYSxDQUFDLHVCQUF1QjtvQkFDeEMsT0FBTyxDQUFDLGlEQUFpRCxDQUFDLENBQUM7b0JBQzNELE1BQU07Z0JBQ1IsS0FBSyxhQUFhLENB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NkNBRXdCLGFBQWEsRUFBcUIsZ0JBQWdCO0dBRDFFLGdCQUFnQixDQTZINUI7U0E3SFksZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XHJcbmltcG9ydCB7IENvbnN0YW50cyB9IGZyb20gJy4uL2NvbnN0YW50cyc7XHJcbmltcG9ydCB7IEV4dGVuc2lvbk5hbWUgfSBmcm9tICcuLi9tb2RlbHMvaW5kZXgnO1xyXG5pbXBvcnQgeyBTaGFyZWRTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvc2hhcmVkLnNlcnZpY2UnO1xyXG5cclxuZGVjbGFyZSBmdW5jdGlvbiByZXF1aXJlKG5hbWU6IHN0cmluZyk7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBFeHRlbnNpb25VdGlsaXR5IHtcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNoYXJlZFNlcnZpY2U6IFNoYXJlZFNlcnZpY2UsIHByaXZhdGUgdHJhbnNsYXRlOiBUcmFuc2xhdGVTZXJ2aWNlKSB7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVtb3ZlIGEgY29sdW1uIGZyb20gdGhlIGdyaWQgYnkgaXQncyBpbmRleCBpbiB0aGUgZ3JpZFxyXG4gICAqIEBwYXJhbSBhcnJheSBpbnB1dFxyXG4gICAqIEBwYXJhbSBpbmRleFxyXG4gICAqL1xyXG4gIGFycmF5UmVtb3ZlSXRlbUJ5SW5kZXgoYXJyYXk6IGFueVtdLCBpbmRleDogbnVtYmVyKSB7XHJcbiAgICByZXR1cm4gYXJyYXkuZmlsdGVyKChlbDogYW55LCBpOiBudW1iZXIpID0+IGluZGV4ICE9PSBpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIExvYWQgU2xpY2tHcmlkIEV4dGVuc2lvbiAoQ29udHJvbC9QbHVnaW4pIGR5bmFtaWNhbGx5IChvbiBkZW1hbmQpXHJcbiAgICogVGhpcyB3aWxsIGJhc2ljYWxseSBvbmx5IGxvYWQgdGhlIGV4dGVuc2lvbiB3aGVuIHVzZXIgZW5hYmxlcyB0aGUgZmVhdHVyZVxyXG4gICAqIEBwYXJhbSBleHRlbnNpb25OYW1lXHJcbiAgICovXHJcbiAgbG9hZEV4dGVuc2lvbkR5bmFtaWNhbGx5KGV4dGVuc2lvbk5hbWU6IEV4dGVuc2lvbk5hbWUpOiBhbnkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgc3dpdGNoIChleHRlbnNpb25OYW1lKSB7XHJcbiAgICAgICAgY2FzZSBFeHRlbnNpb25OYW1lLmF1dG9Ub29sdGlwOlxyXG4gICAgICAgICAgcmVxdWlyZSgnc2xpY2tncmlkL3BsdWdpbnMvc2xpY2suYXV0b3Rvb2x0aXBzJyk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIEV4dGVuc2lvbk5hbWUuY2VsbEV4dGVybmFsQ29weU1hbmFnZXI6XHJcbiAgICAgICAgICByZXF1aXJlKCdzbGlja2dyaWQvcGx1Z2lucy9zbGljay5jZWxsZXh0ZXJuYWxjb3B5bWFuYWdlcicpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBFeHRlbnNpb25OYW1lLmNoZWNrYm94U2VsZWN0b3I6XHJcbiAgICAgICAgICByZXF1aXJlKCdzbGlja2dyaWQvcGx1Z2lucy9zbGljay5jaGVja2JveHNlbGVjdGNvbHVtbicpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBFeHRlbnNpb25OYW1lLmNvbHVtblBpY2tlcjpcclxuICAgICAgICAgIHJlcXVpcmUoJ3NsaWNrZ3JpZC9jb250cm9scy9zbGljay5jb2x1bW5waWNrZXInKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgRXh0ZW5zaW9uTmFtZS5kcmFnZ2FibGVHcm91cGluZzpcclxuICAgICAgICAgIHJlcXVpcmUoJ3NsaWNrZ3JpZC9wbHVnaW5zL3NsaWNrLmRyYWdnYWJsZWdyb3VwaW5nJyk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIEV4dGVuc2lvbk5hbWUuZ3JpZE1lbnU6XHJcbiAgICAgICAgICByZXF1aXJlKCdzbGlja2dyaWQvY29udHJvbHMvc2xpY2suZ3JpZG1lbnUnKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgRXh0ZW5zaW9uTmFtZS5ncm91cEl0ZW1NZXRhUHJvdmlkZXI6XHJcbiAgICAgICAgICByZXF1aXJlKCdzbGlja2dyaWQvc2xpY2suZ3JvdXBpdGVtbWV0YWRhdGFwcm92aWRlcicpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBFeHRlbnNpb25OYW1lLmhlYWRlckJ1dHRvbjpcclxuICAgICAgICAgIHJlcXVpcmUoJ3NsaWNrZ3JpZC9wbHVnaW5zL3NsaWNrLmhlYWRlcmJ1dHRvbnMnKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgRXh0ZW5zaW9uTmFtZS5oZWFkZXJNZW51OlxyXG4gICAgICAgICAgcmVxdWlyZSgnc2xpY2tncmlkL3BsdWdpbnMvc2xpY2suaGVhZGVybWVudScpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBFeHRlbnNpb25OYW1lLnJvd1NlbGVjdGlvbjpcclxuICAgICAgICAgIHJlcXVpcmUoJ3NsaWNrZ3JpZC9wbHVnaW5zL3NsaWNrLnJvd3NlbGVjdGlvbm1vZGVsJyk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIEV4dGVuc2lvbk5hbWUucm93RGV0YWlsVmlldzpcclxuICAgICAgICAgIHJlcXVpcmUoJ3NsaWNrZ3JpZC9wbHVnaW5zL3NsaWNrLnJvd2RldGFpbHZpZXcnKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgRXh0ZW5zaW9uTmFtZS5yb3dNb3ZlTWFuYWdlcjpcclxuICAgICAgICAgIHJlcXVpcmUoJ3NsaWNrZ3JpZC9wbHVnaW5zL3NsaWNrLnJvd21vdmVtYW5hZ2VyJyk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAvLyBkbyBub3RoaW5nLCB3ZSBmYWxsIGhlcmUgd2hlbiB1c2luZyBBbmd1bGFyIGFuZCBSZXF1aXJlSlNcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEZyb20gYSBHcmlkIE1lbnUgb2JqZWN0IHByb3BlcnR5IG5hbWUsIHdlIHdpbGwgcmV0dXJuIHRoZSBjb3JyZWN0IHRpdGxlIG91dHB1dCBzdHJpbmcgZm9sbG93aW5nIHRoaXMgb3JkZXJcclxuICAgKiAxLSBpZiB1c2VyIHByb3ZpZGVkIGEgdGl0bGUsIHVzZSBpdCBhcyB0aGUgb3V0cHV0IHRpdGxlXHJcbiAgICogMi0gZWxzZSBpZiB1c2VyIHByb3ZpZGVkIGEgdGl0bGUga2V5LCB1c2UgaXQgdG8gdHJhbnNsYXRlIHRoZSBvdXRwdXQgdGl0bGVcclxuICAgKiAzLSBlbHNlIGlmIG5vdGhpbmcgaXMgcHJvdmlkZWQgdXNlXHJcbiAgICovXHJcbiAgZ2V0UGlja2VyVGl0bGVPdXRwdXRTdHJpbmcocHJvcE5hbWU6IHN0cmluZywgcGlja2VyTmFtZTogJ2dyaWRNZW51JyB8ICdjb2x1bW5QaWNrZXInKSB7XHJcbiAgICBsZXQgb3V0cHV0ID0gJyc7XHJcbiAgICBjb25zdCBwaWNrZXIgPSB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zW3BpY2tlck5hbWVdIHx8IHt9O1xyXG4gICAgY29uc3QgZW5hYmxlVHJhbnNsYXRlID0gdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5lbmFibGVUcmFuc2xhdGUgfHwgZmFsc2U7XHJcblxyXG4gICAgY29uc3QgdGl0bGUgPSBwaWNrZXIgJiYgcGlja2VyW3Byb3BOYW1lXTtcclxuICAgIGNvbnN0IHRpdGxlS2V5ID0gcGlja2VyICYmIHBpY2tlcltgJHtwcm9wTmFtZX1LZXlgXTtcclxuXHJcbiAgICBpZiAodGl0bGVLZXkpIHtcclxuICAgICAgb3V0cHV0ID0gdGhpcy50cmFuc2xhdGUuaW5zdGFudCh0aXRsZUtleSB8fCAnICcpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc3dpdGNoIChwcm9wTmFtZSkge1xyXG4gICAgICAgIGNhc2UgJ2N1c3RvbVRpdGxlJzpcclxuICAgICAgICAgIG91dHB1dCA9IHRpdGxlIHx8IChlbmFibGVUcmFuc2xhdGUgPyB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KCdDT01NQU5EUycpIDogQ29uc3RhbnRzLlRFWFRfQ09NTUFORFMpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnY29sdW1uVGl0bGUnOlxyXG4gICAgICAgICAgb3V0cHV0ID0gdGl0bGUgfHwgKGVuYWJsZVRyYW5zbGF0ZSA/IHRoaXMudHJhbnNsYXRlLmluc3RhbnQoJ0NPTFVNTlMnKSA6IENvbnN0YW50cy5URVhUX0NPTFVNTlMpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnZm9yY2VGaXRUaXRsZSc6XHJcbiAgICAgICAgICBvdXRwdXQgPSB0aXRsZSB8fCAoZW5hYmxlVHJhbnNsYXRlID8gdGhpcy50cmFuc2xhdGUuaW5zdGFudCgnRk9SQ0VfRklUX0NPTFVNTlMnKSA6IENvbnN0YW50cy5URVhUX0ZPUkNFX0ZJVF9DT0xVTU5TKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ3N5bmNSZXNpemVUaXRsZSc6XHJcbiAgICAgICAgICBvdXRwdXQgPSB0aXRsZSB8fCAoZW5hYmxlVHJhbnNsYXRlID8gdGhpcy50cmFuc2xhdGUuaW5zdGFudCgnU1lOQ0hST05PVVNfUkVTSVpFJykgOiBDb25zdGFudHMuVEVYVF9TWU5DSFJPTk9VU19SRVNJWkUpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgIG91dHB1dCA9IHRpdGxlO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBvdXRwdXQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTb3J0IGl0ZW1zIChieSBwb2ludGVycykgaW4gYW4gYXJyYXkgYnkgYSBwcm9wZXJ0eSBuYW1lXHJcbiAgICogQHBhcmFtcyBpdGVtcyBhcnJheVxyXG4gICAqIEBwYXJhbSBwcm9wZXJ0eSBuYW1lIHRvIHNvcnQgd2l0aFxyXG4gICAqL1xyXG4gIHNvcnRJdGVtcyhpdGVtczogYW55W10sIHByb3BlcnR5TmFtZTogc3RyaW5nKSB7XHJcbiAgICAvLyBzb3J0IHRoZSBjdXN0b20gaXRlbXMgYnkgdGhlaXIgcG9zaXRpb24gaW4gdGhlIGxpc3RcclxuICAgIGl0ZW1zLnNvcnQoKGl0ZW1BOiBhbnksIGl0ZW1COiBhbnkpID0+IHtcclxuICAgICAgaWYgKGl0ZW1BICYmIGl0ZW1CICYmIGl0ZW1BLmhhc093blByb3BlcnR5KHByb3BlcnR5TmFtZSkgJiYgaXRlbUIuaGFzT3duUHJvcGVydHkocHJvcGVydHlOYW1lKSkge1xyXG4gICAgICAgIHJldHVybiBpdGVtQVtwcm9wZXJ0eU5hbWVdIC0gaXRlbUJbcHJvcGVydHlOYW1lXTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gLTE7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKiBUcmFuc2xhdGUgdGhlIGFuIGFycmF5IG9mIGl0ZW1zIGZyb20gYW4gaW5wdXQga2V5IGFuZCBhc3NpZ24gdG8gdGhlIG91dHB1dCBrZXkgKi9cclxuICB0cmFuc2xhdGVJdGVtcyhpdGVtczogYW55W10sIGlucHV0S2V5OiBzdHJpbmcsIG91dHB1dEtleTogc3RyaW5nKSB7XHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheShpdGVtcykpIHtcclxuICAgICAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zKSB7XHJcbiAgICAgICAgaWYgKGl0ZW1baW5wdXRLZXldKSB7XHJcbiAgICAgICAgICBpdGVtW291dHB1dEtleV0gPSB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KGl0ZW1baW5wdXRLZXldKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19