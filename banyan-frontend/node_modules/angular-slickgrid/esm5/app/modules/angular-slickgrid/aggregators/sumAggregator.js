var SumAggregator = /** @class */ (function () {
    function SumAggregator(field) {
        this._sum = 0;
        this._field = field;
    }
    SumAggregator.prototype.init = function () {
        this._sum = 0;
    };
    SumAggregator.prototype.accumulate = function (item) {
        var val = (item && item.hasOwnProperty(this._field)) ? item[this._field] : null;
        if (val != null && val !== '' && !isNaN(val)) {
            this._sum += parseFloat(val);
        }
    };
    SumAggregator.prototype.storeResult = function (groupTotals) {
        if (!groupTotals || groupTotals.sum === undefined) {
            groupTotals.sum = {};
        }
        groupTotals.sum[this._field] = this._sum;
    };
    return SumAggregator;
}());
export { SumAggregator };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VtQWdncmVnYXRvci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvYWdncmVnYXRvcnMvc3VtQWdncmVnYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQTtJQUlFLHVCQUFZLEtBQXNCO1FBSDFCLFNBQUksR0FBVyxDQUFDLENBQUM7UUFJdkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDdEIsQ0FBQztJQUVELDRCQUFJLEdBQUo7UUFDRSxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztJQUNoQixDQUFDO0lBRUQsa0NBQVUsR0FBVixVQUFXLElBQVM7UUFDbEIsSUFBTSxHQUFHLEdBQUcsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ2xGLElBQUksR0FBRyxJQUFJLElBQUksSUFBSSxHQUFHLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQzVDLElBQUksQ0FBQyxJQUFJLElBQUksVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQzlCO0lBQ0gsQ0FBQztJQUVELG1DQUFXLEdBQVgsVUFBWSxXQUFnQjtRQUMxQixJQUFJLENBQUMsV0FBVyxJQUFJLFdBQVcsQ0FBQyxHQUFHLEtBQUssU0FBUyxFQUFFO1lBQ2pELFdBQVcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO1NBQ3RCO1FBQ0QsV0FBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztJQUMzQyxDQUFDO0lBQ0gsb0JBQUM7QUFBRCxDQUFDLEFBekJELElBeUJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWdncmVnYXRvciB9IGZyb20gJy4vLi4vbW9kZWxzL2FnZ3JlZ2F0b3IuaW50ZXJmYWNlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBTdW1BZ2dyZWdhdG9yIGltcGxlbWVudHMgQWdncmVnYXRvciB7XHJcbiAgcHJpdmF0ZSBfc3VtOiBudW1iZXIgPSAwO1xyXG4gIHByaXZhdGUgX2ZpZWxkOiBudW1iZXIgfCBzdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGZpZWxkOiBudW1iZXIgfCBzdHJpbmcpIHtcclxuICAgIHRoaXMuX2ZpZWxkID0gZmllbGQ7XHJcbiAgfVxyXG5cclxuICBpbml0KCkge1xyXG4gICAgdGhpcy5fc3VtID0gMDtcclxuICB9XHJcblxyXG4gIGFjY3VtdWxhdGUoaXRlbTogYW55KSB7XHJcbiAgICBjb25zdCB2YWwgPSAoaXRlbSAmJiBpdGVtLmhhc093blByb3BlcnR5KHRoaXMuX2ZpZWxkKSkgPyBpdGVtW3RoaXMuX2ZpZWxkXSA6IG51bGw7XHJcbiAgICBpZiAodmFsICE9IG51bGwgJiYgdmFsICE9PSAnJyAmJiAhaXNOYU4odmFsKSkge1xyXG4gICAgICB0aGlzLl9zdW0gKz0gcGFyc2VGbG9hdCh2YWwpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc3RvcmVSZXN1bHQoZ3JvdXBUb3RhbHM6IGFueSkge1xyXG4gICAgaWYgKCFncm91cFRvdGFscyB8fCBncm91cFRvdGFscy5zdW0gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBncm91cFRvdGFscy5zdW0gPSB7fTtcclxuICAgIH1cclxuICAgIGdyb3VwVG90YWxzLnN1bVt0aGlzLl9maWVsZF0gPSB0aGlzLl9zdW07XHJcbiAgfVxyXG59XHJcbiJdfQ==