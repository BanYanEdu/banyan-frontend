import { FieldType, OperatorType } from '../models/index';
import { Observable, Subscription } from 'rxjs';
/**
 * Add an item to an array only when the item does not exists, when the item is an object we will be using their "id" to compare
 * @param inputArray
 * @param inputItem
 */
export declare function addToArrayWhenNotExists(inputArray: any[], inputItem: any): void;
/**
 * Simple function to which will loop and create as demanded the number of white spaces,
 * this is used in the CSV export
 * @param int nbSpaces: number of white spaces to create
 */
export declare function addWhiteSpaces(nbSpaces: number): string;
/** HTML decode using jQuery with a <div>
 * Create a in-memory div, set it's inner text(which jQuery automatically encodes)
 * then grab the encoded contents back out.  The div never exists on the page.
*/
export declare function htmlDecode(encodedStr: string): string;
/** HTML encode using jQuery with a <div>
 * Create a in-memory div, set it's inner text(which jQuery automatically encodes)
 * then grab the encoded contents back out.  The div never exists on the page.
*/
export declare function htmlEncode(inputValue: string): string;
/** decode text into html entity
 * @param string text: input text
 * @param string text: output text
 */
export declare function htmlEntityDecode(input: string): string;
/** decode text into html entity
 * @param string text: input text
 * @param string text: output text
 */
export declare function htmlEntityEncode(input: any): string;
/**
 * Compares two arrays of characters to determine if all the items are equal
 * @param a first array
 * @param b second array to compare with a
 * @param [orderMatters=false] flag if the order matters, if not arrays will be sorted before comparison
 * @return boolean true if equal, else false
 */
export declare function charArraysEqual(a: any[], b: any[], orderMatters?: boolean): boolean;
/**
 * Try casting an input of type Promise | Observable into a Promise type.
 * @param object which could be of type Promise or Observable
 * @param fromServiceName string representing the caller service name and will be used if we throw a casting problem error
 */
export declare function castToPromise<T>(input: Promise<T> | Observable<T>, fromServiceName?: string): Promise<T>;
/**
 * Uses the logic function to find an item in an array or returns the default
 * value provided (empty object by default)
 * @param any[] array the array to filter
 * @param function logic the logic to find the item
 * @param any [defaultVal={}] the default value to return
 * @return object the found object or default value
 */
export declare function findOrDefault(array: any[], logic: (item: any) => boolean, defaultVal?: {}): any;
/**
  * Take a number (or a string) and display it as a formatted decimal string with defined minimum and maximum decimals
  * @param input
  * @param minDecimal
  * @param maxDecimal
  */
export declare function decimalFormatted(input: number | string, minDecimal?: number, maxDecimal?: number): string;
export declare function formatNumber(input: number | string, minDecimal?: number, maxDecimal?: number, displayNegativeNumberWithParentheses?: boolean, symbolPrefix?: string, symbolSuffix?: string): string;
/** From a dot (.) notation find and return a property within an object given a path */
export declare function getDescendantProperty(obj: any, path: string): any;
/** Get the browser's scrollbar width, this is different to each browser */
export declare function getScrollBarWidth(): number;
/**
 * From a Date FieldType, return it's equivalent moment.js format
 * refer to moment.js for the format standard used: https://momentjs.com/docs/#/parsing/string-format/
 * @param fieldType
 */
export declare function mapMomentDateFormatWithFieldType(fieldType: FieldType): string;
/**
 * From a Date FieldType, return it's equivalent Flatpickr format
 * refer to Flatpickr for the format standard used: https://chmln.github.io/flatpickr/formatting/#date-formatting-tokens
 * also note that they seem very similar to PHP format (except for am/pm): http://php.net/manual/en/function.date.php
 * @param fieldType
 */
export declare function mapFlatpickrDateFormatWithFieldType(fieldType: FieldType): string;
/**
 * Mapper for query operators (ex.: <= is "le", > is "gt")
 * @param string operator
 * @returns string map
 */
export declare function mapOperatorType(operator: string): OperatorType;
/**
 * Mapper for query operator by a Filter Type
 * For example a multiple-select typically uses 'IN' operator
 * @param operator
 * @returns string map
 */
export declare function mapOperatorByFieldType(fieldType: FieldType | string): OperatorType;
/** Parse any input (bool, number, string) and return a boolean or False when not possible */
export declare function parseBoolean(input: boolean | number | string): boolean;
/**
 * Parse a date passed as a string (Date only, without time) and return a Date object (if valid)
 * @param inputDateString
 * @returns string date formatted
 */
export declare function parseUtcDate(inputDateString: string, useUtc?: boolean): string | null;
/**
 * Sanitize, return only the text without HTML tags
 * @input htmlString
 * @return text
 */
export declare function sanitizeHtmlToText(htmlString: string): string;
/**
 * Title case (or capitalize) first char of a string
 * Optionall title case the complete sentence (upper case first char of each word while changing everything else to lower case)
 * @param inputStr
 * @returns string
 */
export declare function titleCase(inputStr: string, caseEveryWords?: boolean): string;
/**
 * Converts a string to camel case (camelCase)
 * @param inputStr the string to convert
 * @return the string in camel case
 */
export declare function toCamelCase(inputStr: string): string;
/**
 * Converts a string to kebab (hypen) case
 * @param str the string to convert
 * @return the string in kebab case
 */
export declare function toKebabCase(inputStr: string): string;
/**
 * Converts a string from camelCase to snake_case (underscore) case
 * @param str the string to convert
 * @return the string in kebab case
 */
export declare function toSnakeCase(inputStr: string): string;
/**
 * Takes an input array and makes sure the array has unique values by removing duplicates
 * @param array input with possible duplicates
 * @param objectProperty optionally provide an object property to compare (example: 'id')
 * @return array output without duplicates
 */
export declare function uniqueArray(arr: any[]): any[];
/**
 * Takes an input array of objects and makes sure the array has unique object values by removing duplicates
 * it will loop through the array using a property name (or "id" when is not provided) to compare uniqueness
 * @param array input with possible duplicates
 * @param propertyName defaults to "id"
 * @return array output without duplicates
 */
export declare function uniqueObjectArray(arr: any[], propertyName?: string): any[];
/**
 * Unsubscribe all Observables Subscriptions
 * It will return an empty array if it all went well
 * @param subscriptions
 */
export declare function unsubscribeAllObservables(subscriptions: Subscription[]): Subscription[];
