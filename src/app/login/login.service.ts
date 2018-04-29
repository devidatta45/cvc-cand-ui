import { Injectable } from '@angular/core';

import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Login } from './Login';
import { Job } from './Job';
import { JobApplication } from './JobApplication';
import { LoginResult } from './LoginResult';
import { CVUser } from '../userlist/CVUser';
import { CVCCandidate } from '../profile/CVCCandidate';
import { StatusMessage } from '../userlist/StatusMessage';
import { ForgetPassword } from './ForgetPassword';
import { ErrorService } from '../http.error.service';
import { Constant } from '../Constants';


@Injectable()
export class LoginService {
  constructor(private http: Http, private errorService: ErrorService) { }
  private mainUrl = Constant.CAND_URL;
  private headers = new Headers();
  private API_KEY = "8190b575-f3ee-41b2-bede-7ddc9e156df2";


  authenticate(userName: string, password: string): Promise<any> {
    let body = new Login(userName, password);
    let request = this.http.post(this.mainUrl + "authenticate", body).toPromise();
    let resp = request.then(response =>
      response.json() as LoginResult
    ).catch(error => {
      this.errorService.showError(error);
    })
    return resp;
  }

  logout(id): Promise<any> {
    this.headers.append("apiKey", id);
    let options = new RequestOptions({ headers: this.headers });
    let request = this.http.get(this.mainUrl + "logout/" + id, options).toPromise();
    let resp = request.then(response =>
      response.json() as any
    ).catch(error => {
      this.errorService.showError(error);
    })
    return resp;
  }

  createUser(user: CVUser): Promise<any> {
    let request = this.http.post(this.mainUrl + "createUser", user).toPromise();
    let resp = request.then(response =>
      response.json() as CVCCandidate
    ).catch(error => { this.errorService.showError(error); })
    return resp;
  }
  getJobById(id: string): Promise<any> {
    this.headers.set("apiKey", this.API_KEY);
    let url = Constant.CLIENT_URL;
    let options = new RequestOptions({ headers: this.headers });
    let request = this.http.get(url + "job/" + id, options).toPromise();
    let resp = request.then(response =>
      response.json() as Job
    ).catch(error => { this.errorService.showError(error); })
    return resp;
  }
  applyJob(application: JobApplication): Promise<any> {
    this.headers.set("apiKey", this.API_KEY);
    let url = 'Constant.CLIENT_URL';
    let options = new RequestOptions({ headers: this.headers });
    let request = this.http.post(url + "createJobApplication", application, options).toPromise();
    let resp = request.then(response =>
      response.json() as Boolean
    ).catch(error => { this.errorService.showError(error); })
    return resp;
  }
  resetPassword(forgetPassword: ForgetPassword): Promise<any> {
    let request = this.http.post(this.mainUrl + "sendMail", forgetPassword).toPromise();
    let resp = request.then(response =>
      response.json() as Array<CVUser>
    ).catch(error => { this.errorService.showError(error); })
    return resp;
  }
  changePassword(forgetPassword: ForgetPassword): Promise<any> {
    let request = this.http.put(this.mainUrl + "changePassword", forgetPassword).toPromise();
    let resp = request.then(response =>
      response.json() as Array<CVUser>
    ).catch(error => { this.errorService.showError(error); })
    return resp;
  }
  getMailByKey(key: string): Promise<any> {
    this.headers.set("apiKey", this.API_KEY);
    let options = new RequestOptions({ headers: this.headers });
    let request = this.http.get(this.mainUrl + "mailByKey/" + key, options).toPromise();
    let resp = request.then(response =>
      response.json() as StatusMessage
    ).catch(error => { this.errorService.showError(error); })
    return resp;
  }
}