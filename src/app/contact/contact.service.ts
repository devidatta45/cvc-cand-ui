import { Injectable } from '@angular/core';

import { Headers, Http, RequestOptions } from '@angular/http';
import { Contact } from './Contact';
import { StatusMessage } from '../userlist/StatusMessage'
import 'rxjs/add/operator/toPromise';
import { ErrorService } from '../http.error.service';
import { Constant } from '../Constants';


@Injectable()
export class ContactService {
    constructor(private http: Http, private errorService: ErrorService) {
        this.headers.append("apiKey", localStorage.getItem("apiKey"));
    }
    private mainUrl = Constant.CAND_URL;
    private headers = new Headers();


    sendMessage(contact: Contact): Promise<any> {
        let options = new RequestOptions({ headers: this.headers });
        let request = this.http.post(this.mainUrl + "sendQuery", contact, options).toPromise();
        let resp = request.then(response =>
            response.json() as StatusMessage
        ).catch(error => { this.errorService.showError(error); })
        return resp;
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}