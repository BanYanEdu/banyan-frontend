import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FilterMultiplePassType, FieldType, OperatorType, SortDirectionNumber, } from './../models/index';
import { sortByFieldType } from '../sorters/sorterUtilities';
import { uniqueArray } from './utilities';
var CollectionService = /** @class */ (function () {
    function CollectionService(translate) {
        this.translate = translate;
    }
    /**
     * Filter 1 or more items from a collection
     * @param collection
     * @param filterByOptions
     */
    CollectionService.prototype.filterCollection = function (collection, filterByOptions, filterResultBy) {
        if (filterResultBy === void 0) { filterResultBy = FilterMultiplePassType.chain; }
        var e_1, _a;
        var filteredCollection = [];
        // when it's array, we will use the new filtered collection after every pass
        // basically if input collection has 10 items on 1st pass and 1 item is filtered out, then on 2nd pass the input collection will be 9 items
        if (Array.isArray(filterByOptions)) {
            filteredCollection = (filterResultBy === FilterMultiplePassType.merge) ? [] : collection;
            try {
                for (var filterByOptions_1 = tslib_1.__values(filterByOptions), filterByOptions_1_1 = filterByOptions_1.next(); !filterByOptions_1_1.done; filterByOptions_1_1 = filterByOptions_1.next()) {
                    var filter = filterByOptions_1_1.value;
                    if (filterResultBy === FilterMultiplePassType.merge) {
                        var filteredPass = this.singleFilterCollection(collection, filter);
                        filteredCollection = uniqueArray(tslib_1.__spread(filteredCollection, filteredPass));
                    }
                    else {
                        filteredCollection = this.singleFilterCollection(filteredCollection, filter);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (filterByOptions_1_1 && !filterByOptions_1_1.done && (_a = filterByOptions_1.return)) _a.call(filterByOptions_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        else {
            filteredCollection = this.singleFilterCollection(collection, filterByOptions);
        }
        return filteredCollection;
    };
    /**
     * Filter an item from a collection
     * @param collection
     * @param filterBy
     */
    CollectionService.prototype.singleFilterCollection = function (collection, filterBy) {
        var filteredCollection = [];
        if (filterBy && filterBy.property) {
            var property_1 = filterBy.property;
            var operator = filterBy.operator || OperatorType.equal;
            // just check for undefined since the filter value could be null, 0, '', false etc
            var value_1 = typeof filterBy.value === 'undefined' ? '' : filterBy.value;
            switch (operator) {
                case OperatorType.equal:
                    filteredCollection = collection.filter(function (item) { return item[property_1] === value_1; });
                    break;
                case OperatorType.contains:
                    filteredCollection = collection.filter(function (item) { return item[property_1].toString().indexOf(value_1.toString()) !== -1; });
                    break;
                case OperatorType.notContains:
                    filteredCollection = collection.filter(function (item) { return item[property_1].toString().indexOf(value_1.toString()) === -1; });
                    break;
                case OperatorType.notEqual:
                default:
                    filteredCollection = collection.filter(function (item) { return item[property_1] !== value_1; });
            }
        }
        return filteredCollection;
    };
    /**
     * Sort 1 or more items in a collection
     * @param column definition
     * @param collection
     * @param sortByOptions
     * @param enableTranslateLabel
     */
    CollectionService.prototype.sortCollection = function (columnDef, collection, sortByOptions, enableTranslateLabel) {
        var _this = this;
        var sortedCollection = [];
        if (sortByOptions) {
            if (Array.isArray(sortByOptions)) {
                // multi-sort
                sortedCollection = collection.sort(function (dataRow1, dataRow2) {
                    for (var i = 0, l = sortByOptions.length; i < l; i++) {
                        var sortBy = sortByOptions[i];
                        if (sortBy && sortBy.property) {
                            var sortDirection = sortBy.sortDesc ? SortDirectionNumber.desc : SortDirectionNumber.asc;
                            var propertyName = sortBy.property;
                            var fieldType = sortBy.fieldType || FieldType.string;
                            var value1 = (enableTranslateLabel) ? _this.translate.instant(dataRow1[propertyName] || ' ') : dataRow1[propertyName];
                            var value2 = (enableTranslateLabel) ? _this.translate.instant(dataRow2[propertyName] || ' ') : dataRow2[propertyName];
                            var sortResult = sortByFieldType(value1, value2, fieldType, sortDirection, columnDef);
                            if (sortResult !== SortDirectionNumber.neutral) {
                                return sortResult;
                            }
                        }
                    }
                    return SortDirectionNumber.neutral;
                });
            }
            else if (sortByOptions && sortByOptions.property) {
                // single sort
                var propertyName_1 = sortByOptions.property;
                var sortDirection_1 = sortByOptions.sortDesc ? SortDirectionNumber.desc : SortDirectionNumber.asc;
                var fieldType_1 = sortByOptions.fieldType || FieldType.string;
                sortedCollection = collection.sort(function (dataRow1, dataRow2) {
                    var value1 = (enableTranslateLabel) ? _this.translate.instant(dataRow1[propertyName_1] || ' ') : dataRow1[propertyName_1];
                    var value2 = (enableTranslateLabel) ? _this.translate.instant(dataRow2[propertyName_1] || ' ') : dataRow2[propertyName_1];
                    var sortResult = sortByFieldType(value1, value2, fieldType_1, sortDirection_1, columnDef);
                    if (sortResult !== SortDirectionNumber.neutral) {
                        return sortResult;
                    }
                    return SortDirectionNumber.neutral;
                });
            }
            else if (sortByOptions && !sortByOptions.property) {
                var sortDirection_2 = sortByOptions.sortDesc ? SortDirectionNumber.desc : SortDirectionNumber.asc;
                var fieldType_2 = sortByOptions.fieldType || FieldType.string;
                sortedCollection = collection.sort(function (dataRow1, dataRow2) {
                    var value1 = (enableTranslateLabel) ? _this.translate.instant(dataRow1 || ' ') : dataRow1;
                    var value2 = (enableTranslateLabel) ? _this.translate.instant(dataRow2 || ' ') : dataRow2;
                    var sortResult = sortByFieldType(value1, value2, fieldType_2, sortDirection_2, columnDef);
                    if (sortResult !== SortDirectionNumber.neutral) {
                        return sortResult;
                    }
                    return SortDirectionNumber.neutral;
                });
            }
        }
        return sortedCollection;
    };
    CollectionService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [TranslateService])
    ], CollectionService);
    return CollectionService;
}());
export { CollectionService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGVjdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9zZXJ2aWNlcy9jb2xsZWN0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdkQsT0FBTyxFQUlMLHNCQUFzQixFQUV0QixTQUFTLEVBQ1QsWUFBWSxFQUNaLG1CQUFtQixHQUNwQixNQUFNLG1CQUFtQixDQUFDO0FBQzNCLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRzFDO0lBQ0UsMkJBQW9CLFNBQTJCO1FBQTNCLGNBQVMsR0FBVCxTQUFTLENBQWtCO0lBQUksQ0FBQztJQUVwRDs7OztPQUlHO0lBQ0gsNENBQWdCLEdBQWhCLFVBQWlCLFVBQWlCLEVBQUUsZUFBMEQsRUFBRSxjQUEyRztRQUEzRywrQkFBQSxFQUFBLGlCQUErRSxzQkFBc0IsQ0FBQyxLQUFLOztRQUN6TSxJQUFJLGtCQUFrQixHQUFVLEVBQUUsQ0FBQztRQUVuQyw0RUFBNEU7UUFDNUUsMklBQTJJO1FBQzNJLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsRUFBRTtZQUNsQyxrQkFBa0IsR0FBRyxDQUFDLGNBQWMsS0FBSyxzQkFBc0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUM7O2dCQUV6RixLQUFxQixJQUFBLG9CQUFBLGlCQUFBLGVBQWUsQ0FBQSxnREFBQSw2RUFBRTtvQkFBakMsSUFBTSxNQUFNLDRCQUFBO29CQUNmLElBQUksY0FBYyxLQUFL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bSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcclxuaW1wb3J0IHtcclxuICBDb2xsZWN0aW9uRmlsdGVyQnksXHJcbiAgQ29sbGVjdGlvblNvcnRCeSxcclxuICBDb2x1bW4sXHJcbiAgRmlsdGVyTXVsdGlwbGVQYXNzVHlwZSxcclxuICBGaWx0ZXJNdWx0aXBsZVBhc3NUeXBlU3RyaW5nLFxyXG4gIEZpZWxkVHlwZSxcclxuICBPcGVyYXRvclR5cGUsXHJcbiAgU29ydERpcmVjdGlvbk51bWJlcixcclxufSBmcm9tICcuLy4uL21vZGVscy9pbmRleCc7XHJcbmltcG9ydCB7IHNvcnRCeUZpZWxkVHlwZSB9IGZyb20gJy4uL3NvcnRlcnMvc29ydGVyVXRpbGl0aWVzJztcclxuaW1wb3J0IHsgdW5pcXVlQXJyYXkgfSBmcm9tICcuL3V0aWxpdGllcyc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBDb2xsZWN0aW9uU2VydmljZSB7XHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSB0cmFuc2xhdGU6IFRyYW5zbGF0ZVNlcnZpY2UpIHsgfVxyXG5cclxuICAvKipcclxuICAgKiBGaWx0ZXIgMSBvciBtb3JlIGl0ZW1zIGZyb20gYSBjb2xsZWN0aW9uXHJcbiAgICogQHBhcmFtIGNvbGxlY3Rpb25cclxuICAgKiBAcGFyYW0gZmlsdGVyQnlPcHRpb25zXHJcbiAgICovXHJcbiAgZmlsdGVyQ29sbGVjdGlvbihjb2xsZWN0aW9uOiBhbnlbXSwgZmlsdGVyQnlPcHRpb25zOiBDb2xsZWN0aW9uRmlsdGVyQnkgfCBDb2xsZWN0aW9uRmlsdGVyQnlbXSwgZmlsdGVyUmVzdWx0Qnk6IEZpbHRlck11bHRpcGxlUGFzc1R5cGUgfCBGaWx0ZXJNdWx0aXBsZVBhc3NUeXBlU3RyaW5nIHwgbnVsbCA9IEZpbHRlck11bHRpcGxlUGFzc1R5cGUuY2hhaW4pOiBhbnlbXSB7XHJcbiAgICBsZXQgZmlsdGVyZWRDb2xsZWN0aW9uOiBhbnlbXSA9IFtdO1xyXG5cclxuICAgIC8vIHdoZW4gaXQncyBhcnJheSwgd2Ugd2lsbCB1c2UgdGhlIG5ldyBmaWx0ZXJlZCBjb2xsZWN0aW9uIGFmdGVyIGV2ZXJ5IHBhc3NcclxuICAgIC8vIGJhc2ljYWxseSBpZiBpbnB1dCBjb2xsZWN0aW9uIGhhcyAxMCBpdGVtcyBvbiAxc3QgcGFzcyBhbmQgMSBpdGVtIGlzIGZpbHRlcmVkIG91dCwgdGhlbiBvbiAybmQgcGFzcyB0aGUgaW5wdXQgY29sbGVjdGlvbiB3aWxsIGJlIDkgaXRlbXNcclxuICAgIGlmIChBcnJheS5pc0FycmF5KGZpbHRlckJ5T3B0aW9ucykpIHtcclxuICAgICAgZmlsdGVyZWRDb2xsZWN0aW9uID0gKGZpbHRlclJlc3VsdEJ5ID09PSBGaWx0ZXJNdWx0aXBsZVBhc3NUeXBlLm1lcmdlKSA/IFtdIDogY29sbGVjdGlvbjtcclxuXHJcbiAgICAgIGZvciAoY29uc3QgZmlsdGVyIG9mIGZpbHRlckJ5T3B0aW9ucykge1xyXG4gICAgICAgIGlmIChmaWx0ZXJSZXN1bHRCeSA9PT0gRmlsdGVyTXVsdGlwbGVQYXNzVHlwZS5tZXJnZSkge1xyXG4gICAgICAgICAgY29uc3QgZmlsdGVyZWRQYXNzID0gdGhpcy5zaW5nbGVGaWx0ZXJDb2xsZWN0aW9uKGNvbGxlY3Rpb24sIGZpbHRlcik7XHJcbiAgICAgICAgICBmaWx0ZXJlZENvbGxlY3Rpb24gPSB1bmlxdWVBcnJheShbLi4uZmlsdGVyZWRDb2xsZWN0aW9uLCAuLi5maWx0ZXJlZFBhc3NdKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZmlsdGVyZWRDb2xsZWN0aW9uID0gdGhpcy5zaW5nbGVGaWx0ZXJDb2xsZWN0aW9uKGZpbHRlcmVkQ29sbGVjdGlvbiwgZmlsdGVyKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGZpbHRlcmVkQ29sbGVjdGlvbiA9IHRoaXMuc2luZ2xlRmlsdGVyQ29sbGVjdGlvbihjb2xsZWN0aW9uLCBmaWx0ZXJCeU9wdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBmaWx0ZXJlZENvbGxlY3Rpb247XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBGaWx0ZXIgYW4gaXRlbSBmcm9tIGEgY29sbGVjdGlvblxyXG4gICAqIEBwYXJhbSBjb2xsZWN0aW9uXHJcbiAgICogQHBhcmFtIGZpbHRlckJ5XHJcbiAgICovXHJcbiAgc2luZ2xlRmlsdGVyQ29sbGVjdGlvbihjb2xsZWN0aW9uOiBhbnlbXSwgZmlsdGVyQnk6IENvbGxlY3Rpb25GaWx0ZXJCeSk6IGFueVtdIHtcclxuICAgIGxldCBmaWx0ZXJlZENvbGxlY3Rpb246IGFueVtdID0gW107XHJcblxyXG4gICAgaWYgKGZpbHRlckJ5ICYmIGZpbHRlckJ5LnByb3BlcnR5KSB7XHJcbiAgICAgIGNvbnN0IHByb3BlcnR5ID0gZmlsdGVyQnkucHJvcGVydHk7XHJcbiAgICAgIGNvbnN0IG9wZXJhdG9yID0gZmlsdGVyQnkub3BlcmF0b3IgfHwgT3BlcmF0b3JUeXBlLmVxdWFsO1xyXG4gICAgICAvLyBqdXN0IGNoZWNrIGZvciB1bmRlZmluZWQgc2luY2UgdGhlIGZpbHRlciB2YWx1ZSBjb3VsZCBiZSBudWxsLCAwLCAnJywgZmFsc2UgZXRjXHJcbiAgICAgIGNvbnN0IHZhbHVlID0gdHlwZW9mIGZpbHRlckJ5LnZhbHVlID09PSAndW5kZWZpbmVkJyA/ICcnIDogZmlsdGVyQnkudmFsdWU7XHJcblxyXG4gICAgICBzd2l0Y2ggKG9wZXJhdG9yKSB7XHJcbiAgICAgICAgY2FzZSBPcGVyYXRvclR5cGUuZXF1YWw6XHJcbiAgICAgICAgICBmaWx0ZXJlZENvbGxlY3Rpb24gPSBjb2xsZWN0aW9uLmZpbHRlcigoaXRlbSkgPT4gaXRlbVtwcm9wZXJ0eV0gPT09IHZhbHVlKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgT3BlcmF0b3JUeXBlLmNvbnRhaW5zOlxyXG4gICAgICAgICAgZmlsdGVyZWRDb2xsZWN0aW9uID0gY29sbGVjdGlvbi5maWx0ZXIoKGl0ZW0pID0+IGl0ZW1bcHJvcGVydHldLnRvU3RyaW5nKCkuaW5kZXhPZih2YWx1ZS50b1N0cmluZygpKSAhPT0gLTEpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBPcGVyYXRvclR5cGUubm90Q29udGFpbnM6XHJcbiAgICAgICAgICBmaWx0ZXJlZENvbGxlY3Rpb24gPSBjb2xsZWN0aW9uLmZpbHRlcigoaXRlbSkgPT4gaXRlbVtwcm9wZXJ0eV0udG9TdHJpbmcoKS5pbmRleE9mKHZhbHVlLnRvU3RyaW5nKCkpID09PSAtMSk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIE9wZXJhdG9yVHlwZS5ub3RFcXVhbDpcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgZmlsdGVyZWRDb2xsZWN0aW9uID0gY29sbGVjdGlvbi5maWx0ZXIoKGl0ZW0pID0+IGl0ZW1bcHJvcGVydHldICE9PSB2YWx1ZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZmlsdGVyZWRDb2xsZWN0aW9uO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU29ydCAxIG9yIG1vcmUgaXRlbXMgaW4gYSBjb2xsZWN0aW9uXHJcbiAgICogQHBhcmFtIGNvbHVtbiBkZWZpbml0aW9uXHJcbiAgICogQHBhcmFtIGNvbGxlY3Rpb25cclxuICAgKiBAcGFyYW0gc29ydEJ5T3B0aW9uc1xyXG4gICAqIEBwYXJhbSBlbmFibGVUcmFuc2xhdGVMYWJlbFxyXG4gICAqL1xyXG4gIHNvcnRDb2xsZWN0aW9uKGNvbHVtbkRlZjogQ29sdW1uLCBjb2xsZWN0aW9uOiBhbnlbXSwgc29ydEJ5T3B0aW9uczogQ29sbGVjdGlvblNvcnRCeSB8IENvbGxlY3Rpb25Tb3J0QnlbXSwgZW5hYmxlVHJhbnNsYXRlTGFiZWw/OiBib29sZWFuKTogYW55W10ge1xyXG4gICAgbGV0IHNvcnRlZENvbGxlY3Rpb246IGFueVtdID0gW107XHJcblxyXG4gICAgaWYgKHNvcnRCeU9wdGlvbnMpIHtcclxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoc29ydEJ5T3B0aW9ucykpIHtcclxuICAgICAgICAvLyBtdWx0aS1zb3J0XHJcbiAgICAgICAgc29ydGVkQ29sbGVjdGlvbiA9IGNvbGxlY3Rpb24uc29ydCgoZGF0YVJvdzE6IGFueSwgZGF0YVJvdzI6IGFueSkgPT4ge1xyXG4gICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBzb3J0QnlPcHRpb25zLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCBzb3J0QnkgPSBzb3J0QnlPcHRpb25zW2ldO1xyXG5cclxuICAgICAgICAgICAgaWYgKHNvcnRCeSAmJiBzb3J0QnkucHJvcGVydHkpIHtcclxuICAgICAgICAgICAgICBjb25zdCBzb3J0RGlyZWN0aW9uID0gc29ydEJ5LnNvcnREZXNjID8gU29ydERpcmVjdGlvbk51bWJlci5kZXNjIDogU29ydERpcmVjdGlvbk51bWJlci5hc2M7XHJcbiAgICAgICAgICAgICAgY29uc3QgcHJvcGVydHlOYW1lID0gc29ydEJ5LnByb3BlcnR5O1xyXG4gICAgICAgICAgICAgIGNvbnN0IGZpZWxkVHlwZSA9IHNvcnRCeS5maWVsZFR5cGUgfHwgRmllbGRUeXBlLnN0cmluZztcclxuICAgICAgICAgICAgICBjb25zdCB2YWx1ZTEgPSAoZW5hYmxlVHJhbnNsYXRlTGFiZWwpID8gdGhpcy50cmFuc2xhdGUuaW5zdGFudChkYXRhUm93MVtwcm9wZXJ0eU5hbWVdIHx8ICcgJykgOiBkYXRhUm93MVtwcm9wZXJ0eU5hbWVdO1xyXG4gICAgICAgICAgICAgIGNvbnN0IHZhbHVlMiA9IChlbmFibGVUcmFuc2xhdGVMYWJlbCkgPyB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KGRhdGFSb3cyW3Byb3BlcnR5TmFtZV0gfHwgJyAnKSA6IGRhdGFSb3cyW3Byb3BlcnR5TmFtZV07XHJcblxyXG4gICAgICAgICAgICAgIGNvbnN0IHNvcnRSZXN1bHQgPSBzb3J0QnlGaWVsZFR5cGUodmFsdWUxLCB2YWx1ZTIsIGZpZWxkVHlwZSwgc29ydERpcmVjdGlvbiwgY29sdW1uRGVmKTtcclxuICAgICAgICAgICAgICBpZiAoc29ydFJlc3VsdCAhPT0gU29ydERpcmVjdGlvbk51bWJlci5uZXV0cmFsKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc29ydFJlc3VsdDtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiBTb3J0RGlyZWN0aW9uTnVtYmVyLm5ldXRyYWw7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gZWxzZSBpZiAoc29ydEJ5T3B0aW9ucyAmJiBzb3J0QnlPcHRpb25zLnByb3BlcnR5KSB7XHJcbiAgICAgICAgLy8gc2luZ2xlIHNvcnRcclxuICAgICAgICBjb25zdCBwcm9wZXJ0eU5hbWUgPSBzb3J0QnlPcHRpb25zLnByb3BlcnR5O1xyXG4gICAgICAgIGNvbnN0IHNvcnREaXJlY3Rpb24gPSBzb3J0QnlPcHRpb25zLnNvcnREZXNjID8gU29ydERpcmVjdGlvbk51bWJlci5kZXNjIDogU29ydERpcmVjdGlvbk51bWJlci5hc2M7XHJcbiAgICAgICAgY29uc3QgZmllbGRUeXBlID0gc29ydEJ5T3B0aW9ucy5maWVsZFR5cGUgfHwgRmllbGRUeXBlLnN0cmluZztcclxuXHJcbiAgICAgICAgc29ydGVkQ29sbGVjdGlvbiA9IGNvbGxlY3Rpb24uc29ydCgoZGF0YVJvdzE6IGFueSwgZGF0YVJvdzI6IGFueSkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgdmFsdWUxID0gKGVuYWJsZVRyYW5zbGF0ZUxhYmVsKSA/IHRoaXMudHJhbnNsYXRlLmluc3RhbnQoZGF0YVJvdzFbcHJvcGVydHlOYW1lXSB8fCAnICcpIDogZGF0YVJvdzFbcHJvcGVydHlOYW1lXTtcclxuICAgICAgICAgIGNvbnN0IHZhbHVlMiA9IChlbmFibGVUcmFuc2xhdGVMYWJlbCkgPyB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KGRhdGFSb3cyW3Byb3BlcnR5TmFtZV0gfHwgJyAnKSA6IGRhdGFSb3cyW3Byb3BlcnR5TmFtZV07XHJcbiAgICAgICAgICBjb25zdCBzb3J0UmVzdWx0ID0gc29ydEJ5RmllbGRUeXBlKHZhbHVlMSwgdmFsdWUyLCBmaWVsZFR5cGUsIHNvcnREaXJlY3Rpb24sIGNvbHVtbkRlZik7XHJcbiAgICAgICAgICBpZiAoc29ydFJlc3VsdCAhPT0gU29ydERpcmVjdGlvbk51bWJlci5uZXV0cmFsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzb3J0UmVzdWx0O1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIFNvcnREaXJlY3Rpb25OdW1iZXIubmV1dHJhbDtcclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIGlmIChzb3J0QnlPcHRpb25zICYmICFzb3J0QnlPcHRpb25zLnByb3BlcnR5KSB7XHJcbiAgICAgICAgY29uc3Qgc29ydERpcmVjdGlvbiA9IHNvcnRCeU9wdGlvbnMuc29ydERlc2MgPyBTb3J0RGlyZWN0aW9uTnVtYmVyLmRlc2MgOiBTb3J0RGlyZWN0aW9uTnVtYmVyLmFzYztcclxuICAgICAgICBjb25zdCBmaWVsZFR5cGUgPSBzb3J0QnlPcHRpb25zLmZpZWxkVHlwZSB8fCBGaWVsZFR5cGUuc3RyaW5nO1xyXG5cclxuICAgICAgICBzb3J0ZWRDb2xsZWN0aW9uID0gY29sbGVjdGlvbi5zb3J0KChkYXRhUm93MTogYW55LCBkYXRhUm93MjogYW55KSA9PiB7XHJcbiAgICAgICAgICBjb25zdCB2YWx1ZTEgPSAoZW5hYmxlVHJhbnNsYXRlTGFiZWwpID8gdGhpcy50cmFuc2xhdGUuaW5zdGFudChkYXRhUm93MSB8fCAnICcpIDogZGF0YVJvdzE7XHJcbiAgICAgICAgICBjb25zdCB2YWx1ZTIgPSAoZW5hYmxlVHJhbnNsYXRlTGFiZWwpID8gdGhpcy50cmFuc2xhdGUuaW5zdGFudChkYXRhUm93MiB8fCAnICcpIDogZGF0YVJvdzI7XHJcbiAgICAgICAgICBjb25zdCBzb3J0UmVzdWx0ID0gc29ydEJ5RmllbGRUeXBlKHZhbHVlMSwgdmFsdWUyLCBmaWVsZFR5cGUsIHNvcnREaXJlY3Rpb24sIGNvbHVtbkRlZik7XHJcbiAgICAgICAgICBpZiAoc29ydFJlc3VsdCAhPT0gU29ydERpcmVjdGlvbk51bWJlci5uZXV0cmFsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzb3J0UmVzdWx0O1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIFNvcnREaXJlY3Rpb25OdW1iZXIubmV1dHJhbDtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBzb3J0ZWRDb2xsZWN0aW9uO1xyXG4gIH1cclxufVxyXG4iXX0=