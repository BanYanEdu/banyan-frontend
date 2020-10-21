import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FileType } from './../models/index';
import { addWhiteSpaces, htmlEntityDecode, sanitizeHtmlToText } from './../services/utilities';
import { Subject } from 'rxjs';
import { TextEncoder } from 'text-encoding-utf-8';
let ExportService = class ExportService {
    constructor(translate) {
        this.translate = translate;
        this._lineCarriageReturn = '\n';
        this._hasGroupedItems = false;
        this.onGridBeforeExportToFile = new Subject();
        this.onGridAfterExportToFile = new Subject();
    }
    get datasetIdName() {
        return this._gridOptions && this._gridOptions.datasetIdPropertyName || 'id';
    }
    /** Getter for the Grid Options pulled through the Grid Object */
    get _gridOptions() {
        return (this._grid && this._grid.getOptions) ? this._grid.getOptions() : {};
    }
    /**
     * Initialize the Export Service
     * @param grid
     * @param gridOptions
     * @param dataView
     */
    init(grid, dataView) {
        this._grid = grid;
        this._dataView = dataView;
    }
    /**
     * Function to export the Grid result to an Excel CSV format using javascript for it to produce the CSV file.
     * This is a WYSIWYG export to file output (What You See is What You Get)
     *
     * NOTES: The column position needs to match perfectly the JSON Object position because of the way we are pulling the data,
     * which means that if any column(s) got moved in the UI, it has to be reflected in the JSON array output as well
     *
     * Example: exportToFile({ format: FileType.csv, delimiter: DelimiterType.comma })
     */
    exportToFile(options) {
        this.onGridBeforeExportToFile.next(true);
        this._exportOptions = $.extend(true, {}, this._gridOptions.exportOptions, options);
        // get the CSV output from the grid data
        const dataOutput = this.getDataOutput();
        // trigger a download file
        // wrap it into a setTimeout so that the EventAggregator has enough time to start a pre-process like showing a spinner
        setTimeout(() => {
            const downloadOptions = {
                filename: `${this._exportOptions.filename}.${this._exportOptions.format}`,
                csvContent: dataOutput,
                format: this._exportOptions.format,
                useUtf8WithBom: this._exportOptions.useUtf8WithBom
            };
            this.startDownloadFile(downloadOptions);
            this.onGridAfterExportToFile.next({ options: downloadOptions });
        }, 0);
    }
    // -----------------------
    // Private functions
    // -----------------------
    getDataOutput() {
        const columns = this._grid.getColumns() || [];
        const delimiter = this._exportOptions.delimiter || '';
        const format = this._exportOptions.format || '';
        const groupByColumnHeader = this._exportOptions.groupingColumnHeaderTitle || this.translate.instant('GROUP_BY');
        // a CSV needs double quotes wrapper, the other types do not need any wrapper
        this._exportQuoteWrapper = (format === FileType.csv) ? '"' : '';
        // data variable which will hold all the fields data of a row
        let outputDataString = '';
        // get grouped column titles and if found, we will add a "Group by" column at the first column index
        const grouping = this._dataView.getGrouping();
        if (grouping && Array.isArray(grouping) && grouping.length > 0) {
            this._hasGroupedItems = true;
            outputDataString += `${groupByColumnHeader}` + delimiter;
        }
        else {
            this._hasGroupedItems = false;
        }
        // get all column headers
        this._columnHeaders = this.getColumnHeaders(columns) || [];
        if (this._columnHeaders && Array.isArray(this._columnHeaders) && this._columnHeaders.length > 0) {
            // add the header row + add a new line at the end of the row
            const outputHeaderTitles = this._columnHeaders.map((header) => {
                return this._exportQuoteWrapper + header.title + this._exportQuoteWrapper;
            });
            outputDataString += (outputHeaderTitles.join(delimiter) + this._lineCarriageReturn);
        }
        // Populate the rest of the Grid Data
        outputDataString += this.getAllGridRowData(columns, this._lineCarriageReturn);
        return outputDataString;
    }
    /**
     * Get all the grid row data and return that as an output string
     */
    getAllGridRowData(columns, lineCarriageReturn) {
        const outputDataStrings = [];
        const lineCount = this._dataView.getLength();
        // loop through all the grid rows of data
        for (let rowNumber = 0; rowNumber < lineCount; rowNumber++) {
            const itemObj = this._dataView.getItem(rowNumber);
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
    }
    /**
     * Get all header titles and their keys, translate the title when required.
     * @param columns of the grid
     */
    getColumnHeaders(columns) {
        if (!columns || !Array.isArray(columns) || columns.length === 0) {
            return null;
        }
        const columnHeaders = [];
        // Populate the Column Header, pull the name defined
        columns.forEach((columnDef) => {
            const fieldName = (columnDef.headerKey) ? this.translate.instant(columnDef.headerKey) : columnDef.name;
            const skippedField = columnDef.excludeFromExport || false;
            // if column width is 0 then it's not evaluated since that field is considered hidden should not be part of the export
            if ((columnDef.width === undefined || columnDef.width > 0) && !skippedField) {
                columnHeaders.push({
                    key: columnDef.field || columnDef.id,
                    title: fieldName
                });
            }
        });
        return columnHeaders;
    }
    /**
     * Get the data of a regular row (a row without grouping)
     * @param row
     * @param itemObj
     */
    readRegularRowData(columns, row, itemObj) {
        let idx = 0;
        const rowOutputStrings = [];
        const delimiter = this._exportOptions.delimiter;
        const format = this._exportOptions.format;
        const exportQuoteWrapper = this._exportQuoteWrapper || '';
        for (let col = 0, ln = columns.length; col < ln; col++) {
            const columnDef = columns[col];
            const fieldId = columnDef.field || columnDef.id || '';
            // skip excluded column
            if (columnDef.excludeFromExport) {
                continue;
            }
            // if we are grouping and are on 1st column index, we need to skip this column since it will be used later by the grouping text:: Group by [columnX]
            if (this._hasGroupedItems && idx === 0) {
                rowOutputStrings.push(`""`);
            }
            // does the user want to evaluate current column Formatter?
            const isEvaluatingFormatter = (columnDef.exportWithFormatter !== undefined) ? columnDef.exportWithFormatter : this._exportOptions.exportWithFormatter;
            // did the user provide a Custom Formatter for the export
            const exportCustomFormatter = (columnDef.exportCustomFormatter !== undefined) ? columnDef.exportCustomFormatter : undefined;
            let itemData = '';
            if (itemObj && itemObj[fieldId] && exportCustomFormatter !== undefined && exportCustomFormatter !== null) {
                const formattedData = exportCustomFormatter(row, col, itemObj[fieldId], columnDef, itemObj, this._grid);
                itemData = formattedData;
                if (formattedData && typeof formattedData === 'object' && formattedData.hasOwnProperty('text')) {
                    itemData = formattedData.text;
                }
                if (itemData === null) {
                    itemData = '';
                }
            }
            else if (isEvaluatingFormatter && columnDef.formatter !== undefined && columnDef.formatter !== null) {
                const formattedData = columnDef.formatter(row, col, itemObj[fieldId], columnDef, itemObj, this._grid);
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
                itemData = itemData.toString().replace(/"/gi, `""`);
            }
            // do we have a wrapper to keep as a string? in certain cases like "1E06", we don't want excel to transform it into exponential (1.0E06)
            // to cancel that effect we can had = in front, ex: ="1E06"
            const keepAsStringWrapper = (columnDef && columnDef.exportCsvForceToKeepAsString) ? '=' : '';
            rowOutputStrings.push(keepAsStringWrapper + exportQuoteWrapper + itemData + exportQuoteWrapper);
            idx++;
        }
        return rowOutputStrings.join(delimiter);
    }
    /**
     * Get the grouped title(s), for example if we grouped by salesRep, the returned result would be:: 'Sales Rep'
     * @param itemObj
     */
    readGroupedTitleRow(itemObj) {
        let groupName = sanitizeHtmlToText(itemObj.title);
        const exportQuoteWrapper = this._exportQuoteWrapper || '';
        const format = this._exportOptions.format;
        groupName = addWhiteSpaces(5 * itemObj.level) + groupName;
        if (format === FileType.csv) {
            // when CSV we also need to escape double quotes twice, so " becomes ""
            groupName = groupName.toString().replace(/"/gi, `""`);
        }
        return exportQuoteWrapper + ' ' + groupName + exportQuoteWrapper;
    }
    /**
     * Get the grouped totals, these are set by Slick Aggregators.
     * For example if we grouped by "salesRep" and we have a Sum Aggregator on "sales", then the returned output would be:: ["Sum 123$"]
     * @param itemObj
     */
    readGroupedTotalRow(columns, itemObj) {
        const delimiter = this._exportOptions.delimiter;
        const format = this._exportOptions.format;
        const groupingAggregatorRowText = this._exportOptions.groupingAggregatorRowText || '';
        const exportQuoteWrapper = this._exportQuoteWrapper || '';
        const outputStrings = [`${exportQuoteWrapper}${groupingAggregatorRowText}${exportQuoteWrapper}`];
        columns.forEach((columnDef) => {
            let itemData = '';
            // if there's a groupTotalsFormatter, we will re-run it to get the exact same output as what is shown in UI
            if (columnDef.groupTotalsFormatter) {
                itemData = columnDef.groupTotalsFormatter(itemObj, columnDef);
            }
            // does the user want to sanitize the output data (remove HTML tags)?
            if (columnDef.sanitizeDataExport || this._exportOptions.sanitizeDataExport) {
                itemData = sanitizeHtmlToText(itemData);
            }
            if (format === FileType.csv) {
                // when CSV we also need to escape double quotes twice, so a double quote " becomes 2x double quotes ""
                itemData = itemData.toString().replace(/"/gi, `""`);
            }
            outputStrings.push(exportQuoteWrapper + itemData + exportQuoteWrapper);
        });
        return outputStrings.join(delimiter);
    }
    /**
     * Triggers download file with file format.
     * IE(6-10) are not supported
     * All other browsers will use plain javascript on client side to produce a file download.
     * @param options
     */
    startDownloadFile(options) {
        // IE(6-10) don't support javascript download and our service doesn't support either so throw an error, we have to make a round trip to the Web Server for exporting
        if (navigator.appName === 'Microsoft Internet Explorer') {
            throw new Error('Microsoft Internet Explorer 6 to 10 do not support javascript export to CSV. Please upgrade your browser.');
        }
        // set the correct MIME type
        const mimeType = (options.format === FileType.csv) ? 'text/csv' : 'text/plain';
        // make sure no html entities exist in the data
        const csvContent = htmlEntityDecode(options.csvContent);
        // dealing with Excel CSV export and UTF-8 is a little tricky.. We will use Option #2 to cover older Excel versions
        // Option #1: we need to make Excel knowing that it's dealing with an UTF-8, A correctly formatted UTF8 file can have a Byte Order Mark as its first three octets
        // reference: http://stackoverflow.com/questions/155097/microsoft-excel-mangles-diacritics-in-csv-files
        // Option#2: use a 3rd party extension to javascript encode into UTF-16
        let outputData;
        if (options.format === FileType.csv) {
            outputData = new TextEncoder('utf-8').encode(csvContent);
        }
        else {
            outputData = csvContent;
        }
        // create a Blob object for the download
        const blob = new Blob([options.useUtf8WithBom ? '\uFEFF' : '', outputData], {
            type: `${mimeType};charset=utf-8;`
        });
        // when using IE/Edge, then use different download call
        if (typeof navigator.msSaveOrOpenBlob === 'function') {
            navigator.msSaveOrOpenBlob(blob, options.filename);
        }
        else {
            // this trick will generate a temp <a /> tag
            // the code will then trigger a hidden click for it to start downloading
            const link = document.createElement('a');
            const csvUrl = URL.createObjectURL(blob);
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
    }
};
ExportService = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [TranslateService])
], ExportService);
export { ExportService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwb3J0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL3NlcnZpY2VzL2V4cG9ydC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3ZELE9BQU8sRUFHTCxRQUFRLEVBR1QsTUFBTSxtQkFBbUIsQ0FBQztBQUMzQixPQUFPLEVBQUUsY0FBYyxFQUFFLGdCQUFnQixFQUFFLGtCQUFrQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDL0YsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFXbEQsSUFBYSxhQUFhLEdBQTFCLE1BQWEsYUFBYTtJQVl4QixZQUFvQixTQUEyQjtRQUEzQixjQUFTLEdBQVQsU0FBUyxDQUFrQjtRQVh2Qyx3QkFBbUIsR0FBRyxJQUFJLENBQUM7UUFNM0IscUJBQWdCLEdBQUcsS0FBSyxDQUFDO1FBRWpDLDZCQUF3QixHQUFHLElBQUksT0FBTyxFQUFXLENBQUM7UUFDbEQsNEJBQXVCLEdBQUcsSUFBSSxPQUFPLEVBQW9CLENBQUM7SUFFUCxDQUFDO0lBRXBELElBQVksYUFBYTtRQUN2QixPQUFPLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxxQkFBcUIsSUFBSSxJQUFJLENBQUM7SUFDOUUsQ0FBQztJQUVELGlFQUFpRTtJQUNqRSxJQUFZLFlBQVk7UUFDdEIsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FB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SSxHQUFHLE1BQU0sQ0FBQztZQUNuQixJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7WUFFaEQsd0VBQXdFO1lBQ3hFLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQztZQUVqQywwSEFBMEg7WUFDMUgsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDaEMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2IsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDakM7SUFDSCxDQUFDO0NBQ0YsQ0FBQTtBQTlWWSxhQUFhO0lBRHpCLFVBQVUsRUFBRTs2Q0Fhb0IsZ0JBQWdCO0dBWnBDLGFBQWEsQ0E4VnpCO1NBOVZZLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcclxuaW1wb3J0IHtcclxuICBDb2x1bW4sXHJcbiAgRXhwb3J0T3B0aW9uLFxyXG4gIEZpbGVUeXBlLFxyXG4gIEZvcm1hdHRlcixcclxuICBHcmlkT3B0aW9uXHJcbn0gZnJvbSAnLi8uLi9tb2RlbHMvaW5kZXgnO1xyXG5pbXBvcnQgeyBhZGRXaGl0ZVNwYWNlcywgaHRtbEVudGl0eURlY29kZSwgc2FuaXRpemVIdG1sVG9UZXh0IH0gZnJvbSAnLi8uLi9zZXJ2aWNlcy91dGlsaXRpZXMnO1xyXG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IFRleHRFbmNvZGVyIH0gZnJvbSAndGV4dC1lbmNvZGluZy11dGYtOCc7XHJcblxyXG4vLyB1c2luZyBleHRlcm5hbCBub24tdHlwZWQganMgbGlicmFyaWVzXHJcbmRlY2xhcmUgbGV0ICQ6IGFueTtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgRXhwb3J0Q29sdW1uSGVhZGVyIHtcclxuICBrZXk6IHN0cmluZztcclxuICB0aXRsZTogc3RyaW5nO1xyXG59XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBFeHBvcnRTZXJ2aWNlIHtcclxuICBwcml2YXRlIF9saW5lQ2FycmlhZ2VSZXR1cm4gPSAnXFxuJztcclxuICBwcml2YXRlIF9kYXRhVmlldzogYW55O1xyXG4gIHByaXZhdGUgX2dyaWQ6IGFueTtcclxuICBwcml2YXRlIF9leHBvcnRRdW90ZVdyYXBwZXI6IHN0cmluZztcclxuICBwcml2YXRlIF9jb2x1bW5IZWFkZXJzOiBFeHBvcnRDb2x1bW5IZWFkZXJbXTtcclxuICBwcml2YXRlIF9ncm91cGVkSGVhZGVyczogRXhwb3J0Q29sdW1uSGVhZGVyW107XHJcbiAgcHJpdmF0ZSBfaGFzR3JvdXBlZEl0ZW1zID0gZmFsc2U7XHJcbiAgcHJpdmF0ZSBfZXhwb3J0T3B0aW9uczogRXhwb3J0T3B0aW9uO1xyXG4gIG9uR3JpZEJlZm9yZUV4cG9ydFRvRmlsZSA9IG5ldyBTdWJqZWN0PGJvb2xlYW4+KCk7XHJcbiAgb25HcmlkQWZ0ZXJFeHBvcnRUb0ZpbGUgPSBuZXcgU3ViamVjdDx7IG9wdGlvbnM6IGFueSB9PigpO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHRyYW5zbGF0ZTogVHJhbnNsYXRlU2VydmljZSkgeyB9XHJcblxyXG4gIHByaXZhdGUgZ2V0IGRhdGFzZXRJZE5hbWUoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLl9ncmlkT3B0aW9ucyAmJiB0aGlzLl9ncmlkT3B0aW9ucy5kYXRhc2V0SWRQcm9wZXJ0eU5hbWUgfHwgJ2lkJztcclxuICB9XHJcblxyXG4gIC8qKiBHZXR0ZXIgZm9yIHRoZSBHcmlkIE9wdGlvbnMgcHVsbGVkIHRocm91Z2ggdGhlIEdyaWQgT2JqZWN0ICovXHJcbiAgcHJpdmF0ZSBnZXQgX2dyaWRPcHRpb25zKCk6IEdyaWRPcHRpb24ge1xyXG4gICAgcmV0dXJuICh0aGlzLl9ncmlkICYmIHRoaXMuX2dyaWQuZ2V0T3B0aW9ucykgPyB0aGlzLl9ncmlkLmdldE9wdGlvbnMoKSA6IHt9O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSW5pdGlhbGl6ZSB0aGUgRXhwb3J0IFNlcnZpY2VcclxuICAgKiBAcGFyYW0gZ3JpZFxyXG4gICAqIEBwYXJhbSBncmlkT3B0aW9uc1xyXG4gICAqIEBwYXJhbSBkYXRhVmlld1xyXG4gICAqL1xyXG4gIGluaXQoZ3JpZDogYW55LCBkYXRhVmlldzogYW55KTogdm9pZCB7XHJcbiAgICB0aGlzLl9ncmlkID0gZ3JpZDtcclxuICAgIHRoaXMuX2RhdGFWaWV3ID0gZGF0YVZpZXc7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBGdW5jdGlvbiB0byBleHBvcnQgdGhlIEdyaWQgcmVzdWx0IHRvIGFuIEV4Y2VsIENTViBmb3JtYXQgdXNpbmcgamF2YXNjcmlwdCBmb3IgaXQgdG8gcHJvZHVjZSB0aGUgQ1NWIGZpbGUuXHJcbiAgICogVGhpcyBpcyBhIFdZU0lXWUcgZXhwb3J0IHRvIGZpbGUgb3V0cHV0IChXaGF0IFlvdSBTZWUgaXMgV2hhdCBZb3UgR2V0KVxyXG4gICAqXHJcbiAgICogTk9URVM6IFRoZSBjb2x1bW4gcG9zaXRpb24gbmVlZHMgdG8gbWF0Y2ggcGVyZmVjdGx5IHRoZSBKU09OIE9iamVjdCBwb3NpdGlvbiBiZWNhdXNlIG9mIHRoZSB3YXkgd2UgYXJlIHB1bGxpbmcgdGhlIGRhdGEsXHJcbiAgICogd2hpY2ggbWVhbnMgdGhhdCBpZiBhbnkgY29sdW1uKHMpIGdvdCBtb3ZlZCBpbiB0aGUgVUksIGl0IGhhcyB0byBiZSByZWZsZWN0ZWQgaW4gdGhlIEpTT04gYXJyYXkgb3V0cHV0IGFzIHdlbGxcclxuICAgKlxyXG4gICAqIEV4YW1wbGU6IGV4cG9ydFRvRmlsZSh7IGZvcm1hdDogRmlsZVR5cGUuY3N2LCBkZWxpbWl0ZXI6IERlbGltaXRlclR5cGUuY29tbWEgfSlcclxuICAgKi9cclxuICBleHBvcnRUb0ZpbGUob3B0aW9uczogRXhwb3J0T3B0aW9uKSB7XHJcbiAgICB0aGlzLm9uR3JpZEJlZm9yZUV4cG9ydFRvRmlsZS5uZXh0KHRydWUpO1xyXG4gICAgdGhpcy5fZXhwb3J0T3B0aW9ucyA9ICQuZXh0ZW5kKHRydWUsIHt9LCB0aGlzLl9ncmlkT3B0aW9ucy5leHBvcnRPcHRpb25zLCBvcHRpb25zKTtcclxuXHJcbiAgICAvLyBnZXQgdGhlIENTViBvdXRwdXQgZnJvbSB0aGUgZ3JpZCBkYXRhXHJcbiAgICBjb25zdCBkYXRhT3V0cHV0ID0gdGhpcy5nZXREYXRhT3V0cHV0KCk7XHJcblxyXG4gICAgLy8gdHJpZ2dlciBhIGRvd25sb2FkIGZpbGVcclxuICAgIC8vIHdyYXAgaXQgaW50byBhIHNldFRpbWVvdXQgc28gdGhhdCB0aGUgRXZlbnRBZ2dyZWdhdG9yIGhhcyBlbm91Z2ggdGltZSB0byBzdGFydCBhIHByZS1wcm9jZXNzIGxpa2Ugc2hvd2luZyBhIHNwaW5uZXJcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBjb25zdCBkb3dubG9hZE9wdGlvbnMgPSB7XHJcbiAgICAgICAgZmlsZW5hbWU6IGAke3RoaXMuX2V4cG9ydE9wdGlvbnMuZmlsZW5hbWV9LiR7dGhpcy5fZXhwb3J0T3B0aW9ucy5mb3JtYXR9YCxcclxuICAgICAgICBjc3ZDb250ZW50OiBkYXRhT3V0cHV0LFxyXG4gICAgICAgIGZvcm1hdDogdGhpcy5fZXhwb3J0T3B0aW9ucy5mb3JtYXQsXHJcbiAgICAgICAgdXNlVXRmOFdpdGhCb206IHRoaXMuX2V4cG9ydE9wdGlvbnMudXNlVXRmOFdpdGhCb21cclxuICAgICAgfTtcclxuICAgICAgdGhpcy5zdGFydERvd25sb2FkRmlsZShkb3dubG9hZE9wdGlvbnMpO1xyXG4gICAgICB0aGlzLm9uR3JpZEFmdGVyRXhwb3J0VG9GaWxlLm5leHQoeyBvcHRpb25zOiBkb3dubG9hZE9wdGlvbnMgfSk7XHJcbiAgICB9LCAwKTtcclxuICB9XHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gUHJpdmF0ZSBmdW5jdGlvbnNcclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICBnZXREYXRhT3V0cHV0KCk6IHN0cmluZyB7XHJcbiAgICBjb25zdCBjb2x1bW5zID0gdGhpcy5fZ3JpZC5nZXRDb2x1bW5zKCkgfHwgW107XHJcbiAgICBjb25zdCBkZWxpbWl0ZXIgPSB0aGlzLl9leHBvcnRPcHRpb25zLmRlbGltaXRlciB8fCAnJztcclxuICAgIGNvbnN0IGZvcm1hdCA9IHRoaXMuX2V4cG9ydE9wdGlvbnMuZm9ybWF0IHx8ICcnO1xyXG4gICAgY29uc3QgZ3JvdXBCeUNvbHVtbkhlYWRlciA9IHRoaXMuX2V4cG9ydE9wdGlvbnMuZ3JvdXBpbmdDb2x1bW5IZWFkZXJUaXRsZSB8fCB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KCdHUk9VUF9CWScpO1xyXG5cclxuICAgIC8vIGEgQ1NWIG5lZWRzIGRvdWJsZSBxdW90ZXMgd3JhcHBlciwgdGhlIG90aGVyIHR5cGVzIGRvIG5vdCBuZWVkIGFueSB3cmFwcGVyXHJcbiAgICB0aGlzLl9leHBvcnRRdW90ZVdyYXBwZXIgPSAoZm9ybWF0ID09PSBGaWxlVHlwZS5jc3YpID8gJ1wiJyA6ICcnO1xyXG5cclxuICAgIC8vIGRhdGEgdmFyaWFibGUgd2hpY2ggd2lsbCBob2xkIGFsbCB0aGUgZmllbGRzIGRhdGEgb2YgYSByb3dcclxuICAgIGxldCBvdXRwdXREYXRhU3RyaW5nID0gJyc7XHJcblxyXG4gICAgLy8gZ2V0IGdyb3VwZWQgY29sdW1uIHRpdGxlcyBhbmQgaWYgZm91bmQsIHdlIHdpbGwgYWRkIGEgXCJHcm91cCBieVwiIGNvbHVtbiBhdCB0aGUgZmlyc3QgY29sdW1uIGluZGV4XHJcbiAgICBjb25zdCBncm91cGluZyA9IHRoaXMuX2RhdGFWaWV3LmdldEdyb3VwaW5nKCk7XHJcbiAgICBpZiAoZ3JvdXBpbmcgJiYgQXJyYXkuaXNBcnJheShncm91cGluZykgJiYgZ3JvdXBpbmcubGVuZ3RoID4gMCkge1xyXG4gICAgICB0aGlzLl9oYXNHcm91cGVkSXRlbXMgPSB0cnVlO1xyXG4gICAgICBvdXRwdXREYXRhU3RyaW5nICs9IGAke2dyb3VwQnlDb2x1bW5IZWFkZXJ9YCArIGRlbGltaXRlcjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuX2hhc0dyb3VwZWRJdGVtcyA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGdldCBhbGwgY29sdW1uIGhlYWRlcnNcclxuICAgIHRoaXMuX2NvbHVtbkhlYWRlcnMgPSB0aGlzLmdldENvbHVtbkhlYWRlcnMoY29sdW1ucykgfHwgW107XHJcbiAgICBpZiAodGhpcy5fY29sdW1uSGVhZGVycyAmJiBBcnJheS5pc0FycmF5KHRoaXMuX2NvbHVtbkhlYWRlcnMpICYmIHRoaXMuX2NvbHVtbkhlYWRlcnMubGVuZ3RoID4gMCkge1xyXG4gICAgICAvLyBhZGQgdGhlIGhlYWRlciByb3cgKyBhZGQgYSBuZXcgbGluZSBhdCB0aGUgZW5kIG9mIHRoZSByb3dcclxuICAgICAgY29uc3Qgb3V0cHV0SGVhZGVyVGl0bGVzID0gdGhpcy5fY29sdW1uSGVhZGVycy5tYXAoKGhlYWRlcikgPT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9leHBvcnRRdW90ZVdyYXBwZXIgKyBoZWFkZXIudGl0bGUgKyB0aGlzLl9leHBvcnRRdW90ZVdyYXBwZXI7XHJcbiAgICAgIH0pO1xyXG4gICAgICBvdXRwdXREYXRhU3RyaW5nICs9IChvdXRwdXRIZWFkZXJUaXRsZXMuam9pbihkZWxpbWl0ZXIpICsgdGhpcy5fbGluZUNhcnJpYWdlUmV0dXJuKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBQb3B1bGF0ZSB0aGUgcmVzdCBvZiB0aGUgR3JpZCBEYXRhXHJcbiAgICBvdXRwdXREYXRhU3RyaW5nICs9IHRoaXMuZ2V0QWxsR3JpZFJvd0RhdGEoY29sdW1ucywgdGhpcy5fbGluZUNhcnJpYWdlUmV0dXJuKTtcclxuXHJcbiAgICByZXR1cm4gb3V0cHV0RGF0YVN0cmluZztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCBhbGwgdGhlIGdyaWQgcm93IGRhdGEgYW5kIHJldHVybiB0aGF0IGFzIGFuIG91dHB1dCBzdHJpbmdcclxuICAgKi9cclxuICBnZXRBbGxHcmlkUm93RGF0YShjb2x1bW5zOiBDb2x1bW5bXSwgbGluZUNhcnJpYWdlUmV0dXJuOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgY29uc3Qgb3V0cHV0RGF0YVN0cmluZ3MgPSBbXTtcclxuICAgIGNvbnN0IGxpbmVDb3VudCA9IHRoaXMuX2RhdGFWaWV3LmdldExlbmd0aCgpO1xyXG5cclxuICAgIC8vIGxvb3AgdGhyb3VnaCBhbGwgdGhlIGdyaWQgcm93cyBvZiBkYXRhXHJcbiAgICBmb3IgKGxldCByb3dOdW1iZXIgPSAwOyByb3dOdW1iZXIgPCBsaW5lQ291bnQ7IHJvd051bWJlcisrKSB7XHJcbiAgICAgIGNvbnN0IGl0ZW1PYmogPSB0aGlzLl9kYXRhVmlldy5nZXRJdGVtKHJvd051bWJlcik7XHJcblxyXG4gICAgICBpZiAoaXRlbU9iaiAhPSBudWxsKSB7XHJcbiAgICAgICAgLy8gTm9ybWFsIHJvdyAobm90IGdyb3VwZWQgYnkgYW55dGhpbmcpIHdvdWxkIGhhdmUgYW4gSUQgd2hpY2ggd2FzIHByZWRlZmluZWQgaW4gdGhlIEdyaWQgQ29sdW1ucyBkZWZpbml0aW9uXHJcbiAgICAgICAgaWYgKGl0ZW1PYmpbdGhpcy5kYXRhc2V0SWROYW1lXSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAvLyBnZXQgcmVndWxhciByb3cgaXRlbSBkYXRhXHJcbiAgICAgICAgICBvdXRwdXREYXRhU3RyaW5ncy5wdXNoKHRoaXMucmVhZFJlZ3VsYXJSb3dEYXRhKGNvbHVtbnMsIHJvd051bWJlciwgaXRlbU9iaikpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5faGFzR3JvdXBlZEl0ZW1zICYmIGl0ZW1PYmouX19ncm91cFRvdGFscyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAvLyBnZXQgdGhlIGdyb3VwIHJvd1xyXG4gICAgICAgICAgb3V0cHV0RGF0YVN0cmluZ3MucHVzaCh0aGlzLnJlYWRHcm91cGVkVGl0bGVSb3coaXRlbU9iaikpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaXRlbU9iai5fX2dyb3VwVG90YWxzKSB7XHJcbiAgICAgICAgICAvLyBlbHNlIGlmIHRoZSByb3cgaXMgYSBHcm91cCBCeSBhbmQgd2UgaGF2ZSBhZ3JlZ2dhdG9ycywgdGhlbiBhIHByb3BlcnR5IG9mICdfX2dyb3VwVG90YWxzJyB3b3VsZCBleGlzdCB1bmRlciB0aGF0IG9iamVjdFxyXG4gICAgICAgICAgb3V0cHV0RGF0YVN0cmluZ3MucHVzaCh0aGlzLnJlYWRHcm91cGVkVG90YWxSb3coY29sdW1ucywgaXRlbU9iaikpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBvdXRwdXREYXRhU3RyaW5ncy5qb2luKHRoaXMuX2xpbmVDYXJyaWFnZVJldHVybik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgYWxsIGhlYWRlciB0aXRsZXMgYW5kIHRoZWlyIGtleXMsIHRyYW5zbGF0ZSB0aGUgdGl0bGUgd2hlbiByZXF1aXJlZC5cclxuICAgKiBAcGFyYW0gY29sdW1ucyBvZiB0aGUgZ3JpZFxyXG4gICAqL1xyXG4gIGdldENvbHVtbkhlYWRlcnMoY29sdW1uczogQ29sdW1uW10pOiBFeHBvcnRDb2x1bW5IZWFkZXJbXSB7XHJcbiAgICBpZiAoIWNvbHVtbnMgfHwgIUFycmF5LmlzQXJyYXkoY29sdW1ucykgfHwgY29sdW1ucy5sZW5ndGggPT09IDApIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBjb25zdCBjb2x1bW5IZWFkZXJzID0gW107XHJcblxyXG4gICAgLy8gUG9wdWxhdGUgdGhlIENvbHVtbiBIZWFkZXIsIHB1bGwgdGhlIG5hbWUgZGVmaW5lZFxyXG4gICAgY29sdW1ucy5mb3JFYWNoKChjb2x1bW5EZWYpID0+IHtcclxuICAgICAgY29uc3QgZmllbGROYW1lID0gKGNvbHVtbkRlZi5oZWFkZXJLZXkpID8gdGhpcy50cmFuc2xhdGUuaW5zdGFudChjb2x1bW5EZWYuaGVhZGVyS2V5KSA6IGNvbHVtbkRlZi5uYW1lO1xyXG4gICAgICBjb25zdCBza2lwcGVkRmllbGQgPSBjb2x1bW5EZWYuZXhjbHVkZUZyb21FeHBvcnQgfHwgZmFsc2U7XHJcblxyXG4gICAgICAvLyBpZiBjb2x1bW4gd2lkdGggaXMgMCB0aGVuIGl0J3Mgbm90IGV2YWx1YXRlZCBzaW5jZSB0aGF0IGZpZWxkIGlzIGNvbnNpZGVyZWQgaGlkZGVuIHNob3VsZCBub3QgYmUgcGFydCBvZiB0aGUgZXhwb3J0XHJcbiAgICAgIGlmICgoY29sdW1uRGVmLndpZHRoID09PSAgdW5kZWZpbmVkIHx8IGNvbHVtbkRlZi53aWR0aCA+IDApICYmICFza2lwcGVkRmllbGQpIHtcclxuICAgICAgICBjb2x1bW5IZWFkZXJzLnB1c2goe1xyXG4gICAgICAgICAga2V5OiBjb2x1bW5EZWYuZmllbGQgfHwgY29sdW1uRGVmLmlkLFxyXG4gICAgICAgICAgdGl0bGU6IGZpZWxkTmFtZVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gY29sdW1uSGVhZGVycztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgZGF0YSBvZiBhIHJlZ3VsYXIgcm93IChhIHJvdyB3aXRob3V0IGdyb3VwaW5nKVxyXG4gICAqIEBwYXJhbSByb3dcclxuICAgKiBAcGFyYW0gaXRlbU9ialxyXG4gICAqL1xyXG4gIHJlYWRSZWd1bGFyUm93RGF0YShjb2x1bW5zOiBDb2x1bW5bXSwgcm93OiBudW1iZXIsIGl0ZW1PYmo6IGFueSkge1xyXG4gICAgbGV0IGlkeCA9IDA7XHJcbiAgICBjb25zdCByb3dPdXRwdXRTdHJpbmdzID0gW107XHJcbiAgICBjb25zdCBkZWxpbWl0ZXIgPSB0aGlzLl9leHBvcnRPcHRpb25zLmRlbGltaXRlcjtcclxuICAgIGNvbnN0IGZvcm1hdCA9IHRoaXMuX2V4cG9ydE9wdGlvbnMuZm9ybWF0O1xyXG4gICAgY29uc3QgZXhwb3J0UXVvdGVXcmFwcGVyID0gdGhpcy5fZXhwb3J0UXVvdGVXcmFwcGVyIHx8ICcnO1xyXG5cclxuICAgIGZvciAobGV0IGNvbCA9IDAsIGxuID0gY29sdW1ucy5sZW5ndGg7IGNvbCA8IGxuOyBjb2wrKykge1xyXG4gICAgICBjb25zdCBjb2x1bW5EZWYgPSBjb2x1bW5zW2NvbF07XHJcbiAgICAgIGNvbnN0IGZpZWxkSWQgPSBjb2x1bW5EZWYuZmllbGQgfHwgY29sdW1uRGVmLmlkIHx8ICcnO1xyXG5cclxuICAgICAgLy8gc2tpcCBleGNsdWRlZCBjb2x1bW5cclxuICAgICAgaWYgKGNvbHVtbkRlZi5leGNsdWRlRnJvbUV4cG9ydCkge1xyXG4gICAgICAgICAgY29udGludWU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIGlmIHdlIGFyZSBncm91cGluZyBhbmQgYXJlIG9uIDFzdCBjb2x1bW4gaW5kZXgsIHdlIG5lZWQgdG8gc2tpcCB0aGlzIGNvbHVtbiBzaW5jZSBpdCB3aWxsIGJlIHVzZWQgbGF0ZXIgYnkgdGhlIGdyb3VwaW5nIHRleHQ6OiBHcm91cCBieSBbY29sdW1uWF1cclxuICAgICAgaWYgKHRoaXMuX2hhc0dyb3VwZWRJdGVtcyAmJiBpZHggPT09IDApIHtcclxuICAgICAgICByb3dPdXRwdXRTdHJpbmdzLnB1c2goYFwiXCJgKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gZG9lcyB0aGUgdXNlciB3YW50IHRvIGV2YWx1YXRlIGN1cnJlbnQgY29sdW1uIEZvcm1hdHRlcj9cclxuICAgICAgY29uc3QgaXNFdmFsdWF0aW5nRm9ybWF0dGVyID0gKGNvbHVtbkRlZi5leHBvcnRXaXRoRm9ybWF0dGVyICE9PSB1bmRlZmluZWQpID8gY29sdW1uRGVmLmV4cG9ydFdpdGhGb3JtYXR0ZXIgOiB0aGlzLl9leHBvcnRPcHRpb25zLmV4cG9ydFdpdGhGb3JtYXR0ZXI7XHJcblxyXG4gICAgICAvLyBkaWQgdGhlIHVzZXIgcHJvdmlkZSBhIEN1c3RvbSBGb3JtYXR0ZXIgZm9yIHRoZSBleHBvcnRcclxuICAgICAgY29uc3QgZXhwb3J0Q3VzdG9tRm9ybWF0dGVyOiBGb3JtYXR0ZXIgfCB1bmRlZmluZWQgPSAoY29sdW1uRGVmLmV4cG9ydEN1c3RvbUZvcm1hdHRlciAhPT0gdW5kZWZpbmVkKSA/IGNvbHVtbkRlZi5leHBvcnRDdXN0b21Gb3JtYXR0ZXIgOiB1bmRlZmluZWQ7XHJcblxyXG4gICAgICBsZXQgaXRlbURhdGEgPSAnJztcclxuXHJcbiAgICAgIGlmIChpdGVtT2JqICYmIGl0ZW1PYmpbZmllbGRJZF0gJiYgZXhwb3J0Q3VzdG9tRm9ybWF0dGVyICE9PSB1bmRlZmluZWQgJiYgZXhwb3J0Q3VzdG9tRm9ybWF0dGVyICE9PSBudWxsKSB7XHJcbiAgICAgICAgY29uc3QgZm9ybWF0dGVkRGF0YSA9IGV4cG9ydEN1c3RvbUZvcm1hdHRlcihyb3csIGNvbCwgaXRlbU9ialtmaWVsZElkXSwgY29sdW1uRGVmLCBpdGVtT2JqLCB0aGlzLl9ncmlkKTtcclxuICAgICAgICBpdGVtRGF0YSA9IGZvcm1hdHRlZERhdGEgYXMgc3RyaW5nO1xyXG4gICAgICAgIGlmIChmb3JtYXR0ZWREYXRhICYmIHR5cGVvZiBmb3JtYXR0ZWREYXRhID09PSAnb2JqZWN0JyAmJiBmb3JtYXR0ZWREYXRhLmhhc093blByb3BlcnR5KCd0ZXh0JykpIHtcclxuICAgICAgICAgIGl0ZW1EYXRhID0gZm9ybWF0dGVkRGF0YS50ZXh0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaXRlbURhdGEgPT09IG51bGwpIHtcclxuICAgICAgICAgIGl0ZW1EYXRhID0gJyc7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2UgaWYgKGlzRXZhbHVhdGluZ0Zvcm1hdHRlciAmJiBjb2x1bW5EZWYuZm9ybWF0dGVyICE9PSB1bmRlZmluZWQgJiYgY29sdW1uRGVmLmZvcm1hdHRlciAhPT0gbnVsbCkge1xyXG4gICAgICAgIGNvbnN0IGZvcm1hdHRlZERhdGEgPSBjb2x1bW5EZWYuZm9ybWF0dGVyKHJvdywgY29sLCBpdGVtT2JqW2ZpZWxkSWRdLCBjb2x1bW5EZWYsIGl0ZW1PYmosIHRoaXMuX2dyaWQpO1xyXG4gICAgICAgIGl0ZW1EYXRhID0gZm9ybWF0dGVkRGF0YSBhcyBzdHJpbmc7XHJcbiAgICAgICAgaWYgKGZvcm1hdHRlZERhdGEgJiYgdHlwZW9mIGZvcm1hdHRlZERhdGEgPT09ICdvYmplY3QnICYmIGZvcm1hdHRlZERhdGEuaGFzT3duUHJvcGVydHkoJ3RleHQnKSkge1xyXG4gICAgICAgICAgaXRlbURhdGEgPSBmb3JtYXR0ZWREYXRhLnRleHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpdGVtRGF0YSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgaXRlbURhdGEgPSAnJztcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaXRlbURhdGEgPSAoaXRlbU9ialtmaWVsZElkXSA9PT0gbnVsbCB8fCBpdGVtT2JqW2ZpZWxkSWRdID09PSB1bmRlZmluZWQpID8gJycgOiBpdGVtT2JqW2ZpZWxkSWRdO1xyXG4gICAgICAgIGlmIChpdGVtRGF0YSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgaXRlbURhdGEgPSAnJztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIGRvZXMgdGhlIHVzZXIgd2FudCB0byBzYW5pdGl6ZSB0aGUgb3V0cHV0IGRhdGEgKHJlbW92ZSBIVE1MIHRhZ3MpP1xyXG4gICAgICBpZiAoY29sdW1uRGVmLnNhbml0aXplRGF0YUV4cG9ydCB8fCB0aGlzLl9leHBvcnRPcHRpb25zLnNhbml0aXplRGF0YUV4cG9ydCkge1xyXG4gICAgICAgIGl0ZW1EYXRhID0gc2FuaXRpemVIdG1sVG9UZXh0KGl0ZW1EYXRhKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gd2hlbiBDU1Ygd2UgYWxzbyBuZWVkIHRvIGVzY2FwZSBkb3VibGUgcXVvdGVzIHR3aWNlLCBzbyBcIiBiZWNvbWVzIFwiXCJcclxuICAgICAgaWYgKGZvcm1hdCA9PT0gRmlsZVR5cGUuY3N2ICYmIGl0ZW1EYXRhKSB7XHJcbiAgICAgICAgaXRlbURhdGEgPSBpdGVtRGF0YS50b1N0cmluZygpLnJlcGxhY2UoL1wiL2dpLCBgXCJcImApO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBkbyB3ZSBoYXZlIGEgd3JhcHBlciB0byBrZWVwIGFzIGEgc3RyaW5nPyBpbiBjZXJ0YWluIGNhc2VzIGxpa2UgXCIxRTA2XCIsIHdlIGRvbid0IHdhbnQgZXhjZWwgdG8gdHJhbnNmb3JtIGl0IGludG8gZXhwb25lbnRpYWwgKDEuMEUwNilcclxuICAgICAgLy8gdG8gY2FuY2VsIHRoYXQgZWZmZWN0IHdlIGNhbiBoYWQgPSBpbiBmcm9udCwgZXg6ID1cIjFFMDZcIlxyXG4gICAgICBjb25zdCBrZWVwQXNTdHJpbmdXcmFwcGVyID0gKGNvbHVtbkRlZiAmJiBjb2x1bW5EZWYuZXhwb3J0Q3N2Rm9yY2VUb0tlZXBBc1N0cmluZykgPyAnPScgOiAnJztcclxuXHJcbiAgICAgIHJvd091dHB1dFN0cmluZ3MucHVzaChrZWVwQXNTdHJpbmdXcmFwcGVyICsgZXhwb3J0UXVvdGVXcmFwcGVyICsgaXRlbURhdGEgKyBleHBvcnRRdW90ZVdyYXBwZXIpO1xyXG4gICAgICBpZHgrKztcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcm93T3V0cHV0U3RyaW5ncy5qb2luKGRlbGltaXRlcik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIGdyb3VwZWQgdGl0bGUocyksIGZvciBleGFtcGxlIGlmIHdlIGdyb3VwZWQgYnkgc2FsZXNSZXAsIHRoZSByZXR1cm5lZCByZXN1bHQgd291bGQgYmU6OiAnU2FsZXMgUmVwJ1xyXG4gICAqIEBwYXJhbSBpdGVtT2JqXHJcbiAgICovXHJcbiAgcmVhZEdyb3VwZWRUaXRsZVJvdyhpdGVtT2JqOiBhbnkpIHtcclxuICAgIGxldCBncm91cE5hbWUgPSBzYW5pdGl6ZUh0bWxUb1RleHQoaXRlbU9iai50aXRsZSk7XHJcbiAgICBjb25zdCBleHBvcnRRdW90ZVdyYXBwZXIgPSB0aGlzLl9leHBvcnRRdW90ZVdyYXBwZXIgfHwgJyc7XHJcbiAgICBjb25zdCBmb3JtYXQgPSB0aGlzLl9leHBvcnRPcHRpb25zLmZvcm1hdDtcclxuXHJcbiAgICBncm91cE5hbWUgPSBhZGRXaGl0ZVNwYWNlcyg1ICogaXRlbU9iai5sZXZlbCkgKyBncm91cE5hbWU7XHJcblxyXG4gICAgaWYgKGZvcm1hdCA9PT0gRmlsZVR5cGUuY3N2KSB7XHJcbiAgICAgIC8vIHdoZW4gQ1NWIHdlIGFsc28gbmVlZCB0byBlc2NhcGUgZG91YmxlIHF1b3RlcyB0d2ljZSwgc28gXCIgYmVjb21lcyBcIlwiXHJcbiAgICAgIGdyb3VwTmFtZSA9IGdyb3VwTmFtZS50b1N0cmluZygpLnJlcGxhY2UoL1wiL2dpLCBgXCJcImApO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGV4cG9ydFF1b3RlV3JhcHBlciArICcgJyArIGdyb3VwTmFtZSArIGV4cG9ydFF1b3RlV3JhcHBlcjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgZ3JvdXBlZCB0b3RhbHMsIHRoZXNlIGFyZSBzZXQgYnkgU2xpY2sgQWdncmVnYXRvcnMuXHJcbiAgICogRm9yIGV4YW1wbGUgaWYgd2UgZ3JvdXBlZCBieSBcInNhbGVzUmVwXCIgYW5kIHdlIGhhdmUgYSBTdW0gQWdncmVnYXRvciBvbiBcInNhbGVzXCIsIHRoZW4gdGhlIHJldHVybmVkIG91dHB1dCB3b3VsZCBiZTo6IFtcIlN1bSAxMjMkXCJdXHJcbiAgICogQHBhcmFtIGl0ZW1PYmpcclxuICAgKi9cclxuICByZWFkR3JvdXBlZFRvdGFsUm93KGNvbHVtbnM6IENvbHVtbltdLCBpdGVtT2JqOiBhbnkpIHtcclxuICAgIGNvbnN0IGRlbGltaXRlciA9IHRoaXMuX2V4cG9ydE9wdGlvbnMuZGVsaW1pdGVyO1xyXG4gICAgY29uc3QgZm9ybWF0ID0gdGhpcy5fZXhwb3J0T3B0aW9ucy5mb3JtYXQ7XHJcbiAgICBjb25zdCBncm91cGluZ0FnZ3JlZ2F0b3JSb3dUZXh0ID0gdGhpcy5fZXhwb3J0T3B0aW9ucy5ncm91cGluZ0FnZ3JlZ2F0b3JSb3dUZXh0IHx8ICcnO1xyXG4gICAgY29uc3QgZXhwb3J0UXVvdGVXcmFwcGVyID0gdGhpcy5fZXhwb3J0UXVvdGVXcmFwcGVyIHx8ICcnO1xyXG4gICAgY29uc3Qgb3V0cHV0U3RyaW5ncyA9IFtgJHtleHBvcnRRdW90ZVdyYXBwZXJ9JHtncm91cGluZ0FnZ3JlZ2F0b3JSb3dUZXh0fSR7ZXhwb3J0UXVvdGVXcmFwcGVyfWBdO1xyXG5cclxuICAgIGNvbHVtbnMuZm9yRWFjaCgoY29sdW1uRGVmKSA9PiB7XHJcbiAgICAgIGxldCBpdGVtRGF0YSA9ICcnO1xyXG5cclxuICAgICAgLy8gaWYgdGhlcmUncyBhIGdyb3VwVG90YWxzRm9ybWF0dGVyLCB3ZSB3aWxsIHJlLXJ1biBpdCB0byBnZXQgdGhlIGV4YWN0IHNhbWUgb3V0cHV0IGFzIHdoYXQgaXMgc2hvd24gaW4gVUlcclxuICAgICAgaWYgKGNvbHVtbkRlZi5ncm91cFRvdGFsc0Zvcm1hdHRlcikge1xyXG4gICAgICAgIGl0ZW1EYXRhID0gY29sdW1uRGVmLmdyb3VwVG90YWxzRm9ybWF0dGVyKGl0ZW1PYmosIGNvbHVtbkRlZik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIGRvZXMgdGhlIHVzZXIgd2FudCB0byBzYW5pdGl6ZSB0aGUgb3V0cHV0IGRhdGEgKHJlbW92ZSBIVE1MIHRhZ3MpP1xyXG4gICAgICBpZiAoY29sdW1uRGVmLnNhbml0aXplRGF0YUV4cG9ydCB8fCB0aGlzLl9leHBvcnRPcHRpb25zLnNhbml0aXplRGF0YUV4cG9ydCkge1xyXG4gICAgICAgIGl0ZW1EYXRhID0gc2FuaXRpemVIdG1sVG9UZXh0KGl0ZW1EYXRhKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGZvcm1hdCA9PT0gRmlsZVR5cGUuY3N2KSB7XHJcbiAgICAgICAgLy8gd2hlbiBDU1Ygd2UgYWxzbyBuZWVkIHRvIGVzY2FwZSBkb3VibGUgcXVvdGVzIHR3aWNlLCBzbyBhIGRvdWJsZSBxdW90ZSBcIiBiZWNvbWVzIDJ4IGRvdWJsZSBxdW90ZXMgXCJcIlxyXG4gICAgICAgIGl0ZW1EYXRhID0gaXRlbURhdGEudG9TdHJpbmcoKS5yZXBsYWNlKC9cIi9naSwgYFwiXCJgKTtcclxuICAgICAgfVxyXG4gICAgICBvdXRwdXRTdHJpbmdzLnB1c2goZXhwb3J0UXVvdGVXcmFwcGVyICsgaXRlbURhdGEgKyBleHBvcnRRdW90ZVdyYXBwZXIpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIG91dHB1dFN0cmluZ3Muam9pbihkZWxpbWl0ZXIpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVHJpZ2dlcnMgZG93bmxvYWQgZmlsZSB3aXRoIGZpbGUgZm9ybWF0LlxyXG4gICAqIElFKDYtMTApIGFyZSBub3Qgc3VwcG9ydGVkXHJcbiAgICogQWxsIG90aGVyIGJyb3dzZXJzIHdpbGwgdXNlIHBsYWluIGphdmFzY3JpcHQgb24gY2xpZW50IHNpZGUgdG8gcHJvZHVjZSBhIGZpbGUgZG93bmxvYWQuXHJcbiAgICogQHBhcmFtIG9wdGlvbnNcclxuICAgKi9cclxuICBzdGFydERvd25sb2FkRmlsZShvcHRpb25zOiB7IGZpbGVuYW1lOiBzdHJpbmcsIGNzdkNvbnRlbnQ6IGFueSwgZm9ybWF0OiBGaWxlVHlwZSB8IHN0cmluZywgdXNlVXRmOFdpdGhCb206IGJvb2xlYW4gfSk6IHZvaWQge1xyXG4gICAgLy8gSUUoNi0xMCkgZG9uJ3Qgc3VwcG9ydCBqYXZhc2NyaXB0IGRvd25sb2FkIGFuZCBvdXIgc2VydmljZSBkb2Vzbid0IHN1cHBvcnQgZWl0aGVyIHNvIHRocm93IGFuIGVycm9yLCB3ZSBoYXZlIHRvIG1ha2UgYSByb3VuZCB0cmlwIHRvIHRoZSBXZWIgU2VydmVyIGZvciBleHBvcnRpbmdcclxuICAgIGlmIChuYXZpZ2F0b3IuYXBwTmFtZSA9PT0gJ01pY3Jvc29mdCBJbnRlcm5ldCBFeHBsb3JlcicpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaWNyb3NvZnQgSW50ZXJuZXQgRXhwbG9yZXIgNiB0byAxMCBkbyBub3Qgc3VwcG9ydCBqYXZhc2NyaXB0IGV4cG9ydCB0byBDU1YuIFBsZWFzZSB1cGdyYWRlIHlvdXIgYnJvd3Nlci4nKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBzZXQgdGhlIGNvcnJlY3QgTUlNRSB0eXBlXHJcbiAgICBjb25zdCBtaW1lVHlwZSA9IChvcHRpb25zLmZvcm1hdCA9PT0gRmlsZVR5cGUuY3N2KSA/ICd0ZXh0L2NzdicgOiAndGV4dC9wbGFpbic7XHJcblxyXG4gICAgLy8gbWFrZSBzdXJlIG5vIGh0bWwgZW50aXRpZXMgZXhpc3QgaW4gdGhlIGRhdGFcclxuICAgIGNvbnN0IGNzdkNvbnRlbnQgPSBodG1sRW50aXR5RGVjb2RlKG9wdGlvbnMuY3N2Q29udGVudCk7XHJcblxyXG4gICAgLy8gZGVhbGluZyB3aXRoIEV4Y2VsIENTViBleHBvcnQgYW5kIFVURi04IGlzIGEgbGl0dGxlIHRyaWNreS4uIFdlIHdpbGwgdXNlIE9wdGlvbiAjMiB0byBjb3ZlciBvbGRlciBFeGNlbCB2ZXJzaW9uc1xyXG4gICAgLy8gT3B0aW9uICMxOiB3ZSBuZWVkIHRvIG1ha2UgRXhjZWwga25vd2luZyB0aGF0IGl0J3MgZGVhbGluZyB3aXRoIGFuIFVURi04LCBBIGNvcnJlY3RseSBmb3JtYXR0ZWQgVVRGOCBmaWxlIGNhbiBoYXZlIGEgQnl0ZSBPcmRlciBNYXJrIGFzIGl0cyBmaXJzdCB0aHJlZSBvY3RldHNcclxuICAgIC8vIHJlZmVyZW5jZTogaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xNTUwOTcvbWljcm9zb2Z0LWV4Y2VsLW1hbmdsZXMtZGlhY3JpdGljcy1pbi1jc3YtZmlsZXNcclxuICAgIC8vIE9wdGlvbiMyOiB1c2UgYSAzcmQgcGFydHkgZXh0ZW5zaW9uIHRvIGphdmFzY3JpcHQgZW5jb2RlIGludG8gVVRGLTE2XHJcbiAgICBsZXQgb3V0cHV0RGF0YTogVWludDhBcnJheSB8IHN0cmluZztcclxuICAgIGlmIChvcHRpb25zLmZvcm1hdCA9PT0gRmlsZVR5cGUuY3N2KSB7XHJcbiAgICAgIG91dHB1dERhdGEgPSBuZXcgVGV4dEVuY29kZXIoJ3V0Zi04JykuZW5jb2RlKGNzdkNvbnRlbnQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgb3V0cHV0RGF0YSA9IGNzdkNvbnRlbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gY3JlYXRlIGEgQmxvYiBvYmplY3QgZm9yIHRoZSBkb3dubG9hZFxyXG4gICAgY29uc3QgYmxvYiA9IG5ldyBCbG9iKFtvcHRpb25zLnVzZVV0ZjhXaXRoQm9tID8gJ1xcdUZFRkYnIDogJycsIG91dHB1dERhdGFdLCB7XHJcbiAgICAgIHR5cGU6IGAke21pbWVUeXBlfTtjaGFyc2V0PXV0Zi04O2BcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIHdoZW4gdXNpbmcgSUUvRWRnZSwgdGhlbiB1c2UgZGlmZmVyZW50IGRvd25sb2FkIGNhbGxcclxuICAgIGlmICh0eXBlb2YgbmF2aWdhdG9yLm1zU2F2ZU9yT3BlbkJsb2IgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgbmF2aWdhdG9yLm1zU2F2ZU9yT3BlbkJsb2IoYmxvYiwgb3B0aW9ucy5maWxlbmFtZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyB0aGlzIHRyaWNrIHdpbGwgZ2VuZXJhdGUgYSB0ZW1wIDxhIC8+IHRhZ1xyXG4gICAgICAvLyB0aGUgY29kZSB3aWxsIHRoZW4gdHJpZ2dlciBhIGhpZGRlbiBjbGljayBmb3IgaXQgdG8gc3RhcnQgZG93bmxvYWRpbmdcclxuICAgICAgY29uc3QgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuICAgICAgY29uc3QgY3N2VXJsID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcclxuXHJcbiAgICAgIGxpbmsudGV4dENvbnRlbnQgPSAnZG93bmxvYWQnO1xyXG4gICAgICBsaW5rLmhyZWYgPSBjc3ZVcmw7XHJcbiAgICAgIGxpbmsuc2V0QXR0cmlidXRlKCdkb3dubG9hZCcsIG9wdGlvbnMuZmlsZW5hbWUpO1xyXG5cclxuICAgICAgLy8gc2V0IHRoZSB2aXNpYmlsaXR5IHRvIGhpZGRlbiBzbyB0aGVyZSBpcyBubyBlZmZlY3Qgb24geW91ciB3ZWItbGF5b3V0XHJcbiAgICAgIGxpbmsuc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xyXG5cclxuICAgICAgLy8gdGhpcyBwYXJ0IHdpbGwgYXBwZW5kIHRoZSBhbmNob3IgdGFnLCB0cmlnZ2VyIGEgY2xpY2sgKGZvciBkb3dubG9hZCB0byBzdGFydCkgYW5kIGZpbmFsbHkgcmVtb3ZlIHRoZSB0YWcgb25jZSBjb21wbGV0ZWRcclxuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChsaW5rKTtcclxuICAgICAgbGluay5jbGljaygpO1xyXG4gICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGxpbmspO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=