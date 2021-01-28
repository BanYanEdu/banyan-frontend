import { CommonService } from "../services/common.service";
import { NotificationType } from "app/shared/models/NotificationType";

export abstract class BaseComponent {
    imgFolder: string = iNet.imgFolder;
    currentLanguage: string;
    currentOutletId: string = localStorage.getItem("currentOutletId");
    currentOutletCode: string = localStorage.getItem("currentOutletCode");
    currentOutletName: string = localStorage.getItem("currentOutletName");
    
    constructor(protected commonService: CommonService) {
    }

    public showMessage(messageKey: string, title: string, type: NotificationType = NotificationType.SUCCESS): void {
        this.commonService.translate.get([messageKey, title]).subscribe(data => {
            this.commonService.notificationService.showMessage(data[messageKey], NotificationType[type].toString().toLowerCase(), data[title]);
        });
    }

    public getLocalStorageValue(key: string) {
        return localStorage.getItem(key);
    }
}