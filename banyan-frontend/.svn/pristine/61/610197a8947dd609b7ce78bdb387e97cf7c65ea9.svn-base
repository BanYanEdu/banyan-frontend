var MaxAggregator = /** @class */ (function () {
    function MaxAggregator(field) {
        this._field = field;
    }
    MaxAggregator.prototype.init = function () {
        this._max = null;
    };
    MaxAggregator.prototype.accumulate = function (item) {
        var val = (item && item.hasOwnProperty(this._field)) ? item[this._field] : null;
        if (val != null && val !== '' && !isNaN(val)) {
            if (this._max == null || val > this._max) {
                this._max = parseFloat(val);
            }
        }
    };
    MaxAggregator.prototype.storeResult = function (groupTotals) {
        if (!groupTotals || groupTotals.max === undefined) {
            groupTotals.max = {};
        }
        groupTotals.max[this._field] = this._max;
    };
    return MaxAggregator;
}());
export { MaxAggregator };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF4QWdncmVnYXRvci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvYWdncmVnYXRvcnMvbWF4QWdncmVnYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQTtJQUlFLHVCQUFZLEtBQXNCO1FBQ2hDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQ3RCLENBQUM7SUFFRCw0QkFBSSxHQUFKO1FBQ0UsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDbkIsQ0FBQztJQUVELGtDQUFVLEdBQVYsVUFBVyxJQUFTO1FBQ2xCLElBQU0sR0FBRyxHQUFHLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNsRixJQUFJLEdBQUcsSUFBSSxJQUFJLElBQUksR0FBRyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUM1QyxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxFQUFFO2dCQUN4QyxJQUFJLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUM3QjtTQUNGO0lBQ0gsQ0FBQztJQUVELG1DQUFXLEdBQVgsVUFBWSxXQUFnQjtRQUMxQixJQUFJLENBQUMsV0FBVyxJQUFJLFdBQVcsQ0FBQyxHQUFHLEtBQUssU0FBUyxFQUFFO1lBQ2pELFdBQVcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO1NBQ3RCO1FBQ0QsV0FBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztJQUMzQyxDQUFDO0lBQ0gsb0JBQUM7QUFBRCxDQUFDLEFBM0JELElBMkJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWdncmVnYXRvciB9IGZyb20gJy4vLi4vbW9kZWxzL2FnZ3JlZ2F0b3IuaW50ZXJmYWNlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBNYXhBZ2dyZWdhdG9yIGltcGxlbWVudHMgQWdncmVnYXRvciB7XHJcbiAgcHJpdmF0ZSBfbWF4OiBudW1iZXIgfCBudWxsO1xyXG4gIHByaXZhdGUgX2ZpZWxkOiBudW1iZXIgfCBzdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGZpZWxkOiBudW1iZXIgfCBzdHJpbmcpIHtcclxuICAgIHRoaXMuX2ZpZWxkID0gZmllbGQ7XHJcbiAgfVxyXG5cclxuICBpbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5fbWF4ID0gbnVsbDtcclxuICB9XHJcblxyXG4gIGFjY3VtdWxhdGUoaXRlbTogYW55KSB7XHJcbiAgICBjb25zdCB2YWwgPSAoaXRlbSAmJiBpdGVtLmhhc093blByb3BlcnR5KHRoaXMuX2ZpZWxkKSkgPyBpdGVtW3RoaXMuX2ZpZWxkXSA6IG51bGw7XHJcbiAgICBpZiAodmFsICE9IG51bGwgJiYgdmFsICE9PSAnJyAmJiAhaXNOYU4odmFsKSkge1xyXG4gICAgICBpZiAodGhpcy5fbWF4ID09IG51bGwgfHwgdmFsID4gdGhpcy5fbWF4KSB7XHJcbiAgICAgICAgdGhpcy5fbWF4ID0gcGFyc2VGbG9hdCh2YWwpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdG9yZVJlc3VsdChncm91cFRvdGFsczogYW55KSB7XHJcbiAgICBpZiAoIWdyb3VwVG90YWxzIHx8IGdyb3VwVG90YWxzLm1heCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGdyb3VwVG90YWxzLm1heCA9IHt9O1xyXG4gICAgfVxyXG4gICAgZ3JvdXBUb3RhbHMubWF4W3RoaXMuX2ZpZWxkXSA9IHRoaXMuX21heDtcclxuICB9XHJcbn1cclxuIl19