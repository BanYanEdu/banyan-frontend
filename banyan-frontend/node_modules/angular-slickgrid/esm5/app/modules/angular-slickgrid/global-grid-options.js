import { DelimiterType, FileType } from './models/index';
import { Filters } from './filters/index';
/**
 * Options that can be passed to the Bootstrap-Datetimepicker directly
 */
export var GlobalGridOptions = {
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
        delimiter: DelimiterType.comma,
        exportWithFormatter: false,
        filename: 'export',
        format: FileType.csv,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFsLWdyaWQtb3B0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvZ2xvYmFsLWdyaWQtb3B0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBYyxNQUFNLGdCQUFnQixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUxQzs7R0FFRztBQUNILE1BQU0sQ0FBQyxJQUFNLGlCQUFpQixHQUFlO0lBQzNDLHdCQUF3QixFQUFFLElBQUk7SUFDOUIsUUFBUSxFQUFFLEtBQUs7SUFDZixrQkFBa0IsRUFBRSxLQUFLO0lBQ3pCLHlCQUF5QixFQUFFLElBQUk7SUFDL0IsVUFBVSxFQUFFO1FBQ1Ysd0JBQXdCLEVBQUUsUUFBUTtRQUNsQyxhQUFhLEVBQUUsRUFBRTtRQUNqQixTQUFTLEVBQUUsR0FBRztRQUNkLFFBQVEsRUFBRSxHQUFHO1FBQ2IsV0FBVyxFQUFFLENBQUM7S0FDZjtJQUNELHFCQUFxQixFQUFFLHFCQUFxQjtJQUM1QyxnQkFBZ0IsRUFBRTtRQUNoQixRQUFRLEVBQUUsd0JBQXdCO0tBQ25DO0lBQ0QsWUFBWSxFQUFFO1FBQ1osa0JBQWtCLEVBQUUsS0FBSztRQUN6QixvQkFBb0IsRUFBRSxJQUFJO0tBQzNCO0lBQ0QscUJBQXFCLEVBQUUsSUFBSTtJQUMzQixhQUFhLEVBQUUsT0FBTyxDQUFDLEtBQUs7SUFDNUIsMEJBQTBCLEVBQUUsS0FBSztJQUNqQyx3QkFBd0IsRUFBRSxXQUFXO0lBQ3JDLFFBQVEsRUFBRSxLQUFLO0lBQ2YsZ0JBQWdCLEVBQUUsSUFBSTtJQUN0QixxQkFBcUIsRUFBRSxJQUFJO0lBQzNCLG9CQUFvQixFQUFFLEtBQUs7SUFDM0Isa0JBQWtCLEVBQUUsSUFBSTtJQUN4QixtQkFBbUIsRUFBRSxJQUFJO0lB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IERlbGltaXRlclR5cGUsIEZpbGVUeXBlLCBHcmlkT3B0aW9uIH0gZnJvbSAnLi9tb2RlbHMvaW5kZXgnO1xyXG5pbXBvcnQgeyBGaWx0ZXJzIH0gZnJvbSAnLi9maWx0ZXJzL2luZGV4JztcclxuXHJcbi8qKlxyXG4gKiBPcHRpb25zIHRoYXQgY2FuIGJlIHBhc3NlZCB0byB0aGUgQm9vdHN0cmFwLURhdGV0aW1lcGlja2VyIGRpcmVjdGx5XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgR2xvYmFsR3JpZE9wdGlvbnM6IEdyaWRPcHRpb24gPSB7XHJcbiAgYWx3YXlzU2hvd1ZlcnRpY2FsU2Nyb2xsOiB0cnVlLFxyXG4gIGF1dG9FZGl0OiBmYWxzZSxcclxuICBhc3luY0VkaXRvckxvYWRpbmc6IGZhbHNlLFxyXG4gIGF1dG9GaXRDb2x1bW5zT25GaXJzdExvYWQ6IHRydWUsXHJcbiAgYXV0b1Jlc2l6ZToge1xyXG4gICAgY2FsY3VsYXRlQXZhaWxhYmxlU2l6ZUJ5OiAnd2luZG93JyxcclxuICAgIGJvdHRvbVBhZGRpbmc6IDIwLFxyXG4gICAgbWluSGVpZ2h0OiAxODAsXHJcbiAgICBtaW5XaWR0aDogMzAwLFxyXG4gICAgc2lkZVBhZGRpbmc6IDBcclxuICB9LFxyXG4gIGNlbGxIaWdobGlnaHRDc3NDbGFzczogJ3NsaWNrLWNlbGwtbW9kaWZpZWQnLFxyXG4gIGNoZWNrYm94U2VsZWN0b3I6IHtcclxuICAgIGNzc0NsYXNzOiAnc2xpY2stY2VsbC1jaGVja2JveHNlbCdcclxuICB9LFxyXG4gIGNvbHVtblBpY2tlcjoge1xyXG4gICAgaGlkZUZvcmNlRml0QnV0dG9uOiBmYWxzZSxcclxuICAgIGhpZGVTeW5jUmVzaXplQnV0dG9uOiB0cnVlXHJcbiAgfSxcclxuICBkYXRhc2V0SWRQcm9wZXJ0eU5hbWU6ICdpZCcsXHJcbiAgZGVmYXVsdEZpbHRlcjogRmlsdGVycy5pbnB1dCxcclxuICBlbmFibGVGaWx0ZXJUcmltV2hpdGVTcGFjZTogZmFsc2UsIC8vIGRvIHdlIHdhbnQgdG8gdHJpbSB3aGl0ZSBzcGFjZXMgb24gYWxsIEZpbHRlcnM/XHJcbiAgZGVmYXVsdEZpbHRlclBsYWNlaG9sZGVyOiAnJiMxMjgyNjk7JyxcclxuICBlZGl0YWJsZTogZmFsc2UsXHJcbiAgZW5hYmxlQXV0b1Jlc2l6ZTogdHJ1ZSxcclxuICBlbmFibGVBdXRvU2l6ZUNvbHVtbnM6IHRydWUsXHJcbiAgZW5hYmxlQ2VsbE5hdmlnYXRpb246IGZhbHNlLFxyXG4gIGVuYWJsZUNvbHVtblBpY2tlcjogdHJ1ZSxcclxuICBlbmFibGVDb2x1bW5SZW9yZGVyOiB0cnVlLFxyXG4gIGVuYWJsZUV4cG9ydDogdHJ1ZSxcclxuICBlbmFibGVHcmlkTWVudTogdHJ1ZSxcclxuICBlbmFibGVIZWFkZXJNZW51OiB0cnVlLFxyXG4gIGVuYWJsZU1vdXNlSG92ZXJIaWdobGlnaHRSb3c6IHRydWUsXHJcbiAgZW5hYmxlU29ydGluZzogdHJ1ZSxcclxuICBlbmFibGVUZXh0U2VsZWN0aW9uT25DZWxsczogdHJ1ZSxcclxuICBleHBsaWNpdEluaXRpYWxpemF0aW9uOiB0cnVlLFxyXG4gIGV4cG9ydE9wdGlvbnM6IHtcclxuICAgIGRlbGltaXRlcjogRGVsaW1pdGVyVHlwZS5jb21tYSxcclxuICAgIGV4cG9ydFdpdGhGb3JtYXR0ZXI6IGZhbHNlLFxyXG4gICAgZmlsZW5hbWU6ICdleHBvcnQnLFxyXG4gICAgZm9ybWF0OiBGaWxlVHlwZS5jc3YsXHJcbiAgICBncm91cGluZ0FnZ3JlZ2F0b3JSb3dUZXh0OiAnJyxcclxuICAgIHNhbml0aXplRGF0YUV4cG9ydDogZmFsc2UsXHJcbiAgICB1c2VVdGY4V2l0aEJvbTogdHJ1ZVxyXG4gIH0sXHJcbiAgZm9yY2VGaXRDb2x1bW5zOiBmYWxzZSxcclxuICBncmlkTWVudToge1xyXG4gICAgaGlkZUNsZWFyQWxsRmlsdGVyc0NvbW1hbmQ6IGZhbHNlLFxyXG4gICAgaGlkZUNsZWFyQWxsU29ydGluZ0NvbW1hbmQ6IGZhbHNlLFxyXG4gICAgaGlkZUV4cG9ydENzdkNvbW1hbmQ6IGZhbHNlLFxyXG4gICAgaGlkZUV4cG9ydFRleHREZWxpbWl0ZWRDb21tYW5kOiB0cnVlLFxyXG4gICAgaGlkZUZvcmNlRml0QnV0dG9uOiBmYWxzZSxcclxuICAgIGhpZGVSZWZyZXNoRGF0YXNldENvbW1hbmQ6IGZhbHNlLFxyXG4gICAgaGlkZVN5bmNSZXNpemVCdXR0b246IHRydWUsXHJcbiAgICBoaWRlVG9nZ2xlRmlsdGVyQ29tbWFuZDogZmFsc2UsXHJcbiAgICBoaWRlVG9nZ2xlUHJlSGVhZGVyQ29tbWFuZDogZmFsc2UsXHJcbiAgICBpY29uQ3NzQ2xhc3M6ICdmYSBmYS1iYXJzJyxcclxuICAgIGljb25DbGVhckFsbEZpbHRlcnNDb21tYW5kOiAnZmEgZmEtZmlsdGVyIHRleHQtZGFuZ2VyJyxcclxuICAgIGljb25DbGVhckFsbFNvcnRpbmdDb21tYW5kOiAnZmEgZmEtdW5zb3J0ZWQgdGV4dC1kYW5nZXInLFxyXG4gICAgaWNvbkV4cG9ydENzdkNvbW1hbmQ6ICdmYSBmYS1kb3dubG9hZCcsXHJcbiAgICBpY29uRXhwb3J0VGV4dERlbGltaXRlZENvbW1hbmQ6ICdmYSBmYS1kb3dubG9hZCcsXHJcbiAgICBpY29uUmVmcmVzaERhdGFzZXRDb21tYW5kOiAnZmEgZmEtcmVmcmVzaCcsXHJcbiAgICBpY29uVG9nZ2xlRmlsdGVyQ29tbWFuZDogJ2ZhIGZhLXJhbmRvbScsXHJcbiAgICBpY29uVG9nZ2xlUHJlSGVhZGVyQ29tbWFuZDogJ2ZhIGZhLXJhbmRvbScsXHJcbiAgICBtZW51V2lkdGg6IDE2LFxyXG4gICAgcmVzaXplT25TaG93SGVhZGVyUm93OiB0cnVlXHJcbiAgfSxcclxuICBoZWFkZXJNZW51OiB7XHJcbiAgICBhdXRvQWxpZ246IHRydWUsXHJcbiAgICBhdXRvQWxpZ25PZmZzZXQ6IDEyLFxyXG4gICAgbWluV2lkdGg6IDE0MCxcclxuICAgIGljb25DbGVhckZpbHRlckNvbW1hbmQ6ICdmYSBmYS1maWx0ZXIgdGV4dC1kYW5nZXInLFxyXG4gICAgaWNvbkNsZWFyU29ydENvbW1hbmQ6ICdmYSBmYS11bnNvcnRlZCcsXHJcbiAgICBpY29uU29ydEFzY0NvbW1hbmQ6ICdmYSBmYS1zb3J0LWFtb3VudC1hc2MnLFxyXG4gICAgaWNvblNvcnREZXNjQ29tbWFuZDogJ2ZhIGZhLXNvcnQtYW1vdW50LWRlc2MnLFxyXG4gICAgaWNvbkNvbHVtbkhpZGVDb21tYW5kOiAnZmEgZmEtdGltZXMnLFxyXG4gICAgaGlkZUNvbHVtbkhpZGVDb21tYW5kOiBmYWxzZSxcclxuICAgIGhpZGVDbGVhckZpbHRlckNvbW1hbmQ6IGZhbHNlLFxyXG4gICAgaGlkZUNsZWFyU29ydENvbW1hbmQ6IGZhbHNlLFxyXG4gICAgaGlkZVNvcnRDb21tYW5kczogZmFsc2VcclxuICB9LFxyXG4gIGhlYWRlclJvd0hlaWdodDogMzUsXHJcbiAgbXVsdGlDb2x1bW5Tb3J0OiB0cnVlLFxyXG4gIG51bWJlcmVkTXVsdGlDb2x1bW5Tb3J0OiB0cnVlLFxyXG4gIHRyaXN0YXRlTXVsdGlDb2x1bW5Tb3J0OiBmYWxzZSxcclxuICBzb3J0Q29sTnVtYmVySW5TZXBhcmF0ZVNwYW46IHRydWUsXHJcbiAgc3VwcHJlc3NBY3RpdmVDZWxsQ2hhbmdlT25FZGl0OiB0cnVlLFxyXG4gIHBhZ2luYXRpb246IHtcclxuICAgIHBhZ2VTaXplczogWzEwLCAxNSwgMjAsIDI1LCAzMCwgNDAsIDUwLCA3NSwgMTAwXSxcclxuICAgIHBhZ2VTaXplOiAyNSxcclxuICAgIHRvdGFsSXRlbXM6IDBcclxuICB9LFxyXG4gIHJvd0RldGFpbFZpZXc6IHtcclxuICAgIGNzc0NsYXNzOiAnZGV0YWlsLXZpZXctdG9nZ2xlJyxcclxuICAgIHBhbmVsUm93czogMSxcclxuICAgIGtleVByZWZpeDogJ19fJyxcclxuICAgIHVzZVJvd0NsaWNrOiB0cnVlLFxyXG4gICAgdXNlU2ltcGxlVmlld3BvcnRDYWxjOiB0cnVlLFxyXG4gICAgc2F2ZURldGFpbFZpZXdPblNjcm9sbDogZmFsc2UsXHJcblxyXG4gICAgLy8gdGhlIGZvbGxvd2luZyAyIHByb3BlcnR5L21ldGhvZCBzaG91bGQgYWx3YXlzIGJlIG92ZXJyaWRlIGJ5IHRoZSB1c2VyXHJcbiAgICBwcm9jZXNzOiAoKSA9PiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gcmVzb2x2ZSgnJykpLFxyXG4gICAgdmlld0NvbXBvbmVudDogbnVsbFxyXG4gIH0sXHJcbiAgcm93SGVpZ2h0OiAzNSxcclxuICB0b3BQYW5lbEhlaWdodDogMzVcclxufTtcclxuIl19