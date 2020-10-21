/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileExtPipe } from './file-ext.pipe';
import { ViewerDirective } from './viewer.directive';
import { FileIconPipe } from './file-icon.pipe';
import { FileFormatService } from './file-format.service';
import { ViewerService } from './viewer.service';
import { FileListComponent } from './list/file-list.component';
export class FileModule {
}
FileModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                declarations: [ViewerDirective, FileIconPipe, FileExtPipe, FileListComponent],
                exports: [ViewerDirective, FileIconPipe, FileExtPipe, FileListComponent],
                providers: [FileFormatService, ViewerService]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbmV0LXVpLyIsInNvdXJjZXMiOlsic3JjL2ZpbGUvZmlsZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM1QyxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDbkQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQzlDLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQ3hELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUMvQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQVUvRCxNQUFNLE9BQU8sVUFBVTs7O1lBUnRCLFFBQVEsU0FBQztnQkFDTixPQUFPLEVBQUU7b0JBQ0wsWUFBWTtpQkFDZjtnQkFDRCxZQUFZLEVBQUUsQ0FBQyxlQUFlLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxpQkFBaUIsQ0FBQztnQkFDN0UsT0FBTyxFQUFFLENBQUMsZUFBZSxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsaUJBQWlCLENBQUM7Z0JBQ3hFLFNBQVMsRUFBRSxDQUFDLGlCQUFpQixFQUFFLGFBQWEsQ0FBQzthQUNoRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0ZpbGVFeHRQaXBlfSBmcm9tICcuL2ZpbGUtZXh0LnBpcGUnO1xuaW1wb3J0IHtWaWV3ZXJEaXJlY3RpdmV9IGZyb20gJy4vdmlld2VyLmRpcmVjdGl2ZSc7XG5pbXBvcnQge0ZpbGVJY29uUGlwZX0gZnJvbSAnLi9maWxlLWljb24ucGlwZSc7XG5pbXBvcnQge0ZpbGVGb3JtYXRTZXJ2aWNlfSBmcm9tICcuL2ZpbGUtZm9ybWF0LnNlcnZpY2UnO1xuaW1wb3J0IHtWaWV3ZXJTZXJ2aWNlfSBmcm9tICcuL3ZpZXdlci5zZXJ2aWNlJztcbmltcG9ydCB7IEZpbGVMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9saXN0L2ZpbGUtbGlzdC5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtWaWV3ZXJEaXJlY3RpdmUsIEZpbGVJY29uUGlwZSwgRmlsZUV4dFBpcGUsIEZpbGVMaXN0Q29tcG9uZW50XSxcbiAgICBleHBvcnRzOiBbVmlld2VyRGlyZWN0aXZlLCBGaWxlSWNvblBpcGUsIEZpbGVFeHRQaXBlLCBGaWxlTGlzdENvbXBvbmVudF0sXG4gICAgcHJvdmlkZXJzOiBbRmlsZUZvcm1hdFNlcnZpY2UsIFZpZXdlclNlcnZpY2VdXG59KVxuZXhwb3J0IGNsYXNzIEZpbGVNb2R1bGUge1xufVxuIl19