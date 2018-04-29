export class Conversation {
    userId: string;
    chat: string;
    lastTime: any;
    constructor(userId:string,chat:string,lastTime: any){
        this.userId=userId;
        this.chat=chat;
        this.lastTime=lastTime;
    }
}