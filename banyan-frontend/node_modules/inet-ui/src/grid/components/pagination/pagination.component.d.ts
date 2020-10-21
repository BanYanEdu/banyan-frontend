import { TemplateRef, ElementRef } from '@angular/core';
import { DataTable } from '../table/table.component';
export declare class DataTablePagination {
    dataTable: DataTable;
    show_range: boolean;
    show_limit: boolean;
    show_input: boolean;
    show_numbers: boolean;
    show_column_selector: boolean;
    autoHide: boolean;
    basicSearch: TemplateRef<ElementRef>;
    advanceSearch: TemplateRef<ElementRef>;
    columnSelectorOpen: boolean;
    _closeSelector(): void;
    constructor(dataTable: DataTable);
    pageBack(): void;
    pageForward(): void;
    pageFirst(): void;
    pageLast(): void;
    readonly maxPage: number;
    limit: number;
    page: number;
    createPageRange(number: any, page: any): any[];
    onChange(value: any): any;
}
