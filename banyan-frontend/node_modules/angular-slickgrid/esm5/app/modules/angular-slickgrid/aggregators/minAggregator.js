var MinAggregator = /** @class */ (function () {
    function MinAggregator(field) {
        this._field = field;
    }
    MinAggregator.prototype.init = function () {
        this._min = null;
    };
    MinAggregator.prototype.accumulate = function (item) {
        var val = (item && item.hasOwnProperty(this._field)) ? item[this._field] : null;
        if (val != null && val !== '' && !isNaN(val)) {
            if (this._min == null || val < this._min) {
                this._min = parseFloat(val);
            }
        }
    };
    MinAggregator.prototype.storeResult = function (groupTotals) {
        if (!groupTotals || groupTotals.min === undefined) {
            groupTotals.min = {};
        }
        groupTotals.min[this._field] = this._min;
    };
    return MinAggregator;
}());
export { MinAggregator };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWluQWdncmVnYXRvci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvYWdncmVnYXRvcnMvbWluQWdncmVnYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQTtJQUlFLHVCQUFZLEtBQXNCO1FBQ2hDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQ3RCLENBQUM7SUFFRCw0QkFBSSxHQUFKO1FBQ0UsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDbkIsQ0FBQztJQUVELGtDQUFVLEdBQVYsVUFBVyxJQUFTO1FBQ2xCLElBQU0sR0FBRyxHQUFHLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNsRixJQUFJLEdBQUcsSUFBSSxJQUFJLElBQUksR0FBRyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUM1QyxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxFQUFFO2dCQUN4QyxJQUFJLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUM3QjtTQUNGO0lBQ0gsQ0FBQztJQUVELG1DQUFXLEdBQVgsVUFBWSxXQUFnQjtRQUMxQixJQUFJLENBQUMsV0FBVyxJQUFJLFdBQVcsQ0FBQyxHQUFHLEtBQUssU0FBUyxFQUFFO1lBQ2pELFdBQVcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO1NBQ3RCO1FBQ0QsV0FBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztJQUMzQyxDQUFDO0lBQ0gsb0JBQUM7QUFBRCxDQUFDLEFBM0JELElBMkJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWdncmVnYXRvciB9IGZyb20gJy4vLi4vbW9kZWxzL2FnZ3JlZ2F0b3IuaW50ZXJmYWNlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBNaW5BZ2dyZWdhdG9yIGltcGxlbWVudHMgQWdncmVnYXRvciB7XHJcbiAgcHJpdmF0ZSBfbWluOiBudW1iZXIgfCBudWxsO1xyXG4gIHByaXZhdGUgX2ZpZWxkOiBudW1iZXIgfCBzdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGZpZWxkOiBudW1iZXIgfCBzdHJpbmcpIHtcclxuICAgIHRoaXMuX2ZpZWxkID0gZmllbGQ7XHJcbiAgfVxyXG5cclxuICBpbml0KCkge1xyXG4gICAgdGhpcy5fbWluID0gbnVsbDtcclxuICB9XHJcblxyXG4gIGFjY3VtdWxhdGUoaXRlbTogYW55KSB7XHJcbiAgICBjb25zdCB2YWwgPSAoaXRlbSAmJiBpdGVtLmhhc093blByb3BlcnR5KHRoaXMuX2ZpZWxkKSkgPyBpdGVtW3RoaXMuX2ZpZWxkXSA6IG51bGw7XHJcbiAgICBpZiAodmFsICE9IG51bGwgJiYgdmFsICE9PSAnJyAmJiAhaXNOYU4odmFsKSkge1xyXG4gICAgICBpZiAodGhpcy5fbWluID09IG51bGwgfHwgdmFsIDwgdGhpcy5fbWluKSB7XHJcbiAgICAgICAgdGhpcy5fbWluID0gcGFyc2VGbG9hdCh2YWwpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdG9yZVJlc3VsdChncm91cFRvdGFsczogYW55KSB7XHJcbiAgICBpZiAoIWdyb3VwVG90YWxzIHx8IGdyb3VwVG90YWxzLm1pbiA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGdyb3VwVG90YWxzLm1pbiA9IHt9O1xyXG4gICAgfVxyXG4gICAgZ3JvdXBUb3RhbHMubWluW3RoaXMuX2ZpZWxkXSA9IHRoaXMuX21pbjtcclxuICB9XHJcbn1cclxuIl19