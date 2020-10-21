/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ChangeDetectorRef, ChangeDetectionStrategy, NgZone } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageUtils } from './image.utils';
/**
 * @record
 */
function MoveStart() { }
if (false) {
    /** @type {?} */
    MoveStart.prototype.active;
    /** @type {?} */
    MoveStart.prototype.type;
    /** @type {?} */
    MoveStart.prototype.position;
    /** @type {?} */
    MoveStart.prototype.x1;
    /** @type {?} */
    MoveStart.prototype.y1;
    /** @type {?} */
    MoveStart.prototype.x2;
    /** @type {?} */
    MoveStart.prototype.y2;
    /** @type {?} */
    MoveStart.prototype.clientX;
    /** @type {?} */
    MoveStart.prototype.clientY;
}
/**
 * @record
 */
function Dimensions() { }
if (false) {
    /** @type {?} */
    Dimensions.prototype.width;
    /** @type {?} */
    Dimensions.prototype.height;
}
/**
 * @record
 */
export function CropperPosition() { }
if (false) {
    /** @type {?} */
    CropperPosition.prototype.x1;
    /** @type {?} */
    CropperPosition.prototype.y1;
    /** @type {?} */
    CropperPosition.prototype.x2;
    /** @type {?} */
    CropperPosition.prototype.y2;
}
/**
 * @record
 */
