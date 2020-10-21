import { PipeTransform } from '@angular/core';
import { FileFormatService } from "./file-format.service";
export declare class FileIconPipe implements PipeTransform {
    private formatService;
    constructor(formatService: FileFormatService);
    transform(name: string): string;
}
