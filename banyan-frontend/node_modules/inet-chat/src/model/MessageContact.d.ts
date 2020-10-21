export declare class MessageContact {
    private static _accent;
    fullname: string;
    usercode: string;
    lastmsg: number;
    message: string;
    online: boolean;
    unread: number;
    type?: string;
    _indexSearch: string;
    constructor(options: any);
    isMatch(keyword?: string): boolean;
}
