import { EventEmitter, OnDestroy } from '@angular/core';
import { MessageContact } from "../../model/MessageContact";
import { ChatMessageService } from "../../message.service";
import { MessageChatComponent } from '../message-chat/message-chat.component';
export declare class MessagePanelComponent implements OnDestroy {
    private messageService;
    audioCall: boolean;
    videoCall: boolean;
    closable: boolean;
    unreadMessageChange: EventEmitter<number>;
    messageChatComponent: MessageChatComponent;
    contact: MessageContact;
    chatOpen: boolean;
    readyToChat: boolean;
    stateMessage: string;
    roomName: string;
    private readonly _socketSub;
    private readonly _messageSub;
    constructor(messageService: ChatMessageService);
    private _stateChange;
    ngOnDestroy(): void;
    openVideoCall(contact: MessageContact): void;
    openAudioCall(contact: MessageContact): void;
    openChatWith(contact: MessageContact, call?: boolean): void;
    closeChat(): void;
    openRoom(roomName: string): void;
    callToContactSelected(contact: any): void;
}
