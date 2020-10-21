import * as tslib_1 from "tslib";
import { ApplicationRef, Injectable } from '@angular/core';
import { ExtensionName } from '../models/index';
import { ExtensionUtility } from './extensionUtility';
import { AngularUtilService } from '../services/angularUtilService';
import { FilterService } from '../services/filter.service';
import { SharedService } from '../services/shared.service';
import { addToArrayWhenNotExists, castToPromise, unsubscribeAllObservables } from '../services/utilities';
import { Observable } from 'rxjs';
import * as DOMPurify_ from 'dompurify';
const DOMPurify = DOMPurify_; // patch to fix rollup to work
const ROW_DETAIL_CONTAINER_PREFIX = 'container_';
const PRELOAD_CONTAINER_PREFIX = 'container_loading';
let RowDetailViewExtension = class RowDetailViewExtension {
    constructor(angularUtilService, appRef, extensionUtility, filterService, sharedService) {
        this.angularUtilService = angularUtilService;
        this.appRef = appRef;
        this.extensionUtility = extensionUtility;
        this.filterService = filterService;
        this.sharedService = sharedService;
        this._views = [];
        this._subscriptions = [];
        this._eventHandler = new Slick.EventHandler();
    }
    get eventHandler() {
        return this._eventHandler;
    }
    /** Dispose of the RowDetailView Extension */
    dispose() {
        // unsubscribe all SlickGrid events
        this._eventHandler.unsubscribeAll();
        if (this._addon && this._addon.destroy) {
            this._addon.destroy();
        }
        // also unsubscribe all RxJS subscriptions
        this._subscriptions = unsubscribeAllObservables(this._subscriptions);
        this.disposeAllViewComponents();
    }
    /** Dispose of all the opened Row Detail Panels Angular View Components */
    disposeAllViewComponents() {
        this._views.forEach((compRef) => this.disposeViewComponent(compRef));
        this._views = [];
    }
    /**
     * Create the plugin before the Grid creation, else it will behave oddly.
     * Mostly because the column definitions might change after the grid creation
     */
    create(columnDefinitions, gridOptions) {
        if (columnDefinitions && gridOptions) {
            // dynamically import the SlickGrid plugin (addon) with RequireJS
            this.extensionUtility.loadExtensionDynamically(ExtensionName.rowDetailView);
            if (!gridOptions.rowDetailView) {
                throw new Error('The Row Detail View requires options to be passed via the "rowDetailView" property of the Grid Options');
            }
            if (gridOptions && gridOptions.rowDetailView) {
                if (!this._addon) {
                    if (typeof gridOptions.rowDetailView.process === 'function') {
                        // we need to keep the user "process" method and replace it with our own execution method
                        // we do this because when we get the item detail, we need to call "onAsyncResponse.notify" for the plugin to work
                        this._userProcessFn = gridOptions.rowDetailView.process; // keep user's process method
                        gridOptions.rowDetailView.process = (item) => this.onProcessing(item); // replace process method & run our internal one
                    }
                    else {
                        throw new Error('You need to provide a "process" function for the Row Detail Extension to work properly');
                    }
                    // load the Preload & RowDetail Templates (could be straight HTML or Angular View/ViewModel)
                    // when those are Angular View/ViewModel, we need to create View Component & provide the html containers to the Plugin (preTemplate/postTemplate methods)
                    if (!gridOptions.rowDetailView.preTemplate) {
                        this._preloadComponent = gridOptions && gridOptions.rowDetailView && gridOptions.rowDetailView.preloadComponent;
                        gridOptions.rowDetailView.preTemplate = () => DOMPurify.sanitize(`<div class="${PRELOAD_CONTAINER_PREFIX}"></div>`);
                    }
                    if (!gridOptions.rowDetailView.postTemplate) {
                        this._viewComponent = gridOptions && gridOptions.rowDetailView && gridOptions.rowDetailView.viewComponent;
                        gridOptions.rowDetailView.postTemplate = (itemDetail) => DOMPurify.sanitize(`<div class="${ROW_DETAIL_CONTAINER_PREFIX}${itemDetail.id}"></div>`);
                    }
                    // finally register the Row Detail View Plugin
                    this._addon = new Slick.Plugins.RowDetailView(gridOptions.rowDetailView);
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
                rowSelectionPlugin = new Slick.RowSelectionModel(this.sharedService.gridOptions.rowSelectionOptions || { selectActiveRow: true });
                this.sharedService.grid.setSelectionModel(rowSelectionPlugin);
            }
            // hook all events
            if (this.sharedService.grid && this.sharedService.gridOptions.rowDetailView) {
                if (this.sharedService.gridOptions.rowDetailView.onExtensionRegistered) {
                    this.sharedService.gridOptions.rowDetailView.onExtensionRegistered(this._addon);
                }
                this._eventHandler.subscribe(this._addon.onAsyncResponse, (e, args) => {
                    if (this.sharedService.gridOptions.rowDetailView && typeof this.sharedService.gridOptions.rowDetailView.onAsyncResponse === 'function') {
                        this.sharedService.gridOptions.rowDetailView.onAsyncResponse(e, args);
                    }
                });
                this._eventHandler.subscribe(this._addon.onAsyncEndUpdate, (e, args) => {
                    // triggers after backend called "onAsyncResponse.notify()"
                    this.renderViewModel(args && args.item);
                    if (this.sharedService.gridOptions.rowDetailView && typeof this.sharedService.gridOptions.rowDetailView.onAsyncEndUpdate === 'function') {
                        this.sharedService.gridOptions.rowDetailView.onAsyncEndUpdate(e, args);
                    }
                });
                this._eventHandler.subscribe(this._addon.onAfterRowDetailToggle, (e, args) => {
                    // display preload template & re-render all the other Detail Views after toggling
                    // the preload View will eventually go away once the data gets loaded after the "onAsyncEndUpdate" event
                    this.renderPreloadView();
                    this.renderAllViewComponents();
                    if (this.sharedService.gridOptions.rowDetailView && typeof this.sharedService.gridOptions.rowDetailView.onAfterRowDetailToggle === 'function') {
                        this.sharedService.gridOptions.rowDetailView.onAfterRowDetailToggle(e, args);
                    }
                });
                this._eventHandler.subscribe(this._addon.onBeforeRowDetailToggle, (e, args) => {
                    // before toggling row detail, we need to create View Component if it doesn't exist
                    this.onBeforeRowDetailToggle(e, args);
                    if (this.sharedService.gridOptions.rowDetailView && typeof this.sharedService.gridOptions.rowDetailView.onBeforeRowDetailToggle === 'function') {
                        this.sharedService.gridOptions.rowDetailView.onBeforeRowDetailToggle(e, args);
                    }
                });
                this._eventHandler.subscribe(this._addon.onRowBackToViewportRange, (e, args) => {
                    // when row is back to viewport range, we will re-render the View Component(s)
                    this.onRowBackToViewportRange(e, args);
                    if (this.sharedService.gridOptions.rowDetailView && typeof this.sharedService.gridOptions.rowDetailView.onRowBackToViewportRange === 'function') {
                        this.sharedService.gridOptions.rowDetailView.onRowBackToViewportRange(e, args);
                    }
                });
                this._eventHandler.subscribe(this._addon.onRowOutOfViewportRange, (e, args) => {
                    if (this.sharedService.gridOptions.rowDetailView && typeof this.sharedService.gridOptions.rowDetailView.onRowOutOfViewportRange === 'function') {
                        this.sharedService.gridOptions.rowDetailView.onRowOutOfViewportRange(e, args);
                    }
                });
                // --
                // hook some events needed by the Plugin itself
                this._eventHandler.subscribe(this.sharedService.grid.onColumnsReordered, () => this.redrawAllViewComponents());
                // on sort, all row detail are collapsed so we can dispose of all the Views as well
                this._eventHandler.subscribe(this.sharedService.grid.onSort, () => this.disposeAllViewComponents());
                // on filter changed, we need to re-render all Views
                this._subscriptions.push(this.filterService.onFilterChanged.subscribe(() => this.redrawAllViewComponents()));
            }
            return this._addon;
        }
        return null;
    }
    // --
    // private functions
    // ------------------
    disposeViewComponent(expandedView) {
        const compRef = expandedView && expandedView.componentRef;
        if (compRef) {
            this.appRef.detachView(compRef.hostView);
            compRef.destroy();
            return expandedView;
        }
        return null;
    }
    /**
     * notify the onAsyncResponse with the "args.item" (required property)
     * the plugin will then use item to populate the row detail panel with the "postTemplate"
     * @param item
     */
    notifyTemplate(item) {
        if (this._addon) {
            this._addon.onAsyncResponse.notify({ item }, undefined, this);
        }
    }
    /**
     * On Processing, we will notify the plugin with the new item detail once backend server call completes
     * @param item
     */
    onProcessing(item) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (item && typeof this._userProcessFn === 'function') {
                let awaitedItemDetail;
                const userProcessFn = this._userProcessFn(item);
                // wait for the "userProcessFn", once resolved we will save it into the "collection"
                const response = yield userProcessFn;
                if (response.hasOwnProperty('id')) {
                    awaitedItemDetail = response; // from Promise
                }
                else if (response && response instanceof Observable || response instanceof Promise) {
                    awaitedItemDetail = yield castToPromise(response); // from Angular-http-client
                }
                if (!awaitedItemDetail || !awaitedItemDetail.hasOwnProperty('id')) {
                    throw new Error(`[Angular-Slickgrid] could not process the Row Detail, you must make sure that your "process" callback
          (a Promise or an HttpClient call returning an Observable) returns an item object that has an "id" property`);
                }
                // notify the plugin with the new item details
                this.notifyTemplate(awaitedItemDetail || {});
            }
        });
    }
    /**
     * Just before the row get expanded or collapsed we will do the following
     * First determine if the row is expanding or collapsing,
     * if it's expanding we will add it to our View Components reference array if we don't already have it
     * or if it's collapsing we will remove it from our View Components reference array
     */
    onBeforeRowDetailToggle(e, args) {
        // expanding
        if (args && args.item && args.item.__collapsed) {
            // expanding row detail
            const viewInfo = {
                id: args.item.id,
                dataContext: args.item
            };
            addToArrayWhenNotExists(this._views, viewInfo);
        }
        else {
            // collapsing, so dispose of the View/Component
            const foundViewIndex = this._views.findIndex((view) => view.id === args.item.id);
            if (foundViewIndex >= 0 && this._views.hasOwnProperty(foundViewIndex)) {
                const compRef = this._views[foundViewIndex].componentRef;
                this.appRef.detachView(compRef.hostView);
                compRef.destroy();
                this._views.splice(foundViewIndex, 1);
            }
        }
    }
    /** When Row comes back to Viewport Range, we need to redraw the View */
    onRowBackToViewportRange(e, args) {
        if (args && args.item) {
            this._views.forEach((view) => {
                if (view.id === args.item.id) {
                    this.redrawViewComponent(view);
                }
            });
        }
    }
    /** Redraw (re-render) all the expanded row detail View Components */
    redrawAllViewComponents() {
        this._views.forEach((compRef) => {
            this.redrawViewComponent(compRef);
        });
    }
    /** Render all the expanded row detail View Components */
    renderAllViewComponents() {
        this._views.forEach((view) => {
            if (view && view.dataContext) {
                this.renderViewModel(view.dataContext);
            }
        });
    }
    /** Redraw the necessary View Component */
    redrawViewComponent(createdView) {
        const containerElements = document.getElementsByClassName(`${ROW_DETAIL_CONTAINER_PREFIX}${createdView.id}`);
        if (containerElements && containerElements.length) {
            this.renderViewModel(createdView.dataContext);
        }
    }
    /** Render (or rerender) the View Component (Row Detail) */
    renderPreloadView() {
        const containerElements = document.getElementsByClassName(`${PRELOAD_CONTAINER_PREFIX}`);
        if (containerElements && containerElements.length) {
            this.angularUtilService.createAngularComponentAppendToDom(this._preloadComponent, containerElements[0], true);
        }
    }
    /** Render (or rerender) the View Component (Row Detail) */
    renderViewModel(item) {
        const containerElements = document.getElementsByClassName(`${ROW_DETAIL_CONTAINER_PREFIX}${item.id}`);
        if (containerElements && containerElements.length) {
            const componentOutput = this.angularUtilService.createAngularComponentAppendToDom(this._viewComponent, containerElements[0], true);
            if (componentOutput && componentOutput.componentRef && componentOutput.componentRef.instance) {
                Object.assign(componentOutput.componentRef.instance, { model: item });
                const viewObj = this._views.find((obj) => obj.id === item.id);
                if (viewObj) {
                    viewObj.componentRef = componentOutput.componentRef;
                }
            }
        }
    }
};
RowDetailViewExtension = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [AngularUtilService,
        ApplicationRef,
        ExtensionUtility,
        FilterService,
        SharedService])
], RowDetailViewExtension);
export { RowDetailViewExtension };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93RGV0YWlsVmlld0V4dGVuc2lvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvZXh0ZW5zaW9ucy9yb3dEZXRhaWxWaWV3RXh0ZW5zaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsY0FBYyxFQUFnQixVQUFVLEVBQTBCLE1BQU0sZUFBZSxDQUFDO0FBQ2pHLE9BQU8sRUFBcUIsYUFBYSxFQUFpQyxNQUFNLGlCQUFpQixDQUFDO0FBQ2xHLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDM0QsT0FBTyxFQUFFLHVCQUF1QixFQUFFLGFBQWEsRUFBRSx5QkFBeUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzFHLE9BQU8sRUFBRSxVQUFVLEVBQXlCLE1BQU0sTUFBTSxDQUFDO0FBQ3pELE9BQU8sS0FBSyxVQUFVLE1BQU0sV0FBVyxDQUFDO0FBQ3hDLE1BQU0sU0FBUyxHQUFHLFVBQVUsQ0FBQyxDQUFDLDhCQUE4QjtBQUs1RCxNQUFNLDJCQUEyQixHQUFHLFlBQVksQ0FBQztBQUNqRCxNQUFNLHdCQUF3QixHQUFHLG1CQUFtQixDQUFDO0FBU3JELElBQWEsc0JBQXNCLEdBQW5DLE1BQWEsc0JBQXNCO0lBVWpDLFlBQ1Usa0JBQXNDLEVBQ3RDLE1BQXNCLEVBQ3RCLGdCQUFrQyxFQUNsQyxhQUE0QixFQUM1QixhQUE0QjtRQUo1Qix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBQ3RDLFdBQU0sR0FBTixNQUFNLENBQWdCO1FBQ3RCLHFCQUFnQixHQUFo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UmVmLCBJbmplY3RhYmxlLCBUeXBlLCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbHVtbiwgRXh0ZW5zaW9uLCBFeHRlbnNpb25OYW1lLCBHcmlkT3B0aW9uLCBTbGlja0V2ZW50SGFuZGxlciB9IGZyb20gJy4uL21vZGVscy9pbmRleCc7XHJcbmltcG9ydCB7IEV4dGVuc2lvblV0aWxpdHkgfSBmcm9tICcuL2V4dGVuc2lvblV0aWxpdHknO1xyXG5pbXBvcnQgeyBBbmd1bGFyVXRpbFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9hbmd1bGFyVXRpbFNlcnZpY2UnO1xyXG5pbXBvcnQgeyBGaWx0ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvZmlsdGVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTaGFyZWRTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvc2hhcmVkLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBhZGRUb0FycmF5V2hlbk5vdEV4aXN0cywgY2FzdFRvUHJvbWlzZSwgdW5zdWJzY3JpYmVBbGxPYnNlcnZhYmxlcyB9IGZyb20gJy4uL3NlcnZpY2VzL3V0aWxpdGllcyc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgKiBhcyBET01QdXJpZnlfIGZyb20gJ2RvbXB1cmlmeSc7XHJcbmNvbnN0IERPTVB1cmlmeSA9IERPTVB1cmlmeV87IC8vIHBhdGNoIHRvIGZpeCByb2xsdXAgdG8gd29ya1xyXG5cclxuLy8gdXNpbmcgZXh0ZXJuYWwgbm9uLXR5cGVkIGpzIGxpYnJhcmllc1xyXG5kZWNsYXJlIHZhciBTbGljazogYW55O1xyXG5cclxuY29uc3QgUk9XX0RFVEFJTF9DT05UQUlORVJfUFJFRklYID0gJ2NvbnRhaW5lcl8nO1xyXG5jb25zdCBQUkVMT0FEX0NPTlRBSU5FUl9QUkVGSVggPSAnY29udGFpbmVyX2xvYWRpbmcnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBDcmVhdGVkVmlldyB7XHJcbiAgaWQ6IHN0cmluZyB8IG51bWJlcjtcclxuICBkYXRhQ29udGV4dDogYW55O1xyXG4gIGNvbXBvbmVudFJlZj86IENvbXBvbmVudFJlZjxhbnk+O1xyXG59XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBSb3dEZXRhaWxWaWV3RXh0ZW5zaW9uIGltcGxlbWVudHMgRXh0ZW5zaW9uIHtcclxuICByb3dEZXRhaWxDb250YWluZXI6IFZpZXdDb250YWluZXJSZWY7XHJcbiAgcHJpdmF0ZSBfYWRkb246IGFueTtcclxuICBwcml2YXRlIF9ldmVudEhhbmRsZXI6IFNsaWNrRXZlbnRIYW5kbGVyO1xyXG4gIHByaXZhdGUgX3ByZWxvYWRDb21wb25lbnQ6IFR5cGU8b2JqZWN0PjtcclxuICBwcml2YXRlIF92aWV3czogQ3JlYXRlZFZpZXdbXSA9IFtdO1xyXG4gIHByaXZhdGUgX3ZpZXdDb21wb25lbnQ6IFR5cGU8b2JqZWN0PjtcclxuICBwcml2YXRlIF9zdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xyXG4gIHByaXZhdGUgX3VzZXJQcm9jZXNzRm46IChpdGVtOiBhbnkpID0+IFByb21pc2U8YW55PiB8IE9ic2VydmFibGU8YW55PiB8IFN1YmplY3Q8YW55PjtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGFuZ3VsYXJVdGlsU2VydmljZTogQW5ndWxhclV0aWxTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBhcHBSZWY6IEFwcGxpY2F0aW9uUmVmLFxyXG4gICAgcHJpdmF0ZSBleHRlbnNpb25VdGlsaXR5OiBFeHRlbnNpb25VdGlsaXR5LFxyXG4gICAgcHJpdmF0ZSBmaWx0ZXJTZXJ2aWNlOiBGaWx0ZXJTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBzaGFyZWRTZXJ2aWNlOiBTaGFyZWRTZXJ2aWNlLFxyXG4gICkge1xyXG4gICAgdGhpcy5fZXZlbnRIYW5kbGVyID0gbmV3IFNsaWNrLkV2ZW50SGFuZGxlcigpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGV2ZW50SGFuZGxlcigpOiBTbGlja0V2ZW50SGFuZGxlciB7XHJcbiAgICByZXR1cm4gdGhpcy5fZXZlbnRIYW5kbGVyO1xyXG4gIH1cclxuXHJcbiAgLyoqIERpc3Bvc2Ugb2YgdGhlIFJvd0RldGFpbFZpZXcgRXh0ZW5zaW9uICovXHJcbiAgZGlzcG9zZSgpIHtcclxuICAgIC8vIHVuc3Vic2NyaWJlIGFsbCBTbGlja0dyaWQgZXZlbnRzXHJcbiAgICB0aGlzLl9ldmVudEhhbmRsZXIudW5zdWJzY3JpYmVBbGwoKTtcclxuXHJcbiAgICBpZiAodGhpcy5fYWRkb24gJiYgdGhpcy5fYWRkb24uZGVzdHJveSkge1xyXG4gICAgICB0aGlzLl9hZGRvbi5kZXN0cm95KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gYWxzbyB1bnN1YnNjcmliZSBhbGwgUnhKUyBzdWJzY3JpcHRpb25zXHJcbiAgICB0aGlzLl9zdWJzY3JpcHRpb25zID0gdW5zdWJzY3JpYmVBbGxPYnNlcnZhYmxlcyh0aGlzLl9zdWJzY3JpcHRpb25zKTtcclxuICAgIHRoaXMuZGlzcG9zZUFsbFZpZXdDb21wb25lbnRzKCk7XHJcbiAgfVxyXG5cclxuICAvKiogRGlzcG9zZSBvZiBhbGwgdGhlIG9wZW5lZCBSb3cgRGV0YWlsIFBhbmVscyBBbmd1bGFyIFZpZXcgQ29tcG9uZW50cyAqL1xyXG4gIGRpc3Bvc2VBbGxWaWV3Q29tcG9uZW50cygpIHtcclxuICAgIHRoaXMuX3ZpZXdzLmZvckVhY2goKGNvbXBSZWYpID0+IHRoaXMuZGlzcG9zZVZpZXdDb21wb25lbnQoY29tcFJlZikpO1xyXG4gICAgdGhpcy5fdmlld3MgPSBbXTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZSB0aGUgcGx1Z2luIGJlZm9yZSB0aGUgR3JpZCBjcmVhdGlvbiwgZWxzZSBpdCB3aWxsIGJlaGF2ZSBvZGRseS5cclxuICAgKiBNb3N0bHkgYmVjYXVzZSB0aGUgY29sdW1uIGRlZmluaXRpb25zIG1pZ2h0IGNoYW5nZSBhZnRlciB0aGUgZ3JpZCBjcmVhdGlvblxyXG4gICAqL1xyXG4gIGNyZWF0ZShjb2x1bW5EZWZpbml0aW9uczogQ29sdW1uW10sIGdyaWRPcHRpb25zOiBHcmlkT3B0aW9uKSB7XHJcbiAgICBpZiAoY29sdW1uRGVmaW5pdGlvbnMgJiYgZ3JpZE9wdGlvbnMpIHtcclxuICAgICAgLy8gZHluYW1pY2FsbHkgaW1wb3J0IHRoZSBTbGlja0dyaWQgcGx1Z2luIChhZGRvbikgd2l0aCBSZXF1aXJlSlNcclxuICAgICAgdGhpcy5leHRlbnNpb25VdGlsaXR5LmxvYWRFeHRlbnNpb25EeW5hbWljYWxseShFeHRlbnNpb25OYW1lLnJvd0RldGFpbFZpZXcpO1xyXG5cclxuICAgICAgaWYgKCFncmlkT3B0aW9ucy5yb3dEZXRhaWxWaWV3KSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgUm93IERldGFpbCBWaWV3IHJlcXVpcmVzIG9wdGlvbnMgdG8gYmUgcGFzc2VkIHZpYSB0aGUgXCJyb3dEZXRhaWxWaWV3XCIgcHJvcGVydHkgb2YgdGhlIEdyaWQgT3B0aW9ucycpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoZ3JpZE9wdGlvbnMgJiYgZ3JpZE9wdGlvbnMucm93RGV0YWlsVmlldykge1xyXG4gICAgICAgIGlmICghdGhpcy5fYWRkb24pIHtcclxuICAgICAgICAgIGlmICh0eXBlb2YgZ3JpZE9wdGlvbnMucm93RGV0YWlsVmlldy5wcm9jZXNzID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIC8vIHdlIG5lZWQgdG8ga2VlcCB0aGUgdXNlciBcInByb2Nlc3NcIiBtZXRob2QgYW5kIHJlcGxhY2UgaXQgd2l0aCBvdXIgb3duIGV4ZWN1dGlvbiBtZXRob2RcclxuICAgICAgICAgICAgLy8gd2UgZG8gdGhpcyBiZWNhdXNlIHdoZW4gd2UgZ2V0IHRoZSBpdGVtIGRldGFpbCwgd2UgbmVlZCB0byBjYWxsIFwib25Bc3luY1Jlc3BvbnNlLm5vdGlmeVwiIGZvciB0aGUgcGx1Z2luIHRvIHdvcmtcclxuICAgICAgICAgICAgdGhpcy5fdXNlclByb2Nlc3NGbiA9IGdyaWRPcHRpb25zLnJvd0RldGFpbFZpZXcucHJvY2VzczsgICAgICAgICAgICAgICAgLy8ga2VlcCB1c2VyJ3MgcHJvY2VzcyBtZXRob2RcclxuICAgICAgICAgICAgZ3JpZE9wdGlvbnMucm93RGV0YWlsVmlldy5wcm9jZXNzID0gKGl0ZW0pID0+IHRoaXMub25Qcm9jZXNzaW5nKGl0ZW0pOyAgLy8gcmVwbGFjZSBwcm9jZXNzIG1ldGhvZCAmIHJ1biBvdXIgaW50ZXJuYWwgb25lXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBuZWVkIHRvIHByb3ZpZGUgYSBcInByb2Nlc3NcIiBmdW5jdGlvbiBmb3IgdGhlIFJvdyBEZXRhaWwgRXh0ZW5zaW9uIHRvIHdvcmsgcHJvcGVybHknKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvLyBsb2FkIHRoZSBQcmVsb2FkICYgUm93RGV0YWlsIFRlbXBsYXRlcyAoY291bGQgYmUgc3RyYWlnaHQgSFRNTCBvciBBbmd1bGFyIFZpZXcvVmlld01vZGVsKVxyXG4gICAgICAgICAgLy8gd2hlbiB0aG9zZSBhcmUgQW5ndWxhciBWaWV3L1ZpZXdNb2RlbCwgd2UgbmVlZCB0byBjcmVhdGUgVmlldyBDb21wb25lbnQgJiBwcm92aWRlIHRoZSBodG1sIGNvbnRhaW5lcnMgdG8gdGhlIFBsdWdpbiAocHJlVGVtcGxhdGUvcG9zdFRlbXBsYXRlIG1ldGhvZHMpXHJcbiAgICAgICAgICBpZiAoIWdyaWRPcHRpb25zLnJvd0RldGFpbFZpZXcucHJlVGVtcGxhdGUpIHtcclxuICAgICAgICAgICAgdGhpcy5fcHJlbG9hZENvbXBvbmVudCA9IGdyaWRPcHRpb25zICYmIGdyaWRPcHRpb25zLnJvd0RldGFpbFZpZXcgJiYgZ3JpZE9wdGlvbnMucm93RGV0YWlsVmlldy5wcmVsb2FkQ29tcG9uZW50O1xyXG4gICAgICAgICAgICBncmlkT3B0aW9ucy5yb3dEZXRhaWxWaWV3LnByZVRlbXBsYXRlID0gKCkgPT4gRE9NUHVyaWZ5LnNhbml0aXplKGA8ZGl2IGNsYXNzPVwiJHtQUkVMT0FEX0NPTlRBSU5FUl9QUkVGSVh9XCI+PC9kaXY+YCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoIWdyaWRPcHRpb25zLnJvd0RldGFpbFZpZXcucG9zdFRlbXBsYXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3ZpZXdDb21wb25lbnQgPSBncmlkT3B0aW9ucyAmJiBncmlkT3B0aW9ucy5yb3dEZXRhaWxWaWV3ICYmIGdyaWRPcHRpb25zLnJvd0RldGFpbFZpZXcudmlld0NvbXBvbmVudDtcclxuICAgICAgICAgICAgZ3JpZE9wdGlvbnMucm93RGV0YWlsVmlldy5wb3N0VGVtcGxhdGUgPSAoaXRlbURldGFpbDogYW55KSA9PiBET01QdXJpZnkuc2FuaXRpemUoYDxkaXYgY2xhc3M9XCIke1JPV19ERVRBSUxfQ09OVEFJTkVSX1BSRUZJWH0ke2l0ZW1EZXRhaWwuaWR9XCI+PC9kaXY+YCk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgLy8gZmluYWxseSByZWdpc3RlciB0aGUgUm93IERldGFpbCBWaWV3IFBsdWdpblxyXG4gICAgICAgICAgdGhpcy5fYWRkb24gPSBuZXcgU2xpY2suUGx1Z2lucy5Sb3dEZXRhaWxWaWV3KGdyaWRPcHRpb25zLnJvd0RldGFpbFZpZXcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBzZWxlY3Rpb25Db2x1bW46IENvbHVtbiA9IHRoaXMuX2FkZG9uLmdldENvbHVtbkRlZmluaXRpb24oKTtcclxuICAgICAgICBpZiAodHlwZW9mIHNlbGVjdGlvbkNvbHVtbiA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgIHNlbGVjdGlvbkNvbHVtbi5leGNsdWRlRnJvbUV4cG9ydCA9IHRydWU7XHJcbiAgICAgICAgICBzZWxlY3Rpb25Db2x1bW4uZXhjbHVkZUZyb21Db2x1bW5QaWNrZXIgPSB0cnVlO1xyXG4gICAgICAgICAgc2VsZWN0aW9uQ29sdW1uLmV4Y2x1ZGVGcm9tR3JpZE1lbnUgPSB0cnVlO1xyXG4gICAgICAgICAgc2VsZWN0aW9uQ29sdW1uLmV4Y2x1ZGVGcm9tUXVlcnkgPSB0cnVlO1xyXG4gICAgICAgICAgc2VsZWN0aW9uQ29sdW1uLmV4Y2x1ZGVGcm9tSGVhZGVyTWVudSA9IHRydWU7XHJcbiAgICAgICAgICBjb2x1bW5EZWZpbml0aW9ucy51bnNoaWZ0KHNlbGVjdGlvbkNvbHVtbik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB0aGlzLl9hZGRvbjtcclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgcmVnaXN0ZXIocm93U2VsZWN0aW9uUGx1Z2luPzogYW55KSB7XHJcbiAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucykge1xyXG4gICAgICAvLyB0aGUgcGx1Z2luIGhhcyB0byBiZSBjcmVhdGVkIEJFRk9SRSB0aGUgZ3JpZCAoZWxzZSBpdCBiZWhhdmVzIG9kZGx5KSwgYnV0IHdlIGNhbiBvbmx5IHdhdGNoIGdyaWQgZXZlbnRzIEFGVEVSIHRoZSBncmlkIGlzIGNyZWF0ZWRcclxuICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQucmVnaXN0ZXJQbHVnaW4odGhpcy5fYWRkb24pO1xyXG5cclxuICAgICAgLy8gdGhpcyBhbHNvIHJlcXVpcmVzIHRoZSBSb3cgU2VsZWN0aW9uIE1vZGVsIHRvIGJlIHJlZ2lzdGVyZWQgYXMgd2VsbFxyXG4gICAgICBpZiAoIXJvd1NlbGVjdGlvblBsdWdpbiB8fCAhdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQuZ2V0U2VsZWN0aW9uTW9kZWwoKSkge1xyXG4gICAgICAgIHRoaXMuZXh0ZW5zaW9uVXRpbGl0eS5sb2FkRXh0ZW5zaW9uRHluYW1pY2FsbHkoRXh0ZW5zaW9uTmFtZS5yb3dTZWxlY3Rpb24pO1xyXG4gICAgICAgIHJvd1NlbGVjdGlvblBsdWdpbiA9IG5ldyBTbGljay5Sb3dTZWxlY3Rpb25Nb2RlbCh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMucm93U2VsZWN0aW9uT3B0aW9ucyB8fCB7IHNlbGVjdEFjdGl2ZVJvdzogdHJ1ZSB9KTtcclxuICAgICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZC5zZXRTZWxlY3Rpb25Nb2RlbChyb3dTZWxlY3Rpb25QbHVnaW4pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBob29rIGFsbCBldmVudHNcclxuICAgICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkICYmIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5yb3dEZXRhaWxWaWV3KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5yb3dEZXRhaWxWaWV3Lm9uRXh0ZW5zaW9uUmVnaXN0ZXJlZCkge1xyXG4gICAgICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLnJvd0RldGFpbFZpZXcub25FeHRlbnNpb25SZWdpc3RlcmVkKHRoaXMuX2FkZG9uKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fZXZlbnRIYW5kbGVyLnN1YnNjcmliZSh0aGlzLl9hZGRvbi5vbkFzeW5jUmVzcG9uc2UsIChlOiBhbnksIGFyZ3M6IHsgaXRlbTogYW55OyBkZXRhaWxWaWV3OiBhbnkgfSkgPT4ge1xyXG4gICAgICAgICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5yb3dEZXRhaWxWaWV3ICYmIHR5cGVvZiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMucm93RGV0YWlsVmlldy5vbkFzeW5jUmVzcG9uc2UgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLnJvd0RldGFpbFZpZXcub25Bc3luY1Jlc3BvbnNlKGUsIGFyZ3MpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuX2V2ZW50SGFuZGxlci5zdWJzY3JpYmUodGhpcy5fYWRkb24ub25Bc3luY0VuZFVwZGF0ZSwgKGU6IGFueSwgYXJnczogeyBncmlkOiBhbnk7IGl0ZW06IGFueTsgfSkgPT4ge1xyXG4gICAgICAgICAgLy8gdHJpZ2dlcnMgYWZ0ZXIgYmFja2VuZCBjYWxsZWQgXCJvbkFzeW5jUmVzcG9uc2Uubm90aWZ5KClcIlxyXG4gICAgICAgICAgdGhpcy5yZW5kZXJWaWV3TW9kZWwoYXJncyAmJiBhcmdzLml0ZW0pO1xyXG5cclxuICAgICAgICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMucm93RGV0YWlsVmlldyAmJiB0eXBlb2YgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLnJvd0RldGFpbFZpZXcub25Bc3luY0VuZFVwZGF0ZSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMucm93RGV0YWlsVmlldy5vbkFzeW5jRW5kVXBkYXRlKGUsIGFyZ3MpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuX2V2ZW50SGFuZGxlci5zdWJzY3JpYmUodGhpcy5fYWRkb24ub25BZnRlclJvd0RldGFpbFRvZ2dsZSwgKGU6IGFueSwgYXJnczogeyBncmlkOiBhbnk7IGl0ZW06IGFueTsgZXhwYW5kZWRSb3dzOiBhbnlbXTsgfSkgPT4ge1xyXG4gICAgICAgICAgLy8gZGlzcGxheSBwcmVsb2FkIHRlbXBsYXRlICYgcmUtcmVuZGVyIGFsbCB0aGUgb3RoZXIgRGV0YWlsIFZpZXdzIGFmdGVyIHRvZ2dsaW5nXHJcbiAgICAgICAgICAvLyB0aGUgcHJlbG9hZCBWaWV3IHdpbGwgZXZlbnR1YWxseSBnbyBhd2F5IG9uY2UgdGhlIGRhdGEgZ2V0cyBsb2FkZWQgYWZ0ZXIgdGhlIFwib25Bc3luY0VuZFVwZGF0ZVwiIGV2ZW50XHJcbiAgICAgICAgICB0aGlzLnJlbmRlclByZWxvYWRWaWV3KCk7XHJcbiAgICAgICAgICB0aGlzLnJlbmRlckFsbFZpZXdDb21wb25lbnRzKCk7XHJcblxyXG4gICAgICAgICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5yb3dEZXRhaWxWaWV3ICYmIHR5cGVvZiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMucm93RGV0YWlsVmlldy5vbkFmdGVyUm93RGV0YWlsVG9nZ2xlID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5yb3dEZXRhaWxWaWV3Lm9uQWZ0ZXJSb3dEZXRhaWxUb2dnbGUoZSwgYXJncyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5fZXZlbnRIYW5kbGVyLnN1YnNjcmliZSh0aGlzLl9hZGRvbi5vbkJlZm9yZVJvd0RldGFpbFRvZ2dsZSwgKGU6IGFueSwgYXJnczogeyBncmlkOiBhbnk7IGl0ZW06IGFueTsgfSkgPT4ge1xyXG4gICAgICAgICAgLy8gYmVmb3JlIHRvZ2dsaW5nIHJvdyBkZXRhaWwsIHdlIG5lZWQgdG8gY3JlYXRlIFZpZXcgQ29tcG9uZW50IGlmIGl0IGRvZXNuJ3QgZXhpc3RcclxuICAgICAgICAgIHRoaXMub25CZWZvcmVSb3dEZXRhaWxUb2dnbGUoZSwgYXJncyk7XHJcblxyXG4gICAgICAgICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5yb3dEZXRhaWxWaWV3ICYmIHR5cGVvZiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMucm93RGV0YWlsVmlldy5vbkJlZm9yZVJvd0RldGFpbFRvZ2dsZSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMucm93RGV0YWlsVmlldy5vbkJlZm9yZVJvd0RldGFpbFRvZ2dsZShlLCBhcmdzKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLl9ldmVudEhhbmRsZXIuc3Vic2NyaWJlKHRoaXMuX2FkZG9uLm9uUm93QmFja1RvVmlld3BvcnRSYW5nZSwgKGU6IGFueSwgYXJnczogeyBncmlkOiBhbnk7IGl0ZW06IGFueTsgcm93SWQ6IG51bWJlcjsgcm93SW5kZXg6IG51bWJlcjsgZXhwYW5kZWRSb3dzOiBhbnlbXTsgcm93SWRzT3V0T2ZWaWV3cG9ydDogbnVtYmVyW107IH0pID0+IHtcclxuICAgICAgICAgIC8vIHdoZW4gcm93IGlzIGJhY2sgdG8gdmlld3BvcnQgcmFuZ2UsIHdlIHdpbGwgcmUtcmVuZGVyIHRoZSBWaWV3IENvbXBvbmVudChzKVxyXG4gICAgICAgICAgdGhpcy5vblJvd0JhY2tUb1ZpZXdwb3J0UmFuZ2UoZSwgYXJncyk7XHJcblxyXG4gICAgICAgICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5yb3dEZXRhaWxWaWV3ICYmIHR5cGVvZiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMucm93RGV0YWlsVmlldy5vblJvd0JhY2tUb1ZpZXdwb3J0UmFuZ2UgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLnJvd0RldGFpbFZpZXcub25Sb3dCYWNrVG9WaWV3cG9ydFJhbmdlKGUsIGFyZ3MpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuX2V2ZW50SGFuZGxlci5zdWJzY3JpYmUodGhpcy5fYWRkb24ub25Sb3dPdXRPZlZpZXdwb3J0UmFuZ2UsIChlOiBhbnksIGFyZ3M6IHsgZ3JpZDogYW55OyBpdGVtOiBhbnk7IHJvd0lkOiBudW1iZXI7IHJvd0luZGV4OiBudW1iZXI7IGV4cGFuZGVkUm93czogYW55W107IHJvd0lkc091dE9mVmlld3BvcnQ6IG51bWJlcltdOyB9KSA9PiB7XHJcbiAgICAgICAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLnJvd0RldGFpbFZpZXcgJiYgdHlwZW9mIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5yb3dEZXRhaWxWaWV3Lm9uUm93T3V0T2ZWaWV3cG9ydFJhbmdlID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5yb3dEZXRhaWxWaWV3Lm9uUm93T3V0T2ZWaWV3cG9ydFJhbmdlKGUsIGFyZ3MpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyAtLVxyXG4gICAgICAgIC8vIGhvb2sgc29tZSBldmVudHMgbmVlZGVkIGJ5IHRoZSBQbHVnaW4gaXRzZWxmXHJcblxyXG4gICAgICAgIHRoaXMuX2V2ZW50SGFuZGxlci5zdWJzY3JpYmUodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQub25Db2x1bW5zUmVvcmRlcmVkLCAoKSA9PiB0aGlzLnJlZHJhd0FsbFZpZXdDb21wb25lbnRzKCkpO1xyXG5cclxuICAgICAgICAvLyBvbiBzb3J0LCBhbGwgcm93IGRldGFpbCBhcmUgY29sbGFwc2VkIHNvIHdlIGNhbiBkaXNwb3NlIG9mIGFsbCB0aGUgVmlld3MgYXMgd2VsbFxyXG4gICAgICAgIHRoaXMuX2V2ZW50SGFuZGxlci5zdWJzY3JpYmUodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQub25Tb3J0LCAoKSA9PiB0aGlzLmRpc3Bvc2VBbGxWaWV3Q29tcG9uZW50cygpKTtcclxuXHJcbiAgICAgICAgLy8gb24gZmlsdGVyIGNoYW5nZWQsIHdlIG5lZWQgdG8gcmUtcmVuZGVyIGFsbCBWaWV3c1xyXG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMucHVzaChcclxuICAgICAgICAgIHRoaXMuZmlsdGVyU2VydmljZS5vbkZpbHRlckNoYW5nZWQuc3Vic2NyaWJlKCgpID0+IHRoaXMucmVkcmF3QWxsVmlld0NvbXBvbmVudHMoKSlcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB0aGlzLl9hZGRvbjtcclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgLy8gLS1cclxuICAvLyBwcml2YXRlIGZ1bmN0aW9uc1xyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICBwcml2YXRlIGRpc3Bvc2VWaWV3Q29tcG9uZW50KGV4cGFuZGVkVmlldzogQ3JlYXRlZFZpZXcpIHtcclxuICAgIGNvbnN0IGNvbXBSZWYgPSBleHBhbmRlZFZpZXcgJiYgZXhwYW5kZWRWaWV3LmNvbXBvbmVudFJlZjtcclxuICAgIGlmIChjb21wUmVmKSB7XHJcbiAgICAgIHRoaXMuYXBwUmVmLmRldGFjaFZpZXcoY29tcFJlZi5ob3N0Vmlldyk7XHJcbiAgICAgIGNvbXBSZWYuZGVzdHJveSgpO1xyXG4gICAgICByZXR1cm4gZXhwYW5kZWRWaWV3O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBub3RpZnkgdGhlIG9uQXN5bmNSZXNwb25zZSB3aXRoIHRoZSBcImFyZ3MuaXRlbVwiIChyZXF1aXJlZCBwcm9wZXJ0eSlcclxuICAgKiB0aGUgcGx1Z2luIHdpbGwgdGhlbiB1c2UgaXRlbSB0byBwb3B1bGF0ZSB0aGUgcm93IGRldGFpbCBwYW5lbCB3aXRoIHRoZSBcInBvc3RUZW1wbGF0ZVwiXHJcbiAgICogQHBhcmFtIGl0ZW1cclxuICAgKi9cclxuICBwcml2YXRlIG5vdGlmeVRlbXBsYXRlKGl0ZW06IGFueSkge1xyXG4gICAgaWYgKHRoaXMuX2FkZG9uKSB7XHJcbiAgICAgIHRoaXMuX2FkZG9uLm9uQXN5bmNSZXNwb25zZS5ub3RpZnkoeyBpdGVtIH0sIHVuZGVmaW5lZCwgdGhpcyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBPbiBQcm9jZXNzaW5nLCB3ZSB3aWxsIG5vdGlmeSB0aGUgcGx1Z2luIHdpdGggdGhlIG5ldyBpdGVtIGRldGFpbCBvbmNlIGJhY2tlbmQgc2VydmVyIGNhbGwgY29tcGxldGVzXHJcbiAgICogQHBhcmFtIGl0ZW1cclxuICAgKi9cclxuICBwcml2YXRlIGFzeW5jIG9uUHJvY2Vzc2luZyhpdGVtOiBhbnkpIHtcclxuICAgIGlmIChpdGVtICYmIHR5cGVvZiB0aGlzLl91c2VyUHJvY2Vzc0ZuID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgIGxldCBhd2FpdGVkSXRlbURldGFpbDogYW55O1xyXG4gICAgICBjb25zdCB1c2VyUHJvY2Vzc0ZuID0gdGhpcy5fdXNlclByb2Nlc3NGbihpdGVtKTtcclxuXHJcbiAgICAgIC8vIHdhaXQgZm9yIHRoZSBcInVzZXJQcm9jZXNzRm5cIiwgb25jZSByZXNvbHZlZCB3ZSB3aWxsIHNhdmUgaXQgaW50byB0aGUgXCJjb2xsZWN0aW9uXCJcclxuICAgICAgY29uc3QgcmVzcG9uc2U6IGFueSB8IGFueVtdID0gYXdhaXQgdXNlclByb2Nlc3NGbjtcclxuXHJcbiAgICAgIGlmIChyZXNwb25zZS5oYXNPd25Qcm9wZXJ0eSgnaWQnKSkge1xyXG4gICAgICAgIGF3YWl0ZWRJdGVtRGV0YWlsID0gcmVzcG9uc2U7IC8vIGZyb20gUHJvbWlzZVxyXG4gICAgICB9IGVsc2UgaWYgKHJlc3BvbnNlICYmIHJlc3BvbnNlIGluc3RhbmNlb2YgT2JzZXJ2YWJsZSB8fCByZXNwb25zZSBpbnN0YW5jZW9mIFByb21pc2UpIHtcclxuICAgICAgICBhd2FpdGVkSXRlbURldGFpbCA9IGF3YWl0IGNhc3RUb1Byb21pc2UocmVzcG9uc2UpOyAvLyBmcm9tIEFuZ3VsYXItaHR0cC1jbGllbnRcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCFhd2FpdGVkSXRlbURldGFpbCB8fCAhYXdhaXRlZEl0ZW1EZXRhaWwuaGFzT3duUHJvcGVydHkoJ2lkJykpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFtBbmd1bGFyLVNsaWNrZ3JpZF0gY291bGQgbm90IHByb2Nlc3MgdGhlIFJvdyBEZXRhaWwsIHlvdSBtdXN0IG1ha2Ugc3VyZSB0aGF0IHlvdXIgXCJwcm9jZXNzXCIgY2FsbGJhY2tcclxuICAgICAgICAgIChhIFByb21pc2Ugb3IgYW4gSHR0cENsaWVudCBjYWxsIHJldHVybmluZyBhbiBPYnNlcnZhYmxlKSByZXR1cm5zIGFuIGl0ZW0gb2JqZWN0IHRoYXQgaGFzIGFuIFwiaWRcIiBwcm9wZXJ0eWApO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBub3RpZnkgdGhlIHBsdWdpbiB3aXRoIHRoZSBuZXcgaXRlbSBkZXRhaWxzXHJcbiAgICAgIHRoaXMubm90aWZ5VGVtcGxhdGUoYXdhaXRlZEl0ZW1EZXRhaWwgfHwge30pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSnVzdCBiZWZvcmUgdGhlIHJvdyBnZXQgZXhwYW5kZWQgb3IgY29sbGFwc2VkIHdlIHdpbGwgZG8gdGhlIGZvbGxvd2luZ1xyXG4gICAqIEZpcnN0IGRldGVybWluZSBpZiB0aGUgcm93IGlzIGV4cGFuZGluZyBvciBjb2xsYXBzaW5nLFxyXG4gICAqIGlmIGl0J3MgZXhwYW5kaW5nIHdlIHdpbGwgYWRkIGl0IHRvIG91ciBWaWV3IENvbXBvbmVudHMgcmVmZXJlbmNlIGFycmF5IGlmIHdlIGRvbid0IGFscmVhZHkgaGF2ZSBpdFxyXG4gICAqIG9yIGlmIGl0J3MgY29sbGFwc2luZyB3ZSB3aWxsIHJlbW92ZSBpdCBmcm9tIG91ciBWaWV3IENvbXBvbmVudHMgcmVmZXJlbmNlIGFycmF5XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBvbkJlZm9yZVJvd0RldGFpbFRvZ2dsZShlOiBFdmVudCwgYXJnczogeyBncmlkOiBhbnk7IGl0ZW06IGFueTsgfSkge1xyXG4gICAgLy8gZXhwYW5kaW5nXHJcbiAgICBpZiAoYXJncyAmJiBhcmdzLml0ZW0gJiYgYXJncy5pdGVtLl9fY29sbGFwc2VkKSB7XHJcbiAgICAgIC8vIGV4cGFuZGluZyByb3cgZGV0YWlsXHJcbiAgICAgIGNvbnN0IHZpZXdJbmZvOiBDcmVhdGVkVmlldyA9IHtcclxuICAgICAgICBpZDogYXJncy5pdGVtLmlkLFxyXG4gICAgICAgIGRhdGFDb250ZXh0OiBhcmdzLml0ZW1cclxuICAgICAgfTtcclxuICAgICAgYWRkVG9BcnJheVdoZW5Ob3RFeGlzdHModGhpcy5fdmlld3MsIHZpZXdJbmZvKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIGNvbGxhcHNpbmcsIHNvIGRpc3Bvc2Ugb2YgdGhlIFZpZXcvQ29tcG9uZW50XHJcbiAgICAgIGNvbnN0IGZvdW5kVmlld0luZGV4ID0gdGhpcy5fdmlld3MuZmluZEluZGV4KCh2aWV3OiBDcmVhdGVkVmlldykgPT4gdmlldy5pZCA9PT0gYXJncy5pdGVtLmlkKTtcclxuICAgICAgaWYgKGZvdW5kVmlld0luZGV4ID49IDAgJiYgdGhpcy5fdmlld3MuaGFzT3duUHJvcGVydHkoZm91bmRWaWV3SW5kZXgpKSB7XHJcbiAgICAgICAgY29uc3QgY29tcFJlZiA9IHRoaXMuX3ZpZXdzW2ZvdW5kVmlld0luZGV4XS5jb21wb25lbnRSZWY7XHJcbiAgICAgICAgdGhpcy5hcHBSZWYuZGV0YWNoVmlldyhjb21wUmVmLmhvc3RWaWV3KTtcclxuICAgICAgICBjb21wUmVmLmRlc3Ryb3koKTtcclxuICAgICAgICB0aGlzLl92aWV3cy5zcGxpY2UoZm91bmRWaWV3SW5kZXgsIDEpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKiogV2hlbiBSb3cgY29tZXMgYmFjayB0byBWaWV3cG9ydCBSYW5nZSwgd2UgbmVlZCB0byByZWRyYXcgdGhlIFZpZXcgKi9cclxuICBwcml2YXRlIG9uUm93QmFja1RvVmlld3BvcnRSYW5nZShlOiBFdmVudCwgYXJnczogeyBncmlkOiBhbnk7IGl0ZW06IGFueTsgcm93SWQ6IG51bWJlcjsgcm93SW5kZXg6IG51bWJlcjsgZXhwYW5kZWRSb3dzOiBhbnlbXTsgcm93SWRzT3V0T2ZWaWV3cG9ydDogbnVtYmVyW107IH0pIHtcclxuICAgIGlmIChhcmdzICYmIGFyZ3MuaXRlbSkge1xyXG4gICAgICB0aGlzLl92aWV3cy5mb3JFYWNoKCh2aWV3KSA9PiB7XHJcbiAgICAgICAgaWYgKHZpZXcuaWQgPT09IGFyZ3MuaXRlbS5pZCkge1xyXG4gICAgICAgICAgdGhpcy5yZWRyYXdWaWV3Q29tcG9uZW50KHZpZXcpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKiogUmVkcmF3IChyZS1yZW5kZXIpIGFsbCB0aGUgZXhwYW5kZWQgcm93IGRldGFpbCBWaWV3IENvbXBvbmVudHMgKi9cclxuICBwcml2YXRlIHJlZHJhd0FsbFZpZXdDb21wb25lbnRzKCkge1xyXG4gICAgdGhpcy5fdmlld3MuZm9yRWFjaCgoY29tcFJlZikgPT4ge1xyXG4gICAgICB0aGlzLnJlZHJhd1ZpZXdDb21wb25lbnQoY29tcFJlZik7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKiBSZW5kZXIgYWxsIHRoZSBleHBhbmRlZCByb3cgZGV0YWlsIFZpZXcgQ29tcG9uZW50cyAqL1xyXG4gIHByaXZhdGUgcmVuZGVyQWxsVmlld0NvbXBvbmVudHMoKSB7XHJcbiAgICB0aGlzLl92aWV3cy5mb3JFYWNoKCh2aWV3KSA9PiB7XHJcbiAgICAgIGlmICh2aWV3ICYmIHZpZXcuZGF0YUNvbnRleHQpIHtcclxuICAgICAgICB0aGlzLnJlbmRlclZpZXdNb2RlbCh2aWV3LmRhdGFDb250ZXh0KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKiogUmVkcmF3IHRoZSBuZWNlc3NhcnkgVmlldyBDb21wb25lbnQgKi9cclxuICBwcml2YXRlIHJlZHJhd1ZpZXdDb21wb25lbnQoY3JlYXRlZFZpZXc6IENyZWF0ZWRWaWV3KSB7XHJcbiAgICBjb25zdCBjb250YWluZXJFbGVtZW50cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7Uk9XX0RFVEFJTF9DT05UQUlORVJfUFJFRklYfSR7Y3JlYXRlZFZpZXcuaWR9YCk7XHJcbiAgICBpZiAoY29udGFpbmVyRWxlbWVudHMgJiYgY29udGFpbmVyRWxlbWVudHMubGVuZ3RoKSB7XHJcbiAgICAgIHRoaXMucmVuZGVyVmlld01vZGVsKGNyZWF0ZWRWaWV3LmRhdGFDb250ZXh0KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiBSZW5kZXIgKG9yIHJlcmVuZGVyKSB0aGUgVmlldyBDb21wb25lbnQgKFJvdyBEZXRhaWwpICovXHJcbiAgcHJpdmF0ZSByZW5kZXJQcmVsb2FkVmlldygpIHtcclxuICAgIGNvbnN0IGNvbnRhaW5lckVsZW1lbnRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHtQUkVMT0FEX0NPTlRBSU5FUl9QUkVGSVh9YCk7XHJcbiAgICBpZiAoY29udGFpbmVyRWxlbWVudHMgJiYgY29udGFpbmVyRWxlbWVudHMubGVuZ3RoKSB7XHJcbiAgICAgIHRoaXMuYW5ndWxhclV0aWxTZXJ2aWNlLmNyZWF0ZUFuZ3VsYXJDb21wb25lbnRBcHBlbmRUb0RvbSh0aGlzLl9wcmVsb2FkQ29tcG9uZW50LCBjb250YWluZXJFbGVtZW50c1swXSwgdHJ1ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKiogUmVuZGVyIChvciByZXJlbmRlcikgdGhlIFZpZXcgQ29tcG9uZW50IChSb3cgRGV0YWlsKSAqL1xyXG4gIHByaXZhdGUgcmVuZGVyVmlld01vZGVsKGl0ZW06IGFueSkge1xyXG4gICAgY29uc3QgY29udGFpbmVyRWxlbWVudHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke1JPV19ERVRBSUxfQ09OVEFJTkVSX1BSRUZJWH0ke2l0ZW0uaWR9YCk7XHJcbiAgICBpZiAoY29udGFpbmVyRWxlbWVudHMgJiYgY29udGFpbmVyRWxlbWVudHMubGVuZ3RoKSB7XHJcbiAgICAgIGNvbnN0IGNvbXBvbmVudE91dHB1dCA9IHRoaXMuYW5ndWxhclV0aWxTZXJ2aWNlLmNyZWF0ZUFuZ3VsYXJDb21wb25lbnRBcHBlbmRUb0RvbSh0aGlzLl92aWV3Q29tcG9uZW50LCBjb250YWluZXJFbGVtZW50c1swXSwgdHJ1ZSk7XHJcbiAgICAgIGlmIChjb21wb25lbnRPdXRwdXQgJiYgY29tcG9uZW50T3V0cHV0LmNvbXBvbmVudFJlZiAmJiBjb21wb25lbnRPdXRwdXQuY29tcG9uZW50UmVmLmluc3RhbmNlKSB7XHJcbiAgICAgICAgT2JqZWN0LmFzc2lnbihjb21wb25lbnRPdXRwdXQuY29tcG9uZW50UmVmLmluc3RhbmNlLCB7IG1vZGVsOiBpdGVtIH0pO1xyXG5cclxuICAgICAgICBjb25zdCB2aWV3T2JqID0gdGhpcy5fdmlld3MuZmluZCgob2JqKSA9PiBvYmouaWQgPT09IGl0ZW0uaWQpO1xyXG4gICAgICAgIGlmICh2aWV3T2JqKSB7XHJcbiAgICAgICAgICB2aWV3T2JqLmNvbXBvbmVudFJlZiA9IGNvbXBvbmVudE91dHB1dC5jb21wb25lbnRSZWY7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==