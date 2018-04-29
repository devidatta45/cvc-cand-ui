import { Injectable } from '@angular/core';

import { CVUser } from './CVUser';
import { StatusMessage } from './StatusMessage';

import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { ErrorService } from '../http.error.service';
import { Constant } from '../Constants';


@Injectable()
export class UserListService {
  constructor(private http: Http, private errorService: ErrorService) {
    this.headers.append("apiKey", this.API_KEY);
  }
  private mainUrl = Constant.CAND_URL;
  private API_KEY = "8190b575-f3ee-41b2-bede-7ddc9e156df2";
  private headers = new Headers();


  getUsers(): Promise<any> {
    let options = new RequestOptions({ headers: this.headers });
    let request = this.http.get(this.mainUrl, options).toPromise();
    let resp = request.then(response =>
      response.json() as CVUser[]
    ).catch(error => { this.errorService.showError(error); })
    return resp;
  }
  getUserDeails(id: string): Promise<any> {
    let options = new RequestOptions({ headers: this.headers });
    let request = this.http.get(this.mainUrl + "details/" + id, options).toPromise();
    let resp = request.then(response =>
      response.json() as CVUser
    ).catch(error => { this.errorService.showError(error); })
    return resp;
  }
  deleteUser(id: string): Promise<any> {
    let options = new RequestOptions({ headers: this.headers });
    let request = this.http.delete(this.mainUrl + "deleteUser/" + id, options).toPromise();
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