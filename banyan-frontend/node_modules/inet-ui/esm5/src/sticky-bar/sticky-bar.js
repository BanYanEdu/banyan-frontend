/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as ResizeSensor from 'resize-sensor';
var StickyBar = /** @class */ (function () {
    function StickyBar(options) {
        this.topSpace = 5;
        this.bottomSpace = 5;
        this.onScroll = this.onScroll.bind(this);
        this.init(options);
    }
    /**
     * @param {?} options
     * @return {?}
     */
    StickyBar.prototype.init = /**
     * @param {?} options
     * @return {?}
     */
    function (options) {
        var _this = this;
        for (var k in options) {
            this[k] = options[k];
        }
        if (!this.bar) {
            console.error('[StickyBar] Missing scroller or bar element');
            return;
        }
        this.container = this.bar.parentElement;
        this.temp = document.createElement('div');
        this.temp.style.cssText = 'position: relative; overflow: hidden';
        this.container.insertBefore(this.temp, this.bar);
        // this.temp.appendChild(this.bar);
        this.sensor = new ResizeSensor(this.temp, (/**
         * @return {?}
         */
        function () {
            if (_this.preventResize) {
                _this.preventResize = false;
                return;
            }
            if (!_this.isFixed()) {
                return;
            }
            _this.clearFixed();
            _this.onScroll();
        }));
        (this.scroller || window).addEventListener('scroll', this.onScroll);
    };
    /**
     * @return {?}
     */
    StickyBar.prototype.onScroll = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var scrollerBounding;
        if (this.scroller) {
            scrollerBounding = this.scroller.getBoundingClientRect();
            scrollerBounding['scrollHeight'] = this.scroller.scrollHeight;
            scrollerBounding['scrollTop'] = this.scroller.scrollTop;
        }
        else {
            scrollerBounding = {
                scrollHeight: document.documentElement.scrollHeight,
                scrollTop: pageYOffset || scrollY,
                top: 0,
                height: innerHeight
            };
        }
        /** @type {?} */
        var barBounding = this.bar.getBoundingClientRect();
        /** @type {?} */
        var staticBounding = this.temp.getBoundingClientRect();
        /** @type {?} */
        var isCanScrollFixed = scrollerBounding.scrollHeight >
            scrollerBounding.scrollTop + staticBounding.top + barBounding.height + 50;
        if (!isCanScrollFixed) {
            if (this.isFixed()) {
                this.clearFixed();
            }
            return;
        }
        /** @type {?} */
        var barTop = this.isFixed() ? staticBounding.top : barBounding.top;
        /** @type {?} */
        var barAboveTop = barTop - this.topSpace <= scrollerBounding.top;
        /** @type {?} */
        var barAboveBottom = barTop + barBounding.height + this.bottomSpace <= scrollerBounding.top + scrollerBounding.height;
        if (barAboveTop && barAboveBottom) {
            if (!this.isFixed()) {
                /** @type {?} */
                var topFixed = scrollerBounding.top + this.topSpace;
                // content fixed's height greater than scroller's height
                /** @type {?} */
                var distance = barBounding.height + this.bottomSpace + this.topSpace - scrollerBounding.height;
                if (distance > 0) {
                    topFixed -= distance;
                }
                this.preventResize = true;
                this.resizeDimension();
                this.setCssBar({
                    top: topFixed + 'px',
                    position: 'fixed'
                });
                this.setFixed(true);
            }
        }
        else if (this.isFixed()) {
            /** @type {?} */
            var barAboveTopStatic = barTop <= scrollerBounding.top;
            /** @type {?} */
            var barAboveBottomStatic = barTop + barBounding.height <= scrollerBounding.top + scrollerBounding.height;
            if (barAboveTopStatic && barAboveBottomStatic) {
                return;
            }
            this.clearFixed();
        }
    };
    /**
     * @return {?}
     */
    StickyBar.prototype.destroy = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.sensor) {
            (this.scroller || window).removeEventListener('scroll', this.onScroll);
            this.resetBarCss();
            this.sensor.detach();
            this.temp.remove();
            Object.keys(this).forEach((/**
             * @param {?} k
             * @return {?}
             */
            function (k) { return delete _this[k]; }));
        }
    };
    /**
     * @private
     * @return {?}
     */
    StickyBar.prototype.resizeDimension = /**
     * @private
     * @return {?}
     */
    function () {
        this.bar.style.width = this.temp.clientWidth + 'px';
        this.temp.style.height = this.getHeightBar() + 'px';
    };
    /**
     * @private
     * @return {?}
     */
    StickyBar.prototype.getHeightBar = /**
     * @private
     * @return {?}
     */
    function () {
        return parseFloat(getComputedStyle(this.bar).height);
    };
    /**
     * @private
     * @param {?} fixed
     * @return {?}
     */
    StickyBar.prototype.setFixed = /**
     * @private
     * @param {?} fixed
     * @return {?}
     */
    function (fixed) {
        this.fixed = fixed;
    };
    /**
     * @private
     * @return {?}
     */
    StickyBar.prototype.isFixed = /**
     * @private
     * @return {?}
     */
    function () {
        return this.fixed;
    };
    /**
     * @private
     * @return {?}
     */
    StickyBar.prototype.clearFixed = /**
     * @private
     * @return {?}
     */
    function () {
        this.resetBarCss();
        this.temp.style.height = '';
        this.setFixed(false);
    };
    /**
     * @private
     * @return {?}
     */
    StickyBar.prototype.resetBarCss = /**
     * @private
     * @return {?}
     */
    function () {
        this.setCssBar({
            top: '',
            position: '',
            transform: '',
            width: ''
        });
    };
    /**
     * @private
     * @param {?} css
     * @return {?}
     */
    StickyBar.prototype.setCssBar = /**
     * @private
     * @param {?} css
     * @return {?}
     */
    function (css) {
        for (var k in css) {
            this.bar.style[k] = css[k];
        }
    };
    return StickyBar;
}());
export { StickyBar };
if (false) {
    /**
     * @type {?}
     * @private
     */
    StickyBar.prototype.temp;
    /**
     * @type {?}
     * @private
     */
    StickyBar.prototype.sensor;
    /**
     * @type {?}
     * @private
     */
    StickyBar.prototype.fixed;
    /**
     * @type {?}
     * @private
     */
    StickyBar.prototype.preventResize;
    /** @type {?} */
    StickyBar.prototype.container;
    /** @type {?} */
    StickyBar.prototype.scroller;
    /** @type {?} */
    StickyBar.prototype.bar;
    /** @type {?} */
    StickyBar.prototype.topSpace;
    /** @type {?} */
    StickyBar.prototype.bottomSpace;
}
/**
 * @record
 */
