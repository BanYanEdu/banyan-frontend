import { FieldType, OperatorType } from '../models/index';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import * as moment_ from 'moment-mini';
const moment = moment_; // patch to fix rollup "moment has no default export" issue, document here https://github.com/rollup/rollup/issues/670
/**
 * Add an item to an array only when the item does not exists, when the item is an object we will be using their "id" to compare
 * @param inputArray
 * @param inputItem
 */
export function addToArrayWhenNotExists(inputArray, inputItem) {
    let arrayRowIndex = -1;
    if (typeof inputItem === 'object' && inputItem.hasOwnProperty('id')) {
        arrayRowIndex = inputArray.findIndex((item) => item.id === inputItem.id);
    }
    else {
        arrayRowIndex = inputArray.findIndex((item) => item === inputItem);
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
    let result = '';
    for (let i = 0; i < nbSpaces; i++) {
        result += ' ';
    }
    return result;
}
/** HTML decode using jQuery with a <div>
 * Create a in-memory div, set it's inner text(which jQuery automatically encodes)
 * then grab the encoded contents back out.  The div never exists on the page.
*/
export function htmlDecode(encodedStr) {
    const parser = DOMParser && new DOMParser;
    if (parser && parser.parseFromString) {
        const dom = parser.parseFromString('<!doctype html><body>' + encodedStr, 'text/html');
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
    const entityMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        '\'': '&#39;',
    };
    // all symbols::  /[&<>"'`=\/]/g
    return inputValue.replace(/[&<>"']/g, (s) => {
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
    const buf = [];
    for (let i = input.length - 1; i >= 0; i--) {
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
export function charArraysEqual(a, b, orderMatters = false) {
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
    for (let i = 0; i < a.length; ++i) {
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
export function castToPromise(input, fromServiceName = '') {
    let promise = input;
    if (input instanceof Promise) {
        // if it's already a Promise then return it
        return input;
    }
    else if (input instanceof Observable) {
        promise = input.pipe(first()).toPromise();
    }
    if (!(promise instanceof Promise)) {
        throw new Error(`Something went wrong, Angular-Slickgrid ${fromServiceName} is not able to convert the Observable into a Promise.
      If you are using Angular HttpClient, you could try converting your http call to a Promise with ".toPromise()"
      for example::  this.http.post('graphql', { query: graphqlQuery }).toPromise()
      `);
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
export function findOrDefault(array, logic, defaultVal = {}) {
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
    const minDec = (minDecimal === undefined) ? 2 : minDecimal;
    const maxDec = (maxDecimal === undefined) ? 2 : maxDecimal;
    let amount = String(Math.round(+input * Math.pow(10, maxDec)) / Math.pow(10, maxDec));
    if ((amount.indexOf('.') < 0) && (minDec > 0)) {
        amount += '.';
    }
    while ((amount.length - amount.indexOf('.')) <= minDec) {
        amount += '0';
    }
    return amount;
}
export function formatNumber(input, minDecimal, maxDecimal, displayNegativeNumberWithParentheses, symbolPrefix = '', symbolSuffix = '') {
    if (isNaN(+input)) {
        return input;
    }
    const calculatedValue = ((Math.round(parseFloat(input) * 1000000) / 1000000));
    if (calculatedValue < 0) {
        const absValue = Math.abs(calculatedValue);
        if (displayNegativeNumberWithParentheses) {
            if (!isNaN(minDecimal) || !isNaN(maxDecimal)) {
                return `(${symbolPrefix}${decimalFormatted(absValue, minDecimal, maxDecimal)}${symbolSuffix})`;
            }
            return `(${symbolPrefix}${absValue}${symbolSuffix})`;
        }
        else {
            if (!isNaN(minDecimal) || !isNaN(maxDecimal)) {
                return `-${symbolPrefix}${decimalFormatted(absValue, minDecimal, maxDecimal)}${symbolSuffix}`;
            }
            return `-${symbolPrefix}${absValue}${symbolSuffix}`;
        }
    }
    else {
        if (!isNaN(minDecimal) || !isNaN(maxDecimal)) {
            return `${symbolPrefix}${decimalFormatted(input, minDecimal, maxDecimal)}${symbolSuffix}`;
        }
        return `${symbolPrefix}${input}${symbolSuffix}`;
    }
}
/** From a dot (.) notation find and return a property within an object given a path */
export function getDescendantProperty(obj, path) {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}
/** Get the browser's scrollbar width, this is different to each browser */
export function getScrollBarWidth() {
    const $outer = $('<div>').css({ visibility: 'hidden', width: 100, overflow: 'scroll' }).appendTo('body');
    const widthWithScroll = $('<div>').css({ width: '100%' }).appendTo($outer).outerWidth();
    $outer.remove();
    return Math.ceil(100 - widthWithScroll);
}
/**
 * From a Date FieldType, return it's equivalent moment.js format
 * refer to moment.js for the format standard used: https://momentjs.com/docs/#/parsing/string-format/
 * @param fieldType
 */
export function mapMomentDateFormatWithFieldType(fieldType) {
    let map;
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
    let map;
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
    let map;
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
    let map;
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
    let date = null;
    if (/^[0-9\-\/]*$/.test(inputDateString)) {
        // get the UTC datetime with moment.js but we need to decode the value so that it's valid text
        const dateString = decodeURIComponent(inputDateString);
        const dateMoment = moment(new Date(dateString));
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
    const temp = document.createElement('div');
    temp.innerHTML = htmlString;
    return temp.textContent || temp.innerText || '';
}
/**
 * Title case (or capitalize) first char of a string
 * Optionall title case the complete sentence (upper case first char of each word while changing everything else to lower case)
 * @param inputStr
 * @returns string
 */
export function titleCase(inputStr, caseEveryWords = false) {
    if (typeof inputStr === 'string') {
        if (caseEveryWords) {
            return inputStr.replace(/\w\S*/g, (outputStr) => {
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
        return inputStr.replace(/(?:^\w|[A-Z]|\b\w|[\s+\-_\/])/g, (match, offset) => {
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
        return arr.filter((item, index) => {
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
export function uniqueObjectArray(arr, propertyName = 'id') {
    if (Array.isArray(arr) && arr.length > 0) {
        const result = [];
        const map = new Map();
        for (const item of arr) {
            if (!map.has(item[propertyName])) {
                map.set(item[propertyName], true); // set any value to Map
                result.push({
                    id: item[propertyName],
                    name: item.name
                });
            }
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
        subscriptions.forEach((subscription) => {
            if (subscription && subscription.unsubscribe) {
                subscription.unsubscribe();
            }
        });
        subscriptions = [];
    }
    return subscriptions;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbGl0aWVzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9zZXJ2aWNlcy91dGlsaXRpZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsVUFBVSxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUNoRCxPQUFPLEVBQUUsS0FBSyxFQUFRLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxLQUFLLE9BQU8sTUFBTSxhQUFhLENBQUM7QUFDdkMsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLENBQUMsc0hBQXNIO0FBSzlJOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsdUJBQXVCLENBQUMsVUFBaUIsRUFBRSxTQUFjO0lBQ3ZFLElBQUksYUFBYSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3ZCLElBQUksT0FBTyxTQUFTLEtBQUssUUFBUSxJQUFJLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDbkUsYUFBYSxHQUFHLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0tBQzFFO1NBQU07UUFDTCxhQUFhLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxLQUFLLFNBQVMsQ0FBQyxDQUFDO0tBQ3BFO0lBRUQsSUFBSSxhQUFhLEdBQUcsQ0FBQyxFQUFFO1FBQ3JCLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7S0FDNUI7QUFDSCxDQUFDO0FBRUQ7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSxjQUFjLENBQUMsUUFBZ0I7SUFDN0MsSUFBSSxNQUFNLEdB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WSxDQUFDLFdBQVcsRUFBRTtnQkFDNUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO2FBQzVCO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDSCxhQUFhLEdBQUcsRUFBRSxDQUFDO0tBQ3BCO0lBRUQsT0FBTyxhQUFhLENBQUM7QUFDdkIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZpZWxkVHlwZSwgT3BlcmF0b3JUeXBlIH0gZnJvbSAnLi4vbW9kZWxzL2luZGV4JztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IGZpcnN0LCB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgKiBhcyBtb21lbnRfIGZyb20gJ21vbWVudC1taW5pJztcclxuY29uc3QgbW9tZW50ID0gbW9tZW50XzsgLy8gcGF0Y2ggdG8gZml4IHJvbGx1cCBcIm1vbWVudCBoYXMgbm8gZGVmYXVsdCBleHBvcnRcIiBpc3N1ZSwgZG9jdW1lbnQgaGVyZSBodHRwczovL2dpdGh1Yi5jb20vcm9sbHVwL3JvbGx1cC9pc3N1ZXMvNjcwXHJcblxyXG4vLyB1c2luZyBleHRlcm5hbCBub24tdHlwZWQganMgbGlicmFyaWVzXHJcbmRlY2xhcmUgdmFyICQ6IGFueTtcclxuXHJcbi8qKlxyXG4gKiBBZGQgYW4gaXRlbSB0byBhbiBhcnJheSBvbmx5IHdoZW4gdGhlIGl0ZW0gZG9lcyBub3QgZXhpc3RzLCB3aGVuIHRoZSBpdGVtIGlzIGFuIG9iamVjdCB3ZSB3aWxsIGJlIHVzaW5nIHRoZWlyIFwiaWRcIiB0byBjb21wYXJlXHJcbiAqIEBwYXJhbSBpbnB1dEFycmF5XHJcbiAqIEBwYXJhbSBpbnB1dEl0ZW1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBhZGRUb0FycmF5V2hlbk5vdEV4aXN0cyhpbnB1dEFycmF5OiBhbnlbXSwgaW5wdXRJdGVtOiBhbnkpIHtcclxuICBsZXQgYXJyYXlSb3dJbmRleCA9IC0xO1xyXG4gIGlmICh0eXBlb2YgaW5wdXRJdGVtID09PSAnb2JqZWN0JyAmJiBpbnB1dEl0ZW0uaGFzT3duUHJvcGVydHkoJ2lkJykpIHtcclxuICAgIGFycmF5Um93SW5kZXggPSBpbnB1dEFycmF5LmZpbmRJbmRleCgoaXRlbSkgPT4gaXRlbS5pZCA9PT0gaW5wdXRJdGVtLmlkKTtcclxuICB9IGVsc2Uge1xyXG4gICAgYXJyYXlSb3dJbmRleCA9IGlucHV0QXJyYXkuZmluZEluZGV4KChpdGVtKSA9PiBpdGVtID09PSBpbnB1dEl0ZW0pO1xyXG4gIH1cclxuXHJcbiAgaWYgKGFycmF5Um93SW5kZXggPCAwKSB7XHJcbiAgICBpbnB1dEFycmF5LnB1c2goaW5wdXRJdGVtKTtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTaW1wbGUgZnVuY3Rpb24gdG8gd2hpY2ggd2lsbCBsb29wIGFuZCBjcmVhdGUgYXMgZGVtYW5kZWQgdGhlIG51bWJlciBvZiB3aGl0ZSBzcGFjZXMsXHJcbiAqIHRoaXMgaXMgdXNlZCBpbiB0aGUgQ1NWIGV4cG9ydFxyXG4gKiBAcGFyYW0gaW50IG5iU3BhY2VzOiBudW1iZXIgb2Ygd2hpdGUgc3BhY2VzIHRvIGNyZWF0ZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGFkZFdoaXRlU3BhY2VzKG5iU3BhY2VzOiBudW1iZXIpOiBzdHJpbmcge1xyXG4gIGxldCByZXN1bHQgPSAnJztcclxuXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBuYlNwYWNlczsgaSsrKSB7XHJcbiAgICByZXN1bHQgKz0gJyAnO1xyXG4gIH1cclxuICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG4vKiogSFRNTCBkZWNvZGUgdXNpbmcgalF1ZXJ5IHdpdGggYSA8ZGl2PlxyXG4gKiBDcmVhdGUgYSBpbi1tZW1vcnkgZGl2LCBzZXQgaXQncyBpbm5lciB0ZXh0KHdoaWNoIGpRdWVyeSBhdXRvbWF0aWNhbGx5IGVuY29kZXMpXHJcbiAqIHRoZW4gZ3JhYiB0aGUgZW5jb2RlZCBjb250ZW50cyBiYWNrIG91dC4gIFRoZSBkaXYgbmV2ZXIgZXhpc3RzIG9uIHRoZSBwYWdlLlxyXG4qL1xyXG5leHBvcnQgZnVuY3Rpb24gaHRtbERlY29kZShlbmNvZGVkU3RyOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gIGNvbnN0IHBhcnNlciA9IERPTVBhcnNlciAmJiBuZXcgRE9NUGFyc2VyO1xyXG4gIGlmIChwYXJzZXIgJiYgcGFyc2VyLnBhcnNlRnJvbVN0cmluZykge1xyXG4gICAgY29uc3QgZG9tID0gcGFyc2VyLnBhcnNlRnJvbVN0cmluZyhcclxuICAgICAgJzwhZG9jdHlwZSBodG1sPjxib2R5PicgKyBlbmNvZGVkU3RyLFxyXG4gICAgICAndGV4dC9odG1sJyk7XHJcbiAgICByZXR1cm4gZG9tICYmIGRvbS5ib2R5ICYmIGRvbS5ib2R5LnRleHRDb250ZW50O1xyXG4gIH0gZWxzZSB7XHJcbiAgICAvLyBmb3Igc29tZSBicm93c2VycyB0aGF0IG1pZ2h0IG5vdCBzdXBwb3J0IERPTVBhcnNlciwgdXNlIGpRdWVyeSBpbnN0ZWFkXHJcbiAgICByZXR1cm4gJCgnPGRpdi8+JykuaHRtbChlbmNvZGVkU3RyKS50ZXh0KCk7XHJcbiAgfVxyXG59XHJcblxyXG4vKiogSFRNTCBlbmNvZGUgdXNpbmcgalF1ZXJ5IHdpdGggYSA8ZGl2PlxyXG4gKiBDcmVhdGUgYSBpbi1tZW1vcnkgZGl2LCBzZXQgaXQncyBpbm5lciB0ZXh0KHdoaWNoIGpRdWVyeSBhdXRvbWF0aWNhbGx5IGVuY29kZXMpXHJcbiAqIHRoZW4gZ3JhYiB0aGUgZW5jb2RlZCBjb250ZW50cyBiYWNrIG91dC4gIFRoZSBkaXYgbmV2ZXIgZXhpc3RzIG9uIHRoZSBwYWdlLlxyXG4qL1xyXG5leHBvcnQgZnVuY3Rpb24gaHRtbEVuY29kZShpbnB1dFZhbHVlOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gIGNvbnN0IGVudGl0eU1hcCA9IHtcclxuICAgICcmJzogJyZhbXA7JyxcclxuICAgICc8JzogJyZsdDsnLFxyXG4gICAgJz4nOiAnJmd0OycsXHJcbiAgICAnXCInOiAnJnF1b3Q7JyxcclxuICAgICdcXCcnOiAnJiMzOTsnLFxyXG4gICAgLy8gJy8nOiAnJiN4MkY7JyxcclxuICAgIC8vICdgJzogJyYjeDYwOycsXHJcbiAgICAvLyAnPSc6ICcmI3gzRDsnXHJcbiAgfTtcclxuICAvLyBhbGwgc3ltYm9sczo6ICAvWyY8PlwiJ2A9XFwvXS9nXHJcbiAgcmV0dXJuIGlucHV0VmFsdWUucmVwbGFjZSgvWyY8PlwiJ10vZywgKHMpID0+IHtcclxuICAgIHJldHVybiBlbnRpdHlNYXBbc107XHJcbiAgfSk7XHJcbn1cclxuXHJcbi8qKiBkZWNvZGUgdGV4dCBpbnRvIGh0bWwgZW50aXR5XHJcbiAqIEBwYXJhbSBzdHJpbmcgdGV4dDogaW5wdXQgdGV4dFxyXG4gKiBAcGFyYW0gc3RyaW5nIHRleHQ6IG91dHB1dCB0ZXh0XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaHRtbEVudGl0eURlY29kZShpbnB1dDogc3RyaW5nKTogc3RyaW5nIHtcclxuICByZXR1cm4gaW5wdXQucmVwbGFjZSgvJiMoXFxkKyk7L2csIGZ1bmN0aW9uIChtYXRjaCwgZGVjKSB7XHJcbiAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShkZWMpO1xyXG4gIH0pO1xyXG59XHJcblxyXG4vKiogZGVjb2RlIHRleHQgaW50byBodG1sIGVudGl0eVxyXG4gKiBAcGFyYW0gc3RyaW5nIHRleHQ6IGlucHV0IHRleHRcclxuICogQHBhcmFtIHN0cmluZyB0ZXh0OiBvdXRwdXQgdGV4dFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGh0bWxFbnRpdHlFbmNvZGUoaW5wdXQ6IGFueSk6IHN0cmluZyB7XHJcbiAgY29uc3QgYnVmID0gW107XHJcbiAgZm9yIChsZXQgaSA9IGlucHV0Lmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICBidWYudW5zaGlmdChbJyYjJywgaW5wdXRbaV0uY2hhckNvZGVBdCgpLCAnOyddLmpvaW4oJycpKTtcclxuICB9XHJcbiAgcmV0dXJuIGJ1Zi5qb2luKCcnKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENvbXBhcmVzIHR3byBhcnJheXMgb2YgY2hhcmFjdGVycyB0byBkZXRlcm1pbmUgaWYgYWxsIHRoZSBpdGVtcyBhcmUgZXF1YWxcclxuICogQHBhcmFtIGEgZmlyc3QgYXJyYXlcclxuICogQHBhcmFtIGIgc2Vjb25kIGFycmF5IHRvIGNvbXBhcmUgd2l0aCBhXHJcbiAqIEBwYXJhbSBbb3JkZXJNYXR0ZXJzPWZhbHNlXSBmbGFnIGlmIHRoZSBvcmRlciBtYXR0ZXJzLCBpZiBub3QgYXJyYXlzIHdpbGwgYmUgc29ydGVkIGJlZm9yZSBjb21wYXJpc29uXHJcbiAqIEByZXR1cm4gYm9vbGVhbiB0cnVlIGlmIGVxdWFsLCBlbHNlIGZhbHNlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY2hhckFycmF5c0VxdWFsKGE6IGFueVtdLCBiOiBhbnlbXSwgb3JkZXJNYXR0ZXJzOiBib29sZWFuID0gZmFsc2UpOiBib29sZWFuIHtcclxuICBpZiAoIUFycmF5LmlzQXJyYXkoYSkgfHwgIUFycmF5LmlzQXJyYXkoYSkpIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIGlmIChhLmxlbmd0aCAhPT0gYi5sZW5ndGgpIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIGlmICghb3JkZXJNYXR0ZXJzKSB7XHJcbiAgICBhLnNvcnQoKTtcclxuICAgIGIuc29ydCgpO1xyXG4gIH1cclxuXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBhLmxlbmd0aDsgKytpKSB7XHJcbiAgICBpZiAoYVtpXSAhPT0gYltpXSkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gdHJ1ZTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFRyeSBjYXN0aW5nIGFuIGlucHV0IG9mIHR5cGUgUHJvbWlzZSB8IE9ic2VydmFibGUgaW50byBhIFByb21pc2UgdHlwZS5cclxuICogQHBhcmFtIG9iamVjdCB3aGljaCBjb3VsZCBiZSBvZiB0eXBlIFByb21pc2Ugb3IgT2JzZXJ2YWJsZVxyXG4gKiBAcGFyYW0gZnJvbVNlcnZpY2VOYW1lIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIGNhbGxlciBzZXJ2aWNlIG5hbWUgYW5kIHdpbGwgYmUgdXNlZCBpZiB3ZSB0aHJvdyBhIGNhc3RpbmcgcHJvYmxlbSBlcnJvclxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGNhc3RUb1Byb21pc2U8VD4oaW5wdXQ6IFByb21pc2U8VD4gfCBPYnNlcnZhYmxlPFQ+LCBmcm9tU2VydmljZU5hbWU6IHN0cmluZyA9ICcnKTogUHJvbWlzZTxUPiB7XHJcbiAgbGV0IHByb21pc2U6IGFueSA9IGlucHV0O1xyXG5cclxuICBpZiAoaW5wdXQgaW5zdGFuY2VvZiBQcm9taXNlKSB7XHJcbiAgICAvLyBpZiBpdCdzIGFscmVhZHkgYSBQcm9taXNlIHRoZW4gcmV0dXJuIGl0XHJcbiAgICByZXR1cm4gaW5wdXQ7XHJcbiAgfSBlbHNlIGlmIChpbnB1dCBpbnN0YW5jZW9mIE9ic2VydmFibGUpIHtcclxuICAgIHByb21pc2UgPSBpbnB1dC5waXBlKGZpcnN0KCkpLnRvUHJvbWlzZSgpO1xyXG4gIH1cclxuXHJcbiAgaWYgKCEocHJvbWlzZSBpbnN0YW5jZW9mIFByb21pc2UpKSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoXHJcbiAgICAgIGBTb21ldGhpbmcgd2VudCB3cm9uZywgQW5ndWxhci1TbGlja2dyaWQgJHtmcm9tU2VydmljZU5hbWV9IGlzIG5vdCBhYmxlIHRvIGNvbnZlcnQgdGhlIE9ic2VydmFibGUgaW50byBhIFByb21pc2UuXHJcbiAgICAgIElmIHlvdSBhcmUgdXNpbmcgQW5ndWxhciBIdHRwQ2xpZW50LCB5b3UgY291bGQgdHJ5IGNvbnZlcnRpbmcgeW91ciBodHRwIGNhbGwgdG8gYSBQcm9taXNlIHdpdGggXCIudG9Qcm9taXNlKClcIlxyXG4gICAgICBmb3IgZXhhbXBsZTo6ICB0aGlzLmh0dHAucG9zdCgnZ3JhcGhxbCcsIHsgcXVlcnk6IGdyYXBocWxRdWVyeSB9KS50b1Byb21pc2UoKVxyXG4gICAgICBgKTtcclxuICB9XHJcblxyXG4gIHJldHVybiBwcm9taXNlO1xyXG59XHJcblxyXG4vKipcclxuICogVXNlcyB0aGUgbG9naWMgZnVuY3Rpb24gdG8gZmluZCBhbiBpdGVtIGluIGFuIGFycmF5IG9yIHJldHVybnMgdGhlIGRlZmF1bHRcclxuICogdmFsdWUgcHJvdmlkZWQgKGVtcHR5IG9iamVjdCBieSBkZWZhdWx0KVxyXG4gKiBAcGFyYW0gYW55W10gYXJyYXkgdGhlIGFycmF5IHRvIGZpbHRlclxyXG4gKiBAcGFyYW0gZnVuY3Rpb24gbG9naWMgdGhlIGxvZ2ljIHRvIGZpbmQgdGhlIGl0ZW1cclxuICogQHBhcmFtIGFueSBbZGVmYXVsdFZhbD17fV0gdGhlIGRlZmF1bHQgdmFsdWUgdG8gcmV0dXJuXHJcbiAqIEByZXR1cm4gb2JqZWN0IHRoZSBmb3VuZCBvYmplY3Qgb3IgZGVmYXVsdCB2YWx1ZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRPckRlZmF1bHQoYXJyYXk6IGFueVtdLCBsb2dpYzogKGl0ZW06IGFueSkgPT4gYm9vbGVhbiwgZGVmYXVsdFZhbCA9IHt9KTogYW55IHtcclxuICByZXR1cm4gYXJyYXkuZmluZChsb2dpYykgfHwgZGVmYXVsdFZhbDtcclxufVxyXG5cclxuLyoqXHJcbiAgKiBUYWtlIGEgbnVtYmVyIChvciBhIHN0cmluZykgYW5kIGRpc3BsYXkgaXQgYXMgYSBmb3JtYXR0ZWQgZGVjaW1hbCBzdHJpbmcgd2l0aCBkZWZpbmVkIG1pbmltdW0gYW5kIG1heGltdW0gZGVjaW1hbHNcclxuICAqIEBwYXJhbSBpbnB1dFxyXG4gICogQHBhcmFtIG1pbkRlY2ltYWxcclxuICAqIEBwYXJhbSBtYXhEZWNpbWFsXHJcbiAgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGRlY2ltYWxGb3JtYXR0ZWQoaW5wdXQ6IG51bWJlciB8IHN0cmluZywgbWluRGVjaW1hbD86IG51bWJlciwgbWF4RGVjaW1hbD86IG51bWJlcik6IHN0cmluZyB7XHJcbiAgaWYgKGlzTmFOKCtpbnB1dCkpIHtcclxuICAgIHJldHVybiBpbnB1dCBhcyBzdHJpbmc7XHJcbiAgfVxyXG5cclxuICBjb25zdCBtaW5EZWMgPSAobWluRGVjaW1hbCA9PT0gdW5kZWZpbmVkKSA/IDIgOiBtaW5EZWNpbWFsO1xyXG4gIGNvbnN0IG1heERlYyA9IChtYXhEZWNpbWFsID09PSB1bmRlZmluZWQpID8gMiA6IG1heERlY2ltYWw7XHJcbiAgbGV0IGFtb3VudCA9IFN0cmluZyhNYXRoLnJvdW5kKCtpbnB1dCAqIE1hdGgucG93KDEwLCBtYXhEZWMpKSAvIE1hdGgucG93KDEwLCBtYXhEZWMpKTtcclxuXHJcbiAgaWYgKChhbW91bnQuaW5kZXhPZignLicpIDwgMCkgJiYgKG1pbkRlYyA+IDApKSB7XHJcbiAgICBhbW91bnQgKz0gJy4nO1xyXG4gIH1cclxuICB3aGlsZSAoKGFtb3VudC5sZW5ndGggLSBhbW91bnQuaW5kZXhPZignLicpKSA8PSBtaW5EZWMpIHtcclxuICAgIGFtb3VudCArPSAnMCc7XHJcbiAgfVxyXG4gIHJldHVybiBhbW91bnQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXROdW1iZXIoaW5wdXQ6IG51bWJlciB8IHN0cmluZywgbWluRGVjaW1hbD86IG51bWJlciwgbWF4RGVjaW1hbD86IG51bWJlciwgZGlzcGxheU5lZ2F0aXZlTnVtYmVyV2l0aFBhcmVudGhlc2VzPzogYm9vbGVhbiwgc3ltYm9sUHJlZml4ID0gJycsIHN5bWJvbFN1ZmZpeCA9ICcnKTogc3RyaW5nIHtcclxuICBpZiAoaXNOYU4oK2lucHV0KSkge1xyXG4gICAgcmV0dXJuIGlucHV0IGFzIHN0cmluZztcclxuICB9XHJcblxyXG4gIGNvbnN0IGNhbGN1bGF0ZWRWYWx1ZSA9ICgoTWF0aC5yb3VuZChwYXJzZUZsb2F0KGlucHV0IGFzIHN0cmluZykgKiAxMDAwMDAwKSAvIDEwMDAwMDApKTtcclxuXHJcbiAgaWYgKGNhbGN1bGF0ZWRWYWx1ZSA8IDApIHtcclxuICAgIGNvbnN0IGFic1ZhbHVlID0gTWF0aC5hYnMoY2FsY3VsYXRlZFZhbHVlKTtcclxuICAgIGlmIChkaXNwbGF5TmVnYXRpdmVOdW1iZXJXaXRoUGFyZW50aGVzZXMpIHtcclxuICAgICAgaWYgKCFpc05hTihtaW5EZWNpbWFsKSB8fCAhaXNOYU4obWF4RGVjaW1hbCkpIHtcclxuICAgICAgICByZXR1cm4gYCgke3N5bWJvbFByZWZpeH0ke2RlY2ltYWxGb3JtYXR0ZWQoYWJzVmFsdWUsIG1pbkRlY2ltYWwsIG1heERlY2ltYWwpfSR7c3ltYm9sU3VmZml4fSlgO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBgKCR7c3ltYm9sUHJlZml4fSR7YWJzVmFsdWV9JHtzeW1ib2xTdWZmaXh9KWA7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoIWlzTmFOKG1pbkRlY2ltYWwpIHx8ICFpc05hTihtYXhEZWNpbWFsKSkge1xyXG4gICAgICAgIHJldHVybiBgLSR7c3ltYm9sUHJlZml4fSR7ZGVjaW1hbEZvcm1hdHRlZChhYnNWYWx1ZSwgbWluRGVjaW1hbCwgbWF4RGVjaW1hbCl9JHtzeW1ib2xTdWZmaXh9YDtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gYC0ke3N5bWJvbFByZWZpeH0ke2Fic1ZhbHVlfSR7c3ltYm9sU3VmZml4fWA7XHJcbiAgICB9XHJcbiAgfSBlbHNlIHtcclxuICAgIGlmICghaXNOYU4obWluRGVjaW1hbCkgfHwgIWlzTmFOKG1heERlY2ltYWwpKSB7XHJcbiAgICAgIHJldHVybiBgJHtzeW1ib2xQcmVmaXh9JHtkZWNpbWFsRm9ybWF0dGVkKGlucHV0LCBtaW5EZWNpbWFsLCBtYXhEZWNpbWFsKX0ke3N5bWJvbFN1ZmZpeH1gO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGAke3N5bWJvbFByZWZpeH0ke2lucHV0fSR7c3ltYm9sU3VmZml4fWA7XHJcbiAgfVxyXG59XHJcblxyXG4vKiogRnJvbSBhIGRvdCAoLikgbm90YXRpb24gZmluZCBhbmQgcmV0dXJuIGEgcHJvcGVydHkgd2l0aGluIGFuIG9iamVjdCBnaXZlbiBhIHBhdGggKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldERlc2NlbmRhbnRQcm9wZXJ0eShvYmo6IGFueSwgcGF0aDogc3RyaW5nKTogYW55IHtcclxuICByZXR1cm4gcGF0aC5zcGxpdCgnLicpLnJlZHVjZSgoYWNjLCBwYXJ0KSA9PiBhY2MgJiYgYWNjW3BhcnRdLCBvYmopO1xyXG59XHJcblxyXG4vKiogR2V0IHRoZSBicm93c2VyJ3Mgc2Nyb2xsYmFyIHdpZHRoLCB0aGlzIGlzIGRpZmZlcmVudCB0byBlYWNoIGJyb3dzZXIgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFNjcm9sbEJhcldpZHRoKCk6IG51bWJlciB7XHJcbiAgY29uc3QgJG91dGVyID0gJCgnPGRpdj4nKS5jc3MoeyB2aXNpYmlsaXR5OiAnaGlkZGVuJywgd2lkdGg6IDEwMCwgb3ZlcmZsb3c6ICdzY3JvbGwnIH0pLmFwcGVuZFRvKCdib2R5Jyk7XHJcbiAgY29uc3Qgd2lkdGhXaXRoU2Nyb2xsID0gJCgnPGRpdj4nKS5jc3MoeyB3aWR0aDogJzEwMCUnIH0pLmFwcGVuZFRvKCRvdXRlcikub3V0ZXJXaWR0aCgpO1xyXG4gICRvdXRlci5yZW1vdmUoKTtcclxuICByZXR1cm4gTWF0aC5jZWlsKDEwMCAtIHdpZHRoV2l0aFNjcm9sbCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBGcm9tIGEgRGF0ZSBGaWVsZFR5cGUsIHJldHVybiBpdCdzIGVxdWl2YWxlbnQgbW9tZW50LmpzIGZvcm1hdFxyXG4gKiByZWZlciB0byBtb21lbnQuanMgZm9yIHRoZSBmb3JtYXQgc3RhbmRhcmQgdXNlZDogaHR0cHM6Ly9tb21lbnRqcy5jb20vZG9jcy8jL3BhcnNpbmcvc3RyaW5nLWZvcm1hdC9cclxuICogQHBhcmFtIGZpZWxkVHlwZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIG1hcE1vbWVudERhdGVGb3JtYXRXaXRoRmllbGRUeXBlKGZpZWxkVHlwZTogRmllbGRUeXBlKTogc3RyaW5nIHtcclxuICBsZXQgbWFwOiBzdHJpbmc7XHJcbiAgc3dpdGNoIChmaWVsZFR5cGUpIHtcclxuICAgIGNhc2UgRmllbGRUeXBlLmRhdGVUaW1lOlxyXG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZVRpbWVJc286XHJcbiAgICAgIG1hcCA9ICdZWVlZLU1NLUREIEhIOm1tOnNzJztcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlVGltZVNob3J0SXNvOlxyXG4gICAgICBtYXAgPSAnWVlZWS1NTS1ERCBISDptbSc7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZVRpbWVJc29BbVBtOlxyXG4gICAgICBtYXAgPSAnWVlZWS1NTS1ERCBoaDptbTpzcyBhJztcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlVGltZUlzb0FNX1BNOlxyXG4gICAgICBtYXAgPSAnWVlZWS1NTS1ERCBoaDptbTpzcyBBJztcclxuICAgICAgYnJlYWs7XHJcbiAgICAvLyBhbGwgRXVybyBGb3JtYXRzIChkYXRlL21vbnRoL3llYXIpXHJcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlRXVybzpcclxuICAgICAgbWFwID0gJ0REL01NL1lZWVknO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgRmllbGRUeXBlLmRhdGVFdXJvU2hvcnQ6XHJcbiAgICAgIG1hcCA9ICdEL00vWVknO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgRmllbGRUeXBlLmRhdGVUaW1lRXVybzpcclxuICAgICAgbWFwID0gJ0REL01NL1lZWVkgSEg6bW06c3MnO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgRmllbGRUeXBlLmRhdGVUaW1lU2hvcnRFdXJvOlxyXG4gICAgICBtYXAgPSAnREQvTU0vWVlZWSBISDptbSc7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZVRpbWVFdXJvQW1QbTpcclxuICAgICAgbWFwID0gJ0REL01NL1lZWVkgaGg6bW06c3MgYSc7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZVRpbWVFdXJvQU1fUE06XHJcbiAgICAgIG1hcCA9ICdERC9NTS9ZWVlZIGhoOm1tOnNzIEEnO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgRmllbGRUeXBlLmRhdGVUaW1lRXVyb1Nob3J0OlxyXG4gICAgICBtYXAgPSAnRC9NL1lZIEg6bTpzJztcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlVGltZUV1cm9TaG9ydEFtUG06XHJcbiAgICAgIG1hcCA9ICdEL00vWVkgaDptOnMgYSc7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgLy8gYWxsIFVTIEZvcm1hdHMgKG1vbnRoL2RhdGUveWVhcilcclxuICAgIGNhc2UgRmllbGRUeXBlLmRhdGVVczpcclxuICAgICAgbWFwID0gJ01NL0REL1lZWVknO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgRmllbGRUeXBlLmRhdGVVc1Nob3J0OlxyXG4gICAgICBtYXAgPSAnTS9EL1lZJztcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlVGltZVVzOlxyXG4gICAgICBtYXAgPSAnTU0vREQvWVlZWSBISDptbTpzcyc7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZVRpbWVTaG9ydFVzOlxyXG4gICAgICBtYXAgPSAnTU0vREQvWVlZWSBISDptbSc7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZVRpbWVVc0FtUG06XHJcbiAgICAgIG1hcCA9ICdNTS9ERC9ZWVlZIGhoOm1tOnNzIGEnO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgRmllbGRUeXBlLmRhdGVUaW1lVXNBTV9QTTpcclxuICAgICAgbWFwID0gJ01NL0REL1lZWVkgaGg6bW06c3MgQSc7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZVRpbWVVc1Nob3J0OlxyXG4gICAgICBtYXAgPSAnTS9EL1lZIEg6bTpzJztcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlVGltZVVzU2hvcnRBbVBtOlxyXG4gICAgICBtYXAgPSAnTS9EL1lZIGg6bTpzIGEnO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgRmllbGRUeXBlLmRhdGVVdGM6XHJcbiAgICAgIG1hcCA9ICdZWVlZLU1NLUREVEhIOm1tOnNzLlNTU1onO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgRmllbGRUeXBlLmRhdGU6XHJcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlSXNvOlxyXG4gICAgZGVmYXVsdDpcclxuICAgICAgbWFwID0gJ1lZWVktTU0tREQnO1xyXG4gICAgICBicmVhaztcclxuICB9XHJcbiAgcmV0dXJuIG1hcDtcclxufVxyXG5cclxuLyoqXHJcbiAqIEZyb20gYSBEYXRlIEZpZWxkVHlwZSwgcmV0dXJuIGl0J3MgZXF1aXZhbGVudCBGbGF0cGlja3IgZm9ybWF0XHJcbiAqIHJlZmVyIHRvIEZsYXRwaWNrciBmb3IgdGhlIGZvcm1hdCBzdGFuZGFyZCB1c2VkOiBodHRwczovL2NobWxuLmdpdGh1Yi5pby9mbGF0cGlja3IvZm9ybWF0dGluZy8jZGF0ZS1mb3JtYXR0aW5nLXRva2Vuc1xyXG4gKiBhbHNvIG5vdGUgdGhhdCB0aGV5IHNlZW0gdmVyeSBzaW1pbGFyIHRvIFBIUCBmb3JtYXQgKGV4Y2VwdCBmb3IgYW0vcG0pOiBodHRwOi8vcGhwLm5ldC9tYW51YWwvZW4vZnVuY3Rpb24uZGF0ZS5waHBcclxuICogQHBhcmFtIGZpZWxkVHlwZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIG1hcEZsYXRwaWNrckRhdGVGb3JtYXRXaXRoRmllbGRUeXBlKGZpZWxkVHlwZTogRmllbGRUeXBlKTogc3RyaW5nIHtcclxuICAvKlxyXG4gICAgZDogRGF5IG9mIHRoZSBtb250aCwgMiBkaWdpdHMgd2l0aCBsZWFkaW5nIHplcm9zXHQwMSB0byAzMVxyXG4gICAgRDogQSB0ZXh0dWFsIHJlcHJlc2VudGF0aW9uIG9mIGEgZGF5XHRNb24gdGhyb3VnaCBTdW5cclxuICAgIGw6IChsb3dlcmNhc2UgJ0wnKVx0QSBmdWxsIHRleHR1YWwgcmVwcmVzZW50YXRpb24gb2YgdGhlIGRheSBvZiB0aGUgd2Vla1x0U3VuZGF5IHRocm91Z2ggU2F0dXJkYXlcclxuICAgIGo6IERheSBvZiB0aGUgbW9udGggd2l0aG91dCBsZWFkaW5nIHplcm9zXHQxIHRvIDMxXHJcbiAgICBKOiBEYXkgb2YgdGhlIG1vbnRoIHdpdGhvdXQgbGVhZGluZyB6ZXJvcyBhbmQgb3JkaW5hbCBzdWZmaXhcdDFzdCwgMm5kLCB0byAzMXN0XHJcbiAgICB3OiBOdW1lcmljIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBkYXkgb2YgdGhlIHdlZWtcdDAgKGZvciBTdW5kYXkpIHRocm91Z2ggNiAoZm9yIFNhdHVyZGF5KVxyXG4gICAgRjogQSBmdWxsIHRleHR1YWwgcmVwcmVzZW50YXRpb24gb2YgYSBtb250aFx0SmFudWFyeSB0aHJvdWdoIERlY2VtYmVyXHJcbiAgICBtOiBOdW1lcmljIHJlcHJlc2VudGF0aW9uIG9mIGEgbW9udGgsIHdpdGggbGVhZGluZyB6ZXJvXHQwMSB0aHJvdWdoIDEyXHJcbiAgICBuOiBOdW1lcmljIHJlcHJlc2VudGF0aW9uIG9mIGEgbW9udGgsIHdpdGhvdXQgbGVhZGluZyB6ZXJvc1x0MSB0aHJvdWdoIDEyXHJcbiAgICBNOiBBIHNob3J0IHRleHR1YWwgcmVwcmVzZW50YXRpb24gb2YgYSBtb250aFx0SmFuIHRocm91Z2ggRGVjXHJcbiAgICBVOiBUaGUgbnVtYmVyIG9mIHNlY29uZHMgc2luY2UgdGhlIFVuaXggRXBvY2hcdDE0MTM3MDQ5OTNcclxuICAgIHk6IEEgdHdvIGRpZ2l0IHJlcHJlc2VudGF0aW9uIG9mIGEgeWVhclx0OTkgb3IgMDNcclxuICAgIFk6IEEgZnVsbCBudW1lcmljIHJlcHJlc2VudGF0aW9uIG9mIGEgeWVhciwgNCBkaWdpdHNcdDE5OTkgb3IgMjAwM1xyXG4gICAgSDogSG91cnMgKDI0IGhvdXJzKVx0MDAgdG8gMjNcclxuICAgIGg6IEhvdXJzXHQxIHRvIDEyXHJcbiAgICBpOiBNaW51dGVzXHQwMCB0byA1OVxyXG4gICAgUzogU2Vjb25kcywgMiBkaWdpdHNcdDAwIHRvIDU5XHJcbiAgICBzOiBTZWNvbmRzXHQwLCAxIHRvIDU5XHJcbiAgICBLOiBBTS9QTVx0QU0gb3IgUE1cclxuICAqL1xyXG4gIGxldCBtYXA6IHN0cmluZztcclxuICBzd2l0Y2ggKGZpZWxkVHlwZSkge1xyXG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZVRpbWU6XHJcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlVGltZUlzbzpcclxuICAgICAgbWFwID0gJ1ktbS1kIEg6aTpTJztcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlVGltZVNob3J0SXNvOlxyXG4gICAgICBtYXAgPSAnWS1tLWQgSDppJztcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlVGltZUlzb0FtUG06XHJcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlVGltZUlzb0FNX1BNOlxyXG4gICAgICBtYXAgPSAnWS1tLWQgaDppOlMgSyc7IC8vIHRoZXJlIGlzIG5vIGxvd2VyY2FzZSBpbiBGbGF0cGlja3IgOihcclxuICAgICAgYnJlYWs7XHJcbiAgICAvLyBhbGwgRXVybyBGb3JtYXRzIChkYXRlL21vbnRoL3llYXIpXHJcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlRXVybzpcclxuICAgICAgbWFwID0gJ2QvbS9ZJztcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlRXVyb1Nob3J0OlxyXG4gICAgICBtYXAgPSAnZC9tL3knO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgRmllbGRUeXBlLmRhdGVUaW1lRXVybzpcclxuICAgICAgbWFwID0gJ2QvbS9ZIEg6aTpTJztcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlVGltZVNob3J0RXVybzpcclxuICAgICAgbWFwID0gJ2QvbS95IEg6aSc7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZVRpbWVFdXJvQW1QbTpcclxuICAgICAgbWFwID0gJ2QvbS9ZIGg6aTpTIEsnOyAvLyB0aGVyZSBpcyBubyBsb3dlcmNhc2UgaW4gRmxhdHBpY2tyIDooXHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZVRpbWVFdXJvQU1fUE06XHJcbiAgICAgIG1hcCA9ICdkL20vWSBoOmk6cyBLJztcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlVGltZUV1cm9TaG9ydDpcclxuICAgICAgbWFwID0gJ2QvbS95IEg6aTpzJztcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlVGltZUV1cm9TaG9ydEFtUG06XHJcbiAgICAgIG1hcCA9ICdkL20veSBoOmk6cyBLJzsgLy8gdGhlcmUgaXMgbm8gbG93ZXJjYXNlIGluIEZsYXRwaWNrciA6KFxyXG4gICAgICBicmVhaztcclxuICAgIC8vIGFsbCBVUyBGb3JtYXRzIChtb250aC9kYXRlL3llYXIpXHJcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlVXM6XHJcbiAgICAgIG1hcCA9ICdtL2QvWSc7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZVVzU2hvcnQ6XHJcbiAgICAgIG1hcCA9ICdtL2QveSc7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZVRpbWVVczpcclxuICAgICAgbWFwID0gJ20vZC9ZIEg6aTpTJztcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlVGltZVNob3J0VXM6XHJcbiAgICAgIG1hcCA9ICdtL2QveSBIOmknO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgRmllbGRUeXBlLmRhdGVUaW1lVXNBbVBtOlxyXG4gICAgICBtYXAgPSAnbS9kL1kgaDppOlMgSyc7IC8vIHRoZXJlIGlzIG5vIGxvd2VyY2FzZSBpbiBGbGF0cGlja3IgOihcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlVGltZVVzQU1fUE06XHJcbiAgICAgIG1hcCA9ICdtL2QvWSBoOmk6cyBLJztcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlVGltZVVzU2hvcnQ6XHJcbiAgICAgIG1hcCA9ICdtL2QveSBIOmk6cyc7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZVRpbWVVc1Nob3J0QW1QbTpcclxuICAgICAgbWFwID0gJ20vZC95IGg6aTpzIEsnOyAvLyB0aGVyZSBpcyBubyBsb3dlcmNhc2UgaW4gRmxhdHBpY2tyIDooXHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZVV0YzpcclxuICAgICAgbWFwID0gJ1onO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgRmllbGRUeXBlLmRhdGU6XHJcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlSXNvOlxyXG4gICAgZGVmYXVsdDpcclxuICAgICAgbWFwID0gJ1ktbS1kJztcclxuICAgICAgYnJlYWs7XHJcbiAgfVxyXG4gIHJldHVybiBtYXA7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBNYXBwZXIgZm9yIHF1ZXJ5IG9wZXJhdG9ycyAoZXguOiA8PSBpcyBcImxlXCIsID4gaXMgXCJndFwiKVxyXG4gKiBAcGFyYW0gc3RyaW5nIG9wZXJhdG9yXHJcbiAqIEByZXR1cm5zIHN0cmluZyBtYXBcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBtYXBPcGVyYXRvclR5cGUob3BlcmF0b3I6IHN0cmluZyk6IE9wZXJhdG9yVHlwZSB7XHJcbiAgbGV0IG1hcDogT3BlcmF0b3JUeXBlO1xyXG5cclxuICBzd2l0Y2ggKG9wZXJhdG9yKSB7XHJcbiAgICBjYXNlICc8JzpcclxuICAgICAgbWFwID0gT3BlcmF0b3JUeXBlLmxlc3NUaGFuO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgJzw9JzpcclxuICAgICAgbWFwID0gT3BlcmF0b3JUeXBlLmxlc3NUaGFuT3JFcXVhbDtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlICc+JzpcclxuICAgICAgbWFwID0gT3BlcmF0b3JUeXBlLmdyZWF0ZXJUaGFuO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgJz49JzpcclxuICAgICAgbWFwID0gT3BlcmF0b3JUeXBlLmdyZWF0ZXJUaGFuT3JFcXVhbDtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlICc8Pic6XHJcbiAgICBjYXNlICchPSc6XHJcbiAgICBjYXNlICduZXEnOlxyXG4gICAgY2FzZSAnTkVRJzpcclxuICAgICAgbWFwID0gT3BlcmF0b3JUeXBlLm5vdEVxdWFsO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgJyonOlxyXG4gICAgY2FzZSAnLionOlxyXG4gICAgY2FzZSAnc3RhcnRzV2l0aCc6XHJcbiAgICAgIG1hcCA9IE9wZXJhdG9yVHlwZS5zdGFydHNXaXRoO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgJyouJzpcclxuICAgIGNhc2UgJ2VuZHNXaXRoJzpcclxuICAgICAgbWFwID0gT3BlcmF0b3JUeXBlLmVuZHNXaXRoO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgJz0nOlxyXG4gICAgY2FzZSAnPT0nOlxyXG4gICAgY2FzZSAnZXEnOlxyXG4gICAgY2FzZSAnRVEnOlxyXG4gICAgICBtYXAgPSBPcGVyYXRvclR5cGUuZXF1YWw7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAnaW4nOlxyXG4gICAgY2FzZSAnSU4nOlxyXG4gICAgICBtYXAgPSBPcGVyYXRvclR5cGUuaW47XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAnbm90SW4nOlxyXG4gICAgY2FzZSAnTklOJzpcclxuICAgIGNhc2UgJ05PVF9JTic6XHJcbiAgICAgIG1hcCA9IE9wZXJhdG9yVHlwZS5ub3RJbjtcclxuICAgICAgYnJlYWs7XHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICBtYXAgPSBPcGVyYXRvclR5cGUuY29udGFpbnM7XHJcbiAgICAgIGJyZWFrO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIG1hcDtcclxufVxyXG5cclxuLyoqXHJcbiAqIE1hcHBlciBmb3IgcXVlcnkgb3BlcmF0b3IgYnkgYSBGaWx0ZXIgVHlwZVxyXG4gKiBGb3IgZXhhbXBsZSBhIG11bHRpcGxlLXNlbGVjdCB0eXBpY2FsbHkgdXNlcyAnSU4nIG9wZXJhdG9yXHJcbiAqIEBwYXJhbSBvcGVyYXRvclxyXG4gKiBAcmV0dXJucyBzdHJpbmcgbWFwXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gbWFwT3BlcmF0b3JCeUZpZWxkVHlwZShmaWVsZFR5cGU6IEZpZWxkVHlwZSB8IHN0cmluZyk6IE9wZXJhdG9yVHlwZSB7XHJcbiAgbGV0IG1hcDogT3BlcmF0b3JUeXBlO1xyXG5cclxuICBzd2l0Y2ggKGZpZWxkVHlwZSkge1xyXG4gICAgY2FzZSBGaWVsZFR5cGUuc3RyaW5nOlxyXG4gICAgY2FzZSBGaWVsZFR5cGUudW5rbm93bjpcclxuICAgICAgbWFwID0gT3BlcmF0b3JUeXBlLmNvbnRhaW5zO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgRmllbGRUeXBlLmZsb2F0OlxyXG4gICAgY2FzZSBGaWVsZFR5cGUubnVtYmVyOlxyXG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZTpcclxuICAgIGNhc2UgRmllbGRUeXBlLmRhdGVJc286XHJcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlOlxyXG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZVV0YzpcclxuICAgIGNhc2UgRmllbGRUeXBlLmRhdGVUaW1lOlxyXG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZVRpbWVJc286XHJcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlVGltZUlzb0FtUG06XHJcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlVGltZUlzb0FNX1BNOlxyXG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZUV1cm86XHJcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlRXVyb1Nob3J0OlxyXG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZVRpbWVFdXJvOlxyXG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZVRpbWVFdXJvQW1QbTpcclxuICAgIGNhc2UgRmllbGRUeXBlLmRhdGVUaW1lRXVyb0FNX1BNOlxyXG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZVRpbWVFdXJvU2hvcnQ6XHJcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlVGltZUV1cm9TaG9ydEFtUG06XHJcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlVGltZUV1cm9TaG9ydEFNX1BNOlxyXG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZVVzOlxyXG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZVVzU2hvcnQ6XHJcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlVGltZVVzOlxyXG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZVRpbWVVc0FtUG06XHJcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlVGltZVVzQU1fUE06XHJcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlVGltZVVzU2hvcnQ6XHJcbiAgICBjYXNlIEZpZWxkVHlwZS5kYXRlVGltZVVzU2hvcnRBbVBtOlxyXG4gICAgY2FzZSBGaWVsZFR5cGUuZGF0ZVRpbWVVc1Nob3J0QU1fUE06XHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICBtYXAgPSBPcGVyYXRvclR5cGUuZXF1YWw7XHJcbiAgICAgIGJyZWFrO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIG1hcDtcclxufVxyXG5cclxuLyoqIFBhcnNlIGFueSBpbnB1dCAoYm9vbCwgbnVtYmVyLCBzdHJpbmcpIGFuZCByZXR1cm4gYSBib29sZWFuIG9yIEZhbHNlIHdoZW4gbm90IHBvc3NpYmxlICovXHJcbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUJvb2xlYW4oaW5wdXQ6IGJvb2xlYW4gfCBudW1iZXIgfCBzdHJpbmcpOiBib29sZWFuIHtcclxuICByZXR1cm4gLyh0cnVlfDEpL2kudGVzdChpbnB1dCArICcnKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFBhcnNlIGEgZGF0ZSBwYXNzZWQgYXMgYSBzdHJpbmcgKERhdGUgb25seSwgd2l0aG91dCB0aW1lKSBhbmQgcmV0dXJuIGEgRGF0ZSBvYmplY3QgKGlmIHZhbGlkKVxyXG4gKiBAcGFyYW0gaW5wdXREYXRlU3RyaW5nXHJcbiAqIEByZXR1cm5zIHN0cmluZyBkYXRlIGZvcm1hdHRlZFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlVXRjRGF0ZShpbnB1dERhdGVTdHJpbmc6IHN0cmluZywgdXNlVXRjPzogYm9vbGVhbik6IHN0cmluZyB8IG51bGwge1xyXG4gIGxldCBkYXRlID0gbnVsbDtcclxuXHJcbiAgaWYgKC9eWzAtOVxcLVxcL10qJC8udGVzdChpbnB1dERhdGVTdHJpbmcpKSB7XHJcbiAgICAvLyBnZXQgdGhlIFVUQyBkYXRldGltZSB3aXRoIG1vbWVudC5qcyBidXQgd2UgbmVlZCB0byBkZWNvZGUgdGhlIHZhbHVlIHNvIHRoYXQgaXQncyB2YWxpZCB0ZXh0XHJcbiAgICBjb25zdCBkYXRlU3RyaW5nID0gZGVjb2RlVVJJQ29tcG9uZW50KGlucHV0RGF0ZVN0cmluZyk7XHJcbiAgICBjb25zdCBkYXRlTW9tZW50ID0gbW9tZW50KG5ldyBEYXRlKGRhdGVTdHJpbmcpKTtcclxuICAgIGlmIChkYXRlTW9tZW50LmlzVmFsaWQoKSAmJiBkYXRlTW9tZW50LnllYXIoKS50b1N0cmluZygpLmxlbmd0aCA9PT0gNCkge1xyXG4gICAgICBkYXRlID0gKHVzZVV0YykgPyBkYXRlTW9tZW50LnV0YygpLmZvcm1hdCgpIDogZGF0ZU1vbWVudC5mb3JtYXQoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiBkYXRlO1xyXG59XHJcblxyXG4vKipcclxuICogU2FuaXRpemUsIHJldHVybiBvbmx5IHRoZSB0ZXh0IHdpdGhvdXQgSFRNTCB0YWdzXHJcbiAqIEBpbnB1dCBodG1sU3RyaW5nXHJcbiAqIEByZXR1cm4gdGV4dFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNhbml0aXplSHRtbFRvVGV4dChodG1sU3RyaW5nOiBzdHJpbmcpIHtcclxuICBjb25zdCB0ZW1wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgdGVtcC5pbm5lckhUTUwgPSBodG1sU3RyaW5nO1xyXG4gIHJldHVybiB0ZW1wLnRleHRDb250ZW50IHx8IHRlbXAuaW5uZXJUZXh0IHx8ICcnO1xyXG59XHJcblxyXG4vKipcclxuICogVGl0bGUgY2FzZSAob3IgY2FwaXRhbGl6ZSkgZmlyc3QgY2hhciBvZiBhIHN0cmluZ1xyXG4gKiBPcHRpb25hbGwgdGl0bGUgY2FzZSB0aGUgY29tcGxldGUgc2VudGVuY2UgKHVwcGVyIGNhc2UgZmlyc3QgY2hhciBvZiBlYWNoIHdvcmQgd2hpbGUgY2hhbmdpbmcgZXZlcnl0aGluZyBlbHNlIHRvIGxvd2VyIGNhc2UpXHJcbiAqIEBwYXJhbSBpbnB1dFN0clxyXG4gKiBAcmV0dXJucyBzdHJpbmdcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiB0aXRsZUNhc2UoaW5wdXRTdHI6IHN0cmluZywgY2FzZUV2ZXJ5V29yZHMgPSBmYWxzZSk6IHN0cmluZyB7XHJcbiAgaWYgKHR5cGVvZiBpbnB1dFN0ciA9PT0gJ3N0cmluZycpIHtcclxuICAgIGlmIChjYXNlRXZlcnlXb3Jkcykge1xyXG4gICAgICByZXR1cm4gaW5wdXRTdHIucmVwbGFjZSgvXFx3XFxTKi9nLCAob3V0cHV0U3RyKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIG91dHB1dFN0ci5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIG91dHB1dFN0ci5zdWJzdHIoMSkudG9Mb3dlckNhc2UoKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gaW5wdXRTdHIuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBpbnB1dFN0ci5zbGljZSgxKTtcclxuICB9XHJcbiAgcmV0dXJuIGlucHV0U3RyO1xyXG59XHJcblxyXG4vKipcclxuICogQ29udmVydHMgYSBzdHJpbmcgdG8gY2FtZWwgY2FzZSAoY2FtZWxDYXNlKVxyXG4gKiBAcGFyYW0gaW5wdXRTdHIgdGhlIHN0cmluZyB0byBjb252ZXJ0XHJcbiAqIEByZXR1cm4gdGhlIHN0cmluZyBpbiBjYW1lbCBjYXNlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gdG9DYW1lbENhc2UoaW5wdXRTdHI6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgaWYgKHR5cGVvZiBpbnB1dFN0ciA9PT0gJ3N0cmluZycpIHtcclxuICAgIHJldHVybiBpbnB1dFN0ci5yZXBsYWNlKC8oPzpeXFx3fFtBLVpdfFxcYlxcd3xbXFxzK1xcLV9cXC9dKS9nLCAobWF0Y2g6IHN0cmluZywgb2Zmc2V0OiBudW1iZXIpID0+IHtcclxuICAgICAgLy8gcmVtb3ZlIHdoaXRlIHNwYWNlIG9yIGh5cGVucyBvciB1bmRlcnNjb3Jlc1xyXG4gICAgICBpZiAoL1tcXHMrXFwtX1xcL10vLnRlc3QobWF0Y2gpKSB7XHJcbiAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gb2Zmc2V0ID09PSAwID8gbWF0Y2gudG9Mb3dlckNhc2UoKSA6IG1hdGNoLnRvVXBwZXJDYXNlKCk7XHJcbiAgICB9KTtcclxuICB9XHJcbiAgcmV0dXJuIGlucHV0U3RyO1xyXG59XHJcblxyXG4vKipcclxuICogQ29udmVydHMgYSBzdHJpbmcgdG8ga2ViYWIgKGh5cGVuKSBjYXNlXHJcbiAqIEBwYXJhbSBzdHIgdGhlIHN0cmluZyB0byBjb252ZXJ0XHJcbiAqIEByZXR1cm4gdGhlIHN0cmluZyBpbiBrZWJhYiBjYXNlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gdG9LZWJhYkNhc2UoaW5wdXRTdHI6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgaWYgKHR5cGVvZiBpbnB1dFN0ciA9PT0gJ3N0cmluZycpIHtcclxuICAgIHJldHVybiB0b0NhbWVsQ2FzZShpbnB1dFN0cikucmVwbGFjZSgvKFtBLVpdKS9nLCAnLSQxJykudG9Mb3dlckNhc2UoKTtcclxuICB9XHJcbiAgcmV0dXJuIGlucHV0U3RyO1xyXG59XHJcblxyXG4vKipcclxuICogQ29udmVydHMgYSBzdHJpbmcgZnJvbSBjYW1lbENhc2UgdG8gc25ha2VfY2FzZSAodW5kZXJzY29yZSkgY2FzZVxyXG4gKiBAcGFyYW0gc3RyIHRoZSBzdHJpbmcgdG8gY29udmVydFxyXG4gKiBAcmV0dXJuIHRoZSBzdHJpbmcgaW4ga2ViYWIgY2FzZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHRvU25ha2VDYXNlKGlucHV0U3RyOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gIGlmICh0eXBlb2YgaW5wdXRTdHIgPT09ICdzdHJpbmcnKSB7XHJcbiAgICByZXR1cm4gdG9DYW1lbENhc2UoaW5wdXRTdHIpLnJlcGxhY2UoLyhbQS1aXSkvZywgJ18kMScpLnRvTG93ZXJDYXNlKCk7XHJcbiAgfVxyXG4gIHJldHVybiBpbnB1dFN0cjtcclxufVxyXG5cclxuLyoqXHJcbiAqIFRha2VzIGFuIGlucHV0IGFycmF5IGFuZCBtYWtlcyBzdXJlIHRoZSBhcnJheSBoYXMgdW5pcXVlIHZhbHVlcyBieSByZW1vdmluZyBkdXBsaWNhdGVzXHJcbiAqIEBwYXJhbSBhcnJheSBpbnB1dCB3aXRoIHBvc3NpYmxlIGR1cGxpY2F0ZXNcclxuICogQHBhcmFtIG9iamVjdFByb3BlcnR5IG9wdGlvbmFsbHkgcHJvdmlkZSBhbiBvYmplY3QgcHJvcGVydHkgdG8gY29tcGFyZSAoZXhhbXBsZTogJ2lkJylcclxuICogQHJldHVybiBhcnJheSBvdXRwdXQgd2l0aG91dCBkdXBsaWNhdGVzXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gdW5pcXVlQXJyYXkoYXJyOiBhbnlbXSk6IGFueVtdIHtcclxuICBpZiAoQXJyYXkuaXNBcnJheShhcnIpICYmIGFyci5sZW5ndGggPiAwKSB7XHJcbiAgICByZXR1cm4gYXJyLmZpbHRlcigoaXRlbTogYW55LCBpbmRleDogbnVtYmVyKSA9PiB7XHJcbiAgICAgIHJldHVybiBhcnIuaW5kZXhPZihpdGVtKSA+PSBpbmRleDtcclxuICAgIH0pO1xyXG4gIH1cclxuICByZXR1cm4gYXJyO1xyXG59XHJcblxyXG4vKipcclxuICogVGFrZXMgYW4gaW5wdXQgYXJyYXkgb2Ygb2JqZWN0cyBhbmQgbWFrZXMgc3VyZSB0aGUgYXJyYXkgaGFzIHVuaXF1ZSBvYmplY3QgdmFsdWVzIGJ5IHJlbW92aW5nIGR1cGxpY2F0ZXNcclxuICogaXQgd2lsbCBsb29wIHRocm91Z2ggdGhlIGFycmF5IHVzaW5nIGEgcHJvcGVydHkgbmFtZSAob3IgXCJpZFwiIHdoZW4gaXMgbm90IHByb3ZpZGVkKSB0byBjb21wYXJlIHVuaXF1ZW5lc3NcclxuICogQHBhcmFtIGFycmF5IGlucHV0IHdpdGggcG9zc2libGUgZHVwbGljYXRlc1xyXG4gKiBAcGFyYW0gcHJvcGVydHlOYW1lIGRlZmF1bHRzIHRvIFwiaWRcIlxyXG4gKiBAcmV0dXJuIGFycmF5IG91dHB1dCB3aXRob3V0IGR1cGxpY2F0ZXNcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiB1bmlxdWVPYmplY3RBcnJheShhcnI6IGFueVtdLCBwcm9wZXJ0eU5hbWUgPSAnaWQnKTogYW55W10ge1xyXG4gIGlmIChBcnJheS5pc0FycmF5KGFycikgJiYgYXJyLmxlbmd0aCA+IDApIHtcclxuICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xyXG4gICAgY29uc3QgbWFwID0gbmV3IE1hcCgpO1xyXG5cclxuICAgIGZvciAoY29uc3QgaXRlbSBvZiBhcnIpIHtcclxuICAgICAgaWYgKCFtYXAuaGFzKGl0ZW1bcHJvcGVydHlOYW1lXSkpIHtcclxuICAgICAgICBtYXAuc2V0KGl0ZW1bcHJvcGVydHlOYW1lXSwgdHJ1ZSk7ICAgIC8vIHNldCBhbnkgdmFsdWUgdG8gTWFwXHJcbiAgICAgICAgcmVzdWx0LnB1c2goe1xyXG4gICAgICAgICAgaWQ6IGl0ZW1bcHJvcGVydHlOYW1lXSxcclxuICAgICAgICAgIG5hbWU6IGl0ZW0ubmFtZVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxuICByZXR1cm4gYXJyO1xyXG59XHJcblxyXG4vKipcclxuICogVW5zdWJzY3JpYmUgYWxsIE9ic2VydmFibGVzIFN1YnNjcmlwdGlvbnNcclxuICogSXQgd2lsbCByZXR1cm4gYW4gZW1wdHkgYXJyYXkgaWYgaXQgYWxsIHdlbnQgd2VsbFxyXG4gKiBAcGFyYW0gc3Vic2NyaXB0aW9uc1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHVuc3Vic2NyaWJlQWxsT2JzZXJ2YWJsZXMoc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10pOiBTdWJzY3JpcHRpb25bXSB7XHJcbiAgaWYgKEFycmF5LmlzQXJyYXkoc3Vic2NyaXB0aW9ucykpIHtcclxuICAgIHN1YnNjcmlwdGlvbnMuZm9yRWFjaCgoc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24pID0+IHtcclxuICAgICAgaWYgKHN1YnNjcmlwdGlvbiAmJiBzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUpIHtcclxuICAgICAgICBzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBzdWJzY3JpcHRpb25zID0gW107XHJcbiAgfVxyXG5cclxuICByZXR1cm4gc3Vic2NyaXB0aW9ucztcclxufVxyXG4iXX0=