import { HttpClientService } from "inet-core";
export declare class VideoConferenceService {
    private httpService;
    api: any;
    domain: string;
    messageJoin: {
        app: string;
        conferenceID: string;
        sender: string;
        joined: string;
        inAccess: string;
    };
    static instance: VideoConferenceService;
    constructor(httpService: HttpClientService);
    join(parentNode: any, roomName: string, audioOnly?: boolean, height?: number, callback?: Function): void;
    callTo(parentNode: any, userName: string, audioOnly?: boolean, height?: number, callback?: Function): void;
    getApi(): any;
    dispose(): void;
    getMessageJoin(): {
        app: string;
        conferenceID: string;
        sender: string;
        joined: string;
        inAccess: string;
    };
    getRoomNameByReceiver(receiver: string): string;
    isExistMeet(): boolean;
    encodeBase64(str: string): string;
}
