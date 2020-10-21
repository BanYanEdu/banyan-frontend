import * as tslib_1 from "tslib";
import { FieldType, OperatorType } from '../models/index';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import * as moment_ from 'moment-mini';
var moment = moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
/**
 * Add an item to an array only when the item does not exists, when the item is an object we will be using their "id" to compare
 * @param inputArray
 * @param inputItem
 */
export function addToArrayWhenNotExists(inputArray, inputItem) {
    var arrayRowIndex = -1;
    if (typeof inputItem === 'object' && inputItem.hasOwnProperty('id')) {
        arrayRowIndex = inputArray.findIndex(function (item) { return item.id === inputItem.id; });
    }
    else {
        arrayRowIndex = inputArray.findIndex(function (item) { return item === inputItem; });
    }
    if (arrayRowIndex < 0) {
        inputArray.push(inputItem);
    }
}
/**
 * Simple function to which will loop and create as demanded the number of white spaces,
 * this is used in the CSV export
 * @param int nbSpaces: number of white spaces to create
 */
export function addWhiteSpaces(nbSpaces) {
    var result = '';
    for (var i = 0; i < nbSpaces; i++) {
        result += ' ';
    }
    return result;
}
/** HTML decode using jQuery with a <div>
 * Create a in-memory div, set it's inner text(which jQuery automatically encodes)
 * then grab the encoded contents back out.  The div never exists on the page.
*/
export function htmlDecode(encodedStr) {
    var parser = DOMParser && new DOMParser;
    if (parser && parser.parseFromString) {
        var dom = parser.parseFromString('<!doctype html><body>' + encodedStr, 'text/html');
        return dom && dom.body && dom.body.textContent;
    }
    else {
        // for some browsers that might not support DOMParser, use jQuery instead
        return $('<div/>').html(encodedStr).text();
    }
}
/** HTML encode using jQuery with a <div>
 * Create a in-memory div, set it's inner text(which jQuery automatically encodes)
 * then grab the encoded contents back out.  The div never exists on the page.
*/
export function htmlEncode(inputValue) {
    var entityMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        '\'': '&#39;',
    };
    // all symbols::  /[&<>"'`=\/]/g
    return inputValue.replace(/[&<>"']/g, function (s) {
        return entityMap[s];
    });
}
/** decode text into html entity
 * @param string text: input text
 * @param string text: output text
 */
export function htmlEntityDecode(input) {
    return input.replace(/&#(\d+);/g, function (match, dec) {
        return String.fromCharCode(dec);
    });
}
/** decode text into html entity
 * @param string text: input text
 * @param string text: output text
 */
export function htmlEntityEncode(input) {
    var buf = [];
    for (var i = input.length - 1; i >= 0; i--) {
        buf.unshift(['&#', input[i].charCodeAt(), ';'].join(''));
    }
    return buf.join('');
}
/**
 * Compares two arrays of characters to determine if all the items are equal
 * @param a first array
 * @param b second array to compare with a
 * @param [orderMatters=false] flag if the order matters, if not arrays will be sorted before comparison
 * @return boolean true if equal, else false
 */
export function charArraysEqual(a, b, orderMatters) {
    if (orderMatters === void 0) { orderMatters = false; }
    if (!Array.isArray(a) || !Array.isArray(a)) {
        return false;
    }
    if (a.length !== b.length) {
        return false;
    }
    if (!orderMatters) {
        a.sort();
        b.sort();
    }
    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) {
            return false;
        }
    }
    return true;
}
/**
 * Try casting an input of type Promise | Observable into a Promise type.
 * @param object which could be of type Promise or Observable
 * @param fromServiceName string representing the caller service name and will be used if we throw a casting problem error
 */
export function castToPromise(input, fromServiceName) {
    if (fromServiceName === void 0) { fromServiceName = ''; }
    var promise = input;
    if (input instanceof Promise) {
        // if it's already a Promise then return it
        return input;
    }
    else if (input instanceof Observable) {
        promise = input.pipe(first()).toPromise();
    }
    if (!(promise instanceof Promise)) {
        throw new Error("Something went wrong, Angular-Slickgrid " + fromServiceName + " is not able to convert the Observable into a Promise.\n      If you are using Angular HttpClient, you could try converting your http call to a Promise with \".toPromise()\"\n      for example::  this.http.post('graphql', { query: graphqlQuery }).toPromise()\n      ");
    }
    return promise;
}
/**
 * Uses the logic function to find an item in an array or returns the default
 * value provided (empty object by default)
 * @param any[] array the array to filter
 * @param function logic the logic to find the item
 * @param any [defaultVal={}] the default value to return
 * @return object the found object or default value
 */
export function findOrDefault(array, logic, defaultVal) {
    if (defaultVal === void 0) { defaultVal = {}; }
    return array.find(logic) || defaultVal;
}
/**
  * Take a number (or a string) and display it as a formatted decimal string with defined minimum and maximum decimals
  * @param input
  * @param minDecimal
  * @param maxDecimal
  */
export function decimalFormatted(input, minDecimal, maxDecimal) {
    if (isNaN(+input)) {
        return input;
    }
    var minDec = (minDecimal === undefined) ? 2 : minDecimal;
    var maxDec = (maxDecimal === undefined) ? 2 : maxDecimal;
    var amount = String(Math.round(+input * Math.pow(10, maxDec)) / Math.pow(10, maxDec));
    if ((amount.indexOf('.') < 0) && (minDec > 0)) {
        amount += '.';
    }
    while ((amount.length - amount.indexOf('.')) <= minDec) {
        amount += '0';
    }
    return amount;
}
export function formatNumber(input, minDecimal, maxDecimal, displayNegativeNumberWithParentheses, symbolPrefix, symbolSuffix) {
    if (symbolPrefix === void 0) { symbolPrefix = ''; }
    if (symbolSuffix === void 0) { symbolSuffix = ''; }
    if (isNaN(+input)) {
        return input;
    }
    var calculatedValue = ((Math.round(parseFloat(input) * 1000000) / 1000000));
    if (calculatedValue < 0) {
        var absValue = Math.abs(calculatedValue);
        if (displayNegativeNumberWithParentheses) {
            if (!isNaN(minDecimal) || !isNaN(maxDecimal)) {
                return "(" + symbolPrefix + decimalFormatted(absValue, minDecimal, maxDecimal) + symbolSuffix + ")";
            }
            return "(" + symbolPrefix + absValue + symbolSuffix + ")";
        }
        else {
            if (!isNaN(minDecimal) || !isNaN(maxDecimal)) {
                return "-" + symbolPrefix + decimalFormatted(absValue, minDecimal, maxDecimal) + symbolSuffix;
            }
            return "-" + symbolPrefix + absValue + symbolSuffix;
        }
    }
    else {
        if (!isNaN(minDecimal) || !isNaN(maxDecimal)) {
            return "" + symbolPrefix + decimalFormatted(input, minDecimal, maxDecimal) + symbolSuffix;
        }
        return "" + symbolPrefix + input + symbolSuffix;
    }
}
/** From a dot (.) notation find and return a property within an object given a path */
export function getDescendantProperty(obj, path) {
    return path.split('.').reduce(function (acc, part) { return acc && acc[part]; }, obj);
}
/** Get the browser's scrollbar width, this is different to each browser */
export function getScrollBarWidth() {
    var $outer = $('<div>').css({ visibility: 'hidden', width: 100, overflow: 'scroll' }).appendTo('body');
    var widthWithScroll = $('<div>').css({ width: '100%' }).appendTo($outer).outerWidth();
    $outer.remove();
    return Math.ceil(100 - widthWithScroll);
}
/**
 * From a Date FieldType, return it's equivalent moment.js format
 * refer to moment.js for the format standard used: https://momentjs.com/docs/#/parsing/string-format/
 * @param fieldType
 */
export function mapMomentDateFormatWithFieldType(fieldType) {
    var map;
    switch (fieldType) {
        case FieldType.dateTime:
        case FieldType.dateTimeIso:
            map = 'YYYY-MM-DD HH:mm:ss';
            break;
        case FieldType.dateTimeShortIso:
            map = 'YYYY-MM-DD HH:mm';
            break;
        case FieldType.dateTimeIsoAmPm:
            map = 'YYYY-MM-DD hh:mm:ss a';
            break;
        case FieldType.dateTimeIsoAM_PM:
            map = 'YYYY-MM-DD hh:mm:ss A';
            break;
        // all Euro Formats (date/month/year)
        case FieldType.dateEuro:
            map = 'DD/MM/YYYY';
            break;
        case FieldType.dateEuroShort:
            map = 'D/M/YY';
            break;
        case FieldType.dateTimeEuro:
            map = 'DD/MM/YYYY HH:mm:ss';
            break;
        case FieldType.dateTimeShortEuro:
            map = 'DD/MM/YYYY HH:mm';
            break;
        case FieldType.dateTimeEuroAmPm:
            map = 'DD/MM/YYYY hh:mm:ss a';
            break;
        case FieldType.dateTimeEuroAM_PM:
            map = 'DD/MM/YYYY hh:mm:ss A';
            break;
        case FieldType.dateTimeEuroShort:
            map = 'D/M/YY H:m:s';
            break;
        case FieldType.dateTimeEuroShortAmPm:
            map = 'D/M/YY h:m:s a';
            break;
        // all US Formats (month/date/year)
        case FieldType.dateUs:
            map = 'MM/DD/YYYY';
            break;
        case FieldType.dateUsShort:
            map = 'M/D/YY';
            break;
        case FieldType.dateTimeUs:
            map = 'MM/DD/YYYY HH:mm:ss';
            break;
        case FieldType.dateTimeShortUs:
            map = 'MM/DD/YYYY HH:mm';
            break;
        case FieldType.dateTimeUsAmPm:
            map = 'MM/DD/YYYY hh:mm:ss a';
            break;
        case FieldType.dateTimeUsAM_PM:
            map = 'MM/DD/YYYY hh:mm:ss A';
            break;
        case FieldType.dateTimeUsShort:
            map = 'M/D/YY H:m:s';
            break;
        case FieldType.dateTimeUsShortAmPm:
            map = 'M/D/YY h:m:s a';
            break;
        case FieldType.dateUtc:
            map = 'YYYY-MM-DDTHH:mm:ss.SSSZ';
            break;
        case FieldType.date:
        case FieldType.dateIso:
        default:
            map = 'YYYY-MM-DD';
            break;
    }
    return map;
}
/**
 * From a Date FieldType, return it's equivalent Flatpickr format
 * refer to Flatpickr for the format standard used: https://chmln.github.io/flatpickr/formatting/#date-formatting-tokens
 * also note that they seem very similar to PHP format (except for am/pm): http://php.net/manual/en/function.date.php
 * @param fieldType
 */
