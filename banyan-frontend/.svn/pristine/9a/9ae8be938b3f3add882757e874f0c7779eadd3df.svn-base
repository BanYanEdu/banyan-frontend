import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { ExtensionName } from '../models/index';
import { ExtensionUtility } from './extensionUtility';
import { SharedService } from '../services/shared.service';
let CheckboxSelectorExtension = class CheckboxSelectorExtension {
    constructor(extensionUtility, sharedService) {
        this.extensionUtility = extensionUtility;
        this.sharedService = sharedService;
    }
    dispose() {
        if (this._addon && this._addon.destroy) {
            this._addon.destroy();
        }
    }
    /**
     * Create the plugin before the Grid creation, else it will behave oddly.
     * Mostly because the column definitions might change after the grid creation
     */
    create(columnDefinitions, gridOptions) {
        if (Array.isArray(columnDefinitions) && gridOptions) {
            // dynamically import the SlickGrid plugin (addon) with RequireJS
            this.extensionUtility.loadExtensionDynamically(ExtensionName.checkboxSelector);
            if (!this._addon) {
                this._addon = new Slick.CheckboxSelectColumn(gridOptions.checkboxSelector || {});
            }
            const selectionColumn = this._addon.getColumnDefinition();
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
    }
    register(rowSelectionPlugin) {
        if (this.sharedService && this.sharedService.grid && this.sharedService.gridOptions) {
            // the plugin has to be created BEFORE the grid (else it behaves oddly), but we can only watch grid events AFTER the grid is created
            this.sharedService.grid.registerPlugin(this._addon);
            // this also requires the Row Selection Model to be registered as well
            if (!rowSelectionPlugin || !this.sharedService.grid.getSelectionModel()) {
                this.extensionUtility.loadExtensionDynamically(ExtensionName.rowSelection);
                rowSelectionPlugin = new Slick.RowSelectionModel(this.sharedService.gridOptions.rowSelectionOptions || {});
                this.sharedService.grid.setSelectionModel(rowSelectionPlugin);
            }
            // user might want to pre-select some rows
            // the setTimeout is because of timing issue with styling (row selection happen but rows aren't highlighted properly)
            if (this.sharedService.gridOptions.preselectedRows && rowSelectionPlugin && this.sharedService.grid.getSelectionModel()) {
                setTimeout(() => this._addon.selectRows(this.sharedService.gridOptions.preselectedRows), 0);
            }
            return rowSelectionPlugin;
        }
        return null;
    }
};
CheckboxSelectorExtension = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [ExtensionUtility, SharedService])
], CheckboxSelectorExtension);
export { CheckboxSelectorExtension };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3hTZWxlY3RvckV4dGVuc2lvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvZXh0ZW5zaW9ucy9jaGVja2JveFNlbGVjdG9yRXh0ZW5zaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBcUIsYUFBYSxFQUFjLE1BQU0saUJBQWlCLENBQUM7QUFDL0UsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDdEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBTTNELElBQWEseUJBQXlCLEdBQXRDLE1BQWEseUJBQXlCO0lBR3BDLFlBQW9CLGdCQUFrQyxFQUFVLGFBQTRCO1FBQXhFLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFBVSxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtJQUFJLENBQUM7SUFFakcsT0FBTztRQUNMLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRTtZQUN0QyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ3ZCO0lBQ0gsQ0FBQztJQUVEOzs7T0FHRztJQUNILE1BQU0sQ0FBQyxpQkFBMkIsRUFBRSxXQUF1QjtRQUN6RCxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsSUFBSSxXQUFXLEVBQUU7WUFDbkQsaUVBQWlFO1lBQ2pFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyx3QkFBd0IsQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUMvRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDaEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLElBQUksRUFBRSxDQUFDLENBQUM7YUFDbEY7WUFDRCxNQUFNLGVBQWUsR0FBVyxJQUFJLENBQUMsTUFBTSxDQUFDLG1CQUFtQixFQUFFLENBQUM7WUFDbEUsSUFBSSxPQUFPLGVBQWUsS0FBSyxRQUFRLEVBQUU7Z0JBQ3ZDLGVBQWUsQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUM7Z0JBQ3pDLGVBQWUsQ0FBQyx1QkFBdUIsR0FBRyxJQUFJLENBQUM7Z0JBQy9DLGVBQWUsQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUM7Z0JBQzNDLGVBQWUsQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7Z0JBQ3hDLGVBQWUsQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUM7Z0JBQzdDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQzthQUM1QztZQUNELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztTQUNwQjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELFFBQVEsQ0FBQyxrQkFBd0I7UUFDL0IsSUFBSSxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFO1lBQ25GLG9JQUFvSTtZQUNwSSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRXBELHNFQUFzRTtZQUN0RSxJQUFJLENBQUMsa0JBQWtCLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxFQUFFO2dCQUN2RSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsd0JBQXdCLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUMzRSxrQkFBa0IsR0FBRyxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsSUFBSSxFQUFFLENBQUMsQ0FBQztnQkFDM0csSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsa0JBQWtCLENBQUMsQ0FBQzthQUMvRDtZQUVELDBDQUEwQztZQUMxQyxxSEFBcUg7WUFDckgsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxlQUFlLElBQUksa0JBQWtCLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsRUFBRTtnQkFDdkgsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQzdGO1lBRUQsT0FBTyxrQkFBa0IsQ0FBQztTQUMzQjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztDQUNGLENBQUE7QUExRFkseUJBQXlCO0lBRHJDLFVBQVUsRUFBRTs2Q0FJMkIsZ0JBQWdCLEVBQXlCLGFBQWE7R0FIakYseUJBQXlCLENBMERyQztTQTFEWSx5QkFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbHVtbiwgRXh0ZW5zaW9uLCBFeHRlbnNpb25OYW1lLCBHcmlkT3B0aW9uIH0gZnJvbSAnLi4vbW9kZWxzL2luZGV4JztcclxuaW1wb3J0IHsgRXh0ZW5zaW9uVXRpbGl0eSB9IGZyb20gJy4vZXh0ZW5zaW9uVXRpbGl0eSc7XHJcbmltcG9ydCB7IFNoYXJlZFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9zaGFyZWQuc2VydmljZSc7XHJcblxyXG4vLyB1c2luZyBleHRlcm5hbCBub24tdHlwZWQganMgbGlicmFyaWVzXHJcbmRlY2xhcmUgdmFyIFNsaWNrOiBhbnk7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBDaGVja2JveFNlbGVjdG9yRXh0ZW5zaW9uIGltcGxlbWVudHMgRXh0ZW5zaW9uIHtcclxuICBwcml2YXRlIF9hZGRvbjogYW55O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGV4dGVuc2lvblV0aWxpdHk6IEV4dGVuc2lvblV0aWxpdHksIHByaXZhdGUgc2hhcmVkU2VydmljZTogU2hhcmVkU2VydmljZSkgeyB9XHJcblxyXG4gIGRpc3Bvc2UoKSB7XHJcbiAgICBpZiAodGhpcy5fYWRkb24gJiYgdGhpcy5fYWRkb24uZGVzdHJveSkge1xyXG4gICAgICB0aGlzLl9hZGRvbi5kZXN0cm95KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGUgdGhlIHBsdWdpbiBiZWZvcmUgdGhlIEdyaWQgY3JlYXRpb24sIGVsc2UgaXQgd2lsbCBiZWhhdmUgb2RkbHkuXHJcbiAgICogTW9zdGx5IGJlY2F1c2UgdGhlIGNvbHVtbiBkZWZpbml0aW9ucyBtaWdodCBjaGFuZ2UgYWZ0ZXIgdGhlIGdyaWQgY3JlYXRpb25cclxuICAgKi9cclxuICBjcmVhdGUoY29sdW1uRGVmaW5pdGlvbnM6IENvbHVtbltdLCBncmlkT3B0aW9uczogR3JpZE9wdGlvbikge1xyXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoY29sdW1uRGVmaW5pdGlvbnMpICYmIGdyaWRPcHRpb25zKSB7XHJcbiAgICAgIC8vIGR5bmFtaWNhbGx5IGltcG9ydCB0aGUgU2xpY2tHcmlkIHBsdWdpbiAoYWRkb24pIHdpdGggUmVxdWlyZUpTXHJcbiAgICAgIHRoaXMuZXh0ZW5zaW9uVXRpbGl0eS5sb2FkRXh0ZW5zaW9uRHluYW1pY2FsbHkoRXh0ZW5zaW9uTmFtZS5jaGVja2JveFNlbGVjdG9yKTtcclxuICAgICAgaWYgKCF0aGlzLl9hZGRvbikge1xyXG4gICAgICAgIHRoaXMuX2FkZG9uID0gbmV3IFNsaWNrLkNoZWNrYm94U2VsZWN0Q29sdW1uKGdyaWRPcHRpb25zLmNoZWNrYm94U2VsZWN0b3IgfHwge30pO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IHNlbGVjdGlvbkNvbHVtbjogQ29sdW1uID0gdGhpcy5fYWRkb24uZ2V0Q29sdW1uRGVmaW5pdGlvbigpO1xyXG4gICAgICBpZiAodHlwZW9mIHNlbGVjdGlvbkNvbHVtbiA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICBzZWxlY3Rpb25Db2x1bW4uZXhjbHVkZUZyb21FeHBvcnQgPSB0cnVlO1xyXG4gICAgICAgIHNlbGVjdGlvbkNvbHVtbi5leGNsdWRlRnJvbUNvbHVtblBpY2tlciA9IHRydWU7XHJcbiAgICAgICAgc2VsZWN0aW9uQ29sdW1uLmV4Y2x1ZGVGcm9tR3JpZE1lbnUgPSB0cnVlO1xyXG4gICAgICAgIHNlbGVjdGlvbkNvbHVtbi5leGNsdWRlRnJvbVF1ZXJ5ID0gdHJ1ZTtcclxuICAgICAgICBzZWxlY3Rpb25Db2x1bW4uZXhjbHVkZUZyb21IZWFkZXJNZW51ID0gdHJ1ZTtcclxuICAgICAgICBjb2x1bW5EZWZpbml0aW9ucy51bnNoaWZ0KHNlbGVjdGlvbkNvbHVtbik7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHRoaXMuX2FkZG9uO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICByZWdpc3Rlcihyb3dTZWxlY3Rpb25QbHVnaW4/OiBhbnkpIHtcclxuICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zKSB7XHJcbiAgICAgIC8vIHRoZSBwbHVnaW4gaGFzIHRvIGJlIGNyZWF0ZWQgQkVGT1JFIHRoZSBncmlkIChlbHNlIGl0IGJlaGF2ZXMgb2RkbHkpLCBidXQgd2UgY2FuIG9ubHkgd2F0Y2ggZ3JpZCBldmVudHMgQUZURVIgdGhlIGdyaWQgaXMgY3JlYXRlZFxyXG4gICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZC5yZWdpc3RlclBsdWdpbih0aGlzLl9hZGRvbik7XHJcblxyXG4gICAgICAvLyB0aGlzIGFsc28gcmVxdWlyZXMgdGhlIFJvdyBTZWxlY3Rpb24gTW9kZWwgdG8gYmUgcmVnaXN0ZXJlZCBhcyB3ZWxsXHJcbiAgICAgIGlmICghcm93U2VsZWN0aW9uUGx1Z2luIHx8ICF0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZC5nZXRTZWxlY3Rpb25Nb2RlbCgpKSB7XHJcbiAgICAgICAgdGhpcy5leHRlbnNpb25VdGlsaXR5LmxvYWRFeHRlbnNpb25EeW5hbWljYWxseShFeHRlbnNpb25OYW1lLnJvd1NlbGVjdGlvbik7XHJcbiAgICAgICAgcm93U2VsZWN0aW9uUGx1Z2luID0gbmV3IFNsaWNrLlJvd1NlbGVjdGlvbk1vZGVsKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5yb3dTZWxlY3Rpb25PcHRpb25zIHx8IHt9KTtcclxuICAgICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZC5zZXRTZWxlY3Rpb25Nb2RlbChyb3dTZWxlY3Rpb25QbHVnaW4pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyB1c2VyIG1pZ2h0IHdhbnQgdG8gcHJlLXNlbGVjdCBzb21lIHJvd3NcclxuICAgICAgLy8gdGhlIHNldFRpbWVvdXQgaXMgYmVjYXVzZSBvZiB0aW1pbmcgaXNzdWUgd2l0aCBzdHlsaW5nIChyb3cgc2VsZWN0aW9uIGhhcHBlbiBidXQgcm93cyBhcmVuJ3QgaGlnaGxpZ2h0ZWQgcHJvcGVybHkpXHJcbiAgICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMucHJlc2VsZWN0ZWRSb3dzICYmIHJvd1NlbGVjdGlvblBsdWdpbiAmJiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZC5nZXRTZWxlY3Rpb25Nb2RlbCgpKSB7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLl9hZGRvbi5zZWxlY3RSb3dzKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5wcmVzZWxlY3RlZFJvd3MpLCAwKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHJvd1NlbGVjdGlvblBsdWdpbjtcclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxufVxyXG4iXX0=