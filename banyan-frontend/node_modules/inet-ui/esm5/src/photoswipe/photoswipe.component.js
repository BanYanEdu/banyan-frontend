/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, EventEmitter, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import * as PhotoSwipe from 'photoswipe/dist/photoswipe.js';
import * as PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default.js';
/**
 * Use PhotoSwipe http://photoswipe.com/documentation/api.html
 */
var PhotoSwipeComponent = /** @class */ (function () {
    function PhotoSwipeComponent() {
        this.onDestroy = new EventEmitter();
    }
    /**
     * @param {?} items
     * @param {?=} options
     * @return {?}
     */
    PhotoSwipeComponent.prototype.open = /**
     * @param {?} items
     * @param {?=} options
     * @return {?}
     */
    function (items, options) {
        var _this = this;
        options = options || {
            index: 0 // start at first slide
        };
        if (options.clickElement) {
            options.getThumbBoundsFn = (/**
             * @param {?} index
             * @return {?}
             */
            function (index) {
                /** @type {?} */
                var pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
                /** @type {?} */
                var rect = options.clickElement.getBoundingClientRect();
                return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
            });
        }
        // Initializes and opens PhotoSwipe
        this.gallery = new PhotoSwipe(this.photoSwipe.nativeElement, PhotoSwipeUI_Default, items, options);
        this.gallery.listen('destroy', (/**
         * @return {?}
         */
        function () {
            _this.onDestroy.emit(true);
        }));
        // Dynamic load image
        this.gallery.listen('gettingData', (/**
         * @param {?} index
         * @param {?} item
         * @return {?}
         */
        function (index, item) {
            if (item.sizeDynamic) { // unknown size
                setTimeout((/**
                 * @return {?}
                 */
                function () {
                    /** @type {?} */
                    var img = new Image();
                    img.onload = (/**
                     * @return {?}
                     */
                    function () {
                        item.w = img.width; // set image width
                        item.h = img.height; // set image height
                        _this.gallery.invalidateCurrItems(); // re init Items
                        _this.gallery.updateSize(true); // re init Items
                    });
                    img.src = item.src; // let's download image
                }), 300);
                delete item.sizeDynamic;
            }
        }));
        this.gallery.init();
    };
    /**
     * @return {?}
     */
    PhotoSwipeComponent.prototype.destroy = /**
     * @return {?}
     */
    function () {
        this.gallery.destroy();
    };
    PhotoSwipeComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-photoswipe',
                    template: "<!-- Root element of PhotoSwipe. Must have class pswp. -->\n<div #photoSwipe class=\"pswp\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">\n\n  <!-- Background of PhotoSwipe.\n       It's a separate element as animating opacity is faster than rgba(). -->\n  <div class=\"pswp__bg\"></div>\n\n  <!-- Slides wrapper with overflow:hidden. -->\n  <div class=\"pswp__scroll-wrap\">\n\n    <!-- Container that holds slides.\n        PhotoSwipe keeps only 3 of them in the DOM to save memory.\n        Don't modify these 3 pswp__item elements, data is added later on. -->\n    <div class=\"pswp__container\">\n      <div class=\"pswp__item\"></div>\n      <div class=\"pswp__item\"></div>\n      <div class=\"pswp__item\"></div>\n    </div>\n\n    <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->\n    <div class=\"pswp__ui pswp__ui--hidden\">\n\n      <div class=\"pswp__top-bar\">\n\n        <!--  Controls are self-explanatory. Order can be changed. -->\n\n        <div class=\"pswp__counter\"></div>\n\n        <button class=\"pswp__button pswp__button--close\" title=\"Close (Esc)\"></button>\n\n        <!--<button class=\"pswp__button pswp__button&#45;&#45;share\" title=\"Share\"></button>-->\n\n        <button class=\"pswp__button pswp__button--fs\" title=\"Toggle fullscreen\"></button>\n\n        <button class=\"pswp__button pswp__button--zoom\" title=\"Zoom in/out\"></button>\n\n        <!-- Preloader demo http://codepen.io/dimsemenov/pen/yyBWoR -->\n        <!-- element will get class pswp__preloader--active when preloader is running -->\n        <div class=\"pswp__preloader\">\n          <div class=\"pswp__preloader__icn\">\n            <div class=\"pswp__preloader__cut\">\n              <div class=\"pswp__preloader__donut\"></div>\n            </div>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"pswp__share-modal pswp__share-modal--hidden pswp__single-tap\">\n        <div class=\"pswp__share-tooltip\"></div>\n      </div>\n\n      <button class=\"pswp__button pswp__button--arrow--left\" title=\"Previous (arrow left)\">\n      </button>\n\n      <button class=\"pswp__button pswp__button--arrow--right\" title=\"Next (arrow right)\">\n      </button>\n\n      <div class=\"pswp__caption\">\n        <div class=\"pswp__caption__center\"></div>\n      </div>\n\n    </div>\n\n  </div>\n\n</div>",
                    encapsulation: ViewEncapsulation.None,
                    styles: ["", "/*! PhotoSwipe main CSS by Dmitry Semenov | photoswipe.com | MIT license */.pswp{display:none;position:absolute;width:100%;height:100%;left:0;top:0;overflow:hidden;touch-action:none;z-index:1500;-webkit-text-size-adjust:100%;-webkit-backface-visibility:hidden;outline:0}.pswp *{box-sizing:border-box}.pswp img{max-width:none}.pswp--animate_opacity{opacity:.001;will-change:opacity;transition:opacity 333ms cubic-bezier(.4,0,.22,1)}.pswp--open{display:block}.pswp--zoom-allowed .pswp__img{cursor:-webkit-zoom-in;cursor:-moz-zoom-in;cursor:zoom-in}.pswp--zoomed-in .pswp__img{cursor:-webkit-grab;cursor:-moz-grab;cursor:grab}.pswp--dragging .pswp__img{cursor:-webkit-grabbing;cursor:-moz-grabbing;cursor:grabbing}.pswp__bg{position:absolute;left:0;top:0;width:100%;height:100%;background:#000;opacity:0;transform:translateZ(0);-webkit-backface-visibility:hidden;will-change:opacity}.pswp__scroll-wrap{position:absolute;left:0;top:0;width:100%;height:100%;overflow:hidden}.pswp__container,.pswp__zoom-wrap{touch-action:none;position:absolute;left:0;right:0;top:0;bottom:0;-webkit-backface-visibility:hidden}.pswp__container,.pswp__img{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent;-webkit-touch-callout:none}.pswp__zoom-wrap{position:absolute;width:100%;transform-origin:left top;transition:transform 333ms cubic-bezier(.4,0,.22,1)}.pswp__bg{will-change:opacity;transition:opacity 333ms cubic-bezier(.4,0,.22,1)}.pswp--animated-in .pswp__bg,.pswp--animated-in .pswp__zoom-wrap{transition:none}.pswp__item{position:absolute;left:0;right:0;top:0;bottom:0;overflow:hidden}.pswp__img{position:absolute;width:auto;height:auto;top:0;left:0}.pswp__img--placeholder{-webkit-backface-visibility:hidden}.pswp__img--placeholder--blank{background:#222}.pswp--ie .pswp__img{width:100%!important;height:auto!important;left:0;top:0}.pswp__error-msg{position:absolute;left:0;top:50%;width:100%;text-align:center;font-size:14px;line-height:16px;margin-top:-8px;color:#ccc}.pswp__error-msg a{color:#ccc;text-decoration:underline}", "/*! PhotoSwipe Default UI CSS by Dmitry Semenov | photoswipe.com | MIT license */.pswp__button{position:relative;cursor:pointer;overflow:visible;-webkit-appearance:none;display:block;border:0;padding:0;margin:0;float:right;opacity:.75;transition:opacity .2s;box-shadow:none}.pswp__button:focus,.pswp__button:hover{opacity:1}.pswp__button:active{outline:0;opacity:.9}.pswp__button::-moz-focus-inner{padding:0;border:0}.pswp__ui--over-close .pswp__button--close{opacity:1}.pswp__button,.pswp__button--arrow--left:before,.pswp__button--arrow--right:before{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQgAAABYCAQAAACjBqE3AAAB6klEQVR4Ae3bsWpUQRTG8YkkanwCa7GzVotsI/gEgk9h4Vu4ySLYmMYgbJrc3lrwZbJwC0FMt4j7F6Y4oIZrsXtgxvx/1c0ufEX4cnbmLCmSJEmSJEmSJEmSJP3XCBPvbJU+8doWmDFwyZpLBmYlNJebz0KwzykwsuSYJSNwykEJreV2BaBMaLIQZ2xYcFgqDlmw4ayE/FwL0dDk4Qh4W37DAjgqIT+3HRbigjH+iikVdxgZStgyN0Su2sXIeTwTT+esdpcbIlfNAuZ/TxresG4zV8kYWSZNiKUTokMMSWeIwTNEn4fK2TW3gRNgVkJLuVksROA9G+bEvoATNlBCa7nZXEwdxEZxzpKRKFh+bsv8LmPFmhX1OwfIz81jIRJQ5eeqG9B+riRJkiRJkiRJkiRJkiRJkiRJUkvA/8RQoEpKlJWINFkJ62AlrEP/mNBibnv2yz/A3t7Uq3LcpoxP8COjC1T5vxoAD5VdoEqdDrd5QuW1swtUSaueh3zkiuBiqgtA2OlkeMcP/uDqugsJdbjHF65VdPMKwS0+WQc/MgKvrIOHysB9vgPwk8+85hmPbnQdvHZyDMAFD7L3EOpgMcVdvnHFS0/vlatrXvCVx0U9gt3fxvnA0/hB4nmRJEmSJEmSJEmSJGmHfgFLaDPoMu5xWwAAAABJRU5ErkJggg==) 0 0/264px 88px no-repeat;width:44px;height:44px}/*!* Serve SVG sprite if browser supports SVG and resolution is more than 105dpi *!*/.pswp__button--close{background-position:0 -44px}.pswp__button--share{background-position:-44px -44px}.pswp__button--fs{display:none}.pswp--supports-fs .pswp__button--fs{display:block}.pswp--fs .pswp__button--fs{background-position:-44px 0}.pswp__button--zoom{display:none;background-position:-88px 0}.pswp--zoom-allowed .pswp__button--zoom{display:block}.pswp--zoomed-in .pswp__button--zoom{background-position:-132px 0}.pswp--touch .pswp__button--arrow--left,.pswp--touch .pswp__button--arrow--right{visibility:hidden}.pswp__button--arrow--left,.pswp__button--arrow--right{background:0 0;top:50%;margin-top:-50px;width:70px;height:100px;position:absolute}.pswp__button--arrow--left{left:0}.pswp__button--arrow--right{right:0}.pswp__button--arrow--left:before,.pswp__button--arrow--right:before{content:'';top:35px;background-color:rgba(0,0,0,.3);height:30px;width:32px;position:absolute}.pswp__button--arrow--left:before{left:6px;background-position:-138px -44px}.pswp__button--arrow--right:before{right:6px;background-position:-94px -44px}.pswp__counter,.pswp__share-modal{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.pswp__share-modal{display:block;background:rgba(0,0,0,.5);width:100%;height:100%;top:0;left:0;padding:10px;position:absolute;z-index:1600;opacity:0;transition:opacity .25s ease-out;-webkit-backface-visibility:hidden;will-change:opacity}.pswp__share-modal--hidden{display:none}.pswp__share-tooltip{z-index:1620;position:absolute;background:#fff;top:56px;border-radius:2px;display:block;width:auto;right:44px;box-shadow:0 2px 5px rgba(0,0,0,.25);transform:translateY(6px);transition:transform .25s;-webkit-backface-visibility:hidden;will-change:transform}.pswp__share-tooltip a{display:block;padding:8px 12px;color:#000;text-decoration:none;font-size:14px;line-height:18px}.pswp__share-tooltip a:hover{text-decoration:none;color:#000}.pswp__share-tooltip a:first-child{border-radius:2px 2px 0 0}.pswp__share-tooltip a:last-child{border-radius:0 0 2px 2px}.pswp__share-modal--fade-in{opacity:1}.pswp__share-modal--fade-in .pswp__share-tooltip{transform:translateY(0)}.pswp--touch .pswp__share-tooltip a{padding:16px 12px}a.pswp__share--facebook:before{content:'';display:block;width:0;height:0;position:absolute;top:-12px;right:15px;border:6px solid transparent;border-bottom-color:#fff;-webkit-pointer-events:none;-moz-pointer-events:none;pointer-events:none}a.pswp__share--facebook:hover{background:#3e5c9a;color:#fff}a.pswp__share--facebook:hover:before{border-bottom-color:#3e5c9a}a.pswp__share--twitter:hover{background:#55acee;color:#fff}a.pswp__share--pinterest:hover{background:#ccc;color:#ce272d}a.pswp__share--download:hover{background:#ddd}.pswp__counter{position:absolute;left:0;top:0;height:44px;font-size:13px;line-height:44px;color:#fff;opacity:.75;padding:0 10px}.pswp__caption{position:absolute;left:0;bottom:0;width:100%;min-height:44px}.pswp__caption small{font-size:11px;color:#bbb}.pswp__caption__center{text-align:left;max-width:420px;margin:0 auto;font-size:13px;padding:10px;line-height:20px;color:#ccc}.pswp__caption--empty{display:none}.pswp__caption--fake{visibility:hidden}.pswp__preloader{width:44px;height:44px;position:absolute;top:0;left:50%;margin-left:-22px;opacity:0;transition:opacity .25s ease-out;will-change:opacity;direction:ltr}.pswp__preloader__icn{width:20px;height:20px;margin:12px}.pswp__preloader--active{opacity:1}.pswp__preloader--active .pswp__preloader__icn{background:url(data:image/gif;base64,R0lGODlhFAAUAPMIAIeHhz8/P1dXVycnJ8/Pz7e3t5+fn29vb////wAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFBwAIACwAAAAAFAAUAEAEUxDJSatFxtwaggWAdIyHJAhXoRYSQUhDPGx0TbmujahbXGWZWqdDAYEsp5NupLPkdDwE7oXwWVasimzWrAE1tKFHErQRK8eL8mMUlRBJVI307uoiACH5BAUHAAgALAEAAQASABIAAAROEMkpS6E4W5upMdUmEQT2feFIltMJYivbvhnZ3R0A4NMwIDodz+cL7nDEn5CH8DGZh8MtEMBEoxkqlXKVIgQCibbK9YLBYvLtHH5K0J0IACH5BAUHAAgALAEAAQASABIAAAROEMkpjaE4W5spANUmFQX2feFIltMJYivbvhnZ3d1x4BNBIDodz+cL7nDEn5CH8DGZAsFtMMBEoxkqlXKVIgIBibbK9YLBYvLtHH5K0J0IACH5BAUHAAgALAEAAQASABIAAAROEMkpAaA4W5vpOdUmGQb2feFIltMJYivbvhnZ3Z0g4FNRIDodz+cL7nDEn5CH8DGZgcCNQMBEoxkqlXKVIgYDibbK9YLBYvLtHH5K0J0IACH5BAUHAAgALAEAAQASABIAAAROEMkpz6E4W5upENUmAQD2feFIltMJYivbvhnZ3V0Q4JNhIDodz+cL7nDEn5CH8DGZg8GtUMBEoxkqlXKVIggEibbK9YLBYvLtHH5K0J0IACH5BAUHAAgALAEAAQASABIAAAROEMkphaA4W5tpCNUmHQf2feFIltMJYivbvhnZ3d0w4BMAIDodz+cL7nDEn5CH8DGZBMLNYMBEoxkqlXKVIgoFibbK9YLBYvLtHH5K0J0IACH5BAUHAAgALAEAAQASABIAAAROEMkpQ6A4W5vpGNUmCQL2feFIltMJYivbvhnZ3R1B4NNxIDodz+cL7nDEn5CH8DGZhcINAMBEoxkqlXKVIgwGibbK9YLBYvLtHH5K0J0IACH5BAUHAAcALAEAAQASABIAAANCeLo6wzA6FxkhbaoQ4L3ZxnXLh0EjWZ4RV71VUcCLIByyTNt2PsO8m452sBGJBsNxkUwuD03lAQBASqnUJ7aq5UYSADs=) no-repeat}.pswp--css_animation .pswp__preloader--active{opacity:1}.pswp--css_animation .pswp__preloader--active .pswp__preloader__icn{-webkit-animation:.5s linear infinite clockwise;animation:.5s linear infinite clockwise}.pswp--css_animation .pswp__preloader--active .pswp__preloader__donut{-webkit-animation:1s cubic-bezier(.4,0,.22,1) infinite donut-rotate;animation:1s cubic-bezier(.4,0,.22,1) infinite donut-rotate}.pswp--css_animation .pswp__preloader__icn{background:0 0;opacity:.75;width:14px;height:14px;position:absolute;left:15px;top:15px;margin:0}.pswp--css_animation .pswp__preloader__cut{position:relative;width:7px;height:14px;overflow:hidden}.pswp--css_animation .pswp__preloader__donut{box-sizing:border-box;width:14px;height:14px;border:2px solid #fff;border-radius:50%;border-left-color:transparent;border-bottom-color:transparent;position:absolute;top:0;left:0;background:0 0;margin:0}@media screen and (max-width:1024px){.pswp__preloader{position:relative;left:auto;top:auto;margin:0;float:right}}@-webkit-keyframes clockwise{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}@keyframes clockwise{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}@-webkit-keyframes donut-rotate{0%,100%{transform:rotate(0)}50%{transform:rotate(-140deg)}}@keyframes donut-rotate{0%,100%{transform:rotate(0)}50%{transform:rotate(-140deg)}}.pswp__ui{-webkit-font-smoothing:auto;visibility:visible;opacity:1;z-index:1550}.pswp__top-bar{position:absolute;left:0;top:0;height:44px;width:100%}.pswp--has_mouse .pswp__button--arrow--left,.pswp--has_mouse .pswp__button--arrow--right,.pswp__caption,.pswp__top-bar{-webkit-backface-visibility:hidden;will-change:opacity;transition:opacity 333ms cubic-bezier(.4,0,.22,1)}.pswp--has_mouse .pswp__button--arrow--left,.pswp--has_mouse .pswp__button--arrow--right{visibility:visible}.pswp__caption,.pswp__top-bar{background-color:rgba(0,0,0,.5)}.pswp__ui--fit .pswp__caption,.pswp__ui--fit .pswp__top-bar{background-color:rgba(0,0,0,.3)}.pswp__ui--idle .pswp__button--arrow--left,.pswp__ui--idle .pswp__button--arrow--right,.pswp__ui--idle .pswp__top-bar{opacity:0}.pswp__ui--hidden .pswp__button--arrow--left,.pswp__ui--hidden .pswp__button--arrow--right,.pswp__ui--hidden .pswp__caption,.pswp__ui--hidden .pswp__top-bar{opacity:.001}.pswp__ui--one-slide .pswp__button--arrow--left,.pswp__ui--one-slide .pswp__button--arrow--right,.pswp__ui--one-slide .pswp__counter{display:none}.pswp__element--disabled{display:none!important}.pswp--minimal--dark .pswp__top-bar{background:0 0}"]
                }] }
    ];
    /** @nocollapse */
    PhotoSwipeComponent.ctorParameters = function () { return []; };
    PhotoSwipeComponent.propDecorators = {
        onDestroy: [{ type: Output }],
        photoSwipe: [{ type: ViewChild, args: ['photoSwipe',] }]
    };
    return PhotoSwipeComponent;
}());
export { PhotoSwipeComponent };
if (false) {
    /** @type {?} */
    PhotoSwipeComponent.prototype.onDestroy;
    /** @type {?} */
    PhotoSwipeComponent.prototype.photoSwipe;
    /**
     * @type {?}
     * @private
     */
    PhotoSwipeComponent.prototype.gallery;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGhvdG9zd2lwZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbmV0LXVpLyIsInNvdXJjZXMiOlsic3JjL3Bob3Rvc3dpcGUvcGhvdG9zd2lwZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLGlCQUFpQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRXhHLE9BQU8sS0FBSyxVQUFVLE1BQU0sK0JBQStCLENBQUM7QUFDNUQsT0FBTyxLQUFLLG9CQUFvQixNQUFNLDBDQUEwQyxDQUFDOzs7O0FBUWpGO0lBZ0JFO1FBTFUsY0FBUyxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7SUFPOUMsQ0FBQzs7Ozs7O0lBRUQsa0NBQUk7Ozs7O0lBQUosVUFBSyxLQUFjLEVBQUUsT0FBMkI7UUFBaEQsaUJBMENDO1FBeENDLE9BQU8sR0FBRyxPQUFPLElBQUk7WUFDbkIsS0FBSyxFQUFFLENBQUMsQ0FBQyx1QkFBdUI7U0FDakMsQ0FBQztRQUVGLElBQUksT0FBTyxDQUFDLFlBQVksRUFBRTtZQUV4QixPQUFPLENBQUMsZ0JBQWdCOzs7O1lBQUcsVUFBUyxLQUFLOztvQkFDbkMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxXQUFXLElBQUksUUFBUSxDQUFDLGVBQWUsQ0FBQyxTQUFTOztvQkFDeEUsSUFBSSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMscUJBQXFCLEVBQUU7Z0JBQ3JELE9BQU8sRUFBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsR0FBRyxXQUFXLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUMsQ0FBQztZQUNsRSxDQUFDLENBQUEsQ0FBQztTQUVIO1FBRUQsbUNBQW1DO1FBQ25DLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsb0JBQW9CLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBRW5HLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFNBQVM7OztRQUFFO1lBQzdCLEtBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVCLENBQUMsRUFBQyxDQUFDO1FBRUgscUJBQXFCO1FBQ3JCLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLGFBQWE7Ozs7O1FBQUUsVUFBQyxLQUFLLEVBQUUsSUFBSTtZQUM3QyxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFBRSxlQUFlO2dCQUNyQyxVQUFVOzs7Z0JBQUM7O3dCQUNMLEdBQUcsR0FBRyxJQUFJLEtBQUssRUFBRTtvQkFDckIsR0FBRyxDQUFDLE1BQU07OztvQkFBRzt3QkFDWCxJQUFJLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxrQkFBa0I7d0JBQ3RDLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLG1CQUFtQjt3QkFDeEMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLENBQUMsZ0JBQWdCO3dCQUNwRCxLQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLGdCQUFnQjtvQkFDakQsQ0FBQyxDQUFBLENBQUM7b0JBQ0YsR0FBRyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsdUJBQXVCO2dCQUM3QyxDQUFDLEdBQUUsR0FBRyxDQUFDLENBQUM7Z0JBQ1IsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO2FBQ3pCO1FBQ0gsQ0FBQyxFQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO0lBRXRCLENBQUM7Ozs7SUFFRCxxQ0FBTzs7O0lBQVA7UUFDRSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ3pCLENBQUM7O2dCQWxFRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtvQkFDMUIsKzFFQUEwQztvQkFNMUMsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7O2lCQUN0Qzs7Ozs7NEJBRUUsTUFBTTs2QkFDTixTQUFTLFNBQUMsWUFBWTs7SUF1RHpCLDBCQUFDO0NBQUEsQUFuRUQsSUFtRUM7U0F6RFksbUJBQW1COzs7SUFDOUIsd0NBQThDOztJQUM5Qyx5Q0FBZ0Q7Ozs7O0lBRWhELHNDQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIE91dHB1dCwgVmlld0NoaWxkLCBWaWV3RW5jYXBzdWxhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCAqIGFzIFBob3RvU3dpcGUgZnJvbSAncGhvdG9zd2lwZS9kaXN0L3Bob3Rvc3dpcGUuanMnO1xuaW1wb3J0ICogYXMgUGhvdG9Td2lwZVVJX0RlZmF1bHQgZnJvbSAncGhvdG9zd2lwZS9kaXN0L3Bob3Rvc3dpcGUtdWktZGVmYXVsdC5qcyc7XG5pbXBvcnQge1Bob3RvfSBmcm9tICcuL21vZGVsL3Bob3RvJztcbmltcG9ydCB7UGhvdG9Td2lwZU9wdGlvbnN9IGZyb20gJy4vbW9kZWwvb3B0aW9uJztcblxuLyoqXG4gKiBVc2UgUGhvdG9Td2lwZSBodHRwOi8vcGhvdG9zd2lwZS5jb20vZG9jdW1lbnRhdGlvbi9hcGkuaHRtbFxuICovXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FwcC1waG90b3N3aXBlJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3Bob3Rvc3dpcGUuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFtcbiAgICAnLi9waG90b3N3aXBlLmNvbXBvbmVudC5jc3MnLFxuICAgICcuL2Nzcy9waG90b3N3aXBlLmNzcycsXG4gICAgJy4vY3NzL2RlZmF1bHQtc2tpbi9kZWZhdWx0LXNraW4uY3NzJ1xuICBdLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIFBob3RvU3dpcGVDb21wb25lbnQge1xuICBAT3V0cHV0KCkgb25EZXN0cm95ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBWaWV3Q2hpbGQoJ3Bob3RvU3dpcGUnKSBwaG90b1N3aXBlOiBFbGVtZW50UmVmO1xuXG4gIHByaXZhdGUgZ2FsbGVyeTogYW55O1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuXG4gIH1cblxuICBvcGVuKGl0ZW1zOiBQaG90b1tdLCBvcHRpb25zPzogUGhvdG9Td2lwZU9wdGlvbnMpIHtcblxuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHtcbiAgICAgIGluZGV4OiAwIC8vIHN0YXJ0IGF0IGZpcnN0IHNsaWRlXG4gICAgfTtcblxuICAgIGlmIChvcHRpb25zLmNsaWNrRWxlbWVudCkge1xuXG4gICAgICBvcHRpb25zLmdldFRodW1iQm91bmRzRm4gPSBmdW5jdGlvbihpbmRleCkge1xuICAgICAgICBsZXQgcGFnZVlTY3JvbGwgPSB3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCxcbiAgICAgICAgICByZWN0ID0gb3B0aW9ucy5jbGlja0VsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIHJldHVybiB7eDogcmVjdC5sZWZ0LCB5OiByZWN0LnRvcCArIHBhZ2VZU2Nyb2xsLCB3OiByZWN0LndpZHRofTtcbiAgICAgIH07XG5cbiAgICB9XG5cbiAgICAvLyBJbml0aWFsaXplcyBhbmQgb3BlbnMgUGhvdG9Td2lwZVxuICAgIHRoaXMuZ2FsbGVyeSA9IG5ldyBQaG90b1N3aXBlKHRoaXMucGhvdG9Td2lwZS5uYXRpdmVFbGVtZW50LCBQaG90b1N3aXBlVUlfRGVmYXVsdCwgaXRlbXMsIG9wdGlvbnMpO1xuXG4gICAgdGhpcy5nYWxsZXJ5Lmxpc3RlbignZGVzdHJveScsICgpID0+IHtcbiAgICAgIHRoaXMub25EZXN0cm95LmVtaXQodHJ1ZSk7XG4gICAgfSk7XG5cbiAgICAvLyBEeW5hbWljIGxvYWQgaW1hZ2VcbiAgICB0aGlzLmdhbGxlcnkubGlzdGVuKCdnZXR0aW5nRGF0YScsIChpbmRleCwgaXRlbSkgPT4ge1xuICAgICAgaWYgKGl0ZW0uc2l6ZUR5bmFtaWMpIHsgLy8gdW5rbm93biBzaXplXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGxldCBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgICBpbWcub25sb2FkID0gKCkgPT4geyAvLyB3aWxsIGdldCBzaXplIGFmdGVyIGxvYWRcbiAgICAgICAgICAgIGl0ZW0udyA9IGltZy53aWR0aDsgLy8gc2V0IGltYWdlIHdpZHRoXG4gICAgICAgICAgICBpdGVtLmggPSBpbWcuaGVpZ2h0OyAvLyBzZXQgaW1hZ2UgaGVpZ2h0XG4gICAgICAgICAgICB0aGlzLmdhbGxlcnkuaW52YWxpZGF0ZUN1cnJJdGVtcygpOyAvLyByZSBpbml0IEl0ZW1zXG4gICAgICAgICAgICB0aGlzLmdhbGxlcnkudXBkYXRlU2l6ZSh0cnVlKTsgLy8gcmUgaW5pdCBJdGVtc1xuICAgICAgICAgIH07XG4gICAgICAgICAgaW1nLnNyYyA9IGl0ZW0uc3JjOyAvLyBsZXQncyBkb3dubG9hZCBpbWFnZVxuICAgICAgICB9LCAzMDApO1xuICAgICAgICBkZWxldGUgaXRlbS5zaXplRHluYW1pYztcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuZ2FsbGVyeS5pbml0KCk7XG5cbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5nYWxsZXJ5LmRlc3Ryb3koKTtcbiAgfVxufVxuIl19