import { CommonService } from "../services/common.service";
import { NotificationType } from "app/shared/models/NotificationType";

export abstract class BaseComponent {
    imgFolder: string = iNet.imgFolder;
    currentLanguage: string;
    
    constructor(protected commonService: CommonService) {
    }

    public showMessage(messageKey: string, title: string, type: NotificationType = NotificationType.SUCCESS): void {
        this.commonService.translate.get([messageKey, title]).subscribe(data => {
            this.commonService.notificationService.showMessage(data[messageKey], NotificationType[type].toString().toLowerCase(), data[title]);
        });
    }

}