export function mapFlatpickrDateFormatWithFieldType(fieldType) {
    /*
      d: Day of the month, 2 digits with leading zeros	01 to 31
      D: A textual representation of a day	Mon through Sun
      l: (lowercase 'L')	A full textual representation of the day of the week	Sunday through Saturday
      j: Day of the month without leading zeros	1 to 31
      J: Day of the month without leading zeros and ordinal suffix	1st, 2nd, to 31st
      w: Numeric representation of the day of the week	0 (for Sunday) through 6 (for Saturday)
      F: A full textual representation of a month	January through December
      m: Numeric representation of a month, with leading zero	01 through 12
      n: Numeric representation of a month, without leading zeros	1 through 12
      M: A short textual representation of a month	Jan through Dec
      U: The number of seconds since the Unix Epoch	1413704993
      y: A two digit representation of a year	99 or 03
      Y: A full numeric representation of a year, 4 digits	1999 or 2003
      H: Hours (24 hours)	00 to 23
      h: Hours	1 to 12
      i: Minutes	00 to 59
      S: Seconds, 2 digits	00 to 59
      s: Seconds	0, 1 to 59
      K: AM/PM	AM or PM
    */
    var map;
    switch (fieldType) {
        case FieldType.dateTime:
        case FieldType.dateTimeIso:
            map = 'Y-m-d H:i:S';
            break;
        case FieldType.dateTimeShortIso:
            map = 'Y-m-d H:i';
            break;
        case FieldType.dateTimeIsoAmPm:
        case FieldType.dateTimeIsoAM_PM:
            map = 'Y-m-d h:i:S K'; // there is no lowercase in Flatpickr :(
            break;
        // all Euro Formats (date/month/year)
        case FieldType.dateEuro:
            map = 'd/m/Y';
            break;
        case FieldType.dateEuroShort:
            map = 'd/m/y';
            break;
        case FieldType.dateTimeEuro:
            map = 'd/m/Y H:i:S';
            break;
        case FieldType.dateTimeShortEuro:
            map = 'd/m/y H:i';
            break;
        case FieldType.dateTimeEuroAmPm:
            map = 'd/m/Y h:i:S K'; // there is no lowercase in Flatpickr :(
            break;
        case FieldType.dateTimeEuroAM_PM:
            map = 'd/m/Y h:i:s K';
            break;
        case FieldType.dateTimeEuroShort:
            map = 'd/m/y H:i:s';
            break;
        case FieldType.dateTimeEuroShortAmPm:
            map = 'd/m/y h:i:s K'; // there is no lowercase in Flatpickr :(
            break;
        // all US Formats (month/date/year)
        case FieldType.dateUs:
            map = 'm/d/Y';
            break;
        case FieldType.dateUsShort:
            map = 'm/d/y';
            break;
        case FieldType.dateTimeUs:
            map = 'm/d/Y H:i:S';
            break;
        case FieldType.dateTimeShortUs:
            map = 'm/d/y H:i';
            break;
        case FieldType.dateTimeUsAmPm:
            map = 'm/d/Y h:i:S K'; // there is no lowercase in Flatpickr :(
            break;
        case FieldType.dateTimeUsAM_PM:
            map = 'm/d/Y h:i:s K';
            break;
        case FieldType.dateTimeUsShort:
            map = 'm/d/y H:i:s';
            break;
        case FieldType.dateTimeUsShortAmPm:
            map = 'm/d/y h:i:s K'; // there is no lowercase in Flatpickr :(
            break;
        case FieldType.dateUtc:
            map = 'Z';
            break;
        case FieldType.date:
        case FieldType.dateIso:
        default:
            map = 'Y-m-d';
            break;
    }
    return map;
}
/**
 * Mapper for query operators (ex.: <= is "le", > is "gt")
 * @param string operator
 * @returns string map
 */
export function mapOperatorType(operator) {
    var map;
    switch (operator) {
        case '<':
            map = OperatorType.lessThan;
            break;
        case '<=':
            map = OperatorType.lessThanOrEqual;
            break;
        case '>':
            map = OperatorType.greaterThan;
            break;
        case '>=':
            map = OperatorType.greaterThanOrEqual;
            break;
        case '<>':
        case '!=':
        case 'neq':
        case 'NEQ':
            map = OperatorType.notEqual;
            break;
        case '*':
        case '.*':
        case 'startsWith':
            map = OperatorType.startsWith;
            break;
        case '*.':
        case 'endsWith':
            map = OperatorType.endsWith;
            break;
        case '=':
        case '==':
        case 'eq':
        case 'EQ':
            map = OperatorType.equal;
            break;
        case 'in':
        case 'IN':
            map = OperatorType.in;
            break;
        case 'notIn':
        case 'NIN':
        case 'NOT_IN':
            map = OperatorType.notIn;
            break;
        default:
            map = OperatorType.contains;
            break;
    }
    return map;
}
/**
 * Mapper for query operator by a Filter Type
 * For example a multiple-select typically uses 'IN' operator
 * @param operator
 * @returns string map
 */
export function mapOperatorByFieldType(fieldType) {
    var map;
    switch (fieldType) {
        case FieldType.string:
        case FieldType.unknown:
            map = OperatorType.contains;
            break;
        case FieldType.float:
        case FieldType.number:
        case FieldType.date:
        case FieldType.dateIso:
        case FieldType.date:
        case FieldType.dateUtc:
        case FieldType.dateTime:
        case FieldType.dateTimeIso:
        case FieldType.dateTimeIsoAmPm:
        case FieldType.dateTimeIsoAM_PM:
        case FieldType.dateEuro:
        case FieldType.dateEuroShort:
        case FieldType.dateTimeEuro:
        case FieldType.dateTimeEuroAmPm:
        case FieldType.dateTimeEuroAM_PM:
        case FieldType.dateTimeEuroShort:
        case FieldType.dateTimeEuroShortAmPm:
        case FieldType.dateTimeEuroShortAM_PM:
        case FieldType.dateUs:
        case FieldType.dateUsShort:
        case FieldType.dateTimeUs:
        case FieldType.dateTimeUsAmPm:
        case FieldType.dateTimeUsAM_PM:
        case FieldType.dateTimeUsShort:
        case FieldType.dateTimeUsShortAmPm:
        case FieldType.dateTimeUsShortAM_PM:
        default:
            map = OperatorType.equal;
            break;
    }
    return map;
}
/** Parse any input (bool, number, string) and return a boolean or False when not possible */
export function parseBoolean(input) {
    return /(true|1)/i.test(input + '');
}
/**
 * Parse a date passed as a string (Date only, without time) and return a Date object (if valid)
 * @param inputDateString
 * @returns string date formatted
 */
export function parseUtcDate(inputDateString, useUtc) {
    var date = null;
    if (/^[0-9\-\/]*$/.test(inputDateString)) {
        // get the UTC datetime with moment.js but we need to decode the value so that it's valid text
        var dateString = decodeURIComponent(inputDateString);
        var dateMoment = moment(new Date(dateString));
        if (dateMoment.isValid() && dateMoment.year().toString().length === 4) {
            date = (useUtc) ? dateMoment.utc().format() : dateMoment.format();
        }
    }
    return date;
}
/**
 * Sanitize, return only the text without HTML tags
 * @input htmlString
 * @return text
 */
export function sanitizeHtmlToText(htmlString) {
    var temp = document.createElement('div');
    temp.innerHTML = htmlString;
    return temp.textContent || temp.innerText || '';
}
/**
 * Title case (or capitalize) first char of a string
 * Optionall title case the complete sentence (upper case first char of each word while changing everything else to lower case)
 * @param inputStr
 * @returns string
 */
export function titleCase(inputStr, caseEveryWords) {
    if (caseEveryWords === void 0) { caseEveryWords = false; }
    if (typeof inputStr === 'string') {
        if (caseEveryWords) {
            return inputStr.replace(/\w\S*/g, function (outputStr) {
                return outputStr.charAt(0).toUpperCase() + outputStr.substr(1).toLowerCase();
            });
        }
        return inputStr.charAt(0).toUpperCase() + inputStr.slice(1);
    }
    return inputStr;
}
/**
 * Converts a string to camel case (camelCase)
 * @param inputStr the string to convert
 * @return the string in camel case
 */
export function toCamelCase(inputStr) {
    if (typeof inputStr === 'string') {
        return inputStr.replace(/(?:^\w|[A-Z]|\b\w|[\s+\-_\/])/g, function (match, offset) {
            // remove white space or hypens or underscores
            if (/[\s+\-_\/]/.test(match)) {
                return '';
            }
            return offset === 0 ? match.toLowerCase() : match.toUpperCase();
        });
    }
    return inputStr;
}
/**
 * Converts a string to kebab (hypen) case
 * @param str the string to convert
 * @return the string in kebab case
 */
export function toKebabCase(inputStr) {
    if (typeof inputStr === 'string') {
        return toCamelCase(inputStr).replace(/([A-Z])/g, '-$1').toLowerCase();
    }
    return inputStr;
}
/**
 * Converts a string from camelCase to snake_case (underscore) case
 * @param str the string to convert
 * @return the string in kebab case
 */
export function toSnakeCase(inputStr) {
    if (typeof inputStr === 'string') {
        return toCamelCase(inputStr).replace(/([A-Z])/g, '_$1').toLowerCase();
    }
    return inputStr;
}
/**
 * Takes an input array and makes sure the array has unique values by removing duplicates
 * @param array input with possible duplicates
 * @param objectProperty optionally provide an object property to compare (example: 'id')
 * @return array output without duplicates
 */
export function uniqueArray(arr) {
    if (Array.isArray(arr) && arr.length > 0) {
        return arr.filter(function (item, index) {
            return arr.indexOf(item) >= index;
        });
    }
    return arr;
}
/**
 * Takes an input array of objects and makes sure the array has unique object values by removing duplicates
 * it will loop through the array using a property name (or "id" when is not provided) to compare uniqueness
 * @param array input with possible duplicates
 * @param propertyName defaults to "id"
 * @return array output without duplicates
 */
