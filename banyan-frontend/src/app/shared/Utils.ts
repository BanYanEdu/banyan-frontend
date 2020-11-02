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
}