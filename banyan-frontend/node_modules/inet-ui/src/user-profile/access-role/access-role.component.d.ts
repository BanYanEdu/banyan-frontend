import { OnInit } from '@angular/core';
import { GlobalContactService } from "../global-contact.service";
export declare class AccessRoleComponent implements OnInit {
    private glService;
    arrayRoleUser: Array<any>;
    constructor(glService: GlobalContactService);
    ngOnInit(): void;
    loadAccessRole(): void;
}
