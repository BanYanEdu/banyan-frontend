import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FilterMultiplePassType, FieldType, OperatorType, SortDirectionNumber, } from './../models/index';
import { sortByFieldType } from '../sorters/sorterUtilities';
import { uniqueArray } from './utilities';
let CollectionService = class CollectionService {
    constructor(translate) {
        this.translate = translate;
    }
    /**
     * Filter 1 or more items from a collection
     * @param collection
     * @param filterByOptions
     */
    filterCollection(collection, filterByOptions, filterResultBy = FilterMultiplePassType.chain) {
        let filteredCollection = [];
        // when it's array, we will use the new filtered collection after every pass
        // basically if input collection has 10 items on 1st pass and 1 item is filtered out, then on 2nd pass the input collection will be 9 items
        if (Array.isArray(filterByOptions)) {
            filteredCollection = (filterResultBy === FilterMultiplePassType.merge) ? [] : collection;
            for (const filter of filterByOptions) {
                if (filterResultBy === FilterMultiplePassType.merge) {
                    const filteredPass = this.singleFilterCollection(collection, filter);
                    filteredCollection = uniqueArray([...filteredCollection, ...filteredPass]);
                }
                else {
                    filteredCollection = this.singleFilterCollection(filteredCollection, filter);
                }
            }
        }
        else {
            filteredCollection = this.singleFilterCollection(collection, filterByOptions);
        }
        return filteredCollection;
    }
    /**
     * Filter an item from a collection
     * @param collection
     * @param filterBy
     */
    singleFilterCollection(collection, filterBy) {
        let filteredCollection = [];
        if (filterBy && filterBy.property) {
            const property = filterBy.property;
            const operator = filterBy.operator || OperatorType.equal;
            // just check for undefined since the filter value could be null, 0, '', false etc
            const value = typeof filterBy.value === 'undefined' ? '' : filterBy.value;
            switch (operator) {
                case OperatorType.equal:
                    filteredCollection = collection.filter((item) => item[property] === value);
                    break;
                case OperatorType.contains:
                    filteredCollection = collection.filter((item) => item[property].toString().indexOf(value.toString()) !== -1);
                    break;
                case OperatorType.notContains:
                    filteredCollection = collection.filter((item) => item[property].toString().indexOf(value.toString()) === -1);
                    break;
                case OperatorType.notEqual:
                default:
                    filteredCollection = collection.filter((item) => item[property] !== value);
            }
        }
        return filteredCollection;
    }
    /**
     * Sort 1 or more items in a collection
     * @param column definition
     * @param collection
     * @param sortByOptions
     * @param enableTranslateLabel
     */
    sortCollection(columnDef, collection, sortByOptions, enableTranslateLabel) {
        let sortedCollection = [];
        if (sortByOptions) {
            if (Array.isArray(sortByOptions)) {
                // multi-sort
                sortedCollection = collection.sort((dataRow1, dataRow2) => {
                    for (let i = 0, l = sortByOptions.length; i < l; i++) {
                        const sortBy = sortByOptions[i];
                        if (sortBy && sortBy.property) {
                            const sortDirection = sortBy.sortDesc ? SortDirectionNumber.desc : SortDirectionNumber.asc;
                            const propertyName = sortBy.property;
                            const fieldType = sortBy.fieldType || FieldType.string;
                            const value1 = (enableTranslateLabel) ? this.translate.instant(dataRow1[propertyName] || ' ') : dataRow1[propertyName];
                            const value2 = (enableTranslateLabel) ? this.translate.instant(dataRow2[propertyName] || ' ') : dataRow2[propertyName];
                            const sortResult = sortByFieldType(value1, value2, fieldType, sortDirection, columnDef);
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
                const propertyName = sortByOptions.property;
                const sortDirection = sortByOptions.sortDesc ? SortDirectionNumber.desc : SortDirectionNumber.asc;
                const fieldType = sortByOptions.fieldType || FieldType.string;
                sortedCollection = collection.sort((dataRow1, dataRow2) => {
                    const value1 = (enableTranslateLabel) ? this.translate.instant(dataRow1[propertyName] || ' ') : dataRow1[propertyName];
                    const value2 = (enableTranslateLabel) ? this.translate.instant(dataRow2[propertyName] || ' ') : dataRow2[propertyName];
                    const sortResult = sortByFieldType(value1, value2, fieldType, sortDirection, columnDef);
                    if (sortResult !== SortDirectionNumber.neutral) {
                        return sortResult;
                    }
                    return SortDirectionNumber.neutral;
                });
            }
            else if (sortByOptions && !sortByOptions.property) {
                const sortDirection = sortByOptions.sortDesc ? SortDirectionNumber.desc : SortDirectionNumber.asc;
                const fieldType = sortByOptions.fieldType || FieldType.string;
                sortedCollection = collection.sort((dataRow1, dataRow2) => {
                    const value1 = (enableTranslateLabel) ? this.translate.instant(dataRow1 || ' ') : dataRow1;
                    const value2 = (enableTranslateLabel) ? this.translate.instant(dataRow2 || ' ') : dataRow2;
                    const sortResult = sortByFieldType(value1, value2, fieldType, sortDirection, columnDef);
                    if (sortResult !== SortDirectionNumber.neutral) {
                        return sortResult;
                    }
                    return SortDirectionNumber.neutral;
                });
            }
        }
        return sortedCollection;
    }
};
CollectionService = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [TranslateService])
], CollectionService);
export { CollectionService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGVjdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9zZXJ2aWNlcy9jb2xsZWN0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdkQsT0FBTyxFQUlMLHNCQUFzQixFQUV0QixTQUFTLEVBQ1QsWUFBWSxFQUNaLG1CQUFtQixHQUNwQixNQUFNLG1CQUFtQixDQUFDO0FBQzNCLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRzFDLElBQWEsaUJBQWlCLEdBQTlCLE1BQWEsaUJBQWlCO0lBQzVCLFlBQW9CLFNBQTJCO1FBQTNCLGNBQVMsR0FBVCxTQUFTLENBQWtCO0lBQUksQ0FBQztJQUVwRDs7OztPQUlHO0lBQ0gsZ0JBQWdCLENBQUMsVUFBaUIsRUFBRSxlQUEwRCxFQUFFLGlCQUErRSxzQkFBc0IsQ0FBQyxLQUFLO1FBQ3pNLElBQUksa0JBQWtCLEdBQVUsRUFBRSxDQUFDO1FBRW5DLDRFQUE0RTtRQUM1RSwySUFBMkk7UUFDM0ksSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxFQUFFO1lBQ2xDLGtCQUFrQixHQUFHLENBQUMsY0FBYyxLQUFLLHNCQUFzQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQztZQUV6RixLQUFLLE1BQU0sTUFBTSxJQUFJLGVBQWUsRUFBRTtnQkFDcEMsSUFBSSxjQUFjLEtBQUssc0JBQXNCLENBQUMsS0FBSyxFQUFFO29CQUNuRCxNQUFNLFlBQVks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bUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQztnQkFDbEcsTUFBTSxTQUFTLEdBQUcsYUFBYSxDQUFDLFNBQVMsSUFBSSxTQUFTLENBQUMsTUFBTSxDQUFDO2dCQUU5RCxnQkFBZ0IsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBYSxFQUFFLFFBQWEsRUFBRSxFQUFFO29CQUNsRSxNQUFNLE1BQU0sR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO29CQUMzRixNQUFNLE1BQU0sR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO29CQUMzRixNQUFNLFVBQVUsR0FBRyxlQUFlLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsYUFBYSxFQUFFLFNBQVMsQ0FBQyxDQUFDO29CQUN4RixJQUFJLFVBQVUsS0FBSyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUU7d0JBQzlDLE9BQU8sVUFBVSxDQUFDO3FCQUNuQjtvQkFDRCxPQUFPLG1CQUFtQixDQUFDLE9BQU8sQ0FBQztnQkFDckMsQ0FBQyxDQUFDLENBQUM7YUFDSjtTQUNGO1FBRUQsT0FBTyxnQkFBZ0IsQ0FBQztJQUMxQixDQUFDO0NBQ0YsQ0FBQTtBQWpJWSxpQkFBaUI7SUFEN0IsVUFBVSxFQUFFOzZDQUVvQixnQkFBZ0I7R0FEcEMsaUJBQWlCLENBaUk3QjtTQWpJWSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcclxuaW1wb3J0IHtcclxuICBDb2xsZWN0aW9uRmlsdGVyQnksXHJcbiAgQ29sbGVjdGlvblNvcnRCeSxcclxuICBDb2x1bW4sXHJcbiAgRmlsdGVyTXVsdGlwbGVQYXNzVHlwZSxcclxuICBGaWx0ZXJNdWx0aXBsZVBhc3NUeXBlU3RyaW5nLFxyXG4gIEZpZWxkVHlwZSxcclxuICBPcGVyYXRvclR5cGUsXHJcbiAgU29ydERpcmVjdGlvbk51bWJlcixcclxufSBmcm9tICcuLy4uL21vZGVscy9pbmRleCc7XHJcbmltcG9ydCB7IHNvcnRCeUZpZWxkVHlwZSB9IGZyb20gJy4uL3NvcnRlcnMvc29ydGVyVXRpbGl0aWVzJztcclxuaW1wb3J0IHsgdW5pcXVlQXJyYXkgfSBmcm9tICcuL3V0aWxpdGllcyc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBDb2xsZWN0aW9uU2VydmljZSB7XHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSB0cmFuc2xhdGU6IFRyYW5zbGF0ZVNlcnZpY2UpIHsgfVxyXG5cclxuICAvKipcclxuICAgKiBGaWx0ZXIgMSBvciBtb3JlIGl0ZW1zIGZyb20gYSBjb2xsZWN0aW9uXHJcbiAgICogQHBhcmFtIGNvbGxlY3Rpb25cclxuICAgKiBAcGFyYW0gZmlsdGVyQnlPcHRpb25zXHJcbiAgICovXHJcbiAgZmlsdGVyQ29sbGVjdGlvbihjb2xsZWN0aW9uOiBhbnlbXSwgZmlsdGVyQnlPcHRpb25zOiBDb2xsZWN0aW9uRmlsdGVyQnkgfCBDb2xsZWN0aW9uRmlsdGVyQnlbXSwgZmlsdGVyUmVzdWx0Qnk6IEZpbHRlck11bHRpcGxlUGFzc1R5cGUgfCBGaWx0ZXJNdWx0aXBsZVBhc3NUeXBlU3RyaW5nIHwgbnVsbCA9IEZpbHRlck11bHRpcGxlUGFzc1R5cGUuY2hhaW4pOiBhbnlbXSB7XHJcbiAgICBsZXQgZmlsdGVyZWRDb2xsZWN0aW9uOiBhbnlbXSA9IFtdO1xyXG5cclxuICAgIC8vIHdoZW4gaXQncyBhcnJheSwgd2Ugd2lsbCB1c2UgdGhlIG5ldyBmaWx0ZXJlZCBjb2xsZWN0aW9uIGFmdGVyIGV2ZXJ5IHBhc3NcclxuICAgIC8vIGJhc2ljYWxseSBpZiBpbnB1dCBjb2xsZWN0aW9uIGhhcyAxMCBpdGVtcyBvbiAxc3QgcGFzcyBhbmQgMSBpdGVtIGlzIGZpbHRlcmVkIG91dCwgdGhlbiBvbiAybmQgcGFzcyB0aGUgaW5wdXQgY29sbGVjdGlvbiB3aWxsIGJlIDkgaXRlbXNcclxuICAgIGlmIChBcnJheS5pc0FycmF5KGZpbHRlckJ5T3B0aW9ucykpIHtcclxuICAgICAgZmlsdGVyZWRDb2xsZWN0aW9uID0gKGZpbHRlclJlc3VsdEJ5ID09PSBGaWx0ZXJNdWx0aXBsZVBhc3NUeXBlLm1lcmdlKSA/IFtdIDogY29sbGVjdGlvbjtcclxuXHJcbiAgICAgIGZvciAoY29uc3QgZmlsdGVyIG9mIGZpbHRlckJ5T3B0aW9ucykge1xyXG4gICAgICAgIGlmIChmaWx0ZXJSZXN1bHRCeSA9PT0gRmlsdGVyTXVsdGlwbGVQYXNzVHlwZS5tZXJnZSkge1xyXG4gICAgICAgICAgY29uc3QgZmlsdGVyZWRQYXNzID0gdGhpcy5zaW5nbGVGaWx0ZXJDb2xsZWN0aW9uKGNvbGxlY3Rpb24sIGZpbHRlcik7XHJcbiAgICAgICAgICBmaWx0ZXJlZENvbGxlY3Rpb24gPSB1bmlxdWVBcnJheShbLi4uZmlsdGVyZWRDb2xsZWN0aW9uLCAuLi5maWx0ZXJlZFBhc3NdKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZmlsdGVyZWRDb2xsZWN0aW9uID0gdGhpcy5zaW5nbGVGaWx0ZXJDb2xsZWN0aW9uKGZpbHRlcmVkQ29sbGVjdGlvbiwgZmlsdGVyKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGZpbHRlcmVkQ29sbGVjdGlvbiA9IHRoaXMuc2luZ2xlRmlsdGVyQ29sbGVjdGlvbihjb2xsZWN0aW9uLCBmaWx0ZXJCeU9wdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBmaWx0ZXJlZENvbGxlY3Rpb247XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBGaWx0ZXIgYW4gaXRlbSBmcm9tIGEgY29sbGVjdGlvblxyXG4gICAqIEBwYXJhbSBjb2xsZWN0aW9uXHJcbiAgICogQHBhcmFtIGZpbHRlckJ5XHJcbiAgICovXHJcbiAgc2luZ2xlRmlsdGVyQ29sbGVjdGlvbihjb2xsZWN0aW9uOiBhbnlbXSwgZmlsdGVyQnk6IENvbGxlY3Rpb25GaWx0ZXJCeSk6IGFueVtdIHtcclxuICAgIGxldCBmaWx0ZXJlZENvbGxlY3Rpb246IGFueVtdID0gW107XHJcblxyXG4gICAgaWYgKGZpbHRlckJ5ICYmIGZpbHRlckJ5LnByb3BlcnR5KSB7XHJcbiAgICAgIGNvbnN0IHByb3BlcnR5ID0gZmlsdGVyQnkucHJvcGVydHk7XHJcbiAgICAgIGNvbnN0IG9wZXJhdG9yID0gZmlsdGVyQnkub3BlcmF0b3IgfHwgT3BlcmF0b3JUeXBlLmVxdWFsO1xyXG4gICAgICAvLyBqdXN0IGNoZWNrIGZvciB1bmRlZmluZWQgc2luY2UgdGhlIGZpbHRlciB2YWx1ZSBjb3VsZCBiZSBudWxsLCAwLCAnJywgZmFsc2UgZXRjXHJcbiAgICAgIGNvbnN0IHZhbHVlID0gdHlwZW9mIGZpbHRlckJ5LnZhbHVlID09PSAndW5kZWZpbmVkJyA/ICcnIDogZmlsdGVyQnkudmFsdWU7XHJcblxyXG4gICAgICBzd2l0Y2ggKG9wZXJhdG9yKSB7XHJcbiAgICAgICAgY2FzZSBPcGVyYXRvclR5cGUuZXF1YWw6XHJcbiAgICAgICAgICBmaWx0ZXJlZENvbGxlY3Rpb24gPSBjb2xsZWN0aW9uLmZpbHRlcigoaXRlbSkgPT4gaXRlbVtwcm9wZXJ0eV0gPT09IHZhbHVlKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgT3BlcmF0b3JUeXBlLmNvbnRhaW5zOlxyXG4gICAgICAgICAgZmlsdGVyZWRDb2xsZWN0aW9uID0gY29sbGVjdGlvbi5maWx0ZXIoKGl0ZW0pID0+IGl0ZW1bcHJvcGVydHldLnRvU3RyaW5nKCkuaW5kZXhPZih2YWx1ZS50b1N0cmluZygpKSAhPT0gLTEpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBPcGVyYXRvclR5cGUubm90Q29udGFpbnM6XHJcbiAgICAgICAgICBmaWx0ZXJlZENvbGxlY3Rpb24gPSBjb2xsZWN0aW9uLmZpbHRlcigoaXRlbSkgPT4gaXRlbVtwcm9wZXJ0eV0udG9TdHJpbmcoKS5pbmRleE9mKHZhbHVlLnRvU3RyaW5nKCkpID09PSAtMSk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIE9wZXJhdG9yVHlwZS5ub3RFcXVhbDpcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgZmlsdGVyZWRDb2xsZWN0aW9uID0gY29sbGVjdGlvbi5maWx0ZXIoKGl0ZW0pID0+IGl0ZW1bcHJvcGVydHldICE9PSB2YWx1ZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZmlsdGVyZWRDb2xsZWN0aW9uO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU29ydCAxIG9yIG1vcmUgaXRlbXMgaW4gYSBjb2xsZWN0aW9uXHJcbiAgICogQHBhcmFtIGNvbHVtbiBkZWZpbml0aW9uXHJcbiAgICogQHBhcmFtIGNvbGxlY3Rpb25cclxuICAgKiBAcGFyYW0gc29ydEJ5T3B0aW9uc1xyXG4gICAqIEBwYXJhbSBlbmFibGVUcmFuc2xhdGVMYWJlbFxyXG4gICAqL1xyXG4gIHNvcnRDb2xsZWN0aW9uKGNvbHVtbkRlZjogQ29sdW1uLCBjb2xsZWN0aW9uOiBhbnlbXSwgc29ydEJ5T3B0aW9uczogQ29sbGVjdGlvblNvcnRCeSB8IENvbGxlY3Rpb25Tb3J0QnlbXSwgZW5hYmxlVHJhbnNsYXRlTGFiZWw/OiBib29sZWFuKTogYW55W10ge1xyXG4gICAgbGV0IHNvcnRlZENvbGxlY3Rpb246IGFueVtdID0gW107XHJcblxyXG4gICAgaWYgKHNvcnRCeU9wdGlvbnMpIHtcclxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoc29ydEJ5T3B0aW9ucykpIHtcclxuICAgICAgICAvLyBtdWx0aS1zb3J0XHJcbiAgICAgICAgc29ydGVkQ29sbGVjdGlvbiA9IGNvbGxlY3Rpb24uc29ydCgoZGF0YVJvdzE6IGFueSwgZGF0YVJvdzI6IGFueSkgPT4ge1xyXG4gICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBzb3J0QnlPcHRpb25zLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCBzb3J0QnkgPSBzb3J0QnlPcHRpb25zW2ldO1xyXG5cclxuICAgICAgICAgICAgaWYgKHNvcnRCeSAmJiBzb3J0QnkucHJvcGVydHkpIHtcclxuICAgICAgICAgICAgICBjb25zdCBzb3J0RGlyZWN0aW9uID0gc29ydEJ5LnNvcnREZXNjID8gU29ydERpcmVjdGlvbk51bWJlci5kZXNjIDogU29ydERpcmVjdGlvbk51bWJlci5hc2M7XHJcbiAgICAgICAgICAgICAgY29uc3QgcHJvcGVydHlOYW1lID0gc29ydEJ5LnByb3BlcnR5O1xyXG4gICAgICAgICAgICAgIGNvbnN0IGZpZWxkVHlwZSA9IHNvcnRCeS5maWVsZFR5cGUgfHwgRmllbGRUeXBlLnN0cmluZztcclxuICAgICAgICAgICAgICBjb25zdCB2YWx1ZTEgPSAoZW5hYmxlVHJhbnNsYXRlTGFiZWwpID8gdGhpcy50cmFuc2xhdGUuaW5zdGFudChkYXRhUm93MVtwcm9wZXJ0eU5hbWVdIHx8ICcgJykgOiBkYXRhUm93MVtwcm9wZXJ0eU5hbWVdO1xyXG4gICAgICAgICAgICAgIGNvbnN0IHZhbHVlMiA9IChlbmFibGVUcmFuc2xhdGVMYWJlbCkgPyB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KGRhdGFSb3cyW3Byb3BlcnR5TmFtZV0gfHwgJyAnKSA6IGRhdGFSb3cyW3Byb3BlcnR5TmFtZV07XHJcblxyXG4gICAgICAgICAgICAgIGNvbnN0IHNvcnRSZXN1bHQgPSBzb3J0QnlGaWVsZFR5cGUodmFsdWUxLCB2YWx1ZTIsIGZpZWxkVHlwZSwgc29ydERpcmVjdGlvbiwgY29sdW1uRGVmKTtcclxuICAgICAgICAgICAgICBpZiAoc29ydFJlc3VsdCAhPT0gU29ydERpcmVjdGlvbk51bWJlci5uZXV0cmFsKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc29ydFJlc3VsdDtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiBTb3J0RGlyZWN0aW9uTnVtYmVyLm5ldXRyYWw7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gZWxzZSBpZiAoc29ydEJ5T3B0aW9ucyAmJiBzb3J0QnlPcHRpb25zLnByb3BlcnR5KSB7XHJcbiAgICAgICAgLy8gc2luZ2xlIHNvcnRcclxuICAgICAgICBjb25zdCBwcm9wZXJ0eU5hbWUgPSBzb3J0QnlPcHRpb25zLnByb3BlcnR5O1xyXG4gICAgICAgIGNvbnN0IHNvcnREaXJlY3Rpb24gPSBzb3J0QnlPcHRpb25zLnNvcnREZXNjID8gU29ydERpcmVjdGlvbk51bWJlci5kZXNjIDogU29ydERpcmVjdGlvbk51bWJlci5hc2M7XHJcbiAgICAgICAgY29uc3QgZmllbGRUeXBlID0gc29ydEJ5T3B0aW9ucy5maWVsZFR5cGUgfHwgRmllbGRUeXBlLnN0cmluZztcclxuXHJcbiAgICAgICAgc29ydGVkQ29sbGVjdGlvbiA9IGNvbGxlY3Rpb24uc29ydCgoZGF0YVJvdzE6IGFueSwgZGF0YVJvdzI6IGFueSkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgdmFsdWUxID0gKGVuYWJsZVRyYW5zbGF0ZUxhYmVsKSA/IHRoaXMudHJhbnNsYXRlLmluc3RhbnQoZGF0YVJvdzFbcHJvcGVydHlOYW1lXSB8fCAnICcpIDogZGF0YVJvdzFbcHJvcGVydHlOYW1lXTtcclxuICAgICAgICAgIGNvbnN0IHZhbHVlMiA9IChlbmFibGVUcmFuc2xhdGVMYWJlbCkgPyB0aGlzLnRyYW5zbGF0ZS5pbnN0YW50KGRhdGFSb3cyW3Byb3BlcnR5TmFtZV0gfHwgJyAnKSA6IGRhdGFSb3cyW3Byb3BlcnR5TmFtZV07XHJcbiAgICAgICAgICBjb25zdCBzb3J0UmVzdWx0ID0gc29ydEJ5RmllbGRUeXBlKHZhbHVlMSwgdmFsdWUyLCBmaWVsZFR5cGUsIHNvcnREaXJlY3Rpb24sIGNvbHVtbkRlZik7XHJcbiAgICAgICAgICBpZiAoc29ydFJlc3VsdCAhPT0gU29ydERpcmVjdGlvbk51bWJlci5uZXV0cmFsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzb3J0UmVzdWx0O1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIFNvcnREaXJlY3Rpb25OdW1iZXIubmV1dHJhbDtcclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIGlmIChzb3J0QnlPcHRpb25zICYmICFzb3J0QnlPcHRpb25zLnByb3BlcnR5KSB7XHJcbiAgICAgICAgY29uc3Qgc29ydERpcmVjdGlvbiA9IHNvcnRCeU9wdGlvbnMuc29ydERlc2MgPyBTb3J0RGlyZWN0aW9uTnVtYmVyLmRlc2MgOiBTb3J0RGlyZWN0aW9uTnVtYmVyLmFzYztcclxuICAgICAgICBjb25zdCBmaWVsZFR5cGUgPSBzb3J0QnlPcHRpb25zLmZpZWxkVHlwZSB8fCBGaWVsZFR5cGUuc3RyaW5nO1xyXG5cclxuICAgICAgICBzb3J0ZWRDb2xsZWN0aW9uID0gY29sbGVjdGlvbi5zb3J0KChkYXRhUm93MTogYW55LCBkYXRhUm93MjogYW55KSA9PiB7XHJcbiAgICAgICAgICBjb25zdCB2YWx1ZTEgPSAoZW5hYmxlVHJhbnNsYXRlTGFiZWwpID8gdGhpcy50cmFuc2xhdGUuaW5zdGFudChkYXRhUm93MSB8fCAnICcpIDogZGF0YVJvdzE7XHJcbiAgICAgICAgICBjb25zdCB2YWx1ZTIgPSAoZW5hYmxlVHJhbnNsYXRlTGFiZWwpID8gdGhpcy50cmFuc2xhdGUuaW5zdGFudChkYXRhUm93MiB8fCAnICcpIDogZGF0YVJvdzI7XHJcbiAgICAgICAgICBjb25zdCBzb3J0UmVzdWx0ID0gc29ydEJ5RmllbGRUeXBlKHZhbHVlMSwgdmFsdWUyLCBmaWVsZFR5cGUsIHNvcnREaXJlY3Rpb24sIGNvbHVtbkRlZik7XHJcbiAgICAgICAgICBpZiAoc29ydFJlc3VsdCAhPT0gU29ydERpcmVjdGlvbk51bWJlci5uZXV0cmFsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzb3J0UmVzdWx0O1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIFNvcnREaXJlY3Rpb25OdW1iZXIubmV1dHJhbDtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBzb3J0ZWRDb2xsZWN0aW9uO1xyXG4gIH1cclxufVxyXG4iXX0=