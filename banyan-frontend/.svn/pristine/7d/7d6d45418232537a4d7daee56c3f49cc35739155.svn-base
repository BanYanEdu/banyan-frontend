import { OnInit } from '@angular/core';
import { SocialFriend } from '../../model/SocialFriend';
import { SocialService } from '../../social.service';
import { FriendTab } from '../FriendTab';
export declare class FriendBrowseComponent implements OnInit, FriendTab {
    private socialService;
    category: string;
    members: SocialFriend[];
    params: any;
    private _timer;
    constructor(socialService: SocialService);
    placeholder: string;
    clearSearchValue(): void;
    onSearch(value: string): void;
    ngOnInit(): void;
    inviteFriend(friend: any): void;
    private _searchMember;
}
