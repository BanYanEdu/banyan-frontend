import { PipeTransform } from '@angular/core';
import { FileFormatService } from "./file-format.service";
export declare class FileExtPipe implements PipeTransform {
    private formatService;
    constructor(formatService: FileFormatService);
    transform(name: string): string;
}
