import { OnInit } from '@angular/core';
import { SocialFriend } from '../../model/SocialFriend';
import { SocialService } from '../../social.service';
export declare class FriendInvitationComponent implements OnInit {
    private socialService;
    category: string;
    invitations: SocialFriend[];
    noInvitation: boolean;
    invitationsSend: SocialFriend[];
    noInvitationSend: boolean;
    constructor(socialService: SocialService);
    ngOnInit(): void;
    acceptInvite(member: any): void;
    rejectInvite(member: any): void;
    removeInvite(member: any): void;
    private _loadReceiveInvite;
    private _loadSendInvite;
}