export function StickyBarOptions() { }
if (false) {
    /** @type {?} */
    StickyBarOptions.prototype.bar;
    /** @type {?|undefined} */
    StickyBarOptions.prototype.scroller;
    /** @type {?|undefined} */
    StickyBarOptions.prototype.container;
    /** @type {?|undefined} */
    StickyBarOptions.prototype.topSpace;
    /** @type {?|undefined} */
    StickyBarOptions.prototype.bottomSpace;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RpY2t5LWJhci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtdWkvIiwic291cmNlcyI6WyJzcmMvc3RpY2t5LWJhci9zdGlja3ktYmFyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEtBQUssWUFBWSxNQUFNLGVBQWUsQ0FBQztBQUU5QztJQVlFLG1CQUFZLE9BQXlCO1FBSHJDLGFBQVEsR0FBRyxDQUFDLENBQUM7UUFDYixnQkFBVyxHQUFHLENBQUMsQ0FBQztRQUdkLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNyQixDQUFDOzs7OztJQUVELHdCQUFJOzs7O0lBQUosVUFBSyxPQUF5QjtRQUE5QixpQkE4QkM7UUE3QkMsS0FBSyxJQUFNLENBQUMsSUFBSSxPQUFPLEVBQUU7WUFDdkIsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN0QjtRQUVELElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ2IsT0FBTyxDQUFDLEtBQUssQ0FBQyw2Q0FBNkMsQ0FBQyxDQUFDO1lBQzdELE9BQU87U0FDUjtRQUVELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUM7UUFFeEMsSUFBSSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxzQ0FBc0MsQ0FBQztRQUNqRSxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNqRCxtQ0FBbUM7UUFFbkMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJ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c0I7O0lBQ3RCLHdCQUFpQjs7SUFDakIsNkJBQWE7O0lBQ2IsZ0NBQWdCOzs7OztBQXVKbEIsc0NBTUM7OztJQUxDLCtCQUFpQjs7SUFDakIsb0NBQXVCOztJQUN2QixxQ0FBd0I7O0lBQ3hCLG9DQUFrQjs7SUFDbEIsdUNBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUmVzaXplU2Vuc29yIGZyb20gJ3Jlc2l6ZS1zZW5zb3InO1xuXG5leHBvcnQgY2xhc3MgU3RpY2t5QmFyIHtcbiAgcHJpdmF0ZSB0ZW1wOiBIVE1MRWxlbWVudDtcbiAgcHJpdmF0ZSBzZW5zb3I6IGFueTtcbiAgcHJpdmF0ZSBmaXhlZDogYm9vbGVhbjtcbiAgcHJpdmF0ZSBwcmV2ZW50UmVzaXplOiBib29sZWFuO1xuXG4gIGNvbnRhaW5lcjogSFRNTEVsZW1lbnQ7XG4gIHNjcm9sbGVyOiBIVE1MRWxlbWVudDtcbiAgYmFyOiBIVE1MRWxlbWVudDtcbiAgdG9wU3BhY2UgPSA1O1xuICBib3R0b21TcGFjZSA9IDU7XG5cbiAgY29uc3RydWN0b3Iob3B0aW9uczogU3RpY2t5QmFyT3B0aW9ucykge1xuICAgIHRoaXMub25TY3JvbGwgPSB0aGlzLm9uU2Nyb2xsLmJpbmQodGhpcyk7XG4gICAgdGhpcy5pbml0KG9wdGlvbnMpO1xuICB9XG5cbiAgaW5pdChvcHRpb25zOiBTdGlja3lCYXJPcHRpb25zKSB7XG4gICAgZm9yIChjb25zdCBrIGluIG9wdGlvbnMpIHtcbiAgICAgIHRoaXNba10gPSBvcHRpb25zW2tdO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5iYXIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ1tTdGlja3lCYXJdIE1pc3Npbmcgc2Nyb2xsZXIgb3IgYmFyIGVsZW1lbnQnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmNvbnRhaW5lciA9IHRoaXMuYmFyLnBhcmVudEVsZW1lbnQ7XG5cbiAgICB0aGlzLnRlbXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLnRlbXAuc3R5bGUuY3NzVGV4dCA9ICdwb3NpdGlvbjogcmVsYXRpdmU7IG92ZXJmbG93OiBoaWRkZW4nO1xuICAgIHRoaXMuY29udGFpbmVyLmluc2VydEJlZm9yZSh0aGlzLnRlbXAsIHRoaXMuYmFyKTtcbiAgICAvLyB0aGlzLnRlbXAuYXBwZW5kQ2hpbGQodGhpcy5iYXIpO1xuXG4gICAgdGhpcy5zZW5zb3IgPSBuZXcgUmVzaXplU2Vuc29yKHRoaXMudGVtcCwgKCkgPT4ge1xuICAgICAgaWYgKHRoaXMucHJldmVudFJlc2l6ZSkge1xuICAgICAgICB0aGlzLnByZXZlbnRSZXNpemUgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKCF0aGlzLmlzRml4ZWQoKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLmNsZWFyRml4ZWQoKTtcbiAgICAgIHRoaXMub25TY3JvbGwoKTtcbiAgICB9KTtcblxuICAgICh0aGlzLnNjcm9sbGVyIHx8IHdpbmRvdykuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5vblNjcm9sbCk7XG4gIH1cblxuICBvblNjcm9sbCgpIHtcbiAgICBsZXQgc2Nyb2xsZXJCb3VuZGluZztcblxuICAgIGlmICh0aGlzLnNjcm9sbGVyKSB7XG4gICAgICBzY3JvbGxlckJvdW5kaW5nID0gdGhpcy5zY3JvbGxlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIHNjcm9sbGVyQm91bmRpbmdbJ3Njcm9sbEhlaWdodCddID0gdGhpcy5zY3JvbGxlci5zY3JvbGxIZWlnaHQ7XG4gICAgICBzY3JvbGxlckJvdW5kaW5nWydzY3JvbGxUb3AnXSA9IHRoaXMuc2Nyb2xsZXIuc2Nyb2xsVG9wO1xuICAgIH0gZWxzZSB7XG4gICAgICBzY3JvbGxlckJvdW5kaW5nID0ge1xuICAgICAgICBzY3JvbGxIZWlnaHQ6IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxIZWlnaHQsXG4gICAgICAgIHNjcm9sbFRvcDogcGFnZVlPZmZzZXQgfHwgc2Nyb2xsWSxcbiAgICAgICAgdG9wOiAwLFxuICAgICAgICBoZWlnaHQ6IGlubmVySGVpZ2h0XG4gICAgICB9O1xuICAgIH1cblxuICAgIGNvbnN0IGJhckJvdW5kaW5nID0gdGhpcy5iYXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc3Qgc3RhdGljQm91bmRpbmcgPSB0aGlzLnRlbXAuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICBjb25zdCBpc0NhblNjcm9sbEZpeGVkID0gc2Nyb2xsZXJCb3VuZGluZy5zY3JvbGxIZWlnaHQgPlxuICAgICAgc2Nyb2xsZXJCb3VuZGluZy5zY3JvbGxUb3AgKyBzdGF0aWNCb3VuZGluZy50b3AgKyBiYXJCb3VuZGluZy5oZWlnaHQgKyA1MDtcblxuICAgIGlmICghaXNDYW5TY3JvbGxGaXhlZCkge1xuICAgICAgaWYgKHRoaXMuaXNGaXhlZCgpKSB7XG4gICAgICAgIHRoaXMuY2xlYXJGaXhlZCgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGJhclRvcCA9IHRoaXMuaXNGaXhlZCgpID8gc3RhdGljQm91bmRpbmcudG9wIDogYmFyQm91bmRpbmcudG9wO1xuICAgIGNvbnN0IGJhckFib3ZlVG9wID0gYmFyVG9wIC0gdGhpcy50b3BTcGFjZSA8PSBzY3JvbGxlckJvdW5kaW5nLnRvcDtcbiAgICBjb25zdCBiYXJBYm92ZUJvdHRvbSA9IGJhclRvcCArIGJhckJvdW5kaW5nLmhlaWdodCArIHRoaXMuYm90dG9tU3BhY2UgPD0gc2Nyb2xsZXJCb3VuZGluZy50b3AgKyBzY3JvbGxlckJvdW5kaW5nLmhlaWdodDtcblxuICAgIGlmIChiYXJBYm92ZVRvcCAmJiBiYXJBYm92ZUJvdHRvbSkge1xuXG4gICAgICBpZiAoIXRoaXMuaXNGaXhlZCgpKSB7XG4gICAgICAgIGxldCB0b3BGaXhlZCA9IHNjcm9sbGVyQm91bmRpbmcudG9wICsgdGhpcy50b3BTcGFjZTtcblxuICAgICAgICAvLyBjb250ZW50IGZpeGVkJ3MgaGVpZ2h0IGdyZWF0ZXIgdGhhbiBzY3JvbGxlcidzIGhlaWdodFxuICAgICAgICBjb25zdCBkaXN0YW5jZSA9IGJhckJvdW5kaW5nLmhlaWdodCArIHRoaXMuYm90dG9tU3BhY2UgKyB0aGlzLnRvcFNwYWNlIC0gc2Nyb2xsZXJCb3VuZGluZy5oZWlnaHQ7XG4gICAgICAgIGlmIChkaXN0YW5jZSA+IDApIHtcbiAgICAgICAgICB0b3BGaXhlZCAtPSBkaXN0YW5jZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucHJldmVudFJlc2l6ZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVzaXplRGltZW5zaW9uKCk7XG4gICAgICAgIHRoaXMuc2V0Q3NzQmFyKHtcbiAgICAgICAgICB0b3A6IHRvcEZpeGVkICsgJ3B4JyxcbiAgICAgICAgICBwb3NpdGlvbjogJ2ZpeGVkJ1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zZXRGaXhlZCh0cnVlKTtcbiAgICAgIH1cblxuICAgIH0gZWxzZSBpZiAodGhpcy5pc0ZpeGVkKCkpIHtcbiAgICAgIGNvbnN0IGJhckFib3ZlVG9wU3RhdGljID0gYmFyVG9wIDw9IHNjcm9sbGVyQm91bmRpbmcudG9wO1xuICAgICAgY29uc3QgYmFyQWJvdmVCb3R0b21TdGF0aWMgPSBiYXJUb3AgKyBiYXJCb3VuZGluZy5oZWlnaHQgPD0gc2Nyb2xsZXJCb3VuZGluZy50b3AgKyBzY3JvbGxlckJvdW5kaW5nLmhlaWdodDtcbiAgICAgIGlmIChiYXJBYm92ZVRvcFN0YXRpYyAmJiBiYXJBYm92ZUJvdHRvbVN0YXRpYykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLmNsZWFyRml4ZWQoKTtcbiAgICB9XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIGlmICh0aGlzLnNlbnNvcikge1xuICAgICAgKHRoaXMuc2Nyb2xsZXIgfHwgd2luZG93KS5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLm9uU2Nyb2xsKTtcbiAgICAgIHRoaXMucmVzZXRCYXJDc3MoKTtcbiAgICAgIHRoaXMuc2Vuc29yLmRldGFjaCgpO1xuICAgICAgdGhpcy50ZW1wLnJlbW92ZSgpO1xuICAgICAgT2JqZWN0LmtleXModGhpcykuZm9yRWFjaChrID0+IGRlbGV0ZSB0aGlzW2tdKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHJlc2l6ZURpbWVuc2lvbigpIHtcbiAgICB0aGlzLmJhci5zdHlsZS53aWR0aCA9IHRoaXMudGVtcC5jbGllbnRXaWR0aCArICdweCc7XG4gICAgdGhpcy50ZW1wLnN0eWxlLmhlaWdodCA9IHRoaXMuZ2V0SGVpZ2h0QmFyKCkgKyAncHgnO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRIZWlnaHRCYXIoKSB7XG4gICAgcmV0dXJuIHBhcnNlRmxvYXQoZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmJhcikuaGVpZ2h0KTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0Rml4ZWQoZml4ZWQ6IGJvb2xlYW4pIHtcbiAgICB0aGlzLmZpeGVkID0gZml4ZWQ7XG4gIH1cblxuICBwcml2YXRlIGlzRml4ZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZml4ZWQ7XG4gIH1cblxuICBwcml2YXRlIGNsZWFyRml4ZWQoKSB7XG4gICAgdGhpcy5yZXNldEJhckNzcygpO1xuICAgIHRoaXMudGVtcC5zdHlsZS5oZWlnaHQgPSAnJztcbiAgICB0aGlzLnNldEZpeGVkKGZhbHNlKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVzZXRCYXJDc3MoKSB7XG4gICAgdGhpcy5zZXRDc3NCYXIoe1xuICAgICAgdG9wOiAnJyxcbiAgICAgIHBvc2l0aW9uOiAnJyxcbiAgICAgIHRyYW5zZm9ybTogJycsXG4gICAgICB3aWR0aDogJydcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0Q3NzQmFyKGNzcykge1xuICAgIGZvciAoY29uc3QgayBpbiBjc3MpIHtcbiAgICAgIHRoaXMuYmFyLnN0eWxlW2tdID0gY3NzW2tdO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFN0aWNreUJhck9wdGlvbnMge1xuICBiYXI6IEhUTUxFbGVtZW50O1xuICBzY3JvbGxlcj86IEhUTUxFbGVtZW50O1xuICBjb250YWluZXI/OiBIVE1MRWxlbWVudDtcbiAgdG9wU3BhY2U/OiBudW1iZXI7XG4gIGJvdHRvbVNwYWNlPzogbnVtYmVyO1xufVxuIl19