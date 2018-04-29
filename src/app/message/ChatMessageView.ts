import { Conversation } from './Conversation';
import { CVUser } from '../userlist/CVUser';

export class ChatMessageView {
    _id: string = "";
    consoleId: string;
    firstUserId: CVUser;
    secondUserId: string;
    chatConversation: Conversation[]=[];
    lastTimeTalk:any;

    constructor(id:string,firstUserId:CVUser,conversation:Conversation){
        this.secondUserId=id;
        this.firstUserId=firstUserId;
        this.chatConversation.push(conversation)
    }
}