/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
export class FileType {
    /**
     * @param {?} file
     * @return {?}
     */
    static getMimeClass(file) {
        /** @type {?} */
        let mimeClass = 'application';
        if (this.mime_psd.indexOf(file.type) !== -1) {
            mimeClass = 'image';
        }
        else if (file.type.match('image.*')) {
            mimeClass = 'image';
        }
        else if (file.type.match('video.*')) {
            mimeClass = 'video';
        }
        else if (file.type.match('audio.*')) {
            mimeClass = 'audio';
        }
        else if (file.type === 'application/pdf') {
            mimeClass = 'pdf';
        }
        else if (this.mime_compress.indexOf(file.type) !== -1) {
            mimeClass = 'compress';
        }
        else if (this.mime_doc.indexOf(file.type) !== -1) {
            mimeClass = 'doc';
        }
        else if (this.mime_xsl.indexOf(file.type) !== -1) {
            mimeClass = 'xls';
        }
        else if (this.mime_ppt.indexOf(file.type) !== -1) {
            mimeClass = 'ppt';
        }
        if (mimeClass === 'application') {
            mimeClass = this.fileTypeDetection(file.name);
        }
        return mimeClass;
    }
    /**
     * @param {?} inputFilename
     * @return {?}
     */
    static fileTypeDetection(inputFilename) {
        /** @type {?} */
        let types = {
            'jpg': 'image',
            'jpeg': 'image',
            'tif': 'image',
            'psd': 'image',
            'bmp': 'image',
            'png': 'image',
            'nef': 'image',
            'tiff': 'image',
            'cr2': 'image',
            'dwg': 'image',
            'cdr': 'image',
            'ai': 'image',
            'indd': 'image',
            'pin': 'image',
            'cdp': 'image',
            'skp': 'image',
            'stp': 'image',
            '3dm': 'image',
            'mp3': 'audio',
            'wav': 'audio',
            'wma': 'audio',
            'mod': 'audio',
            'm4a': 'audio',
            'compress': 'compress',
            'zip': 'compress',
            'rar': 'compress',
            '7z': 'compress',
            'lz': 'compress',
            'z01': 'compress',
            'bz2': 'compress',
            'gz': 'compress',
            'pdf': 'pdf',
            'xls': 'xls',
            'xlsx': 'xls',
            'ods': 'xls',
            'mp4': 'video',
            'avi': 'video',
            'wmv': 'video',
            'mpg': 'video',
            'mts': 'video',
            'flv': 'video',
            '3gp': 'video',
            'vob': 'video',
            'm4v': 'video',
            'mpeg': 'video',
            'm2ts': 'video',
            'mov': 'video',
            'doc': 'doc',
            'docx': 'doc',
            'eps': 'doc',
            'txt': 'doc',
            'odt': 'doc',
            'rtf': 'doc',
            'ppt': 'ppt',
            'pptx': 'ppt',
            'pps': 'ppt',
            'ppsx': 'ppt',
            'odp': 'ppt'
        };
        /** @type {?} */
        let chunks = inputFilename.split('.');
        if (chunks.length < 2) {
            return 'application';
        }
        /** @type {?} */
        let extension = chunks[chunks.length - 1].toLowerCase();
        if (types[extension] === undefined) {
            return 'application';
        }
        else {
            return types[extension];
        }
    }
}
/*  MS office  */
FileType.mime_doc = [
    'application/msword',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.template',
    'application/vnd.ms-word.document.macroEnabled.12',
    'application/vnd.ms-word.template.macroEnabled.12'
];
FileType.mime_xsl = [
    'application/vnd.ms-excel',
    'application/vnd.ms-excel',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.template',
    'application/vnd.ms-excel.sheet.macroEnabled.12',
    'application/vnd.ms-excel.template.macroEnabled.12',
    'application/vnd.ms-excel.addin.macroEnabled.12',
    'application/vnd.ms-excel.sheet.binary.macroEnabled.12'
];
FileType.mime_ppt = [
    'application/vnd.ms-powerpoint',
    'application/vnd.ms-powerpoint',
    'application/vnd.ms-powerpoint',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/vnd.openxmlformats-officedocument.presentationml.template',
    'application/vnd.openxmlformats-officedocument.presentationml.slideshow',
    'application/vnd.ms-powerpoint.addin.macroEnabled.12',
    'application/vnd.ms-powerpoint.presentation.macroEnabled.12',
    'application/vnd.ms-powerpoint.presentation.macroEnabled.12',
    'application/vnd.ms-powerpoint.slideshow.macroEnabled.12'
];
/* PSD */
FileType.mime_psd = [
    'image/photoshop',
    'image/x-photoshop',
    'image/psd',
    'application/photoshop',
    'application/psd',
    'zz-application/zz-winassoc-psd'
];
/* Compressed files */
FileType.mime_compress = [
    'application/x-gtar',
    'application/x-gcompress',
    'application/compress',
    'application/x-tar',
    'application/x-rar-compressed',
    'application/octet-stream',
    'application/x-zip-compressed',
    'application/zip-compressed',
    'application/x-7z-compressed',
    'application/gzip',
    'application/x-bzip2'
];
if (false) {
    /** @type {?} */
    FileType.mime_doc;
    /** @type {?} */
    FileType.mime_xsl;
    /** @type {?} */
    FileType.mime_ppt;
    /** @type {?} */
    FileType.mime_psd;
    /** @type {?} */
    FileType.mime_compress;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS10eXBlLmNsYXNzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC11aS8iLCJzb3VyY2VzIjpbInNyYy9maWxlLXVwbG9hZC9maWxlLXR5cGUuY2xhc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUVBLE1BQU0sT0FBTyxRQUFROzs7OztJQTREWixNQUFNLENBQUMsWUFBWSxDQUFDLElBQW9COztZQUN6QyxTQUFTLEdBQUcsYUFBYTtRQUM3QixJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtZQUMzQyxTQUFTLEdBQUcsT0FBTyxDQUFDO1NBQ3JCO2FBQU0sSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUNyQyxTQUFTLEdBQUcsT0FBTyxDQUFDO1NBQ3JCO2FBQU0sSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUNyQyxTQUFTLEdBQUcsT0FBTyxDQUFDO1NBQ3JCO2FBQU0sSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUNyQyxTQUFTLEdBQUcsT0FBTyxDQUFDO1NBQ3JCO2FBQU0sSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLGlCQUFpQixFQUFFO1lBQzFDLFNBQVMsR0FBRyxLQUFLLENBQUM7U0FDbkI7YUFBTSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtZQUN2RCxTQUFTLEdBQUcsVUFBVSxDQUFDO1NBQ3hCO2FBQU0sSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDbEQsU0FBUyxHQUFHLEtBQUssQ0FBQztTQUNuQjthQUFN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Jy4vZmlsZS1saWtlLW9iamVjdC5jbGFzcyc7XG5cbmV4cG9ydCBjbGFzcyBGaWxlVHlwZSB7XG4gIC8qICBNUyBvZmZpY2UgICovXG4gIHB1YmxpYyBzdGF0aWMgbWltZV9kb2M6IHN0cmluZ1tdID0gW1xuICAgICdhcHBsaWNhdGlvbi9tc3dvcmQnLFxuICAgICdhcHBsaWNhdGlvbi9tc3dvcmQnLFxuICAgICdhcHBsaWNhdGlvbi92bmQub3BlbnhtbGZvcm1hdHMtb2ZmaWNlZG9jdW1lbnQud29yZHByb2Nlc3NpbmdtbC5kb2N1bWVudCcsXG4gICAgJ2FwcGxpY2F0aW9uL3ZuZC5vcGVueG1sZm9ybWF0cy1vZmZpY2Vkb2N1bWVudC53b3JkcHJvY2Vzc2luZ21sLnRlbXBsYXRlJyxcbiAgICAnYXBwbGljYXRpb24vdm5kLm1zLXdvcmQuZG9jdW1lbnQubWFjcm9FbmFibGVkLjEyJyxcbiAgICAnYXBwbGljYXRpb24vdm5kLm1zLXdvcmQudGVtcGxhdGUubWFjcm9FbmFibGVkLjEyJ1xuICBdO1xuICBwdWJsaWMgc3RhdGljIG1pbWVfeHNsOiBzdHJpbmdbXSA9IFtcbiAgICAnYXBwbGljYXRpb24vdm5kLm1zLWV4Y2VsJyxcbiAgICAnYXBwbGljYXRpb24vdm5kLm1zLWV4Y2VsJyxcbiAgICAnYXBwbGljYXRpb24vdm5kLm1zLWV4Y2VsJyxcbiAgICAnYXBwbGljYXRpb24vdm5kLm9wZW54bWxmb3JtYXRzLW9mZmljZWRvY3VtZW50LnNwcmVhZHNoZWV0bWwuc2hlZXQnLFxuICAgICdhcHBsaWNhdGlvbi92bmQub3BlbnhtbGZvcm1hdHMtb2ZmaWNlZG9jdW1lbnQuc3ByZWFkc2hlZXRtbC50ZW1wbGF0ZScsXG4gICAgJ2FwcGxpY2F0aW9uL3ZuZC5tcy1leGNlbC5zaGVldC5tYWNyb0VuYWJsZWQuMTInLFxuICAgICdhcHBsaWNhdGlvbi92bmQubXMtZXhjZWwudGVtcGxhdGUubWFjcm9FbmFibGVkLjEyJyxcbiAgICAnYXBwbGljYXRpb24vdm5kLm1zLWV4Y2VsLmFkZGluLm1hY3JvRW5hYmxlZC4xMicsXG4gICAgJ2FwcGxpY2F0aW9uL3ZuZC5tcy1leGNlbC5zaGVldC5iaW5hcnkubWFjcm9FbmFibGVkLjEyJ1xuICBdO1xuICBwdWJsaWMgc3RhdGljIG1pbWVfcHB0OiBzdHJpbmdbXSA9IFtcbiAgICAnYXBwbGljYXRpb24vdm5kLm1zLXBvd2VycG9pbnQnLFxuICAgICdhcHBsaWNhdGlvbi92bmQubXMtcG93ZXJwb2ludCcsXG4gICAgJ2FwcGxpY2F0aW9uL3ZuZC5tcy1wb3dlcnBvaW50JyxcbiAgICAnYXBwbGljYXRpb24vdm5kLm1zLXBvd2VycG9pbnQnLFxuICAgICdhcHBsaWNhdGlvbi92bmQub3BlbnhtbGZvcm1hdHMtb2ZmaWNlZG9jdW1lbnQucHJlc2VudGF0aW9ubWwucHJlc2VudGF0aW9uJyxcbiAgICAnYXBwbGljYXRpb24vdm5kLm9wZW54bWxmb3JtYXRzLW9mZmljZWRvY3VtZW50LnByZXNlbnRhdGlvbm1sLnRlbXBsYXRlJyxcbiAgICAnYXBwbGljYXRpb24vdm5kLm9wZW54bWxmb3JtYXRzLW9mZmljZWRvY3VtZW50LnByZXNlbnRhdGlvbm1sLnNsaWRlc2hvdycsXG4gICAgJ2FwcGxpY2F0aW9uL3ZuZC5tcy1wb3dlcnBvaW50LmFkZGluLm1hY3JvRW5hYmxlZC4xMicsXG4gICAgJ2FwcGxpY2F0aW9uL3ZuZC5tcy1wb3dlcnBvaW50LnByZXNlbnRhdGlvbi5tYWNyb0VuYWJsZWQuMTInLFxuICAgICdhcHBsaWNhdGlvbi92bmQubXMtcG93ZXJwb2ludC5wcmVzZW50YXRpb24ubWFjcm9FbmFibGVkLjEyJyxcbiAgICAnYXBwbGljYXRpb24vdm5kLm1zLXBvd2VycG9pbnQuc2xpZGVzaG93Lm1hY3JvRW5hYmxlZC4xMidcbiAgXTtcblxuICAvKiBQU0QgKi9cbiAgcHVibGljIHN0YXRpYyBtaW1lX3BzZDogc3RyaW5nW10gPSBbXG4gICAgJ2ltYWdlL3Bob3Rvc2hvcCcsXG4gICAgJ2ltYWdlL3gtcGhvdG9zaG9wJyxcbiAgICAnaW1hZ2UvcHNkJyxcbiAgICAnYXBwbGljYXRpb24vcGhvdG9zaG9wJyxcbiAgICAnYXBwbGljYXRpb24vcHNkJyxcbiAgICAnenotYXBwbGljYXRpb24venotd2luYXNzb2MtcHNkJ1xuICBdO1xuXG4gIC8qIENvbXByZXNzZWQgZmlsZXMgKi9cbiAgcHVibGljIHN0YXRpYyBtaW1lX2NvbXByZXNzOiBzdHJpbmdbXSA9IFtcbiAgICAnYXBwbGljYXRpb24veC1ndGFyJyxcbiAgICAnYXBwbGljYXRpb24veC1nY29tcHJlc3MnLFxuICAgICdhcHBsaWNhdGlvbi9jb21wcmVzcycsXG4gICAgJ2FwcGxpY2F0aW9uL3gtdGFyJyxcbiAgICAnYXBwbGljYXRpb24veC1yYXItY29tcHJlc3NlZCcsXG4gICAgJ2FwcGxpY2F0aW9uL29jdGV0LXN0cmVhbScsXG4gICAgJ2FwcGxpY2F0aW9uL3gtemlwLWNvbXByZXNzZWQnLFxuICAgICdhcHBsaWNhdGlvbi96aXAtY29tcHJlc3NlZCcsXG4gICAgJ2FwcGxpY2F0aW9uL3gtN3otY29tcHJlc3NlZCcsXG4gICAgJ2FwcGxpY2F0aW9uL2d6aXAnLFxuICAgICdhcHBsaWNhdGlvbi94LWJ6aXAyJ1xuICBdO1xuXG4gIHB1YmxpYyBzdGF0aWMgZ2V0TWltZUNsYXNzKGZpbGU6IEZpbGVMaWtlT2JqZWN0KTogc3RyaW5nIHtcbiAgICBsZXQgbWltZUNsYXNzID0gJ2FwcGxpY2F0aW9uJztcbiAgICBpZiAodGhpcy5taW1lX3BzZC5pbmRleE9mKGZpbGUudHlwZSkgIT09IC0xKSB7XG4gICAgICBtaW1lQ2xhc3MgPSAnaW1hZ2UnO1xuICAgIH0gZWxzZSBpZiAoZmlsZS50eXBlLm1hdGNoKCdpbWFnZS4qJykpIHtcbiAgICAgIG1pbWVDbGFzcyA9ICdpbWFnZSc7XG4gICAgfSBlbHNlIGlmIChmaWxlLnR5cGUubWF0Y2goJ3ZpZGVvLionKSkge1xuICAgICAgbWltZUNsYXNzID0gJ3ZpZGVvJztcbiAgICB9IGVsc2UgaWYgKGZpbGUudHlwZS5tYXRjaCgnYXVkaW8uKicpKSB7XG4gICAgICBtaW1lQ2xhc3MgPSAnYXVkaW8nO1xuICAgIH0gZWxzZSBpZiAoZmlsZS50eXBlID09PSAnYXBwbGljYXRpb24vcGRmJykge1xuICAgICAgbWltZUNsYXNzID0gJ3BkZic7XG4gICAgfSBlbHNlIGlmICh0aGlzLm1pbWVfY29tcHJlc3MuaW5kZXhPZihmaWxlLnR5cGUpICE9PSAtMSkge1xuICAgICAgbWltZUNsYXNzID0gJ2NvbXByZXNzJztcbiAgICB9IGVsc2UgaWYgKHRoaXMubWltZV9kb2MuaW5kZXhPZihmaWxlLnR5cGUpICE9PSAtMSkge1xuICAgICAgbWltZUNsYXNzID0gJ2RvYyc7XG4gICAgfSBlbHNlIGlmICh0aGlzLm1pbWVfeHNsLmluZGV4T2YoZmlsZS50eXBlKSAhPT0gLTEpIHtcbiAgICAgIG1pbWVDbGFzcyA9ICd4bHMnO1xuICAgIH0gZWxzZSBpZiAodGhpcy5taW1lX3BwdC5pbmRleE9mKGZpbGUudHlwZSkgIT09IC0xKSB7XG4gICAgICBtaW1lQ2xhc3MgPSAncHB0JztcbiAgICB9XG4gICAgaWYgKG1pbWVDbGFzcyA9PT0gJ2FwcGxpY2F0aW9uJykge1xuICAgICAgbWltZUNsYXNzID0gdGhpcy5maWxlVHlwZURldGVjdGlvbihmaWxlLm5hbWUpO1xuICAgIH1cblxuICAgIHJldHVybiBtaW1lQ2xhc3M7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGZpbGVUeXBlRGV0ZWN0aW9uKGlucHV0RmlsZW5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgbGV0IHR5cGVzOiB7IFsga2V5OiBzdHJpbmcgXTogc3RyaW5nIH0gPSB7XG4gICAgICAnanBnJzogJ2ltYWdlJyxcbiAgICAgICdqcGVnJzogJ2ltYWdlJyxcbiAgICAgICd0aWYnOiAnaW1hZ2UnLFxuICAgICAgJ3BzZCc6ICdpbWFnZScsXG4gICAgICAnYm1wJzogJ2ltYWdlJyxcbiAgICAgICdwbmcnOiAnaW1hZ2UnLFxuICAgICAgJ25lZic6ICdpbWFnZScsXG4gICAgICAndGlmZic6ICdpbWFnZScsXG4gICAgICAnY3IyJzogJ2ltYWdlJyxcbiAgICAgICdkd2cnOiAnaW1hZ2UnLFxuICAgICAgJ2Nkcic6ICdpbWFnZScsXG4gICAgICAnYWknOiAnaW1hZ2UnLFxuICAgICAgJ2luZGQnOiAnaW1hZ2UnLFxuICAgICAgJ3Bpbic6ICdpbWFnZScsXG4gICAgICAnY2RwJzogJ2ltYWdlJyxcbiAgICAgICdza3AnOiAnaW1hZ2UnLFxuICAgICAgJ3N0cCc6ICdpbWFnZScsXG4gICAgICAnM2RtJzogJ2ltYWdlJyxcbiAgICAgICdtcDMnOiAnYXVkaW8nLFxuICAgICAgJ3dhdic6ICdhdWRpbycsXG4gICAgICAnd21hJzogJ2F1ZGlvJyxcbiAgICAgICdtb2QnOiAnYXVkaW8nLFxuICAgICAgJ200YSc6ICdhdWRpbycsXG4gICAgICAnY29tcHJlc3MnOiAnY29tcHJlc3MnLFxuICAgICAgJ3ppcCc6ICdjb21wcmVzcycsXG4gICAgICAncmFyJzogJ2NvbXByZXNzJyxcbiAgICAgICc3eic6ICdjb21wcmVzcycsXG4gICAgICAnbHonOiAnY29tcHJlc3MnLFxuICAgICAgJ3owMSc6ICdjb21wcmVzcycsXG4gICAgICAnYnoyJzogJ2NvbXByZXNzJyxcbiAgICAgICdneic6ICdjb21wcmVzcycsXG4gICAgICAncGRmJzogJ3BkZicsXG4gICAgICAneGxzJzogJ3hscycsXG4gICAgICAneGxzeCc6ICd4bHMnLFxuICAgICAgJ29kcyc6ICd4bHMnLFxuICAgICAgJ21wNCc6ICd2aWRlbycsXG4gICAgICAnYXZpJzogJ3ZpZGVvJyxcbiAgICAgICd3bXYnOiAndmlkZW8nLFxuICAgICAgJ21wZyc6ICd2aWRlbycsXG4gICAgICAnbXRzJzogJ3ZpZGVvJyxcbiAgICAgICdmbHYnOiAndmlkZW8nLFxuICAgICAgJzNncCc6ICd2aWRlbycsXG4gICAgICAndm9iJzogJ3ZpZGVvJyxcbiAgICAgICdtNHYnOiAndmlkZW8nLFxuICAgICAgJ21wZWcnOiAndmlkZW8nLFxuICAgICAgJ20ydHMnOiAndmlkZW8nLFxuICAgICAgJ21vdic6ICd2aWRlbycsXG4gICAgICAnZG9jJzogJ2RvYycsXG4gICAgICAnZG9jeCc6ICdkb2MnLFxuICAgICAgJ2Vwcyc6ICdkb2MnLFxuICAgICAgJ3R4dCc6ICdkb2MnLFxuICAgICAgJ29kdCc6ICdkb2MnLFxuICAgICAgJ3J0Zic6ICdkb2MnLFxuICAgICAgJ3BwdCc6ICdwcHQnLFxuICAgICAgJ3BwdHgnOiAncHB0JyxcbiAgICAgICdwcHMnOiAncHB0JyxcbiAgICAgICdwcHN4JzogJ3BwdCcsXG4gICAgICAnb2RwJzogJ3BwdCdcbiAgICB9O1xuXG4gICAgbGV0IGNodW5rcyA9IGlucHV0RmlsZW5hbWUuc3BsaXQoJy4nKTtcbiAgICBpZiAoY2h1bmtzLmxlbmd0aCA8IDIpIHtcbiAgICAgIHJldHVybiAnYXBwbGljYXRpb24nO1xuICAgIH1cbiAgICBsZXQgZXh0ZW5zaW9uID0gY2h1bmtzWyBjaHVua3MubGVuZ3RoIC0gMSBdLnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKHR5cGVzWyBleHRlbnNpb24gXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gJ2FwcGxpY2F0aW9uJztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHR5cGVzWyBleHRlbnNpb24gXTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==