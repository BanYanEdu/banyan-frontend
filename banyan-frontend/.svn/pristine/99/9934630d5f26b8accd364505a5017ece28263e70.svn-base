/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as ResizeSensor from 'resize-sensor';
export class StickyBar {
    /**
     * @param {?} options
     */
    constructor(options) {
        this.topSpace = 5;
        this.bottomSpace = 5;
        this.onScroll = this.onScroll.bind(this);
        this.init(options);
    }
    /**
     * @param {?} options
     * @return {?}
     */
    init(options) {
        for (const k in options) {
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
        () => {
            if (this.preventResize) {
                this.preventResize = false;
                return;
            }
            if (!this.isFixed()) {
                return;
            }
            this.clearFixed();
            this.onScroll();
        }));
        (this.scroller || window).addEventListener('scroll', this.onScroll);
    }
    /**
     * @return {?}
     */
    onScroll() {
        /** @type {?} */
        let scrollerBounding;
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
        const barBounding = this.bar.getBoundingClientRect();
        /** @type {?} */
        const staticBounding = this.temp.getBoundingClientRect();
        /** @type {?} */
        const isCanScrollFixed = scrollerBounding.scrollHeight >
            scrollerBounding.scrollTop + staticBounding.top + barBounding.height + 50;
        if (!isCanScrollFixed) {
            if (this.isFixed()) {
                this.clearFixed();
            }
            return;
        }
        /** @type {?} */
        const barTop = this.isFixed() ? staticBounding.top : barBounding.top;
        /** @type {?} */
        const barAboveTop = barTop - this.topSpace <= scrollerBounding.top;
        /** @type {?} */
        const barAboveBottom = barTop + barBounding.height + this.bottomSpace <= scrollerBounding.top + scrollerBounding.height;
        if (barAboveTop && barAboveBottom) {
            if (!this.isFixed()) {
                /** @type {?} */
                let topFixed = scrollerBounding.top + this.topSpace;
                // content fixed's height greater than scroller's height
                /** @type {?} */
                const distance = barBounding.height + this.bottomSpace + this.topSpace - scrollerBounding.height;
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
            const barAboveTopStatic = barTop <= scrollerBounding.top;
            /** @type {?} */
            const barAboveBottomStatic = barTop + barBounding.height <= scrollerBounding.top + scrollerBounding.height;
            if (barAboveTopStatic && barAboveBottomStatic) {
                return;
            }
            this.clearFixed();
        }
    }
    /**
     * @return {?}
     */
    destroy() {
        if (this.sensor) {
            (this.scroller || window).removeEventListener('scroll', this.onScroll);
            this.resetBarCss();
            this.sensor.detach();
            this.temp.remove();
            Object.keys(this).forEach((/**
             * @param {?} k
             * @return {?}
             */
            k => delete this[k]));
        }
    }
    /**
     * @private
     * @return {?}
     */
    resizeDimension() {
        this.bar.style.width = this.temp.clientWidth + 'px';
        this.temp.style.height = this.getHeightBar() + 'px';
    }
    /**
     * @private
     * @return {?}
     */
    getHeightBar() {
        return parseFloat(getComputedStyle(this.bar).height);
    }
    /**
     * @private
     * @param {?} fixed
     * @return {?}
     */
    setFixed(fixed) {
        this.fixed = fixed;
    }
    /**
     * @private
     * @return {?}
     */
    isFixed() {
        return this.fixed;
    }
    /**
     * @private
     * @return {?}
     */
    clearFixed() {
        this.resetBarCss();
        this.temp.style.height = '';
        this.setFixed(false);
    }
    /**
     * @private
     * @return {?}
     */
    resetBarCss() {
        this.setCssBar({
            top: '',
            position: '',
            transform: '',
            width: ''
        });
    }
    /**
     * @private
     * @param {?} css
     * @return {?}
     */
    setCssBar(css) {
        for (const k in css) {
            this.bar.style[k] = css[k];
        }
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RpY2t5LWJhci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtdWkvIiwic291cmNlcyI6WyJzcmMvc3RpY2t5LWJhci9zdGlja3ktYmFyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEtBQUssWUFBWSxNQUFNLGVBQWUsQ0FBQztBQUU5QyxNQUFNLE9BQU8sU0FBUzs7OztJQVlwQixZQUFZLE9BQXlCO1FBSHJDLGFBQVEsR0FBRyxDQUFDLENBQUM7UUFDYixnQkFBVyxHQUFHLENBQUMsQ0FBQztRQUdkLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNyQixDQUFDOzs7OztJQUVELElBQUksQ0FBQyxPQUF5QjtRQUM1QixLQUFLLE1BQU0sQ0FBQyxJQUFJLE9BQU8sRUFBRTtZQUN2QixJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3RCO1FBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDYixPQUFPLENBQUMsS0FBSyxDQUFDLDZDQUE2QyxDQUFDLENBQUM7WUFDN0QsT0FBTztTQUNSO1FBRUQsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQztRQUV4QyxJQUFJLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLHNDQUFzQyxDQUFDO1FBQ2pFLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2pELG1DQUFtQztRQUVuQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUks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Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUmVzaXplU2Vuc29yIGZyb20gJ3Jlc2l6ZS1zZW5zb3InO1xuXG5leHBvcnQgY2xhc3MgU3RpY2t5QmFyIHtcbiAgcHJpdmF0ZSB0ZW1wOiBIVE1MRWxlbWVudDtcbiAgcHJpdmF0ZSBzZW5zb3I6IGFueTtcbiAgcHJpdmF0ZSBmaXhlZDogYm9vbGVhbjtcbiAgcHJpdmF0ZSBwcmV2ZW50UmVzaXplOiBib29sZWFuO1xuXG4gIGNvbnRhaW5lcjogSFRNTEVsZW1lbnQ7XG4gIHNjcm9sbGVyOiBIVE1MRWxlbWVudDtcbiAgYmFyOiBIVE1MRWxlbWVudDtcbiAgdG9wU3BhY2UgPSA1O1xuICBib3R0b21TcGFjZSA9IDU7XG5cbiAgY29uc3RydWN0b3Iob3B0aW9uczogU3RpY2t5QmFyT3B0aW9ucykge1xuICAgIHRoaXMub25TY3JvbGwgPSB0aGlzLm9uU2Nyb2xsLmJpbmQodGhpcyk7XG4gICAgdGhpcy5pbml0KG9wdGlvbnMpO1xuICB9XG5cbiAgaW5pdChvcHRpb25zOiBTdGlja3lCYXJPcHRpb25zKSB7XG4gICAgZm9yIChjb25zdCBrIGluIG9wdGlvbnMpIHtcbiAgICAgIHRoaXNba10gPSBvcHRpb25zW2tdO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5iYXIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ1tTdGlja3lCYXJdIE1pc3Npbmcgc2Nyb2xsZXIgb3IgYmFyIGVsZW1lbnQnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmNvbnRhaW5lciA9IHRoaXMuYmFyLnBhcmVudEVsZW1lbnQ7XG5cbiAgICB0aGlzLnRlbXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLnRlbXAuc3R5bGUuY3NzVGV4dCA9ICdwb3NpdGlvbjogcmVsYXRpdmU7IG92ZXJmbG93OiBoaWRkZW4nO1xuICAgIHRoaXMuY29udGFpbmVyLmluc2VydEJlZm9yZSh0aGlzLnRlbXAsIHRoaXMuYmFyKTtcbiAgICAvLyB0aGlzLnRlbXAuYXBwZW5kQ2hpbGQodGhpcy5iYXIpO1xuXG4gICAgdGhpcy5zZW5zb3IgPSBuZXcgUmVzaXplU2Vuc29yKHRoaXMudGVtcCwgKCkgPT4ge1xuICAgICAgaWYgKHRoaXMucHJldmVudFJlc2l6ZSkge1xuICAgICAgICB0aGlzLnByZXZlbnRSZXNpemUgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKCF0aGlzLmlzRml4ZWQoKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLmNsZWFyRml4ZWQoKTtcbiAgICAgIHRoaXMub25TY3JvbGwoKTtcbiAgICB9KTtcblxuICAgICh0aGlzLnNjcm9sbGVyIHx8IHdpbmRvdykuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5vblNjcm9sbCk7XG4gIH1cblxuICBvblNjcm9sbCgpIHtcbiAgICBsZXQgc2Nyb2xsZXJCb3VuZGluZztcblxuICAgIGlmICh0aGlzLnNjcm9sbGVyKSB7XG4gICAgICBzY3JvbGxlckJvdW5kaW5nID0gdGhpcy5zY3JvbGxlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIHNjcm9sbGVyQm91bmRpbmdbJ3Njcm9sbEhlaWdodCddID0gdGhpcy5zY3JvbGxlci5zY3JvbGxIZWlnaHQ7XG4gICAgICBzY3JvbGxlckJvdW5kaW5nWydzY3JvbGxUb3AnXSA9IHRoaXMuc2Nyb2xsZXIuc2Nyb2xsVG9wO1xuICAgIH0gZWxzZSB7XG4gICAgICBzY3JvbGxlckJvdW5kaW5nID0ge1xuICAgICAgICBzY3JvbGxIZWlnaHQ6IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxIZWlnaHQsXG4gICAgICAgIHNjcm9sbFRvcDogcGFnZVlPZmZzZXQgfHwgc2Nyb2xsWSxcbiAgICAgICAgdG9wOiAwLFxuICAgICAgICBoZWlnaHQ6IGlubmVySGVpZ2h0XG4gICAgICB9O1xuICAgIH1cblxuICAgIGNvbnN0IGJhckJvdW5kaW5nID0gdGhpcy5iYXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc3Qgc3RhdGljQm91bmRpbmcgPSB0aGlzLnRlbXAuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICBjb25zdCBpc0NhblNjcm9sbEZpeGVkID0gc2Nyb2xsZXJCb3VuZGluZy5zY3JvbGxIZWlnaHQgPlxuICAgICAgc2Nyb2xsZXJCb3VuZGluZy5zY3JvbGxUb3AgKyBzdGF0aWNCb3VuZGluZy50b3AgKyBiYXJCb3VuZGluZy5oZWlnaHQgKyA1MDtcblxuICAgIGlmICghaXNDYW5TY3JvbGxGaXhlZCkge1xuICAgICAgaWYgKHRoaXMuaXNGaXhlZCgpKSB7XG4gICAgICAgIHRoaXMuY2xlYXJGaXhlZCgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGJhclRvcCA9IHRoaXMuaXNGaXhlZCgpID8gc3RhdGljQm91bmRpbmcudG9wIDogYmFyQm91bmRpbmcudG9wO1xuICAgIGNvbnN0IGJhckFib3ZlVG9wID0gYmFyVG9wIC0gdGhpcy50b3BTcGFjZSA8PSBzY3JvbGxlckJvdW5kaW5nLnRvcDtcbiAgICBjb25zdCBiYXJBYm92ZUJvdHRvbSA9IGJhclRvcCArIGJhckJvdW5kaW5nLmhlaWdodCArIHRoaXMuYm90dG9tU3BhY2UgPD0gc2Nyb2xsZXJCb3VuZGluZy50b3AgKyBzY3JvbGxlckJvdW5kaW5nLmhlaWdodDtcblxuICAgIGlmIChiYXJBYm92ZVRvcCAmJiBiYXJBYm92ZUJvdHRvbSkge1xuXG4gICAgICBpZiAoIXRoaXMuaXNGaXhlZCgpKSB7XG4gICAgICAgIGxldCB0b3BGaXhlZCA9IHNjcm9sbGVyQm91bmRpbmcudG9wICsgdGhpcy50b3BTcGFjZTtcblxuICAgICAgICAvLyBjb250ZW50IGZpeGVkJ3MgaGVpZ2h0IGdyZWF0ZXIgdGhhbiBzY3JvbGxlcidzIGhlaWdodFxuICAgICAgICBjb25zdCBkaXN0YW5jZSA9IGJhckJvdW5kaW5nLmhlaWdodCArIHRoaXMuYm90dG9tU3BhY2UgKyB0aGlzLnRvcFNwYWNlIC0gc2Nyb2xsZXJCb3VuZGluZy5oZWlnaHQ7XG4gICAgICAgIGlmIChkaXN0YW5jZSA+IDApIHtcbiAgICAgICAgICB0b3BGaXhlZCAtPSBkaXN0YW5jZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucHJldmVudFJlc2l6ZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVzaXplRGltZW5zaW9uKCk7XG4gICAgICAgIHRoaXMuc2V0Q3NzQmFyKHtcbiAgICAgICAgICB0b3A6IHRvcEZpeGVkICsgJ3B4JyxcbiAgICAgICAgICBwb3NpdGlvbjogJ2ZpeGVkJ1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zZXRGaXhlZCh0cnVlKTtcbiAgICAgIH1cblxuICAgIH0gZWxzZSBpZiAodGhpcy5pc0ZpeGVkKCkpIHtcbiAgICAgIGNvbnN0IGJhckFib3ZlVG9wU3RhdGljID0gYmFyVG9wIDw9IHNjcm9sbGVyQm91bmRpbmcudG9wO1xuICAgICAgY29uc3QgYmFyQWJvdmVCb3R0b21TdGF0aWMgPSBiYXJUb3AgKyBiYXJCb3VuZGluZy5oZWlnaHQgPD0gc2Nyb2xsZXJCb3VuZGluZy50b3AgKyBzY3JvbGxlckJvdW5kaW5nLmhlaWdodDtcbiAgICAgIGlmIChiYXJBYm92ZVRvcFN0YXRpYyAmJiBiYXJBYm92ZUJvdHRvbVN0YXRpYykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLmNsZWFyRml4ZWQoKTtcbiAgICB9XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIGlmICh0aGlzLnNlbnNvcikge1xuICAgICAgKHRoaXMuc2Nyb2xsZXIgfHwgd2luZG93KS5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLm9uU2Nyb2xsKTtcbiAgICAgIHRoaXMucmVzZXRCYXJDc3MoKTtcbiAgICAgIHRoaXMuc2Vuc29yLmRldGFjaCgpO1xuICAgICAgdGhpcy50ZW1wLnJlbW92ZSgpO1xuICAgICAgT2JqZWN0LmtleXModGhpcykuZm9yRWFjaChrID0+IGRlbGV0ZSB0aGlzW2tdKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHJlc2l6ZURpbWVuc2lvbigpIHtcbiAgICB0aGlzLmJhci5zdHlsZS53aWR0aCA9IHRoaXMudGVtcC5jbGllbnRXaWR0aCArICdweCc7XG4gICAgdGhpcy50ZW1wLnN0eWxlLmhlaWdodCA9IHRoaXMuZ2V0SGVpZ2h0QmFyKCkgKyAncHgnO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRIZWlnaHRCYXIoKSB7XG4gICAgcmV0dXJuIHBhcnNlRmxvYXQoZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmJhcikuaGVpZ2h0KTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0Rml4ZWQoZml4ZWQ6IGJvb2xlYW4pIHtcbiAgICB0aGlzLmZpeGVkID0gZml4ZWQ7XG4gIH1cblxuICBwcml2YXRlIGlzRml4ZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZml4ZWQ7XG4gIH1cblxuICBwcml2YXRlIGNsZWFyRml4ZWQoKSB7XG4gICAgdGhpcy5yZXNldEJhckNzcygpO1xuICAgIHRoaXMudGVtcC5zdHlsZS5oZWlnaHQgPSAnJztcbiAgICB0aGlzLnNldEZpeGVkKGZhbHNlKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVzZXRCYXJDc3MoKSB7XG4gICAgdGhpcy5zZXRDc3NCYXIoe1xuICAgICAgdG9wOiAnJyxcbiAgICAgIHBvc2l0aW9uOiAnJyxcbiAgICAgIHRyYW5zZm9ybTogJycsXG4gICAgICB3aWR0aDogJydcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0Q3NzQmFyKGNzcykge1xuICAgIGZvciAoY29uc3QgayBpbiBjc3MpIHtcbiAgICAgIHRoaXMuYmFyLnN0eWxlW2tdID0gY3NzW2tdO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFN0aWNreUJhck9wdGlvbnMge1xuICBiYXI6IEhUTUxFbGVtZW50O1xuICBzY3JvbGxlcj86IEhUTUxFbGVtZW50O1xuICBjb250YWluZXI/OiBIVE1MRWxlbWVudDtcbiAgdG9wU3BhY2U/OiBudW1iZXI7XG4gIGJvdHRvbVNwYWNlPzogbnVtYmVyO1xufVxuIl19