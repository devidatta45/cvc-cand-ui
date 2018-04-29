import { Conversation } from './Conversation'

export class ChatMessage {
    _id: string = "";
    consoleId: string;
    firstUserId: string;
    secondUserId: string;
    chatConversation: Conversation[]=[];
    lastTimeTalk:any;

    constructor(id:string,firstUserId:string,consoleId:string,conversation:Conversation){
        this.secondUserId=id;
        this.firstUserId=firstUserId;
        this.consoleId=consoleId
        this.chatConversation.push(conversation)
    }
}