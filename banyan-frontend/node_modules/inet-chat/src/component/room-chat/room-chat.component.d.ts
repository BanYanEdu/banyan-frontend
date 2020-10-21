import { OnDestroy, OnInit } from '@angular/core';
import { VideoConferenceService } from "../../video-conference.service";
export declare class RoomChatComponent implements OnInit, OnDestroy {
    private videoService;
    roomName: string;
    videoPanelVisible: boolean;
    constructor(videoService: VideoConferenceService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    joinRoom(): void;
    disposeRoom(): void;
}
