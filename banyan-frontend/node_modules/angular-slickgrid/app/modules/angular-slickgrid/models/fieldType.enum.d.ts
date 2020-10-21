export declare enum FieldType {
    unknown = 0,
    string = 1,
    boolean = 2,
    integer = 3,
    float = 4,
    /** number includes Integer and Float */
    number = 5,
    /** new Date(), javascript Date object */
    date = 6,
    /** Format: 'YYYY-MM-DD' => 2001-01-01 */
    dateIso = 7,
    /** Format: 'YYYY-MM-DDTHH:mm:ss.SSSZ' => 2001-01-01T14:00:00.123Z */
    dateUtc = 8,
    /** new Date(), javacript Date Object with Time */
    dateTime = 9,
    /** Format: 'YYYY-MM-DD HH:mm:ss' => 2001-01-01 14:01:01 */
    dateTimeIso = 10,
    /** Format: 'YYYY-MM-DD h:mm:ss a' => 2001-01-01 11:01:01 pm */
    dateTimeIsoAmPm = 11,
    /** Format: 'YYYY-MM-DD h:mm:ss A' => 2001-01-01 11:01:01 PM */
    dateTimeIsoAM_PM = 12,
    /** Format: 'YYYY-MM-DD HH:mm' => 2001-01-01 14:01 */
    dateTimeShortIso = 13,
    /** Format (Euro): 'DD/MM/YYYY' => 02/28/2001 */
    dateEuro = 14,
    /** Format (Euro): 'D/M/YY' => 2/28/12 */
    dateEuroShort = 15,
    /** Format (Euro): 'DD/MM/YYYY HH:mm' => 02/28/2001 13:01 */
    dateTimeShortEuro = 16,
    /** Format (Euro): 'DD/MM/YYYY HH:mm:ss' => 02/28/2001 13:01:01 */
    dateTimeEuro = 17,
    /** Format (Euro): 'DD/MM/YYYY hh:mm:ss a' => 02/28/2001 11:01:01 pm */
    dateTimeEuroAmPm = 18,
    /** Format (Euro): 'DD/MM/YYYY hh:mm:ss A' => 02/28/2001 11:01:01 PM */
    dateTimeEuroAM_PM = 19,
    /** Format (Euro): 'D/M/YY H:m:s' => 2/28/14 14:1:2 */
    dateTimeEuroShort = 20,
    /** Format (Euro): 'D/M/YY h:m:s a' => 2/28/14 1:2:10 pm */
    dateTimeEuroShortAmPm = 21,
    /** Format (Euro): 'D/M/YY h:m:s A' => 2/28/14 14:1:1 PM */
    dateTimeEuroShortAM_PM = 22,
    /** Format: 'MM/DD/YYYY' => 02/28/2001 */
    dateUs = 23,
    /** Format: 'M/D/YY' => 2/28/12 */
    dateUsShort = 24,
    /** Format: 'MM/DD/YYYY HH:mm' => 02/28/2001 13:01 */
    dateTimeShortUs = 25,
    /** Format: 'MM/DD/YYYY HH:mm:ss' => 02/28/2001 13:01:01 */
    dateTimeUs = 26,
    /** Format: 'MM/DD/YYYY hh:mm:ss a' => 02/28/2001 11:01:01 pm */
    dateTimeUsAmPm = 27,
    /** Format: 'MM/DD/YYYY hh:mm:ss A' => 02/28/2001 11:01:01 PM */
    dateTimeUsAM_PM = 28,
    /** Format: 'M/D/YY H:m:s' => 2/28/14 14:1:2 */
    dateTimeUsShort = 29,
    /** Format: 'M/D/YY h:m:s a' => 2/28/14 1:2:10 pm */
    dateTimeUsShortAmPm = 30,
    /** Format: 'M/D/YY h:m:s A' => 2/28/14 14:1:1 PM */
    dateTimeUsShortAM_PM = 31,
    /** complex object with various properties */
    object = 32
}
