import { Injectable } from '@angular/core';

import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { CVUser } from '../userlist/CVUser';
import { NewsFeed } from './NewsFeed';
import { InterviewSchedule } from './InterviewSchedule';
import { InterviewScheduleView } from './InterviewScheduleView';
import { JobApplication } from './JobApplication';
import { CVCCandidate } from '../profile/CVCCandidate';
import { StatusMessage } from '../userlist/StatusMessage';
import { ErrorService } from '../http.error.service';
import { Constant } from '../Constants';


@Injectable()
export class ActivityService {
    constructor(private http: Http, private errorService: ErrorService) { }
    private mainUrl = Constant.CAND_URL;
    private headers = new Headers();
    private API_KEY = "8190b575-f3ee-41b2-bede-7ddc9e156df2";

    getAllNews(candidateId: string): Promise<any> {
        this.headers.set("apiKey", localStorage.getItem("apiKey"));
        let options = new RequestOptions({ headers: this.headers });
        let request = this.http.get(this.mainUrl + "newsFeed/" + candidateId, options).toPromise();
        let resp = request.then(response =>
            response.json() as Array<NewsFeed>
        ).catch(error => { this.errorService.showError(error); })
        return resp;
    }

    getInterviews(candidateId: string): Promise<any> {
        this.headers.set("apikey", localStorage.getItem("apiKey"));
        let url = Constant.CLIENT_URL;
        let options = new RequestOptions({ headers: this.headers });
        let request = this.http.get(url + "interviewByCandidate/" + candidateId, options).toPromise();
        let resp = request.then(response =>
            response.json() as Array<InterviewScheduleView>
        ).catch(error => { this.errorService.showError(error); })
        return resp;
    }
    getInterviewById(id: string): Promise<any> {
        this.headers.set("apikey", localStorage.getItem("apiKey"));
        let url = Constant.CLIENT_URL;
        let options = new RequestOptions({ headers: this.headers });
        let request = this.http.get(url + "interview/" + id, options).toPromise();
        let resp = request.then(response =>
            response.json() as Array<InterviewSchedule>
        ).catch(error => { this.errorService.showError(error); })
        return resp;
    }

    getCandidateApplication(jobId: string, candidateId: string): Promise<any> {
        this.headers.set("apikey", localStorage.getItem("apiKey"));
        let url = Constant.CLIENT_URL;
        let options = new RequestOptions({ headers: this.headers });
        let request = this.http.get(url + "applicationsByCandidate/" + jobId + "/" + candidateId, options).toPromise();
        let resp = request.then(response =>
            response.json() as Array<JobApplication>
        ).catch(error => { this.errorService.showError(error); })
        return resp;
    }

    acceptInterview(interview: InterviewScheduleView): Promise<any> {
        this.headers.set("apikey", localStorage.getItem("apiKey"));
        let url = Constant.CLIENT_URL;
        let options = new RequestOptions({ headers: this.headers });
        let request = this.http.post(url + "acceptInterview", interview, options).toPromise();
        let resp = request.then(response =>
            response.json() as Array<InterviewSchedule>
        ).catch(error => { this.errorService.showError(error); })
        return resp;
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}