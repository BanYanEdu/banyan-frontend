import { FieldType } from '../models/index';
import { getAssociatedDateFormatter } from './formatterUtilities';
import { arrayObjectToCsvFormatter } from './arrayObjectToCsvFormatter';
import { arrayToCsvFormatter } from './arrayToCsvFormatter';
import { boldFormatter } from './boldFormatter';
import { checkboxFormatter } from './checkboxFormatter';
import { checkmarkFormatter } from './checkmarkFormatter';
import { collectionFormatter } from './collectionFormatter';
import { collectionEditorFormatter } from './collectionEditorFormatter';
import { complexObjectFormatter } from './complexObjectFormatter';
import { decimalFormatter } from './decimalFormatter';
import { deleteIconFormatter } from './deleteIconFormatter';
import { dollarColoredBoldFormatter } from './dollarColoredBoldFormatter';
import { dollarColoredFormatter } from './dollarColoredFormatter';
import { dollarFormatter } from './dollarFormatter';
import { editIconFormatter } from './editIconFormatter';
import { hyperlinkFormatter } from './hyperlinkFormatter';
import { iconFormatter } from './iconFormatter';
import { infoIconFormatter } from './infoIconFormatter';
import { italicFormatter } from './italicFormatter';
import { lowercaseFormatter } from './lowercaseFormatter';
import { maskFormatter } from './maskFormatter';
import { multipleFormatter } from './multipleFormatter';
import { percentFormatter } from './percentFormatter';
import { percentCompleteBarFormatter } from './percentCompleteBarFormatter';
import { percentCompleteFormatter } from './percentCompleteFormatter';
import { percentSymbolFormatter } from './percentSymbolFormatter';
import { progressBarFormatter } from './progressBarFormatter';
import { translateFormatter } from './translateFormatter';
import { translateBooleanFormatter } from './translateBooleanFormatter';
import { uppercaseFormatter } from './uppercaseFormatter';
import { yesNoFormatter } from './yesNoFormatter';
/** Provides a list of different Formatters that will change the cell value displayed in the UI */
export var Formatters = {
    /**
     * Takes an array of complex objects converts it to a comma delimited string.
     * Requires to pass an array of "propertyNames" in the column definition the generic "params" property
     * For example, if we have an array of user objects that have the property of firstName & lastName then we need to pass in your column definition::
     * { params: { propertyNames: ['firtName'] }}
     */
    arrayObjectToCsv: arrayObjectToCsvFormatter,
    /** Takes an array of string and converts it to a comma delimited string */
    arrayToCsv: arrayToCsvFormatter,
    /** show value in bold font weight */
    bold: boldFormatter,
    /** When value is filled (true), it will display a checkbox Unicode icon */
    checkbox: checkboxFormatter,
    /** When value is filled (true), it will display a Font-Awesome icon (fa-check) */
    checkmark: checkmarkFormatter,
    /**
     * Takes a complex data object and return the data under that property (for example: "user.firstName" will return the first name "John")
     * You can pass the complex structure in the "field" or the "params: { complexField: string }" properties.
     * For example::
     * this.columnDefs = [{ id: 'username', field: 'user.firstName', ... }]
     * OR this.columnDefs = [{ id: 'username', field: 'user', params: { complexField: 'user.firstName' }, ... }]
     */
    complexObject: complexObjectFormatter,
    /**
     * Looks up values from the columnDefinition.params.collection property and displays the label in CSV or string format
     * @example
     * // the grid will display 'foo' and 'bar' and not 1 and 2 from your dataset
     * { params: { collection: [{ value: 1, label: 'foo'}, {value: 2, label: 'bar' }] }}
     * const dataset = [1, 2];
     */
    collection: collectionFormatter,
    /**
     * Roughly the same as the "collectionFormatter" except that it
     * looks up values from the columnDefinition.editor.collection (instead of params) property and displays the label in CSV or string format
     * @example
     * // the grid will display 'foo' and 'bar' and not 1 and 2 from your dataset
     * { editor: { collection: [{ value: 1, label: 'foo'}, {value: 2, label: 'bar' }] }}
     * const dataset = [1, 2];
     */
    collectionEditor: collectionEditorFormatter,
    /** Takes a Date object and displays it as an ISO Date format (YYYY-MM-DD) */
    dateIso: getAssociatedDateFormatter(FieldType.dateIso, '-'),
    /** Takes a Date object and displays it as an ISO Date+Time format (YYYY-MM-DD HH:mm:ss) */
    dateTimeIso: getAssociatedDateFormatter(FieldType.dateTimeIso, '-'),
    /** Takes a Date object and displays it as an ISO Date+Time (without seconds) format (YYYY-MM-DD HH:mm) */
    dateTimeShortIso: getAssociatedDateFormatter(FieldType.dateTimeShortIso, '-'),
    /** Takes a Date object and displays it as an ISO Date+Time+(am/pm) format (YYYY-MM-DD h:mm:ss a) */
    dateTimeIsoAmPm: getAssociatedDateFormatter(FieldType.dateTimeIsoAmPm, '-'),
    /** Takes a Date object and displays it as an Euro Date format (DD/MM/YYYY) */
    dateEuro: getAssociatedDateFormatter(FieldType.dateEuro, '/'),
    /** Takes a Date object and displays it as an Euro Date+Time format (DD/MM/YYYY HH:mm:ss) */
    dateTimeEuro: getAssociatedDateFormatter(FieldType.dateTimeEuro, '/'),
    /** Takes a Date object and displays it as an Euro Date+Time (without seconds) format (DD/MM/YYYY HH:mm) */
    dateTimeShortEuro: getAssociatedDateFormatter(FieldType.dateTimeShortEuro, '/'),
    /** Takes a Date object and displays it as an Euro Date+Time+(am/pm) format (DD/MM/YYYY hh:mm:ss a) */
    dateTimeEuroAmPm: getAssociatedDateFormatter(FieldType.dateTimeEuroAmPm, '/'),
    /** Takes a Date object and displays it as an US Date format (MM/DD/YYYY) */
    dateUs: getAssociatedDateFormatter(FieldType.dateUs, '/'),
    /** Takes a Date object and displays it as an US Date+Time format (MM/DD/YYYY HH:mm:ss) */
    dateTimeUs: getAssociatedDateFormatter(FieldType.dateTimeUs, '/'),
    /** Takes a Date object and displays it as an US Date+Time (without seconds) format (MM/DD/YYYY HH:mm:ss) */
    dateTimeShortUs: getAssociatedDateFormatter(FieldType.dateTimeShortUs, '/'),
    /** Takes a Date object and displays it as an US Date+Time+(am/pm) format (MM/DD/YYYY hh:mm:ss a) */
    dateTimeUsAmPm: getAssociatedDateFormatter(FieldType.dateTimeUsAmPm, '/'),
    /** Displays a Font-Awesome delete icon (fa-trash) */
    deleteIcon: deleteIconFormatter,
    /**
     * Display the value as x decimals formatted, defaults to 2 decimals.
     * You can pass "decimalPlaces" or "minDecimalPlaces" and/or "maxDecimalPlaces" to the "params" property.
     * For example:: `{ formatter: Formatters.decimal, params: { decimalPlaces: 3 }}`
     * The property "decimalPlaces" is an alias of "minDecimalPlaces"
     */
    decimal: decimalFormatter,
    /** Display the value as 2 decimals formatted with dollar sign '$' at the end of of the value */
    dollar: dollarFormatter,
    /** Display the value as 2 decimals formatted with dollar sign '$' at the end of of the value, change color of text to red/green on negative/positive value */
    dollarColored: dollarColoredFormatter,
    /** Display the value as 2 decimals formatted with dollar sign '$' at the end of of the value, change color of text to red/green on negative/positive value, show it in bold font weight as well */
    dollarColoredBold: dollarColoredBoldFormatter,
    /** Displays a Font-Awesome edit icon (fa-pencil) */
    editIcon: editIconFormatter,
    /**
     * Takes an hyperlink cell value and transforms it into a real hyperlink, given that the value starts with 1 of these (http|ftp|https).
     * The structure will be "<a href="hyperlink">hyperlink</a>"
     * You can optionally change the hyperlink text displayed by using the generic params "hyperlinkText" in the column definition
     * For example: { id: 'link', field: 'link', params: { hyperlinkText: 'Company Website' } } will display "<a href="link">Company Website</a>"
     */
    hyperlink: hyperlinkFormatter,
    /** Display whichever icon you want (library agnostic, it could be Font-Awesome or any other) */
    icon: iconFormatter,
    /** Displays a Font-Awesome edit icon (fa-info-circle) */
    infoIcon: infoIconFormatter,
    /** show input text value as italic text */
    italic: italicFormatter,
    /** Takes a value and displays it all lowercase */
    lowercase: lowercaseFormatter,
    /**
     * Takes a value display it according to a mask provided
     * e.: 1234567890 with mask "(000) 000-0000" will display "(123) 456-7890"
     */
    mask: maskFormatter,
    /**
     * You can pipe multiple formatters (executed in sequence), use params to pass the list of formatters.
     * Requires to pass an array of "formatters" in the column definition the generic "params" property
     * For example::
     * { field: 'title', formatter: Formatters.multiple, params: { formatters: [ Formatters.lowercase, Formatters.uppercase ] }
     */
    multiple: multipleFormatter,
    /** Takes a cell value number (between 0.0-1.0) and displays a red (<50) or green (>=50) bar */
    percent: percentFormatter,
    /** Takes a cell value number (between 0.0-100) and displays a red (<50) or green (>=50) bar */
    percentComplete: percentCompleteFormatter,
    /** Takes a cell value number (between 0-100) and displays Bootstrap "percent-complete-bar" a red (<30), silver (>30 & <70) or green (>=70) bar */
    percentCompleteBar: percentCompleteBarFormatter,
    /** Takes a cell value number (between 0-100) and add the "%" after the number */
    percentSymbol: percentSymbolFormatter,
    /** Takes a cell value number (between 0-100) and displays Bootstrap "progress-bar" a red (<30), silver (>30 & <70) or green (>=70) bar */
    progressBar: progressBarFormatter,
    /** Takes a cell value and translates it (i18n). Requires an instance of the Translate Service:: `i18n: this.translate */
    translate: translateFormatter,
    /** Takes a boolean value, cast it to upperCase string and finally translates it (i18n). */
    translateBoolean: translateBooleanFormatter,
    /** Takes a value and displays it all uppercase */
    uppercase: uppercaseFormatter,
    /** Takes a boolean value and display a string 'Yes' or 'No' */
    yesNo: yesNoFormatter
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXNsaWNrZ3JpZC8iLCJzb3VyY2VzIjpbImFwcC9tb2R1bGVzL2FuZ3VsYXItc2xpY2tncmlkL2Zvcm1hdHRlcnMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzVDLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3hFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzVELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNoRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMxRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM1RCxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUN4RSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMxRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDcEQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1B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bnRlbnQiOlsiaW1wb3J0IHsgRmllbGRUeXBlIH0gZnJvbSAnLi4vbW9kZWxzL2luZGV4JztcbmltcG9ydCB7IGdldEFzc29jaWF0ZWREYXRlRm9ybWF0dGVyIH0gZnJvbSAnLi9mb3JtYXR0ZXJVdGlsaXRpZXMnO1xuaW1wb3J0IHsgYXJyYXlPYmplY3RUb0NzdkZvcm1hdHRlciB9IGZyb20gJy4vYXJyYXlPYmplY3RUb0NzdkZvcm1hdHRlcic7XG5pbXBvcnQgeyBhcnJheVRvQ3N2Rm9ybWF0dGVyIH0gZnJvbSAnLi9hcnJheVRvQ3N2Rm9ybWF0dGVyJztcbmltcG9ydCB7IGJvbGRGb3JtYXR0ZXIgfSBmcm9tICcuL2JvbGRGb3JtYXR0ZXInO1xuaW1wb3J0IHsgY2hlY2tib3hGb3JtYXR0ZXIgfSBmcm9tICcuL2NoZWNrYm94Rm9ybWF0dGVyJztcbmltcG9ydCB7IGNoZWNrbWFya0Zvcm1hdHRlciB9IGZyb20gJy4vY2hlY2ttYXJrRm9ybWF0dGVyJztcbmltcG9ydCB7IGNvbGxlY3Rpb25Gb3JtYXR0ZXIgfSBmcm9tICcuL2NvbGxlY3Rpb25Gb3JtYXR0ZXInO1xuaW1wb3J0IHsgY29sbGVjdGlvbkVkaXRvckZvcm1hdHRlciB9IGZyb20gJy4vY29sbGVjdGlvbkVkaXRvckZvcm1hdHRlcic7XG5pbXBvcnQgeyBjb21wbGV4T2JqZWN0Rm9ybWF0dGVyIH0gZnJvbSAnLi9jb21wbGV4T2JqZWN0Rm9ybWF0dGVyJztcbmltcG9ydCB7IGRlY2ltYWxGb3JtYXR0ZXIgfSBmcm9tICcuL2RlY2ltYWxGb3JtYXR0ZXInO1xuaW1wb3J0IHsgZGVsZXRlSWNvbkZvcm1hdHRlciB9IGZyb20gJy4vZGVsZXRlSWNvbkZvcm1hdHRlcic7XG5pbXBvcnQgeyBkb2xsYXJDb2xvcmVkQm9sZEZvcm1hdHRlciB9IGZyb20gJy4vZG9sbGFyQ29sb3JlZEJvbGRGb3JtYXR0ZXInO1xuaW1wb3J0IHsgZG9sbGFyQ29sb3JlZEZvcm1hdHRlciB9IGZyb20gJy4vZG9sbGFyQ29sb3JlZEZvcm1hdHRlcic7XG5pbXBvcnQgeyBkb2xsYXJGb3JtYXR0ZXIgfSBmcm9tICcuL2RvbGxhckZvcm1hdHRlcic7XG5pbXBvcnQgeyBlZGl0SWNvbkZvcm1hdHRlciB9IGZyb20gJy4vZWRpdEljb25Gb3JtYXR0ZXInO1xuaW1wb3J0IHsgaHlwZXJsaW5rRm9ybWF0dGVyIH0gZnJvbSAnLi9oeXBlcmxpbmtGb3JtYXR0ZXInO1xuaW1wb3J0IHsgaWNvbkZvcm1hdHRlciB9IGZyb20gJy4vaWNvbkZvcm1hdHRlcic7XG5pbXBvcnQgeyBpbmZvSWNvbkZvcm1hdHRlciB9IGZyb20gJy4vaW5mb0ljb25Gb3JtYXR0ZXInO1xuaW1wb3J0IHsgaXRhbGljRm9ybWF0dGVyIH0gZnJvbSAnLi9pdGFsaWNGb3JtYXR0ZXInO1xuaW1wb3J0IHsgbG93ZXJjYXNlRm9ybWF0dGVyIH0gZnJvbSAnLi9sb3dlcmNhc2VGb3JtYXR0ZXInO1xuaW1wb3J0IHsgbWFza0Zvcm1hdHRlciB9IGZyb20gJy4vbWFza0Zvcm1hdHRlcic7XG5pbXBvcnQgeyBtdWx0aXBsZUZvcm1hdHRlciB9IGZyb20gJy4vbXVsdGlwbGVGb3JtYXR0ZXInO1xuaW1wb3J0IHsgcGVyY2VudEZvcm1hdHRlciB9IGZyb20gJy4vcGVyY2VudEZvcm1hdHRlcic7XG5pbXBvcnQgeyBwZXJjZW50Q29tcGxldGVCYXJGb3JtYXR0ZXIgfSBmcm9tICcuL3BlcmNlbnRDb21wbGV0ZUJhckZvcm1hdHRlcic7XG5pbXBvcnQgeyBwZXJjZW50Q29tcGxldGVGb3JtYXR0ZXIgfSBmcm9tICcuL3BlcmNlbnRDb21wbGV0ZUZvcm1hdHRlcic7XG5pbXBvcnQgeyBwZXJjZW50U3ltYm9sRm9ybWF0dGVyIH0gZnJvbSAnLi9wZXJjZW50U3ltYm9sRm9ybWF0dGVyJztcbmltcG9ydCB7IHByb2dyZXNzQmFyRm9ybWF0dGVyIH0gZnJvbSAnLi9wcm9ncmVzc0JhckZvcm1hdHRlcic7XG5pbXBvcnQgeyB0cmFuc2xhdGVGb3JtYXR0ZXIgfSBmcm9tICcuL3RyYW5zbGF0ZUZvcm1hdHRlcic7XG5pbXBvcnQgeyB0cmFuc2xhdGVCb29sZWFuRm9ybWF0dGVyIH0gZnJvbSAnLi90cmFuc2xhdGVCb29sZWFuRm9ybWF0dGVyJztcbmltcG9ydCB7IHVwcGVyY2FzZUZvcm1hdHRlciB9IGZyb20gJy4vdXBwZXJjYXNlRm9ybWF0dGVyJztcbmltcG9ydCB7IHllc05vRm9ybWF0dGVyIH0gZnJvbSAnLi95ZXNOb0Zvcm1hdHRlcic7XG5cbi8qKiBQcm92aWRlcyBhIGxpc3Qgb2YgZGlmZmVyZW50IEZvcm1hdHRlcnMgdGhhdCB3aWxsIGNoYW5nZSB0aGUgY2VsbCB2YWx1ZSBkaXNwbGF5ZWQgaW4gdGhlIFVJICovXG5leHBvcnQgY29uc3QgRm9ybWF0dGVycyA9IHtcbiAgLyoqXG4gICAqIFRha2VzIGFuIGFycmF5IG9mIGNvbXBsZXggb2JqZWN0cyBjb252ZXJ0cyBpdCB0byBhIGNvbW1hIGRlbGltaXRlZCBzdHJpbmcuXG4gICAqIFJlcXVpcmVzIHRvIHBhc3MgYW4gYXJyYXkgb2YgXCJwcm9wZXJ0eU5hbWVzXCIgaW4gdGhlIGNvbHVtbiBkZWZpbml0aW9uIHRoZSBnZW5lcmljIFwicGFyYW1zXCIgcHJvcGVydHlcbiAgICogRm9yIGV4YW1wbGUsIGlmIHdlIGhhdmUgYW4gYXJyYXkgb2YgdXNlciBvYmplY3RzIHRoYXQgaGF2ZSB0aGUgcHJvcGVydHkgb2YgZmlyc3ROYW1lICYgbGFzdE5hbWUgdGhlbiB3ZSBuZWVkIHRvIHBhc3MgaW4geW91ciBjb2x1bW4gZGVmaW5pdGlvbjo6XG4gICAqIHsgcGFyYW1zOiB7IHByb3BlcnR5TmFtZXM6IFsnZmlydE5hbWUnXSB9fVxuICAgKi9cbiAgYXJyYXlPYmplY3RUb0NzdjogYXJyYXlPYmplY3RUb0NzdkZvcm1hdHRlcixcblxuICAvKiogVGFrZXMgYW4gYXJyYXkgb2Ygc3RyaW5nIGFuZCBjb252ZXJ0cyBpdCB0byBhIGNvbW1hIGRlbGltaXRlZCBzdHJpbmcgKi9cbiAgYXJyYXlUb0NzdjogYXJyYXlUb0NzdkZvcm1hdHRlcixcblxuICAvKiogc2hvdyB2YWx1ZSBpbiBib2xkIGZvbnQgd2VpZ2h0ICovXG4gIGJvbGQ6IGJvbGRGb3JtYXR0ZXIsXG5cbiAgLyoqIFdoZW4gdmFsdWUgaXMgZmlsbGVkICh0cnVlKSwgaXQgd2lsbCBkaXNwbGF5IGEgY2hlY2tib3ggVW5pY29kZSBpY29uICovXG4gIGNoZWNrYm94OiBjaGVja2JveEZvcm1hdHRlcixcblxuICAvKiogV2hlbiB2YWx1ZSBpcyBmaWxsZWQgKHRydWUpLCBpdCB3aWxsIGRpc3BsYXkgYSBGb250LUF3ZXNvbWUgaWNvbiAoZmEtY2hlY2spICovXG4gIGNoZWNrbWFyazogY2hlY2ttYXJrRm9ybWF0dGVyLFxuXG4gIC8qKlxuICAgKiBUYWtlcyBhIGNvbXBsZXggZGF0YSBvYmplY3QgYW5kIHJldHVybiB0aGUgZGF0YSB1bmRlciB0aGF0IHByb3BlcnR5IChmb3IgZXhhbXBsZTogXCJ1c2VyLmZpcnN0TmFtZVwiIHdpbGwgcmV0dXJuIHRoZSBmaXJzdCBuYW1lIFwiSm9oblwiKVxuICAgKiBZb3UgY2FuIHBhc3MgdGhlIGNvbXBsZXggc3RydWN0dXJlIGluIHRoZSBcImZpZWxkXCIgb3IgdGhlIFwicGFyYW1zOiB7IGNvbXBsZXhGaWVsZDogc3RyaW5nIH1cIiBwcm9wZXJ0aWVzLlxuICAgKiBGb3IgZXhhbXBsZTo6XG4gICAqIHRoaXMuY29sdW1uRGVmcyA9IFt7IGlkOiAndXNlcm5hbWUnLCBmaWVsZDogJ3VzZXIuZmlyc3ROYW1lJywgLi4uIH1dXG4gICAqIE9SIHRoaXMuY29sdW1uRGVmcyA9IFt7IGlkOiAndXNlcm5hbWUnLCBmaWVsZDogJ3VzZXInLCBwYXJhbXM6IHsgY29tcGxleEZpZWxkOiAndXNlci5maXJzdE5hbWUnIH0sIC4uLiB9XVxuICAgKi9cbiAgY29tcGxleE9iamVjdDogY29tcGxleE9iamVjdEZvcm1hdHRlcixcblxuICAvKipcbiAgICogTG9va3MgdXAgdmFsdWVzIGZyb20gdGhlIGNvbHVtbkRlZmluaXRpb24ucGFyYW1zLmNvbGxlY3Rpb24gcHJvcGVydHkgYW5kIGRpc3BsYXlzIHRoZSBsYWJlbCBpbiBDU1Ygb3Igc3RyaW5nIGZvcm1hdFxuICAgKiBAZXhhbXBsZVxuICAgKiAvLyB0aGUgZ3JpZCB3aWxsIGRpc3BsYXkgJ2ZvbycgYW5kICdiYXInIGFuZCBub3QgMSBhbmQgMiBmcm9tIHlvdXIgZGF0YXNldFxuICAgKiB7IHBhcmFtczogeyBjb2xsZWN0aW9uOiBbeyB2YWx1ZTogMSwgbGFiZWw6ICdmb28nfSwge3ZhbHVlOiAyLCBsYWJlbDogJ2JhcicgfV0gfX1cbiAgICogY29uc3QgZGF0YXNldCA9IFsxLCAyXTtcbiAgICovXG4gIGNvbGxlY3Rpb246IGNvbGxlY3Rpb25Gb3JtYXR0ZXIsXG5cbiAgLyoqXG4gICAqIFJvdWdobHkgdGhlIHNhbWUgYXMgdGhlIFwiY29sbGVjdGlvbkZvcm1hdHRlclwiIGV4Y2VwdCB0aGF0IGl0XG4gICAqIGxvb2tzIHVwIHZhbHVlcyBmcm9tIHRoZSBjb2x1bW5EZWZpbml0aW9uLmVkaXRvci5jb2xsZWN0aW9uIChpbnN0ZWFkIG9mIHBhcmFtcykgcHJvcGVydHkgYW5kIGRpc3BsYXlzIHRoZSBsYWJlbCBpbiBDU1Ygb3Igc3RyaW5nIGZvcm1hdFxuICAgKiBAZXhhbXBsZVxuICAgKiAvLyB0aGUgZ3JpZCB3aWxsIGRpc3BsYXkgJ2ZvbycgYW5kICdiYXInIGFuZCBub3QgMSBhbmQgMiBmcm9tIHlvdXIgZGF0YXNldFxuICAgKiB7IGVkaXRvcjogeyBjb2xsZWN0aW9uOiBbeyB2YWx1ZTogMSwgbGFiZWw6ICdmb28nfSwge3ZhbHVlOiAyLCBsYWJlbDogJ2JhcicgfV0gfX1cbiAgICogY29uc3QgZGF0YXNldCA9IFsxLCAyXTtcbiAgICovXG4gIGNvbGxlY3Rpb25FZGl0b3I6IGNvbGxlY3Rpb25FZGl0b3JGb3JtYXR0ZXIsXG5cbiAgLyoqIFRha2VzIGEgRGF0ZSBvYmplY3QgYW5kIGRpc3BsYXlzIGl0IGFzIGFuIElTTyBEYXRlIGZvcm1hdCAoWVlZWS1NTS1ERCkgKi9cbiAgZGF0ZUlzbzogZ2V0QXNzb2NpYXRlZERhdGVGb3JtYXR0ZXIoRmllbGRUeXBlLmRhdGVJc28sICctJyksXG5cbiAgLyoqIFRha2VzIGEgRGF0ZSBvYmplY3QgYW5kIGRpc3BsYXlzIGl0IGFzIGFuIElTTyBEYXRlK1RpbWUgZm9ybWF0IChZWVlZLU1NLUREIEhIOm1tOnNzKSAqL1xuICBkYXRlVGltZUlzbzogZ2V0QXNzb2NpYXRlZERhdGVGb3JtYXR0ZXIoRmllbGRUeXBlLmRhdGVUaW1lSXNvLCAnLScpLFxuXG4gIC8qKiBUYWtlcyBhIERhdGUgb2JqZWN0IGFuZCBkaXNwbGF5cyBpdCBhcyBhbiBJU08gRGF0ZStUaW1lICh3aXRob3V0IHNlY29uZHMpIGZvcm1hdCAoWVlZWS1NTS1ERCBISDptbSkgKi9cbiAgZGF0ZVRpbWVTaG9ydElzbzogZ2V0QXNzb2NpYXRlZERhdGVGb3JtYXR0ZXIoRmllbGRUeXBlLmRhdGVUaW1lU2hvcnRJc28sICctJyksXG5cbiAgLyoqIFRha2VzIGEgRGF0ZSBvYmplY3QgYW5kIGRpc3BsYXlzIGl0IGFzIGFuIElTTyBEYXRlK1RpbWUrKGFtL3BtKSBmb3JtYXQgKFlZWVktTU0tREQgaDptbTpzcyBhKSAqL1xuICBkYXRlVGltZUlzb0FtUG06IGdldEFzc29jaWF0ZWREYXRlRm9ybWF0dGVyKEZpZWxkVHlwZS5kYXRlVGltZUlzb0FtUG0sICctJyksXG5cbiAgLyoqIFRha2VzIGEgRGF0ZSBvYmplY3QgYW5kIGRpc3BsYXlzIGl0IGFzIGFuIEV1cm8gRGF0ZSBmb3JtYXQgKEREL01NL1lZWVkpICovXG4gIGRhdGVFdXJvOiBnZXRBc3NvY2lhdGVkRGF0ZUZvcm1hdHRlcihGaWVsZFR5cGUuZGF0ZUV1cm8sICcvJyksXG5cbiAgLyoqIFRha2VzIGEgRGF0ZSBvYmplY3QgYW5kIGRpc3BsYXlzIGl0IGFzIGFuIEV1cm8gRGF0ZStUaW1lIGZvcm1hdCAoREQvTU0vWVlZWSBISDptbTpzcykgKi9cbiAgZGF0ZVRpbWVFdXJvOiBnZXRBc3NvY2lhdGVkRGF0ZUZvcm1hdHRlcihGaWVsZFR5cGUuZGF0ZVRpbWVFdXJvLCAnLycpLFxuXG4gIC8qKiBUYWtlcyBhIERhdGUgb2JqZWN0IGFuZCBkaXNwbGF5cyBpdCBhcyBhbiBFdXJvIERhdGUrVGltZSAod2l0aG91dCBzZWNvbmRzKSBmb3JtYXQgKEREL01NL1lZWVkgSEg6bW0pICovXG4gIGRhdGVUaW1lU2hvcnRFdXJvOiBnZXRBc3NvY2lhdGVkRGF0ZUZvcm1hdHRlcihGaWVsZFR5cGUuZGF0ZVRpbWVTaG9ydEV1cm8sICcvJyksXG5cbiAgLyoqIFRha2VzIGEgRGF0ZSBvYmplY3QgYW5kIGRpc3BsYXlzIGl0IGFzIGFuIEV1cm8gRGF0ZStUaW1lKyhhbS9wbSkgZm9ybWF0IChERC9NTS9ZWVlZIGhoOm1tOnNzIGEpICovXG4gIGRhdGVUaW1lRXVyb0FtUG06IGdldEFzc29jaWF0ZWREYXRlRm9ybWF0dGVyKEZpZWxkVHlwZS5kYXRlVGltZUV1cm9BbVBtLCAnLycpLFxuXG4gIC8qKiBUYWtlcyBhIERhdGUgb2JqZWN0IGFuZCBkaXNwbGF5cyBpdCBhcyBhbiBVUyBEYXRlIGZvcm1hdCAoTU0vREQvWVlZWSkgKi9cbiAgZGF0ZVVzOiBnZXRBc3NvY2lhdGVkRGF0ZUZvcm1hdHRlcihGaWVsZFR5cGUuZGF0ZVVzLCAnLycpLFxuXG4gIC8qKiBUYWtlcyBhIERhdGUgb2JqZWN0IGFuZCBkaXNwbGF5cyBpdCBhcyBhbiBVUyBEYXRlK1RpbWUgZm9ybWF0IChNTS9ERC9ZWVlZIEhIOm1tOnNzKSAqL1xuICBkYXRlVGltZVVzOiBnZXRBc3NvY2lhdGVkRGF0ZUZvcm1hdHRlcihGaWVsZFR5cGUuZGF0ZVRpbWVVcywgJy8nKSxcblxuICAvKiogVGFrZXMgYSBEYXRlIG9iamVjdCBhbmQgZGlzcGxheXMgaXQgYXMgYW4gVVMgRGF0ZStUaW1lICh3aXRob3V0IHNlY29uZHMpIGZvcm1hdCAoTU0vREQvWVlZWSBISDptbTpzcykgKi9cbiAgZGF0ZVRpbWVTaG9ydFVzOiBnZXRBc3NvY2lhdGVkRGF0ZUZvcm1hdHRlcihGaWVsZFR5cGUuZGF0ZVRpbWVTaG9ydFVzLCAnLycpLFxuXG4gIC8qKiBUYWtlcyBhIERhdGUgb2JqZWN0IGFuZCBkaXNwbGF5cyBpdCBhcyBhbiBVUyBEYXRlK1RpbWUrKGFtL3BtKSBmb3JtYXQgKE1NL0REL1lZWVkgaGg6bW06c3MgYSkgKi9cbiAgZGF0ZVRpbWVVc0FtUG06IGdldEFzc29jaWF0ZWREYXRlRm9ybWF0dGVyKEZpZWxkVHlwZS5kYXRlVGltZVVzQW1QbSwgJy8nKSxcblxuICAvKiogRGlzcGxheXMgYSBGb250LUF3ZXNvbWUgZGVsZXRlIGljb24gKGZhLXRyYXNoKSAqL1xuICBkZWxldGVJY29uOiBkZWxldGVJY29uRm9ybWF0dGVyLFxuXG4gIC8qKlxuICAgKiBEaXNwbGF5IHRoZSB2YWx1ZSBhcyB4IGRlY2ltYWxzIGZvcm1hdHRlZCwgZGVmYXVsdHMgdG8gMiBkZWNpbWFscy5cbiAgICogWW91IGNhbiBwYXNzIFwiZGVjaW1hbFBsYWNlc1wiIG9yIFwibWluRGVjaW1hbFBsYWNlc1wiIGFuZC9vciBcIm1heERlY2ltYWxQbGFjZXNcIiB0byB0aGUgXCJwYXJhbXNcIiBwcm9wZXJ0eS5cbiAgICogRm9yIGV4YW1wbGU6OiBgeyBmb3JtYXR0ZXI6IEZvcm1hdHRlcnMuZGVjaW1hbCwgcGFyYW1zOiB7IGRlY2ltYWxQbGFjZXM6IDMgfX1gXG4gICAqIFRoZSBwcm9wZXJ0eSBcImRlY2ltYWxQbGFjZXNcIiBpcyBhbiBhbGlhcyBvZiBcIm1pbkRlY2ltYWxQbGFjZXNcIlxuICAgKi9cbiAgZGVjaW1hbDogZGVjaW1hbEZvcm1hdHRlcixcblxuICAvKiogRGlzcGxheSB0aGUgdmFsdWUgYXMgMiBkZWNpbWFscyBmb3JtYXR0ZWQgd2l0aCBkb2xsYXIgc2lnbiAnJCcgYXQgdGhlIGVuZCBvZiBvZiB0aGUgdmFsdWUgKi9cbiAgZG9sbGFyOiBkb2xsYXJGb3JtYXR0ZXIsXG5cbiAgLyoqIERpc3BsYXkgdGhlIHZhbHVlIGFzIDIgZGVjaW1hbHMgZm9ybWF0dGVkIHdpdGggZG9sbGFyIHNpZ24gJyQnIGF0IHRoZSBlbmQgb2Ygb2YgdGhlIHZhbHVlLCBjaGFuZ2UgY29sb3Igb2YgdGV4dCB0byByZWQvZ3JlZW4gb24gbmVnYXRpdmUvcG9zaXRpdmUgdmFsdWUgKi9cbiAgZG9sbGFyQ29sb3JlZDogZG9sbGFyQ29sb3JlZEZvcm1hdHRlcixcblxuICAvKiogRGlzcGxheSB0aGUgdmFsdWUgYXMgMiBkZWNpbWFscyBmb3JtYXR0ZWQgd2l0aCBkb2xsYXIgc2lnbiAnJCcgYXQgdGhlIGVuZCBvZiBvZiB0aGUgdmFsdWUsIGNoYW5nZSBjb2xvciBvZiB0ZXh0IHRvIHJlZC9ncmVlbiBvbiBuZWdhdGl2ZS9wb3NpdGl2ZSB2YWx1ZSwgc2hvdyBpdCBpbiBib2xkIGZvbnQgd2VpZ2h0IGFzIHdlbGwgKi9cbiAgZG9sbGFyQ29sb3JlZEJvbGQ6IGRvbGxhckNvbG9yZWRCb2xkRm9ybWF0dGVyLFxuXG4gIC8qKiBEaXNwbGF5cyBhIEZvbnQtQXdlc29tZSBlZGl0IGljb24gKGZhLXBlbmNpbCkgKi9cbiAgZWRpdEljb246IGVkaXRJY29uRm9ybWF0dGVyLFxuXG4gIC8qKlxuICAgKiBUYWtlcyBhbiBoeXBlcmxpbmsgY2VsbCB2YWx1ZSBhbmQgdHJhbnNmb3JtcyBpdCBpbnRvIGEgcmVhbCBoeXBlcmxpbmssIGdpdmVuIHRoYXQgdGhlIHZhbHVlIHN0YXJ0cyB3aXRoIDEgb2YgdGhlc2UgKGh0dHB8ZnRwfGh0dHBzKS5cbiAgICogVGhlIHN0cnVjdHVyZSB3aWxsIGJlIFwiPGEgaHJlZj1cImh5cGVybGlua1wiPmh5cGVybGluazwvYT5cIlxuICAgKiBZb3UgY2FuIG9wdGlvbmFsbHkgY2hhbmdlIHRoZSBoeXBlcmxpbmsgdGV4dCBkaXNwbGF5ZWQgYnkgdXNpbmcgdGhlIGdlbmVyaWMgcGFyYW1zIFwiaHlwZXJsaW5rVGV4dFwiIGluIHRoZSBjb2x1bW4gZGVmaW5pdGlvblxuICAgKiBGb3IgZXhhbXBsZTogeyBpZDogJ2xpbmsnLCBmaWVsZDogJ2xpbmsnLCBwYXJhbXM6IHsgaHlwZXJsaW5rVGV4dDogJ0NvbXBhbnkgV2Vic2l0ZScgfSB9IHdpbGwgZGlzcGxheSBcIjxhIGhyZWY9XCJsaW5rXCI+Q29tcGFueSBXZWJzaXRlPC9hPlwiXG4gICAqL1xuICBoeXBlcmxpbms6IGh5cGVybGlua0Zvcm1hdHRlcixcblxuICAvKiogRGlzcGxheSB3aGljaGV2ZXIgaWNvbiB5b3Ugd2FudCAobGlicmFyeSBhZ25vc3RpYywgaXQgY291bGQgYmUgRm9udC1Bd2Vzb21lIG9yIGFueSBvdGhlcikgKi9cbiAgaWNvbjogaWNvbkZvcm1hdHRlcixcblxuICAvKiogRGlzcGxheXMgYSBGb250LUF3ZXNvbWUgZWRpdCBpY29uIChmYS1pbmZvLWNpcmNsZSkgKi9cbiAgaW5mb0ljb246IGluZm9JY29uRm9ybWF0dGVyLFxuXG4gIC8qKiBzaG93IGlucHV0IHRleHQgdmFsdWUgYXMgaXRhbGljIHRleHQgKi9cbiAgaXRhbGljOiBpdGFsaWNGb3JtYXR0ZXIsXG5cbiAgLyoqIFRha2VzIGEgdmFsdWUgYW5kIGRpc3BsYXlzIGl0IGFsbCBsb3dlcmNhc2UgKi9cbiAgbG93ZXJjYXNlOiBsb3dlcmNhc2VGb3JtYXR0ZXIsXG5cbiAgLyoqXG4gICAqIFRha2VzIGEgdmFsdWUgZGlzcGxheSBpdCBhY2NvcmRpbmcgdG8gYSBtYXNrIHByb3ZpZGVkXG4gICAqIGUuOiAxMjM0NTY3ODkwIHdpdGggbWFzayBcIigwMDApIDAwMC0wMDAwXCIgd2lsbCBkaXNwbGF5IFwiKDEyMykgNDU2LTc4OTBcIlxuICAgKi9cbiAgbWFzazogbWFza0Zvcm1hdHRlcixcblxuICAvKipcbiAgICogWW91IGNhbiBwaXBlIG11bHRpcGxlIGZvcm1hdHRlcnMgKGV4ZWN1dGVkIGluIHNlcXVlbmNlKSwgdXNlIHBhcmFtcyB0byBwYXNzIHRoZSBsaXN0IG9mIGZvcm1hdHRlcnMuXG4gICAqIFJlcXVpcmVzIHRvIHBhc3MgYW4gYXJyYXkgb2YgXCJmb3JtYXR0ZXJzXCIgaW4gdGhlIGNvbHVtbiBkZWZpbml0aW9uIHRoZSBnZW5lcmljIFwicGFyYW1zXCIgcHJvcGVydHlcbiAgICogRm9yIGV4YW1wbGU6OlxuICAgKiB7IGZpZWxkOiAndGl0bGUnLCBmb3JtYXR0ZXI6IEZvcm1hdHRlcnMubXVsdGlwbGUsIHBhcmFtczogeyBmb3JtYXR0ZXJzOiBbIEZvcm1hdHRlcnMubG93ZXJjYXNlLCBGb3JtYXR0ZXJzLnVwcGVyY2FzZSBdIH1cbiAgICovXG4gIG11bHRpcGxlOiBtdWx0aXBsZUZvcm1hdHRlcixcblxuICAvKiogVGFrZXMgYSBjZWxsIHZhbHVlIG51bWJlciAoYmV0d2VlbiAwLjAtMS4wKSBhbmQgZGlzcGxheXMgYSByZWQgKDw1MCkgb3IgZ3JlZW4gKD49NTApIGJhciAqL1xuICBwZXJjZW50OiBwZXJjZW50Rm9ybWF0dGVyLFxuXG4gIC8qKiBUYWtlcyBhIGNlbGwgdmFsdWUgbnVtYmVyIChiZXR3ZWVuIDAuMC0xMDApIGFuZCBkaXNwbGF5cyBhIHJlZCAoPDUwKSBvciBncmVlbiAoPj01MCkgYmFyICovXG4gIHBlcmNlbnRDb21wbGV0ZTogcGVyY2VudENvbXBsZXRlRm9ybWF0dGVyLFxuXG4gIC8qKiBUYWtlcyBhIGNlbGwgdmFsdWUgbnVtYmVyIChiZXR3ZWVuIDAtMTAwKSBhbmQgZGlzcGxheXMgQm9vdHN0cmFwIFwicGVyY2VudC1jb21wbGV0ZS1iYXJcIiBhIHJlZCAoPDMwKSwgc2lsdmVyICg+MzAgJiA8NzApIG9yIGdyZWVuICg+PTcwKSBiYXIgKi9cbiAgcGVyY2VudENvbXBsZXRlQmFyOiBwZXJjZW50Q29tcGxldGVCYXJGb3JtYXR0ZXIsXG5cbiAgLyoqIFRha2VzIGEgY2VsbCB2YWx1ZSBudW1iZXIgKGJldHdlZW4gMC0xMDApIGFuZCBhZGQgdGhlIFwiJVwiIGFmdGVyIHRoZSBudW1iZXIgKi9cbiAgcGVyY2VudFN5bWJvbDogcGVyY2VudFN5bWJvbEZvcm1hdHRlcixcblxuICAvKiogVGFrZXMgYSBjZWxsIHZhbHVlIG51bWJlciAoYmV0d2VlbiAwLTEwMCkgYW5kIGRpc3BsYXlzIEJvb3RzdHJhcCBcInByb2dyZXNzLWJhclwiIGEgcmVkICg8MzApLCBzaWx2ZXIgKD4zMCAmIDw3MCkgb3IgZ3JlZW4gKD49NzApIGJhciAqL1xuICBwcm9ncmVzc0JhcjogcHJvZ3Jlc3NCYXJGb3JtYXR0ZXIsXG5cbiAgLyoqIFRha2VzIGEgY2VsbCB2YWx1ZSBhbmQgdHJhbnNsYXRlcyBpdCAoaTE4bikuIFJlcXVpcmVzIGFuIGluc3RhbmNlIG9mIHRoZSBUcmFuc2xhdGUgU2VydmljZTo6IGBpMThuOiB0aGlzLnRyYW5zbGF0ZSAqL1xuICB0cmFuc2xhdGU6IHRyYW5zbGF0ZUZvcm1hdHRlcixcblxuICAvKiogVGFrZXMgYSBib29sZWFuIHZhbHVlLCBjYXN0IGl0IHRvIHVwcGVyQ2FzZSBzdHJpbmcgYW5kIGZpbmFsbHkgdHJhbnNsYXRlcyBpdCAoaTE4bikuICovXG4gIHRyYW5zbGF0ZUJvb2xlYW46IHRyYW5zbGF0ZUJvb2xlYW5Gb3JtYXR0ZXIsXG5cbiAgLyoqIFRha2VzIGEgdmFsdWUgYW5kIGRpc3BsYXlzIGl0IGFsbCB1cHBlcmNhc2UgKi9cbiAgdXBwZXJjYXNlOiB1cHBlcmNhc2VGb3JtYXR0ZXIsXG5cbiAgLyoqIFRha2VzIGEgYm9vbGVhbiB2YWx1ZSBhbmQgZGlzcGxheSBhIHN0cmluZyAnWWVzJyBvciAnTm8nICovXG4gIHllc05vOiB5ZXNOb0Zvcm1hdHRlclxufTtcbiJdfQ==