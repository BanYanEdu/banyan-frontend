/**
 * Takes a value display it according to a mask provided
 * e.: 1234567890 with mask "(000) 000-0000" will display "(123) 456-7890"
 */
export var maskFormatter = function (row, cell, value, columnDef, dataContext) {
    var params = columnDef.params || {};
    var mask = params.mask;
    if (!mask) {
        throw new Error("You must provide a \"mask\" via the generic \"params\" options (e.g.: { formatter: Formatters.mask, params: { mask: '000-000' }}");
    }
    if (value) {
        var i_1 = 0;
        var v_1 = value.toString();
        return mask.replace(/[09A]/gi, function () { return v_1[i_1++] || ''; });
    }
    return value;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFza0Zvcm1hdHRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvZm9ybWF0dGVycy9tYXNrRm9ybWF0dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUdBOzs7R0FHRztBQUNILE1BQU0sQ0FBQyxJQUFNLGFBQWEsR0FBYyxVQUFDLEdBQVcsRUFBRSxJQUFZLEVBQUUsS0FBVSxFQUFFLFNBQWlCLEVBQUUsV0FBZ0I7SUFDakgsSUFBTSxNQUFNLEdBQUcsU0FBUyxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUM7SUFDdEMsSUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztJQUV6QixJQUFJLENBQUMsSUFBSSxFQUFFO1FBQ1QsTUFBTSxJQUFJLEtBQUssQ0FBQyxrSUFBOEgsQ0FBQyxDQUFDO0tBQ2pKO0lBRUQsSUFBSSxLQUFLLEVBQUU7UUFDVCxJQUFJLEdBQUMsR0FBRyxDQUFDLENBQUM7UUFDVixJQUFNLEdBQUMsR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDM0IsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxjQUFNLE9BQUEsR0FBQyxDQUFDLEdBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFaLENBQVksQ0FBQyxDQUFDO0tBQ3BEO0lBQ0QsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHsgQ29sdW1uLCBGb3JtYXR0ZXIgfSBmcm9tICcuLy4uL21vZGVscy9pbmRleCc7XHJcblxyXG4vKipcclxuICogVGFrZXMgYSB2YWx1ZSBkaXNwbGF5IGl0IGFjY29yZGluZyB0byBhIG1hc2sgcHJvdmlkZWRcclxuICogZS46IDEyMzQ1Njc4OTAgd2l0aCBtYXNrIFwiKDAwMCkgMDAwLTAwMDBcIiB3aWxsIGRpc3BsYXkgXCIoMTIzKSA0NTYtNzg5MFwiXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgbWFza0Zvcm1hdHRlcjogRm9ybWF0dGVyID0gKHJvdzogbnVtYmVyLCBjZWxsOiBudW1iZXIsIHZhbHVlOiBhbnksIGNvbHVtbkRlZjogQ29sdW1uLCBkYXRhQ29udGV4dDogYW55KSA9PiB7XHJcbiAgY29uc3QgcGFyYW1zID0gY29sdW1uRGVmLnBhcmFtcyB8fCB7fTtcclxuICBjb25zdCBtYXNrID0gcGFyYW1zLm1hc2s7XHJcblxyXG4gIGlmICghbWFzaykge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKGBZb3UgbXVzdCBwcm92aWRlIGEgXCJtYXNrXCIgdmlhIHRoZSBnZW5lcmljIFwicGFyYW1zXCIgb3B0aW9ucyAoZS5nLjogeyBmb3JtYXR0ZXI6IEZvcm1hdHRlcnMubWFzaywgcGFyYW1zOiB7IG1hc2s6ICcwMDAtMDAwJyB9fWApO1xyXG4gIH1cclxuXHJcbiAgaWYgKHZhbHVlKSB7XHJcbiAgICBsZXQgaSA9IDA7XHJcbiAgICBjb25zdCB2ID0gdmFsdWUudG9TdHJpbmcoKTtcclxuICAgIHJldHVybiBtYXNrLnJlcGxhY2UoL1swOUFdL2dpLCAoKSA9PiB2W2krK10gfHwgJycpO1xyXG4gIH1cclxuICByZXR1cm4gdmFsdWU7XHJcbn07XHJcbiJdfQ==