import { Injectable } from "@angular/core";
import { FocusService } from "./focus.service";
import { TranslateService } from "@ngx-translate/core";
import { NotificationService } from "inet-core";

@Injectable()
export class CommonService {
 constructor(
    public focusService: FocusService,
    public translate: TranslateService,
    public notificationService: NotificationService) { }
}