/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef } from '@angular/core';
export class AutocompleteListDirective {
    /**
     * @param {?} el
     */
    constructor(el) {
        this.el = el;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.$el = $(this.el.nativeElement);
    }
    /**
     * @return {?}
     */
    open() {
        this.$el.show();
    }
    /**
     * @return {?}
     */
    hide() {
        this.$el.hide();
        this.$el.find('.active').removeClass('active');
    }
    /**
     * @param {?} e
     * @return {?}
     */
    onInput(e) {
        this.open();
        switch (e.which) {
            // arrow up
            case 38: /** @type {?} */
            let step = -1;
            // arrow down
            case 40:
                /** @type {?} */
                let $items = this.$el.children();
                if ($items.length < 1) {
                    return;
                }
                /** @type {?} */
                let $active;
                /** @type {?} */
                let index = -1;
                for (let i = 0; i < $items.length; i++) {
                    $active = $items.eq(i);
                    if ($active.hasClass('active')) {
                        $active.removeClass('active');
                        index = i;
                        break;
                    }
                }
                step = step || 1;
                // Active at first or last
                if ((index === 0 && step === -1) || (index === $items.length - 1 && step === 1)) {
                    return;
                }
                index += step;
                if (index < 0) {
                    index = $items.length - 1;
                }
                this.moveToActive($items.eq(index).addClass('active'));
                break;
            // enter
            case 13:
                this.$el.find('.active').trigger('click');
                break;
        }
    }
    // Todo: scroll to active item
    /**
     * @private
     * @param {?} $active
     * @return {?}
     */
    moveToActive($active) {
        // let scrollHeight = this.el.nativeElement.scrollHeight;
        // let height = this.el.nativeElement.clientHeight;
        // if (scrollHeight <= height) {
        //   return;
        // }
        // let scrollTop = this.el.nativeElement.scrollTop;
        // let offset = $active.offset();
        //
        // console.log(scrollTop, scrollHeight, height);
        // console.log(offset);
        // let distanceTop = offset.top - scrollTop;
        // let distanceBottom = offset.top - scrollTop + height + $active.outerHeight();
        // if (distanceTop < 0) {
        //   this.el.nativeElement.scrollTop = scrollTop - distanceTop;
        // } else if(distanceBottom > 0){
        //   this.el.nativeElement.scrollTop = scrollTop - distanceBottom;
        // }
    }
}
AutocompleteListDirective.decorators = [
    { type: Directive, args: [{
                selector: '[appAutocompleteList]',
                exportAs: 'appAutocompleteList'
            },] }
];
/** @nocollapse */
AutocompleteListDirective.ctorParameters = () => [
    { type: ElementRef }
];
if (false) {
    /** @type {?} */
    AutocompleteListDirective.prototype.$el;
    /**
     * @type {?}
     * @private
     */
    AutocompleteListDirective.prototype.el;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2NvbXBsZXRlLWxpc3QuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW5ldC11aS8iLCJzb3VyY2VzIjpbInNyYy9hdXRvY29tcGxldGUvYXV0b2NvbXBsZXRlLWxpc3QuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBUyxNQUFNLGVBQWUsQ0FBQztBQU81RCxNQUFNLE9BQU8seUJBQXlCOzs7O0lBRXBDLFlBQW9CLEVBQWM7UUFBZCxPQUFFLEdBQUYsRUFBRSxDQUFZO0lBQUksQ0FBQzs7OztJQUV2QyxRQUFRO1FBQ04sSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUN0QyxDQUFDOzs7O0lBRUQsSUFBSTtRQUNGLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDbEIsQ0FBQzs7OztJQUVELElBQUk7UUFDRixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNqRCxDQUFDOzs7OztJQUVELE9BQU8sQ0FBQyxDQUFDO1FBQ1AsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ1osUUFBUSxDQUFDLENBQUMsS0FBSyxFQUFFO1lBQ2YsV0FBVztZQUNYLEtBQUssRUFBRSxDQUFDO2dCQUNGLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNoQixhQUFhO1lBQ2IsS0FBSyxFQUFFOztvQkFDRCxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUU7Z0JBQ2hDLElBQUksTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7b0JBQ3JCLE9BQU87aUJBQ1I7O29CQUNHLE9BQU87O29CQUFFLEtBQUssR0FBRyxDQUFDLENBQUM7Z0JBQ3ZCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUN0QyxPQUFPLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDdkIsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFO3dCQUM5QixPQUFPLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO3dCQUM5QixLQUFLLEdBQUcsQ0FBQyxDQUFDO3dCQUNWLE1BQU07cUJBQ1A7aUJBQ0Y7Z0JBRUQsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLENBQUM7Z0JBRWpCLDBCQUEwQjtnQkFDMUIsSUFBSSxDQUFDLEtBQUssS0FBSyxDQUFDLElBQUksSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksSUFBSSxLQUFLLENBQUMsQ0FBQyxFQUFFO29CQUMvRSxPQUFPO2lCQUNSO2dCQUVELEtBQUssSUFBSSxJQUFJLENBQUM7Z0JBQ2QsSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFO29CQUNiLEtBQUssR0FBRyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztpQkFDM0I7Z0JBRUQsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUV2RCxNQUFNO1lBQ1IsUUFBUTtZQUNSLEtBQUssRUFBRTtnQkFDTCxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQzFDLE1BQU07U0FDVDtJQUNILENBQUM7Ozs7Ozs7SUFHTyxZQUFZLENBQUMsT0FBWTtRQUMvQix5REFBeUQ7UUFDekQsbURBQW1EO1FBQ25ELGdDQUFnQztRQUNoQyxZQUFZO1FBQ1osSUFBSTtRQUNKLG1EQUFtRDtRQUNuRCxpQ0FBaUM7UUFDakMsRUFBRTtRQUNGLGdEQUFnRDtRQUNoRCx1QkFBdUI7UUFDdkIsNENBQTRDO1FBQzVDLGdGQUFnRjtRQUNoRix5QkFBeUI7UUFDekIsK0RBQStEO1FBQy9ELGlDQUFpQztRQUNqQyxrRUFBa0U7UUFDbEUsSUFBSTtJQUNOLENBQUM7OztZQXBGRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHVCQUF1QjtnQkFDakMsUUFBUSxFQUFFLHFCQUFxQjthQUNoQzs7OztZQU5rQixVQUFVOzs7O0lBUTNCLHdDQUFTOzs7OztJQUNHLHVDQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGlyZWN0aXZlLCBFbGVtZW50UmVmLCBPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuZGVjbGFyZSBsZXQgJDogYW55O1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbYXBwQXV0b2NvbXBsZXRlTGlzdF0nLFxuICBleHBvcnRBczogJ2FwcEF1dG9jb21wbGV0ZUxpc3QnXG59KVxuZXhwb3J0IGNsYXNzIEF1dG9jb21wbGV0ZUxpc3REaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXR7XG4gICRlbDogYW55O1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBFbGVtZW50UmVmKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLiRlbCA9ICQodGhpcy5lbC5uYXRpdmVFbGVtZW50KTtcbiAgfVxuXG4gIG9wZW4oKSB7XG4gICAgdGhpcy4kZWwuc2hvdygpO1xuICB9XG5cbiAgaGlkZSgpIHtcbiAgICB0aGlzLiRlbC5oaWRlKCk7XG4gICAgdGhpcy4kZWwuZmluZCgnLmFjdGl2ZScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgfVxuXG4gIG9uSW5wdXQoZSkge1xuICAgIHRoaXMub3BlbigpO1xuICAgIHN3aXRjaCAoZS53aGljaCkge1xuICAgICAgLy8gYXJyb3cgdXBcbiAgICAgIGNhc2UgMzg6XG4gICAgICAgIGxldCBzdGVwID0gLTE7XG4gICAgICAvLyBhcnJvdyBkb3duXG4gICAgICBjYXNlIDQwOlxuICAgICAgICBsZXQgJGl0ZW1zID0gdGhpcy4kZWwuY2hpbGRyZW4oKTtcbiAgICAgICAgaWYgKCRpdGVtcy5sZW5ndGggPCAxKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCAkYWN0aXZlLCBpbmRleCA9IC0xO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8ICRpdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICRhY3RpdmUgPSAkaXRlbXMuZXEoaSk7XG4gICAgICAgICAgaWYgKCRhY3RpdmUuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XG4gICAgICAgICAgICAkYWN0aXZlLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgIGluZGV4ID0gaTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHN0ZXAgPSBzdGVwIHx8IDE7XG5cbiAgICAgICAgLy8gQWN0aXZlIGF0IGZpcnN0IG9yIGxhc3RcbiAgICAgICAgaWYgKChpbmRleCA9PT0gMCAmJiBzdGVwID09PSAtMSkgfHwgKGluZGV4ID09PSAkaXRlbXMubGVuZ3RoIC0gMSAmJiBzdGVwID09PSAxKSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGluZGV4ICs9IHN0ZXA7XG4gICAgICAgIGlmIChpbmRleCA8IDApIHtcbiAgICAgICAgICBpbmRleCA9ICRpdGVtcy5sZW5ndGggLSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5tb3ZlVG9BY3RpdmUoJGl0ZW1zLmVxKGluZGV4KS5hZGRDbGFzcygnYWN0aXZlJykpO1xuICAgICAgICBcbiAgICAgICAgYnJlYWs7XG4gICAgICAvLyBlbnRlclxuICAgICAgY2FzZSAxMzpcbiAgICAgICAgdGhpcy4kZWwuZmluZCgnLmFjdGl2ZScpLnRyaWdnZXIoJ2NsaWNrJyk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIC8vIFRvZG86IHNjcm9sbCB0byBhY3RpdmUgaXRlbVxuICBwcml2YXRlIG1vdmVUb0FjdGl2ZSgkYWN0aXZlOiBhbnkpIHtcbiAgICAvLyBsZXQgc2Nyb2xsSGVpZ2h0ID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LnNjcm9sbEhlaWdodDtcbiAgICAvLyBsZXQgaGVpZ2h0ID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LmNsaWVudEhlaWdodDtcbiAgICAvLyBpZiAoc2Nyb2xsSGVpZ2h0IDw9IGhlaWdodCkge1xuICAgIC8vICAgcmV0dXJuO1xuICAgIC8vIH1cbiAgICAvLyBsZXQgc2Nyb2xsVG9wID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LnNjcm9sbFRvcDtcbiAgICAvLyBsZXQgb2Zmc2V0ID0gJGFjdGl2ZS5vZmZzZXQoKTtcbiAgICAvL1xuICAgIC8vIGNvbnNvbGUubG9nKHNjcm9sbFRvcCwgc2Nyb2xsSGVpZ2h0LCBoZWlnaHQpO1xuICAgIC8vIGNvbnNvbGUubG9nKG9mZnNldCk7XG4gICAgLy8gbGV0IGRpc3RhbmNlVG9wID0gb2Zmc2V0LnRvcCAtIHNjcm9sbFRvcDtcbiAgICAvLyBsZXQgZGlzdGFuY2VCb3R0b20gPSBvZmZzZXQudG9wIC0gc2Nyb2xsVG9wICsgaGVpZ2h0ICsgJGFjdGl2ZS5vdXRlckhlaWdodCgpO1xuICAgIC8vIGlmIChkaXN0YW5jZVRvcCA8IDApIHtcbiAgICAvLyAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5zY3JvbGxUb3AgPSBzY3JvbGxUb3AgLSBkaXN0YW5jZVRvcDtcbiAgICAvLyB9IGVsc2UgaWYoZGlzdGFuY2VCb3R0b20gPiAwKXtcbiAgICAvLyAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5zY3JvbGxUb3AgPSBzY3JvbGxUb3AgLSBkaXN0YW5jZUJvdHRvbTtcbiAgICAvLyB9XG4gIH1cbn1cbiJdfQ==