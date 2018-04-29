import { ChatMessageView } from '../message/ChatMessageView'
import { CVUser } from '../userlist/CVUser';

export class MessageWithOwner {
  owner: CVUser;
  consoleId:string;
  messages: ChatMessageView[] = [];
  constructor(owner: CVUser, message: ChatMessageView) {
    this.owner = owner;
    this.messages.push(message);
  }
}