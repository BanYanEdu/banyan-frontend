import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FileType } from './../models/index';
import { addWhiteSpaces, htmlEntityDecode, sanitizeHtmlToText } from './../services/utilities';
import { Subject } from 'rxjs';
import { TextEncoder } from 'text-encoding-utf-8';
var ExportService = /** @class */ (function () {
    function ExportService(translate) {
        this.translate = translate;
        this._lineCarriageReturn = '\n';
        this._hasGroupedItems = false;
        this.onGridBeforeExportToFile = new Subject();
        this.onGridAfterExportToFile = new Subject();
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
        this._exportQuoteWrapper = (format === FileType.csv) ? '"' : '';
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
            if (format === FileType.csv && itemData) {
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
        if (format === FileType.csv) {
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
            if (format === FileType.csv) {
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
        var mimeType = (options.format === FileType.csv) ? 'text/csv' : 'text/plain';
        // make sure no html entities exist in the data
        var csvContent = htmlEntityDecode(options.csvContent);
        // dealing with Excel CSV export and UTF-8 is a little tricky.. We will use Option #2 to cover older Excel versions
        // Option #1: we need to make Excel knowing that it's dealing with an UTF-8, A correctly formatted UTF8 file can have a Byte Order Mark as its first three octets
        // reference: http://stackoverflow.com/questions/155097/microsoft-excel-mangles-diacritics-in-csv-files
        // Option#2: use a 3rd party extension to javascript encode into UTF-16
        var outputData;
        if (options.format === FileType.csv) {
            outputData = new TextEncoder('utf-8').encode(csvContent);
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
    ExportService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [TranslateService])
    ], ExportService);
    return ExportService;
}());
export { ExportService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwb3J0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL3NlcnZpY2VzL2V4cG9ydC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3ZELE9BQU8sRUFHTCxRQUFRLEVBR1QsTUFBTSxtQkFBbUIsQ0FBQztBQUMzQixPQUFPLEVBQUUsY0FBYyxFQUFFLGdCQUFnQixFQUFFLGtCQUFrQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDL0YsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFXbEQ7SUFZRSx1QkFBb0IsU0FBMkI7UUFBM0IsY0FBUyxHQUFULFNBQVMsQ0FBa0I7UUFYdkMsd0JBQW1CLEdBQUcsSUFBSSxDQUFDO1FBTTNCLHFCQUFnQixHQUFHLEtBQUssQ0FBQztRQUVqQyw2QkFBd0IsR0FBRyxJQUFJLE9BQU8sRUFBVyxDQUFDO1FBQ2xELDRCQUF1QixHQUFHLElBQUksT0FBTyxFQUFvQixDQUFDO0lBRVAsQ0FBQztJQUVwRCxzQkFBWSx3Q0FBYTthQUF6QjtZQUNFLE9BQU8sSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLHFCQUFxQixJQUFJLElBQUksQ0FBQztRQUM5RSxDQUFDOzs7T0FBQTtJQUdELHNCQUFZLHVDQUFZO1FBRHhCLGlFQUFpRTthQUNqRTtZQUNFLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFB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SUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUM7WUFDOUIsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7WUFDbkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBRWhELHdFQUF3RTtZQUN4RSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUM7WUFFakMsMEhBQTBIO1lBQzFILFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNiLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2pDO0lBQ0gsQ0FBQztJQTdWVSxhQUFhO1FBRHpCLFVBQVUsRUFBRTtpREFhb0IsZ0JBQWdCO09BWnBDLGFBQWEsQ0E4VnpCO0lBQUQsb0JBQUM7Q0FBQSxBQTlWRCxJQThWQztTQTlWWSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlIH0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XHJcbmltcG9ydCB7XHJcbiAgQ29sdW1uLFxyXG4gIEV4cG9ydE9wdGlvbixcclxuICBGaWxlVHlwZSxcclxuICBGb3JtYXR0ZXIsXHJcbiAgR3JpZE9wdGlvblxyXG59IGZyb20gJy4vLi4vbW9kZWxzL2luZGV4JztcclxuaW1wb3J0IHsgYWRkV2hpdGVTcGFjZXMsIGh0bWxFbnRpdHlEZWNvZGUsIHNhbml0aXplSHRtbFRvVGV4dCB9IGZyb20gJy4vLi4vc2VydmljZXMvdXRpbGl0aWVzJztcclxuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBUZXh0RW5jb2RlciB9IGZyb20gJ3RleHQtZW5jb2RpbmctdXRmLTgnO1xyXG5cclxuLy8gdXNpbmcgZXh0ZXJuYWwgbm9uLXR5cGVkIGpzIGxpYnJhcmllc1xyXG5kZWNsYXJlIGxldCAkOiBhbnk7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEV4cG9ydENvbHVtbkhlYWRlciB7XHJcbiAga2V5OiBzdHJpbmc7XHJcbiAgdGl0bGU6IHN0cmluZztcclxufVxyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgRXhwb3J0U2VydmljZSB7XHJcbiAgcHJpdmF0ZSBfbGluZUNhcnJpYWdlUmV0dXJuID0gJ1xcbic7XHJcbiAgcHJpdmF0ZSBfZGF0YVZpZXc6IGFueTtcclxuICBwcml2YXRlIF9ncmlkOiBhbnk7XHJcbiAgcHJpdmF0ZSBfZXhwb3J0UXVvdGVXcmFwcGVyOiBzdHJpbmc7XHJcbiAgcHJpdmF0ZSBfY29sdW1uSGVhZGVyczogRXhwb3J0Q29sdW1uSGVhZGVyW107XHJcbiAgcHJpdmF0ZSBfZ3JvdXBlZEhlYWRlcnM6IEV4cG9ydENvbHVtbkhlYWRlcltdO1xyXG4gIHByaXZhdGUgX2hhc0dyb3VwZWRJdGVtcyA9IGZhbHNlO1xyXG4gIHByaXZhdGUgX2V4cG9ydE9wdGlvbnM6IEV4cG9ydE9wdGlvbjtcclxuICBvbkdyaWRCZWZvcmVFeHBvcnRUb0ZpbGUgPSBuZXcgU3ViamVjdDxib29sZWFuPigpO1xyXG4gIG9uR3JpZEFmdGVyRXhwb3J0VG9GaWxlID0gbmV3IFN1YmplY3Q8eyBvcHRpb25zOiBhbnkgfT4oKTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSB0cmFuc2xhdGU6IFRyYW5zbGF0ZVNlcnZpY2UpIHsgfVxyXG5cclxuICBwcml2YXRlIGdldCBkYXRhc2V0SWROYW1lKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5fZ3JpZE9wdGlvbnMgJiYgdGhpcy5fZ3JpZE9wdGlvbnMuZGF0YXNldElkUHJvcGVydHlOYW1lIHx8ICdpZCc7XHJcbiAgfVxyXG5cclxuICAvKiogR2V0dGVyIGZvciB0aGUgR3JpZCBPcHRpb25zIHB1bGxlZCB0aHJvdWdoIHRoZSBHcmlkIE9iamVjdCAqL1xyXG4gIHByaXZhdGUgZ2V0IF9ncmlkT3B0aW9ucygpOiBHcmlkT3B0aW9uIHtcclxuICAgIHJldHVybiAodGhpcy5fZ3JpZCAmJiB0aGlzLl9ncmlkLmdldE9wdGlvbnMpID8gdGhpcy5fZ3JpZC5nZXRPcHRpb25zKCkgOiB7fTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEluaXRpYWxpemUgdGhlIEV4cG9ydCBTZXJ2aWNlXHJcbiAgICogQHBhcmFtIGdyaWRcclxuICAgKiBAcGFyYW0gZ3JpZE9wdGlvbnNcclxuICAgKiBAcGFyYW0gZGF0YVZpZXdcclxuICAgKi9cclxuICBpbml0KGdyaWQ6IGFueSwgZGF0YVZpZXc6IGFueSk6IHZvaWQge1xyXG4gICAgdGhpcy5fZ3JpZCA9IGdyaWQ7XHJcbiAgICB0aGlzLl9kYXRhVmlldyA9IGRhdGFWaWV3O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRnVuY3Rpb24gdG8gZXhwb3J0IHRoZSBHcmlkIHJlc3VsdCB0byBhbiBFeGNlbCBDU1YgZm9ybWF0IHVzaW5nIGphdmFzY3JpcHQgZm9yIGl0IHRvIHByb2R1Y2UgdGhlIENTViBmaWxlLlxyXG4gICAqIFRoaXMgaXMgYSBXWVNJV1lHIGV4cG9ydCB0byBmaWxlIG91dHB1dCAoV2hhdCBZb3UgU2VlIGlzIFdoYXQgWW91IEdldClcclxuICAgKlxyXG4gICAqIE5PVEVTOiBUaGUgY29sdW1uIHBvc2l0aW9uIG5lZWRzIHRvIG1hdGNoIHBlcmZlY3RseSB0aGUgSlNPTiBPYmplY3QgcG9zaXRpb24gYmVjYXVzZSBvZiB0aGUgd2F5IHdlIGFyZSBwdWxsaW5nIHRoZSBkYXRhLFxyXG4gICAqIHdoaWNoIG1lYW5zIHRoYXQgaWYgYW55IGNvbHVtbihzKSBnb3QgbW92ZWQgaW4gdGhlIFVJLCBpdCBoYXMgdG8gYmUgcmVmbGVjdGVkIGluIHRoZSBKU09OIGFycmF5IG91dHB1dCBhcyB3ZWxsXHJcbiAgICpcclxuICAgKiBFeGFtcGxlOiBleHBvcnRUb0ZpbGUoeyBmb3JtYXQ6IEZpbGVUeXBlLmNzdiwgZGVsaW1pdGVyOiBEZWxpbWl0ZXJUeXBlLmNvbW1hIH0pXHJcbiAgICovXHJcbiAgZXhwb3J0VG9GaWxlKG9wdGlvbnM6IEV4cG9ydE9wdGlvbikge1xyXG4gICAgdGhpcy5vbkdyaWRCZWZvcmVFeHBvcnRUb0ZpbGUubmV4dCh0cnVlKTtcclxuICAgIHRoaXMuX2V4cG9ydE9wdGlvbnMgPSAkLmV4dGVuZCh0cnVlLCB7fSwgdGhpcy5fZ3JpZE9wdGlvbnMuZXhwb3J0T3B0aW9ucywgb3B0aW9ucyk7XHJcblxyXG4gICAgLy8gZ2V0IHRoZSBDU1Ygb3V0cHV0IGZyb20gdGhlIGdyaWQgZGF0YVxyXG4gICAgY29uc3QgZGF0YU91dHB1dCA9IHRoaXMuZ2V0RGF0YU91dHB1dCgpO1xyXG5cclxuICAgIC8vIHRyaWdnZXIgYSBkb3dubG9hZCBmaWxlXHJcbiAgICAvLyB3cmFwIGl0IGludG8gYSBzZXRUaW1lb3V0IHNvIHRoYXQgdGhlIEV2ZW50QWdncmVnYXRvciBoYXMgZW5vdWdoIHRpbWUgdG8gc3RhcnQgYSBwcmUtcHJvY2VzcyBsaWtlIHNob3dpbmcgYSBzcGlubmVyXHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgY29uc3QgZG93bmxvYWRPcHRpb25zID0ge1xyXG4gICAgICAgIGZpbGVuYW1lOiBgJHt0aGlzLl9leHBvcnRPcHRpb25zLmZpbGVuYW1lfS4ke3RoaXMuX2V4cG9ydE9wdGlvbnMuZm9ybWF0fWAsXHJcbiAgICAgICAgY3N2Q29udGVudDogZGF0YU91dHB1dCxcclxuICAgICAgICBmb3JtYXQ6IHRoaXMuX2V4cG9ydE9wdGlvbnMuZm9ybWF0LFxyXG4gICAgICAgIHVzZVV0ZjhXaXRoQm9tOiB0aGlzLl9leHBvcnRPcHRpb25zLnVzZVV0ZjhXaXRoQm9tXHJcbiAgICAgIH07XHJcbiAgICAgIHRoaXMuc3RhcnREb3dubG9hZEZpbGUoZG93bmxvYWRPcHRpb25zKTtcclxuICAgICAgdGhpcy5vbkdyaWRBZnRlckV4cG9ydFRvRmlsZS5uZXh0KHsgb3B0aW9uczogZG93bmxvYWRPcHRpb25zIH0pO1xyXG4gICAgfSwgMCk7XHJcbiAgfVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIFByaXZhdGUgZnVuY3Rpb25zXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgZ2V0RGF0YU91dHB1dCgpOiBzdHJpbmcge1xyXG4gICAgY29uc3QgY29sdW1ucyA9IHRoaXMuX2dyaWQuZ2V0Q29sdW1ucygpIHx8IFtdO1xyXG4gICAgY29uc3QgZGVsaW1pdGVyID0gdGhpcy5fZXhwb3J0T3B0aW9ucy5kZWxpbWl0ZXIgfHwgJyc7XHJcbiAgICBjb25zdCBmb3JtYXQgPSB0aGlzLl9leHBvcnRPcHRpb25zLmZvcm1hdCB8fCAnJztcclxuICAgIGNvbnN0IGdyb3VwQnlDb2x1bW5IZWFkZXIgPSB0aGlzLl9leHBvcnRPcHRpb25zLmdyb3VwaW5nQ29sdW1uSGVhZGVyVGl0bGUgfHwgdGhpcy50cmFuc2xhdGUuaW5zdGFudCgnR1JPVVBfQlknKTtcclxuXHJcbiAgICAvLyBhIENTViBuZWVkcyBkb3VibGUgcXVvdGVzIHdyYXBwZXIsIHRoZSBvdGhlciB0eXBlcyBkbyBub3QgbmVlZCBhbnkgd3JhcHBlclxyXG4gICAgdGhpcy5fZXhwb3J0UXVvdGVXcmFwcGVyID0gKGZvcm1hdCA9PT0gRmlsZVR5cGUuY3N2KSA/ICdcIicgOiAnJztcclxuXHJcbiAgICAvLyBkYXRhIHZhcmlhYmxlIHdoaWNoIHdpbGwgaG9sZCBhbGwgdGhlIGZpZWxkcyBkYXRhIG9mIGEgcm93XHJcbiAgICBsZXQgb3V0cHV0RGF0YVN0cmluZyA9ICcnO1xyXG5cclxuICAgIC8vIGdldCBncm91cGVkIGNvbHVtbiB0aXRsZXMgYW5kIGlmIGZvdW5kLCB3ZSB3aWxsIGFkZCBhIFwiR3JvdXAgYnlcIiBjb2x1bW4gYXQgdGhlIGZpcnN0IGNvbHVtbiBpbmRleFxyXG4gICAgY29uc3QgZ3JvdXBpbmcgPSB0aGlzLl9kYXRhVmlldy5nZXRHcm91cGluZygpO1xyXG4gICAgaWYgKGdyb3VwaW5nICYmIEFycmF5LmlzQXJyYXkoZ3JvdXBpbmcpICYmIGdyb3VwaW5nLmxlbmd0aCA+IDApIHtcclxuICAgICAgdGhpcy5faGFzR3JvdXBlZEl0ZW1zID0gdHJ1ZTtcclxuICAgICAgb3V0cHV0RGF0YVN0cmluZyArPSBgJHtncm91cEJ5Q29sdW1uSGVhZGVyfWAgKyBkZWxpbWl0ZXI7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLl9oYXNHcm91cGVkSXRlbXMgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBnZXQgYWxsIGNvbHVtbiBoZWFkZXJzXHJcbiAgICB0aGlzLl9jb2x1bW5IZWFkZXJzID0gdGhpcy5nZXRDb2x1bW5IZWFkZXJzKGNvbHVtbnMpIHx8IFtdO1xyXG4gICAgaWYgKHRoaXMuX2NvbHVtbkhlYWRlcnMgJiYgQXJyYXkuaXNBcnJheSh0aGlzLl9jb2x1bW5IZWFkZXJzKSAmJiB0aGlzLl9jb2x1bW5IZWFkZXJzLmxlbmd0aCA+IDApIHtcclxuICAgICAgLy8gYWRkIHRoZSBoZWFkZXIgcm93ICsgYWRkIGEgbmV3IGxpbmUgYXQgdGhlIGVuZCBvZiB0aGUgcm93XHJcbiAgICAgIGNvbnN0IG91dHB1dEhlYWRlclRpdGxlcyA9IHRoaXMuX2NvbHVtbkhlYWRlcnMubWFwKChoZWFkZXIpID0+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZXhwb3J0UXVvdGVXcmFwcGVyICsgaGVhZGVyLnRpdGxlICsgdGhpcy5fZXhwb3J0UXVvdGVXcmFwcGVyO1xyXG4gICAgICB9KTtcclxuICAgICAgb3V0cHV0RGF0YVN0cmluZyArPSAob3V0cHV0SGVhZGVyVGl0bGVzLmpvaW4oZGVsaW1pdGVyKSArIHRoaXMuX2xpbmVDYXJyaWFnZVJldHVybik7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUG9wdWxhdGUgdGhlIHJlc3Qgb2YgdGhlIEdyaWQgRGF0YVxyXG4gICAgb3V0cHV0RGF0YVN0cmluZyArPSB0aGlzLmdldEFsbEdyaWRSb3dEYXRhKGNvbHVtbnMsIHRoaXMuX2xpbmVDYXJyaWFnZVJldHVybik7XHJcblxyXG4gICAgcmV0dXJuIG91dHB1dERhdGFTdHJpbmc7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgYWxsIHRoZSBncmlkIHJvdyBkYXRhIGFuZCByZXR1cm4gdGhhdCBhcyBhbiBvdXRwdXQgc3RyaW5nXHJcbiAgICovXHJcbiAgZ2V0QWxsR3JpZFJvd0RhdGEoY29sdW1uczogQ29sdW1uW10sIGxpbmVDYXJyaWFnZVJldHVybjogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIGNvbnN0IG91dHB1dERhdGFTdHJpbmdzID0gW107XHJcbiAgICBjb25zdCBsaW5lQ291bnQgPSB0aGlzLl9kYXRhVmlldy5nZXRMZW5ndGgoKTtcclxuXHJcbiAgICAvLyBsb29wIHRocm91Z2ggYWxsIHRoZSBncmlkIHJvd3Mgb2YgZGF0YVxyXG4gICAgZm9yIChsZXQgcm93TnVtYmVyID0gMDsgcm93TnVtYmVyIDwgbGluZUNvdW50OyByb3dOdW1iZXIrKykge1xyXG4gICAgICBjb25zdCBpdGVtT2JqID0gdGhpcy5fZGF0YVZpZXcuZ2V0SXRlbShyb3dOdW1iZXIpO1xyXG5cclxuICAgICAgaWYgKGl0ZW1PYmogIT0gbnVsbCkge1xyXG4gICAgICAgIC8vIE5vcm1hbCByb3cgKG5vdCBncm91cGVkIGJ5IGFueXRoaW5nKSB3b3VsZCBoYXZlIGFuIElEIHdoaWNoIHdhcyBwcmVkZWZpbmVkIGluIHRoZSBHcmlkIENvbHVtbnMgZGVmaW5pdGlvblxyXG4gICAgICAgIGlmIChpdGVtT2JqW3RoaXMuZGF0YXNldElkTmFtZV0gIT0gbnVsbCkge1xyXG4gICAgICAgICAgLy8gZ2V0IHJlZ3VsYXIgcm93IGl0ZW0gZGF0YVxyXG4gICAgICAgICAgb3V0cHV0RGF0YVN0cmluZ3MucHVzaCh0aGlzLnJlYWRSZWd1bGFyUm93RGF0YShjb2x1bW5zLCByb3dOdW1iZXIsIGl0ZW1PYmopKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2hhc0dyb3VwZWRJdGVtcyAmJiBpdGVtT2JqLl9fZ3JvdXBUb3RhbHMgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgLy8gZ2V0IHRoZSBncm91cCByb3dcclxuICAgICAgICAgIG91dHB1dERhdGFTdHJpbmdzLnB1c2godGhpcy5yZWFkR3JvdXBlZFRpdGxlUm93KGl0ZW1PYmopKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGl0ZW1PYmouX19ncm91cFRvdGFscykge1xyXG4gICAgICAgICAgLy8gZWxzZSBpZiB0aGUgcm93IGlzIGEgR3JvdXAgQnkgYW5kIHdlIGhhdmUgYWdyZWdnYXRvcnMsIHRoZW4gYSBwcm9wZXJ0eSBvZiAnX19ncm91cFRvdGFscycgd291bGQgZXhpc3QgdW5kZXIgdGhhdCBvYmplY3RcclxuICAgICAgICAgIG91dHB1dERhdGFTdHJpbmdzLnB1c2godGhpcy5yZWFkR3JvdXBlZFRvdGFsUm93KGNvbHVtbnMsIGl0ZW1PYmopKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gb3V0cHV0RGF0YVN0cmluZ3Muam9pbih0aGlzLl9saW5lQ2FycmlhZ2VSZXR1cm4pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IGFsbCBoZWFkZXIgdGl0bGVzIGFuZCB0aGVpciBrZXlzLCB0cmFuc2xhdGUgdGhlIHRpdGxlIHdoZW4gcmVxdWlyZWQuXHJcbiAgICogQHBhcmFtIGNvbHVtbnMgb2YgdGhlIGdyaWRcclxuICAgKi9cclxuICBnZXRDb2x1bW5IZWFkZXJzKGNvbHVtbnM6IENvbHVtbltdKTogRXhwb3J0Q29sdW1uSGVhZGVyW10ge1xyXG4gICAgaWYgKCFjb2x1bW5zIHx8ICFBcnJheS5pc0FycmF5KGNvbHVtbnMpIHx8IGNvbHVtbnMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgY29uc3QgY29sdW1uSGVhZGVycyA9IFtdO1xyXG5cclxuICAgIC8vIFBvcHVsYXRlIHRoZSBDb2x1bW4gSGVhZGVyLCBwdWxsIHRoZSBuYW1lIGRlZmluZWRcclxuICAgIGNvbHVtbnMuZm9yRWFjaCgoY29sdW1uRGVmKSA9PiB7XHJcbiAgICAgIGNvbnN0IGZpZWxkTmFtZSA9IChjb2x1bW5EZWYuaGVhZGVyS2V5KSA/IHRoaXMudHJhbnNsYXRlLmluc3RhbnQoY29sdW1uRGVmLmhlYWRlcktleSkgOiBjb2x1bW5EZWYubmFtZTtcclxuICAgICAgY29uc3Qgc2tpcHBlZEZpZWxkID0gY29sdW1uRGVmLmV4Y2x1ZGVGcm9tRXhwb3J0IHx8IGZhbHNlO1xyXG5cclxuICAgICAgLy8gaWYgY29sdW1uIHdpZHRoIGlzIDAgdGhlbiBpdCdzIG5vdCBldmFsdWF0ZWQgc2luY2UgdGhhdCBmaWVsZCBpcyBjb25zaWRlcmVkIGhpZGRlbiBzaG91bGQgbm90IGJlIHBhcnQgb2YgdGhlIGV4cG9ydFxyXG4gICAgICBpZiAoKGNvbHVtbkRlZi53aWR0aCA9PT0gIHVuZGVmaW5lZCB8fCBjb2x1bW5EZWYud2lkdGggPiAwKSAmJiAhc2tpcHBlZEZpZWxkKSB7XHJcbiAgICAgICAgY29sdW1uSGVhZGVycy5wdXNoKHtcclxuICAgICAgICAgIGtleTogY29sdW1uRGVmLmZpZWxkIHx8IGNvbHVtbkRlZi5pZCxcclxuICAgICAgICAgIHRpdGxlOiBmaWVsZE5hbWVcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIGNvbHVtbkhlYWRlcnM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIGRhdGEgb2YgYSByZWd1bGFyIHJvdyAoYSByb3cgd2l0aG91dCBncm91cGluZylcclxuICAgKiBAcGFyYW0gcm93XHJcbiAgICogQHBhcmFtIGl0ZW1PYmpcclxuICAgKi9cclxuICByZWFkUmVndWxhclJvd0RhdGEoY29sdW1uczogQ29sdW1uW10sIHJvdzogbnVtYmVyLCBpdGVtT2JqOiBhbnkpIHtcclxuICAgIGxldCBpZHggPSAwO1xyXG4gICAgY29uc3Qgcm93T3V0cHV0U3RyaW5ncyA9IFtdO1xyXG4gICAgY29uc3QgZGVsaW1pdGVyID0gdGhpcy5fZXhwb3J0T3B0aW9ucy5kZWxpbWl0ZXI7XHJcbiAgICBjb25zdCBmb3JtYXQgPSB0aGlzLl9leHBvcnRPcHRpb25zLmZvcm1hdDtcclxuICAgIGNvbnN0IGV4cG9ydFF1b3RlV3JhcHBlciA9IHRoaXMuX2V4cG9ydFF1b3RlV3JhcHBlciB8fCAnJztcclxuXHJcbiAgICBmb3IgKGxldCBjb2wgPSAwLCBsbiA9IGNvbHVtbnMubGVuZ3RoOyBjb2wgPCBsbjsgY29sKyspIHtcclxuICAgICAgY29uc3QgY29sdW1uRGVmID0gY29sdW1uc1tjb2xdO1xyXG4gICAgICBjb25zdCBmaWVsZElkID0gY29sdW1uRGVmLmZpZWxkIHx8IGNvbHVtbkRlZi5pZCB8fCAnJztcclxuXHJcbiAgICAgIC8vIHNraXAgZXhjbHVkZWQgY29sdW1uXHJcbiAgICAgIGlmIChjb2x1bW5EZWYuZXhjbHVkZUZyb21FeHBvcnQpIHtcclxuICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBpZiB3ZSBhcmUgZ3JvdXBpbmcgYW5kIGFyZSBvbiAxc3QgY29sdW1uIGluZGV4LCB3ZSBuZWVkIHRvIHNraXAgdGhpcyBjb2x1bW4gc2luY2UgaXQgd2lsbCBiZSB1c2VkIGxhdGVyIGJ5IHRoZSBncm91cGluZyB0ZXh0OjogR3JvdXAgYnkgW2NvbHVtblhdXHJcbiAgICAgIGlmICh0aGlzLl9oYXNHcm91cGVkSXRlbXMgJiYgaWR4ID09PSAwKSB7XHJcbiAgICAgICAgcm93T3V0cHV0U3RyaW5ncy5wdXNoKGBcIlwiYCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIGRvZXMgdGhlIHVzZXIgd2FudCB0byBldmFsdWF0ZSBjdXJyZW50IGNvbHVtbiBGb3JtYXR0ZXI/XHJcbiAgICAgIGNvbnN0IGlzRXZhbHVhdGluZ0Zvcm1hdHRlciA9IChjb2x1bW5EZWYuZXhwb3J0V2l0aEZvcm1hdHRlciAhPT0gdW5kZWZpbmVkKSA/IGNvbHVtbkRlZi5leHBvcnRXaXRoRm9ybWF0dGVyIDogdGhpcy5fZXhwb3J0T3B0aW9ucy5leHBvcnRXaXRoRm9ybWF0dGVyO1xyXG5cclxuICAgICAgLy8gZGlkIHRoZSB1c2VyIHByb3ZpZGUgYSBDdXN0b20gRm9ybWF0dGVyIGZvciB0aGUgZXhwb3J0XHJcbiAgICAgIGNvbnN0IGV4cG9ydEN1c3RvbUZvcm1hdHRlcjogRm9ybWF0dGVyIHwgdW5kZWZpbmVkID0gKGNvbHVtbkRlZi5leHBvcnRDdXN0b21Gb3JtYXR0ZXIgIT09IHVuZGVmaW5lZCkgPyBjb2x1bW5EZWYuZXhwb3J0Q3VzdG9tRm9ybWF0dGVyIDogdW5kZWZpbmVkO1xyXG5cclxuICAgICAgbGV0IGl0ZW1EYXRhID0gJyc7XHJcblxyXG4gICAgICBpZiAoaXRlbU9iaiAmJiBpdGVtT2JqW2ZpZWxkSWRdICYmIGV4cG9ydEN1c3RvbUZvcm1hdHRlciAhPT0gdW5kZWZpbmVkICYmIGV4cG9ydEN1c3RvbUZvcm1hdHRlciAhPT0gbnVsbCkge1xyXG4gICAgICAgIGNvbnN0IGZvcm1hdHRlZERhdGEgPSBleHBvcnRDdXN0b21Gb3JtYXR0ZXIocm93LCBjb2wsIGl0ZW1PYmpbZmllbGRJZF0sIGNvbHVtbkRlZiwgaXRlbU9iaiwgdGhpcy5fZ3JpZCk7XHJcbiAgICAgICAgaXRlbURhdGEgPSBmb3JtYXR0ZWREYXRhIGFzIHN0cmluZztcclxuICAgICAgICBpZiAoZm9ybWF0dGVkRGF0YSAmJiB0eXBlb2YgZm9ybWF0dGVkRGF0YSA9PT0gJ29iamVjdCcgJiYgZm9ybWF0dGVkRGF0YS5oYXNPd25Qcm9wZXJ0eSgndGV4dCcpKSB7XHJcbiAgICAgICAgICBpdGVtRGF0YSA9IGZvcm1hdHRlZERhdGEudGV4dDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGl0ZW1EYXRhID09PSBudWxsKSB7XHJcbiAgICAgICAgICBpdGVtRGF0YSA9ICcnO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmIChpc0V2YWx1YXRpbmdGb3JtYXR0ZXIgJiYgY29sdW1uRGVmLmZvcm1hdHRlciAhPT0gdW5kZWZpbmVkICYmIGNvbHVtbkRlZi5mb3JtYXR0ZXIgIT09IG51bGwpIHtcclxuICAgICAgICBjb25zdCBmb3JtYXR0ZWREYXRhID0gY29sdW1uRGVmLmZvcm1hdHRlcihyb3csIGNvbCwgaXRlbU9ialtmaWVsZElkXSwgY29sdW1uRGVmLCBpdGVtT2JqLCB0aGlzLl9ncmlkKTtcclxuICAgICAgICBpdGVtRGF0YSA9IGZvcm1hdHRlZERhdGEgYXMgc3RyaW5nO1xyXG4gICAgICAgIGlmIChmb3JtYXR0ZWREYXRhICYmIHR5cGVvZiBmb3JtYXR0ZWREYXRhID09PSAnb2JqZWN0JyAmJiBmb3JtYXR0ZWREYXRhLmhhc093blByb3BlcnR5KCd0ZXh0JykpIHtcclxuICAgICAgICAgIGl0ZW1EYXRhID0gZm9ybWF0dGVkRGF0YS50ZXh0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaXRlbURhdGEgPT09IG51bGwpIHtcclxuICAgICAgICAgIGl0ZW1EYXRhID0gJyc7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGl0ZW1EYXRhID0gKGl0ZW1PYmpbZmllbGRJZF0gPT09IG51bGwgfHwgaXRlbU9ialtmaWVsZElkXSA9PT0gdW5kZWZpbmVkKSA/ICcnIDogaXRlbU9ialtmaWVsZElkXTtcclxuICAgICAgICBpZiAoaXRlbURhdGEgPT09IG51bGwpIHtcclxuICAgICAgICAgIGl0ZW1EYXRhID0gJyc7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBkb2VzIHRoZSB1c2VyIHdhbnQgdG8gc2FuaXRpemUgdGhlIG91dHB1dCBkYXRhIChyZW1vdmUgSFRNTCB0YWdzKT9cclxuICAgICAgaWYgKGNvbHVtbkRlZi5zYW5pdGl6ZURhdGFFeHBvcnQgfHwgdGhpcy5fZXhwb3J0T3B0aW9ucy5zYW5pdGl6ZURhdGFFeHBvcnQpIHtcclxuICAgICAgICBpdGVtRGF0YSA9IHNhbml0aXplSHRtbFRvVGV4dChpdGVtRGF0YSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIHdoZW4gQ1NWIHdlIGFsc28gbmVlZCB0byBlc2NhcGUgZG91YmxlIHF1b3RlcyB0d2ljZSwgc28gXCIgYmVjb21lcyBcIlwiXHJcbiAgICAgIGlmIChmb3JtYXQgPT09IEZpbGVUeXBlLmNzdiAmJiBpdGVtRGF0YSkge1xyXG4gICAgICAgIGl0ZW1EYXRhID0gaXRlbURhdGEudG9TdHJpbmcoKS5yZXBsYWNlKC9cIi9naSwgYFwiXCJgKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gZG8gd2UgaGF2ZSBhIHdyYXBwZXIgdG8ga2VlcCBhcyBhIHN0cmluZz8gaW4gY2VydGFpbiBjYXNlcyBsaWtlIFwiMUUwNlwiLCB3ZSBkb24ndCB3YW50IGV4Y2VsIHRvIHRyYW5zZm9ybSBpdCBpbnRvIGV4cG9uZW50aWFsICgxLjBFMDYpXHJcbiAgICAgIC8vIHRvIGNhbmNlbCB0aGF0IGVmZmVjdCB3ZSBjYW4gaGFkID0gaW4gZnJvbnQsIGV4OiA9XCIxRTA2XCJcclxuICAgICAgY29uc3Qga2VlcEFzU3RyaW5nV3JhcHBlciA9IChjb2x1bW5EZWYgJiYgY29sdW1uRGVmLmV4cG9ydENzdkZvcmNlVG9LZWVwQXNTdHJpbmcpID8gJz0nIDogJyc7XHJcblxyXG4gICAgICByb3dPdXRwdXRTdHJpbmdzLnB1c2goa2VlcEFzU3RyaW5nV3JhcHBlciArIGV4cG9ydFF1b3RlV3JhcHBlciArIGl0ZW1EYXRhICsgZXhwb3J0UXVvdGVXcmFwcGVyKTtcclxuICAgICAgaWR4Kys7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJvd091dHB1dFN0cmluZ3Muam9pbihkZWxpbWl0ZXIpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBncm91cGVkIHRpdGxlKHMpLCBmb3IgZXhhbXBsZSBpZiB3ZSBncm91cGVkIGJ5IHNhbGVzUmVwLCB0aGUgcmV0dXJuZWQgcmVzdWx0IHdvdWxkIGJlOjogJ1NhbGVzIFJlcCdcclxuICAgKiBAcGFyYW0gaXRlbU9ialxyXG4gICAqL1xyXG4gIHJlYWRHcm91cGVkVGl0bGVSb3coaXRlbU9iajogYW55KSB7XHJcbiAgICBsZXQgZ3JvdXBOYW1lID0gc2FuaXRpemVIdG1sVG9UZXh0KGl0ZW1PYmoudGl0bGUpO1xyXG4gICAgY29uc3QgZXhwb3J0UXVvdGVXcmFwcGVyID0gdGhpcy5fZXhwb3J0UXVvdGVXcmFwcGVyIHx8ICcnO1xyXG4gICAgY29uc3QgZm9ybWF0ID0gdGhpcy5fZXhwb3J0T3B0aW9ucy5mb3JtYXQ7XHJcblxyXG4gICAgZ3JvdXBOYW1lID0gYWRkV2hpdGVTcGFjZXMoNSAqIGl0ZW1PYmoubGV2ZWwpICsgZ3JvdXBOYW1lO1xyXG5cclxuICAgIGlmIChmb3JtYXQgPT09IEZpbGVUeXBlLmNzdikge1xyXG4gICAgICAvLyB3aGVuIENTViB3ZSBhbHNvIG5lZWQgdG8gZXNjYXBlIGRvdWJsZSBxdW90ZXMgdHdpY2UsIHNvIFwiIGJlY29tZXMgXCJcIlxyXG4gICAgICBncm91cE5hbWUgPSBncm91cE5hbWUudG9TdHJpbmcoKS5yZXBsYWNlKC9cIi9naSwgYFwiXCJgKTtcclxuICAgIH1cclxuICAgIHJldHVybiBleHBvcnRRdW90ZVdyYXBwZXIgKyAnICcgKyBncm91cE5hbWUgKyBleHBvcnRRdW90ZVdyYXBwZXI7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIGdyb3VwZWQgdG90YWxzLCB0aGVzZSBhcmUgc2V0IGJ5IFNsaWNrIEFnZ3JlZ2F0b3JzLlxyXG4gICAqIEZvciBleGFtcGxlIGlmIHdlIGdyb3VwZWQgYnkgXCJzYWxlc1JlcFwiIGFuZCB3ZSBoYXZlIGEgU3VtIEFnZ3JlZ2F0b3Igb24gXCJzYWxlc1wiLCB0aGVuIHRoZSByZXR1cm5lZCBvdXRwdXQgd291bGQgYmU6OiBbXCJTdW0gMTIzJFwiXVxyXG4gICAqIEBwYXJhbSBpdGVtT2JqXHJcbiAgICovXHJcbiAgcmVhZEdyb3VwZWRUb3RhbFJvdyhjb2x1bW5zOiBDb2x1bW5bXSwgaXRlbU9iajogYW55KSB7XHJcbiAgICBjb25zdCBkZWxpbWl0ZXIgPSB0aGlzLl9leHBvcnRPcHRpb25zLmRlbGltaXRlcjtcclxuICAgIGNvbnN0IGZvcm1hdCA9IHRoaXMuX2V4cG9ydE9wdGlvbnMuZm9ybWF0O1xyXG4gICAgY29uc3QgZ3JvdXBpbmdBZ2dyZWdhdG9yUm93VGV4dCA9IHRoaXMuX2V4cG9ydE9wdGlvbnMuZ3JvdXBpbmdBZ2dyZWdhdG9yUm93VGV4dCB8fCAnJztcclxuICAgIGNvbnN0IGV4cG9ydFF1b3RlV3JhcHBlciA9IHRoaXMuX2V4cG9ydFF1b3RlV3JhcHBlciB8fCAnJztcclxuICAgIGNvbnN0IG91dHB1dFN0cmluZ3MgPSBbYCR7ZXhwb3J0UXVvdGVXcmFwcGVyfSR7Z3JvdXBpbmdBZ2dyZWdhdG9yUm93VGV4dH0ke2V4cG9ydFF1b3RlV3JhcHBlcn1gXTtcclxuXHJcbiAgICBjb2x1bW5zLmZvckVhY2goKGNvbHVtbkRlZikgPT4ge1xyXG4gICAgICBsZXQgaXRlbURhdGEgPSAnJztcclxuXHJcbiAgICAgIC8vIGlmIHRoZXJlJ3MgYSBncm91cFRvdGFsc0Zvcm1hdHRlciwgd2Ugd2lsbCByZS1ydW4gaXQgdG8gZ2V0IHRoZSBleGFjdCBzYW1lIG91dHB1dCBhcyB3aGF0IGlzIHNob3duIGluIFVJXHJcbiAgICAgIGlmIChjb2x1bW5EZWYuZ3JvdXBUb3RhbHNGb3JtYXR0ZXIpIHtcclxuICAgICAgICBpdGVtRGF0YSA9IGNvbHVtbkRlZi5ncm91cFRvdGFsc0Zvcm1hdHRlcihpdGVtT2JqLCBjb2x1bW5EZWYpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBkb2VzIHRoZSB1c2VyIHdhbnQgdG8gc2FuaXRpemUgdGhlIG91dHB1dCBkYXRhIChyZW1vdmUgSFRNTCB0YWdzKT9cclxuICAgICAgaWYgKGNvbHVtbkRlZi5zYW5pdGl6ZURhdGFFeHBvcnQgfHwgdGhpcy5fZXhwb3J0T3B0aW9ucy5zYW5pdGl6ZURhdGFFeHBvcnQpIHtcclxuICAgICAgICBpdGVtRGF0YSA9IHNhbml0aXplSHRtbFRvVGV4dChpdGVtRGF0YSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChmb3JtYXQgPT09IEZpbGVUeXBlLmNzdikge1xyXG4gICAgICAgIC8vIHdoZW4gQ1NWIHdlIGFsc28gbmVlZCB0byBlc2NhcGUgZG91YmxlIHF1b3RlcyB0d2ljZSwgc28gYSBkb3VibGUgcXVvdGUgXCIgYmVjb21lcyAyeCBkb3VibGUgcXVvdGVzIFwiXCJcclxuICAgICAgICBpdGVtRGF0YSA9IGl0ZW1EYXRhLnRvU3RyaW5nKCkucmVwbGFjZSgvXCIvZ2ksIGBcIlwiYCk7XHJcbiAgICAgIH1cclxuICAgICAgb3V0cHV0U3RyaW5ncy5wdXNoKGV4cG9ydFF1b3RlV3JhcHBlciArIGl0ZW1EYXRhICsgZXhwb3J0UXVvdGVXcmFwcGVyKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBvdXRwdXRTdHJpbmdzLmpvaW4oZGVsaW1pdGVyKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRyaWdnZXJzIGRvd25sb2FkIGZpbGUgd2l0aCBmaWxlIGZvcm1hdC5cclxuICAgKiBJRSg2LTEwKSBhcmUgbm90IHN1cHBvcnRlZFxyXG4gICAqIEFsbCBvdGhlciBicm93c2VycyB3aWxsIHVzZSBwbGFpbiBqYXZhc2NyaXB0IG9uIGNsaWVudCBzaWRlIHRvIHByb2R1Y2UgYSBmaWxlIGRvd25sb2FkLlxyXG4gICAqIEBwYXJhbSBvcHRpb25zXHJcbiAgICovXHJcbiAgc3RhcnREb3dubG9hZEZpbGUob3B0aW9uczogeyBmaWxlbmFtZTogc3RyaW5nLCBjc3ZDb250ZW50OiBhbnksIGZvcm1hdDogRmlsZVR5cGUgfCBzdHJpbmcsIHVzZVV0ZjhXaXRoQm9tOiBib29sZWFuIH0pOiB2b2lkIHtcclxuICAgIC8vIElFKDYtMTApIGRvbid0IHN1cHBvcnQgamF2YXNjcmlwdCBkb3dubG9hZCBhbmQgb3VyIHNlcnZpY2UgZG9lc24ndCBzdXBwb3J0IGVpdGhlciBzbyB0aHJvdyBhbiBlcnJvciwgd2UgaGF2ZSB0byBtYWtlIGEgcm91bmQgdHJpcCB0byB0aGUgV2ViIFNlcnZlciBmb3IgZXhwb3J0aW5nXHJcbiAgICBpZiAobmF2aWdhdG9yLmFwcE5hbWUgPT09ICdNaWNyb3NvZnQgSW50ZXJuZXQgRXhwbG9yZXInKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignTWljcm9zb2Z0IEludGVybmV0IEV4cGxvcmVyIDYgdG8gMTAgZG8gbm90IHN1cHBvcnQgamF2YXNjcmlwdCBleHBvcnQgdG8gQ1NWLiBQbGVhc2UgdXBncmFkZSB5b3VyIGJyb3dzZXIuJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gc2V0IHRoZSBjb3JyZWN0IE1JTUUgdHlwZVxyXG4gICAgY29uc3QgbWltZVR5cGUgPSAob3B0aW9ucy5mb3JtYXQgPT09IEZpbGVUeXBlLmNzdikgPyAndGV4dC9jc3YnIDogJ3RleHQvcGxhaW4nO1xyXG5cclxuICAgIC8vIG1ha2Ugc3VyZSBubyBodG1sIGVudGl0aWVzIGV4aXN0IGluIHRoZSBkYXRhXHJcbiAgICBjb25zdCBjc3ZDb250ZW50ID0gaHRtbEVudGl0eURlY29kZShvcHRpb25zLmNzdkNvbnRlbnQpO1xyXG5cclxuICAgIC8vIGRlYWxpbmcgd2l0aCBFeGNlbCBDU1YgZXhwb3J0IGFuZCBVVEYtOCBpcyBhIGxpdHRsZSB0cmlja3kuLiBXZSB3aWxsIHVzZSBPcHRpb24gIzIgdG8gY292ZXIgb2xkZXIgRXhjZWwgdmVyc2lvbnNcclxuICAgIC8vIE9wdGlvbiAjMTogd2UgbmVlZCB0byBtYWtlIEV4Y2VsIGtub3dpbmcgdGhhdCBpdCdzIGRlYWxpbmcgd2l0aCBhbiBVVEYtOCwgQSBjb3JyZWN0bHkgZm9ybWF0dGVkIFVURjggZmlsZSBjYW4gaGF2ZSBhIEJ5dGUgT3JkZXIgTWFyayBhcyBpdHMgZmlyc3QgdGhyZWUgb2N0ZXRzXHJcbiAgICAvLyByZWZlcmVuY2U6IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTU1MDk3L21pY3Jvc29mdC1leGNlbC1tYW5nbGVzLWRpYWNyaXRpY3MtaW4tY3N2LWZpbGVzXHJcbiAgICAvLyBPcHRpb24jMjogdXNlIGEgM3JkIHBhcnR5IGV4dGVuc2lvbiB0byBqYXZhc2NyaXB0IGVuY29kZSBpbnRvIFVURi0xNlxyXG4gICAgbGV0IG91dHB1dERhdGE6IFVpbnQ4QXJyYXkgfCBzdHJpbmc7XHJcbiAgICBpZiAob3B0aW9ucy5mb3JtYXQgPT09IEZpbGVUeXBlLmNzdikge1xyXG4gICAgICBvdXRwdXREYXRhID0gbmV3IFRleHRFbmNvZGVyKCd1dGYtOCcpLmVuY29kZShjc3ZDb250ZW50KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG91dHB1dERhdGEgPSBjc3ZDb250ZW50O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGNyZWF0ZSBhIEJsb2Igb2JqZWN0IGZvciB0aGUgZG93bmxvYWRcclxuICAgIGNvbnN0IGJsb2IgPSBuZXcgQmxvYihbb3B0aW9ucy51c2VVdGY4V2l0aEJvbSA/ICdcXHVGRUZGJyA6ICcnLCBvdXRwdXREYXRhXSwge1xyXG4gICAgICB0eXBlOiBgJHttaW1lVHlwZX07Y2hhcnNldD11dGYtODtgXHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyB3aGVuIHVzaW5nIElFL0VkZ2UsIHRoZW4gdXNlIGRpZmZlcmVudCBkb3dubG9hZCBjYWxsXHJcbiAgICBpZiAodHlwZW9mIG5hdmlnYXRvci5tc1NhdmVPck9wZW5CbG9iID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgIG5hdmlnYXRvci5tc1NhdmVPck9wZW5CbG9iKGJsb2IsIG9wdGlvbnMuZmlsZW5hbWUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gdGhpcyB0cmljayB3aWxsIGdlbmVyYXRlIGEgdGVtcCA8YSAvPiB0YWdcclxuICAgICAgLy8gdGhlIGNvZGUgd2lsbCB0aGVuIHRyaWdnZXIgYSBoaWRkZW4gY2xpY2sgZm9yIGl0IHRvIHN0YXJ0IGRvd25sb2FkaW5nXHJcbiAgICAgIGNvbnN0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcbiAgICAgIGNvbnN0IGNzdlVybCA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XHJcblxyXG4gICAgICBsaW5rLnRleHRDb250ZW50ID0gJ2Rvd25sb2FkJztcclxuICAgICAgbGluay5ocmVmID0gY3N2VXJsO1xyXG4gICAgICBsaW5rLnNldEF0dHJpYnV0ZSgnZG93bmxvYWQnLCBvcHRpb25zLmZpbGVuYW1lKTtcclxuXHJcbiAgICAgIC8vIHNldCB0aGUgdmlzaWJpbGl0eSB0byBoaWRkZW4gc28gdGhlcmUgaXMgbm8gZWZmZWN0IG9uIHlvdXIgd2ViLWxheW91dFxyXG4gICAgICBsaW5rLnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJztcclxuXHJcbiAgICAgIC8vIHRoaXMgcGFydCB3aWxsIGFwcGVuZCB0aGUgYW5jaG9yIHRhZywgdHJpZ2dlciBhIGNsaWNrIChmb3IgZG93bmxvYWQgdG8gc3RhcnQpIGFuZCBmaW5hbGx5IHJlbW92ZSB0aGUgdGFnIG9uY2UgY29tcGxldGVkXHJcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobGluayk7XHJcbiAgICAgIGxpbmsuY2xpY2soKTtcclxuICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChsaW5rKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19