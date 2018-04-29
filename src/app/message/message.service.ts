import { Injectable } from '@angular/core';

import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { ChatMessage } from './ChatMessage';
import { Conversation } from './Conversation';
import { StatusMessage } from '../userlist/StatusMessage';
import { MessageWithOwner } from '../candiateMessage/MessageWithOwner';
import { ErrorService } from '../http.error.service';
import { Constant } from '../Constants';


@Injectable()
export class MessageService {
  constructor(private http: Http, private errorService: ErrorService) { }
  private mainUrl = Constant.CAND_URL;
  private API_KEY = "8190b575-f3ee-41b2-bede-7ddc9e156df2";
  private headers = new Headers();
  private newHeaders = new Headers();

  sendMessage(id: string, consoleId: string, firstUserId: string, initiatorId: string, message: string): Promise<any> {
    this.headers.set("apikey", localStorage.getItem("apiKey"));
    let options = new RequestOptions({ headers: this.headers });
    let date = new Date().toISOString().split(".")[0] + "Z";
    let body = new ChatMessage(id, firstUserId, consoleId, new Conversation(initiatorId, message, date));
    let request = this.http.post(this.mainUrl + "sendMessage", body, options).toPromise();
    let resp = request.then(response =>
      response.json() as StatusMessage
    ).catch(error => { this.errorService.showError(error); })
    return resp;
  }
  getAllMessages(userId: string): Promise<any> {
    this.headers.set("apikey", localStorage.getItem("apiKey"));
    let options = new RequestOptions({ headers: this.headers });
    let request = this.http.get(this.mainUrl + "showAllMessages/" + userId, options).toPromise();
    let resp = request.then(response =>
      response.json() as Array<MessageWithOwner>
    ).catch(error => { this.errorService.showError(error); })
    return resp;
  }
}