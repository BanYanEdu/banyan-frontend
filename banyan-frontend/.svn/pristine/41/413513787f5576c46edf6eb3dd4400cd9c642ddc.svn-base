var AvgAggregator = /** @class */ (function () {
    function AvgAggregator(field) {
        this._count = 0;
        this._field = field;
    }
    AvgAggregator.prototype.init = function () {
        this._count = 0;
        this._nonNullCount = 0;
        this._sum = 0;
    };
    AvgAggregator.prototype.accumulate = function (item) {
        var val = (item && item.hasOwnProperty(this._field)) ? item[this._field] : null;
        this._count++;
        if (val != null && val !== '' && !isNaN(val)) {
            this._nonNullCount++;
            this._sum += parseFloat(val);
        }
    };
    AvgAggregator.prototype.storeResult = function (groupTotals) {
        if (!groupTotals || groupTotals.avg === undefined) {
            groupTotals.avg = {};
        }
        if (this._nonNullCount !== 0) {
            groupTotals.avg[this._field] = this._sum / this._nonNullCount;
        }
    };
    return AvgAggregator;
}());
export { AvgAggregator };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZnQWdncmVnYXRvci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvYWdncmVnYXRvcnMvYXZnQWdncmVnYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQTtJQU1FLHVCQUFZLEtBQXNCO1FBTDFCLFdBQU0sR0FBRyxDQUFDLENBQUM7UUFNakIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDdEIsQ0FBQztJQUVELDRCQUFJLEdBQUo7UUFDRSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUNoQixJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQztRQUN2QixJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztJQUNoQixDQUFDO0lBRUQsa0NBQVUsR0FBVixVQUFXLElBQVM7UUFDbEIsSUFBTSxHQUFHLEdBQUcsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ2xGLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNkLElBQUksR0FBRyxJQUFJLElBQUksSUFBSSxHQUFHLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQzVDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUNyQixJQUFJLENBQUMsSUFBSSxJQUFJLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUM5QjtJQUNILENBQUM7SUFFRCxtQ0FBVyxHQUFYLFVBQVksV0FBZ0I7UUFDMUIsSUFBSSxDQUFDLFdBQVcsSUFBSSxXQUFXLENBQUMsR0FBRyxLQUFLLFNBQVMsRUFBRTtZQUNqRCxXQUFXLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztTQUN0QjtRQUNELElBQUksSUFBSSxDQUFDLGFBQWEsS0FBSyxDQUFDLEVBQUU7WUFDNUIsV0FBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO1NBQy9EO0lBQ0gsQ0FBQztJQUNILG9CQUFDO0FBQUQsQ0FBQyxBQWpDRCxJQWlDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFnZ3JlZ2F0b3IgfSBmcm9tICcuLy4uL21vZGVscy9hZ2dyZWdhdG9yLmludGVyZmFjZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgQXZnQWdncmVnYXRvciBpbXBsZW1lbnRzIEFnZ3JlZ2F0b3Ige1xyXG4gIHByaXZhdGUgX2NvdW50ID0gMDtcclxuICBwcml2YXRlIF9ub25OdWxsQ291bnQ6IG51bWJlcjtcclxuICBwcml2YXRlIF9zdW06IG51bWJlcjtcclxuICBwcml2YXRlIF9maWVsZDogbnVtYmVyIHwgc3RyaW5nO1xyXG5cclxuICBjb25zdHJ1Y3RvcihmaWVsZDogbnVtYmVyIHwgc3RyaW5nKSB7XHJcbiAgICB0aGlzLl9maWVsZCA9IGZpZWxkO1xyXG4gIH1cclxuXHJcbiAgaW5pdCgpOiB2b2lkIHtcclxuICAgIHRoaXMuX2NvdW50ID0gMDtcclxuICAgIHRoaXMuX25vbk51bGxDb3VudCA9IDA7XHJcbiAgICB0aGlzLl9zdW0gPSAwO1xyXG4gIH1cclxuXHJcbiAgYWNjdW11bGF0ZShpdGVtOiBhbnkpIHtcclxuICAgIGNvbnN0IHZhbCA9IChpdGVtICYmIGl0ZW0uaGFzT3duUHJvcGVydHkodGhpcy5fZmllbGQpKSA/IGl0ZW1bdGhpcy5fZmllbGRdIDogbnVsbDtcclxuICAgIHRoaXMuX2NvdW50Kys7XHJcbiAgICBpZiAodmFsICE9IG51bGwgJiYgdmFsICE9PSAnJyAmJiAhaXNOYU4odmFsKSkge1xyXG4gICAgICB0aGlzLl9ub25OdWxsQ291bnQrKztcclxuICAgICAgdGhpcy5fc3VtICs9IHBhcnNlRmxvYXQodmFsKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHN0b3JlUmVzdWx0KGdyb3VwVG90YWxzOiBhbnkpIHtcclxuICAgIGlmICghZ3JvdXBUb3RhbHMgfHwgZ3JvdXBUb3RhbHMuYXZnID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgZ3JvdXBUb3RhbHMuYXZnID0ge307XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5fbm9uTnVsbENvdW50ICE9PSAwKSB7XHJcbiAgICAgIGdyb3VwVG90YWxzLmF2Z1t0aGlzLl9maWVsZF0gPSB0aGlzLl9zdW0gLyB0aGlzLl9ub25OdWxsQ291bnQ7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==