export function uniqueObjectArray(arr, propertyName) {
    if (propertyName === void 0) { propertyName = 'id'; }
    var e_1, _a;
    if (Array.isArray(arr) && arr.length > 0) {
        var result = [];
        var map = new Map();
        try {
            for (var arr_1 = tslib_1.__values(arr), arr_1_1 = arr_1.next(); !arr_1_1.done; arr_1_1 = arr_1.next()) {
                var item = arr_1_1.value;
                if (!map.has(item[propertyName])) {
                    map.set(item[propertyName], true); // set any value to Map
                    result.push({
                        id: item[propertyName],
                        name: item.name
                    });
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (arr_1_1 && !arr_1_1.done && (_a = arr_1.return)) _a.call(arr_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return result;
    }
    return arr;
}
/**
 * Unsubscribe all Observables Subscriptions
 * It will return an empty array if it all went well
 * @param subscriptions
 */
export function unsubscribeAllObservables(subscriptions) {
    if (Array.isArray(subscriptions)) {
        subscriptions.forEach(function (subscription) {
            if (subscription && subscription.unsubscribe) {
                subscription.unsubscribe();
            }
        });
        subscriptions = [];
    }
    return subscriptions;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbGl0aWVzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9zZXJ2aWNlcy91dGlsaXRpZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDMUQsT0FBTyxFQUFFLFVBQVUsRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFDaEQsT0FBTyxFQUFFLEtBQUssRUFBUSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sS0FBSyxPQUFPLE1BQU0sYUFBYSxDQUFDO0FBQ3ZDLElBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxDQUFDLHNIQUFzSDtBQUs5STs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLHVCQUF1QixDQUFDLFVBQWlCLEVBQUUsU0FBYztJQUN2RSxJQUFJLGFBQWEsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUN2QixJQUFJLE9BQU8sU0FBUyxLQUFLLFFBQVEsSUFBSSxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ25FLGFBQWEsR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDLFVBQUMsSUFBSSxJQUFLLE9BQUEsSUFBSSxDQUFDLEVBQUUsS0FBSyxTQUFTLENBQUMsRUFBRSxFQUF4QixDQUF3QixDQUFDLENBQUM7S0FDMUU7U0FBTTtRQUNMLGFBQWEsR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDLFVBQUMsSUFBSSxJQUFLLE9BQUEsSUFBSSxLQUFLLFNBQVMsRUFBbEIsQ0FBa0IsQ0FBQyxDQUFDO0tBQ3BFO0lBRUQsSUFBSSxhQUFhLEdBQUcsQ0FBQyxFQUFFO1FBQ3JCLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7S0FDNUI7QUFDSCxDQUFDO0FBRUQ7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSxjQUFjLENBQUMsUUFBZ0I7SUFD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QUNyRSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLEVBQUU7UUFDaEMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxVQUFDLFlBQTBCO1lBQy9DLElBQUksWUFBWSxJQUFJLFlBQVksQ0FBQyxXQUFXLEVBQUU7Z0JBQzVDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQzthQUM1QjtRQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0gsYUFBYSxHQUFHLEVBQUUsQ0FBQztLQUNwQjtJQUVELE9BQU8sYUFBYSxDQUFDO0FBQ3ZCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGaWVsZFR5cGUsIE9wZXJhdG9yVHlwZSB9IGZyb20gJy4uL21vZGVscy9pbmRleCc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBmaXJzdCwgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0ICogYXMgbW9tZW50XyBmcm9tICdtb21lbnQtbWluaSc7XHJcbmNvbnN0IG1vbWVudCA9IG1vbWVudF87IC8vIHBhdGNoIHRvIGZpeCByb2xsdXAgXCJtb21lbnQgaGFzIG5vIGRlZmF1bHQgZXhwb3J0XCIgaXNzdWUsIGRvY3VtZW50IGhlcmUgaHR0cHM6Ly9naXRodWIuY29tL3JvbGx1cC9yb2xsdXAvaXNzdWVzLzY3MFxyXG5cclxuLy8gdXNpbmcgZXh0ZXJuYWwgbm9uLXR5cGVkIGpzIGxpYnJhcmllc1xyXG5kZWNsYXJlIHZhciAkOiBhbnk7XHJcblxyXG4vKipcclxuICogQWRkIGFuIGl0ZW0gdG8gYW4gYXJyYXkgb25seSB3aGVuIHRoZSBpdGVtIGRvZXMgbm90IGV4aXN0cywgd2hlbiB0aGUgaXRlbSBpcyBhbiBvYmplY3Qgd2Ugd2lsbCBiZSB1c2luZyB0aGVpciBcImlkXCIgdG8gY29tcGFyZVxyXG4gKiBAcGFyYW0gaW5wdXRBcnJheVxyXG4gKiBAcGFyYW0gaW5wdXRJdGVtXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gYWRkVG9BcnJheVdoZW5Ob3RFeGlzdHMoaW5wdXRBcnJheTogYW55W10sIGlucHV0SXRlbTogYW55KSB7XHJcbiAgbGV0IGFycmF5Um93SW5kZXggPSAtMTtcclxuICBpZiAodHlwZW9mIGlucHV0SXRlbSA9PT0gJ29iamVjdCcgJiYgaW5wdXRJdGVtLmhhc093blByb3BlcnR5KCdpZCcpKSB7XHJcbiAgICBhcnJheVJvd0luZGV4ID0gaW5wdXRBcnJheS5maW5kSW5kZXgoKGl0ZW0pID0+IGl0ZW0uaWQgPT09IGlucHV0SXRlbS5pZCk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGFycmF5Um93SW5kZXggPSBpbnB1dEFycmF5LmZpbmRJbmRleCgoaXRlbSkgPT4gaXRlbSA9PT0gaW5wdXRJdGVtKTtcclxuICB9XHJcblxyXG4gIGlmIChhcnJheVJvd0luZGV4IDwgMCkge1xyXG4gICAgaW5wdXRBcnJheS5wdXNoKGlucHV0SXRlbSk7XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogU2ltcGxlIGZ1bmN0aW9uIHRvIHdoaWNoIHdpbGwgbG9vcCBhbmQgY3JlYXRlIGFzIGRlbWFuZGVkIHRoZSBudW1iZXIgb2Ygd2hpdGUgc3BhY2VzLFxyXG4gKiB0aGlzIGlzIHVzZWQgaW4gdGhlIENTViBleHBvcnRcclxuICogQHBhcmFtIGludCBuYlNwYWNlczogbnVtYmVyIG9mIHdoaXRlIHNwYWNlcyB0byBjcmVhdGVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBhZGRXaGl0ZVNwYWNlcyhuYlNwYWNlczogbnVtYmVyKTogc3RyaW5nIHtcclxuICBsZXQgcmVzdWx0ID0gJyc7XHJcblxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbmJTcGFjZXM7IGkrKykge1xyXG4gICAgcmVzdWx0ICs9ICcgJztcclxuICB9XHJcbiAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuLyoqIEhUTUwgZGVjb2RlIHVzaW5nIGpRdWVyeSB3aXRoIGEgPGRpdj5cclxuICogQ3JlYXRlIGEgaW4tbWVtb3J5IGRpdiwgc2V0IGl0J3MgaW5uZXIgdGV4dCh3aGljaCBqUXVlcnkgYXV0b21hdGljYWxseSBlbmNvZGVzKVxyXG4gKiB0aGVuIGdyYWIgdGhlIGVuY29kZWQgY29udGVudHMgYmFjayBvdXQuICBUaGUgZGl2IG5ldmVyIGV4aXN0cyBvbiB0aGUgcGFnZS5cclxuKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGh0bWxEZWNvZGUoZW5jb2RlZFN0cjogc3RyaW5nKTogc3RyaW5nIHtcclxuICBjb25zdCBwYXJzZXIgPSBET01QYXJzZXIgJiYgbmV3IERPTVBhcnNlcjtcclxuICBpZiAocGFyc2VyICYmIHBhcnNlci5wYXJzZUZyb21TdHJpbmcpIHtcclxuICAgIGNvbnN0IGRvbSA9IHBhcnNlci5wYXJzZUZyb21TdHJpbmcoXHJcbiAgICAgICc8IWRvY3R5cGUgaHRtbD48Ym9keT4nICsgZW5jb2RlZFN0cixcclxuICAgICAgJ3RleHQvaHRtbCcpO1xyXG4gICAgcmV0dXJuIGRvbSAmJiBkb20uYm9keSAmJiBkb20uYm9keS50ZXh0Q29udGVudDtcclxuICB9IGVsc2Uge1xyXG4gICAgLy8gZm9yIHNvbWUgYnJvd3NlcnMgdGhhdCBtaWdodCBub3Qgc3VwcG9ydCBET01QYXJzZXIsIHVzZSBqUXVlcnkgaW5zdGVhZFxyXG4gICAgcmV0dXJuICQoJzxkaXYvPicpLmh0bWwoZW5jb2RlZFN0cikudGV4dCgpO1xyXG4gIH1cclxufVxyXG5cclxuLyoqIEhUTUwgZW5jb2RlIHVzaW5nIGpRdWVyeSB3aXRoIGEgPGRpdj5cclxuICogQ3JlYXRlIGEgaW4tbWVtb3J5IGRpdiwgc2V0IGl0J3MgaW5uZXIgdGV4dCh3aGljaCBqUXVlcnkgYXV0b21hdGljYWxseSBlbmNvZGVzKVxyXG4gKiB0aGVuIGdyYWIgdGhlIGVuY29kZWQgY29udGVudHMgYmFjayBvdXQuICBUaGUgZGl2IG5ldmVyIGV4aXN0cyBvbiB0aGUgcGFnZS5cclxuKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGh0bWxFbmNvZGUoaW5wdXRWYWx1ZTogc3RyaW5nKTogc3RyaW5nIHtcclxuICBjb25zdCBlbnRpdHlNYXAgPSB7XHJcbiAgICAnJic6ICcmYW1wOycsXHJcbiAgICAnPCc6ICcmbHQ7JyxcclxuICAgICc+JzogJyZndDsnLFxyXG4gICAgJ1wiJzogJyZxdW90OycsXHJcbiAgICAnXFwnJzogJyYjMzk7JyxcclxuICAgIC8vICcvJzogJyYjeDJGOycsXHJcbiAgICAvLyAnYCc6ICcmI3g2MDsnLFxyXG4gICAgLy8gJz0nOiAnJiN4M0Q7J1xyXG4gIH07XHJcbiAgLy8gYWxsIHN5bWJvbHM6OiAgL1smPD5cIidgPVxcL10vZ1xyXG4gIHJldHVybiBpbnB1dFZhbHVlLnJlcGxhY2UoL1smPD5cIiddL2csIChzKSA9PiB7XHJcbiAgICByZXR1cm4gZW50aXR5TWFwW3NdO1xyXG4gIH0pO1xyXG59XHJcblxyXG4vKiogZGVjb2RlIHRleHQgaW50byBodG1sIGVudGl0eVxyXG4gKiBAcGFyYW0gc3RyaW5nIHRleHQ6IGlucHV0IHRleHRcclxuICogQHBhcmFtIHN0cmluZyB0ZXh0OiBvdXRwdXQgdGV4dFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGh0bWxFbnRpdHlEZWNvZGUoaW5wdXQ6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgcmV0dXJuIGlucHV0LnJlcGxhY2UoLyYjKFxcZCspOy9nLCBmdW5jdGlvbiAobWF0Y2gsIGRlYykge1xyXG4gICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoZGVjKTtcclxuICB9KTtcclxufVxyXG5cclxuLyoqIGRlY29kZSB0ZXh0IGludG8gaHRtbCBlbnRpdHlcclxuICogQHBhcmFtIHN0cmluZyB0ZXh0OiBpbnB1dCB0ZXh0XHJcbiAqIEBwYXJhbSBzdHJpbmcgdGV4dDogb3V0cHV0IHRleHRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBodG1sRW50aXR5RW5jb2RlKGlucHV0OiBhbnkpOiBzdHJpbmcge1xyXG4gIGNvbnN0IGJ1ZiA9IFtdO1xyXG4gIGZvciAobGV0IGkgPSBpbnB1dC5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgYnVmLnVuc2hpZnQoWycmIycsIGlucHV0W2ldLmNoYXJDb2RlQXQoKSwgJzsnXS5qb2luKCcnKSk7XHJcbiAgfVxyXG4gIHJldHVybiBidWYuam9pbignJyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDb21wYXJlcyB0d28gYXJyYXlzIG9mIGNoYXJhY3RlcnMgdG8gZGV0ZXJtaW5lIGlmIGFsbCB0aGUgaXRlbXMgYXJlIGVxdWFsXHJcbiAqIEBwYXJhbSBhIGZpcnN0IGFycmF5XHJcbiAqIEBwYXJhbSBiIHNlY29uZCBhcnJheSB0byBjb21wYXJlIHdpdGggYVxyXG4gKiBAcGFyYW0gW29yZGVyTWF0dGVycz1mYWxzZV0gZmxhZyBpZiB0aGUgb3JkZXIgbWF0dGVycywgaWYgbm90IGFycmF5cyB3aWxsIGJlIHNvcnRlZCBiZWZvcmUgY29tcGFyaXNvblxyXG4gKiBAcmV0dXJuIGJvb2xlYW4gdHJ1ZSBpZiBlcXVhbCwgZWxzZSBmYWxzZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGNoYXJBcnJheXNFcXVhbChhOiBhbnlbXSwgYjogYW55W10sIG9yZGVyTWF0dGVyczogYm9vbGVhbiA9IGZhbHNlKTogYm9vbGVhbiB7XHJcbiAgaWYgKCFBcnJheS5pc0FycmF5KGEpIHx8ICFBcnJheS5pc0FycmF5KGEpKSB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBpZiAoYS5sZW5ndGggIT09IGIubGVuZ3RoKSB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBpZiAoIW9yZGVyTWF0dGVycykge1xyXG4gICAgYS5zb3J0KCk7XHJcbiAgICBiLnNvcnQoKTtcclxuICB9XHJcblxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYS5sZW5ndGg7ICsraSkge1xyXG4gICAgaWYgKGFbaV0gIT09IGJbaV0pIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHRydWU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUcnkgY2FzdGluZyBhbiBpbnB1dCBvZiB0eXBlIFByb21pc2UgfCBPYnNlcnZhYmxlIGludG8gYSBQcm9taXNlIHR5cGUuXHJcbiAqIEBwYXJhbSBvYmplY3Qgd2hpY2ggY291bGQgYmUgb2YgdHlwZSBQcm9taXNlIG9yIE9ic2VydmFibGVcclxuICogQHBhcmFtIGZyb21TZXJ2aWNlTmFtZSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBjYWxsZXIgc2VydmljZSBuYW1lIGFuZCB3aWxsIGJlIHVzZWQgaWYgd2UgdGhyb3cgYSBjYXN0aW5nIHByb2JsZW0gZXJyb3JcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjYXN0VG9Qcm9taXNlPFQ+KGlucHV0OiBQcm9taXNlPFQ+IHwgT2JzZXJ2YWJsZTxUPiwgZnJvbVNlcnZpY2VOYW1lOiBzdHJpbmcgPSAnJyk6IFByb21pc2U8VD4ge1xyXG4gIGxldCBwcm9taXNlOiBhbnkgPSBpbnB1dDtcclxuXHJcbiAgaWYgKGlucHV0IGluc3RhbmNlb2YgUHJvbWlzZSkge1xyXG4gICAgLy8gaWYgaXQncyBhbHJlYWR5IGEgUHJvbWlzZSB0aGVuIHJldHVybiBpdFxyXG4gICAgcmV0dXJuIGlucHV0O1xyXG4gIH0gZWxzZSBpZiAoaW5wdXQgaW5zdGFuY2VvZiBPYnNlcnZhYmxlKSB7XHJcbiAgICBwcm9taXNlID0gaW5wdXQucGlwZShmaXJzdCgpKS50b1Byb21pc2UoKTtcclxuICB9XHJcblxyXG4gIGlmICghKHByb21pc2UgaW5zdGFuY2VvZiBQcm9taXNlKSkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKFxyXG4gICAgICBgU29tZXRoaW5nIHdlbnQgd3JvbmcsIEFuZ3VsYXItU2xpY2tncmlkICR7ZnJvbVNlcnZpY2VOYW1lfSBpcyBub3QgYWJsZSB0byBjb252ZXJ0IHRoZSBPYnNlcnZhYmxlIGludG8gYSBQcm9taXNlLlxyXG4gICAgICBJZiB5b3UgYXJlIHVzaW5nIEFuZ3VsYXIgSHR0cENsaWVudCwgeW91IGNvdWxkIHRyeSBjb252ZXJ0aW5nIHlvdXIgaHR0cCBjYWxsIHRvIGEgUHJvbWlzZSB3aXRoIFwiLnRvUHJvbWlzZSgpXCJcclxuICAgICAgZm9yIGV4YW1wbGU6OiAgdGhpcy5odHRwLnBvc3QoJ2dyYXBocWwnLCB7IHF1ZXJ5OiBncmFwaHFsUXVlcnkgfSkudG9Qcm9taXNlKClcclxuICAgICAgYCk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gcHJvbWlzZTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFVzZXMgdGhlIGxvZ2ljIGZ1bmN0aW9uIHRvIGZpbmQgYW4gaXRlbSBpbiBhbiBhcnJheSBvciByZXR1cm5zIHRoZSBkZWZhdWx0XHJcbiAqIHZhbHVlIHByb3ZpZGVkIChlbXB0eSBvYmplY3QgYnkgZGVmYXVsdClcclxuICogQHBhcmFtIGFueVtdIGFycmF5IHRoZSBhcnJheSB0byBmaWx0ZXJcclxuICogQHBhcmFtIGZ1bmN0aW9uIGxvZ2ljIHRoZSBsb2dpYyB0byBmaW5kIHRoZSBpdGVtXHJcbiAqIEBwYXJhbSBhbnkgW2RlZmF1bHRWYWw9e31dIHRoZSBkZWZhdWx0IHZhbHVlIHRvIHJldHVyblxyXG4gKiBAcmV0dXJuIG9iamVjdCB0aGUgZm91bmQgb2JqZWN0IG9yIGRlZmF1bHQgdmFsdWVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBmaW5kT3JEZWZhdWx0KGFycmF5OiBhbnlbXSwgbG9naWM6IChpdGVtOiBhbnkpID0+IGJvb2xlYW4sIGRlZmF1bHRWYWwgPSB7fSk6IGFueSB7XHJcbiAgcmV0dXJuIGFycmF5LmZpbmQobG9naWMpIHx8IGRlZmF1bHRWYWw7XHJcbn1cclxuXHJcbi8qKlxyXG4gICogVGFrZSBhIG51bWJlciAob3IgYSBzdHJpbmcpIGFuZCBkaXNwbGF5IGl0IGFzIGEgZm9ybWF0dGVkIGRlY2ltYWwgc3RyaW5nIHdpdGggZGVmaW5lZCBtaW5pbXVtIGFuZCBtYXhpbXVtIGRlY2ltYWxzXHJcbiAgKiBAcGFyYW0gaW5wdXRcclxuICAqIEBwYXJhbSBtaW5EZWNpbWFsXHJcbiAgKiBAcGFyYW0gbWF4RGVjaW1hbFxyXG4gICovXHJcbmV4cG9ydCBmdW5jdGlvbiBkZWNpbWFsRm9ybWF0dGVkKGlucHV0OiBudW1iZXIgfCBzdHJpbmcsIG1pbkRlY2ltYWw/OiBudW1iZXIsIG1heERlY2ltYWw/OiBudW1iZXIpOiBzdHJpbmcge1xyXG4gIGlmIChpc05hTigraW5wdXQpKSB7XHJcbiAgICByZXR1cm4gaW5wdXQgYXMgc3RyaW5nO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgbWluRGVjID0gKG1pbkRlY2ltYWwgPT09IHVuZGVmaW5lZCkgPyAyIDogbWluRGVjaW1hbDtcclxuICBjb25zdCBtYXhEZWMgPSAobWF4RGVjaW1hbCA9PT0gdW5kZWZpbmVkKSA/IDIgOiBtYXhEZWNpbWFsO1xyXG4gIGxldCBhbW91bnQgPSBTdHJpbmcoTWF0aC5yb3VuZCgraW5wdXQgKiBNYXRoLnBvdygxMCwgbWF4RGVjKSkgLyBNYXRoLnBvdygxMCwgbWF4RGVjKSk7XHJcblxyXG4gIGlmICgoYW1vdW50LmluZGV4T2YoJy4nKSA8IDApICYmIChtaW5EZWMgPiAwKSkge1xyXG4gICAgYW1vdW50ICs9ICcuJztcclxuICB9XHJcbiAgd2hpbGUgKChhbW91bnQubGVuZ3RoIC0gYW1vdW50LmluZGV4T2YoJy4nKSkgPD0gbWluRGVjKSB7XHJcbiAgICBhbW91bnQgKz0gJzAnO1xyXG4gIH1cclxuICByZXR1cm4gYW1vdW50O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0TnVtYmVyKGlucHV0OiBudW1iZXIgfCBzdHJpbmcsIG1pbkRlY2ltYWw/OiBudW1iZXIsIG1heERlY2ltYWw/OiBudW1iZXIsIGRpc3BsYXlOZWdhdGl2ZU51bWJlcldpdGhQYXJlbnRoZXNlcz86IGJvb2xlYW4sIHN5bWJvbFByZWZpeCA9ICcnLCBzeW1ib2xTdWZmaXggPSAnJyk6IHN0cmluZyB7XHJcbiAgaWYgKGlzTmFOKCtpbnB1dCkpIHtcclxuICAgIHJldHVybiBpbnB1dCBhcyBzdHJpbmc7XHJcbiAgfVxyXG5cclxuICBjb25zdCBjYWxjdWxhdGVkVmFsdWUgPSAoKE1hdGgucm91bmQocGFyc2VGbG9hdChpbnB1dCBhcyBzdHJpbmcpICogMTAwMDAwMCkgLyAxMDAwMDAwKSk7XHJcblxyXG4gIGlmIChjYWxjdWxhdGVkVmFsdWUgPCAwKSB7XHJcbiAgICBjb25zdCBhYnNWYWx1ZSA9IE1hdGguYWJzKGNhbGN1bGF0ZWRWYWx1ZSk7XHJcbiAgICBpZiAoZGlzcGxheU5lZ2F0aXZlTnVtYmVyV2l0aFBhcmVudGhlc2VzKSB7XHJcbiAgICAgIGlmICghaXNOYU4obWluRGVjaW1hbCkgfHwgIWlzTmFOKG1heERlY2ltYWwpKSB7XHJcbiAgICAgICAgcmV0dXJuIGAoJHtzeW1ib2xQcmVmaXh9JHtkZWNpbWFsRm9ybWF0dGVkKGFic1ZhbHVlLCBtaW5EZWNpbWFsLCBtYXhEZWNpbWFsKX0ke3N5bWJvbFN1ZmZpeH0pYDtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gYCgke3N5bWJvbFByZWZpeH0ke2Fic1ZhbHVlfSR7c3ltYm9sU3VmZml4fSlgO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKCFpc05hTihtaW5EZWNpbWFsKSB8fCAhaXNOYU4obWF4RGVjaW1hbCkpIHtcclxuICAgICAgICByZXR1cm4gYC0ke3N5bWJvbFByZWZpeH0ke2RlY2ltYWxGb3JtYXR0ZWQoYWJzVmFsdWUsIG1pbkRlY2ltYWwsIG1heERlY2ltYWwpfSR7c3ltYm9sU3VmZml4fWA7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGAtJHtzeW1ib2xQcmVmaXh9JHthYnNWYWx1ZX0ke3N5bWJvbFN1ZmZpeH1gO1xyXG4gICAgfVxyXG4gIH0gZWxzZSB7XHJcbiAgICBpZiAoIWlzTmFOKG1pbkRlY2ltYWwpIHx8ICFpc05hTihtYXhEZWNpbWFsKSkge1xyXG4gICAgICByZXR1cm4gYCR7c3ltYm9sUHJlZml4fSR7ZGVjaW1hbEZvcm1hdHRlZChpbnB1dCwgbWluRGVjaW1hbCwgbWF4RGVjaW1hbCl9JHtzeW1ib2xTdWZmaXh9YDtcclxuICAgIH1cclxuICAgIHJldHVybiBgJHtzeW1ib2xQcmVmaXh9JHtpbnB1dH0ke3N5bWJvbFN1ZmZpeH1gO1xyXG4gIH1cclxufVxyXG5cclxuLyoqIEZyb20gYSBkb3QgKC4pIG5vdGF0aW9uIGZpbmQgYW5kIHJldHVybiBhIHByb3BlcnR5IHdpdGhpbiBhbiBvYmplY3QgZ2l2ZW4gYSBwYXRoICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXREZXNjZW5kYW50UHJvcGVydHkob2JqOiBhbnksIHBhdGg6IHN0cmluZyk6IGFueSB7XHJcbiAgcmV0dXJuIHBhdGguc3BsaXQoJy4nKS5yZWR1Y2UoKGFjYywgcGFydCkgPT4gYWNjICYmIGFjY1twYXJ0XSwgb2JqKTtcclxufVxyXG5cclxuLyoqIEdldCB0aGUgYnJvd3NlcidzIHNjcm9sbGJhciB3aWR0aCwgdGhpcyBpcyBkaWZmZXJlbnQgdG8gZWFjaCBicm93c2VyICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRTY3JvbGxCYXJXaWR0aCgpOiBudW1iZXIge1xyXG4gIGNvbnN0ICRvdXRlciA9ICQoJzxkaXY+JykuY3NzKHsgdmlzaWJpbGl0eTogJ2hpZGRlbicsIHdpZHRoOiAxMDAsIG92ZXJmbG93OiAnc2Nyb2xsJyB9KS5hcHBlbmRUbygnYm9keScpO1xyXG4gIGNvbnN0IHdpZHRoV2l0aFNjcm9sbCA9ICQoJzxkaXY+JykuY3NzKHsgd2lkdGg6ICcxMDAlJyB9KS5hcHBlbmRUbygkb3V0ZXIpLm91dGVyV2lkdGgoKTtcclxuICAkb3V0ZXIucmVtb3ZlKCk7XHJcbiAgcmV0dXJuIE1hdGguY2VpbCgxMDAgLSB3aWR0aFdpdGhTY3JvbGwpO1xyXG59XHJcblxyXG4vKipcclxuICogRnJvbSBhIERhdGUgRmllbGRUeXBlLCByZXR1cm4gaXQncyBlcXVpdmFsZW50IG1vbWVudC5qcyBmb3JtYXRcclxuICogcmVmZXIgdG8gbW9tZW50LmpzIGZvciB0aGUgZm9ybWF0IHN0YW5kYXJkIHVzZWQ6IGh0dHBzOi8vbW9tZW50anMuY29tL2RvY3MvIy9wYXJzaW5nL3N0cmluZy1mb3JtYXQvXHJcbiAqIEBwYXJhbSBmaWVsZFR5cGVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBtYXBNb21lbnREYXRlRm9ybWF0V2l0aEZpZWxkVHlwZShmaWVsZFR5cGU6IEZpZWxkVHlwZSk6IHN0cmluZyB7XHJcbiAgbGV0IG1hcDogc3RyaW5nO1xyXG4gIHN3aXRjaCAoZmllbGRUeXBlKSB7XHJcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlVGltZTpcclxuICAgIGNhc2UgRmllbGRUeXBlLmRhdGVUaW1lSXNvOlxyXG4gICAgICBtYXAgPSAnWVlZWS1NTS1ERCBISDptbTpzcyc7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZVRpbWVTaG9ydElzbzpcclxuICAgICAgbWFwID0gJ1lZWVktTU0tREQgSEg6bW0nO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgRmllbGRUeXBlLmRhdGVUaW1lSXNvQW1QbTpcclxuICAgICAgbWFwID0gJ1lZWVktTU0tREQgaGg6bW06c3MgYSc7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZVRpbWVJc29BTV9QTTpcclxuICAgICAgbWFwID0gJ1lZWVktTU0tREQgaGg6bW06c3MgQSc7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgLy8gYWxsIEV1cm8gRm9ybWF0cyAoZGF0ZS9tb250aC95ZWFyKVxyXG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZUV1cm86XHJcbiAgICAgIG1hcCA9ICdERC9NTS9ZWVlZJztcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlRXVyb1Nob3J0OlxyXG4gICAgICBtYXAgPSAnRC9NL1lZJztcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlVGltZUV1cm86XHJcbiAgICAgIG1hcCA9ICdERC9NTS9ZWVlZIEhIOm1tOnNzJztcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlVGltZVNob3J0RXVybzpcclxuICAgICAgbWFwID0gJ0REL01NL1lZWVkgSEg6bW0nO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgRmllbGRUeXBlLmRhdGVUaW1lRXVyb0FtUG06XHJcbiAgICAgIG1hcCA9ICdERC9NTS9ZWVlZIGhoOm1tOnNzIGEnO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgRmllbGRUeXBlLmRhdGVUaW1lRXVyb0FNX1BNOlxyXG4gICAgICBtYXAgPSAnREQvTU0vWVlZWSBoaDptbTpzcyBBJztcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlVGltZUV1cm9TaG9ydDpcclxuICAgICAgbWFwID0gJ0QvTS9ZWSBIOm06cyc7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZVRpbWVFdXJvU2hvcnRBbVBtOlxyXG4gICAgICBtYXAgPSAnRC9NL1lZIGg6bTpzIGEnO1xyXG4gICAgICBicmVhaztcclxuICAgIC8vIGFsbCBVUyBGb3JtYXRzIChtb250aC9kYXRlL3llYXIpXHJcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlVXM6XHJcbiAgICAgIG1hcCA9ICdNTS9ERC9ZWVlZJztcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlVXNTaG9ydDpcclxuICAgICAgbWFwID0gJ00vRC9ZWSc7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZVRpbWVVczpcclxuICAgICAgbWFwID0gJ01NL0REL1lZWVkgSEg6bW06c3MnO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgRmllbGRUeXBlLmRhdGVUaW1lU2hvcnRVczpcclxuICAgICAgbWFwID0gJ01NL0REL1lZWVkgSEg6bW0nO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgRmllbGRUeXBlLmRhdGVUaW1lVXNBbVBtOlxyXG4gICAgICBtYXAgPSAnTU0vREQvWVlZWSBoaDptbTpzcyBhJztcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlVGltZVVzQU1fUE06XHJcbiAgICAgIG1hcCA9ICdNTS9ERC9ZWVlZIGhoOm1tOnNzIEEnO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgRmllbGRUeXBlLmRhdGVUaW1lVXNTaG9ydDpcclxuICAgICAgbWFwID0gJ00vRC9ZWSBIOm06cyc7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZVRpbWVVc1Nob3J0QW1QbTpcclxuICAgICAgbWFwID0gJ00vRC9ZWSBoOm06cyBhJztcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlVXRjOlxyXG4gICAgICBtYXAgPSAnWVlZWS1NTS1ERFRISDptbTpzcy5TU1NaJztcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlOlxyXG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZUlzbzpcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIG1hcCA9ICdZWVlZLU1NLUREJztcclxuICAgICAgYnJlYWs7XHJcbiAgfVxyXG4gIHJldHVybiBtYXA7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBGcm9tIGEgRGF0ZSBGaWVsZFR5cGUsIHJldHVybiBpdCdzIGVxdWl2YWxlbnQgRmxhdHBpY2tyIGZvcm1hdFxyXG4gKiByZWZlciB0byBGbGF0cGlja3IgZm9yIHRoZSBmb3JtYXQgc3RhbmRhcmQgdXNlZDogaHR0cHM6Ly9jaG1sbi5naXRodWIuaW8vZmxhdHBpY2tyL2Zvcm1hdHRpbmcvI2RhdGUtZm9ybWF0dGluZy10b2tlbnNcclxuICogYWxzbyBub3RlIHRoYXQgdGhleSBzZWVtIHZlcnkgc2ltaWxhciB0byBQSFAgZm9ybWF0IChleGNlcHQgZm9yIGFtL3BtKTogaHR0cDovL3BocC5uZXQvbWFudWFsL2VuL2Z1bmN0aW9uLmRhdGUucGhwXHJcbiAqIEBwYXJhbSBmaWVsZFR5cGVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBtYXBGbGF0cGlja3JEYXRlRm9ybWF0V2l0aEZpZWxkVHlwZShmaWVsZFR5cGU6IEZpZWxkVHlwZSk6IHN0cmluZyB7XHJcbiAgLypcclxuICAgIGQ6IERheSBvZiB0aGUgbW9udGgsIDIgZGlnaXRzIHdpdGggbGVhZGluZyB6ZXJvc1x0MDEgdG8gMzFcclxuICAgIEQ6IEEgdGV4dHVhbCByZXByZXNlbnRhdGlvbiBvZiBhIGRheVx0TW9uIHRocm91Z2ggU3VuXHJcbiAgICBsOiAobG93ZXJjYXNlICdMJylcdEEgZnVsbCB0ZXh0dWFsIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBkYXkgb2YgdGhlIHdlZWtcdFN1bmRheSB0aHJvdWdoIFNhdHVyZGF5XHJcbiAgICBqOiBEYXkgb2YgdGhlIG1vbnRoIHdpdGhvdXQgbGVhZGluZyB6ZXJvc1x0MSB0byAzMVxyXG4gICAgSjogRGF5IG9mIHRoZSBtb250aCB3aXRob3V0IGxlYWRpbmcgemVyb3MgYW5kIG9yZGluYWwgc3VmZml4XHQxc3QsIDJuZCwgdG8gMzFzdFxyXG4gICAgdzogTnVtZXJpYyByZXByZXNlbnRhdGlvbiBvZiB0aGUgZGF5IG9mIHRoZSB3ZWVrXHQwIChmb3IgU3VuZGF5KSB0aHJvdWdoIDYgKGZvciBTYXR1cmRheSlcclxuICAgIEY6IEEgZnVsbCB0ZXh0dWFsIHJlcHJlc2VudGF0aW9uIG9mIGEgbW9udGhcdEphbnVhcnkgdGhyb3VnaCBEZWNlbWJlclxyXG4gICAgbTogTnVtZXJpYyByZXByZXNlbnRhdGlvbiBvZiBhIG1vbnRoLCB3aXRoIGxlYWRpbmcgemVyb1x0MDEgdGhyb3VnaCAxMlxyXG4gICAgbjogTnVtZXJpYyByZXByZXNlbnRhdGlvbiBvZiBhIG1vbnRoLCB3aXRob3V0IGxlYWRpbmcgemVyb3NcdDEgdGhyb3VnaCAxMlxyXG4gICAgTTogQSBzaG9ydCB0ZXh0dWFsIHJlcHJlc2VudGF0aW9uIG9mIGEgbW9udGhcdEphbiB0aHJvdWdoIERlY1xyXG4gICAgVTogVGhlIG51bWJlciBvZiBzZWNvbmRzIHNpbmNlIHRoZSBVbml4IEVwb2NoXHQxNDEzNzA0OTkzXHJcbiAgICB5OiBBIHR3byBkaWdpdCByZXByZXNlbnRhdGlvbiBvZiBhIHllYXJcdDk5IG9yIDAzXHJcbiAgICBZOiBBIGZ1bGwgbnVtZXJpYyByZXByZXNlbnRhdGlvbiBvZiBhIHllYXIsIDQgZGlnaXRzXHQxOTk5IG9yIDIwMDNcclxuICAgIEg6IEhvdXJzICgyNCBob3VycylcdDAwIHRvIDIzXHJcbiAgICBoOiBIb3Vyc1x0MSB0byAxMlxyXG4gICAgaTogTWludXRlc1x0MDAgdG8gNTlcclxuICAgIFM6IFNlY29uZHMsIDIgZGlnaXRzXHQwMCB0byA1OVxyXG4gICAgczogU2Vjb25kc1x0MCwgMSB0byA1OVxyXG4gICAgSzogQU0vUE1cdEFNIG9yIFBNXHJcbiAgKi9cclxuICBsZXQgbWFwOiBzdHJpbmc7XHJcbiAgc3dpdGNoIChmaWVsZFR5cGUpIHtcclxuICAgIGNhc2UgRmllbGRUeXBlLmRhdGVUaW1lOlxyXG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZVRpbWVJc286XHJcbiAgICAgIG1hcCA9ICdZLW0tZCBIOmk6Uyc7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZVRpbWVTaG9ydElzbzpcclxuICAgICAgbWFwID0gJ1ktbS1kIEg6aSc7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZVRpbWVJc29BbVBtOlxyXG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZVRpbWVJc29BTV9QTTpcclxuICAgICAgbWFwID0gJ1ktbS1kIGg6aTpTIEsnOyAvLyB0aGVyZSBpcyBubyBsb3dlcmNhc2UgaW4gRmxhdHBpY2tyIDooXHJcbiAgICAgIGJyZWFrO1xyXG4gICAgLy8gYWxsIEV1cm8gRm9ybWF0cyAoZGF0ZS9tb250aC95ZWFyKVxyXG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZUV1cm86XHJcbiAgICAgIG1hcCA9ICdkL20vWSc7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZUV1cm9TaG9ydDpcclxuICAgICAgbWFwID0gJ2QvbS95JztcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlVGltZUV1cm86XHJcbiAgICAgIG1hcCA9ICdkL20vWSBIOmk6Uyc7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZVRpbWVTaG9ydEV1cm86XHJcbiAgICAgIG1hcCA9ICdkL20veSBIOmknO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgRmllbGRUeXBlLmRhdGVUaW1lRXVyb0FtUG06XHJcbiAgICAgIG1hcCA9ICdkL20vWSBoOmk6UyBLJzsgLy8gdGhlcmUgaXMgbm8gbG93ZXJjYXNlIGluIEZsYXRwaWNrciA6KFxyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgRmllbGRUeXBlLmRhdGVUaW1lRXVyb0FNX1BNOlxyXG4gICAgICBtYXAgPSAnZC9tL1kgaDppOnMgSyc7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZVRpbWVFdXJvU2hvcnQ6XHJcbiAgICAgIG1hcCA9ICdkL20veSBIOmk6cyc7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZVRpbWVFdXJvU2hvcnRBbVBtOlxyXG4gICAgICBtYXAgPSAnZC9tL3kgaDppOnMgSyc7IC8vIHRoZXJlIGlzIG5vIGxvd2VyY2FzZSBpbiBGbGF0cGlja3IgOihcclxuICAgICAgYnJlYWs7XHJcbiAgICAvLyBhbGwgVVMgRm9ybWF0cyAobW9udGgvZGF0ZS95ZWFyKVxyXG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZVVzOlxyXG4gICAgICBtYXAgPSAnbS9kL1knO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgRmllbGRUeXBlLmRhdGVVc1Nob3J0OlxyXG4gICAgICBtYXAgPSAnbS9kL3knO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgRmllbGRUeXBlLmRhdGVUaW1lVXM6XHJcbiAgICAgIG1hcCA9ICdtL2QvWSBIOmk6Uyc7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZVRpbWVTaG9ydFVzOlxyXG4gICAgICBtYXAgPSAnbS9kL3kgSDppJztcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlVGltZVVzQW1QbTpcclxuICAgICAgbWFwID0gJ20vZC9ZIGg6aTpTIEsnOyAvLyB0aGVyZSBpcyBubyBsb3dlcmNhc2UgaW4gRmxhdHBpY2tyIDooXHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZVRpbWVVc0FNX1BNOlxyXG4gICAgICBtYXAgPSAnbS9kL1kgaDppOnMgSyc7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZVRpbWVVc1Nob3J0OlxyXG4gICAgICBtYXAgPSAnbS9kL3kgSDppOnMnO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgRmllbGRUeXBlLmRhdGVUaW1lVXNTaG9ydEFtUG06XHJcbiAgICAgIG1hcCA9ICdtL2QveSBoOmk6cyBLJzsgLy8gdGhlcmUgaXMgbm8gbG93ZXJjYXNlIGluIEZsYXRwaWNrciA6KFxyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgRmllbGRUeXBlLmRhdGVVdGM6XHJcbiAgICAgIG1hcCA9ICdaJztcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlOlxyXG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZUlzbzpcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIG1hcCA9ICdZLW0tZCc7XHJcbiAgICAgIGJyZWFrO1xyXG4gIH1cclxuICByZXR1cm4gbWFwO1xyXG59XHJcblxyXG4vKipcclxuICogTWFwcGVyIGZvciBxdWVyeSBvcGVyYXRvcnMgKGV4LjogPD0gaXMgXCJsZVwiLCA+IGlzIFwiZ3RcIilcclxuICogQHBhcmFtIHN0cmluZyBvcGVyYXRvclxyXG4gKiBAcmV0dXJucyBzdHJpbmcgbWFwXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gbWFwT3BlcmF0b3JUeXBlKG9wZXJhdG9yOiBzdHJpbmcpOiBPcGVyYXRvclR5cGUge1xyXG4gIGxldCBtYXA6IE9wZXJhdG9yVHlwZTtcclxuXHJcbiAgc3dpdGNoIChvcGVyYXRvcikge1xyXG4gICAgY2FzZSAnPCc6XHJcbiAgICAgIG1hcCA9IE9wZXJhdG9yVHlwZS5sZXNzVGhhbjtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlICc8PSc6XHJcbiAgICAgIG1hcCA9IE9wZXJhdG9yVHlwZS5sZXNzVGhhbk9yRXF1YWw7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAnPic6XHJcbiAgICAgIG1hcCA9IE9wZXJhdG9yVHlwZS5ncmVhdGVyVGhhbjtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlICc+PSc6XHJcbiAgICAgIG1hcCA9IE9wZXJhdG9yVHlwZS5ncmVhdGVyVGhhbk9yRXF1YWw7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAnPD4nOlxyXG4gICAgY2FzZSAnIT0nOlxyXG4gICAgY2FzZSAnbmVxJzpcclxuICAgIGNhc2UgJ05FUSc6XHJcbiAgICAgIG1hcCA9IE9wZXJhdG9yVHlwZS5ub3RFcXVhbDtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlICcqJzpcclxuICAgIGNhc2UgJy4qJzpcclxuICAgIGNhc2UgJ3N0YXJ0c1dpdGgnOlxyXG4gICAgICBtYXAgPSBPcGVyYXRvclR5cGUuc3RhcnRzV2l0aDtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlICcqLic6XHJcbiAgICBjYXNlICdlbmRzV2l0aCc6XHJcbiAgICAgIG1hcCA9IE9wZXJhdG9yVHlwZS5lbmRzV2l0aDtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlICc9JzpcclxuICAgIGNhc2UgJz09JzpcclxuICAgIGNhc2UgJ2VxJzpcclxuICAgIGNhc2UgJ0VRJzpcclxuICAgICAgbWFwID0gT3BlcmF0b3JUeXBlLmVxdWFsO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgJ2luJzpcclxuICAgIGNhc2UgJ0lOJzpcclxuICAgICAgbWFwID0gT3BlcmF0b3JUeXBlLmluO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgJ25vdEluJzpcclxuICAgIGNhc2UgJ05JTic6XHJcbiAgICBjYXNlICdOT1RfSU4nOlxyXG4gICAgICBtYXAgPSBPcGVyYXRvclR5cGUubm90SW47XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgZGVmYXVsdDpcclxuICAgICAgbWFwID0gT3BlcmF0b3JUeXBlLmNvbnRhaW5zO1xyXG4gICAgICBicmVhaztcclxuICB9XHJcblxyXG4gIHJldHVybiBtYXA7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBNYXBwZXIgZm9yIHF1ZXJ5IG9wZXJhdG9yIGJ5IGEgRmlsdGVyIFR5cGVcclxuICogRm9yIGV4YW1wbGUgYSBtdWx0aXBsZS1zZWxlY3QgdHlwaWNhbGx5IHVzZXMgJ0lOJyBvcGVyYXRvclxyXG4gKiBAcGFyYW0gb3BlcmF0b3JcclxuICogQHJldHVybnMgc3RyaW5nIG1hcFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIG1hcE9wZXJhdG9yQnlGaWVsZFR5cGUoZmllbGRUeXBlOiBGaWVsZFR5cGUgfCBzdHJpbmcpOiBPcGVyYXRvclR5cGUge1xyXG4gIGxldCBtYXA6IE9wZXJhdG9yVHlwZTtcclxuXHJcbiAgc3dpdGNoIChmaWVsZFR5cGUpIHtcclxuICAgIGNhc2UgRmllbGRUeXBlLnN0cmluZzpcclxuICAgIGNhc2UgRmllbGRUeXBlLnVua25vd246XHJcbiAgICAgIG1hcCA9IE9wZXJhdG9yVHlwZS5jb250YWlucztcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIEZpZWxkVHlwZS5mbG9hdDpcclxuICAgIGNhc2UgRmllbGRUeXBlLm51bWJlcjpcclxuICAgIGNhc2UgRmllbGRUeXBlLmRhdGU6XHJcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlSXNvOlxyXG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZTpcclxuICAgIGNhc2UgRmllbGRUeXBlLmRhdGVVdGM6XHJcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlVGltZTpcclxuICAgIGNhc2UgRmllbGRUeXBlLmRhdGVUaW1lSXNvOlxyXG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZVRpbWVJc29BbVBtOlxyXG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZVRpbWVJc29BTV9QTTpcclxuICAgIGNhc2UgRmllbGRUeXBlLmRhdGVFdXJvOlxyXG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZUV1cm9TaG9ydDpcclxuICAgIGNhc2UgRmllbGRUeXBlLmRhdGVUaW1lRXVybzpcclxuICAgIGNhc2UgRmllbGRUeXBlLmRhdGVUaW1lRXVyb0FtUG06XHJcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlVGltZUV1cm9BTV9QTTpcclxuICAgIGNhc2UgRmllbGRUeXBlLmRhdGVUaW1lRXVyb1Nob3J0OlxyXG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZVRpbWVFdXJvU2hvcnRBbVBtOlxyXG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZVRpbWVFdXJvU2hvcnRBTV9QTTpcclxuICAgIGNhc2UgRmllbGRUeXBlLmRhdGVVczpcclxuICAgIGNhc2UgRmllbGRUeXBlLmRhdGVVc1Nob3J0OlxyXG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZVRpbWVVczpcclxuICAgIGNhc2UgRmllbGRUeXBlLmRhdGVUaW1lVXNBbVBtOlxyXG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZVRpbWVVc0FNX1BNOlxyXG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZVRpbWVVc1Nob3J0OlxyXG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZVRpbWVVc1Nob3J0QW1QbTpcclxuICAgIGNhc2UgRmllbGRUeXBlLmRhdGVUaW1lVXNTaG9ydEFNX1BNOlxyXG4gICAgZGVmYXVsdDpcclxuICAgICAgbWFwID0gT3BlcmF0b3JUeXBlLmVxdWFsO1xyXG4gICAgICBicmVhaztcclxuICB9XHJcblxyXG4gIHJldHVybiBtYXA7XHJcbn1cclxuXHJcbi8qKiBQYXJzZSBhbnkgaW5wdXQgKGJvb2wsIG51bWJlciwgc3RyaW5nKSBhbmQgcmV0dXJuIGEgYm9vbGVhbiBvciBGYWxzZSB3aGVuIG5vdCBwb3NzaWJsZSAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VCb29sZWFuKGlucHV0OiBib29sZWFuIHwgbnVtYmVyIHwgc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgcmV0dXJuIC8odHJ1ZXwxKS9pLnRlc3QoaW5wdXQgKyAnJyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBQYXJzZSBhIGRhdGUgcGFzc2VkIGFzIGEgc3RyaW5nIChEYXRlIG9ubHksIHdpdGhvdXQgdGltZSkgYW5kIHJldHVybiBhIERhdGUgb2JqZWN0IChpZiB2YWxpZClcclxuICogQHBhcmFtIGlucHV0RGF0ZVN0cmluZ1xyXG4gKiBAcmV0dXJucyBzdHJpbmcgZGF0ZSBmb3JtYXR0ZWRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVV0Y0RhdGUoaW5wdXREYXRlU3RyaW5nOiBzdHJpbmcsIHVzZVV0Yz86IGJvb2xlYW4pOiBzdHJpbmcgfCBudWxsIHtcclxuICBsZXQgZGF0ZSA9IG51bGw7XHJcblxyXG4gIGlmICgvXlswLTlcXC1cXC9dKiQvLnRlc3QoaW5wdXREYXRlU3RyaW5nKSkge1xyXG4gICAgLy8gZ2V0IHRoZSBVVEMgZGF0ZXRpbWUgd2l0aCBtb21lbnQuanMgYnV0IHdlIG5lZWQgdG8gZGVjb2RlIHRoZSB2YWx1ZSBzbyB0aGF0IGl0J3MgdmFsaWQgdGV4dFxyXG4gICAgY29uc3QgZGF0ZVN0cmluZyA9IGRlY29kZVVSSUNvbXBvbmVudChpbnB1dERhdGVTdHJpbmcpO1xyXG4gICAgY29uc3QgZGF0ZU1vbWVudCA9IG1vbWVudChuZXcgRGF0ZShkYXRlU3RyaW5nKSk7XHJcbiAgICBpZiAoZGF0ZU1vbWVudC5pc1ZhbGlkKCkgJiYgZGF0ZU1vbWVudC55ZWFyKCkudG9TdHJpbmcoKS5sZW5ndGggPT09IDQpIHtcclxuICAgICAgZGF0ZSA9ICh1c2VVdGMpID8gZGF0ZU1vbWVudC51dGMoKS5mb3JtYXQoKSA6IGRhdGVNb21lbnQuZm9ybWF0KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gZGF0ZTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFNhbml0aXplLCByZXR1cm4gb25seSB0aGUgdGV4dCB3aXRob3V0IEhUTUwgdGFnc1xyXG4gKiBAaW5wdXQgaHRtbFN0cmluZ1xyXG4gKiBAcmV0dXJuIHRleHRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzYW5pdGl6ZUh0bWxUb1RleHQoaHRtbFN0cmluZzogc3RyaW5nKSB7XHJcbiAgY29uc3QgdGVtcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gIHRlbXAuaW5uZXJIVE1MID0gaHRtbFN0cmluZztcclxuICByZXR1cm4gdGVtcC50ZXh0Q29udGVudCB8fCB0ZW1wLmlubmVyVGV4dCB8fCAnJztcclxufVxyXG5cclxuLyoqXHJcbiAqIFRpdGxlIGNhc2UgKG9yIGNhcGl0YWxpemUpIGZpcnN0IGNoYXIgb2YgYSBzdHJpbmdcclxuICogT3B0aW9uYWxsIHRpdGxlIGNhc2UgdGhlIGNvbXBsZXRlIHNlbnRlbmNlICh1cHBlciBjYXNlIGZpcnN0IGNoYXIgb2YgZWFjaCB3b3JkIHdoaWxlIGNoYW5naW5nIGV2ZXJ5dGhpbmcgZWxzZSB0byBsb3dlciBjYXNlKVxyXG4gKiBAcGFyYW0gaW5wdXRTdHJcclxuICogQHJldHVybnMgc3RyaW5nXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gdGl0bGVDYXNlKGlucHV0U3RyOiBzdHJpbmcsIGNhc2VFdmVyeVdvcmRzID0gZmFsc2UpOiBzdHJpbmcge1xyXG4gIGlmICh0eXBlb2YgaW5wdXRTdHIgPT09ICdzdHJpbmcnKSB7XHJcbiAgICBpZiAoY2FzZUV2ZXJ5V29yZHMpIHtcclxuICAgICAgcmV0dXJuIGlucHV0U3RyLnJlcGxhY2UoL1xcd1xcUyovZywgKG91dHB1dFN0cikgPT4ge1xyXG4gICAgICAgIHJldHVybiBvdXRwdXRTdHIuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBvdXRwdXRTdHIuc3Vic3RyKDEpLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGlucHV0U3RyLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgaW5wdXRTdHIuc2xpY2UoMSk7XHJcbiAgfVxyXG4gIHJldHVybiBpbnB1dFN0cjtcclxufVxyXG5cclxuLyoqXHJcbiAqIENvbnZlcnRzIGEgc3RyaW5nIHRvIGNhbWVsIGNhc2UgKGNhbWVsQ2FzZSlcclxuICogQHBhcmFtIGlucHV0U3RyIHRoZSBzdHJpbmcgdG8gY29udmVydFxyXG4gKiBAcmV0dXJuIHRoZSBzdHJpbmcgaW4gY2FtZWwgY2FzZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHRvQ2FtZWxDYXNlKGlucHV0U3RyOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gIGlmICh0eXBlb2YgaW5wdXRTdHIgPT09ICdzdHJpbmcnKSB7XHJcbiAgICByZXR1cm4gaW5wdXRTdHIucmVwbGFjZSgvKD86Xlxcd3xbQS1aXXxcXGJcXHd8W1xccytcXC1fXFwvXSkvZywgKG1hdGNoOiBzdHJpbmcsIG9mZnNldDogbnVtYmVyKSA9PiB7XHJcbiAgICAgIC8vIHJlbW92ZSB3aGl0ZSBzcGFjZSBvciBoeXBlbnMgb3IgdW5kZXJzY29yZXNcclxuICAgICAgaWYgKC9bXFxzK1xcLV9cXC9dLy50ZXN0KG1hdGNoKSkge1xyXG4gICAgICAgIHJldHVybiAnJztcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIG9mZnNldCA9PT0gMCA/IG1hdGNoLnRvTG93ZXJDYXNlKCkgOiBtYXRjaC50b1VwcGVyQ2FzZSgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG4gIHJldHVybiBpbnB1dFN0cjtcclxufVxyXG5cclxuLyoqXHJcbiAqIENvbnZlcnRzIGEgc3RyaW5nIHRvIGtlYmFiIChoeXBlbikgY2FzZVxyXG4gKiBAcGFyYW0gc3RyIHRoZSBzdHJpbmcgdG8gY29udmVydFxyXG4gKiBAcmV0dXJuIHRoZSBzdHJpbmcgaW4ga2ViYWIgY2FzZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHRvS2ViYWJDYXNlKGlucHV0U3RyOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gIGlmICh0eXBlb2YgaW5wdXRTdHIgPT09ICdzdHJpbmcnKSB7XHJcbiAgICByZXR1cm4gdG9DYW1lbENhc2UoaW5wdXRTdHIpLnJlcGxhY2UoLyhbQS1aXSkvZywgJy0kMScpLnRvTG93ZXJDYXNlKCk7XHJcbiAgfVxyXG4gIHJldHVybiBpbnB1dFN0cjtcclxufVxyXG5cclxuLyoqXHJcbiAqIENvbnZlcnRzIGEgc3RyaW5nIGZyb20gY2FtZWxDYXNlIHRvIHNuYWtlX2Nhc2UgKHVuZGVyc2NvcmUpIGNhc2VcclxuICogQHBhcmFtIHN0ciB0aGUgc3RyaW5nIHRvIGNvbnZlcnRcclxuICogQHJldHVybiB0aGUgc3RyaW5nIGluIGtlYmFiIGNhc2VcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiB0b1NuYWtlQ2FzZShpbnB1dFN0cjogc3RyaW5nKTogc3RyaW5nIHtcclxuICBpZiAodHlwZW9mIGlucHV0U3RyID09PSAnc3RyaW5nJykge1xyXG4gICAgcmV0dXJuIHRvQ2FtZWxDYXNlKGlucHV0U3RyKS5yZXBsYWNlKC8oW0EtWl0pL2csICdfJDEnKS50b0xvd2VyQ2FzZSgpO1xyXG4gIH1cclxuICByZXR1cm4gaW5wdXRTdHI7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUYWtlcyBhbiBpbnB1dCBhcnJheSBhbmQgbWFrZXMgc3VyZSB0aGUgYXJyYXkgaGFzIHVuaXF1ZSB2YWx1ZXMgYnkgcmVtb3ZpbmcgZHVwbGljYXRlc1xyXG4gKiBAcGFyYW0gYXJyYXkgaW5wdXQgd2l0aCBwb3NzaWJsZSBkdXBsaWNhdGVzXHJcbiAqIEBwYXJhbSBvYmplY3RQcm9wZXJ0eSBvcHRpb25hbGx5IHByb3ZpZGUgYW4gb2JqZWN0IHByb3BlcnR5IHRvIGNvbXBhcmUgKGV4YW1wbGU6ICdpZCcpXHJcbiAqIEByZXR1cm4gYXJyYXkgb3V0cHV0IHdpdGhvdXQgZHVwbGljYXRlc1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHVuaXF1ZUFycmF5KGFycjogYW55W10pOiBhbnlbXSB7XHJcbiAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSAmJiBhcnIubGVuZ3RoID4gMCkge1xyXG4gICAgcmV0dXJuIGFyci5maWx0ZXIoKGl0ZW06IGFueSwgaW5kZXg6IG51bWJlcikgPT4ge1xyXG4gICAgICByZXR1cm4gYXJyLmluZGV4T2YoaXRlbSkgPj0gaW5kZXg7XHJcbiAgICB9KTtcclxuICB9XHJcbiAgcmV0dXJuIGFycjtcclxufVxyXG5cclxuLyoqXHJcbiAqIFRha2VzIGFuIGlucHV0IGFycmF5IG9mIG9iamVjdHMgYW5kIG1ha2VzIHN1cmUgdGhlIGFycmF5IGhhcyB1bmlxdWUgb2JqZWN0IHZhbHVlcyBieSByZW1vdmluZyBkdXBsaWNhdGVzXHJcbiAqIGl0IHdpbGwgbG9vcCB0aHJvdWdoIHRoZSBhcnJheSB1c2luZyBhIHByb3BlcnR5IG5hbWUgKG9yIFwiaWRcIiB3aGVuIGlzIG5vdCBwcm92aWRlZCkgdG8gY29tcGFyZSB1bmlxdWVuZXNzXHJcbiAqIEBwYXJhbSBhcnJheSBpbnB1dCB3aXRoIHBvc3NpYmxlIGR1cGxpY2F0ZXNcclxuICogQHBhcmFtIHByb3BlcnR5TmFtZSBkZWZhdWx0cyB0byBcImlkXCJcclxuICogQHJldHVybiBhcnJheSBvdXRwdXQgd2l0aG91dCBkdXBsaWNhdGVzXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gdW5pcXVlT2JqZWN0QXJyYXkoYXJyOiBhbnlbXSwgcHJvcGVydHlOYW1lID0gJ2lkJyk6IGFueVtdIHtcclxuICBpZiAoQXJyYXkuaXNBcnJheShhcnIpICYmIGFyci5sZW5ndGggPiAwKSB7XHJcbiAgICBjb25zdCByZXN1bHQgPSBbXTtcclxuICAgIGNvbnN0IG1hcCA9IG5ldyBNYXAoKTtcclxuXHJcbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgYXJyKSB7XHJcbiAgICAgIGlmICghbWFwLmhhcyhpdGVtW3Byb3BlcnR5TmFtZV0pKSB7XHJcbiAgICAgICAgbWFwLnNldChpdGVtW3Byb3BlcnR5TmFtZV0sIHRydWUpOyAgICAvLyBzZXQgYW55IHZhbHVlIHRvIE1hcFxyXG4gICAgICAgIHJlc3VsdC5wdXNoKHtcclxuICAgICAgICAgIGlkOiBpdGVtW3Byb3BlcnR5TmFtZV0sXHJcbiAgICAgICAgICBuYW1lOiBpdGVtLm5hbWVcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcbiAgcmV0dXJuIGFycjtcclxufVxyXG5cclxuLyoqXHJcbiAqIFVuc3Vic2NyaWJlIGFsbCBPYnNlcnZhYmxlcyBTdWJzY3JpcHRpb25zXHJcbiAqIEl0IHdpbGwgcmV0dXJuIGFuIGVtcHR5IGFycmF5IGlmIGl0IGFsbCB3ZW50IHdlbGxcclxuICogQHBhcmFtIHN1YnNjcmlwdGlvbnNcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiB1bnN1YnNjcmliZUFsbE9ic2VydmFibGVzKHN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdKTogU3Vic2NyaXB0aW9uW10ge1xyXG4gIGlmIChBcnJheS5pc0FycmF5KHN1YnNjcmlwdGlvbnMpKSB7XHJcbiAgICBzdWJzY3JpcHRpb25zLmZvckVhY2goKHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uKSA9PiB7XHJcbiAgICAgIGlmIChzdWJzY3JpcHRpb24gJiYgc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKSB7XHJcbiAgICAgICAgc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgc3Vic2NyaXB0aW9ucyA9IFtdO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHN1YnNjcmlwdGlvbnM7XHJcbn1cclxuIl19