export function ImageCroppedEvent() { }
if (false) {
    /** @type {?|undefined} */
    ImageCroppedEvent.prototype.base64;
    /** @type {?|undefined} */
    ImageCroppedEvent.prototype.file;
    /** @type {?} */
    ImageCroppedEvent.prototype.width;
    /** @type {?} */
    ImageCroppedEvent.prototype.height;
    /** @type {?} */
    ImageCroppedEvent.prototype.cropperPosition;
}
var ImageCropperComponent = /** @class */ (function () {
    function ImageCropperComponent(elementRef, sanitizer, cd, zone) {
        this.elementRef = elementRef;
        this.sanitizer = sanitizer;
        this.cd = cd;
        this.zone = zone;
        this.marginLeft = '0px';
        this.imageVisible = false;
        this.format = 'png';
        this.outputType = 'both';
        this.maintainAspectRatio = true;
        this.aspectRatio = 1;
        this.resizeToWidth = 0;
        this.roundCropper = false;
        this.onlyScaleDown = false;
        this.imageQuality = 92;
        this.autoCrop = true;
        this.cropper = {
            x1: -100,
            y1: -100,
            x2: 10000,
            y2: 10000
        };
        this.imageCropped = new EventEmitter();
        this.imageCroppedBase64 = new EventEmitter();
        this.imageCroppedFile = new EventEmitter();
        this.imageLoaded = new EventEmitter();
        this.loadImageFailed = new EventEmitter();
        this.initCropper();
    }
    Object.defineProperty(ImageCropperComponent.prototype, "imageFileChanged", {
        set: /**
         * @param {?} file
         * @return {?}
         */
        function (file) {
            this.initCropper();
            if (file) {
                this.loadImageFile(file);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageCropperComponent.prototype, "imageChangedEvent", {
        set: /**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            this.initCropper();
            if (event && event.target && event.target.files && event.target.files.length > 0) {
                this.loadImageFile(event.target.files[0]);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageCropperComponent.prototype, "imageBase64", {
        set: /**
         * @param {?} imageBase64
         * @return {?}
         */
        function (imageBase64) {
            this.initCropper();
            this.loadBase64Image(imageBase64);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} changes
     * @return {?}
     */
    ImageCropperComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var _this = this;
        if (changes['cropper']) {
            setTimeout((/**
             * @return {?}
             */
            function () {
                _this.setMaxSize();
                _this.checkCropperPosition(false);
                _this.doAutoCrop();
                _this.cd.markForCheck();
            }));
        }
        if (changes['aspectRatio']) {
            this.resetCropperPosition();
        }
    };
    /**
     * @private
     * @return {?}
     */
    ImageCropperComponent.prototype.initCropper = /**
     * @private
     * @return {?}
     */
    function () {
        this.imageVisible = false;
        this.originalImage = null;
        this.safeImgDataUrl = 'data:image/png;base64,iVBORw0KGg'
            + 'oAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQYV2NgAAIAAAU'
            + 'AAarVyFEAAAAASUVORK5CYII=';
        this.moveStart = {
            active: false,
            type: null,
            position: null,
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 0,
            clientX: 0,
            clientY: 0
        };
        this.maxSize = {
            width: 0,
            height: 0
        };
        this.originalSize = {
            width: 0,
            height: 0
        };
        this.cropper.x1 = -100;
        this.cropper.y1 = -100;
        this.cropper.x2 = 10000;
        this.cropper.y2 = 10000;
    };
    /**
     * @private
     * @param {?} file
     * @return {?}
     */
    ImageCropperComponent.prototype.loadImageFile = /**
     * @private
     * @param {?} file
     * @return {?}
     */
    function (file) {
        var _this = this;
        /** @type {?} */
        var fileReader = new FileReader();
        fileReader.onload = (/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            /** @type {?} */
            var imageType = file.type;
            if (_this.isValidImageType(imageType)) {
                try {
                    _this.checkExifRotationAndLoadImage(event.target.result);
                }
                catch (e) {
                    _this.loadImageFailed.emit();
                }
            }
            else {
                _this.loadImageFailed.emit();
            }
        });
        fileReader.readAsDataURL(file);
    };
    /**
     * @private
     * @param {?} type
     * @return {?}
     */
    ImageCropperComponent.prototype.isValidImageType = /**
     * @private
     * @param {?} type
     * @return {?}
     */
    function (type) {
        return type === 'image/jpeg'
            || type === 'image/jpg'
            || type === 'image/png'
            || type === 'image/gif';
    };
    /**
     * @private
     * @param {?} imageBase64
     * @return {?}
     */
    ImageCropperComponent.prototype.checkExifRotationAndLoadImage = /**
     * @private
     * @param {?} imageBase64
     * @return {?}
     */
    function (imageBase64) {
        var _this = this;
        /** @type {?} */
        var exifRotation = ImageUtils.getOrientation(imageBase64);
        if (exifRotation > 1) {
            ImageUtils.resetOrientation(imageBase64, exifRotation, (/**
             * @param {?} rotatedBase64
             * @return {?}
             */
            function (rotatedBase64) { return _this.loadBase64Image(rotatedBase64); }));
        }
        else {
            this.loadBase64Image(imageBase64);
        }
    };
    /**
     * @private
     * @param {?} imageBase64
     * @return {?}
     */
    ImageCropperComponent.prototype.loadBase64Image = /**
     * @private
     * @param {?} imageBase64
     * @return {?}
     */
    function (imageBase64) {
        var _this = this;
        this.safeImgDataUrl = this.sanitizer.bypassSecurityTrustResourceUrl(imageBase64);
        this.originalImage = new Image();
        this.originalImage.onload = (/**
         * @return {?}
         */
        function () {
            _this.originalSize.width = _this.originalImage.width;
            _this.originalSize.height = _this.originalImage.height;
            _this.cd.markForCheck();
        });
        this.originalImage.src = imageBase64;
    };
    /**
     * @return {?}
     */
    ImageCropperComponent.prototype.imageLoadedInView = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.originalImage != null) {
            this.imageLoaded.emit();
            setTimeout((/**
             * @return {?}
             */
            function () {
                _this.setMaxSize();
                _this.resetCropperPosition();
                _this.cd.markForCheck();
            }));
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    ImageCropperComponent.prototype.onResize = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.resizeCropperPosition();
        this.setMaxSize();
    };
    /**
     * @private
     * @return {?}
     */
    ImageCropperComponent.prototype.resizeCropperPosition = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var displayedImage = this.elementRef.nativeElement.querySelector('.source-image');
        if (this.maxSize.width !== displayedImage.offsetWidth || this.maxSize.height !== displayedImage.offsetHeight) {
            this.cropper.x1 = this.cropper.x1 * displayedImage.offsetWidth / this.maxSize.width;
            this.cropper.x2 = this.cropper.x2 * displayedImage.offsetWidth / this.maxSize.width;
            this.cropper.y1 = this.cropper.y1 * displayedImage.offsetHeight / this.maxSize.height;
            this.cropper.y2 = this.cropper.y2 * displayedImage.offsetHeight / this.maxSize.height;
        }
    };
    /**
     * @private
     * @return {?}
     */
    ImageCropperComponent.prototype.resetCropperPosition = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var displayedImage = this.elementRef.nativeElement.querySelector('.source-image');
        if (displayedImage.offsetWidth / this.aspectRatio < displayedImage.offsetHeight) {
            this.cropper.x1 = 0;
            this.cropper.x2 = displayedImage.offsetWidth;
            /** @type {?} */
            var cropperHeight = displayedImage.offsetWidth / this.aspectRatio;
            this.cropper.y1 = (displayedImage.offsetHeight - cropperHeight) / 2;
            this.cropper.y2 = this.cropper.y1 + cropperHeight;
        }
        else {
            this.cropper.y1 = 0;
            this.cropper.y2 = displayedImage.offsetHeight;
            /** @type {?} */
            var cropperWidth = displayedImage.offsetHeight * this.aspectRatio;
            this.cropper.x1 = (displayedImage.offsetWidth - cropperWidth) / 2;
            this.cropper.x2 = this.cropper.x1 + cropperWidth;
        }
        this.doAutoCrop();
        this.imageVisible = true;
    };
    /**
     * @param {?} event
     * @param {?} moveType
     * @param {?=} position
     * @return {?}
     */
    ImageCropperComponent.prototype.startMove = /**
     * @param {?} event
     * @param {?} moveType
     * @param {?=} position
     * @return {?}
     */
    function (event, moveType, position) {
        if (position === void 0) { position = null; }
        this.moveStart = Object.assign({
            active: true,
            type: moveType,
            position: position,
            clientX: this.getClientX(event),
            clientY: this.getClientY(event)
        }, this.cropper);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    ImageCropperComponent.prototype.moveImg = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.moveStart.active) {
            event.stopPropagation();
            event.preventDefault();
            this.setMaxSize();
            if (this.moveStart.type === 'move') {
                this.move(event);
                this.checkCropperPosition(true);
            }
            else if (this.moveStart.type === 'resize') {
                this.resize(event);
                this.checkCropperPosition(false);
            }
            this.cd.detectChanges();
        }
    };
    /**
     * @private
     * @return {?}
     */
    ImageCropperComponent.prototype.setMaxSize = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var el = this.elementRef.nativeElement.querySelector('.source-image');
        this.maxSize.width = el.offsetWidth;
        this.maxSize.height = el.offsetHeight;
        this.marginLeft = this.sanitizer.bypassSecurityTrustStyle('calc(50% - ' + this.maxSize.width / 2 + 'px)');
    };
    /**
     * @private
     * @param {?=} maintainSize
     * @return {?}
     */
    ImageCropperComponent.prototype.checkCropperPosition = /**
     * @private
     * @param {?=} maintainSize
     * @return {?}
     */
    function (maintainSize) {
        if (maintainSize === void 0) { maintainSize = false; }
        if (this.cropper.x1 < 0) {
            this.cropper.x2 -= maintainSize ? this.cropper.x1 : 0;
            this.cropper.x1 = 0;
        }
        if (this.cropper.y1 < 0) {
            this.cropper.y2 -= maintainSize ? this.cropper.y1 : 0;
            this.cropper.y1 = 0;
        }
        if (this.cropper.x2 > this.maxSize.width) {
            this.cropper.x1 -= maintainSize ? (this.cropper.x2 - this.maxSize.width) : 0;
            this.cropper.x2 = this.maxSize.width;
        }
        if (this.cropper.y2 > this.maxSize.height) {
            this.cropper.y1 -= maintainSize ? (this.cropper.y2 - this.maxSize.height) : 0;
            this.cropper.y2 = this.maxSize.height;
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    ImageCropperComponent.prototype.moveStop = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.moveStart.active) {
            this.moveStart.active = false;
            this.doAutoCrop();
        }
    };
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    ImageCropperComponent.prototype.move = /**
     * @private
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var diffX = this.getClientX(event) - this.moveStart.clientX;
        /** @type {?} */
        var diffY = this.getClientY(event) - this.moveStart.clientY;
        this.cropper.x1 = this.moveStart.x1 + diffX;
        this.cropper.y1 = this.moveStart.y1 + diffY;
        this.cropper.x2 = this.moveStart.x2 + diffX;
        this.cropper.y2 = this.moveStart.y2 + diffY;
    };
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    ImageCropperComponent.prototype.resize = /**
     * @private
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var diffX = this.getClientX(event) - this.moveStart.clientX;
        /** @type {?} */
        var diffY = this.getClientY(event) - this.moveStart.clientY;
        switch (this.moveStart.position) {
            case 'left':
                this.cropper.x1 = Math.min(this.moveStart.x1 + diffX, this.cropper.x2 - 20);
                break;
            case 'topleft':
                this.cropper.x1 = Math.min(this.moveStart.x1 + diffX, this.cropper.x2 - 20);
                this.cropper.y1 = Math.min(this.moveStart.y1 + diffY, this.cropper.y2 - 20);
                break;
            case 'top':
                this.cropper.y1 = Math.min(this.moveStart.y1 + diffY, this.cropper.y2 - 20);
                break;
            case 'topright':
                this.cropper.x2 = Math.max(this.moveStart.x2 + diffX, this.cropper.x1 + 20);
                this.cropper.y1 = Math.min(this.moveStart.y1 + diffY, this.cropper.y2 - 20);
                break;
            case 'right':
                this.cropper.x2 = Math.max(this.moveStart.x2 + diffX, this.cropper.x1 + 20);
                break;
            case 'bottomright':
                this.cropper.x2 = Math.max(this.moveStart.x2 + diffX, this.cropper.x1 + 20);
                this.cropper.y2 = Math.max(this.moveStart.y2 + diffY, this.cropper.y1 + 20);
                break;
            case 'bottom':
                this.cropper.y2 = Math.max(this.moveStart.y2 + diffY, this.cropper.y1 + 20);
                break;
            case 'bottomleft':
                this.cropper.x1 = Math.min(this.moveStart.x1 + diffX, this.cropper.x2 - 20);
                this.cropper.y2 = Math.max(this.moveStart.y2 + diffY, this.cropper.y1 + 20);
                break;
        }
        if (this.maintainAspectRatio) {
            this.checkAspectRatio();
        }
    };
    /**
     * @private
     * @return {?}
     */
    ImageCropperComponent.prototype.checkAspectRatio = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var overflowX = 0;
        /** @type {?} */
        var overflowY = 0;
        switch (this.moveStart.position) {
            case 'top':
                this.cropper.x2 = this.cropper.x1 + (this.cropper.y2 - this.cropper.y1) * this.aspectRatio;
                overflowX = Math.max(this.cropper.x2 - this.maxSize.width, 0);
                overflowY = Math.max(0 - this.cropper.y1, 0);
                if (overflowX > 0 || overflowY > 0) {
                    this.cropper.x2 -= (overflowY * this.aspectRatio) > overflowX ? (overflowY * this.aspectRatio) : overflowX;
                    this.cropper.y1 += (overflowY * this.aspectRatio) > overflowX ? overflowY : overflowX / this.aspectRatio;
                }
                break;
            case 'bottom':
                this.cropper.x2 = this.cropper.x1 + (this.cropper.y2 - this.cropper.y1) * this.aspectRatio;
                overflowX = Math.max(this.cropper.x2 - this.maxSize.width, 0);
                overflowY = Math.max(this.cropper.y2 - this.maxSize.height, 0);
                if (overflowX > 0 || overflowY > 0) {
                    this.cropper.x2 -= (overflowY * this.aspectRatio) > overflowX ? (overflowY * this.aspectRatio) : overflowX;
                    this.cropper.y2 -= (overflowY * this.aspectRatio) > overflowX ? overflowY : (overflowX / this.aspectRatio);
                }
                break;
            case 'topleft':
                this.cropper.y1 = this.cropper.y2 - (this.cropper.x2 - this.cropper.x1) / this.aspectRatio;
                overflowX = Math.max(0 - this.cropper.x1, 0);
                overflowY = Math.max(0 - this.cropper.y1, 0);
                if (overflowX > 0 || overflowY > 0) {
                    this.cropper.x1 += (overflowY * this.aspectRatio) > overflowX ? (overflowY * this.aspectRatio) : overflowX;
                    this.cropper.y1 += (overflowY * this.aspectRatio) > overflowX ? overflowY : overflowX / this.aspectRatio;
                }
                break;
            case 'topright':
                this.cropper.y1 = this.cropper.y2 - (this.cropper.x2 - this.cropper.x1) / this.aspectRatio;
                overflowX = Math.max(this.cropper.x2 - this.maxSize.width, 0);
                overflowY = Math.max(0 - this.cropper.y1, 0);
                if (overflowX > 0 || overflowY > 0) {
                    this.cropper.x2 -= (overflowY * this.aspectRatio) > overflowX ? (overflowY * this.aspectRatio) : overflowX;
                    this.cropper.y1 += (overflowY * this.aspectRatio) > overflowX ? overflowY : overflowX / this.aspectRatio;
                }
                break;
            case 'right':
            case 'bottomright':
                this.cropper.y2 = this.cropper.y1 + (this.cropper.x2 - this.cropper.x1) / this.aspectRatio;
                overflowX = Math.max(this.cropper.x2 - this.maxSize.width, 0);
                overflowY = Math.max(this.cropper.y2 - this.maxSize.height, 0);
                if (overflowX > 0 || overflowY > 0) {
                    this.cropper.x2 -= (overflowY * this.aspectRatio) > overflowX ? (overflowY * this.aspectRatio) : overflowX;
                    this.cropper.y2 -= (overflowY * this.aspectRatio) > overflowX ? overflowY : overflowX / this.aspectRatio;
                }
                break;
            case 'left':
            case 'bottomleft':
                this.cropper.y2 = this.cropper.y1 + (this.cropper.x2 - this.cropper.x1) / this.aspectRatio;
                overflowX = Math.max(0 - this.cropper.x1, 0);
                overflowY = Math.max(this.cropper.y2 - this.maxSize.height, 0);
                if (overflowX > 0 || overflowY > 0) {
                    this.cropper.x1 += (overflowY * this.aspectRatio) > overflowX ? (overflowY * this.aspectRatio) : overflowX;
                    this.cropper.y2 -= (overflowY * this.aspectRatio) > overflowX ? overflowY : overflowX / this.aspectRatio;
                }
                break;
        }
    };
    /**
     * @private
     * @return {?}
     */
    ImageCropperComponent.prototype.doAutoCrop = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.autoCrop) {
            this.crop();
        }
    };
    /**
     * @return {?}
     */
    ImageCropperComponent.prototype.crop = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var displayedImage = this.elementRef.nativeElement.querySelector('.source-image');
        if (displayedImage && this.originalImage != null) {
            /** @type {?} */
            var ratio = this.originalSize.width / displayedImage.offsetWidth;
            /** @type {?} */
            var left = Math.round(this.cropper.x1 * ratio);
            /** @type {?} */
            var top_1 = Math.round(this.cropper.y1 * ratio);
            /** @type {?} */
            var width = Math.round((this.cropper.x2 - this.cropper.x1) * ratio);
            /** @type {?} */
            var height = Math.round((this.cropper.y2 - this.cropper.y1) * ratio);
            /** @type {?} */
            var resizeRatio = this.getResizeRatio(width);
            /** @type {?} */
            var resizedWidth = Math.floor(width * resizeRatio);
            /** @type {?} */
            var resizedHeight = Math.floor(height * resizeRatio);
            /** @type {?} */
            var cropCanvas = (/** @type {?} */ (document.createElement('canvas')));
            cropCanvas.width = resizedWidth;
            cropCanvas.height = resizedHeight;
            /** @type {?} */
            var ctx = cropCanvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(this.originalImage, left, top_1, width, height, 0, 0, width * resizeRatio, height * resizeRatio);
                this.cropToOutputType(cropCanvas, resizedWidth, resizedHeight);
            }
        }
    };
    /**
     * @private
     * @param {?} cropCanvas
     * @param {?} resizedWidth
     * @param {?} resizedHeight
     * @return {?}
     */
    ImageCropperComponent.prototype.cropToOutputType = /**
     * @private
     * @param {?} cropCanvas
     * @param {?} resizedWidth
     * @param {?} resizedHeight
     * @return {?}
     */
    function (cropCanvas, resizedWidth, resizedHeight) {
        var _this = this;
        /** @type {?} */
        var output = {
            width: resizedWidth,
            height: resizedHeight,
            cropperPosition: Object.assign({}, this.cropper)
        };
        switch (this.outputType) {
            case 'base64':
                output.base64 = this.cropToBase64(cropCanvas);
                this.imageCropped.emit(output);
                break;
            case 'file':
                this.cropToFile(cropCanvas)
                    .then((/**
                 * @param {?} result
                 * @return {?}
                 */
                function (result) {
                    output.file = result;
                    _this.imageCropped.emit(output);
                }));
                break;
            case 'both':
                output.base64 = this.cropToBase64(cropCanvas);
                this.cropToFile(cropCanvas)
                    .then((/**
                 * @param {?} result
                 * @return {?}
                 */
                function (result) {
                    output.file = result;
                    _this.imageCropped.emit(output);
                }));
                break;
        }
    };
    /**
     * @private
     * @param {?} cropCanvas
     * @return {?}
     */
    ImageCropperComponent.prototype.cropToBase64 = /**
     * @private
     * @param {?} cropCanvas
     * @return {?}
     */
    function (cropCanvas) {
        /** @type {?} */
        var imageBase64 = cropCanvas.toDataURL('image/' + this.format, this.getQuality());
        this.imageCroppedBase64.emit(imageBase64);
        return imageBase64;
    };
    /**
     * @private
     * @param {?} cropCanvas
     * @return {?}
     */
    ImageCropperComponent.prototype.cropToFile = /**
     * @private
     * @param {?} cropCanvas
     * @return {?}
     */
    function (cropCanvas) {
        var _this = this;
        return this.getCanvasBlob(cropCanvas)
            .then((/**
         * @param {?} result
         * @return {?}
         */
        function (result) {
            if (result) {
                _this.imageCroppedFile.emit(result);
            }
            return result;
        }));
    };
    /**
     * @private
     * @param {?} cropCanvas
     * @return {?}
     */
    ImageCropperComponent.prototype.getCanvasBlob = /**
     * @private
     * @param {?} cropCanvas
     * @return {?}
     */
    function (cropCanvas) {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        function (resolve) {
            cropCanvas.toBlob((/**
             * @param {?} result
             * @return {?}
             */
            function (result) { return _this.zone.run((/**
             * @return {?}
             */
            function () { return resolve(result); })); }), 'image/' + _this.format, _this.getQuality());
        }));
    };
    /**
     * @private
     * @return {?}
     */
    ImageCropperComponent.prototype.getQuality = /**
     * @private
     * @return {?}
     */
    function () {
        return Math.min(1, Math.max(0, this.imageQuality / 100));
    };
    /**
     * @private
     * @param {?} width
     * @return {?}
     */
    ImageCropperComponent.prototype.getResizeRatio = /**
     * @private
     * @param {?} width
     * @return {?}
     */
    function (width) {
        return this.resizeToWidth > 0 && (!this.onlyScaleDown || width > this.resizeToWidth)
            ? this.resizeToWidth / width
            : 1;
    };
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    ImageCropperComponent.prototype.getClientX = /**
     * @private
     * @param {?} event
     * @return {?}
     */
    function (event) {
        return event.clientX != null ? event.clientX : event.touches[0].clientX;
    };
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    ImageCropperComponent.prototype.getClientY = /**
     * @private
     * @param {?} event
     * @return {?}
     */
    function (event) {
        return event.clientY != null ? event.clientY : event.touches[0].clientY;
    };
    ImageCropperComponent.decorators = [
        { type: Component, args: [{
                    selector: 'image-cropper',
                    template: "<div>\n    <img\n        [src]=\"safeImgDataUrl\"\n        [style.visibility]=\"imageVisible ? 'visible' : 'hidden'\"\n        (load)=\"imageLoadedInView()\"\n        class=\"source-image\"\n    />\n    <div class=\"cropper\"\n         [class.rounded]=\"roundCropper\"\n         [style.top.px]=\"cropper.y1\"\n         [style.left.px]=\"cropper.x1\"\n         [style.width.px]=\"cropper.x2 - cropper.x1\"\n         [style.height.px]=\"cropper.y2 - cropper.y1\"\n         [style.margin-left]=\"marginLeft\"\n         [style.visibility]=\"imageVisible ? 'visible' : 'hidden'\"\n    >\n        <div\n            (mousedown)=\"startMove($event, 'move')\"\n            (touchstart)=\"startMove($event, 'move')\"\n            class=\"move\"\n        >&nbsp;</div>\n        <span\n            class=\"resize topleft\"\n            (mousedown)=\"startMove($event, 'resize', 'topleft')\"\n            (touchstart)=\"startMove($event, 'resize', 'topleft')\"\n        ><span class=\"square\"></span></span>\n        <span\n            class=\"resize top\"\n        ><span class=\"square\"></span></span>\n        <span\n            class=\"resize topright\"\n            (mousedown)=\"startMove($event, 'resize', 'topright')\"\n            (touchstart)=\"startMove($event, 'resize', 'topright')\"\n        ><span class=\"square\"></span></span>\n        <span\n            class=\"resize right\"\n        ><span class=\"square\"></span></span>\n        <span\n            class=\"resize bottomright\"\n            (mousedown)=\"startMove($event, 'resize', 'bottomright')\"\n            (touchstart)=\"startMove($event, 'resize', 'bottomright')\"\n        ><span class=\"square\"></span></span>\n        <span\n            class=\"resize bottom\"\n        ><span class=\"square\"></span></span>\n        <span\n            class=\"resize bottomleft\"\n            (mousedown)=\"startMove($event, 'resize', 'bottomleft')\"\n            (touchstart)=\"startMove($event, 'resize', 'bottomleft')\"\n        ><span class=\"square\"></span></span>\n        <span\n            class=\"resize left\"\n        ><span class=\"square\"></span></span>\n        <span\n            class=\"resize-bar top\"\n            (mousedown)=\"startMove($event, 'resize', 'top')\"\n            (touchstart)=\"startMove($event, 'resize', 'top')\"\n        ></span>\n        <span\n            class=\"resize-bar right\"\n            (mousedown)=\"startMove($event, 'resize', 'right')\"\n            (touchstart)=\"startMove($event, 'resize', 'right')\"\n        ></span>\n        <span\n            class=\"resize-bar bottom\"\n            (mousedown)=\"startMove($event, 'resize', 'bottom')\"\n            (touchstart)=\"startMove($event, 'resize', 'bottom')\"\n        ></span>\n        <span\n            class=\"resize-bar left\"\n            (mousedown)=\"startMove($event, 'resize', 'left')\"\n            (touchstart)=\"startMove($event, 'resize', 'left')\"\n        ></span>\n    </div>\n</div>\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [":host{display:flex;position:relative;width:100%;max-width:100%;max-height:400px;overflow:hidden;padding:5px;text-align:center;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}:host>div{position:relative;width:100%}:host>div .source-image{max-width:100%;max-height:100%;min-width:150px;min-height:150px}:host .cropper{position:absolute;display:flex;color:#53535c!important;background:0 0!important;touch-action:none;outline:rgba(255,255,255,.3) solid 1000px}:host .cropper:after{position:absolute;content:'';top:0;bottom:0;left:0;right:0;pointer-events:none;border:1px dashed;opacity:.75;color:inherit;z-index:1}:host .cropper .move{width:100%;cursor:move;border:1px solid rgba(255,255,255,.5)}:host .cropper .resize{position:absolute;display:inline-block;line-height:6px;padding:8px;opacity:.85;z-index:1}:host .cropper .resize .square{display:inline-block;background:#53535c!important;width:6px;height:6px;border:1px solid rgba(255,255,255,.5)}:host .cropper .resize.topleft{top:-12px;left:-12px;cursor:nw-resize}:host .cropper .resize.top{top:-12px;left:calc(50% - 12px);cursor:n-resize}:host .cropper .resize.topright{top:-12px;right:-12px;cursor:ne-resize}:host .cropper .resize.right{top:calc(50% - 12px);right:-12px;cursor:e-resize}:host .cropper .resize.bottomright{bottom:-12px;right:-12px;cursor:se-resize}:host .cropper .resize.bottom{bottom:-12px;left:calc(50% - 12px);cursor:s-resize}:host .cropper .resize.bottomleft{bottom:-12px;left:-12px;cursor:sw-resize}:host .cropper .resize.left{top:calc(50% - 12px);left:-12px;cursor:w-resize}:host .cropper .resize-bar{position:absolute;z-index:1}:host .cropper .resize-bar.top{top:-11px;left:11px;width:calc(100% - 22px);height:22px;cursor:n-resize}:host .cropper .resize-bar.right{top:11px;right:-11px;height:calc(100% - 22px);width:22px;cursor:e-resize}:host .cropper .resize-bar.bottom{bottom:-11px;left:11px;width:calc(100% - 22px);height:22px;cursor:s-resize}:host .cropper .resize-bar.left{top:11px;left:-11px;height:calc(100% - 22px);width:22px;cursor:w-resize}:host .cropper.rounded{outline-color:transparent}:host .cropper.rounded:after{box-shadow:0 0 0 100vw rgba(255,255,255,.3);border-radius:100%}:host .cropper.rounded .move{border-radius:100%}"]
                }] }
    ];
    /** @nocollapse */
    ImageCropperComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: DomSanitizer },
        { type: ChangeDetectorRef },
        { type: NgZone }
    ]; };
    ImageCropperComponent.propDecorators = {
        imageFileChanged: [{ type: Input }],
        imageChangedEvent: [{ type: Input }],
        imageBase64: [{ type: Input }],
        format: [{ type: Input }],
        outputType: [{ type: Input }],
        maintainAspectRatio: [{ type: Input }],
        aspectRatio: [{ type: Input }],
        resizeToWidth: [{ type: Input }],
        roundCropper: [{ type: Input }],
        onlyScaleDown: [{ type: Input }],
        imageQuality: [{ type: Input }],
        autoCrop: [{ type: Input }],
        cropper: [{ type: Input }],
        imageCropped: [{ type: Output }],
        imageCroppedBase64: [{ type: Output }],
        imageCroppedFile: [{ type: Output }],
        imageLoaded: [{ type: Output }],
        loadImageFailed: [{ type: Output }],
        onResize: [{ type: HostListener, args: ['window:resize', ['$event'],] }],
        moveImg: [{ type: HostListener, args: ['document:mousemove', ['$event'],] }, { type: HostListener, args: ['document:touchmove', ['$event'],] }],
        moveStop: [{ type: HostListener, args: ['document:mouseup', ['$event'],] }, { type: HostListener, args: ['document:touchend', ['$event'],] }]
    };
    return ImageCropperComponent;
}());
export { ImageCropperComponent };
if (false) {
    /**
     * @type {?}
     * @private
     */
    ImageCropperComponent.prototype.originalImage;
    /**
     * @type {?}
     * @private
     */
    ImageCropperComponent.prototype.moveStart;
    /**
     * @type {?}
     * @private
     */
    ImageCropperComponent.prototype.maxSize;
    /**
     * @type {?}
     * @private
     */
    ImageCropperComponent.prototype.originalSize;
    /** @type {?} */
    ImageCropperComponent.prototype.safeImgDataUrl;
    /** @type {?} */
    ImageCropperComponent.prototype.marginLeft;
    /** @type {?} */
    ImageCropperComponent.prototype.imageVisible;
    /** @type {?} */
    ImageCropperComponent.prototype.format;
    /** @type {?} */
    ImageCropperComponent.prototype.outputType;
    /** @type {?} */
    ImageCropperComponent.prototype.maintainAspectRatio;
    /** @type {?} */
    ImageCropperComponent.prototype.aspectRatio;
    /** @type {?} */
    ImageCropperComponent.prototype.resizeToWidth;
    /** @type {?} */
    ImageCropperComponent.prototype.roundCropper;
    /** @type {?} */
    ImageCropperComponent.prototype.onlyScaleDown;
    /** @type {?} */
    ImageCropperComponent.prototype.imageQuality;
    /** @type {?} */
    ImageCropperComponent.prototype.autoCrop;
    /** @type {?} */
    ImageCropperComponent.prototype.cropper;
    /** @type {?} */
    ImageCropperComponent.prototype.imageCropped;
    /** @type {?} */
    ImageCropperComponent.prototype.imageCroppedBase64;
    /** @type {?} */
    ImageCropperComponent.prototype.imageCroppedFile;
    /** @type {?} */
    ImageCropperComponent.prototype.imageLoaded;
    /** @type {?} */
    ImageCropperComponent.prototype.loadImageFailed;
    /**
     * @type {?}
     * @private
     */
    ImageCropperComponent.prototype.elementRef;
    /**
     * @type {?}
     * @private
     */
    ImageCropperComponent.prototype.sanitizer;
    /**
     * @type {?}
     * @private
     */
    ImageCropperComponent.prototype.cd;
    /**
     * @type {?}
     * @private
     */
    ImageCropperComponent.prototype.zone;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UtY3JvcHBlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbmV0LXVpLyIsInNvdXJjZXMiOlsic3JjL2ltYWdlLWNyb3BwZXIvaW1hZ2UtY3JvcHBlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDSCxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFhLE1BQU0sRUFDM0UsaUJBQWlCLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxFQUNyRCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsWUFBWSxFQUFxQixNQUFNLDJCQUEyQixDQUFDO0FBQzNFLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7Ozs7QUFFekMsd0JBVUM7OztJQVRHLDJCQUFnQjs7SUFDaEIseUJBQW9COztJQUNwQiw2QkFBd0I7O0lBQ3hCLHVCQUFXOztJQUNYLHVCQUFXOztJQUNYLHVCQUFXOztJQUNYLHVCQUFXOztJQUNYLDRCQUFnQjs7SUFDaEIsNEJBQWdCOzs7OztBQUdwQix5QkFHQzs7O0lBRkcsMkJBQWM7O0lBQ2QsNEJBQWU7Ozs7O0FBR25CLHFDQUtDOzs7SUFKRyw2QkFBVzs7SUFDWCw2QkFBVzs7SUFDWCw2QkFBVzs7SUFDWCw2QkFBVzs7Ozs7QUFHZix1Q0FNQzs7O0lBTEcsbUNBQXVCOztJQUN2QixpQ0FBbUI7O0lBQ25CLGtDQUFjOztJQUNkLG1DQUFlOztJQUNmLDRDQUFpQzs7QUFHckM7SUE0REksK0JBQW9CLFVBQXNCLEVBQ3RCLFNBQXVCLEVBQ3ZCLEVBQXFCLEVBQ3JCLElBQVk7UUFIWixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLGNBQVMsR0FBVCxTQUFTLENBQWM7UUFDdkIsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUFDckIsU0FBSSxHQUFKLElBQUksQ0FBUTtRQWxEaEMsZUFBVSxHQUF1QixLQUFLLENBQUM7UUFDdkMsaUJBQVksR0FBRyxLQUFLLENBQUM7UUF3QlosV0FBTSxHQUE0QyxLQUFLLENBQUM7UUFDeEQsZUFBVSxHQUErQixNQUFNLENBQUM7UUFDaEQsd0JBQW1CLEdBQUcsSUFBSSxDQUFDO1FBQzNCLGdCQUFXLEdBQUcsQ0FBQyxDQUFDO1FBQ2hCLGtCQUFhLEdBQUcsQ0FBQyxDQUFDO1FBQ2xCLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLGtCQUFhLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLGlCQUFZLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLGFBQVEsR0FBRyxJQUFJLENBQUM7UUFDaEIsWUFBTyxHQUFvQjtZQUNoQyxFQUFFLEVBQUUsQ0FBQyxHQUFHO1lBQ1IsRUFBRSxFQUFFLENBQUMsR0FBRztZQUNSLEVBQUUsRUFBRSxLQUFLO1lBQ1QsRUFBRSxFQUFFLEtBQUs7U0FDWixDQUFDO1FBRVEsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBcUIsQ0FBQztRQUNyRCx1QkFBa0IsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO1FBQ2hELHFCQUFnQixHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7UUFDNUMsZ0JBQVcsR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO1FBQ3ZDLG9CQUFlLEdBQUcsSUFBSSxZQUFZLEVBQVEsQ0FBQztRQU1qRCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQWpERCxzQkFDSSxtREFBZ0I7Ozs7O1FBRHBCLFVBQ3FCLElBQVU7WUFDM0IsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ25CLElBQUksSUFBSSxFQUFFO2dCQUNOLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDNUI7UUFDTCxDQUFDOzs7T0FBQTtJQUVELHNCQUNJLG9EQUFpQjs7Ozs7UUFEckIsVUFDc0IsS0FBVTtZQUM1QixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDbkIsSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUM5RSxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDN0M7UUFDTCxDQUFDOzs7T0FBQTtJQUVELHNCQUNJLDhDQUFXOzs7OztRQURmLFVBQ2dCLFdBQW1CO1lBQy9CLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNuQixJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3RDLENBQUM7OztPQUFBOzs7OztJQStCRCwyQ0FBVzs7OztJQUFYLFVBQVksT0FBc0I7UUFBbEMsaUJBWUM7UUFYRyxJQUFJLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUNwQixVQUFVOzs7WUFBQztnQkFDUCxLQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7Z0JBQ2xCLEtBQUksQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDakMsS0FBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO2dCQUNsQixLQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQzNCLENBQUMsRUFBQyxDQUFDO1NBQ047UUFDRCxJQUFJLE9BQU8sQ0FBQyxhQUFhLENBQUMsRUFBRTtZQUN4QixJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztTQUMvQjtJQUNMLENBQUM7Ozs7O0lBRU8sMkNBQVc7Ozs7SUFBbkI7UUFDSSxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztRQUMxQixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztRQUMxQixJQUFJLENBQUMsY0FBYyxHQUFHLGtDQUFrQztjQUNsRCwyREFBMkQ7Y0FDM0QsMkJBQTJCLENBQUM7UUFDbEMsSUFBSSxDQUFDLFNBQVMsR0FBRztZQUNiLE1BQU0sRUFBRSxLQUFLO1lBQ2IsSUFBSSxFQUFFLElBQUk7WUFDVixRQUFRLEVBQUUsSUFBSTtZQUNkLEVBQUUsRUFBRSxDQUFDO1lBQ0wsRUFBRSxFQUFFLENBQUM7WUFDTCxFQUFFLEVBQUUsQ0FBQztZQUNMLEVBQUUsRUFBRSxDQUFDO1lBQ0wsT0FBTyxFQUFFLENBQUM7WUFDVixPQUFPLEVBQUUsQ0FBQztTQUNiLENBQUM7UUFDRixJQUFJLENBQUMsT0FBTyxHQUFHO1lBQ1gsS0FBSyxFQUFFLENBQUM7WUFDUixNQUFNLEVBQUUsQ0FBQztTQUNaLENBQUM7UUFDRixJQUFJLENBQUMsWUFBWSxHQUFHO1lBQ2hCLEtBQUssRUFBRSxDQUFDO1lBQ1IsTUFBTSxFQUFFLENBQUM7U0FDWixDQUFDO1FBQ0YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUM7UUFDdkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUM7UUFDdkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQztJQUM1QixDQUFDOzs7Ozs7SUFFTyw2Q0FBYTs7Ozs7SUFBckIsVUFBc0IsSUFBVTtRQUFoQyxpQkFlQzs7WUFkUyxVQUFVLEdBQUcsSUFBSSxVQUFVLEVBQUU7UUFDbkMsVUFBVSxDQUFDLE1BQU07Ozs7UUFBRyxVQUFDLEtBQVU7O2dCQUNyQixTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUk7WUFDM0IsSUFBSSxLQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLEVBQUU7Z0JBQ2xDLElBQUk7b0JBQ0EsS0FBSSxDQUFDLDZCQUE2QixDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7aUJBQzNEO2dCQUFDLE9BQU8sQ0FBQyxFQUFFO29CQUNSLEtBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLENBQUM7aUJBQy9CO2FBQ0o7aUJBQU07Z0JBQ0gsS0FBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUMvQjtRQUNMLENBQUMsQ0FBQSxDQUFDO1FBQ0YsVUFBVSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNuQyxDQUFDOzs7Ozs7SUFFTyxnREFBZ0I7Ozs7O0lBQXhCLFVBQXlCLElBQVk7UUFDakMsT0FBTyxJQUFJLEtBQUssWUFBWTtlQUNyQixJQUFJLEtBQUssV0FBVztlQUNwQixJQUFJLEtBQUssV0FBVztlQUNwQixJQUFJLEtBQUssV0FBVyxDQUFBO0lBQy9CLENBQUM7Ozs7OztJQUVPLDZEQUE2Qjs7Ozs7SUFBckMsVUFBc0MsV0FBbUI7UUFBekQsaUJBV0M7O1lBVlMsWUFBWSxHQUFHLFVBQVUsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDO1FBQzNELElBQUksWUFBWSxHQUFHLENBQUMsRUFBRTtZQUNsQixVQUFVLENBQUMsZ0JBQWdCLENBQ3ZCLFdBQVcsRUFDWCxZQUFZOzs7O1lBQ1osVUFBQyxhQUFxQixJQUFLLE9BQUEsS0FBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsRUFBbkMsQ0FBbUMsRUFDakUsQ0FBQztTQUNMO2FBQU07WUFDSCxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQ3JDO0lBQ0wsQ0FBQzs7Ozs7O0lBRU8sK0NBQWU7Ozs7O0lBQXZCLFVBQXdCLFdBQW1CO1FBQTNDLGlCQVNDO1FBUkcsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLDhCQUE4QixDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2pGLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQztRQUNqQyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU07OztRQUFHO1lBQ3hCLEtBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxHQUFHLEtBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDO1lBQ25ELEtBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLEtBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDO1lBQ3JELEtBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDM0IsQ0FBQyxDQUFBLENBQUM7UUFDRixJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsR0FBRyxXQUFXLENBQUM7SUFDekMsQ0FBQzs7OztJQUVELGlEQUFpQjs7O0lBQWpCO1FBQUEsaUJBU0M7UUFSRyxJQUFJLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxFQUFFO1lBQzVCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDeEIsVUFBVTs7O1lBQUM7Z0JBQ1AsS0FBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO2dCQUNsQixLQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztnQkFDNUIsS0FBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUMzQixDQUFDLEVBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQzs7Ozs7SUFHRCx3Q0FBUTs7OztJQURSLFVBQ1MsS0FBWTtRQUNqQixJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUM3QixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDdEIsQ0FBQzs7Ozs7SUFFTyxxREFBcUI7Ozs7SUFBN0I7O1lBQ1UsY0FBYyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUM7UUFDbkYsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssS0FBSyxjQUFjLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxLQUFLLGNBQWMsQ0FBQyxZQUFZLEVBQUU7WUFDMUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUcsY0FBYyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztZQUNwRixJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRyxjQUFjLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1lBQ3BGLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxHQUFHLGNBQWMsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7WUFDdEYsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUcsY0FBYyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztTQUN6RjtJQUNMLENBQUM7Ozs7O0lBRU8sb0RBQW9COzs7O0lBQTVCOztZQUNVLGNBQWMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDO1FBQ25GLElBQUksY0FBYyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxHQUFHLGNBQWMsQ0FBQyxZQUFZLEVBQUU7WUFDN0UsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxHQUFHLGNBQWMsQ0FBQyxXQUFXLENBQUM7O2dCQUN2QyxhQUFhLEdBQUcsY0FBYyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVztZQUNuRSxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRyxDQUFDLGNBQWMsQ0FBQyxZQUFZLEdBQUcsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3BFLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxHQUFHLGFBQWEsQ0FBQztTQUNyRDthQUFNO1lBQ0gsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxHQUFHLGNBQWMsQ0FBQyxZQUFZLENBQUM7O2dCQUN4QyxZQUFZLEdBQUcsY0FBYyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsV0FBVztZQUNuRSxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRyxDQUFDLGNBQWMsQ0FBQyxXQUFXLEdBQUcsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2xFLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxHQUFHLFlBQVksQ0FBQztTQUNwRDtRQUNELElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztJQUM3QixDQUFDOzs7Ozs7O0lBRUQseUNBQVM7Ozs7OztJQUFULFVBQVUsS0FBVSxFQUFFLFFBQWdCLEVBQUUsUUFBOEI7UUFBOUIseUJBQUEsRUFBQSxlQUE4QjtRQUNsRSxJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7WUFDM0IsTUFBTSxFQUFFLElBQUk7WUFDWixJQUFJLEVBQUUsUUFBUTtZQUNkLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLE9BQU8sRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQztZQUMvQixPQUFPLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUM7U0FDbEMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDckIsQ0FBQzs7Ozs7SUFJRCx1Q0FBTzs7OztJQUZQLFVBRVEsS0FBVTtRQUNkLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUU7WUFDdkIsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQ3hCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN2QixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDbEIsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksS0FBSyxNQUFNLEVBQUU7Z0JBQ2hDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2pCLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNuQztpQkFBTSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBRTtnQkFDekMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDbkIsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3BDO1lBQ0QsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUMzQjtJQUNMLENBQUM7Ozs7O0lBRU8sMENBQVU7Ozs7SUFBbEI7O1lBQ1UsRUFBRSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUM7UUFDdkUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQztRQUNwQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyx3QkFBd0IsQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDO0lBQzlHLENBQUM7Ozs7OztJQUVPLG9EQUFvQjs7Ozs7SUFBNUIsVUFBNkIsWUFBb0I7UUFBcEIsNkJBQUEsRUFBQSxvQkFBb0I7UUFDN0MsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUU7WUFDckIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLElBQUksWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RELElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztTQUN2QjtRQUNELElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFO1lBQ3JCLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxJQUFJLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0RCxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDdkI7UUFDRCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFO1lBQ3RDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxJQUFJLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0UsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7U0FDeEM7UUFDRCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFO1lBQ3ZDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxJQUFJLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDOUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7U0FDekM7SUFDTCxDQUFDOzs7OztJQUlELHdDQUFROzs7O0lBRlIsVUFFUyxLQUFVO1FBQ2YsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtZQUN2QixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDOUIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQ3JCO0lBQ0wsQ0FBQzs7Ozs7O0lBRU8sb0NBQUk7Ozs7O0lBQVosVUFBYSxLQUFVOztZQUNiLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTzs7WUFDdkQsS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPO1FBRTdELElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQztRQUM1QyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsR0FBRyxLQUFLLENBQUM7UUFDNUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEdBQUcsS0FBSyxDQUFDO1FBQzVDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQztJQUNoRCxDQUFDOzs7Ozs7SUFFTyxzQ0FBTTs7Ozs7SUFBZCxVQUFlLEtBQVU7O1lBQ2YsS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPOztZQUN2RCxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU87UUFDN0QsUUFBUSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRTtZQUM3QixLQUFLLE1BQU07Z0JBQ1AsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsR0FBRyxLQUFLLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7Z0JBQzVFLE1BQU07WUFDVixLQUFLLFNBQVM7Z0JBQ1YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsR0FBRyxLQUFLLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7Z0JBQzVFLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEdBQUcsS0FBSyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO2dCQUM1RSxNQUFNO1lBQ1YsS0FBSyxLQUFLO2dCQUNOLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEdBQUcsS0FBSyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO2dCQUM1RSxNQUFNO1lBQ1YsS0FBSyxVQUFVO2dCQUNYLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEdBQUcsS0FBSyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO2dCQUM1RSxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxHQUFHLEtBQUssRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztnQkFDNUUsTUFBTTtZQUNWLEtBQUssT0FBTztnQkFDUixJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxHQUFHLEtBQUssRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztnQkFDNUUsTUFBTTtZQUNWLEtBQUssYUFBYTtn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Qzs7SUFDakMsMkNBQXVDOztJQUN2Qyw2Q0FBcUI7O0lBd0JyQix1Q0FBaUU7O0lBQ2pFLDJDQUF5RDs7SUFDekQsb0RBQW9DOztJQUNwQyw0Q0FBeUI7O0lBQ3pCLDhDQUEyQjs7SUFDM0IsNkNBQThCOztJQUM5Qiw4Q0FBK0I7O0lBQy9CLDZDQUEyQjs7SUFDM0IseUNBQXlCOztJQUN6Qix3Q0FLRTs7SUFFRiw2Q0FBK0Q7O0lBQy9ELG1EQUEwRDs7SUFDMUQsaURBQXNEOztJQUN0RCw0Q0FBaUQ7O0lBQ2pELGdEQUFxRDs7Ozs7SUFFekMsMkNBQThCOzs7OztJQUM5QiwwQ0FBK0I7Ozs7O0lBQy9CLG1DQUE2Qjs7Ozs7SUFDN0IscUNBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPdXRwdXQsIFNpbXBsZUNoYW5nZXMsXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBOZ1pvbmVcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0RvbVNhbml0aXplciwgU2FmZVVybCwgU2FmZVN0eWxlfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7SW1hZ2VVdGlsc30gZnJvbSAnLi9pbWFnZS51dGlscyc7XG5cbmludGVyZmFjZSBNb3ZlU3RhcnQge1xuICAgIGFjdGl2ZTogYm9vbGVhbjtcbiAgICB0eXBlOiBzdHJpbmcgfCBudWxsO1xuICAgIHBvc2l0aW9uOiBzdHJpbmcgfCBudWxsO1xuICAgIHgxOiBudW1iZXI7XG4gICAgeTE6IG51bWJlcjtcbiAgICB4MjogbnVtYmVyO1xuICAgIHkyOiBudW1iZXI7XG4gICAgY2xpZW50WDogbnVtYmVyO1xuICAgIGNsaWVudFk6IG51bWJlcjtcbn1cblxuaW50ZXJmYWNlIERpbWVuc2lvbnMge1xuICAgIHdpZHRoOiBudW1iZXI7XG4gICAgaGVpZ2h0OiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ3JvcHBlclBvc2l0aW9uIHtcbiAgICB4MTogbnVtYmVyO1xuICAgIHkxOiBudW1iZXI7XG4gICAgeDI6IG51bWJlcjtcbiAgICB5MjogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEltYWdlQ3JvcHBlZEV2ZW50IHtcbiAgICBiYXNlNjQ/OiBzdHJpbmcgfCBudWxsO1xuICAgIGZpbGU/OiBCbG9iIHwgbnVsbDtcbiAgICB3aWR0aDogbnVtYmVyO1xuICAgIGhlaWdodDogbnVtYmVyO1xuICAgIGNyb3BwZXJQb3NpdGlvbjogQ3JvcHBlclBvc2l0aW9uO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2ltYWdlLWNyb3BwZXInLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9pbWFnZS1jcm9wcGVyLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9pbWFnZS1jcm9wcGVyLmNvbXBvbmVudC5jc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBJbWFnZUNyb3BwZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICAgIHByaXZhdGUgb3JpZ2luYWxJbWFnZTogYW55O1xuICAgIHByaXZhdGUgbW92ZVN0YXJ0OiBNb3ZlU3RhcnQ7XG4gICAgcHJpdmF0ZSBtYXhTaXplOiBEaW1lbnNpb25zO1xuICAgIHByaXZhdGUgb3JpZ2luYWxTaXplOiBEaW1lbnNpb25zO1xuXG4gICAgc2FmZUltZ0RhdGFVcmw6IFNhZmVVcmwgfCBzdHJpbmc7XG4gICAgbWFyZ2luTGVmdDogU2FmZVN0eWxlIHwgc3RyaW5nID0gJzBweCc7XG4gICAgaW1hZ2VWaXNpYmxlID0gZmFsc2U7XG5cbiAgICBASW5wdXQoKVxuICAgIHNldCBpbWFnZUZpbGVDaGFuZ2VkKGZpbGU6IEZpbGUpIHtcbiAgICAgICAgdGhpcy5pbml0Q3JvcHBlcigpO1xuICAgICAgICBpZiAoZmlsZSkge1xuICAgICAgICAgICAgdGhpcy5sb2FkSW1hZ2VGaWxlKGZpbGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBzZXQgaW1hZ2VDaGFuZ2VkRXZlbnQoZXZlbnQ6IGFueSkge1xuICAgICAgICB0aGlzLmluaXRDcm9wcGVyKCk7XG4gICAgICAgIGlmIChldmVudCAmJiBldmVudC50YXJnZXQgJiYgZXZlbnQudGFyZ2V0LmZpbGVzICYmIGV2ZW50LnRhcmdldC5maWxlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLmxvYWRJbWFnZUZpbGUoZXZlbnQudGFyZ2V0LmZpbGVzWzBdKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IGltYWdlQmFzZTY0KGltYWdlQmFzZTY0OiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5pbml0Q3JvcHBlcigpO1xuICAgICAgICB0aGlzLmxvYWRCYXNlNjRJbWFnZShpbWFnZUJhc2U2NCk7XG4gICAgfVxuXG4gICAgQElucHV0KCkgZm9ybWF0OiAncG5nJyB8ICdqcGVnJyB8ICdibXAnIHwgJ3dlYnAnIHwgJ2ljbycgPSAncG5nJztcbiAgICBASW5wdXQoKSBvdXRwdXRUeXBlOiAnYmFzZTY0JyB8ICdmaWxlJyB8ICdib3RoJyA9ICdib3RoJztcbiAgICBASW5wdXQoKSBtYWludGFpbkFzcGVjdFJhdGlvID0gdHJ1ZTtcbiAgICBASW5wdXQoKSBhc3BlY3RSYXRpbyA9IDE7XG4gICAgQElucHV0KCkgcmVzaXplVG9XaWR0aCA9IDA7XG4gICAgQElucHV0KCkgcm91bmRDcm9wcGVyID0gZmFsc2U7XG4gICAgQElucHV0KCkgb25seVNjYWxlRG93biA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIGltYWdlUXVhbGl0eSA9IDkyO1xuICAgIEBJbnB1dCgpIGF1dG9Dcm9wID0gdHJ1ZTtcbiAgICBASW5wdXQoKSBjcm9wcGVyOiBDcm9wcGVyUG9zaXRpb24gPSB7XG4gICAgICAgIHgxOiAtMTAwLFxuICAgICAgICB5MTogLTEwMCxcbiAgICAgICAgeDI6IDEwMDAwLFxuICAgICAgICB5MjogMTAwMDBcbiAgICB9O1xuXG4gICAgQE91dHB1dCgpIGltYWdlQ3JvcHBlZCA9IG5ldyBFdmVudEVtaXR0ZXI8SW1hZ2VDcm9wcGVkRXZlbnQ+KCk7XG4gICAgQE91dHB1dCgpIGltYWdlQ3JvcHBlZEJhc2U2NCA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuICAgIEBPdXRwdXQoKSBpbWFnZUNyb3BwZWRGaWxlID0gbmV3IEV2ZW50RW1pdHRlcjxCbG9iPigpO1xuICAgIEBPdXRwdXQoKSBpbWFnZUxvYWRlZCA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgICBAT3V0cHV0KCkgbG9hZEltYWdlRmFpbGVkID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgc2FuaXRpemVyOiBEb21TYW5pdGl6ZXIsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSB6b25lOiBOZ1pvbmUpIHtcbiAgICAgICAgdGhpcy5pbml0Q3JvcHBlcigpO1xuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICAgICAgaWYgKGNoYW5nZXNbJ2Nyb3BwZXInXSkge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRNYXhTaXplKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja0Nyb3BwZXJQb3NpdGlvbihmYWxzZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5kb0F1dG9Dcm9wKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjaGFuZ2VzWydhc3BlY3RSYXRpbyddKSB7XG4gICAgICAgICAgICB0aGlzLnJlc2V0Q3JvcHBlclBvc2l0aW9uKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXRDcm9wcGVyKCkge1xuICAgICAgICB0aGlzLmltYWdlVmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLm9yaWdpbmFsSW1hZ2UgPSBudWxsO1xuICAgICAgICB0aGlzLnNhZmVJbWdEYXRhVXJsID0gJ2RhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnJ1xuICAgICAgICAgICAgKyAnb0FBQUFOU1VoRVVnQUFBQUVBQUFBQkNBWUFBQUFmRmNTSkFBQUFDMGxFUVZRWVYyTmdBQUlBQUFVJ1xuICAgICAgICAgICAgKyAnQUFhclZ5RkVBQUFBQVNVVk9SSzVDWUlJPSc7XG4gICAgICAgIHRoaXMubW92ZVN0YXJ0ID0ge1xuICAgICAgICAgICAgYWN0aXZlOiBmYWxzZSxcbiAgICAgICAgICAgIHR5cGU6IG51bGwsXG4gICAgICAgICAgICBwb3NpdGlvbjogbnVsbCxcbiAgICAgICAgICAgIHgxOiAwLFxuICAgICAgICAgICAgeTE6IDAsXG4gICAgICAgICAgICB4MjogMCxcbiAgICAgICAgICAgIHkyOiAwLFxuICAgICAgICAgICAgY2xpZW50WDogMCxcbiAgICAgICAgICAgIGNsaWVudFk6IDBcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5tYXhTaXplID0ge1xuICAgICAgICAgICAgd2lkdGg6IDAsXG4gICAgICAgICAgICBoZWlnaHQ6IDBcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5vcmlnaW5hbFNpemUgPSB7XG4gICAgICAgICAgICB3aWR0aDogMCxcbiAgICAgICAgICAgIGhlaWdodDogMFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmNyb3BwZXIueDEgPSAtMTAwO1xuICAgICAgICB0aGlzLmNyb3BwZXIueTEgPSAtMTAwO1xuICAgICAgICB0aGlzLmNyb3BwZXIueDIgPSAxMDAwMDtcbiAgICAgICAgdGhpcy5jcm9wcGVyLnkyID0gMTAwMDA7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBsb2FkSW1hZ2VGaWxlKGZpbGU6IEZpbGUpIHtcbiAgICAgICAgY29uc3QgZmlsZVJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgICAgIGZpbGVSZWFkZXIub25sb2FkID0gKGV2ZW50OiBhbnkpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGltYWdlVHlwZSA9IGZpbGUudHlwZTtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzVmFsaWRJbWFnZVR5cGUoaW1hZ2VUeXBlKSkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tFeGlmUm90YXRpb25BbmRMb2FkSW1hZ2UoZXZlbnQudGFyZ2V0LnJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRJbWFnZUZhaWxlZC5lbWl0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRJbWFnZUZhaWxlZC5lbWl0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGZpbGVSZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGlzVmFsaWRJbWFnZVR5cGUodHlwZTogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0eXBlID09PSAnaW1hZ2UvanBlZydcbiAgICAgICAgICAgIHx8IHR5cGUgPT09ICdpbWFnZS9qcGcnXG4gICAgICAgICAgICB8fCB0eXBlID09PSAnaW1hZ2UvcG5nJ1xuICAgICAgICAgICAgfHwgdHlwZSA9PT0gJ2ltYWdlL2dpZidcbiAgICB9XG5cbiAgICBwcml2YXRlIGNoZWNrRXhpZlJvdGF0aW9uQW5kTG9hZEltYWdlKGltYWdlQmFzZTY0OiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgZXhpZlJvdGF0aW9uID0gSW1hZ2VVdGlscy5nZXRPcmllbnRhdGlvbihpbWFnZUJhc2U2NCk7XG4gICAgICAgIGlmIChleGlmUm90YXRpb24gPiAxKSB7XG4gICAgICAgICAgICBJbWFnZVV0aWxzLnJlc2V0T3JpZW50YXRpb24oXG4gICAgICAgICAgICAgICAgaW1hZ2VCYXNlNjQsXG4gICAgICAgICAgICAgICAgZXhpZlJvdGF0aW9uLFxuICAgICAgICAgICAgICAgIChyb3RhdGVkQmFzZTY0OiBzdHJpbmcpID0+IHRoaXMubG9hZEJhc2U2NEltYWdlKHJvdGF0ZWRCYXNlNjQpXG4gICAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5sb2FkQmFzZTY0SW1hZ2UoaW1hZ2VCYXNlNjQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBsb2FkQmFzZTY0SW1hZ2UoaW1hZ2VCYXNlNjQ6IHN0cmluZykge1xuICAgICAgICB0aGlzLnNhZmVJbWdEYXRhVXJsID0gdGhpcy5zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFJlc291cmNlVXJsKGltYWdlQmFzZTY0KTtcbiAgICAgICAgdGhpcy5vcmlnaW5hbEltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgICAgIHRoaXMub3JpZ2luYWxJbWFnZS5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm9yaWdpbmFsU2l6ZS53aWR0aCA9IHRoaXMub3JpZ2luYWxJbWFnZS53aWR0aDtcbiAgICAgICAgICAgIHRoaXMub3JpZ2luYWxTaXplLmhlaWdodCA9IHRoaXMub3JpZ2luYWxJbWFnZS5oZWlnaHQ7XG4gICAgICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLm9yaWdpbmFsSW1hZ2Uuc3JjID0gaW1hZ2VCYXNlNjQ7XG4gICAgfVxuXG4gICAgaW1hZ2VMb2FkZWRJblZpZXcoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLm9yaWdpbmFsSW1hZ2UgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5pbWFnZUxvYWRlZC5lbWl0KCk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldE1heFNpemUoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2V0Q3JvcHBlclBvc2l0aW9uKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcignd2luZG93OnJlc2l6ZScsIFsnJGV2ZW50J10pXG4gICAgb25SZXNpemUoZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIHRoaXMucmVzaXplQ3JvcHBlclBvc2l0aW9uKCk7XG4gICAgICAgIHRoaXMuc2V0TWF4U2l6ZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVzaXplQ3JvcHBlclBvc2l0aW9uKCkge1xuICAgICAgICBjb25zdCBkaXNwbGF5ZWRJbWFnZSA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zb3VyY2UtaW1hZ2UnKTtcbiAgICAgICAgaWYgKHRoaXMubWF4U2l6ZS53aWR0aCAhPT0gZGlzcGxheWVkSW1hZ2Uub2Zmc2V0V2lkdGggfHwgdGhpcy5tYXhTaXplLmhlaWdodCAhPT0gZGlzcGxheWVkSW1hZ2Uub2Zmc2V0SGVpZ2h0KSB7XG4gICAgICAgICAgICB0aGlzLmNyb3BwZXIueDEgPSB0aGlzLmNyb3BwZXIueDEgKiBkaXNwbGF5ZWRJbWFnZS5vZmZzZXRXaWR0aCAvIHRoaXMubWF4U2l6ZS53aWR0aDtcbiAgICAgICAgICAgIHRoaXMuY3JvcHBlci54MiA9IHRoaXMuY3JvcHBlci54MiAqIGRpc3BsYXllZEltYWdlLm9mZnNldFdpZHRoIC8gdGhpcy5tYXhTaXplLndpZHRoO1xuICAgICAgICAgICAgdGhpcy5jcm9wcGVyLnkxID0gdGhpcy5jcm9wcGVyLnkxICogZGlzcGxheWVkSW1hZ2Uub2Zmc2V0SGVpZ2h0IC8gdGhpcy5tYXhTaXplLmhlaWdodDtcbiAgICAgICAgICAgIHRoaXMuY3JvcHBlci55MiA9IHRoaXMuY3JvcHBlci55MiAqIGRpc3BsYXllZEltYWdlLm9mZnNldEhlaWdodCAvIHRoaXMubWF4U2l6ZS5oZWlnaHQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHJlc2V0Q3JvcHBlclBvc2l0aW9uKCkge1xuICAgICAgICBjb25zdCBkaXNwbGF5ZWRJbWFnZSA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zb3VyY2UtaW1hZ2UnKTtcbiAgICAgICAgaWYgKGRpc3BsYXllZEltYWdlLm9mZnNldFdpZHRoIC8gdGhpcy5hc3BlY3RSYXRpbyA8IGRpc3BsYXllZEltYWdlLm9mZnNldEhlaWdodCkge1xuICAgICAgICAgICAgdGhpcy5jcm9wcGVyLngxID0gMDtcbiAgICAgICAgICAgIHRoaXMuY3JvcHBlci54MiA9IGRpc3BsYXllZEltYWdlLm9mZnNldFdpZHRoO1xuICAgICAgICAgICAgY29uc3QgY3JvcHBlckhlaWdodCA9IGRpc3BsYXllZEltYWdlLm9mZnNldFdpZHRoIC8gdGhpcy5hc3BlY3RSYXRpbztcbiAgICAgICAgICAgIHRoaXMuY3JvcHBlci55MSA9IChkaXNwbGF5ZWRJbWFnZS5vZmZzZXRIZWlnaHQgLSBjcm9wcGVySGVpZ2h0KSAvIDI7XG4gICAgICAgICAgICB0aGlzLmNyb3BwZXIueTIgPSB0aGlzLmNyb3BwZXIueTEgKyBjcm9wcGVySGVpZ2h0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jcm9wcGVyLnkxID0gMDtcbiAgICAgICAgICAgIHRoaXMuY3JvcHBlci55MiA9IGRpc3BsYXllZEltYWdlLm9mZnNldEhlaWdodDtcbiAgICAgICAgICAgIGNvbnN0IGNyb3BwZXJXaWR0aCA9IGRpc3BsYXllZEltYWdlLm9mZnNldEhlaWdodCAqIHRoaXMuYXNwZWN0UmF0aW87XG4gICAgICAgICAgICB0aGlzLmNyb3BwZXIueDEgPSAoZGlzcGxheWVkSW1hZ2Uub2Zmc2V0V2lkdGggLSBjcm9wcGVyV2lkdGgpIC8gMjtcbiAgICAgICAgICAgIHRoaXMuY3JvcHBlci54MiA9IHRoaXMuY3JvcHBlci54MSArIGNyb3BwZXJXaWR0aDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRvQXV0b0Nyb3AoKTtcbiAgICAgICAgdGhpcy5pbWFnZVZpc2libGUgPSB0cnVlO1xuICAgIH1cblxuICAgIHN0YXJ0TW92ZShldmVudDogYW55LCBtb3ZlVHlwZTogc3RyaW5nLCBwb3NpdGlvbjogc3RyaW5nIHwgbnVsbCA9IG51bGwpIHtcbiAgICAgICAgdGhpcy5tb3ZlU3RhcnQgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgICAgICAgIGFjdGl2ZTogdHJ1ZSxcbiAgICAgICAgICAgIHR5cGU6IG1vdmVUeXBlLFxuICAgICAgICAgICAgcG9zaXRpb246IHBvc2l0aW9uLFxuICAgICAgICAgICAgY2xpZW50WDogdGhpcy5nZXRDbGllbnRYKGV2ZW50KSxcbiAgICAgICAgICAgIGNsaWVudFk6IHRoaXMuZ2V0Q2xpZW50WShldmVudClcbiAgICAgICAgfSwgdGhpcy5jcm9wcGVyKTtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDptb3VzZW1vdmUnLCBbJyRldmVudCddKVxuICAgIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OnRvdWNobW92ZScsIFsnJGV2ZW50J10pXG4gICAgbW92ZUltZyhldmVudDogYW55KSB7XG4gICAgICAgIGlmICh0aGlzLm1vdmVTdGFydC5hY3RpdmUpIHtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRoaXMuc2V0TWF4U2l6ZSgpO1xuICAgICAgICAgICAgaWYgKHRoaXMubW92ZVN0YXJ0LnR5cGUgPT09ICdtb3ZlJykge1xuICAgICAgICAgICAgICAgIHRoaXMubW92ZShldmVudCk7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja0Nyb3BwZXJQb3NpdGlvbih0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5tb3ZlU3RhcnQudHlwZSA9PT0gJ3Jlc2l6ZScpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2l6ZShldmVudCk7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja0Nyb3BwZXJQb3NpdGlvbihmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgc2V0TWF4U2l6ZSgpIHtcbiAgICAgICAgY29uc3QgZWwgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuc291cmNlLWltYWdlJyk7XG4gICAgICAgIHRoaXMubWF4U2l6ZS53aWR0aCA9IGVsLm9mZnNldFdpZHRoO1xuICAgICAgICB0aGlzLm1heFNpemUuaGVpZ2h0ID0gZWwub2Zmc2V0SGVpZ2h0O1xuICAgICAgICB0aGlzLm1hcmdpbkxlZnQgPSB0aGlzLnNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0U3R5bGUoJ2NhbGMoNTAlIC0gJyArIHRoaXMubWF4U2l6ZS53aWR0aCAvIDIgKyAncHgpJyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjaGVja0Nyb3BwZXJQb3NpdGlvbihtYWludGFpblNpemUgPSBmYWxzZSkge1xuICAgICAgICBpZiAodGhpcy5jcm9wcGVyLngxIDwgMCkge1xuICAgICAgICAgICAgdGhpcy5jcm9wcGVyLngyIC09IG1haW50YWluU2l6ZSA/IHRoaXMuY3JvcHBlci54MSA6IDA7XG4gICAgICAgICAgICB0aGlzLmNyb3BwZXIueDEgPSAwO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmNyb3BwZXIueTEgPCAwKSB7XG4gICAgICAgICAgICB0aGlzLmNyb3BwZXIueTIgLT0gbWFpbnRhaW5TaXplID8gdGhpcy5jcm9wcGVyLnkxIDogMDtcbiAgICAgICAgICAgIHRoaXMuY3JvcHBlci55MSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuY3JvcHBlci54MiA+IHRoaXMubWF4U2l6ZS53aWR0aCkge1xuICAgICAgICAgICAgdGhpcy5jcm9wcGVyLngxIC09IG1haW50YWluU2l6ZSA/ICh0aGlzLmNyb3BwZXIueDIgLSB0aGlzLm1heFNpemUud2lkdGgpIDogMDtcbiAgICAgICAgICAgIHRoaXMuY3JvcHBlci54MiA9IHRoaXMubWF4U2l6ZS53aWR0aDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5jcm9wcGVyLnkyID4gdGhpcy5tYXhTaXplLmhlaWdodCkge1xuICAgICAgICAgICAgdGhpcy5jcm9wcGVyLnkxIC09IG1haW50YWluU2l6ZSA/ICh0aGlzLmNyb3BwZXIueTIgLSB0aGlzLm1heFNpemUuaGVpZ2h0KSA6IDA7XG4gICAgICAgICAgICB0aGlzLmNyb3BwZXIueTIgPSB0aGlzLm1heFNpemUuaGVpZ2h0O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6bW91c2V1cCcsIFsnJGV2ZW50J10pXG4gICAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6dG91Y2hlbmQnLCBbJyRldmVudCddKVxuICAgIG1vdmVTdG9wKGV2ZW50OiBhbnkpIHtcbiAgICAgICAgaWYgKHRoaXMubW92ZVN0YXJ0LmFjdGl2ZSkge1xuICAgICAgICAgICAgdGhpcy5tb3ZlU3RhcnQuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmRvQXV0b0Nyb3AoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgbW92ZShldmVudDogYW55KSB7XG4gICAgICAgIGNvbnN0IGRpZmZYID0gdGhpcy5nZXRDbGllbnRYKGV2ZW50KSAtIHRoaXMubW92ZVN0YXJ0LmNsaWVudFg7XG4gICAgICAgIGNvbnN0IGRpZmZZID0gdGhpcy5nZXRDbGllbnRZKGV2ZW50KSAtIHRoaXMubW92ZVN0YXJ0LmNsaWVudFk7XG5cbiAgICAgICAgdGhpcy5jcm9wcGVyLngxID0gdGhpcy5tb3ZlU3RhcnQueDEgKyBkaWZmWDtcbiAgICAgICAgdGhpcy5jcm9wcGVyLnkxID0gdGhpcy5tb3ZlU3RhcnQueTEgKyBkaWZmWTtcbiAgICAgICAgdGhpcy5jcm9wcGVyLngyID0gdGhpcy5tb3ZlU3RhcnQueDIgKyBkaWZmWDtcbiAgICAgICAgdGhpcy5jcm9wcGVyLnkyID0gdGhpcy5tb3ZlU3RhcnQueTIgKyBkaWZmWTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlc2l6ZShldmVudDogYW55KSB7XG4gICAgICAgIGNvbnN0IGRpZmZYID0gdGhpcy5nZXRDbGllbnRYKGV2ZW50KSAtIHRoaXMubW92ZVN0YXJ0LmNsaWVudFg7XG4gICAgICAgIGNvbnN0IGRpZmZZID0gdGhpcy5nZXRDbGllbnRZKGV2ZW50KSAtIHRoaXMubW92ZVN0YXJ0LmNsaWVudFk7XG4gICAgICAgIHN3aXRjaCAodGhpcy5tb3ZlU3RhcnQucG9zaXRpb24pIHtcbiAgICAgICAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICAgICAgICAgIHRoaXMuY3JvcHBlci54MSA9IE1hdGgubWluKHRoaXMubW92ZVN0YXJ0LngxICsgZGlmZlgsIHRoaXMuY3JvcHBlci54MiAtIDIwKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3RvcGxlZnQnOlxuICAgICAgICAgICAgICAgIHRoaXMuY3JvcHBlci54MSA9IE1hdGgubWluKHRoaXMubW92ZVN0YXJ0LngxICsgZGlmZlgsIHRoaXMuY3JvcHBlci54MiAtIDIwKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNyb3BwZXIueTEgPSBNYXRoLm1pbih0aGlzLm1vdmVTdGFydC55MSArIGRpZmZZLCB0aGlzLmNyb3BwZXIueTIgLSAyMCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICd0b3AnOlxuICAgICAgICAgICAgICAgIHRoaXMuY3JvcHBlci55MSA9IE1hdGgubWluKHRoaXMubW92ZVN0YXJ0LnkxICsgZGlmZlksIHRoaXMuY3JvcHBlci55MiAtIDIwKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3RvcHJpZ2h0JzpcbiAgICAgICAgICAgICAgICB0aGlzLmNyb3BwZXIueDIgPSBNYXRoLm1heCh0aGlzLm1vdmVTdGFydC54MiArIGRpZmZYLCB0aGlzLmNyb3BwZXIueDEgKyAyMCk7XG4gICAgICAgICAgICAgICAgdGhpcy5jcm9wcGVyLnkxID0gTWF0aC5taW4odGhpcy5tb3ZlU3RhcnQueTEgKyBkaWZmWSwgdGhpcy5jcm9wcGVyLnkyIC0gMjApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAncmlnaHQnOlxuICAgICAgICAgICAgICAgIHRoaXMuY3JvcHBlci54MiA9IE1hdGgubWF4KHRoaXMubW92ZVN0YXJ0LngyICsgZGlmZlgsIHRoaXMuY3JvcHBlci54MSArIDIwKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2JvdHRvbXJpZ2h0JzpcbiAgICAgICAgICAgICAgICB0aGlzLmNyb3BwZXIueDIgPSBNYXRoLm1heCh0aGlzLm1vdmVTdGFydC54MiArIGRpZmZYLCB0aGlzLmNyb3BwZXIueDEgKyAyMCk7XG4gICAgICAgICAgICAgICAgdGhpcy5jcm9wcGVyLnkyID0gTWF0aC5tYXgodGhpcy5tb3ZlU3RhcnQueTIgKyBkaWZmWSwgdGhpcy5jcm9wcGVyLnkxICsgMjApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnYm90dG9tJzpcbiAgICAgICAgICAgICAgICB0aGlzLmNyb3BwZXIueTIgPSBNYXRoLm1heCh0aGlzLm1vdmVTdGFydC55MiArIGRpZmZZLCB0aGlzLmNyb3BwZXIueTEgKyAyMCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdib3R0b21sZWZ0JzpcbiAgICAgICAgICAgICAgICB0aGlzLmNyb3BwZXIueDEgPSBNYXRoLm1pbih0aGlzLm1vdmVTdGFydC54MSArIGRpZmZYLCB0aGlzLmNyb3BwZXIueDIgLSAyMCk7XG4gICAgICAgICAgICAgICAgdGhpcy5jcm9wcGVyLnkyID0gTWF0aC5tYXgodGhpcy5tb3ZlU3RhcnQueTIgKyBkaWZmWSwgdGhpcy5jcm9wcGVyLnkxICsgMjApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubWFpbnRhaW5Bc3BlY3RSYXRpbykge1xuICAgICAgICAgICAgdGhpcy5jaGVja0FzcGVjdFJhdGlvKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGNoZWNrQXNwZWN0UmF0aW8oKSB7XG4gICAgICAgIGxldCBvdmVyZmxvd1ggPSAwO1xuICAgICAgICBsZXQgb3ZlcmZsb3dZID0gMDtcblxuICAgICAgICBzd2l0Y2ggKHRoaXMubW92ZVN0YXJ0LnBvc2l0aW9uKSB7XG4gICAgICAgICAgICBjYXNlICd0b3AnOlxuICAgICAgICAgICAgICAgIHRoaXMuY3JvcHBlci54MiA9IHRoaXMuY3JvcHBlci54MSArICh0aGlzLmNyb3BwZXIueTIgLSB0aGlzLmNyb3BwZXIueTEpICogdGhpcy5hc3BlY3RSYXRpbztcbiAgICAgICAgICAgICAgICBvdmVyZmxvd1ggPSBNYXRoLm1heCh0aGlzLmNyb3BwZXIueDIgLSB0aGlzLm1heFNpemUud2lkdGgsIDApO1xuICAgICAgICAgICAgICAgIG92ZXJmbG93WSA9IE1hdGgubWF4KDAgLSB0aGlzLmNyb3BwZXIueTEsIDApO1xuICAgICAgICAgICAgICAgIGlmIChvdmVyZmxvd1ggPiAwIHx8IG92ZXJmbG93WSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jcm9wcGVyLngyIC09IChvdmVyZmxvd1kgKiB0aGlzLmFzcGVjdFJhdGlvKSA+IG92ZXJmbG93WCA/IChvdmVyZmxvd1kgKiB0aGlzLmFzcGVjdFJhdGlvKSA6IG92ZXJmbG93WDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jcm9wcGVyLnkxICs9IChvdmVyZmxvd1kgKiB0aGlzLmFzcGVjdFJhdGlvKSA+IG92ZXJmbG93WCA/IG92ZXJmbG93WSA6IG92ZXJmbG93WCAvIHRoaXMuYXNwZWN0UmF0aW87XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnYm90dG9tJzpcbiAgICAgICAgICAgICAgICB0aGlzLmNyb3BwZXIueDIgPSB0aGlzLmNyb3BwZXIueDEgKyAodGhpcy5jcm9wcGVyLnkyIC0gdGhpcy5jcm9wcGVyLnkxKSAqIHRoaXMuYXNwZWN0UmF0aW87XG4gICAgICAgICAgICAgICAgb3ZlcmZsb3dYID0gTWF0aC5tYXgodGhpcy5jcm9wcGVyLngyIC0gdGhpcy5tYXhTaXplLndpZHRoLCAwKTtcbiAgICAgICAgICAgICAgICBvdmVyZmxvd1kgPSBNYXRoLm1heCh0aGlzLmNyb3BwZXIueTIgLSB0aGlzLm1heFNpemUuaGVpZ2h0LCAwKTtcbiAgICAgICAgICAgICAgICBpZiAob3ZlcmZsb3dYID4gMCB8fCBvdmVyZmxvd1kgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3JvcHBlci54MiAtPSAob3ZlcmZsb3dZICogdGhpcy5hc3BlY3RSYXRpbykgPiBvdmVyZmxvd1ggPyAob3ZlcmZsb3dZICogdGhpcy5hc3BlY3RSYXRpbykgOiBvdmVyZmxvd1g7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3JvcHBlci55MiAtPSAob3ZlcmZsb3dZICogdGhpcy5hc3BlY3RSYXRpbykgPiBvdmVyZmxvd1ggPyBvdmVyZmxvd1kgOiAob3ZlcmZsb3dYIC8gdGhpcy5hc3BlY3RSYXRpbyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAndG9wbGVmdCc6XG4gICAgICAgICAgICAgICAgdGhpcy5jcm9wcGVyLnkxID0gdGhpcy5jcm9wcGVyLnkyIC0gKHRoaXMuY3JvcHBlci54MiAtIHRoaXMuY3JvcHBlci54MSkgLyB0aGlzLmFzcGVjdFJhdGlvO1xuICAgICAgICAgICAgICAgIG92ZXJmbG93WCA9IE1hdGgubWF4KDAgLSB0aGlzLmNyb3BwZXIueDEsIDApO1xuICAgICAgICAgICAgICAgIG92ZXJmbG93WSA9IE1hdGgubWF4KDAgLSB0aGlzLmNyb3BwZXIueTEsIDApO1xuICAgICAgICAgICAgICAgIGlmIChvdmVyZmxvd1ggPiAwIHx8IG92ZXJmbG93WSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jcm9wcGVyLngxICs9IChvdmVyZmxvd1kgKiB0aGlzLmFzcGVjdFJhdGlvKSA+IG92ZXJmbG93WCA/IChvdmVyZmxvd1kgKiB0aGlzLmFzcGVjdFJhdGlvKSA6IG92ZXJmbG93WDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jcm9wcGVyLnkxICs9IChvdmVyZmxvd1kgKiB0aGlzLmFzcGVjdFJhdGlvKSA+IG92ZXJmbG93WCA/IG92ZXJmbG93WSA6IG92ZXJmbG93WCAvIHRoaXMuYXNwZWN0UmF0aW87XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAndG9wcmlnaHQnOlxuICAgICAgICAgICAgICAgIHRoaXMuY3JvcHBlci55MSA9IHRoaXMuY3JvcHBlci55MiAtICh0aGlzLmNyb3BwZXIueDIgLSB0aGlzLmNyb3BwZXIueDEpIC8gdGhpcy5hc3BlY3RSYXRpbztcbiAgICAgICAgICAgICAgICBvdmVyZmxvd1ggPSBNYXRoLm1heCh0aGlzLmNyb3BwZXIueDIgLSB0aGlzLm1heFNpemUud2lkdGgsIDApO1xuICAgICAgICAgICAgICAgIG92ZXJmbG93WSA9IE1hdGgubWF4KDAgLSB0aGlzLmNyb3BwZXIueTEsIDApO1xuICAgICAgICAgICAgICAgIGlmIChvdmVyZmxvd1ggPiAwIHx8IG92ZXJmbG93WSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jcm9wcGVyLngyIC09IChvdmVyZmxvd1kgKiB0aGlzLmFzcGVjdFJhdGlvKSA+IG92ZXJmbG93WCA/IChvdmVyZmxvd1kgKiB0aGlzLmFzcGVjdFJhdGlvKSA6IG92ZXJmbG93WDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jcm9wcGVyLnkxICs9IChvdmVyZmxvd1kgKiB0aGlzLmFzcGVjdFJhdGlvKSA+IG92ZXJmbG93WCA/IG92ZXJmbG93WSA6IG92ZXJmbG93WCAvIHRoaXMuYXNwZWN0UmF0aW87XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAncmlnaHQnOlxuICAgICAgICAgICAgY2FzZSAnYm90dG9tcmlnaHQnOlxuICAgICAgICAgICAgICAgIHRoaXMuY3JvcHBlci55MiA9IHRoaXMuY3JvcHBlci55MSArICh0aGlzLmNyb3BwZXIueDIgLSB0aGlzLmNyb3BwZXIueDEpIC8gdGhpcy5hc3BlY3RSYXRpbztcbiAgICAgICAgICAgICAgICBvdmVyZmxvd1ggPSBNYXRoLm1heCh0aGlzLmNyb3BwZXIueDIgLSB0aGlzLm1heFNpemUud2lkdGgsIDApO1xuICAgICAgICAgICAgICAgIG92ZXJmbG93WSA9IE1hdGgubWF4KHRoaXMuY3JvcHBlci55MiAtIHRoaXMubWF4U2l6ZS5oZWlnaHQsIDApO1xuICAgICAgICAgICAgICAgIGlmIChvdmVyZmxvd1ggPiAwIHx8IG92ZXJmbG93WSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jcm9wcGVyLngyIC09IChvdmVyZmxvd1kgKiB0aGlzLmFzcGVjdFJhdGlvKSA+IG92ZXJmbG93WCA/IChvdmVyZmxvd1kgKiB0aGlzLmFzcGVjdFJhdGlvKSA6IG92ZXJmbG93WDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jcm9wcGVyLnkyIC09IChvdmVyZmxvd1kgKiB0aGlzLmFzcGVjdFJhdGlvKSA+IG92ZXJmbG93WCA/IG92ZXJmbG93WSA6IG92ZXJmbG93WCAvIHRoaXMuYXNwZWN0UmF0aW87XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgICAgICBjYXNlICdib3R0b21sZWZ0JzpcbiAgICAgICAgICAgICAgICB0aGlzLmNyb3BwZXIueTIgPSB0aGlzLmNyb3BwZXIueTEgKyAodGhpcy5jcm9wcGVyLngyIC0gdGhpcy5jcm9wcGVyLngxKSAvIHRoaXMuYXNwZWN0UmF0aW87XG4gICAgICAgICAgICAgICAgb3ZlcmZsb3dYID0gTWF0aC5tYXgoMCAtIHRoaXMuY3JvcHBlci54MSwgMCk7XG4gICAgICAgICAgICAgICAgb3ZlcmZsb3dZID0gTWF0aC5tYXgodGhpcy5jcm9wcGVyLnkyIC0gdGhpcy5tYXhTaXplLmhlaWdodCwgMCk7XG4gICAgICAgICAgICAgICAgaWYgKG92ZXJmbG93WCA+IDAgfHwgb3ZlcmZsb3dZID4gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNyb3BwZXIueDEgKz0gKG92ZXJmbG93WSAqIHRoaXMuYXNwZWN0UmF0aW8pID4gb3ZlcmZsb3dYID8gKG92ZXJmbG93WSAqIHRoaXMuYXNwZWN0UmF0aW8pIDogb3ZlcmZsb3dYO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNyb3BwZXIueTIgLT0gKG92ZXJmbG93WSAqIHRoaXMuYXNwZWN0UmF0aW8pID4gb3ZlcmZsb3dYID8gb3ZlcmZsb3dZIDogb3ZlcmZsb3dYIC8gdGhpcy5hc3BlY3RSYXRpbztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGRvQXV0b0Nyb3AoKSB7XG4gICAgICAgIGlmICh0aGlzLmF1dG9Dcm9wKSB7XG4gICAgICAgICAgICB0aGlzLmNyb3AoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNyb3AoKSB7XG4gICAgICAgIGNvbnN0IGRpc3BsYXllZEltYWdlID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLnNvdXJjZS1pbWFnZScpO1xuICAgICAgICBpZiAoZGlzcGxheWVkSW1hZ2UgJiYgdGhpcy5vcmlnaW5hbEltYWdlICE9IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnN0IHJhdGlvID0gdGhpcy5vcmlnaW5hbFNpemUud2lkdGggLyBkaXNwbGF5ZWRJbWFnZS5vZmZzZXRXaWR0aDtcbiAgICAgICAgICAgIGNvbnN0IGxlZnQgPSBNYXRoLnJvdW5kKHRoaXMuY3JvcHBlci54MSAqIHJhdGlvKTtcbiAgICAgICAgICAgIGNvbnN0IHRvcCA9IE1hdGgucm91bmQodGhpcy5jcm9wcGVyLnkxICogcmF0aW8pO1xuICAgICAgICAgICAgY29uc3Qgd2lkdGggPSBNYXRoLnJvdW5kKCh0aGlzLmNyb3BwZXIueDIgLSB0aGlzLmNyb3BwZXIueDEpICogcmF0aW8pO1xuICAgICAgICAgICAgY29uc3QgaGVpZ2h0ID0gTWF0aC5yb3VuZCgodGhpcy5jcm9wcGVyLnkyIC0gdGhpcy5jcm9wcGVyLnkxKSAqIHJhdGlvKTtcbiAgICAgICAgICAgIGNvbnN0IHJlc2l6ZVJhdGlvID0gdGhpcy5nZXRSZXNpemVSYXRpbyh3aWR0aCk7XG4gICAgICAgICAgICBjb25zdCByZXNpemVkV2lkdGggPSBNYXRoLmZsb29yKHdpZHRoICogcmVzaXplUmF0aW8pO1xuICAgICAgICAgICAgY29uc3QgcmVzaXplZEhlaWdodCA9IE1hdGguZmxvb3IoaGVpZ2h0ICogcmVzaXplUmF0aW8pO1xuXG4gICAgICAgICAgICBjb25zdCBjcm9wQ2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJykgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XG4gICAgICAgICAgICBjcm9wQ2FudmFzLndpZHRoID0gcmVzaXplZFdpZHRoO1xuICAgICAgICAgICAgY3JvcENhbnZhcy5oZWlnaHQgPSByZXNpemVkSGVpZ2h0O1xuXG4gICAgICAgICAgICBjb25zdCBjdHggPSBjcm9wQ2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgICAgICAgICBpZiAoY3R4KSB7XG4gICAgICAgICAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLm9yaWdpbmFsSW1hZ2UsIGxlZnQsIHRvcCwgd2lkdGgsIGhlaWdodCwgMCwgMCwgd2lkdGggKiByZXNpemVSYXRpbywgaGVpZ2h0ICogcmVzaXplUmF0aW8pO1xuICAgICAgICAgICAgICAgIHRoaXMuY3JvcFRvT3V0cHV0VHlwZShjcm9wQ2FudmFzLCByZXNpemVkV2lkdGgsIHJlc2l6ZWRIZWlnaHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcm9wVG9PdXRwdXRUeXBlKGNyb3BDYW52YXM6IEhUTUxDYW52YXNFbGVtZW50LCByZXNpemVkV2lkdGg6IG51bWJlciwgcmVzaXplZEhlaWdodDogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IG91dHB1dDogSW1hZ2VDcm9wcGVkRXZlbnQgPSB7XG4gICAgICAgICAgICB3aWR0aDogcmVzaXplZFdpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiByZXNpemVkSGVpZ2h0LFxuICAgICAgICAgICAgY3JvcHBlclBvc2l0aW9uOiBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmNyb3BwZXIpXG4gICAgICAgIH07XG4gICAgICAgIHN3aXRjaCAodGhpcy5vdXRwdXRUeXBlKSB7XG4gICAgICAgICAgICBjYXNlICdiYXNlNjQnOlxuICAgICAgICAgICAgICAgIG91dHB1dC5iYXNlNjQgPSB0aGlzLmNyb3BUb0Jhc2U2NChjcm9wQ2FudmFzKTtcbiAgICAgICAgICAgICAgICB0aGlzLmltYWdlQ3JvcHBlZC5lbWl0KG91dHB1dCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdmaWxlJzpcbiAgICAgICAgICAgICAgICB0aGlzLmNyb3BUb0ZpbGUoY3JvcENhbnZhcylcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHJlc3VsdDogQmxvYiB8IG51bGwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dC5maWxlID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbWFnZUNyb3BwZWQuZW1pdChvdXRwdXQpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2JvdGgnOlxuICAgICAgICAgICAgICAgIG91dHB1dC5iYXNlNjQgPSB0aGlzLmNyb3BUb0Jhc2U2NChjcm9wQ2FudmFzKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNyb3BUb0ZpbGUoY3JvcENhbnZhcylcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHJlc3VsdDogQmxvYiB8IG51bGwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dC5maWxlID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbWFnZUNyb3BwZWQuZW1pdChvdXRwdXQpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgY3JvcFRvQmFzZTY0KGNyb3BDYW52YXM6IEhUTUxDYW52YXNFbGVtZW50KTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgaW1hZ2VCYXNlNjQgPSBjcm9wQ2FudmFzLnRvRGF0YVVSTCgnaW1hZ2UvJyArIHRoaXMuZm9ybWF0LCB0aGlzLmdldFF1YWxpdHkoKSk7XG4gICAgICAgIHRoaXMuaW1hZ2VDcm9wcGVkQmFzZTY0LmVtaXQoaW1hZ2VCYXNlNjQpO1xuICAgICAgICByZXR1cm4gaW1hZ2VCYXNlNjQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcm9wVG9GaWxlKGNyb3BDYW52YXM6IEhUTUxDYW52YXNFbGVtZW50KTogUHJvbWlzZTxCbG9iIHwgbnVsbD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRDYW52YXNCbG9iKGNyb3BDYW52YXMpXG4gICAgICAgICAgICAudGhlbigocmVzdWx0OiBCbG9iIHwgbnVsbCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbWFnZUNyb3BwZWRGaWxlLmVtaXQocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0Q2FudmFzQmxvYihjcm9wQ2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCk6IFByb21pc2U8QmxvYiB8IG51bGw+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICBjcm9wQ2FudmFzLnRvQmxvYihcbiAgICAgICAgICAgICAgICAocmVzdWx0OiBCbG9iIHwgbnVsbCkgPT4gdGhpcy56b25lLnJ1bigoKSA9PiByZXNvbHZlKHJlc3VsdCkpLFxuICAgICAgICAgICAgICAgICdpbWFnZS8nICsgdGhpcy5mb3JtYXQsXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRRdWFsaXR5KClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0UXVhbGl0eSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gTWF0aC5taW4oMSwgTWF0aC5tYXgoMCwgdGhpcy5pbWFnZVF1YWxpdHkgLyAxMDApKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFJlc2l6ZVJhdGlvKHdpZHRoOiBudW1iZXIpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXNpemVUb1dpZHRoID4gMCAmJiAoIXRoaXMub25seVNjYWxlRG93biB8fCB3aWR0aCA+IHRoaXMucmVzaXplVG9XaWR0aClcbiAgICAgICAgICAgID8gdGhpcy5yZXNpemVUb1dpZHRoIC8gd2lkdGhcbiAgICAgICAgICAgIDogMTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldENsaWVudFgoZXZlbnQ6IGFueSkge1xuICAgICAgICByZXR1cm4gZXZlbnQuY2xpZW50WCAhPSBudWxsID8gZXZlbnQuY2xpZW50WCA6IGV2ZW50LnRvdWNoZXNbMF0uY2xpZW50WDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldENsaWVudFkoZXZlbnQ6IGFueSkge1xuICAgICAgICByZXR1cm4gZXZlbnQuY2xpZW50WSAhPSBudWxsID8gZXZlbnQuY2xpZW50WSA6IGV2ZW50LnRvdWNoZXNbMF0uY2xpZW50WTtcbiAgICB9XG59XG4iXX0=