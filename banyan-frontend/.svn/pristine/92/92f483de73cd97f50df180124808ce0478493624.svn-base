export var progressBarFormatter = function (row, cell, value, columnDef, dataContext) {
    var isNumber = (value === null || value === undefined || value === '') ? false : !isNaN(+value);
    if (!isNumber) {
        return '';
    }
    var color = '';
    var inputNumber = parseFloat(value);
    if (inputNumber > 100) {
        inputNumber = 100;
    }
    if (inputNumber < 30) {
        color = 'danger';
    }
    else if (inputNumber < 70) {
        color = 'warning';
    }
    else {
        color = 'success';
    }
    var output = "<div class=\"progress\">\n    <div class=\"progress-bar progress-bar-" + color + " bg-" + color + "\" role=\"progressbar\" aria-valuenow=\"" + inputNumber + "\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"min-width: 2em; width: " + inputNumber + "%;\">\n    " + inputNumber + "%\n    </div>\n  </div>";
    return output.replace(/\s{2,}/g, ' ').trim();
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3NCYXJGb3JtYXR0ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL2Zvcm1hdHRlcnMvcHJvZ3Jlc3NCYXJGb3JtYXR0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR0EsTUFBTSxDQUFDLElBQU0sb0JBQW9CLEdBQWMsVUFBQyxHQUFXLEVBQUUsSUFBWSxFQUFFLEtBQVUsRUFBRSxTQUFpQixFQUFFLFdBQWdCO0lBQ3hILElBQU0sUUFBUSxHQUFHLENBQUMsS0FBSyxLQUFLLElBQUksSUFBSSxLQUFLLEtBQUssU0FBUyxJQUFJLEtBQUssS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xHLElBQUksQ0FBQyxRQUFRLEVBQUU7UUFDYixPQUFPLEVBQUUsQ0FBQztLQUNYO0lBRUQsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO0lBQ2YsSUFBSSxXQUFXLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3BDLElBQUksV0FBVyxHQUFHLEdBQUcsRUFBRTtRQUNyQixXQUFXLEdBQUcsR0FBRyxDQUFDO0tBQ25CO0lBRUQsSUFBSSxXQUFXLEdBQUcsRUFBRSxFQUFFO1FBQ3BCLEtBQUssR0FBRyxRQUFRLENBQUM7S0FDbEI7U0FBTSxJQUFJLFdBQVcsR0FBRyxFQUFFLEVBQUU7UUFDM0IsS0FBSyxHQUFHLFNBQVMsQ0FBQztLQUNuQjtTQUFNO1FBQ0wsS0FBSyxHQUFHLFNBQVMsQ0FBQztLQUNuQjtJQUVELElBQU0sTUFBTSxHQUFHLDBFQUMyQixLQUFLLFlBQU8sS0FBSyxnREFBdUMsV0FBVyxvRkFBeUUsV0FBVyxtQkFDN0wsV0FBVyw0QkFFUixDQUFDO0lBRVIsT0FBTyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUMvQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb2x1bW4gfSBmcm9tICcuLy4uL21vZGVscy9jb2x1bW4uaW50ZXJmYWNlJztcbmltcG9ydCB7IEZvcm1hdHRlciB9IGZyb20gJy4vLi4vbW9kZWxzL2Zvcm1hdHRlci5pbnRlcmZhY2UnO1xuXG5leHBvcnQgY29uc3QgcHJvZ3Jlc3NCYXJGb3JtYXR0ZXI6IEZvcm1hdHRlciA9IChyb3c6IG51bWJlciwgY2VsbDogbnVtYmVyLCB2YWx1ZTogYW55LCBjb2x1bW5EZWY6IENvbHVtbiwgZGF0YUNvbnRleHQ6IGFueSk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IGlzTnVtYmVyID0gKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09ICcnKSA/IGZhbHNlIDogIWlzTmFOKCt2YWx1ZSk7XG4gIGlmICghaXNOdW1iZXIpIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICBsZXQgY29sb3IgPSAnJztcbiAgbGV0IGlucHV0TnVtYmVyID0gcGFyc2VGbG9hdCh2YWx1ZSk7XG4gIGlmIChpbnB1dE51bWJlciA+IDEwMCkge1xuICAgIGlucHV0TnVtYmVyID0gMTAwO1xuICB9XG5cbiAgaWYgKGlucHV0TnVtYmVyIDwgMzApIHtcbiAgICBjb2xvciA9ICdkYW5nZXInO1xuICB9IGVsc2UgaWYgKGlucHV0TnVtYmVyIDwgNzApIHtcbiAgICBjb2xvciA9ICd3YXJuaW5nJztcbiAgfSBlbHNlIHtcbiAgICBjb2xvciA9ICdzdWNjZXNzJztcbiAgfVxuXG4gIGNvbnN0IG91dHB1dCA9IGA8ZGl2IGNsYXNzPVwicHJvZ3Jlc3NcIj5cbiAgICA8ZGl2IGNsYXNzPVwicHJvZ3Jlc3MtYmFyIHByb2dyZXNzLWJhci0ke2NvbG9yfSBiZy0ke2NvbG9yfVwiIHJvbGU9XCJwcm9ncmVzc2JhclwiIGFyaWEtdmFsdWVub3c9XCIke2lucHV0TnVtYmVyfVwiIGFyaWEtdmFsdWVtaW49XCIwXCIgYXJpYS12YWx1ZW1heD1cIjEwMFwiIHN0eWxlPVwibWluLXdpZHRoOiAyZW07IHdpZHRoOiAke2lucHV0TnVtYmVyfSU7XCI+XG4gICAgJHtpbnB1dE51bWJlcn0lXG4gICAgPC9kaXY+XG4gIDwvZGl2PmA7XG5cbiAgcmV0dXJuIG91dHB1dC5yZXBsYWNlKC9cXHN7Mix9L2csICcgJykudHJpbSgpO1xufTtcbiJdfQ==