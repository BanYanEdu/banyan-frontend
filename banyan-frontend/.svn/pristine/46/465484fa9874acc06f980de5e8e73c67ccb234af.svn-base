import { DictionaryData, SubFirmDictionary } from "./subfirm/Dictionary";
export declare class CalendarCar {
    carDefault: {
        name: string;
        uuid: string;
    };
    carRef: string;
    driverRef: string;
    subFirmDict: SubFirmDictionary;
    constructor(subFirmDict: SubFirmDictionary);
    loadCars(callback: Function): void;
    createOrUpdateCars(data: DictionaryData, callback: Function): void;
    loadDrivers(callback: Function): void;
    createOrUpdateDrivers(data: DictionaryData, callback: Function): void;
    _loadList(ref: string, callback: Function): void;
    parseJsonValue(data: DictionaryData, callback: Function): void;
}
