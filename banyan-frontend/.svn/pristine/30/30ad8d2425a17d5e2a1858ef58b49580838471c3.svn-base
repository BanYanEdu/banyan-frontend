import * as tslib_1 from "tslib";
import './global-utilities';
import { CaseType } from './../models/index';
var OdataService = /** @class */ (function () {
    function OdataService() {
        this._odataOptions = {
            filterQueue: [],
            orderBy: ''
        };
        this._defaultSortBy = '';
        this._columnFilters = {};
    }
    /*
      * Build the OData query string from all the options provided
      * @return string OData query
      */
    OdataService.prototype.buildQuery = function () {
        this._odataOptions.filterQueue = [];
        var queryTmpArray = [];
        if (this._odataOptions.top) {
            queryTmpArray.push("$top=" + this._odataOptions.top);
        }
        if (this._odataOptions.skip) {
            queryTmpArray.push("$skip=" + this._odataOptions.skip);
        }
        if (this._odataOptions.orderBy) {
            var argument = '';
            if (Array.isArray(this._odataOptions.orderBy)) {
                argument = this._odataOptions.orderBy.join(','); // csv, that will form a query example like: $orderby=RoleName asc, Id desc
            }
            else {
                argument = this._odataOptions.orderBy;
            }
            queryTmpArray.push("$orderby=" + argument);
        }
        if (this._odataOptions.filterBy || this._odataOptions.filter) {
            if (this._odataOptions.filter) {
                this._odataOptions.filterQueue = [];
                var filterStr = this._odataOptions.filter;
                if (Array.isArray(this._odataOptions.filter)) {
                    filterStr = this._odataOptions.filter.join(" " + (this._odataOptions.filterBySeparator || 'and') + " ");
                }
                this._odataOptions.filterQueue.push("(" + filterStr + ")");
            }
            // filterBy are passed manually by the user, however we will only add it if the column wasn't yet filtered
            if (!!this._odataOptions.filterBy && !!this._odataOptions.filterBy.fieldName && !this._columnFilters[this._odataOptions.filterBy.fieldName.toLowerCase()]) {
                if (this._odataOptions.filterBy.searchTerm !== '') {
                    this.saveColumnFilter(this._odataOptions.filterBy.fieldName.toLowerCase(), this._odataOptions.filterBy.searchTerm, this._odataOptions.filterBy.searchTerms);
                    this.updateFilterFromListTerms(this._odataOptions.filterBy);
                }
            }
        }
        if (this._odataOptions.filterQueue.length > 0) {
            var query = this._odataOptions.filterQueue.join(" " + (this._odataOptions.filterBySeparator || 'and') + " ");
            this._odataOptions.filter = query; // overwrite with
            queryTmpArray.push("$filter=" + query);
        }
        // join all the odata functions by a '&'
        return queryTmpArray.join('&');
    };
    OdataService.prototype.getFilterByColumn = function (columnName) {
        return (!!this._columnFilters[columnName]) ? this._columnFilters[columnName] : null;
    };
    OdataService.prototype.getFilterCount = function () {
        return (this._odataOptions.filterQueue) ? this._odataOptions.filterQueue.length : 0;
    };
    Object.defineProperty(OdataService.prototype, "columnFilters", {
        get: function () {
            return this._columnFilters;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OdataService.prototype, "options", {
        get: function () {
            return this._odataOptions;
        },
        set: function (options) {
            this._odataOptions = options;
        },
        enumerable: true,
        configurable: true
    });
    OdataService.prototype.removeColumnFilter = function (fieldName) {
        delete this._columnFilters[fieldName];
    };
    OdataService.prototype.saveColumnFilter = function (fieldName, value, searchTerms) {
        this._columnFilters[fieldName] = {
            search: searchTerms,
            value: value
        };
    };
    /**
     * Update the filter by a list of terms usually passed manually by the user as default filters
     * @param filterOptions
     * @returns
     */
    OdataService.prototype.updateFilterFromListTerms = function (filterOptions) {
        var _this = this;
        // build the filter query
        if (Array.isArray(filterOptions)) {
            filterOptions.forEach(function (filterOptionObject) {
                _this.updateFilterFromTerm(filterOptionObject);
            });
        }
        else {
            this.updateFilterFromTerm(filterOptions);
        }
    };
    OdataService.prototype.updateFilterFromTerm = function (filterOptions) {
        var searchBy = '';
        var tmpSearchByArray = [];
        var fieldName = filterOptions.fieldName;
        var fieldSearchTerms = filterOptions.searchTerms;
        var operator = filterOptions.operator;
        // when having more than 1 search term (then check if we have a "IN" or "NOT IN" filter search)
        if (!!fieldSearchTerms && fieldSearchTerms.length > 0) {
            var tmpSearchTerms = [];
            if (operator === 'IN') {
                // example:: (Stage eq "Expired" or Stage eq "Renewal")
                for (var j = 0, lnj = fieldSearchTerms.length; j < lnj; j++) {
                    tmpSearchTerms.push(fieldName + " eq '" + fieldSearchTerms[j] + "'");
                }
                searchBy = tmpSearchTerms.join(' or ');
                searchBy = "$(" + searchBy + ")";
            }
            else if (operator === 'NIN' || operator === 'NOTIN' || operator === 'NOT IN') {
                // example:: (Stage ne "Expired" and Stage ne "Renewal")
                for (var k = 0, lnk = fieldSearchTerms.length; k < lnk; k++) {
                    tmpSearchTerms.push(fieldName + " ne '" + fieldSearchTerms[k] + "'");
                }
                searchBy = tmpSearchTerms.join(' and ');
                searchBy = "$(" + searchBy + ")";
            }
        }
        // push to our temp array and also trim white spaces
        tmpSearchByArray.push(String.trim(searchBy));
        // add to the filter queue only if it doesn't exist in the queue
        var filter = (tmpSearchByArray.length > 0) ? tmpSearchByArray.join(' and ') : '';
        if (this._odataOptions.filterQueue && this._odataOptions.filterQueue.indexOf(filter) === -1) {
            this._odataOptions.filterQueue.push(filter);
        }
    };
    /**
     * Change any OData options that will be used to build the query
     * @param object options
     */
    OdataService.prototype.updateOptions = function (options) {
        var e_1, _a;
        try {
            for (var _b = tslib_1.__values(Object.keys(options)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var property = _c.value;
                if (options.hasOwnProperty(property)) {
                    this._odataOptions[property] = options[property]; // replace of the property
                }
                // we need to keep the defaultSortBy for references whenever the user removes his Sorting
                // then we would revert to the defaultSortBy and the only way is to keep a hard copy here
                if (property === 'orderBy' || property === 'sortBy') {
                    var sortBy = options[property];
                    // make sure first char of each orderBy field is capitalize
                    if (this._odataOptions.caseType === CaseType.pascalCase) {
                        if (Array.isArray(sortBy)) {
                            sortBy.forEach(function (field, index, inputArray) {
                                inputArray[index] = String.titleCase(field);
                            });
                        }
                        else {
                            sortBy = String.titleCase(options[property]);
                        }
                    }
                    this._odataOptions.orderBy = sortBy;
                    this._defaultSortBy = sortBy;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    return OdataService;
}());
export { OdataService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2RhdGEuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItc2xpY2tncmlkLyIsInNvdXJjZXMiOlsiYXBwL21vZHVsZXMvYW5ndWxhci1zbGlja2dyaWQvc2VydmljZXMvb2RhdGEuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxvQkFBb0IsQ0FBQztBQUM1QixPQUFPLEVBQUUsUUFBUSxFQUFlLE1BQU0sbUJBQW1CLENBQUM7QUFFMUQ7SUFLRTtRQUNFLElBQUksQ0FBQyxhQUFhLEdBQUc7WUFDbkIsV0FBVyxFQUFFLEVBQUU7WUFDZixPQUFPLEVBQUUsRUFBRTtTQUNaLENBQUM7UUFDRixJQUFJLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQ7OztRQUdJO0lBQ0osaUNBQVUsR0FBVjtRQUNFLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUNwQyxJQUFNLGFBQWEsR0FBRyxFQUFFLENBQUM7UUFFekIsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsRUFBRTtZQUMxQixhQUFhLENBQUMsSUFBSSxDQUFDLFVBQVEsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFLLENBQUMsQ0FBQztTQUN0RDtRQUNELElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUU7WUFDM0IsYUFBYSxDQUFDLElBQUksQ0FBQyxXQUFTLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBTSxDQUFDLENBQUM7U0FDeEQ7UUFDRCxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFO1lBQzlCLElBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQztZQUNsQixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsRUFBRTtnQkFDN0MsUUFBUSxHQUFHLElBQUksQ0FBQyxh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Q0FBQyxFQUFFOzRCQUN6QixNQUFNLENBQUMsT0FBTyxDQUFDLFVBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxVQUFVO2dDQUN0QyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQzs0QkFDOUMsQ0FBQyxDQUFDLENBQUM7eUJBQ0o7NkJBQU07NEJBQ0wsTUFBTSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7eUJBQzlDO3FCQUNGO29CQUNELElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztvQkFDcEMsSUFBSSxDQUFDLGNBQWMsR0FBRyxNQUFNLENBQUM7aUJBQzlCO2FBQ0Y7Ozs7Ozs7OztJQUNILENBQUM7SUFFSCxtQkFBQztBQUFELENBQUMsQUFwTEQsSUFvTEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJy4vZ2xvYmFsLXV0aWxpdGllcyc7XHJcbmltcG9ydCB7IENhc2VUeXBlLCBPZGF0YU9wdGlvbiB9IGZyb20gJy4vLi4vbW9kZWxzL2luZGV4JztcclxuXHJcbmV4cG9ydCBjbGFzcyBPZGF0YVNlcnZpY2Uge1xyXG4gIF9jb2x1bW5GaWx0ZXJzOiBhbnk7XHJcbiAgX2RlZmF1bHRTb3J0Qnk6IHN0cmluZztcclxuICBfb2RhdGFPcHRpb25zOiBPZGF0YU9wdGlvbjtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLl9vZGF0YU9wdGlvbnMgPSB7XHJcbiAgICAgIGZpbHRlclF1ZXVlOiBbXSxcclxuICAgICAgb3JkZXJCeTogJydcclxuICAgIH07XHJcbiAgICB0aGlzLl9kZWZhdWx0U29ydEJ5ID0gJyc7XHJcbiAgICB0aGlzLl9jb2x1bW5GaWx0ZXJzID0ge307XHJcbiAgfVxyXG5cclxuICAvKlxyXG4gICAgKiBCdWlsZCB0aGUgT0RhdGEgcXVlcnkgc3RyaW5nIGZyb20gYWxsIHRoZSBvcHRpb25zIHByb3ZpZGVkXHJcbiAgICAqIEByZXR1cm4gc3RyaW5nIE9EYXRhIHF1ZXJ5XHJcbiAgICAqL1xyXG4gIGJ1aWxkUXVlcnkoKTogc3RyaW5nIHtcclxuICAgIHRoaXMuX29kYXRhT3B0aW9ucy5maWx0ZXJRdWV1ZSA9IFtdO1xyXG4gICAgY29uc3QgcXVlcnlUbXBBcnJheSA9IFtdO1xyXG5cclxuICAgIGlmICh0aGlzLl9vZGF0YU9wdGlvbnMudG9wKSB7XHJcbiAgICAgIHF1ZXJ5VG1wQXJyYXkucHVzaChgJHRvcD0ke3RoaXMuX29kYXRhT3B0aW9ucy50b3B9YCk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5fb2RhdGFPcHRpb25zLnNraXApIHtcclxuICAgICAgcXVlcnlUbXBBcnJheS5wdXNoKGAkc2tpcD0ke3RoaXMuX29kYXRhT3B0aW9ucy5za2lwfWApO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuX29kYXRhT3B0aW9ucy5vcmRlckJ5KSB7XHJcbiAgICAgIGxldCBhcmd1bWVudCA9ICcnO1xyXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheSh0aGlzLl9vZGF0YU9wdGlvbnMub3JkZXJCeSkpIHtcclxuICAgICAgICBhcmd1bWVudCA9IHRoaXMuX29kYXRhT3B0aW9ucy5vcmRlckJ5LmpvaW4oJywnKTsgLy8gY3N2LCB0aGF0IHdpbGwgZm9ybSBhIHF1ZXJ5IGV4YW1wbGUgbGlrZTogJG9yZGVyYnk9Um9sZU5hbWUgYXNjLCBJZCBkZXNjXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYXJndW1lbnQgPSB0aGlzLl9vZGF0YU9wdGlvbnMub3JkZXJCeTtcclxuICAgICAgfVxyXG4gICAgICBxdWVyeVRtcEFycmF5LnB1c2goYCRvcmRlcmJ5PSR7YXJndW1lbnR9YCk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5fb2RhdGFPcHRpb25zLmZpbHRlckJ5IHx8IHRoaXMuX29kYXRhT3B0aW9ucy5maWx0ZXIpIHtcclxuICAgICAgaWYgKHRoaXMuX29kYXRhT3B0aW9ucy5maWx0ZXIpIHtcclxuICAgICAgICB0aGlzLl9vZGF0YU9wdGlvbnMuZmlsdGVyUXVldWUgPSBbXTtcclxuICAgICAgICBsZXQgZmlsdGVyU3RyID0gdGhpcy5fb2RhdGFPcHRpb25zLmZpbHRlcjtcclxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh0aGlzLl9vZGF0YU9wdGlvbnMuZmlsdGVyKSkge1xyXG4gICAgICAgICAgZmlsdGVyU3RyID0gdGhpcy5fb2RhdGFPcHRpb25zLmZpbHRlci5qb2luKGAgJHt0aGlzLl9vZGF0YU9wdGlvbnMuZmlsdGVyQnlTZXBhcmF0b3IgfHwgJ2FuZCd9IGApO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9vZGF0YU9wdGlvbnMuZmlsdGVyUXVldWUucHVzaChgKCR7ZmlsdGVyU3RyfSlgKTtcclxuICAgICAgfVxyXG4gICAgICAvLyBmaWx0ZXJCeSBhcmUgcGFzc2VkIG1hbnVhbGx5IGJ5IHRoZSB1c2VyLCBob3dldmVyIHdlIHdpbGwgb25seSBhZGQgaXQgaWYgdGhlIGNvbHVtbiB3YXNuJ3QgeWV0IGZpbHRlcmVkXHJcbiAgICAgIGlmICghIXRoaXMuX29kYXRhT3B0aW9ucy5maWx0ZXJCeSAmJiAhIXRoaXMuX29kYXRhT3B0aW9ucy5maWx0ZXJCeS5maWVsZE5hbWUgJiYgIXRoaXMuX2NvbHVtbkZpbHRlcnNbdGhpcy5fb2RhdGFPcHRpb25zLmZpbHRlckJ5LmZpZWxkTmFtZS50b0xvd2VyQ2FzZSgpXSkge1xyXG4gICAgICAgIGlmICh0aGlzLl9vZGF0YU9wdGlvbnMuZmlsdGVyQnkuc2VhcmNoVGVybSAhPT0gJycpIHtcclxuICAgICAgICAgIHRoaXMuc2F2ZUNvbHVtbkZpbHRlcih0aGlzLl9vZGF0YU9wdGlvbnMuZmlsdGVyQnkuZmllbGROYW1lLnRvTG93ZXJDYXNlKCksIHRoaXMuX29kYXRhT3B0aW9ucy5maWx0ZXJCeS5zZWFyY2hUZXJtLCB0aGlzLl9vZGF0YU9wdGlvbnMuZmlsdGVyQnkuc2VhcmNoVGVybXMpO1xyXG4gICAgICAgICAgdGhpcy51cGRhdGVGaWx0ZXJGcm9tTGlzdFRlcm1zKHRoaXMuX29kYXRhT3B0aW9ucy5maWx0ZXJCeSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5fb2RhdGFPcHRpb25zLmZpbHRlclF1ZXVlLmxlbmd0aCA+IDApIHtcclxuICAgICAgY29uc3QgcXVlcnkgPSB0aGlzLl9vZGF0YU9wdGlvbnMuZmlsdGVyUXVldWUuam9pbihgICR7dGhpcy5fb2RhdGFPcHRpb25zLmZpbHRlckJ5U2VwYXJhdG9yIHx8ICdhbmQnfSBgKTtcclxuICAgICAgdGhpcy5fb2RhdGFPcHRpb25zLmZpbHRlciA9IHF1ZXJ5OyAvLyBvdmVyd3JpdGUgd2l0aFxyXG4gICAgICBxdWVyeVRtcEFycmF5LnB1c2goYCRmaWx0ZXI9JHtxdWVyeX1gKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBqb2luIGFsbCB0aGUgb2RhdGEgZnVuY3Rpb25zIGJ5IGEgJyYnXHJcbiAgICByZXR1cm4gcXVlcnlUbXBBcnJheS5qb2luKCcmJyk7XHJcbiAgfVxyXG5cclxuICBnZXRGaWx0ZXJCeUNvbHVtbihjb2x1bW5OYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuICghIXRoaXMuX2NvbHVtbkZpbHRlcnNbY29sdW1uTmFtZV0pID8gdGhpcy5fY29sdW1uRmlsdGVyc1tjb2x1bW5OYW1lXSA6IG51bGw7XHJcbiAgfVxyXG5cclxuICBnZXRGaWx0ZXJDb3VudCgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuICh0aGlzLl9vZGF0YU9wdGlvbnMuZmlsdGVyUXVldWUpID8gdGhpcy5fb2RhdGFPcHRpb25zLmZpbHRlclF1ZXVlLmxlbmd0aCA6IDA7XHJcbiAgfVxyXG5cclxuICBnZXQgY29sdW1uRmlsdGVycygpOiBhbnlbXSB7XHJcbiAgICByZXR1cm4gdGhpcy5fY29sdW1uRmlsdGVycztcclxuICB9XHJcblxyXG4gIGdldCBvcHRpb25zKCk6IE9kYXRhT3B0aW9uIHtcclxuICAgIHJldHVybiB0aGlzLl9vZGF0YU9wdGlvbnM7XHJcbiAgfVxyXG5cclxuICBzZXQgb3B0aW9ucyhvcHRpb25zOiBPZGF0YU9wdGlvbikge1xyXG4gICAgdGhpcy5fb2RhdGFPcHRpb25zID0gb3B0aW9ucztcclxuICB9XHJcblxyXG4gIHJlbW92ZUNvbHVtbkZpbHRlcihmaWVsZE5hbWU6IHN0cmluZykge1xyXG4gICAgZGVsZXRlIHRoaXMuX2NvbHVtbkZpbHRlcnNbZmllbGROYW1lXTtcclxuICB9XHJcblxyXG4gIHNhdmVDb2x1bW5GaWx0ZXIoZmllbGROYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnksIHNlYXJjaFRlcm1zPzogYW55W10pIHtcclxuICAgIHRoaXMuX2NvbHVtbkZpbHRlcnNbZmllbGROYW1lXSA9IHtcclxuICAgICAgc2VhcmNoOiBzZWFyY2hUZXJtcyxcclxuICAgICAgdmFsdWVcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVcGRhdGUgdGhlIGZpbHRlciBieSBhIGxpc3Qgb2YgdGVybXMgdXN1YWxseSBwYXNzZWQgbWFudWFsbHkgYnkgdGhlIHVzZXIgYXMgZGVmYXVsdCBmaWx0ZXJzXHJcbiAgICogQHBhcmFtIGZpbHRlck9wdGlvbnNcclxuICAgKiBAcmV0dXJuc1xyXG4gICAqL1xyXG4gIHVwZGF0ZUZpbHRlckZyb21MaXN0VGVybXMoZmlsdGVyT3B0aW9uczogYW55KSB7XHJcbiAgICAvLyBidWlsZCB0aGUgZmlsdGVyIHF1ZXJ5XHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheShmaWx0ZXJPcHRpb25zKSkge1xyXG4gICAgICBmaWx0ZXJPcHRpb25zLmZvckVhY2goKGZpbHRlck9wdGlvbk9iamVjdCkgPT4ge1xyXG4gICAgICAgIHRoaXMudXBkYXRlRmlsdGVyRnJvbVRlcm0oZmlsdGVyT3B0aW9uT2JqZWN0KTtcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnVwZGF0ZUZpbHRlckZyb21UZXJtKGZpbHRlck9wdGlvbnMpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdXBkYXRlRmlsdGVyRnJvbVRlcm0oZmlsdGVyT3B0aW9uczogYW55KSB7XHJcbiAgICBsZXQgc2VhcmNoQnkgPSAnJztcclxuICAgIGNvbnN0IHRtcFNlYXJjaEJ5QXJyYXkgPSBbXTtcclxuICAgIGNvbnN0IGZpZWxkTmFtZSA9IGZpbHRlck9wdGlvbnMuZmllbGROYW1lO1xyXG4gICAgY29uc3QgZmllbGRTZWFyY2hUZXJtcyA9IGZpbHRlck9wdGlvbnMuc2VhcmNoVGVybXM7XHJcbiAgICBjb25zdCBvcGVyYXRvciA9IGZpbHRlck9wdGlvbnMub3BlcmF0b3I7XHJcblxyXG4gICAgLy8gd2hlbiBoYXZpbmcgbW9yZSB0aGFuIDEgc2VhcmNoIHRlcm0gKHRoZW4gY2hlY2sgaWYgd2UgaGF2ZSBhIFwiSU5cIiBvciBcIk5PVCBJTlwiIGZpbHRlciBzZWFyY2gpXHJcbiAgICBpZiAoISFmaWVsZFNlYXJjaFRlcm1zICYmIGZpZWxkU2VhcmNoVGVybXMubGVuZ3RoID4gMCkge1xyXG4gICAgICBjb25zdCB0bXBTZWFyY2hUZXJtcyA9IFtdO1xyXG5cclxuICAgICAgaWYgKG9wZXJhdG9yID09PSAnSU4nKSB7XHJcbiAgICAgICAgLy8gZXhhbXBsZTo6IChTdGFnZSBlcSBcIkV4cGlyZWRcIiBvciBTdGFnZSBlcSBcIlJlbmV3YWxcIilcclxuICAgICAgICBmb3IgKGxldCBqID0gMCwgbG5qID0gZmllbGRTZWFyY2hUZXJtcy5sZW5ndGg7IGogPCBsbmo7IGorKykge1xyXG4gICAgICAgICAgdG1wU2VhcmNoVGVybXMucHVzaChgJHtmaWVsZE5hbWV9IGVxICcke2ZpZWxkU2VhcmNoVGVybXNbal19J2ApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZWFyY2hCeSA9IHRtcFNlYXJjaFRlcm1zLmpvaW4oJyBvciAnKTtcclxuICAgICAgICBzZWFyY2hCeSA9IGAkKCR7c2VhcmNoQnl9KWA7XHJcbiAgICAgIH0gZWxzZSBpZiAob3BlcmF0b3IgPT09ICdOSU4nIHx8IG9wZXJhdG9yID09PSAnTk9USU4nIHx8IG9wZXJhdG9yID09PSAnTk9UIElOJykge1xyXG4gICAgICAgIC8vIGV4YW1wbGU6OiAoU3RhZ2UgbmUgXCJFeHBpcmVkXCIgYW5kIFN0YWdlIG5lIFwiUmVuZXdhbFwiKVxyXG4gICAgICAgIGZvciAobGV0IGsgPSAwLCBsbmsgPSBmaWVsZFNlYXJjaFRlcm1zLmxlbmd0aDsgayA8IGxuazsgaysrKSB7XHJcbiAgICAgICAgICB0bXBTZWFyY2hUZXJtcy5wdXNoKGAke2ZpZWxkTmFtZX0gbmUgJyR7ZmllbGRTZWFyY2hUZXJtc1trXX0nYCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNlYXJjaEJ5ID0gdG1wU2VhcmNoVGVybXMuam9pbignIGFuZCAnKTtcclxuICAgICAgICBzZWFyY2hCeSA9IGAkKCR7c2VhcmNoQnl9KWA7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBwdXNoIHRvIG91ciB0ZW1wIGFycmF5IGFuZCBhbHNvIHRyaW0gd2hpdGUgc3BhY2VzXHJcbiAgICB0bXBTZWFyY2hCeUFycmF5LnB1c2goU3RyaW5nLnRyaW0oc2VhcmNoQnkpKTtcclxuXHJcbiAgICAvLyBhZGQgdG8gdGhlIGZpbHRlciBxdWV1ZSBvbmx5IGlmIGl0IGRvZXNuJ3QgZXhpc3QgaW4gdGhlIHF1ZXVlXHJcbiAgICBjb25zdCBmaWx0ZXIgPSAodG1wU2VhcmNoQnlBcnJheS5sZW5ndGggPiAwKSA/IHRtcFNlYXJjaEJ5QXJyYXkuam9pbignIGFuZCAnKSA6ICcnO1xyXG4gICAgaWYgKHRoaXMuX29kYXRhT3B0aW9ucy5maWx0ZXJRdWV1ZSAmJiB0aGlzLl9vZGF0YU9wdGlvbnMuZmlsdGVyUXVldWUuaW5kZXhPZihmaWx0ZXIpID09PSAtMSkge1xyXG4gICAgICB0aGlzLl9vZGF0YU9wdGlvbnMuZmlsdGVyUXVldWUucHVzaChmaWx0ZXIpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2hhbmdlIGFueSBPRGF0YSBvcHRpb25zIHRoYXQgd2lsbCBiZSB1c2VkIHRvIGJ1aWxkIHRoZSBxdWVyeVxyXG4gICAqIEBwYXJhbSBvYmplY3Qgb3B0aW9uc1xyXG4gICAqL1xyXG4gIHVwZGF0ZU9wdGlvbnMob3B0aW9uczogT2RhdGFPcHRpb24pIHtcclxuICAgIGZvciAoY29uc3QgcHJvcGVydHkgb2YgT2JqZWN0LmtleXMob3B0aW9ucykpIHtcclxuICAgICAgaWYgKG9wdGlvbnMuaGFzT3duUHJvcGVydHkocHJvcGVydHkpKSB7XHJcbiAgICAgICAgdGhpcy5fb2RhdGFPcHRpb25zW3Byb3BlcnR5XSA9IG9wdGlvbnNbcHJvcGVydHldOyAvLyByZXBsYWNlIG9mIHRoZSBwcm9wZXJ0eVxyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyB3ZSBuZWVkIHRvIGtlZXAgdGhlIGRlZmF1bHRTb3J0QnkgZm9yIHJlZmVyZW5jZXMgd2hlbmV2ZXIgdGhlIHVzZXIgcmVtb3ZlcyBoaXMgU29ydGluZ1xyXG4gICAgICAvLyB0aGVuIHdlIHdvdWxkIHJldmVydCB0byB0aGUgZGVmYXVsdFNvcnRCeSBhbmQgdGhlIG9ubHkgd2F5IGlzIHRvIGtlZXAgYSBoYXJkIGNvcHkgaGVyZVxyXG4gICAgICBpZiAocHJvcGVydHkgPT09ICdvcmRlckJ5JyB8fCBwcm9wZXJ0eSA9PT0gJ3NvcnRCeScpIHtcclxuICAgICAgICBsZXQgc29ydEJ5ID0gb3B0aW9uc1twcm9wZXJ0eV07XHJcblxyXG4gICAgICAgIC8vIG1ha2Ugc3VyZSBmaXJzdCBjaGFyIG9mIGVhY2ggb3JkZXJCeSBmaWVsZCBpcyBjYXBpdGFsaXplXHJcbiAgICAgICAgaWYgKHRoaXMuX29kYXRhT3B0aW9ucy5jYXNlVHlwZSA9PT0gQ2FzZVR5cGUucGFzY2FsQ2FzZSkge1xyXG4gICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoc29ydEJ5KSkge1xyXG4gICAgICAgICAgICBzb3J0QnkuZm9yRWFjaCgoZmllbGQsIGluZGV4LCBpbnB1dEFycmF5KSA9PiB7XHJcbiAgICAgICAgICAgICAgaW5wdXRBcnJheVtpbmRleF0gPSBTdHJpbmcudGl0bGVDYXNlKGZpZWxkKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzb3J0QnkgPSBTdHJpbmcudGl0bGVDYXNlKG9wdGlvbnNbcHJvcGVydHldKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fb2RhdGFPcHRpb25zLm9yZGVyQnkgPSBzb3J0Qnk7XHJcbiAgICAgICAgdGhpcy5fZGVmYXVsdFNvcnRCeSA9IHNvcnRCeTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbn1cclxuIl19