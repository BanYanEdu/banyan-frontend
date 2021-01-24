import { ClassInfo } from "app/model/class/ClassInfo";
import { SchoolClass } from "app/model/class/SchoolClass";
import { interval, Observable } from "rxjs";
import { switchMap, take } from "rxjs/operators";
import { CommonConstants } from "./CommonConstants";

export class Utils{

    public static subscribeRetry<T>(observable: Observable<T>,
        callbackfn: (value: T) => boolean,
        intervalPeriod = CommonConstants.SHORT_TIMEOUT,
        retry = CommonConstants.Retry
    ): Promise<T> {
        var observableRetry = interval(intervalPeriod).pipe(
            switchMap(() => observable),
            take(retry)
        );
        var subscription = observableRetry.subscribe(value => {
            if (callbackfn(value)) {
                subscription.unsubscribe();
            }
        });
        return observableRetry.toPromise();
    }

    public static removeThousandSeparator(value: string) {
        var separator = parseInt("1000").toLocaleString().substring(1,2);
        return value.replace(new RegExp(separator, "g"), '');
    }
    public static getNumberWithThousandSeparator(value: string) {
        return parseInt(value).toLocaleString();
    }

    public static getClassInfoFromClass (schoolClass: SchoolClass): ClassInfo {
        var classInfo: ClassInfo = new ClassInfo();
        classInfo.classId = schoolClass.uuid;
        classInfo.className = schoolClass.name;
        classInfo.classCode = schoolClass.code;
        classInfo.courseId = schoolClass.courseId;
        classInfo.courseCode = schoolClass.courseCode;
        classInfo.courseName = schoolClass.courseName;
        classInfo.programId = schoolClass.programId;
        classInfo.programCode = schoolClass.programCode;
        classInfo.programName = schoolClass.programName;
        classInfo.outletId = schoolClass.outletId;
        classInfo.outletCode = schoolClass.outletCode;
        classInfo.outletName = schoolClass.outletName;

        return classInfo;

    }

    public static addDays(date: Date, days: number):Date {
        var newDate: Date = new Date();
        let dateLong = date.getTime();
        let newDateLong = dateLong + days*24*60*60*1000;
        newDate = new Date(newDateLong);
        newDate.setHours(0,0,0,0);
        // newDate.setDate(date.getDate() + days);
        
        return newDate;
    }
}