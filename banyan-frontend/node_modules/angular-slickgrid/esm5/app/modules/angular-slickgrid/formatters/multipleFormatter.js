import * as tslib_1 from "tslib";
export var multipleFormatter = function (row, cell, value, columnDef, dataContext, grid) {
    var e_1, _a;
    var params = columnDef.params || {};
    if (!params.formatters || !Array.isArray(params.formatters)) {
        throw new Error("The multiple formatter requires the \"formatters\" to be provided as a column params.\n    For example: this.columnDefinitions = [{ id: title, field: title, formatter: Formatters.multiple, params: { formatters: [Formatters.lowercase, Formatters.uppercase] }");
    }
    var formatters = params.formatters;
    // loop through all Formatters, the value of 1st formatter will be used by 2nd formatter and so on.
    // they are piped and executed in sequences
    var currentValue = value;
    try {
        for (var formatters_1 = tslib_1.__values(formatters), formatters_1_1 = formatters_1.next(); !formatters_1_1.done; formatters_1_1 = formatters_1.next()) {
            var formatter = formatters_1_1.value;
            currentValue = formatter(row, cell, currentValue, columnDef, dataContext, grid);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (formatters_1_1 && !formatters_1_1.done && (_a = formatters_1.return)) _a.call(formatters_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return currentValue;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGlwbGVGb3JtYXR0ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL2Zvcm1hdHRlcnMvbXVsdGlwbGVGb3JtYXR0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUVBLE1BQU0sQ0FBQyxJQUFNLGlCQUFpQixHQUFjLFVBQUMsR0FBVyxFQUFFLElBQVksRUFBRSxLQUFVLEVBQUUsU0FBaUIsRUFBRSxXQUFnQixFQUFFLElBQVM7O0lBQ2hJLElBQU0sTUFBTSxHQUFHLFNBQVMsQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDO0lBQ3RDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUU7UUFDM0QsTUFBTSxJQUFJLEtBQUssQ0FBQyxtUUFDdUosQ0FBQyxDQUFDO0tBQzFLO0lBQ0QsSUFBTSxVQUFVLEdBQWdCLE1BQU0sQ0FBQyxVQUFVLENBQUM7SUFFbEQsbUdBQW1HO0lBQ25HLDJDQUEyQztJQUMzQyxJQUFJLFlBQVksR0FBRyxLQUFLLENBQUM7O1FBQ3pCLEtBQXdCLElBQUEsZUFBQSxpQkFBQSxVQUFVLENBQUEsc0NBQUEsOERBQUU7WUFBL0IsSUFBTSxTQUFTLHVCQUFBO1lBQ2xCLFlBQVksR0FBRyxTQUFTLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUNqRjs7Ozs7Ozs7O0lBQ0QsT0FBTyxZQUFZLENBQUM7QUFDdEIsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29sdW1uLCBGb3JtYXR0ZXIgfSBmcm9tICcuLy4uL21vZGVscy9pbmRleCc7XHJcblxyXG5leHBvcnQgY29uc3QgbXVsdGlwbGVGb3JtYXR0ZXI6IEZvcm1hdHRlciA9IChyb3c6IG51bWJlciwgY2VsbDogbnVtYmVyLCB2YWx1ZTogYW55LCBjb2x1bW5EZWY6IENvbHVtbiwgZGF0YUNvbnRleHQ6IGFueSwgZ3JpZDogYW55KSA9PiB7XHJcbiAgY29uc3QgcGFyYW1zID0gY29sdW1uRGVmLnBhcmFtcyB8fCB7fTtcclxuICBpZiAoIXBhcmFtcy5mb3JtYXR0ZXJzIHx8ICFBcnJheS5pc0FycmF5KHBhcmFtcy5mb3JtYXR0ZXJzKSkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgbXVsdGlwbGUgZm9ybWF0dGVyIHJlcXVpcmVzIHRoZSBcImZvcm1hdHRlcnNcIiB0byBiZSBwcm92aWRlZCBhcyBhIGNvbHVtbiBwYXJhbXMuXHJcbiAgICBGb3IgZXhhbXBsZTogdGhpcy5jb2x1bW5EZWZpbml0aW9ucyA9IFt7IGlkOiB0aXRsZSwgZmllbGQ6IHRpdGxlLCBmb3JtYXR0ZXI6IEZvcm1hdHRlcnMubXVsdGlwbGUsIHBhcmFtczogeyBmb3JtYXR0ZXJzOiBbRm9ybWF0dGVycy5sb3dlcmNhc2UsIEZvcm1hdHRlcnMudXBwZXJjYXNlXSB9YCk7XHJcbiAgfVxyXG4gIGNvbnN0IGZvcm1hdHRlcnM6IEZvcm1hdHRlcltdID0gcGFyYW1zLmZvcm1hdHRlcnM7XHJcblxyXG4gIC8vIGxvb3AgdGhyb3VnaCBhbGwgRm9ybWF0dGVycywgdGhlIHZhbHVlIG9mIDFzdCBmb3JtYXR0ZXIgd2lsbCBiZSB1c2VkIGJ5IDJuZCBmb3JtYXR0ZXIgYW5kIHNvIG9uLlxyXG4gIC8vIHRoZXkgYXJlIHBpcGVkIGFuZCBleGVjdXRlZCBpbiBzZXF1ZW5jZXNcclxuICBsZXQgY3VycmVudFZhbHVlID0gdmFsdWU7XHJcbiAgZm9yIChjb25zdCBmb3JtYXR0ZXIgb2YgZm9ybWF0dGVycykge1xyXG4gICAgY3VycmVudFZhbHVlID0gZm9ybWF0dGVyKHJvdywgY2VsbCwgY3VycmVudFZhbHVlLCBjb2x1bW5EZWYsIGRhdGFDb250ZXh0LCBncmlkKTtcclxuICB9XHJcbiAgcmV0dXJuIGN1cnJlbnRWYWx1ZTtcclxufTtcclxuIl19