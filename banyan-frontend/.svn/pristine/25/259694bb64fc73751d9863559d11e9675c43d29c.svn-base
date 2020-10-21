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
var DOMPurify = DOMPurify_; // patch to fix rollup to work
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
                        gridOptions.rowDetailView.process = function (item) { return _this.onProcessing(item); }; // replace process method & run our internal one
                    }
                    else {
                        throw new Error('You need to provide a "process" function for the Row Detail Extension to work properly');
                    }
                    // load the Preload & RowDetail Templates (could be straight HTML or Angular View/ViewModel)
                    // when those are Angular View/ViewModel, we need to create View Component & provide the html containers to the Plugin (preTemplate/postTemplate methods)
                    if (!gridOptions.rowDetailView.preTemplate) {
                        this._preloadComponent = gridOptions && gridOptions.rowDetailView && gridOptions.rowDetailView.preloadComponent;
                        gridOptions.rowDetailView.preTemplate = function () { return DOMPurify.sanitize("<div class=\"" + PRELOAD_CONTAINER_PREFIX + "\"></div>"); };
                    }
                    if (!gridOptions.rowDetailView.postTemplate) {
                        this._viewComponent = gridOptions && gridOptions.rowDetailView && gridOptions.rowDetailView.viewComponent;
                        gridOptions.rowDetailView.postTemplate = function (itemDetail) { return DOMPurify.sanitize("<div class=\"" + ROW_DETAIL_CONTAINER_PREFIX + itemDetail.id + "\"></div>"); };
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
                this.extensionUtility.loadExtensionDynamically(ExtensionName.rowSelection);
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var awaitedItemDetail, userProcessFn, response;
            return tslib_1.__generator(this, function (_a) {
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
                        if (!(response && response instanceof Observable || response instanceof Promise)) return [3 /*break*/, 4];
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
    RowDetailViewExtension = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [AngularUtilService,
            ApplicationRef,
            ExtensionUtility,
            FilterService,
            SharedService])
    ], RowDetailViewExtension);
    return RowDetailViewExtension;
}());
export { RowDetailViewExtension };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93RGV0YWlsVmlld0V4dGVuc2lvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvZXh0ZW5zaW9ucy9yb3dEZXRhaWxWaWV3RXh0ZW5zaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsY0FBYyxFQUFnQixVQUFVLEVBQTBCLE1BQU0sZUFBZSxDQUFDO0FBQ2pHLE9BQU8sRUFBcUIsYUFBYSxFQUFpQyxNQUFNLGlCQUFpQixDQUFDO0FBQ2xHLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDM0QsT0FBTyxFQUFFLHVCQUF1QixFQUFFLGFBQWEsRUFBRSx5QkFBeUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzFHLE9BQU8sRUFBRSxVQUFVLEVBQXlCLE1BQU0sTUFBTSxDQUFDO0FBQ3pELE9BQU8sS0FBSyxVQUFVLE1BQU0sV0FBVyxDQUFDO0FBQ3hDLElBQU0sU0FBUyxHQUFHLFVBQVUsQ0FBQyxDQUFDLDhCQUE4QjtBQUs1RCxJQUFNLDJCQUEyQixHQUFHLFlBQVksQ0FBQztBQUNqRCxJQUFNLHdCQUF3QixHQUFHLG1CQUFtQixDQUFDO0FBU3JEO0lBVUUsZ0NBQ1Usa0JBQXNDLEVBQ3RDLE1BQXNCLEVBQ3RCLGdCQUFrQyxFQUNsQyxhQUE0QixFQUM1QixhQUE0QjtRQUo1Qix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBQ3RDLFdBQU0sR0FBTixNQUFNLENBQWdCO1FBQ3RCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsa0JBQWEsR0FB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QixjQUFjO1lBQ0osZ0JBQWdCO1lBQ25CLGFBQWE7WUFDYixhQUFhO09BZjNCLHNCQUFzQixDQTJUbEM7SUFBRCw2QkFBQztDQUFBLEFBM1RELElBMlRDO1NBM1RZLHNCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcGxpY2F0aW9uUmVmLCBDb21wb25lbnRSZWYsIEluamVjdGFibGUsIFR5cGUsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29sdW1uLCBFeHRlbnNpb24sIEV4dGVuc2lvbk5hbWUsIEdyaWRPcHRpb24sIFNsaWNrRXZlbnRIYW5kbGVyIH0gZnJvbSAnLi4vbW9kZWxzL2luZGV4JztcclxuaW1wb3J0IHsgRXh0ZW5zaW9uVXRpbGl0eSB9IGZyb20gJy4vZXh0ZW5zaW9uVXRpbGl0eSc7XHJcbmltcG9ydCB7IEFuZ3VsYXJVdGlsU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2FuZ3VsYXJVdGlsU2VydmljZSc7XHJcbmltcG9ydCB7IEZpbHRlclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9maWx0ZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IFNoYXJlZFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9zaGFyZWQuc2VydmljZSc7XHJcbmltcG9ydCB7IGFkZFRvQXJyYXlXaGVuTm90RXhpc3RzLCBjYXN0VG9Qcm9taXNlLCB1bnN1YnNjcmliZUFsbE9ic2VydmFibGVzIH0gZnJvbSAnLi4vc2VydmljZXMvdXRpbGl0aWVzJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCAqIGFzIERPTVB1cmlmeV8gZnJvbSAnZG9tcHVyaWZ5JztcclxuY29uc3QgRE9NUHVyaWZ5ID0gRE9NUHVyaWZ5XzsgLy8gcGF0Y2ggdG8gZml4IHJvbGx1cCB0byB3b3JrXHJcblxyXG4vLyB1c2luZyBleHRlcm5hbCBub24tdHlwZWQganMgbGlicmFyaWVzXHJcbmRlY2xhcmUgdmFyIFNsaWNrOiBhbnk7XHJcblxyXG5jb25zdCBST1dfREVUQUlMX0NPTlRBSU5FUl9QUkVGSVggPSAnY29udGFpbmVyXyc7XHJcbmNvbnN0IFBSRUxPQURfQ09OVEFJTkVSX1BSRUZJWCA9ICdjb250YWluZXJfbG9hZGluZyc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIENyZWF0ZWRWaWV3IHtcclxuICBpZDogc3RyaW5nIHwgbnVtYmVyO1xyXG4gIGRhdGFDb250ZXh0OiBhbnk7XHJcbiAgY29tcG9uZW50UmVmPzogQ29tcG9uZW50UmVmPGFueT47XHJcbn1cclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFJvd0RldGFpbFZpZXdFeHRlbnNpb24gaW1wbGVtZW50cyBFeHRlbnNpb24ge1xyXG4gIHJvd0RldGFpbENvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZjtcclxuICBwcml2YXRlIF9hZGRvbjogYW55O1xyXG4gIHByaXZhdGUgX2V2ZW50SGFuZGxlcjogU2xpY2tFdmVudEhhbmRsZXI7XHJcbiAgcHJpdmF0ZSBfcHJlbG9hZENvbXBvbmVudDogVHlwZTxvYmplY3Q+O1xyXG4gIHByaXZhdGUgX3ZpZXdzOiBDcmVhdGVkVmlld1tdID0gW107XHJcbiAgcHJpdmF0ZSBfdmlld0NvbXBvbmVudDogVHlwZTxvYmplY3Q+O1xyXG4gIHByaXZhdGUgX3N1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XHJcbiAgcHJpdmF0ZSBfdXNlclByb2Nlc3NGbjogKGl0ZW06IGFueSkgPT4gUHJvbWlzZTxhbnk+IHwgT2JzZXJ2YWJsZTxhbnk+IHwgU3ViamVjdDxhbnk+O1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgYW5ndWxhclV0aWxTZXJ2aWNlOiBBbmd1bGFyVXRpbFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGFwcFJlZjogQXBwbGljYXRpb25SZWYsXHJcbiAgICBwcml2YXRlIGV4dGVuc2lvblV0aWxpdHk6IEV4dGVuc2lvblV0aWxpdHksXHJcbiAgICBwcml2YXRlIGZpbHRlclNlcnZpY2U6IEZpbHRlclNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHNoYXJlZFNlcnZpY2U6IFNoYXJlZFNlcnZpY2UsXHJcbiAgKSB7XHJcbiAgICB0aGlzLl9ldmVudEhhbmRsZXIgPSBuZXcgU2xpY2suRXZlbnRIYW5kbGVyKCk7XHJcbiAgfVxyXG5cclxuICBnZXQgZXZlbnRIYW5kbGVyKCk6IFNsaWNrRXZlbnRIYW5kbGVyIHtcclxuICAgIHJldHVybiB0aGlzLl9ldmVudEhhbmRsZXI7XHJcbiAgfVxyXG5cclxuICAvKiogRGlzcG9zZSBvZiB0aGUgUm93RGV0YWlsVmlldyBFeHRlbnNpb24gKi9cclxuICBkaXNwb3NlKCkge1xyXG4gICAgLy8gdW5zdWJzY3JpYmUgYWxsIFNsaWNrR3JpZCBldmVudHNcclxuICAgIHRoaXMuX2V2ZW50SGFuZGxlci51bnN1YnNjcmliZUFsbCgpO1xyXG5cclxuICAgIGlmICh0aGlzLl9hZGRvbiAmJiB0aGlzLl9hZGRvbi5kZXN0cm95KSB7XHJcbiAgICAgIHRoaXMuX2FkZG9uLmRlc3Ryb3koKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBhbHNvIHVuc3Vic2NyaWJlIGFsbCBSeEpTIHN1YnNjcmlwdGlvbnNcclxuICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMgPSB1bnN1YnNjcmliZUFsbE9ic2VydmFibGVzKHRoaXMuX3N1YnNjcmlwdGlvbnMpO1xyXG4gICAgdGhpcy5kaXNwb3NlQWxsVmlld0NvbXBvbmVudHMoKTtcclxuICB9XHJcblxyXG4gIC8qKiBEaXNwb3NlIG9mIGFsbCB0aGUgb3BlbmVkIFJvdyBEZXRhaWwgUGFuZWxzIEFuZ3VsYXIgVmlldyBDb21wb25lbnRzICovXHJcbiAgZGlzcG9zZUFsbFZpZXdDb21wb25lbnRzKCkge1xyXG4gICAgdGhpcy5fdmlld3MuZm9yRWFjaCgoY29tcFJlZikgPT4gdGhpcy5kaXNwb3NlVmlld0NvbXBvbmVudChjb21wUmVmKSk7XHJcbiAgICB0aGlzLl92aWV3cyA9IFtdO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlIHRoZSBwbHVnaW4gYmVmb3JlIHRoZSBHcmlkIGNyZWF0aW9uLCBlbHNlIGl0IHdpbGwgYmVoYXZlIG9kZGx5LlxyXG4gICAqIE1vc3RseSBiZWNhdXNlIHRoZSBjb2x1bW4gZGVmaW5pdGlvbnMgbWlnaHQgY2hhbmdlIGFmdGVyIHRoZSBncmlkIGNyZWF0aW9uXHJcbiAgICovXHJcbiAgY3JlYXRlKGNvbHVtbkRlZmluaXRpb25zOiBDb2x1bW5bXSwgZ3JpZE9wdGlvbnM6IEdyaWRPcHRpb24pIHtcclxuICAgIGlmIChjb2x1bW5EZWZpbml0aW9ucyAmJiBncmlkT3B0aW9ucykge1xyXG4gICAgICAvLyBkeW5hbWljYWxseSBpbXBvcnQgdGhlIFNsaWNrR3JpZCBwbHVnaW4gKGFkZG9uKSB3aXRoIFJlcXVpcmVKU1xyXG4gICAgICB0aGlzLmV4dGVuc2lvblV0aWxpdHkubG9hZEV4dGVuc2lvbkR5bmFtaWNhbGx5KEV4dGVuc2lvbk5hbWUucm93RGV0YWlsVmlldyk7XHJcblxyXG4gICAgICBpZiAoIWdyaWRPcHRpb25zLnJvd0RldGFpbFZpZXcpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBSb3cgRGV0YWlsIFZpZXcgcmVxdWlyZXMgb3B0aW9ucyB0byBiZSBwYXNzZWQgdmlhIHRoZSBcInJvd0RldGFpbFZpZXdcIiBwcm9wZXJ0eSBvZiB0aGUgR3JpZCBPcHRpb25zJyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChncmlkT3B0aW9ucyAmJiBncmlkT3B0aW9ucy5yb3dEZXRhaWxWaWV3KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9hZGRvbikge1xyXG4gICAgICAgICAgaWYgKHR5cGVvZiBncmlkT3B0aW9ucy5yb3dEZXRhaWxWaWV3LnByb2Nlc3MgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgLy8gd2UgbmVlZCB0byBrZWVwIHRoZSB1c2VyIFwicHJvY2Vzc1wiIG1ldGhvZCBhbmQgcmVwbGFjZSBpdCB3aXRoIG91ciBvd24gZXhlY3V0aW9uIG1ldGhvZFxyXG4gICAgICAgICAgICAvLyB3ZSBkbyB0aGlzIGJlY2F1c2Ugd2hlbiB3ZSBnZXQgdGhlIGl0ZW0gZGV0YWlsLCB3ZSBuZWVkIHRvIGNhbGwgXCJvbkFzeW5jUmVzcG9uc2Uubm90aWZ5XCIgZm9yIHRoZSBwbHVnaW4gdG8gd29ya1xyXG4gICAgICAgICAgICB0aGlzLl91c2VyUHJvY2Vzc0ZuID0gZ3JpZE9wdGlvbnMucm93RGV0YWlsVmlldy5wcm9jZXNzOyAgICAgICAgICAgICAgICAvLyBrZWVwIHVzZXIncyBwcm9jZXNzIG1ldGhvZFxyXG4gICAgICAgICAgICBncmlkT3B0aW9ucy5yb3dEZXRhaWxWaWV3LnByb2Nlc3MgPSAoaXRlbSkgPT4gdGhpcy5vblByb2Nlc3NpbmcoaXRlbSk7ICAvLyByZXBsYWNlIHByb2Nlc3MgbWV0aG9kICYgcnVuIG91ciBpbnRlcm5hbCBvbmVcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignWW91IG5lZWQgdG8gcHJvdmlkZSBhIFwicHJvY2Vzc1wiIGZ1bmN0aW9uIGZvciB0aGUgUm93IERldGFpbCBFeHRlbnNpb24gdG8gd29yayBwcm9wZXJseScpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vIGxvYWQgdGhlIFByZWxvYWQgJiBSb3dEZXRhaWwgVGVtcGxhdGVzIChjb3VsZCBiZSBzdHJhaWdodCBIVE1MIG9yIEFuZ3VsYXIgVmlldy9WaWV3TW9kZWwpXHJcbiAgICAgICAgICAvLyB3aGVuIHRob3NlIGFyZSBBbmd1bGFyIFZpZXcvVmlld01vZGVsLCB3ZSBuZWVkIHRvIGNyZWF0ZSBWaWV3IENvbXBvbmVudCAmIHByb3ZpZGUgdGhlIGh0bWwgY29udGFpbmVycyB0byB0aGUgUGx1Z2luIChwcmVUZW1wbGF0ZS9wb3N0VGVtcGxhdGUgbWV0aG9kcylcclxuICAgICAgICAgIGlmICghZ3JpZE9wdGlvbnMucm93RGV0YWlsVmlldy5wcmVUZW1wbGF0ZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9wcmVsb2FkQ29tcG9uZW50ID0gZ3JpZE9wdGlvbnMgJiYgZ3JpZE9wdGlvbnMucm93RGV0YWlsVmlldyAmJiBncmlkT3B0aW9ucy5yb3dEZXRhaWxWaWV3LnByZWxvYWRDb21wb25lbnQ7XHJcbiAgICAgICAgICAgIGdyaWRPcHRpb25zLnJvd0RldGFpbFZpZXcucHJlVGVtcGxhdGUgPSAoKSA9PiBET01QdXJpZnkuc2FuaXRpemUoYDxkaXYgY2xhc3M9XCIke1BSRUxPQURfQ09OVEFJTkVSX1BSRUZJWH1cIj48L2Rpdj5gKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmICghZ3JpZE9wdGlvbnMucm93RGV0YWlsVmlldy5wb3N0VGVtcGxhdGUpIHtcclxuICAgICAgICAgICAgdGhpcy5fdmlld0NvbXBvbmVudCA9IGdyaWRPcHRpb25zICYmIGdyaWRPcHRpb25zLnJvd0RldGFpbFZpZXcgJiYgZ3JpZE9wdGlvbnMucm93RGV0YWlsVmlldy52aWV3Q29tcG9uZW50O1xyXG4gICAgICAgICAgICBncmlkT3B0aW9ucy5yb3dEZXRhaWxWaWV3LnBvc3RUZW1wbGF0ZSA9IChpdGVtRGV0YWlsOiBhbnkpID0+IERPTVB1cmlmeS5zYW5pdGl6ZShgPGRpdiBjbGFzcz1cIiR7Uk9XX0RFVEFJTF9DT05UQUlORVJfUFJFRklYfSR7aXRlbURldGFpbC5pZH1cIj48L2Rpdj5gKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvLyBmaW5hbGx5IHJlZ2lzdGVyIHRoZSBSb3cgRGV0YWlsIFZpZXcgUGx1Z2luXHJcbiAgICAgICAgICB0aGlzLl9hZGRvbiA9IG5ldyBTbGljay5QbHVnaW5zLlJvd0RldGFpbFZpZXcoZ3JpZE9wdGlvbnMucm93RGV0YWlsVmlldyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHNlbGVjdGlvbkNvbHVtbjogQ29sdW1uID0gdGhpcy5fYWRkb24uZ2V0Q29sdW1uRGVmaW5pdGlvbigpO1xyXG4gICAgICAgIGlmICh0eXBlb2Ygc2VsZWN0aW9uQ29sdW1uID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgc2VsZWN0aW9uQ29sdW1uLmV4Y2x1ZGVGcm9tRXhwb3J0ID0gdHJ1ZTtcclxuICAgICAgICAgIHNlbGVjdGlvbkNvbHVtbi5leGNsdWRlRnJvbUNvbHVtblBpY2tlciA9IHRydWU7XHJcbiAgICAgICAgICBzZWxlY3Rpb25Db2x1bW4uZXhjbHVkZUZyb21HcmlkTWVudSA9IHRydWU7XHJcbiAgICAgICAgICBzZWxlY3Rpb25Db2x1bW4uZXhjbHVkZUZyb21RdWVyeSA9IHRydWU7XHJcbiAgICAgICAgICBzZWxlY3Rpb25Db2x1bW4uZXhjbHVkZUZyb21IZWFkZXJNZW51ID0gdHJ1ZTtcclxuICAgICAgICAgIGNvbHVtbkRlZmluaXRpb25zLnVuc2hpZnQoc2VsZWN0aW9uQ29sdW1uKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHRoaXMuX2FkZG9uO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICByZWdpc3Rlcihyb3dTZWxlY3Rpb25QbHVnaW4/OiBhbnkpIHtcclxuICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zKSB7XHJcbiAgICAgIC8vIHRoZSBwbHVnaW4gaGFzIHRvIGJlIGNyZWF0ZWQgQkVGT1JFIHRoZSBncmlkIChlbHNlIGl0IGJlaGF2ZXMgb2RkbHkpLCBidXQgd2UgY2FuIG9ubHkgd2F0Y2ggZ3JpZCBldmVudHMgQUZURVIgdGhlIGdyaWQgaXMgY3JlYXRlZFxyXG4gICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZC5yZWdpc3RlclBsdWdpbih0aGlzLl9hZGRvbik7XHJcblxyXG4gICAgICAvLyB0aGlzIGFsc28gcmVxdWlyZXMgdGhlIFJvdyBTZWxlY3Rpb24gTW9kZWwgdG8gYmUgcmVnaXN0ZXJlZCBhcyB3ZWxsXHJcbiAgICAgIGlmICghcm93U2VsZWN0aW9uUGx1Z2luIHx8ICF0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZC5nZXRTZWxlY3Rpb25Nb2RlbCgpKSB7XHJcbiAgICAgICAgdGhpcy5leHRlbnNpb25VdGlsaXR5LmxvYWRFeHRlbnNpb25EeW5hbWljYWxseShFeHRlbnNpb25OYW1lLnJvd1NlbGVjdGlvbik7XHJcbiAgICAgICAgcm93U2VsZWN0aW9uUGx1Z2luID0gbmV3IFNsaWNrLlJvd1NlbGVjdGlvbk1vZGVsKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5yb3dTZWxlY3Rpb25PcHRpb25zIHx8IHsgc2VsZWN0QWN0aXZlUm93OiB0cnVlIH0pO1xyXG4gICAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLnNldFNlbGVjdGlvbk1vZGVsKHJvd1NlbGVjdGlvblBsdWdpbik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIGhvb2sgYWxsIGV2ZW50c1xyXG4gICAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLnJvd0RldGFpbFZpZXcpIHtcclxuICAgICAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLnJvd0RldGFpbFZpZXcub25FeHRlbnNpb25SZWdpc3RlcmVkKSB7XHJcbiAgICAgICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMucm93RGV0YWlsVmlldy5vbkV4dGVuc2lvblJlZ2lzdGVyZWQodGhpcy5fYWRkb24pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9ldmVudEhhbmRsZXIuc3Vic2NyaWJlKHRoaXMuX2FkZG9uLm9uQXN5bmNSZXNwb25zZSwgKGU6IGFueSwgYXJnczogeyBpdGVtOiBhbnk7IGRldGFpbFZpZXc6IGFueSB9KSA9PiB7XHJcbiAgICAgICAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLnJvd0RldGFpbFZpZXcgJiYgdHlwZW9mIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5yb3dEZXRhaWxWaWV3Lm9uQXN5bmNSZXNwb25zZSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMucm93RGV0YWlsVmlldy5vbkFzeW5jUmVzcG9uc2UoZSwgYXJncyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5fZXZlbnRIYW5kbGVyLnN1YnNjcmliZSh0aGlzLl9hZGRvbi5vbkFzeW5jRW5kVXBkYXRlLCAoZTogYW55LCBhcmdzOiB7IGdyaWQ6IGFueTsgaXRlbTogYW55OyB9KSA9PiB7XHJcbiAgICAgICAgICAvLyB0cmlnZ2VycyBhZnRlciBiYWNrZW5kIGNhbGxlZCBcIm9uQXN5bmNSZXNwb25zZS5ub3RpZnkoKVwiXHJcbiAgICAgICAgICB0aGlzLnJlbmRlclZpZXdNb2RlbChhcmdzICYmIGFyZ3MuaXRlbSk7XHJcblxyXG4gICAgICAgICAgaWYgKHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5yb3dEZXRhaWxWaWV3ICYmIHR5cGVvZiB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMucm93RGV0YWlsVmlldy5vbkFzeW5jRW5kVXBkYXRlID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5yb3dEZXRhaWxWaWV3Lm9uQXN5bmNFbmRVcGRhdGUoZSwgYXJncyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5fZXZlbnRIYW5kbGVyLnN1YnNjcmliZSh0aGlzLl9hZGRvbi5vbkFmdGVyUm93RGV0YWlsVG9nZ2xlLCAoZTogYW55LCBhcmdzOiB7IGdyaWQ6IGFueTsgaXRlbTogYW55OyBleHBhbmRlZFJvd3M6IGFueVtdOyB9KSA9PiB7XHJcbiAgICAgICAgICAvLyBkaXNwbGF5IHByZWxvYWQgdGVtcGxhdGUgJiByZS1yZW5kZXIgYWxsIHRoZSBvdGhlciBEZXRhaWwgVmlld3MgYWZ0ZXIgdG9nZ2xpbmdcclxuICAgICAgICAgIC8vIHRoZSBwcmVsb2FkIFZpZXcgd2lsbCBldmVudHVhbGx5IGdvIGF3YXkgb25jZSB0aGUgZGF0YSBnZXRzIGxvYWRlZCBhZnRlciB0aGUgXCJvbkFzeW5jRW5kVXBkYXRlXCIgZXZlbnRcclxuICAgICAgICAgIHRoaXMucmVuZGVyUHJlbG9hZFZpZXcoKTtcclxuICAgICAgICAgIHRoaXMucmVuZGVyQWxsVmlld0NvbXBvbmVudHMoKTtcclxuXHJcbiAgICAgICAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLnJvd0RldGFpbFZpZXcgJiYgdHlwZW9mIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5yb3dEZXRhaWxWaWV3Lm9uQWZ0ZXJSb3dEZXRhaWxUb2dnbGUgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLnJvd0RldGFpbFZpZXcub25BZnRlclJvd0RldGFpbFRvZ2dsZShlLCBhcmdzKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLl9ldmVudEhhbmRsZXIuc3Vic2NyaWJlKHRoaXMuX2FkZG9uLm9uQmVmb3JlUm93RGV0YWlsVG9nZ2xlLCAoZTogYW55LCBhcmdzOiB7IGdyaWQ6IGFueTsgaXRlbTogYW55OyB9KSA9PiB7XHJcbiAgICAgICAgICAvLyBiZWZvcmUgdG9nZ2xpbmcgcm93IGRldGFpbCwgd2UgbmVlZCB0byBjcmVhdGUgVmlldyBDb21wb25lbnQgaWYgaXQgZG9lc24ndCBleGlzdFxyXG4gICAgICAgICAgdGhpcy5vbkJlZm9yZVJvd0RldGFpbFRvZ2dsZShlLCBhcmdzKTtcclxuXHJcbiAgICAgICAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLnJvd0RldGFpbFZpZXcgJiYgdHlwZW9mIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5yb3dEZXRhaWxWaWV3Lm9uQmVmb3JlUm93RGV0YWlsVG9nZ2xlID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5yb3dEZXRhaWxWaWV3Lm9uQmVmb3JlUm93RGV0YWlsVG9nZ2xlKGUsIGFyZ3MpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuX2V2ZW50SGFuZGxlci5zdWJzY3JpYmUodGhpcy5fYWRkb24ub25Sb3dCYWNrVG9WaWV3cG9ydFJhbmdlLCAoZTogYW55LCBhcmdzOiB7IGdyaWQ6IGFueTsgaXRlbTogYW55OyByb3dJZDogbnVtYmVyOyByb3dJbmRleDogbnVtYmVyOyBleHBhbmRlZFJvd3M6IGFueVtdOyByb3dJZHNPdXRPZlZpZXdwb3J0OiBudW1iZXJbXTsgfSkgPT4ge1xyXG4gICAgICAgICAgLy8gd2hlbiByb3cgaXMgYmFjayB0byB2aWV3cG9ydCByYW5nZSwgd2Ugd2lsbCByZS1yZW5kZXIgdGhlIFZpZXcgQ29tcG9uZW50KHMpXHJcbiAgICAgICAgICB0aGlzLm9uUm93QmFja1RvVmlld3BvcnRSYW5nZShlLCBhcmdzKTtcclxuXHJcbiAgICAgICAgICBpZiAodGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLnJvd0RldGFpbFZpZXcgJiYgdHlwZW9mIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkT3B0aW9ucy5yb3dEZXRhaWxWaWV3Lm9uUm93QmFja1RvVmlld3BvcnRSYW5nZSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICB0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMucm93RGV0YWlsVmlldy5vblJvd0JhY2tUb1ZpZXdwb3J0UmFuZ2UoZSwgYXJncyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5fZXZlbnRIYW5kbGVyLnN1YnNjcmliZSh0aGlzLl9hZGRvbi5vblJvd091dE9mVmlld3BvcnRSYW5nZSwgKGU6IGFueSwgYXJnczogeyBncmlkOiBhbnk7IGl0ZW06IGFueTsgcm93SWQ6IG51bWJlcjsgcm93SW5kZXg6IG51bWJlcjsgZXhwYW5kZWRSb3dzOiBhbnlbXTsgcm93SWRzT3V0T2ZWaWV3cG9ydDogbnVtYmVyW107IH0pID0+IHtcclxuICAgICAgICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZE9wdGlvbnMucm93RGV0YWlsVmlldyAmJiB0eXBlb2YgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLnJvd0RldGFpbFZpZXcub25Sb3dPdXRPZlZpZXdwb3J0UmFuZ2UgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWRPcHRpb25zLnJvd0RldGFpbFZpZXcub25Sb3dPdXRPZlZpZXdwb3J0UmFuZ2UoZSwgYXJncyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIC0tXHJcbiAgICAgICAgLy8gaG9vayBzb21lIGV2ZW50cyBuZWVkZWQgYnkgdGhlIFBsdWdpbiBpdHNlbGZcclxuXHJcbiAgICAgICAgdGhpcy5fZXZlbnRIYW5kbGVyLnN1YnNjcmliZSh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZC5vbkNvbHVtbnNSZW9yZGVyZWQsICgpID0+IHRoaXMucmVkcmF3QWxsVmlld0NvbXBvbmVudHMoKSk7XHJcblxyXG4gICAgICAgIC8vIG9uIHNvcnQsIGFsbCByb3cgZGV0YWlsIGFyZSBjb2xsYXBzZWQgc28gd2UgY2FuIGRpc3Bvc2Ugb2YgYWxsIHRoZSBWaWV3cyBhcyB3ZWxsXHJcbiAgICAgICAgdGhpcy5fZXZlbnRIYW5kbGVyLnN1YnNjcmliZSh0aGlzLnNoYXJlZFNlcnZpY2UuZ3JpZC5vblNvcnQsICgpID0+IHRoaXMuZGlzcG9zZUFsbFZpZXdDb21wb25lbnRzKCkpO1xyXG5cclxuICAgICAgICAvLyBvbiBmaWx0ZXIgY2hhbmdlZCwgd2UgbmVlZCB0byByZS1yZW5kZXIgYWxsIFZpZXdzXHJcbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9ucy5wdXNoKFxyXG4gICAgICAgICAgdGhpcy5maWx0ZXJTZXJ2aWNlLm9uRmlsdGVyQ2hhbmdlZC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5yZWRyYXdBbGxWaWV3Q29tcG9uZW50cygpKVxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHRoaXMuX2FkZG9uO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICAvLyAtLVxyXG4gIC8vIHByaXZhdGUgZnVuY3Rpb25zXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gIHByaXZhdGUgZGlzcG9zZVZpZXdDb21wb25lbnQoZXhwYW5kZWRWaWV3OiBDcmVhdGVkVmlldykge1xyXG4gICAgY29uc3QgY29tcFJlZiA9IGV4cGFuZGVkVmlldyAmJiBleHBhbmRlZFZpZXcuY29tcG9uZW50UmVmO1xyXG4gICAgaWYgKGNvbXBSZWYpIHtcclxuICAgICAgdGhpcy5hcHBSZWYuZGV0YWNoVmlldyhjb21wUmVmLmhvc3RWaWV3KTtcclxuICAgICAgY29tcFJlZi5kZXN0cm95KCk7XHJcbiAgICAgIHJldHVybiBleHBhbmRlZFZpZXc7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIG5vdGlmeSB0aGUgb25Bc3luY1Jlc3BvbnNlIHdpdGggdGhlIFwiYXJncy5pdGVtXCIgKHJlcXVpcmVkIHByb3BlcnR5KVxyXG4gICAqIHRoZSBwbHVnaW4gd2lsbCB0aGVuIHVzZSBpdGVtIHRvIHBvcHVsYXRlIHRoZSByb3cgZGV0YWlsIHBhbmVsIHdpdGggdGhlIFwicG9zdFRlbXBsYXRlXCJcclxuICAgKiBAcGFyYW0gaXRlbVxyXG4gICAqL1xyXG4gIHByaXZhdGUgbm90aWZ5VGVtcGxhdGUoaXRlbTogYW55KSB7XHJcbiAgICBpZiAodGhpcy5fYWRkb24pIHtcclxuICAgICAgdGhpcy5fYWRkb24ub25Bc3luY1Jlc3BvbnNlLm5vdGlmeSh7IGl0ZW0gfSwgdW5kZWZpbmVkLCB0aGlzKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE9uIFByb2Nlc3NpbmcsIHdlIHdpbGwgbm90aWZ5IHRoZSBwbHVnaW4gd2l0aCB0aGUgbmV3IGl0ZW0gZGV0YWlsIG9uY2UgYmFja2VuZCBzZXJ2ZXIgY2FsbCBjb21wbGV0ZXNcclxuICAgKiBAcGFyYW0gaXRlbVxyXG4gICAqL1xyXG4gIHByaXZhdGUgYXN5bmMgb25Qcm9jZXNzaW5nKGl0ZW06IGFueSkge1xyXG4gICAgaWYgKGl0ZW0gJiYgdHlwZW9mIHRoaXMuX3VzZXJQcm9jZXNzRm4gPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgbGV0IGF3YWl0ZWRJdGVtRGV0YWlsOiBhbnk7XHJcbiAgICAgIGNvbnN0IHVzZXJQcm9jZXNzRm4gPSB0aGlzLl91c2VyUHJvY2Vzc0ZuKGl0ZW0pO1xyXG5cclxuICAgICAgLy8gd2FpdCBmb3IgdGhlIFwidXNlclByb2Nlc3NGblwiLCBvbmNlIHJlc29sdmVkIHdlIHdpbGwgc2F2ZSBpdCBpbnRvIHRoZSBcImNvbGxlY3Rpb25cIlxyXG4gICAgICBjb25zdCByZXNwb25zZTogYW55IHwgYW55W10gPSBhd2FpdCB1c2VyUHJvY2Vzc0ZuO1xyXG5cclxuICAgICAgaWYgKHJlc3BvbnNlLmhhc093blByb3BlcnR5KCdpZCcpKSB7XHJcbiAgICAgICAgYXdhaXRlZEl0ZW1EZXRhaWwgPSByZXNwb25zZTsgLy8gZnJvbSBQcm9taXNlXHJcbiAgICAgIH0gZWxzZSBpZiAocmVzcG9uc2UgJiYgcmVzcG9uc2UgaW5zdGFuY2VvZiBPYnNlcnZhYmxlIHx8IHJlc3BvbnNlIGluc3RhbmNlb2YgUHJvbWlzZSkge1xyXG4gICAgICAgIGF3YWl0ZWRJdGVtRGV0YWlsID0gYXdhaXQgY2FzdFRvUHJvbWlzZShyZXNwb25zZSk7IC8vIGZyb20gQW5ndWxhci1odHRwLWNsaWVudFxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoIWF3YWl0ZWRJdGVtRGV0YWlsIHx8ICFhd2FpdGVkSXRlbURldGFpbC5oYXNPd25Qcm9wZXJ0eSgnaWQnKSkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgW0FuZ3VsYXItU2xpY2tncmlkXSBjb3VsZCBub3QgcHJvY2VzcyB0aGUgUm93IERldGFpbCwgeW91IG11c3QgbWFrZSBzdXJlIHRoYXQgeW91ciBcInByb2Nlc3NcIiBjYWxsYmFja1xyXG4gICAgICAgICAgKGEgUHJvbWlzZSBvciBhbiBIdHRwQ2xpZW50IGNhbGwgcmV0dXJuaW5nIGFuIE9ic2VydmFibGUpIHJldHVybnMgYW4gaXRlbSBvYmplY3QgdGhhdCBoYXMgYW4gXCJpZFwiIHByb3BlcnR5YCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIG5vdGlmeSB0aGUgcGx1Z2luIHdpdGggdGhlIG5ldyBpdGVtIGRldGFpbHNcclxuICAgICAgdGhpcy5ub3RpZnlUZW1wbGF0ZShhd2FpdGVkSXRlbURldGFpbCB8fCB7fSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBKdXN0IGJlZm9yZSB0aGUgcm93IGdldCBleHBhbmRlZCBvciBjb2xsYXBzZWQgd2Ugd2lsbCBkbyB0aGUgZm9sbG93aW5nXHJcbiAgICogRmlyc3QgZGV0ZXJtaW5lIGlmIHRoZSByb3cgaXMgZXhwYW5kaW5nIG9yIGNvbGxhcHNpbmcsXHJcbiAgICogaWYgaXQncyBleHBhbmRpbmcgd2Ugd2lsbCBhZGQgaXQgdG8gb3VyIFZpZXcgQ29tcG9uZW50cyByZWZlcmVuY2UgYXJyYXkgaWYgd2UgZG9uJ3QgYWxyZWFkeSBoYXZlIGl0XHJcbiAgICogb3IgaWYgaXQncyBjb2xsYXBzaW5nIHdlIHdpbGwgcmVtb3ZlIGl0IGZyb20gb3VyIFZpZXcgQ29tcG9uZW50cyByZWZlcmVuY2UgYXJyYXlcclxuICAgKi9cclxuICBwcml2YXRlIG9uQmVmb3JlUm93RGV0YWlsVG9nZ2xlKGU6IEV2ZW50LCBhcmdzOiB7IGdyaWQ6IGFueTsgaXRlbTogYW55OyB9KSB7XHJcbiAgICAvLyBleHBhbmRpbmdcclxuICAgIGlmIChhcmdzICYmIGFyZ3MuaXRlbSAmJiBhcmdzLml0ZW0uX19jb2xsYXBzZWQpIHtcclxuICAgICAgLy8gZXhwYW5kaW5nIHJvdyBkZXRhaWxcclxuICAgICAgY29uc3Qgdmlld0luZm86IENyZWF0ZWRWaWV3ID0ge1xyXG4gICAgICAgIGlkOiBhcmdzLml0ZW0uaWQsXHJcbiAgICAgICAgZGF0YUNvbnRleHQ6IGFyZ3MuaXRlbVxyXG4gICAgICB9O1xyXG4gICAgICBhZGRUb0FycmF5V2hlbk5vdEV4aXN0cyh0aGlzLl92aWV3cywgdmlld0luZm8pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gY29sbGFwc2luZywgc28gZGlzcG9zZSBvZiB0aGUgVmlldy9Db21wb25lbnRcclxuICAgICAgY29uc3QgZm91bmRWaWV3SW5kZXggPSB0aGlzLl92aWV3cy5maW5kSW5kZXgoKHZpZXc6IENyZWF0ZWRWaWV3KSA9PiB2aWV3LmlkID09PSBhcmdzLml0ZW0uaWQpO1xyXG4gICAgICBpZiAoZm91bmRWaWV3SW5kZXggPj0gMCAmJiB0aGlzLl92aWV3cy5oYXNPd25Qcm9wZXJ0eShmb3VuZFZpZXdJbmRleCkpIHtcclxuICAgICAgICBjb25zdCBjb21wUmVmID0gdGhpcy5fdmlld3NbZm91bmRWaWV3SW5kZXhdLmNvbXBvbmVudFJlZjtcclxuICAgICAgICB0aGlzLmFwcFJlZi5kZXRhY2hWaWV3KGNvbXBSZWYuaG9zdFZpZXcpO1xyXG4gICAgICAgIGNvbXBSZWYuZGVzdHJveSgpO1xyXG4gICAgICAgIHRoaXMuX3ZpZXdzLnNwbGljZShmb3VuZFZpZXdJbmRleCwgMSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiBXaGVuIFJvdyBjb21lcyBiYWNrIHRvIFZpZXdwb3J0IFJhbmdlLCB3ZSBuZWVkIHRvIHJlZHJhdyB0aGUgVmlldyAqL1xyXG4gIHByaXZhdGUgb25Sb3dCYWNrVG9WaWV3cG9ydFJhbmdlKGU6IEV2ZW50LCBhcmdzOiB7IGdyaWQ6IGFueTsgaXRlbTogYW55OyByb3dJZDogbnVtYmVyOyByb3dJbmRleDogbnVtYmVyOyBleHBhbmRlZFJvd3M6IGFueVtdOyByb3dJZHNPdXRPZlZpZXdwb3J0OiBudW1iZXJbXTsgfSkge1xyXG4gICAgaWYgKGFyZ3MgJiYgYXJncy5pdGVtKSB7XHJcbiAgICAgIHRoaXMuX3ZpZXdzLmZvckVhY2goKHZpZXcpID0+IHtcclxuICAgICAgICBpZiAodmlldy5pZCA9PT0gYXJncy5pdGVtLmlkKSB7XHJcbiAgICAgICAgICB0aGlzLnJlZHJhd1ZpZXdDb21wb25lbnQodmlldyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiBSZWRyYXcgKHJlLXJlbmRlcikgYWxsIHRoZSBleHBhbmRlZCByb3cgZGV0YWlsIFZpZXcgQ29tcG9uZW50cyAqL1xyXG4gIHByaXZhdGUgcmVkcmF3QWxsVmlld0NvbXBvbmVudHMoKSB7XHJcbiAgICB0aGlzLl92aWV3cy5mb3JFYWNoKChjb21wUmVmKSA9PiB7XHJcbiAgICAgIHRoaXMucmVkcmF3Vmlld0NvbXBvbmVudChjb21wUmVmKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqIFJlbmRlciBhbGwgdGhlIGV4cGFuZGVkIHJvdyBkZXRhaWwgVmlldyBDb21wb25lbnRzICovXHJcbiAgcHJpdmF0ZSByZW5kZXJBbGxWaWV3Q29tcG9uZW50cygpIHtcclxuICAgIHRoaXMuX3ZpZXdzLmZvckVhY2goKHZpZXcpID0+IHtcclxuICAgICAgaWYgKHZpZXcgJiYgdmlldy5kYXRhQ29udGV4dCkge1xyXG4gICAgICAgIHRoaXMucmVuZGVyVmlld01vZGVsKHZpZXcuZGF0YUNvbnRleHQpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKiBSZWRyYXcgdGhlIG5lY2Vzc2FyeSBWaWV3IENvbXBvbmVudCAqL1xyXG4gIHByaXZhdGUgcmVkcmF3Vmlld0NvbXBvbmVudChjcmVhdGVkVmlldzogQ3JlYXRlZFZpZXcpIHtcclxuICAgIGNvbnN0IGNvbnRhaW5lckVsZW1lbnRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHtST1dfREVUQUlMX0NPTlRBSU5FUl9QUkVGSVh9JHtjcmVhdGVkVmlldy5pZH1gKTtcclxuICAgIGlmIChjb250YWluZXJFbGVtZW50cyAmJiBjb250YWluZXJFbGVtZW50cy5sZW5ndGgpIHtcclxuICAgICAgdGhpcy5yZW5kZXJWaWV3TW9kZWwoY3JlYXRlZFZpZXcuZGF0YUNvbnRleHQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIFJlbmRlciAob3IgcmVyZW5kZXIpIHRoZSBWaWV3IENvbXBvbmVudCAoUm93IERldGFpbCkgKi9cclxuICBwcml2YXRlIHJlbmRlclByZWxvYWRWaWV3KCkge1xyXG4gICAgY29uc3QgY29udGFpbmVyRWxlbWVudHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke1BSRUxPQURfQ09OVEFJTkVSX1BSRUZJWH1gKTtcclxuICAgIGlmIChjb250YWluZXJFbGVtZW50cyAmJiBjb250YWluZXJFbGVtZW50cy5sZW5ndGgpIHtcclxuICAgICAgdGhpcy5hbmd1bGFyVXRpbFNlcnZpY2UuY3JlYXRlQW5ndWxhckNvbXBvbmVudEFwcGVuZFRvRG9tKHRoaXMuX3ByZWxvYWRDb21wb25lbnQsIGNvbnRhaW5lckVsZW1lbnRzWzBdLCB0cnVlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiBSZW5kZXIgKG9yIHJlcmVuZGVyKSB0aGUgVmlldyBDb21wb25lbnQgKFJvdyBEZXRhaWwpICovXHJcbiAgcHJpdmF0ZSByZW5kZXJWaWV3TW9kZWwoaXRlbTogYW55KSB7XHJcbiAgICBjb25zdCBjb250YWluZXJFbGVtZW50cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7Uk9XX0RFVEFJTF9DT05UQUlORVJfUFJFRklYfSR7aXRlbS5pZH1gKTtcclxuICAgIGlmIChjb250YWluZXJFbGVtZW50cyAmJiBjb250YWluZXJFbGVtZW50cy5sZW5ndGgpIHtcclxuICAgICAgY29uc3QgY29tcG9uZW50T3V0cHV0ID0gdGhpcy5hbmd1bGFyVXRpbFNlcnZpY2UuY3JlYXRlQW5ndWxhckNvbXBvbmVudEFwcGVuZFRvRG9tKHRoaXMuX3ZpZXdDb21wb25lbnQsIGNvbnRhaW5lckVsZW1lbnRzWzBdLCB0cnVlKTtcclxuICAgICAgaWYgKGNvbXBvbmVudE91dHB1dCAmJiBjb21wb25lbnRPdXRwdXQuY29tcG9uZW50UmVmICYmIGNvbXBvbmVudE91dHB1dC5jb21wb25lbnRSZWYuaW5zdGFuY2UpIHtcclxuICAgICAgICBPYmplY3QuYXNzaWduKGNvbXBvbmVudE91dHB1dC5jb21wb25lbnRSZWYuaW5zdGFuY2UsIHsgbW9kZWw6IGl0ZW0gfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IHZpZXdPYmogPSB0aGlzLl92aWV3cy5maW5kKChvYmopID0+IG9iai5pZCA9PT0gaXRlbS5pZCk7XHJcbiAgICAgICAgaWYgKHZpZXdPYmopIHtcclxuICAgICAgICAgIHZpZXdPYmouY29tcG9uZW50UmVmID0gY29tcG9uZW50T3V0cHV0LmNvbXBvbmVudFJlZjtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19